import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0708_3 = {
    Query: {
        mgrQueryS0708_3: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }
            let sqlStr = `
                SELECT
                    A.INVOICE_NO,
                    A.CURR_CD,
                    ROUND(A.TOT_AMT, 2) AS TOT_AMT,
                    A.SHIP_DATE,
                    A.DUE_DATE,
                    (
                        ROUND(A.TOT_AMT, 2) - ISNULL(ROUND(SUM(B.BILL_AMT_ORG), 2), 0)
                    ) AS BALANCE,
                    C.BUYER_NAME
                FROM
                    KSV_INVOICE_MST A
                    LEFT JOIN KSV_INVOICE_BILL B ON B.INVOICE_NO = A.INVOICE_NO,
                    KCD_BUYER C
                WHERE
                    C.BUYER_CD = A.BUYER_CD
                    AND A.TOT_AMT > 0
                    AND C.MOM_CD = 'NB'
                    AND A.PAYMENT_TYPE = '1'
                    AND A.TRADE_TYPE = '1'
                    AND A.DUE_DATE >= '20230101'
                    AND B.BILL_TYPE IN ('1', '3')
                    AND A.REG_DATETIME > '20220608000000'
                    AND ISNULL(A.DOCU_NO, '') <> ''
                GROUP BY
                    A.INVOICE_NO,
                    A.CURR_CD,
                    A.TOT_AMT,
                    A.SHIP_DATE,
                    A.DUE_DATE,
                    C.BUYER_NAME
                HAVING
                    ROUND(A.TOT_AMT, 2) - ISNULL(ROUND(SUM(B.BILL_AMT_ORG), 2), 0) > 0
                UNION
                SELECT
                    A.INVOICE_NO,
                    'USD' AS CURR_CD,
                    SUM(ROUND(D.PO_AMT, 2)) AS TOT_AMT,
                    A.OUT_DATE AS SHIP_DATE,
                    A.OUT_DATE AS DUE_DATE,
                    (
                        SUM(ROUND(D.PO_AMT, 2)) - ISNULL(ROUND(SUM(B.BILL_AMT_ORG), 2), 0)
                    ) BALANCE,
                    C.BUYER_NAME
                FROM
                    KSV_INVOICE_MATL A
                    LEFT JOIN KSV_INVOICE_BILL B ON B.INVOICE_NO = A.INVOICE_NO,
                    KCD_BUYER C,
                    KSV_INVOICE_MATLMEM D
                WHERE
                    C.BUYER_CD = A.BUYER_CD
                    AND A.INVOICE_NO = D.INVOICE_NO
                    AND D.PO_AMT > 0
                    AND C.MOM_CD = 'NB'
                    AND ISNULL(A.DOCU_NO, '') <> ''
                GROUP BY
                    A.INVOICE_NO,
                    A.OUT_DATE,
                    C.BUYER_NAME
                HAVING
                    SUM(ROUND(D.PO_AMT, 2)) - ISNULL(ROUND(SUM(B.BILL_AMT_ORG), 2), 0) > 0
                UNION
                SELECT
                    A.INVOICE_NO,
                    'KRW' AS CURR_CD,
                    (ROUND(A.VOS_AMT + A.VAT_AMT, 2)) AS TOT_AMT,
                    A.VAT_DATE AS SHIP_DATE,
                    A.VAT_DATE AS DUE_DATE,
                    (
                        ROUND(A.VOS_AMT + A.VAT_AMT, 2) - ISNULL(ROUND(SUM(B.BILL_AMT_ORG), 2), 0)
                    ) AS BALANCE,
                    C.BUYER_NAME
                FROM
                    KSV_INVOICE_MST A
                    LEFT JOIN KSV_INVOICE_BILL B ON B.INVOICE_NO = A.INVOICE_NO,
                    KCD_BUYER C
                WHERE
                    C.BUYER_CD = A.BUYER_CD
                    AND A.VOS_AMT + A.VAT_AMT > 0
                    AND C.MOM_CD = 'NB'
                    AND A.TRADE_TYPE = '2'
                    AND A.TRADE_TYPE2 = '5'
                    AND A.DUE_DATE >= '20230101'
                    AND B.BILL_TYPE IN ('1', '3')
                GROUP BY
                    A.INVOICE_NO,
                    A.CURR_CD,
                    A.VOS_AMT,
                    A.VAT_AMT,
                    A.VAT_DATE,
                    A.VAT_DATE,
                    C.BUYER_NAME
                HAVING
                    ROUND(A.VOS_AMT + A.VAT_AMT, 2) - ISNULL(ROUND(SUM(B.BILL_AMT_ORG), 2), 0) > 0
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                INVOICE_NO: '',
                CURR_CD: '',
                TOT_AMT: 0,
                SHIP_DATE: '',
                DUE_DATE: '',
                BALANCE: 0,
                BUYER_NAME: '',
                ETC99: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S0708_3;
