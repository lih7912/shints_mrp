// MGR_@@TNAME@@.mutations.js

import * as fs from 'fs';
import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기

/*
                STD_FLAG: String 
                NET: String 
                LOSS: String 
                USE_SIZE: String 
                REMARK: String 

*/

// export default로 Mutation 내용 내보내기
const moduleMutation_S0216_5 = {
    Mutation: {
        mgrInsert_S0216_INSERT: async (_, args, contextValue) => {
            //
            var tDateNew = new Date();
            tDateNew.setMonth(tDateNew.getMonth() + 1);
            var tZeroDate = '00';
            var tDateNew_M =
                tZeroDate.substring(
                    0,
                    2 - String(tDateNew.getMonth() + 1).length,
                ) + String(tDateNew.getMonth() + 1);
            var tDateNew_D =
                tZeroDate.substring(0, 2 - String(tDateNew.getDate()).length) +
                String(tDateNew.getMonth());
            var tNewDateStr = tDateNew.getFullYear() + tDateNew_M + tDateNew_D;

            var tDate = new Date();
            var mm = tDate.getMonth() + 1;
            var mm_str = '';
            if (mm > 9) mm_str = mm.toString();
            else mm_str = '0' + mm;

            var dd = tDate.getDate();
            var dd_str = '';
            if (dd > 9) dd_str = dd;
            else dd_str = '0' + dd;

            var hours = tDate.getHours();
            var hours_str = '';
            if (hours > 9) hours_str = hours.toString();
            else hours_str = '0' + hours;

            var minutes = tDate.getMinutes();
            var minutes_str = '';
            if (minutes > 9) minutes_str = minutes.toString();
            else minutes_str = '0' + minutes;

            var seconds = tDate.getSeconds();
            var seconds_str = '';
            if (seconds > 9) seconds_str = seconds.toString();
            else seconds_str = '0' + seconds;

            var yyyy = tDate.getFullYear();

            var tRetDate =
                yyyy.toString() +
                mm_str +
                dd_str +
                hours_str +
                minutes_str +
                seconds_str;
            var tRetDate1 = tRetDate.substring(0, 8);
            var tYY = 'B' + yyyy.toString().substring(2) + '-';

            // let tPO = "POA2022S672";

            /*
      var tSQL = `
          SELECT
              max(A.SEQ) + 1 as max_seq
          FROM
              KSV_ORDER_MST A,
              KCD_STYLE B
          WHERE
              A.STYLE_CD = B.STYLE_CD
              and A.YY = ${tOneMst.YY}
              and B.BUYER_CD = '${tOneMst.BUYER_CD}'
      `;
      var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
      var tRet = nRet0[0];
      var tMaxSeq = tRet.max_seq;
*/

            /*
      var sql0 = `
          select
              isnull(max(pu_cd), 'PU23-00000') as max_seq
          from
              ksv_pu_mst2
          where
              pu_cd like 'PU23-%';
      `;
      var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
      var tMaxSeq = parseInt(nRet0[0].max_seq.substring(6, 10)) + 1;
*/
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tTableName = '';
            if (args.datas.FACTORY_CD === 'FC044')
                tTableName = 'KSV_ORDER_PLAN_ETHIOPIA';
            if (args.datas.FACTORY_CD === 'FC034')
                tTableName = 'KSV_ORDER_PLAN';

            var tSQLArray = [];

            var tIdx0 = 0;
            for (tIdx0 = 0; tIdx0 < args.datas1.length; tIdx0++) {
                var col = { ...args.datas1[tIdx0] };

                let tSQL99 = `
                    delete from ${tTableName}
                    where
                        user_id = '${tUserInfo.USER_ID}'
                        and yymm = '${col.YYMM}'
                        and buyer_cd = '${args.datas.BUYER_CD}'
                        and collection = '${args.datas.COLLECTION_CD}'
                        and line_type = '${col.LINE_TYPE}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                var tInObj = {};
                tInObj.user_id = tUserInfo.USER_ID;
                tInObj.yymm = col.YYMM;
                tInObj.buyer_cd = args.datas.BUYER_CD;
                tInObj.collection = args.datas.COLLECTION_CD;
                tInObj.plan_qty = col.PLAN_QTY;
                tInObj.plan_amt = col.PLAN_AMT;
                tInObj.cm_price = col.CM_PRICE;
                tInObj.cm_amt = col.CM_AMT;
                tInObj.status_cd = '0';
                tInObj.reg_user = tUserInfo.USER_ID;
                tInObj.reg_datetime = tRetDate;
                tInObj.upd_user = tUserInfo.USER_ID;
                tInObj.upd_datetime = tRetDate;
                tInObj.line_type = col.LINE_TYPE;
                const tSQL99 = AFLib.createTableSql(tTableName, tInObj);
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            }

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'SUCCEED:Insert Plan:';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:' + e.message;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },

        mgrInsert_S0216_DELETE: async (_, args, contextValue) => {
            //
            var tDateNew = new Date();
            tDateNew.setMonth(tDateNew.getMonth() + 1);
            var tZeroDate = '00';
            var tDateNew_M =
                tZeroDate.substring(
                    0,
                    2 - String(tDateNew.getMonth() + 1).length,
                ) + String(tDateNew.getMonth() + 1);
            var tDateNew_D =
                tZeroDate.substring(0, 2 - String(tDateNew.getDate()).length) +
                String(tDateNew.getMonth());
            var tNewDateStr = tDateNew.getFullYear() + tDateNew_M + tDateNew_D;

            var tDate = new Date();
            var mm = tDate.getMonth() + 1;
            var mm_str = '';
            if (mm > 9) mm_str = mm.toString();
            else mm_str = '0' + mm;

            var dd = tDate.getDate();
            var dd_str = '';
            if (dd > 9) dd_str = dd;
            else dd_str = '0' + dd;

            var hours = tDate.getHours();
            var hours_str = '';
            if (hours > 9) hours_str = hours.toString();
            else hours_str = '0' + hours;

            var minutes = tDate.getMinutes();
            var minutes_str = '';
            if (minutes > 9) minutes_str = minutes.toString();
            else minutes_str = '0' + minutes;

            var seconds = tDate.getSeconds();
            var seconds_str = '';
            if (seconds > 9) seconds_str = seconds.toString();
            else seconds_str = '0' + seconds;

            var yyyy = tDate.getFullYear();

            var tRetDate =
                yyyy.toString() +
                mm_str +
                dd_str +
                hours_str +
                minutes_str +
                seconds_str;
            var tRetDate1 = tRetDate.substring(0, 8);
            var tYY = 'B' + yyyy.toString().substring(2) + '-';

            // let tPO = "POA2022S672";

            /*
      var tSQL = `
          SELECT
              max(A.SEQ) + 1 as max_seq
          FROM
              KSV_ORDER_MST A,
              KCD_STYLE B
          WHERE
              A.STYLE_CD = B.STYLE_CD
              and A.YY = ${tOneMst.YY}
              and B.BUYER_CD = '${tOneMst.BUYER_CD}'
      `;
      var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
      var tRet = nRet0[0];
      var tMaxSeq = tRet.max_seq;
*/

            /*
      var sql0 = `
          select
              isnull(max(pu_cd), 'PU23-00000') as max_seq
          from
              ksv_pu_mst2
          where
              pu_cd like 'PU23-%';
      `;
      var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
      var tMaxSeq = parseInt(nRet0[0].max_seq.substring(6, 10)) + 1;
*/
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tTableName = '';
            if (args.datas.FACTORY_CD === 'FC044')
                tTableName = 'KSV_ORDER_PLAN_ETHIOPIA';
            if (args.datas.FACTORY_CD === 'FC034')
                tTableName = 'KSV_ORDER_PLAN';

            var tSQLArray = [];

            var tIdx0 = 0;
            for (tIdx0 = 0; tIdx0 < args.datas1.length; tIdx0++) {
                var col = { ...args.datas1[tIdx0] };
                let tSQL99 = `
                    delete from ${tTableName}
                    where
                        user_id = '${tUserInfo.USER_ID}'
                        and yymm = '${col.YYMM}'
                        and buyer_cd = '${args.datas.BUYER_CD}'
                        and collection = '${args.datas.COLLECTION_CD}'
                        and line_type = '${col.LINE_TYPE}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            }

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'SUCCEED:Delete Plan:';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:' + e.message;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },

        mgrInsert_S0216_COPY_YEAR: async (_, args, contextValue) => {
            //
            var tDateNew = new Date();
            tDateNew.setMonth(tDateNew.getMonth() + 1);
            var tZeroDate = '00';
            var tDateNew_M =
                tZeroDate.substring(
                    0,
                    2 - String(tDateNew.getMonth() + 1).length,
                ) + String(tDateNew.getMonth() + 1);
            var tDateNew_D =
                tZeroDate.substring(0, 2 - String(tDateNew.getDate()).length) +
                String(tDateNew.getMonth());
            var tNewDateStr = tDateNew.getFullYear() + tDateNew_M + tDateNew_D;

            var tDate = new Date();
            var mm = tDate.getMonth() + 1;
            var mm_str = '';
            if (mm > 9) mm_str = mm.toString();
            else mm_str = '0' + mm;

            var dd = tDate.getDate();
            var dd_str = '';
            if (dd > 9) dd_str = dd;
            else dd_str = '0' + dd;

            var hours = tDate.getHours();
            var hours_str = '';
            if (hours > 9) hours_str = hours.toString();
            else hours_str = '0' + hours;

            var minutes = tDate.getMinutes();
            var minutes_str = '';
            if (minutes > 9) minutes_str = minutes.toString();
            else minutes_str = '0' + minutes;

            var seconds = tDate.getSeconds();
            var seconds_str = '';
            if (seconds > 9) seconds_str = seconds.toString();
            else seconds_str = '0' + seconds;

            var yyyy = tDate.getFullYear();

            var tRetDate =
                yyyy.toString() +
                mm_str +
                dd_str +
                hours_str +
                minutes_str +
                seconds_str;
            var tRetDate1 = tRetDate.substring(0, 8);
            var tYY = 'B' + yyyy.toString().substring(2) + '-';

            // let tPO = "POA2022S672";

            /*
      var tSQL = `
          SELECT
              max(A.SEQ) + 1 as max_seq
          FROM
              KSV_ORDER_MST A,
              KCD_STYLE B
          WHERE
              A.STYLE_CD = B.STYLE_CD
              and A.YY = ${tOneMst.YY}
              and B.BUYER_CD = '${tOneMst.BUYER_CD}'
      `;
      var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
      var tRet = nRet0[0];
      var tMaxSeq = tRet.max_seq;
*/

            /*
      var sql0 = `
          select
              isnull(max(pu_cd), 'PU23-00000') as max_seq
          from
              ksv_pu_mst2
          where
              pu_cd like 'PU23-%';
      `;
      var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
      var tMaxSeq = parseInt(nRet0[0].max_seq.substring(6, 10)) + 1;
*/
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tTableName = '';
            if (args.datas.FACTORY_CD === 'FC044')
                tTableName = 'KSV_ORDER_PLAN_ETHIOPIA';
            if (args.datas.FACTORY_CD === 'FC034')
                tTableName = 'KSV_ORDER_PLAN';

            var tSQLArray = [];

            var tNextYear = parseInt(args.datas.YEAR) + 1;
            if (tNextYear !== parseInt(tRetDate1.substring(0, 4))) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:직전년도 것만 Year Copy가 가능합니다';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            let tSQL99 = `
                delete from ${tTableName}
                where
                    yymm like '${tNextYear}%'
                    and buyer_cd = '${args.datas.BUYER_CD}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            let tSQL99 = `
                INSERT INTO
                    ${tTableName}
                select
                    user_id,
                    '${tNextYear}' + right(yymm, 2),
                    buyer_cd,
                    collection,
                    line_type,
                    plan_qty,
                    plan_amt,
                    cm_price,
                    cm_amt,
                    curr_cd,
                    status_cd,
                    reg_user,
                    '${tRetDate}',
                    upd_user,
                    upd_datetime
                from
                    ${tTableName}
                where
                    buyer_cd = '${args.datas.BUYER_CD}'
                    and left(yymm, 4) = '${args.datas.YEAR}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'SUCCEED:Copy Year:';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:' + e.message;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },

        mgrInsert_S0216_RECALC: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tTableName = '';
            if (args.datas.FACTORY_CD === 'FC044')
                tTableName = 'KSV_ORDER_PLAN_ETHIOPIA';
            if (args.datas.FACTORY_CD === 'FC034')
                tTableName = 'KSV_ORDER_PLAN';

            var tSQLArray = [];

            var strOldYear = parseInt(tRetDate1.substring(0, 4)) + 1;
            var strNowYear = tRetDate1.substring(0, 4);
            var strBuyerCd = args.datas.BUYER_CD;

            let tSQL99 = `
                delete from ksv_order_plan_order
                where
                    user_id = 'window'
                    and left(yymm, 4) in ('${strOldYear}', '${strNowYear}')
                    and buyer_cd like '${strBuyerCd}%'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            let tSQL99 = `
                SELECT
                    A.buyer_cd,
                    LEFT(D.SHIP_DATE, 6) AS yymm,
                    isnull(B.USD_PRICE, 0) * isnull(SUM(D.SHIP_CNT), 0) AS amt,
                    isnull(sum(d.ship_cnt), 0) as qty,
                    c.fnd,
                    c.g,
                    c.down,
                    c.s,
                    b.order_cd,
                    b.factory_cd,
                    isnull(B.fc_PRICE, 0) as fc_price,
                    isnull(B.fc_PRICE, 0) * isnull(SUM(D.SHIP_CNT), 0) AS fcamt,
                    '1' as kind,
                    '0' as ship_cnt,
                    isnull(b.usd_price, 0) as usd_price
                FROM
                    KCD_BUYER AS A,
                    KSV_ORDER_MST AS B,
                    kcd_style c,
                    KSV_ORDER_SHIP AS D
                WHERE
                    A.BUYER_CD = LEFT(B.ORDER_CD, 2)
                    and b.style_cd = c.style_cd
                    and B.ORDER_CD = D.ORDER_CD
                    and b.order_status not in ('4', '*')
                    and b.order_status >= '7'
                    and (B.STYLE_CD <> '00-0000')
                    AND LEFT(D.SHIP_DATE, 4) in ('${strNowYear}', '${strOldYear}')
                    and b.order_type <> '2'
                    and a.buyer_cd not in ('sg', 'ng', 'np', 'nu')
                    and a.buyer_cd like '${strBuyerCd}%'
                    -- and left(a.buyer_cd,1) <> ('1') 
                    and d.ship_ptype in ('0', '5')
                GROUP BY
                    A.BUYER_CD,
                    LEFT(D.SHIP_DATE, 6),
                    c.fnd,
                    c.g,
                    c.down,
                    c.s,
                    b.usd_price,
                    b.order_cd,
                    b.factory_cd,
                    B.fc_PRICE
                union
                SELECT
                    A.buyer_cd,
                    LEFT(B.DUE_DATE, 6) AS yymm,
                    isnull(B.USD_PRICE, 0) * (isnull(B.TOT_CNT, 0) - isnull(sum(D.SHIP_CNT), 0)) AS amt,
                    isnull(b.tot_cnt, 0) - isnull(sum(D.SHIP_CNT), 0) as qty,
                    c.fnd,
                    c.g,
                    c.down,
                    c.s,
                    b.order_cd,
                    b.factory_cd,
                    isnull(B.fc_price, 0) as fc_price,
                    isnull(B.fc_price, 0) * (isnull(b.tot_CNT, 0) - isnull(sum(D.SHIP_CNT), 0)) AS fcamt,
                    '2' as kind,
                    isnull(sum(D.SHIP_CNT), 0) as ship_cnt,
                    isnull(b.usd_price, 0) as usd_price
                FROM
                    KCD_BUYER AS A,
                    KSV_ORDER_MST AS B
                    left join KSV_ORDER_SHIP AS D on B.ORDER_CD = D.ORDER_CD
                    and d.ship_ptype in ('0', '5'),
                    kcd_style c
                WHERE
                    A.BUYER_CD = LEFT(B.ORDER_CD, 2)
                    and b.style_cd = c.style_cd
                    and b.order_status not in ('4', '*', '5')
                    and b.order_status < '7'
                    and (B.STYLE_CD <> '00-0000')
                    AND LEFT(B.DUE_DATE, 4) in ('${strNowYear}', '${strOldYear}')
                    and b.order_type <> '2'
                    and a.buyer_cd not in ('sg', 'ng', 'np', 'nu')
                    and a.buyer_cd like '${strBuyerCd}%'
                    -- and left(a.buyer_cd,1) <> ('1') 
                GROUP BY
                    A.BUYER_CD,
                    LEFT(B.DUE_DATE, 6),
                    c.fnd,
                    c.g,
                    c.down,
                    c.s,
                    b.usd_price,
                    b.order_cd,
                    b.factory_cd,
                    B.fc_PRICE,
                    B.TOT_CNT
                union
                SELECT
                    A.buyer_cd,
                    LEFT(D.SHIP_DATE, 6) AS yymm,
                    isnull(B.USD_PRICE, 0) * isnull(sum(D.SHIP_CNT), 0) AS amt,
                    isnull(sum(d.ship_cnt), 0) as qty,
                    c.fnd,
                    c.g,
                    c.down,
                    c.s,
                    b.order_cd,
                    b.factory_cd,
                    isnull(B.fc_price, 0) as fc_price,
                    isnull(B.fc_price, 0) * isnull(SUM(D.SHIP_CNT), 0) AS fcamt,
                    '3' as kind,
                    '0' as ship_cnt,
                    isnull(b.usd_price, 0) as usd_price
                FROM
                    KCD_BUYER AS A,
                    KSV_ORDER_MST AS B,
                    kcd_style c,
                    KSV_ORDER_SHIP AS D
                WHERE
                    A.BUYER_CD = LEFT(B.ORDER_CD, 2)
                    and b.style_cd = c.style_cd
                    and B.ORDER_CD = D.ORDER_CD
                    and b.order_status in ('5')
                    and (B.STYLE_CD <> '00-0000')
                    AND LEFT(D.SHIP_DATE, 4) in ('${strNowYear}', '${strOldYear}')
                    and b.order_type <> '2'
                    and a.buyer_cd not in ('sg', 'ng', 'np', 'nu')
                    and a.buyer_cd like '${strBuyerCd}%'
                    -- and left(a.buyer_cd,1) <> ('1') 
                    and d.ship_ptype in ('0', '5')
                GROUP BY
                    A.BUYER_CD,
                    LEFT(D.SHIP_DATE, 6),
                    c.fnd,
                    c.g,
                    c.down,
                    c.s,
                    b.usd_price,
                    b.order_cd,
                    b.factory_cd,
                    B.fc_PRICE
                union
                SELECT
                    A.buyer_cd,
                    LEFT(b.due_date, 6) AS yymm,
                    isnull(B.USD_PRICE, 0) * (isnull(b.tot_cnt, 0) - isnull(sum(D.SHIP_CNT), 0)) AS amt,
                    isnull(b.tot_cnt, 0) - sum(d.ship_cnt) as qty,
                    c.fnd,
                    c.g,
                    c.down,
                    c.s,
                    b.order_cd,
                    b.factory_cd,
                    isnull(B.fc_price, 0) as fc_price,
                    isnull(B.fc_price, 0) * (isnull(b.tot_cnt, 0) - isnull(sum(D.SHIP_CNT), 0)) AS fcamt,
                    '4' as kind,
                    '0' as ship_cnt,
                    isnull(b.usd_price, 0) as usd_price
                FROM
                    KCD_BUYER AS A,
                    KSV_ORDER_MST AS B,
                    kcd_style c,
                    KSV_ORDER_SHIP AS D
                WHERE
                    A.BUYER_CD = LEFT(B.ORDER_CD, 2)
                    and b.style_cd = c.style_cd
                    and B.ORDER_CD = D.ORDER_CD
                    and b.order_status in ('5')
                    and (B.STYLE_CD <> '00-0000')
                    AND LEFT(b.due_DATE, 4) in ('${strNowYear}', '${strOldYear}')
                    and b.order_type <> '2'
                    and a.buyer_cd not in ('sg', 'ng', 'np', 'nu')
                    and a.buyer_cd like '${strBuyerCd}%'
                    -- and left(a.buyer_cd,1) <> ('1') 
                    and d.ship_ptype in ('0', '5')
                GROUP BY
                    A.BUYER_CD,
                    LEFT(b.due_DATE, 6),
                    c.fnd,
                    c.g,
                    c.down,
                    c.s,
                    b.usd_price,
                    b.tot_cnt,
                    b.order_cd,
                    b.factory_cd,
                    B.fc_PRICE
                having
                    b.tot_cnt - sum(d.ship_cnt) > 0
                order by
                    6,
                    9
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(tSQL99));

            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tOne = { ...tRet[tIdx] };
                var tLineType = '';
                if (tOne.buyer_cd.substring(0, 1) === '1') tLineType = 'G';
                else {
                    if (tOne.fnd === '' || tOne.fnd === 'X') {
                        if (tOne.s === '' || tOne.s === 'X') {
                            if (
                                tOne.down === '' ||
                                tOne.down === 'X' ||
                                tOne.down === 'M' ||
                                tOne.down === 'P/Q' ||
                                tOne.down === 'M/Q' ||
                                tOne.down === 'W' ||
                                tOne.down === 'W/Q'
                            ) {
                                tLineType = '1';
                            } else if (
                                tOne.down === 'D' ||
                                tOne.down === 'D/Q'
                            ) {
                                tLineType = 'D';
                            }
                        } else if (
                            tOne.g === '0' ||
                            tOne.g === '2L' ||
                            tOne.g === '3L' ||
                            tOne.g === 'ROFO/TOFO' ||
                            tOne.g === 'P4' ||
                            tOne.g === 'TOF'
                        ) {
                            tLineType = 'W';
                        } else {
                            tLineType = 'S';
                        }
                    } else {
                        tLineType = '3';
                    }
                }

                var tFactoryCd = args.datas.FACTORY_CD;
                if (
                    args.datas.FACTORY_CD === 'FC113' ||
                    args.datas.FACTORY_CD === 'FC087'
                )
                    tFactoryCd = 'FC034';

                var tYYMM = tOne.yymm;
                if (tOne.kind === '2') {
                    if (parseFloat(tOne.ship_cnt) <= 0) {
                        if (
                            parseFloat(tOne.yymm) <
                            parseFloat(tRetDate1.substring(0, 6))
                        )
                            tYYMM = tRetDate1.substring(0, 6);
                        var tInObj = {};
                        tInObj.user_id = 'window';
                        tInObj.yymm = tYYMM;
                        tInObj.buyer_cd = tOne.buyer_cd;
                        tInObj.order_cd = tOne.order_cd;
                        tInObj.line_type = tLineType;
                        tInObj.order_qty = tOne.qty;
                        tInObj.order_amt = tOne.amt;
                        tInObj.factory_cd = tFactoryCd;
                        tInObj.status_cd = '1';
                        tInObj.cm_price = tOne.fc_price;
                        tInObj.cm_amt = tOne.fcamt;
                        tInObj.reg_user = 'window';
                        tInObj.reg_datetime = tRetDate;
                        let tSQL99 = AFLib.createTableSql(
                            'KSV_ORDER_PLAN_ORDER',
                            tInObj,
                        );
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);
                    } else {
                        let sql1 = `
                            select
                                isnull(sum(ship_cnt), 0) as ship_cnt,
                                left(ship_date, 6) as ship_date
                            from
                                ksv_order_ship
                            where
                                order_cd = '${tOne.order_cd}'
                                and ship_ptype in ('0', '5')
                            group by
                                left(ship_date, 6)
                        `;
                        var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                        var tIdx1 = 0;
                        for (tIdx1 = 0; tIdx1 < tRet1.length; tIdx1++) {
                            var tOne1 = { ...tRet1[tIdx1] };
                            var tShipQty = tOne1.ship_cnt;
                            var tShipDate = tOne1.ship_date;
                            var tAmt = parseFloat(tShipQty) * tOne.usd_price;
                            var tFcAmt = parseFloat(tShipQty) * tOne.fc_price;

                            var tInObj = {};
                            tInObj.user_id = 'window';
                            tInObj.yymm = tShipDate;
                            tInObj.buyer_cd = tOne.buyer_cd;
                            tInObj.order_cd = tOne.order_cd;
                            tInObj.line_type = tLineType;
                            tInObj.order_qty = tShipQty;
                            tInObj.order_amt = tAmt;
                            tInObj.factory_cd = tFactoryCd;
                            tInObj.status_cd = '1';
                            tInObj.cm_price = tOne.fc_price;
                            tInObj.cm_amt = tFcAmt;
                            tInObj.reg_user = 'window';
                            tInObj.reg_datetime = tRetDate;
                            let tSQL99 = AFLib.createTableSql(
                                'KSV_ORDER_PLAN_ORDER',
                                tInObj,
                            );
                            const tSQL99_1 = prisma.$queryRaw(
                                Prisma.raw(tSQL99),
                            );
                            tSQLArray.push(tSQL99_1);
                        }
                        if (parseFloat(tOne.qty) > 0) {
                            if (
                                parseFloat(tOne.yymm) <
                                parseFloat(tRetDate1.substring(0, 6))
                            )
                                tYYMM = tRetDate1.substring(0, 6);
                            var tInObj = {};
                            tInObj.user_id = 'window';
                            tInObj.yymm = tYYMM;
                            tInObj.buyer_cd = tOne.buyer_cd;
                            tInObj.order_cd = tOne.order_cd;
                            tInObj.line_type = tLineType;
                            tInObj.order_qty = tOne.qty;
                            tInObj.order_amt = tOne.amt;
                            tInObj.factory_cd = tFactoryCd;
                            tInObj.status_cd = '1';
                            tInObj.cm_price = tOne.fc_price;
                            tInObj.cm_amt = tOne.fcamt;
                            tInObj.reg_user = 'window';
                            tInObj.reg_datetime = tRetDate;
                            let tSQL99 = AFLib.createTableSql(
                                'KSV_ORDER_PLAN_ORDER',
                                tInObj,
                            );
                            const tSQL99_1 = prisma.$queryRaw(
                                Prisma.raw(tSQL99),
                            );
                            tSQLArray.push(tSQL99_1);
                        }
                    }
                } else {
                    var tInObj = {};
                    tInObj.user_id = 'window';
                    tInObj.yymm = tYYMM;
                    tInObj.buyer_cd = tOne.buyer_cd;
                    tInObj.order_cd = tOne.order_cd;
                    tInObj.line_type = tLineType;
                    tInObj.order_qty = tOne.qty;
                    tInObj.order_amt = tOne.amt;
                    tInObj.factory_cd = tFactoryCd;
                    tInObj.status_cd = '1';
                    tInObj.cm_price = tOne.fc_price;
                    tInObj.cm_amt = tOne.fcamt;
                    tInObj.reg_user = 'window';
                    tInObj.reg_datetime = tRetDate;
                    let tSQL99 = AFLib.createTableSql(
                        'KSV_ORDER_PLAN_ORDER',
                        tInObj,
                    );
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }
            }

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'SUCCEED:Order Recalcuration:';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:' + e.message;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },
    },
};

export default moduleMutation_S0216_5;
