// MGR_@@TNAME@@.queries.js

import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0218_EXCHANGE_RATE_RECORD_TBL_KCD_CURR_COMM1 = {
    Query: {
        mgrQuery_S0218_EXCHANGE_RATE_RECORD_TBL_KCD_CURR_COMM1: async (
            _,
            args,
        ) => {
            var tSQL = '';
            if (args.data.START_DATE !== '') {
                tSQL += `AND KEY1 = '${args.KEY1}' `;
            }

            let sqlStr = `
                SELECT
                    B.CD_FLAG,
                    B.CD_NAME AS CURR_CD,
                    isnull(A.START_DATE, '') as START_DATE,
                    isnull(A.CURR_AMT, 0) as CURR_AMT,
                    isnull(A.USD_RATE, 0) as USD_RATE,
                    B.CD_CODE
                FROM
                    (
                        SELECT
                            *
                        FROM
                            KCD_CODE
                        WHERE
                            CD_GROUP = 'CURR_CD'
                    ) B
                    LEFT JOIN (
                        SELECT
                            *
                        FROM
                            KCD_CURR_COM
                        WHERE
                            START_DATE = '${args.data.START_DATE}'
                    ) A ON B.CD_CODE = A.CURR_CD
                ORDER BY
                    B.CD_FLAG
            `;

            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                CURR: '',
                USE_RATE: '',
                USE_PRICE: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S0218_EXCHANGE_RATE_RECORD_TBL_KCD_CURR_COMM1;
