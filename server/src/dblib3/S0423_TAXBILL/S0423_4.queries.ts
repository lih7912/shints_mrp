import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
import axios from 'axios';
const Excel = require('exceljs');
const {
    generateUploadURL,
    deleteUploadObject,
    upload,
} = require('../../../routes/s3');
const { MongoClient } = require('mongodb');

// export default로 Query 내용 내보내기
const moduleQuery_S0423_4 = {
    Query: {
        mgrQueryS0423_4_REPORT: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);
            var tInput = { ...args };

            var tIdx = 0;
            var taxbillSql = '';
            var billcdSql = '';
            var tCheckDcAmount = 0;
            var tMessage = '';
            for (tIdx = 0; tIdx < args.data.length; tIdx++) {
                var tOne = { ...args.data[tIdx] };
                if (tIdx === 0) {
                    taxbillSql += `'${tOne.TAXBILL_CD}'`;
                    billcdSql += `'${tOne.BILL_CD}'`;
                } else {
                    taxbillSql += `,'${tOne.TAXBILL_CD}'`;
                    billcdSql += `,'${tOne.BILL_CD}'`;
                }

                /* WON.2601 */
                if (parseFloat(tOne.DISCOUNT_AMT) > 0) {
                    var sql100 = `
                        select
                            isnull(dc_amount , 0) as dc_amount
                        from
                            ksv_dc_amount
                        where
                            end_date = '${tOne.INVOICE_DATE}'
                            and vendor_cd = '${tOne.VENDOR_CD}'
                            and curr_cd = '${tOne.CURR_CD}'
                            and pay_date = '${tOne.PAY_DATE}'
                            and pay_report = '${tOne.PAY_REPORT}'
                    `;
                    var ret100 = await prisma.$queryRaw(Prisma.raw(sql100));
                    var tDcAmount = 0;
                    if (ret100.length > 0) {
                        tDcAmount = parseFloat(ret100[0].dc_amount);
                    }
                    if (tDcAmount !== parseFloat(tOne.DISCOUNT_AMT)) {
                        tCheckDcAmount = 1;
                        console.log(`${tOne.BILL_CD}/${tOne.DISCOUNT_AMT}/${tDcAmount}/${ret100.length}`);
                        if (ret100.length > 0) {
                            var sqlUp = `
                                update ksv_dc_amount set dc_amount = ${tOne.DISCOUNT_AMT}
                                where end_date = '${tOne.INVOICE_DATE}'
                                and vendor_cd = '${tOne.VENDOR_CD}'
                                and curr_cd = '${tOne.CURR_CD}'
                                and pay_date = '${tOne.PAY_DATE}'
                                and pay_report = '${tOne.PAY_REPORT}'
                            `;
                            var retUp = await prisma.$queryRaw(Prisma.raw(sqlUp));
                        }  else {
                            var sql1 = `
                                select * from ksv_bill_mst 
                                where bill_cd = '${tOne.BILL_CD}'
                            `;
                            var ret1 = await prisma.$queryRaw(Prisma.raw(sql1));

                            var tInObj = {};
                            tInObj.end_date = tOne.INVOICE_DATE; 
                            tInObj.vendor_cd =  tOne.VENDOR_CD;
                            tInObj.curr_cd =  tOne.CURR_CD;
                            tInObj.calc_flag = '1'; 
                            tInObj.tt_flag =  '1'; 
                            tInObj.pur_factory = ret1[0].PUR_FACTORY;
                            tInObj.pay_date = tOne.PAY_DATE;
                            tInObj.pay_report = tOne.PAY_REPORT;

                            tInObj.dc_amount = tOne.DISCOUNT_AMT;
                            tInObj.dn_amount = '0';
                            tInObj.bill_flag = '';
                            tInObj.bill_date = ''; 
                            tInObj.crdb_cd =  '';
                            tInObj.buy_date = '';
                            tInObj.curr_rate  = '';
                            tInObj.krw_amount  = '';
                            tInObj.stsin_cd  = '';
                            tInObj.taxbill_cd  = '';
                            tInObj.bill_cd  = tOne.BILL_CD;
                            var sqlIn = AFLib.createTableSql('ksv_dc_amount', tInObj);
                            var retIn = await prisma.$queryRaw(Prisma.raw(sqlIn));
                        }
                    }
                }
            }

            // 지우지 마세요.   Won. 260316
            if (tCheckDcAmount > 0) {
                /*
                var tRetArray = [];
                var tObj = {};
                tObj.id = 1;
                tObj.CODE = `ERROR:Dc Amount가 틀립니다. Dc Apply후에 진행하십시요(${tMessage}) `;
                console.log(tObj.CODE);
                tRetArray.push(tObj);
                return tRetArray;
                */
                ;
            }

            let sql0_1 = `
                select
                    a.*,
                    b.VENDOR_NAME
                from
                    kcd_gw_taxbill_kr a,
                    kcd_vendor b
                where
                    a.taxbill_cd in (${taxbillSql})
                    and a.vendor_cd = b.vendor_cd
            `;
            var tRet0_1 = await prisma.$queryRaw(Prisma.raw(sql0_1));

            var tRet0 = [];
            var tRet1 = [];
            tRet0_1.forEach((col, i) => {
                if (col.CURR_CD === 'KRW') tRet0.push(col);
                else tRet1.push(col);
            });

            var tWExcelFile = `Bill_Manager_다운로드_-${tRetDate}`;
            try {
                // Excel Read
                var tPath0 = '';
                var tCols0 = __dirname.split('/');
                var tFlag0 = 0;
                tCols0.forEach((col, i) => {
                    if (col !== '') {
                        if (col === 'src') {
                            tPath0 += '/upload/excel_template';
                            tFlag0 = 1;
                        }
                        if (tFlag0 === 0) {
                            tPath0 += '/' + col;
                        }
                    }
                });

                var tTemplateName = 'Bill_manager_download';
                var tTemplateExcel = `${tPath0}/${tTemplateName}.xlsx`;

                const wb = new Excel.Workbook();
                await wb.xlsx.readFile(tTemplateExcel);

                var tSheetName = 'list';
                var sheet = wb.getWorksheet(tSheetName);

                console.log(`STEP-1:0`);
                sheet.getCell(1, 1).value =
                    `${tRetDate.substring(0, 4)}년 ${tRetDate.substring(4, 6)}월 자재마감내역`;
                console.log(`STEP-1:0-1`);


                var tRowIdx = 4;

                var tIdx = 0;
                var tSumPoAmt = 0;
                var tSumDiscountAmt = 0;
                var tSumDebitAmt = 0;
                var tSumPayAmt = 0;
                var tSumVatAmt = 0;
                var tSumTotAmt = 0;
                tRet0.forEach((col, i) => {
                    var tmpRow = [];

                    var tFindObj = {};
                    args.data.forEach((col1, i1) => {
                        if (col.TAXBILL_CD === col1.TAXBILL_CD)
                            tFindObj = { ...col1 };
                    });

                    var tAmt = parseFloat(col.TOT_AMOUNT) - parseFloat(col.TAX);

                    sheet.insertRow(tRowIdx + 1, tmpRow, 'i');
                    sheet.getCell(tRowIdx, 1).value = i + 1;
                    sheet.getCell(tRowIdx, 2).value = col.VENDOR_CD;
                    sheet.getCell(tRowIdx, 3).value = col.VENDOR_NAME;
                    sheet.getCell(tRowIdx, 4).value = '';
                    sheet.getCell(tRowIdx, 5).value = parseFloat(
                        tFindObj.PO_AMT,
                    );
                    sheet.getCell(tRowIdx, 6).value = parseFloat(
                        tFindObj.DISCOUNT_AMT,
                    );
                    sheet.getCell(tRowIdx, 7).value = parseFloat(
                        tFindObj.DEBIT_AMT,
                    );
                    sheet.getCell(tRowIdx, 8).value = parseFloat(col.CURR_RATE);
                    sheet.getCell(tRowIdx, 9).value = parseFloat(tAmt);
                    sheet.getCell(tRowIdx, 10).value = parseFloat(col.TAX);
                    sheet.getCell(tRowIdx, 11).value = parseFloat(
                        col.TOT_AMOUNT,
                    );
                    sheet.getCell(tRowIdx, 12).value = parseFloat(
                        col.KRW_AMOUNT,
                    );
                    sheet.getCell(tRowIdx, 13).value = col.PUR_APP;
                    sheet.getCell(tRowIdx, 14).value = col.TT_FLAG;
                    sheet.getCell(tRowIdx, 15).value = col.PAY_DATE;
                    sheet.getCell(tRowIdx, 16).value = '';
                    sheet.getCell(tRowIdx, 17).value = col.TAXBILL_CD;
                    tRowIdx += 1;
                    tSumPoAmt += parseFloat(tFindObj.PO_AMT);
                    tSumDiscountAmt += parseFloat(tFindObj.DISCOUNT_AMT);
                    tSumDebitAmt += parseFloat(tFindObj.DEBIT_AMT);
                    tSumPayAmt += parseFloat(tAmt);
                    tSumVatAmt += parseFloat(col.TAX);
                    tSumTotAmt += parseFloat(col.TOT_AMOUNT);
                });
                tRowIdx += 2;
                sheet.getCell(tRowIdx, 5).value = parseFloat(tSumPoAmt);
                sheet.getCell(tRowIdx, 6).value = parseFloat(tSumDiscountAmt);
                sheet.getCell(tRowIdx, 7).value = parseFloat(tSumDebitAmt);
                sheet.getCell(tRowIdx, 9).value = parseFloat(tSumPayAmt);
                sheet.getCell(tRowIdx, 10).value = parseFloat(tSumVatAmt);
                sheet.getCell(tRowIdx, 11).value = parseFloat(tSumTotAmt);

                tRowIdx += 2;
                tIdx = 0;
                tSumPoAmt = 0;
                tSumDiscountAmt = 0;
                tSumDebitAmt = 0;
                tSumPayAmt = 0;
                tSumVatAmt = 0;
                tSumTotAmt = 0;
                tRet1.forEach((col, i) => {
                    var tmpRow = [];

                    var tFindObj = {};
                    args.data.forEach((col1, i1) => {
                        if (col.TAXBILL_CD === col1.TAXBILL_CD)
                            tFindObj = { ...col1 };
                    });

                    var tAmt = parseFloat(col.TOT_AMOUNT) - parseFloat(col.TAX);

                    sheet.insertRow(tRowIdx + 1, tmpRow, 'i');
                    sheet.getCell(tRowIdx, 1).value = i + 1;
                    sheet.getCell(tRowIdx, 2).value = col.VENDOR_CD;
                    sheet.getCell(tRowIdx, 3).value = col.VENDOR_NAME;
                    sheet.getCell(tRowIdx, 4).value = '';
                    sheet.getCell(tRowIdx, 5).value = parseFloat(
                        tFindObj.PO_AMT,
                    );
                    sheet.getCell(tRowIdx, 6).value = parseFloat(
                        tFindObj.DISCOUNT_AMT,
                    );
                    sheet.getCell(tRowIdx, 7).value = parseFloat(
                        tFindObj.DEBIT_AMT,
                    );
                    sheet.getCell(tRowIdx, 8).value = parseFloat(col.CURR_RATE);
                    sheet.getCell(tRowIdx, 9).value = parseFloat(tAmt);
                    sheet.getCell(tRowIdx, 10).value = parseFloat(col.TAX);
                    sheet.getCell(tRowIdx, 11).value = parseFloat(
                        col.TOT_AMOUNT,
                    );
                    sheet.getCell(tRowIdx, 12).value = parseFloat(
                        col.KRW_AMOUNT,
                    );
                    sheet.getCell(tRowIdx, 13).value = col.PUR_APP;
                    sheet.getCell(tRowIdx, 14).value = col.TT_FLAG;
                    sheet.getCell(tRowIdx, 15).value = col.PAY_DATE;
                    sheet.getCell(tRowIdx, 16).value = '';
                    sheet.getCell(tRowIdx, 17).value = col.TAXBILL_CD;
                    tRowIdx += 1;
                    tSumPoAmt += parseFloat(tFindObj.PO_AMT);
                    tSumDiscountAmt += parseFloat(tFindObj.DISCOUNT_AMT);
                    tSumDebitAmt += parseFloat(tFindObj.DEBIT_AMT);
                    tSumPayAmt += parseFloat(tAmt);
                    tSumVatAmt += parseFloat(col.TAX);
                    tSumTotAmt += parseFloat(col.TOT_AMOUNT);
                });
                tRowIdx += 2;
                sheet.getCell(tRowIdx, 5).value = parseFloat(tSumPoAmt);
                sheet.getCell(tRowIdx, 6).value = parseFloat(tSumDiscountAmt);
                sheet.getCell(tRowIdx, 7).value = parseFloat(tSumDebitAmt);
                sheet.getCell(tRowIdx, 9).value = parseFloat(tSumPayAmt);
                sheet.getCell(tRowIdx, 10).value = parseFloat(tSumVatAmt);
                sheet.getCell(tRowIdx, 11).value = parseFloat(tSumTotAmt);

                // List2 Excel
                tSheetName = 'list2';
                sheet = wb.getWorksheet(tSheetName);

                // list2 시트에 계좌 정보 컬럼 추가
                sheet.getCell(3, 25).value = 'Bank#';
                sheet.getCell(3, 26).value = 'Bank';
                sheet.getCell(3, 27).value = 'Account#';
                sheet.getCell(3, 28).value = 'Account';
                sheet.getColumn(25).width = 12;
                sheet.getColumn(26).width = 18;
                sheet.getColumn(27).width = 18;
                sheet.getColumn(28).width = 22;
                for (let tCol = 25; tCol <= 28; tCol++) {
                    sheet.getCell(3, tCol).alignment = {
                        horizontal: 'center',
                        vertical: 'middle',
                    };
                    sheet.getCell(3, tCol).border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' },
                    };
                    sheet.getCell(3, tCol).font = {
                        ...sheet.getCell(3, tCol).font,
                        name: '돋움',
                    };
                }

                let sql100 = `
                    select
                        a.*,
                        b.MATL_NAME,
                        b.COLOR,
                        b.SPEC,
                        c.BUYER_NAME,
                        d.MATL_PRICE,
                        e.VENDOR_NAME,
                        isnull(h.PAY_BANK, '') as PAY_BANK,
                        isnull(f.BANK_NAME, '-') as BANK_NAME,
                        isnull(f.ACCOUNT_NO, '-') as ACCOUNT_NO,
                        isnull(f.ACCOUNT_NAME, '-') as ACCOUNT_NAME
                    from
                        ksv_stock_in a
                        inner join kcd_matl_mst b on a.matl_cd = b.matl_cd
                        inner join kcd_matl_sale d on a.matl_cd = d.matl_cd
                        inner join kcd_vendor e on b.vendor_cd = e.vendor_cd
                        inner join kcd_buyer c on left(a.order_cd, 2) = c.buyer_cd
                        left join ksv_bill_mst h on h.BILL_CD = a.BILL_NO
                        left join kcd_bank f on f.BANK_CD = h.PAY_BANK
                    where
                        a.bill_no in (${billcdSql})
                        and d.matl_seq = (
                            select
                                max(matl_seq)
                            from
                                kcd_matl_sale
                            where
                                matl_cd = a.matl_cd
                        )
                    order by
                        a.po_cd,
                        a.matl_cd
                `;
                var tRet100 = await prisma.$queryRaw(Prisma.raw(sql100));

                tRowIdx = 4;
                tRet100.forEach((col, i) => {
                    var tmpRow = [];

                    sheet.insertRow(tRowIdx + 1, tmpRow, 'i');
                    sheet.getCell(tRowIdx, 1).value = col.PO_CD;
                    sheet.getCell(tRowIdx, 2).value = col.BUYER_NAME;
                    sheet.getCell(tRowIdx, 3).value = col.MATL_CD;
                    sheet.getCell(tRowIdx, 4).value = col.MATL_NAME;
                    sheet.getCell(tRowIdx, 5).value = col.COLOR;
                    sheet.getCell(tRowIdx, 6).value = col.SPEC;
                    sheet.getCell(tRowIdx, 7).value = parseFloat(col.TOT_QTY);
                    sheet.getCell(tRowIdx, 8).value = parseFloat(col.IN_QTY);
                    sheet.getCell(tRowIdx, 9).value = col.IN_CURR_CD;
                    sheet.getCell(tRowIdx, 10).value = parseFloat(col.IN_PRICE);
                    sheet.getCell(tRowIdx, 11).value = col.PAY_CURR_CD;
                    sheet.getCell(tRowIdx, 12).value = parseFloat(
                        col.PAY_PRICE,
                    );
                    sheet.getCell(tRowIdx, 13).value = parseFloat(
                        col.MATL_PRICE,
                    );
                    sheet.getCell(tRowIdx, 14).value = col.TT_FLAG;
                    sheet.getCell(tRowIdx, 15).value = '';
                    sheet.getCell(tRowIdx, 16).value = col.PUR_FACTORY;

                    var tPayAmt =
                        parseFloat(col.IN_QTY) * parseFloat(col.PAY_PRICE);
                    sheet.getCell(tRowIdx, 17).value = parseFloat(tPayAmt);

                    sheet.getCell(tRowIdx, 18).value = col.END_FLAG;
                    sheet.getCell(tRowIdx, 19).value = col.END_DATE;
                    sheet.getCell(tRowIdx, 20).value = col.PAY_DATE;
                    sheet.getCell(tRowIdx, 21).value = '';
                    sheet.getCell(tRowIdx, 22).value = '';
                    sheet.getCell(tRowIdx, 23).value = col.VENDOR_NAME;
                    sheet.getCell(tRowIdx, 24).value = col.PO_SEQ;
                    sheet.getCell(tRowIdx, 25).value = col.PAY_BANK || '';
                    sheet.getCell(tRowIdx, 26).value = col.BANK_NAME || '';
                    sheet.getCell(tRowIdx, 27).value = col.ACCOUNT_NO || '';
                    sheet.getCell(tRowIdx, 28).value =
                        col.ACCOUNT_NAME || '';

                    var tIdx2 = 0;
                    for (tIdx2 = 1; tIdx2 <= 28; tIdx2++) {
                        sheet.getCell(tRowIdx, tIdx2).alignment = {
                            horizontal: 'center',
                        };
                        sheet.getCell(tRowIdx, tIdx2).border = {
                            top: { style: 'thin' },
                            left: { style: 'thin' },
                            bottom: { style: 'thin' },
                            right: { style: 'thin' },
                        };
                    }
                    sheet.getCell(tRowIdx, 26).alignment = {
                        horizontal: 'left',
                    };
                    sheet.getCell(tRowIdx, 28).alignment = {
                        horizontal: 'left',
                    };
                    for (let tCol = 25; tCol <= 28; tCol++) {
                        sheet.getCell(tRowIdx, tCol).font = {
                            ...sheet.getCell(tRowIdx, tCol).font,
                            name: '돋움',
                        };
                    }

                    tRowIdx += 1;
                });

                if (tRet100.length > 0) sheet.spliceRows(tRowIdx+1, 1);

                return await upload(`${tWExcelFile}.xlsx`, wb);
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.id = 1;
                tObj.CODE = `ERROR:Excel Print:${e.message}`;
                console.log(tObj.CODE);
                tRetArray.push(tObj);
                return tRetArray;
            }
        },
        mgrQueryS0423_4: async (_, args) => {
            var tSQL = '';

            let sqlStr = `
                SELECT
                    A.CRDB_CD,
                    A.CRDB_SEQ,
                    A.CRDB_DATE,
                    B.COM_NAME,
                    A.CRDB_AMT,
                    (A.CRDB_AMT - ISNULL(SUM(C.CRDB_AMT), 0)) AS BALANCE,
                    A.CURR_CD,
                    (
                        (A.CRDB_AMT - ISNULL(SUM(C.CRDB_AMT), 0)) * F.USD_RATE
                    ) AS USD_BAL,
                    A.TITLE,
                    A.REG_USER,
                    A.END_DATE,
                    A.REMARK,
                    D.CD_NAME AS STATUS,
                    A.PO_CD,
                    A.ORDER_CD,
                    A.BANK_CD,
                    B.COM_CD,
                    A.STATUS_CD,
                    A.BUYER_CD,
                    E.BUYER_NAME,
                    A.PAYMENT_PLAN
                FROM
                    KSV_CRDB_MST A
                    LEFT JOIN KSV_CRDB_MEM C ON C.CRDB_CD = A.CRDB_CD
                    LEFT JOIN KCD_BUYER E ON E.BUYER_CD = A.BUYER_CD,
                    KVW_COMPANY B,
                    KCD_CODE D,
                    KCD_CURRENCY F
                WHERE
                    A.CRDB_TYPE = 'D'
                    AND A.CRDB_SEQ = (
                        SELECT
                            MAX(CRDB_SEQ)
                        FROM
                            KSV_CRDB_MST
                        WHERE
                            A.CRDB_CD = CRDB_CD
                    )
                    AND A.CRDB_CD LIKE '%${args.data.CRDB_CD}%'
                    AND A.MESSER_CD LIKE '%${args.data.VENDOR_CD}%'
                    AND A.CURR_CD LIKE '%${args.data.CURR_CD}%'
                    -- AND A.STATUS_CD IN( '0','2','1','4','5') 
                    -- AND A.STATUS_CD IN ('0', '2', '4', '5')
                    AND A.STATUS_CD IN ('0', '2', '5')
                    AND B.COM_CD = A.MESSER_CD
                    AND D.CD_GROUP = 'CREDIT_STATUS'
                    AND D.CD_CODE = A.STATUS_CD
                    AND F.START_DATE = (
                        SELECT
                            MAX(START_DATE)
                        FROM
                            KCD_CURRENCY
                    )
                    AND F.CURR_CD = A.CURR_CD
                    -- AND (A.END_DATE is null or A.END_DATE = '')
                GROUP BY
                    A.CRDB_CD,
                    A.CRDB_SEQ,
                    A.CRDB_DATE,
                    B.COM_NAME,
                    A.CRDB_AMT,
                    A.CURR_CD,
                    A.TITLE,
                    A.REG_USER,
                    A.END_DATE,
                    A.REMARK,
                    D.CD_NAME,
                    A.PO_CD,
                    A.ORDER_CD,
                    A.BANK_CD,
                    B.COM_CD,
                    A.STATUS_CD,
                    A.BUYER_CD,
                    E.BUYER_NAME,
                    F.USD_RATE,
                    A.PAYMENT_PLAN
                 having 
                     (A.CRDB_AMT - ISNULL(SUM(C.CRDB_AMT), 0)) > 0
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {};
            var tRetArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tOne = { ...tRet[tIdx] };
                let sqlStr0 = `
                    select * from ksv_dc_amount 
                    where  crdb_cd = '${tOne.CRDB_CD}'
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr0));
                if (tRet0.length <= 0) tRetArray.push(tOne);
                else {
                    // 향후 Check
                    tRetArray.push(tOne);
                }
            }
            return tRetArray;
        },
        mgrQueryS0423_4_DEBIT_LIST: async (_, args) => {
            var tSQL = '';

            let sqlBill = `
                select crdb_cd 
                  from ksv_dc_amount
                where bill_cd like '%${args.data.BILL_CD}%'
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));


            let sqlStr = `
                SELECT
                    A.CRDB_CD,
                    A.CRDB_SEQ,
                    A.CRDB_DATE,
                    B.COM_NAME,
                    A.CRDB_AMT,
                    (A.CRDB_AMT - ISNULL(SUM(C.CRDB_AMT), 0)) AS BALANCE,
                    A.CURR_CD,
                    (
                        (A.CRDB_AMT - ISNULL(SUM(C.CRDB_AMT), 0)) * F.USD_RATE
                    ) AS USD_BAL,
                    A.TITLE,
                    A.REG_USER,
                    A.END_DATE,
                    A.REMARK,
                    D.CD_NAME AS STATUS,
                    A.PO_CD,
                    A.ORDER_CD,
                    A.BANK_CD,
                    B.COM_CD,
                    A.STATUS_CD,
                    A.BUYER_CD,
                    E.BUYER_NAME,
                    A.PAYMENT_PLAN
                FROM
                    KSV_CRDB_MST A
                    LEFT JOIN KSV_CRDB_MEM C ON C.CRDB_CD = A.CRDB_CD
                    LEFT JOIN KCD_BUYER E ON E.BUYER_CD = A.BUYER_CD,
                    KVW_COMPANY B,
                    KCD_CODE D,
                    KCD_CURRENCY F
                WHERE
                    A.CRDB_TYPE = 'D'
                    AND A.CRDB_SEQ = (
                        SELECT
                            MAX(CRDB_SEQ)
                        FROM
                            KSV_CRDB_MST
                        WHERE
                            A.CRDB_CD = CRDB_CD
                    )
                    AND A.CRDB_CD LIKE '%${args.data.CRDB_CD}%'
                    AND A.MESSER_CD LIKE '%${args.data.VENDOR_CD}%'
                    AND A.CURR_CD LIKE '%${args.data.CURR_CD}%'
                    -- AND A.STATUS_CD IN( '0','2','1','4','5') 
                    -- AND A.STATUS_CD IN ('0', '2', '4', '5')
                    AND A.STATUS_CD IN ('0', '2', '5')
                    AND B.COM_CD = A.MESSER_CD
                    AND D.CD_GROUP = 'CREDIT_STATUS'
                    AND D.CD_CODE = A.STATUS_CD
                    AND F.START_DATE = (
                        SELECT
                            MAX(START_DATE)
                        FROM
                            KCD_CURRENCY
                    )
                    AND F.CURR_CD = A.CURR_CD
                    -- AND (A.END_DATE is null or A.END_DATE = '')
                GROUP BY
                    A.CRDB_CD,
                    A.CRDB_SEQ,
                    A.CRDB_DATE,
                    B.COM_NAME,
                    A.CRDB_AMT,
                    A.CURR_CD,
                    A.TITLE,
                    A.REG_USER,
                    A.END_DATE,
                    A.REMARK,
                    D.CD_NAME,
                    A.PO_CD,
                    A.ORDER_CD,
                    A.BANK_CD,
                    B.COM_CD,
                    A.STATUS_CD,
                    A.BUYER_CD,
                    E.BUYER_NAME,
                    F.USD_RATE,
                    A.PAYMENT_PLAN
                 having 
                     (A.CRDB_AMT - ISNULL(SUM(C.CRDB_AMT), 0)) > 0
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {};
            var tRetArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tOne = { ...tRet[tIdx] };
                let sqlStr0 = `
                    select * from ksv_dc_amount 
                    where  crdb_cd = '${tOne.CRDB_CD}'
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr0));
                if (tRet0.length <= 0) tRetArray.push(tOne);
                else {
                    // 향후 Check
                    tRetArray.push(tOne);
                }
            }
            return tRetArray;
        },
        mgrQueryS0423_4_1: async (_, args) => {
            var tSQL = '';

            let sqlStr = `
                SELECT
                    END_DATE,
                    CRDB_AMT
                FROM
                    KSV_CRDB_MEM
                WHERE
                    CRDB_CD = '${args.data.CRDB_CD}'
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
        mgrQueryS0423_4_REPORT_bak1: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);
            var tInput = { ...args };

            var tIdx = 0;
            var tBillCds = '(';
            for (tIdx = 0; tIdx < args.data.length; tIdx++) {
                var tOne = { ...args.data[tIdx] };
                if (tIdx === 0) tBillCds += `'${tOne.BILL_CD}'`;
                else tBillCds += `,'${tOne.BILL_CD}'`;
            }
            tBillCds += ')';

            let sql0 = `
                select
                    a.vendor_cd,
                    b.vendor_name,
                    a.pay_amt,
                    a.discount_amt,
                    a.debit_amt,
                    c.usd_rate,
                    a.vat_amt,
                    (a.pay_amt + a.vat_amt) as tot_amt,
                    ((a.pay_amt + a.vat_amt) * c.usd_rate) as krw_amt,
                    d.pur_app,
                    d.tt_flag,
                    a.pay_date,
                    '' as remark,
                    a.taxbill_cd
                from
                    ksv_bill_mst a,
                    kcd_vendor b,
                    kcd_currency c,
                    kcd_gw_taxbill_kr d
                where
                    a.bill_cd in ${tBillCds}
                    and a.vendor_cd = b.vendor_cd
                    and a.curr_cd = 'KRW'
                    and c.curr_cd = a.curr_cd
                    and c.start_date = a.invoice_date
                    and a.bill_cd = d.bill_cd
            `;
            var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));

            let sql1 = `
                select
                    a.vendor_cd,
                    b.vendor_name,
                    a.pay_amt,
                    a.discount_amt,
                    a.debit_amt,
                    c.usd_rate,
                    a.vat_amt,
                    (a.pay_amt + a.vat_amt) as tot_amt,
                    ((a.pay_amt + a.vat_amt) * c.usd_rate) as krw_amt,
                    d.pur_app,
                    d.tt_flag,
                    a.pay_date,
                    '' as remark,
                    a.taxbill_cd
                from
                    ksv_bill_mst a,
                    kcd_vendor b,
                    kcd_currency c,
                    kcd_gw_taxbill_kr d
                where
                    a.bill_cd in ${tBillCds}
                    and a.vendor_cd = b.vendor_cd
                    and a.curr_cd <> 'KRW'
                    and c.curr_cd = a.curr_cd
                    and c.start_date = a.invoice_date
                    and a.bill_cd = d.bill_cd
            `;
            var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));

            var tWExcelFile = `Bill_Manager_다운로드_-${tRetDate}`;
            try {
                // Excel Read
                var tPath0 = '';
                var tCols0 = __dirname.split('/');
                var tFlag0 = 0;
                tCols0.forEach((col, i) => {
                    if (col !== '') {
                        if (col === 'src') {
                            tPath0 += '/upload/excel_template';
                            tFlag0 = 1;
                        }
                        if (tFlag0 === 0) {
                            tPath0 += '/' + col;
                        }
                    }
                });

                var tTemplateName = 'Bill_manager_download';
                var tTemplateExcel = `${tPath0}/${tTemplateName}.xlsx`;

                const wb = new Excel.Workbook();
                await wb.xlsx.readFile(tTemplateExcel);

                var tSheetName = 'list';

                var sheet = wb.getWorksheet(tSheetName);
                console.log(`STEP-1:0`);
                sheet.getCell(1, 1).value =
                    `${tRetDate.substring(0, 4)}년 ${tRetDate.substring(4, 6)}월 자재마감내역`;
                console.log(`STEP-1:0-1`);

                var tIdx = 0;
                var tRowIdx = 4;
                var tSumPayAmt = 0;
                var tSumDiscountAmt = 0;
                var tSumDebitAmt = 0;
                var tSumVatAmt = 0;
                var tSumTotAmt = 0;
                tRet0.forEach((col, i) => {
                    var tmpRow = [];
                    sheet.insertRow(tRowIdx + 1, tmpRow, 'i');
                    sheet.getCell(tRowIdx, 1).value = i + 1;
                    sheet.getCell(tRowIdx, 2).value = col.vendor_cd;
                    sheet.getCell(tRowIdx, 3).value = col.vendor_name;
                    sheet.getCell(tRowIdx, 4).value = '';
                    sheet.getCell(tRowIdx, 5).value = parseFloat(col.pay_amt);
                    sheet.getCell(tRowIdx, 6).value = parseFloat(
                        col.discount_amt,
                    );
                    sheet.getCell(tRowIdx, 7).value = parseFloat(col.debit_amt);
                    sheet.getCell(tRowIdx, 8).value = parseFloat(col.usd_rate);
                    sheet.getCell(tRowIdx, 9).value = parseFloat(col.pay_amt);
                    sheet.getCell(tRowIdx, 10).value = parseFloat(col.vat_amt);
                    sheet.getCell(tRowIdx, 11).value = parseFloat(col.tot_amt);
                    sheet.getCell(tRowIdx, 12).value = parseFloat(col.krw_amt);
                    sheet.getCell(tRowIdx, 13).value = col.pur_app;
                    sheet.getCell(tRowIdx, 14).value = col.tt_flag;
                    sheet.getCell(tRowIdx, 15).value = col.pay_date;
                    sheet.getCell(tRowIdx, 16).value = col.remark;
                    sheet.getCell(tRowIdx, 17).value = col.taxbill_cd;
                    tRowIdx += 1;
                    tSumPayAmt += parseFloat(col.pay_amt);
                    tSumDiscountAmt += parseFloat(col.discount_amt);
                    tSumDebitAmt += parseFloat(col.debit_amt);
                    tSumVatAmt += parseFloat(col.vat_amt);
                    tSumTotAmt += parseFloat(col.tot_amt);
                });
                tRowIdx += 2;
                // sheet.getCell(tRowIdx, 17) = col.taxbill_cd;

                tRowIdx += 1;

                tIdx = 0;
                tSumPayAmt = 0;
                tSumDiscountAmt = 0;
                tSumDebitAmt = 0;
                tSumVatAmt = 0;
                tSumTotAmt = 0;
                tRet1.forEach((col, i) => {
                    var tmpRow = [];
                    sheet.getCell(tRowIdx, 1).value = i + 1;
                    sheet.getCell(tRowIdx, 2).value = col.vendor_cd;
                    sheet.getCell(tRowIdx, 3).value = col.vendor_name;
                    sheet.getCell(tRowIdx, 4).value = '';
                    sheet.getCell(tRowIdx, 5).value = parseFloat(col.pay_amt);
                    sheet.getCell(tRowIdx, 6).value = parseFloat(
                        col.discount_amt,
                    );
                    sheet.getCell(tRowIdx, 7).value = parseFloat(col.debit_amt);
                    sheet.getCell(tRowIdx, 8).value = parseFloat(col.usd_rate);
                    sheet.getCell(tRowIdx, 9).value = parseFloat(col.pay_amt);
                    sheet.getCell(tRowIdx, 10).value = parseFloat(col.vat_amt);
                    sheet.getCell(tRowIdx, 11).value = parseFloat(col.tot_amt);
                    sheet.getCell(tRowIdx, 12).value = parseFloat(col.krw_amt);
                    sheet.getCell(tRowIdx, 13).value = col.pur_app;
                    sheet.getCell(tRowIdx, 14).value = col.tt_flag;
                    sheet.getCell(tRowIdx, 15).value = col.pay_date;
                    sheet.getCell(tRowIdx, 16).value = col.remark;
                    sheet.getCell(tRowIdx, 17).value = col.taxbill_cd;
                    tRowIdx += 1;
                    tSumPayAmt += parseFloat(col.pay_amt);
                    tSumDiscountAmt += parseFloat(col.discount_amt);
                    tSumDebitAmt += parseFloat(col.debit_amt);
                    tSumVatAmt += parseFloat(col.vat_amt);
                    tSumTotAmt += parseFloat(col.tot_amt);
                    sheet.insertRow(tRowIdx, tmpRow, 'i');
                });
                tRowIdx += 2;
                // sheet.getCell(tRowIdx, 17) = col.taxbill_cd;

                return await upload(`${tWExcelFile}.xlsx`, wb);
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.id = 1;
                tObj.CODE = `ERROR:Excel Print:${e.message}`;
                console.log(tObj.CODE);
                tRetArray.push(tObj);
                return tRetArray;
            }
        },
    },
};

export default moduleQuery_S0423_4;
