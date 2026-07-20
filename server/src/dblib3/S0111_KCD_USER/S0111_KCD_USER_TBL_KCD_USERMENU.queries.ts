// MGR_@@TNAME@@.queries.js

import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0111_KCD_USER_TBL_KCD_USERMENU = {
    Query: {
        mgrQuery_S0111_KCD_USER_TBL_KCD_USERMENU: async (_, args) => {
            let sqlStr = `
                SELECT
                    A.USER_ID,
                    A.MENU_ID,
                    B.MENU_NAME,
                    A.AUTH_FLAG
                FROM
                    (
                        SELECT
                            *
                        FROM
                            KCD_USERMENU
                        WHERE
                            USER_ID = '${args.data.USER_ID}'
                            AND AUTH_FLAG = '1'
                            -- ORDER BY MENU_ID 
                            -- OFFSET 0 rows FETCH NEXT 1000 rows only
                    ) A
                    LEFT JOIN KCD_MENU B ON A.MENU_ID = B.MENU_ID
            `;
            return await prisma.$queryRaw(Prisma.raw(sqlStr));
        },
    },
};

export default moduleQuery_S0111_KCD_USER_TBL_KCD_USERMENU;
