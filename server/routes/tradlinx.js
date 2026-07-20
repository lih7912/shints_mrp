const express = require('express');
const axios = require('axios');
const moment = require('moment');

const tradlinx = express.Router();
const mssqlExec = require('./mssqlExec').mssqlExec;
const config = require('./config');

const TLX_HOST = 'https://api.tradlinx.com';
const TLX_HEADERS = {
    'Content-Type': 'application/json',
    'tx-clientid': config.tradlinxConfig.txClientId,
    'tx-apikey': config.tradlinxConfig.txApiKey,
};

// 0 5,9,13,17 * * * curl -k -X POST https://localhost:3202/restapi/tradlinx/refresh-pending

function notEmpty(v) {
    return v !== undefined && v !== null && `${v}`.trim() !== '';
}
function escapeSqlString(v = '') {
    return `${v}`.replace(/'/g, "''");
}
function toSql(v) {
    if (v === null || v === undefined) return 'NULL';
    return `'${escapeSqlString(v)}'`;
}

function formatDate14(s) {
    if (!notEmpty(s)) return null;

    const str = String(s).trim();

    // 이미 14자리 숫자면 그대로 사용
    if (/^\d{14}$/.test(str)) return str;

    // 구분자 제거 후 확인
    const compact = str.replace(/[^\d]/g, '');
    if (/^\d{14}$/.test(compact)) return compact;

    // moment로 파싱
    const m = moment(str, moment.ISO_8601, true);
    if (!m.isValid()) return null;

    // 9시간 더해서 KST로 변환
    return m.add(9, 'hours').format('YYYYMMDDHHmmss');
}

function buildAxios() {
    return axios.create({
        baseURL: TLX_HOST,
        headers: TLX_HEADERS,
        timeout: 30000,
    });
}

function normalizeTrackingStatus(s) {
    if (!notEmpty(s)) return 'STANDBY'; // 값이 없으면 STANDBY
    const u = String(s).trim().toUpperCase();
    if (u === 'COMPLETE') return 'COMPLETE';
    if (u === 'TRACKING') return 'TRACKING';
    if (u === 'EXPIRED') return 'EXPIRED';
    return 'STANDBY'; // 나머지는 STANDBY 처리
}

/** BL_NO + ROUTE_ORDER의 최신 레코드 1건을 가져옴(UPDATE_DATETIME DESC) */
async function getLastRouteRow(blNo, routeOrder) {
    const sql = `
        SELECT
            TOP 1 BL_NO,
            ROUTE_ORDER,
            LINE_CD,
            TRANS_TYPE,
            TRACKING_STATUS,
            POL_NAME,
            ETD,
            ATD,
            POD_NAME,
            ETA,
            ATA,
            UPDATE_DATETIME
        FROM
            KSV_TRADLINX
        WHERE
            BL_NO = ${toSql(blNo)}
            AND ROUTE_ORDER = ${Number(routeOrder)}
        ORDER BY
            UPDATE_DATETIME DESC;
    `;
    const rows = await mssqlExec(sql);
    return rows && rows[0] ? rows[0] : null;
}

function isSame(a, b) {
    return (
        (a === null || a === undefined ? null : String(a)) ===
        (b === null || b === undefined ? null : String(b))
    );
}

/** KSV_TRADLINX 비교용 필드 차이 (UPDATE_DATETIME 제외) */
function diffFieldsTrx(curr, next) {
    const fields = [
        'TRANS_TYPE',
        'TRACKING_STATUS',
        'POL_NAME',
        'ETD',
        'ATD',
        'POD_NAME',
        'ETA',
        'ATA',
    ];
    const changed = [];
    for (const f of fields) {
        const cv = curr ? curr[f] : null;
        const nv = next[f];
        if (!isSame(cv, nv)) changed.push(f);
    }
    return changed;
}

/* ──────────────────────── 트래킹 등록 ───────────────────────── */
async function requestTracking(body) {
    const required = ['bl_no', 'line_cd'];
    for (const k of required) {
        if (!notEmpty(body[k])) {
            const err = new Error(`필수 파라미터 누락: ${k}`);
            err.status = 400;
            throw err;
        }
    }
    const payloadItem = {
        bl_no: body.bl_no,
        line_cd: body.line_cd,
        cust_order_id: body.bl_no, // BL_NO 사용
        extend_tracking: false,
    };
    if (notEmpty(body.cntr_no)) payloadItem.cntr_no = body.cntr_no;
    if (notEmpty(body.cust_corp_nm))
        payloadItem.cust_corp_nm = body.cust_corp_nm;
    if (notEmpty(body.cust_nm)) payloadItem.cust_nm = body.cust_nm;
    if (typeof body.extend_tracking === 'boolean')
        payloadItem.extend_tracking = body.extend_tracking;

    const axios$ = buildAxios();
    const { data } = await axios$.post(
        '/partners/track/v2/cargo-tracks/tracking',
        [payloadItem],
    );
    console.log(data);
    return data;
}

async function fetchBlDetailsAndInsert({ bl_nos }) {
    if (
        !bl_nos ||
        (Array.isArray(bl_nos) &&
            bl_nos.filter((b) => String(b).trim() !== '').length === 0) ||
        (!Array.isArray(bl_nos) && String(bl_nos).trim() === '')
    ) {
        const err = new Error('bl_nos가 비어있습니다.');
        err.status = 400;
        throw err;
    }

    const blParam = Array.isArray(bl_nos)
        ? bl_nos.filter((b) => String(b).trim() !== '').join(',')
        : `${bl_nos}`.trim();

    const axios$ = buildAxios();
    const inserted = [];
    const skipped = [];
    const errors = [];
    let lastTransactionTime = null;
    let lastPagination = null;

    const { data } = await axios$.get(
        '/partners/track/v3/cargo-tracks/details',
        {
            params: { bl_nos: blParam, page: 1, size: 50 },
        },
    );

    console.log(data);

    const contents = data?.content || [];
    const size = data?.size;
    lastPagination = data?.pagination || null;
    lastTransactionTime = data?.transaction_time || null;

    if (contents.length === 0 || size === 0) {
        console.log(`bl_nos : ${bl_nos} not exist in tradlinx.`);
        await mssqlExec(
            `
                UPDATE KSV_TRADLINX
                set
                    TRACKING_STATUS = 'ERROR'
                where
                    bl_no = '${bl_nos}'
            `,
        );
    }

    for (const content of contents) {
        try {
            const BL_NO = content.bl_no || null;
            const LINE_CD = content.line_cd || null;
            const rawStatus = content.tracking_status || null;
            const TRACKING_STATUS = normalizeTrackingStatus(rawStatus);
            const TRANS_TYPE = content.trans_type || null;

            let routes = Array.isArray(content.routes) ? content.routes : [];

            if (TRACKING_STATUS === 'EXPIRED') {
                const sqlIns = `
                    INSERT INTO
                        KSV_TRADLINX (
                            BL_NO,
                            ROUTE_ORDER,
                            LINE_CD,
                            TRANS_TYPE,
                            TRACKING_STATUS,
                            POL_NAME,
                            ETD,
                            ATD,
                            POD_NAME,
                            ETA,
                            ATA,
                            UPDATE_DATETIME
                        )
                    VALUES
                        (
                            ${toSql(BL_NO)},
                            NULL,
                            ${toSql(LINE_CD)},
                            NULL,
                            ${toSql(TRACKING_STATUS)},
                            NULL,
                            NULL,
                            NULL,
                            NULL,
                            NULL,
                            NULL,
                            ${toSql(formatDate14(data?.transaction_time))}
                        );
                `;

                await mssqlExec(sqlIns);
            }

            for (let i = 0; i < routes.length; i++) {
                const r = routes[i] || {};
                let ROUTE_ORDER = r.order;
                ROUTE_ORDER = Number(ROUTE_ORDER);

                const POL_NAME = r.pol_name || null;
                const POD_NAME = r.pod_name || null;

                const ETD = formatDate14(r.etd) || null;
                const ATD = formatDate14(r.atd) || null;
                const ETA = formatDate14(r.eta) || null;
                const ATA = formatDate14(r.ata) || null;

                const UPDATE_DATETIME =
                    formatDate14(data?.transaction_time) || null;

                const nextRow = {
                    BL_NO,
                    ROUTE_ORDER,
                    LINE_CD,
                    TRANS_TYPE,
                    TRACKING_STATUS,
                    POL_NAME,
                    ETD,
                    ATD,
                    POD_NAME,
                    ETA,
                    ATA,
                    UPDATE_DATETIME,
                };

                const lastRow = await getLastRouteRow(BL_NO, ROUTE_ORDER);
                const changed = diffFieldsTrx(lastRow, nextRow);

                if (TRACKING_STATUS === 'TRACKING') {
                    await mssqlExec(
                        `
                            UPDATE KSV_SHIPMENT_MST
                            set
                                STATUS_CD = '2'
                                --ETD = '${ETD}',
                                --F_ETA = '${ETA}'
                            where
                                bl_no = '${bl_nos}'
                        `,
                    );
                }

                if (TRACKING_STATUS === 'COMPLETE') {
                    await mssqlExec(
                        `
                            UPDATE KSV_SHIPMENT_MST
                            set
                                STATUS_CD = '5'
                                --ETD = '${ETD}',
                                --A_ETA = '${ATA}'
                            where
                                bl_no = '${bl_nos}'
                        `,
                    );
                }

                if (changed.length === 0) {
                    skipped.push({ bl_no: BL_NO, route_order: ROUTE_ORDER });
                    continue;
                }

                const sqlIns = `
                    INSERT INTO
                        KSV_TRADLINX (
                            BL_NO,
                            ROUTE_ORDER,
                            LINE_CD,
                            TRANS_TYPE,
                            TRACKING_STATUS,
                            POL_NAME,
                            ETD,
                            ATD,
                            POD_NAME,
                            ETA,
                            ATA,
                            UPDATE_DATETIME
                        )
                    VALUES
                        (
                            ${toSql(BL_NO)},
                            ${ROUTE_ORDER},
                            ${toSql(LINE_CD)},
                            ${toSql(TRANS_TYPE)},
                            ${toSql(TRACKING_STATUS)},
                            ${toSql(POL_NAME)},
                            ${toSql(ETD)},
                            ${toSql(ATD)},
                            ${toSql(POD_NAME)},
                            ${toSql(ETA)},
                            ${toSql(ATA)},
                            ${toSql(UPDATE_DATETIME)}
                        );
                `;
                await mssqlExec(sqlIns);

                inserted.push({
                    bl_no: BL_NO,
                    route_order: ROUTE_ORDER,
                    changed,
                });
            }
        } catch (e) {
            errors.push({ bl_no: content?.bl_no ?? null, error: e.message });
        }
    }

    return {
        transactionTime: formatDate14(lastTransactionTime) || null,
        inserted,
        skipped,
        errors,
        pagination: lastPagination || null,
        size: 50,
    };
}

/* ───────────────────────── 리프레시 (대상 선정 로직) ─────────────────────────
   - KSV_TRADLINX에서 BL_NO별 최신 이력을 집계하여 TRACKING_STATUS != 'COMPLETE' 인 건만 대상으로
   --------------------------------------------------------------------------- */

async function refreshPendingBlNos({ chunkSize = 50 }) {
    const sqlTarget = `
        WITH
            latest AS (
                SELECT
                    BL_NO,
                    MAX(UPDATE_DATETIME) AS MAX_UD
                FROM
                    KSV_TRADLINX
                GROUP BY
                    BL_NO
            )
        SELECT
            k.BL_NO
        FROM
            latest l
            JOIN KSV_TRADLINX k ON k.BL_NO = l.BL_NO
            AND k.UPDATE_DATETIME = l.MAX_UD
        WHERE
            (
                k.TRACKING_STATUS IS NULL
                OR k.TRACKING_STATUS = 'TRACKING'
            )
            AND (
                k.TRACKING_STATUS IS NULL
                OR k.TRACKING_STATUS <> 'EXPIRED'
            );
    `;

    console.log('Executing SQL to fetch pending BL_NO list...');

    const rows = await mssqlExec(sqlTarget);

    let blNos = [];
    for (let i = 0; i < rows.length; i++) {
        const raw = rows[i]?.BL_NO ?? rows[i]?.bl_no ?? '';
        if (typeof raw === 'string') {
            const val = raw.trim();
            if (val) blNos.push(val);
        }
    }

    const results = [];

    for (const bl of blNos) {
        try {
            const out = await fetchBlDetailsAndInsert({
                bl_nos: [bl],
            });
            results.push({ ok: true, bl_no: bl, ...out });
        } catch (e) {
            results.push({ ok: false, bl_no: bl, error: e.message });
        }
    }
    return results;
}

/* ───────────────────────── 라우트 ───────────────────────── */

tradlinx.post('/tradlinx/track', express.json(), async (req, res) => {
    try {
        const out = await requestTracking(req.body || {});
        res.json(out);
    } catch (err) {
        res.status(err.status || 500).json({
            message: err.message || 'Internal Error',
        });
    }
});

tradlinx.post('/tradlinx/details', express.json(), async (req, res) => {
    try {
        const bl_nos =
            req.body.bl_nos ?? (req.body.bl_no ? [req.body.bl_no] : null);
        const out = await fetchBlDetailsAndInsert({ bl_nos });
        res.json(out);
    } catch (err) {
        res.status(err.status || 500).json({
            message: err.message || 'Internal Error',
        });
    }
});

tradlinx.post('/tradlinx/history', express.json(), async (req, res) => {
    const { bl_no } = req.body;

    if (!bl_no) {
        return res.status(400).json({ error: 'bl_no 값이 필요합니다.' });
    }

    try {
        const sql = `
            select tracking_status, route_order, pol_name, etd, atd, pod_name, eta, ata, update_datetime
            from ksv_tradlinx
            where bl_no = ${bl_no ? `'${bl_no}'` : 'null'}
              and tracking_status is not null
            order by route_order, update_datetime desc
        `;

        const result = await mssqlExec(sql);

        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: 'DB 조회 중 오류 발생',
            details: err.message,
        });
    }
});

