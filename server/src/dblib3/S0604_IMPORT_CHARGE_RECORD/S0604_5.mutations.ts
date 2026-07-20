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
const moduleMutation_S0604_5 = {
    Mutation: {
        mgrInsert_S0604_5: async (_, args, contextValue) => {
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

            console.log('Server Pro');
            var tSQLArray = [];
            // console.log(args.datas);

            let sql0 = `
                select
                    a.order_cd,
                    sum(a.ship_cnt) as ship_cnt,
                    i.ship_price,
                    b.po_cd,
                    a.nat_cd,
                    h.nat_name,
                    c.factory_cd,
                    a.ship_date,
                    a.ship_ptype,
                    a.delivery_type
                from
                    ksv_order_ship a
                    left join ksv_po_mem b on b.order_cd = a.order_cd
                    and b.po_seq = '1'
                    left join kcd_nation h on h.nat_cd = a.nat_cd,
                    ksv_order_mst c,
                    ksv_invoice_mem i
                where
                    a.invoice_no = '${tInput1.INVOICE_NO}'
                    and c.order_cd = a.order_cd
                    and i.order_cd = a.order_cd
                    and a.invoice_no = i.invoice_no
                group by
                    a.order_cd,
                    i.ship_price,
                    b.po_cd,
                    a.nat_cd,
                    h.nat_name,
                    c.factory_cd,
                    a.ship_date,
                    a.ship_ptype,
                    a.delivery_type
                order by
                    a.order_cd
            `;
            var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            var tInput0 = { ...nRet0[0] };

            var m_TotAmt = 0;
            var m_OrderAmt = 0;

            nRet0.forEach((col, i) => {
                let tSQL99 = `
                    insert into
                        ksv_impcharge_mem (
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
                            delivery_type
                        )
                    values
                        (
                            '${tInput1.INVOICE_NO}',
                            '${col.order_cd}',
                            '${i}',
                            '${col.ship_cnt}',
                            '${col.ship_price}',
                            '${col.ship_price}',
                            '0',
                            '0',
                            '${col.po_cd}',
                            '${col.nat_cd}',
                            '${col.factory_cd}',
                            '${col.ship_date}',
                            '${col.ship_ptype}',
                            '${col.nat_cd}',
                            '${col.delivery_type}'
                        )
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            });

            let sql0 = `
                select
                    *
                from
                    ksv_invoice_mst
                where
                    invoice_no = '${tInput1.INVOICE_NO}'
            `;
            var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            var tInvoiceInfo = { ...nRet0[0] };

            let tSQL99 = `
                INSERT INTO
                    ksv_impcharge_mst (
                        INVOICE_NO,
                        SHIP_DATE,
                        DELIVERY_TYPE,
                        BUYER_CD,
                        TOT_AMT,
                        ORD_AMT,
                        ADJ_AMT,
                        curr_cd,
                        remark,
                        ext_invoice,
                        invoice_type,
                        STATUS_CD,
                        REG_USER,
                        REG_DATETIME,
                        customs,
                        vat,
                        freight,
                        clearance
                    )
                VALUES
                    (
                        '${tInput1.INVOICE_NO}',
                        '${tInput1.SHIP_DATE}',
                        '${tInput0.delivery_type}',
                        '${tInput0.order_cd.substring(0, 2)}',
                        '${tInvoiceInfo.TOT_AMT}',
                        '${tInvoiceInfo.ORD_AMT}',
                        0,
                        '${tInput1.CURR_CD}',
                        '${tInput1.REMARK}',
                        '',
                        '3',
                        '0',
                        '${tInput1.USER_ID}',
                        '${tRetDate}',
                        '${tInput1.VENDOR_NAME}',
                        '${tInput1.DUTY_AMT}',
                        '${tInput1.FREIGHT_AMT}',
                        '${tInput1.COST_CLEAR}'
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
            tObj.CODE = 'SUCCEED: Insert SHIP Record ' + tInput1.INVOICE_NO;
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },

        mgrUpdate_S0604_5: async (_, args, contextValue) => {
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

            console.log('Server Pro');
            var tSQLArray = [];
            // console.log(args.datas);
            let tSQL99 = `
                UPDATE ksv_impcharge_mst
                SET
                    SHIP_DATE = '${tInput1.SHIP_DATE}',
                    TOT_AMT = '${tInput1.TOTAL_AMT}',
                    DELIVERY_TYPE = '${tInput1.DELIVERY_TYPE}',
                    remark = '${tInput1.REMARK}',
                    customs = '${tInput1.VENDOR_NAME}',
                    vat = '${tInput1.DUTY_AMT}',
                    freight = '${tInput1.FREIGHT_AMT}',
                    clearance = '${tInput1.COST_CLEAR}',
                    curr_cd = '${tInput1.CURR_CD}',
                    BUYER_CD = '${tInput1.BUYER_CD}'
                WHERE
                    INVOICE_NO = '${tInput1.INVOICE_NO}'
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
            tObj.CODE = 'SUCCEED: Insert SHIP Record :' + tInput1.INVOICE_NO;
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },

        mgrDelete_S0604_5: async (_, args, contextValue) => {
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

            console.log('Server Pro');
            var tSQLArray = [];
            // console.log(args.datas);
            let tSQL99 = `
                delete from ksv_impcharge_mst
                WHERE
                    INVOICE_NO = '${tInput1.INVOICE_NO}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            let tSQL99 = `
                delete from ksv_impcharge_mem
                WHERE
                    INVOICE_NO = '${tInput1.INVOICE_NO}'
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
            tObj.CODE = 'SUCCEED: Insert SHIP Record :' + tInput1.INVOICE_NO;
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },
    },
};

export default moduleMutation_S0604_5;
