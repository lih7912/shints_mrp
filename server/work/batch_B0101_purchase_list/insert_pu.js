const { MongoClient } = require('mongodb');
const path = require('path');
const fs = require('fs');

// import { Prisma } from "@prisma/client";
// import prisma from "../../db";  //PrismaClient 사용하기 위해 불러오기

/*
const { PrismaClient : PrismaClient1 } = require('../../prisma/client');
const prisma = new PrismaClient1();
*/
/*
const { PrismaClient : PrismaClient2 } = require('../../prisma/mysql_client');
const prisma_mysql = new PrismaClient2();
*/

const { PrismaClient: PrismaClient1 } = require('@prisma/client');
const prisma = new PrismaClient1({
    log: [
        {
            emit: 'event',
            level: 'query',
        },
        {
            emit: 'stdout',
            level: 'error',
        },
        {
            emit: 'stdout',
            level: 'info',
        },
        {
            emit: 'stdout',
            level: 'warn',
        },
    ],
});

/*
prisma.$on('query', (e) => {
  console.log('Query: ' + e.query)
  console.log('Params: ' + e.params)
  console.log('Duration: ' + e.duration + 'ms')
})
*/

/*
prisma.$on('error', (e) => {
  console.log(e);
})
*/

const process1 = async (argPoCd, argVendorCd) => {
    var tDateNew = new Date();
    tDateNew.setMonth(tDateNew.getMonth() + 1);
    var tZeroDate = '00';
    var tDateNew_M =
        tZeroDate.substring(0, 2 - String(tDateNew.getMonth() + 1).length) +
        String(tDateNew.getMonth() + 1);
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

    var tYY2 = tRetDate.substring(2, 4);
    var tSEQ = tRetDate.substring(4, 14);

    var tZero = '000000';
    var tNewCd = `PU${tYY2}-${tSEQ}`;
    // console.log("New Cd:" + tNewCd);

    var tObjPoMst = await prisma.$queryRaw`
        select
            *
        from
            ksv_po_mst
        where
            po_cd = ${argPoCd}
            and po_seq = 1
    `;

    var tObjPoMem = await prisma.$queryRaw`
        select
            *
        from
            ksv_po_mem
        where
            po_cd = ${argPoCd}
            and po_seq = 1
    `;
    var tBuyerCd = tObjPoMem[0].ORDER_CD.substring(0, 2);
    var tFactoryCd = '';

    var tObjVendor = await prisma.$queryRaw`
        select
            *
        from
            kcd_vendor
        where
            vendor_cd = ${argVendorCd}
    `;

    var tObjMail = await prisma.$queryRaw`
        select
            *
        from
            ksv_mail_log
        where
            po_cd = ${argPoCd}
    `;
    var tUserId = 'aftest01';
    var tOrderDate = tObjPoMst[0].PO_CONF_DATE;
    if (tObjMail.length > 0) {
        tUserId = tObjMail[0].USER_ID;
        tOrderDate = tObjMail[0].SEND_DATETIME.substring(0, 8);
    }

    var tMatlArray = [];
    var tObjMatl = await prisma.$queryRaw`
        select
            K.*
        from
            (
                SELECT
                    A1.PO_CD,
                    A3.VENDOR_CD,
                    A1.MATL_CD,
                    A3.MATL_NAME,
                    A3.COLOR,
                    A3.SPEC,
                    A3.UNIT,
                    A4.CURR_CD,
                    max(A4.MATL_PRICE) AS MASTER_PRICE,
                    sum(A1.PO_QTY) AS MRP_QTY0,
                    sum(A1.PO_QTY) AS MRP_QTY1,
                    max(A1.PO_SEQ) AS PO_SEQ
                FROM
                    KSV_PO_MRP A1,
                    KCD_MATL_MST A3,
                    KCD_MATL_MEM A4,
                    KSV_ORDER_MST A5,
                    KSV_PO_MST A6
                WHERE
                    A1.PO_CD = ${argPoCd}
                    AND A1.PO_CD = A6.PO_CD
                    AND A1.PO_SEQ = A6.PO_SEQ
                    AND A6.PO_STATUS = '4'
                    AND A1.ORDER_CD = A5.ORDER_CD
                    AND (
                        A1.PO_SEQ < 97
                        OR A1.PO_SEQ > 100
                    )
                    AND A1.USE_PO_TYPE = '1'
                    AND A1.DIFF_PO_TYPE in ('0', '3', '2', '4')
                    AND A1.MATL_CD = A3.MATL_CD
                    AND A3.VENDOR_CD = ${argVendorCd}
                    AND A1.MATL_CD = A4.MATL_CD
                    AND A1.MATL_SEQ = A4.MATL_SEQ
                group by
                    A1.PO_CD,
                    A3.VENDOR_CD,
                    A1.MATL_CD,
                    A3.MATL_NAME,
                    A3.COLOR,
                    A3.SPEC,
                    A3.UNIT,
                    A4.CURR_CD
            ) K
    `;
    var tIdx = 0;
    for (tIdx = 0; tIdx < tObjMatl.length; tIdx++) {
        var tOne = { ...tObjMatl[tIdx] };

        var tObjStock = await prisma.$queryRaw`
            select
                isnull(sum(use_qty), 0) as stock_qty
            from
                ksv_stock_use
            where
                use_po_cd = ${argPoCd}
                and use_matl_cd = ${tOne.MATL_CD}
        `;
        tOne.STOCK_QTY = 0;
        if (tObjStock.length > 0) tOne.STOCK_QTY = tObjStock[0].stock_qty;

        var tValue = parseFloat(tOne.MRP_QTY0) + parseFloat(tOne.STOCK_QTY);
        tOne.MRP_QTY = String(tValue);

        var tMoqQty = 0;
        var tObjMoq = await prisma.$queryRaw`
            select
                isnull(sum(po_qty), 0) as moq_qty
            from
                ksv_po_mrp
            where
                po_cd = '${tOne.PO_CD}'
                and matl_cd = '${tOne.MATL_CD}'
                and po_seq = 99
        `;
        if (tObjMoq.length > 0) tMoqQty = tObjMoq[0].moq_qty;
        tOne.MOQ_QTY = tMoqQty;
        tOne.MRP_QTY2 = '0';
        tOne.PO_QTY = String(tOne.MRP_QTY0);
        tOne.DIFF_QTY = '0';
        tOne.PO_UPDATE_QTY = tOne.PO_QTY;
        tOne.PU_STATUS = 'New';
        tOne.SURCHARGE_PRICE = '0';
        tOne.SURCHARGE_AMT = '0';
        tOne.SURCHARGE_REMARK = '';
        tOne.PO_PRICE = tOne.MASTER_PRICE;
        tOne.PU_CD = '';
        tMatlArray.push(tOne);
    }

    var tObjBank = await prisma.$queryRaw`
        select
            a.pay_type,
            a.pay_term,
            b.bank_cd
        from
            kcd_vendor a,
            kcd_vendor_bank b
        where
            a.vendor_cd = ${argVendorCd}
            and a.vendor_cd = b.vendor_cd
    `;
    var tPayType = '';
    var tPayTerm = '';
    var tBankCd = '';
    if (tObjBank.length > 0) {
        tPayType = tObjBank[0].pay_type;
        tPayTerm = tObjBank[0].pay_term;
        tBankCd = tObjBank[0].bank_cd;
    }

    var tMaxPoSeq = 1;
    var tObjPoSeq = await prisma.$queryRaw`
        select
            max(po_seq) as max_po_seq
        from
            ksv_po_mst
        where
            po_cd = ${argPoCd}
    `;
    if (tObjPoSeq.length > 0) tMaxPoSeq = tObjPoSeq[0].max_po_seq;

    var tSQLArray = [];

    var tTARGET_ETA = '';
    var tMRP_DATE = '';
    var tFACTORY_CD = '';
    var tETA = '';
    var tDueDate = '';
    var tExFactory = '';
    var tPoCd2 = '';
    var tIdx1 = 0;
    var tSavePoCd = '';
    var tPoCdArray = [];

    var tLC_AMT = 0;
    var tLC_QTY = 0;
    var tLC_QTY1 = 0;

    // pu list
    var tPuSeq = 1;
    var tPoArray = [];
    tPoArray.push(argPoCd);

    var tObjPoInfo = await prisma.$queryRaw`
        select
            c.FACTORY_CD,
            isnull(a.po_conf_date, '') as PO_CONF_DATE,
            isnull(a.matl_due_date, '') as PO_ETA,
            isnull(a.prod_due_date, '') as PO_ETD,
            isnull(a.plan_flag, '') as PLAN_FLAG,
            isnull(a.plan_etd, '') as PLAN_ETD,
            isnull(a.plan_eta, '') as PLAN_ETA,
            max(c.MATL_DUE_DATE) as ORDER_ETA
        from
            KSV_PO_MST a,
            KSV_STOCK_MST b,
            KSV_ORDER_MST c,
            KSV_PO_MEM d
        where
            a.PO_CD = ${argPoCd}
            and a.PO_SEQ = 1
            and a.PO_CD = b.PO_CD
            and b.PO_SEQ = 1
            and a.PO_CD = d.PO_CD
            and d.PO_SEQ = 1
            and d.order_cd = c.order_cd
        group by
            c.FACTORY_CD,
            isnull(a.po_conf_date, ''),
            isnull(a.matl_due_date, ''),
            isnull(a.prod_due_date, ''),
            isnull(a.plan_flag, ''),
            isnull(a.plan_etd, ''),
            isnull(a.plan_eta, '')
    `;

    tMRP_DATE = tObjPoInfo[0].PO_CONF_DATE;
    tTARGET_ETA = tObjPoInfo[0].PO_ETA;
    if (tObjPoInfo[0].PLAN_ETA !== '') tTARGET_ETA = tObjPoInfo[0].PLAN_ETA;
    tETA = tTARGET_ETA;
    tDueDate = tObjPoInfo[0].PO_ETD;
    if (tObjPoInfo[0].PLAN_ETD !== '') tDueDate = tObjPoInfo[0].PLAN_ETD;
    tExFactory = tObjPoInfo[0].PO_ETD;
    if (tObjPoInfo[0].PLAN_ETD !== '') tExFactory = tObjPoInfo[0].PLAN_ETD;
    tFactoryCd = tObjPoInfo[0].FACTORY_CD;

    // matl list Update
    var tCurrCd = '';
    var tIdx0 = 0;
    var tPayAmt = 0;
    var tSumPoQty = 0;
    for (tIdx0 = 0; tIdx0 < tMatlArray.length; tIdx0++) {
        var col = { ...tMatlArray[tIdx0] };
        tCurrCd = col.CURR_CD;

        var tInStockMem2 = prisma.$queryRaw`
            insert into
                ksv_stock_mem2 (
                    pu_cd, --1
                    po_cd, --2
                    po_seq, --3
                    order_cd, --4
                    vendor_cd, --5
                    matl_cd, --6
                    moq, --7
                    po_qty, --8
                    stock_qty, --9
                    po_qty2, --10
                    lc_qty, --11
                    in_qty, --12
                    out_qty, --13
                    infac_qty, --14
                    outfac_qty, --15
                    curr_cd, --16
                    master_price, --17
                    surcharge_price, --18
                    surcharge_amt, --19
                    surcharge_remark, --20
                    po_price
                )
            values
                (
                    ${tNewCd}, --1
                    ${argPoCd}, --2
                    ${tMaxPoSeq}, --3
                    '', --4
                    ${argVendorCd}, --5
                    ${col.MATL_CD}, --6
                    ${col.MOQ_QTY}, --7
                    ${col.MRP_QTY}, --8
                    ${col.STOCK_QTY}, --9
                    ${col.PO_QTY}, --10
                    '0', --11
                    '0', --12
                    '0', --13
                    '0', --14
                    '0', --15
                    ${col.CURR_CD}, --16
                    ${col.MASTER_PRICE}, --17
                    '0', --18
                    '0', --19
                    '', --20
                    ${col.PO_PRICE} --21
                )
        `;
        tSQLArray.push(tInStockMem2);

        var tUpPoMrp = prisma.$queryRaw`
            update ksv_po_mrp
            set
                pu_cd = ${tNewCd},
                pu_seq = '1'
            where
                po_cd = ${argPoCd}
                and matl_cd = ${col.MATL_CD}
                and (
                    pu_cd is null
                    or pu_cd = ''
                )
        `;
        tSQLArray.push(tUpPoMrp);

        var tUpStockMem = prisma.$queryRaw`
            update ksv_stock_mem
            set
                pu_cd = ${tNewCd}
            where
                po_cd = ${argPoCd}
                and matl_cd = ${col.MATL_CD}
        `;
        tSQLArray.push(tUpStockMem);

        tPayAmt += parseFloat(col.PO_QTY) * parseFloat(col.MASTER_PRICE);
        tSumPoQty += parseFloat(col.PO_QTY);
    }

    var tInPuMem = prisma.$queryRaw`
        insert into
            ksv_pu_mem (
                pu_cd,
                pu_seq,
                po_cd,
                po_seq,
                vendor_cd,
                reg_datetime,
                reg_user,
                po_qty
            )
        values
            (
                ${tNewCd},
                1,
                ${argPoCd},
                ${tMaxPoSeq},
                ${argVendorCd},
                ${tRetDate},
                ${tUserId},
                ${tSumPoQty}
            )
    `;
    tSQLArray.push(tInPuMem);

    var tBillTo = 'SHINTS';
    if (tObjVendor[0].VENDOR_NAME.includes('FACTORY')) tBillTo = 'FACTORY';
    else if (tObjVendor[0].VENDOR_NAME.includes('BUYER')) tBillTo = 'BUYER';

    var tShipTo = '';
    if (tObjPoInfo[0].FACTORY_CD === 'FC034') tShipTo = 'BVT';
    else if (tObjPoInfo[0].FACTORY_CD === 'FC044') tShipTo = 'ETP';
    else if (tObjPoInfo[0].FACTORY_CD === 'FC010') tShipTo = 'SHINTS';
    var tNormi = 'X';
    var tTradeTerm = 'FOB';
    var tForwarder = 'RDS';
    var tOriginPort = 'SHANGHAI';
    if (tObjVendor[0].VENDOR_TYPE === '1') tOriginPort = 'INCHEON';
    if (
        tObjVendor[0].VENDOR_TYPE === '5' &&
        tObjPoInfo[0].FACTORY_CD === 'FC034'
    )
        tOriginPort = 'HAIPHONG';
    if (
        tObjVendor[0].VENDOR_TYPE === '5' &&
        tObjPoInfo[0].FACTORY_CD === 'FC044'
    )
        tOriginPort = 'CAIRO';

    var tInPuMst2 = prisma.$queryRaw`
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
                ${tNewCd},
                ${argVendorCd},
                ${tBuyerCd},
                ${tObjPoInfo[0].FACTORY_CD},
                ${tUserId},
                ${tRetDate},
                '-',
                ${tObjVendor[0].VENDOR_MATL_TYPE},
                ${tBillTo},
                ${tShipTo},
                ${tCurrCd},
                '0',
                '0',
                ${tNormi},
                ${tTradeTerm},
                ${tOrderDate},
                ${tDueDate},
                ${tForwarder},
                '',
                ${argPoCd},
                ${tTARGET_ETA},
                '1',
                '',
                ${tExFactory},
                ${tExFactory},
                ${tTARGET_ETA},
                ${tMRP_DATE},
                '0',
                '0',
                ${tPayAmt},
                ${tPayType},
                ${tBankCd},
                ${tOriginPort},
                ${tDueDate},
                ${tExFactory}
            )
    `;
    tSQLArray.push(tInPuMst2);

    var tInMem2Log = prisma.$queryRaw`
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
            ${tNewCd},
            '1',
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
            pu_cd = ${tNewCd}
    `;
    tSQLArray.push(tInMem2Log);

    var tInPoWorkList = prisma.$queryRaw`
        insert into
            ksv_po_worklist (
                po_cd,
                status_cd,
                buyer_cd,
                factory_cd,
                reg_user,
                reg_datetime
            )
        values
            (
                ${argPoCd},
                '0',
                ${tBuyerCd},
                ${tFactoryCd},
                ${tUserId},
                ${tRetDate1}
            )
    `;

    var tQryPoWorkList = await prisma.$queryRaw`
        select
            *
        from
            ksv_po_worklist
        where
            po_cd = ${argPoCd}
    `;
    if (tQryPoWorkList.length <= 0) tSQLArray.push(tInPoWorkList);

    var tInPoVendor = prisma.$queryRaw`
        update ksv_po_vendor
        set
            pu_cd = ${tNewCd}
        where
            po_cd = ${argPoCd}
            and vendor_cd = ${argVendorCd}
    `;
    tSQLArray.push(tInPoVendor);

    try {
        await prisma.$transaction(tSQLArray);
        console.log(
            `Make Purchase Succeed: ${argPoCd} / ${argVendorCd} / ${tNewCd}  `,
        );
        return 'SUCCESS';
    } catch (e) {
        console.log(`Make Purchase  Error: ${argPoCd} / ${argVendorCd} `);
        return 'FAIL';
    }
};

