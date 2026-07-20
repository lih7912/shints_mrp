// MGR_@@TNAME@@.queries.js

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
} = require('../../../routes/s3');
const { MongoClient } = require('mongodb');

//
class S0217_COMM {
    async LIST1 (argData, contextValue) {
        var tTableName = '';
        var sqlFactory = '';
        if (argData.FACTORY_CD === 'FC044') {
            tTableName = 'KSV_ORDER_PLAN_ETHIOPIA';
            sqlFactory = `'FC044' `;
        }
        else {
             tTableName = 'KSV_ORDER_PLAN';
            sqlFactory = `'FC034', 'FC113', 'FC087' `;
        }

        var tMonArray = [ ...argData.YYMM ];
        var tLineArray = ['1', '3', 'D', 'W', 'S'];

        var sqlBuyer = '';
        if (argData.TEAM_CD === '')
            sqlBuyer = `and a.buyer_cd like '%${argData.BUYER_CD}%'`;
        else sqlBuyer = `and a.buyer_team like '%${argData.TEAM_CD}%'`;

        var sqlLineType = ` AND a.LINE_TYPE like '%${argData.TYPE}%'  `;
        var sqlNsr = '';
        var sqlStyle = '';
        if (argData.REPORT_KIND === 'NSR') {
            sqlNsr = `  and a.buyer_cd in ('wi','ss','wf','nn','ns','ng','np') `;
            sqlNsr = '';
            sqlBuyer = '';
        } else if (argData.REPORT_KIND === 'EXCL_NSR') {
            sqlNsr = `  and a.buyer_cd not in ('wi','ss','wf','nn','ns','ng','np') `;
            sqlBuyer = '';
        } else if (argData.REPORT_KIND === 'EXCL_GLOVE') {
            sqlNsr = `  and a.buyer_cd not in ('sg','ng','np') and left(a.buyer_cd,1) not in ('1','9') and c.buyer_type = '0' `;
            sqlLineType = ` and a.line_type not in ('G')  `;
            sqlBuyer = '';
        } else if (argData.REPORT_KIND === 'GLOVE') {
            sqlNsr = `  and a.buyer_cd  in ('sg') and a.buyer_cd like '1%'  `;
            sqlLineType = ``;
            sqlBuyer = '';
        } else if (argData.REPORT_KIND === 'EXCL_G_N') {
            sqlNsr = `  and a.buyer_cd not in ('wi','ss','wf','nn','ns','ng','np','sg','1f','1t') and and c.buyer_team not in ('06') `;
            sqlLineType = ` and a.line_type not in ('G')  `;
            sqlBuyer = '';
        } else if (argData.REPORT_KIND === 'TENT') {
            sqlNsr = `  and c.buyer_type = '3'  `;
            sqlLineType = ``;
            sqlBuyer = '';
        } else if (argData.REPORT_KIND === 'DOWN') {
            sqlNsr = `  and a.buyer_cd not in ('ng','np') `;
            sqlStyle = `  and d.down not in ('','X') `;
            sqlLineType = ` and a.line_type in ('D')  `;
            sqlBuyer = '';
        } else {
            sqlNsr = `  and a.buyer_cd not in ('ng','np') `;
        }
   
        var sqlFactory = '';
        if (argData.FACTORY_CD === 'FC044') {
            sqlFactory = `   and a.factory_cd in ('fc044')`;
        } else if (argData.FACTORY_CD === 'FC034') {
            sqlFactory = `   and a.factory_cd in ('fc034','fc113','fc087')`;
        }


        var tCollection = '';
        if (argData.COLLECTION_CD) tCollection = argData.COLLECTION_CD;
        if (argData.COLLECTION_CD && argData.COLLECTION_CD === 'All') tCollection = '';

        var tArray99 = [];
        for (var tIdx = 0; tIdx < 15; tIdx++) {
            var tArray2 = [];
            for (var tIdx1 = 0; tIdx1 < 5; tIdx1++) {
                var tObj = {};
                tObj.YYMM = tMonArray[tIdx];
                tObj.LINE_TYPE = tLineArray[tIdx1];
                tObj.PLAN_QTY = 0;
                tObj.PLAN_AMT = 0;
                tObj.PLAN_PRICE = 0;
                tObj.CM_PRICE = 0;
                tObj.CM_AMT = 0;
                tObj.CURR_CD = '';
                tObj.USER_ID = '';
                tObj.ORDER_QTY = 0;
                tObj.ORDER_AMT = 0;
                tObj.CURR_CM_AMT = 0;
                tObj.OLD_ORDER_QTY = 0;
                tObj.OLD_ORDER_AMT = 0;
                tObj.OLD_CM_AMT = 0;
                tArray2.push(tObj);
            }
            tArray99.push(tArray2);
        }

        let sqlStr0_1 = `
            select
                a.LINE_TYPE,
                a.YYMM,
                isnull(sum(a.PLAN_QTY), 0) as PLAN_QTY,
                isnull(sum(a.PLAN_AMT * b.usd_rate), 0) as PLAN_AMT,
                isnull(sum(a.CM_AMT * b.usd_rate), 0) as CM_AMT,
                0 as CM_PRICE,
                a.curr_cd as CURR_CD,
                '' as USER_ID
            from
                ${tTableName} AS a,  kcd_curr_com as b, kcd_buyer as c
            WHERE
                a.YYMM between '${tMonArray[0]}' and '${tMonArray[14]}' 
                and a.buyer_cd = c.buyer_cd
                and a.curr_cd = b.curr_cd
                and b.start_date = (select max(start_date) from kcd_curr_com  where curr_cd = b.curr_cd)
                ${sqlBuyer}
                ${sqlNsr}
                ${sqlLineType}
            group by
                a.line_type,
                a.yymm, 
                a.curr_cd
        `;
        let sqlStr0_2 = `
            select
                a.LINE_TYPE,
                a.YYMM,
                isnull(a.PLAN_QTY, 0) as PLAN_QTY,
                isnull(a.PLAN_AMT * b.usd_rate, 0) as PLAN_AMT,
                isnull(a.CM_PRICE, 0) as CM_PRICE,
                isnull(a.CM_AMT * b.usd_rate, 0) as CM_AMT,
                a.CURR_CD,
                a.USER_ID
            from
                ${tTableName}  as a, kcd_curr_com as b, kcd_buyer as c
            WHERE
                a.YYMM between '${tMonArray[0]}' and '${tMonArray[14]}' 
                and a.buyer_cd = c.buyer_cd
                AND a.COLLECTION like '%${tCollection}%'
                and a.curr_cd = b.curr_cd
                and b.start_date = (select max(start_date) from kcd_curr_com  where curr_cd = b.curr_cd)
                ${sqlBuyer}
                ${sqlNsr}
                ${sqlLineType}
            order by
                a.line_type,
                a.yymm
        `;

        var tRet1 = [];
        if (tCollection === '')
            tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr0_1));
        else tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr0_2));

        tRet1.forEach((col, i) => {
            var tIndex1 = -1;
            var tIndex2 = -1;
            tMonArray.forEach((col1, i1) => {
                if (col1 === col.YYMM) tIndex1 = i1;
            });
            tLineArray.forEach((col1, i1) => {
                if (col1 === col.LINE_TYPE) tIndex2 = i1;
            });

            if (tIndex1 !== -1 && tIndex2 !== -1) {
                var tObj1 = { ...tArray99[tIndex1][tIndex2] };
                tObj1.PLAN_QTY = col.PLAN_QTY;
                tObj1.PLAN_AMT = col.PLAN_AMT;
                tObj1.PLAN_PRICE = 0;
                if (tObj1.PLAN_QTY > 0)
                    tObj1.PLAN_PRICE = tObj1.PLAN_AMT / tObj1.PLAN_QTY;
                tObj1.CM_PRICE = col.CM_PRICE;
                tObj1.CM_AMT = col.CM_AMT;
                tObj1.CURR_CD = col.CURR_CD;
                tObj1.USER_ID = col.USER_ID;
                tArray99[tIndex1][tIndex2] = tObj1;
            }
        });

        let sqlStr1 = `
            SELECT
                a.LINE_TYPE,
                a.YYMM,
                isnull(sum(a.order_qty), 0) as ORDER_QTY,
                isnull(sum(a.order_amt), 0) as ORDER_AMT,
                isnull(sum(a.cm_amt), 0) as CM_AMT
            FROM
                KSV_ORDER_PLAN_order a, kcd_buyer c
            WHERE
                a.YYMM between '${tMonArray[0]}' and '${tMonArray[14]}' 
                and a.buyer_cd = c.buyer_cd
                ${sqlFactory}
                ${sqlBuyer}
                ${sqlNsr}
                ${sqlLineType}
            group by
                a.line_type,
                a.yymm
        `;
        var tRet2 = await prisma.$queryRaw(Prisma.raw(sqlStr1));

        tRet2.forEach((col, i) => {
            var tIndex1 = -1;
            var tIndex2 = -1;
            tMonArray.forEach((col1, i1) => {
                if (col1 === col.YYMM) tIndex1 = i1;
            });
            tLineArray.forEach((col1, i1) => {
                if (col1 === col.LINE_TYPE) tIndex2 = i1;
            });

            if (tIndex1 !== -1 && tIndex2 !== -1) {
                var tObj1 = { ...tArray99[tIndex1][tIndex2] };
                tObj1.ORDER_QTY = col.ORDER_QTY;
                tObj1.ORDER_AMT = col.ORDER_AMT;
                tObj1.CURR_CM_AMT = col.CM_AMT;
                tArray99[tIndex1][tIndex2] = tObj1;
            }
        });

        var tRetArray = [];
        for (var tIdx = 0; tIdx < 15; tIdx++) {
            for (var tIdx1 = 0; tIdx1 < 5; tIdx1++) {
                var tObj1 = { ...tArray99[tIdx][tIdx1] };
                var arrayTYPE: string[] = [
                    '',
                    '1',
                    '3',
                    'D',
                    'W',
                    'G',
                    'S',
                ];
                var arrayTYPE1: string[] = [
                    ' ',
                    'Normal',
                    '3/4',
                    'Down',
                    'G/S',
                    'Glove',
                    'S/S',
                ];
                var tFind = -1;
                arrayTYPE.forEach((col, i) => {
                    if (col === tObj1.LINE_TYPE) tFind = i;
                });
                if (tFind !== -1) tObj1.LINE_TYPE_N = arrayTYPE1[tFind];
                else tObj1.LINE_TYPE_N = '';
                tRetArray.push(tObj1);
            }
        }

        return tRetArray;

    }

    async LIST2 (argData, contextValue) {
        var tTableName = '';
        if (argData.FACTORY_CD === 'FC044')
            tTableName = 'KSV_ORDER_PLAN_ETHIOPIA';
        else tTableName = 'KSV_ORDER_PLAN';

        var tMonArray = [ ...argData.YYMM ];
        var tLineArray = ['1', '3', 'D', 'W', 'S'];

        var tCollection = '';
        if (argData.COLLECTION_CD) tCollection = argData.COLLECTION_CD;
        if (argData.COLLECTION_CD && argData.COLLECTION_CD === 'All') tCollection = '';

        var tArray99 = [];
        for (var tIdx = 0; tIdx < 12; tIdx++) {
            var tObj = {};
            tObj.YYMM = tMonArray[tIdx];
            tObj.LINE_TYPE = '';
            tObj.PLAN_QTY = 0;
            tObj.PLAN_AMT = 0;
            tObj.PLAN_PRICE = 0;
            tObj.CM_PRICE = 0;
            tObj.CM_AMT = 0;
            tObj.CURR_CD = '';
            tObj.USER_ID = '';
            tObj.ORDER_QTY = 0;
            tObj.ORDER_AMT = 0;
            tObj.CURR_CM_AMT = 0;
            tObj.OLD_ORDER_QTY = 0;
            tObj.OLD_ORDER_AMT = 0;
            tObj.OLD_CM_AMT = 0;
            tArray99.push(tObj);
        }

        let sqlStr0_1 = `
            select 
                a.YYMM,
                isnull(sum(a.PLAN_QTY), 0) as PLAN_QTY,
                isnull(sum(a.PLAN_AMT * b.usd_rate), 0) as PLAN_AMT,
                isnull(sum(a.CM_AMT * b.usd_rate), 0) as CM_AMT,
                0 as CM_PRICE,
                a.curr_cd as CURR_CD,
                '' as USER_ID
            from
                ${tTableName} AS a,  kcd_curr_com as b
            WHERE
                a.BUYER_CD LIKE '%${argData.BUYER_CD}%'
                AND a.YYMM between '${tMonArray[0]}' and '${tMonArray[11]}' 
                AND a.LINE_TYPE like '%${argData.TYPE}%'
                and a.curr_cd = b.curr_cd
                and b.start_date = (select max(start_date) from kcd_curr_com  where curr_cd = b.curr_cd)
            group by
                a.yymm,
                a.curr_cd
        `;
        let sqlStr0_2 = `
            select
                a.YYMM,
                isnull(a.PLAN_QTY, 0) as PLAN_QTY,
                isnull(a.PLAN_AMT * b.usd_rate, 0) as PLAN_AMT,
                isnull(a.CM_PRICE, 0) as CM_PRICE,
                isnull(a.CM_AMT * b.usd_rate, 0) as CM_AMT,
                a.CURR_CD,
                a.USER_ID
            from
                ${tTableName}  as a, kcd_curr_com as b
            WHERE
                a.BUYER_CD LIKE '%${argData.BUYER_CD}%'
                AND a.YYMM between '${tMonArray[0]}' and '${tMonArray[11]}' 
                AND a.COLLECTION like '%${tCollection}%'
                AND a.LINE_TYPE like '%${argData.TYPE}%'
                and a.curr_cd = b.curr_cd
                and b.start_date = (select max(start_date) from kcd_curr_com  where curr_cd = b.curr_cd)
            order by
                a.yymm
        `;

        var tRet1 = [];
        if (tCollection === '')
            tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr0_1));
        else tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr0_2));

        tRet1.forEach((col, i) => {
            var tIndex1 = -1;
            var tIndex2 = -1;
            tMonArray.forEach((col1, i1) => {
                if (col1 === col.YYMM) tIndex1 = i1;
            });

            if (tIndex1 !== -1 ) {
                var tObj1 = { ...tArray99[tIndex1] };
                tObj1.PLAN_QTY = col.PLAN_QTY;
                tObj1.PLAN_AMT = col.PLAN_AMT;
                tObj1.PLAN_PRICE = 0;
                if (tObj1.PLAN_QTY > 0)
                    tObj1.PLAN_PRICE = tObj1.PLAN_AMT / tObj1.PLAN_QTY;
                tObj1.CM_PRICE = col.CM_PRICE;
                tObj1.CM_AMT = col.CM_AMT;
                tObj1.CURR_CD = col.CURR_CD;
                tObj1.USER_ID = col.USER_ID;
                tArray99[tIndex1] = tObj1;
            }
        });

        let sqlStr1 = `
            SELECT
                b.YYMM,
                isnull(sum(b.order_qty), 0) as ORDER_QTY,
                isnull(sum(b.order_amt), 0) as ORDER_AMT,
                isnull(sum(b.cm_amt), 0) as CM_AMT
            FROM
                KSV_ORDER_PLAN_order b
            WHERE
                b.BUYER_CD LIKE '%${argData.BUYER_CD}%'
                AND b.YYMM between '${tMonArray[0]}' and '${tMonArray[11]}' 
                AND b.factory_cd = '${argData.FACTORY_CD}'
                AND b.LINE_TYPE like '%${argData.TYPE}%'
            group by
                b.yymm
        `;
        var tRet2 = await prisma.$queryRaw(Prisma.raw(sqlStr1));

        tRet2.forEach((col, i) => {
            var tIndex1 = -1;
            var tIndex2 = -1;
            tMonArray.forEach((col1, i1) => {
                if (col1 === col.YYMM) tIndex1 = i1;
            });

            if (tIndex1 !== -1) {
                var tObj1 = { ...tArray99[tIndex1] };
                tObj1.ORDER_QTY = col.ORDER_QTY;
                tObj1.ORDER_AMT = col.ORDER_AMT;
                tObj1.CURR_CM_AMT = col.CM_AMT;
                tArray99[tIndex1] = tObj1;
            }
        });

        var tRetArray = [ ...tArray99 ];
        return tRetArray;

    }
}

