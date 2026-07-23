const momentRaw = require('moment');
const moment =
    typeof momentRaw === 'function' ? momentRaw : momentRaw.default;
import { applyPortInfo } from './portUtil';

export default async function pac(ctx) {
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
        bvtInvGrandTotalWeightCell,
    } = ctx;

    const sheet = wb.getWorksheet('PAC');

    sheet.getCell(4, 7).value = tPackCd;

    const etd = moment(tShipmentObj.ETD, 'YYYYMMDD', true);
    sheet.getCell(4, 11).value = etd.isValid() ? etd.toDate() : null;
    sheet.getCell(4, 11).numFmt = 'DD-MMM-YY';

    // TOTAL 계산
    sheet.getCell(25, 7).value = { formula: `=VLOOKUP("TOTAL",P!A:I,7,0)` };
    sheet.getCell(25, 9).value = { formula: `=${bvtInvGrandTotalWeightCell}` };
    sheet.getCell(25, 10).value = { formula: `=I25*1.1` };
    sheet.getCell(25, 11).value = { formula: `=J25/166` };

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
        sheetType: 'PAC',
    });

    console.log('[PL_PRINT] PAC Sheet Done');
}
