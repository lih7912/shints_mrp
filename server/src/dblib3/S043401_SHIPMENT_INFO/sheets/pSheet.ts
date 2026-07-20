export default async function pSheet(ctx) {
    const { wb, arrP_PAC } = ctx;
    const sheet = wb.getWorksheet('P');

    const toNumber = (value) => {
        if (value === null || value === undefined) return 0;
        if (typeof value === 'object' && value.result)
            return Number(value.result);
        return Number(value);
    };

    let rowIndex = 4;

    // 데이터 출력
    arrP_PAC.forEach((item, itemIndex) => {
        if (itemIndex > 0) sheet.insertRow(rowIndex, [], 'i');

        sheet.getCell(rowIndex, 1).value = item.vendor_name;
        sheet.getCell(rowIndex, 2).value = item.matl_name;
        sheet.getCell(rowIndex, 3).value = item.color;
        sheet.getCell(rowIndex, 4).value = item.spec;
        sheet.getCell(rowIndex, 5).value = item.unit;
        sheet.getCell(rowIndex, 6).value = parseFloat(item.out_qty);
        sheet.getCell(rowIndex, 7).value = parseFloat(item.ct_qty);
        sheet.getCell(rowIndex, 8).value = item.ct_no;
        sheet.getCell(rowIndex, 9).value = item.remark;

        rowIndex++;
    });

    // G/H/I 병합 처리
    const startRow = 4;
    const endRow = rowIndex - 1;
    let groupStartRow = null;

    for (let r = startRow; r <= endRow; r++) {
        const ctQtyValue = toNumber(sheet.getCell(r, 7).value);
        const isGroupStart = ctQtyValue > 0;

        if (isGroupStart) {
            if (groupStartRow !== null && groupStartRow < r - 1) {
                sheet.mergeCells(`G${groupStartRow}:G${r - 1}`);
                sheet.mergeCells(`H${groupStartRow}:H${r - 1}`);
                sheet.mergeCells(`I${groupStartRow}:I${r - 1}`);
            }
            groupStartRow = r;
        }

        if (r === endRow && groupStartRow !== null && groupStartRow < r) {
            sheet.mergeCells(`G${groupStartRow}:G${r}`);
            sheet.mergeCells(`H${groupStartRow}:H${r}`);
            sheet.mergeCells(`I${groupStartRow}:I${r}`);
        }
    }

    // TOTAL 라인
    sheet.getCell(rowIndex, 6).value = {
        formula: `=SUM(F4:F${rowIndex - 1})`,
    };

    sheet.getCell(rowIndex, 7).value = {
        formula: `=SUM(G4:G${rowIndex - 1})`,
    };

    console.log('[PL_PRINT] P Sheet Done');
}
