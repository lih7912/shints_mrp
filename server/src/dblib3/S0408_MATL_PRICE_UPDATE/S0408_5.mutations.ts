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
const moduleMutation_S0408_5 = {
    Mutation: {
        mgrInsert_S0408_5: async (_, args, contextValue) => {
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

            var tPoCd = '';
            var tSQLArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var tInput = { ...args.datas[tIdx] };
                tInput.USER_ID = AFLib.getUserInfo(contextValue).USER_ID;
                tInput.PAY_DATE = tNewDateStr;
                var tPoCd = tInput.PO_CD;

                var tInputQty = parseInt(tInput.IN_QTY);
                var tTotQty = parseInt(tInput.TOT_QTY);

                var tPoQty = parseInt(tInput.PO_QTY);
                var tBefInQty = parseInt(tInput.BEF_QTY);
                var tRemainQty = parseInt(tInput.REMAIN_QTY);

                if (tInput.MATL_NEGO_PRICE <= 0) continue;
                if (tInput.BEF_PRICE > 0) continue;

                let tSQL0 = `
                    select
                        count(*) as cnt
                    from
                        ksv_stock_in
                    where
                        po_cd = '${tInput.PO_CD}'
                        and matl_cd = '${tInput.MATL_CD}'
                        and matl_seq = ${tInput.MATL_SEQ}
                        and calc_flag = '1'
                `;
                let nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL0));
                if (nRet0[0].cnt > 0) {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = 'ERROR: already taxbill.';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }

                let tSQL0 = `
                    SELECT
                        count(*) as cnt
                    FROM
                        ksv_order_mst a,
                        ksv_po_mem b
                    where
                        b.po_cd = '${tInput.PO_CD}'
                        and a.order_cd = b.order_cd
                        and a.order_status > '7'
                `;
                let nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL0));
                if (nRet0[0].cnt > 0) {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = 'ERROR: already order end.';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }

                if (tInput.CONF_FLAG !== '1') {
                    let tSQL99 = `
                        update kcd_matl_mem
                        set
                            matl_price = ${tInput.MATL_NEGO_PRICE},
                            conf_flag = 'W',
                            curr_cd = '${tInput.CURR_CD}',
                            upd_user = '${tInput.USER_ID}',
                            upd_datetime = '${tRetDate}',
                            remark = '${tInput.REMARK}'
                        where
                            matl_cd = '${tInput.MATL_CD}'
                            and matl_seq = ${tInput.MATL_SEQ}
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
                        update ksv_po_mrp
                        set
                            matl_price = ${tInput.MATL_NEGO_PRICE},
                            curr_cd = '${tInput.CURR_CD}',
                            tot_amt = po_qty * ${tInput.MATL_NEGO_PRICE}
                        where
                            matl_cd = '${tInput.MATL_CD}'
                            and matl_seq = ${tInput.MATL_SEQ}
                            and po_cd = '${tInput.PO_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
                        update ksv_stock_in
                        set
                            pay_price = ${tInput.MATL_NEGO_PRICE},
                            pay_curr_cd = '${tInput.CURR_CD}'
                        where
                            matl_cd = '${tInput.MATL_CD}'
                            and po_cd = '${tInput.PO_CD}'
                            and matl_seq = ${tInput.MATL_SEQ}
                            and end_flag <> '1'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
                        update ksv_stock_in
                        set
                            in_price = ${tInput.MATL_NEGO_PRICE},
                            in_curr_cd = '${tInput.CURR_CD}'
                        where
                            matl_cd = '${tInput.MATL_CD}'
                            and po_cd = '${tInput.PO_CD}'
                            and matl_seq = ${tInput.MATL_SEQ}
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                } else {
                    let tSQL0 = `
                        select
                            matl_cd
                        from
                            kcd_matl_mem
                        where
                            matl_cd = '${tInput.MATL_CD}'
                            and po_cd = '${tInput.PO_CD}'
                            and matl_seq = ${tInput.MATL_SEQ}
                            and matl_price = ${tInput.MATL_NEGO_PRICE}
                            and curr_cd = '${tInput.CURR_CD}'
                    `;
                    let nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL0));
                    var tNewMatlSeq = 0;
                    if (nRet0.length <= 0) {
                        tNewMatlSeq = tInput.MAX_MATL_SEQ + 1;
                        let tSQL99 = `
                            INSERT INTO
                                KCD_MATL_MEM (
                                    MATL_CD,
                                    MATL_SEQ,
                                    MATL_PRICE,
                                    CURR_CD,
                                    conf_flag,
                                    price_type,
                                    REG_USER,
                                    REG_DATETIME,
                                    UPD_USER,
                                    UPD_DATETIME
                                )
                            VALUES
                                (
                                    '${tInput.MATL_CD}',
                                    ${tNewMatlSeq},
                                    ${tInput.MATL_NEGO_PRICE},
                                    '${tInput.CURR_CD}',
                                    'W',
                                    '${tInput.TYPE}',
                                    '${tInput.USER_ID}',
                                    '${tRetDate}',
                                    '${tInput.USER_ID}',
                                    '${tRetDate}'
                                )
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);
                    } else {
                        tNewMatlSeq = tInput.MAX_MATL_SEQ;
                    }

                    let tSQL99 = `
                        update ksv_po_mrp
                        set
                            matl_price = ${tInput.MATL_NEGO_PRICE},
                            curr_cd = '${tInput.CURR_CD}',
                            tot_amt = po_qty * ${tInput.MATL_NEGO_PRICE},
                            matl_seq = ${tNewMatlSeq}
                        where
                            matl_cd = '${tInput.MATL_CD}'
                            and matl_seq = ${tInput.MATL_SEQ}
                            and po_cd = '${tInput.PO_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
                        update ksv_stock_in
                        set
                            pay_price = ${tInput.MATL_NEGO_PRICE},
                            pay_curr_cd = '${tInput.CURR_CD}' matl_seq = ${tNewMatlSeq}
                        where
                            matl_cd = '${tInput.MATL_CD}'
                            and po_cd = '${tInput.PO_CD}'
                            and matl_seq = ${tInput.MATL_SEQ}
                            and pay_price = in_price
                            and end_flag <> '1'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
                        update ksv_stock_in
                        set
                            in_price = ${tInput.MATL_NEGO_PRICE},
                            in_curr_cd = '${tInput.CURR_CD}' matl_seq = ${tNewMatlSeq}
                        where
                            matl_cd = '${tInput.MATL_CD}'
                            and po_cd = '${tInput.PO_CD}'
                            and matl_seq = ${tInput.MATL_SEQ}
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
                        update ksv_stock_mem
                        set
                            matl_seq = ${tNewMatlSeq}
                        where
                            matl_cd = '${tInput.MATL_CD}'
                            and po_cd = '${tInput.PO_CD}'
                            and matl_seq = ${tInput.MATL_SEQ}
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
                tObj.CODE = 'SUCCEED:Price Update:' + args.datas.length;
                tObj.id = 0;
                tRetArray.push(tObj);
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Price Update';
                tObj.id = 0;
                tRetArray.push(tObj);
            }

            return tRetArray;
        },
    },
};

export default moduleMutation_S0408_5;
