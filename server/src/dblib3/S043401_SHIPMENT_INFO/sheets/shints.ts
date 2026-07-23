const momentRaw = require('moment');
const moment =
    typeof momentRaw === 'function' ? momentRaw : momentRaw.default;
import { applyPortInfo } from './portUtil';

export default async function shints(ctx) {
    const {
        wb,
        tPackCd,
        shipMode,
        strFacName2,
        strAddr12,
        strAddr22,
        strTel2,
        strFax2,
        tShipmentObj,
        stsInvoiceSumAmt,
        ptab_ctqty,
        vendor_ctqty,
        strTotalPLAmt1,
    } = ctx;

    const sheet = wb.getWorksheet('SHINTS');
    const stsInvoiceSheet = wb.getWorksheet('STS.INVOICE');
    const stsInvoiceGrandTotalRow = stsInvoiceSheet.lastRow?.number || 0;
    const stsInvoiceNetWeightRef =
        stsInvoiceGrandTotalRow > 0
            ? `'${stsInvoiceSheet.name}'!I${stsInvoiceGrandTotalRow}`
            : '0';

    // PACK NO
    sheet.getCell(4, 7).value = tPackCd;

    // ETD
    let etd = moment(tShipmentObj.ETD, 'YYYYMMDD', true);
    sheet.getCell(4, 11).value = etd.isValid() ? etd.toDate() : null;
    sheet.getCell(4, 11).numFmt = 'DD-MMM-YY';

    // STS.INVOICE 합계 금액을 SHINTS에 반영
    sheet.getCell(29, 10).value = { formula: `${stsInvoiceSumAmt}` };

    // CT / Net / Gross 입력
    sheet.getCell(16, 9).value =
        parseFloat(ptab_ctqty) - parseFloat(vendor_ctqty);
    sheet.getCell(17, 9).value = { formula: stsInvoiceNetWeightRef };
    sheet.getCell(18, 9).value = { formula: `${stsInvoiceNetWeightRef}*1.1` };

    // 기타 금액 계산식 입력 (수정하지 말것) : 1500달러 기준으로 비율 계산 + 보험료 0.026% 적용
    sheet.getCell(13, 10).value = { formula: `=1500/${strTotalPLAmt1}*J29` };
    sheet.getCell(14, 10).value = { formula: `=J29*1.1*0.026%` };
    sheet.getCell(24, 7).value = '';

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
        sheetType: 'SHINTS',
    });

    console.log('[PL_PRINT] SHINTS Sheet Done');
}
