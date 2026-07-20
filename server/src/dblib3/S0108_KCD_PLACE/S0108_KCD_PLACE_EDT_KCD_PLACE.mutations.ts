// MGR_@@TNAME@@.mutations.js

import * as fs from 'fs';
import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기

/*
                PLACE_CD:String 
                PLACE_NAME:String 
                USER_NAME:String 
                TEL_NO:String 
                EMAIL:String 

*/

// export default로 Mutation 내용 내보내기
const moduleMutation_S0108_KCD_PLACE_EDT_KCD_PLACE = {
    Mutation: {
        mgrInsert_S0108_KCD_PLACE_EDT_KCD_PLACE: async (
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

            var sqlStr = `
                SELECT
                    max(PLACE_CD) as max_id
                from
                    KCD_PLACE
                where
                    PLACE_CD like 'T%'
            `;
            let tRetArray = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tMax0 = tRetArray[0];
            let tMax = parseInt(tMax0.max_id.substring(1)) + 1;
            let tMaxStr = '';

            if (tMax < 100) tMaxStr = '0' + tMax;
            else tMaxStr = tMax;

            let tNewPlaceCd = 'T' + tMaxStr;

            var retArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var tData = args.datas[tIdx];
                var tObjEDT_KCD_PLACE = { ...tData };
                delete tObjEDT_KCD_PLACE.id;
                delete tObjEDT_KCD_PLACE.STATUS_NAME;
                delete tObjEDT_KCD_PLACE.PLACE_TYPE_NAME;
                delete tObjEDT_KCD_PLACE.DELIVERY_TYPE_NAME;

                tObjEDT_KCD_PLACE.PLACE_CD = tNewPlaceCd;
                tObjEDT_KCD_PLACE.STATUS_CD = '0';
                tObjEDT_KCD_PLACE.REG_USER = tUserInfo.USER_ID;
                tObjEDT_KCD_PLACE.REG_DATETIME = tRetDate;
                tObjEDT_KCD_PLACE.UPD_USER = tUserInfo.USER_ID;
                tObjEDT_KCD_PLACE.UPD_DATETIME = tRetDate;

                //let retInsert = await prisma.KCD_PLACE.create({data:tObjEDT_KCD_PLACE});
                var sql0 = `
                    SELECT
                        isnull(count(*), 0) as c_cnt
                    from
                        KCD_PLACE
                    where
                        PLACE_NAME = '${tObjEDT_KCD_PLACE.PLACE_NAME}'
                `;
                let tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                if (tRet0.length > 0 && tRet0[0].c_cnt > 0) {
                    var tObj = {};
                    tObj.CODE = 'ERROR:이름이 같은 Forward가 있습니다';
                    tObj.id = 0;
                    retArray.push(tObj);
                    return retArray;
                }

                //console.log(tObjEDT_KCD_PLACE)
                let retInsert = await prisma.$queryRaw(
                    Prisma.raw(
                        `
                            INSERT INTO
                                KCD_PLACE (
                                    PLACE_CD,
                                    PLACE_NAME,
                                    PLACE_TYPE,
                                    DELIVERY_TYPE,
                                    USER_NAME,
                                    TEL_NO,
                                    STATUS_CD,
                                    REG_USER,
                                    REG_DATETIME,
                                    UPD_USER,
                                    UPD_DATETIME,
                                    EMAIL
                                )
                            VALUES
                                (
                                    '${tObjEDT_KCD_PLACE.PLACE_CD}',
                                    '${tObjEDT_KCD_PLACE.PLACE_NAME}',
                                    '${tObjEDT_KCD_PLACE.PLACE_TYPE}',
                                    '${tObjEDT_KCD_PLACE.DELIVERY_TYPE}',
                                    '${tObjEDT_KCD_PLACE.USER_NAME}',
                                    '${tObjEDT_KCD_PLACE.TEL_NO}',
                                    '${tObjEDT_KCD_PLACE.STATUS_CD}',
                                    '${tObjEDT_KCD_PLACE.REG_USER}',
                                    '${tObjEDT_KCD_PLACE.REG_DATETIME}',
                                    '${tObjEDT_KCD_PLACE.UPD_USER}',
                                    '${tObjEDT_KCD_PLACE.UPD_DATETIME}',
                                    '${tObjEDT_KCD_PLACE.EMAIL}'
                                )
                        `,
                    ),
                );
                if (typeof retInsert.id === 'undefined') {
                    var tObj = {};
                    tObj.CODE = tObjEDT_KCD_PLACE.PLACE_CD;
                    tObj.id = 0;
                    retArray.push(tObj);
                } else {
                    var tObj = {};
                    tObj.CODE = tObjEDT_KCD_PLACE.PLACE_CD;
                    tObj.id = retInsert.id;
                    retArray.push(tObj);
                }
            }
            return retArray;
        },

        mgrUpdate_S0108_KCD_PLACE_EDT_KCD_PLACE: async (
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
            var tUserInfo: any = AFLib.getUserInfo(contextValue);

            var retArray: any[] = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var tData = args.datas[tIdx];
                var tObjEDT_KCD_PLACE = { ...tData };

                delete tObjEDT_KCD_PLACE.STATUS_NAME;
                delete tObjEDT_KCD_PLACE.PLACE_TYPE_NAME;
                delete tObjEDT_KCD_PLACE.DELIVERY_TYPE_NAME;

                tObjEDT_KCD_PLACE.UPD_USER = 'test';
                tObjEDT_KCD_PLACE.UPD_DATETIME = tRetDate;

                // const retUpdate = await prisma.KCD_PLACE.update({
                //    where: { id: tObjEDT_KCD_PLACE.id, },
                //    data: tObjEDT_KCD_PLACE,
                // });
                console.log('---------------------------');
                console.log(tObjEDT_KCD_PLACE.EMAIL);
                const retUpdate = await prisma.$queryRaw(
                    Prisma.raw(
                        `
                            UPDATE KCD_PLACE
                            SET
                                PLACE_CD = '${tObjEDT_KCD_PLACE.PLACE_CD}',
                                PLACE_NAME = '${tObjEDT_KCD_PLACE.PLACE_NAME}',
                                USER_NAME = '${tObjEDT_KCD_PLACE.USER_NAME}',
                                TEL_NO = '${tObjEDT_KCD_PLACE.TEL_NO}',
                                EMAIL = '${tObjEDT_KCD_PLACE.EMAIL}',
                                STATUS_CD = '${tObjEDT_KCD_PLACE.STATUS_CD}',
                                PLACE_TYPE = '${tObjEDT_KCD_PLACE.PLACE_TYPE}',
                                UPD_USER = '${tUserInfo.USER_ID}',
                                UPD_DATETIME = '${tObjEDT_KCD_PLACE.UPD_DATETIME}'
                            WHERE
                                id = '${tObjEDT_KCD_PLACE.id}'
                        `,
                    ),
                );

                var tObj = {
                    CODE: tObjEDT_KCD_PLACE.PLACE_CD,
                    id: tObjEDT_KCD_PLACE.id,
                };

                // tObj.CODE = retUpdate.FACTORY_CD;
                // tObj.id = retUpdate.id;
                retArray.push(tObj);
            }
            return retArray;
        },

        mgrDelete_S0108_KCD_PLACE_EDT_KCD_PLACE: async (_, args) => {
            //
            var tDate = new Date();
            var mm = tDate.getMonth() + 1;
            var mm_str = '';
            if (mm > 9) mm_str = mm.toString();
            else mm_str = '0' + mm;

            var dd = tDate.getDate();
            var dd_str = '';
            if (dd > 9) dd_str = dd.toString();
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
                var tObjEDT_KCD_PLACE = { ...tData };

                const retUpdate = await prisma.$queryRaw(
                    Prisma.raw(
                        `
                            delete from KCD_PLACE
                            where
                                PLACE_CD = '${tObjEDT_KCD_PLACE.PLACE_CD}'
                        `,
                    ),
                );

                var tObj = {
                    CODE: tObjEDT_KCD_PLACE.PLACE_CD,
                    id: tObjEDT_KCD_PLACE.id,
                };
                retArray.push(tObj);

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

export default moduleMutation_S0108_KCD_PLACE_EDT_KCD_PLACE;
