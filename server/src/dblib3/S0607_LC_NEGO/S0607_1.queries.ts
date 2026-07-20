import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기

// export default로 Query 내용 내보내기 ---- won
const moduleQuery_S0607_1 = {
    Query: {
        mgrQueryS0607_CODE: async (_, args) => {
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
                tWObj.INVOICE_NO = [];
                var tObj = {};
                tObj.INVOICE_NO = '';
                tObj.INVOICE_NAME = ' ';
                tObj.INVOICE_AMT = '0';
                tWObj.INVOICE_NO.unshift(tObj);
            } else {
                /*
         let sqlStr  = `
             select
                 a.INVOICE_NO,
                 a.tot_amt,
                 sum(isnull(b.bill_amt, 0)) as bill_amt
             from
                 ksv_invoice_mst a
                 left join ksv_invoice_bill b on b.invoice_no = a.invoice_no
             WHERE
                 a.buyer_cd in (
                     select distinct
                         buyer_cd
                     from
                         kcd_buyer
                     where
                         buyer_cd = '${args.data.BUYER_CD}'
                         or mom_cd = '${args.data.BUYER_CD}'
                 )
                 and a.invoice_type = '1'
             group by
                 a.invoice_no,
                 a.tot_amt
         `;
         */
                /*
         let sqlStr  = `
             select
                 a.INVOICE_NO,
                 a.tot_amt,
                 sum(isnull(b.bill_amt, 0)) as bill_amt
             from
                 ksv_invoice_mst a
                 left join ksv_invoice_bill b on b.invoice_no = a.invoice_no
             WHERE
                 a.buyer_cd in (
                     select distinct
                         buyer_cd
                     from
                         kcd_buyer
                     where
                         buyer_cd = '${args.data.BUYER_CD}'
                         or mom_cd = (
                             select distinct
                                 mom_cd
                             from
                                 kcd_buyer
                             where
                                 buyer_cd = '${args.data.BUYER_CD}'
                         )
                 )
                 and a.invoice_type = '1'
             group by
                 a.invoice_no,
                 a.tot_amt
         `;
         */
                /*
         let sqlStr  = `
             select
                 a.INVOICE_NO,
                 a.tot_amt,
                 sum(isnull(b.bill_amt, 0)) as bill_amt
             from
                 ksv_invoice_mst a
                 left join ksv_invoice_bill b on b.invoice_no = a.invoice_no
             WHERE
                 a.buyer_cd in (
                     select distinct
                         buyer_cd
                     from
                         kcd_buyer
                     where
                         buyer_cd = '${args.data.BUYER_CD}'
                         or buyer_cd in (
                             select distinct
                                 buyer_cd
                             from
                                 kcd_buyer
                             where
                                 mom_cd = '${args.data.BUYER_CD}'
                         )
                         or mom_cd = (
                             select distinct
                                 mom_cd
                             from
                                 kcd_buyer
                             where
                                 buyer_cd = '${args.data.BUYER_CD}'
                         )
                 )
                 and a.invoice_type = '1'
                 and (
                     a.docu_no is not null
                     and a.docu_no <> ''
                 )
             group by
                 a.invoice_no,
                 a.tot_amt
         `;
         */
                let sqlStr = `
                    select
                        a.INVOICE_NO,
                        a.tot_amt,
                        sum(isnull(b.bill_amt, 0)) as bill_amt
                    from
                        ksv_invoice_mst a
                        left join ksv_invoice_bill b on b.invoice_no = a.invoice_no
                    where
                        (
                            (a.buyer_cd = '${args.data.BUYER_CD}')
                            or (
                                a.buyer_cd in (
                                    select distinct
                                        buyer_cd
                                    from
                                        kcd_buyer
                                    where
                                        mom_cd = (
                                            select
                                                mom_cd
                                            from
                                                kcd_buyer
                                            where
                                                buyer_cd = '${args.data.BUYER_CD}'
                                        )
                                )
                            )
                        )
                        and a.invoice_type = '1'
                        and (
                            a.docu_no is not null
                            and a.docu_no <> ''
                        )
                    group by
                        a.invoice_no,
                        a.tot_amt
                `;
                let tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr));
                let tRet = [];
                tRet0.forEach((col, i) => {
                    var tObj = { ...col };
                    var tTotAmt = parseFloat(tObj.tot_amt);
                    var tBillAmt = parseFloat(tObj.bill_amt);
                    var tBal = tTotAmt - tBillAmt;
                    if (tBal > 10) {
                        tBal = AFLib.numToFixed(tBal, 2);
                        tObj.INVOICE_NAME = `${tObj.INVOICE_NO}/${tBal}`;
                        tObj.INVOICE_AMT = `${tBal}`;
                        tRet.push(tObj);
                    }
                });
                var tObj = {};
                tObj.INVOICE_NO = '';
                tObj.INVOICE_NAME = ' ';
                tObj.INVOICE_AMT = '0';
                tRet.unshift(tObj);
                tWObj.INVOICE_NO = tRet;
            }

            if (args.data.BUYER_CD === '') {
                tWObj.BANK_CD = [];
                var tObj = {};
                tObj.BANK_CD = '';
                tObj.BANK_NAME = ' ';
                tWObj.BANK_CD.unshift(tObj);
            } else {
                let sqlStr_bak = `
                    select
                        a.BANK_NAME,
                        a.BANK_CD,
                        a.ACCOUNT_NO
                    from
                        kcd_bank a,
                        kcd_buyer b
                    where
                        a.status_cd = '0'
                        and a.bank_type in ('1', '2')
                        and a.bank_cd = b.bank_cd
                    order by
                        a.bank_name
                `;
                let sqlStr = `
                    select
                        BANK_NAME,
                        BANK_CD,
                        ACCOUNT_NO
                    from
                        kcd_bank
                    where
                        status_cd = '0'
                        and bank_type in ('1', '2')
                    order by
                        bank_name
                `;
                let tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr));
                let tRet = [];
                tRet0.forEach((col, i) => {
                    var tObj = { ...col };
                    tObj.BANK_NAME = `${col.BANK_NAME}/${col.ACCOUNT_NO}`;
                    tRet.push(tObj);
                });
                var tObj = {};
                tObj.BANK_CD = '';
                tObj.BANK_NAME = ' ';
                tRet.unshift(tObj);
                tWObj.BANK_CD = tRet;
            }

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

            return tWObj;
        },
    },
};

export default moduleQuery_S0607_1;
