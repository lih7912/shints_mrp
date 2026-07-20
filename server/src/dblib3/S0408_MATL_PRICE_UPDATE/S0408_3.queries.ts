import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0408_3 = {
    Query: {
        mgrQueryS0408_3_1: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }

            let sqlStr = `
                select distinct
                    PO_CD
                from
                    ksv_po_mst
                where
                    po_cd like '%${args.data.PO_CD}%'
                    and substring(po_cd, 3, 2) > '09'
                    and po_status in ('2', '3', '4')
                order by
                    po_cd
                    -- offset 0 rows fetch next 1000 rows only
            `;
            var tRet = [];
            tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            let sqlStr1 = `
                select
                    *
                from
                    kcd_code
                where
                    cd_group = 'CURR_CD';
            `;
            var tRet1 = [];
            tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));

            var tWObj = {};
            tWObj.PO_CD = [...tRet];
            tWObj.CURR_CD = [...tRet1];

            return tWObj;
        },

        mgrQueryS0408_3_2: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }

            var tPoCds = '';
            args.data.PO_CD_ARRAY.forEach((col, i) => {
                if (i >= args.data.PO_CD_ARRAY.length - 1) {
                    tPoCds += `'${col}'`;
                } else {
                    tPoCds += `'${col}',`;
                }
            });

            let sqlStr = `
                select distinct
                    b.VENDOR_NAME,
                    c.VENDOR_CD
                from
                    ksv_po_mrp a,
                    kcd_vendor b,
                    kcd_matl_mst c
                where
                    a.po_cd in (${tPoCds})
                    and b.vendor_cd = c.vendor_cd
                    and b.vendor_name like '%%'
                    and c.matl_cd = a.matl_cd
                order by
                    b.vendor_name
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            return tRet;
        },

        mgrQueryS0408_3: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }

            var tPoCds = '';
            args.data.PO_CD_ARRAY.forEach((col, i) => {
                if (i >= args.data.PO_CD_ARRAY.length - 1) {
                    tPoCds += `'${col}'`;
                } else {
                    tPoCds += `'${col}',`;
                }
            });

            let sqlStr = `
                SELECT
                    TOP 1001 A.PO_CD,
                    A.MATL_CD,
                    E.MATL_NAME,
                    E.COLOR,
                    E.SPEC,
                    SUM(A.PO_QTY) AS PO_QTY,
                    F.CURR_CD,
                    G.CD_NAME AS
                TYPE,
                H.MATL_PRICE AS BEF_PRICE,
                J.MATL_PRICE AS SALE_PRICE,
                F.MATL_PRICE AS MATL_PRICE,
                F.MATL_PRICE AS MATL_NEGO_PRICE,
                '' AS RATE,
                J.MATL_PRICE AS SALE_NEOG_PRICE,
                (
                    (F.MATL_PRICE - H.MATL_PRICE) / CASE
                        WHEN H.MATL_PRICE = 0 THEN 1
                        ELSE H.MATL_PRICE
                    END
                ) * 100 AS BALANCE,
                F.REMARK,
                C.CD_NAME AS CONF_NAME,
                A.TEMP_PRICE,
                F.CONF_FLAG,
                F.MATL_SEQ,
                D.VENDOR_NAME,
                I.MATL_SEQ AS MAX_MATL_SEQ,
                J.MATL_SEQ AS MAX_SALE_SEQ
                FROM
                    KSV_PO_MRP A,
                    KCD_MATL_MST E,
                    KCD_MATL_MEM F,
                    KCD_CODE C,
                    KCD_VENDOR D,
                    KCD_CODE G,
                    KCD_MATL_MEM H,
                    KCD_MATL_MEM I,
                    KCD_MATL_SALE J
                WHERE
                    A.PO_CD IN (${tPoCds})
                    AND A.USE_PO_TYPE = '1'
                    AND E.MATL_CD = A.MATL_CD
                    AND F.MATL_CD = A.MATL_CD
                    AND F.MATL_SEQ = A.MATL_SEQ
                    AND H.MATL_CD = A.MATL_CD
                    AND H.MATL_SEQ = CASE
                        WHEN A.MATL_SEQ > 1 THEN A.MATL_SEQ -1
                        ELSE A.MATL_SEQ
                    END
                    AND I.MATL_CD = A.MATL_CD
                    AND I.MATL_SEQ = (
                        SELECT
                            MAX(MATL_SEQ)
                        FROM
                            KCD_MATL_MEM
                        WHERE
                            MATL_CD = A.MATL_CD
                    )
                    AND J.MATL_CD = A.MATL_CD
                    AND J.MATL_SEQ = (
                        SELECT
                            MAX(MATL_SEQ)
                        FROM
                            KCD_MATL_SALE
                        WHERE
                            MATL_CD = A.MATL_CD
                    )
                    AND F.CONF_FLAG LIKE '%%'
                    AND C.CD_GROUP = 'MATL_CONF_FLAG'
                    AND C.CD_CODE = F.CONF_FLAG
                    AND G.CD_GROUP = 'PRICE_TYPE'
                    AND G.CD_CODE = F.PRICE_TYPE
                    AND D.VENDOR_CD LIKE '%${args.data.VENDOR_CD}%'
                    AND D.VENDOR_CD = E.VENDOR_CD
                    AND E.MATL_NAME LIKE '%${args.data.MATL_NAME}%'
                    AND E.SPEC LIKE '%${args.data.SPEC}%'
                    AND E.COLOR LIKE '%${args.data.COLOR}%'
                GROUP BY
                    A.PO_CD,
                    A.MATL_CD,
                    E.MATL_NAME,
                    E.COLOR,
                    E.SPEC,
                    F.CURR_CD,
                    G.CD_NAME,
                    H.MATL_PRICE,
                    F.MATL_PRICE,
                    F.MATL_PRICE,
                    J.MATL_PRICE,
                    C.CD_NAME,
                    F.CONF_FLAG,
                    F.MATL_SEQ,
                    D.VENDOR_NAME,
                    I.MATL_SEQ,
                    F.REMARK,
                    A.TEMP_PRICE,
                    J.MATL_SEQ
                HAVING
                    SUM(A.PO_QTY) > 0
                ORDER BY
                    1,
                    2,
                    3
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            var tIdx = 0;
            var tRetArray = [];
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tObjOne = { ...tRet[tIdx] };
                let sqlStr1 = `
                    select
                        isnull(sum(lc_qty), 0) as lc_qty
                    from
                        ksv_stock_in
                    where
                        po_cd in (${tPoCds})
                        and matl_cd = '${tObjOne.MATL_CD}'
                `;
                var tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));

                tObjOne.LC_QTY = tRet1[0].lc_qty;
                tRetArray.push(tObjOne);
            }

            return tRetArray;
        },
    },
};

export default moduleQuery_S0408_3;
