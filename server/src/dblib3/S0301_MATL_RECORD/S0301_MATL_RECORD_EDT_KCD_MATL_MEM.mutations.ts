// MGR_@@TNAME@@.mutations.js

import * as fs from 'fs';
import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
const moment = require('moment');

/*
                MATL_CD: String 
                MATL_SEQ: String 
                MATL_PRICE: String 
                CURR_CD: String 
                CONF_FLAG: String 
                PRICE_TYPE: String 
                CURR_DATE: String 

*/

// export default로 Mutation 내용 내보내기
const moduleMutation_S0301_MATL_RECORD_EDT_KCD_MATL_MEM = {
    Mutation: {
        mgrInsert_S0301_BATCH_PRICE: async (_, args, contextValue) => {
            //
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
            var tYY = 'B' + yyyy.toString().substring(2) + '-';
            var tRetDate1 = tRetDate.substring(0, 8);

            // let tPO = "POA2022S672";
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tEdit = {
                ...args.datas1,
            };

            var retArray = [];
            var tSameDateSeqMap = {};
            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var tSQLArray = [];
                var tData = args.datas[tIdx];
                var tInputPrice = Number(String(tEdit.PRICE).replace(/,/g, ''));
                if (!Number.isFinite(tInputPrice)) {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = 'ERROR:INVALID_PRICE:가격 값이 올바르지 않습니다.';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }
                var tMatlSeq = 0;

                var sqlCheckMasterPrice = `
                    select
                        matl_price,
                        curr_cd
                    from
                        kcd_matl_mem
                    where
                        matl_cd = '${tData.MATL_CD}'
                        and matl_seq = (
                            select
                                max(matl_seq)
                            from
                                kcd_matl_mem
                            where
                                matl_cd = '${tData.MATL_CD}'
                        )
                `;
                var retCheckMasterPrice = await prisma.$queryRaw(
                    Prisma.raw(sqlCheckMasterPrice),
                );

                if (retCheckMasterPrice.length > 0 && tEdit.IS_MASTER === '1') {
                    var tPrevMasterPrice = parseFloat(
                        retCheckMasterPrice[0].matl_price,
                    );
                    var tPrevCurrCd = retCheckMasterPrice[0].curr_cd;
                    if (tPrevMasterPrice === tInputPrice && tPrevCurrCd === tEdit.CURR_CD) {
                        var tRetArray = [];
                        var tObj = {};
                        tObj.CODE =
                            'ERROR:SAME_MASTER_PRICE:이전 SEQ의 master_price와 동일합니다.';
                        tObj.id = 0;
                        tRetArray.push(tObj);
                        return tRetArray;
                    }
                }

                var sqlCheckSalesPrice = `
                    select
                        matl_price,
                        curr_cd
                    from
                        kcd_matl_sale
                    where
                        matl_cd = '${tData.MATL_CD}'
                        and matl_seq = (
                            select
                                max(matl_seq)
                            from
                                kcd_matl_sale
                            where
                                matl_cd = '${tData.MATL_CD}'
                        )
                `;
                var retCheckSalesPrice = await prisma.$queryRaw(
                    Prisma.raw(sqlCheckSalesPrice),
                );

                if (retCheckSalesPrice.length > 0 && tEdit.IS_SALES === '1') {
                    var tPrevSalesPrice = parseFloat(
                        retCheckSalesPrice[0].matl_price,
                    );
                    var tPrevCurrCd = retCheckSalesPrice[0].curr_cd;
                    if (tPrevSalesPrice === tInputPrice && tPrevCurrCd === tEdit.CURR_CD) {
                        var tRetArray = [];
                        var tObj = {};
                        tObj.CODE =
                            'ERROR:SAME_SALES_PRICE:이전 SEQ의 sales_price와 동일합니다.';
                        tObj.id = 0;
                        tRetArray.push(tObj);
                        return tRetArray;
                    }
                }

                if (tEdit.IS_MASTER === '1') {
                    var tMasterSeqKey =
                        'MASTER_' +
                        tData.MATL_CD +
                        '_' +
                        tRetDate1 +
                        '_' +
                        (tEdit.CURR_CD || 'USD');
                    var nRet0 = [];
                    if (typeof tSameDateSeqMap[tMasterSeqKey] !== 'undefined') {
                        nRet0 = [
                            {
                                MATL_SEQ: tSameDateSeqMap[tMasterSeqKey],
                                REG_DATETIME: tRetDate,
                            },
                        ];
                    } else {
                        var sql0 = `
                            select
                                top 1
                                matl_seq as MATL_SEQ,
                                matl_price as MATL_PRICE,
                                reg_datetime as REG_DATETIME
                            from
                                kcd_matl_mem
                            where
                                matl_cd = '${tData.MATL_CD}'
                                and curr_cd = '${tEdit.CURR_CD || 'USD'}'
                                and (
                                    left(cast(REG_DATETIME as varchar(20)), 8) = '${tRetDate1}'
                                    or left(replace(convert(varchar(20), REG_DATETIME, 120), '-', ''), 8) = '${tRetDate1}'
                                )
                            order by
                                matl_seq desc
                        `;
                        nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                    }
                    if (nRet0.length <= 0) {
                        var sqlMaxSeq = `
                            select
                                top 1
                                matl_seq as max_seq,
                                matl_price as max_price,
                                reg_datetime as max_reg_datetime,
                                left(replace(convert(varchar(20), reg_datetime, 120), '-', ''), 8) as max_reg_date
                            from
                                kcd_matl_mem
                            where
                                matl_cd = '${tData.MATL_CD}'
                            order by
                                matl_seq desc
                        `;
                        var nRetMaxSeq = await prisma.$queryRaw(
                            Prisma.raw(sqlMaxSeq),
                        );
                        var tNextSeq = 1;
                        if (nRetMaxSeq.length > 0 && nRetMaxSeq[0].max_seq) {
                            tNextSeq = parseInt(nRetMaxSeq[0].max_seq) + 1;
                        }
                        tSameDateSeqMap[tMasterSeqKey] = tNextSeq;
                        var tInObj = {};
                        tInObj.MATL_CD = tData.MATL_CD;
                        tInObj.MATL_SEQ = tNextSeq;
                        tInObj.MATL_PRICE = tInputPrice;
                        tInObj.CURR_CD = tEdit.CURR_CD || 'USD';
                        tInObj.REG_USER = tUserInfo.USER_ID;
                        tInObj.REG_DATETIME = tRetDate;
                        tInObj.UPD_USER = tUserInfo.USER_ID;
                        tInObj.UPD_DATETIME = tRetDate;
                        tInObj.CONF_FLAG = 'W';
                        let tSQL99 = AFLib.createTableSql(
                            'KCD_MATL_MEM',
                            tInObj,
                        );
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);
                        tMatlSeq = tNextSeq;
                    } else {
                        var tInObj = {};
                        tInObj.MATL_PRICE = tInputPrice;
                        tInObj.CURR_CD = tEdit.CURR_CD || 'USD';
                        tInObj.UPD_USER = tUserInfo.USER_ID;
                        tInObj.UPD_DATETIME = tRetDate;
                        let tSQL99 = AFLib.updateTableSql(
                            'KCD_MATL_MEM',
                            tInObj,
                        );
                        tSQL99 += ` where MATL_CD = '${tData.MATL_CD}' and MATL_SEQ = '${nRet0[0].MATL_SEQ}' `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);
                        tMatlSeq = parseInt(nRet0[0].MATL_SEQ);
                        tSameDateSeqMap[tMasterSeqKey] = tMatlSeq;
                    }
                }

                if (tEdit.IS_SALES === '1') {
                    var tSalesSeqKey =
                        'SALES_' +
                        tData.MATL_CD +
                        '_' +
                        tRetDate1 +
                        '_' +
                        (tEdit.CURR_CD || 'USD');
                    var nRet0 = [];
                    if (typeof tSameDateSeqMap[tSalesSeqKey] !== 'undefined') {
                        nRet0 = [
                            {
                                MATL_SEQ: tSameDateSeqMap[tSalesSeqKey],
                                REG_DATETIME: tRetDate,
                            },
                        ];
                    } else {
                        var sql0 = `
                            select
                                top 1
                                matl_seq as MATL_SEQ,
                                matl_price as MATL_PRICE,
                                reg_datetime as REG_DATETIME
                            from
                                kcd_matl_sale
                            where
                                matl_cd = '${tData.MATL_CD}'
                                and curr_cd = '${tEdit.CURR_CD || 'USD'}'
                                and (
                                    left(cast(REG_DATETIME as varchar(20)), 8) = '${tRetDate1}'
                                    or left(replace(convert(varchar(20), REG_DATETIME, 120), '-', ''), 8) = '${tRetDate1}'
                                )
                            order by
                                matl_seq desc
                        `;
                        nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                    }
                    if (nRet0.length <= 0) {
                        var sqlMaxSeq = `
                            select
                                top 1
                                matl_seq as max_seq,
                                matl_price as max_price,
                                reg_datetime as max_reg_datetime,
                                left(replace(convert(varchar(20), reg_datetime, 120), '-', ''), 8) as max_reg_date
                            from
                                kcd_matl_sale
                            where
                                matl_cd = '${tData.MATL_CD}'
                            order by
                                matl_seq desc
                        `;
                        var nRetMaxSeq = await prisma.$queryRaw(
                            Prisma.raw(sqlMaxSeq),
                        );
                        var tNextSeq = 1;
                        if (nRetMaxSeq.length > 0 && nRetMaxSeq[0].max_seq) {
                            tNextSeq = parseInt(nRetMaxSeq[0].max_seq) + 1;
                        }
                        tSameDateSeqMap[tSalesSeqKey] = tNextSeq;
                        var tInObj = {};
                        tInObj.MATL_CD = tData.MATL_CD;
                        tInObj.MATL_SEQ = tNextSeq;
                        tInObj.MATL_PRICE = tInputPrice;
                        tInObj.CURR_CD = tEdit.CURR_CD || 'USD';
                        tInObj.REG_USER = tUserInfo.USER_ID;
                        tInObj.REG_DATETIME = tRetDate;
                        tInObj.UPD_USER = tUserInfo.USER_ID;
                        tInObj.UPD_DATETIME = tRetDate;
                        let tSQL99 = AFLib.createTableSql(
                            'KCD_MATL_SALE',
                            tInObj,
                        );
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);
                    } else {
                        var tInObj = {};
                        tInObj.MATL_PRICE = tInputPrice;
                        tInObj.CURR_CD = tEdit.CURR_CD || 'USD';
                        tInObj.UPD_USER = tUserInfo.USER_ID;
                        tInObj.UPD_DATETIME = tRetDate;
                        let tSQL99 = AFLib.updateTableSql(
                            'KCD_MATL_SALE',
                            tInObj,
                        );
                        tSQL99 += ` where MATL_CD = '${tData.MATL_CD}' and MATL_SEQ = '${nRet0[0].MATL_SEQ}' `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);
                        tSameDateSeqMap[tSalesSeqKey] = parseInt(nRet0[0].MATL_SEQ);
                    }
                }

                // Stock In , Mrp 처리
                var sqlStsIn = `
                    select distinct
                        PO_CD
                    from
                        ksv_stock_in
                    where
                        matl_cd = '${tData.MATL_CD}'
                        and (
                            end_flag is null
                            or end_flag = ''
                            or end_flag = '0'
                        )
                `;
                var retStsIn = await prisma.$queryRaw(Prisma.raw(sqlStsIn));
                var tIdx100 = 0;
                for (tIdx100 = 0; tIdx100 < retStsIn.length; tIdx100++) {
                    var tOne = {
                        ...retStsIn[tIdx100],
                    };
                    tOne.MATL_CD = tData.MATL_CD;

                    var tPayPrice = 0;
                    var sql90 = `
                        select
                            *
                        from
                            ksv_stock_mem2
                        where
                            matl_cd = '${tOne.MATL_CD}'
                            and po_cd = '${tOne.PO_CD}'
                            -- and (stsin_cd  is null or stsin_cd = '')
                    `;
                    var ret90 = await prisma.$queryRaw(Prisma.raw(sql90));
                    if (ret90.length > 0) {
                        var tMasterPrice = parseFloat(tEdit.PRICE);
                        var tMasterPrice = tInputPrice;
                        var tSurchargePrice = parseFloat(
                            ret90[0].SURCHARGE_PRICE,
                        );
                        var tPoPrice = tMasterPrice + tSurchargePrice;
                        tPayPrice = tPoPrice;
                    } else {
                        continue;
                    }

                    let updateSQL1 = `
                        update ksv_stock_in
                        set
                            pay_price = '${tPayPrice}',
                            pay_curr_cd = '${tEdit.CURR_CD}',
                            matl_seq = '${tMatlSeq}'
                        where
                            po_cd = '${tOne.PO_CD}'
                            and matl_cd = '${tOne.MATL_CD}'
                            and pay_price = in_price
                            and end_flag <> '1'
                    `;
                    tSQLArray.push(prisma.$queryRaw(Prisma.raw(updateSQL1)));

                    let updateSQL1 = `
                        update ksv_stock_in
                        set
                            in_price = '${tPayPrice}',
                            in_curr_cd = '${tEdit.CURR_CD}',
                            matl_seq = '${tMatlSeq}'
                        where
                            po_cd = '${tOne.PO_CD}'
                            and matl_cd = '${tOne.MATL_CD}'
                            and end_flag <> '1'
                    `;
                    tSQLArray.push(prisma.$queryRaw(Prisma.raw(updateSQL1)));
                }

                var sqlPoMrp = `
                    select distinct
                        a.PO_CD,
                        a.ORDER_CD
                    from
                        ksv_po_mrp a,
                        ksv_order_mst b
                    where
                        a.matl_cd = '${tData.MATL_CD}'
                        and a.order_cd = b.order_cd
                        and b.order_status < '7'
                `;
                var retPoMrp = await prisma.$queryRaw(Prisma.raw(sqlPoMrp));
                var tIdx101 = 0;
                for (tIdx101 = 0; tIdx101 < retPoMrp.length; tIdx101++) {
                    var tOne = {
                        ...retPoMrp[tIdx101],
                    };
                    tOne.MATL_CD = tData.MATL_CD;

                    let updateSQL1 = `
                        update ksv_po_mrp
                        set
                            matl_price = ${tInputPrice},
                            curr_cd = '${tEdit.CURR_CD}',
                            tot_amt = po_qty * ${tInputPrice},
                            matl_seq = '${tMatlSeq}'
                        where
                            po_cd = '${tOne.PO_CD}'
                            and order_cd = '${tOne.ORDER_CD}'
                            and matl_cd = '${tOne.MATL_CD}'
                            and matl_seq = (
                                select
                                    max(matl_seq)
                                from
                                    ksv_po_mrp
                                where
                                    po_cd = '${tOne.PO_CD}'
                                    and order_cd = '${tOne.ORDER_CD}'
                                    and matl_cd = '${tOne.MATL_CD}'
                            )
                    `;
                    tSQLArray.push(prisma.$queryRaw(Prisma.raw(updateSQL1)));

                    let updateSQL1 = `
                        update ksv_stock_mem
                        set
                            matl_seq = '${tMatlSeq}'
                        where
                            po_cd = '${tOne.PO_CD}'
                            and matl_cd = '${tOne.MATL_CD}'
                            and matl_seq = (
                                select
                                    max(matl_seq)
                                from
                                    ksv_stock_mem
                                where
                                    po_cd = '${tOne.PO_CD}'
                                    and matl_cd = '${tOne.MATL_CD}'
                            )
                    `;
                    tSQLArray.push(prisma.$queryRaw(Prisma.raw(updateSQL1)));
                }

                // ksv_stock_mem2 처리
                var sql9 = `
                    select
                        a.*
                    from
                        ksv_stock_mem2 a,
                        ksv_po_mem b,
                        ksv_order_mst c
                    where
                        a.matl_cd = '${tData.MATL_CD}'
                        and a.po_cd = b.po_cd
                        and b.po_seq = 1
                        and b.order_cd = c.order_cd
                        and c.order_status < '7'
                        and (
                            stsin_cd is null
                            or stsin_cd = ''
                        )
                `;
                var tRet9 = await prisma.$queryRaw(Prisma.raw(sql9));
                var tIdx9 = 0;
                for (tIdx9 = 0; tIdx9 < tRet9.length; tIdx9++) {
                    var tOne9 = {
                        ...tRet9[tIdx9],
                    };

                    var tMasterPrice = parseFloat(tEdit.PRICE);
                    var tMasterPrice = tInputPrice;
                    var tSurchargePrice = parseFloat(tOne9.SURCHARGE_PRICE);
                    var tPoPrice = tMasterPrice + tSurchargePrice;

                    let updateSQL1 = `
                        update ksv_stock_mem2
                        set
                            po_price = ${tPoPrice},
                            master_price = ${tInputPrice}
                        where
                            pu_cd = '${tOne9.PU_CD}'
                            and po_cd = '${tOne9.PO_CD}'
                            and matl_cd = '${tOne9.MATL_CD}'
                    `;
                    tSQLArray.push(prisma.$queryRaw(Prisma.raw(updateSQL1)));
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
                    tObj.CODE = `ERROR:MATL_PRICE:${e.message}`;
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED:MATL_PRICE:';
            tObj.id = 0;
            tRetArray.push(tObj);
            return tRetArray;
        },

        mgrInsert_S0301_MATL_RECORD_EDT_KCD_MATL_MEM: async (
            _,
            args,
            contextValue,
        ) => {
            //
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

            var retArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var tData = args.datas[tIdx];
               
                var tObjEDT_KCD_MATL_MEM = {
                    ...tData,
                };
                tObjEDT_KCD_MATL_MEM.REG_DATETIME = tRetDate;
                tObjEDT_KCD_MATL_MEM.UPD_DATETIME = tRetDate;
                tObjEDT_KCD_MATL_MEM.UPD_USER = tUserInfo.USER_ID;
                tObjEDT_KCD_MATL_MEM.REG_USER = tUserInfo.USER_ID;
                delete tObjEDT_KCD_MATL_MEM.id;
                delete tObjEDT_KCD_MATL_MEM.CURR_DATE;

                let tSQL99 = AFLib.createTableSql(
                    'KCD_MATL_MEM',
                    tObjEDT_KCD_MATL_MEM,
                );
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                var sqlPoMrp = `
                    select distinct
                        a.PO_CD,
                        a.ORDER_CD
                    from
                        ksv_po_mrp a,
                        ksv_order_mst b
                    where
                        a.matl_cd = '${tData.MATL_CD}'
                        and a.order_cd = b.order_cd
                        and b.order_status < '7'
                `;
                var retPoMrp = await prisma.$queryRaw(Prisma.raw(sqlPoMrp));
                var tIdx101 = 0;
                for (tIdx101 = 0; tIdx101 < retPoMrp.length; tIdx101++) {
                    var tOne = {
                        ...retPoMrp[tIdx101],
                    };
                    tOne.MATL_CD = tData.MATL_CD;

                    var tPayPrice = 0;
                    var sql90 = `
                        select
                            *
                        from
                            ksv_stock_mem2
                        where
                            matl_cd = '${tOne.MATL_CD}'
                            and po_cd = '${tOne.PO_CD}'
                            -- and (stsin_cd  is null or stsin_cd = '')
                    `;
                    var ret90 = await prisma.$queryRaw(Prisma.raw(sql90));
                    if (ret90.length > 0) {
                        var tMasterPrice = parseFloat(tEdit.PRICE);
                        var tSurchargePrice = parseFloat(
                            ret90[0].SURCHARGE_PRICE,
                        );
                        var tPoPrice = tMasterPrice + tSurchargePrice;
                        tPayPrice = tPoPrice;

                        let updateSQL1 = `
                            update ksv_stock_in
                            set
                                pay_price = '${tPayPrice}',
                                pay_curr_cd = '${tData.CURR_CD}',
                                matl_seq = '${tData.MATL_SEQ}'
                            where
                                po_cd = '${tOne.PO_CD}'
                                and matl_cd = '${tOne.MATL_CD}'
                                and pay_price = in_price
                                and end_flag <> '1'
                        `;
                        tSQLArray.push(
                            prisma.$queryRaw(Prisma.raw(updateSQL1)),
                        );
                    }

                    let updateSQL1 = `
                        update ksv_po_mrp
                        set
                            matl_price = ${tData.PRICE},
                            curr_cd = '${tData.CURR_CD}',
                            tot_amt = po_qty * ${tEdit.PRICE},
                            matl_seq = '${tData.MATL_SEQ}'
                        where
                            po_cd = '${tOne.PO_CD}'
                            and order_cd = '${tOne.ORDER_CD}'
                            and matl_cd = '${tOne.MATL_CD}'
                            and matl_seq = (
                                select
                                    max(matl_seq)
                                from
                                    ksv_po_mrp
                                where
                                    po_cd = '${tOne.PO_CD}'
                                    and order_cd = '${tOne.ORDER_CD}'
                                    and matl_cd = '${tOne.MATL_CD}'
                            )
                    `;
                    tSQLArray.push(prisma.$queryRaw(Prisma.raw(updateSQL1)));

                    let updateSQL1 = `
                        update ksv_stock_mem
                        set
                            matl_seq = '${tData.MATL_SEQ}'
                        where
                            po_cd = '${tOne.PO_CD}'
                            and matl_cd = '${tOne.MATL_CD}'
                            and matl_seq = (
                                select
                                    max(matl_seq)
                                from
                                    ksv_stock_mem
                                where
                                    po_cd = '${tOne.PO_CD}'
                                    and matl_cd = '${tOne.MATL_CD}'
                            )
                    `;
                    tSQLArray.push(prisma.$queryRaw(Prisma.raw(updateSQL1)));
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
                tObj.CODE = 'SUCCEED:MATL_PRICE:' + args.datas.length;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:MATL_PRICE';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },

        mgrUpdate_S0301_MATL_RECORD_EDT_KCD_MATL_MEM: async (
            _,
            args,
            contextValue,
        ) => {
            //
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
            var tYY = 'B' + yyyy.toString().substring(2) + '-';

            // let tPO = "POA2022S672";
            var tUserInfo = AFLib.getUserInfo(contextValue);
            var tSQLArray = [];

            var retArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var tData = args.datas[tIdx];
                var tObjEDT_KCD_MATL_MEM = {
                    ...tData,
                };

                var tObj = {};
                tObj.MATL_PRICE = tData.MATL_PRICE;
                tObj.UPD_USER = tUserInfo.USER_ID;
                tObj.UPD_DATETIME = tRetDate;
                tObj.CURR_CD = tData.CURR_CD;

                let tSQL99 = AFLib.updateTableSql('KCD_MATL_MEM', tObj);
                tSQL99 += ` where MATL_CD = '${tData.MATL_CD}' and MATL_SEQ = '${tData.MATL_SEQ}' `;
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
                tObj.CODE = 'SUCCEED:MATL_PRICE:' + args.datas.length;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:MATL_PRICE';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },

        mgrDelete_S0301_MATL_RECORD_EDT_KCD_MATL_MEM: async (_, args) => {
            //
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
            var tYY = 'B' + yyyy.toString().substring(2) + '-';

            // let tPO = "POA2022S672";

            var retArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var tData = args.datas[tIdx];
                var tObjEDT_KCD_MATL_MEM = {
                    ...tData,
                };

                /*
                        const retDelete = await prisma.@@TNAME@@.delete({
                           where: { id: tObj@@TNAME@@.id, },
                        });

                        var tObj = {};
                        tObj.CODE = tObj@@TNAME@@.id;
                        retArray.push(tObj);
                */
            }
            return retArray;
        },

        mgrUpdate_S0301_REMARK: async (_, args, contextValue) => {
            console.log('resolver called');
            console.log('args:', args);
            const tUserInfo = AFLib.getUserInfo(contextValue);
            const datas = args.datas;

            var tSQLArray = [];

            try {
                for (let i = 0; i < datas.length; i++) {
                    const tData = datas[i];

                    if (!tData.MATL_CD) continue;
                    if (
                        !tData.update_remark ||
                        tData.update_remark.trim() === ''
                    )
                        continue;

                    const tRemark = String(tData.update_remark).replace(
                        /\'/gi,
                        "''",
                    );

                    let tSQL = `
                        update kcd_matl_update_remark
                        set
                            update_remark = '${tRemark}',
                            upd_user = '${tUserInfo.USER_ID}',
                            upd_datetime = '${moment().format('YYYYMMDDHHmmss')}'
                        where
                            matl_cd = '${tData.MATL_CD}'
                            and upd_user = '${tData.update_user}'
                            and upd_datetime = '${tData.update_datetime}'
                    `;

                    console.log('--------------', tSQL);

                    const tSQL1 = prisma.$queryRaw(Prisma.raw(tSQL));
                    tSQLArray.push(tSQL1);
                }

                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };

                await prisma.$transaction(tSQLArray);

                delete global.currentTransactionInfo;

                return {
                    id: 'OK',
                    CODE: 'SUCCESS',
                };
            } catch (err) {
                console.log(err);

                return {
                    id: '',
                    CODE: 'ERROR',
                };
            }
        },
    },
};

export default moduleMutation_S0301_MATL_RECORD_EDT_KCD_MATL_MEM;
