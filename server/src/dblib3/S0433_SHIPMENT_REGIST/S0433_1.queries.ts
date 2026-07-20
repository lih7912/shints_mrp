import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0433_1 = {
    Query: {
        mgrQueryS0433_1_CODE: async (_, args) => {
            var tWObj = {};

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
            tObj.CD_CODE = 'BVT(TN)';
            tObj.CD_NAME = `BVT(TN)`;
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

            tRet.push({ CD_CODE: 'TRUCK', CD_NAME: 'TRUCK' });
            tRet.push({ CD_CODE: 'AIR', CD_NAME: 'AIR' });
            tRet.push({ CD_CODE: 'FEDEX', CD_NAME: 'FEDEX' });
            tRet.push({ CD_CODE: 'DHL', CD_NAME: 'DHL' });
            tRet.push({ CD_CODE: 'UPS', CD_NAME: 'UPS' });
            tRet.push({ CD_CODE: 'EXPRESS', CD_NAME: 'EXPRESS' });
            tRet.push({ CD_CODE: 'Handcarry', CD_NAME: 'Handcarry' });
            tRet.push({ CD_CODE: 'EXPRESS(3rd)', CD_NAME: 'EXPRESS(3rd)' });
            tRet.push({
                CD_CODE: 'EXPRESS(Pick-up)',
                CD_NAME: 'EXPRESS(Pick-up)',
            });
            tWObj.SHIP_LINE = tRet;

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

            let tArray = ['', 'SHINTS', 'ETP', 'BVT', 'SINGAPORE', '3RD', 'TN'];
            let tArray1 = [
                ' ',
                'SHINTS',
                'ETP',
                'BVT',
                'SINGAPORE',
                '3RD',
                'TN',
            ];
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

export default moduleQuery_S0433_1;
