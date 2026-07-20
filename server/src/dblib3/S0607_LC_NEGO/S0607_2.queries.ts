import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0607_2 = {
    Query: {
        mgrQueryS0607_2: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tSQL = '';
            var sDate = args.data.S_DATE;
            var eDate = args.data.E_DATE;
            if (sDate === '') {
                sDate = tRetDate1.substring(0, 4) + '0101';
            }
            if (eDate === '') {
                eDate = tRetDate1;
            }
            tSQL = `AND A.START_DATE BETWEEN '${sDate}' AND '${eDate}'  `;

            let buyerCdClause = '';

            if (args.data.BUYER_CD == 'MG') {
                buyerCdClause = `AND A.BUYER_CD in ('MG', 'MJ')`;
            } else {
                buyerCdClause = `AND A.BUYER_CD like '%${args.data.BUYER_CD}%' `;
            }

            let sqlStr = `
                SELECT
                    A.REF_NO,
                    A.TOT_AMT,
                    A.CURR_CD,
                    A.START_DATE,
                    A.END_DATE,
                    A.BILL_DATE,
                    A.DELAY_DAYS,
                    A.DELAY_INTEREST,
                    A.LESS_CHARGE,
                    B.BANK_NAME,
                    A.BANK_CD,
                    A.BUYER_CD,
                    D.BUYER_NAME,
                    ISNULL(A.EXCHANGE_COMM, '0') AS EXCHANGE_COMM,
                    ISNULL(A.HANDLING_CHARGE, '0') AS HANDLING_CHARGE,
                    ISNULL(A.POSTAGE, '0') AS POSTAGE,
                    ISNULL(
                        A.EXCHANGE_COMM + A.HANDLING_CHARGE + A.POSTAGE,
                        '0'
                    ) AS AMT_WON,
                    ISNULL(
                        (A.EXCHANGE_COMM + A.HANDLING_CHARGE + A.POSTAGE) * C.WON_AMT2,
                        '0'
                    ) AS AMT_CURR,
                    (
                        ISNULL(
                            (A.EXCHANGE_COMM + A.HANDLING_CHARGE + A.POSTAGE) * C.WON_AMT2,
                            '0'
                        ) + A.DELAY_INTEREST + A.LESS_CHARGE
                    ) AS TOT_AMT2,
                    E.CD_NAME AS INVOICE_NEGO_TYPE_N,
                    A.INVOICE_NEGO_TYPE
                FROM
                    KSV_INVOICE_NEGO A,
                    KCD_BANK B,
                    KCD_BUYER D,
                    KCD_CURRENCY C,
                    KCD_CODE E
                WHERE
                    A.REF_NO LIKE '%${args.data.REF_NO}%'
                    -- aND ((D.BUYER_CD LIKE '%${args.data.BUYER_CD}%')
                    --  or (D.MOM_CD like '%${args.data.BUYER_CD}%'))
                    ${tSQL}
                    AND B.BANK_CD = A.BANK_CD
                    AND D.BUYER_CD = A.BUYER_CD ${buyerCdClause}
                    -- AND C.START_DATE=A.START_DATE 
                    AND C.START_DATE = (
                        select
                            max(START_DATE)
                        from
                            kcd_currency
                        where
                            curr_cd = A.CURR_CD
                    )
                    AND A.CURR_CD = C.CURR_CD
                    AND A.INVOICE_NEGO_TYPE = E.CD_CODE
                    AND E.CD_GROUP = 'INVOICE_NEGO_TYPE'
                    -- ORDER BY A.REF_NO 
                ORDER BY
                    A.START_DATE desc
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {};
            var tRetArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tOne = { ...tRet[tIdx] };

                let sql0 = `
                    select
                        isnull(sum(bill_amt), 0) as s_bill_amt
                    from
                        ksv_invoice_bill
                    where
                        ref_no = '${tOne.REF_NO}'
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));

                if (tRet0.length > 0 && parseFloat(tRet0[0].s_bill_amt) > 0) {
                    var tBalAmt =
                        parseFloat(tOne.TOT_AMT) -
                        parseFloat(tRet0[0].s_bill_amt);
                    tOne.BAL_AMT = String(tBalAmt);
                } else {
                    tOne.BAL_AMT = String(tOne.TOT_AMT);
                }
                tRetArray.push(tOne);
            }
            return tRetArray;
        },
    },
};

export default moduleQuery_S0607_2;
