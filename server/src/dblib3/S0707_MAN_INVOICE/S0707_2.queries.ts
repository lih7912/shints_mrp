import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0707_2 = {
    Query: {
        mgrQueryS0707_2: async (_, args, contextValue) => {
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

            /*
      var sqlStr = `
          SELECT
              A.REF_NO,
              isnull(B.BANK_NAME, '') as BANK_NAME,
              isnull(B.BANK_CD, '') as BANK_CD,
              A.BUYER_CD,
              A.BILL_DATE,
              A.CURR_CD,
              (
                  ROUND(ISNULL(A.TOT_AMT, 0), 2) + ROUND(ISNULL(A.CHARGE, 0), 2)
              ) as BILL_AMT,
              (
                  ROUND(ISNULL(SUM(C.BILL_AMT), 0), 2) - ROUND(ISNULL(E.CREDIT_AMT, 0), 2)
              ) as CHECK_AMT,
              (
                  ROUND(ISNULL(A.TOT_AMT, 0), 2) + ROUND(ISNULL(A.CHARGE, 0), 2) + ROUND(ISNULL(E.CREDIT_AMT, 0), 2) - ROUND(ISNULL(SUM(C.BILL_AMT), 0), 2)
              ) AS BALANCE,
              A.END_FLAG,
              A.PRE_FLAG,
              (ROUND(isnull(A.TOT_AMT, 0), 2)) AS TOT_AMT,
              (ROUND(isnull(E.CREDIT_AMT, 0), 2)) AS CREDIT_AMT,
              (ROUND(isnull(A.CHARGE, 0), 2)) as CHARGE,
              D.BUYER_NAME,
              A.REG_USER,
              A.REG_DATETIME,
              A.REMARK,
              '' as END_FLAG_N,
              '' as PRE_FLAG_N
          FROM
              KSV_INVOICE_PREBILL A
              LEFT JOIN KCD_BANK B ON B.BANK_CD = A.BANK_CD
              LEFT JOIN KSV_INVOICE_BILL C ON C.REF_NO = A.REF_NO
              AND C.INVOICE_NO <> '미정'
              AND C.BUYER_CD = A.BUYER_CD
              LEFT JOIN KCD_BUYER D ON D.BUYER_CD = A.BUYER_CD
              LEFT JOIN KSV_INVOICE_CREDIT E ON A.REF_NO = E.REF_NO
          WHERE
              A.BUYER_CD LIKE '%${args.data.BUYER_CD}%'
              AND A.REF_NO LIKE '%${args.data.REF_NO}%'
              AND A.END_FLAG LIKE '%${args.data.END_FLAG}%'
              AND A.PRE_FLAG LIKE '%${args.data.PRE_FLAG}%'
              AND A.BILL_DATE BETWEEN '${sDate}' AND '${eDate}'
              AND A.PRE_FLAG <> '3'
          GROUP BY
              A.REF_NO,
              B.BANK_NAME,
              B.BANK_CD,
              A.BUYER_CD,
              A.BILL_DATE,
              A.CURR_CD,
              A.TOT_AMT,
              E.CREDIT_AMT,
              A.CHARGE,
              A.END_FLAG,
              A.PRE_FLAG,
              D.BUYER_NAME,
              A.REG_USER,
              A.REG_DATETIME,
              A.REMARK
          ORDER BY
              A.REF_NO
      `;
*/
            var sqlStr = `
                SELECT
                    A.REF_NO,
                    isnull(B.BANK_NAME, '') as BANK_NAME,
                    isnull(B.BANK_CD, '') as BANK_CD,
                    A.BUYER_CD,
                    A.BILL_DATE,
                    A.CURR_CD,
                    (
                        ROUND(ISNULL(A.TOT_AMT, 0), 2) + ROUND(ISNULL(A.CHARGE, 0), 2)
                    ) as BILL_AMT,
                    (
                        ROUND(ISNULL(SUM(C.BILL_AMT), 0), 2) - ROUND(ISNULL(A.CREDIT_AMT, 0), 2)
                    ) as CHECK_AMT,
                    (
                        ROUND(ISNULL(A.TOT_AMT, 0), 2) + ROUND(ISNULL(A.CHARGE, 0), 2) + ROUND(ISNULL(A.CREDIT_AMT, 0), 2) - ROUND(ISNULL(SUM(C.BILL_AMT), 0), 2)
                    ) AS BALANCE,
                    A.END_FLAG,
                    A.PRE_FLAG,
                    (ROUND(isnull(A.TOT_AMT, 0), 2)) AS TOT_AMT,
                    (ROUND(isnull(A.CREDIT_AMT, 0), 2)) AS CREDIT_AMT,
                    (ROUND(isnull(A.CHARGE, 0), 2)) as CHARGE,
                    D.BUYER_NAME,
                    A.REG_USER,
                    A.REG_DATETIME,
                    A.REMARK,
                    '' as END_FLAG_N,
                    '' as PRE_FLAG_N
                FROM
                    KSV_INVOICE_PREBILL A
                    LEFT JOIN KCD_BANK B ON B.BANK_CD = A.BANK_CD
                    LEFT JOIN KSV_INVOICE_BILL C ON C.REF_NO = A.REF_NO
                    AND C.INVOICE_NO <> '미정'
                    AND C.BUYER_CD = A.BUYER_CD
                    LEFT JOIN KCD_BUYER D ON D.BUYER_CD = A.BUYER_CD
                WHERE
                    A.BUYER_CD LIKE '%${args.data.BUYER_CD}%'
                    AND A.REF_NO LIKE '%${args.data.REF_NO}%'
                    AND A.END_FLAG LIKE '%${args.data.END_FLAG}%'
                    AND A.PRE_FLAG LIKE '%${args.data.PRE_FLAG}%'
                    AND A.BILL_DATE BETWEEN '${sDate}' AND '${eDate}'
                    AND A.PRE_FLAG <> '3'
                GROUP BY
                    A.REF_NO,
                    B.BANK_NAME,
                    B.BANK_CD,
                    A.BUYER_CD,
                    A.BILL_DATE,
                    A.CURR_CD,
                    A.TOT_AMT,
                    A.CREDIT_AMT,
                    A.CHARGE,
                    A.END_FLAG,
                    A.PRE_FLAG,
                    D.BUYER_NAME,
                    A.REG_USER,
                    A.REG_DATETIME,
                    A.REMARK
                ORDER BY
                    A.REF_NO
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {};
            var tRetArray = [];
            tRet.forEach((col, i) => {
                var tObj = { ...col };
                if (tObj.END_FLAG === '1') tObj.END_FLAG_N = 'End';
                else if (tObj.END_FLAG === '2') tObj.END_FLAG_N = 'Check';
                else if (tObj.END_FLAG === '3') tObj.END_FLAG_N = 'Part';
                else if (tObj.END_FLAG === '4') tObj.END_FLAG_N = 'EC';

                if (tObj.PRE_FLAG === '1') tObj.PRE_FLAG_N = '선수금';
                else if (tObj.PRE_FLAG === '2') tObj.PRE_FLAG_N = '가입금';
                else if (tObj.PRE_FLAG === '3') tObj.PRE_FLAG_N = '상계용';

                if (parseFloat(tObj.CHECK_AMT) <= 0) tObj.CHECK_AMT = '0';

                tRetArray.push(tObj);
            });

            var tIdx = 0;
            return tRetArray;
        },

        mgrQueryS0707_2_REF_NO: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            if (args.data.BILL_TYPE === '3') {
                // 상계용
                var tPre = `OFFSET${tRetDate1.substring(2, 4)}-${args.data.BUYER_CD}-`;
                var sqlStr = `
                    select
                        (isnull(max(Right(ref_no, 4)), 0) + 1) as max_seq
                    from
                        ksv_invoice_prebill
                    where
                        ref_no like '${tPre}%'
                `;
                var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
                var tMaxSeq = 1;
                if (tRet.length > 0) tMaxSeq = parseInt(tRet[0].max_seq);

                var tMaxStr = AFLib.printF(tMaxSeq, 4);
                var tRefNo = `${tPre}${tMaxStr}`;
                var tRetArray = [];
                var tObj = {};
                tObj.REF_NO = tRefNo;
                tObj.MESSAGE = '자동생성된 상계용 REF_NO';
                tRetArray.push(tObj);
                return tRetArray;
            } else {
                var sqlStr = `
                    select
                        REF_NO
                    from
                        ksv_invoice_prebill
                    where
                        ref_no = '${args.data.REF_NO}'
                `;
                var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
                var tIdx = 0;
                var tRetArray = [];
                tRet.forEach((col, i) => {
                    var tObj = {};
                    tObj.REF_NO = col.REF_NO;
                    tObj.MESSAGE = '';
                    tRetArray.push(tObj);
                });
                return tRetArray;
            }
        },
    },
};

export default moduleQuery_S0707_2;
