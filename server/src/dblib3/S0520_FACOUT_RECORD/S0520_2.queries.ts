import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0520_2 = {
    Query: {
        mgrQueryS0520_2: async (_, args) => {
            var tSQL = '';

            let sqlStr_order = `
                select
                    K.PO_CD,
                    K.ORDER_CD,
                    K.MATL_CD,
                    '' as PU_CD,
                    0 as PO_QTY2,
                    K.PO_QTY,
                    (K.USE_QTY + isnull(k0.USE_QTY, 0)) as MRP_QTY,
                    (K.USE_QTY - k.PO_QTY + isnull(k0.USE_QTY, 0)) as STOCK_QTY,
                    K.PO_SEQ,
                    isnull(K1.STSIN_IN_QTY, 0) as IN_QTY,
                    isnull(K2.STSOUT_OUT_QTY, 0) as OUT_QTY,
                    isnull(K2.ERROR_QTY, 0) as ERROR_QTY,
                    isnull(K3.FACIN_IN_QTY, 0) as FAC_IN_QTY2,
                    isnull(K4.FACOUT_OUT_QTY, 0) as FAC_OUT_QTY_TOT,
                    isnull(K4_main.FACOUT_OUT_QTY, 0) as MAIN_USE_QTY,
                    isnull(K4_other.FACOUT_OUT_QTY, 0) as OTHER_USE_QTY,
                    isnull(K4_shortage.FACOUT_OUT_QTY, 0) as TABLE_SHORT_QTY,
                    isnull(K4_keep_stock.FACOUT_OUT_QTY, 0) as KEEP_STOCK_QTY,
                    isnull(K4_defect.FACOUT_OUT_QTY, 0) as DEFECT_QTY,
                    isnull(K4_lost.FACOUT_OUT_QTY, 0) as LOST_QTY,
                    a3.MATL_NAME,
                    a5.VENDOR_NAME,
                    a3.COLOR,
                    a3.SPEC,
                    a3.UNIT,
                    a4.CURR_CD,
                    a4.MATL_PRICE as MASTER_PRICE,
                    '0' as OUTFAC_QTY2,
                    '0' as BAL_QTY,
                    '' as REMARK
                from
                    (
                        select
                            PO_CD,
                            ORDER_CD,
                            MATL_CD,
                            sum(PO_QTY) as PO_QTY,
                            sum(USE_QTY) as USE_QTY,
                            max(PO_SEQ) as PO_SEQ
                        from
                            ksv_po_mrp
                        where
                            po_cd = '${args.data.PO_CD}'
                            and order_cd = '${args.data.ORDER_CD}'
                            and use_po_type = '1'
                        group by
                            PO_CD,
                            ORDER_CD,
                            MATL_CD
                    ) K
                    left join (
                        select
                            PO_CD,
                            ORDER_CD,
                            MATL_CD,
                            sum(PO_QTY) as PO_QTY,
                            sum(USE_QTY) as USE_QTY,
                            max(PO_SEQ) as PO_SEQ
                        from
                            ksv_po_mrp
                        where
                            po_cd = '${args.data.PO_CD}'
                            and order_cd = '${args.data.ORDER_CD}'
                            and use_po_type = '2'
                            and diff_po_type = '5'
                        group by
                            PO_CD,
                            ORDER_CD,
                            MATL_CD
                    ) k0 on K0.PO_CD = K.PO_CD
                    and k0.ORDER_CD = k.ORDER_CD
                    and k0.MATL_CD = k.MATL_CD
                    left join (
                        select
                            PO_CD,
                            ORDER_CD,
                            MATL_CD,
                            sum(IN_QTY) as STSIN_IN_QTY,
                            sum(OUT_QTY) as STSIN_OUT_QTY
                        from
                            ksv_stock_in
                        where
                            po_cd = '${args.data.PO_CD}'
                            and order_cd = '${args.data.ORDER_CD}'
                        group by
                            PO_CD,
                            ORDER_CD,
                            MATL_CD
                    ) K1 on K1.PO_CD = K.PO_CD
                    and k1.ORDER_CD = k.ORDER_CD
                    and k1.MATL_CD = k.MATL_CD
                    left join (
                        select
                            PO_CD,
                            ORDER_CD,
                            MATL_CD,
                            sum(OUT_QTY) as STSOUT_OUT_QTY,
                            sum(ERR_QTY) as ERROR_QTY
                        from
                            ksv_stock_out
                        where
                            po_cd = '${args.data.PO_CD}'
                            and order_cd = '${args.data.ORDER_CD}'
                        group by
                            PO_CD,
                            ORDER_CD,
                            MATL_CD
                    ) K2 on K2.PO_CD = K.PO_CD
                    and k2.ORDER_CD = k.ORDER_CD
                    and k2.MATL_CD = k.MATL_CD
                    left join (
                        select
                            PO_CD,
                            MATL_CD,
                            sum(IN_QTY) as FACIN_IN_QTY
                            -- from ksv_stock_facin_order
                        from
                            ksv_stock_facin
                        where
                            po_cd = '${args.data.PO_CD}'
                            -- and   order_cd = '${args.data.ORDER_CD}'
                        group by
                            PO_CD,
                            MATL_CD
                    ) K3 on K3.PO_CD = K.PO_CD
                    and k3.MATL_CD = k.MATL_CD
                    left join (
                        select
                            PO_CD,
                            ORDER_CD,
                            MATL_CD,
                            sum(OUT_QTY) as FACOUT_OUT_QTY
                        from
                            ksv_stock_facout
                        where
                            po_cd = '${args.data.PO_CD}'
                            and order_cd = '${args.data.ORDER_CD}'
                        group by
                            PO_CD,
                            ORDER_CD,
                            MATL_CD
                    ) K4 on K4.PO_CD = K.PO_CD
                    and k4.ORDER_CD = k.ORDER_CD
                    and k4.MATL_CD = k.MATL_CD
                    left join (
                        select
                            PO_CD,
                            ORDER_CD,
                            MATL_CD,
                            sum(OUT_QTY) as FACOUT_OUT_QTY
                        from
                            ksv_stock_facout
                        where
                            po_cd = '${args.data.PO_CD}'
                            and order_cd = '${args.data.ORDER_CD}'
                            and remark like 'main%'
                        group by
                            PO_CD,
                            ORDER_CD,
                            MATL_CD
                    ) K4_main on K4_main.PO_CD = K.PO_CD
                    and k4_main.ORDER_CD = k.ORDER_CD
                    and k4_main.MATL_CD = k.MATL_CD
                    left join (
                        select
                            PO_CD,
                            ORDER_CD,
                            MATL_CD,
                            sum(OUT_QTY) as FACOUT_OUT_QTY
                        from
                            ksv_stock_facout
                        where
                            po_cd = '${args.data.PO_CD}'
                            and order_cd = '${args.data.ORDER_CD}'
                            and (
                                remark like 'sample%'
                                or remark like 'm_up%'
                                or remark like 'test%'
                            )
                        group by
                            PO_CD,
                            ORDER_CD,
                            MATL_CD
                    ) K4_other on K4_other.PO_CD = K.PO_CD
                    and k4_other.ORDER_CD = k.ORDER_CD
                    and k4_other.MATL_CD = k.MATL_CD
                    left join (
                        select
                            PO_CD,
                            ORDER_CD,
                            MATL_CD,
                            sum(OUT_QTY) as FACOUT_OUT_QTY
                        from
                            ksv_stock_facout
                        where
                            po_cd = '${args.data.PO_CD}'
                            and order_cd = '${args.data.ORDER_CD}'
                            and (remark like 'keep_stock%')
                        group by
                            PO_CD,
                            ORDER_CD,
                            MATL_CD
                    ) K4_keep_stock on K4_keep_stock.PO_CD = K.PO_CD
                    and k4_keep_stock.ORDER_CD = k.ORDER_CD
                    and k4_keep_stock.MATL_CD = k.MATL_CD
                    left join (
                        select
                            PO_CD,
                            ORDER_CD,
                            MATL_CD,
                            sum(OUT_QTY) as FACOUT_OUT_QTY
                        from
                            ksv_stock_facout
                        where
                            po_cd = '${args.data.PO_CD}'
                            and order_cd = '${args.data.ORDER_CD}'
                            and (remark like 'lost%')
                        group by
                            PO_CD,
                            ORDER_CD,
                            MATL_CD
                    ) K4_lost on K4_lost.PO_CD = K.PO_CD
                    and k4_lost.ORDER_CD = k.ORDER_CD
                    and k4_lost.MATL_CD = k.MATL_CD
                    left join (
                        select
                            PO_CD,
                            MATL_CD,
                            sum(etc_qty) as FACOUT_OUT_QTY
                        from
                            ksv_stock_facetc
                        where
                            po_cd = '${args.data.PO_CD}'
                            and etc_type = 'Error'
                        group by
                            PO_CD,
                            MATL_CD
                    ) K4_defect0 on K4_defect0.PO_CD = K.PO_CD
                    and k4_defect0.MATL_CD = k.MATL_CD
                    left join (
                        select
                            PO_CD,
                            ORDER_CD,
                            MATL_CD,
                            sum(OUT_QTY) as FACOUT_OUT_QTY
                        from
                            ksv_stock_facout
                        where
                            po_cd = '${args.data.PO_CD}'
                            and order_cd = '${args.data.ORDER_CD}'
                            and (remark like 'defect%')
                        group by
                            PO_CD,
                            ORDER_CD,
                            MATL_CD
                    ) K4_defect on K4_defect.PO_CD = K.PO_CD
                    and k4_defect.ORDER_CD = k.ORDER_CD
                    and k4_defect.MATL_CD = k.MATL_CD
                    left join (
                        select
                            PO_CD,
                            ORDER_CD,
                            MATL_CD,
                            sum(OUT_QTY) as FACOUT_OUT_QTY
                        from
                            ksv_stock_facout
                        where
                            po_cd = '${args.data.PO_CD}'
                            and order_cd = '${args.data.ORDER_CD}'
                            and (remark like 'table_shortage%')
                        group by
                            PO_CD,
                            ORDER_CD,
                            MATL_CD
                    ) K4_shortage on K4_shortage.PO_CD = K.PO_CD
                    and k4_shortage.ORDER_CD = k.ORDER_CD
                    and k4_shortage.MATL_CD = k.MATL_CD,
                    kcd_matl_mst a3,
                    kcd_matl_mem a4,
                    kcd_vendor a5
                where
                    K.MATL_CD = a3.matl_cd
                    -- and   K.PO_QTY > 0
                    and K.MATL_CD = a4.matl_cd
                    and a4.matl_seq = (
                        select
                            max(matl_seq)
                        from
                            kcd_matl_mem
                        where
                            matl_cd = K.matl_cd
                    )
                    and a3.VENDOR_CD = a5.VENDOR_CD
                    and a5.VENDOR_NAME like '%${args.data.VENDOR_CD}%'
                    and a3.MATL_NAME like '%${args.data.DESCRIPTION}%'
                    and a3.MATL_CD like '%${args.data.MATL_CD}%'
                    and a3.SPEC like '%${args.data.SPEC}%'
                    and a3.COLOR like '%${args.data.COLOR}%'
                    and a3.UNIT like '%${args.data.UNIT}%'
                order by
                    k.MATL_CD
            `;

            let sqlStr_po = `
                select
                    K.PO_CD,
                    '' as ORDER_CD,
                    K.MATL_CD,
                    '' as PU_CD,
                    0 as PO_QTY2,
                    K.PO_QTY,
                    (K.USE_QTY + isnull(k0.USE_QTY, 0)) as MRP_QTY,
                    (K.USE_QTY - k.PO_QTY + isnull(k0.USE_QTY, 0)) as STOCK_QTY,
                    K.PO_SEQ,
                    isnull(K1.STSIN_IN_QTY, 0) as IN_QTY,
                    isnull(K2.STSOUT_OUT_QTY, 0) as OUT_QTY,
                    isnull(K2.ERR_QTY, 0) as ERROR_QTY,
                    isnull(K3.FACIN_IN_QTY, 0) as FAC_IN_QTY2,
                    isnull(K4.FACOUT_OUT_QTY, 0) as FAC_OUT_QTY_TOT,
                    isnull(K4_main.FACOUT_OUT_QTY, 0) as MAIN_USE_QTY,
                    isnull(K4_other.FACOUT_OUT_QTY, 0) as OTHER_USE_QTY,
                    isnull(K4_shortage.FACOUT_OUT_QTY, 0) as TABLE_SHORT_QTY,
                    isnull(K4_keep_stock.FACOUT_OUT_QTY, 0) as KEEP_STOCK_QTY,
                    isnull(K4_defect.FACOUT_OUT_QTY, 0) as DEFECT_QTY,
                    isnull(K4_lost.FACOUT_OUT_QTY, 0) as LOST_QTY,
                    a3.MATL_NAME,
                    a5.VENDOR_NAME,
                    a3.COLOR,
                    a3.SPEC,
                    a3.UNIT,
                    a4.CURR_CD,
                    a4.MATL_PRICE as MASTER_PRICE,
                    '0' as OUTFAC_QTY2,
                    '0' as BAL_QTY,
                    '' as REMARK
                from
                    (
                        select
                            PO_CD,
                            MATL_CD,
                            sum(PO_QTY) as PO_QTY,
                            sum(USE_QTY) as USE_QTY,
                            max(PO_SEQ) as PO_SEQ
                        from
                            ksv_po_mrp
                        where
                            po_cd = '${args.data.PO_CD}'
                            and use_po_type = '1'
                        group by
                            PO_CD,
                            MATL_CD
                    ) K
                    left join (
                        select
                            PO_CD,
                            MATL_CD,
                            sum(PO_QTY) as PO_QTY,
                            sum(USE_QTY) as USE_QTY,
                            max(PO_SEQ) as PO_SEQ
                        from
                            ksv_po_mrp
                        where
                            po_cd = '${args.data.PO_CD}'
                            and order_cd = '${args.data.ORDER_CD}'
                            and use_po_type = '2'
                            and diff_po_type = '5'
                        group by
                            PO_CD,
                            MATL_CD
                    ) K0 on K0.PO_CD = K.PO_CD
                    and k0.MATL_CD = k.MATL_CD
                    left join (
                        select
                            PO_CD,
                            MATL_CD,
                            sum(IN_QTY) as STSIN_IN_QTY,
                            sum(OUT_QTY) as STSIN_OUT_QTY
                        from
                            ksv_stock_in
                        where
                            po_cd = '${args.data.PO_CD}'
                        group by
                            PO_CD,
                            MATL_CD
                    ) K1 on K1.PO_CD = K.PO_CD
                    and k1.MATL_CD = k.MATL_CD
                    left join (
                        select
                            PO_CD,
                            MATL_CD,
                            sum(OUT_QTY) as STSOUT_OUT_QTY,
                            sum(ERR_QTY) as ERR_QTY
                        from
                            ksv_stock_out
                        where
                            po_cd = '${args.data.PO_CD}'
                        group by
                            PO_CD,
                            MATL_CD
                    ) K2 on K2.PO_CD = K.PO_CD
                    and k2.MATL_CD = k.MATL_CD
                    left join (
                        select
                            PO_CD,
                            MATL_CD,
                            sum(IN_QTY) as FACIN_IN_QTY
                            -- from ksv_stock_facin_order
                        from
                            ksv_stock_facin
                        where
                            po_cd = '${args.data.PO_CD}'
                        group by
                            PO_CD,
                            MATL_CD
                    ) K3 on K3.PO_CD = K.PO_CD
                    and k3.MATL_CD = k.MATL_CD
                    left join (
                        select
                            PO_CD,
                            MATL_CD,
                            sum(OUT_QTY) as FACOUT_OUT_QTY
                        from
                            ksv_stock_facout
                        where
                            po_cd = '${args.data.PO_CD}'
                        group by
                            PO_CD,
                            MATL_CD
                    ) K4 on K4.PO_CD = K.PO_CD
                    and k4.MATL_CD = k.MATL_CD
                    left join (
                        select
                            PO_CD,
                            MATL_CD,
                            sum(OUT_QTY) as FACOUT_OUT_QTY
                        from
                            ksv_stock_facout
                        where
                            po_cd = '${args.data.PO_CD}'
                            and remark like 'main%'
                        group by
                            PO_CD,
                            MATL_CD
                    ) K4_main on K4_main.PO_CD = K.PO_CD
                    and k4_main.MATL_CD = k.MATL_CD
                    left join (
                        select
                            PO_CD,
                            MATL_CD,
                            sum(OUT_QTY) as FACOUT_OUT_QTY
                        from
                            ksv_stock_facout
                        where
                            po_cd = '${args.data.PO_CD}'
                            and (
                                remark like 'sample%'
                                or remark like 'm_up%'
                                or remark like 'test%'
                            )
                        group by
                            PO_CD,
                            MATL_CD
                    ) K4_other on K4_other.PO_CD = K.PO_CD
                    and k4_other.MATL_CD = k.MATL_CD
                    left join (
                        select
                            PO_CD,
                            MATL_CD,
                            sum(OUT_QTY) as FACOUT_OUT_QTY
                        from
                            ksv_stock_facout
                        where
                            po_cd = '${args.data.PO_CD}'
                            and (remark like 'keep_stock%')
                        group by
                            PO_CD,
                            MATL_CD
                    ) K4_keep_stock on K4_keep_stock.PO_CD = K.PO_CD
                    and k4_keep_stock.MATL_CD = k.MATL_CD
                    left join (
                        select
                            PO_CD,
                            MATL_CD,
                            sum(OUT_QTY) as FACOUT_OUT_QTY
                        from
                            ksv_stock_facout
                        where
                            po_cd = '${args.data.PO_CD}'
                            and (remark like 'lost%')
                        group by
                            PO_CD,
                            MATL_CD
                    ) K4_lost on K4_lost.PO_CD = K.PO_CD
                    and k4_lost.MATL_CD = k.MATL_CD
                    left join (
                        select
                            PO_CD,
                            MATL_CD,
                            sum(etc_qty) as FACOUT_OUT_QTY
                        from
                            ksv_stock_facetc
                        where
                            po_cd = '${args.data.PO_CD}'
                            and etc_type = 'Error'
                        group by
                            PO_CD,
                            MATL_CD
                    ) K4_defect on K4_defect.PO_CD = K.PO_CD
                    and k4_defect.MATL_CD = k.MATL_CD
                    left join (
                        select
                            PO_CD,
                            MATL_CD,
                            sum(OUT_QTY) as FACOUT_OUT_QTY
                        from
                            ksv_stock_facout
                        where
                            po_cd = '${args.data.PO_CD}'
                            and (remark like 'table_shortage%')
                        group by
                            PO_CD,
                            MATL_CD
                    ) K4_shortage on K4_shortage.PO_CD = K.PO_CD
                    and k4_shortage.MATL_CD = k.MATL_CD,
                    kcd_matl_mst a3,
                    kcd_matl_mem a4,
                    kcd_vendor a5
                where
                    K.MATL_CD = a3.matl_cd
                    -- and   K.PO_QTY > 0
                    and K.MATL_CD = a4.matl_cd
                    and a4.matl_seq = (
                        select
                            max(matl_seq)
                        from
                            kcd_matl_mem
                        where
                            matl_cd = K.matl_cd
                    )
                    and a3.VENDOR_CD = a5.VENDOR_CD
                    and a5.VENDOR_NAME like '%${args.data.VENDOR_CD}%'
                    and a3.MATL_NAME like '%${args.data.DESCRIPTION}%'
                    and a3.MATL_CD like '%${args.data.MATL_CD}%'
                    and a3.SPEC like '%${args.data.SPEC}%'
                    and a3.COLOR like '%${args.data.COLOR}%'
                    and a3.UNIT like '%${args.data.UNIT}%'
                order by
                    K.MATL_CD
            `;

            var tRet = [];
            var tRet_PO = [];
            var tRet_ORDER = [];

            if (args.data.PO_CD && args.data.ORDER_CD) {
                tRet_PO = await prisma.$queryRaw(Prisma.raw(sqlStr_po));
                tRet_ORDER = await prisma.$queryRaw(Prisma.raw(sqlStr_order));
                tRet_PO.forEach((col, i) => {
                    tRet_ORDER.forEach((col1, i1) => {
                        if (col.MATL_CD === col1.MATL_CD) {
                            var tRate =
                                parseFloat(col1.MRP_QTY) /
                                parseFloat(col.MRP_QTY);
                            var tInFacQty = parseFloat(col.INFAC_QTY) * tRate;
                            tInFacQty = AFLib.getFloat(tInFacQty, 0);
                            var tObj2 = { ...col1 };
                            tObj2.INFAC_QTY = tInFacQty;
                            // console.log(`IN FAC QtY:${col.MRP_QTY}/${col1.MRP_QTY}/${tRate}/${col.INFAC_QTY}/${tInFacQty}`);
                            tRet.push(tObj2);
                        }
                    });
                });
            } else if (args.data.PO_CD && !args.data.ORDER_CD) {
                tRet_PO = await prisma.$queryRaw(Prisma.raw(sqlStr_po));
                tRet = [...tRet_PO];
            } else {
                return [];
            }

            // const reasons = ['STORAGE', 'LOST', 'RETURN'];
            const reasons = ['RETURN'];
            const reasonMaps = {};
            for (const reason of reasons) {
                const rows = await prisma.$queryRaw(
                    Prisma.raw(`
                        select
                            a.matl_cd,
                            a.reason_make,
                            sum(stock_qty) as s_qty
                        from
                            ksv_stock_matl a,
                            kcd_matl_mst b,
                            kcd_vendor c
                        where
                            a.po_cd = '${args.data.PO_CD}'
                            and a.order_cd like '%${args.data.ORDER_CD}%'
                            and a.matl_cd = b.matl_cd
                            and b.vendor_cd = c.vendor_cd
                            and c.VENDOR_NAME like '%${args.data.VENDOR_CD}%'
                            and b.MATL_NAME like '%${args.data.DESCRIPTION}%'
                            and b.MATL_CD like '%${args.data.MATL_CD}%'
                            and b.SPEC like '%${args.data.SPEC}%'
                            and b.COLOR like '%${args.data.COLOR}%'
                            and b.UNIT like '%${args.data.UNIT}%'
                            and a.reason_make = '${reason}'
                        group by
                            a.matl_cd,
                            a.reason_make
                    `),
                );
                const map = new Map();
                rows.forEach((row) => {
                    const key = `${row.matl_cd}_${row.reason_make}`;
                    map.set(key, row.s_qty);
                });
                reasonMaps[reason] = map;
            }

            /*
        const tRet10 = await prisma.$queryRaw(Prisma.raw(`
            select
                a.facout_cd,
                a.out_date,
                a.remark,
                isnull(sum(out_qty), 0) as out_qty
            from
                ksv_stock_facout a,
                kcd_matl_mst b,
                kcd_vendor c
            where
                a.po_cd = '${args.data.PO_CD}'
                and a.order_cd like '%${args.data.ORDER_CD}%'
                and a.matl_cd = b.matl_cd
                and b.vendor_cd = c.vendor_cd
                and c.VENDOR_NAME like '%${args.data.VENDOR_CD}%'
                and b.MATL_NAME like '%${args.data.DESCRIPTION}%'
                and b.MATL_CD like '%${args.data.MATL_CD}%'
                and b.SPEC like '%${args.data.SPEC}%'
                and b.COLOR like '%${args.data.COLOR}%'
                and b.UNIT like '%${args.data.UNIT}%'
            group by
                a.facout_cd,
                a.out_date,
                a.remark
            order by
                a.out_date
        `));
*/
            const tRet10 = await prisma.$queryRaw(
                Prisma.raw(`
                    select
                        a.out_date,
                        a.po_cd,
                        a.matl_cd,
                        a.remark,
                        isnull(sum(out_qty), 0) as out_qty
                    from
                        ksv_stock_facout a,
                        kcd_matl_mst b,
                        kcd_vendor c
                    where
                        a.po_cd = '${args.data.PO_CD}'
                        and a.order_cd like '%${args.data.ORDER_CD}%'
                        and a.matl_cd = b.matl_cd
                        and b.vendor_cd = c.vendor_cd
                        and c.VENDOR_NAME like '%${args.data.VENDOR_CD}%'
                        and b.MATL_NAME like '%${args.data.DESCRIPTION}%'
                        and b.MATL_CD like '%${args.data.MATL_CD}%'
                        and b.SPEC like '%${args.data.SPEC}%'
                        and b.COLOR like '%${args.data.COLOR}%'
                        and b.UNIT like '%${args.data.UNIT}%'
                    group by
                        a.out_date,
                        a.po_cd,
                        a.matl_cd,
                        a.remark
                    order by
                        a.out_date,
                        a.po_cd,
                        a.matl_cd
                `),
            );

            const tRetArray = [];
            for (let t of tRet) {
                const key = `${t.MATL_CD}`;
                const tObj = { ...t };

                tObj.SHORT_QTY = '0';

                var tLineReturnQty = 0;
                for (const reason of reasons) {
                    const map = reasonMaps[reason];
                    var tKey1 = `${t.MATL_CD}_${reason}`;
                    const qty = map.has(tKey1) ? map.get(tKey1) : 0;
                    if (reason === 'RETURN') {
                        tLineReturnQty = parseFloat(qty);
                    }
                }

                tLineReturnQty = parseFloat(tLineReturnQty.toFixed(2));
                tObj.LINE_RETURN_QTY = tLineReturnQty;

                var tShipQty = parseFloat(tObj.OUT_QTY) + parseFloat(tObj.ERROR_QTY);
                tShipQty = parseFloat(tShipQty.toFixed(2));
                tObj.SHIP_QTY = tShipQty;

                var tFacInQty = parseFloat(tShipQty) + parseFloat(tObj.STOCK_QTY);
                tFacInQty = parseFloat(tFacInQty.toFixed(2));
                tObj.FAC_IN_QTY = tFacInQty;

                var tFacOutQty =
                    parseFloat(tObj.SHORT_QTY) +
                    parseFloat(tObj.DEFECT_QTY) +
                    parseFloat(tObj.MAIN_USE_QTY) +
                    parseFloat(tObj.OTHER_USE_QTY) +
                    parseFloat(tObj.TABLE_SHORT_QTY) +
                    parseFloat(tObj.KEEP_STOCK_QTY) +
                    parseFloat(tObj.LOST_QTY) -
                    parseFloat(tObj.LINE_RETURN_QTY);
                tFacOutQty = parseFloat(tFacOutQty.toFixed(2));
                tObj.FAC_OUT_QTY = tFacOutQty;

                if (
                    parseFloat(tObj.FAC_OUT_QTY) <
                    parseFloat(tObj.FAC_OUT_QTY_TOT)
                ) {
                    var tMainUseQty = parseFloat(tObj.MAIN_USE_QTY);
                    var tDiff =
                        parseFloat(tObj.FAC_OUT_QTY_TOT) -
                        parseFloat(tObj.FAC_OUT_QTY);
                    tMainUseQty += tDiff;
                    tObj.MAIN_USE_QTY = parseFloat(tMainUseQty);
                    tObj.FAC_OUT_QTY = parseFloat(tObj.FAC_OUT_QTY_TOT);
                }

                var tRemainAQty =
                    parseFloat(tObj.FAC_IN_QTY) - parseFloat(tObj.FAC_OUT_QTY);
                if (tRemainAQty < 0) {
                    // RemainA가 < 0인 경우 마이너스 부분은 Short Qty로 처리하고, FacIn Qty에 더함
                    var tFacInQty = parseFloat(tObj.FAC_IN_QTY) + (-1) * parseFloat(tRemainAQty); 
                    tObj.FAC_IN_QTY = tFacInQty.toFixed(2);
                    tObj.SHORT_QTY = tRemainAQty.toFixed(2);
                    tRemainAQty = 0;
                }
                tRemainAQty = parseFloat(tRemainAQty.toFixed(2));
                tObj.REMAIN_A_QTY = tRemainAQty;

                var tRemainEQty =
                    parseFloat(tObj.FAC_IN_QTY) -
                    parseFloat(tObj.SHORT_QTY) -
                    parseFloat(tObj.ERROR_QTY) -
                    parseFloat(tObj.MRP_QTY) -
                    parseFloat(tObj.OTHER_USE_QTY) -
                    parseFloat(tObj.KEEP_STOCK_QTY) -
                    parseFloat(tObj.LOST_QTY);
                tRemainEQty = parseFloat(tRemainEQty.toFixed(2));
                tObj.REMAIN_E_QTY = tRemainEQty;

                //
                var tOutQty =
                    parseFloat(tObj.MRP_QTY) - parseFloat(tObj.MAIN_USE_QTY);
                if (tRemainAQty <= 0) tOutQty = 0;
                tObj.OUT_QTY = tOutQty;

                if (parseFloat(tFacOutQty) > 0) {
                    var tmpArray = [];
                    tRet10.forEach((col10, i10) => {
                        var tObj10 = { ...col10 };
                        if (
                            tObj10.po_cd === t.PO_CD &&
                            tObj10.matl_cd === t.MATL_CD
                        ) {
                            tObj10.OUT_QTY = tObj10.out_qty;
                            tObj10.OUT_NAME = `${tObj10.out_date}/${tObj10.remark}`;
                            tmpArray.push(tObj10);
                        }
                    });
                    tObj.FACOUT_ARRAY = [...tmpArray];

                    /*
                tObj.FACOUT_ARRAY = tRet10.map(base => {
                    // const k = `${base.facout_cd}_${base.out_date}_${base.remark}_${t.MATL_CD}`;
                    const k = `${base.out_date}_${base.remark}_${base.matl_cd}`;
                    return {
                        ...base,
                        OUT_QTY: `${base.out_qty}`,
                        OUT_NAME: `${base.out_date}/${base.remark}`
                    };
                });
                */
                } else {
                    tObj.FACOUT_ARRAY = [];
                }
                tRetArray.push(tObj);
            }

            return tRetArray;
        },

        mgrQueryS0520_2_bak: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }
            let sqlStr = `
                select
                    k.*,
                    a3.MATL_NAME,
                    a5.VENDOR_NAME,
                    a3.COLOR,
                    a3.SPEC,
                    a3.UNIT,
                    a4.CURR_CD,
                    a4.MATL_PRICE as MASTER_PRICE,
                    '0' as OUTFAC_QTY2,
                    '' as REMARK
                from
                    (
                        select
                            a.PO_CD,
                            a.ORDER_CD,
                            a.VENDOR_CD,
                            a.MATL_CD,
                            isnull(a.pu_cd, '') as PU_CD,
                            isnull(a.po_qty2, 0) as PO_QTY2,
                            sum(isnull(a.in_qty, 0)) as IN_QTY,
                            sum(isnull(a.out_qty, 0)) as OUT_QTY,
                            sum(isnull(a.infac_qty, 0)) as INFAC_QTY,
                            sum(isnull(a.outfac_qty, 0)) as OUTFAC_QTY,
                            sum(a.PO_QTY) as PO_QTY,
                            max(a.PO_SEQ) as PO_SEQ
                        from
                            ksv_stock_mem a
                        where
                            a.po_cd like '%${args.data.PO_CD}%'
                            and a.order_cd like '%${args.data.ORDER_CD}%'
                        group by
                            a.PO_Cd,
                            a.ORDER_CD,
                            a.VENDOR_CD,
                            a.MATL_CD,
                            a.PU_CD,
                            a.PO_QTY2
                    ) k,
                    kcd_matL_mst a3,
                    kcd_matl_mem a4,
                    kcd_vendor a5
                where
                    k.MATL_CD = a3.matl_cd
                    -- and   a3.matl_name like '%${args.data.MATL_CD}%'
                    and k.MATL_CD = a4.matl_cd
                    and k.VENDOR_CD = a5.vendor_cd
                    and a4.matl_seq = (
                        select
                            max(matl_seq)
                        from
                            kcd_matl_mem
                        where
                            matl_cd = k.matl_cd
                    )
                    -- and  (k.INFAC_QTY - k.OUTFAC_QTY) > 0
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                PO_CD: '',
                VENDOR_CD: '',
                MATL_CD: '',
                PU_CD: '',
                PO_QTY2: 0,
                IN_QTY: 0,
                OUT_QTY: 0,
                INFAC_QTY: 0,
                OUTFAC_QTY: 0,
                PO_QTY: 0,
                PO_SEQ: 0,
                MATL_NAME: '',
                COLOR: '',
                SPEC: '',
                UNIT: '',
                CURR_CD: '',
                MASTER_PRICE: 0,
                ETC99: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },

        mgrQueryS0520_2_0: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }
            let sqlStr = `
                select
                    k.*,
                    a3.MATL_NAME,
                    a5.VENDOR_NAME,
                    a3.COLOR,
                    a3.SPEC,
                    a3.UNIT,
                    a4.CURR_CD,
                    a4.MATL_PRICE as MASTER_PRICE,
                    '0' as OUTFAC_QTY2,
                    '' as REMARK
                from
                    (
                        select
                            a.PO_CD,
                            a.VENDOR_CD,
                            a.MATL_CD,
                            isnull(b.pu_cd, '') as PU_CD,
                            isnull(b.po_qty2, 0) as PO_QTY2,
                            isnull(b.in_qty, 0) as IN_QTY,
                            isnull(b.out_qty, 0) as OUT_QTY,
                            isnull(b.infac_qty, 0) as INFAC_QTY,
                            isnull(b.outfac_qty, 0) as OUTFAC_QTY,
                            sum(a.po_qty) as PO_QTY,
                            max(a.po_seq) as PO_SEQ
                        from
                            ksv_stock_mem a
                            left join ksv_stock_mem2 b on a.PO_CD = b.PO_CD
                            and a.VENDOR_CD = b.VENDOR_CD
                            and a.MATL_CD = b.MATL_CD
                        where
                            a.po_cd = '${args.data.PO_CD}'
                        group by
                            a.po_cd,
                            a.vendor_cd,
                            a.matl_cd,
                            b.pu_cd,
                            b.po_qty2,
                            b.in_qty,
                            b.out_qty,
                            b.infac_qty,
                            b.outfac_qty
                    ) k,
                    kcd_matL_mst a3,
                    kcd_matl_mem a4,
                    kcd_vendor a5
                where
                    k.matl_cd = a3.matl_cd
                    and k.matl_cd = a4.matl_cd
                    and k.vendor_cd = a5.vendor_cd
                    and a4.matl_seq = (
                        select
                            max(matl_seq)
                        from
                            kcd_matl_mem
                        where
                            matl_cd = k.matl_cd
                    )
                    and (INFAC_QTY - OUTFAC_QTY) > 0
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                PO_CD: '',
                VENDOR_CD: '',
                MATL_CD: '',
                PU_CD: '',
                PO_QTY2: 0,
                IN_QTY: 0,
                OUT_QTY: 0,
                INFAC_QTY: 0,
                OUTFAC_QTY: 0,
                PO_QTY: 0,
                PO_SEQ: 0,
                MATL_NAME: '',
                COLOR: '',
                SPEC: '',
                UNIT: '',
                CURR_CD: '',
                MASTER_PRICE: 0,
                ETC99: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },

        mgrQueryS0520_2_0323: async (_, args) => {
            var tSQL = '';

            let sqlStr_order = `
                select
                    K.PO_CD,
                    K.ORDER_CD,
                    K.MATL_CD,
                    '' as PU_CD,
                    0 as PO_QTY2,
                    K.PO_QTY,
                    K.PO_QTY as MRP_QTY,
                    K.PO_SEQ,
                    isnull(K1.STSIN_IN_QTY, 0) as IN_QTY,
                    isnull(K2.STSOUT_OUT_QTY, 0) as OUT_QTY,
                    isnull(K3.FACIN_IN_QTY, 0) as INFAC_QTY,
                    isnull(K4.FACOUT_OUT_QTY, 0) as OUTFAC_QTY,
                    a3.MATL_NAME,
                    a5.VENDOR_NAME,
                    a3.COLOR,
                    a3.SPEC,
                    a3.UNIT,
                    a4.CURR_CD,
                    a4.MATL_PRICE as MASTER_PRICE,
                    '0' as OUTFAC_QTY2,
                    '0' as BAL_QTY,
                    '' as REMARK
                from
                    (
                        select
                            PO_CD,
                            ORDER_CD,
                            MATL_CD,
                            sum(PO_QTY) as PO_QTY,
                            max(PO_SEQ) as PO_SEQ
                        from
                            ksv_po_mrp
                        where
                            po_cd = '${args.data.PO_CD}'
                            and order_cd = '${args.data.ORDER_CD}'
                        group by
                            PO_CD,
                            ORDER_CD,
                            MATL_CD
                    ) K
                    left join (
                        select
                            PO_CD,
                            ORDER_CD,
                            MATL_CD,
                            sum(IN_QTY) as STSIN_IN_QTY,
                            sum(OUT_QTY) as STSIN_OUT_QTY
                        from
                            ksv_stock_in
                        where
                            po_cd = '${args.data.PO_CD}'
                            and order_cd = '${args.data.ORDER_CD}'
                        group by
                            PO_CD,
                            ORDER_CD,
                            MATL_CD
                    ) K1 on K1.PO_CD = K.PO_CD
                    and k1.ORDER_CD = k.ORDER_CD
                    and k1.MATL_CD = k.MATL_CD
                    left join (
                        select
                            PO_CD,
                            ORDER_CD,
                            MATL_CD,
                            sum(OUT_QTY) as STSOUT_OUT_QTY
                        from
                            ksv_stock_out
                        where
                            po_cd = '${args.data.PO_CD}'
                            and order_cd = '${args.data.ORDER_CD}'
                        group by
                            PO_CD,
                            ORDER_CD,
                            MATL_CD
                    ) K2 on K2.PO_CD = K.PO_CD
                    and k2.ORDER_CD = k.ORDER_CD
                    and k2.MATL_CD = k.MATL_CD
                    left join (
                        select
                            PO_CD,
                            MATL_CD,
                            sum(IN_QTY) as FACIN_IN_QTY
                            -- from ksv_stock_facin_order
                        from
                            ksv_stock_facin
                        where
                            po_cd = '${args.data.PO_CD}'
                            -- and   order_cd = '${args.data.ORDER_CD}'
                        group by
                            PO_CD,
                            MATL_CD
                    ) K3 on K3.PO_CD = K.PO_CD
                    and k3.MATL_CD = k.MATL_CD
                    left join (
                        select
                            PO_CD,
                            ORDER_CD,
                            MATL_CD,
                            sum(OUT_QTY) as FACOUT_OUT_QTY
                        from
                            ksv_stock_facout
                        where
                            po_cd = '${args.data.PO_CD}'
                            and order_cd = '${args.data.ORDER_CD}'
                        group by
                            PO_CD,
                            ORDER_CD,
                            MATL_CD
                    ) K4 on K4.PO_CD = K.PO_CD
                    and k4.ORDER_CD = k.ORDER_CD
                    and k4.MATL_CD = k.MATL_CD,
                    kcd_matl_mst a3,
                    kcd_matl_mem a4,
                    kcd_vendor a5
                where
                    K.MATL_CD = a3.matl_cd
                    and K.PO_QTY > 0
                    and K.MATL_CD = a4.matl_cd
                    and a4.matl_seq = (
                        select
                            max(matl_seq)
                        from
                            kcd_matl_mem
                        where
                            matl_cd = K.matl_cd
                    )
                    and a3.VENDOR_CD = a5.VENDOR_CD
                    and a5.VENDOR_NAME like '%${args.data.VENDOR_CD}%'
                    and a3.MATL_NAME like '%${args.data.DESCRIPTION}%'
                    and a3.MATL_CD like '%${args.data.MATL_CD}%'
                    and a3.SPEC like '%${args.data.SPEC}%'
                    and a3.COLOR like '%${args.data.COLOR}%'
                    and a3.UNIT like '%${args.data.UNIT}%'
                order by
                    k.MATL_CD
            `;

            let sqlStr_po = `
                select
                    K.PO_CD,
                    '' as ORDER_CD,
                    K.MATL_CD,
                    '' as PU_CD,
                    0 as PO_QTY2,
                    K.PO_QTY,
                    K.PO_QTY as MRP_QTY,
                    K.PO_SEQ,
                    isnull(K1.STSIN_IN_QTY, 0) as IN_QTY,
                    isnull(K2.STSOUT_OUT_QTY, 0) as OUT_QTY,
                    isnull(K3.FACIN_IN_QTY, 0) as INFAC_QTY,
                    isnull(K4.FACOUT_OUT_QTY, 0) as OUTFAC_QTY,
                    a3.MATL_NAME,
                    a5.VENDOR_NAME,
                    a3.COLOR,
                    a3.SPEC,
                    a3.UNIT,
                    a4.CURR_CD,
                    a4.MATL_PRICE as MASTER_PRICE,
                    '0' as OUTFAC_QTY2,
                    '0' as BAL_QTY,
                    '' as REMARK
                from
                    (
                        select
                            PO_CD,
                            MATL_CD,
                            sum(PO_QTY) as PO_QTY,
                            max(PO_SEQ) as PO_SEQ
                        from
                            ksv_po_mrp
                        where
                            po_cd = '${args.data.PO_CD}'
                        group by
                            PO_CD,
                            MATL_CD
                    ) K
                    left join (
                        select
                            PO_CD,
                            MATL_CD,
                            sum(IN_QTY) as STSIN_IN_QTY,
                            sum(OUT_QTY) as STSIN_OUT_QTY
                        from
                            ksv_stock_in
                        where
                            po_cd = '${args.data.PO_CD}'
                        group by
                            PO_CD,
                            MATL_CD
                    ) K1 on K1.PO_CD = K.PO_CD
                    and k1.MATL_CD = k.MATL_CD
                    left join (
                        select
                            PO_CD,
                            MATL_CD,
                            sum(OUT_QTY) as STSOUT_OUT_QTY
                        from
                            ksv_stock_out
                        where
                            po_cd = '${args.data.PO_CD}'
                        group by
                            PO_CD,
                            MATL_CD
                    ) K2 on K2.PO_CD = K.PO_CD
                    and k2.MATL_CD = k.MATL_CD
                    left join (
                        select
                            PO_CD,
                            MATL_CD,
                            sum(IN_QTY) as FACIN_IN_QTY
                            -- from ksv_stock_facin_order
                        from
                            ksv_stock_facin
                        where
                            po_cd = '${args.data.PO_CD}'
                        group by
                            PO_CD,
                            MATL_CD
                    ) K3 on K3.PO_CD = K.PO_CD
                    and k3.MATL_CD = k.MATL_CD
                    left join (
                        select
                            PO_CD,
                            MATL_CD,
                            sum(OUT_QTY) as FACOUT_OUT_QTY
                        from
                            ksv_stock_facout
                        where
                            po_cd = '${args.data.PO_CD}'
                        group by
                            PO_CD,
                            MATL_CD
                    ) K4 on K4.PO_CD = K.PO_CD
                    and k4.MATL_CD = k.MATL_CD,
                    kcd_matl_mst a3,
                    kcd_matl_mem a4,
                    kcd_vendor a5
                where
                    K.MATL_CD = a3.matl_cd
                    and K.PO_QTY > 0
                    and K.MATL_CD = a4.matl_cd
                    and a4.matl_seq = (
                        select
                            max(matl_seq)
                        from
                            kcd_matl_mem
                        where
                            matl_cd = K.matl_cd
                    )
                    and a3.VENDOR_CD = a5.VENDOR_CD
                    and a5.VENDOR_NAME like '%${args.data.VENDOR_CD}%'
                    and a3.MATL_NAME like '%${args.data.DESCRIPTION}%'
                    and a3.MATL_CD like '%${args.data.MATL_CD}%'
                    and a3.SPEC like '%${args.data.SPEC}%'
                    and a3.COLOR like '%${args.data.COLOR}%'
                    and a3.UNIT like '%${args.data.UNIT}%'
                order by
                    K.MATL_CD
            `;

            var tRet = [];
            var tRet_PO = [];
            var tRet_ORDER = [];

            if (args.data.PO_CD && args.data.ORDER_CD) {
                tRet_PO = await prisma.$queryRaw(Prisma.raw(sqlStr_po));
                tRet_ORDER = await prisma.$queryRaw(Prisma.raw(sqlStr_order));
                tRet_PO.forEach((col, i) => {
                    tRet_ORDER.forEach((col1, i1) => {
                        if (col.MATL_CD === col1.MATL_CD) {
                            var tRate =
                                parseFloat(col1.MRP_QTY) /
                                parseFloat(col.MRP_QTY);
                            var tInFacQty = parseFloat(col.INFAC_QTY) * tRate;
                            tInFacQty = AFLib.getFloat(tInFacQty, 0);
                            var tObj2 = { ...col1 };
                            tObj2.INFAC_QTY = tInFacQty;
                            // console.log(`IN FAC QtY:${col.MRP_QTY}/${col1.MRP_QTY}/${tRate}/${col.INFAC_QTY}/${tInFacQty}`);
                            tRet.push(tObj2);
                        }
                    });
                });
            } else if (args.data.PO_CD && !args.data.ORDER_CD) {
                tRet_PO = await prisma.$queryRaw(Prisma.raw(sqlStr_po));
                tRet = [...tRet_PO];
            } else {
                return [];
            }

            /*
        if (args.data.PO_CD !== '' && args.data.ORDER_CD !== '') {
            tRet = await prisma.$queryRaw(Prisma.raw(sqlStr_order));
        } else if (args.data.PO_CD !== '' && args.data.ORDER_CD === '') {
            tRet = await prisma.$queryRaw(Prisma.raw(sqlStr_po));
        } else {
            return [];
        }
        */

            /*
        let sql_order_total = `
            select
                order_cd,
                tot_cnt
            from
                ksv_order_mst
            where
                order_cd in (
                    select distinct
                        order_cd
                    from
                        ksv_po_mem
                    where
                        po_cd = '${args.data.PO_CD}'
                        and len(order_cd) = 10
                )
        `;
        var tRet_order_total = await prisma.$queryRaw(Prisma.raw(sql_order_total));
        var tOrderTotal = 0; 
        var tOrderCnt = 0; 
        tRet_order_total.forEach((col, i) => {
            tOrderTotal += parseFloat(col.tot_cnt);
            if (col.order_cd === args.data.ORDER_CD) tOrderCnt = parseFloat(col.tot_cnt);
        });
        var tOrderRate = tOrderCnt / tOrderTotal;
        console.log(`Order Rate:  ${tOrderTotal}/${tOrderCnt}/${tOrderRate}`);
        */

            const keyList = tRet.map((row) => ({
                po_cd: row.PO_CD,
                order_cd: row.ORDER_CD,
                matl_cd: row.MATL_CD,
            }));
            const keyTuples = keyList
                .map((k) => `('${k.po_cd}', '${k.order_cd}', '${k.matl_cd}')`)
                .join(',');

            const tRet10 = await prisma.$queryRaw(
                Prisma.raw(`
                    select
                        a.facout_cd,
                        a.out_date,
                        a.remark
                    from
                        ksv_stock_facout a,
                        kcd_matl_mst b,
                        kcd_vendor c
                    where
                        a.po_cd = '${args.data.PO_CD}'
                        and a.order_cd like '%${args.data.ORDER_CD}%'
                        and a.matl_cd = b.matl_cd
                        and b.vendor_cd = c.vendor_cd
                        and c.VENDOR_NAME like '%${args.data.VENDOR_CD}%'
                        and b.MATL_NAME like '%${args.data.DESCRIPTION}%'
                        and b.MATL_CD like '%${args.data.MATL_CD}%'
                        and b.SPEC like '%${args.data.SPEC}%'
                        and b.COLOR like '%${args.data.COLOR}%'
                        and b.UNIT like '%${args.data.UNIT}%'
                    group by
                        a.facout_cd,
                        a.out_date,
                        a.remark
                    order by
                        a.out_date
                `),
            );

            const facoutDetailRows = await prisma.$queryRaw(
                Prisma.raw(`
                    select
                        a.facout_cd,
                        a.out_date,
                        a.remark,
                        a.matl_cd,
                        sum(out_qty) as out_qty
                    from
                        ksv_stock_facout a,
                        kcd_matl_mst b,
                        kcd_vendor c
                    where
                        a.po_cd = '${args.data.PO_CD}'
                        and a.order_cd like '%${args.data.ORDER_CD}%'
                        and a.matl_cd = b.matl_cd
                        and b.vendor_cd = c.vendor_cd
                        and c.VENDOR_NAME like '%${args.data.VENDOR_CD}%'
                        and b.MATL_NAME like '%${args.data.DESCRIPTION}%'
                        and b.MATL_CD like '%${args.data.MATL_CD}%'
                        and b.SPEC like '%${args.data.SPEC}%'
                        and b.COLOR like '%${args.data.COLOR}%'
                        and b.UNIT like '%${args.data.UNIT}%'
                    group by
                        a.facout_cd,
                        a.out_date,
                        a.remark,
                        a.matl_cd
                `),
            );

            const facoutMap = new Map();
            facoutDetailRows.forEach((row) => {
                const key = `${row.facout_cd}_${row.out_date}_${row.remark}_${row.matl_cd}`;
                facoutMap.set(key, row.out_qty);
            });

            const lineOutRows = await prisma.$queryRaw(
                Prisma.raw(`
                    select
                        a.matl_cd,
                        sum(out_qty) as s_qty
                    from
                        ksv_stock_facout a,
                        kcd_matl_mst b,
                        kcd_vendor c
                    where
                        a.po_cd = '${args.data.PO_CD}'
                        and a.order_cd like '%${args.data.ORDER_CD}%'
                        and a.matl_cd = b.matl_cd
                        and b.vendor_cd = c.vendor_cd
                        and c.VENDOR_NAME like '%${args.data.VENDOR_CD}%'
                        and b.MATL_NAME like '%${args.data.DESCRIPTION}%'
                        and b.MATL_CD like '%${args.data.MATL_CD}%'
                        and b.SPEC like '%${args.data.SPEC}%'
                        and b.COLOR like '%${args.data.COLOR}%'
                        and b.UNIT like '%${args.data.UNIT}%'
                        and (a.remark like 'main%')
                    group by
                        a.matl_cd
                `),
            );
            const lineOutMap = new Map();
            lineOutRows.forEach((row) => {
                const key = `${row.matl_cd}`;
                lineOutMap.set(key, row.s_qty);
            });

            const otherRows = await prisma.$queryRaw(
                Prisma.raw(`
                    select
                        a.matl_cd,
                        sum(out_qty) as s_qty
                    from
                        ksv_stock_facout a,
                        kcd_matl_mst b,
                        kcd_vendor c
                    where
                        a.po_cd = '${args.data.PO_CD}'
                        and a.order_cd like '%${args.data.ORDER_CD}%'
                        and a.matl_cd = b.matl_cd
                        and b.vendor_cd = c.vendor_cd
                        and c.VENDOR_NAME like '%${args.data.VENDOR_CD}%'
                        and b.MATL_NAME like '%${args.data.DESCRIPTION}%'
                        and b.MATL_CD like '%${args.data.MATL_CD}%'
                        and b.SPEC like '%${args.data.SPEC}%'
                        and b.COLOR like '%${args.data.COLOR}%'
                        and b.UNIT like '%${args.data.UNIT}%'
                        and (
                            a.remark like 'sample%'
                            or a.remark like 'm_up%'
                            or a.remark like 'test%'
                        )
                    group by
                        a.matl_cd
                `),
            );

            const otherMap = new Map();
            otherRows.forEach((row) => {
                const key = `${row.matl_cd}`;
                otherMap.set(key, row.s_qty);
            });

            const reasons = ['STORAGE', 'LOST', 'RETURN'];
            const reasonMaps = {};
            for (const reason of reasons) {
                const rows = await prisma.$queryRaw(
                    Prisma.raw(`
                        select
                            a.matl_cd,
                            a.reason_make,
                            sum(stock_qty) as s_qty
                        from
                            ksv_stock_matl a,
                            kcd_matl_mst b,
                            kcd_vendor c
                        where
                            a.po_cd = '${args.data.PO_CD}'
                            and a.order_cd like '%${args.data.ORDER_CD}%'
                            and a.matl_cd = b.matl_cd
                            and b.vendor_cd = c.vendor_cd
                            and c.VENDOR_NAME like '%${args.data.VENDOR_CD}%'
                            and b.MATL_NAME like '%${args.data.DESCRIPTION}%'
                            and b.MATL_CD like '%${args.data.MATL_CD}%'
                            and b.SPEC like '%${args.data.SPEC}%'
                            and b.COLOR like '%${args.data.COLOR}%'
                            and b.UNIT like '%${args.data.UNIT}%'
                            and a.reason_make = '${reason}'
                        group by
                            a.matl_cd,
                            a.reason_make
                    `),
                );
                const map = new Map();
                rows.forEach((row) => {
                    const key = `${row.matl_cd}_${row.reason_make}`;
                    map.set(key, row.s_qty);
                });
                reasonMaps[reason] = map;
            }

            const tRetArray = [];
            for (let t of tRet) {
                const key = `${t.MATL_CD}`;
                const tObj = { ...t };
                tObj.RETURN_QTY = '0';
                tObj.LINEOUT_QTY = '0';
                tObj.OTHEROUT_QTY = '0';
                tObj.LOST_QTY = '0';
                tObj.STOCK_QTY = '0';
                tObj.FACOUT_ARRAY = [];

                var tInFacQty = parseFloat(t.INFAC_QTY);
                var tOutFacQty = parseFloat(t.OUTFAC_QTY);

                if (tOutFacQty > 0) {
                    tObj.FACOUT_ARRAY = tRet10.map((base) => {
                        const k = `${base.facout_cd}_${base.out_date}_${base.remark}_${t.MATL_CD}`;
                        return {
                            ...base,
                            OUT_QTY: facoutMap.has(k)
                                ? String(facoutMap.get(k))
                                : '0',
                            OUT_NAME: `${base.out_date}/${base.remark}`,
                        };
                    });
                }

                if (lineOutMap.has(key)) {
                    tObj.LINEOUT_QTY = String(lineOutMap.get(key));
                }

                if (otherMap.has(key)) {
                    tObj.OTHEROUT_QTY = String(otherMap.get(key));
                }

                for (const reason of reasons) {
                    const map = reasonMaps[reason];
                    const qty = map.has(key) ? map.get(key) : 0;
                    if (reason === 'STORAGE') tObj.STOCK_QTY = String(qty);
                    if (reason === 'LOST') tObj.LOST_QTY = String(qty);
                    if (reason === 'RETURN') tObj.RETURN_QTY = String(qty);
                }

                const tReturnQty = parseFloat(tObj.RETURN_QTY);
                const tLostQty = parseFloat(tObj.LOST_QTY);
                const tStockQty = parseFloat(tObj.STOCK_QTY);

                // console.log(`${tInFacQty}/${tOutFacQty}/${tLostQty}/${tReturnQty}/${tStockQty}/${tBalQty}`);

                // var tBalQty = tInFacQty - tOutFacQty - tLostQty - tReturnQty - tStockQty;

                tOutFacQty += tReturnQty;
                var tBalQty = tInFacQty - tOutFacQty;
                tObj.BAL_QTY = String(tBalQty);
                tObj.OUTFAC_QTY2 = String(tBalQty);

                tRetArray.push(tObj);
            }

            return tRetArray;
        },
    },
};

export default moduleQuery_S0520_2;
