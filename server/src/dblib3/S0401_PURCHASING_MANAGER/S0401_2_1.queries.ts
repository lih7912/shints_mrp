import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0401_2_1 = {
    Query: {
        mgrQueryS0401_2_1: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }

            var tRetArray = [];

            let sqlStr0 = `
                select distinct
                    a.po_cd as PO_CD
                from
                    ksv_po_mst a,
                    ksv_po_mem b
                where
                    a.po_cd = b.po_cd
                    and left(b.order_cd, 2) = '${args.data.BUYER_CD}'
                    and a.po_status = '4'
            `;
            var tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr0));
            var tIdx0 = 0;
            for (tIdx0 = 0; tIdx0 < tRet0.length; tIdx0++) {
                var tOnePo = {
                    ...tRet0[tIdx0],
                };

                let sqlStr3 = `
                    select
                        isnull(count(*), 0) as t_cnt
                    from
                        ksv_stock_in
                    where
                        po_cd = '${tOnePo.PO_CD}'
                `;
                var tRet3 = await prisma.$queryRaw(Prisma.raw(sqlStr3));
                if (tRet3[0].t_cnt > 0) continue;

                let sqlStr = `
                    select
                        P.*,
                        P1.BUYER_NAME,
                        P2.VENDOR_NAME,
                        P3.FACTORY_NAME,
                        isnull(p4.PU_CD, '') as PU_CD2,
                        '' as PU_STATUS
                    FROM
                        (
                            SELECT
                                K.BUYER_CD,
                                K.VENDOR_CD,
                                K.MATL_TYPE,
                                K.PO_CD,
                                '0' as S_MRP_QTY,
                                K.S_PO_QTY,
                                '0' as S_STOCK_QTY,
                                K1.FACTORY_CD,
                                K1.MATL_DUE_DATE,
                                K1.PROD_DUE_DATE,
                                MAX(K1.PLAN_FLAG) AS PLAN_FLAG,
                                MAX(K1.PLAN_ETD) AS PLAN_ETD,
                                MAX(K1.PLAN_ETA) AS PLAN_ETA
                            FROM
                                (
                                    SELECT
                                        LEFT(A.ORDER_CD, 2) AS BUYER_CD,
                                        B.VENDOR_CD,
                                        A.PO_CD,
                                        E.VENDOR_MATL_TYPE as MATL_TYPE,
                                        SUM(A.PO_QTY) AS S_PO_QTY
                                    FROM
                                        KSV_STOCK_MEM A,
                                        KCD_MATL_MST B,
                                        KSV_PO_MST C,
                                        KSV_ORDER_MST D,
                                        KCD_VENDOR E
                                    WHERE
                                        A.MATL_CD = B.MATL_CD
                                        AND A.PO_CD = '${tOnePo.PO_CD}'
                                        AND B.VENDOR_CD = E.VENDOR_CD
                                        AND A.STOCK_STATUS = '0'
                                        AND (
                                            A.PU_CD = ''
                                            or A.PU_CD is null
                                        )
                                        AND A.PO_CD = C.PO_CD
                                        AND A.PO_CD like '%${args.data.PO_CD}%'
                                        AND A.PO_SEQ = C.PO_SEQ
                                        AND C.PO_STATUS = '4'
                                        AND C.PO_SEQ < 97
                                        AND LEFT(A.ORDER_CD, 2) = '${args.data.BUYER_CD}'
                                        AND A.ORDER_CD = D.ORDER_CD
                                        AND D.ORDER_STATUS in ('3', '5', '6')
                                    GROUP BY
                                        LEFT(A.ORDER_CD, 2),
                                        B.VENDOR_CD,
                                        A.PO_CD,
                                        E.VENDOR_MATL_TYPE
                                        -- HAVING  SUM(A.PO_QTY) > 0
                                ) K,
                                KSV_PO_MST K1
                            WHERE
                                K.PO_CD = K1.PO_CD
                            GROUP BY
                                K.BUYER_CD,
                                K.VENDOR_CD,
                                K.MATL_TYPE,
                                K.PO_CD,
                                K.S_PO_QTY,
                                K1.FACTORY_CD,
                                K1.MATL_DUE_DATE,
                                K1.PROD_DUE_DATE
                        ) P
                        left join ksv_pu_mst2 p4 on p4.buyer_cd = p.BUYER_CD
                        and p4.pu_cd like '%${args.data.PU_CD}%'
                        and p4.buyer_cd like '%${args.data.BUYER_CD}%'
                        and p4.vendor_cd = p.VENDOR_CD
                        and p4.pu_cd in (
                            select distinct
                                pu_cd
                            from
                                ksv_pu_mem2
                            where
                                po_cd = p.PO_CD
                        ),
                        KCD_BUYER P1,
                        KCD_VENDOR P2,
                        KCD_FACTORY P3
                    where
                        P.BUYER_CD = P1.BUYER_CD
                        and P.VENDOR_CD = P2.VENDOR_CD
                        and P.FACTORY_CD = P3.FACTORY_CD
                        and (
                            P2.VENDOR_CD like '${args.data.VENDOR_CD}'
                            or P2.VENDOR_NAME like ''
                        )
                    ORDER BY
                        P.BUYER_CD,
                        P.VENDOR_CD,
                        P.MATL_TYPE,
                        P.PO_CD
                `;
                var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

                var tIdx = 0;
                for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                    var tOne1 = {
                        ...tRet[tIdx],
                    };

                    let sqlStr2 = `
                        select
                            isnull(sum(a.use_qty), 0) as s_stock_qty
                        from
                            ksv_stock_use a,
                            kcd_matl_mst b
                        where
                            a.use_po_cd = '${tOne1.PO_CD}'
                            and a.use_matl_cd = b.matl_cd
                            and b.vendor_cd = '${tOne1.VENDOR_CD}'
                    `;
                    var tRet2 = await prisma.$queryRaw(Prisma.raw(sqlStr2));

                    var tStockQty = parseFloat(tRet2[0].s_stock_qty);
                    var tMrpQty = tStockQty + parseFloat(tOne1.S_PO_QTY);
                    if (tStockQty + tMrpQty > 0) {
                        tOne1.S_STOCK_QTY = String(tStockQty);
                        tOne1.S_MRP_QTY = String(tMrpQty);
                        if (tMrpQty > 0) tRetArray.push(tOne1);
                    }
                }

                //
            }

            return tRetArray;
        },
    },
};

export default moduleQuery_S0401_2_1;
