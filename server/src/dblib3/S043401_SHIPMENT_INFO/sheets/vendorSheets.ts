import { Prisma } from '@prisma/client';
import * as moment from 'moment';
import { setBodyFont, applyBorder, safeMerge } from './util';
import { applyPortInfo } from './portUtil';
const excelLib = require('../../../excelLib.js');

export default async function vendorSheets(ctx) {
    const {
        wb,
        arrVendorObj,
        arrVendor,
        tPackCd,
        shipMode,
        strFacName2,
        strAddr12,
        strAddr22,
        strTel2,
        strFax2,
        tShipmentObj,
        strTotalPLAmt1,
        tPath0,
    } = ctx;

    // Vendor 시트 기본 생성
    const baseVendorName = arrVendor[0];
    const baseSheetIndex = 8;
    const baseSheet = wb.worksheets[baseSheetIndex];

    // 템플릿 시트 이름 변경
    baseSheet.name = '_TEMPLATE_VENDOR_';

    if (arrVendor.length === 0) {
        wb.removeWorksheet(baseSheet.id);
    }

    // Vendor별 시트 생성 및 채우기
    for (
        let vendorIndex = 0;
        vendorIndex < arrVendorObj.length;
        vendorIndex++
    ) {
        const vendorObj = { ...arrVendorObj[vendorIndex] };
        const vendorName = vendorObj.vendor_name;

        excelLib.cloneSheet(baseSheet, wb, vendorName);

        const sheet = wb.getWorksheet(vendorName);

        if (sheet.views && sheet.views.length > 0) {
            sheet.views[0].showGridLines = false;
        } else {
            sheet.views = [{ showGridLines: false }];
        }

        // PACK NO / ETD 입력
        sheet.getCell(4, 7).value = tPackCd;

        const etd = moment(tShipmentObj.ETD, 'YYYYMMDD', true);
        sheet.getCell(4, 11).value = etd.isValid() ? etd.toDate() : null;
        sheet.getCell(4, 11).numFmt = 'DD-MMM-YY';

        // INV 영역 출력
        let rowIndex = 27;
        let totalAmount = 0;
        let sumNetWeight = 0;
        let sumGrossWeight = 0;

        const grouped = {};

        vendorObj.inv.forEach((item) => {
            const key = item.matl_name;

            if (!grouped[key]) {
                grouped[key] = {
                    ...item,
                    out_qty: 0,
                };
            }

            grouped[key].out_qty += parseFloat(item.out_qty || 0);
        });

        const mergedItems = Object.values(grouped);

        for (let itemIndex = 0; itemIndex < mergedItems.length; itemIndex++) {
            const item = { ...mergedItems[itemIndex] };

            if (itemIndex > 0) {
                sheet.insertRow(rowIndex, [], 'i');
            }

            sheet.getCell(rowIndex, 4).value = item.matl_name;
            sheet.getCell(rowIndex, 7).value = parseFloat(item.out_qty);
            sheet.getCell(rowIndex, 8).value = item.unit;
            sheet.getCell(rowIndex, 9).value = parseFloat(item.usd);
            sheet.getCell(rowIndex, 10).value = {
                formula: `=G${rowIndex}*I${rowIndex}`,
            };

            const weight = parseFloat(item.weight) / 1000;
            sheet.getCell(rowIndex, 11).value = weight;

            totalAmount += parseFloat(item.usd) * parseFloat(item.out_qty);
            sumNetWeight += weight;
            sumGrossWeight += weight * 1.1;

            rowIndex++;
        }

        if (mergedItems.length > 1) {
            const firstDetailRow = 27;
            const lastDetailRow = rowIndex - 1;

            for (let detailRow = firstDetailRow; detailRow <= lastDetailRow; detailRow++) {
                const border = {};

                if (detailRow === firstDetailRow) {
                    border.top = { style: 'thin' };
                }

                if (detailRow === lastDetailRow) {
                    border.bottom = { style: 'thin' };
                }

                sheet.getCell(detailRow, 11).border = border;
            }
        }

        if (vendorObj.inv.length <= 0) {
            rowIndex++;
        }

        sheet.getCell(17, 9).value = sumNetWeight;
        sheet.getCell(18, 9).value = sumGrossWeight;

        sheet.getCell(13, 10).value = {
            formula: `=1500/${strTotalPLAmt1}*${totalAmount}`,
        };
        sheet.getCell(14, 10).value = { formula: `=${totalAmount}*1.1*0.026%` };

        sheet.getCell(rowIndex, 10).value = {
            formula: `=SUM(J27:J${rowIndex - 1})`,
        };
        sheet.getCell(rowIndex, 11).value = {
            formula: `=SUM(K27:K${rowIndex - 1})`,
        };

        // PAC 시작 위치 탐색
        let pacStartRow = -1;

        sheet.eachRow((row, rowNumber) => {
            const value = sheet.getCell(rowNumber, 1).value;
            if (value && value.toString().trim() === 'DESC/SPEC') {
                pacStartRow = rowNumber + 1;
            }
        });

        if (!pacStartRow) {
            pacStartRow = rowIndex + 3;
        }

        rowIndex = pacStartRow;

        const printedSet = new Set();
        let vendorCtQty = 0;

        // PAC 영역 출력
        for (let itemIndex = 0; itemIndex < vendorObj.pac.length; itemIndex++) {
            const item = { ...vendorObj.pac[itemIndex] };

            vendorCtQty += parseFloat(item.ct_qty);

            const key = [
                item.spec || '',
                item.hs_cd || '',
                item.offer_spec || '',
                item.matl_name || '',
            ].join('||');

            if (printedSet.has(key)) continue;

            printedSet.add(key);

            if (printedSet.size > 1) {
                sheet.insertRow(rowIndex, [], 'i');
            }

            sheet.getCell(rowIndex, 1).value = item.spec;
            sheet.getCell(rowIndex, 4).value = item.hs_cd;
            sheet.getCell(rowIndex, 6).value = item.offer_spec;
            sheet.getCell(rowIndex, 12).value = item.matl_name;

            safeMerge(sheet, `A${rowIndex}:C${rowIndex}`);
            safeMerge(sheet, `D${rowIndex}:E${rowIndex}`);
            safeMerge(sheet, `F${rowIndex}:K${rowIndex}`);

            applyBorder(sheet, rowIndex, rowIndex, 'thin');

            rowIndex++;
        }

        sheet.getCell(16, 9).value = vendorCtQty;

        const imageId = wb.addImage({
            filename: `${tPath0}/sign.png`,
            extension: 'png',
        });

        sheet.addImage(imageId, {
            tl: { col: 8, row: rowIndex },
            ext: { width: 200, height: 110 },
        });

        const template = wb.getWorksheet('_TEMPLATE_VENDOR_');
        if (template) {
            wb.removeWorksheet(template.id);
        }

        applyPortInfo({
            sheet,
            tPackCd,
            shipMode,
            strFacName2,
            strAddr12,
            strAddr22,
            strTel2,
            strFax2,
            tShipmentObj,
        });

        console.log('[PL_PRINT] Vendor Sheet Done :', vendorName);
    }
}
