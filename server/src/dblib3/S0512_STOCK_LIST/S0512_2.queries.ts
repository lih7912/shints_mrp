import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0512_2 = {
    Query: {
        mgrQueryS0512_2: async (_, args) => {
            var tSQL = '';
            if (args.data.STATUS === '35MYFRPCGUIHANWJKQVTO') {
                tSQL += `and a.stock_status in('3','5','M','Y','F','R','P','C','G','U','I','H','A','N','W','J','K','Q','V','T','O')`;
            } else if (args.data.STATUS === '3FPGUIHAJKQV') {
                tSQL += `and a.stock_status in('3','F','P','G','U','I','H','A','J','K','Q','V')`;
            } else if (args.data.STATUS === 'GUIHA') {
                tSQL += `and a.stock_status in('G','U','I','H','A')`;
            } else if (args.data.STATUS === '35MNYWRPC') {
                tSQL += `and a.stock_status in('3','5','M','N','Y','W','R','P','C')`;
            } else if (args.data.STATUS === '35MRY') {
                tSQL += `and a.stock_status in('3','5','M','R','Y') `;
            } else if (args.data.STATUS === '35MRYC') {
                tSQL += `and a.stock_status in('3','5','M','R','Y','C')`;
            } else if (args.data.STATUS === '35MRYWN') {
                tSQL += `and a.stock_status in('3','5','M','R','Y','W','N')`;
            } else if (args.data.STATUS === 'MR') {
                tSQL += `and a.stock_status in('M','R') `;
            } else if (args.data.STATUS === 'JKQV') {
                tSQL += `and a.stock_status in('J','K','Q','V') `;
            } else {
                tSQL += `and a.stock_status like '${args.data.STATUS}%' `;
            }

            var tSQL1 = '';
            if (args.data.BUYER_CD !== '') {
                tSQL1 += `on h.buyer_cd ='${args.data.BUYER_CD}' `;
                tSQL1 += `and left(a.order_cd,2) = h.buyer_cd   `;
            } else {
                tSQL1 += `on left(a.order_cd,2) = h.buyer_cd `;
            }

            if (args.data.IS_STOCK_DATE === '1') {
                tSQL += `and a.stock_date between '${args.data.S_STOCK_DATE}'  and '${args.data.E_STOCK_DATE}' `;
            }
            if (args.data.IS_REG_DATE === '1') {
                tSQL += `and left(a.reg_datetime, 8) between '${args.data.S_REG_DATE}'  and '${args.data.E_REG_DATE}' `;
            }
            if (args.data.IS_ZERO === '1') {
                if (args.data.IS_USR_STOCK === '1') {
                    tSQL += `and a.use_qty > 0 `;
                } else {
                    tSQL += `and a.remain_qty > 0 `;
                }
            }

            let sqlStr = `
                SELECT
                    I.MATL_TYPE2,
                    E.FACTORY_NAME,
                    A.STOCK_DATE,
                    LEFT(A.REG_DATETIME, 8) AS REG_DATE,
                    A.PO_CD,
                    A.ORDER_CD,
                    H.BUYER_NAME,
                    D.VENDOR_NAME,
                    A.MATL_CD,
                    B.MATL_NAME,
                    B.COLOR,
                    B.SPEC,
                    B.UNIT,
                    A.STOCK_STATUS,
                    0 AS TOTAL_QTY,
                    A.STOCK_QTY,
                    A.REMAIN_QTY,
                    A.USE_QTY,
                    A.OUT_QTY,
                    A.RACK,
                    A.LOCATION,
                    F.WARE_NAME,
                    A.WARE_DATE,
                    A.WARE_QTY,
                    A.PO_SEQ,
                    A.MRP_SEQ,
                    A.STOCK_IDX,
                    A.ORG_STOCK_IDX,
                    A.ROOT_IDX,
                    A.REMARK,
                    A.EXP_DATE,
                    A.FACTORY_CD,
                    A.MATL_SEQ,
                    J.CD_NAME AS REASON_REMARK_N,
                    A.PLAN_REMARK,
                    C.MATL_PRICE,
                    C.CURR_CD,
                    A.DEBIT_CD,
                    A.REMARK0,
                    K.REASON_REMARK,
                    (
                        CASE
                            WHEN DATEADD(D, -608, GETDATE()) < DATEADD(D, 0, A.STOCK_DATE) THEN 'S'
                            ELSE 'L'
                        END
                    ) AS SL_N
                FROM
                    KSV_STOCK_MATL A
                    LEFT JOIN KCD_BUYER H ${tSQL1}
                    LEFT JOIN KCD_FACTORY_WARE F ON F.FACTORY_CD = A.FACTORY_CD
                    AND F.WARE_CD = A.WARE_CD
                    LEFT JOIN KSV_STOCK_ORG_REASON K ON A.STOCK_IDX = K.STOCK_IDX,
                    KCD_MATL_MST B,
                    KCD_MATL_MEM C,
                    KCD_VENDOR D,
                    KCD_FACTORY E,
                    KCD_MATL_TYPE2 I,
                    KCD_CODE J
                WHERE
                    A.FACTORY_CD LIKE '%' ${tSQL}
                    AND A.PO_CD LIKE '${args.data.PO_CD}%'
                    AND A.RACK LIKE '%%'
                    AND B.MATL_CD = A.MATL_CD
                    AND B.MATL_NAME LIKE '%%' ESCAPE '['
                    AND B.COLOR LIKE '%%'
                    AND B.SPEC LIKE '%%'
                    AND B.MATL_CD LIKE '%'
                    AND C.MATL_CD = B.MATL_CD
                    AND C.MATL_SEQ = A.MATL_SEQ
                    AND D.VENDOR_CD = B.VENDOR_CD
                    AND D.VENDOR_NAME LIKE '%%'
                    AND I.SEQ LIKE '%'
                    AND E.FACTORY_CD = A.FACTORY_CD
                    AND I.SEQ = ISNULL(B.MATL_TYPE2, '')
                    AND J.CD_GROUP = 'REASON_REMARK'
                    AND J.CD_CODE = A.REASON_REMARK
                ORDER BY
                    A.STOCK_DATE DESC
                    -- OFFSET 0 ROWS FETCH NEXT 1000 ROWS ONLY
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S0512_2;
