import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0507_2 = {
    Query: {
        mgrQueryS0507_2: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }

            var tWObj = {};

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
                    B.PAY_TERM
                FROM
                    KSV_PO_MATLLIST A,
                    KCD_VENDOR B,
                    KCD_MATL_MST C,
                    KCD_MATL_MEM D
                WHERE
                    A.PO_CD = '${args.data.PO_CD}'
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
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tArray0 = [];
            let tIdx0 = 0;
            for (tIdx0 = 0; tIdx0 < tRet.length; tIdx0++) {
                let tOne = { ...tRet[tIdx0] };

                let sql0 = `
                    select
                        isnull(sum(in_qty), 0) as FAC_IN_QTY
                    from
                        ksv_stock_facin
                    where
                        po_cd = '${args.data.PO_CD}'
                        and matl_cd = '${tOne.MATL_CD}'
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                tOne.FAC_IN_QTY = 0;
                if (tRet0.length > 0) tOne.FAC_IN_QTY = tRet0[0].FAC_IN_QTY;

                let sql0 = `
                    select
                        isnull(sum(out_qty), 0) as FAC_OUT_QTY
                    from
                        ksv_stock_facout
                    where
                        po_cd = '${args.data.PO_CD}'
                        and matl_cd = '${tOne.MATL_CD}'
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                tOne.FAC_OUT_QTY = 0;
                if (tRet0.length > 0) tOne.FAC_OUT_QTY = tRet0[0].FAC_OUT_QTY;

                let sql0 = `
                    select
                        isnull(sum(out_qty), 0) as FAC_ORDER_OUT_QTY
                    from
                        ksv_stock_facout
                    where
                        po_cd = '${args.data.PO_CD}'
                        and matl_cd = '${tOne.MATL_CD}'
                        and order_cd = '${args.data.ORDER_CD}'
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                tOne.FAC_ORDER_OUT_QTY = 0;
                if (tRet0.length > 0)
                    tOne.FAC_ORDER_OUT_QTY = tRet0[0].FAC_ORDER_OUT_QTY;

                tOne.PO_QTY = 0;
                /*
           let sql0 = `
               select
                   isnull(sum(a.po_qty), 0) as PO_QTY
               from
                   ksv_po_mrp a
               where
                   a.po_cd = '${args.data.PO_CD}'
                   and a.matl_cd = '${tOne.MATL_CD}'
           `;
           var tRet0  =  await prisma.$queryRaw(Prisma.raw(sql0));
           tOne.PO_QTY  = 0;
           if (tRet0.length > 0) tOne.PO_QTY = tRet0[0].PO_QTY;
*/

                let sql0 = `
                    select
                        isnull(sum(a.stock_qty), 0) as STOCK_MOVE_QTY
                    from
                        ksv_stock_matl a
                    where
                        a.po_cd = '${args.data.PO_CD}'
                        and a.move_flag in ('1', 'S')
                        and a.matl_cd = '${tOne.MATL_CD}'
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                tOne.STOCK_MOVE_QTY = 0;
                if (tRet0.length > 0)
                    tOne.STOCK_MOVE_QTY = tRet0[0].STOCK_MOVE_QTY;

                let sql0 = `
                    select
                        a.ETC_TYPE,
                        isnull(sum(a.etc_qty), 0) as STOCK_ETC_QTY
                    from
                        ksv_stock_facetc a
                    where
                        a.po_cd = '${args.data.PO_CD}'
                        and a.matl_cd = '${tOne.MATL_CD}'
                    group by
                        a.ETC_TYPE
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                tOne.ETC_ERROR = 0;
                tOne.ETC_SHORTAGE = 0;
                tOne.ETC_OTHERS = 0;
                if (tRet0.length > 0) {
                    tRet0.forEach((col, i) => {
                        if (col.ETC_TYPE === 'Error')
                            tOne.ETC_ERROR = col.STOCK_ETC_QTY;
                        if (col.ETC_TYPE === 'Shortage')
                            tOne.ETC_SHORTAGE = col.STOCK_ETC_QTY;
                        if (col.ETC_TYPE === 'Others')
                            tOne.ETC_OTHERS = col.STOCK_ETC_QTY;
                    });
                }

                tArray0.push(tOne);
            }
            tWObj.DATA1 = tArray0;

            let sqlStr = `
                select distinct
                    OUT_DATE,
                    ORDER_CD
                from
                    ksv_stock_facout
                where
                    po_cd = '${args.data.PO_CD}'
                    and order_cd = '${args.data.ORDER_CD}'
                order by
                    out_date
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWObj.OUT_DATE_INFO = tRet;

            let sqlStr = `
                select
                    a.OUT_DATE,
                    a.ORDER_CD,
                    a.MATL_CD,
                    sum(a.out_qty) as OUT_QTY
                from
                    ksv_stock_facout a
                where
                    a.po_cd = '${args.data.PO_CD}'
                    and a.order_cd = '${args.data.ORDER_CD}'
                group by
                    a.out_date,
                    a.order_cd,
                    a.matl_cd
                order by
                    a.out_date,
                    a.order_cd,
                    a.matl_cd
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWObj.ORDER_OUT_QTY = tRet;

            let sqlStr = `
                select
                    a.MATL_CD,
                    sum(a.out_qty) as OUT_QTY
                from
                    ksv_stock_facout a
                where
                    a.po_cd = '${args.data.PO_CD}'
                    and a.order_cd = '${args.data.ORDER_CD}'
                group by
                    a.matl_cd
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWObj.OUT_QTY = tRet;

            return tWObj;
        },
    },
};

export default moduleQuery_S0507_2;
