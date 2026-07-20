import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
const Excel = require('exceljs');
const fs = require('fs');
const {
    generateUploadURL,
    deleteUploadObject,
    upload,
} = require('../../../routes/s3');

const moment = require('moment');

// export default로 Query 내용 내보내기
const moduleQuery_S0705_3 = {
    Query: {
        mgrQuery_S0705_EXCEL_PRINT: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tSQL0 = '';
            let sqlStr0 = `
                select
                    *
                from
                    kcd_factory
                where
                    factory_cd = '${args.data.FACTORY_CD}'
            `;
            var tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr0));

            var tSQL = '';
            let sqlStr = `
                select
                    a.user_name,
                    b.cd_name as part_name
                from
                    kcd_user a,
                    kcd_code b
                where
                    a.user_id = '${tUserInfo.USER_ID}'
                    and b.cd_group = 'PART'
                    and b.cd_code = a.part
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            var tSQL1 = '';
            let sqlStr1 = `
                select
                    left(a.order_cd, 2) as buyer_cd,
                    a.invoice_no,
                    a.order_cd,
                    e.style_name,
                    c.cd_name as ship_ptype_n,
                    a.ship_date,
                    sum(a.ship_cnt) as ship_cnt,
                    a.fc_bill_price,
                    (sum(a.ship_cnt) * a.fc_bill_price) as bill_amt
                from
                    ksv_order_ship a,
                    ksv_order_mst b,
                    kcd_code c,
                    kcd_style e
                where
                    a.fc_bill_date = '${args.data.BILL_DATE}'
                    and a.fc_bill_flag = '1'
                    and b.order_cd = a.order_cd
                    and b.factory_cd like '${args.data.FACTORY_CD}%'
                    and c.cd_group = 'SHIP_PTYPE'
                    and c.cd_code = a.ship_ptype
                    and e.style_cd = b.style_cd
                group by
                    left(a.order_cd, 2),
                    a.invoice_no,
                    a.order_cd,
                    e.style_name,
                    c.cd_name,
                    a.ship_date,
                    a.fc_bill_price
                order by
                    a.invoice_no,
                    a.ship_date,
                    a.order_cd
            `;
            var tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));

            try {
                var tSQL = '';

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

                var tTemplateExcel = `${tPath0}/Cmpt_Bill_List1.xlsx`;

                const wb = new Excel.Workbook();
                await wb.xlsx.readFile(tTemplateExcel);

                var tSheetName = `자금 지출`;
                const sheet = wb.getWorksheet(tSheetName);

                sheet.getCell(3, 6).value = moment(args.data.BILL_DATE).format('YYYY-MM-DD');
                sheet.getCell(3, 5).value = tRet[0].part_name;
                sheet.getCell(3, 8).value = tRet[0].user_name;
                sheet.getCell(3, 8).alignment = { vertical: 'middle', horizontal: 'center' };
                sheet.getCell(5, 4).value = tRet0[0].FACTORY_NAME;

                var tRowIdx = 11;
                var dwTotal = 0;
                tRet1.forEach((col, i) => {
                    sheet.getCell(tRowIdx, 1).value = col.buyer_cd;
                    sheet.getCell(tRowIdx, 2).value = col.invoice_no;
                    sheet.getCell(tRowIdx, 3).value = col.order_cd;
                    sheet.getCell(tRowIdx, 4).value = col.style_name;
                    sheet.getCell(tRowIdx, 5).value = col.ship_ptype_n;
                    sheet.getCell(tRowIdx, 6).value = moment(col.ship_date).format('YYYY-MM-DD');
                    sheet.getCell(tRowIdx, 7).value = col.ship_cnt;
                    sheet.getCell(tRowIdx, 8).value = col.fc_bill_price;
                    sheet.getCell(tRowIdx, 9).value = col.bill_amt;

                    dwTotal += parseFloat(col.bill_amt);
                    tRowIdx += 1;
                });
                sheet.getCell(7, 4).value = dwTotal;

                for (let rowIdx = 2; rowIdx <= sheet.rowCount; rowIdx++) {
                    const row = sheet.getRow(rowIdx);

                    row.eachCell({ includeEmpty: true }, (cell) => {
                        cell.font = {
                            ...cell.font,
                            name: '돋움체',
                            size: 9,
                        };
                    });
                }

                const tLastContentRow = tRowIdx - 1;
                for (let rowIdx = 11; rowIdx <= tLastContentRow; rowIdx++) {
                    for (let colIdx = 1; colIdx <= 9; colIdx++) {
                        sheet.getCell(rowIdx, colIdx).border = {
                            top: { style: 'thin' },
                            left: { style: 'thin' },
                            bottom: { style: 'thin' },
                            right: { style: 'thin' },
                        };
                    }
                }

                // Excel Write
                var tPath = '';
                var tCols = __dirname.split('/');
                var tFlag = 0;
                tCols.forEach((col, i) => {
                    if (col === 'src') {
                        tPath += '/upload/excel';
                        tFlag = 1;
                    }
                    if (tFlag === 0) {
                        tPath += '/' + col;
                    }
                });

                var tWExcelFile = `Cmpt_Bill_List-${tUserInfo.USER_ID}-${tRetDate}.xlsx`;
                tWExcelFile = tWExcelFile.replace(/[\\\/:*?"<>|]/g, ' ');

                return await upload(`${tWExcelFile}.xlsx`, wb);
            } catch (error) {
                var tRetArray = [];
                var tObj = {};
                tObj.id = 0;
                tObj.CODE = 'ERROR: ' + error.message;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },

        mgrQueryS0705_3: async (_, args) => {
            var tRetDate = AFLib.getCurrTime();
            var tYY = parseInt(tRetDate.substring(0, 4));
            var tMon = parseInt(tRetDate.substring(4, 6));

            var tSYY = '';
            var tSMON = '';

            if (tMon > 6) {
                tSYY = String(tYY);
                tSMON = String(tMon - 6);
                if (parseInt(tSMON) < 10) tSMON = `0${tSMON}`;
                if (parseInt(tMon) < 10) tMon = `0${tMon}`;
            } else {
                tSYY = String(tYY - 1);
                tSMON = String(6 + tMon);
                if (parseInt(tSMON) < 10) tSMON = `0${tSMON}`;
                if (parseInt(tMon) < 10) tMon = `0${tMon}`;
            }

            var tSDate = `${tRetDate.substring(0, 8)}`;
            var tEDate = `${tRetDate.substring(0, 8)}`;

            if (args.data.S_ISSUE_DATE !== '') tSDate = args.data.S_ISSUE_DATE;
            if (args.data.E_ISSUE_DATE !== '') tEDate = args.data.E_ISSUE_DATE;

            var tSQL = '';
            if (args.data.INVOICE_NO === '') {
                if (args.data.IS_SHIP_DATE === '1') {
                    tSQL += `where left(a.ship_date,8) between '${tSDate}' and '${tEDate}' `;
                } else if (args.data.IS_EXFACTORY === '1') {
                    tSQL += `where left(a.exfactory,8) between '${tSDate}' and '${tEDate}' `;
                } else {
                    tSQL += `where left(a.ship_date,8) between '${tSDate}' and '${tEDate}' `;
                }
            } else {
                tSQL += `where a.invoice_no like '%${args.data.INVOICE_NO}%' `;
            }

            var tOrderSql = '';
            if (args.data.IS_SHIP_DATE === '1') {
                tOrderSql = `order by A.SHIP_DATE, A.INVOICE_NO, A.ORDER_CD `;
            } else {
                tOrderSql = `order by A.EXFACTORY, A.INVOICE_NO, A.ORDER_CD `;
            }

            if (args.data.INVOICE_TYPE === '3') {
                tSQL += ` and b.fc_nego_type = '3' `;
            } else {
                if (args.data.IS_NEGO_CMPT === '1') {
                    tSQL += ` and b.fc_nego_type = '1' `;
                } else {
                    tSQL += ` and b.fc_nego_type <> '3' `;
                    /*
               tSQL += ` and d.cd_code = '${args.data.INVOICE_TYPE}' `;
               */
                }
            }

            let sqlStr = `
                SELECT
                    LEFT(A.ORDER_CD, 2) AS BUYER_CD,
                    A.INVOICE_NO,
                    H.PO_CD,
                    A.ORDER_CD,
                    E.STYLE_NAME,
                    C.CD_NAME as SHIP_PTYPE_N,
                    A.SHIP_DATE,
                    A.EXFACTORY,
                    SUM(A.SHIP_CNT) AS SHIP_CNT,
                    (
                        CASE
                            WHEN A.SHIP_PTYPE < '4' THEN B.FC_PRICE
                            ELSE 0
                        END
                    ) AS FC_ORD_PRICE,
                    '0' as FC_AMT,
                    isnull(G.BVT_CMPT, '0') as FC_BILL_PRICE,
                    (
                        CASE
                            WHEN D.CD_NAME = '-' THEN CASE
                                WHEN B.FC_NEGO_TYPE = '3' THEN 'BVT.PRESENT'
                                ELSE D.CD_NAME
                            END
                            ELSE D.CD_NAME
                        END
                    ) AS BILL_CHK_N,
                    F.CD_NAME AS BILL_FLAG_N,
                    A.FC_BILL_DATE as BILL_DATE,
                    A.FC_CHK_FLAG as BILL_CHK,
                    A.FC_BILL_FLAG as BILL_FLAG,
                    A.SHIP_PTYPE,
                    B.FC_NEGO_TYPE,
                    isnull(G.BVT_SCREEN_PRINT, '0') as SCREEN_PRINT,
                    isnull(G.BVT_HEAT_SILICON, '0') as HEAT_SILICON,
                    isnull(G.BVT_EMBROIDERY, '0') as EMBROIDERY,
                    isnull(G.BVT_TPR, '0') as TPR,
                    isnull(G.BVT_WELDING, '0') as WELDING,
                    ISNULL(G.BVT_QUILTING, '0') AS QUILTING,
                    ISNULL(G.BVT_DIGITAL_PRINT, '0') AS DIGITAL_PRINT,
                    ISNULL(G.BVT_LABEL_PRINT, '0') AS LABEL_PRINT,
                    isnull(G.BVT_LINE_CHARGE, '0') as LINE_CHARGE,
                    (
                        CASE
                            WHEN B.SAMPLE_FLAG = '1' THEN B.FC_PRICE - isnull(G.BVT_WELDING, 0)
                            ELSE isnull(G.BVT_CMPT, 0) + isnull(G.BVT_SCREEN_PRINT, 0) + isnull(G.BVT_HEAT_SILICON, 0) + isnull(G.BVT_EMBROIDERY, 0) + isnull(G.BVT_TPR, 0) + isnull(G.BVT_WELDING, 0) + ISNULL(G.BVT_QUILTING, 0) + ISNULL(G.BVT_DIGITAL_PRINT, 0) + ISNULL(G.BVT_LABEL_PRINT, 0) + ISNULL(G.BVT_LINE_CHARGE, 0)
                        END
                    ) AS CMPT_TOTAL,
                    '0' as TOTAL_AMT,
                    B.REMARK,
                    B.TOT_CNT as TOTAL_CNT
                FROM
                    KSV_ORDER_SHIP A
                    LEFT JOIN KSV_ORDER_CMPT G ON G.NEGO_SEQ = (
                        SELECT
                            MAX(NEGO_SEQ)
                        FROM
                            KSV_ORDER_CMPT
                        WHERE
                            ORDER_CD = A.ORDER_CD
                    )
                    AND G.ORDER_CD = A.ORDER_CD
                    LEFT JOIN KCD_CODE C ON C.CD_GROUP = 'SHIP_PTYPE'
                    AND C.CD_CODE = A.SHIP_PTYPE
                    LEFT JOIN KCD_CODE D ON D.CD_GROUP = 'BILL_CHK'
                    AND D.CD_CODE = A.FC_CHK_FLAG
                    LEFT JOIN KCD_CODE F ON F.CD_GROUP = 'BILL_FLAG'
                    AND F.CD_CODE = A.FC_BILL_FLAG,
                    KSV_ORDER_MST B
                    LEFT JOIN KSV_PO_MEM H ON H.ORDER_CD = B.ORDER_CD
                    AND H.PO_SEQ = 1,
                    KCD_STYLE E ${tSQL}
                    AND LEFT(A.ORDER_CD, 2) LIKE '%${args.data.BUYER_CD}%'
                    AND B.ORDER_CD = A.ORDER_CD
                    AND B.FACTORY_CD LIKE '%${args.data.FACTORY_CD}%'
                    AND E.STYLE_CD = B.STYLE_CD
                    AND B.FC_NEGO_TYPE <> '0'
                GROUP BY
                    LEFT(A.ORDER_CD, 2),
                    A.INVOICE_NO,
                    H.PO_CD,
                    A.ORDER_CD,
                    E.STYLE_NAME,
                    C.CD_NAME,
                    A.SHIP_DATE,
                    A.EXFACTORY,
                    A.FC_BILL_PRICE,
                    B.FC_PRICE,
                    D.CD_NAME,
                    F.CD_NAME,
                    A.FC_BILL_DATE,
                    A.FC_CHK_FLAG,
                    A.FC_BILL_FLAG,
                    A.SHIP_PTYPE,
                    B.FC_NEGO_TYPE,
                    G.BVT_SCREEN_PRINT,
                    G.BVT_HEAT_SILICON,
                    G.BVT_EMBROIDERY,
                    G.BVT_TPR,
                    G.BVT_WELDING,
                    B.SAMPLE_FLAG,
                    G.BVT_CMPT,
                    G.BVT_LINE_CHARGE,
                    B.REMARK,
                    B.TOT_CNT,
                    G.BVT_DIGITAL_PRINT,
                    G.BVT_LABEL_PRINT,
                    G.BVT_QUILTING
                    -- ORDER BY  1, 2
                    ${tOrderSql}
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetArray = [];
            var tIdx = 0;
            tRet.forEach((col, i) => {
                var tObj = { ...col };
                var tFcAmt = '';
                var tTotalAmt = '';
                if (tObj.BILL_CHK === '0') {
                    tFcAmt =
                        parseFloat(tObj.SHIP_CNT) *
                        parseFloat(tObj.FC_ORD_PRICE);
                    tObj.FC_AMT = String(tFcAmt);
                } else {
                    tFcAmt =
                        parseFloat(tObj.SHIP_CNT) *
                        parseFloat(tObj.FC_BILL_PRICE);
                    tObj.FC_AMT = String(tFcAmt);
                }
                tTotalAmt =
                    parseFloat(tObj.SHIP_CNT) * parseFloat(tObj.CMPT_TOTAL);
                tObj.TOTAL_AMT = String(tTotalAmt);
                tRetArray.push(tObj);
            });
            return tRetArray;
        },
    },
};

export default moduleQuery_S0705_3;
