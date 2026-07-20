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
const moduleMutation_S0215_5 = {
    Mutation: {
        mgrUpdate_S0215_STS_END: async (_, args, contextValue) => {
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

            if (tUserInfo.USER_ID === 'jhoen' || 
                tUserInfo.USER_ID === 'kevin1' || 
                tUserInfo.USER_ID === 'won21kr') {
                ;
            } else {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Check End User(jhoen)';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tEndDate = '';
            if (args.datas[0].END_DATE) tEndDate = args.datas[0].END_DATE;
            if (!tEndDate) tEndDate = tRetDate1;

            var tSQLArray = [];

            var tIdx0 = 0;
            for (tIdx0 = 0; tIdx0 < args.datas.length; tIdx0++) {
                var col = { ...args.datas[tIdx0] };

                if (col.CONFIRM_USER === '') {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = 'ERROR:first confirm:';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }

                var tEndFlag = '';
                if (col.END_FLAG === '1') {
                    tEndFlag = '0';
                    tEndDate = '';
                }
                else {
                    tEndFlag = '1';
                }

                let tSQL99 = `
                    update ksv_order_over_short
                    set
                        end_flag = '${tEndFlag}',
                        end_date = '${tEndDate}'
                    where
                        order_cd = '${col.ORDER_CD}'
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
                tObj.CODE = 'SUCCEED:Order End:';
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

        mgrInsert_S0215_STS_SAVE: async (_, args, contextValue) => {
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
            var tUserInfo = AFLib.getUserInfo(contextValue);
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

            var tSQLArray = [];

            var tIdx0 = 0;
            for (tIdx0 = 0; tIdx0 < args.datas.length; tIdx0++) {
                var col = { ...args.datas[tIdx0] };

                if (col.VMD_QTY === '') {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = 'ERROR:First Update VMD:';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }

                if (col.CONFIRM_USER !== '') {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = 'ERROR:Already Confirmed:';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }

                var tConfirmAmt = parseFloat(col.VMD_QTY) * parseFloat(col.FC_PRICE);
                    tConfirmAmt = parseFloat(tConfirmAmt).toFixed(2);

                var tConfirm_User = AFLib.getUserInfo(contextValue).USER_ID;

                let tSQL99 = `
                    update ksv_order_over_short
                    set
                        smd_qty = '${col.SMD_QTY}',
                        confirm_amt = '${tConfirmAmt}',
                        sts_comment = '${col.STS_COMMENT}',
                        confirm_user = '${tUserInfo.USER_ID}',
                        confirm_datetime = '${tRetDate}',
                        sup_qty = '${col.SUP_QTY}',
                        buyer_qty = '${col.BUYER_QTY}',
                        sts_qty = '${col.STS_QTY}'
                    where
                        order_cd = '${col.ORDER_CD}'
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
                tObj.CODE = 'SUCCEED:Order End:';
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

        mgrInsert_S0215_STS_CANCEL: async (_, args, contextValue) => {
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
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tSQLArray = [];

            var tIdx0 = 0;
            for (tIdx0 = 0; tIdx0 < args.datas.length; tIdx0++) {
                var col = { ...args.datas[tIdx0] };

                var sql0 = `
                    select
                        isnull(CONFIRM_USER, '') as CONFIRM_USER
                    from
                        ksv_order_over_short 
                    where
                        order_cd = '${col.ORDER_CD}'
                `;
                var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                if (nRet0.length <= 0) continue;

                if (nRet0[0].END_FLAG && nRet0[0].END_FLAG === '1') continue;

                if (nRet0[0].CONFIRM_USER) {
                    if (col.VMD_QTY === '') {
                        var tRetArray = [];
                        var tObj = {};
                        tObj.CODE = 'ERROR:First Update VMD:';
                        tObj.id = 0;
                        tRetArray.push(tObj);
                        return tRetArray;
                    }

                    if (col.CONFIRM_USER === '') {
                        var tRetArray = [];
                        var tObj = {};
                        tObj.CODE = 'ERROR:First Confirm:';
                        tObj.id = 0;
                        tRetArray.push(tObj);
                        return tRetArray;
                    }

                    var tConfirm_User = AFLib.getUserInfo(contextValue).USER_ID;

                    let tSQL99 = `
                        update ksv_order_over_short
                        set
                            confirm_user = ''
                        where
                            order_cd = '${col.ORDER_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                } else {
                    let tSQL99 = `
                        delete from  ksv_order_over_short
                        where
                            order_cd = '${col.ORDER_CD}'
                    `;
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
                tObj.CODE = 'SUCCEED:Order End:';
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

        mgrInsert_S0215_BVT_SAVE: async (_, args, contextValue) => {
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
            var tUserInfo = AFLib.getUserInfo(contextValue);

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

            var tSQLArray = [];

            var tIdx0 = 0;
            for (tIdx0 = 0; tIdx0 < args.datas.length; tIdx0++) {
                var col = { ...args.datas[tIdx0] };

                if (col.VMD_QTY === '') {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = 'ERROR:First Update VMD:';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }

                if (col.CONFIRM_USER !== '') {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = 'ERROR:Already Confirmed:';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }

                let tSQL99 = `
                    delete from ksv_order_over_short
                    where
                        order_cd = '${col.ORDER_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    insert into
                        ksv_order_over_short (
                            order_cd,
                            vmd_qty,
                            vmd_sub_qty,
                            smd_qty,
                            confirm_flag,
                            confirm_amt,
                            sts_comment,
                            bvt_comment,
                            sup_qty,
                            buyer_qty,
                            sts_qty
                        )
                    values
                        (
                            '${col.ORDER_CD}',
                            '${col.VMD_QTY}',
                            '${col.VMD_SUB_QTY}',
                            '0',
                            '0',
                            '0',
                            '',
                            '${col.BVT_COMMENT}',
                            '0',
                            '0',
                            '0'
                        )
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
                tObj.CODE = 'SUCCEED:Bvt Save';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Bvt Save->' + e.message;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },
    },
};

export default moduleMutation_S0215_5;
