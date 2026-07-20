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
const moduleMutation_S080101_5 = {
    Mutation: {
        mgrInsert_S080101_5: async (_, args, contextValue) => {
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
            var tInput1 = { ...args.datas[0] };
            var tInput2 = { ...args.datas1 };

            var tSQLArray = [];

            var tTaxCd = 'TAX_' + tRetDate;

            var sKrwShipAmount = 0.0;
            var sKrwTaxAmount = 0.0;
            var sKrwTotAmount = 0.0;
            var sPayAmt = 0.0;

            if (tInput2.TAX_CD !== '') {
                tTaxCd = tInput2.TAX_CD;
                var tSQL = `
                    select
                        isnull(docu_no, '') as docu_no
                    from
                        ksv_tax_mst
                    where
                        tax_cd = '${tTaxCd}'
                `;
                var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));

                var tTaxMst = {};
                if (nRet0.length > 0) {
                    tTaxMst = { ...nRet0[0] };
                    if (
                        tTaxMst.docu_no !== '' &&
                        tTaxMst.docu_no.substring(0, 3) !== 'AF_'
                    ) {
                        var tRetArray = [];
                        var tObj = {};
                        tObj.CODE =
                            'ERROR:전표처리된 세금계산서는 수정할수 없습니다';
                        tObj.id = 0;
                        tRetArray.push(tObj);
                        return tRetArray;
                    }
                }

                /*
          let tSQL99 = `
              delete from ksv_tax_mst
              where
                  tax_cd = '${tTaxCd}'
          `;
          const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
          tSQLArray.push(tSQL99_1);
          */

                let tSQL99 = `
                    delete from ksv_tax_mem
                    where
                        tax_cd = '${tTaxCd}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            }

            var tIdx = 0;
            var tOrderArray = [];
            var tDebitArray = [];
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var col = { ...args.datas[tIdx] };

                var tChk = 0;
                tOrderArray.forEach((col1, i1) => {
                    if (col1 === col.ORDER_CD) tChk = 1;
                });
                if (tChk === 0 && col.ORDER_CD !== 'DEBIT') {
                    tOrderArray.push(col.ORDER_CD);
                }

                var tChk1 = 0;
                if (col.ORDER_CD === 'DEBIT')  {
                    tDebitArray.forEach((col1, i1) => {
                        if (col1 === col.DEBIT_INFO) tChk1 = 1;
                    });
                    if (tChk1 === 0) tDebitArray.push(col.DEBIT_INFO);
                }

                /*
         let tSQL99 = `
             update ksv_invoice_mst
             set
                 tax_cd = '${tTaxCd}',
                 bill_date = '${args.datas1.BILL_DATE}',
                 bill_user = '${args.datas1.ORDER_USER_ID}'
             where
                 invoice_no = '${col.INVOICE_NO}'
         `;
         const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
         tSQLArray.push(tSQL99_1);
         */

                var tUsdAmt = AFLib.getFloat(
                    parseFloat(col.SELL_QTY) * parseFloat(col.SALES_PRICE),
                    2,
                );
                var tKrwAmt = 0;
                if (col.CURR_CD === 'KRW') tKrwAmt = tUsdAmt;
                else
                    tKrwAmt = AFLib.getFloat(
                        tUsdAmt * parseFloat(col.RATEBASE),
                        0,
                    );

                var tVatAmt = AFLib.getFloat(tKrwAmt * 0.1, 0);
                if (parseFloat(col.KRW_TAX_AMOUNT) <= 0) tVatAmt = 0;
                var tTotAmt = AFLib.getFloat(tKrwAmt + tVatAmt, 0);

                var tObj = {};
                tObj.TAX_CD = tTaxCd;
                tObj.INVOICE_NO = col.INVOICE_NO;
                tObj.ORDER_CD = col.ORDER_CD;
                tObj.NAT_CD = col.NAT_CD;
                tObj.CURR_CD = col.CURR_CD;
                tObj.TOT_QTY = col.SHIP_QTY;
                tObj.PAY_QTY = col.SELL_QTY;
                tObj.PAY_PRICE = col.SALES_PRICE;
                tObj.PAY_AMT = tUsdAmt;
                tObj.USD_AMT = tUsdAmt;
                tObj.KRW_AMT = tKrwAmt;
                tObj.VAT_AMT = tVatAmt;
                tObj.TOT_AMT = tTotAmt;
                tObj.RATEBASE = col.RATEBASE;
                tObj.BILL_DATE = tInput2.BILL_DATE;
                tObj.BILL_USER = tInput2.ORDER_USER_ID;
                tObj.REG_USER = tUserInfo.USER_ID;
                tObj.REG_DATETIME = tRetDate;
                tObj.DUE_DATE = col.DUE_DATE;

                tObj.PRODUCT_TYPE = '';
                tObj.DEBIT_AMT = '0';
                tObj.CREDIT_AMT = '0';
                tObj.DEBIT_INFO = '';

                if (col.PRODUCT_TYPE) tObj.PRODUCT_TYPE = col.PRODUCT_TYPE;
                if (col.DEBIT) tObj.DEBIT_AMT = col.DEBIT;
                if (col.CREDIT) tObj.CREDIT_AMT = col.CREDIT;
                if (col.DEBIT_INFO) tObj.DEBIT_INFO = col.DEBIT_INFO;

                sPayAmt += parseFloat(tObj.PAY_AMT);
                sKrwShipAmount += tKrwAmt;
                sKrwTaxAmount += tVatAmt;
                sKrwTotAmount += tTotAmt;

                let tSQL99 = AFLib.createTableSql('KSV_TAX_MEM', tObj);
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                /* 세금계산서 등록만 하고 Debit note에서 실제 End 처리 */
                if (tObj.INVOICE_NO.substring(0, 2) === 'DN' && !tInput2.TAX_CD) {
                    let tSQL99 = `
                        update ksv_crdb_mst
                        set
                            status_cd = '5',
                            end_date = '${tRetDate1}'
                        where
                            crdb_cd = '${tObj.INVOICE_NO}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
                        insert into
                            ksv_crdb_mem (
                                crdb_cd,
                                end_date,
                                --crdb_amt,
                                ref_no,
                                status_cd,
                                reg_user,
                                reg_datetime
                            )
                        values
                            (
                                '${tObj.INVOICE_NO}',
                                '${tRetDate1}',
                                --'${tKrwAmt}',
                                '',
                                '0',
                                '${tUserInfo.USER_ID}',
                                '${tRetDate1}'
                            )
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }
            }
            

            if (tInput2.TAX_CD !== '') {
                let tSQL99 = `
                    update ksv_tax_mst
                    set
                        pay_amt = '${sPayAmt}',
                        usd_amt = '${sPayAmt}',
                        krw_amt = '${sKrwShipAmount}',
                        vat_amt = '${sKrwTaxAmount}',
                        tot_amt = '${sKrwTotAmount}',
                        bill_date = '${tInput2.BILL_DATE}',
                        bill_user = '${tInput2.ORDER_USER_ID}',
                        buyer_email = '${tInput2.BUYER_EMAIL}'
                    where
                        tax_cd = '${tInput2.TAX_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            } else {

                var tBuyerCd = tInput1.BUYER_CD;
                if (tOrderArray.length > 0) ;
                else {
                    if (tDebitArray.length > 0) {
                        var sql10 = `
                               select messer_cd, buyer_cd from ksv_crdb_mst where crdb_cd = '${tDebitArray[0]}'
                        `;
                        var ret10 = await prisma.$queryRaw(Prisma.raw(sql10));
                        if (ret10.length > 0) tBuyerCd = ret10[0].buyer_cd;
                    } else {
                        tBuyerCd = '';
                    } 
                }

                var tObj = {};
                tObj.TAX_CD = tTaxCd;
                tObj.NAT_CD = tInput1.NAT_CD;
                tObj.BUYER_CD = tBuyerCd;
                tObj.CURR_CD = 'KRW';
                tObj.PAY_AMT = String(sPayAmt);
                tObj.USD_AMT = String(sPayAmt);
                tObj.KRW_AMT = String(sKrwShipAmount);
                tObj.VAT_AMT = String(sKrwTaxAmount);
                tObj.TOT_AMT = String(sKrwTotAmount);
                tObj.RATEBASE = tInput1.RATEBASE;
                tObj.BILL_DATE = tInput2.BILL_DATE;
                tObj.BILL_USER = tInput2.ORDER_USER_ID;
                tObj.REG_USER = tUserInfo.USER_ID;
                tObj.REG_DATETIME = tRetDate;
                tObj.BUYER_EMAIL = tInput2.BUYER_EMAIL;
                tObj.DOCU_NO = '';
                let tSQL99 = AFLib.createTableSql('KSV_TAX_MST', tObj);
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
                tObj.CODE = 'ERROR:Insert Tax Cd';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            tSQLArray = [];

            // Price Update
            var tIdx0 = 0;
            for (tIdx0 = 0; tIdx0 < tOrderArray.length; tIdx0++) {
                var tSQL = '';
                var tStrOrderCd = tOrderArray[tIdx0];

                let sql0 = `
                    select
                        *
                    from
                        ksv_order_mst
                    where
                        order_cd = '${tStrOrderCd}'
                `;
                var ret0 = await prisma.$queryRaw(Prisma.raw(sql0));
                var tOrderObj = { ...ret0[0] };

                let sql1 = `
                    select
                        *
                    from
                        kcd_currency
                    where
                        curr_cd = '${tOrderObj.CURR_CD}'
                        and start_date = '${tRetDate1}'
                `;
                var ret1 = await prisma.$queryRaw(Prisma.raw(sql1));
                if (ret1.length <= 0) {
                    sql1 = `
                        select
                            *
                        from
                            kcd_currency
                        where
                            curr_cd = '${tOrderObj.CURR_CD}'
                            and start_date = (
                                select
                                    max(start_date)
                                from
                                    kcd_currency
                                where
                                    curr_cd = '${tOrderObj.CURR_CD}'
                            )
                    `;
                    ret1 = await prisma.$queryRaw(Prisma.raw(sql1));
                }
                var tCurrencyObj = { ...ret1[0] };

                let sqlStr_Import = `
                    select distinct
                        f.SHIP_DATE,
                        c.cd_name as SHIP_TYPE_NAME,
                        b.SHIP_QTY,
                        isnull(b.SALES_PRICE, 0) as SALES_PRICE,
                        b.INVOICE_NO,
                        e.cd_name as DELIVERY_TYPE_NAME,
                        isnull(b.SHIP_PRICE, 0) as SHIP_PRICE,
                        g.SHIP_DATE as SHIP_DATE0,
                        f.ATD as SHIP_DATE1,
                        h.NAT_NAME as COUNTRY,
                        f.income_date as SALES_DATE,
                        f.docu_no as DOCU_NO,
                        f.curr_cd as CURR_CD,
                        i.usd_rate as USD_RATE
                    from
                        kcd_code c,
                        ksv_invoice_mem b,
                        kcd_code e,
                        ksv_invoice_mst f,
                        ksv_order_ship g,
                        kcd_nation h,
                        kcd_currency i
                    where
                        b.order_cd = '${tStrOrderCd}'
                        and c.cd_group = 'SHIP_PTYPE'
                        and c.cd_code = b.ship_ptype
                        and e.cd_group = 'DELIVERY_TYPE'
                        and e.cd_code = b.delivery_type
                        and b.invoice_no = f.invoice_no
                        and g.order_cd = b.order_cd
                        and g.invoice_no = f.invoice_no
                        and g.nat_cd = h.nat_cd
                        and i.curr_cd = f.curr_cd
                        and i.start_date = f.ship_date
                        and f.docu_no is not null
                        and f.docu_no <> ''
                `;
                var tRet_Import = await prisma.$queryRaw(
                    Prisma.raw(sqlStr_Import),
                );

                let sqlStr_Domestic = `
                    select
                        k2.invoice_no,
                        k2.order_cd,
                        k2.tot_qty,
                        k2.pay_qty,
                        k2.pay_price,
                        k2.pay_amt,
                        k2.usd_amt,
                        k2.krw_amt,
                        k2.tot_amt,
                        k2.bill_date,
                        k1.docu_no
                    from
                        ksv_tax_mst k1,
                        ksv_tax_mem k2
                    where
                        k2.order_cd = '${tStrOrderCd}'
                        and k1.tax_cd = k2.tax_cd
                `;
                var tRet_Domestic = await prisma.$queryRaw(
                    Prisma.raw(sqlStr_Domestic),
                );
                var tRet = [];
                tRet_Import.forEach((col, i) => {
                    var tObj = { ...col };
                    if (!tObj.SALES_DATE) tObj.SALES_DATE = tObj.SHIP_DATE;
                    if (!tObj.SHIP_DATE1) tObj.SHIP_DATE1 = tObj.SHIP_DATE0;
                    var tCheck0 = 0;
                    tRet_Domestic.forEach((col1, i1) => {
                        if (
                            col1.order_cd === tStrOrderCd &&
                            col1.invoice_no === col.INVOICE_NO
                        ) {
                            var tObj2 = { ...tObj };
                            tObj2.SALES_PRICE = col1.pay_price;
                            tObj2.SHIP_QTY = col1.pay_qty;
                            tObj2.SALES_DATE = col1.bill_date;
                            tObj2.DOCU_NO = col1.docu_no;
                            tRet.push(tObj2);
                            tCheck0 = 1;
                        }
                    });
                    if (tCheck0 <= 0) tRet.push(tObj);
                });

                let tSQL99 = `
                    delete from ksv_order_fob
                    where
                        order_cd = '${tStrOrderCd}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                var sumAmt = 0;
                var sumQty = 0;
                var tIdx6 = 0;
                for (tIdx6 = 0; tIdx6 < tRet.length; tIdx6++) {
                    var col2 = { ...tRet[tIdx6] };
                    sumQty += parseFloat(col2.SHIP_QTY);
                    var tmpAvrPrice = 0;
                    if (tOrderObj.CURR_CD === 'USD') {
                        sumAmt +=
                            parseFloat(col2.SHIP_QTY) *
                            parseFloat(col2.SHIP_PRICE);
                        tmpAvrPrice = col2.SHIP_PRICE;
                    } else {
                        var tmpAmt =
                            parseFloat(col2.SHIP_QTY) *
                            parseFloat(col2.SHIP_PRICE);

                        let sqlCurrency = `
                            select
                                *
                            from
                                kcd_currency
                            where
                                curr_cd = '${tOrderObj.CURR_CD}'
                                and start_date = '${col2.SHIP_DATE}'
                        `;
                        var retCurrency = await prisma.$queryRaw(
                            Prisma.raw(sqlCurrency),
                        );

                        tmpAmt = tmpAmt / parseFloat(retCurrency[0].USD_RATE);
                        sumAmt += parseFloat(tmpAmt);

                        tmpAvrPrice =
                            parseFloat(col2.SHIP_PRICE) /
                            parseFloat(retCurrency[0].USD_RATE);
                        console.log(
                            `====================> ${col2.SHIP_PRICE}, ${retCurrency[0].USD_RATE} => ${tmpAvrPrice}`,
                        );
                    }

                    if (tOrderObj.CURR_CD === 'KRW') {
                        tmpAvrPrice = parseFloat(tmpAvrPrice).toFixed(0);
                    } else {
                        tmpAvrPrice = parseFloat(tmpAvrPrice).toFixed(4);
                    }

                    var tInObj = {};
                    tInObj.ORDER_CD = tStrOrderCd;
                    tInObj.FOB_SEQ = tIdx6 + 1;
                    tInObj.SHIP_QTY = col2.SHIP_QTY;
                    tInObj.FOB = tmpAvrPrice;
                    tInObj.FOB100 = tmpAvrPrice;
                    let tSQL99 = AFLib.createTableSql('KSV_ORDER_FOB', tInObj);
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    // tSQLArray.push(tSQL99_1);
                }

                sumAmt = parseFloat(sumAmt.toFixed(2));
                sumQty = parseFloat(sumQty.toFixed(2));
                var tAvrPrice = 0;
                var tUsdPrice = 0;
                if (sumQty <= 0);
                else {
                    tAvrPrice = sumAmt / sumQty;
                    if (tOrderObj.CURR_CD === 'KRW')
                        tAvrPrice = parseFloat(tAvrPrice.toFixed(0));
                    else tAvrPrice = parseFloat(tAvrPrice.toFixed(4));
                }

                if (tOrderObj.CURR_CD === 'USD') tUsdPrice = tAvrPrice;
                else {
                    tUsdPrice =
                        parseFloat(tAvrPrice) *
                        parseFloat(tCurrencyObj.USD_RATE);
                    tUsdPrice = parseFloat(tUsdPrice.toFixed(4));
                }

                let tSQL99 = `
                    update ksv_order_mst
                    set
                        avr_price = ${tAvrPrice},
                        usd_price = ${tUsdPrice}
                    where
                        order_cd = '${tStrOrderCd}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                // tSQLArray.push(tSQL99_1);
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
                tObj.CODE = 'ERROR:Insert Tax Cd';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = `SUCCEED:Insert Tax Cd:${tTaxCd}`;
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },
    },
};

export default moduleMutation_S080101_5;
