import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0608_1 = {
    Query: {
        mgrQueryS0608_CODE: async (_, args) => {
            var tWObj = {};

            let sqlStr = `
                select
                    *
                from
                    kcd_buyer
                where
                    status_cd = '0'
                order by
                    buyer_cd
                    -- offset 0 rows fetch next 1000 rows only
            `;
            let tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tRet = [];
            tRet0.forEach((col, i) => {
                var tObj = { ...col };
                tObj.BUYER_NAME = `(${col.BUYER_CD})${col.BUYER_NAME}`;
                tRet.push(tObj);
            });
            var tObj = {};
            tObj.BUYER_CD = '';
            tObj.BUYER_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.BUYER_CD = tRet;

            let sqlStr = `
                select
                    BANK_NAME,
                    BANK_CD
                from
                    kcd_bank
                where
                    status_cd = '0'
                    and bank_type in ('1')
                    and (
                        bank_cd like '%${args.data.BANK_CD}%'
                        or bank_name like '%${args.data.BANK_CD}%'
                    )
                order by
                    bank_name
            `;
            let tRet = [];
            if (args.data.BANK_CD !== '') {
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr));
                tRet0.forEach((col, i) => {
                    var tObj = { ...col };
                    tObj.BANK_NAME = `(${col.BANK_CD})${col.BANK_NAME}`;
                    tRet.push(tObj);
                });
            }
            var tObj = {};
            tObj.BANK_CD = '';
            tObj.BANK_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.BANK_CD = tRet;

            let sqlStr = `
                select
                    *
                from
                    kcd_code
                where
                    cd_group = 'BILL_TYPE'
                    and cd_code in ('1', '2')
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_CODE = '';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.BILL_TYPE = tRet;

            return tWObj;
        },
    },
};

export default moduleQuery_S0608_1;
