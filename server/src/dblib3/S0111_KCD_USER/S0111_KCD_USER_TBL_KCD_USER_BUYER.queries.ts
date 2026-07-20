// MGR_@@TNAME@@.queries.js

import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0111_KCD_USER_TBL_KCD_USER_BUYER = {
    Query: {
        mgrQuery_S0111_KCD_USER_TBL_KCD_USER_BUYER: async (_, args) => {
            console.log('-----------------------------', args.data.USER_ID);
            let sqlStr = `
                select
                    *
                from
                    KCD_BUYER_TEAM_INFO
                where
                    user_id = '${args.data.USER_ID}'
            `;
            return await prisma.$queryRaw(Prisma.raw(sqlStr));
        },
    },
};

export default moduleQuery_S0111_KCD_USER_TBL_KCD_USER_BUYER;
