import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0701_2 = {
    Query: {
        mgrQueryS0701_2: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var sDate = args.data.S_ISSUE_DATE;
            var eDate = args.data.E_ISSUE_DATE;
            if (eDate === '') eDate = tRetDate1;
            // if (sDate === '') sDate = `${tRetDate1.substring(0, 4)}0101`;

            var tPreYear = parseInt(tRetDate1.substring(0, 4)) - 1;
            if (sDate === '') sDate = '20190101';

            var sqlStr = `
                SELECT
                    (
                        CASE
                            WHEN A.CHARGER = 'CHELSEA' THEN 'SMC'
                            WHEN A.CHARGER = 'KEVIN' THEN 'SMC'
                            WHEN A.CHARGER = 'JOE' THEN 'SMC'
                            WHEN A.CHARGER = 'LAUREN' THEN 'SMC'
                            ELSE I.CD_NAME
                        END
                    ) AS CHARGER_TEAM,
                    A.CRDB_CD,
                    A.CRDB_SEQ,
                    A.CRDB_DATE,
                    B.COM_NAME AS MESSER,
                    A.CRDB_AMT,
                    MAX(ISNULL(EM.END_AMT, 0)) AS END_AMT,
                    ((A.CRDB_AMT + ISNULL(A.VAT, 0)) - MAX(ISNULL(EM.END_AMT, 0))) AS BALANCE,
                    A.CURR_CD,
                    (
                        ((A.CRDB_AMT + ISNULL(A.VAT, 0)) - MAX(ISNULL(EM.END_AMT, 0))) * F.USD_RATE
                    ) AS USD_BAL,
                    A.TITLE,
                    A.CHARGER,
                    A.END_DATE,
                    A.REMARK,
                    (
                        CASE
                            WHEN D.CD_NAME = 'Part End' OR D.CD_NAME = 'Taxbill Part' THEN 'Regist'
                            WHEN D.CD_NAME = 'Not End' THEN 'X'
                            ELSE D.CD_NAME
                        END
                    ) AS STATUS,
                    ISNULL(N.CD_NAME, H.STATUS_CD) AS GW_STATUS,
                    A.PO_CD,
                    A.ORDER_CD,
                    isnull(A.BANK_CD, '') as BANK_CD,
                    isnull(C1.BANK_NAME, '') as BANK_NAME,
                    B.COM_CD AS MESSER_CD,
                    A.STATUS_CD,
                    A.BUYER_CD,
                    E.BUYER_NAME,
                    A.PAYMENT_PLAN,
                    isnull(H.APPROKEY, '') as APPROKEY,
                    isnull(A.DOCU_NO, '') as DOCU_NO,
                    A.END_USER,
                    A.REG_USER,
                    A.DEBIT_TYPE,
                    G.CD_NAME AS DEBIT_TYPE_NAME,
                    A.LINK_TO,
                    J.END_DATE AS END_DATE2,
                    I.CD_NAME AS BUYER_TEAM,
                    A.CONF_USER,
                    M.CD_NAME AS END_TYPE_NAME,
                    A.END_TYPE,
                    A.VAT,
                    F.USD_RATE,
                    (
                        SELECT TOP 1
                            X.CRDB_CD
                        FROM
                            KSV_CRDB_MST X
                        WHERE
                            X.REMARK_S = A.CRDB_CD
                    ) AS CA_NO
                FROM
                    KSV_CRDB_MST A
                    LEFT JOIN KCD_BUYER E ON E.BUYER_CD = A.BUYER_CD
                    LEFT JOIN (
                        SELECT
                            CRDB_CD,
                            SUM(CRDB_AMT) AS END_AMT
                        FROM
                            KSV_CRDB_MEM
                        GROUP BY
                            CRDB_CD
                    ) EM ON EM.CRDB_CD = A.CRDB_CD
                    LEFT JOIN KCD_BANK C1 ON C1.BANK_CD = A.BANK_CD
                    LEFT JOIN KCD_GWCODE H ON H.DOC_NO = A.CRDB_CD
                    LEFT JOIN KCD_CODE N ON N.CD_GROUP = 'GW_STATUS' AND N.CD_CODE = H.STATUS_CD,
                    KVW_COMPANY B,
                    KCD_CODE D,
                    KCD_CURRENCY F,
                    KCD_CODE G,
                    KCD_CODE I,
                    KSV_CRDB_MST J,
                    KCD_CODE M
                WHERE
                    A.CRDB_TYPE IN ('C', 'CA')
                    AND A.CRDB_SEQ = (
                        SELECT
                            MAX(CRDB_SEQ)
                        FROM
                            KSV_CRDB_MST
                        WHERE
                            A.CRDB_CD = CRDB_CD
                    )
                    AND A.CRDB_DATE BETWEEN '${sDate}' AND '${eDate}'
                    AND A.DEBIT_TYPE LIKE '%%'
                    AND A.CHARGER LIKE '%${args.data.CHARGER}%'
                    AND A.TITLE LIKE '%${args.data.TITLE}%'
                    AND A.BUYER_CD LIKE '%${args.data.BUYER_CD}%'
                    AND A.CRDB_CD LIKE '%${args.data.DEBIT_NO}%'
                    AND A.PO_CD LIKE '%${args.data.PO_CD}%'
                    AND A.ORDER_CD LIKE '%${args.data.ORDER_CD}%'
                    AND A.CRDB_CD = J.CRDB_CD
                    AND A.CRDB_CD = J.CRDB_CD
                    AND J.CRDB_SEQ = '1'
                    AND A.MESSER_CD LIKE '%${args.data.BILL_TO}%'
                    AND B.COM_CD = A.MESSER_CD
                    AND D.CD_GROUP = 'CREDIT_STATUS'
                    AND D.CD_CODE = A.STATUS_CD
                    AND G.CD_GROUP = 'DEBIT_TYPE'
                    AND G.CD_CODE = A.DEBIT_TYPE
                    AND I.CD_GROUP = 'BUYER_TEAM'
                    AND I.CD_CODE = E.BUYER_TEAM
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
                    N.CD_NAME,
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
                    H.STATUS_CD,
                    H.APPROKEY,
                    A.DOCU_NO,
                    A.REG_USER,
                    A.DEBIT_TYPE,
                    G.CD_NAME,
                    A.LINK_TO,
                    I.CD_NAME,
                    J.END_DATE,
                    A.CONF_USER,
                    A.VAT,
                    A.END_USER
                HAVING
                    (
                        '${args.data.STATUS_CD}' = ''
                        OR (
                            '${args.data.STATUS_CD}' = '99'
                            AND (
                                CASE
                                    WHEN D.CD_NAME = 'Part End' OR D.CD_NAME = 'Taxbill Part' THEN 'Regist'
                                    WHEN D.CD_NAME = 'Not End' THEN 'X'
                                    ELSE D.CD_NAME
                                END
                            ) <> 'End'
                        )
                        OR (
                            '${args.data.STATUS_CD}' <> '99'
                            AND (
                                CASE
                                    WHEN D.CD_NAME = 'Part End' OR D.CD_NAME = 'Taxbill Part' THEN 'Regist'
                                    WHEN D.CD_NAME = 'Not End' THEN 'X'
                                    ELSE D.CD_NAME
                                END
                            ) = ISNULL(
                                (
                                    SELECT TOP 1
                                        CASE
                                            WHEN KS.CD_NAME = 'Part End' OR KS.CD_NAME = 'Taxbill Part' THEN 'Regist'
                                            WHEN KS.CD_NAME = 'Not End' THEN 'X'
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
                        )
                        OR (
                            '${args.data.STATUS_CD}' <> '99'
                            AND ISNULL(
                                (
                                    SELECT TOP 1
                                        CASE
                                            WHEN KS.CD_NAME = 'Part End' OR KS.CD_NAME = 'Taxbill Part' THEN 'Regist'
                                            WHEN KS.CD_NAME = 'Not End' THEN 'X'
                                            ELSE KS.CD_NAME
                                        END
                                    FROM
                                        KCD_CODE KS
                                    WHERE
                                        KS.CD_GROUP = 'CREDIT_STATUS'
                                        AND KS.CD_CODE = '${args.data.STATUS_CD}'
                                ),
                                '${args.data.STATUS_CD}'
                            ) NOT IN ('End', 'Regist', 'X')
                            AND (
                                CASE
                                    WHEN D.CD_NAME = 'Part End' OR D.CD_NAME = 'Taxbill Part' THEN 'Regist'
                                    WHEN D.CD_NAME = 'Not End' THEN 'X'
                                    ELSE D.CD_NAME
                                END
                            ) LIKE '%' + ISNULL(
                                (
                                    SELECT TOP 1
                                        CASE
                                            WHEN KS.CD_NAME = 'Part End' OR KS.CD_NAME = 'Taxbill Part' THEN 'Regist'
                                            WHEN KS.CD_NAME = 'Not End' THEN 'X'
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
                    )
                    -- ORDER BY A.CRDB_SEQ  DESC
                ORDER BY
                    A.CRDB_DATE desc,
                    A.CRDB_SEQ DESC
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                CHARGER_TEAM: '',
                CRDB_CD: '',
                CRDB_SEQ: 0,
                CRDB_DATE: '',
                MESSER: '',
                CRDB_AMT: 0,
                BALANCE: 0,
                CURR_CD: '',
                USD_BAL: 0,
                TITLE: '',
                CHARGER: '',
                END_DATE: '',
                REMARK: '',
                STATUS: '',
                GW_STATUS: '',
                PO_CD: '',
                ORDER_CD: '',
                BANK_CD: '',
                MESSER_CD: '',
                STATUS_CD: '',
                BUYER_CD: '',
                BUYER_NAME: '',
                PAYMENT_PLAN: '',
                APPROKEY: '',
                DOCU_NO: '',
                END_USER: '',
                REG_USER: '',
                DEBIT_TYPE: '',
                DEBIT_TYPE_NAME: '',
                LINK_TO: '',
                END_DATE2: '',
                BUYER_TEAM: '',
                CONF_USER: '',
                END_TYPE_NAME: '',
                END_TYPE: '',
                VAT: 0,
                ETC99: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tObj = { ...tRet[tIdx] };
                if (tObj.STATUS_CD === '2') tObj.STATUS = 'End';
                tRetArray.push(tObj);
            }
            return tRetArray;
        },
        mgrQueryS0701_2_BY_NUMBER: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var sqlStr = `
                SELECT
                    (
                        CASE
                            WHEN A.CHARGER = 'CHELSEA' THEN 'SMC'
                            WHEN A.CHARGER = 'KEVIN' THEN 'SMC'
                            WHEN A.CHARGER = 'JOE' THEN 'SMC'
                            WHEN A.CHARGER = 'LAUREN' THEN 'SMC'
                            ELSE I.CD_NAME
                        END
                    ) AS CHARGER_TEAM,
                    A.CRDB_CD,
                    A.CRDB_SEQ,
                    A.CRDB_DATE,
                    B.COM_NAME AS MESSER,
                    A.CRDB_AMT,
                    MAX(ISNULL(EM.END_AMT, 0)) AS END_AMT,
                    ((A.CRDB_AMT + ISNULL(A.VAT, 0)) - MAX(ISNULL(EM.END_AMT, 0))) AS BALANCE,
                    A.CURR_CD,
                    (
                        ((A.CRDB_AMT + ISNULL(A.VAT, 0)) - MAX(ISNULL(EM.END_AMT, 0))) * F.USD_RATE
                    ) AS USD_BAL,
                    A.TITLE,
                    A.CHARGER,
                    A.END_DATE,
                    A.REMARK,
                    (
                        CASE
                            WHEN D.CD_NAME = 'Part End' OR D.CD_NAME = 'Taxbill Part' THEN 'Regist'
                            WHEN D.CD_NAME = 'Not End' THEN 'X'
                            ELSE D.CD_NAME
                        END
                    ) AS STATUS,
                    ISNULL(N.CD_NAME, H.STATUS_CD) AS GW_STATUS,
                    A.PO_CD,
                    A.ORDER_CD,
                    isnull(A.BANK_CD, '') as BANK_CD,
                    isnull(C1.BANK_NAME, '') as BANK_NAME,
                    B.COM_CD AS MESSER_CD,
                    A.STATUS_CD,
                    A.BUYER_CD,
                    E.BUYER_NAME,
                    A.PAYMENT_PLAN,
                    isnull(H.APPROKEY, '') as APPROKEY,
                    isnull(A.DOCU_NO, '') as DOCU_NO,
                    A.END_USER,
                    A.REG_USER,
                    A.DEBIT_TYPE,
                    G.CD_NAME AS DEBIT_TYPE_NAME,
                    A.LINK_TO,
                    J.END_DATE AS END_DATE2,
                    I.CD_NAME AS BUYER_TEAM,
                    A.CONF_USER,
                    M.CD_NAME AS END_TYPE_NAME,
                    A.END_TYPE,
                    A.VAT,
                    F.USD_RATE,
                    (
                        SELECT TOP 1
                            X.CRDB_CD
                        FROM
                            KSV_CRDB_MST X
                        WHERE
                            X.REMARK_S = A.CRDB_CD
                    ) AS CA_NO
                FROM
                    KSV_CRDB_MST A
                    LEFT JOIN KCD_BUYER E ON E.BUYER_CD = A.BUYER_CD
                    LEFT JOIN (
                        SELECT
                            CRDB_CD,
                            SUM(CRDB_AMT) AS END_AMT
                        FROM
                            KSV_CRDB_MEM
                        GROUP BY
                            CRDB_CD
                    ) EM ON EM.CRDB_CD = A.CRDB_CD
                    LEFT JOIN KCD_BANK C1 ON C1.BANK_CD = A.BANK_CD
                    LEFT JOIN KCD_GWCODE H ON H.DOC_NO = A.CRDB_CD
                    LEFT JOIN KCD_CODE N ON N.CD_GROUP = 'GW_STATUS' AND N.CD_CODE = H.STATUS_CD,
                    KVW_COMPANY B,
                    KCD_CODE D,
                    KCD_CURRENCY F,
                    KCD_CODE G,
                    KCD_CODE I,
                    KSV_CRDB_MST J,
                    KCD_CODE M
                WHERE
                    A.CRDB_TYPE IN ('C', 'CA')
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
                    AND A.CRDB_CD = J.CRDB_CD
                    AND J.CRDB_SEQ = '1'
                    AND B.COM_CD = A.MESSER_CD
                    AND D.CD_GROUP = 'CREDIT_STATUS'
                    AND D.CD_CODE = A.STATUS_CD
                    AND G.CD_GROUP = 'DEBIT_TYPE'
                    AND G.CD_CODE = A.DEBIT_TYPE
                    AND I.CD_GROUP = 'BUYER_TEAM'
                    AND I.CD_CODE = E.BUYER_TEAM
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
                    N.CD_NAME,
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
                    H.STATUS_CD,
                    H.APPROKEY,
                    A.DOCU_NO,
                    A.REG_USER,
                    A.DEBIT_TYPE,
                    G.CD_NAME,
                    A.LINK_TO,
                    I.CD_NAME,
                    J.END_DATE,
                    A.CONF_USER,
                    A.VAT,
                    A.END_USER
                    -- ORDER BY A.CRDB_SEQ  DESC
                ORDER BY
                    A.CRDB_DATE desc,
                    A.CRDB_SEQ DESC
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                CHARGER_TEAM: '',
                CRDB_CD: '',
                CRDB_SEQ: 0,
                CRDB_DATE: '',
                MESSER: '',
                CRDB_AMT: 0,
                BALANCE: 0,
                END_AMT: 0,
                CURR_CD: '',
                USD_BAL: 0,
                TITLE: '',
                CHARGER: '',
                END_DATE: '',
                REMARK: '',
                STATUS: '',
                GW_STATUS: '',
                PO_CD: '',
                ORDER_CD: '',
                BANK_CD: '',
                MESSER_CD: '',
                STATUS_CD: '',
                BUYER_CD: '',
                BUYER_NAME: '',
                PAYMENT_PLAN: '',
                APPROKEY: '',
                DOCU_NO: '',
                END_USER: '',
                REG_USER: '',
                DEBIT_TYPE: '',
                DEBIT_TYPE_NAME: '',
                LINK_TO: '',
                END_DATE2: '',
                BUYER_TEAM: '',
                CONF_USER: '',
                END_TYPE_NAME: '',
                END_TYPE: '',
                VAT: 0,
                ETC99: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tObj = { ...tRet[tIdx] };
                tRetArray.push(tObj);
            }
            return tRetArray;
        },
        mgrQueryS0701_2_1: async (_, args) => {
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

export default moduleQuery_S0701_2;
