import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0423_LIST_1 = {
    Query: {
        mgrQueryS0423_LIST_1: async (_, args, contextValue) => {
            const tRetDate = AFLib.getCurrTime();
            const tRetDate1 = tRetDate.substring(0, 8);
            const tUserInfo = AFLib.getUserInfo(contextValue);

            //  

            const sqlUser = `
                select
                    *
                from
                    kcd_user
                where
                    user_id = '${tUserInfo.USER_ID}'
            `;
            const retUser: any[] = await prisma.$queryRaw(Prisma.raw(sqlUser));
            let tUserCompany = '';
            if (retUser.length > 0) tUserCompany = retUser[0].company_code;

            let sDate = args.data.S_PAY_DATE;
            let eDate = args.data.E_PAY_DATE;
            if (sDate === '') sDate = `${tRetDate1.substring(0, 4)}0101`;
            if (eDate === '') eDate = '99999999';
            var payDateSql1 = `and a.pay_date between '${sDate}' and '${eDate}' `;
            if (!args.data.S_PAY_DATE && !args.data.E_PAY_DATE)
                payDateSql1 = '';

            let sDate1 = args.data.S_IN_DATE;
            let eDate1 = args.data.E_IN_DATE;
            if (sDate1 === '') sDate1 = `${tRetDate1.substring(0, 4)}0101`;
            if (eDate1 === '') eDate1 = '99999999';
            var endDateSql1 = `and a.invoice_date between '${sDate1}' and '${eDate1}' `;
            if (!args.data.S_IN_DATE && !args.data.E_IN_DATE) endDateSql1 = '';

            const billCd = args.data.BILL_CD || '';
            const vendorCd = args.data.VENDOR_CD || '';
            const vendorType = args.data.VENDOR_TYPE || '';
            const taxKind = args.data.TAX_KIND || '';
            const regUser = args.data.REG_USER || '';

            const sqlStr = `
                select
                    a.VENDOR_CD,
                    c.VENDOR_NAME,
                    c.VENDOR_TYPE,
                    isnull(c1.CD_NAME, '') as VENDOR_TYPE_N,
                    isnull(a.PAY_DATE, '') as PAY_DATE,
                    isnull(a.CURR_CD, '') as CURR_CD,
                    isnull(a.INVOICE_DATE, '') as INVOICE_DATE,
                    isnull(a.PUR_FACTORY, '') as PUR_FACTORY,
                    '' as PUR_APP,
                    '' as TT_FLAG,
                    isnull(a.PAY_REPORT, '') as PAY_REPORT,
                    isnull(a.BILL_CD, '') as BILL_CD,
                    isnull(a.PAY_BANK, '') as PAY_BANK,
                    isnull(a.GW_STATUS, '') as GW_STATUS,
                    isnull(a.GW_STATUS_TAX, '') as GW_STATUS_TAXBILL,
                    isnull(a.TAX_KIND, '') as TAX_KIND,
                    isnull(c.PAY_TYPE, '') as PAY_TYPE,
                    isnull(c2.CD_NAME, '') as PAY_TYPE_N,
                    -- isnull(c.PAY_TERM, '0') as PAY_TERM,
                    isnull(c2.ETC3, '0') as PAY_TERM,
                    isnull(a.BILL_FLAG, '') as BILL_FLAG,
                    isnull(a.REG_USER, '') as REG_USER,
                    isnull(a.PAID_AMT, '') as PAID_AMT,
                    '' as CALC_FLAG,
                    isnull(a.VAT_AMT, '0') as VAT_AMT,
                    isnull(a.COMPANY_CODE, '') as COMPANY_CODE,
                    isnull(a.TAXBILL_CD, '') as TAXBILL_CD,
                    isnull(round(a.PO_AMT, 2), 0) as PO_AMT,
                    isnull(a.DEPOSIT_AMT, 0) as DEPOSIT_AMT,
                    isnull(a.LC_AMT, 0) as LC_AMT,
                    isnull(a.DEBIT_AMT, 0) as DEBIT_AMT,
                    isnull(a.DISCOUNT_AMT, 0) as DISCOUNT_AMT,
                    isnull(a.PAY_AMT, 0) as PAY_AMT,
                    '' as LC_BILL_NO,
                    isnull(a.INVOICE_NO, '') as INVOICE_NO,
                    isnull(a.BILL_END_FLAG, '') as BILL_END_FLAG
                from
                    ksv_bill_mst a,
                    kcd_vendor c
                    left join kcd_code c1 on c1.cd_code = c.vendor_type
                    and c1.cd_group = 'VENDOR_TYPE'
                    left join kcd_code c2 on (
                        c2.cd_code = c.pay_type
                        or c2.cd_name = c.pay_type
                    )
                    and c2.cd_group = 'PAY_TYPE'
                where
                    1 = 1
                    and a.vendor_cd = c.vendor_cd
                    and a.bill_cd like '%${billCd}%'
                    and c.vendor_name like '%${vendorCd}%'
                    and c.vendor_type like '%${vendorType}%'
                    and a.TAX_KIND like '%${taxKind}%'
                    and a.REG_USER like '%${regUser}%'
                    and (
                        (
                            c.vendor_type <> '5'
                            and a.company_code like '%${tUserCompany}%'
                        )
                        or (c.vendor_type = '5')
                    ) ${payDateSql1} ${endDateSql1}
                order by
                    c.VENDOR_NAME,
                    a.PAY_DATE
            `;
            const tRet: any[] = await prisma.$queryRaw(Prisma.raw(sqlStr));

            if (!tRet.length) {
                return { MESSAGE: '', DATAS: [] };
            }

            const escapeQuote = (v: string) => v.replace(/'/g, "''");

            const billCdSet = new Set<string>();
            const taxbillCdSet = new Set<string>();
            const payReportSet = new Set<string>();
            const payBankSet = new Set<string>();

            for (const row of tRet) {
                if (row.BILL_CD) billCdSet.add(row.BILL_CD);
                // if (row.TAXBILL_CD) taxbillCdSet.add(row.TAXBILL_CD);
                if (row.PAY_REPORT) payReportSet.add(row.PAY_REPORT);
                if (row.PAY_BANK) payBankSet.add(row.PAY_BANK);
            }

            let stockInSet = new Set<string>();
            let stsinMap = new Map<string, any>();
            if (billCdSet.size > 0) {
                const billIn = Array.from(billCdSet)
                    .map((v) => `'${escapeQuote(v)}'`)
                    .join(',');
                const sqlStock = `
                    select
                        a.bill_no,
                        a.calc_flag,
                        b.vendor_cd,
                        c.vendor_type,
                        sum(in_qty * pay_price) as check_po_amt
                    from
                        ksv_stock_in a,
                        kcd_matl_mst b,
                        kcd_vendor c
                    where
                        a.bill_no in (${billIn})
                        and a.matl_cd = b.matl_cd
                        and b.vendor_cd = c.vendor_cd
                    group by  a.bill_no, a.calc_flag, b.vendor_cd, c.vendor_type
                `;
                const stockRows: any[] = await prisma.$queryRaw(
                    Prisma.raw(sqlStock),
                );
                stockInSet = new Set<string>(stockRows.map((r) => r.bill_no));
                stockRows.forEach((r) => {
                    stsinMap.set(r.bill_no, r);
                });
            }


            let gwTaxMap = new Map<string, any>();
            if (billCdSet.size > 0) {
                const billIn2 = Array.from(billCdSet)
                    .map((v) => `'${escapeQuote(v)}'`)
                    .join(',');
                const sqlGw = `
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
                        bill_cd in (${billIn2})
                `;
                const gwRows: any[] = await prisma.$queryRaw(Prisma.raw(sqlGw));
                gwRows.forEach((r) => {
                    gwTaxMap.set(r.bill_cd, r);
                    if (r.taxbill_cd) taxbillCdSet.add(r.taxbill_cd);
                });
            }


            let appDataMap = new Map<string, any>();
            let appDataTaxbillMap = new Map<string, any>();
            if (taxbillCdSet.size > 0) {
                const taxIn = Array.from(taxbillCdSet)
                    .map((v) => `'${escapeQuote(v)}'`)
                    .join(',');
                const sqlApp = `
                    select
                        taxbill_cd,
                        cd_acct,
                        neoe_no
                    from
                        kcd_app_data
                    where
                        taxbill_cd in (${taxIn})
                    order by
                        taxbill_cd,
                        neoe_no desc
                `;
                const appRows: any[] = await prisma.$queryRaw(
                    Prisma.raw(sqlApp),
                );
                appRows.forEach((r) => {
                    const acctCd = r.cd_acct || '';
                    const mapKey = `${acctCd}${r.taxbill_cd}`;
                    if (!appDataMap.has(mapKey)) {
                        appDataMap.set(mapKey, r);
                    }
                    if (
                        (acctCd === '13102' ||
                            acctCd === '13101' ||
                            acctCd === '') &&
                        !appDataTaxbillMap.has(r.taxbill_cd)
                    ) {
                        appDataTaxbillMap.set(r.taxbill_cd, r);
                    }
                });
            }

            let appImportMap = new Map<string, any>();
            if (payReportSet.size > 0) {
                const repIn = Array.from(payReportSet)
                    .map((v) => `'${escapeQuote(v)}'`)
                    .join(',');
                const sqlImp = `
                    select
                        pay_report,
                        cd_acct,
                        neoe_no
                    from
                        kcd_app_import
                    where
                        pay_report in (${repIn})
                    order by
                        pay_report,
                        neoe_no desc
                `;
                const impRows: any[] = await prisma.$queryRaw(
                    Prisma.raw(sqlImp),
                );
                impRows.forEach((r) => {
                    if (!appImportMap.has(r.pay_report)) {
                        appImportMap.set(r.pay_report, r);
                    }
                });
            }

            let bankMap = new Map<string, any>();
            if (payBankSet.size > 0) {
                const bankIn = Array.from(payBankSet)
                    .map((v) => `'${escapeQuote(v)}'`)
                    .join(',');
                const sqlBank = `
                    select
                        bank_cd,
                        account_no,
                        account_name,
                        bank_name,
                        sftcode
                    from
                        kcd_bank
                    where
                        bank_cd in (${bankIn})
                `;
                const bankRows: any[] = await prisma.$queryRaw(
                    Prisma.raw(sqlBank),
                );
                bankRows.forEach((r) => {
                    bankMap.set(r.bank_cd, r);
                });
            }

            const tRetArray: any[] = [];

            for (const base of tRet) {
                const tObj: any = { ...base };

                if (tObj.BILL_CD && !stockInSet.has(tObj.BILL_CD)) {
                    continue;
                }

                tObj.LC_BILL_NO = '';
                tObj.PUR_APP = '';
                tObj.TT_FLAG = '';

                var objStsIn = stsinMap.get(tObj.BILL_CD);
                tObj.CALC_FLAG = objStsIn.calc_flag;
                tObj.CHECK_PO_AMT = objStsIn.check_po_amt;
                // tObj.VENDOR_TYPE = objStsIn.vendor_type;

                if (parseFloat(tObj.PO_AMT) <= 0) {
                    continue;
                }

                tObj.ACCOUNT_NO = '';
                tObj.ACCOUNT_NAME = '';
                tObj.BANK_NAME = '';
                if (tObj.PAY_BANK) {
                    const bank = bankMap.get(tObj.PAY_BANK);
                    if (bank) {
                        tObj.ACCOUNT_NO = bank.account_no || '';
                        tObj.ACCOUNT_NAME = bank.account_name || '';
                        tObj.BANK_NAME = bank.bank_name || '';
                        tObj.SFTCODE = bank.sftcode || '';
                    }
                }

                if (parseFloat(tObj.LC_AMT) > 0) {
                    if (parseFloat(tObj.LC_AMT) === parseFloat(tObj.PO_AMT)) {
                        tObj.LC_FLAG = '1';
                    } else {
                        tObj.LC_FLAG = '0';
                        /*
                        tObj.DEPOSIT_AMT = tObj.LC_AMT;
                        tObj.LC_AMT = 0;
                        */
                    }
                }

                tObj.APPROKEY_TAXBILL = '';
                tObj.GW_STATUS_TAXBILL = '';
                tObj.GW_STATUS_N_TAXBILL = '';
                tObj.APPROKEY = '';
                tObj.GW_STATUS = '';
                tObj.GW_STATUS_N = '';
                tObj.TAXBILL_CD = '';

                const gwRow = tObj.BILL_CD ? gwTaxMap.get(tObj.BILL_CD) : null;
                let tPaidAmt = 0;
                if (gwRow) {
                    if (gwRow.approkey) {
                        if (
                            gwRow.status_cd === '1' ||
                            gwRow.status_cd === '2'
                        ) {
                            tPaidAmt += parseFloat(gwRow.tot_amount || 0);
                        }
                        tObj.APPROKEY = gwRow.approkey || '';
                        tObj.GW_STATUS = gwRow.status_cd || '';
                        tObj.TAXBILL_CD = gwRow.taxbill_cd || tObj.TAXBILL_CD;
                        console.log(`Check Approkey(1-1): ${tObj.APPROKEY}/${tObj.GW_STATUS}`);
                    } else {
                        tObj.APPROKEY = '';
                        tObj.GW_STATUS = '';
                        tObj.TAXBILL_CD = gwRow.taxbill_cd || tObj.TAXBILL_CD;
                        if (tObj.VENDOR_TYPE === '4') { // buyer
                            tObj.GW_STATUS = '1';
                            tObj.CALC_FLAG = '1';
                        }
                        if (
                            tObj.VENDOR_TYPE === '4' &&
                            tObj.CALC_FLAG === '1'
                        ) {
                            tPaidAmt += parseFloat(gwRow.tot_amount || 0);
                        }
                        console.log(`Check Approkey(1-2): ${tObj.APPROKEY}/${tObj.GW_STATUS}`);
                    }
                    tObj.APPROKEY_TAXBILL = gwRow.approkey_tax || '';
                    tObj.GW_STATUS_TAXBILL = gwRow.status_cd_tax || '';
                    console.log(`Check Approkey(2-2): ${tObj.APPROKEY_TAXBILL}/${tObj.GW_STATUS_TAXBILL}`);
                }
                // if (!tObj.APPROKEY) tObj.GW_STATUS = '';
                if (!tObj.APPROKEY_TAXBILL) tObj.GW_STATUS_TAXBILL = '';

                // console.log(`Check Approkey(1): ${tNeoeNo}/${tObj.BAL_AMT}/${tObj.GW_STATUS}`);
                console.log(`Check Approkey(1-3): ${tObj.APPROKEY}/${tObj.GW_STATUS}, ${tObj.APPROKEY_TAXBILL}/${tObj.GW_STATUS_TAXBILL} `);

                if (tObj.CALC_FLAG === '1') tObj.BILL_FLAG = '1';
                else tObj.BILL_FLAG = '0';

                var tNeoeNo = '';
                var tNeoeNo_TAXBILL = '';


                if (tObj.VENDOR_TYPE === '1' && tObj.TAXBILL_CD) {
                    const appData = appDataTaxbillMap.get(tObj.TAXBILL_CD);
                    if (appData) tNeoeNo = appData.neoe_no;
                }

                if (tObj.VENDOR_TYPE === '1' && tObj.TAXBILL_CD) {
                    const appDataTaxbill = appDataMap.get(
                        `15400${tObj.TAXBILL_CD}`,
                    );
                    if (appDataTaxbill)
                        tNeoeNo_TAXBILL = appDataTaxbill.neoe_no;
                }

                if (tObj.VENDOR_TYPE === '3' && tObj.PAY_REPORT) {
                    const appImport = appImportMap.get(tObj.PAY_REPORT);
                    if (appImport) tNeoeNo = appImport.neoe_no;
                }
                tObj.DOCU_NO = tNeoeNo;
                tObj.DOCU_NO_TAXBILL = tNeoeNo_TAXBILL;


                if (
                    args.data.GW_STATUS !== 'ALL' &&
                    args.data.GW_STATUS !== 'END' &&
                    args.data.GW_STATUS !== 'PART'
                ) {
                    if (tNeoeNo) {
                        continue;
                    }
                }

                if (gwRow) {
                    if (tNeoeNo) {
                        tObj.GW_STATUS = '2';
                        tObj.PAID_AMT = parseFloat(tObj.PAY_AMT);
                        tPaidAmt = parseFloat(tObj.PAY_AMT);
                    }
                } else {
                    if (tNeoeNo) {
                        tObj.GW_STATUS = '2';
                        tObj.PAID_AMT = parseFloat(tObj.PAY_AMT);
                        tPaidAmt = parseFloat(tObj.PAY_AMT);
                    } else {
                        tObj.PAID_AMT = '0';
                        tPaidAmt = 0;
                    }
                }
                if (tPaidAmt > 0) {
                    tObj.PAID_AMT = AFLib.numToFixed(
                        parseFloat(tPaidAmt as any),
                        4,
                    );
                } else {
                    tObj.PAID_AMT = '0';
                }
                tObj.BAL_AMT = String(
                    parseFloat(tObj.PAY_AMT) - parseFloat(tObj.PAID_AMT),
                );
                tObj.IN_PAY_AMT = tObj.BAL_AMT;

                if (tNeoeNo) {
                    tObj.GW_STATUS_N = 'END';
                } else if (parseFloat(tObj.BAL_AMT) <= 0) {
                    if (tObj.GW_STATUS === '1') tObj.GW_STATUS_N = 'SEND';
                    else if (tObj.GW_STATUS === '2') tObj.GW_STATUS_N = 'DEL';
                    else if (tObj.GW_STATUS === '3')
                        tObj.GW_STATUS_N = 'REJECT';
                    else if (tObj.GW_STATUS === '4')
                        tObj.GW_STATUS_N = 'CANCEL';
                    else if (tObj.GW_STATUS === '5')
                        tObj.GW_STATUS_N = 'DELETE';
                    else if (tObj.GW_STATUS === '6') tObj.GW_STATUS_N = 'WAIT';
                    else tObj.GW_STATUS_N = 'NEW';
                } else if (
                    parseFloat(tObj.BAL_AMT) > 0 &&
                    parseFloat(tObj.PAID_AMT) > 0
                ) {
                    if (tObj.GW_STATUS === '1') tObj.GW_STATUS_N = 'SEND';
                    else if (tObj.GW_STATUS === '2') tObj.GW_STATUS_N = 'PART';
                    else if (tObj.GW_STATUS === '3')
                        tObj.GW_STATUS_N = 'REJECT';
                    else if (tObj.GW_STATUS === '4')
                        tObj.GW_STATUS_N = 'CANCEL';
                    else if (tObj.GW_STATUS === '5')
                        tObj.GW_STATUS_N = 'DELETE';
                    else if (tObj.GW_STATUS === '6') tObj.GW_STATUS_N = 'WAIT';
                    else tObj.GW_STATUS_N = 'NEW';
                } else if (tObj.GW_STATUS === '1') {
                    tObj.GW_STATUS_N = 'SEND';
                } else if (tObj.GW_STATUS === '2') {
                    if (parseFloat(tObj.BAL_AMT) <= 0) tObj.GW_STATUS_N = 'END';
                    else if (
                        parseFloat(tObj.BAL_AMT) > 0 &&
                        parseFloat(tObj.PAID_AMT) > 0
                    )
                        tObj.GW_STATUS_N = 'PART';
                } else if (
                    tObj.GW_STATUS === '' ||
                    tObj.GW_STATUS === '0' ||
                    tObj.GW_STATUS === '6'
                ) {
                    tObj.GW_STATUS_N = 'NEW';
                } else {
                    if (tObj.GW_STATUS === '3') tObj.GW_STATUS_N = 'REJECT';
                    else if (tObj.GW_STATUS === '4')
                        tObj.GW_STATUS_N = 'CANCEL';
                    else if (tObj.GW_STATUS === '5')
                        tObj.GW_STATUS_N = 'DELETE';
                    else if (tObj.GW_STATUS === '6') tObj.GW_STATUS_N = 'WAIT';
                }

                if (tNeoeNo_TAXBILL) {
                    tObj.GW_STATUS_N_TAXBILL = 'END';
                } else if (tObj.APPROKEY_TAXBILL) {
                    if (tObj.GW_STATUS_TAXBILL === '1') tObj.GW_STATUS_N_TAXBILL = 'SEND';
                    else if (tObj.GW_STATUS_TAXBILL === '2') tObj.GW_STATUS_N_TAXBILL = 'DEL';
                    else if (tObj.GW_STATUS_TAXBILL === '3')
                        tObj.GW_STATUS_N_TAXBILL = 'REJECT';
                    else if (tObj.GW_STATUS_TAXBILL === '4')
                        tObj.GW_STATUS_N_TAXBILL = 'CANCEL';
                    else if (tObj.GW_STATUS_TAXBILL === '5')
                        tObj.GW_STATUS_N_TAXBILL = 'DELETE';
                    else if (tObj.GW_STATUS_TAXBILL === '6') tObj.GW_STATUS_N_TAXBILL = 'WAIT';
                    else tObj.GW_STATUS_N_TAXBILL = 'NEW';
                } else {
                    tObj.GW_STATUS_N_TAXBILL = '';
                }
                console.log(`Check Approkey(1-4): ${tObj.GW_STATUS_N}/${tObj.GW_STATUS_N_TAXBILL}`);

                if (tObj.BILL_END_FLAG === '1') tObj.BILL_END_FLAG = 'END';
                else tObj.BILL_END_FLAG = '';

                tObj.TAX_KIND_N = '';
                if (tObj.TAX_KIND === '1') tObj.TAX_KIND_N = '과세';
                if (tObj.TAX_KIND === '2') tObj.TAX_KIND_N = '영세';
                if (tObj.TAX_KIND === '3') tObj.TAX_KIND_N = '면세';
                if (tObj.TAX_KIND === '5') tObj.TAX_KIND_N = 'T/T';
                if (tObj.TAX_KIND === '8') tObj.TAX_KIND_N = '과세(8%)';
                if (tObj.TAX_KIND === '10') tObj.TAX_KIND_N = '과세(10%)';

                tObj.BAL_DEBIT = '0';
                tObj.BUY_DATE = '';
                tObj.GW_STATUS_CD = '';

                if (args.data.GW_STATUS === 'ALL') {
                } else if (
                    args.data.GW_STATUS === 'NEW' &&
                    tObj.GW_STATUS_N === 'NEW'
                ) {
                   ;
                } else if (
                    args.data.GW_STATUS === 'SEND' &&
                    tObj.GW_STATUS_N === 'SEND'
                ) {
                   ;
                } else if (
                    args.data.GW_STATUS === 'END' &&
                    tObj.GW_STATUS_N === 'END'
                ) {
                   ;
                } else if (
                    args.data.GW_STATUS === 'PART' &&
                    tObj.GW_STATUS_N === 'PART'
                ) {
                    ;
                } else {
                    continue;
                }

                let tPAY_AMT = parseFloat(tObj.PO_AMT);
                tPAY_AMT -= parseFloat(tObj.DEPOSIT_AMT);
                tPAY_AMT -= parseFloat(tObj.LC_AMT);
                tPAY_AMT -= parseFloat(tObj.DEBIT_AMT);
                tPAY_AMT -= parseFloat(tObj.DISCOUNT_AMT);

                tObj.END_AMT = String(tPAY_AMT);
                tPAY_AMT += parseFloat(tObj.VAT_AMT);
                tObj.PAY_AMT = String(tPAY_AMT);
                tObj.PO_AMT = AFLib.numToFixed(parseFloat(tObj.PO_AMT), 4);
                tObj.DEPOSIT_AMT = AFLib.numToFixed(
                    parseFloat(tObj.DEPOSIT_AMT),
                    4,
                );
                tObj.PAY_AMT = AFLib.numToFixed(parseFloat(tObj.PAY_AMT), 4);

                tObj.BAL_AMT = String(
                    parseFloat(tObj.PAY_AMT) - parseFloat(tObj.PAID_AMT),
                );
                tObj.IN_PAY_AMT = tObj.BAL_AMT;
                tObj.END_AMT = AFLib.numToFixed(parseFloat(tObj.END_AMT), 4);

                tObj.GW_STATUS_CD = tObj.GW_STATUS;

                tRetArray.push(tObj);
                if (tRetArray.length > 1000) break;
            }

            let tMessage = '';
            if (tRet.length > 1000) {
                tMessage = `${tRet.length}건이 조회되었습니다. 상위 1000건만 출력합니다. `;
            }

            const tWObj: any = {};
            tWObj.MESSAGE = tMessage;
            tWObj.DATAS = [...tRetArray];
            return tWObj;
        },

        mgrQueryS0423_LIST_1_bak8: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            let sqlUser = `
                select
                    *
                from
                    kcd_user
                where
                    user_id = '${tUserInfo.USER_ID}'
            `;
            var retUser = await prisma.$queryRaw(Prisma.raw(sqlUser));

            var tSQL = '';
            var tSQL1 = '';

            var sDate = args.data.S_PAY_DATE;
            var eDate = args.data.E_PAY_DATE;

            if (sDate === '') sDate = `${tRetDate1.substring(0, 4)}0101`;
            if (eDate === '') eDate = '99999999';

            var payDateSql1 = `and a.pay_date between '${sDate}' and '${eDate}' `;

            ('');
            var sDate1 = args.data.S_IN_DATE;
            var eDate1 = args.data.E_IN_DATE;

            if (sDate1 === '') sDate1 = `${tRetDate1.substring(0, 4)}0101`;
            if (eDate1 === '') eDate1 = '99999999';

            var endDateSql1 = `and a.end_date between '${sDate1}' and '${eDate1}' `;

            let sqlStr = `
                select
                    b.VENDOR_CD,
                    c.VENDOR_NAME,
                    c.VENDOR_TYPE,
                    isnull(c1.CD_NAME, '') as VENDOR_TYPE_N,
                    isnull(a.PAY_DATE, '') as PAY_DATE,
                    isnull(a.PAY_CURR_CD, '') as CURR_CD,
                    isnull(a.END_DATE, '') as INVOICE_DATE,
                    isnull(a.PUR_FACTORY, '') as PUR_FACTORY,
                    isnull(a.PUR_APP, '') as PUR_APP,
                    isnull(a.TT_FLAG, '') as TT_FLAG,
                    isnull(a.PAY_REPORT, '') as PAY_REPORT,
                    isnull(a.BILL_NO, '') as BILL_CD,
                    isnull(a1.PAY_BANK, '') as PAY_BANK,
                    isnull(a1.GW_STATUS, '') as GW_STATUS,
                    isnull(a1.TAX_KIND, '') as TAX_KIND,
                    isnull(c.PAY_TYPE, '') as PAY_TYPE,
                    isnull(c2.CD_NAME, '') as PAY_TYPE_N,
                    isnull(c.PAY_TERM, '0') as PAY_TERM,
                    isnull(a1.BILL_FLAG, '') as BILL_FLAG,
                    isnull(a1.REG_USER, '') as REG_USER,
                    isnull(a1.PAID_AMT, '') as PAID_AMT,
                    isnull(a.CALC_FLAG, '0') as CALC_FLAG,
                    isnull(a.TAX, '0') as VAT_AMT,
                    isnull(e1.COMPANY_CODE, '') as COMPANY_CODE,
                    isnull(a1.TAXBILL_CD, '') as TAXBILL_CD,
                    isnull(a1.PO_AMT, 0) as PO_AMT_0,
                    isnull(a1.DEPOSIT_AMT, 0) as DEPOSIT_AMT_0,
                    isnull(a1.LC_AMT, 0) as LC_AMT_0,
                    isnull(a1.DEBIT_AMT, 0) as DEBIT_AMT_0,
                    isnull(a1.DISCOUNT_AMT, 0) as DISCOUNT_AMT_0,
                    isnull(a1.VAT_AMT, 0) as VAT_AMT_0,
                    isnull(a1.PAY_AMT, 0) as PAY_AMT_0,
                    isnull(a.lc_bill_no, '') as LC_BILL_NO,
                    sum(a.IN_QTY) as IN_QTY,
                    sum(a.IN_QTY * a.PAY_PRICE) as IN_AMT,
                    sum(isnull(a.LC_QTY, 0)) as LC_QTY,
                    sum(isnull(a.LC_QTY, 0) * a.PAY_PRICE) as LC_AMT
                from
                    ksv_stock_in a
                    left join ksv_bill_mst a1 on a1.bill_cd = a.bill_no,
                    kcd_matl_mst b,
                    kcd_buyer e,
                    kcd_user e1,
                    kcd_vendor c
                    left join kcd_code c1 on c1.cd_code = c.vendor_type
                    and c1.cd_group = 'VENDOR_TYPE'
                    left join kcd_code c2 on c2.cd_code = c.pay_type
                    and c2.cd_group = 'PAY_TYPE'
                where
                    1 = 1
                    and a.matl_cd = b.matl_cd
                    and b.vendor_cd = c.vendor_cd
                    and left(a.order_cd, 2) = e.buyer_cd
                    and e.reg_user = e1.user_id
                    and a.bill_no like '%${args.data.BILL_CD}%'
                    and c.vendor_cd like '%${args.data.VENDOR_CD}%'
                    and c.vendor_type like '%${args.data.VENDOR_TYPE}%'
                    and a1.TAX_KIND = '${args.data.TAX_KIND}'
                    and a.end_flag = '1'
                    and a.end_date <> ''
                    and a.in_qty > 0
                    and a.lc_qty <= 0 ${payDateSql1} ${endDateSql1}
                group by
                    b.VENDOR_CD,
                    c.VENDOR_NAME,
                    c.VENDOR_TYPE,
                    c1.CD_NAME,
                    a.PAY_DATE,
                    a.PAY_CURR_CD,
                    a.END_DATE,
                    a.PUR_FACTORY,
                    a.PUR_APP,
                    a.TT_FLAG,
                    a.PAY_REPORT,
                    a.BILL_NO,
                    a1.PAY_BANK,
                    a1.GW_STATUS,
                    a1.TAX_KIND,
                    c.PAY_TYPE,
                    c2.CD_NAME,
                    c.PAY_TERM,
                    a1.BILL_FLAG,
                    a1.REG_USER,
                    a1.PAID_AMT,
                    a.CALC_FLAG,
                    a.TAX,
                    e1.COMPANY_CODE,
                    a1.TAXBILL_CD,
                    a1.PO_AMT,
                    a1.DEPOSIT_AMT,
                    a1.LC_AMT,
                    a1.DEBIT_AMT,
                    a1.DISCOUNT_AMT,
                    a1.VAT_AMT,
                    a1.PAY_AMT,
                    a.LC_BILL_NO
                order by
                    c.VENDOR_NAME,
                    e1.COMPANY_CODE desc,
                    a.END_DATE
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            var tRetArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tObj = { ...tRet[tIdx] };

                if (tObj.CALC_FLAG === '1') tObj.BILL_FLAG = 'O';
                else tObj.BILL_FLAG = 'X';

                if (
                    parseFloat(tObj.IN_QTY) <= 0 &&
                    parseFloat(tObj.LC_QTY) <= 0
                )
                    continue;
                if (tObj.COMPANY_CODE === 'nsr') continue;

                var tNeoeNo = '';

                if (tObj.VENDOR_TYPE === '1') {
                    var tSql10 = `
                        select
                            neoe_no
                        from
                            kcd_app_data
                        where
                            taxbill_cd = '${tObj.TAXBILL_CD}'
                        order by
                            neoe_no desc
                    `;
                    var tRet0_2 = await prisma.$queryRaw(Prisma.raw(tSql10));
                    if (tRet0_2.length > 0) tNeoeNo = tRet0_2[0].neoe_no;
                }

                if (tObj.VENDOR_TYPE === '3') {
                    var tSql10 = `
                        select
                            neoe_no
                        from
                            kcd_app_import
                        where
                            pay_report = '${tObj.PAY_REPORT}'
                        order by
                            neoe_no desc
                    `;
                    var tRet0_2 = await prisma.$queryRaw(Prisma.raw(tSql10));
                    if (tRet0_2.length > 0) tNeoeNo = tRet0_2[0].neoe_no;
                }
                tObj.DOCU_NO = tNeoeNo;

                if (
                    args.data.GW_STATUS !== 'ALL' &&
                    args.data.GW_STATUS !== 'END' &&
                    args.data.GW_STATUS !== 'PART'
                ) {
                    if (tNeoeNo) continue;
                }

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

                if (tObj.LC_BILL_NO !== '') {
                    var tSql10 = `
                        select
                            isnull(sum(lc_qty), 0) as LC_QTY,
                            isnull(sum(lc_qty * pay_price), 0) as LC_AMT
                        from
                            ksv_stock_in
                        where
                            lc_qty > 0
                            and pay_report = '${tObj.LC_BILL_NO}'
                    `;
                    var tRet0_2 = await prisma.$queryRaw(Prisma.raw(tSql10));
                    if (tRet0_2.length > 0) {
                        tObj.LC_QTY = tRet0_2[0].LC_QTY;
                        tObj.LC_AMT = tRet0_2[0].LC_AMT;
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

                if (
                    parseFloat(tObj.IN_QTY) === 0 &&
                    parseFloat(tObj.LC_QTY) > 0
                )
                    tObj.LC_FLAG = '1';
                var payCheck = 0;
                if (
                    parseFloat(tObj.PAY_AMT_0) > 0 ||
                    parseFloat(tObj.DEPOSIT_AMT_0) > 0 ||
                    parseFloat(tObj.LC_AMT_0) > 0
                )
                    payCheck = 1;
                if (tObj.BILL_CD !== '') {
                    var tSql10 = `
                        select
                            isnull(a.TAX, 0) as s_tax,
                            isnull(a.MINUS_AMOUNT, 0) as s_minus_amount,
                            isnull(a.TOT_AMOUNT, 0) as s_tot_amount,
                            isnull(a.taxbill_cd, '') as TAXBILL_CD,
                            isnull(a.approkey, '') as APPROKEY,
                            isnull(a.status_cd, '') as GW_STATUS,
                            isnull(b.cd_name, '') as GW_STATUS_N
                        from
                            kcd_gw_taxbill_kr a
                            left join kcd_code b on b.cd_code = a.status_cd
                            and b.cd_group = 'GW_STATUS'
                        where
                            a.bill_cd = '${tObj.BILL_CD}'
                        order by
                            a.taxbill_cd desc
                            -- and  (a.approkey is not null and a.approkey <> '')
                    `;
                    var tRet0_2 = await prisma.$queryRaw(Prisma.raw(tSql10));
                    if (tRet0_2.length > 0) {
                        var tPaidAmt = 0;
                        tRet0_2.forEach((col, i) => {
                            if (col.APPROKEY !== '') {
                                if (
                                    col.GW_STATUS === '1' ||
                                    col.GW_STATUS === '2'
                                )
                                    tPaidAmt += parseFloat(col.s_tot_amount);
                                tObj.APPROKEY = col.APPROKEY;
                                tObj.GW_STATUS = col.GW_STATUS;
                                tObj.GW_STATUS_N = col.GW_STATUS_N;
                                tObj.TAXBILL_CD = col.TAXBILL_CD;
                            }
                        });
                        tRet0_2.forEach((col, i) => {
                            if (col.APPROKEY === '') {
                                tObj.APPROKEY = '';
                                tObj.GW_STATUS = '';
                                tObj.GW_STATUS_N = col.GW_STATUS_N;
                                tObj.TAXBILL_CD = col.TAXBILL_CD;
                            }
                        });
                        tObj.PAID_AMT = AFLib.numToFixed(
                            parseFloat(tPaidAmt),
                            2,
                        );
                    } else {
                        tObj.TAXBILL_CD = '';
                        tObj.APPROKEY = '';
                        tObj.GW_STATUS = '';
                        tObj.GW_STATUS_N = '';
                        tObj.PAID_AMT = '0';
                    }
                } else {
                    var tSql10 = `
                        select
                            isnull(a.APPROKEY, '') as APPROKEY,
                            isnull(a.TAXBILL_DATE, '') as TAXBILL_DATE,
                            isnull(a.TAXBILL_CD, '') as TAXBILL_CD,
                            isnull(a.STATUS_CD, '') as GW_STATUS,
                            isnull(b.CD_NAME, '') as GW_STATUS_N
                        from
                            kcd_gw_taxbill_kr a
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
                    if (tRet0_2.length > 0) {
                        tObj.TAXBILL_CD = tRet0_2[0].TAXBILL_CD;
                        tObj.APPROKEY = tRet0_2[0].APPROKEY;
                        tObj.GW_STATUS = tRet0_2[0].GW_STATUS;
                        tObj.GW_STATUS_N = tRet0_2[0].GW_STATUS_N;
                        tObj.PAID_AMT = '0';
                    } else {
                        tObj.TAXBILL_CD = '';
                        tObj.APPROKEY = '';
                        tObj.GW_STATUS = '';
                        tObj.GW_STATUS_N = '';
                        tObj.PAID_AMT = '0';
                    }
                }

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

                console.log(
                    `====> ${tObj.BILL_CD}/${tObj.PO_AMT_0}/${tObj.VAT_AMT_0}`,
                );
                if (tObj.BILL_CD !== '') {
                    tObj.PO_AMT = tObj.PO_AMT_0;
                    tObj.DISCOUNT_AMT = tObj.DISCOUNT_AMT_0;
                    tObj.VAT_AMT = tObj.VAT_AMT_0;
                    tObj.PAY_AMT = tObj.PAY_AMT_0;
                }

                if (payCheck === 1) {
                    tObj.PO_AMT = tObj.PO_AMT_0;
                    tObj.DEPOSIT_AMT = tObj.DEPOSIT_AMT_0;
                    tObj.LC_AMT = tObj.LC_AMT_0;
                    tObj.PAY_AMT = tObj.PAY_AMT_0;
                    tObj.BAL_AMT =
                        parseFloat(tObj.PAY_AMT) - parseFloat(tObj.PAID_AMT);
                    tObj.BAL_AMT = String(tObj.BAL_AMT);
                    tObj.IN_PAY_AMT = tObj.BAL_AMT;

                    if (parseFloat(tObj.PO_AMT) <= 0) continue;
                    if (tNeoeNo) tObj.GW_STATUS_N = 'END';
                    else if (parseFloat(tObj.BAL_AMT) <= 0) {
                        if (tObj.GW_STATUS === '1') tObj.GW_STATUS_N = 'SEND';
                        else if (tObj.GW_STATUS === '2')
                            tObj.GW_STATUS_N = 'END';
                        else if (tObj.GW_STATUS === '3')
                            tObj.GW_STATUS_N = 'REJECT';
                        else if (tObj.GW_STATUS === '4')
                            tObj.GW_STATUS_N = 'CANCEL';
                        else if (tObj.GW_STATUS === '5')
                            tObj.GW_STATUS_N = 'DELETE';
                        else if (tObj.GW_STATUS === '6')
                            tObj.GW_STATUS_N = 'WAIT';
                        else tObj.GW_STATUS_N = 'NEW';
                    } else if (
                        parseFloat(tObj.BAL_AMT) > 0 &&
                        parseFloat(tObj.PAID_AMT) > 0
                    ) {
                        if (tObj.GW_STATUS === '1') tObj.GW_STATUS_N = 'SEND';
                        else if (tObj.GW_STATUS === '2')
                            tObj.GW_STATUS_N = 'PART';
                        else if (tObj.GW_STATUS === '3')
                            tObj.GW_STATUS_N = 'REJECT';
                        else if (tObj.GW_STATUS === '4')
                            tObj.GW_STATUS_N = 'CANCEL';
                        else if (tObj.GW_STATUS === '5')
                            tObj.GW_STATUS_N = 'DELETE';
                        else if (tObj.GW_STATUS === '6')
                            tObj.GW_STATUS_N = 'WAIT';
                        else tObj.GW_STATUS_N = 'NEW';
                    } else if (tObj.GW_STATUS === '1')
                        tObj.GW_STATUS_N = 'SEND';
                    else if (tObj.GW_STATUS === '2') {
                        if (parseFloat(tObj.BAL_AMT) <= 0)
                            tObj.GW_STATUS_N = 'END';
                        else if (
                            parseFloat(tObj.BAL_AMT) > 0 &&
                            parseFloat(tObj.PAID_AMT) > 0
                        )
                            tObj.GW_STATUS_N = 'PART';
                    } else if (
                        tObj.GW_STATUS === '' ||
                        tObj.GW_STATUS === '0' ||
                        tObj.GW_STATUS === '6'
                    )
                        tObj.GW_STATUS_N = 'NEW';
                    else {
                        if (tObj.GW_STATUS === '3') tObj.GW_STATUS_N = 'REJECT';
                        else if (tObj.GW_STATUS === '4')
                            tObj.GW_STATUS_N = 'CANCEL';
                        else if (tObj.GW_STATUS === '5')
                            tObj.GW_STATUS_N = 'DELETE';
                        else if (tObj.GW_STATUS === '6')
                            tObj.GW_STATUS_N = 'WAIT';
                    }

                    tObj.TAX_KIND_N = '';
                    if (tObj.TAX_KIND === '1') tObj.TAX_KIND_N = '과세';
                    if (tObj.TAX_KIND === '2') tObj.TAX_KIND_N = '영세';
                    if (tObj.TAX_KIND === '3') tObj.TAX_KIND_N = '면세';
                    if (tObj.TAX_KIND === '5') tObj.TAX_KIND_N = 'T/T';

                    tObj.BAL_DEBIT = '0';
                    tObj.BUY_DATE = '';
                    tObj.GW_STATUS_CD = '';

                    console.log(`Step-1(1):${args.data.GW_STATUS}`);

                    if (args.data.GW_STATUS === 'ALL');
                    else if (
                        args.data.GW_STATUS === 'NEW' &&
                        tObj.GW_STATUS_N === 'NEW'
                    );
                    else if (
                        args.data.GW_STATUS === 'SEND' &&
                        tObj.GW_STATUS_N === 'SEND'
                    );
                    else if (
                        args.data.GW_STATUS === 'END' &&
                        tObj.GW_STATUS_N === 'END'
                    );
                    else if (
                        args.data.GW_STATUS === 'PART' &&
                        tObj.GW_STATUS_N === 'PART'
                    );
                    else continue;

                    /*
               if (args.data.GW_STATUS === 'ALL') ;
               else if (args.data.GW_STATUS === 'NEW') {
                   if (tObj.GW_STATUS === '' ||
                       tObj.GW_STATUS === '0' ||
                       tObj.GW_STATUS === '6') ;
                   else continue
               } 
               else if (args.data.GW_STATUS === 'SEND') {
                   if (tObj.GW_STATUS === '1') ;
                   else continue;
               }
               else if (args.data.GW_STATUS === 'PART') {
                   console.log(`Step-1(2):${tObj.GW_STATUS}/${tObj.PAID_AMT}/${tObj.BAL_AMT}`);
                   if ((parseFloat(tObj.PAID_AMT) > 0 && parseFloat(tObj.BAL_AMT) > 0)) ;
                   else continue;
               }
               else if (args.data.GW_STATUS === 'END') {
                   if (tObj.GW_STATUS === '2' && 
                       (parseFloat(tObj.PAID_AMT) > 0 && parseFloat(tObj.BAL_AMT) <= 0)) ;
                   else continue;
               }
               else continue;
               */

                    tRetArray.push(tObj);
                    console.log(`Step-1(3):${tRetArray.length}`);
                    if (tRetArray.length > 1000) break;
                    else continue;
                }

                var tPAY_AMT = parseFloat(tObj.PO_AMT);
                tPAY_AMT -= parseFloat(tObj.DEPOSIT_AMT);
                tPAY_AMT -= parseFloat(tObj.LC_AMT);
                tPAY_AMT -= parseFloat(tObj.DEBIT_AMT);
                tPAY_AMT -= parseFloat(tObj.DISCOUNT_AMT);

                tObj.END_AMT = String(tPAY_AMT);
                tPAY_AMT += parseFloat(tObj.VAT_AMT);
                tObj.PAY_AMT = String(tPAY_AMT);
                tObj.PO_AMT = AFLib.numToFixed(parseFloat(tObj.PO_AMT), 2);
                tObj.DEPOSIT_AMT = AFLib.numToFixed(
                    parseFloat(tObj.DEPOSIT_AMT),
                    2,
                );
                tObj.PAY_AMT = AFLib.numToFixed(parseFloat(tObj.PAY_AMT), 2);

                tObj.BAL_AMT = String(
                    parseFloat(tObj.PAY_AMT) - parseFloat(tObj.PAID_AMT),
                );
                tObj.IN_PAY_AMT = tObj.BAL_AMT;
                tObj.END_AMT = AFLib.numToFixed(parseFloat(tObj.END_AMT), 2);

                /*
           if (parseFloat(tObj.PO_AMT) <= 0) continue;
           if (parseFloat(tObj.BAL_AMT) <= 0) tObj.GW_STATUS_N = 'END';
           else if (parseFloat(tObj.BAL_AMT) > 0 && parseFloat(tObj.PAID_AMT) > 0) tObj.GW_STATUS_N = 'PART';
           else if (tObj.GW_STATUS === '1')  tObj.GW_STATUS_N = 'SEND';
           else if (tObj.GW_STATUS === '2')  {
                if (parseFloat(tObj.BAL_AMT) <= 0) tObj.GW_STATUS_N = 'END';
                else if (parseFloat(tObj.BAL_AMT) > 0 && parseFloat(tObj.PAID_AMT) > 0)  tObj.GW_STATUS_N = 'PART';
           }
           else if (tObj.GW_STATUS === '' ||
                    tObj.GW_STATUS === '0' ||  
                    tObj.GW_STATUS === '6') tObj.GW_STATUS_N = 'NEW' 
           else ;
           */
                if (parseFloat(tObj.PO_AMT) <= 0) continue;
                if (tNeoeNo) tObj.GW_STATUS_N = 'END';
                else if (parseFloat(tObj.BAL_AMT) <= 0) {
                    if (tObj.GW_STATUS === '1') tObj.GW_STATUS_N = 'SEND';
                    else if (tObj.GW_STATUS === '2') tObj.GW_STATUS_N = 'END';
                    else if (tObj.GW_STATUS === '3')
                        tObj.GW_STATUS_N = 'REJECT';
                    else if (tObj.GW_STATUS === '4')
                        tObj.GW_STATUS_N = 'CANCEL';
                    else if (tObj.GW_STATUS === '5')
                        tObj.GW_STATUS_N = 'DELETE';
                    else if (tObj.GW_STATUS === '6') tObj.GW_STATUS_N = 'WAIT';
                    else tObj.GW_STATUS_N = 'NEW';
                } else if (
                    parseFloat(tObj.BAL_AMT) > 0 &&
                    parseFloat(tObj.PAID_AMT) > 0
                ) {
                    if (tObj.GW_STATUS === '1') tObj.GW_STATUS_N = 'SEND';
                    else if (tObj.GW_STATUS === '2') tObj.GW_STATUS_N = 'PART';
                    else if (tObj.GW_STATUS === '3')
                        tObj.GW_STATUS_N = 'REJECT';
                    else if (tObj.GW_STATUS === '4')
                        tObj.GW_STATUS_N = 'CANCEL';
                    else if (tObj.GW_STATUS === '5')
                        tObj.GW_STATUS_N = 'DELETE';
                    else if (tObj.GW_STATUS === '6') tObj.GW_STATUS_N = 'WAIT';
                    else tObj.GW_STATUS_N = 'NEW';
                } else if (tObj.GW_STATUS === '1') tObj.GW_STATUS_N = 'SEND';
                else if (tObj.GW_STATUS === '2') {
                    if (parseFloat(tObj.BAL_AMT) <= 0) tObj.GW_STATUS_N = 'END';
                    else if (
                        parseFloat(tObj.BAL_AMT) > 0 &&
                        parseFloat(tObj.PAID_AMT) > 0
                    )
                        tObj.GW_STATUS_N = 'PART';
                } else if (
                    tObj.GW_STATUS === '' ||
                    tObj.GW_STATUS === '0' ||
                    tObj.GW_STATUS === '6'
                )
                    tObj.GW_STATUS_N = 'NEW';
                else {
                    if (tObj.GW_STATUS === '3') tObj.GW_STATUS_N = 'REJECT';
                    else if (tObj.GW_STATUS === '4')
                        tObj.GW_STATUS_N = 'CANCEL';
                    else if (tObj.GW_STATUS === '5')
                        tObj.GW_STATUS_N = 'DELETE';
                    else if (tObj.GW_STATUS === '6') tObj.GW_STATUS_N = 'WAIT';
                }

                tObj.TAX_KIND_N = '';
                if (tObj.TAX_KIND === '1') tObj.TAX_KIND_N = '과세';
                if (tObj.TAX_KIND === '2') tObj.TAX_KIND_N = '영세';
                if (tObj.TAX_KIND === '3') tObj.TAX_KIND_N = '면세';
                if (tObj.TAX_KIND === '5') tObj.TAX_KIND_N = 'T/T';

                tObj.BAL_DEBIT = '0';
                tObj.BUY_DATE = '';
                tObj.GW_STATUS_CD = '';

                console.log(`Step-2(1):${args.data.GW_STATUS}`);
                if (args.data.GW_STATUS === 'ALL');
                else if (args.data.GW_STATUS === 'NEW') {
                    if (
                        tObj.GW_STATUS === '' ||
                        tObj.GW_STATUS === '0' ||
                        tObj.GW_STATUS === '6'
                    );
                    else continue;
                } else if (args.data.GW_STATUS === 'SEND') {
                    if (tObj.GW_STATUS === '1');
                    else continue;
                } else if (args.data.GW_STATUS === 'PART') {
                    if (
                        parseFloat(tObj.PAID_AMT) > 0 &&
                        parseFloat(tObj.BAL_AMT) > 0
                    );
                    else continue;
                } else if (args.data.GW_STATUS === 'END') {
                    if (
                        tObj.GW_STATUS === '2' &&
                        parseFloat(tObj.PAID_AMT) > 0 &&
                        parseFloat(tObj.BAL_AMT) <= 0
                    );
                    else continue;
                } else continue;

                tRetArray.push(tObj);
                if (tRetArray.length > 1000) break;
            }

            var tMessage = '';
            if (tRet.length > 1000)
                tMessage = `${tRet.length}건이 조회되었습니다. 상위 1000건만 출력합니다. `;

            var tRetArray1 = [];
            var tSaveObj = {};
            tRetArray.forEach((col, i) => {
                if (i === 0) {
                    tRetArray1.push(col);
                } else {
                    if (tSaveObj.BILL_CD === col.BILL_CD);
                    else tRetArray1.push(col);
                }
                tSaveObj = { ...col };
            });

            var tWObj = {};
            tWObj.MESSAGE = tMessage;
            tWObj.DATAS = [...tRetArray1];
            return tWObj;
        },

        mgrQueryS0423_LIST_1_bak7: async (_, args, contextValue) => {
            const tRetDate = AFLib.getCurrTime();
            const tRetDate1 = tRetDate.substring(0, 8);
            const tUserInfo = AFLib.getUserInfo(contextValue);

            let sDate =
                args.data.S_PAY_DATE || `${tRetDate1.substring(0, 4)}0101`;
            let eDate = args.data.E_PAY_DATE || '99999999';
            let sDate1 =
                args.data.S_IN_DATE || `${tRetDate1.substring(0, 4)}0101`;
            let eDate1 = args.data.E_IN_DATE || '99999999';

            const payDateSql1 = `and a.pay_date between '${sDate}' and '${eDate}' `;
            const endDateSql1 = `and a.end_date between '${sDate1}' and '${eDate1}' `;

            const sqlStr = `
                select
                    b.VENDOR_CD,
                    c.VENDOR_NAME,
                    c.VENDOR_TYPE,
                    isnull(c1.CD_NAME, '') as VENDOR_TYPE_N,
                    isnull(a.PAY_DATE, '') as PAY_DATE,
                    isnull(a.PAY_CURR_CD, '') as CURR_CD,
                    isnull(a.END_DATE, '') as INVOICE_DATE,
                    isnull(a.PUR_FACTORY, '') as PUR_FACTORY,
                    isnull(a.PUR_APP, '') as PUR_APP,
                    isnull(a.TT_FLAG, '') as TT_FLAG,
                    isnull(a.PAY_REPORT, '') as PAY_REPORT,
                    isnull(a.BILL_NO, '') as BILL_CD,
                    isnull(a1.PAY_BANK, '') as PAY_BANK,
                    isnull(a1.GW_STATUS, '') as GW_STATUS,
                    isnull(a1.TAX_KIND, '') as TAX_KIND,
                    isnull(c.PAY_TYPE, '') as PAY_TYPE,
                    isnull(c2.CD_NAME, '') as PAY_TYPE_N,
                    isnull(c.PAY_TERM, '0') as PAY_TERM,
                    isnull(a1.BILL_FLAG, '') as BILL_FLAG,
                    isnull(a1.REG_USER, '') as REG_USER,
                    isnull(a1.PAID_AMT, '') as PAID_AMT,
                    isnull(a.CALC_FLAG, '0') as CALC_FLAG,
                    isnull(a.TAX, '0') as VAT_AMT,
                    isnull(e1.COMPANY_CODE, '') as COMPANY_CODE,
                    isnull(a1.TAXBILL_CD, '') as TAXBILL_CD,
                    sum(a.IN_QTY) as IN_QTY,
                    sum(a.IN_QTY * a.PAY_PRICE) as IN_AMT,
                    sum(isnull(a.LC_QTY, 0)) as LC_QTY,
                    sum(isnull(a.LC_QTY, 0) * a.PAY_PRICE) as LC_AMT
                from
                    ksv_stock_in a
                    left join ksv_bill_mst a1 on a1.bill_cd = a.bill_no,
                    kcd_matl_mst b,
                    kcd_buyer e,
                    kcd_user e1,
                    kcd_vendor c
                    left join kcd_code c1 on c1.cd_code = c.vendor_type
                    and c1.cd_group = 'VENDOR_TYPE'
                    left join kcd_code c2 on c2.cd_code = c.pay_type
                    and c2.cd_group = 'PAY_TYPE'
                where
                    1 = 1
                    and a.matl_cd = b.matl_cd
                    and b.vendor_cd = c.vendor_cd
                    and left(a.order_cd, 2) = e.buyer_cd
                    and e.reg_user = e1.user_id
                    and a.bill_no like '%${args.data.BILL_CD}%'
                    and c.vendor_cd like '%${args.data.VENDOR_CD}%'
                    and c.vendor_type like '%${args.data.VENDOR_TYPE}%'
                    and a.end_flag = '1'
                    and a.end_date <> '' ${payDateSql1} ${endDateSql1}
                group by
                    b.VENDOR_CD,
                    c.VENDOR_NAME,
                    c.VENDOR_TYPE,
                    c1.CD_NAME,
                    a.PAY_DATE,
                    a.PAY_CURR_CD,
                    a.END_DATE,
                    a.PUR_FACTORY,
                    a.PUR_APP,
                    a.TT_FLAG,
                    a.PAY_REPORT,
                    a.BILL_NO,
                    a1.PAY_BANK,
                    a1.GW_STATUS,
                    a1.TAX_KIND,
                    c.PAY_TYPE,
                    c2.CD_NAME,
                    c.PAY_TERM,
                    a1.BILL_FLAG,
                    a1.REG_USER,
                    a1.PAID_AMT,
                    a.CALC_FLAG,
                    a.TAX,
                    e1.COMPANY_CODE
                order by
                    c.VENDOR_NAME,
                    e1.COMPANY_CODE desc,
                    a.END_DATE
            `;

            const tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            const key10 = (o) =>
                `${o.VENDOR_CD}_${o.INVOICE_DATE}_${o.PAY_DATE}_${o.CURR_CD}_${o.PUR_FACTORY}_${o.PUR_APP}_${o.TT_FLAG}`;
            const key11 = (o) =>
                `${o.VENDOR_CD}_${o.INVOICE_DATE}_${o.PAY_DATE}_${o.CURR_CD}`;

            const map10Keys = Array.from(new Set(tRet.map(key10)));
            const map11Keys = Array.from(new Set(tRet.map(key11)));

            const tSql10All = await prisma.$queryRaw(
                Prisma.raw(`
                    select
                        isnull(a.APPROKEY, '') as APPROKEY,
                        isnull(a.TAXBILL_DATE, '') as TAXBILL_DATE,
                        isnull(a.TAXBILL_CD, '') as TAXBILL_CD,
                        isnull(a.STATUS_CD, '') as GW_STATUS,
                        isnull(b.CD_NAME, '') as GW_STATUS_N,
                        a.vendor_cd,
                        a.closing_date,
                        a.pay_date,
                        a.curr_cd,
                        a.pur_factory,
                        a.pur_app,
                        a.tt_flag
                    from
                        kcd_gw_taxbill_kr a
                        left join kcd_code b on b.cd_code = a.STATUS_CD
                        and b.cd_group = 'GW_STATUS'
                `),
            );

            const tSql11All = await prisma.$queryRaw(
                Prisma.raw(`
                    select
                        vendor_cd,
                        end_date,
                        pay_date,
                        curr_cd,
                        isnull(sum(dn_amount), 0) as dn_amount,
                        isnull(sum(dc_amount), 0) as dc_amount
                    from
                        ksv_dc_amount
                    group by
                        vendor_cd,
                        end_date,
                        pay_date,
                        curr_cd
                `),
            );

            const tMap10 = {};
            for (const r of tSql10All) {
                const k = `${r.vendor_cd}_${r.closing_date}_${r.pay_date}_${r.curr_cd}_${r.pur_factory}_${r.pur_app}_${r.tt_flag}`;
                tMap10[k] = r;
            }
            const tMap11 = {};
            for (const r of tSql11All) {
                const k = `${r.vendor_cd}_${r.end_date}_${r.pay_date}_${r.curr_cd}`;
                tMap11[k] = r;
            }

            const tRetArray = [];

            for (let i = 0; i < tRet.length; i++) {
                const tObj = { ...tRet[i] };

                tObj.BILL_FLAG = tObj.CALC_FLAG === '1' ? 'O' : 'X';
                if (
                    parseFloat(tObj.IN_QTY) <= 0 &&
                    parseFloat(tObj.LC_QTY) <= 0
                )
                    continue;

                const tPO_AMT =
                    parseFloat(tObj.IN_AMT) + parseFloat(tObj.LC_AMT);
                tObj.PO_AMT = String(tPO_AMT);
                tObj.DEPOSIT_AMT =
                    parseFloat(tObj.IN_QTY) > 0 && parseFloat(tObj.LC_QTY) > 0
                        ? String(tObj.LC_AMT)
                        : '0';
                if (
                    parseFloat(tObj.IN_QTY) === 0 &&
                    parseFloat(tObj.LC_QTY) > 0
                )
                    tObj.LC_FLAG = '1';

                const r10 = tMap10[key10(tObj)] || {};
                tObj.TAXBILL_CD = r10.TAXBILL_CD || '';
                tObj.APPROKEY = r10.APPROKEY || '';
                tObj.GW_STATUS = r10.GW_STATUS || '';
                tObj.GW_STATUS_N = r10.GW_STATUS_N || '';

                if (args.data.GW_STATUS !== '') {
                    if (args.data.GW_STATUS === '0') {
                        if (
                            tObj.GW_STATUS &&
                            tObj.GW_STATUS !== '0' &&
                            tObj.GW_STATUS !== '6'
                        )
                            continue;
                    } else {
                        if (tObj.GW_STATUS !== args.data.GW_STATUS) continue;
                    }
                }

                const r11 = tMap11[key11(tObj)] || {};
                tObj.DEBIT_AMT = r11.dn_amount || '0';
                tObj.DISCOUNT_AMT = r11.dc_amount || '0';

                let tPAY_AMT = parseFloat(tObj.PO_AMT);
                tPAY_AMT -= parseFloat(tObj.DEPOSIT_AMT);
                tPAY_AMT -= parseFloat(tObj.LC_AMT);
                tPAY_AMT -= parseFloat(tObj.DEBIT_AMT);
                tPAY_AMT -= parseFloat(tObj.DISCOUNT_AMT);
                tPAY_AMT += parseFloat(tObj.VAT_AMT);

                tObj.PAY_AMT = AFLib.numToFixed(tPAY_AMT, 2);
                tObj.IN_PAY_AMT = '0';
                tObj.PO_AMT = AFLib.numToFixed(tObj.PO_AMT, 2);
                tObj.DEPOSIT_AMT = AFLib.numToFixed(tObj.DEPOSIT_AMT, 2);
                tObj.END_AMT = AFLib.numToFixed(tObj.END_AMT, 2);

                tObj.TAX_KIND_N = '';
                tObj.BAL_DEBIT = '0';
                tObj.BUY_DATE = '';
                tObj.GW_STATUS_CD = '';

                tRetArray.push(tObj);
                if (tRetArray.length > 1000) break;
            }

            const tMessage =
                tRet.length > 1000
                    ? `${tRet.length}건이 조회되었습니다. 상위 1000건만 출력합니다. `
                    : '';

            return {
                MESSAGE: tMessage,
                DATAS: tRetArray,
            };
        },

        mgrQueryS0423_LIST_1_bak6: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tSQL = '';
            var tSQL1 = '';

            var sDate = args.data.S_PAY_DATE;
            var eDate = args.data.E_PAY_DATE;

            if (sDate === '') sDate = `${tRetDate1.substring(0, 4)}0101`;
            if (eDate === '') eDate = '99999999';

            var payDateSql1 = `and a.pay_date between '${sDate}' and '${eDate}' `;

            ('');
            var sDate1 = args.data.S_IN_DATE;
            var eDate1 = args.data.E_IN_DATE;

            if (sDate1 === '') sDate1 = `${tRetDate1.substring(0, 4)}0101`;
            if (eDate1 === '') eDate1 = '99999999';

            var endDateSql1 = `and a.end_date between '${sDate1}' and '${eDate1}' `;

            let sqlStr = `
                select
                    b.VENDOR_CD,
                    c.VENDOR_NAME,
                    c.VENDOR_TYPE,
                    isnull(c1.CD_NAME, '') as VENDOR_TYPE_N,
                    isnull(a.PAY_DATE, '') as PAY_DATE,
                    isnull(a.PAY_CURR_CD, '') as CURR_CD,
                    isnull(a.END_DATE, '') as INVOICE_DATE,
                    isnull(a.PUR_FACTORY, '') as PUR_FACTORY,
                    isnull(a.PUR_APP, '') as PUR_APP,
                    isnull(a.TT_FLAG, '') as TT_FLAG,
                    isnull(a.PAY_REPORT, '') as PAY_REPORT,
                    isnull(a.BILL_NO, '') as BILL_CD,
                    isnull(a1.PAY_BANK, '') as PAY_BANK,
                    isnull(a1.GW_STATUS, '') as GW_STATUS,
                    isnull(a1.TAX_KIND, '') as TAX_KIND,
                    isnull(c.PAY_TYPE, '') as PAY_TYPE,
                    isnull(c2.CD_NAME, '') as PAY_TYPE_N,
                    isnull(c.PAY_TERM, '0') as PAY_TERM,
                    isnull(a1.BILL_FLAG, '') as BILL_FLAG,
                    isnull(a1.REG_USER, '') as REG_USER,
                    isnull(a1.PAID_AMT, '') as PAID_AMT,
                    isnull(a.CALC_FLAG, '0') as CALC_FLAG,
                    isnull(a.TAX, '0') as VAT_AMT,
                    isnull(e1.COMPANY_CODE, '') as COMPANY_CODE,
                    sum(a.IN_QTY) as IN_QTY,
                    sum(a.IN_QTY * a.PAY_PRICE) as IN_AMT,
                    sum(isnull(a.LC_QTY, 0)) as LC_QTY,
                    sum(isnull(a.LC_QTY, 0) * a.PAY_PRICE) as LC_AMT
                from
                    ksv_stock_in a
                    left join ksv_bill_mst a1 on a1.bill_cd = a.bill_no,
                    kcd_matl_mst b,
                    kcd_buyer e,
                    kcd_user e1,
                    kcd_vendor c
                    left join kcd_code c1 on c1.cd_code = c.vendor_type
                    and c1.cd_group = 'VENDOR_TYPE'
                    left join kcd_code c2 on c2.cd_code = c.pay_type
                    and c2.cd_group = 'PAY_TYPE'
                where
                    1 = 1
                    and a.matl_cd = b.matl_cd
                    and b.vendor_cd = c.vendor_cd
                    and left(a.order_cd, 2) = e.buyer_cd
                    and e.reg_user = e1.user_id
                    and a.bill_no like '%${args.data.BILL_CD}%'
                    and c.vendor_cd like '%${args.data.VENDOR_CD}%'
                    and c.vendor_type like '%${args.data.VENDOR_TYPE}%'
                    and a.end_flag = '1'
                    and a.end_date <> '' ${payDateSql1} ${endDateSql1}
                group by
                    b.VENDOR_CD,
                    c.VENDOR_NAME,
                    c.VENDOR_TYPE,
                    c1.CD_NAME,
                    a.PAY_DATE,
                    a.PAY_CURR_CD,
                    a.END_DATE,
                    a.PUR_FACTORY,
                    a.PUR_APP,
                    a.TT_FLAG,
                    a.PAY_REPORT,
                    a.BILL_NO,
                    a1.PAY_BANK,
                    a1.GW_STATUS,
                    a1.TAX_KIND,
                    c.PAY_TYPE,
                    c2.CD_NAME,
                    c.PAY_TERM,
                    a1.BILL_FLAG,
                    a1.REG_USER,
                    a1.PAID_AMT,
                    a.CALC_FLAG,
                    a.TAX,
                    e1.COMPANY_CODE
                order by
                    c.VENDOR_NAME,
                    e1.COMPANY_CODE desc,
                    a.END_DATE
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            var tRetArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tObj = { ...tRet[tIdx] };

                if (tObj.CALC_FLAG === '1') tObj.BILL_FLAG = 'O';
                else tObj.BILL_FLAG = 'X';

                if (
                    parseFloat(tObj.IN_QTY) <= 0 &&
                    parseFloat(tObj.LC_QTY) <= 0
                )
                    continue;

                var tPO_AMT = parseFloat(tObj.IN_AMT) + parseFloat(tObj.LC_AMT);
                tObj.PO_AMT = String(tPO_AMT);

                tObj.DEPOSIT_AMT = '0';
                if (
                    parseFloat(tObj.IN_QTY) > 0 &&
                    parseFloat(tObj.LC_QTY) > 0
                ) {
                    var tDepositAmt = tObj.LC_AMT;
                    tObj.DEPOSIT_AMT = String(tDepositAmt);
                }

                if (
                    parseFloat(tObj.IN_QTY) === 0 &&
                    parseFloat(tObj.LC_QTY) > 0
                )
                    tObj.LC_FLAG = '1';

                var tSql10 = `
                    select
                        isnull(a.APPROKEY, '') as APPROKEY,
                        isnull(a.TAXBILL_DATE, '') as TAXBILL_DATE,
                        isnull(a.TAXBILL_CD, '') as TAXBILL_CD,
                        isnull(a.STATUS_CD, '') as GW_STATUS,
                        isnull(b.CD_NAME, '') as GW_STATUS_N
                    from
                        kcd_gw_taxbill_kr a
                        left join kcd_code b on b.cd_code = a.STATUS_CD
                        and b.cd_group = 'GW_STATUS'
                    where
                        a.vendor_cd = '${tObj.VENDOR_CD}'
                        and a.closing_date = '${tObj.INVOICE_DATE}'
                        and a.pay_date = '${tObj.PAY_DATE}'
                        and a.curr_cd = '${tObj.CURR_CD}'
                        and a.pur_factory = '${tObj.PUR_FACTORY}'
                        and a.pur_app = '${tObj.PUR_APP}'
                        and a.tt_flag = '${tObj.TT_FLAG}'
                `;
                var tRet0_2 = await prisma.$queryRaw(Prisma.raw(tSql10));
                if (tRet0_2.length > 0) {
                    tObj.TAXBILL_CD = tRet0_2[0].TAXBILL_CD;
                    tObj.APPROKEY = tRet0_2[0].APPROKEY;
                    tObj.GW_STATUS = tRet0_2[0].GW_STATUS;
                    tObj.GW_STATUS_N = tRet0_2[0].GW_STATUS_N;
                } else {
                    tObj.TAXBILL_CD = '';
                    tObj.APPROKEY = '';
                    tObj.GW_STATUS = '';
                    tObj.GW_STATUS_N = '';
                }

                if (args.data.GW_STATUS !== '') {
                    if (args.data.GW_STATUS === '0') {
                        if (!tObj.GW_STATUS);
                        else if (tObj.GW_STATUS === '');
                        else if (tObj.GW_STATUS === '0');
                        else if (tObj.GW_STATUS === '6');
                        else continue;
                    } else {
                        if (tObj.GW_STATUS !== args.data.GW_STATUS) continue;
                    }
                }

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

                var tPAY_AMT = parseFloat(tObj.PO_AMT);
                tPAY_AMT -= parseFloat(tObj.DEPOSIT_AMT);
                tPAY_AMT -= parseFloat(tObj.LC_AMT);
                tPAY_AMT -= parseFloat(tObj.DEBIT_AMT);
                tPAY_AMT -= parseFloat(tObj.DISCOUNT_AMT);
                tPAY_AMT += parseFloat(tObj.VAT_AMT);
                tObj.PAY_AMT = String(tPAY_AMT);
                tObj.IN_PAY_AMT = '0';
                tObj.PO_AMT = AFLib.numToFixed(parseFloat(tObj.PO_AMT), 2);
                tObj.DEPOSIT_AMT = AFLib.numToFixed(
                    parseFloat(tObj.DEPOSIT_AMT),
                    2,
                );
                tObj.PAY_AMT = AFLib.numToFixed(parseFloat(tObj.PAY_AMT), 2);
                tObj.END_AMT = AFLib.numToFixed(parseFloat(tObj.END_AMT), 2);

                tObj.TAX_KIND_N = '';
                tObj.BAL_DEBIT = '0';
                tObj.BUY_DATE = '';
                tObj.GW_STATUS_CD = '';

                tRetArray.push(tObj);

                if (tRetArray.length > 1000) break;
            }

            var tMessage = '';
            if (tRet.length > 1000)
                tMessage = `${tRet.length}건이 조회되었습니다. 상위 1000건만 출력합니다. `;

            var tWObj = {};
            tWObj.MESSAGE = tMessage;
            tWObj.DATAS = [...tRetArray];
            return tWObj;
        },

        mgrQueryS0423_LIST_1_bak2: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tSQL = '';
            var tSQL1 = '';

            var sInDate = args.data.S_IN_DATE;
            var eInDate = args.data.E_IN_DATE;
            if (sInDate === '') sInDate = `${tRetDate1}`;
            if (eInDate === '') eInDate = `99999999`;
            // tSQL = ` and  a1.invoice_date between '${sInDate}' and '${eInDate}'  `;
            tSQL = ` and  k1.end_date between '${sInDate}' and '${eInDate}'  `;

            var sPayDate = args.data.S_PAY_DATE;
            var ePayDate = args.data.E_PAY_DATE;
            if (sPayDate === '') sPayDate = `${tRetDate1}`;
            if (ePayDate === '') ePayDate = `99999999`;
            // tSQL += ` and  a1.pay_date between '${sPayDate}' and '${ePayDate}'  `;
            tSQL += ` and  k1.pay_date between '${sPayDate}' and '${ePayDate}'  `;

            if (args.data.BILL_CD !== '') tSQL = '';

            let sqlStr = `
                select
                    b2.CD_NAME as TAX_KIND_N,
                    a1.TAX_KIND,
                    a1.BILL_CD,
                    b1.VENDOR_NAME,
                    b1.VENDOR_CD,
                    b1.VENDOR_TYPE,
                    b6.CD_NAME as VENDOR_TYPE_N,
                    a1.INVOICE_DATE,
                    a1.PAY_DATE,
                    isnull(b1.PAY_TERM, '0') as PAY_TERM,
                    isnull(b1.PAY_TYPE, '') as PAY_TYPE,
                    a1.CURR_CD,
                    isnull(t1.s_in_amt, '0') as PO_AMT,
                    0 as DEPOSIT_AMT,
                    isnull(t1.s_lc_amt, 0) as LC_AMT,
                    a1.DEBIT_AMT,
                    a1.DISCOUNT_AMT,
                    a1.VAT_AMT,
                    isnull(a1.PAY_AMT, 0) as PAY_AMT,
                    a1.REG_USER,
                    a1.BILL_FLAG,
                    a1.GW_STATUS,
                    isnull(b3.CD_NAME, '') as GW_STATUS_N,
                    a1.PAY_BANK,
                    isnull(b4.BANK_NAME, '') as BANK_NAME,
                    isnull(b4.ACCOUNT_NO, '') as ACCOUNT_NO,
                    isnull(b4.ACCOUNT_NAME, '') as ACCOUNT_NAME,
                    isnull(a1.TAXBILL_CD, '') as TAXBILL_CD,
                    isnull(b4.SFTCODE, '') as SFTCODE,
                    isnull(b5.CD_NAME, '') as PAY_TYPE_N,
                    -- isnull(a1.APPRO_KEY, '') as APPROKEY,
                    isnull(a1.PAY_REPORT, '') as PAY_REPORT,
                    isnull(a1.PUR_FACTORY, '') as PUR_FACTORY,
                    isnull(a1.DOCU_NO, '') as DOCU_NO,
                    isnull(a1.BUY_DATE, '') as BUY_DATE,
                    isnull(b7.APPROKEY, '') as APPROKEY,
                    isnull(b7.STATUS_CD, '') as GW_STATUS_CD,
                    isnull(b7.TAXBILL_CD, '') as TAXBILL_CD
                from
                    (
                        select
                            k.bill_cd,
                            k1.end_date,
                            isnull(k1.pay_report, '') as pay_report,
                            k1.pay_curr_cd,
                            k1.pur_factory,
                            k1.vendor_cd,
                            sum(k1.in_qty) as s_in_qty,
                            sum(k1.in_qty * k1.pay_price) as s_in_amt,
                            sum(k1.lc_qty) as s_lc_qty,
                            sum(k1.lc_qty * k1.pay_price) as s_lc_amt,
                            sum(k1.usd_amt) as s_usd_amt,
                            sum(k1.pack_usd_amt) as s_pack_usd_amt,
                            count(*) as c_cnt
                        from
                            ksv_bill_mst k,
                            ksv_stock_in k1,
                            ksv_pu_mst2 k2
                        where
                            (
                                k1.stsin_cd is not null
                                and k1.stsin_cd <> ''
                            )
                            and k.bill_cd like '%${args.data.BILL_CD}%'
                            and k.reg_user like '%${args.data.REG_USER}%'
                            and k.gw_status like '%${args.data.GW_STATUS}%'
                            and k1.end_flag = '1'
                            and k1.pu_cd = k2.pu_cd
                            and (
                                (
                                    left(k1.po_cd, 1) = 'P'
                                    and k2.bill_to = 'SHINTS'
                                )
                                or left(k1.po_cd, 1) = 'E'
                            )
                            and k1.bill_no = k.bill_cd
                            and k1.vendor_cd like '%${args.data.VENDOR_CD}%' ${tSQL} ${tSQL1}
                        group by
                            k.bill_cd,
                            k1.end_date,
                            k1.pay_report,
                            k1.pay_curr_cd,
                            k1.pur_factory,
                            k1.vendor_cd
                            -- order by k1.end_date
                    ) t1,
                    ksv_bill_mst a1
                    left join kcd_gw_taxbill_kr b7 on b7.doc_no = a1.pay_report
                    and b7.vendor_cd = a1.vendor_cd
                    and b7.curr_cd = a1.curr_cd
                    and b7.closing_date = a1.invoice_date
                    -- and  b7.pur_factory = a1.pur_factory
                    left join kcd_bank b4 on a1.pay_bank = b4.bank_cd
                    left join kcd_code b3 on a1.gw_status = b3.cd_code
                    and b3.cd_group = 'GW_STATUS'
                    left join kcd_code b2 on a1.tax_kind = b2.cd_code
                    and b2.cd_group = 'TAX_KIND',
                    kcd_vendor b1
                    left join kcd_code b5 on b5.cd_code = b1.PAY_TYPE
                    and b5.cd_group = 'PAY_TYPE'
                    left join kcd_code b6 on b6.cd_code = b1.VENDOR_TYPE
                    and b6.cd_group = 'VENDOR_TYPE'
                where
                    t1.bill_cd = a1.bill_cd
                    and a1.vendor_cd = b1.vendor_cd
                    and a1.bill_cd like '%${args.data.BILL_CD}%'
                    and a1.reg_user like '%${args.data.REG_USER}%'
                    and a1.gw_status like '%${args.data.GW_STATUS}%'
                    and b1.vendor_type like '%${args.data.VENDOR_TYPE}%'
                    and b1.vendor_cd like '%${args.data.VENDOR_CD}%'
                    -- and   (a1.bill_flag is null or  a1.bill_flag = '')
                order by
                    b1.vendor_cd
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tOne = { ...tRet[tIdx] };
                let sqlStr1 = `
                    select
                        isnull(sum(crdb_amt), 0) as sum_amt
                    from
                        ksv_crdb_mst
                    where
                        messer_cd = '${tOne.VENDOR_CD}'
                        and status_cd = '0'
                `;
                var tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));
                tOne.BAL_DEBIT = '0';
                if (tRet1.length > 0) tOne.BAL_DEBIT = String(tRet1[0].sum_amt);

                let sqlStr2 = `
                    select
                        isnull(sum(dn_amount), 0) as dn_amount,
                        isnull(sum(dc_amount), 0) as dc_amount
                    from
                        ksv_dc_amount
                    where
                        bill_cd = '${tOne.BILL_CD}'
                `;
                var tRet2 = await prisma.$queryRaw(Prisma.raw(sqlStr2));
                var tDnAmount = 0;
                var tDcAmount = 0;
                if (tRet2.length > 0) {
                    tDnAmount = tRet2[0].dn_amount;
                    tDcAmount = tRet2[0].dc_amount;
                }

                let sqlStr3 = `
                    select
                        *
                    from
                        ksv_stock_in
                    where
                        bill_no = '${tOne.BILL_CD}'
                        and calc_flag = '1'
                `;
                var tRet3 = await prisma.$queryRaw(Prisma.raw(sqlStr3));
                if (tRet3.length > 0) tOne.BILL_FLAG = '1';
                else tOne.BILL_FLAG = '0';

                tOne.PO_AMT = AFLib.getFloat(parseFloat(tOne.PO_AMT), 2);
                if (parseFloat(tOne.LC_AMT) > 0) {
                    if (tOne.PAY_REPORT.includes('LC-')) {
                        tOne.DEPOSIT_AMT = '0';
                        tOne.LC_AMT = AFLib.getFloat(
                            parseFloat(tOne.LC_AMT),
                            2,
                        );
                        tOne.PAY_AMT = AFLib.getFloat(
                            parseFloat(tOne.LC_AMT),
                            2,
                        );
                    } else if (tOne.PAY_REPORT.includes('Deposit-')) {
                        tOne.DEPOSIT_AMT = AFLib.getFloat(
                            parseFloat(tOne.DEPOSIT_AMT),
                            2,
                        );
                        tOne.LC_AMT = '0';
                        tOne.PAY_AMT = AFLib.getFloat(
                            parseFloat(tOne.DEPOSIT_AMT),
                            2,
                        );
                    } else {
                        tOne.DEPOSIT_AMT = AFLib.getFloat(
                            parseFloat(tOne.DEPOSIT_AMT),
                            2,
                        );
                        tOne.LC_AMT = '0';
                    }
                }
                tOne.DEBIT_AMT = AFLib.getFloat(parseFloat(tDnAmount), 2);
                tOne.DISCOUNT_AMT = AFLib.getFloat(parseFloat(tDcAmount), 2);
                tOne.VAT_AMT = AFLib.getFloat(parseFloat(tOne.VAT_AMT), 2);
                tOne.PAY_AMT = AFLib.getFloat(parseFloat(tOne.PAY_AMT), 2);

                tArray.push(tOne);
            }
            console.log(`Datas Count:${tRet.length}`);
            return tArray;
        },
        mgrQueryS0423_LIST_1_bak: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tSQL = '';
            var tSQL1 = '';

            var sInDate = args.data.S_IN_DATE;
            var eInDate = args.data.E_IN_DATE;
            if (sInDate === '') sInDate = `${tRetDate1}`;
            if (eInDate === '') eInDate = `99999999`;
            tSQL = ` and  a1.invoice_date between '${sInDate}' and '${eInDate}'  `;

            var sPayDate = args.data.S_PAY_DATE;
            var ePayDate = args.data.E_PAY_DATE;
            if (sPayDate === '') sPayDate = `${tRetDate1}`;
            if (ePayDate === '') ePayDate = `99999999`;
            tSQL += ` and  a1.pay_date between '${sPayDate}' and '${ePayDate}'  `;

            let sqlStr = `
                select
                    b2.CD_NAME as TAX_KIND_N,
                    a1.TAX_KIND,
                    a1.BILL_CD,
                    b1.VENDOR_NAME,
                    b1.VENDOR_CD,
                    b1.VENDOR_TYPE,
                    b6.CD_NAME as VENDOR_TYPE_N,
                    a1.INVOICE_DATE,
                    a1.PAY_DATE,
                    isnull(b1.PAY_TERM, '0') as PAY_TERM,
                    isnull(b1.PAY_TYPE, '') as PAY_TYPE,
                    a1.CURR_CD,
                    isnull(a1.PO_AMT, '0') as PO_AMT,
                    isnull(a1.DEPOSIT_AMT, 0) as DEPOSIT_AMT,
                    isnull(a1.LC_AMT, 0) as LC_AMT,
                    a1.DEBIT_AMT,
                    a1.DISCOUNT_AMT,
                    a1.VAT_AMT,
                    isnull(a1.PAY_AMT, 0) as PAY_AMT,
                    a1.REG_USER,
                    a1.BILL_FLAG,
                    a1.GW_STATUS,
                    isnull(b3.CD_NAME, '') as GW_STATUS_N,
                    a1.PAY_BANK,
                    isnull(b4.BANK_NAME, '') as BANK_NAME,
                    isnull(b4.ACCOUNT_NO, '') as ACCOUNT_NO,
                    isnull(b4.ACCOUNT_NAME, '') as ACCOUNT_NAME,
                    isnull(a1.TAXBILL_CD, '') as TAXBILL_CD,
                    isnull(b4.SFTCODE, '') as SFTCODE,
                    isnull(b5.CD_NAME, '') as PAY_TYPE_N,
                    -- isnull(a1.APPRO_KEY, '') as APPROKEY,
                    isnull(a1.PAY_REPORT, '') as PAY_REPORT,
                    isnull(a1.PUR_FACTORY, '') as PUR_FACTORY,
                    isnull(a1.DOCU_NO, '') as DOCU_NO,
                    isnull(a1.BUY_DATE, '') as BUY_DATE,
                    isnull(b7.APPROKEY, '') as APPROKEY,
                    isnull(b7.STATUS_CD, '') as GW_STATUS_CD,
                    isnull(b7.TAXBILL_CD, '') as TAXBILL_CD
                from
                    ksv_bill_mst a1
                    left join kcd_gw_taxbill_kr b7 on b7.doc_no = a1.pay_report
                    and b7.vendor_cd = a1.vendor_cd
                    and b7.curr_cd = a1.curr_cd
                    and b7.closing_date = a1.invoice_date
                    -- and  b7.pur_factory = a1.pur_factory
                    left join kcd_bank b4 on a1.pay_bank = b4.bank_cd
                    left join kcd_code b3 on a1.gw_status = b3.cd_code
                    and b3.cd_group = 'GW_STATUS'
                    left join kcd_code b2 on a1.tax_kind = b2.cd_code
                    and b2.cd_group = 'TAX_KIND',
                    kcd_vendor b1
                    left join kcd_code b5 on b5.cd_code = b1.PAY_TYPE
                    and b5.cd_group = 'PAY_TYPE'
                    left join kcd_code b6 on b6.cd_code = b1.VENDOR_TYPE
                    and b6.cd_group = 'VENDOR_TYPE'
                where
                    a1.vendor_cd = b1.vendor_cd
                    and a1.bill_cd like '%${args.data.BILL_CD}%'
                    and a1.reg_user like '%${args.data.REG_USER}%'
                    and a1.gw_status like '%${args.data.GW_STATUS}%' ${tSQL} ${tSQL1}
                    and b1.vendor_type like '%${args.data.VENDOR_TYPE}%'
                    and b1.vendor_cd like '%${args.data.VENDOR_CD}%'
                    -- and   (a1.bill_flag is null or  a1.bill_flag = '')
                order by
                    b1.vendor_cd
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tOne = { ...tRet[tIdx] };
                let sqlStr1 = `
                    select
                        isnull(sum(crdb_amt), 0) as sum_amt
                    from
                        ksv_crdb_mst
                    where
                        messer_cd = '${tOne.VENDOR_CD}'
                        and status_cd = '0'
                `;
                var tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));
                tOne.BAL_DEBIT = '0';
                if (tRet1.length > 0) tOne.BAL_DEBIT = String(tRet1[0].sum_amt);

                let sqlStr2 = `
                    select
                        isnull(sum(dn_amount), 0) as dn_amount,
                        isnull(sum(dc_amount), 0) as dc_amount
                    from
                        ksv_dc_amount
                    where
                        bill_cd = '${tOne.BILL_CD}'
                `;
                var tRet2 = await prisma.$queryRaw(Prisma.raw(sqlStr2));
                var tDnAmount = 0;
                var tDcAmount = 0;
                if (tRet2.length > 0) {
                    tDnAmount = tRet2[0].dn_amount;
                    tDcAmount = tRet2[0].dc_amount;
                }

                tOne.PO_AMT = AFLib.getFloat(parseFloat(tOne.PO_AMT), 2);
                tOne.DEPOSIT_AMT = AFLib.getFloat(
                    parseFloat(tOne.DEPOSIT_AMT),
                    2,
                );
                tOne.LC_AMT = AFLib.getFloat(parseFloat(tOne.LC_AMT), 2);
                tOne.DEBIT_AMT = AFLib.getFloat(parseFloat(tDnAmount), 2);
                tOne.DISCOUNT_AMT = AFLib.getFloat(parseFloat(tDcAmount), 2);
                tOne.VAT_AMT = AFLib.getFloat(parseFloat(tOne.VAT_AMT), 2);
                tOne.PAY_AMT = AFLib.getFloat(parseFloat(tOne.PAY_AMT), 2);

                tArray.push(tOne);
            }
            return tArray;
        },
        mgrQueryS0423_LIST_1_bak3: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var sqlInDate = '';
            var sInDate = args.data.S_IN_DATE;
            var eInDate = args.data.E_IN_DATE;
            if (sInDate === '') sInDate = `${tRetDate1}`;
            if (eInDate === '') eInDate = `99999999`;
            if (args.data.S_IN_DATE !== '' || args.data.E_IN_DATE !== '')
                sqlInDate = ` and  a1.invoice_date between '${sInDate}' and '${eInDate}'  `;

            var sqlPayDate = '';
            var sPayDate = args.data.S_PAY_DATE;
            var ePayDate = args.data.E_PAY_DATE;
            if (sPayDate === '') sPayDate = `${tRetDate1}`;
            if (ePayDate === '') ePayDate = `99999999`;
            if (args.data.S_PAY_DATE !== '' || args.data.E_PAY_DATE !== '')
                sqlPayDate = ` and  a1.pay_date between '${sPayDate}' and '${ePayDate}'  `;

            if (args.data.BILL_CD !== '') {
                sqlInDate = '';
                sqlPayDate = '';
            }

            let sqlStr = `
                select
                    b2.CD_NAME as TAX_KIND_N,
                    a1.TAX_KIND,
                    a1.BILL_CD,
                    b1.VENDOR_NAME,
                    b1.VENDOR_CD,
                    b1.VENDOR_TYPE,
                    b6.CD_NAME as VENDOR_TYPE_N,
                    a1.INVOICE_DATE,
                    a1.PAY_DATE,
                    isnull(b1.PAY_TERM, '0') as PAY_TERM,
                    isnull(b1.PAY_TYPE2, '') as PAY_TYPE,
                    a1.CURR_CD,
                    a1.DEPOSIT_AMT,
                    a1.DEBIT_AMT,
                    a1.DISCOUNT_AMT,
                    a1.VAT_AMT,
                    isnull(a1.PAY_AMT, 0) as PAY_AMT,
                    a1.REG_USER,
                    a1.BILL_FLAG,
                    a1.GW_STATUS,
                    isnull(b3.CD_NAME, '') as GW_STATUS_N,
                    a1.PAY_BANK,
                    isnull(b4.BANK_NAME, '') as BANK_NAME,
                    isnull(b4.ACCOUNT_NO, '') as ACCOUNT_NO,
                    isnull(b4.ACCOUNT_NAME, '') as ACCOUNT_NAME,
                    isnull(a1.TAXBILL_CD, '') as TAXBILL_CD,
                    isnull(b4.SFTCODE, '') as SFTCODE,
                    isnull(b5.CD_NAME, '') as PAY_TYPE_N,
                    isnull(a1.PAY_REPORT, '') as PAY_REPORT,
                    isnull(a1.PUR_FACTORY, '') as PUR_FACTORY,
                    isnull(a1.DOCU_NO, '') as DOCU_NO,
                    isnull(a1.BUY_DATE, '') as BUY_DATE,
                    '' as APPROKEY,
                    '' as GW_STATUS_CD,
                    '' as TAXBILL_CD,
                    isnull(a1.PO_AMT, 0) as PO_AMT,
                    isnull(a1.LC_AMT, 0) as LC_AMT,
                    isnull(a1.PAID_AMT, 0) as PAID_AMT,
                    '0' as IN_PAY_AMT
                from
                    ksv_bill_mst a1
                    left join kcd_bank b4 on a1.pay_bank = b4.bank_cd
                    left join kcd_code b3 on a1.gw_status = b3.cd_code
                    and b3.cd_group = 'GW_STATUS'
                    left join kcd_code b2 on a1.tax_kind = b2.cd_code
                    and b2.cd_group = 'TAX_KIND',
                    kcd_vendor b1
                    left join kcd_code b5 on b5.cd_code = b1.PAY_TYPE
                    and b5.cd_group = 'PAY_TYPE'
                    left join kcd_code b6 on b6.cd_code = b1.VENDOR_TYPE
                    and b6.cd_group = 'VENDOR_TYPE'
                where
                    a1.vendor_cd = b1.vendor_cd
                    and a1.bill_cd like '%${args.data.BILL_CD}%'
                    and a1.reg_user like '%${args.data.REG_USER}%'
                    and a1.gw_status like '%${args.data.GW_STATUS}%'
                    and b1.vendor_type like '%${args.data.VENDOR_TYPE}%'
                    and b1.vendor_cd like '%${args.data.VENDOR_CD}%' ${sqlInDate} ${sqlPayDate}
                order by
                    a1.invoice_date desc,
                    b1.vendor_cd
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                if (tRet.length > 1000) break;

                var tOne = { ...tRet[tIdx] };
                if (parseFloat(tOne.PAY_AMT) <= 0) continue;

                let sqlStr1 = `
                    select
                        *
                    from
                        kcd_gw_taxbill_kr
                    where
                        bill_cd = '${tOne.BILL_CD}'
                        and approkey is not null
                        and approkey <> ''
                    order by
                        taxbill_cd desc
                `;
                var tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));

                var tPaidAmt = 0;

                if (tRet1.length > 0) {
                    tOne.APPROKEY = tRet1[0].APPROKEY;
                    tOne.STATAUS_CD = tRet1[0].STATUS_CD;
                    tOne.TAXBILL_CD = tRet1[0].TAXBILL_CD;
                    tRet1.forEach((col, i) => {
                        tPaidAmt += parseFloat(col.TOT_AMOUNT);
                    });
                    tOne.PAID_AMT = AFLib.numToFixed(tPaidAmt, 2);
                } else {
                    tOne.GW_STATUS = '0';
                    tOne.GW_STATUS_N = '';
                }

                var tPayAmt =
                    parseFloat(tOne.PO_AMT) -
                    parseFloat(tOne.DEBIT_AMT) -
                    parseFloat(tOne.DEPOSIT_AMT) -
                    parseFloat(tOne.LC_AMT) -
                    parseFloat(tOne.DISCOUNT_AMT) -
                    parseFloat(tOne.PAID_AMT);
                tPayAmt += AFLib.numToFixed(parseFloat(tOne.VAT_AMT), 2);

                tOne.PAY_AMT = AFLib.numToFixed(tPayAmt, 2);
                var tInPayAmt = tPayAmt;
                tOne.IN_PAY_AMT = AFLib.numToFixed(tInPayAmt, 2);

                /*
           let sqlStr1 = `
               select
                   isnull(sum(crdb_amt), 0) as sum_amt
               from
                   ksv_crdb_mst
               where
                   messer_cd = '${tOne.VENDOR_CD}'
                   and status_cd = '0'
           `;
           var tRet1  =  await prisma.$queryRaw(Prisma.raw(sqlStr1));
           tOne.BAL_DEBIT = '0';
           if (tRet1.length > 0) tOne.BAL_DEBIT = String(tRet1[0].sum_amt);

           let sqlStr2 = `
               select
                   isnull(sum(dn_amount), 0) as dn_amount,
                   isnull(sum(dc_amount), 0) as dc_amount
               from
                   ksv_dc_amount
               where
                   bill_cd = '${tOne.BILL_CD}'
           `;
           var tRet2  =  await prisma.$queryRaw(Prisma.raw(sqlStr2));
           var tDnAmount = 0;
           var tDcAmount = 0;
           if (tRet2.length > 0)  {
               tDnAmount = tRet2[0].dn_amount;
               tDcAmount = tRet2[0].dc_amount;
           }

           let sqlStr3 = `
               select
                   *
               from
                   ksv_stock_in
               where
                   bill_no = '${tOne.BILL_CD}'
                   and calc_flag = '1'
           `;
           var tRet3  =  await prisma.$queryRaw(Prisma.raw(sqlStr3));
           if (tRet3.length > 0) tOne.BILL_FLAG = '1';
           else tOne.BILL_FLAG = '0';
           
           tOne.PO_AMT = AFLib.getFloat(parseFloat(tOne.PO_AMT), 2);
           if (parseFloat(tOne.LC_AMT) > 0) {
               if (tOne.PAY_REPORT.includes('LC-')) {
                   tOne.DEPOSIT_AMT = '0';
                   tOne.LC_AMT = AFLib.getFloat(parseFloat(tOne.LC_AMT), 2);
                   tOne.PAY_AMT = AFLib.getFloat(parseFloat(tOne.LC_AMT), 2);
               } else if (tOne.PAY_REPORT.includes('Deposit-')) {
                   tOne.DEPOSIT_AMT = AFLib.getFloat(parseFloat(tOne.DEPOSIT_AMT), 2);
                   tOne.LC_AMT = '0';
                   tOne.PAY_AMT = AFLib.getFloat(parseFloat(tOne.DEPOSIT_AMT), 2);
               } else {
                   tOne.DEPOSIT_AMT = AFLib.getFloat(parseFloat(tOne.DEPOSIT_AMT), 2);
                   tOne.LC_AMT = '0';
               }
           }
           tOne.DEBIT_AMT = AFLib.getFloat(parseFloat(tDnAmount), 2);
           tOne.DISCOUNT_AMT = AFLib.getFloat(parseFloat(tDcAmount), 2);
           tOne.VAT_AMT = AFLib.getFloat(parseFloat(tOne.VAT_AMT), 2);
           tOne.PAY_AMT = AFLib.getFloat(parseFloat(tOne.PAY_AMT), 2);
           */

                tArray.push(tOne);
            }

            var tMessage = '';
            if (tRet.length > 1000)
                tMessage = `${tRet.length}건이 조회되었습니다. 상위 1000건만 출력합니다. `;

            var tWObj = {};
            tWObj.MESSAGE = tMessage;
            tWObj.DATAS = [...tArray];
            return tWObj;
        },
        mgrQueryS0423_LIST_1_bak4: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var sqlInDate = '';
            var sInDate = args.data.S_IN_DATE;
            var eInDate = args.data.E_IN_DATE;
            if (sInDate === '') sInDate = `${tRetDate1}`;
            if (eInDate === '') eInDate = `99999999`;
            if (args.data.S_IN_DATE !== '' || args.data.E_IN_DATE !== '')
                sqlInDate = ` and  a1.invoice_date between '${sInDate}' and '${eInDate}'  `;

            var sqlPayDate = '';
            var sPayDate = args.data.S_PAY_DATE;
            var ePayDate = args.data.E_PAY_DATE;
            if (sPayDate === '') sPayDate = `${tRetDate1}`;
            if (ePayDate === '') ePayDate = `99999999`;
            if (args.data.S_PAY_DATE !== '' || args.data.E_PAY_DATE !== '')
                sqlPayDate = ` and  a1.pay_date between '${sPayDate}' and '${ePayDate}'  `;

            if (args.data.BILL_CD !== '') {
                sqlInDate = '';
                sqlPayDate = '';
            }

            let sqlStr = `
                select
                    b2.CD_NAME as TAX_KIND_N,
                    a1.TAX_KIND,
                    a1.BILL_CD,
                    b1.VENDOR_NAME,
                    b1.VENDOR_CD,
                    b1.VENDOR_TYPE,
                    b6.CD_NAME as VENDOR_TYPE_N,
                    a1.INVOICE_DATE,
                    a1.PAY_DATE,
                    isnull(b1.PAY_TERM, '0') as PAY_TERM,
                    isnull(b1.PAY_TYPE2, '') as PAY_TYPE,
                    a1.CURR_CD,
                    a1.DEPOSIT_AMT,
                    a1.DEBIT_AMT,
                    a1.DISCOUNT_AMT,
                    a1.VAT_AMT,
                    isnull(a1.PAY_AMT, 0) as PAY_AMT,
                    a1.REG_USER,
                    a1.BILL_FLAG,
                    a1.GW_STATUS,
                    isnull(b3.CD_NAME, '') as GW_STATUS_N,
                    a1.PAY_BANK,
                    isnull(b4.BANK_NAME, '') as BANK_NAME,
                    isnull(b4.ACCOUNT_NO, '') as ACCOUNT_NO,
                    isnull(b4.ACCOUNT_NAME, '') as ACCOUNT_NAME,
                    isnull(a1.TAXBILL_CD, '') as TAXBILL_CD,
                    isnull(b4.SFTCODE, '') as SFTCODE,
                    isnull(b5.CD_NAME, '') as PAY_TYPE_N,
                    isnull(a1.PAY_REPORT, '') as PAY_REPORT,
                    isnull(a1.PUR_FACTORY, '') as PUR_FACTORY,
                    isnull(a1.DOCU_NO, '') as DOCU_NO,
                    isnull(a1.BUY_DATE, '') as BUY_DATE,
                    '' as APPROKEY,
                    '' as GW_STATUS_CD,
                    '' as TAXBILL_CD,
                    isnull(a1.PO_AMT, 0) as PO_AMT,
                    isnull(a1.LC_AMT, 0) as LC_AMT,
                    isnull(a1.PAID_AMT, 0) as PAID_AMT,
                    '0' as IN_PAY_AMT
                from
                    ksv_bill_mst a1
                    left join kcd_bank b4 on a1.pay_bank = b4.bank_cd
                    left join kcd_code b3 on a1.gw_status = b3.cd_code
                    and b3.cd_group = 'GW_STATUS'
                    left join kcd_code b2 on a1.tax_kind = b2.cd_code
                    and b2.cd_group = 'TAX_KIND',
                    kcd_vendor b1
                    left join kcd_code b5 on b5.cd_code = b1.PAY_TYPE
                    and b5.cd_group = 'PAY_TYPE'
                    left join kcd_code b6 on b6.cd_code = b1.VENDOR_TYPE
                    and b6.cd_group = 'VENDOR_TYPE'
                where
                    a1.vendor_cd = b1.vendor_cd
                    and a1.bill_cd like '%${args.data.BILL_CD}%'
                    and a1.reg_user like '%${args.data.REG_USER}%'
                    and a1.gw_status like '%${args.data.GW_STATUS}%'
                    and b1.vendor_type like '%${args.data.VENDOR_TYPE}%'
                    and b1.vendor_cd like '%${args.data.VENDOR_CD}%' ${sqlInDate} ${sqlPayDate}
                order by
                    a1.invoice_date desc,
                    b1.vendor_cd
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                if (tRet.length > 1000) break;

                var tOne = { ...tRet[tIdx] };
                if (parseFloat(tOne.PAY_AMT) <= 0) continue;

                let sqlStr1 = `
                    select
                        *
                    from
                        kcd_gw_taxbill_kr
                    where
                        bill_cd = '${tOne.BILL_CD}'
                        and approkey is not null
                        and approkey <> ''
                    order by
                        taxbill_cd desc
                `;
                var tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));

                var tPaidAmt = 0;

                if (tRet1.length > 0) {
                    tOne.APPROKEY = tRet1[0].APPROKEY;
                    tOne.STATAUS_CD = tRet1[0].STATUS_CD;
                    tOne.TAXBILL_CD = tRet1[0].TAXBILL_CD;
                    tRet1.forEach((col, i) => {
                        tPaidAmt += parseFloat(col.TOT_AMOUNT);
                    });
                    tOne.PAID_AMT = AFLib.numToFixed(tPaidAmt, 2);
                } else {
                    tOne.GW_STATUS = '0';
                    tOne.GW_STATUS_N = '';
                }

                var tPayAmt =
                    parseFloat(tOne.PO_AMT) -
                    parseFloat(tOne.DEBIT_AMT) -
                    parseFloat(tOne.DEPOSIT_AMT) -
                    parseFloat(tOne.LC_AMT) -
                    parseFloat(tOne.DISCOUNT_AMT) -
                    parseFloat(tOne.PAID_AMT);
                tPayAmt += AFLib.numToFixed(parseFloat(tOne.VAT_AMT), 2);

                tOne.PAY_AMT = AFLib.numToFixed(tPayAmt, 2);
                var tInPayAmt = tPayAmt;
                tOne.IN_PAY_AMT = AFLib.numToFixed(tInPayAmt, 2);

                /*
           let sqlStr1 = `
               select
                   isnull(sum(crdb_amt), 0) as sum_amt
               from
                   ksv_crdb_mst
               where
                   messer_cd = '${tOne.VENDOR_CD}'
                   and status_cd = '0'
           `;
           var tRet1  =  await prisma.$queryRaw(Prisma.raw(sqlStr1));
           tOne.BAL_DEBIT = '0';
           if (tRet1.length > 0) tOne.BAL_DEBIT = String(tRet1[0].sum_amt);

           let sqlStr2 = `
               select
                   isnull(sum(dn_amount), 0) as dn_amount,
                   isnull(sum(dc_amount), 0) as dc_amount
               from
                   ksv_dc_amount
               where
                   bill_cd = '${tOne.BILL_CD}'
           `;
           var tRet2  =  await prisma.$queryRaw(Prisma.raw(sqlStr2));
           var tDnAmount = 0;
           var tDcAmount = 0;
           if (tRet2.length > 0)  {
               tDnAmount = tRet2[0].dn_amount;
               tDcAmount = tRet2[0].dc_amount;
           }

           let sqlStr3 = `
               select
                   *
               from
                   ksv_stock_in
               where
                   bill_no = '${tOne.BILL_CD}'
                   and calc_flag = '1'
           `;
           var tRet3  =  await prisma.$queryRaw(Prisma.raw(sqlStr3));
           if (tRet3.length > 0) tOne.BILL_FLAG = '1';
           else tOne.BILL_FLAG = '0';
           
           tOne.PO_AMT = AFLib.getFloat(parseFloat(tOne.PO_AMT), 2);
           if (parseFloat(tOne.LC_AMT) > 0) {
               if (tOne.PAY_REPORT.includes('LC-')) {
                   tOne.DEPOSIT_AMT = '0';
                   tOne.LC_AMT = AFLib.getFloat(parseFloat(tOne.LC_AMT), 2);
                   tOne.PAY_AMT = AFLib.getFloat(parseFloat(tOne.LC_AMT), 2);
               } else if (tOne.PAY_REPORT.includes('Deposit-')) {
                   tOne.DEPOSIT_AMT = AFLib.getFloat(parseFloat(tOne.DEPOSIT_AMT), 2);
                   tOne.LC_AMT = '0';
                   tOne.PAY_AMT = AFLib.getFloat(parseFloat(tOne.DEPOSIT_AMT), 2);
               } else {
                   tOne.DEPOSIT_AMT = AFLib.getFloat(parseFloat(tOne.DEPOSIT_AMT), 2);
                   tOne.LC_AMT = '0';
               }
           }
           tOne.DEBIT_AMT = AFLib.getFloat(parseFloat(tDnAmount), 2);
           tOne.DISCOUNT_AMT = AFLib.getFloat(parseFloat(tDcAmount), 2);
           tOne.VAT_AMT = AFLib.getFloat(parseFloat(tOne.VAT_AMT), 2);
           tOne.PAY_AMT = AFLib.getFloat(parseFloat(tOne.PAY_AMT), 2);
           */

                tArray.push(tOne);
            }

            var tMessage = '';
            if (tRet.length > 1000)
                tMessage = `${tRet.length}건이 조회되었습니다. 상위 1000건만 출력합니다. `;

            var tWObj = {};
            tWObj.MESSAGE = tMessage;
            tWObj.DATAS = [...tArray];
            return tWObj;
        },
        mgrQueryS0423_LIST_1_bak5: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var sqlInDate = '';
            var sInDate = args.data.S_IN_DATE;
            var eInDate = args.data.E_IN_DATE;
            if (sInDate === '') sInDate = `${tRetDate1.substring(0, 6)}01`;
            if (eInDate === '') eInDate = `99999999`;
            if (args.data.S_IN_DATE !== '' || args.data.E_IN_DATE !== '')
                sqlInDate = ` and  a1.invoice_date between '${sInDate}' and '${eInDate}'  `;

            var sqlPayDate = '';
            var sPayDate = args.data.S_PAY_DATE;
            var ePayDate = args.data.E_PAY_DATE;
            if (sPayDate === '') sPayDate = `${tRetDate1.substring(0, 6)}01`;
            if (ePayDate === '') ePayDate = `99999999`;
            if (args.data.S_PAY_DATE !== '' || args.data.E_PAY_DATE !== '')
                sqlPayDate = ` and  a1.pay_date between '${sPayDate}' and '${ePayDate}'  `;

            if (args.data.BILL_CD !== '') {
                sqlInDate = '';
                sqlPayDate = '';
            }

            /*
   where a1.vendor_cd =  b1.vendor_cd
   and   a1.bill_cd like '%${args.data.BILL_CD}%'
   and   a1.reg_user like '%${args.data.REG_USER}%'
   and   a1.gw_status like '%${args.data.GW_STATUS}%'
   and   b1.vendor_type like '%${args.data.VENDOR_TYPE}%'
   and   b1.vendor_cd like '%${args.data.VENDOR_CD}%'
   ${sqlInDate}
   ${sqlPayDate}
order by a1.invoice_date desc, b1.vendor_cd 
*/

            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tSQL = '';
            var tSQL1 = '';

            /*
       if (args.data.IS_ALL === '1') {
          ;
       } else {
          tSQL = `and    (k.bill_cd is null or  k.bill_cd = '')`;
       }
       */

            var sDate = args.data.S_PAY_DATE;
            var eDate = args.data.E_PAY_DATE;
            if (sDate === '') sDate = `${tRetDate1.substring(0, 4)}0101`;
            if (eDate === '') eDate = '99999999';
            var payDateSql = `and c.pay_date between '${sDate}' and '${eDate}' `;
            var payDateSql1 = `and a.pay_date between '${sDate}' and '${eDate}' `;
            var payDateSql2 = `and b.pay_date between '${sDate}' and '${eDate}' `;

            let sqlStr = `
                select
                    e.BUYER_NAME,
                    c.BUYER_CD,
                    kk3.PU_CD,
                    kk3.PO_CD as PO_CD2,
                    c.VENDOR_CD,
                    d.VENDOR_NAME,
                    d.VENDOR_TYPE,
                    c.TARGET_ETA,
                    c.EXP_DELIVERY_DATE as READY_DATE,
                    kk3.PAY_DATE,
                    kk3.PAY_CURR_CD as CURR_CD,
                    c.DEPOSIT_AMT,
                    c.LC_FLAG,
                    c.LC_AMT as LC_AMT2,
                    c.REG_USER as PURCHARGER,
                    kk3.PUR_APP,
                    kk3.TT_FLAG,
                    kk3.PUR_FACTORY,
                    kk3.END_DATE,
                    kk3.PAY_REPORT,
                    sum(kk3.PO_QTY) as PO_QTY,
                    sum(kk3.PO_AMT) as PO_AMT0,
                    sum(kk3.IN_QTY) as IN_QTY,
                    sum(kk3.IN_AMT) as PO_AMT,
                    sum(kk3.LC_QTY) as LC_QTY,
                    sum(kk3.LC_AMT) as LC_AMT
                from
                    (
                        select
                            kk.PU_CD,
                            kk.PO_CD,
                            kk.MATL_CD,
                            kk.PAY_DATE,
                            kk.PAY_CURR_CD,
                            kk.PUR_APP,
                            kk.TT_FLAG,
                            kk.PUR_FACTORY,
                            kk.END_DATE,
                            kk.PAY_REPORT,
                            kk2.PO_QTY2 as PO_QTY,
                            (kk2.PO_QTY2 * kk2.PO_PRICE) as PO_AMT,
                            kk.IN_QTY,
                            kk.IN_AMT,
                            kk.LC_QTY,
                            kk.LC_AMT
                        from
                            (
                                select
                                    a.PU_CD,
                                    a.PO_CD,
                                    a.MATL_CD,
                                    a.PAY_DATE,
                                    a.PAY_CURR_CD,
                                    isnull(a.PUR_APP, '') as PUR_APP,
                                    isnull(a.TT_FLAg, '') as TT_FLAG,
                                    isnull(a.PUR_FACTORY, '') as PUR_FACTORY,
                                    isnull(a.END_DATE, '') as END_DATE,
                                    isnull(a.PAY_REPORT, '') as PAY_REPORT,
                                    sum(a.IN_QTY) as IN_QTY,
                                    sum(a.IN_QTY * a.IN_PRICE) as IN_AMT,
                                    sum(isnull(a.LC_QTY, 0)) as LC_QTY,
                                    sum(isnull(a.LC_QTY, 0) * a.IN_PRICE) as LC_AMT
                                from
                                    ksv_stock_in a
                                where
                                    a.po_cd like '%${args.data.PO_CD}%'
                                    and a.pu_cd like '%${args.data.PU_CD}%' ${payDateSql1}
                                group by
                                    a.PU_CD,
                                    a.PO_CD,
                                    a.MATL_CD,
                                    a.PAY_DATE,
                                    a.PAY_CURR_CD,
                                    a.PUR_APP,
                                    a.TT_FLAg,
                                    a.PUR_FACTORY,
                                    a.END_DATE,
                                    a.PAY_REPORT
                            ) kk,
                            ksv_stock_mem2 kk2
                        where
                            kk.PU_CD = kk2.PU_CD
                            and kk.PO_CD = kk2.PO_CD
                            and kk.MATL_CD = kk2.MATL_CD
                    ) kk3,
                    ksv_pu_mst2 c,
                    kcd_vendor d,
                    kcd_buyer e
                where
                    kk3.PU_CD = c.pu_cd
                    and c.bill_to in ('SHINTS', 'FACTORY', 'BVT', 'ETP')
                    and c.vendor_cd = d.vendor_cd
                    and c.buyer_cd = e.buyer_cd
                    and d.vendor_type like '%${args.data.VENDOR_TYPE}%'
                    and d.vendor_name like '%${args.data.VENDOR_CD}%'
                    and c.vendor_cd <> 'V0882'
                    and c.vendor_cd <> 'V0381'
                    and c.vendor_cd <> 'V0523'
                    and c.vendor_cd <> 'V2584'
                    and d.vendor_type in ('1', '3', '5')
                    and c.po_cd2 like '%${args.data.PO_CD}%'
                    and c.pu_cd like '%${args.data.PU_CD}%'
                    and c.buyer_cd like '%${args.data.BUYER_CD}%'
                    and c.reg_user like '%${args.data.PURCHARGER}%'
                    -- ${payDateSql}
                group by
                    e.BUYER_NAME,
                    c.BUYER_CD,
                    kk3.PU_CD,
                    kk3.PO_CD,
                    c.VENDOR_CD,
                    d.VENDOR_NAME,
                    d.VENDOR_TYPE,
                    c.TARGET_ETA,
                    c.EXP_DELIVERY_DATE,
                    kk3.PAY_DATE,
                    kk3.PAY_CURR_CD,
                    c.DEPOSIT_AMT,
                    c.LC_FLAG,
                    c.LC_AMT,
                    c.REG_USER,
                    kk3.PUR_APP,
                    kk3.TT_FLAG,
                    kk3.PUR_FACTORY,
                    kk3.END_DATE,
                    kk3.PAY_REPORT
                order by
                    d.VENDOR_NAME,
                    kk3.PAY_DATE,
                    kk3.PAY_CURR_CD,
                    kk3.END_DATE
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            var tRetArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tObj = { ...tRet[tIdx] };

                // if (tObj.LC_FLAG === '1') tObj.DEPOSIT_AMT = tObj.LC_AMT;
                tObj.DEPOSIT_AMT = tObj.LC_AMT;

                var tDepositAmt = parseFloat(tObj.DEPOSIT_AMT);
                var tPoAmt = parseFloat(tObj.PO_AMT) + tDepositAmt;
                var tPayAmt = tPoAmt - tDepositAmt;

                if (tObj.END_DATE !== '') {
                    tObj.END_AMT = String(tPayAmt);
                    tObj.END_LC_AMT = String(tDepositAmt);
                } else {
                    tObj.END_AMT = '0';
                    tObj.END_LC_AMT = '0';
                }
                var tEndAmt =
                    parseFloat(tObj.END_AMT) + parseFloat(tObj.END_LC_AMT);

                tObj.PO_AMT = AFLib.numToFixed(tPoAmt, 2);
                tObj.DEPOSIT_AMT = AFLib.numToFixed(tDepositAmt, 2);
                tObj.PAY_AMT = AFLib.numToFixed(tPayAmt, 2);
                tObj.END_AMT = AFLib.numToFixed(tEndAmt, 2);

                var tSql8 = `
                    select
                        isnull(a.bill_cd, '') as bill_cd
                    from
                        ksv_stock_mem2_stsin a,
                        ksv_bill_mst b
                    where
                        a.pu_cd = '${tObj.PU_CD}'
                        and a.po_cd = '${tObj.PO_CD2}'
                        and a.bill_cd = b.bill_cd
                `;
                var tRet8 = await prisma.$queryRaw(Prisma.raw(tSql8));
                tObj.BILL_CD = '';
                if (tRet8.length > 0) tObj.BILL_CD = tRet8[0].bill_cd;

                // if (args.data.IS_ALL !== '1' && tObj.BILL_CD !== '') continue;

                var tSql9 = `
                    select
                        isnull(a.SEQ, 0) as SEQ,
                        isnull(a.BANK_CD, '') as BANK_CD,
                        isnull(b.BANK_NAME, '') as BANK_NAME,
                        isnull(b.ACCOUNT_NO, '') as ACCOUNT_NO
                    from
                        kcd_vendor_bank a,
                        kcd_bank b
                    where
                        a.VENDOR_CD = '${tObj.VENDOR_CD}'
                        and a.BANK_CD = b.BANK_CD
                    order by
                        a.SEQ desc
                `;
                var tRet0_1 = await prisma.$queryRaw(Prisma.raw(tSql9));
                var tRet0 = [];
                tRet0_1.forEach((col, i) => {
                    var tObj9 = { ...col };
                    tObj9.BANK_NAME = `${tObj9.BANK_NAME}/${tObj9.ACCOUNT_NO}`;
                    tRet0.push(tObj9);
                });

                if (tRet0_1.length > 1) {
                    var tObj9 = {};
                    tObj9.BANK_CD = '';
                    tObj9.BANK_NAME = ' ';
                    tRet0.unshift(tObj9);
                    tObj.PAY_BANK = tRet0_1[0].BANK_CD;
                } else if (tRet0_1.length === 1) {
                    tObj.PAY_BANK = tRet0_1[0].BANK_CD;
                }
                tObj.PAY_BANK_ARRAY = [...tRet0];

                if (
                    parseFloat(tObj.PAY_AMT) > 0 ||
                    parseFloat(tObj.DEPOSIT_AMT) > 0 ||
                    tObj.LC_FLAG === '1'
                ) {
                    /*
               if (tObj.LC_FLAG === '1') tObj.PAY_AMT = '0';
               else if (parseFloat(tObj.DEPOSIT_AMT) > 0) {
                   var tPayAmt = parseFloat(tObj.PAY_AMT) - parseFloat(tObj.DEPOSIT_AMT);
                   tObj.PAY_AMT = String(tPayAmt);
               }
               */
                    if (args.data.IS_ALL === '1') {
                        tRetArray.push(tObj);
                    } else {
                        var tTmpPayAmt =
                            AFLib.numToFixed(parseFloat(tObj.PAY_AMT), 2) +
                            AFLib.numToFixed(parseFloat(tObj.LC_AMT), 2);
                        var tTmpEndAmt = AFLib.numToFixed(
                            parseFloat(tObj.END_AMT),
                            2,
                        );
                        if (tTmpPayAmt > tTmpEndAmt) tRetArray.push(tObj);
                    }
                }
            }
            console.log(sqlStr);
            return tRetArray;
        },
    },
};

export default moduleQuery_S0423_LIST_1;
