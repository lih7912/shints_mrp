const { MongoClient } = require('mongodb');
const path = require('path');
const fs = require('fs');

import { Prisma } from '@prisma/client';
import prisma from './db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from './commlib'; //PrismaClient 사용하기 위해 불러오기

const process1 = async (
    argPoCd: string,
    argVendorCd: string,
    argPoSeq: number,
): Promise<string> => {
    var tRetDateFull: string = AFLib.getCurrTime();
    var tRetDate: string = tRetDateFull.substring(0, 14);
    var tRetDate1: string = tRetDate.substring(0, 8);

    var tYY2: string = tRetDate.substring(2, 4);
    var tSEQ: string = tRetDate.substring(4, 17);

    var tZero: string = '000000';
    var tNewCd: string = `PU${tYY2}-`;

    var sqlPoMst = `
        select
            *
        from
            ksv_po_mst
        where
            po_cd = '${argPoCd}'
            and po_seq = 1
    `;
    var tObjPoMsts: Object[] = await prisma.$queryRaw(Prisma.raw(sqlPoMst));
    var tObjPoMst: Object = { ...tObjPoMsts[0] };

    var sqlPoMem = `
        select
            *
        from
            ksv_po_mem
        where
            po_cd = '${argPoCd}'
            and po_seq = 1
    `;
    var tObjPoMems: Object[] = await prisma.$queryRaw(Prisma.raw(sqlPoMem));
    var tObjPoMem: Object = { ...tObjPoMems[0] };

    var tBuyerCd: string = tObjPoMem['ORDER_CD'];
    tBuyerCd = tBuyerCd.substring(0, 2);
    var tFactoryCd: string = '';

    tNewCd += tBuyerCd;
    var tPuSeq = 1;
    var sqlPuSeq = `
        select
            isnull(max(pu_cd), 'PUXX-YY000000') as max_pu_cd
        from
            ksv_pu_mst2
        where
            pu_cd like '${tNewCd}%'
    `;
    var tObjPuSeqs: Object[] = await prisma.$queryRaw(Prisma.raw(sqlPuSeq));
    var tPuSeqStr: string = tObjPuSeqs[0]['max_pu_cd'];
    tPuSeqStr = tPuSeqStr.substring(7, 13);
    tPuSeq = parseInt(tPuSeqStr) + 1;

    var tPuSeqStr0 = String(tPuSeq);
    var tPuSeqStr = tZero.substring(0, 6 - tPuSeqStr0.length) + tPuSeqStr0;
    tNewCd += tPuSeqStr;

    var sqlVendor = `
        select
            *
        from
            kcd_vendor
        where
            vendor_cd = '${argVendorCd}'
    `;
    var tObjVendors: Object[] = await prisma.$queryRaw(Prisma.raw(sqlVendor));
    if (tObjVendors.length <= 0) {
        return 'SUCCESS';
    }

    var tObjVendor: Object = { ...tObjVendors[0] };

    var sqlMail = `
        select
            *
        from
            ksv_mail_log
        where
            po_cd = '${argPoCd}'
            and vendor_cd = '${argVendorCd}'
    `;
    var tObjMails: Object[] = await prisma.$queryRaw(Prisma.raw(sqlMail));
    var tObjMail: Object = {};

    var tUserId: string = 'aftest01';
    var tOrderDate: string = tObjPoMst['PO_DATE'];
    if (tObjMails.length > 0) {
        tObjMail = { ...tObjMails[0] };
        tUserId = tObjMail['USER_ID'];
        tOrderDate = tObjMail['SEND_DATETIME'].substring(0, 8);
        tOrderDate = tOrderDate.substring(0, 8);
    }

    var tMatlArray: Object[] = [];
    var sqlMatl = `
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
                    A1.PO_CD = '${argPoCd}'
                    AND A1.PO_CD = A6.PO_CD
                    AND A1.PO_SEQ = A6.PO_SEQ
                    AND A6.PO_STATUS = '4'
                    AND A1.ORDER_CD = A5.ORDER_CD
                    AND (
                        A1.PO_SEQ <= ${argPoSeq}
                        or A1.PO_SEQ > 100
                    )
                    -- AND  (A1.PO_SEQ < 97 OR A1.PO_SEQ > 100)
                    AND A1.USE_PO_TYPE = '1'
                    AND A1.DIFF_PO_TYPE in ('0', '3', '2', '4')
                    AND A1.MATL_CD = A3.MATL_CD
                    AND A3.VENDOR_CD = '${argVendorCd}'
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
    var tObjMatls: Object[] = await prisma.$queryRaw(Prisma.raw(sqlMatl));

    var tIdx = 0;
    for (tIdx = 0; tIdx < tObjMatls.length; tIdx++) {
        var tOne: Object = { ...tObjMatls[tIdx] };

        var sqlStock = `
            select
                isnull(sum(use_qty), 0) as stock_qty
            from
                ksv_stock_use
            where
                use_po_cd = '${argPoCd}'
                and use_matl_cd = '${tOne['MATL_CD']}'
        `;
        var tObjStocks: Object[] = await prisma.$queryRaw(Prisma.raw(sqlStock));

        tOne['STOCK_QTY'] = 0;
        if (tObjStocks.length > 0)
            tOne['STOCK_QTY'] = tObjStocks[0]['stock_qty'];

        var tValue: number =
            parseFloat(tOne['MRP_QTY0']) + parseFloat(tOne['STOCK_QTY']);
        tOne['MRP_QTY'] = String(tValue);

        var tMoqQty = 0;
        var sqlMoq = `
            select
                isnull(sum(po_qty), 0) as moq_qty
            from
                ksv_po_mrp
            where
                po_cd = '${tOne['PO_CD']}'
                and matl_cd = '${tOne['MATL_CD']}'
                and po_seq = 99
        `;
        var tObjMoqs: Object[] = await prisma.$queryRaw(Prisma.raw(sqlMoq));
        if (tObjMoqs.length > 0) tMoqQty = tObjMoqs[0]['moq_qty'];

        /*
          var tLeftOverQty = 0;
          var sqlLeftOver  = `
              select
                  isnull(sum(po_qty), 0) as leftover_qty
              from
                  ksv_po_mrp
              where
                  po_cd = '${tOne['PO_CD']}'
                  and matl_cd = '${tOne['MATL_CD']}'
                  and po_seq = 98
          `;
          var tObjLeftOvers :Object[] = await prisma.$queryRaw(Prisma.raw(sqlLeftOver));
          if (tObjLeftOvers.length > 0)  tLeftOverQty = tObjLeftOvers[0]['leftover_qty'];

          var tFocQty = 0;
          var sqlFoc  = `
              select
                  isnull(sum(po_qty), 0) as foc_qty
              from
                  ksv_po_mrp
              where
                  po_cd = '${tOne['PO_CD']}'
                  and matl_cd = '${tOne['MATL_CD']}'
                  and po_seq = 97
          `;
          var tObjFocs :Object[] = await prisma.$queryRaw(Prisma.raw(sqlFoc));
          if (tObjFocs.length > 0)  tFocQty = tObjLeftOvers[0]['foc_qty'];
*/

        tOne['MOQ_QTY'] = tMoqQty;
        tOne['MRP_QTY2'] = '0';
        tOne['PO_QTY'] = String(tOne['MRP_QTY0']);
        tOne['DIFF_QTY'] = '0';
        tOne['PO_UPDATE_QTY'] = tOne['PO_QTY'];
        tOne['PU_STATUS'] = 'New';
        tOne['SURCHARGE_PRICE'] = '0';
        tOne['SURCHARGE_AMT'] = '0';
        tOne['SURCHARGE_REMARK'] = '';
        tOne['PO_PRICE'] = tOne['MASTER_PRICE'];
        tOne['PU_CD'] = '';
        tMatlArray.push(tOne);
    }

    var sqlBank = `
        select
            a.pay_type,
            a.pay_term,
            b.bank_cd
        from
            kcd_vendor a,
            kcd_vendor_bank b
        where
            a.vendor_cd = '${argVendorCd}'
            and a.vendor_cd = b.vendor_cd
    `;
    var tObjBanks: Object[] = await prisma.$queryRaw(Prisma.raw(sqlBank));
    var tPayType = '';
    var tPayTerm = '';
    var tBankCd = '';
    if (tObjBanks.length > 0) {
        tPayType = tObjBanks[0]['pay_type'];
        tPayTerm = tObjBanks[0]['pay_term'];
        tBankCd = tObjBanks[0]['bank_cd'];
    }

    var tMaxPoSeq = 1;
    var sqlPoSeq = `
        select
            max(po_seq) as max_po_seq
        from
            ksv_po_mst
        where
            po_cd = '${argPoCd}'
            and po_seq <= '${argPoSeq}'
    `;
    var tObjPoSeqs: Object[] = await prisma.$queryRaw(Prisma.raw(sqlPoSeq));
    if (tObjPoSeqs.length > 0) tMaxPoSeq = tObjPoSeqs[0]['max_po_seq'];

    var tSQLArray: any[] = [];

    var tTARGET_ETA = '';
    var tMRP_DATE = '';
    var tFACTORY_CD = '';
    var tETA = '';
    var tDueDate = '';
    var tExFactory = '';
    var tPoCd2 = '';
    var tIdx1 = 0;
    var tSavePoCd = '';
    var tPoCdArray: string[] = [];

    var tLC_AMT = 0;
    var tLC_QTY = 0;
    var tLC_QTY1 = 0;

    // pu list
    var tPuSeq = 1;
    var tPoArray: string[] = [];
    tPoArray.push(argPoCd);

    var sqlPoInfo = `
        select
            c.FACTORY_CD,
            -- isnull(a.po_conf_date, '') as PO_CONF_DATE,
            isnull(a.po_date, '') as PO_DATE,
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
            a.PO_CD = '${argPoCd}'
            and a.PO_SEQ = 1
            and a.PO_CD = b.PO_CD
            and b.PO_SEQ = 1
            and a.PO_CD = d.PO_CD
            and d.PO_SEQ = 1
            and d.order_cd = c.order_cd
        group by
            c.FACTORY_CD,
            isnull(a.po_date, ''),
            isnull(a.matl_due_date, ''),
            isnull(a.prod_due_date, ''),
            isnull(a.plan_flag, ''),
            isnull(a.plan_etd, ''),
            isnull(a.plan_eta, '')
    `;
    var tObjPoInfos: Object[] = await prisma.$queryRaw(Prisma.raw(sqlPoInfo));
    var tObjPoInfo: Object = { ...tObjPoInfos[0] };

    // tMRP_DATE = tObjPoInfo['PO_CONF_DATE'];
    tMRP_DATE = tObjPoInfo['PO_DATE'];
    tTARGET_ETA = tObjPoInfo['PO_ETA'];
    if (tObjPoInfo['PLAN_ETA'] !== '') tTARGET_ETA = tObjPoInfo['PLAN_ETA'];
    tETA = tTARGET_ETA;
    tDueDate = tObjPoInfo['PO_ETD'];
    if (tObjPoInfo['PLAN_ETD'] !== '') tDueDate = tObjPoInfo['PLAN_ETD'];
    tExFactory = tObjPoInfo['PO_ETD'];
    if (tObjPoInfo['PLAN_ETD'] !== '') tExFactory = tObjPoInfo['PLAN_ETD'];
    tFactoryCd = tObjPoInfo['FACTORY_CD'];

    // matl list Update
    var tCurrCd = '';
    var tIdx0 = 0;
    var tPayAmt = 0.0;
    var tSumPoQty = 0.0;
    for (tIdx0 = 0; tIdx0 < tMatlArray.length; tIdx0++) {
        var col: Object = { ...tMatlArray[tIdx0] };
        tCurrCd = col['CURR_CD'];

        var sqlInStockMem2 = `
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
                    '${tNewCd}', --1
                    '${argPoCd}', --2
                    '${tMaxPoSeq}', --3
                    '', --4
                    '${argVendorCd}', --5
                    '${col['MATL_CD']}', --6
                    '${col['MOQ_QTY']}', --7
                    '${col['MRP_QTY']}', --8
                    '${col['STOCK_QTY']}', --9
                    '${col['PO_QTY']}', --10
                    '0', --11
                    '0', --12
                    '0', --13
                    '0', --14
                    '0', --15
                    '${col['CURR_CD']}', --16
                    '${col['MASTER_PRICE']}', --17
                    '0', --18
                    '0', --19
                    '', --20
                    ${col['PO_PRICE']} --21
                )
        `;
        var objInStockMem2: any = prisma.$queryRaw(Prisma.raw(sqlInStockMem2));
        tSQLArray.push(objInStockMem2);

        var sqlUpPoMrp = `
            update ksv_po_mrp
            set
                pu_cd = '${tNewCd}',
                pu_seq = '1'
            where
                po_cd = '${argPoCd}'
                and (
                    po_seq <= '${argPoSeq}'
                    or po_seq > 100
                )
                and matl_cd = '${col['MATL_CD']}'
                and (
                    pu_cd is null
                    or pu_cd = ''
                )
        `;
        var objUpPoMrp: any = prisma.$queryRaw(Prisma.raw(sqlUpPoMrp));
        tSQLArray.push(objUpPoMrp);

        var sqlUpStockMem = `
            update ksv_stock_mem
            set
                pu_cd = '${tNewCd}'
            where
                po_cd = '${argPoCd}'
                and matl_cd = '${col['MATL_CD']}'
                and po_seq <= '${argPoSeq}'
        `;
        var objUpStockMem: any = prisma.$queryRaw(Prisma.raw(sqlUpStockMem));
        tSQLArray.push(objUpStockMem);

        tPayAmt += parseFloat(col['PO_QTY']) * parseFloat(col['MASTER_PRICE']);
        tSumPoQty += parseFloat(col['PO_QTY']);
    }

    var sqlPuMem1 = `
        select
            *
        from
            ksv_pu_mem2
        where
            pu_cd = '${tNewCd}'
            and po_cd = '${argPoCd}'
            and po_seq = '${tMaxPoSeq}'
            and vendor_cd = '${argVendorCd}'
    `;
    var objPuMem1s: any = prisma.$queryRaw(Prisma.raw(sqlPuMem1));
    if (objPuMem1s.length > 0) {
        var sqlUpPuMem = `
            update ksv_pu_mem2
            set
                po_qty = '${tSumPoQty}'
            where
                pu_cd = '${tNewCd}'
                and po_cd = '${argPoCd}'
                and po_seq = '${tMaxPoSeq}'
                and vendor_cd = '${argVendorCd}'
        `;
        var objUpPuMem: any = prisma.$queryRaw(Prisma.raw(sqlUpPuMem));
        tSQLArray.push(objInPuMem);
    } else {
        var sqlInPuMem = `
            insert into
                ksv_pu_mem2 (
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
                    '${tNewCd}',
                    1,
                    '${argPoCd}',
                    '${tMaxPoSeq}',
                    '${argVendorCd}',
                    '${tRetDate}',
                    '${tUserId}',
                    '${tSumPoQty}'
                )
        `;
        var objInPuMem: any = prisma.$queryRaw(Prisma.raw(sqlInPuMem));
        tSQLArray.push(objInPuMem);
    }

    var tBillTo = 'SHINTS';
    if (tObjVendor['VENDOR_NAME'].includes('FACTORY')) tBillTo = 'FACTORY';
    else if (tObjVendor['VENDOR_NAME'].includes('BUYER')) tBillTo = 'BUYER';

    var tShipTo = '';
    if (tObjPoInfo['FACTORY_CD'] === 'FC034') tShipTo = 'BVT';
    else if (tObjPoInfo['FACTORY_CD'] === 'FC044') tShipTo = 'ETP';
    else if (tObjPoInfo['FACTORY_CD'] === 'FC010') tShipTo = 'SHINTS';
    var tNormi = 'X';
    var tTradeTerm = 'FOB';
    var tForwarder = 'RDS';
    var tOriginPort = 'SHANGHAI';
    if (tObjVendor['VENDOR_TYPE'] === '1') tOriginPort = 'INCHEON';
    if (
        tObjVendor['VENDOR_TYPE'] === '5' &&
        tObjPoInfo['FACTORY_CD'] === 'FC034'
    )
        tOriginPort = 'HAIPHONG';
    if (
        tObjVendor['VENDOR_TYPE'] === '5' &&
        tObjPoInfo['FACTORY_CD'] === 'FC044'
    )
        tOriginPort = 'CAIRO';

    var sqlInPuMst2 = `
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
                '${argVendorCd}',
                '${tBuyerCd}',
                '${tObjPoInfo['FACTORY_CD']}',
                '${tUserId}',
                '${tRetDate}',
                '-',
                '${tObjVendor['VENDOR_MATL_TYPE']}',
                '${tBillTo}',
                '${tShipTo}',
                '${tCurrCd}',
                '0',
                '0',
                '${tNormi}',
                '${tTradeTerm}',
                '${tOrderDate}',
                '${tDueDate}',
                '${tForwarder}',
                '',
                '${argPoCd}',
                '${tTARGET_ETA}',
                '1',
                '',
                '${tExFactory}',
                '${tExFactory}',
                '${tTARGET_ETA}',
                '${tMRP_DATE}',
                '0',
                '0',
                '${tPayAmt}',
                '${tPayType}',
                '${tBankCd}',
                '${tOriginPort}',
                '${tDueDate}',
                '${tExFactory}'
            )
    `;
    var objInPuMst2: any = prisma.$queryRaw(Prisma.raw(sqlInPuMst2));
    tSQLArray.push(objInPuMst2);

    var sqlInMem2Log = `
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
            pu_cd = '${tNewCd}'
    `;
    var objInMem2Log: any = prisma.$queryRaw(Prisma.raw(sqlInMem2Log));
    tSQLArray.push(objInMem2Log);

    var sqlInPoWorkList = `
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
                '${argPoCd}',
                '0',
                '${tBuyerCd}',
                '${tFactoryCd}',
                '${tUserId}',
                '${tRetDate1}'
            )
    `;

    var sqlPoWorkList = `
        select
            *
        from
            ksv_po_worklist
        where
            po_cd = '${argPoCd}'
    `;
    var objPoWorkLists: Object[] = await prisma.$queryRaw(
        Prisma.raw(sqlPoWorkList),
    );
    if (objPoWorkLists.length <= 0) {
        var objInPoWorkList: any = prisma.$queryRaw(
            Prisma.raw(sqlInPoWorkList),
        );
        tSQLArray.push(objInPoWorkList);
    }

    var sqlInPoVendor = `
        update ksv_po_vendor
        set
            pu_cd = '${tNewCd}'
        where
            po_cd = '${argPoCd}'
            and vendor_cd = '${argVendorCd}'
    `;
    var objInPoVendor: any = prisma.$queryRaw(Prisma.raw(sqlInPoVendor));
    tSQLArray.push(objInPoVendor);

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

const process0 = async (argPoCd: string) => {
    var sqlPoMst = `
        select
            po_cd,
            po_status,
            plan_flag
        from
            ksv_po_mst
        where
            left(reg_datetime, 4) >= '2022'
            and po_seq = 1
            and po_cd = '${argPoCd}'
    `;
    var tObjPoMsts: Object[] = await prisma.$queryRaw(Prisma.raw(sqlPoMst));

    var tTotIdx = 0;
    var tIdx = 0;
    var tArray: Object[] = [];
    for (tIdx = 0; tIdx < tObjPoMsts.length; tIdx++) {
        var tOne: Object = { ...tObjPoMsts[tIdx] };

        var sqlPoVendor = `
            select
                po_cd,
                vendor_cd,
                isnull(pu_cd, '') as pu_cd
            from
                ksv_po_vendor
            where
                po_cd = '${tOne['po_cd']}'
        `;
        var tObjPoVendors: Object[] = await prisma.$queryRaw(
            Prisma.raw(sqlPoVendor),
        );

        var sqlStockMem = `
            select
                isnull(sum(po_qty), 0) as cnt
            from
                ksv_stock_mem
            where
                po_cd = '${tOne['po_cd']}'
        `;
        var tObjStockMems: Object[] = await prisma.$queryRaw(
            Prisma.raw(sqlStockMem),
        );

        if (tObjPoVendors.length > 0 && tObjStockMems[0]['cnt'] > 0) {
            console.log(
                `------------------------------------------------------------------------------------------------------------`,
            );
            console.log(
                `PO_CD/PO_STATUS/PLAN_FLAG/PO_VENDOR_CNT/MAIL_CNT/STOCK_MEM_CNT----------------------------------------------`,
            );
            console.log(
                `>>>>(1): ${tOne['po_cd']}|${tOne['po_status']}|${tOne['plan_flag']}|${tObjPoVendors.length}|{tObjStockMems[0]['cnt']}|`,
            );
            var tIdx1 = 0;

            for (tIdx1 = 0; tIdx1 < tObjPoVendors.length; tIdx1++) {
                var tOne2: Object = { ...tObjPoVendors[tIdx1] };
                console.log(`>>>>(2): ${tOne['po_cd']}|${tOne2['vendor_cd']}|`);

                var sqlMail = `
                    select
                        *
                    from
                        ksv_mail_log
                    where
                        po_cd = '${tOne['po_cd']}'
                        and vendor_cd = '${tOne2['vendor_cd']}'
                    order by
                        po_seq
                `;
                var tObjMails: Object[] = await prisma.$queryRaw(
                    Prisma.raw(sqlMail),
                );

                if (tObjMails.length <= 0) {
                    console.log(
                        `>>>>(3): ${tOne['po_cd']}|${tOne2['vendor_cd']}| not send mail `,
                    );
                    continue;
                }
                var tPoSeq: number = parseInt(
                    tObjMails[tObjMails.length - 1]['PO_SEQ'],
                );
                if (tPoSeq === 0) tPoSeq = 1;

                if (tOne2['pu_cd'] !== '') {
                    console.log(
                        `>>>>(3): ${tOne['po_cd']}|${tOne2['vendor_cd']}| Already Exist| ${tOne2['pu_cd']} `,
                    );
                    console.log(`>>>>>(4): Total Count: ${tTotIdx} `);
                    tTotIdx += 1;
                    continue;
                }

                var tRet99: string = await process1(
                    tOne['po_cd'],
                    tOne2['vendor_cd'],
                    tPoSeq,
                );
                // var tRet99 : string  = await process1(tOne['po_cd'], tOne2['vendor_cd']);
                if (tRet99.includes('FAIL')) return;

                tTotIdx += 1;
                console.log(`>>>>>(4): Total Count: ${tTotIdx} `);
            }
        } else {
            console.log(
                `------------------------------------------------------------------------------------------------------------`,
            );
            console.log(
                `PO_CD/PO_STATUS/PLAN_FLAG/PO_VENDOR_CNT/MAIL_CNT/STOCK_MEM_CNT----------------------------------------------`,
            );
            console.log(
                `>>>>(0): ${tOne['po_cd']}|${tOne['po_status']}|${tOne['plan_flag']}|${tObjPoVendors.length}|${tObjStockMems[0]['cnt']}|`,
            );
        }
    }
};

var tPoCd = process.argv[2];
process0(tPoCd);

// var tRet process1(tPoCd, tVendorCd);
