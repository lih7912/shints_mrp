import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S043101_3_1 = {
    Query: {
        mgrQueryS043101_3_1: async (_, args) => {
            const esc = (v) => String(v || '').replace(/'/g, "''");
            const hasVal = (v) => String(v || '').trim() !== '';

            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }

            var sqlInDate = '';
            var sqlOutDate = '';
            if (
                args.data.BUYER_CD === '' &&
                args.data.PO_CD === '' &&
                args.data.VENDOR_CD === '' &&
                args.data.PU_CD === '' &&
                args.data.PACK_CD === ''
            ) {
                sqlOutDate = ` and  ((left(F.out_datetime, 8) between '20250101' and '99999999')  `;
                sqlOutDate += ` or   (left(F.ship_date, 8) between '20250101' and '99999999'))  `;
            }

            if (!args.data.S_IN_DATE && !args.data.E_IN_DATE);
            else {
                var sDate = args.data.S_IN_DATE;
                if (!sDate) sDate = '20250101';
                var eDate = args.data.E_IN_DATE;
                if (!eDate) eDate = '99999999';
                sqlOutDate = `and  ((left(F.OUT_DATETIME, 8) between '${sDate}' and '${eDate}') `;
                sqlOutDate += `or   (left(F.SHIP_DATE, 8) between '${sDate}' and '${eDate}')) `;
            }

            const whereConds = [];
            whereConds.push(`LEFT(F.STSOUT_CD, 6) <> 'SOTMP-'`);
            whereConds.push(`LEFT(F.ORDER_CD, 2) = E.BUYER_CD`);
            whereConds.push(`F.MATL_CD = G.MATL_CD`);
            whereConds.push(`G.VENDOR_CD = B.VENDOR_CD`);

            if (hasVal(args.data.PACK_CD)) {
                const packCd = esc(args.data.PACK_CD);
                // PACK_CD 조회는 contains 대신 = / prefix 중심으로 인덱스 사용 유도
                whereConds.push(`(
                    SMST.INVOICE_NO = '${packCd}'
                )`);
            }

            if (hasVal(args.data.BUYER_CD)) {
                const buyerCd = esc(args.data.BUYER_CD);
                whereConds.push(`LEFT(F.ORDER_CD, 2) LIKE '%${buyerCd}%'`);
            }

            if (hasVal(args.data.PO_CD)) {
                const poCd = esc(args.data.PO_CD);
                whereConds.push(`F.PO_CD LIKE '%${poCd}%'`);
            }

            if (hasVal(args.data.PU_CD)) {
                const puCd = esc(args.data.PU_CD);
                whereConds.push(`F.PU_CD LIKE '%${puCd}%'`);
            }

            if (hasVal(args.data.VENDOR_CD)) {
                const vendorCd = esc(args.data.VENDOR_CD);
                whereConds.push(`(
                    B.VENDOR_CD LIKE '%${vendorCd}%'
                    OR B.VENDOR_NAME LIKE '%${vendorCd}%'
                )`);
            }

            const joinCondsStockOutMst = [`F.STSOUT_CD = C.STSOUT_CD`];
            if (hasVal(args.data.ORIGIN_PORT)) {
                const originPort = esc(args.data.ORIGIN_PORT);
                joinCondsStockOutMst.push(`C.ORIGIN_PORT LIKE '%${originPort}%'`);
            }
            if (hasVal(args.data.DESTINATION)) {
                const destination = esc(args.data.DESTINATION);
                joinCondsStockOutMst.push(`C.DESTINATION LIKE '%${destination}%'`);
            }

            let sqlStr = `
                SELECT
                    B.VENDOR_CD,
                    B.VENDOR_NAME,
                    F.PO_CD,
                    F.SHIP_DATE,
                    LEFT(F.ORDER_CD, 2),
                    E.BUYER_NAME,
                    ISNULL(F.PU_CD, '') AS PU_CD,
                    ISNULL(F.STSOUT_CD, '') AS STSOUT_CD,
                    ISNULL(C.STSIN_CD, '') AS STSIN_CD,
                    ISNULL(F.PACK_CD, '') AS PACK_CD,
                    ISNULL(SMST.INVOICE_NO, '') AS INVOICE_NO,
                    ISNULL(C.TRADE_TERM, '') AS TRADE_TERM,
                    ISNULL(C.READY_DATE, '') AS READY_DATE,
                    '' AS ETA,
                    ISNULL(C.ORIGIN_PORT, '') AS ORIGIN_PORT,
                    ISNULL(C.DESTINATION, '') AS DESTINATION,
                    ISNULL(F.CT_QTY, '0') AS CT_QTY,
                    ISNULL(F.REMARK, '') AS REMARK,
                    ISNULL(F.CT_NO, '') AS CT_NO,
                    ISNULL(C.CBM, '0') AS CBM,
                    ISNULL(C.WEIGHT, '0') AS WEIGHT,
                    ISNULL(C.GROSS_WEIGHT, '0') AS GROSS_WEIGHT
                FROM
                    ksv_stock_out F
                    LEFT JOIN ksv_stock_out_mst C ON ${joinCondsStockOutMst.join(
                        ' AND ',
                    )}
                    LEFT JOIN ksv_shipment_mem SM ON F.STSOUT_CD = SM.STSOUT_CD
                    LEFT JOIN ksv_shipment_mst SMST ON SM.SHIPMENT_CD = SMST.SHIPMENT_CD,
                    kcd_vendor B,
                    kcd_buyer E,
                    kcd_matl_mst G
                WHERE
                    ${whereConds.join('\n                    AND ')} ${sqlOutDate}
                ORDER BY
                    B.VENDOR_CD,
                    ISNULL(F.STSOUT_CD, ''),
                    ISNULL(F.REMARK, ''),
                    ISNULL(F.PO_CD, ''),
                    ISNULL(F.CT_QTY, '')
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetArray = [];
            var tIdx = 0;
            var tSaveObj = {};
            var tPoCds = '';
            var tPuCds = '';
            var tStsoutCds = [];
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tObj = { ...tRet[tIdx] };
                if (tObj.READY_DATE === '') tObj.READY_DATE = tObj.SHIP_DATE;
                if (tIdx === 0) {
                    tPoCds = `${tObj.PO_CD}`;
                    tPuCds = `${tObj.PU_CD}`;
                    tSaveObj = { ...tObj };
                    continue;
                } else {
                    if (
                        tSaveObj.VENDOR_CD === tObj.VENDOR_CD &&
                        tSaveObj.STSOUT_CD === tObj.STSOUT_CD
                    ) {
                        if (
                            tSaveObj.REMARK &&
                            tSaveObj.REMARK === tObj.REMARK
                        ) {
                            tSaveObj = { ...tObj };
                            if (tPoCds.includes(tObj.PO_CD));
                            else tPoCds += `/${tObj.PO_CD}`;
                            if (tPuCds.includes(tObj.PU_CD));
                            else tPuCds += `/${tObj.PU_CD}`;
                        } else if (
                            tSaveObj.REMARK &&
                            tSaveObj.REMARK !== tObj.REMARK
                        ) {
                            tSaveObj.PO_CD = tPoCds;
                            tSaveObj.PU_CD = tPuCds;
                            tRetArray.push(tSaveObj);
                            tSaveObj = { ...tObj };
                            tPoCds = `${tObj.PO_CD}`;
                            tPuCds = `${tObj.PU_CD}`;
                        } else if (
                            !tSaveObj.REMARK &&
                            tSaveObj.PO_CD !== tObj.PO_CD
                        ) {
                            tSaveObj.PO_CD = tPoCds;
                            tSaveObj.PU_CD = tPuCds;
                            tRetArray.push(tSaveObj);
                            tSaveObj = { ...tObj };
                            tPoCds = `${tObj.PO_CD}`;
                            tPuCds = `${tObj.PU_CD}`;
                        } else if (
                            !tSaveObj.REMARK &&
                            tSaveObj.PO_CD === tObj.PO_CD
                        ) {
                            tSaveObj = { ...tObj };
                            if (tPoCds.includes(tObj.PO_CD));
                            else tPoCds += `/${tObj.PO_CD}`;
                            if (tPuCds.includes(tObj.PU_CD));
                            else tPuCds += `/${tObj.PU_CD}`;
                        } else {
                            tSaveObj.PO_CD = tPoCds;
                            tSaveObj.PU_CD = tPuCds;
                            tRetArray.push(tSaveObj);
                            tSaveObj = { ...tObj };
                            tPoCds = `${tObj.PO_CD}`;
                            tPuCds = `${tObj.PU_CD}`;
                        }
                    } else {
                        tSaveObj.PO_CD = tPoCds;
                        tSaveObj.PU_CD = tPuCds;
                        tRetArray.push(tSaveObj);
                        tSaveObj = { ...tObj };
                        tPoCds = `${tObj.PO_CD}`;
                        tPuCds = `${tObj.PU_CD}`;
                    }
                }
            }
            tSaveObj.PO_CD = tPoCds;
            tSaveObj.PU_CD = tPuCds;
            tRetArray.push(tSaveObj);

            var tRetArray1 = [];
            tRetArray.forEach((col, i) => {
                var tOne = { ...col };
                if (col.INVOICE_NO) tOne.PACK_CD = tOne.INVOICE_NO; 
                tRetArray1.push(tOne);
            });

            var tSaveObj = {};
            var tSumCtQty = 0;
            var tPuCd = '';
            var tPoCd = '';
            var tStsoutCd = '';
            return tRetArray1;
        },

        // 3_1 backup
        mgrQueryS043101_3_1_1: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }
            let sqlStr = `
                SELECT distinct
                    A.PU_CD,
                    A.STSOUT_CD,
                    A.PACK_CD,
                    A.INVOICE_NO,
                    A.TRADE_TERM,
                    A.READY_DATE,
                    A.ETA,
                    A.ORIGIN_PORT,
                    A.DESTINATION,
                    A.CT_QTY,
                    A.CBM,
                    A.WEIGHT,
                    B.VENDOR_CD,
                    B.BUYER_CD,
                    B.PO_CD2
                FROM
                    KSV_PU_MST2 B,
                    KSV_STOCK_OUT A
                WHERE
                    B.PU_CD = A.PU_CD
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
        mgrQueryS043101_3_1_bak: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }
            let sqlStr = `
                SELECT distinct
                    A.PU_CD,
                    C.STSOUT_CD,
                    C.STSIN_CD,
                    isnull(C.PACK_CD, '') as PACK_CD,
                    isnull(C.INVOICE_NO, '') as INVOICE_NO,
                    isnull(C.TRADE_TERM, '') as TRADE_TERM,
                    isnull(C.READY_DATE, '') as READY_DATE,
                    A.ETA,
                    isnull(C.ORIGIN_PORT, '') as ORIGIN_PORT,
                    isnull(C.DESTINATION, '') as DESTINATION,
                    isnull(C.CT_QTY, '0') as CT_QTY,
                    isnull(C.CBM, '0') as CBM,
                    isnull(C.WEIGHT, '0') as WEIGHT,
                    isnull(C.GROSS_WEIGHT, '0') as GROSS_WEIGHT,
                    A.VENDOR_CD,
                    B.VENDOR_NAME,
                    A.BUYER_CD,
                    E.BUYER_NAME,
                    A.PO_CD2 as PO_CD
                FROM
                    KSV_PU_MST2 A,
                    kcd_vendor B,
                    kcd_buyer E,
                    ksv_stock_out_mst C
                    left join KSV_SHIPMENT_MEM D ON C.STSOUT_CD = D.STSOUT_CD
                WHERE
                    A.PU_CD = C.PU_CD
                    AND A.PU_CD like '%${args.data.PU_CD}%'
                    AND C.ORIGIN_PORT like '%${args.data.ORIGIN_PORT}%'
                    AND C.DESTINATION like '%${args.data.DESTINATION}%'
                    AND A.BUYER_CD like '%${args.data.BUYER_CD}%'
                    AND A.BUYER_CD = E.BUYER_CD
                    AND A.VENDOR_CD = B.VENDOR_CD
                    AND A.PO_CD2 like '%${args.data.PO_CD}%'
                    AND (
                        B.VENDOR_CD like '%${args.data.VENDOR_CD}%'
                        or B.VENDOR_NAME like '%${args.data.VENDOR_CD}%'
                    )
                    -- AND A.BILL_TO in ('SHINTS', 'BUYER')
                order by
                    c.READY_DATE,
                    c.ORIGIN_PORT,
                    c.DESTINATION
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },

        // 3_1 backup
        mgrQueryS043101_3_1_1: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }
            let sqlStr = `
                SELECT distinct
                    A.PU_CD,
                    A.STSOUT_CD,
                    A.PACK_CD,
                    A.INVOICE_NO,
                    A.TRADE_TERM,
                    A.READY_DATE,
                    A.ETA,
                    A.ORIGIN_PORT,
                    A.DESTINATION,
                    A.CT_QTY,
                    A.CBM,
                    A.WEIGHT,
                    B.VENDOR_CD,
                    B.BUYER_CD,
                    B.PO_CD2
                FROM
                    KSV_PU_MST2 B,
                    KSV_STOCK_OUT A
                WHERE
                    B.PU_CD = A.PU_CD
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },

        mgrQueryS043101_3_1_bak2: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }
            let sqlStr = `
                SELECT distinct
                    A.PU_CD,
                    C.STSOUT_CD,
                    C.STSIN_CD,
                    -- isnull(C.PACK_CD, '') as PACK_CD,
                    isnull(F.PACK_CD, '') as PACK_CD,
                    isnull(C.INVOICE_NO, '') as INVOICE_NO,
                    isnull(C.TRADE_TERM, '') as TRADE_TERM,
                    isnull(C.READY_DATE, '') as READY_DATE,
                    A.ETA,
                    isnull(C.ORIGIN_PORT, '') as ORIGIN_PORT,
                    isnull(C.DESTINATION, '') as DESTINATION,
                    isnull(C.CT_QTY, '0') as CT_QTY,
                    isnull(C.CBM, '0') as CBM,
                    isnull(C.WEIGHT, '0') as WEIGHT,
                    isnull(C.GROSS_WEIGHT, '0') as GROSS_WEIGHT,
                    A.VENDOR_CD,
                    B.VENDOR_NAME,
                    A.BUYER_CD,
                    E.BUYER_NAME,
                    A.PO_CD2 as PO_CD
                from
                    ksv_stock_out F,
                    KSV_PU_MST2 A,
                    kcd_vendor B,
                    kcd_buyer E,
                    ksv_stock_out_mst C
                    left join KSV_SHIPMENT_MEM D ON C.STSOUT_CD = D.STSOUT_CD
                WHERE
                    F.PU_CD = A.PU_CD
                    and F.STSOUT_CD = C.STSOUT_CD
                    AND A.PU_CD like '%${args.data.PU_CD}%'
                    AND C.ORIGIN_PORT like '%${args.data.ORIGIN_PORT}%'
                    AND C.DESTINATION like '%${args.data.DESTINATION}%'
                    AND A.BUYER_CD like '%${args.data.BUYER_CD}%'
                    AND A.BUYER_CD = E.BUYER_CD
                    AND A.VENDOR_CD = B.VENDOR_CD
                    AND A.PO_CD2 like '%${args.data.PO_CD}%'
                    AND F.PACK_CD like '%${args.data.PACK_CD}%'
                    AND (
                        B.VENDOR_CD like '%${args.data.VENDOR_CD}%'
                        or B.VENDOR_NAME like '%${args.data.VENDOR_CD}%'
                    )
                    -- AND A.BILL_TO in ('SHINTS', 'BUYER')
                order by
                    c.READY_DATE,
                    c.ORIGIN_PORT,
                    c.DESTINATION
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },

        mgrQueryS043101_3_1_bak3: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }

            var sqlInDate = '';
            if (
                args.data.BUYER_CD === '' &&
                args.data.PO_CD === '' &&
                args.data.VENDOR_CD === '' &&
                args.data.PU_CD === '' &&
                args.data.PACK_CD === ''
            ) {
                sqlInDate = ` and  left(F.out_datetime, 8) between '20250101' and '99999999'  `;
            }

            let sqlStr = `
                SELECT distinct
                    B.VENDOR_CD,
                    B.VENDOR_NAME,
                    F.PO_CD,
                    left(F.ORDER_CD, 2),
                    E.BUYER_NAME,
                    isnull(A.PU_CD, '') as PU_CD,
                    isnull(C.STSOUT_CD, '') as STSOUT_CD,
                    isnull(C.STSIN_CD, '') as STSIN_CD,
                    isnull(F.PACK_CD, '') as PACK_CD,
                    isnull(C.INVOICE_NO, '') as INVOICE_NO,
                    isnull(C.TRADE_TERM, '') as TRADE_TERM,
                    isnull(C.READY_DATE, '') as READY_DATE,
                    isnull(A.ETA, '') as ETA,
                    isnull(C.ORIGIN_PORT, '') as ORIGIN_PORT,
                    isnull(C.DESTINATION, '') as DESTINATION,
                    isnull(F.CT_QTY, '0') as CT_QTY,
                    isnull(F.CT_NO, '') as CT_NO,
                    isnull(C.CBM, '0') as CBM,
                    isnull(C.WEIGHT, '0') as WEIGHT,
                    isnull(C.GROSS_WEIGHT, '0') as GROSS_WEIGHT
                from
                    ksv_stock_out F
                    left join KSV_PU_MST2 A ON F.PU_CD = A.PU_CD
                    AND A.PU_CD like '%${args.data.PU_CD}%'
                    left join ksv_stock_out_mst C ON F.STSOUT_CD = C.STSOUT_CD
                    AND C.ORIGIN_PORT like '%${args.data.ORIGIN_PORT}%'
                    AND C.DESTINATION like '%${args.data.DESTINATION}%',
                    kcd_vendor B,
                    kcd_buyer E,
                    kcd_matl_mst G
                WHERE
                    F.PACK_CD like '%${args.data.PACK_CD}%'
                    AND left(F.ORDER_CD, 2) like '%${args.data.BUYER_CD}%'
                    AND left(F.ORDER_CD, 2) = E.BUYER_CD
                    AND F.MATL_CD = G.MATL_CD
                    AND G.VENDOR_CD = B.VENDOR_CD
                    AND F.PO_CD like '%${args.data.PO_CD}%'
                    AND (
                        B.VENDOR_CD like '%${args.data.VENDOR_CD}%'
                        or B.VENDOR_NAME like '%${args.data.VENDOR_CD}%'
                    ) ${sqlInDate}
                    -- order by c.READY_DATE, c.ORIGIN_PORT, c.DESTINATION
                order by
                    F.PACK_CD,
                    B.VENDOR_CD,
                    F.CT_QTY
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tObj = { ...tRet[tIdx] };
                tRetArray.push(tObj);
                if (tRetArray.length >= 100) break;
            }
            return tRetArray;
        },
    },
};

export default moduleQuery_S043101_3_1;
