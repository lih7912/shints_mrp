import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0509_2 = {
    Query: {
        mgrQueryS0509_2: async (_, args) => {
            var tSQL = '';

            let sqlMrpQtyPo = `
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
                            and (use_po_type = '1'
                            or  (use_po_type = '2'  and diff_po_type = '5'))
                        group by
                            PO_CD,
                            MATL_CD
            `;
            var retMrpQtyPo = await prisma.$queryRaw(Prisma.raw(sqlMrpQtyPo));

            let sqlMrpQtyOrder = `
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
                            and (use_po_type = '1'
                            or  (use_po_type = '2'  and diff_po_type = '5'))
                        group by
                            PO_CD,
                            MATL_CD
            `;
            var retMrpQtyOrder = await prisma.$queryRaw(Prisma.raw(sqlMrpQtyOrder));

            var tFacInRate = 0 
            if (tMrpQtyPo > 0) tFacInRate = tMrpQtyOrder / tMrpQtyPo; 

            let sqlStr = `
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
                    isnull(K3.FACIN_IN_QTY, 0)  as INFAC_QTY,
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
                    isnull(K5.RETURN_QTY, 0) as RETURN_QTY,
                    isnull(K5.MATL_CD, '') as RETURN_MATL_CD,
                    '' as REMARK
                from
                    (
                        select
                            a.PO_CD,
                            a.ORDER_CD,
                            a.MATL_CD,
                            sum(PO_QTY) as PO_QTY,
                            max(PO_SEQ) as PO_SEQ
                        from
                            ksv_po_mrp a,
                            ksv_order_mst b
                        where
                            a.po_cd = '${args.data.PO_CD}'
                            and a.order_cd = '${args.data.ORDER_CD}'
                            and a.order_cd = b.order_cd
                            and b.end_production_date is not null
                            and b.end_production_date <> ''
                        group by
                            a.PO_CD,
                            a.ORDER_CD,
                            a.MATL_CD
                    ) K
                    left join ksv_stock_facout_return K5 on K5.po_cd = K.po_cd
                    and k5.order_cd = K.order_cd
                    and k5.matl_cd = k.matl_cd
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
                order by
                    K3.FACIN_IN_QTY desc
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {};

            let sql10 = `
                select
                    facout_cd,
                    out_date,
                    remark,
                    isnull(sum(out_qty), 0) as out_qty
                from
                    ksv_stock_facout
                where
                    po_cd = '${args.data.PO_CD}'
                    and order_cd = '${args.data.ORDER_CD}'
                group by
                    facout_cd,
                    out_date,
                    remark
                order by
                    out_date
            `;
            let tRet10 = await prisma.$queryRaw(Prisma.raw(sql10));

            var tRetArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tObj = { ...tRet[tIdx] };

                var tMrpQtyPo = {};
                retMrpQtyPo.forEach((col1, i1) => {
                    if (col1.PO_CD === tObj.PO_CD && col1.MATL_CD === tObj.MATL_CD) {
                        tMrpQtyPo = parseFloat(col1.USE_QTY);
                    }
                });

                var tMrpQtyOrder = {};
                retMrpQtyOrder.forEach((col1, i1) => {
                    if (col1.PO_CD === tObj.PO_CD && col1.MATL_CD === tObj.MATL_CD) {
                        tMrpQtyOrder = parseFloat(col1.USE_QTY);
                    }
                });

                console.log(`${tMrpQtyPo}/${tMrpQtyOrder}`);

                var tFacInRate = 0 
                if (tMrpQtyPo > 0) tFacInRate = tMrpQtyOrder / tMrpQtyPo; 

                tObj.INFAC_QTY = parseFloat(tObj.INFAC_QTY) * tFacInRate; 
                tObj.INFAC_QTY = parseFloat(tObj.INFAC_QTY).toFixed(0);

                if (tObj.RETURN_MATL_CD === '') tObj.REMARK = 'Waiting';
                else tObj.REMARK = 'Done';

                let sql11 = `
                    select
                        facout_cd,
                        out_date,
                        remark,
                        isnull(sum(out_qty), 0) as out_qty
                    from
                        ksv_stock_facout
                    where
                        po_cd = '${args.data.PO_CD}'
                        and order_cd = '${args.data.ORDER_CD}'
                        and matl_cd = '${tObj.MATL_CD}'
                    group by
                        facout_cd,
                        out_date,
                        remark
                    order by
                        out_date
                `;
                let tRet11 = await prisma.$queryRaw(Prisma.raw(sql11));

                var tFacOutArray = [];
                tRet10.forEach((col, i) => {
                    var tObj = { ...col };
                    tObj.OUT_QTY = '0';
                    tObj.OUT_NAME = `${col.out_date}/${col.remark}`;
                    tRet11.forEach((col1, i1) => {
                        if (
                            col.facout_cd === col1.facout_cd &&
                            col.out_date === col1.out_date &&
                            col.remark === col1.remark
                        )
                            tObj.OUT_QTY = String(col1.out_qty);
                    });
                    tFacOutArray.push(tObj);
                });

                let sql0 = `
                    select
                        isnull(sum(out_qty), 0) as s_qty
                    from
                        ksv_stock_facout
                    where
                        po_cd = '${tObj.PO_CD}'
                        and order_cd = '${tObj.ORDER_CD}'
                        and matl_cd = '${tObj.MATL_CD}'
                        and (
                            remark like 'main%'
                            or remark like 'sample%'
                            or remark like 'm_up%'
                            or remark like 'test%'
                        )
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                var tLineQty = 0;
                if (tRet0.length > 0) {
                    tLineQty = parseFloat(tRet0[0].s_qty);
                    tObj.LINEOUT_QTY = String(tLineQty);
                }

                sql0 = `
                    select
                        isnull(sum(out_qty), 0) as s_qty
                    from
                        ksv_stock_facout
                    where
                        po_cd = '${tObj.PO_CD}'
                        and order_cd = '${tObj.ORDER_CD}'
                        and matl_cd = '${tObj.MATL_CD}'
                        and (remark like 'storage%')
                `;
                tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                var tStockQty = 0;
                if (tRet0.length > 0) {
                    tStockQty = parseFloat(tRet0[0].s_qty);
                    tObj.STOCK_QTY = String(tStockQty);
                }

                sql0 = `
                    select
                        isnull(sum(out_qty), 0) as s_qty
                    from
                        ksv_stock_facout
                    where
                        po_cd = '${tObj.PO_CD}'
                        and order_cd = '${tObj.ORDER_CD}'
                        and matl_cd = '${tObj.MATL_CD}'
                        and (remark like 'lost%')
                `;
                tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                var tLostQty = 0;
                if (tRet0.length > 0) {
                    tLostQty = parseFloat(tRet0[0].s_qty);
                    tObj.LOST_QTY = String(tLostQty);
                }

                var tInFacQty = parseFloat(tObj.INFAC_QTY);
                var tOutFacQty = parseFloat(tObj.OUTFAC_QTY);
                var tBalQty = tInFacQty - tOutFacQty;
                tObj.BAL_QTY = String(tBalQty);
                tObj.FACOUT_ARRAY = [...tFacOutArray];

                if (args.data.IS_BALANCE === '1') {
                    if (tObj.REMARK === 'Waiting') tRetArray.push(tObj);
                } else {
                    tRetArray.push(tObj);
                }
            }

            console.log(`Rec Count: ${tRet.length}`);
            console.log(`${sqlStr}`);

            return tRetArray;
        },

        mgrQueryS0509_2_bak: async (_, args) => {
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

        mgrQueryS0509_2_0: async (_, args) => {
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
    },
};

export default moduleQuery_S0509_2;
