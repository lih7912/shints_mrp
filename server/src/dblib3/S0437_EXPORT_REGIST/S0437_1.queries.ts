import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0437_1 = {
    Query: {
        mgrQueryS0437_1_CODE: async (_, args) => {
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
                select
                    *
                from
                    kcd_code
                where
                    cd_group = 'PAYMENT_TYPE'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tObj = {};
            tObj.CD_CODE = '';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.PAYMENT = tRet;

            var tArray = ['', 'ship', 'export', 'end'];
            var tArray1 = [' ', 'ship', 'export', 'end'];
            let tRet = [];
            tArray.forEach((col, i) => {
                var tObj = {};
                tObj.CD_CODE = col;
                tObj.CD_NAME = tArray1[i];
                tRet.push(tObj);
            });
            tWObj.STATUS_CD = tRet;

            let sqlStr = `
                select distinct
                    ORIGIN_PORT as CD_CODE,
                    ORIGIN_PORT as CD_NAME
                from
                    ksv_shipment_mst
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
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

            return tWObj;
        },
    },
};

export default moduleQuery_S0437_1;
