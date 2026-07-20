import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
import moduleQuery_S0523_2 from './S0523_2.queries';
const Excel = require('exceljs');
const path = require('path');
const moment = require('moment');
const { generateUploadURL, upload } = require('../../../routes/s3');

// ===== 색/서식 유틸 =====
const rgb = (r, g, b) =>
    `FF${[r, g, b].map((v) => v.toString(16).padStart(2, '0').toUpperCase()).join('')}`;
const YELLOW = rgb(255, 255, 0);
const BLACK = rgb(0, 0, 0);
const BLUE = rgb(178, 235, 244);
const RED = rgb(255, 0, 0);

function borderThin() {
    return {
        top: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' },
        bottom: { style: 'thin' },
    };
}

const toNum = (v) => (v == null || v === '' ? 0 : Number(v) || 0);

function alignCenter(cell) {
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
}
function alignRight(cell) {
    cell.alignment = { vertical: 'middle', horizontal: 'right' };
}
function alignLeft(cell) {
    cell.alignment = { vertical: 'middle', horizontal: 'left' };
}

function setCell(
    ws,
    r,
    c,
    val,
    {
        fill = null,
        border = true,
        align = null,
        numFmt = null,
        font = null,
    } = {},
) {
    const cell = ws.getCell(r, c);
    cell.value = val;
    if (fill)
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: fill },
        };
    if (border) cell.border = borderThin();
    if (align === 'center') alignCenter(cell);
    if (align === 'right') alignRight(cell);
    if (align === 'left') alignLeft(cell);
    if (numFmt) cell.numFmt = numFmt;
    if (font) cell.font = font;
    return cell;
}

function yyyymmddToDate(s) {
    if (!s) return null;
    const d = String(s).replace(/\D/g, '');
    if (d.length < 8) return null;
    const m = moment(d.slice(0, 8), 'YYYYMMDD', true);
    return m.isValid() ? m.format('YYYY-MM-DD') : null;
}

function fmtYYYYMMDD(s) {
    const d = String(s || '').replace(/\D/g, '');
    if (d.length < 8) return s || '';
    return `${d.slice(0, 4)}/${d.slice(4, 6)}/${d.slice(6, 8)}`;
}

const REASON_TEXT_BY_CODE: Record<string, string> = {
    '01': 'Buyer change(Pack revise) 5-00',
    '02': 'Overship in tolerance3%(include payment) 5-05',
    '03': 'Supplier sent/overship by FOC C-06',
    '04': "Buyer sent over q'ty Y-06",
    '05': 'MOQ M-03',
    '06-1': 'MD Mistake 5-04',
    '06-2': 'MRP Mistake 5-04',
    '06-3': 'PUR Mistake',
    '06-4': 'CAD Mistake',
    '06-5': 'MRP2 Mistake',
    '06-6': 'Line Mistake 5-04',
    '07-1': 'Actual fabric width is larger than MRP width 5-05',
    '07-2': 'Update cons base on PP sample 5-05',
    '07-3': 'Adjust seam allowance smaller by cad team 5-05',
    '07-4': "Place order based on buyer's preorder 5-05",
    '07-5': 'Actual consumption by size b/d 5-05',
    '07-6': 'Apply Actual consumption 5-05',
    '08': 'Fabric Cutting return 5-05',
    '09': 'Acc Line return 5-05',
    '10': 'Reduce garment 5-07',
    '11': "Quality/color matter(can't use correct buyer) 5-07",
    '12': 'Replacement defect(good quality after using) C-06',
    '12-1': "Replacement defect/can't use B-XX",
};

const PLAN_TEXT_BY_CODE: Record<string, string> = {
    '00': 'MD MRP CHECKING',
    '01': '바이어변경/청구예정(Buyer change/will request to buyer)',
    '02': '바이어변경/청구완료(Buyer change/already done)',
    '03': 'MOQ',
    '04': '실수(Mistake)',
    '05': '사후요척차이/견적가 포함된것(cons revise/include in FOB)',
    '06': '업체무상 재조치requestAnimationFrame;(Replacement by FOC)',
    '07': '기타',
    '08': '업체로 데빗발행',
    '09': '바이어공급자재(Buyer provided materials)',
    '1-01': '있음',
    '2-01': '없음(DESTROY)',
    '2-02': '없음(SHINTS STOCK)',
    '2-03': '없음(FACTORY STOCK)',
    '2-04': '없음(BUYER CHARGE)',
    '2-05': '없음(SHIP BACK/SELL)',
    '2-06': '없음(BAG용)',
    '2-07': '없음(MAT/TENT용)',
    '2-08': '없음(NS/WF용)',
};

function normalizeReasonPlanCode(raw: string) {
    const s = String(raw || '').trim();
    if (!s) return '';

    const match = s.match(/^(\d{1,2}(?:-\d{1,2})?)/);
    const base = (match ? match[1] : s).trim();

    if (!/^\d{1,2}(?:-\d{1,2})?$/.test(base)) return base;

    const parts = base.split('-');
    parts[0] = parts[0].padStart(2, '0');
    return parts.join('-');
}

function resolveReasonPlanText(raw, codeMap: Record<string, string>) {
    if (raw == null) return '';
    const original = String(raw).trim();
    if (!original) return '';

    if (codeMap[original]) return codeMap[original];

    const keyFromOriginal = normalizeReasonPlanCode(original);
    if (codeMap[keyFromOriginal]) return codeMap[keyFromOriginal];

    return original;
}

function resolveReasonPlanLegend(raw, codeMap: Record<string, string>) {
    if (raw == null) return '';
    const original = String(raw).trim();
    if (!original) return '';

    const directLabel = codeMap[original];
    if (directLabel) return `${original}.${directLabel}`;

    const keyFromOriginal = normalizeReasonPlanCode(original);
    const label = codeMap[keyFromOriginal];
    if (label) return `${keyFromOriginal}.${label}`;

    return original;
}

function stripTypename(v) {
    if (Array.isArray(v)) return v.map(stripTypename);
    if (v && typeof v === 'object') {
        const { __typename, ...rest } = v;
        for (const k of Object.keys(rest)) rest[k] = stripTypename(rest[k]);
        return rest;
    }
    return v;
}

function makeMap(rows, key, val) {
    const m = new Map();
    for (const r of rows || []) m.set(String(r[key] ?? ''), Number(r[val] ?? 0));
    return m;
}

function clearRange(ws, c1, r1, c2, r2) {
    for (let r = r1; r <= r2; r++) {
        for (let c = c1; c <= c2; c++) {
            const cell = ws.getCell(r, c);
            cell.value = null;
            cell.border = undefined;
            cell.fill = undefined;
            cell.font = undefined;
            cell.alignment = undefined;
        }
    }
}

function trimWorksheetBottom(ws, lastKeepRow, lastKeepCol = 0) {
    const keepRow = Number(lastKeepRow || 0);
    if (!keepRow || keepRow < 1) return;

    const anyWs = ws as any;

    // Template files can contain a phantom last row (e.g. 1048576) in model data.
    // rowCount-based trimming is ineffective in that case, so force-trim the internals.
    const currentRows = Number(ws?.rowCount || 0);
    if (currentRows > keepRow) {
        try {
            ws.spliceRows(keepRow + 1, currentRows - keepRow);
        } catch {}
    }

    if (Array.isArray(anyWs?._rows) && anyWs._rows.length > keepRow) {
        anyWs._rows = anyWs._rows.slice(0, keepRow);
    }

    if (Array.isArray(anyWs?.model?.rows)) {
        anyWs.model.rows = anyWs.model.rows.filter(
            (r) => Number(r?.number || 0) <= keepRow,
        );
    }

    const keepCol = Number(lastKeepCol || 0);
    if (keepCol > 0) {
        const currentCols = Number(ws?.columnCount || 0);
        if (currentCols > keepCol) {
            ws.spliceColumns(keepCol + 1, currentCols - keepCol);
        }

        if (Array.isArray(anyWs?._columns) && anyWs._columns.length > keepCol) {
            anyWs._columns = anyWs._columns.slice(0, keepCol);
        }

        if (Array.isArray(anyWs?.model?.rows)) {
            for (const rowModel of anyWs.model.rows) {
                if (Array.isArray(rowModel?.cells)) {
                    rowModel.cells = rowModel.cells.filter(
                        (cell) => Number(cell?.col || 0) <= keepCol,
                    );
                }
                if (typeof rowModel?.min === 'number' && rowModel.min > keepCol)
                    rowModel.min = keepCol;
                if (typeof rowModel?.max === 'number' && rowModel.max > keepCol)
                    rowModel.max = keepCol;
            }
        }
    }

    // Remove merges that survive outside the intended visible range.
    const merges = ws.model?.merges || [];
    if (Array.isArray(merges) && merges.length > 0) {
        const colLimit = keepCol > 0 ? keepCol : Number.MAX_SAFE_INTEGER;
        ws.model.merges = merges.filter((rng) => {
            const m = parseRange(rng);
            return (
                m.r1 >= 1 &&
                m.r2 <= keepRow &&
                m.c1 >= 1 &&
                m.c2 <= colLimit
            );
        });
    }
}

