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
const moduleMutation_S0450_5 = {
    Mutation: {
        mgrUpdate_S0450_5_UPDATE_REMARK: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tSQLArray = [];

            var tInput = { ...args.datas };
            var tInput2 = [...args.datas1];

            var tIdx = 0;
            for (tIdx = 0; tIdx < tInput2.length; tIdx++) {
                var tOne = tInput2[tIdx];

                let tSQL99 = `
                    update ksv_po_matllist
                    set
                        remark = '${tInput.REMARK.replaceAll("'", "''")}',
                        upd_user = '${tUserInfo.USER_ID}',
                        upd_datetime = '${tRetDate}'
                    where
                        po_cd = '${tOne.PO_CD}'
                        and matl_cd = '${tOne.MATL_CD}'
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
                tObj.CODE = 'SUCCEED:Update Remark';
                tObj.id = 0;
                tRetArray.push(tObj);
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:' + e.message;
                tObj.id = 0;
                tRetArray.push(tObj);
            }

            return tRetArray;
        },
        mgrUpdate_S0450_5_END_ORDER_CANCEL: async (_, args, contextValue) => {
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
            var yyyy_str = yyyy.toString();

            var tRetDate =
                yyyy.toString() +
                mm_str +
                dd_str +
                hours_str +
                minutes_str +
                seconds_str;
            var tRetDate1 = tRetDate.substring(0, 8);
            var tYY = 'B' + yyyy.toString().substring(2) + '-';
            tYY = yyyy.toString().substring(2, 2);

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

            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var tOne = args.datas[tIdx];

                let tSQL99 = `
                    update ksv_order_mst
                    set
                        order_status = '8',
                        end_datetime = ''
                    where
                        order_cd = '${tOne.ORDER_CD}'
                        and order_status = '9'
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
                tObj.CODE = 'SUCCEED:End Order Cancel';
                tObj.id = 0;
                tRetArray.push(tObj);
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:' + e.message;
                tObj.id = 0;
                tRetArray.push(tObj);
            }

            return tRetArray;
        },

        mgrUpdate_S0450_5_CHANGE_FOB: async (_, args, contextValue) => {
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
            var yyyy_str = yyyy.toString();

            var tRetDate =
                yyyy.toString() +
                mm_str +
                dd_str +
                hours_str +
                minutes_str +
                seconds_str;
            var tRetDate1 = tRetDate.substring(0, 8);
            var tYY = 'B' + yyyy.toString().substring(2) + '-';
            tYY = yyyy.toString().substring(2, 2);

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
            var tInput1 = { ...args.datas1 };

            let tSQL99 = `
                delete ksv_order_fob
                where
                    order_cd = '${tInput1.ORDER_CD}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            let tSQL99 = `
                update ksv_order_mst
                set
                    avr_price = '${tInput1.AVR_PRICE}',
                    curr_cd = '${tInput1.CURR_CD}',
                    usd_price = '${tInput1.USD_PRICE}'
                where
                    order_cd = '${tInput1.ORDER_CD}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas2.length; tIdx++) {
                var tOne = args.datas2[tIdx];

                var tObj = {};
                tObj.ORDER_CD = tInput1.ORDER_CD;
                tObj.FOB_SEQ = tOne.FOB_SEQ;
                tObj.SHIP_QTY = tOne.SHIP_QTY;
                tObj.FOB = tOne.FOB;
                tObj.FOB100 = tOne.FOB100;
                let tSQL99 = AFLib.createTableSql('KSV_ORDER_FOB', tObj);
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
                tObj.CODE = 'SUCCEED:End Order Cancel';
                tObj.id = 0;
                tRetArray.push(tObj);
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:' + e.message;
                tObj.id = 0;
                tRetArray.push(tObj);
            }

            return tRetArray;
        },

        mgrUpdate_S0450_5_UPDATE_DETAIL: async (_, args, contextValue) => {
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
            var yyyy_str = yyyy.toString();

            var tRetDate =
                yyyy.toString() +
                mm_str +
                dd_str +
                hours_str +
                minutes_str +
                seconds_str;
            var tRetDate1 = tRetDate.substring(0, 8);
            var tYY = 'B' + yyyy.toString().substring(2) + '-';
            tYY = yyyy.toString().substring(2, 2);

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

            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var tSQLArray = [];

                var tEndStatus = ['0', '0', '0', '0'];
                var tOne = args.datas[tIdx];

                // 1. input 관련
                var tStep1 = 0;
                var tSQL0 = `
                    select
                        isnull(count(*), 0) as cnt
                    from
                        ksv_stock_in a,
                        kcd_matl_mst b,
                        kcd_vendor c
                    where
                        a.order_cd = '${tOne.ORDER_CD}'
                        and a.pay_price < 0.00001
                        and a.in_price < 0.00001
                        and b.matl_cd = a.matl_cd
                        and b.vendor_cd <> 'V0558'
                        and c.vendor_cd = b.vendor_cd
                        and c.vendor_type <> '4'
                        and a.in_qty > 0
                `;
                var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL0));
                tStep1 = nRet0[0].cnt;
                if (nRet0[0].cnt <= 0) {
                    var tSQL1 = `
                        select
                            isnull(count(*), 0) as cnt
                        from
                            ksv_stock_mem a
                        where
                            a.order_cd = '${tOne.ORDER_CD}'
                            and a.diff_po_type <> '2'
                            and a.po_qty > 0
                            and a.po_seq < 200
                            and a.po_cd not in (
                                select
                                    po_cd
                                from
                                    ksv_stock_in
                                where
                                    po_cd = a.po_cd
                                    and po_seq = a.po_seq
                                    and order_cd = a.order_cd
                                    and matl_cd = a.matl_cd
                                    and mrp_seq = a.mrp_seq
                            )
                    `;
                    var nRet1 = await prisma.$queryRaw(Prisma.raw(tSQL1));
                    tStep1 = nRet1[0].cnt;
                }
                if (tStep1 > 0) tEndStatus[0] = '1';
                else tEndStatus[0] = '0';

                // 2. FC_PRICE  관련
                var tStep2 = 0;
                var tSQL2 = `
                    select
                        isnull(count(*), 0) as cnt
                    from
                        ksv_order_cmpt
                    where
                        order_cd = '${tOne.ORDER_CD}'
                        and nego_type = '1'
                `;
                var nRet2 = await prisma.$queryRaw(Prisma.raw(tSQL2));
                tStep2 = nRet2[0].cnt;
                if (tStep2 > 0) tEndStatus[1] = '0';
                else tEndStatus[1] = '2';

                // 3. invoic3, 선적수량관련
                var tStep3 = 0;
                var tSQL3 = `
                    SELECT
                        isnull(SUM(SHIP_QTY), 0) as invoice_qty
                    FROM
                        KSV_INVOICE_MEM
                    WHERE
                        order_cd = '${tOne.ORDER_CD}'
                `;
                var nRet3 = await prisma.$queryRaw(Prisma.raw(tSQL3));
                var tInvoiceQty = nRet3[0].invoice_qty;

                var tSQL4 = `
                    select
                        isnull(sum(ship_cnt), 0) as ship_qty
                    from
                        ksv_order_ship
                    where
                        order_cd = '${tOne.ORDER_CD}'
                        and ship_ptype in ('0', '5')
                `;
                var nRet4 = await prisma.$queryRaw(Prisma.raw(tSQL4));
                var tShipQty = nRet4[0].ship_qty;

                if (tInvoiceQty !== tShipQty) tEndStatus[2] = '3';
                else tEndStatus[2] = '0';

                // 4. invoic fob 관련
                var tSQL5 = `
                    select
                        isnull(sales_price, 0) as sales_price,
                        isnull(ship_qty, 0) as ship_qty
                    from
                        ksv_invoice_mem
                    where
                        order_cd = '${tOne.ORDER_CD}'
                `;
                var nRet5 = await prisma.$queryRaw(Prisma.raw(tSQL5));

                var tShipTot = 0;
                var tInvoiceTot = 0;
                var tInvoiceFob = 0;
                nRet5.forEach((col, i) => {
                    tShipTot += col.ship_qty;
                    tInvoiceTot += col.ship_qty * col.sales_price;
                });
                if (tShipTot > 0) tInvoiceFob = tInvoiceTot / tShipTot;

                var tSQL6 = `
                    select
                        isnull(fob, 0) as fob,
                        isnull(ship_qty, 0) as ship_qty
                    from
                        ksv_order_fob
                    where
                        order_cd = '${tOne.ORDER_CD}'
                `;
                var nRet6 = await prisma.$queryRaw(Prisma.raw(tSQL6));

                var tShipTot1 = 0;
                var tFobTot = 0;
                var tOrderFob = 0;
                nRet6.forEach((col, i) => {
                    tShipTot1 += col.ship_qty;
                    tFobTot += col.fob * col.ship_qty;
                });
                if (tShipTot1 > 0) tOrderFob = tFobTot / tShipTot1;
                if (tInvoiceFob !== tOrderFob) tEndStatus[3] = '4';
                else tEndStatus[3] = '0';

                var tEndStr = '';
                tEndStatus.forEach((col, i) => {
                    tEndStr += col;
                });

                let tSQL99 = `
                    update ksv_order_mst
                    set
                        end_status = '${tEndStr}'
                    where
                        order_cd = '${tOne.ORDER_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                // 지급일이 지났으며 완료인 오더에 대해서
                var tSQL7 = `
                    select
                        isnull(count(*), 0) as cnt
                    from
                        ksv_stock_in
                    where
                        po_cd = '${tOne.PO_CD}'
                        and order_cd = '${tOne.ORDER_CD}'
                        and pay_date > '${tRetDate1}'
                `;
                var nRet7 = await prisma.$queryRaw(Prisma.raw(tSQL7));
                if (
                    nRet7[0].cnt <= 0 &&
                    tOne.ORDER_STATUS === '9' &&
                    tOne.PO_CD !== ''
                ) {
                    let tSQL99 = `
                        update ksv_order_mst
                        set
                            matl_amt = 0
                        where
                            matl_pay_flag = '0'
                            and order_cd = '${tOne.ORDER_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    // 지금액 가져오기
                    var tSQL8 = `
                        select
                            a.pay_curr_cd,
                            a.pay_date,
                            isnull(sum(a.pay_price * a.in_qty), 0) as matl_amt,
                            c.vendor_name
                        from
                            ksv_stock_in a,
                            kcd_matl_mst b,
                            kcd_vendor c
                        where
                            a.po_cd = '${tOne.PO_CD}'
                            and a.order_cd = '${tOne.ORDER_CD}'
                            and a.matl_cd = b.matl_cd
                            and c.vendor_cd = b.vendor_cd
                        group by
                            a.pay_curr_cd,
                            a.pay_date,
                            c.vendor_name
                        union
                        select
                            a.pay_curr_cd,
                            a.pay_date,
                            isnull(sum(a.pay_price * a.in_qty), 0) as matl_amt,
                            c.vendor_name --미니엄 오더를 가져오기위한 퀴리추가   
                        from
                            ksv_stock_in a,
                            ksv_stock_mem b,
                            kcd_matl_mst d,
                            kcd_vendor c
                        where
                            a.po_cd = '${tOne.PO_CD}'
                            and b.min_order = '${tOne.ORDER_CD}'
                            and b.po_seq in ('98', '99')
                            and a.po_cd = b.po_cd
                            and a.po_seq = b.po_seq
                            and a.order_cd = b.order_cd
                            and a.matl_cd = b.matl_cd
                            and a.mrp_seq = b.mrp_seq
                            and a.matl_seq = b.matl_seq
                            and a.matl_cd = d.matl_cd
                            and c.vendor_cd = d.vendor_cd
                        group by
                            a.pay_curr_cd,
                            a.pay_date,
                            c.vendor_name
                    `;
                    var nRet8 = await prisma.$queryRaw(Prisma.raw(tSQL8));

                    var tTotMatlAmt = 0;
                    var tIdx1 = 0;
                    for (tIdx1 = 0; tIdx1 < nRet9.length; tIdx1++) {
                        var col = nRet8[tIdx1];
                        var tMatlAmt = col.matl_amt;
                        if (
                            col.vendor_name.includes('free') ||
                            col.vendor_name.includes('FREE') ||
                            col.vendor_name.includes('Free')
                        )
                            tMatlAmt = 0;

                        var tCurrDate = tRetDate1;
                        if (col.pay_date > tRetDate1) tCurrDate = tRetDate1;
                        else tCurrDate = col.pay_date;

                        var tSQL9 = `
                            select
                                isnull(usd_rate, 0) as usd_rate
                            from
                                kcd_currency
                            where
                                start_date = '${tCurrDate}'
                                and curr_cd = '${col.pay_curr_cd}'
                        `;
                        var nRet9 = await prisma.$queryRaw(Prisma.raw(tSQL9));
                        var tUsdRate = nRet9[0].usd_rate;

                        tTotMatlAmt += tMatlAmt * tUsdRate;
                    }

                    let tSQL99 = `
                        update ksv_order_mst
                        set
                            matl_amt = ${tTotMatlAmt}
                        where
                            order_cd = '${tOne.ORDER_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }

                if (nRet7[0].cnt <= 0 && tOne.ORDER_STATUS === '9') {
                    let tSQL99 = `
                        update ksv_order_mst
                        set
                            matl_pay_flag = '1',
                            matl_pay_user = '${tUserInfo.USER_ID}',
                            matl_pay_datetime = '${tRetDate}'
                        where
                            order_cd = '${tOne.ORDER_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                } else {
                    let tSQL99 = `
                        update ksv_order_mst
                        set
                            matl_pay_user = '${tUserInfo.USER_ID}',
                            matl_pay_datetime = '${tRetDate}'
                        where
                            order_cd = '${tOne.ORDER_CD}'
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
                    tObj.CODE = 'ERROR:' + e.message;
                    tObj.id = 0;
                    tRetArray.push(tObj);
                }
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED:Update END_STATUS';
            tObj.id = 0;
            tRetArray.push(tObj);
            return tRetArray;
        },
    },
};

export default moduleMutation_S0450_5;
