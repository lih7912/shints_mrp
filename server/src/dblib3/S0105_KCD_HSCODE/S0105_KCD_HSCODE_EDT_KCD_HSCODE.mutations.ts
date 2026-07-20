// MGR_@@TNAME@@.mutations.js

import * as fs from 'fs';
import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기

/*
                HS_NO:String 
                HS_CODE:String 
                HS_NAME:String 

*/

// export default로 Mutation 내용 내보내기
const moduleMutation_S0105_KCD_HSCODE_EDT_KCD_HSCODE = {
    Mutation: {
        mgrInsert_S0105_KCD_HSCODE_EDT_KCD_HSCODE: async (
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

            var sql0 = `
                select
                    HS_NO
                from
                    kcd_hscode
            `;
            var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            let max_cnt = 0;
            var tMax = 1;
            for (var i = 0; i < nRet0.length; i++) {
                let temp = parseInt(nRet0[i].HS_NO);
                if (max_cnt < temp) {
                    max_cnt = temp;
                }
            }
            var tMax = max_cnt + 1;
            var tData = args.datas[0];
            var tObjEDT_KCD_HSCODE = { ...tData };
            delete tObjEDT_KCD_HSCODE.id;
            tObjEDT_KCD_HSCODE.HS_NO = String(tMax);

            var sqlchk = `
                select
                    HS_NO
                from
                    kcd_hscode
                where
                    hs_name = '${tObjEDT_KCD_HSCODE.HS_NAME}'
            `;
            var nRetChk = await prisma.$queryRaw(Prisma.raw(sqlchk));
            if (nRetChk.length > 0) {
                var tObj = {};
                tObj.CODE = 'ERROR:등록된 이름이 있습니다';
                tObj.id = 0;
                retArray.push(tObj);
                return retArray;
            }

            let tempCD = tObjEDT_KCD_HSCODE.HS_CD.replace('.', '').replace(
                '/-/g',
                '',
            );
            var sqlchk1 = `
                select
                    CHK_HS_CD
                from
                    kcd_hscode
                where
                    chk_hs_cd = '${tempCD}'
            `;
            var nRetChk1 = await prisma.$queryRaw(Prisma.raw(sqlchk1));
            if (nRetChk1.length > 0) {
                var tObj = {};
                tObj.CODE = 'ERROR:등록된 HS_CODE가 있습니다 ';
                tObj.id = 0;
                retArray.push(tObj);
                return retArray;
            }

            try {
                let retInsert = await prisma.$queryRaw(
                    Prisma.raw(
                        `
                            INSERT INTO
                                KCD_HSCODE (HS_NO, HS_CD, HS_NAME, CHK_HS_CD)
                            VALUES
                                (
                                    '${tObjEDT_KCD_HSCODE.HS_NO}',
                                    '${tObjEDT_KCD_HSCODE.HS_CD}',
                                    '${tObjEDT_KCD_HSCODE.HS_NAME}',
                                    '${tempCD}'
                                )
                        `,
                    ),
                );
                var tObj = {};
                tObj.CODE = tObjEDT_KCD_HSCODE.HS_NO;
                tObj.id = 0;
                retArray.push(tObj);
            } catch (e) {
                var tObj = {};
                tObj.CODE = `ERROR:SQL(${e.message})`;
                tObj.id = retInsert.id;
                retArray.push(tObj);
            }
            return retArray;
        },

        mgrUpdate_S0105_KCD_HSCODE_EDT_KCD_HSCODE: async (_, args) => {
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
                var tData = { ...args.datas[tIdx] };
                var tData1 = {};
                tData1.HS_NO = tData.HS_NO;
                tData1.HS_CODE = tData.HS_CODE;
                tData1.HS_NAME = tData.HS_NAME;

                // const retUpdate = await prisma.KCD_HSCODE.update({
                //    where: { id: tData.id, },
                //    data: tData1,
                // });

                const retUpdate = await prisma.$queryRaw(
                    Prisma.raw(
                        `
                            UPDATE KCD_HSCODE
                            SET
                                HS_NAME = '${tData1.HS_NAME}',
                                HS_NO = '${tData1.HS_NO}'
                            WHERE
                                id = '${tData.id}'
                        `,
                    ),
                );

                var tObj = {};
                tObj.CODE = retUpdate.HS_NO;
                tObj.id = retUpdate.id;
                retArray.push(tObj);
            }
            return retArray;
        },

        mgrDelete_S0105_KCD_HSCODE_EDT_KCD_HSCODE: async (_, args) => {
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

            var retArray: any[] = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var tData = args.datas[tIdx];
                var tObjEDT_KCD_HSCODE = { ...tData };

                // const retDelete = await prisma.KCD_HSCODE.delete({
                //    where: { id: tObjEDT_KCD_HSCODE.id, },
                // });

                const retDelete = await prisma.$queryRaw(
                    Prisma.raw(
                        `
                            DELETE FROM KCD_HSCODE
                            WHERE
                                id = ${tObjEDT_KCD_HSCODE.id}
                        `,
                    ),
                );
                var tObj = {
                    CODE: retDelete.CODE,
                    id: retDelete.id,
                };

                retArray.push(tObj);
            }
            return retArray;
        },
    },
};

export default moduleMutation_S0105_KCD_HSCODE_EDT_KCD_HSCODE;
