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
const moduleMutation_S040201_3 = {
    Mutation: {
        mgrPoFix_S040201_3: async (_, args, contextValue) => {
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

            let tSQL0 = `
                select
                    *
                from
                    ksv_po_mst
                where
                    po_cd = '${tInputObj.PO_CD}'
            `;
            let nRet = await prisma.$queryRaw(Prisma.raw(tSQL0));
            var mFactoryCd = nRet[0].FACTORY_CD;
            var mPoStatus = nRet[0].PO_STATUS;

            let tSQL0 = `
                select
                    matl_cd
                from
                    ksv_stock_in
                where
                    po_cd = '${tInputObj.PO_CD}'
            `;
            let nRet = await prisma.$queryRaw(Prisma.raw(tSQL0));
            if (nRet.length > 0) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = `ERROR:Already in stock. Unable to cancel PO FIX`;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            if (mPoStatus !== '3' && mPoStatus !== '4') {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = `ERROR:PO status is not Fix or Stocked`;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tSQLArray = [];
            var updatePO_STATUS = '';
            var updateORDER_STATUS = '';
            if (mPoStatus === '3') {
                let tSQL = `
                    update ksv_po_mst
                    set
                        po_status = '4'
                    where
                        po_cd = '${tInputObj.PO_CD}'
                `;
                const tSQL1 = prisma.$queryRaw(Prisma.raw(tSQL));
                tSQLArray.push(tSQL1);

                let tSQL = `
                    insert into
                        ksv_stock_mst (
                            po_cd,
                            po_seq,
                            in_factory_cd,
                            out_factory_cd,
                            status_cd,
                            reg_user,
                            reg_datetime
                        )
                    select
                        po_cd,
                        po_seq,
                        'FC010',
                        '${mFactoryCd}',
                        '0',
                        '${tInputObj.USER_ID}',
                        '${tRetDate}'
                    from
                        ksv_po_mst
                    where
                        po_cd = '${tInputObj.PO_CD}'
                `;
                const tSQL1 = prisma.$queryRaw(Prisma.raw(tSQL));
                tSQLArray.push(tSQL1);

                let tSQL = `
                    insert into
                        ksv_stock_mem (
                            po_cd,
                            po_seq,
                            order_cd,
                            matl_cd,
                            mrp_seq,
                            matl_seq,
                            po_qty,
                            in_qty,
                            out_qty,
                            infac_qty,
                            outfac_qty,
                            remain_qty,
                            factory_cd,
                            diff_po_type,
                            stock_status,
                            status_cd,
                            reg_user,
                            reg_datetime,
                            min_conf_user,
                            min_conf_datetime
                        )
                    select
                        po_cd,
                        po_seq,
                        order_cd,
                        matl_cd,
                        mrp_seq,
                        matl_seq,
                        po_qty,
                        0,
                        0,
                        0,
                        0,
                        0,
                        '${mFactoryCd}',
                        diff_po_type,
                        '0',
                        '0',
                        '${tInputObj.USER_ID}',
                        '${tRetDate}',
                        min_conf_user,
                        min_conf_datetime
                    from
                        ksv_po_mrp
                    where
                        po_cd = '${tInputObj.PO_CD}'
                        and use_po_type = '1'
                        and diff_po_type <> '2'
                        and po_seq < '98'
                `;
                const tSQL1 = prisma.$queryRaw(Prisma.raw(tSQL));
                tSQLArray.push(tSQL1);

                updatePO_STATUS = '4';
                updateORDER_STATUS = '3';
            } else {
                let tSQL = `
                    update ksv_po_mst
                    set
                        po_status = '3'
                    where
                        po_cd = '${tInputObj.PO_CD}'
                `;
                const tSQL1 = prisma.$queryRaw(Prisma.raw(tSQL));
                tSQLArray.push(tSQL1);

                let tSQL = `
                    delete from ksv_stock_mst
                    where
                        po_cd = '${tInputObj.PO_CD}'
                `;
                const tSQL1 = prisma.$queryRaw(Prisma.raw(tSQL));
                tSQLArray.push(tSQL1);

                let tSQL = `
                    delete from ksv_stock_mem
                    where
                        po_cd = '${tInputObj.PO_CD}'
                `;
                const tSQL1 = prisma.$queryRaw(Prisma.raw(tSQL));
                tSQLArray.push(tSQL1);

                updatePO_STATUS = '3';
                updateORDER_STATUS = '2';
            }

            let tSQL = `
                update ksv_order_mst
                set
                    order_status = '${updateORDER_STATUS}'
                where
                    order_cd in (
                        select
                            order_cd
                        from
                            ksv_po_mem
                        where
                            po_cd = '${tInputObj.PO_CD}'
                            and po_seq = '1'
                    )
                    and order_status <> '4'
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
                tObj.CODE = `SUCCEE:PO_FIX:${updatePO_STATUS}:${tInputObj.PO_CD}`;
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

export default moduleMutation_S040201_3;
