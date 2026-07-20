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
const moduleMutation_S0530_5 = {
    Mutation: {
        mgrInsert_S0530_5: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput0 = { ...args.datas1 };

            // var tInvoiceNo = tRetDate;
            // tInput0.INVOICE_NO = tInvoiceNo;
            // Invoice_no은 입력되어야 함

            var tOrderArray = [];
            var tBuyerArray = [];

            console.log('Server Pro');
            var tSQLArray = [];
            // console.log(args.datas);

            var tIdx = 0;
            var tOrderInfo = {};
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var tInput = { ...args.datas[tIdx] };

                var tShipAmount =
                    parseFloat(tInput.IN_SHIP_QTY) * parseFloat(tInput.PRICE);

                var tFcChkFlag = '0';
                // Delivery_Type에 따라 '2',  hand_carry, express, other, keep

                var tInObj = {};
                tInObj.order_cd = tInput.ORDER_CD;
                tInObj.prod_cd = tInput.PROD_CD;
                tInObj.ship_date0 = tInput0.SHIP_DATE;
                tInObj.ship_date = tInput0.SHIP_DATE;
                tInObj.ship_ptype = tInput0.SHIP_MODE;
                tInObj.nat_cd = tInput0.COUNTRY;
                tInObj.delivery_type = tInput0.DELIVERY_TYPE;
                tInObj.ship_cnt = tInput.IN_SHIP_QTY;
                tInObj.size_cnt = tInput.IN_SHIP_SIZE_CNT;
                tInObj.invoice_no = tInput0.INVOICE_NO;
                tInObj.status_cd = '0';
                tInObj.reg_user = tUserInfo.USER_ID;
                tInObj.reg_datetime = tRetDate;
                tInObj.exfactory = tInput0.EX_FACTORY_DATE;
                tInObj.fc_chk_flag = tFcChkFlag;
                tInObj.ship_price = tInput.PRICE;
                tInObj.ship_amount = tShipAmount;
                let tSQL99 = AFLib.createTableSql('KSV_ORDER_SHIP', tInObj);
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                const sql0 = `
                    select
                        a.*,
                        b.PO_CD,
                        c.size_member
                    from
                        ksv_order_mst a,
                        ksv_po_mem b,
                        kcd_size_mst c
                    where
                        a.order_cd = '${tInput.ORDER_CD}'
                        and a.order_cd = b.order_cd
                        and a.size_group = c.size_group
                `;
                var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                if (nRet0.length <= 0) {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = 'ERROR:Order Status을 확인하세요';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }
                tOrderInfo = nRet0[0];

                let tSQL99 = `
                    delete from ssv_order_ship
                    where
                        order_cd = '${tInput.ORDER_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                var tSizeArray = tOrderInfo.size_member.split(',');
                var tIdx10 = 0;
                for (tIdx10 = 0; tIdx10 < tSizeArray.length; tIdx10++) {
                    var tSizeCnt = parseInt(
                        tInput.IN_SHIP_SIZE_CNT.substring(
                            tIdx10 * 6,
                            (tIdx10 + 1) * 6,
                        ),
                    );
                    var tInObj = {};
                    tInObj.order_cd = tInput.ORDER_CD;
                    tInObj.prod_cd = tInput.PROD_CD;
                    tInObj.ship_date = tInput0.SHIP_DATE;
                    tInObj.ship_ptype = tInput0.SHIP_MODE;
                    tInObj.size = tSizeArray[tIdx10];
                    tInObj.ship_cnt = tSizeCnt;
                    tInObj.status_cd = '0';
                    tInObj.reg_user = tUserInfo.USER_ID;
                    tInObj.reg_datetime = tRetDate;
                    let tSQL99 = AFLib.createTableSql('SSV_ORDER_SHIP', tInObj);
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }

                var tInvoiceNo = tInput0.INVOICE_NO;
                var tInvoiceNoPrefix = `${tUserInfo.USER_ID}${tRetDate1.substring(2, 4)}-`;
                var sql1 = `
                    ;
                    
                    select
                        isnull(max(invoice_no), '0') as max_seq
                    from
                        ksv_order_ship
                    where
                        invoice_no like '%${tInvoiceNoPrefix}%'
                `;
                var nRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                var tMaxSeq = 1;
                var tMaxSeqStr = '0001';
                if (nRet1.length > 0) {
                    var tTmp = nRet1[0].max_seq;
                    if (tTmp === '0') {
                        tMaxSeqStr = AFLib.printF(1, 4);
                    } else {
                        var tCols = tTmp.split('-');
                        if (tCols.length > 1) {
                            var tTmp1 = parseInt(tCols[1]) + 1;
                            tMaxSeqStr = AFLib.printF(tTmp1, 4);
                        }
                    }
                }

                var tTotAmt = parseFloat(tShipAmount);
                var tOrdAmt =
                    parseFloat(tOrderInfo.AVR_PRICE) *
                    parseFloat(tInput.IN_SHIP_QTY);
                var tAdjAmt = tTotAmt - tOrdAmt;
                var tShipPrice = tInput.PRICE;

                if (tInput0.SHIP_MODE === '1' || tInput0.SHIP_MODE === '6') {
                    tInvoiceNo = `${tInvoiceNoPrefix}${tMaxSeqStr}`;
                    tTotAmt = 0;
                    tShipPrice = 0;
                    tAdjAmt = 0;
                } else if (
                    tInput0.DELIVERY_TYPE === '6' ||
                    tInput0.DELIVERY_TYPE === '7'
                ) {
                    tInvoiceNo = `${tInvoiceNoPrefix}${tMaxSeqStr}`;
                }

                var sql2 = `
                    ;
                    
                    select
                        isnull(count(*), 0) as cnt
                    from
                        ksv_invoice_mst
                    where
                        invoice_no = '${tInvoiceNo}'
                `;
                var nRet2 = await prisma.$queryRaw(Prisma.raw(sql2));
                if (nRet2.length > 0) {
                    if (nRet2[0].cnt > 0) {
                        var tRetArray = [];
                        var tObj = {};
                        tObj.CODE = `ERROR:Alread Registed Invoice NO:${tInvoiceNo}`;
                        tObj.id = 0;
                        tRetArray.push(tObj);
                        return tRetArray;
                    }
                }

                var tObj8 = {};
                tObj8.INVOICE_NO = tInvoiceNo;
                tObj8.SHIP_DATE = tInput0.SHIP_DATE;
                tObj8.SHIP_MODE = tInput0.SHIP_MODE;
                tObj8.DUE_DATE = tOrderInfo.DUE_DATE;
                tObj8.DELIVERY_TYPE = tInput0.DELIVERY_TYPE;
                tObj8.BUYER_CD = tInput.ORDER_CD.substring(0, 2);
                tObj8.ADJ_AMT = tAdjAmt;
                tObj8.ORD_AMT = tOrdAmt;
                tObj8.TOT_AMT = tTotAmt;
                tObj8.CURR_CD = tOrderInfo.CURR_CD;
                tObj8.REMARK = '';
                tObj8.EXT_INVOICE = '';
                tObj8.INVOICE_TYPE = '1';
                tObj8.PAYMENT_TYPE = '1';
                tObj8.TRADE_TYPE = '1';
                tObj8.TRADE_TYPE2 = '1';
                tObj8.FACTORY_CD = tOrderInfo.FACTORY_CD;
                tObj8.BL_NO = tInput0.BL_NO;
                tObj8.IN_SHIP_QTY = tInput.IN_SHIP_QTY;
                tObj8.PRICE = tInput.PRICE;

                var tObj9 = {};
                tObj9.ORDER_CD = tInput.ORDER_CD;
                tObj9.IN_SHIP_QTY = tInput.IN_SHIP_QTY;
                tObj9.PRICE = tInput.PRICE;
                if (tObj9.PRICE <= 0) tOrderInfo.AVR_PRICE;
                tObj9.ORD_PRICE = tOrderInfo.AVR_PRICE;
                tObj9.SHIP_DATE = tInput0.SHIP_DATE;
                tObj9.SHIP_PTYPE = tInput0.SHIP_MODE;
                tObj9.DELIVERY_TYPE = tInput0.DELIVERY_TYPE;
                tObj9.SHIP_MODE = tInput0.SHIP_MODE;
                tObj9.CURR_CD = tOrderInfo.CURR_CD;
                tObj9.FACTORY_CD = tOrderInfo.FACTORY_CD;
                tObj9.INVOICE_NO = tInvoiceNo;
                tObj9.SALES_PRICE = tInput.PRICE;
                tObj9.ORD_PRICE = tOrderInfo.AVR_PRICE;
                tObj9.TOT_AMT = tTotAmt;
                tObj9.PO_CD = tOrderInfo.PO_CD;
                tObj9.FACTORY_CD = tOrderInfo.FACTORY_CD;
                tObj9.COUNTRY = tInput0.COUNTRY;
                tObj9.NAT_CD = tOrderInfo.NAT_CD;

                if (tBuyerArray.length <= 0) tBuyerArray.push(tObj8);
                else {
                    let tFlag = 0;
                    let tTmpArray = [];

                    tBuyerArray.forEach((col, i) => {
                        var tObj0 = { ...col };
                        if (col.BUYER_CD === tObj8.BUYER_CD) {
                            tObj0.IN_SHIP_QTY += tObj8.IN_SHIP_QTY;
                            tFlag = 1;
                        }
                        tTmpArray.push(tObj0);
                    });
                    if (tFlag === 0) tTmpArray.push(tObj8);
                    tBuyerArray = [...tTmpArray];
                }

                if (tOrderArray.length <= 0) tOrderArray.push(tObj9);
                else {
                    let tFlag = 0;
                    let tTmpArray = [];

                    tOrderArray.forEach((col, i) => {
                        var tObj0 = { ...col };
                        if (col.ORDER_CD === tObj9.ORDER_CD) {
                            tObj0.IN_SHIP_QTY += tObj9.IN_SHIP_QTY;
                            tFlag = 1;
                        }
                        tTmpArray.push(tObj0);
                    });
                    if (tFlag === 0) tTmpArray.push(tObj9);
                    tOrderArray = [...tTmpArray];
                }
            }

            var tInvoiceObj = {};
            if (tBuyerArray.length > 0) {
                tBuyerArray.forEach((col, i) => {
                    var tTotAmt =
                        parseFloat(col.IN_SHIP_QTY) * parseFloat(col.PRICE);
                    var tOrdAmt =
                        parseFloat(tOrderInfo.AVR_PRICE) *
                        parseFloat(col.IN_SHIP_QTY);
                    var tAdjAmt = tTotAmt - tOrdAmt;
                    var tShipPrice = col.PRICE;

                    tInvoiceObj = {};
                    tInvoiceObj.invoice_no = col.INVOICE_NO;
                    tInvoiceObj.ship_date = col.SHIP_DATE;
                    tInvoiceObj.delivery_type = col.DELIVERY_TYPE;
                    tInvoiceObj.buyer_cd = col.BUYER_CD;
                    tInvoiceObj.tot_amt = tTotAmt;
                    tInvoiceObj.ord_amt = tOrdAmt;
                    tInvoiceObj.adj_amt = tAdjAmt;
                    tInvoiceObj.curr_cd = col.CURR_CD;
                    tInvoiceObj.remark = '';
                    tInvoiceObj.ext_invoice = '';
                    tInvoiceObj.invoice_type = '1';
                    tInvoiceObj.status_cd = '0';
                    tInvoiceObj.reg_user = tUserInfo.USER_ID;
                    tInvoiceObj.reg_datetime = tRetDate;
                    tInvoiceObj.factory_cd = col.FACTORY_CD;
                    tInvoiceObj.due_date = col.DUE_DATE;
                    tInvoiceObj.trade_type = col.TRADE_TYPE;
                    tInvoiceObj.trade_type2 = col.TRADE_TYPE2;
                    tInvoiceObj.payment_type = col.PAYMENT_TYPE;
                    tInvoiceObj.bl_no = col.BL_NO;
                    tInvoiceObj.manage_amt = '0';
                    tInvoiceObj.etc_amt = '0';
                    tInvoiceObj.license_date = '';
                    tInvoiceObj.license_no = '';

                    let tSQL99 = AFLib.createTableSql(
                        'KSV_INVOICE_MST',
                        tInvoiceObj,
                    );
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                });
            }

            if (tOrderArray.length > 0) {
                tOrderArray.forEach((col, i) => {
                    var m_Amount = 0;
                    var m_Price = 0;

                    if (tInput0.DELIVERY_TYPE === '8') {
                        m_Amount = col.IN_SHIP_QTY * col.PRICE;
                    }

                    var tInvoiceMemObj = {};
                    tInvoiceMemObj.invoice_no = col.INVOICE_NO;
                    tInvoiceMemObj.order_cd = col.ORDER_CD;
                    tInvoiceMemObj.seq = i + 1;
                    tInvoiceMemObj.ship_qty = col.IN_SHIP_QTY;
                    tInvoiceMemObj.ship_price = col.PRICE;
                    tInvoiceMemObj.ord_price = col.ORD_PRICE;
                    tInvoiceMemObj.diff_price =
                        parseFloat(col.PRICE) - parseFloat(col.ORD_PRICE);
                    tInvoiceMemObj.tot_amt = col.TOT_AMT;
                    tInvoiceMemObj.po_cd = col.PO_CD;
                    tInvoiceMemObj.country = col.COUNTRY;
                    tInvoiceMemObj.factory_cd = col.FACTORY_CD;
                    tInvoiceMemObj.ship_date = col.SHIP_DATE;
                    tInvoiceMemObj.ship_ptype = col.SHIP_PTYPE;
                    tInvoiceMemObj.nat_cd = col.NAT_CD;
                    tInvoiceMemObj.delivery_type = col.DELIVERY_TYPE;
                    tInvoiceMemObj.sales_price = col.SALES_PRICE;
                    let tSQL99 = AFLib.createTableSql(
                        'KSV_INVOICE_MEM',
                        tInvoiceMemObj,
                    );
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                });
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

            var sql3 = `
                ;
                
                select
                    convert(
                        varchar(8),
                        convert(datetime, a.ship_date, 112) + convert(int, c.days1),
                        112
                    ) as due_date1,
                    (a.tot_amt * c.percent1 * 0.01) as part_amt1,
                    convert(
                        varchar(8),
                        convert(datetime, a.ship_date, 112) + convert(int, c.days2),
                        112
                    ) as due_date2,
                    (a.tot_amt * c.percent2 * 0.01) as part_amt2,
                    convert(
                        varchar(8),
                        convert(datetime, a.ship_date, 112) + convert(int, c.days3),
                        112
                    ) as due_date3,
                    (a.tot_amt * c.percent3 * 0.01) as part_amt3
                from
                    ksv_invoice_mst a,
                    kcd_buyer b,
                    kcd_pay_rule c
                where
                    a.buyer_cd = b.buyer_cd
                    and c.cd_code = b.pay_rule
                    and a.invoice_no = '${tInvoiceObj.invoice_no}'
            `;
            var nRet3 = await prisma.$queryRaw(Prisma.raw(sql3));
            if (nRet3.length > 0) {
                tSQLArray = [];

                var tInvoicePart = {};
                tInvoicePart.invoice_no = tInvoiceObj.invoice_no;
                tInvoicePart.due_date = nRet3[0].due_date1;
                tInvoicePart.part_amt = nRet3[0].part_amt1;
                tInvoicePart.part_seq = '1';
                tInvoicePart.remark = '1';
                tInvoicePart.reg_user = tUserInfo.USER_ID;
                tInvoicePart.reg_datetime = tRetDate;
                let tSQL99 = AFLib.createTableSql(
                    'KSV_INVOICE_PART',
                    tInvoicePart,
                );
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                tInvoicePart = {};
                tInvoicePart.invoice_no = tInvoiceObj.invoice_no;
                tInvoicePart.due_date = nRet3[0].due_date2;
                tInvoicePart.part_amt = nRet3[0].part_amt2;
                tInvoicePart.part_seq = '2';
                tInvoicePart.remark = '2';
                tInvoicePart.reg_user = tUserInfo.USER_ID;
                tInvoicePart.reg_datetime = tRetDate;
                let tSQL99 = AFLib.createTableSql(
                    'KSV_INVOICE_PART',
                    tInvoicePart,
                );
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                tInvoicePart = {};
                tInvoicePart.invoice_no = tInvoiceObj.invoice_no;
                tInvoicePart.due_date = nRet3[0].due_date3;
                tInvoicePart.part_amt = nRet3[0].part_amt3;
                tInvoicePart.part_seq = '3';
                tInvoicePart.remark = '3';
                tInvoicePart.reg_user = tUserInfo.USER_ID;
                tInvoicePart.reg_datetime = tRetDate;
                let tSQL99 = AFLib.createTableSql(
                    'KSV_INVOICE_PART',
                    tInvoicePart,
                );
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
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED: Insert SHIP Record :' + args.datas.length;
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },

        mgrInsert_S0530_FILE_ADD: async (_, args, contextValue) => {
            //
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);

            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput1 = { ...args.datas };

            var tSQLArray = [];

            /*
      var sql1 = `
          delete from kcd_fileinfo
          where
              file_key = '${tInput1.FILE_KEY}'
      `;
      var nRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
*/

            var tObj = {};
            tObj.KIND = tInput1.KIND;
            tObj.FILE_KEY = tInput1.FILE_KEY;
            tObj.TITLE = tInput1.TITLE;
            tObj.NAME = tInput1.NAME;
            tObj.URL = tInput1.URL;
            tObj.UPD_DATETIME = tRetDate;
            tObj.OBJECT_NAME = tInput1.OBJECT_NAME;
            let tSQL99 = AFLib.createTableSql('KCD_FILEINFO', tObj);
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
                tObj.CODE = 'SUCCEED:' + tInput1.NAME;
                tObj.id = 0;
                tRetArray.push(tObj);
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Update PI_MST:' + e.message;
                tObj.id = 0;
                tRetArray.push(tObj);
            }

            return tRetArray;
        },
    },
};

export default moduleMutation_S0530_5;
