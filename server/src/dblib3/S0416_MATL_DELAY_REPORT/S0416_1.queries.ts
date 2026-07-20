import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0416_1 = {
    Query: {
        mgrQueryS0416_CODE: async (_, args) => {
            var tWObj = {};

            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_code
                where
                    cd_group = 'DELAY_REASON'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_NAME = ' ';
            tObj.CD_CODE = ' ';
            tRet.unshift(tObj);
            tWObj.DELAY_REASON = tRet;

            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_code
                where
                    cd_group = 'DELIVERY2'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_NAME = ' ';
            tObj.CD_CODE = ' ';
            tRet.unshift(tObj);
            tWObj.DELIVERY2 = tRet;

            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_code
                where
                    cd_group = 'FARE_TYPE'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_NAME = ' ';
            tObj.CD_CODE = ' ';
            tRet.unshift(tObj);
            tWObj.FARE_TYPE = tRet;

            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_code
                where
                    cd_group = 'VENDOR_MATL_TYPE'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_NAME = ' ';
            tObj.CD_CODE = ' ';
            tRet.unshift(tObj);
            tWObj.MATL_TYPE = tRet;

            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_code
                where
                    cd_group = 'VENDOR_TYPE'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_NAME = ' ';
            tObj.CD_CODE = ' ';
            tRet.unshift(tObj);
            tWObj.VENDOR_TYPE = tRet;

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

            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_BUYER
                order by
                    buyer_cd
                    -- offset 0 rows fetch next 1000 rows only
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.BUYER_NAME = ' ';
            tObj.BUYER_CD = ' ';
            tRet.unshift(tObj);
            tWObj.BUYER_CD = tRet;

            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_VENDOR
                order by
                    vendor_cd
                    -- offset 0 rows fetch next 1000 rows only
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.VENDOR_NAME = ' ';
            tObj.VENDOR_CD = ' ';
            tRet.unshift(tObj);
            tWObj.VENDOR_CD = tRet;

            let sqlStr = `
                SELECT
                    *
                FROM
                    KSV_PO_MST
                where
                    po_status = '4'
                    and po_seq = 1
                    and plan_flag = '1'
                order by
                    reg_datetime desc
                    -- offset 0 rows fetch next 1000 rows only
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.PO_CD = ' ';
            tRet.unshift(tObj);
            tWObj.PO_CD = tRet;

            return tWObj;
        },
    },
};

export default moduleQuery_S0416_1;
