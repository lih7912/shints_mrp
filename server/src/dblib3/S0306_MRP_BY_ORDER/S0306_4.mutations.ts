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
const moduleMutation_S0306_MRP_BY_ORDER_EDT_KSV_PROD_MEM = {
    Mutation: {
        mgrInsert_S0306_MRP_BY_ORDER_EDT_KSV_PROD_MEM: async (
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
            var tProdCd = args.datas[0].PROD_CD;

            var tSQLs = '';
            var tTrans = [];

            var tInsertObj = args.datas.forEach((col, i) => {
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
                delete tObj.STATUS_CD_MATL;
                delete tObj.STATUS_CD_VENDOR;

                tObj.STD_NET = parseFloat(tObj.STD_NET);
                tObj.STD_LOSS = parseFloat(tObj.STD_LOSS);
                tObj.STD_GROSS = parseFloat(tObj.STD_GROSS);
                tObj.NET = parseFloat(tObj.NET);
                tObj.LOSS = parseFloat(tObj.LOSS);
                tObj.GROSS = parseFloat(tObj.GROSS);
                tObj.SEQ = parseInt(tObj.SEQ);

                if (tObj.id > 0) {
                    var tSQL = `
                        update ksv_order_mrp
                        set
                            use_size = '${tObj.USE_SIZE}',
                            remark = '${tObj.REMARK}',
                            country = '${tObj.COUNTRY}',
                            std_net = ${tObj.STD_NET},
                            std_loss = ${tObj.STD_LOSS},
                            std_gross = ${tObj.STD_GROSS},
                            net = ${tObj.NET},
                            loss = ${tObj.LOSS},
                            gross = ${tObj.GROSS},
                            version = '${tObj.VERSION}'
                        where
                            order_cd = '${args.datas1.ORDER_CD}'
                            and prod_cd = '${args.datas1.PROD_CD}'
                            and order_mrp_seq = ${args.datas1.ORDER_MRP_SEQ}
                            and matl_cd = '${args.datas1.MATL_CD}'
                            and use_size like '${tObj.USE_SIZE}' escape '['
                            and remark like '${tObj.REMARK}' escape '['
                    `;
                    const nRet0 = prisma.$queryRaw(Prisma.raw(tSQL));
                    tTrans.push(nRet0);
                    // tSQLs += tSQL;
                } else {
                    var tSQL = `
                        INSERT INTO
                            KSV_ORDER_MRP (
                                ORDER_CD,
                                PROD_CD,
                                ORDER_MRP_SEQ,
                                MATL_CD,
                                STD_NET,
                                STD_LOSS,
                                STD_GROSS,
                                NET,
                                LOSS,
                                GROSS,
                                version,
                                REMARK,
                                USE_SIZE,
                                SEQ,
                                COUNTRY,
                                REG_USER,
                                REG_DATETIME
                            )
                        values
                            (
                                '${args.datas1.ORDER_CD}',
                                '${args.datas1.PROD_CD}',
                                ${args.datas1.ORDER_MRP_SEQ},
                                '${tObj.MATL_CD}',
                                ${tObj.STD_NET},
                                ${tObj.STD_LOSS},
                                ${tObj.STD_GROSS},
                                ${tObj.NET},
                                ${tObj.LOSS},
                                ${tObj.GROSS},
                                '${tObj.VERSION}',
                                '${tObj.REMARK}',
                                '${tObj.USE_SIZE}',
                                '${tObj.SEQ}',
                                '${tObj.COUNTRY}',
                                '${tUserInfo.USER_ID}',
                                '${tRetDate}'
                            );
                    `;
                    const nRet0 = prisma.$queryRaw(Prisma.raw(tSQL));
                    tTrans.push(nRet0);
                    // tSQLs += tSQL;
                }
            });

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tTrans);
                delete global.currentTransactionInfo;

                var tRetArray = [];
                var tObj = {};
                tObj.CODE = args.datas1.ORDER_CD;
                tObj.id = nRet1.count;
                tRetArray.push(tObj);
            } catch (e) {
                console.log(e);
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR';
                tObj.id = 0;
                tRetArray.push(tObj);
            }
            return tRetArray;
        },

        mgrUpdate_S0306_MRP_BY_ORDER_EDT_KSV_PROD_MEM: async (
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
            var tORDER_CD = args.datas1.ORDER_CD;
            var tPROD_CD = args.datas1.PROD_CD;
            var tORDER_MRP_SEQ = args.datas1.ORDER_MRP_SEQ;

            var tSQLArray = [];

            var tDeleteSQL = `
                delete from ksv_order_mrp
                where
                    prod_cd = '${tProdCd}'
                    and order_cd = '${tORDER_CD}'
                    and order_mrp_seq = ${tORDER_MRP_SEQ}
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tDeleteSQL));
            tSQLArray.push(tSQL99_1);

            var tInsertObj = args.datas.forEach((col, i) => {
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
                delete tObj.STATUS_CD_MATL;
                delete tObj.STATUS_CD_VENDOR;

                tObj.STD_NET = parseFloat(tObj.STD_NET);
                tObj.STD_LOSS = parseFloat(tObj.STD_LOSS);
                tObj.STD_GROSS = parseFloat(tObj.STD_GROSS);
                tObj.NET = parseFloat(tObj.NET);
                tObj.LOSS = parseFloat(tObj.LOSS);
                tObj.GROSS = parseFloat(tObj.GROSS);
                tObj.SEQ = parseInt(tObj.SEQ);

                var tInsertSql = AFLib.createTableSql('KSV_ORDER_MRP', tObj);
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tInsertSql));
                tSQLArray.push(tSQL99_1);
            });

            /*
      var tUpdateSQL = '';
      var tUpdateObj = args.datas.forEach((col, i) => {
          var tSQL = `
              update kcd_matl_mst
              set
                  add_loss = ${col.ADD_LOSS}
              where
                  matl_cd = '${col.MATL_CD}';
          `;
          tUpdateSQL += tSQL;
      });

*/
            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'SUCCEED:STOCK_IN:' + args.datas.length;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:STOCK_IN';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },

        mgrDelete_S0306_MRP_BY_ORDER_EDT_KSV_PROD_MEM: async (
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

export default moduleMutation_S0306_MRP_BY_ORDER_EDT_KSV_PROD_MEM;