function colToNum(col) {
    let n = 0;
    for (let i = 0; i < col.length; i++) n = n * 26 + (col.charCodeAt(i) - 64);
    return n;
}
function parseRef(a1) {
    const m = /^([A-Z]+)(\d+)$/.exec(a1.toUpperCase());
    if (!m) return null;
    return { c: colToNum(m[1]), r: parseInt(m[2], 10) };
}
function parseRange(a1) {
    const [a, b] = a1.split(':');
    const tl = parseRef(a);
    const br = parseRef(b);
    return { c1: tl.c, r1: tl.r, c2: br.c, r2: br.r };
}
function rangesIntersect(a, b) {
    return !(a.c2 < b.c1 || b.c2 < a.c1 || a.r2 < b.r1 || b.r2 < a.r1);
}
function unmergeIntersections(ws, c1, r1, c2, r2) {
    const target = { c1, r1, c2, r2 };
    const merges = ws.model && ws.model.merges ? [...ws.model.merges] : [];
    for (const rng of merges) {
        const m = parseRange(rng);
        if (rangesIntersect(target, m)) {
            try {
                ws.unMergeCells(rng);
            } catch {}
        }
    }
}
function safeMerge(ws, r1, c1, r2, c2) {
    // 1) 겹치는 병합 모두 해제
    unmergeIntersections(ws, c1, r1, c2, r2);
    // 2) 동일 위치가 이미 정확히 병합돼 있으면 재병합 불필요
    let alreadyMerged = false;
    const merges = ws.model && ws.model.merges ? ws.model.merges : [];
    for (const rng of merges) {
        const m = parseRange(rng);
        if (m.c1 === c1 && m.r1 === r1 && m.c2 === c2 && m.r2 === r2) {
            alreadyMerged = true;
            break;
        }
    }
    // 3) 필요 시 병합
    if (!alreadyMerged) ws.mergeCells(r1, c1, r2, c2);
    return ws.getCell(r1, c1);
}

function boxBorderAllCells(ws, r1, c1, r2, c2, style = 'thin') {
    for (let r = r1; r <= r2; r++) {
        for (let c = c1; c <= c2; c++) {
            ws.getCell(r, c).border = {
                top: { style },
                left: { style },
                right: { style },
                bottom: { style },
            };
        }
    }
}
function autofitColumns(
    ws,
    fromCol = 1,
    toCol = ws.columnCount,
    min = 6,
    max = 40,
) {
    for (let c = fromCol; c <= toCol; c++) {
        let width = min;
        ws.eachRow({ includeEmpty: false }, (row) => {
            const val = row.getCell(c).value;
            const text =
                val == null
                    ? ''
                    : typeof val === 'object' && val.text
                      ? String(val.text)
                      : typeof val === 'object' && val.richText
                        ? val.richText.map((t) => t.text).join('')
                        : String(val);
            width = Math.max(width, text.length + 2);
        });
        ws.getColumn(c).width = Math.min(max, width);
    }
}

