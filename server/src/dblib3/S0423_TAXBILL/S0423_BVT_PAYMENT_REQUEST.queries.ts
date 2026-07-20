import { Prisma } from '@prisma/client';
import prisma from '../../db';
import AFLib from '../../commlib';
const Excel = require('exceljs');
const {
    generateUploadURL,
    deleteUploadObject,
    upload,
} = require('../../../routes/s3');
const moment = require('moment');
const path = require('path');

const moduleQuery_S0423_BVT_PAYMENT_REQUEST = {
    Query: {
        mgrQueryS0423_BVT_PAYMENT_REQUEST: async (_, args, contextValue) => {
            try {
                const tFilePath = path.join(
                    __dirname,
                    '../../../upload/excel_template/BVT_PAYMENT_REQUEST.xlsx',
                );
                const wb = new Excel.Workbook();
                await wb.xlsx.readFile(tFilePath);
                let ws = wb.getWorksheet('PAYMENT REQUEST');

                const vendorName = args.data[0].VENDOR_NAME || '';
                const targetCell = ws.getCell('B7');
                targetCell.value = `Nội dung, mục đích ( purpose):Making payment for ordering Carton box-${vendorName}`;
                targetCell.font = { name: 'Times New Roman', size: 11 };

                let startRow = 10;
                let seq = 1;
                const today = new Date();
                const thisMonth = today.getMonth() + 1;
                const thisYear = today.getFullYear();

                for (const item of args.data) {
                    const row = ws.getRow(startRow);
                    if (startRow > 10) {
                        ws.insertRow(startRow);
                    }

                    row.getCell(1).value = seq; // No
                    row.getCell(1).alignment = { horizontal: 'center' };
                    row.getCell(2).value =
                        `Payment in ${today.toLocaleString('en-US', { month: 'short' })}-${thisYear}`;
                    row.getCell(3).value = item.VENDOR_NAME;
                    row.getCell(3).alignment = { horizontal: 'left' };
                    row.getCell(4).value = '';
                    row.getCell(5).value = '';
                    row.getCell(6).value = item.CURR_CD;
                    row.getCell(6).alignment = { horizontal: 'center' };
                    row.getCell(7).value = Number(item.IN_PAY_AMT) || 0;
                    row.getCell(7).numFmt = '#,##0';
                    row.getCell(7).alignment = { horizontal: 'right' };
                    row.getCell(8).value = moment(
                        item.PAY_DATE,
                        'YYYYMMDD',
                    ).format('YYYY-MM-DD');
                    row.getCell(8).alignment = { horizontal: 'center' };

                    // 테두리 적용
                    row.eachCell((cell) => {
                        cell.border = {
                            top: { style: 'thin' },
                            left: { style: 'thin' },
                            bottom: { style: 'thin' },
                            right: { style: 'thin' },
                        };
                        cell.font = { name: 'Times New Roman', size: 11 };
                        cell.alignment = { vertical: 'middle' };
                    });

                    startRow++;
                    seq++;
                }

                let totalRow = ws.getRow(startRow);
                totalRow.getCell(6).value = 'Tổng cộng (Total)';
                totalRow.getCell(6).alignment = {
                    horizontal: 'right',
                    bold: true,
                };

                const sum = args.data.reduce(
                    (acc, cur) => acc + Number(cur.IN_PAY_AMT || 0),
                    0,
                );
                totalRow.getCell(7).value = sum;
                totalRow.getCell(7).numFmt = '#,##0';
                totalRow.getCell(7).alignment = { horizontal: 'right' };

                totalRow.eachCell((cell) => {
                    cell.border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' },
                    };
                });

                const dateRow = ws.getRow(startRow + 2);
                const day = today.getDate();
                dateRow.getCell(5).value =
                    `Ngày (Date) ${day}    Tháng (Month) ${thisMonth}    Năm (Year) ${thisYear}`;
                dateRow.alignment = {
                    horizontal: 'center',
                    vertical: 'middle',
                };

                /*** DETAIL ***/
                ws = wb.getWorksheet('DETAIL');
                const tMonthTitle = moment().format('MMM-YYYY').toUpperCase();
                const titleCell = ws.getCell('A3');
                titleCell.value = `ACCOUNT PAYABLE FOR (${tMonthTitle})`;
                titleCell.font = {
                    name: 'Times New Roman',
                    size: 14,
                    bold: true,
                };
                titleCell.alignment = {
                    horizontal: 'center',
                    vertical: 'middle',
                };

                const supplierCell = ws.getCell('A5');
                supplierCell.value = `Supplier : ${vendorName}`;
                supplierCell.font = {
                    name: 'Times New Roman',
                    size: 14,
                    bold: true,
                };
                supplierCell.alignment = {
                    horizontal: 'left',
                    vertical: 'middle',
                };

                let rowIdx = 8;
                let sumInQty = 0;
                let sumPayAmt = 0;
                let sumVat = 0;

                for (const item of args.data) {
                    let billNo = item.BILL_CD;
                    let query = `
                        SELECT
                            A.PO_CD,
                            LEFT(A.ORDER_CD, 2) AS BUYER_CD,
                            A.ORDER_CD,
                            A.MATL_CD,
                            B.MATL_NAME,
                            B.COLOR,
                            B.SPEC,
                            A.PAY_CURR_CD,
                            A.PAY_PRICE,
                            D.VENDOR_NAME AS SUPPLIER,
                            F.FACTORY_NAME AS FACTORY,
                            sum(a.in_qty) as IN_QTY,
                            sum(a.in_qty * a.pay_price) as PO_AMT,
                            sum(round((a.in_qty * a.pay_price) * 0.1, 0)) as VAT,
                            sum(a.in_qty * a.pay_price) AS PAY_AMT
                        from
                            KSV_STOCK_IN A
                            JOIN KCD_MATL_MST B ON A.MATL_CD = B.MATL_CD
                            JOIN KCD_VENDOR D ON B.VENDOR_CD = D.VENDOR_CD
                            JOIN KSV_ORDER_MST E ON A.ORDER_CD = E.ORDER_CD
                            JOIN KCD_FACTORY F ON E.FACTORY_CD = F.FACTORY_CD
                        where
                            1 = 1
                            and a.bill_no = '${billNo}'
                            and a.in_qty > 0
                            and a.lc_qty <= 0
                            AND PAY_DATE BETWEEN '${args.qry.S_PAY_DATE}' AND '${args.qry.E_PAY_DATE}'
                        group by
                            A.PO_CD,
                            LEFT(A.ORDER_CD, 2),
                            A.ORDER_CD,
                            A.MATL_CD,
                            B.MATL_NAME,
                            B.COLOR,
                            B.SPEC,
                            A.PAY_CURR_CD,
                            A.PAY_PRICE,
                            D.VENDOR_NAME,
                            F.FACTORY_NAME
                    `;
                    let rows = await prisma.$queryRaw<any[]>(Prisma.raw(query));

                    for (const r of rows) {
                        const rws = ws.getRow(rowIdx);
                        if (rowIdx > 8) ws.insertRow(rowIdx);

                        rws.getCell('A').value = r.PO_CD ?? '';
                        rws.getCell('B').value = r.BUYER_CD ?? '';
                        rws.getCell('C').value = r.MATL_CD ?? '';
                        rws.getCell('D').value = r.MATL_NAME ?? '';
                        rws.getCell('E').value = r.COLOR ?? '';
                        rws.getCell('F').value = r.SPEC ?? '';
                        rws.getCell('G').value = Number(r.IN_QTY) || 0;
                        rws.getCell('H').value = r.PAY_CURR_CD ?? '';
                        rws.getCell('I').value = Number(r.PAY_PRICE) || 0;
                        rws.getCell('J').value = Number(r.PAY_AMT) || 0;
                        rws.getCell('K').value = Number(r.VAT) || 0;
                        rws.getCell('L').value = '';
                        rws.getCell('M').value = '';
                        rws.getCell('N').value = r.SUPPLIER ?? '';
                        rws.getCell('O').value = r.FACTORY ?? '';

                        rws.eachCell((cell, colNumber) => {
                            cell.font = { name: 'Times New Roman', size: 11 };
                            cell.alignment = {
                                vertical: 'middle',
                                horizontal:
                                    colNumber >= 7 && colNumber <= 12
                                        ? 'right'
                                        : 'left',
                            };
                            if (colNumber >= 7 && colNumber <= 12)
                                cell.numFmt = '#,##0.##';
                            cell.border = {
                                top: { style: 'thin' },
                                left: { style: 'thin' },
                                bottom: { style: 'thin' },
                                right: { style: 'thin' },
                            };
                        });

                        sumInQty += Number(r.IN_QTY) || 0;
                        sumPayAmt += Number(r.PAY_AMT) || 0;
                        sumVat += Number(r.VAT) || 0;
                        rowIdx++;
                    }

                    // TaxBill Ok 처리
                    var sqlUp = `
                        update ksv_stock_in
                        set
                            calc_flag = '1'
                        where
                            bill_no = '${billNo}'
                    `;
                    var retUp = await prisma.$queryRaw(Prisma.raw(sqlUp));
                }

                const sumRowIdx = rowIdx;
                const vatRowIdx = rowIdx + 1;
                const totalRowIdx = rowIdx + 2;

                const sumRow = ws.getRow(sumRowIdx);
                sumRow.getCell('G').value = sumInQty;
                sumRow.getCell('G').numFmt = '#,##0';
                sumRow.getCell('J').value = sumPayAmt;
                sumRow.getCell('J').numFmt = '#,##0';
                sumRow.eachCell((cell) => {
                    cell.font = {
                        name: 'Times New Roman',
                        size: 11,
                        bold: true,
                    };
                    cell.alignment = {
                        vertical: 'middle',
                        horizontal: 'right',
                    };
                    cell.border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' },
                    };
                });

                const vatRow = ws.getRow(vatRowIdx);
                vatRow.getCell('J').value = sumVat;
                vatRow.getCell('J').numFmt = '#,##0';
                vatRow.eachCell((cell) => {
                    cell.font = {
                        name: 'Times New Roman',
                        size: 11,
                        bold: true,
                    };
                    cell.alignment = {
                        vertical: 'middle',
                        horizontal: 'right',
                    };
                    cell.border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' },
                    };
                });

                const grandTotal =
                    sumPayAmt + sumVat !== sum ? sum : sumPayAmt + sumVat;
                totalRow = ws.getRow(totalRowIdx);
                totalRow.getCell('J').value = grandTotal;
                totalRow.getCell('J').numFmt = '#,##0';
                totalRow.eachCell((cell) => {
                    cell.font = {
                        name: 'Times New Roman',
                        size: 11,
                        bold: true,
                    };
                    cell.alignment = {
                        vertical: 'middle',
                        horizontal: 'right',
                    };
                    cell.border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' },
                    };
                });

                const tWExcelFile = `BVT_PAYMENT_REQUEST_${moment().format('YYYYMMDD_HHMMSS')}`;
                return await upload(`${tWExcelFile}.xlsx`, wb);
            } catch (e) {
                return [{ id: 1, CODE: `ERROR:Excel Print:${e.message}` }];
            }
        },
    },
};

export default moduleQuery_S0423_BVT_PAYMENT_REQUEST;
