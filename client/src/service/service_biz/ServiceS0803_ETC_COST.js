var _a, _b;
const ACC_API_BASE_URL = ((_a = process.env.REACT_APP_ACC_API_BASE_URL) !== null && _a !== void 0 ? _a : 'https://insa.shints.com/AccApi').trim();
const DIRECT_INVOICE_ANALYZE_URL = ((_b = process.env.REACT_APP_INVOICE_ANALYZE_URL) !== null && _b !== void 0 ? _b : 'https://insa.shints.com/Api/ParseDocument').trim();
const readErrorMessage = async (response, fallbackMessage, htmlRuntimeMessage) => {
    const text = await response.text();
    if (!text) {
        return fallbackMessage;
    }
    const normalized = text.trim().toLowerCase();
    if (normalized.startsWith('<!doctype html') || normalized.startsWith('<html')) {
        if (text.includes('런타임 오류')) {
            return htmlRuntimeMessage !== null && htmlRuntimeMessage !== void 0 ? htmlRuntimeMessage : fallbackMessage;
        }
        return fallbackMessage;
    }
    try {
        const data = JSON.parse(text);
        const candidate = [
            data.message,
            data.Message,
            data.MSG,
            data.msg,
            data.error,
            data.Error,
            data.ERROR,
            data.detail,
            data.Detail,
            data.DETAIL,
        ].find((value) => typeof value === 'string' && value.trim());
        return (candidate === null || candidate === void 0 ? void 0 : candidate.trim()) || fallbackMessage;
    }
    catch {
        return text;
    }
};
const requestJson = async (url, init, fallbackMessage, htmlRuntimeMessage) => {
    const response = await fetch(url, init);
    if (!response.ok) {
        throw new Error(await readErrorMessage(response, fallbackMessage, htmlRuntimeMessage));
    }
    return (await response.json());
};
const buildUrl = (action, params) => {
    const normalizedBase = ACC_API_BASE_URL.endsWith('/') ? ACC_API_BASE_URL.slice(0, -1) : ACC_API_BASE_URL;
    const href = normalizedBase.startsWith('http')
        ? `${normalizedBase}/${action}`
        : `${window.location.origin}${normalizedBase}/${action}`;
    const url = new URL(href);
    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.set(key, value);
        });
    }
    return url.toString();
};
const parseAmountValue = (value) => {
    const text = String(value ?? '').replace(/,/g, '').trim();
    if (!text) {
        return 0;
    }
    const parsed = Number(text);
    return Number.isFinite(parsed) ? parsed : 0;
};
const formatListDateValue = (value) => {
    const digits = String(value ?? '').replace(/[^0-9]/g, '').trim();
    if (!digits) {
        return '-';
    }
    if (digits.length !== 8) {
        return String(value ?? '').trim() || '-';
    }
    return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6, 8)}`;
};
const pickArrayData = (data) => {
    if (Array.isArray(data)) {
        return data;
    }
    const candidates = [
        data === null || data === void 0 ? void 0 : data.rows,
        data === null || data === void 0 ? void 0 : data.ROWS,
        data === null || data === void 0 ? void 0 : data.data,
        data === null || data === void 0 ? void 0 : data.DATA,
        data === null || data === void 0 ? void 0 : data.list,
        data === null || data === void 0 ? void 0 : data.LIST,
        data === null || data === void 0 ? void 0 : data.result,
        data === null || data === void 0 ? void 0 : data.RESULT
    ];
    for (const candidate of candidates) {
        if (Array.isArray(candidate)) {
            return candidate;
        }
    }
    return [];
};
const mapOptions = (data) => {
    return ({
        costCenters: Array.isArray(data.costCenters) ? data.costCenters.map((item) => { var _a; return (_a = item.name) !== null && _a !== void 0 ? _a : ''; }) : [],
        accounts: Array.isArray(data.accounts) ? data.accounts.map((item) => { var _a; return (_a = item.name) !== null && _a !== void 0 ? _a : ''; }) : [],
        suppliers: Array.isArray(data.suppliers) ? data.suppliers.map((item) => { var _a; return (_a = item.name) !== null && _a !== void 0 ? _a : ''; }) : [],
        costCenterOptions: Array.isArray(data.costCenters)
            ? data.costCenters.map((item) => {
                var _a, _b, _c, _d, _e;
                return ({
                    code: String((_a = item.code) !== null && _a !== void 0 ? _a : ''),
                    name: String((_b = item.name) !== null && _b !== void 0 ? _b : ''),
                    label: String((_c = item.label) !== null && _c !== void 0 ? _c : `${(_d = item.code) !== null && _d !== void 0 ? _d : ''} ${(_e = item.name) !== null && _e !== void 0 ? _e : ''}`.trim()),
                });
            })
            : [],
        accountOptions: Array.isArray(data.accounts)
            ? data.accounts.map((item) => {
                var _a, _b, _c, _d, _e;
                return ({
                    code: String((_a = item.code) !== null && _a !== void 0 ? _a : ''),
                    name: String((_b = item.name) !== null && _b !== void 0 ? _b : ''),
                    label: String((_c = item.label) !== null && _c !== void 0 ? _c : `${(_d = item.code) !== null && _d !== void 0 ? _d : ''} ${(_e = item.name) !== null && _e !== void 0 ? _e : ''}`.trim()),
                });
            })
            : [],
        supplierOptions: Array.isArray(data.suppliers)
            ? data.suppliers.map((item) => {
                var _a, _b, _c, _d, _e, _f, _g;
                return ({
                    code: String((_a = item.code) !== null && _a !== void 0 ? _a : ''),
                    name: String((_b = item.name) !== null && _b !== void 0 ? _b : ''),
                    label: String((_c = item.label) !== null && _c !== void 0 ? _c : `${(_d = item.code) !== null && _d !== void 0 ? _d : ''} ${(_e = item.name) !== null && _e !== void 0 ? _e : ''}`.trim()),
                    regNo: String((_f = item.regNo) !== null && _f !== void 0 ? _f : ''),
                    invoiceName: String((_g = item.invoiceName) !== null && _g !== void 0 ? _g : ''),
                });
            })
            : [],
        currencies: Array.isArray(data.currencies) ? data.currencies.map((item) => String(item)) : [],
        actOptions: Array.isArray(data.actOptions) ? data.actOptions.map((item) => String(item)) : [],
        payTypeOptions: Array.isArray(data.payTypeOptions) ? data.payTypeOptions.map((item) => { var _a, _b; return ({ value: String((_a = item.value) !== null && _a !== void 0 ? _a : ''), label: String((_b = item.label) !== null && _b !== void 0 ? _b : '') }); }) : [],
        requestTypeOptions: Array.isArray(data.requestTypeOptions) ? data.requestTypeOptions.map((item) => { var _a, _b; return ({ value: String((_a = item.value) !== null && _a !== void 0 ? _a : ''), label: String((_b = item.label) !== null && _b !== void 0 ? _b : '') }); }) : [],
        taxTypeOptions: Array.isArray(data.taxTypeOptions) ? data.taxTypeOptions.map((item) => { var _a, _b; return ({ value: String((_a = item.value) !== null && _a !== void 0 ? _a : ''), label: String((_b = item.label) !== null && _b !== void 0 ? _b : '') }); }) : [],
        cardOptions: Array.isArray(data.cardOptions) ? data.cardOptions.map((item) => { var _a, _b; return ({ value: String((_a = item.value) !== null && _a !== void 0 ? _a : ''), label: String((_b = item.label) !== null && _b !== void 0 ? _b : '') }); }) : [],
        currentUser: {
            userId: String((((data.currentUser || {}).userId) ?? ((data.currentUser || {}).USER_ID) ?? data.USER_ID ?? '')),
            userName: String((((data.currentUser || {}).userName) ?? ((data.currentUser || {}).USER_NAME) ?? data.USER_NAME ?? '')),
            empNo: String((((data.currentUser || {}).empNo) ?? ((data.currentUser || {}).EMP_NO) ?? data.EMP_NO ?? '')),
            part: String((((data.currentUser || {}).part) ?? ((data.currentUser || {}).PART) ?? data.PART ?? '')),
            cdFlag: String((((data.currentUser || {}).cdFlag) ?? ((data.currentUser || {}).CD_FLAG) ?? data.CD_FLAG ?? '')),
            cdName: String((((data.currentUser || {}).cdName) ?? ((data.currentUser || {}).CD_NAME) ?? ((data.currentUser || {}).partNm) ?? ((data.currentUser || {}).PART_NM) ?? data.CD_NAME ?? data.PART_NM ?? '')),
            isAdmin: Boolean(data.currentUser && data.currentUser.isAdmin),
        },
    });
};
const statusMap = {
    등록: '등록',
    상신: '상신',
    취소: '취소',
    종결: '종결',
    삭제요청: '삭제요청',
    삭제완료: '삭제완료',
    전표: '전표',
    송금: '송금',
    반려: '반려',
    보관: '보관',
};
const mapRow = (row) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0;
    return ({
        id: String((_a = row.CD_SEQ) !== null && _a !== void 0 ? _a : ''),
        status: (_c = statusMap[String((_b = row.NM_STATUS) !== null && _b !== void 0 ? _b : '')]) !== null && _c !== void 0 ? _c : '등록',
        documentDate: formatListDateValue((_d = row.DT_DOCUMENT) !== null && _d !== void 0 ? _d : ''),
        requestDate: formatListDateValue((_e = row.DT_REQUEST) !== null && _e !== void 0 ? _e : ''),
        actualDate: formatListDateValue((_f = row.DT_ACTUAL) !== null && _f !== void 0 ? _f : ''),
        payType: String((_g = row.NM_PAY_TYPE) !== null && _g !== void 0 ? _g : ''),
        requestMethod: String((_h = row.NM_REQUEST_TYPE) !== null && _h !== void 0 ? _h : ''),
        cardLabel: String((_j = row.NM_CARD) !== null && _j !== void 0 ? _j : ''),
        costCenterCode: String((_k = row.CD_CC) !== null && _k !== void 0 ? _k : ''),
        costCenterName: String((_l = row.BUYER_NAME) !== null && _l !== void 0 ? _l : ''),
        accountCode: String((_m = row.CD_ACCT) !== null && _m !== void 0 ? _m : ''),
        accountName: String((_o = row.NM_DS) !== null && _o !== void 0 ? _o : ''),
        currency: String((_p = row.NM_CURR) !== null && _p !== void 0 ? _p : ''),
        actualAmount: Number((_q = row.ACTUAL) !== null && _q !== void 0 ? _q : 0),
        supplierCode: String((_r = row.CD_SUPPLIER) !== null && _r !== void 0 ? _r : ''),
        supplierName: String((_s = row.VENDOR_NAME) !== null && _s !== void 0 ? _s : ''),
        bankCode: String((_t = row.BANK_CD) !== null && _t !== void 0 ? _t : ''),
        bankName: String((_u = row.BANK_NAME) !== null && _u !== void 0 ? _u : ''),
        accountNo: String((_v = row.ACCOUNT_NO) !== null && _v !== void 0 ? _v : ''),
        bankAccountName: String((_w = row.ACCOUNT_NAME) !== null && _w !== void 0 ? _w : ''),
        title: String((_x = row.NM_REMARK) !== null && _x !== void 0 ? _x : ''),
        remark: String((_y = row.NM_REMARK) !== null && _y !== void 0 ? _y : ''),
        acDocNo: String((_z = row.NM_ACDOC) !== null && _z !== void 0 ? _z : ''),
        regInfo: String((_0 = row.REG_INFO) !== null && _0 !== void 0 ? _0 : ''),
    });
};
const mapDetail = (row) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20;
    return ({
        id: String((_a = row.CD_SEQ) !== null && _a !== void 0 ? _a : ''),
        status: (_c = statusMap[String((_b = row.NM_STATUS) !== null && _b !== void 0 ? _b : '')]) !== null && _c !== void 0 ? _c : '등록',
        statusCode: String((_d = row.CD_STATUS) !== null && _d !== void 0 ? _d : ''),
        documentDate: String((_e = row.DT_DOCUMENT) !== null && _e !== void 0 ? _e : ''),
        requestDate: String((_f = row.DT_REQUEST) !== null && _f !== void 0 ? _f : ''),
        actualDate: String((_g = row.DT_ACTUAL) !== null && _g !== void 0 ? _g : ''),
        costCenterCode: String((_h = row.CD_CC) !== null && _h !== void 0 ? _h : ''),
        costCenterName: String((_j = row.BUYER_NAME) !== null && _j !== void 0 ? _j : ''),
        accountCode: String((_k = row.CD_ACCT) !== null && _k !== void 0 ? _k : ''),
        accountName: String((_l = row.NM_DS) !== null && _l !== void 0 ? _l : ''),
        currency: String((_m = row.NM_CURR) !== null && _m !== void 0 ? _m : ''),
        amount: Number((_o = row.AMT) !== null && _o !== void 0 ? _o : 0),
        vat: Number((_p = row.VAT) !== null && _p !== void 0 ? _p : 0),
        total: Number((_q = row.TOT) !== null && _q !== void 0 ? _q : 0),
        minAmount: Number((_r = row.MIN_AMT) !== null && _r !== void 0 ? _r : 0),
        actualAmount: Number((_s = row.ACTUAL) !== null && _s !== void 0 ? _s : 0),
        supplierCode: String((_t = row.CD_SUPPLIER) !== null && _t !== void 0 ? _t : ''),
        supplierName: String((_u = row.VENDOR_NAME) !== null && _u !== void 0 ? _u : ''),
        supplierRegNo: String((_v = row.REG_NO) !== null && _v !== void 0 ? _v : ''),
        bankCode: String((_w = row.BANK_CD) !== null && _w !== void 0 ? _w : ''),
        bankName: String((_x = row.BANK_NAME) !== null && _x !== void 0 ? _x : ''),
        accountNo: String((_y = row.ACCOUNT_NO) !== null && _y !== void 0 ? _y : ''),
        bankAccountName: String((_z = row.ACCOUNT_NAME) !== null && _z !== void 0 ? _z : ''),
        swiftCode: String((_0 = row.SFTCODE) !== null && _0 !== void 0 ? _0 : ''),
        bankBranch: String((_1 = row.BANK_BRANCH) !== null && _1 !== void 0 ? _1 : ''),
        remark: String((_2 = row.NM_REMARK) !== null && _2 !== void 0 ? _2 : ''),
        actOption: String((_3 = row.ACT_OPTION) !== null && _3 !== void 0 ? _3 : ''),
        actRemark: String((_4 = row.ACT_REMARK) !== null && _4 !== void 0 ? _4 : ''),
        taxCode: String((_5 = row.CD_TAX) !== null && _5 !== void 0 ? _5 : ''),
        payTypeCode: String((_6 = row.CD_PAY_TYPE) !== null && _6 !== void 0 ? _6 : ''),
        requestTypeCode: String((_7 = row.CD_REQUEST_TYPE) !== null && _7 !== void 0 ? _7 : ''),
        cardCode: String((_8 = row.CD_CARD) !== null && _8 !== void 0 ? _8 : ''),
        acDocNo: String((_9 = row.NM_ACDOC) !== null && _9 !== void 0 ? _9 : ''),
        billCd: String((_10 = row.CD_BILL) !== null && _10 !== void 0 ? _10 : ''),
        payTypeLabel: String((_11 = row.NM_PAY_TYPE) !== null && _11 !== void 0 ? _11 : ''),
        requestTypeLabel: String((_12 = row.NM_REQUEST_TYPE) !== null && _12 !== void 0 ? _12 : ''),
        cardLabel: String((_13 = row.NM_CARD) !== null && _13 !== void 0 ? _13 : ''),
        taxLabel: String((_14 = row.NM_TAX) !== null && _14 !== void 0 ? _14 : ''),
        regInfo: String((_15 = row.REG_INFO) !== null && _15 !== void 0 ? _15 : ''),
        updInfo: String((_16 = row.UPD_INFO) !== null && _16 !== void 0 ? _16 : ''),
        gwInfo: String((_17 = row.GW_INFO) !== null && _17 !== void 0 ? _17 : ''),
        issueInfo: String((_18 = row.ISSUE_INFO) !== null && _18 !== void 0 ? _18 : ''),
        sendInfo: String((_19 = row.SEND_INFO) !== null && _19 !== void 0 ? _19 : ''),
        part: String((_20 = row.CD_PART) !== null && _20 !== void 0 ? _20 : ''),
    });
};
const mapBank = (row) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    return ({
        code: String((_a = row.BANK_CD) !== null && _a !== void 0 ? _a : ''),
        name: String((_b = row.BANK_NAME) !== null && _b !== void 0 ? _b : ''),
        accountNo: String((_c = row.ACCOUNT_NO) !== null && _c !== void 0 ? _c : ''),
        accountName: String((_d = row.ACCOUNT_NAME) !== null && _d !== void 0 ? _d : ''),
        swiftCode: String((_e = row.SFTCODE) !== null && _e !== void 0 ? _e : ''),
        branch: String((_f = row.BANK_BRANCH) !== null && _f !== void 0 ? _f : ''),
        label: `${(_g = row.BANK_CD) !== null && _g !== void 0 ? _g : ''} ${(_h = row.BANK_NAME) !== null && _h !== void 0 ? _h : ''} ${(_j = row.ACCOUNT_NAME) !== null && _j !== void 0 ? _j : ''}`.trim(),
    });
};
const mapTemplate = (row) => {
    var _a, _b;
    return ({
        id: String((_a = row.ID) !== null && _a !== void 0 ? _a : ''),
        title: String((_b = row.TITLE) !== null && _b !== void 0 ? _b : ''),
    });
};
const frm206StatusQueryMap = {
    ALL: 'ALL',
    '등록': '0',
    '상신': '1',
    '취소': '2',
    '종결': '3',
    '삭제요청': '4',
    '삭제완료': '5',
    '전표': '6',
    '송금': '7',
    '반려': '8',
    '보관': '9',
};
const normalizeFrm206StatusFilter = (status) => {
    const text = String(status !== null && status !== void 0 ? status : '').trim();
    return frm206StatusQueryMap[text] || text || 'ALL';
};
export const buildFrm206QueryString = (filters) => {
    const params = new URLSearchParams();
    params.set('dateType', filters.dateType);
    params.set('fromDate', filters.dateType === 'all' ? '' : filters.fromDate);
    params.set('toDate', filters.dateType === 'all' ? '' : filters.toDate);
    params.set('status', normalizeFrm206StatusFilter(filters.status));
    params.set('costCenter', filters.costCenter);
    params.set('account', filters.account);
    params.set('supplier', filters.supplier);
    return params.toString();
};
export const fetchFrm206Options = async (user) => {
    const data = await requestJson(buildUrl('GetFrm206Options', { userId: user.userId, part: user.part }), undefined, '자동완성 목록을 불러오지 못했습니다.');
    return mapOptions(data);
};
export const fetchFrm206Rows = async (filters, user) => {
    const data = await requestJson(buildUrl('GetFrm206List', {
        dateType: filters.dateType,
        fromDate: filters.dateType === 'all' ? '' : filters.fromDate,
        toDate: filters.dateType === 'all' ? '' : filters.toDate,
        status: normalizeFrm206StatusFilter(filters.status),
        costCenter: filters.costCenter,
        account: filters.account,
        supplier: filters.supplier,
        userId: user.userId,
        part: user.part,
    }), undefined, '조회 중 오류가 발생했습니다.');
    return Array.isArray(data) ? data.map(mapRow) : [];
};
export const fetchFrm206Detail = async (id, user) => {
    const data = await requestJson(buildUrl('GetFrm206Detail', { id, userId: user.userId, part: user.part }), undefined, '상세 데이터를 불러오지 못했습니다.');
    return mapDetail(data);
};
export const fetchFrm206Banks = async (vendorCode) => {
    const data = await requestJson(buildUrl('GetFrm206Banks', { vendorCode }), undefined, '은행 목록을 불러오지 못했습니다.');
    return Array.isArray(data) ? data.map(mapBank) : [];
};
export const createFrm206 = (payload, user) => requestJson(buildUrl('CreateFrm206'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({
        USER_ID: user.userId,
        PART: user.part,
        DT_DOCUMENT: payload.documentDate,
        DT_REQUEST: payload.requestDate,
        COST_CENTER_CODE: payload.costCenterCode,
        ACCOUNT_CODE: payload.accountCode,
        CURRENCY: payload.currency,
        AMT: String(payload.amount),
        VAT: String(payload.vat),
        TOT: String(payload.total),
        MINUS_AMT: String(payload.minAmount),
        ACTUAL_AMT: String(payload.actualAmount),
        SUPPLIER_CODE: payload.supplierCode,
        BANK_CODE: payload.bankCode,
        TITLE: payload.remark,
        ACT_OPTION: payload.actOption,
        ACT_REMARK: payload.actRemark,
        TAX_CODE: payload.taxCode,
        PAY_TYPE_CODE: payload.payTypeCode,
        REQUEST_TYPE_CODE: payload.requestTypeCode,
        CARD_CODE: payload.cardCode,
    }),
}, '저장 중 오류가 발생했습니다.').then((data) => { var _a; return ({ id: String((_a = data.ID) !== null && _a !== void 0 ? _a : ''), mode: 'insert' }); });
export const updateFrm206 = (id, payload, user) => requestJson(buildUrl('UpdateFrm206'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({
        ID: id,
        USER_ID: user.userId,
        PART: user.part,
        DT_DOCUMENT: payload.documentDate,
        DT_REQUEST: payload.requestDate,
        COST_CENTER_CODE: payload.costCenterCode,
        ACCOUNT_CODE: payload.accountCode,
        CURRENCY: payload.currency,
        AMT: String(payload.amount),
        VAT: String(payload.vat),
        TOT: String(payload.total),
        MINUS_AMT: String(payload.minAmount),
        ACTUAL_AMT: String(payload.actualAmount),
        SUPPLIER_CODE: payload.supplierCode,
        BANK_CODE: payload.bankCode,
        TITLE: payload.remark,
        ACT_OPTION: payload.actOption,
        ACT_REMARK: payload.actRemark,
        TAX_CODE: payload.taxCode,
        PAY_TYPE_CODE: payload.payTypeCode,
        REQUEST_TYPE_CODE: payload.requestTypeCode,
        CARD_CODE: payload.cardCode,
    }),
}, '수정 중 오류가 발생했습니다.').then((data) => { var _a; return ({ id: String((_a = data.ID) !== null && _a !== void 0 ? _a : id), mode: 'update' }); });
export const cancelFrm206 = (id, user) => requestJson(buildUrl('CancelFrm206', { id, userId: user.userId, part: user.part }), { method: 'POST' }, '취소 처리 중 오류가 발생했습니다.').then(() => ({ id, mode: 'cancel' }));
export const createFrm206ExpenseApproval = (ids, user) => requestJson(buildUrl('CreateExpenseApproval'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ USER_ID: user.userId, PART: user.part, IDS: ids }),
}, '지출결의서 생성 중 오류가 발생했습니다.').then((data) => { var _a, _b; return ({ approKey: String((_a = data.APPROKEY) !== null && _a !== void 0 ? _a : ''), openUrl: String((_b = data.OPEN_URL) !== null && _b !== void 0 ? _b : '') }); });
export const createFrm206DeleteApproval = (ids, user) => requestJson(buildUrl('CreateDeleteApproval'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ USER_ID: user.userId, PART: user.part, IDS: ids }),
}, '삭제요청서 생성 중 오류가 발생했습니다.').then((data) => { var _a, _b; return ({ approKey: String((_a = data.APPROKEY) !== null && _a !== void 0 ? _a : ''), openUrl: String((_b = data.OPEN_URL) !== null && _b !== void 0 ? _b : '') }); });
export const issueFrm206Accounting = (ids, documentDate, user) => requestJson(buildUrl('IssueAccounting'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ USER_ID: user.userId, PART: user.part, IDS: ids, ACCOUNTING_DATE: documentDate }),
}, '전표 발행 중 오류가 발생했습니다.').then((data) => { var _a; return ({ billCd: String((_a = data.BILLCD) !== null && _a !== void 0 ? _a : '') }); });
export const cancelFrm206Accounting = (id, user) => requestJson(buildUrl('CancelAccounting'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ USER_ID: user.userId, PART: user.part, IDS: [id] }),
}, '전표 취소 중 오류가 발생했습니다.').then((data) => { var _a; return ({ billCd: String((_a = data.BILLCD) !== null && _a !== void 0 ? _a : ''), ids: Array.isArray(data.IDS) ? data.IDS.map(String) : [] }); });
export const finishFrm206Sending = (id, actualDate, user) => requestJson(buildUrl('FinishSending'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ USER_ID: user.userId, PART: user.part, IDS: [id], ACCOUNTING_DATE: actualDate }),
}, '송금완료 처리 중 오류가 발생했습니다.').then((data) => { var _a; return ({ id, status: String((_a = data.STATUS) !== null && _a !== void 0 ? _a : '') }); });
export const resetFrm206GwInfo = (approKey) => requestJson(buildUrl('ResetGwStatusIfNoDocument', { approkey: approKey }), {
    method: 'POST',
}, '상태 초기화 처리 중 오류가 발생했습니다.').then((data) => {
    var _a, _b, _c, _d;
    const message = String((_a = (data.MSG ?? data.message)) !== null && _a !== void 0 ? _a : '');
    const result = Boolean((_b = data.RESULT) !== null && _b !== void 0 ? _b : false);
    if (!result) {
        throw new Error(message || '상태 초기화 처리에 실패했습니다.');
    }
    return ({
        result,
        reset: Boolean((_c = data.RESET) !== null && _c !== void 0 ? _c : false),
        affected: Number((_d = data.AFFECTED) !== null && _d !== void 0 ? _d : 0),
        status: data.RESET ? '등록' : '',
        message,
    });
});
export const fetchFrm206LoadTemplates = async (user) => {
    const data = await requestJson(buildUrl('GetFrm206Templates', { userId: user.userId, part: user.part }), undefined, '불러오기 목록을 불러오지 못했습니다.');
    return Array.isArray(data) ? data.map(mapTemplate) : [];
};
export const fetchFrm206LoadTemplateDetail = async (id, user) => {
    const data = await requestJson(buildUrl('GetFrm206TemplateDetail', { id, userId: user.userId, part: user.part }), undefined, '불러오기 데이터를 불러오지 못했습니다.');
    return mapDetail(data);
};
export const fetchFrm206GwInfo = async (searchText) => {
    const data = await requestJson(buildUrl('GetGwInfo', { searchText }), undefined, '품의번호 조회 중 오류가 발생했습니다.');
    const rows = Array.isArray(data) ? data : data ? [data] : [];
    return rows.map((item) => {
        var _a, _b, _c;
        return ({
            docNo: String((_a = item.DOC_NO) !== null && _a !== void 0 ? _a : ''),
            approKey: String((_b = item.APPROKEY) !== null && _b !== void 0 ? _b : ''),
            title: String((_c = item.DOC_TITLE) !== null && _c !== void 0 ? _c : ''),
        });
    });
};
export const fetchFrm206SellingExpensePerformance = async (year, user) => {
    const partCode = String(user.part ?? '').trim();
    const data = await requestJson(buildUrl('GetSellingExpensePerformance', {
        partCd: partCode,
        yyyy: String(year ?? ''),
    }), undefined, '판관비실적조회 중 오류가 발생했습니다.');
    const rows = Array.isArray(data)
        ? data
        : Array.isArray(data === null || data === void 0 ? void 0 : data.rows)
            ? data.rows
            : Array.isArray(data === null || data === void 0 ? void 0 : data.data)
                ? data.data
                : data ? [data] : [];
    return rows.map((item) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        return ({
            partName: String((_d = (_c = (_b = (_a = item.PART_NAME) !== null && _a !== void 0 ? _a : item.DEPT_NAME) !== null && _b !== void 0 ? _b : item.TEAM_NAME) !== null && _c !== void 0 ? _c : item.NM_PART) !== null && _d !== void 0 ? _d : ''),
            accountCode: String((_e = item.CD_ACCT) !== null && _e !== void 0 ? _e : ''),
            accountName: String((_h = (_g = (_f = item.NM_ACCT) !== null && _f !== void 0 ? _f : item.ACCOUNT_NAME) !== null && _g !== void 0 ? _g : item.NM_DS) !== null && _h !== void 0 ? _h : ''),
            budgetAmount: parseAmountValue((_l = (_k = (_j = item.BUDGET_AMOUNT) !== null && _j !== void 0 ? _j : item.TOTAL_BUDGET) !== null && _k !== void 0 ? _k : item.BUDGET) !== null && _l !== void 0 ? _l : item.AM_TOT_CR),
            expenseAmount: parseAmountValue((_p = (_o = (_m = item.EXPENSE_AMOUNT) !== null && _m !== void 0 ? _m : item.TOTAL_EXPENSE) !== null && _o !== void 0 ? _o : item.EXPENSE) !== null && _p !== void 0 ? _p : item.AM_TOT_DR),
            remainAmount: parseAmountValue((_r = (_q = item.REMAIN_AMOUNT) !== null && _q !== void 0 ? _q : item.REMAIN) !== null && _r !== void 0 ? _r : item.AM_TOT_BAL),
            rowType: String(item.ROW_TYPE ?? item.rowType ?? ''),
        });
    });
};
const mapHrEtcRow = (item) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    const amount = parseAmountValue((_d = (_c = (_b = (_a = item.AMT) !== null && _a !== void 0 ? _a : item.AMOUNT) !== null && _b !== void 0 ? _b : item.SUPPLY_AMOUNT) !== null && _c !== void 0 ? _c : item.SUPPLY_AMT) !== null && _d !== void 0 ? _d : 0);
    const vat = parseAmountValue((_h = (_g = (_f = (_e = item.VAT) !== null && _e !== void 0 ? _e : item.TAX_AMOUNT) !== null && _f !== void 0 ? _f : item.TAX_AMT) !== null && _g !== void 0 ? _g : item.ADD_TAX) !== null && _h !== void 0 ? _h : 0);
    const total = parseAmountValue((_m = (_l = (_k = (_j = item.TOT) !== null && _j !== void 0 ? _j : item.TOTAL_AMOUNT) !== null && _k !== void 0 ? _k : item.TOTAL_AMT) !== null && _l !== void 0 ? _l : item.SUM_AMOUNT) !== null && _m !== void 0 ? _m : amount + vat);
    return ({
        rowNo: String(item.ROW_NO ?? item.RowNo ?? item.SEQ ?? item.seq ?? ''),
        deptCode1: String(item.DEPT_CODE1 ?? item.PART_CODE1 ?? item.CD_PART1 ?? item.CD_DEPT1 ?? item.BUDGET_CD1 ?? ''),
        deptCode2: String(item.DEPT_CODE2 ?? item.PART_CODE2 ?? item.CD_PART2 ?? item.CD_DEPT2 ?? item.BUDGET_CD2 ?? ''),
        amount,
        vat,
        total,
        remark: String(item.REMARK ?? item.TITLE ?? item.NM_REMARK ?? item.DESCRIPTION ?? item.DESC ?? ''),
        raw: item,
    });
};
const mapInsuranceRow = (item) => {
    var _a, _b, _c, _d;
    const amount = parseAmountValue((_d = (_c = (_b = (_a = item.AMT) !== null && _a !== void 0 ? _a : item.AMOUNT) !== null && _b !== void 0 ? _b : item.TOTAL_AMOUNT) !== null && _c !== void 0 ? _c : item.TOTAL_AMT) !== null && _d !== void 0 ? _d : 0);
    return ({
        rowNo: String(item.ROW_NO ?? item.RowNo ?? item.SEQ ?? item.seq ?? ''),
        displayPart: String(item.DISPLAY_PART ?? item.PART1 ?? item.NM_PART1 ?? item.DISPLAY_NAME ?? ''),
        registerPart: String(item.REGISTER_PART ?? item.PART2 ?? item.NM_PART2 ?? item.REGISTER_NAME ?? ''),
        type: String(item.TYPE ?? item.NM_TYPE ?? item.INS_TYPE ?? ''),
        amount,
        names: String(item.NAMES ?? item.NAME ?? item.PERSON_NAMES ?? item.LIST ?? ''),
        raw: item,
    });
};
const mapInsuranceMapping = (item) => ({
    seq: String(item.CD_SEQ ?? item.SEQ ?? item.seq ?? ''),
    part1: String(item.PART1 ?? item.DISPLAY_PART ?? item.NM_PART1 ?? ''),
    part2: String(item.PART2 ?? item.REGISTER_PART ?? item.NM_PART2 ?? ''),
    raw: item,
});
export const uploadFrm206HrEtcExcel = async (etcType, payload, file, user) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('USER_ID', user.userId);
    formData.append('PART', user.part);
    formData.append('ETC_TYPE', etcType);
    formData.append('DT_DOCUMENT', payload.documentDate);
    formData.append('DT_REQUEST', payload.requestDate);
    formData.append('AMT', String(payload.amount));
    formData.append('VAT', String(payload.vat));
    formData.append('TOT', String(payload.total));
    const data = await requestJson(buildUrl('UploadFrm206EtcExcel'), {
        method: 'POST',
        body: formData,
    }, '인사총무 엑셀 업로드 중 오류가 발생했습니다.');
    const rows = pickArrayData(data);
    return rows.map(mapHrEtcRow);
};
export const createFrm206HrEtcEntries = async (etcType, payload, rows, user) => {
    const data = await requestJson(buildUrl('CreateFrm206EtcEntries'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({
            USER_ID: user.userId,
            PART: user.part,
            ETC_TYPE: etcType,
            DT_DOCUMENT: payload.documentDate,
            DT_REQUEST: payload.requestDate,
            AMT: String(payload.amount),
            VAT: String(payload.vat),
            TOT: String(payload.total),
            ROWS: rows.map((row) => row.raw ?? row),
        }),
    }, '인사총무 ETC 입력 중 오류가 발생했습니다.');
    return ({
        count: Number(data.COUNT ?? data.count ?? rows.length ?? 0),
        message: String(data.MSG ?? data.message ?? ''),
    });
};
export const fetchFrm206InsuranceMappings = async (user) => {
    const data = await requestJson(buildUrl('GetFrm206InsuranceMappings', {
        userId: user.userId,
        part: user.part,
    }), undefined, '보험료 부서 맵핑 조회 중 오류가 발생했습니다.');
    return pickArrayData(data).map(mapInsuranceMapping);
};
export const uploadFrm206InsuranceExcel = async (payload, file, user) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('USER_ID', user.userId);
    formData.append('PART', user.part);
    formData.append('TARGET_MONTH', payload.targetMonth);
    formData.append('DT_DOCUMENT', payload.documentDate);
    formData.append('REQUEST_DATE_GROUP1', payload.requestDateGroup1);
    formData.append('REQUEST_DATE_GROUP2', payload.requestDateGroup2);
    const data = await requestJson(buildUrl('UploadFrm206InsuranceExcel'), {
        method: 'POST',
        body: formData,
    }, '보험료 엑셀 업로드 중 오류가 발생했습니다.');
    return pickArrayData(data).map(mapInsuranceRow);
};
export const createFrm206InsuranceEntries = async (payload, rows, user) => {
    const data = await requestJson(buildUrl('CreateFrm206InsuranceEntries'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({
            USER_ID: user.userId,
            PART: user.part,
            TARGET_MONTH: payload.targetMonth,
            DT_DOCUMENT: payload.documentDate,
            REQUEST_DATE_GROUP1: payload.requestDateGroup1,
            REQUEST_DATE_GROUP2: payload.requestDateGroup2,
            ROWS: rows.map((row) => row.raw ?? row),
        }),
    }, '보험료 ETC 입력 중 오류가 발생했습니다.');
    return ({
        count: Number(data.COUNT ?? data.count ?? rows.length ?? 0),
        message: String(data.MSG ?? data.message ?? ''),
    });
};
export const analyzeFrm206Invoice = async (file) => {
    const createFormData = () => {
        const formData = new FormData();
        formData.append('file', file);
        return formData;
    };
    if (DIRECT_INVOICE_ANALYZE_URL) {
        return requestJson(DIRECT_INVOICE_ANALYZE_URL, {
            method: 'POST',
            body: createFormData(),
        }, '계산서분석 API 호출에 실패했습니다.', 'AccApi ParseDocument 서버에서 런타임 오류가 발생했습니다. OpenAI ApiKey/BaseUrl/DefaultModel 설정과 서버 로그를 확인해 주세요.');
    }
    try {
        return await requestJson(buildUrl('ParseDocument'), {
            method: 'POST',
            body: createFormData(),
        }, '계산서분석 API 호출에 실패했습니다.', 'AccApi ParseDocument 서버에서 런타임 오류가 발생했습니다. OpenAI ApiKey/BaseUrl/DefaultModel 설정과 서버 로그를 확인해 주세요.');
    }
    catch (error) {
        const message = error instanceof Error ? error.message : '계산서분석 API 호출에 실패했습니다.';
        if (message.includes('InvoiceAnalyzeApiUrl')) {
            throw new Error('계산서분석 서버 주소가 설정되지 않았습니다. AccApi의 InvoiceAnalyzeApiUrl 또는 client의 REACT_APP_INVOICE_ANALYZE_URL 설정이 필요합니다.');
        }
        throw error;
    }
};


