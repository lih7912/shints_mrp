// Description: 엑셀 파일을 다루기 위한 함수들을 정의한 파일입니다.
function cloneSheet(sourceSheet, workbook, newSheetName) {
    const newSheet = workbook.addWorksheet(newSheetName); // excel.js는 마지막에만 새로운 시트를 추가 할 수 있음.

    // 복사: 열 구성 (너비 포함)
    sourceSheet.columns.forEach((col, index) => {
        newSheet.getColumn(index + 1).width = col.width;
        newSheet.getColumn(index + 1).style = { ...col.style };
    });

    // 복사: 행과 셀
    sourceSheet.eachRow({ includeEmpty: true }, (row, rowIndex) => {
        const newRow = newSheet.getRow(rowIndex);
        row.eachCell({ includeEmpty: true }, (cell, colIndex) => {
            const newCell = newRow.getCell(colIndex);
            newCell.value = cell.value;
            newCell.style = { ...cell.style };
        });
        newRow.height = row.height;
        newRow.commit();
    });

    // 복사: 병합된 셀
    if (sourceSheet.model && sourceSheet.model.merges) {
        sourceSheet.model.merges.forEach((range) => {
            newSheet.mergeCells(range);
        });
    }

    // 이미지 복사
    const imageMap = new Map();
    workbook.media.forEach((media, imageId) => {
        imageMap.set(imageId, media);
    });

    if (sourceSheet.getImages) {
        const images = sourceSheet.getImages(); // [{ imageId, range }]
        images.forEach(({ imageId, range }) => {
            const image = imageMap.get(imageId);
            if (image) {
                newSheet.addImage(imageId, range);
            }
        });
    }

    return newSheet;
}

// 열 별로 같은 값이 연속되는 행을 병합하는 함수
function mergeCellsInColumn(workbook, sheetIndex, startRow, col) {
    worksheet = workbook.worksheets[sheetIndex];

    lastValue = worksheet.getCell(`${col}${startRow}`).value;

    for (let row = startRow + 1; row <= worksheet.rowCount; row++) {
        const currentValue = worksheet.getCell(`${col}${row}`).value;

        if (currentValue !== lastValue) {
            if (row - 1 > startRow) {
                try {
                    worksheet.mergeCells(`${col}${startRow}:${col}${row - 1}`);

                    // 병합된 셀 가운데 정렬 설정
                    const mergedCell = worksheet.getCell(`${col}${startRow}`);
                    mergedCell.alignment = {
                        vertical: 'middle',
                        horizontal: 'center',
                    };
                } catch (err) {
                    console.error(
                        `Merge failed at ${col}${startRow}:${col}${row - 1}`,
                    );
                }
            }
            startRow = row;
            lastValue = currentValue;
        }
    }

    // 마지막 병합 대상 처리
    if (worksheet.rowCount > startRow) {
        worksheet.mergeCells(`${col}${startRow}:${col}${worksheet.rowCount}`);
    }

    // 열 전체 셀 가운데 정렬
    worksheet.getColumn(`${col}`).eachCell((cell) => {
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
    });
}

// 행 복사 함수
function rowCopy(sheet, sourceStartRow, sourceEndRow, targetStartRow) {
    for (let i = 0; i <= sourceEndRow - sourceStartRow; i++) {
        const sourceRow = sheet.getRow(sourceStartRow + i);
        const targetRow = sheet.getRow(targetStartRow + i);

        sourceRow.eachCell({ includeEmpty: true }, (cell, colNumber) => {
            const targetCell = targetRow.getCell(colNumber);

            // 값 (수식 포함) 복사
            targetCell.value = JSON.parse(JSON.stringify(cell.value));

            // 스타일 복사
            targetCell.style = JSON.parse(JSON.stringify(cell.style));
        });

        // 행 높이 복사
        targetRow.height = sourceRow.height;

        // 변경 사항 적용
        targetRow.commit();
    }

    const rowOffset = targetStartRow - sourceStartRow;

    // 2. 병합 셀 복사
    const merges = sheet.model.merges || [];
    merges.forEach((mergeRange) => {
        const match = mergeRange.match(/^([A-Z]+)(\d+):([A-Z]+)(\d+)$/);
        if (match) {
            const [, startCol, startRow, endCol, endRow] = match;
            const sRow = parseInt(startRow);
            const eRow = parseInt(endRow);

            // 복사 대상 행 범위 안에 있는 병합만 복사
            if (sRow >= sourceStartRow && eRow <= sourceEndRow) {
                const newStartRow = sRow + rowOffset;
                const newEndRow = eRow + rowOffset;

                const newMergeRange = `${startCol}${newStartRow}:${endCol}${newEndRow}`;
                sheet.mergeCells(newMergeRange);
            }
        }
    });
}

function rowCopy1(sheet, sourceStartRow, sourceEndRow, targetStartRow) {
    for (let i = 0; i <= sourceEndRow - sourceStartRow; i++) {
        const sourceRow = sheet.getRow(sourceStartRow + i);
        const targetRow = sheet.getRow(targetStartRow + i);

        sourceRow.eachCell({ includeEmpty: true }, (cell, colNumber) => {
            const targetCell = targetRow.getCell(colNumber);

            // 값 (수식 포함) 복사
            targetCell.value = JSON.parse(JSON.stringify(cell.value));

            // 스타일 복사
            targetCell.style = JSON.parse(JSON.stringify(cell.style));
        });

        // 행 높이 복사
        targetRow.height = sourceRow.height;

        // 변경 사항 적용
        targetRow.commit();
    }
}

module.exports = {
    cloneSheet,
    mergeCellsInColumn,
    rowCopy,
    rowCopy1,
};
