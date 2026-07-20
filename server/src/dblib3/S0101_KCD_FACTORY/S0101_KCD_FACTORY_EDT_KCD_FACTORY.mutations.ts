// MGR_@@TNAME@@.mutations.js

import * as fs from 'fs';
import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기

/*
                FACTORY_CD:String 
                FACTORY_NAME:String 
                USER_NAME:String 
                EMAIL:String 
                TEL_NO:String 
                FAX_NO:String 
                ZIP_NO:String 
                ADDR1:String 
                ADDR2:String 
                PORT:String 
                AIRPORT:String 
                BANK_CD:String 
                BANK_NAME:String 
                ACCOUNT_NO:String 
                ACCOUNT_NAME:String 

*/

// export default로 Mutation 내용 내보내기
const moduleMutation_S0101_KCD_FACTORY_EDT_KCD_FACTORY = {
    Mutation: {
        mgrInsert_S0101_KCD_FACTORY_EDT_KCD_FACTORY: async (
            _,
            args,
            contextValue,
        ) => {
            //

            var tRetDate = getTime();

            // let tPO = "POA2022S672";

            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tSQL =
                'select (max(substring(FACTORY_CD, 3, 3)) + 1) as max1 from KCD_FACTORY';
            var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
            var tRet1 = nRet0[0];
            var tMaxSeq = tRet1.max1;

            var retArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var tData = args.datas[tIdx];
                var tObjEDT_KCD_FACTORY = { ...tData };

                delete tObjEDT_KCD_FACTORY.id;
                delete tObjEDT_KCD_FACTORY.BANK_NAME;
                delete tObjEDT_KCD_FACTORY.ACCOUNT_NO;
                delete tObjEDT_KCD_FACTORY.ACCOUNT_NAME;

                tObjEDT_KCD_FACTORY.FACTORY_CD = 'FC' + tMaxSeq;
                tObjEDT_KCD_FACTORY.REG_USER = tUserInfo.USER_ID;
                tObjEDT_KCD_FACTORY.REG_DATETIME = tRetDate;
                tObjEDT_KCD_FACTORY.UPD_USER = tUserInfo.USER_ID;
                tObjEDT_KCD_FACTORY.UPD_DATETIME = tRetDate;
                tObjEDT_KCD_FACTORY.STATUS_CD = '0';
                tObjEDT_KCD_FACTORY.tag_po = 'P';
                tObjEDT_KCD_FACTORY.tag_order = '-';

                // let retInsert = await prisma.KCD_FACTORY.create({data:tObjEDT_KCD_FACTORY});
            }

            try {
                let sqlStr = `
                    INSERT INTO
                        KCD_FACTORY (
                            FACTORY_CD,
                            FACTORY_NAME,
                            USER_NAME,
                            EMAIL,
                            TEL_NO,
                            FAX_NO,
                            ZIP_NO,
                            ADDR1,
                            ADDR2,
                            PORT,
                            AIRPORT,
                            NAT_CD,
                            BANK_CD,
                            STATUS_CD,
                            REG_USER,
                            REG_DATETIME,
                            UPD_USER,
                            UPD_DATETIME,
                            tag_po,
                            tag_order
                        )
                    VALUES
                        (
                            '${tObjEDT_KCD_FACTORY.FACTORY_CD}',
                            '${tObjEDT_KCD_FACTORY.FACTORY_NAME}',
                            '${tObjEDT_KCD_FACTORY.USER_NAME}',
                            '${tObjEDT_KCD_FACTORY.EMAIL}',
                            '${tObjEDT_KCD_FACTORY.TEL_NO}',
                            '${tObjEDT_KCD_FACTORY.FAX_NO}',
                            '${tObjEDT_KCD_FACTORY.ZIP_NO}',
                            '${tObjEDT_KCD_FACTORY.ADDR1}',
                            '${tObjEDT_KCD_FACTORY.ADDR2}',
                            '${tObjEDT_KCD_FACTORY.PORT}',
                            '${tObjEDT_KCD_FACTORY.AIRPORT}',
                            '${tObjEDT_KCD_FACTORY.NAT_CD}',
                            '${tObjEDT_KCD_FACTORY.BANK_CD}',
                            '${tObjEDT_KCD_FACTORY.STATUS_CD}',
                            '${tObjEDT_KCD_FACTORY.REG_USER}',
                            '${tObjEDT_KCD_FACTORY.REG_DATETIME}',
                            '${tObjEDT_KCD_FACTORY.UPD_USER}',
                            '${tObjEDT_KCD_FACTORY.UPD_DATETIME}',
                            '${tObjEDT_KCD_FACTORY.tag_po}',
                            '${tObjEDT_KCD_FACTORY.tag_order}'
                        )
                `;
                let retInsert = await prisma.$queryRaw(Prisma.raw(sqlStr));

                if (typeof retInsert.id === 'undefined') {
                    var tObj = {};
                    tObj.CODE = 'ERROR';
                    tObj.id = -1;
                    retArray.push(tObj);
                } else {
                    var tObj = {};
                    tObj.CODE = retInsert.FACTORY_CD;
                    tObj.id = retInsert.id;
                    retArray.push(tObj);
                }
                return retArray;
            } catch (e) {
                console.log(e);
                return e;
            }
        },

        mgrUpdate_S0101_KCD_FACTORY_EDT_KCD_FACTORY: async (
            _,
            args,
            contextValue,
        ) => {
            //
            var tRetDate = getTime();

            // let tPO = "POA2022S672";

            var tUserInfo = AFLib.getUserInfo(contextValue);

            var retArray: any[] = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var tData = args.datas[tIdx];
                var tObjEDT_KCD_FACTORY = { ...tData };
                var tId = tObjEDT_KCD_FACTORY.id;

                delete tObjEDT_KCD_FACTORY.id;
                delete tObjEDT_KCD_FACTORY.BANK_NAME;
                delete tObjEDT_KCD_FACTORY.ACCOUNT_NO;
                delete tObjEDT_KCD_FACTORY.ACCOUNT_NAME;

                tObjEDT_KCD_FACTORY.UPD_USER = tUserInfo.USER_ID;
                tObjEDT_KCD_FACTORY.UPD_DATETIME = tRetDate;

                console.log(tObjEDT_KCD_FACTORY);

                try {
                    let sqlStr = `
                        update KCD_FACTORY
                        SET
                            FACTORY_NAME = '${tObjEDT_KCD_FACTORY.FACTORY_NAME}',
                            USER_NAME = '${tObjEDT_KCD_FACTORY.USER_NAME}',
                            EMAIL = '${tObjEDT_KCD_FACTORY.EMAIL}',
                            TEL_NO = '${tObjEDT_KCD_FACTORY.TEL_NO}',
                            FAX_NO = '${tObjEDT_KCD_FACTORY.FAX_NO}',
                            ZIP_NO = '${tObjEDT_KCD_FACTORY.ZIP_NO}',
                            NAT_CD = '${tObjEDT_KCD_FACTORY.NAT_CD}',
                            ADDR1 = '${tObjEDT_KCD_FACTORY.ADDR1}',
                            ADDR2 = '${tObjEDT_KCD_FACTORY.ADDR2}',
                            PORT = '${tObjEDT_KCD_FACTORY.PORT}',
                            AIRPORT = '${tObjEDT_KCD_FACTORY.AIRPORT}',
                            BANK_CD = '${tObjEDT_KCD_FACTORY.BANK_CD}',
                            STATUS_CD = '${tObjEDT_KCD_FACTORY.STATUS_CD}',
                            UPD_USER = '${tObjEDT_KCD_FACTORY.UPD_USER}',
                            UPD_DATETIME = '${tObjEDT_KCD_FACTORY.UPD_DATETIME}'
                        WHERE
                            factory_cd = '${tObjEDT_KCD_FACTORY.FACTORY_CD}'
                    `;

                    const retUpdate = await prisma.$queryRaw(
                        Prisma.raw(sqlStr),
                    );

                    var tObj = {
                        CODE: tObjEDT_KCD_FACTORY.FACTORY_CD,
                        id: tId,
                    };

                    retArray.push(tObj);
                    return retArray;
                } catch (e) {
                    console.log(e);
                    return e;
                }

                // const retUpdate = await prisma.KCD_FACTORY.update({
                //   where: { id: tId, },
                //   data: tObjEDT_KCD_FACTORY,
                // });
            }
        },

        mgrDelete_S0101_KCD_FACTORY_EDT_KCD_FACTORY: async (_, args) => {
            //
            var tRetDate = getTime();

            // let tPO = "POA2022S672";
            /*
            var tSQL = `
                select
                    (max(substring(FACTORY_CD, 2, 3)) + 1) as max1
                from
                    KCD_FACTORY
            `;
            var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
            var tMaxSeq = nRet0[0];
      */

            var retArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var tData = args.datas[tIdx];
                var tObjEDT_KCD_FACTORY = { ...tData };

                // const retDelete = await prisma.KCD_FACTORY.delete({
                //   where: { id: tObjEDT_KCD_FACTORY.id, },
                // });

                let sqlStr = `
                    DELETE FROM KCD_FACTORY
                    WHERE
                        factory_cd = '${tObjEDT_KCD_FACTORY.FACTORY_CD}'
                `;

                const retDelete = await prisma.$queryRaw(Prisma.raw(sqlStr));

                var tObj = {};
                tObj.CODE = tObjEDT_KCD_FACTORY.FACTORY_CD;
                tObj.id = tObjEDT_KCD_FACTORY.id;
                retArray.push(tObj);
            }
            return retArray;
        },
    },
};

const getTime = () => {
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

    return tRetDate;
};
export default moduleMutation_S0101_KCD_FACTORY_EDT_KCD_FACTORY;
