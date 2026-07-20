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
const moduleMutation_S040202_4 = {
    Mutation: {
        mgrPoPlan_S040202_4: async (_, args, contextValue) => {
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
            var tInputObj = args.datas[0];

            var tSQLArray = [];
            var mPlanFlag = '';
            if (tInputObj.IS_SHIP_PLAN === '1') {
                var mPlanFlag = '1';
                let tSQL = `
                    insert into
                        ksv_po_vendor (po_cd, vendor_cd, end_date)
                    select distinct
                        a.po_cd,
                        c.vendor_cd,
                        ''
                    from
                        ksv_po_mrp a,
                        kcd_matl_mst b,
                        kcd_vendor c
                    where
                        a.po_cd = '${tInputObj.PO_CD}'
                        and a.use_po_type = '1'
                        and a.diff_po_type <> '1'
                        and b.matl_cd = a.matl_cd
                        and c.vendor_cd = b.vendor_cd
                        and c.vendor_cd not in (
                            select
                                vendor_cd
                            from
                                ksv_po_vendor
                            where
                                po_cd = '${tInputObj.PO_CD}'
                        )
                `;
                const tSQL1 = prisma.$queryRaw(Prisma.raw(tSQL));
                tSQLArray.push(tSQL1);
            } else {
                var mPlanFlag = '0';
                let tSQL = `
                    delete from ksv_po_vendor
                    where
                        po_cd = '${tInputObj.PO_CD}'
                        and end_date = ''
                `;
                const tSQL1 = prisma.$queryRaw(Prisma.raw(tSQL));
                tSQLArray.push(tSQL1);
            }

            let tSQL = `
                update ksv_po_mst
                set
                    plan_flag = '${mPlanFlag}',
                    plan_etd = '${tInputObj.TARGET_ETD}',
                    plan_eta = '${tInputObj.TARGET_ETA}',
                    po_user_main = '${tInputObj.USER_ID1}',
                    po_user_sub = '${tInputObj.USER_ID2}'
                where
                    po_cd = '${tInputObj.PO_CD}'
            `;
            const tSQL1 = prisma.$queryRaw(Prisma.raw(tSQL));
            tSQLArray.push(tSQL1);

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = `SUCCEE:PO_PLAN`;
                tObj.id = 0;
                tRetArray.push(tObj);
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:PO_FIX';
                tObj.id = 0;
                tRetArray.push(tObj);
            }
            return tRetArray;
        },
    },
};

export default moduleMutation_S040202_4;
