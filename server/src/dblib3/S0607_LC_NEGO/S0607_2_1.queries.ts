import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0607_2_1 = {
    Query: {
        mgrQueryS0607_2_1: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }
            let buyerCdClause = '';

            if (args.data.BUYER_CD == 'MG') {
                buyerCdClause = `AND   LEFT(A.ORDER_CD, 2) in ('MG', 'MJ')`;
            } else {
                buyerCdClause = `AND   LEFT(A.ORDER_CD, 2) = '${args.data.BUYER_CD}'`;
            }

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
                            K.S_PO_QTY,
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
                                    AND C.PO_SEQ < 97 ${buyerCdClause}
                                    AND A.ORDER_CD = D.ORDER_CD
                                    AND D.ORDER_STATUS in ('3', '5', '6')
                                GROUP BY
                                    LEFT(A.ORDER_CD, 2),
                                    B.VENDOR_CD,
                                    A.PO_CD,
                                    E.VENDOR_MATL_TYPE
                                HAVING
                                    SUM(A.PO_QTY) > 0
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
                    and p4.vendor_cd = p.VENDOR_CD
                    and p4.pu_cd in (
                        select distinct
                            pu_cd
                        from
                            ksv_pu_mem
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
                ORDER BY
                    P.BUYER_CD,
                    P.VENDOR_CD,
                    P.MATL_TYPE,
                    P.PO_CD
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S0607_2_1;
