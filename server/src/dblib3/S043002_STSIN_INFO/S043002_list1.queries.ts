import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S043002_LIST_1 = {
    Query: {
        mgrQueryS043002_LIST_1: async (_, args) => {
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
                    A1.OVERSHORT_RATE,
                    A3.CD_NAME as VENDOR_TYPE_N,
                    A.MATL_TYPE,
                    A.NORMI,
                    A.MRP_DATE,
                    A.ORDER_DATE,
                    A.DELIVERY_DATE AS DUE_DATE,
                    A.EXP_DELIVERY_DATE AS EX_FACTORY,
                    A1.PAY_TERM AS PAY_TERM,
                    A.CURR_CD,
                    A.VENDOR_CD,
                    A.TARGET_ETA,
                    A.ETA,
                    A.DEPOSIT_AMT,
                    A.LC_AMT,
                    A1.PAY_TYPE AS PAY_CONDITION,
                    A.PAY_DATE AS PAY_DATE,
                    A.BILL_TO,
                    isnull(A0.OVERSHORT, '0') as OVER_SHORT,
                    isnull(A.PU_AMT, 0) as PU_AMT,
                    isnull(A0.STSIN_AMT, 0) as STS_IN_AMT,
                    '0' as STS_OUT_AMT,
                    '0' as FACIN_AMT,
                    isnull(A0.MOQ_AMT, 0) as MOQ_AMT,
                    isnull(A0.SURCHASE_AMT, 0) as SURCHARGE_AMT
                FROM
                    KSV_STOCK_IN_MST A0,
                    KSV_PU_MST2 A,
                    KCD_VENDOR A1,
                    KSV_STOCK_MEM2 A2,
                    KCD_CODE A3,
                    KCD_BUYER A4
                WHERE
                    A0.STSIN_CD = '${args.data.STSIN_CD}'
                    AND A0.PU_CD = A.PU_CD
                    AND A.VENDOR_CD = A1.VENDOR_CD
                    AND A.BUYER_CD = A4.BUYER_CD
                    AND A.PU_CD = A2.PU_CD
                    AND A.PU_TYPE = '1'
                    AND A1.VENDOR_TYPE = A3.CD_CODE
                    and A3.CD_GROUP = 'VENDOR_TYPE'
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetArray = [];

            var tIdx = 0;
            tRet.forEach((col, i) => {
                var tObj = { ...col };
                var tBalAmt =
                    parseFloat(tObj.PU_AMT) - parseFloat(tObj.STS_IN_AMT);
                tObj.BAL_AMT = String(tBalAmt);
                tRetArray.push(tObj);
            });
            return tRetArray;
        },
    },
};

export default moduleQuery_S043002_LIST_1;
