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
const moduleMutation_S0601_5 = {
    Mutation: {
        mgrInsert_S0601_5: async (_, args, contextValue) => {
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
            var tInput1 = { ...args.datas1 };
            var tInput2 = { ...args.datas2 };
            var tInput3 = { ...args.datas3 };

            console.log('Server Pro');
            var tSQLArray = [];
            // console.log(args.datas);

            let tSQL99 = `
                INSERT INTO
                    KSV_INVOICE_MST (
                        INVOICE_NO,
                        SHIP_DATE,
                        DELIVERY_TYPE,
                        BUYER_CD,
                        TOT_AMT,
                        ORD_AMT,
                        ADJ_AMT,
                        curr_cd,
                        remark,
                        invoice_type,
                        STATUS_CD,
                        REG_USER,
                        REG_DATETIME,
                        factory_cd,
                        due_date,
                        trade_type,
                        trade_type2,
                        payment_type,
                        bl_no,
                        ext_invoice,
                        vos_amt,
                        vat_amt,
                        vat_date
                    )
                VALUES
                    (
                        '${tInput1.INVOICE_NO}',
                        '${tInput1.SHIP_DATE}',
                        '${tInput1.DELIVERY_TYPE}',
                        '${tInput1.BUYER_CD}',
                        '${tInput1.TOT_AMT}',
                        '${tInput1.ORD_AMT}',
                        '${tInput1.ADD_AMT}',
                        '${tInput1.CURR_CD}',
                        '',
                        '1',
                        '0',
                        '${tInput1.USER_ID}',
                        '${tRetDate}',
                        '${tInput1.FROM}',
                        '${tInput1.DUE_DATE}',
                        '${tInput1.TRADE_TYPE}',
                        '${tInput1.TRADE_TYPE2}',
                        '${tInput1.PAYMENT_TYPE}',
                        '${tInput1.BL_NO}',
                        '${tInput2.EXT_INVOICE}',
                        '${tInput2.VOS_AMT}',
                        '${tInput2.VAT_AMT}',
                        '${tInput2.VAT_DATE}'
                    )
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas4.length; tIdx++) {
                var tInput = { ...args.datas4[tIdx] };

                const sql0 = `
                    select
                        a.*,
                        b.PO_CD
                    from
                        ksv_order_mst a,
                        ksv_po_mem b
                    where
                        a.order_cd = '${tInput.ORDER_CD}'
                        and a.order_cd = b.order_cd
                `;
                var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                var tOrderInfo = nRet0[0];

                var tTotAmt = parseInt(tInput.SHIP_CNT) * tOrderInfo.AVR_PRICE;

                let tSQL99 = `
                    insert into
                        ksv_invoice_mem (
                            invoice_no,
                            order_cd,
                            seq,
                            ship_qty,
                            ship_price,
                            ord_price,
                            diff_price,
                            tot_amt,
                            po_cd,
                            country,
                            factory_cd,
                            ship_date,
                            ship_ptype,
                            nat_cd,
                            delivery_type,
                            sales_price
                        )
                    values
                        (
                            '${tInput1.INVOICE_NO}',
                            '${tInput.ORDER_CD}',
                            '1',
                            '${tInput.SHIP_CNT}',
                            '${tInput.AVR_PRICE}',
                            '${tOrderInfo.AVR_PRICE}',
                            '0',
                            '${tTotAmt}',
                            '${tInput.PO_CD}',
                            '${tInput.NAT_CD}',
                            '${tInput.FACTORY_CD}',
                            '${tInput.SHIP_DATE}',
                            '${tInput.SHIP_PTYPE}',
                            '${tInput.NAT_CD}',
                            '${tInput.DELIVERY_TYPE}',
                            '${tInput.AVR_PRICE}'
                        )
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    update ksv_order_ship
                    set
                        trade_chk_flag = '1',
                        ship_date = '${tInput.SHIP_DATE}'
                    where
                        order_cd = '${tInput.ORDER_CD}'
                        and ship_date = '${tInput.SHIP_DATE}'
                        and ship_ptype = '${tInput.SHIP_PTYPE}'
                        and nat_cd = '${tInput.NAT_CD}'
                        and delivery_type = '${tInput.DELIVERY_TYPE}'
                        and invoice_no = '${tInput.INVOICE_NO}'
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
                tObj.CODE = 'ERROR:Insert SHIP Record';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED: Insert SHIP Record ' + tInput1.INVOICE_NO;
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },

        mgrUpdate_S0601_5: async (_, args, contextValue) => {
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
            var tInput1 = { ...args.datas1 };
            var tInput2 = { ...args.datas2 };
            var tInput3 = { ...args.datas3 };

            console.log('Server Pro');
            var tSQLArray = [];
            // console.log(args.datas);
            let tSQL99 = `
                UPDATE KSV_INVOICE_MST
                SET
                    SHIP_DATE = '${tInput1.SHIP_DATE}',
                    ADJ_AMT = '${tInput1.ADD_AMT}',
                    MANAGE_AMT = '${tInput1.MANAGE_AMT}',
                    etc_AMT = '${tInput1.ETC_AMT}',
                    TOT_AMT = ${tInput1.TOT_AMT},
                    DELIVERY_TYPE = '${tInput1.DELIVERY_TYPE}',
                    curr_cd = '${tInput1.CURR_CD}',
                    remark = '${tInput1.REMARK}',
                    ext_invoice = '${tInput2.EXT_INVOICE}',
                    BUYER_CD = '${tInput1.BUYER_CD}',
                    factory_CD = '${tInput1.FROM}',
                    payment_type = '${tInput1.PAYMENT_TYPE}',
                    trade_type = '${tInput1.TRADE_TYPE}',
                    trade_type2 = '${tInput1.TRADE_TYPE2}',
                    due_date = '${tInput1.DUE_DATE}',
                    license_date = '${tInput1.LICENSE_DATE}',
                    license_no = '${tInput1.LICENSE_NO}'
                WHERE
                    INVOICE_NO = '${tInput1.INVOICE_NO}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            let tSQL99 = `
                update ksv_invoice_bill
                set
                    bill_date = '${tInput1.DUE_DATE}'
                where
                    invoice_no = '${tInput1.INVOICE_NO}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            if (tInput1.DEBIT_CD !== '') {
                let tSQL99 = `
                    update KSV_CRDB_MST
                    set
                        CRDB_AMT = '${tInput1.TOT_AMT}',
                        CURR_CD = '${tInput1.CURR_CD}'
                    where
                        crdb_cd = '${tInput1.DEBIT_CD}';
                    
                    update KSV_CRDB_MEM
                    set
                        CRDB_AMT = '${tInput1.TOT_AMT}'
                    where
                        crdb_cd = '${tInput1.DEBIT_CD}';
                    
                    update Kzz_debit_cost
                    set
                        debit_AMounT = '${tInput1.TOT_AMT}',
                        CURR_CD = '${tInput1.CURR_CD}'
                    where
                        crdb_cd = '${tInput1.DEBIT_CD}';
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            }

            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas4.length; tIdx++) {
                var tInput = { ...args.datas[tIdx] };

                let tSQL99 = `
                    update ksv_order_ship
                    set
                        ship_date = '${tInput1.SHIP_DATE}'
                    where
                        order_cd = '${tInput.ORDER_CD}'
                        and invoice_no = '${tInput1.INVOICE_NO}'
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
                tObj.CODE = 'ERROR:Insert SHIP Record';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED: Insert SHIP Record :' + tInput1.INVOICE_NO;
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },

        mgrDelete_S0601_5: async (_, args, contextValue) => {
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
            var tInput1 = { ...args.datas1 };
            var tInput2 = { ...args.datas2 };
            var tInput3 = { ...args.datas3 };

            console.log('Server Pro');
            var tSQLArray = [];
            // console.log(args.datas);
            let tSQL99 = `
                delete from ksv_invoice_mst
                WHERE
                    INVOICE_NO = '${tInput1.INVOICE_NO}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            let tSQL99 = `
                delete from ksv_invoice_mem
                WHERE
                    INVOICE_NO = '${tInput1.INVOICE_NO}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            let tSQL99 = `
                delete from ksv_invoice_bill
                where
                    invoice_no = '${tInput1.INVOICE_NO}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            if (tInput1.DEBIT_CD !== '') {
                let tSQL99 = `
                    delete from ksv_crdb_mst
                    where
                        crdb_cd = '${tInput1.DEBIT_CD}';
                    
                    delete from ksv_crdb_mem
                    where
                        crdb_cd = '${tInput1.DEBIT_CD}';
                    
                    delete from Kzz_debit_cost
                    where
                        crdb_cd = '${tInput1.DEBIT_CD}';
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
                tObj.CODE = 'ERROR:Insert SHIP Record';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED: Insert SHIP Record :' + tInput1.INVOICE_NO;
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },

        mgrInsert_S0601_5_1: async (_, args, contextValue) => {
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
            var tInput1 = { ...args.datas1 };
            var tInput2 = { ...args.datas2 };
            var tInput3 = { ...args.datas3 };

            console.log('Server Pro');
            var tSQLArray = [];
            // console.log(args.datas);
            tYY = yyyy.toString().substring(0, 4);
            var tYY1 = yyyy.toString().substring(2, 4);
            const sql0 = `
                SELECT
                    convert(varchar(10), ISNULL(MAX(SEQ), 0)) AS ddseq
                FROM
                    KSV_CRDB_MST
                WHERE
                    (YY = ${tYY})
                    AND CRDB_TYPE = 'D'
            `;
            var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            var tMaxSeq = parseInt(nRet0[0].ddseq) + 1;
            var tZero = '0000';
            var tNewDebitCd =
                'DF' +
                tYY1 +
                '-' +
                tZero.substring(0, 4 - String(tMaxSeq).length) +
                String(tMaxSeq);

            var tBankCd = '2';

            let tSQL99 = `
                INSERT INTO
                    KSV_CRDB_MST (
                        CRDB_CD,
                        crdb_seq,
                        CRDB_TYPE,
                        CRDB_DATE,
                        END_DATE,
                        MESSER_CD,
                        CRDB_AMT,
                        CURR_CD,
                        TITLE,
                        REMARK,
                        YY,
                        SEQ,
                        STATUS_CD,
                        REG_USER,
                        REG_DATETIME,
                        BANK_CD,
                        po_cd,
                        order_cd,
                        buyer_Cd,
                        payment_plan
                    )
                VALUES
                    (
                        '${tNewDebitCd}',
                        1,
                        'D',
                        '${tRetDate1}',
                        '${tInput1.SHIP_DATE}',
                        '${tInput1.BUYER_CD}',
                        '${tInput1.TOT_AMT}',
                        '${tInput1.CURR_CD}',
                        '${tInput1.INVOICE_NO}',
                        '${tInput1.REMARK}',
                        '${tYY}',
                        '${tMaxSeq}',
                        '1',
                        '${tInput1.USER_ID}',
                        '${tRetDate}',
                        '${tBankCd}',
                        '',
                        '',
                        '${tInput1.BUYER_CD}',
                        ''
                    )
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            let tSQL99 = `
                INSERT INTO
                    KSV_CRDB_MEM (
                        CRDB_CD,
                        END_DATE,
                        CRDB_AMT,
                        REF_NO,
                        STATUS_CD,
                        REG_USER,
                        REG_DATETIME
                    )
                VALUES
                    (
                        '${tNewDebitCd}',
                        '${tInput1.SHIP_DATE}',
                        '${tInput1.TOT_AMT}',
                        '',
                        '',
                        '${tInput1.USER_ID}',
                        '${tRetDate}'
                    )
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            const sql1 = `
                select
                    max(seq) as seq
                from
                    kzz_debit_cost
                where
                    yy = '${tYY}'
                    and left(debit_cd, 2) = '${tInput1.BUYER_CD}'
            `;
            var nRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
            var tMaxSeq1 = nRet1[0].seq + 1;
            var tZero1 = '0000';
            var tNewDebitCd1 =
                tInput1.BUYER_CD +
                tYY1 +
                '-V' +
                tZero.substring(0, 4 - String(tMaxSeq1).length) +
                String(tMaxSeq1);

            let tSQL99 = `
                INSERT INTO
                    Kzz_debit_cost (
                        debit_CD,
                        seq,
                        yy,
                        crdb_cd,
                        style_cd,
                        buyer_CD,
                        debit_AMounT,
                        curr_cd,
                        factory_cd,
                        remark,
                        end_flag,
                        reg_user,
                        reg_datetime,
                        end_date
                    )
                VALUES
                    (
                        '${tNewDebitCd1}',
                        '${tMaxSeq1}',
                        '${tYY}',
                        '${tNewDebitCd}',
                        '',
                        '${tInput1.BUYER_CD}',
                        '${tInput1.TOT_AMT}',
                        '${tInput1.CURR_CD}',
                        'FC045',
                        '${tInput1.REMARK}',
                        '0',
                        '${tInput1.USER_ID}',
                        '${tRetDate}',
                        '${tInput1.SHIP_DATE}'
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
                tObj.CODE = 'ERROR:Insert SHIP Record';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED: Insert SHIP Record :' + tNewDebitCd;
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },
    },
};

export default moduleMutation_S0601_5;
