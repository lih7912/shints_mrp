// MGR_@@TNAME@@.mutations.js

import * as fs from 'fs';
import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기

/*
                CURR_CD: String 
                START_DATE: String 
                USD_RATE: String 
                WON_AMT: String 
                WON_AMT2: String 

*/

// export default로 Mutation 내용 내보내기
const moduleMutation_S0112_KCD_CURRENCY_EDT_KCD_CURRENCY = {
    Mutation: {
        mgrInsert_S0112_KCD_CURRENCY_EDT_KCD_CURRENCY: async (
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
            var tData = args.datas[0];
            var tSQL_DEL = `
                DELETE FROM KCD_CURRENCY
                WHERE
                    START_DATE = '${tData.START_DATE}'
            `;
            var tRet_del = await prisma.$queryRaw(Prisma.raw(tSQL_DEL));

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

            var tInsertArray = new Array<any>();
            var tIdx1 = 0;
            for (tIdx1 = 0; tIdx1 < args.datas.length; tIdx1++) {
                var tObj0 = args.datas[tIdx1];
                var tObj1 = {};
                tObj1.CURR_CD = tObj0.CURR_CD;
                tObj1.START_DATE = tObj0.START_DATE;
                tObj1.USD_RATE = parseFloat(tObj0.USD_RATE);
                tObj1.WON_AMT = parseFloat(tObj0.WON_AMT);
                tObj1.WON_AMT2 = parseFloat(tObj0.WON_AMT2);

                let sqlStr = `
                    INSERT INTO
                        KCD_CURRENCY (WON_AMT2, START_DATE, WON_AMT, CURR_CD, USD_RATE)
                    VALUES
                        (
                            ${tObj1.WON_AMT2},
                            '${tObj1.START_DATE}',
                            ${tObj1.WON_AMT},
                            '${tObj1.CURR_CD}',
                            ${tObj1.USD_RATE}
                        )
                `;
                let retInsert = await prisma.$queryRaw(Prisma.raw(sqlStr));
                tInsertArray.push(retInsert);
            }

            //let retInsert = await prisma.KCD_CURRENCY.createMany({data:tInsertArray});
            let retArray: any[] = [];
            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tInsertArray);
                delete global.currentTransactionInfo;
                var tObj = {
                    CODE: tData.START_DATE,
                    id: 1,
                };

                retArray.push(tObj);
            } catch (e) {
                var tObj = {
                    CODE: tData.START_DATE,
                    id: 1,
                };

                retArray.push(tObj);
            }

            return retArray;
        },

        mgrUpdate_S0112_KCD_CURRENCY_EDT_KCD_CURRENCY: async (_, args) => {
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
                var tObjEDT_KCD_CURRENCY = { ...tData };

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
            }
            return retArray;
        },

        mgrDelete_S0112_KCD_CURRENCY_EDT_KCD_CURRENCY: async (_, args) => {
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

            var tIdx = 0;
            let sqlStr = '';
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var tData = args.datas[tIdx];
                var tObjEDT_KCD_CURRENCY = { ...tData };

                sqlStr = `
                    delete from KCD_CURRENCY
                    where
                        START_DATE = '${tObjEDT_KCD_CURRENCY.START_DATE}'
                `;
            }
            let retArray: any[] = [];

            try {
                await prisma.$queryRaw(Prisma.raw(sqlStr));
                var tObj = {
                    CODE: tData.START_DATE,
                    id: 1,
                };

                retArray.push(tObj);
            } catch (e) {
                var tObj = {
                    CODE: tData.START_DATE,
                    id: 1,
                };

                retArray.push(tObj);
            }
            return retArray;
        },
    },
};

export default moduleMutation_S0112_KCD_CURRENCY_EDT_KCD_CURRENCY;
