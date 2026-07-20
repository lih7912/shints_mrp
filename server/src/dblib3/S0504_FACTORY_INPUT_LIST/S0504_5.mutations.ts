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
const moduleMutation_S0504_5 = {
    Mutation: {
        mgrInsert_S0504_5_CANCEL: async (_, args, contextValue) => {
            //
            var tDateNew = new Date();
            tDateNew.setMonth(tDateNew.getMonth() + 1);
            var tZeroDate = '00';
            var tDateNew_M =
                tZeroDate.substring(
                    0,
                    2 - String(tDateNew.getMonth() + 1).length,
                ) + String(tDateNew.getMonth() + 1);
            var tDateNew_D =
                tZeroDate.substring(0, 2 - String(tDateNew.getDate()).length) +
                String(tDateNew.getMonth());
            var tNewDateStr = tDateNew.getFullYear() + tDateNew_M + tDateNew_D;

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
            var tRetDate1 = tRetDate.substring(0, 8);
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

            var tSQLArray = [];

            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var col = { ...args.datas[tIdx] };
                var tErrQty =
                    parseFloat(col.SHORTAGE_QTY) + parseFloat(col.DEFECT_QTY);
                let tSQL99 = `
                    delete from ksv_stock_facin
                    where
                        stsout_cd = '${col.STSOUT_CD}'
                        and po_cd = '${col.PO_CD}'
                        and matl_cd = '${col.MATL_CD}'
                        and in_date = '${col.IN_DATE}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    update ksv_stock_mem2
                    set
                        infac_qty = infac_qty - ${col.IN_QTY},
                        shortage_qty = shortage_qty - ${col.SHORTAGE_QTY},
                        defect_qty = defect_qty - ${col.DEFECT_QTY}
                    where
                        po_cd = '${col.PO_CD}'
                        and matl_cd = '${col.MATL_CD}'
                        -- and   pu_cd = '${col.PU_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                var tPercent = parseFloat(col.IN_QTY) / parseFloat(col.COL2);
                if (tPercent > 0.9) tPercent = 1.0;

                var sql0 = `
                    select
                        *
                    from
                        ksv_stock_out
                    where
                        stsout_cd = '${col.STSOUT_CD}'
                        -- and   shipment_cd = '${col.SHIPMENT_CD}'
                        and po_cd = '${col.PO_CD}'
                        and matl_cd = '${col.MATL_CD}'
                `;
                var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));

                var tIdx1 = 0;
                for (tIdx1 = 0; tIdx1 < nRet0.length; tIdx1++) {
                    var col1 = { ...nRet0[tIdx1] };

                    var tFacInQty = parseFloat(col1.OUT_QTY) * tPercent;

                    let tSQL99 = `
                        update ksv_stock_mem
                        set
                            infac_qty = infac_qty - ${tFacInQty}
                        where
                            po_cd = '${col1.PO_CD}'
                            and po_seq = '${col1.PO_SEQ}'
                            and order_cd = '${col1.ORDER_CD}'
                            and matl_cd = '${col1.MATL_CD}'
                            and mrp_seq = '${col1.MRP_SEQ}'
                            and matl_seq = '${col1.MATL_SEQ}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
                        update ksv_stock_out
                        set
                            facin_user = '',
                            facin_datetime = ''
                        where
                            po_cd = '${col1.PO_CD}'
                            and po_seq = '${col1.PO_SEQ}'
                            and order_cd = '${col1.ORDER_CD}'
                            and matl_cd = '${col1.MATL_CD}'
                            and mrp_seq = '${col1.MRP_SEQ}'
                            and matl_seq = '${col1.MATL_SEQ}'
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
        mgrUpdate_S0504_5_LOCATION: async (_, args, contextValue) => {
            // Update Location
            var tDateNew = new Date();
            tDateNew.setMonth(tDateNew.getMonth() + 1);
            var tZeroDate = '00';
            var tDateNew_M =
                tZeroDate.substring(
                    0,
                    2 - String(tDateNew.getMonth() + 1).length,
                ) + String(tDateNew.getMonth() + 1);
            var tDateNew_D =
                tZeroDate.substring(0, 2 - String(tDateNew.getDate()).length) +
                String(tDateNew.getMonth());
            var tNewDateStr = tDateNew.getFullYear() + tDateNew_M + tDateNew_D;

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
            var tRetDate1 = tRetDate.substring(0, 8);
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
            var tInput = { ...args.datas[0] };
            var tSQLArray = [];

            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var tOne = { ...args.datas[tIdx] };

                let tSQL99 = `
                    update ksv_stock_facin
                    set
                        location = '${tOne.LOCATION}'
                    where
                        po_cd = '${tOne.PO_CD}'
                        and matl_cd = '${tOne.MATL_CD}'
                        and in_date = '${tOne.IN_DATE}'
                        and delivery = '${tOne.DELIVERY}'
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
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Update Location Error';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED: Update Location :' + args.datas.length;
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },
    },
};

export default moduleMutation_S0504_5;
