import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0407_4_one = {
    Query: {
        mgrQueryS0407_4_one: async (_, args) => {
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
                    A.IN_QTY AS BEF_QTY,
                    0 AS IN_QTY,
                    0 AS TOT_QTY,
                    '' AS LC_QTY,
                    '' AS BILL_TYPE,
                    C.MATL_CD,
                    A.PO_SEQ,
                    A.MRP_SEQ,
                    D.VENDOR_CD,
                    D.VENDOR_TYPE,
                    (A.PO_QTY - A.IN_QTY) AS REMAIN_QTY,
                    A.TEMP_PRICE,
                    A.MIN_CONF_USER,
                    A.MIN_CONF_DATETIME
                FROM
                    KSV_STOCK_MEM A,
                    KCD_MATL_MST C,
                    KCD_VENDOR D
                WHERE
                    A.PO_CD IN (${tPoCds})
                    AND C.VENDOR_CD = '${args.data.VENDOR_CD}'
                    AND A.MATL_CD = '${args.data.MATL_CD}'
                    AND A.DIFF_PO_TYPE <> '2'
                    AND C.MATL_CD = A.MATL_CD
                    AND D.VENDOR_CD = C.VENDOR_CD
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
                    A.IN_QTY AS BEF_QTY,
                    0 AS IN_QTY,
                    0 AS TOT_QTY,
                    '' AS LC_QTY,
                    '' AS BILL_TYPE,
                    C.MATL_CD,
                    A.PO_SEQ,
                    A.MRP_SEQ,
                    D.VENDOR_CD,
                    D.VENDOR_TYPE,
                    (A.PO_QTY - A.IN_QTY) AS REMAIN_QTY,
                    A.TEMP_PRICE,
                    A.MIN_CONF_USER,
                    A.MIN_CONF_DATETIME
                FROM
                    KSV_STOCK_MEM A,
                    KCD_MATL_MST C,
                    KCD_VENDOR D,
                    KCD_MATL_MEM e
                WHERE
                    A.PO_CD IN (${tPoCds})
                    AND C.VENDOR_CD = '${args.data.VENDOR_CD}'
                    AND A.DIFF_PO_TYPE <> '2'
                    AND C.MATL_CD = A.MATL_CD
                    AND D.VENDOR_CD = C.VENDOR_CD
                    and e.matl_cd = a.matl_cd
                    and e.matl_seq = a.matl_seq
                    and e.conf_flag in ('W', '1', '0')
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

export default moduleQuery_S0407_4_one;
