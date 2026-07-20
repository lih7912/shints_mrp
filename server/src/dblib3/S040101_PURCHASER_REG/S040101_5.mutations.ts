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
const moduleMutation_S040101_5 = {
    Mutation: {
        mgrInsert_S040101_5_pu_mst: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput = { ...args.datas1[0] }; // Pu List
            var tInput1 = { ...args.datas2[0] }; // Detail Matl List
            var tInput0 = { ...args.datas }; // Edit

            if (
                typeof tInput0.BILL_TO === 'undefined' ||
                typeof tInput0.NORMI === 'undefined'
            ) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE =
                    'ERROR:Purchase Reg:Input을 체크하세요(Normi, Bill_To)';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            if (!tInput.MATL_AMT) {
                tInput.MATL_AMT = '0';
            }

            if (typeof tInput1.DATAS === 'undefined') {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Purchase Reg:잘못된 데이타입니다';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tMatlArray = [];
            var tPoInfoArray = [];
            args.datas2.forEach((col, i) => {
                var tDatas = [...col.DATAS];
                var tOrgTot = 0;
                tDatas.forEach((col1, i1) => {
                    tOrgTot += parseFloat(col1.PO_QTY);
                });

                var tRemainPoQty = parseFloat(col.PO_QTY);
                var tRemainMoqQty = parseFloat(col.MOQ_QTY);

                tDatas.forEach((col1, i1) => {
                    var tObj2 = { ...col1 };
                    var tPercent = 0;
                    if (tOrgTot > 0) tPercent = tObj2.PO_QTY / tOrgTot;
                    var tTmpPoQty = parseFloat(col.PO_QTY) * tPercent;
                    tTmpPoQty = AFLib.numToFixed(tTmpPoQty, 0);
                    var tTmpMoqQty = parseFloat(col.MOQ_QTY) * tPercent;
                    tTmpMoqQty = AFLib.numToFixed(tTmpMoqQty, 0);
                    if (i1 === tDatas.length - 1) {
                        tTmpPoQty = tRemainPoQty;
                        tTmpMoqQty = tRemainMoqQty;
                        tObj2.PO_QTY = String(tTmpPoQty);
                        tObj2.MOQ_QTY = String(tTmpMoqQty);
                    } else {
                        tObj2.PO_QTY = String(tTmpPoQty);
                        tObj2.MOQ_QTY = String(tTmpMoqQty);
                    }
                    tObj2.SURCHARGE_AMT = col.SURCHARGE_AMT;
                    tObj2.SURCHARGE_PRICE = col.SURCHARGE_PRICE;
                    tObj2.SURCHARGE_REMARK = col.SURCHARGE_REMARK;
                    tObj2.PO_PRICE = col.PO_PRICE;
                    tRemainPoQty -= tTmpPoQty;
                    tRemainMoqQty -= tTmpMoqQty;
                    tDatas[i1] = { ...tObj2 };
                });

                tDatas.forEach((col1, i1) => {
                    var tObj2 = { ...col1 };
                    if (!tObj2.MASTER_PRICE) tObj2.MASTER_PRICE = '0';
                    if (!tObj2.PO_PRICE) tObj2.PO_PRICE = '0';
                    if (!tObj2.ORDER_CD) tObj2.ORDER_CD = '';
                    tMatlArray.push(tObj2);

                    var tCheck2 = 0;
                    tPoInfoArray.forEach((col2, i2) => {
                        if (col2 === tObj2.PO_CD) tCheck2 = 1;
                    });
                    if (tCheck2 === 0) tPoInfoArray.push(tObj2.PO_CD);
                });
            });
            // console.log(tMatlArray);

            if (typeof tInput0.PU_CD === 'undefined') tInput0.PU_CD = '';

            var tYY2 = tRetDate.substring(2, 4);

            var tPuPrefix = 'PU';
            if (tInput1.FACTORY_CD === 'FC044') tPuPrefix = 'EU';

            var tZero = '000000';
            var tNewCd = `${tPuPrefix}${tYY2}-`;
            tNewCd += tInput.BUYER_CD;
            var tPuSeqPrefix = tNewCd;
            var tPuSeq = 1;
            var sqlPuSeq = `
                select
                    isnull(max(pu_cd), '${tPuSeqPrefix}000000') as max_pu_cd
                from
                    ksv_pu_mst2
                where
                    pu_cd like '${tPuSeqPrefix}%'
            `;
            var retPuSeq = await prisma.$queryRaw(Prisma.raw(sqlPuSeq));
            if (retPuSeq.length > 0) {
                var tPuSeqStr = retPuSeq[0].max_pu_cd.substring(7, 13);
                tPuSeq = parseInt(tPuSeqStr) + 1;
            }
            console.log(`New Pu Seq: ${tPuSeq}`);

            var tPuSeqStr0 = String(tPuSeq);
            var tPuSeqStr =
                tZero.substring(0, 6 - tPuSeqStr0.length) + tPuSeqStr0;
            tNewCd += tPuSeqStr;

            var tNewStsInCd = `IS${tRetDate1.substring(2, 4)}-${tRetDate.substring(4, 14)}`;

            console.log('New Cd(New Pu Seq):' + tNewCd);

            var sql1 = `
                select
                    isnull(a.pay_type, '') as pay_type,
                    isnull(a.pay_type2, '') as pay_type2,
                    a.pay_term,
                    b.bank_cd,
                    a.vendor_type
                from
                    kcd_vendor a,
                    kcd_vendor_bank b
                where
                    a.vendor_cd = '${tInput.VENDOR_CD}'
                    and a.vendor_cd = b.vendor_cd
            `;
            var nRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
            var tPayType = '';
            var tPayType2 = '';
            var tPayBank = '';
            var tPayTerm = '';
            var tVendorType = '';
            if (nRet1.length > 0) {
                tPayType = nRet1[0].pay_type;
                tPayType2 = nRet1[0].pay_type2;
                tPayTerm = nRet1[0].pay_term;
                tPayBank = nRet1[0].bank_cd;
                tVendorType = nRet1[0].vendor_type;
            }

            console.log(`Vendor Type=> ${tVendorType}`);

            if (tInput0.PAY_CONDITION !== '') {
                tPayType2 = tInput0.PAY_CONDITION;
                var sql1 = `
                    select
                        *
                    from
                        kcd_code
                    where
                        cd_group = 'pay_type'
                        and cd_code = '${tInput0.PAY_CONDITION}'
                `;
                var nRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                if (nRet1.length > 0) tPayType = nRet1[0].CD_NAME;
                else tPayType = '';
            }

            var tSQLArray = [];

            var tTARGET_ETA = '';
            var tMRP_DATE = '';
            var tFACTORY_CD = '';
            var tETA = '';
            var tPoCd2 = '';
            var tIdx1 = 0;
            var tSavePoCd = '';
            var tPoCdArray = [];

            var tLC_AMT = 0;
            var tLC_QTY = 0;
            var tLC_QTY1 = 0;

            if (tInput0.PU_CD !== '') tNewCd = tInput0.PU_CD;

            var tPoArray = [];
            var tIdx0 = 0;
            for (tIdx0 = 0; tIdx0 < args.datas1.length; tIdx0++) {
                var col = { ...args.datas1[tIdx0] };

                if (tIdx0 === 0) tPoCd2 = col.PO_CD;
                else tPoCd2 += `/${col.PO_CD}`;

                tPoArray.push(col.PO_CD);

                var sql2 = `
                    select
                        max(po_seq) as max_po_seq
                    from
                        ksv_po_mst
                    where
                        po_cd = '${col.PO_CD}'
                `;
                var nRet2 = await prisma.$queryRaw(Prisma.raw(sql2));
                var tPoSeq = 1;
                if (nRet2.length > 0) tPoSeq = nRet2[0].max_po_seq;

                // PO_CD,VENDOR_CD,END_DATE,CHECK_DATE,PU_CD,id
                var sql3 = `
                    select
                        *
                    from
                        ksv_po_vendor
                    where
                        po_cd = '${col.PO_CD}'
                        and vendor_cd = '${col.VENDOR_CD}'
                `;
                var nRet3 = await prisma.$queryRaw(Prisma.raw(sql3));
                if (nRet3.length > 0) {
                    let tSQL99 = `
                        update ksv_po_vendor
                        set
                            pu_cd = '${tNewCd}'
                        where
                            po_cd = '${col.PO_CD}'
                            and vendor_cd = '${col.VENDOR_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                } else {
                    let tSQL99 = `
                        insert into
                            ksv_po_vendor (po_cd, vendor_cd, end_date, check_date, pu_cd)
                        values
                            ('${col.PO_CD}', '${col.VENDOR_CD}', '', '', '${tNewCd}')
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }
            }

            // m_eta 을 구함. 
            var w_m_eta = '';   
            for (tIdx0 = 0; tIdx0 < tPoArray.length; tIdx0++) {
                var tPoCd0 = tPoArray[tIdx0];
                var sql8_2 = `
                    select kk.m_eta
                     from
                     (
                     select isnull(min(a.m_eta), '') as m_eta
                     from ksv_capabook_mem a
                     where a.order_cd in (
                     select order_cd
                     from ksv_po_mem
                     where po_cd = '${tPoCd0}'
                     and   po_seq = 1
                     )
                     and  a.book_date  = (select max(book_date) from ksv_capabook_mem where order_cd = a.order_cd)
                     union
                     select isnull(min(a.m_eta), '') as m_eta
                     from ksv_capasample_mem a
                     where a.order_cd in (
                     select order_cd
                     from ksv_po_mem
                     where po_cd = '${tPoCd0}'
                     and   po_seq = 1
                     )
                     and  a.book_date  = (select max(book_date) from ksv_capasample_mem where order_cd = a.order_cd)
                     union
                     select isnull(min(a.m_eta), '') as m_eta
                     from ksv_capabook_mem_ethiopia a
                     where a.order_cd in (
                     select order_cd
                     from ksv_po_mem
                     where po_cd = '${tPoCd0}'
                     and   po_seq = 1
                     )
                     and  a.book_date  = (select max(book_date) from ksv_capabook_mem_ethiopia where order_cd = a.order_cd)
                     union
                     select isnull(min(a.m_eta), '') as m_eta
                     from ksv_capasample_mem_ethiopia a
                     where a.order_cd in (
                     select order_cd
                     from ksv_po_mem
                     where po_cd = '${tPoCd0}'
                     and   po_seq = 1
                     )
                     and  a.book_date  = (select max(book_date) from ksv_capasample_mem_ethiopia where order_cd = a.order_cd)
                     ) kk
                     where kk.m_eta <> ''
                     order by kk.m_eta
                `;
                var nRet8_2 = await prisma.$queryRaw(Prisma.raw(sql8_2));
                if (nRet8_2.length > 0)  w_m_eta = nRet8_2[0].m_eta;
            }

            var sql8_2 = `
                select
                    isnull(max(a.mrp_seq), 0) as max_mrp_seq
                from
                    ksv_po_mrp a
                where
                    a.po_cd = '${col.PO_CD}'
            `;
            var nRet8_2 = await prisma.$queryRaw(Prisma.raw(sql8_2));
            var tNewMrpSeq = 0;
            if (nRet8_2.length > 0) tNewMrpSeq = nRet8_2[0].max_mrp_seq;

            //

            // matl list Update
            for (tIdx0 = 0; tIdx0 < tMatlArray.length; tIdx0++) {
                var col = { ...tMatlArray[tIdx0] };
                tInput0.CURR_CD = col.CURR_CD;

                // console.log(col);
                var sql1 = `
                    select
                        c.FACTORY_CD,
                        left(b.REG_DATETIME, 8) as MRP_DATE,
                        max(c.MATL_DUE_DATE) as TARGET_ETA
                    from
                        KSV_PO_MST a,
                        KSV_STOCK_MST b,
                        KSV_ORDER_MST c,
                        KSV_PO_MEM d
                    where
                        a.PO_CD = '${col.PO_CD}'
                        and a.PO_SEQ = 1
                        and a.PO_CD = b.PO_CD
                        and b.PO_SEQ = 1
                        and a.PO_CD = d.PO_CD
                        and d.PO_SEQ = 1
                        and d.order_cd = c.order_cd
                    group by
                        c.FACTORY_CD,
                        left(b.REG_DATETIME, 8)
                `;
                var nRet1 = await prisma.$queryRaw(Prisma.raw(sql1));

                // tMRP_DATE = nRet1[0].MRP_DATE;
                if (nRet1.length > 0) {
                    tMRP_DATE = tInput.MRP_DATE;
                    tTARGET_ETA = nRet1[0].TARGET_ETA;
                    tFACTORY_CD = nRet1[0].FACTORY_CD;
                    if (tTARGET_ETA === null) tTARGET_ETA = tMRP_DATE;
                } else {
                    var sql10 = `
                        select
                            c.FACTORY_CD,
                            max(c.MATL_DUE_DATE) as TARGET_ETA
                        from
                            KSV_PO_MST a,
                            KSV_ORDER_MST c,
                            KSV_PO_MEM d
                        where
                            a.PO_CD = '${col.PO_CD}'
                            and a.PO_SEQ = 1
                            and a.PO_CD = d.PO_CD
                            and d.PO_SEQ = 1
                            and d.order_cd = c.order_cd
                        group by
                            c.FACTORY_CD
                    `;
                    var nRet10 = await prisma.$queryRaw(Prisma.raw(sql10));
                    if (nRet10.length > 0) {
                        tMRP_DATE = tInput.MRP_DATE;
                        tTARGET_ETA = nRet10[0].TARGET_ETA;
                        tFACTORY_CD = nRet10[0].FACTORY_CD;
                    }
                }

                if (!col.PU_CD);
                else col.PU_CD = '';

                if (col.PU_CD !== '') {
                    var tUpdatePoQty =
                        parseFloat(col.PO_QTY) + parseFloat(col.DIFF_QTY);

                    let tSQL99 = `
                        update ksv_stock_mem2
                        set
                            po_seq = '${col.PO_SEQ}',
                            moq = '${col.MOQ_QTY}',
                            po_qty = '${col.MRP_QTY}',
                            stock_qty = '${col.STOCK_QTY}',
                            po_qty2 = '${tUpdatePoQty}',
                            -- po_qty2 = '${col.PO_QTY}',
                            -- lc_qty = '${tLC_QTY}',
                            curr_cd = '${col.CURR_CD}',
                            master_price = '${col.MASTER_PRICE}',
                            surcharge_price = '${col.SURCHARGE_PRICE}',
                            surcharge_amt = '${col.SURCHARGE_AMT}',
                            surcharge_remark = '${col.SURCHARGE_REMARK}',
                            po_price = '${col.PO_PRICE}'
                        where
                            po_cd = '${col.PO_CD}'
                            -- and  order_cd='${col.ORDER_CD}' 
                            and vendor_cd = '${tInput.VENDOR_CD}'
                            and matl_cd = '${col.MATL_CD}'
                            and pu_cd = '${col.PU_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                    tNewCd = col.PU_CD;
                } else {
                    // Check Stock Mem2 Duplicate Insert.  Won 260320
                    var sqlChk = `
                        select
                            *
                        from
                            ksv_stock_mem2
                        where
                            po_cd = ''
                            and vendor_cd = ''
                    `;
                    var retChk = await prisma.$queryRaw(Prisma.raw(sqlChk));
                    if (retChk.length > 0) {
                        var tRetArray = [];
                        var tObj = {};
                        tObj.CODE = `ERROR:Purchase Reg:Duplicat PO_CD/VENDOR_CD`;
                        tObj.id = 0;
                        tRetArray.push(tObj);
                        return tRetArray;
                    }

                    var tUpdateStsInCd = '';
                    var tUpdateOrderDate = '';
                    if (
                        tVendorType === '4' ||
                        tInput0.BILL_TO === 'BUYER' ||
                        tInput0.VENDOR_CD === 'V0882' ||
                        tInput0.VENDOR_CD === 'V0381' ||
                        tInput0.VENDOR_CD === 'V0523'
                    ) {
                        tUpdateStsInCd = tNewStsInCd;
                        tUpdateOrderDate = tRetDate1;
                    }
                    let tSQL99 = `
                        insert into
                            ksv_stock_mem2 (
                                pu_cd,
                                po_cd,
                                po_seq,
                                order_cd,
                                vendor_cd,
                                matl_cd,
                                moq,
                                po_qty,
                                stock_qty,
                                po_qty2,
                                lc_qty,
                                in_qty,
                                out_qty,
                                infac_qty,
                                outfac_qty,
                                curr_cd,
                                master_price,
                                surcharge_price,
                                surcharge_amt,
                                surcharge_remark,
                                po_price,
                                stsin_cd,
                                stsin_array,
                                total_mrp,
                                bef_total_mrp,
                                bef_stock_qty
                            )
                        values
                            (
                                '${tNewCd}',
                                '${col.PO_CD}',
                                '${col.PO_SEQ}',
                                '${col.ORDER_CD}',
                                '${tInput.VENDOR_CD}',
                                '${col.MATL_CD}',
                                '${col.MOQ_QTY}',
                                '${col.MRP_QTY}',
                                '${col.STOCK_QTY}',
                                '${col.PO_QTY}',
                                '0',
                                '0',
                                '0',
                                '0',
                                '0',
                                '${col.CURR_CD}',
                                '${col.MASTER_PRICE}',
                                '${col.SURCHARGE_PRICE}',
                                '${col.SURCHARGE_AMT}',
                                '${col.SURCHARGE_REMARK}',
                                '${col.PO_PRICE}',
                                '${tUpdateStsInCd}',
                                '',
                                '${col.MRP_QTY}',
                                '0',
                                '0'
                            )
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    if (
                        tVendorType === '4' ||
                        tInput0.BILL_TO === 'BUYER' ||
                        tInput0.VENDOR_CD === 'V0882' ||
                        tInput0.VENDOR_CD === 'V0381' ||
                        tInput0.VENDOR_CD === 'V0523'
                    ) {
                        var tTableObj = {};
                        tTableObj.PO_CD = col.PO_CD;
                        tTableObj.PO_SEQ = col.PO_SEQ;
                        tTableObj.MATL_CD = col.MATL_CD;
                        tTableObj.MATL_SEQ = 1;
                        tTableObj.VENDOR_CD = tInput.VENDOR_CD;
                        tTableObj.PU_CD = tNewCd;
                        tTableObj.STSIN_CD = tNewStsInCd;
                        tTableObj.STSIN_TYPE = 'FULL_IN';
                        tTableObj.MASTER_PRICE = col.MASTER_PRICE;
                        tTableObj.CURR_CD = col.CURR_CD;
                        tTableObj.PO_PRICE = col.PO_PRICE;
                        tTableObj.SURCHARGE_AMT = '0';
                        tTableObj.SURCHARGE_PRICE = '0';
                        tTableObj.SURCHARGE_REMARK = '';
                        tTableObj.STOCK_QTY = col.STOCK_QTY;
                        tTableObj.MOQ_QTY = col.MOQ_QTY;
                        tTableObj.OVERSHORT_QTY = '0';
                        tTableObj.PO_QTY = col.PO_QTY;
                        tTableObj.PARTIN_QTY = '0';
                        tTableObj.STSIN_QTY = col.PO_QTY;
                        tTableObj.FOC_QTY = '0';
                        tTableObj.SHIP_QTY = col.PO_QTY;
                        tTableObj.MOQ_STOCK_IDX = '';
                        tTableObj.LEFTOVER_STOCK_IDX = '';
                        tTableObj.FOC_STOCK_IDX = '';
                        tTableObj.OUT_QTY = '0';
                        tTableObj.BILL_FLAG = '1';
                        tTableObj.SAVE_PO_QTY = col.PO_QTY;
                        tTableObj.SAVE_MOQ_QTY = col.MOQ_QTY;
                        tTableObj.SAVE_OVERSHORT_QTY = '0';
                        tTableObj.SAVE_FOC_QTY = '0';
                        tTableObj.SAVE_SURCHARGE_AMT = '0';
                        tTableObj.SAVE_SURCHARGE_PRICE = '0';
                        tTableObj.SAVE_PO_PRICE = col.PO_PRICE;
                        let tSQL99 = AFLib.createTableSql(
                            'KSV_STOCK_MEM2_STSIN',
                            tTableObj,
                        );
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);
                    }
                }

                if (parseFloat(col.MOQ_QTY) > 0) {
                    // MOQ 처리
                    var tSTOCK_STATUS = 'N';
                    var tSTOCK_STATUS_2 = 'S2';
                    var tOWNER_SHIP = 'SHINTS';
                    var tAUTHORITY = 'PIC';
                    var tREASON_MAKE = 'MOQ';
                    var tCONDITION = 'NOT_FIXED';
                    var tMoqOrder = `${tInput.BUYER_CD}Minimum`;
                    var tOrderCd = tMoqOrder;
                    var chkPo_moq = '';

                    var tPoSeq = '99';
                    var tSQL = `
                        select
                            count(*) as t_cnt
                        from
                            ksv_po_mst
                        where
                            po_cd = '${col.PO_CD}'
                            and po_seq = '${tPoSeq}'
                    `;
                    var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
                    if (nRet0.length > 0 && nRet0[0].t_cnt > 0) chkPo_moq = '1';

                    let tSQL98_1 = `
                        update ksv_stock_idx
                        set
                            idx = idx + 1
                    `;
                    let nSQL98_1 = await prisma.$queryRaw(Prisma.raw(tSQL98_1));

                    let tSQL98_2 = `
                        select
                            fac,
                            idx
                        from
                            ksv_stock_idx
                    `;
                    let nRet98_2 = await prisma.$queryRaw(Prisma.raw(tSQL98_2));

                    var tStockIdx = nRet98_2[0].idx;
                    var t_Zero = '0000000000';
                    var m_StockIdx =
                        'S' +
                        t_Zero.substring(0, 9 - String(tStockIdx).length) +
                        String(tStockIdx);
                    var m_OutFactoryCd = '';

                    var t_MOQ_STOCK_IDX = m_StockIdx;

                    var tCheckSql = `
                        select
                            stock_idx,
                            stock_qty
                        from
                            ksv_stock_matl
                        where
                            po_cd = '${col.PO_CD}'
                            and po_seq = 99
                            and matl_cd = '${col.MATL_CD}'
                            and order_cd = '${tMoqOrder}'
                    `;
                    var nCheckSql = await prisma.$queryRaw(
                        Prisma.raw(tCheckSql),
                    );
                    if (nCheckSql.length > 0) {
                        let tSQL99 = `
                            update ksv_stock_matl
                            set
                                stock_qty = '${col.MOQ_QTY}',
                                remain_qty = '${col.MOQ_QTY}'
                            where
                                po_cd = '${col.PO_CD}'
                                and po_seq = 99
                                and matl_cd = '${col.MATL_CD}'
                                and order_cd = '${tMoqOrder}'
                                and stock_idx = '${nCheckSql[0].stock_idx}'
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);

                        let tSQL99 = `
                            update ksv_po_mrp
                            set
                                use_qty = '${col.MOQ_QTY}',
                                po_qty = '${col.MOQ_QTY}'
                            where
                                po_cd = '${col.PO_CD}'
                                and po_seq = 99
                                and matl_cd = '${col.MATL_CD}'
                                and order_cd = '${tMoqOrder}'
                                and stock_idx = '${nCheckSql[0].stock_idx}'
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);

                        let tSQL99 = `
                            update ksv_stock_mem
                            set
                                po_qty = '${col.MOQ_QTY}'
                            where
                                po_cd = '${col.PO_CD}'
                                and po_seq = 99
                                and matl_cd = '${col.MATL_CD}'
                                and order_cd = '${tMoqOrder}'
                                and moq_stock_idx = '${nCheckSql[0].stock_idx}'
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);
                    }

                    if (col.PO_CD) {
                        if (col.PO_CD.length > 1) {
                            if (col.PO_CD.substring(0, 1) === 'P')
                                m_OutFactoryCd = 'FC034';
                            if (col.PO_CD.substring(0, 1) === 'E')
                                m_OutFactoryCd = 'FC044';
                            else m_OutFactoryCd = 'FC034';
                        }
                    }

                    let tSQL99 = `
                        insert into
                            ksv_stock_matl (
                                stock_idx,
                                po_cd,
                                po_seq,
                                order_cd,
                                matl_cd,
                                mrp_seq,
                                matl_seq,
                                stock_qty,
                                remain_qty,
                                use_qty,
                                factory_cd,
                                stock_status,
                                stock_date,
                                remark,
                                remark0,
                                reason_remark,
                                status_cd,
                                reg_user,
                                reg_datetime,
                                root_idx,
                                stock_status_2,
                                owner_ship,
                                authority,
                                reason_make,
                                condition,
                                manager,
                                purpose
                            )
                        values
                            (
                                '${m_StockIdx}',
                                '${col.PO_CD}',
                                '${tPoSeq}',
                                '${tMoqOrder}',
                                '${col.MATL_CD}',
                                '${tNewMrpSeq}',
                                '1',
                                ${col.MOQ_QTY},
                                ${col.MOQ_QTY},
                                '0',
                                '${m_OutFactoryCd}',
                                'O',
                                '${tRetDate1}',
                                '03.MOQ',
                                '03.MOQ',
                                '03',
                                '0',
                                '${tUserInfo.USER_ID}',
                                '${tRetDate}',
                                '${m_StockIdx}',
                                '${tSTOCK_STATUS_2}',
                                '${tOWNER_SHIP}',
                                '${tAUTHORITY}',
                                '${tREASON_MAKE}',
                                '${tCONDITION}',
                                '',
                                ''
                            )
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    if (nCheckSql.length <= 0) tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
                        insert into
                            ksv_po_mrp (
                                po_cd,
                                po_seq,
                                order_cd,
                                matl_cd,
                                mrp_seq,
                                matl_seq,
                                matl_price,
                                use_size,
                                use_qty,
                                po_qty,
                                bef_po_qty,
                                diff_qty,
                                diff_po_type,
                                change_reason,
                                use_po_type,
                                curr_cd,
                                tot_amt,
                                curr_date,
                                usd_amt,
                                status_cd,
                                reg_user,
                                reg_datetime,
                                stock_idx,
                                pu_cd
                            )
                        values
                            (
                                '${col.PO_CD}',
                                '${tPoSeq}',
                                '${tMoqOrder}',
                                '${col.MATL_CD}',
                                '${tNewMrpSeq}',
                                '1',
                                '${col.MASTER_PRICE}',
                                '',
                                '${col.MOQ_QTY}',
                                '${col.MOQ_QTY}',
                                '0',
                                '0',
                                '0',
                                '',
                                '1',
                                '${col.CURR_CD}',
                                '0',
                                '',
                                '0',
                                '0',
                                '${tUserInfo.USER_ID}',
                                '${tRetDate}',
                                '${m_StockIdx}',
                                '${tNewCd}'
                            )
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    if (nCheckSql.length <= 0) tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
                        INSERT INTO
                            KSV_STOCK_MEM (
                                PO_CD,
                                PO_SEQ,
                                ORDER_CD,
                                MATL_CD,
                                MRP_SEQ,
                                MATL_SEQ,
                                PO_QTY,
                                IN_QTY,
                                OUT_QTY,
                                INFAC_QTY,
                                OUTFAC_QTY,
                                REMAIN_QTY,
                                use_qty,
                                FACTORY_CD,
                                DIFF_PO_TYPE,
                                diff_qty,
                                STOCK_STATUS,
                                STATUS_CD,
                                REG_USER,
                                REG_DATETIME,
                                min_order,
                                pu_cd,
                                stsin_cd,
                                MOQ_STOCK_IDX,
                                FOC_STOCK_IDX,
                                LEFTOVER_STOCK_IDX
                            )
                        VALUES
                            (
                                '${col.PO_CD}',
                                '${tPoSeq}',
                                '${tMoqOrder}',
                                '${col.MATL_CD}',
                                '${tNewMrpSeq}',
                                '1',
                                '${col.MOQ_QTY}',
                                '0',
                                '0',
                                '0',
                                '0',
                                '0',
                                '0',
                                '${m_OutFactoryCd}',
                                '0',
                                '0',
                                '0',
                                '0',
                                '${tUserInfo.USER_ID}',
                                '${tRetDate}',
                                '${tOrderCd}',
                                '${tNewCd}',
                                '${tNewStsInCd}',
                                '${m_StockIdx}',
                                '',
                                ''
                            )
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    if (nCheckSql.length <= 0) tSQLArray.push(tSQL99_1);

                    let sql998 = `
                        select
                            *
                        from
                            ksv_po_mst
                        where
                            po_cd = '${col.PO_CD}'
                            and po_seq = '${tPoSeq}'
                    `;
                    const tRet998 = await prisma.$queryRaw(Prisma.raw(sql998));
                    if (tRet998.length <= 0) {
                        let sql999 = `
                            select
                                *
                            from
                                ksv_po_mst
                            where
                                po_cd = '${col.PO_CD}'
                                and po_seq = 1
                        `;
                        const tRet999 = await prisma.$queryRaw(
                            Prisma.raw(sql999),
                        );

                        var tInObj999 = {};
                        if (tRet999.length > 0) tInObj999 = { ...tRet999[0] };
                        delete tInObj999.id;
                        delete tInObj999.__typename;
                        tInObj999.PO_SEQ = tPoSeq;
                        tInObj999.PO_DATE = tRetDate1;
                        tInObj999.CURR_DATE = tRetDate1;
                        tInObj999.REG_USER = tUserInfo.USER_ID;
                        tInObj999.REG_DATETIME = tRetDate;
                        let tSQL99 = AFLib.createTableSql(
                            'KSV_PO_MST',
                            tInObj999,
                        );
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);
                    }
                    chkPo_moq = '1';

                    var sql1 = `
                        select
                            *
                        from
                            ksv_cost_mst
                        where
                            buyer_cd = '${tInput.BUYER_CD}'
                            and pu_cd = '${tNewCd}'
                            and po_cd = '${col.PO_CD}'
                            and matl_cd = '${col.MATL_CD}'
                            and
                        type = 'PURCHASE'
                        and type2 = 'MOQ'
                        and vendor_cd = '${tInput.VENDOR_CD}'
                    `;
                    var nRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                    if (
                        nRet1.length > 0 &&
                        parseFloat(nRet1[0].COST_AMT) > parseFloat(col.MOQ_QTY)
                    ) {
                    } else {
                        let tSQL99 = `
                            delete from ksv_cost_mst
                            where
                                buyer_cd = '${tInput.BUYER_CD}'
                                and pu_cd = '${tNewCd}'
                                and po_cd = '${col.PO_CD}'
                                and matl_cd = '${col.MATL_CD}'
                                and
                            type = 'PURCHASE'
                            and type2 = 'MOQ'
                            and vendor_cd = '${tInput.VENDOR_CD}'
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);

                        let tSQL99 = `
                            insert into
                                ksv_cost_mst (
                                    buyer_cd,
                                    cost_date,
                                    pu_cd,
                                    po_cd,
                                    matl_cd,
                                    shipment_cd,
                                    invoice_no,
                                    type,
                                    type2,
                                    cost_curr,
                                    cost_amt,
                                    reg_user,
                                    confirm_user,
                                    confirm_date,
                                    vendor_cd,
                                    cost_value,
                                    stsin_cd
                                )
                            values
                                (
                                    '${tInput.BUYER_CD}',
                                    '${tRetDate1}',
                                    '${tNewCd}',
                                    '${col.PO_CD}',
                                    '${col.MATL_CD}',
                                    '',
                                    '',
                                    'PURCHASE',
                                    'MOQ',
                                    '${col.CURR_CD}',
                                    '${col.MOQ_QTY}',
                                    '${tUserInfo.USER_ID}',
                                    '',
                                    '',
                                    '${tInput.VENDOR_CD}',
                                    '${col.MOQ_QTY}',
                                    ''
                                )
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);
                    }
                }
                if (parseFloat(col.SURCHARGE_AMT) > 0) {
                    var sql1 = `
                        select
                            *
                        from
                            ksv_cost_mst
                        where
                            buyer_cd = '${tInput.BUYER_CD}'
                            and pu_cd = '${tNewCd}'
                            and po_cd = '${col.PO_CD}'
                            and matl_cd = '${col.MATL_CD}'
                            and
                        type = 'PURCHASE'
                        and type2 = 'Surcharge'
                        and vendor_cd = '${tInput.VENDOR_CD}'
                    `;
                    var nRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                    if (
                        nRet1.length > 0 &&
                        parseFloat(nRet1[0].COST_AMT) >
                            parseFloat(col.SURCHARGE_AMT)
                    ) {
                    } else {
                        let tSQL99 = `
                            delete from ksv_cost_mst
                            where
                                buyer_cd = '${tInput.BUYER_CD}'
                                and pu_cd = '${tNewCd}'
                                and po_cd = '${col.PO_CD}'
                                and matl_cd = '${col.MATL_CD}'
                                and
                            type = 'PURCHASE'
                            and type2 = 'Surcharge'
                            and vendor_cd = '${tInput.VENDOR_CD}'
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);

                        let tSQL99 = `
                            insert into
                                ksv_cost_mst (
                                    buyer_cd,
                                    cost_date,
                                    pu_cd,
                                    po_cd,
                                    matl_cd,
                                    shipment_cd,
                                    invoice_no,
                                    type,
                                    type2,
                                    cost_curr,
                                    cost_amt,
                                    reg_user,
                                    confirm_user,
                                    confirm_date,
                                    vendor_cd,
                                    cost_value,
                                    stsin_cd
                                )
                            values
                                (
                                    '${tInput.BUYER_CD}',
                                    '${tRetDate1}',
                                    '${tNewCd}',
                                    '${col.PO_CD}',
                                    '${col.MATL_CD}',
                                    '',
                                    '',
                                    'PURCHASE',
                                    'Surcharge',
                                    '${col.CURR_CD}',
                                    '${col.SURCHARGE_AMT}',
                                    '${tUserInfo.USER_ID}',
                                    '',
                                    '',
                                    '${tInput.VENDOR_CD}',
                                    '${col.SURCHARGE_AMT}',
                                    ''
                                )
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);
                    }
                }
            }

            var tETA = tMRP_DATE;
            var tPuStatus = '-';

            // 입력된 Target ETA로 저장
            if (tInput0.TARGET_ETA) tTARGET_ETA = tInput0.TARGET_ETA;

            if (tInput0.PU_CD === '') {
                var tMemo = tPayType;
                let tSQL99 = `
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
                            EX_FACTORY,
                            PAY_CONDITION,
                            MEMO,
                            M_ETA
                        )
                    values
                        (
                            '${tNewCd}',
                            '${tInput.VENDOR_CD}',
                            '${tInput.BUYER_CD}',
                            '${tFACTORY_CD}',
                            '${tUserInfo.USER_ID}',
                            '${tRetDate}',
                            '${tPuStatus}',
                            '${tInput.VENDOR_MATL_TYPE}',
                            '${tInput0.BILL_TO}',
                            '${tInput0.SHIP_TO}',
                            '${tInput0.CURR_CD}',
                            '0',
                            '0',
                            '${tInput0.NORMI}',
                            '${tInput0.TRADE_TERM}',
                            '${tUpdateOrderDate}',
                            '${tInput0.DUE_DATE}',
                            '${tInput0.FORWARDER}',
                            '',
                            '${tPoCd2}',
                            '${tTARGET_ETA}',
                            '1',
                            '${tInput0.PI_NO}',
                            '${tInput0.EX_FACTORY}',
                            '${tInput0.PAY_DATE}',
                            '${tTARGET_ETA}',
                            '${tMRP_DATE}',
                            '0',
                            '0',
                            '${tInput.MATL_AMT}',
                            '${tPayType}',
                            '${tPayBank}',
                            '${tInput0.ORIGIN_PORT}',
                            '${tInput0.DUE_DATE}',
                            '${tInput0.EX_FACTORY}',
                            '${tPayType2}',
                            '${tMemo}',
                            '${w_m_eta}'
                        )
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                var tPlanFlag = '0';
                if (tTARGET_ETA !== '' && tInput0.DUE_DATE !== '')
                    tPlanFlag = '1';
                var tIdx3 = 0;
                for (tIdx3 = 0; tIdx3 < tPoArray.length; tIdx3++) {
                    var tPoCd0 = tPoArray[tIdx3];
                    let tSQL99 = `
                        update ksv_po_mst
                        set
                            plan_flag = '${tPlanFlag}',
                            plan_etd = '${tInput0.DUE_DATE}',
                            plan_eta = '${tTARGET_ETA}'
                        where
                            po_cd = '${tPoCd0}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }
            } else {
                let tSQL99 = `
                    update ksv_pu_mst2
                    set
                        BILL_TO = '${tInput0.BILL_TO}',
                        SHIP_TO = '${tInput0.SHIP_TO}',
                        CURR_CD = '${tInput0.CURR_CD}',
                        -- DEPOSIT_AMT = '${tInput.DEPOSIT_AMT}',
                        NORMI = '${tInput0.NORMI}',
                        TRADE_TERM = '${tInput0.TRADE_TERM}',
                        ORDER_DATE = '${tInput0.ORDER_DATE}',
                        -- DELIVERY_DATE = '${tInput.DELIVERY_DATE}',
                        FORWARD = '${tInput0.FORWARDER}',
                        PO_CD2 = '${tPoCd2}',
                        TARGET_ETA = '${tTARGET_ETA}',
                        PI_NO = '${tInput0.PI_NO}',
                        EXP_DELIVERY_DATE = '${tInput0.EX_FACTORY}',
                        PAY_DATE = '${tInput0.PAY_DATE}',
                        -- LC_FLAG = '${tInput.LC_FLAG}',
                        -- LC_AMT = '${tLC_AMT}',
                        -- PU_AMT = '${tInput.PAY_AMT}',
                        -- PAY_CONDITION = '${tInput0.PAY_CONDITION}'
                        ORIGIN_PORT = '${tInput0.ORIGIN_PORT}',
                        DUE_DATE = '${tInput0.DUE_DATE}',
                        EX_FACTORY = '${tInput0.EX_FACTORY}',
                        M_ETA = '${w_m_eta}'
                    where
                        PU_CD = '${tInput0.PU_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                // tSQLArray.push(tSQL99_1);
                tNewCd = tInput0.PU_CD;

                var tPlanFlag = '0';
                if (tTARGET_ETA !== '' && tInput0.DUE_DATE !== '')
                    tPlanFlag = '1';
                var tIdx3 = 0;
                for (tIdx3 = 0; tIdx3 < tPoArray.length; tIdx3++) {
                    var tPoCd0 = tPoArray[tIdx3];
                    let tSQL99 = `
                        update ksv_po_mst
                        set
                            plan_flag = '${tPlanFlag}',
                            plan_etd = '${tInput0.DUE_DATE}',
                            plan_eta = '${tTARGET_ETA}'
                        where
                            po_cd = '${tPoCd0}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }
            }

            var tIdx1 = 0;
            for (tIdx1 = 0; tIdx1 < tMatlArray.length; tIdx1++) {
                var col = { ...tMatlArray[tIdx1] };

                if (parseFloat(col.PO_PRICE) <= 0) col.PO_PRICE = 0.00001;

                var tSQL0 = '';
                var tUpdatePuCd = '';
                if (tInput0.PU_CD === '') {
                    tUpdatePuCd = tNewCd;
                    tSQL0 = ` and  (pu_cd  is null or pu_cd = '')`;
                } else {
                    tUpdatePuCd = tInput0.PU_CD;
                    tSQL0 = ` and  pu_cd = '${tInput0.PU_CD}' `;
                }

                let tSQL99 = `
                    update ksv_po_mrp
                    set
                        pu_cd = '${tUpdatePuCd}',
                        pu_seq = '${tPuSeq}'
                    where
                        po_cd = '${col.PO_CD}'
                        and matl_cd = '${col.MATL_CD}'
                        and (
                            pu_cd is null
                            or pu_cd = ''
                        )
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    update ksv_stock_mem
                    set
                        pu_cd = '${tUpdatePuCd}'
                    where
                        po_cd = '${col.PO_CD}'
                        and matl_cd = '${col.MATL_CD}'
                        -- and   (pu_cd is null or  pu_cd = '')
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                var tSumPoQty = 0;
                var tSumInAmt = 0;
                if (
                    tVendorType === '4' ||
                    tInput0.BILL_TO === 'BUYER' ||
                    tInput0.VENDOR_CD === 'V0882' ||
                    tInput0.VENDOR_CD === 'V0381' ||
                    tInput0.VENDOR_CD === 'V0523'
                ) {
                    var sql1 = `
                        select
                            *
                        from
                            ksv_stock_mem
                        where
                            po_cd = '${col.PO_CD}'
                            and matl_cd = '${col.MATL_CD}'
                            and po_qty > 0
                    `;
                    var nRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                    var tIdx2 = 0;
                    var tIdx2 = 0;
                    for (tIdx2 = 0; tIdx2 < nRet1.length; tIdx2++) {
                        var col0 = { ...nRet1[tIdx2] };

                        let tSQL99 = `
                            update ksv_stock_mem
                            set
                                in_qty = po_qty,
                                stock_status = '1'
                            where
                                po_cd = '${col.PO_CD}'
                                and matl_cd = '${col.MATL_CD}'
                                and po_qty > 0
                                and in_qty <> po_qty
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);

                        var tUsdAmt =
                            parseFloat(col0.PO_QTY) * parseFloat(col.PO_PRICE);
                        var tUsdRate = 0;
                        if (col.CURR_CD !== 'USD') {
                            let tCurrency = `
                                select
                                    *
                                from
                                    kcd_currency
                                where
                                    curr_cd = '${col.CURR_CD}'
                                    and start_date = '${tRetDate.substring(0, 8)}'
                            `;
                            let retCurrency = await prisma.$queryRaw(
                                Prisma.raw(tCurrency),
                            );
                            if (retCurrency.length > 0) {
                                tUsdRate = parseFloat(retCurrency[0].USD_RATE);
                            } else {
                                let tCurrency1 = `
                                    select
                                        *
                                    from
                                        kcd_currency
                                    where
                                        curr_cd = '${col.CURR_CD}'
                                        and start_date = (
                                            select
                                                max(start_date)
                                            from
                                                kcd_currency
                                            where
                                                curr_cd = '${col.CURR_CD}'
                                        )
                                `;
                                let retCurrency1 = await prisma.$queryRaw(
                                    Prisma.raw(tCurrency1),
                                );
                                if (retCurrency1.length > 0) {
                                    tUsdRate = parseFloat(
                                        retCurrency1[0].USD_RATE,
                                    );
                                }
                            }
                            tUsdAmt = tUsdAmt * tUsdRate;
                        } else {
                            tUsdRate = 1;
                        }

                        let tSQL99 = `
                            insert into
                                ksv_stock_in (
                                    PO_CD,
                                    PO_SEQ,
                                    ORDER_CD,
                                    MATL_CD,
                                    VENDOR_CD,
                                    MRP_SEQ,
                                    MATL_SEQ,
                                    IN_DATETIME,
                                    IN_QTY,
                                    TOT_QTY,
                                    IN_PRICE,
                                    IN_CURR_CD,
                                    IN_TYPE,
                                    IN_STATUS,
                                    IN_FACTORY_CD,
                                    OUT_QTY,
                                    OUT_STATUS,
                                    PAY_DATE,
                                    STATUS_CD,
                                    REG_USER,
                                    REG_DATETIME,
                                    PAY_CURR_CD,
                                    PAY_PRICE,
                                    PAY_TYPE,
                                    PUR_FACTORY,
                                    PU_CD,
                                    PAY_REPORT,
                                    BILL_TYPE,
                                    STSIN_CD,
                                    BILL_FLAG,
                                    BILL_DATE,
                                    END_FLAG,
                                    END_DATE,
                                    CALC_FLAG,
                                    USD_AMT,
                                    EXCH_RATE
                                )
                            values
                                (
                                    '${col0.PO_CD}',
                                    '${col0.PO_SEQ}',
                                    '${col0.ORDER_CD}',
                                    '${col0.MATL_CD}',
                                    '${tInput.VENDOR_CD}',
                                    '${col0.MRP_SEQ}',
                                    '${col0.MATL_SEQ}',
                                    '${tRetDate}',
                                    '${col0.PO_QTY}',
                                    '${col0.PO_QTY}',
                                    '${col.PO_PRICE}',
                                    '${col.CURR_CD}',
                                    '1',
                                    '1',
                                    '',
                                    '0',
                                    '0',
                                    '${tRetDate1}',
                                    '0',
                                    '${tUserInfo.USER_ID}',
                                    '${tRetDate}',
                                    '${col.CURR_CD}',
                                    '${col.PO_PRICE}',
                                    '',
                                    '${tFACTORY_CD}',
                                    '${tNewCd}',
                                    '',
                                    '',
                                    '${tNewStsInCd}',
                                    '1',
                                    '${tRetDate1}',
                                    '1',
                                    '${tRetDate1}',
                                    '1',
                                    '${tUsdAmt}',
                                    '${tUsdRate}'
                                )
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);
                        tSumPoQty += parseFloat(col0.PO_QTY);
                        tSumInAmt +=
                            parseFloat(col0.PO_QTY) * parseFloat(col.PO_PRICE);
                    }
                }
            }

            // Buyer VendorType auto Sts-in
            if (
                tVendorType === '4' ||
                tInput0.BILL_TO === 'BUYER' ||
                tInput0.VENDOR_CD === 'V0882' ||
                tInput0.VENDOR_CD === 'V0381' ||
                tInput0.VENDOR_CD === 'V0523'
            ) {
                var tInObj = {};
                tInObj.stsin_cd = tNewStsInCd;
                tInObj.pu_cd = tNewCd;
                tInObj.in_datetime = tRetDate;
                tInObj.reg_user = tUserInfo.USER_ID;
                tInObj.payer = tInput0.BILL_TO;
                tInObj.pay_date = tRetDate1;
                tInObj.pay_type = '';
                tInObj.in_qty = tSumPoQty;
                tInObj.in_curr_cd = tInput0.CURR_CD;
                tInObj.in_amt = tSumInAmt;
                tInObj.vendor_cd = tInput.VENDOR_CD;
                tInObj.pur_factory = tFACTORY_CD;
                tInObj.pay_bank = '';
                tInObj.out_qty = '0';
                tInObj.facin_qty = '0';
                tInObj.facout_qty = '0';
                tInObj.pay_term = '';
                tInObj.stsin_amt = tSumInAmt;
                tInObj.moq_amt = '0';
                tInObj.moq_curr = '';
                tInObj.surchase_amt = '0';
                tInObj.surchase_curr = '';
                tInObj.overshort = '';
                tInObj.pay_report = '';
                tInObj.bill_flag = '1';
                tInObj.bill_date = tRetDate1;
                tInObj.end_flag = '1';
                tInObj.end_date = tRetDate1;
                tInObj.calc_flag = '1';
                tInObj.bill_cd = '';
                tInObj.taxbill_cd = '';
                tInObj.gw_key = '';
                tInObj.gw_status = '';
                let tSQL99 = AFLib.createTableSql('ksv_stock_in_mst', tInObj);
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
                tObj.CODE = `ERROR:Purchase Reg(STEP-1):${e.message}`;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            tSQLArray = [];

            // console.log(`stock_mem2 length:${nRet1.length}`);
            // console.log(nRet1);

            let tSQL99 = `
                delete from ksv_pu_mem2 where pu_cd = '${tNewCd}'
                `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            for (tIdx0 = 0; tIdx0 < tPoInfoArray.length; tIdx0++) {
                var sql1 = `
                    select
                        max(a.po_seq) as max_po_seq
                    from
                        ksv_po_mrp a,
                        kcd_matl_mst b,
                        kcd_vendor c
                    where
                        a.po_cd = '${tPoInfoArray[tIdx0]}'
                        and a.matl_cd = b.matl_cd
                        and b.vendor_cd = c.vendor_cd
                        and b.vendor_cd = '${tInput.VENDOR_CD}'
                        and (
                            a.po_seq < 97
                            or a.po_seq > 100
                        )
                `;
                var nRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                var tPoSeq = 1;
                var tPuSeq = 1;
                if (nRet1.length > 0) tPoSeq = nRet1[0].max_po_seq;

                var tInObj = {};
                tInObj.PU_CD = tNewCd;
                tInObj.PU_SEQ = '999';
                tInObj.PO_CD = tPoInfoArray[tIdx0];
                tInObj.PO_SEQ = tPoSeq;
                tInObj.VENDOR_CD = tInput.VENDOR_CD;
                tInObj.REG_DATETIME = tRetDate;
                tInObj.REG_USER = tUserInfo.USER_ID;
                tInObj.PO_QTY = 0;
                tInObj.SEND_DATETIME = '';
                tInObj.SEND_USER = '';
                let tSQL99 = AFLib.createTableSql('ksv_pu_mem2', tInObj);
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            }

            for (tIdx0 = 0; tIdx0 < tMatlArray.length; tIdx0++) {
                var col = { ...tMatlArray[tIdx0] };

                let tSQL99 = `
                    insert into
                        ksv_stock_mem2_log (
                            pu_cd,
                            pu_seq,
                            po_cd,
                            po_seq,
                            order_cd,
                            vendor_cd,
                            matl_cd,
                            moq,
                            po_qty,
                            stock_qty,
                            po_qty2,
                            lc_qty,
                            in_qty,
                            out_qty,
                            infac_qty,
                            outfac_qty,
                            curr_cd,
                            master_price,
                            surcharge_price,
                            surcharge_amt,
                            surcharge_remark,
                            po_price
                        )
                    values
                        (
                            '${tNewCd}',
                            '999',
                            '${col.PO_CD}',
                            '${col.PO_SEQ}',
                            '${col.ORDER_CD}',
                            '${tInput.VENDOR_CD}',
                            '${col.MATL_CD}',
                            '${col.MOQ_QTY}',
                            '${col.MRP_QTY}',
                            '${col.STOCK_QTY}',
                            '${col.PO_QTY}',
                            '0',
                            '0',
                            '0',
                            '0',
                            '0',
                            '${col.CURR_CD}',
                            '${col.MASTER_PRICE}',
                            '${col.SURCHARGE_PRICE}',
                            '${col.SURCHARGE_AMT}',
                            '${col.SURCHARGE_REMARK}',
                            '${col.PO_PRICE}'
                        )
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
                tObj.CODE = `ERROR:Purchase Reg(Step-2):(${e.message})`;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            // 금액재계산
            var tRet5 = await prisma.$queryRaw`
                select
                    isnull(sum(po_qty * po_price), 0) as mrp_amt,
                    isnull(sum(po_qty2 * po_price), 0) as po_amt,
                    isnull(sum(stock_qty * po_price), 0) as stock_amt
                from
                    ksv_stock_mem2
                where
                    pu_cd = ${tNewCd}
            `;
            var tOldMrpAmt = 0;
            var tOldPoAmt = 0;
            var tOldStockAmt = 0;
            tRet5.forEach((col, i) => {
                tOldMrpAmt = AFLib.numToFixed(parseFloat(col.mrp_amt), 2);
                tOldPoAmt = AFLib.numToFixed(parseFloat(col.po_amt), 2);
                tOldStockAmt = AFLib.numToFixed(parseFloat(col.stock_amt), 2);
            });
            console.log(
                `Old Amt(mrp, po, stock): ${tOldMrpAmt}/${tOldPoAmt}/${tOldStockAmt}`,
            );

            var tStsInAmt = 0;
            if (
                tVendorType === '4' ||
                tInput0.BILL_TO === 'BUYER' ||
                tInput0.VENDOR_CD === 'V0882' ||
                tInput0.VENDOR_CD === 'V0381' ||
                tInput0.VENDOR_CD === 'V0523'
            ) {
                tStsInAmt = tOldPoAmt;
            }

            tSQLArray = [];
            let tSQL99 = `
                update ksv_pu_mst2
                set
                    po_amt = ${tOldPoAmt},
                    stsin_amt = ${tStsInAmt},
                    bill_amt = ${tStsInAmt}
                where
                    pu_cd = '${tNewCd}'
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
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'SUCCEED:Purchase Reg:' + tNewCd;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = `ERROR:Purchase Reg(Step-3):(${e.message})`;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },

        mgrInsert_S040101_5_3: async (_, args, contextValue) => {
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
            var tInput = { ...args.datas };

            var tSQL = `
                select
                    *
                from
                    ksv_pu_mst2
                where
                    pu_cd = '${tInput.PU_CD}'
            `;
            var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
            var tPuMst2 = {};
            if (nRet0.length > 0) {
                tPuMst2 = nRet0[0];
            }

            if (tPuMst2.LC_FLAG === '1') {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Already LC Input ';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            let tSQL99 = `
                update ksv_pu_mst2
                set
                    DEPOSIT_AMT = '${tInput.DEPOSIT_AMOUNT}',
                    PAY_DATE = '${tInput.PAY_DATE}',
                    PAY_BANK = '${tInput.PAY_BANK}'
                where
                    PU_CD = '${tInput.PU_CD}'
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
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'SUCCEED:Purchase Reg(1)';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Purchase Reg(1)';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },

        mgrInsert_S040101_5_4: async (_, args, contextValue) => {
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
            var tInput = { ...args.datas };

            var tSQL = `
                select
                    *
                from
                    ksv_pu_mst2
                where
                    pu_cd = '${tInput.PU_CD}'
            `;
            var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
            var tPuMst2 = {};
            if (nRet0.length > 0) {
                tPuMst2 = nRet0[0];
            }

            if (parseFloat(tPuMst2.DEPOSIT_AMT) > 0) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Already Deposit Input ';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            let tSQL99 = `
                update ksv_pu_mst2
                set
                    LC_AMT = '${tInput.AMOUNT}',
                    LC_FLAG = '1'
                where
                    PU_CD = '${tInput.PU_CD}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            let tSQL99 = `
                update ksv_stock_mem
                set
                    lc_qty = po_qty2
                where
                    PU_CD = '${tInput.PU_CD}'
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
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'SUCCEED:LC Reg:' + args.datas.length;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:LC Reg';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },

        mgrDelete_S040101_5: async (_, args, contextValue) => {
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

            var tSQLArray = [];
            let tSQL99 = `
                delete from ksv_pu_mst2
                where
                    pu_cd = '${args.datas.PU_CD}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            let tSQL99 = `
                delete from ksv_pu_mem2
                where
                    pu_cd = '${args.datas.PU_CD}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            let tSQL99 = `
                delete from ksv_cost_mst
                where
                    pu_cd = '${args.datas.PU_CD}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            let tSQL99 = `
                delete from ksv_stock_mem2
                where
                    pu_cd = '${args.datas.PU_CD}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            let tSQL99 = `
                update ksv_stock_mem
                set
                    pu_cd = '',
                    lc_qty = ''
                where
                    pu_cd = '${args.datas.PU_CD}'
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
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'SUCCEED:Delete PU_CD:' + args.datas.PU_CD;
                tObj.id = 0;
                tRetArray.push(tObj);
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Delete PU_CD';
                tObj.id = 0;
                tRetArray.push(tObj);
            }

            return tRetArray;
        },

        mgrUpdate_S040101_UPDATE_MATL_PRICE: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tSQLArray = [];

            var tMatlArray = [];
            args.datas.forEach((col, i) => {
                var tChk = 0;
                tMatlArray.forEach((col1, i1) => {
                    if (col1.MATL_CD === col.MATL_CD) tChk = 1;
                });
                if (tChk <= 0) tMatlArray.push(col);
            });

            try {
                var tIdx = 0;
                for (tIdx = 0; tIdx < tMatlArray.length; tIdx++) {
                    var tOne = { ...tMatlArray[tIdx] };

                    if (!tOne.CURR_CD || tOne.CURR_CD === '?') {
                        continue;
                    }

                    // kcd_matl_mem 처리
                    var tMaxSeq = 1;
                    let sql = `
                        SELECT
                            ISNULL(MAX(matl_seq), 0) AS matl_seq
                        FROM
                            kcd_matl_mem
                        WHERE
                            matl_cd = '${tOne.MATL_CD}'
                    `;
                    let tRet = await prisma.$queryRaw(Prisma.raw(sql));
                    let lastSeq = tRet[0]?.matl_seq?.toString() ?? '0';

                    sql = `
                        SELECT
                            upd_datetime,
                            curr_cd
                        FROM
                            kcd_matl_mem
                        WHERE
                            matl_cd = '${tOne.MATL_CD}'
                            and matl_seq = ${lastSeq}
                    `;
                    tRet = await prisma.$queryRaw(Prisma.raw(sql));
                    let updDateTime = tRet[0]?.upd_datetime ?? '0';
                    let updateCurr = tRet[0]?.curr_cd ?? '';

                    var tWorkSeq0 = 0;
                    var tPrice0 = 0;

                    // Curr가 같은경우 무조건 Update
                    if (updateCurr === tOne.CURR_CD && parseInt(lastSeq) > 0) {
                        if (typeof tOne.MATL_PRICE === 'undefined') tPrice0 = 0;
                        else tPrice0 = parseFloat(tOne.MATL_PRICE);
                        let updateSQL = `
                            UPDATE kcd_matl_mem
                            SET
                                conf_flag = 'W',
                                matl_price = '${tPrice0}',
                                curr_cd = '${tOne.CURR_CD}',
                                upd_datetime = '${tRetDate}',
                                upd_user = '${tUserInfo.USER_ID}'
                            WHERE
                                1 = 1
                                AND matl_cd = '${tOne.MATL_CD}'
                                AND matl_seq = '${lastSeq}'
                        `;
                        tSQLArray.push(prisma.$queryRaw(Prisma.raw(updateSQL)));
                        tWorkSeq0 = lastSeq;
                    } else {
                        // INSERT
                        tPrice0 = parseFloat(tOne.MATL_PRICE);
                        tMaxSeq = parseInt(lastSeq) + 1;
                        let insertSQL = `
                            INSERT INTO
                                kcd_matl_mem (
                                    conf_flag,
                                    matl_cd,
                                    matl_seq,
                                    matl_price,
                                    curr_cd,
                                    upd_datetime,
                                    upd_user
                                )
                            VALUES
                                (
                                    'W',
                                    '${tOne.MATL_CD}',
                                    '${tMaxSeq}',
                                    '${tOne.MATL_PRICE}',
                                    '${tOne.CURR_CD}',
                                    '${tRetDate}',
                                    '${tUserInfo.USER_ID}'
                                )
                        `;
                        tSQLArray.push(prisma.$queryRaw(Prisma.raw(insertSQL)));
                        tWorkSeq0 = tMaxSeq;
                    }

                    // kcd_matl_sale 처리 : Sales는 Update 하지 않음

                    // New Po Price
                    // tPrice0, tWorkSeq, tWorkCurrCd
                    tPrice0 = tOne.MATL_PRICE;
                    var tWorkSeq = tWorkSeq0;
                    var sql10 = `
                        select
                             distinct
                             a.pu_cd, a.po_cd, a.matl_cd, c.order_cd, 
                             isnull(a.po_price, 0) as po_price , 
                             isnull(a.master_price, 0) as master_price, 
                             isnull(a.surcharge_price,0) as surcharge_price, 
                             a.curr_cd
                        from ksv_stock_mem2 a,
                             ksv_po_mem b,
                             ksv_order_mst c
                        where a.matl_cd = '${tOne.MATL_CD}'
                        and   a.po_cd = b.po_cd
                        and   b.po_seq = 1
                        and   b.order_cd = c.order_cd
                        and   c.order_status <= '7'
                    `;
                    var tRet10 = await prisma.$queryRaw(Prisma.raw(sql10));
                    var tIdx10 = 0;
                    for (tIdx10 = 0; tIdx10 < tRet10.length; tIdx10++) {
                        var tOne1 = { ...tRet10[tIdx10] };
                        tPrice0 = parseFloat(tPrice0) + parseFloat(tOne1.surcharge_price);
                        tPrice0 = parseFloat(tPrice0).toFixed(4);
                        if (parseFloat(tPrice0) <= 0) tPrice0 = 0.00001;

                        let updateSQL1 = `
                            update ksv_po_mrp
                            set
                                matl_price = ${tOne.MATL_PRICE},
                                curr_cd = '${tOne.CURR_CD}',
                                tot_amt = po_qty * ${tOne.MATL_PRICE},
                                matl_seq = '${tWorkSeq}'
                            where
                                po_cd = '${tOne1.po_cd}'
                                and matl_cd = '${tOne1.matl_cd}'
                                and (order_cd = '${tOne1.order_cd}'
                                or  (po_seq >= 97 and po_seq <= 99 and left(order_cd, 2) = '${tOne1.order_cd.substring(0,2)}'))
                        `;
                        tSQLArray.push(
                            prisma.$queryRaw(Prisma.raw(updateSQL1)),
                        );


                        let updateSQL1 = `
                            update ksv_stock_in
                            set
                                pay_price = '${tPrice0}',
                                pay_curr_cd = '${tOne.CURR_CD}',
                                in_price = '${tPrice0}',
                                in_curr_cd = '${tOne.CURR_CD}',
                                matl_seq = '${tWorkSeq}'
                            where
                                po_cd = '${tOne1.po_cd}'
                                and matl_cd = '${tOne1.matl_cd}'
                                and (order_cd = '${tOne1.order_cd}'
                                or  (po_seq >= 97 and po_seq <= 99 and left(order_cd, 2) = '${tOne1.order_cd.substring(0,2)}'))
                                and (end_flag is null or end_flag = '' or end_flag = '0')
                                and  po_seq <> 97 and pay_price > 0 
                                -- and ((po_seq = 97 and pay_price > 0.00001) 
                                --  or  (po_seq <> 97 and pay_price > 0))
                        `;
                        tSQLArray.push(
                            prisma.$queryRaw(Prisma.raw(updateSQL1)),
                        );


                        let updateSQL1 = `
                            update ksv_stock_mem
                            set
                                matl_seq = '${tWorkSeq}'
                            where
                                po_cd = '${tOne1.po_cd}'
                                and matl_cd = '${tOne1.matl_cd}'
                                and (order_cd = '${tOne1.order_cd}'
                                or  (po_seq >= 97 and po_seq <= 99 and left(order_cd, 2) = '${tOne1.order_cd.substring(0,2)}'))
                        `;
                        tSQLArray.push(
                            prisma.$queryRaw(Prisma.raw(updateSQL1)),
                        );


                        let updateSQL1 = `
                            update ksv_stock_mem2
                            set
                                curr_cd = '${tOne.CURR_CD}',
                                po_price = ${tPrice0},
                                master_price = ${tOne.MATL_PRICE}
                            where
                                po_cd = '${tOne1.po_cd}'
                                and pu_cd = '${tOne1.pu_cd}'
                                and matl_cd = '${tOne1.matl_cd}'
                        `;
                        tSQLArray.push(
                            prisma.$queryRaw(Prisma.raw(updateSQL1)),
                        );

                    }

                    // KCD_MATL_UPDATE_REMARK 수정사유
                    var sqlRemark = `
                        SELECT
                            *
                        FROM
                            kcd_matl_update_remark
                        where
                            matl_cd = '${tOne.MATL_CD}'
                            and upd_datetime = '${tRetDate}'
                    `;
                    var retRemark = await prisma.$queryRaw(
                        Prisma.raw(sqlRemark),
                    );

                    if (retRemark.length > 0) {
                    } else {
                        let remarkQuery = prisma.$queryRaw(
                            Prisma.raw(
                                AFLib.createTableSql('KCD_MATL_UPDATE_REMARK', {
                                    matl_cd: tOne.MATL_CD,
                                    update_remark: tOne.UPDATE_REASON,
                                    upd_user: tUserInfo.USER_ID,
                                    upd_datetime: tRetDate,
                                }),
                            ),
                        );
                        tSQLArray.push(remarkQuery);
                    }

                    global.currentTransactionInfo = {
                        contextValue: contextValue,
                        functionName: AFLib.getFunctionName(),
                    };
                    await prisma.$transaction(tSQLArray);
                    delete global.currentTransactionInfo;

                    tSQLArray = [];
                }

                /* Purchase Mst의 Curr Cd변경 */
                /* Pu에 속한 전체 아이템의 Curr Cd 변경시 */
                var tCheck1 = 0;
                var tUpdateCurrCd9 = tMatlArray[0].CURR_CD;
                var tUpdatePuCd9 = tMatlArray[0].PU_CD;
                var sqlCheck9 = `
                        SELECT
                            *
                        FROM
                            ksv_stock_mem2 
                        where
                            pu_cd = '${tUpdatePuCd9}'
                `;
                var retCheck9 = await prisma.$queryRaw(
                    Prisma.raw(sqlCheck9),
                );
                if (retCheck9.length === args.datas.length) tCheck1 = 1;

                tSQLArray = [];
                if (tCheck1 > 0) {
                    let updateSQL1 = `
                        update ksv_pu_mst2
                        set
                            curr_cd = '${tUpdateCurrCd9}'
                        where
                            pu_cd = '${tUpdatePuCd9}'
                    `;
                    tSQLArray.push(prisma.$queryRaw(Prisma.raw(updateSQL1)));

                    global.currentTransactionInfo = {
                        contextValue: contextValue,
                        functionName: AFLib.getFunctionName(),
                    };
                    await prisma.$transaction(tSQLArray);
                    delete global.currentTransactionInfo;
                }

                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'SUCCEED:Update Matl Price';
                tObj.id = 0;
                tRetArray.push(tObj);
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = `ERROR:Update Matl Price:${e.message}`;
                tObj.id = 0;
                tRetArray.push(tObj);
            }

            return tRetArray;
        },

        mgrInsert_S040101_5_pu_mst_not_order: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput = { ...args.datas1[0] }; // Pu List
            var tInput1 = { ...args.datas2[0] }; // Detail Matl List
            var tInput0 = { ...args.datas }; // Edit

            if (!tInput.MATL_AMT) {
                tInput.MATL_AMT = '0';
            }

            if (typeof tInput1.DATAS === 'undefined') {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Purchase Reg:잘못된 데이타입니다';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tMatlArray = [];
            var tPoInfoArray = [];
            args.datas2.forEach((col, i) => {
                var tDatas = [...col.DATAS];
                var tOrgTot = 0;
                tDatas.forEach((col1, i1) => {
                    tOrgTot += parseFloat(col1.PO_QTY);
                });

                var tRemainPoQty = parseFloat(col.PO_QTY);
                var tRemainMoqQty = parseFloat(col.MOQ_QTY);

                tDatas.forEach((col1, i1) => {
                    var tObj2 = { ...col1 };
                    var tPercent = 0;
                    if (tOrgTot > 0) tPercent = tObj2.PO_QTY / tOrgTot;
                    var tTmpPoQty = parseFloat(col.PO_QTY) * tPercent;
                    tTmpPoQty = AFLib.numToFixed(tTmpPoQty, 0);
                    var tTmpMoqQty = parseFloat(col.MOQ_QTY) * tPercent;
                    tTmpMoqQty = AFLib.numToFixed(tTmpMoqQty, 0);
                    if (i1 === tDatas.length - 1) {
                        tTmpPoQty = tRemainPoQty;
                        tTmpMoqQty = tRemainMoqQty;
                        tObj2.PO_QTY = String(tTmpPoQty);
                        tObj2.MOQ_QTY = String(tTmpMoqQty);
                    } else {
                        tObj2.PO_QTY = String(tTmpPoQty);
                        tObj2.MOQ_QTY = String(tTmpMoqQty);
                    }
                    tObj2.SURCHARGE_AMT = col.SURCHARGE_AMT;
                    tObj2.SURCHARGE_PRICE = col.SURCHARGE_PRICE;
                    tObj2.SURCHARGE_REMARK = col.SURCHARGE_REMARK;
                    tObj2.PO_PRICE = col.PO_PRICE;
                    tRemainPoQty -= tTmpPoQty;
                    tRemainMoqQty -= tTmpMoqQty;
                    tDatas[i1] = { ...tObj2 };
                });

                tDatas.forEach((col1, i1) => {
                    var tObj2 = { ...col1 };
                    if (!tObj2.MASTER_PRICE) tObj2.MASTER_PRICE = '0';
                    if (!tObj2.PO_PRICE) tObj2.PO_PRICE = '0';
                    if (!tObj2.ORDER_CD) tObj2.ORDER_CD = '';
                    tMatlArray.push(tObj2);

                    var tCheck2 = 0;
                    tPoInfoArray.forEach((col2, i2) => {
                        if (col2 === tObj2.PO_CD) tCheck2 = 1;
                    });
                    if (tCheck2 === 0) tPoInfoArray.push(tObj2.PO_CD);
                });
            });
            // console.log(tMatlArray);

            if (typeof tInput0.PU_CD === 'undefined') tInput0.PU_CD = '';
            tInput0.ORDER_DATE = tRetDate1;

            var tYY2 = tRetDate.substring(2, 4);

            var tPuPrefix = 'PU';
            if (tInput1.FACTORY_CD === 'FC044') tPuPrefix = 'EU';

            var tZero = '000000';
            var tNewCd = `${tPuPrefix}${tYY2}-`;
            tNewCd += tInput.BUYER_CD;
            var tPuSeqPrefix = tNewCd;
            var tPuSeq = 1;
            var sqlPuSeq = `
                select
                    isnull(max(pu_cd), '${tPuSeqPrefix}000000') as max_pu_cd
                from
                    ksv_pu_mst2
                where
                    pu_cd like '${tPuSeqPrefix}%'
            `;
            var retPuSeq = await prisma.$queryRaw(Prisma.raw(sqlPuSeq));
            if (retPuSeq.length > 0) {
                var tPuSeqStr = retPuSeq[0].max_pu_cd.substring(7, 13);
                tPuSeq = parseInt(tPuSeqStr) + 1;
            }

            var tPuSeqStr0 = String(tPuSeq);
            var tPuSeqStr =
                tZero.substring(0, 6 - tPuSeqStr0.length) + tPuSeqStr0;
            tNewCd += tPuSeqStr;

            var tNewStsOutCd = '';
            var mNewStsOutCd = '';
            var tPackCd = '';

            var tNewStsInCd = `IS${tRetDate1.substring(2, 4)}-${tRetDate.substring(4, 14)}`;

            console.log('New Cd:' + tNewCd);

            var sql1 = `
                select
                    isnull(a.pay_type, '') as pay_type,
                    isnull(a.pay_type2, '') as pay_type2,
                    a.pay_term,
                    b.bank_cd,
                    a.vendor_type
                from
                    kcd_vendor a,
                    kcd_vendor_bank b
                where
                    a.vendor_cd = '${tInput.VENDOR_CD}'
                    and a.vendor_cd = b.vendor_cd
            `;
            var nRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
            var tPayType = '';
            var tPayType2 = '';
            var tPayBank = '';
            var tPayTerm = '';
            var tVendorType = '';
            if (nRet1.length > 0) {
                tPayType = nRet1[0].pay_type;
                tPayType2 = nRet1[0].pay_type2;
                tPayTerm = nRet1[0].pay_term;
                tPayBank = nRet1[0].bank_cd;
                tVendorType = nRet1[0].vendor_type;
            }

            console.log(`Vendor Type=> ${tVendorType}`);

            if (tInput0.PAY_CONDITION !== '') {
                tPayType2 = tInput0.PAY_CONDITION;
                var sql1 = `
                    select
                        *
                    from
                        kcd_code
                    where
                        cd_group = 'pay_type'
                        and cd_code = '${tInput0.PAY_CONDITION}'
                `;
                var nRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                if (nRet1.length > 0) tPayType = nRet1[0].CD_NAME;
                else tPayType = '';
            }

            var tSQLArray = [];

            var tTARGET_ETA = '';
            var tMRP_DATE = '';
            var tFACTORY_CD = '';
            var tETA = '';
            var tPoCd2 = '';
            var tIdx1 = 0;
            var tSavePoCd = '';
            var tPoCdArray = [];

            var tLC_AMT = 0;
            var tLC_QTY = 0;
            var tLC_QTY1 = 0;

            if (tInput0.PU_CD !== '') tNewCd = tInput0.PU_CD;

            var tPoArray = [];
            var tIdx0 = 0;
            for (tIdx0 = 0; tIdx0 < args.datas1.length; tIdx0++) {
                var col = { ...args.datas1[tIdx0] };

                if (tIdx0 === 0) tPoCd2 = col.PO_CD;
                else tPoCd2 += `/${col.PO_CD}`;

                tPoArray.push(col.PO_CD);

                var sql2 = `
                    select
                        max(po_seq) as max_po_seq
                    from
                        ksv_po_mst
                    where
                        po_cd = '${col.PO_CD}'
                `;
                var nRet2 = await prisma.$queryRaw(Prisma.raw(sql2));
                var tPoSeq = 1;
                if (nRet2.length > 0) tPoSeq = nRet2[0].max_po_seq;

                // PO_CD      VENDOR_CD END_DATE CHECK_DATE     PU_CD                                              id
                var sql3 = `
                    select
                        *
                    from
                        ksv_po_vendor
                    where
                        po_cd = '${col.PO_CD}'
                        and vendor_cd = '${col.VENDOR_CD}'
                `;
                var nRet3 = await prisma.$queryRaw(Prisma.raw(sql3));
                if (nRet3.length > 0) {
                    let tSQL99 = `
                        update ksv_po_vendor
                        set
                            pu_cd = '${tNewCd}'
                        where
                            po_cd = '${col.PO_CD}'
                            and vendor_cd = '${col.VENDOR_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                } else {
                    let tSQL99 = `
                        insert into
                            ksv_po_vendor (po_cd, vendor_cd, end_date, check_date, pu_cd)
                        values
                            ('${col.PO_CD}', '${col.VENDOR_CD}', '', '', '${tNewCd}')
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }
            }

            var sql8_2 = `
                select
                    isnull(max(a.mrp_seq), 0) as max_mrp_seq
                from
                    ksv_po_mrp a
                where
                    a.po_cd = '${col.PO_CD}'
            `;
            var nRet8_2 = await prisma.$queryRaw(Prisma.raw(sql8_2));
            var tNewMrpSeq = 0;
            if (nRet8_2.length > 0) tNewMrpSeq = nRet8_2[0].max_mrp_seq;

            //

            // matl list Update
            for (tIdx0 = 0; tIdx0 < tMatlArray.length; tIdx0++) {
                var col = { ...tMatlArray[tIdx0] };
                tInput0.CURR_CD = col.CURR_CD;

                // console.log(col);
                // if (parseFloat(col.PO_UPDATE_QTY) <= 0) continue;

                var sql1 = `
                    select
                        c.FACTORY_CD,
                        left(b.REG_DATETIME, 8) as MRP_DATE,
                        max(c.MATL_DUE_DATE) as TARGET_ETA
                    from
                        KSV_PO_MST a,
                        KSV_STOCK_MST b,
                        KSV_ORDER_MST c,
                        KSV_PO_MEM d
                    where
                        a.PO_CD = '${col.PO_CD}'
                        and a.PO_SEQ = 1
                        and a.PO_CD = b.PO_CD
                        and b.PO_SEQ = 1
                        and a.PO_CD = d.PO_CD
                        and d.PO_SEQ = 1
                        and d.order_cd = c.order_cd
                    group by
                        c.FACTORY_CD,
                        left(b.REG_DATETIME, 8)
                `;
                var nRet1 = await prisma.$queryRaw(Prisma.raw(sql1));

                // tMRP_DATE = nRet1[0].MRP_DATE;
                if (nRet1.length > 0) {
                    tMRP_DATE = tInput.MRP_DATE;
                    tTARGET_ETA = nRet1[0].TARGET_ETA;
                    tFACTORY_CD = nRet1[0].FACTORY_CD;
                    if (tTARGET_ETA === null) tTARGET_ETA = tMRP_DATE;
                } else {
                    var sql10 = `
                        select
                            c.FACTORY_CD,
                            max(c.MATL_DUE_DATE) as TARGET_ETA
                        from
                            KSV_PO_MST a,
                            KSV_ORDER_MST c,
                            KSV_PO_MEM d
                        where
                            a.PO_CD = '${col.PO_CD}'
                            and a.PO_SEQ = 1
                            and a.PO_CD = d.PO_CD
                            and d.PO_SEQ = 1
                            and d.order_cd = c.order_cd
                        group by
                            c.FACTORY_CD
                    `;
                    var nRet10 = await prisma.$queryRaw(Prisma.raw(sql10));
                    if (nRet10.length > 0) {
                        tMRP_DATE = tInput.MRP_DATE;
                        tTARGET_ETA = nRet10[0].TARGET_ETA;
                        tFACTORY_CD = nRet10[0].FACTORY_CD;
                    }
                }

                if (!col.PU_CD);
                else col.PU_CD = '';

                if (col.PU_CD !== '') {
                    var tUpdatePoQty =
                        parseFloat(col.PO_QTY) + parseFloat(col.DIFF_QTY);

                    let tSQL99 = `
                        update ksv_stock_mem2
                        set
                            po_seq = '${col.PO_SEQ}',
                            moq = '${col.MOQ_QTY}',
                            po_qty = '${col.MRP_QTY}',
                            stock_qty = '${col.STOCK_QTY}',
                            po_qty2 = '${tUpdatePoQty}',
                            -- po_qty2 = '${col.PO_QTY}',
                            -- lc_qty = '${tLC_QTY}',
                            curr_cd = '${col.CURR_CD}',
                            master_price = '${col.MASTER_PRICE}',
                            surcharge_price = '${col.SURCHARGE_PRICE}',
                            surcharge_amt = '${col.SURCHARGE_AMT}',
                            surcharge_remark = '${col.SURCHARGE_REMARK}',
                            po_price = '${col.PO_PRICE}'
                        where
                            po_cd = '${col.PO_CD}'
                            -- and  order_cd='${col.ORDER_CD}' 
                            and vendor_cd = '${tInput.VENDOR_CD}'
                            and matl_cd = '${col.MATL_CD}'
                            and pu_cd = '${col.PU_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                    tNewCd = col.PU_CD;
                } else {
                    var tUpdateStsInCd = '';
                    tUpdateStsInCd = tNewStsInCd;

                    let tSQL99 = `
                        insert into
                            ksv_stock_mem2 (
                                pu_cd,
                                po_cd,
                                po_seq,
                                order_cd,
                                vendor_cd,
                                matl_cd,
                                moq,
                                po_qty,
                                stock_qty,
                                po_qty2,
                                lc_qty,
                                in_qty,
                                out_qty,
                                infac_qty,
                                outfac_qty,
                                curr_cd,
                                master_price,
                                surcharge_price,
                                surcharge_amt,
                                surcharge_remark,
                                po_price,
                                stsin_cd,
                                stsin_array,
                                total_mrp,
                                bef_total_mrp,
                                bef_stock_qty
                            )
                        values
                            (
                                '${tNewCd}',
                                '${col.PO_CD}',
                                '${col.PO_SEQ}',
                                '${col.ORDER_CD}',
                                '${tInput.VENDOR_CD}',
                                '${col.MATL_CD}',
                                '${col.MOQ_QTY}',
                                '${col.MRP_QTY}',
                                '${col.STOCK_QTY}',
                                '${col.PO_QTY}',
                                '0',
                                '0',
                                '0',
                                '0',
                                '0',
                                '${col.CURR_CD}',
                                '${col.MASTER_PRICE}',
                                '${col.SURCHARGE_PRICE}',
                                '${col.SURCHARGE_AMT}',
                                '${col.SURCHARGE_REMARK}',
                                '${col.PO_PRICE}',
                                '${tUpdateStsInCd}',
                                '',
                                '${col.MRP_QTY}',
                                '0',
                                '0'
                            )
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    if (1) {
                        var tTableObj = {};
                        tTableObj.PO_CD = col.PO_CD;
                        tTableObj.PO_SEQ = col.PO_SEQ;
                        tTableObj.MATL_CD = col.MATL_CD;
                        tTableObj.MATL_SEQ = 1;
                        tTableObj.VENDOR_CD = tInput.VENDOR_CD;
                        tTableObj.PU_CD = tNewCd;
                        tTableObj.STSIN_CD = tNewStsInCd;
                        tTableObj.STSIN_TYPE = 'FULL_IN';
                        tTableObj.MASTER_PRICE = col.MASTER_PRICE;
                        tTableObj.CURR_CD = col.CURR_CD;
                        tTableObj.PO_PRICE = col.PO_PRICE;
                        tTableObj.SURCHARGE_AMT = '0';
                        tTableObj.SURCHARGE_PRICE = '0';
                        tTableObj.SURCHARGE_REMARK = '';
                        tTableObj.STOCK_QTY = col.STOCK_QTY;
                        tTableObj.MOQ_QTY = col.MOQ_QTY;
                        tTableObj.OVERSHORT_QTY = '0';
                        tTableObj.PO_QTY = col.PO_QTY;
                        tTableObj.PARTIN_QTY = '0';
                        tTableObj.STSIN_QTY = col.PO_QTY;
                        tTableObj.FOC_QTY = '0';
                        tTableObj.SHIP_QTY = col.PO_QTY;
                        tTableObj.MOQ_STOCK_IDX = '';
                        tTableObj.LEFTOVER_STOCK_IDX = '';
                        tTableObj.FOC_STOCK_IDX = '';
                        tTableObj.OUT_QTY = '0';
                        tTableObj.BILL_FLAG = '1';
                        tTableObj.SAVE_PO_QTY = col.PO_QTY;
                        tTableObj.SAVE_MOQ_QTY = col.MOQ_QTY;
                        tTableObj.SAVE_OVERSHORT_QTY = '0';
                        tTableObj.SAVE_FOC_QTY = '0';
                        tTableObj.SAVE_SURCHARGE_AMT = '0';
                        tTableObj.SAVE_SURCHARGE_PRICE = '0';
                        tTableObj.SAVE_PO_PRICE = col.PO_PRICE;
                        let tSQL99 = AFLib.createTableSql(
                            'KSV_STOCK_MEM2_STSIN',
                            tTableObj,
                        );
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);

                        var tYY2_1 = tRetDate.substring(2, 4);
                        var tSEQ_1 = tRetDate.substring(4, 14);

                        var tZero = '000000';
                        tNewStsOutCd = `SO${tYY2_1}-${tSEQ_1}`;
                        mNewStsOutCd = tNewStsOutCd;

                        var tReadyDate = tRetDate1;
                        var tETA = tRetDate1;
                        var tOrigin = '';
                        var tDestination = '';
                        var tPackCd = '';

                        tOrigin = 'HAIPHONG';
                        tDestination = 'BVT';
                        tPackCd = `NOTORDER_${tNewStsOutCd}_${tRetDate1}`;

                        let tSQL99 = `
                            insert into
                                ksv_stock_out_mst (
                                    stsout_cd,
                                    stsin_cd,
                                    pu_cd,
                                    out_datetime,
                                    reg_user,
                                    reg_datetime,
                                    pack_cd,
                                    invoice_no,
                                    trade_term,
                                    ready_date,
                                    origin_port,
                                    weight,
                                    cbm,
                                    destination,
                                    shipment_cd,
                                    eta,
                                    ready_facin_flag,
                                    ata
                                )
                            values
                                (
                                    '${tNewStsOutCd}',
                                    '${tNewStsInCd}',
                                    '',
                                    '${tRetDate}',
                                    '${tUserInfo.USER_ID}',
                                    '${tRetDate}',
                                    '',
                                    '',
                                    'FOB',
                                    '${tReadyDate}',
                                    '${tOrigin}',
                                    '0',
                                    '0',
                                    '${tDestination}',
                                    '',
                                    '${tETA}',
                                    '1',
                                    '${tRetDate1}'
                                )
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);
                    }
                }
            }

            var tETA = tMRP_DATE;
            var tPuStatus = '-';

            // 입력된 Target ETA로 저장
            if (tInput0.TARGET_ETA) tTARGET_ETA = tInput0.TARGET_ETA;

            if (tInput0.PU_CD === '') {
                var tMemo = tPayType;
                let tSQL99 = `
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
                            EX_FACTORY,
                            PAY_CONDITION,
                            MEMO,
                            NOT_ORDER_FLAG
                        )
                    values
                        (
                            '${tNewCd}',
                            '${tInput.VENDOR_CD}',
                            '${tInput.BUYER_CD}',
                            '${tFACTORY_CD}',
                            '${tUserInfo.USER_ID}',
                            '${tRetDate}',
                            '${tPuStatus}',
                            '${tInput.VENDOR_MATL_TYPE}',
                            '${tInput0.BILL_TO}',
                            '${tInput0.SHIP_TO}',
                            '${tInput0.CURR_CD}',
                            '0',
                            '0',
                            '${tInput0.NORMI}',
                            '${tInput0.TRADE_TERM}',
                            '${tInput0.ORDER_DATE}',
                            '${tInput0.DUE_DATE}',
                            '${tInput0.FORWARDER}',
                            '',
                            '${tPoCd2}',
                            '${tTARGET_ETA}',
                            '1',
                            '${tInput0.PI_NO}',
                            '${tInput0.EX_FACTORY}',
                            '${tInput0.PAY_DATE}',
                            '${tTARGET_ETA}',
                            '${tMRP_DATE}',
                            '0',
                            '0',
                            '${tInput.MATL_AMT}',
                            '${tPayType}',
                            '${tPayBank}',
                            '${tInput0.ORIGIN_PORT}',
                            '${tInput0.DUE_DATE}',
                            '${tInput0.EX_FACTORY}',
                            '${tPayType2}',
                            '${tMemo}',
                            '1'
                        )
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                var tPlanFlag = '0';
                if (tTARGET_ETA !== '' && tInput0.DUE_DATE !== '')
                    tPlanFlag = '1';
                var tIdx3 = 0;
                for (tIdx3 = 0; tIdx3 < tPoArray.length; tIdx3++) {
                    var tPoCd0 = tPoArray[tIdx3];
                    let tSQL99 = `
                        update ksv_po_mst
                        set
                            plan_flag = '${tPlanFlag}',
                            plan_etd = '${tInput0.DUE_DATE}',
                            plan_eta = '${tTARGET_ETA}'
                        where
                            po_cd = '${tPoCd0}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }
            } else {
                let tSQL99 = `
                    update ksv_pu_mst2
                    set
                        NOT_ORDER_FLAG = '1',
                        BILL_TO = '${tInput0.BILL_TO}',
                        SHIP_TO = '${tInput0.SHIP_TO}',
                        CURR_CD = '${tInput0.CURR_CD}',
                        -- DEPOSIT_AMT = '${tInput.DEPOSIT_AMT}',
                        NORMI = '${tInput0.NORMI}',
                        TRADE_TERM = '${tInput0.TRADE_TERM}',
                        ORDER_DATE = '${tInput0.ORDER_DATE}',
                        -- DELIVERY_DATE = '${tInput.DELIVERY_DATE}',
                        FORWARD = '${tInput0.FORWARDER}',
                        PO_CD2 = '${tPoCd2}',
                        TARGET_ETA = '${tTARGET_ETA}',
                        PI_NO = '${tInput0.PI_NO}',
                        EXP_DELIVERY_DATE = '${tInput0.EX_FACTORY}',
                        PAY_DATE = '${tInput0.PAY_DATE}',
                        -- LC_FLAG = '${tInput.LC_FLAG}',
                        -- LC_AMT = '${tLC_AMT}',
                        -- PU_AMT = '${tInput.PAY_AMT}',
                        -- PAY_CONDITION = '${tInput0.PAY_CONDITION}'
                        ORIGIN_PORT = '${tInput0.ORIGIN_PORT}',
                        DUE_DATE = '${tInput0.DUE_DATE}',
                        EX_FACTORY = '${tInput0.EX_FACTORY}'
                    where
                        PU_CD = '${tInput0.PU_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                // tSQLArray.push(tSQL99_1);
                tNewCd = tInput0.PU_CD;

                var tPlanFlag = '0';
                if (tTARGET_ETA !== '' && tInput0.DUE_DATE !== '')
                    tPlanFlag = '1';
                var tIdx3 = 0;
                for (tIdx3 = 0; tIdx3 < tPoArray.length; tIdx3++) {
                    var tPoCd0 = tPoArray[tIdx3];
                    let tSQL99 = `
                        update ksv_po_mst
                        set
                            plan_flag = '${tPlanFlag}',
                            plan_etd = '${tInput0.DUE_DATE}',
                            plan_eta = '${tTARGET_ETA}'
                        where
                            po_cd = '${tPoCd0}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }
            }

            var tIdx1 = 0;
            for (tIdx1 = 0; tIdx1 < tMatlArray.length; tIdx1++) {
                var col = { ...tMatlArray[tIdx1] };

                var tSQL0 = '';
                var tUpdatePuCd = '';
                if (tInput0.PU_CD === '') {
                    tUpdatePuCd = tNewCd;
                    tSQL0 = ` and  (pu_cd  is null or pu_cd = '')`;
                } else {
                    tUpdatePuCd = tInput0.PU_CD;
                    tSQL0 = ` and  pu_cd = '${tInput0.PU_CD}' `;
                }

                let tSQL99 = `
                    update ksv_po_mrp
                    set
                        pu_cd = '${tUpdatePuCd}',
                        pu_seq = '${tPuSeq}'
                    where
                        po_cd = '${col.PO_CD}'
                        and matl_cd = '${col.MATL_CD}'
                        and (
                            pu_cd is null
                            or pu_cd = ''
                        )
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    update ksv_stock_mem
                    set
                        pu_cd = '${tUpdatePuCd}'
                    where
                        po_cd = '${col.PO_CD}'
                        and matl_cd = '${col.MATL_CD}'
                        -- and   (pu_cd is null or  pu_cd = '')
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                var tSumPoQty = 0;
                var tSumInAmt = 0;

                var sql2 = `
                    select
                        *
                    from
                        ksv_stock_mem
                    where
                        po_cd = '${col.PO_CD}'
                        and matl_cd = '${col.MATL_CD}'
                        -- and   po_qty > 0
                `;
                var nRet2 = await prisma.$queryRaw(Prisma.raw(sql2));
                var tIdx9 = 0;
                for (tIdx9 = 0; tIdx9 < nRet2.length; tIdx9++) {
                    var tObj9 = { ...nRet2[tIdx9] };
                    var col0 = { ...nRet2[tIdx9] };

                    let tSQL99 = `
                        update ksv_stock_mem
                        set
                            in_qty = ${tObj9.PO_QTY},
                            out_qty = ${tObj9.PO_QTY},
                            infac_qty = ${tObj9.PO_QTY},
                            stock_status = '2'
                        where
                            po_cd = '${tObj9.PO_CD}'
                            and po_seq = '${tObj9.PO_SEQ}'
                            and order_cd = '${tObj9.ORDER_CD}'
                            and matl_cd = '${tObj9.MATL_CD}'
                            and mrp_seq = '${tObj9.MRP_SEQ}'
                            and matl_seq = '${tObj9.MATL_SEQ}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    var tUsdAmt =
                        parseFloat(col0.PO_QTY) * parseFloat(col.PO_PRICE);
                    var tUsdRate = 0;
                    if (col.CURR_CD !== 'USD') {
                        let tCurrency = `
                            select
                                *
                            from
                                kcd_currency
                            where
                                curr_cd = '${col.CURR_CD}'
                                and start_date = '${tRetDate.substring(0, 8)}'
                        `;
                        let retCurrency = await prisma.$queryRaw(
                            Prisma.raw(tCurrency),
                        );
                        if (retCurrency.length > 0) {
                            tUsdRate = parseFloat(retCurrency[0].USD_RATE);
                        } else {
                            let tCurrency1 = `
                                select
                                    *
                                from
                                    kcd_currency
                                where
                                    curr_cd = '${col.CURR_CD}'
                                    and start_date = (
                                        select
                                            max(start_date)
                                        from
                                            kcd_currency
                                        where
                                            curr_cd = '${col.CURR_CD}'
                                    )
                            `;
                            let retCurrency1 = await prisma.$queryRaw(
                                Prisma.raw(tCurrency1),
                            );
                            if (retCurrency1.length > 0) {
                                tUsdRate = parseFloat(retCurrency1[0].USD_RATE);
                            }
                        }
                        tUsdAmt = tUsdAmt * tUsdRate;
                    } else {
                        tUsdRate = 1;
                    }

                    // 수량: 0으로 STS-IN
                    let tSQL99 = `
                        insert into
                            ksv_stock_in (
                                PO_CD,
                                PO_SEQ,
                                ORDER_CD,
                                MATL_CD,
                                VENDOR_CD,
                                MRP_SEQ,
                                MATL_SEQ,
                                IN_DATETIME,
                                IN_QTY,
                                TOT_QTY,
                                IN_PRICE,
                                IN_CURR_CD,
                                IN_TYPE,
                                IN_STATUS,
                                IN_FACTORY_CD,
                                OUT_QTY,
                                OUT_STATUS,
                                PAY_DATE,
                                STATUS_CD,
                                REG_USER,
                                REG_DATETIME,
                                PAY_CURR_CD,
                                PAY_PRICE,
                                PAY_TYPE,
                                PUR_FACTORY,
                                PU_CD,
                                PAY_REPORT,
                                BILL_TYPE,
                                STSIN_CD,
                                BILL_FLAG,
                                BILL_DATE,
                                END_FLAG,
                                END_DATE,
                                CALC_FLAG,
                                USD_AMT,
                                EXCH_RATE,
                                save_in_qty
                            )
                        values
                            (
                                '${col0.PO_CD}',
                                '${col0.PO_SEQ}',
                                '${col0.ORDER_CD}',
                                '${col0.MATL_CD}',
                                '${tInput.VENDOR_CD}',
                                '${col0.MRP_SEQ}',
                                '${col0.MATL_SEQ}',
                                '${tRetDate}',
                                '0',
                                '0',
                                '${col.PO_PRICE}',
                                '${col.CURR_CD}',
                                '1',
                                '1',
                                '',
                                '0',
                                '0',
                                '${tRetDate1}',
                                '0',
                                '${tUserInfo.USER_ID}',
                                '${tRetDate}',
                                '${col.CURR_CD}',
                                '${col.PO_PRICE}',
                                '',
                                '${tFACTORY_CD}',
                                '${tNewCd}',
                                '',
                                '',
                                '${tNewStsInCd}',
                                '1',
                                '${tRetDate1}',
                                '1',
                                '${tRetDate1}',
                                '1',
                                '0',
                                '${tUsdRate}',
                                '${col0.PO_QTY}'
                            )
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                    tSumPoQty += parseFloat(col0.PO_QTY);
                    tSumInAmt +=
                        parseFloat(col0.PO_QTY) * parseFloat(col.PO_PRICE);

                    let tSQL99 = `
                        insert into
                            ksv_stock_out (
                                po_cd,
                                po_seq,
                                order_cd,
                                matl_cd,
                                mrp_seq,
                                matl_seq,
                                in_datetime,
                                out_datetime,
                                out_qty,
                                out_type,
                                out_status,
                                pack_cd,
                                delivery_type,
                                ship_date,
                                ct_qty,
                                ct_no,
                                remark,
                                out_factory_cd,
                                status_cd,
                                reg_user,
                                reg_datetime,
                                pu_cd,
                                stsout_cd,
                                invoice_no,
                                trade_term,
                                ready_date,
                                origin_port,
                                weight,
                                cbm,
                                destination,
                                eta,
                                stsin_cd
                            )
                        values
                            (
                                '${col0.PO_CD}',
                                ${col0.PO_SEQ},
                                '${col0.ORDER_CD}',
                                '${col0.MATL_CD}',
                                ${col0.MRP_SEQ},
                                ${col0.MATL_SEQ},
                                '${tRetDate}',
                                '${tRetDate}',
                                ${col0.PO_QTY},
                                '4',
                                '0',
                                '${tPackCd}',
                                '',
                                '${tRetDate1}',
                                '0',
                                '',
                                '',
                                '${tFACTORY_CD}',
                                '0',
                                '${tUserInfo.USER_ID}',
                                '${tRetDate}',
                                '${tNewCd}',
                                '${tNewStsOutCd}',
                                '',
                                '',
                                '',
                                '',
                                '',
                                '',
                                '',
                                '',
                                '${tNewStsInCd}'
                            )
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    // tSQLArray.push(tSQL99_1);

                    var tTableObj = {};
                    tTableObj.PO_CD = col0.PO_CD;
                    tTableObj.PO_SEQ = col0.PO_SEQ;
                    tTableObj.MATL_CD = col0.MATL_CD;
                    tTableObj.MATL_SEQ = col0.MATL_SEQ;
                    tTableObj.FACTORY_CD = tFACTORY_CD;
                    tTableObj.REG_USER = tUserInfo.USER_ID;
                    tTableObj.REG_DATETIME = tRetDate1;
                    tTableObj.VENDOR_CD = tInput.VENDOR_CD;
                    tTableObj.PU_CD = tNewCd;
                    tTableObj.STSIN_CD = tNewStsInCd;
                    tTableObj.STSOUT_CD = tNewStsOutCd;
                    tTableObj.OUT_QTY = col0.USE_QTY;
                    let tSQL99 = AFLib.createTableSql(
                        'KSV_STOCK_MEM2_STSOUT',
                        tTableObj,
                    );
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    // tSQLArray.push(tSQL99_1);

                    var tRetDateCurr = AFLib.getCurrTime();

                    var tDelivery = `AUTOFACIN-#${tRetDateCurr}_${tIdx9}-#${tNewStsOutCd}`;
                    var tFacInCd = `FACIN-${tRetDateCurr}_${tIdx9}`;

                    tTableObj = {};
                    tTableObj.PO_CD = col0.PO_CD;
                    tTableObj.IN_DATE = tRetDate1;
                    tTableObj.MATL_CD = col0.MATL_CD;
                    tTableObj.IN_QTY = col0.USE_QTY;
                    tTableObj.IN_QTY = col0.USE_QTY;
                    tTableObj.ERR_QTY = '0';
                    tTableObj.DELIVERY = tDelivery;
                    tTableObj.LOCATION = '';
                    tTableObj.STATUS_CD = '0';
                    tTableObj.REG_USER = tUserInfo.USER_ID;
                    tTableObj.REG_DATETIME = tRetDate;
                    tTableObj.STSOUT_CD = tNewStsOutCd;
                    tTableObj.SHORTAGE_QTY = '0';
                    tTableObj.DEFECT_QTY = '0';
                    tTableObj.FACIN_CD = tFacInCd;
                    tTableObj.CLEARANCE_NO = '0';
                    tTableObj.PU_CD = tNewCd;

                    let tSQL99 = AFLib.createTableSql(
                        'KSV_STOCK_FACIN',
                        tTableObj,
                    );
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    // tSQLArray.push(tSQL99_1);
                }
            }

            // Buyer VendorType auto Sts-in
            if (1) {
                var tInObj = {};
                tInObj.stsin_cd = tNewStsInCd;
                tInObj.pu_cd = tNewCd;
                tInObj.in_datetime = tRetDate;
                tInObj.reg_user = tUserInfo.USER_ID;
                tInObj.payer = tInput0.BILL_TO;
                tInObj.pay_date = tRetDate1;
                tInObj.pay_type = '';
                tInObj.in_qty = tSumPoQty;
                tInObj.in_curr_cd = tInput0.CURR_CD;
                tInObj.in_amt = tSumInAmt;
                tInObj.vendor_cd = tInput.VENDOR_CD;
                tInObj.pur_factory = tFACTORY_CD;
                tInObj.pay_bank = '';
                tInObj.out_qty = '0';
                tInObj.facin_qty = '0';
                tInObj.facout_qty = '0';
                tInObj.pay_term = '';
                tInObj.stsin_amt = tSumInAmt;
                tInObj.moq_amt = '0';
                tInObj.moq_curr = '';
                tInObj.surchase_amt = '0';
                tInObj.surchase_curr = '';
                tInObj.overshort = '';
                tInObj.pay_report = '';
                tInObj.bill_flag = '1';
                tInObj.bill_date = tRetDate1;
                tInObj.end_flag = '1';
                tInObj.end_date = tRetDate1;
                tInObj.calc_flag = '1';
                tInObj.bill_cd = '';
                tInObj.taxbill_cd = '';
                tInObj.gw_key = '';
                tInObj.gw_status = '';
                let tSQL99 = AFLib.createTableSql('ksv_stock_in_mst', tInObj);
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                var tReadyDate = tRetDate1;
                var tETA = tRetDate1;
                var tOrigin = '';
                var tDestination = '';
                var tPackCd = '';

                if (tFACTORY_CD === 'FC034') {
                    tOrigin = 'HAIPHONG';
                    tDestination = 'BVT';
                    tPackCd = `B2B_${tNewStsOutCd}_${tRetDate1}`;
                }
                if (tFACTORY_CD === 'FC044') {
                    tOrigin = 'CAIRO';
                    tDestination = 'ETP';
                    tPackCd = `E2E_${tNewStsOutCd}_${tRetDate1}`;
                }
                let tSQL99 = `
                    insert into
                        ksv_stock_out_mst (
                            stsout_cd,
                            stsin_cd,
                            pu_cd,
                            out_datetime,
                            reg_user,
                            reg_datetime,
                            pack_cd,
                            invoice_no,
                            trade_term,
                            ready_date,
                            origin_port,
                            weight,
                            cbm,
                            destination,
                            shipment_cd,
                            eta,
                            ready_facin_flag,
                            ata
                        )
                    values
                        (
                            '${tNewStsOutCd}',
                            '${tNewStsInCd}',
                            '',
                            '${tRetDate}',
                            '${tUserInfo.USER_ID}',
                            '${tRetDate}',
                            '',
                            '',
                            'FOB',
                            '${tReadyDate}',
                            '${tOrigin}',
                            '0',
                            '0',
                            '${tDestination}',
                            '',
                            '${tETA}',
                            '1',
                            '${tRetDate1}'
                        )
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
                tObj.CODE = `ERROR:Purchase Reg(STEP-1):${e.message}`;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            tSQLArray = [];

            // console.log(`stock_mem2 length:${nRet1.length}`);
            // console.log(nRet1);

            for (tIdx0 = 0; tIdx0 < tPoInfoArray.length; tIdx0++) {
                var sql1 = `
                    select
                        max(a.po_seq) as max_po_seq
                    from
                        ksv_po_mrp a,
                        kcd_matl_mst b,
                        kcd_vendor c
                    where
                        a.po_cd = '${tPoInfoArray[tIdx0]}'
                        and a.matl_cd = b.matl_cd
                        and b.vendor_cd = c.vendor_cd
                        and b.vendor_cd = '${tInput.VENDOR_CD}'
                        and (
                            a.po_seq < 97
                            or a.po_seq > 100
                        )
                `;
                var nRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                var tPoSeq = 1;
                var tPuSeq = 1;
                if (nRet1.length > 0) tPoSeq = nRet1[0].max_po_seq;

                var tInObj = {};
                tInObj.PU_CD = tNewCd;
                tInObj.PU_SEQ = '1';
                tInObj.PO_CD = tPoInfoArray[tIdx0];
                tInObj.PO_SEQ = tPoSeq;
                tInObj.VENDOR_CD = tInput.VENDOR_CD;
                tInObj.REG_DATETIME = tRetDate;
                tInObj.REG_USER = tUserInfo.USER_ID;
                tInObj.PO_QTY = 0;
                tInObj.SEND_DATETIME = '';
                tInObj.SEND_USER = '';
                let tSQL99 = AFLib.createTableSql('ksv_pu_mem2', tInObj);
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                var tInObj = {};
                tInObj.PU_CD = tNewCd;
                tInObj.PU_SEQ = '999';
                tInObj.PO_CD = tPoInfoArray[tIdx0];
                tInObj.PO_SEQ = tPoSeq;
                tInObj.VENDOR_CD = tInput.VENDOR_CD;
                tInObj.REG_DATETIME = tRetDate;
                tInObj.REG_USER = tUserInfo.USER_ID;
                tInObj.PO_QTY = 0;
                tInObj.SEND_DATETIME = '';
                tInObj.SEND_USER = '';
                let tSQL99 = AFLib.createTableSql('ksv_pu_mem2', tInObj);
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            }

            for (tIdx0 = 0; tIdx0 < tMatlArray.length; tIdx0++) {
                var col = { ...tMatlArray[tIdx0] };

                let tSQL99 = `
                    insert into
                        ksv_stock_mem2_log (
                            pu_cd,
                            pu_seq,
                            po_cd,
                            po_seq,
                            order_cd,
                            vendor_cd,
                            matl_cd,
                            moq,
                            po_qty,
                            stock_qty,
                            po_qty2,
                            lc_qty,
                            in_qty,
                            out_qty,
                            infac_qty,
                            outfac_qty,
                            curr_cd,
                            master_price,
                            surcharge_price,
                            surcharge_amt,
                            surcharge_remark,
                            po_price,
                            bef_po_qty,
                            new_po_qty,
                            diff_qty
                        )
                    values
                        (
                            '${tNewCd}',
                            '1',
                            '${col.PO_CD}',
                            '${col.PO_SEQ}',
                            '${col.ORDER_CD}',
                            '${tInput.VENDOR_CD}',
                            '${col.MATL_CD}',
                            '${col.MOQ_QTY}',
                            '${col.MRP_QTY}',
                            '${col.STOCK_QTY}',
                            '${col.PO_QTY}',
                            '0',
                            '0',
                            '0',
                            '0',
                            '0',
                            '${col.CURR_CD}',
                            '${col.MASTER_PRICE}',
                            '${col.SURCHARGE_PRICE}',
                            '${col.SURCHARGE_AMT}',
                            '${col.SURCHARGE_REMARK}',
                            '${col.PO_PRICE}',
                            '0',
                            '${col.PO_QTY}',
                            '0'
                        )
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    insert into
                        ksv_stock_mem2_log (
                            pu_cd,
                            pu_seq,
                            po_cd,
                            po_seq,
                            order_cd,
                            vendor_cd,
                            matl_cd,
                            moq,
                            po_qty,
                            stock_qty,
                            po_qty2,
                            lc_qty,
                            in_qty,
                            out_qty,
                            infac_qty,
                            outfac_qty,
                            curr_cd,
                            master_price,
                            surcharge_price,
                            surcharge_amt,
                            surcharge_remark,
                            po_price,
                            bef_po_qty,
                            new_po_qty,
                            diff_qty
                        )
                    values
                        (
                            '${tNewCd}',
                            '999',
                            '${col.PO_CD}',
                            '${col.PO_SEQ}',
                            '${col.ORDER_CD}',
                            '${tInput.VENDOR_CD}',
                            '${col.MATL_CD}',
                            '${col.MOQ_QTY}',
                            '${col.MRP_QTY}',
                            '${col.STOCK_QTY}',
                            '${col.PO_QTY}',
                            '0',
                            '0',
                            '0',
                            '0',
                            '0',
                            '${col.CURR_CD}',
                            '${col.MASTER_PRICE}',
                            '${col.SURCHARGE_PRICE}',
                            '${col.SURCHARGE_AMT}',
                            '${col.SURCHARGE_REMARK}',
                            '${col.PO_PRICE}',
                            '0',
                            '${col.PO_QTY}',
                            '0'
                        )
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
                tObj.CODE = `ERROR:Purchase Reg(Step-2):(${e.message})`;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            // 금액재계산
            var tRet5 = await prisma.$queryRaw`
                select
                    isnull(sum(po_qty * po_price), 0) as mrp_amt,
                    isnull(sum(po_qty2 * po_price), 0) as po_amt,
                    isnull(sum(stock_qty * po_price), 0) as stock_amt
                from
                    ksv_stock_mem2
                where
                    pu_cd = ${tNewCd}
            `;
            var tOldMrpAmt = 0;
            var tOldPoAmt = 0;
            var tOldStockAmt = 0;
            tRet5.forEach((col, i) => {
                tOldMrpAmt = AFLib.numToFixed(parseFloat(col.mrp_amt), 2);
                tOldPoAmt = AFLib.numToFixed(parseFloat(col.po_amt), 2);
                tOldStockAmt = AFLib.numToFixed(parseFloat(col.stock_amt), 2);
            });
            console.log(
                `Old Amt(mrp, po, stock): ${tOldMrpAmt}/${tOldPoAmt}/${tOldStockAmt}`,
            );

            var tStsInAmt = 0;

            if (
                tVendorType === '4' ||
                tInput0.BILL_TO === 'BUYER' ||
                tInput0.VENDOR_CD === 'V0882' ||
                tInput0.VENDOR_CD === 'V0381' ||
                tInput0.VENDOR_CD === 'V0523'
            ) {
                tStsInAmt = tOldPoAmt;
            }

            tSQLArray = [];
            let tSQL99 = `
                update ksv_pu_mst2
                set
                    po_amt = ${tOldPoAmt},
                    stsin_amt = ${tStsInAmt},
                    bill_amt = ${tStsInAmt}
                where
                    pu_cd = '${tNewCd}'
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
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'SUCCEED:Purchase Reg:' + tNewCd;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = `ERROR:Purchase Reg(Step-3):(${e.message})`;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },
    },
};

export default moduleMutation_S040101_5;
