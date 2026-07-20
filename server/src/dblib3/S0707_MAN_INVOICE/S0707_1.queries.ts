import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0707_1 = {
    Query: {
        mgrQueryS0707_CODE: async (_, args) => {
            var tWObj = {};

            let sqlStr = `
                select
                    *
                from
                    kcd_code
                where
                    cd_group = 'CURR_CD'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_CODE = '';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.CURR_CD = tRet;

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

            if (args.data.BUYER_CD === '') {
                tWObj.INVOICE_CD = [];
            } else {
                var sqlStr = `
                    SELECT
                        invoice_no,
                        cast(tot_amt as varchar)
                    FROM
                        ksv_invoice_mst
                    WHERE
                        buyer_cd = '${args.data.BUYER_CD}'
                        and invoice_type = '1'
                        and tot_amt > 0
                        and reg_datetime > '20210608000000'
                    ORDER BY
                        1
                `;
                let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
                var tObj = {};
                tObj.INVOICE_NO = '';
                tObj.DUE_DATE = ' ';
                tRet.unshift(tObj);
                tWObj.INVOICE_CD = tRet;
            }

            let tRet = [];
            /*
       if (args.data.BUYER_CD !== '') {
         let sqlStr  = `
             select
                 a.BANK_NAME,
                 a.BANK_CD
             from
                 kcd_bank a,
                 kcd_buyer b
             where
                 a.bank_cd = b.bank_cd
                 and b.buyer_cd = '${args.data.BUYER_CD}'
         `;
         tRet  =  await prisma.$queryRaw(Prisma.raw(sqlStr));
       }
       */
            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_BANK
                WHERE
                    ACCOUNT_NAME like '%SHIN TEXTILE%' OR
                    ACCOUNT_NAME like '%신티에스%'
            `;
            tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
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
                    cd_group = 'INVOICE_NEGO_TYPE'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_CODE = '';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.INVOICE_NEGO_TYPE = tRet;

            var tArray1 = ['', '0', '1', '2', '3', '4'];
            var tArray2 = ['All', '0', 'End', 'Check', 'Part', 'EC'];
            let tRet = [];
            tArray1.forEach((col, i) => {
                var tObj = {};
                tObj.CD_CODE = col;
                tObj.CD_NAME = tArray2[i];
                tRet.push(tObj);
            });
            tWObj.END_TYPE = tRet;

            var tArray1 = ['', '0', '1', '2', '3'];
            var tArray2 = ['All', '0', '선수금', '가입금', '상계용'];
            let tRet = [];
            tArray1.forEach((col, i) => {
                var tObj = {};
                tObj.CD_CODE = col;
                tObj.CD_NAME = tArray2[i];
                tRet.push(tObj);
            });
            tWObj.PRE_TYPE = tRet;

            return tWObj;
        },
    },
};

export default moduleQuery_S0707_1;
