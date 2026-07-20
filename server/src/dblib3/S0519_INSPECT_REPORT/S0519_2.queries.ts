import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0519_2 = {
    Query: {
        mgrQueryS0519_2: async (_, args, contextValue) => {

            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var sqlDestination = '';
            if (args.data.IS_BVT === '1') {
                sqlDestination = `AND left(a5.po_cd, 1) = 'P' `;
            }
            if (args.data.IS_ETP === '1') {
                sqlDestination = `AND left(a5.po_cd, 1) = 'E' `;
            }

            var sqlATA = '';
            var sATA = args.data.S_ATA;
            var eATA = args.data.E_ATA;
            if (!sATA && !eATA) {
            } else {
                if (!sATA) sATA = `${tRetDate1.substring(0, 6)}01`;
                if (!eATA) eATA = `99999999`;
                sqlATA = `and a3.ata between '${sATA}' and '${eATA}' `;
            }

            var sqlFACIN_DATE = '';
            var sFACIN_DATE = args.data.S_FACIN_DATE;
            var eFACIN_DATE = args.data.E_FACIN_DATE;
            if (!sFACIN_DATE && !eFACIN_DATE) {
                sFACIN_DATE = `${tRetDate1.substring(0, 4)}0101`;
                eFACIN_DATE = `99999999`;
            } else {
                if (!sFACIN_DATE) sFACIN_DATE = `${tRetDate1.substring(0, 4)}0101`;
                if (!eFACIN_DATE) eFACIN_DATE = `99999999`;
            }
            sqlFACIN_DATE = `and a.in_date between '${sFACIN_DATE}' and '${eFACIN_DATE}' `;

            var sqlCustomsNo = '';
            if (args.data.CUSTOMS_NO) {
                sqlCustomsNo = `and a3.CLEARANCE_NO like '%${args.data.CUSTOMS_NO}%' `;
            }

            var sqlBlNo = '';
            if (args.data.BL_NO) {
                sqlBlNo = `and a3.bl_no like '%${args.data.BL_NO}%'  `;
            }

            var sqlBuyerCd = '';
            if (args.data.BUYER_CD) {
                sqlBuyerCd = `and a6.buyer_cd = '${args.data.BUYER_CD}'  `;
            }

            var sqlRemark = '';
            if (args.data.REMARK) {
                sqlRemark = `and (a3.invoice_no like  '%${args.data.REMARK}%' or a3.bl_no like '%${args.data.REMARK}%' )   `;
            }

            var sqlMatlName = '';
            if (args.data.DESCRIPTION) {
                sqlMatlName = `and   a4.matl_name  like '%${args.data.DESCRIPTION}%'  `;
            }

            var sqlSpec = '';
            if (args.data.SPEC) {
                sqlSpec = `and   a4.spec  like '%${args.data.SPEC}%'  `;
            }

            var sqlUnit = '';
            if (args.data.UNIT) {
                sqlUnit = `and   a4.unit  like '%${args.data.UNIT}%'  `;
            }

            var sqlColor = '';
            if (args.data.COLOR) {
                sqlColor = `and   a4.color  like '%${args.data.COLOR}%'  `;
            }

            var sqlVendor = '';
            if (args.data.SUPPLIER) {
                sqlVendor = `and   a7.vendor_name  like '%${args.data.SUPPLIER}%'  `;
            }

            let sqlStr2 = `
                 select 
                      kk.VENDOR_NAME,
                      kk.VENDOR_CD,
                      kk.PO_CD,
                      kk.MATL_CD,
                      kk.MATL_NAME,
                      kk.COLOR,
                      kk.SPEC,
                      kk.UNIT,
                      kk.ATA,
                      kk.BUYER_CD,
                      kk2.BUYER_NAME as BUYER_NAME,
                      kk.SHIP_MODE,
                      kk3.cd_name as SHIP_MODE_N,
                      kk.BL_NO,
                      kk.ORIGIN_PORT,
                      kk.CBM,
                      kk.CT_NO as CT_QTY,
                      kk.USER_ID as REG_USER,
                      kk.PU_CD,
                      kk.STATUS_CD,
                      kk.STATUS_CD_N,
                      kk.FACTORY_CD,
                      kk.FACTORY_CD_N,
                      kk.SHIPMENT_CD,
                      kk.CLEARANCE_NO,
                      kk.STSOUT_CD,
                      kk.PACK_CD,
                      kk1.INVOICE_NO,
                      '' as TRADE_TERM,
                      kk1.ETA,
                      kk1.DESTINATION,
                      kk1.ETD as READY_DATE,
                      kk.WEIGHT,
                      kk.SHORTAGE_QTY,
                      kk.DEFECT_QTY,
                      kk.FACIN_QTY,
                      kk.ERR_QTY,
                      kk.LOCATION,
                      kk.DELIVERY,
                      kk.FACIN_DATE,
                      kk.FACIN_CD,
                      kk.INSPECT_DATE,
                      kk.FILE_NAME,
                      kk.FILE_URL,
                      '0' as NET_WEIGHT,
                      '' as CT_NO,
                      isnull(sum(kk.S_OUT_QTY), 0) as S_OUT_QTY
                 from 
                 (
                 select
                      distinct
                      isnull(a3.ata, '') as ATA,
                      isnull(a6.buyer_cd, '') as BUYER_CD,
                      isnull(a7.vendor_name, '') as VENDOR_NAME,
                      isnull(a.reg_user, '') as USER_ID,
                      isnull(a1.delivery_type, '') as DELIVERY_TYPE,
                      -- isnull(a8.cd_name, '') as DELIVERY_TYPE_N,
                      (case when a3.invoice_no is not null and a3.invoice_no <> '' then isnull(a3.invoice_no, '') 
                            when a3.remark is not null and a3.remark <> '' then isnull(a3.remark, '') 
                            else '' end) as DELIVERY_TYPE_N,
                      isnull(a3.bl_no, '') as BL_NO,
                      isnull(a3.CLEARANCE_NO, '') as CUSTOMS_NO,
                      isnull(a3.ORIGIN_PORT, '') as ORIGIN_PORT,
                      isnull(a.PO_CD, '') as PO_CD,
                      isnull(a.MATL_CD, '') as MATL_CD,
                      isnull(a4.MATL_NAME, '') as MATL_NAME,
                      isnull(a4.COLOR, '') as COLOR,
                      isnull(a4.SPEC, '') as SPEC,
                      isnull(a4.UNIT, '') as UNIT,
                      isnull(a1.ORDER_CD, '') as S_ORDER_CD,
                      isnull(a1.OUT_QTY, '') as S_OUT_QTY,
                      isnull(a.SHORTAGE_QTY, '') as SHORTAGE_QTY,
                      isnull(a.DEFECT_QTY, '') as DEFECT_QTY,
                      isnull(a.IN_QTY, '') as FACIN_QTY,
                      isnull(a.ERR_QTY, '') as ERR_QTY,
                      isnull(a.LOCATION, '') as LOCATION,
                      isnull(a.DELIVERY, '') as DELIVERY,
                      -- isnull(a2.WEIGHT, '0') as WEIGHT,
                      -- isnull(a2.CBM, '0') as CBM,
                      -- isnull(a2.CT_QTY, '0') as CT_NO,
                      isnull(a3.A_WEIGHT, '0') as WEIGHT,
                      isnull(a3.A_CBM, '0') as CBM,
                      isnull(a3.A_CT_QTY, '0') as CT_NO,
                      isnull(a1.REG_USER, '') as MC_ID,
                      isnull(a1.PU_CD, '') as PU_CD,
                      isnull(a12.STOCK_STATUS, '') as STATUS_CD,
                      isnull(a9.cd_name, '') as STATUS_CD_N,
                      isnull(a1.OUT_FACTORY_CD, '') as FACTORY_CD,
                      isnull(a10.FACTORY_NAME, '') as FACTORY_CD_N,
                      isnull(a3.SHIPMENT_CD, '') as SHIPMENT_CD,
                      isnull(a3.CLEARANCE_NO, '') as CLEARANCE_NO,
                      isnull(a3.SHIP_MODE, '') as SHIP_MODE,
                      isnull(a.STSOUT_CD, '') as STSOUT_CD,
                      isnull(a7.VENDOR_CD, '') as VENDOR_CD,
                      isnull(a.IN_DATE, '') as FACIN_DATE,
                      isnull(a.FACIN_CD, '') as FACIN_CD,
                      isnull(a.INSPECT_DATE, '') as INSPECT_DATE,
                      isnull(a.FILE_NAME, '') as FILE_NAME,
                      isnull(a.FILE_URL, '') as FILE_URL,
                      isnull(a1.PACK_CD, '') as PACK_CD, 
                      (case when (a1.po_seq = 99 or a1.po_seq = 98) then a1.OUT_QTY else 0 end) - isnull(a13.USE_QTY, 0) as MOQ_QTY
                 from ksv_stock_facin a 
                      left join ksv_stock_out a1 on a1.stsout_cd = a.stsout_cd
                                                and a1.po_cd = a.po_cd
                                                and a1.matl_cd = a.matl_cd
                      left join (
                          select
                              USE_PO_CD,
                              USE_MATL_CD,
                              sum(USE_QTY) as USE_QTY
                          from
                              KSV_STOCK_USE
                          group by
                              USE_PO_CD,
                              USE_MATL_CD
                      ) a13 on a13.USE_PO_CD = a1.PO_CD
                           and a13.USE_MATL_CD = a1.MATL_CD
                      left join ksv_shipment_mem a2 on a2.stsout_cd = a.stsout_cd
                      left join ksv_shipment_mst a3 on a3.shipment_cd = a2.shipment_cd 
                      left join kcd_matl_mst a4 on a4.matl_cd = a.matl_cd
                      left join kcd_vendor a7 on a7.vendor_cd = a4.vendor_cd
                      left join ksv_po_mem a5 on a5.po_cd = a.po_cd and  a5.po_seq = 1
                      left join kcd_buyer a6 on a6.buyer_cd = left(a5.order_cd, 2)
                      left join (
                          select
                              po_cd,
                              matl_cd,
                              max(stock_idx) as stock_idx
                          from
                              ksv_stock_matl
                          where
                              remain_qty >= 1
                          group by
                              po_cd,
                              matl_cd
                      ) a12k on a12k.po_cd = a.po_cd and a12k.matl_cd = a.matl_cd
                      left join ksv_stock_matl a12 on a12.stock_idx = a12k.stock_idx
                          and a12.po_cd = a.po_cd
                          and a12.matl_cd = a.matl_cd
                          and a12.remain_qty >= 1
                      left join kcd_code a8 on a8.cd_code = a1.delivery_type and a8.cd_group = 'DELIVERY_TYPE'
                      left join kcd_code a9 on a9.cd_code = a12.stock_status and a9.cd_group = 'STOCK_STATUS_S'
                      left join kcd_factory a10 on a10.factory_cd = a1.out_factory_cd
                      left join kcd_code a11 on a11.cd_code  = a3.ship_mode and a11.cd_group = 'shipment_ship_mode'
                 where  1 = 1
                 and   isnull(a3.CLEARANCE_NO, '') <> ''
                 and   a.po_cd  like '%${args.data.PO_CD}%'
                 and   a.matl_cd  like '%${args.data.MATL_CD}%'
                 ${sqlVendor}
                 ${sqlMatlName}
                 ${sqlSpec}
                 ${sqlUnit}
                 ${sqlColor}
                 ${sqlRemark}
                 ${sqlDestination}
                 ${sqlATA}
                 ${sqlFACIN_DATE}
                 ${sqlCustomsNo}
                 ${sqlBlNo}
                 ${sqlBuyerCd}
                 ) kk, ksv_shipment_mst kk1, kcd_buyer kk2, kcd_code kk3
                 where kk.shipment_cd = kk1.shipment_cd
                 and   kk.buyer_cd = kk2.buyer_cd
                 and   kk.ship_mode = kk3.cd_code and kk3.cd_group = 'shipment_ship_mode'
                 group by  
                      kk.VENDOR_NAME,
                      kk.VENDOR_CD,
                      kk.PO_CD,
                      kk.MATL_CD,
                      kk.MATL_NAME,
                      kk.COLOR,
                      kk.SPEC,
                      kk.UNIT,
                      kk.ATA,
                      kk.BUYER_CD,
                      kk2.BUYER_NAME,
                      kk.SHIP_MODE,
                      kk3.cd_name,
                      kk.BL_NO,
                      kk.ORIGIN_PORT,
                      kk.CBM,
                      kk.CT_NO,
                      kk.USER_ID,
                      kk.PU_CD,
                      kk.STATUS_CD,
                      kk.STATUS_CD_N,
                      kk.FACTORY_CD,
                      kk.FACTORY_CD_N,
                      kk.SHIPMENT_CD,
                      kk.CLEARANCE_NO,
                      kk.STSOUT_CD,
                      kk.PACK_CD,
                      kk1.INVOICE_NO,
                      -- '' as TRADE_TERM,
                      kk1.ETA,
                      kk1.DESTINATION,
                      kk1.ETD,
                      kk.WEIGHT,
                      kk.SHORTAGE_QTY,
                      kk.DEFECT_QTY,
                      kk.FACIN_QTY,
                      kk.ERR_QTY,
                      kk.LOCATION,
                      kk.DELIVERY,
                      KK.FACIN_DATE,
                      KK.FACIN_CD,
                      KK.INSPECT_DATE,
                      kk.FILE_NAME,
                      kk.FILE_URL
            `;
            var tRet2 = (await prisma.$queryRaw(Prisma.raw(sqlStr2))) as any[];
            console.log(`Step-0: ${tRet2.length}`);

            var tIdx2 = 0;
            var tRetArray = [];
            for (tIdx2 = 0; tIdx2 < tRet2.length; tIdx2++) {
                var tOne2 = {
                    ...tRet2[tIdx2],
                };

                tOne2.BAL_QTY = tOne2.FACIN_QTY;
                tOne2.UPDATE_QTY = '0';
                tOne2.USER_ID = tOne2.REG_USER;

                tRetArray.push(tOne2);
            }

            return tRetArray;
        },

        mgrQueryS0519_2_260203: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tPackCd = '';

            var sqlDestination = '';
            if (args.data.IS_BVT === '1')
                sqlDestination = `AND DESTINATION = 'BVT' `;
            if (args.data.IS_ETP === '1')
                sqlDestination = `AND DESTINATION = 'ETP' `;

            var sqlATA = '';
            var sATA = args.data.S_ATA;
            var eATA = args.data.E_ATA;
            if (!sATA && !eATA);
            else {
                if (!sATA) sATA = `${tRetDate1.substring(6)}01`;
                if (!eATA) eATA = `${tRetDate1.substring(6)}31`;
                sqlATA = `and ata between '${sATA}' and '${eATA}' `;
            }

            let sqlStr = `
                select
                    pp.PO_CD,
                    pp.MATL_CD,
                    pp.S_OUT_QTY,
                    pp.S_OUT_QTY2,
                    isnull(sum(pp1.IN_QTY), 0) as FACIN_QTY
                from
                    (
                        select
                            a.PO_CD,
                            a.MATL_CD,
                            sum(kk.out_qty) as S_OUT_QTY,
                            sum(a.out_qty) as S_OUT_QTY2
                        from
                            ksv_stock_out kk,
                            ksv_stock_mem a
                        where
                            kk.po_cd = a.po_cd
                            and kk.po_seq = a.po_seq
                            and kk.order_cd = a.order_cd
                            and kk.matl_cd = a.matl_cd
                            and kk.mrp_seq = a.mrp_seq
                            and a.out_qty > 0
                            and a.po_cd like '%${args.data.PO_CD}%'
                            and a.po_cd in (
                                select distinct
                                    po_cd
                                from
                                    ksv_stock_out
                                where
                                    stsout_cd in (
                                        select distinct
                                            stsout_cd
                                        from
                                            ksv_shipment_mem
                                        where
                                            shipment_cd in (
                                                select distinct
                                                    shipment_cd
                                                from
                                                    ksv_shipment_mst
                                                where
                                                    1 = 1
                                                    and CLEARANCE_NO is not null
                                                    and CLEARANCE_NO <> ''
                                                    and CLEARANCE_NO like '%${args.data.CUSTOMS_NO}%' ${sqlDestination} ${sqlATA}
                                            )
                                    )
                            )
                        group by
                            a.PO_CD,
                            a.MATL_CD
                    ) pp
                    left join ksv_stock_facin pp1 on pp.po_cd = pp1.po_cd
                    and pp.matl_cd = pp1.matl_cd
                where
                    1 = 1
                group by
                    pp.PO_CD,
                    pp.MATL_CD,
                    pp.S_OUT_QTY,
                    pp.S_OUT_QTY2
                having
                    pp.S_OUT_QTY2 > isnull(sum(pp1.IN_QTY), 0)
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetArray = [];

            console.log(`Count : ${tRet.length}`);

            var tInput = {
                ...args.data,
            };
            tInput.VENDOR_CD = '';
            tInput.BUYER_CD = '';
            tInput.PO_CD = '';
            tInput.MATL_NAME = '';

            var tRetArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tOne0 = {
                    ...tRet[tIdx],
                };

                console.log(
                    `Step-1 : ${tOne0.PO_CD}/${tOne0.MATL_CD}/${tOne0.S_OUT_QTY2},${tOne0.S_OUT_QTY}/${tOne0.FACIN_QTY}`,
                );

                var sqlDestination = '';
                if (args.data.IS_BVT === '1')
                    sqlDestination = `AND C.DESTINATION = 'BVT' `;
                if (args.data.IS_ETP === '1')
                    sqlDestination = `AND C.DESTINATION = 'ETP' `;

                var sqlATA = '';
                var sATA = args.data.S_ATA;
                var eATA = args.data.E_ATA;
                if (!sATA && !eATA);
                else {
                    if (!sATA) sATA = `${tRetDate1.substring(6)}01`;
                    if (!eATA) eATA = `${tRetDate1.substring(6)}31`;
                    sqlATA = `and c.ata between '${sATA}' and '${eATA}' `;
                }

                let sqlStr2 = `
                    select
                        e.VENDOR_NAME,
                        e.VENDOR_CD,
                        a.PO_CD,
                        a.MATL_CD,
                        f.MATL_NAME,
                        f.COLOR,
                        f.SPEC,
                        f.UNIT,
                        isnull(c.ATA, '') as ATA,
                        isnull(g.BUYER_CD, '') as BUYER_CD,
                        isnull(g.BUYER_NAME, '') as BUYER_NAME,
                        isnull(c.SHIP_MODE, '') as SHIP_MODE,
                        isnull(H1.CD_NAME, '') as SHIP_MODE_N,
                        isnull(c.BL_NO, '') as BL_NO,
                        isnull(c.ORIGIN_PORT, '') as ORIGIN_PORT,
                        isnull(d.CBM, '') as CBM,
                        isnull(d.CT_QTY, '') as CT_QTY,
                        isnull(c.REG_USER, '') as MC_ID,
                        isnull(a.PU_CD, '') as PU_CD,
                        isnull(c.STATUS_CD, '') as STATUS_CD,
                        isnull(H2.CD_NAME, '') as STATUS_CD_N,
                        isnull(c.DESTINATION, '') as FACTORY_CD,
                        isnull(h.FACTORY_NAME, '') as FACTORY_Cd_N,
                        isnull(c.SHIPMENT_CD, '') as SHIPMENT_CD,
                        isnull(c.CLEARANCE_NO, '') as CLEARANCE_NO,
                        isnull(b.STSOUT_CD, '') as STSOUT_CD,
                        isnull(c.REMARK, '') as PACK_CD,
                        isnull(d.INVOICE_NO, '') as INVOICE_NO,
                        isnull(d.TRADE_TERM, '') as TRADE_TERM,
                        isnull(c.ETA, '') as ETA,
                        isnull(c.DESTINATION, '') as DESTINATION,
                        isnull(b.CT_NO, '') as CT_NO,
                        isnull(d.READY_DATE, '') as READY_DATE,
                        -- isnull(d.WEIGHT, '') as GROSS_WEIGHT,
                        isnull(sum(b.OUT_QTY), 0) as SUM_OUT_QTY,
                        (isnull(sum(b.OUT_QTY * f.weight), 0) * 0.001) as WEIGHT
                    from
                        ksv_stock_mem a,
                        ksv_stock_out b,
                        ksv_shipment_mst c
                        left join kcd_code H1 on c.SHIP_MODE = H1.CD_CODE
                        and H1.CD_GROUP = 'shipment_ship_mode'
                        left join kcd_code H2 on c.STATUS_CD = H2.CD_CODE
                        and H2.CD_GROUP = 'shipment_status',
                        ksv_shipment_mem d,
                        kcd_vendor e,
                        kcd_matl_mst f,
                        kcd_buyer g,
                        kcd_factory h
                    where
                        a.po_cd = '${tOne0.PO_CD}'
                        and a.matl_cd = '${tOne0.MATL_CD}'
                        and a.po_cd = b.po_cd
                        and a.po_seq = b.po_seq
                        and a.order_cd = b.order_cd
                        and a.matl_cd = b.matl_cd
                        and a.mrp_seq = b.mrp_seq
                        and b.stsout_cd = d.stsout_cd
                        and d.shipment_cd = c.shipment_cd
                        and a.matl_cd = f.matl_cd
                        and f.vendor_cd = e.vendor_cd
                        and left(a.ORDER_CD, 2) = g.buyer_cd
                        and b.out_factory_cd = h.factory_cd
                        and b.pack_cd like '%%'
                        and a.MATL_CD like '%%'
                        and a.PU_CD like '%%'
                        and c.BL_NO like '%%'
                        and c.SHIPMENT_CD like '%%'
                        and (c.CLEARANCE_NO is not null and c.CLEARANCE_NO <> '')
                        and c.CLEARANCE_NO like '%${args.data.CUSTOMS_NO}%'
                        and left(a.ORDER_CD, 2) like '%%'
                        and b.REG_USER like '%%'
                        and c.REG_USER like '%%'
                        and a.OUT_QTY > 0 ${sqlDestination} ${sqlATA}
                    group by
                        e.VENDOR_NAME,
                        e.VENDOR_CD,
                        a.PO_CD,
                        a.MATL_CD,
                        f.MATL_NAME,
                        f.COLOR,
                        f.SPEC,
                        f.UNIT,
                        isnull(c.ATA, ''),
                        isnull(g.BUYER_CD, ''),
                        isnull(g.BUYER_NAME, ''),
                        isnull(c.SHIP_MODE, ''),
                        isnull(H1.CD_NAME, ''),
                        isnull(c.BL_NO, ''),
                        isnull(c.ORIGIN_PORT, ''),
                        isnull(d.CBM, ''),
                        isnull(d.CT_QTY, ''),
                        isnull(c.REG_USER, ''),
                        isnull(a.PU_CD, ''),
                        isnull(c.STATUS_CD, ''),
                        isnull(H2.CD_NAME, ''),
                        isnull(c.DESTINATION, ''),
                        isnull(h.FACTORY_NAME, ''),
                        isnull(c.SHIPMENT_CD, ''),
                        isnull(c.CLEARANCE_NO, ''),
                        isnull(b.STSOUT_CD, ''),
                        isnull(c.REMARK, ''),
                        isnull(d.INVOICE_NO, ''),
                        isnull(d.TRADE_TERM, ''),
                        isnull(c.ETA, ''),
                        isnull(c.DESTINATION, ''),
                        isnull(b.CT_NO, ''),
                        isnull(d.READY_DATE, '')
                `;
                var tRet2 = await prisma.$queryRaw(Prisma.raw(sqlStr2));
                if (tRet2.length <= 0) continue;

                var remainQty =
                    parseFloat(tOne0.S_OUT_QTY) - parseFloat(tOne0.FACIN_QTY);
                console.log(
                    `Step-2 : ${tOne0.PO_CD}/${tOne0.MATL_CD}/${tOne0.S_OUT_QTY}/${tOne0.FACIN_QTY}/${remainQty}`,
                );

                var tIdx2 = 0;
                for (tIdx2 = 0; tIdx2 < tRet2.length; tIdx2++) {
                    var tOne2 = {
                        ...tRet2[tIdx2],
                    };

                    if (remainQty <= 0) continue;

                    var wFacinQty = 0;
                    if (remainQty >= parseFloat(tOne2.SUM_OUT_QTY)) {
                        wFacinQty = parseFloat(tOne2.SUM_OUT_QTY);
                        remainQty -= wFacinQty;
                    } else {
                        wFacinQty = parseFloat(remainQty);
                        remainQty = 0;
                    }

                    tOne2.FACIN_QTY = parseFloat(wFacinQty).toFixed(2);

                    var tBalQty = parseFloat(tOne2.FACIN_QTY);

                    tOne2.FILE_NAME = '';
                    tOne2.FILE_URL = '';
                    tOne2.FACIN_DATE = '';
                    tOne2.DEFECT_QTY = '0';
                    tOne2.SHORTAGE_QTY = '0';

                    tOne2.FACIN_QTY2 = '0';

                    tBalQty = parseFloat(tBalQty).toFixed(2);

                    tOne2.S_OUT_QTY = tBalQty;
                    tOne2.FACIN_QTY = tBalQty;
                    tOne2.BAL_QTY = tBalQty;
                    tOne2.UPDATE_QTY = '0';
                    tOne2.USER_ID = tOne2.REG_USER;

                    if (args.data.BL_NO) {
                        var tVal1 = tOne2.BL_NO.replace(/ /gi, '');
                        var tVal2 = args.data.BL_NO.replace(/ /gi, '');
                        if (tVal1.includes(tVal2));
                        else continue;
                    }

                    if (args.data.REMARK) {
                        var tVal1 = tOne2.PACK_CD.replace(/ /gi, '');
                        var tVal2 = args.data.REMARK.replace(/ /gi, '');
                        if (tVal1.includes(tVal2));
                        else continue;
                    }

                    tRetArray.push(tOne2);
                    console.log(
                        `Step-3 : ${tOne0.PO_CD}/${tOne0.MATL_CD}/${tOne0.S_OUT_QTY2}/${tOne0.FACIN_QTY}/${remainQty}/${tBalQty}/${tRetArray.length}`,
                    );
                }
            }
            // console.log(`Facin List Count: ${tRet.length}`);
            // console.log(sqlStr);
            return tRetArray;
        },

        mgrQueryS0519_2_bak: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }

            var sATA = args.data.S_ATA;
            var eATA = args.data.E_ATA;
            if (sATA === '') sATA = `${tRetDate1.substring(0, 6)}01`;
            if (eATA === '') eATA = '99999999';
            tSQL = `and c.ata between '${sATA}' and '${eATA}' `;

            let sqlStr = `
                select
                    isnull(c.ATA, '') as ATA,
                    '' as STATUS_CD_N,
                    '' as STATUS_CD,
                    isnull(c.BL_NO, '') as BL_NO,
                    isnull(c.CLEARANCE_NO, '') as CLEARANCE_NO,
                    f.BUYER_CD,
                    a.PO_CD,
                    e.VENDOR_NAME,
                    a.MATL_CD,
                    b.MATL_NAME,
                    b.COLOR,
                    b.SPEC,
                    b.UNIT,
                    isnull(c.REG_USER, '') as REG_USER,
                    isnull(c.SHIPMENT_CD, '') as SHIPMENT_CD,
                    isnull(c.SHIP_MODE, '') as SHIP_MODE,
                    a.STSOUT_CD,
                    b.VENDOR_CD,
                    a.DELIVERY_TYPE,
                    f.PAYER,
                    -- isnull(h.FACIN_CD , '') as FACIN_CD,
                    a.OUT_DATETIME,
                    sum(a.OUT_QTY) as S_OUT_QTY
                    -- isnull(sum(h.IN_QTY) , '0') as FACIN_QTY,
                    -- isnull(sum(h.SHORTAGE_QTY), '0') as SHORTAGE_QTY,
                    -- isnull(sum(h.DEFECT_QTY), '0') as DEFECT_QTY
                from
                    ksv_stock_out a
                    left join ksv_pu_mst2 f on a.pu_cd = f.pu_cd
                    and f.buyer_cd like '%${args.data.BUYER_CD}%'
                    left join ksv_stock_out_mst g on a.stsout_cd = g.stsout_cd
                    and g.ready_facin_flag = '1'
                    -- left join ksv_stock_facin h on h.stsout_cd = a.stsout_cd 
                    --                           and h.matl_cd = a.matl_cd
                    --                           and h.po_cd = a.po_cd
                    left join ksv_shipment_mst c on c.shipment_cd in (
                        select
                            shipment_cd
                        from
                            ksv_shipment_mem
                        where
                            stsout_cd = a.stsout_cd
                    )
                    and c.destination <> 'SINGAPORE' ${tSQL}
                    and c.ata is not null
                    and c.ata <> '',
                    -- left join ksv_shipment_mem d on d.shipment_cd = a.shipment_cd and d.stsout_cd = a.stsout_cd,
                    kcd_matl_mst b,
                    kcd_vendor e
                where
                    a.matl_cd = b.matl_cd
                    and (
                        e.vendor_cd like '%${args.data.VENDOR_CD}%'
                        or e.vendor_name like '%${args.data.VENDOR_CD}%'
                    )
                    and a.po_cd like '%${args.data.PO_CD}%'
                    and b.vendor_cd = e.vendor_cd
                    and (
                        e.vendor_cd like '%${args.data.VENDOR_CD}%'
                        or e.vendor_name like '%${args.data.VENDOR_CD}%'
                    )
                group by
                    c.ATA,
                    c.BL_NO,
                    c.SHIPMENT_CD,
                    c.SHIP_MODE,
                    c.BL_NO,
                    c.CLEARANCE_NO,
                    a.STSOUT_CD,
                    a.PO_CD,
                    a.MATL_CD,
                    b.MATL_NAME,
                    b.COLOR,
                    b.SPEC,
                    b.UNIT,
                    a.OUT_DATETIME,
                    b.VENDOR_CD,
                    e.VENDOR_NAME,
                    a.DELIVERY_TYPE,
                    f.PAYER,
                    -- h.FACIN_CD, 
                    f.BUYER_CD,
                    c.REG_USER
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {};
            var tRetArray = [];

            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tObj = {
                    ...tRet[tIdx],
                };

                let sql100 = `
                    select
                        isnull(facin_cd, '') as FACIN_CD,
                        isnull(sum(in_qty), '0') as FACIN_QTY,
                        isnull(sum(shortage_qty), '0') as SHORTAGE_QTY,
                        isnull(sum(defect_qty), '0') as DEFECT_QTY
                    from
                        ksv_stock_facin
                    where
                        stsout_cd = '${tObj.STSOUT_CD}'
                        and matl_cd = '${tObj.MATL_CD}'
                        and po_cd = '${tObj.PO_CD}'
                    group by
                        facin_cd
                `;
                var tRet100 = await prisma.$queryRaw(Prisma.raw(sql100));

                tObj.FACIN_CD = '';
                tObj.FACIN_QTY = '0';
                tObj.SHORTAGE_QTY = '0';
                tObj.DEFECT_QTY = '0';
                if (tRet100.length > 0) {
                    tObj.FACIN_CD = String(tRet100[0].FACIN_CD);
                    tObj.FACIN_QTY = String(tRet100[0].FACIN_QTY);
                    tObj.SHORTAGE_QTY = String(tRet100[0].SHORTAGE_QTY);
                    tObj.DEFECT_QTY = String(tRet100[0].DEFECT_QTY);
                }

                tObj.STATUS_CD = '0';
                tObj.STATUS_CD_N = 'Waiting';
                tObj.FILE_NAME = '';
                tObj.FILE_URL = '';
                if (args.data.STATUS_CD !== '1') {
                    if (tObj.FACIN_CD !== '') {
                        // Waiting
                        continue;
                    }
                } else {
                    if (tObj.FACIN_CD === '') {
                        // Waiting
                        continue;
                    }
                }
                /*
                if (args.data.STATUS_CD === '0' && tObj.FACIN_CD !== '') { // Waiting
                    continue;
                }
                if (args.data.STATUS_CD === '1' && tObj.FACIN_CD === '') { // Done 
                    continue;
                }
                */
                if (tObj.SHIPMENT_CD !== '') {
                    if (parseFloat(tObj.ATA) < parseFloat(sATA)) continue;
                    if (parseFloat(tObj.ATA) > parseFloat(eATA)) continue;
                } else {
                    var tOutDate = tObj.OUT_DATETIME.substring(0, 8);
                    if (parseFloat(tOutDate) < parseFloat(sATA)) continue;
                    if (parseFloat(tOutDate) > parseFloat(eATA)) continue;
                }
                /*
                if (tObj.SHIPMENT_CD !== '') {
                    if (parseFloat(tObj.ATA) < parseFloat(args.data.S_ATA)) continue;
                    if (parseFloat(tObj.ATA) > parseFloat(args.data.E_ATA)) continue;
                } else {
                    var tOutDate = tObj.OUT_DATETIME.substring(0, 8);
                    if (parseFloat(tOutDate) < parseFloat(args.data.S_ATA)) continue;
                    if (parseFloat(tOutDate) > parseFloat(args.data.E_ATA)) continue;
                }
                */
                var tBalQty =
                    parseFloat(tObj.S_OUT_QTY) -
                    (parseFloat(tObj.FACIN_QTY) +
                        parseFloat(tObj.SHORTAGE_QTY) +
                        parseFloat(tObj.DEFECT_QTY));
                tObj.BAL_QTY = String(tBalQty);
                tObj.UPDATE_QTY = String(tBalQty);
                console.log(`FACIN List=>${tObj.SHIPMENT_CD},${tObj.PAYER} `);
                if (
                    tObj.SHIPMENT_CD !== '' ||
                    tObj.PAYER === 'FACTORY' ||
                    tObj.PAYER === 'BVT' ||
                    tObj.PAYER === 'ETP'
                ) {
                    if (tObj.FACIN_CD !== '') {
                        tObj.STATUS_CD = '1';
                        tObj.STATUS_CD_N = 'Done';

                        var tFileCd = tObj.FACIN_CD.substring(0, 20);
                        let sql0 = `
                            select
                                *
                            from
                                kcd_fileinfo
                            where
                                kind = 'INSPECT'
                                and file_key = '${tFileCd}'
                        `;
                        var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                        if (tRet0.length > 0) {
                            tObj.FILE_NAME = tRet0[0].NAME;
                            tObj.FILE_URL = tRet0[0].URL;
                        }
                    }
                    if (args.data.STATUS_CD === '0') {
                        if (parseFloat(tObj.BAL_QTY) > 0) tRetArray.push(tObj);
                    } else {
                        tRetArray.push(tObj);
                    }
                }
            }
            console.log(`Facin List Count: ${tRet.length}`);
            console.log(sqlStr);

            var tIdx = 0;
            return tRetArray;
        },

        mgrQueryS0519_2_bak1: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }

            var sATA = args.data.S_ATA;
            var eATA = args.data.E_ATA;
            if (sATA === '') sATA = `${tRetDate1.substring(0, 6)}01`;
            if (eATA === '') eATA = '99999999';
            tSQL = `and c.ata between '${sATA}' and '${eATA}' `;

            let sqlStr = `
                select
                    isnull(c.ATA, '') as ATA,
                    '' as STATUS_CD_N,
                    '' as STATUS_CD,
                    isnull(c.BL_NO, '') as BL_NO,
                    isnull(c.CLEARANCE_NO, '') as CLEARANCE_NO,
                    f.BUYER_CD,
                    a.PO_CD,
                    e.VENDOR_NAME,
                    a.MATL_CD,
                    b.MATL_NAME,
                    b.COLOR,
                    b.SPEC,
                    b.UNIT,
                    isnull(c.REG_USER, '') as REG_USER,
                    isnull(c.SHIPMENT_CD, '') as SHIPMENT_CD,
                    isnull(c.REMARK, '') as REMARK,
                    isnull(c.SHIP_MODE, '') as SHIP_MODE,
                    '' as STSOUT_CD,
                    b.VENDOR_CD,
                    a.DELIVERY_TYPE,
                    f.PAYER,
                    '' as OUT_DATETIME,
                    sum(a.OUT_QTY) as S_OUT_QTY
                from
                    ksv_stock_out a
                    left join ksv_pu_mst2 f on a.pu_cd = f.pu_cd
                    and f.buyer_cd like '%${args.data.BUYER_CD}%'
                    left join ksv_stock_out_mst g on a.stsout_cd = g.stsout_cd
                    and g.ready_facin_flag = '1'
                    left join ksv_shipment_mst c on c.shipment_cd in (
                        select
                            shipment_cd
                        from
                            ksv_shipment_mem
                        where
                            stsout_cd = a.stsout_cd
                    )
                    and c.destination <> 'SINGAPORE' ${tSQL}
                    and c.ata is not null
                    and c.ata <> '',
                    kcd_matl_mst b,
                    kcd_vendor e
                where
                    a.matl_cd = b.matl_cd
                    and (
                        e.vendor_cd like '%${args.data.VENDOR_CD}%'
                        or e.vendor_name like '%${args.data.VENDOR_CD}%'
                    )
                    and a.po_cd like '%${args.data.PO_CD}%'
                    and b.vendor_cd = e.vendor_cd
                    and (
                        e.vendor_cd like '%${args.data.VENDOR_CD}%'
                        or e.vendor_name like '%${args.data.VENDOR_CD}%'
                    )
                group by
                    c.ATA,
                    c.BL_NO,
                    c.SHIPMENT_CD,
                    c.REMARK,
                    c.SHIP_MODE,
                    c.BL_NO,
                    c.CLEARANCE_NO,
                    -- a.STSOUT_CD, 
                    a.PO_CD,
                    a.MATL_CD,
                    b.MATL_NAME,
                    b.COLOR,
                    b.SPEC,
                    b.UNIT,
                    -- a.OUT_DATETIME,
                    b.VENDOR_CD,
                    e.VENDOR_NAME,
                    a.DELIVERY_TYPE,
                    f.PAYER,
                    f.BUYER_CD,
                    c.REG_USER
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {};
            var tRetArray = [];

            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tObj = {
                    ...tRet[tIdx],
                };

                var tDelivery = `${tRemark}-#${col.CLEANCE_NO}-#${col.BL_NO}`;

                let sql100 = `
                    select
                        isnull(sum(in_qty), '0') as FACIN_QTY,
                        isnull(sum(shortage_qty), '0') as SHORTAGE_QTY,
                        isnull(sum(defect_qty), '0') as DEFECT_QTY
                    from
                        ksv_stock_facin
                    where
                        matl_cd = '${tObj.MATL_CD}'
                        and po_cd = '${tObj.PO_CD}'
                        and in_date = '${tRetDate1}'
                        and delivery = '${tDelivery}'
                `;
                var tRet100 = await prisma.$queryRaw(Prisma.raw(sql100));

                tObj.FACIN_QTY = '0';
                tObj.SHORTAGE_QTY = '0';
                tObj.DEFECT_QTY = '0';
                if (tRet100.length > 0) {
                    tObj.FACIN_QTY = String(tRet100[0].FACIN_QTY);
                    tObj.SHORTAGE_QTY = String(tRet100[0].SHORTAGE_QTY);
                    tObj.DEFECT_QTY = String(tRet100[0].DEFECT_QTY);
                }

                tObj.STATUS_CD = '0';
                tObj.STATUS_CD_N = 'Waiting';
                tObj.FILE_NAME = '';
                tObj.FILE_URL = '';
                if (args.data.STATUS_CD !== '1') {
                    if (tObj.FACIN_CD !== '') {
                        // Waiting
                        continue;
                    }
                } else {
                    if (tObj.FACIN_CD === '') {
                        // Waiting
                        continue;
                    }
                }
                if (tObj.SHIPMENT_CD !== '') {
                    if (parseFloat(tObj.ATA) < parseFloat(sATA)) continue;
                    if (parseFloat(tObj.ATA) > parseFloat(eATA)) continue;
                } else {
                    var tOutDate = tObj.OUT_DATETIME.substring(0, 8);
                    if (parseFloat(tOutDate) < parseFloat(sATA)) continue;
                    if (parseFloat(tOutDate) > parseFloat(eATA)) continue;
                }
                var tBalQty =
                    parseFloat(tObj.S_OUT_QTY) -
                    (parseFloat(tObj.FACIN_QTY) +
                        parseFloat(tObj.SHORTAGE_QTY) +
                        parseFloat(tObj.DEFECT_QTY));
                tObj.BAL_QTY = String(tBalQty);
                tObj.UPDATE_QTY = String(tBalQty);
                console.log(`FACIN List=>${tObj.SHIPMENT_CD},${tObj.PAYER} `);
                if (
                    tObj.SHIPMENT_CD !== '' ||
                    tObj.PAYER === 'FACTORY' ||
                    tObj.PAYER === 'BVT' ||
                    tObj.PAYER === 'ETP'
                ) {
                    if (tObj.FACIN_CD !== '') {
                        tObj.STATUS_CD = '1';
                        tObj.STATUS_CD_N = 'Done';

                        var tFileCd = tObj.FACIN_CD.substring(0, 20);
                        let sql0 = `
                            select
                                *
                            from
                                kcd_fileinfo
                            where
                                kind = 'INSPECT'
                                and file_key = '${tFileCd}'
                        `;
                        var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                        if (tRet0.length > 0) {
                            tObj.FILE_NAME = tRet0[0].NAME;
                            tObj.FILE_URL = tRet0[0].URL;
                        }
                    }
                    if (args.data.STATUS_CD === '0') {
                        if (parseFloat(tObj.BAL_QTY) > 0) tRetArray.push(tObj);
                    } else {
                        tRetArray.push(tObj);
                    }
                }
            }
            console.log(`Facin List Count: ${tRet.length}`);
            console.log(sqlStr);

            var tIdx = 0;
            return tRetArray;
        },
    },
};

export default moduleQuery_S0519_2;
