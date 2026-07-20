// MGR_@@TNAME@@.queries.js

import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0104_KCD_NATION_TBL_KCD_NATION = {
    Query: {
        mgrQuery_S0104_KCD_NATION_CODE: async (_, args) => {
            var tWRet = {};

            var tSQL = '';
            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'STATUS_CD'
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWRet.STATUS_CD = tRet;

            return tWRet;
        },

        mgrQuery_S0104_KCD_NATION_TBL_KCD_NATION: async (_, args) => {
            var tSQL = '';
            /*
       if (args.KEY1 !== '') {
           tSQL += `AND KEY1 = '${args.KEY1}' `;
       }
*/
            if (args.data.NAT_CD !== '') {
                tSQL += ` AND (A.NAT_CD like '%%${args.data.NAT_CD}%%')`;
            }

            if (args.data.NAT_NAME !== '') {
                tSQL += ` AND A.NAT_NAME like '%%${args.data.NAT_NAME}%%' `;
            }

            let sqlStr = `
                select
                    A.id,
                    A.NAT_CD,
                    A.NAT_NAME,
                    A.STATUS_CD,
                    B.CD_NAME as STATUS_NAME
                from
                    kcd_nation A,
                    kcd_code B
                where
                    A.id > 0
                    and A.status_cd = B.cd_code
                    and B.cd_group = 'STATUS_CD' ${tSQL}
                order by
                    A.nat_cd
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S0104_KCD_NATION_TBL_KCD_NATION;
