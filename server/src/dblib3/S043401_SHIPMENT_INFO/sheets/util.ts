export function setBodyFont(sheet, rowIdx, fromCol, toCol) {
    for (let c = fromCol; c <= toCol; c++) {
        const cell = sheet.getCell(rowIdx, c);
        cell.font = {
            name: '돋움',
            size: 10,
            bold: false,
        };
    }
}

export function applyBorder(sheet, startRow, endRow, thinOrThick = 'thin') {
    const LAST_COL = 10;

    for (let r = startRow; r <= endRow; r++) {
        for (let c = 1; c <= LAST_COL; c++) {
            const cell = sheet.getCell(r, c);
            cell.border = {
                top: { style: thinOrThick },
                left: { style: thinOrThick },
                bottom: { style: thinOrThick },
                right: { style: thinOrThick },
            };
        }
    }
}

export function safeMerge(sheet, range) {
    try {
        sheet.unMergeCells(range);
    } catch (e) {}

    sheet.mergeCells(range);
}
