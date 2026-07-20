import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');
const moment = require('moment');

//

class S043001_COMM {
    async queryS043001_LIST_2(argData, contextValue) {
        var tSQL = '';
        if (argData.STYLE_CD !== '') {
            tSQL += `AND STYLE_NAME like '%${argData.STYLE_CD}%' `;
        }

        var sqlPoCds = '';
        var poArray = [];
        if (!argData.IN_PO_CD) {
            var tPoCds = argData.IN_PO_CD.split('/');
            tPoCds.forEach((col, i) => {
                if (col !== '') poArray.push(col);
            });
        } else {
            var tPoCds = argData.IN_PO_CD.split('/');
            tPoCds.forEach((col, i) => {
                if (col !== '') poArray.push(col);
            });
        }

        var poSeqArray = [];
        if (!argData.IN_PO_SEQ) {
        } else {
            var tPoCds = argData.IN_PO_SEQ.split('/');
            tPoCds.forEach((col, i) => {
                if (col !== '') poSeqArray.push(col);
            });
        }

        var sqlPo0 = ' AND  (A1.PO_SEQ < 97 OR A1.PO_SEQ > 100) ';
        var sqlPo = '';
        poArray.forEach((col, i) => {
            if (i === 0) sqlPoCds = `'${col}'`;
            else sqlPoCds += `,'${col}'`;
            if (poArray.length === poSeqArray.length) {
                if (i === 0)
                    sqlPo = `( A1.PO_CD = '${col}' and A1.PO_SEQ  <= ${poSeqArray[i]}) `;
                else
                    sqlPo += ` or ( A1.PO_CD = '${col}' and A1.PO_SEQ  <= ${poSeqArray[i]}) `;
            } else {
                if (i === 0) sqlPo = `( A1.PO_CD = '${col}')  `;
                else sqlPo += ` or ( A1.PO_CD = '${col}') `;
            }
        });

        var tPuCd = '';
        if (typeof argData.PU_CD2 !== 'undefined') {
            tPuCd = argData.PU_CD2;
        }

        var tInput = { ...argData };
        if (typeof tInput.PU_CD2 === 'undefined') tInput.PU_CD2 = '';
        if (typeof tInput.MATL_TYPE === 'undefined') tInput.MATL_TYPE = '';

        let sqlStr = `
            select
                kk.*
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
                        A5.FACTORY_CD,
                        A1.USE_PO_TYPE,
                        A1.DIFF_PO_TYPE,
                        A4.MATL_PRICE,
                        isnull(max(A1.PO_SEQ), 1) as PO_SEQ,
                        isnull(sum(A1.USE_QTY), 0) as USE_QTY,
                        isnull(sum(A1.PO_QTY), 0) as PO_QTY
                    FROM
                        KSV_PO_MRP A1,
                        KCD_MATL_MST A3,
                        KCD_MATL_MEM A4,
                        KSV_ORDER_MST A5,
                        KSV_PO_MST A6
                    WHERE
                        1 = 1 ${sqlPo0}
                        AND A1.USE_PO_TYPE = '1'
                        AND (${sqlPo})
                        AND A1.PO_CD = A6.PO_CD
                        AND A1.PO_SEQ = A6.PO_SEQ
                        AND A6.PO_STATUS = '4'
                        AND A1.ORDER_CD = A5.ORDER_CD
                        AND LEFT(A1.ORDER_CD, 2) = '${argData.BUYER_CD}'
                        AND A1.MATL_CD = A3.MATL_CD
                        AND A3.VENDOR_CD = '${argData.VENDOR_CD}'
                        AND A1.MATL_CD = A4.MATL_CD
                        AND A4.MATL_SEQ = (
                            select
                                max(matl_seq)
                            from
                                kcd_matl_mem
                            where
                                matl_cd = a1.matl_cd
                        )
                        -- AND   A4.MATL_SEQ  = A1.MATL_SEQ 
                    group by
                        A1.PO_CD,
                        A3.VENDOR_CD,
                        A1.MATL_CD,
                        A3.MATL_NAME,
                        A3.COLOR,
                        A3.SPEC,
                        A3.UNIT,
                        A4.CURR_CD,
                        A5.FACTORY_CD,
                        A1.USE_PO_TYPE,
                        A1.DIFF_PO_TYPE,
                        A4.MATL_PRICE
                ) kk
            order by
                kk.VENDOR_CD,
                kk.MATL_CD,
                kk.PO_CD,
                kk.PO_SEQ
        `;
        var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

        tRet.forEach((col, i) => {
            var tStr = `${col.PO_CD}`;
            tStr += `,${col.VENDOR_CD}`;
            tStr += `,${col.MATL_CD}`;
            tStr += `,${col.USE_PO_TYPE}`;
            tStr += `,${col.DIFF_PO_TYPE}`;
            tStr += `,${col.USE_QTY}`;
            tStr += `,${col.PO_SEQ}`;
            console.log(tStr);
        });

        var tArray = [];
        var tIdx = 0;
        var gVendorType = '';
        var gVendorObj = {};
        if (tRet.length > 0) {
            var sql0 = `
                select
                    *
                from
                    kcd_vendor
                where
                    vendor_cd = '${tRet[0].VENDOR_CD}'
            `;
            var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            if (tRet0.length > 0) {
                gVendorType = tRet0[0].VENDOR_TYPE;
                gVendorObj = { ...tRet0[0] };
            }
        }

        var tMatlArray = [];
        var tWorkObj = {};
        var tLeftOver = 0;
        for (tIdx = 0; tIdx < tRet.length; tIdx++) {
            var tOne = { ...tRet[tIdx] };
            if (
                tIdx === 0 ||
                tOne.MATL_CD !== tWorkObj.MATL_CD ||
                tOne.PO_CD !== tWorkObj.PO_CD
            ) {
                if (tIdx > 0) {
                    tWorkObj.LEFTOVER_QTY = String(Math.abs(tLeftOver));
                    tMatlArray.push(tWorkObj);
                    tLeftOver = 0;
                }
                tWorkObj = { ...tOne };
                tWorkObj.MRP_QTY = 0;
                tWorkObj.MRP_QTY2 = 0;
                tWorkObj.STOCK_QTY = 0;
                tWorkObj.PO_QTY = 0;
                tWorkObj.MOQ_QTY = 0;
                tWorkObj.FOC_QTY = 0;
                tWorkObj.OVER_QTY = 0;
                tWorkObj.DIFF_QTY = 0;
                tWorkObj.PO_PRICE = tWorkObj.MASTER_PRICE;
                tWorkObj.PU_STATUS = 'New';
                tWorkObj.PO_UPDATE_QTY = 0;
                tWorkObj.STOCK_MEM_PO_QTY = 0;
                tWorkObj.STOCK_MEM_IN_QTY = 0;

                tWorkObj.C_PU_CD = '';
                tWorkObj.C_STSIN_CD = '';
                tWorkObj.C_MRP_QTY = 0;
                tWorkObj.C_STOCK_QTY = 0;
                tWorkObj.C_PO_QTY = 0;
                tWorkObj.C_MOQ_QTY = 0;
                tWorkObj.C_FOC_QTY = 0;
                tWorkObj.C_OVER_QTY = 0;
                tWorkObj.C_PU_STATUS = 'New';
                tWorkObj.C_PO_PRICE = tWorkObj.MASTER_PRICE;
                tWorkObj.C_SURCHARGE_AMT = 0;
                tWorkObj.C_SURCHARGE_PRICE = 0;
                tWorkObj.C_SURCHARGE_REMARK = '';
            }

            if (
                tOne.USE_PO_TYPE === '1' &&
                (tOne.DIFF_PO_TYPE === '0' || tOne.DIFF_PO_TYPE === '3')
            ) {
                // Order, Order Add
                tWorkObj.MRP_QTY += parseFloat(tOne.USE_QTY);
                tWorkObj.PO_QTY += parseFloat(tOne.PO_QTY);
            }
            if (tOne.USE_PO_TYPE === '1' && tOne.DIFF_PO_TYPE === '2') {
                // Order- cancel
                tWorkObj.MRP_QTY += parseFloat(tOne.USE_QTY);
                tWorkObj.PO_QTY += parseFloat(tOne.PO_QTY);
            }
            if (tOne.USE_PO_TYPE === '1' && tOne.DIFF_PO_TYPE === '1') {
                // Order - OverIn/Out
                tWorkObj.MRP_QTY += parseFloat(tOne.USE_QTY);
                tWorkObj.PO_QTY += parseFloat(tOne.PO_QTY);
                tLeftOver += parseFloat(tOne.USE_QTY);
            }
            if (tOne.USE_PO_TYPE === '2' && tOne.DIFF_PO_TYPE === '0') {
                // Stock Use
                tWorkObj.STOCK_QTY += parseFloat(tOne.USE_QTY);
            }
            if (tOne.USE_PO_TYPE === '2' && tOne.DIFF_PO_TYPE === '5') {
                // Stock Use  - cancel
                tWorkObj.MRP_QTY += parseFloat(tOne.USE_QTY);
                // tWorkObj.PO_QTY += parseFloat(tOne.PO_QTY);
                tWorkObj.STOCK_QTY += parseFloat(tOne.USE_QTY);
            }

            tWorkObj.PO_SEQ = tOne.PO_SEQ;
            console.log(
                ` ====>(MatlArray Data) ${tWorkObj.MATL_CD}/ ${tWorkObj.PO_CD}/ ${tOne.PO_CD},${tOne.PO_SEQ}/ ${tWorkObj.MRP_QTY} / ${tWorkObj.PO_QTY}/ ${tWorkObj.STOCK_QTY} `,
            );
            console.log(
                ` ====>(MatlArray Data2) ${tWorkObj.MATL_CD}/ ${tWorkObj.PO_CD}/ ${tOne.PO_CD},${tOne.PO_SEQ} / ${tOne.USE_PO_TYPE}/ ${tOne.DIFF_PO_TYPE} / ${tOne.USE_QTY} / ${tOne.PO_QTY} `,
            );
        }
        tWorkObj.LEFTOVER_QTY = String(Math.abs(tLeftOver));
        tMatlArray.push(tWorkObj);

        console.log('====================================> tMatlArray');
        console.log('++++ po/po_seq/vendor/matl/mrp/stock/po');
        tMatlArray.forEach((col, i) => {
            var tStr = `${col.PO_CD}`;
            tStr += `,${col.PO_SEQ} (`;
            tStr += `,${col.VENDOR_CD}`;
            tStr += `,${col.MATL_CD}`;
            tStr += `,${col.MATL_PRICE}`;
            tStr += `,${col.MRP_QTY}`;
            tStr += `,${col.STOCK_QTY}`;
            tStr += `,${col.PO_QTY}`;
            tStr += `)`;
            console.log(tStr);
        });

        console.log(` ====>(MatlArray.length) ${tMatlArray.length}`);

        var tMatlArray1 = [];
        for (tIdx = 0; tIdx < tMatlArray.length; tIdx++) {
            var tOne = { ...tMatlArray[tIdx] };

            // STOCK
            var sql0 = `
                select
                    kk.*
                from
                    (
                        SELECT
                            A1.PO_CD,
                            A3.VENDOR_CD,
                            A1.PO_MATL_CD as MATL_CD,
                            A3.MATL_NAME,
                            A3.COLOR,
                            A3.SPEC,
                            A3.UNIT,
                            A4.CURR_CD,
                            A5.FACTORY_CD,
                            A1.USE_PO_TYPE,
                            A1.DIFF_PO_TYPE,
                            A4.MATL_PRICE,
                            isnull(max(A1.PO_SEQ), 1) as PO_SEQ,
                            isnull(sum(A1.USE_QTY), 0) as USE_QTY,
                            isnull(sum(A1.PO_QTY), 0) as PO_QTY
                        FROM
                            KSV_PO_MRP A1,
                            KCD_MATL_MST A3,
                            KCD_MATL_MEM A4,
                            KSV_ORDER_MST A5,
                            KSV_PO_MST A6
                        WHERE
                            1 = 1 ${sqlPo0}
                            AND A1.USE_PO_TYPE = '2'
                            AND A1.PO_MATL_CD = '${tOne.MATL_CD}'
                            AND A1.PO_CD = '${tOne.PO_CD}'
                            AND A1.PO_CD = A6.PO_CD
                            AND A1.PO_SEQ = A6.PO_SEQ
                            AND A6.PO_STATUS = '4'
                            AND A1.ORDER_CD = A5.ORDER_CD
                            AND LEFT(A1.ORDER_CD, 2) = '${argData.BUYER_CD}'
                            AND A1.MATL_CD = A3.MATL_CD
                            AND A3.VENDOR_CD = '${argData.VENDOR_CD}'
                            AND A1.MATL_CD = A4.MATL_CD
                            AND A4.MATL_SEQ = A1.MATL_SEQ
                        group by
                            A1.PO_CD,
                            A3.VENDOR_CD,
                            A1.PO_MATL_CD,
                            A3.MATL_NAME,
                            A3.COLOR,
                            A3.SPEC,
                            A3.UNIT,
                            A4.CURR_CD,
                            A5.FACTORY_CD,
                            A1.USE_PO_TYPE,
                            A1.DIFF_PO_TYPE,
                            A4.MATL_PRICE
                    ) kk
                order by
                    kk.VENDOR_CD,
                    kk.MATL_CD,
                    kk.PO_CD,
                    kk.PO_SEQ
            `;
            var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            tRet0.forEach((col, i) => {
                if (col.USE_PO_TYPE === '2' && col.DIFF_PO_TYPE === '0') {
                    // Stock Use
                    tOne.STOCK_QTY += parseFloat(col.USE_QTY);
                }
                if (col.USE_PO_TYPE === '2' && col.DIFF_PO_TYPE === '5') {
                    // Stock Use  - cancel
                    tOne.MRP_QTY += parseFloat(col.USE_QTY);
                    // tOne.PO_QTY += parseFloat(col.PO_QTY);
                    tOne.STOCK_QTY += parseFloat(col.USE_QTY);
                }
            });

            // FOC
            sql0 = `
                select
                    po_seq,
                    isnull(sum(use_qty), 0) as use_qty
                from
                    ksv_po_mrp
                where
                    po_cd = '${tOne.PO_CD}'
                    and matl_cd = '${tOne.MATL_CD}'
                    and po_seq in (97, 98, 99)
                group by
                    po_seq
            `;
            tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));

            if (tRet0.length > 0) {
                tRet0.forEach((col, i) => {
                    if (col.po_seq === 97) {
                        tOne.FOC_QTY = parseFloat(col.use_qty);
                    }
                    if (col.po_seq === 98) {
                        tOne.OVER_QTY = parseFloat(col.use_qty);
                    }
                    if (col.po_seq === 99) {
                        tOne.MOQ_QTY = parseFloat(col.use_qty);
                    }
                });
            }

