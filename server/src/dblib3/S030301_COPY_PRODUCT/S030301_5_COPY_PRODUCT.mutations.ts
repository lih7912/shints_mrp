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
const moduleMutation_S030301_COPY_PRODUCT_EDT_KSV_PROD_MEM = {
    Mutation: {
        mgrInsert_S030301_ADD_PROD: async (_, args, contextValue) => {
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
            var tYY = yyyy.toString().substring(2, 4);

            // let tPO = "POA2022S672";
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput1 = { ...args.datas };
            var tInput2 = [...args.datas1];

            var tIdx = 0;
            for (tIdx = 0; tIdx < tInput2.length; tIdx++) {
                var tSQLArray = [];
                var tOne = { ...tInput2[tIdx] };

                let tSql1 = `
                    select
                        *
                    from
                        ksv_prod_mst
                    where
                        style_cd = '${tOne.STYLE_CD}'
                        and prod_cd = '${tOne.PROD_CD}'
                `;
                const tRet1 = await prisma.$queryRaw(Prisma.raw(tSql1));
                var tOne1 = { ...tRet1[0] };

                let tSql2 = `
                    select
                        *
                    from
                        ksv_prod_mem
                    where
                        prod_cd = '${tOne.PROD_CD}'
                `;
                const tRet2 = await prisma.$queryRaw(Prisma.raw(tSql2));

                let tSql3 = `
                    select
                        isnull(max(seq), 0) as maxcnt
                    from
                        ksv_prod_mst
                    where
                        prod_cd like '${tInput1.BUYER_CD}${tYY}-P%'
                `;
                const tRet3 = await prisma.$queryRaw(Prisma.raw(tSql3));

                var tMaxCnt = String(tRet3[0].maxcnt + 1);
                var tZero = '0000';
                var tMaxStr = tZero.substring(0, 4 - tMaxCnt.length) + tMaxCnt;
                var tNewProdCd = `${tInput1.BUYER_CD}${tYY}-P${tMaxStr}`;

                delete tOne1.id;
                tOne1.PROD_CD = tNewProdCd;
                tOne1.STYLE_CD = tInput1.STYLE_CD;
                tOne1.SEQ = tMaxCnt;
                tOne1.YY = yyyy;
                tOne1.REG_USER = tUserInfo.USER_ID;
                tOne1.REG_DATETIME = tRetDate;
                tOne1.UPD_USER = tUserInfo.USER_ID;
                tOne1.UPD_DATETIME = tRetDate;

                let tSQL99 = AFLib.createTableSql('KSV_PROD_MST', tOne1);
                const tRet99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tRet99_1);

                var tIdx1 = 0;
                for (tIdx1 = 0; tIdx1 < tRet2.length; tIdx1++) {
                    var tOne2 = { ...tRet2[tIdx1] };

                    delete tOne2.id;
                    tOne2.PROD_CD = tNewProdCd;

                    let tSQL99 = AFLib.createTableSql('KSV_PROD_MEM', tOne2);
                    const tRet99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tRet99_1);
                }

                try {
                    global.currentTransactionInfo = {
                        contextValue: contextValue,
                        functionName: AFLib.getFunctionName(),
                    };
                    await prisma.$transaction(tSQLArray);
                    delete global.currentTransactionInfo;
                } catch (e) {
                    var retArray = [];
                    var tObj = {};
                    tObj.CODE = 'ERROR:' + e.message;
                    tObj.id = 0;
                    retArray.push(tObj);
                    return retArray;
                }
            }

            var retArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCESS:COPY PROD';
            tObj.id = 0;
            retArray.push(tObj);
            return retArray;
        },

        mgrInsert_S030301_DEL_PROD: async (_, args, contextValue) => {
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
            var tYY = yyyy.toString().substring(2, 4);

            // let tPO = "POA2022S672";
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput1 = { ...args.datas };
            var tInput2 = [...args.datas1];

            var tIdx = 0;
            for (tIdx = 0; tIdx < tInput2.length; tIdx++) {
                var tSQLArray = [];
                var tOne = { ...tInput2[tIdx] };

                let tSql0 = `
                    select
                        isnull(count(order_cd), 0) as cnt
                    from
                        ksv_order_mem
                    where
                        prod_cd = '${tOne.PROD_CD}'
                `;
                const tRet0 = await prisma.$queryRaw(Prisma.raw(tSql0));
                if (tRet0.length > 0 && tRet0[0].cnt > 0) {
                    var retArray = [];
                    var tObj = {};
                    tObj.CODE =
                        'ERROR:Can not Delete Prod: Already Use in Order';
                    tObj.id = 0;
                    retArray.push(tObj);
                    return retArray;
                }

                let tSql2 = `
                    delete from ksv_prod_mst
                    where
                        prod_cd = '${tOne.PROD_CD}'
                `;
                const tRet2 = prisma.$queryRaw(Prisma.raw(tSql2));
                tSQLArray.push(tRet2);

                let tSql2 = `
                    delete from ksv_prod_mem
                    where
                        prod_cd = '${tOne.PROD_CD}'
                `;
                const tRet2 = prisma.$queryRaw(Prisma.raw(tSql2));
                tSQLArray.push(tRet2);

                try {
                    global.currentTransactionInfo = {
                        contextValue: contextValue,
                        functionName: AFLib.getFunctionName(),
                    };
                    await prisma.$transaction(tSQLArray);
                    delete global.currentTransactionInfo;
                } catch (e) {
                    var retArray = [];
                    var tObj = {};
                    tObj.CODE = 'ERROR:' + e.message;
                    tObj.id = 0;
                    retArray.push(tObj);
                    return retArray;
                }
            }

            var retArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCESS:COPY PROD';
            tObj.id = 0;
            retArray.push(tObj);
            return retArray;
        },
    },
};

export default moduleMutation_S030301_COPY_PRODUCT_EDT_KSV_PROD_MEM;
