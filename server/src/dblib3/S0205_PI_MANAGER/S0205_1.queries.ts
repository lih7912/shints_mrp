import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0205_1 = {
    Query: {
        mgrQueryS0205_1_CODE: async (_, args) => {
            var tWObj = {};

            let sqlStr = `
                select
                    *
                from
                    kcd_buyer
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

            let sqlStr = `
                select
                    *
                from
                    kcd_code
                where
                    cd_group = 'STATUS_CD'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tObj = {};
            tObj.CD_CODE = ' ';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.STATUS_CD = tRet;

            let sqlStr = `
                select
                    *
                from
                    kcd_code
                where
                    cd_group = 'PI_ORIGIN'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tObj = {};
            tObj.CD_CODE = ' ';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.PI_ORIGIN = tRet;

            /*
       let sqlStr = `
           select
               *
           from
               kcd_code
           where
               cd_group = 'ORIGIN_PORT'
       `;
       let  tRet0  =  await prisma.$queryRaw(Prisma.raw(sqlStr));
       let  tRet = [];
       tRet0.forEach((col, i) => {
            var tObj = { ...col };
            tObj.CD_NAME = `(${col.ETC2})${col.CD_NAME}`;
            tRet.push(tObj);
       });
       let tObj = {};
       tObj.CD_CODE = '';
       tObj.CD_NAME = ' ';
       tRet.unshift(tObj);
       tWObj.ORIGIN_PORT = tRet;
       */

            let sqlStr = `
                select
                    isnull(SHIP_ADDR1, '') as SHIP_ADDR1,
                    isnull(SHIP_ADDR2, '') as SHIP_ADDR2,
                    isnull(SHIP_ADDR3, '') as SHIP_ADDR3
                from
                    kcd_buyer
                where
                    buyer_cd = '${args.data.BUYER_CD}'
            `;
            let tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tRet = [];
            if (tRet0.length > 0) {
                if (tRet0[0].SHIP_ADDR1 !== '') {
                    var tObj = {};
                    tObj.CD_CODE = '1';
                    tObj.CD_NAME = tRet0[0].SHIP_ADDR1;
                    tRet.push(tObj);
                }
                if (tRet0[0].SHIP_ADDR2 !== '') {
                    var tObj = {};
                    tObj.CD_CODE = '2';
                    tObj.CD_NAME = tRet0[0].SHIP_ADDR2;
                    tRet.push(tObj);
                }
                if (tRet0[0].SHIP_ADDR3 !== '') {
                    var tObj = {};
                    tObj.CD_CODE = '3';
                    tObj.CD_NAME = tRet0[0].SHIP_ADDR3;
                    tRet.push(tObj);
                }
            }
            let tObj = {};
            tObj.CD_CODE = '';
            tObj.CD_NAME = '직접입력';
            tRet.unshift(tObj);
            tWObj.ORIGIN_PORT = tRet;

            let sqlStr = `
                select
                    *
                from
                    kcd_code
                where
                    cd_group = 'LOADING_PORT'
            `;
            let tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tRet = [];
            tRet0.forEach((col, i) => {
                var tObj = { ...col };
                tObj.CD_NAME = `(${col.ETC2})${col.CD_NAME}`;
                tRet.push(tObj);
            });
            let tObj = {};
            tObj.CD_CODE = '';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.LOADING_PORT = tRet;

            let sqlStr = `
                select
                    *
                from
                    kcd_code
                where
                    cd_group = 'PI_REMARK'
                    and cd_code in ('41', '42', '43', '44', '50')
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tObj = {};
            tObj.CD_CODE = ' ';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.TOLENCE = tRet;

            let tArray = ['', 'Y', 'N'];
            let tArray1 = [' ', 'Y', 'N'];
            let tRet = tArray.map((col, i) => {
                var tObj = {};
                tObj.id = i;
                tObj.CD_CODE = col;
                tObj.CD_NAME = tArray1[i];
                return tObj;
            });
            tWObj.CD = tRet;

            let tArray = ['', 'Y', 'N'];
            let tArray1 = [' ', 'Y', 'N'];
            let tRet = tArray.map((col, i) => {
                var tObj = {};
                tObj.id = i;
                tObj.CD_CODE = col;
                tObj.CD_NAME = tArray1[i];
                return tObj;
            });
            tWObj.PART_SHIP = tRet;

            let tArray = ['', 'Y', 'N'];
            let tArray1 = [' ', 'Y', 'N'];
            let tRet = tArray.map((col, i) => {
                var tObj = {};
                tObj.id = i;
                tObj.CD_CODE = col;
                tObj.CD_NAME = tArray1[i];
                return tObj;
            });
            tWObj.TRANS_SHIP = tRet;

            return tWObj;
        },
    },
};

export default moduleQuery_S0205_1;
