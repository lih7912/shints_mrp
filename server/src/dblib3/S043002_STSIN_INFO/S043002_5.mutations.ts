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
const moduleMutation_S043002_5 = {
    Mutation: {
        mgrUpdate_S043002_5: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput_MST = { ...args.datas };
            var tInput_MEM = [...args.datas1];

            var tIdx0 = 0;
            for (tIdx0 = 0; tIdx0 < tInput_MEM.length; tIdx0++) {
                var tOne = { ...tInput_MEM[tIdx0] };

                var tSQLArray = [];

                var sql0 = `
                    select
                        b.facin_cd,
                        b.stsout_cd
                    from
                        ksv_stock_out_mst a,
                        ksv_stock_facin b
                    where
                        a.stsin_cd = '${tInput_MST.STSIN_CD}'
                        and a.stsout_cd = b.stsout_cd
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                if (tRet0.length > 0) {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE =
                        'ERROR:이미 회계처리된 데이타 입니다. 전산팀에 문의하세요.';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }

                var tSQL = `
                    select
                        count(*) as t_cnt
                    from
                        ksv_stock_out
                    where
                        stsin_cd = '${tInput_MST.STSIN_CD}'
                `;
                var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
                var tOutRecordCnt = 0;
                if (nRet0.length > 0) tOutRecordCnt = nRet0[0].t_cnt;
                if (tOutRecordCnt > 0 && tInput_MST.BILL_TO === 'SHINTS') {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = 'ERROR:Cannot Update Alraedy Sts Out .';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }

                var tSQL1 = `
                    select
                        *
                    from
                        ksv_stock_in_mst
                    where
                        stsin_cd = '${tInput_MST.STSIN_CD}'
                `;
                var nRet1 = await prisma.$queryRaw(Prisma.raw(tSQL1));

                var tCheck_EndFlag = 0;
                var tCheck_BillFlag = 0;

                nRet1.forEach((col, i) => {
                    if (col.END_FLAG === '1') tCheck_EndFlag += 1;
                    if (col.BILL_FLAG === '1') tCheck_BillFlag += 1;
                });

                if (tCheck_EndFlag > 0 || tCheck_BillFlag > 0) {
                    if (tInput_MST.BILL_TO === 'SHINTS') {
                        var tRetArray = [];
                        var tObj = {};
                        tObj.CODE =
                            'ERROR:Cannot Update Alraedy Matl Amt End or TaxBill .';
                        tObj.id = 0;
                        tRetArray.push(tObj);
                        return tRetArray;
                    }
                }

                /*
          try {
             global.currentTransactionInfo = { contextValue: contextValue, functionName: AFLib.getFunctionName() } 
        await prisma.$transaction(tSQLArray);
        delete global.currentTransactionInfo;
          } catch (e) {
             var tRetArray = [];
             var tObj = {};
             tObj.CODE = 'ERROR:Cancel STOCK_IN';
             tObj.id = 0; 
             tRetArray.push(tObj);
          }
          */
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED:Update STS IN';
            tObj.id = 0;
            tRetArray.push(tObj);
            return tRetArray;
        },

        mgrInsert_S043002_5_fullin: async (_, args, contextValue) => {
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
            var tInEdit = { ...args.datas };
            var tInPuMst = { ...args.datas1[0] };
            var tInStockMem = [...args.datas2];

            var tSQLArray = [];

            var tPurFactory = '';
            var tPayBank = '';
            var tAccountNo = '';
            var tSQL = `
                select
                    a.vendor_type,
                    b.bank_cd,
                    c.account_no
                from
                    kcd_vendor a,
                    kcd_vendor_bank b,
                    kcd_bank c
                where
                    a.vendor_cd = '${tInPuMst.VENDOR_CD}'
                    and a.vendor_cd = b.vendor_cd
                    and b.bank_cd = c.bank_cd
            `;
            var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
            if (nRet0.length > 0) {
                tPurFactory = nRet0[0].vendor_type;
                tPayBank = nRet0[0].bank_cd;
                tAccountNo = nRet0[0].account_no;
            }

            var tPuMst2 = {};
            var tSQL1 = `
                select
                    *
                from
                    ksv_pu_mst2
                where
                    pu_cd = '${tInPuMst.PU_CD}'
            `;
            var nRet1 = await prisma.$queryRaw(Prisma.raw(tSQL1));
            if (nRet1.length > 0) tPuMst2 = { ...nRet1[0] };

            var tPayReport = '';
            var tLcFlag = '0';
            if (parseFloat(tPuMst2.LC_AMT) > 0) {
                tPayReport = `LC_BILL-${tUserInfo.USER_ID}-${tRetDate}`;
                tLcFlag = '1';
                // 엑셀생성
            } else if (parseFloat(tPuMst2.DEPOSIT_AMT) > 0) {
                tPayReport = `Deposit_BILL-${tUserInfo.USER_ID}-${tRetDate}`;
                // 엑셀생성
            } else if (tPurFactory === '3') {
                //수입자재
                tPayReport = `STSIMPORT_BILL-${tUserInfo.USER_ID}-${tRetDate}`;
                // 엑셀생성
            } else {
                tPayReport = `STS_BILL-${tUserInfo.USER_ID}-${tRetDate}`;
            }

            let tSQL99 = `
                update ksv_pu_mst2
                set
                    pur_factory = '${tPurFactory}',
                    payer = '${tInPuMst.BILL_TO}',
                    -- pay_type = '${tInPuMst.PAY_CONDITION}',
                    pay_type = '${tInEdit.PAY_TYPE}',
                    pay_date = '${tInEdit.PAY_DATE}',
                    pay_report = '${tPayReport}',
                    pay_bank = '${tPayBank}'
                where
                    pu_cd = '${tInPuMst.PU_CD}'
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
                tObj.CODE = 'ERROR:STOCK_IN';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tSQLArray = [];

            var chkPo_moq = '0';
            var chkPo_over = '0';
            var chkPo_foc = '0';

            /*
      var sql0 = `
          select
              isnull(max(right(stsout_cd, 6)), '000000') as stsout_seq
          from
              ksv_stock_out_mst
          where
              stsout_cd like 'STSOUT23-%'
      `;
      var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
      var nMaxSeq = parseInt(nRet0[0].stsout_seq)  + 1;
*/
            var tYY2 = tRetDate.substring(2, 4);
            var tSEQ = tRetDate.substring(4, 14);

            var tZero = '000000';
            var tNewStsOutCd = `SO${tYY2}-${tSEQ}`;
            var mNewStsOutCd = tNewStsInCd;

            /*
      var sql0 = `
          select
              isnull(max(right(stsin_cd, 6)), '000000') as stsout_seq
          from
              ksv_stock_in_mst
          where
              stsin_cd like 'STSIN23-%'
      `;
      var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
      var nMaxSeq = parseInt(nRet0[0].stsout_seq)  + 1;
*/
            var tZero = '000000';
            var tNewStsInCd = `SI${tYY2}-${tSEQ}`;
            var mNewStsInCd = tNewStsInCd;

            var tIdx1 = 0;
            var tInQty = 0;
            var tInAmt = 0;
            for (tIdx1 = 0; tIdx1 < args.datas2.length; tIdx1++) {
                var col = { ...args.datas2[tIdx1] };
                tInQty += parseFloat(col.PO_QTY);
                tInAmt += parseFloat(col.PO_QTY) * parseFloat(col.PO_PRICE);
            }

            //
            let tSQL99 = `
                insert into
                    ksv_stock_in_mst (
                        stsin_cd,
                        pu_cd,
                        in_datetime,
                        reg_user,
                        reg_datetime,
                        payer,
                        pay_date,
                        pay_type,
                        in_qty,
                        in_curr_cd,
                        in_amt,
                        vendor_cd,
                        pur_factory,
                        pay_bank,
                        out_qty,
                        facin_qty,
                        facout_qty,
                        pay_term,
                        stsin_amt,
                        moq_amt,
                        moq_curr,
                        surchase_amt,
                        surchase_curr,
                        overshort
                    )
                values
                    (
                        '${tNewStsInCd}',
                        '${tInPuMst.PU_CD}',
                        '${tRetDate}',
                        '${tUserInfo.USER_ID}',
                        '${tRetDate}',
                        '${tInEdit.BILL_TO}',
                        '${tInEdit.PAY_DATE}',
                        '${tInEdit.PAY_TYPE}',
                        '${tInQty}',
                        '${tInPuMst.CURR_CD}',
                        '${tInAmt}',
                        '${tInPuMst.VENDOR_CD}',
                        '${tPurFactory}',
                        '${tPayBank}',
                        '0',
                        '0',
                        '0',
                        '${tInEdit.PAY_TERM}',
                        '${tInEdit.STS_IN_AMT}',
                        '${tInEdit.MOQ_AMT}',
                        '${tInEdit.MOQ_AMT_CURR}',
                        '${tInEdit.SURCHARGE_AMT}',
                        '${tInEdit.SURCHARGE_AMT_CURR}',
                        '${tInEdit.OVER_SHORT}'
                    )
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            if (tInEdit.BILL_TO === 'BVT' || tInEdit.BILL_TO === 'ETP') {
                // PAYER : 1(BVT), 2(ETP)
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
                            eta
                        )
                    values
                        (
                            '${tNewStsOutCd}',
                            '${tNewStsInCd}',
                            '${tInPuMst.PU_CD}',
                            '${tRetDate}',
                            '${tUserInfo.USER_ID}',
                            '${tRetDate}',
                            '',
                            '',
                            '',
                            '',
                            '',
                            '0',
                            '0',
                            '',
                            '',
                            ''
                        )
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            }

            tIdx1 = 0;
            for (tIdx1 = 0; tIdx1 < args.datas2.length; tIdx1++) {
                // tSQLArray = [];
                var tNewMrpSeq = 0;
                var col = { ...args.datas2[tIdx1] };

                var mTotQty =
                    parseFloat(col.MRP_QTY) -
                    parseFloat(col.STOCK_QTY) +
                    parseFloat(col.MOQ_QTY) +
                    parseFloat(col.LEFTOVER_QTY) -
                    parseFloat(col.STSIN_QTY);
                var mPoQty = parseFloat(col.PO_QTY);
                var mResultPoQty =
                    parseFloat(col.STSIN_QTY) + parseFloat(col.PO_QTY);
                var tInPercent = (mPoQty / mTotQty) * 100.0;

                let tSQL98_2 = `
                    select
                        *
                    from
                        ksv_stock_mem
                    where
                        pu_cd = '${tInPuMst.PU_CD}'
                        and po_cd = '${col.PO_CD}'
                        and matl_cd = '${col.MATL_CD}'
                        and po_seq < 97
                        and po_qty > 0
                `;
                let nRet98_2 = await prisma.$queryRaw(Prisma.raw(tSQL98_2));

                var tInDateTime = AFLib.getCurrTime();
                var tBuyerCd = '';

                var tIdx2 = 0;
                var tOrderCd = '';

                for (tIdx2 = 0; tIdx2 < nRet98_2.length; tIdx2++) {
                    var col0 = { ...nRet98_2[tIdx2] };
                    if (tIdx2 === 0) tOrderCd = col0.ORDER_CD;

                    var tBefQty = parseInt(col0.PO_QTY) - parseInt(col0.IN_QTY);
                    var tInQty = parseInt((tBefQty * tInPercent) / 100.0);
                    if (tInPercent > 98.0) tInQty = col0.PO_QTY;

                    var tTotQty = tBefQty + tInQty;

                    tBuyerCd = col0.ORDER_CD.substring(0, 2);

                    let tSQL99 = `
                        update ksv_stock_mem
                        set
                            in_qty = in_qty + '${tInQty}',
                            stock_status = '1'
                        where
                            po_cd = '${col0.PO_CD}'
                            and po_seq = '${col0.PO_SEQ}'
                            and order_cd = '${col0.ORDER_CD}'
                            and matl_cd = '${col0.MATL_CD}'
                            and mrp_seq = '${col0.MRP_SEQ}'
                            and matl_seq = '${col0.MATL_SEQ}'
                            -- and  stock_status ='0' 
                            and pu_cd = '${tInPuMst.PU_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
                        insert into
                            ksv_stock_in (
                                PO_CD,
                                PO_SEQ,
                                ORDER_CD,
                                MATL_CD,
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
                                STSIN_CD
                            )
                        values
                            (
                                '${col0.PO_CD}',
                                '${col0.PO_SEQ}',
                                '${col0.ORDER_CD}',
                                '${col0.MATL_CD}',
                                '${col0.MRP_SEQ}',
                                '${col0.MATL_SEQ}',
                                '${tInDateTime}',
                                '${tInQty}',
                                '${tTotQty}',
                                '${col.PO_PRICE}',
                                '${col.CURR_CD}',
                                '1',
                                '1',
                                '',
                                '0',
                                '0',
                                '${tInEdit.PAY_DATE}',
                                '0',
                                '${tUserInfo.USER_ID}',
                                '${tRetDate}',
                                '',
                                '${col.PO_PRICE}',
                                '${tInEdit.PAY_TYPE}',
                                '${tPurFactory}',
                                '${tInPuMst.PU_CD}',
                                '${tPayReport}',
                                '${tInEdit.PAY_TYPE}',
                                '${tNewStsInCd}'
                            )
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    var tOutQty = '';
                    var tStockStatus = '';

                    if (
                        tInEdit.BILL_TO === 'BVT' ||
                        tInEdit.BILL_TO === 'ETP'
                    ) {
                        // PAYER : 1(BVT), 2(ETP)

                        tOutQty = tInQty;
                        tStockStatus = '2';

                        let tSQL99 = `
                            update ksv_stock_mem
                            set
                                out_qty = out_qty + ${tInQty},
                                stock_status = '2'
                            where
                                po_cd = '${col0.PO_CD}'
                                and po_seq = '${col0.PO_SEQ}'
                                and order_cd = '${col0.ORDER_CD}'
                                and matl_cd = '${col0.MATL_CD}'
                                and mrp_seq = '${col0.MRP_SEQ}'
                                and matl_seq = '${col0.MATL_SEQ}'
                                -- and  stock_status ='0' 
                                and pu_cd = '${tInPuMst.PU_CD}'
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);

                        let tSQL99 = `
                            update ksv_stock_in
                            set
                                out_qty = out_qty + ${tOutQty}
                            where
                                po_cd = '${col0.PO_CD}'
                                and po_seq = '${col0.PO_SEQ}'
                                and order_cd = '${col0.ORDER_CD}'
                                and matl_cd = '${col0.MATL_CD}'
                                and mrp_seq = '${col0.MRP_SEQ}'
                                and matl_seq = '${col0.MATL_SEQ}'
                                and in_qty = ${col0.IN_QTY}
                                and pu_cd = '${tInPuMst.PU_CD}'
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);

                        var tFactoryCd = 'FC000';
                        var tOutType = '4';
                        if (col0.FACTORY_CD === 'FC034') {
                            tFactoryCd = 'FC034';
                            tOutType = '2';
                        }
                        if (col0.FACTORY_CD === 'FC044') {
                            tFactoryCd = 'FC044';
                            tOutType = '3';
                        }
                        if (col0.FACTORY_CD === 'FC010') {
                            tFactoryCd = 'FC010';
                            tOutType = '1';
                        }

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
                                    '${tInDateTime}',
                                    '${tRetDate}',
                                    ${tOutQty},
                                    '${tOutType}',
                                    '0',
                                    '',
                                    '',
                                    '${tRetDate1}',
                                    '0',
                                    '',
                                    '',
                                    '${tFactoryCd}',
                                    '0',
                                    '${tUserInfo.USER_ID}',
                                    '${tRetDate}',
                                    '${tInPuMst.PU_CD}',
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
                        tSQLArray.push(tSQL99_1);
                    }
                }

                var tSQL = `
                    select
                        max(mrp_seq) as max_mrp_seq
                    from
                        ksv_po_mrp
                    where
                        po_cd = '${col.PO_CD}'
                `;
                var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
                tNewMrpSeq = nRet0[0].max_mrp_seq + 1;

                var t_MOQ_STOCK_IDX = '';
                var t_LEFTOVER_STOCK_IDX = '';
                var t_FOC_STOCK_IDX = '';

                if (col.MOQ_QTY > 0) {
                    // minimum - 99

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
                        t_Zero.substring(0, 9 - String(tStockIdx)) +
                        String(tStockIdx);
                    var m_OutFactoryCd = 'FC034';

                    t_MOQ_STOCK_IDX = m_StockIdx;

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
                                '${col.PO_CD}',
                                '${tPoSeq}',
                                '${tOrderCd}',
                                '${col.MATL_CD}',
                                '${tNewMrpSeq}',
                                '1',
                                ${col.MOQ_QTY},
                                ${col.MOQ_QTY},
                                '0',
                                '${m_OutFactoryCd}',
                                'W',
                                '${tRetDate1}',
                                '03.MOQ',
                                '03.MOQ',
                                '03',
                                '0',
                                '${tUserInfo.USER_ID}',
                                '${tRetDate}',
                                '${m_StockIdx}'
                            )
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

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
                                reg_datetime
                            )
                        values
                            (
                                '${col.PO_CD}',
                                '${tPoSeq}',
                                '${tOrderCd}',
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
                                '${tRetDate}'
                            )
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

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
                                pu_cd
                            )
                        VALUES
                            (
                                '${col.PO_CD}',
                                '${tPoSeq}',
                                '${tOrderCd}',
                                '${col.MATL_CD}',
                                '${tNewMrpSeq}',
                                '1',
                                '${col.MOQ_QTY}',
                                '${col.MOQ_QTY}',
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
                                '${tInPuMst.PU_CD}'
                            )
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    if (chkPo_moq === '0') {
                        let tSQL99 = `
                            insert into
                                ksv_po_mst
                            select
                                PO_CD,
                                '${tPoSeq}',
                                PO_TYPE,
                                '${tRetDate1}',
                                PO_STATUS,
                                MATL_DUE_DATE,
                                PROD_DUE_DATE,
                                PO_CONF_DATE,
                                PLACE_CD,
                                '${tRetDate1}',
                                FACTORY_CD,
                                DELIVERY_TYPE,
                                YY,
                                SEQ,
                                PO_USER_MAIN,
                                PO_USER_SUB,
                                CLOSE_FLAG,
                                CLOSE_USER,
                                CLOSE_DATETIME,
                                STATUS_CD,
                                '${tUserInfo.USER_ID}',
                                '${tRetDate1}',
                                REMARK,
                                PLAN_FLAG,
                                PLAN_ETD,
                                PLAN_ETA,
                                BVT_FLAG,
                                ENTRY,
                                ENTRY_DATE,
                                NEW_FLAG,
                                STOCK_MOVE_DATE
                            from
                                ksv_po_mst
                            where
                                po_cd = '${col.PO_CD}'
                                and po_seq = '1'
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);
                        chkPo_moq = '1';
                    }
                }

                if (col.LEFTOVER_QTY > 0) {
                    var tPoSeq = '98';
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
                    if (nRet0.length > 0 && nRet0[0].t_cnt > 0)
                        chkPo_over = '1';

                    let tSQL98_1 = `
                        update ksv_stock_idx
                        set
                            idx = idx + 1
                    `;
                    const nSQL98_1 = await prisma.$queryRaw(
                        Prisma.raw(tSQL98_1),
                    );

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
                        t_Zero.substring(0, 9 - String(tStockIdx)) +
                        String(tStockIdx);
                    var m_OutFactoryCd = 'FC034';

                    t_LEFTOVER_STOCK_IDX = m_StockIdx;

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
                                '${col.PO_CD}',
                                '1',
                                '${tOrderCd}',
                                '${col.MATL_CD}',
                                '0',
                                '1',
                                ${col.LEFTOVER_QTY},
                                ${col.LEFTOVER_QTY},
                                '0',
                                '${m_OutFactoryCd}',
                                'W',
                                '${tRetDate1}',
                                '02.Overship in tolerance3%(include payment)  5-05',
                                '02.Overship in tolerance3%(include payment)  5-05',
                                '05',
                                '0',
                                '${tUserInfo.USER_ID}',
                                '${tRetDate}',
                                '${m_StockIdx}'
                            )
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

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
                                reg_datetime
                            )
                        values
                            (
                                '${col.PO_CD}',
                                '${tPoSeq}',
                                '${tOrderCd}',
                                '${col.MATL_CD}',
                                '${tNewMrpSeq}',
                                '1',
                                '${col.MASTER_PRICE}',
                                '',
                                '${col.LEFTOVER_QTY}',
                                '${col.LEFTOVER_QTY}',
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
                                '${tRetDate}'
                            )
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

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
                                pu_cd
                            )
                        VALUES
                            (
                                '${col.PO_CD}',
                                '${tPoSeq}',
                                '${tOrderCd}',
                                '${col.MATL_CD}',
                                '${tNewMrpSeq}',
                                '1',
                                '${col.LEFTOVER_QTY}',
                                '${col.LEFTOVER_QTY}',
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
                                '${col.ORDER_CD}',
                                '${tInPuMst.PU_CD}'
                            )
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    if (chkPo_over === '0') {
                        let tSQL99 = `
                            insert into
                                ksv_po_mst
                            select
                                PO_CD,
                                '${tPoSeq}',
                                PO_TYPE,
                                '${tRetDate1}',
                                PO_STATUS,
                                MATL_DUE_DATE,
                                PROD_DUE_DATE,
                                PO_CONF_DATE,
                                PLACE_CD,
                                '${tRetDate1}',
                                FACTORY_CD,
                                DELIVERY_TYPE,
                                YY,
                                SEQ,
                                PO_USER_MAIN,
                                PO_USER_SUB,
                                CLOSE_FLAG,
                                CLOSE_USER,
                                CLOSE_DATETIME,
                                STATUS_CD,
                                '${tUserInfo.USER_ID}',
                                '${tRetDate1}',
                                REMARK,
                                PLAN_FLAG,
                                PLAN_ETD,
                                PLAN_ETA,
                                BVT_FLAG,
                                ENTRY,
                                ENTRY_DATE,
                                NEW_FLAG,
                                STOCK_MOVE_DATE
                            from
                                ksv_po_mst
                            where
                                po_cd = '${col.PO_CD}'
                                and po_seq = '1'
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);
                        chkPo_over = '1';
                    }
                }

                if (col.FOC_QTY > 0) {
                    var tPoSeq = '97';
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
                    if (nRet0.length > 0 && nRet0[0].t_cnt > 0) chkPo_foc = '1';

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
                        t_Zero.substring(0, 9 - String(tStockIdx)) +
                        String(tStockIdx);
                    var m_OutFactoryCd = 'FC034';

                    t_FOC_STOCK_IDX = m_StockIdx;

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
                                '${col.PO_CD}',
                                '1',
                                '${tOrderCd}',
                                '${col.MATL_CD}',
                                '1',
                                '1',
                                ${col.FOC_QTY},
                                ${col.FOC_QTY},
                                '0',
                                '${m_OutFactoryCd}',
                                'W',
                                '${tRetDate1}',
                                '03.Supplier sent/overship by FOC C-06',
                                '03.Supplier sent/overship by FOC C-06',
                                '06',
                                '0',
                                '${tUserInfo.USER_ID}',
                                '${tRetDate}',
                                '${m_StockIdx}'
                            )
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

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
                                reg_datetime
                            )
                        values
                            (
                                '${col.PO_CD}',
                                '${tPoSeq}',
                                '${tOrderCd}',
                                '${col.MATL_CD}',
                                '${tNewMrpSeq}',
                                '1',
                                '${col.MASTER_PRICE}',
                                '',
                                '${col.FOC_QTY}',
                                '${col.FOC_QTY}',
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
                                '${tRetDate}'
                            )
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

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
                                pu_cd
                            )
                        VALUES
                            (
                                '${col.PO_CD}',
                                '${tPoSeq}',
                                '${tOrderCd}',
                                '${col.MATL_CD}',
                                '${tNewMrpSeq}',
                                '1',
                                '${col.FOC_QTY}',
                                '${col.FOC_QTY}',
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
                                '${col.ORDER_CD}'
                            )
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    if (chkPo_foc === '0') {
                        let tSQL99 = `
                            insert into
                                ksv_po_mst
                            select
                                PO_CD,
                                '${tPoSeq}',
                                PO_TYPE,
                                '${tRetDate1}',
                                PO_STATUS,
                                MATL_DUE_DATE,
                                PROD_DUE_DATE,
                                PO_CONF_DATE,
                                PLACE_CD,
                                '${tRetDate1}',
                                FACTORY_CD,
                                DELIVERY_TYPE,
                                YY,
                                SEQ,
                                PO_USER_MAIN,
                                PO_USER_SUB,
                                CLOSE_FLAG,
                                CLOSE_USER,
                                CLOSE_DATETIME,
                                STATUS_CD,
                                '${tUserInfo.USER_ID}',
                                '${tRetDate1}',
                                REMARK,
                                PLAN_FLAG,
                                PLAN_ETD,
                                PLAN_ETA,
                                BVT_FLAG,
                                ENTRY,
                                ENTRY_DATE,
                                NEW_FLAG,
                                STOCK_MOVE_DATE
                            from
                                ksv_po_mst
                            where
                                po_cd = '${col.PO_CD}'
                                and po_seq = '1'
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);
                        chkPo_foc = '1';
                    }
                }

                if (parseFloat(col.MOQ_QTY) > 0) {
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
                                cost_value
                            )
                        values
                            (
                                '${tBuyerCd}',
                                '${tRetDate1}',
                                '${tInPuMst.PU_CD}',
                                '${col.PO_CD}',
                                '${col.MATL_CD}',
                                '',
                                '',
                                'STS_IN',
                                'MOQ',
                                '${col.CURR_CD}',
                                '${col.MOQ_QTY}',
                                '${tUserInfo.USER_ID}',
                                '',
                                '',
                                '${tInPuMst.VENDOR_CD}',
                                '${col.MOQ_QTY}'
                            )
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }
                if (parseFloat(col.SURCHARGE_AMT) > 0) {
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
                                cost_value
                            )
                        values
                            (
                                '${tBuyerCd}',
                                '${tRetDate1}',
                                '${tInPuMst.PU_CD}',
                                '${col.PO_CD}',
                                '${col.MATL_CD}',
                                '',
                                '',
                                'STS_IN',
                                'Surcharge',
                                '${col.CURR_CD}',
                                '${col.SURCHARGE_AMT}',
                                '${tUserInfo.USER_ID}',
                                '',
                                '',
                                '${tInPuMst.VENDOR_CD}',
                                '${col.SURCHARGE_AMT}'
                            )
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }

                // STOCK_MEM2_STSIN (STSIN Log기록)
                var tTableObj = {};
                tTableObj.PO_CD = col.PO_CD;
                tTableObj.PO_SEQ = col.PO_SEQ;
                tTableObj.MATL_CD = col.MATL_CD;
                tTableObj.MATL_SEQ = col.MATL_SEQ;
                tTableObj.VENDOR_CD = tInPuMst.VENDOR_CD;
                tTableObj.PU_CD = tInPuMst.PU_CD;
                tTableObj.STSIN_CD = tNewStsInCd;
                tTableObj.STSIN_TYPE = 'FULL';
                tTableObj.MASTER_PRICE = col.MASTER_PRICE;
                tTableObj.CURR_CD = col.CURR_CD;
                tTableObj.PO_PRICE = col.PO_PRICE;
                tTableObj.SURCHARGE_AMT = col.SURCHARGE_AMT;
                tTableObj.SURCHARGE_PRICE = col.SURCHARGE_PRICE;
                tTableObj.SURCHARGE_REMARK = col.SURCHARGE_REMARK;
                tTableObj.MRP_QTY = col.MRP_QTY;
                tTableObj.STOCK_QTY = col.STOCK_QTY;
                tTableObj.MOQ_QTY = col.MOQ_QTY;
                tTableObj.OVERSHORT_QTY = col.LEFTOVER_QTY;
                tTableObj.PO_QTY = mResultPoQty;
                tTableObj.PARTIN_QTY = col.STSIN_QTY;
                tTableObj.STSIN_QTY = mPoQty;
                tTableObj.FOC_QTY = col.FOC_QTY;
                tTableObj.SHIP_QTY = col.SHIP_QTY;
                tTableObj.MOQ_STOCK_IDX = t_LEFTOVER_STOCK_IDX;
                tTableObj.LEFTOVER_STOCK_IDX = t_LEFTOVER_STOCK_IDX;
                tTableObj.FOC_STOCK_IDX = t_FOC_STOCK_IDX;
                tTableObj.OUT_QTY = '0';
                let tSQL99 = AFLib.createTableSql(
                    'KSV_STOCK_MEM2_STSIN',
                    tTableObj,
                );
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                // STOCK_MEM2
                if (tInEdit.BILL_TO === 'BVT' || tInEdit.BILL_TO === 'ETP') {
                    // PAYER : 1(BVT), 2(ETP)
                    let tSQL99 = `
                        update ksv_stock_mem2
                        set
                            in_qty = in_qty + '${mPoQty}',
                            out_qty = out_qty + '${mPoQty}',
                            stock_status = '2',
                            moq = '${col.MOQ_QTY}',
                            leftover_qty = '${col.LEFTOVER_QTY}',
                            foc_qty = '${col.FOC_QTY}',
                            -- po_qty2 = '${mResultPoQty}',
                            curr_cd = '${col.CURR_CD}',
                            master_price = '${col.MASTER_PRICE}',
                            surcharge_amt = '${col.SURCHARGE_AMT}',
                            surcharge_price = '${col.SURCHARGE_PRICE}',
                            po_price = '${col.PO_PRICE}',
                            moq_stock_idx = '${t_MOQ_STOCK_IDX}',
                            leftover_stock_idx = '${t_LEFTOVER_STOCK_IDX}',
                            foc_stock_idx = '${t_FOC_STOCK_IDX}'
                        where
                            po_cd = '${col.PO_CD}'
                            -- and  po_seq='${col.PO_SEQ}' 
                            and matl_cd = '${col.MATL_CD}'
                            and pu_cd = '${tInPuMst.PU_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                } else {
                    let tSQL99 = `
                        update ksv_stock_mem2
                        set
                            in_qty = in_qty + '${mPoQty}',
                            stock_status = '1',
                            moq = '${col.MOQ_QTY}',
                            leftover_qty = '${col.LEFTOVER_QTY}',
                            foc_qty = '${col.FOC_QTY}',
                            -- po_qty2 = '${mResultPoQty}',
                            curr_cd = '${col.CURR_CD}',
                            master_price = '${col.MASTER_PRICE}',
                            surcharge_amt = '${col.SURCHARGE_AMT}',
                            surcharge_price = '${col.SURCHARGE_PRICE}',
                            po_price = '${col.PO_PRICE}',
                            moq_stock_idx = '${t_MOQ_STOCK_IDX}',
                            leftover_stock_idx = '${t_LEFTOVER_STOCK_IDX}',
                            foc_stock_idx = '${t_FOC_STOCK_IDX}'
                        where
                            po_cd = '${col.PO_CD}'
                            -- and  po_seq='${col.PO_SEQ}' 
                            and matl_cd = '${col.MATL_CD}'
                            and pu_cd = '${tInPuMst.PU_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
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
                tObj.CODE = 'SUCCEED:STOCK_IN:' + args.datas.length;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:STOCK_IN';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },

        mgrInsert_S043002_5_partin: async (_, args, contextValue) => {
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
            var tInEdit = { ...args.datas };
            var tInPuMst = { ...args.datas1[0] };
            var tInStockMem = [...args.datas2];

            var tSQLArray = [];

            var tPurFactory = '';
            var tPayBank = '';
            var tAccountNo = '';
            var tSQL = `
                select
                    a.vendor_type,
                    b.bank_cd,
                    c.account_no
                from
                    kcd_vendor a,
                    kcd_vendor_bank b,
                    kcd_bank c
                where
                    a.vendor_cd = '${tInPuMst.VENDOR_CD}'
                    and a.vendor_cd = b.vendor_cd
                    and b.bank_cd = c.bank_cd
            `;
            var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
            if (nRet0.length > 0) {
                tPurFactory = nRet0[0].vendor_type;
                tPayBank = nRet0[0].bank_cd;
                tAccountNo = nRet0[0].account_no;
            }

            var tPuMst2 = {};
            var tSQL1 = `
                select
                    *
                from
                    ksv_pu_mst2
                where
                    pu_cd = '${tInPuMst.PU_CD}'
            `;
            var nRet1 = await prisma.$queryRaw(Prisma.raw(tSQL1));
            if (nRet1.length > 0) tPuMst2 = { ...nRet1[0] };

            var tPayReport = '';
            var tLcFlag = '0';
            if (parseFloat(tPuMst2.LC_AMT) > 0) {
                tPayReport = `LC_BILL-${tUserInfo.USER_ID}-${tRetDate}`;
                tLcFlag = '1';
                // 엑셀생성
            } else if (parseFloat(tPuMst2.DEPOSIT_AMT) > 0) {
                tPayReport = `Deposit_BILL-${tUserInfo.USER_ID}-${tRetDate}`;
                // 엑셀생성
            } else if (tPurFactory === '3') {
                //수입자재
                tPayReport = `STSIMPORT_BILL-${tUserInfo.USER_ID}-${tRetDate}`;
                // 엑셀생성
            } else {
                tPayReport = `STS_BILL-${tUserInfo.USER_ID}-${tRetDate}`;
            }

            let tSQL99 = `
                update ksv_pu_mst2
                set
                    pur_factory = '${tPurFactory}',
                    payer = '${tInPuMst.BILL_TO}',
                    -- pay_type = '${tInPuMst.PAY_CONDITION}',
                    pay_type = '${tInEdit.PAY_TYPE}',
                    pay_date = '${tInEdit.PAY_DATE}',
                    pay_report = '${tPayReport}',
                    pay_bank = '${tPayBank}'
                where
                    pu_cd = '${tInPuMst.PU_CD}'
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
                tObj.CODE = 'ERROR:STOCK_IN';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tSQLArray = [];

            /*
      var sql0 = `
          select
              isnull(max(right(stsin_cd, 6)), '000000') as stsout_seq
          from
              ksv_stock_in_mst
          where
              stsin_cd like 'STSIN23-%'
      `;
      var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
      var nMaxSeq = parseInt(nRet0[0].stsout_seq)  + 1;
*/

            var tYY2 = tRetDate.substring(2, 4);
            var tSEQ = tRetDate.substring(4, 14);

            var tZero = '000000';
            var tNewStsInCd = `SI${tYY2}-${tSEQ}`;
            var mNewStsInCd = tNewStsInCd;

            var tIdx1 = 0;
            var tInQty = 0;
            var tInAmt = 0;
            for (tIdx1 = 0; tIdx1 < args.datas2.length; tIdx1++) {
                var col = { ...args.datas2[tIdx1] };
                tInQty += parseFloat(col.PO_QTY);
                tInAmt += parseFloat(col.PO_QTY) * parseFloat(col.PO_PRICE);
            }

            //
            let tSQL99 = `
                insert into
                    ksv_stock_in_mst (
                        stsin_cd,
                        pu_cd,
                        in_datetime,
                        reg_user,
                        reg_datetime,
                        payer,
                        pay_date,
                        pay_type,
                        in_qty,
                        in_curr_cd,
                        in_amt,
                        vendor_cd,
                        pur_factory,
                        pay_bank,
                        out_qty,
                        facin_qty,
                        facout_qty,
                        pay_term,
                        stsin_amt,
                        moq_amt,
                        moq_curr,
                        surchase_amt,
                        surchase_curr,
                        overshort
                    )
                values
                    (
                        '${tNewStsInCd}',
                        '${tInPuMst.PU_CD}',
                        '${tRetDate}',
                        '${tUserInfo.USER_ID}',
                        '${tRetDate}',
                        '${tInEdit.BILL_TO}',
                        '${tInEdit.PAY_DATE}',
                        '${tInEdit.PAY_TYPE}',
                        '${tInQty}',
                        '${tInPuMst.CURR_CD}',
                        '${tInAmt}',
                        '${tInPuMst.VENDOR_CD}',
                        '${tPurFactory}',
                        '${tPayBank}',
                        '0',
                        '0',
                        '0',
                        '${tInEdit.PAY_TERM}' '${tInEdit.STS_IN_AMT}',
                        '${tInEdit.MOQ_AMT}',
                        '${tInEdit.MOQ_AMT_CURR}',
                        '${tInEdit.SURCHARGE_AMT}',
                        '${tInEdit.SURCHARGE_AMT_CURR}',
                        '${tInEdit.OVER_SHORT}'
                    )
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            if (tInEdit.BILL_TO === 'BVT' || tInEdit.BILL_TO === 'ETP') {
                // PAYER : 1(BVT), 2(ETP)
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
                            eta
                        )
                    values
                        (
                            '${tNewStsOutCd}',
                            '${tNewStsInCd}',
                            '${tInPuMst.PU_CD}',
                            '${tRetDate}',
                            '${tUserInfo.USER_ID}',
                            '${tRetDate}',
                            '',
                            '',
                            '',
                            '',
                            '',
                            '0',
                            '0',
                            '',
                            '',
                            ''
                        )
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            }

            tIdx1 = 0;
            for (tIdx1 = 0; tIdx1 < args.datas2.length; tIdx1++) {
                // tSQLArray = [];
                var tNewMrpSeq = 0;
                var col = { ...args.datas2[tIdx1] };

                /*
         var mTotQty = parseFloat(col.MRP_QTY) - parseFloat(col.STOCK_QTY) + parseFloat(col.MOQ_QTY) + parseFloat(col.LEFTOVER_QTY) - parseFloat(col.STSIN_QTY);
         var mPoQty = parseFloat(col.PO_QTY);
         var tInPercent =  mPoQty / mTotQty * 100.0;
*/
                var mTotQty = parseFloat(col.PO_QTY0);
                var mPoQty = parseFloat(col.PO_QTY);
                var tInPercent = (mPoQty / mTotQty) * 100.0;

                let tSQL98_2 = `
                    select
                        *
                    from
                        ksv_stock_mem
                    where
                        pu_cd = '${tInPuMst.PU_CD}'
                        and po_cd = '${col.PO_CD}'
                        and matl_cd = '${col.MATL_CD}'
                        and po_seq < 97
                        and po_qty > 0
                `;
                let nRet98_2 = await prisma.$queryRaw(Prisma.raw(tSQL98_2));

                var tInDateTime = AFLib.getCurrTime();
                var tBuyerCd = '';

                var tIdx2 = 0;
                var tOrderCd = '';

                for (tIdx2 = 0; tIdx2 < nRet98_2.length; tIdx2++) {
                    var col0 = { ...nRet98_2[tIdx2] };
                    if (tIdx2 === 0) tOrderCd = col0.ORDER_CD;

                    var tBefQty = parseInt(col0.PO_QTY) - parseInt(col0.IN_QTY);
                    var tInQty = parseInt((tBefQty * tInPercent) / 100.0);
                    if (tInPercent > 98.0) tInQty = col0.PO_QTY;

                    var tTotQty = tBefQty + tInQty;

                    tBuyerCd = col0.ORDER_CD.substring(0, 2);

                    let tSQL99 = `
                        update ksv_stock_mem
                        set
                            in_qty = in_qty + '${tInQty}',
                            stock_status = '1'
                        where
                            po_cd = '${col0.PO_CD}'
                            and po_seq = '${col0.PO_SEQ}'
                            and order_cd = '${col0.ORDER_CD}'
                            and matl_cd = '${col0.MATL_CD}'
                            and mrp_seq = '${col0.MRP_SEQ}'
                            and matl_seq = '${col0.MATL_SEQ}'
                            -- and  stock_status ='0' 
                            and pu_cd = '${tInPuMst.PU_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
                        insert into
                            ksv_stock_in (
                                PO_CD,
                                PO_SEQ,
                                ORDER_CD,
                                MATL_CD,
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
                                STSIN_CD
                            )
                        values
                            (
                                '${col0.PO_CD}',
                                '${col0.PO_SEQ}',
                                '${col0.ORDER_CD}',
                                '${col0.MATL_CD}',
                                '${col0.MRP_SEQ}',
                                '${col0.MATL_SEQ}',
                                '${tInDateTime}',
                                '${tInQty}',
                                '${tTotQty}',
                                '${col.PO_PRICE}',
                                '${col.CURR_CD}',
                                '1',
                                '1',
                                '',
                                '0',
                                '0',
                                '${tInEdit.PAY_DATE}',
                                '0',
                                '${tUserInfo.USER_ID}',
                                '${tRetDate}',
                                '',
                                '${col.PO_PRICE}',
                                '${tInEdit.PAY_TYPE}',
                                '${tPurFactory}',
                                '${tInPuMst.PU_CD}',
                                '${tPayReport}',
                                '${tInEdit.PAY_TYPE}',
                                '${tNewStsInCd}'
                            )
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    var tOutQty = '';
                    var tStockStatus = '';

                    if (
                        tInEdit.BILL_TO === 'BVT' ||
                        tInEdit.BILL_TO === 'ETP'
                    ) {
                        // PAYER : 1(BVT), 2(ETP)

                        tOutQty = tInQty;
                        tStockStatus = '2';

                        let tSQL99 = `
                            update ksv_stock_mem
                            set
                                out_qty = out_qty + ${tInQty},
                                stock_status = '2'
                            where
                                po_cd = '${col0.PO_CD}'
                                and po_seq = '${col0.PO_SEQ}'
                                and order_cd = '${col0.ORDER_CD}'
                                and matl_cd = '${col0.MATL_CD}'
                                and mrp_seq = '${col0.MRP_SEQ}'
                                and matl_seq = '${col0.MATL_SEQ}'
                                -- and  stock_status ='0' 
                                and pu_cd = '${tInPuMst.PU_CD}'
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);

                        let tSQL99 = `
                            update ksv_stock_in
                            set
                                out_qty = out_qty + ${tOutQty}
                            where
                                po_cd = '${col0.PO_CD}'
                                and po_seq = '${col0.PO_SEQ}'
                                and order_cd = '${col0.ORDER_CD}'
                                and matl_cd = '${col0.MATL_CD}'
                                and mrp_seq = '${col0.MRP_SEQ}'
                                and matl_seq = '${col0.MATL_SEQ}'
                                and in_qty = ${col0.IN_QTY}
                                and pu_cd = '${tInPuMst.PU_CD}'
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);

                        var tFactoryCd = 'FC000';
                        var tOutType = '4';
                        if (col0.FACTORY_CD === 'FC034') {
                            tFactoryCd = 'FC034';
                            tOutType = '2';
                        }
                        if (col0.FACTORY_CD === 'FC044') {
                            tFactoryCd = 'FC044';
                            tOutType = '3';
                        }
                        if (col0.FACTORY_CD === 'FC010') {
                            tFactoryCd = 'FC010';
                            tOutType = '1';
                        }

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
                                    '${tInDateTime}',
                                    '${tRetDate}',
                                    ${tOutQty},
                                    '${tOutType}',
                                    '0',
                                    '',
                                    '',
                                    '${tRetDate1}',
                                    '0',
                                    '',
                                    '',
                                    '${tFactoryCd}',
                                    '0',
                                    '${tUserInfo.USER_ID}',
                                    '${tRetDate}',
                                    '${tInPuMst.PU_CD}',
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
                        tSQLArray.push(tSQL99_1);
                    }
                }

                var tSQL = `
                    select
                        max(mrp_seq) as max_mrp_seq
                    from
                        ksv_po_mrp
                    where
                        po_cd = '${col.PO_CD}'
                `;
                var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
                tNewMrpSeq = nRet0[0].max_mrp_seq + 1;

                if (parseFloat(col.SURCHARGE_AMT) > 0) {
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
                                cost_value
                            )
                        values
                            (
                                '${tBuyerCd}',
                                '${tRetDate1}',
                                '${tInPuMst.PU_CD}',
                                '${col.PO_CD}',
                                '${col.MATL_CD}',
                                '',
                                '',
                                'STS_IN',
                                'Surcharge',
                                '${col.CURR_CD}',
                                '${col.SURCHARGE_AMT}',
                                '${tUserInfo.USER_ID}',
                                '',
                                '',
                                '${tInPuMst.VENDOR_CD}',
                                '${col.SURCHARGE_AMT}'
                            )
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }

                // STOCK_MEM2_STSIN (STSIN Log기록)
                var tTableObj = {};
                tTableObj.PO_CD = col.PO_CD;
                tTableObj.PO_SEQ = col.PO_SEQ;
                tTableObj.MATL_CD = col.MATL_CD;
                tTableObj.MATL_SEQ = col.MATL_SEQ;
                tTableObj.VENDOR_CD = tInPuMst.VENDOR_CD;
                tTableObj.PU_CD = tInPuMst.PU_CD;
                tTableObj.STSIN_CD = tNewStsInCd;
                tTableObj.STSIN_TYPE = 'PART';
                tTableObj.MASTER_PRICE = col.MASTER_PRICE;
                tTableObj.CURR_CD = col.CURR_CD;
                tTableObj.PO_PRICE = col.PO_PRICE;
                tTableObj.SURCHARGE_AMT = col.SURCHARGE_AMT;
                tTableObj.SURCHARGE_PRICE = col.SURCHARGE_PRICE;
                tTableObj.SURCHARGE_REMARK = col.SURCHARGE_REMARK;
                tTableObj.MRP_QTY = col.MRP_QTY;
                tTableObj.STOCK_QTY = col.STOCK_QTY;
                tTableObj.MOQ_QTY = col.MOQ_QTY;
                tTableObj.OVERSHORT_QTY = col.LEFTOVER_QTY;
                tTableObj.PO_QTY = mTotQty;
                tTableObj.PARTIN_QTY = col.STSIN_QTY;
                tTableObj.STSIN_QTY = mPoQty;
                tTableObj.FOC_QTY = col.FOC_QTY;
                tTableObj.SHIP_QTY = col.SHIP_QTY;
                tTableObj.OUT_QTY = '0';
                let tSQL99 = AFLib.createTableSql(
                    'KSV_STOCK_MEM2_STSIN',
                    tTableObj,
                );
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                // STOCK_MEM2
                if (tInEdit.BILL_TO === 'BVT' || tInEdit.BILL_TO === 'ETP') {
                    // PAYER : 1(BVT), 2(ETP)
                    let tSQL99 = `
                        update ksv_stock_mem2
                        set
                            in_qty = in_qty + '${mPoQty}',
                            out_qty = out_qty + '${mPoQty}',
                            stock_status = '2',
                            -- po_qty2 = '${mTotQty}',
                            curr_cd = '${col.CURR_CD}',
                            master_price = '${col.MASTER_PRICE}',
                            surcharge_amt = '${col.SURCHARGE_AMT}',
                            surcharge_price = '${col.SURCHARGE_PRICE}',
                            po_price = '${col.PO_PRICE}'
                        where
                            po_cd = '${col.PO_CD}'
                            -- and  po_seq='${col.PO_SEQ}' 
                            and matl_cd = '${col.MATL_CD}'
                            and pu_cd = '${tInPuMst.PU_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                } else {
                    let tSQL99 = `
                        update ksv_stock_mem2
                        set
                            in_qty = in_qty + '${mPoQty}',
                            stock_status = '1',
                            -- po_qty2 = '${mTotQty}',
                            curr_cd = '${col.CURR_CD}',
                            master_price = '${col.MASTER_PRICE}',
                            surcharge_amt = '${col.SURCHARGE_AMT}',
                            surcharge_price = '${col.SURCHARGE_PRICE}',
                            po_price = '${col.PO_PRICE}'
                        where
                            po_cd = '${col.PO_CD}'
                            -- and  po_seq='${col.PO_SEQ}' 
                            and matl_cd = '${col.MATL_CD}'
                            and pu_cd = '${tInPuMst.PU_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
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
                tObj.CODE = 'SUCCEED:STOCK_IN:' + args.datas.length;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:STOCK_IN';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },

        mgrDelete_S043002_5: async (_, args, contextValue) => {
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
            let tSQL99 = `
                delete from ksv_pu_mst2
                where
                    pu_cd = '${args.datas.PU_CD}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            let tSQL99 = `
                update ksv_stock_mem
                set
                    pu_cd = ''
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
    },
};

export default moduleMutation_S043002_5;
