// MGR_@@TNAME@@.queries.js

import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0112_KCD_CURRENCY_TBL_KCD_CURRENCY = {
    Query: {
        mgrQuery_S0112_KCD_CURRENCY_CODE: async (_, args) => {
            var tWRet = {};

            var tSQL = '';
            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'CURR_CD'
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_CODE = '';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWRet.CURR_CD = tRet;

            return tWRet;
        },

        mgrQuery_S0112_KCD_CURRENCY_TBL_KCD_CURRENCY: async (_, args) => {
            var tSQL = '';
            if (args.data.START_DATE !== '') {
                tSQL += `WHERE start_date = '${args.data.START_DATE}' `;
                tSQL += `AND curr_cd  in ('KRW', 'USD', 'JPY', 'EUR', 'GBP', 'CHF', 'HKD', 'IDR', 'CNY', 'VND', 'ETB' ) `;
            }
            // var tStartDate = '20230222';
            var tStartDate = args.data.START_DATE;
            let sqlStr = `
                SELECT
                    START_DATE,
                    CURR_CD,
                    ISNULL(usd_rate, '0') AS USD_RATE,
                    ISNULL(won_amt, '0') AS WON_AMT,
                    ISNULL(won_amt2, '0') AS WON_AMT2
                from
                    kcd_currency ${tSQL}
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                CURR_CD: '',
                START_DATE: '',
                USD_RATE: '',
                WON_AMT: '',
                WON_AMT2: '',
            };
            return tRet;

            /*
       let sqlStr1 = `
           SELECT
               START_DATE,
               CURR_CD,
               ISNULL(usd_rate, '0') AS USD_RATE,
               ISNULL(won_amt, '0') AS WON_AMT,
               ISNULL(won_amt2, '0') AS WON_AMT2
           from
               kcd_currency
           where
               START_DATE = (
                   SELECT
                       MAX(START_DATE)
                   FROM
                       KCD_CURRENCY
               )
       `;
       var tRet  =  await prisma.$queryRaw(Prisma.raw(sqlStr1));

       var tRetArray = [];
       var tIdx = 0; 
       for (tIdx = 0; tIdx < tRet.length; tIdx++) {
          var tObj0 = tRet[tIdx];
          var tObj = {};
          tObj.START_DATE = args.data.START_DATE;
          tObj.CURR_CD = tObj0.CURR_CD;
          tObj.USD_RATE = tObj0.USD_RATE;
          tObj.WON_AMT = tObj0.WON_AMT;
          tObj.WON_AMT2 = tObj0.WON_AMT2;
          tRetArray.push(tObj);
       }
       return (tRetArray);
*/
        },
    },
};

export default moduleQuery_S0112_KCD_CURRENCY_TBL_KCD_CURRENCY;
