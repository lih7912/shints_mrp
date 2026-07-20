import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0440_1 = {
    Query: {
        mgrQueryS0440_1_CODE: async (_, args) => {
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
                    cd_group = 'ORIGIN_PORT'
            `;
            let tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tRet = [];
            tRet0.forEach((col, i) => {
                var tObj = { ...col };
                tObj.CD_NAME = `${col.CD_NAME}/${col.ETC2}`;
                tRet.push(tObj);
            });
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

            let sqlStr = `
                select
                    top 1000 *
                from
                    kcd_buyer
                where
                    status_cd = '0'
                order by
                    reg_datetime desc
            `;
            let tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tRet = [];
            tRet0.forEach((col, i) => {
                var tObj = { ...col };
                tObj.BUYER_NAME = `(${col.BUYER_CD})${col.BUYER_NAME}`;
                tRet.push(tObj);
            });

            let tObj = {};
            tObj.BUYER_CD = '';
            tObj.BUYER_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.BUYER_CD = tRet;

            let tArray = [
                '',
                'SHINTS',
                'BVT',
                'BVT(TN)',
                'ETP',
                '3RD',
                'HANOI',
                'HAIPHONG',
            ];
            let tArray1 = [
                ' ',
                'SHINTS',
                'BVT',
                'BVT(TN)',
                'ETP',
                '3RD',
                'HANOI',
                'HAIPHONG',
            ];
            let tRet = tArray.map((col, i) => {
                var tObj = {};
                tObj.id = i;
                tObj.CD_CODE = col;
                tObj.CD_NAME = tArray1[i];
                return tObj;
            });
            tWObj.ORIGIN = tRet;

            let tArray = ['', 'SHINTS', 'BVT', 'ETP', 'TN', '3RD'];
            let tArray1 = [' ', 'SHINTS', 'BVT', 'ETP', 'TN', '3RD'];
            let tRet = tArray.map((col, i) => {
                var tObj = {};
                tObj.id = i;
                tObj.CD_CODE = col;
                tObj.CD_NAME = tArray1[i];
                return tObj;
            });
            tWObj.DESTINATION = tRet;

            let sqlStr = `
                select
                    *
                from
                    kcd_code
                where
                    cd_group = 'payment_type'
                    and etc2 = '1'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tObj = {};
            tObj.CD_CODE = '';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.PAYMENT = tRet;

            /*
       let tArray = ['', 'Payment', 'FOC', 'Investment' ];
       let tArray1 = [' ', 'Payment', 'FOC', 'Investment' ];
       let tRet = tArray.map((col, i) => {
           var tObj = {};
           tObj.id = i;
           tObj.CD_CODE = col;
           tObj.CD_NAME = tArray1[i];
           return (tObj);
       });
       tWObj.PAYMENT = tRet;
       */

            let sqlStr = `
                select
                    *
                from
                    kcd_user
                where
                    status_cd = '0'
                order by
                    user_id
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tObj = {};
            tObj.USER_ID = ' ';
            tObj.USER_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.USER_ID = tRet;

            return tWObj;
        },
    },
};

export default moduleQuery_S0440_1;