async function excelReportStockList(_, args, contextValue) {
    const sqlCurr = `
        SELECT
            usd_rate,
            curr_cd
        FROM
            kcd_currency
        WHERE
            start_date = (
                SELECT
                    MAX(start_date)
                FROM
                    kcd_currency
            )
        ORDER BY
            curr_cd
    `;
    const currRows = await prisma.$queryRaw(Prisma.raw(sqlCurr));
    const rate = {};
    for (const r of currRows) {
        if (!r || r.curr_cd == null) continue;
        rate[String(r.curr_cd).toUpperCase()] = String(r.usd_rate ?? '');
    }

    const templatePath = path.join(
        process.cwd(),
        'upload',
        'excel_template',
        'list.xlsx',
    );
    console.log(`템플릿 경로: ${templatePath}`);
    const wb = new Excel.Workbook();
    await wb.xlsx.readFile(templatePath);
    const ws = wb.worksheets[0];

    ws.getCell(1, 1).value = 'Factory Stock List';
    ws.getCell(1, 1).font = {
        name: 'Dotum',
        size: 12,
        bold: true,
        color: { argb: BLACK },
    };
    alignLeft(ws.getCell(1, 1));

    const StartCol = 1; // A
    const StartRow = 11; // 본문 데이터 시작 기준 행 (원코드 그대로)
    const nColMax = 40; // 원코드
    const EndCol = StartCol + nColMax - 4; // 원코드 계산 로직 준용

    setCell(ws, 2, 26, '01.Buyer change(Pack revise) 5-00', {
        border: false,
        align: 'left',
    });
    setCell(ws, 3, 26, '02.Overship in tolerance3%(include payment) 5-05', {
        border: false,
        align: 'left',
    });
    setCell(ws, 4, 26, '03.Supplier sent/overship by FOC C-06', {
        border: false,
        align: 'left',
    });
    setCell(ws, 5, 26, "04.Buyer sent over q'ty Y-06", {
        border: false,
        align: 'left',
    });
    setCell(ws, 6, 26, '05.MOQ M-03', { border: false, align: 'left' });
    setCell(ws, 7, 26, '06-1.MD Mistake 5-04', {
        border: false,
        align: 'left',
    });
    setCell(ws, 8, 26, '06-2.MRP Mistake 5-04', {
        border: false,
        align: 'left',
    });
    setCell(ws, 9, 26, '06-3.PUR Mistake', { border: false, align: 'left' });
    setCell(ws, 10, 26, '06-4.CAD Mistake', { border: false, align: 'left' });

    setCell(ws, 1, 27, '06-5.MRP2 Mistake', { border: false, align: 'left' });
    setCell(ws, 2, 27, '06-6.Line Mistake 5-04', {
        border: false,
        align: 'left',
    });
    setCell(
        ws,
        3,
        27,
        '07-1.Actual fabric width is larger than MRP width 5-05',
        {
            border: false,
            align: 'left',
        },
    );
    setCell(ws, 4, 27, '07-2.Update cons base on PP sample 5-05', {
        border: false,
        align: 'left',
    });
    setCell(ws, 5, 27, '07-3.Adjust seam allowance smaller by cad team 5-05', {
        border: false,
        align: 'left',
    });
    setCell(ws, 6, 27, "07-4.Place order based on buyer's preorder 5-05", {
        border: false,
        align: 'left',
    });
    setCell(ws, 7, 27, '07-5.Actual consumption by size b/d 5-05', {
        border: false,
        align: 'left',
    });
    setCell(ws, 8, 27, '07-6.Apply Actual consumption 5-05', {
        border: false,
        align: 'left',
    });

    setCell(ws, 9, 27, '08.Fabric Cutting return 5-05', {
        border: false,
        align: 'left',
    });
    setCell(ws, 10, 27, '09.Acc Line return 5-05', {
        border: false,
        align: 'left',
    });

    setCell(ws, 1, 25, '10.Reduce garment 5-07', {
        border: false,
        align: 'left',
    });
    setCell(
        ws,
        2,
        25,
        "11.Quality/color matter(can't use correct buyer) 5-07",
        {
            border: false,
            align: 'left',
        },
    );
    setCell(ws, 3, 25, '12.Replacement defect(good quality after using) C-06', {
        border: false,
        align: 'left',
    });
    setCell(ws, 4, 25, "12-1.Replacement defect/can't use B-XX", {
        border: false,
        align: 'left',
    });
    setCell(ws, 5, 25, '13.Others 5-07', { border: false, align: 'left' });

    setCell(ws, 1, 28, '00.MD MRP CHECKING', { border: false, align: 'left' });
    setCell(
        ws,
        2,
        28,
        '01.바이어변경/청구예정(Buyer change/will request to buyer)',
        { border: false, align: 'left' },
    );
    setCell(ws, 3, 28, '02.바이어변경/청구완료(Buyer change/already done)', {
        border: false,
        align: 'left',
    });
    setCell(ws, 4, 28, '03.MOQ', { border: false, align: 'left' });
    setCell(ws, 5, 28, '04.실수(Mistake)', { border: false, align: 'left' });
    setCell(
        ws,
        6,
        28,
        '05.사후요척차이/견적가 포함된것(cons revise/include in FOB)',
        { border: false, align: 'left' },
    );
    setCell(
        ws,
        7,
        28,
        '06.업체무상 재조치requestAnimationFrame;(Replacement by FOC)',
        { border: false, align: 'left' },
    );
    setCell(ws, 8, 28, '07.기타', { border: false, align: 'left' });
    setCell(ws, 9, 28, '08.업체로 데빗발행', { border: false, align: 'left' });
    setCell(ws, 10, 28, '09.바이어공급자재(Buyer provided materials)', {
        border: false,
        align: 'left',
    });

    setCell(ws, 2, 29, '1-01.있음', { border: false, align: 'left' });
    setCell(ws, 3, 29, '2-01.없음(DESTROY)', { border: false, align: 'left' });
    setCell(ws, 4, 29, '2-02.없음(SHINTS STOCK)', {
        border: false,
        align: 'left',
    });
    setCell(ws, 5, 29, '2-03.없음(FACTORY STOCK)', {
        border: false,
        align: 'left',
    });
    setCell(ws, 6, 29, '2-04.없음(BUYER CHARGE)', {
        border: false,
        align: 'left',
    });
    setCell(ws, 7, 29, '2-05.없음(SHIP BACK/SELL)', {
        border: false,
        align: 'left',
    });
    setCell(ws, 8, 29, '2-06.없음(BAG용)', { border: false, align: 'left' });
    setCell(ws, 9, 29, '2-07.없음(MAT/TENT용)', {
        border: false,
        align: 'left',
    });
    setCell(ws, 10, 29, '2-08.없음(NS/WF용)', { border: false, align: 'left' });

    const HEADERS = [
        'Matl Type2',
        'Factory',
        'StockDate',
        'RegDate',
        'PO',
        'Order',
        'Buyer',
        'Supplier',
        'MatlCd',
        'Description',
        'Color',
        'Spec',
        'Unit',
        'Status',
        'Org. Qty',
        'StockQty',
        'RemainQty',
        'UseQty',
        'Out Qty',
        'Rack',
        'Location',
        'Warehouse',
        'stock_idx',
        'org_stock_idx',
        'root_idx',
        'Remark',
        'exp_date',
        'Reason',
        'Plan',
        'Price',
        'Curr',
        'Amount',
        'Total(USD)',
        'Debit',
        'Remark0',
        'org Reason',
        'S/L',
    ];

    // 헤더(노란색) 출력
    for (let c = 0; c < HEADERS.length; c++) {
        setCell(ws, StartRow, StartCol + c, HEADERS[c], {
            fill: YELLOW,
            align: 'center',
        });
    }

    let grid = Array.isArray(args.grid) ? stripTypename(args.grid) : [];
    if (!grid.length) {
        const queryResult = await moduleQuery_S0523_2.Query.mgrQueryS0523_2(_, args);
        grid = queryResult?.DATAS || [];
    }
    if (!grid.length) return [{ id: 0, CODE: 'ERROR: There is no content. Please search first.' }];

    const FIELD_CANDIDATES = {
        'Matl Type2': ['MATL_TYPE2_N'],
        Factory: ['FACTORY_NAME'],
        StockDate: ['STOCK_DATE'],
        RegDate: ['REG_DATETIME'],
        PO: ['PO_CD'],
        Order: ['ORDER_CD'],
        Buyer: ['BUYER_NAME'],
        Supplier: ['VENDOR_NAME'],
        MatlCd: ['MATL_CD'],
        Description: ['MATL_NAME'],
        Color: ['COLOR'],
        Spec: ['SPEC'],
        Unit: ['UNIT'],
        Status: ['STOCK_STATUS'],
        'Org. Qty': ['ORG_QTY'],
        StockQty: ['STOCK_QTY'],
        RemainQty: ['REMAIN_QTY'],
        UseQty: ['USE_QTY'],
        'Out Qty': ['OUT_QTY'],
        Rack: ['RACK'],
        Location: ['LOCATION'],
        Warehouse: ['WARE_CD'],
        stock_idx: ['STOCK_IDX'],
        org_stock_idx: ['ORG_STOCK_IDX'],
        root_idx: ['ROOT_IDX'],
        Remark: ['REMARK'],
        exp_date: ['EXP_DATE'],
        Reason: ['REASON_REMARK', 'reason_remark'],
        Plan: ['PLAN_REMARK', 'plan_remark'],
        Price: ['PO_PRICE'],
        Curr: ['CURR_CD'],
        Debit: ['DEBIT'],
        Remark0: ['REMARK0'],
        'org Reason': ['ORG_REASON'],
        'S/L': ['MATL_TYPE'],
    };

    const NUMERIC_HEADERS = new Set([
        'Org. Qty',
        'StockQty',
        'RemainQty',
        'UseQty',
        'Out Qty',
        'Price',
        'Amount',
        'Total(USD)',
        'Debit',
    ]);
    const DATE_HEADERS = new Set(['StockDate', 'RegDate', 'exp_date']);

    const toNum = (v) => (v == null || v === '' ? 0 : Number(v) || 0);
    function pick(row, header) {
        const cands = FIELD_CANDIDATES[header] || [];
        for (const key of cands) if (key in row && row[key] != null && row[key] !== '') return row[key];
        return null;
    }
    function toDateIfYYYYMMDD(v) {
        if (v == null) return null;
        const s = String(v);
        const digits = s.replace(/\D/g, '');
        if (digits.length >= 8) {
            const m = moment(digits.slice(0, 8), 'YYYYMMDD', true);
            if (m.isValid() && m.year() > 1900) return m.format('YYYY-MM-DD');
        }
        return null;
    }

    function getUsdRate(curr) {
        if (!curr) return 1;
        const u = String(curr).toUpperCase();
        if (u === 'USD') return 1;
        const r = Number(rate[u] || 1);
        return Number.isFinite(r) && r > 0 ? r : 1;
    }

    for (let r = 0; r < grid.length; r++) {
        const row = grid[r];
        const excelRow = StartRow + 1 + r;

        for (let c = 0; c < HEADERS.length; c++) {
            const header = HEADERS[c];
            const colIdx = StartCol + c;

            if (header === 'Amount' || header === 'Total(USD)') continue;

            if (DATE_HEADERS.has(header)) {
                const raw = pick(row, header);
                const dt = toDateIfYYYYMMDD(raw);
                if (dt) {
                    setCell(ws, excelRow, colIdx, dt, { align: 'center' });
                    continue;
                }
            }

            if (NUMERIC_HEADERS.has(header)) {
                const val = toNum(pick(row, header));
                setCell(ws, excelRow, colIdx, val, { align: 'right' });
                continue;
            }

            if (header === 'Reason') {
                const rawCode = row.REASON_REMARK ?? row.reason_remark ?? '';
                const val = resolveReasonPlanLegend(
                    rawCode,
                    PLAN_TEXT_BY_CODE,
                );
                setCell(ws, excelRow, colIdx, val, { align: 'left' });
                continue;
            }

            if (header === 'Plan') {
                const rawCode = row.PLAN_REMARK ?? row.plan_remark ?? '';
                const val = resolveReasonPlanLegend(rawCode, PLAN_TEXT_BY_CODE);
                setCell(ws, excelRow, colIdx, val, { align: 'left' });
                continue;
            }

            const val = pick(row, header);
            setCell(ws, excelRow, colIdx, val == null ? '' : val, {
                align: 'left',
            });
        }

        const remainQty = toNum(pick(row, 'RemainQty'));
        const price = toNum(pick(row, 'Price'));
        const curr = pick(row, 'Curr') || 'USD';

        const amount = remainQty * price;
        const totalUsd = amount * getUsdRate(curr);

        // Amount
        setCell(ws, excelRow, StartCol + HEADERS.indexOf('Amount'), amount, {
            align: 'right',
        });
        // Total(USD)
        setCell(
            ws,
            excelRow,
            StartCol + HEADERS.indexOf('Total(USD)'),
            totalUsd,
            {
                align: 'right',
            },
        );
    }

    const EndRow = StartRow + grid.length; // 헤더 포함
    for (let c = 1; c <= nColMax - 5; c++) {
        for (let r = StartRow; r <= EndRow; r++) {
            const cell = ws.getCell(r, c);
            cell.border = borderThin();
            if (c === 32 || c === 33 || c === 34) alignRight(cell);
            else alignLeft(cell);
        }
    }
    for (let c = 1; c <= nColMax; c++) {
        const cell = ws.getCell(StartRow, c);
        cell.font = {
            name: 'Dotum',
            size: 10,
            bold: true,
            color: { argb: BLACK },
        };
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: YELLOW },
        };
        cell.border = borderThin();
        alignCenter(cell);
    }
    for (let r = StartRow + 1; r <= EndRow; r++) {
        for (let c = 1; c <= nColMax; c++) {
            const cell = ws.getCell(r, c);
            const f = cell.font || {};
            cell.font = {
                ...f,
                name: 'Dotum',
                size: 10,
                color: { argb: BLACK },
            };
        }
    }

    const reasonColIdx = StartCol + HEADERS.indexOf('Reason');
    const planColIdx = StartCol + HEADERS.indexOf('Plan');
    const calcTextWidth = (value) => {
        const s = String(value ?? '');
        if (!s) return 0;
        return Array.from(s).reduce(
            (acc, ch) => acc + (/[^\x00-\x7F]/.test(ch) ? 2 : 1),
            0,
        );
    };
    const maxReasonWidth = grid.reduce((max, row) => {
        const rawCode = row.REASON_REMARK ?? row.reason_remark ?? '';
        const text = String(
            resolveReasonPlanLegend(rawCode, PLAN_TEXT_BY_CODE),
        );
        return Math.max(max, calcTextWidth(text));
    }, calcTextWidth('Reason'));
    const maxPlanWidth = grid.reduce((max, row) => {
        const rawCode = row.PLAN_REMARK ?? row.plan_remark ?? '';
        const text = String(resolveReasonPlanLegend(rawCode, PLAN_TEXT_BY_CODE));
        return Math.max(max, calcTextWidth(text));
    }, calcTextWidth('Plan'));

    ws.getColumn(reasonColIdx).width = Math.min(
        80,
        Math.max(ws.getColumn(reasonColIdx).width || 12, maxReasonWidth + 2),
    );
    ws.getColumn(planColIdx).width = Math.min(
        80,
        Math.max(ws.getColumn(planColIdx).width || 12, maxPlanWidth + 2),
    );

    if (args.data?.FACTORY_NAME) {
        setCell(ws, 2, 1, args.data.FACTORY_NAME, {
            border: false,
            align: 'left',
            font: {
                name: 'Dotum',
                size: 12,
                bold: true,
                color: { argb: rgb(255, 50, 50) },
            },
        });
    }
    if (args.data?.DATE_MODE === 'INFAC') {
        const s = args.data.FAC_DATE1; // 'YYYYMMDD'
        const e = args.data.FAC_DATE2;
        setCell(
            ws,
            2,
            35,
            `Stock Date : ${s?.slice(0, 4)}/${s?.slice(4, 6)}/${s?.slice(6, 8)} ~ ${e?.slice(0, 4)}/${e?.slice(4, 6)}/${e?.slice(6, 8)}`,
            {
                border: false,
                align: 'right',
                font: {
                    name: 'Dotum',
                    size: 12,
                    bold: true,
                    color: { argb: rgb(255, 50, 50) },
                },
            },
        );
    } else if (args.data?.DATE_MODE === 'REG') {
        const s = args.data.REG_DATE1;
        const e = args.data.REG_DATE2;
        setCell(
            ws,
            2,
            35,
            `Reg Date : ${s?.slice(0, 4)}/${s?.slice(4, 6)}/${s?.slice(6, 8)} ~ ${e?.slice(0, 4)}/${e?.slice(4, 6)}/${e?.slice(6, 8)}`,
            {
                border: false,
                align: 'right',
                font: {
                    name: 'Dotum',
                    size: 12,
                    bold: true,
                    color: { argb: rgb(255, 50, 50) },
                },
            },
        );
    }

    trimWorksheetBottom(ws, EndRow, HEADERS.length);

    const userId = AFLib.getUserInfo(contextValue).USER_ID;
    const nowStr = moment().format('YYYYMMDDHHmmss');
    const buyerCd = String(args.data?.BUYER_CD || '').trim();
    const buyerTeam = String(args.data?.BUYER_TEAM || '').trim();
    const templateName = 'list';

    let tWExcelFile = `Factory_Stock_List_${templateName}-${userId}-${nowStr}`;
    if (buyerCd) {
        tWExcelFile = `${buyerCd}-Factory_Stock_List_${templateName}-${userId}-${nowStr}`;
    } else if (buyerTeam) {
        tWExcelFile = `${buyerTeam}_Factory_Stock_List_${templateName}-${userId}-${nowStr}`;
    }

    let uploadURL = args?.tFileObj?.url || '';
    let fileURL = '';
    if (uploadURL) {
        fileURL = uploadURL.split('?')[0];
    } else {
        const uploadInfo = await generateUploadURL(`${tWExcelFile}.xlsx`);
        uploadURL = uploadInfo.uploadURL;
        fileURL = uploadURL.split('?')[0];
    }

    if (args.data?.writeFileInfo) {
        const fileSuffix = buyerCd || buyerTeam || '';
        const title = `Factory_Stock_List_${fileSuffix}`;
        const fileKey = `Factory_Stock_List_${fileSuffix}`;
        await prisma.$queryRaw(
            Prisma.raw(`
                DELETE FROM kcd_fileinfo
                WHERE
                    title = '${title}'
                    AND file_key = '${fileKey}'
                    AND kind = 'S0523'
            `),
        );
        await prisma.$queryRaw(
            Prisma.raw(`
                INSERT INTO
                    kcd_fileinfo (
                        title,
                        kind,
                        file_key,
                        name,
                        url,
                        upd_datetime,
                        upd_user
                    )
                VALUES
                    (
                        '${title}',
                        'S0523',
                        '${fileKey}',
                        '${tWExcelFile}',
                        '${fileURL}',
                        GETDATE(),
                        '${userId}'
                    )
            `),
        );
    }

    const uploadResult = await upload(`${tWExcelFile}.xlsx`, wb, uploadURL);

    console.log('>>> uploadResult:', uploadResult);

    return uploadResult;
}

