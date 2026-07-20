import { setBodyFont, applyBorder, safeMerge } from './util';

export default async function dPac(ctx) {
    const { wb, arrPoObj } = ctx;

    const sheet = wb.getWorksheet('D.PAC');

    let tRowIdx = 1;

    for (let tIdx2 = 0; tIdx2 < arrPoObj.length; tIdx2++) {
        var objPo = { ...arrPoObj[tIdx2] };

        if (objPo.pac.length === 0) continue;

        // 제목 위 한 줄 비우기
        tRowIdx += 1;

        // 제목 행: DETAIL PACKING LIST FOR ...
        sheet.mergeCells(`A${tRowIdx}:J${tRowIdx}`);
        const titleCell = sheet.getCell(tRowIdx, 1);
        titleCell.value = `DETAIL PACKING LIST FOR ${objPo.po_cd}${objPo.buyer_cd}`;
        titleCell.font = {
            name: '돋움',
            size: 16,
            bold: true,
        };
        titleCell.alignment = {
            horizontal: 'center',
            vertical: 'middle',
        };

        tRowIdx += 1;

        // 헤더 행
        const headerRow = tRowIdx;
        sheet.getCell(headerRow, 1).value = 'Supplier';
        sheet.getCell(headerRow, 2).value = 'MATL CODE';
        sheet.getCell(headerRow, 3).value = 'DESCRIPTION';
        sheet.getCell(headerRow, 4).value = 'COLOR';
        sheet.getCell(headerRow, 5).value = 'SPEC';
        sheet.getCell(headerRow, 6).value = 'UNIT';
        sheet.getCell(headerRow, 7).value = "IN-Q'TY";
        sheet.getCell(headerRow, 8).value = "C/T Q'ty";
        sheet.getCell(headerRow, 9).value = 'C/T No.';
        sheet.getCell(headerRow, 10).value = 'Remark';

        for (let c = 1; c <= 10; c++) {
            const cell = sheet.getCell(headerRow, c);
            cell.font = { name: '돋움', size: 10, bold: true };
            cell.alignment = { horizontal: 'center', vertical: 'middle' };
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' },
            };
        }

        tRowIdx += 1;

        const dataStartRow = tRowIdx;

        // Check CtQty
        var saveRowIdx = tRowIdx;

        for (let i = 0; i < objPo.pac.length; i++) {
            const tOne = { ...objPo.pac[i] };
            const row = tRowIdx;

            if (i > 0) {
                sheet.insertRow(row, []);
                const baseRow = sheet.getRow(row - 1);
                const newRow = sheet.getRow(row);
                newRow.height = baseRow.height;
                baseRow.eachCell({ includeEmpty: true }, (cell, colNumber) => {
                    const target = newRow.getCell(colNumber);
                    target.style = { ...cell.style };
                });
            }

            // 바디 폰트/정렬 기본 세팅
            for (let c = 1; c <= 10; c++) {
                const cell = sheet.getCell(row, c);
                cell.font = { name: '돋움', size: 10, bold: false };
                cell.alignment = { horizontal: 'left', vertical: 'middle' };
            }
            sheet.getCell(row, 1).value = tOne.vendor_name;
            sheet.getCell(row, 2).value = tOne.matl_cd;
            sheet.getCell(row, 3).value = tOne.matl_name;
            sheet.getCell(row, 4).value = tOne.color;
            sheet.getCell(row, 5).value = tOne.spec;
            sheet.getCell(row, 6).value = tOne.unit;

            const cInQty = sheet.getCell(row, 7);
            cInQty.value =
                tOne.out_qty == null ? null : parseFloat(tOne.out_qty);
            cInQty.numFmt = '#,##0';
            cInQty.alignment = { horizontal: 'right' };

            const cCtQty = sheet.getCell(row, 8);
            cCtQty.value = tOne.ct_qty == null ? null : parseFloat(tOne.ct_qty);
            cInQty.numFmt = '#,##0';
            cCtQty.alignment = { horizontal: 'right' };

            sheet.getCell(row, 9).value = tOne.ct_no;
            sheet.getCell(row, 10).value = tOne.remark;

            sheet.getCell(row, 11).value = tOne.hs_cd;
            sheet.getCell(row, 12).value = tOne.hs_name;
            sheet.getCell(row, 13).value = tOne.width;
            sheet.getCell(row, 14).value = tOne.comp_str;

            tRowIdx += 1;
        }

        const totalRow = tRowIdx;

        sheet.insertRow(totalRow, []);
        const baseRowForTotal = sheet.getRow(totalRow - 1);
        const totalRowObj = sheet.getRow(totalRow);
        totalRowObj.height = baseRowForTotal.height;
        baseRowForTotal.eachCell({ includeEmpty: true }, (cell, colNumber) => {
            const target = totalRowObj.getCell(colNumber);
            target.style = { ...cell.style };
        });

        sheet.getCell(totalRow, 1).value = 'TOTAL';
        sheet.getCell(totalRow, 3).value = 'BALES';

        const cTotalIn = sheet.getCell(totalRow, 7);
        cTotalIn.value = { formula: `=SUM(G${dataStartRow}:G${totalRow - 1})` };
        cTotalIn.numFmt = '#,##0';
        cTotalIn.alignment = { horizontal: 'right' };

        // C/T Q'ty 합계 (H열, 8번 열)
        const cTotalCtQty = sheet.getCell(totalRow, 8);
        cTotalCtQty.value = {
            formula: `=SUM(H${dataStartRow}:H${totalRow - 1})`,
        };
        cTotalCtQty.numFmt = '#,##0';
        cTotalCtQty.alignment = { horizontal: 'right' };
        cTotalCtQty.font = { bold: true };
        sheet.getCell(totalRow, 9).value = '';
        sheet.getCell(totalRow, 10).value = '';

        // 블록 테두리: 데이터/헤더는 thin, TOTAL 은 thick
        applyBorder(sheet, headerRow, totalRow - 1, 'thin');
        applyBorder(sheet, totalRow, totalRow, 'thick');

        // ------------------------------
        // H, I, J 병합 처리
        // 0이 시작되는 행 + 바로 위 행 포함
        // ------------------------------
        let mergeStartRow = null;
        let inZeroBlock = false;

        for (let r = dataStartRow + 1; r <= totalRow - 1; r++) {
            const currCt = Number(sheet.getCell(r, 8).value);
            const prevCt = Number(sheet.getCell(r - 1, 8).value);

            const sameHIJ =
                sheet.getCell(r, 8).value === sheet.getCell(r - 1, 8).value &&
                sheet.getCell(r, 9).value === sheet.getCell(r - 1, 9).value &&
                sheet.getCell(r, 10).value === sheet.getCell(r - 1, 10).value;

            // 0이 처음 시작되는 순간
            if (!inZeroBlock && currCt === 0 && sameHIJ) {
                mergeStartRow = r - 1; // 바로 위 행 포함
                inZeroBlock = true;
                continue;
            }

            // 0 구간 계속
            if (inZeroBlock && currCt === 0 && sameHIJ) {
                continue;
            }

            // 0 구간 종료
            if (inZeroBlock) {
                const mergeEndRow = r - 1;

                sheet.mergeCells(mergeStartRow, 8, mergeEndRow, 8); // H
                sheet.mergeCells(mergeStartRow, 9, mergeEndRow, 9); // I
                sheet.mergeCells(mergeStartRow, 10, mergeEndRow, 10); // J

                mergeStartRow = null;
                inZeroBlock = false;
            }
        }

        // 마지막 블록 처리
        if (inZeroBlock && mergeStartRow !== null) {
            sheet.mergeCells(mergeStartRow, 8, totalRow - 1, 8);
            sheet.mergeCells(mergeStartRow, 9, totalRow - 1, 9);
            sheet.mergeCells(mergeStartRow, 10, totalRow - 1, 10);
        }

        // 다음 블록 시작 위치: TOTAL 바로 아래에서 한 줄 띄우고 시작
        tRowIdx = totalRow + 1;
    }

    console.log('[PL_PRINT] D.PAC Sheet Done');
}