tradlinx.post('/tradlinx/refresh-pending', express.json(), async (req, res) => {
    try {
        const chunkSize = req.body?.chunkSize ?? 50;
        const out = await refreshPendingBlNos({ chunkSize });
        res.json({ ran: out.length, detail: out });
    } catch (err) {
        res.status(err.status || 500).json({
            message: err.message || 'Internal Error',
        });
    }
});

const TLX_MAPVIEW_URL = 'https://app.tradlinx.com/partner-mapview/api/shipment'; // POST form-data

async function fetchMapviewAuthToken() {
    const axios$ = buildAxios();
    const { data } = await axios$.post('/partners/auth/authenticate', {});
    if (typeof data === 'string') return data.trim();
    if (data && typeof data === 'object') {
        if (typeof data.accessToken === 'string')
            return data.accessToken.trim();
        if (typeof data.token === 'string') return data.token.trim();
        if (typeof data.jwt === 'string') return data.jwt.trim();
    }
    throw new Error('인증 토큰 응답 형식을 해석할 수 없습니다.');
}

tradlinx.get('/tradlinx/mapview/bl/:blNo', async (req, res) => {
    try {
        const token = await fetchMapviewAuthToken();
        const blNoRaw = (req.params.blNo || '').trim();
        if (!blNoRaw) return res.status(400).send('BL_NO가 비어 있습니다.');

        const LANGS = new Set(['ko', 'en']);
        const DETAILS = new Set(['SHOW_ALL', 'HIDE_TABS', 'HIDE_ALL']);
        const STARTS = new Set(['LIST', 'HIDE_LIST', 'DETAIL']);
        const CTRLS = new Set(['FULL_SCREEN', 'DIMENSION', 'LANG_SET']);
        const TABS = new Set(['SHIPMENT_ROUTE', 'PORT_CALLS', 'SAIL_LOG']);

        const q = req.query || {};
        const lang = LANGS.has(String(q.lang || 'en'))
            ? String(q.lang || 'en')
            : 'en';
        const detail = DETAILS.has(String(q.detail || 'SHOW_ALL'))
            ? String(q.detail || 'SHOW_ALL')
            : 'SHOW_ALL';
        const startMode = STARTS.has(String(q.startMode || 'LIST'))
            ? String(q.startMode || 'LIST')
            : 'LIST';

        const controllers =
            typeof q.controllers === 'string'
                ? q.controllers
                      .split(',')
                      .map((s) => s.trim())
                      .filter((v) => CTRLS.has(v))
                : [];

        const detailTabs =
            typeof q.detailTabs === 'string'
                ? q.detailTabs
                      .split(',')
                      .map((s) => s.trim())
                      .filter((v) => TABS.has(v))
                : [];

        const html = `
<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<title>TRADLINX MapView - ${blNoRaw}</title>
<meta http-equiv="Content-Security-Policy" content="default-src 'self' https: data: blob:; img-src * data:; style-src 'self' 'unsafe-inline' https:; script-src 'self' 'unsafe-inline' https:; frame-src https://app.tradlinx.com;">
<style>
  html,body{height:100%;margin:0}
  .wrap{position:fixed;inset:0;display:flex;flex-direction:column}
  .top{padding:8px 12px;font:14px/1.4 system-ui,sans-serif;color:#333;border-bottom:1px solid #e5e7eb}
  iframe{flex:1;width:100%;border:0}
  .hint{color:#6b7280;font-size:12px}
</style>
</head>
<body>
  <div class="wrap">
    <div class="top">
      <strong>TRADLINX MapView</strong> — BL/NO: <code>${blNoRaw}</code>
      <div class="hint">MAP Loading...</div>
    </div>

    <iframe name="viewer" allowfullscreen></iframe>

    <form id="viewer_form" target="viewer" method="post" action="${TLX_MAPVIEW_URL}" style="display:none">
      <input type="hidden" name="authorization" value="${token}">
      <input type="hidden" name="searchType" value="blNo">
      <input type="hidden" name="searchValue" value="${blNoRaw}">
      <input type="hidden" name="lang" value="${lang}">
      <input type="hidden" name="detail" value="${detail}">
      <input type="hidden" name="startMode" value="${startMode}">
      ${controllers.map((c) => `<input type="hidden" name="controllers" value="${c}">`).join('')}
      ${detailTabs.map((t) => `<input type="hidden" name="detailTabs" value="${t}">`).join('')}
    </form>
  </div>
  <script>window.addEventListener('DOMContentLoaded',()=>document.getElementById('viewer_form').submit());</script>
</body>
</html>
        `.trim();

        res.type('html').send(html);
    } catch (e) {
        console.error('[partner-mapview bl]', e?.response?.data || e.message);
        res.status(e?.response?.status || 500).send(
            `<h1>MapView 호출 실패</h1><pre>${e.message}</pre>`,
        );
    }
});

module.exports = tradlinx;
