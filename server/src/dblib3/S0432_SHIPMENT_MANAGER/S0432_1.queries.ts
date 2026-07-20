import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0432_1 = {
    Query: {
        mgrQueryS0432_1_CODE: async (_, args) => {
            var tWObj = {};

            let sqlStr = `
                select
                    *
                from
                    kcd_code
                where
                    cd_group = 'SHIP_LINE'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tObj = {};
            tObj.CD_CODE = '';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.SHIP_LINE = tRet;

            let sqlStr = `
                select
                    *
                from
                    kcd_code
                where
                    cd_group = 'DELIVERY_TYPE'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tObj = {};
            tObj.CD_CODE = '';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.SHIP_MODE = tRet;

            let sqlStr = `
                select
                    *
                from
                    kcd_place
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tObj = {};
            tObj.PLACE_CD = '';
            tObj.PLACE_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.PLACE_CD = tRet;

            let tArray = ['', 'ETP', 'BVT', 'SINGAPORE'];
            let tArray1 = [' ', 'ETP', 'BVT', 'SINGAPORE'];
            let tRet = tArray.map((col, i) => {
                var tObj = {};
                tObj.id = i;
                tObj.CD_CODE = col;
                tObj.CD_NAME = tArray1[i];
                return tObj;
            });
            tWObj.DESTINATION = tRet;

            return tWObj;
        },
    },
};

export default moduleQuery_S0432_1;
