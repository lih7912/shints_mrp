// MGR_@@TNAME@@.queries.js

import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0101_KCD_FACTORY_TBL_KCD_FACTORY = {
    Query: {
        mgrQuery_S0101_KCD_FACTORY_TBL_KCD_FACTORY: async (_, args) => {
            var tSQL = '';
            //  if (args.data.FACTORY_CD !== '') {
            //      tSQL += `AND A.FACTORY_CD like '%%${args.data.FACTORY_CD}%%' `;
            //  }
            //  if (args.data.FACTORY_NAME !== '') {
            //      tSQL += `AND A.FACTORY_NAME like '%%${args.data.FACTORY_NAME}%%' `;
            //  }
            //  if (args.data.STATUS_CD !== '') {
            //      tSQL += `AND A.STATUS_CD like '%%${args.data.STATUS_CD}%%' `;
            //  }
            let sqlStr = `
                SELECT
                    A.*,
                    B.CD_NAME AS STATUS_NAME,
                    C.NAT_NAME,
                    D.BANK_NAMe,
                    D.ACCOUNT_NO,
                    D.ACCOUNT_NAME
                FROM
                    KCD_FACTORY A
                    LEFT JOIN KCD_CODE B ON B.CD_CODE = A.STATUS_CD
                    AND B.CD_GROUP = 'STATUS_CD'
                    LEFT JOIN KCD_NATION C ON C.NAT_CD = A.NAT_CD
                    LEFT JOIN KCD_BANK D ON D.BANK_CD = A.BANK_CD
                WHERE
                    A.id > 0
                    and a.factory_cd in ('fc034', 'fc044', 'fc010', 'fc045')
                    AND A.FACTORY_CD like '%${args.data.FACTORY_CD}%'
                    AND A.FACTORY_NAME like '%${args.data.FACTORY_NAME}%'
                    AND A.STATUS_CD like '%${args.data.STATUS_CD}%'
                ORDER BY
                    A.FACTORY_CD desc
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            return tRet;
        },

        mgrQuery_S0101_KCD_FACTORY_CODE: async (_, args) => {
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
            var tObj = {};
            tObj.CD_CODE = '';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWRet.STATUS_CD = tRet;

            let sqlStr1 = `
                SELECT
                    *
                FROM
                    KCD_NATION
            `;
            var tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));
            var tObj = {};
            tObj.NAT_CD = '';
            tObj.NAT_NAME = ' ';
            tRet1.unshift(tObj);
            tWRet.NAT_CD = tRet1;

            return tWRet;
        },
    },
};

export default moduleQuery_S0101_KCD_FACTORY_TBL_KCD_FACTORY;
