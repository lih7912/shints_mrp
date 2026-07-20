import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0708_2 = {
    Query: {
        mgrQueryS0708_2: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }
            let sqlStr = `
                SELECT
                    A.REF_NO,
                    B.BANK_NAME,
                    A.BUYER_CD,
                    A.BILL_DATE,
                    A.CURR_CD,
                    (
                        ISNULL(A.TOT_AMT, 0) + ROUND(ISNULL(A.CHARGE, 0), 2)
                    ) AS BILL_AMT,
                    (
                        ROUND(ISNULL(SUM(C.BILL_AMT), 0), 2) - ROUND(ISNULL(A.CREDIT_AMT, 0), 2)
                    ) AS CHECK_AMT,
                    (
                        ROUND(ISNULL(A.TOT_AMT, 0), 2) + ROUND(ISNULL(A.CHARGE, 0), 2) - ROUND(ISNULL(SUM(C.BILL_AMT), 0), 2) + ROUND(ISNULL(A.CREDIT_AMT, 0), 2)
                    ) AS BALANCE,
                    A.END_FLAG,
                    A.PRE_FLAG,
                    ROUND(A.TOT_AMT, 2) AS TOT_AMT,
                    ROUND(A.CREDIT_AMT, 2) AS CREDIT_AMT,
                    ROUND(A.CHARGE, 2) AS CHARGE,
                    D.BUYER_NAME,
                    A.BANK_CD,
                    A.PRE_FLAG,
                    D.MOM_CD,
                    A.REG_DATETIME
                FROM
                    KSV_INVOICE_PREBILL A
                    LEFT JOIN KCD_BANK B ON B.BANK_CD = A.BANK_CD
                    LEFT JOIN KSV_INVOICE_BILL C ON C.REF_NO = A.REF_NO,
                    KCD_BUYER D
                WHERE
                    A.BUYER_CD = D.BUYER_CD
                    AND D.MOM_CD LIKE '%%'
                    --			AND A.BUYER_CD LIKE '%%' 
                    AND A.BILL_DATE BETWEEN '20230101' AND '20231231'
                    AND C.INVOICE_NO <> '미정'
                    AND A.PRE_FLAG = C.PRE_FLAG
                    AND A.END_FLAG LIKE '%'
                GROUP BY
                    A.REF_NO,
                    B.BANK_NAME,
                    A.BUYER_CD,
                    A.BILL_DATE,
                    A.CURR_CD,
                    A.TOT_AMT,
                    A.CREDIT_AMT,
                    A.CHARGE,
                    A.END_FLAG,
                    A.PRE_FLAG,
                    D.BUYER_NAME,
                    A.BANK_CD,
                    D.MOM_CD,
                    A.REG_DATETIME
                ORDER BY
                    A.REG_DATETIME DESC
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                REF_NO: '',
                BANK_NAME: '',
                BUYER_CD: '',
                BILL_DATE: '',
                CURR_CD: '',
                BILL_AMT: 0,
                CHECK_AMT: 0,
                BALANCE: 0,
                END_FLAG: '',
                PRE_FLAG: '',
                TOT_AMT: 0,
                CREDIT_AMT: 0,
                CHARGE: 0,
                BUYER_NAME: '',
                BANK_CD: '',
                PRE_FLAG: '',
                MOM_CD: '',
                REG_DATETIME: '',
                ETC99: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S0708_2;
