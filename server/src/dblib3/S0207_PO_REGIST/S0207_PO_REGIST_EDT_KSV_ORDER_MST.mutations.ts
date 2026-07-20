// MGR_@@TNAME@@.mutations.js

import * as fs from 'fs';
import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기

/*
                ORDER_CD: String 
                STYLE_NAME: String 
                STYLE_CD: String 
                DUE_DATE: String 
                TOT_CNT: String 
                STATUS_NAME: String 
                STATUS_CD: String 
                FACTORY_NAME: String 
                FACTORY_CD: String 

*/

// export default로 Mutation 내용 내보내기
const moduleMutation_S0207_PO_REGIST_EDT_KSV_ORDER_MST = {
    Mutation: {
        mgrInsert_S0207_PO_REGIST_EDT_KSV_ORDER_MST: async (
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

            var tOrderCds = args.datas.map((col, i) => {
                return col.ORDER_CD;
            });
            console.log(tOrderCds);

            var tSql1 = tOrderCds.reduce((acc, curr, i) => {
                if (i === tOrderCds.length - 1) acc += `'${curr}' `;
                else acc += `'${curr}', `;
                return acc;
            }, '');
            console.log(tSql1);

            var tSQL = `
                select
                    *
                from
                    ksv_order_mst
                where
                    order_cd in (${tSql1})
            `;

            var tSaveBuyer = '';
            var tSaveFactory = '';
            var tFlag = 0;

            var tRet = await prisma.$queryRaw(Prisma.raw(tSQL));
            var tIdx = 0;
            var tOrderObj = tRet[0];
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tObj = tRet[tIdx];

                if (tSaveBuyer === '') {
                    tSaveBuyer = tObj.ORDER_CD.substring(0, 2);
                    tSaveFactory = tObj.FACTORY_CD;
                    continue;
                }
                var tBuyer = tObj.ORDER_CD.substring(0, 2);
                if (tSaveBuyer !== tBuyer || tSaveFactory !== tObj.FACTORY_CD) {
                    tFlag = 1;
                    break;
                }
                tSaveBuyer = tBuyer;
                tSaveFactory = tObj.FACTORY_CD;
            }

            if (tFlag === 1) {
                var retArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR: 다른 바이어입니다';
                tObj.id = 0;
                retArray.push(tObj);
                return retArray;
            }

            var tPoType = '';
            var tOrderStatus = '';
            var tPoStatus = '';

            var tInputObj = args.datas[0];

            var tPO = 'P';
            var tSQL1 = `
                select
                    TAG_PO
                from
                    kcd_factory
                where
                    factory_cd = '${tObj.FACTORY_CD}'
            `;
            var tRet1 = await prisma.$queryRaw(Prisma.raw(tSQL1));
            if (tRet1.length > 0) {
                tPO = tRet1[0].TAG_PO;
            }

            var tHyphon = '-';

            if (tInputObj.ORDER_FLAG === '1') {
                tPoType = 'M';
                tOrderStatus = '3';
                tPoStatus = '0';
            } else if (tInputObj.MATL_SALE_FLAG === '1') {
                tPoType = 'T';
                tOrderStatus = '1';
                tPoStatus = '0';
                tPO = 'T';
            } else if (tInputObj.FAC_LC_FLAG === '1') {
                tPoType = 'U';
                tOrderStatus = '1';
                tPoStatus = '0';
                tHyphon = 'L';
            } else if (tInputObj.SAMPLE_FLAG === '1') {
                tPoType = 'N';
                tOrderStatus = '1';
                tPoStatus = '0';
                tHyphon = 'S';
            } else {
                tPoType = 'P';
                tOrderStatus = '1';
                tPoStatus = '0';
            }

            var tSeq = 0;

            var tSQL2 = `
                SELECT
                    isnull(max(seq), 0) as max_seq
                FROM
                    ksv_po_getseq
                    -- WHERE  PO = '${tPoType}' and YY = ${yyyy} 
                WHERE
                    PO = '${tPO}'
                    and YY = ${yyyy}
            `;
            var tRet2 = await prisma.$queryRaw(Prisma.raw(tSQL2));
            if (tRet2.length > 0) {
                tSeq = tRet2[0].max_seq + 1;
            } else {
                tSeq = 1;
            }
            console.log('max_seq:' + tSeq);

            var tGetSeqSQL = '';
            if (tSeq === 1) {
                tGetSeqSQL += `
                    insert into
                        ksv_po_getseq
                `;
                tGetSeqSQL += `(PO, YY, SEQ) values (  `;
                tGetSeqSQL += ` '${tPoType}', ${yyyy}, 1)`;
            } else {
                tGetSeqSQL += `
                    update ksv_po_getseq
                    set
                `;
                tGetSeqSQL += ` seq = seq + 1  `;
                tGetSeqSQL += ` WHERE  PO = '${tPoType}' and YY = ${yyyy} `;
            }

            var tBvtFlag = '0';
            if (tOrderObj.FACTORY_CD === 'FC034') tBvtFlag = '1';

            var tSeqStr = '0000';
            var tSeqStr1 = String(tSeq);
            var tSeqStr2 = tSeqStr.substring(0, 4 - tSeqStr1.length) + tSeqStr1;

            var tPoCd =
                tPO + 'O' + tRetDate.substring(2, 4) + tHyphon + tSeqStr2;

            var tInsertKSV_PO_MST = [];
            var tInsertObj = {};
            tInsertObj.PO_CD = tPoCd;
            tInsertObj.PO_SEQ = 1;
            tInsertObj.PO_TYPE = tPoType;
            tInsertObj.PO_DATE = tRetDate.substring(0, 8);
            tInsertObj.PO_STATUS = tPoStatus;
            tInsertObj.MATL_DUE_DATE = '';
            tInsertObj.PROD_DUE_DATE = tOrderObj.DUE_DATE.substring(0, 8);
            tInsertObj.PLACE_CD = '';
            tInsertObj.CURR_DATE = tRetDate.substring(0, 8);
            tInsertObj.YY = yyyy;
            tInsertObj.SEQ = tSeq;
            tInsertObj.FACTORY_CD = tOrderObj.FACTORY_CD;
            tInsertObj.DELIVERY_TYPE = '';
            tInsertObj.STATUS_CD = '0';
            tInsertObj.BVT_FLAG = tBvtFlag;
            tInsertObj.REG_USER = AFLib.getUserInfo(contextValue).USER_ID;
            tInsertObj.REG_DATETIME = tRetDate;
            tInsertKSV_PO_MST.push(tInsertObj);

            var tInsertKSV_PO_MEM_ARRAY = tRet.map((col, i) => {
                var tObj = {};
                tObj.PO_CD = tPoCd;
                tObj.PO_SEQ = 1;
                tObj.ORDER_CD = col.ORDER_CD;
                return tObj;
            });

            var tUpdateSQL = '';
            tUpdateSQL += `update ksv_order_mst  `;
            tUpdateSQL += `set order_status = '${tOrderStatus}' `;
            //      tUpdateSQL += `    po_cd = '${tPoCd}' `;
            tUpdateSQL += `where order_cd in (${tSql1}) `;

            /*
      var tUpdateSQL = tRet.map ((col, i) => {
          var tSQL = '';
          tSQL += `update ksv_order_mst  `;
          tSQL += `set order_status = '${tOrderStatus}', `;
          tSQL += `    po_cd = '${tPoCd}', `;
          tSQL += `where order_ = '${col.ORDER_CD}' `;
          return (tSQL);
      });
*/

            var tInsertLogs = tRet.map((col, i) => {
                var tInsertKZZ_SENDDATA_LOG = {};
                tInsertKZZ_SENDDATA_LOG.TABLE_NAME = 'KSV_ORDER_MST';
                tInsertKZZ_SENDDATA_LOG.JOB_FLAG = 'U';
                tInsertKZZ_SENDDATA_LOG.SEND_FLAG = '0';
                tInsertKZZ_SENDDATA_LOG.SEND_DATETIME = '';
                tInsertKZZ_SENDDATA_LOG.KEY1 = col.ORDER_CD;
                tInsertKZZ_SENDDATA_LOG.SQL1 = tUpdateSQL[i];
                tInsertKZZ_SENDDATA_LOG.STATUS_CD = '0';
                tInsertKZZ_SENDDATA_LOG.REG_USER = AFLib.getUserInfo(contextValue).USER_ID;
                tInsertKZZ_SENDDATA_LOG.REG_DATETIME = tRetDate;
                return tInsertKZZ_SENDDATA_LOG;
            });

            console.log('START Tran-0');

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                var [nRet1, nRet2, nRet3, nRet4] = await prisma.$transaction([
                    prisma.KSV_PO_MST.createMany({
                        data: tInsertKSV_PO_MST,
                    }),
                    prisma.KSV_PO_MEM.createMany({
                        data: tInsertKSV_PO_MEM_ARRAY,
                    }),
                    prisma.KZZ_SENDDATA_LOG.createMany({
                        data: tInsertLogs,
                    }),
                    prisma.$queryRaw(Prisma.raw(tUpdateSQL)),
                    prisma.$queryRaw(Prisma.raw(tGetSeqSQL)),
                ]);
                delete global.currentTransactionInfo;

                var retArray = [];
                var tObj = {};
                tObj.CODE = 'SUCCESS:' + tPoCd;
                tObj.id = 0;
                retArray.push(tObj);

                return retArray;
            } catch (err) {
                console.log(err);
                var retArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR';
                tObj.id = 0;
                retArray.push(tObj);

                return retArray;
            }
        },

        mgrUpdate_S0207_PO_REGIST_EDT_KSV_ORDER_MST: async (
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
                var tObjEDT_KSV_ORDER_MST = { ...tData };

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

        mgrDelete_S0207_PO_REGIST_EDT_KSV_ORDER_MST: async (_, args) => {
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
                var tObjEDT_KSV_ORDER_MST = { ...tData };

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

export default moduleMutation_S0207_PO_REGIST_EDT_KSV_ORDER_MST;
