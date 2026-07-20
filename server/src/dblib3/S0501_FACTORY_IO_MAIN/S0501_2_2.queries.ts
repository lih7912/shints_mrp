import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0501_2_2 = {
    Query: {
        mgrQueryS0501_2_2: async (_, args) => {
            var tWObj = {};

            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }

            let sqlStr = `
                -- SELECT A.ORDER_CD,A.ORDER_CD' ('CONVERT(VARCHAR(100),B.TOT_CNT)') ''MRP Q''TY',A.ORDER_CD' ACTUAL CON''S' 
                SELECT
                    A.ORDER_CD,
                    B.TOT_CNT
                FROM
                    KVW_PO_ORDER A,
                    KSV_ORDER_MST B
                WHERE
                    A.PO_CD = '${args.data.PO_CD}'
                    AND A.ORDER_CD = B.ORDER_CD
                ORDER BY
                    A.ORDER_CD
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWObj.ORDER = tRet;

            let sqlStr = `
                SELECT
                    B.VENDOR_NAME,
                    A.PR_NUM,
                    A.MATL_CD,
                    C.MATL_NAME,
                    C.COLOR,
                    C.SPEC,
                    C.UNIT,
                    D.MATL_PRICE,
                    D.CURR_CD,
                    A.TOT_CNT,
                    A.ORD_CNT,
                    A.REMARK,
                    A.REMARK_BVT,
                    B.VENDOR_TYPE,
                    B.PAY_TERM,
                    (
                        A.EXP_DATE + '/' + A.ETD + '/' + A.ETA + '/' + A.DELIVERY
                    ) AS DATE_INFO
                FROM
                    KSV_PO_MATLLIST A,
                    KCD_VENDOR B,
                    KCD_MATL_MST C,
                    KCD_MATL_MEM D
                WHERE
                    A.PO_CD = '${args.data.PO_CD}'
                    AND A.MATL_CD LIKE '%%'
                    AND B.VENDOR_CD = A.VENDOR_CD
                    AND C.MATL_CD = A.MATL_CD
                    AND C.MATL_NAME LIKE '%%' ESCAPE '['
                    AND C.VENDOR_CD LIKE '%'
                    AND C.COLOR LIKE '%%'
                    AND C.SPEC LIKE '%%'
                    AND C.UNIT LIKE '%'
                    AND D.MATL_CD = A.MATL_CD
                    AND D.MATL_SEQ = (
                        SELECT
                            MAX(MATL_SEQ)
                        FROM
                            KCD_MATL_MEM
                        WHERE
                            MATL_CD = A.MATL_CD
                    )
                ORDER BY
                    B.VENDOR_NAME,
                    LEN(A.PR_NUM),
                    A.PR_NUM
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWObj.DATA1 = tRet;

            let sqlStr = `
                SELECT
                    A.OUT_FROM,
                    '1-1' as PR_NUM,
                    A.MATL_CD,
                    C.MATL_NAME,
                    C.COLOR,
                    C.SPEC,
                    C.UNIT,
                    D.MATL_PRICE,
                    D.CURR_CD,
                    SUM(A.OUT_QTY) as OUT_QTY,
                    SUM(A.OUT_QTY) as OUT_QTY_2,
                    A.REMARK,
                    '' as COL1,
                    '' as COL2,
                    '' as COL3
                FROM
                    KSV_STOCK_OUT A,
                    KCD_MATL_MST C,
                    KCD_MATL_MEM D
                WHERE
                    A.PO_CD = '${args.data.PO_CD}'
                    AND A.MATL_CD LIKE '%%'
                    AND C.MATL_CD = A.MATL_CD
                    AND C.MATL_NAME LIKE '%%' ESCAPE '['
                    AND C.VENDOR_CD LIKE '%'
                    AND C.COLOR LIKE '%%'
                    AND C.SPEC LIKE '%%'
                    AND C.UNIT LIKE '%'
                    AND D.MATL_CD = A.MATL_CD
                    AND D.MATL_SEQ = (
                        SELECT
                            MAX(MATL_SEQ)
                        FROM
                            KCD_MATL_MEM
                        WHERE
                            MATL_CD = A.MATL_CD
                    )
                    AND LEFT(A.OUT_FROM, 5) = 'STOCK'
                GROUP BY
                    A.OUT_FROM,
                    A.MATL_CD,
                    C.MATL_NAME,
                    C.COLOR,
                    C.SPEC,
                    C.UNIT,
                    D.MATL_PRICE,
                    D.CURR_CD,
                    A.REMARK
                ORDER BY
                    A.OUT_FROM
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWObj.DATA2 = tRet;

            let sqlStr = `
                select
                    a.MATL_CD,
                    sum(a.tot_qty) as TOT_QTY
                from
                    ksv_stock_in a
                where
                    a.po_cd = '${args.data.PO_CD}'
                group by
                    a.matl_cd
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWObj.STS_IN = tRet;

            let sqlStr = `
                select
                    a.MATL_CD,
                    sum(a.out_qty) as TOT_QTY
                from
                    ksv_stock_out a
                where
                    a.po_cd = '${args.data.PO_CD}'
                    and left(a.out_from, 5) <> 'stock'
                group by
                    a.matl_cd
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWObj.STS_OUT = tRet;

            let sqlStr = `
                select
                    a.MATL_CD,
                    sum(a.out_qty) as TOT_QTY
                from
                    ksv_stock_out a
                where
                    a.po_cd = '${args.data.PO_CD}'
                    and left(a.out_from, 5) = 'stock'
                group by
                    a.matl_cd
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWObj.STS_OUT_STOCK = tRet;

            let sqlStr = `
                select
                    a.PO_MATL_CD as MATL_CD,
                    sum(a.po_qty) as TOT_QTY
                from
                    ksv_po_mrp a
                where
                    a.po_cd = '${args.data.PO_CD}'
                    and a.use_po_type = '2'
                group by
                    a.po_matl_cd
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWObj.STOCK_USE = tRet;

            let sqlStr = `
                select
                    a.MATL_CD,
                    sum(a.in_qty) as TOT_QTY
                from
                    ksv_stock_facin a
                where
                    a.po_cd = '${args.data.PO_CD}'
                group by
                    a.matl_cd
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWObj.FACIN = tRet;

            let sqlStr = `
                select
                    a.MATL_CD,
                    sum(a.out_qty) as TOT_QTY,
                    a.ORDER_CD
                from
                    ksv_stock_facout a
                where
                    a.po_cd = '${args.data.PO_CD}'
                group by
                    a.matl_cd,
                    a.order_cd
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWObj.FACOUT = tRet;

            let sqlStr = `
                select
                    a.MATL_CD,
                    a.ETC_TYPE,
                    sum(a.etc_qty) as TOT_QTY
                from
                    ksv_stock_facetc a
                where
                    a.po_cd = '${args.data.PO_CD}'
                group by
                    a.matl_cd,
                    a.etc_type
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWObj.FACETC = tRet;

            let sqlStr = `
                select
                    a.MATL_CD,
                    sum(a.remain_qty) as TOT_QTY
                from
                    ksv_stock_matl a
                where
                    a.po_cd = '${args.data.PO_CD}'
                    and a.stock_status in ('W', 'N')
                group by
                    a.matl_cd
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            let tIdx = 0;
            let tArray = [];
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tOne = { ...tRet[tIdx] };
                let sqlStr0 = `
                    select
                        isnull(sum(b.use_qty), 0) as USE_QTY
                    from
                        ksv_stock_matl a,
                        ksv_stock_use b
                    where
                        a.po_cd = '${args.data.PO_CD}'
                        and a.stock_status in ('W', 'N')
                        and a.stock_idx = b.stock_idx
                        and a.matl_cd = '${tOne.MATL_CD}'
                        and b.use_po_cd <> '${args.data.PO_CD}'
                `;
                let tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr0));
                var tUseQty = 0;
                if (tRet0.length > 0) tUseQty = tRet0[0].USE_QTY;
                tOne.LEFT_OVER = tUseQty;
                tArray.push(tOne);
            }
            tWObj.LEFT_OVER_WAIT = tArray;

            let sqlStr = `
                select
                    a.MATL_CD,
                    sum(a.stock_qty) as TOT_QTY
                from
                    ksv_stock_matl a
                where
                    a.po_cd = '${args.data.PO_CD}'
                    and a.move_flag in ('1')
                group by
                    a.matl_cd
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            let tIdx = 0;
            let tArray = [];
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tOne = { ...tRet[tIdx] };
                let sqlStr0 = `
                    select
                        isnull(sum(b.use_qty), 0) as USE_QTY
                    from
                        ksv_stock_matl a,
                        ksv_stock_use b
                    where
                        a.po_cd = '${args.data.PO_CD}'
                        and a.move_flag in ('1')
                        and a.stock_idx = b.stock_idx
                        and a.matl_cd = '${tOne.MATL_CD}'
                        and b.use_po_cd = '${args.data.PO_CD}'
                `;
                let tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr0));
                var tUseQty = 0;
                if (tRet0.length > 0) tUseQty = tRet0[0].USE_QTY;
                tOne.STOCK_QTY = tOne.TOT_QTY - tUseQty;
                tArray.push(tOne);
            }
            tWObj.STOCK_MOVE = tArray;

            return tWObj;
        },

        mgrQueryS0501_2_2_1: async (_, args) => {
            let sql_STS_IN = `
                select
                    matl_cd,
                    'STS IN',
                    left(in_datetime, 8) as in_date,
                    order_cd,
                    tot_qty,
                    '' as col1,
                    '' as col2,
                    remark,
                    reg_user,
                    reg_datetime
                from
                    ksv_stock_in
                where
                    po_cd = '${args.data.PO_CD}'
                    and matl_cd = '${args.data.MATL_CD}'
                order by
                    2
            `;

            let sql_STS_OUT = `
                select
                    a.matl_cd,
                    'STS OUT',
                    a.ship_date,
                    a.order_cd,
                    a.out_qty,
                    a.pack_cd,
                    b.cd_name,
                    a.remark,
                    a.reg_user,
                    a.reg_datetime
                from
                    ksv_stock_out a,
                    kcd_code b
                where
                    a.po_cd = '${args.data.PO_CD}'
                    and a.matl_cd = '${args.data.MATL_CD}'
                    and a.delivery_type = b.cd_code
                    and b.cd_group = 'DELIVERY_TYPE'
                order by
                    2
            `;

            let sql_FAC_IN = `
                select
                    a.matl_cd,
                    'FAC IN',
                    a.in_date,
                    '' as col1,
                    a.in_qty,
                    a.delivery,
                    '' as col2,
                    a.location,
                    a.reg_user,
                    a.reg_datetime
                from
                    ksv_stock_facin a
                where
                    a.po_cd = '${args.data.PO_CD}'
                    and a.matl_cd = '${args.data.MATL_CD}'
                order by
                    2
            `;

            let sql_STOCK_USE = `
                select
                    e.ware_name,
                    b.po_cd,
                    b.po_seq,
                    b.order_cd,
                    '' as col1,
                    b.matl_cd,
                    d.vendor_name,
                    c.matl_name,
                    c.color,
                    c.spec,
                    c.unit,
                    b.rack,
                    b.location,
                    a.use_qty,
                    b.stock_qty,
                    a.stock_idx
                from
                    ksv_stock_use a,
                    ksv_stock_matl b,
                    kcd_matl_mst c,
                    kcd_vendor d,
                    kcd_factory_ware e,
                    ksv_po_mrp f
                where
                    f.po_cd = '${args.data.PO_CD}'
                    and f.po_matl_cd = '${args.data.MATL_CD}'
                    and b.stock_idx = a.stock_idx
                    and c.matl_cd = b.matl_cd
                    and d.vendor_cd = c.vendor_cd
                    and e.ware_cd = b.factory_cd
                    and a.use_po_cd = f.po_cd
                    and a.use_po_seq = f.po_seq
                    and a.use_order_cd = f.order_cd
                    and a.use_matl_cd = f.matl_cd
                    and a.use_mrp_seq = f.mrp_seq
                order by
                    a.use_po_cd,
                    a.use_po_seq,
                    a.use_order_cd,
                    a.use_matl_cd,
                    a.use_mrp_seq
            `;

            let sql_FAC_OUT = `
                select
                    matl_cd,
                    'FAC OUT',
                    out_date,
                    order_cd,
                    out_qty,
                    '' as col1,
                    '' as col2,
                    remark,
                    reg_user,
                    reg_datetime
                from
                    ksv_stock_facout
                where
                    po_cd = '${args.data.PO_CD}'
                    and matl_cd = '${args.data.MATL_CD}'
                order by
                    2
            `;

            let sql_FAC_ETC = `
                select
                    matl_cd,
                    etc_type,
                    etc_date,
                    '' as col1,
                    etc_qty,
                    '' as col2,
                    '' as col3,
                    '' as col4,
                    reg_user,
                    reg_datetime
                from
                    ksv_stock_facetc
                where
                    po_cd = '${args.data.PO_CD}'
                    and matl_cd = '${args.data.MATL_CD}'
                    and etc_type in ('Error', 'Shortage', 'Other')
                order by
                    2
            `;

            let sql_LEFT_OVER = `
                select
                    matl_cd,
                    stock_status,
                    stock_date,
                    order_cd,
                    stock_qty,
                    stock_idx,
                    '' as col1,
                    '' as col2,
                    '' as col3,
                    '' as col4
                from
                    ksv_stock_matl
                where
                    po_cd = '${args.data.PO_CD}'
                    and matl_cd = '${args.data.MATL_CD}'
                    and stock_status in ('W', 'N')
                order by
                    2
            `;

            let sql_STOCK_MOVE = `
                select
                    matl_cd,
                    stock_status,
                    stock_date,
                    order_cd,
                    stock_qty,
                    stock_idx,
                    '' as col1,
                    '' as col2,
                    '' as col3,
                    '' as col4
                from
                    ksv_stock_matl
                where
                    po_cd = '${args.data.PO_CD}'
                    and matl_cd = '${args.data.MATL_CD}'
                    and move_flag in ('1')
                order by
                    2
            `;

            let sql_ADJUST = `
                select
                    matl_cd,
                    etc_type,
                    etc_date,
                    '' as col1,
                    etc_qty,
                    ' as col2',
                    '' as col3,
                    '' as col4,
                    reg_user,
                    reg_datetime
                from
                    ksv_stock_facetc
                where
                    po_cd = '${args.data.PO_CD}'
                    and matl_cd = '${args.data.MATL_CD}'
                    and etc_type in ('Adjust')
                order by
                    2
            `;

            let tRet = [];
            if (args.data.OP_KIND === 'STS_IN')
                tRet = await prisma.$queryRaw(Prisma.raw(sql_STS_IN));
            if (args.data.OP_KIND === 'STS_OUT')
                tRet = await prisma.$queryRaw(Prisma.raw(sql_STS_OUT));
            if (args.data.OP_KIND === 'FAC_IN')
                tRet = await prisma.$queryRaw(Prisma.raw(sql_FAC_IN));
            if (args.data.OP_KIND === 'STOCK_USE')
                tRet = await prisma.$queryRaw(Prisma.raw(sql_STOCK_USE));
            if (args.data.OP_KIND === 'FAC_OUT')
                tRet = await prisma.$queryRaw(Prisma.raw(sql_FAC_OUT));
            if (args.data.OP_KIND === 'FAC_ETC')
                tRet = await prisma.$queryRaw(Prisma.raw(sql_FAC_ETC));
            if (args.data.OP_KIND === 'LEFT_OVER')
                tRet = await prisma.$queryRaw(Prisma.raw(sql_LEFT_OVER));
            if (args.data.OP_KIND === 'STOCK_MOVE')
                tRet = await prisma.$queryRaw(Prisma.raw(sql_STOCK_MOVE));
            if (args.data.OP_KIND === 'ADJUST')
                tRet = await prisma.$queryRaw(Prisma.raw(sql_ADJUST));

            var tRetArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tObj0 = {};
                var tObj = { ...tRet[tIdx] };
                Object.keys(tObj).forEach((col, i) => {
                    var tCol = `COL_${i}`;
                    tObj0[`${tCol}`] = tObj[`${col}`];
                });
                tObj0.id = tIdx + 1;
                tRetArray.push(tObj0);
            }
            return tRetArray;
        },
    },
};

export default moduleQuery_S0501_2_2;
