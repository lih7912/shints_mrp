// MGR_@@TNAME@@.mutations.js

import * as fs from 'fs';
import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기

/*
                NAT_CD:String 
                NAT_NAME:String 

*/

// export default로 Mutation 내용 내보내기
const moduleMutation_S0104_KCD_NATION_EDT_KCD_NATION = {
    Mutation: {
        mgrInsert_S0104_KCD_NATION_EDT_KCD_NATION: async (
            _,
            args,
            contextValue,
        ) => {
            const tRetDate = getTime();
            var tUserInfo = AFLib.getUserInfo(contextValue);
            var retArray = [];

            var tData = args.datas[0];
            var tObjEDT_KCD_NATION = { ...tData };
            tObjEDT_KCD_NATION.STATUS_CD = '0';
            tObjEDT_KCD_NATION.REG_USER = tUserInfo.USER_ID;
            tObjEDT_KCD_NATION.REG_DATETIME = tRetDate;

            delete tObjEDT_KCD_NATION.id;

            try {
                let retInsert = await prisma.$queryRaw(
                    Prisma.raw(`
                        INSERT INTO
                            KCD_NATION (
                                NAT_CD,
                                NAT_NAME,
                                STATUS_CD,
                                REG_USER,
                                REG_DATETIME
                            )
                        VALUES
                            (
                                '${tData.NAT_CD}',
                                '${tData.NAT_NAME}',
                                ${tObjEDT_KCD_NATION.STATUS_CD},
                                '${tObjEDT_KCD_NATION.REG_USER}',
                                ${(tObjEDT_KCD_NATION.REG_DATETIME = tRetDate)}
                            )
                    `),
                );

                let reOrderList = await prisma.$queryRaw(
                    Prisma.raw(`
                        SELECT
                            NAT_CD
                        FROM
                            KCD_NATION
                        ORDER BY
                            NAT_CD
                    `),
                );

                let seq = 1;

                for (let nat of reOrderList) {
                    await prisma.$queryRaw(
                        Prisma.raw(`
                            UPDATE KCD_NATION
                            SET
                                NAT_IDX = '${seq++}'
                            WHERE
                                NAT_CD = '${nat.NAT_CD}'
                        `),
                    );
                }

                if (typeof retInsert.id === 'undefined') {
                    var tObj = {};
                    tObj.CODE = 'ERROR';
                    tObj.id = 0;
                    retArray.push(tObj);
                } else {
                    var tObj = {};
                    tObj.CODE = retInsert.NAT_CD;
                    tObj.id = retInsert.id;
                    retArray.push(tObj);
                }
            } catch (e) {
                console.log(e);
                return e;
            }
            return retArray;
        },

        mgrUpdate_S0104_KCD_NATION_EDT_KCD_NATION: async (
            _,
            args,
            contextValue,
        ) => {
            var retArray = [];
            var tData0 = { ...args.datas[0] };
            var tData = {};
            tData.NAT_CD = tData0.NAT_CD;
            tData.NAT_NAME = tData0.NAT_NAME;

            try {
                const retUpdate = await prisma.$queryRaw(
                    Prisma.raw(`
                        UPDATE KCD_NATION
                        SET
                            NAT_CD = '${tData0.NAT_CD}',
                            NAT_NAME = '${tData.NAT_NAME}'
                        WHERE
                            ID = ${tData0.id}
                    `),
                );

                var tObj = {};
                tObj.CODE = tData0.NAT_CD;
                //tObj.id = retUpdate.id;
                retArray.push(tObj);

                return retArray;
            } catch (e) {
                console.log(e);
                return e;
            }
        },

        mgrDelete_S0104_KCD_NATION_EDT_KCD_NATION: async (_, args) => {
            var retArray = [];
            var tIdx = 0;

            var tData = args.datas[tIdx];
            var tObjEDT_KCD_NATION = { ...tData };

            try {
                const retDelete = await prisma.$queryRaw(
                    Prisma.raw(`
                        DELETE FROM KCD_NATION
                        WHERE
                            id = ${tObjEDT_KCD_NATION.id}
                    `),
                );

                var tObj = {};
                tObj.CODE = tObjEDT_KCD_NATION.id;
                retArray.push(tObj);

                return retArray;
            } catch (e) {
                console.log(e);
                return e;
            }
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

export default moduleMutation_S0104_KCD_NATION_EDT_KCD_NATION;
