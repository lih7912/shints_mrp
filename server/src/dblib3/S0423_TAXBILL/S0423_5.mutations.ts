// MGR_@@TNAME@@.mutations.js

import * as fs from 'fs';
import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기

/*
                STD_FLAG: String 
                NET: String 
                LOSS: String 
                USE_SIZE: String 
                REMARK: String 

*/

// export default로 Mutation 내용 내보내기
class S0423_5_COMM {
    async process_taxbill(argDatas, contextValue) {
        var tRetDate = AFLib.getCurrTime();
        var tRetDate1 = tRetDate.substring(0, 8);
        var tUserInfo = AFLib.getUserInfo(contextValue);

        var tInput = {
            ...argDatas[0],
        };
        var tSQLArray = [];

        var tCheckVendorGW = 0;
        var tCheckPayReport = 0;
        var tCheckCalc = 0;
        var tCheckGW = 0;
        var tCheckBillDate = 0;

        var tIdx = 0;
        for (tIdx = 0; tIdx < argDatas.length; tIdx++) {
            var tOne = {
                ...argDatas[tIdx],
            };
            if (tOne.BILL_FLAG === 'O') tCheckCalc += 1;
            if (tOne.GW_STATUS === '1' || tOne.GW_STATUS === '2') tCheckGW += 1;
            if (
                parseFloat(tOne.PAY_AMT) <= 0 &&
                parseFloat(tOne.DEPOSIT_AMT) <= 0 &&
                parseFloat(tOne.LC_AMT) <= 0
            )
                tCheckPayReport += 1;
            let sql0 = `
                select
                    GW
                from
                    KCD_VENDOR
                where
                    VENDOR_CD = '${tOne.VENDOR_CD}'
            `;
            var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            if (nRet0[0].GW != '2') tCheckVendorGW += 1;
        }

        var tErrorStr = '';
        if (tCheckPayReport > 0) {
            tErrorStr =
                'pay amt, Deposit amt, LC amt중 하나는 금액이 있어야 합니다.';
        } else if (tCheckCalc > 0) {
            tErrorStr = 'Taxbill OK 된 문서입니다..';
        } else if (tCheckGW > 0) {
            tErrorStr = '그룹웨어 상신 중인 문서는 작업이 불가 합니다..';
        } else if (tCheckBillDate > 0) {
            tErrorStr = 'TaxBill Date를 확인해 주시기 바랍니다.';
        }
        if (tErrorStr !== '') {
            var tRetArray = [];
            var tObj = {};
            tObj.CODE = `ERROR:(TAXBILL):${tErrorStr}`;
            tObj.id = 0;
            tRetArray.push(tObj);
            return tRetArray;
        }

        var m_TAXBILL_CD = '';

        var tIdx = 0;
        for (tIdx = 0; tIdx < argDatas.length; tIdx++) {
            tSQLArray = [];
            var tOne = {
                ...argDatas[tIdx],
            };
            if (tOne.BILL_FLAG === 'O') continue;

            /*
            let sql0_1 = `
                select
                    isnull(max(taxbill_cd), '') as max_taxbill_cd
                from
                    kcd_gw_taxbill_kr
                where
                    taxbill_cd like 'TAX${tRetDate.substring(2,4)}-%'
            `; 
            var nRet0_1 = await prisma.$queryRaw(Prisma.raw(sql0_1));
            var tMaxSeq = 1;
            if (nRet0_1.length > 0) {
               if (nRet0_1[0].max_taxbill_cd === '') tMaxSeq = 1;
               else tMaxSeq = parseInt(nRet0_1[0].max_taxbill_cd.substring(6, 12)) + 1;
            }
            var tMaxSeqStr = AFLib.printF(tMaxSeq, 6);
            m_TAXBILL_CD = `TAX${tRetDate.substring(2,4)}-${tMaxSeqStr}`; 
            */

            if (tOne.VENDOR_TYPE === '3' && tOne.PAY_REPORT === '') {
                tErrorStr = `구매영수증이 정확히 만들어 졌는지 확인하세요(Pay report확인요/Import업체).`;
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = `ERROR:(TAXBILL):${tErrorStr}`;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var m_PAY_BANK = '';
            var m_PAY_BANK_ACCOUNT = '';
            var tBankObj = {};
            if (tOne.VENDOR_TYPE === '1' || tOne.VENDOR_TYPE === '3') {
                // 국내자재업체, 수입자재업체
                let sql0 = `
                    select
                        bank_cd,
                        gw
                    from
                        KCD_VENDOR_BANK
                    where
                        VENDOR_CD = '${tOne.VENDOR_CD}'
                `;
                var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                var tWorkBank = '';
                nRet0.forEach((col2, i2) => {
                    // 승인된 Bank가 있는경우만  테스트를 위해 통과
                    // if (col2.gw === '2') tWorkBank = col2.bank_cd;
                    if (tWorkBank === '') tWorkBank = col2.bank_cd;
                });
                if (tWorkBank === '') {
                    tErrorStr = `.`;
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = `ERROR:(TAXBILL):승인된 연결 은행 정보가 없습니다. Supplier Info에서 확인하세요(${tOne.VENDOR_CD})`;
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }
                if (tWorkBank !== '') {
                    let sql1 = `
                        select
                            *
                        from
                            KCD_BANK
                        where
                            BANK_CD = '${tWorkBank}'
                    `;
                    var nRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                    if (nRet1.length > 0) {
                        tBankObj = {
                            ...nRet1[0],
                        };
                        m_PAY_BANK = nRet1[0].BANK_CD;
                        m_PAY_BANK_ACCOUNT = nRet1[0].ACCOUNT_CD;
                    }
                } else {
                    tErrorStr = `업체의 Pay Bank를 확인해 주세요 (${tOne.VENDOR_CD}).`;
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = `ERROR:(TAXBILL):${tErrorStr}`;
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }
            }

            var tMinus =
                parseFloat(tOne.DISCOUNT_AMT) +
                parseFloat(tOne.DEBIT_AMT) +
                parseFloat(tOne.LC_AMT) +
                parseFloat(tOne.DEPOSIT_AMT);
            var tTax = parseFloat(tOne.VAT_AMT);
            var tMinusAmount = parseFloat(tOne.PO_AMT) - parseFloat(tMinus);
            var tTotAmount = tMinusAmount + tTax;
            var tPayReport = tOne.PAY_REPORT;

            /*
            let tSQL99 = `
                update kcd_gw_taxbill_kr
                set
                    taxbill_cd = '${m_TAXBILL_CD}',
                    taxbill_date = '${tRetDate1}',
                    tax = '${tTax}',
                    minus_amount = '${tMinusAmount}',
                    tot_amount = '${tTotAmount}'
                where
                    bill_cd = '${tOne.BILL_CD}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);
            */

            var tPurApp = 'X';
            /*
          let tSQL99 = `
              update ksv_stock_in
              set
                  calc_flag = '1'
                  -- remark = '', 
                  -- tax = '${tOne.VAT_AMT}', 
                  -- pur_app = '${tPurApp}' 
              where
                  stsin_cd in (
                      select distinct
                          stsin_cd
                      from
                          ksv_stock_mem2_stsin
                      where
                          bill_cd = '${tOne.BILL_CD}'
                  )
          `;
          */
            let tSQL99 = `
                update a
                set
                    calc_flag = '1'
                from
                    ksv_stock_in as a,
                    kcd_matl_mst b,
                    kcd_buyer c,
                    kcd_user d
                where
                    a.end_date = '${tOne.INVOICE_DATE}'
                    and a.pay_date = '${tOne.PAY_DATE}'
                    and a.in_curr_cd = '${tOne.CURR_CD}'
                    and a.matl_cd = b.matl_cd
                    and left(a.order_cd, 2) = c.buyer_cd
                    and c.reg_user = d.user_id
                    and d.company_code = '${tOne.COMPANY_CODE}'
                    and b.vendor_cd = '${tOne.VENDOR_CD}'
                    and a.pur_factory = '${tOne.PUR_FACTORY}'
                    and a.pur_app = '${tOne.PUR_APP}'
                    and a.tt_flag = '${tOne.TT_FLAG}'
                    -- where stsin_cd in (select distinct stsin_cd from ksv_stock_mem2_stsin where bill_cd =  '${tOne.BILL_CD}')
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            let tSQL99 = `
                update ksv_stock_in_mst
                set
                    calc_flag = '1',
                    -- pay_curr_cd = '${tOne.CURR_CD}', 
                    -- pay_amt = '${tOne.PAY_AMT}', 
                    -- bill_flag = '1', 
                    -- bill_date = '${tRetDate1}', 
                    taxbill_cd = '${m_TAXBILL_CD}',
                    -- tax = '${tOne.VAT_AMT}', 
                    pur_app = '${tPurApp}'
                where
                    stsin_cd in (
                        select distinct
                            stsin_cd
                        from
                            ksv_stock_mem2_stsin
                        where
                            bill_cd = '${tOne.BILL_CD}'
                    )
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            // nsr, shints 분리 저장을 위해 ksv_dc_amount2을 생성하여 저장할것
            let tSQL99 = `
                update a
                set
                    calc_flag = '1'
                from
                    ksv_dc_amount as a
                where
                    a.end_date = '${tOne.INVOICE_DATE}'
                    and a.pay_date = '${tOne.PAY_DATE}'
                    and a.curr_cd = '${tOne.CURR_CD}'
                    and a.vendor_cd = '${tOne.VENDOR_CD}'
                    and a.pur_factory = '${tOne.PUR_FACTORY}'
                    and a.tt_flag = '${tOne.TT_FLAG}'
                    and a.pay_report = '${tOne.PAY_REPORT}'
                    --  where bill_cd =  '${tOne.BILL_CD}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            let tSQL99 = `
                update ksv_bill_mst
                set
                    deposit_amt = '${tOne.DEPOSIT_AMT}',
                    debit_amt = '${tOne.DEBIT_AMT}',
                    discount_amt = '${tOne.DISCOUNT_AMT}',
                    vat_amt = '${tOne.VAT_AMT}',
                    pay_amt = '${tOne.PAY_AMT}',
                    bill_flag = '1',
                    taxbill_cd = '${m_TAXBILL_CD}'
                    -- pay_report = '${tPayReport}'
                where
                    bill_cd = '${tOne.BILL_CD}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            let tSQL99 = `
                update ksv_stock_mem2_stsin
                set
                    bill_flag = '1'
                where
                    bill_cd = '${tOne.BILL_CD}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            // KCD_GW_TAXBILL_KR생성
            let sql0_1 = `
                select
                    isnull(max(taxbill_cd), '') as max_taxbill_cd
                from
                    kcd_gw_taxbill_kr
                where
                    taxbill_cd like 'TAX${tRetDate.substring(2, 4)}-%'
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
            var m_TAXBILL_CD = `TAX${tRetDate.substring(2, 4)}-${tMaxSeqStr}`;

            var wPAY_BANK = tOne.PAY_BANK;
            if (wPAY_BANK === '') wPAY_BANK = m_PAY_BANK;

            let sql0_2 = `
                select
                    *
                from
                    kcd_currency
                where
                    curr_cd = '${tOne.CURR_CD}'
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
                        curr_cd = '${tOne.CURR_CD}'
                        and start_date = (
                            select
                                max(start_date)
                            from
                                kcd_currency
                            where
                                curr_cd = '${tOne.CURR_CD}'
                        )
                `;
                var nRet0_2 = await prisma.$queryRaw(Prisma.raw(sql0_2));
                if (nRet0_2.length > 0)
                    wWonAmt2 = parseFloat(nRet0_2[0].WON_AMT2);
            }

            var wWonAmt = 0;
            var wWonRate = 0;
            if (tOne.CURR_CD === 'KRW') {
                wWonAmt = tOne.PAY_AMT;
                wWonRate = 1;
            } else {
                wWonAmt = parseFloat(tOne.PAY_AMT) * parseFloat(wWonAmt2);
                wWonRate = String(wWonAmt2);
            }

            /*
                      var tTax = parseFloat(tOne.VAT_AMT);
                      var tMinusAmount = parseFloat(tOne.PO_AMT) - parseFloat(tMinus);
                      var tTotAmount = tMinusAmount + tTax;
            */
            var tTaxbillObj = {};
            tTaxbillObj.DOC_NO = tOne.PAY_REPORT;
            tTaxbillObj.VENDOR_CD = tOne.VENDOR_CD;
            tTaxbillObj.CLOSING_DATE = tOne.INVOICE_DATE;
            tTaxbillObj.PAY_DATE = tOne.PAY_DATE;
            tTaxbillObj.CURR_CD = tOne.CURR_CD;
            tTaxbillObj.PUR_APP = tOne.PUR_APP;
            tTaxbillObj.TT_FLAG = tOne.TT_FLAG;
            tTaxbillObj.STATUS_CD = '';
            tTaxbillObj.PUR_FACTORY = tOne.PUR_FACTORY;
            tTaxbillObj.TAX = tOne.VAT_AMT;
            tTaxbillObj.MINUS_AMOUNT = String(tMinusAmount);
            tTaxbillObj.TOT_AMOUNT = String(tTotAmount);
            tTaxbillObj.TAXBILL_DATE = tRetDate1;
            tTaxbillObj.TAXBILL_CD = m_TAXBILL_CD;
            tTaxbillObj.PAY_BANK = wPAY_BANK;
            tTaxbillObj.BILL_CD = tOne.BILL_CD;
            tTaxbillObj.STSIN_CD = '';
            tTaxbillObj.YEAR = tRetDate.substring(0, 4);
            tTaxbillObj.REG_USER = tUserInfo.USER_ID;
            tTaxbillObj.REG_DATETIME = tRetDate;
            tTaxbillObj.APPROKEY = '';
            tTaxbillObj.KRW_AMOUNT = wWonAmt;
            tTaxbillObj.CURR_RATE = wWonRate;
            let tSQL99 = AFLib.createTableSql('KCD_GW_TAXBILL_KR', tTaxbillObj);
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

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
                tObj.CODE = `ERROR:Insert TaxBill Error:${e.message}`;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
        }

        // 재계산
        tIdx = 0;
        var tmpCount = 0;
        // for (tIdx = 0; tIdx < argDatas.length; tIdx ++) {
        for (tIdx = 0; tIdx < tmpCount; tIdx++) {
            var tOne = {
                ...argDatas[tIdx],
            };

            // 금액재계산
            var sql3 = `
                select
                    a.pu_cd,
                    isnull(sum(a.in_qty * b.PO_PRICE), 0) as bill_amt
                from
                    ksv_stock_in a,
                    ksv_stock_mem2 b
                where
                    a.pu_cd in (
                        select distinct
                            pu_cd
                        from
                            ksv_stock_mem2_stsin
                        where
                            bill_cd = '${tOne.BILL_CD}'
                    )
                    and a.pu_cd = b.pu_cd
                    and a.po_cd = b.po_cd
                    and a.matl_cd = b.matl_cd
                    and a.calc_flag = '1'
                group by
                    a.pu_cd
            `;
            var nRet3 = await prisma.$queryRaw(Prisma.raw(sql3));
            var tBillAmt = 0;
            var tIdx9 = 0;
            tSQLArray = [];
            for (tIdx9 = 0; tIdx9 < nRet3.length; tIdx9++) {
                var tOne3 = {
                    ...nRet3[tIdx9],
                };
                var tPuCd = tOne3.pu_cd;
                var tBillAmt = AFLib.numToFixed(parseFloat(tOne3.bill_amt), 2);

                let tSQL99 = `
                    update ksv_pu_mst2
                    set
                        bill_amt = ${tBillAmt}
                    where
                        pu_cd = '${tPuCd}'
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
                tObj.CODE = `ERROR:Sts ${tMessageType}:${e.message}`;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
        }

        var tRetArray = [];
        var tObj = {};
        tObj.CODE = 'SUCCEED:TAXBILL ';
        tObj.id = 0;
        tRetArray.push(tObj);

        return tRetArray;
    }

    async process_taxbill_cancel(argData, contextValue) {
        // End Proc
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
        var tYY = 'B' + yyyy.toString().substring(2) + '-';

        // let tPO = "POA2022S672";
        var tUserInfo = AFLib.getUserInfo(contextValue);

        var tInput = {
            ...argData[0],
        };
        var tInputArray = [...argData];
        var tSQLArray = [];

        var tCheckVendorGW = 0;
        var tCheckPayReport = 0;
        var tCheckCalc = 0;
        var tCheckGW = 0;
        var tCheckBillDate = 0;

        var tIdx = 0;
        for (tIdx = 0; tIdx < tInputArray.length; tIdx++) {
            tSQLArray = [];
            var tOne = {
                ...tInputArray[tIdx],
            };

            if (tOne.BILL_FLAG !== 'O') continue;

            let sql1 = '';
            var nRet1 = '';
            if (!tOne.BILL_CD) {
                let sql1 = `
                    select
                        isnull(approkey, '') as approkey
                    from
                        kcd_gw_taxbill_kr
                    where
                        taxbill_cd = '${tOne.TAXBILL_CD}'
                `;
                nRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
            } else {
                let sql1 = `
                    select
                        isnull(approkey, '') as approkey
                    from
                        kcd_gw_taxbill_kr
                    where
                        bill_cd = '${tOne.BILL_CD}'
                `;
                nRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
            }
            if (nRet1.length > 0 && nRet1[0].approkey !== '') {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE =
                    'ERROR:Cancel TaxBill:상신된 건은 취소할수 없습니다(${nRet1[0].approkey})';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            /*
            let sql1 = `
                select
                    isnull(APPRO_KEY, '') as APPRO_KEY,
                    isnull(GW_STATUS, '') as GW_STATUS,
                    isnull(BILL_FLAG, '') as BILL_FLAG,
                    isnull(PAY_AMT, '0') as PAY_AMT,
                    isnull(BILL_CD, '') as BILL_CD,
                    isnull(ROOT_BILL_CD, '') as ROOT_BILL_CD
                from
                    ksv_bill_mst
                where
                    bill_cd = '${tOne.BILL_CD}'
            `; 
            var nRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
            if (nRet1.length > 0) {
                if (nRet1[0].BILL_FLAG !== '1') {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = 'ERROR:Cancel TaxBill:Taxbill 처리된것만 취소가능합니다';
                    tObj.id = 0; 
                    tRetArray.push(tObj);
                    return (tRetArray);
                }
            }
            */

            // TaxBill 삭제
            if (!tOne.BILL_CD) {
                let tSQL99 = `
                    delete from kcd_gw_taxbill_kr
                    where
                        taxbill_cd = '${tOne.TAXBILL_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            } else {
                let tSQL99 = `
                    delete from kcd_gw_taxbill_kr
                    where
                        taxbill_cd = '${tOne.TAXBILL_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    delete from ksv_bill_mst
                    where
                        taxbill_cd = '${tOne.BILL_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            }

            if (!tOne.BILL_CD) {
                let tSQL99 = `
                    update a
                    set
                        calc_flag = '0',
                        bill_no = ''
                    from
                        ksv_stock_in as a,
                        kcd_matl_mst b,
                        kcd_buyer c,
                        kcd_user d
                    where
                        a.end_date = '${tOne.INVOICE_DATE}'
                        and a.pay_date = '${tOne.PAY_DATE}'
                        and a.in_curr_cd = '${tOne.CURR_CD}'
                        and a.matl_cd = b.matl_cd
                        and left(a.order_cd, 2) = c.buyer_cd
                        and c.reg_user = d.user_id
                        and d.company_code = '${tOne.COMPANY_CODE}'
                        and b.vendor_cd = '${tOne.VENDOR_CD}'
                        and a.pur_factory = '${tOne.PUR_FACTORY}'
                        and a.pur_app = '${tOne.PUR_APP}'
                        and a.tt_flag = '${tOne.TT_FLAG}'
                        -- where stsin_cd in (select distinct stsin_cd from ksv_stock_mem2_stsin where bill_cd =  '${tOne.BILL_CD}')
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            } else {
                let tSQL99 = `
                    update a
                    set
                        bill_no = '' calc_flag = '0',
                        end_flag = '0',
                        end_date = ''
                    from
                        ksv_stock_in as a,
                        kcd_matl_mst b,
                        kcd_buyer c,
                        kcd_user d
                    where
                        a.end_date = '${tOne.INVOICE_DATE}'
                        and a.pay_date = '${tOne.PAY_DATE}'
                        and a.in_curr_cd = '${tOne.CURR_CD}'
                        and a.matl_cd = b.matl_cd
                        and left(a.order_cd, 2) = c.buyer_cd
                        and c.reg_user = d.user_id
                        and d.company_code = '${tOne.COMPANY_CODE}'
                        and b.vendor_cd = '${tOne.VENDOR_CD}'
                        and a.pur_factory = '${tOne.PUR_FACTORY}'
                        and a.pur_app = '${tOne.PUR_APP}'
                        and a.tt_flag = '${tOne.TT_FLAG}'
                        -- where stsin_cd in (select distinct stsin_cd from ksv_stock_mem2_stsin where bill_cd =  '${tOne.BILL_CD}')
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            }

            let tSQL99 = `
                update ksv_stock_in_mst
                set
                    calc_flag = '0',
                    bill_flag = '0',
                    bill_date = '',
                    pur_app = ''
                where
                    stsin_cd in (
                        select distinct
                            stsin_cd
                        from
                            ksv_stock_mem2_stsin
                        where
                            bill_cd = '${tOne.BILL_CD}'
                    )
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            let tSQL99 = `
                update ksv_stock_mem2_stsin
                set
                    bill_flag = '0'
                where
                    bill_cd = '${tOne.BILL_CD}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            let tSQL99 = `
                update a
                set
                    calc_flag = '0'
                from
                    ksv_dc_amount as a
                where
                    a.end_date = '${tOne.INVOICE_DATE}'
                    and a.pay_date = '${tOne.PAY_DATE}'
                    and a.curr_cd = '${tOne.CURR_CD}'
                    and a.vendor_cd = '${tOne.VENDOR_CD}'
                    and a.pur_factory = '${tOne.PUR_FACTORY}'
                    and a.tt_flag = '${tOne.TT_FLAG}'
                    and a.pay_report = '${tOne.PAY_REPORT}'
                    --  where bill_cd =  '${tOne.BILL_CD}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            let tSQL99 = `
                delete from ksv_dc_amount
                where
                    end_date = '${tOne.INVOICE_DATE}'
                    and pay_date = '${tOne.PAY_DATE}'
                    and curr_cd = '${tOne.CURR_CD}'
                    and vendor_cd = '${tOne.VENDOR_CD}'
                    and pur_factory = '${tOne.PUR_FACTORY}'
                    and tt_flag = '${tOne.TT_FLAG}'
                    and pay_report = '${tOne.PAY_REPORT}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

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
                tObj.CODE = 'ERROR:Cancel TaxBill';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
        }

        // 재계산
        tIdx = 0;
        for (tIdx = 0; tIdx < tInputArray.length; tIdx++) {
            var tOne = {
                ...tInputArray[tIdx],
            };

            // 금액재계산
            var sql3 = `
                select
                    a.pu_cd,
                    isnull(sum(a.tot_qty * b.PO_PRICE), 0) as bill_amt
                from
                    ksv_stock_in a,
                    ksv_stock_mem2 b
                where
                    a.pu_cd in (
                        select distinct
                            pu_cd
                        from
                            ksv_stock_mem2_stsin
                        where
                            bill_cd = '${tOne.BILL_CD}'
                    )
                    and a.po_cd = b.po_cd
                    and a.matl_cd = b.matl_cd
                    and a.calc_flag = '1'
                group by
                    a.pu_cd
            `;
            var nRet3 = await prisma.$queryRaw(Prisma.raw(sql3));
            var tBillAmt = 0;
            var tIdx9 = 0;
            tSQLArray = [];
            for (tIdx9 = 0; tIdx9 < nRet3.length; tIdx9++) {
                var tOne3 = {
                    ...nRet3[tIdx9],
                };
                var tPuCd = tOne3.pu_cd;
                var tBillAmt = AFLib.numToFixed(parseFloat(tOne3.bill_amt), 2);

                let tSQL99 = `
                    update ksv_pu_mst2
                    set
                        bill_amt = ${tBillAmt}
                    where
                        pu_cd = '${tPuCd}'
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
                tObj.CODE = `ERROR:Sts ${tMessageType}:${e.message}`;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
        }

        var tRetArray = [];
        var tObj = {};
        tObj.CODE = 'SUCCEED:Cancel TaxBill ';
        tObj.id = 0;
        tRetArray.push(tObj);
        return tRetArray;
    }
}

const moduleMutation_S0423_5 = {
    Mutation: {
        // TaxBill OK
        mgrInsert_S0423_TAXBILL: async (_, args, contextValue) => {
            var tFunc = new S0423_5_COMM();
            var tRetObj = await tFunc.process_taxbill(args.datas, contextValue);

            return tRetObj;
        },

        // TaxBill Cancel
        mgrInsert_S0423_TAXBILL_CANCEL: async (_, args, contextValue) => {
            var tFunc = new S0423_5_COMM();
            var tRetObj = await tFunc.process_taxbill_cancel(
                args.datas,
                contextValue,
            );

            return tRetObj;
        },

        // TaxBill Cancel
        mgrInsert_S0423_BILL_CANCEL: async (_, args, contextValue) => {
            // End Proc
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

            var tInput = {
                ...args.datas[0],
            };
            var tSQLArray = [];

            var tCheckVendorGW = 0;
            var tCheckPayReport = 0;
            var tCheckCalc = 0;
            var tCheckGW = 0;
            var tCheckBillDate = 0;

            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                tSQLArray = [];

                var tOne = {
                    ...args.datas[tIdx],
                };

                if (tOne.BILL_FLAG === 'O') break;

                let sql0 = `
                    select
                        *
                    from
                        ksv_bill_mst
                    where
                        bill_cd = '${tOne.BILL_CD}'
                `;
                var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                if (nRet0.length > 0) {
                    if (nRet0[0].BILL_END_FLAG === '1') {
                        var tRetArray = [];
                        var tObj = {};
                        tObj.CODE = 'ERROR:Cancel Bill:End 된 Bill입니다 ';
                        tObj.id = 0;
                        tRetArray.push(tObj);
                        return tRetArray;
                    }
                } else {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = 'ERROR:Cancel Bill:없는 Bill입니다 ';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }

                let sql1 = `
                    select
                        bill_cd,
                        tax,
                        minus_amount,
                        tot_amount,
                        taxbill_cd,
                        approkey,
                        status_cd,
                        approkey_tax,
                        status_cd_tax
                    from
                        kcd_gw_taxbill_kr
                    where
                        bill_cd = '${tOne.BILL_CD}'
                        and (
                            status_cd in ('1', '2')
                            or status_cd_tax in ('1', '2')
                        )
                `;
                var nRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                if (nRet1.length > 0) {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE =
                        'ERROR:Cancel Bill:상신된 건은 취소할수 없습니다';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }

                /*
                let sql1 = `
                    select
                        isnull(APPRO_KEY, '') as APPRO_KEY,
                        isnull(GW_STATUS, '') as GW_STATUS,
                        isnull(BILL_FLAG, '') as BILL_FLAG,
                        isnull(PAY_AMT, 0) as PAY_AMT,
                        isnull(PAID_AMT, 0) as PAID_AMT
                    from
                        ksv_bill_mst
                    where
                        bill_cd = '${tOne.BILL_CD}'
                `; 
                var nRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                if (nRet1.length > 0) {
                    if (nRet1[0].APPRO_KEY !== '' && tRet1[0].GW_STATUS === '2') {
                        var tRetArray = [];
                        var tObj = {};
                        tObj.CODE = 'ERROR:Cancel TaxBill:상신된 건은 취소할수 없습니다';
                        tObj.id = 0; 
                        tRetArray.push(tObj);
                        return (tRetArray);
                    }
                    if (nRet1[0].BILL_FLAG === 'O') {
                        var tRetArray = [];
                        var tObj = {};
                        tObj.CODE = 'ERROR:Cancel TaxBill:Taxbill 처리된것은 Bill Cancel 할수 없습니다';
                        tObj.id = 0; 
                        tRetArray.push(tObj);
                        return (tRetArray);
                    }
                }
                */

                let tSQL99 = `
                    delete from KSV_BILL_MST
                    where
                        BILL_CD = '${tOne.BILL_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    delete from KCD_GW_TAXBILL_KR
                    where
                        BILL_CD = '${tOne.BILL_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    update ksv_pu_lcdeposit set bill_cd = ''
                    where
                        BILL_CD = '${tOne.BILL_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    update ksv_stock_in_mst
                    set
                        calc_flag = '0',
                        bill_flag = '0',
                        end_flag = '0',
                        bill_date = '',
                        pur_app = ''
                    where
                        stsin_cd in (
                            select distinct
                                stsin_cd
                            from
                                ksv_stock_mem2_stsin
                            where
                                bill_cd = '${tOne.BILL_CD}'
                        )
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    update ksv_stock_mem2_stsin
                    set
                        end_flag = '0',
                        end_date = '',
                        bill_cd = ''
                    where
                        bill_cd = '${tOne.BILL_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    update a
                    set
                        end_flag = '0',
                        end_date = '',
                        pur_factory = '',
                        bill_no = ''
                    from
                        ksv_stock_in as a,
                        kcd_matl_mst b,
                        kcd_buyer c,
                        kcd_user d
                    where
                        a.end_date = '${tOne.INVOICE_DATE}'
                        and a.pay_date = '${tOne.PAY_DATE}'
                        and a.in_curr_cd = '${tOne.CURR_CD}'
                        and a.matl_cd = b.matl_cd
                        and left(a.order_cd, 2) = c.buyer_cd
                        and c.reg_user = d.user_id
                        -- and   d.company_code = '${tOne.COMPANY_CODE}'
                        and b.vendor_cd = '${tOne.VENDOR_CD}'
                        and a.pur_factory = '${tOne.PUR_FACTORY}'
                        -- and   a.pur_app  = '${tOne.PUR_APP}'
                        -- and   a.tt_flag  = '${tOne.TT_FLAG}'
                        and a.bill_no = '${tOne.BILL_CD}'
                        -- where stsin_cd in (select distinct stsin_cd from ksv_stock_mem2_stsin where bill_cd =  '${tOne.BILL_CD}')
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    delete from ksv_dc_amount
                    where
                        end_date = '${tOne.INVOICE_DATE}'
                        and pay_date = '${tOne.PAY_DATE}'
                        and curr_cd = '${tOne.CURR_CD}'
                        and vendor_cd = '${tOne.VENDOR_CD}'
                        and pur_factory = '${tOne.PUR_FACTORY}'
                        and tt_flag = '${tOne.TT_FLAG}'
                        and pay_report = '${tOne.PAY_REPORT}'
                        --  where bill_cd =  '${tOne.BILL_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

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
                    tObj.CODE = 'ERROR:Bill Cancel';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED:Bill Cancel';
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },

        //  DC Update
        mgrUpdate_S0423_UPDATE_DC: async (_, args, contextValue) => {
            // End Proc
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
            var tInput = {
                ...args.datas[0],
            };
            var tSQLArray = [];

            var tCheckVendorGW = 0;
            var tCheckPayReport = 0;
            var tCheckCalc = 0;
            var tCheckGW = 0;
            var tCheckBillDate = 0;

            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                tSQLArray = [];

                var tOne = {
                    ...args.datas[tIdx],
                };

                var tPurFactory = tOne.PUR_FACTORY;
                var tTT_FLAG = '0';
                var tPAY_REPORT = '';
                if (tOne.TAX_KIND_N === 'T/T') tTT_FLAG = '1';

                // if (parseFloat(tOne.DISCOUNT_AMT) <= 0) continue;

                var tSQL = `
                    select
                        isnull(count(*), 0) as t_cnt
                    from
                        ksv_dc_amount
                        -- where bill_cd= '${tOne.BILL_CD}'  
                    where
                        end_date = '${tOne.INVOICE_DATE}'
                        and vendor_cd = '${tOne.VENDOR_CD}'
                        and curr_cd = '${tOne.CURR_CD}'
                        and pay_date = '${tOne.PAY_DATE}'
                        -- and   calc_flag  = '${tOne.CALC_FLAG}'
                        -- and   tt_flag  = '${tTT_FLAG}'
                        -- and   pur_factory  = '${tPurFactory}'
                        -- and   pay_report  = '${tPAY_REPORT}'
                `;
                var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));

                if (
                    nRet0.length <= 0 ||
                    (nRet0.length > 0 && nRet0[0].t_cnt <= 0)
                ) {
                    let tSQL99 = `
                        insert into
                            ksv_dc_amount (
                                end_date,
                                pay_date,
                                vendor_cd,
                                dc_amount,
                                curr_cd,
                                calc_flag,
                                tt_flag,
                                pur_factory,
                                pay_report,
                                stsin_cd,
                                bill_cd
                            )
                        values
                            (
                                '${tOne.INVOICE_DATE}',
                                '${tOne.PAY_DATE}',
                                '${tOne.VENDOR_CD}',
                                '${tOne.DISCOUNT_AMT}',
                                '${tOne.CURR_CD}',
                                '0',
                                '${tTT_FLAG}',
                                '${tPurFactory}',
                                '${tPAY_REPORT}',
                                '',
                                '${tOne.BILL_CD}'
                            )
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                } else {
                    let tSQL99 = `
                        update ksv_dc_amount
                        set
                            dc_amount = '${tOne.DISCOUNT_AMT}',
                            pay_date = '${tOne.PAY_DATE}'
                            -- where stsin_cd = '${tOne.STSIN_CD}'  
                            -- where bill_cd = '${tOne.BILL_CD}'  
                        where
                            end_date = '${tOne.INVOICE_DATE}'
                            and vendor_cd = '${tOne.VENDOR_CD}'
                            and curr_cd = '${tOne.CURR_CD}'
                            and pay_date = '${tOne.PAY_DATE}'
                            -- and   calc_flag  = '${tOne.CALC_FLAG}'
                            -- and   tt_flag  = '${tTT_FLAG}'
                            -- and   pur_factory  = '${tPurFactory}'
                            -- and   pay_report  = '${tPAY_REPORT}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }

                var nRet0 = [];
                var tPayAmt = 0;
                var tPoAmt = 0;
                var tMinusAmt = 0;
                var tTaxAmt = 0;
                if (tOne.BILL_CD) {
                    var tSQL = `
                        select
                            *
                        from
                            ksv_bill_mst
                        where
                            bill_cd = '${tOne.BILL_CD}'
                    `;
                    nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
                    if (nRet0.length > 0) {
                        var tOne2 = {
                            ...nRet0[0],
                        };

                        tPayAmt = parseFloat(tOne2.PAY_AMT);
                        tPoAmt = parseFloat(tOne2.PO_AMT);
                        tTaxAmt = parseFloat(tOne2.VAT_AMT);

                        tMinusAmt = parseFloat(tOne2.DEPOSIT_AMT);
                        tMinusAmt += parseFloat(tOne2.DEBIT_AMT);
                        tMinusAmt += parseFloat(tOne.DISCOUNT_AMT);

                        console.log(
                            `==>(1):${tPoAmt}/${tPoAmt}/${tTaxAmt}/${tMinusAmt}`,
                        );

                        var orgPayAmt = tPoAmt - tMinusAmt;

                        if (tTaxAmt > 0) {
                            tTaxAmt = orgPayAmt * 0.1;
                            tTaxAmt = parseFloat(tTaxAmt).toFixed(2);
                        } else {
                            tTaxAmt = 0;
                        }
                        tPayAmt = tPoAmt - tMinusAmt + parseFloat(tTaxAmt);
                        console.log(
                            `==>(2):${orgPayAmt}/${tPoAmt}/${tTaxAmt}/${tMinusAmt}`,
                        );

                        let tSQL99 = `
                            update ksv_bill_mst
                            set
                                discount_amt = '${tOne.DISCOUNT_AMT}',
                                vat_amt = '${tTaxAmt}',
                                pay_amt = '${tPayAmt}'
                            where
                                bill_cd = '${tOne.BILL_CD}'
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);
                    }
                }

                var tCheck = 0;
                var tTaxBillMst = {};
                if (tOne.BILL_CD) {
                    let sql1 = `
                        select
                            bill_cd,
                            tax,
                            minus_amount,
                            tot_amount,
                            taxbill_cd,
                            approkey,
                            status_cd,
                            approkey_tax,
                            status_cd_tax
                        from
                            kcd_gw_taxbill_kr
                        where
                            bill_cd = '${tOne.BILL_CD}'
                            and (
                                status_cd in ('1', '2')
                                or status_cd_tax in ('1', '2')
                            )
                    `;
                    var nRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                    if (nRet1.length > 0) {
                        var tRetArray = [];
                        var tObj = {};
                        tObj.CODE =
                            'ERROR:Cancel Bill:상신된 건은 Discount 적용할수 없습니다.  GW(Payment), GW(Taxbill) 중 하나에 END/SEND 가 있습니다. 상태를 확인해 주세요';
                        tObj.id = 0;
                        tRetArray.push(tObj);
                        return tRetArray;
                    }
                }

                if (nRet0.length > 0) {
                    let tSQL99 = `
                        update kcd_gw_taxbill_kr
                        set
                            tax = '${tTaxAmt}',
                            minus_amount = '${tMinusAmt}',
                            tot_amount = '${tPayAmt}'
                        where
                            bill_cd = '${tOne.BILL_CD}'
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
                    tObj.CODE = 'ERROR:Update DC';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED:Update DC';
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },

        mgrUpdate_S0423_PAY_DATE: async (_, args, contextValue) => {
            const tNewPayDate = args.pay_date || '';
            if (tNewPayDate === '') {
                return [{ CODE: 'ERROR:Update Pay Date', id: 0 }];
            }

            let tSQLArray = [];

            for (let tIdx = 0; tIdx < args.datas.length; tIdx++) {
                const tOne = { ...args.datas[tIdx] };

                if (!tOne.BILL_CD || tOne.BILL_CD === '') continue;
                if (tOne.PAY_DATE === tNewPayDate) continue;

                const tSQLBill = `
                    update ksv_bill_mst
                    set
                        pay_date = '${tNewPayDate}'
                    where
                        bill_cd = '${tOne.BILL_CD}'
                        and pay_date = '${tOne.PAY_DATE}'
                `;
                tSQLArray.push(prisma.$queryRaw(Prisma.raw(tSQLBill)));

                const tSQLDc = `
                    update ksv_dc_amount
                    set
                        pay_date = '${tNewPayDate}'
                    where
                        end_date = '${tOne.INVOICE_DATE}'
                        and pay_date = '${tOne.PAY_DATE}'
                        and curr_cd = '${tOne.CURR_CD}'
                        and vendor_cd = '${tOne.VENDOR_CD}'
                        and pur_factory = '${tOne.PUR_FACTORY}'
                        and tt_flag = '${tOne.TT_FLAG}'
                        and pay_report = '${tOne.PAY_REPORT}'
                `;
                tSQLArray.push(prisma.$queryRaw(Prisma.raw(tSQLDc)));
            }

            if (tSQLArray.length <= 0) {
                return [{ CODE: 'SUCCEED:Update Pay Date', id: 0 }];
            }

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
            } catch (e) {
                return [{ CODE: `ERROR:Update Pay Date:${e.message}`, id: 0 }];
            }

            return [{ CODE: 'SUCCEED:Update Pay Date', id: 0 }];
        },

        //  DN Update
        mgrUpdate_S0423_UPDATE_DN: async (_, args, contextValue) => {
            // End Proc
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
            var tInput = {
                ...args.datas[0],
            };
            var tInput1 = {
                ...args.datas1,
            };
            var tInput2 = {
                ...args.datas2,
            };
            var tSQLArray = [];

            var tCheckVendorGW = 0;
            var tCheckPayReport = 0;
            var tCheckCalc = 0;
            var tCheckGW = 0;
            var tCheckBillDate = 0;
            var tTT_FLAG = '';
            var tPAY_REPORT = '';
            var tPurFactory = '';

            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                tSQLArray = [];

                var tOne = {
                    ...args.datas[tIdx],
                };

                var tSQL = `
                    select
                        isnull(dn_amount, 0) as dn_amount
                    from
                        ksv_dc_amount
                        -- where bill_cd= '${tOne.BILL_CD}'  
                    where
                        end_date = '${tOne.INVOICE_DATE}'
                        and vendor_cd = '${tOne.VENDOR_CD}'
                        and curr_cd = '${tOne.CURR_CD}'
                        and pay_date = '${tOne.PAY_DATE}'
                        -- and   calc_flag  = '${tOne.CALC_FLAG}'
                        -- and   tt_flag  = '${tTT_FLAG}'
                        -- and   pur_factory  = '${tPurFactory}'
                        -- and   pay_report  = '${tPAY_REPORT}'
                `;
                var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));

                var tTTFlag = '1';
                var tPurFactory = tOne.PUR_FACTORY;
                var tPayReport = '';
                var tStsInCd = '';

                var tDnAmount = 0;
                if (nRet0.length <= 0) {
                    tDnAmount = parseFloat(tInput1.PART_AMT);
                    let tSQL99 = `
                        insert into
                            ksv_dc_amount (
                                end_date,
                                pay_date,
                                vendor_cd,
                                dn_amount,
                                curr_cd,
                                calc_flag,
                                tt_flag,
                                pur_factory,
                                pay_report,
                                stsin_cd,
                                crdb_cd,
                                bill_cd
                            )
                        values
                            (
                                '${tOne.INVOICE_DATE}',
                                '${tInput.PAY_DATE}',
                                '${tInput.VENDOR_CD}',
                                '${tInput1.PART_AMT}',
                                '${tInput.CURR_CD}',
                                '1',
                                '${tTTFlag}',
                                '${tPurFactory}',
                                '${tPayReport}',
                                '${tStsInCd}',
                                '${tInput1.CRDB_CD}',
                                '${tInput.BILL_CD}'
                            )
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                } else {
                    tDnAmount = parseFloat(nRet0[0].dn_amount);
                    tDnAmount += parseFloat(tInput1.PART_AMT);
                    let tSQL99 = `
                        update ksv_dc_amount
                        set
                            dn_amount = ${tDnAmount},
                            pay_date = '${tInput.PAY_DATE}',
                            crdb_cd = crdb_cd + '/${tInput1.CRDB_CD}'
                            -- where bill_cd = '${tInput.BILL_CD}'  
                        where
                            end_date = '${tOne.INVOICE_DATE}'
                            and vendor_cd = '${tOne.VENDOR_CD}'
                            and curr_cd = '${tOne.CURR_CD}'
                            and pay_date = '${tOne.PAY_DATE}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }

                var tSQL = `
                    select
                        isnull(max(crdb_seq), 0) as max_seq
                    from
                        ksv_crdb_mst
                    where
                        crdb_cd = '${tInput1.CRDB_CD}'
                `;
                var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
                var tCRDB_SEQ = nRet0[0].max_seq + 1;

                let tSQL99 = `
                    update ksv_crdb_mst
                    set
                        status_cd = '4',
                        end_date = '${tRetDate1}'
                    where
                        crdb_cd = '${tInput1.CRDB_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                var sqlCheckMem = `
                    select
                        * 
                    from
                        ksv_crdb_mem
                    where
                        crdb_cd = '${tInput1.CRDB_CD}'
                    and end_date = '${tRetDate1}'
                    and ref_no = ''
                    and pre_flag = '0'
                    and end_type = '0'
                `;
                var retCheckMem = await prisma.$queryRaw(Prisma.raw(sqlCheckMem));

                if (retCheckMem.length > 0) {
                    let tSQL99 = `
                        update ksv_crdb_mem set crdb_amt = crdb_amt + ${tInput1.PART_AMT}
                        where
                            crdb_cd = '${tInput1.CRDB_CD}'
                        and end_date = '${tRetDate1}'
                        and ref_no = ''
                        and pre_flag = '0'
                        and end_type = '0'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                } else  {
                    let tSQL99 = `
                        insert into
                            ksv_crdb_mem (
                                crdb_cd,
                                end_date,
                                crdb_amt,
                                ref_no,
                                status_cd,
                                reg_user,
                                reg_datetime
                            )
                        values
                            (
                                '${tInput1.CRDB_CD}',
                                '${tRetDate1}',
                                '${tInput1.PART_AMT}',
                                '',
                                '0',
                                '${tUserInfo.USER_ID}',
                                '${tRetDate1}'
                            )
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }

                if (
                    tInput2.TITLE.includes('Accounting') ||
                    tInput2.TITLE.includes('Commission Settlement')
                ) {
                    if (
                        tInput2.COM_CD === 'FC034' ||
                        tInput2.COM_CD === 'FC044' ||
                        tInput2.COM_CD === '00D' ||
                        tInput2.COM_CD === '00E' ||
                        tInput2.COM_CD === '00G'
                    ) {
                    } else {
                        var tSQL = `
                            select
                                style_cd
                            from
                                kcd_style
                            where
                                left(style_cd, 2) = '00'
                                and buyer_cd = '${tInput2.BUYER_CD}'
                        `;
                        var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
                        var tStyleCd = '';
                        if (nRet0.length <= 0) {
                            var tSQL1 = `
                                select
                                    isnull(max(style_cd), '0') as max_seq
                                from
                                    kcd_style
                                where
                                    left(style_cd, 2) = '00'
                            `;
                            var nRet1 = await prisma.$queryRaw(
                                Prisma.raw(tSQL1),
                            );
                            var tMaxSeq = 1;
                            if (nRet1.length > 0) {
                                var tValStr = nRet1[0].max_seq.replace(/00-/gi, '');
                                tMaxSeq = parseFloat(tValStr) + 1;
                            }

                            tStyleCd = `00-${tMaxSeq}`;
                            var tStyleName = `DEBIT COST-${tInput2.BUYER_CD}`;
                            let tSQL99 = `
                                insert into
                                    kcd_style (
                                        style_cd,
                                        style_name,
                                        buyer_cd,
                                        reg_user,
                                        reg_datetime
                                    )
                                values
                                    (
                                        '${tStyleCd}',
                                        '${tStyleName}',
                                        '${tInput2.BUYER_CD}',
                                        '${tUserInfo.USER_ID}',
                                        '${tRetDate1}'
                                    )
                            `;
                            const tSQL99_1 = prisma.$queryRaw(
                                Prisma.raw(tSQL99),
                            );
                            tSQLArray.push(tSQL99_1);
                        } else {
                            tStyleCd = nRet0[0].style_cd;
                        }

                        var tYYYY = tRetDate.substring(0, 4);
                        var tYY = tRetDate.substring(2, 4);

                        var tSQL2 = `
                            select
                                isnull(max(seq), 0) as max_seq
                            from
                                kzz_debit_cost
                            where
                                yy = '${tYYYY}'
                                and buyer_cd = '${tInput2.BUYER_CD}'
                        `;
                        var nRet2 = await prisma.$queryRaw(Prisma.raw(tSQL2));
                        var tMaxSeq2 = nRet2[0].max_seq + 1;
                        var tMaxSeqStr = AFLib.printF(tMaxSeq2, 4);
                        var tDebitCd = `${tInput2.BUYER_CD}${tYY}-V${tMaxSeqStr}`;

                        let tSQL99 = `
                            insert into
                                kzz_debit_cost (
                                    debit_cd,
                                    seq,
                                    yy,
                                    crdb_cd,
                                    style_cd,
                                    buyer_cd,
                                    debit_amount,
                                    curr_cd,
                                    factory_cd,
                                    remark,
                                    end_flag,
                                    reg_user,
                                    reg_datetime,
                                    end_date
                                )
                            values
                                (
                                    '${tDebitCd}',
                                    '${tYYYY}',
                                    '${tMaxSeq2}',
                                    '${tInput1.CRDB_CD}',
                                    '${tStyleCd}',
                                    '${tInput2.BUYER_CD}',
                                    '${tInput1.PART_AMT}',
                                    '${tInput2.CURR_CD}',
                                    'FC010',
                                    '${tInput2.REMARK}',
                                    '0',
                                    '${tUserInfo.USER_ID}',
                                    '${tRetDate}',
                                    '${tInput2.END_DATE}'
                                )
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);
                    }
                } else {
                    if (
                        tInput2.COM_CD === '00D' ||
                        tInput2.COM_CD === '00E' ||
                        tInput2.COM_CD === '00G'
                    ) {
                    } else {
                        var tSQL = `
                            select
                                style_cd
                            from
                                kcd_style
                            where
                                left(style_cd, 2) = '00'
                                and buyer_cd = '${tInput2.BUYER_CD}'
                        `;
                        var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
                        var tStyleCd = '';
                        if (nRet0.length <= 0) {
                            var tSQL1 = `
                                select
                                    isnull(max(style_cd), '0') as max_seq
                                from
                                    kcd_style
                                where
                                    left(style_cd, 2) = '00'
                            `;
                            var nRet1 = await prisma.$queryRaw(
                                Prisma.raw(tSQL1),
                            );
                            var tMaxSeq = 1;
                            if (nRet1.length > 0) {
                                var tValStr = nRet1[0].max_seq.replace(/00-/gi, '');
                                tMaxSeq = parseFloat(tValStr) + 1;
                            }

                            tStyleCd = `00-${tMaxSeq}`;
                            var tStyleName = `DEBIT COST-${tInput2.BUYER_CD}`;
                            let tSQL99 = `
                                insert into
                                    kcd_style (
                                        style_cd,
                                        style_name,
                                        buyer_cd,
                                        reg_user,
                                        reg_datetime
                                    )
                                values
                                    (
                                        '${tStyleCd}',
                                        '${tStyleName}',
                                        '${tInput2.BUYER_CD}',
                                        '${tUserInfo.USER_ID}',
                                        '${tRetDate1}'
                                    )
                            `;
                            const tSQL99_1 = prisma.$queryRaw(
                                Prisma.raw(tSQL99),
                            );
                            tSQLArray.push(tSQL99_1);
                        } else {
                            tStyleCd = nRet0[0].style_cd;
                        }

                        var tYYYY = tRetDate.substring(0, 4);
                        var tYY = tRetDate.substring(2, 4);

                        var tSQL2 = `
                            select
                                isnull(max(seq), 0) as max_seq
                            from
                                kzz_debit_cost
                            where
                                yy = '${tYYYY}'
                                and buyer_cd = '${tInput2.BUYER_CD}'
                        `;
                        var nRet2 = await prisma.$queryRaw(Prisma.raw(tSQL2));
                        var tMaxSeq2 = 1;
                        var tMaxSeqStr = AFLib.printF(tMaxSeq2, 4);
                        if (nRet2.length > 0) {
                            tMaxSeq2 = nRet2[0].max_seq + 1;
                            tMaxSeqStr = AFLib.printF(tMaxSeq2, 4);
                        }
                        var tDebitCd = `${tInput2.BUYER_CD}${tYY}-V${tMaxSeqStr}`;

                        let tSQL99 = `
                            insert into
                                kzz_debit_cost (
                                    debit_cd,
                                    seq,
                                    yy,
                                    crdb_cd,
                                    style_cd,
                                    buyer_cd,
                                    debit_amount,
                                    curr_cd,
                                    factory_cd,
                                    remark,
                                    end_flag,
                                    reg_user,
                                    reg_datetime,
                                    end_date
                                )
                            values
                                (
                                    '${tDebitCd}',
                                    '${tYYYY}',
                                    '${tMaxSeq2}',
                                    '${tInput1.CRDB_CD}',
                                    '${tStyleCd}',
                                    '${tInput2.BUYER_CD}',
                                    '${tInput1.PART_AMT}',
                                    '${tInput2.CURR_CD}',
                                    'FC010',
                                    '${tInput2.REMARK}',
                                    '0',
                                    '${tUserInfo.USER_ID}',
                                    '${tRetDate}',
                                    '${tInput2.END_DATE}'
                                )
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        // tSQLArray.push(tSQL99_1);
                    }
                }

                var tSQL = `
                    select
                        *
                    from
                        ksv_bill_mst
                    where
                        bill_cd = '${tInput.BILL_CD}'
                `;
                var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
                var tPayAmt = 0;
                var tPoAmt = 0;
                var tMinusAmt = 0;
                var tTaxAmt = 0;

                if (nRet0.length > 0) {

                    tDnAmount =  parseFloat(nRet0[0].DEBIT_AMT) + parseFloat(tInput1.PART_AMT);

                    var tOne2 = {
                        ...nRet0[0],
                    };

                    tPayAmt = parseFloat(tOne2.PAY_AMT);
                    tPoAmt = parseFloat(tOne2.PO_AMT);
                    tTaxAmt = parseFloat(tOne2.VAT_AMT);

                    tOne2.DEBIT_AMT = tDnAmount;

                    tMinusAmt = parseFloat(tOne2.DEPOSIT_AMT);
                    tMinusAmt += parseFloat(tOne2.DISCOUNT_AMT);
                    tMinusAmt += parseFloat(tOne2.DEBIT_AMT);

                    tPayAmt = tPoAmt - tMinusAmt + tTaxAmt;

                    let tSQL99 = `
                        update ksv_bill_mst
                        set
                            debit_amt = '${tOne2.DEBIT_AMT}',
                            pay_amt = '${tPayAmt}'
                        where
                            bill_cd = '${tInput.BILL_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                } else {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE =
                        'ERROR:Update DN:잘못된 BILL#입니다';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }

                let sql1 = `
                    select
                        bill_cd,
                        tax,
                        minus_amount,
                        tot_amount,
                        taxbill_cd,
                        approkey,
                        status_cd,
                        approkey_tax,
                        status_cd_tax
                    from
                        kcd_gw_taxbill_kr
                    where
                        bill_cd = '${tInput.BILL_CD}'
                        and (
                            status_cd in ('1', '2')
                            or status_cd_tax in ('1', '2')
                        )
                `;
                var nRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                if (nRet1.length > 0) {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE =
                        'ERROR:Update DN:상신된 건은 취소할수 없습니다';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }

                if (nRet0.length > 0) {
                    let tSQL99 = `
                        update kcd_gw_taxbill_kr
                        set
                            minus_amount = '${tMinusAmt}',
                            tot_amount = '${tPayAmt}'
                        where
                            bill_cd = '${tInput.BILL_CD}'
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
                    tObj.CODE = 'ERROR:Update DN';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED:Update DN';
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },

        //  DN Update  - Cancel
        mgrDelete_S0423_DELETE_DN: async (_, args, contextValue) => {
            // End Proc
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

            var tInput = {
                ...args.datas[0],
            };
            var tInput1 = {
                ...args.datas1,
            };
            var tInput2 = {
                ...args.datas2,
            };
            var tSQLArray = [];

            var tCheckVendorGW = 0;
            var tCheckPayReport = 0;
            var tCheckCalc = 0;
            var tCheckGW = 0;
            var tCheckBillDate = 0;

            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                tSQLArray = [];

                var tOne = {
                    ...args.datas[tIdx],
                };

                let tSQL99 = `
                    update ksv_dc_amount
                    set
                        dn_amount = dn_amount - ${tOne.DEBIT_AMT},
                        pay_date = '',
                        crdb_cd = ''
                    where
                        bill_cd = '${tInput.BILL_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    update ksv_crdb_mst
                    set
                        status_cd = '0',
                        end_date = ''
                    where
                        crdb_cd = '${tInput1.CRDB_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    delete from ksv_crdb_mem
                    where
                        crdb_cd = '${tInput1.CRDB_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    delete from kzz_debit_cost
                    where
                        crdb_cd = '${tInput1.CRDB_CD}'
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
                tObj.CODE = 'ERROR:Delete DN';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED:Delete DN';
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },

        //  GW (국내자재)
        mgrUpdate_S0423_GW: async (_, args, contextValue) => {
            // End Proc
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

            // BILL OK 선행
            var tBillOkArray = [];
            var tIdx = 0;
            /*
            for (tIdx = 0; tIdx < args.datas.length; tIdx ++) {
                var tObj = { ...args.datas[tIdx] };
                if (tObj.BILL_FLAG === 'X') { 
                    tBillOkArray.push(tObj);
                }
            }
            if (tBillOkArray.length > 0) {
                var tFunc = new S0423_5_COMM();
                var tRetObj = await tFunc.process_taxbill(tBillOkArray, contextValue);
                if (tRetObj[0].CODE.includes('SUCC')) ;
                else {
                    return (tRetObj);
                }
            }
            */

            var tInput = {
                ...args.datas[0],
            };
            var tSQLArray = [];

            var tCheckVendorGW = 0;
            var tCheckPayReport = 0;
            var tCheckCalc = 0;
            var tCheckGW = 0;
            var tCheckBillDate = 0;
            var tCheckDcAmount = 0;

            var tPayDateArray = [];
            tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var tCol = {
                    ...args.datas[tIdx],
                };
                var tFlag = 0;
                var tIdx1 = 0;
                if (tCol.BILL_FLAG !== 'O') tCheckCalc += 1;
                for (tIdx1 = 0; tIdx1 < tPayDateArray.length; tIdx1++) {
                    if (tPayDateArray[tIdx1] === tCol.PAY_DATE) {
                        tFlag = 1;
                        break;
                    }
                }
                if (tFlag === 0) tPayDateArray.push(tCol.PAY_DATE);

                /* WON.2601 */
                var sql100 = `
                    select
                        isnull(sum(dc_amount), 0) as dc_amount
                    from
                        ksv_dc_amount
                    where
                        end_date = '${tCol.INVOICE_DATE}'
                        and vendor_cd = '${tCol.VENDOR_CD}'
                        and curr_cd = '${tCol.CURR_CD}'
                        and pay_date = '${tCol.PAY_DATE}'
                `;
                var ret100 = await prisma.$queryRaw(Prisma.raw(sql100));
                var tDcAmount = 0;
                if (ret100.length > 0) {
                    tDcAmount = parseFloat(ret100[0].dc_amount);
                }
                if (tDcAmount < parseFloat(tCol.DISCOUNT_AMT))
                    tCheckDcAmount = 1;
            }

            /*
            if (tCheckDcAmount > 0) {
                   var tRetArray = [];
                   var tObj = {};
                   tObj.CODE = 'ERROR:Discount Amt가 틀립니다. DC APPLY을 처리한후 진행하십시요. ';
                   tObj.id = 0; 
                   tRetArray.push(tObj);
                   return (tRetArray);
            }
            */

            /*
            if (tCheckCalc > 0) {
                   var tRetArray = [];
                   var tObj = {};
                   tObj.CODE = 'ERROR:Bill Ok된것만 상신가능합니다 ';
                   tObj.id = 0; 
                   tRetArray.push(tObj);
                   return (tRetArray);
            }
            */

            if (tPayDateArray.length > 2) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Pay Date는 두개까지만 가능합니다';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tYear = tRetDate.substring(0, 4);

            var tAppKey = '';
            tAppKey = 'DM' + tRetDate;

            /*
            0                    NEW       
            1                    상신   
            2                    종결
            3                    반려  
            4                    상신취소   
            5                    삭제                                
            */

            var tIdx1 = 0;
            for (tIdx1 = 0; tIdx1 < args.datas.length; tIdx1++) {
                tSQLArray = [];

                var m_TAXBILL_CD = '';
                var tOne = {
                    ...args.datas[tIdx1],
                };
                var tRet0 = [];
                var billObj = {};

                if (tOne.BILL_CD) {
                    var tSQL = `
                        select
                            *
                        from
                            ksv_bill_mst
                        where
                            bill_cd = '${tOne.BILL_CD}'
                    `;
                    var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
                    if (nRet0.length > 0) {
                        billObj = { ...nRet0[0] };
                        m_TAXBILL_CD = billObj.TAXBILL_CD;
                    }
                }

                let sql0_9 = `
                    select
                        *
                    from
                        kcd_currency
                    where
                        curr_cd = '${billObj.CURR_CD}'
                        and start_date = '${tRetDate1}'
                `;
                var nRet0_9 = await prisma.$queryRaw(Prisma.raw(sql0_9));
                var wWonAmt2 = 0;
                if (nRet0_9.length > 0)
                    wWonAmt2 = parseFloat(nRet0_9[0].WON_AMT2);
                else {
                    let sql0_9 = `
                        select
                            *
                        from
                            kcd_currency
                        where
                            curr_cd = '${billObj.CURR_CD}'
                            and start_date = (
                                select
                                    max(start_date)
                                from
                                    kcd_currency
                                where
                                    curr_cd = '${billObj.CURR_CD}'
                            )
                    `;
                    var nRet0_9 = await prisma.$queryRaw(Prisma.raw(sql0_9));
                    if (nRet0_9.length > 0)
                        wWonAmt2 = parseFloat(nRet0_9[0].WON_AMT2);
                }

                let sql0_1 = `
                    select
                        isnull(max(taxbill_cd), '') as max_taxbill_cd
                    from
                        kcd_gw_taxbill_kr
                    where
                        taxbill_cd like 'TAX${tRetDate.substring(2, 4)}-%'
                `;
                var nRet0_1 = await prisma.$queryRaw(Prisma.raw(sql0_1));
                var tMaxSeq = 1;
                if (nRet0_1.length > 0) {
                    if (nRet0_1[0].max_taxbill_cd === '') tMaxSeq = 1;
                    else
                        tMaxSeq =
                            parseInt(
                                nRet0_1[0].max_taxbill_cd.substring(6, 12),
                            ) + 1;
                }
                var tMaxSeqStr = AFLib.printF(tMaxSeq, 6);
                var max_TAXBILL_CD = `TAX${tRetDate.substring(2, 4)}-${tMaxSeqStr}`;
                if (!m_TAXBILL_CD) m_TAXBILL_CD = max_TAXBILL_CD;

                var tPurApp = 'X';
                var tTTFlag = '0';

                if (tOne.TAX_KIND === '1' || tOne.TAX_KIND === '10') {
                    // 과세
                    tPurApp = 'X';
                    tTTFlag = '0';
                } else if (tOne.TAX_KIND === '2') {
                    // 영세
                    tPurApp = 'X';
                    tTTFlag = '0';
                } else if (tOne.TAX_KIND === '3') {
                    // 면세
                    tPurApp = 'O';
                    tTTFlag = '0';
                } else if (tOne.TAX_KIND === '4') {
                    // TT
                    tPurApp = 'O';
                    tTTFlag = '1';
                } else if (tOne.TAX_KIND === '8') {
                    // TT
                    tPurApp = 'X';
                    tTTFlag = '0';
                }

                var tTotRate =
                    (parseFloat(tOne.IN_PAY_AMT) + parseFloat(tOne.PAID_AMT)) /
                    parseFloat(tOne.PAY_AMT);

                var tRate =
                    parseFloat(tOne.IN_PAY_AMT) / parseFloat(tOne.PAY_AMT);
                console.log(`====> tTotRate: ${tRate}`);
                console.log(`====> tRate: ${tRate}`);
                var tVatAmt = AFLib.numToFixed(
                    parseFloat(tOne.VAT_AMT) * tRate,
                    2,
                );
                var tPayAmt = AFLib.numToFixed(
                    parseFloat(tOne.PAY_AMT) * tRate,
                    2,
                );
                var tMinusAmt = tPayAmt - tVatAmt;

                var wWonAmt = 0;
                var wWonRate = 0;
                if (billObj.CURR_CD === 'KRW') {
                    wWonAmt = AFLib.numToFixed(
                        parseFloat(tPayAmt) * parseFloat(wWonAmt2),
                        2,
                    );
                    wWonRate = 1;
                } else {
                    wWonAmt = AFLib.numToFixed(
                        parseFloat(tPayAmt) * parseFloat(wWonAmt2),
                        2,
                    );
                    wWonRate = String(AFLib.numToFixed(wWonAmt2, 4));
                }

                let sql0_2_bak = `
                    select
                        *
                    from
                        kcd_gw_taxbill_kr
                    where
                        bill_cd = '${tOne.BILL_CD}'
                        -- where taxbill_cd = '${m_TAXBILL_CD}'
                        -- and   (approkey is null or approkey = '')
                `;

                var nRet0_2 = [];
                if (tOne.TAXBILL_CD) {
                    let sql0_2 = `
                        select
                            *
                        from
                            kcd_gw_taxbill_kr
                        where
                            taxbill_cd = '${tOne.TAXBILL_CD}'
                    `;
                    nRet0_2 = await prisma.$queryRaw(Prisma.raw(sql0_2));
                    m_TAXBILL_CD = tOne.TAXBILL_CD;
                } else {
                    nRet0_2 = [];
                }
                // if (nRet0_2.length <= 0 || !billObj.TAXBILL_CD) {
                if (nRet0_2.length <= 0) {
                    if (billObj.SAVE_TAXBILL) {
                        var tmpObj = JSON.parse(billObj.SAVE_TAXBILL);
                        var tTaxbillObj = {};
                        tTaxbillObj.DOC_NO = tmpObj.DOC_NO;
                        tTaxbillObj.VENDOR_CD = tmpObj.VENDOR_CD;
                        tTaxbillObj.CLOSING_DATE = tmpObj.CLOSING_DATE;
                        // tTaxbillObj.PAY_DATE = tmpObj.PAY_DATE;
                        tTaxbillObj.PAY_DATE = tOne.PAY_DATE;
                        tTaxbillObj.CURR_CD = tmpObj.CURR_CD;
                        tTaxbillObj.PUR_APP = tmpObj.PUR_APP;
                        tTaxbillObj.TT_FLAG = tmpObj.TT_FLAG;
                        tTaxbillObj.STATUS_CD = tmpObj.STATUS_CD;
                        tTaxbillObj.PUR_FACTORY = tmpObj.PUR_FACTORY;
                        tTaxbillObj.TAX = tmpObj.TAX;
                        tTaxbillObj.MINUS_AMOUNT = tmpObj.MINUS_AMOUNT;
                        tTaxbillObj.TOT_AMOUNT = tmpObj.TOT_AMOUNT;
                        tTaxbillObj.TAXBILL_DATE = tRetDate1;
                        tTaxbillObj.TAXBILL_CD = m_TAXBILL_CD;
                        tTaxbillObj.PAY_BANK = tmpObj.PAY_BANK;
                        tTaxbillObj.BILL_CD = tOne.BILL_CD;
                        tTaxbillObj.STSIN_CD = '';
                        tTaxbillObj.YEAR = tRetDate.substring(0, 4);
                        tTaxbillObj.REG_USER = tUserInfo.USER_ID;
                        tTaxbillObj.REG_DATETIME = tRetDate;
                        tTaxbillObj.APPROKEY = tmpObj.APPROKEY;
                        tTaxbillObj.KRW_AMOUNT = tmpObj.KRW_AMOUNT;
                        tTaxbillObj.CURR_RATE = tmpObj.CURR_RATE;
                        let tSQL99 = AFLib.createTableSql(
                            'KCD_GW_TAXBILL_KR',
                            tTaxbillObj,
                        );
                        const tSQL99_1 = await prisma.$queryRaw(
                            Prisma.raw(tSQL99),
                        );
                    } else {
                        var tTaxbillObj = {};
                        tTaxbillObj.DOC_NO = billObj.PAY_REPORT;
                        tTaxbillObj.VENDOR_CD = billObj.VENDOR_CD;
                        tTaxbillObj.CLOSING_DATE = billObj.INVOICE_DATE;
                        // tTaxbillObj.PAY_DATE = billObj.PAY_DATE;
                        tTaxbillObj.PAY_DATE = tOne.PAY_DATE;
                        tTaxbillObj.CURR_CD = billObj.CURR_CD;
                        tTaxbillObj.PUR_APP = tPurApp;
                        tTaxbillObj.TT_FLAG = tTTFlag;
                        tTaxbillObj.STATUS_CD = '';
                        tTaxbillObj.PUR_FACTORY = billObj.PUR_FACTORY;
                        tTaxbillObj.TAX = tVatAmt;
                        tTaxbillObj.MINUS_AMOUNT = tMinusAmt;
                        tTaxbillObj.TOT_AMOUNT = tPayAmt;
                        tTaxbillObj.TAXBILL_DATE = tRetDate1;
                        tTaxbillObj.TAXBILL_CD = m_TAXBILL_CD;
                        tTaxbillObj.PAY_BANK = billObj.PAY_BANK;
                        tTaxbillObj.BILL_CD = billObj.BILL_CD;
                        tTaxbillObj.STSIN_CD = '';
                        tTaxbillObj.YEAR = tRetDate.substring(0, 4);
                        tTaxbillObj.REG_USER = tUserInfo.USER_ID;
                        tTaxbillObj.REG_DATETIME = tRetDate;
                        tTaxbillObj.APPROKEY = '';
                        tTaxbillObj.KRW_AMOUNT = wWonAmt;
                        tTaxbillObj.CURR_RATE = wWonRate;
                        let tSQL99 = AFLib.createTableSql(
                            'KCD_GW_TAXBILL_KR',
                            tTaxbillObj,
                        );
                        const tSQL99_1 = await prisma.$queryRaw(
                            Prisma.raw(tSQL99),
                        );
                    }

                    let sql0_2 = `
                        select
                            *
                        from
                            kcd_gw_taxbill_kr
                        where
                            taxbill_cd = '${m_TAXBILL_CD}'
                    `;
                    nRet0_2 = await prisma.$queryRaw(Prisma.raw(sql0_2));
                }

                console.log(
                    `Find kcd_gw_taxbill_kr:${m_TAXBILL_CD}:${nRet0_2.length}`,
                );
                if (tTotRate < 1) {
                    var tTaxbillObj = {
                        ...nRet0_2[0],
                    };
                    delete tTaxbillObj.id;
                    tTaxbillObj.TAX = tVatAmt;
                    tTaxbillObj.MINUS_AMOUNT = tMinusAmt;
                    tTaxbillObj.TOT_AMOUNT = tPayAmt;
                    tTaxbillObj.TAXBILL_DATE = tRetDate1;
                    tTaxbillObj.TAXBILL_CD = max_TAXBILL_CD;
                    tTaxbillObj.YEAR = tRetDate.substring(0, 4);
                    tTaxbillObj.REG_USER = tUserInfo.USER_ID;
                    tTaxbillObj.REG_DATETIME = tRetDate;
                    tTaxbillObj.KRW_AMOUNT = '0';
                    tTaxbillObj.CURR_RATE = '0';
                    tTaxbillObj.APPROKEY = tOne.APPROKEY;
                    /*
                    tTaxbillObj.DOC_NO = tOne.PAY_REPORT; 
                    tTaxbillObj.VENDOR_CD = tOne.VENDOR_CD; 
                    tTaxbillObj.CLOSING_DATE = tOne.INVOICE_DATE; 
                    tTaxbillObj.PAY_DATE = tOne.PAY_DATE;
                    tTaxbillObj.CURR_CD = tOne.CURR_CD; 
                    tTaxbillObj.PUR_APP = tPurApp; 
                    tTaxbillObj.TT_FLAG = tTTFlag;
                    tTaxbillObj.STATUS_CD =  '6';
                    tTaxbillObj.PUR_FACTORY =  tOne.PUR_FACTORY;
                    tTaxbillObj.PAY_BANK = tOne.PAY_BANK;
                    tTaxbillObj.BILL_CD = tOne.BILL_CD;
                    tTaxbillObj.STSIN_CD = '';
                    tTaxbillObj.KRW_AMOUNT = '0';
                    tTaxbillObj.CURR_RATE = '0';
                    */
                    let tSQL99 = AFLib.createTableSql(
                        'KCD_GW_TAXBILL_KR',
                        tTaxbillObj,
                    );
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                } else {
                    let tSQL99 = `
                        update KCD_GW_TAXBILL_KR
                        set
                            APPROKEY = '${tOne.APPROKEY}',
                            REG_USER = '${tUserInfo.USER_ID}',
                            REG_DATETIME = '${tRetDate}',
                            YEAR = '${tYear}',
                            STATUS_CD = '6',
                            TAX = '${tVatAmt}',
                            MINUS_AMOUNT = '${tMinusAmt}',
                            TOT_AMOUNT = '${tPayAmt}',
                            TAXBILL_DATE = '${tRetDate1}'
                        where
                            taxbill_cd = '${m_TAXBILL_CD}'
                            and (
                                (
                                    approkey is null
                                    or approkey = ''
                                )
                                or (
                                    status_cd <> '1'
                                    and status_cd <> '2'
                                )
                            )
                            -- where BILL_CD = '${tOne.BILL_CD}' 
                            --   and taxbill_cd = '${m_TAXBILL_CD}'
                            --   and (approkey is null or approkey = '')
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }

                if (tOne.BILL_CD) {
                    let tSQL99 = `
                        update KSV_BILL_MST
                        set
                            APPRO_KEY = '${tOne.APPROKEY}',
                            PAY_DATE = '${tOne.PAY_DATE}',
                            GW_STATUS = '6'
                        where
                            BILL_CD = '${tOne.BILL_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }

                if (tOne.BILL_CD) {
                    let tSQL99 = `
                        update KSV_STOCK_IN
                        set
                            CALC_FLAG = '1'
                        where
                            BILL_NO = '${tOne.BILL_CD}'
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
                    tObj.CODE = 'ERROR:Cancel TaxBill Error';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED:GW Return:';
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },

        mgrUpdate_S0423_GW_TAXBILL: async (_, args, contextValue) => {
            // End Proc
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

            // BILL OK 선행
            var tBillOkArray = [];
            var tIdx = 0;

            var tInput = {
                ...args.datas[0],
            };
            var tSQLArray = [];

            var tCheckVendorGW = 0;
            var tCheckPayReport = 0;
            var tCheckCalc = 0;
            var tCheckGW = 0;
            var tCheckBillDate = 0;
            var tCheckDcAmount = 0;

            var tPayDateArray = [];
            tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var tCol = {
                    ...args.datas[tIdx],
                };
                var tFlag = 0;
                var tIdx1 = 0;
                if (tCol.BILL_FLAG !== 'O') tCheckCalc += 1;
                for (tIdx1 = 0; tIdx1 < tPayDateArray.length; tIdx1++) {
                    if (tPayDateArray[tIdx1] === tCol.PAY_DATE) {
                        tFlag = 1;
                        break;
                    }
                }
                if (tFlag === 0) tPayDateArray.push(tCol.PAY_DATE);

                /* WON.2601 */
                var sql100 = `
                    select
                        isnull(sum(dc_amount), 0) as dc_amount
                    from
                        ksv_dc_amount
                    where
                        end_date = '${tCol.INVOICE_DATE}'
                        and vendor_cd = '${tCol.VENDOR_CD}'
                        and curr_cd = '${tCol.CURR_CD}'
                        and pay_date = '${tCol.PAY_DATE}'
                `;
                var ret100 = await prisma.$queryRaw(Prisma.raw(sql100));
                var tDcAmount = 0;
                if (ret100.length > 0) {
                    tDcAmount = parseFloat(ret100[0].dc_amount);
                }
                if (tDcAmount < parseFloat(tCol.DISCOUNT_AMT))
                    tCheckDcAmount = 1;
            }

            /*
            if (tCheckDcAmount > 0) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Dc Amount가 틀립니다. DC Apply후에 진행하십시요';
                tObj.id = 0;
                tRetArray.push(tObj);
                return (tRetArray);
            }
            */

            if (tPayDateArray.length > 2) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Pay Date는 두개까지만 가능합니다';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tYear = tRetDate.substring(0, 4);

            var tAppKey = '';
            tAppKey = 'DT' + tRetDate;

            /*
            0                    NEW       
            1                    상신   
            2                    종결
            3                    반려  
            4                    상신취소   
            5                    삭제                                
            */

            var tIdx1 = 0;
            for (tIdx1 = 0; tIdx1 < args.datas.length; tIdx1++) {
                tSQLArray = [];

                var tOne = {
                    ...args.datas[tIdx1],
                };

                var sql200 = `
                    select
                        *
                    from
                        kcd_gw_taxbill_kr
                    where
                        taxbill_cd = '${tOne.TAXBILL_CD}'
                `;
                var ret200 = await prisma.$queryRaw(Prisma.raw(sql200));
                if (ret200.length > 0) {
                    let tSQL99 = `
                        update KCD_GW_TAXBILL_KR
                        set
                            APPROKEY_TAX = '${tOne.APPROKEY_TAXBILL}',
                            STATUS_CD_TAX = '6'
                        where
                            taxbill_cd = '${tOne.TAXBILL_CD}'
                            and (
                                (
                                    approkey_tax is null
                                    or approkey_tax = ''
                                )
                                or (
                                    status_cd_tax <> '1'
                                    and status_cd_tax <> '2'
                                )
                            )
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    if (tOne.BILL_CD) {
                        let tSQL99 = `
                            update KSV_BILL_MST
                            set
                                APPRO_KEY_TAX = '${tOne.APPROKEY_TAXBILL}',
                                GW_STATUS_TAX = '6'
                            where
                                BILL_CD = '${tOne.BILL_CD}'
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);
                    }
                } else {
                    var m_TAXBILL_CD = '';
                    var tRet0 = [];
                    var billObj = {};

                    if (tOne.BILL_CD) {
                        var tSQL = `
                            select
                                *
                            from
                                ksv_bill_mst
                            where
                                bill_cd = '${tOne.BILL_CD}'
                        `;
                        var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
                        if (nRet0.length > 0) {
                            billObj = { ...nRet0[0] };
                            m_TAXBILL_CD = billObj.TAXBILL_CD;
                        }
                    }

                    let sql0_9 = `
                        select
                            *
                        from
                            kcd_currency
                        where
                            curr_cd = '${billObj.CURR_CD}'
                            and start_date = '${tRetDate1}'
                    `;
                    var nRet0_9 = await prisma.$queryRaw(Prisma.raw(sql0_9));
                    var wWonAmt2 = 0;
                    if (nRet0_9.length > 0)
                        wWonAmt2 = parseFloat(nRet0_9[0].WON_AMT2);
                    else {
                        let sql0_9 = `
                            select
                                *
                            from
                                kcd_currency
                            where
                                curr_cd = '${billObj.CURR_CD}'
                                and start_date = (
                                    select
                                        max(start_date)
                                    from
                                        kcd_currency
                                    where
                                        curr_cd = '${billObj.CURR_CD}'
                                )
                        `;
                        var nRet0_9 = await prisma.$queryRaw(
                            Prisma.raw(sql0_9),
                        );
                        if (nRet0_9.length > 0)
                            wWonAmt2 = parseFloat(nRet0_9[0].WON_AMT2);
                    }

                    let sql0_1 = `
                        select
                            isnull(max(taxbill_cd), '') as max_taxbill_cd
                        from
                            kcd_gw_taxbill_kr
                        where
                            taxbill_cd like 'TAX${tRetDate.substring(2, 4)}-%'
                    `;
                    var nRet0_1 = await prisma.$queryRaw(Prisma.raw(sql0_1));
                    var tMaxSeq = 1;
                    if (nRet0_1.length > 0) {
                        if (nRet0_1[0].max_taxbill_cd === '') tMaxSeq = 1;
                        else
                            tMaxSeq =
                                parseInt(
                                    nRet0_1[0].max_taxbill_cd.substring(6, 12),
                                ) + 1;
                    }
                    var tMaxSeqStr = AFLib.printF(tMaxSeq, 6);
                    var max_TAXBILL_CD = `TAX${tRetDate.substring(2, 4)}-${tMaxSeqStr}`;
                    if (!m_TAXBILL_CD) m_TAXBILL_CD = max_TAXBILL_CD;

                    var tPurApp = 'X';
                    var tTTFlag = '0';

                    if (tOne.TAX_KIND === '1' || tOne.TAX_KIND === '10') {
                        // 과세
                        tPurApp = 'X';
                        tTTFlag = '0';
                    } else if (tOne.TAX_KIND === '2') {
                        // 영세
                        tPurApp = 'X';
                        tTTFlag = '0';
                    } else if (tOne.TAX_KIND === '3') {
                        // 면세
                        tPurApp = 'O';
                        tTTFlag = '0';
                    } else if (tOne.TAX_KIND === '4') {
                        // TT
                        tPurApp = 'O';
                        tTTFlag = '1';
                    } else if (tOne.TAX_KIND === '8') {
                        // TT
                        tPurApp = 'X';
                        tTTFlag = '0';
                    }

                    var tTotRate =
                        (parseFloat(tOne.IN_PAY_AMT) +
                            parseFloat(tOne.PAID_AMT)) /
                        parseFloat(tOne.PAY_AMT);

                    var tRate =
                        parseFloat(tOne.IN_PAY_AMT) / parseFloat(tOne.PAY_AMT);
                    console.log(`====> tTotRate: ${tRate}`);
                    console.log(`====> tRate: ${tRate}`);
                    var tVatAmt = AFLib.numToFixed(
                        parseFloat(tOne.VAT_AMT) * tRate,
                        2,
                    );
                    var tPayAmt = AFLib.numToFixed(
                        parseFloat(tOne.PAY_AMT) * tRate,
                        2,
                    );
                    var tMinusAmt = tPayAmt - tVatAmt;

                    var wWonAmt = 0;
                    var wWonRate = 0;
                    if (billObj.CURR_CD === 'KRW') {
                        wWonAmt = AFLib.numToFixed(
                            parseFloat(tPayAmt) * parseFloat(wWonAmt2),
                            2,
                        );
                        wWonRate = 1;
                    } else {
                        wWonAmt = AFLib.numToFixed(
                            parseFloat(tPayAmt) * parseFloat(wWonAmt2),
                            2,
                        );
                        wWonRate = String(AFLib.numToFixed(wWonAmt2, 4));
                    }

                    var tTaxbillObj = {};
                    tTaxbillObj.DOC_NO = billObj.PAY_REPORT;
                    tTaxbillObj.VENDOR_CD = billObj.VENDOR_CD;
                    tTaxbillObj.CLOSING_DATE = billObj.INVOICE_DATE;
                    tTaxbillObj.PAY_DATE = billObj.PAY_DATE;
                    tTaxbillObj.CURR_CD = billObj.CURR_CD;
                    tTaxbillObj.PUR_APP = tPurApp;
                    tTaxbillObj.TT_FLAG = tTTFlag;
                    tTaxbillObj.STATUS_CD = '';
                    tTaxbillObj.PUR_FACTORY = billObj.PUR_FACTORY;
                    tTaxbillObj.TAX = tVatAmt;
                    tTaxbillObj.MINUS_AMOUNT = tMinusAmt;
                    tTaxbillObj.TOT_AMOUNT = tPayAmt;
                    tTaxbillObj.TAXBILL_DATE = tRetDate1;
                    tTaxbillObj.TAXBILL_CD = m_TAXBILL_CD;
                    tTaxbillObj.PAY_BANK = billObj.PAY_BANK;
                    tTaxbillObj.BILL_CD = billObj.BILL_CD;
                    tTaxbillObj.STSIN_CD = '';
                    tTaxbillObj.YEAR = tRetDate.substring(0, 4);
                    tTaxbillObj.REG_USER = tUserInfo.USER_ID;
                    tTaxbillObj.REG_DATETIME = tRetDate;
                    tTaxbillObj.APPROKEY = '';
                    tTaxbillObj.KRW_AMOUNT = wWonAmt;
                    tTaxbillObj.CURR_RATE = wWonRate;
                    tTaxbillObj.APPROKEY_TAX = tOne.APPROKEY_TAXBILL;
                    tTaxbillObj.STATUS_CD_TAX = '6';
                    let tSQL99 = AFLib.createTableSql(
                        'KCD_GW_TAXBILL_KR',
                        tTaxbillObj,
                    );
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    if (tOne.BILL_CD) {
                        let tSQL99 = `
                            update KSV_BILL_MST
                            set
                                APPRO_KEY_TAX = '${tOne.APPROKEY_TAXBILL}',
                                GW_STATUS_TAX = '6'
                            where
                                BILL_CD = '${tOne.BILL_CD}'
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);
                    }

                    if (tOne.BILL_CD) {
                        let tSQL99 = `
                            update KSV_STOCK_IN
                            set
                                CALC_FLAG = '1'
                            where
                                BILL_NO = '${tOne.BILL_CD}'
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);
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
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = 'ERROR:Cancel TaxBill Error';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED:GW Return:';
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },

        //  GW (해외자재)
        mgrUpdate_S0423_GW_IN: async (_, args, contextValue) => {
            // End Proc
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

            // BILL OK 선행
            /*
            var tBillOkArray = [];
            var tIdx = 0
            for (tIdx = 0; tIdx < args.datas.length; tIdx ++) {
                var tObj = { ...args.datas[tIdx] };
                if (tObj.BILL_FLAG === 'X') { 
                    tBillOkArray.push(tObj);
                }
            }
            if (tBillOkArray.length > 0) {
                var tFunc = new S0423_5_COMM();
                var tRetObj = await tFunc.process_taxbill(tBillOkArray, contextValue);
                if (tRetObj[0].CODE.includes('SUCC')) ;
                else {
                    return (tRetObj);
                }
            }
            */

            var tInput = {
                ...args.datas[0],
            };
            var tSQLArray = [];

            var tCheckVendorGW = 0;
            var tCheckPayReport = 0;
            var tCheckCalc = 0;
            var tCheckGW = 0;
            var tCheckBillDate = 0;
            var tCheckDcAmount = 0;

            var tPayDateArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var tCol = {
                    ...args.datas[tIdx],
                };
                var tFlag = 0;
                var tIdx1 = 0;
                // if (tCol.BILL_FLAG !== 'O') tCheckCalc += 1;
                if (!tCol.BILL_CD || !tCol.TAXBILL_CD) tCheckCalc += 1;
                for (tIdx1 = 0; tIdx1 < tPayDateArray.length; tIdx1++) {
                    if (tPayDateArray[tIdx1] === tCol.PAY_DATE) {
                        tFlag = 1;
                        break;
                    }
                }
                if (tFlag === 0) tPayDateArray.push(tCol.PAY_DATE);

                /* WON.2601 */
                var sql100 = `
                    select
                        isnull(sum(dc_amount), 0) as dc_amount
                    from
                        ksv_dc_amount
                    where
                        end_date = '${tCol.INVOICE_DATE}'
                        and vendor_cd = '${tCol.VENDOR_CD}'
                        and curr_cd = '${tCol.CURR_CD}'
                        and pay_date = '${tCol.PAY_DATE}'
                `;
                var ret100 = await prisma.$queryRaw(Prisma.raw(sql100));
                var tDcAmount = 0;
                if (ret100.length > 0) {
                    tDcAmount = parseFloat(ret100[0].dc_amount);
                }
                if (tDcAmount < parseFloat(tCol.DISCOUNT_AMT))
                    tCheckDcAmount = 1;
            }

            /*
            if (tCheckDcAmount > 0) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = `ERROR:Dc Amount가 틀립니다. DC Apply후 진행하십시요.  `;
                tObj.id = 0;
                tRetArray.push(tObj);
                return (tRetArray);
            }
            */

            if (tCheckCalc > 0) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = `ERROR:Bill 등록것만 상신가능합니다 `;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            if (tPayDateArray.length > 2) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Pay Date는 두개까지만 가능합니다';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            /*
      var tYear = tRetDate.substring(0, 4);
      args.datas.forEach((col, i) => {
         var tOne = { ...col };
         let tSQL99 = `
             update KCD_GW_TAXBILL_KR
             set
                 APPROKEY = '${tOne.GW_KEY}',
                 REG_USER = '${tUserInfo.USER_ID}',
                 REG_DATETIME = '${tRetDate}',
                 YEAR = '${tYear}',
                 CURR_RATE = '${tOne.CURR_INPUT}',
                 KRW_AMOUNT = '${tOne.KRW_AMOUNT}',
                 STATUS_CD = '1'
                 -- where TAXBILL_CD = '${tOne.TAXBILL_CD}' 
             where
                 (
                     BILL_CD = '${tOne.TAXBILL_CD}'
                     or TAXBILL_CD = '${tOne.TAXBILL_CD}'
                 )
         `;
          const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
          tSQLArray.push(tSQL99_1);

          let tSQL99 = `
              update KSV_BILL_MST
              set
                  APPRO_KEY = '${tOne.GW_KEY}',
                  GW_STATUS_CD = '6'
              where
                  BILL_CD = '${tOne.TAXBILL_CD}'
          `;
          const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
          tSQLArray.push(tSQL99_1);
      });
      */

            var tYear = tRetDate.substring(0, 4);

            var tAppKey = '';
            tAppKey = 'DM' + tRetDate;

            /*
            0                    NEW       
            1                    상신   
            2                    종결
            3                    반려  
            4                    상신취소   
            5                    삭제                                
            */

            var tIdx1 = 0;
            for (tIdx1 = 0; tIdx1 < args.datas.length; tIdx1++) {
                tSQLArray = [];

                var tOne = {
                    ...args.datas[tIdx1],
                };

                var tSQL = `
                    select
                        *
                    from
                        ksv_bill_mst
                    where
                        bill_cd = '${tOne.BILL_CD}'
                `;
                var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
                var billObj = {};

                if (tOne.BILL_CD) {
                    var tSQL = `
                        select
                            *
                        from
                            ksv_bill_mst
                        where
                            bill_cd = '${tOne.BILL_CD}'
                    `;
                    var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
                    if (nRet0.length > 0) {
                        billObj = { ...nRet0[0] };
                        m_TAXBILL_CD = billObj.TAXBILL_CD;
                    }
                }

                let sql0_9 = `
                    select
                        *
                    from
                        kcd_currency
                    where
                        curr_cd = '${billObj.CURR_CD}'
                        and start_date = '${tRetDate1}'
                `;
                var nRet0_9 = await prisma.$queryRaw(Prisma.raw(sql0_9));
                var wWonAmt2 = 0;
                if (nRet0_9.length > 0)
                    wWonAmt2 = parseFloat(nRet0_9[0].WON_AMT2);
                else {
                    let sql0_9 = `
                        select
                            *
                        from
                            kcd_currency
                        where
                            curr_cd = '${billObj.CURR_CD}'
                            and start_date = (
                                select
                                    max(start_date)
                                from
                                    kcd_currency
                                where
                                    curr_cd = '${billObj.CURR_CD}'
                            )
                    `;
                    var nRet0_9 = await prisma.$queryRaw(Prisma.raw(sql0_9));
                    if (nRet0_9.length > 0)
                        wWonAmt2 = parseFloat(nRet0_9[0].WON_AMT2);
                }

                let sql0_1 = `
                    select
                        isnull(max(taxbill_cd), '') as max_taxbill_cd
                    from
                        kcd_gw_taxbill_kr
                    where
                        taxbill_cd like 'TAX${tRetDate.substring(2, 4)}-%'
                `;
                var nRet0_1 = await prisma.$queryRaw(Prisma.raw(sql0_1));
                var tMaxSeq = 1;
                if (nRet0_1.length > 0) {
                    if (nRet0_1[0].max_taxbill_cd === '') tMaxSeq = 1;
                    else
                        tMaxSeq =
                            parseInt(
                                nRet0_1[0].max_taxbill_cd.substring(6, 12),
                            ) + 1;
                }
                var tMaxSeqStr = AFLib.printF(tMaxSeq, 6);
                var m_TAXBILL_CD = `TAX${tRetDate.substring(2, 4)}-${tMaxSeqStr}`;
                var tPurApp = 'O';
                var tTTFlag = '1';
                /*
                if (tOne.TAX_KIND === '1') { // 과세
                    tPurApp = 'X';
                    tTTFlag = '0';
                } else if (tOne.TAX_KIND === '2') { // 영세
                    tPurApp = 'X';
                    tTTFlag = '0';
                } else if (tOne.TAX_KIND === '3') { // 면세
                    tPurApp = 'O';
                    tTTFlag = '0';
                } else if (tOne.TAX_KIND === '5') { // TT
                    tPurApp = 'O';
                    tTTFlag = '1';
                }
                */

                var tRate =
                    parseFloat(tOne.IN_PAY_AMT) / parseFloat(tOne.PAY_AMT);
                var tVatAmt = 0;
                var tPayAmt = AFLib.numToFixed(
                    parseFloat(tOne.PAY_AMT) * tRate,
                    2,
                );
                var tMinusAmt = tPayAmt - tVatAmt;

                var wWonAmt = 0;
                var wWonRate = 0;
                if (tBillObj.CURR_CD === 'KRW') {
                    wWonAmt = AFLib.numToFixed(
                        parseFloat(tPayAmt) * parseFloat(wWonAmt2),
                        2,
                    );
                    wWonRate = 1;
                } else {
                    wWonAmt = AFLib.numToFixed(
                        parseFloat(tPayAmt) * parseFloat(wWonAmt2),
                        2,
                    );
                    wWonRate = String(AFLib.numToFixed(wWonAmt2, 4));
                }

                let sql0_2 = `
                    select
                        *
                    from
                        kcd_gw_taxbill_kr
                    where
                        bill_cd = '${tOne.BILL_CD}'
                        and (
                            (
                                approkey is null
                                or approkey = ''
                            )
                            or (
                                status_cd <> '1'
                                and status_cd <> '2'
                            )
                        )
                `;
                var nRet0_2 = await prisma.$queryRaw(Prisma.raw(sql0_2));
                if (nRet0_2.length <= 0 || !billObj.TAXBILL_CD) {
                    if (billObj.SAVE_TAXBILL) {
                        var tmpObj = JSON.parse(billObj.SAVE_TAXBILL);
                        var tTaxbillObj = {};
                        tTaxbillObj.DOC_NO = tmpObj.DOC_NO;
                        tTaxbillObj.VENDOR_CD = tmpObj.VENDOR_CD;
                        tTaxbillObj.CLOSING_DATE = tmpObj.CLOSING_DATE;
                        tTaxbillObj.PAY_DATE = tmpObj.PAY_DATE;
                        tTaxbillObj.CURR_CD = tmpObj.CURR_CD;
                        tTaxbillObj.PUR_APP = tmpObj.PUR_APP;
                        tTaxbillObj.TT_FLAG = tmpObj.TT_FLAG;
                        tTaxbillObj.STATUS_CD = tmpObj.STATUS_CD;
                        tTaxbillObj.PUR_FACTORY = tmpObj.PUR_FACTORY;
                        tTaxbillObj.TAX = tmpObj.TAX;
                        tTaxbillObj.MINUS_AMOUNT = tmpObj.MINUS_AMOUNT;
                        tTaxbillObj.TOT_AMOUNT = tmpObj.TOT_AMOUNT;
                        tTaxbillObj.TAXBILL_DATE = tRetDate1;
                        tTaxbillObj.TAXBILL_CD = m_TAXBILL_CD;
                        tTaxbillObj.PAY_BANK = tmpObj.PAY_BANK;
                        tTaxbillObj.BILL_CD = tOne.BILL_CD;
                        tTaxbillObj.STSIN_CD = '';
                        tTaxbillObj.YEAR = tRetDate.substring(0, 4);
                        tTaxbillObj.REG_USER = tUserInfo.USER_ID;
                        tTaxbillObj.REG_DATETIME = tRetDate;
                        tTaxbillObj.APPROKEY = tmpObj.APPROKEY;
                        tTaxbillObj.KRW_AMOUNT = tmpObj.KRW_AMOUNT;
                        tTaxbillObj.CURR_RATE = tmpObj.CURR_RATE;
                        let tSQL99 = AFLib.createTableSql(
                            'KCD_GW_TAXBILL_KR',
                            tTaxbillObj,
                        );
                        const tSQL99_1 = await prisma.$queryRaw(
                            Prisma.raw(tSQL99),
                        );
                    } else {
                        var tTaxbillObj = {};
                        tTaxbillObj.DOC_NO = billObj.PAY_REPORT;
                        tTaxbillObj.VENDOR_CD = billObj.VENDOR_CD;
                        tTaxbillObj.CLOSING_DATE = billObj.INVOICE_DATE;
                        tTaxbillObj.PAY_DATE = billObj.PAY_DATE;
                        tTaxbillObj.CURR_CD = billObj.CURR_CD;
                        tTaxbillObj.PUR_APP = tPurApp;
                        tTaxbillObj.TT_FLAG = tTTFlag;
                        tTaxbillObj.STATUS_CD = '';
                        tTaxbillObj.PUR_FACTORY = billObj.PUR_FACTORY;
                        tTaxbillObj.TAX = tVatAmt;
                        tTaxbillObj.MINUS_AMOUNT = tMinusAmt;
                        tTaxbillObj.TOT_AMOUNT = tPayAmt;
                        tTaxbillObj.TAXBILL_DATE = tRetDate1;
                        tTaxbillObj.TAXBILL_CD = m_TAXBILL_CD;
                        tTaxbillObj.PAY_BANK = billObj.PAY_BANK;
                        tTaxbillObj.BILL_CD = billObj.BILL_CD;
                        tTaxbillObj.STSIN_CD = '';
                        tTaxbillObj.YEAR = tRetDate.substring(0, 4);
                        tTaxbillObj.REG_USER = tUserInfo.USER_ID;
                        tTaxbillObj.REG_DATETIME = tRetDate;
                        tTaxbillObj.APPROKEY = '';
                        tTaxbillObj.KRW_AMOUNT = wWonAmt;
                        tTaxbillObj.CURR_RATE = wWonRate;
                        let tSQL99 = AFLib.createTableSql(
                            'KCD_GW_TAXBILL_KR',
                            tTaxbillObj,
                        );
                        const tSQL99_1 = await prisma.$queryRaw(
                            Prisma.raw(tSQL99),
                        );
                    }

                    let sql0_2 = `
                        select
                            *
                        from
                            kcd_gw_taxbill_kr
                        where
                            taxbill_cd = '${m_TAXBILL_CD}'
                    `;
                    nRet0_2 = await prisma.$queryRaw(Prisma.raw(sql0_2));
                }

                if (nRet0_2.length > 0) {
                    let tSQL99 = `
                        update KCD_GW_TAXBILL_KR
                        set
                            APPROKEY = '${tOne.GW_KEY}',
                            REG_USER = '${tUserInfo.USER_ID}',
                            REG_DATETIME = '${tRetDate}',
                            YEAR = '${tYear}',
                            STATUS_CD = '6',
                            TAX = '${tVatAmt}',
                            MINUS_AMOUNT = '${tMinusAmt}',
                            TOT_AMOUNT = '${tPayAmt}',
                            TAXBILL_DATE = '${tRetDate1}'
                        where
                            taxbill_cd = '${nRet0_2[0].TAXBILL_CD}'
                            and (
                                (
                                    approkey is null
                                    or approkey = ''
                                )
                                or (status_cd = '6')
                            )
                            -- where BILL_CD = '${tOne.BILL_CD}' 
                            --   and taxbill_cd = '${nRet0_2[0].TAXBILL_CD}'
                            --   and (approkey is null or approkey = '')
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                } else {
                    var tTaxbillObj = {};
                    tTaxbillObj.DOC_NO = tOne.PAY_REPORT;
                    tTaxbillObj.VENDOR_CD = tOne.VENDOR_CD;
                    tTaxbillObj.CLOSING_DATE = tOne.INVOICE_DATE;
                    tTaxbillObj.PAY_DATE = tOne.PAY_DATE;
                    tTaxbillObj.CURR_CD = tOne.CURR_CD;
                    tTaxbillObj.PUR_APP = tPurApp;
                    tTaxbillObj.TT_FLAG = tTTFlag;
                    tTaxbillObj.STATUS_CD = '6';
                    tTaxbillObj.PUR_FACTORY = tOne.PUR_FACTORY;
                    tTaxbillObj.TAX = tVatAmt;
                    tTaxbillObj.MINUS_AMOUNT = tMinusAmt;
                    tTaxbillObj.TOT_AMOUNT = tPayAmt;
                    tTaxbillObj.TAXBILL_DATE = tRetDate1;
                    tTaxbillObj.TAXBILL_CD = m_TAXBILL_CD;
                    tTaxbillObj.PAY_BANK = tOne.PAY_BANK;
                    tTaxbillObj.BILL_CD = tOne.BILL_CD;
                    tTaxbillObj.STSIN_CD = '';
                    tTaxbillObj.YEAR = tRetDate.substring(0, 4);
                    tTaxbillObj.REG_USER = tUserInfo.USER_ID;
                    tTaxbillObj.REG_DATETIME = tRetDate;
                    tTaxbillObj.APPROKEY = tOne.APPROKEY;
                    tTaxbillObj.KRW_AMOUNT = '0';
                    tTaxbillObj.CURR_RATE = '0';
                    let tSQL99 = AFLib.createTableSql(
                        'KCD_GW_TAXBILL_KR',
                        tTaxbillObj,
                    );
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }

                let tSQL99 = `
                    update KSV_BILL_MST
                    set
                        APPRO_KEY = '${tOne.APPROKEY}',
                        GW_STATUS = '6'
                    where
                        BILL_CD = '${tOne.TAXBILL_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

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
                    tObj.CODE = 'ERROR:Cancel TaxBill Error';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED:GW IN';
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },

        // TaxBill OK
        mgrInsert_S0423_TAXBILL_bak2: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput = {
                ...args.datas[0],
            };
            var tSQLArray = [];

            var tCheckVendorGW = 0;
            var tCheckPayReport = 0;
            var tCheckCalc = 0;
            var tCheckGW = 0;
            var tCheckBillDate = 0;

            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var tOne = {
                    ...args.datas[tIdx],
                };
                if (tOne.BILL_FLAG === 'O') tCheckCalc += 1;
                if (tOne.GW_STATUS === '1' || tOne.GW_STATUS === '2')
                    tCheckGW += 1;
                if (
                    parseFloat(tOne.PAY_AMT) <= 0 &&
                    parseFloat(tOne.DEPOSIT_AMT) <= 0 &&
                    parseFloat(tOne.LC_AMT) <= 0
                )
                    tCheckPayReport += 1;
                let sql0 = `
                    select
                        GW
                    from
                        KCD_VENDOR
                    where
                        VENDOR_CD = '${tOne.VENDOR_CD}'
                `;
                var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                if (nRet0[0].GW != '2') tCheckVendorGW += 1;
            }

            var tErrorStr = '';
            if (tCheckPayReport > 0) {
                tErrorStr =
                    'pay amt, Deposit amt, LC amt중 하나는 금액이 있어야 합니다.';
            } else if (tCheckCalc > 0) {
                tErrorStr = 'Taxbill OK 된 문서입니다..';
            } else if (tCheckGW > 0) {
                tErrorStr = '그룹웨어 상신 중인 문서는 작업이 불가 합니다..';
            } else if (tCheckBillDate > 0) {
                tErrorStr = 'TaxBill Date를 확인해 주시기 바랍니다.';
            }
            if (tErrorStr !== '') {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = `ERROR:(TAXBILL):${tErrorStr}`;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var m_TAXBILL_CD = '';

            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                tSQLArray = [];

                let sql0_1 = `
                    select
                        isnull(max(taxbill_cd), '') as max_taxbill_cd
                    from
                        kcd_gw_taxbill_kr
                    where
                        taxbill_cd like 'TAX${tRetDate.substring(2, 4)}-%'
                `;
                var nRet0_1 = await prisma.$queryRaw(Prisma.raw(sql0_1));
                var tMaxSeq = 1;
                if (nRet0_1.length > 0) {
                    if (nRet0_1[0].max_taxbill_cd === '') tMaxSeq = 1;
                    else
                        tMaxSeq =
                            parseInt(
                                nRet0_1[0].max_taxbill_cd.substring(6, 12),
                            ) + 1;
                }
                var tMaxSeqStr = AFLib.printF(tMaxSeq, 6);
                m_TAXBILL_CD = `TAX${tRetDate.substring(2, 4)}-${tMaxSeqStr}`;

                var tOne = {
                    ...args.datas[tIdx],
                };

                if (tOne.PAY_REPORT === '') {
                    tErrorStr = `구매영수증이 정확히 만들어 졌는지 확인하세요(Pay report확인요).`;
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = `ERROR:(TAXBILL):${tErrorStr}`;
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }

                var m_PAY_BANK = '';
                var m_PAY_BANK_ACCOUNT = '';
                var tBankObj = {};
                if (tOne.VENDOR_TYPE === '1' || tOne.VENDOR_TYPE === '3') {
                    // 국내자재업체, 수입자재업체
                    let sql0 = `
                        select
                            bank_cd,
                            gw
                        from
                            KCD_VENDOR_BANK
                        where
                            VENDOR_CD = '${tOne.VENDOR_CD}'
                    `;
                    var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                    var tWorkBank = '';
                    nRet0.forEach((col2, i2) => {
                        if (col2.gw === '2') tWorkBank = col2.bank_cd;
                    });
                    if (tWorkBank === '') {
                        tErrorStr = `.`;
                        var tRetArray = [];
                        var tObj = {};
                        tObj.CODE = `ERROR:(TAXBILL):승인된 연결 은행 정보가 없습니다. Supplier Info에서 확인하세요(${tOne.VENDOR_CD})`;
                        tObj.id = 0;
                        tRetArray.push(tObj);
                        return tRetArray;
                    }
                    if (tWorkBank !== '') {
                        let sql1 = `
                            select
                                *
                            from
                                KCD_BANK
                            where
                                BANK_CD = '${tWorkBank}'
                        `;
                        var nRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                        if (nRet1.length > 0) {
                            tBankObj = {
                                ...nRet1[0],
                            };
                            m_PAY_BANK = nRet1[0].BANK_CD;
                            m_PAY_BANK_ACCOUNT = nRet1[0].ACCOUNT_CD;
                        }
                    } else {
                        tErrorStr = `업체의 Pay Bank를 확인해 주세요 (${tOne.VENDOR_CD}).`;
                        var tRetArray = [];
                        var tObj = {};
                        tObj.CODE = `ERROR:(TAXBILL):${tErrorStr}`;
                        tObj.id = 0;
                        tRetArray.push(tObj);
                        return tRetArray;
                    }
                }

                var tMinus =
                    parseFloat(tOne.DISCOUNT_AMT) +
                    parseFloat(tOne.DEBIT_AMT) +
                    parseFloat(tOne.LC_AMT) +
                    parseFloat(tOne.DEPOSIT_AMT);

                var tTax = parseFloat(tOne.VAT_AMT);
                var tMinusAmount = parseFloat(tOne.PO_AMT) - parseFloat(tMinus);
                var tTotAmount = tMinusAmount + tTax;

                var tPayReport = tOne.PAY_REPORT;

                let tSQL99 = `
                    update kcd_gw_taxbill_kr
                    set
                        taxbill_cd = '${m_TAXBILL_CD}',
                        taxbill_date = '${tRetDate1}',
                        tax = '${tTax}',
                        minus_amount = '${tMinusAmount}',
                        tot_amount = '${tTotAmount}'
                    where
                        bill_cd = '${tOne.BILL_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                var tPurApp = 'X';
                let tSQL99 = `
                    update ksv_stock_in
                    set
                        calc_flag = '1'
                        -- remark = '', 
                        -- tax = '${tOne.VAT_AMT}', 
                        -- pur_app = '${tPurApp}' 
                    where
                        stsin_cd in (
                            select distinct
                                stsin_cd
                            from
                                ksv_stock_mem2_stsin
                            where
                                bill_cd = '${tOne.BILL_CD}'
                        )
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    update ksv_stock_in_mst
                    set
                        calc_flag = '1',
                        -- pay_curr_cd = '${tOne.CURR_CD}', 
                        -- pay_amt = '${tOne.PAY_AMT}', 
                        bill_flag = '1',
                        bill_date = '${tRetDate1}',
                        taxbill_cd = '${m_TAXBILL_CD}',
                        -- tax = '${tOne.VAT_AMT}', 
                        pur_app = '${tPurApp}'
                    where
                        stsin_cd in (
                            select distinct
                                stsin_cd
                            from
                                ksv_stock_mem2_stsin
                            where
                                bill_cd = '${tOne.BILL_CD}'
                        )
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    update ksv_dc_amount
                    set
                        calc_flag = '1'
                    where
                        bill_cd = '${tOne.BILL_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    update ksv_bill_mst
                    set
                        deposit_amt = '${tOne.DEPOSIT_AMT}',
                        debit_amt = '${tOne.DEBIT_AMT}',
                        discount_amt = '${tOne.DISCOUNT_AMT}',
                        vat_amt = '${tOne.VAT_AMT}',
                        pay_amt = '${tOne.PAY_AMT}',
                        bill_flag = '1',
                        taxbill_cd = '${m_TAXBILL_CD}'
                        -- pay_report = '${tPayReport}'
                    where
                        bill_cd = '${tOne.BILL_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    update ksv_stock_mem2_stsin
                    set
                        bill_flag = '1'
                    where
                        bill_cd = '${tOne.BILL_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

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
                    tObj.CODE = `ERROR:Insert TaxBill Error:${e.message}`;
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }
            }

            // 재계산
            tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var tOne = {
                    ...args.datas[tIdx],
                };

                // 금액재계산
                var sql3 = `
                    select
                        a.pu_cd,
                        isnull(sum(a.in_qty * b.PO_PRICE), 0) as bill_amt
                    from
                        ksv_stock_in a,
                        ksv_stock_mem2 b
                    where
                        a.pu_cd in (
                            select distinct
                                pu_cd
                            from
                                ksv_stock_mem2_stsin
                            where
                                bill_cd = '${tOne.BILL_CD}'
                        )
                        and a.po_cd = b.po_cd
                        and a.matl_cd = b.matl_cd
                        and a.calc_flag = '1'
                    group by
                        a.pu_cd
                `;
                var nRet3 = await prisma.$queryRaw(Prisma.raw(sql3));
                var tBillAmt = 0;
                var tIdx9 = 0;
                tSQLArray = [];
                for (tIdx9 = 0; tIdx9 < nRet3.length; tIdx9++) {
                    var tOne3 = {
                        ...nRet3[tIdx9],
                    };
                    var tPuCd = tOne3.pu_cd;
                    var tBillAmt = AFLib.numToFixed(
                        parseFloat(tOne3.bill_amt),
                        2,
                    );

                    let tSQL99 = `
                        update ksv_pu_mst2
                        set
                            bill_amt = ${tBillAmt}
                        where
                            pu_cd = '${tPuCd}'
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
                    tObj.CODE = `ERROR:Sts ${tMessageType}:${e.message}`;
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED:TAXBILL ';
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },

        mgrUpdate_S0423_BILL_END: async (_, args, contextValue) => {
            let tSQLArray = [];
            let billCdList = [];

            var tIdx = 0;
            let endFlag = false;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var tOne = { ...args.datas[tIdx] };

                let sql9 = `
                    select
                        *
                    from
                        ksv_bill_mst
                    where
                        bill_cd = '${tOne.BILL_CD}'
                `;
                var nRet9 = await prisma.$queryRaw(Prisma.raw(sql9));

                if (nRet9.length <= 0) {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = 'ERROR:Bill End: 없는  Bill  입니다. ';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }

                if (nRet9[0].BILL_END_FLAG === '1') {
                    /*
                    let sql1 = `
                        select
                            bill_cd,
                            tax,
                            minus_amount,
                            tot_amount,
                            taxbill_cd,
                            approkey,
                            status_cd,
                            approkey_tax,
                            status_cd_tax
                        from
                            kcd_gw_taxbill_kr
                        where
                            bill_cd = '${tOne.BILL_CD}'
                            and (
                                status_cd in ('1', '2')
                                or status_cd_tax in ('1', '2')
                            )
                    `;
                    var nRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                    if (nRet1.length > 0) {
                        var tRetArray = [];
                        var tObj = {};
                        tObj.CODE = 'ERROR:Bill End:상신된 건은 End 취소 할수 없습니다';
                        tObj.id = 0; 
                        tRetArray.push(tObj);
                        return (tRetArray);
                    }
                    */

                    let sqlUp = `
                        update ksv_bill_mst
                        set
                            bill_end_flag = '0'
                        where
                            bill_cd = '${tOne.BILL_CD}'
                    `;
                    var retUp = prisma.$queryRaw(Prisma.raw(sqlUp));
                    tSQLArray.push(retUp);

                    endFlag = false;
                } else {
                    /* WON.2601 */
                    var tCheckDcAmount = 0;
                    var sql100 = `
                        select
                            isnull(sum(dc_amount), 0) as dc_amount
                        from
                            ksv_dc_amount
                        where
                            end_date = '${tOne.INVOICE_DATE}'
                            and vendor_cd = '${tOne.VENDOR_CD}'
                            and curr_cd = '${tOne.CURR_CD}'
                            and pay_date = '${tOne.PAY_DATE}'
                    `;
                    var ret100 = await prisma.$queryRaw(Prisma.raw(sql100));
                    var tDcAmount = 0;
                    if (ret100.length > 0) {
                        tDcAmount = parseFloat(ret100[0].dc_amount);
                    }
                    if (tDcAmount < parseFloat(tOne.DISCOUNT_AMT))
                        tCheckDcAmount = 1;

                    /*

                    if (tCheckDcAmount > 0) {
                        var tRetArray = [];
                        var tObj = {};
                        tObj.CODE = 'ERROR:Bill End:DC Amount가 틀립니다. DC Apply후에 진행하십시요';
                        tObj.id = 0; 
                        tRetArray.push(tObj);
                        return (tRetArray);
                    }
                    */

                    let sqlUp = `
                        update ksv_bill_mst
                        set
                            bill_end_flag = '1'
                        where
                            bill_cd = '${tOne.BILL_CD}'
                    `;
                    var retUp = prisma.$queryRaw(Prisma.raw(sqlUp));
                    tSQLArray.push(retUp);

                    endFlag = true;
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
                console.log('-1');
                return [{ CODE: 'ERROR:Bill End Error', id: -1 }];
            }

            if (endFlag) {
                return [{ CODE: 'SUCCEED:Bill End', id: 0 }];
            } else {
                return [{ CODE: 'SUCCEED:Bill End Canceled', id: 0 }];
            }
        },
    },
};

export default moduleMutation_S0423_5;
