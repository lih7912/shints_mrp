import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0419_2 = {
    Query: {
        mgrQueryS0419_2_0: async (_, args) => {
            var tSQL = '';

            var tPO_CD = '';
            var tS_DATE = '20231001';
            var tE_DATE = '20241230';

            if (args.data.PO_CD !== '') tPO_CD = args.data.PO_CD;
            if (args.data.S_IN_DATE !== '') {
                tS_DATE = args.data.S_IN_DATE;
                tE_DATE = args.data.E_IN_DATE;
            }

            if (tS_DATE !== '') {
                // tSQL += `AND B.IN_DATETIME BETWEEN '${tS_DATE}' AND '${tE_DATE}'  `;
                tSQL += `AND B.PAY_DATE BETWEEN '${tS_DATE}' AND '${tE_DATE}'  `;
            }

            if (args.data.CLOSE_OX === 'O') {
                tSQL += `AND B.END_FLAG = '1' `;
            } else if (args.data.CLOSE_OX === 'X') {
                tSQL += `AND B.END_FLAG <> '1' `;
            } else if (args.data.CLOSE_OX === 'All') {
            } else {
                tSQL += `AND B.END_FLAG <> '1' `;
            }

            if (args.data.CURR_CD !== '') {
                tSQL += `AND B.IN_CURR_CD = '${args.data.CURR_CD}' `;
            }

            let sqlStr = `
                SELECT
                    A.PO_CD,
                    LEFT(A.ORDER_CD, 2) AS BUYER_CD,
                    B.MATL_CD,
                    E.MATL_NAME,
                    E.COLOR,
                    E.SPEC,
                    B.TOT_QTY,
                    B.IN_QTY,
                    B.IN_CURR_CD,
                    B.IN_PRICE,
                    B.PAY_CURR_CD,
                    B.PAY_PRICE,
                    H.MATL_PRICE,
                    B.TT_FLAG,
                    G.WARE_NAME,
                    (B.IN_QTY * B.PAY_PRICE) AS IN_AMT,
                    B.END_FLAG,
                    B.END_DATE,
                    B.PAY_DATE,
                    B.BILL_FLAG,
                    B.BILL_DATE,
                    D.VENDOR_NAME,
                    A.PO_SEQ,
                    A.ORDER_CD,
                    A.MRP_SEQ,
                    B.IN_DATETIME,
                    B.MATL_SEQ,
                    B.CALC_FLAG,
                    D.VENDOR_CD,
                    B.PUR_FACTORY,
                    B.PAY_REPORT,
                    B.END_FLAG,
                    D.VENDOR_TYPE,
                    isnull(B.BILL_CD, '') as BILL_CD
                FROM
                    KSV_STOCK_MEM A,
                    KSV_STOCK_IN B,
                    KCD_VENDOR D,
                    KCD_MATL_MST E,
                    KCD_MATL_MEM F,
                    KCD_FACTORY_WARE G,
                    KCD_MATL_SALE H
                WHERE
                    B.PO_CD = A.PO_CD ${tSQL}
                    AND A.PO_CD LIKE '${tPO_CD}%'
                    AND E.MATL_NAME LIKE '%${args.data.MATL_NAME}%'
                    AND E.COLOR LIKE '%${args.data.COLOR}%'
                    AND E.SPEC LIKE '%${args.data.SPEC}%'
                    AND B.PUR_FACTORY LIKE '%${args.data.VENDOR_TYPE}%'
                    -- AND B.PUR_FACTORY IN ('','') 
                    AND LEFT(A.ORDER_CD, 2) LIKE '%${args.data.BUYER_CD}%'
                    AND (
                        B.PUR_FACTORY = G.WARE_CD
                        or B.IN_FACTORY_CD = G.WARE_CD
                    )
                    AND B.PO_SEQ = A.PO_SEQ
                    AND B.ORDER_CD = A.ORDER_CD
                    AND B.MATL_CD = A.MATL_CD
                    AND B.MRP_SEQ = A.MRP_SEQ
                    AND D.VENDOR_CD = E.VENDOR_CD
                    AND E.VENDOR_CD LIKE '%${args.data.VENDOR_CD}%'
                    -- AND D.VENDOR_TYPE = '' 
                    AND E.MATL_CD = B.MATL_CD
                    AND F.MATL_CD = A.MATL_CD
                    AND F.MATL_SEQ = A.MATL_SEQ
                    AND B.END_FLAG LIKE '%%'
                    AND H.MATL_CD = A.MATL_CD
                    AND H.MATL_SEQ = (
                        SELECT
                            MAX(MATL_SEQ)
                        FROM
                            KCD_MATL_SALE
                        WHERE
                            A.MATL_CD = MATL_CD
                    )
                    AND LEFT(B.PAY_REPORT, 4) <> 'TEMP'
                ORDER BY
                    LEFT(A.ORDER_CD, 2),
                    D.VENDOR_CD,
                    A.PO_CD
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            var tRetData = {};
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },

        mgrQueryS0419_2: async (_, args) => {
            var tSQL = '';

            var tPO_CD = '';
            var tS_DATE = '20231001';
            var tE_DATE = '20241230';

            if (args.data.PO_CD !== '') tPO_CD = args.data.PO_CD;
            if (args.data.S_IN_DATE !== '') {
                tS_DATE = args.data.S_IN_DATE;
                tE_DATE = args.data.E_IN_DATE;
            }

            if (tS_DATE !== '') {
                // tSQL += `AND B.IN_DATETIME BETWEEN '${tS_DATE}' AND '${tE_DATE}'  `;
                tSQL += `AND B.PAY_DATE BETWEEN '${tS_DATE}' AND '${tE_DATE}'  `;
            }

            if (args.data.CLOSE_OX === 'O') {
                tSQL += `AND B.END_FLAG = '1' `;
            } else if (args.data.CLOSE_OX === 'X') {
                tSQL += `AND B.END_FLAG <> '1' `;
            } else if (args.data.CLOSE_OX === 'All') {
            } else {
                tSQL += `AND B.END_FLAG <> '1' `;
            }

            if (args.data.CURR_CD !== '') {
                tSQL += `AND B.IN_CURR_CD = '${args.data.CURR_CD}' `;
            }

            let sqlStr = `
                SELECT
                    A.PO_CD,
                    LEFT(A.ORDER_CD, 2) AS BUYER_CD,
                    B.MATL_CD,
                    E.MATL_NAME,
                    E.COLOR,
                    E.SPEC,
                    B.TOT_QTY,
                    B.IN_QTY,
                    B.IN_CURR_CD,
                    B.IN_PRICE,
                    B.PAY_CURR_CD,
                    B.PAY_PRICE,
                    H.MATL_PRICE,
                    B.TT_FLAG,
                    G.WARE_NAME,
                    (B.IN_QTY * B.PAY_PRICE) AS IN_AMT,
                    B.END_FLAG,
                    B.END_DATE,
                    B.PAY_DATE,
                    B.BILL_FLAG,
                    B.BILL_DATE,
                    D.VENDOR_NAME,
                    A.PO_SEQ,
                    A.ORDER_CD,
                    A.MRP_SEQ,
                    B.IN_DATETIME,
                    B.MATL_SEQ,
                    B.CALC_FLAG,
                    D.VENDOR_CD,
                    B.PUR_FACTORY,
                    B.PAY_REPORT,
                    B.END_FLAG,
                    D.VENDOR_TYPE,
                    isnull(B.BILL_CD, '') as BILL_CD
                FROM
                    KSV_STOCK_MEM A,
                    KSV_STOCK_IN B,
                    KCD_VENDOR D,
                    KCD_MATL_MST E,
                    KCD_MATL_MEM F,
                    KCD_FACTORY_WARE G,
                    KCD_MATL_SALE H
                WHERE
                    B.PO_CD = A.PO_CD ${tSQL}
                    AND A.PO_CD LIKE '${tPO_CD}%'
                    AND E.MATL_NAME LIKE '%${args.data.MATL_NAME}%'
                    AND E.COLOR LIKE '%${args.data.COLOR}%'
                    AND E.SPEC LIKE '%${args.data.SPEC}%'
                    AND B.PUR_FACTORY LIKE '%${args.data.VENDOR_TYPE}%'
                    -- AND B.PUR_FACTORY IN ('','') 
                    AND LEFT(A.ORDER_CD, 2) LIKE '%${args.data.BUYER_CD}%'
                    AND (
                        B.PUR_FACTORY = G.WARE_CD
                        or B.IN_FACTORY_CD = G.WARE_CD
                    )
                    AND B.PO_SEQ = A.PO_SEQ
                    AND B.ORDER_CD = A.ORDER_CD
                    AND B.MATL_CD = A.MATL_CD
                    AND B.MRP_SEQ = A.MRP_SEQ
                    AND D.VENDOR_CD = E.VENDOR_CD
                    AND E.VENDOR_CD LIKE '%${args.data.VENDOR_CD}%'
                    -- AND D.VENDOR_TYPE = '' 
                    AND E.MATL_CD = B.MATL_CD
                    AND F.MATL_CD = A.MATL_CD
                    AND F.MATL_SEQ = A.MATL_SEQ
                    AND B.END_FLAG LIKE '%%'
                    AND H.MATL_CD = A.MATL_CD
                    AND H.MATL_SEQ = (
                        SELECT
                            MAX(MATL_SEQ)
                        FROM
                            KCD_MATL_SALE
                        WHERE
                            A.MATL_CD = MATL_CD
                    )
                    AND LEFT(B.PAY_REPORT, 4) <> 'TEMP'
                ORDER BY
                    LEFT(A.ORDER_CD, 2),
                    D.VENDOR_CD,
                    A.PO_CD
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            var tRetData = {};
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S0419_2;
