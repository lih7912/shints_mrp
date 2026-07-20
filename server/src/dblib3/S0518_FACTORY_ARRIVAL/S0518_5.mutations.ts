// MGR_@@TNAME@@.mutations.js

import * as fs from 'fs';
import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
const request_sync = require('sync-request');

/*
                STD_FLAG: String 
                NET: String 
                LOSS: String 
                USE_SIZE: String 
                REMARK: String 

*/

// export default로 Mutation 내용 내보내기
// new S0518_COMM();
class S0518_COMM {
    async make_taxbill_data(argData, contextValue) {
        var tRetDate = AFLib.getCurrTime();
        var tRetDate1 = tRetDate.substring(0, 8);
        var tUserInfo = AFLib.getUserInfo(contextValue);

        var payDateSql1 = `and a.pay_date between '20250501' and '20260631' `;
        var endDateSql1 = ``;

        let sqlStr0 = `
            select
                *
            from
                ksv_shipment_mst
            where
                shipment_cd = '${argData.SHIPMENT_CD}'
        `;
        var tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr0));
        var shipmentObj = {};
        if (tRet0.length > 0) shipmentObj = { ...tRet0[0] };

        let sqlStr = `
            select
                a.END_DATE as INVOICE_DATE,
                a.PAY_DATE,
                a.PAY_CURR_CD as CURR_CD,
                b.VENDOR_CD,
                a.PUR_FACTORY,
                a.PAY_REPORT,
                a.PUR_APP,
                isnull(a.TT_FLAG, '') as TT_FLAG,
                a.TAX as VAT_AMT,
                e.COMPANY_CODE,
                sum(a.in_qty) as IN_QTY,
                sum(a.in_qty * a.pay_price) as IN_AMT,
                isnull(max(a.lc_bill_no), '') as LC_BILL_NO,
                isnull(max(a.reg_user), '') as REG_USER,
                sum(isnull(a.LC_QTY, 0)) as LC_QTY,
                sum(isnull(a.LC_QTY, 0) * a.PAY_PRICE) as LC_AMT
            from
                ksv_stock_out a0,
                ksv_stock_in a,
                kcd_matl_mst b,
                kcd_vendor c,
                kcd_buyer d,
                kcd_user e
            where
                1 = 1
                and a.matl_cd = b.matl_cd
                and b.vendor_cd = c.vendor_cd
                and a.in_qty > 0
                and a.lc_qty <= 0
                and left(a.order_cd, 2) = d.buyer_cd
                and d.reg_user = e.user_id
                -- and   a.end_flag = '1'
                and (
                    a.taxbill_cd_import is null
                    or a.taxbill_cd_import = ''
                )
                and a.in_qty > 0
                and a.lc_qty <= 0
                and a0.po_cd = a.po_cd
                and a0.po_seq = a.po_seq
                and a0.order_cd = a.order_cd
                and a0.matl_cd = a.matl_cd
                and a0.mrp_seq = a.mrp_seq
                and a0.in_datetime = a.in_datetime
                and a0.stsout_cd in (
                    select distinct
                        stsout_cd
                    from
                        ksv_shipment_mem
                    where
                        shipment_cd = '${argData.SHIPMENT_CD}'
                )
                and c.vendor_type = '3'
                and e.company_code = 'shints'
            group by
                a.end_date,
                a.pay_date,
                a.pay_curr_cd,
                b.vendor_cd,
                a.pur_factory,
                a.pay_report,
                a.pur_app,
                a.tt_flag,
                a.tax,
                e.company_code
        `;
        var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

        console.log(`Total: ${tRet.length}`);

        var tRetArray = [];
        var tIdx = 0;
        var tCount = 0;
        var tSQLArray = [];
        for (tIdx = 0; tIdx < tRet.length; tIdx++) {
            var tObj = { ...tRet[tIdx] };

            if (
                tObj.PAY_REPORT.substring(0, 2) == 'LC' ||
                tObj.PAY_REPORT.substring(0, 7) == 'Deposit'
            ) {
                continue;
            }

            var sqlStsIn = `
                select
                    a.po_cd,
                    a.po_seq,
                    a.order_cd,
                    a.matl_cd,
                    a.mrp_seq,
                    a.matl_seq,
                    a.in_datetime,
                    a.in_qty,
                    a.end_date,
                    a.pay_date,
                    a.pay_curr_cd,
                    a.pay_price,
                    a.pur_factory,
                    a.pay_report,
                    c.vendor_cd,
                    c.vendor_name,
                    c.vendor_type,
                    c1.cd_name as vendor_type_n,
                    isnull(a.bill_no, '') as bill_cd,
                    c.pay_type,
                    c2.cd_name as pay_type_n,
                    c.pay_term,
                    a.calc_flag,
                    a.lc_bill_no,
                    a.reg_user,
                    a.pu_cd
                from
                    ksv_stock_in a,
                    kcd_matl_mst b,
                    kcd_buyer e,
                    kcd_user e1,
                    kcd_vendor c
                    left join kcd_code c1 on c1.cd_group = 'vendor_type'
                    and c1.cd_code = c.vendor_type
                    left join kcd_code c2 on c2.cd_group = 'pay_type'
                    and c2.cd_code = c.pay_type
                where
                    a.end_date = '${tObj.INVOICE_DATE}'
                    and a.pay_date = '${tObj.PAY_DATE}'
                    and a.pay_curr_cd = '${tObj.CURR_CD}'
                    and b.vendor_cd = '${tObj.VENDOR_CD}'
                    and a.pur_factory = '${tObj.PUR_FACTORY}'
                    and a.pay_report = '${tObj.PAY_REPORT}'
                    and a.pur_app = '${tObj.PUR_APP}'
                    and a.tt_flag = '${tObj.TT_FLAG}'
                    and a.tax = '${tObj.VAT_AMT}'
                    and a.matl_cd = b.matl_cd
                    and b.vendor_cd = c.vendor_cd
                    and a.in_qty > 0
                    and a.lc_qty <= 0
                    and (
                        a.taxbill_cd_import is null
                        or a.taxbill_cd_import = ''
                    )
                    -- and   a.end_flag = '1'
                    and c.vendor_type = '3'
                    and left(a.order_cd, 2) = e.buyer_cd
                    and e.reg_user = e1.user_id
                    and e1.company_code = 'shints'
            `;
            var retStsIn = await prisma.$queryRaw(Prisma.raw(sqlStsIn));
            var chk_bill_no = 0;

            if (retStsIn.length <= 0) {
                console.log(
                    `Not Found Stsin : ${tObj.INVOICE_DATE}/${tObj.PAY_DATE}/${tObj.CURR_CD}/${tObj.VENDOR_CD}/${tObj.PUR_FACTORY}/${tObj.PAY_REPORT}/${tObj.PUR_APP}/${tObj.TT_FLAG} `,
                );
                console.log(
                    '------------------------------------------------------',
                );
                continue;
            }

            var tCompPoAmt = 0;
            var tCompInQty = 0;
            retStsIn.forEach((col2, i2) => {
                tCompPoAmt +=
                    parseFloat(col2.in_qty) * parseFloat(col2.pay_price);
                tCompPoAmt = parseFloat(tCompPoAmt.toFixed(2));
                tCompInQty += parseFloat(col2.in_qty);
            });

            var tVal1 = parseFloat(parseFloat(tObj.IN_AMT).toFixed(2));
            console.log(`PoAmt Comp : ${tCompPoAmt} / ${tVal1} `);

            tObj.TAXBILL_CD = '';
            tObj.APPROKEY = '';
            tObj.GW_STATUS = '';
            tObj.GW_STATUS_N = '';
            tObj.PAID_AMT = 0;
            var tCompPaidAmt = 0;

            var tSql10 = `
                select
                    isnull(a.APPROKEY, '') as APPROKEY,
                    isnull(a.TAXBILL_DATE, '') as TAXBILL_DATE,
                    isnull(a.TAXBILL_CD, '') as TAXBILL_CD,
                    isnull(a.STATUS_CD, '') as GW_STATUS,
                    isnull(b.CD_NAME, '') as GW_STATUS_N,
                    isnull(a.TOT_AMOUNT, '0') as TOT_AMOUNT
                from
                    kcd_gw_taxbill_kr2 a
                    left join kcd_code b on b.cd_code = a.STATUS_CD
                    and b.cd_group = 'GW_STATUS'
                where
                    a.vendor_cd = '${tObj.VENDOR_CD}'
                    and a.closing_date = '${tObj.INVOICE_DATE}'
                    and a.doc_no = '${tObj.PAY_REPORT}'
                    and a.pay_date = '${tObj.PAY_DATE}'
                    and a.curr_cd = '${tObj.CURR_CD}'
                    and a.pur_factory = '${tObj.PUR_FACTORY}'
                    and a.pur_app = '${tObj.PUR_APP}'
                    and a.tt_flag = '${tObj.TT_FLAG}'
            `;
            var tRet0_2 = await prisma.$queryRaw(Prisma.raw(tSql10));
            var tRet0_2 = await prisma.$queryRaw(Prisma.raw(tSql10));
            if (tRet0_2.length > 0) {
                console.log(`이미 전표 처리된 내용입니다. `);
                continue;
            } else {
            }

            var tTaxBillAmt =
                parseFloat(tObj.IN_AMT) + parseFloat(tObj.VAT_AMT);
            tTaxBillAmt = parseFloat(tTaxBillAmt.toFixed(2));
            tCompPaidAmt = parseFloat(tCompPaidAmt.toFixed(2));

            console.log(
                `========> [${tIdx + 1}/${tRet.length}] 신규 : ${tObj.INVOICE_DATE}/${tObj.PAY_DATE}/${tObj.CURR_CD}/${tObj.VENDOR_CD}/${tObj.PUR_FACTORY}/${tObj.PAY_REPORT}/${tObj.PUR_APP}/${tObj.TT_FLAG} `,
            );
            console.log(
                '------------------------------------------------------',
            );

            tObj.VENDOR_CD = retStsIn[0].vendor_cd;
            tObj.VENDOR_NAME = retStsIn[0].vendor_name;
            tObj.VENDOR_TYPE = retStsIn[0].vendor_type;
            tObj.VENDOR_TYPE_N = retStsIn[0].vendor_type_n;
            tObj.BILL_CD = retStsIn[0].bill_cd;
            tObj.PAY_TYPE = retStsIn[0].pay_type;
            tObj.CALC_FLAG = retStsIn[0].calc_flag;
            tObj.LC_BILL_NO = retStsIn[0].lc_bill_no;

            var sqlBank = `
                select
                    *
                from
                    kcd_vendor_bank
                where
                    vendor_cd = '${tObj.VENDOR_CD}'
                    --    and gw = '2'
            `;
            var retBank = await prisma.$queryRaw(Prisma.raw(sqlBank));
            tObj.PAY_BANK = '';
            if (retBank.length > 0) tObj.PAY_BANK = retBank[0].BANK_CD;

            if (parseFloat(tObj.TAX_AMT) > 0) {
                tObj.TAX_KIND = '1';
                if (tObj.VENDOR_TYPE === '5') tObj.TAX_KIND = '8';
            } else {
                tObj.TAX_KIND = '3';
                if (tObj.VENDOR_TYPE === '3') tObj.TAX_KIND = '5';
            }

            if (!tObj.REG_USER) tObj.REG_USER = 'window';

            if (tObj.CALC_FLAG === '1') tObj.BILL_FLAG = 'O';
            else tObj.BILL_FLAG = 'X';

            tObj.ACCOUNT_NO = '';
            tObj.ACCOUNT_NAME = '';
            tObj.BANK_NAME = '';
            if (tObj.PAY_BANK) {
                var tSql10 = `
                    select
                        *
                    from
                        kcd_bank
                    where
                        bank_cd = '${tObj.PAY_BANK}'
                `;
                var tRet0_2 = await prisma.$queryRaw(Prisma.raw(tSql10));
                if (tRet0_2.length > 0) {
                    tObj.ACCOUNT_NO = tRet0_2[0].ACCOUNT_NO;
                    tObj.ACCOUNT_NAME = tRet0_2[0].ACCOUNT_NAME;
                    tObj.BANK_NAME = tRet0_2[0].BANK_NAME;
                }
            }

            tObj.LC_QTY = '0';
            tObj.LC_AMT = '0';
            if (tObj.LC_BILL_NO !== '') {
                var tSql10 = `
                    select
                        isnull(sum(lc_qty), 0) as LC_QTY,
                        isnull(sum(lc_qty * pay_price), 0) as LC_AMT
                    from
                        ksv_stock_in a,
                        kcd_matl_mst b
                    where
                        a.in_qty > 0
                        and a.pay_report = '${tObj.LC_BILL_NO}'
                        and a.matl_cd = b.matl_cd
                        and b.vendor_cd = '${tObj.VENDOR_CD}'
                        and a.end_date < '${tObj.INVOICE_DATE}'
                `;
                var tRet10 = await prisma.$queryRaw(Prisma.raw(tSql10));
                if (tRet10.length > 0) {
                    tObj.LC_QTY = tRet10[0].LC_QTY;
                    tObj.LC_AMT = tRet10[0].LC_AMT;
                } else {
                }
            }

            var tPO_AMT = parseFloat(tObj.IN_AMT);
            tObj.PO_AMT = String(tPO_AMT);
            tObj.DEPOSIT_AMT = '0';
            if (parseFloat(tObj.IN_QTY) !== parseFloat(tObj.LC_QTY)) {
                var tDepositAmt = tObj.LC_AMT;
                tObj.DEPOSIT_AMT = String(tDepositAmt);
                tObj.LC_AMT = String(0);
            }

            if (parseFloat(tObj.LC_QTY) > 0) tObj.LC_FLAG = '1';

            var tSql11 = `
                select
                    isnull(sum(dn_amount), 0) as dn_amount,
                    isnull(sum(dc_amount), 0) as dc_amount
                from
                    ksv_dc_amount
                where
                    vendor_cd = '${tObj.VENDOR_CD}'
                    and end_date = '${tObj.INVOICE_DATE}'
                    and curr_cd = '${tObj.CURR_CD}'
                    and pay_date = '${tObj.PAY_DATE}'
            `;
            var tRet0_3 = await prisma.$queryRaw(Prisma.raw(tSql11));
            if (tRet0_3.length > 0) {
                tObj.DEBIT_AMT = tRet0_3[0].dn_amount;
                tObj.DISCOUNT_AMT = tRet0_3[0].dc_amount;
            } else {
                tObj.DEBIT_AMT = '0';
                tObj.DISCOUNT_AMT = '0';
            }

            tObj.BAL_AMT = parseFloat(tObj.PAY_AMT) - parseFloat(tObj.PAID_AMT);
            tObj.BAL_AMT = String(tObj.BAL_AMT);
            tObj.IN_PAY_AMT = tObj.BAL_AMT;

            tObj.TAX_KIND_N = '';
            if (tObj.TAX_KIND === '1') tObj.TAX_KIND_N = '과세';
            if (tObj.TAX_KIND === '2') tObj.TAX_KIND_N = '영세';
            if (tObj.TAX_KIND === '3') tObj.TAX_KIND_N = '면세';
            if (tObj.TAX_KIND === '5') tObj.TAX_KIND_N = 'T/T';
            if (tObj.TAX_KIND === '8') tObj.TAX_KIND_N = '과세(8%)';
            if (tObj.TAX_KIND === '10') tObj.TAX_KIND_N = '과세(10%)';

            tObj.BAL_DEBIT = '0';
            tObj.DOCU_NO = '';
            tObj.BUY_DATE = '';
            tObj.GW_STATUS_CD = '';

            var tPAY_AMT = parseFloat(tObj.PO_AMT);
            tPAY_AMT -= parseFloat(tObj.DEPOSIT_AMT);
            tPAY_AMT -= parseFloat(tObj.LC_AMT);
            tPAY_AMT -= parseFloat(tObj.DEBIT_AMT);
            tPAY_AMT -= parseFloat(tObj.DISCOUNT_AMT);

            tObj.END_AMT = String(tPAY_AMT);
            tPAY_AMT += parseFloat(tObj.VAT_AMT);
            tObj.PAY_AMT = String(tPAY_AMT);
            tObj.PO_AMT = parseFloat(tObj.PO_AMT).toFixed(2);
            tObj.DEPOSIT_AMT = parseFloat(tObj.DEPOSIT_AMT).toFixed(2);
            tObj.PAY_AMT = parseFloat(tObj.PAY_AMT).toFixed(2);

            tObj.BAL_AMT = String(
                parseFloat(tObj.PAY_AMT) - parseFloat(tObj.PAID_AMT),
            );
            tObj.IN_PAY_AMT = tObj.BAL_AMT;

            tObj.END_AMT = parseFloat(tObj.END_AMT).toFixed(2);

            tObj.TAX_KIND_N = '';
            if (tObj.TAX_KIND === '1') tObj.TAX_KIND_N = '과세';
            if (tObj.TAX_KIND === '2') tObj.TAX_KIND_N = '영세';
            if (tObj.TAX_KIND === '3') tObj.TAX_KIND_N = '면세';
            if (tObj.TAX_KIND === '5') tObj.TAX_KIND_N = 'T/T';
            if (tObj.TAX_KIND === '8') tObj.TAX_KIND_N = '과세(8%)';
            if (tObj.TAX_KIND === '10') tObj.TAX_KIND_N = '과세(10%)';

            if (tObj.TAX_KIND_N === '') {
                tObj.TAX_KIND_N = '';
                if (parseFloat(tObj.VAT_AMT) > 0) {
                    tObj.TAX_KIND_N = '과세';
                    tObj.TAX_KIND = '1';
                } else {
                    if (tObj.VENDOR_TYPE === '1') {
                        tObj.TAX_KIND_N = '면세';
                        tObj.TAX_KIND = '3';
                    } else {
                        tObj.TAX_KIND_N = 'T/T';
                        tObj.TAX_KIND = '5';
                    }
                }
            }

            console.log(
                `Comp Amt: PoAmt: ${tObj.PO_AMT} / EndAmt: ${tObj.END_AMT} / VatAmt: ${tObj.VAT_AMT} /  PayAmt:  ${tObj.PAY_AMT}  / Taxbill Amt: ${tCompPaidAmt} / Calc PoAmt: ${tCompPoAmt}`,
            );

            var tStr = `${tIdx}/${tRet.length}====>`;
            Object.keys(tObj).forEach((col1, i1) => {
                var tVal = tObj[`${col1}`];
                tStr += `,${col1}/${tVal}`;
            });
            console.log(tStr);
            // console.log(`==============> Found Bill:${tBillCd}:${tObj.PAY_AMT}`);

            // TAXBILL Date 생성
            let sql0_1 = `
                select
                    isnull(max(taxbill_cd), '') as max_taxbill_cd
                from
                    kcd_gw_taxbill_kr2
                where
                    taxbill_cd like 'TAXIM${tRetDate.substring(2, 4)}-%'
            `;
            var nRet0_1 = await prisma.$queryRaw(Prisma.raw(sql0_1));
            var tMaxSeq = 1;
            if (nRet0_1.length > 0) {
                if (nRet0_1[0].max_taxbill_cd === '') tMaxSeq = 1;
                else
                    tMaxSeq =
                        parseInt(nRet0_1[0].max_taxbill_cd.substring(6, 12)) +
                        1;
            }
            var tMaxSeqStr = AFLib.printF(tMaxSeq, 6);
            var m_TAXBILL_CD = `TAXIM${tRetDate.substring(2, 4)}-${tMaxSeqStr}`;

            let sql0_2 = `
                select
                    *
                from
                    kcd_currency
                where
                    curr_cd = '${tObj.CURR_CD}'
                    and start_date = '${tRetDate1}'
            `;
            var nRet0_2 = await prisma.$queryRaw(Prisma.raw(sql0_2));
            var wWonAmt2 = 0;
            if (nRet0_2.length > 0) wWonAmt2 = parseFloat(nRet0_2[0].WON_AMT2);
            else {
                let sql0_2 = `
                    select
                        *
                    from
                        kcd_currency
                    where
                        curr_cd = '${tObj.CURR_CD}'
                        and start_date = (
                            select
                                max(start_date)
                            from
                                kcd_currency
                            where
                                curr_cd = '${tObj.CURR_CD}'
                        )
                `;
                var nRet0_2 = await prisma.$queryRaw(Prisma.raw(sql0_2));
                if (nRet0_2.length > 0)
                    wWonAmt2 = parseFloat(nRet0_2[0].WON_AMT2);
            }

            var wWonAmt = 0;
            var wWonRate = 0;
            if (tObj.CURR_CD === 'KRW') {
                wWonAmt = tObj.PAY_AMT;
                wWonRate = 1;
            } else {
                wWonAmt = parseFloat(tObj.PAY_AMT) * parseFloat(wWonAmt2);
                wWonAmt = wWonAmt.toFixed(2);
                wWonRate = wWonAmt2.toFixed(2);
            }

            var tTaxKind = '';
            var tTaxRate = '';
            var tTaxAmt = '';
            var tPurApp = '';
            if (tObj.TAX_KIND === '1') {
                // 과세
                tTaxKind = '1';
                tTaxRate = 0.1;
                tTaxAmt = parseFloat(tObj.PAY_AMT) * 10.0;
                tPurApp = 'X';
            } else if (tObj.TAX_KIND === '2') {
                // 영세
                tTaxKind = '2';
                tTaxAmt = 0;
                tPurApp = 'X';
            } else if (tObj.TAX_KIND === '3') {
                // 면세
                tTaxKind = '3';
                tTaxAmt = 0;
                tPurApp = 'O';
            } else if (tObj.TAX_KIND === '4') {
                //  TT
                tTaxKind = '3';
                tLCFlag = '0';
                tTTFlag = '1';
                tTaxAmt = 0;
                tPurApp = 'O';
            }

            if (!shipmentObj.ATA) shipmentObj.ATA = tRetDate1;

            var tTaxbillObj = {};
            tTaxbillObj.DOC_NO = tObj.PAY_REPORT;
            tTaxbillObj.VENDOR_CD = tObj.VENDOR_CD;
            tTaxbillObj.CLOSING_DATE = tObj.INVOICE_DATE;
            tTaxbillObj.PAY_DATE = tObj.PAY_DATE;
            tTaxbillObj.CURR_CD = tObj.CURR_CD;
            tTaxbillObj.PUR_APP = tObj.PUR_APP;
            tTaxbillObj.TT_FLAG = tObj.TT_FLAG;
            tTaxbillObj.STATUS_CD = '';
            tTaxbillObj.PUR_FACTORY = tObj.PUR_FACTORY;
            tTaxbillObj.TAX = tObj.VAT_AMT;
            tTaxbillObj.MINUS_AMOUNT =
                parseFloat(tObj.PAY_AMT) - parseFloat(tObj.VAT_AMT);
            tTaxbillObj.TOT_AMOUNT = tObj.PAY_AMT;
            tTaxbillObj.TAXBILL_DATE = shipmentObj.ATA;
            tTaxbillObj.TAXBILL_CD = m_TAXBILL_CD;
            tTaxbillObj.PAY_BANK = tObj.PAY_BANK;
            tTaxbillObj.BILL_CD = '';
            tTaxbillObj.STSIN_CD = '';
            tTaxbillObj.YEAR = tRetDate.substring(0, 4);
            tTaxbillObj.REG_USER = tObj.REG_USER;
            tTaxbillObj.REG_DATETIME = tRetDate;
            tTaxbillObj.APPROKEY = '';
            tTaxbillObj.KRW_AMOUNT = wWonAmt;
            tTaxbillObj.CURR_RATE = wWonRate;

            let tSQL99 = AFLib.createTableSql(
                'KCD_GW_TAXBILL_KR2',
                tTaxbillObj,
            );
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            var tIdx10 = 0;
            for (tIdx10 = 0; tIdx10 < retStsIn.length; tIdx10++) {
                var col10 = { ...retStsIn[tIdx10] };
                var sqlUp = `
                    update ksv_stock_in
                    set
                        taxbill_cd_import = '${tTaxbillObj.TAXBILL_CD}'
                    where
                        po_cd = '${col10.po_cd}'
                        and po_seq = '${col10.po_seq}'
                        and order_cd = '${col10.order_cd}'
                        and matl_cd = '${col10.matl_cd}'
                        and mrp_seq = '${col10.mrp_seq}'
                        and in_datetime = '${col10.in_datetime}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(sqlUp));
                tSQLArray.push(tSQL99_1);
            }

            console.log(`=================================`);

            tStr = `${tIdx}/${tRet.length} (TaxBill)====>`;
            Object.keys(tTaxbillObj).forEach((col1, i1) => {
                var tVal = tTaxbillObj[`${col1}`];
                tStr += `,${col1}/${tVal}`;
            });
            console.log(tStr);

            tRetArray.push(tTaxbillObj);

            /* 잠시막음  */
            /*
           var tResult = await process1(tObj, tIdx, retStsIn);
           console.log(tResult);
           console.log(`--------------------------------------------------------------`);
           */
            /* */

            // if (tResult.includes('ERROR')) break;
        }

        try {
            await prisma.$transaction(tSQLArray);
        } catch (e) {
            var tMessage = 'ERROR:Insert SHIP Record';
        }

        return tRetArray;
    }

    async make_docu_import(argData, argIdx, tCompanyCode, contextValue) {
        var tDateNew = new Date();
        tDateNew.setMonth(tDateNew.getMonth() + 1);
        var tZeroDate = '00';
        var tDateNew_M =
            tZeroDate.substring(0, 2 - String(tDateNew.getMonth() + 1).length) +
            String(tDateNew.getMonth() + 1);
        var tDateNew_D =
            tZeroDate.substring(0, 2 - String(tDateNew.getDate()).length) +
            String(tDateNew.getMonth());
        var tNewDateStr = tDateNew.getFullYear() + tDateNew_M + tDateNew_D;

        var tDate = new Date();
        var mm = tDate.getMonth() + 1;
        var mm_str = '';
        if (mm > 9) mm_str = mm.toString();
        else mm_str = '0' + mm;

        var dd = tDate.getDate();
        var dd_str = '';
        if (dd > 9) dd_str = dd;
        else dd_str = '0' + dd;

        var hours = tDate.getHours();
        var hours_str = '';
        if (hours > 9) hours_str = hours.toString();
        else hours_str = '0' + hours;

        var minutes = tDate.getMinutes();
        var minutes_str = '';
        if (minutes > 9) minutes_str = minutes.toString();
        else minutes_str = '0' + minutes;

        var seconds = tDate.getSeconds();
        var seconds_str = '';
        if (seconds > 9) seconds_str = seconds.toString();
        else seconds_str = '0' + seconds;

        var yyyy = tDate.getFullYear();

        var tRetDate =
            yyyy.toString() +
            mm_str +
            dd_str +
            hours_str +
            minutes_str +
            seconds_str;
        var tRetDate1 = tRetDate.substring(0, 8);

        var tYY2 = tRetDate.substring(2, 4);
        var tSEQ = tRetDate.substring(4, 14);

        var tInput = {
            ...argData,
        };
        var tSQLArray = [];

        let sql9_1 = `
                  select db_name() as db_name
                  `;
        var tRet9_1 = await prisma.$queryRaw(Prisma.raw(sql9_1));
        var tDbName = '';
        var tOrgDbName = '';
        var strRemark2 = '';
        if (tRet9_1.length > 0) {
            tDbName = tRet9_1[0].db_name;
            tOrgDbName = tRet9_1[0].db_name;
        }
        console.log(`DataBase Name:${tDbName}`);
        if (tDbName === 'shints');
        else strRemark2 = '(Afroba 테스트.삭제요)';

        let sql = `
            select
                *
            from
                kcd_gw_taxbill_kr2
            where
                taxbill_cd = '${tInput.TAXBILL_CD}'
        `;
        var nRet = await prisma.$queryRaw(Prisma.raw(sql));

        var requestArray = [];
        var strDocuNo = '';
        var objTaxBill = {
            ...nRet[0],
        };

        var strOutDate = tRetDate1;

        // 접속아이
        var strMngPart = '8400';
        var strMngId = '';
        var strMngName = '';
        var strMngEmail = '';
        var strMngTel = '';

        let sql5 = `
            select
                cd_code,
                cd_name
            from
                kcd_code
            where
                cd_group = 'DOCU_MNG'
        `;
        var tRet5 = await prisma.$queryRaw(Prisma.raw(sql5));
        tRet5.forEach((col, i) => {
            if (col.cd_code === 'PART') strMngPart = col.cd_name;
            if (col.cd_code === 'ID') strMngId = col.cd_name;
            if (col.cd_code === 'NAME') strMngName = col.cd_name;
            if (col.cd_code === 'EMAIL') strMngEmail = col.cd_name;
            if (col.cd_code === 'TEL') strMngTel = col.cd_name;
        });

        var strDocuDate = tRetDate1;
        // Docu No
        let sql7 = `
            select
                isnull(max(no_docu), '00000') as max_seq
                -- from neoe.neoe.fi_adocu
            from
                neoe_fi_adocu
            where
                no_docu like 'IM${strDocuDate}%'
        `;
        var tRet7 = await prisma.$queryRaw(Prisma.raw(sql7));
        var tMaxDocuNo = 1;
        if (tRet7[0].max_seq === '00000') {
            tMaxDocuNo = parseFloat(tRet7[0].max_seq) + 1;
        } else {
            tMaxDocuNo = parseFloat(tRet7[0].max_seq.substring(10, 15)) + 1;
        }
        var strMaxDocuNo = AFLib.printF(tMaxDocuNo, 5);
        var strDocuNo = `IM${strDocuDate}${strMaxDocuNo}`;
        var strTaxNo = `${strDocuNo}001`;
        var strDocuDate = tRetDate1;

        let sql0_0 = `
            select
                isnull(a.NEOE_NO, '') as NEOE_NO,
                isnull(b.CD_FLAG, '100') as VENDOR_MATL_TYPE,
                isnull(a.NSR_TR_CD, '') as NSR_TR_CD
            from
                kcd_vendor a
                left join kcd_code b on b.cd_group = 'VENDOR_MATL_TYPE'
                and a.vendor_matl_type = b.cd_code
            where
                vendor_cd = '${argData.VENDOR_CD}'
        `;
        var tRet0_0 = await prisma.$queryRaw(Prisma.raw(sql0_0));
        var tVendorObj = {};
        var strNeoeNo = '';
        var strVendorMatlType = '';
        var strNeoeAgentCd = '';
        var nsrTrCd = '';
        if (tRet0_0.length > 0) {
            strNeoeNo = tRet0_0[0].NEOE_NO;
            strVendorMatlType = tRet0_0[0].VENDOR_MATL_TYPE;
            strNeoeAgentCd = strNeoeNo;
            nsrTrCd = tRet0_0[0].NSR_TR_CD;
        }

        var strLcReport = '';
        var strPO = '';
        var strPAY_DATE = '';
        var strReceive = '';
        var strReceiveCd = '';
        sql0_0 = `
            select
                a.pay_report,
                isnull(c.pay_report, '') as lc_pay_report,
                a.po_cd,
                max(a.pay_date) as s_pay_date
            from
                ksv_stock_in a
                left join ksv_stock_in c on a.pu_cd = c.pu_cd
                and a.order_cd = c.order_CD
                and a.po_cd = c.PO_CD
                and a.po_seq = c.po_seq
                and a.matl_cd = c.matl_cd
                and a.lc_bill_no = c.pay_report
                and c.lc_qty > 0
                and c.in_qty <= 0
            where
                a.pay_report = '${argData.PAY_REPORT}'
            group by
                a.pay_report,
                isnull(c.pay_report, ''),
                a.po_cd
        `;
        tRet0_0 = await prisma.$queryRaw(Prisma.raw(sql0_0));
        if (tRet0_0.length > 0) {
            strLcReport = tRet0_0[0].lc_pay_report;
            strPO = tRet0_0[0].po_cd;
            strPAY_DATE = tRet0_0[0].pay_date;
            if (strPO.substring(0, 1) === 'E') {
                strReceive = '에티오피아';
                strReceiveCd = '200';
            } else {
                strReceive = '베트남';
                strReceiveCd = '100';
            }
        }

        var strCurrCd = argData.CURR_CD;
        var strCurrNeoe = '';
        if (strCurrCd === 'KRW') {
            strCurrNeoe = '000';
        } else if (strCurrCd === 'USD') {
            strCurrNeoe = '001';
        } else if (strCurrCd === 'JPY') {
            strCurrNeoe = '002';
        } else if (strCurrCd === 'EUR') {
            strCurrNeoe = '003';
        } else if (strCurrCd === 'CNY') {
            strCurrNeoe = '004';
        } else if (strCurrCd === 'CHF') {
            strCurrNeoe = 'CHF';
        } else if (strCurrCd === 'GBP') {
            strCurrNeoe = 'GBP';
        }

        /*
        let sql1 = `
            select
                rate_base
            from
                neoe_ma_exchange
            where
                curr_sour = '${strCurrNeoe}'
                and yymmdd = '${tRetDate1}'
        `;
        var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
        var strRateBase = '1';
        if (tRet1.length > 0) strRateBase = tRet1[0].rate_base;
        */

        let sql1 = `
            select
                *
            from
                kcd_currency
            where
                curr_cd = '${argData.CURR_CD}'
                and start_date = '${tRetDate1}'
        `;
        var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
        var strRateBase = '1';
        if (tRet1.length > 0) strRateBase = tRet1[0].WON_AMT2;
        else {
            let sql1 = `
                select
                    *
                from
                    kcd_currency
                where
                    curr_cd = '${argData.CURR_CD}'
                    and start_date = (
                        select
                            max(start_date)
                        from
                            kcd_currency
                        where
                            curr_cd = '${argData.CURR_CD}'
                    )
            `;
            var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
            if (tRet1.length > 0) strRateBase = tRet1[0].WON_AMT2;
        }

        var strNeoeType = '';
        var strCdacct = '';
        var strLcflag = '';
        var strRemark = '';
        var strMNGD2 = '';
        var strMNGD7 = '';
        var strCdacct2 = '';

        var strNeoeType = '외화원재료';
        if (strNeoeType === '외화원재료') {
            strCdacct = '15400'; //원재료
            strLcflag = '0';
            strRemark = '수입원재료';
            strMNGD2 = strVendorMatlType;
            strMNGD7 = strReceiveCd;
            strCdacct2 = '25102'; // 외화외상매입금
        } else if (strNeoeType === '외화선급금') {
            strCdacct = '13102'; // 외화선급금
            strLcflag = '3';
            strRemark = '수입원재료';
            strMNGD2 = '';
            strMNGD7 = strVendorMatlType;
            strCdacct2 = '10302'; //   외화보통예금
        } else if (strNeoeType === '미착품') {
            strCdacct = '16500'; //미착품
            strLcflag = '1';
            strRemark = strLcReport;
            strMNGD2 = strVendorMatlType;
            strMNGD7 = strReceiveCd;
            strCdacct2 = '25102';
        } else if (strNeoeType === '상품') {
            strCdacct = '15100'; //상품
            strLcflag = '2';
            strRemark = '상품';
            strMNGD2 = strVendorMatlType;
            strMNGD7 = strReceiveCd;
            strCdacct2 = '25102';
        }

        strRemark = `${strRemark} ${strRemark2} ${tInput.TAXBILL_CD}`;

        //
        var strTotAmt =
            parseFloat(argData.TOT_AMOUNT) * parseFloat(strRateBase);
        strTotAmt = parseFloat(strTotAmt).toFixed(0);

        // TT인경우 : 원재료, L/C인경우 : 미착품

        var tWObj = {};
        tWObj.DATA1 = {};
        tWObj.DATA2 = {};
        tWObj.DATA3 = {};

        // 차변 - 바이어별(cd_cd에 neoe_buyer_cd) , 부가세- 바이어별, 대변 - 1개(업체별)

        var tRowNo = 1;
        var tRowNo1 = 1;

        // 차변
        var tInObj = {};
        tInObj.row_id = strDocuNo;
        tInObj.row_no = '1';
        tInObj.no_tax = '*';
        tInObj.cd_pc = '1000';
        tInObj.cd_wdept = strMngPart; // 8400
        tInObj.no_docu = strDocuNo;
        tInObj.no_doline = '1';
        tInObj.cd_company = '1000';
        tInObj.id_write = strMngId; // 2217
        tInObj.cd_docu = '11';
        tInObj.dt_acct = strDocuDate;
        tInObj.st_docu = '1';
        tInObj.tp_drcr = '1';
        tInObj.cd_acct = strCdacct; // 원재료
        tInObj.amt = strTotAmt; // 한화금액
        tInObj.cd_partner = strNeoeAgentCd;
        tInObj.dt_start = '';
        tInObj.dt_end = '';
        tInObj.am_taxstd = '0';
        tInObj.am_addtax = '0';
        tInObj.tp_tax = '';
        tInObj.no_company = '';
        tInObj.nm_note = strRemark;
        tInObj.cd_bizarea = '1000';
        tInObj.cd_cc = '';
        tInObj.ucd_mng1 = '';
        tInObj.ucd_mng2 = '';
        tInObj.ucd_mng3 = '';
        tInObj.ucd_mng4 = '';
        tInObj.ucd_mng5 = '';
        tInObj.tp_docu = 'N';
        tInObj.no_acct = '0';
        tInObj.cd_exch = strCurrNeoe;
        tInObj.rt_exch = strRateBase;
        tInObj.am_ex = argData.TOT_AMOUNT; // 외화금액
        tInObj.no_to = '';
        tInObj.dt_shipping = '';
        tInObj.tp_gubun = '3';
        tInObj.md_tax1 = '';
        tInObj.nm_item1 = '';
        tInObj.nm_size1 = '';
        tInObj.qt_tax1 = '0';
        tInObj.am_prc1 = '0';
        tInObj.am_supply1 = '0';
        tInObj.am_tax1 = '0';
        tInObj.nm_note1 = '';
        tInObj.cd_mngd1 = strNeoeAgentCd;
        tInObj.nm_mngd1 = '';
        tInObj.cd_mngd2 = strMNGD2;
        tInObj.nm_mngd2 = '';
        tInObj.cd_mngd3 = '200';
        tInObj.nm_mngd3 = '수입';
        tInObj.cd_mngd4 = strCurrNeoe;
        tInObj.nm_mngd4 = strCurrCd;
        tInObj.cd_mngd5 = '';
        tInObj.nm_mngd5 = '';
        tInObj.cd_mngd6 = '';
        tInObj.nm_mngd6 = ''; // 원화금액
        tInObj.cd_mngd7 = strMNGD7;
        tInObj.nm_mngd7 = strReceive;
        tInObj.cd_mngd8 = '';
        tInObj.nm_mngd8 = '';
        tInObj.yn_iss = '0';
        tInObj.final_status = '00';
        tInObj.no_bill = '';
        tInObj.nsrTrCd = nsrTrCd;
        tWObj.DATA1 = {
            ...tInObj,
        };

        tWObj.DATA2 = {};

        /*
        // 외화외상매입금 전표 계정코드 = 25102  
        // 외화과수금 전표 = 25702 
        */
        // 외화보통예금  = 10302
        tRowNo += 1;
        tInObj = {};
        tInObj.row_id = strDocuNo;
        tInObj.row_no = `${tRowNo}`;
        tInObj.no_tax = '*';
        tInObj.cd_pc = '1000';
        tInObj.cd_wdept = strMngPart; // 8400
        tInObj.no_docu = strDocuNo;
        tInObj.no_doline = `${tRowNo}`;
        tInObj.cd_company = '1000';
        tInObj.id_write = strMngId; // 2217
        tInObj.cd_docu = '11';
        tInObj.dt_acct = strDocuDate;
        tInObj.st_docu = '1';
        tInObj.tp_drcr = '2'; // 차변,대변 구분
        tInObj.cd_acct = strCdacct2; // 원재료
        tInObj.amt = strTotAmt; // 한화금액
        tInObj.cd_partner = strNeoeAgentCd;
        tInObj.dt_start = '';
        tInObj.dt_end = '';
        tInObj.am_taxstd = '0';
        tInObj.am_addtax = '0';
        tInObj.tp_tax = '';
        tInObj.no_company = '';
        tInObj.nm_note = strRemark;
        tInObj.cd_bizarea = '1000';
        tInObj.cd_cc = '';
        tInObj.ucd_mng1 = '';
        tInObj.ucd_mng2 = '';
        tInObj.ucd_mng3 = '';
        tInObj.ucd_mng4 = '';
        tInObj.ucd_mng5 = '';
        tInObj.tp_docu = 'N';
        tInObj.no_acct = '0';
        tInObj.cd_exch = strCurrNeoe;
        tInObj.rt_exch = strRateBase;
        tInObj.am_ex = argData.TOT_AMOUNT; // 외화금액
        tInObj.no_to = '';
        tInObj.dt_shipping = '';
        tInObj.tp_gubun = '3';
        tInObj.md_tax1 = '';
        tInObj.nm_item1 = '';
        tInObj.nm_size1 = '';
        tInObj.qt_tax1 = '0';
        tInObj.am_prc1 = '0';
        tInObj.am_supply1 = '0';
        tInObj.am_tax1 = '0';
        tInObj.nm_note1 = '';
        tInObj.cd_mngd1 = '';
        tInObj.nm_mngd1 = '';
        tInObj.cd_mngd2 = '';
        tInObj.nm_mngd2 = '';
        tInObj.cd_mngd3 = '';
        tInObj.nm_mngd3 = '';
        tInObj.cd_mngd4 = '';
        tInObj.nm_mngd4 = '';
        tInObj.cd_mngd5 = '';
        tInObj.nm_mngd5 = '';
        tInObj.cd_mngd6 = '';
        tInObj.nm_mngd6 = ''; // 원화금액
        tInObj.cd_mngd7 = '';
        tInObj.nm_mngd7 = '';
        tInObj.cd_mngd8 = '';
        tInObj.nm_mngd8 = '';
        tInObj.yn_iss = '0';
        tInObj.final_status = '00';
        tInObj.no_bill = '';
        tWObj.DATA3 = {
            ...tInObj,
        };

        requestArray.push(tWObj);

        /*
        try {
           await prisma.$transaction(tSQLArray);
        } catch (e) {
            var tMessage  = 'ERROR:Insert SHIP Record';
            return (tMessage);
        }
        */

        // tDbName = 'shints';
        var isProcess = 0;
        // if (tDbName === 'shints') {
        if (tDbName.includes('test20')) {
            let neoeOrIcubeApiDirector = 'restapi';
            if (tCompanyCode !== 'shints') neoeOrIcubeApiDirector = 'nsrapi';

            let neoeOrIcubeApiPath = 'insert_docu_import_material';
            if (tCompanyCode !== 'shints') neoeOrIcubeApiPath = 'insert_docu';

            try {
                var res_sync = request_sync(
                    'POST',
                    `https://erp.shints.com:3311/${neoeOrIcubeApiDirector}/${neoeOrIcubeApiPath}/${argData.REG_USER}/MATERIAL`,
                    {
                        json: requestArray,
                    },
                );
                var tResData = JSON.parse(res_sync.getBody('utf8'));
                console.log(tResData);
            } catch (e) {
                console.log(`request_sync:; noeo : error: ${e.message}`);
                isProcess = 1;
            }

            if (isProcess === 0 && tCompanyCode === 'shints') {
                var tIdx9 = 0;
                tSQLArray = [];
                for (tIdx9 = 0; tIdx9 < tResData.length; tIdx9++) {
                    var tOne = {
                        ...tResData[tIdx9],
                    };
                    var tCols = tOne.INVOICE_NO.split(' ');
                    var tInvoiceNo = tCols[1];
                    strDocuNo = tOne.DOCU_NO;

                    /*
                    let tSQL99 = `
                        update ksv_invoice_mst
                        set
                            docu_no = '${tOne.DOCU_NO}',
                            income_date = '${args.datas1.INCOME_DATE}'
                        where
                            invoice_no = '${tInvoiceNo}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                    */
                }

                let sql1_2 = `
                    select
                        *
                    from
                        neoe_fi_adocu
                    where
                        row_id = '${strDocuNo}'
                `;
                var tRet1_2 = await prisma.$queryRaw(Prisma.raw(sql1_2));
                if (tRet1_2.length > 0) {
                    let sql1_3 = `
                        delete from neoe_fi_adocu
                        where
                            row_id = '${strDocuNo}'
                    `;
                    var tRet1_3 = await prisma.$queryRaw(Prisma.raw(sql1_3));

                    let sql1_4 = `
                        delete from kcd_app_data
                        where
                            neoe_no = '${strDocuNo}'
                    `;
                    var tRet1_4 = await prisma.$queryRaw(Prisma.raw(sql1_4));
                }

                var tInObj = {
                    ...tWObj.DATA1,
                };
                tInObj.row_id = strDocuNo;
                tInObj.no_docu = strDocuNo;
                let tSQL99 = AFLib.createTableSql('neoe_fi_adocu', tInObj);
                let tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                tInObj = {
                    ...tWObj.DATA3,
                };
                tInObj.row_id = strDocuNo;
                tInObj.no_docu = strDocuNo;
                tSQL99 = AFLib.createTableSql('neoe_fi_adocu', tInObj);
                tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            }
        } else {
            if (tCompanyCode === 'shints') {
                let sql1_2 = `
                    select
                        *
                    from
                        neoe_fi_adocu
                    where
                        row_id = '${strDocuNo}'
                `;
                var tRet1_2 = await prisma.$queryRaw(Prisma.raw(sql1_2));
                if (tRet1_2.length > 0) {
                    let sql1_3 = `
                        delete from neoe_fi_adocu
                        where
                            row_id = '${strDocuNo}'
                    `;
                    var tRet1_3 = await prisma.$queryRaw(Prisma.raw(sql1_3));

                    let sql1_4 = `
                        delete from kcd_app_data
                        where
                            neoe_no = '${strDocuNo}'
                    `;
                    var tRet1_4 = await prisma.$queryRaw(Prisma.raw(sql1_4));
                }

                var tInObj = {
                    ...tWObj.DATA1,
                };
                tInObj.row_id = strDocuNo;
                tInObj.no_docu = strDocuNo;
                let tSQL99 = AFLib.createTableSql('neoe_fi_adocu', tInObj);
                let tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                tInObj = {
                    ...tWObj.DATA3,
                };
                tInObj.row_id = strDocuNo;
                tInObj.no_docu = strDocuNo;
                tSQL99 = AFLib.createTableSql('neoe_fi_adocu', tInObj);
                tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            }
        }

        var tReturn = `SUCCEED:Insert Docu:${strDocuNo}`;

        tInObj = {};
        // tInObj.pay_report = argData.DOC_NO + '-IMPORT';
        tInObj.pay_report = argData.TAXBILL_CD;
        tInObj.lc_report = strLcReport;
        tInObj.seq = strMaxDocuNo;
        tInObj.curr_cd = strCurrCd;
        tInObj.amt = argData.TOT_AMOUNT;
        tInObj.pay_date = strOutDate;
        tInObj.vendor_cd = tInput.VENDOR_CD;
        tInObj.neoe_no = strDocuNo;
        tInObj.neoe_cd = strNeoeAgentCd;
        tInObj.lc_flag = strLcflag;
        tInObj.sinyong = '';
        tInObj.neoe_line = tRowNo1;
        tInObj.reg_user = argData.REG_USER;
        tInObj.cd_acct = strCdacct;
        let tSQL99 = AFLib.createTableSql('kcd_app_import', tInObj);
        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
        if (isProcess === 0) tSQLArray.push(tSQL99_1);

        try {
            await prisma.$transaction(tSQLArray);
        } catch (e) {
            var tMessage = 'ERROR:Insert SHIP Record';
            return tMessage;
        }
        var tReturn = 'SUCCEED:Insert Docu';
        return tReturn;
    }

    async insertDocu(argData, contextValue) {
        var tRetDate = AFLib.getCurrTime();
        var tRetDate1 = tRetDate.substring(0, 8);
        var tUserInfo = AFLib.getUserInfo(contextValue);

        var tInput = { ...argData };

        let sql9_1 = `
              select db_name() as db_name
              `;
        var tRet9_1 = await prisma.$queryRaw(Prisma.raw(sql9_1));
        var tDbName = '';
        if (tRet9_1.length > 0) tDbName = tRet9_1[0].db_name;
        console.log(`DataBase Name:${tDbName}`);

        let sql = `
            SELECT
                C.STSOUT_CD,
                C.INVOICE_NO,
                A.VENDOR_CD,
                A.BUYER_CD,
                F.CURR_CD,
                isnull(sum(F.PO_PRICE * C.OUT_QTY), 0) as s_amt
            FROM
                KSV_SHIPMENT_MEM D,
                KSV_STOCK_OUT_MST G,
                KCD_MATL_MST B,
                KSV_PU_MST2 A,
                KSV_STOCK_MEM2_STSIN F,
                KSV_STOCK_OUT C
                left join KSV_INVOICE_MATL E ON C.INVOICE_NO = E.INVOICE_NO
            WHERE
                D.SHIPMENT_CD = '${tInput.SHIPMENT_CD}'
                AND D.SHIPMENT_CD = C.SHIPMENT_CD
                AND D.STSOUT_CD = C.STSOUT_CD
                AND D.STSOUT_CD = G.STSOUT_CD
                AND C.MATL_CD = B.MATL_CD
                AND C.PU_CD = A.PU_CD
                AND C.STSIN_CD = F.STSIN_CD
                AND C.PO_CD = F.PO_CD
                -- AND  C.PO_SEQ = F.PO_SEQ
                AND C.MATL_CD = F.MATL_CD
                AND C.PU_CD <> ''
                AND C.PU_CD is not null
            group by
                C.STSOUT_CD,
                C.INVOICE_NO,
                A.VENDOR_CD,
                A.BUYER_CD,
                F.CURR_CD
        `;
        var nRet = await prisma.$queryRaw(Prisma.raw(sql));

        var requestArray = [];
        var strDocuNo = '';

        var tIdx = 0;
        for (tIdx = 0; tIdx < nRet.length; tIdx++) {
            var tSQLArray = [];

            var tOne = { ...nRet[tIdx] };

            let sql0_0 = `
                select
                    *
                from
                    kcd_vendor
                where
                    vendor_cd = '${tOne.VENDOR_CD}'
            `;
            var tRet0_0 = await prisma.$queryRaw(Prisma.raw(sql0_0));
            var tVendorObj = {};
            if (tRet0_0.length > 0) tVendorObj = { ...tRet0_0[0] };

            var strNeoeAgentCd = tVendorObj.NEOE_NO;
            var strNeoeAgentName = tVendorObj.VENDOR_NAME;
            var strNeoeA23 = '';
            var strNeoeA23Name = '';
            var strRegdatetime = tRetDate;
            var strDocuDate = tRetDate1;
            var strUsdAmt = tOne.s_amt;
            var strInvoiceNo = tOne.INVOICE_NO;
            var strCurrCd = tOne.CURR_CD;
            var strVendorCd = tOne.VENDOR_CD;
            var strBuyerCd = tOne.BUYER_CD;

            let sql0 = `
                select
                    cd_sysdef
                    -- from neoe.neoe.ma_codedtl
                from
                    NEOE_MA_CODEDTL
                where
                    cd_field = 'MA_B000005'
                    -- and cd_company = '1000'
                    and nm_sysdef = '${strCurrCd}'
            `;
            var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            var strNeoeCurrCd = '';
            if (tRet0.length > 0) strNeoeCurrCd = tRet0[0].cd_sysdef;

            let sql1 = `
                select
                    rate_base
                    -- from neoe.neoe.ma_exchange
                from
                    neoe_ma_exchange
                where
                    curr_sour = '${strNeoeCurrCd}'
                    -- and   yymmdd = '${strDocuDate}'
            `;
            var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
            var strRateBase = '1';
            if (tRet1.length > 0) strRateBase = tRet1[0].rate_base;

            let sql1_1 = `
                select
                    won_amt
                from
                    kcd_currency
                where
                    curr_cd = '${strCurrCd}'
                    and start_date = '${tRetDate1}'
            `;
            var tRet1_1 = await prisma.$queryRaw(Prisma.raw(sql1_1));
            if (tRet1_1.length > 0)
                strRateBase = parseFloat(tRet1_1[0].won_amt);
            else {
                let sql1_2 = `
                    select
                        won_amt
                    from
                        kcd_currency
                    where
                        curr_cd = '${strCurrCd}'
                        and start_date = (
                            select
                                max(start_date)
                            from
                                kcd_currency
                            where
                                curr_cd = '${strCurrCd}'
                        )
                `;
                var tRet1_2 = await prisma.$queryRaw(Prisma.raw(sql1_2));
                if (tRet1_2.length > 0)
                    strRateBase = parseFloat(tRet1_2[0].won_amt);
            }

            let sql2 = `
                select
                    buyer_team,
                    neoe_a23,
                    neoe_buyer_cd_mom,
                    mom_cd
                from
                    kcd_buyer
                where
                    buyer_cd = '${strBuyerCd}'
            `;
            var tRet2 = await prisma.$queryRaw(Prisma.raw(sql2));
            var strBuyerTeam = '';
            var strA23Code = '';
            var strNeoeBuyerMom = '';
            var strMomBuyer = '';
            var strNeoeBuyerName = '';
            if (tRet2.length > 0) {
                strBuyerTeam = tRet2[0].buyer_team;
                strA23Code = tRet2[0].neoe_a23;
                strNeoeBuyerMom = tRet2[0].neoe_buyer_cd_mom;
                strMomBuyer = tRet2[0].mom_cd;
                if (strMomBuyer.trim() === '') {
                    strMomBuyer = strBuyerCd;
                }
            }

            let sql3 = `
                select
                    buyer_name
                from
                    kcd_buyer
                where
                    buyer_cd = '${strMomBuyer}'
            `;
            var tRet3 = await prisma.$queryRaw(Prisma.raw(sql3));
            var strMomBuyerName = '';
            if (tRet3.length > 0) {
                strMomBuyerName = tRet3[0].buyer_name;
                strNeoeBuyerName = strMomBuyerName;
            }

            let sql4 = `
                select
                    cd_code,
                    cd_name
                from
                    kcd_code
                where
                    cd_group = 'BUYER_TEAM_NEOE'
                    and cd_flag = '${strBuyerTeam}'
            `;
            var tRet4 = await prisma.$queryRaw(Prisma.raw(sql4));
            var strCC = '';
            var strCCName = '';
            if (tRet4.length > 0) {
                strCC = tRet4[0].cd_code;
                strCCName = tRet4[0].cd_name;
            }

            let sql5 = `
                select
                    cd_code,
                    cd_name
                from
                    kcd_code
                where
                    cd_group = 'DOCU_MNG'
            `;
            var tRet5 = await prisma.$queryRaw(Prisma.raw(sql5));
            var strMngPart = '';
            var strMngId = '';
            var strMngName = '';
            var strMngEmail = '';
            var strMngTel = '';
            tRet5.forEach((col, i) => {
                if (col.cd_code === 'PART') strMngPart = col.cd_name;
                if (col.cd_code === 'ID') strMngId = col.cd_name;
                if (col.cd_code === 'NAME') strMngName = col.cd_name;
                if (col.cd_code === 'EMAIL') strMngEmail = col.cd_name;
                if (col.cd_code === 'TEL') strMngTel = col.cd_name;
            });

            let sql6 = `
                select
                    nm_mngd
                    -- from neoe.neoe.fi_mngd
                from
                    neoe_fi_mngd
                where
                    cd_mngd = '${strA23Code}'
                    -- and cd_mng='a23' 
                    -- and cd_company='1000'
            `;
            var tRet6 = await prisma.$queryRaw(Prisma.raw(sql6));
            var strA23Name = '';
            if (tRet6.length > 0) strA23Name = tRet6[0].nm_mngd;

            let sql7 = `
                select
                    isnull(max(no_docu), '00000') as max_seq
                    -- from neoe.neoe.fi_adocu
                from
                    neoe_fi_adocu
                where
                    no_docu like 'IS${strDocuDate}%'
            `;
            var tRet7 = await prisma.$queryRaw(Prisma.raw(sql7));
            var tMaxDocuNo = 1;
            if (tRet7[0].max_seq === '00000') {
                tMaxDocuNo = parseFloat(tRet7[0].max_seq) + 1;
            } else {
                tMaxDocuNo = parseFloat(tRet7[0].max_seq.substring(10, 15)) + 1;
            }
            var strMaxDocuNo = AFLib.printF(tMaxDocuNo, 5);
            var strDocuNo = `IS${strDocuDate}${strMaxDocuNo}`;
            var strTaxNo = `${strDocuNo}001`;

            var tNmNote = ``;
            if (tDbName === 'shints') tNmNote = `자재매입 ${strInvoiceNo}`;
            else tNmNote = `자재매입 ${strInvoiceNo} (AF 테스트)`;

            var tTotAmt = 0; // 원화
            var tOrgAmt = 0; // 원화폐 금액
            var tVatAmt = 0; // 원화폐 금액
            var tAcctCode2 = ''; // 계정코드

            if (tVendorObj.VENDOR_TYPE === '1') {
                // 국내
                if (strCurrCd === 'KRW') {
                    tTotAmt = AFLib.getFloat(strUsdAmt, 0);
                    tOrgAmt = AFLib.getFloat(strUsdAmt, 0);
                    tAcctCode2 = '25101'; // 원화외상매입금
                } else {
                    tTotAmt = parseFloat(strUsdAmt) * parseFloat(strRateBase);
                    tTotAmt = AFLib.getFloat(tTotAmt, 0);
                    tOrgAmt = AFLib.getFloat(strUsdAmt, 2);
                    tAcctCode2 = '25102'; // 외화외상매입금
                }
                if (tVendorObj.PERMIT === 'N') {
                    // 과세
                    tVatAmt = tTotAmt * 0.1;
                    tVatAmt = AFLib.getFloat(tVatAmt, 0);
                } else {
                    tVatAmt = 0;
                }
            } else if (tVendorObj.VENDOR_TYPE === '3') {
                // 해외
                tTotAmt = parseFloat(strUsdAmt) * parseFloat(strRateBase);
                tTotAmt = AFLib.getFloat(tTotAmt, 0);
                tOrgAmt = AFLib.getFloat(strUsdAmt, 2);
                tAcctCode2 = '25102'; // 외화외상매입금
                tVatAmt = 0;
            }

            var strTotAmt = String(tTotAmt);
            var strOrgAmt = String(tOrgAmt);
            var strVat = String(tVatAmt);
            var strTotal = String(tTotAmt + tVatAmt);

            let sql7_1 = `
                select
                    *
                from
                    ksv_invoice_matl
                where
                    invoice_no = '${strInvoiceNo}'
            `;
            var tRet7_1 = await prisma.$queryRaw(Prisma.raw(sql7_1));
            if (tRet7_1.length > 0) {
                let tSQL99 = `
                    update ksv_invoice_matl
                    set
                        docu_no = '${strDocuNo}',
                        income_date = '${tRetDate1}'
                    where
                        invoice_no = '${strInvoiceNo}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            } else {
                let sql7_3 = `
                    select
                        *
                    from
                        ksv_stock_out_mst
                    where
                        stsout_cd = '${tOne.STSOUT_CD}'
                `;
                var tRet7_3 = await prisma.$queryRaw(Prisma.raw(sql7_3));
                var tStsOutObj = { ...tRet7_3[0] };

                var tInObj0 = {};
                tInObj0.invoice_no = strInvoiceNo;
                tInObj0.pack_cd = tStsOutObj.PACK_CD;
                tInObj0.out_date = tStsOutObj.OUT_DATETIME.substring(0, 8);
                tInObj0.delivery_amt = strOrgAmt;
                tInObj0.delivery_won = strTotal;
                tInObj0.curr_date = tInObj0.out_date;
                tInObj0.docu_no = strDocuNo;
                tInObj0.payment_type = '1';
                tInObj0.trade_type = '1';
                tInObj0.status_cd = '0';
                tInObj0.reg_user = tUserInfo.USER_ID;
                tInObj0.reg_datetime = tRetDate;
                tInObj0.curr_cd = tOne.CURR_CD;
                tInObj0.trade_kind = '1';
                tInObj0.license_no = '';
                tInObj0.license_date = '';
                tInObj0.buyer_cd = tOne.BUYER_CD;
                tInObj0.stsout_cd = tOne.STSOUT_CD;
                tInObj0.pu_cd = tStsOutObj.PU_CD;
                tInObj0.factory_cd = tStsOutObj.OUT_FACTORY_CD;
                let tSQL99 = AFLib.createTableSql('ksv_invoice_matl', tInObj0);
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                tInObj0 = {};
                tInObj0.invoice_no = strInvoiceNo;
                tInObj0.pack_cd = tStsOutObj.PACK_CD;
                tInObj0.po_cd = tStsOutObj.PO_CD;
                tInObj0.po_amt = strTotal;
                tInObj0.delivery_amt = strOrgAmt;
                tInObj0.delivery_won = strTotal;
                let tSQL99 = AFLib.createTableSql(
                    'ksv_invoice_matlmem',
                    tInObj0,
                );
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            }

            var tWObj = {};
            tWObj.DATA1 = {};
            tWObj.DATA2 = {};
            tWObj.DATA3 = {};

            // 차변 - 바이어별(cd_cd에 neoe_buyer_cd) , 부가세- 바이어별, 대변 - 1개(업체별)

            // 차변
            var tInObj = {};
            tInObj.row_id = strDocuNo;
            tInObj.row_no = '1';
            tInObj.no_tax = '*';
            tInObj.cd_pc = '1000';
            tInObj.cd_wdept = strMngPart; // 8400
            tInObj.no_docu = strDocuNo;
            tInObj.no_doline = '1';
            tInObj.cd_company = '1000';
            tInObj.id_write = strMngId; // 2217
            tInObj.cd_docu = '11';
            tInObj.dt_acct = strDocuDate;
            tInObj.st_docu = '1';
            tInObj.tp_drcr = '1';
            tInObj.cd_acct = '15400'; // 원재료
            tInObj.amt = strTotAmt; // 한화금액
            tInObj.cd_partner = strNeoeAgentCd;
            tInObj.dt_start = strDocuDate;
            tInObj.dt_end = '';
            tInObj.am_taxstd = '0';
            tInObj.am_addtax = '0';
            tInObj.tp_tax = '';
            tInObj.no_company = '';
            tInObj.nm_note = tNmNote;
            tInObj.cd_bizarea = '';
            tInObj.cd_cc = '';
            tInObj.ucd_mng1 = '';
            tInObj.ucd_mng2 = '';
            tInObj.ucd_mng3 = '';
            tInObj.ucd_mng4 = '';
            tInObj.ucd_mng5 = '';
            tInObj.tp_docu = 'N';
            tInObj.no_acct = '0';
            tInObj.cd_exch = strNeoeCurrCd;
            tInObj.rt_exch = strRateBase;
            tInObj.am_ex = strOrgAmt; // 외화금액
            tInObj.no_to = '';
            tInObj.dt_shipping = '';
            tInObj.tp_gubun = '3';
            tInObj.md_tax1 = '';
            tInObj.nm_item1 = '';
            tInObj.nm_size1 = '';
            tInObj.qt_tax1 = '0';
            tInObj.am_prc1 = '0';
            tInObj.am_supply1 = '0';
            tInObj.am_tax1 = '0';
            tInObj.nm_note1 = '';
            tInObj.cd_mngd1 = strNeoeBuyerMom;
            tInObj.nm_mngd1 = strNeoeBuyerName;
            tInObj.cd_mngd2 = '';
            tInObj.nm_mngd2 = '';
            tInObj.cd_mngd3 = '';
            tInObj.nm_mngd3 = '';
            tInObj.cd_mngd4 = strNeoeCurrCd;
            tInObj.nm_mngd4 = strCurrCd;
            tInObj.cd_mngd5 = '';
            tInObj.nm_mngd5 = strRateBase;
            tInObj.cd_mngd6 = '';
            tInObj.nm_mngd6 = strTotAmt; // 원화금액
            tInObj.cd_mngd7 = '';
            tInObj.nm_mngd7 = '';
            tInObj.cd_mngd8 = '';
            tInObj.nm_mngd8 = '';
            tInObj.yn_iss = '0';
            tInObj.final_status = '00';
            tInObj.no_bill = '';
            let tSQL99 = AFLib.createTableSql('neoe_fi_adocu', tInObj);
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            tInObj.AF_A23_CODE = strA23Code;
            tWObj.DATA1 = { ...tInObj };

            // 세금Part
            tInObj = {};
            tInObj.row_id = strDocuNo;
            tInObj.row_no = '2';
            tInObj.no_tax = `${strDocuNo}001`;
            tInObj.cd_pc = '1000';
            tInObj.cd_wdept = strMngPart; // 8400
            tInObj.no_docu = strDocuNo;
            tInObj.no_doline = '2';
            tInObj.cd_company = '1000';
            tInObj.id_write = strMngId; // 2217
            tInObj.cd_docu = '11';
            tInObj.dt_acct = strDocuDate;
            tInObj.st_docu = '1';
            tInObj.tp_drcr = '2';
            tInObj.cd_acct = '13500'; // 부가세대급금
            tInObj.amt = strVat; // 세금금액
            tInObj.cd_partner = strNeoeAgentCd;
            tInObj.dt_start = strDocuDate;
            tInObj.dt_end = '';
            tInObj.am_taxstd = strTotAmt;
            tInObj.am_addtax = strVat;
            tInObj.tp_tax = '15';
            tInObj.no_company = '';
            tInObj.nm_note = tNmNote;
            tInObj.cd_bizarea = '1000';
            tInObj.cd_cc = '';
            tInObj.ucd_mng1 = '';
            tInObj.ucd_mng2 = '';
            tInObj.ucd_mng3 = '';
            tInObj.ucd_mng4 = '';
            tInObj.ucd_mng5 = '';
            tInObj.tp_docu = 'N';
            tInObj.no_acct = '0';
            tInObj.cd_exch = strNeoeCurrCd;
            tInObj.rt_exch = strRateBase;
            tInObj.am_ex = strOrgAmt; // 외화금액
            tInObj.no_to = '';
            tInObj.dt_shipping = ''; // strShipDate
            tInObj.tp_gubun = '3';
            tInObj.md_tax1 = '1201';
            tInObj.nm_item1 = '제품';
            tInObj.nm_size1 = '';
            tInObj.qt_tax1 = '0';
            tInObj.am_prc1 = '0';
            tInObj.am_supply1 = strTotAmt;
            tInObj.am_tax1 = '0';
            tInObj.nm_note1 = '';
            tInObj.cd_mngd1 = strNeoeAgentCd;
            tInObj.nm_mngd1 = strNeoeAgentName;
            tInObj.cd_mngd2 = '15';
            tInObj.nm_mngd2 = '영세(수출)';
            tInObj.cd_mngd3 = '';
            tInObj.nm_mngd3 = ''; // Due Date
            tInObj.cd_mngd4 = ''; // strShipDate
            tInObj.nm_mngd4 = ''; // strShipDate
            tInObj.cd_mngd5 = '';
            tInObj.nm_mngd5 = '';
            tInObj.cd_mngd6 = '9999999999';
            tInObj.nm_mngd6 = '9999999999';
            tInObj.cd_mngd7 = '';
            tInObj.nm_mngd7 = '';
            tInObj.cd_mngd8 = '';
            tInObj.nm_mngd8 = '';
            tInObj.yn_iss = '0';
            tInObj.final_status = '00';
            tInObj.no_bill = '';
            let tSQL99 = AFLib.createTableSql('neoe_fi_adocu', tInObj);
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            if (tVatAmt > 0) {
                tSQLArray.push(tSQL99_1);
                tInObj.AF_A23_CODE = strA23Code;
                tWObj.DATA2 = { ...tInObj };
            } else {
                tWObj.DATA2 = {};
            }

            // 대변
            var strAccCode = tAcctCode2; // 원화외상매입금, 외화외상매입금
            tInObj = {};
            tInObj.row_id = strDocuNo;
            tInObj.row_no = '3';
            tInObj.no_tax = '*';
            tInObj.cd_pc = '1000';
            tInObj.cd_wdept = strMngPart; // 84000
            tInObj.no_docu = strDocuNo;
            tInObj.no_doline = '3';
            tInObj.cd_company = '1000';
            tInObj.id_write = strMngId; // 2217
            tInObj.cd_docu = '11';
            tInObj.dt_acct = strDocuDate;
            tInObj.st_docu = '1';
            tInObj.tp_drcr = '2';
            tInObj.cd_acct = strAccCode;
            tInObj.amt = strTotal;
            tInObj.cd_partner = strNeoeAgentCd;
            tInObj.dt_start = strDocuDate;
            tInObj.dt_end = '';
            tInObj.am_taxstd = '0';
            tInObj.am_addtax = '0';
            tInObj.tp_tax = '';
            tInObj.no_company = '';
            tInObj.nm_note = tNmNote;
            tInObj.cd_bizarea = '';
            tInObj.cd_cc = strNeoeAgentCd;
            tInObj.cd_pjt = strNeoeAgentCd;
            tInObj.ucd_mng1 = '';
            tInObj.ucd_mng2 = '';
            tInObj.ucd_mng3 = strNeoeA23;
            tInObj.ucd_mng4 = '';
            tInObj.ucd_mng5 = '';
            tInObj.tp_docu = 'N';
            tInObj.no_acct = '0';
            tInObj.cd_exch = strNeoeCurrCd;
            tInObj.rt_exch = strRateBase;
            tInObj.am_ex = strOrgAmt;
            tInObj.no_to = '';
            tInObj.dt_shipping = '';
            tInObj.tp_gubun = '3';
            tInObj.md_tax1 = '';
            tInObj.nm_item1 = '';
            tInObj.nm_size1 = '';
            tInObj.qt_tax1 = '0';
            tInObj.am_prc1 = '0';
            tInObj.am_supply1 = '0';
            tInObj.am_tax1 = '0';
            tInObj.nm_note1 = '';
            tInObj.cd_mngd1 = strNeoeAgentCd;
            tInObj.nm_mngd1 = strNeoeAgentName;
            tInObj.cd_mngd2 = strNeoeAgentCd;
            tInObj.nm_mngd2 = strNeoeAgentName;
            tInObj.cd_mngd3 = strNeoeA23;
            tInObj.nm_mngd3 = strNeoeA23Name;
            tInObj.cd_mngd4 = strNeoeCurrCd;
            tInObj.nm_mngd4 = strCurrCd;
            tInObj.cd_mngd5 = '';
            tInObj.nm_mngd5 = strRateBase;
            tInObj.cd_mngd6 = '';
            tInObj.nm_mngd6 = strOrgAmt;
            tInObj.cd_mngd7 = '';
            tInObj.nm_mngd7 = '';
            tInObj.cd_mngd8 = '';
            tInObj.nm_mngd8 = '';
            tInObj.yn_iss = '0';
            tInObj.final_status = '00';
            tInObj.no_bill = '';
            let tSQL99 = AFLib.createTableSql('neoe_fi_adocu', tInObj);
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            tInObj.AF_A23_CODE = strA23Code;
            tWObj.DATA3 = { ...tInObj };
            requestArray.push(tWObj);

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Insert SHIP Record';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
        }

        tDbName = 'shints';
        if (tDbName === 'shints') {
            var res_sync = request_sync(
                'POST',
                `https://erp.shints.com:3311/restapi/insert_docu_oversea_product/${tUserInfo.USER_ID}`,
                {
                    json: requestArray,
                },
            );

            var tResData = JSON.parse(res_sync.getBody('utf8'));
            console.log(tResData);

            var tIdx9 = 0;
            tSQLArray = [];
            for (tIdx9 = 0; tIdx9 < tResData.length; tIdx9++) {
                var tOne = { ...tResData[tIdx9] };
                var tCols = tOne.INVOICE_NO.split(' ');
                var tInvoiceNo = tCols[1];
                strDocuNo = tOne.DOCU_NO;

                let tSQL99 = `
                    update ksv_invoice_mst
                    set
                        docu_no = '${tOne.DOCU_NO}',
                        income_date = '${args.datas1.INCOME_DATE}'
                    where
                        invoice_no = '${tInvoiceNo}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            }

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = `ERROR:Insert SHIP Record:${e.message}`;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
        }

        var tReturn = 'SUCCEED:Insert Docu';
        return tReturn;
    }

    async process_facin (argData, contextValue) {
        var tRetDate = AFLib.getCurrTime();
        var tRetDate1 = tRetDate.substring(0, 8);
        var tUserInfo = AFLib.getUserInfo(contextValue);

        let sql0_1 = `           
           select db_name() as db_name
          `;
        var tRet0_1 = await prisma.$queryRaw(Prisma.raw(sql0_1));
        var tDbName = '';
        if (tRet0_1.length > 0) tDbName = tRet0_1[0].db_name;
        if (tDbName.includes('test20')) {
           ;
        } else {
           ;
        }

        var tSQLArray = [];
        var tRetDate = AFLib.getCurrTime();
        var tFacInCdPrefix = 'FACIN-' + tRetDate;

        var arrayCustomsNo = [];
        var tIdx0 = 0;
        for (tIdx0 = 0; tIdx0 < argData.length; tIdx0++) {
            var chk = 0;
            arrayCustomsNo.forEach((col, i) => {
                if (col === argData[tIdx0].CUSTOMS_NO) chk = 1;
            });
            if (chk <= 0) arrayCustomsNo.push(argData[tIdx0].CUSTOMS_NO);
        }

        var sqlCustomsNo = '';
        arrayCustomsNo.forEach((col, i) => {
            if (col) {
                if (sqlCustomsNo === '') sqlCustomsNo = `'${col}'`;
                else  sqlCustomsNo += `,'${col}'`;
            }
        });

        var sqlCustomsNo = `
            select
                isnull(sum(a.weight), 0) as weight,
                isnull(sum(a.cbm), 0) as cbm,
                isnull(sum(a.ct_qty), 0) as ct_qty,
                b.clearance_no
            from
                ksv_shipment_mem a,
                ksv_shipment_mst b
            where a.shipment_cd = b.shipment_cd
              and b.clearance_no in (${sqlCustomsNo})
            group by
                b.clearance_no
        `;
        var retCustomsNo = await prisma.$queryRaw(Prisma.raw(sqlCustomsNo));

        if (argData.length <= 0) {
            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCESS:Fac In ';
            tObj.id = 0;
            tRetArray.push(tObj);
            return tRetArray;
        }

        var tFacInDate = argData[0].IN_DATE;
        if (!tFacInDate) {
            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'ERROR:Not Input IN_DATE ';
            tObj.id = 0;
            tRetArray.push(tObj);
            return tRetArray;
        }

        // Data 정리
        var dataArray = [];
        argData.forEach((col, i) => {
            var tCheck = 0;
            dataArray.forEach((col1, i1) => {
                if (col1.PO_CD === col.PO_CD &&
                    col1.FACIN_DATE === col.FACIN_DATE &&
                    col1.MATL_CD === col.MATL_CD) {
                    var tObj = { ...col1 };
                    var tVal = parseFloat(tObj.FACIN_QTY) + parseFloat(col.FACIN_QTY);
                    tObj.FACIN_QTY = parseFloat(tVal).toFixed(2);
                    dataArray[i1] = { ...tObj };
                    tCheck = 1;
                } 
            });
            if (tCheck <= 0) {
                var tObj = { ...col };
                dataArray.push(tObj);
            }
        });

        var tIdx0 = 0;
        tSQLArray = [];
        for (tIdx0 = 0; tIdx0 < dataArray.length; tIdx0++) {
            var tOne = { ...dataArray[tIdx0] };

            var tFindObj = {};
            retCustomsNo.forEach((col, i) => {
                if (col.clearance_no === tOne.CUSTOMS_NO) tFindObj = { ...col };
            });

            if (typeof tFindObj.clearance_no === 'undefined') continue;

            var w_weight = parseFloat(tFindObj.weight).toFixed(2);
            var w_ct_qty = parseFloat(tFindObj.ct_qty).toFixed(2);
            var w_cbm = parseFloat(tFindObj.cbm).toFixed(2);

            // 108416279860 = 324.00Pkg 5134.50kg 20.40cbm 
            // ${tFindObj.clearance_no} = ${tFindObj.ct_qty}Pkg ${tFindObj.weight}kg ${tFindObj.cbm}cbm 
            var  tDelivery = `${tFindObj.clearance_no} = ${w_ct_qty}Pkg ${w_weight}kg ${w_cbm}cbm`;

            if (tOne.IN_DATE === '') tOne.IN_DATE = tRetDate1;
            var tErrQty = 0;
            var tFacInCd = `FACIN-${tRetDate}-${tIdx0 + 1}`;

            let tSQL99 = `
                insert into
                    ksv_stock_facin (
                        PO_CD,
                        IN_DATE,
                        MATL_CD,
                        IN_QTY,
                        ERR_QTY,
                        DELIVERY,
                        LOCATION,
                        STATUS_CD,
                        REG_USER,
                        REG_DATETIME,
                        STSOUT_CD,
                        SHORTAGE_QTY,
                        DEFECT_QTY,
                        facin_cd,
                        clearance_no,
                        pu_cd
                    )
                values
                    (
                        '${tOne.PO_CD}',
                        '${tOne.FACIN_DATE}',
                        '${tOne.MATL_CD}',
                        '${tOne.FACIN_QTY}',
                        '${tErrQty}',
                        '${tDelivery}',
                        '',
                        '0',
                        '${tUserInfo.USER_ID}',
                        '${tRetDate}',
                        '${tOne.STSOUT_CD}',
                        '${tOne.SHORTAGE_QTY}',
                        '${tOne.DEFECT_QTY}',
                        '${tFacInCd}',
                        '${tOne.CUSTOMS_NO}',
                        '${tOne.PU_CD}'
                    )
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            let tSQL99 = `
                update ksv_stock_mem2
                set
                    infac_qty = ${tOne.FACIN_QTY},
                    shortage_qty = ${tOne.SHORTAGE_QTY},
                    defect_qty = ${tOne.DEFECT_QTY}
                where
                    po_cd = '${tOne.PO_CD}'
                    and matl_cd = '${tOne.MATL_CD}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            var sql0 = `
                select
                    a.*,
                    isnull(b.IN_QTY, 0) as FACIN_QTY
                from
                    ksv_stock_out a
                    left join ksv_stock_facin_order b on a.po_cd = b.po_cd
                    and a.po_seq = b.po_seq
                    and a.order_cd = b.order_cd
                    and a.matl_cd = b.matl_cd
                    and a.mrp_seq = b.mrp_seq
                    and a.matl_seq = b.matl_seq
                where
                    a.po_cd = '${tOne.PO_CD}'
                    and a.matl_cd = '${tOne.MATL_CD}'
                    and a.stsout_cd = '${tOne.STSOUT_CD}'
            `;
            var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            var tIdx1 = 0;
            for (tIdx1 = 0; tIdx1 < nRet0.length; tIdx1++) {
                var col1 = { ...nRet0[tIdx1] };

                if (parseFloat(col1.FACIN_QTY) > 0) continue;

                var tFacInQty = col1.OUT_QTY;

                var tFacinOrder = {};
                tFacinOrder.PO_CD = col1.PO_CD;
                tFacinOrder.PO_SEQ = col1.PO_SEQ;
                tFacinOrder.ORDER_CD = col1.ORDER_CD;
                tFacinOrder.MATL_CD = col1.MATL_CD;
                tFacinOrder.MRP_SEQ = col1.MRP_SEQ;
                tFacinOrder.MATL_SEQ = col1.MATL_SEQ;
                tFacinOrder.IN_QTY = col1.OUT_QTY;
                tFacinOrder.TOT_QTY = col1.OUT_QTY;
                tFacinOrder.IN_DATE = tRetDate1;
                tFacinOrder.REG_USER = tUserInfo.USER_ID;
                tFacinOrder.REG_DATETIME = tRetDate;
                tFacinOrder.PAY_PRICE = 0;
                tFacinOrder.PAY_CURR_CD = '';
                tFacinOrder.FACIN_CD = tFacInCd;
                let tSQL99 = AFLib.createTableSql(
                    'KSV_STOCK_FACIN_ORDER',
                    tFacinOrder,
                );
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                var sql2 = `
                    select
                        *
                    from
                        ksv_stock_mem
                    where
                        po_cd = '${col1.PO_CD}'
                        and po_seq = '${col1.PO_SEQ}'
                        and order_cd = '${col1.ORDER_CD}'
                        and matl_cd = '${col1.MATL_CD}'
                        and mrp_seq = '${col1.MRP_SEQ}'
                        and matl_seq = '${col1.MATL_SEQ}'
                `;
                var tRet2 = await prisma.$queryRaw(Prisma.raw(sql2));
                if (tRet2.length > 0) {
                    let tSQL99 = `
                        update ksv_stock_mem
                        set
                            infac_qty = ${tFacInQty}
                        where
                            po_cd = '${col1.PO_CD}'
                            and po_seq = '${col1.PO_SEQ}'
                            and order_cd = '${col1.ORDER_CD}'
                            and matl_cd = '${col1.MATL_CD}'
                            and mrp_seq = '${col1.MRP_SEQ}'
                            and matl_seq = '${col1.MATL_SEQ}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }

                var sql2_1 = `
                    select
                        *
                    from
                        ksv_po_mrp
                    where
                        po_cd = '${col1.PO_CD}'
                        and po_seq = '${col1.PO_SEQ}'
                        and order_cd = '${col1.ORDER_CD}'
                        and matl_cd = '${col1.MATL_CD}'
                        and mrp_seq = '${col1.MRP_SEQ}'
                        and matl_seq = '${col1.MATL_SEQ}'
                `;
                var tRet2_1 = await prisma.$queryRaw(Prisma.raw(sql2_1));

                // moq, foc, leftover 처리
                if (
                    parseInt(col1.PO_SEQ) >= 97 &&
                    parseInt(col1.PO_SEQ) <= 100 &&
                    tRet2_1.length > 0
                ) {
                    var tStockIdx = '999999999';
                    if (parseInt(col1.PO_SEQ) === 97)
                        tStockIdx = tRet2_1[0].STOCK_IDX;
                    if (parseInt(col1.PO_SEQ) === 98)
                        tStockIdx = tRet2_1[0].STOCK_IDX;
                    if (parseInt(col1.PO_SEQ) === 99)
                        tStockIdx = tRet2_1[0].STOCK_IDX;

                    var sql3 = `
                        select
                            *
                        from
                            ksv_stock_matl
                        where
                            stock_idx = '${tStockIdx}'
                    `;
                    var tRet3 = await prisma.$queryRaw(Prisma.raw(sql3));
                }

                let tSQL99 = `
                    update ksv_stock_out
                    set
                        facin_user = '${tUserInfo.USER_ID}',
                        facin_datetime = '${tRetDate}'
                    where
                        po_cd = '${col1.PO_CD}'
                        and po_seq = '${col1.PO_SEQ}'
                        and order_cd = '${col1.ORDER_CD}'
                        and matl_cd = '${col1.MATL_CD}'
                        and mrp_seq = '${col1.MRP_SEQ}'
                        and matl_seq = '${col1.MATL_SEQ}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                // tSQLArray.push(tSQL99_1);
            }
        }

        try {
            global.currentTransactionInfo = {
                contextValue: contextValue,
                functionName: AFLib.getFunctionName(),
            };
            await prisma.$transaction(tSQLArray);
            delete global.currentTransactionInfo;
        } catch (e) {
            var tObj = {};
            tObj.CODE = `ERROR:FAC-In: ${e.message}`;
            tObj.id = 0;
            return tObj;
        }

        var tObj = {};
        tObj.CODE = 'SUCCESS:FAC-In';
        tObj.id = 0;
        return (tObj);
    }
}

const moduleMutation_S0518_5 = {
    Mutation: {
        mgrUpdate_S0518_5_CUSTOMER_NO: async (_, args, contextValue) => {
            //
            var tDateNew = new Date();
            tDateNew.setMonth(tDateNew.getMonth() + 1);
            var tZeroDate = '00';
            var tDateNew_M =
                tZeroDate.substring(
                    0,
                    2 - String(tDateNew.getMonth() + 1).length,
                ) + String(tDateNew.getMonth() + 1);
            var tDateNew_D =
                tZeroDate.substring(0, 2 - String(tDateNew.getDate()).length) +
                String(tDateNew.getMonth());
            var tNewDateStr = tDateNew.getFullYear() + tDateNew_M + tDateNew_D;

            var tDate = new Date();
            var mm = tDate.getMonth() + 1;
            var mm_str = '';
            if (mm > 9) mm_str = mm.toString();
            else mm_str = '0' + mm;

            var dd = tDate.getDate();
            var dd_str = '';
            if (dd > 9) dd_str = dd;
            else dd_str = '0' + dd;

            var hours = tDate.getHours();
            var hours_str = '';
            if (hours > 9) hours_str = hours.toString();
            else hours_str = '0' + hours;

            var minutes = tDate.getMinutes();
            var minutes_str = '';
            if (minutes > 9) minutes_str = minutes.toString();
            else minutes_str = '0' + minutes;

            var seconds = tDate.getSeconds();
            var seconds_str = '';
            if (seconds > 9) seconds_str = seconds.toString();
            else seconds_str = '0' + seconds;

            var yyyy = tDate.getFullYear();

            var tRetDate =
                yyyy.toString() +
                mm_str +
                dd_str +
                hours_str +
                minutes_str +
                seconds_str;
            var tRetDate1 = tRetDate.substring(0, 8);
            var tYY = 'B' + yyyy.toString().substring(2) + '-';

            // let tPO = "POA2022S672";
            var tUserInfo = AFLib.getUserInfo(contextValue);

            /*
      var tSQL = `
          SELECT
              max(A.SEQ) + 1 as max_seq
          FROM
              KSV_ORDER_MST A,
              KCD_STYLE B
          WHERE
              A.STYLE_CD = B.STYLE_CD
              and A.YY = ${tOneMst.YY}
              and B.BUYER_CD = '${tOneMst.BUYER_CD}'
      `;
      var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
      var tRet = nRet0[0];
      var tMaxSeq = tRet.max_seq;
*/
            var tInput = { ...args.datas };

            var tSQLArray = [];

            args.datas1.forEach((col, i) => {
                let tSQL99 = `
                    update ksv_shipment_mst
                    set
                        -- ata = '${tRetDate1}' ,
                        CLEARANCE_NO = '${tInput.CUSTOMER_NO}'
                    where
                        shipment_cd = '${col.SHIPMENT_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            });

            //
            var tObj = {};
            tObj.KIND = 'CLEARANCE';
            tObj.FILE_KEY = tInput.FILE_KEY;
            tObj.TITLE = tInput.TITLE;
            tObj.NAME = tInput.NAME;
            tObj.URL = tInput.URL;
            tObj.UPD_DATETIME = tRetDate;
            tObj.OBJECT_NAME = tInput.OBJECT_NAME;
            let tSQL99 = AFLib.createTableSql('KCD_FILEINFO', tObj);
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            // tSQLArray.push(tSQL99_1);

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'SUCCEED:Clearance Update';
                tObj.id = 0;
                tRetArray.push(tObj);
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Clearance Update';
                tObj.id = 0;
                tRetArray.push(tObj);
            }
            return tRetArray;
        },

        mgrUpdate_S0518_5_ARRIVAL: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput = { ...args.datas };
            var tInput1 = { ...args.datas1[0] };

            var tSQLArray = [];

            var tCheck = 0;
            var sql0 = `
                select 
                     isnull(ata, '') as ata 
                from ksv_shipment_mst 
                where shipment_cd = '${tInput1.SHIPMENT_CD}'
            `;
            var ret0 = await prisma.$queryRaw(Prisma.raw(sql0));
            if (ret0.length > 0 && ret0[0].ata !== '') tCheck = 1;

            args.datas1.forEach((col, i) => {
                let tSQL99 = `
                    update ksv_shipment_mst
                    set
                        ata = '${tInput.ARRIVAL_DATE}',
                        status_cd = '3',
                        a_weight = '${col.S_WEIGHT}',
                        a_ct_qty = '${col.S_CT_QTY}',
                        a_cbm = '${col.S_CBM}'
                        -- CLEARANCE_NO = '${tInput.CUSTOMER_NO}' 
                    where
                        shipment_cd = '${col.SHIPMENT_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                if (tCheck <= 0) tSQLArray.push(tSQL99_1);

                // stsout ready 처리
                let tSQL99 = `
                    update ksv_stock_out_mst
                    set
                        ata = '${tInput.ARRIVAL_DATE}',
                        ready_facin_flag = '1'
                    where
                        stsout_cd in (
                            select distinct
                                stsout_cd
                            from
                                ksv_shipment_mem
                            where
                                shipment_cd = '${col.SHIPMENT_CD}'
                        )
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                if (tCheck <= 0) tSQLArray.push(tSQL99_1);
            });

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Factory Arrival';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tCommClass = new S0518_COMM();

            // Facin 처리
            var tReturn = await tCommClass.process_facin (
                args.datas2,
                contextValue,
            );
            if (tReturn.CODE.includes('ERR')) {
                var tRetArray = [];
                tRetArray.push(tReturn);
                return tRetArray;
            }

            // 전표 처리 
            var tIdx2 = 0;
            for (tIdx2 = 0; tIdx2 < args.datas1.length; tIdx2++) {
                var col = { ...args.datas1[tIdx2] };

                if (tCheck > 0) continue;

                var tInObj = {};
                tInObj.SHIPMENT_CD = col.SHIPMENT_CD;
                var taxbillArray = await tCommClass.make_taxbill_data(
                    tInObj,
                    contextValue,
                );
                console.log(`Return make_taxbill: ${taxbillArray.length} `);

                var tIdx3 = 0;
                for (tIdx3 = 0; tIdx3 < taxbillArray.length; tIdx3++) {
                    var col2 = { ...taxbillArray[tIdx3] };
                    var tReturn = await tCommClass.make_docu_import(
                        col2,
                        tIdx3,
                        'shints',
                        contextValue,
                    );
                    console.log(`Return make_docu_import : ${tReturn} `);
                }
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED:Factory Arrival';
            tObj.id = 0;
            tRetArray.push(tObj);
            return tRetArray;
        },

        mgrUpdate_S0518_5_FIXED: async (_, args, contextValue) => {
            var tInput = { ...args.datas };
            var tSQLArray = [];

            args.datas1.forEach((col, i) => {
                let tSQL99 = `
                    update ksv_shipment_mst
                    set
                        --ata = '${tInput.ARRIVAL_DATE}',
                        ata = '',
                        status_cd = '1'
                    where
                        shipment_cd = '${col.SHIPMENT_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            });

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Factory Fixed';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED:Factory Fixed';
            tObj.id = 0;
            tRetArray.push(tObj);
            return tRetArray;
        },

        mgrInsert_S0518_5_FILE_ADD: async (_, args, contextValue) => {
            //
            var tDateNew = new Date();
            tDateNew.setMonth(tDateNew.getMonth() + 1);
            var tZeroDate = '00';
            var tDateNew_M =
                tZeroDate.substring(
                    0,
                    2 - String(tDateNew.getMonth() + 1).length,
                ) + String(tDateNew.getMonth() + 1);
            var tDateNew_D =
                tZeroDate.substring(0, 2 - String(tDateNew.getDate()).length) +
                String(tDateNew.getMonth());
            var tNewDateStr = tDateNew.getFullYear() + tDateNew_M + tDateNew_D;

            var tDate = new Date();
            var mm = tDate.getMonth() + 1;
            var mm_str = '';
            if (mm > 9) mm_str = mm.toString();
            else mm_str = '0' + mm;

            var dd = tDate.getDate();
            var dd_str = '';
            if (dd > 9) dd_str = dd;
            else dd_str = '0' + dd;

            var hours = tDate.getHours();
            var hours_str = '';
            if (hours > 9) hours_str = hours.toString();
            else hours_str = '0' + hours;

            var minutes = tDate.getMinutes();
            var minutes_str = '';
            if (minutes > 9) minutes_str = minutes.toString();
            else minutes_str = '0' + minutes;

            var seconds = tDate.getSeconds();
            var seconds_str = '';
            if (seconds > 9) seconds_str = seconds.toString();
            else seconds_str = '0' + seconds;

            var yyyy = tDate.getFullYear();

            var tRetDate =
                yyyy.toString() +
                mm_str +
                dd_str +
                hours_str +
                minutes_str +
                seconds_str;
            var tRetDate1 = tRetDate.substring(0, 8);
            var tYY = 'B' + yyyy.toString().substring(2) + '-';

            // let tPO = "POA2022S672";
            var tUserInfo = AFLib.getUserInfo(contextValue);

            /*
      var tSQL = `
          SELECT
              max(A.SEQ) + 1 as max_seq
          FROM
              KSV_ORDER_MST A,
              KCD_STYLE B
          WHERE
              A.STYLE_CD = B.STYLE_CD
              and A.YY = ${tOneMst.YY}
              and B.BUYER_CD = '${tOneMst.BUYER_CD}'
      `;
      var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
      var tRet = nRet0[0];
      var tMaxSeq = tRet.max_seq;
*/
            var tInput = { ...args.datas };

            var tSQLArray = [];

            if (args.datas1.length > 1) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE =
                    'ERROR:You can process one record at a time. Please select only one data item.';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            /*
      args.datas1.forEach((col, i) => {
         let tSQL99 = `
             update ksv_shipment_mst
             set
                 -- ata = '${tRetDate1}' ,
                 CLEARANCE_NO = '${tInput.FILE_KEY}'
             where
                 shipment_cd = '${col.SHIPMENT_CD}'
         `;
         const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
         tSQLArray.push(tSQL99_1);
      });
*/
            var col = { ...args.datas1[0] };

            tInput.FILE_KEY = col.SHIPMENT_CD;

            //
            var tObj = {};
            tObj.KIND = 'CLEARANCE';
            tObj.FILE_KEY = tInput.FILE_KEY;
            tObj.TITLE = tInput.TITLE;
            tObj.NAME = tInput.NAME;
            tObj.URL = tInput.URL;
            tObj.UPD_DATETIME = tRetDate;
            tObj.OBJECT_NAME = tInput.OBJECT_NAME;
            let tSQL99 = AFLib.createTableSql('KCD_FILEINFO', tObj);
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'SUCCEED:Clearance Update';
                tObj.id = 0;
                tRetArray.push(tObj);
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Clearance Update';
                tObj.id = 0;
                tRetArray.push(tObj);
            }
            return tRetArray;
        },

        mgrUpdate_S0518_5_UPDATE_ERROR_QTY: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tSQLArray = [];
            args.datas.forEach((col, i) => {
                let tSQL99 = `
                    update ksv_stock_out
                    set
                        ERR_QTY = '${col.ERR_QTY}'
                    where
                        pu_cd = '${col.PU_CD}'
                        and stsout_cd = '${col.STSOUT_CD}'
                        and po_cd = '${col.PO_CD}'
                        and po_seq = '${col.PO_SEQ}'
                        and matl_cd = '${col.MATL_CD}'
                        and order_cd = '${col.ORDER_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            });

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'SUCCEED:Update Error Qty';
                tObj.id = 0;
                tRetArray.push(tObj);
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Clearance Update';
                tObj.id = 0;
                tRetArray.push(tObj);
            }
            return tRetArray;
        },

        mgrUpdate_S0518_5_INSERT_DOCU: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput = { ...args.datas };

            let sql0 = `
                SELECT
                    E.INVOICE_NO,
                    D.STSOUT_CD,
                    G.STSIN_CD,
                    E.OUT_DATE,
                    A.VENDOR_CD,
                    A.BUYER_CD,
                    E.CURR_CD,
                    sum((F.PO_PRICE * C.OUT_QTY)) as S_AMT
                FROM
                    KSV_PU_MST2 A,
                    KSV_SHIPMENT_MEM D,
                    KSV_STOCK_OUT C,
                    KCD_MATL_MST B,
                    KSV_INVOICE_MATL E,
                    KSV_STOCK_MEM2_STSIN F,
                    KSV_STOCK_OUT_MST G
                WHERE
                    A.PU_CD = C.PU_CD
                    AND D.INVOICE_NO = E.INVOICE_NO
                    AND G.STSOUT_CD = D.STSOUT_CD
                    AND F.STSIN_CD = G.STSIN_CD
                    AND F.MATL_CD = C.MATL_CD
                    AND C.STSOUT_CD = D.STSOUT_CD
                    AND D.SHIPMENT_CD = '${tInput.SHIPMENT_CD}'
                    AND C.PU_CD <> ''
                    AND C.PU_CD is not null
                    AND C.MATL_CD = B.MATL_CD
                    AND (
                        E.DOCU_NO is null
                        or E.DOCU_NO = ''
                    )
                group by
                    E.INVOICE_NO,
                    D.STSOUT_CD,
                    G.STSIN_CD,
                    E.OUT_DATE,
                    A.VENDOR_CD,
                    A.BUYER_CD,
                    E.CURR_CD
            `;
            var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));

            var tIdx: number = 0;
            var tArray = [];
            for (tIdx = 0; tIdx < nRet0.length; tIdx++) {
                var tOne: Object = { ...nRet0[tIdx] };

                var strInDate = tRetDate1;

                var tSQLArray: any[] = [];

                var m_strCurrCd = tOne['CURR_CD'];

                var sqlVendor: string = `
                    select
                        *
                    from
                        kcd_vendor
                    where
                        vendor_cd = '${tOne['VENDOR_CD']}'
                `;
                var objVendors: any[] = await prisma.$queryRaw(
                    Prisma.raw(sqlVendor),
                );
                var objVendor: any = { ...objVendors[0] };

                var sql3: string = `
                    select
                        isnull(max(no_docu), '00000') as max_doc
                    from
                        neoe_fi_adocu
                    where
                        no_docu like 'IM${tRetDate1}%'
                `;
                var obj3: any[] = await prisma.$queryRaw(Prisma.raw(sql3));
                var tMaxSeq = 1;
                if (obj3.length > 0) {
                    var tStr = obj3[0]['max_doc'];
                    if (tStr === '00000') tMaxSeq = 1;
                    else tMaxSeq = parseInt(tStr.substring(10, 15)) + 1;
                }

                var sql4: string = `
                    select
                        *
                    from
                        kcd_currency
                    where
                        curr_cd = '${m_strCurrCd}'
                        and start_date = '${tRetDate1}'
                `;
                var obj4: any[] = await prisma.$queryRaw(Prisma.raw(sql4));
                var objCurrency: any = { ...obj4[0] };

                if (objVendor['NEOE_NO'] === '') {
                    console.log(
                        'Vendor에 더존코드 없음: ' + objVendor['NEOE_NO'],
                    );
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = `ERROR:Vendor에 더존코드 없음:${objVendor['NEOE_NO']}`;
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }

                console.log(
                    `=======================================================`,
                );

                var m_strPurApp = '';
                var m_strTTFlag = '';
                var m_strNeoeCd = '';
                var m_strTaxAmt = 0;
                var m_strTotAmt = parseFloat(tOne['S_AMT']);
                var m_strVendorCd = tOne['VENDOR_CD'];
                var m_strPayDate = tRetDate1;
                var strDocuDate = m_strPayDate;
                var m_strCurrCd = tOne['CURR_CD'];
                var m_strApproKey = '';
                var m_strTaxDate = '';
                var tTaxCd = 0;
                var strCurrNeoe = '';
                var strBillDate = tRetDate1;
                var taxAdd0 = '4';
                var taxAdd = '0';
                m_strPurApp = 'X';
                m_strTTFlag = '1';

                var strNegoType = '원재료';

                var strCurrCd = m_strCurrCd;
                var strCurrCdNeoe = '';
                if (strCurrCd === 'KRW') {
                    strCurrNeoe = '000';
                    strCurrCdNeoe = '25100';
                } else if (strCurrCd === 'USD') {
                    strCurrNeoe = '001';
                    strCurrCdNeoe = '25101';
                    if (m_strPurApp === 'O') strCurrCdNeoe = '25102';
                } else if (strCurrCd === 'JPY') {
                    strCurrNeoe = '002';
                    strCurrCdNeoe = '25101';
                } else if (strCurrCd === 'EUR') {
                    strCurrNeoe = '003';
                    strCurrCdNeoe = '25101';
                    if (m_strPurApp === 'O') strCurrCdNeoe = '25102';
                } else if (strCurrCd === 'CNY') {
                    strCurrNeoe = '004';
                    strCurrCdNeoe = '25101';
                } else if (strCurrCd === 'CHF') {
                    strCurrNeoe = 'CHF';
                    strCurrCdNeoe = '25101';
                } else if (strCurrCd === 'GBP') {
                    strCurrNeoe = 'GBP';
                    strCurrCdNeoe = '25101';
                }
                var strRateBase = objCurrency.WON_AMT;

                var tMaxStr = AFLib.printF(tMaxSeq, 5);
                var strDocuNo = `IM${tRetDate1}${tMaxStr}`;
                var strTaxNo = strDocuNo + '001';
                var tInvoiceNo = tOne.INVOICE_NO;

                var strTaxCd = '26';
                var strTaxNm = '면세(계산서)';
                var strCdAcct = '15400';
                strCurrCdNeoe = '25102';
                var strLocCd = '200';
                var strLocNm = '수입';

                var strCdacct = '';
                var strLcflag = '';
                var strRemark = '';
                var strMNGD2 = '';
                var strMNGD7 = '';
                var strCdacct2 = '';

                var strNeoeNo = objVendor['NEOE_NO'];
                var strRegNo = objVendor['REG_NO'];
                strRegNo = strRegNo.replace(/-/gi, '');
                var strVendorName = objVendor['VENDOR_NAME'];
                var strNeoeAgentName = strVendorName;
                var strNeoeAgentCd = strNeoeNo;
                var strVendorMatlType = objVendor['VENDOR_MATL_TYPE'];
                var strMatlType = '';

                console.log(
                    `>>>>> (1) ${tInvoiceNo} | ${strNeoeNo} | ${strRegNo} | ${strVendorMatlType} `,
                );

                // 수입원재료
                strCdacct = '15400';
                strLcflag = '0';
                strRemark = '수입원재료';
                strMNGD2 = strVendorMatlType;
                // strMNGD7  = strReceivecd;
                strCdacct2 = '';

                if (strVendorMatlType === 'M') {
                    strMatlType = '100';
                    strRemark = '수입원재료';
                } else if (strVendorMatlType === 'S') {
                    strMatlType = '300';
                    strRemark = '수입원재료';
                }

                var amountSum = m_strTotAmt;
                if (m_strCurrCd === 'KRW')
                    amountSum = parseInt(String(m_strTotAmt));

                var strMngPart = '8400';
                var strMngId = '9999';
                var strMngName = AFLib.getUserInfo(contextValue).USER_ID;
                var strMngEmail = 'test@shints.com';
                var strMngTel = '000-000-0000';

                // m_strTaxAmt : 부가세, m_strTotAmt : 부가세 포함금액
                var strTotAmt = m_strTotAmt;
                var strTaxAmt = m_strTaxAmt;
                var strTotalAmt = strTotAmt + strTaxAmt;

                if (m_strCurrCd !== 'KRW') {
                    strTotAmt = parseInt(
                        String(strTotAmt * objCurrency.WON_AMT),
                    );
                    strTaxAmt = parseInt(
                        String(strTaxAmt * objCurrency.WON_AMT),
                    );
                    strTotalAmt = parseInt(
                        String(strTotalAmt * objCurrency.WON_AMT),
                    );
                }

                var tRowNo = 1;

                // 차변 - 부가세 - 대변

                var tDocuObj: any = {};
                tDocuObj.row_id = strDocuNo;
                tDocuObj.row_no = String(tRowNo);
                tDocuObj.no_tax = '*';
                tDocuObj.cd_pc = '1000';
                tDocuObj.cd_wdept = strMngPart;
                tDocuObj.no_docu = strDocuNo;
                tDocuObj.no_doline = String(tRowNo);
                tDocuObj.cd_company = '1000';
                tDocuObj.id_write = strMngId;
                tDocuObj.cd_docu = '11';
                tDocuObj.dt_acct = strDocuDate;
                tDocuObj.st_docu = '1';
                tDocuObj.tp_drcr = '1'; // 차변, 대변 구분
                tDocuObj.cd_acct = strCdAcct;
                tDocuObj.amt = String(strTotAmt);
                tDocuObj.cd_partner = strNeoeAgentCd;
                tDocuObj.dt_start = '';
                tDocuObj.dt_end = '';
                tDocuObj.am_taxstd = '0';
                tDocuObj.am_addtax = '0';
                tDocuObj.tp_tax = strTaxCd;
                tDocuObj.no_company = '';
                tDocuObj.nm_note = strRemark;
                tDocuObj.cd_bizarea = '1000';
                tDocuObj.cd_cc = '';
                tDocuObj.ucd_mng1 = '';
                tDocuObj.ucd_mng2 = '';
                tDocuObj.ucd_mng3 = '';
                tDocuObj.ucd_mng4 = '';
                tDocuObj.ucd_mng5 = '';
                tDocuObj.tp_docu = 'N';
                tDocuObj.no_acct = '0';
                tDocuObj.cd_exch = strCurrNeoe;
                tDocuObj.rt_exch = strRateBase;
                tDocuObj.am_ex = String(strTotAmt);
                tDocuObj.no_to = '';
                tDocuObj.dt_shipping = '';
                tDocuObj.tp_gubun = '3';
                tDocuObj.md_tax1 = '';
                tDocuObj.nm_item1 = '';
                tDocuObj.nm_size1 = '';
                tDocuObj.qt_tax1 = '0';
                tDocuObj.am_prc1 = '0';
                tDocuObj.am_supply1 = '0';
                tDocuObj.am_tax1 = '0';
                tDocuObj.nm_note1 = '';
                tDocuObj.cd_mngd1 = strNeoeAgentCd;
                tDocuObj.nm_mngd1 = strNeoeAgentName;
                tDocuObj.cd_mngd2 = strMatlType;
                tDocuObj.nm_mngd2 = '';
                tDocuObj.cd_mngd3 = strLocCd;
                tDocuObj.nm_mngd3 = strLocNm;
                tDocuObj.cd_mngd4 = '';
                tDocuObj.nm_mngd4 = '';
                tDocuObj.cd_mngd5 = '';
                tDocuObj.nm_mngd5 = '';
                tDocuObj.cd_mngd6 = '';
                tDocuObj.nm_mngd6 = String(strTotAmt);
                tDocuObj.cd_mngd7 = '';
                tDocuObj.nm_mngd7 = '';
                tDocuObj.cd_mngd8 = '';
                tDocuObj.nm_mngd8 = '';
                tDocuObj.yn_iss = '0';
                tDocuObj.final_status = '00';
                tDocuObj.no_bill = '';
                var tSQL99 = AFLib.createTableSql('neoe_fi_adocu', tDocuObj);
                var tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                //
                tRowNo += 1;
                tDocuObj = {};
                tDocuObj.row_id = strDocuNo;
                tDocuObj.row_no = String(tRowNo);
                tDocuObj.no_tax = '*';
                tDocuObj.cd_pc = '1000';
                tDocuObj.cd_wdept = strMngPart;
                tDocuObj.no_docu = strDocuNo;
                tDocuObj.no_doline = String(tRowNo);
                tDocuObj.cd_company = '1000';
                tDocuObj.id_write = strMngId;
                tDocuObj.cd_docu = '11';
                tDocuObj.dt_acct = strDocuDate;
                tDocuObj.st_docu = '1';
                tDocuObj.tp_drcr = '2';
                tDocuObj.cd_acct = strCurrCd; // strCdAcct
                tDocuObj.amt = String(strTotalAmt);
                tDocuObj.cd_partner = strNeoeAgentCd;
                tDocuObj.dt_start = '';
                tDocuObj.dt_end = m_strPayDate;
                tDocuObj.am_taxstd = '0';
                tDocuObj.am_addtax = '0';
                tDocuObj.tp_tax = strTaxCd;
                tDocuObj.no_company = '';
                tDocuObj.nm_note = strRemark;
                tDocuObj.cd_bizarea = '1000';
                tDocuObj.cd_cc = '';
                tDocuObj.ucd_mng1 = '';
                tDocuObj.ucd_mng2 = '';
                tDocuObj.ucd_mng3 = '';
                tDocuObj.ucd_mng4 = '';
                tDocuObj.ucd_mng5 = '';
                tDocuObj.tp_docu = 'N';
                tDocuObj.no_acct = '0';
                tDocuObj.cd_exch = strCurrNeoe;
                tDocuObj.rt_exch = strRateBase;
                tDocuObj.am_ex = String(strTotalAmt);
                tDocuObj.no_to = '';
                tDocuObj.dt_shipping = '';
                tDocuObj.tp_gubun = '3';
                tDocuObj.md_tax1 = '';
                tDocuObj.nm_item1 = '';
                tDocuObj.nm_size1 = '';
                tDocuObj.qt_tax1 = '0';
                tDocuObj.am_prc1 = '0';
                tDocuObj.am_supply1 = '0';
                tDocuObj.am_tax1 = '0';
                tDocuObj.nm_note1 = '';
                tDocuObj.cd_mngd1 = strNeoeAgentCd;
                tDocuObj.nm_mngd1 = strNeoeAgentName;
                tDocuObj.cd_mngd2 = strMatlType;
                tDocuObj.nm_mngd2 = '';
                tDocuObj.cd_mngd3 = '';
                tDocuObj.nm_mngd3 = '';
                tDocuObj.cd_mngd4 = '';
                tDocuObj.nm_mngd4 = '';
                tDocuObj.cd_mngd5 = '';
                tDocuObj.nm_mngd5 = '';
                tDocuObj.cd_mngd6 = '';
                tDocuObj.nm_mngd6 = '';
                tDocuObj.cd_mngd7 = '';
                tDocuObj.nm_mngd7 = '';
                tDocuObj.cd_mngd8 = '';
                tDocuObj.nm_mngd8 = '';
                tDocuObj.yn_iss = '0';
                tDocuObj.final_status = '00';
                tDocuObj.no_bill = '';

                tSQL99 = AFLib.createTableSql('neoe_fi_adocu', tDocuObj);
                tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                tSQL99 = `
                    update ksv_invoice_matl
                    set
                        docu_no = '${strDocuNo}'
                    where
                        invoice_no = '${tInvoiceNo}'
                `;
                tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                try {
                    global.currentTransactionInfo = {
                        contextValue: contextValue,
                        functionName: AFLib.getFunctionName(),
                    };
                    await prisma.$transaction(tSQLArray);
                    delete global.currentTransactionInfo;
                } catch (e: any) {
                    console.log(`ERROR : ${e['message']}`);
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = `ERROR:Vendor에 더존코드 없음:${objVendor['NEOE_NO']}`;
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED:Insert Docu';
            tObj.id = 0;
            tRetArray.push(tObj);
            return tRetArray;
        },
    },
};

export default moduleMutation_S0518_5;
