import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0608_LIST_1 = {
    Query: {
        mgrQueryS0608_LIST_1: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var sDate = args.data.S_BILL_DATE;
            var eDate = args.data.E_BILL_DATE;
            if (sDate === '') {
                sDate = `${tRetDate.substring(0, 4)}0101`;
            }
            if (eDate === '') {
                eDate = tRetDate1;
            }

            var tBankCd = args.data.BANK_CD.trim();

            let sqlStr1_0 = `
                select
                    f.cd_name as BILL_TYPE,
                    a.REF_NO,
                    g.BUYER_NAME,
                    -- (a.TOT_AMT + a.CHARGE + a.CREDIT_AMT) as TOT_AMT,
                    (a.TOT_AMT) as TOT_AMT,
                    a.CHARGE,
                    a.CURR_CD,
                    a.bill_date as START_DATE,
                    '' as END_DATE,
                    '' as BILL_DATE,
                    0 as DELAY_DAYS,
                    0 as DELAY_INTEREST,
                    0 as LESS_CHARGE,
                    b.BANK_NAME,
                    a.BANK_CD,
                    a.BUYER_CD,
                    '1' as BILL_TYPE_CD
                from
                    ksv_invoice_prebill a,
                    kcd_bank b,
                    kcd_code f,
                    kvw_buyer g
                where
                    a.bill_date between '${sDate}' and '${eDate}'
                    and a.bank_cd like '%${tBankCd}%'
                    and a.buyer_cd like '%${args.data.BUYER_CD}%'
                    and a.buyer_cd = g.buyer_cd
                    and b.bank_cd = a.bank_cd
                    and f.cd_group = 'BILL_TYPE'
                    and f.cd_code = '1'
            `;

            let sqlStr2_0 = `
                select
                    f.cd_name as BILL_TYPE,
                    a.REF_NO,
                    g.BUYER_NAME,
                    a.TOT_AMT,
                    0 as CHARGE,
                    a.CURR_CD,
                    a.start_date as START_DATE,
                    a.end_date as END_DATE,
                    a.bill_date as BILL_DATE,
                    a.delay_days as DELAY_DAYS,
                    a.delay_interest as DELAY_INTEREST,
                    a.less_charge as LESS_CHARGE,
                    b.BANK_NAME,
                    a.BANK_CD,
                    a.BUYER_CD,
                    '2' as BILL_TYPE_CD
                from
                    ksv_invoice_nego a,
                    kcd_bank b,
                    kcd_code f,
                    kvw_buyer g
                where
                    a.start_date between '${sDate}' and '${eDate}'
                    and a.bank_cd like '%${tBankCd}%'
                    and a.buyer_cd like '%${args.data.BUYER_CD}%'
                    and a.buyer_cd = g.buyer_cd
                    and b.bank_cd = a.bank_cd
                    and f.cd_group = 'BILL_TYPE'
                    and f.cd_code = '2'
            `;

            let sqlStr4_0 = `
                select
                    kk.*
                from
                    (
                        select
                            f.cd_name as BILL_TYPE,
                            a.REF_NO,
                            g.BUYER_NAME,
                            (a.TOT_AMT + a.CHARGE + a.CREDIT_AMT) as TOT_AMT,
                            a.CHARGE,
                            a.CURR_CD,
                            a.bill_date as START_DATE,
                            '' as END_DATE,
                            '' as BILL_DATE,
                            0 as DELAY_DAYS,
                            0 as DELAY_INTEREST,
                            0 as LESS_CHARGE,
                            b.BANK_NAME,
                            a.BANK_CD,
                            a.BUYER_CD,
                            '1' as BILL_TYPE_CD
                        from
                            ksv_invoice_prebill a,
                            kcd_bank b,
                            kcd_code f,
                            kvw_buyer g
                        where
                            a.bill_date between '${sDate}' and '${eDate}'
                            and a.ref_no in (
                                select
                                    ref_no
                                from
                                    ksv_invoice_bill
                                where
                                    invoice_no like '%${args.data.INVOICE_NO}%'
                            )
                            and a.bank_cd like '%${tBankCd}%'
                            and a.buyer_cd like '%${args.data.BUYER_CD}%'
                            and a.buyer_cd = g.buyer_cd
                            and b.bank_cd = a.bank_cd
                            and f.cd_group = 'BILL_TYPE'
                            and f.cd_code = '1'
                        union
                        select
                            f.cd_name as BILL_TYPE,
                            a.REF_NO,
                            g.BUYER_NAME,
                            a.TOT_AMT,
                            0 as CHARGE,
                            a.CURR_CD,
                            a.start_date as START_DATE,
                            a.end_date as END_DATE,
                            a.bill_date as BILL_DATE,
                            a.delay_days as DELAY_DAYS,
                            a.delay_interest as DELAY_INTEREST,
                            a.less_charge as LESS_CHARGE,
                            b.BANK_NAME,
                            a.BANK_CD,
                            a.BUYER_CD,
                            '2' as BILL_TYPE_CD
                        from
                            ksv_invoice_nego a
                            left join ksv_invoice_bill a1 on a1.ref_no = a.ref_no,
                            kcd_bank b,
                            kcd_code f,
                            kvw_buyer g
                        where
                            a.start_date between '${sDate}' and '${eDate}'
                            and a.ref_no in (
                                select
                                    ref_no
                                from
                                    ksv_invoice_bill
                                where
                                    invoice_no like '%${args.data.INVOICE_NO}%'
                            )
                            and a.bank_cd like '%${tBankCd}%'
                            and a.buyer_cd like '%${args.data.BUYER_CD}%'
                            and a.buyer_cd = g.buyer_cd
                            and b.bank_cd = a.bank_cd
                            and f.cd_group = 'BILL_TYPE'
                            and f.cd_code = '2'
                    ) kk
                order by
                    kk.REF_NO
            `;

            let sqlStr5_0 = `
                select
                    kk.*
                from
                    (
                        select
                            f.cd_name as BILL_TYPE,
                            a.REF_NO,
                            g.BUYER_NAME,
                            (a.TOT_AMT + a.CHARGE + a.CREDIT_AMT) as TOT_AMT,
                            a.CHARGE,
                            a.CURR_CD,
                            a.bill_date as START_DATE,
                            '' as END_DATE,
                            '' as BILL_DATE,
                            0 as DELAY_DAYS,
                            0 as DELAY_INTEREST,
                            0 as LESS_CHARGE,
                            b.BANK_NAME,
                            a.BANK_CD,
                            a.BUYER_CD,
                            '1' as BILL_TYPE_CD
                        from
                            ksv_invoice_prebill a,
                            kcd_bank b,
                            kcd_code f,
                            kvw_buyer g,
                            ksv_invoice_bill h
                        where
                            a.bill_date between '${sDate}' and '${eDate}'
                            and h.debit_cd like '%${args.data.DEBIT_CD}%'
                            and h.ref_no = a.ref_no
                            and a.buyer_cd = g.buyer_cd
                            and b.bank_cd = a.bank_cd
                            and f.cd_group = 'BILL_TYPE'
                            and f.cd_code = '1'
                        union
                        select
                            f.cd_name as BILL_TYPE,
                            a.REF_NO,
                            g.BUYER_NAME,
                            a.TOT_AMT,
                            0 as CHARGE,
                            a.CURR_CD,
                            a.bill_date as START_DATE,
                            a.end_date as END_DATE,
                            a.bill_date as BILL_DATE,
                            a.delay_days as DELAY_DAYS,
                            a.delay_interest as DELAY_INTEREST,
                            a.less_charge as LESS_CHARGE,
                            b.BANK_NAME,
                            a.BANK_CD,
                            a.BUYER_CD,
                            '2' as BILL_TYPE_CD
                        from
                            ksv_invoice_nego a,
                            kcd_bank b,
                            kcd_code f,
                            kvw_buyer g,
                            ksv_invoice_bill h
                        where
                            a.start_date between '${sDate}' and '${eDate}'
                            and h.debit_cd like '%${args.data.DEBIT_CD}%'
                            and a.buyer_cd = g.buyer_cd
                            and b.bank_cd = a.bank_cd
                            and h.ref_no = a.ref_no
                            and f.cd_group = 'BILL_TYPE'
                            and f.cd_code = '2'
                    ) kk
                order by
                    kk.REF_NO
            `;

            let sqlStr1 = `
          ${sqlStr1_0}
          order by a.REF_NO
      `;

            let sqlStr2 = `
          ${sqlStr2_0}
          order by a.REF_NO
      `;

            let sqlStr3 = `
                select
                    kk.*
                from
                    (
                        ${sqlStr1_0}
                        union
                        ${sqlStr2_0}
                    ) kk
                order by
                    kk.REF_NO
            `;

            var tRet = [];

            if (args.data.BILL_TYPE === '')
                tRet = await prisma.$queryRaw(Prisma.raw(sqlStr3));
            else if (args.data.BILL_TYPE === '1')
                tRet = await prisma.$queryRaw(Prisma.raw(sqlStr1));
            else if (args.data.BILL_TYPE === '2')
                tRet = await prisma.$queryRaw(Prisma.raw(sqlStr2));

            if (args.data.INVOICE_NO !== '')
                tRet = await prisma.$queryRaw(Prisma.raw(sqlStr4_0));
            if (args.data.DEBIT_CD !== '')
                tRet = await prisma.$queryRaw(Prisma.raw(sqlStr5_0));

            var tRetData = {};
            var tRetArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tObj = { ...tRet[tIdx] };
                let sqlStr10 = `
                    select
                        a.invoice_no,
                        b.ship_date,
                        a.debit_cd,
                        isnull(sum(a.bill_amt), 0) as billed_amt
                    from
                        ksv_invoice_bill a,
                        ksv_invoice_mst b
                    where
                        a.ref_no = '${tObj.REF_NO}'
                        and a.invoice_no = b.invoice_no
                        and a.invoice_no <> '미정'
                    group by
                        a.invoice_no,
                        b.ship_date,
                        a.debit_cd
                `;
                var tRet10 = await prisma.$queryRaw(Prisma.raw(sqlStr10));
                var tBilledAmt = 0;
                var tInvoiceNo = '';
                if (tRet10.length > 0) {
                    tRet10.forEach((col, i) => {
                        tBilledAmt += parseFloat(col.billed_amt);
                        if (i === 0) {
                            if (col.invoice_no === 'DEBIT')
                                tInvoiceNo = `${col.invoice_no}(${col.debit_cd}):${col.ship_date}:${col.billed_amt}`;
                            else
                                tInvoiceNo = `${col.invoice_no}:${col.ship_date}:${col.billed_amt}`;
                        } else {
                            if (col.invoice_no === 'DEBIT')
                                tInvoiceNo += `/${col.invoice_no}(${col.debit_cd}):${col.ship_date}:${col.billed_amt}`;
                            else
                                tInvoiceNo += `/${col.invoice_no}:${col.ship_date}:${col.billed_amt}`;
                        }
                    });
                }

                var tBalAmt = parseFloat(tObj.TOT_AMT) - tBilledAmt;
                if (tBalAmt <= 0) tBalAmt = 0;

                tObj.BAL_AMT = tBalAmt;
                tObj.INVOICE_NO = tInvoiceNo;

                tRetArray.push(tObj);
            }
            return tRetArray;
        },
    },
};

export default moduleQuery_S0608_LIST_1;
