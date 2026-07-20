export default async function stsInvoice(ctx) {
    const { wb, arrSHINTS_INV } = ctx;
    const sheet = wb.getWorksheet('STS.INVOICE');

    console.log('[PL_PRINT][STEP-19] STS.INVOICE Sheet Write');

    let rowIndex = 4;

    for (let itemIndex = 0; itemIndex < arrSHINTS_INV.length; itemIndex++) {
        const item = { ...arrSHINTS_INV[itemIndex] };

        if (itemIndex > 0) {
            sheet.insertRow(rowIndex, [], 'i');
        }

        const usd = Number(item.usd || 0);
        const qty = Number(item.out_qty || 0);
        const weight = Number(item.weight || 0);

        sheet.getCell(rowIndex, 1).value = itemIndex + 1;
        sheet.getCell(rowIndex, 2).value = item.hs_cd;
        sheet.getCell(rowIndex, 3).value = item.matl_name;

        sheet.getCell(rowIndex, 4).value = usd;
        sheet.getCell(rowIndex, 4).numFmt = '#,##0.00';

        sheet.getCell(rowIndex, 5).value = qty;
        sheet.getCell(rowIndex, 5).numFmt = '#,##0';

        sheet.getCell(rowIndex, 6).value = item.unit;

        sheet.getCell(rowIndex, 7).value = {
            formula: `ROUND(D${rowIndex}*E${rowIndex},2)`,
        };
        sheet.getCell(rowIndex, 7).numFmt = '#,##0.00';

        sheet.getCell(rowIndex, 8).value = item.nat_name;

        sheet.getCell(rowIndex, 9).value = { formula: `${weight}*E${rowIndex}/1000`};
        sheet.getCell(rowIndex, 9).numFmt = '#,##0.00';

        sheet.getCell(rowIndex, 10).value = 'kg';
        sheet.getCell(rowIndex, 11).value = item.width;
        sheet.getCell(rowIndex, 12).value = item.comp_str;

        rowIndex++;
    }

    sheet.getCell(rowIndex, 5).value = { formula: `SUM(E4:E${rowIndex - 1})` };
    sheet.getCell(rowIndex, 5).numFmt = '#,##0';

    sheet.getCell(rowIndex, 7).value = { formula: `SUM(G4:G${rowIndex - 1})` };
    sheet.getCell(rowIndex, 7).numFmt = '#,##0.00';

    sheet.getCell(rowIndex, 9).value = { formula: `SUM(I4:I${rowIndex - 1})` };
    sheet.getCell(rowIndex, 9).numFmt = '#,##0.00';

    const stsInvoiceSumAmt = `'${sheet.name}'!G${rowIndex}`;

    console.log('[PL_PRINT] STS.INVOICE Sheet Done');

    return {
        stsInvoiceSumAmt,
        tSumNetWeight: `'${sheet.name}'!I${rowIndex}`,
        totalAmount: `'${sheet.name}'!G${rowIndex}`,
        totalOutQty: `'${sheet.name}'!E${rowIndex}`,
    };
}
