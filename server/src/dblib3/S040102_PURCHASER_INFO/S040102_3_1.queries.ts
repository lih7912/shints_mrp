import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S040102_3_1 = {
    Query: {
        mgrQueryS040102_3_1: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }
            let sqlStr = `
                SELECT
                    A.REG_USER,
                    A.PU_STATUS,
                    A.PU_CD,
                    A.BUYER_CD,
                    A.PO_CD2 AS PO_CD,
                    A.VENDOR_CD,
                    A1.VENDOR_NAME,
                    A.MATL_TYPE,
                    A.NORMI,
                    A.MRP_DATE,
                    A.ORDER_DATE,
                    A.TRADE_TERM AS PAY_TERM,
                    A.DELIVERY_DATE AS CONTRACT_DELIVERY_DATE,
                    A.EXP_DELIVERY_DATE,
                    A.TARGET_ETA,
                    A.ETA,
                    A.PI_NO,
                    A.PI_FILE,
                    '' AS STSIN_STATUS,
                    '' AS STSOUT_STATUS,
                    '' AS SHIPMENT_STATUS,
                    isnull(A.ORIGIN_PORT, '') as ORIGIN_PORT,
                    A.SHIP_MODE,
                    A.CURR_CD,
                    A.PU_AMT,
                    A.DEPOSIT_AMT,
                    A.LC_AMT,
                    A.PAY_TYPE AS PAY_TYPE,
                    A.PAY_DATE AS PAY_DATE,
                    '' AS GW
                FROM
                    KSV_PU_MST2 A,
                    KCD_VENDOR A1
                WHERE
                    A.VENDOR_CD = A1.VENDOR_CD
                    AND A.PU_TYPE = '1'
                    AND A.PO_CD2 like '%${args.data.PO_CD}%'
                    AND A.BUYER_CD like '%${args.data.BUYER_CD}%'
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetArray = [];

            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tObj = { ...tRet[tIdx] };
                let sqlStr0 = `
                    select
                        isnull(sum(in_qty), 0) as IN_QTY
                    from
                        ksv_stock_in_mst
                    where
                        pu_cd = '${tObj.PU_CD}'
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr0));
                tObj.STSIN_STATUS = String(tRet0[0].IN_QTY);
                tObj.STSOUT_STATUS = String('0');
                tRetArray.push(tObj);
                /*
           let sqlStr0 = `
               -- select isnull(sum(out_qty), 0) as OUT_QTY from ksv_stock_out_mst where pu_cd = '${tObj.PU_CD}'
               select
                   isnull(sum(a.out_qty), 0) as OUT_QTY
               from
                   ksv_stock_out a,
                   ksv_stock_out_mst b
               where
                   b.pu_cd = '${tObj.PU_CD}'
                   and b.stsout_cd = a.stsout_cd
           `;
           var tRet0  =  await prisma.$queryRaw(Prisma.raw(sqlStr0));
           tObj.STSOUT_STATUS  = String(tRet0[0].OUT_QTY);
*/
            }

            return tRetArray;
        },
    },
};

export default moduleQuery_S040102_3_1;
