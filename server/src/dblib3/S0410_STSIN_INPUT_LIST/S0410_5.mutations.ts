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
const moduleMutation_S0410_5 = {
    Mutation: {
        mgrInsert_S0410_5: async (_, args, contextValue) => {
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

            var tInput = args.datas[0];

            var chkCurr = 0;
            var tSaveCurr = args.datas[0].CURR_CD;

            var chkPayReport = 0;
            var chkPayReport1 = 0;

            args.datas.forEach((col, i) => {
                var tObj = { ...col };
                if (tSaveCurr !== tObj.CURR_CD) {
                    chkCurr += 1;
                }
                if (tObj.VENDOR_TYPE !== '1' && tObj.CURR_CD === 'KRW') {
                    chkPayReport1 += 1;
                }
                if (
                    tObj.PAY_REPORT !== '' &&
                    tObj.PAY_REPORT.substring(0, 4) !== 'TEMP'
                ) {
                    chkPayReport += 1;
                }
            });

            if (chkCurr > 0) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR: Check Currency.';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
            if (chkPayReport > 0) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR: Already Pay Request.';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
            if (chkPayReport1 > 0) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR: Include Domestic ';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var m_PayReport = `TEMP-${tInput.USER_ID}[${tInput.BANK_CD}]-${tRetDate}`;

            // PayReport excel 생성로직

            var tSQLArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var tInputOne = { ...args.datas[tIdx] };
                let tSQL99 = `
                    update ksv_stock_in
                    set
                        pay_report = '${m_PayReport}'
                    where
                        po_cd = '${tInputOne.PO_CD}'
                        and po_seq = ${tInputOne.PO_SEQ}
                        and order_cd = '${tInputOne.ORDER_CD}'
                        and matl_cd = '${tInputOne.MATL_CD}'
                        and mrp_seq = ${tInputOne.MRP_SEQ}
                        and in_datetime = '${tRetDate1}'
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
                tObj.CODE = 'SUCCEED:Import PayReport:' + args.datas.length;
                tObj.id = 0;
                tRetArray.push(tObj);
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Import PayReport';
                tObj.id = 0;
                tRetArray.push(tObj);
            }

            return tRetArray;
        },
        mgrInsert_S0410_5_1: async (_, args, contextValue) => {
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

            var tInput = { ...args.datas[0] };
            var tPayReport = tInput.PAY_REPORT;
            var tNewPayReport = tInput.PAY_REPORT.replace('TEMP-', '');

            var tFlag0 = 0;
            var tFlag1 = 0;

            args.datas.forEach((col, i) => {
                if (col.PAY_REPORT.substring(0, 4) !== 'TEMP') {
                    tFlag0 += 1;
                }
                if (col.PAY_REPORT !== tPayReport) {
                    tFlag1 += 1;
                }
            });

            if (tFlag0 > 0) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Alread rerequest payreport !';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
            if (tFlag1 > 0) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:동일한payreport 만 가능합니다';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tSQLArray = [];

            let tSQL99 = `
                update ksv_stock_in
                set
                    pay_report = '${tNewPayReport}',
                    end_flag = '1',
                    tt_flag = '1',
                    pur_factory = 'FC045',
                    end_date = '${tRetDate1}'
                where
                    pay_report = '${tPayReport}'
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
                tObj.CODE = 'SUCCEED:Confirm PayReport:' + args.datas.length;
                tObj.id = 0;
                tRetArray.push(tObj);
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Confirm PayReport';
                tObj.id = 0;
                tRetArray.push(tObj);
            }

            return tRetArray;
        },
    },
};

export default moduleMutation_S0410_5;
