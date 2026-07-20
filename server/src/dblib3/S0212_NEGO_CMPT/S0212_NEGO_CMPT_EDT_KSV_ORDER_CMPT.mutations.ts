// MGR_@@TNAME@@.mutations.js

import * as fs from 'fs';
import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기

/*
                PO_CD: String 
                ORDER_CD: String 
                STYLE_NAME: String 
                STYLE_CD: String 
                DUE_DATE: String 
                TOT_CNT: String 
                LOC: String 
                CMPT: String 
                SCREEN_PRINT: String 
                HEAT_SILICON: String 
                EMBROIDERY: String 
                TPR: String 
                WELDING: String 
                QUILTING: String 
                DIGITAL_PRINT: String 
                LABEL_PRINT: String 
                LINE_CHARGE: String 
                TOTAL_COST: String 
                FC_NEGO_TYPE_NAME: String 
                FC_NEGO_TYPE: String 
                REMARK: String 

*/

// export default로 Mutation 내용 내보내기
const moduleMutation_S0212_NEGO_CMPT_EDT_KSV_ORDER_CMPT = {
    Mutation: {
        mgrInsert_S0212_NEGO_PRESENT: async (_, args, contextValue) => {
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
            var tRetArray = [];

            var tInputs = [...args.datas];

            var tOpMode = tInputs[0].OP_MODE;

            var tFlag = 0;
            tInputs.forEach((col, i) => {
                if (tOpMode === 'PRESENT')
                    if (col.NEGO_TYPE === '1' || col.NEGO_TYPE === '3')
                        tFlag = 1;
                if (tOpMode === 'REPRESENT')
                    if (col.NEGO_TYPE === '0' || col.NEGO_TYPE === '1')
                        tFlag = 2;
                if (parseFloat(col.CMPT) <= 0) tFlag = 3;
            });

            if (tFlag === 1) {
                var retArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Already ShinTs Accept or FAC present.';
                tObj.id = 0;
                retArray.push(tObj);
                return retArray;
            }
            if (tFlag === 2) {
                var retArray = [];
                var tObj = {};
                tObj.CODE =
                    'ERROR:FAC Represent can do present / reject status.';
                tObj.id = 0;
                retArray.push(tObj);
                return retArray;
            }
            if (tFlag === 3) {
                var retArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:FAC Represent can do bvt_cmt > 0 only.';
                tObj.id = 0;
                retArray.push(tObj);
                return retArray;
            }

            var tNegoType = '3';

            var tIdx = 0;
            for (tIdx = 0; tIdx < tInputs.length; tIdx++) {
                var tData = { ...tInputs[tIdx] };

                var tNegoSeq = 1;

                var sql0 = `
                    select
                        max(nego_seq) as nego_seq
                    from
                        ksv_order_cmpt
                    where
                        order_cd = '${tData.ORDER_CD}'
                `;
                var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                if (nRet0.length > 0) {
                    tNegoSeq = nRet0[0].nego_seq + 1;
                }

                var tFactoryCd = '';
                var sql1 = `
                    select
                        isnull(factory_cd, '') as factory_cd
                    from
                        ksv_order_mst
                    where
                        order_cd = '${tData.ORDER_CD}'
                `;
                var nRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                if (nRet1.length > 0) {
                    tFactoryCd = nRet1[0].factory_cd;
                }
                if (tFactoryCd === '') {
                    var retArray = [];
                    var tObj = {};
                    tObj.CODE = `ERROR:FAC Represnet : Factory Cd Error(${tData.ORDER_CD})  `;
                    tObj.id = 0;
                    retArray.push(tObj);
                    return retArray;
                }

                var tWObj = {};
                tWObj.ORDER_CD = tData.ORDER_CD;
                tWObj.NEGO_SEQ = tNegoSeq;
                tWObj.NEGO_TYPE = tNegoType;
                tWObj.BVT_CMPT = tData.CMPT;
                tWObj.STS_CMPT = '0.0';
                if (tOpMode === 'PRESENT') tWObj.STS_CMPT = '0.0';
                else if (tOpMode === 'REPRESENT') tWObj.STS_CMPT = '0.0';
                else tWObj.STS_CMPT = tData.STS_CMPT;
                tWObj.REMARK = tData.REMARK;
                tWObj.REG_USER = tUserInfo.USER_ID;
                tWObj.REG_DATETIME = tRetDate;
                tWObj.BVT_SCREEN_PRINT = tData.SCREEN_PRINT;
                tWObj.BVT_HEAT_SILICON = tData.HEAT_SILICON;
                tWObj.BVT_EMBROIDERY = tData.EMBROIDERY;
                tWObj.BVT_TPR = tData.TPR;
                tWObj.BVT_WELDING = tData.WELDING;
                tWObj.BVT_QUILTING = tData.QUILTING;
                tWObj.BVT_DIGITAL_PRINT = tData.DIGITAL_PRINT;
                tWObj.BVT_LABEL_PRINT = tData.LABEL_PRINT;
                tWObj.BVT_LINE_CHARGE = tData.LINE_CHARGE;
                if (tFactoryCd === 'FC034') tWObj.BVT_LOCAL = tData.LOCAL;
                else tWObj.BVT_LOCAL = 0;

                let tSQL99 = AFLib.createTableSql('KSV_ORDER_CMPT', tWObj);
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    update ksv_order_mst
                    set
                        fc_nego_type = '3'
                    where
                        order_cd = '${tData.ORDER_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            }

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
                var tObj = {};
                tObj.CODE = 'SUCCEED:CMPT_PRESENT';
                tObj.id = 0;
                tRetArray.push(tObj);
            } catch (e) {
                var tObj = {};
                tObj.CODE = 'ERROR:' + e.message;
                tObj.id = 0;
                tRetArray.push(tObj);
            }
            return tRetArray;
        },

        mgrInsert_S0212_NEGO_CANCEL: async (_, args, contextValue) => {
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

            var tInputs = [...args.datas];

            var tOpMode = tInputs[0].OP_MODE;
            var tNegoType = '';
            var tFcNegoType = '';

            var tFlag = 0;
            tInputs.forEach((col, i) => {
                if (col.NEGO_TYPE !== '1' && col.NEGO_TYPE !== '2') tFlag = 1;
            });

            if (tFlag === 1) {
                var retArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:ShinTS Can Cancel Accept/Reject Only .';
                tObj.id = 0;
                retArray.push(tObj);
                return retArray;
            }

            var retArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tInputs.length; tIdx++) {
                var tData = { ...tInputs[tIdx] };

                var tFactoryCd = '';
                var tOrderStatus = '';
                var sql1 = `
                    select
                        *
                    from
                        ksv_order_mst
                    where
                        order_cd = '${tData.ORDER_CD}'
                `;
                var nRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                if (nRet1.length > 0) {
                    tFactoryCd = nRet1[0].FACTORY_CD;
                    tOrderStatus = nRet1[0].ORDER_STATUS;
                }

                if (parseInt(tOrderStatus) >= 8) {
                    var retArray = [];
                    var tObj = {};
                    tObj.CODE = 'ERROR:Ended orders cannot be cancelled.';
                    tObj.id = 0;
                    retArray.push(tObj);
                    return retArray;
                }

                var tNegoSeq = 1;

                var sql0 = `
                    select
                        max(nego_seq) as nego_seq
                    from
                        ksv_order_cmpt
                    where
                        order_cd = '${tData.ORDER_CD}'
                `;
                var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                if (nRet0.length > 0) {
                    tNegoSeq = nRet0[0].nego_seq;
                } else {
                    continue;
                }

                let tSQL99 = `
                    delete from ksv_order_cmpt
                    where
                        order_cd = '${tData.ORDER_CD}'
                        and nego_seq = '${tNegoSeq}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                if (tData.NEGO_TYPE === '2') continue;

                let tSQL99 = `
                    update ksv_order_mst
                    set
                        fc_nego_type = '3',
                        fc_price = '0',
                        line_charge_price = '0'
                    where
                        order_cd = '${tData.ORDER_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                var tTableName = '';
                if (tFactoryCd === 'FC044')
                    tTableName = 'ksv_capabook_mem_ethiopia';
                else if (tFactoryCd === 'FC034')
                    tTableName = 'ksv_capabook_mem';
                if (tTableName !== '') {
                    let tSQL99 = `
                        update ${tTableName}
                        set
                            exp_cmpt = '0',
                            job_cd = 'U'
                        from
                            ${tTableName} a
                        where
                            a.order_cd = '${tData.ORDER_CD}'
                            and a.book_date = (
                                select
                                    max(book_date)
                                from
                                    ${tTableName}
                                where
                                    order_cd = a.order_cd
                            )
                            and a.job_cd not in ('e', 'd')
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }
            }

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'SUCCEED:CMPT_PRESENT';
                tObj.id = 0;
                tRetArray.push(tObj);
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:' + e.message;
                tObj.id = 0;
                tRetArray.push(tObj);
            }
            return tRetArray;
        },

        mgrInsert_S0212_NEGO_RESET: async (_, args, contextValue) => {
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

            var tInputs = [...args.datas];

            var tOpMode = tInputs[0].OP_MODE;
            var tNegoType = '';
            var tFcNegoType = '';

            var tFlag = 0;
            /*
      tInputs.forEach((col, i) => {
          if (col.NEGO_TYPE !== '3') tFlag = 1;
      });
*/

            if (tFlag === 1) {
                var retArray = [];
                var tObj = {};
                tObj.CODE =
                    'ERROR:ShinTS Can Accept/Reject Only BVT Presented.';
                tObj.id = 0;
                retArray.push(tObj);
                return retArray;
            }

            var retArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tInputs.length; tIdx++) {
                var tData = { ...tInputs[tIdx] };

                var tNegoSeq = 1;

                let tSQL99 = `
                    delete from ksv_order_cmpt
                    where
                        order_cd = '${tData.ORDER_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    update ksv_order_mst
                    set
                        fc_nego_type = '0',
                        fc_price = '0',
                        line_charge_price = '0'
                    where
                        order_cd = '${tData.ORDER_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                var tFactoryCd = '';
                var sql1 = `
                    select
                        *
                    from
                        ksv_order_mst
                    where
                        order_cd = '${tData.ORDER_CD}'
                `;
                var nRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                if (nRet1.length > 0) {
                    tFactoryCd = nRet1[0].FACTORY_CD;
                }

                var tTableName = '';
                if (tFactoryCd === 'FC044')
                    tTableName = 'ksv_capabook_mem_ethiopia';
                else if (tFactoryCd === 'FC034')
                    tTableName = 'ksv_capabook_mem';
                if (tTableName !== '') {
                    let tSQL99 = `
                        update ${tTableName}
                        set
                            exp_cmpt = '0',
                            job_cd = 'U'
                        from
                            ${tTableName} a
                        where
                            a.order_cd = '${tData.ORDER_CD}'
                            and a.book_date = (
                                select
                                    max(book_date)
                                from
                                    ${tTableName}
                                where
                                    order_cd = a.order_cd
                            )
                            and a.job_cd not in ('e', 'd')
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }
            }

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'SUCCEED:CMPT_PRESENT';
                tObj.id = 0;
                tRetArray.push(tObj);
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:' + e.message;
                tObj.id = 0;
                tRetArray.push(tObj);
            }
            return tRetArray;
        },

        mgrInsert_S0212_NEGO_ACCEPT: async (_, args, contextValue) => {
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

            var tInputs = [...args.datas];

            var tOpMode = tInputs[0].OP_MODE;
            var tNegoType = '';
            var tFcNegoType = '';
            if (tOpMode === 'ACCEPT') {
                tNegoType = '1';
                tFcNegoType = '1';
            } else if (tOpMode === 'REJECT') {
                tNegoType = '2';
                tFcNegoType = '2';
            }

            var tFlag = 0;
            tInputs.forEach((col, i) => {
                if (col.NEGO_TYPE !== '3') tFlag = 1;
                if (tOpMode === 'ACCEPT' && parseFloat(col.STS_CMPT) <= 0)
                    tFlag = 2;
            });

            if (tFlag === 1) {
                var retArray = [];
                var tObj = {};
                tObj.CODE =
                    'ERROR:ShinTS Can Accept/Reject Fac Represent Only .';
                tObj.id = 0;
                retArray.push(tObj);
                return retArray;
            }
            if (tFlag === 2) {
                var retArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:ShinTS Can Accept sts_cmpt > 0 Only .';
                tObj.id = 0;
                retArray.push(tObj);
                return retArray;
            }

            var retArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tInputs.length; tIdx++) {
                var tData = { ...tInputs[tIdx] };

                var tNegoSeq = 1;

                var sql0 = `
                    select
                        max(nego_seq) as nego_seq
                    from
                        ksv_order_cmpt
                    where
                        order_cd = '${tData.ORDER_CD}'
                `;
                var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                if (nRet0.length > 0) {
                    tNegoSeq = nRet0[0].nego_seq + 1;
                }

                var tFactoryCd = '';
                var sql1 = `
                    select
                        *
                    from
                        ksv_order_mst
                    where
                        order_cd = '${tData.ORDER_CD}'
                `;
                var nRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                var tOrderMst = {};
                if (nRet1.length > 0) {
                    tFactoryCd = nRet1[0].FACTORY_CD;
                    tOrderMst = { ...nRet1[0] };
                }

                var tFactoryCd = '';
                var sql1 = `
                    select
                        isnull(factory_cd, '') as factory_cd
                    from
                        ksv_order_mst
                    where
                        order_cd = '${tData.ORDER_CD}'
                `;
                var nRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                if (nRet1.length > 0) {
                    tFactoryCd = nRet1[0].factory_cd;
                }

                var tWObj = {};
                tWObj.ORDER_CD = tData.ORDER_CD;
                tWObj.NEGO_SEQ = tNegoSeq;
                tWObj.NEGO_TYPE = tNegoType;
                tWObj.BVT_CMPT = tData.CMPT;
                tWObj.STS_CMPT = tData.STS_CMPT;
                tWObj.REMARK = tData.REMARK;
                tWObj.REG_USER = tUserInfo.USER_ID;
                tWObj.REG_DATETIME = tRetDate;
                tWObj.BVT_SCREEN_PRINT = tData.SCREEN_PRINT;
                tWObj.BVT_HEAT_SILICON = tData.HEAT_SILICON;
                tWObj.BVT_EMBROIDERY = tData.EMBROIDERY;
                tWObj.BVT_TPR = tData.TPR;
                tWObj.BVT_WELDING = tData.WELDING;
                tWObj.BVT_QUILTING = tData.QUILTING;
                tWObj.BVT_DIGITAL_PRINT = tData.DIGITAL_PRINT;
                tWObj.BVT_LABEL_PRINT = tData.LABEL_PRINT;
                tWObj.BVT_LINE_CHARGE = tData.LINE_CHARGE;
                if (tFactoryCd === 'FC034') tWObj.BVT_LOCAL = tData.LOCAL;
                else tWObj.BVT_LOCAL = 0;

                let tSQL99 = AFLib.createTableSql('KSV_ORDER_CMPT', tWObj);
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                var tFcPrice = 0;
                //ttFcPrice += parseFloat(tWObj.BVT_CMPT) ;
                /*
        tFcPrice += parseFloat(tWObj.STS_CMPT) ;
        tFcPrice += parseFloat(tWObj.BVT_SCREEN_PRINT) ;
        tFcPrice += parseFloat(tWObj.BVT_HEAT_SILICON) ;
        tFcPrice += parseFloat(tWObj.BVT_EMBROIDERY) ;
        tFcPrice += parseFloat(tWObj.BVT_TPR) ;
        tFcPrice += parseFloat(tWObj.BVT_WELDING) ;
        tFcPrice += parseFloat(tWObj.BVT_QUILTING) ;
        tFcPrice += parseFloat(tWObj.BVT_DIGITAL_PRINT) ;
        tFcPrice += parseFloat(tWObj.BVT_LABEL_PRINT) ;
        */

                // 오더내 FC_PRICE = BVT_CMPT + BVT_WELDING
                tFcPrice = parseFloat(tWObj.BVT_CMPT);
                tFcPrice += parseFloat(tWObj.BVT_WELDING);

                if (tOrderMst.SAMPLE_FLAG === '1') {
                    tFcPrice = parseFloat(tWObj.STS_CMPT);
                }

                if (tOpMode === 'ACCEPT') {
                    let tSQL99 = `
                        update ksv_order_mst
                        set
                            fc_nego_type = '${tNegoType}',
                            fc_price = '${tFcPrice}',
                            line_charge_price = '${tWObj.BVT_LINE_CHARGE}'
                        where
                            order_cd = '${tData.ORDER_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }

                var tFactoryCd = '';
                var sql1 = `
                    select
                        *
                    from
                        ksv_order_mst
                    where
                        order_cd = '${tData.ORDER_CD}'
                `;
                var nRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                if (nRet1.length > 0) {
                    tFactoryCd = nRet1[0].FACTORY_CD;
                }

                var tTableName = '';
                if (tFactoryCd === 'FC044')
                    tTableName = 'ksv_capabook_mem_ethiopia';
                else if (tFactoryCd === 'FC034')
                    tTableName = 'ksv_capabook_mem';
                if (tTableName !== '' && tOpMode === 'ACCEPT') {
                    let tSQL99 = `
                        update ${tTableName}
                        set
                            exp_cmpt = '${tFcPrice}',
                            job_cd = 'U'
                        from
                            ${tTableName} a
                        where
                            a.order_cd = '${tData.ORDER_CD}'
                            and a.book_date = (
                                select
                                    max(book_date)
                                from
                                    ${tTableName}
                                where
                                    order_cd = a.order_cd
                            )
                            and a.job_cd not in ('e', 'd')
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }
            }

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'SUCCEED:CMPT_PRESENT';
                tObj.id = 0;
                tRetArray.push(tObj);
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:' + e.message;
                tObj.id = 0;
                tRetArray.push(tObj);
            }
            return tRetArray;
        },

        mgrInsert_S0212_NEGO_GET_PHERQDL: async (_, args, contextValue) => {
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

            var tSQLArray = [];

            var tInputs = [...args.datas];

            var tOpMode = tInputs[0].OP_MODE;
            var tNegoType = '';
            var tFcNegoType = '';

            var tFlag = 0;
            tInputs.forEach((col, i) => {
                if (col.NEGO_TYPE === '1') tFlag = 1;
            });

            if (tFlag === 1) {
                var retArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:ShinTS Accept can not GET PHERQDL.';
                tObj.id = 0;
                retArray.push(tObj);
                return retArray;
            }

            var retArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tInputs.length; tIdx++) {
                var tData = { ...tInputs[tIdx] };

                var tNegoSeq = tData.NEGO_SEQ;

                var tOrderMst = {};
                var sql0_1 = `
                    select
                        *
                    from
                        ksv_order_mst
                    where
                        order_cd = '${tData.ORDER_CD}'
                `;
                var nRet0_1 = await prisma.$queryRaw(Prisma.raw(sql0_1));
                if (nRet0_1.length > 0) tOrderMst = { ...nRet0_1[0] };

                var sql0 = `
                    select
                        prod_cd
                    from
                        ksv_order_mem
                    where
                        order_cd = '${tData.ORDER_CD}'
                `;
                var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                var tProdCd = '';
                if (nRet0.length > 0) {
                    tProdCd = nRet0[0].nego_seq;
                }

                var p = 0;
                var h = 0;
                var e = 0;
                var r = 0;
                var w = 0;
                var q = 0;
                var d = 0;
                var l = 0;

                var sql1_bak = `
                    select
                        c.matl_type,
                        isnull(sum(a.use_qty * d.matl_price), 0) as matl_amt
                    from
                        ksv_po_mrpnet a,
                        kcd_matl_mst c,
                        kcd_matl_mem d
                    where
                        a.po_cd = '${tProdCd}'
                        and a.order_cd = '${tData.ORDER_CD}'
                        and c.matl_cd = a.matl_cd
                        and c.matl_type in ('P', 'H', 'E', 'R', 'W', 'Q', 'D', 'L')
                        and d.matl_cd = a.matl_cd
                        and d.matl_seq = (
                            select
                                max(matl_seq)
                            from
                                kcd_matl_mem
                            where
                                c.matl_cd = matl_cd
                        )
                        and c.vendor_cd in ('V0882', 'V1838', 'V2078')
                    group by
                        c.matl_type
                `;

                var sql1 = `
                    select
                        c.matl_type,
                        (
                            isnull(sum(a.use_qty * (d.matl_price * e.usd_rate)), 0) / ${tOrderMst.TOT_CNT}
                        ) as matl_amt
                    from
                        ksv_po_mrp a,
                        kcd_matl_mst c,
                        kcd_matl_mem d,
                        kcd_curr_avr e
                    where
                        a.po_cd = '${tData.PO_CD}'
                        AND e.START_DATE = (
                            SELECT
                                max(START_DATE)
                            from
                                KCD_CURR_AVR
                        )
                        AND e.CURR_CD = d.CURR_CD
                        and a.order_cd = '${tData.ORDER_CD}'
                        and c.matl_cd = a.matl_cd
                        and c.matl_type in ('P', 'H', 'E', 'R', 'W', 'Q', 'D', 'L')
                        and d.matl_cd = a.matl_cd
                        and d.matl_seq = (
                            select
                                max(matl_seq)
                            from
                                kcd_matl_mem
                            where
                                c.matl_cd = matl_cd
                        )
                        and c.vendor_cd in ('V0882', 'V1838', 'V2078')
                        and (
                            (a.use_po_type = '1')
                            or (
                                a.use_po_type = '2'
                                and a.diff_po_type = '5'
                            )
                        )
                    group by
                        c.matl_type
                `;
                var nRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                if (nRet1.length > 0) {
                    nRet1.forEach((col, i) => {
                        if (col.matl_type === 'P')
                            p += parseFloat(col.matl_amt);
                        if (col.matl_type === 'H')
                            h += parseFloat(col.matl_amt);
                        if (col.matl_type === 'E')
                            e += parseFloat(col.matl_amt);
                        if (col.matl_type === 'R')
                            r += parseFloat(col.matl_amt);
                        if (col.matl_type === 'W')
                            w += parseFloat(col.matl_amt);
                        if (col.matl_type === 'Q')
                            q += parseFloat(col.matl_amt);
                        if (col.matl_type === 'D')
                            d += parseFloat(col.matl_amt);
                        if (col.matl_type === 'L')
                            l += parseFloat(col.matl_amt);
                    });

                    let tSQL99 = `
                        update ksv_order_cmpt
                        set
                            bvt_screen_print = '${p}',
                            bvt_heat_silicon = '${h}',
                            bvt_embroidery = '${e}',
                            bvt_tpr = '${r}',
                            bvt_quilting = '${q}',
                            bvt_digital_print = '${d}',
                            bvt_label_print = '${l}'
                        where
                            order_cd = '${tData.ORDER_CD}'
                            and nego_seq = '${tData.NEGO_SEQ}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    var tWelCmpt = parseFloat(tData.CMPT) + w;
                    if (tOrderMst.SAMPLE_FLAG === '1')
                        tWelCmpt = parseFloat(tData.CMPT);

                    let tSQL99 = `
                        update ksv_order_mst
                        set
                            fc_price = ${tWelCmpt}
                        where
                            order_cd = '${tData.ORDER_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }
            }

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'SUCCEED:CMPT_PRESENT';
                tObj.id = 0;
                tRetArray.push(tObj);
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:' + e.message;
                tObj.id = 0;
                tRetArray.push(tObj);
            }
            return tRetArray;
        },

        mgrUpdate_S0212_NEGO_CMPT_EDT_KSV_ORDER_CMPT: async (
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

            var retArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var tData = args.datas[tIdx];
                var tObjEDT_KSV_ORDER_CMPT = { ...tData };

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

        mgrDelete_S0212_NEGO_CMPT_EDT_KSV_ORDER_CMPT: async (_, args) => {
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
                var tObjEDT_KSV_ORDER_CMPT = { ...tData };

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

export default moduleMutation_S0212_NEGO_CMPT_EDT_KSV_ORDER_CMPT;