async function exportStockList2ByTeam(_, args, contextValue) {
    const selectedTeam = String(args?.data?.BUYER_TEAM || '').trim();
    const allowedTeams = [
        'Sales1',
        'Sales2',
        'Sales3',
        'Sales4',
        'Sales5',
        '내수영업팀',
        '브랜드개발팀',
    ];

    const teamNames: string[] = selectedTeam
        ? [selectedTeam]
        : allowedTeams;

    const allResults: any[] = [];

    for (const teamName of teamNames) {
        const queryArgs = {
            ...args,
            data: {
                ...(args.data || {}),
                BUYER_CD: '',
                BUYER_TEAM: teamName,
            },
        };
        const queryResult = await moduleQuery_S0523_2.Query.mgrQueryS0523_2(_, queryArgs);
        const teamGrid = queryResult?.DATAS || [];
        if (!teamGrid.length) continue;

        const oneArgs = {
            ...args,
            data: {
                ...(args.data || {}),
                BUYER_TEAM: teamName,
                writeFileInfo: true,
            },
            grid: teamGrid,
        };
        const oneResult = await excelReportStockList(_, oneArgs, contextValue);
        if (Array.isArray(oneResult)) allResults.push(...oneResult);
    }

    if (!allResults.length) return [{ id: 0, CODE: 'ERROR: There is no content. Please search first.' }];

    return allResults;
}

