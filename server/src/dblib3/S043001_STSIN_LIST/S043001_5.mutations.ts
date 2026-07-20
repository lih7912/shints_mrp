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
const moduleMutation_S043001_5 = {
    Mutation: {
        mgrDelete_S043001_5: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput = [...args.datas];

            var tIdx0 = 0;
            for (tIdx0 = 0; tIdx0 < tInput.length; tIdx0++) {
                var tOne = { ...tInput[tIdx0] };

                var tCols = tOne.PO_CD.split('/');
                var poCdSql = '';
                tCols.forEach((col1, i1) => {
                    if (poCdSql === '') poCdSql = `'${col1}'`;
                    else poCdSql += `,'${col1}'`;
                });

                var tSQLArray = [];

                var sql10 = `
                    select
                        a.*,
                        c.VENDOR_TYPE
                    from
                        ksv_stock_in a,
                        kcd_matl_mst b,
                        kcd_vendor c
                    where
                        a.pu_cd = '${tOne.PU_CD}'
                        and a.matl_cd = '${tOne.MATL_CD}'
                        and a.po_cd in (${poCdSql})
                        and a.stsin_cd = '${tOne.STSIN_CD}'
                        and a.matl_cd = b.matl_cd
                        and b.vendor_cd = c.vendor_cd
                `;
                var ret10 = await prisma.$queryRaw(Prisma.raw(sql10));
                var tIdx10 = 0;
                var tChk = 0;
                var vendorObj = {};
                var billCnt = 0;
                for (tIdx10 = 0; tIdx10 < ret10.length; tIdx10++) {
                    var tObj11 = { ...ret10[tIdx10] };

                    if (tIdx10 === 0) vendorObj = { ...tObj11 };

                    if (tObj11.END_FLAG === '1') billCnt += 1;

                    var sql11 = `
                        select
                            *
                        from
                            ksv_stock_out
                        where
                            po_cd = '${tObj11.PO_CD}'
                            and po_seq = '${tObj11.PO_SEQ}'
                            and order_cd = '${tObj11.ORDER_CD}'
                            and matl_cd = '${tObj11.MATL_CD}'
                            and mrp_seq = '${tObj11.MRP_SEQ}'
                            -- and   matl_seq = '${tObj11.MATL_SEQ}'
                            and in_datetime = '${tObj11.IN_DATETIME}'
                    `;
                    var ret11 = await prisma.$queryRaw(Prisma.raw(sql11));
                    if (ret11.length > 0) {
                        tChk = 1;
                        break;
                    }
                }
                if (tChk > 0) {
                    if (
                        tOne.VENDOR_CD === 'V2078' ||
                        tOne.VENDOR_CD === 'V0228' ||
                        tOne.VENDOR_CD === 'V2574'
                    ) {
                    } else {
                        var tRetArray = [];
                        var tObj = {};
                        tObj.CODE = 'ERROR:Cannot Update Already Sts Out .';
                        tObj.id = 0;
                        tRetArray.push(tObj);
                        return tRetArray;
                    }
                }

                var tCheck_EndFlag = 0;
                var tCheck_BillFlag = 0;
                if (billCnt > 0) {
                    tCheck_EndFlag = 1;
                    tCheck_BillFlag = 1;
                }

                var tSQL2 = `
                    select
                        *
                    from
                        ksv_stock_mem2_stsin
                    where
                        stsin_cd = '${tOne.STSIN_CD}'
                        and matl_cd = '${tOne.MATL_CD}'
                `;
                var nRet2 = await prisma.$queryRaw(Prisma.raw(tSQL2));

                let tSQL99 = `
                    delete from ksv_stock_in_mst
                    where
                        stsin_cd = '${tOne.STSIN_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                // tSQLArray.push(tSQL99_1);

                if (
                    tOne.VENDOR_CD === 'V2078' ||
                    tOne.VENDOR_CD === 'V0228' ||
                    tOne.VENDOR_CD === 'V2574'
                ) {
                    let tSQL99 = `
                        delete from ksv_shipment_mem
                        where
                            stsout_cd in (
                                select distinct
                                    stsout_cd
                                from
                                    ksv_stock_out_mst
                                where
                                    stsin_cd = '${tOne.STSIN_CD}'
                                    and pu_cd = '${tOne.PU_CD}'
                            )
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
                        delete from ksv_stock_out_mst
                        where
                            stsin_cd = '${tOne.STSIN_CD}'
                            and pu_cd = '${tOne.PU_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
                        delete from ksv_stock_out
                        where
                            stsin_cd = '${tOne.STSIN_CD}'
                            and pu_cd = '${tOne.PU_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
                        delete from ksv_stock_mem2_stsout
                        where
                            stsin_cd = '${tOne.STSIN_CD}'
                            and pu_cd = '${tOne.PU_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }

                let tSQL99 = `
                    delete from ksv_stock_mem2_stsin
                    where
                        stsin_cd = '${tOne.STSIN_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                // `tSQLArray.push(tSQL99_1);

                var tIdx9 = 0;

                //  Stock in Delete
                var tIdx0_2 = 0;
                for (tIdx0_2 = 0; tIdx0_2 < ret10.length; tIdx0_2++) {
                    var tObj = { ...ret10[tIdx0_2] };

                    if (parseFloat(tObj.IN_QTY) <= 0) continue;

                    // if (tObj.END_FLAG === '1' || tObj.CALC_FLAG === '1') {
                    if (tObj.END_FLAG === '1') {
                        if (vendorObj.VENDOR_TYPE === '4') {
                            // Buyer
                        } else {
                            var tRetArray = [];
                            var tObj = {};
                            tObj.CODE =
                                'ERROR:Cannot Update Already Bill Regist .';
                            tObj.id = 0;
                            tRetArray.push(tObj);
                            return tRetArray;
                        }
                    }

                    var tInQty = parseInt(tObj.IN_QTY);

                    var sql21 = ` 
                       select * from ksv_stock_mem
				               where po_cd='${tObj.PO_CD}' 
				                and  po_seq='${tObj.PO_SEQ}' 
				                and  matl_cd='${tObj.MATL_CD}' 
				                and  order_cd='${tObj.ORDER_CD}' 
				                and  mrp_seq ='${tObj.MRP_SEQ}' 
				                -- and  matl_seq ='${tObj.MATL_SEQ}' 
				                and  pu_cd='${tObj.PU_CD}' 
               `;
                    var ret21 = await prisma.$queryRaw(Prisma.raw(sql21));
                    if (ret21.length <= 0) {
                        var tRetArray = [];
                        var tObj = {};
                        tObj.CODE = `ERROR:Not Found Stock_mem. Contact IT Team(${tObj.PO_Cd}/${tObj.MATL_CD}/${tObj.PU_CD})`;
                        tObj.id = 0;
                        tRetArray.push(tObj);
                        return tRetArray;
                    } else {
                        if (parseFloat(ret21[0].IN_QTY) < parseFloat(tInQty)) {
                            var tRetArray = [];
                            var tObj = {};
                            tObj.CODE = `ERROR:Stock_mem.in_qty Error . Contact IT Team(${tObj.PO_Cd}/${tObj.MATL_CD}/${tObj.PU_CD}/${ret21[0].IN_QTY}/${tInQty})`;
                            tObj.id = 0;
                            tRetArray.push(tObj);
                            return tRetArray;
                        }
                    }

                    let tSQL99 = `
				               update ksv_stock_mem  set 
				                 in_qty = in_qty - ${tInQty}
				               where po_cd='${tObj.PO_CD}' 
				                and  po_seq='${tObj.PO_SEQ}' 
				                and  matl_cd='${tObj.MATL_CD}' 
				                and  order_cd='${tObj.ORDER_CD}' 
				                and  mrp_seq ='${tObj.MRP_SEQ}' 
				                -- and  matl_seq ='${tObj.MATL_SEQ}' 
				                and  pu_cd='${tObj.PU_CD}' 
               `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
				               update ksv_stock_mem  set 
                             stock_status = '0'
				               where po_cd='${tObj.PO_CD}' 
				                and  po_seq='${tObj.PO_SEQ}' 
				                and  matl_cd='${tObj.MATL_CD}' 
				                and  order_cd='${tObj.ORDER_CD}' 
				                and  mrp_seq ='${tObj.MRP_SEQ}' 
				                -- and  matl_seq ='${tObj.MATL_SEQ}' 
				                and  pu_cd='${tObj.PU_CD}' 
                        and  in_qty <= 0
               `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
                        delete from ksv_stock_in 
				                where po_cd='${tObj.PO_CD}' 
				                and   po_seq='${tObj.PO_SEQ}' 
				                and  matl_cd='${tObj.MATL_CD}' 
				                and  order_cd='${tObj.ORDER_CD}' 
				                and  matl_cd='${tObj.MATL_CD}' 
				                -- and  mrp_seq='${tObj.MRP_SEQ}' 
				                and  pu_cd='${tObj.PU_CD}' 
				                and  stsin_cd='${tObj.STSIN_CD}' 
               `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }

                var sqlMoq = ` 
                    select * from ksv_stock_in 
                    where   po_cd in (${poCdSql}) 
				            and  matl_cd='${tOne.MATL_CD}' 
				            and  pu_cd='${tOne.PU_CD}' 
                    and  po_seq = 99
				            and  stsin_cd='${tOne.STSIN_CD}' 
                `;
                var retMoq = await prisma.$queryRaw(Prisma.raw(sqlMoq));
                if (retMoq.length > 0) {
                    var col = { ...retMoq[0] };
                    var sql21 = `
                       select a.stock_idx,
                             isnull(b.stock_qty, 0) as stock_qty,
                             isnull(b.remain_qty, 0) as remain_qty,
                             isnull(b.use_qty, 0) as use_qty,
                             isnull(b.out_qty , 0) as out_qty
                        from ksv_po_mrp a, ksv_stock_matl b
                       where a.po_cd='${col.PO_CD}'
                        and  a.po_seq='${col.PO_SEQ}'
                        and  a.matl_cd='${col.MATL_CD}'
                        and  a.order_cd='${col.ORDER_CD}'
                        and  a.mrp_seq ='${col.MRP_SEQ}'
                        and  a.stock_idx = b.stock_idx
                    `;
                    var ret21 = await prisma.$queryRaw(Prisma.raw(sql21));
                    if (ret21.length <= 0) {
                        ;
                    } else {
                        var wStockIdx = ret21[0].stock_idx;
                        let tSQL99 = `
                            update ksv_stock_matl set stock_status = 'O'  where stock_idx = '${wStockIdx}'
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);
                    }
                }

                var sqlOverShort = ` 
                    select * from ksv_stock_in 
                    where   po_cd in (${poCdSql}) 
				            and  matl_cd='${tOne.MATL_CD}' 
				            and  pu_cd='${tOne.PU_CD}' 
                    and  po_seq = 98
				            and  stsin_cd='${tOne.STSIN_CD}' 
                `;
                var retOverShort = await prisma.$queryRaw(
                    Prisma.raw(sqlOverShort),
                );
                if (retOverShort.length > 0) {
                    var col = { ...retOverShort[0] };

                    var sql21 = `
                       select a.stock_idx, 
                             isnull(b.stock_qty, 0) as stock_qty, 
                             isnull(b.remain_qty, 0) as remain_qty,
                             isnull(b.use_qty, 0) as use_qty, 
                             isnull(b.out_qty , 0) as out_qty
                        from ksv_po_mrp a, ksv_stock_matl b
				               where a.po_cd='${col.PO_CD}' 
				                and  a.po_seq='${col.PO_SEQ}' 
				                and  a.matl_cd='${col.MATL_CD}' 
				                and  a.order_cd='${col.ORDER_CD}' 
				                and  a.mrp_seq ='${col.MRP_SEQ}' 
                        and  a.stock_idx = b.stock_idx
                   `;
                    var ret21 = await prisma.$queryRaw(Prisma.raw(sql21));
                    if (ret21.length <= 0) {
                        var tRetArray = [];
                        var tObj = {};
                        tObj.CODE = `ERROR:Not Found Stock_mem(Over-In). Contact IT Team(${tObj.PO_Cd}/${tObj.MATL_CD}/${tObj.PU_CD})`;
                        tObj.id = 0;
                        tRetArray.push(tObj);
                        return tRetArray;
                    } else {
                        if (
                            parseFloat(ret21[0].stock_qty) > 0 &&
                            parseFloat(ret21[0].stock_qty) !==
                                parseFloat(ret21[0].remain_qty)
                        ) {
                            var tRetArray = [];
                            var tObj = {};
                            tObj.CODE = `ERROR:Over-In stock is used and cannot be cancelled. Contact IT Team(${tObj.PO_Cd}/${tObj.MATL_CD}/${tObj.PU_CD}/${ret21[0].stock_idx})`;
                            tObj.id = 0;
                            tRetArray.push(tObj);
                            return tRetArray;
                        }
                    }
                    var wStockIdx = ret21[0].stock_idx;

                    let tSQL99 = `
                        delete from ksv_stock_matl where stock_idx = '${wStockIdx}'
               `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
                        delete a 
                        from ksv_po_mrp a
				               where a.po_cd='${col.PO_CD}' 
				                and  a.po_seq='${col.PO_SEQ}' 
				                and  a.matl_cd='${col.MATL_CD}' 
				                and  a.order_cd='${col.ORDER_CD}' 
				                and  a.mrp_seq ='${col.MRP_SEQ}' 
               `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
                        delete from ksv_stock_mem 
				                where po_cd='${col.PO_CD}' 
				                and  po_seq='${col.PO_SEQ}' 
				                and  matl_cd='${col.MATL_CD}' 
				                and  order_cd='${col.ORDER_CD}' 
				                and  mrp_seq ='${col.MRP_SEQ}' 
               `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
				               update ksv_stock_mem2  set 
                         leftover_qty = 0 
				               where po_cd='${col.PO_CD}' 
				                and  matl_cd='${col.MATL_CD}' 
				                and  pu_cd='${col.PU_CD}' 
               `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }

                var sqlFoc = ` 
               select * from ksv_stock_in 
               where   po_cd in (${poCdSql}) 
				       and  matl_cd='${tOne.MATL_CD}' 
				       and  pu_cd='${tOne.PU_CD}' 
               and  po_seq = 97
				       and  stsin_cd='${tOne.STSIN_CD}' 
                    `;
                var retFoc = await prisma.$queryRaw(Prisma.raw(sqlFoc));
                if (retFoc.length > 0) {
                    var col = { ...retFoc[0] };

                    var sql21 = `
                       select a.stock_idx, 
                             isnull(b.stock_qty, 0) as stock_qty, 
                             isnull(b.remain_qty, 0) as remain_qty,
                             isnull(b.use_qty, 0) as use_qty, 
                             isnull(b.out_qty , 0) as out_qty
                        from ksv_po_mrp a, ksv_stock_matl b
				               where a.po_cd='${col.PO_CD}' 
				                and  a.po_seq='${col.PO_SEQ}' 
				                and  a.matl_cd='${col.MATL_CD}' 
				                and  a.order_cd='${col.ORDER_CD}' 
				                and  a.mrp_seq ='${col.MRP_SEQ}' 
                        and  a.stock_idx = b.stock_idx
                   `;
                    var ret21 = await prisma.$queryRaw(Prisma.raw(sql21));
                    if (ret21.length <= 0) {
                        var tRetArray = [];
                        var tObj = {};
                        tObj.CODE = `ERROR:Not Found Stock_mem(Foc). Contact IT Team(${tObj.PO_Cd}/${tObj.MATL_CD}/${tObj.PU_CD})`;
                        tObj.id = 0;
                        tRetArray.push(tObj);
                        return tRetArray;
                    } else {
                        if (
                            parseFloat(ret21[0].stock_qty) > 0 &&
                            parseFloat(ret21[0].stock_qty) !==
                                parseFloat(ret21[0].remain_qty)
                        ) {
                            var tRetArray = [];
                            var tObj = {};
                            tObj.CODE = `ERROR:Foc stock is used and cannot be cancelled. Contact IT Team(${tObj.PO_Cd}/${tObj.MATL_CD}/${tObj.PU_CD}/${ret21[0].stock_idx})`;
                            tObj.id = 0;
                            tRetArray.push(tObj);
                            return tRetArray;
                        }
                    }
                    var wStockIdx = ret21[0].stock_idx;

                    let tSQL99 = `
                        delete from ksv_stock_matl where stock_idx = '${wStockIdx}'
               `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
                        delete a 
                        from ksv_po_mrp a
				               where a.po_cd='${col.PO_CD}' 
				                and  a.po_seq='${col.PO_SEQ}' 
				                and  a.matl_cd='${col.MATL_CD}' 
				                and  a.order_cd='${col.ORDER_CD}' 
				                and  a.mrp_seq ='${col.MRP_SEQ}' 
               `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
                        delete from ksv_stock_mem 
				                where po_cd='${col.PO_CD}' 
				                and  po_seq='${col.PO_SEQ}' 
				                and  matl_cd='${col.MATL_CD}' 
				                and  order_cd='${col.ORDER_CD}' 
				                and  mrp_seq ='${col.MRP_SEQ}' 
               `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
				               update ksv_stock_mem2  set 
                         leftover_qty = 0 
				               where po_cd='${col.PO_CD}' 
				                and  matl_cd='${col.MATL_CD}' 
				                and  pu_cd='${col.PU_CD}' 
               `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }

                // STS-IN End Cancel
                let tSQL99 = `
				               update ksv_stock_mem2  set 
                             fullin_flag = '0'
				               where po_cd in (${poCdSql})
				                and  matl_cd='${tOne.MATL_CD}' 
				                and  pu_cd='${tOne.PU_CD}' 
                        and  fullin_flag = '1'
          `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                /*
          if (parseFloat(col.SURCHARGE_AMT) > 0) {
                    let tSQL99 = `
                       delete from ksv_cost_mst 
                       where  po_cd in (${poCdSql}) 
				                and  vendor_cd='${col.VENDOR_CD}' 
				                and  type = 'STS_IN' 
                        and  type2 = 'Surcharge'
                        and  stsin_cd = '${col.STSIN_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    var tUpdateVal = parseFloat(tStockMem2.SURCHARGE_AMT) - parseFloat(col.SURCHARGE_AMT);
                    var tSurPrice = parseFloat(tStockMem2.SURCHARGE_PRICE);
                    var tPoPrice = parseFloat(tStockMem2.PO_PRICE);
                    if (tUpdateVal <= 0) {
                        tUpdateVal = 0;
                        tSurPrice = 0;
                        tPoPrice = tStockMem2.MASTER_PRICE;
                    }

                    let tSQL99 = `
				               update ksv_stock_mem2  set 
                         surcharge_amt = ${tUpdateVal},
                         surcharge_price = ${tSurPrice},
                         po_price = ${tPoPrice}
				               where po_cd='${col.PO_CD}' 
				                and  matl_cd='${col.MATL_CD}' 
				                and  pu_cd='${col.PU_CD}' 
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    // tSQLArray.push(tSQL99_1);
          }
          */

                // 재고 STS-IN 처리 취소
                let tSQL99 = `
                     update ksv_stock_use set 
                            pu_cd = '', 
                            stsin_cd = ''
                     where  pu_cd = '${tOne.PU_CD}' 
                     and    stsin_cd = '${tOne.STSIN_CD}'
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
                    tObj.CODE =
                        'ERROR:Cancel STOCK_IN(DB ERROR).Contact IT Team';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }

                // 금액재계산
                var tRet3 = await prisma.$queryRaw`
               select  isnull(a.calc_flag, '0') as calc_flag,
                       sum(a.in_qty * b.PO_PRICE) as stsin_amt
                       -- sum(a.tot_qty * b.PO_PRICE) as stsin_amt2
               from ksv_stock_in a, ksv_stock_mem2 b
               where a.pu_cd = ${tOne.PU_CD}
               and   a.po_cd = b.po_cd
               and   a.matl_cd = b.matl_cd
               -- and   a.pu_cd = b.pu_cd
               -- and   a.calc_flag = '1'
               group by a.calc_flag
          `;
                var tStsinAmt = 0;
                var tPayAmt = 0;
                tRet3.forEach((col, i) => {
                    if (col.calc_flag === '1')
                        tPayAmt += parseFloat(col.stsin_amt);
                    tStsinAmt += parseFloat(col.stsin_amt);
                });
                tStsinAmt = AFLib.numToFixed(tStsinAmt, 2);
                tPayAmt = AFLib.numToFixed(tPayAmt, 2);
                console.log(`Stsin Amt(stsin, pay): ${tStsinAmt}/${tPayAmt}`);

                tSQLArray = [];
                let tSQL99 = `
               update ksv_pu_mst2 set 
                  stsin_amt = ${tStsinAmt} ,
                  bill_amt = ${tPayAmt}
               where pu_cd = '${tOne.PU_CD}'
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
                    tObj.CODE = `ERROR:Cancel Stsin: ${e.message}`;
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED:Cancel stock_in';
            tObj.id = 0;
            tRetArray.push(tObj);
            return tRetArray;
        },

        mgrDelete_S043001_5_1118: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput = [...args.datas];

            var tIdx0 = 0;
            for (tIdx0 = 0; tIdx0 < tInput.length; tIdx0++) {
                var tOne = { ...tInput[tIdx0] };

                var tCols = tOne.PO_CD.split('/');
                var poCdSql = '';
                tCols.forEach((col1, i1) => {
                    if (poCdSql === '') poCdSql = `'${col1}'`;
                    else poCdSql += `,'${col1}'`;
                });

                var tSQLArray = [];

                var sql10 = ` 
              select * from ksv_stock_in 
              where pu_cd   = '${tOne.PU_CD}'
               and  matl_cd = '${tOne.MATL_CD}' 
               and  po_cd in (${poCdSql}) 
               and  stsin_cd = '${tOne.STSIN_CD}' 
              `;
                var ret10 = await prisma.$queryRaw(Prisma.raw(sql10));
                var tIdx10 = 0;
                var tChk = 0;
                for (tIdx10 = 0; tIdx10 < ret10.length; tIdx10++) {
                    var tObj11 = { ...ret10[tIdx10] };
                    var sql11 = ` 
                   select * from ksv_stock_out 
                   where po_cd = '${tObj11.PO_CD}'
                   and   po_seq = '${tObj11.PO_SEQ}'
                   and   order_cd = '${tObj11.ORDER_CD}'
                   and   matl_cd = '${tObj11.MATL_CD}'
                   and   mrp_seq = '${tObj11.MRP_SEQ}'
                   and   matl_seq = '${tObj11.MATL_SEQ}'
                   and   in_datetime = '${tObj11.IN_DATETIME}'
               `;
                    var ret11 = await prisma.$queryRaw(Prisma.raw(sql11));
                    if (ret11.length > 0) {
                        tChk = 1;
                        break;
                    }
                }
                if (tChk > 0) {
                    if (
                        tOne.VENDOR_CD === 'V2078' ||
                        tOne.VENDOR_CD === 'V0228' ||
                        tOne.VENDOR_CD === 'V2574'
                    ) {
                    } else {
                        var tRetArray = [];
                        var tObj = {};
                        tObj.CODE = 'ERROR:Cannot Update Already Sts Out .';
                        tObj.id = 0;
                        tRetArray.push(tObj);
                        return tRetArray;
                    }
                }

                var tSQL1 = ` 
              select * from ksv_stock_in_mst where stsin_cd  = '${tOne.STSIN_CD}'
              `;
                var nRet1 = await prisma.$queryRaw(Prisma.raw(tSQL1));

                var tCheck_EndFlag = 0;
                var tCheck_BillFlag = 0;

                nRet1.forEach((col, i) => {
                    if (col.END_FLAG === '1') tCheck_EndFlag += 1;
                    if (col.BILL_FLAG === '1') tCheck_BillFlag += 1;
                });

                var tSQL2 = ` 
               select * 
               from ksv_stock_mem2_stsin 
               where stsin_cd  = '${tOne.STSIN_CD}'
               and   matl_cd  = '${tOne.MATL_CD}'
               `;
                var nRet2 = await prisma.$queryRaw(Prisma.raw(tSQL2));

                let tSQL99 = `
               delete from ksv_stock_in_mst where stsin_cd  = '${tOne.STSIN_CD}'
          `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                // tSQLArray.push(tSQL99_1);

                if (
                    tOne.VENDOR_CD === 'V2078' ||
                    tOne.VENDOR_CD === 'V0228' ||
                    tOne.VENDOR_CD === 'V2574'
                ) {
                    let tSQL99 = `
                   delete from ksv_shipment_mem 
                   where stsout_cd in (select distinct stsout_cd from ksv_stock_out_mst
                                       where stsin_cd  = '${tOne.STSIN_CD}'
                                       and pu_cd = '${tOne.PU_CD}')
               `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
                   delete from ksv_stock_out_mst 
                   where stsin_cd  = '${tOne.STSIN_CD}'
                   and pu_cd = '${tOne.PU_CD}'
               `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
                   delete from ksv_stock_out 
                   where stsin_cd  = '${tOne.STSIN_CD}'
                   and pu_cd = '${tOne.PU_CD}'
               `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
                   delete from ksv_stock_mem2_stsout
                   where stsin_cd  = '${tOne.STSIN_CD}'
                   and pu_cd = '${tOne.PU_CD}'
               `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }

                let tSQL99 = `
                delete from ksv_stock_mem2_stsin where stsin_cd  = '${tOne.STSIN_CD}'
          `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                // `tSQLArray.push(tSQL99_1);

                var tIdx9 = 0;

                // Part In 처리

                // Full In/Part In 처리 (구분없음)
                // nRet2 -> ksv_stock_mem2
                for (tIdx9 = 0; tIdx9 < nRet2.length; tIdx9++) {
                    // nRet2 > 0 : fullin
                    var col = { ...nRet2[tIdx9] };

                    var tStockUse = 0;
                    var tIdxStr = `'999'`;
                    if (col.MOQ_STOCK_IDX !== '')
                        tIdxStr += `,'${col.MOQ_STOCK_IDX}'`;
                    if (col.FOC_STOCK_IDX !== '')
                        tIdxStr += `,'${col.FOC_STOCK_IDX}'`;
                    if (col.LEFTOVER_STOCK_IDX !== '')
                        tIdxStr += `,'${col.LEFTOVER_STOCK_IDX}'`;

                    // stock_use 테이블로 바꿈
                    // MOQ, FOC ,LEFTOvr 사용유무 파악
                    if (
                        parseInt(col.MOQ_QTY) > 0 ||
                        parseInt(col.FOC_QTY) > 0 ||
                        parseInt(col.OVERSHORT_QTY)
                    ) {
                        var sql0 = `
                            select
                                isnull(count(*), 0) as t_sum
                            from
                                ksv_stock_use
                            where
                                stock_idx in (${tIdxStr})
                        `;
                        var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                        if (nRet0.length > 0 && nRet0[0].t_sum > 0)
                            tStockUse = nRet0[0].t_sum;
                    }

                    if (tStockUse > 0) {
                        var tRetArray = [];
                        var tObj = {};
                        tObj.CODE =
                            'ERROR:Cancel Stock In: Cannot Cancel. Stock(Moq, OverLeftIn, Foc) Already Used.';
                        tObj.id = 0;
                        tRetArray.push(tObj);
                        return tRetArray;
                    }

                    var sql0_1 = `
                        select
                            isnull(stsin_cd, '') as STSIN_CD,
                            isnull(stsin_array, '') as STSIN_ARRAY,
                            isnull(in_qty, 0) as IN_QTY
                        from
                            ksv_stock_mem2
                        where
                            po_cd = '${col.PO_CD}'
                            and matl_cd = '${col.MATL_CD}'
                            and pu_cd = '${col.PU_CD}'
                            -- and  (stsin_cd = '${tOne.STSIN_CD}' or stsin_array like '%${tOne.STSIN_CD}%')
                    `;
                    var nRet0_1 = await prisma.$queryRaw(Prisma.raw(sql0_1));
                    var tStockMem2 = {};
                    if (nRet0_1.length > 0) tStockMem2 = { ...nRet0_1[0] };

                    var tUpdateVal = 0;
                    if (nRet0_1.lengvth > 0) {
                        console.log(
                            `Stock mem2 update => ${tStockMem2.IN_QTY}/${col.STSIN_QTY}`,
                        );
                        tUpdateVal =
                            parseFloat(tStockMem2.IN_QTY) -
                            parseFloat(col.STSIN_QTY);
                        if (tUpdateVal <= 0) tUpdateVal = 0;
                    } else {
                        tUpdateVal = parseFloat(col.STSIN_QTY);
                    }

                    if (col.STSIN_TYPE === 'PART_IN') {
                        var tCols = tStockMem2.STSIN_ARRAY.split('/');
                        var tCnt = 0;
                        var tNewSTSIN_ARRAY = '';
                        tCols.forEach((col9, i9) => {
                            if (col9 === tOne.STSIN_CD);
                            else {
                                if (tCnt === 0) tNewSTSIN_ARRAY += `${col9}`;
                                else tNewSTSIN_ARRAY += `/${col9}`;
                                tCnt++;
                            }
                        });

                        let tSQL99 = `
                            update ksv_stock_mem2
                            set
                                in_qty = ${tUpdateVal},
                                po_qty2 = ${col.SAVE_PO_QTY},
                                surcharge_amt = ${col.SAVE_SURCHARGE_AMT},
                                surcharge_price = ${col.SAVE_SURCHARGE_PRICE},
                                po_price = ${col.SAVE_PO_PRICE},
                                stsin_cd = '',
                                stsin_array = '${tNewSTSIN_ARRAY}'
                            where
                                po_cd = '${col.PO_CD}'
                                and matl_cd = '${col.MATL_CD}'
                                and pu_cd = '${col.PU_CD}'
                                -- and  (stsin_cd = '${tOne.STSIN_CD}' or stsin_array like '%${tOne.STSIN_CD}%')
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);
                    } else {
                        // FULL-IN 취소 처리 : 이미 진행중인 Purchase(STSIN_CD가 0)가 있는경우
                        //                     취소하는 Fullin을 병합한다

                        var sql0_2 = `
                            select
                                isnull(STSIN_ARRAY, '') as STSIN_ARRAY,
                                isnull(IN_QTY, 0) as IN_QTY,
                                isnull(PO_QTY2, 0) as PO_QTY2
                            from
                                ksv_stock_mem2
                            where
                                po_cd = '${col.PO_CD}'
                                and matl_cd = '${col.MATL_CD}'
                                and pu_cd = '${col.PU_CD}'
                                -- and  stsin_cd = ''
                        `;
                        var nRet0_2 = await prisma.$queryRaw(
                            Prisma.raw(sql0_2),
                        );
                        if (nRet0_2.length > 0) {
                            var tStockMem2_1 = { ...nRet0_2[0] };
                            tUpdateVal =
                                parseFloat(tStockMem2_1.IN_QTY) +
                                parseFloat(tStockMem2.IN_QTY) -
                                parseFloat(col.STSIN_QTY);
                            var tPoQty2 =
                                parseFloat(tStockMem2_1.PO_QTY2) +
                                parseFloat(col.SAVE_PO_QTY);

                            var tNewStsIn_Array9 = tStockMem2_1.STSIN_ARRAY;
                            tNewStsIn_Array9 += tStockMem2.STSIN_ARRAY;
                            // 진행중인 Purchase가 있는 경우
                            let tSQL99 = `
                                update ksv_stock_mem2
                                set
                                    in_qty = ${tUpdateVal},
                                    po_qty2 = ${tPoQty2},
                                    -- moq = ${col.SAVE_MOQ_QTY},
                                    -- leftover_qty = ${col.SAVE_OVERSHORT_QTY},
                                    -- foc_qty = ${col.SAVE_FOC_QTY},
                                    -- surcharge_amt = ${col.SAVE_SURCHARGE_AMT},
                                    -- surcharge_price = ${col.SAVE_SURCHARGE_PRICE},
                                    -- po_price = ${col.SAVE_PO_PRICE},
                                    -- other_amt = 0,
                                    -- other_price = 0,
                                    -- freight_amt = 0,
                                    -- freight_price = 0,
                                    -- stock_status = '0',
                                    -- moq_stock_idx = '',
                                    -- leftover_stock_idx = '',
                                    -- foc_stock_idx = '',
                                    -- bef_total_mrp = 0,
                                    -- bef_stock_qty = 0,
                                    -- stsin_cd = '',  
                                    stsin_array = '${tNewStsIn_Array9}'
                                where
                                    po_cd = '${col.PO_CD}'
                                    and matl_cd = '${col.MATL_CD}'
                                    and pu_cd = '${col.PU_CD}'
                                    -- and  stsin_cd = ''
                            `;
                            const tSQL99_1 = prisma.$queryRaw(
                                Prisma.raw(tSQL99),
                            );
                            tSQLArray.push(tSQL99_1);
                        } else {
                            // 진행중인 Purchase가 없는경우
                            let tSQL99 = `
                                update ksv_stock_mem2
                                set
                                    in_qty = ${tUpdateVal},
                                    po_qty2 = ${col.SAVE_PO_QTY},
                                    moq = ${col.SAVE_MOQ_QTY},
                                    leftover_qty = ${col.SAVE_OVERSHORT_QTY},
                                    foc_qty = ${col.SAVE_FOC_QTY},
                                    surcharge_amt = ${col.SAVE_SURCHARGE_AMT},
                                    surcharge_price = ${col.SAVE_SURCHARGE_PRICE},
                                    po_price = ${col.SAVE_PO_PRICE},
                                    other_amt = 0,
                                    other_price = 0,
                                    freight_amt = 0,
                                    freight_price = 0,
                                    stock_status = '0',
                                    moq_stock_idx = '',
                                    leftover_stock_idx = '',
                                    foc_stock_idx = '',
                                    bef_total_mrp = 0,
                                    bef_stock_qty = 0,
                                    stsin_cd = ''
                                where
                                    po_cd = '${col.PO_CD}'
                                    and matl_cd = '${col.MATL_CD}'
                                    and pu_cd = '${col.PU_CD}'
                                    -- and  (stsin_cd = '${tOne.STSIN_CD}' or stsin_array like '%${tOne.STSIN_CD}%')
                            `;
                            const tSQL99_1 = prisma.$queryRaw(
                                Prisma.raw(tSQL99),
                            );
                            tSQLArray.push(tSQL99_1);
                        }
                    }

                    var addSql = '';
                    var tLastCheck = 0;
                    if (tLastCheck === 1) {
                    } else {
                        // addSql = `                        and  ((po_seq > 0 and po_seq < 97) or po_seq > 100) `;
                    }

                    // STS-IN Delete 처리
                    var sql0_2 = `
                        select
                            *
                        from
                            ksv_stock_in
                        where
                            po_cd = '${col.PO_CD}'
                            and matl_cd = '${col.MATL_CD}'
                            and pu_cd = '${col.PU_CD}'
                            and stsin_cd = '${col.STSIN_CD}' ${addSql}
                    `;
                    var nRet0_2 = await prisma.$queryRaw(Prisma.raw(sql0_2));

                    var tIdx0_2 = 0;
                    for (tIdx0_2 = 0; tIdx0_2 < nRet0_2.length; tIdx0_2++) {
                        var tObj = { ...nRet0_2[tIdx0_2] };

                        if (parseFloat(tObj.IN_QTY) <= 0) continue;

                        // if (tObj.END_FLAG === '1' || tObj.CALC_FLAG === '1') {
                        if (tObj.END_FLAG === '1') {
                            var tRetArray = [];
                            var tObj = {};
                            tObj.CODE =
                                'ERROR:Cannot Update Already Bill Regist .';
                            tObj.id = 0;
                            tRetArray.push(tObj);
                            return tRetArray;
                        }

                        var tInQty = parseInt(tObj.IN_QTY);

                        let tSQL99 = `
                            update ksv_stock_mem
                            set
                                in_qty = in_qty - ${tInQty}
                            where
                                po_cd = '${tObj.PO_CD}'
                                and po_seq = '${tObj.PO_SEQ}'
                                and matl_cd = '${tObj.MATL_CD}'
                                and order_cd = '${tObj.ORDER_CD}'
                                and mrp_seq = '${tObj.MRP_SEQ}'
                                and matl_seq = '${tObj.MATL_SEQ}'
                                and pu_cd = '${col.PU_CD}'
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);

                        let tSQL99 = `
                            delete from ksv_stock_in
                            where
                                po_cd = '${tObj.PO_CD}'
                                and po_seq = '${tObj.PO_SEQ}'
                                and matl_cd = '${tObj.MATL_CD}'
                                and order_cd = '${tObj.ORDER_CD}'
                                and matl_cd = '${tObj.MATL_CD}'
                                and mrp_seq = '${tObj.MRP_SEQ}'
                                and pu_cd = '${col.PU_CD}'
                                and stsin_cd = '${col.STSIN_CD}' ${addSql}
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);
                    }

                    var sqlMoq = `
                        select
                            stock_idx
                        from
                            ksv_stock_in
                        where
                            po_cd = '${col.PO_CD}'
                            and matl_cd = '${col.MATL_CD}'
                            and pu_cd = '${col.PU_CD}'
                            and po_seq = 99
                    `;
                    var retMoq = await prisma.$queryRaw(Prisma.raw(sqlMoq));
                    if (retMoq.length > 0) {
                    }

                    var sqlOverShort = `
                        select
                            stock_idx
                        from
                            ksv_stock_in
                        where
                            po_cd = '${col.PO_CD}'
                            and matl_cd = '${col.MATL_CD}'
                            and pu_cd = '${col.PU_CD}'
                            and po_seq = 98
                    `;
                    var retOverShort = await prisma.$queryRaw(
                        Prisma.raw(sqlOverShort),
                    );
                    if (retOverShort.length > 0) {
                        let tSQL99 = `
                            delete from ksv_stock_matl
                            where
                                stock_idx = '${retOverShort[0].stock_idx}'
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);

                        let tSQL99 = `
                            delete from ksv_po_mrp
                            where
                                po_cd = '${col.PO_CD}'
                                and po_seq = '98'
                                and matl_cd = '${col.MATL_CD}'
                                and pu_cd = '${col.PU_CD}'
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);

                        let tSQL99 = `
                            delete from ksv_stock_mem
                            where
                                po_cd = '${col.PO_CD}'
                                and po_seq = '98'
                                and matl_cd = '${col.MATL_CD}'
                                and pu_cd = '${col.PU_CD}'
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);

                        let tSQL99 = `
                            update ksv_stock_mem2
                            set
                                leftover_qty = 0
                            where
                                po_cd = '${col.PO_CD}'
                                and matl_cd = '${col.MATL_CD}'
                                and pu_cd = '${col.PU_CD}'
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);
                    }

                    var sqlFoc = `
                        select
                            stock_idx
                        from
                            ksv_stock_in
                        where
                            po_cd = '${col.PO_CD}'
                            and matl_cd = '${col.MATL_CD}'
                            and pu_cd = '${col.PU_CD}'
                            and po_seq = 97
                    `;
                    var retFoc = await prisma.$queryRaw(Prisma.raw(sqlFoc));
                    if (retFoc.length > 0) {
                        let tSQL99 = `
                            delete from ksv_stock_matl
                            where
                                stock_idx = '${retFoc[0].stock_idx}'
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);

                        let tSQL99 = `
                            delete from ksv_po_mrp
                            where
                                po_cd = '${col.PO_CD}'
                                and po_seq = '97'
                                and matl_cd = '${col.MATL_CD}'
                                and pu_cd = '${col.PU_CD}'
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);

                        let tSQL99 = `
                            delete from ksv_stock_mem
                            where
                                po_cd = '${col.PO_CD}'
                                and po_seq = '97'
                                and matl_cd = '${col.MATL_CD}'
                                and pu_cd = '${col.PU_CD}'
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);
                    }

                    if (parseFloat(col.SURCHARGE_AMT) > 0) {
                        let tSQL99 = `
                            delete from ksv_cost_mst
                            where
                                po_cd = '${col.PO_CD}'
                                and vendor_cd = '${col.VENDOR_CD}'
                                and
                            type = 'STS_IN'
                            and type2 = 'Surcharge'
                            and stsin_cd = '${col.STSIN_CD}'
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);

                        var tUpdateVal =
                            parseFloat(tStockMem2.SURCHARGE_AMT) -
                            parseFloat(col.SURCHARGE_AMT);
                        var tSurPrice = parseFloat(tStockMem2.SURCHARGE_PRICE);
                        var tPoPrice = parseFloat(tStockMem2.PO_PRICE);
                        if (tUpdateVal <= 0) {
                            tUpdateVal = 0;
                            tSurPrice = 0;
                            tPoPrice = tStockMem2.MASTER_PRICE;
                        }

                        let tSQL99 = `
                            update ksv_stock_mem2
                            set
                                surcharge_amt = ${tUpdateVal},
                                surcharge_price = ${tSurPrice},
                                po_price = ${tPoPrice}
                            where
                                po_cd = '${col.PO_CD}'
                                and matl_cd = '${col.MATL_CD}'
                                and pu_cd = '${col.PU_CD}'
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        // tSQLArray.push(tSQL99_1);
                    }

                    // 재고 STS-IN 처리 취소
                    let tSQL99 = `
                        update ksv_stock_use
                        set
                            pu_cd = '',
                            stsin_cd = ''
                        where
                            pu_cd = '${col.PU_CD}'
                            and stsin_cd = '${col.STSIN_CD}'
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
                    tObj.CODE = 'ERROR:Cancel STOCK_IN';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                }

                // 금액재계산
                var tRet3 = await prisma.$queryRaw`
                    select
                        isnull(a.calc_flag, '0') as calc_flag,
                        sum(a.in_qty * b.PO_PRICE) as stsin_amt
                        -- sum(a.tot_qty * b.PO_PRICE) as stsin_amt2
                    from
                        ksv_stock_in a,
                        ksv_stock_mem2 b
                    where
                        a.pu_cd = ${tOne.PU_CD}
                        and a.po_cd = b.po_cd
                        and a.matl_cd = b.matl_cd
                        -- and   a.pu_cd = b.pu_cd
                        -- and   a.calc_flag = '1'
                    group by
                        a.calc_flag
                `;
                var tStsinAmt = 0;
                var tPayAmt = 0;
                tRet3.forEach((col, i) => {
                    if (col.calc_flag === '1')
                        tPayAmt += parseFloat(col.stsin_amt);
                    tStsinAmt += parseFloat(col.stsin_amt);
                });
                tStsinAmt = AFLib.numToFixed(tStsinAmt, 2);
                tPayAmt = AFLib.numToFixed(tPayAmt, 2);
                console.log(`Stsin Amt(stsin, pay): ${tStsinAmt}/${tPayAmt}`);

                tSQLArray = [];
                let tSQL99 = `
                    update ksv_pu_mst2
                    set
                        stsin_amt = ${tStsinAmt},
                        bill_amt = ${tPayAmt}
                    where
                        pu_cd = '${tOne.PU_CD}'
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
                    tObj.CODE = `ERROR:Cancel Stsin: ${e.message}`;
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED:Cancel stock_in';
            tObj.id = 0;
            tRetArray.push(tObj);
            return tRetArray;
        },

        mgrDelete_S043001_5_1105: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput = [...args.datas];

            var tIdx0 = 0;
            for (tIdx0 = 0; tIdx0 < tInput.length; tIdx0++) {
                var tOne = { ...tInput[tIdx0] };

                var tSQLArray = [];

                var sql10 = `
                    select
                        *
                    from
                        ksv_stock_in
                    where
                        pu_cd = '${tOne.PU_CD}'
                        and matl_cd = '${tOne.MATL_CD}'
                        and po_cd = '${tOne.PO_CD}'
                `;
                var ret10 = await prisma.$queryRaw(Prisma.raw(sql10));
                var tIdx10 = 0;
                var tChk = 0;
                for (tIdx10 = 0; tIdx10 < ret10.length; tIdx10++) {
                    var tObj11 = { ...ret10[tIdx10] };
                    var sql11 = `
                        select
                            *
                        from
                            ksv_stock_out
                        where
                            po_cd = '${tObj11.PO_CD}'
                            and po_seq = '${tObj11.PO_SEQ}'
                            and order_cd = '${tObj11.ORDER_CD}'
                            and matl_cd = '${tObj11.MATL_CD}'
                            and mrp_seq = '${tObj11.MRP_SEQ}'
                            and matl_seq = '${tObj11.MATL_SEQ}'
                            and in_datetime = '${tObj11.IN_DATETIME}'
                    `;
                    var ret11 = await prisma.$queryRaw(Prisma.raw(sql11));
                    if (ret11.length > 0) {
                        tChk = 1;
                        break;
                    }
                }
                if (tChk > 0) {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = 'ERROR:Cannot Update Already Sts Out .';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }

                /*
          var tSQL = `
              select
                  count(*) as t_cnt
              from
                  ksv_stock_out
              where
                  stsin_cd = '${tOne.STSIN_CD}'
          `;
          var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
          var tOutRecordCnt = 0;
          if (nRet0.length > 0) tOutRecordCnt = nRet0[0].t_cnt;
          if (tOutRecordCnt > 0 && tOne.BILL_TO === 'SHINTS') {
              var tRetArray = [];
              var tObj = {};
              tObj.CODE = 'ERROR:Cannot Update Already Sts Out .';
              tObj.id = 0; 
              tRetArray.push(tObj);
              return (tRetArray);
          }
*/

                var tSQL1 = `
                    select
                        *
                    from
                        ksv_stock_in_mst
                    where
                        stsin_cd = '${tOne.STSIN_CD}'
                `;
                var nRet1 = await prisma.$queryRaw(Prisma.raw(tSQL1));

                var tCheck_EndFlag = 0;
                var tCheck_BillFlag = 0;

                nRet1.forEach((col, i) => {
                    if (col.END_FLAG === '1') tCheck_EndFlag += 1;
                    if (col.BILL_FLAG === '1') tCheck_BillFlag += 1;
                });

                /*  20250918 WON
          if (tCheck_EndFlag > 0 || tCheck_BillFlag > 0) {
              if (tOne.BILL_TO === 'SHINTS') {
                 var tRetArray = [];
                 var tObj = {};
                 tObj.CODE = 'ERROR:Cannot Update Already Matl Amt End or TaxBill .';
                 tObj.id = 0; 
                 tRetArray.push(tObj);
                 return (tRetArray);
              }
          }
*/

                /*
          var lastCheckSql = `
              select
                  *
              from
                  ksv_stock_mem2_stsin
              where
                  stsin_cd <> '${tOne.STSIN_CD}'
          `;
*/

                /*   20250916  - Won
          var lastCheckSql = `
              select
                  *
              from
                  ksv_stock_mem2_stsin
              where
                  pu_cd = '${tOne.PU_CD}'
              order by
                  STSIN_CD
          `;
          var lastCheckRet = await prisma.$queryRaw(Prisma.raw(lastCheckSql));
          var tLastCheck = 0;
          var tLastCheckIdx = -1;
          lastCheckRet.forEach((col2, i2) => {
              if (col2.STSIN_CD === tOne.STSIN_CD) tLastCheckIdx = i2;
          });
          if (tLastCheckIdx === lastCheckRet.length-1) tLastCheck = 1;
          if (tLastCheck !== 1) {
              var tRetArray = [];
              var tObj = {};
              // tObj.CODE = 'ERROR:맨 마지작 Full in 된것만 취소가능합니다. ';
              tObj.CODE = 'ERROR:맨 마지막에 In시킨것 부터  취소가능합니다. ';
              tObj.id = 0; 
              tRetArray.push(tObj);
              return (tRetArray);
          }
*/

                var tSQL2 = `
                    select
                        *
                    from
                        ksv_stock_mem2_stsin
                    where
                        stsin_cd = '${tOne.STSIN_CD}'
                        and matl_cd = '${tOne.MATL_CD}'
                `;
                var nRet2 = await prisma.$queryRaw(Prisma.raw(tSQL2));

                let tSQL99 = `
                    delete from ksv_stock_in_mst
                    where
                        stsin_cd = '${tOne.STSIN_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                // tSQLArray.push(tSQL99_1);

                if (tOne.BILL_TO !== 'SHINTS') {
                    let tSQL99 = `
                        delete from ksv_shipment_mem
                        where
                            stsout_cd in (
                                select distinct
                                    stsout_cd
                                from
                                    ksv_stock_out_mst
                                where
                                    stsin_cd = '${tOne.STSIN_CD}'
                                    and pu_cd = '${tOne.PU_CD}'
                            )
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
                        delete from ksv_stock_out_mst
                        where
                            stsin_cd = '${tOne.STSIN_CD}'
                            and pu_cd = '${tOne.PU_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
                        delete from ksv_stock_out
                        where
                            stsin_cd = '${tOne.STSIN_CD}'
                            and pu_cd = '${tOne.PU_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
                        delete from ksv_stock_mem2_stsout
                        where
                            stsin_cd = '${tOne.STSIN_CD}'
                            and pu_cd = '${tOne.PU_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    /*
               var tIdx99 =0;
               for (tIdx99 = 0; tIdx99 <  nRet2.length; tIdx99 ++) {
                  var tOne99 = { ...nRet2[tIdx99] };

                  let tSQL99 = `
                      update ksv_stock_mem2
                      set
                          in_qty = 0,
                          out_qty = 0
                      where
                          matl_cd = '${tOne99.MATL_CD}'
                          and pu_cd = '${tOne.PU_CD}'
                  `;
                  const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                  tSQLArray.push(tSQL99_1);

                  let tSQL99 = `
                      update ksv_stock_mem
                      set
                          in_qty = 0,
                          out_qty = 0
                      where
                          matl_cd = '${tOne99.MATL_CD}'
                          and po_cd = '${tOne99.PO_CD}'
                          and pu_cd = '${tOne.PU_CD}'
                  `;
                  const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                  tSQLArray.push(tSQL99_1);
               }
               */
                }

                let tSQL99 = `
                    delete from ksv_stock_mem2_stsin
                    where
                        stsin_cd = '${tOne.STSIN_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                // `tSQLArray.push(tSQL99_1);

                var tIdx9 = 0;

                // Part In 처리
                /*
          if (nRet2.length <= 0) {    
                var sql0_1 = ` 
                        select * from ksv_stock_mem2 
				                where po_cd='${col.PO_CD}' 
				                and  matl_cd='${col.MATL_CD}' 
				                and  pu_cd='${col.PU_CD}' 
                    `;
                var nRet0_1 = await prisma.$queryRaw(Prisma.raw(sql0_1));
                var tStockMem2 = { ...nRet0_1[0] };

                tPercent = parseFloat(nRet0_1[0].IN_QTY) / parseFloat(col.STSIN_QTY) ;
                var tUpdateVal = parseFloat(tStockMem2.IN_QTY) - parseFloat(col.STSIN_QTY);
                if (tUpdateVal <= 0) tUpdateVal = 0;

                let tSQL99 = `
				               update ksv_stock_mem2  set 
				                 in_qty =  '${tUpdateVal}'
				               where po_cd='${col.PO_CD}' 
				                and  matl_cd='${col.MATL_CD}' 
				                and  pu_cd='${col.PU_CD}' 
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
          }
          */

                // Full In/Part In 처리 (구분없음)
                // nRet2 -> ksv_stock_mem2
                for (tIdx9 = 0; tIdx9 < nRet2.length; tIdx9++) {
                    // nRet2 > 0 : fullin
                    var col = { ...nRet2[tIdx9] };

                    var tStockUse = 0;
                    var tIdxStr = `'999'`;
                    if (col.MOQ_STOCK_IDX !== '')
                        tIdxStr += `,'${col.MOQ_STOCK_IDX}'`;
                    if (col.FOC_STOCK_IDX !== '')
                        tIdxStr += `,'${col.FOC_STOCK_IDX}'`;
                    if (col.LEFTOVER_STOCK_IDX !== '')
                        tIdxStr += `,'${col.LEFTOVER_STOCK_IDX}'`;

                    // stock_use 테이블로 바꿈
                    // MOQ, FOC ,LEFTOvr 사용유무 파악
                    if (
                        parseInt(col.MOQ_QTY) > 0 ||
                        parseInt(col.FOC_QTY) > 0 ||
                        parseInt(col.OVERSHORT_QTY)
                    ) {
                        /*
                    var sql0 = ` 
                        select isnull(sum(use_qty), 0) as t_sum from ksv_stock_matl where stock_idx in (${tIdxStr})
                    `;
                    var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                    if (nRet0.length > 0 && nRet0[0].t_sum > 0) tStockUse = nRet0[0].t_sum;
                    */
                        var sql0 = ` 
                        select isnull(count(*), 0) as t_sum from ksv_stock_use 
                        where stock_idx in (${tIdxStr})
                    `;
                        var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                        if (nRet0.length > 0 && nRet0[0].t_sum > 0)
                            tStockUse = nRet0[0].t_sum;
                    }

                    if (tStockUse > 0) {
                        var tRetArray = [];
                        var tObj = {};
                        tObj.CODE =
                            'ERROR:Cancel Stock In: Cannot Cancel. Stock(Moq, OverLeftIn, Foc) Already Used.';
                        tObj.id = 0;
                        tRetArray.push(tObj);
                        return tRetArray;
                    }

                    /*
                if (col.OUT_STATUS === '1' || parseInt (col.OUT_QTY) > 0) {
                    if (tOne.BILL_TO === 'SHINTS') {
                        var tRetArray = [];
                        var tObj = {};
                        tObj.CODE = 'ERROR:Already Output..';
                        tObj.id = 0; 
                        tRetArray.push(tObj);
                        return (tRetArray);
                    }
                }
                */

                    var sql0_1 = ` 
                        select 
                              isnull(stsin_cd, '') as STSIN_CD, 
                              isnull(stsin_array, '') as STSIN_ARRAY, 
                              isnull(in_qty, 0) as IN_QTY 
                        from ksv_stock_mem2 
				                where po_cd='${col.PO_CD}' 
				                and  matl_cd='${col.MATL_CD}' 
				                and  pu_cd='${col.PU_CD}' 
                        -- and  (stsin_cd = '${tOne.STSIN_CD}' or stsin_array like '%${tOne.STSIN_CD}%')
                    `;
                    var nRet0_1 = await prisma.$queryRaw(Prisma.raw(sql0_1));
                    var tStockMem2 = {};
                    if (nRet0_1.length > 0) tStockMem2 = { ...nRet0_1[0] };

                    /*
                if (col.STSIN_TYPE === 'PART_IN' && tStockMem2.STSIN_CD !== '') {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = 'ERROR:Full In된 Part In은 취소할수 없습니다.';
                    tObj.id = 0; 
                    tRetArray.push(tObj);
                    return (tRetArray);
                }
                */

                    var tUpdateVal = 0;
                    if (nRet0_1.lengvth > 0) {
                        console.log(
                            `Stock mem2 update => ${tStockMem2.IN_QTY}/${col.STSIN_QTY}`,
                        );
                        tUpdateVal =
                            parseFloat(tStockMem2.IN_QTY) -
                            parseFloat(col.STSIN_QTY);
                        if (tUpdateVal <= 0) tUpdateVal = 0;
                    } else {
                        tUpdateVal = parseFloat(col.STSIN_QTY);
                    }

                    if (col.STSIN_TYPE === 'PART_IN') {
                        var tCols = tStockMem2.STSIN_ARRAY.split('/');
                        var tCnt = 0;
                        var tNewSTSIN_ARRAY = '';
                        tCols.forEach((col9, i9) => {
                            if (col9 === tOne.STSIN_CD);
                            else {
                                if (tCnt === 0) tNewSTSIN_ARRAY += `${col9}`;
                                else tNewSTSIN_ARRAY += `/${col9}`;
                                tCnt++;
                            }
                        });

                        let tSQL99 = `
				                update ksv_stock_mem2  set 
				                 in_qty = ${tUpdateVal},
				                 po_qty2 = ${col.SAVE_PO_QTY},
				                 surcharge_amt = ${col.SAVE_SURCHARGE_AMT},
				                 surcharge_price = ${col.SAVE_SURCHARGE_PRICE},
				                 po_price = ${col.SAVE_PO_PRICE},
                         stsin_cd = '' ,
                         stsin_array = '${tNewSTSIN_ARRAY}'
				                where po_cd='${col.PO_CD}' 
				                and  matl_cd='${col.MATL_CD}' 
				                and  pu_cd='${col.PU_CD}' 
                        -- and  (stsin_cd = '${tOne.STSIN_CD}' or stsin_array like '%${tOne.STSIN_CD}%')
                    `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);
                    } else {
                        // FULL-IN 취소 처리 : 이미 진행중인 Purchase(STSIN_CD가 0)가 있는경우
                        //                     취소하는 Fullin을 병합한다

                        var sql0_2 = ` 
                        select 
                               isnull(STSIN_ARRAY, '') as STSIN_ARRAY, 
                               isnull(IN_QTY, 0) as IN_QTY,
                               isnull(PO_QTY2, 0) as PO_QTY2
                        from ksv_stock_mem2 
				                where po_cd='${col.PO_CD}' 
				                and  matl_cd='${col.MATL_CD}' 
				                and  pu_cd='${col.PU_CD}' 
                        -- and  stsin_cd = '' 
                    `;
                        var nRet0_2 = await prisma.$queryRaw(
                            Prisma.raw(sql0_2),
                        );
                        if (nRet0_2.length > 0) {
                            var tStockMem2_1 = { ...nRet0_2[0] };
                            tUpdateVal =
                                parseFloat(tStockMem2_1.IN_QTY) +
                                parseFloat(tStockMem2.IN_QTY) -
                                parseFloat(col.STSIN_QTY);
                            var tPoQty2 =
                                parseFloat(tStockMem2_1.PO_QTY2) +
                                parseFloat(col.SAVE_PO_QTY);

                            var tNewStsIn_Array9 = tStockMem2_1.STSIN_ARRAY;
                            tNewStsIn_Array9 += tStockMem2.STSIN_ARRAY;
                            // 진행중인 Purchase가 있는 경우
                            let tSQL99 = `
				                    update ksv_stock_mem2  set 
				                     in_qty = ${tUpdateVal},
				                     po_qty2 = ${tPoQty2},
				                     -- moq = ${col.SAVE_MOQ_QTY},
				                     -- leftover_qty = ${col.SAVE_OVERSHORT_QTY},
				                     -- foc_qty = ${col.SAVE_FOC_QTY},
				                     -- surcharge_amt = ${col.SAVE_SURCHARGE_AMT},
				                     -- surcharge_price = ${col.SAVE_SURCHARGE_PRICE},
				                     -- po_price = ${col.SAVE_PO_PRICE},
				                     -- other_amt = 0,
				                     -- other_price = 0,
				                     -- freight_amt = 0,
				                     -- freight_price = 0,
                             -- stock_status = '0',
                             -- moq_stock_idx = '',
                             -- leftover_stock_idx = '',
                             -- foc_stock_idx = '',
                             -- bef_total_mrp = 0,
                             -- bef_stock_qty = 0,
                             -- stsin_cd = '',  
                             stsin_array = '${tNewStsIn_Array9}' 
				                    where po_cd='${col.PO_CD}' 
				                    and  matl_cd='${col.MATL_CD}' 
				                    and  pu_cd='${col.PU_CD}' 
                            -- and  stsin_cd = '' 
                        `;
                            const tSQL99_1 = prisma.$queryRaw(
                                Prisma.raw(tSQL99),
                            );
                            tSQLArray.push(tSQL99_1);
                        } else {
                            // 진행중인 Purchase가 없는경우
                            let tSQL99 = `
				                    update ksv_stock_mem2  set 
				                     in_qty = ${tUpdateVal},
				                     po_qty2 = ${col.SAVE_PO_QTY},
				                     moq = ${col.SAVE_MOQ_QTY},
				                     leftover_qty = ${col.SAVE_OVERSHORT_QTY},
				                     foc_qty = ${col.SAVE_FOC_QTY},
				                     surcharge_amt = ${col.SAVE_SURCHARGE_AMT},
				                     surcharge_price = ${col.SAVE_SURCHARGE_PRICE},
				                     po_price = ${col.SAVE_PO_PRICE},
				                     other_amt = 0,
				                     other_price = 0,
				                     freight_amt = 0,
				                     freight_price = 0,
                             stock_status = '0',
                             moq_stock_idx = '',
                             leftover_stock_idx = '',
                             foc_stock_idx = '',
                             bef_total_mrp = 0,
                             bef_stock_qty = 0,
                             stsin_cd = '' 
				                    where po_cd='${col.PO_CD}' 
				                    and  matl_cd='${col.MATL_CD}' 
				                    and  pu_cd='${col.PU_CD}' 
                            -- and  (stsin_cd = '${tOne.STSIN_CD}' or stsin_array like '%${tOne.STSIN_CD}%')
                        `;
                            const tSQL99_1 = prisma.$queryRaw(
                                Prisma.raw(tSQL99),
                            );
                            tSQLArray.push(tSQL99_1);
                        }
                    }

                    var addSql = '';
                    var tLastCheck = 0;
                    if (tLastCheck === 1) {
                    } else {
                        // addSql = `                        and  ((po_seq > 0 and po_seq < 97) or po_seq > 100) `;
                    }

                    var sql0_2 = ` 
                        select * from ksv_stock_in 
				                where po_cd='${col.PO_CD}' 
				                and  matl_cd='${col.MATL_CD}' 
				                and  pu_cd='${col.PU_CD}' 
				                and  stsin_cd='${col.STSIN_CD}' 
                        ${addSql}
                    `;
                    var nRet0_2 = await prisma.$queryRaw(Prisma.raw(sql0_2));

                    var tIdx0_2 = 0;
                    for (tIdx0_2 = 0; tIdx0_2 < nRet0_2.length; tIdx0_2++) {
                        var tObj = { ...nRet0_2[tIdx0_2] };

                        if (parseInt(tObj.IN_QTY) <= 0) continue;

                        var tInQty = parseInt(tObj.IN_QTY);

                        let tSQL99 = `
				               update ksv_stock_mem  set 
				                 in_qty = in_qty - ${tInQty}
				               where po_cd='${tObj.PO_CD}' 
				                and  po_seq='${tObj.PO_SEQ}' 
				                and  matl_cd='${tObj.MATL_CD}' 
				                and  order_cd='${tObj.ORDER_CD}' 
				                and  mrp_seq ='${tObj.MRP_SEQ}' 
				                and  matl_seq ='${tObj.MATL_SEQ}' 
				                and  pu_cd='${col.PU_CD}' 
                    `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);

                        let tSQL99 = `
                        delete from ksv_stock_in 
				                where po_cd='${tObj.PO_CD}' 
				                and   po_seq='${tObj.PO_SEQ}' 
				                and  matl_cd='${tObj.MATL_CD}' 
				                and  order_cd='${tObj.ORDER_CD}' 
				                and  matl_cd='${tObj.MATL_CD}' 
				                and  mrp_seq='${tObj.MRP_SEQ}' 
				                and  pu_cd='${col.PU_CD}' 
				                and  stsin_cd='${col.STSIN_CD}' 
                        ${addSql}
                    `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);
                    }

                    var sqlMoq = ` 
                        select stock_idx from ksv_stock_in 
				                where po_cd='${col.PO_CD}' 
				                and  matl_cd='${col.MATL_CD}' 
				                and  pu_cd='${col.PU_CD}' 
                        and  po_seq = 99
                    `;
                    var retMoq = await prisma.$queryRaw(Prisma.raw(sqlMoq));

                    // if (parseInt(col.MOQ_QTY) > 0) {
                    if (retMoq.length > 0) {
                        /*
                    let tSQL99 = `
                        delete from ksv_stock_matl where stock_idx = '${retMoq[0].stock_idx}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                    let tSQL99 = `
                          delete from ksv_po_mrp 
				                  where po_cd='${col.PO_CD}' 
				                  and  po_seq='99' 
				                  and  matl_cd='${col.MATL_CD}' 
				                  and  pu_cd='${col.PU_CD}' 
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                    let tSQL99 = `
                          delete from ksv_stock_mem 
				                  where po_cd='${col.PO_CD}' 
				                  and  po_seq='99' 
				                  and  matl_cd='${col.MATL_CD}' 
				                  and  pu_cd='${col.PU_CD}' 
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                    let tSQL99 = `
				               update ksv_stock_mem2  set 
                         moq = 0
				               where po_cd='${col.PO_CD}' 
				                and  matl_cd='${col.MATL_CD}' 
				                and  pu_cd='${col.PU_CD}' 
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                    let tSQL99 = `
                       delete from ksv_cost_mst 
				               where po_cd='${col.PO_CD}' 
				                and  matl_cd='${col.MATL_CD}' 
				                and  vendor_cd='${col.VENDOR_CD}' 
				                and  type = 'STS_IN' 
                        and  type2 = 'MOQ'
                        and  stsin_cd = '${col.STSIN_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                    */
                    }

                    var sqlOverShort = ` 
                        select stock_idx from ksv_stock_in 
				                where po_cd='${col.PO_CD}' 
				                and  matl_cd='${col.MATL_CD}' 
				                and  pu_cd='${col.PU_CD}' 
                        and  po_seq = 98
                    `;
                    var retOverShort = await prisma.$queryRaw(
                        Prisma.raw(sqlOverShort),
                    );
                    // if (parseInt(col.OVERSHORT_QTY) > 0) {
                    if (retOverShort.length > 0) {
                        let tSQL99 = `
                        delete from ksv_stock_matl where stock_idx = '${retOverShort[0].stock_idx}'
                    `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);

                        let tSQL99 = `
                        delete from ksv_po_mrp 
				                where po_cd='${col.PO_CD}' 
				                and  po_seq='98' 
				                and  matl_cd='${col.MATL_CD}' 
				                and  pu_cd='${col.PU_CD}' 
                    `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);

                        let tSQL99 = `
                        delete from ksv_stock_mem 
				                where po_cd='${col.PO_CD}' 
				                and  po_seq='98' 
				                and  matl_cd='${col.MATL_CD}' 
				                and  pu_cd='${col.PU_CD}' 
                    `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);

                        let tSQL99 = `
				               update ksv_stock_mem2  set 
                         leftover_qty = 0 
				               where po_cd='${col.PO_CD}' 
				                and  matl_cd='${col.MATL_CD}' 
				                and  pu_cd='${col.PU_CD}' 
                    `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);
                    }

                    var sqlFoc = ` 
                        select stock_idx from ksv_stock_in 
				                where po_cd='${col.PO_CD}' 
				                and  matl_cd='${col.MATL_CD}' 
				                and  pu_cd='${col.PU_CD}' 
                        and  po_seq = 97
                    `;
                    var retFoc = await prisma.$queryRaw(Prisma.raw(sqlFoc));
                    // if (parseInt(col.FOC_QTY) > 0) {
                    if (retFoc.length > 0) {
                        let tSQL99 = `
                        delete from ksv_stock_matl where stock_idx = '${retFoc[0].stock_idx}'
                    `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);

                        let tSQL99 = `
                       delete from ksv_po_mrp 
			                 where po_cd='${col.PO_CD}' 
			                 and  po_seq='97' 
			                 and  matl_cd='${col.MATL_CD}' 
				               and  pu_cd='${col.PU_CD}' 
                    `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);

                        let tSQL99 = `
                          delete from ksv_stock_mem 
				                  where po_cd='${col.PO_CD}' 
				                  and  po_seq='97' 
				                  and  matl_cd='${col.MATL_CD}' 
				                  and  pu_cd='${col.PU_CD}' 
                     `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);
                    }

                    if (parseFloat(col.SURCHARGE_AMT) > 0) {
                        let tSQL99 = `
                       delete from ksv_cost_mst 
				               where po_cd='${col.PO_CD}' 
				                and  vendor_cd='${col.VENDOR_CD}' 
				                and  type = 'STS_IN' 
                        and  type2 = 'Surcharge'
                        and  stsin_cd = '${col.STSIN_CD}'
                    `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);

                        var tUpdateVal =
                            parseFloat(tStockMem2.SURCHARGE_AMT) -
                            parseFloat(col.SURCHARGE_AMT);
                        var tSurPrice = parseFloat(tStockMem2.SURCHARGE_PRICE);
                        var tPoPrice = parseFloat(tStockMem2.PO_PRICE);
                        if (tUpdateVal <= 0) {
                            tUpdateVal = 0;
                            tSurPrice = 0;
                            tPoPrice = tStockMem2.MASTER_PRICE;
                        }

                        let tSQL99 = `
				               update ksv_stock_mem2  set 
                         surcharge_amt = ${tUpdateVal},
                         surcharge_price = ${tSurPrice},
                         po_price = ${tPoPrice}
				               where po_cd='${col.PO_CD}' 
				                and  matl_cd='${col.MATL_CD}' 
				                and  pu_cd='${col.PU_CD}' 
                    `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        // tSQLArray.push(tSQL99_1);
                    }

                    // 재고 STS-IN 처리 취소
                    let tSQL99 = `
                     update ksv_stock_use set 
                            pu_cd = '', 
                            stsin_cd = ''
                     where  pu_cd = '${col.PU_CD}' 
                     and    stsin_cd = '${col.STSIN_CD}'
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
                    tObj.CODE = 'ERROR:Cancel STOCK_IN';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                }

                // 금액재계산
                var tRet3 = await prisma.$queryRaw`
               select  isnull(a.calc_flag, '0') as calc_flag,
                       sum(a.in_qty * b.PO_PRICE) as stsin_amt
                       -- sum(a.tot_qty * b.PO_PRICE) as stsin_amt2
               from ksv_stock_in a, ksv_stock_mem2 b
               where a.pu_cd = ${tOne.PU_CD}
               and   a.po_cd = b.po_cd
               and   a.matl_cd = b.matl_cd
               -- and   a.pu_cd = b.pu_cd
               -- and   a.calc_flag = '1'
               group by a.calc_flag
          `;
                var tStsinAmt = 0;
                var tPayAmt = 0;
                tRet3.forEach((col, i) => {
                    if (col.calc_flag === '1')
                        tPayAmt += parseFloat(col.stsin_amt);
                    tStsinAmt += parseFloat(col.stsin_amt);
                });
                tStsinAmt = AFLib.numToFixed(tStsinAmt, 2);
                tPayAmt = AFLib.numToFixed(tPayAmt, 2);
                console.log(`Stsin Amt(stsin, pay): ${tStsinAmt}/${tPayAmt}`);

                tSQLArray = [];
                let tSQL99 = `
               update ksv_pu_mst2 set 
                  stsin_amt = ${tStsinAmt} ,
                  bill_amt = ${tPayAmt}
               where pu_cd = '${tOne.PU_CD}'
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
                    tObj.CODE = `ERROR:Cancel Stsin: ${e.message}`;
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED:Cancel stock_in';
            tObj.id = 0;
            tRetArray.push(tObj);
            return tRetArray;
        },

        mgrUpdate_S043001_Leader_Confirm: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput = [...args.datas];
            var tSQLArray = [];

            var tIdx0 = 0;
            for (tIdx0 = 0; tIdx0 < tInput.length; tIdx0++) {
                var tOne = { ...tInput[tIdx0] };

                var tSQL = ` 
              select isnull(leader_confirm, '') as leader_confirm from ksv_stock_mem2_stsin where stsin_cd  = '${tOne.STSIN_CD}'
              `;
                var nRet = await prisma.$queryRaw(Prisma.raw(tSQL));

                if (nRet.length <= 0) continue;
                var tStsObj = { ...nRet[0] };
                if (tStsObj.leader_confirm !== '') continue;

                let tSQL99 = `
               update ksv_stock_mem2_stsin set leader_confirm = '${tUserInfo.USER_ID}' where stsin_cd  = '${tOne.STSIN_CD}'
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
                tObj.CODE = 'SUCCEED:Update Leader Confirm';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = `ERROR:Update Leader Confirm:${e.message}`;
                tObj.id = 0;
                tRetArray.push(tObj);
            }
        },
    },
};

export default moduleMutation_S043001_5;
