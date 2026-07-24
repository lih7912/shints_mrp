import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

//
class S0430_COMM {
    async queryS0430_LIST_2(argData, contextValue) {
        var sql1 = `
            select 
                  po_cd,
                  matl_cd,
                  sum(po_qty) as po_qty, sum(use_qty) as use_qty
            from  ksv_po_mrp 
            where pu_cd = '${argData.PU_CD}'
            and   use_po_type = '1'
            and   (po_seq < 97  or po_seq > 99)
            group by po_cd, matl_cd
        `   ;
        var ret_mrp  =  await prisma.$queryRaw(Prisma.raw(sql1));
  
        var sql1_1 = `
            select po_cd, matl_cd, sum(po_qty) as po_qty, sum(use_qty) as use_qty
            from  ksv_po_mrp 
            where pu_cd = '${argData.PU_CD}'
            and   use_po_type = '1'
            and   po_seq = 99
            group by po_cd, matl_cd
        `   ;
        var ret_moq  =  await prisma.$queryRaw(Prisma.raw(sql1_1));
  
        var sql2 = `
            select po_cd, po_matl_cd as matl_cd, sum(po_qty) as po_qty, sum(use_qty) as use_qty
            from  ksv_po_mrp 
            where pu_cd = '${argData.PU_CD}'
            and   use_po_type = '2'
            group by po_cd, po_matl_cd
        `   ;
        var ret_stock  =  await prisma.$queryRaw(Prisma.raw(sql2));
  
        var sql3 = `
            select po_cd, matl_cd, sum(po_qty) as po_qty, sum(use_qty) as use_qty
            from  ksv_po_mrp 
            where pu_cd = '${argData.PU_CD}'
            and   use_po_type = '2' and diff_po_type = '5'
            group by po_cd, matl_cd
        `   ;
        var ret_mrp_stock_cancel  =  await prisma.$queryRaw(Prisma.raw(sql3));
  
        var sql4 = `
            select 'left-over' as kind, po_cd, matl_cd, sum(po_qty * (-1)) as po_qty, sum(use_qty * (-1)) as use_qty
            from  ksv_po_mrp 
            where pu_cd = '${argData.PU_CD}'
            and   use_po_type = '1'
            and   diff_po_type = '1'
            group by po_cd, matl_cd
        `   ;
        var ret_left_over  =  await prisma.$queryRaw(Prisma.raw(sql4));
  
        var sql5 = `
            select po_cd, matl_cd, sum(po_qty) as po_qty, sum(in_qty) as in_qty, sum(out_qty) as out_qty
            from  ksv_stock_mem
            where pu_cd = '${argData.PU_CD}'
            group by po_cd, matl_cd
        `   ;
        var ret_stock_mem  =  await prisma.$queryRaw(Prisma.raw(sql5));
  
        var sql0 = `
            select 
                  a1.PO_CD,
                  A3.VENDOR_CD,
                  A1.MATL_CD,
                  A3.MATL_NAME,
                  A3.COLOR,
                  A3.SPEC,
                  A3.UNIT,
                  A4.CURR_CD,
                  A6.FACTORY_CD,
                  A4.MATL_PRICE,
                  A1.PO_PRICE,
                  A1.MASTER_PRICE,
                  A1.SURCHARGE_AMT,
                  A1.SURCHARGE_PRICE,
                  A1.SURCHARGE_REMARK,
                  isnull(max(A6.PO_SEQ), 1) as PO_SEQ
            from  ksv_stock_mem2 A1,
                  KCD_MATL_MST A3,
                  KCD_MATL_MEM A4,
                  KSV_PO_MST A6
            where a1.pu_cd = '${argData.PU_CD}'
            and   a1.matl_cd = a3.matl_cd
            and   a4.matl_cd = a1.matl_cd
            and   a4.matl_seq =(select max(matl_seq) from kcd_matl_mem where matl_cd = a1.matl_cd)
            and   a6.po_cd = a1.po_cd 
            group  by
                  a1.PO_CD,
                  A3.VENDOR_CD,
                  A1.MATL_CD,
                  A3.MATL_NAME,
                  A3.COLOR,
                  A3.SPEC,
                  A3.UNIT,
                  A4.CURR_CD,
                  A6.FACTORY_CD,
                  A4.MATL_PRICE,
                  A1.PO_PRICE,
                  A1.MASTER_PRICE,
                  A1.SURCHARGE_AMT,
                  A1.SURCHARGE_PRICE,
                  A1.SURCHARGE_REMARK
        `;
        var ret0  =  await prisma.$queryRaw(Prisma.raw(sql0));
        var idx0 = 0;
  
        var tStr = '';
                tStr += `PO#`;
                tStr += `,MATL_CD`;
                tStr += `,MRP_QTY`;
                tStr += `,STOCK_QTY`;
                tStr += `,MOQ_QTY`;
                tStr += `,PO_QTY`;
                tStr += `,LEFTOVER_QTY`;
                tStr += `,PO_QTY2`;
                tStr += `,(PartIn/StsIn)`;
                tStr += `,(PartOut/StsOut)`;
        console.log(tStr);
        var tArray1 = [];
        for (idx0 = 0; idx0 < ret0.length; idx0++) {
            var tOne = { ...ret0[idx0] };
  
            var tMrpQty = 0;
            var tPoQty = 0;
            ret_mrp.forEach((col, i) => {
                if (col.po_cd === tOne.PO_CD &&
                    col.matl_cd === tOne.MATL_CD) {
                    tMrpQty += col.use_qty;
                    tPoQty += col.po_qty;
                }
            });
  
            var tMoqQty = 0;
            ret_moq.forEach((col, i) => {
                if (col.po_cd === tOne.PO_CD &&
                    col.matl_cd === tOne.MATL_CD) {
                    tMoqQty += col.use_qty;
                }
            });
  
            var tStockQty = 0;
            ret_stock.forEach((col, i) => {
                if (col.po_cd === tOne.PO_CD &&
                    col.matl_cd === tOne.MATL_CD) {
                    tStockQty += col.po_qty;
                }
            });
  
            ret_mrp_stock_cancel.forEach((col, i) => {
                if (col.po_cd === tOne.PO_CD &&
                    col.matl_cd === tOne.MATL_CD) {
                    tMrpQty += col.po_qty;
                }
            });
  
            var tLeftOverQty = 0;
            ret_left_over.forEach((col, i) => {
                if (col.po_cd === tOne.PO_CD &&
                    col.matl_cd === tOne.MATL_CD) {
                    tLeftOverQty += col.po_qty;
                }
            });
  
            var tPoQty2 = 0;
            var tPartStsInQty = 0;
            var tPartStsOutQty = 0;
            ret_stock_mem.forEach((col, i) => {
                if (col.po_cd === tOne.PO_CD &&
                    col.matl_cd === tOne.MATL_CD) {
                    tPoQty2 += col.po_qty;
                    tPartStsInQty += col.in_qty;
                    tPartStsOutQty += col.out_qty;
                }
            });
  
            if (tLeftOverQty > 0) {
                if (tPoQty2 > tLeftOverQty) tPoQty2 -= tLeftOverQty;
                if (tPartStsInQty > tLeftOverQty) tPartStsInQty -= tLeftOverQty;
                if (tPartStsOutQty > tLeftOverQty) tPartStsOutQty -= tLeftOverQty;
            }
  
            var tBalStsInQty = tPoQty2 - tPartStsInQty;
            var tBalStsOutQty = tPartStsInQty - tPartStsOutQty;
  
            var tStr = '';
                tStr += `${tOne.PO_CD}`;
                tStr += `,${tOne.MATL_CD}`;
                tStr += `,${tMrpQty}`;
                tStr += `,${tStockQty}`;
                tStr += `,${tMoqQty}`;
                tStr += `,${tPoQty}`;
                tStr += `,${tLeftOverQty}`;
                tStr += `,${tPoQty2}`;
                tStr += `,(${tPartStsInQty}`;
                tStr += `,${tBalStsInQty})`;
                tStr += `,(${tPartStsOutQty}`;
                tStr += `,${tBalStsOutQty})`;
            console.log(`${tStr}`);

            var wObj = { ...tOne };
            wObj.PU_CD = argData.PU_CD;
            wObj.PU_STATUS = '-';
            if (parseFloat(tPartStsInQty) > 0) wObj.PU_STATUS = 'PartIn';
            wObj.MRP_QTY = parseFloat(tMrpQty).toFixed(2);
            wObj.STOCK_QTY = parseFloat(tStockQty).toFixed(2);
            wObj.MOQ_QTY = parseFloat(tMoqQty).toFixed(2);
            wObj.OVER_QTY = '0';
            wObj.LEFTOVER_QTY = parseFloat(tLeftOverQty).toFixed(2);
            wObj.PO_QTY = parseFloat(tPoQty2).toFixed(2);
            wObj.PO_UPDATE_QTY = parseFloat(tPoQty2).toFixed(2);
            wObj.DIFF_QTY = '0';
            wObj.STSIN_PO_QTY = parseFloat(tPoQty2).toFixed(2);
            wObj.STSIN_IN_QTY = parseFloat(tPartStsInQty).toFixed(2);
            wObj.STSIN_OUT_QTY = parseFloat(tPartStsOutQty).toFixed(2);
            tArray1.push(wObj);
        }

        var tDataArray4 = [];
        var tIdx = 0;
        for (tIdx = 0; tIdx < tArray1.length; tIdx++) {
            var tOrderQty = { ...tArray1[tIdx] };
            var tResult = {};
            tResult.PU_CD = argData.PU_CD;
            tResult.PO_CD = tOrderQty.PO_CD;
            tResult.PO_SEQ = '';
            tResult.MATL_CD = tOrderQty.MATL_CD;
            tResult.MATL_SEQ = '';
            tResult.MATL_NAME = tOrderQty.MATL_NAME;
            tResult.COLOR = tOrderQty.COLOR;
            tResult.SPEC = tOrderQty.SPEC;
            tResult.UNIT = tOrderQty.UNIT;
            tResult.CURR_CD = tOrderQty.CURR_CD;
            tResult.MASTER_PRICE = parseFloat(tOrderQty.MASTER_PRICE).toFixed(4);
            tResult.CONF_FLAG = '1';
            tResult.PO_PRICE = tOrderQty.PO_PRICE;
            tResult.SURCHARGE_PRICE = '0';
            tResult.SURCHARGE_AMT = '0';
            tResult.SURCHARGE_REMARK = '';
            tResult.MRP_QTY = parseFloat(tOrderQty.MRP_QTY).toFixed(2);
            tResult.STOCK_QTY = parseFloat(tOrderQty.STOCK_QTY).toFixed(2);
            tResult.PO_QTY = parseFloat(tOrderQty.PO_QTY).toFixed(2);
            tResult.MOQ_QTY = parseFloat(tOrderQty.MOQ_QTY).toFixed(2);
            tResult.LEFTOVER_QTY = parseFloat(tOrderQty.LEFTOVER_QTY).toFixed(2);
            tResult.PART_IN_QTY = parseFloat(tOrderQty.STSIN_IN_QTY).toFixed(2);
            tResult.FOC_QTY = '0';
            tResult.OVER_SHORT_QTY = '0';
            tResult.STOCK_MEM_PO_QTY = parseFloat(tOrderQty.STSIN_PO_QTY).toFixed(2);

            var tBalInQty = parseFloat(tResult.STOCK_MEM_PO_QTY) - parseFloat(tResult.PART_IN_QTY); 
            if (tBalInQty < 0) tBalInQty = 0;
            tResult.BAL_IN_QTY = parseFloat(tBalInQty).toFixed(2);
      
            var tShipQty = parseFloat(tResult.BAL_IN_QTY) + parseFloat(tResult.FOC_QTY);
            tResult.SHIP_QTY = parseFloat(tShipQty).toFixed(2);

            tResult.OVER_SHORT_RATE = '0';

            var tDiffPrice = parseFloat(tResult.PO_PRICE) - parseFloat(tResult.MASTER_PRICE);
            var tShipAmt = parseFloat(tResult.SHIP_QTY) * parseFloat(tResult.PO_PRICE);

            tResult.SAVE_MOQ_QTY = parseFloat(tResult.MOQ_QTY).toFixed(2);
            tResult.SAVE_PO_QTY = parseFloat(tResult.PO_QTY).toFixed(2);
            tResult.SAVE_BAL_IN_QTY = parseFloat(tResult.BAL_IN_QTY).toFixed(2);

            var tSubObj = { ...tResult } ;
            tSubObj.DATAS = [];
            tSubObj.DATAS.push(tResult); 

            tDataArray4.push(tSubObj);
        }
        return tDataArray4;

    }
    async queryS0430_LIST_2_0722(argData, contextValue) {
        var tSQL = '';

        let sqlPoPrice = `
            select po_cd, matl_cd, 
                   isnull(max(po_price), 0) as po_price, 
                   isnull(max(surcharge_amt), 0) as surcharge_amt, 
                   isnull(max(surcharge_price), 0) as surcharge_price,
                   isnull(max(surcharge_remark), '') as surcharge_remark
            from ksv_stock_mem2
            where  pu_cd = '${argData.PU_CD}'
            group by po_cd, matl_cd
        `;
        var retPoPrice = await prisma.$queryRaw(Prisma.raw(sqlPoPrice));

        let sqlOrderQty = `
            select
                   a.po_cd,
                   a.matl_cd,
                   a.use_po_type,
                   b.matl_name,
                   b.color,
                   b.spec,
                   b.unit,
                   c.matl_price,
                   c.curr_cd,
                   c.matl_seq,
                   isnull(sum(a.po_qty), 0) as s_po_qty, 
                   isnull(sum(a.use_qty), 0)  as s_use_qty
            from ksv_po_mrp a,  kcd_matl_mst b,  kcd_matl_mem c
            where a.po_cd in (select distinct po_cd from ksv_stock_mem2 where pu_cd = '${argData.PU_CD}')
            and   a.matl_cd in (
                      select distinct kk.matl_cd
                      from 
                      (
                          select a.pu_cd, a.po_cd, a.matl_cd, a.po_qty2, b.vendor_cd, c.vendor_cd as vendor_cd2
                          from ksv_stock_mem2 a, ksv_pu_mst2 b, kcd_matl_mst c
                          where a.pu_cd = '${argData.PU_CD}'
                          and   a.pu_cd = b.pu_cd
                          and   a.matl_cd = c.matl_cd
                          and   b.vendor_cd = c.vendor_cd
                      ) kk
                  )
            and   a.use_po_type = '1'
            and   (a.po_seq < 97  or a.po_seq > 99)
            and   a.matl_cd = b.matl_cd
            and   b.matl_cd = c.matl_cd
            and   c.matl_seq = (select max(matl_seq) from kcd_matl_mem where matl_cd = b.matl_cd)
            group by
                   a.po_cd,
                   a.matl_cd,
                   a.use_po_type,
                   b.matl_name,
                   b.color,
                   b.spec,
                   b.unit,
                   c.matl_price,
                   c.curr_cd,
                   c.matl_seq
        `;
        var retOrderQty = await prisma.$queryRaw(Prisma.raw(sqlOrderQty));

        let sqlStockQty = `
            select
                   a.po_cd,
                   a.po_matl_cd,
                   a.use_po_type,
                   b.matl_name,
                   b.color,
                   b.spec,
                   c.matl_price,
                   isnull(sum(a.po_qty), 0) as s_po_qty, 
                   isnull(sum(a.use_qty), 0)  as s_use_qty
            from ksv_po_mrp a,  kcd_matl_mst b,  kcd_matl_mem c
            where a.po_cd in (select distinct po_cd from ksv_stock_mem2 where pu_cd = '${argData.PU_CD}')
            and   a.po_matl_cd in (select distinct matl_cd from ksv_stock_mem2 where pu_cd = '${argData.PU_CD}')
            and   a.use_po_type = '2'
            and   a.matl_cd = b.matl_cd
            and   b.matl_cd = c.matl_cd
            -- and   c.matl_seq = (select max(matl_seq) from kcd_matl_mem where matl_cd = b.matl_cd)
            group by
                   a.po_cd,
                   a.po_matl_cd,
                   a.use_po_type,
                   b.matl_name,
                   b.color,
                   b.spec,
                   c.matl_price
        `;
        var retStockQty = await prisma.$queryRaw(Prisma.raw(sqlStockQty));

        let sqlStockMemOrderQty = `
            select
                   a.po_cd,
                   a.matl_cd,
                   b.matl_name,
                   b.color,
                   b.spec,
                   c.matl_price,
                   isnull(sum(a.po_qty), 0) as s_po_qty, 
                   isnull(sum(a.in_qty), 0) as s_in_qty
            from ksv_stock_mem a,  kcd_matl_mst b, kcd_matl_mem c
            where a.po_cd in (select distinct po_cd from ksv_stock_mem2 where pu_cd = '${argData.PU_CD}')
            and   a.matl_cd in (select distinct matl_cd from ksv_stock_mem2 where pu_cd = '${argData.PU_CD}')
            and   a.matl_cd = b.matl_cd
            and   b.matl_cd = c.matl_cd
            and   c.matl_seq = (select max(matl_seq) from kcd_matl_mem where matl_cd = b.matl_cd)
            and   (a.po_seq <  97 or  a.po_seq >  99)
            group by
                   a.po_cd,
                   a.matl_cd,
                   b.matl_name,
                   b.color,
                   b.spec,
                   c.matl_price
        `;
        var retStockMemOrderQty = await prisma.$queryRaw(Prisma.raw(sqlStockMemOrderQty));

        let sqlStockMemMoqQty = `
            select
                   a.po_cd,
                   a.po_seq,
                   a.matl_cd,
                   b.matl_name,
                   b.color,
                   b.spec,
                   c.matl_price,
                   isnull(sum(a.po_qty), 0) as s_po_qty, 
                   isnull(sum(a.in_qty), 0)  as s_in_qty
            from ksv_stock_mem a,  kcd_matl_mst b, kcd_matl_mem c
            where a.po_cd in (select distinct po_cd from ksv_stock_mem2 where pu_cd = '${argData.PU_CD}')
            and   a.matl_cd in (select distinct matl_cd from ksv_stock_mem2 where pu_cd = '${argData.PU_CD}')
            and   a.matl_cd = b.matl_cd
            and   b.matl_cd = c.matl_cd
            and   c.matl_seq = (select max(matl_seq) from kcd_matl_mem where matl_cd = b.matl_cd)
            and   (a.po_seq >=  97 and   a.po_seq <=  99)
            group by
                   a.po_cd,
                   a.po_seq,
                   a.matl_cd,
                   b.matl_name,
                   b.color,
                   b.spec,
                   c.matl_price
        `;
        var retStockMemMoqQty = await prisma.$queryRaw(Prisma.raw(sqlStockMemMoqQty));
 
        var tDataArray4 = [];
        var tIdx = 0;
        for (tIdx = 0; tIdx < retOrderQty.length; tIdx++) {
            var tOrderQty = { ...retOrderQty[tIdx] };
            var tResult = {};
            tResult.PU_CD = argData.PU_CD;
            tResult.PO_CD = tOrderQty.po_cd;
            tResult.PO_SEQ = '';
            tResult.MATL_CD = tOrderQty.matl_cd;
            tResult.MATL_SEQ = tOrderQty.matl_seq;
            tResult.MATL_NAME = tOrderQty.matl_name;
            tResult.COLOR = tOrderQty.color;
            tResult.SPEC = tOrderQty.spec;
            tResult.UNIT = tOrderQty.unit;
            tResult.CURR_CD = tOrderQty.curr_cd;
            tResult.MASTER_PRICE = parseFloat(tOrderQty.matl_price).toFixed(4);
            tResult.CONF_FLAG = '1';
            tResult.PO_PRICE = tResult.MASTER_PRICE;
            tResult.SURCHARGE_PRICE = '0';
            tResult.SURCHARGE_AMT = '0';
            tResult.SURCHARGE_REMARK = '';

            retPoPrice.forEach((col, i) => {
                if (tOrderQty.po_cd === col.po_cd && tOrderQty.matl_cd === col.matl_cd) {
                    tResult.PO_PRICE = parseFloat(col.po_price).toFixed(4);
                    tResult.SURCHARGE_PRICE = parseFloat(col.surcharge_price).toFixed(4);
                    tResult.SURCHARGE_AMT = parseFloat(col.surcharge_amt).toFixed(4);
                    tResult.SURCHARGE_REMARK = col.surcharge_remark;
                }
            });


            var tMrpQty = 0;
            var tStockQty = 0;
            var tPoQty = 0;
            tMrpQty = parseFloat(tOrderQty.s_use_qty);
            tStockQty = parseFloat(tOrderQty.s_use_qty) - parseFloat(tOrderQty.s_po_qty);
            tPoQty = parseFloat(tOrderQty.s_po_qty);

            var tStockQty2 = 0;
            retStockQty.forEach((col, i) => {
                if (tOrderQty.po_cd === col.po_cd && tOrderQty.matl_cd === col.po_matl_cd) {
                    tStockQty2 += parseFloat(col.s_use_qty);
                }
            });

            var tPartInQty = 0;
            var tStsInQty = 0;
            var tPoQty2  = 0;

            retStockMemOrderQty.forEach((col, i) => {
                if (tOrderQty.po_cd === col.po_cd && tOrderQty.matl_cd === col.matl_cd) {
                    tPartInQty += parseFloat(col.s_in_qty);
                    tPoQty2 += parseFloat(col.s_po_qty);
                    var tmpQty = parseFloat(col.s_po_qty) - parseFloat(col.s_in_qty);
                    if (tmpQty > 0) tStsInQty += tmpQty;
                }
            });

            var tMoqQty  = 0;
            var tOverQty  = 0;
            var tFocQty  = 0;
            retStockMemMoqQty.forEach((col, i) => {
                if (tOrderQty.po_cd === col.po_cd && tOrderQty.matl_cd === col.matl_cd) {
                    tPartInQty += parseFloat(col.s_in_qty);
                    tPoQty2 += parseFloat(col.s_po_qty);
                    var tmpQty = parseFloat(col.s_po_qty) - parseFloat(col.s_in_qty);
                    if (tmpQty > 0 && parseFloat(col.po_seq) === 99) tMoqQty += tmpQty;
                    if (tmpQty > 0 && parseFloat(col.po_seq) === 97) tFocQty += tmpQty;
                    if (tmpQty > 0 && parseFloat(col.po_seq) === 98) tOverQty += tmpQty;
                }
            });

            tResult.MRP_QTY = parseFloat(tMrpQty).toFixed(2);
            tResult.STOCK_QTY = parseFloat(tStockQty).toFixed(2);
            tResult.PO_QTY = parseFloat(tPoQty2).toFixed(2);
            tResult.MOQ_QTY = parseFloat(tMoqQty).toFixed(2);
            tResult.LEFTOVER_QTY = '0';
            tResult.PART_IN_QTY = parseFloat(tPartInQty).toFixed(2);
            tResult.FOC_QTY = '0';
            tResult.OVER_SHORT_QTY = '0';
            tResult.STOCK_MEM_PO_QTY = parseFloat(tPoQty2).toFixed(2);

            var tBalInQty = parseFloat(tResult.STOCK_MEM_PO_QTY) - parseFloat(tResult.PART_IN_QTY); 
            if (tBalInQty < 0) tBalInQty = 0;
            tResult.BAL_IN_QTY = parseFloat(tBalInQty).toFixed(2);
      
            var tShipQty = parseFloat(tResult.BAL_IN_QTY) + parseFloat(tResult.FOC_QTY);
            tResult.SHIP_QTY = parseFloat(tShipQty).toFixed(2);

            tResult.OVER_SHORT_RATE = '0';

            var tDiffPrice = parseFloat(tResult.PO_PRICE) - parseFloat(tResult.MASTER_PRICE);
            var tShipAmt = parseFloat(tResult.SHIP_QTY) * parseFloat(tResult.PO_PRICE);

            tResult.SAVE_MOQ_QTY = parseFloat(tResult.MOQ_QTY).toFixed(2);
            tResult.SAVE_PO_QTY = parseFloat(tResult.PO_QTY).toFixed(2);
            tResult.SAVE_BAL_IN_QTY = parseFloat(tResult.BAL_IN_QTY).toFixed(2);

            var tSubObj = { ...tResult } ;
            tSubObj.DATAS = [];
            tSubObj.DATAS.push(tResult); 

            tDataArray4.push(tSubObj);
        }

        return tDataArray4;
    }
}

