const PORT_DISPLAY_MAP = {
    HAIPHONG: 'HAIPHONG, VIETNAM',
    HANOI: 'HANOI, VIETNAM',
    HOCHIMINH: 'HOCHIMINH, VIETNAM',

    'ADDIS ABABA': 'ADDIS ABABA, ETHIOPIA',
    DJIBOUTI: 'DJIBOUTI, DJIBOUTI',
    MOMBASA: 'MOMBASA, KENYA',

    SINGAPORE: 'SINGAPORE, SINGAPORE',
};

const getDisplayPort = (port) => {
    return PORT_DISPLAY_MAP[port] || port;
};

export const applyPortInfo = ({
    sheet,
    strFacName2 = '',
    strAddr12 = '',
    strAddr22 = '',
    strTel2 = '',
    strFax2 = '',
    tShipmentObj = {},
    sheetType = '',
}) => {
    const destination = tShipmentObj.DESTINATION || '';
    const selectedPort = tShipmentObj.PORT || '';
    const displayPort = getDisplayPort(selectedPort);
    const originPort = tShipmentObj.ORIGIN_PORT || '';

    // =========================
    // 1. Port of Loading
    // =========================
    if (originPort) {
        const KOREA_PORTS = [
            'INCHEON',
            'BUSAN',
            'GWANGYANG',
            'SEOUL',
            'SHINTS',
        ];

        let portText = originPort;

        const isKorea = KOREA_PORTS.some((p) => originPort.includes(p));

        if (isKorea && !originPort.includes('KOREA')) {
            portText = `${originPort}, KOREA`;
        } else {
            portText = getDisplayPort(originPort);
        }

        sheet.getCell(18, 1).value = portText;
    }

    // =========================
    // 2. Receiver 기본
    // =========================
    if (strFacName2) sheet.getCell(8, 1).value = strFacName2;
    if (strAddr12) sheet.getCell(9, 1).value = strAddr12;
    if (strAddr22) sheet.getCell(10, 1).value = strAddr22;

    if (strTel2 || strFax2) {
        sheet.getCell(11, 1).value =
            `TEL :${strTel2 || ''} FAX :${strFax2 || ''}`;
    }

    // =========================
    // 3. Consignee override
    // =========================
    if (destination === 'BVT') {
        sheet.getCell(8, 1).value = 'SHINTS BVT CO.,LTD VAT:0800006025';
        sheet.getCell(11, 1).value =
            'TEL :84-220-3861-727 FAX :84-220-3861-730';
        sheet.getCell(12, 1).value = 'XNK-Thy Ha <thyha@shintsbvt.com>';
    }

    if (destination === 'ETP') {
        sheet.getCell(11, 1).value = 'TEL: +251 92 084 3043';
        sheet.getCell(12, 1).value = 'Fithun_ETR / fithun@shintsetp.com';
    }

    // =========================
    // 4. Port of Discharge
    // =========================
    if (displayPort) {
        sheet.getCell(18, 4).value = displayPort;
    }

    // =========================
    // 5. CIF + Port
    // =========================
    if (displayPort) {
        sheet.getCell(24, 7).value = `CIF ${displayPort}`;
    }

    // =========================
    // 6. Remarks (ETP만)
    // =========================
    if (destination === 'ETP') {
        if (sheetType === 'SHINTS') {
            sheet.getCell(20, 7).value = 'PLACE OF DELIVERY';
            sheet.getCell(21, 7).value = 'BOLE LEMI BONDED WAREHOUSE, ETHIOPIA';
        } else {
            sheet.getCell(13, 7).value = 'PLACE OF DELIVERY';
            sheet.getCell(14, 7).value = 'BOLE LEMI BONDED WAREHOUSE, ETHIOPIA';
        }
    }

    // =========================
    // 7. Marks
    // =========================
    if (sheetType === 'C.INV') {
        sheet.getCell(25, 1).value = `SHINTS ${destination}`;
        sheet.getCell(26, 1).value = '(IN DIA)';
    } else if (sheetType === 'PAC') {
        sheet.getCell(27, 1).value = `SHINTS ${destination}`;
        sheet.getCell(28, 1).value = '(IN DIA)';
    }
};
