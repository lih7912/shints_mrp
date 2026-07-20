// MGR_@@TNAME@@.queries.js

import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0306_MRP_BY_ORDER_TBL_KCD_STYLE = {
    Query: {
        mgrQuery_S0306_QRY_CHECK: async (_, args) => {
            let sqlStr0 = `
                select distinct
                    PROD_CD
                from
                    ksv_order_mem
                where
                    order_cd = '${args.data.ORDER_CD}'
            `;
            var tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr0));
            var tRetArray = [];

            var tIdx0 = 0;
            for (tIdx0 = 0; tIdx0 < tRet0.length; tIdx0++) {
                var tOne0 = { ...tRet0[tIdx0] };

                let sqlStr1 = `
                    select
                        a.*,
                        b.MATL_NAME,
                        b.COLOR,
                        b.SPEC
                    from
                        ksv_order_mrp a,
                        kcd_matl_mst b
                    where
                        a.order_cd = '${args.data.ORDER_CD}'
                        and a.prod_cd = '${tOne0.PROD_CD}'
                        and a.matl_cd = b.matl_cd
                        and a.order_mrp_seq = (
                            select
                                max(order_mrp_seq)
                            from
                                ksv_order_mrp
                            where
                                order_cd = '${args.data.ORDER_CD}'
                                and prod_cd = '${tOne0.PROD_CD}'
                        )
                `;
                var tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));
                if (tRet1.length <= 0) continue;

                var tBefSeq = parseFloat(tRet1[0].ORDER_MRP_SEQ) - 1;

                let sqlStr2 = `
                    select
                        a.*,
                        b.MATL_NAME,
                        b.COLOR,
                        b.SPEC
                    from
                        ksv_order_mrp a,
                        kcd_matl_mst b
                    where
                        a.order_cd = '${args.data.ORDER_CD}'
                        and a.prod_cd = '${tOne0.PROD_CD}'
                        and a.matl_cd = b.matl_cd
                        and a.order_mrp_seq = ${tBefSeq}
                `;
                var tRet2 = await prisma.$queryRaw(Prisma.raw(sqlStr2));

                tRet1.forEach((col, i) => {
                    var tChk = 0;
                    tRet2.forEach((col1, i1) => {
                        if (col.ORDER_CD === col1.ORDER_CD &&
                            col.PROD_CD === col1.PROD_CD &&
                            col.MATL_CD === col1.MATL_CD &&
                            col.USE_SIZE === col1.USE_SIZE &&
                            col.REMARK === col1.REMARK) {
                            tChk = 1;
                            if (parseFloat(col.NET) !== parseFloat(col1.NET) || 
                               parseFloat(col.LOSS) !== parseFloat(col1.LOSS))  {
                               var tObj = {};
                               tObj.ORDER_CD = col.ORDER_CD;
                               tObj.MATL_CD = col.MATL_CD;
                               tObj.MATL_NAME = col.MATL_NAME;
                               tObj.COLOR = col.COLOR;
                               tObj.SPEC = col.SPEC;
                               tObj.PROD_CD = col.PROD_CD;
                               tObj.BEF_NET = col1.NET;
                               tObj.BEF_LOSS = col1.LOSS;
                               tObj.NET = col.NET;
                               tObj.LOSS = col.LOSS;
                               tRetArray.push(tObj);
                            } 
                        }
                    });
                    if (tChk === 0) {
                        var tObj = {};
                        tObj.ORDER_CD = col.ORDER_CD;
                        tObj.MATL_CD = col.MATL_CD;
                        tObj.MATL_NAME = col.MATL_NAME;
                        tObj.COLOR = col.COLOR;
                        tObj.SPEC = col.SPEC;
                        tObj.PROD_CD = col.PROD_CD;
                        tObj.BEF_NET = '0';
                        tObj.BEF_LOSS = '0';
                        tObj.NET = col.NET;
                        tObj.LOSS = col.LOSS;
                        tRetArray.push(tObj);
                    }
                });

                tRet2.forEach((col, i) => {
                    var tChk = 0;
                    tRet1.forEach((col1, i1) => {
                        if (col.ORDER_CD === col1.ORDER_CD &&
                            col.PROD_CD === col1.PROD_CD &&
                            col.MATL_CD === col1.MATL_CD &&
                            col.USE_SIZE === col1.USE_SIZE &&
                            col.REMARK === col1.REMARK) {
                            tChk = 1;
                        }
                    });
                    if (tChk === 0) {
                        var tObj = {};
                        tObj.ORDER_CD = col.ORDER_CD;
                        tObj.MATL_CD = col.MATL_CD;
                        tObj.MATL_NAME = col.MATL_NAME;
                        tObj.COLOR = col.COLOR;
                        tObj.SPEC = col.SPEC;
                        tObj.PROD_CD = col.PROD_CD;
                        tObj.BEF_NET = col.NET;
                        tObj.BEF_LOSS = col.LOSS;
                        tObj.NET = '0';
                        tObj.LOSS = '0';
                        tRetArray.push(tObj);
                    }
                });
            }
            return tRetArray;
        },

        mgrQuery_S0306_QRY_ORDER_MST: async (_, args) => {
            let sqlStr = `
                select
                    a.ORDER_CD,
                    isnull(a1.PO_CD, '') as PO_CD,
                    c.STYLE_NAME,
                    b.STYLE_CD,
                    count(*) as cnt
                from
                    ksv_order_mrp a
                    left join ksv_po_mem a1 on a1.order_cd = a.order_cd,
                    ksv_order_mst b,
                    kcd_style c
                where
                    a.order_cd = b.order_cd
                    and b.style_cd = c.style_cd
                    and left(b.order_cd, 2) like '%${args.data.BUYER_CD}%'
                    and (
                        c.style_cd like '%${args.data.STYLE_CD}%'
                        or c.style_name like '%${args.data.STYLE_CD.split(' ').join('%')}%'
                    )
                    and b.order_cd like '%${args.data.ORDER_CD}%'
                group by
                    a.ORDER_CD,
                    a1.PO_CD,
                    c.STYLE_NAME,
                    b.STYLE_CD
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            return tRet;
        },
        mgrQuery_S0306_QRY_VENDOR: async (_, args) => {
            let sqlStr = `
                select
                    *
                from
                    kcd_vendor
                where
                    (
                        vendor_name like '%${args.data.VENDOR_CD}%'
                        or vendor_cd like '%${args.data.VENDOR_CD}%'
                    )
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.VENDOR_CD = '';
            tObj.VENDOR_NAME = ' ';
            tRet.unshift(tObj);
            return tRet;
        },
        mgrQuery_S0306_QRY_STYLE: async (_, args) => {
            let sqlStr = `
                select
                    *
                from
                    kcd_style
                where
                    (
                        style_name like '%${args.data.STYLE_CD}%'
                        or style_cd like '%${args.data.STYLE_CD}%'
                    )
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.STYLE_CD = '';
            tObj.STYLE_NAME = ' ';
            tRet.unshift(tObj);
            return tRet;
        },
        mgrQuery_S0306_QRY_STYLE_BY_BUYER: async (_, args) => {
            let sqlStr = `
                select
                    *
                from
                    kcd_style
                where
                    buyer_cd = '${args.data.BUYER_CD}'
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.STYLE_CD = '';
            tObj.STYLE_NAME = ' ';
            tRet.unshift(tObj);
            return tRet;
        },
        mgrQuery_S0306_QRY_BUYER: async (_, args) => {
            let sqlStr = `
                select
                    *
                from
                    kcd_buyer
                where
                    (
                        buyer_name like '%${args.data.BUYER_CD}%'
                        or buyer_cd like '%${args.data.BUYER_CD}%'
                    )
            `;
            var tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tRet = [];
            tRet0.forEach((col, i) => {
                var tObj = { ...col };
                tObj.BUYER_NAME = `(${col.BUYER_CD})${col.BUYER_NAME}`;
                tRet.push(tObj);
            });
            var tObj = {};
            tObj.BUYER_CD = '';
            tObj.BUYER_NAME = ' ';
            tRet.unshift(tObj);
            return tRet;
        },
        mgrQuery_S0306_QRY_BUYER_BY_STYLE: async (_, args) => {
            let sqlStr = `
                select
                    a.*
                from
                    kcd_buyer a,
                    kcd_style b
                where
                    a.buyer_cd = b.buyer_cd
                    and b.style_cd = '${args.data.STYLE_CD}'
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.BUYER_CD = '';
            tObj.BUYER_NAME = ' ';
            tRet.unshift(tObj);
            return tRet;
        },

        mgrQuery_S0306_MRP_BY_ORDER_TBL_KCD_STYLE: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD.split(' ').join('%')}%' `;
            }

            if (args.data.BUYER_CD !== '') {
                tSQL += `AND (b.buyer_name  like '%${args.data.BUYER_CD}%' or b.buyer_cd like '%${args.data.BUYER_CD}%') `;
                tSQL += `AND a.buyer_cd = b.buyer_cd `;
            }
            let sqlStr = `
                select
                    top 1000 a.STYLE_NAME,
                    c.cd_name as BVT_FLAG_NAME,
                    a.BVT_FLAG,
                    a.STYLE_CD,
                    a.BUYER_NAME,
                    a.BUYER_CD,
                    0 as PROD_CNT
                from
                    (
                        select
                            a1.*,
                            b1.BUYER_NAME
                        from
                            kcd_style a1,
                            kcd_buyer b1
                        where
                            a1.status_cd = '0'
                            and a1.buyer_cd = b1.buyer_cd
                            and len(a1.style_cd) = 9
                            and (
                                a1.style_name like '%${args.data.STYLE_CD}%'
                                or a1.style_cd like '%${args.data.STYLE_CD}%'
                            )
                            and (
                                b1.buyer_name like '%${args.data.BUYER_CD}%'
                                or b1.buyer_cd like '%${args.data.BUYER_CD}%'
                            )
                    ) a
                    left join kcd_code c on c.cd_code = a.bvt_flag
                    and c.cd_group = 'BVT_FLAG'
                order by
                    a.STYLE_CD desc
                    -- offset 0 rows fetch next 1000 rows only
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                STYLE_NAME: '',
                STYLE_CD: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S0306_MRP_BY_ORDER_TBL_KCD_STYLE;
