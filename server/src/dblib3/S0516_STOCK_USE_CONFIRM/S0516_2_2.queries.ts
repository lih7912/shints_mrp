import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0516_2_2 = {
    Query: {
        mgrQueryS0516_2_2: async (_, args) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);

            var tSQL = '';
            var tRangeMonth = AFLib.getRangeMonth(tRetDate1, 1);
            if (!args.data.PO_CD) {
                tSQL += `  and left(a.reg_datetime, 8) between '${tRangeMonth.s_date}' and '${tRangeMonth.e_date}'  `;
            }
            if (args.data.PO_SEQ === '' || args.data.PO_SEQ === 'All');
            else tSQL += `  and a1.po_seq = '${args.data.PO_SEQ}'  `;

            let sqlStr_bak = `
                select
                    a1.po_cd as PO_CD,
                    a1.po_seq as PO_SEQ,
                    a1.matl_cd as MATL_CD,
                    a1.order_cd as ORDER_CD,
                    c.stock_idx as STOCK_IDX,
                    a1.use_qty as USE_QTY,
                    a.use_qty as REQ_QTY,
                    a1.po_qty as PO_QTY,
                    c.stock_qty as ORG_QTY,
                    a.diff_po_type as DIFF_PO_TYPE,
                    a.use_po_type as USE_PO_TYPE,
                    b.stock_idx as STOCK_IDX2,
                    isnull(b.use_qty, 0) as USE_QTY2,
                    isnull(b.conf_flag2, '') as CONF_FLAG,
                    isnull(b.conf_user, '') as CONF_USER,
                    isnull(b.req_qty, 0) as REQ_QTY0,
                    isnull(b.okuse_qty, 0) as OKUSE_QTY,
                    isnull(b.defect_qty, 0) as DEFECT_QTY,
                    isnull(b.short_qty, 0) as SHORT_QTY,
                    isnull(b.loss_qty, 0) as LOSS_QTY,
                    isnull(b.notuse_qty, 0) as NOTUSE_QTY,
                    isnull(b.reason, 0) as REASON,
                    '0' as CANCEL_QTY,
                    d.MATL_NAME,
                    d.COLOR,
                    d.SPEC,
                    d.UNIT,
                    isnull(c.RACK, '') as RACK,
                    isnull(c.LOCATION, '') as LOCATION,
                    isnull(e.WARE_NAME, '') as WARE_NAME,
                    isnull(f.VENDOR_NAME, '') as VENDOR_NAME,
                    isnull(c.ROOT_IDX, '') as ROOT_IDX,
                    isnull(c.PO_CD, '') as ORG_PO_CD,
                    isnull(c.MATL_CD, '') as ORG_MATL_CD,
                    isnull(c.CONDITION, '') as CONDITION,
                    isnull(e1.FACTORY_NAME, '') as FACTORY_NAME,
                    isnull(b.USE_DATETIME, '') as USE_DATE,
                    isnull(c.STOCK_STATUS, '') as STOCK_STATUS,
                    isnull(c.STOCK_STATUS_2, '') as STOCK_STATUS_2
                from
                    ksv_po_mrp a
                    inner join ksv_po_mrp a1 on a.po_cd = a1.po_cd
                    and a.order_cd = a1.order_cd
                    and a.po_matl_cd = a1.matl_cd
                    and a.po_mrp_seq = a1.mrp_seq
                    and a1.po_matl_cd = '재고발주'
                    and a1.po_qty < a1.use_qty,
                    ksv_stock_use b,
                    ksv_stock_matl c,
                    kcd_matl_mst d,
                    kcd_factory_ware e,
                    kcd_factory e1,
                    kcd_vendor f
                where
                    a.po_cd like '%${args.data.PO_CD}%'
                    and a.use_po_type = '2'
                    and a.diff_po_type = '0'
                    and a.stock_idx = b.stock_idx
                    and b.use_po_cd = a1.po_cd
                    and b.use_order_cd = a1.order_cd
                    and b.use_matl_cd = a1.matl_cd
                    and b.use_mrp_seq = a.mrp_seq
                    and a.stock_idx = c.stock_idx
                    and a.matl_cd = d.matl_cd
                    and d.vendor_cd = f.vendor_cd
                    and c.ware_cd = e.ware_cd
                    and c.factory_cd = e1.factory_cd
                    and a.matl_cd like '%${args.data.MATL_CD}%'
                    and d.matl_name like '%${args.data.MATL_NAME}%'
                    and d.color like '%${args.data.COLOR}%'
                    and d.spec like '%${args.data.SPEC}%'
                    and d.unit like '%${args.data.UNIT}%'
                    and f.vendor_cd like '%${args.data.VENDOR_CD}%'
                    and e.ware_cd like '%${args.data.WAREHOUSE}%' ${tSQL}
                    and b.use_datetime like '%${args.data.USE_DATE}%'
                order by
                    a1.po_cd,
                    a1.order_cd,
                    a1.matl_cd
            `;

            tSQL = '';
            tRangeMonth = AFLib.getRangeMonth(tRetDate1, 1);
            if (!args.data.PO_CD) {
                tSQL += `  and left(a.reg_datetime, 8) between '${tRangeMonth.s_date}' and '${tRangeMonth.e_date}'  `;
            }
            if (args.data.PO_SEQ === '' || args.data.PO_SEQ === 'All');
            else tSQL += `  and b.po_seq = '${args.data.PO_SEQ}'  `;

            let sqlStr = `
                select
                    b.po_cd as PO_CD,
                    b.po_seq as PO_SEQ,
                    b.matl_cd as MATL_CD,
                    b.order_cd as ORDER_CD,
                    a.mrp_seq as MRP_SEQ,
                    isnull(e1.VENDOR_NAME, '') as VENDOR_NAME,
                    a.stock_idx as STOCK_IDX,
                    d.root_idx as ROOT_IDX,
                    a.use_qty as USE_QTY,
                    a.po_qty as PO_QTY,
                    b.use_qty as USE_QTY0,
                    b.po_qty as PO_QTY0,
                    (b.use_qty - b.po_qty) as REQ_QTY,
                    -- (b.use_qty-b.po_qty) as ORG_QTY,
                    isnull(d.STOCK_QTY, 0) as ORG_QTY,
                    a.diff_po_type as DIFF_PO_TYPE,
                    a.use_po_type as USE_PO_TYPE,
                    isnull(h.stock_idx, '') as STOCK_IDX2,
                    isnull(h.use_qty, 0) as USE_QTY2,
                    isnull(h.conf_flag2, '') as CONF_FLAG,
                    isnull(h.conf_user, '') as CONF_USER,
                    isnull(h.req_qty, '0') as REQ_QTY0,
                    isnull(h.okuse_qty, '0') as OKUSE_QTY,
                    isnull(h.defect_qty, '0') as DEFECT_QTY,
                    isnull(h.short_qty, '0') as SHORT_QTY,
                    isnull(h.loss_qty, '0') as LOSS_QTY,
                    isnull(h.notuse_qty, '0') as NOTUSE_QTY,
                    isnull(h.reason, '') as REASON,
                    '0' as CANCEL_QTY,
                    c.MATL_NAME,
                    c.COLOR,
                    c.SPEC,
                    c.UNIT,
                    isnull(d1.HS_CD, '') as HS_CD,
                    isnull(c1.MATL_NAME, '') as MATL_NAME2,
                    isnull(d1.MATL_NAME, '') as MATL_NAME3,
                    c1.COLOR as COLOR2,
                    c1.SPEC as SPEC2,
                    c1.UNIT as UNIT2,
                    isnull(d.RACK, '') as RACK,
                    isnull(d.LOCATION, '') as LOCATION,
                    isnull(g.WARE_NAME, '') as WARE_NAME,
                    isnull(e.VENDOR_NAME, '') as ORG_VENDOR_NAME,
                    isnull(d.ROOT_IDX, '') as ROOT_IDX,
                    isnull(d.PO_CD, '') as ORG_PO_CD,
                    isnull(d.PO_SEQ, '') as ORG_PO_SEQ,
                    isnull(d.ORDER_CD, '') as ORG_ORDER_CD,
                    isnull(d.MATL_CD, '') as ORG_MATL_CD,
                    isnull(d.CONDITION, '') as CONDITION,
                    isnull(f.FACTORY_NAME, '') as FACTORY_NAME,
                    isnull(h.USE_DATETIME, '') as USE_DATE,
                    isnull(d.STOCK_STATUS, '') as STOCK_STATUS,
                    isnull(d.STOCK_STATUS_2, '') as STOCK_STATUS_2
                from
                    ksv_po_mrp a
                    inner join kcd_matl_mst c on a.matl_cd = c.matl_cd
                    left join kcd_vendor e on e.vendor_cd = c.vendor_cd
                    left join ksv_stock_use h on a.stock_idx = h.stock_idx
                    and a.po_cd = h.use_po_cd
                    and a.po_seq = h.use_po_seq
                    and a.order_cd = h.use_order_cd
                    and a.matl_cd = h.use_matl_cd
                    and a.mrp_seq = h.use_mrp_seq,
                    ksv_stock_matl d
                    left join kcd_matl_mst d1 on d.matl_cd = d1.matl_cd
                    left join kcd_factory f on d.factory_cd = f.factory_cd
                    left join kcd_factory_ware g on d.ware_cd = g.ware_cd,
                    ksv_po_mrp b
                    inner join kcd_matl_mst c1 on b.matl_cd = c1.matl_cd
                    left join kcd_vendor e1 on e1.vendor_cd = c1.vendor_cd
                where
                    a.po_cd like '%${args.data.PO_CD}%'
                    and a.use_po_type = '2'
                    and a.diff_po_type = '0'
                    and a.stock_idx = d.stock_idx
                    and a.po_cd = b.po_cd
                    and a.po_seq = b.po_seq
                    and a.order_cd = b.order_cd
                    and a.po_matl_cd = b.matl_cd
                    and a.po_mrp_seq = b.mrp_seq
                    and (
                        c.matl_cd like '%${args.data.MATL_CD}%'
                        or c1.matl_cd like '%${args.data.MATL_CD}%'
                    )
                    and (
                        c.matl_name like '%${args.data.MATL_NAME}%'
                        or c1.matl_name like '%${args.data.MATL_NAME}%'
                    )
                    and (
                        c.color like '%${args.data.COLOR}%'
                        or c1.color like '%${args.data.COLOR}%'
                    )
                    and (
                        c.spec like '%${args.data.SPEC}%'
                        or c1.spec like '%${args.data.SPEC}%'
                    )
                    and (
                        c.unit like '%${args.data.UNIT}%'
                        or c1.unit like '%${args.data.UNIT}%'
                    )
                    and (
                        c.vendor_cd like '%${args.data.VENDOR_CD}%'
                        or c1.vendor_cd like '%${args.data.VENDOR_CD}%'
                    )
                    and (
                        d.ware_cd like '%${args.data.WAREHOUSE}%'
                        or d.factory_cd like '%${args.data.WAREHOUSE}%'
                    )
                    and h.use_datetime like '%${args.data.USE_DATE}%' ${tSQL}
                order by
                    b.po_cd,
                    b.order_cd,
                    b.matl_cd
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            if (tRet.length === 0) {
                return [];
            }

            const escapeSql = (v) => String(v || '').replace(/'/g, "''");
            const facinKeySet = new Set();
            tRet.forEach((row) => {
                const poCd = String(row.ORG_PO_CD || '').trim();
                const usePoCd = String(row.PO_CD || '').trim();
                const orgMatlCd = String(row.ORG_MATL_CD || '').trim();
                const matlCd = String(row.MATL_CD || '').trim();
                if (poCd && orgMatlCd) {
                    facinKeySet.add(`${poCd}|||${orgMatlCd}`);
                }
                if (poCd && matlCd) {
                    facinKeySet.add(`${poCd}|||${matlCd}`);
                }
                if (usePoCd && orgMatlCd) {
                    facinKeySet.add(`${usePoCd}|||${orgMatlCd}`);
                }
                if (usePoCd && matlCd) {
                    facinKeySet.add(`${usePoCd}|||${matlCd}`);
                }
            });

            const facinDeliveryMap = {};
            if (facinKeySet.size > 0) {
                const whereOr = Array.from(facinKeySet)
                    .map((key) => {
                        const cols = String(key).split('|||');
                        return `(
                            PO_CD = '${escapeSql(cols[0])}'
                            and MATL_CD = '${escapeSql(cols[1])}'
                        )`;
                    })
                    .join(' OR ');

                const sqlDelivery = `
                    select
                        t.PO_CD,
                        t.MATL_CD,
                        isnull(t.DELIVERY, '') as DELIVERY
                    from (
                        select
                            PO_CD,
                            MATL_CD,
                            DELIVERY,
                            row_number() over (
                                partition by PO_CD, MATL_CD
                                order by
                                    case when isnull(DELIVERY, '') <> '' then 0 else 1 end,
                                    IN_DATE desc,
                                    FACIN_CD desc
                            ) as rn
                        from KSV_STOCK_FACIN
                        where ${whereOr}
                    ) t
                    where t.rn = 1
                `;
                const retDelivery = await prisma.$queryRaw(Prisma.raw(sqlDelivery));
                retDelivery.forEach((row) => {
                    const key = `${String(row.PO_CD || '').trim()}|||${String(row.MATL_CD || '').trim()}`;
                    facinDeliveryMap[key] = String(row.DELIVERY || '');
                });
            }

            var tRetArray0 = [];
            var tRetArray0_1 = [];
            var tIdx = 0;
            var saveObj = {};
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tObj = { ...tRet[tIdx] };
                if (tIdx === 0) {
                    saveObj = { ...tObj };
                    var tmpObj = {};
                    tmpObj.WARE_NAME = '';
                    tmpObj.ORG_PO_CD = '';
                    tmpObj.ORG_PO_SEQ = '';
                    tmpObj.PO_CD = tObj.PO_CD;
                    tmpObj.ORDER_CD = tObj.ORDER_CD;
                    tmpObj.MATL_CD = tObj.MATL_CD;
                    tmpObj.ORG_MATL_CD = '';
                    tmpObj.VENDOR_NAME = tObj.VENDOR_NAME;
                    tmpObj.MATL_NAME = tObj.MATL_NAME2;
                    tmpObj.COLOR = tObj.COLOR2;
                    tmpObj.SPEC = tObj.SPEC2;
                    tmpObj.UNIT = tObj.UNIT2;
                    tmpObj.CONDITION = '';
                    // tmpObj.ORG_QTY = tObj.USE_QTY0;
                    // tmpObj.USE_QTY = tObj.REQ_QTY;
                    tmpObj.ORG_QTY = '0';
                    tmpObj.USE_QTY = '0';
                    tmpObj.OKUSE_QTY = '0';
                    tmpObj.DEFECT_QTY = '0';
                    tmpObj.SHORT_QTY = '0';
                    tmpObj.BALANCE = '';
                    tmpObj.REASON = '';
                    tmpObj.USE_DATE = '';
                    tRetArray0_1.push(tmpObj);
                } else {
                    var tmpObj = { ...saveObj };
                    tmpObj.ORDER_CD = tmpObj.ORG_ORDER_CD;
                    tmpObj.MATL_CD = tmpObj.MATL_CD;
                    tmpObj.ORG_MATL_CD = tmpObj.ORG_MATL_CD;
                    tmpObj.VENDOR_NAME = tmpObj.ORG_VENDOR_NAME;
                    tmpObj.MATL_NAME = tmpObj.MATL_NAME;
                    tmpObj.COLOR = tmpObj.COLOR;
                    tmpObj.SPEC = tmpObj.SPEC;
                    tmpObj.UNIT = tmpObj.UNIT;
                    tRetArray0_1.push(tmpObj);
                    if (
                        saveObj.PO_CD === tObj.PO_CD &&
                        saveObj.ORDER_CD === tObj.ORDER_CD &&
                        saveObj.MATL_CD === tObj.MATL_CD
                    ) {
                        saveObj = { ...tObj };
                    } else {
                        var tmpArray = [...tRetArray0_1];
                        tRetArray0.push(tmpArray);

                        tRetArray0_1 = [];
                        saveObj = { ...tObj };
                        var tmpObj = {};
                        tmpObj.WARE_NAME = '';
                        tmpObj.ORG_PO_CD = '';
                        tmpObj.ORG_PO_SEQ = '';
                        tmpObj.PO_CD = tObj.PO_CD;
                        tmpObj.ORDER_CD = tObj.ORDER_CD;
                        tmpObj.MATL_CD = tObj.MATL_CD;
                        tmpObj.ORG_MATL_CD = '';
                        tmpObj.VENDOR_NAME = tObj.VENDOR_NAME;
                        tmpObj.MATL_NAME = tObj.MATL_NAME2;
                        tmpObj.COLOR = tObj.COLOR2;
                        tmpObj.SPEC = tObj.SPEC2;
                        tmpObj.UNIT = tObj.UNIT2;
                        tmpObj.CONDITION = '';
                        // tmpObj.ORG_QTY = tObj.USE_QTY0;
                        // tmpObj.USE_QTY = tObj.REQ_QTY;
                        tmpObj.ORG_QTY = '0';
                        tmpObj.USE_QTY = '0';
                        tmpObj.OKUSE_QTY = '0';
                        tmpObj.DEFECT_QTY = '0';
                        tmpObj.SHORT_QTY = '0';
                        tmpObj.BALANCE = '0';
                        tmpObj.REASON = '';
                        tmpObj.USE_DATE = '';
                        tRetArray0_1.push(tmpObj);
                    }
                }
            }
            var tmpObj = { ...saveObj };
            tmpObj.ORDER_CD = tmpObj.ORG_ORDER_CD;
            tmpObj.MATL_CD = tmpObj.MATL_CD;
            tmpObj.ORG_MATL_CD = tmpObj.ORG_MATL_CD;
            tmpObj.VENDOR_NAME = tmpObj.ORG_VENDOR_NAME;
            tmpObj.MATL_NAME = tmpObj.MATL_NAME;
            tmpObj.COLOR = tmpObj.COLOR;
            tmpObj.SPEC = tmpObj.SPEC;
            tmpObj.UNIT = tmpObj.UNIT;
            tRetArray0_1.push(tmpObj);
            var tmpArray = [...tRetArray0_1];
            tRetArray0.push(tmpArray);

            var tRetArray2 = [];
            tRetArray0.forEach((col, i) => {
                var tmpArray = [...col];
                tmpArray.forEach((col1, i1) => {
                    tRetArray2.push(col1);
                });
            });

            var tRetArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRetArray2.length; tIdx++) {
                var tOne = { ...tRetArray2[tIdx] };
                tOne.DELIVERY = '';

                if (tOne.ORG_PO_CD === '') {
                    tOne.REQ_QTY = '0';
                    tOne.WARE_NAME = '';
                    tOne.RACK = '';
                    tOne.LOCATION = '';
                    tOne.CONDITION = '';
                    // tOne.ORG_QTY = '0';
                    // tOne.USE_QTY = '0';
                    tOne.DEFECT_QTY = '0';
                    tOne.OKUSE_QTY = '0';
                    tOne.BALANCE = '0';
                    tRetArray.push(tOne);
                    continue;
                }

                if (parseInt(tOne.REQ_QTY) <= 0) {
                    var tReqQty =
                        parseFloat(tOne.USE_QTY2) +
                        parseFloat(tOne.LOSS_QTY) +
                        parseFloat(tOne.DEFECT_QTY) +
                        parseFloat(tOne.NOTUSE_QTY);
                    tOne.REQ_QTY = String(tReqQty);
                }

                /*
          tOne.ORG_QTY = (await prisma.$queryRaw(Prisma.raw(
            `
                select
                    sum(stock_qty) as ORG_QTY
                from
                    KSV_STOCK_MATL
                where
                    root_idx = '${tOne.ROOT_IDX}'
            `
          )))[0].ORG_QTY || 0;
          */

                if (!tOne.WARE_NAME) tOne.WARE_NAME = tOne.FACTORY_NAME;

                const facinKey = `${String(tOne.ORG_PO_CD || '').trim()}|||${String(tOne.ORG_MATL_CD || '').trim()}`;
                if (facinDeliveryMap[facinKey]) {
                    tOne.DELIVERY = facinDeliveryMap[facinKey];
                } else {
                    const facinKey2 = `${String(tOne.ORG_PO_CD || '').trim()}|||${String(tOne.MATL_CD || '').trim()}`;
                    const facinKey3 = `${String(tOne.PO_CD || '').trim()}|||${String(tOne.ORG_MATL_CD || '').trim()}`;
                    const facinKey4 = `${String(tOne.PO_CD || '').trim()}|||${String(tOne.MATL_CD || '').trim()}`;
                    if (facinDeliveryMap[facinKey2]) {
                        tOne.DELIVERY = facinDeliveryMap[facinKey2];
                    } else if (facinDeliveryMap[facinKey3]) {
                        tOne.DELIVERY = facinDeliveryMap[facinKey3];
                    } else if (facinDeliveryMap[facinKey4]) {
                        tOne.DELIVERY = facinDeliveryMap[facinKey4];
                    }
                }

                if (parseFloat(tOne.OKUSE_QTY) <= 0) {
                    var tVal = parseFloat(tOne.USE_QTY);
                    tOne.OKUSE_QTY = parseFloat(tVal).toFixed(2);
                }

                var tVal2 =
                    parseFloat(tOne.USE_QTY) - parseFloat(tOne.OKUSE_QTY);
                tOne.BALANCE = parseFloat(tVal2).toFixed(2);

                if (!tOne.CONDITION) {
                    var tCONDITION = '';
                    if (tOne.STOCK_STATUS === 'Y') {
                        tCONDITION = 'NORMAL';
                    }
                    if (tOne.STOCK_STATUS === 'T') {
                        tCONDITION = 'SAMPLE_ONLY';
                    }
                    if (tOne.STOCK_STATUS === '3') {
                        tCONDITION = 'SAMPLE_ONLY';
                    }
                    if (tOne.STOCK_STATUS === '5') {
                        tCONDITION = 'NORMAL';
                    }
                    if (tOne.STOCK_STATUS === 'M') {
                        tCONDITION = 'NORMAL';
                    }
                    if (tOne.STOCK_STATUS === 'R') {
                        tCONDITION = 'NORMAL';
                    }
                    if (
                        tOne.STOCK_STATUS === 'P' ||
                        tOne.STOCK_STATUS === 'FA' ||
                        tOne.STOCK_STATUS === 'FG' ||
                        tOne.STOCK_STATUS === 'FH' ||
                        tOne.STOCK_STATUS === 'FI' ||
                        tOne.STOCK_STATUS === 'FU' ||
                        tOne.STOCK_STATUS === 'O' ||
                        tOne.STOCK_STATUS === 'N' ||
                        tOne.STOCK_STATUS === 'W' ||
                        tOne.STOCK_STATUS === 'B' ||
                        tOne.STOCK_STATUS === 'A' ||
                        tOne.STOCK_STATUS === 'G' ||
                        tOne.STOCK_STATUS === 'H' ||
                        tOne.STOCK_STATUS === 'I' ||
                        tOne.STOCK_STATUS === 'U' ||
                        tOne.STOCK_STATUS === 'J' ||
                        tOne.STOCK_STATUS === 'K' ||
                        tOne.STOCK_STATUS === 'Q' ||
                        tOne.STOCK_STATUS === 'V'
                    ) {
                        tCONDITION = '';
                    }
                    if (tOne.STOCK_STATUS === 'O') tCONDITION = 'JUST_ORDERED';
                    if (tOne.STOCK_STATUS === 'N') tCONDITION = 'NOT_FIXED';
                    if (tOne.STOCK_STATUS === 'W') tCONDITION = 'NOT_FIXED';
                    if (tOne.STOCK_STATUS === 'Z') tCONDITION = 'NOT_FIXED';
                    if (tOne.STOCK_STATUS === 'F') tCONDITION = 'NOT_FIXED';
                    if (tOne.STOCK_STATUS === 'C') tCONDITION = 'NOT_FIXED';
                    if (tOne.STOCK_STATUS === 'B') tCONDITION = 'DEFECT';
                    tOne.CONDITION = `${tCONDITION}/${tOne.STOCK_STATUS} `;
                } else {
                    tOne.CONDITION = `${tOne.CONDITION}/${tOne.STOCK_STATUS} `;
                }

                tOne.HS_CODE = ''; 
                tOne.COMPOSITION = ''; 
                tOne.WEIGHT = ''; 
                tOne.PRICE = ''; 
                tOne.CURR_CD = ''; 
                if (String(tOne.PO_CD || '').substring(0, 2) === 'EO' &&
                    tOne.WARE_NAME &&
                    tOne.WARE_NAME.includes('BVT')) {
                    if (tOne.HS_CD) {
                        var sqlTmp = `
                            select (hs_cd + '-' + hs_name) as HS_NAME
                            from kcd_hscode
                            where hs_no = '${tOne.HS_CD}'
                        `;
                        var retTmp = await prisma.$queryRaw(Prisma.raw(sqlTmp));
                        if (retTmp.length > 0) tOne.HS_CODE = retTmp[0].HS_NAME; 
                    }

                    var sqlTmp1 = `
                            select 
                                 comp1, comp1_percent,
                                 comp2, comp2_percent,
                                 comp3, comp3_percent,
                                 comp4, comp4_percent
                            from kcd_composition
                            where matl_name = '${String(tOne.MATL_NAME || '').replace(/'/g, "''")}'
                    `;
                    var retTmp1 = await prisma.$queryRaw(Prisma.raw(sqlTmp1));
                    if (retTmp1.length > 0) {
                        var tVal = '';
                        tVal += `${retTmp1[0].comp1},${retTmp1[0].comp1_percent}/`;
                        tVal += `${retTmp1[0].comp2},${retTmp1[0].comp2_percent}/`;
                        tVal += `${retTmp1[0].comp3},${retTmp1[0].comp3_percent}/`;
                        tVal += `${retTmp1[0].comp4},${retTmp1[0].comp4_percent}`;
                        tOne.COMPOSITION = tVal;
                    }

                    var sqlTmp2 = `
                        select a.weight, b.matl_price, b.curr_cd
                        from kcd_matl_mst a, kcd_matl_mem b
                        where a.matl_cd = '${tOne.ORG_MATL_CD}'
                        and   a.matl_cd = b.matl_cd
                        and   b.matl_seq = (select max(matl_seq) from kcd_matl_mem where matl_cd = a.matl_cd)
                    `;
                    var retTmp2 = await prisma.$queryRaw(Prisma.raw(sqlTmp2));
                    if (retTmp2.length > 0) {
                        tOne.PRICE = retTmp2[0].matl_price;
                        tOne.WEIGHT = retTmp2[0].weight;
                        tOne.CURR_CD = retTmp2[0].curr_cd;
                    }
                }

                if (args.data.CONDITION) {
                    if (tOne.CONDITION.includes(args.data.CONDITION))
                        tRetArray.push(tOne);
                } else {
                    tRetArray.push(tOne);
                }
            }


            // N+1 해결: ORG_PO_CD 있는 항목의 ROOT_IDX를 모아 한번에 조회
            const rootIdxSet = new Set<string>();
            tRetArray.forEach((item) => {
                if (item.ORG_PO_CD && item.ROOT_IDX) rootIdxSet.add(item.ROOT_IDX);
            });

            const stockQtyMap: Record<string, string> = {};
            if (rootIdxSet.size > 0) {
                const rootIdxList = Array.from(rootIdxSet)
                    .map((v) => `'${v}'`)
                    .join(',');
                const sql2 = `
                    select root_idx as ROOT_IDX, isnull(sum(stock_qty), 0) as stock_qty
                    from ksv_stock_matl
                    where root_idx in (${rootIdxList})
                    group by root_idx
                `;
                const ret2: any[] = await prisma.$queryRaw(Prisma.raw(sql2));
                ret2.forEach((row) => {
                    stockQtyMap[row.ROOT_IDX] = parseFloat(row.stock_qty).toFixed(2);
                });
            }

            var tRetArray9 = tRetArray.map((item) => {
                var tObj9 = { ...item };
                if (tObj9.ORG_PO_CD && tObj9.ROOT_IDX in stockQtyMap) {
                    tObj9.ORG_QTY = stockQtyMap[tObj9.ROOT_IDX];
                }
                return tObj9;
            });
            return tRetArray9;
        },
        mgrQueryS0516_2_2_0: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }
            let sqlStr = `
                SELECT
                    F.PO_SEQ,
                    '' AS COL1,
                    '' AS COL2,
                    F.ORDER_CD,
                    F.MATL_CD,
                    '' AS COL3,
                    D.VENDOR_NAME,
                    C.MATL_NAME,
                    C.COLOR,
                    C.SPEC,
                    C.UNIT,
                    '' AS COL4,
                    '' AS COL5,
                    '' AS COL6,
                    F.PO_QTY,
                    F.MRP_SEQ,
                    F1.MRP_SEQ AS MRP_SEQ2,
                    F1.STOCK_IDX
                FROM
                    KCD_MATL_MST C,
                    KCD_VENDOR D,
                    KSV_PO_MRP F,
                    KSV_PO_MRP F1
                WHERE
                    F.PO_CD LIKE '${args.data.PO_CD}%'
                    AND F.PO_MATL_CD = '재고발주'
                    AND F.PO_SEQ LIKE '%'
                    AND C.VENDOR_CD LIKE '%'
                    AND C.MATL_CD LIKE '%%'
                    AND C.MATL_NAME LIKE '%%'
                    AND C.COLOR LIKE '%%'
                    AND C.SPEC LIKE '%%'
                    AND C.UNIT LIKE '%%'
                    AND C.MATL_CD = F.MATL_CD
                    AND D.VENDOR_CD = C.VENDOR_CD
                    AND F1.PO_CD = F.PO_CD
                    AND F1.ORDER_CD = F.ORDER_CD
                    AND F1.PO_MATL_CD = F.MATL_CD
                    AND F1.PO_MRP_SEQ = F.MRP_SEQ
                    AND F1.REMARK = ''
                ORDER BY
                    1,
                    C.MATL_TYPE,
                    D.VENDOR_TYPE,
                    D.VENDOR_NAME,
                    C.MATL_NAME,
                    C.SPEC,
                    C.COLOR,
                    F.ORDER_CD
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tOne = { ...tRet[tIdx] };
                let sqlStr0 = `
                    SELECT
                        E.WARE_NAME,
                        B.PO_CD,
                        B.PO_SEQ,
                        B.ORDER_CD,
                        '${tOne.MATL_CD}' AS MATL_CD2,
                        B.MATL_CD,
                        D.VENDOR_NAME,
                        C.MATL_NAME,
                        C.COLOR,
                        C.SPEC,
                        C.UNIT,
                        B.STOCK_STATUS,
                        B.RACK,
                        B.LOCATION,
                        A.USE_QTY,
                        '0' AS TOTAL_QTY,
                        A.USE_QTY AS REAL_QTY,
                        0 AS DEFECT_QTY2,
                        0 AS LOSS_QTY2,
                        A.CONF_FLAG,
                        A.CONF_USER,
                        A.CONF_DATETIME,
                        A.USE_PO_CD,
                        A.USE_ORDER_CD,
                        A.USE_DATETIME,
                        A.USE_PO_SEQ,
                        A.USE_MRP_SEQ,
                        A.USE_MATL_SEQ,
                        A.FACTORY_CD,
                        A.STOCK_IDX,
                        B.ROOT_IDX,
                        A.REQ_QTY,
                        A.DEFECT_QTY,
                        A.LOSS_QTY,
                        B.REG_DATETIME,
                        A.ORG_STOCK_IDX
                    FROM
                        KSV_STOCK_USE A,
                        KSV_STOCK_MATL B,
                        KCD_MATL_MST C,
                        KCD_VENDOR D,
                        KCD_FACTORY_WARE E
                    WHERE
                        A.USE_PO_CD = '${args.data.PO_CD}'
                        AND A.USE_ORDER_CD = '${tOne.ORDER_CD}'
                        AND A.USE_MRP_SEQ = '${tOne.MRP_SEQ2}'
                        AND A.STOCK_IDX = '${tOne.STOCK_IDX}'
                        AND A.FACTORY_CD LIKE '%'
                        AND B.STOCK_IDX = A.STOCK_IDX
                        AND C.MATL_CD = B.MATL_CD
                        AND D.VENDOR_CD = C.VENDOR_CD
                        AND E.WARE_CD = B.FACTORY_CD
                    UNION
                    SELECT
                        E.WARE_NAME,
                        B.PO_CD,
                        B.PO_SEQ,
                        B.ORDER_CD,
                        '${tOne.MATL_CD}' AS MATL_CD2,
                        B.MATL_CD,
                        D.VENDOR_NAME,
                        C.MATL_NAME,
                        C.COLOR,
                        C.SPEC,
                        C.UNIT,
                        B.STOCK_STATUS,
                        B.RACK,
                        B.LOCATION,
                        A.USE_QTY,
                        '0' AS TOTAL_QTY,
                        '0' AS REAL_QTY,
                        (
                            CASE
                                WHEN B.STOCK_STATUS = 'B' THEN A.USE_QTY
                                ELSE '0'
                            END
                        ) AS DEFECT_QTY2,
                        (
                            CASE
                                WHEN B.STOCK_STATUS = 'L' THEN A.USE_QTY
                                ELSE '0'
                            END
                        ) AS LOSS_QTY2,
                        A.CONF_FLAG,
                        A.CONF_USER,
                        A.CONF_DATETIME,
                        A.USE_PO_CD,
                        A.USE_ORDER_CD,
                        A.USE_DATETIME,
                        A.USE_PO_SEQ,
                        A.USE_MRP_SEQ,
                        A.USE_MATL_SEQ,
                        A.FACTORY_CD,
                        A.STOCK_IDX,
                        B.ROOT_IDX,
                        A.REQ_QTY,
                        A.DEFECT_QTY,
                        A.LOSS_QTY,
                        B.REG_DATETIME,
                        A.ORG_STOCK_IDX
                    FROM
                        KSV_STOCK_USE A,
                        KSV_STOCK_MATL B,
                        KCD_MATL_MST C,
                        KCD_VENDOR D,
                        KCD_FACTORY_WARE E
                    WHERE
                        A.USE_PO_CD = '${args.data.PO_CD}'
                        AND A.USE_ORDER_CD = '${tOne.ORDER_CD}'
                        AND A.USE_MRP_SEQ = '${tOne.MRP_SEQ2}'
                        AND A.STOCK_IDX = '${tOne.STOCK_IDX}'
                        AND A.FACTORY_CD LIKE '%'
                        AND B.STOCK_IDX = A.STOCK_IDX
                        AND C.MATL_CD = B.MATL_CD
                        AND D.VENDOR_CD = C.VENDOR_CD
                        AND E.WARE_CD = B.FACTORY_CD
                    ORDER BY
                        A.USE_PO_CD,
                        A.USE_PO_SEQ,
                        A.USE_ORDER_CD,
                        A.USE_MRP_SEQ,
                        B.REG_DATETIME
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr0));
                tRet0.forEach((col, i) => {
                    var tObj9 = { ...col };
                    tRetArray.push(tObj9);
                });
            }

            return tRetArray;
        },
    },
};

export default moduleQuery_S0516_2_2;
