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
const moduleMutation_S0432_5 = {
    Mutation: {
        mgrInsert_S0432_5: async (_, args, contextValue) => {
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
            var tInput = { ...args.datas };
            var tInput1 = { ...args.datas1[0] };

            var tSQLArray = [];

            var sql0 = `
                select
                    isnull(max(right(shipment_cd, 6)), '000000') as stsout_seq
                from
                    ksv_shipment_mst
                where
                    shipment_cd like 'SHIP23-%'
            `;
            var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            var nMaxSeq = parseInt(nRet0[0].stsout_seq) + 1;

            var tZero = '000000';
            var tNewCd =
                'SHIP23-' +
                tZero.substring(0, 6 - String(nMaxSeq).length) +
                String(nMaxSeq);

            var tIdx1 = 0;
            for (tIdx1 = 0; tIdx1 < args.datas1.length; tIdx1++) {
                var col = { ...args.datas1[tIdx1] };

                let tSQL99 = `
                    update ksv_stock_out
                    set
                        pack_cd = '${tNewCd}'
                    where
                        stsout_cd = '${col.STSOUT_CD}'
                        and (
                            pack_cd is null
                            or pack_cd = ''
                        )
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            }

            var tOrgPort = tInput.ORIGIN_PORT;
            var tDestination = tInput.DESTINATION;

            if (tInput.SINGAPORE_COMBINE === '1') {
                tOrgPort = tInput.ORIGIN_PORT;
                tDestination = 'SINGAPORE';
            }

            let tSQL99 = `
                insert into
                    ksv_shipment_mst (
                        shipment_cd,
                        ship_mode,
                        place_cd,
                        origin_port,
                        bl_no,
                        eta,
                        container_no,
                        reg_user,
                        reg_datetime,
                        status_cd,
                        destination,
                        is_singapore,
                        cost,
                        ship_line
                    )
                values
                    (
                        '${tNewCd}',
                        '${tInput.SHIP_MODE}',
                        '${tInput.PLACE_CD}',
                        '${tOrgPort}',
                        '${tInput.BL_NO}',
                        '${tInput1.TARGET_ETA}',
                        '${tInput.CONTAINER_NO}',
                        '${tInput.REG_USER}',
                        '${tRetDate}',
                        '0',
                        '${tDestination}',
                        '${tInput.SINGAPORE_COMBINE}',
                        '${tInput.COST}',
                        '${tInput.SHIP_LINE}'
                    )
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            if (tInput.SINGAPORE_COMBINE === '1') {
                tOrgPort = 'SINGAPORE';
                tDestination = tInput.DESTINATION;

                let tSQL99 = `
                    insert into
                        ksv_shipment_mst (
                            shipment_cd,
                            ship_mode,
                            place_cd,
                            origin_port,
                            bl_no,
                            eta,
                            container_no,
                            reg_user,
                            reg_datetime,
                            status_cd,
                            destination,
                            is_singapore,
                            cost,
                            ship_line
                        )
                    values
                        (
                            '${tNewCd}',
                            '${tInput.SHIP_MODE}',
                            '${tInput.PLACE_CD}',
                            '${tOrgPort}',
                            '${tInput.BL_NO}',
                            '${tInput1.TARGET_ETA}',
                            '${tInput.CONTAINER_NO}',
                            '${tInput.REG_USER}',
                            '${tRetDate}',
                            '0',
                            '${tDestination}',
                            '${tInput.SINGAPORE_COMBINE}',
                            '${tInput.COST}',
                            '${tInput.SHIP_LINE}'
                        )
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
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'SUCCEED:' + tNewCd;
                tObj.id = 0;
                tRetArray.push(tObj);
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:STOCK_IN';
                tObj.id = 0;
                tRetArray.push(tObj);
            }
            return tRetArray;
        },

        mgrDelete_S0432_5: async (_, args, contextValue) => {
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
            let tSQL99 = `
                delete from ksv_shipment_mst
                where
                    shipment_cd = '${args.datas.SHIPMENT_CD}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            let tSQL99 = `
                update ksv_stock_out
                set
                    pack_cd = ''
                where
                    pack_cd = '${args.datas.SHIPMENT_CD}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'SUCCEED:Delete PU_CD:' + args.datas.PU_CD;
                tObj.id = 0;
                tRetArray.push(tObj);
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Delete PU_CD';
                tObj.id = 0;
                tRetArray.push(tObj);
            }

            return tRetArray;
        },

        mgrUpdate_S0432_5: async (_, args, contextValue) => {
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
            var tInput = args.datas;

            var tSQLArray = [];
            let tSQL99 = `
                update ksv_shipment_mst
                set
                    ship_mode = '${tInput.SHIP_MODE}',
                    place_cd = '${tInput.PLACE_CD}',
                    BL_FILE = '${tInput.BL_FILE}',
                    ORIGIN_PORT = '${tInput.ORIGIN_PORT}',
                    BL_NO = '${tInput.BL_NO}',
                    PL_FILE = '${tInput.PL_FILE}',
                    ETA = '${tInput.ETA}',
                    CONTAINER_NO = '${tInput.CONTAINER_NO}',
                    CI_FILE = '${tInput.CI_FILE}',
                    DESTINATION = '${tInput.DESTINATION}',
                    COST = '${tInput.COST}',
                    UPD_DATETIME = '${tRetDate}',
                    TRACKING_ID = '${tInput.TRACKING_ID}'
                where
                    shipment_cd = '${tInput.SHIPMENT_CD}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'SUCCEED:Delete PU_CD:' + args.datas.PU_CD;
                tObj.id = 0;
                tRetArray.push(tObj);
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Delete PU_CD';
                tObj.id = 0;
                tRetArray.push(tObj);
            }

            return tRetArray;
        },

        mgrUpdate_S0432_5_1: async (_, args, contextValue) => {
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
            var tInput = args.datas;

            var tSQLArray = [];
            let tSQL99 = `
                update ksv_shipment_mst
                set
                    TRACKING_ID = '${tInput.TRACKING_ID}',
                    A_ETA = '${tInput.A_ETA}',
                    F_ETA = '${tInput.F_ETA}',
                    SHIP_STATUS = '${tInput.SHIP_STATUS}',
                    LOADING_DATE = '${tInput.LOADING_DATE}',
                    ARRIVAL_DATE = '${tInput.ARRIVAL_DATE}',
                    DISCHARGE_DATE = '${tInput.DISCHARGE_DATE}',
                    GATEOUT_DATE = '${tInput.GATEOUT_DATE}'
                where
                    shipment_cd = '${tInput.SHIPMENT_CD}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'SUCCEED:Delete PU_CD:' + args.datas.PU_CD;
                tObj.id = 0;
                tRetArray.push(tObj);
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Delete PU_CD';
                tObj.id = 0;
                tRetArray.push(tObj);
            }

            return tRetArray;
        },
    },
};

export default moduleMutation_S0432_5;
