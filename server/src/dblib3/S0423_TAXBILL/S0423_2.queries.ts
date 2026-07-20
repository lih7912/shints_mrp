import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0423_2 = {
    Query: {
        mgrQueryS0423_2: async (_, args) => {
            var tSQL = '';
            if (
                args.data.IS_CLOSEING_DATE !== '' &&
                args.data.S_IN_DATE !== ''
            ) {
                tSQL += `AND A3.END_DATE BETWEEN '${args.data.S_IN_DATE}' AND '${args.data.E_IN_DATE}' `;
            }
            if (args.data.IS_PAY_DATE !== '' && args.data.S_IN_DATE !== '') {
                tSQL += `AND A3.PAY_DATE BETWEEN '${args.data.S_IN_DATE}' AND '${args.data.E_IN_DATE}' `;
            }
            if (args.data.S_IN_DATE === '') {
                // tSQL += `AND B.END_DATE >= '20230101' `;
                tSQL += `AND A3.END_DATE BETWEEN '20231001' AND '20231230' `;
            }
            if (args.data.TAXBILL_KIND === '') {
                tSQL += `AND (A3.CALC_FLAG = '0' OR A3.CALC_FLAG IS NULL OR A3.CALC_FLAG = '') `;
            } else if (args.data.TAXBILL_KIND === 'A') {
            } else {
                tSQL += `AND A3.CALC_FLAG = '${args.data.TAXBILL_KIND}' `;
            }

            let sqlStr = `
                select
                    BILL_CD,
                    END_DATE,
                    VENDOR_NAME,
                    CURR_INPUT,
                    PAY_CURR_CD,
                    GW_STATUS,
                    CALC_FLAG,
                    PUR_APP,
                    TT_FLAG,
                    PAY_DATE,
                    TAXBILL_DATE,
                    PUR_FACTORY,
                    REMARK,
                    PAY_REPORT,
                    VENDOR_CD,
                    PAY_TERM,
                    CALC_FLAG2,
                    PUR_APP2,
                    TT_FLAG2,
                    CRDB_CD,
                    PUR_FACTORY_CD,
                    GW_KEY,
                    OLD_PAY_DATE,
                    VENDOR_TYPE,
                    TEMP,
                    TAXBILL_CD,
                    PAY_BANK,
                    ACCOUNT_NAME,
                    STSIN_CD,
                    INVOICE_NAME,
                    BANK_BRANCH,
                    ACCOUNT_NO,
                    SFTCODE,
                    BANK_NAME,
                    sum(IN_AMT) as IN_AMT,
                    sum(DEPOSIT_AMT) as DEPOSIT_AMT,
                    sum(LC_AMT) as LC_AMT,
                    sum(CLOSING_AMT) as CLOSING_AMT,
                    sum(DC_AMOUNT) as DC_AMOUNT,
                    sum(DN_AMOUNT) as DN_AMOUNT,
                    sum(TAX) as TAX,
                    sum(PAY_AMOUNT) as PAY_AMOUNT,
                    sum(KRW_AMOUNT) as KRW_AMOUNT
                from
                    (
                        SELECT
                            A3.BILL_CD,
                            A3.END_DATE,
                            A1.VENDOR_NAME,
                            A3.IN_AMT,
                            A3.DEPOSIT_AMT,
                            A3.LC_AMT,
                            A3.CLOSING_AMT,
                            isnull(A4.DC_AMOUNT, 0) as DC_AMOUNT,
                            isnull(A4.DN_AMOUNT, 0) as DN_AMOUNT,
                            isnull(A4.CURR_RATE, 0) as CURR_INPUT,
                            isnull(A3.TAX, 0) as TAX,
                            (
                                A3.CLOSING_AMT + isnull(A3.TAX, 0) - isnull(A4.DC_AMOUNT, 0) - isnull(A4.DN_AMOUNT, 0)
                            ) as PAY_AMOUNT,
                            A3.IN_CURR_CD as PAY_CURR_CD,
                            isnull(A4.KRW_AMOUNT, '0') as KRW_AMOUNT,
                            A3.GW_STATUS,
                            (
                                CASE
                                    WHEN A3.CALC_FLAG <> '1' THEN 'X'
                                    WHEN A3.CALC_FLAG = '1' THEN 'O'
                                END
                            ) AS CALC_FLAG,
                            ISNULL(A3.PUR_APP, 'X') AS PUR_APP,
                            (
                                CASE
                                    WHEN A3.TT_FLAG <> '1' THEN 'O'
                                    ELSE 'X'
                                END
                            ) AS TT_FLAG,
                            -- A3.PAY_DATE,  
                            '' AS PAY_DATE,
                            '' AS TAXBILL_DATE,
                            -- isnull(A5.WARE_NAME, '') AS PUR_FACTORY, 
                            -- isnull(A3.REMARK, '') AS REMARK, 
                            -- isnull(A.PAY_REPORT,   '') AS PAY_REPORT,
                            '' AS PUR_FACTORY,
                            '' AS REMARK,
                            '' AS PAY_REPORT,
                            A1.VENDOR_CD,
                            -- A1.PAY_TERM , 
                            '0' as PAY_TERM,
                            A3.CALC_FLAG AS CALC_FLAG2,
                            A3.PUR_APP AS PUR_APP2,
                            A3.TT_FLAG AS TT_FLAG2,
                            -- ISNULL(A4.CRDB_CD,'') AS CRDB_CD, 
                            '' AS CRDB_CD,
                            ISNULL(A5.WARE_CD, '') AS PUR_FACTORY_CD,
                            ISNULL(A3.GW_KEY, '') AS GW_KEY,
                            -- A.PAY_DATE AS OLD_PAY_DATE , 
                            '' AS OLD_PAY_DATE,
                            A1.VENDOR_TYPE,
                            '0' AS TEMP,
                            isnull(A3.TAXBILL_CD, '') AS TAXBILL_CD,
                            isnull(A3.PAY_BANK, '') AS PAY_BANK,
                            isnull(A6.ACCOUNT_NAME, '-') AS ACCOUNT_NAME,
                            -- A3.STSIN_CD, 
                            '' as STSIN_CD,
                            isnull(A1.INVOICE_NAME, '-') AS INVOICE_NAME,
                            isnull(A6.BANK_BRANCH, '-') AS BANK_BRANCH,
                            isnull(A6.ACCOUNT_NO, '-') AS ACCOUNT_NO,
                            isnull(A6.SFTCODE, '-') AS SFTCODE,
                            isnull(A6.BANK_NAME, '-') AS BANK_NAME
                        FROM
                            KSV_PU_MST2 A,
                            KCD_VENDOR A1,
                            ksv_stock_in_mst A3
                            left join ksv_dc_amount A4 ON A4.BILL_CD = A3.BILL_CD
                            --left join ksv_dc_amount A4 ON  A4.STSIN_CD = A3.STSIN_CD
                            --left join ksv_dc_amount A4 ON  A4.VENDOR_CD = A3.VENDOR_CD
                            --                           AND A4.END_DATE = A3.END_DATE
                            --                           AND A4.PAY_DATE = A3.PAY_DATE
                            --                           AND A4.CURR_CD = A3.IN_CURR_CD
                            --                           AND A4.STSIN_CD = A3.STSIN_CD
                            left join kcd_factory_ware A5 ON A5.WARE_CD = A3.PUR_FACTORY
                            left join kcd_bank A6 ON A6.BANK_CD = A3.PAY_BANK
                        WHERE
                            A.VENDOR_CD = A1.VENDOR_CD
                            AND A.PU_TYPE = '1'
                            and A.PU_CD = A3.PU_CD
                            -- and     A.BUYER_CD like '${args.data.BUYER_CD}%'
                            -- and     A.PO_CD2 like '%${args.data.PO_CD}%'
                            and A3.PAYER = '0'
                            and A3.END_FLAG = '1' ${tSQL}
                    ) S1
                group by
                    BILL_CD,
                    END_DATE,
                    VENDOR_NAME,
                    CURR_INPUT,
                    PAY_CURR_CD,
                    GW_STATUS,
                    CALC_FLAG,
                    PUR_APP,
                    TT_FLAG,
                    PAY_DATE,
                    TAXBILL_DATE,
                    PUR_FACTORY,
                    REMARK,
                    PAY_REPORT,
                    VENDOR_CD,
                    PAY_TERM,
                    CALC_FLAG2,
                    PUR_APP2,
                    TT_FLAG2,
                    CRDB_CD,
                    PUR_FACTORY_CD,
                    GW_KEY,
                    OLD_PAY_DATE,
                    VENDOR_TYPE,
                    TEMP,
                    TAXBILL_CD,
                    PAY_BANK,
                    ACCOUNT_NAME,
                    STSIN_CD,
                    INVOICE_NAME,
                    BANK_BRANCH,
                    ACCOUNT_NO,
                    SFTCODE,
                    BANK_NAME
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            console.log(tRet);

            return;

            var tRetArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tOne = { ...tRet[tIdx] };

                var tSql0 = `
                    select
                        a.status_cd,
                        isnull(a.curr_rate, '0'),
                        isnull(a.krw_amount, '0'),
                        a.taxbill_date,
                        a.approkey,
                        a.taxbill_cd,
                        a.pay_bank,
                        (
                            case
                                when isnull(a.pay_bank, '') <> '' then (
                                    select
                                        account_name
                                    from
                                        kcd_bank
                                    where
                                        bank_cd = a.pay_bank
                                )
                                else ''
                            end
                        ) as pay_account
                    from
                        KCD_GW_TAXBILL_KR A
                    where
                        a.bill_cd = '${tOne.BILL_CD}'
                        -- where a.taxbill_cd ='${tOne.TAXBILL_CD}' 
                        -- where a.stsin_cd ='${tOne.STSIN_CD}' 
                        -- where a.closing_date ='${tOne.END_DATE}' 
                        -- and a.curr_cd ='${tOne.PAY_CURR_CD}' 
                        -- and a.pay_date ='${tOne.PAY_DATE}' 
                        -- and a.doc_no ='${tOne.PAY_REPORT}' 
                        -- and a.vendor_cd = '${tOne.VENDOR_CD}' 
                        -- and a.pur_app = '${tOne.PUR_APP2}' 
                        -- and a.pur_factory ='${tOne.PUR_FACTORY_CD}' 
                        -- and a.tt_flag = '${tOne.TT_FLAG2}'
                `;
                var tRet0 = [];
                if (tOne.CALC_FLAG2 === '1')
                    tRet0 = await prisma.$queryRaw(Prisma.raw(tSql0));
                if (tOne.CALC_FLAG2 === '1' && tRet0.length > 0) {
                    tOne.GW_STATUS = '';
                    if (
                        tRet0[0].status_cd === '0' ||
                        tRet0[0].status_cd === '5' ||
                        tRet0[0].status_cd === '4'
                    )
                        tOne.GW_STATUS = '';
                    else if (tRet0[0].status_cd === '1')
                        tOne.GW_STATUS = '상신';
                    else if (tRet0[0].status_cd === '2')
                        tOne.GW_STATUS = '종결';
                    else if (tRet0[0].status_cd === '3')
                        tOne.GW_STATUS = '반려';
                    else if (tRet0[0].status_cd === '4')
                        tOne.GW_STATUS = '보관';
                    if (
                        tRet0[0].status_cd === '1' ||
                        tRet0[0].status_cd === '2'
                    ) {
                        tOne.CURR_INPUT = tRet0[0].curr_rate;
                        tOne.KRW_AMOUNT = tRet0[0].krw_amount;
                    }
                    tOne.TAXBILL_DATE = tRet0[0].taxbill_date;
                    tOne.GW_KEY = tRet0[0].approkey;
                    tOne.TAXBILL_CD = tRet0[0].taxbill_cd;
                    tOne.PAY_BANK = tRet0[0].pay_bank;
                    tOne.ACCOUNT_NAME = tRet0[0].pay_account;
                }

                if (tOne.CALC_FLAG2 === '0') {
                    if (tOne.TT_FLAG === 'X' && tOne.PUR_APP === 'X') {
                        if (tOne.MINUS <= 0) {
                            if (
                                tOne.PAY_CURR_CD === 'KRW' ||
                                tOne.PAY_CURR_CD === 'VND'
                            ) {
                                tOne.TOTAL_AMOUNT = tOne.PAY_AMOUNT * 0.1;
                            } else {
                                tOne.TOTAL_AMOUNT = tOne.PAY_AMOUNT * 0.1;
                            }
                        } else {
                            if (
                                tOne.PAY_CURR_CD === 'KRW' ||
                                tOne.PAY_CURR_CD === 'VND'
                            ) {
                                tOne.TAX = tOne.MINUS * 0.1;
                                tOne.TOTAL_AMOUNT = tOne.TAX + tOne.MINUS;
                            } else {
                                tOne.TAX = tOne.MINUS * 0.1;
                                tOne.TOTAL_AMOUNT = tOne.TAX + tOne.MINUS;
                            }
                        }
                    }
                }
                tRetArray.push(tOne);
            }
            return tRetArray;
        },
    },
};

export default moduleQuery_S0423_2;
