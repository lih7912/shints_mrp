import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0000 = {
    Query: {
        mgrQueryS0000_BUYER: async (_, args) => {
            if (args.data.SRCH_DATA === '') return [];

            let sqlStr = `
                select
                    *
                from
                    kcd_buyer
                where
                    (
                        buyer_cd like '%${args.data.SRCH_DATA}%'
                        or buyer_name like '%${args.data.SRCH_DATA}%'
                    )
                order by
                    buyer_name
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

            return tRet;
        },

        mgrQueryS0000_VENDOR: async (_, args) => {
            if (args.data.SRCH_DATA === '') return [];

            let sqlStr = `
                select
                    *
                from
                    kcd_vendor
                where
                    (
                        vendor_cd like '%${args.data.SRCH_DATA}%'
                        or vendor_name like '%${args.data.SRCH_DATA}%'
                    )
                order by
                    vendor_name
            `;
            let tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tRet = [];
            tRet0.forEach((col, i) => {
                var tObj = { ...col };
                tObj.VENDOR_NAME = `(${col.VENDOR_CD})${col.VENDOR_NAME}`;
                tRet.push(tObj);
            });

            let tObj = {};
            tObj.VENDOR_CD = '';
            tObj.VENDOR_NAME = ' ';
            tRet.unshift(tObj);

            return tRet;
        },

        mgrQueryS0000_STYLE: async (_, args) => {
            if (args.data.SRCH_DATA === '') return [];

            let sqlStr = `
                select
                    *
                from
                    kcd_style
                where
                    (
                        style_cd like '%${args.data.SRCH_DATA}%'
                        or style_name like '%${args.data.SRCH_DATA}%'
                    )
                order by
                    style_name
            `;
            let tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tRet = [];
            tRet0.forEach((col, i) => {
                var tObj = { ...col };
                tObj.STYLE_NAME = `(${col.STYLE_CD})${col.STYLE_NAME}`;
                tRet.push(tObj);
            });

            let tObj = {};
            tObj.STYLE_CD = '';
            tObj.STYLE_NAME = ' ';
            tRet.unshift(tObj);

            return tRet;
        },
    },
};
export default moduleQuery_S0000;
