import { Prisma } from '@prisma/client';
const momentRaw = require('moment');
const moment =
    typeof momentRaw === 'function' ? momentRaw : momentRaw.default;
import { setBodyFont, applyBorder, safeMerge } from './util';

export default async function dInv(ctx) {
    const { wb, arrPoObj, company, prisma, tPackCd, etd } = ctx;
    const sheet = wb.getWorksheet('D.INV');

    let poIndex = 0;
    let rowIndex = 1;

    for (poIndex = 0; poIndex < arrPoObj.length; poIndex++) {
        const poObj = { ...arrPoObj[poIndex] };

        const orderQuery = `
            SELECT
                C.ORDER_CD,
                D.STYLE_NAME,
                C.TOT_CNT,
                C.DUE_DATE
            FROM
                KSV_PO_MEM AS A
                INNER JOIN KSV_PO_MST AS B ON A.PO_CD = B.PO_CD
                INNER JOIN KCD_STYLE AS D
                INNER JOIN KSV_ORDER_MST AS C ON D.STYLE_CD = C.STYLE_CD ON A.ORDER_CD = C.ORDER_CD,
                kcd_buyer kcd_buyer,
                kcd_user kcd_user
            WHERE
                1 = 1
                and B.PO_CD = '${poObj.po_cd}'
                and left(c.order_cd, 2) = kcd_buyer.buyer_cd
                and kcd_buyer.reg_user = kcd_user.user_id
                and kcd_user.company_code = '${company}'
            GROUP BY
                C.ORDER_CD,
                D.STYLE_NAME,
                C.TOT_CNT,
                C.DUE_DATE
        `;

        const orderRows = await prisma.$queryRaw(Prisma.raw(orderQuery));

        if (orderRows.length > 0) {
            const title = `PROFORMA INVOICE FOR ${poObj.po_cd}${poObj.buyer_cd}`;

            const cell = sheet.getCell(rowIndex, 1);
            cell.value = title;

            try {
                sheet.unMergeCells(rowIndex, 1, rowIndex, 8);
            } catch (e) {}

            sheet.mergeCells(rowIndex, 1, rowIndex, 8);

            cell.alignment = {
                vertical: 'middle',
                horizontal: 'center',
            };

            cell.font = {
                size: 14,
                bold: true,
                underline: true,
            };

            sheet.getCell(rowIndex, 9).value = tPackCd;

            rowIndex += 2;

            createHeader(sheet, rowIndex);

            rowIndex++;
        }

        for (let orderIndex = 0; orderIndex < orderRows.length; orderIndex++) {
            const order = { ...orderRows[orderIndex] };

            if (orderIndex > 0) {
                const insertedRow = sheet.insertRow(rowIndex, []);

                insertedRow.eachCell(
                    { includeEmpty: true },
                    (cell, colNumber) => {
                        if (colNumber === 6) return;

                        cell.border = {
                            top: { style: 'thin' },
                            bottom: { style: 'thin' },
                        };
                    },
                );
            }

            sheet.getCell(rowIndex, 1).value = orderIndex + 1;
            sheet.getCell(rowIndex, 2).value = order.ORDER_CD;
            sheet.getCell(rowIndex, 3).value = order.STYLE_NAME;
            sheet.getCell(rowIndex, 3).alignment = { horizontal: 'left' };

            const quantity = Number(order.TOT_CNT || 0);
            const qtyCell = sheet.getCell(rowIndex, 4);
            qtyCell.value = quantity;
            qtyCell.alignment = { horizontal: 'right' };
            qtyCell.numFmt = '#,##0.###';

            sheet.getCell(rowIndex, 5).value = 'PCS';

            sheet.getCell(rowIndex, 6).value = etd.isValid()
                ? etd.toDate()
                : null;
            sheet.getCell(rowIndex, 6).numFmt = 'DD-MMM-YY';

            setBodyFont(sheet, rowIndex, 1, 13);
            rowIndex++;
        }

        rowIndex++;
        const headerRow = rowIndex;

        sheet.getCell(headerRow, 1).value = 'No.';
        sheet.getCell(headerRow, 2).value = 'HS No';
        sheet.getCell(headerRow, 3).value = 'Hs Name';
        sheet.getCell(headerRow, 4).value = 'Unit Price';
        sheet.getCell(headerRow, 5).value = "Q'ty";
        sheet.getCell(headerRow, 6).value = 'Unit';
        sheet.getCell(headerRow, 7).value = 'Amount';
        sheet.getCell(headerRow, 8).value = 'Country';
        sheet.getCell(headerRow, 9).value = 'Weight';

        for (let col = 1; col <= 9; col++) {
            const cell = sheet.getCell(headerRow, col);
            cell.font = { name: '돋움', size: 10, bold: true };
            cell.alignment = { horizontal: 'left', vertical: 'middle' };
            cell.border = { top: { style: 'thin' }, bottom: { style: 'thin' } };
        }

        rowIndex++;
        const startRowIndex = rowIndex;

        for (let itemIndex = 0; itemIndex < poObj.inv.length; itemIndex++) {
            const item = { ...poObj.inv[itemIndex] };

            if (itemIndex > 0) {
                sheet.insertRow(rowIndex, [], 'i');
            }

            const unitPrice = Number(Number(item.usd));
            const quantity = Number(item.out_qty || 0);
            const amount = Number((unitPrice * quantity).toFixed(2));
            const weight = Number(Number(item.weight || 0).toFixed(4));

            sheet.getCell(rowIndex, 1).value = itemIndex + 1;
            sheet.getCell(rowIndex, 2).value = item.hs_cd;
            sheet.getCell(rowIndex, 3).value = item.matl_name;
            sheet.getCell(rowIndex, 3).alignment = { horizontal: 'left' };

            const unitPriceCell = sheet.getCell(rowIndex, 4);
            unitPriceCell.value = unitPrice;
            unitPriceCell.alignment = { horizontal: 'right' };
            unitPriceCell.numFmt = '#,##0.00';

            const qtyCell = sheet.getCell(rowIndex, 5);
            qtyCell.value = quantity;
            qtyCell.alignment = { horizontal: 'right' };
            qtyCell.numFmt = '#,##0.###';

            sheet.getCell(rowIndex, 6).value = item.unit;

            const amountCell = sheet.getCell(rowIndex, 7);
            amountCell.value = amount;
            amountCell.alignment = { horizontal: 'right' };
            amountCell.numFmt = '#,##0.00';

            sheet.getCell(rowIndex, 8).value = item.nat_name;

            const weightCell = sheet.getCell(rowIndex, 9);
            weightCell.value = weight;
            weightCell.alignment = { horizontal: 'right' };
            weightCell.numFmt = '#,##0.00';

            sheet.getCell(rowIndex, 10).value = 'kg';
            sheet.getCell(rowIndex, 11).value = item.hs_name;
            sheet.getCell(rowIndex, 12).value = item.width;
            sheet.getCell(rowIndex, 13).value = item.comp_str;

            setBodyFont(sheet, rowIndex, 1, 13);
            rowIndex++;
        }

        if (poObj.inv.length <= 0) {
            rowIndex++;
        }

        const totalQtyCell = sheet.getCell(rowIndex, 5);
        totalQtyCell.value = {
            formula: `=SUM(E${startRowIndex}:E${rowIndex - 1})`,
        };
        totalQtyCell.alignment = { horizontal: 'right' };
        totalQtyCell.numFmt = '#,##0.###';

        const totalAmtCell = sheet.getCell(rowIndex, 7);
        totalAmtCell.value = {
            formula: `=SUM(G${startRowIndex}:G${rowIndex - 1})`,
        };
        totalAmtCell.alignment = { horizontal: 'right' };
        totalAmtCell.numFmt = '#,##0.00';

        sheet.getCell(rowIndex, 2).value = 'GRAND TOTAL :';
        setBodyFont(sheet, rowIndex, 1, 13);

        for (let col = 1; col <= 9; col++) {
            const cell = sheet.getCell(rowIndex, col);
            const prevBorder = cell.border || {};
            cell.border = { ...prevBorder, bottom: { style: 'double' } };
        }

        rowIndex += 4;
    }

    rowIndex += 2;
    sheet.getCell(rowIndex, 5).value = 'G.TOTAL';
    sheet.getCell(rowIndex, 7).value = {
        formula: `=VLOOKUP("GRAND TOTAL :",BVT.INV!B:I,6,0)`,
    };
    sheet.getCell(rowIndex, 7).numFmt = '#,##0.00';

    console.log('[PL_PRINT] D.INV Sheet Done');
}

function createHeader(sheet, rowIndex) {
    const headers = [
        'No.',
        'ORDER No.',
        'STYLE',
        'QUANTITY',
        'UNIT',
        'DELIVERY',
    ];

    headers.forEach((text, i) => {
        const cell = sheet.getCell(rowIndex, i + 1);

        cell.value = text;
        cell.font = {
            name: '돋움',
            size: 10,
            bold: true,
        };
        cell.alignment = {
            vertical: 'middle',
            horizontal: 'left',
        };
        cell.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
        };
    });
}
