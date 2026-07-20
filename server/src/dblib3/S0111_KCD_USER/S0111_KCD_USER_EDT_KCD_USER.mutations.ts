// MGR_@@TNAME@@.mutations.js

import * as fs from 'fs';
import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기

/*
                USER_ID:String 
                PASSWD:String 
                USER_NAME:String 
                EMAIL:String 
                TEL_NO:String 
                CELLULAR:String 
                EMP_NO:String 
                BUYER_TEAM:String 
                USER_LEVEL:String 

*/

// export default로 Mutation 내용 내보내기
const moduleMutation_S0111_KCD_USER_EDT_KCD_USER = {
    Mutation: {
        mgrInsert_S0111_KCD_USER_EDT_KCD_USER: async (
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
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var retArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var tData = args.datas[tIdx];
                var tObjEDT_KCD_USER = { ...tData };
                delete tObjEDT_KCD_USER.id;
                delete tObjEDT_KCD_USER.FACTOR_NAME;
                delete tObjEDT_KCD_USER.PART_NAME;
                delete tObjEDT_KCD_USER.RANK_NAME;
                delete tObjEDT_KCD_USER.STATUS_NAME;

                //let retInsert = await prisma.KCD_USER.create({data:tObjEDT_KCD_USER});
                var tSQLArray = [];

                let retInsert = prisma.$queryRaw(
                    Prisma.raw(
                        `
                            INSERT INTO
                                KCD_USER (
                                    USER_ID,
                                    PASSWD,
                                    USER_NAME,
                                    FACTORY_CD,
                                    PART,
                                    RANK,
                                    EMAIL,
                                    USER_LEVEL,
                                    STATUS_CD,
                                    TEL_NO,
                                    BUYER_TEAM,
                                    CELLULAR,
                                    EMP_NO,
                                    EXCEL,
                                    COMPANY_CODE
                                )
                            VALUES
                                (
                                    '${tObjEDT_KCD_USER.USER_ID}',
                                    '${tObjEDT_KCD_USER.PASSWD}',
                                    '${tObjEDT_KCD_USER.USER_NAME}',
                                    '${tObjEDT_KCD_USER.FACTORY_CD}',
                                    '${tObjEDT_KCD_USER.PART}',
                                    '${tObjEDT_KCD_USER.RANK}',
                                    '${tObjEDT_KCD_USER.EMAIL}',
                                    '${tObjEDT_KCD_USER.USER_LEVEL}',
                                    '${tObjEDT_KCD_USER.STATUS_CD}',
                                    '${tObjEDT_KCD_USER.TEL_NO}',
                                    '${tObjEDT_KCD_USER.BUYER_TEAM}',
                                    '${tObjEDT_KCD_USER.CELLULAR}',
                                    '${tObjEDT_KCD_USER.EMP_NO}',
                                    'xlsx',
                                    'shints'
                                )
                        `,
                    ),
                );
                tSQLArray.push(retInsert);
            }

            var tRetArray = [];
            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
            } catch (e) {
                tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Insert User';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCESS:Insert User';
            tObj.id = 0;
            tRetArray.push(tObj);
            return tRetArray;
        },

        mgrUpdate_S0111_KCD_USER_EDT_KCD_USER: async (
            _,
            args,
            contextValue,
        ) => {
            // let tPO = "POA2022S672";
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tSQLArray = [];
            var retArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var tData = args.datas[tIdx];
                var tObjEDT_KCD_USER = { ...tData };

                const retUpdate = prisma.$queryRaw(
                    Prisma.raw(
                        `
                            update KCD_USER
                            set
                                USER_ID = '${tData.USER_ID}',
                                PASSWD = '${tData.PASSWD}',
                                USER_NAME = '${tData.USER_NAME}',
                                FACTORY_CD = '${tData.FACTORY_CD}',
                                PART = '${tData.PART}',
                                RANK = '${tData.RANK}',
                                EMAIL = '${tData.EMAIL}',
                                USER_LEVEL = '${tData.USER_LEVEL}',
                                STATUS_CD = '${tData.STATUS_CD}',
                                TEL_NO = '${tData.TEL_NO}',
                                BUYER_TEAM = '${tData.BUYER_TEAM}',
                                CELLULAR = '${tData.CELLULAR}',
                                EMP_NO = '${tData.EMP_NO}'
                            where
                                id = ${tData.id}
                        `,
                    ),
                );
                tSQLArray.push(retUpdate);
            }

            var tRetArray = [];
            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
            } catch (e) {
                tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Update User';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCESS:Update User';
            tObj.id = 0;
            tRetArray.push(tObj);
            return tRetArray;
        },

        mgrDelete_S0111_KCD_USER_EDT_KCD_USER: async (
            _,
            args,
            contextValue,
        ) => {
            //
            console.log('------------------------');
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

            var tSQLArray = [];
            var retArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var tData = args.datas[tIdx];
                var tObjEDT_KCD_USER = { ...tData };

                // const retDelete = await prisma.@@TNAME@@.delete({
                //    where: { id: tObj@@TNAME@@.id, },
                // });

                const retDelete = prisma.$queryRaw(
                    Prisma.raw(
                        `
                            DELETE FROM KCD_USER
                            WHERE
                                USER_ID = '${tObjEDT_KCD_USER.USER_ID}'
                        `,
                    ),
                );
                tSQLArray.push(retDelete);
            }
            var tRetArray = [];
            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
            } catch (e) {
                tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Delete User';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCESS:Delete User';
            tObj.id = 0;
            tRetArray.push(tObj);
            return tRetArray;
            return retArray;
        },
    },
};

export default moduleMutation_S0111_KCD_USER_EDT_KCD_USER;
