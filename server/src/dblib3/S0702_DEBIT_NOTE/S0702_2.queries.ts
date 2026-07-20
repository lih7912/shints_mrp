import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0702_2 = {
    Query: {
        mgrQueryS0702_2: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var sDate = args.data.S_ISSUE_DATE;
            var eDate = args.data.E_ISSUE_DATE;
            if (eDate === '') eDate = tRetDate1;
            if (sDate === '') sDate = `${tRetDate1.substring(0, 4)}0101`;

            var sqlStr = `
                SELECT
                    (
                        CASE
                            WHEN A.CHARGER = 'CHELSEA' THEN 'SMC'
                            WHEN A.CHARGER = 'KEVIN' THEN 'SMC'
                            WHEN A.CHARGER = 'JOE' THEN 'SMC'
                            WHEN A.CHARGER = 'LAUREN' THEN 'SMC'
                            WHEN A.BUYER_CD = 'FC034' THEN 'SMC'
                            WHEN A.BUYER_CD = 'FC044' THEN 'SMC'
                            ELSE I.CD_NAME
                        END
                    ) AS CHARGER_TEAM,
                    A.CRDB_CD,
                    A.CRDB_SEQ,
                    A.CRDB_DATE,
                    B.COM_NAME AS MESSER,
                    (
                        (
                            CASE
                                WHEN ISNUMERIC(CONVERT(VARCHAR(100), A.CRDB_AMT)) = 1 THEN CONVERT(FLOAT, A.CRDB_AMT)
                                ELSE 0
                            END
                        )
                        + (
                            CASE
                                WHEN ISNUMERIC(CONVERT(VARCHAR(100), A.VAT)) = 1 THEN CONVERT(FLOAT, A.VAT)
                                ELSE 0
                            END
                        )
                    ) AS CRDB_AMT,
                    (
                        (
                            (
                                CASE
                                    WHEN ISNUMERIC(CONVERT(VARCHAR(100), A.CRDB_AMT)) = 1 THEN CONVERT(FLOAT, A.CRDB_AMT)
                                    ELSE 0
                                END
                            )
                            + (
                                CASE
                                    WHEN ISNUMERIC(CONVERT(VARCHAR(100), A.VAT)) = 1 THEN CONVERT(FLOAT, A.VAT)
                                    ELSE 0
                                END
                            )
                            - ISNULL(EM.END_AMT, 0)
                        )
                    ) AS BALANCE,
                    ISNULL(EM.END_AMT, 0) AS END_AMT,
                    A.CURR_CD,
                    (
                        (
                            CASE
                                WHEN (
                                    CASE
                                        WHEN ISNUMERIC(CONVERT(VARCHAR(100), A.VAT)) = 1 THEN CONVERT(FLOAT, A.VAT)
                                        ELSE 0
                                    END
                                ) <> 0 THEN 0
                                ELSE (
                                    (
                                        CASE
                                            WHEN ISNUMERIC(CONVERT(VARCHAR(100), A.CRDB_AMT)) = 1 THEN CONVERT(FLOAT, A.CRDB_AMT)
                                            ELSE 0
                                        END
                                    )
                                    - ISNULL(
                                        SUM(
                                            CASE
                                                WHEN ISNUMERIC(CONVERT(VARCHAR(100), C.CRDB_AMT)) = 1 THEN CONVERT(FLOAT, C.CRDB_AMT)
                                                ELSE 0
                                            END
                                        ),
                                        0
                                    )
                                )
                            END
                        )
                        * (
                            CASE
                                WHEN ISNUMERIC(CONVERT(VARCHAR(100), F.USD_RATE)) = 1 THEN CONVERT(FLOAT, F.USD_RATE)
                                ELSE 0
                            END
                        )
                    ) AS USD_BAL,
                    CONVERT(NVARCHAR(4000), A.TITLE) AS TITLE,
                    A.CHARGER,
                    A.END_DATE,
                    CONVERT(NVARCHAR(4000), A.REMARK) AS REMARK,
                    (
                        CASE
                            WHEN UPPER(ISNULL(D.CD_NAME, '')) LIKE '%PART END%' THEN 'Regist'
                            WHEN UPPER(ISNULL(D.CD_NAME, '')) LIKE '%TAXBILL PART%' THEN 'Regist'
                            WHEN UPPER(ISNULL(D.CD_NAME, '')) LIKE '%TAXBILL END%' THEN (
                                CASE
                                    WHEN ISNULL(A.DOCU_NO, '') <> '' OR ISNULL(TX.DOCU_NO, '') <> '' THEN 'Taxbill End'
                                    ELSE 'Regist'
                                END
                            )
                            WHEN UPPER(ISNULL(D.CD_NAME, '')) LIKE '%END%'
                            AND (
                                CASE
                                    WHEN (
                                        CASE
                                            WHEN ISNUMERIC(CONVERT(VARCHAR(100), A.VAT)) = 1 THEN CONVERT(FLOAT, A.VAT)
                                            ELSE 0
                                        END
                                    ) <> 0 THEN 0
                                    ELSE (
                                        (
                                            CASE
                                                WHEN ISNUMERIC(CONVERT(VARCHAR(100), A.CRDB_AMT)) = 1 THEN CONVERT(FLOAT, A.CRDB_AMT)
                                                ELSE 0
                                            END
                                        )
                                        - ISNULL(
                                            SUM(
                                                CASE
                                                    WHEN ISNUMERIC(CONVERT(VARCHAR(100), C.CRDB_AMT)) = 1 THEN CONVERT(FLOAT, C.CRDB_AMT)
                                                    ELSE 0
                                                END
                                            ),
                                            0
                                        )
                                    )
                                END
                            ) = 0 THEN 'End'
                            ELSE D.CD_NAME
                        END
                    ) AS STATUS,
                    isnull(N.CD_NAME, '') as GW_STATUS,
                    A.PO_CD,
                    A.ORDER_CD,
                    isnull(A.BANK_CD, '') as BANK_CD,
                    isnull(C1.BANK_NAME, '') as BANK_NAME,
                    B.COM_CD AS MESSER_CD,
                    A.STATUS_CD,
                    A.BUYER_CD,
                    isnull(E.BUYER_NAME, '') as BUYER_NAME,
                    CONVERT(NVARCHAR(4000), A.PAYMENT_PLAN) AS PAYMENT_PLAN,
                    isnull(H.APPROKEY, '') as APPROKEY,
                    isnull(A.DOCU_NO, '') as DOCU_NO,
                    isnull(TX.DOCU_NO, '') as TAX_DOCU_NO,
                    A.END_USER,
                    A.REG_USER,
                    A.DEBIT_TYPE,
                    G.CD_NAME AS DEBIT_TYPE_NAME,
                    A.LINK_TO,
                    J.END_DATE AS END_DATE2,
                    I.CD_NAME AS BUYER_TEAM,
                    A.CONF_USER,
                    A.CONF_FLAG,
                    M.CD_NAME AS END_TYPE_NAME,
                    A.END_TYPE,
                    A.VAT,
                    F.USD_RATE,
                    isnull(CA.CA_NO, '') as CA_NO
                FROM
                    KSV_CRDB_MST A
                    LEFT JOIN KCD_BUYER E ON E.BUYER_CD = A.BUYER_CD
                    LEFT JOIN KSV_CRDB_MEM C ON C.CRDB_CD = A.CRDB_CD
                    LEFT JOIN (
                        SELECT
                            CRDB_CD,
                            SUM(
                                CASE
                                    WHEN ISNUMERIC(CONVERT(VARCHAR(100), CRDB_AMT)) = 1 THEN CONVERT(FLOAT, CRDB_AMT)
                                    ELSE 0
                                END
                            ) AS END_AMT
                        FROM
                            KSV_CRDB_MEM
                        GROUP BY
                            CRDB_CD
                    ) EM ON EM.CRDB_CD = A.CRDB_CD
                    LEFT JOIN KSV_TAX_MEM T ON T.INVOICE_NO = A.CRDB_CD AND T.ORDER_CD = 'DEBIT'
                    LEFT JOIN KSV_TAX_MST TX ON TX.TAX_CD = T.TAX_CD AND ISNULL(TX.DOCU_NO, '') <> ''
                    LEFT JOIN KCD_BANK C1 ON C1.BANK_CD = A.BANK_CD
                    LEFT JOIN KCD_GWCODE H ON H.DOC_NO = A.CRDB_CD
                    LEFT JOIN KCD_CODE N ON N.CD_GROUP = 'GW_STATUS' AND N.CD_CODE = H.STATUS_CD
                    LEFT JOIN (
                        SELECT
                            REMARK_S,
                            MAX(CRDB_CD) AS CA_NO
                        FROM
                            KSV_CRDB_MST
                        GROUP BY
                            REMARK_S
                    ) CA ON CA.REMARK_S = A.CRDB_CD,
                    KVW_COMPANY B,
                    KCD_CODE D,
                    KCD_CURRENCY F,
                    KCD_CODE G,
                    KCD_CODE I,
                    KSV_CRDB_MST J,
                    KCD_CODE M
                WHERE
                    A.CRDB_TYPE IN ('D', 'Z', 'DA')
                    AND A.CRDB_SEQ = (
                        SELECT
                            MAX(CRDB_SEQ)
                        FROM
                            KSV_CRDB_MST
                        WHERE
                            A.CRDB_CD = CRDB_CD
                    )
                    AND A.CRDB_DATE BETWEEN '${sDate}' AND '${eDate}'
                    AND ('${args.data.DEBIT_TYPE}' = '' OR A.DEBIT_TYPE = '${args.data.DEBIT_TYPE}')
                    AND A.CHARGER LIKE '%${args.data.CHARGER}%'
                    AND A.TITLE LIKE '%${args.data.TITLE}%'
                    AND A.BUYER_CD LIKE '%${args.data.BUYER_CD}%'
                    AND A.CRDB_CD = J.CRDB_CD
                    AND J.CRDB_SEQ = '1'
                    AND A.MESSER_CD LIKE '%${args.data.BILL_TO}%'
                    AND B.COM_CD = A.MESSER_CD
                    AND D.CD_GROUP = 'CREDIT_STATUS'
                    AND D.CD_CODE = A.STATUS_CD
                    AND G.CD_GROUP = 'DEBIT_TYPE'
                    AND G.CD_CODE = A.DEBIT_TYPE
                    AND I.CD_GROUP = 'BUYER_TEAM'
                    AND I.CD_CODE = isnull(E.BUYER_TEAM, '')
                    AND M.CD_GROUP = 'CREDIT_END_TYPE'
                    AND M.CD_CODE = A.END_TYPE
                    AND F.START_DATE = (
                        SELECT
                            MAX(START_DATE)
                        FROM
                            KCD_CURRENCY
                    )
                    AND F.CURR_CD = A.CURR_CD
                GROUP BY
                    A.CRDB_CD,
                    A.CRDB_SEQ,
                    A.CRDB_DATE,
                    B.COM_NAME,
                    A.CRDB_AMT,
                    A.CURR_CD,
                    A.TITLE,
                    A.CHARGER,
                    A.END_DATE,
                    A.REMARK,
                    D.CD_NAME,
                    A.PO_CD,
                    A.ORDER_CD,
                    A.BANK_CD,
                    C1.BANK_NAME,
                    B.COM_CD,
                    M.CD_NAME,
                    A.END_TYPE,
                    A.STATUS_CD,
                    A.BUYER_CD,
                    E.BUYER_NAME,
                    F.USD_RATE,
                    A.PAYMENT_PLAN,
                    N.CD_NAME,
                    H.APPROKEY,
                    A.DOCU_NO,
                    TX.DOCU_NO,
                    A.REG_USER,
                    A.DEBIT_TYPE,
                    G.CD_NAME,
                    A.LINK_TO,
                    I.CD_NAME,
                    J.END_DATE,
                    A.CONF_USER,
                    A.CONF_FLAG,
                    A.VAT,
                    CA.CA_NO,
                    A.END_USER,
                    EM.END_AMT
                HAVING
                    '${args.data.STATUS_CD}' = ''
                    OR (
                        CASE
                            WHEN UPPER(ISNULL(D.CD_NAME, '')) LIKE '%PART END%' THEN 'Regist'
                            WHEN UPPER(ISNULL(D.CD_NAME, '')) LIKE '%TAXBILL PART%' THEN 'Regist'
                            WHEN UPPER(ISNULL(D.CD_NAME, '')) LIKE '%TAXBILL END%' THEN (
                                CASE
                                    WHEN ISNULL(A.DOCU_NO, '') <> '' OR ISNULL(TX.DOCU_NO, '') <> '' THEN 'Taxbill End'
                                    ELSE 'Regist'
                                END
                            )
                            WHEN UPPER(ISNULL(D.CD_NAME, '')) LIKE '%END%'
                            AND (
                                CASE
                                    WHEN (
                                        CASE
                                            WHEN ISNUMERIC(CONVERT(VARCHAR(100), A.VAT)) = 1 THEN CONVERT(FLOAT, A.VAT)
                                            ELSE 0
                                        END
                                    ) <> 0 THEN 0
                                    ELSE (
                                        (
                                            CASE
                                                WHEN ISNUMERIC(CONVERT(VARCHAR(100), A.CRDB_AMT)) = 1 THEN CONVERT(FLOAT, A.CRDB_AMT)
                                                ELSE 0
                                            END
                                        )
                                        - ISNULL(
                                            SUM(
                                                CASE
                                                    WHEN ISNUMERIC(CONVERT(VARCHAR(100), C.CRDB_AMT)) = 1 THEN CONVERT(FLOAT, C.CRDB_AMT)
                                                    ELSE 0
                                                END
                                            ),
                                            0
                                        )
                                    )
                                END
                            ) = 0 THEN 'End'
                            ELSE D.CD_NAME
                        END
                    ) = ISNULL(
                        (
                            SELECT TOP 1
                                CASE
                                    WHEN UPPER(ISNULL(KS.CD_NAME, '')) LIKE '%PART END%' THEN 'Regist'
                                    WHEN UPPER(ISNULL(KS.CD_NAME, '')) LIKE '%TAXBILL PART%' THEN 'Regist'
                                    WHEN UPPER(ISNULL(KS.CD_NAME, '')) LIKE '%TAXBILL END%' THEN 'Taxbill End'
                                    WHEN UPPER(ISNULL(KS.CD_NAME, '')) LIKE '%END%' THEN 'End'
                                    ELSE KS.CD_NAME
                                END
                            FROM
                                KCD_CODE KS
                            WHERE
                                KS.CD_GROUP = 'CREDIT_STATUS'
                                AND KS.CD_CODE = '${args.data.STATUS_CD}'
                        ),
                        '${args.data.STATUS_CD}'
                    )
                    OR (
                        ISNULL(
                            (
                                SELECT TOP 1
                                    CASE
                                        WHEN UPPER(ISNULL(KS.CD_NAME, '')) LIKE '%PART END%' THEN 'Regist'
                                        WHEN UPPER(ISNULL(KS.CD_NAME, '')) LIKE '%TAXBILL PART%' THEN 'Regist'
                                        WHEN UPPER(ISNULL(KS.CD_NAME, '')) LIKE '%TAXBILL END%' THEN 'Taxbill End'
                                        WHEN UPPER(ISNULL(KS.CD_NAME, '')) LIKE '%END%' THEN 'End'
                                        ELSE KS.CD_NAME
                                    END
                                FROM
                                    KCD_CODE KS
                                WHERE
                                    KS.CD_GROUP = 'CREDIT_STATUS'
                                    AND KS.CD_CODE = '${args.data.STATUS_CD}'
                            ),
                            '${args.data.STATUS_CD}'
                        ) NOT IN ('End', 'Regist', 'Taxbill End')
                        AND (
                            CASE
                                WHEN UPPER(ISNULL(D.CD_NAME, '')) LIKE '%PART END%' THEN 'Regist'
                                WHEN UPPER(ISNULL(D.CD_NAME, '')) LIKE '%TAXBILL PART%' THEN 'Regist'
                                WHEN UPPER(ISNULL(D.CD_NAME, '')) LIKE '%TAXBILL END%' THEN (
                                    CASE
                                        WHEN ISNULL(A.DOCU_NO, '') <> '' OR ISNULL(TX.DOCU_NO, '') <> '' THEN 'Taxbill End'
                                        ELSE 'Regist'
                                    END
                                )
                                WHEN UPPER(ISNULL(D.CD_NAME, '')) LIKE '%END%'
                                AND (
                                    CASE
                                        WHEN (
                                            CASE
                                                WHEN ISNUMERIC(CONVERT(VARCHAR(100), A.VAT)) = 1 THEN CONVERT(FLOAT, A.VAT)
                                                ELSE 0
                                            END
                                        ) <> 0 THEN 0
                                        ELSE (
                                            (
                                                CASE
                                                    WHEN ISNUMERIC(CONVERT(VARCHAR(100), A.CRDB_AMT)) = 1 THEN CONVERT(FLOAT, A.CRDB_AMT)
                                                    ELSE 0
                                                END
                                            )
                                            - ISNULL(
                                                SUM(
                                                    CASE
                                                        WHEN ISNUMERIC(CONVERT(VARCHAR(100), C.CRDB_AMT)) = 1 THEN CONVERT(FLOAT, C.CRDB_AMT)
                                                        ELSE 0
                                                    END
                                                ),
                                                0
                                            )
                                        )
                                    END
                                ) = 0 THEN 'End'
                                ELSE D.CD_NAME
                            END
                        ) LIKE '%' + ISNULL(
                            (
                                SELECT TOP 1
                                    CASE
                                        WHEN UPPER(ISNULL(KS.CD_NAME, '')) LIKE '%PART END%' THEN 'Regist'
                                        WHEN UPPER(ISNULL(KS.CD_NAME, '')) LIKE '%TAXBILL PART%' THEN 'Regist'
                                        WHEN UPPER(ISNULL(KS.CD_NAME, '')) LIKE '%TAXBILL END%' THEN 'Taxbill End'
                                        WHEN UPPER(ISNULL(KS.CD_NAME, '')) LIKE '%END%' THEN 'End'
                                        ELSE KS.CD_NAME
                                    END
                                FROM
                                    KCD_CODE KS
                                WHERE
                                    KS.CD_GROUP = 'CREDIT_STATUS'
                                    AND KS.CD_CODE = '${args.data.STATUS_CD}'
                            ),
                            '${args.data.STATUS_CD}'
                        ) + '%'
                    )
                    -- ORDER BY A.CRDB_SEQ  DESC
                ORDER BY
                    A.CRDB_DATE desc,
                    A.CRDB_SEQ DESC
            `;
            try {
                var retArray = [];
                var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
                tRet.forEach((col,i) => {
                    var tObj = { ...col };
                    if (tObj.STATUS_CD === '2') tObj.STATUS = 'End';
                    retArray.push(tObj);
                });
                return retArray;
            } catch (e: any) {
                console.error('[S0702][mgrQueryS0702_2] query failed', {
                    message: e?.message,
                    code: e?.code,
                    meta: e?.meta,
                    cause: e?.cause,
                    sDate,
                    eDate,
                    argsData: args?.data,
                });
                console.error('[S0702][mgrQueryS0702_2] sql', sqlStr);
                throw e;
            }
        },
        mgrQueryS0702_2_BY_NUMBER: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var sDate = args.data.S_ISSUE_DATE;
            var eDate = args.data.E_ISSUE_DATE;
            if (eDate === '') eDate = tRetDate1;
            if (sDate === '') sDate = `${tRetDate1.substring(0, 4)}0101`;

            var sqlStr = `
                SELECT
                    (
                        CASE
                            WHEN A.CHARGER = 'CHELSEA' THEN 'SMC'
                            WHEN A.CHARGER = 'KEVIN' THEN 'SMC'
                            WHEN A.CHARGER = 'JOE' THEN 'SMC'
                            WHEN A.CHARGER = 'LAUREN' THEN 'SMC'
                            WHEN A.BUYER_CD = 'FC034' THEN 'SMC'
                            WHEN A.BUYER_CD = 'FC044' THEN 'SMC'
                            ELSE I.CD_NAME
                        END
                    ) AS CHARGER_TEAM,
                    A.CRDB_CD,
                    A.CRDB_SEQ,
                    A.CRDB_DATE,
                    B.COM_NAME AS MESSER,
                    (
                        (
                            CASE
                                WHEN ISNUMERIC(CONVERT(VARCHAR(100), A.CRDB_AMT)) = 1 THEN CONVERT(FLOAT, A.CRDB_AMT)
                                ELSE 0
                            END
                        )
                        + (
                            CASE
                                WHEN ISNUMERIC(CONVERT(VARCHAR(100), A.VAT)) = 1 THEN CONVERT(FLOAT, A.VAT)
                                ELSE 0
                            END
                        )
                    ) AS CRDB_AMT,
                    (
                        (
                            (
                                CASE
                                    WHEN ISNUMERIC(CONVERT(VARCHAR(100), A.CRDB_AMT)) = 1 THEN CONVERT(FLOAT, A.CRDB_AMT)
                                    ELSE 0
                                END
                            )
                            + (
                                CASE
                                    WHEN ISNUMERIC(CONVERT(VARCHAR(100), A.VAT)) = 1 THEN CONVERT(FLOAT, A.VAT)
                                    ELSE 0
                                END
                            )
                            - ISNULL(EM.END_AMT, 0)
                        )
                    ) AS BALANCE,
                    ISNULL(EM.END_AMT, 0) AS END_AMT,
                    A.CURR_CD,
                    (
                        (
                            CASE
                                WHEN (
                                    CASE
                                        WHEN ISNUMERIC(CONVERT(VARCHAR(100), A.VAT)) = 1 THEN CONVERT(FLOAT, A.VAT)
                                        ELSE 0
                                    END
                                ) <> 0 THEN 0
                                ELSE (
                                    (
                                        CASE
                                            WHEN ISNUMERIC(CONVERT(VARCHAR(100), A.CRDB_AMT)) = 1 THEN CONVERT(FLOAT, A.CRDB_AMT)
                                            ELSE 0
                                        END
                                    )
                                    - ISNULL(
                                        SUM(
                                            CASE
                                                WHEN ISNUMERIC(CONVERT(VARCHAR(100), C.CRDB_AMT)) = 1 THEN CONVERT(FLOAT, C.CRDB_AMT)
                                                ELSE 0
                                            END
                                        ),
                                        0
                                    )
                                )
                            END
                        )
                        * (
                            CASE
                                WHEN ISNUMERIC(CONVERT(VARCHAR(100), F.USD_RATE)) = 1 THEN CONVERT(FLOAT, F.USD_RATE)
                                ELSE 0
                            END
                        )
                    ) AS USD_BAL,
                    CONVERT(NVARCHAR(4000), A.TITLE) AS TITLE,
                    A.CHARGER,
                    A.END_DATE,
                    CONVERT(NVARCHAR(4000), A.REMARK) AS REMARK,
                    (
                        CASE
                            WHEN UPPER(ISNULL(D.CD_NAME, '')) LIKE '%PART END%' THEN 'Regist'
                            WHEN UPPER(ISNULL(D.CD_NAME, '')) LIKE '%TAXBILL PART%' THEN 'Regist'
                            WHEN UPPER(ISNULL(D.CD_NAME, '')) LIKE '%TAXBILL END%' THEN (
                                CASE
                                    WHEN ISNULL(A.DOCU_NO, '') <> '' OR ISNULL(TX.DOCU_NO, '') <> '' THEN 'Taxbill End'
                                    ELSE 'Regist'
                                END
                            )
                            WHEN UPPER(ISNULL(D.CD_NAME, '')) LIKE '%END%'
                            AND (
                                CASE
                                    WHEN (
                                        CASE
                                            WHEN ISNUMERIC(CONVERT(VARCHAR(100), A.VAT)) = 1 THEN CONVERT(FLOAT, A.VAT)
                                            ELSE 0
                                        END
                                    ) <> 0 THEN 0
                                    ELSE (
                                        (
                                            CASE
                                                WHEN ISNUMERIC(CONVERT(VARCHAR(100), A.CRDB_AMT)) = 1 THEN CONVERT(FLOAT, A.CRDB_AMT)
                                                ELSE 0
                                            END
                                        )
                                        - ISNULL(
                                            SUM(
                                                CASE
                                                    WHEN ISNUMERIC(CONVERT(VARCHAR(100), C.CRDB_AMT)) = 1 THEN CONVERT(FLOAT, C.CRDB_AMT)
                                                    ELSE 0
                                                END
                                            ),
                                            0
                                        )
                                    )
                                END
                            ) = 0 THEN 'End'
                            ELSE D.CD_NAME
                        END
                    ) AS STATUS,
                    isnull(N.CD_NAME, '') as GW_STATUS,
                    A.PO_CD,
                    A.ORDER_CD,
                    isnull(A.BANK_CD, '') as BANK_CD,
                    isnull(C1.BANK_NAME, '') as BANK_NAME,
                    B.COM_CD AS MESSER_CD,
                    A.STATUS_CD,
                    A.BUYER_CD,
                    E.BUYER_NAME,
                    CONVERT(NVARCHAR(4000), A.PAYMENT_PLAN) AS PAYMENT_PLAN,
                    isnull(H.APPROKEY, '') as APPROKEY,
                    isnull(A.DOCU_NO, '') as DOCU_NO,
                    isnull(TX.DOCU_NO, '') as TAX_DOCU_NO,
                    A.END_USER AS END_USER,
                    A.REG_USER,
                    A.DEBIT_TYPE,
                    G.CD_NAME AS DEBIT_TYPE_NAME,
                    A.LINK_TO,
                    J.END_DATE AS END_DATE2,
                    I.CD_NAME AS BUYER_TEAM,
                    A.CONF_USER,
                    A.CONF_FLAG,
                    M.CD_NAME AS END_TYPE_NAME,
                    A.END_TYPE,
                    A.VAT,
                    F.USD_RATE,
                    isnull(CA.CA_NO, '') as CA_NO
                FROM
                    KSV_CRDB_MST A
                    LEFT JOIN KCD_BUYER E ON E.BUYER_CD = A.BUYER_CD
                    LEFT JOIN KSV_CRDB_MEM C ON C.CRDB_CD = A.CRDB_CD
                    LEFT JOIN (
                        SELECT
                            CRDB_CD,
                            SUM(
                                CASE
                                    WHEN ISNUMERIC(CONVERT(VARCHAR(100), CRDB_AMT)) = 1 THEN CONVERT(FLOAT, CRDB_AMT)
                                    ELSE 0
                                END
                            ) AS END_AMT
                        FROM
                            KSV_CRDB_MEM
                        GROUP BY
                            CRDB_CD
                    ) EM ON EM.CRDB_CD = A.CRDB_CD
                    LEFT JOIN KSV_TAX_MEM T ON T.INVOICE_NO = A.CRDB_CD AND T.ORDER_CD = 'DEBIT'
                    LEFT JOIN KSV_TAX_MST TX ON TX.TAX_CD = T.TAX_CD AND ISNULL(TX.DOCU_NO, '') <> ''
                    LEFT JOIN KCD_BANK C1 ON C1.BANK_CD = A.BANK_CD
                    LEFT JOIN KCD_GWCODE H ON H.DOC_NO = A.CRDB_CD
                    LEFT JOIN KCD_CODE N ON N.CD_GROUP = 'GW_STATUS' AND N.CD_CODE = H.STATUS_CD
                    LEFT JOIN (
                        SELECT
                            REMARK_S,
                            MAX(CRDB_CD) AS CA_NO
                        FROM
                            KSV_CRDB_MST
                        GROUP BY
                            REMARK_S
                    ) CA ON CA.REMARK_S = A.CRDB_CD,
                    KVW_COMPANY B,
                    KCD_CODE D,
                    KCD_CURRENCY F,
                    KCD_CODE G,
                    KCD_CODE I,
                    KSV_CRDB_MST J,
                    KCD_CODE M
                WHERE
                    A.CRDB_TYPE IN ('D', 'Z', 'DA')
                    AND A.CRDB_SEQ = (
                        SELECT
                            MAX(CRDB_SEQ)
                        FROM
                            KSV_CRDB_MST
                        WHERE
                            A.CRDB_CD = CRDB_CD
                    )
                    AND A.CRDB_CD LIKE '%${args.data.DEBIT_NO}%'
                    AND A.PO_CD LIKE '%${args.data.PO_CD}%'
                    AND A.ORDER_CD LIKE '%${args.data.ORDER_CD}%'
                    AND A.DEBIT_TYPE LIKE '%%'
                    AND A.CRDB_CD = J.CRDB_CD
                    AND J.CRDB_SEQ = '1'
                    AND B.COM_CD = A.MESSER_CD
                    AND D.CD_GROUP = 'CREDIT_STATUS'
                    AND D.CD_CODE = A.STATUS_CD
                    AND G.CD_GROUP = 'DEBIT_TYPE'
                    AND G.CD_CODE = A.DEBIT_TYPE
                    AND I.CD_GROUP = 'BUYER_TEAM'
                    AND I.CD_CODE = isnull(E.BUYER_TEAM, '')
                    AND M.CD_GROUP = 'CREDIT_END_TYPE'
                    AND M.CD_CODE = A.END_TYPE
                    AND F.START_DATE = (
                        SELECT
                            MAX(START_DATE)
                        FROM
                            KCD_CURRENCY
                    )
                    AND F.CURR_CD = A.CURR_CD
                GROUP BY
                    A.CRDB_CD,
                    A.CRDB_SEQ,
                    A.CRDB_DATE,
                    B.COM_NAME,
                    A.CRDB_AMT,
                    A.CURR_CD,
                    A.TITLE,
                    A.CHARGER,
                    A.END_DATE,
                    A.REMARK,
                    D.CD_NAME,
                    A.PO_CD,
                    A.ORDER_CD,
                    A.BANK_CD,
                    C1.BANK_NAME,
                    B.COM_CD,
                    M.CD_NAME,
                    A.END_TYPE,
                    A.STATUS_CD,
                    A.BUYER_CD,
                    E.BUYER_NAME,
                    F.USD_RATE,
                    A.PAYMENT_PLAN,
                    N.CD_NAME,
                    H.APPROKEY,
                    A.DOCU_NO,
                    TX.DOCU_NO,
                    A.REG_USER,
                    A.DEBIT_TYPE,
                    G.CD_NAME,
                    A.LINK_TO,
                    I.CD_NAME,
                    J.END_DATE,
                    A.CONF_USER,
                    A.CONF_FLAG,
                    A.VAT,
                    CA.CA_NO,
                    A.END_USER,
                    EM.END_AMT
                    -- ORDER BY A.CRDB_SEQ  DESC
                ORDER BY
                    A.CRDB_DATE desc,
                    A.CRDB_SEQ DESC
            `;
            try {
                var retArray = [];
                var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
                tRet.forEach((col,i) => {
                    var tObj = { ...col };
                    if (tObj.STATUS_CD === '2') tObj.STATUS = 'End';
                    retArray.push(tObj);
                });
                return retArray;
            } catch (e: any) {
                console.error('[S0702][mgrQueryS0702_2_BY_NUMBER] query failed', {
                    message: e?.message,
                    code: e?.code,
                    meta: e?.meta,
                    cause: e?.cause,
                    argsData: args?.data,
                });
                console.error('[S0702][mgrQueryS0702_2_BY_NUMBER] sql', sqlStr);
                throw e;
            }
        },
        mgrQueryS0702_2_1: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }
            let sqlStr = `
                select
                    *
                from
                    ksv_crdb_mem
                where
                    crdb_cd = '${args.data.CRDB_CD}'
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {};
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S0702_2;
