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
const moduleMutation_S0401_5 = {
    Mutation: {
        mgrInsert_S0401_UPDATE_END: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tSQLArray = [];

            var tIdx0 = 0;
            for (tIdx0 = 0; tIdx0 < args.datas.length; tIdx0++) {
                var tOne = { ...args.datas[tIdx0] };

                var sql0 = `
                    select
                        *
                    from
                        ksv_pu_mst2
                    where
                        pu_cd = '${tOne.PU_CD}'
                `;
                var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                if (nRet0.length <= 0) continue;
                var tPuObj = { ...nRet0[0] };

                var tPuStatus = '';
                if (tPuObj.PU_STATUS === 'END') tPuStatus = '';
                else tPuStatus = 'END';

                let tSQL99 = `
                    update ksv_pu_mst2
                    set
                        pu_status = '${tPuStatus}'
                    where
                        pu_cd = '${tOne.PU_CD}'
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
                tObj.CODE = 'SUCCEED:Process Pu End:';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Process Pu End';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },
        mgrInsert_S0401_5_1: async (_, args, contextValue) => {
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

            var sql0 = `
                select
                    isnull(max(pu_cd), 'PUS23-00000') as max_seq
                from
                    ksv_pu_mst2
                where
                    pu_cd like 'PUS23-%';
            `;
            var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            var tMaxSeq = parseInt(nRet0[0].max_seq.substring(6, 10)) + 1;

            var tZero = '0000';
            // var tNewCd = 'PUS23-' + tZero.substring(0, 4-String(tMaxSeq).length) + String(tMaxSeq);
            var tNewCd = 'PUS23-' + tRetDate;
            console.log('New Cd:' + tNewCd);

            var tInput = { ...args.datas[0] };
            var tInput1 = { ...args.datas1[0] };

            var sql1 = `
                select
                    a.pay_type,
                    b.bank_cd
                from
                    kcd_vendor a,
                    kcd_vendor_bank b
                where
                    a.vendor_cd = '${tInput.VENDOR_CD}'
                    and a.vendor_cd = b.vendor_cd
            `;
            var nRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
            var tPayType = '';
            var tPayBank = '';
            if (nRet1.length > 0) {
                // tPayType = nRet1[0].pay_type;
                tPayType = '';
                tPayBank = nRet1[0].bank_cd;
            }

            var tSQLArray = [];

            var tTARGET_ETA = '';
            var tMRP_DATE = '';
            var tFACTORY_CD = '';
            var tETA = '';
            var tPoCd2 = '';
            var tIdx1 = 0;
            var tSavePoCd = '';
            var tPoCdArray = [];

            var tIdx0 = 0;
            for (tIdx0 = 0; tIdx0 < args.datas1.length; tIdx0++) {
                var col = { ...args.datas1[tIdx0] };
                var tFlag = 0;
                var tArray1 = [...tPoCdArray];
                tArray1.forEach((col1, i) => {
                    if (col1 === col.PO_CD) tFlag = 1;
                });
                if (tFlag === 0) {
                    if (tPoCdArray.length <= 0) tPoCd2 = col.PO_CD;
                    else tPoCd2 += '/' + col.PO_CD;
                    tPoCdArray.push(col.PO_CD);
                }

                var sql1 = `
                    select
                        c.FACTORY_CD,
                        left(b.REG_DATETIME, 8) as MRP_DATE,
                        max(c.MATL_DUE_DATE) as TARGET_ETA
                    from
                        KSV_PO_MST a,
                        KSV_STOCK_MST b,
                        KSV_ORDER_MST c,
                        KSV_PO_MEM d
                    where
                        a.PO_CD = '${col.PO_CD}'
                        and a.PO_SEQ = 1
                        and a.PO_CD = b.PO_CD
                        and b.PO_SEQ = 1
                        and a.PO_CD = d.PO_CD
                        and d.PO_SEQ = 1
                        and d.order_cd = c.order_cd
                    group by
                        c.FACTORY_CD,
                        left(b.REG_DATETIME, 8)
                `;
                var nRet1 = await prisma.$queryRaw(Prisma.raw(sql1));

                tMRP_DATE = nRet1[0].MRP_DATE;
                tTARGET_ETA = nRet1[0].TARGET_ETA;
                tFACTORY_CD = nRet1[0].FACTORY_CD;
                if (tTARGET_ETA === null) tTARGET_ETA = tMRP_DATE;

                let tSQL99 = `
                    delete from ksv_po_vendor
                    where
                        po_cd = '${col.PO_CD}'
                        and vendor_cd = '${tInput.VENDOR_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
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
                        a.po_cd = '${col.PO_CD}'
                        and a.use_po_type = '1'
                        and a.diff_po_type <> '1'
                        and b.matl_cd = a.matl_cd
                        and c.vendor_cd = b.vendor_cd
                        and c.vendor_cd = '${tInput.VENDOR_CD}'
                        -- and c.vendor_cd not in (select vendor_cd from ksv_po_vendor where po_cd='${col.PO_CD}')
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                var tLC_QTY = '0';
                if (tInput.LC_FLAG === '1') {
                    tLC_QTY = col.PO_QTY;
                }

                if (tInput.PU_CD !== '') {
                    let tSQL99 = `
                        update ksv_stock_mem2
                        set
                            po_seq = '${col.PO_SEQ}',
                            moq = '${col.MOQ_QTY}',
                            po_qty = '${col.MRP_QTY}',
                            stock_qty = '${col.STOCK_QTY}',
                            po_qty2 = '${col.PO_QTY}',
                            lc_qty = '${tLC_QTY}',
                            curr_cd = '${col.CURR_CD}',
                            master_price = '${col.MASTER_PRICE}',
                            moq_amt = '${col.MOQ_AMT}',
                            moq_price = '${col.MOQ_PRICE}',
                            freight_price = '${col.FREIGHT_PRICE}',
                            freight_amt = '${col.FREIGHT_AMT}',
                            other_price = '${col.OTHER_PRICE}',
                            other_amt = '${col.OTHER_AMT}',
                            po_price = '${col.PO_PRICE}'
                        where
                            po_cd = '${col.PO_CD}'
                            -- and  order_cd='${col.ORDER_CD}' 
                            and vendor_cd = '${tInput.VENDOR_CD}'
                            and matl_cd = '${col.MATL_CD}'
                            and pu_cd = '${tInput.PU_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                } else {
                    let tSQL99 = `
                        insert into
                            ksv_stock_mem2 (
                                pu_cd,
                                po_cd,
                                po_seq,
                                order_cd,
                                vendor_cd,
                                matl_cd,
                                moq,
                                po_qty,
                                stock_qty,
                                po_qty2,
                                lc_qty,
                                in_qty,
                                out_qty,
                                infac_qty,
                                outfac_qty,
                                curr_cd,
                                master_price,
                                moq_amt,
                                moq_price,
                                freight_price,
                                freight_amt,
                                other_price,
                                other_amt,
                                po_price
                            )
                        values
                            (
                                '${tNewCd}',
                                '${col.PO_CD}',
                                '${col.PO_SEQ}',
                                '${col.ORDER_CD}',
                                '${tInput.VENDOR_CD}',
                                '${col.MATL_CD}',
                                '${col.MOQ_QTY}',
                                '${col.MRP_QTY}',
                                '${col.STOCK_QTY}',
                                '${col.PO_QTY}',
                                '${tLC_QTY}',
                                '0',
                                '0',
                                '0',
                                '0',
                                '${col.CURR_CD}',
                                '${col.MASTER_PRICE}',
                                '${col.MOQ_AMT}',
                                '${col.MOQ_PRICE}',
                                '${col.FREIGHT_PRICE}',
                                '${col.FREIGHT_AMT}',
                                '${col.OTHER_PRICE}',
                                '${col.OTHER_AMT}',
                                '${col.PO_PRICE}'
                            )
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }
            }

            var tETA = tMRP_DATE;
            var tPuStatus = '-';

            var tLC_AMT = 0;
            if (tInput.LC_FLAG === '1') {
                tLC_AMT = parseFloat(tInput.PAY_AMT);
            }

            if (tInput.PU_CD === '') {
                let tSQL99 = `
                    insert into
                        KSV_PU_MST2 (
                            PU_CD,
                            VENDOR_CD,
                            BUYER_CD,
                            FACTORY_CD,
                            REG_USER,
                            REG_DATETIME,
                            PU_STATUS,
                            MATL_TYPE,
                            BILL_TO,
                            SHIP_TO,
                            CURR_CD,
                            DEPOSIT_AMT,
                            DEPOSIT_FIX,
                            NORMI,
                            TRADE_TERM,
                            ORDER_DATE,
                            DELIVERY_DATE,
                            FORWARD,
                            SHIP_MODE,
                            PO_CD2,
                            TARGET_ETA,
                            PU_TYPE,
                            PI_NO,
                            EXP_DELIVERY_DATE,
                            PAY_DATE,
                            ETA,
                            MRP_DATE,
                            LC_FLAG,
                            LC_AMT,
                            PU_AMT,
                            PAY_TYPE,
                            PAY_BANK,
                            ORIGIN_PORT
                        )
                    values
                        (
                            '${tNewCd}',
                            '${tInput.VENDOR_CD}',
                            '${tInput.BUYER_CD}',
                            '${tFACTORY_CD}',
                            '${tUserInfo.USER_ID}',
                            '${tRetDate}',
                            '${tPuStatus}',
                            '${tInput.MATL_TYPE}',
                            '${tInput.BILL_TO}',
                            '${tInput.SHIP_TO}',
                            '${tInput1.CURR_CD}',
                            '${tInput.DEPOSIT_AMT}',
                            '0',
                            '${tInput.NORMI}',
                            '${tInput.TRADE_TERM}',
                            '${tInput.ORDER_DATE}',
                            '${tInput.DELIVERY_DATE}',
                            '${tInput.PLACE_CD}',
                            '${tInput.SHIP_MODE}',
                            '${tInput.PO_CD2}',
                            '${tTARGET_ETA}',
                            '1',
                            '${tInput.PI_NO}',
                            '${tInput.EXP_DELIVERY_DATE}',
                            '${tInput.PAY_DATE}',
                            '${tETA}',
                            '${tMRP_DATE}',
                            '${tInput.LC_FLAG}',
                            '${tLC_AMT}',
                            '${tInput.PAY_AMT}',
                            '${tPayType}',
                            '${tPayBank}',
                            '${tInput.ORIGIN_PORT}'
                        )
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                tPoCdArray.forEach((col, i) => {
                    let tSQL99 = `
                        insert into
                            ksv_pu_mem2 (PU_CD, PO_CD, PO_SEQ)
                        values
                            ('${tNewCd}', '${col}', '1');
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                });
            } else {
                let tSQL99 = `
                    update ksv_pu_mst2
                    set
                        BILL_TO = '${tInput.BILL_TO}',
                        SHIP_TO = '${tInput.SHIP_TO}',
                        CURR_CD = '${tInput1.CURR_CD}',
                        -- DEPOSIT_AMT = '${tInput.DEPOSIT_AMT}',
                        NORMI = '${tInput.NORMI}',
                        TRADE_TERM = '${tInput.TRADE_TERM}',
                        ORDER_DATE = '${tInput.ORDER_DATE}',
                        DELIVERY_DATE = '${tInput.DELIVERY_DATE}',
                        FORWARD = '${tInput.PLACE_CD}',
                        PO_CD2 = '${tInput.PO_CD2}',
                        TARGET_ETA = '${tTARGET_ETA}',
                        PI_NO = '${tInput.PI_NO}',
                        EXP_DELIVERY_DATE = '${tInput.EXP_DELIVERY_DATE}',
                        PAY_DATE = '${tInput.PAY_DATE}',
                        -- LC_FLAG = '${tInput.LC_FLAG}',
                        -- LC_AMT = '${tLC_AMT}',
                        -- PU_AMT = '${tInput.PAY_AMT}',
                        ORIGIN_PORT = '${tInput.ORIGIN_PORT}'
                    where
                        PU_CD = '${tInput.PU_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
                tNewCd = tInput.PU_CD;
            }

            var tIdx1 = 0;
            for (tIdx1 = 0; tIdx1 < args.datas1.length; tIdx1++) {
                var col = { ...args.datas1[tIdx1] };
                /*
         var tPO_QTY2 = col.MRP_QTY - col.STOCK_QTY + col.MOQ_QTY;
         tPO_QTY2 = AFLib.getFloat(tPO_QTY2, 2);

         var tMOQ_PRICE = col.MOQ_PRICE / tPO_QTY2;
         tMOQ_PRICE = AFLib.getFloat(tMOQ_PRICE, 4);

         var tFREIGHT_PRICE = col.FREIGHT_PRICE / tPO_QTY2;
         tFREIGHT_PRICE = AFLib.getFloat(tFREIGHT_PRICE, 4);


         var tOTHER_PRICE = col.OTHER_PRICE / tPO_QTY2;
         tOTHER_PRICE = AFLib.getFloat(tOTHER_PRICE, 4);

         var tPO_PRICE = col.MASTER_PRICE + tMOQ_PRICE + tFREIGHT_PRICE + tOTHER_PRICE;
         tPO_PRICE = AFLib.getFloat(tPO_PRICE, 4);
*/

                var tSQL0 = '';
                if (tInput.PU_CD === '') {
                    tSQL0 = ` and  (pu_cd  is null or pu_cd = '')`;
                } else {
                    tSQL0 = ` and  pu_cd = '${tInput.PU_CD}' `;
                }

                var tLC_QTY1 = 0;
                if (tInput.LC_FLAG === '1') tLC_QTY1 = col.PO_QTY;

                let tSQL99 = `
                    update ksv_stock_mem
                    set
                        pu_cd = '${tNewCd}',
                        moq = '${col.MOQ_QTY}',
                        po_qty2 = '${col.PO_QTY}',
                        lc_qty = '${tLC_QTY1}',
                        curr_cd = '${col.CURR_CD}',
                        master_price = '${col.MASTER_PRICE}',
                        moq_price = '${col.MOQ_PRICE}',
                        freight_price = '${col.FREIGHT_PRICE}',
                        other_price = '${col.OTHER_PRICE}',
                        po_price = '${col.PO_PRICE}'
                    where
                        po_cd = '${col.PO_CD}'
                        -- and  po_seq='${col.PO_SEQ}' 
                        -- and  order_cd='${col.ORDER_CD}' 
                        and matl_cd = '${col.MATL_CD}'
                        -- and  mrp_seq='${col.MRP_SEQ}' 
                        -- and  matl_seq='${col.MATL_SEQ}' 
                        and stock_status = '0'
                        -- ${tSQL0}
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

        mgrInsert_S0401_5_3: async (_, args, contextValue) => {
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
            var tInput = { ...args.datas };

            var tSQL = `
                select
                    *
                from
                    ksv_pu_mst2
                where
                    pu_cd = '${tInput.PU_CD}'
            `;
            var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
            var tPuMst2 = {};
            if (nRet0.length > 0) {
                tPuMst2 = nRet0[0];
            }

            if (tPuMst2.LC_FLAG === '1') {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Already LC Input ';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            let tSQL99 = `
                update ksv_pu_mst2
                set
                    DEPOSIT_AMT = '${tInput.DEPOSIT_AMOUNT}',
                    PAY_DATE = '${tInput.PAY_DATE}',
                    PAY_BANK = '${tInput.PAY_BANK}'
                where
                    PU_CD = '${tInput.PU_CD}'
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

        mgrInsert_S0401_5_4: async (_, args, contextValue) => {
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
            var tInput = { ...args.datas };

            var tSQL = `
                select
                    *
                from
                    ksv_pu_mst2
                where
                    pu_cd = '${tInput.PU_CD}'
            `;
            var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
            var tPuMst2 = {};
            if (nRet0.length > 0) {
                tPuMst2 = nRet0[0];
            }

            if (parseFloat(tPuMst2.DEPOSIT_AMT) > 0) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Already Deposit Input ';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            let tSQL99 = `
                update ksv_pu_mst2
                set
                    LC_AMT = '${tInput.AMOUNT}',
                    LC_FLAG = '1'
                where
                    PU_CD = '${tInput.PU_CD}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            let tSQL99 = `
                update ksv_stock_mem
                set
                    lc_qty = po_qty2
                where
                    PU_CD = '${tInput.PU_CD}'
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

        mgrDelete_S0401_5: async (_, args, contextValue) => {
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
                delete from ksv_pu_mst2
                where
                    pu_cd = '${args.datas.PU_CD}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            let tSQL99 = `
                delete from ksv_pu_mem2
                where
                    pu_cd = '${args.datas.PU_CD}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            let tSQL99 = `
                delete from ksv_stock_mem2
                where
                    pu_cd = '${args.datas.PU_CD}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            let tSQL99 = `
                update ksv_stock_mem
                set
                    pu_cd = '',
                    lc_qty = ''
                where
                    pu_cd = '${args.datas.PU_CD}'
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

export default moduleMutation_S0401_5;
