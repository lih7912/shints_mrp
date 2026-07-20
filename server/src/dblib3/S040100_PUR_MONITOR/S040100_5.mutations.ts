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
const moduleMutation_S040100_5 = {
    Mutation: {
        mgrInsert_S040100_5_1: async (_, args, contextValue) => {
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
            /*
      var tYY = 'PUS' + yyyy.toString().substring(2) + '-';
      var tYY0 = `${tYY}00000`;

      var sql0 = `
          select
              isnull(max(pu_cd), '${tYY0}') as max_seq
          from
              ksv_pu_mst2
          where
              pu_cd like '${tYY}%';
      `;
      var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
      var tMaxSeq = parseInt(nRet0[0].max_seq.substring(6, 10)) + 1;

      var tZero = '0000';
*/

            var tYY2 = tRetDate.substring(2, 4);
            var tSEQ = tRetDate.substring(4, 14);

            var tZero = '000000';
            var tNewCd = `PU${tYY2}-${tSEQ}`;
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
                            po_price = '${col.PO_PRICE}',
                            due_date
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

        mgrInsert_S040100_5_pu_mst: async (_, args, contextValue) => {
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

            var tInput = { ...args.datas1[0] }; // Pu List
            var tInput1 = { ...args.datas2[0] }; // Detail Matl List
            var tInput0 = { ...args.datas }; // Edit

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

            var tYY2 = tRetDate.substring(2, 4);

            var tZero = '000000';
            var tNewCd = `PU${tYY2}-`;
            tNewCd += tInput.BUYER_CD;
            var tPuSeq = 1;
            var sqlPuSeq = `
                select
                    isnull(max(pu_cd), 'PUXX-YY000000') as max_pu_cd
                from
                    ksv_pu_mst2
                where
                    pu_cd like '${tNewCd}%'
            `;
            var tObjPuSeqs = await prisma.$queryRaw(Prisma.raw(sqlPuSeq));
            var tPuSeqStr = tObjPuSeqs[0].max_pu_cd;
            tPuSeqStr = tPuSeqStr.substring(7, 13);
            tPuSeq = parseInt(tPuSeqStr) + 1;

            var tPuSeqStr0 = String(tPuSeq);
            var tPuSeqStr =
                tZero.substring(0, 6 - tPuSeqStr0.length) + tPuSeqStr0;
            tNewCd += tPuSeqStr;

            console.log('New Cd:' + tNewCd);

            var sql1 = `
                select
                    a.pay_type,
                    a.pay_term,
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
            var tPayTerm = '';
            if (nRet1.length > 0) {
                tPayType = nRet1[0].pay_type;
                tPayTerm = nRet1[0].pay_term;
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

            var tLC_AMT = 0;
            var tLC_QTY = 0;
            var tLC_QTY1 = 0;

            // pu list
            var sql3 = `
                select
                    max(pu_seq) as max_pu_seq
                from
                    ksv_pu_mem2
                where
                    pu_cd = '${tInput0.PU_CD}'
            `;
            var nRet3 = await prisma.$queryRaw(Prisma.raw(sql3));
            var tPuSeq = 1;
            if (nRet3.length > 0) tPuSeq = nRet3[0].max_pu_seq + 1;

            if (tInput0.PU_CD !== '') tNewCd = tInput0.PU_CD;

            var tPoArray = [];
            var tIdx0 = 0;
            for (tIdx0 = 0; tIdx0 < args.datas1.length; tIdx0++) {
                var col = { ...args.datas1[tIdx0] };

                if (tIdx0 === 0) tPoCd2 = col.PO_CD;
                else tPoCd2 += `/${col.PO_CD}`;

                tPoArray.push(col.PO_CD);

                var sql2 = `
                    select
                        max(po_seq) as max_po_seq
                    from
                        ksv_po_mst
                    where
                        po_cd = '${col.PO_CD}'
                `;
                var nRet2 = await prisma.$queryRaw(Prisma.raw(sql2));
                var tPoSeq = 1;
                if (nRet2.length > 0) tPoSeq = nRet2[0].max_po_seq;

                var tInObj = {};
                tInObj.PU_CD = tNewCd;
                tInObj.PU_SEQ = tPuSeq;
                tInObj.PO_CD = col.PO_CD;
                tInObj.PO_SEQ = tPoSeq;
                tInObj.VENDOR_CD = col.VENDOR_CD;
                tInObj.REG_DATETIME = tRetDate;
                tInObj.REG_USER = tUserInfo.USER_ID;
                tInObj.PO_QTY = col.PO_QTY;
                let tSQL99 = AFLib.createTableSql('ksv_pu_mem2', tInObj);
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    update ksv_po_vendor
                    set
                        pu_cd = '${tNewCd}'
                    where
                        po_cd = '${col.PO_CD}'
                        and vendor_cd = '${col.VENDOR_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            }

            var sql8_2 = `
                select
                    isnull(max(a.mrp_seq), 0) as max_mrp_seq
                from
                    ksv_po_mrp a
                where
                    a.po_cd = '${col.PO_CD}'
            `;
            var nRet8_2 = await prisma.$queryRaw(Prisma.raw(sql8_2));
            var tNewMrpSeq = 0;
            if (nRet8_2.length > 0) tNewMrpSeq = nRet8_2[0].max_mrp_seq;

            // matl list Update
            for (tIdx0 = 0; tIdx0 < args.datas2.length; tIdx0++) {
                var col = { ...args.datas2[tIdx0] };

                // if (parseFloat(col.PO_UPDATE_QTY) <= 0) continue;

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

                // tMRP_DATE = nRet1[0].MRP_DATE;
                tMRP_DATE = tInput.MRP_DATE;
                tTARGET_ETA = nRet1[0].TARGET_ETA;
                tFACTORY_CD = nRet1[0].FACTORY_CD;
                if (tTARGET_ETA === null) tTARGET_ETA = tMRP_DATE;

                if (col.PU_CD !== '') {
                    var tUpdatePoQty =
                        parseFloat(col.PO_QTY) + parseFloat(col.DIFF_QTY);

                    let tSQL99 = `
                        update ksv_stock_mem2
                        set
                            po_seq = '${col.PO_SEQ}',
                            moq = '${col.MOQ_QTY}',
                            po_qty = '${col.MRP_QTY}',
                            stock_qty = '${col.STOCK_QTY}',
                            po_qty2 = '${tUpdatePoQty}',
                            -- po_qty2 = '${col.PO_QTY}',
                            -- lc_qty = '${tLC_QTY}',
                            curr_cd = '${col.CURR_CD}',
                            master_price = '${col.MASTER_PRICE}',
                            surcharge_price = '${col.SURCHARGE_PRICE}',
                            surcharge_amt = '${col.SURCHARGE_AMT}',
                            surcharge_remark = '${col.SURCHARGE_REMARK}',
                            po_price = '${col.PO_PRICE}'
                        where
                            po_cd = '${col.PO_CD}'
                            -- and  order_cd='${col.ORDER_CD}' 
                            and vendor_cd = '${tInput.VENDOR_CD}'
                            and matl_cd = '${col.MATL_CD}'
                            and pu_cd = '${col.PU_CD}'
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
                                surcharge_price,
                                surcharge_amt,
                                surcharge_remark,
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
                                '0',
                                '0',
                                '0',
                                '0',
                                '0',
                                '${col.CURR_CD}',
                                '${col.MASTER_PRICE}',
                                '${col.SURCHARGE_PRICE}',
                                '${col.SURCHARGE_AMT}',
                                '${col.SURCHARGE_REMARK}',
                                '${col.PO_PRICE}'
                            )
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }
            }

            var tETA = tMRP_DATE;
            var tPuStatus = '-';

            if (tInput0.PU_CD === '') {
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
                            ORIGIN_PORT,
                            DUE_DATE,
                            EX_FACTORY
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
                            '${tInput.VENDOR_MATL_TYPE}',
                            '${tInput0.BILL_TO}',
                            '${tInput0.SHIP_TO}',
                            '${tInput0.CURR_CD}',
                            '0',
                            '0',
                            '${tInput0.NORMI}',
                            '${tInput0.TRADE_TERM}',
                            '${tInput0.ORDER_DATE}',
                            '${tInput0.DUE_DATE}',
                            '${tInput0.FORWARDER}',
                            '',
                            '${tPoCd2}',
                            '${tTARGET_ETA}',
                            '1',
                            '${tInput0.PI_NO}',
                            '${tInput0.EX_FACTORY}',
                            '${tInput0.PAY_DATE}',
                            '${tTARGET_ETA}',
                            '${tMRP_DATE}',
                            '0',
                            '0',
                            '${tInput0.PAY_AMT}',
                            '${tPayType}',
                            '${tPayBank}',
                            '${tInput0.ORIGIN_PORT}',
                            '${tInput0.DUE_DATE}',
                            '${tInput0.EX_FACTORY}'
                        )
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                var tPlanFlag = '0';
                if (tTARGET_ETA !== '' && tInput0.DUE_DATE !== '')
                    tPlanFlag = '1';
                var tIdx3 = 0;
                for (tIdx3 = 0; tIdx3 < tPoArray.length; tIdx3++) {
                    var tPoCd0 = tPoArray[tIdx3];
                    let tSQL99 = `
                        update ksv_po_mst
                        set
                            plan_flag = '${tPlanFlag}',
                            plan_etd = '${tInput0.DUE_DATE}',
                            plan_eta = '${tTARGET_ETA}'
                        where
                            po_cd = '${tPoCd0}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }
            } else {
                let tSQL99 = `
                    update ksv_pu_mst2
                    set
                        BILL_TO = '${tInput0.BILL_TO}',
                        SHIP_TO = '${tInput0.SHIP_TO}',
                        CURR_CD = '${tInput0.CURR_CD}',
                        -- DEPOSIT_AMT = '${tInput.DEPOSIT_AMT}',
                        NORMI = '${tInput0.NORMI}',
                        TRADE_TERM = '${tInput0.TRADE_TERM}',
                        ORDER_DATE = '${tInput0.ORDER_DATE}',
                        -- DELIVERY_DATE = '${tInput.DELIVERY_DATE}',
                        FORWARD = '${tInput0.FORWARDER}',
                        PO_CD2 = '${tPoCd2}',
                        TARGET_ETA = '${tTARGET_ETA}',
                        PI_NO = '${tInput0.PI_NO}',
                        EXP_DELIVERY_DATE = '${tInput0.EX_FACTORY}',
                        PAY_DATE = '${tInput0.PAY_DATE}',
                        -- LC_FLAG = '${tInput.LC_FLAG}',
                        -- LC_AMT = '${tLC_AMT}',
                        -- PU_AMT = '${tInput.PAY_AMT}',
                        ORIGIN_PORT = '${tInput0.ORIGIN_PORT}',
                        DUE_DATE = '${tInput0.DUE_DATE}',
                        EX_FACTORY = '${tInput0.EX_FACTORY}'
                    where
                        PU_CD = '${tInput0.PU_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                // tSQLArray.push(tSQL99_1);
                tNewCd = tInput.PU_CD;

                var tPlanFlag = '0';
                if (tTARGET_ETA !== '' && tInput0.DUE_DATE !== '')
                    tPlanFlag = '1';
                var tIdx3 = 0;
                for (tIdx3 = 0; tIdx3 < tPoArray.length; tIdx3++) {
                    var tPoCd0 = tPoArray[tIdx3];
                    let tSQL99 = `
                        update ksv_po_mst
                        set
                            plan_flag = '${tPlanFlag}',
                            plan_etd = '${tInput0.DUE_DATE}',
                            plan_eta = '${tTARGET_ETA}'
                        where
                            po_cd = '${tPoCd0}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }
            }

            var tIdx1 = 0;
            for (tIdx1 = 0; tIdx1 < args.datas2.length; tIdx1++) {
                var col = { ...args.datas2[tIdx1] };

                var tSQL0 = '';
                var tUpdatePuCd = '';
                if (tInput0.PU_CD === '') {
                    tUpdatePuCd = tNewCd;
                    tSQL0 = ` and  (pu_cd  is null or pu_cd = '')`;
                } else {
                    tUpdatePuCd = tInput0.PU_CD;
                    tSQL0 = ` and  pu_cd = '${tInput0.PU_CD}' `;
                }

                let tSQL99 = `
                    update ksv_po_mrp
                    set
                        pu_cd = '${tUpdatePuCd}',
                        pu_seq = '${tPuSeq}'
                    where
                        po_cd = '${col.PO_CD}'
                        and matl_cd = '${col.MATL_CD}'
                        and (
                            pu_cd is null
                            or pu_cd = ''
                        )
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    update ksv_stock_mem
                    set
                        pu_cd = '${tUpdatePuCd}'
                    where
                        po_cd = '${col.PO_CD}'
                        and matl_cd = '${col.MATL_CD}'
                        -- and   (pu_cd is null or  pu_cd = '')
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
                tObj.CODE = 'ERROR:STOCK_IN';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            // MOQ 처리
            tIdx1 = 0;
            for (tIdx1 = 0; tIdx1 < args.datas2.length; tIdx1++) {
                var col = { ...args.datas2[tIdx1] };
                // MOQ 처리
                if (parseFloat(col.MOQ_QTY) > 0) {
                    tSQLArray = [];

                    var sql8_3 = `
                        select
                            order_cd
                        from
                            ksv_po_mem
                        where
                            po_cd = '${col.PO_CD}'
                    `;
                    var nRet8_3 = await prisma.$queryRaw(Prisma.raw(sql8_3));

                    var tMoqOrder =
                        nRet8_3[0].order_cd.substring(0, 2) + 'Minimum';
                    var tMoqPoSeq = 99;

                    var sql8_0 = `
                        select
                            po_cd,
                            po_seq
                        from
                            ksv_po_mst
                        where
                            po_cd = '${col.PO_CD}'
                            and po_seq = '${tMoqPoSeq}'
                    `;
                    var nRet8_0 = await prisma.$queryRaw(Prisma.raw(sql8_0));

                    var sql8_1 = `
                        select
                            po_cd,
                            po_seq,
                            matl_cd,
                            mrp_seq
                        from
                            ksv_po_mrp
                        where
                            po_cd = '${col.PO_CD}'
                            and order_cd = '${tMoqOrder}'
                            and matl_cd = '${col.MATL_CD}'
                    `;
                    var nRet8_1 = await prisma.$queryRaw(Prisma.raw(sql8_1));

                    if (nRet8_1.length > 0) {
                        var tOne = { ...nRet8_1[0] };
                        let tSQL99 = `
                            update ksv_po_mrp
                            set
                                use_qty = '${col.MOQ_QTY}',
                                po_qty = '${col.MOQ_QTY}',
                                pu_cd = '${tNewCd}'
                            where
                                po_cd = '${tOne.po_cd}'
                                and po_seq = '${tOne.po_seq}'
                                and matl_cd = '${tOne.matl_cd}'
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);

                        let tSQL99 = `
                            update ksv_stock_mem
                            set
                                po_qty = '${col.MOQ_QTY}',
                                pu_cd = '${tNewCd}'
                            where
                                po_cd = '${tOne.po_cd}'
                                and po_seq = '${tOne.po_seq}'
                                and matl_cd = '${tOne.matl_cd}'
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);
                    } else {
                        tNewMrpSeq += 1;

                        let tSQL99 = `
                            insert into
                                ksv_po_mrp (
                                    po_cd,
                                    po_seq,
                                    order_cd,
                                    matl_cd,
                                    mrp_seq,
                                    matl_seq,
                                    matl_price,
                                    use_size,
                                    use_qty,
                                    po_qty,
                                    bef_po_qty,
                                    diff_qty,
                                    diff_po_type,
                                    change_reason,
                                    use_po_type,
                                    curr_cd,
                                    tot_amt,
                                    curr_date,
                                    usd_amt,
                                    status_cd,
                                    reg_user,
                                    reg_datetime,
                                    pu_cd
                                )
                            values
                                (
                                    '${col.PO_CD}',
                                    '${tMoqPoSeq}',
                                    '${tMoqOrder}',
                                    '${col.MATL_CD}',
                                    '${tNewMrpSeq}',
                                    '1',
                                    '${col.MASTER_PRICE}',
                                    '',
                                    '${col.MOQ_QTY}',
                                    '${col.MOQ_QTY}',
                                    '0',
                                    '0',
                                    '0',
                                    '',
                                    '1',
                                    '${col.CURR_CD}',
                                    '0',
                                    '',
                                    '0',
                                    '0',
                                    '${tUserInfo.USER_ID}',
                                    '${tRetDate}',
                                    '${tNewCd}'
                                )
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);

                        let tSQL99 = `
                            INSERT INTO
                                KSV_STOCK_MEM (
                                    PO_CD,
                                    PO_SEQ,
                                    ORDER_CD,
                                    MATL_CD,
                                    MRP_SEQ,
                                    MATL_SEQ,
                                    PO_QTY,
                                    IN_QTY,
                                    OUT_QTY,
                                    INFAC_QTY,
                                    OUTFAC_QTY,
                                    REMAIN_QTY,
                                    use_qty,
                                    FACTORY_CD,
                                    DIFF_PO_TYPE,
                                    diff_qty,
                                    STOCK_STATUS,
                                    STATUS_CD,
                                    REG_USER,
                                    REG_DATETIME,
                                    min_order,
                                    pu_cd
                                )
                            VALUES
                                (
                                    '${col.PO_CD}',
                                    '${tMoqPoSeq}',
                                    '${tMoqOrder}',
                                    '${col.MATL_CD}',
                                    '${tNewMrpSeq}',
                                    '1',
                                    '${col.MOQ_QTY}',
                                    '${col.MOQ_QTY}',
                                    '0',
                                    '0',
                                    '0',
                                    '0',
                                    '0',
                                    '${tFACTORY_CD}',
                                    '0',
                                    '0',
                                    '0',
                                    '0',
                                    '${tUserInfo.USER_ID}',
                                    '${tRetDate}',
                                    '${nRet8_3[0].ORDER_CD}',
                                    '${tNewCd}'
                                )
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);

                        if (nRet8_0.length <= 0) {
                            var sql8_5 = `
                                select
                                    *
                                from
                                    ksv_po_mst
                                where
                                    po_cd = '${col.PO_CD}'
                                    and po_seq = 1
                            `;
                            var nRet8_5 = await prisma.$queryRaw(
                                Prisma.raw(sql8_5),
                            );

                            var tInObj = { ...nRet8_5[0] };
                            delete tInObj.id;
                            tInObj.PO_SEQ = tMoqPoSeq;
                            tInObj.PO_DATE = tRetDate1;
                            tInObj.CURR_DATE = tRetDate1;
                            tInObj.REG_USER = tUserInfo.USER_ID;
                            tInObj.REG_DATETIME = tRetDate;
                            let tSQL99 = AFLib.createTableSql(
                                'ksv_po_mst',
                                tInObj,
                            );
                            const tSQL99_1 = prisma.$queryRaw(
                                Prisma.raw(tSQL99),
                            );
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
                    } catch (e) {
                        var tRetArray = [];
                        var tObj = {};
                        tObj.CODE = `ERROR:Purchase Insert Error:${e.message}`;
                        tObj.id = 0;
                        tRetArray.push(tObj);
                        return tRetArray;
                    }
                }
            }

            tSQLArray = [];
            let tSQL99 = `
                insert into
                    ksv_stock_mem2_log (
                        pu_cd,
                        pu_seq,
                        po_cd,
                        po_seq,
                        matl_cd,
                        po_qty,
                        stock_qty,
                        po_qty2,
                        moq,
                        curr_cd,
                        master_price,
                        freight_price,
                        other_price,
                        po_price,
                        surcharge_remark,
                        moq_price,
                        leftover_qty,
                        foc_qty,
                        moq_stock_idx,
                        foc_stock_idx,
                        leftover_stock_idx,
                        moq_amt,
                        other_amt,
                        freight_amt,
                        shortage_qty,
                        defect_qty,
                        moq_confirm,
                        moq_amt_confirm,
                        freight_amt_confirm,
                        other_amt_confirm,
                        surcharge_price,
                        surcharge_amt,
                        reason
                    )
                select
                    '${tNewCd}',
                    '${tPuSeq}',
                    po_cd,
                    po_seq,
                    matl_cd,
                    po_qty,
                    stock_qty,
                    po_qty2,
                    moq,
                    curr_cd,
                    master_price,
                    freight_price,
                    other_price,
                    po_price,
                    surcharge_remark,
                    moq_price,
                    leftover_qty,
                    foc_qty,
                    moq_stock_idx,
                    foc_stock_idx,
                    leftover_stock_idx,
                    moq_amt,
                    other_amt,
                    freight_amt,
                    shortage_qty,
                    defect_qty,
                    moq_confirm,
                    moq_amt_confirm,
                    freight_amt_confirm,
                    other_amt_confirm,
                    surcharge_price,
                    surcharge_amt,
                    reason
                from
                    ksv_stock_mem2
                where
                    pu_cd = '${tNewCd}'
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
                tObj.CODE = 'SUCCEED:STOCK_IN:' + tNewCd;
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

        mgrInsert_S040100_5_3: async (_, args, contextValue) => {
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

        mgrInsert_S040100_5_4: async (_, args, contextValue) => {
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

        mgrDelete_S040100_5: async (_, args, contextValue) => {
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

export default moduleMutation_S040100_5;
