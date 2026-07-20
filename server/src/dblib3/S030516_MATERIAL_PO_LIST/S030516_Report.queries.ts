// S030516_Report.queries.ts

import { Prisma } from '@prisma/client';
import prisma from '../../db';
import AFLib from '../../commlib';
const Excel = require('exceljs');
const { upload } = require('../../../routes/s3');
const moment = require('moment');

function buildListSql(data: any) {
    const normalize = (value: any) => String(value ?? '').trim();
    const escapeSql = (value: string) => value.replace(/'/g, "''");

    const dateKind = normalize(data.DATE_KIND) || '1';
    const dateField = dateKind === '0' ? 'F.PO_DATE' : 'F.plan_etd';
    const vendorCd = normalize(data.VENDOR_CD);
    const poCd = normalize(data.PO_CD);
    const buyerCd = normalize(data.BUYER_CD);
    const matlCd = normalize(data.MATL_CD);
    const matlType = normalize(data.MATL_TYPE);
    const vendorType = normalize(data.VENDOR_TYPE);
    const matlName = escapeSql(normalize(data.MATL_NAME));
    const color = escapeSql(normalize(data.COLOR));
    const spec = escapeSql(normalize(data.SPEC));
    const sDate = normalize(data.S_DATE);
    const eDate = normalize(data.E_DATE);

    return `
        SELECT
            A.PO_CD,
            A.ORDER_CD,
            C.STYLE_NAME,
            E.VENDOR_NAME,
            D.MATL_NAME,
            D.COLOR,
            D.SPEC,
            D.UNIT,
            A.MATL_CD,
            G.CURR_CD,
            G.MATL_PRICE,
            A.TOT_AMT,
            SUM(A.USE_QTY) AS EXP_USEQTY,
            SUM(A.PO_QTY) AS EXP_POQTY,
            ${dateField} AS ORDER_DATE,
            F.MATL_DUE_DATE,
            SUM(A.USE_QTY) - SUM(A.PO_QTY) AS EXP_DIFF
        FROM
            KSV_PO_MRP AS A INNER JOIN
            KSV_ORDER_MST AS B ON A.ORDER_CD = B.ORDER_CD INNER JOIN
            KCD_STYLE AS C ON B.STYLE_CD = C.STYLE_CD INNER JOIN
            KCD_MATL_MST AS D ON A.MATL_CD = D.MATL_CD INNER JOIN
            KCD_VENDOR AS E ON D.VENDOR_CD = E.VENDOR_CD INNER JOIN
            KSV_PO_MST AS F ON A.PO_CD = F.PO_CD AND A.PO_SEQ = F.PO_SEQ INNER JOIN
            KCD_MATL_MEM AS G ON A.MATL_CD = G.MATL_CD AND A.MATL_SEQ = G.MATL_SEQ
        WHERE
            (E.VENDOR_CD LIKE '%${vendorCd}%')
            AND (A.PO_CD LIKE '%${poCd}%')
            AND (${dateField} >= '${sDate}')
            AND (${dateField} <= '${eDate}')
            AND (A.MATL_CD LIKE '%${matlCd}%')
            AND (D.MATL_CD LIKE '%${matlCd}%')
            AND (D.MATL_NAME LIKE '%${matlName}%')
            AND (D.SPEC LIKE '%${spec}%')
            AND (D.COLOR LIKE '%${color}%')
            AND ISNULL(E.VENDOR_MATL_TYPE, '') LIKE '${matlType}%'
            AND (E.VENDOR_TYPE LIKE '%${vendorType}%')
            AND LEFT(A.ORDER_CD, 2) LIKE '${buyerCd}%'
        GROUP BY
            A.PO_CD, A.ORDER_CD, C.STYLE_NAME, E.VENDOR_NAME, D.MATL_NAME, A.MATL_CD,
            G.MATL_PRICE, D.COLOR, D.SPEC, A.TOT_AMT, G.CURR_CD, D.UNIT, ${dateField}, F.MATL_DUE_DATE
        ORDER BY 1
    `;
}

function buildCurrencySql(data: any) {
    const normalize = (value: any) => String(value ?? '').trim();
    const dateKind = normalize(data.DATE_KIND) || '1';
    const dateField = dateKind === '0' ? 'F.PO_DATE' : 'F.plan_etd';

    const vendorCd = normalize(data.VENDOR_CD);
    const poCd = normalize(data.PO_CD);
    const matlCd = normalize(data.MATL_CD);
    const sDate = normalize(data.S_DATE);
    const eDate = normalize(data.E_DATE);

    return `
        SELECT DISTINCT G.CURR_CD
        FROM KSV_PO_MRP AS A
            INNER JOIN KSV_ORDER_MST AS B ON A.ORDER_CD = B.ORDER_CD
            INNER JOIN KCD_STYLE AS C ON B.STYLE_CD = C.STYLE_CD
            INNER JOIN KCD_MATL_MST AS D ON A.MATL_CD = D.MATL_CD
            INNER JOIN KCD_VENDOR AS E ON D.VENDOR_CD = E.VENDOR_CD
            INNER JOIN KSV_PO_MST AS F ON A.PO_CD = F.PO_CD AND A.PO_SEQ = F.PO_SEQ
            INNER JOIN KCD_MATL_MEM AS G ON A.MATL_CD = G.MATL_CD AND A.MATL_SEQ = G.MATL_SEQ
        WHERE
            (E.VENDOR_CD LIKE '%${vendorCd}%')
            AND (A.PO_CD LIKE '%${poCd}%')
            AND (${dateField} >= '${sDate}')
            AND (${dateField} <= '${eDate}')
            AND (A.MATL_CD LIKE '%${matlCd}%')
            AND (A.USE_PO_TYPE = '1')
            AND (A.DIFF_PO_TYPE <> '2')
            AND (A.PO_QTY > 0)
    `;
}

function buildCurrencySumSql(data: any, currCd: string) {
    const normalize = (value: any) => String(value ?? '').trim();
    const escapeSql = (value: string) => value.replace(/'/g, "''");
    const dateKind = normalize(data.DATE_KIND) || '1';
    const dateField = dateKind === '0' ? 'F.PO_DATE' : 'F.plan_etd';

    const vendorCd = normalize(data.VENDOR_CD);
    const poCd = normalize(data.PO_CD);
    const matlCd = normalize(data.MATL_CD);
    const sDate = normalize(data.S_DATE);
    const eDate = normalize(data.E_DATE);

    return `
        SELECT SUM(A.TOT_AMT) AS TOT_AMT
        FROM KSV_PO_MRP AS A
            INNER JOIN KSV_ORDER_MST AS B ON A.ORDER_CD = B.ORDER_CD
            INNER JOIN KCD_STYLE AS C ON B.STYLE_CD = C.STYLE_CD
            INNER JOIN KCD_MATL_MST AS D ON A.MATL_CD = D.MATL_CD
            INNER JOIN KCD_VENDOR AS E ON D.VENDOR_CD = E.VENDOR_CD
            INNER JOIN KSV_PO_MST AS F ON A.PO_CD = F.PO_CD AND A.PO_SEQ = F.PO_SEQ
            INNER JOIN KCD_MATL_MEM AS G ON A.MATL_CD = G.MATL_CD AND A.MATL_SEQ = G.MATL_SEQ
        WHERE
            (E.VENDOR_CD LIKE '%${vendorCd}%')
            AND (A.PO_CD LIKE '%${poCd}%')
            AND (${dateField} >= '${sDate}')
            AND (${dateField} <= '${eDate}')
            AND (A.MATL_CD LIKE '%${matlCd}%')
            AND (A.USE_PO_TYPE = '1')
            AND (A.DIFF_PO_TYPE <> '2')
            AND (A.PO_QTY > 0)
            AND (G.CURR_CD = '${escapeSql(currCd)}')
        GROUP BY G.CURR_CD
    `;
}

function dateToText(value: any) {
    const s = String(value ?? '').trim();
    if (s.length !== 8) return s;
    return `${s.substring(0, 4)}-${s.substring(4, 6)}-${s.substring(6, 8)}`;
}

function buildAdditionalDataBulkSql(pairs: Array<{ ORDER_CD: string; MATL_CD: string }>) {
    if (pairs.length === 0) return '';

    const escapeSql = (value: string) => value.replace(/'/g, "''");
    const reqRows = pairs
        .map((pair, idx) => {
            const orderCd = escapeSql(pair.ORDER_CD);
            const matlCd = escapeSql(pair.MATL_CD);
            if (idx === 0) {
                return `SELECT '${orderCd}' AS ORDER_CD, '${matlCd}' AS MATL_CD`;
            }
            return `UNION ALL SELECT '${orderCd}', '${matlCd}'`;
        })
        .join('\n            ');

    return `
        WITH Req AS (
            ${reqRows}
        ), LatestMrp AS (
            SELECT
                a.ORDER_CD,
                a.MATL_CD,
                MAX(a.order_mrp_seq) AS order_mrp_seq
            FROM KSV_ORDER_MRP A
                INNER JOIN Req req ON (a.ORDER_CD = req.ORDER_CD AND a.MATL_CD = req.MATL_CD)
            GROUP BY
                a.ORDER_CD,
                a.MATL_CD
        ), AddRows AS (
            SELECT
                a.ORDER_CD,
                a.MATL_CD,
                a.PROD_CD,
                a.GROSS,
                a.SEQ,
                b.COLOR,
                SUM(c.tot_cnt) AS ProdQty,
                d.tot_cnt AS OrderQty
            FROM KSV_ORDER_MRP A
                INNER JOIN LatestMrp lm ON (
                    a.ORDER_CD = lm.ORDER_CD
                    AND a.MATL_CD = lm.MATL_CD
                    AND a.order_mrp_seq = lm.order_mrp_seq
                )
                LEFT OUTER JOIN ksv_prod_mst B ON (a.prod_cd = b.prod_cd)
                LEFT OUTER JOIN KSV_ORDER_MEM C ON (a.prod_cd = c.prod_cd AND a.order_cd = c.order_cd)
                LEFT OUTER JOIN ksv_order_mst D ON (a.order_cd = d.order_cd)
            GROUP BY
                a.ORDER_CD,
                a.MATL_CD,
                a.PROD_CD,
                a.STD_NET,
                a.STD_LOSS,
                a.STD_GROSS,
                a.NET,
                a.LOSS,
                a.GROSS,
                a.REMARK,
                a.SEQ,
                b.COLOR,
                d.tot_cnt
        )
        SELECT
            ORDER_CD,
            MATL_CD,
            PROD_CD,
            GROSS,
            SEQ,
            COLOR,
            ProdQty,
            OrderQty
        FROM AddRows
        ORDER BY ORDER_CD, MATL_CD, SEQ DESC, PROD_CD
    `;
}

function dateToYmdRaw(value: any) {
    return String(value ?? '').trim();
}

function ymdToExcelSerial(value: any) {
    const s = String(value ?? '').trim();
    if (s.length !== 8) return s;

    const year = Number(s.substring(0, 4));
    const month = Number(s.substring(4, 6));
    const day = Number(s.substring(6, 8));
    if (!year || !month || !day) return s;

    const utcMillis = Date.UTC(year, month - 1, day);
    return utcMillis / 86400000 + 25569;
}

const moduleQuery_S030516_Report = {
    Query: {
        mgrQueryS030516_REPORT: async (_: any, args: any, contextValue: any) => {
            const data = args.data || {};
            const sqlStr = buildListSql(data);
            const rows: any[] = await prisma.$queryRaw(Prisma.raw(sqlStr));

            const workbook = new Excel.Workbook();
            const sheet = workbook.addWorksheet('List');
            const dataSheet = workbook.addWorksheet('Data');

            const borderThin = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' },
            };

            const setCellStyle = (cell: any, align: 'left' | 'center' | 'right' = 'center') => {
                cell.font = { name: 'Arial', size: 10 };
                cell.alignment = { vertical: 'middle', horizontal: align, wrapText: true };
                cell.border = borderThin;
            };

            const hasProdCd = (value: any) => String(value ?? '').trim() !== '';

            const dataColumns = [
                { key: 'PO_CD', width: 14 },
                { key: 'ORDER_CD', width: 14 },
                { key: 'STYLE_NAME', width: 28 },
                { key: 'VENDOR_NAME', width: 22 },
                { key: 'MATL_NAME', width: 24 },
                { key: 'COLOR', width: 12 },
                { key: 'SPEC', width: 22 },
                { key: 'UNIT', width: 8 },
                { key: 'MATL_CD', width: 12 },
                { key: 'CURR_CD', width: 8 },
                { key: 'MATL_PRICE', width: 12 },
                { key: 'TOT_AMT', width: 14 },
                { key: 'EXP_USEQTY', width: 11 },
                { key: 'EXP_POQTY', width: 11 },
                { key: 'ORDER_DATE', width: 12 },
                { key: 'MATL_DUE_DATE', width: 12 },
                { key: 'EXP_DIFF', width: 11 },
                { key: 'REPORT1', width: 11 },
                { key: 'REPORT2', width: 11 },
            ];

            const dataSheetColumns = [
                { key: 'PO_CD', width: 14 },
                { key: 'ORDER_CD', width: 14 },
                { key: 'STYLE_NAME', width: 28 },
                { key: 'VENDOR_NAME', width: 22 },
                { key: 'MATL_NAME', width: 24 },
                { key: 'COLOR', width: 12 },
                { key: 'SPEC', width: 22 },
                { key: 'UNIT', width: 8 },
                { key: 'MATL_CD', width: 12 },
                { key: 'CURR_CD', width: 8 },
                { key: 'MATL_PRICE', width: 12 },
                { key: 'TOT_AMT', width: 14 },
                { key: 'EXP_USEQTY', width: 11 },
                { key: 'EXP_POQTY', width: 11 },
                { key: 'ORDER_DATE', width: 12 },
                { key: 'PROD_CD', width: 12 },
                { key: 'GROSS', width: 12 },
                { key: 'COLOR_VER', width: 12 },
                { key: 'SEQ', width: 8 },
                { key: 'PROD_QTY', width: 11 },
                { key: 'ORDER_QTY', width: 11 },
            ];

            // Summary block is disabled, so keep header directly under title row.
            const headerRow = 2;
            const dataStartRow = headerRow + 1;

            // Configure LIST sheet
            sheet.columns = dataColumns;
            sheet.views = [{ state: 'frozen', xSplit: 0, ySplit: headerRow }];

            sheet.getRow(1).height = 22;
            sheet.getRow(2).height = 18;
            sheet.getRow(headerRow).height = 22;

            sheet.mergeCells('A1:S1');
            sheet.getCell('A1').value = '';
            sheet.getCell('A1').font = { name: 'Arial', size: 12, bold: true };
            sheet.getCell('A1').alignment = { vertical: 'middle', horizontal: 'left' };

            const headerTitles = [
                '발주번호',
                '오더번호',
                '스타일',
                '업체명',
                '자재명',
                '색상',
                '사양',
                '단위',
                '자재코드',
                '통화',
                '단가',
                '가격',
                '소요량',
                '발주량',
                '발주일',
                '납기',
                '미발주량',
                '발주확인',
                '업체확인자',
            ];
            headerTitles.forEach((title, idx) => {
                const cell = sheet.getCell(headerRow, idx + 1);
                cell.value = title;
                cell.font = { name: 'Arial', size: 10, bold: true, color: { argb: 'FFB00000' } };
                cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
                cell.border = borderThin;
            });

            // Configure Data sheet
            dataSheet.columns = dataSheetColumns;
            const dataHeaderRow = 2;
            const dataDataStartRow = dataHeaderRow + 1;
            
            dataSheet.views = [{ state: 'frozen', xSplit: 0, ySplit: dataHeaderRow }];
            dataSheet.getRow(1).height = 22;
            dataSheet.getRow(dataHeaderRow).height = 22;

            dataSheet.mergeCells('A1:U1');
            dataSheet.getCell('A1').value = '';
            dataSheet.getCell('A1').font = { name: 'Arial', size: 12, bold: true };
            dataSheet.getCell('A1').alignment = { vertical: 'middle', horizontal: 'left' };

            const dataHeaderTitles = [
                'PO',
                'Order',
                'Style',
                'Supplier',
                'Description',
                'Color',
                'Spec',
                'Unit',
                'Matl Cd',
                'Curr',
                '단가',
                '가격',
                '소요량',
                '발주량',
                '발주일',
                'prod_cd',
                'gross',
                'color ver',
                'Seq',
                'ProdQty',
                'OrderQty',
            ];
            dataHeaderTitles.forEach((title, idx) => {
                const cell = dataSheet.getCell(dataHeaderRow, idx + 1);
                cell.value = title;
                cell.font = { name: 'Arial', size: 10, bold: true, color: { argb: 'FFB00000' } };
                cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
                cell.border = borderThin;
            });

            // Total block header
            /*
            sheet.getCell(2, 10).value = 'Total';
            sheet.getCell(2, 10).font = { name: 'Arial', size: 10, bold: true };
            sheet.getCell(2, 10).alignment = { vertical: 'middle', horizontal: 'center' };
            sheet.getCell(2, 10).border = borderThin;

            // Clear summary area for J~L rows 2..30
            for (let rr = 2; rr <= 30; rr++) {
                if (rr === headerRow) continue;
                for (let cc = 10; cc <= 12; cc++) {
                    sheet.getCell(rr, cc).value = '';
                    sheet.getCell(rr, cc).border = borderThin;
                    sheet.getCell(rr, cc).alignment = { vertical: 'middle', horizontal: cc === 12 ? 'right' : 'center' };
                }
            }
            */

            if (rows.length > 0) {
                const strDateS = dateToText(data.S_DATE);
                const strDateE = dateToText(data.E_DATE);

                const vendorCd = String(data.VENDOR_CD ?? '').trim();
                let vendorName = '';
                if (vendorCd !== '') {
                    const vendorSql = `
                        SELECT TOP 1 VENDOR_NAME
                        FROM KCD_VENDOR
                        WHERE VENDOR_CD = '${vendorCd.replace(/'/g, "''")}'
                    `;
                    const vendorRows: any[] = await prisma.$queryRaw(
                        Prisma.raw(vendorSql),
                    );
                    if (vendorRows.length > 0) {
                        vendorName = String(vendorRows[0].VENDOR_NAME ?? '');
                    }
                }

                sheet.getCell(1, 1).value = `${vendorName} 발주현황: ${strDateS}~${strDateE}`;
                dataSheet.getCell(1, 1).value = `${vendorName} 발주현황: ${strDateS}~${strDateE}`;

                const addDataMap = new Map<string, any[]>();
                const rowGroupMap = new Map<string, any[]>();
                const uniquePairs: Array<{ ORDER_CD: string; MATL_CD: string }> = [];
                const pairKeys = new Set<string>();

                for (const row of rows) {
                    const orderCd = String(row.ORDER_CD ?? '').trim();
                    const matlCd = String(row.MATL_CD ?? '').trim();
                    if (!orderCd || !matlCd) continue;

                    const key = `${orderCd}||${matlCd}`;
                    if (!rowGroupMap.has(key)) {
                        rowGroupMap.set(key, []);
                    }
                    rowGroupMap.get(key)!.push(row);

                    if (pairKeys.has(key)) continue;

                    pairKeys.add(key);
                    uniquePairs.push({ ORDER_CD: orderCd, MATL_CD: matlCd });
                }

                if (uniquePairs.length > 0) {
                    try {
                        const addSql = buildAdditionalDataBulkSql(uniquePairs);
                        const addRows: any[] = await prisma.$queryRaw(Prisma.raw(addSql));
                        for (const addRow of addRows) {
                            const key = `${String(addRow.ORDER_CD ?? '').trim()}||${String(addRow.MATL_CD ?? '').trim()}`;
                            if (!addDataMap.has(key)) {
                                addDataMap.set(key, []);
                            }
                            addDataMap.get(key)!.push(addRow);
                        }
                    } catch (err) {
                        console.error('Additional data bulk query error:', err);
                    }
                }

                let rowIdx = dataStartRow;
                let dataRowIdx = dataDataStartRow;
                for (const row of rows) {
                    sheet.getCell(rowIdx, 1).value = row.PO_CD ?? '';
                    sheet.getCell(rowIdx, 2).value = row.ORDER_CD ?? '';
                    sheet.getCell(rowIdx, 3).value = row.STYLE_NAME ?? '';
                    sheet.getCell(rowIdx, 4).value = row.VENDOR_NAME ?? '';
                    sheet.getCell(rowIdx, 5).value = row.MATL_NAME ?? '';
                    sheet.getCell(rowIdx, 6).value = row.COLOR ?? '';
                    sheet.getCell(rowIdx, 7).value = row.SPEC ?? '';
                    sheet.getCell(rowIdx, 8).value = row.UNIT ?? '';
                    sheet.getCell(rowIdx, 9).value = row.MATL_CD ?? '';
                    sheet.getCell(rowIdx, 10).value = row.CURR_CD ?? '';
                    sheet.getCell(rowIdx, 11).value = Number(row.MATL_PRICE ?? 0);
                    sheet.getCell(rowIdx, 12).value = Number(row.TOT_AMT ?? 0);
                    sheet.getCell(rowIdx, 13).value = Number(row.EXP_USEQTY ?? 0);
                    sheet.getCell(rowIdx, 14).value = Number(row.EXP_POQTY ?? 0);
                    sheet.getCell(rowIdx, 15).value = ymdToExcelSerial(row.ORDER_DATE);
                    sheet.getCell(rowIdx, 16).value = ymdToExcelSerial(row.MATL_DUE_DATE);
                    sheet.getCell(rowIdx, 17).value = Number(row.EXP_DIFF ?? 0);
                    sheet.getCell(rowIdx, 18).value = '';
                    sheet.getCell(rowIdx, 19).value = '';

                    sheet.getCell(rowIdx, 13).numFmt = '#,##0';
                    sheet.getCell(rowIdx, 14).numFmt = '#,##0';
                    sheet.getCell(rowIdx, 17).numFmt = '#,##0';
                    sheet.getCell(rowIdx, 15).numFmt = 'yyyy-mm-dd';
                    sheet.getCell(rowIdx, 16).numFmt = 'yyyy-mm-dd';

                    for (let cc = 1; cc <= 19; cc++) {
                        setCellStyle(sheet.getCell(rowIdx, cc), cc === 11 || cc === 12 || cc === 13 || cc === 14 || cc === 17 ? 'right' : 'center');
                    }

                    rowIdx++;
                }

                for (const pair of uniquePairs) {
                    const addDataKey = `${pair.ORDER_CD}||${pair.MATL_CD}`;
                    const baseRows = rowGroupMap.get(addDataKey) || [];
                    const addDataList = (addDataMap.get(addDataKey) || []).filter((one) =>
                        hasProdCd(one?.PROD_CD),
                    );

                    for (const row of baseRows) {
                        for (const addData of addDataList) {
                            dataSheet.getCell(dataRowIdx, 1).value = row.PO_CD ?? '';
                            dataSheet.getCell(dataRowIdx, 2).value = row.ORDER_CD ?? '';
                            dataSheet.getCell(dataRowIdx, 3).value = row.STYLE_NAME ?? '';
                            dataSheet.getCell(dataRowIdx, 4).value = row.VENDOR_NAME ?? '';
                            dataSheet.getCell(dataRowIdx, 5).value = row.MATL_NAME ?? '';
                            dataSheet.getCell(dataRowIdx, 6).value = row.COLOR ?? '';
                            dataSheet.getCell(dataRowIdx, 7).value = row.SPEC ?? '';
                            dataSheet.getCell(dataRowIdx, 8).value = row.UNIT ?? '';
                            dataSheet.getCell(dataRowIdx, 9).value = row.MATL_CD ?? '';
                            dataSheet.getCell(dataRowIdx, 10).value = row.CURR_CD ?? '';
                            dataSheet.getCell(dataRowIdx, 11).value = Number(row.MATL_PRICE ?? 0);
                            dataSheet.getCell(dataRowIdx, 12).value = Number(row.TOT_AMT ?? 0);
                            dataSheet.getCell(dataRowIdx, 13).value = Number(row.EXP_USEQTY ?? 0);
                            dataSheet.getCell(dataRowIdx, 14).value = Number(row.EXP_POQTY ?? 0);
                            dataSheet.getCell(dataRowIdx, 15).value = ymdToExcelSerial(row.ORDER_DATE);

                            dataSheet.getCell(dataRowIdx, 16).value = addData?.PROD_CD ?? '';
                            dataSheet.getCell(dataRowIdx, 17).value = Number(addData?.GROSS ?? 0);
                            dataSheet.getCell(dataRowIdx, 18).value = addData?.COLOR ?? '';
                            dataSheet.getCell(dataRowIdx, 19).value = addData?.SEQ ?? '';
                            dataSheet.getCell(dataRowIdx, 20).value = Number(addData?.ProdQty ?? 0);
                            dataSheet.getCell(dataRowIdx, 21).value = Number(addData?.OrderQty ?? 0);

                            dataSheet.getCell(dataRowIdx, 13).numFmt = '#,##0';
                            dataSheet.getCell(dataRowIdx, 14).numFmt = '#,##0';
                            dataSheet.getCell(dataRowIdx, 15).numFmt = 'yyyy-mm-dd';
                            dataSheet.getCell(dataRowIdx, 17).numFmt = '#,##0.################';
                            dataSheet.getCell(dataRowIdx, 20).numFmt = '#,##0';
                            dataSheet.getCell(dataRowIdx, 21).numFmt = '#,##0';

                            for (let cc = 1; cc <= 21; cc++) {
                                setCellStyle(dataSheet.getCell(dataRowIdx, cc),
                                    (cc === 11 || cc === 12 || cc === 13 || cc === 14 || cc === 17 || cc === 20 || cc === 21) ? 'right' : 'center');
                            }

                            dataRowIdx++;
                        }
                    }
                }

                // Final cleanup: remove rows where PROD_CD is blank.
                for (let rr = dataRowIdx - 1; rr >= dataDataStartRow; rr--) {
                    const prodCdVal = dataSheet.getCell(rr, 16).value;
                    if (!hasProdCd(prodCdVal)) {
                        dataSheet.spliceRows(rr, 1);
                        dataRowIdx--;
                    }
                }

                /*
                let currRow = 2;
                for (const curr of currRows) {
                    const currCd = String(curr.CURR_CD ?? '');
                    sheet.getCell(currRow, 10).value = currCd;

                    const sumSql = buildCurrencySumSql(data, currCd);
                    const sumRows: any[] = await prisma.$queryRaw(Prisma.raw(sumSql));
                    if (sumRows.length > 0) {
                        sheet.getCell(currRow, 12).value = Number(sumRows[0].TOT_AMT ?? 0);
                    }

                    sheet.getCell(currRow, 12).numFmt = '#,##0';

                    for (let cc = 10; cc <= 12; cc++) {
                        setCellStyle(sheet.getCell(currRow, cc), cc === 12 ? 'right' : 'center');
                    }
                    currRow++;
                }
                */

                const dataEndRow = dataStartRow + rows.length - 1;
                const dataSheetEndRow = dataRowIdx - 1;

                for (let rr = dataStartRow; rr <= dataEndRow; rr++) {
                    for (let cc = 1; cc <= 19; cc++) {
                        sheet.getCell(rr, cc).border = borderThin;
                    }
                }

                // Remove borders from unused trailing rows below data.
                for (let rr = dataEndRow + 1; rr <= dataEndRow + 50; rr++) {
                    for (let cc = 1; cc <= 19; cc++) {
                        sheet.getCell(rr, cc).border = {};
                    }
                }

                // Apply borders to Data sheet
                for (let rr = dataDataStartRow; rr <= dataSheetEndRow; rr++) {
                    for (let cc = 1; cc <= 21; cc++) {
                        dataSheet.getCell(rr, cc).border = borderThin;
                    }
                }

                // Remove borders from unused trailing rows in Data sheet
                for (let rr = dataSheetEndRow + 1; rr <= dataSheetEndRow + 50; rr++) {
                    for (let cc = 1; cc <= 21; cc++) {
                        dataSheet.getCell(rr, cc).border = {};
                    }
                }
            }

            const userInfo = AFLib.getUserInfo(contextValue) || {};
            const userId = String(userInfo.USER_ID);
            const timeStamp = moment().format('YYYYMMDDHHmmss');
            const poCd = String(data.PO_CD ?? '').trim();
            const dateKind = String(data.DATE_KIND ?? '1').trim();
            const dateLabel = dateKind === '0' ? 'RegDate' : 'FixDate';
            const downloadKind = String(data.DOWNLOAD_KIND ?? 'DATA').toUpperCase();
            const fileName =
                downloadKind === 'LIST'
                    ? `material_po_list_${timeStamp}.xlsx`
                    : `material_po_data_${timeStamp}.xlsx`;

            if (downloadKind === 'LIST') {
                const dataOnlySheet = workbook.getWorksheet('Data');
                if (dataOnlySheet) {
                    workbook.removeWorksheet(dataOnlySheet.id);
                }
            } else {
                const listSheet = workbook.getWorksheet('List');
                if (listSheet) {
                    workbook.removeWorksheet(listSheet.id);
                }
            }

            return await upload(fileName, workbook);
        },
    },
};

export default moduleQuery_S030516_Report;
