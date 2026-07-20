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
const moduleMutation_S0513_5 = {
    Mutation: {
        mgrInsert_S0513_5: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput0 = {
                ...args.datas1,
            };
            if (!tInput0.FACTORY_CD) tInput0.FACTORY_CD = 'FC034';

            if (!tInput0.ADJ_AMT) tInput0.ADJ_AMT = '0';
            if (!tInput0.SHIP_AMT) tInput0.SHIP_AMT = '0';
            if (!tInput0.TOT_AMT) tInput0.TOT_AMT = '0';

            tInput0.SHIP_MODE = '0';
            if (tInput0.SHIP_DATE === '') tInput0.SHIP_DATE = tRetDate1;

            // var tInvoiceNo = tRetDate;
            // tInput0.INVOICE_NO = tInvoiceNo;
            // Invoice_no은 입력되어야 함

            var tOrderArray = [];
            var tBuyerArray = [];

            console.log('Server Pro');
            var tSQLArray = [];
            // console.log(args.datas);

            // Invoice No Check
            const sql100 = `
                select
                    isnull(docu_no, '') as docu_no
                from
                    ksv_invoice_mst
                where
                    invoice_no = '${tInput0.INVOICE_NO}'
            `;
            var nRet100 = await prisma.$queryRaw(Prisma.raw(sql100));
            if (nRet100.length > 0) {
                var tObj = {
                    ...nRet100[0],
                };
                // var tErrorStr = 'ERROR:Already Registed Invoice';
                var tErrorStr = '';
                if (tObj.docu_no !== '')
                    tErrorStr =
                        'ERROR:이미 전표 처리된 invoice는 수정할수 없습니다:' +
                        tObj.docu_no;
                if (tErrorStr !== '') {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = tErrorStr;
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }
            }

            /// Invoice No Get
            var tInvoiceMst = [];
            if (tInput0.INVOICE_NO !== '') {
                const sql11 = `
                    select
                        *
                    from
                        ksv_invoice_mst
                    where
                        invoice_no = '${tInput0.INVOICE_NO}'
                `;
                tInvoiceMst = await prisma.$queryRaw(Prisma.raw(sql11));
            }

            var tInvoiceNo = '';
            var tInvoiceNoPrefix = `${tUserInfo.USER_ID}${tRetDate1.substring(2, 4)}-`;
            var sql1 = `
                ;
                
                select
                    isnull(max(invoice_no), '0') as max_seq
                from
                    ksv_invoice_mst
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

            var tOpMode = 'I';
            if (tInvoiceMst.length > 0) {
                tOpMode = 'U';
                tInvoiceNo = tInput0.INVOICE_NO;
            } else {
                tOpMode = 'I';
                if (tInput0.INVOICE_NO === '') {
                    if (
                        tInput0.SHIP_MODE === '1' ||
                        tInput0.SHIP_MODE === '6'
                    ) {
                        tInvoiceNo = `${tInvoiceNoPrefix}${tMaxSeqStr}`;
                        tTotAmt = 0;
                        tShipPrice = 0;
                        tAdjAmt = 0;
                    } else if (
                        tInput0.DELIVERY_TYPE === '6' ||
                        tInput0.DELIVERY_TYPE === '7' ||
                        tInput0.DELIVERY_TYPE === '8' ||
                        tInput0.DELIVERY_TYPE === 'FK'
                    ) {
                        tInvoiceNo = `${tInvoiceNoPrefix}${tMaxSeqStr}`;
                    } else {
                        tInvoiceNo = `${tInvoiceNoPrefix}${tMaxSeqStr}`;
                    }
                } else {
                    tInvoiceNo = tInput0.INVOICE_NO;
                }
            }

            // Remove 처리
            const sqlOrderShip = `
                select
                    a.*,
                    b.ORDER_STATUS
                from
                    ksv_order_ship a,
                    ksv_order_mst b
                where
                    a.invoice_no = '${tInvoiceNo}'
                    and a.order_cd = b.order_cd
            `;
            var nRetOrderShip = await prisma.$queryRaw(
                Prisma.raw(sqlOrderShip),
            );
            var tRemoveOrderShip = [];
            nRetOrderShip.forEach((col, i) => {
                var tFlag = 0;
                args.datas.forEach((col1, i1) => {
                    if (
                        col.ORDER_CD === col1.ORDER_CD &&
                        col.PROD_CD === col1.PROD_CD &&
                        col.SHIP_DATE === tInput0.SHIP_DATE &&
                        col.INVOICE_NO === tInvoiceNo
                    )
                        tFlag = 1;
                });
                if (tFlag === 0) {
                    var tObj = {
                        ...col,
                    };
                    tRemoveOrderShip.push(tObj);
                }
            });
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRemoveOrderShip.length; tIdx++) {
                var tOne = {
                    ...tRemoveOrderShip[tIdx],
                };

                let tSQL99 = `
                    delete from ksv_order_ship
                    where
                        invoice_no = '${tOne.INVOICE_NO}'
                        and order_cd = '${tOne.ORDER_CD}'
                        and ship_date = '${tOne.SHIP_DATE}'
                        and prod_cd = '${tOne.PROD_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            }

            // Remove 처리 - End

            // delete ssv_order_ship_size
            let updateSql = `
                delete from ssv_order_ship_size
                where
                    invoice_no = '${tInvoiceNo}'
            `;
            var updateRet = await prisma.$queryRaw(Prisma.raw(updateSql));

            var tSumShipQty = 0;
            var tSumShipAmount = 0;
            var tSumOrderAmount = 0;

            var tBuyerCd = '';
            var tCurrCd = '';
            var tFactoryCd = '';
            var tDueDate = '';

            tIdx = 0;
            var tOrderInfo = {};
            var tOrderArray = [];
            var tExclMessage = '';
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var tWObj = {};
                tWObj.ORDER = {};

                var tInput = {
                    ...args.datas[tIdx],
                };

                var tShipAmount = 0;

                var tFcChkFlag = '0';
                // Delivery_Type에 따라 '2',  hand_carry, express, other, keep

                const sql0 = `
                    select
                        a.*,
                        isnull(b.PO_CD, '') as PO_CD,
                        c.size_member
                    from
                        ksv_order_mst a
                        left join ksv_po_mem b on a.order_cd = b.order_cd,
                        kcd_size_mst c
                    where
                        a.order_cd = '${tInput.ORDER_CD}'
                        and a.size_group = c.size_group
                `;
                var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                if (nRet0.length <= 0) {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE =
                        'ERROR:Order Status을 확인하세요. PO처리 여부를 확인하세요';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                } else {
                    if (parseFloat(nRet0[0].ORDER_STATUS) === 4) {
                       /*
                       var tRetArray = [];
                       var tObj = {};
                       tObj.CODE = 'ERROR:Canceled Order 는 Ship 등록할수 없습니다';
                       tObj.id = 0; 
                       tRetArray.push(tObj);
                       return (tRetArray);
                       */
                       if (tExclMessage) tExclMessage = `${tExclMessage} , ${nRet0[0].ORDER_CD}는 Cancel `;
                       else  tExclMessage = `${tExclMessage} ${nRet0[0].ORDER_CD}는 Cancel `;
                       continue;
                    }
                    if (parseFloat(nRet0[0].ORDER_STATUS) >= 7) {
                       /*
                       var tRetArray = [];
                       var tObj = {};
                       tObj.CODE = `ERROR: Ship end, End Report, End된 Order 는 Ship 등록할수 없습니다(Order Status:${nRet0[0].ORDER_STATUS})`;
                       tObj.id = 0; 
                       tRetArray.push(tObj);
                       return (tRetArray);
                       */
                       if (tExclMessage) tExclMessage = `${tExclMessage} , ${nRet0[0].ORDER_CD}는 Ship End이상 `;
                       else  tExclMessage = `${tExclMessage} ${nRet0[0].ORDER_CD}는 Ship end이상 `;
                       continue;
                    }
                }

                tOrderInfo = nRet0[0];

                var tOrderAmount = 0;
                /*
                if ((tFactoryCd !== '' && tFactoryCd !== tOrderInfo.FACTORY_CD) ||
                    (tBuyerCd !== '' && tBuyerCd !== tOrderInfo.ORDER_CD.substring(0,2)) ||
                    (tCurrCd !== '' && tCurrCd !== tOrderInfo.CURR_CD)) {
                      var tRetArray = [];
                      var tObj = {};
                      tObj.CODE = 'ERROR: 같은 Factory, Buyer, Curr만 하나의 Invoice로 만들수 있습니다 ';
                      tObj.id = 0; 
                      tRetArray.push(tObj);
                      return (tRetArray);
                }
                */
                var tCompFactory = tOrderInfo.FACTORY_CD;
                if (tCompFactory === 'FC113' || tCompFactory === 'FC087') {
                    tCompFactory = 'FC034';
                }
                if (
                    (tFactoryCd !== '' && tFactoryCd !== tCompFactory) ||
                    (tBuyerCd !== '' &&
                        tBuyerCd !== tOrderInfo.ORDER_CD.substring(0, 2))
                ) {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = `ERROR: 같은 Factory, Buyer 하나의 Invoice로 만들수 있습니다(${tFactoryCd},${tBuyerCd}/${tOrderInfo.FACTORY_CD}.${tOrderInfo.ORDER_CD.substring(0, 2)}) `;
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }

                //

                // tFactoryCd = tOrderInfo.FACTORY_CD;
                tFactoryCd = tCompFactory;
                tBuyerCd = tOrderInfo.ORDER_CD.substring(0, 2);
                tDueDate = tOrderInfo.DUE_DATE;
                // tCurrCd = tOrderInfo.CURR_CD;
                tCurrCd = 'USD';

                var tInShipQty = 0;
                var tInShipSizeCnt = '';
                var tInShipAmount = 0;
                var tInShipPrice = 0;

                const sql10 = `
                    select
                        *
                    from
                        ksv_order_ship
                    where
                        invoice_no = '${tInvoiceNo}'
                        and order_cd = '${tInput.ORDER_CD}'
                        and ship_date = '${tInput0.SHIP_DATE}'
                        and prod_cd = '${tInput.PROD_CD}'
                `;
                var nRet10 = await prisma.$queryRaw(Prisma.raw(sql10));
                if (nRet10.length > 0) {
                    var tObj1 = {
                        ...nRet10[0],
                    };

                    if (
                        tOrderInfo.ORDER_STATUS === '4' ||
                        parseInt(tOrderInfo.ORDER_STATUS) >= 7
                    ) {
                        tInput.IN_SHIP_SIZE_CNT = tObj1.SIZE_CNT;
                        tInput.PRICE_CNT = tObj1.PRICE_CNT;
                    }

                    var tSizeArray0 = tOrderInfo.size_member.split(',');
                    var tSizeArray = [];
                    tSizeArray0.forEach((col, i) => {
                        var tObj0 = {};
                        tObj0.size = col;
                        tObj0.idx = i;
                        tObj0.value = 0;
                        tSizeArray.push(tObj0);
                    });

                    var tIdx0 = 0;
                    var tTotShipSizeCnt = '';
                    var tTotShipCnt = 0;
                    var tTotShipAmt = 0;

                    /*
                    var tIdx1 = 0;
                    var tArray0 = [];
                    for (tIdx1 = 0; tIdx1 < tSizeArray.length; tIdx1++) {
                            var tObj2 = { ...tSizeArray[tIdx1] };
                            tObj2.value = parseInt(tObj1.SIZE_CNT.substring(tIdx1*6, (tIdx1*6)+6));
                            tInShipQty += tObj2.value;
                            tArray0.push(tObj2);
                    }
                    tSizeArray = [ ...tArray0 ];
                    */

                    var tIdx1 = 0;
                    var tArray0 = [];
                    console.log(`IN_SHIP_SIZE_CNT:${tInput.IN_SHIP_SIZE_CNT}`);
                    for (tIdx1 = 0; tIdx1 < tSizeArray.length; tIdx1++) {
                        var tObj2 = {
                            ...tSizeArray[tIdx1],
                        };
                        var tVal0 = parseInt(
                            tInput.IN_SHIP_SIZE_CNT.substring(
                                tIdx1 * 6,
                                tIdx1 * 6 + 6,
                            ),
                        );
                        var tPrice1 = parseFloat(
                            tInput.PRICE_CNT.substring(
                                tIdx1 * 10,
                                tIdx1 * 10 + 10,
                            ),
                        );
                        tObj2.value += tVal0;
                        tInShipQty += tVal0;
                        tInShipAmount += tVal0 * tPrice1;
                        tArray0.push(tObj2);

                        var tInObj2 = {};
                        tInObj2.invoice_no = tInvoiceNo;
                        tInObj2.order_cd = tInput.ORDER_CD;
                        tInObj2.prod_cd = tInput.PROD_CD;
                        tInObj2.size_seq = tIdx1;
                        tInObj2.size = tObj2.size;
                        tInObj2.ship_qty = parseFloat(tVal0);
                        tInObj2.ship_price = parseFloat(tPrice1);
                        if (parseFloat(tVal0) > 0) {
                            let updateSql = AFLib.createTableSql(
                                'SSV_ORDER_SHIP_SIZE',
                                tInObj2,
                            );
                            var updateRet = await prisma.$queryRaw(
                                Prisma.raw(updateSql),
                            );
                        }
                    }
                    console.log(tArray0);
                    tSizeArray = [...tArray0];

                    // tInShipAmount = tInShipQty * parseFloat(tInput.PRICE);
                    tInShipAmount = AFLib.numToFixed(tInShipAmount, 2);

                    tInShipPrice = 0;
                    if (tInShipQty > 0)
                        tInShipPrice = tInShipAmount / tInShipQty;
                    tInShipPrice = AFLib.numToFixed(tInShipPrice, 4);

                    tInShipSizeCnt = '';
                    tSizeArray.forEach((col3, i3) => {
                        let tZero = '000000';
                        let tStr =
                            tZero.substring(0, 6 - String(col3.value).length) +
                            String(col3.value);
                        tInShipSizeCnt += tStr;
                    });

                    let tSQL99 = `
                        delete from ksv_order_ship
                        where
                            invoice_no = '${tInvoiceNo}'
                            and order_cd = '${tInput.ORDER_CD}'
                            and ship_date = '${tInput0.SHIP_DATE}'
                            and prod_cd = '${tInput.PROD_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    var tInObj = {};
                    tInObj.order_cd = tObj1.ORDER_CD;
                    tInObj.prod_cd = tObj1.PROD_CD;
                    tInObj.ship_date0 = tObj1.SHIP_DATE;
                    tInObj.ship_date = tObj1.SHIP_DATE;
                    tInObj.ship_ptype = '0';
                    tInObj.nat_cd = tInput0.COUNTRY;
                    tInObj.delivery_type = tInput0.DELIVERY_TYPE;
                    tInObj.ship_cnt = tInShipQty;
                    tInObj.size_cnt = tInShipSizeCnt;
                    tInObj.price_cnt = tInput.PRICE_CNT;
                    tInObj.invoice_no = tObj1.INVOICE_NO;
                    tInObj.status_cd = '0';
                    tInObj.reg_user = tObj1.REG_USER;
                    tInObj.reg_datetime = tObj1.REG_DATETIME;
                    tInObj.exfactory = tInput0.EX_FACTORY_DATE;
                    tInObj.fc_chk_flag = tObj1.FC_CHK_FLAG;
                    // tInObj.ship_price   = tInput.PRICE;
                    tInObj.ship_price = tInShipPrice;
                    tInObj.ship_amount = tInShipAmount;
                    tInObj.atd = tInput0.ATD;
                    let tSQL99 = AFLib.createTableSql('KSV_ORDER_SHIP', tInObj);
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    /*
                    const sql11 = `
                        select
                            *
                        from
                            ksv_order_ship
                        where
                            invoice_no = '${tInvoiceNo}'
                            and order_cd = '${tInput.ORDER_CD}'
                            and ship_date = '${tInput0.SHIP_DATE}'
                            and prod_cd = '${tInput.PROD_CD}'
                            -- and   ship_ptype = '${tInput0.SHIP_MODE}'
                            -- and   delivery_type = '${tInput0.DELIVERY_TYPE}'
                            -- and   nat_cd = '${tInput0.COUNTRY}'
                    `;
                    var nRet11 = await prisma.$queryRaw(Prisma.raw(sql11));


                    let tSQL99 = `
                        update ksv_order_ship
                        set
                            ship_cnt = ${tInShipQty},
                            size_cnt = '${tInShipSizeCnt}',
                            ship_amount = ${tInShipAmount},
                            ship_price = ${tInput.PRICE},
                            nat_cd = '${tInput0.COUNTRY}',
                            -- ship_ptype = '${tInput0.SHIP_MODE}',
                            delivery_type = '${tInput0.DELIVERY_TYPE}',
                            exfactory = '${tInput0.EX_FACTORY_DATE}'
                        where
                            invoice_no = '${tInvoiceNo}'
                            and order_cd = '${tInput.ORDER_CD}'
                            and ship_date = '${tInput0.SHIP_DATE}'
                            and prod_cd = '${tInput.PROD_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    if (nRet11.length <= 0) tSQLArray.push(tSQL99_1);
                    */
                } else {
                    tInShipQty = 0;
                    tInShipSizeCnt = tInput.IN_SHIP_SIZE_CNT;
                    tInShipAmount = 0;
                    tInShipPrice = 0;

                    var tSizeArray0 = tOrderInfo.size_member.split(',');
                    var tSizeArray = [];
                    tSizeArray0.forEach((col, i) => {
                        var tObj0 = {};
                        tObj0.size = col;
                        tObj0.idx = i;
                        tObj0.value = 0;
                        tSizeArray.push(tObj0);
                    });

                    var tIdx0 = 0;
                    var tTotShipSizeCnt = '';
                    var tTotShipCnt = 0;
                    var tTotShipAmt = 0;

                    var tIdx1 = 0;
                    var tArray0 = [];
                    for (tIdx1 = 0; tIdx1 < tSizeArray.length; tIdx1++) {
                        var tObj2 = {
                            ...tSizeArray[tIdx1],
                        };
                        var tVal0 = parseInt(
                            tInput.IN_SHIP_SIZE_CNT.substring(
                                tIdx1 * 6,
                                tIdx1 * 6 + 6,
                            ),
                        );
                        var tPrice1 = parseFloat(
                            tInput.PRICE_CNT.substring(
                                tIdx1 * 10,
                                tIdx1 * 10 + 10,
                            ),
                        );
                        tObj2.value += tVal0;
                        tInShipQty += tVal0;
                        tInShipAmount += tVal0 * tPrice1;
                        tArray0.push(tObj2);

                        var tInObj2 = {};
                        tInObj2.invoice_no = tInvoiceNo;
                        tInObj2.order_cd = tInput.ORDER_CD;
                        tInObj2.prod_cd = tInput.PROD_CD;
                        tInObj2.size_seq = tIdx1;
                        tInObj2.size = tObj2.size;
                        tInObj2.ship_qty = parseFloat(tVal0);
                        tInObj2.ship_price = parseFloat(tPrice1);
                        if (parseFloat(tVal0) > 0) {
                            let updateSql = AFLib.createTableSql(
                                'SSV_ORDER_SHIP_SIZE',
                                tInObj2,
                            );
                            var updateRet = await prisma.$queryRaw(
                                Prisma.raw(updateSql),
                            );
                        }
                    }
                    tSizeArray = [...tArray0];

                    // tInShipAmount = tInShipQty * parseFloat(tInput.PRICE);
                    tInShipAmount = AFLib.numToFixed(tInShipAmount, 2);

                    var tInShipPrice = 0;
                    if (tInShipQty > 0)
                        tInShipPrice = tInShipAmount / tInShipQty;
                    tInShipPrice = AFLib.numToFixed(tInShipPrice, 4);

                    tInShipSizeCnt = '';
                    tSizeArray.forEach((col3, i3) => {
                        let tZero = '000000';
                        let tStr =
                            tZero.substring(0, 6 - String(col3.value).length) +
                            String(col3.value);
                        tInShipSizeCnt += tStr;
                    });

                    var tInObj = {};
                    tInObj.order_cd = tInput.ORDER_CD;
                    tInObj.prod_cd = tInput.PROD_CD;
                    tInObj.ship_date0 = tInput0.SHIP_DATE;
                    tInObj.ship_date = tInput0.SHIP_DATE;
                    // tInObj.ship_ptype  = tInput0.SHIP_MODE;
                    tInObj.ship_ptype = '0';
                    tInObj.nat_cd = tInput0.COUNTRY;
                    tInObj.delivery_type = tInput0.DELIVERY_TYPE;
                    tInObj.ship_cnt = tInShipQty;
                    tInObj.price_cnt = tInput.PRICE_CNT;
                    tInObj.size_cnt = tInShipSizeCnt;
                    tInObj.invoice_no = tInvoiceNo;
                    tInObj.status_cd = '0';
                    tInObj.reg_user = tUserInfo.USER_ID;
                    tInObj.reg_datetime = tRetDate;
                    tInObj.exfactory = tInput0.EX_FACTORY_DATE;
                    tInObj.fc_chk_flag = tFcChkFlag;
                    tInObj.ship_price = tInShipPrice;
                    tInObj.ship_amount = tInShipAmount;
                    tInObj.atd = tInput0.ATD;
                    let tSQL99 = AFLib.createTableSql('KSV_ORDER_SHIP', tInObj);
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    // SHIP_QTY <= 0 이어어도 insert
                    // if (tInShipQty > 0) tSQLArray.push(tSQL99_1);
                    tSQLArray.push(tSQL99_1);
                }

                tShipAmount = parseFloat(tInShipAmount);
                // tOrderAmount = parseFloat(tInShipQty) * parseFloat(tOrderInfo.AVR_PRICE);
                tOrderAmount =
                    parseFloat(tInShipQty) * parseFloat(tOrderInfo.USD_PRICE);
                tOrderAmount = AFLib.numToFixed(tOrderAmount, 2);

                tSumShipQty += tInShipQty;
                tSumShipAmount += tShipAmount;
                tSumOrderAmount += tOrderAmount;

                var tArrayTmp = [];
                var tFlagTmp = 0;
                tOrderArray.forEach((col, i) => {
                    var tObj = {
                        ...col,
                    };
                    tObj.SHIP_PRICE = 0;
                    if (parseFloat(tObj.SHIP_QTY) > 0)
                        tObj.SHIP_PRICE =
                            parseFloat(tObj.SHIP_AMOUNT) /
                            parseFloat(tObj.SHIP_QTY);

                    var tPrice1 = AFLib.numToFixed(
                        parseFloat(tObj.SHIP_PRICE),
                        4,
                    );
                    var tPrice2 = AFLib.numToFixed(parseFloat(tInShipPrice), 4);

                    if (
                        tObj.ORDER.ORDER_CD === tInput.ORDER_CD &&
                        tPrice1 === tPrice2
                    ) {
                        var tVal =
                            parseFloat(tObj.SHIP_QTY) + parseFloat(tInShipQty);
                        var tAmt =
                            parseFloat(tObj.SHIP_AMOUNT) +
                            parseFloat(tInShipAmount);
                        tAmt = AFLib.numToFixed(tAmt, 2);
                        tObj.SHIP_QTY = tVal;
                        tObj.SHIP_AMOUNT = tAmt;
                        tObj.SHIP_PRICE = AFLib.numToFixed(tObj.SHIP_PRICE, 4);
                        tArrayTmp.push(tObj);
                        tFlagTmp = 1;
                    } else {
                        tArrayTmp.push(tObj);
                    }
                });
                if (tFlagTmp === 0) {
                    var tWObj = {};
                    tWObj.ORDER = {
                        ...tOrderInfo,
                    };
                    tWObj.INPUT = {
                        ...tInput,
                    };
                    tWObj.SHIP_QTY = tInShipQty;
                    tWObj.SHIP_CNT = tInShipSizeCnt;
                    tWObj.SHIP_AMOUNT = tInShipAmount;
                    tWObj.SHIP_AMOUNT = AFLib.numToFixed(tWObj.SHIP_AMOUNT, 2);
                    tWObj.SHIP_PRICE = 0;
                    if (parseFloat(tWObj.SHIP_QTY) > 0)
                        tWObj.SHIP_PRICE =
                            parseFloat(tWObj.SHIP_AMOUNT) /
                            parseFloat(tWObj.SHIP_QTY);
                    tWObj.SHIP_PRICE = AFLib.numToFixed(tWObj.SHIP_PRICE, 4);
                    tArrayTmp.push(tWObj);
                }
                tOrderArray = [...tArrayTmp];

                // ssv_order_ship
                if (tInput0.IS_NON_GARMENT !== '1') {
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
                            tInShipSizeCnt.substring(tIdx10 * 6, (tIdx10 + 1) * 6),
                        );
                        if (parseFloat(tSizeCnt) <= 0) continue;
                        var tInObj = {};
                        tInObj.order_cd = tInput.ORDER_CD;
                        tInObj.prod_cd = tInput.PROD_CD;
                        tInObj.ship_date = tInput0.SHIP_DATE;
                        // tInObj.ship_ptype  = tInput0.SHIP_MODE;
                        tInObj.ship_ptype = '0';
                        tInObj.size = tSizeArray[tIdx10];
                        tInObj.ship_cnt = tSizeCnt;
                        tInObj.status_cd = '0';
                        tInObj.reg_user = tUserInfo.USER_ID;
                        tInObj.reg_datetime = tRetDate;
                        let tSQL99 = AFLib.createTableSql('SSV_ORDER_SHIP', tInObj);
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);
                    }
                }
            }

            var tWonAmt2 = 0;
            var tRateArray = [];
            // usd_rate, won_amt2
            var sql21 = `
                select
                    *
                from
                    kcd_currency
                where
                    start_date = '${tInput0.SHIP_DATE}'
            `;
            var tRateArray = await prisma.$queryRaw(Prisma.raw(sql21));
            if (tRateArray.length <= 0) {
                sql21 = `
                    select
                        *
                    from
                        kcd_currency
                    where
                        start_date = (
                            select
                                max(start_date)
                            from
                                kcd_currency
                            where
                                curr_cd = 'USD'
                        )
                `;
                tRateArray = await prisma.$queryRaw(Prisma.raw(sql21));
            }

            tRateArray.forEach((col, i) => {
                if (col.CURR_CD === 'USD') tWonAmt2 = col.WON_AMT2;
            });

            var tVosAmt = 0;
            var tDueDate = '0';

            var tIdx20 = 0;
            var sumInvoiceMem = 0;
            var tOrderArray1 = [];

            var tOrderArray2 = [];
            var tWorkObj = {};
            var sqlInOrder = '';
            var saveInvoiceMem = [];
            for (tIdx20 = 0; tIdx20 < tOrderArray.length; tIdx20++) {
                var col = {
                    ...tOrderArray[tIdx20],
                };
                var tCheck = 0;
                tOrderArray2.forEach((col1, i1) => {
                    if (col.ORDER.ORDER_CD === col1.ORDER_CD) {
                        var tObj2 = {
                            ...col1,
                        };
                        tObj2.DATAS.push(col);
                        tOrderArray2[i1] = {
                            ...tObj2,
                        };
                        tCheck = 1;
                    }
                });
                if (tCheck === 0) {
                    tWorkObj = {};
                    tWorkObj.ORDER_CD = col.ORDER.ORDER_CD;
                    tWorkObj.DATAS = [];
                    tWorkObj.DATAS.push(col);
                    tOrderArray2.push(tWorkObj);

                    var sql21 = `
                        select
                            *
                        from
                            ksv_invoice_mem
                        where
                            invoice_no = '${tInvoiceNo}'
                            and order_cd = '${col.ORDER.ORDER_CD}'
                    `;
                    saveInvoiceMem = await prisma.$queryRaw(Prisma.raw(sql21));

                    // order status '7, 8, 9' 인경우 invoice_mem 안 지움
                    let tSQL99 = `
                        delete from ksv_invoice_mem
                        where
                            invoice_no = '${tInvoiceNo}'
                            and order_cd = '${col.ORDER.ORDER_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    if (parseFloat(col.ORDER.ORDER_STATUS) >= 7);
                    else tSQLArray.push(tSQL99_1);

                    if (sqlInOrder === '')
                        sqlInOrder = ` '${col.ORDER.ORDER_CD}' `;
                    else sqlInOrder += ` ,'${col.ORDER.ORDER_CD}' `;
                }
            }

            console.log(`Order Array:==========================>`);
            tOrderArray.forEach((col, i) => {
                console.log(`${col.ORDER.ORDER_CD}/${col.SHIP_PRICE}`);
            });

            console.log(`Order Array2:==========================>`);
            tOrderArray2.forEach((col, i) => {
                console.log(`${col.ORDER_CD}/${col.DATAS.length}`);
            });

            const sqlMaxSeq = `
                select
                    isnull(max(seq), 0) as max_seq
                from
                    ksv_invoice_mem
                where
                    invoice_no = '${tInvoiceNo}'
            `;
            var retMaxSeq = await prisma.$queryRaw(Prisma.raw(sqlMaxSeq));
            var invoiceMemSeq = retMaxSeq[0].max_seq + 1;

            var orderCdSql = '';
            if (sqlInOrder !== '') {
                orderCdSql = `and   a.order_cd in (${sqlInOrder})`;
            }

            const orderShipSizeSql = `
                select
                    a.invoice_no,
                    a.order_cd,
                    a.ship_price,
                    b.avr_price,
                    b.usd_price,
                    b.factory_cd,
                    b.curr_cd,
                    b.due_date,
                    b.po_cd,
                    b.order_status,
                    sum(a.ship_qty) as ship_qty
                from
                    ssv_order_ship_size a,
                    ksv_order_mst b
                where
                    a.order_cd = b.order_cd
                    and a.invoice_no = '${tInvoiceNo}' ${orderCdSql}
                group by
                    a.invoice_no,
                    a.order_cd,
                    a.ship_price,
                    b.avr_price,
                    b.usd_price,
                    b.factory_cd,
                    b.curr_cd,
                    b.due_date,
                    b.po_cd,
                    b.order_status
            `;
            var orderShipSizeRet = await prisma.$queryRaw(
                Prisma.raw(orderShipSizeSql),
            );

            for (tIdx20 = 0; tIdx20 < orderShipSizeRet.length; tIdx20++) {
                // var col0 = { ...tOrderArray2[tIdx20] };
                var col = {
                    ...orderShipSizeRet[tIdx20],
                };

                var sql20_1 = `
                    select
                        *
                    from
                        kcd_currency
                    where
                        curr_cd = '${col.curr_cd}'
                        and start_date = '${tInput0.SHIP_DATE}'
                `;
                var nRet20_1 = await prisma.$queryRaw(Prisma.raw(sql20_1));
                if (nRet20_1.length <= 0) {
                    sql20_1 = `
                        select
                            *
                        from
                            kcd_currency
                        where
                            curr_cd = '${col.curr_cd}'
                            and start_date = (
                                select
                                    max(start_date)
                                from
                                    kcd_currency
                                where
                                    curr_cd = '${col.curr_cd}'
                            )
                    `;
                    nRet20_1 = await prisma.$queryRaw(Prisma.raw(sql20_1));
                }
                var tCurrency_1 = {};
                if (nRet20_1.length > 0)
                    tCurrency_1 = {
                        ...nRet20_1[0],
                    };

                if (parseFloat(col.due_date) > parseFloat(tDueDate))
                    tDueDate = col.due_date;

                // Invoice Mem은 invoice_no, order_cd, ship_price가 키임
                const sql111 = `
                    select
                        *
                    from
                        ksv_invoice_mem
                    where
                        invoice_no = '${tInvoiceNo}'
                        and order_cd = '${col.order_cd}'
                        and ship_price = '${col.ship_price}'
                        and ship_date = '${tInput0.SHIP_DATE}'
                `;
                var tInvoiceMem = await prisma.$queryRaw(Prisma.raw(sql111));
                if (parseFloat(col.order_status) >= 7);
                else tInvoiceMem = [];

                var tShipPrice = parseFloat(col.ship_price);
                var tSalesPrice = 0;

                if (col.curr_cd !== 'USD') {
                    tSalesPrice = tShipPrice / tCurrency_1.USD_RATE;
                    if (col.curr_cd === 'KRW')
                        tSalesPrice = AFLib.numToFixed(tSalesPrice, 0);
                    else tSalesPrice = AFLib.numToFixed(tSalesPrice, 4);
                } else {
                    tSalesPrice = tShipPrice;
                }

                // var tSalesPrice =  parseFloat(col.ORDER.AVR_PRICE);
                // var tSalesPrice =  parseFloat(col.SHIP_PRICE);
                /*
                if (col.ORDER.CURR_CD !== 'USD') {
                    tRateArray.forEach((col1, i1) => {
                       if (col1.CURR_CD === col.ORDER.CURR_CD) {
                           tSalesPrices = parseFloat(col.SHIP_PRICE) / parseFloat(col1.USD_RATE);
                       }
                    });
                }
                */
                col.ship_price = tShipPrice;
                col.ship_price = AFLib.numToFixed(col.ship_price, 4);
                col.sales_price = tSalesPrice;
                col.sales_price = AFLib.numToFixed(col.sales_price, 4);
                col.ship_amount = tShipPrice * parseFloat(col.ship_qty);
                tOrderArray1.push(col);

                if (parseFloat(col.order_status) >= 7) {
                    col.ship_price = tInvoiceMem[0].SHIP_PRICE;
                    tShipPrice = AFLib.numToFixed(col.ship_price, 4);
                    col.sales_price = tInvoiceMem[0].SALES_PRICE;
                    tSalesPrice = AFLib.numToFixed(col.sales_price, 4);
                    col.ship_amount = tInvoiceMem[0].TOT_AMT;
                }

                var tTotAmt100 = AFLib.numToFixed(
                    parseFloat(col.ship_amount),
                    2,
                );
                sumInvoiceMem += tTotAmt100;

                if (
                    tInput0.COUNTRY === 'kr' ||
                    tInput0.COUNTRY === 'ks' ||
                    tInput0.COUNTRY === 'ko'
                ) {
                    if (col.curr_cd !== 'KRW') {
                        tVosAmt += tSalesPrice * parseFloat(col.ship_qty);
                    } else {
                        tVosAmt += tSalesPrice * parseFloat(col.ship_qty);
                    }
                }

                var sql20 = `
                    ;
                    
                    select
                        isnull(max(fob_seq), 0) as max_seq
                    from
                        ksv_order_fob
                    where
                        order_cd = '${col.order_cd}'
                `;
                var nRet20 = await prisma.$queryRaw(Prisma.raw(sql20));
                var tFobSeq = 1;
                if (nRet20.length > 0)
                    tFobSeq = parseInt(nRet20[0].max_seq) + 1;

                col.ship_price = AFLib.numToFixed(col.ship_price, 4);
                if (col.curr_cd === 'KRW')
                    tSalesPrice = AFLib.numToFixed(tSalesPrice, 0);
                else tSalesPrice = AFLib.numToFixed(tSalesPrice, 4);
                tTotAmt100 = AFLib.numToFixed(tTotAmt100, 2);

                if (tInvoiceMem.length > 0) {
                    if (parseFloat(col.order_status) >= 7) {
                    } else {
                        let tSQL99 = `
                            update ksv_invoice_mem
                            set
                                seq = ${invoiceMemSeq},
                                ship_qty = ${col.ship_qty},
                                -- ship_price = ${col.ship_price},
                                sales_price = ${tSalesPrice},
                                tot_amt = ${tTotAmt100},
                                nat_cd = '${tInput0.COUNTRY}',
                                ship_date = '${tInput0.SHIP_DATE}'
                            where
                                invoice_no = '${tInvoiceNo}'
                                and order_cd = '${col.order_cd}'
                                and ship_price = '${col.ship_price}'
                                -- and   ship_date = '${tInput0.SHIP_DATE}'
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));

                        // SHIP_QTY <= 0이어도 저장
                        // if (parseFloat(col.SHIP_QTY) >0) tSQLArray.push(tSQL99_1);
                        tSQLArray.push(tSQL99_1);
                    }
                    invoiceMemSeq += 1;
                } else {
                    /*
                    let tSQL99 = `
                        delete from ksv_invoice_mem
                        where
                            invoice_no = '${tInvoiceNo}'
                            and order_cd = '${col.order_cd}'
                            and ship_price = '${col.ship_price}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                    */

                    // invoice_mem의 curr_cd 찾기
                    var m_Amount = 0;
                    var m_Price = 0;
                    if (tInput0.DELIVERY_TYPE === '8') {
                        m_Amount =
                            parseFloat(col.ship_qty) *
                            parseFloat(col.ship_price);
                    }

                    col.ship_price = AFLib.numToFixed(col.ship_price, 4);
                    if (col.curr_cd === 'KRW')
                        tSalesPrice = AFLib.numToFixed(tSalesPrice, 0);
                    else tSalesPrice = AFLib.numToFixed(tSalesPrice, 4);
                    tTotAmt100 = AFLib.numToFixed(tTotAmt100, 2);

                    var tInvoiceMemObj = {};
                    tInvoiceMemObj.invoice_no = tInvoiceNo;
                    tInvoiceMemObj.order_cd = col.order_cd;
                    tInvoiceMemObj.seq = invoiceMemSeq;
                    tInvoiceMemObj.ship_qty = col.ship_qty;
                    tInvoiceMemObj.ship_price = col.ship_price;
                    tInvoiceMemObj.ord_price = col.avr_price;
                    tInvoiceMemObj.diff_price =
                        parseFloat(col.ship_price) - parseFloat(col.avr_price);
                    tInvoiceMemObj.tot_amt = tTotAmt100;
                    tInvoiceMemObj.po_cd = col.po_cd;
                    tInvoiceMemObj.country = tInput0.COUNTRY;
                    tInvoiceMemObj.factory_cd = col.factory_cd;
                    tInvoiceMemObj.ship_date = tInput0.SHIP_DATE;
                    tInvoiceMemObj.ship_ptype = tInput0.SHIP_MODE;
                    tInvoiceMemObj.nat_cd = tInput0.COUNTRY;
                    tInvoiceMemObj.delivery_type = tInput0.DELIVERY_TYPE;
                    tInvoiceMemObj.sales_price = tSalesPrice;
                    let tSQL99 = AFLib.createTableSql(
                        'KSV_INVOICE_MEM',
                        tInvoiceMemObj,
                    );
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    invoiceMemSeq += 1;

                    // SHIP_QTY <= 0 이어도 저장
                    // if (parseFloat(col.SHIP_QTY) >0) tSQLArray.push(tSQL99_1);
                    tSQLArray.push(tSQL99_1);
                }
            }

            /// Invoice Mst
            // var tTotAmt = AFLib.numToFixed(parseFloat(tSumShipAmount), 2);
            /*
            var tTotAmt = AFLib.numToFixed(parseFloat(sumInvoiceMem), 2);
            var tOrdAmt = AFLib.numToFixed(parseFloat(tSumOrderAmount), 2);
            */
            /*
            var tAdjAmt = tTotAmt - tOrdAmt;
                tAdjAmt = AFLib.numToFixed(tAdjAmt, 2);
            */

            var tTotAmt = AFLib.numToFixed(parseFloat(sumInvoiceMem), 2);
            tTotAmt = parseFloat(tTotAmt);
            var tOrdAmt = AFLib.numToFixed(parseFloat(sumInvoiceMem), 2);
            tOrdAmt = parseFloat(tOrdAmt);
            // var tOrdAmt = AFLib.numToFixed(parseFloat(tSumOrderAmount), 2);

            var tAdjAmt = AFLib.numToFixed(parseFloat(tInput0.ADJ_AMT), 2);
            tAdjAmt = parseFloat(tAdjAmt);
            if (tAdjAmt > 0) tTotAmt += tAdjAmt;

            /* 입력받은값으로 처리 */
            /*
            if (tInput0.ADJ_AMT && parseFloat(tInput0.ADJ_AMT) !== 0) {
            */
            if (1) {
                /*
                if (parseFloat(tOrdAmt) !== parseFloat(tInput0.SHIP_AMT))
                    tOrdAmt = AFLib.numToFixed(parseFloat(tInput0.SHIP_AMT), 2);
                if (parseFloat(tTotAmt) !== parseFloat(tInput0.TOT_AMT))
                    tTotAmt = AFLib.numToFixed(parseFloat(tInput0.TOT_AMT), 2);
                */
                // tOrdAmt = AFLib.numToFixed(parseFloat(tInput0.SHIP_AMT), 2);
                // tOrdAmt = AFLib.numToFixed(parseFloat(tInput0.SHIP_AMT), 2);

                /*
                tAdjAmt = AFLib.numToFixed(parseFloat(tInput0.ADJ_AMT), 2);
                tTotAmt = AFLib.numToFixed(parseFloat(tInput0.TOT_AMT), 2);
                */

                var inAdjAmt = parseFloat(tInput0.ADJ_AMT);
                var inOrdAmt = parseFloat(tInput0.SHIP_AMT);
                var inTotAmt = parseFloat(tInput0.TOT_AMT);

                if (parseFloat(inAdjAmt) === 0) {
                    tAdjAmt = parseFloat(inAdjAmt).toFixed(2);
                    tTotAmt = parseFloat(inTotAmt).toFixed(2);
                    tOrdAmt = parseFloat(inOrdAmt).toFixed(2);
                } else {
                    var tmpTotAmt = inOrdAmt + inAdjAmt;
                    if (tmpTotAmt === parseFloat(inTotAmt)) {
                        tAdjAmt = AFLib.numToFixed(
                            parseFloat(tInput0.ADJ_AMT),
                            2,
                        );
                        tTotAmt = AFLib.numToFixed(
                            parseFloat(tInput0.TOT_AMT),
                            2,
                        );
                        tOrdAmt = parseFloat(tTotAmt) - parseFloat(tAdjAmt);
                    } else {
                        tAdjAmt = parseFloat(tAdjAmt).toFixed(2);
                        tTotAmt = parseFloat(tTotAmt).toFixed(2);
                        tOrdAmt = parseFloat(tTotAmt) - parseFloat(tAdjAmt);
                    }
                    tOrdAmt = parseFloat(tOrdAmt).toFixed(2);
                }
            }

            if (tInput0.IS_NON_GARMENT === '1') {
                tOrdAmt = AFLib.numToFixed(parseFloat(tInput0.SHIP_AMT), 2);
                tTotAmt = AFLib.numToFixed(parseFloat(tInput0.TOT_AMT), 2);
                tDueDate = tInput0.EX_FACTORY_DATE;
            }

            var tShipPrice = 0;
            if (tSumShipQty > 0) tShipPrice = tTotAmt / tSumShipQty;
            tShipPrice = AFLib.numToFixed(tShipPrice, 4);

            var tVatAmt = tVosAmt * 0.1;
            tVatAmt = AFLib.numToFixed(tVatAmt, 2);
            var tPaymentType = '1'; // default : payment
            if (tInput0.PAYMENT_TYPE) {
                tPaymentType = tInput0.PAYMENT_TYPE;
            }

            //

            if (tInvoiceMst.length > 0) {

                var sqlATD = '';
                if (tInput0.ATD) {
                    sqlATD = `ship_date = '${tInput0.ATD}', `;
                }

                let tSQL99 = `
                    update ksv_order_ship
                    set
                        --ship_ptype = '${tInput0.SHIP_MODE}',
                        delivery_type = '${tInput0.DELIVERY_TYPE}',
                        exfactory = '${tInput0.EX_FACTORY_DATE}',
                        ${sqlATD}
                        atd = '${tInput0.ATD}'
                    where
                        invoice_no = '${tInvoiceNo}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                if (tInput0.IS_NON_GARMENT !== '1') tSQLArray.push(tSQL99_1);

                if (tInput0.ATD) {
                    let tSQL99 = `
                        update ksv_invoice_mem 
                        set
                            ship_date = '${tInput0.ATD}'
                        where
                            invoice_no = '${tInvoiceNo}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    if (tInput0.IS_NON_GARMENT !== '1') tSQLArray.push(tSQL99_1);
                }

                if (tInput0.IS_NON_GARMENT === '1') {
                    let tSQL99 = `
                        update ksv_invoice_mst
                        set
                            adj_amt = ${tAdjAmt},
                            ord_amt = ${tOrdAmt},
                            tot_amt = ${tTotAmt},
                            vos_amt = ${tVosAmt},
                            vat_amt = ${tVatAmt},
                            nat_cd = '${tInput0.COUNTRY}',
                            buyer_cd = '${tInput0.BUYER_CD}',
                            factory_cd = '${tInput0.FACTORY_CD}',
                            payment_type = '${tPaymentType}',
                            delivery_type = '${tInput0.DELIVERY_TYPE}',
                            bl_no = '${tInput0.BL_NO}',
                            atd = '${tInput0.ATD}',
                            ship_date = '${tInput0.SHIP_DATE}',
                            reg_datetime = '${tRetDate}',
                            reg_user = '${tUserInfo.USER_ID}'
                            -- price = ${tShipPrice},
                            -- in_ship_qty = ${tSumShipQty}
                        where
                            invoice_no = '${tInvoiceNo}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                } else {
                    let tSQL99 = `
                        update ksv_invoice_mst
                        set
                            adj_amt = ${tAdjAmt},
                            ord_amt = ${tOrdAmt},
                            -- ord_amt = ${tTotAmt},
                            tot_amt = ${tTotAmt},
                            vos_amt = ${tVosAmt},
                            vat_amt = ${tVatAmt},
                            nat_cd = '${tInput0.COUNTRY}',
                            payment_type = '${tPaymentType}',
                            delivery_type = '${tInput0.DELIVERY_TYPE}',
                            bl_no = '${tInput0.BL_NO}',
                            atd = '${tInput0.ATD}',
                            ship_date = '${tInput0.SHIP_DATE}',
                            reg_datetime = '${tRetDate}',
                            reg_user = '${tUserInfo.USER_ID}'
                            -- price = ${tShipPrice},
                            -- in_ship_qty = ${tSumShipQty}
                        where
                            invoice_no = '${tInvoiceNo}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }
            } else {
                tAdjAmt = AFLib.numToFixed(parseFloat(tAdjAmt), 2);
                tTotAmt = AFLib.numToFixed(parseFloat(tTotAmt), 2);
                tVosAmt = AFLib.numToFixed(parseFloat(tVosAmt), 2);
                tVatAmt = AFLib.numToFixed(parseFloat(tVatAmt), 2);

                if (!tBuyerCd) {
                    if (tInput0.BUYER_CD) tBuyerCd = tInput0.BUYER_CD;
                }

                var tObj8 = {};
                tObj8.INVOICE_NO = tInvoiceNo;
                tObj8.SHIP_DATE = tInput0.SHIP_DATE;
                // tObj8.SHIP_MODE = tInput0.SHIP_MODE;
                tObj8.DUE_DATE = tDueDate;
                tObj8.ATD = tInput0.ATD;
                tObj8.PAYMENT_TYPE = tPaymentType;
                tObj8.DELIVERY_TYPE = tInput0.DELIVERY_TYPE;
                tObj8.BUYER_CD = tBuyerCd;
                tObj8.ADJ_AMT = tAdjAmt;
                tObj8.ORD_AMT = tOrdAmt;
                // tObj8.ORD_AMT = tTotAmt;
                tObj8.TOT_AMT = tTotAmt;
                tObj8.VOS_AMT = tVosAmt;
                tObj8.VAT_AMT = tVatAmt;
                // tObj8.CURR_CD = tOrderInfo.CURR_CD;
                tObj8.CURR_CD = 'USD';
                tObj8.REMARK = '';
                tObj8.EXT_INVOICE = '';
                tObj8.INVOICE_TYPE = '1';

                if (tInput0.DELIVERY_TYPE !== 'FK') {
                    if (
                        tInput0.COUNTRY === 'kr' ||
                        tInput0.COUNTRY === 'ks' ||
                        tInput0.COUNTRY === 'ko'
                    ) {
                        tObj8.PAYMENT_TYPE = tPaymentType;
                        tObj8.TRADE_TYPE = '2';
                        tObj8.TRADE_TYPE2 = '5';
                    } else {
                        tObj8.PAYMENT_TYPE = tPaymentType;
                        tObj8.TRADE_TYPE = '1';
                        tObj8.TRADE_TYPE2 = '1';
                    }

                    if (tInput0.IS_NON_GARMENT === '1') {
                        tObj8.PAYMENT_TYPE = tPaymentType;
                        tObj8.TRADE_TYPE = '3';
                        tObj8.TRADE_TYPE2 = '6';
                    }
                }

                if (tInput0.IS_NON_GARMENT === '1') {
                    tFactoryCd = tInput0.FACTORY_CD;
                }

                tObj8.FACTORY_CD = tFactoryCd;
                tObj8.BL_NO = tInput0.BL_NO;
                tObj8.REG_DATETIME = tRetDate;
                tObj8.REG_USER = tUserInfo.USER_ID;
                tObj8.NAT_CD = tInput0.COUNTRY;
                // tObj8.IN_SHIP_QTY = tSumShipQty;
                // tObj8.PRICE = tShipPrice;

                let tSQL99 = AFLib.createTableSql('KSV_INVOICE_MST', tObj8);
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));

                // Ship Qty <= 0 이이도 저장
                tSQLArray.push(tSQL99_1);

                // if (parseFloat(tTotAmt) > 0) tSQLArray.push(tSQL99_1);
                // if (parseFloat(tSumShipQty) > 0) tSQLArray.push(tSQL99_1);
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
                tObj.CODE = `ERROR:Insert SHIP Record(DB ERROR):${e.message}`;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            // FOB Update

            var tOrderArray2 = [];
            tOrderArray1.forEach((col, i) => {
                var tCheck = 0;
                tOrderArray2.forEach((col1, i1) => {
                    if (col.order_cd === col1.order_cd) tCheck = 1;
                });
                if (tCheck === 0) {
                    tOrderArray2.push(col);
                }
            });

            tSQLArray = [];
            tIdx20 = 0;
            for (tIdx20 = 0; tIdx20 < tOrderArray2.length; tIdx20++) {
                var tOne20 = {
                    ...tOrderArray2[tIdx20],
                };

                let tSQL99 = `
                    delete from ksv_order_fob
                    where
                        order_cd = '${tOne20.order_cd}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                /*
                var sql20 = `
                    ;
                    
                    select
                        order_cd,
                        ship_qty,
                        sales_price,
                        ship_price
                    from
                        ksv_invoice_mem
                    where
                        order_cd = '${tOne20.ORDER.ORDER_CD}'
                `;
                */
                /*
                var sql20 = `
                    ;
                    
                    select
                        b.curr_cd,
                        a.sales_price,
                        sum(a.ship_qty) as ship_qty
                    from
                        ksv_invoice_mem a,
                        ksv_order_mst b
                    where
                        a.order_cd = '${tOne20.order_cd}'
                        and a.order_cd = b.order_cd
                    group by
                        b.curr_cd,
                        a.sales_price
                `;
                */

                var sql20 = `
                    ;
                    
                    select
                        b.curr_cd,
                        a.sales_price,
                        a.ship_price,
                        a.ship_qty
                    from
                        ksv_invoice_mem a,
                        ksv_order_mst b
                    where
                        a.order_cd = '${tOne20.order_cd}'
                        and a.order_cd = b.order_cd
                `;
                var nRet21 = await prisma.$queryRaw(Prisma.raw(sql20));

                //  Get Currency

                // ship price , ship_qty 로 Sum.  ship_price는 무조건 USD임
                var tSumAmt = 0;
                var tSumQty = 0;
                var tCurrCd = '';
                var tIdx21 = 0;
                for (tIdx21 = 0; tIdx21 < nRet21.length; tIdx21++) {
                    var tObj21 = {
                        ...nRet21[tIdx21],
                    };
                    if (tIdx21 === 0) tCurrCd = tObj21.curr_cd;

                    var sql20 = `
                        ;
                        
                        select
                            *
                        from
                            kcd_currency
                        where
                            curr_cd = '${tCurrCd}'
                            and start_date = '${tInput0.SHIP_DATE}'
                    `;
                    var nRet20 = await prisma.$queryRaw(Prisma.raw(sql20));
                    if (nRet20.length <= 0) {
                        sql20 = `
                            ;
                            
                            select
                                *
                            from
                                kcd_currency
                            where
                                curr_cd = '${tCurrCd}'
                                and start_date = (
                                    select
                                        max(start_date)
                                    from
                                        kcd_currency
                                    where
                                        curr_cd = '${tCurrCd}'
                                )
                        `;
                        nRet20 = await prisma.$queryRaw(Prisma.raw(sql20));
                    }
                    var tCurrency = {};
                    if (nRet20.length > 0)
                        tCurrency = {
                            ...nRet20[0],
                        };

                    // tSumAmt += parseFloat(tObj21.sales_price) * parseFloat(tObj21.ship_qty);
                    var tmpAvrPrice = 0;
                    if (tCurrCd !== 'USD') {
                        var tTmpVal =
                            parseFloat(tObj21.sales_price) *
                            parseFloat(tCurrency.USD_RATE);
                        var tDiffVal = tTmpVal - parseFloat(tObj21.ship_price);
                        tDiffVal = Math.abs(
                            parseFloat(parseFloat(tDiffVal).toFixed(0)),
                        );
                        if (tDiffVal > 100) {
                            console.log(
                                `================> ${tCurrCd}/${tDiffVal}/${tObj21.sales_price}/${tObj21.ship_price}/${tTmpVal}`,
                            );
                            tSumAmt +=
                                parseFloat(tTmpVal) *
                                parseFloat(tObj21.ship_qty);
                            tSumQty += parseFloat(tObj21.ship_qty);
                        } else {
                            tSumAmt +=
                                parseFloat(tObj21.ship_price) *
                                parseFloat(tObj21.ship_qty);
                            tSumQty += parseFloat(tObj21.ship_qty);
                        }
                        tmpAvrPrice =
                            parseFloat(tObj21.ship_price) /
                            parseFloat(tCurrency.USD_RATE);
                        if (tCurrCd === 'KRW')
                            tmpAvrPrice = tmpAvrPrice.toFixed(0);
                        else tmpAvrPrice = tmpAvrPrice.toFixed(4);
                    } else {
                        tSumAmt +=
                            parseFloat(tObj21.ship_price) *
                            parseFloat(tObj21.ship_qty);
                        tSumQty += parseFloat(tObj21.ship_qty);
                        tmpAvrPrice = parseFloat(tObj21.ship_price);
                        tmpAvrPrice = tmpAvrPrice.toFixed(4);
                    }

                    let tSQL99 = `
                        insert into
                            ksv_order_fob (order_cd, fob_seq, ship_qty, fob, fob100)
                        values
                            (
                                '${tOne20.order_cd}',
                                '${tIdx21 + 1}',
                                '${tObj21.ship_qty}',
                                '${tmpAvrPrice}',
                                '${tmpAvrPrice}'
                            )
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }

                // Usd Price임
                var tAvrPrice = tSumAmt / tSumQty;
                tAvrPrice = AFLib.numToFixed(tAvrPrice, 4);
                var tUsdPrice = tAvrPrice;
                tUsdPrice = AFLib.numToFixed(tUsdPrice, 4);
                if (tCurrCd !== 'USD') {
                    // USD가 아닌경우 Ship price만 변경함
                    tAvrPrice = tUsdPrice / tCurrency.USD_RATE;
                    tAvrPrice = AFLib.numToFixed(tAvrPrice, 4);
                    if (tCurrCd === 'KRW')
                        tAvrPrice = AFLib.numToFixed(tAvrPrice, 0);
                    else tAvrPrice = AFLib.numToFixed(tAvrPrice, 4);

                    if (
                        parseFloat(tUsdPrice) > 0 &&
                        parseFloat(tAvrPrice) > 0 &&
                        parseFloat(tUsdPrice) > 0
                    ) {
                        let tSQL99 = `
                            update ksv_order_mst
                            set
                                usd_price = '${tUsdPrice}'
                            where
                                order_cd = '${tOne20.order_cd}'
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);
                    }
                } else {
                    // USD인 경우 Ship price/Sales Price 만 변경함
                    if (
                        parseFloat(tUsdPrice) > 0 &&
                        parseFloat(tAvrPrice) > 0 &&
                        parseFloat(tUsdPrice) > 0
                    ) {
                        let tSQL99 = `
                            update ksv_order_mst
                            set
                                usd_price = '${tUsdPrice}',
                                avr_price = '${tAvrPrice}'
                            where
                                order_cd = '${tOne20.order_cd}'
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);
                    }
                }

                // Capa Update
                var sql30_1 = `
                    ;
                    
                    select
                        *
                    from
                        ksv_capabook_mem
                    where
                        order_cd = '${tOne20.order_cd}'
                        and job_cd in ('I', 'U', '0')
                        and book_date = (
                            select
                                max(book_date)
                            from
                                ksv_capabook_mem
                            where
                                order_cd = '${tOne20.order_cd}'
                        )
                `;
                var ret30_1 = await prisma.$queryRaw(Prisma.raw(sql30_1));
                if (ret30_1.length > 0 && parseFloat(tUsdPrice) > 0) {
                    var tSQL99 = `
                        ;
                        
                        update ksv_capabook_mem
                        set
                            fob = '${tUsdPrice}'
                        where
                            order_cd = '${tOne20.order_cd}'
                            and job_cd in ('I', 'U', '0')
                            and book_date = (
                                select
                                    max(book_date)
                                from
                                    ksv_capabook_mem
                                where
                                    order_cd = '${tOne20.order_cd}'
                            )
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }
                sql30_1 = `
                    ;
                    
                    select
                        *
                    from
                        ksv_capabook_mem_ethiopia
                    where
                        order_cd = '${tOne20.order_cd}'
                        and job_cd in ('I', 'U', '0')
                        and book_date = (
                            select
                                max(book_date)
                            from
                                ksv_capabook_mem
                            where
                                order_cd = '${tOne20.order_cd}'
                        )
                `;
                ret30_1 = await prisma.$queryRaw(Prisma.raw(sql30_1));
                if (ret30_1.length > 0 && parseFloat(tUsdPrice) > 0) {
                    var tSQL99 = `
                        ;
                        
                        update ksv_capabook_mem_ethiopia
                        set
                            fob = '${tUsdPrice}'
                        where
                            order_cd = '${tOne20.order_cd}'
                            and job_cd in ('I', 'U', '0')
                            and book_date = (
                                select
                                    max(book_date)
                                from
                                    ksv_capabook_mem
                                where
                                    order_cd = '${tOne20.order_cd}'
                            )
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }
                var sql30_1 = `
                    ;
                    
                    select
                        *
                    from
                        ksv_capasample_mem
                    where
                        order_cd = '${tOne20.order_cd}'
                        and job_cd in ('I', 'U', '0')
                        and book_date = (
                            select
                                max(book_date)
                            from
                                ksv_capabook_mem
                            where
                                order_cd = '${tOne20.order_cd}'
                        )
                `;
                var ret30_1 = await prisma.$queryRaw(Prisma.raw(sql30_1));
                if (ret30_1.length > 0 && parseFloat(tUsdPrice) > 0) {
                    var tSQL99 = `
                        ;
                        
                        update ksv_capasample_mem
                        set
                            fob = '${tUsdPrice}'
                        where
                            order_cd = '${tOne20.order_cd}'
                            and job_cd in ('I', 'U', '0')
                            and book_date = (
                                select
                                    max(book_date)
                                from
                                    ksv_capabook_mem
                                where
                                    order_cd = '${tOne20.order_cd}'
                            )
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }
                sql30_1 = `
                    ;
                    
                    select
                        *
                    from
                        ksv_capasample_mem_ethiopia
                    where
                        order_cd = '${tOne20.order_cd}'
                        and job_cd in ('I', 'U', '0')
                        and book_date = (
                            select
                                max(book_date)
                            from
                                ksv_capabook_mem
                            where
                                order_cd = '${tOne20.order_cd}'
                        )
                `;
                ret30_1 = await prisma.$queryRaw(Prisma.raw(sql30_1));
                if (ret30_1.length > 0 && parseFloat(tUsdPrice) > 0) {
                    var tSQL99 = `
                        ;
                        
                        update ksv_capasample_mem_ethiopia
                        set
                            fob = '${tUsdPrice}'
                        where
                            order_cd = '${tOne20.order_cd}'
                            and job_cd in ('I', 'U', '0')
                            and book_date = (
                                select
                                    max(book_date)
                                from
                                    ksv_capabook_mem
                                where
                                    order_cd = '${tOne20.order_cd}'
                            )
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }

                /*
                let tSQL99 = `
                    update ksv_order_mst
                    set
                        avr_price = '${tFobPrice}'
                    where
                        order_cd = '${tOne20.ORDER.ORDER_CD}'
                        and curr_cd = 'USD'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
                */

                /*
                var sql22 = `
                    ;
                    
                    select
                        a.curr_cd,
                        b.usd_rate,
                        b.won_amt2
                    from
                        ksv_order_mst a,
                        kcd_currency b
                    where
                        a.order_cd = '${tOne20.ORDER.ORDER_CD}'
                        and a.curr_cd = b.curr_cd
                        and b.start_date =
                `;
                var nRet22 = await prisma.$queryRaw(Prisma.raw(sql22));
                if (nRet22.length > 0) {
                    tUsdRate = parseFloat(nRet22[0].won_amt2);
                }
                let tSQL99 = `
                    update ksv_order_mst
                    set
                        avr_price = '${tAvrPrice}'
                    where
                        order_cd = '${tOne20.ORDER.ORDER_CD}'
                        and curr_cd = 'USD'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
                */
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
                tObj.CODE = `ERROR:Insert SHIP Record(DB ERROR-FOB Update):${e.message}`;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
            ///

            tSQLArray = [];
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
                    and a.invoice_no = '${tInvoiceNo}'
            `;
            var nRet3 = await prisma.$queryRaw(Prisma.raw(sql3));
            if (nRet3.length > 0) {
                tSQLArray = [];

                let tSQL99 = `
                    delete from ksv_invoice_part
                    where
                        invoice_no = '${tInvoiceNo}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                var tInvoicePart = {};
                tInvoicePart.invoice_no = tInvoiceNo;
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
                tInvoicePart.invoice_no = tInvoiceNo;
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
                tInvoicePart.invoice_no = tInvoiceNo;
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

                if (tInvoiceMst.length <= 0) {
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
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = `SUCCEED:Insert SHIP Record:${tInvoiceNo}`;
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },

        mgrDelete_S0513_5: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput0 = {
                ...args.datas1,
            };

            // var tInvoiceNo = tRetDate;
            // tInput0.INVOICE_NO = tInvoiceNo;
            // Invoice_no은 입력되어야 함

            var tOrderArray = [];
            var tBuyerArray = [];

            console.log('Server Pro');
            var tSQLArray = [];
            // console.log(args.datas);

            // Invoice No Check
            const sql100 = `
                select
                    isnull(docu_no, '') as docu_no
                from
                    ksv_invoice_mst
                where
                    invoice_no = '${tInput0.INVOICE_NO}'
            `;
            var nRet100 = await prisma.$queryRaw(Prisma.raw(sql100));
            if (nRet100.length > 0 && nRet100[0].docu_no !== '') {
                var tObj = {
                    ...nRet100[0],
                };
                var tErrorStr = '';
                tErrorStr =
                    'ERROR:이미 전표 처리된 invoice는 삭제할수 없습니다:' +
                    tObj.docu_no;
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = tErrorStr;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            const sql101 = `
                select distinct
                    a.order_cd,
                    a.order_status
                from
                    ksv_order_mst a,
                    ksv_order_ship b
                where
                    b.invoice_no = '${tInput0.INVOICE_NO}'
                    and b.order_cd = a.order_cd
            `;
            var nRet101 = await prisma.$queryRaw(Prisma.raw(sql101));
            var tCheck = 0;
            nRet101.forEach((col, i) => {
                if (col.order_status === '8' || col.order_status === '9')
                    tCheck = 1;
            });
            if (tCheck === 1) {
                var tErrorStr = '';
                tErrorStr = `ERROR:End Report, End된 Order가 있는경우 Invoice는 삭제할수 없습니다`;
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = tErrorStr;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tInvoiceNo = tInput0.INVOICE_NO;

            let tSQL99 = `
                delete from ksv_order_ship
                where
                    invoice_no = '${tInvoiceNo}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            let sql0 = `
                select
                    *
                from
                    ksv_order_ship
                where
                    invoice_no = '${tInvoiceNo}'
            `;
            var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            var tIdx0 = 0;
            for (tIdx0 = 0; tIdx0 < tRet0.length; tIdx0++) {
                var tOne = {
                    ...tRet0[tIdx0],
                };

                let tSQL99 = `
                    delete from ssv_order_ship
                    where
                        order_cd = '${tOne.ORDER_CD}'
                        and prod_cd = '${tOne.PROD_CD}'
                        and ship_date = '${tOne.SHIP_DATE}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            }

            let sql1 = `
                select
                    order_cd,
                    count(*) as c_cnt
                from
                    ksv_order_ship
                where
                    invoice_no = '${tInvoiceNo}'
                group by
                    order_cd
            `;
            var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
            var tIdx1 = 0;
            for (tIdx1 = 1; tIdx1 < tRet1.length; tIdx1++) {
                var tOne = {
                    ...tRet1[tIdx1],
                };
                let tSQL99 = `
                    delete from ksv_order_fob
                    where
                        order_cd = '${tOne.ORDER_CD}'
                        and fob_seq = (
                            select
                                max(fob_seq)
                            from
                                ksv_order_fob
                            where
                                order_cd = '${tOne.ORDER_CD}'
                        )
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                // tSQLArray.push(tSQL99_1);
            }

            let tSQL99 = `
                delete from ksv_invoice_mst
                where
                    invoice_no = '${tInvoiceNo}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            let tSQL99 = `
                delete from ksv_invoice_mem
                where
                    invoice_no = '${tInvoiceNo}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            let tSQL99 = `
                delete from ksv_invoice_part
                where
                    invoice_no = '${tInvoiceNo}'
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
                tObj.CODE = 'ERROR:Delete SHIP Record';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED: Delete SHIP Record :';
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },

        mgrInsert_S0513_5_REMOVE_ORDER: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput0 = {
                ...args.datas1,
            };

            // var tInvoiceNo = tRetDate;
            // tInput0.INVOICE_NO = tInvoiceNo;
            // Invoice_no은 입력되어야 함

            var tOrderArray = [];
            var tBuyerArray = [];

            console.log('Server Pro');
            var tSQLArray = [];
            // console.log(args.datas);

            // Invoice No Check
            const sql100 = `
                select
                    isnull(docu_no, '') as docu_no
                from
                    ksv_invoice_mst
                where
                    invoice_no = '${tInput0.INVOICE_NO}'
            `;
            var nRet100 = await prisma.$queryRaw(Prisma.raw(sql100));
            if (nRet100.length > 0 && nRet100[0].docu_no !== '') {
                var tObj = {
                    ...nRet100[0],
                };
                var tErrorStr = '';
                tErrorStr =
                    'ERROR:이미 전표 처리된 invoice는 삭제할수 없습니다:' +
                    tObj.docu_no;
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = tErrorStr;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tInvoiceNo = tInput0.INVOICE_NO;

            var tIdx1 = 0;
            for (tIdx1 = 0; tIdx1 < args.datas.length; tIdx1++) {
                var tOne = {
                    ...args.datas[tIdx1],
                };

                let sql100 = `
                    select
                        *
                    from
                        ksv_order_mst
                    where
                        order_cd = '${tOne.ORDER_CD}'
                `;
                var tRet100 = await prisma.$queryRaw(Prisma.raw(sql100));
                var tOrderInfo = {};
                if (tRet100.length > 0)
                    tOrderInfo = {
                        ...tRet100[0],
                    };

                if (parseInt(tOrderInfo.ORDER_STATUS) >= 7) {
                    var tObj = {
                        ...nRet100[0],
                    };
                    var tErrorStr = '';
                    tErrorStr = `ERROR:End된 Order는 Invoice에서 삭제할수 없습니다(${tOrderInfo.ORDER_CD})`;
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = tErrorStr;
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }

                let sql0 = `
                    select
                        *
                    from
                        ksv_order_ship
                    where
                        invoice_no = '${tInvoiceNo}'
                        and order_cd = '${tOne.ORDER_CD}'
                        and prod_cd = '${tOne.PROD_CD}'
                        and ship_date = '${tInput0.SHIP_DATE}'
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                var tIdx0 = 0;
                var tSumShipCnt = 0;
                var tSumShipAmount = 0;
                var tSumOrdAmount = 0;
                for (tIdx0 = 0; tIdx0 < tRet0.length; tIdx0++) {
                    var tOne1 = {
                        ...tRet0[tIdx0],
                    };

                    tSumShipCnt += parseFloat(tOne1.SHIP_CNT);
                    tSumShipAmount +=
                        parseFloat(tOne1.SHIP_CNT) *
                        parseFloat(tOrderInfo.AVR_PRICE);
                    tSumOrdAmount +=
                        parseFloat(tOne1.SHIP_CNT) *
                        parseFloat(tOrderInfo.AVR_PRICE);

                    let tSQL99 = `
                        delete from ksv_order_ship
                        where
                            invoice_no = '${tInvoiceNo}'
                            and order_cd = '${tOne1.ORDER_CD}'
                            and prod_cd = '${tOne1.PROD_CD}'
                            and ship_date = '${tInput0.SHIP_DATE}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
                        delete from ssv_order_ship
                        where
                            order_cd = '${tOne1.ORDER_CD}'
                            and prod_cd = '${tOne1.PROD_CD}'
                            and ship_date = '${tInput0.SHIP_DATE}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }

                let sql1 = `
                    select
                        *
                    from
                        ksv_order_ship
                    where
                        invoice_no = '${tInvoiceNo}'
                        and order_cd = '${tOne.ORDER_CD}'
                        and prod_cd = '${tOne.PROD_CD}'
                        and ship_date <> '${tInput0.SHIP_DATE}'
                `;
                var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                if (tRet1.length <= 0) {
                    let tSQL99 = `
                        delete from ksv_order_fob
                        where
                            order_cd = '${tOne.ORDER_CD}'
                            and fob_seq = (
                                select
                                    max(fob_seq)
                                from
                                    ksv_order_fob
                                where
                                    order_cd = '${tOne.ORDER_CD}'
                            )
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    // tSQLArray.push(tSQL99_1);
                }

                let tSQL99 = `
                    update ksv_invoice_mst
                    set
                        tot_amt = tot_amt - ${tSumShipAmount},
                        ord_amt = ord_amt - ${tSumShipAmount}
                    where
                        invoice_no = '${tInvoiceNo}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    delete from ksv_invoice_mem
                    where
                        invoice_no = '${tInvoiceNo}'
                        and order_cd = '${tOne.ORDER_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                /*
                let tSQL99 = `
                    delete from ksv_invoice_part
                    where
                        invoice_no = '${tInvoiceNo}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
                */

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
                    tObj.CODE = `ERROR:Remove Order:${e.message}`;
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = `SUCCEED:Remove Order:${tInput0.INVOICE_NO}`;
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },

        mgrInsert_S0513_5_CHECK_REMOVE_ORDER: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            // Invoice No Check
            const sql100 = `
                select
                    *
                from
                    ksv_order_mst
                where
                    order_cd = '${args.datas.ORDER_CD}'
            `;
            var nRet100 = await prisma.$queryRaw(Prisma.raw(sql100));
            if (
                nRet100.length > 0 &&
                (nRet100[0].ORDER_STATUS === '8' ||
                    nRet100[0].ORDER_STATUS === '9')
            ) {
                var tErrorStr = '';
                tErrorStr = 'ERROR:End/End Report Order는 Remove할수 없습니다';
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = tErrorStr;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            } else if (nRet100.length <= 0) {
                var tErrorStr = '';
                tErrorStr =
                    'ERROR:Order 정보가 잘못되었습니다. 확인해 주세요(없는 오더)';
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = tErrorStr;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            } else {
                var tErrorStr = '';
                tErrorStr = 'SUCCESS:오더를 Remove가능합니다';
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = tErrorStr;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },

        mgrInsert_S0513_FILE_ADD: async (_, args, contextValue) => {
            //
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);

            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput1 = {
                ...args.datas,
            };

            var tSQLArray = [];

            var sql1 = `
                delete from kcd_fileinfo
                where
                    kind = '${tInput1.KIND}'
                    and file_key = '${tInput1.FILE_KEY}'
            `;
            const nRet1 = prisma.$queryRaw(Prisma.raw(sql1));
            tSQLArray.push(nRet1);

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
                tObj.CODE = 'SUCCEED:File Add';
                tObj.id = 0;
                tRetArray.push(tObj);
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:File Add:' + e.message;
                tObj.id = 0;
                tRetArray.push(tObj);
            }

            return tRetArray;
        },
    },
};

export default moduleMutation_S0513_5;
