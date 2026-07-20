export default async function bvtInv(ctx) {
    const { wb, arrBVT_INV } = ctx;

    const sheet = wb.getWorksheet('BVT.INV');
    let rowIndex = 4;
    let grandTotalWeightCell;

    for (let idx = 0; idx < arrBVT_INV.length; idx++) {
        const item = { ...arrBVT_INV[idx] };

        if (idx > 0) {
            sheet.insertRow(rowIndex, [], 'i');
        }

        const usd = Number(item.usd || 0);
        const qty = Number(item.out_qty || 0);
        const weight = Number(item.weight || 0);

        sheet.getCell(rowIndex, 1).value = idx + 1;
        sheet.getCell(rowIndex, 2).value = item.hs_cd;
        sheet.getCell(rowIndex, 3).value = item.matl_name;

        sheet.getCell(rowIndex, 4).value = usd;
        sheet.getCell(rowIndex, 4).numFmt = '#,##0.00';
        sheet.getCell(rowIndex, 4).alignment = { horizontal: 'right' };

        sheet.getCell(rowIndex, 5).value = qty;
        sheet.getCell(rowIndex, 5).numFmt = '#,##0.########';
        sheet.getCell(rowIndex, 5).alignment = { horizontal: 'right' };

        sheet.getCell(rowIndex, 6).value = item.unit;

        sheet.getCell(rowIndex, 7).value = {
            formula: `ROUND(D${rowIndex}*E${rowIndex},2)`,
        };
        sheet.getCell(rowIndex, 7).numFmt = '#,##0.00';
        sheet.getCell(rowIndex, 7).alignment = { horizontal: 'right' };

        sheet.getCell(rowIndex, 8).value = item.nat_name;

        sheet.getCell(rowIndex, 9).value = { formula: `${weight}*E${rowIndex}/1000`};
        sheet.getCell(rowIndex, 9).numFmt = '#,##0.00';
        sheet.getCell(rowIndex, 9).alignment = { horizontal: 'right' };

        sheet.getCell(rowIndex, 10).value = 'kg';
        sheet.getCell(rowIndex, 11).value = item.hs_name;
        sheet.getCell(rowIndex, 12).value = item.width;
        sheet.getCell(rowIndex, 13).value = item.comp_str;

        rowIndex++;
    }

    sheet.getCell(rowIndex, 5).value = { formula: `SUM(E4:E${rowIndex - 1})` };
    sheet.getCell(rowIndex, 5).numFmt = '#,##0.########';
    sheet.getCell(rowIndex, 5).alignment = { horizontal: 'right' };

    sheet.getCell(rowIndex, 7).value = { formula: `SUM(G4:G${rowIndex - 1})` };
    sheet.getCell(rowIndex, 7).numFmt = '#,##0.00';
    sheet.getCell(rowIndex, 7).alignment = { horizontal: 'right' };

    sheet.getCell(rowIndex, 9).value = { formula: `SUM(I4:I${rowIndex - 1})` };
    sheet.getCell(rowIndex, 9).numFmt = '#,##0.00';
    sheet.getCell(rowIndex, 9).alignment = { horizontal: 'right' };

    grandTotalWeightCell = `'${sheet.name}'!I${rowIndex}`;

    console.log('[PL_PRINT] BVT.INV Sheet Done');
    return grandTotalWeightCell;
}
