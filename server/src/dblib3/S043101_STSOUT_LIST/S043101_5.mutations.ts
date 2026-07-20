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
const moduleMutation_S043101_5 = {
    Mutation: {
        mgrDelete_S043101_5: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tSQLArray = [];

            var tInput = { ...args.datas[0] };
            var tInputCnt = parseInt(args.datas2);

            var sqlStsOut = '';
            var arrayStsOut = [];
            var tCols = tInput.STSOUT_CD.split('/');
            tCols.forEach((col, i) => {
                if (col !== '') {
                    arrayStsOut.push(col);
                    if (sqlStsOut === '') sqlStsOut = `'${col}'`;
                    else sqlStsOut += `,'${col}'`;
                }
            });
            sqlStsOut = `where a.stsout_cd in (${sqlStsOut}) `;

            var tShipCnt = 0;
            var sql0 = `
                select
                    a.*,
                    b.status_cd
                from
                    ksv_shipment_mem a,
                    ksv_shipment_mst b ${sqlStsOut}
                    and a.shipment_cd is not null
                    and a.shipment_cd <> ''
                    and a.shipment_cd = b.shipment_cd
                    and b.status_cd is not null
                    and b.status_cd <> '0'
                    and b.status_cd <> ''
            `;
            var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            if (nRet0.length > 0) tShipCnt = nRet0.length;
            if (tShipCnt > 0) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Cancel STOCK_OUT: Shipping Process';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            /*
      var sql10 = `
          select
              isnull(a.bill_to, '') as bill_to
          from
              ksv_pu_mst2 a,
              ksv_stock_out_mst b
          where
              b.stsout_cd = '${tInput.STSOUT_CD}'
              and a.pu_cd = b.pu_cd
      `;
      var nRet10 = await prisma.$queryRaw(Prisma.raw(sql10));
      var tBillTo = '';
      if (nRet10.length > 0) tBillTo = nRet10[0].bill_to ;
      if (tBillTo !== 'SHINTS' && tBillTo !== 'BUYER') {
          var tRetArray = [];
          var tObj = {};
          tObj.CODE = 'ERROR:Cancel STOCK_OUT: Bill To (Factory, BVT, ETP), sts in을 cancel해 주세요';
          tObj.id = 0; 
          tRetArray.push(tObj);
          return (tRetArray);
      }
      */

            var tIdx0 = 0;
            var t_out_qty = 0;
            var t_weight = 0;
            var tPuCdArray = [];
            for (tIdx0 = 0; tIdx0 < args.datas1.length; tIdx0++) {
                var col0 = { ...args.datas1[tIdx0] };

                // KSV_STOCK_MEM2_STSOUT처리
                let tSQL99 = `
                    delete from ksv_stock_mem2_stsout
                    where
                        pu_cd = '${col0.PU_CD}'
                        and po_cd = '${col0.PO_CD}'
                        and matl_cd = '${col0.MATL_CD}'
                        and stsout_cd = '${col0.STSOUT_CD}'
                        -- and   stsin_cd = '${tInput.STSIN_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                var sql1 = `
                    select
                        *
                    from
                        ksv_stock_out
                    where
                        stsout_cd = '${col0.STSOUT_CD}'
                        and po_cd = '${col0.PO_CD}'
                        and po_seq = '${col0.PO_SEQ}'
                        and order_cd = '${col0.ORDER_CD}'
                        and matl_cd = '${col0.MATL_CD}'
                        and mrp_seq = '${col0.MRP_SEQ}'
                        and matl_seq = '${col0.MATL_SEQ}'
                        and in_datetime = '${col0.IN_DATETIME}'
                `;
                var nRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                var tIdx = 0;
                for (tIdx = 0; tIdx < nRet1.length; tIdx++) {
                    var col = { ...nRet1[tIdx] };

                    var sqlCheckFacIn = `
                        select
                            *
                        from
                            ksv_stock_facin
                        where
                            po_cd = '${col.PO_CD}'
                            and matl_cd = '${col.MATL_CD}'
                            and stsout_cd = '${col.STSOUT_CD}'
                    `;
                    var retCheckFacIn = await prisma.$queryRaw(
                        Prisma.raw(sqlCheckFacIn),
                    );
                    if (retCheckFacIn.length > 0) {
                        var tRetArray = [];
                        var tObj = {};
                        tObj.CODE = 'ERROR:FAC IN된 STSOUT은 취소할수 없습니디';
                        tObj.id = 0;
                        tRetArray.push(tObj);
                        return tRetArray;
                    }

                    if (col.ETA) {
                        var tRetArray = [];
                        var tObj = {};
                        tObj.CODE = `ERROR:Pack Confirm된 STSOUT은 취소할수 없습니디.(${col.ETA})`;
                        tObj.id = 0;
                        tRetArray.push(tObj);
                        return tRetArray;
                    }

                    var sqlStockMem = `
                        select
                            *
                        from
                            ksv_stock_mem
                        where
                            po_cd = '${col.PO_CD}'
                            and po_seq = '${col.PO_SEQ}'
                            and order_cd = '${col.ORDER_CD}'
                            and matl_cd = '${col.MATL_CD}'
                            and mrp_seq = '${col.MRP_SEQ}'
                            -- and   matl_seq = '${col.MATL_SEQ}'
                    `;
                    var retStockMem = await prisma.$queryRaw(
                        Prisma.raw(sqlStockMem),
                    );
                    if (retStockMem.length <= 0) {
                        var tRetArray = [];
                        var tObj = {};
                        // var tStr = `${col.PO_CD}/${col.PO_SEQ}/${col.ORDER_CD}/${col.MATL_CD}/${col.MRP_SEQ}/${col.MATL_SEQ}`;
                        tObj.CODE = `ERROR:Sts Out Error. Not Found Stock Mem. Contact IT Team(AFROBA)`;
                        tObj.id = 0;
                        tRetArray.push(tObj);
                        return tRetArray;
                    } else {
                        if (
                            parseFloat(col.OUT_QTY) >
                            parseFloat(retStockMem[0].OUT_QTY)
                        ) {
                            var tRetArray = [];
                            var tObj = {};
                            tObj.CODE =
                                'ERROR:Sts Out Error. Stock Mem.OUT_QTY Error. Contact IT Team(AFROBA)';
                            tObj.id = 0;
                            tRetArray.push(tObj);
                            return tRetArray;
                        }
                    }
                    t_out_qty += parseFloat(col.OUT_QTY);
                    t_weight += parseFloat(col.WEIGHT);

                    let tSQL99 = `
                        update ksv_stock_mem
                        set
                            out_qty = out_qty - ${col.OUT_QTY},
                            stock_status = '1'
                        where
                            po_cd = '${col.PO_CD}'
                            and po_seq = '${col.PO_SEQ}'
                            and order_cd = '${col.ORDER_CD}'
                            and matl_cd = '${col.MATL_CD}'
                            and mrp_seq = '${col.MRP_SEQ}'
                            -- and  matl_seq='${col.MATL_SEQ}' 
                            and (out_qty - ${col.OUT_QTY}) >= 0
                            -- and  stock_status ='0' 
                            -- and  (pu_cd  is not null and pu_cd = '${tInput.PU_CD}')
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    var sqlStockIn = `
                        select
                            *
                        from
                            ksv_stock_in
                        where
                            po_cd = '${col.PO_CD}'
                            and po_seq = '${col.PO_SEQ}'
                            and order_cd = '${col.ORDER_CD}'
                            and matl_cd = '${col.MATL_CD}'
                            and mrp_seq = '${col.MRP_SEQ}'
                            -- and   matl_seq = '${col.MATL_SEQ}'
                            and in_datetime = '${col.IN_DATETIME}'
                    `;
                    var retStockIn = await prisma.$queryRaw(
                        Prisma.raw(sqlStockIn),
                    );
                    if (retStockIn.length <= 0) {
                        var tRetArray = [];
                        var tObj = {};
                        tObj.CODE =
                            'ERROR:Sts Out Error. Not Found Stock In. Contact IT Team(AFROBA)';
                        tObj.id = 0;
                        tRetArray.push(tObj);
                        return tRetArray;
                    } else {
                        if (
                            parseFloat(col.OUT_QTY) >
                            parseFloat(retStockIn[0].OUT_QTY)
                        ) {
                            var tRetArray = [];
                            var tObj = {};
                            tObj.CODE =
                                'ERROR:Sts Out Error. Stock In.OUT_QTY Error. Contact IT Team(AFROBA)';
                            tObj.id = 0;
                            tRetArray.push(tObj);
                            return tRetArray;
                        }
                    }

                    let tSQL99 = `
                        update ksv_stock_in
                        set
                            out_qty = out_qty - ${col.OUT_QTY}
                        where
                            po_cd = '${col.PO_CD}'
                            and po_seq = '${col.PO_SEQ}'
                            and order_cd = '${col.ORDER_CD}'
                            and matl_cd = '${col.MATL_CD}'
                            and mrp_seq = '${col.MRP_SEQ}'
                            -- and  matl_seq='${col.MATL_SEQ}' 
                            and in_datetime = '${col.IN_DATETIME}'
                            -- and  (pu_cd  is not null and pu_cd = '${tInput.PU_CD}')
                            and in_qty > 0
                            and lc_qty <= 0
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
                        delete from ksv_stock_out
                        where
                            po_cd = '${col.PO_CD}'
                            and po_seq = '${col.PO_SEQ}'
                            and order_cd = '${col.ORDER_CD}'
                            and matl_cd = '${col.MATL_CD}'
                            and mrp_seq = '${col.MRP_SEQ}'
                            and matl_seq = '${col.MATL_SEQ}'
                            and stsout_cd = '${col.STSOUT_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
                        delete from kzz_freight
                        where
                            po_cd = '${col.PO_CD}'
                            and matl_cd = '${col.MATL_CD}'
                            and order_cd = '${col.ORDER_CD}'
                            and stsout_cd = '${col.STSOUT_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
                        update ksv_stock_mem2
                        set
                            out_qty = out_qty - ${col0.OUT_QTY}
                        where
                            pu_cd = '${col.PU_CD}'
                            and po_cd = '${col.PO_CD}'
                            and matl_cd = '${col.MATL_CD}'
                            and vendor_cd = '${tInput.VENDOR_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
                        update ksv_stock_mem2_stsin
                        set
                            out_qty = out_qty - ${col0.OUT_QTY}
                        where
                            pu_cd = '${col.PU_CD}'
                            and po_cd = '${col.PO_CD}'
                            and matl_cd = '${col.MATL_CD}'
                            and vendor_cd = '${tInput.VENDOR_CD}'
                            -- and stsin_cd = '${tInput.STSIN_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
                        update ksv_stock_out_mst
                        set
                            weight = weight - ${t_weight}
                        where
                            stsout_cd = '${tInput.STSOUT_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
                        update ksv_shipment_mem
                        set
                            weight = weight - ${t_weight}
                        where
                            stsout_cd = '${tInput.STSOUT_CD}'
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
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Cancel STOCK_OUT';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            tSQLArray = [];

            var tIdx2 = 0;
            for (tIdx2 = 0; tIdx2 < arrayStsOut.length; tIdx2++) {
                var tStsOutCd = arrayStsOut[tIdx2];

                var sql0 = `
                    select
                        *
                    from
                        ksv_stock_out
                    where
                        stsout_cd = '${tStsOutCd}'
                `;
                var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));

                if (nRet0.length > 0) continue;

                let tSQL99 = `
                    delete from ksv_invoice_matl
                    where
                        stsout_cd = '${tStsOutCd}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    delete from ksv_invoice_matlmem
                    where
                        stsout_cd = '${tStsOutCd}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    delete from ksv_shipment_mem
                    where
                        stsout_cd = '${tInput.STSOUT_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    delete from ksv_stock_out_mst
                    where
                        stsout_cd = '${tInput.STSOUT_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            }

            /*
      let tSQL99 = `
          update ksv_stock_in_mst
          set
              out_qty = out_qty - ${t_out_qty}
          where
              stsin_cd = '${tInput.STSIN_CD}'
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
                tObj.CODE = 'ERROR:Cancel STOCK_OUT';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            // 금액재계산
            var tRet3 = await prisma.$queryRaw`
                select
                    isnull(sum(a.out_qty * b.PO_PRICE), 0) as stsout_amt
                from
                    ksv_stock_out a,
                    ksv_stock_mem2 b
                where
                    a.pu_cd = ${tInput.PU_CD}
                    and a.po_cd = b.po_cd
                    and a.matl_cd = b.matl_cd
                    -- and   a.pu_cd = b.pu_cd
            `;
            var tStsoutAmt = 0;
            tRet3.forEach((col, i) => {
                tStsoutAmt += parseFloat(col.stsout_amt);
            });

            tSQLArray = [];
            let tSQL99 = `
                update ksv_pu_mst2
                set
                    stsout_amt = ${tStsoutAmt}
                where
                    pu_cd = '${tInput.PU_CD}'
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
                tObj.CODE = 'SUCCEED:Cancel STOCK_OUT';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Cancel: STS OUT';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },

        mgrUpdate_S043101_5: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tSQLArray = [];

            var tInput = { ...args.datas };

            var sql0 = `
                select
                    *
                from
                    ksv_shipment_mem
                where
                    stsout_cd = '${tInput.STSOUT_CD}'
            `;
            var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            var shipmentMemObj = {};
            if (nRet0.length > 0) {
                shipmentMemObj = { ...nRet0[0] };
            }

            var sqlUp = '';
            var sqlUp1 = '';
            console.log(`${shipmentMemObj.CT_QTY}/${tInput.CT_QTY}`);
            if (
                parseFloat(shipmentMemObj.CT_QTY) !== parseFloat(tInput.CT_QTY)
            ) {
                sqlUp += `, ct_qty = '${tInput.CT_QTY}' `;
                sqlUp1 += `, ct_qty = '${tInput.CT_QTY}' `;
            }
            console.log(`${shipmentMemObj.READY_DATE}/${tInput.READY_DATE}`);
            if (shipmentMemObj.READY_DATE !== tInput.READY_DATE) {
                sqlUp += `, ready_date = '${tInput.READY_DATE}' `;
            }
            console.log(`${shipmentMemObj.TARGET_ETA}/${tInput.ETA}`);
            if (shipmentMemObj.TARGET_ETA !== tInput.ETA) {
                sqlUp += `, target_eta = '${tInput.ETA}' `;
            }
            console.log(`${shipmentMemObj.CBM}/${tInput.CBM}`);
            if (parseFloat(shipmentMemObj.CBM) !== parseFloat(tInput.CBM)) {
                sqlUp += `, cbm = '${tInput.CBM}' `;
                sqlUp1 += `, cbm = '${tInput.CBM}' `;
            }
            console.log(`${shipmentMemObj.WEIGHT}/${tInput.GROSS_WEIGHT}`);
            if (
                parseFloat(shipmentMemObj.WEIGHT) !==
                parseFloat(tInput.GROSS_WEIGHT)
            ) {
                var tVal = parseFloat(tInput.GROSS_WEIGHT).toFixed(2);
                sqlUp += `, weight = '${tVal}' `;
            }
            console.log(`${shipmentMemObj.ORIGIN_PORT}/${tInput.ORIGIN_PORT}`);
            if (shipmentMemObj.ORIGIN_PORT !== tInput.ORIGIN_PORT) {
                sqlUp += `, origin_port = '${tInput.ORIGIN_PORT}' `;
            }

            if (!sqlUp) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'SUCCEED:Upate STOCK_OUT';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var sql99 = `
                update ksv_shipment_mem
                set
                    reg_datetime = '${tRetDate}' ${sqlUp}
                where
                    stsout_cd = '${tInput.STSOUT_CD}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(sql99));
            tSQLArray.push(tSQL99_1);

            sql99 = `
                update ksv_stock_out
                set
                    reg_user = reg_user ${sqlUp1}
                where
                    stsout_cd = '${tInput.STSOUT_CD}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(sql99));
            tSQLArray.push(tSQL99_1);

            var tObj = {};
            tObj.trade_term = tInput.TRADE_TERM;
            tObj.ready_date = tInput.READY_DATE;
            tObj.eta = tInput.ETA;
            tObj.origin_port = tInput.ORIGIN_PORT;
            tObj.ct_qty = tInput.CT_QTY;
            tObj.cbm = tInput.CBM;
            tObj.gross_weight = tInput.GROSS_WEIGHT;

            // ksv_stock_out_mst의 destination_port 확인필요. 0325 won.
            /*
      if (!tInput.DESTINATION_PORT) tInput.DESTINATION_PORT = '';
      tObj.destination_port = tInput.DESTINATION_PORT;
      */

            let tSQL99 = AFLib.updateTableSql('ksv_stock_out_mst', tObj);
            tSQL99 += ` where stsout_cd = '${tInput.STSOUT_CD}' `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            tObj = {};
            tObj.ORIGIN_PORT = tInput.ORIGIN_PORT;
            let tSQL99 = AFLib.updateTableSql('ksv_pu_mst2', tObj);
            tSQL99 += ` where pu_cd = '${tInput.PU_CD}' `;
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
                tObj.CODE = 'SUCCEED:Upate STOCK_OUT';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Update STOCK_OUT';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },
    },
};

export default moduleMutation_S043101_5;
