// MGR_@@TNAME@@.mutations.js

import * as fs from 'fs';
import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기

const moment = require('moment');

/*
                IN_DATE: String 
                STYLE_CD: String 
                STYLE_NAME: String 
                BUYER_CD: String 
                BUYER_CD: String 
                JOB_CD: String 
                PO_CD: String 
                ORDER_CD: String 
                FOB: String 
                QTY: String 
                NR: String 
                REMARK: String 
                MW: String 
                S_ETA: String 
                S_ETA: String 
                M_ETA: String 
                EXP_CMPT: String 
                BVT_KIND: String 
                TPR: String 
                EMBOSSING: String 
                WASHING: String 
                DL: String 
                S: String 
                FND: String 
                DOWN: String 
                CUT: String 
                EMBRO: String 
                TP: String 
                SP: String 
                LTHR: String 
                G: String 
                W: String 
                FTP: String 
                DTP: String 
                SD: String 
                NEGO_TYPE: String 
                LAZE: String 
                SEQ: String 

*/

// export default로 Mutation 내용 내보내기
const moduleMutation_S0209_CAPABOOK_LIST_BVT_EDT_KSV_CAPABOOK_MEM = {
    Mutation: {
        mgrInsert_S0209_CAPABOOK_LIST_BVT_EDT_KSV_CAPABOOK_MEM: async (
            _,
            args,
            contextValue,
        ) => {
            //
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

            var retArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var tData = args.datas[tIdx];
                var tObjEDT_KSV_CAPABOOK_MEM = { ...tData };
                delete tObjEDT_KSV_CAPABOOK_MEM.id;

                /*
        let retInsert = await prisma.EDT_KSV_CAPABOOK_MEM.create({data:tObj@@TNAME@@});
        if (typeof retInsert.id === 'undefined') {
          var tObj = {};
          tObj.CODE = 'ERROR';
          tObj.id = 0;
          retArray.push(tObj);
        } else {
          var tObj = {};
          tObj.CODE = retInsert.FACTORY_CD;
          tObj.id = retInsert.id;
          retArray.push(tObj);
        } 
*/
            }
            return retArray;
        },

        mgrUpdate_S0209_CAPABOOK_LIST_BVT_EDT_KSV_CAPABOOK_MEM: async (
            _,
            args,
            contextValue,
        ) => {
            //
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
            var tYY = 'B' + yyyy.toString().substring(2) + '-';

            // let tPO = "POA2022S672";

            var retArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var tData = args.datas[tIdx];
                var tObjEDT_KSV_CAPABOOK_MEM = { ...tData };

                var tTableName = '';
                if (tObjEDT_KSV_CAPABOOK_MEM.FACTORY_CD === 'BVT') {
                    if (tObjEDT_KSV_CAPABOOK_MEM.IS_SAMPLE === '1')
                        tTableName = 'ksv_capasample_mem';
                    else tTableName = 'ksv_capabook_mem';
                }

                if (tObjEDT_KSV_CAPABOOK_MEM.FACTORY_CD === 'ETP') {
                    if (tObjEDT_KSV_CAPABOOK_MEM.IS_SAMPLE === '1')
                        tTableName = 'KSV_CAPASAMPLE_MEM_ETHIOPIA';
                    else tTableName = 'KSV_CAPABOOK_MEM_ETHIOPIA';
                }

                var tSQL = `
                    UPDATE ${tTableName}
                    set
                        JOB_CD = '${tObjEDT_KSV_CAPABOOK_MEM.JOB_CD}'
                    WHERE
                        ORDER_CD = '${tObjEDT_KSV_CAPABOOK_MEM.ORDER_CD}'
                        AND BOOK_DATE = '${tObjEDT_KSV_CAPABOOK_MEM.BOOK_DATE}'
                `;
                var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));

                /*
        const retUpdate = await prisma.@@NAME@@.update({
           where: { id: tObj@@TNAME@@.id, },
           data: tObj@@TNAME@@, 
        });

        var tObj = {};
        tObj.CODE = retUpdate.FACTORY_CD;
        tObj.id = retUpdate.id;
        retArray.push(tObj);
*/
                var tObj = {};
                tObj.CODE = tObjEDT_KSV_CAPABOOK_MEM.ORDER_CD;
                tObj.id = 0;
                retArray.push(tObj);
            }
            return retArray;
        },

        mgrUpdate_S0209_CAPABOOK_LIST_BVT_CAPA_END: async (
            _,
            args,
            contextValue,
        ) => {
            //
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
            var tYY = 'B' + yyyy.toString().substring(2) + '-';
            var tRetDate1 = tRetDate.substring(0, 8);

            // let tPO = "POA2022S672";

            //
            var tUserInfo = AFLib.getUserInfo(contextValue);
            var tInput1 = args.datas[0];

            /* user part = '02' 인경우만 가능하도록 */
            if (
                tUserInfo.USER_ID === 'won21kr' ||
                tUserInfo.USER_ID === 'kr' ||
                tUserInfo.USER_ID === 'mt' ||
                tUserInfo.USER_ID === 'rnd' ||
                tUserInfo.USER_ID === 'sales1' ||
                tUserInfo.USER_ID === 'sales2' ||
                tUserInfo.USER_ID === 'sales3' ||
                tUserInfo.USER_ID === 'sales4' ||
                tUserInfo.USER_ID === 'sales5' ||
                tUserInfo.USER_ID === 'wf'
            ) {
            } else {
                var tRetError = [];
                var tObj = {};
                tObj.CODE = `ERROR: Capa End Not Permit`;
                tObj.id = 0;
                tRetError.push(tObj);
                return tRetError;
            }

            /*
      if (parseFloat(tInput1.BOOK_DATE) >= parseFloat(tRetDate1))  {
         var tRetError = [];
         var tObj = {};
         tObj.CODE = `ERROR: Book Date great then current date`;
         tObj.id = 0;
         tRetError.push(tObj);
         return (tRetError);
      }
      */

            var tSQLArray = [];
            var tNewDateStr = '';

            var retArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var tData = args.datas[tIdx];
                var tObjEDT_KSV_CAPABOOK_MEM = { ...tData };

                var tWorkDate = tObjEDT_KSV_CAPABOOK_MEM.BOOK_DATE;
                if (tWorkDate <= tRetDate1) {
                } else {
                    // 다른 주 일 경우 에러
                    const date1 = moment(tRetDate1, 'YYYYMMDD');
                    const date2 = moment(tWorkDate, 'YYYYMMDD');

                    const sameWeek =
                        date1.isoWeek() === date2.isoWeek() &&
                        date1.isoWeekYear() === date2.isoWeekYear();

                    if (!sameWeek) {
                        var tRetError = [];
                        var tObj = {};
                        tObj.CODE = `ERROR: can not CAPA END. Check date. `;
                        tObj.id = 0;
                        tRetError.push(tObj);
                        return tRetError;
                    }
                }

                var tYear0 = parseInt(
                    tObjEDT_KSV_CAPABOOK_MEM.BOOK_DATE.substring(0, 4),
                );
                var tMonth0 =
                    parseInt(
                        tObjEDT_KSV_CAPABOOK_MEM.BOOK_DATE.substring(4, 6),
                    ) - 1;
                var tDay0 = parseInt(
                    tObjEDT_KSV_CAPABOOK_MEM.BOOK_DATE.substring(6, 8),
                );
                var tBookDate = new Date(tYear0, tMonth0, tDay0);
                console.log('BOOK_DATE=>' + tBookDate);

                var tSaveBookDate = tBookDate;
                var tSaveBookDateStr = tObjEDT_KSV_CAPABOOK_MEM.BOOK_DATE;

                var tNewDate = tBookDate;
                tNewDateStr = '';
                tNewDate.setDate(tSaveBookDate.getDate() + 7 * 1);
                console.log('NEW_DATE=>' + tNewDate);

                tNewDateStr = tNewDate.getFullYear().toString();
                if (tNewDate.getMonth() + 1 < 10) {
                    tNewDateStr += '0' + (tNewDate.getMonth() + 1);
                } else {
                    tNewDateStr += tNewDate.getMonth() + 1;
                }
                if (tNewDate.getDate() < 10) {
                    tNewDateStr += '0' + tNewDate.getDate();
                } else {
                    tNewDateStr += tNewDate.getDate();
                }
                console.log('NEW_DATE_STR=>' + tNewDateStr);

                /*
        while (parseFloat(tNewDateStr) < parseFloat(tRetDate1)) { 
           tNewDate.setDate(tSaveBookDate.getDate() + 7 * 1);
           tSaveBookDate = tNewDate;
           console.log("NEW_DATE=>" + tNewDate);
           tNewDateStr = tNewDate.getFullYear().toString();
           if (tNewDate.getMonth() + 1 < 10) {
              tNewDateStr += '0' + (tNewDate.getMonth() + 1);
           } else {
              tNewDateStr += (tNewDate.getMonth() + 1);
           }
           if (tNewDate.getDate()  < 10) {
              tNewDateStr += '0' + (tNewDate.getDate());
           } else {
              tNewDateStr += (tNewDate.getDate());
           }
        }
        */
                if (tNewDateStr === '') {
                    var tRetError = [];
                    var tObj = {};
                    tObj.CODE = `ERROR: can not get new date; ${tNewDateStr}`;
                    tObj.id = 0;
                    tRetError.push(tObj);
                    return tRetError;
                }
                console.log('NEW_DATE_STR=>' + tNewDateStr);

                var tTableName = '';
                var tTableNameMst = '';
                if (tObjEDT_KSV_CAPABOOK_MEM.FACTORY_CD === 'BVT') {
                    if (tObjEDT_KSV_CAPABOOK_MEM.IS_SAMPLE === '1') {
                        tTableName = 'ksv_capasample_mem';
                        tTableNameMst = 'ksv_capasample_mst';
                    } else {
                        tTableName = 'ksv_capabook_mem';
                        tTableNameMst = 'ksv_capabook_mst';
                    }
                }

                if (tObjEDT_KSV_CAPABOOK_MEM.FACTORY_CD === 'ETP') {
                    if (tObjEDT_KSV_CAPABOOK_MEM.IS_SAMPLE === '1') {
                        tTableName = 'KSV_CAPASAMPLE_MEM_ETHIOPIA';
                        tTableNameMst = 'KSV_CAPASAMPLE_MST_ETHIOPIA';
                    } else {
                        tTableName = 'KSV_CAPABOOK_MEM_ETHIOPIA';
                        tTableNameMst = 'KSV_CAPABOOK_MST_ETHIOPIA';
                    }
                }

                let sqlStr = `
                    select
                        max(book_date) as book_date
                    from
                        ${tTableNameMst}
                    where
                        user_id = '${tObjEDT_KSV_CAPABOOK_MEM.USER_NAME}'
                        and status_cd = '1'
                    order by
                        book_date desc
                `;
                var tRet99 = await prisma.$queryRaw(Prisma.raw(sqlStr));
                var tStartDate99 = '';
                if (tRet99.length > 0) {
                    tStartDate99 = tRet99[0].book_date;
                }

                let sqlStr = `
                    select
                        max(book_date) as book_date
                    from
                        ${tTableNameMst}
                    where
                        user_id = '${tObjEDT_KSV_CAPABOOK_MEM.USER_NAME}'
                        and status_cd = '0'
                    order by
                        book_date desc
                `;
                var tRet99 = await prisma.$queryRaw(Prisma.raw(sqlStr));
                var tEndDate99 = '';
                if (tRet99.length > 0) {
                    tEndDate99 = tRet99[0].book_date;
                }

                // 날짜 Get
                let sqlBefDate = `
                    select
                        max(book_date) as book_date
                    from
                        ${tTableNameMst}
                    where
                        user_id = '${tObjEDT_KSV_CAPABOOK_MEM.USER_NAME}'
                        and status_cd = '1'
                    order by
                        book_date desc
                `;
                var retBefDate = await prisma.$queryRaw(Prisma.raw(sqlBefDate));
                var tBefDate = '';
                if (retBefDate.length > 0) {
                    tBefDate = retBefDate[0].book_date;
                }

                let sqlNextDate = `
                    select
                        max(book_date) as book_date
                    from
                        ${tTableNameMst}
                    where
                        user_id = '${tObjEDT_KSV_CAPABOOK_MEM.USER_NAME}'
                        and status_cd = '0'
                    order by
                        book_date desc
                `;
                var retNextDate = await prisma.$queryRaw(
                    Prisma.raw(sqlNextDate),
                );
                var tNextDate = '';
                if (retNextDate.length > 0) {
                    tNextDate = retNextDate[0].book_date;
                }

                console.log(`Capa Date:${tNextDate}/${tBefDate}/${tRetDate1}`);

                if (
                    parseFloat(tNextDate) <= parseFloat(tRetDate1) ||
                    (parseFloat(tNextDate) > parseFloat(tRetDate1) &&
                        parseFloat(tBefDate) <= parseFloat(tRetDate1))
                ) {
                } else {
                    var tRetError = [];
                    var tObj = {};
                    tObj.CODE = `ERROR: Already End Process(Check Date) `;
                    tObj.id = 0;
                    tRetError.push(tObj);
                    return tRetError;
                }

                /*
        if ((parseFloat(tStartDate99) <= parseFloat(tRetDate1)) && 
            (parseFloat(tEndDate99) >= parseFloat(tRetDate1))) { 
            ; 
        } else {
            var tRetError = [];
            var tObj = {};
            tObj.CODE = `ERROR: Already End Process `;
            tObj.id = 0;
            tRetError.push(tObj);
            return (tRetError);
        }
        */

                /*
        if (parseFloat(tLastDate99) > parseFloat(tRetDate1)) {
            var tRetError = [];
            var tObj = {};
            tObj.CODE = `ERROR: Already End Process `;
            tObj.id = 0;
            tRetError.push(tObj);
            return (tRetError);
        }
        */

                var tSQL0 = `
                    select
                        *
                    from
                        ${tTableName}
                    where
                        book_date = '${tNewDateStr}'
                        and user_id = '${tObjEDT_KSV_CAPABOOK_MEM.USER_NAME}'
                `;
                var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL0));
                if (nRet0.length > 0) {
                    var tRetError = [];
                    var tObj = {};
                    tObj.CODE = `ERROR: Aleady Data: ${tNewDateStr} / ${tObjEDT_KSV_CAPABOOK_MEM.USER_NAME}`;
                    tObj.id = 0;
                    tRetError.push(tObj);
                    return tRetError;
                }

                var tSQL = `
                    select
                        *
                    from
                        ${tTableName}
                    where
                        book_date = '${tObjEDT_KSV_CAPABOOK_MEM.BOOK_DATE}'
                        and user_id = '${tObjEDT_KSV_CAPABOOK_MEM.USER_NAME}'
                        and job_cd in ('I', '0', 'U')
                `;
                var nRet = await prisma.$queryRaw(Prisma.raw(tSQL));

                var tInsertCAPABOOK_MEM_ARRAY = nRet.map((col, i) => {
                    var tObj = { ...col };
                    delete tObj.id;
                    tObj.JOB_CD = '0';

                    if (tObjEDT_KSV_CAPABOOK_MEM.IS_SAMPLE === '0') {
                        if (col.JOB_CD === 'I') tObj.NR = 'NEW';
                        else {
                            if (tObjEDT_KSV_CAPABOOK_MEM.FACTORY_CD === 'BVT')
                                tObj.NR = 'VR';
                            else tObj.NR = 'ER';
                        }
                    }

                    tObj.BOOK_DATE = tNewDateStr;
                    return tObj;
                });

                tInsertCAPABOOK_MEM_ARRAY.forEach((col, i) => {
                    var col1 = { ...col };
                    col1.REMARK = col.REMARK.replace(/'/gi, '');
                    var tSQL99 = AFLib.createTableSql(tTableName, col1);
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                });

                var tSQL9 = `
                    select
                        *
                    from
                        ${tTableNameMst}
                    where
                        book_date = '${tNewDateStr}'
                        and user_id = '${tObjEDT_KSV_CAPABOOK_MEM.USER_NAME}'
                `;
                var nRet9 = await prisma.$queryRaw(Prisma.raw(tSQL9));
                if (nRet9.length <= 0) {
                    var tInsertCAPABOOK_MST = {};
                    tInsertCAPABOOK_MST.BOOK_DATE = tNewDateStr;
                    tInsertCAPABOOK_MST.USER_ID =
                        tObjEDT_KSV_CAPABOOK_MEM.USER_NAME;
                    tInsertCAPABOOK_MST.STATUS_CD = '0';
                    tInsertCAPABOOK_MST.PLAN_FLAG = '0';
                    tInsertCAPABOOK_MST.REG_USER = tUserInfo.USER_ID;
                    tInsertCAPABOOK_MST.REG_DATETIME = tRetDate;

                    var tSQL99 = AFLib.createTableSql(
                        tTableNameMst,
                        tInsertCAPABOOK_MST,
                    );
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }

                var tSqlUpdate = `
                    update ${tTableNameMst}
                    set
                        status_cd = '1'
                    where
                        book_date = '${tObjEDT_KSV_CAPABOOK_MEM.BOOK_DATE}'
                        and user_id = '${tObjEDT_KSV_CAPABOOK_MEM.USER_NAME}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSqlUpdate));
                tSQLArray.push(tSQL99_1);

                try {
                    global.currentTransactionInfo = {
                        contextValue: contextValue,
                        functionName: AFLib.getFunctionName(),
                    };
                    await prisma.$transaction(tSQLArray);
                    delete global.currentTransactionInfo;
                } catch (e) {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = 'ERROR:CapaEnd';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED:' + tNewDateStr;
            tObj.id = 0;
            tRetArray.push(tObj);
            return tRetArray;
        },

        mgrUpdate_S0209_CAPABOOK_LIST_BVT_CAPA_END_CANCEL: async (
            _,
            args,
            contextValue,
        ) => {
            //
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
            var tYY = 'B' + yyyy.toString().substring(2) + '-';

            // let tPO = "POA2022S672";

            var tUserInfo = AFLib.getUserInfo(contextValue);
            var tInput1 = args.datas[0];

            /* user part = '02' 인경우만 가능하도록 */
            if (
                tUserInfo.USER_ID === 'won21kr' ||
                tUserInfo.USER_ID === 'kr' ||
                tUserInfo.USER_ID === 'mt' ||
                tUserInfo.USER_ID === 'rnd' ||
                tUserInfo.USER_ID === 'sales1' ||
                tUserInfo.USER_ID === 'sales2' ||
                tUserInfo.USER_ID === 'sales3' ||
                tUserInfo.USER_ID === 'sales4' ||
                tUserInfo.USER_ID === 'sales5' ||
                tUserInfo.USER_ID === 'wf'
            ) {
            } else {
                var tRetError = [];
                var tObj = {};
                tObj.CODE = `ERROR: Capa End Cancel  Not Permit`;
                tObj.id = 0;
                tRetError.push(tObj);
                return tRetError;
            }

            var retArray = [];
            var tSQLArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var tData = args.datas[tIdx];

                var tTableName = '';
                var tTableNameMst = '';
                if (tData.FACTORY_CD === 'BVT') {
                    if (tData.IS_SAMPLE === '1') {
                        tTableName = 'ksv_capasample_mem';
                        tTableNameMst = 'ksv_capasample_mst';
                    } else {
                        tTableName = 'ksv_capabook_mem';
                        tTableNameMst = 'ksv_capabook_mst';
                    }
                }

                if (tData.FACTORY_CD === 'ETP') {
                    if (tData.IS_SAMPLE === '1') {
                        tTableName = 'KSV_CAPASAMPLE_MEM_ETHIOPIA';
                        tTableNameMst = 'KSV_CAPASAMPLE_MST_ETHIOPIA';
                    } else {
                        tTableName = 'KSV_CAPABOOK_MEM_ETHIOPIA';
                        tTableNameMst = 'KSV_CAPABOOK_MST_ETHIOPIA';
                    }
                }

                var tSQL = `
                    select
                        top 1 *
                    from
                        ${tTableNameMst}
                    where
                        user_id = '${tData.USER_NAME}'
                        and status_cd = '0'
                    order by
                        book_date desc
                `;
                var nRet = await prisma.$queryRaw(Prisma.raw(tSQL));
                if (nRet.length <= 0) {
                    var tRetError = [];
                    var tObj = {};
                    tObj.CODE = `ERROR: Not Found Book Date`;
                    tObj.id = 0;
                    tRetError.push(tObj);
                    return tRetError;
                }
                var tBookDate = nRet[0].BOOK_DATE;

                var tSQL1 = `
                    select
                        top 1 *
                    from
                        ${tTableNameMst}
                    where
                        user_id = '${tData.USER_NAME}'
                        and status_cd = '1'
                    order by
                        book_date desc
                `;
                var nRet1 = await prisma.$queryRaw(Prisma.raw(tSQL1));
                if (nRet1.length <= 0) {
                    var tRetError = [];
                    var tObj = {};
                    tObj.CODE = `ERROR: Not Found Last Date`;
                    tObj.id = 0;
                    tRetError.push(tObj);
                    return tRetError;
                }
                var tLastDate = nRet1[0].BOOK_DATE;

                let tSQL99 = `
                    delete from ${tTableNameMst}
                    where
                        book_date = '${tBookDate}'
                        and user_id = '${tData.USER_NAME}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    delete from ${tTableName}
                    where
                        book_date = '${tBookDate}'
                        and user_id = '${tData.USER_NAME}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    update ${tTableNameMst}
                    set
                        status_cd = '0'
                    where
                        book_date = '${tLastDate}'
                        and user_id = '${tData.USER_NAME}'
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
                tObj.CODE = 'SUCCESS:CapaEnd';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:CapaEnd';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },

        mgrDelete_S0209_CAPABOOK_LIST_BVT_EDT_KSV_CAPABOOK_MEM: async (
            _,
            args,
        ) => {
            //
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
            var tYY = 'B' + yyyy.toString().substring(2) + '-';

            // let tPO = "POA2022S672";

            var retArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var tData = args.datas[tIdx];
                var tObjEDT_KSV_CAPABOOK_MEM = { ...tData };

                /*
        const retDelete = await prisma.@@TNAME@@.delete({
           where: { id: tObj@@TNAME@@.id, },
        });

        var tObj = {};
        tObj.CODE = tObj@@TNAME@@.id;
        retArray.push(tObj);
*/
            }
            return retArray;
        },
    },
};

export default moduleMutation_S0209_CAPABOOK_LIST_BVT_EDT_KSV_CAPABOOK_MEM;