const moduleQuery_S0523_5_1 = {
    Query: {
        mgrQueryS0523_EXPORT_STOCK_LIST: async (_, args, contextValue) => await excelReportStockList(_, args, contextValue),

        mgrQueryS0523_EXPORT_USED_STOCK: async (_, args, contextValue) => {
            const templatePath = path.join(
                process.cwd(),
                'upload',
                'excel_template',
                'list.xlsx',
            );
            console.log(`템플릿 경로: ${templatePath}`);
            const wb = new Excel.Workbook();
            await wb.xlsx.readFile(templatePath);
            const ws = wb.worksheets[0];

            let sDate = '';
            let eDate = '';

            if (args.data.IS_STOCK_DATE === '1') {
                sDate = args.data.S_STOCK_DATE;
                eDate = args.data.E_STOCK_DATE;
            } else {
                sDate = args.data.S_REG_DATE;
                eDate = args.data.E_REG_DATE;
            }

            const sql = `
                SELECT
                    LEFT(a.use_datetime, 8) AS use_date, -- Use Date
                    a.use_po_cd AS use_po_cd, -- Use Po Cd
                    LEFT(a.use_order_cd, 2) AS buyer, -- Buyer(코드)
                    c.vendor_name AS supplier, -- Supplier
                    f.matl_cd AS matl_cd, -- Matl Cd
                    d.matl_name AS description, -- Description
                    d.color AS color, -- Color
                    d.spec AS spec, -- Spec
                    d.unit AS unit, -- Unit
                    f.stock_status AS st, -- St.
                    a.use_qty AS use_qty, -- Use Qty
                    f.stock_qty AS stock_qty, -- Stock Qty
                    f.remain_qty AS remain, -- Remain
                    b.matl_price AS price, -- Price
                    b.curr_cd AS curr, -- Curr
                    e.usd_rate AS usd_rate, -- USD Rate
                    a.use_qty * b.matl_price * e.usd_rate AS usd_amt, -- USD Amt
                    f.rack AS rack, -- Rack
                    f.location AS location, -- Location
                    f.stock_date AS stock_date, -- Stock Date
                    f.reg_datetime AS reg_date, -- Reg Date
                    g.buyer_cd AS org_buyer_cd, -- org buyer cd
                    g.buyer_name AS org_buyer, -- org buyer
                    f.po_cd AS org_po_cd, -- org PO cd
                    h.po_matl_cd AS matl_cd2 -- Matl Cd2
                FROM
                    ksv_stock_use a
                    JOIN ksv_stock_matl f ON f.stock_idx = a.stock_idx
                    JOIN kcd_matl_mem b ON b.matl_cd = f.matl_cd
                    AND b.matl_seq = f.matl_seq
                    JOIN kcd_matl_mst d ON d.matl_cd = b.matl_cd
                    JOIN kcd_vendor c ON d.vendor_cd = c.vendor_cd
                    JOIN kcd_currency e ON b.curr_cd = e.curr_cd
                    JOIN kcd_buyer g ON g.buyer_cd = LEFT(f.order_cd, 2)
                    LEFT JOIN ksv_po_mrp h ON h.po_cd = a.use_po_cd
                    AND h.order_cd = a.use_order_cd
                    AND h.stock_idx = a.stock_idx
                    AND h.reg_datetime = a.use_datetime
                    AND h.po_seq = a.use_po_seq
                    AND h.mrp_seq = a.use_mrp_seq
                WHERE
                    LEFT(a.use_datetime, 8) BETWEEN '${sDate}' AND '${eDate}'
                    AND LEFT(a.use_order_cd, 2) LIKE '${args.data.BUYER_CD}%'
                    AND e.start_date = (
                        SELECT
                            MAX(start_date)
                        FROM
                            kcd_currency
                    )
                ORDER BY
                    a.use_datetime,
                    a.use_po_cd
            `;
            const rows = await prisma.$queryRaw(Prisma.raw(sql));
            if (!rows?.length) {
                return [{ id: 0, CODE: '데이터가 없습니다.' }];
            }

            /// 3) 상단 타이틀/기간
            setCell(ws, 1, 1, 'Use Stock List', {
                align: 'center',
                font: {
                    name: 'Dotum',
                    size: 12,
                    bold: true,
                    color: { argb: BLACK },
                },
            });
            const subtitle = `Date : ${fmtYYYYMMDD(sDate)} ~ ${fmtYYYYMMDD(eDate)}`;
            setCell(ws, 2, 24, subtitle, {
                align: 'right',
                font: {
                    name: 'Dotum',
                    size: 12,
                    bold: true,
                    color: { argb: rgb(255, 50, 50) },
                },
            });

            // 4) 헤더 & 필드 매핑
            const HEADERS = [
                'Use Date',
                'Use Po Cd',
                'Buyer',
                'Supplier',
                'Matl Cd',
                'Description',
                'Color',
                'Spec',
                'Unit',
                'St.',
                'Use Qty',
                'Stock Qty',
                'Remain',
                'Price',
                'Curr',
                'USD Rate',
                'USD Amt',
                'Rack',
                'Location',
                'Stock Date',
                'Reg Date',
                'org buyer cd',
                'org buyer',
                'org PO cd',
                'Matl Cd2',
            ];
            const FIELDS = [
                'use_date',
                'use_po_cd',
                'buyer',
                'supplier',
                'matl_cd',
                'description',
                'color',
                'spec',
                'unit',
                'st',
                'use_qty',
                'stock_qty',
                'remain',
                'price',
                'curr',
                'usd_rate',
                'usd_amt',
                'rack',
                'location',
                'stock_date',
                'reg_date',
                'org_buyer_cd',
                'org_buyer',
                'org_po_cd',
                'matl_cd2',
            ];
            const DATE_FIELDS = new Set(['use_date', 'stock_date', 'reg_date']);
            const NUM_FIELDS = new Set([
                'use_qty',
                'stock_qty',
                'remain',
                'price',
                'usd_rate',
                'usd_amt',
            ]);

            const StartCol = 1;
            const StartRow = 3;

            // 헤더(노란색)
            for (let c = 0; c < HEADERS.length; c++) {
                setCell(ws, StartRow, StartCol + c, HEADERS[c], {
                    fill: YELLOW,
                    align: 'center',
                });
            }

            // 5) 데이터 렌더링
            for (let r = 0; r < rows.length; r++) {
                const rec = rows[r];
                const excelRow = StartRow + 1 + r;

                for (let c = 0; c < FIELDS.length; c++) {
                    const field = FIELDS[c];
                    const colIdx = StartCol + c;
                    const v = rec[field];

                    if (DATE_FIELDS.has(field)) {
                        const dt = yyyymmddToDate(v);
                        if (dt) {
                            setCell(ws, excelRow, colIdx, dt, { align: 'center' });
                        } else {
                            setCell(ws, excelRow, colIdx, v ?? '', {
                                align: 'center',
                            });
                        }
                        continue;
                    }
                    if (NUM_FIELDS.has(field)) {
                        setCell(
                            ws,
                            excelRow,
                            colIdx,
                            v == null || v === '' ? 0 : Number(v) || 0,
                            { align: 'right' },
                        );
                        continue;
                    }
                    setCell(ws, excelRow, colIdx, v ?? '', { align: 'left' });
                }
            }

            // 6) 테두리/폰트/간이 너비
            const EndRow = StartRow + rows.length;
            for (let r = StartRow; r <= EndRow; r++) {
                for (let c = 1; c <= HEADERS.length; c++) {
                    const cell = ws.getCell(r, c);
                    if (!cell.border) cell.border = borderThin();
                    const f = cell.font || {};
                    cell.font = {
                        ...f,
                        name: 'Dotum',
                        size: 10,
                        color: { argb: BLACK },
                    };
                }
            }

            for (let c = 1; c <= HEADERS.length; c++) {
                const headerLen = HEADERS[c - 1].length + 2;
                ws.getColumn(c).width = Math.min(
                    60,
                    Math.max(ws.getColumn(c).width || 10, headerLen),
                );
            }

            trimWorksheetBottom(ws, EndRow, HEADERS.length);

            const userId = AFLib.getUserInfo(contextValue).USER_ID;
            const nowStr = moment().format('YYYYMMDDHHmmss');
            const tWExcelFile = `Factory_UseStock_List-${userId}-${nowStr}`;

            const uploadInfo = await generateUploadURL(
                `${tWExcelFile}.xlsx`,
            );
            const uploadURL = uploadInfo.uploadURL;
            const fileURL = uploadURL.split('?')[0];

            const title = `Factory_Stock_List`;
            const fileKey = `Factory_Stock_List`;
            await prisma.$queryRaw(
                Prisma.raw(`
                    DELETE FROM kcd_fileinfo
                    WHERE
                        title = '${title}'
                        AND file_key = '${fileKey}'
                        AND kind = 'S0523'
                `),
            );
            await prisma.$queryRaw(
                Prisma.raw(`
                    INSERT INTO
                        kcd_fileinfo (
                            title,
                            kind,
                            file_key,
                            name,
                            url,
                            upd_datetime,
                            upd_user
                        )
                    VALUES
                        (
                            '${title}',
                            'S0523',
                            '${fileKey}',
                            '${tWExcelFile}',
                            '${fileURL}',
                            GETDATE(),
                            '${userId}'
                        )
                `),
            );

            const uploadResult = await upload(
                `${tWExcelFile}.xlsx`,
                wb,
                uploadURL,
            );

            console.log('>>> uploadResult:', uploadResult);

            return uploadResult;
        },

        mgrQueryS0523_EXPORT_PERIOD_BUYER_STOCK: async (
            _,
            args,
            contextValue,
        ) => {
            let facDate1 = '';
            let facDate2 = '';

            if (args.data.IS_STOCK_DATE === '1') {
                facDate1 = args.data.S_STOCK_DATE;
                facDate2 = args.data.E_STOCK_DATE;
            } else {
                facDate1 = args.data.S_REG_DATE;
                facDate2 = args.data.E_REG_DATE;
            }
            const factoryCd = args.data.FACTORY_CD;
            const userId = AFLib.getUserInfo(contextValue).USER_ID;
            const today8 = moment().format('YYYYMMDD');

            // 1) Buyer 후보 수집 (원 코드 로직 반영)
            const sqlBuyerA = `
                SELECT
                    SUM(
                        ISNULL(a.remain_qty * b.matl_price, 0) * e.usd_rate
                    ) AS amt,
                    LEFT(a.order_cd, 2) AS buyer_cd,
                    f.buyer_name,
                    g.cd_name AS buyer_team
                FROM
                    ksv_stock_matl a
                    JOIN kcd_matl_mem b ON b.matl_cd = a.matl_cd
                    AND b.matl_seq = a.matl_seq
                    JOIN kcd_matl_mst d ON d.matl_cd = b.matl_cd
                    JOIN kcd_vendor c ON d.vendor_cd = c.vendor_cd
                    JOIN kcd_currency e ON b.curr_cd = e.curr_cd
                    JOIN kcd_buyer f ON f.buyer_cd = LEFT(a.order_cd, 2)
                    JOIN kcd_code g ON g.cd_group = 'buyer_team'
                    AND g.cd_code = f.buyer_team
                WHERE
                    a.stock_date <= '${today8}'
                    AND a.stock_status IN ('5', '3', 'M', 'R')
                    AND c.vendor_type NOT IN ('4')
                    AND e.start_date = (
                        SELECT
                            MAX(start_date)
                        FROM
                            kcd_currency
                    )
                    AND a.factory_cd LIKE '${factoryCd}%'
                GROUP BY
                    LEFT(a.order_cd, 2),
                    f.buyer_name,
                    g.cd_name
                HAVING
                    SUM(
                        ISNULL(a.remain_qty * b.matl_price, 0) * e.usd_rate
                    ) > 0
                ORDER BY
                    1 DESC
            `;
            const sqlBuyerB = `
                SELECT
                    SUM(ISNULL(a.use_qty * b.matl_price, 0) * e.usd_rate) AS amt,
                    LEFT(a.use_order_cd, 2) AS buyer_cd,
                    f.buyer_name,
                    h.cd_name AS buyer_team
                FROM
                    ksv_stock_use a
                    JOIN kcd_matl_mem b ON b.matl_cd = a.use_matl_cd
                    AND b.matl_seq = a.use_matl_seq
                    JOIN kcd_matl_mst d ON d.matl_cd = b.matl_cd
                    JOIN kcd_vendor c ON d.vendor_cd = c.vendor_cd
                    JOIN kcd_currency e ON b.curr_cd = e.curr_cd
                    JOIN kcd_buyer f ON f.buyer_cd = LEFT(a.use_order_cd, 2)
                    JOIN ksv_stock_matl g ON g.stock_idx = a.stock_idx
                    JOIN kcd_code h ON h.cd_group = 'buyer_team'
                    AND h.cd_code = f.buyer_team
                WHERE
                    LEFT(a.use_datetime, 8) BETWEEN '${facDate1}' AND '${facDate2}'
                    AND c.vendor_type NOT IN ('4')
                    AND e.start_date = (
                        SELECT
                            MAX(start_date)
                        FROM
                            kcd_currency
                    )
                    AND a.factory_cd LIKE '${factoryCd}%'
                    AND g.stock_status IN ('5', '3', 'M')
                GROUP BY
                    LEFT(a.use_order_cd, 2),
                    f.buyer_name,
                    h.cd_name
                UNION ALL
                SELECT
                    SUM(
                        ISNULL(g.stock_qty * b.matl_price, 0) * e.usd_rate
                    ) AS amt,
                    LEFT(g.order_cd, 2) AS buyer_cd,
                    f.buyer_name,
                    h.cd_name AS buyer_team
                FROM
                    ksv_stock_matl g
                    JOIN kcd_matl_mem b ON b.matl_cd = g.matl_cd
                    AND b.matl_seq = g.matl_seq
                    JOIN kcd_matl_mst d ON d.matl_cd = b.matl_cd
                    JOIN kcd_vendor c ON d.vendor_cd = c.vendor_cd
                    JOIN kcd_currency e ON b.curr_cd = e.curr_cd
                    JOIN kcd_buyer f ON f.buyer_cd = LEFT(g.order_cd, 2)
                    JOIN kcd_code h ON h.cd_group = 'buyer_team'
                    AND h.cd_code = f.buyer_team
                WHERE
                    g.stock_date BETWEEN '${facDate1}' AND '${facDate2}'
                    AND c.vendor_type NOT IN ('4')
                    AND e.start_date = (
                        SELECT
                            MAX(start_date)
                        FROM
                            kcd_currency
                    )
                    AND g.factory_cd LIKE '${factoryCd}%'
                    AND g.stock_status IN ('s')
                GROUP BY
                    LEFT(g.order_cd, 2),
                    f.buyer_name,
                    h.cd_name
            `;
            const buyerA = await prisma.$queryRaw(Prisma.raw(sqlBuyerA));
            const buyerB = await prisma.$queryRaw(Prisma.raw(sqlBuyerB));

            const buyerMap = new Map(); // buyer_cd -> { name, team }
            for (const r of buyerA)
                buyerMap.set(String(r.buyer_cd), {
                    name: r.buyer_name,
                    team: r.buyer_team,
                });
            for (const r of buyerB)
                if (!buyerMap.has(String(r.buyer_cd)))
                    buyerMap.set(String(r.buyer_cd), {
                        name: r.buyer_name,
                        team: r.buyer_team,
                    });
            const buyers = Array.from(buyerMap.entries()).map(([cd, v]) => ({
                cd,
                name: v.name,
                team: v.team,
            }));

            // 2) 지표 집계 (원 코드와 동일)
            // A: <= today, status in (5,3,M,R) : remain * price
            const qA = `
                SELECT
                    LEFT(a.order_cd, 2) AS buyer_cd,
                    SUM(
                        ISNULL(a.remain_qty * b.matl_price, 0) * e.usd_rate
                    ) AS amt
                FROM
                    ksv_stock_matl a
                    JOIN kcd_matl_mem b ON b.matl_cd = a.matl_cd
                    AND b.matl_seq = a.matl_seq
                    JOIN kcd_matl_mst d ON d.matl_cd = b.matl_cd
                    JOIN kcd_vendor c ON d.vendor_cd = c.vendor_cd
                    JOIN kcd_currency e ON b.curr_cd = e.curr_cd
                WHERE
                    a.stock_date <= '${today8}'
                    AND a.stock_status IN ('5', '3', 'M', 'R')
                    AND c.vendor_type NOT IN ('4')
                    AND e.start_date = (
                        SELECT
                            MAX(start_date)
                        FROM
                            kcd_currency
                    )
                    AND a.factory_cd LIKE '${factoryCd}%'
                GROUP BY
                    LEFT(a.order_cd, 2)
            `;
            const A = makeMap(
                await prisma.$queryRaw(Prisma.raw(qA)),
                'buyer_cd',
                'amt',
            );

            // A00: <= today, status in (G,U,I,H,A)
            const qA00 = `
                SELECT
                    SUM(
                        ISNULL(a.remain_qty * b.matl_price, 0) * e.usd_rate
                    ) AS amt
                FROM
                    ksv_stock_matl a
                    JOIN kcd_matl_mem b ON b.matl_cd = a.matl_cd
                    AND b.matl_seq = a.matl_seq
                    JOIN kcd_matl_mst d ON d.matl_cd = b.matl_cd
                    JOIN kcd_vendor c ON d.vendor_cd = c.vendor_cd
                    JOIN kcd_currency e ON b.curr_cd = e.curr_cd
                WHERE
                    a.stock_date <= '${today8}'
                    AND a.stock_status IN ('G', 'U', 'I', 'H', 'A')
                    AND c.vendor_type NOT IN ('4')
                    AND e.start_date = (
                        SELECT
                            MAX(start_date)
                        FROM
                            kcd_currency
                    )
                    AND a.factory_cd LIKE '${factoryCd}%'
            `;
            const A00 = toNum(
                (await prisma.$queryRaw(Prisma.raw(qA00)))[0]?.amt,
            );

            // B: <= today, status in (W,N) : remain * price
            const qB = `
                SELECT
                    LEFT(a.order_cd, 2) AS buyer_cd,
                    SUM(
                        ISNULL(a.remain_qty * b.matl_price, 0) * e.usd_rate
                    ) AS amt
                FROM
                    ksv_stock_matl a
                    JOIN kcd_matl_mem b ON b.matl_cd = a.matl_cd
                    AND b.matl_seq = a.matl_seq
                    JOIN kcd_matl_mst d ON d.matl_cd = b.matl_cd
                    JOIN kcd_vendor c ON d.vendor_cd = c.vendor_cd
                    JOIN kcd_currency e ON b.curr_cd = e.curr_cd
                WHERE
                    a.stock_date <= '${today8}'
                    AND a.stock_status IN ('W', 'N')
                    AND c.vendor_type NOT IN ('4')
                    AND e.start_date = (
                        SELECT
                            MAX(start_date)
                        FROM
                            kcd_currency
                    )
                    AND a.factory_cd LIKE '${factoryCd}%'
                GROUP BY
                    LEFT(a.order_cd, 2)
            `;
            const B = makeMap(
                await prisma.$queryRaw(Prisma.raw(qB)),
                'buyer_cd',
                'amt',
            );

            // C: between, status in (5,3,M,R) : remain * price
            const qC = `
                SELECT
                    LEFT(a.order_cd, 2) AS buyer_cd,
                    SUM(
                        ISNULL(a.remain_qty * b.matl_price, 0) * e.usd_rate
                    ) AS amt
                FROM
                    ksv_stock_matl a
                    JOIN kcd_matl_mem b ON b.matl_cd = a.matl_cd
                    AND b.matl_seq = a.matl_seq
                    JOIN kcd_matl_mst d ON d.matl_cd = b.matl_cd
                    JOIN kcd_vendor c ON d.vendor_cd = c.vendor_cd
                    JOIN kcd_currency e ON b.curr_cd = e.curr_cd
                WHERE
                    a.stock_date BETWEEN '${facDate1}' AND '${facDate2}'
                    AND a.stock_status IN ('5', '3', 'M', 'R')
                    AND c.vendor_type NOT IN ('4')
                    AND e.start_date = (
                        SELECT
                            MAX(start_date)
                        FROM
                            kcd_currency
                    )
                    AND a.factory_cd LIKE '${factoryCd}%'
                GROUP BY
                    LEFT(a.order_cd, 2)
            `;
            const C = makeMap(
                await prisma.$queryRaw(Prisma.raw(qC)),
                'buyer_cd',
                'amt',
            );

            // C00: between, status in (G,U,I,H,A)
            const qC00 = `
                SELECT
                    SUM(
                        ISNULL(a.remain_qty * b.matl_price, 0) * e.usd_rate
                    ) AS amt
                FROM
                    ksv_stock_matl a
                    JOIN kcd_matl_mem b ON b.matl_cd = a.matl_cd
                    AND b.matl_seq = a.matl_seq
                    JOIN kcd_matl_mst d ON d.matl_cd = b.matl_cd
                    JOIN kcd_vendor c ON d.vendor_cd = c.vendor_cd
                    JOIN kcd_currency e ON b.curr_cd = e.curr_cd
                WHERE
                    a.stock_date BETWEEN '${facDate1}' AND '${facDate2}'
                    AND a.stock_status IN ('G', 'U', 'I', 'H', 'A')
                    AND c.vendor_type NOT IN ('4')
                    AND e.start_date = (
                        SELECT
                            MAX(start_date)
                        FROM
                            kcd_currency
                    )
                    AND a.factory_cd LIKE '${factoryCd}%'
            `;
            const C00 = toNum(
                (await prisma.$queryRaw(Prisma.raw(qC00)))[0]?.amt,
            );

            // D: between, status in (5,3,M,R) : stock_qty * price
            const qD = `
                SELECT
                    LEFT(a.order_cd, 2) AS buyer_cd,
                    SUM(
                        ISNULL(a.stock_qty * b.matl_price, 0) * e.usd_rate
                    ) AS amt
                FROM
                    ksv_stock_matl a
                    JOIN kcd_matl_mem b ON b.matl_cd = a.matl_cd
                    AND b.matl_seq = a.matl_seq
                    JOIN kcd_matl_mst d ON d.matl_cd = b.matl_cd
                    JOIN kcd_vendor c ON d.vendor_cd = c.vendor_cd
                    JOIN kcd_currency e ON b.curr_cd = e.curr_cd
                WHERE
                    a.stock_date BETWEEN '${facDate1}' AND '${facDate2}'
                    AND a.stock_status IN ('5', '3', 'M', 'R')
                    AND c.vendor_type NOT IN ('4')
                    AND e.start_date = (
                        SELECT
                            MAX(start_date)
                        FROM
                            kcd_currency
                    )
                    AND a.factory_cd LIKE '${factoryCd}%'
                GROUP BY
                    LEFT(a.order_cd, 2)
            `;
            const D = makeMap(
                await prisma.$queryRaw(Prisma.raw(qD)),
                'buyer_cd',
                'amt',
            );

            // D00: between, status in (G,U,I,H,A) : stock_qty * price
            const qD00 = `
                SELECT
                    SUM(
                        ISNULL(a.stock_qty * b.matl_price, 0) * e.usd_rate
                    ) AS amt
                FROM
                    ksv_stock_matl a
                    JOIN kcd_matl_mem b ON b.matl_cd = a.matl_cd
                    AND b.matl_seq = a.matl_seq
                    JOIN kcd_matl_mst d ON d.matl_cd = b.matl_cd
                    JOIN kcd_vendor c ON d.vendor_cd = c.vendor_cd
                    JOIN kcd_currency e ON b.curr_cd = e.curr_cd
                WHERE
                    a.stock_date BETWEEN '${facDate1}' AND '${facDate2}'
                    AND a.stock_status IN ('G', 'U', 'I', 'H', 'A')
                    AND c.vendor_type NOT IN ('4')
                    AND e.start_date = (
                        SELECT
                            MAX(start_date)
                        FROM
                            kcd_currency
                    )
                    AND a.factory_cd LIKE '${factoryCd}%'
            `;
            const D00 = toNum(
                (await prisma.$queryRaw(Prisma.raw(qD00)))[0]?.amt,
            );

            // E1: between, use_qty*price (stock_status in 5,3,M)
            const qE1 = `
                SELECT
                    LEFT(a.use_order_cd, 2) AS buyer_cd,
                    SUM(ISNULL(a.use_qty * b.matl_price, 0) * e.usd_rate) AS amt
                FROM
                    ksv_stock_use a
                    JOIN kcd_matl_mem b ON b.matl_cd = a.use_matl_cd
                    AND b.matl_seq = a.use_matl_seq
                    JOIN kcd_matl_mst d ON d.matl_cd = b.matl_cd
                    JOIN kcd_vendor c ON d.vendor_cd = c.vendor_cd
                    JOIN kcd_currency e ON b.curr_cd = e.curr_cd
                    JOIN ksv_stock_matl g ON g.stock_idx = a.stock_idx
                WHERE
                    LEFT(a.use_datetime, 8) BETWEEN '${facDate1}' AND '${facDate2}'
                    AND g.stock_status IN ('5', '3', 'M')
                    AND c.vendor_type NOT IN ('4')
                    AND e.start_date = (
                        SELECT
                            MAX(start_date)
                        FROM
                            kcd_currency
                    )
                    AND a.factory_cd LIKE '${factoryCd}%'
                GROUP BY
                    LEFT(a.use_order_cd, 2)
            `;
            const E1 = makeMap(
                await prisma.$queryRaw(Prisma.raw(qE1)),
                'buyer_cd',
                'amt',
            );

            // E2: between, stock 's' : stock_qty*price
            const qE2 = `
                SELECT
                    LEFT(g.order_cd, 2) AS buyer_cd,
                    SUM(
                        ISNULL(g.stock_qty * b.matl_price, 0) * e.usd_rate
                    ) AS amt
                FROM
                    ksv_stock_matl g
                    JOIN kcd_matl_mem b ON b.matl_cd = g.matl_cd
                    AND b.matl_seq = g.matl_seq
                    JOIN kcd_matl_mst d ON d.matl_cd = b.matl_cd
                    JOIN kcd_vendor c ON d.vendor_cd = c.vendor_cd
                    JOIN kcd_currency e ON b.curr_cd = e.curr_cd
                WHERE
                    g.stock_date BETWEEN '${facDate1}' AND '${facDate2}'
                    AND g.stock_status IN ('s')
                    AND c.vendor_type NOT IN ('4')
                    AND e.start_date = (
                        SELECT
                            MAX(start_date)
                        FROM
                            kcd_currency
                    )
                    AND g.factory_cd LIKE '${factoryCd}%'
                GROUP BY
                    LEFT(g.order_cd, 2)
            `;
            const E2 = makeMap(
                await prisma.$queryRaw(Prisma.raw(qE2)),
                'buyer_cd',
                'amt',
            );

            // E00: between, (G,U,I,H,A) use_qty*price
            const qE00 = `
                SELECT
                    SUM(ISNULL(a.use_qty * b.matl_price, 0) * e.usd_rate) AS amt
                FROM
                    ksv_stock_use a
                    JOIN kcd_matl_mem b ON b.matl_cd = a.use_matl_cd
                    AND b.matl_seq = a.use_matl_seq
                    JOIN kcd_matl_mst d ON d.matl_cd = b.matl_cd
                    JOIN kcd_vendor c ON d.vendor_cd = c.vendor_cd
                    JOIN kcd_currency e ON b.curr_cd = e.curr_cd
                    JOIN ksv_stock_matl g ON g.stock_idx = a.stock_idx
                WHERE
                    LEFT(a.use_datetime, 8) BETWEEN '${facDate1}' AND '${facDate2}'
                    AND g.stock_status IN ('G', 'U', 'I', 'H', 'A')
                    AND c.vendor_type NOT IN ('4')
                    AND e.start_date = (
                        SELECT
                            MAX(start_date)
                        FROM
                            kcd_currency
                    )
            `;
            const E00 = toNum(
                (await prisma.$queryRaw(Prisma.raw(qE00)))[0]?.amt,
            );

            // 3) 템플릿 로드 (삭제하지 않음)
            const templatePath = path.join(
                process.cwd(),
                'upload',
                'excel_template',
                'MAG_STOCKAMOUNT.xlsx',
            );
            console.log(`템플릿 경로: ${templatePath}`);
            const wb = new Excel.Workbook();
            await wb.xlsx.readFile(templatePath);

            // 템플릿 내 시트 확보(없으면 생성)
            const wsBuyer = wb.getWorksheet('Buyer');
            const wsTot = wb.getWorksheet('TotAmt');

            const startRow = 6;
            const nBuyerCnt = buyers.length;

            clearRange(wsBuyer, 1, startRow, 8, 132); // 좌측 표 (A~H) 6행부터
            clearRange(wsBuyer, 9, startRow, 18, 132); // 우측 그리드(I~R) 6행부터

            wsBuyer.getColumn(1).width = 5;
            wsBuyer.getColumn(2).width = 16;
            wsBuyer.getColumn(3).width = 22;
            for (let c = 4; c <= 8; c++) wsBuyer.getColumn(c).width = 20;

            function setNum(ws, r, c, n, opts = {}) {
                const v = toNum(n);
                const cell = setCell(ws, r, c, v, opts); // 값/정렬 등 먼저 적용
                const prev = cell.font || {};
                cell.font = { ...prev, color: { argb: v < 0 ? RED : BLACK } }; // 색상만 갱신
                return cell;
            }

            let sumD = 0,
                sumE = 0,
                sumF = 0,
                sumG = 0,
                sumH = 0; // D~H 합계
            const TOTAL_ROW = 5; // "Total"이 표기된 행
            let r = startRow;
            for (let i = 0; i < buyers.length; i++) {
                const { cd, name, team } = buyers[i];

                // A~C
                setCell(wsBuyer, r, 1, i + 1, { align: 'center' });
                setCell(wsBuyer, r, 2, team ?? '', { align: 'left' });
                setCell(wsBuyer, r, 3, name ?? cd, { align: 'left' });

                // D
                let dVal = toNum(A.get(cd));
                if (cd === '00') dVal += A00;
                setNum(wsBuyer, r, 4, dVal, {
                    align: 'right',
                    numFmt: '#,##0',
                });
                sumD += dVal;

                // E
                const eVal = toNum(B.get(cd));
                setNum(wsBuyer, r, 5, eVal, {
                    align: 'right',
                    numFmt: '#,##0',
                });
                sumE += eVal;

                // F
                let fVal = toNum(C.get(cd));
                if (cd === '00') fVal += C00;
                setNum(wsBuyer, r, 6, fVal, {
                    align: 'right',
                    numFmt: '#,##0',
                });
                sumF += fVal;

                // G
                let gVal = toNum(D.get(cd));
                if (cd === '00') gVal += D00;
                setNum(wsBuyer, r, 7, gVal, {
                    align: 'right',
                    numFmt: '#,##0',
                });
                sumG += gVal;

                // H
                let hVal = toNum(E1.get(cd)) + toNum(E2.get(cd));
                if (cd === '00') hVal += E00;
                setNum(wsBuyer, r, 8, hVal, {
                    align: 'right',
                    numFmt: '#,##0',
                });
                sumH += hVal;

                for (let c = 1; c <= 18; c++)
                    wsBuyer.getCell(r, c).border = borderThin();

                r++;
            }

            setNum(wsBuyer, TOTAL_ROW, 4, sumD, {
                align: 'right',
                numFmt: '#,##0',
            });
            setNum(wsBuyer, TOTAL_ROW, 5, sumE, {
                align: 'right',
                numFmt: '#,##0',
            });
            setNum(wsBuyer, TOTAL_ROW, 6, sumF, {
                align: 'right',
                numFmt: '#,##0',
            });
            setNum(wsBuyer, TOTAL_ROW, 7, sumG, {
                align: 'right',
                numFmt: '#,##0',
            });
            setNum(wsBuyer, TOTAL_ROW, 8, sumH, {
                align: 'right',
                numFmt: '#,##0',
            });

            const lastDataRow = r - 1;
            for (let rr = 3; rr <= lastDataRow; rr++) {
                wsBuyer.getCell(rr, 6).fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: BLUE },
                };
            }
            // 오토핏 (원본의 C_XLS_ACTION_AUTOFIT)
            autofitColumns(wsBuyer, 1, 8, 6, 40);
            autofitColumns(wsBuyer, 9, 18, 8, 40);

            // 7) TotAmt 시트 집계 (가로 방향 출력, Row=5 고정)
            async function sumRemainByStatusIn(statusList) {
                const inList = statusList.map((s) => `'${s}'`).join(',');
                const q = `
                    SELECT
                        SUM(
                            ISNULL(a.remain_qty * b.matl_price, 0) * e.usd_rate
                        ) AS amt
                    FROM
                        ksv_stock_matl a
                        JOIN kcd_matl_mem b ON b.matl_cd = a.matl_cd
                        AND b.matl_seq = a.matl_seq
                        JOIN kcd_matl_mst d ON d.matl_cd = b.matl_cd
                        JOIN kcd_vendor c ON d.vendor_cd = c.vendor_cd
                        JOIN kcd_currency e ON b.curr_cd = e.curr_cd
                    WHERE
                        a.stock_date <= '${today8}'
                        AND a.stock_status IN (${inList})
                        AND c.vendor_type NOT IN ('4')
                        AND e.start_date = (
                            SELECT
                                MAX(start_date)
                            FROM
                                kcd_currency
                        )
                `;
                const row = (await prisma.$queryRaw(Prisma.raw(q)))[0];
                return toNum(row?.amt);
            }

            // 값 계산
            const v3 = await sumRemainByStatusIn(['3']); // Anyone use
            const v5 = await sumRemainByStatusIn(['5']); // Normal stock
            const vM = await sumRemainByStatusIn(['M']); // MOQ
            const vR = await sumRemainByStatusIn(['R']); // Storage
            const vGUIHA = await sumRemainByStatusIn(['G', 'U', 'H', 'I', 'A']); // GUIHA
            const vY = await sumRemainByStatusIn(['Y']); // Y(Buyer)
            const vWN = await sumRemainByStatusIn(['W', 'N']); // w/n
            const vTOTAL = v3 + v5 + vM + vR + vGUIHA; // TOTAL

            // Row 5 한 줄에 가로로 쓰기 (numFmt는 필요 시 조정)
            const outRow = 5;
            setCell(wsTot, outRow, 1, v3, {
                align: 'right',
                numFmt: '#,##0.00',
            }); // 3
            setCell(wsTot, outRow, 2, v5, {
                align: 'right',
                numFmt: '#,##0.00',
            }); // 5
            setCell(wsTot, outRow, 3, vM, {
                align: 'right',
                numFmt: '#,##0.00',
            }); // M
            setCell(wsTot, outRow, 4, vR, {
                align: 'right',
                numFmt: '#,##0.00',
            }); // R
            setCell(wsTot, outRow, 5, vGUIHA, {
                align: 'right',
                numFmt: '#,##0.00',
            }); // GUIHA
            setCell(wsTot, outRow, 6, vTOTAL, {
                align: 'right',
                numFmt: '#,##0.00',
            }); // TOTAL
            setCell(wsTot, outRow, 7, vY, {
                align: 'right',
                numFmt: '#,##0.00',
            }); // Y(Buyer)
            setCell(wsTot, outRow, 8, vWN, {
                align: 'right',
                numFmt: '#,##0.00',
            }); // w/n

            const tWExcelFile = `MAG_STOCKAMOUNT-${facDate1}-${moment().format('YYYYMMDD')}-${userId}`;

            const uploadInfo = await generateUploadURL(`${tWExcelFile}.xlsx`);
            const uploadURL = uploadInfo.uploadURL;
            const fileURL = uploadURL.split('?')[0];

            const title = `MAG_STOCKAMOUNT-${facDate1}-${moment().format('YYYYMMDD')}-${userId}`;
            const fileKey = `MAG_STOCKAMOUNT-${facDate1}-${moment().format('YYYYMMDD')}-${userId}`;
            await prisma.$queryRaw(
                Prisma.raw(`
                    DELETE FROM kcd_fileinfo
                    WHERE
                        title = '${title}'
                        AND file_key = '${fileKey}'
                        AND kind = 'S0523'
                `),
            );
            await prisma.$queryRaw(
                Prisma.raw(`
                    INSERT INTO
                        kcd_fileinfo (
                            title,
                            kind,
                            file_key,
                            name,
                            url,
                            upd_datetime,
                            upd_user
                        )
                    VALUES
                        (
                            '${title}',
                            'S0523',
                            '${fileKey}',
                            '${tWExcelFile}',
                            '${fileURL}',
                            GETDATE(),
                            '${userId}'
                        )
                `),
            );

            const uploadResult = await upload(
                `${tWExcelFile}.xlsx`,
                wb,
                uploadURL,
            );
            console.log('>>> uploadResult:', uploadResult);
            return uploadResult;
        },

        mgrQueryS0523_EXPORT_STOCK_LIST2: async (_, args, contextValue) => {
            return exportStockList2ByTeam(_, args, contextValue);
        },
    },
};

export default moduleQuery_S0523_5_1;
