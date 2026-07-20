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
const moduleMutation_S0407_5 = {
    Mutation: {
        mgrInsert_S0407_5: async (_, args, contextValue) => {
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

            args.datas.forEach((col, i) => {
                var tInputQty = parseInt(col.COL1);
                var tPoQty = parseInt(col.PO_QTY);
                var tInQty = parseInt(col.IN_QTY);

                if (tInputQty > tPoQty + tInQty) {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = 'ERROR: IN_QTY가 너무 큽니다.';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }
                if (col.PO_SEQ < 98) {
                    if (
                        col.PO_CD.substring(2, 2) === 'PS' ||
                        col.PO_CD.substring(2, 2) === 'ES'
                    ) {
                        if (tInputQty / tPoQty > 1.3) {
                            var tRetArray = [];
                            var tObj = {};
                            tObj.CODE = 'ERROR: over 30%';
                            tObj.id = 0;
                            tRetArray.push(tObj);
                            return tRetArray;
                        }
                    }
                }
                if (col.PO_SEQ === 98 && col.MIN_CONF_USER === '') {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE =
                        'ERROR: Need Material Team Confirm for Over Input';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }
                if (col.PO_SEQ === 99 && col.MIN_CONF_USER === '') {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE =
                        'ERROR: Need Material Team Confirm for Mininum Order';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }
            });

            var tPoCd = '';
            var tSQLArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var tInput = { ...args.datas[tIdx] };
                tInput.USER_ID = AFLib.getUserInfo(contextValue).USER_ID;
                tInput.PAY_DATE = tNewDateStr;
                var tPoCd = tInput.PO_CD;

                var tInputQty = parseInt(tInput.IN_QTY);
                var tTotQty = parseInt(tInput.TOT_QTY);

                var tPoQty = parseInt(tInput.PO_QTY);
                var tBefInQty = parseInt(tInput.BEF_QTY);
                var tRemainQty = parseInt(tInput.REMAIN_QTY);

                var tSQL0 = `
                    select
                        order_status
                    from
                        ksv_order_mst
                    where
                        order_cd = '${tInput.ORDER_CD}'
                `;
                var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL0));
                if (parseInt(nRet0[0].order_status) > 7) continue;

                if (tInput.PO_SEQ === 99 && tInput.PO_CD_CNT === 0) {
                    var tSQL0 = `
                        select
                            use_qty
                        from
                            ksv_stock_matl
                        where
                            stock_idx = '${tInput.MIN_STOCK_IDX}'
                    `;
                    var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL0));
                    if (nRet0[0].use_qty > tInputQty) {
                        var tRetArray = [];
                        var tObj = {};
                        tObj.CODE = 'ERROR: used qty  is big';
                        tObj.id = 0;
                        tRetArray.push(tObj);
                        return tRetArray;
                    }

                    let tSQL99 = `
                        update ksv_stock_mem
                        set
                            in_qty = ${tInputQty},
                            stock_status = '1',
                            po_qty = ${tInputQty}
                        where
                            po_cd = '${tInput.PO_CD}'
                            and po_seq = ${tInput.PO_SEQ}
                            and order_cd = '${tInput.ORDER_CD}'
                            and matl_cd = '${tInput.MATL_CD}'
                            and mrp_seq = ${tInput.MRP_SEQ}
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
                        update ksv_po_mrp
                        set
                            use_qty = ${tInputQty},
                            po_qty = ${tInputQty}
                        where
                            po_cd = '${tInput.PO_CD}'
                            and po_seq = ${tInput.PO_SEQ}
                            and order_cd = '${tInput.ORDER_CD}'
                            and matl_cd = '${tInput.MATL_CD}'
                            and mrp_seq = ${tInput.MRP_SEQ}
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
                        update ksv_stock_matl
                        set
                            stock_qty = ${tInputQty},
                            remain_qty = ${tInputQty} - use_qty,
                            stock_date = '${tRetDate1}',
                            stock_status = 'N'
                        where
                            stock_idx = '${tInput.MIN_STOCK_IDX}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                } else if (tInput.PO_SEQ === 99 && tInputQty === 1) {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = 'ERROR: used qty  is 1';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                } else {
                    let tSQL99 = `
                        update ksv_stock_mem
                        set
                            in_qty = in_qty + ${tTotQty},
                            stock_status = '1',
                            po_qty = ${tInputQty}
                        where
                            po_cd = '${tInput.PO_CD}'
                            and po_seq = ${tInput.PO_SEQ}
                            and order_cd = '${tInput.ORDER_CD}'
                            and matl_cd = '${tInput.MATL_CD}'
                            and mrp_seq = ${tInput.MRP_SEQ}
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }

                let tSQL0 = `
                    select
                        'FC010' as in_factory_cd,
                        factory_cd as out_factory_cd
                    from
                        ksv_po_mst
                    where
                        po_cd = '${tPoCd}'
                `;
                let nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL0));

                var m_InFactoryCd = nRet0[0].in_factory_cd;
                var m_OutFactoryCd = nRet0[0].out_factory_cd;

                let tSQL0 = `
                    select
                        b.matl_price,
                        b.curr_cd,
                        a.matl_seq
                    from
                        ksv_po_mrp a,
                        kcd_matl_mem b
                    where
                        a.po_cd = '${tInput.PO_CD}'
                        and a.po_seq = ${tInput.PO_SEQ}
                        and a.order_cd = '${tInput.ORDER_CD}'
                        and a.matl_cd = '${tInput.MATL_CD}'
                        and a.mrp_seq = ${tInput.MRP_SEQ}
                        and b.matl_cd = a.matl_cd
                        and b.matl_seq = a.matl_seq
                `;
                let nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL0));

                var m_MatlPrice = 0;
                var m_CurrCd = '';
                var m_MatlSeq = 0;

                if (nRet0.length > 0) {
                    m_MatlPrice = nRet0[0].matl_price;
                    m_CurrCd = nRet0[0].curr_cd;
                    m_MatlSeq = nRet0[0].matl_seq;
                }

                let tSQL0 = `
                    select
                        isnull(max(matl_seq), 1) as matl_seq
                    from
                        kcd_matl_sale
                    where
                        matl_cd = '${tInput.MATL_CD}'
                `;
                let nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL0));
                var m_MatlSeq = nRet0[0].matl_seq;
                var m_InPrice = m_MatlPrice;

                var m_MinFlag = '0';
                var m_StockQty = 0;
                if (tInput.MIN_FLAG === '1') {
                    m_StockQty = tInputQty + tInQty - tPoQty;
                    m_MinFlag = '1';
                }

                if (tInput.PO_SEQ >= 97) {
                    m_MinFlag = '1';
                    m_StockQty = tInputQty;
                }

                var m_PayPrice = 0;
                if (tInput.VENDOR_TYPE === '4') m_PayPrice = 0;
                else {
                    m_PayPrice = m_MatlPrice;
                    if (m_PayPrice <= 0.00009) {
                        var tRetArray = [];
                        var tObj = {};
                        tObj.CODE = 'ERROR: price 0 cant be input';
                        tObj.id = 0;
                        tRetArray.push(tObj);
                        return tRetArray;
                    }
                }

                var m_MatlSaleSeq = 0;
                var m_LcBillNo = '';
                var m_StockIdx = '';

                if (tInput.PO_SEQ === 99) {
                } else if (tInput.PO_SEQ === 98) {
                    let tSQL0 = `
                        update ksv_stock_idx
                        set
                            idx = idx + 1
                    `;
                    let nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL0));

                    let tSQL0 = `
                        select
                            fac,
                            idx
                        from
                            ksv_stock_idx
                    `;
                    let nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL0));
                    var tStockIdx = nRet0[0].idx;
                    var t_Zero = '0000000000';
                    m_StockIdx =
                        'S' +
                        t_Zero.substring(0, 9 - String(tStockIdx)) +
                        String(tStockIdx);

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
                                root_idx
                            )
                        values
                            (
                                '${m_StockIdx}',
                                '${tInput.PO_CD}',
                                ${tInput.PO_SEQ},
                                '${tInput.ORDER_CD}',
                                '${tInput.MATL_CD}',
                                ${tInput.MRP_SEQ},
                                ${m_MatlSeq},
                                ${m_StockQty},
                                ${m_StockQty},
                                '0',
                                '${m_OutFactoryCd}',
                                'W',
                                '${tRetDate1}',
                                '02.Overship in tolerance3%(include payment)  5-05',
                                '02.Overship in tolerance3%(include payment)  5-05',
                                '05',
                                '0',
                                '${tInput.USER_ID}',
                                '${tRetDate}',
                                '${m_StockIdx}'
                            )
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                } else if (tInput.PO_SEQ === 97) {
                    let tSQL0 = `
                        update ksv_stock_idx
                        set
                            idx = idx + 1
                    `;
                    let nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL0));

                    let tSQL0 = `
                        select
                            fac,
                            idx
                        from
                            ksv_stock_idx
                    `;
                    let nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL0));
                    var tStockIdx = nRet0[0].idx;
                    var t_Zero = '0000000000';
                    m_StockIdx =
                        'S' +
                        t_Zero.substring(0, 9 - String(tStockIdx)) +
                        String(tStockIdx);

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
                                root_idx
                            )
                        values
                            (
                                '${m_StockIdx}',
                                '${tInput.PO_CD}',
                                ${tInput.PO_SEQ},
                                '${tInput.ORDER_CD}',
                                '${tInput.MATL_CD}',
                                ${tInput.MRP_SEQ},
                                ${m_MatlSeq},
                                ${m_StockQty},
                                ${m_StockQty},
                                '0',
                                '${m_OutFactoryCd}',
                                'Z',
                                '${tRetDate1}',
                                '03.Supplier sent/overship by FOC C-06',
                                '03.Supplier sent/overship by FOC C-06',
                                '06',
                                '0',
                                '${tInput.USER_ID}',
                                '${tRetDate}',
                                '${m_StockIdx}'
                            )
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }

                var m_InType = '';
                if (tTotQty > 0) {
                    m_InType = '1';
                } else {
                    m_InType = '5';
                }

                let tSQL99 = `
                    insert into
                        ksv_stock_in (
                            po_cd,
                            po_seq,
                            order_cd,
                            matl_cd,
                            mrp_seq,
                            matl_seq,
                            in_datetime,
                            in_qty,
                            tot_qty,
                            in_price,
                            in_curr_cd,
                            in_type,
                            in_status,
                            in_factory_cd,
                            out_qty,
                            out_status,
                            pay_date,
                            status_cd,
                            reg_user,
                            reg_datetime,
                            pay_price,
                            pay_curr_cd,
                            exch_rate,
                            usd_amt,
                            bill_date,
                            min_flag,
                            stock_qty,
                            stock_idx,
                            matl_sale_seq,
                            lc_bill_no
                        )
                    values
                        (
                            '${tInput.PO_CD}',
                            ${tInput.PO_SEQ},
                            '${tInput.ORDER_CD}',
                            '${tInput.MATL_CD}',
                            ${tInput.MRP_SEQ},
                            ${m_MatlSeq},
                            '${tRetDate1}',
                            ${tInputQty},
                            ${tTotQty},
                            ${m_InPrice},
                            '${m_CurrCd}',
                            '${m_InType}',
                            '1',
                            '${m_InFactoryCd}',
                            0,
                            '0',
                            '${tInput.PAY_DATE}',
                            '0',
                            '${tInput.USER_ID}',
                            '${tRetDate}',
                            ${m_PayPrice},
                            '${m_CurrCd}',
                            0,
                            0,
                            '',
                            '${m_MinFlag}',
                            ${m_StockQty},
                            '${m_StockIdx}',
                            ${m_MatlSaleSeq},
                            '${m_LcBillNo}'
                        )
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL0 = `
                    select
                        stock_idx
                    from
                        ksv_stock_matl
                    where
                        po_cd = '${tInput.PO_CD}'
                        and po_seq = ${tInput.PO_SEQ}
                        and order_cd = '${tInput.ORDER_CD}'
                        and matl_cd = '${tInput.MATL_CD}'
                        and mrp_seq = ${tInput.MRP_SEQ}
                        and stock_status = 'M'
                        and reg_datetime = '${tRetDate}'
                `;
                let nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL0));
                var m_UpdateStockIdx = '';
                if (nRet0.length > 0) m_UpdateStockIdx = nRet0[0].stock_idx;

                let tSQL99 = `
                    update ksv_stock_in
                    set
                        stock_idx = '${m_UpdateStockIdx}'
                    where
                        po_cd = '${tInput.PO_CD}'
                        and po_seq = ${tInput.PO_SEQ}
                        and order_cd = '${tInput.ORDER_CD}'
                        and matl_cd = '${tInput.MATL_CD}'
                        and mrp_seq = ${tInput.MRP_SEQ}
                        and reg_datetime = '${tRetDate}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    update kzz_delay_action
                    set
                        in_qty = in_qty + ${tTotQty}
                    where
                        po_cd = '${tInput.PO_CD}'
                        and matl_cd = '${tInput.MATL_CD}'
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
                tObj.CODE = 'SUCCEED:STOCK_IN:' + args.datas.length;
                tObj.id = 0;
                tRetArray.push(tObj);
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:STOCK_IN';
                tObj.id = 0;
                tRetArray.push(tObj);
            }

            return tRetArray;
        },
    },
};

export default moduleMutation_S0407_5;
