import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0523_1 = {
    Query: {
        mgrQueryS0523_1_CODE: async (_, args) => {
            var tWObj = {};

            let sqlStr = `
                select
                    *
                from
                    kcd_factory
                where
                    status_cd = '0'
                    and factory_cd in ('FC010', 'FC034', 'FC044')
            `;
            let tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tRet = [];
            tRet0.forEach((col, i) => {
                var tObj = { ...col };
                tObj.FACTORY_NAME = col.FACTORY_NAME2;
                tRet.push(tObj);
            });
            let tObj = {};
            tObj.FACTORY_CD = '';
            tObj.FACTORY_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.FACTORY_CD = tRet;

            let sqlStr = `
                select
                    *
                from
                    kcd_buyer
                where
                    status_cd = '0'
                order by
                    REG_DATETIME desc
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
                    cd_group = 'STOCK_CODE2'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tObj = {};
            tObj.CD_CODE = '';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.STOCK_CODE = tRet;

            let tRet = [];
            let tObj = {};
            tObj.CD_CODE = '';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.PO_CD = tRet;

            let tRet = [];
            let sqlStr = `
                select
                    *
                from
                    kcd_vendor
                where
                    status_cd = '0'
                order by
                    REG_DATETIME desc
            `;
            tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tObj = {};
            tObj.VENDOR_CD = '';
            tObj.VENDOR_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.VENDOR_CD = tRet;

            /*
       let sqlStr = `
           select
               *
           from
               kcd_code
           where
               cd_group = 'BVT_KIND'
       `;
       let  tRet  =  await prisma.$queryRaw(Prisma.raw(sqlStr));
       let tObj = {};
       tObj.CD_CODE = '';
       tObj.CD_NAME = ' ';
       tRet.unshift(tObj);
       tWObj.KIND2 = tRet;
*/
            let sqlStr = `
                select
                    seq as CD_CODE,
                    matl_type2 as CD_NAME
                from
                    kcd_matl_type2
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tObj = {};
            tObj.CD_CODE = '';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.KIND2 = tRet;

            let sqlStr = `
                select
                    *
                from
                    kcd_code
                where
                    cd_group = 'STOCK_OWNER_SHIP'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tObj = {};
            tObj.CD_CODE = '';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.OWNER_SHIP = tRet;

            const reasonMakePreset = [
                { CD_CODE: '', CD_NAME: ' ' },
                { CD_CODE: '00', CD_NAME: 'MD MRP CHECKING' },
                { CD_CODE: '01', CD_NAME: 'Buyer change/will request to buyer' },
                { CD_CODE: '02', CD_NAME: 'Buyer change/already done' },
                { CD_CODE: '03', CD_NAME: 'MOQ' },
                { CD_CODE: '04', CD_NAME: 'Mistake' },
                { CD_CODE: '05', CD_NAME: 'cons revise/include in FOB' },
                { CD_CODE: '06', CD_NAME: 'Replacement by FOC' },
                { CD_CODE: '07', CD_NAME: 'Etc' },
                { CD_CODE: '08', CD_NAME: '업체로 데빗발행' },
                { CD_CODE: '09', CD_NAME: 'Buyer provided materials' },
                { CD_CODE: '10', CD_NAME: 'RETURN_MATL' },
            ];
            tWObj.REASON_MAKE = reasonMakePreset;

            let sqlStr = `
                select
                    *
                from
                    kcd_code
                where
                    cd_group = 'STOCK_AUTHORITY'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tObj = {};
            tObj.CD_CODE = '';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.AUTHORITY = tRet;

            let sqlStr = `
                select
                    *
                from
                    kcd_code
                where
                    cd_group = 'STOCK_CONDITION'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            const conditionStatusPreset = [
                {
                    CD_CODE: '',
                    CD_NAME: 'ALL',
                },
                {
                    CD_CODE: '35MYFRPCGUIHANWJKQVTO',
                    CD_NAME: '35MYFRPCGUIHANWJKQVTO',
                },
                {
                    CD_CODE: '3FPGUIHAJKQV',
                    CD_NAME: '3FPGUIHAJKQV',
                },
                {
                    CD_CODE: 'GUIHA',
                    CD_NAME: 'GUIHA',
                },
                {
                    CD_CODE: '35MNYWRPC',
                    CD_NAME: '35MNYWRPC',
                },
                {
                    CD_CODE: '35MRY',
                    CD_NAME: '35MRY',
                },
                {
                    CD_CODE: '35MRYC',
                    CD_NAME: '35MRYC',
                },
                {
                    CD_CODE: '35MRYWN',
                    CD_NAME: '35MRYWN',
                },
                {
                    CD_CODE: 'MR',
                    CD_NAME: 'MR',
                },
                {
                    CD_CODE: 'JKQV',
                    CD_NAME: 'JKQV',
                },
            ];
            let stockStatusSql = `
                select
                    *
                from
                    kcd_code
                where
                    CD_GROUP = 'STOCK_STATUS_S'
            `;
            let stockStatusRet = await prisma.$queryRaw(Prisma.raw(stockStatusSql));
            var tStatusArray = [];
            stockStatusRet.forEach((col, i) => {
                var tObj = {};
                tObj.CD_CODE = col.CD_CODE;
                tObj.CD_NAME = `[${col.CD_CODE}]${col.CD_NAME}`;
                tStatusArray.push(tObj);
            });
            // tWObj.CONDITION = [...conditionStatusPreset, ...tRet, ...stockStatusRet, ];
            tWObj.CONDITION = [...conditionStatusPreset, ...tStatusArray, ];

            let sqlStr = `
                select
                    *
                from
                    kcd_code
                where
                    cd_group = 'STOCK_MANAGER'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tObj = {};
            tObj.CD_CODE = '';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.MANAGER = tRet;

            let sqlStr = `
                select
                    *
                from
                    kcd_code
                where
                    cd_group = 'STOCK_PURPOSE'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tObj = {};
            tObj.CD_CODE = '';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.PURPOSE = tRet;

            let sqlStr = `
                select
                    *
                from
                    kcd_code
                where
                    cd_group = 'STOCK_REMARK'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tObj = {};
            tObj.CD_CODE = '';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.REMARK = tRet;

            let sqlStr = `
                select
                    *
                from
                    kcd_factory_ware
            `;
            let tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tRet = [];
            tRet0.forEach((col, i) => {
                var tObj = { ...col };
                tObj.WARE_NAME = `(${col.FACTORY_CD})${col.WARE_NAME}`;
                tRet.push(tObj);
            });
            let tObj = {};
            tObj.WARE_CD = '';
            tObj.WARE_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.WARE_CD = tRet;

            // let tRet0 = stockStatusRet;
            let tRet0 = tStatusArray;
            let tObj = {};
            tObj.CD_CODE = '';
            tObj.CD_NAME = ' ';
            tRet0.unshift(tObj);
            tWObj.STOCK_STATUS_S = tRet0;

            const planPreset = [
                { CD_CODE: '', CD_NAME: ' ' },
                { CD_CODE: '1-01.있음', CD_NAME: '1-01.있음' },
                { CD_CODE: '2-01.있음(DESTROY)', CD_NAME: '2-01.있음(DESTROY)' },
                { CD_CODE: '2-02.있음(SHINTS STOCK)', CD_NAME: '2-02.있음(SHINTS STOCK)' },
                { CD_CODE: '2-03.있음(FACTORY STOCK)', CD_NAME: '2-03.있음(FACTORY STOCK)' },
                { CD_CODE: '2-04.있음(BUYER CHARGE)', CD_NAME: '2-04.있음(BUYER CHARGE)' },
                { CD_CODE: '2-05.있음(SHIP BACK/SELL)', CD_NAME: '2-05.있음(SHIP BACK/SELL)' },
                { CD_CODE: '2-06.있음(BAG용)', CD_NAME: '2-06.있음(BAG용)' },
                { CD_CODE: '2-07.있음(MAT/TENT용)', CD_NAME: '2-07.있음(MAT/TENT용)' },
                { CD_CODE: '2-08.있음(NS/WF용)', CD_NAME: '2-08.있음(NS/WF용)' },
            ];
            tWObj.PLAN = planPreset;

            return tWObj;
        },
    },
};

export default moduleQuery_S0523_1;
