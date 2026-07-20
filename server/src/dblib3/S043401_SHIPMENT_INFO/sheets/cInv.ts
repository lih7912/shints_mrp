import * as moment from 'moment';
import { applyPortInfo } from './portUtil';

export default async function cInv(ctx) {
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
    } = ctx;

    const sheet = wb.getWorksheet('C.INV');

    sheet.getCell(4, 7).value = tPackCd;

    const etd = moment(tShipmentObj.ETD, 'YYYYMMDD', true);
    sheet.getCell(4, 11).value = etd.isValid() ? etd.toDate() : null;
    sheet.getCell(4, 11).numFmt = 'DD-MMM-YY';

    // Invoice Total Amount
    sheet.getCell(31, 10).value = {
        formula: `=VLOOKUP("GRAND TOTAL :",BVT.INV!B:I,6,0)`,
    };

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
        sheetType: 'C.INV',
    });

    console.log('[PL_PRINT] C.INV Sheet Done');
}
