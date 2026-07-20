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
const moduleMutation_S0417_5 = {
    Mutation: {
        mgrInsert_S0417_5: async (_, args, contextValue) => {
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
            var tSQLArray = [];

            let tSQL99 = `
                INSERT INTO
                    KZZ_FREIGHT (
                        FRT_DATE,
                        TRADE_TYPE,
                        departure,
                        destination,
                        FRT_TYPE,
                        AREA_TYPE,
                        MATL_TYPE,
                        PO_CD,
                        ORDER_CD,
                        STYLE_CD,
                        MATL_CD,
                        unit,
                        price,
                        mw,
                        garment_compo,
                        qty,
                        WEIGHT,
                        weight_net,
                        AMOUNT,
                        NET,
                        VAT,
                        adp_check,
                        BL_NO,
                        INVOICE_NO,
                        SENDER,
                        RECEIVER,
                        SPEC,
                        REMARK,
                        REG_USER,
                        REG_DATETIME,
                        DELAY_REASON,
                        charge_kind,
                        charge_code,
                        buyer_cd,
                        curr_cd
                    )
                VALUES
                    (
                        '${tInput.FRT_DATE}',
                        '${tInput.TRADE_TYPE}',
                        '${tInput.DEPARTURE}',
                        '${tInput.DESTINATION}',
                        '${tInput.FRT_TYPE}',
                        '${tInput.AREA_TYPE}',
                        '${tInput.MATL_TYPE}',
                        '${tInput.PO_CD}',
                        '${tInput.ORDER_CD}',
                        '${tInput.STYLE_CD}',
                        '${tInput.MATL_CD}',
                        '${tInput.UNIT}',
                        '${tInput.PRICE}',
                        '${tInput.MW}',
                        '${tInput.GARMENT_COMPO}',
                        '${tInput.QTY}',
                        '${tInput.WEIGHT}',
                        '${tInput.WEIGHT_NET}',
                        '${tInput.AMOUNT}',
                        '${tInput.NET}',
                        '${tInput.VAT}',
                        '0',
                        '${tInput.BL_NO}',
                        '${tInput.INVOICE_NO}',
                        '${tInput.SENDER}',
                        '${tInput.RECEIVER}',
                        '${tInput.SPEC}',
                        '${tInput.REMARK}',
                        '${tInput.REG_USER}',
                        '${tRetDate}',
                        '${tInput.DELAY_REASON}',
                        '${tInput.CHARGE_KIND}',
                        '${tInput.CHARGE_CODE}',
                        '${tInput.BUYER_CD}',
                        '${tInput.CURR_CD}'
                    )
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

        mgrInsert_S0417_5_1: async (_, args, contextValue) => {
            //  ADP - Express Add
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
            var tInput0 = { ...args.datas1 };
            var tSQLArray = [];

            var m_BL_NO = tInput0.BL_NO;
            var m_AMOUNT = tInput0.AMOUNT;
            var m_ETA = tInput0.ETA;
            var m_InputWeight = tInput0.WEIGHT;
            var m_SumWeight = 0;
            args.datas.forEach((col, i) => {
                m_SumWeight += parseFloat(col.WEIGHT);
            });

            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var tInput = { ...args.datas[tIdx] };

                if (tInput.WEIGHT > 0) {
                    tInput.WEIGHT =
                        (tInput.WEIGHT * m_InputWeight) / m_SumWeight;
                    tInput.AMOUNT = (m_AMOUNT * tInput.WEIGHT) / m_SumWeight;
                } else {
                    tInput.WEIGHT = 0;
                    tInput.AMOUNT = 0;
                }

                let tSQL99 = `
                    UPDATE KZZ_FREIGHT
                    SET
                        FRT_DATE = '${tInput0.FRT_DATE}',
                        BL_NO = '${tInput0.BL_NO}',
                        WEIGHT = '${tInput.WEIGHT}',
                        AMOUNT = ${tInput.AMOUNT},
                        NET = ${tInput.NET},
                        VAT = '0',
                        ADP_CHECK = '1'
                    WHERE
                        FRT_IDX = ${tInput.FRT_IDX}
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                if (
                    tInput.PO_CD !== '' &&
                    tInput.PO_SEQ !== '' &&
                    tInput.ORDER_CD !== '' &&
                    tInput.MATL_CD !== '' &&
                    tInput.IN_DATETIME !== ''
                ) {
                    var tMOCheck = tInput.REG_DATETIME.substring(11, 14);
                    if (
                        tMOCheck === 'OUT' ||
                        tMOCheck === 'MTB' ||
                        tInput.FRT_TYPE === 'ADC'
                    ) {
                        let tSQL99 = `
                            update ksv_stock_out
                            set
                                pack_cd = '${tInput0.BL_NO}',
                                ship_date = '${tInput0.FRT_DATE}',
                                eta = '${tInput0.ETA}'
                            where
                                po_cd = '${tInput.PO_CD}'
                                and po_seq = '${tInput.PO_SEQ}'
                                and order_cd = '${tInput.ORDER_CD}'
                                and matl_cd = '${tInput.MATL_CD}'
                                and mrp_seq = '${tInput.MRP_SEQ}'
                                and reg_datetime = '${tInput.REG_DATETIME}'
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);
                    } else {
                        let tSQL99 = `
                            update ksv_stock_mem
                            set
                                out_qty = out_qty + ${tInput.QTY},
                                stock_status = '2'
                            where
                                po_cd = '${tInput.PO_CD}'
                                and po_seq = '${tInput.PO_SEQ}'
                                and order_cd = '${tInput.ORDER_CD}'
                                and matl_cd = '${tInput.MATL_CD}'
                                and mrp_seq = '${tInput.MRP_SEQ}'
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);

                        let tSQL99 = `
                            update ksv_stock_in
                            set
                                out_qty = out_qty + ${tInput.QTY},
                                out_status = '1'
                            where
                                po_cd = '${tInput.PO_CD}'
                                and po_seq = '${tInput.PO_SEQ}'
                                and order_cd = '${tInput.ORDER_CD}'
                                and matl_cd = '${tInput.MATL_CD}'
                                and mrp_seq = '${tInput.MRP_SEQ}'
                                and in_datetime = '${tInput.IN_DATETIME}'
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);

                        let sql0 = `
                            select
                                out_factory_cd
                            from
                                ksv_stock_mst
                            where
                                po_cd = '${tInput.PO_CD}'
                                and po_seq = 1
                        `;
                        var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
                        var tFactoryCd = '';
                        if (nRet0.length > 0)
                            tFactoryCd = nRet0[0].out_factory_cd;

                        let sql0 = `
                            select
                                matl_seq
                            from
                                ksv_stock_in
                            where
                                po_cd = '${tInput.PO_CD}'
                                and po_seq = '${tInput.PO_SEQ}'
                                and order_cd = '${tInput.ORDER_CD}'
                                and matl_cd = '${tInput.MATL_CD}'
                                and mrp_seq = '${tInput.MRP_SEQ}'
                                and in_datetime = '${tInput.IN_DATETIME}'
                        `;
                        var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
                        var tMatlSeq = '';
                        if (nRet0.length > 0) tFactoryCd = nRet0[0].matl_seq;

                        let tSQL99 = `
								 insert into ksv_stock_out 
								 (po_cd,po_seq,order_cd,matl_cd,mrp_seq,matl_seq,in_datetime,out_datetime,out_qty,
								  out_type,out_status,pack_cd,delivery_type,ship_date,eta,ct_qty,ct_no,remark,out_factory_cd,status_cd,reg_user,reg_datetime) 
								 values ( 
								 '${tInput.PO_CD}', 
								 '${tInput.PO_SEQ}', 
								 '${tInput.ORDER_CD}', 
								 '${tInput.MATL_CD}', 
								 '${tInput.MRP_SEQ}', 
								 '${tMatlSeq}', 
								 '${tInput.IN_DATETIME}', 
								 '${tRetDate1}', 
								 '${tInput.QTY}',
								 '1',
								 '0',
								 '${tInput0.BL_NO}',
								 '7',
								 '${tRetDate1}',
								 '${tInput0.ETA}',
								 '',
								 '',
								 '',
								 '${tFactoryCd}',
								 '0', 
								 '${tInput0.USER_ID}',
								 '${tRetDate} 
								 ) 
                  `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);
                    }
                }

                let tSQL99 = `
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

export default moduleMutation_S0417_5;
