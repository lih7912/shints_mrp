import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0518_1 = {
    Query: {
        mgrQueryS0518_1_CODE: async (_, args) => {
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
            tObj.CD_CODE = '';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.SHIP_MODE = tRet;

            let sqlStr = `
                -- select * from kcd_code where cd_group = 'STATUS_CD'
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
                    cd_group='origin_port'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tObj = {};
            tObj.CD_CODE = '';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);

            tRet = tRet.filter((row) => row.CD_CODE !== '3RD');
            const tObj3rd = {};
            tObj3rd.CD_CODE = '3RD';
            tObj3rd.CD_NAME = '3RD';
            tRet.push(tObj3rd);
            
            tWObj.ORIGIN_PORT = tRet;

            let tArray = ['', 'SHINTS', 'ETP', 'BVT', 'SINGAPORE', '3RD', 'TN'];
            let tArray1 = [' ', 'SHINTS', 'ETP', 'BVT', 'SINGAPORE', '3RD', 'TN'];
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

export default moduleQuery_S0518_1;
