import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S070301_2 = {
    Query: {
        mgrQueryS070301_2: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var sDate = args.data.S_ISSUE_DATE;
            var eDate = args.data.E_ISSUE_DATE;
            if (eDate === '') eDate = tRetDate1;
            if (sDate === '') sDate = `${tRetDate1.substring(0, 4)}0101`;

            var STATUS_CD_SQL = '';
            if (args.data.STATUS_CD !== '') {
                STATUS_CD_SQL = `and A.STATUS_CD LIKE '${args.data.STATUS_CD}%'`;
            } else if (args.data.STATUS_CD !== 'all') {
            } else {
                STATUS_CD_SQL = `and A.STATUS_CD not in ('1','4','3') `;
            }

            var sqlStr = `
                select
                    CASE
                        WHEN A.CHARGER IN ('CHELSEA', 'KEVIN', 'JOE', 'LAUREN') THEN 'SMC'
                        WHEN A.BUYER_CD IN ('FC034', 'FC044') THEN 'SMC'
                        ELSE I.CD_NAME
                    END AS CHARGER_TEAM,
                    F.COM_NAME AS MESSER,
                    A.CRDB_CD,
                    A.CRDB_SEQ,
                    A.CRDB_DATE,
                    B.BUYER_CD,
                    A.CRDB_AMT,
                    (A.CRDB_AMT - ISNULL(SUM(C.CRDB_AMT), 0)) AS BALANCE,
                    A.CURR_CD,
                    A.TITLE,
                    A.CHARGER,
                    isnull(A.CONF_FLAG, '') as CONF_FLAG,
                    isnull(A.CONF_USER, '') as CONF_USER,
                    D.CD_NAME AS CREDIT_STATUS,
                    A.REMARK,
                    A.REMARK_S,
                    ISNULL(E.CD_NAME, '') AS DEBIT_TYPE_NAME,
                    ISNULL(A.DEBIT_TYPE, '') AS DEBIT_TYPE,
                    A.HISTORY_NO,
                    A.DEBIT_BL_NO,
                    A.CI_NO,
                    A.TRANSPORTATION,
                    A.TOT_AMT,
                    A.WEIGHT,
                    A.TOT_CBM,
                    A.CBM,
                    A.STATUS_CD
                FROM
                    KSV_CRDB_MST A
                    LEFT JOIN KSV_CRDB_MEM C ON C.CRDB_CD = A.CRDB_CD
                    LEFT JOIN KCD_CODE D ON D.CD_GROUP = 'CREDIT_STATUS'
                    AND D.CD_CODE = A.STATUS_CD
                    LEFT JOIN KCD_CODE E ON E.CD_GROUP = 'DEBIT_TYPE'
                    AND E.CD_CODE = A.DEBIT_TYPE
                    JOIN KVW_BVT_DEBIT B ON B.BUYER_CD = A.MESSER_CD
                    JOIN KVW_COMPANY F ON F.COM_CD = A.MESSER_CD
                    LEFT JOIN KCD_BUYER J ON J.BUYER_CD = B.BUYER_CD
                    LEFT JOIN KCD_CODE I ON I.CD_GROUP = 'BUYER_TEAM'
                    AND I.CD_CODE = J.BUYER_TEAM
                WHERE
                    A.CRDB_TYPE = 'E'
                    AND A.CRDB_SEQ = (
                        SELECT
                            MAX(CRDB_SEQ)
                        FROM
                            KSV_CRDB_MST
                        WHERE
                            CRDB_CD = A.CRDB_CD
                    )
                    AND A.CRDB_DATE BETWEEN '${sDate}' AND '${eDate}'  ${STATUS_CD_SQL}
                    AND A.CRDB_CD LIKE '%${args.data.CRDB_CD}%'
                    AND A.TITLE LIKE '%${args.data.TITLE}%'
                    AND A.REG_USER LIKE '%${args.data.CHARGER}%'
                    AND B.BUYER_TEAM LIKE '%${args.data.TEAM}%'
                    AND A.DEBIT_TYPE LIKE '%${args.data.PAY_TO}%'
                    AND A.MESSER_CD LIKE '%${args.data.BILL_TO}%'
                GROUP BY
                    CASE
                        WHEN A.CHARGER IN ('CHELSEA', 'KEVIN', 'JOE', 'LAUREN') THEN 'SMC'
                        WHEN A.BUYER_CD IN ('FC034', 'FC044') THEN 'SMC'
                        ELSE I.CD_NAME
                    END,
                    F.COM_NAME,
                    A.CRDB_CD,
                    A.CRDB_SEQ,
                    A.CRDB_DATE,
                    B.BUYER_CD,
                    A.CRDB_AMT,
                    A.CURR_CD,
                    A.TITLE,
                    A.CHARGER,
                    A.CONF_FLAG,
                    A.CONF_USER,
                    D.CD_NAME,
                    A.REMARK,
                    A.REMARK_S,
                    E.CD_NAME,
                    A.DEBIT_TYPE,
                    A.HISTORY_NO,
                    A.DEBIT_BL_NO,
                    A.CI_NO,
                    A.TRANSPORTATION,
                    A.TOT_AMT,
                    A.WEIGHT,
                    A.TOT_CBM,
                    A.CBM,
                    A.STATUS_CD
                ORDER BY
                    A.CRDB_DATE,
                    A.CRDB_CD;
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            /*
       var tRetData = {
       };
       var tRetArray = [];
       var tIdx = 0;
       for (tIdx = 0; tIdx < tRet.length; tIdx ++) {
          var tObj = { ...tRet[tIdx] };
          var sqlStr0 = `
              select
                  *
              from
                  kcd_code
              where
                  cd_code = '${tObj.GW_STATUS}'
                  and cd_group = 'GW_STATUS'
          `;
          var tRet0  =  await prisma.$queryRaw(Prisma.raw(sqlStr0));
          if (tRet0.length > 0) tObj.GW_STATUS = tRet0[0].CD_NAME;
          tRetArray.push(tObj);
       }
       */
            return tRet;
        },
        mgrQueryS070301_2_BY_NUMBER: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var sqlStr = `
                select
                    CASE
                        WHEN A.CHARGER IN ('CHELSEA', 'KEVIN', 'JOE', 'LAUREN') THEN 'SMC'
                        WHEN A.BUYER_CD IN ('FC034', 'FC044') THEN 'SMC'
                        ELSE I.CD_NAME
                    END AS CHARGER_TEAM,
                    F.COM_NAME AS MESSER,
                    A.CRDB_CD,
                    A.CRDB_SEQ,
                    A.CRDB_DATE,
                    B.BUYER_CD,
                    A.CRDB_AMT,
                    (A.CRDB_AMT - ISNULL(SUM(C.CRDB_AMT), 0)) AS BALANCE,
                    A.CURR_CD,
                    A.TITLE,
                    A.CHARGER,
                    A.CONF_FLAG,
                    A.CONF_USER,
                    D.CD_NAME AS CREDIT_STATUS,
                    A.REMARK,
                    A.REMARK_S,
                    ISNULL(E.CD_NAME, '') AS DEBIT_TYPE_NAME,
                    ISNULL(A.DEBIT_TYPE, '') AS DEBIT_TYPE,
                    A.HISTORY_NO,
                    A.DEBIT_BL_NO,
                    A.CI_NO,
                    A.TRANSPORTATION,
                    A.TOT_AMT,
                    A.WEIGHT,
                    A.TOT_CBM,
                    A.CBM,
                    A.STATUS_CD
                FROM
                    KSV_CRDB_MST A
                    LEFT JOIN KSV_CRDB_MEM C ON C.CRDB_CD = A.CRDB_CD
                    LEFT JOIN KCD_CODE D ON D.CD_GROUP = 'CREDIT_STATUS'
                    AND D.CD_CODE = A.STATUS_CD
                    LEFT JOIN KCD_CODE E ON E.CD_GROUP = 'DEBIT_TYPE'
                    AND E.CD_CODE = A.DEBIT_TYPE
                    JOIN KVW_BVT_DEBIT B ON B.BUYER_CD = A.MESSER_CD
                    JOIN KVW_COMPANY F ON F.COM_CD = A.MESSER_CD
                    LEFT JOIN KCD_CODE I ON I.CD_GROUP = 'BUYER_TEAM'
                    AND I.CD_CODE = B.BUYER_CD
                    LEFT JOIN KCD_BUYER J ON J.BUYER_CD = B.BUYER_CD
                    LEFT JOIN KCD_CODE K ON K.CD_GROUP = 'BUYER_TEAM'
                    AND K.CD_CODE = J.BUYER_TEAM
                WHERE
                    A.CRDB_TYPE = 'E'
                    AND A.CRDB_SEQ = (
                        SELECT
                            MAX(CRDB_SEQ)
                        FROM
                            KSV_CRDB_MST
                        WHERE
                            CRDB_CD = A.CRDB_CD
                    )
                    AND A.CRDB_CD LIKE '%${args.data.DEBIT_NO}%'
                    AND A.REG_USER LIKE '%%'
                    AND B.BUYER_TEAM LIKE '%%'
                    AND A.DEBIT_TYPE LIKE '%%'
                    AND A.MESSER_CD LIKE '%%'
                GROUP BY
                    CASE
                        WHEN A.CHARGER IN ('CHELSEA', 'KEVIN', 'JOE', 'LAUREN') THEN 'SMC'
                        WHEN A.BUYER_CD IN ('FC034', 'FC044') THEN 'SMC'
                        ELSE I.CD_NAME
                    END,
                    F.COM_NAME,
                    A.CRDB_CD,
                    A.CRDB_SEQ,
                    A.CRDB_DATE,
                    B.BUYER_CD,
                    A.CRDB_AMT,
                    A.CURR_CD,
                    A.TITLE,
                    A.CHARGER,
                    A.CONF_FLAG,
                    A.CONF_USER,
                    D.CD_NAME,
                    A.REMARK,
                    A.REMARK_S,
                    E.CD_NAME,
                    A.DEBIT_TYPE,
                    A.HISTORY_NO,
                    A.DEBIT_BL_NO,
                    A.CI_NO,
                    A.TRANSPORTATION,
                    A.TOT_AMT,
                    A.WEIGHT,
                    A.TOT_CBM,
                    A.CBM,
                    A.STATUS_CD
                ORDER BY
                    A.CRDB_DATE,
                    A.CRDB_CD;
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            /*
       var tRetData = {
       };
       var tRetArray = [];
       var tIdx = 0;
       for (tIdx = 0; tIdx < tRet.length; tIdx ++) {
          var tObj = { ...tRet[tIdx] };
          var sqlStr0 = `
              select
                  *
              from
                  kcd_code
              where
                  cd_code = '${tObj.GW_STATUS}'
                  and cd_group = 'GW_STATUS'
          `;
          var tRet0  =  await prisma.$queryRaw(Prisma.raw(sqlStr0));
          if (tRet0.length > 0) tObj.GW_STATUS = tRet0[0].CD_NAME;
          tRetArray.push(tObj);
       }
       */
            return tRet;
        },
        mgrQueryS070301_2_1: async (_, args) => {
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
        mgrQueryS070301_2_bak: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var sDate = args.data.S_ISSUE_DATE;
            var eDate = args.data.E_ISSUE_DATE;
            if (eDate === '') eDate = tRetDate1;
            if (sDate === '') sDate = `${tRetDate1.substring(0, 4)}0101`;

            var tBuyerCd = ``;
            if (args.data.BILL_TO !== '') tBuyerCd = args.data.BILL_TO;
            if (args.data.BUYER_CD !== '') tBuyerCd = args.data.BUYER_CD;

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
                    (A.CRDB_AMT - ISNULL(SUM(C.CRDB_AMT), 0)) AS BALANCE,
                    A.CURR_CD,
                    (
                        (A.CRDB_AMT - ISNULL(SUM(C.CRDB_AMT), 0)) * F.USD_RATE
                    ) AS USD_BAL,
                    A.TITLE,
                    A.CHARGER,
                    A.END_DATE,
                    A.REMARK,
                    D.CD_NAME AS STATUS,
                    H.STATUS_CD AS GW_STATUS,
                    A.PO_CD,
                    A.ORDER_CD,
                    isnull(A.BANK_CD, '') as BANK_CD,
                    isnull(C1.BANK_NAME, '') as BANK_NAME,
                    B.COM_CD AS MESSER_CD,
                    A.STATUS_CD,
                    A.MESSER_CD as BUYER_CD,
                    E.BUYER_NAME,
                    A.PAYMENT_PLAN,
                    isnull(H.APPROKEY, '') as APPROKEY,
                    isnull(A.DOCU_NO, '') as DOCU_NO,
                    '' AS END_USER,
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
                    isnull(A.DEBIT_BL_NO, '') as BL_NO,
                    isnull(A.TRANSPORTATION, '') as TRANSPORT,
                    isnull(A.FREIGHT_TERM, '') as FREIGHT,
                    A.CBM,
                    A.WEIGHT,
                    A.HISTORY_NO,
                    A.CI_NO,
                    A.TOT_CBM,
                    A.TOT_AMT,
                    A.REMARK_S,
                    F.USD_RATE
                FROM
                    KSV_CRDB_MST A
                    LEFT JOIN KCD_BUYER E ON E.BUYER_CD = A.BUYER_CD
                    LEFT JOIN KSV_CRDB_MEM C ON C.CRDB_CD = A.CRDB_CD
                    LEFT JOIN KCD_BANK C1 ON C1.BANK_CD = A.BANK_CD
                    LEFT JOIN KCD_GWCODE H ON H.DOC_NO = A.CRDB_CD
                    left join KCD_CODE D on D.CD_GROUP = 'CREDIT_STATUS'
                    AND D.CD_CODE = A.STATUS_CD
                    left join KCD_CODE G on G.CD_GROUP = 'DEBIT_TYPE'
                    AND G.CD_CODE = A.DEBIT_TYPE
                    left join KCD_CODE M on M.CD_GROUP = 'CREDIT_END_TYPE'
                    AND M.CD_CODE = A.END_TYPE,
                    KVW_COMPANY B,
                    KCD_CURRENCY F,
                    KSV_CRDB_MST J,
                    KCD_CODE I,
                    KVW_BVT_DEBIT I1
                WHERE
                    A.CRDB_TYPE IN ('D')
                    and A.MESSER_CD = I1.BUYER_CD
                    AND A.CRDB_SEQ = (
                        SELECT
                            MAX(CRDB_SEQ)
                        FROM
                            KSV_CRDB_MST
                        WHERE
                            A.CRDB_CD = CRDB_CD
                    )
                    AND A.CRDB_DATE BETWEEN '${sDate}' AND '${eDate}'
                    AND A.STATUS_CD LIKE '%${args.data.STATUS_CD}%'
                    AND A.DEBIT_TYPE LIKE '%%'
                    AND A.CHARGER LIKE '%${args.data.CHARGER}%'
                    AND A.TITLE LIKE '%${args.data.TITLE}%'
                    AND A.MESSER_CD LIKE '%${tBuyerCd}%'
                    AND A.CRDB_CD = J.CRDB_CD
                    AND A.CRDB_SEQ = '1'
                    AND B.COM_CD = A.MESSER_CD
                    AND I.CD_GROUP = 'BUYER_TEAM'
                    AND I.CD_CODE = E.BUYER_TEAM
                    AND F.START_DATE = (
                        SELECT
                            MAX(START_DATE)
                        FROM
                            KCD_CURRENCY
                        where
                            curr_cd = a.curr_cd
                    )
                    AND F.CURR_CD = A.CURR_CD
                GROUP BY
                    A.CRDB_CD,
                    A.CRDB_SEQ,
                    A.CRDB_DATE,
                    B.COM_NAME,
                    A.CRDB_AMT,
                    A.CURR_CD,
                    A.MESSER_CD,
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
                    A.DEBIT_BL_NO,
                    A.TRANSPORTATION,
                    A.FREIGHT_TERM,
                    A.CBM,
                    A.WEIGHT,
                    A.HISTORY_NO,
                    A.CI_NO,
                    A.TOT_CBM,
                    A.TOT_AMT,
                    A.REMARK_S
                    -- ORDER BY A.CRDB_SEQ  DESC
                ORDER BY
                    A.CRDB_DATE desc,
                    A.CRDB_SEQ DESC
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {};
            var tRetArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tObj = { ...tRet[tIdx] };
                var sqlStr0 = `
                    select
                        *
                    from
                        kcd_code
                    where
                        cd_code = '${tObj.GW_STATUS}'
                        and cd_group = 'GW_STATUS'
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr0));
                if (tRet0.length > 0) tObj.GW_STATUS = tRet0[0].CD_NAME;
                tRetArray.push(tObj);
            }
            return tRetArray;
        },
    },
};

export default moduleQuery_S070301_2;
