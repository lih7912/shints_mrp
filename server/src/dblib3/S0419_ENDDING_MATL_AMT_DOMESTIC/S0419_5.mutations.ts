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
const moduleMutation_S0419_5 = {
    Mutation: {
        mgrInsert_S0419_5: async (_, args, contextValue) => {
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

            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInEdit = {
                ...args.datas1,
            };
            var tInList = [...args.datas];
            var tSQLArray = [];

            var tCheckBill = 0;
            var tCheckCalc = 0;

            var tEndDate = tInEdit.INVOICE_DATE;
            var tPayDate = tInEdit.PAY_DATE;
            var tPayCurrCd = tInEdit.CURR_CD;

            var tYY2 = tRetDate.substring(2, 4);
            var tSEQ = tRetDate.substring(4, 14);

            var tZero = '000000';
            var tBillCd = `BILL${tYY2}-${tSEQ}`;

            var tPurApp = '';
            var tTTFlag = '0';
            var tLCFlag = '0';
            var tTaxRate = 0;

            var billMst = {};
            var m_TAXBILL_MST = {};
            if (tInEdit.BILL_CD) {
                var tSQL = `
                    select
                        *
                    from
                        ksv_bill_mst
                    where
                        bill_cd = '${tInEdit.BILL_CD}'
                `;
                var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
                if (nRet0.length > 0) billMst = { ...nRet0[0] };

                var tSQL = `
                    select
                        *
                    from
                        kcd_gw_taxbill_kr
                    where
                        bill_cd = '${tInEdit.BILL_CD}'
                `;
                var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
                var tCheck = 0;
                nRet0.forEach((col, i) => {
                    if (!col.APPROKEY && !col.APPROKEY_TAX)
                        m_TAXBILL_MST = {
                            ...col,
                        };
                    else {
                        if (col.STATUS_CD === '1' || col.STATUS_CD === '2' || col.STATUS_CD_TAX === '1' || col.STATUS_CD_TAX === '2')
                            tCheck = 1;
                    }
                });

                if (tCheck > 0) {

                    var sqlTaxBill = `
                         update ksv_bill_mst
                         set
                             PAY_DATE = '${tInEdit.PAY_DATE}',
                             PAY_BANK = '${tInEdit.PAY_BANK}'
                         where
                             bill_cd = '${tInEdit.BILL_CD}'
                    `;
                    var retTaxBill = prisma.$queryRaw(Prisma.raw(sqlTaxBill));
                    tSQLArray.push(retTaxBill);

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
                        tObj.CODE = `ERROR:MATL Endding Error:${e.message}`;
                        tObj.id = 0;
                        tRetArray.push(tObj);
                        return tRetArray;
                    }

                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = 'SUCCEED:' + tInEdit.BILL_CD;
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;

                    /*
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = `ERROR:Bill Reisgier: You cannot modify an updated Bill`;
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                    */
                }
            }

            if (!tInEdit.INVOICE_DATE) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = `ERROR:Bill Reisgier: Invoice Date is required. (${tInEdit.INVOICE_DATE})`;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            if (!tInEdit.PUR_FACTORY) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = `ERROR:Bill Reisgier: Pur Factory is required. (${tInEdit.PUR_FACTORY})`;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tCheckCompany = 0;
            var tSaveCompany = 0;
            tInList.forEach((col, i) => {
                if (i === 0) tSaveCompany = col.COMPANY_CODE;
                else {
                    if (tSaveCompany !== col.COMPANY_CODE) tCheckCompany = 1;
                }
            });

            if (tCheckCompany === 1) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = `ERROR:Bill Reisgier: You can use the same company close. Please refer to the company code. `;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            if (!tInEdit.CURR_CD) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = `ERROR:Bill Reisgier: Not Found Curr Code. `;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            // 금액계산
            var tBillObj = {};
            tBillObj.BILL_CD = tBillCd;
            tBillObj.INVOICE_DATE = tInEdit.INVOICE_DATE;
            tBillObj.PAY_DATE = tInEdit.PAY_DATE;
            tBillObj.CURR_CD = tInEdit.CURR_CD;
            tBillObj.PO_AMT = tInEdit.PO_AMT;

            tLCFlag = tInEdit.IS_LC;
            tTTFlag = tInEdit.IS_TT;
            tBillObj.DEPOSIT_AMT = '0';

            if (parseFloat(tInEdit.DEPOSIT_AMT) > 0) {
                if (
                    parseFloat(tInEdit.PO_AMT) ===
                    parseFloat(tInEdit.DEPOSIT_AMT)
                ) {
                    tLCFlag = '1';
                    tTTFlag = '0';
                    tBillObj.DEPOSIT_AMT = '0';
                    tBillObj.LC_AMT = tInEdit.PO_AMT;
                } else {
                    tLCFlag = '0';
                    tTTFlag = '1';
                    tBillObj.DEPOSIT_AMT = tInEdit.DEPOSIT_AMT;
                    tBillObj.LC_AMT = '0';
                }
            }
            tBillObj.DEBIT_AMT = tInEdit.DEBIT_AMT;

            var tPayReport = `${tUserInfo.USER_ID}[${tInEdit.PAY_BANK}]-${tRetDate}`;
            // Deposit-100-chuck[B18-0006]-20240112092922
            // lauren[B20-0019]-20220114183415
            // lauren-20211229163725
            if (parseFloat(tBillObj.DEPOSIT_AMT) > 0) {
                var tDepositRate = parseInt(
                    (parseFloat(tBillObj.DEPOSIT_AMT) /
                        parseFloat(tBillObj.PO_AMT)) *
                        100.0,
                );
                tPayReport = `Deposit-${tDepositRate}-${tUserInfo.USER_ID}[${tInEdit.PAY_BANK}]-${tRetDate}`;
            }
            if (parseFloat(tBillObj.LC_AMT) > 0) {
                tPayReport = `LC-${tUserInfo.USER_ID}[${tBillObj.PAY_BANK}]-${tRetDate}`;
            }
            /* 이제 모든 국내/수입 업체 전부다 GW 함
            if (tInList[0].VENDOR_TYPE !== '3') { // 국내자재업체, 수입자재업체
                tPayReport = '';
            }
      		  */

            var tPayReport = `${tUserInfo.USER_ID}[${tInEdit.PAY_BANK}]-${tRetDate}`;

            var tInObj9 = {
                ...tInList[0],
            };
            var tSQL = `
                select
                    *
                from
                    ksv_pu_mst2
                where
                    pu_cd = '${tInObj9.PU_CD}'
            `;
            var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
            var tPurFactory = '';
            if (tInEdit.PUR_FACTORY !== '') {
                tPurFactory = tInEdit.PUR_FACTORY;
            } else {
                if (nRet0.length > 0) {
                    var tObj9 = {
                        ...nRet0[0],
                    };
                    if (tObj9.BILL_TO === 'SHINTS') tPurFactory = 'FC045';
                    else if (tObj9.BILL_TO === 'BVT') tPurFactory = 'FC034';
                    else if (tObj9.BILL_TO === 'ETP') tPurFactory = 'FC044';
                }
            }

            tBillObj.PAY_REPORT = tPayReport;
            tBillObj.COMPANY_CODE = tInObj9.COMPANY_CODE;
            tBillObj.DISCOUNT_AMT = tInEdit.DISCOUNT_AMT;
            tBillObj.INVOICE_NO = tInEdit.INVOICE_NO;
            tBillObj.VAT_AMT = tInEdit.VAT_AMT || '0';
            tBillObj.PAY_AMT = tInEdit.PAY_AMT || '0';
            tInEdit.END_AMT = '0';
            tBillObj.PAID_AMT = tInEdit.END_AMT;
            tBillObj.ROOT_BILL_CD = tBillCd;
            tBillObj.REG_USER = tUserInfo.USER_ID;
            tBillObj.REG_DATETIME = tRetDate;
            tBillObj.TAX_KIND = tInEdit.TAX_KIND;
            tBillObj.VENDOR_CD = tInEdit.VENDOR_CD;
            tBillObj.GW_STATUS = '0';
            tBillObj.PAY_BANK = tInEdit.PAY_BANK;
            tBillObj.PUR_FACTORY = tPurFactory;
            tBillObj.BILL_FLAG = '1';

            if (tInEdit.BILL_CD) {
                tPayReport = billMst.PAY_REPORT;
                tBillObj.BILL_CD = tInEdit.BILL_CD;
            }

            // TAXBILL 생성
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

            let sql0_2 = `
                select
                    *
                from
                    kcd_currency
                where
                    curr_cd = '${tBillObj.CURR_CD}'
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
                        curr_cd = '${tBillObj.CURR_CD}'
                        and start_date = (
                            select
                                max(start_date)
                            from
                                kcd_currency
                            where
                                curr_cd = '${tBillObj.CURR_CD}'
                        )
                `;
                var nRet0_2 = await prisma.$queryRaw(Prisma.raw(sql0_2));
                if (nRet0_2.length > 0)
                    wWonAmt2 = parseFloat(nRet0_2[0].WON_AMT2);
            }

            var wWonAmt = 0;
            var wWonRate = 0;
            if (tBillObj.CURR_CD === 'KRW') {
                wWonAmt = tBillObj.PAY_AMT;
                wWonRate = 1;
            } else {
                wWonAmt = AFLib.numToFixed(
                    parseFloat(tBillObj.PAY_AMT) * parseFloat(wWonAmt2),
                    2,
                );
                wWonRate = String(AFLib.numToFixed(wWonAmt2, 4));
            }

            var tTaxKind = '';
            var tTaxRate = '';
            var tTaxAmt = '';
            var tPurApp = '';
            if (tInEdit.TAX_KIND === '1' || tInEdit.TAX_KIND === '10') {
                // 과세
                tTaxKind = '1';
                tTaxRate = 0.1;
                tTaxAmt = parseFloat(tBillObj.PAY_AMT) * 10.0;
                tPurApp = 'X';
            } else if (tInEdit.TAX_KIND === '2') {
                // 영세
                tTaxKind = '2';
                tTaxAmt = 0;
                tPurApp = 'X';
            } else if (tInEdit.TAX_KIND === '3') {
                // 면세
                tTaxKind = '3';
                tTaxAmt = 0;
                tPurApp = 'O';
            } else if (tInEdit.TAX_KIND === '4') {
                //  TT
                tTaxKind = '3';
                tLCFlag = '0';
                tTTFlag = '1';
                tTaxAmt = 0;
                tPurApp = 'O';
            } else if (tInEdit.TAX_KIND === '8') {
                tTaxKind = '1';
                tTaxRate = 0.08;
                tTaxAmt = parseFloat(tBillObj.PAY_AMT) * 8.0;
                tPurApp = 'X';
            }

            var sqlGwTaxBill = `
                select
                    *
                from
                    kcd_gw_taxbill_kr
                where
                    taxbill_cd = '${m_TAXBILL_CD}'
            `;
            var retGwTaxBill = await prisma.$queryRaw(Prisma.raw(sqlGwTaxBill));

            var tTaxbillObj = {};
            tTaxbillObj.DOC_NO = tBillObj.PAY_REPORT;
            tTaxbillObj.VENDOR_CD = tBillObj.VENDOR_CD;
            tTaxbillObj.CLOSING_DATE = tBillObj.INVOICE_DATE;
            tTaxbillObj.PAY_DATE = tBillObj.PAY_DATE;
            tTaxbillObj.CURR_CD = tBillObj.CURR_CD;
            tTaxbillObj.PUR_APP = tPurApp;
            tTaxbillObj.TT_FLAG = tTTFlag;
            tTaxbillObj.STATUS_CD = '';
            tTaxbillObj.PUR_FACTORY = tBillObj.PUR_FACTORY;
            tTaxbillObj.TAX = tBillObj.VAT_AMT;
            tTaxbillObj.MINUS_AMOUNT = tBillObj.DISCOUNT_AMT;
            tTaxbillObj.TOT_AMOUNT = tBillObj.PAY_AMT;
            tTaxbillObj.TAXBILL_DATE = tRetDate1;
            tTaxbillObj.TAXBILL_CD = m_TAXBILL_CD;
            tTaxbillObj.PAY_BANK = tBillObj.PAY_BANK;
            tTaxbillObj.BILL_CD = tBillCd;
            tTaxbillObj.STSIN_CD = '';
            tTaxbillObj.YEAR = tRetDate.substring(0, 4);
            tTaxbillObj.REG_USER = tUserInfo.USER_ID;
            tTaxbillObj.REG_DATETIME = tRetDate;
            tTaxbillObj.APPROKEY = '';
            tTaxbillObj.KRW_AMOUNT = wWonAmt;
            tTaxbillObj.CURR_RATE = wWonRate;
            let tSQL99 = AFLib.createTableSql('KCD_GW_TAXBILL_KR', tTaxbillObj);
            // const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));

            if (tInEdit.BILL_CD) {
                var sqlTaxBill = `
                    update kcd_gw_taxbill_kr
                    set
                        TT_FLAG = '${tTaxbillObj.TT_FLAG}',
                        PUR_FACTORY = '${tTaxbillObj.PUR_FACTORY}',
                        TAX = '${tTaxbillObj.TAX}',
                        MINUS_AMOUNT = '${tTaxbillObj.MINUS_AMOUNT}',
                        TOT_AMOUNT = '${tTaxbillObj.TOT_AMOUNT}',
                        KRW_AMOUNT = '${tTaxbillObj.KRW_AMOUNT}'
                    where
                        TAXBILL_CD = '${m_TAXBILL_MST.TAXBILL_CD}'
                `;
                var retTaxBill = prisma.$queryRaw(Prisma.raw(sqlTaxBill));
                // tSQLArray.push(retTaxBill);
            } else if (retGwTaxBill.length > 0) {
                var tmpTaxBillCd = retGwTaxBill[0].TAXBILL_CD;
                var sqlTaxBill = `
                    update kcd_gw_taxbill_kr
                    set
                        TT_FLAG = '${tTaxbillObj.TT_FLAG}',
                        PUR_FACTORY = '${tTaxbillObj.PUR_FACTORY}',
                        TAX = '${tTaxbillObj.TAX}',
                        MINUS_AMOUNT = '${tTaxbillObj.MINUS_AMOUNT}',
                        TOT_AMOUNT = '${tTaxbillObj.TOT_AMOUNT}',
                        KRW_AMOUNT = '${tTaxbillObj.KRW_AMOUNT}'
                    where
                        TAXBILL_CD = '${tmpTaxBillCd}'
                `;
                var retTaxBill = prisma.$queryRaw(Prisma.raw(sqlTaxBill));
                // tSQLArray.push(retTaxBill);
            } else {
                tBillObj.TAXBILL_CD = '';
                tBillObj.SAVE_TAXBILL = JSON.stringify(tTaxbillObj, null, 4);
                // tSQLArray.push(tSQL99_1);
            }

            // tBillObj.TAXBILL_CD = m_TAXBILL_CD;
            let tSQL99 = AFLib.createTableSql('KSV_BILL_MST', tBillObj);
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            if (tInEdit.BILL_CD) {
                var sqlTaxBill = `
                    update ksv_bill_mst
                    set
                        DISCOUNT_AMT = '${tBillObj.DISCOUNT_AMT}',
                        VAT_AMT = '${tBillObj.VAT_AMT}',
                        PAY_DATE = '${tBillObj.PAY_DATE}',
                        PAY_BANK = '${tBillObj.PAY_BANK}',
                        PAY_AMT = '${tBillObj.PAY_AMT}',
                        TAX_KIND = '${tBillObj.TAX_KIND}'
                    where
                        bill_cd = '${tInEdit.BILL_CD}'
                `;
                var retTaxBill = prisma.$queryRaw(Prisma.raw(sqlTaxBill));
                tSQLArray.push(retTaxBill);
            } else {
                tSQLArray.push(tSQL99_1);
            }


            var tDcObj = {};
            tDcObj.end_date = tBillObj.INVOICE_DATE;
            tDcObj.pay_date = tBillObj.PAY_DATE;
            tDcObj.vendor_cd = tBillObj.VENDOR_CD;
            tDcObj.dc_amount = tBillObj.DISCOUNT_AMT;
            tDcObj.curr_cd = tBillObj.CURR_CD;
            // tDcObj.calc_flag = '1'; /* End시 Bill Ok처리 */
            tDcObj.calc_flag =
                '0'; /* bill regist 시에는 calc_flag = '0', bill_manager 에서 '1' */
            if (tInEdit.IS_TT === '1') tDcObj.tt_flag = '1';
            else tDcObj.tt_flag = '0';
            tDcObj.pur_factory = tPurFactory;
            tDcObj.pay_report = tPayReport;
            tDcObj.stsin_cd = '';
            tDcObj.bill_cd = tBillObj.BILL_CD;

            var sqlDcAmount = `
                select
                    *
                from
                    ksv_dc_amount
                where
                    end_date = '${tDcObj.end_date}'
                    and vendor_cd = '${tDcObj.vendor_cd}'
                    and curr_cd = '${tDcObj.curr_cd}'
                    and pay_date = '${tDcObj.pay_date}'
                    -- and   calc_flag = '${tDcObj.calc_flag}'
                    -- and   tt_flag = '${tDcObj.tt_flag}'
                    -- and   pur_factory = '${tDcObj.pur_factory}'
                    -- and   pay_report = '${tDcObj.pay_report}'
            `;
            var retDcAmount = await prisma.$queryRaw(Prisma.raw(sqlDcAmount));

            /*
                  if (tInEdit.BILL_CD) {
                      var sqlDcUpdate = `
                          delete from ksv_dc_amount
                          where
                              bill_cd = '${tInEdit.BILL_CD}'
                      `;
                      var retDcUpdate = prisma.$queryRaw(Prisma.raw(sqlDcUpdate));
                      tSQLArray.push(retDcUpdate);

                      var sqlDcUpdate = `
                          delete from ksv_dc_amount
                          where
                              end_date = '${tDcObj.end_date}'
                              and vendor_cd = '${tDcObj.vendor_cd}'
                              and curr_cd = '${tDcObj.curr_cd}'
                              and pay_date = '${tDcObj.pay_date}'
                              -- and   calc_flag = '${tDcObj.calc_flag}'
                              -- and   tt_flag = '${tDcObj.tt_flag}'
                              -- and   pur_factory = '${tDcObj.pur_factory}'
                              -- and   pay_report = '${tDcObj.pay_report}'
                      `;
                      var retDcUpdate = prisma.$queryRaw(Prisma.raw(sqlDcUpdate));
                      tSQLArray.push(retDcUpdate);
                      retDcAmount = [];
                  }
            */

            if (retDcAmount.length <= 0) {
                let tSQL99 = AFLib.createTableSql('KSV_DC_AMOUNT', tDcObj);
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            } else {
                var sqlDcUpdate = `
                    -- update ksv_dc_amount set dc_amount = dc_amount + ${tDcObj.dc_amount}
                    update ksv_dc_amount
                    set
                        dc_amount = ${tDcObj.dc_amount}
                    where
                        end_date = '${tDcObj.end_date}'
                        and vendor_cd = '${tDcObj.vendor_cd}'
                        and curr_cd = '${tDcObj.curr_cd}'
                        and pay_date = '${tDcObj.pay_date}'
                        -- and   calc_flag = '${tDcObj.calc_flag}'
                        -- and   tt_flag = '${tDcObj.tt_flag}'
                        -- and   pur_factory = '${tDcObj.pur_factory}'
                        -- and   pay_report = '${tDcObj.pay_report}'
                `;
                var retDcUpdate = prisma.$queryRaw(Prisma.raw(sqlDcUpdate));
                tSQLArray.push(retDcUpdate);
            }

            let tSQL99 = `
                update ksv_stock_in_mst
                set
                    calc_flag = '1',
                    pay_date = '${tBillObj.PAY_DATE}',
                    -- pay_curr_cd = '${tBillObj.CURR_CD}', 
                    -- pay_amt = '${tBillObj.PAY_AMT}', 
                    -- bill_flag = '1',  
                    -- bill_date = '${tRetDate1}', 
                    taxbill_cd = '${m_TAXBILL_CD}',
                    -- tax = '${tBillObj.VAT_AMT}', 
                    pur_app = '${tPurApp}'
                where
                    stsin_cd in (
                        select distinct
                            stsin_cd
                        from
                            ksv_stock_mem2_stsin
                        where
                            bill_cd = '${tBillObj.BILL_CD}'
                    )
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            if (!tInEdit.BILL_CD) tSQLArray.push(tSQL99_1);

            var tIdx = 0;
            for (tIdx = 0; tIdx < tInList.length; tIdx++) {
                var col = {
                    ...tInList[tIdx],
                };

                tTaxKind = '3';
                tTaxAmt = 0;

                if (col.LC_FLAG === '1') {
                    tLCFlag = '1';
                    tTTFlag = '0';
                } else {
                    tLCFlag = '0';
                    tTTFlag = '1';
                }

                var tDepositAmt =
                    parseFloat(col.PAY_AMT) *
                    parseFloat(col.DEPOSIT_RATE) *
                    0.01;
                var tLcAmt = 0;
                if (col.LC_FLAG === '1') tLcAmt = parseFloat(col.PAY_AMT);

                var sqlPoCd = '';
                var sqlPoCd2 = '';
                var tCols = col.PO_CD2.split('/');
                tCols.forEach((col, i) => {
                    if (col !== '') {
                        if (i === 0) sqlPoCd = ` '${col}' `;
                        else sqlPoCd += ` ,'${col}' `;
                    }
                });
                if (sqlPoCd !== '') {
                    sqlPoCd2 = `and a.po_cd in (${sqlPoCd})`;
                    sqlPoCd = `and po_cd in (${sqlPoCd})`;
                }

                var tSQL = `
                    select
                        *
                    from
                        ksv_stock_mem2_stsin
                    where
                        pu_cd = '${col.PU_CD}' ${sqlPoCd}
                        and vendor_cd = '${col.VENDOR_CD}'
                `;
                var nRet0 = [];
                if (col.PU_CD !== '')
                    nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));

                var tIdx2 = 0;
                for (tIdx2 = 0; tIdx2 < nRet0.length; tIdx2++) {
                    var tOne2 = {
                        ...nRet0[tIdx2],
                    };

                    let tSQL99 = `
                        update ksv_stock_mem2_stsin
                        set
                            tax_kind = '${tTaxKind}',
                            end_flag = '1',
                            end_date = '${tEndDate}',
                            pay_date = '${tPayDate}',
                            bill_cd = '${tBillCd}',
                            curr_cd = '${tPayCurrCd}',
                            pur_app = '${tPurApp}',
                            tt_flag = '${tTTFlag}',
                            lc_flag = '${tLCFlag}'
                            -- po_amt = ${col.PO_AMT}, 
                            -- pay_amt = ${col.PAY_AMT}, 
                            -- vat_amt = pay_amt * ${tTaxRate}
                            -- deposit_amt = ${tDepositAmt}, 
                            -- lc_amt = ${tLcAmt} 
                        where
                            pu_cd = '${tOne2.PU_CD}'
                            and po_cd = '${tOne2.PO_CD}'
                            and vendor_cd = '${tOne2.VENDOR_CD}'
                            and matl_cd = '${tOne2.MATL_CD}'
                            and (
                                end_flag is null
                                or end_flag <> '1'
                            )
                            -- and   stsin_cd = '${tOne2.STSIN_CD}'
                            -- and   (bill_cd is null or bill_cd = '')
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    if (!tInEdit.BILL_CD) tSQLArray.push(tSQL99_1);
                }

                var sqlTmp = '';
                if (tInEdit.BILL_CD) {
                    sqlTmp = ` and   (a.end_flag is not null and  a.end_flag = '1') `;
                } else {
                    sqlTmp = ` and   (a.end_flag is null or a.end_flag <> '1') `;
                }

                var sqlStsIn = `
                    select
                        a.*
                    from
                        ksv_stock_in a,
                        kcd_matl_mst b,
                        kcd_buyer c,
                        kcd_user d
                    where
                        1 = 1 ${sqlPoCd2}
                        and a.matl_cd = b.matl_cd
                        and left(a.order_cd, 2) = c.buyer_cd
                        and c.reg_user = d.user_id
                        and d.company_code = '${col.COMPANY_CODE}'
                        and left(a.in_datetime, 8) = '${col.IN_DATE}'
                        and a.pay_date = '${col.PAY_DATE}'
                        and b.vendor_cd = '${col.VENDOR_CD}'
                        and (
                            a.pay_curr_cd = '${col.CURR_CD}'
                            or a.in_curr_cd = '${col.CURR_CD}'
                        )
                        and a.pay_report = '${col.PAY_REPORT}'
                        and a.pur_app = '${col.PUR_APP}'
                        and a.reg_user = '${col.PURCHARGER}'
                        and a.tt_flag = '${col.TT_FLAG}' ${sqlTmp}
                `;
                var retStsIn = await prisma.$queryRaw(Prisma.raw(sqlStsIn));
                if (retStsIn.length <= 0) {
                    /*
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = `ERROR:ksv_stock_in 에 데이타 없음:${col.IN_DATE}, ${col.PAY_DATE}, ${col.VENDOR_CD}, ${col.CURR_CD}`;
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return (tRetArray);
                    */
                }
                tIdx2 = 0;
                for (tIdx2 = 0; tIdx2 < retStsIn.length; tIdx2++) {
                    var tObj3 = {
                        ...retStsIn[tIdx2],
                    };
                    var tTax = 0;
                    if (parseFloat(tInEdit.VAT_AMT) > 0)
                        tTax = AFLib.numToFixed(parseFloat(tInEdit.VAT_AMT), 2);

                    var puSql = '';
                    if (!tObj3.PU_CD);
                    else puSql = `and   pu_cd = '${tObj3.PU_CD}'`;

                    // End시 Bill Ok 처리도 같이함. Calc_flag = 1
                    // Calc_flag =0.  calc_flag = 1는 bill_manager 에서
                    let tSQL99 = `
                        update ksv_stock_in
                        set
                            tt_flag = '${tTTFlag}',
                            pur_app = '${tPurApp}',
                            pay_report = '${tPayReport}',
                            end_flag = '1',
                            calc_flag = '0',
                            pay_date = '${tBillObj.PAY_DATE}',
                            end_date = '${tEndDate}',
                            tax = '${tTax}',
                            pur_factory = '${tPurFactory}',
                            bill_no = '${tBillCd}'
                        where
                            po_cd = '${tObj3.PO_CD}'
                            and po_seq = '${tObj3.PO_SEQ}'
                            and order_cd = '${tObj3.ORDER_CD}'
                            and matl_cd = '${tObj3.MATL_CD}'
                            and mrp_seq = '${tObj3.MRP_SEQ}'
                            and matl_seq = '${tObj3.MATL_SEQ}'
                            and in_datetime = '${tObj3.IN_DATETIME}' ${puSql}
                            and pay_date = '${tObj3.PAY_DATE}'
                            and (
                                in_curr_cd = '${col.CURR_CD}'
                                or pay_curr_cd = '${col.CURR_CD}'
                            )
                            and (
                                end_flag is null
                                or end_flag <> '1'
                            )
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    if (!tInEdit.BILL_CD) tSQLArray.push(tSQL99_1);
                    else {
                        let tSQL99 = `
                            update ksv_stock_in
                            set
                                tax = '${tTax}',
                                pay_date = '${tBillObj.PAY_DATE}',
                                tt_flag = '${tTTFlag}',
                                pur_factory = '${tPurFactory}'
                            where
                                po_cd = '${tObj3.PO_CD}'
                                and po_seq = '${tObj3.PO_SEQ}'
                                and order_cd = '${tObj3.ORDER_CD}'
                                and matl_cd = '${tObj3.MATL_CD}'
                                and mrp_seq = '${tObj3.MRP_SEQ}'
                                and matl_seq = '${tObj3.MATL_SEQ}'
                                and in_datetime = '${tObj3.IN_DATETIME}' ${puSql}
                                and pay_date = '${tObj3.PAY_DATE}'
                                and (
                                    in_curr_cd = '${col.CURR_CD}'
                                    or pay_curr_cd = '${col.CURR_CD}'
                                )
                                and (
                                    end_flag is not null
                                    and end_flag = '1'
                                )
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);
                    }
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
                tObj.CODE = `ERROR:MATL Endding Error:${e.message}`;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            // 
            tSQLArray = [];
            var sqlStsIn1 = `
               select
                     distinct
                     a.pu_cd,
                     isnull(a.lc_bill_no, '') as lc_bill_no
                from ksv_stock_in a
                     left join ksv_stock_in b on a.po_cd = b.po_cd
                                             and a.po_seq = b.po_seq
                                             and a.order_cd = b.order_cd
                                             and a.matl_cd = b.matl_cd
                                             and a.lc_bill_no = b.pay_report
                                             and b.lc_qty > 0
                                             and b.in_qty <= 0
                where a.bill_no = '${tBillCd}'
                 and  isnull(a.lc_bill_no, '') <> ''
            `;
            var retStsIn1 = await prisma.$queryRaw(Prisma.raw(sqlStsIn1));
            var tIdx1 = 0;
            for (tIdx1 = 0; tIdx1 < retStsIn1.length; tIdx1 ++) {
                 var tObj1 = { ...retStsIn1[tIdx1] };
                 let tSQL99 = `
                     update ksv_pu_lcdeposit set bill_cd = '${tBillCd}'
                     where pu_cd = '${tObj1.pu_cd}'
                     and   pay_report = '${tObj1.lc_bill_no}'
                     and   (bill_cd is null or  bill_cd = '')
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
                tObj.CODE = `ERROR:MATL Endding Error:${e.message}`;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED:' + tBillCd;
            tObj.id = 0;
            tRetArray.push(tObj);


            return tRetArray;
        },

        mgrInsert_S0419_5_1229: async (_, args, contextValue) => {
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
            var tInEdit = {
                ...args.datas1,
            };
            var tInList = [...args.datas];
            var tSQLArray = [];

            var tCheckBill = 0;
            var tCheckCalc = 0;

            var tEndDate = tRetDate1;
            var tPayDate = tInEdit.PAY_DATE;
            var tPayCurrCd = tInEdit.CURR_CD;

            var tYY2 = tRetDate.substring(2, 4);
            var tSEQ = tRetDate.substring(4, 14);

            var tZero = '000000';
            var tBillCd = `BILL${tYY2}-${tSEQ}`;

            var tPurApp = '';
            var tTTFlag = '0';
            var tLCFlag = '0';
            var tTaxRate = 0;

            var billMst = {};
            var m_TAXBILL_MST = {};
            if (tInEdit.BILL_CD) {
                var tSQL = `
                    select
                        *
                    from
                        ksv_bill_mst
                    where
                        bill_cd = '${tInEdit.BILL_CD}'
                `;
                var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
                if (nRet0.length > 0)
                    billMst = {
                        ...nRet0[0],
                    };

                var tSQL = `
                    select
                        *
                    from
                        kcd_gw_taxbill_kr
                    where
                        bill_cd = '${tInEdit.BILL_CD}'
                `;
                var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
                var tCheck = 0;
                nRet0.forEach((col, i) => {
                    if (!col.APPROKEY)
                        m_TAXBILL_MST = {
                            ...col,
                        };
                    else {
                        if (col.STATUS_CD === '1' || col.STATUS_CD === '2')
                            tCheck = 1;
                    }
                });

                if (tCheck > 0) {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = `ERROR:Bill Reisgier: You cannot modify an updated Bill`;
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }
            }

            if (!tInEdit.PUR_FACTORY) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = `ERROR:Bill Reisgier: Pur Factory is required. (${tInEdit.PUR_FACTORY})`;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tCheckCompany = 0;
            var tSaveCompany = 0;
            tInList.forEach((col, i) => {
                if (i === 0) tSaveCompany = col.COMPANY_CODE;
                else {
                    if (tSaveCompany !== col.COMPANY_CODE) tCheckCompany = 1;
                }
            });

            if (tCheckCompany === 1) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = `ERROR:Bill Reisgier: You can use the same company close. Please refer to the company code. `;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            // 금액계산
            var tBillObj = {};
            tBillObj.BILL_CD = tBillCd;
            tBillObj.INVOICE_DATE = tInEdit.INVOICE_DATE;
            tBillObj.PAY_DATE = tInEdit.PAY_DATE;
            tBillObj.CURR_CD = tInEdit.CURR_CD;
            tBillObj.PO_AMT = tInEdit.PO_AMT;

            tLCFlag = tInEdit.IS_LC;
            tTTFlag = tInEdit.IS_TT;
            tBillObj.DEPOSIT_AMT = '0';

            if (parseFloat(tInEdit.DEPOSIT_AMT) > 0) {
                if (
                    parseFloat(tInEdit.PO_AMT) ===
                    parseFloat(tInEdit.DEPOSIT_AMT)
                ) {
                    tLCFlag = '1';
                    tTTFlag = '0';
                    tBillObj.DEPOSIT_AMT = '0';
                    tBillObj.LC_AMT = tInEdit.PO_AMT;
                } else {
                    tLCFlag = '0';
                    tTTFlag = '1';
                    tBillObj.DEPOSIT_AMT = tInEdit.DEPOSIT_AMT;
                    tBillObj.LC_AMT = '0';
                }
            }
            tBillObj.DEBIT_AMT = tInEdit.DEBIT_AMT;

            var tPayReport = `${tUserInfo.USER_ID}[${tInEdit.PAY_BANK}]-${tRetDate}`;
            // Deposit-100-chuck[B18-0006]-20240112092922
            // lauren[B20-0019]-20220114183415
            // lauren-20211229163725
            if (parseFloat(tBillObj.DEPOSIT_AMT) > 0) {
                var tDepositRate = parseInt(
                    (parseFloat(tBillObj.DEPOSIT_AMT) /
                        parseFloat(tBillObj.PO_AMT)) *
                        100.0,
                );
                tPayReport = `Deposit-${tDepositRate}-${tUserInfo.USER_ID}[${tInEdit.PAY_BANK}]-${tRetDate}`;
            }
            if (parseFloat(tBillObj.LC_AMT) > 0) {
                tPayReport = `LC-${tUserInfo.USER_ID}[${tBillObj.PAY_BANK}]-${tRetDate}`;
            }
            /* 이제 모든 국내/수입 업체 전부다 GW 함
        if (tInList[0].VENDOR_TYPE !== '3') { // 국내자재업체, 수입자재업체
            tPayReport = '';
        }
		  */
            var tPayReport = `${tUserInfo.USER_ID}[${tInEdit.PAY_BANK}]-${tRetDate}`;

            var tInObj9 = {
                ...tInList[0],
            };
            var tSQL = `
                select
                    *
                from
                    ksv_pu_mst2
                where
                    pu_cd = '${tInObj9.PU_CD}'
            `;
            var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
            var tPurFactory = '';
            if (tInEdit.PUR_FACTORY !== '') {
                tPurFactory = tInEdit.PUR_FACTORY;
            } else {
                if (nRet0.length > 0) {
                    var tObj9 = {
                        ...nRet0[0],
                    };
                    if (tObj9.BILL_TO === 'SHINTS') tPurFactory = 'FC045';
                    else if (tObj9.BILL_TO === 'BVT') tPurFactory = 'FC034';
                    else if (tObj9.BILL_TO === 'ETP') tPurFactory = 'FC044';
                }
            }

            tBillObj.PAY_REPORT = tPayReport;
            // tBillObj.PAY_REPORT = '';
            tBillObj.COMPANY_CODE = tInObj9.COMPANY_CODE;
            tBillObj.DISCOUNT_AMT = tInEdit.DISCOUNT_AMT;
            tBillObj.INVOICE_NO = tInEdit.INVOICE_NO;
            tBillObj.VAT_AMT = tInEdit.VAT_AMT;
            tBillObj.PAY_AMT = tInEdit.PAY_AMT;
            tInEdit.END_AMT = '0';
            tBillObj.PAID_AMT = tInEdit.END_AMT;
            tBillObj.ROOT_BILL_CD = tBillCd;
            tBillObj.REG_USER = tUserInfo.USER_ID;
            tBillObj.REG_DATETIME = tRetDate;
            tBillObj.TAX_KIND = tInEdit.TAX_KIND;
            tBillObj.VENDOR_CD = tInEdit.VENDOR_CD;
            tBillObj.GW_STATUS = '0';
            tBillObj.PAY_BANK = tInEdit.PAY_BANK;
            tBillObj.PUR_FACTORY = tPurFactory;
            tBillObj.BILL_FLAG = '1';

            if (tInEdit.BILL_CD) {
                tPayReport = billMst.PAY_REPORT;
                tBillObj.BILL_CD = tInEdit.BILL_CD;
            }

            // TAXBILL 생성
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

            let sql0_2 = `
                select
                    *
                from
                    kcd_currency
                where
                    curr_cd = '${tBillObj.CURR_CD}'
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
                        curr_cd = '${tBillObj.CURR_CD}'
                        and start_date = (
                            select
                                max(start_date)
                            from
                                kcd_currency
                            where
                                curr_cd = '${tBillObj.CURR_CD}'
                        )
                `;
                var nRet0_2 = await prisma.$queryRaw(Prisma.raw(sql0_2));
                if (nRet0_2.length > 0)
                    wWonAmt2 = parseFloat(nRet0_2[0].WON_AMT2);
            }

            var wWonAmt = 0;
            var wWonRate = 0;
            if (tBillObj.CURR_CD === 'KRW') {
                wWonAmt = tBillObj.PAY_AMT;
                wWonRate = 1;
            } else {
                wWonAmt = AFLib.numToFixed(
                    parseFloat(tBillObj.PAY_AMT) * parseFloat(wWonAmt2),
                    2,
                );
                wWonRate = String(AFLib.numToFixed(wWonAmt2, 4));
            }

            var tTaxKind = '';
            var tTaxRate = '';
            var tTaxAmt = '';
            var tPurApp = '';
            if (tInEdit.TAX_KIND === '1' || tInEdit.TAX_KIND === '10') {
                // 과세
                tTaxKind = '1';
                tTaxRate = 0.1;
                tTaxAmt = parseFloat(tBillObj.PAY_AMT) * 10.0;
                tPurApp = 'X';
            } else if (tInEdit.TAX_KIND === '2') {
                // 영세
                tTaxKind = '2';
                tTaxAmt = 0;
                tPurApp = 'X';
            } else if (tInEdit.TAX_KIND === '3') {
                // 면세
                tTaxKind = '3';
                tTaxAmt = 0;
                tPurApp = 'O';
            } else if (tInEdit.TAX_KIND === '4') {
                //  TT
                tTaxKind = '3';
                tLCFlag = '0';
                tTTFlag = '1';
                tTaxAmt = 0;
                tPurApp = 'O';
            } else if (tInEdit.TAX_KIND === '8') {
                tTaxKind = '1';
                tTaxRate = 0.08;
                tTaxAmt = parseFloat(tBillObj.PAY_AMT) * 8.0;
                tPurApp = 'X';
            }

            var sqlGwTaxBill = `
                select
                    *
                from
                    kcd_gw_taxbill_kr
                where
                    taxbill_cd = '${m_TAXBILL_CD}'
            `;
            var retGwTaxBill = await prisma.$queryRaw(Prisma.raw(sqlGwTaxBill));

            var tTaxbillObj = {};
            tTaxbillObj.DOC_NO = tBillObj.PAY_REPORT;
            tTaxbillObj.VENDOR_CD = tBillObj.VENDOR_CD;
            tTaxbillObj.CLOSING_DATE = tBillObj.INVOICE_DATE;
            tTaxbillObj.PAY_DATE = tBillObj.PAY_DATE;
            tTaxbillObj.CURR_CD = tBillObj.CURR_CD;
            tTaxbillObj.PUR_APP = tPurApp;
            tTaxbillObj.TT_FLAG = tTTFlag;
            tTaxbillObj.STATUS_CD = '';
            tTaxbillObj.PUR_FACTORY = tBillObj.PUR_FACTORY;
            tTaxbillObj.TAX = tBillObj.VAT_AMT;
            tTaxbillObj.MINUS_AMOUNT = tBillObj.DISCOUNT_AMT;
            tTaxbillObj.TOT_AMOUNT = tBillObj.PAY_AMT;
            tTaxbillObj.TAXBILL_DATE = tRetDate1;
            tTaxbillObj.TAXBILL_CD = m_TAXBILL_CD;
            tTaxbillObj.PAY_BANK = tBillObj.PAY_BANK;
            tTaxbillObj.BILL_CD = tBillCd;
            tTaxbillObj.STSIN_CD = '';
            tTaxbillObj.YEAR = tRetDate.substring(0, 4);
            tTaxbillObj.REG_USER = tUserInfo.USER_ID;
            tTaxbillObj.REG_DATETIME = tRetDate;
            tTaxbillObj.APPROKEY = '';
            tTaxbillObj.KRW_AMOUNT = wWonAmt;
            tTaxbillObj.CURR_RATE = wWonRate;
            let tSQL99 = AFLib.createTableSql('KCD_GW_TAXBILL_KR', tTaxbillObj);
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));

            if (tInEdit.BILL_CD) {
                var sqlTaxBill = `
                    update kcd_gw_taxbill_kr
                    set
                        TT_FLAG = '${tTaxbillObj.TT_FLAG}',
                        PUR_FACTORY = '${tTaxbillObj.PUR_FACTORY}',
                        TAX = '${tTaxbillObj.TAX}',
                        MINUS_AMOUNT = '${tTaxbillObj.MINUS_AMOUNT}',
                        TOT_AMOUNT = '${tTaxbillObj.TOT_AMOUNT}',
                        KRW_AMOUNT = '${tTaxbillObj.KRW_AMOUNT}'
                    where
                        TAXBILL_CD = '${m_TAXBILL_MST.TAXBILL_CD}'
                `;
                var retTaxBill = prisma.$queryRaw(Prisma.raw(sqlTaxBill));
                // tSQLArray.push(retTaxBill);
            } else if (retGwTaxBill.length > 0) {
                var tmpTaxBillCd = retGwTaxBill[0].TAXBILL_CD;
                var sqlTaxBill = `
                    update kcd_gw_taxbill_kr
                    set
                        TT_FLAG = '${tTaxbillObj.TT_FLAG}',
                        PUR_FACTORY = '${tTaxbillObj.PUR_FACTORY}',
                        TAX = '${tTaxbillObj.TAX}',
                        MINUS_AMOUNT = '${tTaxbillObj.MINUS_AMOUNT}',
                        TOT_AMOUNT = '${tTaxbillObj.TOT_AMOUNT}',
                        KRW_AMOUNT = '${tTaxbillObj.KRW_AMOUNT}'
                    where
                        TAXBILL_CD = '${tmpTaxBillCd}'
                `;
                var retTaxBill = prisma.$queryRaw(Prisma.raw(sqlTaxBill));
                // tSQLArray.push(retTaxBill);
            } else {
                tSQLArray.push(tSQL99_1);
            }

            tBillObj.TAXBILL_CD = m_TAXBILL_CD;
            let tSQL99 = AFLib.createTableSql('KSV_BILL_MST', tBillObj);
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            if (tInEdit.BILL_CD) {
                var sqlTaxBill = `
                    update ksv_bill_mst
                    set
                        DISCOUNT_AMT = '${tBillObj.DISCOUNT_AMT}',
                        VAT_AMT = '${tBillObj.VAT_AMT}',
                        PAY_BANK = '${tBillObj.PAY_BANK}',
                        PAY_AMT = '${tBillObj.PAY_AMT}',
                        TAX_KIND = '${tBillObj.TAX_KIND}'
                    where
                        bill_cd = '${tInEdit.BILL_CD}'
                `;
                var retTaxBill = prisma.$queryRaw(Prisma.raw(sqlTaxBill));
                tSQLArray.push(retTaxBill);
            } else {
                tSQLArray.push(tSQL99_1);
            }

            var tDcObj = {};
            tDcObj.end_date = tBillObj.INVOICE_DATE;
            tDcObj.pay_date = tBillObj.PAY_DATE;
            tDcObj.vendor_cd = tBillObj.VENDOR_CD;
            tDcObj.dc_amount = tBillObj.DISCOUNT_AMT;
            tDcObj.curr_cd = tBillObj.CURR_CD;
            tDcObj.calc_flag = '1'; // End시 Bill Ok처리
            if (tInEdit.IS_TT === '1') tDcObj.tt_flag = '1';
            else tDcObj.tt_flag = '0';
            tDcObj.pur_factory = tPurFactory;
            tDcObj.pay_report = tPayReport;
            tDcObj.stsin_cd = '';
            tDcObj.bill_cd = tBillObj.BILL_CD;

            var sqlDcAmount = `
                select
                    *
                from
                    ksv_dc_amount
                where
                    end_date = '${tDcObj.end_date}'
                    and vendor_cd = '${tDcObj.vendor_cd}'
                    and curr_cd = '${tDcObj.curr_cd}'
                    and pay_date = '${tDcObj.pay_date}'
                    -- and   calc_flag = '${tDcObj.calc_flag}'
                    -- and   tt_flag = '${tDcObj.tt_flag}'
                    -- and   pur_factory = '${tDcObj.pur_factory}'
                    -- and   pay_report = '${tDcObj.pay_report}'
            `;
            var retDcAmount = await prisma.$queryRaw(Prisma.raw(sqlDcAmount));

            /*
                  if (tInEdit.BILL_CD) {
                      var sqlDcUpdate = `
                          delete from ksv_dc_amount
                          where
                              bill_cd = '${tInEdit.BILL_CD}'
                      `;
                      var retDcUpdate = prisma.$queryRaw(Prisma.raw(sqlDcUpdate));
                      tSQLArray.push(retDcUpdate);

                      var sqlDcUpdate = `
                          delete from ksv_dc_amount
                          where
                              end_date = '${tDcObj.end_date}'
                              and vendor_cd = '${tDcObj.vendor_cd}'
                              and curr_cd = '${tDcObj.curr_cd}'
                              and pay_date = '${tDcObj.pay_date}'
                              -- and   calc_flag = '${tDcObj.calc_flag}'
                              -- and   tt_flag = '${tDcObj.tt_flag}'
                              -- and   pur_factory = '${tDcObj.pur_factory}'
                              -- and   pay_report = '${tDcObj.pay_report}'
                      `;
                      var retDcUpdate = prisma.$queryRaw(Prisma.raw(sqlDcUpdate));
                      tSQLArray.push(retDcUpdate);
                      retDcAmount = [];
                  }
            */

            if (retDcAmount.length <= 0) {
                let tSQL99 = AFLib.createTableSql('KSV_DC_AMOUNT', tDcObj);
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            } else {
                var sqlDcUpdate = `
                    -- update ksv_dc_amount set dc_amount = dc_amount + ${tDcObj.dc_amount}
                    update ksv_dc_amount
                    set
                        dc_amount = ${tDcObj.dc_amount}
                    where
                        end_date = '${tDcObj.end_date}'
                        and vendor_cd = '${tDcObj.vendor_cd}'
                        and curr_cd = '${tDcObj.curr_cd}'
                        and pay_date = '${tDcObj.pay_date}'
                        -- and   calc_flag = '${tDcObj.calc_flag}'
                        -- and   tt_flag = '${tDcObj.tt_flag}'
                        -- and   pur_factory = '${tDcObj.pur_factory}'
                        -- and   pay_report = '${tDcObj.pay_report}'
                `;
                var retDcUpdate = prisma.$queryRaw(Prisma.raw(sqlDcUpdate));
                tSQLArray.push(retDcUpdate);
            }

            let tSQL99 = `
                update ksv_stock_in_mst
                set
                    calc_flag = '1',
                    -- pay_curr_cd = '${tBillObj.curr_cd}', 
                    -- pay_amt = '${tBillObj.PAY_AMT}', 
                    -- bill_flag = '1',  
                    -- bill_date = '${tRetDate1}', 
                    taxbill_cd = '${m_TAXBILL_CD}',
                    -- tax = '${tBillObj.VAT_AMT}', 
                    pur_app = '${tPurApp}'
                where
                    stsin_cd in (
                        select distinct
                            stsin_cd
                        from
                            ksv_stock_mem2_stsin
                        where
                            bill_cd = '${tBillObj.BILL_CD}'
                    )
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            if (!tInEdit.BILL_CD) tSQLArray.push(tSQL99_1);

            var tIdx = 0;
            for (tIdx = 0; tIdx < tInList.length; tIdx++) {
                var col = {
                    ...tInList[tIdx],
                };

                tTaxKind = '3';
                tTaxAmt = 0;

                if (col.LC_FLAG === '1') {
                    tLCFlag = '1';
                    tTTFlag = '0';
                } else {
                    tLCFlag = '0';
                    tTTFlag = '1';
                }

                var tDepositAmt =
                    parseFloat(col.PAY_AMT) *
                    parseFloat(col.DEPOSIT_RATE) *
                    0.01;
                var tLcAmt = 0;
                if (col.LC_FLAG === '1') tLcAmt = parseFloat(col.PAY_AMT);

                var sqlPoCd = '';
                var sqlPoCd2 = '';
                var tCols = col.PO_CD2.split('/');
                tCols.forEach((col, i) => {
                    if (col !== '') {
                        if (i === 0) sqlPoCd = ` '${col}' `;
                        else sqlPoCd += ` ,'${col}' `;
                    }
                });
                if (sqlPoCd !== '') {
                    sqlPoCd2 = `and a.po_cd in (${sqlPoCd})`;
                    sqlPoCd = `and po_cd in (${sqlPoCd})`;
                }

                var tSQL = `
                    select
                        *
                    from
                        ksv_stock_mem2_stsin
                    where
                        pu_cd = '${col.PU_CD}' ${sqlPoCd}
                        and vendor_cd = '${col.VENDOR_CD}'
                `;
                var nRet0 = [];
                if (col.PU_CD !== '')
                    nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));

                var tIdx2 = 0;
                for (tIdx2 = 0; tIdx2 < nRet0.length; tIdx2++) {
                    var tOne2 = {
                        ...nRet0[tIdx2],
                    };

                    let tSQL99 = `
                        update ksv_stock_mem2_stsin
                        set
                            tax_kind = '${tTaxKind}',
                            end_flag = '1',
                            end_date = '${tEndDate}',
                            pay_date = '${tPayDate}',
                            bill_cd = '${tBillCd}',
                            curr_cd = '${tPayCurrCd}',
                            pur_app = '${tPurApp}',
                            tt_flag = '${tTTFlag}',
                            lc_flag = '${tLCFlag}'
                            -- po_amt = ${col.PO_AMT}, 
                            -- pay_amt = ${col.PAY_AMT}, 
                            -- vat_amt = pay_amt * ${tTaxRate}
                            -- deposit_amt = ${tDepositAmt}, 
                            -- lc_amt = ${tLcAmt} 
                        where
                            pu_cd = '${tOne2.PU_CD}'
                            and po_cd = '${tOne2.PO_CD}'
                            and vendor_cd = '${tOne2.VENDOR_CD}'
                            and matl_cd = '${tOne2.MATL_CD}'
                            and (
                                end_flag is null
                                or end_flag <> '1'
                            )
                            -- and   stsin_cd = '${tOne2.STSIN_CD}'
                            -- and   (bill_cd is null or bill_cd = '')
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    if (!tInEdit.BILL_CD) tSQLArray.push(tSQL99_1);
                }

                var sqlTmp = '';
                if (tInEdit.BILL_CD) {
                    sqlTmp = ` and   (a.end_flag is not null and  a.end_flag = '1') `;
                } else {
                    sqlTmp = ` and   (a.end_flag is null or a.end_flag <> '1') `;
                }

                var sqlStsIn = `
                    select
                        a.*
                    from
                        ksv_stock_in a,
                        kcd_matl_mst b,
                        kcd_buyer c,
                        kcd_user d
                    where
                        1 = 1 ${sqlPoCd2}
                        and a.matl_cd = b.matl_cd
                        and left(a.order_cd, 2) = c.buyer_cd
                        and c.reg_user = d.user_id
                        and d.company_code = '${col.COMPANY_CODE}'
                        and left(a.in_datetime, 8) = '${col.IN_DATE}'
                        and a.pay_date = '${col.PAY_DATE}'
                        and b.vendor_cd = '${col.VENDOR_CD}'
                        and (
                            a.pay_curr_cd = '${col.CURR_CD}'
                            or a.in_curr_cd = '${col.CURR_CD}'
                        )
                        and a.pay_report = '${col.PAY_REPORT}'
                        and a.pur_app = '${col.PUR_APP}'
                        and a.tt_flag = '${col.TT_FLAG}' ${sqlTmp}
                `;
                var retStsIn = await prisma.$queryRaw(Prisma.raw(sqlStsIn));
                if (retStsIn.length <= 0) {
                    /*
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = `ERROR:ksv_stock_in 에 데이타 없음:${col.IN_DATE}, ${col.PAY_DATE}, ${col.VENDOR_CD}, ${col.CURR_CD}`;
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return (tRetArray);
                    */
                }
                tIdx2 = 0;
                for (tIdx2 = 0; tIdx2 < retStsIn.length; tIdx2++) {
                    var tObj3 = {
                        ...retStsIn[tIdx2],
                    };
                    var tTax = 0;
                    if (parseFloat(tInEdit.VAT_AMT) > 0)
                        tTax = AFLib.numToFixed(parseFloat(tInEdit.VAT_AMT), 2);

                    var puSql = '';
                    if (!tObj3.PU_CD);
                    else puSql = `and   pu_cd = '${tObj3.PU_CD}'`;

                    // End시 Bill Ok 처리도 같이함. Calc_flag = 1
                    let tSQL99 = `
                        update ksv_stock_in
                        set
                            tt_flag = '${tTTFlag}',
                            pur_app = '${tPurApp}',
                            pay_report = '${tPayReport}',
                            end_flag = '1',
                            calc_flag = '1',
                            end_date = '${tEndDate}',
                            tax = '${tTax}',
                            pur_factory = '${tPurFactory}',
                            bill_no = '${tBillCd}'
                        where
                            po_cd = '${tObj3.PO_CD}'
                            and in_datetime = '${tObj3.IN_DATETIME}'
                            and po_seq = '${tObj3.PO_SEQ}'
                            and matl_cd = '${tObj3.MATL_CD}'
                            and mrp_seq = '${tObj3.MRP_SEQ}'
                            and matl_seq = '${tObj3.MATL_SEQ}' ${puSql}
                            and pay_date = '${tObj3.PAY_DATE}'
                            and (
                                in_curr_cd = '${col.CURR_CD}'
                                or pay_curr_cd = '${col.CURR_CD}'
                            )
                            and (
                                end_flag is null
                                or end_flag <> '1'
                            )
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    if (!tInEdit.BILL_CD) tSQLArray.push(tSQL99_1);
                    else {
                        let tSQL99 = `
                            update ksv_stock_in
                            set
                                tax = '${tTax}',
                                tt_flag = '${tTTFlag}',
                                pur_factory = '${tPurFactory}'
                            where
                                po_cd = '${tObj3.PO_CD}'
                                and in_datetime = '${tObj3.IN_DATETIME}'
                                and po_seq = '${tObj3.PO_SEQ}'
                                and matl_cd = '${tObj3.MATL_CD}'
                                and mrp_seq = '${tObj3.MRP_SEQ}'
                                and matl_seq = '${tObj3.MATL_SEQ}' ${puSql}
                                and pay_date = '${tObj3.PAY_DATE}'
                                and (
                                    in_curr_cd = '${col.CURR_CD}'
                                    or pay_curr_cd = '${col.CURR_CD}'
                                )
                                and (
                                    end_flag is not null
                                    and end_flag = '1'
                                )
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);
                    }
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
                tObj.CODE = `ERROR:MATL Endding Error:${e.message}`;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED:' + tBillCd;
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },

        mgrInsert_S0419_5_bak: async (_, args, contextValue) => {
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
            var tInEdit = {
                ...args.datas1,
            };
            var tInList = [...args.datas];
            var tSQLArray = [];

            var tCheckBill = 0;
            var tCheckCalc = 0;

            var tEndDate = tRetDate1;
            var tPayDate = tInEdit.PAY_DATE;
            var tPayCurrCd = tInEdit.CURR_CD;

            var tYY2 = tRetDate.substring(2, 4);
            var tSEQ = tRetDate.substring(4, 14);

            var tZero = '000000';
            var tBillCd = `BILL${tYY2}-${tSEQ}`;

            var tPurApp = '';
            var tTTFlag = '0';
            var tLCFlag = '0';
            var tTaxRate = 0;

            if (!tInEdit.PUR_FACTORY) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = `ERROR:Bill Reisgier: Pur Factory는 필수입니다(${tInEdit.PUR_FACTORY})`;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tCheckCompany = 0;
            var tSaveCompany = 0;
            tInList.forEach((col, i) => {
                if (i === 0) tSaveCompany = col.COMPANY_CODE;
                else {
                    if (tSaveCompany !== col.COMPANY_CODE) tCheckCompany = 1;
                }
            });

            if (tCheckCompany === 1) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = `ERROR:Bill Reisgier: 같은 Company Close할수 있습니다. Company Code 참고해주세요 `;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tBillObj = {};
            tBillObj.BILL_CD = tBillCd;
            tBillObj.INVOICE_DATE = tInEdit.INVOICE_DATE;
            tBillObj.PAY_DATE = tInEdit.PAY_DATE;
            tBillObj.CURR_CD = tInEdit.CURR_CD;
            tBillObj.PO_AMT = tInEdit.PO_AMT;
            if (tInList[0].LC_FLAG === '1') {
                tBillObj.DEPOSIT_AMT = '0';
                tBillObj.LC_AMT = tInEdit.PO_AMT;
            } else {
                tBillObj.DEPOSIT_AMT = tInEdit.DEPOSIT_AMT;
                tBillObj.LC_AMT = '0';
            }
            tBillObj.DEBIT_AMT = tInEdit.DEBIT_AMT;

            var tPayReport = `${tUserInfo.USER_ID}[${tInEdit.PAY_BANK}]-${tRetDate}`;
            // Deposit-100-chuck[B18-0006]-20240112092922
            // lauren[B20-0019]-20220114183415
            // lauren-20211229163725
            if (parseFloat(tBillObj.DEPOSIT_AMT) > 0) {
                var tDepositRate = parseInt(
                    (parseFloat(tBillObj.DEPOSIT_AMT) /
                        parseFloat(tBillObj.PO_AMT)) *
                        100.0,
                );
                tPayReport = `Deposit-${tDepositRate}-${tUserInfo.USER_ID}[${tInEdit.PAY_BANK}]-${tRetDate}`;
            }
            if (parseFloat(tBillObj.LC_AMT) > 0) {
                tPayReport = `LC-${tUserInfo.USER_ID}[${tBillObj.PAY_BANK}]-${tRetDate}`;
            }
            /* 이제 모든 국내/수입 업체 전부다 GW 함
      if (tInList[0].VENDOR_TYPE !== '3') { // 국내자재업체, 수입자재업체
          tPayReport = '';
      }
			*/

            var tInObj9 = {
                ...tInList[0],
            };
            var tSQL = `
                select
                    *
                from
                    ksv_pu_mst2
                where
                    pu_cd = '${tInObj9.PU_CD}'
            `;
            var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
            var tPurFactory = '';
            if (tInEdit.PUR_FACTORY !== '') {
                tPurFactory = tInEdit.PUR_FACTORY;
            } else {
                if (nRet0.length > 0) {
                    var tObj9 = {
                        ...nRet0[0],
                    };
                    if (tObj9.BILL_TO === 'SHINTS') tPurFactory = 'FC045';
                    else if (tObj9.BILL_TO === 'BVT') tPurFactory = 'FC034';
                    else if (tObj9.BILL_TO === 'ETP') tPurFactory = 'FC044';
                }
            }

            tBillObj.PAY_REPORT = tPayReport;
            tBillObj.DISCOUNT_AMT = tInEdit.DISCOUNT_AMT;
            tBillObj.VAT_AMT = tInEdit.VAT_AMT;
            tBillObj.PAY_AMT = tInEdit.PAY_AMT;
            if (!tInEdit.END_AMT) tInEdit.END_AMT = '0';
            tBillObj.PAID_AMT = tInEdit.END_AMT;
            tBillObj.ROOT_BILL_CD = tBillCd;
            tBillObj.REG_USER = tUserInfo.USER_ID;
            tBillObj.REG_DATETIME = tRetDate;
            tBillObj.TAX_KIND = tInEdit.TAX_KIND;
            tBillObj.VENDOR_CD = tInEdit.VENDOR_CD;
            tBillObj.GW_STATUS = '0';
            tBillObj.PAY_BANK = tInEdit.PAY_BANK;
            tBillObj.PUR_FACTORY = tPurFactory;
            let tSQL99 = AFLib.createTableSql('KSV_BILL_MST', tBillObj);
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            var tDcObj = {};
            tDcObj.end_date = tBillObj.INVOICE_DATE;
            tDcObj.pay_date = tBillObj.PAY_DATE;
            tDcObj.vendor_cd = tBillObj.VENDOR_CD;
            tDcObj.dc_amount = tBillObj.DISCOUNT_AMT;
            tDcObj.curr_cd = tBillObj.CURR_CD;
            tDcObj.calc_flag = '0';
            if (tInEdit.IS_TT === '1') tDcObj.tt_flag = '1';
            else tDcObj.tt_flag = '0';
            tDcObj.pur_factory = tPurFactory;
            tDcObj.pay_report = tPayReport;
            tDcObj.stsin_cd = '';
            tDcObj.bill_cd = tBillObj.BILL_CD;

            var sqlDcAmount = `
                select
                    *
                from
                    ksv_dc_amount
                where
                    end_date = '${tDcObj.end_date}'
                    and vendor_cd = '${tDcObj.vendor_cd}'
                    and curr_cd = '${tDcObj.curr_cd}'
                    and calc_flag = '${tDcObj.calc_flag}'
                    and tt_flag = '${tDcObj.tt_flag}'
                    and pur_factory = '${tDcObj.pur_factory}'
                    and pay_date = '${tDcObj.pay_date}'
                    and pay_report = '${tDcObj.pay_report}'
            `;
            var retDcAmount = await prisma.$queryRaw(Prisma.raw(sqlDcAmount));

            if (retDcAmount.length <= 0) {
                let tSQL99 = AFLib.createTableSql('KSV_DC_AMOUNT', tDcObj);
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            } else {
                var sqlDcUpdate = `
                    update ksv_dc_amount
                    set
                        dc_amount = dc_amount + ${tDcObj.dc_amount}
                    where
                        end_date = '${tDcObj.end_date}'
                        and vendor_cd = '${tDcObj.vendor_cd}'
                        and curr_cd = '${tDcObj.curr_cd}'
                        and calc_flag = '${tDcObj.calc_flag}'
                        and tt_flag = '${tDcObj.tt_flag}'
                        and pur_factory = '${tDcObj.pur_factory}'
                        and pay_date = '${tDcObj.pay_date}'
                        and pay_report = '${tDcObj.pay_report}'
                `;
                var retDcUpdate = prisma.$queryRaw(Prisma.raw(sqlDcUpdate));
                tSQLArray.push(retDcUpdate);
            }

            var tIdx = 0;
            for (tIdx = 0; tIdx < tInList.length; tIdx++) {
                var col = {
                    ...tInList[tIdx],
                };
                var tTaxKind = '3';
                var tTaxAmt = 0;
                if (tInEdit.TAX_KIND === '1') {
                    // 과세
                    tTaxKind = '1';
                    tTaxRate = 0.1;
                    tTaxAmt = parseFloat(col.PAY_AMT) * 10.0;
                    tPurApp = 'X';
                    tTTFlag = '0';
                }
                if (tInEdit.TAX_KIND === '2') {
                    // 영세
                    tTaxKind = '2';
                    tTaxAmt = 0;
                    tPurApp = 'X';
                    tTTFlag = '0';
                }
                if (tInEdit.TAX_KIND === '3') {
                    // 면세
                    tTaxKind = '3';
                    tTaxAmt = 0;
                    tPurApp = 'O';
                    tTTFlag = '0';
                }
                if (col.LC_FLAG === '1') {
                    tLCFlag = '1';
                    tTTFlag = '0';
                } else {
                    tLCFlag = '0';
                    tTTFlag = '1';
                }
                if (tInEdit.TAX_KIND === '5') {
                    //  TT
                    tTaxKind = '3';
                    tLCFlag = '0';
                    tTTFlag = '1';
                    tTaxAmt = 0;
                    tPurApp = 'O';
                }

                var tDepositAmt =
                    parseFloat(col.PAY_AMT) *
                    parseFloat(col.DEPOSIT_RATE) *
                    0.01;
                var tLcAmt = 0;
                if (col.LC_FLAG === '1') tLcAmt = parseFloat(col.PAY_AMT);

                var sqlPoCd = '';
                var tCols = col.PO_CD2.split('/');
                tCols.forEach((col, i) => {
                    if (col !== '') {
                        if (i === 0) sqlPoCd = ` '${col}' `;
                        else sqlPoCd += ` ,'${col}' `;
                    }
                });
                if (sqlPoCd !== '') sqlPoCd = `and po_cd in (${sqlPoCd})`;

                var tSQL = `
                    select
                        *
                    from
                        ksv_stock_mem2_stsin
                    where
                        pu_cd = '${col.PU_CD}' ${sqlPoCd}
                        and vendor_cd = '${col.VENDOR_CD}'
                        -- and   matl_cd = '${col.MATL_CD}'
                        -- and   stsin_cd = '${col.STSIN_CD}'
                        -- and   (bill_cd is null or bill_cd = '')
                `;
                var nRet0 = [];
                if (col.PU_CD !== '')
                    nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
                /*
                if (nRet0.length <= 0) {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = `ERROR:ksv_stock_mem2_stsin에 데이타 없음:${col.PU_CD}, ${col.PO_CD}, ${col.VENDOR_CD}, ${col.MATL_CD}, ${col.STSIN_CD}`;
                    tObj.id = 0; 
                    tRetArray.push(tObj);
                    return (tRetArray);
                }
                */

                var tIdx2 = 0;
                for (tIdx2 = 0; tIdx2 < nRet0.length; tIdx2++) {
                    var tOne2 = {
                        ...nRet0[tIdx2],
                    };

                    let tSQL99 = `
                        update ksv_stock_mem2_stsin
                        set
                            tax_kind = '${tTaxKind}',
                            end_flag = '1',
                            end_date = '${tEndDate}',
                            pay_date = '${tPayDate}',
                            bill_cd = '${tBillCd}',
                            curr_cd = '${tPayCurrCd}',
                            pur_app = '${tPurApp}',
                            tt_flag = '${tTTFlag}',
                            lc_flag = '${tLCFlag}'
                            -- po_amt = ${col.PO_AMT}, 
                            -- pay_amt = ${col.PAY_AMT}, 
                            -- vat_amt = pay_amt * ${tTaxRate}
                            -- deposit_amt = ${tDepositAmt}, 
                            -- lc_amt = ${tLcAmt} 
                        where
                            pu_cd = '${tOne2.PU_CD}'
                            and po_cd = '${tOne2.PO_CD}'
                            and vendor_cd = '${tOne2.VENDOR_CD}'
                            and matl_cd = '${tOne2.MATL_CD}'
                            and (
                                end_flag is null
                                or end_flag <> '1'
                            )
                            -- and   stsin_cd = '${tOne2.STSIN_CD}'
                            -- and   (bill_cd is null or bill_cd = '')
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    /*
              var tSQL = `
                  select
                      *
                  from
                      ksv_stock_in_mst
                  where
                      pu_cd = '${tOne2.PU_CD}'
                      -- and   stsin_cd = '${tOne2.STSIN_CD}'
                      -- and   (bill_cd is null or bill_cd = '')
              `;
              var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
              if (nRet0.length <= 0) {
                  var tRetArray = [];
                  var tObj = {};
                  tObj.CODE = `ERROR:ksv_stock_in_mst 에 데이타 없음:${tOne2.PU_CD}, ${tOne2.STSIN_CD}`;
                  tObj.id = 0; 
                  tRetArray.push(tObj);
                  return (tRetArray);
              }
              if (nRet0.length > 0) {
                  console.log(`stock_in_mst: bill_cd(${nRet0[0].BILL_CD})`);
                  if (nRet0[0].BILL_CD !== '') {
                     ;
                  }
              }
              */

                    /*
              let tSQL99 = `
                  update ksv_stock_in_mst
                  set
                      tax_kind = '${tTaxKind}',
                      end_flag = '1',
                      end_date = '${tEndDate}',
                      pay_date = '${tPayDate}',
                      bill_cd = '${tBillCd}',
                      pay_curr_cd = '${tPayCurrCd}',
                      pur_app = '${tPurApp}',
                      tt_flag = '${tTTFlag}',
                      pay_report = '${tPayReport}',
                      lc_flag = '${tLCFlag}'
                  where
                      pu_cd = '${tOne2.PU_CD}'
                      and stsin_cd = '${tOne2.STSIN_CD}'
                      and (
                          bill_cd is null
                          or bill_cd = ''
                      )
              `;
              const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
              tSQLArray.push(tSQL99_1);
              */
                }

                var sqlStsIn = `
                    select
                        a.*
                    from
                        ksv_stock_in a,
                        kcd_matl_mst b,
                        kcd_buyer c,
                        kcd_user d
                    where
                        1 = 1
                        and a.matl_cd = b.matl_cd
                        and left(a.order_cd, 2) = c.buyer_cd
                        and c.reg_user = d.user_id
                        and d.company_code = '${col.COMPANY_CODE}'
                        and left(a.in_datetime, 8) = '${col.IN_DATE}'
                        and a.pay_date = '${col.PAY_DATE}'
                        and b.vendor_cd = '${col.VENDOR_CD}'
                        and a.in_curr_cd = '${col.CURR_CD}'
                        and (
                            a.end_flag is null
                            or a.end_flag <> '1'
                        )
                `;
                var retStsIn = await prisma.$queryRaw(Prisma.raw(sqlStsIn));
                if (retStsIn.length <= 0) {
                    /*
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = `ERROR:ksv_stock_in 에 데이타 없음:${col.IN_DATE}, ${col.PAY_DATE}, ${col.VENDOR_CD}, ${col.CURR_CD}`;
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return (tRetArray);
                    */
                }
                tIdx2 = 0;
                for (tIdx2 = 0; tIdx2 < retStsIn.length; tIdx2++) {
                    var tObj3 = {
                        ...retStsIn[tIdx2],
                    };
                    var tTax = 0;
                    if (parseFloat(tInEdit.VAT_AMT) > 0)
                        tTax = AFLib.numToFixed(parseFloat(tInEdit.VAT_AMT), 2);

                    var puSql = '';
                    if (!tObj3.PU_CD);
                    else puSql = `and   pu_cd = '${tObj3.PU_CD}'`;

                    let tSQL99 = `
                        update ksv_stock_in
                        set
                            tt_flag = '${tTTFlag}',
                            pur_app = '${tPurApp}',
                            pay_report = '${tPayReport}',
                            end_flag = '1',
                            end_date = '${tEndDate}',
                            tax = '${tTax}',
                            pur_factory = '${tPurFactory}',
                            bill_no = '${tBillCd}'
                        where
                            po_cd = '${tObj3.PO_CD}' ${puSql}
                            and matl_cd = '${tObj3.MATL_CD}'
                            and pay_date = '${tObj3.PAY_DATE}'
                            and in_curr_cd = '${tObj3.IN_CURR_CD}'
                            and (
                                end_flag is null
                                or end_flag <> '1'
                            )
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }
            }

            // BILL_MST는 kcd_gw_taxbill_kr 하나에 대응
            /*
            var tTaxbillObj = {};
            tTaxbillObj.DOC_NO = tPayReport; 
            tTaxbillObj.VENDOR_CD = tInEdit.VENDOR_CD; 
            tTaxbillObj.CLOSING_DATE = tBillObj.INVOICE_DATE; 
            tTaxbillObj.PAY_DATE = tBillObj.PAY_DATE;
            tTaxbillObj.CURR_CD = tBillObj.CURR_CD; 
            tTaxbillObj.PUR_APP = tPurApp; 
            if (tInEdit.IS_TT === '1') tTaxbillObj.TT_FLAG =  '1';
            else tTaxbillObj.TT_FLAG =  '0';
            tTaxbillObj.STATUS_CD =  '0';
            tTaxbillObj.PUR_FACTORY =  tPurFactory;
            tTaxbillObj.TAX = tInEdit.VAT_AMT;
            tTaxbillObj.MINUS_AMOUNT = String(parseFloat(tInEdit.PAY_AMT)-parseFloat(tInEdit.VAT_AMT));
            tTaxbillObj.TOT_AMOUNT = tInEdit.PAY_AMT;
            tTaxbillObj.TAXBILL_DATE = '';
            tTaxbillObj.TAXBILL_CD = '';
            tTaxbillObj.PAY_BANK = tInEdit.PAY_BANK;
            tTaxbillObj.BILL_CD = tBillObj.BILL_CD;
            tTaxbillObj.STSIN_CD = '';
            tTaxbillObj.YEAR = tRetDate.substring(0, 4);
            tTaxbillObj.REG_USER = tUserInfo.USER_ID;
            tTaxbillObj.REG_DATETIME = tRetDate;
            let tSQL99 = AFLib.createTableSql('KCD_GW_TAXBILL_KR', tTaxbillObj);
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);
            */

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
                tObj.CODE = 'ERROR:MATL Endding Error';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED:' + tBillCd;
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },
    },
};

export default moduleMutation_S0419_5;
