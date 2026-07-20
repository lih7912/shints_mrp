// MGR_@@TNAME@@.queries.js

import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
import axios from 'axios';

const moment = require('moment');
const fs = require('fs');
const Excel = require('exceljs');
const { upload } = require('../../../routes/s3');
const { MongoClient } = require('mongodb');

// export default로 Query 내용 내보내기
const moduleQuery_S0450_DELAY_REPORT_TBL_KSV_ORDER_MST = {
    Query: {
        mgrQuery_S0450_DELAY_REPORT: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            const esc = (v) => String(v ?? '').replace(/'/g, "''");
            const splitComma = (str) =>
                String(str ?? '')
                    .split(',')
                    .map((v) => v.trim())
                    .filter((v) => v !== '');
            const parsePoList = (rawPoCd) => {
                const poList = splitComma(rawPoCd);
                if (poList.length <= 1) return poList;

                const basePrefix = poList[0].includes('-')
                    ? `${poList[0].split('-')[0]}-`
                    : '';

                return poList.map((poCd, idx) => {
                    if (idx === 0 || poCd.includes('-')) return poCd;
                    if (basePrefix && /^[0-9]+$/.test(poCd)) {
                        return `${basePrefix}${poCd}`;
                    }
                    return poCd;
                });
            };
            const makeInSql = (arr) =>
                arr
                    .filter((v) => String(v ?? '').trim() !== '')
                    .map((v) => `'${esc(v)}'`)
                    .join(', ');

            var tSQL = '';
            var tSQL1 = '';
            var tSQL2 = '';

            var sqlStr = '';

            const poList = parsePoList(args.data.PO_CD);
            const hasMultiPo = poList.length > 1;
            const sqlPoSearch = hasMultiPo
                ? `and a.po_cd in (${makeInSql(poList)})`
                : `and a.po_cd like '%${esc(args.data.PO_CD)}%'`;

            var sqlPoCd = '';
            if (!args.data.PO_CD && args.data.VENDOR_CD) {
                var sDate = `${moment().subtract(6, 'months').format('YYYYMMDD')}`;
                var sql0_1 = `
                    select distinct
                        po_cd
                    from
                        ksv_stock_mem
                    where
                        po_qty > 0
                        and (po_qty - in_qty) > 0
                        and left(reg_datetime, 8) >= '${sDate}'
                `;
                var ret0_1 = await prisma.$queryRaw(Prisma.raw(sql0_1));
                ret0_1.forEach((col, i) => {
                    if (col.po_cd) {
                        if (sqlPoCd === '') sqlPoCd = `'${col.po_cd}'`;
                        else sqlPoCd += `,'${col.po_cd}'`;
                    }
                });
            }
            if (sqlPoCd) sqlPoCd = `and a.po_cd in (${sqlPoCd}) `;

            var sql0 = `
                select
                    isnull(sys_val, 0) as seq
                from
                    kcd_system
                where
                    sys_cd = 'MatlDelaySeq'
            `;
            var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            var tNewSeq = 1;
            var tCurSeq = 0;
            if (tRet0.length > 0) {
                tCurSeq = parseInt(tRet0[0].seq);
                tNewSeq = parseInt(tRet0[0].seq) + 1;
            }

            var sTargetETD = args.data.S_TARGET_ETD;
            var eTargetETD = args.data.E_TARGET_ETD;
            if (args.data.IS_NO_INPUT === '1') {
                //if (sTargetETD === '') sTargetETD = `${tRetDate.substring(0,4)}0101`;
                //if (eTargetETD === '') eTargetETD = `${tRetDate.substring(0,4)}1231`;
                //if (sTargetETD === '') sTargetETD = `${moment().subtract(1, 'year').format('YYYYMMDD')}`;
                //if (eTargetETD === '') eTargetETD = `${moment().add(1, 'year').format('YYYYMMDD')}`;

                if (args.data.PO_CD === '') {
                    tSQL += `and e.factory_cd like '%${args.data.FACTORY_CD}%' `;
                }
                tSQL += `and a.po_qty > 0 and (a.po_qty - a.in_qty) > 0  `;
                tSQL += `and not exists (
                    select
                        1
                    from
                        ksv_stock_in d
                    where
                        d.po_cd = a.po_cd
                        and d.po_seq = a.po_seq
                        and d.order_cd = a.order_cd
                        and d.matl_cd = a.matl_cd
                        and d.mrp_seq = a.mrp_seq
                        and d.IN_QTY > 0
                        and d.lc_qty <= 0
                ) `;
                tSQL1 = ``;
            }
            if (args.data.IS_NO_OUTPUT === '1') {
                //if (sTargetETD === '') sTargetETD = `${tRetDate.substring(0,4)}0101`;
                //if (eTargetETD === '') eTargetETD = `${tRetDate.substring(0,4)}1231`;
                //if (sTargetETD === '') sTargetETD = `${moment().subtract(1, 'year').format('YYYYMMDD')}`;
                //if (eTargetETD === '') eTargetETD = `${moment().add(1, 'year').format('YYYYMMDD')}`;

                if (args.data.PO_CD === '') {
                    tSQL += `and e.factory_cd like '%${args.data.FACTORY_CD}%' `;
                }
                tSQL += `and a.po_qty > 0 and (a.po_qty - a.out_qty) > 0  `;
                tSQL += `and not exists (
                    select
                        1
                    from
                        ksv_stock_out d
                    where
                        d.po_cd = a.po_cd
                        and d.po_seq = a.po_seq
                        and d.order_cd = a.order_cd
                        and d.matl_cd = a.matl_cd
                        and d.mrp_seq = a.mrp_seq
                ) `;
                tSQL1 = ``;
            }
            if (args.data.IS_PRICE_0 === '1') {
                if (args.data.PO_CD === '') {
                    tSQL += `and e.factory_cd like '%${args.data.FACTORY_CD}%' `;
                }
                tSQL += `and a.po_qty > 0 and a.in_qty > 0  `;
                tSQL += `and e1.vendor_cd <> 'V0558' `;
                tSQL += `and exists (
                    select
                        1
                    from
                        ksv_stock_in d
                    where
                        d.po_cd = a.po_cd
                        and d.po_seq = a.po_seq
                        and d.order_cd = a.order_cd
                        and d.matl_cd = a.matl_cd
                        and d.PAY_PRICE < 0.00001
                        and d.IN_PRICE < 0.00001
                        and d.IN_QTY > 0
                ) `;
                tSQL1 = '';
            }

            let poCdClause = '';
            if (args.data.PU_CD) {
                let poCdList = (
                    await prisma.$queryRaw(
                        Prisma.raw(
                            `
                                select
                                    VENDOR_CD,
                                    PO_CD2
                                from
                                    ksv_pu_mst2
                                where
                                    pu_cd = '${args.data.PU_CD}'
                            `,
                        ),
                    )
                )[0];

                let poCds = poCdList.PO_CD2.split('/')
                    .map((s) => `'${s}'`)
                    .join(',');

                poCdClause = ` and e1.vendor_cd = '${poCdList.VENDOR_CD}'`;
                poCdClause += ` and a.po_cd in (${poCds})`;
            }
            sqlStr = `
                select
                    ${args.data.PU_CD ? 'TOP 1000' : ''} k.PO_CD,
                    k.MATL_CD,
                    k.VENDOR_NAME,
                    k.MATL_NAME,
                    k.SPEC,
                    k.COLOR,
                    k.BUYER_CD,
                    k.VENDOR_TYPE,
                    k.PU_CD,
                    sum(k.po_qty) as S_PO_QTY,
                    sum(k.in_qty) as S_IN_QTY,
                    sum(k.out_qty) as S_OUT_QTY,
                    sum(k.po_qty_mrp) as S_PO_QTY_MRP,
                    sum(k.infac_qty) as S_FAC_IN_QTY
                from
                    (
                        select
                            a.PO_CD,
                            a.PO_SEQ,
                            left(a.order_cd, 2) as BUYER_CD,
                            e2.VENDOR_CD,
                            e2.VENDOR_NAME,
                            e2.VENDOR_TYPE,
                            e1.MATL_NAME,
                            e1.SPEC,
                            e1.COLOR,
                            a.MATL_CD,
                            a.MATL_SEQ,
                            a.MRP_SEQ,
                            a.PO_QTY,
                            a.IN_QTY,
                            a.OUT_QTY,
                            a.INFAC_QTY,
                            isnull(a1.pu_cd, '') as PU_CD,
                            sum(b.po_qty) as PO_QTY_MRP
                        from
                            ksv_stock_mem a
                            left join ksv_stock_mem2 a1 on a1.po_cd = a.po_cd
                                                       and a1.pu_cd = a.pu_cd
                                                       and a1.matl_cd = a.matl_cd
                            left join kcd_matl_mst e3 on a1.matl_cd = e3.matl_cd
                            left join ksv_pu_mst2 k1 on a1.pu_cd = k1.pu_cd 
                                                    and k1.vendor_cd = e3.vendor_cd,
                            ksv_po_mrp b,
                            ksv_po_mst e,
                            kcd_matl_mst e1,
                            kcd_vendor e2
                        where
                            a.po_cd = b.po_cd
                            and a.po_cd = e.po_cd
                            and e.po_seq = 1
                            and a.order_cd = b.order_cd
                            and a.matl_cd = b.matl_cd
                            and a.matl_seq = b.matl_seq
                            and a.mrp_seq = b.mrp_seq
                            ${sqlPoSearch} ${sqlPoCd}
                            and left(a.order_cd, 2) like '%${args.data.BUYER_CD}%'
                            and a.matl_cd = e1.matl_cd
                            and e1.vendor_cd = e2.vendor_cd
                            and e2.vendor_type like '%${args.data.VENDOR_TYPE}%'
                            and e2.vendor_name like '%${args.data.VENDOR_CD}%'
                            and e2.vendor_matl_type like '%${args.data.MATL_TYPE}%'
                            and b.use_po_type = '1'
                            and b.diff_po_type in ('0', '2', '3', '4')
                            -- and   (a.po_seq < 97 or a.po_seq >= 99)
                            ${tSQL} ${poCdClause}
                        group by
                            a.po_cd,
                            a.po_seq,
                            left(a.order_cd, 2),
                            e2.vendor_cd,
                            e2.vendor_name,
                            e2.vendor_type,
                            e1.matl_name,
                            e1.spec,
                            e1.color,
                            a.matl_cd,
                            a.matl_seq,
                            a.mrp_seq,
                            a.po_qty,
                            a.in_qty,
                            a.out_qty,
                            a.infac_qty,
                            isnull(a1.pu_cd, '')
                    ) k
                group by
                    k.po_cd,
                    k.matl_cd,
                    k.vendor_name,
                    k.matl_name,
                    k.spec,
                    k.color,
                    k.buyer_cd,
                    k.vendor_type,
                    k.pu_cd ${tSQL1}
                order by
                    k.po_cd,
                    k.vendor_name,
                    k.matl_name,
                    k.spec,
                    k.color
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            var tArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tOne = { ...tRet[tIdx] };
                var sql3 = `
                    select
                        '${tRetDate.substring(0, 8)}' as REG_DATETIME,
                        e.po_cd as PO_CD,
                        e.po_conf_date as PO_CONF_DATE,
                        isnull(f.matl_due_date, e.plan_etd) as TARGET_ETD,
                        --e.plan_eta as TARGET_ETA,
                        f.matl_due_date as TARGET_ETA,
                        c.vendor_name as VENDOR_NAME,
                        a.matl_cd as MATL_CD,
                        b.matl_name as MATL_NAME,
                        b.color as COLOR,
                        b.spec as SPEC,
                        b.unit as UNIT,
                        a.remark as DELAY_REASON,
                        '' as REMARK,
                        right(a.exp_date, 4) as EX_IN_DATE,
                        '' as CUT_DATE,
                        a.etd as ETD,
                        a.eta as ETA,
                        a.delivery as DELIVERY_TYPE,
                        '0' as FARE_TYPE,
                        a.matl_cd as MATL_CD1,
                        ${tNewSeq} as SEQ,
                        e.po_conf_date as PO_CONF_DATE2,
                        isnull(f.matl_due_date, e.plan_etd) as TARGET_ETD2,
                        e.plan_eta as TARGET_ETA2,
                        0 as SHIP_QTY,
                        '0' as END_FLAG,
                        a.exp_date as EX_IN_DATE2,
                        a.upd_user as UPD_USER,
                        0 as NEED_QTY,
                        0 as REMAIN_QTY_IN,
                        0 as REMAIN_QTY_OUT,
                        0 as TOT_CNT,
                        '' as BUYER_CD,
                        sum(convert(INT, TOT_CNT)) as MATLLIST_QTY
                    from
                        ksv_po_matllist a,
                        kcd_matl_mst b,
                        kcd_vendor c,
                        ksv_po_mst e,
                        (
                            select
                                a1.po_cd,
                                max(a4.matl_due_date) as matl_due_date
                            from
                                ksv_po_mst a1,
                                ksv_po_mem a2,
                                ksv_order_mst a4
                            where
                                a1.po_seq = 1
                                and a1.po_cd = a2.po_cd
                                and a4.order_cd = a2.order_cd
                            group by
                                a1.po_cd
                        ) f
                    where
                        e.po_status = '4'
                        and e.po_seq = '1'
                        -- and e.plan_flag = '1' 
                        and e.po_cd = '${tOne.PO_CD}'
                        and a.matl_cd = '${tOne.MATL_CD}'
                        and a.po_cd = e.po_cd
                        and f.po_cd = e.po_cd
                        and b.matl_cd = a.matl_cd
                        and c.vendor_cd = b.vendor_cd
                    group by
                        e.po_cd,
                        e.po_conf_date,
                        e.plan_etd,
                        e.plan_eta,
                        f.matl_due_date,
                        c.vendor_name,
                        b.matl_name,
                        b.color,
                        b.spec,
                        b.unit,
                        a.matl_cd,
                        a.tot_cnt,
                        a.stock_qty,
                        a.remark,
                        right(a.exp_date, 4),
                        a.etd,
                        a.eta,
                        a.delivery,
                        a.upd_user,
                        a.exp_date
                `;
                var tRet3 = await prisma.$queryRaw(Prisma.raw(sql3));
                if (tRet3.length <= 0) continue;

                var sqlFacIn = `
                    select
                        'P1-FACIN' as KIND,
                        p.PO_CD,
                        p.MATL_CD,
                        '0' as PO_QTY,
                        '0' as STSIN,
                        '0' as STSOUT,
                        '0' as FACIN,
                        '0' as FACOUT,
                        sum(p.in_qty) as USE_QTY2,
                        '0' as PO_QTY2,
                        p2.MATL_NAME,
                        p2.COLOR,
                        p2.SPEC,
                        p2.UNIT,
                        p3.VENDOR_CD,
                        p3.VENDOR_NAME
                    from
                        ksv_stock_facin p,
                        kcd_matl_mst p2,
                        kcd_vendor p3
                    where
                        p.po_cd = '${tOne.PO_CD}'
                        and p.matl_cd = '${tOne.MATL_CD}'
                        and p.matl_cd = p2.matl_cd
                        and p2.vendor_cd = p3.vendor_cd
                    group by
                        p.po_cd,
                        p.matl_cd,
                        p2.matl_name,
                        p2.color,
                        p2.spec,
                        p2.unit,
                        p3.vendor_cd,
                        p3.vendor_name
                `;
                var retFacIn = await prisma.$queryRaw(Prisma.raw(sqlFacIn));
                if (retFacIn.length > 0) {
                    tOne.S_FAC_IN_QTY = parseFloat(retFacIn[0].USE_QTY2);
                }

                var tOne1 = { ...tRet3[0] };
                tOne1.S_FAC_IN_QTY = tOne.S_FAC_IN_QTY;
                tOne1.NEED_QTY = tOne.S_PO_QTY;
                tOne1.REMAIN_QTY_IN = tOne.S_PO_QTY - tOne.S_IN_QTY;
                tOne1.REMAIN_QTY_OUT = tOne.S_PO_QTY - tOne.S_OUT_QTY;
                tOne1.REMAIN_QTY_FAC_IN = tOne.S_PO_QTY - tOne.S_FAC_IN_QTY;
                tOne1.TOT_CNT = tOne.S_PO_QTY_MRP;
                tOne1.BUYER_CD = tOne.BUYER_CD;
                tOne1.VENDOR_TYPE = tOne.VENDOR_TYPE;
                var sql2 = `
                    select
                        d.ship_qty,
                        d.cut_date,
                        d.etd,
                        d.eta,
                        d.delay_reason,
                        d.delivery_type,
                        d.fare_type,
                        d.remark,
                        d.ex_in_date
                    from
                        kzz_matl_delay d
                    where
                        d.seq = '${tCurSeq}'
                        and d.po_cd = '${tOne.PO_CD}'
                        and d.matl_cd = '${tOne.MATL_CD}'
                `;
                var tRet2 = await prisma.$queryRaw(Prisma.raw(sql2));
                if (tRet2.length > 0) {
                    tOne1.SHIP_QTY = tRet2[0].ship_qty;
                    tOne1.CUT_DATE = tRet2[0].cut_date;
                    tOne1.DELAY_REASON = tRet2[0].delay_reason;
                    tOne1.REMARK = tRet2[0].remark;
                    tOne1.DELIVERY_TYPE = tRet2[0].delivery_type;
                    tOne1.FARE_TYPE = tRet2[0].fare_type;
                    tOne1.EX_IN_DATE = tRet2[0].ex_in_date;
                }
                tOne1.S_IN_QTY = tOne.S_IN_QTY;
                tOne1.S_OUT_QTY = tOne.S_OUT_QTY;
                tOne1.PU_CD = tOne.PU_CD;
                tOne1.VENDOR_TYPE = tOne.VENDOR_TYPE || tOne.vendor_type || tRet[tIdx].VENDOR_TYPE || tRet[tIdx].vendor_type || '';
                tArray.push(tOne1);
            }

            // console.log(sqlStr);

            return tArray;
        },
        mgrQuery_S0450_DELAY_REPORT_CODE: async (_, args) => {
            var tWRet: any = {};

            let sqlStr = `
                select
                    *
                from
                    kcd_factory
                where
                    status_cd = '0'
                    and factory_cd in ('FC034', 'FC044', 'FC010')
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.FACTORY_CD = '';
            tObj.FACTORY_NAME = ' ';
            tRet.unshift(tObj);
            tWRet.FACTORY_CD = tRet;

            tRet = [];
            let sqlStr = `
                select
                    *
                from
                    kcd_buyer
                where
                    status_cd = '0'
            `;
            let tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tRet0.forEach((col, i) => {
                var tObj = { ...col };
                tObj.BUYER_CD = col.BUYER_CD;
                tObj.BUYER_NAME = `(${col.BUYER_CD})${col.BUYER_NAME}`;
                tRet.push(tObj);
            });

            var tObj = {};
            tObj.BUYER_CD = '';
            tObj.BUYER_NAME = ' ';
            tRet.unshift(tObj);
            tWRet.BUYER_CD = tRet;

            tRet = [];
            let sqlStr = `
                select
                    *
                from
                    kcd_vendor
                order by
                    reg_datetime desc
            `;
            let tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tRet0.forEach((col, i) => {
                var tObj = { ...col };
                tObj.VENDOR_CD = col.VENDOR_CD;
                tObj.VENDOR_NAME = `(${col.VENDOR_CD})${col.VENDOR_NAME}`;
                tRet.push(tObj);
            });
            var tObj = {};
            tObj.VENDOR_CD = '';
            tObj.VENDOR_NAME = ' ';
            tRet.unshift(tObj);
            tWRet.VENDOR_CD = tRet;

            tRet = [];
            let sqlStr = `
                select
                    *
                from
                    ksv_po_mst
                where
                    po_cd like '%${args.data.PO_CD}%'
                    and po_seq = 1
            `;
            let tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tRet0.forEach((col, i) => {
                var tObj = { ...col };
                tObj.PO_CD = col.PO_CD;
                tRet.push(tObj);
            });
            var tObj = {};
            tObj.PO_CD = ' ';
            tRet.unshift(tObj);
            tWRet.PO_CD = tRet;

            let sqlStr = `
                select
                    *
                from
                    kcd_code
                where
                    cd_group = 'MATL_TYPE'
            `;
            tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_CODE = '';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWRet.MATL_TYPE = tRet;

            let sqlStr = `
                select
                    *
                from
                    kcd_code
                where
                    cd_group = 'VENDOR_TYPE'
            `;
            tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_CODE = '';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWRet.VENDOR_TYPE = tRet;

            return tWRet;
        },

        mgrQuery_S0450_DELAY_REPORT_TBL_KSV_ORDER_MST: async (_, args) => {
            var tSQL = '';
            var tSQL1 = '';
            var tSQL2 = '';
            var tSQL3 = '';
            var tSQL4 = '';
            /*
       if (args.KEY1 !== '') {
           tSQL += `AND KEY1 = '${args.KEY1}' `;
       }
*/

            var tFlag = 0;
            var tKeys = Object.keys(args.data);
            tKeys.forEach((col, i) => {
                if (
                    args.data[`${col}`] === '' ||
                    args.data[`${col}`] === ' ' ||
                    args.data[`${col}`] === '-'
                ) {
                } else {
                    tFlag = 1;
                }
            });

            if (tFlag === 0) {
                var tRetDate = AFLib.getCurrTime();
                var tYY = parseInt(tRetDate.substring(0, 4));
                var tMon = parseInt(tRetDate.substring(4, 6));

                var tSYY = '';
                var tSMON = '';

                if (tMon > 6) {
                    tSYY = String(tYY);
                    tSMON = String(tMon - 6);
                    if (parseInt(tSMON) < 10) tSMON = `0${tSMON}`;
                    if (parseInt(tMon) < 10) tMon = `0${tMon}`;
                } else {
                    tSYY = String(tYY - 1);
                    tSMON = String(6 + tMon);
                    if (parseInt(tSMON) < 10) tSMON = `0${tSMON}`;
                    if (parseInt(tMon) < 10) tMon = `0${tMon}`;
                }

                var tSDate = `${tSYY}${tSMON}01`;
                var tEDate = `${tYY}${tMon}31`;

                tSQL += `AND a1.ORDER_DATE between '${tSDate}' and '${tEDate}' `;
            }

            if (args.data.ORDER_CD !== '') {
                tSQL += `AND a1.ORDER_CD like '%${args.data.ORDER_CD}%' `;
            }
            if (args.data.FACTORY_CD !== '') {
                tSQL += `AND a1.FACTORY_CD like '%${args.data.FACTORY_CD}%' `;
            }
            if (args.data.IS_DUEDATE === '1') {
                if (
                    args.data.S_DUE_DATE !== '' &&
                    args.data.E_DUE_DATE !== ''
                ) {
                    tSQL += `AND a1.DUE_DATE between '${args.data.S_DUE_DATE}' and '${args.data.E_DUE_DATE}' `;
                } else if (args.data.S_DUE_DATE !== '') {
                    tSQL += `AND a1.DUE_DATE between '${args.data.S_DUE_DATE}' and '99999999' `;
                }
            }
            if (args.data.IS_SHIP_DATE === '1') {
                if (
                    args.data.S_SHIP_DATE !== '' &&
                    args.data.E_SHIP_DATE !== ''
                ) {
                    tSQL1 += `AND f2.SHIP_DATE between '${args.data.S_SHIP_DATE}' and '${args.data.E_SHIP_DATE}' `;
                } else if (args.data.S_SHIP_DATE !== '') {
                    tSQL1 += `AND f2.SHIP_DATE between '${args.data.S_SHIP_DATE}' and '99999999' `;
                }
                tSQL2 += `WHERE f.sum_ship_cnt > 0 `;
            }
            if (args.data.IS_SHIP === '1') {
                tSQL2 += `WHERE f.sum_ship_cnt <= 0 `;
            }
            if (args.data.BUYER_CD !== '') {
                tSQL += `AND LEFT(a1.ORDER_CD, 2)  like '%${args.data.BUYER_CD}%' `;
            }

            if (args.data.PO_CD !== '') {
                tSQL3 += `inner join ksv_po_mem b on a.order_cd = b.order_cd and b.po_seq = 1 AND b.PO_CD like '%${args.data.PO_CD}%' `;
            } else {
                tSQL3 += `left join ksv_po_mem b on a.order_cd = b.order_cd and b.po_seq = 1  `;
            }

            if (args.data.BUYER_TEAM !== '') {
                tSQL += `
                    AND LEFT(a1.ORDER_CD, 2) in (
                        select
                            buyer_cd
                        from
                            kcd_buyer
                        where
                            buyer_team = '${args.data.BUYER_TEAM}'
                    )
                `;
            }
            if (args.data.REG_USER !== '') {
                tSQL += `AND a1.REG_USER  like '%${args.data.REG_USER}%' `;
            }
            if (args.data.REF_ORDER_NO !== '') {
                tSQL += `AND a1.REF_ORDER_NO  like '%${args.data.REF_ORDER_NO}%' `;
            }
            if (args.data.STATUS_CD === '999') {
                tSQL += `AND a1.ORDER_STATUS  not in ('4','9') `;
            } else if (args.data.STATUS_CD === '888') {
                tSQL += `AND a1.ORDER_STATUS  in ('1','2', '3', '7') `;
            } else if (args.data.STATUS_CD === '777') {
                tSQL += `AND a1.ORDER_STATUS  in ('1','2', '3', '5') `;
            } else if (args.data.STATUS_CD !== '') {
                tSQL += `AND a1.ORDER_STATUS = '${args.data.STATUS_CD}' `;
            }

            if (args.data.STYLE_CD !== '') {
                tSQL += `AND d.style_cd like '%${args.data.STYLE_CD}%' `;
            }

            if (args.data.IS_SAMPLE === '1' && args.data.IS_MAIN !== '1') {
                tSQL += `AND a1.SAMPLE_FLAG = '1' `;
            }
            if (args.data.IS_SAMPLE !== '1' && args.data.IS_MAIN === '1') {
                tSQL += `AND a1.SAMPLE_FLAG <> '1' `;
            }

            let sqlStr = `
                select
                    top 300 isnull(b.PO_CD, '') as PO_CD,
                    a.ORDER_CD,
                    LEFT(a.ORDER_CD, 2) as BUYER_CD,
                    h1.BUYER_NAME,
                    a.REF_ORDER_NO,
                    a.STYLE_NAME,
                    a.STYLE_CD,
                    a.ORDER_DATE,
                    a.DUE_DATE,
                    a.MATL_DUE_DATE,
                    a.TOT_CNT,
                    a.ADD_CNT,
                    isnull(f.sum_ship_cnt, 0) as SHIP_CNT,
                    a.AVR_PRICE,
                    a.CURR_CD,
                    a.USD_PRICE,
                    isnull(a.FC_PRICE, 0) as FC_PRICE,
                    (
                        case
                            when isnull(f.sum_ship_cnt, 0) = 0 then 0
                            else a.matl_amt / isnull(f.sum_ship_cnt, 0)
                        end
                    ) as C_MATL_AMT,
                    (
                        case
                            when isnull(f.sum_ship_cnt, 0) = 0 then 0
                            else isnull(a.etc_amt, 0) / isnull(f.sum_ship_cnt, 0)
                        end
                    ) as C_ETC_AMT,
                    (
                        a.usd_price - isnull(a.fc_price, 0) - case
                            when isnull(f.sum_ship_cnt, 0) = 0 then 0
                            else a.matl_amt / isnull(f.sum_ship_cnt, 0)
                        end - case
                            when isnull(f.sum_ship_cnt, 0) = 0 then 0
                            else a.etc_amt / isnull(f.sum_ship_cnt, 0)
                        end
                    ) as MARGIN,
                    (
                        case
                            when a.usd_price = 0 then 0
                            else (
                                a.usd_price - isnull(a.fc_price, 0) - case
                                    when isnull(f.sum_ship_cnt, 0) = 0 then 0
                                    else a.matl_amt / isnull(f.sum_ship_cnt, 0)
                                end - case
                                    when isnull(f.sum_ship_cnt, 0) = 0 then 0
                                    else a.etc_amt / isnull(f.sum_ship_cnt, 0)
                                end
                            ) / a.usd_price
                        end
                    ) * 100 as MARGIN2,
                    e.cd_name as STATUS_NAME,
                    a.END_STATUS,
                    case
                        when a.REMARK = '' then ' '
                        else ' '
                    END as REMARK,
                    --isnull(a.REMARK, '') as REMARK,
                    a.REG_USER,
                    h.FACTORY_NAME,
                    a.FACTORY_CD,
                    isnull(a.REF_Q_OUTER, '') as REF_Q_OUTER,
                    isnull(a.REF_Q_LINER, '') as REF_Q_LINER,
                    isnull(a.ETC_AMT, 0) as ETC_AMT,
                    isnull(a.MATL_AMT, 0) as MATL_AMT,
                    a.ORDER_TYPE,
                    a.ORDER_STATUS,
                    isnull(a.ORG_DUE_DATE, '') as ORG_DUE_DATE,
                    a.ORDER_FLAG,
                    a.SAMPLE_FLAG,
                    a.MATL_SALE_FLAG,
                    a.FAC_LC_FLAG,
                    a.FAC_TT_FLAG,
                    isnull(a.PI_CD, '') as PI_CD
                from
                    (
                        select
                            a1.*,
                            d.STYLE_NAME
                        from
                            ksv_order_mst a1,
                            kcd_style d
                        where
                            a1.order_type in ('0', '1')
                            and a1.style_cd = d.style_cd ${tSQL}
                            -- order by reg_datetime desc 
                            -- offset 0 rows fetch next 1000 rows only
                    ) a ${tSQL3}
                    left join kcd_code e on a.order_status = e.cd_code
                    and e.cd_group = 'ORDER_STATUS'
                    left join (
                        select
                            f1.order_cd,
                            isnull(sum(f2.ship_cnt), 0) as sum_ship_cnt
                        from
                            (
                                select
                                    a1.*,
                                    d.STYLE_NAME
                                from
                                    ksv_order_mst a1,
                                    kcd_style d
                                where
                                    a1.order_type in ('0', '1')
                                    and a1.style_cd = d.style_cd ${tSQL}
                                    -- order by reg_datetime desc
                                    -- offset 0 rows fetch next 1000 rows only
                            ) f1,
                            ksv_order_ship f2
                        where
                            f1.order_cd = f2.order_cd ${tSQL1}
                            and f2.ship_ptype in ('0', '5')
                        group by
                            f1.order_cd
                    ) f on a.order_cd = f.order_cd
                    left join kzz_outsourcing_cost g on a.order_cd = g.order_cd
                    left join kcd_factory h on a.factory_cd = h.factory_cd
                    left join kcd_buyer h1 on left(a.order_cd, 2) = h1.buyer_cd
                order by
                    a.order_cd
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                PO_CD: '',
                ORDER_CD: '',
                REF_ORDER_NO: '',
                STYLE_NAME: '',
                STYLE_CD: '',
                ORDER_DATE: '',
                DUE_DATE: '',
                TOT_CNT: '',
                ADD_CNT: '',
                SHIP_CNT: '',
                AVR_PRICE: '',
                CURR_CD: '',
                USD_PRICE: '',
                FC_PRICE: '',
                MATL_AMT: '',
                ETC_AMT: '',
                MARGIN: '',
                MARGIN2: '',
                STATUS_NAME: '',
                STATUS_CD: '',
                END_STATUS: '',
                REMARK: '',
                REG_USER: '',
                FACTORY_NAME: '',
                FACTORY_CD: '',
            };
            var tRetArray: any[] = [];
            tRet.forEach((col, i) => {
                if (args.data.IS_SHIP === '1') {
                    if (parseFloat(col.SHIP_CNT) <= 0) tRetArray.push(col);
                } else if (args.data.IS_SHIP_DATE === '1') {
                    if (parseFloat(col.SHIP_CNT) > 0) tRetArray.push(col);
                } else if (col.REMARK == '') {
                    console.log(col.REMARK);
                    col.REMARK = ' ';
                    tRetArray.push(col);
                } else {
                    tRetArray.push(col);
                }
            });
            var tIdx = 0;
            return tRetArray;
        },

        mgrQuery_S0450_DELAY_REPORT_EXCEL: async (_, args, contextValue) => {
            var tSQL = '';

            let sqlStr = `
                SELECT
                    a.ORDER_CD -- 0
                ,
                    a.ORDER_FLAG -- 1
                ,
                    a.SAMPLE_FLAG -- 2
                ,
                    d.STYLE_NAME -- 3
                ,
                    ISNULL(e.BUYER_NAME, '') AS BYR --4 
                ,
                    c.CD_NAME as ORDER_STATUS_N --5
                ,
                    '' as tempv --6
                ,
                    b.FACTORY_NAME --7
                ,
                    a.ORDER_DATE -- 8
                ,
                    SUBSTRING(a.DUE_DATE, 1, 4) + '-' + SUBSTRING(a.DUE_DATE, 5, 2) + '-' + SUBSTRING(a.DUE_DATE, 7, 2) AS duedate --9
                ,
                    '',
                    a.TOT_CNT --11
                ,
                    0 --12
                ,
                    a.COMMISSION --13
                ,
                    a.AVR_PRICE --14
                ,
                    a.FC_PRICE --15
                ,
                    a.MATL_AMT --16
                ,
                    0 --17
                ,
                    0 --18
                ,
                    a.ETC_AMT --19
                ,
                    a.REG_USER --20
                ,
                    SUBSTRING(a.REG_DATETIME, 1, 4) + '-' + SUBSTRING(a.REG_DATETIME, 5, 2) + '-' + SUBSTRING(a.REG_DATETIME, 7, 2) AS regdate --21
                ,
                    a.REF_ORDER_NO --22
                ,
                    a.REF_Q_OUTER --23
                ,
                    a.REF_Q_LINER --24
                ,
                    a.REF_ORDER_REQ --25
                ,
                    a.REF_COLOR1 --26
                ,
                    a.REF_COLOR2 --27
                ,
                    a.REF_SIZE1 --28
                ,
                    a.REF_SIZE2 --29
                ,
                    isnull(a.REF_QTY1, 0) as REF_QTY1 --30
                ,
                    isnull(a.REF_QTY2, 0) as REF_QTY2 --31
                ,
                    a.STATUS_CD --32
                ,
                    a.SIZE_GROUP --33
                ,
                    isnull(f.SIZE_MEMBER, '') as smb --34
                ,
                    f.size_cnt,
                    a.remark
                FROM
                    KSV_ORDER_MST a
                    INNER JOIN KCD_FACTORY b ON a.FACTORY_CD = b.FACTORY_CD
                    LEFT OUTER JOIN KCD_SIZE_MST f ON a.SIZE_GROUP = f.SIZE_GROUP
                    LEFT OUTER JOIN KCD_CODE c ON a.ORDER_STATUS = c.CD_CODE
                    LEFT OUTER JOIN KCD_BUYER e ON LEFT(a.ORDER_CD, 2) = e.BUYER_CD
                    LEFT OUTER JOIN KCD_STYLE d ON a.STYLE_CD = d.STYLE_CD
                WHERE
                    (c.CD_GROUP = 'ORDER_STATUS')
                    AND ORDER_CD = '${args.data.ORDER_CD}'
                ORDER BY
                    a.YY DESC,
                    a.SEQ DESC
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            let sqlStr1 = `
                SELECT
                    a.ORDER_CD,
                    b.COLOR,
                    c.CD_NAME,
                    isnull(b.COLOR, '') as COLOR,
                    a.PRICE,
                    isnull(a.SIZE_CNT, 0) as SIZE_CNT,
                    isnull(b.COLLECTION, '') as COLLECTION
                FROM
                    KSV_ORDER_MEM a
                    INNER JOIN KSV_PROD_MST b ON a.PROD_CD = b.PROD_CD
                    INNER JOIN KCD_CODE c ON b.PROD_TYPE = c.CD_CODE
                WHERE
                    (c.CD_GROUP = 'PROD_TYPE')
                    and (A.ORDER_CD = '${args.data.ORDER_CD}')
            `;
            var tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));

            try {
                var tSQL = '';
                var tRetDate = AFLib.getCurrTime();
                var tRetDate1 = tRetDate.substring(0, 8);
                var tUserInfo = AFLib.getUserInfo(contextValue);

                var tIdx = 0;
                var tArray = [];

                var tSumAmtArray = [];

                var tPath0 = '';
                var tCols0 = __dirname.split('/');
                var tFlag0 = 0;
                tCols0.forEach((col, i) => {
                    if (col !== '') {
                        if (col === 'src') {
                            tPath0 += '/upload/excel_template';
                            tFlag0 = 1;
                        }
                        if (tFlag0 === 0) {
                            tPath0 += '/' + col;
                        }
                    }
                });

                var tTemplateExcel = `${tPath0}/오더_OrderSheet.xlsx`;

                const wb = new Excel.Workbook();
                await wb.xlsx.readFile(tTemplateExcel);

                var tSheetName = `Sheet1`;
                const sheet = wb.getWorksheet(tSheetName);

                const tOne = { ...tRet[0] };

                sheet.getCell(9, 6).value = args.data.ORDER_CD;
                sheet.getCell(11, 6).value = tOne.STYLE_NAME;
                sheet.getCell(10, 6).value = tOne.BYR;
                sheet.getCell(8, 6).value = tOne.FACTORY_NAME;
                sheet.getCell(8, 25).value = tOne.duedate;
                sheet.getCell(12, 6).value = tOne.TOT_CNT;

                var nSCnt = parseInt(tOne.size_cnt);
                var nMSCnt = 0;
                if (nSCnt > 23) nMSCnt = nSCnt - 23;

                sheet.getCell(5, 31).value = tRetDate1;

                var tSizes = tOne.smb.split(',');
                if (tSizes.length > 0) {
                    tSizes.forEach((col, i) => {
                        sheet.getCell(15, 7 + i).value = col;
                    });
                }

                if (tRet1.length > 0) {
                    sheet.getCell(10, 25).value = tRet1[0].COLLECTION;
                    tRet1.forEach((col, i) => {
                        sheet.getCell(16 + i, 2).value = col.COLOR;
                        var tSizeLeng = col.SIZE_CNT.length / 6;
                        var tIdx9 = 0;
                        for (tIdx9 = 0; tIdx9 < tSizeLeng; tIdx9++) {
                            var tVal = col.SIZE_CNT.substring(
                                tIdx9 * 6,
                                (tIdx9 + 1) * 6,
                            );
                            sheet.getCell(16 + i, 7 + tIdx9).value =
                                parseFloat(tVal);
                        }
                    });
                }

                var tSizeLeng = tRet1.length;

                sheet.getCell(9, 25).value = tOne.REF_ORDER_NO;
                sheet.getCell(21 + tSizeLeng, 3).value = tOne.REF_ORDER_REQ;
                sheet.getCell(31 + tSizeLeng, 2).value = tOne.REF_Q_OUTER;
                sheet.getCell(31 + tSizeLeng, 8).value = tOne.REF_Q_LINER;
                sheet.getCell(31 + tSizeLeng, 20).value = tOne.REF_COLOR1;
                sheet.getCell(32 + tSizeLeng, 20).value = tOne.REF_COLOR2;
                sheet.getCell(31 + tSizeLeng, 26).value = tOne.REF_SIZE1;
                sheet.getCell(32 + tSizeLeng, 26).value = tOne.REF_SIZE2;
                sheet.getCell(31 + tSizeLeng, 31).value = parseFloat(
                    tOne.REF_QTY1,
                );
                sheet.getCell(32 + tSizeLeng, 31).value = parseFloat(
                    tOne.REF_QTY2,
                );
                sheet.getCell(18 + tSizeLeng, 2).value = 'REMARK:';
                sheet.getCell(18 + tSizeLeng, 7).value = tOne.REMARK;

                var tPath = '';
                var tCols = __dirname.split('/');
                var tFlag = 0;
                tCols.forEach((col, i) => {
                    if (col === 'src') {
                        tPath += '/upload/excel';
                        tFlag = 1;
                    }
                    if (tFlag === 0) {
                        tPath += '/' + col;
                    }
                });

                var tExcelFileName0 = `OrderSheet-${args.data.ORDER_CD}-${tUserInfo.USER_ID}-${tRetDate}.xlsx`;
                //var tExcelFileName = `${tPath}/${tExcelFileName0}`;
                const fileData = await wb.xlsx.writeBuffer();

                let fileUrl = '';

                try {
                    const response = await generateUploadURL();
                    const presignedUrl = response.uploadURL;

                    await axios.put(
                        presignedUrl,
                        {
                            body: fileData,
                        },
                        {
                            headers: {
                                'Content-Type': fileData.type,
                            },
                        },
                    );

                    fileUrl = presignedUrl.split('?')[0];
                } catch (err) {
                    console.log(err);
                }
                var tRetArray: any[] = [];
                var tObj = {
                    id: 0,
                    CODE: 'SUCCEED:' + '?' + tExcelFileName0 + '?' + fileUrl,
                };

                tRetArray.push(tObj);
                return tRetArray;
            } catch (error) {
                var tRetArray: any[] = [];
                var tObj = {
                    id: 0,
                    CODE: 'ERROR: ' + error.message,
                };

                tRetArray.push(tObj);
                return tRetArray;
            }
        },

        mgrQuery_S0450_ORDER_SHEET_COMBINE: async (_, args, contextValue) => {
            var tSQL = '';

            let sqlStr = `
                SELECT
                    a.ORDER_CD -- 0
                ,
                    a.ORDER_FLAG -- 1
                ,
                    a.SAMPLE_FLAG -- 2
                ,
                    d.STYLE_NAME -- 3
                ,
                    ISNULL(e.BUYER_NAME, '') AS BYR --4 
                ,
                    c.CD_NAME as ORDER_STATUS_N --5
                ,
                    '' as tempv --6
                ,
                    b.FACTORY_NAME --7
                ,
                    a.ORDER_DATE -- 8
                ,
                    SUBSTRING(a.DUE_DATE, 1, 4) + '-' + SUBSTRING(a.DUE_DATE, 5, 2) + '-' + SUBSTRING(a.DUE_DATE, 7, 2) AS duedate --9
                ,
                    '',
                    a.TOT_CNT --11
                ,
                    0 --12
                ,
                    a.COMMISSION --13
                ,
                    a.AVR_PRICE --14
                ,
                    a.FC_PRICE --15
                ,
                    a.MATL_AMT --16
                ,
                    0 --17
                ,
                    0 --18
                ,
                    a.ETC_AMT --19
                ,
                    a.REG_USER --20
                ,
                    SUBSTRING(a.REG_DATETIME, 1, 4) + '-' + SUBSTRING(a.REG_DATETIME, 5, 2) + '-' + SUBSTRING(a.REG_DATETIME, 7, 2) AS regdate --21
                ,
                    a.REF_ORDER_NO --22
                ,
                    a.REF_Q_OUTER --23
                ,
                    a.REF_Q_LINER --24
                ,
                    a.REF_ORDER_REQ --25
                ,
                    a.REF_COLOR1 --26
                ,
                    a.REF_COLOR2 --27
                ,
                    a.REF_SIZE1 --28
                ,
                    a.REF_SIZE2 --29
                ,
                    isnull(a.REF_QTY1, 0) as REF_QTY1 --30
                ,
                    isnull(a.REF_QTY2, 0) as REF_QTY2 --31
                ,
                    a.STATUS_CD --32
                ,
                    a.SIZE_GROUP --33
                ,
                    isnull(f.SIZE_MEMBER, '') as smb --34
                ,
                    f.size_cnt,
                    a.remark
                FROM
                    KSV_ORDER_MST a
                    INNER JOIN KCD_FACTORY b ON a.FACTORY_CD = b.FACTORY_CD
                    LEFT OUTER JOIN KCD_SIZE_MST f ON a.SIZE_GROUP = f.SIZE_GROUP
                    LEFT OUTER JOIN KCD_CODE c ON a.ORDER_STATUS = c.CD_CODE
                    LEFT OUTER JOIN KCD_BUYER e ON LEFT(a.ORDER_CD, 2) = e.BUYER_CD
                    LEFT OUTER JOIN KCD_STYLE d ON a.STYLE_CD = d.STYLE_CD
                WHERE
                    (c.CD_GROUP = 'ORDER_STATUS')
                    AND ORDER_CD = '${args.data.ORDER_CD}'
                ORDER BY
                    a.YY DESC,
                    a.SEQ DESC
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            let sqlStr0 = `
                SELECT
                    a.prod_cd,
                    b.COLOR,
                    c.CD_NAME as PROD_TYPE_N,
                    isnull(b.COLOR, '') as COLOR,
                    a.PRICE,
                    isnull(a.SIZE_CNT, 0) as SIZE_CNT,
                    isnull(b.COLLECTION, '') as COLLECTION,
                    d.ref_order_req
                FROM
                    KSV_ORDER_MEM a,
                    KSV_PROD_MST b,
                    KCD_CODE c,
                    ksv_order_mst d
                WHERE
                    d.order_cd = a.order_cd
                    and b.PROD_TYPE = c.CD_CODE
                    and a.PROD_CD = b.PROD_CD
                    and (c.CD_GROUP = 'PROD_TYPE')
                    and (A.ORDER_CD like '${args.data.ORDER_CD}-%')
                    and a.add_flag = 0
            `;
            var tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr0));

            let sqlStr1 = `
                SELECT
                    a.prod_cd,
                    b.COLOR,
                    c.CD_NAME as PROD_TYPE_N,
                    isnull(b.COLOR, '') as COLOR,
                    a.PRICE,
                    isnull(a.SIZE_CNT, 0) as SIZE_CNT,
                    isnull(b.COLLECTION, '') as COLLECTION,
                    d.ref_order_req
                FROM
                    KSV_ORDER_MEM a,
                    KSV_PROD_MST b,
                    KCD_CODE c,
                    ksv_order_mst d
                WHERE
                    d.order_cd = a.order_cd
                    and b.PROD_TYPE = c.CD_CODE
                    and a.PROD_CD = b.PROD_CD
                    and (c.CD_GROUP = 'PROD_TYPE')
                    and (A.ORDER_CD = '${args.data.ORDER_CD}')
                    and a.add_flag = 0
            `;
            var tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));

            let sqlStr2 = `
                SELECT
                    a.prod_cd,
                    b.COLOR,
                    c.CD_NAME as PROD_TYPE_N,
                    isnull(b.COLOR, '') as COLOR,
                    a.PRICE,
                    isnull(a.SIZE_CNT, 0) as SIZE_CNT,
                    isnull(b.COLLECTION, '') as COLLECTION,
                    d.ref_order_req
                FROM
                    KSV_ORDER_MEM a,
                    KSV_PROD_MST b,
                    KCD_CODE c,
                    ksv_order_mst d
                WHERE
                    d.order_cd = a.order_cd
                    and b.PROD_TYPE = c.CD_CODE
                    and a.PROD_CD = b.PROD_CD
                    and (c.CD_GROUP = 'PROD_TYPE')
                    and (A.ORDER_CD = '${args.data.ORDER_CD}')
                    and a.add_flag = 1
                    and a.prod_cd = '${tRet1[0].prod_cd}'
            `;
            var tRet2 = await prisma.$queryRaw(Prisma.raw(sqlStr2));

            try {
                var tSQL = '';
                var tRetDate = AFLib.getCurrTime();
                var tRetDate1 = tRetDate.substring(0, 8);
                var tUserInfo = AFLib.getUserInfo(contextValue);

                var tIdx = 0;
                var tArray = [];

                var tSumAmtArray = [];

                var tPath0 = '';
                var tCols0 = __dirname.split('/');
                var tFlag0 = 0;
                tCols0.forEach((col, i) => {
                    if (col !== '') {
                        if (col === 'src') {
                            tPath0 += '/upload/excel_template';
                            tFlag0 = 1;
                        }
                        if (tFlag0 === 0) {
                            tPath0 += '/' + col;
                        }
                    }
                });

                var tTemplateExcel = `${tPath0}/오더_OrderSheet_Baby.xlsx`;

                const wb = new Excel.Workbook();
                await wb.xlsx.readFile(tTemplateExcel);

                var tSheetName = `오더 리스트`;
                const sheet = wb.getWorksheet(tSheetName);

                const tOne = { ...tRet[0] };

                sheet.getCell(9, 6).value = args.data.ORDER_CD;
                sheet.getCell(11, 6).value = tOne.STYLE_NAME;
                sheet.getCell(10, 6).value = tOne.BYR;
                sheet.getCell(8, 6).value = tOne.FACTORY_NAME;
                sheet.getCell(8, 27).value = tOne.duedate;
                sheet.getCell(12, 6).value = tOne.TOT_CNT;

                var nSCnt = parseInt(tOne.size_cnt);
                var nMSCnt = 0;
                if (nSCnt > 23) nMSCnt = nSCnt - 23;

                sheet.getCell(5, 33).value = tRetDate1;

                var tSizes = tOne.smb.split(',');
                if (tSizes.length > 0) {
                    tSizes.forEach((col, i) => {
                        sheet.getCell(15, 9 + i).value = col;
                    });
                }

                if (tRet1.length > 0) {
                    sheet.getCell(10, 27).value = tRet1[0].COLLECTION;
                    tRet1.forEach((col, i) => {
                        sheet.getCell(16 + i, 2).value = col.COLOR;
                        var tSizeLeng = col.SIZE_CNT.length / 6;
                        var tIdx9 = 0;
                        for (tIdx9 = 0; tIdx9 < tSizeLeng; tIdx9++) {
                            var tVal = col.SIZE_CNT.substring(
                                tIdx9 * 6,
                                (tIdx9 + 1) * 6,
                            );
                            sheet.getCell(16 + i * 2, 9 + tIdx9).value =
                                parseFloat(tVal);
                        }
                    });
                }

                if (tRet2.length > 0) {
                    tRet2.forEach((col, i) => {
                        sheet.getCell(16 + i, 2).value = col.COLOR;
                        var tSizeLeng = col.SIZE_CNT.length / 6;
                        var tIdx9 = 0;
                        for (tIdx9 = 0; tIdx9 < tSizeLeng; tIdx9++) {
                            var tVal = col.SIZE_CNT.substring(
                                tIdx9 * 6,
                                (tIdx9 + 1) * 6,
                            );
                            sheet.getCell(17 + i * 2, 9 + tIdx9).value =
                                parseFloat(tVal);
                        }
                    });
                }

                var tSizeLeng = tRet1.length;
                sheet.getCell(9, 27).value = tOne.REF_ORDER_NO;

                let sqlStr1_1 = `
                    SELECT
                        a.order_cd,
                        a.prod_cd,
                        b.COLOR,
                        c.CD_NAME as PROD_TYPE_N,
                        isnull(b.COLOR, '') as COLOR,
                        a.PRICE,
                        isnull(a.SIZE_CNT, 0) as SIZE_CNT,
                        isnull(b.COLLECTION, '') as COLLECTION,
                        d.ref_order_req,
                        d.ref_order_no,
                        isnull(d.nat_cd, '') as country
                    FROM
                        KSV_ORDER_MEM a,
                        KSV_PROD_MST b,
                        KCD_CODE c,
                        ksv_order_mst d
                    WHERE
                        d.order_cd = a.order_cd
                        and b.PROD_TYPE = c.CD_CODE
                        and a.PROD_CD = b.PROD_CD
                        and (c.CD_GROUP = 'PROD_TYPE')
                        and (A.ORDER_CD like '%${args.data.ORDER_CD}-%')
                        and a.add_flag = 0
                    order by
                        a.order_cd,
                        a.prod_cd
                `;
                var tRet1_1 = await prisma.$queryRaw(Prisma.raw(sqlStr1_1));

                // var tStartRow = tRet1.length * 2 + 21;
                var tStartRow = 45;
                var tIdx1 = 0;
                for (tIdx1 = 0; tIdx1 < tRet1_1.length; tIdx1++) {
                    var tOne = { ...tRet1_1[tIdx1] };
                    sheet.getCell(tStartRow + tIdx1 * 2, 1).value =
                        tOne.country;
                    sheet.getCell(tStartRow + tIdx1 * 2, 2).value =
                        tOne.ref_order_no;
                    sheet.getCell(tStartRow + tIdx1 * 2, 3).value =
                        tOne.order_cd.split('-')[1];
                    sheet.getCell(tStartRow + tIdx1 * 2, 4).value = tOne.COLOR;
                    var tSizeLeng = tOne.SIZE_CNT.length / 6;
                    var tIdx9 = 0;
                    for (tIdx9 = 0; tIdx9 < tSizeLeng; tIdx9++) {
                        var tVal = tOne.SIZE_CNT.substring(
                            tIdx9 * 6,
                            (tIdx9 + 1) * 6,
                        );
                        sheet.getCell(tStartRow + tIdx1 * 2, 9 + tIdx9).value =
                            parseFloat(tVal);
                    }

                    let sqlStr1_2 = `
                        SELECT
                            a.prod_cd,
                            b.COLOR,
                            c.CD_NAME as PROD_TYPE_N,
                            isnull(b.COLOR, '') as COLOR,
                            a.PRICE,
                            isnull(a.SIZE_CNT, 0) as SIZE_CNT,
                            isnull(b.COLLECTION, '') as COLLECTION,
                            d.ref_order_req
                        FROM
                            KSV_ORDER_MEM a,
                            KSV_PROD_MST b,
                            KCD_CODE c,
                            ksv_order_mst d
                        WHERE
                            d.order_cd = a.order_cd
                            and b.PROD_TYPE = c.CD_CODE
                            and a.PROD_CD = b.PROD_CD
                            and (c.CD_GROUP = 'PROD_TYPE')
                            and (A.ORDER_CD = '${tOne.order_cd}')
                            and a.add_flag = 1
                            and a.prod_cd = '${tOne.prod_cd}'
                    `;
                    var tRet1_2 = await prisma.$queryRaw(Prisma.raw(sqlStr1_2));
                    if (tRet1_2.length > 0) {
                        var tIdx10 = 0;
                        var tSizeLeng = tRet1_2[0].SIZE_CNT.length / 6;
                        for (tIdx10 = 0; tIdx10 < tSizeLeng; tIdx9++) {
                            var tVal = tRet1_2[0].SIZE_CNT.substring(
                                tIdx10 * 6,
                                (tIdx10 + 1) * 6,
                            );
                            sheet.getCell(
                                tStartRow + tIdx1 * 2 + 1,
                                9 + tIdx10,
                            ).value = parseFloat(tVal);
                        }
                    }
                }

                var tPath = '';
                var tCols = __dirname.split('/');
                var tFlag = 0;
                tCols.forEach((col, i) => {
                    if (col === 'src') {
                        tPath += '/upload/excel';
                        tFlag = 1;
                    }
                    if (tFlag === 0) {
                        tPath += '/' + col;
                    }
                });

                var tExcelFileName0 = `OrderSheet-${args.data.ORDER_CD}-${tUserInfo.USER_ID}-${tRetDate}.xlsx`;
                //var tExcelFileName = `${tPath}/${tExcelFileName0}`;
                const fileData = await wb.xlsx.writeBuffer();
                let fileUrl = '';
                try {
                    const response = await generateUploadURL();
                    const presignedUrl = response.uploadURL;

                    await axios.put(
                        presignedUrl,
                        {
                            body: fileData,
                        },
                        {
                            headers: {
                                'Content-Type': fileData.type,
                            },
                        },
                    );

                    fileUrl = presignedUrl.split('?')[0];
                } catch (err) {
                    console.log(err);
                }

                var tRetArray: any[] = [];
                var tObj = {
                    id: 0,
                    CODE: 'SUCCEED:' + '?' + tExcelFileName0 + '?' + fileUrl,
                };

                tRetArray.push(tObj);
                return tRetArray;
            } catch (error) {
                var tRetArray: any[] = [];
                var tObj = {
                    id: 0,
                    CODE: 'ERROR: ' + error.message,
                };

                tRetArray.push(tObj);
                return tRetArray;
            }
        },

        mgrQuery_S0450_ORDER_QTY: async (_, args, contextValue) => {
            var tSQL = '';

            try {
                var tSQL = '';
                var tRetDate = AFLib.getCurrTime();
                var tRetDate1 = tRetDate.substring(0, 8);
                var tUserInfo = AFLib.getUserInfo(contextValue);

                var tIdx = 0;
                var tArray = [];

                var tSumAmtArray = [];

                var tPath0 = '';
                var tCols0 = __dirname.split('/');
                var tFlag0 = 0;
                tCols0.forEach((col, i) => {
                    if (col !== '') {
                        if (col === 'src') {
                            tPath0 += '/upload/excel_template';
                            tFlag0 = 1;
                        }
                        if (tFlag0 === 0) {
                            tPath0 += '/' + col;
                        }
                    }
                });

                var tTemplateExcel = `${tPath0}/list.xlsx`;

                const wb = new Excel.Workbook();
                await wb.xlsx.readFile(tTemplateExcel);

                var tSheetName = `Sheet1`;
                const sheet = wb.getWorksheet(tSheetName);

                var tIdx = 0;
                var tPrintRow = 3;
                var tSaveOrderCd = '';
                for (tIdx = 0; tIdx < args.data.length; tIdx++) {
                    var tOne = args.data[tIdx];

                    let sqlStr = `
                        SELECT
                            '' as col1,
                            B.ORDER_CD,
                            E.STYLE_NAME,
                            F.COLOR,
                            D.SIZE_MEMBER,
                            C.SIZE_CNT,
                            B.TOT_CNT,
                            c.prod_cd,
                            g.nat_name,
                            b.ref_order_no
                        FROM
                            KSV_ORDER_MST B,
                            KSV_ORDER_MEM C,
                            KCD_SIZE_MST D,
                            KCD_STYLE E,
                            KSV_PROD_MST F,
                            kcd_nation g
                        WHERE
                            B.ORDER_CD = C.ORDER_CD
                            and B.SIZE_GROUP = D.SIZE_GROUP
                            and B.STYLE_CD = E.STYLE_CD
                            and C.PROD_CD = F.PROD_CD
                            and g.nat_cd = b.nat_cd
                            and c.add_flag = '0'
                            -- and (b.order_CD = '${tOne.ORDER_CD}') 
                            and (b.order_CD like '${tOne.ORDER_CD}%')
                        ORDER BY
                            B.ORDER_CD,
                            F.COLOR
                    `;
                    var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

                    var tIdx1 = 0;
                    for (tIdx1 = 0; tIdx1 < tRet.length; tIdx1++) {
                        var tOne1 = { ...tRet[tIdx1] };

                        let sqlStr1 = `
                            SELECT
                                isnull(count(*), 0) as cnt
                            FROM
                                KSV_ORDER_MST B,
                                KSV_ORDER_MEM C,
                                KCD_SIZE_MST D,
                                KCD_STYLE E,
                                KSV_PROD_MST F,
                                kcd_nation g
                            WHERE
                                B.ORDER_CD = C.ORDER_CD
                                and B.SIZE_GROUP = D.SIZE_GROUP
                                and B.STYLE_CD = E.STYLE_CD
                                and C.PROD_CD = F.PROD_CD
                                and g.nat_cd = b.nat_cd
                                and (b.order_cd like '${tOne1.ORDER_CD}%')
                                and b.ref_order_no <> 'Combined Order'
                        `;
                        var tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));

                        if (tRet1[0].cnt <= 0) tOne1.ref_order_no = '';

                        if (tSaveOrderCd !== tOne1.ORDER_CD.substring(0, 10)) {
                            if (tIdx1 !== 0) f = f + 1;

                            tSaveOrderCd = tOne1.ORDER_CD.substring(0, 10);
                            var tSizeArray = tOne1.SIZE_MEMBER.split(',');
                            var tSizeCnt = tSizeArray.length;

                            tSizeArray.forEach((col, i) => {
                                sheet.getCell(tPrintRow, 8 + i).value = col;
                            });

                            sheet.getCell(tPrintRow, 1).value = 'Order No.';
                            sheet.getCell(tPrintRow, 2).value = 'Style';
                            sheet.getCell(tPrintRow, 3).value = 'Country';
                            sheet.getCell(tPrintRow, 4).value = 'Buyer Po';
                            sheet.getCell(tPrintRow, 5).value = 'Prod. Code';
                            sheet.getCell(tPrintRow, 6).value = 'Color';
                            sheet.getCell(tPrintRow, 7).value = 'Total';
                            sheet.getCell(tPrintRow, 8 + tSizeCnt).value =
                                'S.Total';
                            sheet.getCell(tPrintRow, 9 + tSizeCnt).value =
                                'B.Total';

                            tPrintRow += 1;
                            sheet.getCell(tPrintRow, 1).value = tOne1.ORDER_CD;
                            sheet.getCell(tPrintRow, 2).value =
                                tOne1.STYLE_NAME;
                            sheet.getCell(tPrintRow, 7).value = tOne1.TOT_CNT;
                        }

                        // if (tOne1.ref_order_no !== 'Combined Order') {
                        if (1) {
                            tPrintRow += 1;

                            sheet.getCell(tPrintRow, 1).value = tOne1.ORDER_CD;
                            sheet.getCell(tPrintRow, 2).value =
                                tOne1.STYLE_NAME;
                            sheet.getCell(tPrintRow, 3).value = tOne1.nat_name;
                            sheet.getCell(tPrintRow, 4).value =
                                tOne1.ref_order_no;
                            sheet.getCell(tPrintRow, 5).value = tOne1.prod_cd;
                            sheet.getCell(tPrintRow, 6).value = tOne1.COLOR;

                            let sqlStr2 = `
                                SELECT
                                    '' as col1,
                                    b.size_cnt,
                                    b.ship_cnt
                                FROM
                                    KSV_ORDER_ship B
                                WHERE
                                    b.order_cd like '${tOne1.ORDER_CD}'
                                    and b.prod_cd = '${tOne1.prod_cd}'
                            `;
                            var tRet2 = await prisma.$queryRaw(
                                Prisma.raw(sqlStr2),
                            );

                            var tTotShipCnt = 0;
                            tRet2.forEach((col, i) => {
                                tTotShipCnt += parseFloat(col.ship_cnt);
                            });

                            let sqlStr3 = `
                                SELECT
                                    '' as col1,
                                    b.size_cnt,
                                    b.tot_cnt
                                FROM
                                    KSV_ORDER_mem B
                                WHERE
                                    b.order_cd like '${tOne1.ORDER_CD}'
                                    and b.prod_cd = '${tOne1.prod_cd}'
                            `;
                            var tRet3 = await prisma.$queryRaw(
                                Prisma.raw(sqlStr3),
                            );

                            var tTotSizeCnt = 0;
                            tRet3.forEach((col, i) => {
                                tTotSizeCnt += parseFloat(col.tot_cnt);
                            });

                            sheet.getCell(tPrintRow, 7).value =
                                tRet3[0].tot_cnt;

                            var tIdx11 = 0;
                            for (tIdx11 = 0; tIdx11 < tSizeCnt; tIdx11++) {
                                sheet.getCell(tPrintRow, 8 + tIdx11).value =
                                    parseInt(
                                        tRet3[0].size_cnt.substring(
                                            tIdx11 * 6,
                                            (tIdx11 + 1) * 6,
                                        ),
                                    );
                            }

                            if (tOne1.ORDER_CD.length === 10) {
                                sheet.getCell(tPrintRow, 8 + tSizeCnt).value =
                                    tTotShipCnt;
                                sheet.getCell(tPrintRow, 9 + tSizeCnt).value =
                                    tTotSizeCnt - tTotShipCnt;
                            } else {
                                sheet.getCell(tPrintRow, 8 + tSizeCnt).value =
                                    0;
                                sheet.getCell(tPrintRow, 9 + tSizeCnt).value =
                                    0;
                            }
                        }
                    }
                    tPrintRow += 2;
                }

                var tPath = '';
                var tCols = __dirname.split('/');
                var tFlag = 0;
                tCols.forEach((col, i) => {
                    if (col === 'src') {
                        tPath += '/upload/excel';
                        tFlag = 1;
                    }
                    if (tFlag === 0) {
                        tPath += '/' + col;
                    }
                });

                var tExcelFileName0 = `Order_Ship_Qty-${tUserInfo.USER_ID}-${tRetDate}.xlsx`;
                //var tExcelFileName = `${tPath}/${tExcelFileName0}`;

                const fileData = await wb.xlsx.writeBuffer();
                //fs.createWriteStream(tExcelFileName).write(fileData);

                let fileUrl = '';
                try {
                    const response = await generateUploadURL();
                    const presignedUrl = response.uploadURL;

                    await axios.put(
                        presignedUrl,
                        {
                            body: fileData,
                        },
                        {
                            headers: {
                                'Content-Type': fileData.type,
                            },
                        },
                    );

                    fileUrl = presignedUrl.split('?')[0];
                } catch (err) {
                    console.log(err);
                }

                var tRetArray: any[] = [];
                var tObj = {
                    id: 0,
                    CODE: 'SUCCEED:' + '?' + tExcelFileName0 + '?' + fileUrl,
                };

                tRetArray.push(tObj);
                return tRetArray;
            } catch (error) {
                var tRetArray: any[] = [];
                var tObj = {
                    id: 0,
                    CODE: 'ERROR: ' + error.message,
                };

                tRetArray.push(tObj);
                return tRetArray;
            }
        },

        mgrQuery_S0450_KSV_ORDER_FOB: async (_, args) => {
            var tSQL = '';
            var tSQL1 = '';
            var tSQL2 = '';
            var tSQL3 = '';
            var tSQL4 = '';

            let sqlStr = `
                select
                    FOB_SEQ,
                    SHIP_QTY,
                    FOB,
                    FOB100
                from
                    ksv_order_fob
                where
                    order_cd = '${args.data.ORDER_CD}'
                order by
                    fob_seq
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            return tRet;
        },
    },
};

export default moduleQuery_S0450_DELAY_REPORT_TBL_KSV_ORDER_MST;
