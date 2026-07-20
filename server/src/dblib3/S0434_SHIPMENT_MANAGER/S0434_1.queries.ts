import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0434_1 = {
    Query: {
        mgrQueryS0434_1_CODE: async (_, args) => {
            var tWObj = {};

            let sqlStr = `
                -- select * from kcd_code where cd_group = 'DELIVERY_TYPE'
                select
                    *
                from
                    kcd_code
                where
                    cd_group = 'SHIPMENT_SHIP_MODE'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tObj = {};
            /*
       tObj.CD_CODE = '';
       tObj.CD_NAME = ' ';
       tRet.unshift(tObj);
       */
            tWObj.SHIP_MODE = tRet;

            let sqlStr = `
                select
                    *
                from
                    kcd_code
                where
                    cd_group = 'SHIPMENT_STATUS'
                order by
                    cd_flag
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tObj = {};
            /*
       tObj.CD_CODE = '';
       tObj.CD_NAME = ' ';
       tRet.unshift(tObj);
       */
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

            let sqlCurr = `
                select
                    *
                from
                    kcd_code
                where
                    cd_group = 'CURR_CD'
                order by
                    cd_code
            `;
            let tRetCurr = await prisma.$queryRaw(Prisma.raw(sqlCurr));
            let tEmptyObj = {};
            tEmptyObj.CD_CODE = '';
            tEmptyObj.CD_NAME = ' ';
            tRetCurr.unshift(tEmptyObj);
            tWObj.CURR_CD = tRetCurr;

            return tWObj;
        },
    },
};

export default moduleQuery_S0434_1;
