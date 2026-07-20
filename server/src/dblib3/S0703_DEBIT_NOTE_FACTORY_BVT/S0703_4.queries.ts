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
const moduleQuery_S0703_4 = {
    Query: {
        mgrQueryS0703_4_REPORT: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);
            var tInput = { ...args };

            var tIdx = 0;
            for (tIdx = 0; tIdx < args.data.length; tIdx++) {
                var tOne = { ...args.data[tIdx] };

                let sql0 = `
                    SELECT
                        a.crdb_cd,
                        a.crdb_date,
                        a.messer_cd,
                        b.com_name,
                        b.com_addr1,
                        b.com_addr2,
                        a.crdb_amt,
                        a.curr_cd,
                        a.title,
                        a.remark,
                        a.remark_s,
                        a.po_cd
                    FROM
                        ksv_crdb_mst a,
                        kvw_company b
                    where
                        a.crdb_seq = (
                            select
                                max(crdb_seq)
                            from
                                ksv_crdb_mst
                            where
                                crdb_cd = '${tOne.CRDB_CD}'
                        )
                        and a.crdb_cd = '${tOne.CRDB_CD}'
                        and b.com_cd = a.messer_cd
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                var tCrdbObj = {};
                if (tRet0.length > 0) tCrdbObj = { ...tRet0[0] };

                let sql1 = `
                    select
                        title,
                        crdb_cd
                    from
                        ksv_crdb_mst
                    where
                        title like '%TT거래%'
                        and crdb_cd = '${tOne.CRDB_CD}'
                `;
                var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                var tTitle = '';
                if (tRet1.length > 0) tTitle = tRet1[0].title;

                let sql2 = `
                    select
                        a.user_name,
                        b.cd_name as part_name
                    from
                        kcd_user a,
                        kcd_code b
                    where
                        user_id = '${tUserInfo.USER_ID}'
                        and b.cd_group = 'part'
                        and b.cd_code = a.part
                `;
                var tRet2 = await prisma.$queryRaw(Prisma.raw(sql2));
                var tUser = {};
                if (tRet2.length > 0) tUser = { ...tRet2[0] };

                var tWExcelFile = `DEBIT(BVT)-${tOne.CRDB_CD}-${tRetDate}`;
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

                    var tTemplateName = '경영_CREDIT';
                    if (tTitle === '') tTemplateName = '경영_DC';
                    var tTemplateExcel = `${tPath0}/${tTemplateName}.xlsx`;

                    const wb = new Excel.Workbook();
                    await wb.xlsx.readFile(tTemplateExcel);

                    var tSheetName = '';
                    if (tTitle !== '') tSheetName = '자금지출품의서';
                    else tSheetName = 'Note';

                    console.log(
                        `Credit Note : ${tTemplateExcel} : ${tSheetName}`,
                    );

                    var sheet = wb.getWorksheet(tSheetName);
                    if (tTitle !== '') {
                        sheet.getCell(4, 3).value = tUser.part_name;
                        sheet.getCell(4, 6).value = tUser.user_name;
                        sheet.getCell(6, 3).value = tCrdbObj.com_name;
                    }

                    sheet.getCell(2, 1).value = 'DEBIT NOTE';
                    sheet.getCell(8, 3).value = tCrdbObj.crdb_cd;
                    sheet.getCell(8, 9).value = tCrdbObj.crdb_date;
                    sheet.getCell(10, 3).value = tCrdbObj.com_name;
                    sheet.getCell(11, 3).value = tCrdbObj.com_addr1;
                    sheet.getCell(12, 3).value = tCrdbObj.com_addr2;
                    sheet.getCell(15, 2).value =
                        `  Please be informed that you are debited in amount ${tCrdbObj.crdb_amt} ${tCrdbObj.curr_cd}, - for the below ${tCrdbObj.title}`;
                    sheet.getCell(18, 2).value = tCrdbObj.remark;

                    var tPoIndex = tTitle.indexOf('PO');
                    var tPoNo = '';
                    if (tPoIndex >= 0) {
                        tPoNo = tTitle.substring(tPoIndex, tPoIndex + 9);
                    }
                    if (tPoNo === '') tPoNo = tCrdbObj.po_cd;

                    if (tTitle !== '') {
                        let sql3 = `
                            select
                                po_cd,
                                sum(po_amt) as amt
                            from
                                ksv_invoice_matlmem
                            where
                                po_cd = '${tPoNo}'
                            group by
                                po_cd
                        `;
                        var tRet3 = await prisma.$queryRaw(Prisma.raw(sql3));

                        let sql4 = `
                            select
                                a.po_cd,
                                a.order_cd,
                                c.style_name,
                                d.invoice_no,
                                d.ship_date,
                                '',
                                b.fc_price,
                                e.buyer_name,
                                b.due_date
                            from
                                ksv_po_mem a,
                                ksv_order_mst b,
                                kcd_style c,
                                ksv_order_ship d,
                                kcd_buyer e
                            where
                                a.po_cd = '${tPoNo}'
                                and a.order_cd = b.order_cd
                                and b.style_cd = c.style_cd
                                and a.order_cd = d.order_cd
                                and left(a.order_cd, 2) = e.buyer_cd
                            group by
                                a.order_cd,
                                c.style_name,
                                a.po_cd,
                                d.invoice_no,
                                b.fc_price,
                                d.ship_date,
                                e.buyer_name,
                                b.due_date
                            order by
                                a.order_cd,
                                d.invoice_no
                        `;
                        var tRet4 = await prisma.$queryRaw(Prisma.raw(sql4));
                        var tIdx1 = 0;
                        var tBuyerName = '';
                        var tDueDate = '';
                        for (tIdx1 = 0; tIdx1 < tRet4.length; tIdx1++) {
                            /*
                  if (tIdx99 > 0) { 
                      var tmpRow = [];
                      sheet.insertRow(tRowIdx, tmpRow, 'i');
                  }
*/
                            var tOne1 = { ...tRet4[tIdx1] };
                            sheet = wb.getWorksheet('CREDIT NOTE');
                            sheet.getCell(20 + tIdx1, 2).value = tOne1.po_cd;
                            sheet.getCell(20 + tIdx1, 3).value = tOne1.order_cd;
                            sheet.getCell(20 + tIdx1, 4).value =
                                tOne1.style_name;
                            sheet.getCell(20 + tIdx1, 5).value =
                                tOne1.invoice_no;
                            sheet.getCell(20 + tIdx1, 6).value =
                                tOne1.ship_date;

                            let sql5 = `
                                SELECT
                                    SUM(SHIP_CNT) AS Expr1,
                                    INVOICE_NO,
                                    SHIP_DATE
                                FROM
                                    KSV_ORDER_SHIP
                                WHERE
                                    (ORDER_CD = '${tOne1.order_cd}')
                                    AND (INVOICE_NO = '${tOne1.invoice_no}')
                                GROUP BY
                                    INVOICE_NO,
                                    SHIP_DATE
                            `;
                            var tRet5 = await prisma.$queryRaw(
                                Prisma.raw(sql5),
                            );
                            var tShipCnt = 0;
                            if (tRet5.length > 0) {
                                sheet.getCell(20 + tIdx1, 7).value =
                                    tRet5[0].Expr1;
                                tShipCnt = tRet5[0].Expr1;
                            }
                            sheet.getCell(20 + tIdx1, 9).value = tOne1.fc_price;

                            sheet = wb.getWorksheet('자금지출품의서');
                            sheet.getCell(21 + tIdx1, 1).value = tOne1.po_cd;
                            sheet.getCell(21 + tIdx1, 2).value = tOne1.order_cd;
                            sheet.getCell(21 + tIdx1, 3).value =
                                tOne1.style_name;
                            sheet.getCell(21 + tIdx1, 7).value =
                                tOne1.invoice_no;
                            sheet.getCell(21 + tIdx1, 8).value =
                                tOne1.ship_date;
                            sheet.getCell(21 + tIdx1, 9).value = tShipCnt;
                            sheet.getCell(21 + tIdx1, 12).value =
                                tOne1.fc_price;

                            tBuyerName = tOne1.buyer_name;
                            tDueDate = tOne1.due_date;
                        }

                        sheet = wb.getWorksheet('자금지출품의서');
                        sheet.getCell(7, 3).value = tBuyerName;
                        sheet.getCell(8, 3).value = tPoNo;
                        sheet.getCell(11, 2).value = tCrdbObj.curr_cd;
                        sheet.getCell(11, 5).value = ''; // End Date Y-m-d
                        sheet.getCell(11, 12).value = tDueDate; // End Date Y-m-d

                        if (tCrdbObj.messer_cd.length === 2) {
                            // Buyer
                            let sql6 = `
                                select
                                    a.buyer_name,
                                    a.bank_cd,
                                    b.bank_name,
                                    b.addr1,
                                    b.account_no,
                                    b.account_name,
                                    b.sftcode
                                from
                                    kcd_buyer a,
                                    kcd_bank b
                                where
                                    a.buyer_cd = '${tCrdbObj.messer_cd}'
                                    and a.bank_cd = b.bank_cd
                            `;
                            var tRet6 = await prisma.$queryRaw(
                                Prisma.raw(sql6),
                            );
                            if (tRet6.length > 0) {
                                sheet.getCell(14, 4).value = tRet6[0].bank_name;
                                sheet.getCell(15, 4).value = tRet6[0].addr1;
                                sheet.getCell(16, 4).value =
                                    tRet6[0].account_no;
                                sheet.getCell(17, 4).value =
                                    tRet6[0].account_name;
                                sheet.getCell(18, 4).value = tRet6[0].sftcode;
                            }
                        } else if (tCrdbObj.messer_cd === 'FC') {
                            let sql6 = `
                                select
                                    a.factory_name,
                                    a.bank_cd,
                                    b.bank_name,
                                    b.addr1,
                                    b.account_no,
                                    b.account_name,
                                    b.sftcode
                                from
                                    kcd_factory a,
                                    kcd_bank b
                                where
                                    a.factory_cd = '${tCrdbObj.messer_cd}'
                                    and a.bank_cd = b.bank_cd
                            `;
                            var tRet6 = await prisma.$queryRaw(
                                Prisma.raw(sql6),
                            );
                            if (tRet6.length > 0) {
                                sheet.getCell(14, 4).value = tRet6[0].bank_name;
                                sheet.getCell(15, 4).value = tRet6[0].addr1;
                                sheet.getCell(16, 4).value =
                                    tRet6[0].account_no;
                                sheet.getCell(17, 4).value =
                                    tRet6[0].account_name;
                                sheet.getCell(18, 4).value = tRet6[0].sftcode;
                            }
                        } else {
                            let sql6 = `
                                select
                                    a.vendor_name,
                                    a.bank_cd,
                                    b.bank_name,
                                    b.addr1,
                                    b.account_no,
                                    b.account_name,
                                    b.sftcode
                                from
                                    kcd_vendor a,
                                    kcd_bank b
                                where
                                    a.vendor_cd = '${tCrdbObj.messer_cd}'
                                    and a.bank_cd = b.bank_cd
                            `;
                            var tRet6 = await prisma.$queryRaw(
                                Prisma.raw(sql6),
                            );
                            if (tRet6.length > 0) {
                                sheet.getCell(14, 4).value = tRet6[0].bank_name;
                                sheet.getCell(15, 4).value = tRet6[0].addr1;
                                sheet.getCell(16, 4).value =
                                    tRet6[0].account_no;
                                sheet.getCell(17, 4).value =
                                    tRet6[0].account_name;
                                sheet.getCell(18, 4).value = tRet6[0].sftcode;
                            }
                        }
                    } else {
                        if (tCrdbObj.messer_cd.length === 2) {
                            // Buyer
                            let sql6 = `
                                select
                                    a.buyer_name,
                                    a.bank_cd,
                                    b.bank_name,
                                    b.addr1,
                                    b.account_no,
                                    b.account_name,
                                    b.sftcode
                                from
                                    kcd_buyer a,
                                    kcd_bank b
                                where
                                    a.buyer_cd = '${tCrdbObj.messer_cd}'
                                    and a.bank_cd = b.bank_cd
                            `;
                            var tRet6 = await prisma.$queryRaw(
                                Prisma.raw(sql6),
                            );
                            if (tRet6.length > 0) {
                                sheet.getCell(18, 4).value = tRet6[0].bank_name;
                                sheet.getCell(19, 4).value = tRet6[0].addr1;
                                sheet.getCell(20, 4).value =
                                    tRet6[0].account_no;
                                sheet.getCell(21, 4).value =
                                    tRet6[0].account_name;
                                sheet.getCell(22, 4).value = tRet6[0].sftcode;
                            }
                        } else if (tCrdbObj.messer_cd === 'FC') {
                            let sql6 = `
                                select
                                    a.factory_name,
                                    a.bank_cd,
                                    b.bank_name,
                                    b.addr1,
                                    b.account_no,
                                    b.account_name,
                                    b.sftcode
                                from
                                    kcd_factory a,
                                    kcd_bank b
                                where
                                    a.factory_cd = '${tCrdbObj.messer_cd}'
                                    and a.bank_cd = b.bank_cd
                            `;
                            var tRet6 = await prisma.$queryRaw(
                                Prisma.raw(sql6),
                            );
                            if (tRet6.length > 0) {
                                sheet.getCell(18, 4).value = tRet6[0].bank_name;
                                sheet.getCell(19, 4).value = tRet6[0].addr1;
                                sheet.getCell(20, 4).value =
                                    tRet6[0].account_no;
                                sheet.getCell(21, 4).value =
                                    tRet6[0].account_name;
                                sheet.getCell(22, 4).value = tRet6[0].sftcode;
                            }
                        } else {
                            let sql6 = `
                                select
                                    c.vendor_name,
                                    a.bank_cd,
                                    b.bank_name,
                                    b.addr1,
                                    b.account_no,
                                    b.account_name,
                                    b.sftcode
                                from
                                    kcd_vendor_bank a,
                                    kcd_bank b,
                                    kcd_vendor c
                                where
                                    a.vendor_cd = '${tCrdbObj.messer_cd}'
                                    and a.bank_cd = b.bank_cd
                                    and a.vendor_cd = c.vendor_cd
                            `;
                            var tRet6 = await prisma.$queryRaw(
                                Prisma.raw(sql6),
                            );
                            if (tRet6.length > 0) {
                                sheet.getCell(18, 4).value = tRet6[0].bank_name;
                                sheet.getCell(19, 4).value = tRet6[0].addr1;
                                sheet.getCell(20, 4).value =
                                    tRet6[0].account_no;
                                sheet.getCell(21, 4).value =
                                    tRet6[0].account_name;
                                sheet.getCell(22, 4).value = tRet6[0].sftcode;
                            }
                        }
                    }

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
            }
        },

        mgrQueryS0703_4: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }
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
                    AND A.CRDB_CD LIKE '${args.data.CRDB_CD}%'
                    AND A.MESSER_CD LIKE '${args.data.VENDOR_CD}%'
                    AND A.STATUS_CD IN ('0', '2', '1', '4', '5')
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
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                CRDB_CD: '',
                CRDB_SEQ: 0,
                CRDB_DATE: '',
                COM_NAME: '',
                CRDB_AMT: 0,
                BALANCE: 0,
                CURR_CD: '',
                USD_BAL: 0,
                TITLE: '',
                REG_USER: '',
                END_DATE: '',
                REMARK: '',
                STATUS: '',
                PO_CD: '',
                ORDER_CD: '',
                BANK_CD: '',
                COM_CD: '',
                STATUS_CD: '',
                BUYER_CD: '',
                BUYER_NAME: '',
                PAYMENT_PLAN: '',
                ETC99: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S0703_4;
