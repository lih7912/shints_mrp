import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0605_1 = {
    Query: {
        mgrQueryS0605_CODE: async (_, args) => {
            var tWObj = {};

            let sqlStr = `
                select
                    *
                from
                    kcd_code
                where
                    cd_group = 'DELIVERY_TYPE'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_CODE = ' ';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.DELIVERY_TYPE = tRet;

            let sqlStr = `
                select
                    *
                from
                    kcd_nation
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.NAT_CD = ' ';
            tObj.NAT_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.NAT_CD = tRet;

            let sqlStr = `
                select
                    *
                from
                    kcd_buyer
                where
                    status_cd = '0'
                order by
                    buyer_cd
                    -- offset 0 rows fetch next 1000 rows only
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.BUYER_CD = ' ';
            tObj.BUYER_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.BUYER_CD = tRet;

            let sqlStr = `
                select
                    *
                from
                    kcd_code
                where
                    cd_group = 'CURR_CD'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_CODE = ' ';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.CURR_CD = tRet;

            let sqlStr = `
                select
                    *
                from
                    kcd_factory
                where
                    factory_cd in ('FC010', 'FC044', 'FC034')
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.FACTORY_CD = ' ';
            tObj.FACTORY_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.FACTORY_CD = tRet;

            let sqlStr = `
                select
                    *
                from
                    kcd_code
                where
                    cd_group = 'PAYMENT_TYPE'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_CODE = ' ';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.PAYMENT_TYPE = tRet;

            let sqlStr = `
                select
                    *
                from
                    kcd_code
                where
                    cd_group = 'TRADE_TYPE'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_CODE = ' ';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.TRADE_TYPE = tRet;

            let sqlStr = `
                select
                    *
                from
                    kcd_code
                where
                    cd_group = 'TRADE_TYPE2'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_CODE = ' ';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.TRADE_TYPE2 = tRet;

            return tWObj;
        },
    },
};

export default moduleQuery_S0605_1;
