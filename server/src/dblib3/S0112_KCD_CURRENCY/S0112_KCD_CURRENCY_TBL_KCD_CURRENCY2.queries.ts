// MGR_@@TNAME@@.queries.js

import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0112_KCD_CURRENCY_TBL_KCD_CURRENCY2 = {
    Query: {
        mgrQuery_S0112_KCD_CURRENCY_TBL_KCD_CURRENCY2: async (_, args) => {
            var tSQL = '';
            if (args.data.S_DATE !== '') {
                tSQL += `AND START_DATE between '${args.data.S_DATE}' AND '${args.data.E_DATE}' `;
            }
            if (args.data.CURR_CD !== '') {
                tSQL += `AND CURR_CD = '${args.data.CURR_CD}' `;
            }

            let sqlStr = `
                SELECT
                    START_DATE,
                    CURR_CD,
                    USD_RATE,
                    WON_AMT
                FROM
                    KCD_CURRENCY
                WHERE
                    id > 0 ${tSQL}
                    -- ORDER BY START_DATE, curr_cd DESC 
                    -- OFFSET 0 rows FETCH NEXT 1000 rows only
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                CURR_CD: '',
                START_DATE: '',
                USD_RATE: '',
                WON_AMT: '',
                WON_AMT2: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S0112_KCD_CURRENCY_TBL_KCD_CURRENCY2;
