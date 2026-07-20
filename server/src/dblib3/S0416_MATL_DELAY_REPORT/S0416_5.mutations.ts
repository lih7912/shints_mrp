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
const moduleMutation_S0416_5 = {
    Mutation: {
        mgrInsert_S0416_5: async (_, args, contextValue) => {
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
            var tInput = { ...args.datas[0] };

            let sql0 = `
                select
                    sys_val
                from
                    kcd_system
                where
                    sys_cd = 'MatlDelaySeq'
            `;
            var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            var tNewSeq = parseInt(nRet0[0].sys_val) + 1;

            var tSQLArray = [];

            args.datas.forEach((col, i) => {
                var tInput = { ...col };
                let tSQL99 = `
                    insert into
                        kzz_matl_delay (
                            seq,
                            po_cd,
                            matl_cd,
                            po_conf_date,
                            org_etd,
                            org_eta,
                            need_qty,
                            remain_qty,
                            cut_date,
                            etd,
                            eta,
                            delay_reason,
                            delivery_type,
                            fare_type,
                            remark,
                            ex_in_date,
                            end_flag,
                            buyer_cd,
                            reg_user,
                            reg_datetime
                        )
                    values
                        (
                            '${tNewSeq}',
                            '${tInput.PO_CD}',
                            '${tInput.MATL_CD}',
                            '${tInput.PO_CONF_DATE}',
                            '${tInput.PLAN_ETD}',
                            '${tInput.PLAN_ETA}',
                            '${tInput.NEED_QTY}',
                            '${tInput.REMAIN_QTY}',
                            '${tInput.CUT_DATE}',
                            '${tInput.ETD}',
                            '${tInput.ETA}',
                            '${tInput.DELAY_REASON}',
                            '${tInput.DELIVERY_TYPE}',
                            '${tInput.FARE_TYPE}',
                            '${tInput.REMARK}',
                            '${tInput.EX_IN_DATE}',
                            '0',
                            '${tInput.BUYER_CD}',
                            '${tInput.USER_ID}',
                            '${tRetDate}'
                        )
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            });

            let tSQL99 = `
                update kcd_system
                set
                    sys_val = '${tNewSeq}'
                where
                    sys_cd = 'MatlDelaySeq'
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
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Update Check CT_QTY Error';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED:Update Check CT_QTY :' + args.datas.length;
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },
    },
};

export default moduleMutation_S0416_5;
