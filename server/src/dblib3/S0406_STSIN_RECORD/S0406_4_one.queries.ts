import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0406_4_one = {
    Query: {
        mgrQueryS0406_4_one: async (_, args) => {
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
                    A.PO_CD,
                    A.ORDER_CD,
                    D.VENDOR_NAME,
                    C.MATL_NAME,
                    C.COLOR,
                    C.SPEC,
                    C.UNIT,
                    A.PO_QTY,
                    A.IN_QTY AS BEF_IN_QTY,
                    0 AS COL1 AS IN_QTY,
                    0 AS COL2 AS TOT_QTY,
                    COUNT(B.PO_CD) AS PO_CD_CNT,
                    B.MIN_FLAG,
                    C.MATL_CD,
                    '' AS LC_QTY,
                    '' AS BILL_TYPE,
                    A.PO_SEQ,
                    A.MRP_SEQ,
                    D.VENDOR_CD,
                    D.VENDOR_TYPE,
                    (A.PO_QTY - A.IN_QTY) AS REMAIN_QTY,
                    A.TEMP_PRICE,
                    A.MIN_CONF_USER,
                    A.MIN_CONF_DATETIME,
                    A.MIN_STOCK_IDX
                FROM
                    KSV_STOCK_MEM A
                    LEFT JOIN KSV_STOCK_IN B ON B.PO_CD = A.PO_CD
                    AND B.PO_SEQ = A.PO_SEQ
                    AND B.ORDER_CD = A.ORDER_CD
                    AND B.MATL_CD = A.MATL_CD
                    AND B.MRP_SEQ = A.MRP_SEQ
                    AND B.LC_CONF_FLAG = '0'
                    LEFT JOIN KSV_ORDER_MST F ON A.ORDER_CD = F.ORDER_CD
                    AND F.ORDER_STATUS <> '9',
                    KCD_MATL_MST C,
                    KCD_VENDOR D
                WHERE
                    A.PO_CD IN (${tPoCds})
                    AND C.VENDOR_CD = '${args.data.VENDOR_CD}'
                    AND A.MATL_CD = '${args.data.MATL_CD}'
                    AND C.MATL_NAME LIKE '%%'
                    AND C.COLOR LIKE '%%'
                    AND C.SPEC LIKE '%%'
                    AND A.PO_QTY > A.IN_QTY
                    AND C.MATL_CD = A.MATL_CD
                    AND D.VENDOR_CD = C.VENDOR_CD
                GROUP BY
                    A.PO_CD,
                    A.ORDER_CD,
                    D.VENDOR_NAME,
                    C.MATL_NAME,
                    C.COLOR,
                    C.SPEC,
                    C.UNIT,
                    A.PO_QTY,
                    A.IN_QTY,
                    B.MIN_FLAG,
                    C.MATL_CD,
                    A.PO_SEQ,
                    A.MRP_SEQ,
                    D.VENDOR_CD,
                    D.VENDOR_TYPE,
                    A.TEMP_PRICE,
                    A.MIN_CONF_USER,
                    A.MIN_CONF_DATETIME,
                    A.MIN_STOCK_IDX
                ORDER BY
                    1,
                    2,
                    3
            `;

            let sqlStr1 = `
                SELECT
                    A.PO_CD,
                    A.ORDER_CD,
                    D.VENDOR_NAME,
                    C.MATL_NAME,
                    C.COLOR,
                    C.SPEC,
                    C.UNIT,
                    A.PO_QTY,
                    A.IN_QTY AS BEF_IN_QTY,
                    0 AS IN_QTY,
                    0 AS TOT_QTY,
                    COUNT(B.PO_CD) AS PO_CD_CNT,
                    B.MIN_FLAG,
                    C.MATL_CD,
                    '' AS LC_QTY,
                    '' AS BILL_TYPE,
                    A.PO_SEQ,
                    A.MRP_SEQ,
                    D.VENDOR_CD,
                    D.VENDOR_TYPE,
                    (A.PO_QTY - A.IN_QTY) AS REMAIN_QTY,
                    A.TEMP_PRICE,
                    A.MIN_CONF_USER,
                    A.MIN_CONF_DATETIME,
                    A.MIN_STOCK_IDX
                FROM
                    KSV_STOCK_MEM A
                    LEFT JOIN KSV_STOCK_IN B ON B.PO_CD = A.PO_CD
                    AND B.PO_SEQ = A.PO_SEQ
                    AND B.ORDER_CD = A.ORDER_CD
                    AND B.MATL_CD = A.MATL_CD
                    AND B.MRP_SEQ = A.MRP_SEQ
                    AND B.LC_CONF_FLAG = '0'
                    AND B.LC_CONF_FLAG = '0'
                    LEFT JOIN KSV_ORDER_MST F ON A.ORDER_CD = F.ORDER_CD
                    AND F.ORDER_STATUS <> '9',
                    KCD_MATL_MST C,
                    KCD_VENDOR D,
                    KCD_MATL_MEM E
                WHERE
                    A.PO_CD IN (${tPoCds})
                    AND C.MATL_NAME LIKE '%%'
                    AND C.COLOR LIKE '%%'
                    AND C.SPEC LIKE '%%'
                    AND C.VENDOR_CD = '${args.data.VENDOR_CD}'
                    AND A.DIFF_PO_TYPE <> '2'
                    AND A.PO_QTY > A.IN_QTY
                    AND C.MATL_CD = A.MATL_CD
                    AND D.VENDOR_CD = C.VENDOR_CD
                    AND E.MATL_CD = A.MATL_CD
                    AND E.MATL_SEQ = A.MATL_SEQ
                    AND E.CONF_FLAG IN ('W', '1', '0')
                GROUP BY
                    A.PO_CD,
                    A.ORDER_CD,
                    D.VENDOR_NAME,
                    C.MATL_NAME,
                    C.COLOR,
                    C.SPEC,
                    C.UNIT,
                    A.PO_QTY,
                    A.IN_QTY,
                    B.MIN_FLAG,
                    C.MATL_CD,
                    A.PO_SEQ,
                    A.MRP_SEQ,
                    D.VENDOR_CD,
                    D.VENDOR_TYPE,
                    A.TEMP_PRICE,
                    A.MIN_CONF_USER,
                    A.MIN_CONF_DATETIME,
                    A.MIN_STOCK_IDX
                ORDER BY
                    1,
                    2,
                    3
            `;

            var tRet = [];
            if (args.data.MATL_CD !== '') {
                tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            } else {
                tRet = await prisma.$queryRaw(Prisma.raw(sqlStr1));
            }
            return tRet;
        },
    },
};

export default moduleQuery_S0406_4_one;
