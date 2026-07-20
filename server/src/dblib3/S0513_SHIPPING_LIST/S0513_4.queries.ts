import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
import axios from 'axios';
const Excel = require('exceljs');
const {
    generateUploadURL,
    deleteUploadObject,
    upload,
    uploadFile,
} = require('../../../routes/s3');

const moment = require('moment');
const config = require('../../../routes/config');

//
//
class S0513_4_COMM {
    async queryS0513_4_EXCEL(argData, contextValue) {
        var tRetDate = AFLib.getCurrTime();
        var tRetDate1 = tRetDate.substring(0, 8);
        var tUserInfo = AFLib.getUserInfo(contextValue);

        var tSQL = '';
        if (argData.STYLE_CD !== '') {
            tSQL += `AND STYLE_NAME like '%${argData.STYLE_CD}%' `;
        }

        var sDate = argData.S_SHIP_DATE;
        var eDate = argData.E_SHIP_DATE;
        if (sDate === '') sDate = `${tRetDate.substring(0, 6)}01`;
        if (eDate === '') eDate = `99999999`;

        var sDate1 = argData.S_ATD;
        var eDate1 = argData.E_ATD;
        if (sDate1 === '') sDate1 = `${tRetDate.substring(0, 6)}01`;
        if (eDate1 === '') eDate1 = `99999999`;

        var tSQL1 = '';
        var tSQL1_1 = '';
        var tSQL2 = '';
        var tSQL2_1 = '';
        if (argData.INVOICE_NO !== '' || argData.ORDER_CD !== '') {
            tSQL2 = `           left join KSV_INVOICE_MST F on F.INVOICE_NO = F0.INVOICE_NO `;
        } else {
            tSQL1 = `    AND   A.SHIP_DATE between '${sDate}' and '${eDate}' `;
            tSQL1_1 = `    AND   F.SHIP_DATE between '${sDate}' and '${eDate}' `;
            if (argData.S_ATD === '' && argData.E_ATD === '') {
                tSQL2 = `           left join KSV_INVOICE_MST F on F.INVOICE_NO = F0.INVOICE_NO `;
                tSQL2_1 = `           and F.ATD between '${sDate1}' and '${eDate1}'  `;
            } else {
                tSQL2 = `           inner join KSV_INVOICE_MST F on F.INVOICE_NO = F0.INVOICE_NO AND F.ATD between '${sDate1}' and '${eDate1}'  `;
                tSQL2_1 = `           and F.ATD between '${sDate1}' and '${eDate1}'  `;
            }
            if (argData.S_SHIP_DATE === '' && argData.E_SHIP_DATE === '')
                tSQL1 = '';
        }

        let sqlStr0 = `
            select
                count(*) as c_cnt
            from
                (
                    SELECT
                        isnull(F0.INVOICE_NO, '') as INVOICE_NO,
                        isnull(F.BL_NO, '') as BL_NO,
                        isnull(F.ATD, '') as ATD,
                        isnull(F.SHIP_DATE, '') as ETD,
                        isnull(F0.BUYER_CD, '') as BUYER_CD,
                        isnull(F0.SHIP_DATE, '') as SHIP_DATE,
                        '' as NAT_CD,
                        '' as NAT_NAME,
                        B1.BUYER_NAME,
                        isnull(F.DOCU_NO, '') as DOCU_NO,
                        isnull(F.TOT_AMT, '0') as TOT_AMT,
                        isnull(F.ADJ_AMT, '0') as ADJ_AMT,
                        isnull(F.ORD_AMT, '0') as ORD_AMT,
                        0.0 AS SHIP_PRICE,
                        '' AS BL_FILE,
                        '' AS PL_FILE,
                        '' AS CI_FILE,
                        '' AS OTHER_FILE,
                        '' AS BL_FILE_URL,
                        '' AS PL_FILE_URL,
                        '' AS CI_FILE_URL,
                        '' AS OTHER_FILE_URL,
                        sum(F0.SHIP_AMOUNT2) as SHIP_AMOUNT2,
                        sum(F0.SHIP_QTY) as SHIP_QTY,
                        sum(F0.SHIP_AMOUNT) as SHIP_AMOUNT,
                        isnull(sum(F0.TOT_CNT), 0) as ORDER_QTY,
                        0 as SHIP_AMOUNT3,
                        F.PAYMENT_TYPE,
                        G.CD_NAME AS PAYMENT_NAME,
                        F.CURR_CD,
                        F.INCOME_DATE,
                        F.EXT_INVOICE,
                        F.REMARK
                    FROM
                        (
                            select
                                kk.INVOICE_NO,
                                left(kk.ORDER_CD, 2) as BUYER_CD,
                                kk.ORDER_CD,
                                kk.PROD_CD,
                                kk.PAYMENT_TYPE,
                                kk.SHIP_DATE,
                                kk.SHIP_AMOUNT2,
                                kk.SHIP_QTY,
                                kk.SHIP_AMOUNT,
                                kk.NAT_CD2,
                                sum(kk2.TOT_CNT) as TOT_CNT
                            from
                                (
                                    select
                                        isnull(A.INVOICE_NO, '') as INVOICE_NO,
                                        A.ORDER_CD,
                                        A.PROD_CD,
                                        isnull(F1.PAYMENT_TYPE, '') as PAYMENT_TYPE,
                                        A.SHIP_DATE,
                                        isnull(F1.NAT_CD, '') as NAT_CD2,
                                        isnull(sum(D.USD_PRICE * A.SHIP_CNT), 0) as SHIP_AMOUNT2,
                                        isnull(sum(A.SHIP_CNT), 0) AS SHIP_QTY,
                                        isnull(sum(A.SHIP_PRICE * A.SHIP_CNT), 0) as SHIP_AMOUNT
                                    FROM
                                        KSV_ORDER_MST D,
                                        KCD_STYLE D1,
                                        KSV_ORDER_SHIP A
                                        left join KSV_INVOICE_MST F1 on A.INVOICE_NO = F1.INVOICE_NO
                                        AND F1.PAYMENT_TYPE like '%${argData.PAYMENT_TYPE}%'
                                    where
                                        A.ORDER_CD = D.ORDER_CD
                                        AND D.STYLE_CD = D1.STYLE_CD
                                        AND D.ORDER_TYPE in ('0', '1')
                                        --AND    A.SHIP_PTYPE like '%${argData.SHIP_MODE}%'
                                        AND A.INVOICE_NO like '%${argData.INVOICE_NO}%'
                                        AND A.DELIVERY_TYPE like '%${argData.DELIVERY_TYPE}%'
                                        AND D.ORDER_CD LIKE '%${argData.ORDER_CD}%'
                                        AND D.FACTORY_CD like '%${argData.FACTORY_CD}%'
                                        AND LEFT(D.ORDER_CD, 2) like '%${argData.BUYER_CD}%'
                                        AND (
                                            D1.STYLE_CD like '%${argData.STYLE_CD}%'
                                            or D1.STYLE_NAME like '%${argData.STYLE_CD}%'
                                        ) ${tSQL1}
                                    group by
                                        A.INVOICE_NO,
                                        left(A.ORDER_CD, 2),
                                        A.ORDER_CD,
                                        A.PROD_CD,
                                        F1.PAYMENT_TYPE,
                                        A.SHIP_DATE,
                                        F1.NAT_CD
                                ) kk,
                                ksv_order_mem kk2
                            where
                                kk.ORDER_CD = kk2.ORDER_CD
                                and kk.PROD_CD = kk2.PROD_CD
                                and kk.PAYMENT_TYPE like '%${argData.PAYMENT_TYPE}%'
                            group by
                                kk.INVOICE_NO,
                                kk.ORDER_CD,
                                kk.PROD_CD,
                                kk.PAYMENT_TYPE,
                                kk.SHIP_DATE,
                                kk.SHIP_AMOUNT2,
                                kk.SHIP_QTY,
                                kk.SHIP_AMOUNT,
                                kk.NAT_CD2
                        ) F0 ${tSQL2}
                        left join KCD_CODE G on G.CD_GROUP = 'PAYMENT_TYPE'
                        and G.CD_CODE = F0.PAYMENT_TYPE,
                        KCD_BUYER B1
                    WHERE
                        F0.BUYER_CD = B1.BUYER_CD
                    GROUP BY
                        F0.INVOICE_NO,
                        F.BL_NO,
                        F.ATD,
                        F.SHIP_DATE,
                        F0.BUYER_CD,
                        F0.SHIP_DATE,
                        B1.BUYER_NAME,
                        F.DOCU_NO,
                        F.TOT_AMT,
                        F.ADJ_AMT,
                        F.ORD_AMT,
                        F.PAYMENT_TYPE,
                        G.CD_NAME,
                        F.CURR_CD,
                        F.INCOME_DATE,
                        F.EXT_INVOICE,
                        F.REMARK
                ) pp
        `;
        var tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr0));

        var topSQL = '';
        var tTotalCount = 0;
        if (tRet0.length > 0) {
            console.log(`Count:${tRet0[0].c_cnt}`);
            tTotalCount = tRet0[0].c_cnt;
            if (parseFloat(tRet0[0].c_cnt) > 2000) topSQL = ' top 2000 ';
        }

        let sqlStr = `
            SELECT
                --${argData.EMAIL_SEND ? '' : topSQL}
                isnull(F0.INVOICE_NO, '') as INVOICE_NO,
                isnull(F.BL_NO, '') as BL_NO,
                isnull(F.ATD, '') as ATD,
                isnull(F.SHIP_DATE, '') as ETD,
                isnull(F0.BUYER_CD, '') as BUYER_CD,
                isnull(F0.SHIP_DATE, '') as SHIP_DATE,
                '' as NAT_CD,
                '' as NAT_NAME,
                B1.BUYER_NAME,
                isnull(F.DOCU_NO, '') as DOCU_NO,
                isnull(F.TOT_AMT, '0') as TOT_AMT,
                isnull(F.ADJ_AMT, '0') as ADJ_AMT,
                isnull(F.ORD_AMT, '0') as ORD_AMT,
                0.0 AS SHIP_PRICE,
                '' AS BL_FILE,
                '' AS PL_FILE,
                '' AS CI_FILE,
                '' AS OTHER_FILE,
                '' AS BL_FILE_URL,
                '' AS PL_FILE_URL,
                '' AS CI_FILE_URL,
                '' AS OTHER_FILE_URL,
                sum(F0.SHIP_AMOUNT2) as SHIP_AMOUNT2,
                sum(F0.SHIP_QTY) as SHIP_QTY,
                sum(F0.SHIP_AMOUNT) as SHIP_AMOUNT,
                isnull(sum(F0.TOT_CNT), 0) as ORDER_QTY,
                0 as SHIP_AMOUNT3,
                F.PAYMENT_TYPE,
                G.CD_NAME AS PAYMENT_NAME,
                F.CURR_CD,
                F.INCOME_DATE,
                F.EXT_INVOICE,
                F.REMARK
            FROM
                (
                    select
                        kk.INVOICE_NO,
                        left(kk.ORDER_CD, 2) as BUYER_CD,
                        kk.ORDER_CD,
                        kk.PROD_CD,
                        kk.PAYMENT_TYPE,
                        kk.SHIP_DATE,
                        kk.SHIP_AMOUNT2,
                        kk.SHIP_QTY,
                        kk.SHIP_AMOUNT,
                        kk.NAT_CD2,
                        sum(kk2.TOT_CNT) as TOT_CNT
                    from
                        (
                            select
                                isnull(A.INVOICE_NO, '') as INVOICE_NO,
                                A.ORDER_CD,
                                A.PROD_CD,
                                isnull(F1.PAYMENT_TYPE, '') as PAYMENT_TYPE,
                                A.SHIP_DATE,
                                isnull(F1.NAT_CD, '') as NAT_CD2,
                                isnull(sum(D.USD_PRICE * A.SHIP_CNT), 0) as SHIP_AMOUNT2,
                                isnull(sum(A.SHIP_CNT), 0) AS SHIP_QTY,
                                isnull(sum(A.SHIP_PRICE * A.SHIP_CNT), 0) as SHIP_AMOUNT
                            FROM
                                KSV_ORDER_MST D,
                                KCD_STYLE D1,
                                KSV_ORDER_SHIP A
                                left join KSV_INVOICE_MST F1 on A.INVOICE_NO = F1.INVOICE_NO
                                AND F1.PAYMENT_TYPE like '%${argData.PAYMENT_TYPE}%'
                            where
                                A.ORDER_CD = D.ORDER_CD
                                AND D.STYLE_CD = D1.STYLE_CD
                                AND D.ORDER_TYPE in ('0', '1')
                                --AND    A.SHIP_PTYPE like '%${argData.SHIP_MODE}%'
                                AND A.INVOICE_NO like '%${argData.INVOICE_NO}%'
                                AND A.DELIVERY_TYPE like '%${argData.DELIVERY_TYPE}%'
                                AND D.ORDER_CD LIKE '%${argData.ORDER_CD}%'
                                AND D.FACTORY_CD like '%${argData.FACTORY_CD}%'
                                AND LEFT(D.ORDER_CD, 2) like '%${argData.BUYER_CD}%'
                                AND (
                                    D1.STYLE_CD like '%${argData.STYLE_CD}%'
                                    or D1.STYLE_NAME like '%${argData.STYLE_CD}%'
                                ) ${tSQL1}
                            group by
                                A.INVOICE_NO,
                                left(A.ORDER_CD, 2),
                                A.ORDER_CD,
                                A.PROD_CD,
                                F1.PAYMENT_TYPE,
                                A.SHIP_DATE,
                                F1.NAT_CD
                        ) kk,
                        ksv_order_mem kk2
                    where
                        kk.ORDER_CD = kk2.ORDER_CD
                        and kk.PROD_CD = kk2.PROD_CD
                        and kk.PAYMENT_TYPE like '%${argData.PAYMENT_TYPE}%'
                    group by
                        kk.INVOICE_NO,
                        kk.ORDER_CD,
                        kk.PROD_CD,
                        kk.PAYMENT_TYPE,
                        kk.SHIP_DATE,
                        kk.SHIP_AMOUNT2,
                        kk.SHIP_QTY,
                        kk.SHIP_AMOUNT,
                        kk.NAT_CD2
                ) F0 ${tSQL2}
                left join KCD_CODE G on G.CD_GROUP = 'PAYMENT_TYPE'
                and G.CD_CODE = F0.PAYMENT_TYPE,
                KCD_BUYER B1
            WHERE
                F0.BUYER_CD = B1.BUYER_CD
            GROUP BY
                F0.INVOICE_NO,
                F.BL_NO,
                F.ATD,
                F.SHIP_DATE,
                F0.BUYER_CD,
                F0.SHIP_DATE,
                B1.BUYER_NAME,
                F.DOCU_NO,
                F.TOT_AMT,
                F.ADJ_AMT,
                F.ORD_AMT,
                F.PAYMENT_TYPE,
                G.CD_NAME,
                F.CURR_CD,
                F.INCOME_DATE,
                F.EXT_INVOICE,
                F.REMARK
            order by
                F0.SHIP_DATE,
                F0.INVOICE_NO
        `;
        var tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr));

        var sqlShipDate = '';
        if (!argData.S_SHIP_DATE && !argData.E_SHIP_DATE);
        else {
            sqlShipDate = `and   F.SHIP_DATE between '${sDate}' and '${eDate}'  `;
        }

        let sqlStr1 = `
            SELECT
                isnull(F.INVOICE_NO, '') as INVOICE_NO,
                isnull(F.BL_NO, '') as BL_NO,
                isnull(F.ATD, '') as ATD,
                isnull(F.SHIP_DATE, '') as ETD,
                isnull(F.DUE_DATE, '') as EXFACTORY,
                '' as BUYER_CD,
                isnull(F.SHIP_DATE, '') as SHIP_DATE,
                isnull(F.DELIVERY_TYPE, '') as DELIVERY_TYPE,
                isnull(H.CD_NAME, '') as DELIVERY_TYPE_N,
                isnull(F.NAT_CD, '') as NAT_CD,
                isnull(G1.NAT_NAME, '') as NAT_NAME,
                '' as BUYER_NAME,
                isnull(F.DOCU_NO, '') as DOCU_NO,
                isnull(F.TOT_AMT, '0') as TOT_AMT,
                isnull(F.ADJ_AMT, '0') as ADJ_AMT,
                isnull(F.ORD_AMT, '0') as ORD_AMT,
                '0' as SHIP_PRICE,
                '' AS BL_FILE,
                '' AS PL_FILE,
                '' AS CI_FILE,
                '' AS OTHER_FILE,
                '' AS BL_FILE_URL,
                '' AS PL_FILE_URL,
                '' AS CI_FILE_URL,
                '' AS OTHER_FILE_URL,
                '0' as SHIP_AMOUNT2,
                '0' as SHIP_QTY,
                '0' as SHIP_AMOUNT,
                '0' as ORDER_QTY,
                0 as SHIP_AMOUNT3,
                F.PAYMENT_TYPE,
                G.CD_NAME AS PAYMENT_NAME,
                F.CURR_CD,
                F.INCOME_DATE,
                F.EXT_INVOICE,
                F.REMARK
            FROM
                KSV_INVOICE_MST F
                left join KCD_NATION G1 on G1.NAT_CD = F.NAT_CD
                left join KCD_CODE G on G.CD_GROUP = 'PAYMENT_TYPE'
                and G.CD_CODE = F.PAYMENT_TYPE
                left join KCD_CODE H on G.CD_GROUP = 'DELIVERY_TYPE'
                and H.CD_CODE = F.DELIVERY_TYPE
                left join ksv_invoice_mem b on F.invoice_no = b.invoice_no
                -- where   F.TRADE_TYPE = '3' and F.TRADE_TYPE2 = '6'
            where
                isnull(b.invoice_no, '') = ''
                and F.INVOICE_NO like '%${argData.INVOICE_NO}%'
                and F.DELIVERY_TYPE like '%${argData.DELIVERY_TYPE}%'
                and F.PAYMENT_TYPE like '%${argData.PAYMENT_TYPE}%' ${sqlShipDate} ${tSQL2_1}
            order by
                F.SHIP_DATE,
                F.INVOICE_NO
        `;
        var tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));
        var saveSql1 = sqlStr1;

        var tRet = [];
        tRet0.forEach((col, i) => {
            var tObj = { ...col };
            tObj.IS_NON_GARMENT = '0';
            tRet.push(tObj);
        });

        if (
            argData.ORDER_CD !== '' ||
            argData.BUYER_CD !== '' ||
            argData.STYLE_CD !== '' ||
            argData.FACTORY_CD !== ''
        ) {
        } else {
            tRet1.forEach((col, i) => {
                var tObj = { ...col };
                tObj.IS_NON_GARMENT = '1';
                tRet.push(tObj);
            });
            tTotalCount += tRet1.length;
        }

        var tRetData = {};
        var tRetArray = [];
        var tIdx = 0;

        for (tIdx = 0; tIdx < tRet.length; tIdx++) {
            var tObj = { ...tRet[tIdx] };
            tObj.REC_COUNT = String(tTotalCount);

            if (!argData.EMAIL_SEND && tIdx > 2000) break;

            let sql0 = `
                select
                    *
                from
                    kcd_fileinfo
                where
                    file_key = '${tObj.INVOICE_NO}'
                    and kind like 'ORDER_SHIP_%'
            `;
            var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            if (tRet0.length > 0) {
                tRet0.forEach((col, i) => {
                    if (col.KIND === 'ORDER_SHIP_BL_FILE') {
                        tObj.BL_FILE = col.NAME;
                        tObj.BL_FILE_URL = col.URL;
                    }
                    if (col.KIND === 'ORDER_SHIP_PL_FILE') {
                        tObj.PL_FILE = col.NAME;
                        tObj.PL_FILE_URL = col.URL;
                    }
                    if (col.KIND === 'ORDER_SHIP_CI_FILE') {
                        tObj.CI_FILE = col.NAME;
                        tObj.CI_FILE_URL = col.URL;
                    }
                    if (col.KIND === 'ORDER_SHIP_OTHER_FILE') {
                        tObj.OTHER_FILE = col.NAME;
                        tObj.OTHER_FILE_URL = col.URL;
                    }
                    if (col.KIND === 'ORDER_SHIP_BL_FILE2') {
                        tObj.BL_FILE2 = col.NAME;
                        tObj.BL_FILE_URL2 = col.URL;
                    }
                    if (col.KIND === 'ORDER_SHIP_PL_FILE2') {
                        tObj.PL_FILE2 = col.NAME;
                        tObj.PL_FILE_URL2 = col.URL;
                    }
                    if (col.KIND === 'ORDER_SHIP_CI_FILE2') {
                        tObj.CI_FILE2 = col.NAME;
                        tObj.CI_FILE_URL2 = col.URL;
                    }
                    if (col.KIND === 'ORDER_SHIP_OTHER_FILE2') {
                        tObj.OTHER_FILE2 = col.NAME;
                        tObj.OTHER_FILE_URL2 = col.URL;
                    }
                });
            }

            let sql1 = `
                select distinct
                    a.invoice_no,
                    a.ship_date,
                    a.ship_ptype,
                    a.delivery_type,
                    a.exfactory,
                    a.nat_cd,
                    b.nat_name,
                    isnull(a3.cd_name, '') as ship_mode_n,
                    isnull(a4.cd_name, '') as delivery_type_n
                from
                    ksv_order_ship a
                    left join KCD_CODE A3 ON a.SHIP_PTYPE = A3.CD_CODE
                    and A3.CD_GROUP = 'SHIP_PTYPE'
                    left join KCD_CODE A4 ON a.DELIVERY_TYPE = A4.CD_CODE
                    and A4.CD_GROUP = 'DELIVERY_TYPE'
                    left join KCD_NATION b on a.nat_cd = b.nat_cd
                where
                    a.invoice_no = '${tObj.INVOICE_NO}'
                    and a.ship_date = '${tObj.SHIP_DATE}'
            `;
            var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
            if (tRet1.length > 0) {
                tObj.SHIP_PTYPE = tRet1[0].ship_ptype;
                tObj.DELIVERY_TYPE = tRet1[0].delivery_type;
                tObj.SHIP_MODE_N = tRet1[0].delivery_type_n;
                tObj.DELIVERY_TYPE_N = tRet1[0].delivery_type_n;
                tObj.EXFACTORY = tRet1[0].exfactory;
                tObj.NAT_CD = tRet1[0].nat_cd;
                tObj.NAT_NAME = tRet1[0].nat_name;
            }

            if (tObj.NAT_CD === '' && tObj.NAT_CD2 !== '') {
                tObj.NAT_CD = tObj.NAT_CD2;
                let sql1_1 = `
                    select
                        *
                    from
                        kcd_nation
                    where
                        nat_cd = '${tObj.NAT_CD}'
                `;
                var tRet1_1 = await prisma.$queryRaw(Prisma.raw(sql1_1));
                if (tRet1_1.length > 0) tObj.NAT_NAME = tRet1_1[0].NAT_NAME;
            }

            if (typeof argData.NAT_CD === 'undefined');
            else {
                if (argData.NAT_CD !== '' && argData.NAT_CD !== tObj.NAT_CD)
                    continue;
            }

            // console.log(tObj);
            /*
           if (parseFloat(tObj.SHIP_AMOUNT) <= 0) tObj.SHIP_AMOUNT = tObj.SHIP_AMOUNT2;
           if (parseFloat(tObj.SHIP_AMOUNT) <= 0) tObj.SHIP_AMOUNT = tObj.TOT_AMT;
           tObj.SHIP_AMOUNT = tObj.TOT_AMT;
           */

            if (parseFloat(tObj.TOT_AMT) <= 0) {
                /*
               var tShipAmount = parseFloat(tObj.SHIP_AMOUNT);
               // if (tShipAmount <= 0) tShipAmount = parseFloat(tObj.SHIP_AMOUNT2);
               var tOrdAmount = parseFloat(tObj.SHIP_AMOUNT2);
               var tAdjAmount = tShipAmount - tOrdAmount;
               tObj.ORD_AMT = String(tOrdAmount);
               // tObj.ADJ_AMT = String(tAdjAmount);
               tObj.TOT_AMT = String(tShipAmount);
               tObj.SHIP_AMOUNT = String(tShipAmount);
               tObj.SHIP_PRICE = String(tShipAmount / parseFloat(tObj.SHIP_QTY));
               */
                tObj.ORD_AMT = String(tObj.ORD_AMT);
                tObj.TOT_AMT = String(tObj.TOT_AMT);
                tObj.SHIP_AMOUNT = String(tObj.TOT_AMT);
                tObj.SHIP_PRICE = String(
                    parseFloat(tObj.TOT_AMT) / parseFloat(tObj.SHIP_QTY),
                );
            } else {
                tObj.SHIP_AMOUNT = String(tObj.TOT_AMT);
                tObj.SHIP_PRICE = String(
                    parseFloat(tObj.TOT_AMT) / parseFloat(tObj.SHIP_QTY),
                );
            }

            var tBillAmt = 0;
            var tOANegoAmt = 0;
            var tRemainAmt = 0;

            // bill_type = '1': TT, Bill_type = '2': OA Nego,  OA Nego와 TT는 별걔임

            let sqlStr1 = `
                select
                    curr_cd,
                    bill_amt,
                    bill_date,
                    bill_type
                from
                    ksv_invoice_bill
                where
                    invoice_no = '${tObj.INVOICE_NO}'
                    -- and   bill_type <> '2' 
                    -- and   bill_type in  ('1' , '2')
                    and bill_type in ('1')
                order by
                    bill_type
            `;
            var tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));
            var tIdx98 = 0;
            for (tIdx98 = 0; tIdx98 < tRet1.length; tIdx98++) {
                var tOne = { ...tRet1[tIdx98] };
                let sqlStr2 = `
                    select
                        usd_rate
                    from
                        kcd_currency
                    where
                        start_date = '${tOne.bill_date}'
                        and curr_cd = '${tOne.curr_cd}'
                `;
                var tRet2 = await prisma.$queryRaw(Prisma.raw(sqlStr2));
                if (tRet2.length <= 0) {
                    sqlStr2 = `
                        select
                            usd_rate
                        from
                            kcd_currency
                        where
                            start_date = (
                                select
                                    max(start_date)
                                from
                                    kcd_currency
                                where
                                    curr_cd = '${tOne.curr_cd}'
                            )
                            and curr_cd = '${tOne.curr_cd}'
                    `;
                    tRet2 = await prisma.$queryRaw(Prisma.raw(sqlStr2));
                }

                var tAmt = 0;
                if (tObj.CURR_CD === tOne.curr_cd)
                    tAmt = parseFloat(tOne.bill_amt);
                else
                    tAmt =
                        parseFloat(tOne.bill_amt) *
                        parseFloat(tRet2[0].usd_rate);

                if (tOne.bill_type === '1') tBillAmt += tAmt;
                if (tOne.bill_type === '2') tBillAmt -= tAmt;
            }

            if (tBillAmt < 0 || tBillAmt <= 0.01) tBillAmt = 0;

            let sqlStr10 = `
                select
                    isnull(sum(bill_amt), 0) as s_amt
                from
                    ksv_invoice_bill a,
                    ksv_invoice_nego b
                where
                    a.invoice_no = '${tObj.INVOICE_NO}'
                    and a.bill_type = '2'
                    and a.ref_no = b.ref_no
            `;
            var tRet10 = await prisma.$queryRaw(Prisma.raw(sqlStr10));
            if (tRet10.length > 0) tOANegoAmt = parseFloat(tRet10[0].s_amt);

            tRemainAmt = parseFloat(tObj.TOT_AMT) - tBillAmt - tOANegoAmt;
            tObj.BILL_AMT = String(tBillAmt);
            tObj.OA_NEGO = String(tOANegoAmt);
            tObj.REMAIN_AMT = String(tRemainAmt);

            tRetArray.push(tObj);
        }

        console.log(sqlStr);
        console.log(saveSql1);
        console.log(tTotalCount);

        return tRetArray;
    }
}