const process0 = async () => {
    var tRet0 = await prisma.$queryRaw`
        select
            po_cd,
            po_status,
            plan_flag
        from
            ksv_po_mst
        where
            left(reg_datetime, 4) >= '2022'
            and po_seq = 1
    `;

    var tTotIdx = 0;
    var tIdx = 0;
    var tArray = [];
    for (tIdx = 0; tIdx < tRet0.length; tIdx++) {
        var tOne = tRet0[tIdx];

        var tRet1 = await prisma.$queryRaw`
            select
                po_cd,
                vendor_cd,
                isnull(pu_cd, '') as pu_cd
            from
                ksv_po_vendor
            where
                po_cd = ${tOne.po_cd}
        `;

        var tRet2 = await prisma.$queryRaw`
            select
                isnull(count(*), 0) as cnt
            from
                ksv_mail_log
            where
                po_cd = ${tOne.po_cd}
        `;

        var tRet3 = await prisma.$queryRaw`
            select
                isnull(sum(po_qty), 0) as cnt
            from
                ksv_stock_mem
            where
                po_cd = ${tOne.po_cd}
        `;

        if (tRet1.length > 0 && tRet3[0].cnt > 0) {
            console.log(
                `------------------------------------------------------------------------------------------------------------`,
            );
            console.log(
                `PO_CD/PO_STATUS/PLAN_FLAG/PO_VENDOR_CNT/MAIL_CNT/STOCK_MEM_CNT----------------------------------------------`,
            );
            console.log(
                `>>>>(1): ${tOne.po_cd}|${tOne.po_status}|${tOne.plan_flag}|${tRet1.length}|${tRet2[0].cnt}|${tRet3[0].cnt}|`,
            );
            var tIdx1 = 0;

            for (tIdx1 = 0; tIdx1 < tRet1.length; tIdx1++) {
                var tOne2 = tRet1[tIdx1];
                console.log(`>>>>(2): ${tOne.po_cd}|${tOne2.vendor_cd}|`);

                /*
                var tRet4 =  await prisma.$queryRaw`
                    select
                        pu_cd
                    from
                        ksv_pu_mst2
                    where
                        po_cd2 = ${tOne.po_cd}
                        and vendor_cd = ${tOne2.VENDOR_CD}
                `;
                if (tRet4.length > 0) {
                    console.log(`>>>>(2): ${tOne.po_cd}|${tOne2.VENDOR_CD}| Already Exist| ${tRet4[0].pu_cd} `);
                    continue;
                }
*/
                if (tOne2.pu_cd !== '') {
                    console.log(
                        `>>>>(2): ${tOne.po_cd}|${tOne2.VENDOR_CD}| Already Exist| ${tOne2.pu_cd} `,
                    );
                    continue;
                }

                var tRet99 = await process1(tOne.po_cd, tOne2.vendor_cd);
                if (tRet99.includes('FAIL')) return;

                tTotIdx += 1;
            }
        }

        /*
        var tRet4 =  await prisma.$queryRaw`
            select
                isnull(sum(in_qty), 0) as cnt
            from
                ksv_stock_in
            where
                po_cd = ${tOne.po_cd}
        `;

        var tRet5 =  await prisma.$queryRaw`
            select
                isnull(sum(out_qty), 0) as cnt
            from
                ksv_stock_out
            where
                po_cd = ${tOne.po_cd}
        `;
*/

        //         console.log(`${tOne.po_cd}|${tOne.po_status}|${tOne.plan_flag}|${tRet1[0].cnt}|${tRet2[0].cnt}|${tRet3[0].cnt}|${tRet4[0].cnt}|${tRet5[0].cnt}`);
    }

    /*
     var tObjPoVendor = await prisma.$queryRaw`
         select
             *
         from
             ksv_po_vendor
         where
             po_cd = ${tPoCd}
     `;
     var tIdx9 = 0;
     console.log(tObjPoVendor.length);
     for (tIdx9 = 0; tIdx9 < tObjPoVendor.length; tIdx9 ++) {
        var tObj = { ...tObjPoVendor[tIdx9] };
        console.log(tObj.VENDOR_CD);
        process1(argPoCd, tObj.VENDOR_CD);
        
     }
*/
};

// var tPoCd = process.argv[2];
process0('');

// var tRet process1(tPoCd, tVendorCd);
