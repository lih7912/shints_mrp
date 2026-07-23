import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');
const moment = require('moment');

// export default로 Query 내용 내보내기
const moduleQuery_S0802_2 = {
    Query: {
        mgrQueryS0802_2_LIST_DEPOSIT: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tRetArray = [];
            let sqlStr = `
                SELECT
                    (
                        CASE
                            WHEN A.CHARGER = 'CHELSEA' THEN 'SMC'
                            WHEN A.CHARGER = 'KEVIN' THEN 'SMC'
                            WHEN A.CHARGER = 'JOE' THEN 'SMC'
                            WHEN A.CHARGER = 'LAUREN' THEN 'SMC'
                            ELSE I.CD_NAME
                        END
                    ) AS CHARGER_TEAM,
                    A.CRDB_CD,
                    A.CRDB_SEQ,
                    A.CRDB_DATE,
                    B.COM_NAME AS MESSER,
                    A.CRDB_AMT,
                    (A.CRDB_AMT - ISNULL(SUM(C.CRDB_AMT), 0)) AS BALANCE,
                    A.CURR_CD,
                    (
                        (A.CRDB_AMT - ISNULL(SUM(C.CRDB_AMT), 0)) * F.USD_RATE
                    ) AS USD_BAL,
                    A.TITLE,
                    A.CHARGER,
                    A.END_DATE,
                    A.REMARK,
                    D.CD_NAME AS STATUS,
                    H.STATUS_CD AS GW_STATUS,
                    A.PO_CD,
                    A.ORDER_CD,
                    isnull(A.BANK_CD, '') as BANK_CD,
                    isnull(C1.BANK_NAME, '') as BANK_NAME,
                    B.COM_CD AS MESSER_CD,
                    A.STATUS_CD,
                    A.BUYER_CD,
                    E.BUYER_NAME,
                    A.PAYMENT_PLAN,
                    isnull(H.APPROKEY, '') as APPROKEY,
                    isnull(A.DOCU_NO, '') as DOCU_NO,
                    '' AS END_USER,
                    A.REG_USER,
                    A.DEBIT_TYPE,
                    G.CD_NAME AS DEBIT_TYPE_NAME,
                    A.LINK_TO,
                    J.END_DATE AS END_DATE2,
                    I.CD_NAME AS BUYER_TEAM,
                    A.CONF_USER,
                    M.CD_NAME AS END_TYPE_NAME,
                    A.END_TYPE,
                    A.VAT,
                    F.USD_RATE
                FROM
                    KSV_CRDB_MST A
                    LEFT JOIN KCD_BUYER E ON E.BUYER_CD = A.BUYER_CD
                    LEFT JOIN KSV_CRDB_MEM C ON C.CRDB_CD = A.CRDB_CD
                    LEFT JOIN KCD_BANK C1 ON C1.BANK_CD = A.BANK_CD
                    LEFT JOIN KCD_GWCODE H ON H.DOC_NO = A.CRDB_CD,
                    KVW_COMPANY B,
                    KCD_CODE D,
                    KCD_CURRENCY F,
                    KCD_CODE G,
                    KCD_CODE I,
                    KSV_CRDB_MST J,
                    KCD_CODE M
                WHERE
                    A.CRDB_TYPE IN ('CA')
                    AND A.CRDB_SEQ = (
                        SELECT
                            MAX(CRDB_SEQ)
                        FROM
                            KSV_CRDB_MST
                        WHERE
                            A.CRDB_CD = CRDB_CD
                    )
                    -- AND A.CRDB_DATE BETWEEN '20250101' AND '20250507' 
                    AND A.STATUS_CD <> '1'
                    AND A.DEBIT_TYPE LIKE '%%'
                    AND A.CHARGER LIKE '%%'
                    AND A.TITLE LIKE '%%'
                    AND A.BUYER_CD LIKE '%%'
                    AND A.CRDB_CD LIKE '%%'
                    AND A.PO_CD LIKE '%%'
                    AND A.ORDER_CD LIKE '%%'
                    AND A.CRDB_CD = J.CRDB_CD
                    AND A.CRDB_CD = J.CRDB_CD
                    AND J.CRDB_SEQ = '1'
                    AND A.MESSER_CD LIKE '%${args.data.BUYER_CD}%'
                    AND B.COM_CD = A.MESSER_CD
                    AND D.CD_GROUP = 'CREDIT_STATUS'
                    AND D.CD_CODE = A.STATUS_CD
                    AND G.CD_GROUP = 'DEBIT_TYPE'
                    AND G.CD_CODE = A.DEBIT_TYPE
                    AND I.CD_GROUP = 'BUYER_TEAM'
                    AND I.CD_CODE = E.BUYER_TEAM
                    AND M.CD_GROUP = 'CREDIT_END_TYPE'
                    AND M.CD_CODE = A.END_TYPE
                    AND F.START_DATE = (
                        SELECT
                            MAX(START_DATE)
                        FROM
                            KCD_CURRENCY
                    )
                    AND F.CURR_CD = A.CURR_CD
                GROUP BY
                    A.CRDB_CD,
                    A.CRDB_SEQ,
                    A.CRDB_DATE,
                    B.COM_NAME,
                    A.CRDB_AMT,
                    A.CURR_CD,
                    A.TITLE,
                    A.CHARGER,
                    A.END_DATE,
                    A.REMARK,
                    D.CD_NAME,
                    A.PO_CD,
                    A.ORDER_CD,
                    A.BANK_CD,
                    C1.BANK_NAME,
                    B.COM_CD,
                    M.CD_NAME,
                    A.END_TYPE,
                    A.STATUS_CD,
                    A.BUYER_CD,
                    E.BUYER_NAME,
                    F.USD_RATE,
                    A.PAYMENT_PLAN,
                    H.STATUS_CD,
                    H.APPROKEY,
                    A.DOCU_NO,
                    A.REG_USER,
                    A.DEBIT_TYPE,
                    G.CD_NAME,
                    A.LINK_TO,
                    I.CD_NAME,
                    J.END_DATE,
                    A.CONF_USER,
                    A.VAT
            `;
            let sqlStr_bak = `
                select
                    a.CRDB_CD,
                    a.MESSER_CD,
                    a.TITLE,
                    a.REMARK,
                    a.CURR_CD,
                    a.CRDB_AMT,
                    a.CRDB_DATE,
                    a.REG_USER,
                    isnull(sum(b.CRDB_AMT), 0) as CRDB_AMT2
                from
                    ksv_crdb_mst a
                    left join ksv_crdb_mem b on a.crdb_cd = b.crdb_cd
                where
                    a.crdb_cd like 'CA%'
                    and a.crdb_type = 'CA'
                    and a.messer_cd like '%${args.data.BUYER_CD}%'
                    and a.status_cd <> '1'
                group by
                    a.CRDB_CD,
                    a.MESSER_CD,
                    a.TITLE,
                    a.REMARK,
                    a.CURR_CD,
                    a.CRDB_AMT,
                    a.CRDB_DATE,
                    a.REG_USER
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetArray = [];
            tRet.forEach((col, i) => {
                var tObj = {};
                tObj.CRDB_CD = col.CRDB_CD;
                tObj.PAY_TO = col.MESSER_CD;
                tObj.TITLE = col.TITLE;
                tObj.REMARK = col.REMARK;

                // var tBal = parseFloat(col.CRDB_AMT) - parseFloat(col.CRDB_AMT2);
                var tBal = parseFloat(col.USD_BAL);
                tObj.USD_BAL = String(AFLib.numToFixed(tBal, 2));
                tObj.ISSUE_DATE = col.CRDB_DATE;
                tObj.CHARGER = col.REG_USER;
                if (tBal > 0) tRetArray.push(tObj);
            });
            return tRetArray;
        },

        mgrQueryS0802_2: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var sDate = args.data.S_SHIP_DATE;
            var eDate = args.data.E_SHIP_DATE;
            var sqlShipDate = '';
            var sqlShipDate1 = '';

            sqlShipDate = `and  a.atd between '${sDate}' and '${eDate}' `;
            sqlShipDate1 = `and  a5.atd between '${sDate}' and '${eDate}' `;
            if (!eDate) {
                sqlShipDate = `and  a.atd >= '${sDate}'   `;
                sqlShipDate1 = `and  a5.atd >= '${sDate}'   `;
            }

            var tSQL = '';
            tSQL = `and  ((a5.atd between '${sDate}' and '${eDate}')) `;
            if (!eDate) {
                tSQL = `and  ((a5.atd >= '${sDate}')) `;
            }

            var tRetArray = [];
            let sqlStr = `
                SELECT
                    A1.*,
                    A2.BUYER_CD,
                    A2.BUYER_NAME,
                    A3.CD_NAME as SHIP_MODE_N,
                    A4.CD_NAME as DELIVERY_TYPE_N,
                    '' AS BL_FILE,
                    '' AS PL_FILE,
                    '' AS DEBIT_FILE,
                    isnull(A5.COST_CONFIRM_USER, '') as COST_CONFIRM_USER,
                    isnull(A5.LICENSE_NO, '') as LICENSE_NO,
                    isnull(A5.LICENSE_DATE, '') as LICENSE_DATE,
                    isnull(A5.IMPORT_FREIGHT_AMT, '') as IMPORT_FREIGHT_AMT,
                    isnull(A5.IMPORT_CLEARANCE_AMT, '') as IMPORT_CLEARANCE_AMT,
                    isnull(A5.IMPORT_DUTY_AMT, '') as IMPORT_DUTY_AMT,
                    isnull(A5.REMARK, '') as REMARK,
                    isnull(A5.DOCU_NO, '') as DOCU_NO,
                    isnull(A5.CURR_CD, '') as CURR_CD,
                    isnull(A5.FACTORY_CD, '') as FROM_PORT,
                    isnull(A5.ORD_AMT, '0') as ORD_AMT,
                    isnull(A5.TOT_AMT, '0') as TOT_AMT,
                    isnull(A5.VAT_AMT, '0') as VAT_AMT,
                    '0' as BAL_QTY,
                    isnull(A2.NEOE_A23, '') as NEOE_A23,
                    isnull(A2.NEOE_BUYER_CD, '') as NEOE_BUYER_CD,
                    isnull(A5.INCOME_DATE, '') as INCOME_DATE,
                    isnull(A5.ATD, '') as ATD,
                    A2.NAT_CD as BUYER_NAT_CD,
                    isnull(A6.TOT_AMT1, '0') as TOT_AMT1,
                    isnull(A6.INCOME_DATE1, '') as INCOME_DATE1,
                    isnull(A6.TOT_AMT2, '0') as TOT_AMT2,
                    isnull(A6.INCOME_DATE2, '') as INCOME_DATE2,
                    isnull(A6.TOT_AMT3, '0') as TOT_AMT3,
                    isnull(A6.INCOME_DATE3, '') as INCOME_DATE3,
                    isnull(A5.CRDB_CD, '') as CRDB_CD,
                    isnull(A5.DEPOSIT_AMT, '0') as DEPOSIT_AMT,
                    isnull(
                        (
                            select top 1 c.CD_NAME
                            from KCD_CODE c
                            where c.CD_GROUP = 'PAY_RULE'
                              and c.CD_CODE = A2.PAY_RULE
                        ),
                        ''
                    ) as PAYMENT_TERM
                FROM
                    (
                        SELECT
                            A.INVOICE_NO,
                            A.SHIP_DATE,
                            A.NAT_CD as TO_PORT,
                            isnull(E.NAT_NAME, '') as TO_PORT_N,
                            A.SHIP_PTYPE,
                            A.DELIVERY_TYPE,
                            SUM(A.SHIP_CNT) AS SHIP_QTY,
                            SUM(C.TOT_CNT) as ORDER_QTY,
                            isnull(sum(A.SHIP_AMOUNT), 0) as TOT_AMT
                        FROM
                            KSV_ORDER_SHIP A
                            left join KCD_NATION E on E.NAT_CD = A.NAT_CD,
                            KCD_BUYER B,
                            KSV_ORDER_MST C,
                            KCD_STYLE D
                        WHERE
                            A.ORDER_CD = c.ORDER_CD
                            AND D.STYLE_CD = D.STYLE_CD
                            AND A.ORDER_CD LIKE '%${args.data.ORDER_CD}%'
                            AND A.INVOICE_NO LIKE '%${args.data.INVOICE_NO}%'
                            AND LEFT(A.ORDER_CD, 2) = B.BUYER_CD
                            AND (B.BUYER_CD LIKE '%${args.data.BUYER_CD}%')
                            AND A.ORDER_CD = C.ORDER_CD
                            and A.NAT_CD not in ('ks')
                            AND C.STYLE_CD = D.STYLE_CD
                            AND (D.STYLE_CD like '%%')
                            AND A.SHIP_PTYPE like '%${args.data.SHIP_MODE}%' ${sqlShipDate}
                        GROUP BY
                            A.INVOICE_NO,
                            A.SHIP_DATE,
                            A.NAT_CD,
                            E.NAT_NAME,
                            A.SHIP_PTYPE,
                            A.DELIVERY_TYPE
                    ) A1
                    left join KCD_CODE A3 on A1.SHIP_PTYPE = A3.CD_CODE
                    and A3.CD_GROUP = 'SHIP_PTYPE'
                    left join KCD_CODE A4 on A1.delivery_type = A4.CD_CODE
                    and A4.CD_GROUP = 'DELIVERY_TYPE',
                    KCD_BUYER A2,
                    KSV_INVOICE_MST A5
                    left join ksv_invoice_info A6 on A5.invoice_no = A6.invoice_no
                where
                    (
                        A5.DUE_DATE is not null
                        AND A5.DUE_DATE <> ''
                    )
                    and A5.BUYER_CD = A2.BUYER_CD
                    and A1.INVOICE_NO = A5.INVOICE_NO
                    and A2.NAT_CD not in ('ks')
                    and A5.FACTORY_CD like '%${args.data.FACTORY_CD}%'
                    AND A5.DELIVERY_TYPE like '%${args.data.DELIVERY_TYPE}%'
                    AND A5.PAYMENT_TYPE like '%${args.data.PAYMENT_TYPE}%' ${tSQL}
                    AND A5.BUYER_CD not in 
                    (
                        'AM', 'NS', 'TH', 'CR', 'BR', 'NS', 'ET', 'NS', 'N2', 'NE', 'WM', 'SH', 'NS', 'NS', 'MI', 'WM', '66', 'OC', 'YE', 'GA', 'ET', '99', 'SH', 'TH', 'NE', 'SY', 'KB', 'BA', 'ET', 'MI', 'WM', 'UM', 'WF', 'OK', 'SN'
                    )
                order by
                    A1.SHIP_DATE desc
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            let sqlStr1 = `
                SELECT
                    isnull(A2.BUYER_CD, '') as BUYER_CD,
                    isnull(A2.BUYER_NAME, '') as BUYER_NAME,
                    '' as SHIP_MODE_N,
                    A4.CD_NAME as DELIVERY_TYPE_N,
                    '' AS BL_FILE,
                    '' AS PL_FILE,
                    '' AS DEBIT_FILE,
                    isnull(A5.COST_CONFIRM_USER, '') as COST_CONFIRM_USER,
                    isnull(A5.LICENSE_NO, '') as LICENSE_NO,
                    isnull(A5.LICENSE_DATE, '') as LICENSE_DATE,
                    isnull(A5.IMPORT_FREIGHT_AMT, '') as IMPORT_FREIGHT_AMT,
                    isnull(A5.IMPORT_CLEARANCE_AMT, '') as IMPORT_CLEARANCE_AMT,
                    isnull(A5.IMPORT_DUTY_AMT, '') as IMPORT_DUTY_AMT,
                    isnull(A5.REMARK, '') as REMARK,
                    isnull(A5.DOCU_NO, '') as DOCU_NO,
                    isnull(A5.CURR_CD, '') as CURR_CD,
                    isnull(A5.FACTORY_CD, '') as FROM_PORT,
                    isnull(A5.ORD_AMT, '0') as ORD_AMT,
                    isnull(A5.TOT_AMT, '0') as TOT_AMT,
                    isnull(A5.VAT_AMT, '0') as VAT_AMT,
                    '0' as BAL_QTY,
                    isnull(A2.NEOE_A23, '') as NEOE_A23,
                    isnull(A2.NEOE_BUYER_CD, '') as NEOE_BUYER_CD,
                    isnull(A5.INCOME_DATE, '') as INCOME_DATE,
                    isnull(A5.ATD, '') as ATD,
                    isnull(A2.NAT_CD, '') as BUYER_NAT_CD,
                    isnull(A6.TOT_AMT1, '0') as TOT_AMT1,
                    isnull(A6.INCOME_DATE1, '') as INCOME_DATE1,
                    isnull(A6.TOT_AMT2, '0') as TOT_AMT2,
                    isnull(A6.INCOME_DATE2, '') as INCOME_DATE2,
                    isnull(A6.TOT_AMT3, '0') as TOT_AMT3,
                    isnull(A6.INCOME_DATE3, '') as INCOME_DATE3,
                    isnull(A5.CRDB_CD, '') as CRDB_CD,
                    isnull(A5.DEPOSIT_AMT, '0') as DEPOSIT_AMT,
                    isnull(
                        (
                            select top 1 c.CD_NAME
                            from KCD_CODE c
                            where c.CD_GROUP = 'PAY_RULE'
                              and c.CD_CODE = A2.PAY_RULE
                        ),
                        ''
                    ) as PAYMENT_TERM,
                    A5.INVOICE_NO,
                    A5.SHIP_DATE,
                    '' as TO_PORT,
                    '' as TO_PORT_N,
                    '' as SHIP_PTYPE,
                    A5.DELIVERY_TYPE,
                    '1' as SHIP_QTY,
                    '1' as ORDER_QTY
                FROM
                    KSV_INVOICE_MST A5
                    left join ksv_invoice_mem A8 on A8.invoice_no = A5.invoice_no
                    left join ksv_invoice_info A6 on A5.invoice_no = A6.invoice_no
                    left join KCD_CODE A4 on A5.delivery_type = A4.CD_CODE
                    and A4.CD_GROUP = 'DELIVERY_TYPE',
                    KCD_BUYER A2
                where
                    (
                        A5.DUE_DATE is not null
                        AND A5.DUE_DATE <> ''
                    )
                    and isnull(A8.INVOICE_NO, '') = '' ${sqlShipDate1}
                    AND A5.INVOICE_NO LIKE '%${args.data.INVOICE_NO}%'
                    AND A5.DELIVERY_TYPE like '%${args.data.DELIVERY_TYPE}%'
                    and A5.BUYER_CD = A2.BUYER_CD
                    and A5.FACTORY_CD like '%${args.data.FACTORY_CD}%'
                    AND A5.BUYER_CD LIKE '%${args.data.BUYER_CD}%'
                    AND A5.PAYMENT_TYPE like '%${args.data.PAYMENT_TYPE}%' ${tSQL}
                    AND A5.BUYER_CD not in 
                    (
                        'AM', 'NS', 'TH', 'CR', 'BR', 'NS', 'ET', 'NS', 'N2', 'NE', 'WM', 'SH', 'NS', 'NS', 'MI', 'WM', '66', 'OC', 'YE', 'GA', 'ET', '99', 'SH', 'TH', 'NE', 'SY', 'KB', 'BA', 'ET', 'MI', 'WM', 'UM', 'WF', 'OK', 'SN'
                    )
            `;
            var tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));

            var allRows = [].concat(tRet, tRet1);
            var invoiceSet = new Set();
            var currencyDateSet = new Set();
            var currencyCdSet = new Set();
            var refnoSet = new Set();

            for (let i = 0; i < allRows.length; i++) {
                const row = allRows[i];
                if (row.INVOICE_NO) {
                    invoiceSet.add(row.INVOICE_NO);
                }
                if (row.SHIP_DATE && row.CURR_CD) {
                    currencyDateSet.add(row.SHIP_DATE);
                    currencyCdSet.add(row.CURR_CD);
                }
            }

            if (currencyDateSet.size > 0 && tRetDate1) {
                currencyDateSet.add(tRetDate1);
            }

            var currencyMap = {};
            var ttMap = {};
            var oaMap = {};

            if (currencyDateSet.size > 0 && currencyCdSet.size > 0) {
                const dateList = Array.from(currencyDateSet)
                    .map((d) => `'${d}'`)
                    .join(',');
                const cdList = Array.from(currencyCdSet)
                    .map((c) => `'${c}'`)
                    .join(',');
                let sqlCurrency = `
                    select
                        start_date,
                        curr_cd,
                        WON_AMT2
                    from
                        kcd_currency
                    where
                        start_date in (${dateList})
                        and curr_cd in (${cdList})
                `;
                var curRows = await prisma.$queryRaw(Prisma.raw(sqlCurrency));
                if (curRows.length <= 0) {
                    sqlCurrency = `
                        select
                            '${tRetDate1}' as start_date,
                            curr_cd,
                            WON_AMT2
                        from
                            kcd_currency
                        where
                            start_date = (
                                select
                                    max(start_date)
                                from
                                    kcd_currency
                                where
                                    curr_cd in (${cdList})
                            )
                            and curr_cd in (${cdList})
                    `;
                    curRows = await prisma.$queryRaw(Prisma.raw(sqlCurrency));
                }
                for (let i = 0; i < curRows.length; i++) {
                    const r = curRows[i];
                    const key = `${r.start_date}_${r.curr_cd}`;
                    if (currencyMap[key] === undefined) {
                        currencyMap[key] = r.WON_AMT2;
                    }
                }
            }

            var tTTArray = [];

            if (invoiceSet.size > 0) {
                const invoiceList = Array.from(invoiceSet)
                    .map((v) => `'${v}'`)
                    .join(',');

                let sqlTTAll = `
                    select
                        a.invoice_no,
                        a.ref_no,
                        a.bill_amt,
                        b.bill_date
                    from
                        ksv_invoice_bill a
                        left join ksv_invoice_prebill b on a.ref_no = b.ref_no
                    where
                        a.bill_type in ('1')
                        and a.invoice_no in (${invoiceList})
                    order by
                        a.invoice_no,
                        a.bill_type
                `;
                var ttRows = await prisma.$queryRaw(Prisma.raw(sqlTTAll));
                for (let i = 0; i < ttRows.length; i++) {
                    var tObj0 = { ...ttRows[i] };
                    tTTArray.push(tObj0);

                    const r = ttRows[i];
                    const inv = r.invoice_no;
                    if (!ttMap[inv]) {
                        ttMap[inv] = { amt: 0, refNo: '', date: '' };
                    }
                    ttMap[inv].amt += parseFloat(r.bill_amt);
                    if (parseFloat(r.bill_amt) > 0) {
                        ttMap[inv].refNo = r.ref_no;
                        ttMap[inv].date = r.bill_date || ttMap[inv].date;
                    }
                }

                let sqlOAAll = `
                    select
                        a.invoice_no,
                        a.ref_no,
                        a.bill_amt,
                        b.start_date
                    from
                        ksv_invoice_bill a
                        join ksv_invoice_nego b on a.ref_no = b.ref_no
                    where
                        a.bill_type in ('2', '3')
                        and a.invoice_no in (${invoiceList})
                `;
                var oaRows = await prisma.$queryRaw(Prisma.raw(sqlOAAll));
                for (let i = 0; i < oaRows.length; i++) {
                    const r = oaRows[i];
                    const inv = r.invoice_no;
                    if (!oaMap[inv]) {
                        oaMap[inv] = { amt: 0, refNo: '', date: '' };
                    }
                    oaMap[inv].amt += parseFloat(r.bill_amt);
                    if (parseFloat(r.bill_amt) > 0) {
                        oaMap[inv].refNo = r.ref_no;
                        oaMap[inv].date = r.start_date || oaMap[inv].date;
                    }
                }
            }



            for (let tIdx = 0; tIdx < tRet.length; tIdx++) {
                const col = tRet[tIdx];
                var tObj = {};

                tObj.STATUS_NAME = '제품매출';
                tObj.BUYER_NAME = col.BUYER_NAME;
                tObj.BUYER_CD = col.BUYER_CD;
                tObj.BUYER_NAT_CD = col.BUYER_NAT_CD;
                tObj.INVOICE_NO = col.INVOICE_NO;
                tObj.SHIP_DATE = col.SHIP_DATE;
                tObj.ATD = col.ATD;
                tObj.DELIVERY_TYPE = col.DELIVERY_TYPE;
                tObj.DELIVERY_TYPE_N = col.DELIVERY_TYPE_N;
                tObj.SHIP_PTYPE = col.SHIP_PTYPE;
                tObj.PAYMENT_TERM = col.PAYMENT_TERM;
                tObj.SHIP_MODE_N = col.SHIP_MODE_N;
                tObj.CI_NO = '';
                tObj.FROM_PORT = col.FROM_PORT;
                tObj.TO_PORT = col.TO_PORT;
                tObj.TO_PORT_N = col.TO_PORT_N;
                tObj.ORD_AMT = AFLib.numToFixed(parseFloat(col.ORD_AMT), 2);
                tObj.TOT_AMT = AFLib.numToFixed(parseFloat(col.TOT_AMT), 2);
                tObj.TOT_AMT1 = AFLib.numToFixed(parseFloat(col.TOT_AMT1), 2);
                tObj.TOT_AMT2 = AFLib.numToFixed(parseFloat(col.TOT_AMT2), 2);
                tObj.TOT_AMT3 = AFLib.numToFixed(parseFloat(col.TOT_AMT3), 2);
                tObj.TOT_AMT_WON = '';
                tObj.DOCU_NO = col.DOCU_NO;
                tObj.DOCU_STATUS = '';
                tObj.CURR_CD = col.CURR_CD;
                tObj.VAT_AMT = col.VAT_AMT;
                tObj.NEOE_A23 = col.NEOE_A23;
                tObj.NEOE_BUYER_CD = col.NEOE_BUYER_CD;

                if (tObj.FROM_PORT === 'FC034') {
                    tObj.FROM_PORT_N = 'BVT';
                } else if (tObj.FROM_PORT === 'FC044') {
                    tObj.FROM_PORT_N = 'ETP';
                } else {
                    tObj.FROM_PORT_N = 'ETC';
                }

                var tRate = 0;
                if (tObj.SHIP_DATE && tObj.CURR_CD) {
                    const keyExact = `${tObj.SHIP_DATE}_${tObj.CURR_CD}`;
                    const keyFallback = `${tRetDate1}_${tObj.CURR_CD}`;
                    if (currencyMap[keyExact] !== undefined) {
                        tRate = currencyMap[keyExact];
                    } else if (currencyMap[keyFallback] !== undefined) {
                        tRate = currencyMap[keyFallback];
                    }
                    console.log(`Get Currency: ${keyExact}, ${tRate}`);
                }
                // var tTotWon = AFLib.numToFixed((parseFloat(tObj.TOT_AMT)+parseFloat(col.DEPOSIT_AMT)) * tRate, 2);
                var tTotWon = AFLib.numToFixed(
                    parseFloat(tObj.TOT_AMT) * tRate,
                    2,
                );
                tObj.TOT_AMT_WON = String(tTotWon);

                tObj.INCOME_DATE = col.INCOME_DATE;
                tObj.INCOME_DATE1 = col.INCOME_DATE1;
                tObj.INCOME_DATE2 = col.INCOME_DATE2;
                tObj.INCOME_DATE3 = col.INCOME_DATE3;

                /*
                var ttInfo = ttMap[tObj.INVOICE_NO];
                if (ttInfo) {
                    tObj.TT_REF_NO = ttInfo.refNo;
                    tObj.TT_AMT = String(ttInfo.amt);
                    tObj.TT_DATE = ttInfo.date || "";
                } else {
                    tObj.TT_REF_NO = "";
                    tObj.TT_AMT = "0";
                    tObj.TT_DATE = "";
                }
                */

                var tSeq = 0;
                tObj.TT_REF_NO = '';
                tObj.TT_AMT = '0';
                tObj.TT_DATE = '';
                tObj.TT_REF_NO1 = '';
                tObj.TT_AMT1 = '0';
                tObj.TT_DATE1 = '';
                tObj.TT_REF_NO2 = '';
                tObj.TT_AMT2 = '0';
                tObj.TT_DATE2 = '';
                tObj.TT_REF_NO3 = '';
                tObj.TT_AMT3 = '0';
                tObj.TT_DATE3 = '';
                tTTArray.forEach((col9, i9) => {
                    if (col9.invoice_no === tObj.INVOICE_NO) {
                        if (tSeq === 0) {
                            tObj.TT_REF_NO = col9.ref_no;
                            tObj.TT_AMT = col9.bill_amt;
                            tObj.TT_DATE = col9.bill_date;
                            refnoSet.add(col9.ref_no);
                        }
                        if (tSeq === 1) {
                            tObj.TT_REF_NO1 = col9.ref_no;
                            tObj.TT_AMT1 = col9.bill_amt;
                            tObj.TT_DATE1 = col9.bill_date;
                            refnoSet.add(col9.ref_no);
                        }
                        if (tSeq === 2) {
                            tObj.TT_REF_NO2 = col9.ref_no;
                            tObj.TT_AMT2 = col9.bill_amt;
                            tObj.TT_DATE2 = col9.bill_date;
                            refnoSet.add(col9.ref_no);
                        }
                        if (tSeq === 3) {
                            tObj.TT_REF_NO3 = col9.ref_no;
                            tObj.TT_AMT3 = col9.bill_amt;
                            tObj.TT_DATE3 = col9.bill_date;
                            refnoSet.add(col9.ref_no);
                        }
                        tSeq += 1;
                    }
                });

                var oaInfo = oaMap[tObj.INVOICE_NO];
                if (oaInfo) {
                    tObj.OA_REF_NO = oaInfo.refNo;
                    tObj.OA_AMT = String(oaInfo.amt);
                    tObj.OA_DATE = oaInfo.date || '';
                } else {
                    tObj.OA_REF_NO = '';
                    tObj.OA_AMT = '0';
                    tObj.OA_DATE = '';
                }

                tObj.CRDB_CD = col.CRDB_CD;
                tObj.DEPOSIT_AMT = col.DEPOSIT_AMT;

                tRetArray.push(tObj);
            }

            for (let tIdx1 = 0; tIdx1 < tRet1.length; tIdx1++) {
                const col = tRet1[tIdx1];
                var tObj = {};
                tObj.STATUS_NAME = '기타매출';
                tObj.BUYER_NAME = col.BUYER_NAME;
                tObj.BUYER_CD = col.BUYER_CD;
                tObj.BUYER_NAT_CD = col.BUYER_NAT_CD;
                tObj.INVOICE_NO = col.INVOICE_NO;
                tObj.SHIP_DATE = col.SHIP_DATE;
                tObj.ATD = col.ATD;
                tObj.DELIVERY_TYPE = col.DELIVERY_TYPE;
                tObj.DELIVERY_TYPE_N = col.DELIVERY_TYPE_N;
                tObj.SHIP_PTYPE = col.SHIP_PTYPE;
                tObj.PAYMENT_TERM = col.PAYMENT_TERM;
                tObj.SHIP_MODE_N = col.SHIP_MODE_N;
                tObj.CI_NO = '';
                tObj.FROM_PORT = col.FROM_PORT;
                tObj.TO_PORT = col.TO_PORT;
                tObj.TO_PORT_N = col.TO_PORT_N;
                tObj.ORD_AMT = AFLib.numToFixed(parseFloat(col.ORD_AMT), 2);
                tObj.TOT_AMT = AFLib.numToFixed(parseFloat(col.TOT_AMT), 2);
                tObj.TOT_AMT1 = AFLib.numToFixed(parseFloat(col.TOT_AMT1), 2);
                tObj.TOT_AMT2 = AFLib.numToFixed(parseFloat(col.TOT_AMT2), 2);
                tObj.TOT_AMT3 = AFLib.numToFixed(parseFloat(col.TOT_AMT3), 2);
                tObj.TOT_AMT_WON = '';
                tObj.DOCU_NO = col.DOCU_NO;
                tObj.DOCU_STATUS = '';
                tObj.CURR_CD = col.CURR_CD;
                tObj.VAT_AMT = col.VAT_AMT;
                tObj.NEOE_A23 = col.NEOE_A23;
                tObj.NEOE_BUYER_CD = col.NEOE_BUYER_CD;

                if (tObj.FROM_PORT === 'FC034') {
                    tObj.FROM_PORT_N = 'BVT';
                } else if (tObj.FROM_PORT === 'FC044') {
                    tObj.FROM_PORT_N = 'ETP';
                } else {
                    tObj.FROM_PORT_N = 'ETC';
                }

                var tRate = 0;
                if (tObj.SHIP_DATE && tObj.CURR_CD) {
                    const keyExact = `${tObj.SHIP_DATE}_${tObj.CURR_CD}`;
                    const keyFallback = `${tRetDate1}_${tObj.CURR_CD}`;
                    if (currencyMap[keyExact] !== undefined) {
                        tRate = currencyMap[keyExact];
                    } else if (currencyMap[keyFallback] !== undefined) {
                        tRate = currencyMap[keyFallback];
                    }
                }
                var tTotWon = AFLib.numToFixed(
                    parseFloat(tObj.TOT_AMT) * tRate,
                    2,
                );
                tObj.TOT_AMT_WON = String(tTotWon);

                tObj.INCOME_DATE = col.INCOME_DATE;
                tObj.INCOME_DATE1 = col.INCOME_DATE1;
                tObj.INCOME_DATE2 = col.INCOME_DATE2;
                tObj.INCOME_DATE3 = col.INCOME_DATE3;

                var ttInfo = ttMap[tObj.INVOICE_NO];
                tObj.TT_REF_NO = '';
                tObj.TT_AMT = '0';
                tObj.TT_DATE = '';
                tObj.TT_REF_NO1 = '';
                tObj.TT_AMT1 = '0';
                tObj.TT_DATE1 = '';
                tObj.TT_REF_NO2 = '';
                tObj.TT_AMT2 = '0';
                tObj.TT_DATE2 = '';
                tObj.TT_REF_NO3 = '';
                tObj.TT_AMT3 = '0';
                tObj.TT_DATE3 = '';
                if (ttInfo) {
                    tObj.TT_REF_NO = ttInfo.refNo;
                    tObj.TT_AMT = String(ttInfo.amt);
                    tObj.TT_DATE = ttInfo.date || '';
                } else {
                    tObj.TT_REF_NO = '';
                    tObj.TT_AMT = '0';
                    tObj.TT_DATE = '';
                }

                var oaInfo = oaMap[tObj.INVOICE_NO];
                if (oaInfo) {
                    tObj.OA_REF_NO = oaInfo.refNo;
                    tObj.OA_AMT = String(oaInfo.amt);
                    tObj.OA_DATE = oaInfo.date || '';
                } else {
                    tObj.OA_REF_NO = '';
                    tObj.OA_AMT = '0';
                    tObj.OA_DATE = '';
                }

                if (parseFloat(tObj.OA_AMT) === parseFloat(tObj.TT_AMT)) {
                    tObj.TT_AMT = '0';
                    tObj.TT_REF_NO = '';
                }

                tObj.CRDB_CD = col.CRDB_CD;
                tObj.DEPOSIT_AMT = col.DEPOSIT_AMT;

                tRetArray.push(tObj);
            }

            var tRetArray10 = [];
            tRetArray.forEach((col, i) => {
                var tObj = { ...col };

                var tOrgAmt = parseFloat(tObj.TOT_AMT);
                var tDepositAmt = parseFloat(tObj.DEPOSIT_AMT);
                var tTotAmt = tOrgAmt - tDepositAmt;
                tObj.TOT_AMT1 = parseFloat(tTotAmt).toFixed(2);

                tRetArray10.push(tObj);
            });

            return tRetArray10;

            /*
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var sDate = args.data.S_SHIP_DATE;
            var eDate = args.data.E_SHIP_DATE;
            var sqlShipDate = '';
            var sqlShipDate1 = '';
            sqlShipDate = `and  a.atd between '${sDate}' and '${eDate}' `;
            sqlShipDate1 = `and  a5.atd between '${sDate}' and '${eDate}' `;
            if (!eDate) {
                sqlShipDate = `and  a.atd >= '${sDate}'   `;
                sqlShipDate1 = `and  a5.atd >= '${sDate}'   `;
            }

            var tSQL = '';
            tSQL = `and  ((a5.atd between '${sDate}' and '${eDate}')) `;
            if (!eDate) {
                tSQL = `and  ((a5.atd >= '${sDate}')) `;
            }

            var tRetArray = [];
            let sqlStr = `
                SELECT
                    A1.*,
                    A2.BUYER_CD,
                    A2.BUYER_NAME,
                    A3.CD_NAME as SHIP_MODE_N,
                    A4.CD_NAME as DELIVERY_TYPE_N,
                    '' AS BL_FILE,
                    '' AS PL_FILE,
                    '' AS DEBIT_FILE,
                    isnull(A5.COST_CONFIRM_USER, '') as COST_CONFIRM_USER,
                    isnull(A5.LICENSE_NO, '') as LICENSE_NO,
                    isnull(A5.LICENSE_DATE, '') as LICENSE_DATE,
                    isnull(A5.IMPORT_FREIGHT_AMT, '') as IMPORT_FREIGHT_AMT,
                    isnull(A5.IMPORT_CLEARANCE_AMT, '') as IMPORT_CLEARANCE_AMT,
                    isnull(A5.IMPORT_DUTY_AMT, '') as IMPORT_DUTY_AMT,
                    isnull(A5.REMARK, '') as REMARK,
                    isnull(A5.DOCU_NO, '') as DOCU_NO,
                    isnull(A5.CURR_CD, '') as CURR_CD,
                    isnull(A5.FACTORY_CD, '') as FROM_PORT,
                    isnull(A5.ORD_AMT, '0') as ORD_AMT,
                    isnull(A5.TOT_AMT, '0') as TOT_AMT,
                    isnull(A5.VAT_AMT, '0') as VAT_AMT,
                    '0' as BAL_QTY,
                    isnull(A2.NEOE_A23, '') as NEOE_A23,
                    isnull(A2.NEOE_BUYER_CD, '') as NEOE_BUYER_CD,
                    isnull(A5.INCOME_DATE, '') as INCOME_DATE,
                    isnull(A5.ATD, '') as ATD,
                    -- isnull(A5.DUE_DATE, '') as ATD
                    A2.NAT_CD as BUYER_NAT_CD,
                    isnull(A6.TOT_AMT1, '0') as TOT_AMT1,
                    isnull(A6.INCOME_DATE1, '') as INCOME_DATE1,
                    isnull(A6.TOT_AMT2, '0') as TOT_AMT2,
                    isnull(A6.INCOME_DATE2, '') as INCOME_DATE2,
                    isnull(A6.TOT_AMT3, '0') as TOT_AMT3,
                    isnull(A6.INCOME_DATE3, '') as INCOME_DATE3,
                    isnull(A5.CRDB_CD, '') as CRDB_CD,
                    isnull(A5.DEPOSIT_AMT, '0') as DEPOSIT_AMT
                FROM
                    (
                        SELECT
                            A.INVOICE_NO,
                            A.SHIP_DATE,
                            A.NAT_CD as TO_PORT,
                            isnull(E.NAT_NAME, '') as TO_PORT_N,
                            A.SHIP_PTYPE,
                            A.DELIVERY_TYPE,
                            -- A.SHIP_PRICE,  
                            SUM(A.SHIP_CNT) AS SHIP_QTY,
                            SUM(C.TOT_CNT) as ORDER_QTY,
                            isnull(sum(A.SHIP_AMOUNT), 0) as TOT_AMT
                        FROM
                            KSV_ORDER_SHIP A
                            left join KCD_NATION E on E.NAT_CD = A.NAT_CD,
                            KCD_BUYER B,
                            KSV_ORDER_MST C,
                            KCD_STYLE D
                        WHERE
                            A.ORDER_CD = c.ORDER_CD
                            AND D.STYLE_CD = D.STYLE_CD
                            AND A.ORDER_CD LIKE '%${args.data.ORDER_CD}%'
                            AND A.INVOICE_NO LIKE '%${args.data.INVOICE_NO}%'
                            AND LEFT(A.ORDER_CD, 2) = B.BUYER_CD
                            AND (B.BUYER_CD LIKE '%${args.data.BUYER_CD}%')
                            AND A.ORDER_CD = C.ORDER_CD
                            -- and A.NAT_CD not in ('kr', 'ko', 'ks')
                            and A.NAT_CD not in ('ks')
                            AND C.STYLE_CD = D.STYLE_CD
                            AND (D.STYLE_CD like '%%')
                            AND A.SHIP_PTYPE like '%${args.data.SHIP_MODE}%'
                            AND A.DELIVERY_TYPE like '%${args.data.DELIVERY_TYPE}%' ${sqlShipDate}
                        GROUP BY
                            A.INVOICE_NO,
                            A.SHIP_DATE,
                            A.NAT_CD,
                            E.NAT_NAME,
                            A.SHIP_PTYPE,
                            A.DELIVERY_TYPE --, A.SHIP_PRICE
                    ) A1
                    left join KCD_CODE A3 on A1.SHIP_PTYPE = A3.CD_CODE
                    and A3.CD_GROUP = 'SHIP_PTYPE'
                    left join KCD_CODE A4 on A1.delivery_type = A4.CD_CODE
                    and A4.CD_GROUP = 'DELIVERY_TYPE',
                    KCD_BUYER A2,
                    KSV_INVOICE_MST A5
                    left join ksv_invoice_info A6 on A5.invoice_no = A6.invoice_no
                where
                    (
                        A5.DUE_DATE is not null
                        AND A5.DUE_DATE <> ''
                    )
                    -- where (A5.ATD is not null AND A5.ATD <> '')
                    and A5.BUYER_CD = A2.BUYER_CD
                    and A1.INVOICE_NO = A5.INVOICE_NO
                    -- and A2.NAT_CD not in ('kr', 'ko', 'ks')
                    and A2.NAT_CD not in ('ks')
                    -- and A5.LICENSE_NO <> ''
                    and A5.FACTORY_CD like '%${args.data.FACTORY_CD}%' ${tSQL}
                order by
                    A1.SHIP_DATE desc
            `;

            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var col = {
                    ...tRet[tIdx]
                };
                var tObj = {};
                tObj.STATUS_NAME = '제품매출';
                tObj.BUYER_NAME = col.BUYER_NAME;
                tObj.BUYER_CD = col.BUYER_CD;
                tObj.BUYER_NAT_CD = col.BUYER_NAT_CD;
                tObj.INVOICE_NO = col.INVOICE_NO;
                tObj.SHIP_DATE = col.SHIP_DATE;
                tObj.ATD = col.ATD;
                tObj.DELIVERY_TYPE = col.DELIVERY_TYPE;
                tObj.DELIVERY_TYPE_N = col.DELIVERY_TYPE_N;
                tObj.SHIP_PTYPE = col.SHIP_PTYPE;
                tObj.SHIP_MODE_N = col.SHIP_MODE_N;
                tObj.CI_NO = '';
                tObj.FROM_PORT = col.FROM_PORT;
                tObj.TO_PORT = col.TO_PORT;
                tObj.TO_PORT_N = col.TO_PORT_N;
                tObj.ORD_AMT = AFLib.numToFixed(parseFloat(col.ORD_AMT), 2);
                tObj.TOT_AMT = AFLib.numToFixed(parseFloat(col.TOT_AMT), 2);
                tObj.TOT_AMT1 = AFLib.numToFixed(parseFloat(col.TOT_AMT1), 2);
                tObj.TOT_AMT2 = AFLib.numToFixed(parseFloat(col.TOT_AMT2), 2);
                tObj.TOT_AMT3 = AFLib.numToFixed(parseFloat(col.TOT_AMT3), 2);
                tObj.TOT_AMT_WON = '';
                tObj.DOCU_NO = col.DOCU_NO;
                tObj.DOCU_STATUS = '';
                tObj.CURR_CD = col.CURR_CD;
                tObj.VAT_AMT = col.VAT_AMT;
                tObj.NEOE_A23 = col.NEOE_A23;
                tObj.NEOE_BUYER_CD = col.NEOE_BUYER_CD;
                if (tObj.FROM_PORT === 'FC034') {
                    tObj.FROM_PORT_N = 'BVT';
                } else if (tObj.FROM_PORT === 'FC044') {
                    tObj.FROM_PORT_N = 'ETP';
                } else {
                    tObj.FROM_PORT_N = 'ETC';
                }

                let sql0 = `
                    select
                        *
                    from
                        kcd_currency
                    where
                        start_date = '${tObj.SHIP_DATE}'
                        and curr_cd = '${tObj.CURR_CD}'
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                var tRate = 0;
                if (tRet0.length <= 0) {
                    let sql1 = `
                        select
                            *
                        from
                            kcd_currency
                        where
                            start_date = '${tRetDate1}'
                            and curr_cd = '${tObj.CURR_CD}'
                    `;
                    var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                    if (tRet1.length > 0) tRate = tRet1[0].WON_AMT2;
                } else {
                    tRate = tRet0[0].WON_AMT2;
                }
                var tTotWon = AFLib.numToFixed(parseFloat(tObj.TOT_AMT) * tRate, 2);
                tObj.TOT_AMT_WON = String(tTotWon);
                tObj.INCOME_DATE = col.INCOME_DATE;
                tObj.INCOME_DATE1 = col.INCOME_DATE1;
                tObj.INCOME_DATE2 = col.INCOME_DATE2;
                tObj.INCOME_DATE3 = col.INCOME_DATE3;

                let sqlTT = `
                    select
                        a.ref_no,
                        a.curr_cd,
                        a.bill_amt,
                        b.bill_date,
                        a.bill_type,
                        a.start_date
                    from
                        ksv_invoice_bill a,
                        ksv_invoice_prebill b
                    where
                        a.invoice_no = '${tObj.INVOICE_NO}'
                        and a.ref_no = b.ref_no
                        and a.bill_type in ('1')
                    order by
                        a.bill_type
                `;
                var tRetTT = await prisma.$queryRaw(Prisma.raw(sqlTT));
                var tTT_REF_NO = '';
                var tTT_AMT = 0;
                var tTT_DATE = '';
                tRetTT.forEach((col, i) => {
                    tTT_AMT += parseFloat(col.bill_amt);
                    if (parseFloat(col.bill_amt) > 0) tTT_REF_NO = col.ref_no;
                    tTT_DATE = col.bill_date
                });
                tObj.TT_REF_NO = tTT_REF_NO;
                tObj.TT_AMT = String(tTT_AMT);
                tObj.TT_DATE = tTT_DATE;

                let sqlOA = `
                    select
                        a.ref_no,
                        a.bill_amt,
                        a.bill_date,
                        a.bill_type,
                        b.start_date
                    from
                        ksv_invoice_bill a,
                        ksv_invoice_nego b
                    where
                        a.invoice_no = '${tObj.INVOICE_NO}'
                        and a.bill_type in ('2', '3')
                        and a.ref_no = b.ref_no
                `;
                var tRetOA = await prisma.$queryRaw(Prisma.raw(sqlOA));
                var tOA_REF_NO = '';
                var tOA_AMT = 0;
                var tOA_DATE = '';
                tRetOA.forEach((col, i) => {
                    tOA_AMT += parseFloat(col.bill_amt);
                    if (parseFloat(col.bill_amt) > 0) tOA_REF_NO = col.ref_no;
                    tOA_DATE = col.start_date;
                });
                tObj.OA_REF_NO = tOA_REF_NO;
                tObj.OA_AMT = String(tOA_AMT);
                tObj.OA_DATE = tOA_DATE;
                tObj.CRDB_CD = col.CRDB_CD;
                tObj.DEPOSIT_AMT = col.DEPOSIT_AMT;

                tRetArray.push(tObj);
            }

            let sqlStr1 = `
                SELECT
                    isnull(A2.BUYER_CD, '') as BUYER_CD,
                    isnull(A2.BUYER_NAME, '') as BUYER_NAME,
                    '' as SHIP_MODE_N,
                    A4.CD_NAME as DELIVERY_TYPE_N,
                    '' AS BL_FILE,
                    '' AS PL_FILE,
                    '' AS DEBIT_FILE,
                    isnull(A5.COST_CONFIRM_USER, '') as COST_CONFIRM_USER,
                    isnull(A5.LICENSE_NO, '') as LICENSE_NO,
                    isnull(A5.LICENSE_DATE, '') as LICENSE_DATE,
                    isnull(A5.IMPORT_FREIGHT_AMT, '') as IMPORT_FREIGHT_AMT,
                    isnull(A5.IMPORT_CLEARANCE_AMT, '') as IMPORT_CLEARANCE_AMT,
                    isnull(A5.IMPORT_DUTY_AMT, '') as IMPORT_DUTY_AMT,
                    isnull(A5.REMARK, '') as REMARK,
                    isnull(A5.DOCU_NO, '') as DOCU_NO,
                    isnull(A5.CURR_CD, '') as CURR_CD,
                    isnull(A5.FACTORY_CD, '') as FROM_PORT,
                    isnull(A5.ORD_AMT, '0') as ORD_AMT,
                    isnull(A5.TOT_AMT, '0') as TOT_AMT,
                    isnull(A5.VAT_AMT, '0') as VAT_AMT,
                    '0' as BAL_QTY,
                    isnull(A2.NEOE_A23, '') as NEOE_A23,
                    isnull(A2.NEOE_BUYER_CD, '') as NEOE_BUYER_CD,
                    isnull(A5.INCOME_DATE, '') as INCOME_DATE,
                    isnull(A5.ATD, '') as ATD,
                    -- isnull(A5.DUE_DATE, '') as ATD
                    isnull(A2.NAT_CD, '') as BUYER_NAT_CD,
                    isnull(A6.TOT_AMT1, '0') as TOT_AMT1,
                    isnull(A6.INCOME_DATE1, '') as INCOME_DATE1,
                    isnull(A6.TOT_AMT2, '0') as TOT_AMT2,
                    isnull(A6.INCOME_DATE2, '') as INCOME_DATE2,
                    isnull(A6.TOT_AMT3, '0') as TOT_AMT3,
                    isnull(A6.INCOME_DATE3, '') as INCOME_DATE3,
                    isnull(A5.CRDB_CD, '') as CRDB_CD,
                    isnull(A5.DEPOSIT_AMT, '0') as DEPOSIT_AMT,
                    A5.INVOICE_NO,
                    A5.SHIP_DATE,
                    '' as TO_PORT,
                    '' as TO_PORT_N,
                    '' as SHIP_PTYPE,
                    A5.DELIVERY_TYPE,
                    '1' as SHIP_QTY,
                    '1' as ORDER_QTY
                FROM
                    KSV_INVOICE_MST A5
                    left join ksv_invoice_mem A8 on A8.invoice_no = A5.invoice_no
                    left join ksv_invoice_info A6 on A5.invoice_no = A6.invoice_no
                    left join KCD_CODE A4 on A5.delivery_type = A4.CD_CODE
                    and A4.CD_GROUP = 'DELIVERY_TYPE',
                    KCD_BUYER A2
                where
                    (
                        A5.DUE_DATE is not null
                        AND A5.DUE_DATE <> ''
                    )
                    and isnull(A8.INVOICE_NO, '') = '' ${sqlShipDate1}
                    AND A5.INVOICE_NO LIKE '%${args.data.INVOICE_NO}%'
                    AND A5.DELIVERY_TYPE like '%${args.data.DELIVERY_TYPE}%'
                    and A5.BUYER_CD = A2.BUYER_CD
                    -- and  A2.NAT_CD not in ('ks')
                    and A5.FACTORY_CD like '%${args.data.FACTORY_CD}%'
                    AND A5.BUYER_CD LIKE '%${args.data.BUYER_CD}%' ${tSQL}
            `;
            var tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));
            var tIdx1 = 0;
            for (tIdx1 = 0; tIdx1 < tRet1.length; tIdx1++) {
                var col = {
                    ...tRet1[tIdx1]
                };
                var tObj = {};
                tObj.STATUS_NAME = '기타매출';
                tObj.BUYER_NAME = col.BUYER_NAME;
                tObj.BUYER_CD = col.BUYER_CD;
                tObj.BUYER_NAT_CD = col.BUYER_NAT_CD;
                tObj.INVOICE_NO = col.INVOICE_NO;
                tObj.SHIP_DATE = col.SHIP_DATE;
                tObj.ATD = col.ATD;
                tObj.DELIVERY_TYPE = col.DELIVERY_TYPE;
                tObj.DELIVERY_TYPE_N = col.DELIVERY_TYPE_N;
                tObj.SHIP_PTYPE = col.SHIP_PTYPE;
                tObj.SHIP_MODE_N = col.SHIP_MODE_N;
                tObj.CI_NO = '';
                tObj.FROM_PORT = col.FROM_PORT;
                tObj.TO_PORT = col.TO_PORT;
                tObj.TO_PORT_N = col.TO_PORT_N;
                tObj.ORD_AMT = AFLib.numToFixed(parseFloat(col.ORD_AMT), 2);
                tObj.TOT_AMT = AFLib.numToFixed(parseFloat(col.TOT_AMT), 2);
                tObj.TOT_AMT1 = AFLib.numToFixed(parseFloat(col.TOT_AMT1), 2);
                tObj.TOT_AMT2 = AFLib.numToFixed(parseFloat(col.TOT_AMT2), 2);
                tObj.TOT_AMT3 = AFLib.numToFixed(parseFloat(col.TOT_AMT3), 2);
                tObj.TOT_AMT_WON = '';
                tObj.DOCU_NO = col.DOCU_NO;
                tObj.DOCU_STATUS = '';
                tObj.CURR_CD = col.CURR_CD;
                tObj.VAT_AMT = col.VAT_AMT;
                tObj.NEOE_A23 = col.NEOE_A23;
                tObj.NEOE_BUYER_CD = col.NEOE_BUYER_CD;
                if (tObj.FROM_PORT === 'FC034') {
                    tObj.FROM_PORT_N = 'BVT';
                } else if (tObj.FROM_PORT === 'FC044') {
                    tObj.FROM_PORT_N = 'ETP';
                } else {
                    tObj.FROM_PORT_N = 'ETC';
                }

                let sql0 = `
                    select
                        *
                    from
                        kcd_currency
                    where
                        start_date = '${tObj.SHIP_DATE}'
                        and curr_cd = '${tObj.CURR_CD}'
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                var tRate = 0;
                if (tRet0.length <= 0) {
                    let sql1 = `
                        select
                            *
                        from
                            kcd_currency
                        where
                            start_date = '${tRetDate1}'
                            and curr_cd = '${tObj.CURR_CD}'
                    `;
                    var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                    if (tRet1.length > 0) tRate = tRet1[0].WON_AMT2;
                } else {
                    tRate = tRet0[0].WON_AMT2;
                }
                var tTotWon = AFLib.numToFixed(parseFloat(tObj.TOT_AMT) * tRate, 2);
                tObj.TOT_AMT_WON = String(tTotWon);
                tObj.INCOME_DATE = col.INCOME_DATE;
                tObj.INCOME_DATE1 = col.INCOME_DATE1;
                tObj.INCOME_DATE2 = col.INCOME_DATE2;
                tObj.INCOME_DATE3 = col.INCOME_DATE3;

                // 
                let sqlTT = `
                    select
                        ref_no,
                        curr_cd,
                        bill_amt,
                        bill_date,
                        bill_type
                    from
                        ksv_invoice_bill
                    where
                        invoice_no = '${tObj.INVOICE_NO}'
                        and bill_type in ('1')
                    order by
                        bill_type
                `;
                var tRetTT = await prisma.$queryRaw(Prisma.raw(sqlTT));
                var tTT_REF_NO = '';
                var tTT_AMT = 0;
                tRetTT.forEach((col, i) => {
                    tTT_AMT += parseFloat(col.bill_amt);
                    if (parseFloat(col.bill_amt) > 0) tTT_REF_NO = col.ref_no;
                });
                tObj.TT_REF_NO = tTT_REF_NO;
                tObj.TT_AMT = String(tTT_AMT);

                let sqlOA = `
                    select
                        a.ref_no,
                        a.bill_amt,
                        a.bill_date,
                        a.bill_type
                    from
                        ksv_invoice_bill a,
                        ksv_invoice_nego b
                    where
                        a.invoice_no = '${tObj.INVOICE_NO}'
                        and a.bill_type in ('2', '3')
                        and a.ref_no = b.ref_no
                `;
                var tRetOA = await prisma.$queryRaw(Prisma.raw(sqlOA));
                var tOA_REF_NO = '';
                var tOA_AMT = 0;
                tRetOA.forEach((col, i) => {
                    tOA_AMT += parseFloat(col.bill_amt);
                    if (parseFloat(col.bill_amt) > 0) tOA_REF_NO = col.ref_no;
                });
                tObj.OA_REF_NO = tOA_REF_NO;
                tObj.OA_AMT = String(tOA_AMT);

                if (parseFloat(tObj.OA_AMT) === parseFloat(tObj.TT_AMT)) {
                    tObj.TT_AMT = '0';
                    tObj.TT_REF_NO = '';
                }
                tObj.CRDB_CD = col.CRDB_CD;
                tObj.DEPOSIT_AMT = col.DEPOSIT_AMT;

                // if (parseFloat(tObj.TOT_AMT) > 0) tRetArray.push(tObj);
                tRetArray.push(tObj);
            }

            console.log(`S0802_2(Sql:${tRet.length}): ${sqlStr} `);
            console.log(`S0802_2(Sql1:${tRet1.length}): ${sqlStr1} `);

            return (tRetArray);*/
        },
        mgrQueryS0802_2_bak: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var sDate = args.data.S_SHIP_DATE;
            var eDate = args.data.E_SHIP_DATE;
            var tSQL = '';
            tSQL = `and  a.ship_date between '${sDate}' and '${eDate}' `;
            var tRetArray = [];
            let sqlStr = `
                SELECT
                    A1.*,
                    A2.BUYER_CD,
                    A2.BUYER_NAME,
                    A3.CD_NAME as SHIP_MODE_N,
                    A4.CD_NAME as DELIVERY_TYPE_N,
                    '' AS BL_FILE,
                    '' AS PL_FILE,
                    '' AS DEBIT_FILE,
                    isnull(A5.COST_CONFIRM_USER, '') as COST_CONFIRM_USER,
                    isnull(A5.LICENSE_NO, '') as LICENSE_NO,
                    isnull(A5.LICENSE_DATE, '') as LICENSE_DATE,
                    isnull(A5.IMPORT_FREIGHT_AMT, '') as IMPORT_FREIGHT_AMT,
                    isnull(A5.IMPORT_CLEARANCE_AMT, '') as IMPORT_CLEARANCE_AMT,
                    isnull(A5.IMPORT_DUTY_AMT, '') as IMPORT_DUTY_AMT,
                    isnull(A5.REMARK, '') as REMARK,
                    isnull(A5.DOCU_NO, '') as DOCU_NO,
                    isnull(A5.CURR_CD, '') as CURR_CD,
                    isnull(A5.FACTORY_CD, '') as FROM_PORT,
                    isnull(A5.ORD_AMT, '0') as ORD_AMT,
                    isnull(A5.TOT_AMT, '0') as TOT_AMT,
                    isnull(A5.VAT_AMT, '0') as VAT_AMT,
                    '0' as BAL_QTY,
                    isnull(A2.NEOE_A23, '') as NEOE_A23,
                    isnull(A2.NEOE_BUYER_CD, '') as NEOE_BUYER_CD,
                    isnull(A5.INCOME_DATE, '') as INCOME_DATE
                FROM
                    (
                        SELECT
                            A.INVOICE_NO,
                            A.SHIP_DATE,
                            A.NAT_CD as TO_PORT,
                            A.SHIP_PTYPE,
                            A.DELIVERY_TYPE,
                            A.SHIP_PRICE,
                            SUM(A.SHIP_CNT) AS SHIP_QTY,
                            SUM(C.TOT_CNT) as ORDER_QTY,
                            isnull(sum(A.SHIP_AMOUNT), 0) as TOT_AMT
                        FROM
                            KSV_ORDER_SHIP A,
                            KCD_BUYER B,
                            KSV_ORDER_MST C,
                            KCD_STYLE D,
                            KSV_PO_MEM D2
                        WHERE
                            A.ORDER_CD LIKE '%%' ${tSQL}
                            AND LEFT(A.ORDER_CD, 2) = B.BUYER_CD
                            AND (B.BUYER_CD LIKE '%${args.data.BUYER_CD}%')
                            AND A.ORDER_CD = C.ORDER_CD
                            and A.NAT_CD not in ('kr', 'ko', 'ks')
                            AND C.STYLE_CD = D.STYLE_CD
                            AND (D.STYLE_CD like '%%')
                            AND C.ORDER_CD = D2.ORDER_CD
                        GROUP BY
                            A.INVOICE_NO,
                            A.SHIP_DATE,
                            A.NAT_CD,
                            A.SHIP_PTYPE,
                            A.DELIVERY_TYPE,
                            A.SHIP_PRICE
                    ) A1
                    left join KCD_CODE A3 on A1.SHIP_PTYPE = A3.CD_CODE
                    and A3.CD_GROUP = 'SHIP_PTYPE'
                    left join KCD_CODE A4 on A1.delivery_type = A4.CD_CODE
                    and A4.CD_GROUP = 'SHIPMENT_SHIP_MODE',
                    KCD_BUYER A2,
                    KSV_INVOICE_MST A5
                where
                    A5.BUYER_CD = A2.BUYER_CD
                    and A1.INVOICE_NO = A5.INVOICE_NO
                    -- and A5.LICENSE_NO <> ''
                    and A5.FACTORY_CD like '%${args.data.FACTORY_CD}%'
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var col = {
                    ...tRet[tIdx],
                };
                var tObj = {};
                tObj.STATUS_NAME = '제품매출';
                tObj.BUYER_NAME = col.BUYER_NAME;
                tObj.BUYER_CD = col.BUYER_CD;
                tObj.INVOICE_NO = col.INVOICE_NO;
                tObj.SHIP_DATE = col.SHIP_DATE;
                tObj.DELIVERY_TYPE = col.DELIVERY_TYPE;
                tObj.DELIVERY_TYPE_N = col.DELIVERY_TYPE_N;
                tObj.CI_NO = '';
                tObj.FROM_PORT = col.FROM_PORT;
                tObj.TO_PORT = col.TO_PORT;
                tObj.ORD_AMT = col.ORD_AMT;
                tObj.TOT_AMT = col.TOT_AMT;
                tObj.TOT_AMT_WON = '';
                tObj.DOCU_NO = col.DOCU_NO;
                tObj.DOCU_STATUS = '';
                tObj.CURR_CD = col.CURR_CD;
                tObj.VAT_AMT = col.VAT_AMT;
                tObj.NEOE_A23 = col.NEOE_A23;
                tObj.NEOE_BUYER_CD = col.NEOE_BUYER_CD;
                if (tObj.FROM_PORT === 'FC034') {
                    tObj.FROM_PORT_N = 'BVT';
                } else if (tObj.FROM_PORT === 'FC044') {
                    tObj.FROM_PORT_N = 'ETP';
                } else {
                    tObj.FROM_PORT_N = 'ETC';
                }

                let sql0 = `
                    select
                        *
                    from
                        kcd_currency
                    where
                        start_date = '${tObj.SHIP_DATE}'
                        and curr_cd = '${tObj.CURR_CD}'
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                var tRate = 0;
                if (tRet0.length <= 0) {
                    let sql1 = `
                        select
                            *
                        from
                            kcd_currency
                        where
                            start_date = '${tRetDate1}'
                            and curr_cd = '${tObj.CURR_CD}'
                    `;
                    var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                    if (tRet1.length > 0) tRate = tRet1[0].WON_AMT2;
                } else {
                    tRate = tRet0[0].WON_AMT2;
                }
                var tTotWon = parseFloat(tObj.TOT_AMT) * tRate;
                tObj.TOT_AMT_WON = String(tTotWon);
                tObj.INCOME_DATE = col.INCOME_DATE;
                if (parseFloat(tObj.TOT_AMT) > 0) tRetArray.push(tObj);
            }
            var tIdx = 0;
            return tRetArray;
        },
    },
};

export default moduleQuery_S0802_2;
