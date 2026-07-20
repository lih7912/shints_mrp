import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0416_2_1 = {
    Query: {
        mgrQueryS0416_2_1: async (_, args) => {
            var tDateNew = new Date();
            var tZeroDate = '00';
            var tDateNew_M =
                tZeroDate.substring(
                    0,
                    2 - String(tDateNew.getMonth() + 1).length,
                ) + String(tDateNew.getMonth() + 1);
            var tDateNew_D =
                tZeroDate.substring(0, 2 - String(tDateNew.getDate()).length) +
                String(tDateNew.getDate());
            var tRetDate = tDateNew.getFullYear() + tDateNew_M + tDateNew_D;

            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }

            let sqlStr = `
                SELECT
                    '20230614' AS REG_DATE,
                    E.PO_CD,
                    LEFT(F.ORDER_CD, 2) AS BUYER_CD,
                    E.PO_CONF_DATE,
                    E.PLAN_ETD,
                    E.PLAN_ETA,
                    C.VENDOR_NAME,
                    A.MATL_CD,
                    B.MATL_NAME,
                    B.COLOR,
                    B.SPEC,
                    B.UNIT,
                    CAST(A.TOT_CNT AS FLOAT) AS NEED_QTY,
                    (
                        CAST(A.TOT_CNT AS FLOAT) - SUM(F.IN_QTY) - ISNULL(A.STOCK_QTY, 0)
                    ) AS REMAIN_QTY,
                    '' AS DELAY_REASON,
                    '' AS REMARK,
                    '' AS EX_IN_DATE,
                    '' AS CUT_DATE,
                    '' AS ETA,
                    '' AS ETD,
                    '' AS DELIVERY_TYPE,
                    '' AS FARE_TYPE,
                    '' AS MATL_CD1,
                    0 AS SEQ,
                    '' AS PO_CONF_DATE2,
                    '' AS ORIGINAL_ETD2,
                    '' AS ORIGINAL_ETA2,
                    0 AS SHIP_QTY,
                    '' AS END_FLAG,
                    '' AS EX_IN_DATE1,
                    A.UPD_USER
                FROM
                    KSV_PO_MATLLIST A
                    LEFT JOIN KSV_STOCK_MEM F ON F.PO_CD = A.PO_CD
                    AND F.MATL_CD = A.MATL_CD,
                    KCD_MATL_MST B,
                    KCD_VENDOR C,
                    KSV_PO_MST E
                WHERE
                    E.PO_STATUS = '4'
                    AND E.PLAN_ETD >= '${tRetDate}'
                    AND E.PO_SEQ = '1'
                    AND E.PLAN_FLAG = '1'
                    AND E.PO_CD LIKE '${args.data.PO_CD}%'
                    AND A.PO_CD = E.PO_CD
                    AND B.MATL_CD = A.MATL_CD
                    AND B.VENDOR_CD LIKE '%'
                    AND C.VENDOR_CD = B.VENDOR_CD
                    AND C.VENDOR_TYPE LIKE '%'
                    AND ISNULL(C.VENDOR_MATL_TYPE, '') LIKE '%'
                GROUP BY
                    E.PO_CD,
                    E.PO_CONF_DATE,
                    E.PLAN_ETD,
                    E.PLAN_ETA,
                    C.VENDOR_NAME,
                    B.MATL_NAME,
                    B.COLOR,
                    B.SPEC,
                    B.UNIT,
                    A.MATL_CD,
                    A.TOT_CNT,
                    A.STOCK_QTY,
                    LEFT(F.ORDER_CD, 2),
                    A.UPD_USER
                HAVING
                    CAST(A.TOT_CNT AS FLOAT) > SUM(F.IN_QTY)
                    AND CAST(A.TOT_CNT AS FLOAT) - ISNULL(A.STOCK_QTY, 0) - SUM(F.IN_QTY) > 0
                ORDER BY
                    1
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            let sql0 = `
                select
                    sys_val
                from
                    kcd_system
                where
                    sys_cd = 'MatlDelaySeq'
            `;
            var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            var tCurSeq = tRet0[0].sys_val;

            var tArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tObj = { ...tRet[tIdx] };
                let sql0 = `
                    select
                        top 1 d.ship_qty,
                        d.cut_date,
                        d.etd,
                        d.eta,
                        d.delay_reason,
                        d.delivery_type,
                        d.fare_type,
                        d.remark,
                        d.seq
                    from
                        kzz_matl_delay d
                        -- where d.seq = ${tCurSeq} 
                    where
                        d.po_cd = '${tObj.PO_CD}'
                        and d.matl_cd = '${tObj.MATL_CD}'
                    order by
                        d.seq desc
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                if (tRet0.length > 0) {
                    var tOne = tRet0[0];
                    tObj.SEQ = tOne.seq;
                    tObj.SHIP_QTY = tOne.ship_qty;
                    tObj.CUT_DATE = tOne.cut_date;
                    tObj.ETD = tOne.etd;
                    tObj.ETA = tOne.eta;
                    tObj.DELAY_REASON = tOne.delay_reason;
                    tObj.DELIVERY_TYPE = tOne.delivery_type;
                    tObj.FARE_TYPE = tOne.fare_type;
                    tObj.REMARK = tOne.remark;
                }
                tArray.push(tObj);
            }
            return tArray;
        },
    },
};

export default moduleQuery_S0416_2_1;