// export default로 Query 내용 내보내기
const moduleQuery_S0513_4 = {
    Query: {
        mgrQueryS0513_4_EXCEL_BY_INVOICE: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);
            var tInput = { ...args };

            // Query
            var tSQL = '';

            let sqlStr0 = `
                select
                    isnull(count(*), 00) as t_cnt
                from
                    ksv_order_ship
                where
                    invoice_no = '${args.data.INVOICE_NO}'
            `;
            var tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr0));
            if (tRet0[0].t_cnt <= 0) {
                var tRetArray = [];
                var tObj = {};
                tObj.id = 1;
                tObj.CODE = `ERROR:해당 Invoice에 대해 ship데이터가 없습니다  `;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var sqlStr = '';
            sqlStr = `
                SELECT
                    A.BUYER_CD,
                    B.PO_CD,
                    B.ORDER_CD,
                    C.STYLE_NAME,
                    B.SHIP_QTY,
                    B.ORD_PRICE as FOB,
                    B.SALES_PRICE,
                    B.SHIP_PRICE,
                    (
                        B.SHIP_QTY * B.SHIP_PRICE - B.SHIP_QTY * B.ORD_PRICE
                    ) as AS_AMT,
                    B.TOT_AMT as SHIP_AMT,
                    D.FACTORY_NAME
                FROM
                    KSV_INVOICE_MST A,
                    KSV_INVOICE_MEM B,
                    KCD_STYLE C,
                    KCD_FACTORY D,
                    KSV_ORDER_MST E
                where
                    A.INVOICE_NO = '${args.data.INVOICE_NO}'
                    and A.INVOICE_NO = B.INVOICE_NO
                    and B.ORDER_CD = E.ORDER_CD
                    and E.STYLE_CD = C.STYLE_CD
                    and B.FACTORY_CD = D.FACTORY_CD
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            // Excel
            var tTitle = `invoice제품list`;
            var tWExcelFile = `invoice제품list-${tUserInfo.USER_ID}trade1-${tRetDate}`;
            var tRetExcelFile = '';

            try {
                // Excel Read
                var tPath0 = '';
                var tCols0 = __dirname.split('/');
                var tFlag0 = 0;
                tCols0.forEach((col, i) => {
                    if (col !== '') {
                        if (col === 'src') {
                            tPath0 += '/upload/excel_template';
                            tFlag0 = 1;
                        }
                        if (tFlag0 === 0) {
                            tPath0 += '/' + col;
                        }
                    }
                });

                var tTemplateName = 'invoice제품list';
                var tTemplateExcel = `${tPath0}/${tTemplateName}.xlsx`;

                const wb = new Excel.Workbook();
                await wb.xlsx.readFile(tTemplateExcel);

                var tSheetName = `list`;
                var sheet = wb.getWorksheet(tSheetName);

                //
                var tRowIdx = 4;

                var tIdx99 = 0;
                for (tIdx99 = 0; tIdx99 < tRet.length; tIdx99++) {
                    var col = { ...tRet[tIdx99] };
                    if (tIdx99 > 0) {
                        var tmpRow = [];
                        sheet.insertRow(tRowIdx, tmpRow, 'i');
                    }
                    sheet.getCell(tRowIdx, 1).value = col.BUYER_CD;
                    sheet.getCell(tRowIdx, 2).value = col.PO_CD;
                    sheet.getCell(tRowIdx, 3).value = col.ORDER_CD;
                    sheet.getCell(tRowIdx, 4).value = col.STYLE_NAME;
                    sheet.getCell(tRowIdx, 5).value = parseFloat(col.SHIP_QTY);
                    sheet.getCell(tRowIdx, 6).value = parseFloat(col.FOB);
                    sheet.getCell(tRowIdx, 7).value = parseFloat(
                        col.SALES_PRICE,
                    );
                    sheet.getCell(tRowIdx, 8).value = parseFloat(
                        col.SHIP_PRICE,
                    );
                    sheet.getCell(tRowIdx, 9).value = parseFloat(col.AS_AMT);
                    sheet.getCell(tRowIdx, 10).value = parseFloat(col.SHIP_AMT);
                    sheet.getCell(tRowIdx, 11).value = 0;
                    sheet.getCell(tRowIdx, 12).value = col.FACTORY_NAME;
                    tRowIdx += 1;
                }

                sheet.getCell(tRowIdx, 4).value = `Total`;
                sheet.getCell(tRowIdx, 4).font = { bold: true };
                sheet.getCell(tRowIdx, 4).alignment = { horizontal: 'center' };
                sheet.getCell(tRowIdx, 4).border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' },
                };

                sheet.getCell(tRowIdx, 5).value = {
                    formula: `SUM(E4:E${tRowIdx - 1})`,
                };
                sheet.getCell(tRowIdx, 6).value = {
                    formula: `SUM(F4:F${tRowIdx - 1})`,
                };
                sheet.getCell(tRowIdx, 7).value = {
                    formula: `SUM(G4:G${tRowIdx - 1})`,
                };
                sheet.getCell(tRowIdx, 8).value = {
                    formula: `SUM(H4:H${tRowIdx - 1})`,
                };
                sheet.getCell(tRowIdx, 9).value = {
                    formula: `SUM(I4:I${tRowIdx - 1})`,
                };
                sheet.getCell(tRowIdx, 10).value = {
                    formula: `SUM(J4:J${tRowIdx - 1})`,
                };

                wb.eachSheet((worksheet) => {
                    worksheet.eachRow((row) => {
                        row.eachCell((cell) => {
                            cell.font = {
                                name: 'Dotum', // 돋움체
                                size: 11,
                            };
                        });
                    });
                });

                return await upload(`${tWExcelFile}.xlsx`, wb);
            } catch (error) {
                var tRetArray = [];
                var tObj = {};
                tObj.id = 1;
                tObj.CODE = `ERROR:Excel Print:${error.message}`;
                console.log(tObj.CODE);
                tRetArray.push(tObj);
                return tRetArray;
            }
        },

        mgrQueryS0513_4_EXCEL: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInObj = { ...args.data };
            var tFunc = new S0513_4_COMM();
            var tRetObj = await tFunc.queryS0513_4_EXCEL(tInObj, contextValue);

            var tRet = [...tRetObj];
            console.log(`Excel Count: ${tRet.length}`);

            var sDate = args.data.S_ATD;
            var eDate = args.data.E_ATD;

            if (args.data.S_ATD && args.data.E_ATD) {
                sDate = args.data.S_ATD;
                eDate = args.data.E_ATD;
            } else {
                sDate = args.data.S_SHIP_DATE;
                eDate = args.data.E_SHIP_DATE;
            }

            if (eDate === '99999999') eDate = tRetDate1;

            var tTitle = `출고금액리스트(간단)`;
            var tWExcelFile = `출고금액리스트(간단)-${tUserInfo.USER_ID}trade1-${tRetDate}`;
            var tRetExcelFile = '';

            try {
                // Excel Read
                var tPath0 = '';
                var tCols0 = __dirname.split('/');
                var tFlag0 = 0;
                tCols0.forEach((col, i) => {
                    if (col !== '') {
                        if (col === 'src') {
                            tPath0 += '/upload/excel_template';
                            tFlag0 = 1;
                        }
                        if (tFlag0 === 0) {
                            tPath0 += '/' + col;
                        }
                    }
                });

                var tTemplateName = '출고금액리스트(간단)';
                var tTemplateExcel = `${tPath0}/${tTemplateName}.xlsx`;

                const wb = new Excel.Workbook();
                await wb.xlsx.readFile(tTemplateExcel);

                var tSheetName = `TRADE_INVOICE_LIST`;
                var sheet = wb.getWorksheet(tSheetName);

                //
                if (sDate && eDate) {
                    sheet.getCell(2, 15).value =
                        `기간:${moment(sDate, 'YYYYMMDD').format('YYYY-MM-DD')} ~ ${moment(eDate, 'YYYYMMDD').format('YYYY-MM-DD')}`;
                }

                var tRowIdx = 4;

                var tIdx99 = 0;
                for (tIdx99 = 0; tIdx99 < tRet.length; tIdx99++) {
                    var col = { ...tRet[tIdx99] };
                    if (tIdx99 > 0) {
                        var tmpRow = [];
                        sheet.insertRow(tRowIdx, tmpRow, 'i');
                    }

                    var tBillAmt = 0;
                    var tOANegoAmt = 0;
                    var tRemainAmt = 0;

                    var tSDate = col.ATD;
                    //if (tSDate === '') tSDate = col.SHIP_DATE;

                    /* BUYER NAME, SHIP_MODE 채워넣기 */
                    /* BUYER NAME */
                    const buyer = await prisma.$queryRaw(
                        Prisma.raw(`
                            SELECT
                                BUYER_NAME
                            FROM
                                KCD_BUYER
                            WHERE
                                BUYER_CD = (
                                    SELECT
                                        BUYER_CD
                                    FROM
                                        KSV_INVOICE_MST
                                    WHERE
                                        INVOICE_NO = '${col.INVOICE_NO}'
                                )
                        `),
                    );
                    col.BUYER_NAME = buyer[0]?.BUYER_NAME || '';

                    /* DELIVERY TYPE */
                    const delivery = await prisma.$queryRaw(
                        Prisma.raw(`
                            SELECT
                                CD_NAME
                            FROM
                                KCD_CODE
                            WHERE
                                CD_GROUP = 'DELIVERY_TYPE'
                                AND CD_CODE = (
                                    SELECT
                                        DELIVERY_TYPE
                                    FROM
                                        KSV_INVOICE_MST
                                    WHERE
                                        INVOICE_NO = '${col.INVOICE_NO}'
                                )
                        `),
                    );
                    col.DELIVERY_TYPE_N = delivery[0]?.CD_NAME || '';

                    sheet.getCell(tRowIdx, 1).value = col.INVOICE_NO;
                    sheet.getCell(tRowIdx, 2).value = col.BUYER_NAME;
                    sheet.getCell(tRowIdx, 3).value = parseDate(col.ETD);
                    sheet.getCell(tRowIdx, 4).value = parseDate(col.ATD);
                    sheet.getCell(tRowIdx, 3).numFmt = 'yyyy-mm-dd';
                    sheet.getCell(tRowIdx, 4).numFmt = 'yyyy-mm-dd';
                    sheet.getCell(tRowIdx, 5).value = col.NAT_NAME;
                    sheet.getCell(tRowIdx, 6).value = col.PAYMENT_NAME;
                    sheet.getCell(tRowIdx, 7).value = col.DELIVERY_TYPE_N;
                    sheet.getCell(tRowIdx, 8).value = col.ORDER_QTY;
                    sheet.getCell(tRowIdx, 9).value = col.SHIP_QTY;
                    sheet.getCell(tRowIdx, 10).value = Number(
                        AFLib.numToFixed(col.ORD_AMT, 2),
                    );
                    sheet.getCell(tRowIdx, 11).value = Number(
                        AFLib.numToFixed(col.ADJ_AMT, 2),
                    );
                    sheet.getCell(tRowIdx, 12).value = Number(
                        AFLib.numToFixed(col.SHIP_AMOUNT, 2),
                    );
                    sheet.getCell(tRowIdx, 13).value = Number(
                        AFLib.numToFixed(col.BILL_AMT, 2),
                    );
                    sheet.getCell(tRowIdx, 14).value = col.OA_NEGO;
                    sheet.getCell(tRowIdx, 15).value = col.DOCU_NO;

                    for (let colIdx = 1; colIdx <= 15; colIdx++) {
                        sheet.getCell(tRowIdx, colIdx).border = {
                            top: { style: 'thin' },
                            left: { style: 'thin' },
                            bottom: { style: 'thin' },
                            right: { style: 'thin' },
                        };
                    }

                    tRowIdx += 1;
                }

                if (args.data.EMAIL_SEND) {
                    /* 메일 전송 */
                    try {
                        await wb.xlsx.writeFile(
                            `${tPath0}/${tWExcelFile}.xlsx`,
                        );
                        const uploadInfo = await generateUploadURL();
                        const uploadURL = uploadInfo.uploadURL;
                        const fileURL = uploadURL.split('?')[0];
                        await uploadFile(
                            `${tPath0}/${tWExcelFile}.xlsx`,
                            uploadURL,
                        );

                        const response = await axios.post(
                            `https://${config.hostname}:3202/restapi/send_email`,
                            {
                                to: tUserInfo.EMAIL,
                                subject: tWExcelFile, // 메일 제목
                                html: `<p>출고금액리스트(간단) 엑셀파일입니다.</p>`, // 메일 본문 (HTML 형식)
                                files: [
                                    {
                                        fileName: `${tWExcelFile}.xlsx`,
                                        url: fileURL,
                                    },
                                ],
                            },
                            {
                                headers: {
                                    'Content-Type': 'application/json',
                                }, // JSON 형식으로 요청
                            },
                        );
                        console.log('메일 전송:', response.data);
                    } catch (error) {
                        console.log('메일 전송 실패:', error);
                    }
                } else {
                    return await upload(`${tWExcelFile}.xlsx`, wb);
                }
            } catch (error) {
                var tRetArray = [];
                var tObj = {};
                tObj.id = 1;
                tObj.CODE = `ERROR:Excel Print:${error.message}`;
                console.log(tObj.CODE);
                tRetArray.push(tObj);
                return tRetArray;
            }
        },

        mgrQueryS0513_4: async (_, args) => {
            var tSQL = '';
            if (args.data.BUYER_CD !== '') {
                tSQL += `AND left(B.ORDER_CD, 2) = '${args.data.BUYER_CD}' `;
            }
            let sqlStr = `
                select
                    KK.ORDER_CD,
                    KK.PROD_CD,
                    KK.COLOR,
                    KK.PRICE,
                    KK.CURR_CD,
                    KK.TOT_CNT,
                    '' as ORDER_SIZE_CNT,
                    '' as SHIP_SIZE_CNT,
                    '' as SIZE_GROUP,
                    '' as SIZE_MEMBER,
                    '0' as BAL_CNT,
                    isnull(sum(D.SHIP_CNT), 0) as SHIP_CNT
                from
                    (
                        SELECT
                            B.ORDER_CD,
                            B.PROD_CD,
                            C.COLOR,
                            -- B.PRICE,  
                            -- A.CURR_CD, 
                            A.USD_PRICE as PRICE,
                            'USD' as CURR_CD,
                            ISNULL(SUM(B.TOT_CNT), 0) AS TOT_CNT
                        FROM
                            KSV_ORDER_MEM B,
                            KSV_PROD_MST C,
                            KSV_ORDER_MST A,
                            KCD_SIZE_MST E,
                            KCD_STYLE F
                        WHERE
                            B.ORDER_CD like '%${args.data.ORDER_CD}%'
                            AND left(B.ORDER_CD, 2) like '%${args.data.BUYER_CD}%'
                            -- AND B.ADD_FLAG = '0'
                            AND B.PROD_CD = C.PROD_CD
                            AND B.ORDER_CD = A.ORDER_CD
                            AND A.SIZE_GROUP = E.SIZE_GROUP
                            AND A.ORDER_TYPE in ('0', '1')
                            AND A.ORDER_STATUS in ('*', '0', '1', '2', '3', '5', '6')
                            -- AND A.ORDER_STATUS in ('3', '5', '6')
                            -- AND A.ORDER_STATUS in ('3', '5', '6', '7', '8', '9')
                            AND A.STYLE_CD = F.STYLE_CD
                            AND A.FACTORY_CD like '%${args.data.FACTORY_CD}%'
                        group by
                            B.ORDER_CD,
                            B.PROD_CD,
                            C.COLOR,
                            A.USD_PRICE
                    ) KK
                    left join ksv_order_ship D ON KK.ORDER_CD = D.ORDER_CD
                    AND KK.PROD_CD = D.PROD_CD
                group by
                    KK.ORDER_CD,
                    KK.PROD_CD,
                    KK.COLOR,
                    KK.PRICE,
                    KK.CURR_CD,
                    KK.TOT_CNT
                order by
                    KK.ORDER_CD,
                    KK.PROD_CD
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetArray = [];

            tRet.forEach((col, i) => {
                var tObj = { ...col };
                tObj.BAL_CNT =
                    parseFloat(tObj.TOT_CNT) - parseFloat(tObj.SHIP_CNT);
                if (parseFloat(tObj.TOT_CNT) > 0) tRetArray.push(tObj);
                // if (parseInt(tObj.BAL_CNT) > 0)  tRetArray.push(tObj);
            });

            return tRetArray;
        },

        mgrQueryS0513_4_bak2: async (_, args) => {
            var tSQL = '';
            if (args.data.BUYER_CD !== '') {
                tSQL += `AND left(B.ORDER_CD, 2) = '${args.data.BUYER_CD}' `;
            }
            let sqlStr = `
                SELECT
                    B.ORDER_CD,
                    B.PROD_CD,
                    C.COLOR,
                    B.PRICE,
                    B.TOT_CNT,
                    '' as ORDER_SIZE_CNT,
                    '' as SHIP_SIZE_CNT,
                    '' as SIZE_GROUP,
                    '' as SIZE_MEMBER,
                    A.CURR_CD,
                    '0' as BAL_CNT,
                    ISNULL(SUM(D.SHIP_CNT), 0) AS SHIP_CNT
                FROM
                    KSV_ORDER_MEM B
                    left join ksv_order_ship D ON B.ORDER_CD = D.ORDER_CD
                    AND B.PROD_CD = D.PROD_CD,
                    KSV_PROD_MST C,
                    KSV_ORDER_MST A,
                    KCD_SIZE_MST E,
                    KCD_STYLE F
                WHERE
                    B.ORDER_CD like '%${args.data.ORDER_CD}%'
                    AND left(B.ORDER_CD, 2) like '%${args.data.BUYER_CD}%'
                    AND B.ADD_FLAG = '0'
                    AND B.PROD_CD = C.PROD_CD
                    AND B.ORDER_CD = A.ORDER_CD
                    AND A.SIZE_GROUP = E.SIZE_GROUP
                    AND A.ORDER_TYPE in ('0', '1')
                    AND A.ORDER_STATUS in ('3', '5', '6')
                    -- AND A.ORDER_STATUS in ('3', '5', '6', '7', '8', '9')
                    AND A.STYLE_CD = F.STYLE_CD
                    AND A.FACTORY_CD like '%${args.data.FACTORY_CD}%'
                group by
                    B.ORDER_CD,
                    B.PROD_CD,
                    C.COLOR,
                    B.PRICE,
                    A.TOT_CNT,
                    A.CURR_CD
                order by
                    b.order_cd,
                    b.prod_cd
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetArray = [];

            tRet.forEach((col, i) => {
                var tObj = { ...col };
                tObj.BAL_CNT =
                    parseFloat(tObj.TOT_CNT) - parseFloat(tObj.SHIP_CNT);
                if (parseInt(tObj.BAL_CNT) > 0) tRetArray.push(tObj);
            });

            return tRetArray;
        },

        mgrQueryS0513_4_bak: async (_, args) => {
            var tSQL = '';
            if (args.data.BUYER_CD !== '') {
                tSQL += `AND left(B.ORDER_CD, 2) = '${args.data.BUYER_CD}' `;
            }
            let sqlStr = `
                SELECT
                    B.ORDER_CD,
                    B.PROD_CD,
                    C.COLOR,
                    B.PRICE,
                    B.TOT_CNT,
                    ISNULL(D.SHIP_CNT, 0) AS SHIP_CNT,
                    B.SIZE_CNT as ORDER_SIZE_CNT,
                    isnull(D.SIZE_CNT, '') as SHIP_SIZE_CNT,
                    A.SIZE_GROUP,
                    E.SIZE_MEMBER,
                    A.CURR_CD,
                    '0' as BAL_CNT
                FROM
                    KSV_ORDER_MEM B
                    LEFT JOIN (
                        SELECT
                            ORDER_CD,
                            PROD_CD,
                            SIZE_CNT,
                            SHIP_CNT AS SHIP_CNT
                        FROM
                            KSV_ORDER_SHIP
                        WHERE
                            ORDER_CD like '${args.data.ORDER_CD}%'
                    ) D ON B.ORDER_CD = D.ORDER_CD
                    AND B.PROD_CD = D.PROD_CD,
                    KSV_PROD_MST C,
                    KSV_ORDER_MST A,
                    KCD_SIZE_MST E,
                    KCD_STYLE F
                WHERE
                    B.ORDER_CD like '${args.data.ORDER_CD}%'
                    AND left(B.ORDER_CD, 2) like '%${args.data.BUYER_CD}%'
                    AND B.ADD_FLAG = '0'
                    AND B.PROD_CD = C.PROD_CD
                    AND B.ORDER_CD = A.ORDER_CD
                    AND A.SIZE_GROUP = E.SIZE_GROUP
                    AND A.ORDER_TYPE in ('0', '1')
                    AND A.ORDER_STATUS in ('3', '5', '6')
                    AND A.STYLE_CD = F.STYLE_CD
                    AND A.FACTORY_CD like '%${args.data.FACTORY_CD}%'
                order by
                    b.order_cd,
                    b.prod_cd
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                ORDER_CD: '',
                PROD_CD: '',
                COLOR: '',
                PRICE: 0,
                TOT_CNT: 0,
                SIZE_CNT: '',
                SHIP_CNT: 0,
                SIZE_GROUP: '',
                SIZE_MEMBER: '',
                ETC99: '',
            };
            var tRetArray = [];

            var tSaveOrderCd = '';
            var tSaveProdCd = '';
            var tSaveObj = { ...tRet[0] };
            var tSizeArray = [];
            var tSizeCols = tSaveObj.SIZE_MEMBER.split(',');
            var tIdx = 0;
            for (tIdx = 0; tIdx < tSizeCols.length; tIdx++) {
                var tObj = {};
                tObj.size = tSizeCols[tIdx];
                tObj.size_val = 0;
                tSizeArray.push(tObj);
            }
            var tTotShipCnt = 0;
            tRet.forEach((col, i) => {
                if (i > 0) {
                    if (
                        tSaveOrderCd !== col.ORDER_CD ||
                        (tSaveOrderCd === col.ORDER_CD &&
                            tSaveProdCd !== col.PROD_CD)
                    ) {
                        var tShipSizeCnt = '';
                        tSizeArray.forEach((col1, i1) => {
                            var tVal = AFLib.printF(col1.size_val, 6);
                            tShipSizeCnt = tShipSizeCnt + tVal;
                        });
                        tSaveObj.SHIP_SIZE_CNT = tShipSizeCnt;
                        tSaveObj.SHIP_CNT = String(tTotShipCnt);
                        var tBalCnt =
                            parseFloat(tSaveObj.TOT_CNT) -
                            parseFloat(tSaveObj.SHIP_CNT);
                        tSaveObj.BAL_CNT = String(tBalCnt);
                        if (tBalCnt > 0) tRetArray.push(tSaveObj);
                        tSaveObj = { ...col };

                        tSizeArray = [];
                        tSizeCols = tSaveObj.SIZE_MEMBER.split(',');
                        tIdx = 0;
                        for (tIdx = 0; tIdx < tSizeCols.length; tIdx++) {
                            var tObj = {};
                            tObj.size = tSizeCols[tIdx];
                            tObj.size_val = 0;
                            tSizeArray.push(tObj);
                        }
                        tTotShipCnt = 0;
                    }
                }
                tIdx = 0;
                for (tIdx = 0; tIdx < tSizeCols.length; tIdx++) {
                    var tObj = { ...tSizeArray[tIdx] };
                    tObj.size_val += parseInt(
                        tSaveObj.SHIP_SIZE_CNT.substring(
                            tIdx * 6,
                            (tIdx + 1) * 6,
                        ),
                    );
                    tSizeArray[tIdx] = { ...tObj };
                }
                tTotShipCnt += parseInt(col.SHIP_CNT);
                tSaveOrderCd = col.ORDER_CD;
                tSaveProdCd = col.PROD_CD;
            });

            var tShipSizeCnt = '';
            tSizeArray.forEach((col1, i1) => {
                var tVal = AFLib.printF(col1.size_val, 6);
                tShipSizeCnt = tShipSizeCnt + tVal;
            });
            tSaveObj.SHIP_SIZE_CNT = tShipSizeCnt;
            tSaveObj.SHIP_CNT = String(tTotShipCnt);
            var tBalCnt =
                parseFloat(tSaveObj.TOT_CNT) - parseFloat(tSaveObj.SHIP_CNT);
            tSaveObj.BAL_CNT = String(tBalCnt);
            if (tBalCnt > 0) tRetArray.push(tSaveObj);

            return tRetArray;
        },

        mgrQueryS0513_4_EXCEL_bak3: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);
            var tInput = { ...args };

            var tSQL = '';

            var sDate = args.data.S_SHIP_DATE;
            var eDate = args.data.E_SHIP_DATE;
            if (sDate === '') sDate = `${tRetDate.substring(0, 6)}01`;
            if (eDate === '') eDate = `99999999`;

            var tSQL1 = '';
            if (args.data.INVOICE_NO !== '' || args.data.ORDER_CD !== '') {
            } else {
                tSQL1 = `    AND   F1.SHIP_DATE between '${sDate}' and '${eDate}'`;
            }

            let sqlStr = `
                SELECT
                    isnull(F.INVOICE_NO, '') as INVOICE_NO,
                    isnull(F.BL_NO, '') as BL_NO,
                    isnull(F.ATD, '') as ATD,
                    isnull(F.DUE_DATE, '') as ETD,
                    F.BUYER_CD,
                    isnull(F.SHIP_DATE, '') as SHIP_DATE,
                    '' as NAT_CD,
                    '' as NAT_NAME,
                    B1.BUYER_NAME,
                    isnull(F.DOCU_NO, '') as DOCU_NO,
                    isnull(F.TOT_AMT, '') as TOT_AMT,
                    isnull(F.ADJ_AMT, '') as ADJ_AMT,
                    isnull(F.ORD_AMT, '') as ORD_AMT,
                    0.0 AS SHIP_PRICE,
                    '' AS BL_FILE,
                    '' AS PL_FILE,
                    '' AS CI_FILE,
                    '' AS OTHER_FILE,
                    '' AS BL_FILE_URL,
                    '' AS PL_FILE_URL,
                    '' AS CI_FILE_URL,
                    '' AS OTHER_FILE_URL,
                    sum(F0.SHIP_AMOUNT2) as SHIP_AMOUNT2,
                    sum(F0.SHIP_QTY) as SHIP_QTY,
                    sum(F0.SHIP_AMOUNT) as SHIP_AMOUNT,
                    isnull(sum(F0.TOT_CNT), 0) as ORDER_QTY,
                    0 as SHIP_AMOUNT3,
                    F.PAYMENT_TYPE,
                    G.CD_NAME AS PAYMENT_NAME,
                    isnull(F.EXT_INVOICE, '') as EXT_INVOICE,
                    F.CURR_CD,
                    isnull(F.REMARK, '') as REMARK,
                    isnull(G1.CD_NAME, '') AS DELIVERY_TYPE_N,
                    isnull(F.BL_NO, '') as BL_NO,
                    '' as BILL_AMT,
                    '' as OA_NEGO,
                    '' as REMAIN_AMT
                FROM
                    (
                        select
                            kk.INVOICE_NO,
                            kk.ORDER_CD,
                            kk.PROD_CD,
                            kk.SHIP_AMOUNT2,
                            kk.SHIP_QTY,
                            kk.SHIP_AMOUNT,
                            sum(kk2.TOT_CNT) as TOT_CNT
                        from
                            (
                                select
                                    F1.INVOICE_NO,
                                    A.ORDER_CD,
                                    A.PROD_CD,
                                    isnull(sum(D.AVR_PRICE * A.SHIP_CNT), 0) as SHIP_AMOUNT2,
                                    isnull(sum(A.SHIP_CNT), 0) AS SHIP_QTY,
                                    isnull(sum(A.SHIP_PRICE * A.SHIP_CNT), 0) as SHIP_AMOUNT
                                FROM
                                    KSV_ORDER_MST D,
                                    KSV_INVOICE_MST F1,
                                    KCD_STYLE D1,
                                    KSV_ORDER_SHIP A
                                where
                                    F1.INVOICE_NO = A.INVOICE_NO
                                    and A.ORDER_CD = D.ORDER_CD
                                    AND D.STYLE_CD = D1.STYLE_CD
                                    AND D.ORDER_TYPE in ('0', '1')
                                    --AND    A.SHIP_PTYPE like '%${args.data.SHIP_MODE}%'
                                    AND F1.PAYMENT_TYPE like '%${args.data.PAYMENT_TYPE}%'
                                    AND A.DELIVERY_TYPE like '%${args.data.DELIVERY_TYPE}%'
                                    AND D.ORDER_CD LIKE '%${args.data.ORDER_CD}%'
                                    AND F1.INVOICE_NO like '%${args.data.INVOICE_NO}%'
                                    AND D.FACTORY_CD like '%${args.data.FACTORY_CD}%'
                                    AND LEFT(D.ORDER_CD, 2) like '%${args.data.BUYER_CD}%'
                                    AND (
                                        D1.STYLE_CD like '%${args.data.STYLE_CD}%'
                                        or D1.STYLE_NAME like '%${args.data.STYLE_CD}%'
                                    ) ${tSQL1}
                                group by
                                    F1.INVOICE_NO,
                                    A.ORDER_CD,
                                    A.PROD_CD
                            ) kk,
                            ksv_order_mem kk2
                        where
                            kk.ORDER_CD = kk2.ORDER_CD
                            and kk.PROD_CD = kk2.PROD_cD
                        group by
                            kk.INVOICE_NO,
                            kk.ORDER_CD,
                            kk.PROD_CD,
                            kk.SHIP_AMOUNT2,
                            kk.SHIP_QTY,
                            kk.SHIP_AMOUNT
                    ) F0,
                    KSV_INVOICE_MST F,
                    KCD_BUYER B1,
                    KCD_CODE G,
                    KCD_CODE G1
                where
                    F0.INVOICE_NO = F.INVOICE_NO
                    AND G.CD_GROUP = 'PAYMENT_TYPE'
                    AND G.CD_CODE = F.PAYMENT_TYPE
                    AND G1.CD_GROUP = 'DELIVERY_TYPE'
                    AND G1.CD_CODE = F.DELIVERY_TYPE
                    AND F.BUYER_CD = B1.BUYER_CD
                GROUP BY
                    F.INVOICE_NO,
                    F.BL_NO,
                    F.ATD,
                    F.DUE_DATE,
                    F.BUYER_CD,
                    F.SHIP_DATE,
                    B1.BUYER_NAME,
                    F.DOCU_NO,
                    F.TOT_AMT,
                    F.ADJ_AMT,
                    F.ORD_AMT,
                    F.PAYMENT_TYPE,
                    G.CD_NAME,
                    F.EXT_INVOICE,
                    F.CURR_CD,
                    F.REMARK,
                    G1.CD_NAME,
                    F.BL_NO
                order by
                    F.SHIP_DATE,
                    F.INVOICE_NO
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            console.log(`Excel Count: ${tRet.length}`);

            if (eDate === '99999999') eDate = tRetDate1;

            var tTitle = `출고금액리스트(간단)`;
            var tWExcelFile = `출고금액리스트(간단)-${tUserInfo.USER_ID}trade1-${tRetDate}`;
            var tRetExcelFile = '';

            try {
                // Excel Read
                var tPath0 = '';
                var tCols0 = __dirname.split('/');
                var tFlag0 = 0;
                tCols0.forEach((col, i) => {
                    if (col !== '') {
                        if (col === 'src') {
                            tPath0 += '/upload/excel_template';
                            tFlag0 = 1;
                        }
                        if (tFlag0 === 0) {
                            tPath0 += '/' + col;
                        }
                    }
                });

                var tTemplateName = '출고금액리스트(간단)';
                var tTemplateExcel = `${tPath0}/${tTemplateName}.xlsx`;

                const wb = new Excel.Workbook();
                await wb.xlsx.readFile(tTemplateExcel);

                var tSheetName = `TRADE_INVOICE_LIST`;
                var sheet = wb.getWorksheet(tSheetName);

                //
                sheet.getCell(2, 18).value =
                    `기간:${moment(sDate, 'YYYYMMDD').format('YYYY/MM/DD')} ~ ${moment(eDate, 'YYYYMMDD').format('YYYY/MM/DD')}`;

                var tRowIdx = 4;

                var tIdx99 = 0;
                for (tIdx99 = 0; tIdx99 < tRet.length; tIdx99++) {
                    var col = { ...tRet[tIdx99] };
                    if (tIdx99 > 0) {
                        var tmpRow = [];
                        sheet.insertRow(tRowIdx, tmpRow, 'i');
                    }

                    var tBillAmt = 0;
                    var tOANegoAmt = 0;
                    var tRemainAmt = 0;

                    let sqlStr1 = `
                        select
                            curr_cd,
                            bill_amt,
                            bill_date
                        from
                            ksv_invoice_bill
                        where
                            invoice_no = '${col.INVOICE_NO}'
                    `;
                    var tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));
                    var tIdx98 = 0;
                    for (tIdx98 = 0; tIdx98 < tRet1.length; tIdx98++) {
                        var tOne = { ...tRet1[tIdx98] };
                        let sqlStr2 = `
                            select
                                usd_rate
                            from
                                kcd_currency
                            where
                                start_date = '${tOne.bill_date}'
                                and curr_cd = '${tOne.curr_cd}'
                        `;
                        var tRet2 = await prisma.$queryRaw(Prisma.raw(sqlStr2));

                        var tAmt = 0;
                        if (col.CURR_CD === tOne.curr_cd)
                            tAmt = parseFloat(tOne.bill_amt);
                        else
                            tAmt =
                                parseFloat(tOne.bill_amt) *
                                parseFloat(tRet2[0].usd_rate);
                        tBillAmt += tAmt;
                    }

                    tRemainAmt =
                        parseFloat(col.TOT_AMT) - tBillAmt - tOANegoAmt;
                    if (tRemainAmt < 0) {
                        var tTmp = tRemainAmt * -1;
                        if (tTmp < 0.01) tRemainAmt = 0;
                    } else {
                        if (tRemainAmt < 0.01) tRemainAmt = 0;
                    }
                    col.BILL_AMT = String(tBillAmt);
                    col.OA_NEGO = String(tOANegoAmt);
                    col.REMAIN_AMT = String(tRemainAmt);

                    let sqlStr1 = `
                        select
                            sum(bill_amt) as s_bill_amt
                        from
                            ksv_invoice_bill
                        where
                            invoice_no = '${col.INvOICE_NO}'
                    `;
                    var tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));
                    if (tRet1.length > 0)
                        tBillAmt = parseFloat(tRet1[0].s_bill_amt);

                    let sql100 = `
                        select distinct
                            a.invoice_no,
                            a.ship_date,
                            a.ship_ptype,
                            a.delivery_type,
                            a.exfactory,
                            a.nat_cd,
                            b.nat_name,
                            isnull(a3.cd_name, '') as ship_mode_n,
                            isnull(a4.cd_name, '') as delivery_type_n
                        from
                            ksv_order_ship a
                            left join KCD_CODE A3 ON a.SHIP_PTYPE = A3.CD_CODE
                            and A3.CD_GROUP = 'SHIP_PTYPE'
                            left join KCD_CODE A4 ON a.DELIVERY_TYPE = A4.CD_CODE
                            and A4.CD_GROUP = 'DELIVERY_TYPE'
                            left join KCD_NATION b on a.nat_cd = b.nat_cd
                        where
                            a.invoice_no = '${col.INVOICE_NO}'
                            and a.ship_date = '${col.SHIP_DATE}'
                    `;
                    var tRet100 = await prisma.$queryRaw(Prisma.raw(sql100));
                    if (tRet100.length > 0) {
                        col.NAT_NAME = tRet100[0].nat_name;
                    }
                    sheet.getCell(tRowIdx, 1).value = col.INVOICE_NO;
                    sheet.getCell(tRowIdx, 2).value = col.BUYER_NAME;
                    sheet.getCell(tRowIdx, 3).value = col.EXT_INVOICE;
                    sheet.getCell(tRowIdx, 4).value = col.NAT_NAME;
                    sheet.getCell(tRowIdx, 5).value = moment(
                        col.SHIP_DATE,
                        'YYYYMMDD',
                    ).format('MM/DD/YY');
                    sheet.getCell(tRowIdx, 6).value = moment(
                        col.ETD,
                        'YYYYMMDD',
                    ).format('MM/DD/YY');
                    sheet.getCell(tRowIdx, 7).value = col.CURR_CD;
                    sheet.getCell(tRowIdx, 8).value = parseFloat(col.TOT_AMT);
                    sheet.getCell(tRowIdx, 9).value = parseFloat(col.BILL_AMT);
                    sheet.getCell(tRowIdx, 10).value = parseFloat(col.OA_NEGO);
                    sheet.getCell(tRowIdx, 11).value = parseFloat(
                        col.REMAIN_AMT,
                    );
                    sheet.getCell(tRowIdx, 12).value = parseFloat(col.ADJ_AMT);
                    sheet.getCell(tRowIdx, 13).value = col.REMARK;
                    sheet.getCell(tRowIdx, 14).value = col.DELIVERY_TYPE_N;
                    sheet.getCell(tRowIdx, 15).value = col.DOCU_NO;
                    sheet.getCell(tRowIdx, 16).value = col.BL_NO;

                    // A~R 컬럼까지 테두리 적용
                    for (let colIdx = 1; colIdx <= 18; colIdx++) {
                        // A(1) ~ R(18)
                        sheet.getCell(tRowIdx, colIdx).border = {
                            top: { style: 'thin' },
                            left: { style: 'thin' },
                            bottom: { style: 'thin' },
                            right: { style: 'thin' },
                        };
                    }

                    tRowIdx += 1;
                }


                return await upload(`${tWExcelFile}.xlsx`, wb);
            } catch (error) {
                var tRetArray = [];
                var tObj = {};
                tObj.id = 1;
                tObj.CODE = `ERROR:Excel Print:${error.message}`;
                console.log(tObj.CODE);
                tRetArray.push(tObj);
                return tRetArray;
            }
        },
        mgrQueryS0513_4_EXCEL_bak4: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }

            var sDate = args.data.S_SHIP_DATE;
            var eDate = args.data.E_SHIP_DATE;
            if (sDate === '') sDate = `${tRetDate.substring(0, 6)}01`;
            if (eDate === '') eDate = `99999999`;

            var tSQL1 = '';
            if (args.data.INVOICE_NO !== '' || args.data.ORDER_CD !== '') {
            } else {
                tSQL1 = `    AND   A.SHIP_DATE between '${sDate}' and '${eDate}'`;
            }

            let sqlStr = `
                SELECT
                    isnull(F0.INVOICE_NO, '') as INVOICE_NO,
                    isnull(F.BL_NO, '') as BL_NO,
                    isnull(F.ATD, '') as ATD,
                    -- isnull(F.DUE_DATE , '') as ETD,
                    isnull(F.SHIP_DATE, '') as ETD,
                    isnull(F.INCOME_DATE, '') as INCOME_DATE,
                    isnull(F0.BUYER_CD, '') as BUYER_CD,
                    isnull(F0.SHIP_DATE, '') as SHIP_DATE,
                    '' as NAT_CD,
                    '' as NAT_NAME,
                    B1.BUYER_NAME,
                    isnull(F.DOCU_NO, '') as DOCU_NO,
                    isnull(F.TOT_AMT, '0') as TOT_AMT,
                    isnull(F.ADJ_AMT, '0') as ADJ_AMT,
                    isnull(F.ORD_AMT, '0') as ORD_AMT,
                    0.0 AS SHIP_PRICE,
                    '' AS BL_FILE,
                    '' AS PL_FILE,
                    '' AS CI_FILE,
                    '' AS OTHER_FILE,
                    '' AS BL_FILE_URL,
                    '' AS PL_FILE_URL,
                    '' AS CI_FILE_URL,
                    '' AS OTHER_FILE_URL,
                    sum(F0.SHIP_AMOUNT2) as SHIP_AMOUNT2,
                    sum(F0.SHIP_QTY) as SHIP_QTY,
                    sum(F0.SHIP_AMOUNT) as SHIP_AMOUNT,
                    isnull(sum(F0.TOT_CNT), 0) as ORDER_QTY,
                    0 as SHIP_AMOUNT3,
                    F.PAYMENT_TYPE,
                    G.CD_NAME AS PAYMENT_NAME,
                    F.CURR_CD
                FROM
                    (
                        select
                            kk.INVOICE_NO,
                            left(kk.ORDER_CD, 2) as BUYER_CD,
                            kk.ORDER_CD,
                            kk.PROD_CD,
                            kk.PAYMENT_TYPE,
                            kk.SHIP_DATE,
                            kk.SHIP_AMOUNT2,
                            kk.SHIP_QTY,
                            kk.SHIP_AMOUNT,
                            sum(kk2.TOT_CNT) as TOT_CNT
                        from
                            (
                                select
                                    isnull(A.INVOICE_NO, '') as INVOICE_NO,
                                    A.ORDER_CD,
                                    A.PROD_CD,
                                    isnull(F1.PAYMENT_TYPE, '') as PAYMENT_TYPE,
                                    A.SHIP_DATE,
                                    isnull(sum(D.USD_PRICE * A.SHIP_CNT), 0) as SHIP_AMOUNT2,
                                    isnull(sum(A.SHIP_CNT), 0) AS SHIP_QTY,
                                    isnull(sum(A.SHIP_PRICE * A.SHIP_CNT), 0) as SHIP_AMOUNT
                                FROM
                                    KSV_ORDER_MST D,
                                    KCD_STYLE D1,
                                    KSV_ORDER_SHIP A
                                    left join KSV_INVOICE_MST F1 on A.INVOICE_NO = F1.INVOICE_NO
                                    AND F1.PAYMENT_TYPE like '%${args.data.PAYMENT_TYPE}%'
                                where
                                    A.ORDER_CD = D.ORDER_CD
                                    AND D.STYLE_CD = D1.STYLE_CD
                                    AND D.ORDER_TYPE in ('0', '1')
                                    --AND    A.SHIP_PTYPE like '%${args.data.SHIP_MODE}%'
                                    AND A.INVOICE_NO like '%${args.data.INVOICE_NO}%'
                                    AND A.DELIVERY_TYPE like '%${args.data.DELIVERY_TYPE}%'
                                    AND D.ORDER_CD LIKE '%${args.data.ORDER_CD}%'
                                    AND D.FACTORY_CD like '%${args.data.FACTORY_CD}%'
                                    AND LEFT(D.ORDER_CD, 2) like '%${args.data.BUYER_CD}%'
                                    AND (
                                        D1.STYLE_CD like '%${args.data.STYLE_CD}%'
                                        or D1.STYLE_NAME like '%${args.data.STYLE_CD}%'
                                    ) ${tSQL1}
                                group by
                                    A.INVOICE_NO,
                                    left(A.ORDER_CD, 2),
                                    A.ORDER_CD,
                                    A.PROD_CD,
                                    F1.PAYMENT_TYPE,
                                    A.SHIP_DATE
                            ) kk,
                            ksv_order_mem kk2
                        where
                            kk.ORDER_CD = kk2.ORDER_CD
                            and kk.PROD_CD = kk2.PROD_CD
                            and kk.PAYMENT_TYPE like '%${args.data.PAYMENT_TYPE}%'
                        group by
                            kk.INVOICE_NO,
                            kk.ORDER_CD,
                            kk.PROD_CD,
                            kk.PAYMENT_TYPE,
                            kk.SHIP_DATE,
                            kk.SHIP_AMOUNT2,
                            kk.SHIP_QTY,
                            kk.SHIP_AMOUNT
                    ) F0
                    left join KSV_INVOICE_MST F on F.INVOICE_NO = F0.INVOICE_NO
                    left join KCD_CODE G on G.CD_GROUP = 'PAYMENT_TYPE'
                    and G.CD_CODE = F0.PAYMENT_TYPE,
                    KCD_BUYER B1
                WHERE
                    F0.BUYER_CD = B1.BUYER_CD
                GROUP BY
                    F0.INVOICE_NO,
                    F.BL_NO,
                    F.ATD,
                    F.SHIP_DATE,
                    F.INCOME_DATE,
                    F0.BUYER_CD,
                    F0.SHIP_DATE,
                    B1.BUYER_NAME,
                    F.DOCU_NO,
                    F.TOT_AMT,
                    F.ADJ_AMT,
                    F.ORD_AMT,
                    F.PAYMENT_TYPE,
                    G.CD_NAME,
                    F.CURR_CD
                order by
                    F0.SHIP_DATE,
                    F0.INVOICE_NO
            `;

            var tRet1000 = await prisma.$queryRaw(Prisma.raw(sqlStr));
            console.log(`Excel Sql: ${tRet1000.length}`);
            var tRetData = {};
            var tRetArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet1000.length; tIdx++) {
                var tObj = { ...tRet1000[tIdx] };

                if (tObj.INCOME_DATE === '') {
                    let sql0 = `
                        select
                            *
                        from
                            ksv_invoice_info
                        where
                            invoice_no = '${tObj.INVOICE_NO}'
                    `;
                    var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                    if (tRet0.length > 0)
                        tObj.INCOME_DATE = tRet0[0].INCOME_DATE1;
                }

                let sql0 = `
                    select
                        *
                    from
                        kcd_fileinfo
                    where
                        file_key = '${tObj.INVOICE_NO}'
                        and kind like 'ORDER_SHIP_%'
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                if (tRet0.length > 0) {
                    tRet0.forEach((col, i) => {
                        if (col.KIND === 'ORDER_SHIP_BL_FILE') {
                            tObj.BL_FILE = col.NAME;
                            tObj.BL_FILE_URL = col.URL;
                        }
                        if (col.KIND === 'ORDER_SHIP_PL_FILE') {
                            tObj.PL_FILE = col.NAME;
                            tObj.PL_FILE_URL = col.URL;
                        }
                        if (col.KIND === 'ORDER_SHIP_CI_FILE') {
                            tObj.CI_FILE = col.NAME;
                            tObj.CI_FILE_URL = col.URL;
                        }
                        if (col.KIND === 'ORDER_SHIP_OTHER_FILE') {
                            tObj.OTHER_FILE = col.NAME;
                            tObj.OTHER_FILE_URL = col.URL;
                        }
                        if (col.KIND === 'ORDER_SHIP_BL_FILE2') {
                            tObj.BL_FILE2 = col.NAME;
                            tObj.BL_FILE_URL2 = col.URL;
                        }
                        if (col.KIND === 'ORDER_SHIP_PL_FILE2') {
                            tObj.PL_FILE2 = col.NAME;
                            tObj.PL_FILE_URL2 = col.URL;
                        }
                        if (col.KIND === 'ORDER_SHIP_CI_FILE2') {
                            tObj.CI_FILE2 = col.NAME;
                            tObj.CI_FILE_URL2 = col.URL;
                        }
                        if (col.KIND === 'ORDER_SHIP_OTHER_FILE2') {
                            tObj.OTHER_FILE2 = col.NAME;
                            tObj.OTHER_FILE_URL2 = col.URL;
                        }
                    });
                }

                let sql1 = `
                    select distinct
                        a.invoice_no,
                        a.ship_date,
                        a.ship_ptype,
                        a.delivery_type,
                        a.exfactory,
                        a.nat_cd,
                        b.nat_name,
                        isnull(a3.cd_name, '') as ship_mode_n,
                        isnull(a4.cd_name, '') as delivery_type_n
                    from
                        ksv_order_ship a
                        left join KCD_CODE A3 ON a.SHIP_PTYPE = A3.CD_CODE
                        and A3.CD_GROUP = 'SHIP_PTYPE'
                        left join KCD_CODE A4 ON a.DELIVERY_TYPE = A4.CD_CODE
                        and A4.CD_GROUP = 'DELIVERY_TYPE'
                        left join KCD_NATION b on a.nat_cd = b.nat_cd
                    where
                        a.invoice_no = '${tObj.INVOICE_NO}'
                        and a.ship_date = '${tObj.SHIP_DATE}'
                `;
                var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                if (tRet1.length > 0) {
                    tObj.SHIP_PTYPE = tRet1[0].ship_ptype;
                    tObj.DELIVERY_TYPE = tRet1[0].delivery_type;
                    tObj.SHIP_MODE_N = tRet1[0].ship_mode_n;
                    tObj.DELIVERY_TYPE_N = tRet1[0].delivery_type_n;
                    tObj.EXFACTORY = tRet1[0].exfactory;
                    tObj.NAT_CD = tRet1[0].nat_cd;
                    tObj.NAT_NAME = tRet1[0].nat_name;
                }
                if (typeof args.data.NAT_CD === 'undefined');
                else {
                    if (
                        args.data.NAT_CD !== '' &&
                        args.data.NAT_CD !== tObj.NAT_CD
                    )
                        continue;
                }

                // console.log(tObj);
                /*
           if (parseFloat(tObj.SHIP_AMOUNT) <= 0) tObj.SHIP_AMOUNT = tObj.SHIP_AMOUNT2;
           if (parseFloat(tObj.SHIP_AMOUNT) <= 0) tObj.SHIP_AMOUNT = tObj.TOT_AMT;
           tObj.SHIP_AMOUNT = tObj.TOT_AMT;
           */

                /*
           if (parseFloat(tObj.TOT_AMT) <= 0) {
               var tShipAmount = parseFloat(tObj.SHIP_AMOUNT);
               if (tShipAmount <= 0) tShipAmount = parseFloat(tObj.SHIP_AMOUNT2);
               var tOrdAmount = parseFloat(tObj.SHIP_AMOUNT2);
               var tAdjAmount = tShipAmount - tOrdAmount;
               tObj.ORD_AMT = String(tOrdAmount);
               tObj.ADJ_AMT = String(tAdjAmount);
               tObj.TOT_AMT = String(tShipAmount);
               tObj.SHIP_AMOUNT = String(tShipAmount);

               tObj.SHIP_PRICE = String(tShipAmount / parseFloat(tObj.SHIP_QTY));
           } else {
               tObj.SHIP_AMOUNT = String(tObj.TOT_AMT);
               tObj.SHIP_PRICE = String(parseFloat(tObj.TOT_AMT) / parseFloat(tObj.SHIP_QTY));
           }
           */

                if (parseFloat(tObj.TOT_AMT) <= 0) {
                    var tShipAmount = parseFloat(tObj.SHIP_AMOUNT);
                    if (tShipAmount <= 0)
                        tShipAmount = parseFloat(tObj.SHIP_AMOUNT2);
                    var tOrdAmount = parseFloat(tObj.SHIP_AMOUNT2);
                    var tAdjAmount = tShipAmount - tOrdAmount;
                    tObj.ORD_AMT = String(tOrdAmount);
                    tObj.ADJ_AMT = '0';
                    tObj.TOT_AMT = '0';
                    tObj.SHIP_AMOUNT = String(tShipAmount);

                    tObj.SHIP_PRICE = String(
                        tShipAmount / parseFloat(tObj.SHIP_QTY),
                    );
                } else {
                    tObj.SHIP_AMOUNT = String(tObj.TOT_AMT);
                    tObj.SHIP_PRICE = String(
                        parseFloat(tObj.TOT_AMT) / parseFloat(tObj.SHIP_QTY),
                    );
                }

                var tBillAmt = 0;
                var tOANegoAmt = 0;
                var tRemainAmt = 0;

                // bill_type = '1':  TT입금,  bill_type = '2': OA 네고, OA Nego와 TT입금은 별도임

                let sqlStr1 = `
                    select
                        curr_cd,
                        bill_amt,
                        bill_date,
                        bill_type
                    from
                        ksv_invoice_bill
                    where
                        invoice_no = '${tObj.INVOICE_NO}'
                        -- and   bill_type <> '2' 
                        -- and   bill_type in  ('1' , '2')
                        and bill_type in ('1')
                    order by
                        bill_type
                `;
                var tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));
                var tIdx98 = 0;
                for (tIdx98 = 0; tIdx98 < tRet1.length; tIdx98++) {
                    var tOne = { ...tRet1[tIdx98] };
                    let sqlStr2 = `
                        select
                            usd_rate
                        from
                            kcd_currency
                        where
                            start_date = '${tOne.bill_date}'
                            and curr_cd = '${tOne.curr_cd}'
                    `;
                    var tRet2 = await prisma.$queryRaw(Prisma.raw(sqlStr2));
                    if (tRet2.length <= 0) {
                        sqlStr2 = `
                            select
                                usd_rate
                            from
                                kcd_currency
                            where
                                start_date = (
                                    select
                                        max(start_date)
                                    from
                                        kcd_currency
                                    where
                                        curr_cd = '${tOne.curr_cd}'
                                )
                                and curr_cd = '${tOne.curr_cd}'
                        `;
                        tRet2 = await prisma.$queryRaw(Prisma.raw(sqlStr2));
                    }

                    var tAmt = 0;
                    if (tObj.CURR_CD === tOne.curr_cd)
                        tAmt = parseFloat(tOne.bill_amt);
                    else
                        tAmt =
                            parseFloat(tOne.bill_amt) *
                            parseFloat(tRet2[0].usd_rate);

                    if (tOne.bill_type === '1') tBillAmt += tAmt;
                    // if (tOne.bill_type === '2') tBillAmt -= tAmt;
                }

                if (tBillAmt < 0 && tBillAmt <= 0.01) tBillAmt = 0;

                let sqlStr10 = `
                    select
                        isnull(sum(bill_amt), 0) as s_amt
                    from
                        ksv_invoice_bill a,
                        ksv_invoice_nego b
                    where
                        a.invoice_no = '${tObj.INVOICE_NO}'
                        and a.bill_type = '2'
                        and a.ref_no = b.ref_no
                `;
                var tRet10 = await prisma.$queryRaw(Prisma.raw(sqlStr10));
                if (tRet10.length > 0) tOANegoAmt = parseFloat(tRet10[0].s_amt);

                if (parseFloat(tObj.TOT_AMT) <= 0) tRemainAmt = 0;
                //else tRemainAmt = parseFloat(tObj.TOT_AMT) - tBillAmt - tOANegoAmt;
                else tRemainAmt = parseFloat(tObj.TOT_AMT) - tBillAmt;
                if (tRemainAmt <= 0.01) tRemainAmt = 0;
                tObj.BILL_AMT = String(tBillAmt);
                tObj.OA_NEGO = String(tOANegoAmt);
                tObj.REMAIN_AMT = String(tRemainAmt);

                tRetArray.push(tObj);
            }

            var tRet = [...tRetArray];
            console.log(`Excel Count: ${tRet.length}`);

            if (eDate === '99999999') eDate = tRetDate1;

            var tTitle = `출고금액리스트(간단)`;
            var tWExcelFile = `출고금액리스트(간단)-${tUserInfo.USER_ID}trade1-${tRetDate}`;
            var tRetExcelFile = '';

            try {
                // Excel Read
                var tPath0 = '';
                var tCols0 = __dirname.split('/');
                var tFlag0 = 0;
                tCols0.forEach((col, i) => {
                    if (col !== '') {
                        if (col === 'src') {
                            tPath0 += '/upload/excel_template';
                            tFlag0 = 1;
                        }
                        if (tFlag0 === 0) {
                            tPath0 += '/' + col;
                        }
                    }
                });

                var tTemplateName = '출고금액리스트(간단)';
                var tTemplateExcel = `${tPath0}/${tTemplateName}.xlsx`;

                const wb = new Excel.Workbook();
                await wb.xlsx.readFile(tTemplateExcel);

                var tSheetName = `TRADE_INVOICE_LIST`;
                var sheet = wb.getWorksheet(tSheetName);

                //
                sheet.getCell(2, 19).value =
                    `기간:${moment(sDate, 'YYYYMMDD').format('YYYY-MM-DD')} ~ ${moment(eDate, 'YYYYMMDD').format('YYYY-MM-DD')}`;

                var tRowIdx = 4;

                var tIdx99 = 0;
                for (tIdx99 = 0; tIdx99 < tRet.length; tIdx99++) {
                    var col = { ...tRet[tIdx99] };
                    if (tIdx99 > 0) {
                        var tmpRow = [];
                        sheet.insertRow(tRowIdx, tmpRow, 'i');
                    }

                    var tBillAmt = 0;
                    var tOANegoAmt = 0;
                    var tRemainAmt = 0;

                    var tSDate = col.ATD;
                    //if (tSDate === '') tSDate = col.SHIP_DATE;

                    sheet.getCell(tRowIdx, 1).value = col.INVOICE_NO;
                    sheet.getCell(tRowIdx, 2).value = col.BUYER_NAME;
                    sheet.getCell(tRowIdx, 3).value = col.EXT_INVOICE;
                    sheet.getCell(tRowIdx, 4).value = col.PAYMENT_NAME;
                    sheet.getCell(tRowIdx, 5).value = col.NAT_NAME;

                    sheet.getCell(tRowIdx, 6).value = parseDate(col.ETD);
                    sheet.getCell(tRowIdx, 7).value = parseDate(tSDate);
                    sheet.getCell(tRowIdx, 8).value = parseDate(
                        col.INCOME_DATE,
                    );

                    sheet.getCell(tRowIdx, 6).numFmt = 'yyyy-mm-dd';
                    sheet.getCell(tRowIdx, 7).numFmt = 'yyyy-mm-dd';
                    sheet.getCell(tRowIdx, 8).numFmt = 'yyyy-mm-dd';

                    sheet.getCell(tRowIdx, 9).value = col.CURR_CD;
                    sheet.getCell(tRowIdx, 10).value = parseFloat(col.TOT_AMT);
                    sheet.getCell(tRowIdx, 11).value = parseFloat(col.BILL_AMT);
                    sheet.getCell(tRowIdx, 12).value = parseFloat(col.OA_NEGO);
                    sheet.getCell(tRowIdx, 13).value = parseFloat(
                        col.REMAIN_AMT,
                    );
                    sheet.getCell(tRowIdx, 14).value = parseFloat(col.ADJ_AMT);
                    sheet.getCell(tRowIdx, 15).value = col.REMARK;
                    sheet.getCell(tRowIdx, 16).value = col.DELIVERY_TYPE_N;
                    sheet.getCell(tRowIdx, 17).value = col.DOCU_NO;
                    sheet.getCell(tRowIdx, 18).value = col.BL_NO;

                    // A~R 컬럼까지 테두리 적용
                    for (let colIdx = 1; colIdx <= 18; colIdx++) {
                        // A(1) ~ R(18)
                        sheet.getCell(tRowIdx, colIdx).border = {
                            top: { style: 'thin' },
                            left: { style: 'thin' },
                            bottom: { style: 'thin' },
                            right: { style: 'thin' },
                        };
                    }

                    tRowIdx += 1;
                }
                return await upload(`${tWExcelFile}.xlsx`, wb);
            } catch (error) {
                var tRetArray = [];
                var tObj = {};
                tObj.id = 1;
                tObj.CODE = `ERROR:Excel Print:${error.message}`;
                console.log(tObj.CODE);
                tRetArray.push(tObj);
                return tRetArray;
            }
        },
    },
};

const parseDate = (dateStr) => {
    if (!dateStr) return null;
    const year = parseInt(dateStr.slice(0, 4));
    const month = parseInt(dateStr.slice(4, 6)) - 1;
    const day = parseInt(dateStr.slice(6, 8));
    return new Date(Date.UTC(year, month, day, 0, 0, 0)); // KST 기준으로 하루 보정 안 생김
};

export default moduleQuery_S0513_4;
