// MGR_@@TNAME@@.queries.js

import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0218_EXCHANGE_RATE_RECORD_TBL_KCD_CURR_COMM = {
    Query: {
        mgrQuery_S0218_EXCHANGE_RATE_RECORD_TBL_KCD_CURR_COMM: async (
            _,
            args,
        ) => {
            var tSQL = '';
            if (args.KEY1 !== '') {
                tSQL += `AND KEY1 = '${args.KEY1}' `;
            }
            let sqlStr = `
                SELECT DISTINCT
                    START_DATE
                FROM
                    KCD_CURR_COM
                ORDER BY
                    START_DATE DESC
                    -- OFFSET 0 rows fetch next 1000 rows only
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                B_DATE: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S0218_EXCHANGE_RATE_RECORD_TBL_KCD_CURR_COMM;