// export default로 Query 내용 내보내기
const moduleQuery_S0217_SALES_MATL_PLAN_LIST_TBL_KSV_ORDER_MST1 = {
    Query: {
        mgrQuery_S0217_EXCEL_PRINT: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tCurrYYMM = `${tRetDate.substring(0, 6)}`;
            var tCurrYYMM2 = '';

            var subTitle = args.data.REPORT_KIND;

            var tFactoryN = '_BVT';
            var tBuyerN = '';
            if (args.data.FACTORY_CD === 'FC044') tFactoryN = '_ETP';
            if (args.data.BUYER_CD !== '') tBuyerN = `_${args.data.BUYER_CD}`;
            var tWExcelFile = `판매계획(${subTitle})${tFactoryN}${tBuyerN}-${tUserInfo.USER_ID}-${tRetDate1}`;

            var startYear = parseFloat(args.data.S_DATE.substring(0, 4));
            var startMon = parseFloat(args.data.S_DATE.substring(4,6));
            var tMonArray = [];
            var tYYStr = startYear;
            var tMMStr = startMon;
            for (var tIdx = 0; tIdx < 15; tIdx++) {
                if (tMMStr === 13) {
                    tYYStr = startYear + 1;
                    tMMStr = 1;
                } else {
                    ;
                }
                if (String(tMMStr).length <= 1) {
                    tMonArray.push(`${tYYStr}0${tMMStr}`);
                } else {
                    tMonArray.push(`${tYYStr}${tMMStr}`);
                }
                tMMStr += 1;
            }

            //
            tMonArray.forEach((col, i) => {
                if (col === tCurrYYMM) {
                    var tmp = i + 2;
                    if (tmp >= tMonArray.length) tCurrYYMM2 = tCurrYYMM;
                    else tCurrYYMM2 = tMonArray[tmp];
                }
            });


            var s_date = tMonArray[0];
            var e_date = tMonArray[14];

            var tLineArray = ['1', '3', 'D', 'W', 'S'];

            var tArray99 = [];
            for (var tIdx = 0; tIdx < 12; tIdx++) {
                var tArray2 = [];
                for (var tIdx1 = 0; tIdx1 < 10; tIdx1++) {
                    tArray2.push(0);
                }
                tArray99.push(tArray2);
            }

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
                var tTemplateExcel = `${tPath0}/영업_판매계획.xlsx`;

                const wb = new Excel.Workbook();
                await wb.xlsx.readFile(tTemplateExcel);

                var tSheetName = `Sheet1`;
                const sheet = wb.getWorksheet(tSheetName);
                // const sheet = wb.getWorksheet(1);

                var tTableName = 'KSV_ORDER_PLAN';
                if (args.data.FACTORY_CD === 'FC044')
                    tTableName = 'KSV_ORDER_PLAN_ETHIOPIA';

                var sqlBuyer = '';
                if (args.data.TEAM_CD === '')
                    sqlBuyer = `and a.buyer_cd like '%${args.data.BUYER_CD}%'`;
                else sqlBuyer = `and a.buyer_team like '%${args.data.TEAM_CD}%'`;

                var sqlLineType = '';
                var sqlNsr = '';
                var sqlStyle = '';
                if (args.data.REPORT_KIND === 'NSR') {
                    sqlNsr = `  and a.buyer_cd in ('wi','ss','wf','nn','ns','ng','np') `;
                    sqlNsr = '';
                } else if (args.data.REPORT_KIND === 'EXCL_NSR') {
                    sqlNsr = `  and a.buyer_cd not in ('wi','ss','wf','nn','ns','ng','np') `;
                    sqlBuyer = '';
                } else if (args.data.REPORT_KIND === 'EXCL_GLOVE') {
                    sqlNsr = `  and a.buyer_cd not in ('sg','ng','np') and left(a.buyer_cd,1) not in ('1','9') and a.buyer_type = '0' `;
                    sqlLineType = ` and b.line_type not in ('G')  `;
                    sqlBuyer = '';
                } else if (args.data.REPORT_KIND === 'GLOVE') {
                    sqlNsr = `  and a.buyer_cd  in ('sg') and a.buyer_cd like '1%'  `;
                    sqlLineType = ``;
                    sqlBuyer = '';
                } else if (args.data.REPORT_KIND === 'EXCL_G_N') {
                    sqlNsr = `  and a.buyer_cd not in ('wi','ss','wf','nn','ns','ng','np','sg','1f','1t') and a.buyer_team not in ('06') `;
                    sqlLineType = ` and b.line_type not in ('G')  `;
                    sqlBuyer = '';
                } else if (args.data.REPORT_KIND === 'TENT') {
                    sqlNsr = `  and a.buyer_type = '3'  `;
                    sqlLineType = ``;
                    sqlBuyer = '';
                } else if (args.data.REPORT_KIND === 'DOWN') {
                    sqlNsr = `  and a.buyer_cd not in ('ng','np') `;
                    sqlStyle = `  and d.down not in ('','X') `;
                    sqlLineType = ` and b.line_type in ('D')  `;
                    sqlBuyer = '';
                } else {
                    sqlNsr = `  and a.buyer_cd not in ('ng','np') `;
                }
       
                var sqlFactory = '';
                if (args.data.FACTORY_CD === 'FC044') {
                    sqlFactory = `   and b.factory_cd in ('fc044')`;
                } else if (args.data.FACTORY_CD === 'FC034') {
                    sqlFactory = `   and b.factory_cd in ('fc034','fc113','fc087')`;
                }

                var sql_tot_buyer = `
                    select distinct kk.BUYER_NAME, kk.BUYER_CD
                    from
                    (
                    SELECT       
                        A.BUYER_NAME, 
                        A.BUYER_CD ,
                        isnull(sum(avr_price*b.tot_cnt*c.usd_rate), 0) AS usamt  
                    from kcd_buyer a,ksv_order_mst b, kcd_curr_com  c, kcd_style d  
                    WHERE  A.BUYER_CD = LEFT(B.ORDER_CD, 2) and (B.STYLE_CD <> '00-0000') 
                    and    c.start_date = (SELECT MAX(START_DATE) AS Expr1 FROM KCD_CURR_COM AS KCD_CURR_COM_1 ) and c.curr_cd = b.curr_cd 
                    AND    (LEFT(B.DUE_DATE, 6) >= '${s_date}') AND (LEFT(B.DUE_DATE, 6) <= '${e_date}') 
                    ${sqlFactory}
                    ${sqlBuyer}
                    and b.order_status <> '*' 
                    and b.style_cd = d.style_cd ${sqlStyle}
                    GROUP BY A.BUYER_NAME, A.BUYER_CD 
                    having sum(b.tot_cnt) > 100 
                    union 
                    SELECT
                        A.BUYER_NAME,
                        A.BUYER_CD,
                        isnull(sum(c.usd_rate * b.PLAN_AMT), 0) AS usamt
                    FROM
                        KCD_BUYER a,
                        ${tTableName} B,
                        kcd_curr_com c
                    WHERE
                        (B.YYMM >= '${s_date}') AND (B.YYMM <= '${e_date}')
                        and A.BUYER_CD = B.BUYER_CD
                        and c.start_date = (
                            SELECT
                                MAX(START_DATE) AS Expr1
                            FROM
                                KCD_CURR_COM AS KCD_CURR_COM_1
                        )
                        and c.curr_cd = b.curr_cd 
                        ${sqlBuyer} 
                        ${sqlNsr}
                        ${sqlLineType}
                        and b.curr_cd like '%USD%'
                    GROUP BY
                        A.BUYER_NAME,
                        A.BUYER_CD
                    ) kk
                    order by kk.BUYER_NAME
                `;
                var tRet_tot_buyer = await prisma.$queryRaw(
                    Prisma.raw(sql_tot_buyer),
                );

                if (tRet_tot_buyer.length <= 0) {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.id = 1;
                    tObj.CODE = `ERROR:Not Found Data`;
                    tRetArray.push(tObj);
                    return tRetArray;
                }

                // Total 
                var tFunc = new S0217_COMM();
                var tInObj = { ...args.data };
                tInObj.YEAR = tInObj.S_DATE.substring(0, 4);
                tInObj.COLLECTION_CD = '';
                tInObj.TYPE = '';
                tInObj.YYMM = tMonArray;

                var tRetObj = await tFunc.LIST1(
                    tInObj,
                    contextValue,
                );
                console.log(`tTotal Count: ${tRetObj.length}`);

                var tArray99 = [];
                for (var tIdx = 0; tIdx < 24; tIdx++) {
                    var tArray2 = [];
                    for (var tIdx1 = 0; tIdx1 < 16; tIdx1++) {
                        tArray2.push(0);
                    }
                    tArray99.push(tArray2);
                }

                // var tLineArray = ['1', '3', 'D', 'W', 'S'];
                var tTotalQty_Plan = 0;
                var tTotalAmt_Plan = 0;
                var tTotalCm_Plan = 0;
                var tCmRate_Plan = 0;

                var tTotalQty_Order = 0;
                var tTotalAmt_Order = 0;
                var tTotalCm_Order = 0;
                var tCmRate_Order = 0;

                tRetObj.forEach((col, i) => {
                    var tRow = 0;
                    var tRow1 = 0;
                    if (col.LINE_TYPE === '1') { tRow = 0;  tRow1 = 12; }
                    if (col.LINE_TYPE === '3') { tRow = 2;  tRow1 = 14; }
                    if (col.LINE_TYPE === 'D') { tRow = 4;  tRow1 = 16; }
                    if (col.LINE_TYPE === 'W') { tRow = 6;  tRow1 = 18; }
                    if (col.LINE_TYPE === 'S') { tRow = 8;  tRow1 = 20; }
 
                    var tCol = -1;
                    tMonArray.forEach((col1, i1) => {
                        if (col1 === col.YYMM) tCol = i1;
                    });

                    if (tCol < 12) {
                        tArray99[tRow][tCol+1] = col.ORDER_QTY;
                        tArray99[tRow+1][tCol+1] = col.ORDER_AMT;

                        tTotalQty_Order += parseFloat(col.ORDER_QTY); 
                        tTotalAmt_Order += parseFloat(col.ORDER_AMT); 
                        tTotalCm_Order += parseFloat(col.CURR_CM_AMT); 
                        tTotalCm_Plan += parseFloat(col.CM_AMT); 
                    }

                    /* 
                    if (tCol < 12 && parseFloat(col.ORDER_QTY) > 0) {
                        if ((parseFloat(col.YYMM) >= parseFloat(tCurrYYMM)) &&
                            (parseFloat(col.PLAN_AMT) > parseFloat(col.ORDER_AMT))) {
                            tArray99[tRow][tCol+1] = col.PLAN_QTY;
                            tArray99[tRow+1][tCol+1] = col.PLAN_AMT;

                            tTotalQty_Order += parseFloat(col.PLAN_QTY); 
                            tTotalAmt_Order += parseFloat(col.PLAN_AMT); 
                        } else {
                            tArray99[tRow][tCol+1] = col.ORDER_QTY;
                            tArray99[tRow+1][tCol+1] = col.ORDER_AMT;

                            tTotalQty_Order += parseFloat(col.ORDER_QTY); 
                            tTotalAmt_Order += parseFloat(col.ORDER_AMT); 
                        }
                        tTotalCm_Order += parseFloat(col.CURR_CM_AMT); 
                        tTotalCm_Plan += parseFloat(col.CM_AMT); 
                    }
                    */
                });

                tRetObj.forEach((col, i) => {

                    var tRow = 0;
                    var tRow1 = 0;
                    if (col.LINE_TYPE === '1') { tRow = 0;  tRow1 = 12; }
                    if (col.LINE_TYPE === '3') { tRow = 2;  tRow1 = 14; }
                    if (col.LINE_TYPE === 'D') { tRow = 4;  tRow1 = 16; }
                    if (col.LINE_TYPE === 'W') { tRow = 6;  tRow1 = 18; }
                    if (col.LINE_TYPE === 'S') { tRow = 8;  tRow1 = 20; }

                    var tCol = -1;
                    tMonArray.forEach((col1, i1) => {
                        if (col1 === col.YYMM) {
                           tCol = i1; 
                        }
                    });
                    if (tCol < 12) {
                        if (parseFloat(col.YYMM) >= parseFloat(tCurrYYMM)) {
                            tArray99[tRow1][tCol+1] = col.PLAN_QTY;
                            tArray99[tRow1+1][tCol+1] = parseFloat(col.PLAN_AMT);

                            tTotalQty_Plan += parseFloat(col.PLAN_QTY);
                            tTotalAmt_Plan += parseFloat(col.PLAN_AMT);
                        } else {
                            tArray99[tRow1][tCol+1] = col.ORDER_QTY;
                            tArray99[tRow1+1][tCol+1] = parseFloat(col.ORDER_AMT);

                            tTotalQty_Plan += parseFloat(col.ORDER_QTY);
                            tTotalAmt_Plan += parseFloat(col.ORDER_AMT);
                        } 
                    }

                    /*
                    if ((parseFloat(col.YYMM) >= parseFloat(tCurrYYMM2)) &&
                        (parseFloat(col.PLAN_AMT) > parseFloat(col.ORDER_AMT))) {
                        tArray99[tRow1][tCol+1] = col.PLAN_QTY;
                        tArray99[tRow1+1][tCol+1] = parseFloat(col.PLAN_AMT) * 0.6;

                        tTotalQty_Plan += parseFloat(col.PLAN_QTY);
                        tTotalAmt_Plan += parseFloat(col.PLAN_AMT) * 0.6;
                    } else {
                        tArray99[tRow1][tCol+1] = col.ORDER_QTY;
                        tArray99[tRow1+1][tCol+1] = parseFloat(col.ORDER_AMT) * 0.6;

                        tTotalQty_Plan += parseFloat(col.ORDER_QTY);
                        tTotalAmt_Plan += parseFloat(col.ORDER_AMT) * 0.6;
                        // tTotalCm_Plan += parseFloat(col.CM_AMT);
                    }
                    */
                });


                if (tTotalAmt_Plan > 0) tCmRate_Plan = tTotalCm_Plan / tTotalAmt_Plan;
                if (tTotalAmt_Order > 0) tCmRate_Order = tTotalCm_Order / tTotalAmt_Order;

                for (var tIdx = 0; tIdx < 24; tIdx++) {
                    var tSum = 0;
                    for (var tIdx1 = 1; tIdx1 <= 12; tIdx1++) {
                        tSum += parseFloat(tArray99[tIdx][tIdx1]);
                    }
                    tArray99[tIdx][0] = tSum;
                }
                for (var tIdx = 0; tIdx < 13; tIdx++) {
                    var tSum_0 = 0;
                    var tSum1_0 = 0;
                    var tSum_1 = 0;
                    var tSum1_1 = 0;
                    for (var tIdx1 = 0; tIdx1 < 22; tIdx1++) {
                        if (tIdx1 <= 9) {
                            if ((tIdx1 % 2) === 0) tSum_0 += parseFloat(tArray99[tIdx1][tIdx]);
                            else tSum1_0 += parseFloat(tArray99[tIdx1][tIdx]);
                        }
                        if (tIdx1 >= 12) {
                            if ((tIdx1 % 2) === 0) tSum_1 += parseFloat(tArray99[tIdx1][tIdx]);
                            else tSum1_1 += parseFloat(tArray99[tIdx1][tIdx]);
                        }
                    }
                    tArray99[10][tIdx] = tSum_0;
                    tArray99[11][tIdx] = tSum1_0;
                    tArray99[22][tIdx] = tSum_1;
                    tArray99[23][tIdx] = tSum1_1;
                }

                var tYY = args.data.S_DATE.substring(0, 4);
                sheet.getCell(2, 2).value = `JAN. ${tYY} ~ DEC. ${tYY}`;
                sheet.getCell(2, 6).value = tRetDate1;

                // Header 
                tMonArray.forEach((col2, i2) => {
                    if (i2 < 12) {
                       sheet.getCell(4, 7+i2).value = col2;
                    }
                });

                var tStartRow = 5;
                var tStartCol = 6;

                if (!args.data.BUYER_CD) {
                    for (var tIdx = 0; tIdx < 24; tIdx++) {
                        if (tIdx === 1) { sheet.getCell(tStartRow+tIdx, 4).value = Number(parseFloat(tTotalQty_Order).toFixed(2)); }
                        if (tIdx === 3) { sheet.getCell(tStartRow+tIdx, 4).value = Number(parseFloat(tTotalAmt_Order).toFixed(2)); }
                        if (tIdx === 5) { sheet.getCell(tStartRow+tIdx, 4).value = Number(parseFloat(tTotalCm_Order).toFixed(2)); }
                        // if (tIdx === 7) { sheet.getCell(tStartRow+tIdx, 4).value = Number(parseFloat(tCmRate_Order).toFixed(2)); }

                        if (tIdx === 13) { sheet.getCell(tStartRow+tIdx, 4).value = Number(parseFloat(tTotalQty_Plan).toFixed(2)) }
                        if (tIdx === 15) { sheet.getCell(tStartRow+tIdx, 4).value = Number(parseFloat(tTotalAmt_Plan).toFixed(2)) }
                        if (tIdx === 17) { sheet.getCell(tStartRow+tIdx, 4).value = Number(parseFloat(tTotalCm_Plan).toFixed(2)) }
                        // if (tIdx === 19) { sheet.getCell(tStartRow+tIdx, 4).value = Number(parseFloat(tCmRate_Plan).toFixed(2)) }
                        for (var tIdx1 = 1; tIdx1 <= 12; tIdx1++) {
                            sheet.getCell(
                                tStartRow + tIdx,
                                tStartCol + tIdx1,
                            ).value = Number(parseFloat(tArray99[tIdx][tIdx1]).toFixed(0));
                        }
                    }
                }

                tStartRow += 24;
                tStartCol = 6;

                // Buyer별
                var tIdx3 = 0;
                for (tIdx3 = 0; tIdx3 < tRet_tot_buyer.length; tIdx3++) {

                    var tObjBuyer = { ...tRet_tot_buyer[tIdx3] };

                    sheet.getCell(tStartRow, 2).value = `[${tObjBuyer.BUYER_CD}]${tObjBuyer.BUYER_NAME}` 


                    var tFunc = new S0217_COMM();
                    var tInObj = { ...args.data };
                    tInObj.BUYER_CD = tObjBuyer.BUYER_CD;
                    tInObj.YEAR = tInObj.S_DATE.substring(0, 4);
                    tInObj.COLLECTION_CD = '';
                    tInObj.TYPE = '';
                    tInObj.YYMM = tMonArray;
                    var tRetObj = await tFunc.LIST1(
                        tInObj,
                        contextValue,
                    );
                    console.log(`tBuyer Count(tObjBuyer.BUYER_CD): ${tRetObj.length}`);
    
                    var tArray99 = [];
                    for (var tIdx = 0; tIdx < 24; tIdx++) {
                        var tArray2 = [];
                        for (var tIdx1 = 0; tIdx1 < 15; tIdx1++) {
                            tArray2.push(0);
                        }
                        tArray99.push(tArray2);
                    }
    
                    // var tLineArray = ['1', '3', 'D', 'W', 'S'];
                    var tTotalQty_Plan = 0;
                    var tTotalAmt_Plan = 0;
                    var tTotalCm_Plan = 0;
                    var tCmRate_Plan = 0;

                    var tTotalQty_Order = 0;
                    var tTotalAmt_Order = 0;
                    var tTotalCm_Order = 0;
                    var tCmRate_Order = 0;

                    tRetObj.forEach((col, i) => {
                        var tRow = 0;
                        var tRow1 = 0;
                        if (col.LINE_TYPE === '1') { tRow = 0;  tRow1 = 10; }
                        if (col.LINE_TYPE === '3') { tRow = 2;  tRow1 = 12; }
                        if (col.LINE_TYPE === 'D') { tRow = 4;  tRow1 = 14; }
                        if (col.LINE_TYPE === 'W') { tRow = 6;  tRow1 = 16; }
                        if (col.LINE_TYPE === 'S') { tRow = 8;  tRow1 = 18; }
     
                        var tCol = -1;
                        tMonArray.forEach((col1, i1) => {
                            if (col1 === col.YYMM) tCol = i1;
                        });
                        if (tCol < 12) {
                            tArray99[tRow][tCol+1] = col.ORDER_QTY;
                            tArray99[tRow+1][tCol+1] = col.ORDER_AMT;
    
                            tTotalQty_Order += parseFloat(col.ORDER_QTY); 
                            tTotalAmt_Order += parseFloat(col.ORDER_AMT); 

                            tTotalCm_Order += parseFloat(col.CURR_CM_AMT); 
                            tTotalCm_Plan  += parseFloat(col.CM_AMT); 
                        }

                        /*
                        if (tCol < 12 && parseFloat(col.ORDER_QTY) > 0) {
                            if ((parseFloat(col.YYMM) >= parseFloat(tCurrYYMM)) &&
                                (parseFloat(col.PLAN_AMT) > parseFloat(col.ORDER_AMT))) {
                               tArray99[tRow][tCol+1] = col.PLAN_QTY;
                               tArray99[tRow+1][tCol+1] = col.PLAN_AMT;
    
                               tTotalQty_Order += parseFloat(col.PLAN_QTY); 
                               tTotalAmt_Order += parseFloat(col.PLAN_AMT); 
                            } else {
                               tArray99[tRow][tCol+1] = col.ORDER_QTY;
                               tArray99[tRow+1][tCol+1] = col.ORDER_AMT;
    
                               tTotalQty_Order += parseFloat(col.ORDER_QTY); 
                               tTotalAmt_Order += parseFloat(col.ORDER_AMT); 
                            }
                            tTotalCm_Order += parseFloat(col.CURR_CM_AMT); 
                            tTotalCm_Plan  += parseFloat(col.CM_AMT); 
                        }
                        */
                    });
    

                    tRetObj.forEach((col, i) => {
                        var tRow = 0;
                        var tRow1 = 0;
                        if (col.LINE_TYPE === '1') { tRow = 0;  tRow1 = 10; }
                        if (col.LINE_TYPE === '3') { tRow = 2;  tRow1 = 12; }
                        if (col.LINE_TYPE === 'D') { tRow = 4;  tRow1 = 14; }
                        if (col.LINE_TYPE === 'W') { tRow = 6;  tRow1 = 16; }
                        if (col.LINE_TYPE === 'S') { tRow = 8;  tRow1 = 18; }
    
                        var tCol = -1;
                        tMonArray.forEach((col1, i1) => {
                            if (col1 === col.YYMM) {
                               tCol = i1; 
                            }
                        });

                        if (tCol < 12) {
                            if (parseFloat(col.YYMM) >= parseFloat(tCurrYYMM)) { 
                                tArray99[tRow1][tCol+1] = col.PLAN_QTY;
                                tArray99[tRow1+1][tCol+1] = parseFloat(col.PLAN_AMT);
    
                                tTotalQty_Plan += parseFloat(col.PLAN_QTY);
                                tTotalAmt_Plan += parseFloat(col.PLAN_AMT);
                            } else {
                                tArray99[tRow1][tCol+1] = col.ORDER_QTY;
                                tArray99[tRow1+1][tCol+1] = parseFloat(col.ORDER_AMT);
    
                                tTotalQty_Plan += parseFloat(col.ORDER_QTY);
                                tTotalAmt_Plan += parseFloat(col.ORDER_AMT);
                                // tTotalCm_Plan += parseFloat(col.CM_AMT);
                            }
                        }
                    });

                    if (tTotalAmt_Plan > 0) tCmRate_Plan = tTotalCm_Plan / tTotalAmt_Plan;
                    if (tTotalAmt_Order > 0) tCmRate_Order = tTotalCm_Order / tTotalAmt_Order;
    
                    for (var tIdx = 0; tIdx < 24; tIdx++) {
                        var tSum = 0;
                        for (var tIdx1 = 1; tIdx1 < 13; tIdx1++) {
                            tSum += parseFloat(tArray99[tIdx][tIdx1]);
                        }
                        tArray99[tIdx][0] = tSum;
                    }

                    /*
                    for (var tIdx = 0; tIdx < 13; tIdx++) {
                        var tSum = 0;
                        var tSum1 = 0;
                        for (var tIdx1 = 0; tIdx1 < 22; tIdx1++) {
                            if ((tIdx1 % 2) === 0) tSum += parseFloat(tArray99[tIdx1][tIdx]);
                            else tSum1 += parseFloat(tArray99[tIdx1][tIdx]);
                        }
                        tArray99[22][tIdx] = tSum;
                        tArray99[23][tIdx] = tSum1;
                    }
                    */
    
                    for (var tIdx = 0; tIdx < 20; tIdx++) {
                        if (tIdx === 1) { sheet.getCell(tStartRow+tIdx, 4).value = Number(parseFloat(tTotalQty_Order).toFixed(0)); }
                        if (tIdx === 3) { sheet.getCell(tStartRow+tIdx, 4).value = Number(parseFloat(tTotalAmt_Order).toFixed(0)); }
                        if (tIdx === 5) { sheet.getCell(tStartRow+tIdx, 4).value = Number(parseFloat(tTotalCm_Order).toFixed(0)); }
                        // if (tIdx === 7) { sheet.getCell(tStartRow+tIdx, 4).value = Number(parseFloat(tCmRate_Order).toFixed(0)); }
                    
                        if (tIdx === 11) { sheet.getCell(tStartRow+tIdx, 4).value = Number(parseFloat(tTotalQty_Plan).toFixed(0)) }
                        if (tIdx === 13) { sheet.getCell(tStartRow+tIdx, 4).value = Number(parseFloat(tTotalAmt_Plan).toFixed(0)) }
                        if (tIdx === 15) { sheet.getCell(tStartRow+tIdx, 4).value = Number(parseFloat(tTotalCm_Plan).toFixed(0)) }
                        // if (tIdx === 17) { sheet.getCell(tStartRow+tIdx, 4).value = Number(parseFloat(tCmRate_Plan).toFixed(0)) }

                        for (var tIdx1 = 1; tIdx1 <= 12; tIdx1++) {
                            sheet.getCell(
                                tStartRow + tIdx,
                                tStartCol + tIdx1,
                            ).value = Number(parseFloat(tArray99[tIdx][tIdx1]).toFixed(0));
                        }
                    }

                    tStartRow += 20;
                    tStartCol = 6;
                }

                // Excel Write
                return await upload(`${tWExcelFile}.xlsx`, wb);
            } catch (error) {
                var tRetArray = [];
                var tObj = {};
                tObj.id = 1;
                tObj.CODE = `ERROR:Excel Print:${error.message}`;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },

        mgrQuery_S0217_EXCEL_PRINT_QUTER: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tCurrYYMM = `${tRetDate.substring(0, 6)}`;
            var tCurrYYMM2 = '';

            var subTitle = '분기별';

            var tFactoryN = '_BVT';
            var tBuyerN = '';
            if (args.data.FACTORY_CD === 'FC044') tFactoryN = '_ETP';
            if (args.data.BUYER_CD !== '') tBuyerN = `_${args.data.BUYER_CD}`;
            var tWExcelFile = `판매계획(${subTitle})${tFactoryN}${tBuyerN}-${tUserInfo.USER_ID}-${tRetDate1}`;

            var startYear = parseFloat(args.data.S_DATE.substring(0, 4));
            var startMon = parseFloat(args.data.S_DATE.substring(4,6));
            var tMonArray = [];
            var tYYStr = startYear;
            var tMMStr = startMon;
            for (var tIdx = 0; tIdx < 15; tIdx++) {
                if (tMMStr === 13) {
                    tYYStr = startYear + 1;
                    tMMStr = 1;
                } else {
                    ;
                }
                if (String(tMMStr).length <= 1) {
                    tMonArray.push(`${tYYStr}0${tMMStr}`);
                } else {
                    tMonArray.push(`${tYYStr}${tMMStr}`);
                }
                tMMStr += 1;
            }

            //
            tMonArray.forEach((col, i) => {
                if (col === tCurrYYMM) {
                    var tmp = i + 2;
                    if (tmp >= tMonArray.length) tCurrYYMM2 = tCurrYYMM;
                    else tCurrYYMM2 = tMonArray[tmp];
                }
            });


            var s_date = tMonArray[0];
            var e_date = tMonArray[14];

            var tLineArray = ['1', '3', 'D', 'W', 'S'];

            var tArray99 = [];
            for (var tIdx = 0; tIdx < 12; tIdx++) {
                var tArray2 = [];
                for (var tIdx1 = 0; tIdx1 < 10; tIdx1++) {
                    tArray2.push(0);
                }
                tArray99.push(tArray2);
            }

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
                var tTemplateExcel = `${tPath0}/영업_판매계획.xlsx`;

                const wb = new Excel.Workbook();
                await wb.xlsx.readFile(tTemplateExcel);

                var tSheetName = `Sheet1`;
                const sheet = wb.getWorksheet(tSheetName);
                // const sheet = wb.getWorksheet(1);

                var tTableName = 'KSV_ORDER_PLAN';
                if (args.data.FACTORY_CD === 'FC044')
                    tTableName = 'KSV_ORDER_PLAN_ETHIOPIA';

                var sqlBuyer = '';
                if (args.data.TEAM_CD === '')
                    sqlBuyer = `and a.buyer_cd like '%${args.data.BUYER_CD}%'`;
                else sqlBuyer = `and a.buyer_team like '%${args.data.TEAM_CD}%'`;

                var sqlLineType = '';
                var sqlNsr = '';
                var sqlStyle = '';
                if (args.data.REPORT_KIND === 'NSR') {
                    sqlNsr = `  and a.buyer_cd in ('wi','ss','wf','nn','ns','ng','np') `;
                    sqlNsr = '';
                } else if (args.data.REPORT_KIND === 'EXCL_NSR') {
                    sqlNsr = `  and a.buyer_cd not in ('wi','ss','wf','nn','ns','ng','np') `;
                    sqlBuyer = '';
                } else if (args.data.REPORT_KIND === 'EXCL_GLOVE') {
                    sqlNsr = `  and a.buyer_cd not in ('sg','ng','np') and left(a.buyer_cd,1) not in ('1','9') and a.buyer_type = '0' `;
                    sqlLineType = ` and b.line_type not in ('G')  `;
                    sqlBuyer = '';
                } else if (args.data.REPORT_KIND === 'GLOVE') {
                    sqlNsr = `  and a.buyer_cd  in ('sg') and a.buyer_cd like '1%'  `;
                    sqlLineType = ``;
                    sqlBuyer = '';
                } else if (args.data.REPORT_KIND === 'EXCL_G_N') {
                    sqlNsr = `  and a.buyer_cd not in ('wi','ss','wf','nn','ns','ng','np','sg','1f','1t') and a.buyer_team not in ('06') `;
                    sqlLineType = ` and b.line_type not in ('G')  `;
                    sqlBuyer = '';
                } else if (args.data.REPORT_KIND === 'TENT') {
                    sqlNsr = `  and a.buyer_type = '3'  `;
                    sqlLineType = ``;
                    sqlBuyer = '';
                } else if (args.data.REPORT_KIND === 'DOWN') {
                    sqlNsr = `  and a.buyer_cd not in ('ng','np') `;
                    sqlStyle = `  and d.down not in ('','X') `;
                    sqlLineType = ` and b.line_type in ('D')  `;
                    sqlBuyer = '';
                } else {
                    sqlNsr = `  and a.buyer_cd not in ('ng','np') `;
                }
       
                var sqlFactory = '';
                if (args.data.FACTORY_CD === 'FC044') {
                    sqlFactory = `   and b.factory_cd in ('fc044')`;
                } else if (args.data.FACTORY_CD === 'FC034') {
                    sqlFactory = `   and b.factory_cd in ('fc034','fc113','fc087')`;
                }

                var sql_tot_buyer = `
                    select distinct kk.BUYER_NAME, kk.BUYER_CD
                    from
                    (
                    SELECT       
                        A.BUYER_NAME, 
                        A.BUYER_CD ,
                        isnull(sum(avr_price*b.tot_cnt*c.usd_rate), 0) AS usamt  
                    from kcd_buyer a,ksv_order_mst b, kcd_curr_com  c, kcd_style d  
                    WHERE  A.BUYER_CD = LEFT(B.ORDER_CD, 2) and (B.STYLE_CD <> '00-0000') 
                    and    c.start_date = (SELECT MAX(START_DATE) AS Expr1 FROM KCD_CURR_COM AS KCD_CURR_COM_1 ) and c.curr_cd = b.curr_cd 
                    AND    (LEFT(B.DUE_DATE, 6) >= '${s_date}') AND (LEFT(B.DUE_DATE, 6) <= '${e_date}') 
                    ${sqlFactory}
                    ${sqlBuyer}
                    and b.order_status <> '*' 
                    and b.style_cd = d.style_cd ${sqlStyle}
                    GROUP BY A.BUYER_NAME, A.BUYER_CD 
                    having sum(b.tot_cnt) > 100 
                    union 
                    SELECT
                        A.BUYER_NAME,
                        A.BUYER_CD,
                        isnull(sum(c.usd_rate * b.PLAN_AMT), 0) AS usamt
                    FROM
                        KCD_BUYER a,
                        ${tTableName} B,
                        kcd_curr_com c
                    WHERE
                        (B.YYMM >= '${s_date}') AND (B.YYMM <= '${e_date}')
                        and A.BUYER_CD = B.BUYER_CD
                        and c.start_date = (
                            SELECT
                                MAX(START_DATE) AS Expr1
                            FROM
                                KCD_CURR_COM AS KCD_CURR_COM_1
                        )
                        and c.curr_cd = b.curr_cd 
                        ${sqlBuyer} 
                        ${sqlNsr}
                        ${sqlLineType}
                        and b.curr_cd like '%USD%'
                    GROUP BY
                        A.BUYER_NAME,
                        A.BUYER_CD
                    ) kk
                    order by kk.BUYER_NAME
                `;
                var tRet_tot_buyer = await prisma.$queryRaw(
                    Prisma.raw(sql_tot_buyer),
                );

                if (tRet_tot_buyer.length <= 0) {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.id = 1;
                    tObj.CODE = `ERROR:Not Found Data`;
                    tRetArray.push(tObj);
                    return tRetArray;
                }

                // Total 
                var tFunc = new S0217_COMM();
                var tInObj = { ...args.data };
                tInObj.YEAR = tInObj.S_DATE.substring(0, 4);
                tInObj.COLLECTION_CD = '';
                tInObj.TYPE = '';
                tInObj.YYMM = tMonArray;

                var tRetObj = await tFunc.LIST1(
                    tInObj,
                    contextValue,
                );
                console.log(`tTotal Count: ${tRetObj.length}`);

                var tArray99 = [];
                for (var tIdx = 0; tIdx < 24; tIdx++) {
                    var tArray2 = [];
                    for (var tIdx1 = 0; tIdx1 < 16; tIdx1++) {
                        tArray2.push(0);
                    }
                    tArray99.push(tArray2);
                }

                // var tLineArray = ['1', '3', 'D', 'W', 'S'];
                var tTotalQty_Plan = 0;
                var tTotalAmt_Plan = 0;
                var tTotalCm_Plan = 0;
                var tCmRate_Plan = 0;

                var tTotalQty_Order = 0;
                var tTotalAmt_Order = 0;
                var tTotalCm_Order = 0;
                var tCmRate_Order = 0;

                tRetObj.forEach((col, i) => {
                    var tRow = 0;
                    var tRow1 = 0;
                    if (col.LINE_TYPE === '1') { tRow = 0;  tRow1 = 12; }
                    if (col.LINE_TYPE === '3') { tRow = 2;  tRow1 = 14; }
                    if (col.LINE_TYPE === 'D') { tRow = 4;  tRow1 = 16; }
                    if (col.LINE_TYPE === 'W') { tRow = 6;  tRow1 = 18; }
                    if (col.LINE_TYPE === 'S') { tRow = 8;  tRow1 = 20; }
 
                    var tCol = -1;
                    tMonArray.forEach((col1, i1) => {
                        if (col1 === col.YYMM) tCol = i1;
                    });

                    if (tCol < 12) {
                        tArray99[tRow][tCol+1] = col.ORDER_QTY;
                        tArray99[tRow+1][tCol+1] = col.ORDER_AMT;

                        tTotalQty_Order += parseFloat(col.ORDER_QTY); 
                        tTotalAmt_Order += parseFloat(col.ORDER_AMT); 
                        tTotalCm_Order += parseFloat(col.CURR_CM_AMT); 
                        tTotalCm_Plan += parseFloat(col.CM_AMT); 
                    }

                    /* 
                    if (tCol < 12 && parseFloat(col.ORDER_QTY) > 0) {
                        if ((parseFloat(col.YYMM) >= parseFloat(tCurrYYMM)) &&
                            (parseFloat(col.PLAN_AMT) > parseFloat(col.ORDER_AMT))) {
                            tArray99[tRow][tCol+1] = col.PLAN_QTY;
                            tArray99[tRow+1][tCol+1] = col.PLAN_AMT;

                            tTotalQty_Order += parseFloat(col.PLAN_QTY); 
                            tTotalAmt_Order += parseFloat(col.PLAN_AMT); 
                        } else {
                            tArray99[tRow][tCol+1] = col.ORDER_QTY;
                            tArray99[tRow+1][tCol+1] = col.ORDER_AMT;

                            tTotalQty_Order += parseFloat(col.ORDER_QTY); 
                            tTotalAmt_Order += parseFloat(col.ORDER_AMT); 
                        }
                        tTotalCm_Order += parseFloat(col.CURR_CM_AMT); 
                        tTotalCm_Plan += parseFloat(col.CM_AMT); 
                    }
                    */
                });

                tRetObj.forEach((col, i) => {

                    var tRow = 0;
                    var tRow1 = 0;
                    if (col.LINE_TYPE === '1') { tRow = 0;  tRow1 = 12; }
                    if (col.LINE_TYPE === '3') { tRow = 2;  tRow1 = 14; }
                    if (col.LINE_TYPE === 'D') { tRow = 4;  tRow1 = 16; }
                    if (col.LINE_TYPE === 'W') { tRow = 6;  tRow1 = 18; }
                    if (col.LINE_TYPE === 'S') { tRow = 8;  tRow1 = 20; }

                    var tCol = -1;
                    tMonArray.forEach((col1, i1) => {
                        if (col1 === col.YYMM) {
                           tCol = i1; 
                        }
                    });
                    if (tCol < 12) {
                        if (parseFloat(col.YYMM) >= parseFloat(tCurrYYMM)) {
                            tArray99[tRow1][tCol+1] = col.PLAN_QTY;
                            tArray99[tRow1+1][tCol+1] = parseFloat(col.PLAN_AMT);

                            tTotalQty_Plan += parseFloat(col.PLAN_QTY);
                            tTotalAmt_Plan += parseFloat(col.PLAN_AMT);
                        } else {
                            tArray99[tRow1][tCol+1] = col.ORDER_QTY;
                            tArray99[tRow1+1][tCol+1] = parseFloat(col.ORDER_AMT);

                            tTotalQty_Plan += parseFloat(col.ORDER_QTY);
                            tTotalAmt_Plan += parseFloat(col.ORDER_AMT);
                        } 
                    }

                    /*
                    if ((parseFloat(col.YYMM) >= parseFloat(tCurrYYMM2)) &&
                        (parseFloat(col.PLAN_AMT) > parseFloat(col.ORDER_AMT))) {
                        tArray99[tRow1][tCol+1] = col.PLAN_QTY;
                        tArray99[tRow1+1][tCol+1] = parseFloat(col.PLAN_AMT) * 0.6;

                        tTotalQty_Plan += parseFloat(col.PLAN_QTY);
                        tTotalAmt_Plan += parseFloat(col.PLAN_AMT) * 0.6;
                    } else {
                        tArray99[tRow1][tCol+1] = col.ORDER_QTY;
                        tArray99[tRow1+1][tCol+1] = parseFloat(col.ORDER_AMT) * 0.6;

                        tTotalQty_Plan += parseFloat(col.ORDER_QTY);
                        tTotalAmt_Plan += parseFloat(col.ORDER_AMT) * 0.6;
                        // tTotalCm_Plan += parseFloat(col.CM_AMT);
                    }
                    */
                });


                if (tTotalAmt_Plan > 0) tCmRate_Plan = tTotalCm_Plan / tTotalAmt_Plan;
                if (tTotalAmt_Order > 0) tCmRate_Order = tTotalCm_Order / tTotalAmt_Order;

                for (var tIdx = 0; tIdx < 24; tIdx++) {
                    var tSum = 0;
                    for (var tIdx1 = 1; tIdx1 <= 12; tIdx1++) {
                        tSum += parseFloat(tArray99[tIdx][tIdx1]);
                    }
                    tArray99[tIdx][0] = tSum;
                }
                for (var tIdx = 0; tIdx < 13; tIdx++) {
                    var tSum_0 = 0;
                    var tSum1_0 = 0;
                    var tSum_1 = 0;
                    var tSum1_1 = 0;
                    for (var tIdx1 = 0; tIdx1 < 22; tIdx1++) {
                        if (tIdx1 <= 9) {
                            if ((tIdx1 % 2) === 0) tSum_0 += parseFloat(tArray99[tIdx1][tIdx]);
                            else tSum1_0 += parseFloat(tArray99[tIdx1][tIdx]);
                        }
                        if (tIdx1 >= 12) {
                            if ((tIdx1 % 2) === 0) tSum_1 += parseFloat(tArray99[tIdx1][tIdx]);
                            else tSum1_1 += parseFloat(tArray99[tIdx1][tIdx]);
                        }
                    }
                    tArray99[10][tIdx] = tSum_0;
                    tArray99[11][tIdx] = tSum1_0;
                    tArray99[22][tIdx] = tSum_1;
                    tArray99[23][tIdx] = tSum1_1;
                }

                var tYY = args.data.S_DATE.substring(0, 4);
                sheet.getCell(2, 2).value = `JAN. ${tYY} ~ DEC. ${tYY}`;
                sheet.getCell(2, 6).value = tRetDate1;

                // Header 
                tMonArray.forEach((col2, i2) => {
                    if (i2 < 12) {
                       sheet.getCell(4, 7+i2).value = col2;
                    }
                });

                console.log(`Step-0: Quter`);

                var tStartRow = 5;
                var tStartCol = 6;

                var tArray98 = new Array(24); 
                for (var tIdx = 0; tIdx < 24; tIdx++) {
                    tArray98[tIdx] = new Array(13); 
                }
                for (var tIdx = 0; tIdx < 24; tIdx++) {
                    var Q1 = 0;
                    var Q2 = 0;
                    var Q3 = 0;
                    var Q4 = 0;
                    for (var tIdx1 = 1; tIdx1 < 13; tIdx1++) {
                        if (tIdx1 >= 1 && tIdx1 <= 3) Q1 = Q1 + tArray99[tIdx][tIdx1];
                        if (tIdx1 >= 4 && tIdx1 <= 6) Q2 = Q2 + tArray99[tIdx][tIdx1];
                        if (tIdx1 >= 7 && tIdx1 <= 9) Q3 = Q3 + tArray99[tIdx][tIdx1];
                        if (tIdx1 >= 10 && tIdx1 <= 12) Q4 = Q4 + tArray99[tIdx][tIdx1];
                    }
                    tArray98[tIdx][1] = Q1;
                    tArray98[tIdx][2] = Q2;
                    tArray98[tIdx][3] = Q3;
                    tArray98[tIdx][4] = Q4;
                }

                console.log(`Step-1: Quter`);

                if (!args.data.BUYER_CD) {
                    for (var tIdx = 0; tIdx < 24; tIdx++) {
                        if (tIdx === 1) { sheet.getCell(tStartRow+tIdx, 4).value = Number(parseFloat(tTotalQty_Order).toFixed(2)); }
                        if (tIdx === 3) { sheet.getCell(tStartRow+tIdx, 4).value = Number(parseFloat(tTotalAmt_Order).toFixed(2)); }
                        if (tIdx === 5) { sheet.getCell(tStartRow+tIdx, 4).value = Number(parseFloat(tTotalCm_Order).toFixed(2)); }
                        // if (tIdx === 7) { sheet.getCell(tStartRow+tIdx, 4).value = Number(parseFloat(tCmRate_Order).toFixed(2)); }

                        if (tIdx === 13) { sheet.getCell(tStartRow+tIdx, 4).value = Number(parseFloat(tTotalQty_Plan).toFixed(2)) }
                        if (tIdx === 15) { sheet.getCell(tStartRow+tIdx, 4).value = Number(parseFloat(tTotalAmt_Plan).toFixed(2)) }
                        if (tIdx === 17) { sheet.getCell(tStartRow+tIdx, 4).value = Number(parseFloat(tTotalCm_Plan).toFixed(2)) }
                        // if (tIdx === 19) { sheet.getCell(tStartRow+tIdx, 4).value = Number(parseFloat(tCmRate_Plan).toFixed(2)) }
                        // for (var tIdx1 = 1; tIdx1 <= 12; tIdx1++) {
                        for (var tIdx1 = 1; tIdx1 <= 4; tIdx1++) {
                            sheet.getCell(
                                tStartRow + tIdx,
                                tStartCol + tIdx1,
                            ).value = Number(parseFloat(tArray98[tIdx][tIdx1]).toFixed(0));
                        }
                    }
                }

                tStartRow += 24;
                tStartCol = 6;

                // Buyer별
                var tIdx3 = 0;
                for (tIdx3 = 0; tIdx3 < tRet_tot_buyer.length; tIdx3++) {

                    var tObjBuyer = { ...tRet_tot_buyer[tIdx3] };

                    sheet.getCell(tStartRow, 2).value = `[${tObjBuyer.BUYER_CD}]${tObjBuyer.BUYER_NAME}` 


                    var tFunc = new S0217_COMM();
                    var tInObj = { ...args.data };
                    tInObj.BUYER_CD = tObjBuyer.BUYER_CD;
                    tInObj.YEAR = tInObj.S_DATE.substring(0, 4);
                    tInObj.COLLECTION_CD = '';
                    tInObj.TYPE = '';
                    tInObj.YYMM = tMonArray;
                    var tRetObj = await tFunc.LIST1(
                        tInObj,
                        contextValue,
                    );
                    console.log(`tBuyer Count(tObjBuyer.BUYER_CD): ${tRetObj.length}`);
    
                    var tArray99 = [];
                    for (var tIdx = 0; tIdx < 24; tIdx++) {
                        var tArray2 = [];
                        for (var tIdx1 = 0; tIdx1 < 15; tIdx1++) {
                            tArray2.push(0);
                        }
                        tArray99.push(tArray2);
                    }
    
                    // var tLineArray = ['1', '3', 'D', 'W', 'S'];
                    var tTotalQty_Plan = 0;
                    var tTotalAmt_Plan = 0;
                    var tTotalCm_Plan = 0;
                    var tCmRate_Plan = 0;

                    var tTotalQty_Order = 0;
                    var tTotalAmt_Order = 0;
                    var tTotalCm_Order = 0;
                    var tCmRate_Order = 0;

                    tRetObj.forEach((col, i) => {
                        var tRow = 0;
                        var tRow1 = 0;
                        if (col.LINE_TYPE === '1') { tRow = 0;  tRow1 = 10; }
                        if (col.LINE_TYPE === '3') { tRow = 2;  tRow1 = 12; }
                        if (col.LINE_TYPE === 'D') { tRow = 4;  tRow1 = 14; }
                        if (col.LINE_TYPE === 'W') { tRow = 6;  tRow1 = 16; }
                        if (col.LINE_TYPE === 'S') { tRow = 8;  tRow1 = 18; }
     
                        var tCol = -1;
                        tMonArray.forEach((col1, i1) => {
                            if (col1 === col.YYMM) tCol = i1;
                        });
                        if (tCol < 12) {
                            tArray99[tRow][tCol+1] = col.ORDER_QTY;
                            tArray99[tRow+1][tCol+1] = col.ORDER_AMT;
    
                            tTotalQty_Order += parseFloat(col.ORDER_QTY); 
                            tTotalAmt_Order += parseFloat(col.ORDER_AMT); 

                            tTotalCm_Order += parseFloat(col.CURR_CM_AMT); 
                            tTotalCm_Plan  += parseFloat(col.CM_AMT); 
                        }

                        /*
                        if (tCol < 12 && parseFloat(col.ORDER_QTY) > 0) {
                            if ((parseFloat(col.YYMM) >= parseFloat(tCurrYYMM)) &&
                                (parseFloat(col.PLAN_AMT) > parseFloat(col.ORDER_AMT))) {
                               tArray99[tRow][tCol+1] = col.PLAN_QTY;
                               tArray99[tRow+1][tCol+1] = col.PLAN_AMT;
    
                               tTotalQty_Order += parseFloat(col.PLAN_QTY); 
                               tTotalAmt_Order += parseFloat(col.PLAN_AMT); 
                            } else {
                               tArray99[tRow][tCol+1] = col.ORDER_QTY;
                               tArray99[tRow+1][tCol+1] = col.ORDER_AMT;
    
                               tTotalQty_Order += parseFloat(col.ORDER_QTY); 
                               tTotalAmt_Order += parseFloat(col.ORDER_AMT); 
                            }
                            tTotalCm_Order += parseFloat(col.CURR_CM_AMT); 
                            tTotalCm_Plan  += parseFloat(col.CM_AMT); 
                        }
                        */
                    });
    

                    tRetObj.forEach((col, i) => {
                        var tRow = 0;
                        var tRow1 = 0;
                        if (col.LINE_TYPE === '1') { tRow = 0;  tRow1 = 10; }
                        if (col.LINE_TYPE === '3') { tRow = 2;  tRow1 = 12; }
                        if (col.LINE_TYPE === 'D') { tRow = 4;  tRow1 = 14; }
                        if (col.LINE_TYPE === 'W') { tRow = 6;  tRow1 = 16; }
                        if (col.LINE_TYPE === 'S') { tRow = 8;  tRow1 = 18; }
    
                        var tCol = -1;
                        tMonArray.forEach((col1, i1) => {
                            if (col1 === col.YYMM) {
                               tCol = i1; 
                            }
                        });

                        if (tCol < 12) {
                            if (parseFloat(col.YYMM) >= parseFloat(tCurrYYMM)) { 
                                tArray99[tRow1][tCol+1] = col.PLAN_QTY;
                                tArray99[tRow1+1][tCol+1] = parseFloat(col.PLAN_AMT);
    
                                tTotalQty_Plan += parseFloat(col.PLAN_QTY);
                                tTotalAmt_Plan += parseFloat(col.PLAN_AMT);
                            } else {
                                tArray99[tRow1][tCol+1] = col.ORDER_QTY;
                                tArray99[tRow1+1][tCol+1] = parseFloat(col.ORDER_AMT);
    
                                tTotalQty_Plan += parseFloat(col.ORDER_QTY);
                                tTotalAmt_Plan += parseFloat(col.ORDER_AMT);
                                // tTotalCm_Plan += parseFloat(col.CM_AMT);
                            }
                        }
                    });

                    if (tTotalAmt_Plan > 0) tCmRate_Plan = tTotalCm_Plan / tTotalAmt_Plan;
                    if (tTotalAmt_Order > 0) tCmRate_Order = tTotalCm_Order / tTotalAmt_Order;
    
                    for (var tIdx = 0; tIdx < 24; tIdx++) {
                        var tSum = 0;
                        for (var tIdx1 = 1; tIdx1 < 13; tIdx1++) {
                            tSum += parseFloat(tArray99[tIdx][tIdx1]);
                        }
                        tArray99[tIdx][0] = tSum;
                    }

                    /*
                    for (var tIdx = 0; tIdx < 13; tIdx++) {
                        var tSum = 0;
                        var tSum1 = 0;
                        for (var tIdx1 = 0; tIdx1 < 22; tIdx1++) {
                            if ((tIdx1 % 2) === 0) tSum += parseFloat(tArray99[tIdx1][tIdx]);
                            else tSum1 += parseFloat(tArray99[tIdx1][tIdx]);
                        }
                        tArray99[22][tIdx] = tSum;
                        tArray99[23][tIdx] = tSum1;
                    }
                    */

                    var tArray98 = new Array(20); 
                    for (var tIdx = 0; tIdx < 20; tIdx++) {
                        tArray98[tIdx] = new Array(13); 
                    }
                    for (var tIdx = 0; tIdx < 20; tIdx++) {
                        var Q1 = 0; 
                        var Q2 = 0; 
                        var Q3 = 0; 
                        var Q4 = 0; 
                        for (var tIdx1 = 1; tIdx1 < 13; tIdx1++) {
                            if (tIdx1 >= 1 && tIdx1 <= 3) Q1 = Q1 + tArray99[tIdx][tIdx1];
                            if (tIdx1 >= 4 && tIdx1 <= 6) Q2 = Q2 + tArray99[tIdx][tIdx1];
                            if (tIdx1 >= 7 && tIdx1 <= 9) Q3 = Q3 + tArray99[tIdx][tIdx1];
                            if (tIdx1 >= 10 && tIdx1 <= 12) Q4 = Q4 + tArray99[tIdx][tIdx1];
                        }       
                        tArray98[tIdx][1] = Q1;
                        tArray98[tIdx][2] = Q2;
                        tArray98[tIdx][3] = Q3;
                        tArray98[tIdx][4] = Q4;
                    }
    
                    for (var tIdx = 0; tIdx < 20; tIdx++) {
                        if (tIdx === 1) { sheet.getCell(tStartRow+tIdx, 4).value = Number(parseFloat(tTotalQty_Order).toFixed(0)); }
                        if (tIdx === 3) { sheet.getCell(tStartRow+tIdx, 4).value = Number(parseFloat(tTotalAmt_Order).toFixed(0)); }
                        if (tIdx === 5) { sheet.getCell(tStartRow+tIdx, 4).value = Number(parseFloat(tTotalCm_Order).toFixed(0)); }
                        // if (tIdx === 7) { sheet.getCell(tStartRow+tIdx, 4).value = Number(parseFloat(tCmRate_Order).toFixed(0)); }
                    
                        if (tIdx === 11) { sheet.getCell(tStartRow+tIdx, 4).value = Number(parseFloat(tTotalQty_Plan).toFixed(0)) }
                        if (tIdx === 13) { sheet.getCell(tStartRow+tIdx, 4).value = Number(parseFloat(tTotalAmt_Plan).toFixed(0)) }
                        if (tIdx === 15) { sheet.getCell(tStartRow+tIdx, 4).value = Number(parseFloat(tTotalCm_Plan).toFixed(0)) }
                        // if (tIdx === 17) { sheet.getCell(tStartRow+tIdx, 4).value = Number(parseFloat(tCmRate_Plan).toFixed(0)) }

                        // for (var tIdx1 = 1; tIdx1 <= 12; tIdx1++) {
                        for (var tIdx1 = 1; tIdx1 <= 4; tIdx1++) {
                            sheet.getCell(
                                tStartRow + tIdx,
                                tStartCol + tIdx1,
                            ).value = Number(parseFloat(tArray98[tIdx][tIdx1]).toFixed(0));
                        }
                    }

                    tStartRow += 20;
                    tStartCol = 6;
                }

                // Excel Write
                return await upload(`${tWExcelFile}.xlsx`, wb);
            } catch (error) {
                var tRetArray = [];
                var tObj = {};
                tObj.id = 1;
                tObj.CODE = `ERROR:Excel Print:${error.message}`;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },

        mgrQuery_S0217_EXCEL_PRINT_TOT: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tFactoryN = '';
            var tBuyerN = '';
            if (args.data.FACTORY_CD === 'FC044') tFactoryN = 'ETP_';
            if (args.data.BUYER_CD !== '') tBuyerN = `_${args.data.BUYER_CD}`;

            if (!tBuyerN) tBuyerN = '_ALL';

            var startYear = parseFloat(args.data.S_DATE.substring(0, 4));
            var startMon = parseFloat(args.data.S_DATE.substring(4,6));
            var tMonArray = []; 
            var tYYStr = startYear; 
            var tMMStr = startMon; 
            for (var tIdx = 0; tIdx < 15; tIdx++) {
                if (tMMStr === 13) {
                    tYYStr = startYear + 1;
                    tMMStr = 1;
                } else {
                    ;   
                }
                if (String(tMMStr).length <= 1) { 
                    tMonArray.push(`${tYYStr}0${tMMStr}`);
                } else { 
                    tMonArray.push(`${tYYStr}${tMMStr}`);
                }       
                tMMStr += 1;
            }

            //          
            var tCurrYYMM = tRetDate1.substring(0, 6); 
            var tCurrYYMM2 = '';
            tMonArray.forEach((col, i) => {
                if (col === tCurrYYMM) { 
                    var tmp = i + 2;
                    if (tmp >= tMonArray.length) tCurrYYMM2 = tCurrYYMM;
                    else tCurrYYMM2 = tMonArray[tmp];
                }
            });     


            var tMonArray = [];
            for (var tIdx = 1; tIdx <= 12; tIdx++) {
                var tMMStr = tIdx;
                if (tIdx < 10) tMMStr = `0${tIdx}`;
                tMonArray.push(`${args.data.S_DATE.substring(0, 4)}${tMMStr}`);
            }
            var tLineArray = ['1', '3', 'D', 'W', 'S'];

            var tLineName = '';
            var tLineName2 = '';
            if (args.data.TYPE) {
                if (args.data.TYPE === '1') tLineName = 'Normal';
                else if (args.data.TYPE === '3') tLineName = '3/4';
                else if (args.data.TYPE === 'D') tLineName = 'Down';
                else if (args.data.TYPE === 'W') tLineName = 'G/S';
                else if (args.data.TYPE === 'S') tLineName = 'S/S';
                else if (args.data.TYPE === 'G') tLineName = 'Glove';
            }
            if (!tLineName) tLineName = 'Total';
            if (args.data.TYPE) {
                if (args.data.TYPE === '1') tLineName2 = 'Normal';
                else if (args.data.TYPE === '3') tLineName2 = '3-4';
                else if (args.data.TYPE === 'D') tLineName2 = 'Down';
                else if (args.data.TYPE === 'W') tLineName2 = 'G-S';
                else if (args.data.TYPE === 'S') tLineName2 = 'S-S';
                else if (args.data.TYPE === 'G') tLineName2 = 'Glove';
            }

            var tWExcelFile = `${tFactoryN}SALES_PLANCM${tBuyerN}[${tLineName2}]-${tUserInfo.USER_ID}-${tRetDate1}`;

            var tArray99 = [];
            for (var tIdx = 0; tIdx < 12; tIdx++) {
                var tArray2 = [];
                for (var tIdx1 = 0; tIdx1 < 10; tIdx1++) {
                    tArray2.push(0);
                }
                tArray99.push(tArray2);
            }

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
                var tTemplateExcel = `${tPath0}/SALES_PLANCM.xlsx`;

                const wb = new Excel.Workbook();
                await wb.xlsx.readFile(tTemplateExcel);

                var tSheetName = `Sheet1`;
                const sheet = wb.getWorksheet(tSheetName);
                // const sheet = wb.getWorksheet(1);

                var tTableName = 'KSV_ORDER_PLAN';
                if (args.data.FACTORY_CD === 'FC044')
                    tTableName = 'KSV_ORDER_PLAN_ETHIOPIA';

                var sqlBuyer = '';
                if (args.data.TEAM_CD === '')
                    sqlBuyer = `and a.buyer_cd like '%${args.data.BUYER_CD}%'`;
                else sqlBuyer = `and a.buyer_team like '%${args.data.TEAM_CD}%'`;

                var sqlLineType = '';
                var sqlNsr = '';
                var sqlStyle = '';
                if (args.data.REPORT_KIND === 'NSR') {
                    sqlNsr = `  and a.buyer_cd in ('wi','ss','wf','nn','ns','ng','np') `;
                    sqlNsr = '';
                } else if (args.data.REPORT_KIND === 'EXCL_NSR') {
                    sqlNsr = `  and a.buyer_cd not in ('wi','ss','wf','nn','ns','ng','np') `;
                    sqlBuyer = '';
                } else if (args.data.REPORT_KIND === 'EXCL_GLOVE') {
                    sqlNsr = `  and a.buyer_cd not in ('sg','ng','np') and left(a.buyer_cd,1) not in ('1','9') and a.buyer_type = '0' `;
                    sqlLineType = ` and b.line_type not in ('G')  `;
                    sqlBuyer = '';
                } else if (args.data.REPORT_KIND === 'GLOVE') {
                    sqlNsr = `  and a.buyer_cd  in ('sg') and a.buyer_cd like '1%'  `;
                    sqlLineType = ``;
                    sqlBuyer = '';
                } else if (args.data.REPORT_KIND === 'EXCL_G_N') {
                    sqlNsr = `  and a.buyer_cd not in ('wi','ss','wf','nn','ns','ng','np','sg','1f','1t') and a.buyer_team not in ('06') `;
                    sqlLineType = ` and b.line_type not in ('G')  `;
                    sqlBuyer = '';
                } else if (args.data.REPORT_KIND === 'TENT') {
                    sqlNsr = `  and a.buyer_type = '3'  `;
                    sqlLineType = ``;
                    sqlBuyer = '';
                } else if (args.data.REPORT_KIND === 'DOWN') {
                    sqlNsr = `  and a.buyer_cd not in ('ng','np') `;
                    sqlStyle = `  and d.down not in ('','X') `;
                    sqlLineType = ` and b.line_type in ('D')  `;
                    sqlBuyer = '';
                } else {
                    sqlNsr = `  and a.buyer_cd not in ('ng','np') `;
                }
       
                var sqlFactory = '';
                if (args.data.FACTORY_CD === 'FC044') {
                    sqlFactory = `   and b.factory_cd in ('fc044')`;
                } else if (args.data.FACTORY_CD === 'FC034') {
                    sqlFactory = `   and b.factory_cd in ('fc034','fc113','fc087')`;
                }

                var sql_tot_buyer = `
                    select distinct kk.BUYER_NAME, kk.BUYER_CD
                    from
                    (
                    SELECT       
                        A.BUYER_NAME, 
                        A.BUYER_CD ,
                        isnull(sum(avr_price*b.tot_cnt*c.usd_rate), 0) AS usamt  
                    from kcd_buyer a,ksv_order_mst b, kcd_curr_com  c, kcd_style d  
                    WHERE  A.BUYER_CD = LEFT(B.ORDER_CD, 2) and (B.STYLE_CD <> '00-0000') 
                    and    c.start_date = (SELECT MAX(START_DATE) AS Expr1 FROM KCD_CURR_COM AS KCD_CURR_COM_1 ) and c.curr_cd = b.curr_cd 
                    AND    (LEFT(B.DUE_DATE, 6) >= '${args.data.S_DATE}') AND (LEFT(B.DUE_DATE, 6) <= '${args.data.E_DATE}') 
                    ${sqlFactory}
                    ${sqlBuyer}
                    and b.order_status <> '*' 
                    and b.style_cd = d.style_cd ${sqlStyle}
                    GROUP BY A.BUYER_NAME, A.BUYER_CD 
                    having sum(b.tot_cnt) > 100 
                    union 
                    SELECT
                        A.BUYER_NAME,
                        A.BUYER_CD,
                        isnull(sum(c.usd_rate * b.PLAN_AMT), 0) AS usamt
                    FROM
                        KCD_BUYER a,
                        ${tTableName} B,
                        kcd_curr_com c
                    WHERE
                        (B.YYMM >= '${args.data.S_DATE}') AND (B.YYMM <= '${args.data.E_DATE}')
                        and A.BUYER_CD = B.BUYER_CD
                        and c.start_date = (
                            SELECT
                                MAX(START_DATE) AS Expr1
                            FROM
                                KCD_CURR_COM AS KCD_CURR_COM_1
                        )
                        and c.curr_cd = b.curr_cd 
                        ${sqlBuyer} 
                        ${sqlNsr}
                        ${sqlLineType}
                        and b.curr_cd like '%USD%'
                    GROUP BY
                        A.BUYER_NAME,
                        A.BUYER_CD
                    ) kk
                    order by kk.BUYER_NAME
                `;
                var tRet_tot_buyer = await prisma.$queryRaw(
                    Prisma.raw(sql_tot_buyer),
                );


                // Total 
                var tFunc = new S0217_COMM();
                var tInObj = { ...args.data };
                tInObj.YEAR = tInObj.S_DATE.substring(0, 4);
                tInObj.COLLECTION_CD = '';
                tInObj.YYMM = tMonArray;
                if (!args.data.TYPE) tInObj.TYPE = '';

                var tRetObj = await tFunc.LIST2(
                    tInObj,
                    contextValue,
                );
                console.log(`tTotal Count: ${tRetObj.length}`);

                var tArray99 = [];
                for (var tIdx = 0; tIdx < 5; tIdx++) {
                    var tArray2 = [];
                    for (var tIdx1 = 0; tIdx1 < 13; tIdx1++) {
                        tArray2.push(0);
                    }
                    tArray99.push(tArray2);
                }

                // var tLineArray = ['1', '3', 'D', 'W', 'S'];
                tRetObj.forEach((col, i) => {
                    var tRow = 0;
                    var tRow1 = 2;

                    var tCol = parseInt(col.YYMM.substring(4, 6));

                    tArray99[tRow][tCol] = col.ORDER_QTY;
                    tArray99[tRow+1][tCol] = col.ORDER_AMT;
                    if (parseFloat(col.YYMM) >= parseFloat(tCurrYYMM)) {
                        tArray99[tRow1][tCol] = col.PLAN_QTY;
                        tArray99[tRow1+1][tCol] = col.PLAN_AMT;
                    } else {
                        tArray99[tRow1][tCol] = col.ORDER_QTY;
                        tArray99[tRow1+1][tCol] = col.ORDER_AMT;
                    }
                });

                for (var tIdx = 0; tIdx < 4; tIdx++) {
                    var tSum = 0;
                    for (var tIdx1 = 1; tIdx1 < 13; tIdx1++) {
                        tSum += parseFloat(tArray99[tIdx][tIdx1]);
                    }
                    tArray99[tIdx][0] = tSum;
                }

                var tYY = args.data.S_DATE.substring(0, 4);
                sheet.getCell(2, 2).value = `JAN. ${tYY} ~ DEC. ${tYY}`;
                sheet.getCell(2, 6).value = tRetDate1;
                sheet.getCell(2, 10).value = `Report(${tLineName})`;

                var tStartRow = 5;
                var tStartCol = 6;
                for (var tIdx = 0; tIdx < 4; tIdx++) {
                    for (var tIdx1 = 1; tIdx1 < 13; tIdx1++) {
                        sheet.getCell(
                            tStartRow + tIdx,
                            tStartCol + tIdx1,
                        ).value = Number(tArray99[tIdx][tIdx1]);
                    }
                }

                tStartRow += 5;
                tStartCol = 6;

                // Buyer별
                var tIdx3 = 0;
                for (tIdx3 = 0; tIdx3 < tRet_tot_buyer.length; tIdx3++) {

                    var tObjBuyer = { ...tRet_tot_buyer[tIdx3] };

                    sheet.getCell(tStartRow, 2).value = `[${tObjBuyer.BUYER_CD}]${tObjBuyer.BUYER_NAME}` 

                    var tFunc = new S0217_COMM();
                    var tInObj = { ...args.data };
                    tInObj.BUYER_CD = tObjBuyer.BUYER_CD;
                    tInObj.YEAR = tInObj.S_DATE.substring(0, 4);
                    tInObj.COLLECTION_CD = '';
                    tInObj.YYMM = tMonArray;
                    if (!args.data.TYPE) tInObj.TYPE = '';
                    var tRetObj = await tFunc.LIST2(
                        tInObj,
                        contextValue,
                    );
                    console.log(`tBuyer Count(tObjBuyer.BUYER_CD): ${tRetObj.length}`);
    
                    var tArray99 = [];
                    for (var tIdx = 0; tIdx < 5; tIdx++) {
                        var tArray2 = [];
                        for (var tIdx1 = 0; tIdx1 < 13; tIdx1++) {
                            tArray2.push(0);
                        }
                        tArray99.push(tArray2);
                    }
    
                    // var tLineArray = ['1', '3', 'D', 'W', 'S'];
                    tRetObj.forEach((col, i) => {
                        var tRow = 0;
                        var tRow1 = 2;
    
                        var tCol = parseInt(col.YYMM.substring(4, 6));
    
                        tArray99[tRow][tCol] = col.ORDER_QTY;
                        tArray99[tRow+1][tCol] = col.ORDER_AMT;
                        if (parseFloat(col.YYMM) >= parseFloat(tCurrYYMM)) {
                            tArray99[tRow1][tCol] = col.PLAN_QTY;
                            tArray99[tRow1+1][tCol] = col.PLAN_AMT;
                        } else {
                            tArray99[tRow1][tCol] = col.ORDER_QTY;
                            tArray99[tRow1+1][tCol] = col.ORDER_AMT;
                        }
                    });
    
                    for (var tIdx = 0; tIdx < 4; tIdx++) {
                        var tSum = 0;
                        for (var tIdx1 = 1; tIdx1 < 13; tIdx1++) {
                            tSum += parseFloat(tArray99[tIdx][tIdx1]);
                        }
                        tArray99[tIdx][0] = tSum;
                    }

                    for (var tIdx = 0; tIdx < 4; tIdx++) {
                        for (var tIdx1 = 1; tIdx1 < 13; tIdx1++) {
                            sheet.getCell(
                                tStartRow + tIdx,
                                tStartCol + tIdx1,
                            ).value = Number(tArray99[tIdx][tIdx1]);
                        }
                    }

                    tStartRow += 5;
                    tStartCol = 6;
                }

                return await upload(`${tWExcelFile}.xlsx`, wb);
            } catch (error) {
                var tRetArray = [];
                var tObj = {};
                tObj.id = 1;
                tObj.CODE = `ERROR:${error.message}`;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },
    },
};

export default moduleQuery_S0217_SALES_MATL_PLAN_LIST_TBL_KSV_ORDER_MST1;
