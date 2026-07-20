import { Prisma } from '@prisma/client';
import prisma from '../../db';
const fs = require('fs');

const moduleQuery_S0433_2_1 = {
    Query: {
        mgrQueryS0433_2_1: async (_, args) => {

            var sReadyDate = '20250101';
            var eReadyDate = '99999999';

            if (args.data.S_READY_DATE) sReadyDate = args.data.S_READY_DATE;
            if (args.data.E_READY_DATE) eReadyDate = args.data.E_READY_DATE;

            let sqlStr = `
                select
                       distinct
                       a.STSOUT_CD,
                       b.PO_CD,
                       b.REG_USER,
                       left(b.order_cd, 2) as BUYER_CD,
                       c.BUYER_NAME,
                       e.VENDOR_CD,
                       e.VENDOR_NAME,
                       b.TRADE_TERM,
                       a.ORIGIN_PORT,
                       isnull(f.EXP_DELIVERY_DATE, '') as EXP_DELIVERY_DATE, 
                       isnull(f.TARGET_ETA, '') as TARGET_ETA,
                       a.CT_QTY,
                       a.WEIGHT,
                       a.CBM,
                       b.PU_CD,
                       a.INVOICE_NO,
                       a.READY_DATE,
                       a.DESTINATION,
                       a.SHIP_MODE,
                       isnull(a1.cd_name, '') as SHIP_MODE_N,
                       a.ORG_ORIGIN_PORT,
                       a.ORG_DESTINATION,
                       b.reg_user as SENDOR,
                       a.REMARK
                from ksv_shipment_mem a
                     left join kcd_code a1 on a1.cd_group = 'SHIPMENT_SHIP_MODE' and a1.cd_code = a.ship_mode,
                     ksv_stock_out b
                     left join kcd_buyer c on c.buyer_cd = left(b.order_cd, 2)
                     left join kcd_matl_mst d on b.matl_cd = d.matl_cd
                     left join kcd_vendor e on e.vendor_cd = d.vendor_cd
                     left join ksv_pu_mst2 f on b.pu_cd = f.pu_cd
                where (a.shipment_cd is null or a.shipment_cd = '')
                and    a.stsout_cd = b.stsout_cd
                and    a.ready_date  between '${sReadyDate}' and '${eReadyDate}'
                and    a.origin_port like '%${args.data.ORIGIN_PORT}%'
                and    a.destination like '%${args.data.DESTINATION}%'
                and    b.po_cd like '%${args.data.PO_CD}%'
                and    a.ship_mode like '%${args.data.SHIP_MODE}%'
                and    e.vendor_name like '%${args.data.SUPPLIER}%'
                and    left(a.stsout_cd, 6) <> 'SOTMP-'
                order by a.stsout_cd
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            var tRetArray = [];
            var tPoCd = '';
            var tVendorName = '';
            var tSaveObj = {};
            tRet.forEach((col, i) => {
                if (i === 0) {
                    tSaveObj = { ...col };
                    tPoCd = col.PO_CD;
                    tVendorName = col.VENDOR_NAME;
                } else {
                    if (tSaveObj.STSOUT_CD !== col.STSOUT_CD) {
                        tSaveObj.PO_CD = tPoCd;
                        tSaveObj.PO_CD2 = tPoCd;
                        tSaveObj.VENDOR_NAME = tVendorName;
                        tRetArray.push(tSaveObj);

                        tSaveObj = { ...col };
                        tPoCd = col.PO_CD;
                        tVendorName = col.VENDOR_NAME;
                    } else {
                        tPoCd += `.${col.PO_CD}`;
                        tVendorName += `.${col.VENDOR_NAME}`;
                    } 
                }
            });
            if (tRet.length > 0) {
                tSaveObj.PO_CD = tPoCd;
                tSaveObj.PO_CD2 = tPoCd;
                tSaveObj.VENDOR_NAME = tVendorName;
                tRetArray.push(tSaveObj);
            }

            let sqlStr1 = `
               select
                       distinct
                       a.STSOUT_CD,
                       isnull(b.PO_CD, '') as PO_CD,
                       isnull(b.REG_USER, '') as REG_USER,
                       a.buyer as BUYER_CD,
                       isnull(c.BUYER_NAME, '') as BUYER_NAME,
                       isnull(e.VENDOR_CD, '') as VENDOR_CD,
                       isnull(e.VENDOR_NAME, '') as VENDOR_NAME,
                       '' as  TRADE_TERM,
                       a.ORIGIN_PORT,
                       '' as EXP_DELIVERY_DATE,
                       isnull(a.TARGET_ETA, '') as TARGET_ETA,
                       a.CT_QTY,
                       a.WEIGHT,
                       a.CBM,
                       '' as PU_CD,
                       a.INVOICE_NO,
                       a.READY_DATE,
                       a.DESTINATION,
                       a.SHIP_MODE,
                       isnull(a1.cd_name, '') as SHIP_MODE_N,
                       a.ORG_ORIGIN_PORT,
                       a.ORG_DESTINATION,
                       a.SENDOR,
                       isnull(a.description, '')  as REMARK ,
                       isnull(a.remark, '')  as REMARK1 
                from ksv_shipment_mem a
                     left join kcd_code a1 on a1.cd_group = 'SHIPMENT_SHIP_MODE' and a1.cd_code = a.ship_mode
                     left join kcd_buyer c on c.buyer_cd = a.buyer
                     left join kzz_freight b on a.stsout_cd = b.stsout_cd
                     left join kcd_matl_mst d on b.matl_cd = d.matl_cd
                     left join kcd_vendor e on e.vendor_cd = d.vendor_cd
                where (a.shipment_cd is null or a.shipment_cd = '')
                and    a.ready_date  between '${sReadyDate}' and '${eReadyDate}'
                and    a.origin_port like '%${args.data.ORIGIN_PORT}%'
                and    a.destination like '%${args.data.DESTINATION}%'
                and    isnull(b.po_cd , '') like '%${args.data.PO_CD}%'
                and    a.ship_mode like '%${args.data.SHIP_MODE}%'
                and    isnull(e.vendor_name, '') like '%${args.data.SUPPLIER}%'
                and    left(a.stsout_cd, 6) = 'SOTMP-'
                order by a.stsout_cd
            `;
            var tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));
            tPoCd = '';
            tVendorName = '';
            tSaveObj = {};
            tRet1.forEach((col, i) => {
                if (i === 0) {
                    tSaveObj = { ...col }; 
                    tPoCd = col.PO_CD;
                    tVendorName = col.VENDOR_NAME;
                } else {
                    if (tSaveObj.STSOUT_CD !== col.STSOUT_CD) {
                        tSaveObj.PO_CD = tPoCd; 
                        tSaveObj.PO_CD2 = tPoCd;
                        tSaveObj.VENDOR_NAME = tVendorName;
                        if (tSaveObj.REMARK1) {
                            if (tSaveObj.REMARK) tSaveObj.REMARK = `${tSaveObj.REMARK}/${tSaveObj.REMARK1}`;
                            else  tSaveObj.REMARK = `${tSaveObj.REMARK1}`;
                        }
                        tRetArray.push(tSaveObj);

                        tSaveObj = { ...col };
                        tPoCd = col.PO_CD;
                        tVendorName = col.VENDOR_NAME;
                    } else {
                        tPoCd += `.${col.PO_CD}`;
                        tVendorName += `.${col.VENDOR_NAME}`;
                    } 
                }
            });

            if (tRet1.length > 0) {
                tSaveObj.PO_CD = tPoCd;
                tSaveObj.PO_CD2 = tPoCd;
                tSaveObj.VENDOR_NAME = tVendorName;
                if (tSaveObj.REMARK1) {
                    if (tSaveObj.REMARK) tSaveObj.REMARK = `${tSaveObj.REMARK}/${tSaveObj.REMARK1}`;
                    else  tSaveObj.REMARK = `${tSaveObj.REMARK1}`;
                }
                tRetArray.push(tSaveObj);
            }

            return tRetArray;
        },
        mgrQueryS0433_2_1_260413: async (_, args) => {
            var tSQL = '';

            var tOriginPort = '';
            if (args.data.ORIGIN_PORT === ' ') tOriginPort = '';
            else tOriginPort = args.data.ORIGIN_PORT;

            let readyDateClause = '';
            if (args.data.S_READY_DATE && args.data.E_READY_DATE) {
                readyDateClause = `AND B.READY_DATE BETWEEN '${args.data.S_READY_DATE}' AND '${args.data.E_READY_DATE}'`;
            }

            let sqlStr = `
                SELECT
                    distinct 
                    isnull(B1.PU_CD, '') as PU_CD,
                    B.STSOUT_CD,
                    B.INVOICE_NO,
                    B.TRADE_TERM,
                    B.READY_DATE,
                    B.TARGET_ETA,
                    B.ORIGIN_PORT,
                    B.WEIGHT,
                    B.CBM,
                    B.DESTINATION,
                    B.CT_QTY,
                    isnull(B.SHIP_MODE, '') as SHIP_MODE,
                    isnull(b2.CD_NAME, '') as SHIP_MODE_N,
                    isnull(B.ORG_ORIGIN_PORT, '') as ORG_ORIGIN_PORT,
                    isnull(B.ORG_DESTINATION, '') as ORG_DESTINATION
                FROM KSV_SHIPMENT_MEM B
                    left join ksv_stock_out_mst b1 on b1.stsout_cd = B.stsout_cd
                    left join kcd_code b2 on b2.cd_group = 'shipment_ship_mode' and b2.cd_code = B.ship_mode
                where (B.SHIPMENT_CD is null or B.SHIPMENT_CD = '')
                AND B.ORIGIN_PORT like '%${tOriginPort}%'
                AND left(B.stsout_cd, 6) <> 'SOTMP-'
                ${args.data.SHIP_MODE ? `AND B.SHIP_MODE = '${args.data.SHIP_MODE}'` : ''}
                AND B.DESTINATION like '%${args.data.DESTINATION}%'
                ${
                    args.data.IS_SINGAPORE === '1'
                        ? "AND B.SHIPMENT_CD in (select SHIPMENT_CD from KSV_SHIPMENT_MST where IS_SINGAPORE = '1')"
                        : ''
                }
                ${readyDateClause}
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            if (args.data.S_READY_DATE && args.data.E_READY_DATE) {
                readyDateClause = `AND A2.READY_DATE BETWEEN '${args.data.S_READY_DATE}' AND '${args.data.E_READY_DATE}'`;
            }

            let sqlStr1 = `
                SELECT
                    isnull(A2.REG_USER, '') as REG_USER,
                    isnull(A2.BUYER, '') as BUYER_CD,
                    isnull(A3.BUYER_NAME, '') as BUYER_NAME,
                    isnull(A2.PO_CD, '') as PO_CD2,
                    '' as VENDOR_CD,
                    '' as VENDOR_NAME,
                    A2.TRADE_TERM,
                    A2.ORIGIN_PORT,
                    '' as EXP_DELIVERY_DATE,
                    A2.TARGET_ETA,
                    A2.CT_QTY,
                    A2.WEIGHT,
                    A2.CBM,
                    '' as PU_CD,
                    A2.STSOUT_CD,
                    A2.INVOICE_NO,
                    A2.READY_DATE,
                    A2.DESTINATION,
                    A2.SHIP_MODE,
                    A4.CD_NAME as SHIP_MODE_N,
                    A2.DESCRIPTION,
                    A2.REMARK,
                    isnull(A2.ORG_ORIGIN_PORT, '') as ORG_ORIGIN_PORT,
                    isnull(A2.ORG_DESTINATION, '') as ORG_DESTINATION,
                    A2.SENDOR 
                FROM KSV_SHIPMENT_MEM A2
                    left join kcd_buyer A3 on A2.BUYER = A3.BUYER_CD
                    left join kcd_code A4 on A4.cd_code = A2.SHIP_MODE and A4.cd_group = 'shipment_ship_mode'
                WHERE A2.stsout_cd like 'SOTMP-%'
                and (A2.shipment_cd = '' or A2.shipment_cd is null)
                and A2.origin_port like '%${tOriginPort}%'
                ${args.data.SHIP_MODE ? `AND A2.SHIP_MODE = '${args.data.SHIP_MODE}'` : ''}
                AND A2.DESTINATION like '%${args.data.DESTINATION}%'
                ${readyDateClause}
                ${
                    args.data.IS_SINGAPORE === '1'
                        ? "AND A2.SHIPMENT_CD in (select SHIPMENT_CD from KSV_SHIPMENT_MST where IS_SINGAPORE = '1')"
                        : ''
                }
                order by A2.origin_port
            `;
            var tRet1_0 = await prisma.$queryRaw(Prisma.raw(sqlStr1));

            var tRetFreight = [];
            if (tRet1_0.length <= 0);
            else {
                let stsoutList0 = tRet1_0.map((row) => row.STSOUT_CD);
                const stsoutIn0 = stsoutList0.map((cd) => `'${cd}'`).join(',');

                let sqlFreight = `
                    select
                        *
                    from
                        kzz_freight
                    where
                        stsout_cd in (${stsoutIn0})
                        and po_cd like '%${args.data.PO_CD}%'
                `;
                tRetFreight = await prisma.$queryRaw(Prisma.raw(sqlFreight));
            }

            var tRet1 = [];
            var tIdx10 = 0;
            for (tIdx10 = 0; tIdx10 < tRet1_0.length; tIdx10++) {
                var tObj10 = { ...tRet1_0[tIdx10] };

                var tRet9 = [];
                tRetFreight.forEach((col11, i11) => {
                    if (col11.STSOUT_CD === tObj10.STSOUT_CD) tRet9.push(col11);
                });
                if (args.data.PO_CD && tRet9.length <= 0) continue;

                var tPoCd = '';
                tRet9.forEach((col11, i11) => {
                    if (col11.PO_CD) {
                        if (tPoCd === '') tPoCd = `${col11.PO_CD}`;
                        else tPoCd += `/${col11.PO_CD}`;
                    }
                });
                tObj10.PO_CD2 = tPoCd;
                tRet1.push(tObj10);
            }

            var tRetArray = [];

            let stsoutList = tRet.map((row) => row.STSOUT_CD);

            console.log(
                '----------------------------stsoutList:',
                stsoutList.length,
            );
            const puInfoMap = {};

            if (stsoutList.length > 0) {
                const stsoutIn = stsoutList.map((cd) => `'${cd}'`).join(',');

                const rawPO = String(args.data.PO_CD ?? '');
                const rawSupplier = String(args.data.SUPPLIER ?? '');
                const poFilter = `%${rawPO}%`;
                const supplierFilter = `%${rawSupplier}%`;

                const sqlStr4All = `
                    SELECT
                        so.stsout_cd as STSOUT_CD,
                        A1.REG_USER,
                        A1.BUYER_CD,
                        A3.BUYER_NAME,
                        A1.PO_CD2,
                        A1.VENDOR_CD,
                        A4.VENDOR_NAME,
                        A1.EXP_DELIVERY_DATE,
                        so.pack_cd as REMARK
                    FROM
                        ksv_stock_out so
                        JOIN KSV_PU_MST2 A1 ON A1.PU_CD = so.PU_CD
                        JOIN KCD_BUYER A3 ON A1.BUYER_CD = A3.BUYER_CD
                        JOIN KCD_VENDOR A4 ON A1.VENDOR_CD = A4.VENDOR_CD
                    WHERE
                        so.stsout_cd IN (${stsoutIn})
                        AND A1.PO_CD2 like '${poFilter}'
                        AND A4.VENDOR_NAME like '${supplierFilter}'
                `;
                const tRet4All = await prisma.$queryRaw(Prisma.raw(sqlStr4All));

                tRet4All.forEach((row) => {
                    const key = row.STSOUT_CD;
                    if (!puInfoMap[key]) {
                        puInfoMap[key] = row;
                    }
                });
            }

            tRet.forEach((row) => {
                var tObj = { ...row };

                const pu = puInfoMap[tObj.STSOUT_CD];
                if (!pu) return;

                tObj.REG_USER = pu.REG_USER;
                tObj.BUYER_CD = pu.BUYER_CD;
                tObj.BUYER_NAME = pu.BUYER_NAME;
                tObj.PO_CD2 = pu.PO_CD2;
                tObj.VENDOR_CD = pu.VENDOR_CD;
                tObj.VENDOR_NAME = pu.VENDOR_NAME;
                tObj.EXP_DELIVERY_DATE = pu.EXP_DELIVERY_DATE;
                tObj.REMARK = pu.REMARK;

                tRetArray.push(tObj);
            });

            tRet1.forEach((col) => {
                var tObj = { ...col };
                if (args.data.SUPPLIER) {
                    if (!tObj.VENDOR_NAME || tObj.VENDOR_NAME.trim() === '')
                        return;
                }
                tRetArray.push(tObj);
            });

            return tRetArray;
        },
    },
};

export default moduleQuery_S0433_2_1;
