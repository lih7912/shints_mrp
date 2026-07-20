import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0430_3_1 = {
    Query: {
        mgrQueryS0430_3_1: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }
            let sqlStr = `
                SELECT
                    A.PU_STATUS,
                    A.REG_USER,
                    A.BUYER_CD,
                    A4.BUYER_NAME,
                    A.PU_CD,
                    A.PO_CD2 AS PO_CD,
                    A1.VENDOR_NAME,
                    A1.VENDOR_TYPE,
                    A3.CD_NAME as VENDOR_TYPE_N,
                    A.MATL_TYPE,
                    A.NORMI,
                    A.MRP_DATE,
                    A.ORDER_DATE,
                    A.DELIVERY_DATE AS DUE_DATE,
                    A.EXP_DELIVERY_DATE AS EX_FACTORY,
                    A.TRADE_TERM AS PAY_TERM,
                    A.CURR_CD,
                    A.VENDOR_CD,
                    A.TARGET_ETA,
                    A.ETA,
                    A.DEPOSIT_AMT,
                    A.LC_AMT,
                    A.PAY_TYPE AS PAY_CONDITION,
                    A.PAY_DATE AS PAY_DATE,
                    isnull(A1.OVER_SHORT, '') as OVER_SHORT,
                    isnull(sum(A2.PO_PRICE * A2.PO_QTY2), 0) as PU_AMT,
                    isnull(sum(A2.PO_PRICE * A2.IN_QTY), 0) as SUM_STS_IN,
                    isnull(sum(A2.PO_PRICE * A2.OUT_QTY), 0) as SUM_STS_OUT,
                    isnull(sum(A2.PO_PRICE * A2.INFAC_QTY), 0) as SUM_FACIN,
                    isnull(sum(A2.PO_PRICE * A2.MOQ), 0) as MOQ_AMT,
                    isnull(sum(A2.SURCHARGE_AMT), 0) as SURCHARGE_AMT
                FROM
                    KSV_PU_MST2 A,
                    KCD_VENDOR A1,
                    KSV_STOCK_MEM2 A2,
                    KCD_CODE A3,
                    KCD_BUYER A4
                WHERE
                    A.VENDOR_CD = A1.VENDOR_CD
                    AND A.BUYER_CD = A4.BUYER_CD
                    AND A.PU_CD = A2.PU_CD
                    AND A.PU_TYPE = '1'
                    AND A1.VENDOR_TYPE = A3.CD_CODE
                    and A3.CD_GROUP = 'VENDOR_TYPE'
                    AND A.PU_CD = '${args.data.PU_CD}'
                    -- AND     A.PO_CD2 like '%${args.data.PO_CD}%'
                    -- AND     A.BUYER_CD like '%${args.data.BUYER_CD}%'
                GROUP BY
                    A.PU_STATUS,
                    A.REG_USER,
                    A.BUYER_CD,
                    A4.BUYER_NAME,
                    A.PU_CD,
                    A.PO_CD2,
                    A1.VENDOR_NAME,
                    A1.VENDOR_TYPE,
                    A3.CD_NAME,
                    A.MATL_TYPE,
                    A.NORMI,
                    A.MRP_DATE,
                    A.ORDER_DATE,
                    A.DELIVERY_DATE,
                    A.EXP_DELIVERY_DATE,
                    A.TRADE_TERM,
                    A.CURR_CD,
                    A.VENDOR_CD,
                    A.TARGET_ETA,
                    A.ETA,
                    A.DEPOSIT_AMT,
                    A.LC_AMT,
                    A.PAY_TYPE,
                    A.PAY_DATE,
                    A1.OVER_SHORT
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetArray = [];

            var tIdx = 0;
            tRet.forEach((col, i) => {
                var tObj = { ...col };
                var tBalAmt =
                    parseFloat(tObj.PU_AMT) - parseFloat(tObj.SUM_STS_IN);
                tObj.BAL_AMT = String(tBalAmt);
                tRetArray.push(tObj);
            });
            return tRetArray;
        },
    },
};

export default moduleQuery_S0430_3_1;
