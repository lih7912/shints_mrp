import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0403_1 = {
    Query: {
        mgrQueryS0403_CODE: async (_, args) => {
            var tWObj = {};

            let sqlStr = `
                select
                    *
                from
                    kcd_code
                where
                    cd_group = 'VENDOR_MATL_TYPE'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_CODE = ' ';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.MATL_TYPE = tRet;

            let sqlStr = `
                select
                    *
                from
                    kcd_code
                where
                    cd_group = 'VENDOR_TYPE'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_CODE = ' ';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.VENDOR_TYPE = tRet;

            let sqlStr = `
                select
                    *
                from
                    kcd_buyer
                order by
                    buyer_cd
                    -- offset 0 rows fetch next 1000 rows only
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.BUYER_CD = ' ';
            tObj.BUYER_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.BUYER_CD = tRet;

            let sqlStr = `
                SELECT distinct
                    a.PO_CD,
                    left(b.order_Cd, 2) as BUYER_CD
                FROM
                    KSV_PO_MST a,
                    ksv_po_mem b
                where
                    a.po_cd = b.po_cd
                    and left(b.order_cd, 2) like '${args.data.BUYER_CD}%'
                ORDER BY
                    a.PO_CD
                    -- offset 0 rows fetch next 1000 rows only
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.PO_CD = ' ';
            tObj.BUYER_CD = ' ';
            tRet.unshift(tObj);
            tWObj.PO_CD = tRet;

            let sqlStr = '';
            if (args.data.PO_CD !== '') {
                sqlStr = `
                    select distinct
                        c.VENDOR_NAME,
                        b.VENDOR_CD
                    from
                        ksv_po_mrp a,
                        kcd_matl_mst b,
                        kcd_vendor c
                    where
                        a.po_cd = '${args.data.PO_CD}'
                        and b.matl_cd = a.matl_cd
                        and c.vendor_cd = b.vendor_cd
                    order by
                        c.vendor_name
                `;
            } else {
                sqlStr = `
                    select
                        VENDOR_NAME,
                        VENDOR_CD
                    from
                        kcd_vendor
                    where
                        status_cd = '0'
                    order by
                        vendor_name
                `;
            }

            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.VENDOR_CD = ' ';
            tObj.VENDOR_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.VENDOR_CD = tRet;

            return tWObj;
        },

        mgrQueryS0403_1: async (_, args) => {
            var tInputObj = { ...args.data };
            if (tInputObj.PO_CD === ' ') tInputObj.PO_CD = '';
            if (tInputObj.MATL_TYPE === ' ') tInputObj.MATL_TYPE = '';
            if (tInputObj.VENDOR_TYPE === ' ') tInputObj.VENDOR_TYPE = '';
            if (tInputObj.VENDOR_CD === ' ') tInputObj.VENDOR_CD = '';
            if (tInputObj.BUYER_CD === ' ') tInputObj.BUYER_CD = '';

            let sqlStr = `
                SELECT
                    A.PO_CD,
                    A.ORDER_CD,
                    C.STYLE_NAME,
                    E.VENDOR_NAME,
                    D.MATL_NAME,
                    D.COLOR,
                    D.SPEC,
                    D.UNIT,
                    a.MATL_CD,
                    g.CURR_CD,
                    g.MATL_PRICE,
                    A.TOT_AMT,
                    SUM(A.USE_QTY) AS EXP_USEQTY,
                    SUM(A.PO_QTY) AS EXP_POQTY,
                    F.PO_DATE,
                    F.MATL_DUE_DATE,
                    SUM(A.USE_QTY) - SUM(A.PO_QTY) AS EXP_DIFF
                FROM
                    KSV_PO_MRP AS A
                    INNER JOIN KSV_ORDER_MST AS B ON A.ORDER_CD = B.ORDER_CD
                    INNER JOIN KCD_STYLE AS C ON B.STYLE_CD = C.STYLE_CD
                    INNER JOIN KCD_MATL_MST AS D ON A.MATL_CD = D.MATL_CD
                    INNER JOIN KCD_VENDOR AS E ON D.VENDOR_CD = E.VENDOR_CD
                    INNER JOIN KSV_PO_MST AS F ON A.PO_CD = F.PO_CD
                    AND A.PO_SEQ = F.PO_SEQ
                    INNER JOIN kcd_matl_mem as g on a.matl_cd = g.matl_cd
                    and a.matl_seq = g.matl_seq
                WHERE
                    (A.PO_CD LIKE 'PO23%')
                    AND (E.VENDOR_CD LIKE '${args.data.VENDOR_CD}%')
                    AND (F.PO_DATE >= '20220101')
                    AND (F.PO_DATE <= '20231231')
                    AND (A.USE_PO_TYPE = '1')
                    AND (a.matl_cd like '%${args.data.MATL_CD}%')
                    AND (D.MATL_CD LIKE '%${args.data.MATL_CD}%')
                    AND (D.MATL_NAME LIKE '%${args.data.MATL_NAME}%')
                    AND (D.SPEC LIKE '%${args.data.SPEC}%')
                    AND (D.COLOR LIKE '%${args.data.COLOR}%')
                    and isnull(e.vendor_matl_type, '') like '${args.data.BUYER_CD}%'
                    AND (E.VENDOR_TYPE LIKE '%${args.data.VENDOR_TYPE}%')
                    and left(a.order_cd, 2) like '${args.data.BUYER_CD}%'
                GROUP BY
                    A.PO_CD,
                    A.ORDER_CD,
                    C.STYLE_NAME,
                    E.VENDOR_NAME,
                    D.MATL_NAME,
                    a.matl_cd,
                    g.matl_price,
                    D.COLOR,
                    D.SPEC,
                    A.TOT_AMT,
                    g.CURR_CD,
                    D.UNIT,
                    F.PO_DATE,
                    F.MATL_DUE_DATE
                ORDER BY
                    A.PO_CD desc
                    -- offset 0 rows fetch next 1000 rows only
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            return tRet;
        },
    },
};

export default moduleQuery_S0403_1;
