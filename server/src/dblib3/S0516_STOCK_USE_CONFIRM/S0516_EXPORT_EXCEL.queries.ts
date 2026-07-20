import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
const path = require('path');
const Excel = require('exceljs');
const moment = require('moment');
const {
    generateUploadURL,
    deleteUploadObject,
    upload,
} = require('../../../routes/s3');
const fs = require('fs');

const thinBorder = {
    top: { style: 'thin' },
    left: { style: 'thin' },
    bottom: { style: 'thin' },
    right: { style: 'thin' },
};

// export default로 Query 내용 내보내기
const moduleQuery_S0516_EXPORT_EXCEL = {
    Query: {
        mgrQueryS0516_export_EXCEL: async (_, args, contextValue) => {
            let data = args.data;

            const templatePath = path.join(
                process.cwd(),
                'upload',
                'excel_template',
                'list.xlsx',
            );
            console.log(`템플릿 경로: ${templatePath}`);
            const wb = new Excel.Workbook();
            await wb.xlsx.readFile(templatePath);
            const sheet = wb.worksheets[0];

            sheet.getCell('A1').value =
                `Factory Stock Use List ${data[0].PO_CD}`;
            sheet.getCell('A1').alignment = {
                horizontal: 'center',
                vertical: 'middle',
            };
            sheet.getCell('A1').font = { name: '돋움', size: 20, bold: true };
            sheet.mergeCells(1, 1, 1, 11); // A1:K1
            sheet.getRow(1).height = 25;

            sheet.getCell('A2').value = `W/H`;
            sheet.getCell('B2').value = `Org.PO#`;
            sheet.getCell('C2').value = `Seq`;
            sheet.getCell('D2').value = `Use PO#`;
            sheet.getCell('E2').value = `Use Order#`;
            sheet.getCell('F2').value = `Order Matl#`;
            sheet.getCell('G2').value = `Stock Matl#`;
            sheet.getCell('H2').value = `Supplier`;
            sheet.getCell('I2').value = `Desc`;
            sheet.getCell('J2').value = `Color`;
            sheet.getCell('K2').value = `Spec`;
            sheet.getCell('L2').value = `Unit`;
            sheet.getCell('M2').value = `Condition`;
            sheet.getCell('N2').value = `Rack`;
            sheet.getCell('O2').value = `Location`;
            sheet.getCell('P2').value = `Org Qty`;
            sheet.getCell('Q2').value = `Use Qty`;
            sheet.getCell('R2').value = `Ok Use`;
            sheet.getCell('S2').value = `Defect`;
            sheet.getCell('T2').value = `Short`;
            sheet.getCell('U2').value = `Balance`;
            sheet.getCell('V2').value = `Remark`;
            sheet.getCell('W2').value = `Use Date`;

            sheet.getColumn('A').width = 20;
            sheet.getColumn('B').width = 12;
            sheet.getColumn('C').width = 3;
            sheet.getColumn('D').width = 12;
            sheet.getColumn('E').width = 15;
            sheet.getColumn('F').width = 15;
            sheet.getColumn('G').width = 15;
            sheet.getColumn('H').width = 25;
            sheet.getColumn('I').width = 25;
            sheet.getColumn('J').width = 15;
            sheet.getColumn('K').width = 25;
            sheet.getColumn('L').width = 3;
            sheet.getColumn('M').width = 12;
            sheet.getColumn('N').width = 20;
            sheet.getColumn('O').width = 20;
            sheet.getColumn('P').width = 10;
            sheet.getColumn('Q').width = 10;
            sheet.getColumn('R').width = 10;
            sheet.getColumn('S').width = 10;
            sheet.getColumn('T').width = 10;
            sheet.getColumn('U').width = 10;
            sheet.getColumn('V').width = 20;
            sheet.getColumn('W').width = 10;

            var tIdx = 0;
            for (let c = 1; c <= 23; c++) {
                const cell = sheet.getCell(2, c);
                cell.border = thinBorder;
                cell.alignment = {
                    ...cell.alignment,
                    horizontal: 'center',
                    vertical: 'middle',
                    wrapText: false,
                };
                cell.font = { name: '돋움', size: 11, bold: false };
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FFFFFF00' },
                };
                if (c === 1) cell.width = 20;
                if (c === 2) cell.width = 12;
            }

            let nRowIdx = 3;
            var colorRows = [];
            data.forEach((row) => {
                // 값 채우기: A~K
                sheet.getCell(nRowIdx, 1).value = row.WARE_NAME ?? ''; // A: PO_CD
                sheet.getCell(nRowIdx, 2).value = row.ORG_PO_CD ?? ''; // B: PO_SEQ
                sheet.getCell(nRowIdx, 3).value = row.ORG_PO_SEQ ?? ''; // C: MATL_CD
                sheet.getCell(nRowIdx, 4).value = row.PO_CD ?? ''; // D: MATL_NAME
                sheet.getCell(nRowIdx, 5).value = row.ORDER_CD ?? ''; // E: COLOR
                sheet.getCell(nRowIdx, 6).value = row.MATL_CD ?? ''; // F: SPEC
                sheet.getCell(nRowIdx, 7).value = row.ORG_MATL_CD ?? ''; // G: UNIT
                sheet.getCell(nRowIdx, 8).value = row.VENDOR_NAME ?? ''; // H: RACK
                sheet.getCell(nRowIdx, 9).value = row.MATL_NAME ?? ''; // I: LOCATION
                sheet.getCell(nRowIdx, 10).value = row.COLOR ?? ''; // I: LOCATION
                sheet.getCell(nRowIdx, 11).value = row.SPEC ?? ''; // I: LOCATION
                sheet.getCell(nRowIdx, 12).value = row.UNIT ?? ''; // I: LOCATION
                sheet.getCell(nRowIdx, 13).value = row.CONDITION ?? ''; // I: LOCATION
                sheet.getCell(nRowIdx, 14).value = row.RACK ?? ''; // I: LOCATION
                sheet.getCell(nRowIdx, 15).value = row.LOCATION ?? ''; // I: LOCATION
                sheet.getCell(nRowIdx, 16).value = Number(row.ORG_QTY ?? 0); // J: PO_QTY
                sheet.getCell(nRowIdx, 17).value = Number(row.USE_QTY ?? 0); // J: PO_QTY
                sheet.getCell(nRowIdx, 18).value = Number(row.OKUSE_QTY ?? 0); // J: PO_QTY
                sheet.getCell(nRowIdx, 19).value = Number(row.DEFECT_QTY ?? 0); // J: PO_QTY
                sheet.getCell(nRowIdx, 20).value = Number(row.SHORT_QTY ?? 0); // J: PO_QTY
                sheet.getCell(nRowIdx, 21).value = Number(row.BALANCE ?? 0); // J: PO_QTY
                sheet.getCell(nRowIdx, 22).value = row.REASON ?? ''; // I: LOCATION
                sheet.getCell(nRowIdx, 23).value =
                    row.USE_DATE.substring(0, 8) ?? ''; // I: LOCATION

                sheet.getCell(nRowIdx, 16).numFmt = '#,##0'; // J: PO_QTY
                sheet.getCell(nRowIdx, 17).numFmt = '#,##0'; // K: USE_QTY
                sheet.getCell(nRowIdx, 18).numFmt = '#,##0'; // K: USE_QTY
                sheet.getCell(nRowIdx, 19).numFmt = '#,##0'; // K: USE_QTY
                sheet.getCell(nRowIdx, 20).numFmt = '#,##0'; // K: USE_QTY
                sheet.getCell(nRowIdx, 21).numFmt = '#,##0'; // K: USE_QTY
                sheet.getCell(nRowIdx, 16).alignment = {
                    horizontal: 'right',
                    vertical: 'middle',
                };
                sheet.getCell(nRowIdx, 17).alignment = {
                    horizontal: 'right',
                    vertical: 'middle',
                };
                sheet.getCell(nRowIdx, 18).alignment = {
                    horizontal: 'right',
                    vertical: 'middle',
                };
                sheet.getCell(nRowIdx, 19).alignment = {
                    horizontal: 'right',
                    vertical: 'middle',
                };
                sheet.getCell(nRowIdx, 20).alignment = {
                    horizontal: 'right',
                    vertical: 'middle',
                };
                sheet.getCell(nRowIdx, 21).alignment = {
                    horizontal: 'right',
                    vertical: 'middle',
                };

                // 각 셀 테두리 적용 (A~K)
                for (let c = 1; c <= 23; c++) {
                    const cell = sheet.getCell(nRowIdx, c);
                    cell.border = thinBorder;
                    // cell.alignment = { ...cell.alignment, vertical: 'middle', wrapText: true };
                    cell.alignment = {
                        ...cell.alignment,
                        vertical: 'middle',
                        wrapText: false,
                    };
                    cell.font = { name: '돋움', size: 11, bold: false };
                    if (!row.WARE_NAME)
                        cell.fill = {
                            type: 'pattern',
                            pattern: 'solid',
                            fgColor: { argb: 'FFFFE135' },
                        };
                    if (c === 1) cell.width = 20;
                    if (c === 2) cell.width = 12;
                }

                sheet.getRow(nRowIdx).height = 15;

                nRowIdx++;
            });

            const userId = AFLib.getUserInfo(contextValue).USER_ID;
            const nowStr = moment().format('YYYYMMDDHHmmss');
            const tWExcelFile = `Factory Stock Use List_${args.data[0].PO_CD}-${userId}-${nowStr}`;
            const uploadInfo = await generateUploadURL();
            const uploadURL = uploadInfo.uploadURL;
            const fileURL = uploadURL.split('?')[0];
            const title = `Factory Stock Use List_${args.data[0].PO_CD}`;
            const fileKey = `Factory Stock Use List_${args.data[0].PO_CD}`;

            await prisma.$queryRaw(
                Prisma.raw(
                    `
                        delete from kcd_fileinfo
                        where
                            title = '${title}'
                            and file_key = '${fileKey}'
                            and kind = 'S0516'
                    `,
                ),
            );

            await prisma.$queryRaw(
                Prisma.raw(
                    AFLib.createTableSql('kcd_fileinfo', {
                        title: title,
                        kind: 'S0516',
                        file_key: fileKey,
                        name: tWExcelFile,
                        url: fileURL,
                        upd_datetime: AFLib.getCurrTime(),
                        upd_user: userId,
                    }),
                ),
            );

            return await upload(`${tWExcelFile}.xlsx`, wb, uploadURL);
        },

        mgrQueryS0516_export_STOCK_USE_LIST: async (_, args, contextValue) => {
            let data = args.data;

            const templatePath = path.join(
                process.cwd(),
                'upload',
                'excel_template',
                'warehouse.xlsx',
            );
            console.log(`템플릿 경로: ${templatePath}`);
            const wb = new Excel.Workbook();
            await wb.xlsx.readFile(templatePath);
            const sheet = wb.worksheets[0];

            sheet.getCell('A1').value =
                `Factory Stock Use List ${data[0].PO_CD}`;
            sheet.getCell('A1').alignment = {
                horizontal: 'center',
                vertical: 'middle',
            };
            sheet.mergeCells(1, 1, 1, 11); // A1:K1

            let nRowIdx = 4;
            data.forEach((row) => {
                // 값 채우기: A~K
                sheet.getCell(nRowIdx, 1).value = row.ORG_PO_CD ?? ''; // A: PO_CD
                sheet.getCell(nRowIdx, 2).value = row.PO_SEQ ?? ''; // B: PO_SEQ
                sheet.getCell(nRowIdx, 3).value = row.MATL_CD ?? ''; // C: MATL_CD
                sheet.getCell(nRowIdx, 4).value = row.MATL_NAME ?? ''; // D: MATL_NAME
                sheet.getCell(nRowIdx, 5).value = row.COLOR ?? ''; // E: COLOR
                sheet.getCell(nRowIdx, 6).value = row.SPEC ?? ''; // F: SPEC
                sheet.getCell(nRowIdx, 7).value = row.UNIT ?? ''; // G: UNIT
                sheet.getCell(nRowIdx, 8).value = row.RACK ?? ''; // H: RACK
                sheet.getCell(nRowIdx, 9).value = row.LOCATION ?? ''; // I: LOCATION
                sheet.getCell(nRowIdx, 10).value = Number(row.ORG_QTY ?? 0); // J: PO_QTY
                sheet.getCell(nRowIdx, 11).value = Number(row.USE_QTY2 ?? 0); // K: USE_QTY

                sheet.getCell(nRowIdx, 10).numFmt = '#,##0'; // J: PO_QTY
                sheet.getCell(nRowIdx, 11).numFmt = '#,##0'; // K: USE_QTY
                sheet.getCell(nRowIdx, 10).alignment = {
                    horizontal: 'right',
                    vertical: 'middle',
                };
                sheet.getCell(nRowIdx, 11).alignment = {
                    horizontal: 'right',
                    vertical: 'middle',
                };

                // 각 셀 테두리 적용 (A~K)
                for (let c = 1; c <= 11; c++) {
                    const cell = sheet.getCell(nRowIdx, c);
                    cell.border = thinBorder;
                    cell.alignment = {
                        ...cell.alignment,
                        vertical: 'middle',
                        wrapText: true,
                    };
                    cell.font = { name: '돋움', size: 11, bold: false };
                }

                sheet.getRow(nRowIdx).height = 245;

                nRowIdx++;
            });

            const userId = AFLib.getUserInfo(contextValue).USER_ID;
            const nowStr = moment().format('YYYYMMDDHHmmss');
            const tWExcelFile = `Factory Stock Use List_${args.data[0].PO_CD}-${userId}-${nowStr}`;
            const uploadInfo = await generateUploadURL();
            const uploadURL = uploadInfo.uploadURL;
            const fileURL = uploadURL.split('?')[0];
            const title = `Factory Stock Use List_${args.data[0].PO_CD}`;
            const fileKey = `Factory Stock Use List_${args.data[0].PO_CD}`;

            await prisma.$queryRaw(
                Prisma.raw(
                    `
                        delete from kcd_fileinfo
                        where
                            title = '${title}'
                            and file_key = '${fileKey}'
                            and kind = 'S0516'
                    `,
                ),
            );

            await prisma.$queryRaw(
                Prisma.raw(
                    AFLib.createTableSql('kcd_fileinfo', {
                        title: title,
                        kind: 'S0516',
                        file_key: fileKey,
                        name: tWExcelFile,
                        url: fileURL,
                        upd_datetime: AFLib.getCurrTime(),
                        upd_user: userId,
                    }),
                ),
            );

            return await upload(`${tWExcelFile}.xlsx`, wb, uploadURL);
        },

        mgrQueryS0516_export_EXCEL2: async (_, args, contextValue) => {
            const data = args.data;

            const wb = new Excel.Workbook();
            const sheet = wb.addWorksheet('Send ETP');

            sheet.columns = [
                { header: 'BUYER', key: 'BUYER_CD', width: 10 },
                { header: 'PO#', key: 'ORG_PO_CD', width: 16 },
                { header: 'CODE', key: 'ORG_MATL_CD', width: 18 },
                { header: 'DELIVERY#', key: 'INVOICE_NO', width: 18 },
                { header: 'HS CODE', key: 'HS_CODE', width: 12 },
                { header: 'COMPOSITION', key: 'COMPOSITION', width: 20 },
                { header: 'VIETNAM NAME', key: 'BVT_NAME', width: 22 },
                { header: 'DESC', key: 'MATL_NAME', width: 24 },
                { header: 'COLOR', key: 'COLOR', width: 12 },
                { header: 'SPEC', key: 'SPEC', width: 22 },
                { header: 'SUPPLIER', key: 'VENDOR_NAME', width: 22 },
                { header: 'ORIGIN', key: 'ORIGIN', width: 12 },
                { header: 'UNIT', key: 'UNIT', width: 10 },
                { header: "IN-Q'TY", key: 'USE_QTY', width: 12 },
                { header: 'C/T NO.', key: 'CT_NO', width: 14 },
                { header: "C/T Q'TY", key: 'CT_QTY', width: 10 },
                { header: 'WEIGHT', key: 'WEIGHT', width: 12 },
                { header: 'CBM', key: 'CBM', width: 12 },
                { header: 'TOT', key: 'TOT', width: 12 },
                { header: 'PRICE', key: 'PRICE', width: 12 },
                { header: 'AMOUNT', key: 'AMOUNT', width: 14 },
                { header: 'REMARK', key: 'REMARK', width: 22 },
            ];

            const parseNumber = (val) => {
                if (typeof val === 'number') return val;
                if (!val) return 0;
                const n = Number(String(val).replace(/,/g, '').trim());
                return Number.isFinite(n) ? n : 0;
            };

            const toExcelFormula = (val) => {
                if (val === null || typeof val === 'undefined') return null;
                const raw = String(val).trim();
                if (!raw) return null;
                const expr = raw.startsWith('=') ? raw.substring(1).trim() : raw;
                // Allow direct arithmetic expressions typed in the UI such as 140*19*19.
                if (/^[0-9+\-*/().\s,]+$/.test(expr) && /[+\-*/]/.test(expr)) {
                    return expr.replace(/,/g, '');
                }
                return null;
            };

            const toExcelDisplayText = (val) => {
                if (val === null || typeof val === 'undefined') return '';
                return String(val);
            };

            const headerRow = sheet.getRow(1);
            headerRow.font = { name: 'Arial', size: 10, bold: true };
            headerRow.alignment = {
                horizontal: 'center',
                vertical: 'middle',
            };
            headerRow.height = 26;
            for (let c = 1; c <= 22; c++) {
                const cell = headerRow.getCell(c);
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FF92D050' },
                };
                cell.border = thinBorder;
            }

            let nRowIdx = 2;
            data.forEach((row) => {
                sheet.getCell(nRowIdx, 1).value = row.BUYER_CD ?? '';
                sheet.getCell(nRowIdx, 2).value = row.ORG_PO_CD ?? '';
                sheet.getCell(nRowIdx, 3).value = row.ORG_MATL_CD ?? '';
                sheet.getCell(nRowIdx, 4).value = row.INVOICE_NO ?? '';
                sheet.getCell(nRowIdx, 5).value = row.HS_CODE ?? '';
                sheet.getCell(nRowIdx, 6).value = row.COMPOSITION ?? '';
                sheet.getCell(nRowIdx, 7).value = row.BVT_NAME ?? '';
                sheet.getCell(nRowIdx, 8).value = row.MATL_NAME ?? '';
                sheet.getCell(nRowIdx, 9).value = row.COLOR ?? '';
                sheet.getCell(nRowIdx, 10).value = row.SPEC ?? '';
                sheet.getCell(nRowIdx, 11).value = row.VENDOR_NAME ?? '';
                sheet.getCell(nRowIdx, 12).value = row.ORIGIN ?? '';
                sheet.getCell(nRowIdx, 13).value = row.UNIT ?? '';
                sheet.getCell(nRowIdx, 14).value = parseNumber(row.USE_QTY);
                sheet.getCell(nRowIdx, 15).value = row.CT_NO ?? '';
                sheet.getCell(nRowIdx, 16).value = parseNumber(row.CT_QTY);
                sheet.getCell(nRowIdx, 17).value = parseNumber(row.WEIGHT);
                const cbmText = toExcelDisplayText(row.CBM);
                const cbmFormula = toExcelFormula(row.CBM);
                sheet.getCell(nRowIdx, 18).value = cbmText;
                sheet.getCell(nRowIdx, 19).value = cbmFormula
                    ? { formula: cbmFormula }
                    : parseNumber(row.CBM);
                sheet.getCell(nRowIdx, 20).value = parseNumber(row.PRICE);
                sheet.getCell(nRowIdx, 21).value = parseNumber(row.AMOUNT);
                sheet.getCell(nRowIdx, 22).value = row.REMARK ?? '';

                sheet.getCell(nRowIdx, 14).numFmt = '#,##0.00';
                sheet.getCell(nRowIdx, 16).numFmt = '#,##0.00';
                sheet.getCell(nRowIdx, 17).numFmt = '#,##0.000';
                sheet.getCell(nRowIdx, 18).numFmt = '#,##0.000';
                sheet.getCell(nRowIdx, 19).numFmt = '#,##0';
                sheet.getCell(nRowIdx, 20).numFmt = '#,##0.00';
                sheet.getCell(nRowIdx, 21).numFmt = '#,##0.00';

                for (let c = 1; c <= 22; c++) {
                    const cell = sheet.getCell(nRowIdx, c);
                    cell.border = thinBorder;
                    cell.font = { name: 'Arial', size: 10, bold: false };
                    cell.alignment = {
                        vertical: 'middle',
                        horizontal: c === 14 || (c >= 16 && c <= 21) ? 'right' : 'left',
                    };
                }

                nRowIdx++;
            });

            const firstDataRow = 2;
            const lastDataRow = nRowIdx - 1;

            if (lastDataRow >= firstDataRow) {
                let groupStart = firstDataRow;
                let prevCtNo = String(
                    sheet.getCell(firstDataRow, 15).value ?? '',
                ).trim();

                for (let r = firstDataRow + 1; r <= lastDataRow + 1; r++) {
                    const currentCtNo =
                        r <= lastDataRow
                            ? String(sheet.getCell(r, 15).value ?? '').trim()
                            : '__END__';

                    if (currentCtNo !== prevCtNo) {
                        if (prevCtNo && r - groupStart > 1) {
                            [15, 16, 17, 18, 19].forEach((colIdx) => {
                                sheet.mergeCells(groupStart, colIdx, r - 1, colIdx);
                                const mCell = sheet.getCell(groupStart, colIdx);
                                mCell.alignment = {
                                    vertical: 'middle',
                                    horizontal: colIdx === 15 ? 'left' : 'right',
                                };
                            });
                        }
                        groupStart = r;
                        prevCtNo = currentCtNo;
                    }
                }

                const totalRowIdx = lastDataRow + 1;
                sheet.mergeCells(totalRowIdx, 1, totalRowIdx, 13);
                sheet.getCell(totalRowIdx, 1).value = 'TOTAL';
                sheet.getCell(totalRowIdx, 1).font = { name: 'Arial', size: 10, bold: true };
                sheet.getCell(totalRowIdx, 14).value = {
                    formula: `SUM(N${firstDataRow}:N${lastDataRow})`,
                };
                sheet.getCell(totalRowIdx, 16).value = {
                    formula: `SUM(P${firstDataRow}:P${lastDataRow})`,
                };
                sheet.getCell(totalRowIdx, 17).value = {
                    formula: `SUM(Q${firstDataRow}:Q${lastDataRow})`,
                };
                sheet.getCell(totalRowIdx, 18).value = {
                    formula: `SUM(R${firstDataRow}:R${lastDataRow})/1000000`,
                };
                sheet.getCell(totalRowIdx, 19).value = {
                    formula: `SUM(S${firstDataRow}:S${lastDataRow})`,
                };
                sheet.getCell(totalRowIdx, 21).value = {
                    formula: `SUM(U${firstDataRow}:U${lastDataRow})`,
                };

                sheet.getCell(totalRowIdx, 14).numFmt = '#,##0.00';
                sheet.getCell(totalRowIdx, 16).numFmt = '#,##0.00';
                sheet.getCell(totalRowIdx, 17).numFmt = '#,##0.000';
                sheet.getCell(totalRowIdx, 18).numFmt = '#,##0.000';
                sheet.getCell(totalRowIdx, 19).numFmt = '#,##0.000';
                sheet.getCell(totalRowIdx, 21).numFmt = '#,##0.00';

                for (let c = 1; c <= 22; c++) {
                    const cell = sheet.getCell(totalRowIdx, c);
                    cell.border = thinBorder;
                    cell.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: 'FF92D050' },
                    };
                    cell.font = {
                        name: 'Arial',
                        size: 10,
                        bold: true,
                    };
                    if (c === 1) {
                        cell.alignment = { horizontal: 'right', vertical: 'middle' };
                    }
                    if (c === 14 || c === 16 || c === 17 || c === 18 || c === 19 || c === 21) {
                        cell.alignment = { horizontal: 'right', vertical: 'middle' };
                    }
                }
            }

            const poCdInput = (data || [])
                .map((row) => String(row?.INPUT_PO_CD ?? '').trim())
                .find((v) => v !== '');
            const poCdFallback = data.length > 0 ? String(data[0].ORG_PO_CD ?? '').trim() : '';
            const poCd = poCdInput || poCdFallback || 'S0516';
            const userId = AFLib.getUserInfo(contextValue).USER_ID;
            const nowStr = moment().format('YYYYMMDDHHmmss');
            const tWExcelFile = `Send_ETP_${poCd}-${userId}-${nowStr}`;
            const uploadInfo = await generateUploadURL();
            const uploadURL = uploadInfo.uploadURL;

            return await upload(`${tWExcelFile}.xlsx`, wb, uploadURL);
        },

        mgrQueryS0516_export_STOCK_CHECK_FORM: async (
            _,
            args,
            contextValue,
        ) => {
            let data = args.data;

            const templatePath = path.join(
                process.cwd(),
                'upload',
                'excel_template',
                'stock_check_form.xlsx',
            );
            console.log(`템플릿 경로: ${templatePath}`);
            const wb = new Excel.Workbook();
            await wb.xlsx.readFile(templatePath);
            const sheet = wb.worksheets[0];

            sheet.getCell('A1').value =
                `Factory Stock Use List (${data[0].PO_CD}) ${data[0].ORDER_CD.substr(0, 2)}`;
            sheet.getCell('A1').alignment = {
                horizontal: 'center',
                vertical: 'middle',
            };

            sheet.mergeCells(1, 1, 1, 23); // A1:W1

            let nRowIdx = 4;
            data.forEach((row) => {
                sheet.getCell(nRowIdx, 1).value = row.WARE_NAME ?? '';
                sheet.getCell(nRowIdx, 2).value = row.ORG_PO_CD ?? '';
                sheet.getCell(nRowIdx, 3).value = row.PO_CD ?? '';
                sheet.getCell(nRowIdx, 4).value = row.PO_SEQ ?? '';
                sheet.getCell(nRowIdx, 5).value = row.ORDER_CD ?? '';
                sheet.getCell(nRowIdx, 6).value = row.MATL_CD ?? '';
                sheet.getCell(nRowIdx, 7).value = row.MATL_CD ?? '';
                sheet.getCell(nRowIdx, 8).value = row.VENDOR_NAME ?? '';
                sheet.getCell(nRowIdx, 9).value = row.MATL_NAME ?? '';
                sheet.getCell(nRowIdx, 10).value = row.COLOR ?? '';
                sheet.getCell(nRowIdx, 11).value = row.SPEC ?? '';
                sheet.getCell(nRowIdx, 12).value = row.UNIT ?? '';
                sheet.getCell(nRowIdx, 13).value = row.CONDITION ?? '';
                sheet.getCell(nRowIdx, 14).value = row.RACK ?? '';
                sheet.getCell(nRowIdx, 15).value = row.LOCATION ?? '';
                sheet.getCell(nRowIdx, 16).value = Number(row.ORG_QTY ?? 0);
                sheet.getCell(nRowIdx, 17).value = Number(row.USE_QTY2 ?? 0);
                sheet.getCell(nRowIdx, 18).value = Number(row.OKUSE_QTY ?? 0);
                sheet.getCell(nRowIdx, 19).value = Number(row.DEFECT_QTY ?? 0);
                sheet.getCell(nRowIdx, 20).value = Number(row.SHORT_QTY ?? 0);
                sheet.getCell(nRowIdx, 21).value = {
                    formula: `Q${nRowIdx}-R${nRowIdx}-S${nRowIdx}-T${nRowIdx}`,
                };
                sheet.getCell(nRowIdx, 22).value = {
                    formula: `S${nRowIdx}+U${nRowIdx}`,
                };
                sheet.getCell(nRowIdx, 23).value = row.REASON ?? '';
                sheet.getCell(nRowIdx, 24).value = row.USE_DATE ?? '';

                sheet.getCell(nRowIdx, 16).numFmt = '#,##0';
                sheet.getCell(nRowIdx, 17).numFmt = '#,##0';
                sheet.getCell(nRowIdx, 18).numFmt = '#,##0';
                sheet.getCell(nRowIdx, 19).numFmt = '#,##0';
                sheet.getCell(nRowIdx, 20).numFmt = '#,##0';
                sheet.getCell(nRowIdx, 21).numFmt = '#,##0';
                sheet.getCell(nRowIdx, 22).numFmt = '#,##0';

                sheet.getCell(nRowIdx, 16).alignment = {
                    horizontal: 'right',
                    vertical: 'middle',
                };
                sheet.getCell(nRowIdx, 17).alignment = {
                    horizontal: 'right',
                    vertical: 'middle',
                };
                sheet.getCell(nRowIdx, 18).alignment = {
                    horizontal: 'right',
                    vertical: 'middle',
                };
                sheet.getCell(nRowIdx, 19).alignment = {
                    horizontal: 'right',
                    vertical: 'middle',
                };
                sheet.getCell(nRowIdx, 20).alignment = {
                    horizontal: 'right',
                    vertical: 'middle',
                };
                sheet.getCell(nRowIdx, 21).alignment = {
                    horizontal: 'right',
                    vertical: 'middle',
                };
                sheet.getCell(nRowIdx, 22).alignment = {
                    horizontal: 'right',
                    vertical: 'middle',
                };

                // 각 셀 테두리 적용 (A~X)
                for (let c = 1; c <= 24; c++) {
                    const cell = sheet.getCell(nRowIdx, c);
                    cell.border = thinBorder;
                    cell.alignment = {
                        ...cell.alignment,
                        vertical: 'middle',
                        wrapText: true,
                    };
                    cell.font = { name: '돋움', size: 11, bold: false };
                }

                nRowIdx++;
            });

            const userId = AFLib.getUserInfo(contextValue).USER_ID;
            const nowStr = moment().format('YYYYMMDDHHmmss');
            const tWExcelFile = `Stock Check Form_${args.data[0].PO_CD}-${userId}-${nowStr}`;
            const uploadInfo = await generateUploadURL();
            const uploadURL = uploadInfo.uploadURL;
            const fileURL = uploadURL.split('?')[0];
            const title = `Stock Check Form_${args.data[0].PO_CD}`;
            const fileKey = `Stock Check Form_${args.data[0].PO_CD}`;

            await prisma.$queryRaw(
                Prisma.raw(
                    `
                        delete from kcd_fileinfo
                        where
                            title = '${title}'
                            and file_key = '${fileKey}'
                            and kind = 'S0516'
                    `,
                ),
            );

            await prisma.$queryRaw(
                Prisma.raw(
                    AFLib.createTableSql('kcd_fileinfo', {
                        title: title,
                        kind: 'S0516',
                        file_key: fileKey,
                        name: tWExcelFile,
                        url: fileURL,
                        upd_datetime: AFLib.getCurrTime(),
                        upd_user: userId,
                    }),
                ),
            );

            return await upload(`${tWExcelFile}.xlsx`, wb, uploadURL);
        },
    },
};

export default moduleQuery_S0516_EXPORT_EXCEL;
