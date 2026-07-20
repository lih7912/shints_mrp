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
const moduleMutation_S030303_MRP_BY_SEARCH_EDT_KSV_PROD_MEM = {
    Mutation: {
        mgrInsert_S030303_MRP_BY_SEARCH_EDT_KSV_PROD_MEM: async (
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
            var tSQLArray = [];

            var tProdCd = args.datas[0].PROD_CD;
            var tDeleteSQL = `
                delete from ksv_prod_mem
                where
                    prod_cd = '${tProdCd}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tDeleteSQL));
            tSQLArray.push(tSQL99_1);

            args.datas.forEach((col, i) => {
                var tObj = { ...col };
                delete tObj.MATL_TYPE2;
                delete tObj.MATL_NAME;
                delete tObj.COLOR;
                delete tObj.SPEC;
                delete tObj.MATL_PRICE;
                delete tObj.CURR_CD;
                delete tObj.UNIT;
                delete tObj.ADD_LOSS;
                delete tObj.VENDOR_NAME;
                delete tObj.VENDOR_STATUS;
                delete tObj.VENDOR_CD;

                tObj.STD_NET = parseFloat(tObj.STD_NET);
                tObj.STD_LOSS = parseFloat(tObj.STD_LOSS);
                tObj.STD_GROSS = parseFloat(tObj.STD_GROSS);
                tObj.NET = parseFloat(tObj.NET);
                tObj.LOSS = parseFloat(tObj.LOSS);
                tObj.GROSS = parseFloat(tObj.GROSS);
                tObj.SEQ = parseInt(tObj.SEQ);

                let tSQL99 = AFLib.createTableSql('KSV_PROD_MEM', tObj);
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            });

            var tUpdateSQL = '';
            var tUpdateObj = args.datas.forEach((col, i) => {
                var tSQL = `
                    update kcd_matl_mst
                    set
                        add_loss = ${col.ADD_LOSS}
                    where
                        matl_cd = '${col.MATL_CD}';
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL));
                // tSQLArray.push(tSQL99_1);
            });

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
                var retArray = [];
                var tObj = {};
                tObj.CODE = tProdCd;
                tObj.id = 0;
                retArray.push(tObj);
                return retArray;
            } catch (e) {
                var retArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR';
                tObj.id = 0;
                retArray.push(tObj);
                return retArray;
            }
        },

        mgrUpdate_S030303_MRP_BY_SEARCH_EDT_KSV_PROD_MEM: async (_, args) => {
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
                var tObjEDT_KSV_PROD_MEM = { ...tData };

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

        mgrDelete_S030303_MRP_BY_SEARCH_EDT_KSV_PROD_MEM: async (_, args) => {
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
                var tObjEDT_KSV_PROD_MEM = { ...tData };

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

export default moduleMutation_S030303_MRP_BY_SEARCH_EDT_KSV_PROD_MEM;
