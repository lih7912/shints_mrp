import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0414_1 = {
    Query: {
        mgrQueryS0414_CODE: async (_, args) => {
            var tWObj = {};

            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_code
                where
                    cd_group = 'PAYMENT_TYPE'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_NAME = ' ';
            tObj.CD_CODE = ' ';
            tRet.unshift(tObj);
            tWObj.PAYMENT_TYPE = tRet;

            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_code
                where
                    cd_group = 'DELIVERY_TYPE'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_NAME = ' ';
            tObj.CD_CODE = ' ';
            tRet.unshift(tObj);
            tWObj.DELIVERY_TYPE = tRet;

            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_code
                where
                    cd_group = 'TRADE_TYPE'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_NAME = ' ';
            tObj.CD_CODE = ' ';
            tRet.unshift(tObj);
            tWObj.TRADE_TYPE = tRet;

            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_FACTORY
                where
                    factory_cd in ('FC010', 'FC034', 'FC044')
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.FACTORY_NAME = ' ';
            tObj.FACTORY_CD = ' ';
            tRet.unshift(tObj);
            tWObj.FACTORY_CD = tRet;

            return tWObj;
        },
    },
};

export default moduleQuery_S0414_1;