            var sqlPoSeq1 = '';
            if (!argData.LAST) {
                tOne.FOC_QTY = 0;
                tOne.OVER_QTY = 0;
                tOne.MOQ_QTY = 0;
                // sqlPoSeq1 = ` and a.po_seq <= ${argData.IN_PO_SEQ}`;
            } else {
                if (parseFloat(tOne.OVER_QTY) > 0)
                    tOne.PO_QTY =
                        parseFloat(tOne.PO_QTY) + parseFloat(tOne.OVER_QTY);
                if (parseFloat(tOne.MOQ_QTY) > 0)
                    tOne.PO_QTY =
                        parseFloat(tOne.PO_QTY) + parseFloat(tOne.MOQ_QTY);
            }
            console.log(
                ` ====>(MatlArray Data, foc,over,moq) ${tOne.MATL_CD} /${tOne.FOC_QTY} / ${tOne.OVER_QTY} / ${tOne.MOQ_QTY}  `,
            );

            sql0 = `
                select
                    isnull(sum(a.po_qty), 0) as po_qty,
                    isnull(sum(a.in_qty), 0) as in_qty
                from
                    ksv_stock_mem a,
                    kcd_matl_mst b
                where
                    a.po_cd = '${tOne.PO_CD}'
                    and a.matl_cd = '${tOne.MATL_CD}'
                    and a.matl_cd = b.matl_cd ${sqlPoSeq1}
                    and b.vendor_cd = '${tOne.VENDOR_CD}'
            `;
            tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            tOne.STOCK_MEM_PO_QTY = '0';
            tOne.STOCK_MEM_IN_QTY = '0';
            if (tRet0.length > 0) {
                tOne.STOCK_MEM_PO_QTY = String(parseFloat(tRet0[0].po_qty));
                tOne.STOCK_MEM_IN_QTY = String(parseFloat(tRet0[0].in_qty));
            }
            if (parseFloat(tOne.LEFTOVER_QTY) > 0) {
                var tPoQty =
                    parseFloat(tOne.PO_QTY) + parseFloat(tOne.LEFTOVER_QTY);
                tOne.PO_QTY = String(tPoQty);
            }
            tMatlArray1.push(tOne);
            console.log(
                ` ====>(MatlArray Data, stock_mem, po_qty, in_qty) ${tOne.MATL_CD} /${tOne.STOCK_MEM_PO_QTY} / ${tOne.STOCK_MEM_IN_QTY}  `,
            );
        }
        console.log(` ====>(MatlArray1.length) ${tMatlArray1.length}`);

        console.log('============================> tMatlArray1');
        console.log(
            '++++ po/po_seq/vendor/matl/mrp/stock/po/foc/moq/over/stockmem_po/stockmem_in',
        );
        tMatlArray1.forEach((col, i) => {
            var tStr = `${col.PO_CD}`;
            tStr += `,${col.PO_SEQ} (`;
            tStr += `,${col.VENDOR_CD}`;
            tStr += `,${col.MATL_PRICE}`;
            tStr += `,${col.MATL_CD}`;
            tStr += `,${col.MRP_QTY}`;
            tStr += `,${col.STOCK_QTY}`;
            tStr += `,${col.PO_QTY}`;
            tStr += `,${col.LEFT_QTY}`;
            tStr += `,${col.FOC_QTY}`;
            tStr += `,${col.MOQ_QTY}`;
            tStr += `,${col.OVER_QTY}`;
            tStr += `,${col.STOCK_MEM_PO_QTY}`;
            tStr += `,${col.STOCK_MEM_IN_QTY}`;
            tStr += `)`;
            console.log(tStr);
        });

        var tMatlArray2 = [];
        var tMatlArray2_End = [];
        for (tIdx = 0; tIdx < tMatlArray1.length; tIdx++) {
            var tOne = { ...tMatlArray1[tIdx] };

            var sql0 = `
                select
                    a.PU_CD,
                    isnull(a.STSIN_CD, '') as STSIN_CD,
                    a.PO_PRICE,
                    a.MASTER_PRICE,
                    a.SURCHARGE_PRICE,
                    a.SURCHARGE_AMT,
                    a.SURCHARGE_REMARK,
                    PO_QTY as MRP_QTY,
                    STOCK_QTY as STOCK_QTY,
                    PO_QTY2 as PO_QTY,
                    MOQ as MOQ_QTY,
                    LEFTOVER_QTY as OVER_QTY
                from
                    ksv_stock_mem2 a,
                    kcd_matl_mst b
                where
                    a.po_cd = '${tOne.PO_CD}'
                    and a.matl_cd = '${tOne.MATL_CD}'
                    and a.matl_cd = b.matl_cd
                    and b.vendor_cd = '${tOne.VENDOR_CD}'
                order by
                    a.STSIN_CD
            `;
            var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));

            var tEndMrpQty = 0;
            var tCurrMrpQty = 0;
            tRet0.forEach((col, i) => {
                tCurrMrpQty += parseInt(col.MRP_QTY);
            });
            console.log(` ====>(MatlArray2) Stock Mem2: ${tRet0.length}`);

            var kPuCd = '';
            var kStsInCd = '';
            var kPoPrice = '0';
            var kMasterPrice = '0';
            var kMrpQty = '0';
            var kStockQty = '0';
            var kPoQty = '0';
            var kMoqQty = '0';
            var kFocQty = '0';
            var kOverQty = '0';
            var kSurchargeAmt = '0';
            var kSurchargePrice = '0';
            var kSurchargeRemark = '';
            if (tRet0.length > 0) {
                var col = { ...tRet0[0] };
                console.log(`====>(MatlArray2): StockMem2 data1`, col);
                kPuCd = col.PU_CD;
                kStsInCd = col.STSIN_CD;
                kPoPrice = col.PO_PRICE;
                kMasterPrice = col.MASTER_PRICE;
                kMrpQty = col.MRP_QTY;
                kStockQty = col.STOCK_QTY;
                kPoQty = col.PO_QTY;
                kMoqQty = col.MOQ_QTY;
                kOverQty = col.OVER_QTY;
                kFocQty = 0;
                kSurchargeAmt = col.SURCHARGE_AMT;
                kSurchargePrice = col.SURCHARGE_PRICE;
                kSurchargeRemark = col.SURCHARGE_REMARK;
            } else {
                kPoPrice = tOne.MATL_PRICE;
                kMasterPrice = tOne.MATL_PRICE;
            }

            var tCheck1 = 0;
            var tLastEndObj = {};
            var tSumMrpQty = 0;

            var tOne3 = { ...tOne };
            tOne3.PU_CD = kPuCd;
            tOne3.PO_PRICE = kPoPrice;
            tOne3.MASTER_PRICE = kMasterPrice;
            tOne3.SURCHARGE_PRICE = kSurchargePrice;
            tOne3.SURCHARGE_AMT = kSurchargeAmt;
            tOne3.SURCHARGE_REMARK = kSurchargeRemark;

            if (
                parseFloat(tOne.STOCK_MEM_PO_QTY) <=
                parseFloat(tOne.STOCK_MEM_IN_QTY)
            )
                if (parseFloat(tOne.STOCK_MEM_PO_QTY) > 0)
                    tOne3.PU_STATUS = 'End';
                else tOne3.PU_STATUS = '-';
            else tOne3.PU_STATUS = '-';

            if (gVendorType === '4') {
                tOne3.CURR_CD = 'USD';
                tOne3.PO_PRICE = '0';
            }
            tMatlArray2.push(tOne3);
        }

        console.log(
            `================> MatlArray2 Result:${tMatlArray2.length}`,
        );

        var tMatlCdArray = [];
        tMatlArray2.forEach((col, i) => {
            var tCheck = 0;
            tMatlCdArray.forEach((col1, i1) => {
                if (col.MATL_CD === col1) tCheck = 1;
            });
            if (tCheck === 0) tMatlCdArray.push(col.MATL_CD);
        });

        var tDataArray0 = [];
        tMatlCdArray.forEach((col, i) => {
            tDataArray = [];
            var wOne = {};
            var wSaveObj = {};
            var tDataArray = [];
            tMatlArray2.forEach((tOne, i1) => {
                if (tOne.MATL_CD === col) {
                    var wOne = {};
                    wOne.PU_CD = tOne.PU_CD;
                    wOne.PO_CD = tOne.PO_CD;
                    wOne.PO_SEQ = tOne.PO_SEQ;
                    wOne.MATL_CD = tOne.MATL_CD;
                    wOne.MATL_SEQ = tOne.MATL_SEQ;
                    wOne.MATL_NAME = tOne.MATL_NAME;
                    wOne.COLOR = tOne.COLOR;
                    wOne.SPEC = tOne.SPEC;
                    wOne.UNIT = tOne.UNIT;
                    wOne.MRP_QTY = tOne.MRP_QTY;
                    wOne.STOCK_QTY = tOne.STOCK_QTY;
                    wOne.MOQ_QTY = tOne.MOQ_QTY;
                    wOne.PO_QTY = tOne.PO_QTY;
                    wOne.LEFTOVER_QTY = tOne.LEFTOVER_QTY;
                    wOne.PART_IN_QTY = tOne.STOCK_MEM_IN_QTY;

                    var tBalInQty =
                        parseFloat(wOne.PO_QTY) - parseFloat(wOne.PART_IN_QTY);
                    wOne.BAL_IN_QTY = String(tBalInQty);
                    wOne.SHIP_QTY = String(tBalInQty);
                    wOne.OVER_SHORT_QTY = tOne.OVER_QTY;
                    wOne.OVER_SHORT_RATE = '0';
                    wOne.FOC_QTY = tOne.FOC_QTY;
                    wOne.CURR_CD = tOne.CURR_CD;
                    wOne.MASTER_PRICE = tOne.MASTER_PRICE;
                    wOne.CONF_FLAG = '';
                    wOne.PO_PRICE = tOne.PO_PRICE;

                    var tDiffPrice =
                        parseFloat(wOne.PO_PRICE) -
                        parseFloat(wOne.MASTER_PRICE);
                    wOne.DIFF_PRICE = String(tDiffPrice);

                    var tShipAmt =
                        parseFloat(wOne.PO_PRICE) * parseFloat(wOne.SHIP_QTY);
                    wOne.SHIP_AMT = String(tShipAmt);

                    wOne.SURCHARGE_AMT = tOne.SURCHARGE_AMT;
                    wOne.SURCHARGE_PRICE = tOne.SURCHARGE_PRICE;
                    wOne.SURCHARGE_REMARK = tOne.SURCHARGE_REMARK;
                    wOne.SAVE_MOQ_QTY = tOne.MOQ_QTY;
                    wOne.SAVE_PO_QTY = tOne.PO_QTY;
                    if (tDataArray.length <= 0) {
                        wSaveObj = { ...wOne };
                        wSaveObj.PU_CD = '';
                        wSaveObj.PO_CD = '';
                        wSaveObj.MRP_QTY = 0;
                        wSaveObj.STOCK_QTY = 0;
                        wSaveObj.MOQ_QTY = 0;
                        wSaveObj.PO_QTY = 0;
                        wSaveObj.LEFTOVER_QTY = 0;
                        wSaveObj.PART_IN_QTY = 0;
                        wSaveObj.BAL_IN_QTY = 0;
                        wSaveObj.SHIP_QTY = 0;
                        wSaveObj.OVER_SHORT_QTY = 0;
                        wSaveObj.FOC_QTY = 0;
                        wSaveObj.SHIP_AMT = 0;
                        wSaveObj.SURCHARGE_AMT = 0;
                        wSaveObj.SAVE_MOQ_QTY = 0;
                        wSaveObj.SAVE_PO_QTY = 0;
                    }
                    tDataArray.push(wOne);
                    if (wSaveObj.PO_CD === '') wSaveObj.PO_CD = wOne.PO_CD;
                    else wSaveObj.PO_CD += `/${wOne.PO_CD}`;
                    if (wSaveObj.PU_CD === '') wSaveObj.PU_CD = wOne.PU_CD;
                    else wSaveObj.PU_CD += `/${wOne.PU_CD}`;
                    wSaveObj.MRP_QTY += parseFloat(wOne.MRP_QTY);
                    wSaveObj.STOCK_QTY += parseFloat(wOne.STOCK_QTY);
                    wSaveObj.MOQ_QTY += parseFloat(wOne.MOQ_QTY);
                    wSaveObj.PO_QTY += parseFloat(wOne.PO_QTY);
                    wSaveObj.LEFTOVER_QTY += parseFloat(wOne.LEFTOVER_QTY);
                    wSaveObj.PART_IN_QTY += parseFloat(wOne.PART_IN_QTY);
                    wSaveObj.BAL_IN_QTY += parseFloat(wOne.BAL_IN_QTY);
                    wSaveObj.SHIP_QTY += parseFloat(wOne.SHIP_QTY);
                    wSaveObj.OVER_SHORT_QTY += parseFloat(wOne.OVER_SHORT_QTY);
                    wSaveObj.FOC_QTY += parseFloat(wOne.FOC_QTY);
                    wSaveObj.SHIP_AMT += parseFloat(wOne.SHIP_AMT);
                    wSaveObj.SURCHARGE_AMT += parseFloat(wOne.SURCHARGE_AMT);
                    wSaveObj.SAVE_MOQ_QTY += parseFloat(wOne.SAVE_MOQ_QTY);
                    wSaveObj.SAVE_PO_QTY += parseFloat(wOne.SAVE_PO_QTY);
                }
            });
            /*
          if (parseFloat(wSaveObj.SHIP_QTY) > 0) { 
              wSaveObj.DATAS = [ ...tDataArray ];
              tDataArray0.push(wSaveObj);
          }
          */
            wSaveObj.DATAS = [...tDataArray];
            tDataArray0.push(wSaveObj);
        });

        var tDataArray4 = [];
        var tIdx4 = 0;
        for (tIdx4 = 0; tIdx4 < tDataArray0.length; tIdx4++) {
            var wSaveObj = { ...tDataArray0[tIdx4] };
            tDataArray4.push(wSaveObj);

            /*
           var poSql = '';
           var tCols = wSaveObj.PO_CD.split('/');
           tCols.forEach((col, i) => {
                  if (col) {
                      if (poSql === '') poSql = `'${col}'`;
                      else poSql += `,'${col}'`;
                  }
           });

           var puSql = '';
           var tCols = wSaveObj.PU_CD.split('/');
           tCols.forEach((col, i) => {
                  if (col) {
                      if (puSql === '') puSql = `'${col}'`;
                      else puSql += `,'${col}'`;
                  }
           });
           var sql0 = `
               select
                   isnull(stsin_cd, '') as stsin_cd
               from
                   ksv_stock_mem2
               where
                   po_cd in (${poSql})
                   and pu_cd in (${puSql})
                   and matl_cd = '${wSaveObj.MATL_CD}'
                   and stsin_cd is not null
                   and stsin_cd <> ''
           `;
           var tRet0  =  await prisma.$queryRaw(Prisma.raw(sql0));
           if (tRet0.length > 0 && tRet0[0].stsin_cd !== '') {
               ;
           } else {
               tDataArray4.push(wSaveObj);     
           }
           */
        }
        return tDataArray4;
    }
}
// export default로 Query 내용 내보내기
const moduleQuery_S043001_4_1 = {
    Query: {
        mgrQueryS043001_4_1: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }

            var tSQL0 = '';
            var tPoCds = args.data.PO_CD.split('/');
            tPoCds.forEach((col, i) => {
                if (i === 0) tSQL0 += `'${col}'`;
                else tSQL0 += `,'${col}'`;
            });

            let sqlStr = `
                SELECT
                    A1.PO_CD,
                    A1.PO_SEQ,
                    A1.ORDER_CD,
                    A1.MATL_CD,
                    A1.MRP_SEQ,
                    A1.MATL_SEQ,
                    A3.MATL_NAME,
                    A3.COLOR,
                    A3.SPEC,
                    A3.UNIT,
                    A1.PO_QTY AS MRP_QTY,
                    A1.STOCK_QTY,
                    A1.MOQ AS MOQ_QTY,
                    (A1.PO_QTY - A1.STOCK_QTY + isnull(A1.MOQ, 0)) AS PO_QTY,
                    (
                        A1.PO_QTY - A1.STOCK_QTY + isnull(A1.MOQ, 0) - A1.IN_QTY
                    ) AS BAL_QTY,
                    (
                        A1.PO_QTY - A1.STOCK_QTY + isnull(A1.MOQ, 0) - A1.IN_QTY
                    ) AS STSIN_QTY,
                    A4.CURR_CD,
                    A4.MATL_PRICE AS MASTER_PRICE,
                    0 AS MOQ_PRICE,
                    0 AS FREIGHT_PRICE,
                    0 AS OTHER_PRICE,
                    0 AS SURCHAGE_REMARK,
                    0 AS PO_PRICE
                    -- FROM KSV_STOCK_MEM A1, KSV_PO_MRP A2, KCD_MATL_MST A3, KCD_MATL_MEM A4 
                FROM
                    KSV_STOCK_MEM A1,
                    KCD_MATL_MST A3,
                    KCD_MATL_MEM A4
                WHERE
                    A1.PO_CD IN (${tSQL0})
                    AND LEFT(A1.ORDER_CD, 2) = '${args.data.BUYER_CD}'
                    AND A1.MATL_CD = A3.MATL_CD
                    -- AND   A1.MATL_SEQ = A3.SEQ
                    AND A3.VENDOR_CD = '${args.data.VENDOR_CD}'
                    AND A3.MATL_TYPE = '${args.data.MATL_TYPE}'
                    AND A1.MATL_CD = A4.MATL_CD
                    AND A1.MATL_SEQ = A4.MATL_SEQ
                    AND A1.PO_SEQ < 97
                    -- AND   A1.STOCK_STATUS = '0' 
                    -- AND   A1.PO_CD = A2.PO_CD
                    -- AND   A1.PO_SEQ = A2.PO_SEQ
                    -- AND   A1.ORDER_CD = A2.ORDER_CD
                    -- AND   A1.MATL_CD = A2.MATL_CD
                    -- AND   A1.MRP_SEQ= A2.MRP_SEQ
                    -- AND   A1.MATL_SEQ= A2.MATL_SEQ
                    -- AND   (A1.PO_QTY - A1.STOCK_QTY + isnull(A1.MOQ, 0) - A1.IN_QTY) > 0
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                PO_CD: '',
                PO_SEQ: 0,
                ORDER_CD: '',
                MATL_CD: '',
                MRP_SEQ: 0,
                MATL_SEQ: 0,
                MATL_NAME: '',
                COLOR: '',
                SPEC: '',
                UNIT: '',
                MRP_QTY: 0,
                MRP_QTY1: 0,
                STOCK_QTY: 0,
                MOQ_QTY: 0,
                PO_QTY: 0,
                CURR_CD: '',
                MASTER_PRICE: 0,
                MOQ_PRICE: 0,
                FREIGHT_PRICE: 0,
                OTHER_PRICE: 0,
                SURCHAGE_PRICE: 0,
                PO_PRICE: 0,
                ETC99: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },

        mgrQueryS043001_4_2: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var matlCd = args.data.MATL_CD || '';
            var matlName = args.data.MATL_NAME || '';

            var tSQL = '';

            var sqlExFactory = '';
            if (!args.data.S_EX_FACTORY && !args.data.E_EX_FACTORY) {
                var sExFactory = `${moment().subtract(3, 'months').format('YYYYMMDD')}`;
                var eExFactory = `99999999`;
                sqlExFactory = `and   left(k1.in_datetime, 8) between '${sExFactory}' and '${eExFactory}' `;
            } else {
                var sExFactory = args.data.S_EX_FACTORY;
                if (sExFactory === '')
                    sExFactory = `${moment().subtract(3, 'months').format('YYYYMMDD')}`;
                var eExFactory = args.data.E_EX_FACTORY;
                if (eExFactory === '') eExFactory = `99999999`;
                // tSQL += `and   a1.exp_delivery_date between '${sExFactory}' and '${eExFactory}' `;
                sqlExFactory = `and   left(k1.in_datetime, 8) between '${sExFactory}' and '${eExFactory}' `;
            }

            var sqlPayDate = '';
            if (!args.data.S_PAY_DATE && !args.data.E_PAY_DATE);
            else {
                var sPayDate = args.data.S_PAY_DATE;
                if (sPayDate === '')
                    sPayDate = `${moment().subtract(3, 'months').format('YYYYMMDD')}`;
                var ePayDate = args.data.E_PAY_DATE;
                if (ePayDate === '') ePayDate = `99999999`;
                sqlPayDate = `and   k1.pay_date between '${sPayDate}' and '${ePayDate}' `;
            }

            if (args.data.PO_CD.length >= 9) tSQL = '';
            if (args.data.PU_CD.length >= 0) tSQL = '';

            var inPoSql = '';
            /*
       var tCols = args.data.PO_CD.split(',');
       var tIdx = 0;
       tCols.forEach((col0, i) => {
           var col = col0.trim();
           if (col !== '') {
               if (inPoSql === '') inPoSql = `'${col}'`;
               else  inPoSql += `,'${col}'`;
               tIdx += 1;
           }
       });
       if (inPoSql !== '') inPoSql = `and   k1.po_cd in (${inPoSql}) `;
       */
            var tCols = args.data.PO_CD.split(',');
            var tIdx = 0;
            tCols.forEach((col0, i) => {
                var col = col0.trim();
                if (col !== '') {
                    if (inPoSql === '') inPoSql = ` a1.po_cd2 like '%${col}%' `;
                    else inPoSql += ` or a1.po_cd2 like '%{col}%' `;
                }
            });
            if (inPoSql !== '') inPoSql = ` and (${inPoSql}) `;

            var inPoSql2 = '';
            tCols.forEach((col0, i) => {
                var col = col0.trim();
                if (col !== '') {
                    if (inPoSql2 === '')
                        inPoSql2 = ` k1.po_cd like '%${col}%' `;
                    else inPoSql2 += ` or k1.po_cd like '%{col}%' `;
                }
            });
            if (inPoSql2 !== '') inPoSql2 = ` and (${inPoSql2}) `;

            let sqlStr = `
                select
                    k3.VENDOR_CD,
                    k3.VENDOR_NAME,
                    k1.PU_CD,
                    K1.PO_CD,
                    K1.PO_SEQ,
                    K1.ORDER_CD,
                    K1.MRP_SEQ,
                    k1.MATL_CD,
                    k2.MATL_NAME,
                    k2.COLOR,
                    k2.SPEC,
                    left(k1.IN_DATETIME, 8) as IN_DATETIME,
                    k1.REG_USER,
                    left(k1.ORDER_CD, 2) as BUYER_CD,
                    isnull(k2.MATL_TYPE, '') as MATL_TYPE,
                    isnull(a1.TRADE_TERM, '') as TRADE_TERM,
                    isnull(a1.BILL_TO, '') as BILL_TO,
                    isnull(k1.PAY_CURR_CD, '') as CURR_CD,
                    -- isnull(a1.EXP_DELIVERY_DATE, '') as EX_FACTORY,
                    left(k1.IN_DATETIME, 8) as EX_FACTORY,
                    isnull(k1.PAY_DATE, '') as PAY_DATE,
                    '1' as PAY_TERM,
                    '' as PAY_CONDITION,
                    isnull(k3.OVERSHORT_RATE, '0') as OVERSHORT,
                    isnull(k2.MATL_TYPE, '') as IN_MATL_TYPE,
                    isnull(k1.IN_CURR_CD, '') as IN_CURR_CD,
                    isnull(k1.PAY_DATE, '') as IN_PAY_DATE,
                    isnull(k1.PAY_REPORT, '') as PAY_REPORT,
                    isnull(k1.LC_BILL_NO, '') as LC_BILL_NO,
                    k1.STSIN_CD,
                    k1.TOT_QTY as IN_QTY,
                    -- k1.IN_QTY,
                    k1.LC_QTY,
                    k1.PAY_PRICE,
                    k1.PAY_PRICE as ORG_PAY_PRICE,
                    isnull(a5.SURCHARGE_PRICE, '0') as SURCHARGE_PRICE,
                    isnull(a5.FULLIN_FLAG, '0') as FULLIN_FLAG,
                    k4.PO_QTY,
                    '0' as PO_PRICE,
                    a5.PO_PRICE as ORG_PO_PRICE
                from
                    ksv_stock_in k1
                    left join ksv_stock_mem2 a5 on a5.po_cd = k1.po_cd
                    and a5.matl_cd = k1.matl_cd
                    and a5.pu_cd = k1.pu_cd,
                    kcd_matl_mst k2,
                    kcd_vendor k3,
                    ksv_pu_mst2 a1,
                    ksv_stock_mem k4
                where
                    1 = 1 ${sqlExFactory} ${sqlPayDate}
                    and k1.matl_cd = k2.matl_cd
                    and k2.vendor_cd = k3.vendor_cd
                    and a1.pu_cd = k1.pu_cd
                    and k1.po_cd = k4.po_cd
                    and k1.po_seq = k4.po_seq
                    and k1.order_cd = k4.order_cd
                    and k1.matl_cd = k4.matl_cd
                    and k1.mrp_seq = k4.mrp_seq
                    and k3.vendor_name like '%${args.data.VENDOR_CD}%'
                    and k1.pu_cd like '%${args.data.PU_CD}%'
                    and k1.matl_cd like '%${matlCd}%'
                    and k2.matl_name like '%${matlName}%'
                    and k3.vendor_type like '%${args.data.VENDOR_TYPE}%' ${inPoSql} ${inPoSql2}
                    and k1.reg_user like '%${args.data.REG_USER}%'
                    and k1.in_qty > 0
                order by
                    k3.VENDOR_CD,
                    k1.PO_CD,
                    k1.STSIN_CD,
                    left(k1.IN_DATETIME, 8),
                    k1.MATL_CD,
                    k1.PO_SEQ
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tArray = [];

            var tIdx = 0;
            var wPoQty = 0;
            var wInQty = 0;
            var wLcQty = 0;
            var wMoqQty = 0;
            var wOverQty = 0;
            var wFocQty = 0;
            var wSurchargeAmt = 0;
            var wStsInAmt = 0;
            var wMoqAmt = 0;
            var saveObj = {};
            var tRetArray0 = [];
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tOne = { ...tRet[tIdx] };

                if (tIdx === 0) {
                    saveObj = { ...tOne };
                    wPoQty += parseFloat(tOne.PO_QTY);
                    wInQty += parseFloat(tOne.IN_QTY);
                    wLcQty += parseFloat(tOne.LC_QTY);
                    if (parseFloat(tOne.PO_SEQ) === 99) {
                        wMoqQty += parseFloat(tOne.IN_QTY);
                        wMoqAmt +=
                            parseFloat(tOne.IN_QTY) *
                            parseFloat(tOne.PAY_PRICE);
                    }
                    if (parseFloat(tOne.PO_SEQ) === 98)
                        wOverQty += parseFloat(tOne.IN_QTY);
                    if (parseFloat(tOne.PO_SEQ) === 97)
                        wFocQty += parseFloat(tOne.IN_QTY);
                    if (parseFloat(tOne.PO_SEQ) !== 97) {
                        wStsInAmt +=
                            parseFloat(tOne.IN_QTY) *
                            parseFloat(tOne.PAY_PRICE);
                        if (parseFloat(tOne.PO_SEQ) !== 98) {
                            wSurchargeAmt +=
                                parseFloat(tOne.IN_QTY) *
                                parseFloat(tOne.SURCHARGE_PRICE);
                        }
                    }
                    if (
                        parseFloat(tOne.PO_SEQ) !== 97 &&
                        parseFloat(tOne.PAY_PRICE) <= 0.00001
                    ) {
                        wFocQty += parseFloat(tOne.IN_QTY);
                        wInQty -= parseFloat(tOne.IN_QTY);
                    }
                } else {
                    if (
                        saveObj.VENDOR_CD === tOne.VENDOR_CD &&
                        saveObj.PO_CD === tOne.PO_CD &&
                        saveObj.STSIN_CD === tOne.STSIN_CD &&
                        saveObj.IN_DATETIME === tOne.IN_DATETIME &&
                        saveObj.MATL_CD === tOne.MATL_CD
                    ) {
                        wPoQty += parseFloat(tOne.PO_QTY);
                        wInQty += parseFloat(tOne.IN_QTY);
                        wLcQty += parseFloat(tOne.LC_QTY);
                        if (parseFloat(tOne.PO_SEQ) === 99) {
                            wMoqQty += parseFloat(tOne.IN_QTY);
                            wMoqAmt +=
                                parseFloat(tOne.IN_QTY) *
                                parseFloat(tOne.PAY_PRICE);
                        }
                        if (parseFloat(tOne.PO_SEQ) === 98)
                            wOverQty += parseFloat(tOne.IN_QTY);
                        if (parseFloat(tOne.PO_SEQ) === 97)
                            wFocQty += parseFloat(tOne.IN_QTY);
                        if (parseFloat(tOne.PO_SEQ) !== 97) {
                            wStsInAmt +=
                                parseFloat(tOne.IN_QTY) *
                                parseFloat(tOne.PAY_PRICE);
                            if (parseFloat(tOne.PO_SEQ) !== 98) {
                                wSurchargeAmt +=
                                    parseFloat(tOne.IN_QTY) *
                                    parseFloat(tOne.SURCHARGE_PRICE);
                            }
                        }
                        if (
                            parseFloat(tOne.PO_SEQ) !== 97 &&
                            parseFloat(tOne.PAY_PRICE) <= 0.00001
                        ) {
                            wFocQty += parseFloat(tOne.IN_QTY);
                            wInQty -= parseFloat(tOne.IN_QTY);
                        }
                    } else {
                        saveObj.PO_QTY = wPoQty;
                        saveObj.STSIN_QTY = wInQty;
                        saveObj.LC_QTY = wLcQty;
                        saveObj.MOQ_QTY = wMoqQty;
                        saveObj.OVER_QTY = wOverQty;
                        saveObj.FOC_QTY = wFocQty;
                        saveObj.STSIN_AMT = wStsInAmt;
                        saveObj.SURCHARGE_AMT = parseFloat(wSurchargeAmt).toFixed(2);
                        saveObj.PO_AMT = wStsInAmt;
                        saveObj.MOQ_AMT = wMoqAmt;

                        var tPayPrice = '0';
                        if (
                            parseFloat(saveObj.STSIN_QTY) -
                                parseFloat(saveObj.FOC_QTY) >
                            0
                        ) {
                            tPayPrice =
                                parseFloat(saveObj.STSIN_AMT) /
                                (parseFloat(saveObj.STSIN_QTY) -
                                    parseFloat(saveObj.FOC_QTY));
                            tPayPrice = parseFloat(tPayPrice).toFixed(4);
                        }
                        var tPoPrice = '0';
                        if (
                            parseFloat(saveObj.PO_QTY) -
                                parseFloat(saveObj.FOC_QTY) >
                            0
                        ) {
                            tPoPrice =
                                parseFloat(saveObj.PO_AMT) /
                                (parseFloat(saveObj.PO_QTY) -
                                    parseFloat(saveObj.FOC_QTY));
                            tPoPrice = parseFloat(tPoPrice).toFixed(4);
                        }
                        saveObj.PO_PRICE = tPoPrice;
                        saveObj.PAY_PRICE = tPayPrice;
                        tRetArray0.push(saveObj);

                        wPoQty = 0;
                        wInQty = 0;
                        wLcQty = 0;
                        wMoqQty = 0;
                        wOverQty = 0;
                        wFocQty = 0;
                        wStsInAmt = 0;
                        wSurchargeAmt = 0;
                        wMoqAmt = 0;
                        saveObj = { ...tOne };
                        wPoQty += parseFloat(tOne.PO_QTY);
                        wInQty += parseFloat(tOne.IN_QTY);
                        wLcQty += parseFloat(tOne.LC_QTY);
                        if (parseFloat(tOne.PO_SEQ) === 99) {
                            wMoqQty += parseFloat(tOne.IN_QTY);
                            wMoqAmt +=
                                parseFloat(tOne.IN_QTY) *
                                parseFloat(tOne.PAY_PRICE);
                        }
                        if (parseFloat(tOne.PO_SEQ) === 98)
                            wOverQty += parseFloat(tOne.IN_QTY);
                        if (parseFloat(tOne.PO_SEQ) === 97)
                            wFocQty += parseFloat(tOne.IN_QTY);
                        if (parseFloat(tOne.PO_SEQ) !== 97) {
                            wStsInAmt +=
                                parseFloat(tOne.IN_QTY) *
                                parseFloat(tOne.PAY_PRICE);
                            if (parseFloat(tOne.PO_SEQ) !== 98) {
                                wSurchargeAmt +=
                                    parseFloat(tOne.IN_QTY) *
                                    parseFloat(tOne.SURCHARGE_PRICE);
                            }
                        }
                        if (
                            parseFloat(tOne.PO_SEQ) !== 97 &&
                            parseFloat(tOne.PAY_PRICE) <= 0.00001
                        ) {
                            wFocQty += parseFloat(tOne.IN_QTY);
                            wInQty -= parseFloat(tOne.IN_QTY);
                        }
                    }
                }
            }
            if (saveObj.PO_CD) {
                saveObj.PO_QTY = wPoQty;
                saveObj.STSIN_QTY = wInQty;
                saveObj.LC_QTY = wLcQty;
                saveObj.MOQ_QTY = wMoqQty;
                saveObj.OVER_QTY = wOverQty;
                saveObj.FOC_QTY = wFocQty;
                saveObj.PO_AMT = wStsInAmt;
                saveObj.STSIN_AMT = wStsInAmt;
                saveObj.SURCHARGE_AMT = parseFloat(wSurchargeAmt).toFixed(2);
                saveObj.MOQ_AMT = wMoqAmt;

                var tPayPrice = '0';
                if (
                    parseFloat(saveObj.STSIN_QTY) -
                        parseFloat(saveObj.FOC_QTY) >
                    0
                ) {
                    tPayPrice =
                        parseFloat(saveObj.STSIN_AMT) /
                        (parseFloat(saveObj.STSIN_QTY) -
                            parseFloat(saveObj.FOC_QTY));
                    tPayPrice = parseFloat(tPayPrice).toFixed(4);
                }
                var tPoPrice = '0';
                if (
                    parseFloat(saveObj.PO_QTY) - parseFloat(saveObj.FOC_QTY) >
                    0
                ) {
                    tPoPrice =
                        parseFloat(saveObj.PO_AMT) /
                        (parseFloat(saveObj.PO_QTY) -
                            parseFloat(saveObj.FOC_QTY));
                    tPoPrice = parseFloat(tPoPrice).toFixed(4);
                }

                saveObj.PO_PRICE = tPoPrice;
                saveObj.PAY_PRICE = tPayPrice;

                tRetArray0.push(saveObj);
            }

            var tIdx2 = 0;
            var tRetArray = [];
            for (tIdx2 = 0; tIdx2 < tRetArray0.length; tIdx2++) {
                var tOne = { ...tRetArray0[tIdx2] };

                tOne.LEADER_CONFIRM = '';
                if (tOne.FULLIN_FLAG !== '1') tOne.STSIN_TYPE = 'PART-IN';
                else tOne.STSIN_TYPE = 'FULL-IN';

                var sql0 = `
                    select
                        isnull(LEADER_CONFIRM, '') as LEADER_CONFIRM,
                        isnull(STSIN_TYPE, '') as STSIN_TYPE
                    from
                        ksv_stock_mem2_stsin
                    where
                        stsin_cd = '${tOne.STSIN_CD}'
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                if (tRet0.length > 0) {
                    tOne.LEADER_CONFIRM = tRet0[0].LEADER_CONFIRM;
                }

                tOne.PAY_CONDITION = '';
                var sql0 = `
                    select
                        a.PAY_TYPE,
                        isnull(b.CD_NAME, '') as PAY_CONDITION
                    from
                        ksv_stock_in_mst a,
                        kcd_code b
                    where
                        a.stsin_cd = '${tOne.STSIN_CD}'
                        and a.pay_type = b.cd_code
                        and b.cd_group = 'PAY_TYPE'
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                if (tRet0.length > 0) {
                    tOne.PAY_CONDITION = tRet0[0].PAY_CONDITION;
                }

                // ksv_stock_mem의 PO_QtY을 사용
                // tOne.PO_QTY  = tOne.STSIN_QTY;

                var tOverRate =
                    (Math.abs(parseFloat(tOne.OVER_QTY)) /
                        parseFloat(tOne.PO_QTY)) *
                    100.0;

                if (tOverRate > parseFloat(tOne.OVERSHORT)) {
                    if (parseFloat(tOne.PO_QTY) >= parseFloat(tOne.STSIN_QTY)) tOne.OVERSHORT_NAME = '';
                    else tOne.OVERSHORT_NAME = `Out Of Tol`;
                }
                else if (parseFloat(tOne.OVER_QTY) > 0)
                    tOne.OVERSHORT_NAME = 'Over';
                else if (parseFloat(tOne.OVER_QTY) < 0)
                    tOne.OVERSHORT_NAME = 'Short';

                var sql0 = `
                    select
                        *
                    from
                        ksv_cost_mst
                    where
                        pu_cd = '${tOne.PU_CD}'
                        and
                    type = 'STS_IN'
                    and type2 in ('MOQ', 'Surcharge')
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                tOne.MOQ_CONFIRM = '';
                tOne.SURCHARGE_CONFIRM = '';
                tRet0.forEach((col, i) => {
                    if (col.TYPE2 === 'MOQ')
                        tOne.MOQ_CONFIRM = col.CONFIRM_USER;
                    if (col.TYPE2 === 'Surcharge')
                        tOne.SURCHARGE_CONFIRM = col.CONFIRM_USER;
                });

                if (tOne.LC_BILL_NO !== '') {
                    sql0 = `
                        select
                            sum(LC_QTY) as LC_QTY
                        from
                            ksv_stock_in
                        where
                            pay_report = '${tOne.LC_BILL_NO}'
                            and pu_cd = '${tOne.PU_CD}'
                            and matl_cd = '${tOne.MATL_CD}'
                    `;
                    tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                    if (tRet0.length > 0) {
                        tOne.LC_QTY = tRet0[0].LC_QTY;
                    }
                }

                tArray.push(tOne);
                if (tArray.length > 500) break;
            }

            console.log(sqlStr);
            return tArray;
        },

        mgrQueryS043001_4_2_1211: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);

            var tSQL = '';

            var sqlExFactory = '';
            if (!args.data.S_EX_FACTORY && !args.data.E_EX_FACTORY) {
                var sExFactory = `${tRetDate.substring(0, 6)}01`;
                var eExFactory = `99999999`;
                sqlExFactory = `and   left(k1.in_datetime, 8) between '${sExFactory}' and '${eExFactory}' `;
            } else {
                var sExFactory = args.data.S_EX_FACTORY;
                if (sExFactory === '')
                    sExFactory = `${tRetDate.substring(0, 6)}01`;
                var eExFactory = args.data.E_EX_FACTORY;
                if (eExFactory === '') eExFactory = `99999999`;
                // tSQL += `and   a1.exp_delivery_date between '${sExFactory}' and '${eExFactory}' `;
                sqlExFactory = `and   left(k1.in_datetime, 8) between '${sExFactory}' and '${eExFactory}' `;
            }

            var sqlPayDate = '';
            if (!args.data.S_PAY_DATE && !args.data.E_PAY_DATE);
            else {
                var sPayDate = args.data.S_PAY_DATE;
                if (sPayDate === '') sPayDate = `${tRetDate.substring(0, 6)}01`;
                var ePayDate = args.data.E_PAY_DATE;
                if (ePayDate === '') ePayDate = `99999999`;
                //tSQL += `and   a1.pay_date between '${sPayDate}' and '${ePayDate}' `;
                sqlPayDate = `and   a1.pay_date between '${sPayDate}' and '${ePayDate}' `;
            }

            if (args.data.PO_CD.length >= 9) tSQL = '';
            if (args.data.PU_CD.length >= 0) tSQL = '';

            var inPoSql = '';
            /*
       var tCols = args.data.PO_CD.split(',');
       var tIdx = 0;
       tCols.forEach((col0, i) => {
           var col = col0.trim();
           if (col !== '') {
               if (inPoSql === '') inPoSql = `'${col}'`;
               else  inPoSql += `,'${col}'`;
               tIdx += 1;
           }
       });
       if (inPoSql !== '') inPoSql = `and   k1.po_cd in (${inPoSql}) `;
       */
            var tCols = args.data.PO_CD.split(',');
            var tIdx = 0;
            tCols.forEach((col0, i) => {
                var col = col0.trim();
                if (col !== '') {
                    if (inPoSql === '') inPoSql = ` a1.po_cd2 like '%${col}%' `;
                    else inPoSql += ` or a1.po_cd2 like '%{col}%' `;
                }
            });
            if (inPoSql !== '') inPoSql = ` and (${inPoSql}) `;

            let sqlStr = `
                select
                    k3.VENDOR_CD,
                    k3.VENDOR_NAME,
                    k1.PU_CD,
                    k1.MATL_CD,
                    k2.MATL_NAME,
                    k2.COLOR,
                    k2.SPEC,
                    left(k1.IN_DATETIME, 8) as IN_DATETIME,
                    k1.REG_USER,
                    left(k1.ORDER_CD, 2) as BUYER_CD,
                    isnull(a1.MATL_TYPE, '') as MATL_TYPE,
                    isnull(a1.TRADE_TERM, '') as TRADE_TERM,
                    isnull(a1.BILL_TO, '') as BILL_TO,
                    isnull(a1.CURR_CD, '') as CURR_CD,
                    isnull(a1.EXP_DELIVERY_DATE, '') as EX_FACTORY,
                    isnull(a4.PAY_DATE, '') as PAY_DATE,
                    isnull(a4.PAY_TERM, '1') as PAY_TERM,
                    '' as PAY_CONDITION,
                    isnull(a4.OVERSHORT, '0') as OVERSHORT,
                    isnull(k2.MATL_TYPE, '') as IN_MATL_TYPE,
                    isnull(k1.IN_CURR_CD, '') as IN_CURR_CD,
                    isnull(k1.PAY_DATE, '') as IN_PAY_DATE,
                    isnull(k1.PAY_REPORT, '') as PAY_REPORT,
                    isnull(k1.LC_BILL_NO, '') as LC_BILL_NO,
                    k1.STSIN_CD,
                    -- sum((k1.in_qty+k1.lc_qty)) as STSIN_QTY ,
                    sum((k1.in_qty)) as STSIN_QTY,
                    sum((k1.lc_qty)) as LC_QTY,
                    sum((k1.in_qty) * k1.IN_PRICE) as STSIN_AMT,
                    sum((k1.lc_qty) * k1.IN_PRICE) as LC_AMT,
                    sum((k1.in_qty + k1.lc_qty) * k2.WEIGHT) as S_WEIGHT
                from
                    ksv_stock_in k1
                    left join ksv_stock_in_mst a4 on k1.stsin_cd = a4.stsin_cd,
                    kcd_matl_mst k2,
                    kcd_vendor k3,
                    ksv_pu_mst2 a1
                where
                    1 = 1 ${sqlExFactory}
                    and k1.matl_cd = k2.MATL_CD
                    and k2.vendor_cd = k3.vendor_cd
                    and k3.vendor_name like '%${args.data.VENDOR_CD}%'
                    and k1.pu_cd like '%${args.data.PU_CD}%'
                    and k3.vendor_type like '%${args.data.VENDOR_TYPE}%'
                    and a1.pu_cd = k1.pu_cd
                    and k1.in_qty > 0 ${inPoSql}
                group by
                    k3.VENDOR_CD,
                    k3.VENDOR_NAME,
                    k1.PU_CD,
                    k1.MATL_CD,
                    k2.MATL_NAME,
                    k2.COLOR,
                    k2.SPEC,
                    left(k1.IN_DATETIME, 8),
                    k1.REG_USER,
                    left(k1.ORDER_CD, 2),
                    isnull(a1.MATL_TYPE, ''),
                    isnull(a1.TRADE_TERM, ''),
                    isnull(a1.BILL_TO, ''),
                    isnull(a1.CURR_CD, ''),
                    isnull(a1.EXP_DELIVERY_DATE, ''),
                    isnull(a4.PAY_DATE, ''),
                    isnull(a4.PAY_TERM, '1'),
                    isnull(a4.OVERSHORT, '0'),
                    isnull(k2.MATL_TYPE, ''),
                    isnull(k1.IN_CURR_CD, ''),
                    isnull(k1.PAY_DATE, ''),
                    k1.STSIN_CD,
                    k1.PAY_REPORT,
                    k1.LC_BILL_NO
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tArray = [];

            var tPuCds = [];
            tRet.forEach((col, i) => {
                var tCheck = 0;
                tPuCds.forEach((col1, i1) => {
                    if (col1 === col.PU_CD) tCheck = 1;
                });
                if (tCheck === 0) tPuCds.push(col.PU_CD);
            });
            /*
       console.log(`=============> Pu Cd:${tPuCds.length}`);
       console.log(`=============> Ret:${tRet.length}`);
       console.log(sqlStr);
       */

            var tPuArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tPuCds.length; tIdx++) {
                let sqlPuMst = `
                    select
                        *
                    from
                        ksv_pu_mst2
                    where
                        pu_cd = '${tPuCds[tIdx]}'
                `;
                var retPuMst = await prisma.$queryRaw(Prisma.raw(sqlPuMst));
                if (retPuMst.length <= 0) {
                    continue;
                }
                var objPuMst = { ...retPuMst[0] };

                var tArgObj = {};
                tArgObj.PU_CD = tPuCds[tIdx];
                tArgObj.IN_PO_CD = objPuMst.PO_CD2;
                tArgObj.IN_PO_SEQ = '';
                tArgObj.BUYER_CD = objPuMst.BUYER_CD;
                tArgObj.VENDOR_CD = objPuMst.VENDOR_CD;
                tArgObj.LAST = '1';

                var tFunc = new S043001_COMM();
                var tRetObj = await tFunc.queryS043001_LIST_2(
                    tArgObj,
                    contextValue,
                );
                console.log(`===> GEt PU DATA: ${tRetObj.length}`);
                tRetObj.forEach((col, i) => {
                    var tObj1 = { ...col };
                    tObj1.DATAS.forEach((col1, i1) => {
                        console.log(
                            `PU DATA: ${col1.PU_CD}/${col1.PO_CD}/${col1.MATL_CD}/${col1.PO_QTY}`,
                        );
                        tPuArray.push(col1);
                    });
                });
            }

            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tOne = { ...tRet[tIdx] };

                var tSelArray = [];
                var tPoQty = 0;
                var tPoAmt = 0;
                var tMoqQty = 0;
                var tOverQty = 0;
                var tMoqAmt = 0;
                var tSurchargeAmt = 0;
                var tPoCd = '';
                tPuArray.forEach((col, i) => {
                    console.log(
                        `===> Comp: ${col.PU_CD},${col.MATL_CD}/${tOne.PU_CD},${tOne.MATL_CD}`,
                    );
                    if (
                        col.PU_CD === tOne.PU_CD &&
                        col.MATL_CD === tOne.MATL_CD
                    ) {
                        tSelArray.push(col);
                        tPoQty += parseFloat(col.PO_QTY);
                        tPoAmt +=
                            parseFloat(col.PO_QTY) * parseFloat(col.PO_PRICE);
                        tMoqQty += parseFloat(col.MOQ_QTY);
                        tMoqAmt +=
                            parseFloat(col.MOQ_QTY) * parseFloat(col.PO_PRICE);
                        tOverQty += parseFloat(col.OVER_QTY);
                        tSurchargeAmt += parseFloat(col.SURCHARGE_AMT);
                        if (tPoCd === '') tPoCd = `${col.PO_CD}`;
                        else tPoCd += `/${col.PO_CD}`;
                    }
                });
                console.log(`===> Comp Result: ${tPoCd}`);

                tOne.LEADER_CONFIRM = '';
                tOne.STSIN_TYPE = 'FULL-IN';
                var sql0 = `
                    select
                        isnull(LEADER_CONFIRM, '') as LEADER_CONFIRM,
                        isnull(STSIN_TYPE, '') as STSIN_TYPE
                    from
                        ksv_stock_mem2_stsin
                    where
                        stsin_cd = '${tOne.STSIN_CD}'
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                if (tRet0.length > 0) {
                    tOne.LEADER_CONFIRM = tRet0[0].LEADER_CONFIRM;
                    tOne.STSIN_TYPE = tRet0[0].STSIN_TYPE;
                }

                tOne.PAY_CONDITION = '';
                var sql0 = `
                    select
                        a.PAY_TYPE,
                        isnull(b.CD_NAME, '') as PAY_CONDITION
                    from
                        ksv_stock_in_mst a,
                        kcd_code b
                    where
                        a.stsin_cd = '${tOne.STSIN_CD}'
                        and a.pay_type = b.cd_code
                        and b.cd_group = 'PAY_TYPE'
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                if (tRet0.length > 0) {
                    tOne.PAY_CONDITION = tRet0[0].PAY_CONDITION;
                }

                tOne.MOQ_AMT = String(tMoqAmt);
                tOne.SURCHARGE_AMT = String(tSurchargeAmt);
                tOne.OVERSHORT_NAME = '';
                tOne.OVER_QTY = String(tOverQty);
                tOne.PO_QTY = String(tPoQty);
                tOne.PO_AMT = String(tPoAmt);
                tOne.PO_CD = tPoCd;

                var tOverRate =
                    (Math.abs(parseFloat(tOne.OVER_QTY)) /
                        parseFloat(tOne.PO_QTY)) *
                    100.0;
                if (tOverRate > parseFloat(tOne.OVERSHORT))
                    tOne.OVERSHORT_NAME = 'Out Of Tol';
                else if (parseFloat(tOne.OVER_QTY) > 0)
                    tOne.OVERSHORT_NAME = 'Over';
                else if (parseFloat(tOne.OVER_QTY) < 0)
                    tOne.OVERSHORT_NAME = 'Short';

                var sql0 = `
                    select
                        *
                    from
                        ksv_cost_mst
                    where
                        pu_cd = '${tOne.PU_CD}'
                        and
                    type = 'STS_IN'
                    and type2 in ('MOQ', 'Surcharge')
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                tOne.MOQ_CONFIRM = '';
                tOne.SURCHARGE_CONFIRM = '';
                tRet0.forEach((col, i) => {
                    if (col.TYPE2 === 'MOQ')
                        tOne.MOQ_CONFIRM = col.CONFIRM_USER;
                    if (col.TYPE2 === 'Surcharge')
                        tOne.SURCHARGE_CONFIRM = col.CONFIRM_USER;
                });

                if (tOne.MATL_TYPE === '') tOne.MATL_TYPE = tOne.IN_MATL_TYPE;
                if (tOne.CURR_CD === '') tOne.CURR_CD = tOne.IN_CURR_CD;
                if (tOne.PAY_DATE === '') tOne.PAY_DATE = tOne.IN_PAY_DATE;
                if (tOne.IN_DATETIME === '')
                    tOne.IN_DATETIME = tOne.IN_DATETIME2;

                if (tOne.LC_BILL_NO !== '') {
                    sql0 = `
                        select
                            sum(LC_QTY) as LC_QTY
                        from
                            ksv_stock_in
                        where
                            pay_report = '${tOne.LC_BILL_NO}'
                            and pu_cd = '${tOne.PU_CD}'
                            and matl_cd = '${tOne.MATL_CD}'
                    `;
                    tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                    if (tRet0.length > 0) {
                        tOne.LC_QTY = tRet0[0].LC_QTY;
                    }
                }

                tArray.push(tOne);
                if (tArray.length > 500) break;
            }

            /*
       var tArray1 = []; 
       var workObj = {};
       tArray.forEach((col, i) => {
           if (i === 0) workObj = { ...col };
           else {
               if (col.VENDOR_CD !== workObj.VENDOR_CD) {
                   tArray1.push(workObj);
                   workObj = { ...col };
               } else {
                   if (col.IN_DATETIME !== workObj.IN_DATETIME) {
                      tArray1.push(workObj);
                      workObj = { ...col };
                   } else {
                      workObj.PO_CD += `/${col.PO_CD}`;
                      workObj.STSIN_CD += `/${col.STSIN_CD}`;
                      workObj.PO_AMT = String(parseFloat(workObj.PO_AMT)+parseFloat(col.PO_AMT)); 
                      workObj.PO_QTY = String(parseFloat(workObj.PO_QTY)+parseFloat(col.PO_QTY)); 
                      workObj.STOCK_AMT = String(parseFloat(workObj.STOCK_AMT)+parseFloat(col.STOCK_AMT)); 
                      workObj.STSIN_AMT = String(parseFloat(workObj.STSIN_AMT)+parseFloat(col.STSIN_AMT)); 
                      workObj.STSIN_QTY = String(parseFloat(workObj.STSIN_QTY)+parseFloat(col.STSIN_QTY)); 
                      workObj.MOQ_AMT = String(parseFloat(workObj.MOQ_AMT)+parseFloat(col.MOQ_AMT)); 
                      workObj.S_WEIGHT = String(parseFloat(workObj.S_WEIGHT)+parseFloat(col.S_WEIGHT)); 
                   }
               }
           }
       });
       tArray1.push(workObj);
       */

            console.log(sqlStr);
            return tArray;
        },

        // Backup 4_2
        mgrQueryS043001_4_2_1: async (_, args) => {
            var tSQL = '';

            let sqlStr = `
                SELECT
                    -- A6.GW_CD,
                    A5.REG_USER,
                    A5.BUYER_CD,
                    A51.BUYER_NAME,
                    A1.PO_CD,
                    A1.PO_SEQ,
                    A1.ORDER_CD,
                    A1.MATL_CD,
                    A1.MRP_SEQ,
                    A1.MATL_SEQ,
                    A5.VENDOR_CD,
                    A52.VENDOR_NAME,
                    A3.MATL_NAME,
                    A3.COLOR,
                    A3.SPEC,
                    A3.UNIT,
                    A1.PO_QTY as MRP_QTY,
                    A1.MOQ,
                    A1.LEFTOVER_QTY,
                    A1.PO_QTY2 as PO_QTY,
                    A6.FOC_QTY,
                    A6.SHIP_QTY,
                    A6.IN_QTY,
                    A6.IN_CURR_CD,
                    A6.MASTER_PRICE,
                    A6.FREIGHT_PRICE,
                    A6.MOQ_PRICE,
                    A6.IN_PRICE,
                    (A6.IN_PRICE * A6.IN_QTY) as IN_AMT,
                    A6.PAY_TYPE,
                    A6.PAY_DATE,
                    A6.OUT_QTY,
                    A6.OUT_STATUS,
                    A6.BILL_FLAG,
                    A6.BILL_DATE,
                    A6.PU_CD,
                    A1.MOQ_STOCK_IDX,
                    A1.FOC_STOCK_IDX,
                    A1.LEFTOVER_STOCK_IDX,
                    A6.IN_DATETIME
                FROM
                    KSV_STOCK_MEM A1,
                    KSV_STOCK_IN A6,
                    KSV_PU_MST2 A5,
                    KSV_PO_MRP A2,
                    KCD_MATL_MST A3,
                    KCD_MATL_MEM A4,
                    KCD_BUYER A51,
                    KCD_VENDOR A52
                WHERE
                    A1.PU_CD = '${args.data.PU_CD}'
                    AND A1.PU_CD = A6.PU_CD
                    AND A1.PO_CD = A6.PO_CD
                    AND A1.PO_SEQ = A6.PO_SEQ
                    AND A1.ORDER_CD = A6.ORDER_CD
                    AND A1.MATL_CD = A6.MATL_CD
                    AND A1.MRP_SEQ = A6.MRP_SEQ
                    AND A6.IN_QTY > 0
                    -- AND   A6.IN_QTY > A6.OUT_QTY
                    AND A1.PU_CD = A5.PU_CD
                    AND A1.MATL_CD = A3.MATL_CD
                    AND A1.MATL_CD = A4.MATL_CD
                    AND A1.MATL_SEQ = A4.MATL_SEQ
                    AND A1.PO_CD = A2.PO_CD
                    AND A1.PO_SEQ = A2.PO_SEQ
                    AND A1.ORDER_CD = A2.ORDER_CD
                    AND A1.MATL_CD = A2.MATL_CD
                    AND A1.MRP_SEQ = A2.MRP_SEQ
                    AND A1.MATL_SEQ = A2.MATL_SEQ
                    AND A1.IN_QTY > 0
                    -- AND   A1.IN_QTY > A1.OUT_QTY
                    AND A5.BUYER_CD = A51.BUYER_CD
                    AND A5.VENDOR_CD = A52.VENDOR_CD
                order by
                    A1.PO_CD,
                    A1.PO_SEQ
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            return tRet;
        },

        mgrQueryS043001_4_2_bak: async (_, args) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);

            var tSQL = '';

            var sExFactory = args.data.S_EX_FACTORY;
            if (sExFactory === '') sExFactory = `${tRetDate.substring(0, 6)}01`;
            var eExFactory = args.data.E_EX_FACTORY;
            if (eExFactory === '') eExFactory = `99999999`;

            var sPayDate = args.data.S_PAY_DATE;
            if (sPayDate === '') sPayDate = `${tRetDate.substring(0, 6)}01`;
            var ePayDate = args.data.E_PAY_DATE;
            if (ePayDate === '') ePayDate = `99999999`;
            tSQL += `and   a1.exp_delivery_date between '${sExFactory}' and '${eExFactory}' `;
            tSQL += `and   a1.pay_date between '${sPayDate}' and '${ePayDate}' `;

            /*
       if (args.data.BUYER_CD === '' &&
           args.data.PU_CD === '' &&
           args.data.VENDOR_CD === '' ) {
           if (sExFactory !== '') {
               if (eExFactory === '')  eExFactory = '99999999';
           } else {
               sExFactory = tRetDate.substring(0, 4) + '0101';
               eExFactory = '99999999';
           }
           if (sPayDate !== '') {
               if (ePayDate === '')  ePayDate = '99999999';
           } else {
               sPayDate = tRetDate.substring(0, 4) + '0101';
               ePayDate = '99999999';
           }
           tSQL += `and   a1.exp_delivery_date between '${sExFactory}' and '${eExFactory}' `;
           tSQL += `and   a1.pay_date between '${sPayDate}' and '${ePayDate}' `;
       } else {
           if (sExFactory !== '') {
               if (eExFactory === '')  eExFactory = '99999999';
               tSQL += `and   a1.exp_delivery_date between '${sExFactory}' and '${eExFactory}' `;
           } 
           if (sPayDate !== '') {
               if (ePayDate === '')  ePayDate = '99999999';
               tSQL += `and   a1.pay_date between '${sPayDate}' and '${ePayDate}' `;
           }
       }
*/

            if (args.data.PO_CD.length >= 9) tSQL = '';
            if (args.data.PU_CD.length >= 0) tSQL = '';

            let sqlStr = `
                SELECT
                    top 100 a1.PU_CD,
                    a1.PO_CD2 as PO_CD,
                    a3.STSIN_CD,
                    a1.REG_USER,
                    a1.BUYER_CD,
                    b1.VENDOR_CD,
                    b1.VENDOR_NAME,
                    a1.MATL_TYPE,
                    a1.TRADE_TERM,
                    a1.BILL_TO,
                    a1.CURR_CD,
                    a3.STSIN_TYPE,
                    a1.EXP_DELIVERY_DATE as EX_FACTORY,
                    a4.PAY_DATE,
                    left(a4.IN_DATETIME, 8) as IN_DATETIME,
                    isnull(a4.PAY_TERM, '1') as PAY_TERM,
                    b2.CD_NAME as PAY_CONDITION,
                    isnull(a4.OVERSHORT, '0') as OVERSHORT,
                    sum(a3.STSIN_QTY) as STSIN_QTY,
                    sum(
                        (
                            (a3.STSIN_QTY - isnull(a3.FOC_QTY, 0)) * a3.PO_PRICE
                        )
                    ) as STSIN_AMT,
                    sum((a3.MOQ_QTY * a3.PO_PRICE)) as MOQ_AMT,
                    sum((a3.SHIP_QTY * b3.WEIGHT)) as S_WEIGHT,
                    sum((isnull(a3.SURCHARGE_AMT, 0))) as SURCHARGE_AMT
                FROM
                    ksv_pu_mst2 a1,
                    ksv_stock_mem2_stsin a3,
                    ksv_stock_in_mst a4
                    left join kcd_code b2 on b2.cd_code = a4.pay_type
                    and b2.cd_group = 'PAY_TYPE',
                    kcd_vendor b1,
                    kcd_matl_mst b3
                where
                    a1.pu_cd = a3.pu_cd
                    and a3.stsin_cd = a4.stsin_cd
                    and a3.matl_cd = b3.matl_cd
                    and a1.vendor_cd = b1.vendor_cd
                    and a1.reg_user like '%${args.data.REG_USER}%'
                    and a1.buyer_cd like '%${args.data.BUYER_CD}%'
                    and a1.pu_cd like '%${args.data.PU_CD}%'
                    and a1.bill_to like '%${args.data.BILL_TO}%'
                    and a1.po_cd2 like '%${args.data.PO_CD}%'
                    and (b1.vendor_type like '%${args.data.VENDOR_TYPE}%')
                    and (
                        b1.vendor_cd like '%${args.data.VENDOR_CD}%'
                        or b1.vendor_name like '%${args.data.VENDOR_CD}%'
                    ) ${tSQL}
                group by
                    a1.PU_CD,
                    a1.PO_CD2,
                    a3.STSIN_CD,
                    a1.REG_USER,
                    a1.BUYER_CD,
                    b1.VENDOR_CD,
                    b1.VENDOR_NAME,
                    a1.MATL_TYPE,
                    a1.TRADE_TERM,
                    a1.BILL_TO,
                    a1.CURR_CD,
                    a3.STSIN_TYPE,
                    a1.EXP_DELIVERY_DATE,
                    a4.PAY_DATE,
                    left(a4.IN_DATETIME, 8),
                    a4.PAY_TERM,
                    b2.CD_NAME,
                    a4.OVERSHORT
                order by
                    a1.pu_cd,
                    a1.po_cd2,
                    a1.buyer_cd,
                    left(a4.IN_DATETIME, 8)
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tOne = { ...tRet[tIdx] };
                var sql0 = `
                    select
                        isnull(LEADER_CONFIRM, '') as LEADER_CONFIRM
                    from
                        ksv_stock_mem2_stsin
                    where
                        stsin_cd = '${tOne.STSIN_CD}'
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                if (tRet0.length > 0) {
                    tOne.LEADER_CONFIRM = tRet0[0].LEADER_CONFIRM;
                }

                var sql0 = `
                    select
                        *
                    from
                        ksv_cost_mst
                    where
                        pu_cd = '${tOne.PU_CD}'
                        and
                    type = 'STS_IN'
                    and type2 in ('MOQ', 'Surcharge')
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                tOne.MOQ_CONFIRM = '';
                tOne.SURCHARGE_CONFIRM = '';
                tRet0.forEach((col, i) => {
                    if (col.TYPE2 === 'MOQ')
                        tOne.MOQ_CONFIRM = col.CONFIRM_USER;
                    if (col.TYPE2 === 'Surcharge')
                        tOne.SURCHARGE_CONFIRM = col.CONFIRM_USER;
                });

                tOne.OVERSHORT_NAME = '';
                var tOverFlag = 0;
                var tOverCnt = 0;
                var tShortCnt = 0;

                var sql1 = `
                    select
                        isnull(overshort_qty, 0) as overshort_qty,
                        po_qty
                    from
                        ksv_stock_mem2_stsin
                    where
                        stsin_cd = '${tOne.STSIN_CD}'
                `;
                var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));

                tRet1.forEach((col, i) => {
                    var tOverShortQty = col.overshort_qty;
                    if (tOverShortQty > 0) tOverCnt += 1;
                    if (tOverShortQty < 0) tShortCnt += 1;

                    if (tOverShortQty < 0) tOverShortQty = tOverShortQty * -1;

                    var tOverRate = 0;
                    if (tOverShortQty > 0)
                        tOverRate =
                            (tOverShortQty / parseFloat(col.po_qty)) * 100.0;
                    if (tOverRate > parseFloat(tOne.OVERSHORT)) tOverFlag = 1;
                });

                if (tOverFlag > 0) tOne.OVERSHORT_NAME = 'Out Of Tol';
                else if (tOverCnt > 0 && tShortCnt > 0)
                    tOne.OVERSHORT_NAME = 'Over/Short';
                else if (tOverCnt > 0) tOne.OVERSHORT_NAME = 'Over';
                else if (tShortCnt > 0) tOne.OVERSHORT_NAME = 'Short';

                var sql2 = `
                    select
                        sum(PO_QTY2) as PO_QTY,
                        sum(PO_QTY2 * PO_PRICE) as PO_AMT,
                        sum(STOCK_QTY * PO_PRICE) as STOCK_AMT
                    from
                        ksv_stock_mem2
                    where
                        (
                            stsin_cd = '${tOne.STSIN_CD}'
                            or stsin_array like '%${tOne.STSIN_CD}%'
                        )
                `;
                var tRet2 = await prisma.$queryRaw(Prisma.raw(sql2));
                tOne.PO_QTY = '0';
                tOne.PO_AMT = '0';
                tOne.STOCK_AMT = '0';
                if (tRet2.length > 0) {
                    tOne.PO_QTY = String(tRet2[0].PO_QTY);
                    tOne.PO_AMT = String(tRet2[0].PO_AMT);
                    tOne.STOCK_AMT = String(tRet2[0].STOCK_AMT);
                }

                tArray.push(tOne);
            }
            return tArray;
        },

        mgrQueryS043001_4_2_bak1: async (_, args) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);

            var tSQL = '';

            var sExFactory = args.data.S_EX_FACTORY;
            if (sExFactory === '') sExFactory = `${tRetDate.substring(0, 6)}01`;
            var eExFactory = args.data.E_EX_FACTORY;
            if (eExFactory === '') eExFactory = `99999999`;

            var sPayDate = args.data.S_PAY_DATE;
            if (sPayDate === '') sPayDate = `${tRetDate.substring(0, 6)}01`;
            var ePayDate = args.data.E_PAY_DATE;
            if (ePayDate === '') ePayDate = `99999999`;
            tSQL += `and   a1.exp_delivery_date between '${sExFactory}' and '${eExFactory}' `;
            tSQL += `and   a1.pay_date between '${sPayDate}' and '${ePayDate}' `;

            /*
       if (args.data.BUYER_CD === '' &&
           args.data.PU_CD === '' &&
           args.data.VENDOR_CD === '' ) {
           if (sExFactory !== '') {
               if (eExFactory === '')  eExFactory = '99999999';
           } else {
               sExFactory = tRetDate.substring(0, 4) + '0101';
               eExFactory = '99999999';
           }
           if (sPayDate !== '') {
               if (ePayDate === '')  ePayDate = '99999999';
           } else {
               sPayDate = tRetDate.substring(0, 4) + '0101';
               ePayDate = '99999999';
           }
           tSQL += `and   a1.exp_delivery_date between '${sExFactory}' and '${eExFactory}' `;
           tSQL += `and   a1.pay_date between '${sPayDate}' and '${ePayDate}' `;
       } else {
           if (sExFactory !== '') {
               if (eExFactory === '')  eExFactory = '99999999';
               tSQL += `and   a1.exp_delivery_date between '${sExFactory}' and '${eExFactory}' `;
           } 
           if (sPayDate !== '') {
               if (ePayDate === '')  ePayDate = '99999999';
               tSQL += `and   a1.pay_date between '${sPayDate}' and '${ePayDate}' `;
           }
       }
*/

            if (args.data.PO_CD.length >= 9) tSQL = '';
            if (args.data.PU_CD.length >= 0) tSQL = '';

            let sqlStr = `
                SELECT
                    top 100 left(k.IN_DATETIME, 8) as IN_DATETIME,
                    k.PO_CD,
                    b1.VENDOR_CD,
                    isnull(k.STSIN_CD, '') as STSIN_CD,
                    isnull(k.PU_CD, '') as PU_CD,
                    isnull(k.REG_USER, '') as REG_USER,
                    left(k.ORDER_CD, 2) as BUYER_CD,
                    b1.VENDOR_CD,
                    b1.VENDOR_NAME,
                    isnull(a1.MATL_TYPE, '') as MATL_TYPE,
                    isnull(a1.TRADE_TERM, '') as TRADE_TERM,
                    isnull(a1.BILL_TO, '') as BILL_CD,
                    isnull(a1.CURR_CD, '') as CURR_CD,
                    isnull(a1.EXP_DELIVERY_DATE, '') as EX_FACTORY,
                    isnull(a4.PAY_DATE, '') as PAY_DATE,
                    isnull(left(a4.IN_DATETIME, 8), '') as IN_DATETIME,
                    isnull(a4.PAY_TERM, '1') as PAY_TERM,
                    '' as PAY_CONDITION,
                    isnull(a4.OVERSHORT, '0') as OVERSHORT,
                    isnull(b3.MATL_TYPE, '') as IN_MATL_TYPE,
                    isnull(k.IN_CURR_CD, '') as IN_CURR_CD,
                    isnull(k.PAY_DATE, '') as IN_PAY_DATE,
                    isnull(left(k.IN_DATETIME, 8), '') as IN_DATETIME2,
                    sum(k.IN_QTY + k.lc_qty) as STSIN_QTY,
                    sum((k.IN_QTY + k.lc_qty) * k.IN_PRICE) as STSIN_AMT,
                    sum((k.IN_QTY + k.lc_qty) * b3.WEIGHT) as S_WEIGHT
                FROM
                    ksv_stock_in k
                    left join ksv_pu_mst2 a1 on k.pu_cd = a1.pu_cd
                    left join ksv_stock_in_mst a4 on k.stsin_cd = a4.stsin_cd,
                    kcd_vendor b1,
                    kcd_matl_mst b3
                where
                    k.matl_cd = b3.matl_cd
                    and b3.vendor_cd = b1.vendor_cd
                    and a1.reg_user like '%${args.data.REG_USER}%'
                    and a1.buyer_cd like '%${args.data.BUYER_CD}%'
                    and a1.pu_cd like '%${args.data.PU_CD}%'
                    and a1.bill_to like '%${args.data.BILL_TO}%'
                    and a1.po_cd2 like '%${args.data.PO_CD}%'
                    and (b1.vendor_type like '%${args.data.VENDOR_TYPE}%')
                    and (
                        b1.vendor_cd like '%${args.data.VENDOR_CD}%'
                        or b1.vendor_name like '%${args.data.VENDOR_CD}%'
                    ) ${tSQL}
                group by
                    left(k.IN_DATETIME, 8),
                    k.PO_CD,
                    b1.VENDOR_CD,
                    isnull(k.STSIN_CD, ''),
                    isnull(k.PU_CD, ''),
                    isnull(k.REG_USER, ''),
                    left(k.ORDER_CD, 2),
                    b1.VENDOR_CD,
                    b1.VENDOR_NAME,
                    isnull(a1.MATL_TYPE, ''),
                    isnull(a1.TRADE_TERM, ''),
                    isnull(a1.BILL_TO, ''),
                    isnull(a1.CURR_CD, ''),
                    isnull(a1.EXP_DELIVERY_DATE, ''),
                    isnull(a4.PAY_DATE, ''),
                    isnull(left(a4.IN_DATETIME, 8), ''),
                    isnull(a4.PAY_TERM, '1'),
                    isnull(a4.OVERSHORT, '0'),
                    isnull(b3.MATL_TYPE, ''),
                    isnull(k.IN_CURR_CD, ''),
                    isnull(k.PAY_DATE, ''),
                    isnull(left(k.IN_DATETIME, 8), '')
                order by
                    k.pu_cd,
                    k.po_cd,
                    b1.vendor_cd
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tOne = { ...tRet[tIdx] };

                tOne.LEADER_CONFIRM = '';
                tOne.STSIN_TYPE = 'FULL-IN';
                var sql0 = `
                    select
                        isnull(LEADER_CONFIRM, '') as LEADER_CONFIRM,
                        isnull(STSIN_TYPE, '') as STSIN_TYPE
                    from
                        ksv_stock_mem2_stsin
                    where
                        stsin_cd = '${tOne.STSIN_CD}'
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                if (tRet0.length > 0) {
                    tOne.LEADER_CONFIRM = tRet0[0].LEADER_CONFIRM;
                    tOne.STSIN_TYPE = tRet0[0].STSIN_TYPE;
                }

                tOne.PAY_CONDITION = '';
                var sql0 = `
                    select
                        a.PAY_TYPE,
                        isnull(b.CD_NAME, '') as PAY_CONDITION
                    from
                        ksv_stock_in_mst a,
                        kcd_code b
                    where
                        a.stsin_cd = '${tOne.STSIN_CD}'
                        and a.pay_type = b.cd_code
                        and b.cd_group = 'PAY_TYPE'
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                if (tRet0.length > 0) {
                    tOne.PAY_CONDITION = tRet0[0].PAY_CONDITION;
                }

                tOne.MOQ_AMT = '0';
                tOne.SURCHARGE_AMT = '0';
                var sql0 = `
                    select
                        po_seq,
                        sum(tot_qty) as tot_qty,
                        sum(tot_qty * in_price) as tot_amt
                    from
                        ksv_stock_in
                    where
                        po_cd = '${tOne.PO_CD}'
                        and vendor_cd = '${tOne.VENDOR_CD}'
                    group by
                        po_seq
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));

                tOne.OVERSHORT_NAME = '';
                tOne.OVER_QTY = '';
                tOne.PO_QTY = '';
                tOne.PO_AMT = '';
                if (tRet0.length > 0) {
                    var tPoQty = 0;
                    var tPoAmt = 0;
                    tRet0.forEach((col, i) => {
                        if (parseInt(col.po_seq) === 99)
                            tOne.MOQ_AMT = col.tot_amt;
                        else if (parseInt(col.po_seq) === 98)
                            tOne.OVER_QTY = col.tot_qty;
                        else {
                            tPoQty += col.tot_qty;
                            tPoAmt += col.tot_amt;
                        }
                    });
                    tOne.PO_QTY = String(tPoQty);
                }
                var tOverRate =
                    (Math.abs(parseFloat(tOne.OVER_QTY)) /
                        parseFloat(tOne.PO_QTY)) *
                    100.0;
                if (tOverRate > parseFloat(tOne.OVERSHORT))
                    tOne.OVERSHORT_NAME = 'Out Of Tol';
                else if (parseFloat(tOne.OVER_QTY) > 0)
                    tOne.OVERSHORT_NAME = 'Over';
                else if (parseFloat(tOne.OVER_QTY) < 0)
                    tOne.OVERSHORT_NAME = 'Short';

                var sql0 = `
                    select
                        *
                    from
                        ksv_cost_mst
                    where
                        pu_cd = '${tOne.PU_CD}'
                        and
                    type = 'STS_IN'
                    and type2 in ('MOQ', 'Surcharge')
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                tOne.MOQ_CONFIRM = '';
                tOne.SURCHARGE_CONFIRM = '';
                tRet0.forEach((col, i) => {
                    if (col.TYPE2 === 'MOQ')
                        tOne.MOQ_CONFIRM = col.CONFIRM_USER;
                    if (col.TYPE2 === 'Surcharge')
                        tOne.SURCHARGE_CONFIRM = col.CONFIRM_USER;
                });

                var sql2 = `
                    select
                        sum(PO_QTY2) as PO_QTY,
                        sum(PO_QTY2 * PO_PRICE) as PO_AMT,
                        sum(STOCK_QTY * PO_PRICE) as STOCK_AMT
                    from
                        ksv_stock_mem2
                    where
                        (
                            stsin_cd = '${tOne.STSIN_CD}'
                            or stsin_array like '%${tOne.STSIN_CD}%'
                        )
                `;
                var tRet2 = await prisma.$queryRaw(Prisma.raw(sql2));
                tOne.PO_QTY = '0';
                tOne.PO_AMT = '0';
                tOne.STOCK_AMT = '0';
                if (tRet2.length > 0) {
                    tOne.PO_QTY = String(tRet2[0].PO_QTY);
                    tOne.PO_AMT = String(tRet2[0].PO_AMT);
                    tOne.STOCK_AMT = String(tRet2[0].STOCK_AMT);
                }

                if (tOne.MATL_TYPE === '') tOne.MATL_TYPE = tOne.IN_MATL_TYPE;
                if (tOne.CURR_CD === '') tOne.CURR_CD = tOne.IN_CURR_CD;
                if (tOne.PAY_DATE === '') tOne.PAY_DATE = tOne.IN_PAY_DATE;
                if (tOne.IN_DATETIME === '')
                    tOne.IN_DATETIME = tOne.IN_DATETIME2;

                tArray.push(tOne);
            }
            return tArray;
        },

        mgrQueryS043001_4_2_bak2: async (_, args) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);

            var tSQL = '';

            var sqlExFactory = '';
            if (!args.data.S_EX_FACTORY && !args.data.E_EX_FACTORY);
            else {
                var sExFactory = args.data.S_EX_FACTORY;
                if (sExFactory === '')
                    sExFactory = `${tRetDate.substring(0, 6)}01`;
                var eExFactory = args.data.E_EX_FACTORY;
                if (eExFactory === '') eExFactory = `99999999`;
                // tSQL += `and   a1.exp_delivery_date between '${sExFactory}' and '${eExFactory}' `;
                sqlExFactory = `and   left(k.in_datetime, 8) between '${sExFactory}' and '${eExFactory}' `;
            }

            var sqlPayDate = '';
            if (!args.data.S_PAY_DATE && !args.data.E_PAY_DATE);
            else {
                var sPayDate = args.data.S_PAY_DATE;
                if (sPayDate === '') sPayDate = `${tRetDate.substring(0, 6)}01`;
                var ePayDate = args.data.E_PAY_DATE;
                if (ePayDate === '') ePayDate = `99999999`;
                //tSQL += `and   a1.pay_date between '${sPayDate}' and '${ePayDate}' `;
            }

            /*
       if (args.data.BUYER_CD === '' &&
           args.data.PU_CD === '' &&
           args.data.VENDOR_CD === '' ) {
           if (sExFactory !== '') {
               if (eExFactory === '')  eExFactory = '99999999';
           } else {
               sExFactory = tRetDate.substring(0, 4) + '0101';
               eExFactory = '99999999';
           }
           if (sPayDate !== '') {
               if (ePayDate === '')  ePayDate = '99999999';
           } else {
               sPayDate = tRetDate.substring(0, 4) + '0101';
               ePayDate = '99999999';
           }
           tSQL += `and   a1.exp_delivery_date between '${sExFactory}' and '${eExFactory}' `;
           tSQL += `and   a1.pay_date between '${sPayDate}' and '${ePayDate}' `;
       } else {
           if (sExFactory !== '') {
               if (eExFactory === '')  eExFactory = '99999999';
               tSQL += `and   a1.exp_delivery_date between '${sExFactory}' and '${eExFactory}' `;
           } 
           if (sPayDate !== '') {
               if (ePayDate === '')  ePayDate = '99999999';
               tSQL += `and   a1.pay_date between '${sPayDate}' and '${ePayDate}' `;
           }
       }
*/

            if (args.data.PO_CD.length >= 9) tSQL = '';
            if (args.data.PU_CD.length >= 0) tSQL = '';

            var inPoSql = '';
            var tCols = args.data.PO_CD.split(',');
            var tIdx = 0;
            tCols.forEach((col0, i) => {
                var col = col0.trim();
                if (col !== '') {
                    if (tIdx === 0) inPoSql = `'${col}'`;
                    else inPoSql += `,'${col}'`;
                    tIdx += 1;
                }
            });
            if (inPoSql !== '') inPoSql = `and   k.po_cd in (${inPoSql}) `;

            let sqlStr = `
                SELECT
                    top 100 left(k.IN_DATETIME, 8) as IN_DATETIME,
                    k.PO_CD,
                    b1.VENDOR_CD,
                    isnull(k.STSIN_CD, '') as STSIN_CD,
                    isnull(k.PU_CD, '') as PU_CD,
                    isnull(k.REG_USER, '') as REG_USER,
                    left(k.ORDER_CD, 2) as BUYER_CD,
                    b1.VENDOR_CD,
                    b1.VENDOR_NAME,
                    isnull(a1.MATL_TYPE, '') as MATL_TYPE,
                    isnull(a1.TRADE_TERM, '') as TRADE_TERM,
                    isnull(a1.BILL_TO, '') as BILL_CD,
                    isnull(a1.CURR_CD, '') as CURR_CD,
                    isnull(a1.EXP_DELIVERY_DATE, '') as EX_FACTORY,
                    isnull(a4.PAY_DATE, '') as PAY_DATE,
                    isnull(left(a4.IN_DATETIME, 8), '') as IN_DATETIME,
                    isnull(a4.PAY_TERM, '1') as PAY_TERM,
                    '' as PAY_CONDITION,
                    isnull(a4.OVERSHORT, '0') as OVERSHORT,
                    isnull(b3.MATL_TYPE, '') as IN_MATL_TYPE,
                    isnull(k.IN_CURR_CD, '') as IN_CURR_CD,
                    isnull(k.PAY_DATE, '') as IN_PAY_DATE,
                    isnull(left(k.IN_DATETIME, 8), '') as IN_DATETIME2,
                    sum(k.IN_QTY + k.lc_qty) as STSIN_QTY,
                    sum((k.IN_QTY + k.lc_qty) * k.IN_PRICE) as STSIN_AMT,
                    sum((k.IN_QTY + k.lc_qty) * b3.WEIGHT) as S_WEIGHT
                FROM
                    ksv_stock_in k
                    left join ksv_pu_mst2 a1 on k.pu_cd = a1.pu_cd
                    left join ksv_stock_in_mst a4 on k.stsin_cd = a4.stsin_cd,
                    kcd_vendor b1,
                    kcd_matl_mst b3
                where
                    k.matl_cd = b3.matl_cd
                    and b3.vendor_cd = b1.vendor_cd
                    and a1.reg_user like '%${args.data.REG_USER}%'
                    and a1.buyer_cd like '%${args.data.BUYER_CD}%'
                    and a1.pu_cd like '%${args.data.PU_CD}%'
                    and a1.bill_to like '%${args.data.BILL_TO}%' ${inPoSql}
                    -- and   a1.po_cd2 like '%${args.data.PO_CD}%'
                    and (b1.vendor_type like '%${args.data.VENDOR_TYPE}%')
                    and (
                        b1.vendor_cd like '%${args.data.VENDOR_CD}%'
                        or b1.vendor_name like '%${args.data.VENDOR_CD}%'
                    ) ${sqlExFactory} ${sqlPayDate}
                group by
                    left(k.IN_DATETIME, 8),
                    k.PO_CD,
                    b1.VENDOR_CD,
                    isnull(k.STSIN_CD, ''),
                    isnull(k.PU_CD, ''),
                    isnull(k.REG_USER, ''),
                    left(k.ORDER_CD, 2),
                    b1.VENDOR_CD,
                    b1.VENDOR_NAME,
                    isnull(a1.MATL_TYPE, ''),
                    isnull(a1.TRADE_TERM, ''),
                    isnull(a1.BILL_TO, ''),
                    isnull(a1.CURR_CD, ''),
                    isnull(a1.EXP_DELIVERY_DATE, ''),
                    isnull(a4.PAY_DATE, ''),
                    isnull(left(a4.IN_DATETIME, 8), ''),
                    isnull(a4.PAY_TERM, '1'),
                    isnull(a4.OVERSHORT, '0'),
                    isnull(b3.MATL_TYPE, ''),
                    isnull(k.IN_CURR_CD, ''),
                    isnull(k.PAY_DATE, ''),
                    isnull(left(k.IN_DATETIME, 8), '')
                order by
                    k.pu_cd,
                    b1.vendor_cd,
                    k.po_cd
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tOne = { ...tRet[tIdx] };

                tOne.LEADER_CONFIRM = '';
                tOne.STSIN_TYPE = 'FULL-IN';
                var sql0 = `
                    select
                        isnull(LEADER_CONFIRM, '') as LEADER_CONFIRM,
                        isnull(STSIN_TYPE, '') as STSIN_TYPE
                    from
                        ksv_stock_mem2_stsin
                    where
                        stsin_cd = '${tOne.STSIN_CD}'
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                if (tRet0.length > 0) {
                    tOne.LEADER_CONFIRM = tRet0[0].LEADER_CONFIRM;
                    tOne.STSIN_TYPE = tRet0[0].STSIN_TYPE;
                }

                tOne.PAY_CONDITION = '';
                var sql0 = `
                    select
                        a.PAY_TYPE,
                        isnull(b.CD_NAME, '') as PAY_CONDITION
                    from
                        ksv_stock_in_mst a,
                        kcd_code b
                    where
                        a.stsin_cd = '${tOne.STSIN_CD}'
                        and a.pay_type = b.cd_code
                        and b.cd_group = 'PAY_TYPE'
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                if (tRet0.length > 0) {
                    tOne.PAY_CONDITION = tRet0[0].PAY_CONDITION;
                }

                tOne.MOQ_AMT = '0';
                tOne.SURCHARGE_AMT = '0';
                var sql0 = `
                    select
                        po_seq,
                        sum(tot_qty) as tot_qty,
                        sum(tot_qty * in_price) as tot_amt
                    from
                        ksv_stock_in
                    where
                        po_cd = '${tOne.PO_CD}'
                        and vendor_cd = '${tOne.VENDOR_CD}'
                    group by
                        po_seq
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));

                tOne.OVERSHORT_NAME = '';
                tOne.OVER_QTY = '';
                tOne.PO_QTY = '';
                tOne.PO_AMT = '';
                if (tRet0.length > 0) {
                    var tPoQty = 0;
                    var tPoAmt = 0;
                    tRet0.forEach((col, i) => {
                        if (parseInt(col.po_seq) === 99)
                            tOne.MOQ_AMT = col.tot_amt;
                        else if (parseInt(col.po_seq) === 98)
                            tOne.OVER_QTY = col.tot_qty;
                        else {
                            tPoQty += col.tot_qty;
                            tPoAmt += col.tot_amt;
                        }
                    });
                    tOne.PO_QTY = String(tPoQty);
                    tOne.PO_AMT = String(tPoAmt);
                }
                var tOverRate =
                    (Math.abs(parseFloat(tOne.OVER_QTY)) /
                        parseFloat(tOne.PO_QTY)) *
                    100.0;
                if (tOverRate > parseFloat(tOne.OVERSHORT))
                    tOne.OVERSHORT_NAME = 'Out Of Tol';
                else if (parseFloat(tOne.OVER_QTY) > 0)
                    tOne.OVERSHORT_NAME = 'Over';
                else if (parseFloat(tOne.OVER_QTY) < 0)
                    tOne.OVERSHORT_NAME = 'Short';

                var sql0 = `
                    select
                        *
                    from
                        ksv_cost_mst
                    where
                        pu_cd = '${tOne.PU_CD}'
                        and
                    type = 'STS_IN'
                    and type2 in ('MOQ', 'Surcharge')
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                tOne.MOQ_CONFIRM = '';
                tOne.SURCHARGE_CONFIRM = '';
                tRet0.forEach((col, i) => {
                    if (col.TYPE2 === 'MOQ')
                        tOne.MOQ_CONFIRM = col.CONFIRM_USER;
                    if (col.TYPE2 === 'Surcharge')
                        tOne.SURCHARGE_CONFIRM = col.CONFIRM_USER;
                });

                /*
           var sql2 = `
               select
                   sum(PO_QTY2) as PO_QTY,
                   sum(PO_QTY2 * PO_PRICE) as PO_AMT,
                   sum(STOCK_QTY * PO_PRICE) as STOCK_AMT
               from
                   ksv_stock_mem2
               where
                   (
                       stsin_cd = '${tOne.STSIN_CD}'
                       or stsin_array like '%${tOne.STSIN_CD}%'
                   )
           `;
           var tRet2  =  await prisma.$queryRaw(Prisma.raw(sql2));
           tOne.PO_QTY = '0';
           tOne.PO_AMT = '0';
           tOne.STOCK_AMT = '0';
           if (tRet2.length > 0) {
                tOne.PO_QTY = String(tRet2[0].PO_QTY);
                tOne.PO_AMT = String(tRet2[0].PO_AMT);
                tOne.STOCK_AMT = String(tRet2[0].STOCK_AMT);
           }
           */

                if (tOne.MATL_TYPE === '') tOne.MATL_TYPE = tOne.IN_MATL_TYPE;
                if (tOne.CURR_CD === '') tOne.CURR_CD = tOne.IN_CURR_CD;
                if (tOne.PAY_DATE === '') tOne.PAY_DATE = tOne.IN_PAY_DATE;
                if (tOne.IN_DATETIME === '')
                    tOne.IN_DATETIME = tOne.IN_DATETIME2;

                tArray.push(tOne);
            }

            var tArray1 = [];
            var workObj = {};
            tArray.forEach((col, i) => {
                if (i === 0) workObj = { ...col };
                else {
                    if (col.VENDOR_CD !== workObj.VENDOR_CD) {
                        tArray1.push(workObj);
                        workObj = { ...col };
                    } else {
                        if (col.IN_DATETIME !== workObj.IN_DATETIME) {
                            tArray1.push(workObj);
                            workObj = { ...col };
                        } else {
                            workObj.PO_CD += `/${col.PO_CD}`;
                            workObj.STSIN_CD += `/${col.STSIN_CD}`;
                            workObj.PO_AMT = String(
                                parseFloat(workObj.PO_AMT) +
                                    parseFloat(col.PO_AMT),
                            );
                            workObj.PO_QTY = String(
                                parseFloat(workObj.PO_QTY) +
                                    parseFloat(col.PO_QTY),
                            );
                            workObj.STOCK_AMT = String(
                                parseFloat(workObj.STOCK_AMT) +
                                    parseFloat(col.STOCK_AMT),
                            );
                            workObj.STSIN_AMT = String(
                                parseFloat(workObj.STSIN_AMT) +
                                    parseFloat(col.STSIN_AMT),
                            );
                            workObj.STSIN_QTY = String(
                                parseFloat(workObj.STSIN_QTY) +
                                    parseFloat(col.STSIN_QTY),
                            );
                            workObj.MOQ_AMT = String(
                                parseFloat(workObj.MOQ_AMT) +
                                    parseFloat(col.MOQ_AMT),
                            );
                            workObj.S_WEIGHT = String(
                                parseFloat(workObj.S_WEIGHT) +
                                    parseFloat(col.S_WEIGHT),
                            );
                        }
                    }
                }
            });
            tArray1.push(workObj);

            return tArray1;
        },
        mgrQueryS043001_4_2_bak3: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);

            var tSQL = '';

            var sqlExFactory = '';
            if (!args.data.S_EX_FACTORY && !args.data.E_EX_FACTORY);
            else {
                var sExFactory = args.data.S_EX_FACTORY;
                if (sExFactory === '')
                    sExFactory = `${tRetDate.substring(0, 6)}01`;
                var eExFactory = args.data.E_EX_FACTORY;
                if (eExFactory === '') eExFactory = `99999999`;
                // tSQL += `and   a1.exp_delivery_date between '${sExFactory}' and '${eExFactory}' `;
                sqlExFactory = `and   left(k1.in_datetime, 8) between '${sExFactory}' and '${eExFactory}' `;
            }

            var sqlPayDate = '';
            if (!args.data.S_PAY_DATE && !args.data.E_PAY_DATE);
            else {
                var sPayDate = args.data.S_PAY_DATE;
                if (sPayDate === '') sPayDate = `${tRetDate.substring(0, 6)}01`;
                var ePayDate = args.data.E_PAY_DATE;
                if (ePayDate === '') ePayDate = `99999999`;
                //tSQL += `and   a1.pay_date between '${sPayDate}' and '${ePayDate}' `;
                sqlPayDate = `and   a1.pay_date between '${sPayDate}' and '${ePayDate}' `;
            }

            if (args.data.PO_CD.length >= 9) tSQL = '';
            if (args.data.PU_CD.length >= 0) tSQL = '';

            var inPoSql = '';
            /*
       var tCols = args.data.PO_CD.split(',');
       var tIdx = 0;
       tCols.forEach((col0, i) => {
           var col = col0.trim();
           if (col !== '') {
               if (inPoSql === '') inPoSql = `'${col}'`;
               else  inPoSql += `,'${col}'`;
               tIdx += 1;
           }
       });
       if (inPoSql !== '') inPoSql = `and   k1.po_cd in (${inPoSql}) `;
       */
            var tCols = args.data.PO_CD.split(',');
            var tIdx = 0;
            tCols.forEach((col0, i) => {
                var col = col0.trim();
                if (col !== '') {
                    if (inPoSql === '') inPoSql = ` a1.po_cd2 like '%${col}%' `;
                    else inPoSql += ` or a1.po_cd2 like '%{col}%' `;
                }
            });
            if (inPoSql !== '') inPoSql = ` and (${inPoSql}) `;

            let sqlStr = `
                select
                    k3.VENDOR_CD,
                    k3.VENDOR_NAME,
                    k1.PU_CD,
                    k1.MATL_CD,
                    k2.MATL_NAME,
                    k2.COLOR,
                    k2.SPEC,
                    left(k1.IN_DATETIME, 8) as IN_DATETIME,
                    k1.REG_USER,
                    left(k1.ORDER_CD, 2) as BUYER_CD,
                    isnull(a1.MATL_TYPE, '') as MATL_TYPE,
                    isnull(a1.TRADE_TERM, '') as TRADE_TERM,
                    isnull(a1.BILL_TO, '') as BILL_TO,
                    isnull(a1.CURR_CD, '') as CURR_CD,
                    isnull(a1.EXP_DELIVERY_DATE, '') as EX_FACTORY,
                    isnull(a4.PAY_DATE, '') as PAY_DATE,
                    isnull(a4.PAY_TERM, '1') as PAY_TERM,
                    '' as PAY_CONDITION,
                    isnull(a4.OVERSHORT, '0') as OVERSHORT,
                    isnull(k2.MATL_TYPE, '') as IN_MATL_TYPE,
                    isnull(k1.IN_CURR_CD, '') as IN_CURR_CD,
                    isnull(k1.PAY_DATE, '') as IN_PAY_DATE,
                    isnull(k1.PAY_REPORT, '') as PAY_REPORT,
                    isnull(k1.LC_BILL_NO, '') as LC_BILL_NO,
                    k1.STSIN_CD,
                    -- sum((k1.in_qty+k1.lc_qty)) as STSIN_QTY ,
                    sum((k1.in_qty)) as STSIN_QTY,
                    sum((k1.lc_qty)) as LC_QTY,
                    sum((k1.in_qty) * k1.IN_PRICE) as STSIN_AMT,
                    sum((k1.lc_qty) * k1.IN_PRICE) as LC_AMT,
                    sum((k1.in_qty + k1.lc_qty) * k2.WEIGHT) as S_WEIGHT
                from
                    ksv_stock_in k1
                    left join ksv_stock_in_mst a4 on k1.stsin_cd = a4.stsin_cd,
                    kcd_matl_mst k2,
                    kcd_vendor k3,
                    ksv_pu_mst2 a1
                where
                    1 = 1 ${sqlExFactory}
                    and k1.matl_cd = k2.MATL_CD
                    and k2.vendor_cd = k3.vendor_cd
                    and k3.vendor_name like '%${args.data.VENDOR_CD}%'
                    and k1.pu_cd like '%${args.data.PU_CD}%'
                    and k3.vendor_type like '%${args.data.VENDOR_TYPE}%'
                    and a1.pu_cd = k1.pu_cd
                    and k1.in_qty > 0 ${inPoSql}
                group by
                    k3.VENDOR_CD,
                    k3.VENDOR_NAME,
                    k1.PU_CD,
                    k1.MATL_CD,
                    k2.MATL_NAME,
                    k2.COLOR,
                    k2.SPEC,
                    left(k1.IN_DATETIME, 8),
                    k1.REG_USER,
                    left(k1.ORDER_CD, 2),
                    isnull(a1.MATL_TYPE, ''),
                    isnull(a1.TRADE_TERM, ''),
                    isnull(a1.BILL_TO, ''),
                    isnull(a1.CURR_CD, ''),
                    isnull(a1.EXP_DELIVERY_DATE, ''),
                    isnull(a4.PAY_DATE, ''),
                    isnull(a4.PAY_TERM, '1'),
                    isnull(a4.OVERSHORT, '0'),
                    isnull(k2.MATL_TYPE, ''),
                    isnull(k1.IN_CURR_CD, ''),
                    isnull(k1.PAY_DATE, ''),
                    k1.STSIN_CD,
                    k1.PAY_REPORT,
                    k1.LC_BILL_NO
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tArray = [];

            var tPuCds = [];
            tRet.forEach((col, i) => {
                var tCheck = 0;
                tPuCds.forEach((col1, i1) => {
                    if (col1 === col.PU_CD) tCheck = 1;
                });
                if (tCheck === 0) tPuCds.push(col.PU_CD);
            });
            /*
       console.log(`=============> Pu Cd:${tPuCds.length}`);
       console.log(`=============> Ret:${tRet.length}`);
       console.log(sqlStr);
       */

            var tPuArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tPuCds.length; tIdx++) {
                let sqlPuMst = `
                    select
                        *
                    from
                        ksv_pu_mst2
                    where
                        pu_cd = '${tPuCds[tIdx]}'
                `;
                var retPuMst = await prisma.$queryRaw(Prisma.raw(sqlPuMst));
                if (retPuMst.length <= 0) {
                    continue;
                }
                var objPuMst = { ...retPuMst[0] };

                var tArgObj = {};
                tArgObj.PU_CD = tPuCds[tIdx];
                tArgObj.IN_PO_CD = objPuMst.PO_CD2;
                tArgObj.IN_PO_SEQ = '';
                tArgObj.BUYER_CD = objPuMst.BUYER_CD;
                tArgObj.VENDOR_CD = objPuMst.VENDOR_CD;
                tArgObj.LAST = '1';

                var tFunc = new S043001_COMM();
                var tRetObj = await tFunc.queryS043001_LIST_2(
                    tArgObj,
                    contextValue,
                );
                console.log(`===> GEt PU DATA: ${tRetObj.length}`);
                tRetObj.forEach((col, i) => {
                    var tObj1 = { ...col };
                    tObj1.DATAS.forEach((col1, i1) => {
                        console.log(
                            `PU DATA: ${col1.PU_CD}/${col1.PO_CD}/${col1.MATL_CD}/${col1.PO_QTY}`,
                        );
                        tPuArray.push(col1);
                    });
                });
            }

            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tOne = { ...tRet[tIdx] };

                var tSelArray = [];
                var tPoQty = 0;
                var tPoAmt = 0;
                var tMoqQty = 0;
                var tOverQty = 0;
                var tMoqAmt = 0;
                var tSurchargeAmt = 0;
                var tPoCd = '';
                tPuArray.forEach((col, i) => {
                    console.log(
                        `===> Comp: ${col.PU_CD},${col.MATL_CD}/${tOne.PU_CD},${tOne.MATL_CD}`,
                    );
                    if (
                        col.PU_CD === tOne.PU_CD &&
                        col.MATL_CD === tOne.MATL_CD
                    ) {
                        tSelArray.push(col);
                        tPoQty += parseFloat(col.PO_QTY);
                        tPoAmt +=
                            parseFloat(col.PO_QTY) * parseFloat(col.PO_PRICE);
                        tMoqQty += parseFloat(col.MOQ_QTY);
                        tMoqAmt +=
                            parseFloat(col.MOQ_QTY) * parseFloat(col.PO_PRICE);
                        tOverQty += parseFloat(col.OVER_QTY);
                        tSurchargeAmt += parseFloat(col.SURCHARGE_AMT);
                        if (tPoCd === '') tPoCd = `${col.PO_CD}`;
                        else tPoCd += `/${col.PO_CD}`;
                    }
                });
                console.log(`===> Comp Result: ${tPoCd}`);

                tOne.LEADER_CONFIRM = '';
                tOne.STSIN_TYPE = 'FULL-IN';
                var sql0 = `
                    select
                        isnull(LEADER_CONFIRM, '') as LEADER_CONFIRM,
                        isnull(STSIN_TYPE, '') as STSIN_TYPE
                    from
                        ksv_stock_mem2_stsin
                    where
                        stsin_cd = '${tOne.STSIN_CD}'
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                if (tRet0.length > 0) {
                    tOne.LEADER_CONFIRM = tRet0[0].LEADER_CONFIRM;
                    tOne.STSIN_TYPE = tRet0[0].STSIN_TYPE;
                }

                tOne.PAY_CONDITION = '';
                var sql0 = `
                    select
                        a.PAY_TYPE,
                        isnull(b.CD_NAME, '') as PAY_CONDITION
                    from
                        ksv_stock_in_mst a,
                        kcd_code b
                    where
                        a.stsin_cd = '${tOne.STSIN_CD}'
                        and a.pay_type = b.cd_code
                        and b.cd_group = 'PAY_TYPE'
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                if (tRet0.length > 0) {
                    tOne.PAY_CONDITION = tRet0[0].PAY_CONDITION;
                }

                tOne.MOQ_AMT = String(tMoqAmt);
                tOne.SURCHARGE_AMT = String(tSurchargeAmt);
                tOne.OVERSHORT_NAME = '';
                tOne.OVER_QTY = String(tOverQty);
                tOne.PO_QTY = String(tPoQty);
                tOne.PO_AMT = String(tPoAmt);
                tOne.PO_CD = tPoCd;

                var tOverRate =
                    (Math.abs(parseFloat(tOne.OVER_QTY)) /
                        parseFloat(tOne.PO_QTY)) *
                    100.0;
                if (tOverRate > parseFloat(tOne.OVERSHORT))
                    tOne.OVERSHORT_NAME = 'Out Of Tol';
                else if (parseFloat(tOne.OVER_QTY) > 0)
                    tOne.OVERSHORT_NAME = 'Over';
                else if (parseFloat(tOne.OVER_QTY) < 0)
                    tOne.OVERSHORT_NAME = 'Short';

                var sql0 = `
                    select
                        *
                    from
                        ksv_cost_mst
                    where
                        pu_cd = '${tOne.PU_CD}'
                        and
                    type = 'STS_IN'
                    and type2 in ('MOQ', 'Surcharge')
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                tOne.MOQ_CONFIRM = '';
                tOne.SURCHARGE_CONFIRM = '';
                tRet0.forEach((col, i) => {
                    if (col.TYPE2 === 'MOQ')
                        tOne.MOQ_CONFIRM = col.CONFIRM_USER;
                    if (col.TYPE2 === 'Surcharge')
                        tOne.SURCHARGE_CONFIRM = col.CONFIRM_USER;
                });

                if (tOne.MATL_TYPE === '') tOne.MATL_TYPE = tOne.IN_MATL_TYPE;
                if (tOne.CURR_CD === '') tOne.CURR_CD = tOne.IN_CURR_CD;
                if (tOne.PAY_DATE === '') tOne.PAY_DATE = tOne.IN_PAY_DATE;
                if (tOne.IN_DATETIME === '')
                    tOne.IN_DATETIME = tOne.IN_DATETIME2;

                if (tOne.LC_BILL_NO !== '') {
                    sql0 = `
                        select
                            sum(LC_QTY) as LC_QTY
                        from
                            ksv_stock_in
                        where
                            pay_report = '${tOne.LC_BILL_NO}'
                            and pu_cd = '${tOne.PU_CD}'
                            and matl_cd = '${tOne.MATL_CD}'
                    `;
                    tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                    if (tRet0.length > 0) {
                        tOne.LC_QTY = tRet0[0].LC_QTY;
                    }
                }

                tArray.push(tOne);
                if (tArray.length > 500) break;
            }

            /*
       var tArray1 = []; 
       var workObj = {};
       tArray.forEach((col, i) => {
           if (i === 0) workObj = { ...col };
           else {
               if (col.VENDOR_CD !== workObj.VENDOR_CD) {
                   tArray1.push(workObj);
                   workObj = { ...col };
               } else {
                   if (col.IN_DATETIME !== workObj.IN_DATETIME) {
                      tArray1.push(workObj);
                      workObj = { ...col };
                   } else {
                      workObj.PO_CD += `/${col.PO_CD}`;
                      workObj.STSIN_CD += `/${col.STSIN_CD}`;
                      workObj.PO_AMT = String(parseFloat(workObj.PO_AMT)+parseFloat(col.PO_AMT)); 
                      workObj.PO_QTY = String(parseFloat(workObj.PO_QTY)+parseFloat(col.PO_QTY)); 
                      workObj.STOCK_AMT = String(parseFloat(workObj.STOCK_AMT)+parseFloat(col.STOCK_AMT)); 
                      workObj.STSIN_AMT = String(parseFloat(workObj.STSIN_AMT)+parseFloat(col.STSIN_AMT)); 
                      workObj.STSIN_QTY = String(parseFloat(workObj.STSIN_QTY)+parseFloat(col.STSIN_QTY)); 
                      workObj.MOQ_AMT = String(parseFloat(workObj.MOQ_AMT)+parseFloat(col.MOQ_AMT)); 
                      workObj.S_WEIGHT = String(parseFloat(workObj.S_WEIGHT)+parseFloat(col.S_WEIGHT)); 
                   }
               }
           }
       });
       tArray1.push(workObj);
       */

            console.log(sqlStr);
            return tArray;
        },
    },
};

export default moduleQuery_S043001_4_1;
