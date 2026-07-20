// MGR_@@TNAME@@.mutations.js

import * as fs from 'fs';
import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기

/*
                CURR: String 
                USE_RATE: String 
                USE_PRICE: String 

*/

// export default로 Mutation 내용 내보내기
const moduleMutation_S0218_EXCHANGE_RATE_RECORD_EDT_KCD_CURR_COMM1 = {
    Mutation: {
        mgrInsert_S0218_EXCHANGE_RATE_RECORD_EDT_KCD_CURR_COMM1: async (
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
            var tData0 = { ...args.datas[0] };  
            var tStartDate0 = tData0.START_DATE;
            
            var tSQLArray = [];

            var tSQL = `
                    delete from  kcd_curr_com 
                    where
                        start_date = '${tStartDate0}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL));
            tSQLArray.push(tSQL99_1);

            console.log(`SQL Array(0): ${tSQLArray.length}`);

            var retArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var tData = { ...args.datas[tIdx] };
                var tCurrCd = tData.CURR_CD || tData.CURR || '';
                var tCurrAmt = tData.CURR_AMT || tData.USE_PRICE || '0';
                var tUsdRate = tData.USD_RATE || tData.USE_RATE || '0';
                var tStartDate = tData.START_DATE || tStartDate0;
                
                var tInObj = {};
                tInObj.CURR_CD = tCurrCd;
                tInObj.START_DATE = tStartDate;
                tInObj.CURR_AMT = tCurrAmt;
                tInObj.USD_RATE = tUsdRate;
                let tSQL99 = AFLib.createTableSql('KCD_CURR_COM', tInObj);
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
                console.log(`SQL Array(1): ${tSQLArray.length}`);
            }

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
                var retArray = [];
                var tObj = {};
                tObj.CODE = 'SUCCEED:Insert';
                tObj.id = 0;
                retArray.push(tObj);
                return retArray;
            } catch (e) {
                var retArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Insert';
                tObj.id = 0;
                retArray.push(tObj);
                return retArray;
            }
        },

        mgrUpdate_S0218_EXCHANGE_RATE_RECORD_EDT_KCD_CURR_COMM1: async (
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

            var tSQLArray = [];

            var retArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var tData = { ...args.datas[tIdx] };
                var tCurrCd = tData.CURR_CD || tData.CURR || '';
                var tCurrAmt = tData.CURR_AMT || tData.USE_PRICE || '0';
                var tUsdRate = tData.USD_RATE || tData.USE_RATE || '0';
                var tStartDate = tData.START_DATE || '';

                var tSQL = `
                    update   kcd_curr_com 
                    set
                        curr_amt   = ${tCurrAmt},
                        usd_rate   = ${tUsdRate}
                    where
                        start_date = '${tStartDate}'
                    and curr_cd    = '${tCurrCd}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL));
                tSQLArray.push(tSQL99_1);
            }

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
                var retArray = [];
                var tObj = {};
                tObj.CODE = 'SUCCEED:UPdate';
                tObj.id = 0; 
                retArray.push(tObj);
                return retArray;
            } catch (e) {
                var retArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Update';
                tObj.id = 0;
                retArray.push(tObj);
                return retArray;
            }

        },

        mgrDelete_S0218_EXCHANGE_RATE_RECORD_EDT_KCD_CURR_COMM1: async (
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

            var tSQLArray = [];

            var retArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var tData = args.datas[tIdx];
                var tCurrCd = tData.CURR_CD || tData.CURR || '';
                var tStartDate = tData.START_DATE || '';

                var tSQL = `
                    delete from   kcd_curr_com
                    where
                        start_date = '${tStartDate}'
                    and curr_cd    = '${tCurrCd}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL));
                tSQLArray.push(tSQL99_1);
            }
            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
                var retArray = [];
                var tObj = {};
                tObj.CODE = 'SUCCEED:Delete';
                tObj.id = 0; 
                retArray.push(tObj); 
                return retArray;
            } catch (e) {
                var retArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Delete';
                tObj.id = 0;
                retArray.push(tObj);
                return retArray;
            }
            return retArray;
        },
    },
};

export default moduleMutation_S0218_EXCHANGE_RATE_RECORD_EDT_KCD_CURR_COMM1;
