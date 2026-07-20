import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0431_LIST_1 = {
    Query: {
        mgrQueryS0431_LIST_1: async (_, args) => {
            var tSQL = '';
            /*
       if (args.data.STYLE_CD !== '') {
           tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
       }
       var sqlPu = '';
       var tCols = args.data.PU_CD.split(',');
       var tIndex = 0;
       tCols.forEach((col0, i) => {
           var col = col0.trim();
           if (col !== '') {
               if (tIndex === 0) sqlPu = ` '${col.trim()}' `;
               else  sqlPu += ` ,'${col.trim()}' `;
               tIndex += 1;
           }
       });
*/
            var inSql = '';
            args.data.forEach((col, i) => {
                if (i === 0) inSql = `'${col.PU_CD}'`;
                else inSql += `,'${col.PU_CD}'`;
            });

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
                    isnull(A1.OVER_SHORT, '') as OVER_SHORT,
                    A.FACTORY_CD,
                    A.ORIGIN_PORT,
                    A.TRADE_TERM,
                    isnull(sum(A2.PO_PRICE * A2.PO_QTY2), 0) as PU_AMT,
                    isnull(sum(A2.PO_PRICE * A2.IN_QTY), 0) as STS_IN_AMT,
                    isnull(sum(A2.PO_PRICE * A2.OUT_QTY), 0) as STS_OUT_AMT,
                    isnull(sum(A2.PO_PRICE * A2.INFAC_QTY), 0) as FACIN_AMT,
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
                    AND A.PU_CD in (${inSql})
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
                    A1.PAY_TERM,
                    A.CURR_CD,
                    A.VENDOR_CD,
                    A.TARGET_ETA,
                    A.ETA,
                    A.DEPOSIT_AMT,
                    A.LC_AMT,
                    A1.PAY_TYPE,
                    A.PAY_DATE,
                    A.BILL_TO,
                    A1.OVER_SHORT,
                    A.FACTORY_CD,
                    A.ORIGIN_PORT,
                    A.TRADE_TERM
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

export default moduleQuery_S0431_LIST_1;
