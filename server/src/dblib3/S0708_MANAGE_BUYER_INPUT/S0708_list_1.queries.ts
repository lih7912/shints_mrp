import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0708_LIST_1 = {
    Query: {
        mgrQueryS0708_LIST_1: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var sDate = args.data.S_BILL_DATE;
            var eDate = args.data.E_BILL_DATE;
            if (sDate === '') {
                sDate = `${tRetDate.substring(0, 4)}0101`;
            }
            if (eDate === '') {
                eDate = tRetDate1;
            }

            var tSQL = `      AND A.BILL_DATE BETWEEN '${sDate}' AND '${eDate}'`;
            if (args.data.REF_NO !== '') tSQL = '';

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
                    D.MOM_CD,
                    A.REG_DATETIME,
                    A.REG_USER,
                    A.REMARK
                FROM
                    KSV_INVOICE_PREBILL A
                    LEFT JOIN KCD_BANK B ON B.BANK_CD = A.BANK_CD
                    LEFT JOIN KSV_INVOICE_BILL C ON C.REF_NO = A.REF_NO
                    AND C.INVOICE_NO <> '미정'
                    AND A.PRE_FLAG = C.PRE_FLAG,
                    KCD_BUYER D
                WHERE
                    A.BUYER_CD = D.BUYER_CD
                    AND (D.BUYER_CD LIKE '%${args.data.BUYER_CD}%')
                    --			AND A.BUYER_CD LIKE '%%' 
                    AND A.REF_NO LIKE '%${args.data.REF_NO}%' ${tSQL}
                    AND A.END_FLAG LIKE '%${args.data.END_TYPE}%'
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
                    A.REG_DATETIME,
                    A.REG_USER,
                    A.REMARK
                ORDER BY
                    A.REF_NO
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
            tRet.forEach((col, i) => {
                var tObj = { ...col };
                tObj.PRE_FLAG_N = '';
                if (tObj.PRE_FLAG === '1') tObj.PRE_FLAG_N = '선수금';
                if (tObj.PRE_FLAG === '2') tObj.PRE_FLAG_N = '가입금';
                if (tObj.PRE_FLAG === '3') tObj.PRE_FLAG_N = '상계용';

                tObj.END_FLAG_N = '';
                if (tObj.END_FLAG === '1') tObj.END_FLAG_N = 'End';
                if (tObj.END_FLAG === '2') tObj.END_FLAG_N = 'Check';
                if (tObj.END_FLAG === '3') tObj.END_FLAG_N = 'Part';
                if (tObj.END_FLAG === '4') tObj.END_FLAG_N = 'EC';

                if (parseFloat(tObj.CHECK_AMT) <= 0) tObj.CHECK_AMT = '0';

                tRetArray.push(tObj);
            });
            return tRetArray;
        },
    },
};

export default moduleQuery_S0708_LIST_1;
