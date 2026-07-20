import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0435_1 = {
    Query: {
        mgrQueryS0435_1_CODE: async (_, args) => {
            var tWObj = {};

            let sqlStr = `
                select
                    *
                from
                    kcd_code
                where
                    cd_group = 'CURR_CD'
                order by
                    cd_flag
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tObj = {};
            tObj.CD_CODE = '';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.CURR_CD = tRet;

            let sqlStr = `
                select
                    *
                from
                    kcd_code
                where
                    cd_group = 'SHIPMENT_SHIP_MODE'
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
                    kcd_code
                where
                    cd_group = 'SHIPMENT_STATUS'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tObj = {};
            tObj.CD_CODE = '';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.STATUS_CD = tRet;

            let sqlStr = `
                select
                    *
                from
                    kcd_code
                where
                    cd_group = 'ORIGIN_PORT'
            `;
            let tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRet = [];
            tRet0.forEach((col, i) => {
                var tObj = {
                    ...col,
                };
                tObj.CD_NAME += ` / ${col.ETC2}`;
                tRet.push(tObj);
            });
            let tObj = {};
            tObj.CD_CODE = 'SHINTS';
            tObj.CD_NAME = `SHINTS/KOREA`;
            tRet.push(tObj);
            let tObj = {};
            tObj.CD_CODE = 'BVT';
            tObj.CD_NAME = `BVT`;
            tRet.push(tObj);
            let tObj = {};
            tObj.CD_CODE = 'ETP';
            tObj.CD_NAME = `ETP`;
            tRet.push(tObj);
            let tObj = {};
            tObj.CD_CODE = '';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.ORIGIN_PORT = tRet;

            let tArray = ['', 'SHINTS', 'ETP', 'BVT', 'SINGAPORE'];
            let tArray1 = [' ', 'SHINTS', 'ETP', 'BVT', 'SINGAPORE'];
            let tRet = tArray.map((col, i) => {
                var tObj = {};
                tObj.id = i;
                tObj.CD_CODE = col;
                tObj.CD_NAME = tArray1[i];
                return tObj;
            });
            tWObj.DESTINATION = tRet;

            tArray = ['', 'Shints', 'ETP', 'BVT', 'Other'];
            tArray1 = [' ', 'Shints', 'ETP', 'BVT', 'Other'];

            tRet = tArray.map((col, i) => {
                var tObj = {};
                tObj.id = i;
                tObj.CD_CODE = col;
                tObj.CD_NAME = tArray1[i];
                return tObj;
            });

            console.log('tRet', tRet);

            tWObj.PAYER = tRet;

            console.log('tWObj', tWObj);

            return tWObj;
        },
    },
};

export default moduleQuery_S0435_1;