const moduleQuery_S0430_LIST_2_0 = {
    Query: {
        mgrQueryS0430_LIST_2: async (_, args, contextValue) => {
            var tSQL = '';

            var inSql = '';
            args.data.forEach((col, i) => {
                if (i === 0) inSql = `'${col.PU_CD}'`;
                else inSql += `,'${col.PU_CD}'`;
            });

            var tArray = [];

            var tIdx99 = 0;
            for (tIdx99 = 0; tIdx99 < args.data.length; tIdx99++) {
                var argData = { ...args.data[tIdx99] };

                let sqlPuMst = `
                    select
                        *
                    from
                        ksv_pu_mst2
                    where
                        pu_cd = '${argData.PU_CD}'
                `;
                var retPuMst = await prisma.$queryRaw(Prisma.raw(sqlPuMst));
                if (retPuMst.length <= 0) {
                    continue;
                }
                var objPuMst = { ...retPuMst[0] };

                var tArgObj = {};
                tArgObj.PU_CD = argData.PU_CD;
                tArgObj.IN_PO_CD = objPuMst.PO_CD2;
                tArgObj.IN_PO_SEQ = '';
                tArgObj.BUYER_CD = objPuMst.BUYER_CD;
                tArgObj.VENDOR_CD = objPuMst.VENDOR_CD;
                tArgObj.CURR_CD = objPuMst.CURR_CD;
                tArgObj.LAST = '1';

                var tFunc = new S0430_COMM();
                var tRetObj = await tFunc.queryS0430_LIST_2(
                    tArgObj,
                    contextValue,
                );
                tRetObj.forEach((col, i) => {
                    var tObj1 = { ...col };
                    tObj1.key  = `${tObj1.MATL_NAME}${tObj1.SPEC}${tObj1.COLOR}`;
                    tArray.push(tObj1);
                });
            }

            const sortArray = tArray.sort((a, b) => a.key.toLowerCase() < b.key.toLowerCase() ? -1: 1);
            return sortArray;
        },
    },
};

export default moduleQuery_S0430_LIST_2_0;
