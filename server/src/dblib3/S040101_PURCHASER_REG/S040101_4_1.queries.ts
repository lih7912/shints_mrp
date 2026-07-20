import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

//
class S040101_COMM {
    async queryS040101_4_1(argData, contextValue) {
        var tSQL = '';
        if (argData.STYLE_CD !== '') {
            tSQL += `AND STYLE_NAME like '%${argData.STYLE_CD}%' `;
        }

        var sqlPoCds = '';
        var poArray = [];
        if (!argData.IN_PO_CD) {
            var tPoCds = argData.PO_CD.split('/');
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
        if (!argData.PU_SEQ || argData.PU_SEQ === 'W') {
            poArray.forEach((col, i) => {
                if (i === 0) sqlPo = `( A1.PO_CD = '${col}')  `;
                else sqlPo += ` or ( A1.PO_CD = '${col}') `;
            });
        } else {
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
        }

        var tPuCd = '';
        if (typeof argData.PU_CD2 !== 'undefined') {
            tPuCd = argData.PU_CD2;
        }

        var tInput = { ...argData };
        if (typeof tInput.PU_CD2 === 'undefined') tInput.PU_CD2 = '';
        if (typeof tInput.MATL_TYPE === 'undefined') tInput.MATL_TYPE = '';

        var sqlCurrCd = '';
        var retPuMst = [];
        if (tPuCd)  {   
            let sqlPuMst = `
                select * from ksv_pu_mst2 where pu_cd = '${tPuCd}'
            `;  
            retPuMst = await prisma.$queryRaw(Prisma.raw(sqlPuMst));
            if (retPuMst.length > 0) {
                sqlCurrCd = ` and A4.CURR_CD = '${retPuMst[0].CURR_CD}' `;
            }
            // 임시로 막음. 20260506
            sqlCurrCd = '';
        } else {
            if (argData.CURR_CD) sqlCurrCd = ` and A4.CURR_CD = '${argData.CURR_CD}' `;
        }

        var sqlMatlCd = [];
        if (!argData.PU_CD) {
            sqlMatlCd = ` AND A3.VENDOR_CD = '${argData.VENDOR_CD}' `;
        } else {
            let sqlMatl = `
                select distinct matl_cd from ksv_stock_mem2 where pu_cd = '${argData.PU_CD}'
            `;
            var retMatl = await prisma.$queryRaw(Prisma.raw(sqlMatl));
            var inSql = '';
            retMatl.forEach((col, i) => {
                if (inSql === '') inSql = `'${col.matl_cd}'`;
                else inSql += `,'${col.matl_cd}'`;
            });
            // 26/05/11 일 임시로 막음
            // sqlMatlCd = ` AND (A1.MATL_CD in (${inSql}) or A3.VENDOR_CD = '${argData.VENDOR_CD}') `;
            sqlMatlCd = ` AND (A1.MATL_CD in (${inSql}) or (A3.VENDOR_CD = '${argData.VENDOR_CD}' and A4.CURR_CD = '${retPuMst[0].CURR_CD}'))  `;
        }

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
                        -- A5.FACTORY_CD ,
                        A6.FACTORY_CD,
                        A1.USE_PO_TYPE,
                        A1.DIFF_PO_TYPE,
                        A4.MATL_PRICE,
                        isnull(max(A1.REG_DATETIME), '') as REG_DATETIME,
                        isnull(max(A1.PO_SEQ), 1) as PO_SEQ,
                        isnull(sum(A1.USE_QTY), 0) as USE_QTY,
                        isnull(sum(A1.PO_QTY), 0) as PO_QTY
                    FROM
                        KSV_PO_MRP A1
                        left join KSV_ORDER_MST A5 on A5.ORDER_CD = A1.ORDER_CD,
                        KCD_MATL_MST A3,
                        KCD_MATL_MEM A4,
                        KSV_PO_MST A6
                    WHERE
                        1 = 1 ${sqlPo0}
                        AND A1.USE_PO_TYPE = '1'
                        AND (${sqlPo})
                        AND A1.PO_CD = A6.PO_CD
                        AND A1.PO_SEQ = A6.PO_SEQ
                        -- AND   A6.PO_STATUS = '4'
                        AND LEFT(A1.ORDER_CD, 2) = '${argData.BUYER_CD}'
                        AND A1.MATL_CD = A3.MATL_CD
                        ${sqlMatlCd}
                        -- AND A3.VENDOR_CD = '${argData.VENDOR_CD}'
                        AND A1.MATL_CD = A4.MATL_CD
                        AND A4.MATL_SEQ = (
                            select
                                max(matl_seq)
                            from
                                kcd_matl_mem
                            where
                                matl_cd = a1.matl_cd
                        )
                        ${sqlCurrCd}
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
                        A6.FACTORY_CD,
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
                // tWorkObj.PO_PRICE = tWorkObj.MASTER_PRICE;
                tWorkObj.PO_PRICE = tWorkObj.MATL_PRICE;
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
                // tWorkObj.C_PO_PRICE = tWorkObj.MASTER_PRICE;
                tWorkObj.C_PO_PRICE = tWorkObj.MATL_PRICE;
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
                tWorkObj.OVER_QTY += -1 * parseFloat(tOne.PO_QTY);
                // tWorkObj.PO_QTY += (-1) * parseFloat(tOne.PO_QTY);
                // tLeftOver += parseFloat(tOne.USE_QTY);
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

        if (tRet.length <= 0);
        else {
            tWorkObj.LEFTOVER_QTY = String(Math.abs(tLeftOver));
            tMatlArray.push(tWorkObj);
        }

        console.log('====================================> tMatlArray');
        console.log(
            '++++ po/po_seq/vendor/matl/matl price/mrp/stock/po/leftover',
        );
        var printArray = [];
        tMatlArray.forEach((col, i) => {
            var tStr = `${col.PO_CD}`;
            tStr += `,${col.PO_SEQ} (`;
            tStr += `,${col.VENDOR_CD}`;
            tStr += `,${col.MATL_CD}`;
            tStr += `,${col.MATL_PRICE}`;
            tStr += `,${col.MRP_QTY}`;
            tStr += `,${col.STOCK_QTY}`;
            tStr += `,${col.PO_QTY}`;
            tStr += `,${col.LEFTOVER_QTY}`;
            tStr += `)`;
            console.log(tStr);
            printArray.push(tStr);
        });

        console.log(` ====>(MatlArray.length) ${tMatlArray.length}`);

        // N+1 문제 해결: 모든 STOCK 데이터를 한 번에 조회
        var stockDataMap = {};
        if (tMatlArray.length > 0) {
            let stockSql = `
                select
                    A1.PO_CD,
                    A1.PO_MATL_CD as MATL_CD,
                    A3.VENDOR_CD,
                    A1.USE_PO_TYPE,
                    A1.DIFF_PO_TYPE,
                    A4.MATL_PRICE,
                    isnull(sum(CASE WHEN A1.PO_MATL_CD IS NOT NULL THEN 1 ELSE 0 END), 0) as STOCK_DATA_EXISTS,
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
                    AND (${sqlPo})
                    AND A1.PO_CD = A6.PO_CD
                    AND A1.PO_SEQ = A6.PO_SEQ
                    AND A1.ORDER_CD = A5.ORDER_CD
                    AND LEFT(A1.ORDER_CD, 2) = '${argData.BUYER_CD}'
                    AND A1.PO_MATL_CD = A3.MATL_CD
                    AND A3.VENDOR_CD = '${argData.VENDOR_CD}'
                    AND A1.PO_MATL_CD = A4.MATL_CD
                    AND A4.MATL_SEQ = (
                        select max(matl_seq) from kcd_matl_mem where matl_cd = A1.po_matl_cd
                    )
            `;
            
            // 조건 추가: tMatlArray의 모든 항목에 대한 데이터
            let conditions = [];
            tMatlArray.forEach((item) => {
                conditions.push(`(A1.PO_CD = '${item.PO_CD}' AND A1.PO_MATL_CD = '${item.MATL_CD}')`);
            });
            
            if (conditions.length > 0) {
                stockSql += ` AND (${conditions.join(' OR ')})`;
            }
            
            stockSql += `
                group by
                    A1.PO_CD,
                    A1.PO_MATL_CD,
                    A3.VENDOR_CD,
                    A1.USE_PO_TYPE,
                    A1.DIFF_PO_TYPE,
                    A4.MATL_PRICE
            `;

            var stockResults = await prisma.$queryRaw(Prisma.raw(stockSql));
            stockResults.forEach((item) => {
                const key = `${item.PO_CD}-${item.MATL_CD}`;
                stockDataMap[key] = item;
            });
        }

        // N+1 문제 해결: 모든 FOC, OVER, MOQ 데이터를 한 번에 조회
        var focDataMap = {};
        if (tMatlArray.length > 0) {
            let focSql = `
                select
                    po_cd,
                    matl_cd,
                    po_seq,
                    isnull(sum(use_qty), 0) as use_qty
                from
                    ksv_po_mrp
                where
                    po_seq in (97, 98, 99)
            `;
            
            let focConditions = [];
            tMatlArray.forEach((item) => {
                focConditions.push(`(po_cd = '${item.PO_CD}' AND matl_cd = '${item.MATL_CD}')`);
            });
            
            if (focConditions.length > 0) {
                focSql += ` AND (${focConditions.join(' OR ')})`;
            }
            
            focSql += ` group by po_cd, matl_cd, po_seq`;

            var focResults = await prisma.$queryRaw(Prisma.raw(focSql));
            focResults.forEach((item) => {
                const key = `${item.po_cd}-${item.matl_cd}`;
                if (!focDataMap[key]) {
                    focDataMap[key] = { FOC_QTY: 0, OVER_QTY: 0, MOQ_QTY: 0 };
                }
                if (item.po_seq === 97) focDataMap[key].FOC_QTY = parseFloat(item.use_qty);
                if (item.po_seq === 98) focDataMap[key].OVER_QTY += parseFloat(item.use_qty);
                if (item.po_seq === 99) focDataMap[key].MOQ_QTY = parseFloat(item.use_qty);
            });
        }

        // N+1 문제 해결: ksv_stock_mem 데이터를 한 번에 조회
        var stockMemDataMap = {};
        if (tMatlArray.length > 0) {
            let stockMemSql = `
                select
                    a.po_cd,
                    a.matl_cd,
                    a.po_seq,
                    a.po_qty,
                    a.in_qty
                from
                    ksv_stock_mem a,
                    kcd_matl_mst b
                where
                    a.matl_cd = b.matl_cd
                    and b.vendor_cd = '${argData.VENDOR_CD}'
            `;
            
            let stockMemConditions = [];
            tMatlArray.forEach((item) => {
                stockMemConditions.push(`(a.po_cd = '${item.PO_CD}' AND a.matl_cd = '${item.MATL_CD}')`);
            });
            
            if (stockMemConditions.length > 0) {
                stockMemSql += ` AND (${stockMemConditions.join(' OR ')})`;
            }

            var stockMemResults = await prisma.$queryRaw(Prisma.raw(stockMemSql));
            stockMemResults.forEach((item) => {
                const key = `${item.po_cd}-${item.matl_cd}`;
                if (!stockMemDataMap[key]) {
                    stockMemDataMap[key] = [];
                }
                stockMemDataMap[key].push(item);
            });
        }

        var tMatlArray1 = [];
        for (tIdx = 0; tIdx < tMatlArray.length; tIdx++) {
            var tOne = { ...tMatlArray[tIdx] };
            const stockKey = `${tOne.PO_CD}-${tOne.MATL_CD}`;
            const tRet0 = stockDataMap[stockKey] ? [stockDataMap[stockKey]] : [];
            tRet0.forEach((col, i) => {
                if (col.USE_PO_TYPE === '2' && col.DIFF_PO_TYPE === '0') {
                    // Stock Use
                    tOne.STOCK_QTY += parseFloat(col.USE_QTY);
                }
                if (col.USE_PO_TYPE === '2' && col.DIFF_PO_TYPE === '5') {
                    // Stock Use  - cancel
                    // Stock Cancel: Order의 Cancel에 의한 Stock Cancel수량복원 없음.  order cancel과 동일
                    // MRP Qty을 마이너스 : 20251205
                    /*
                  if (parseFloat(tOne.PO_QTY) <= 0) {
                      tOne.MRP_QTY += parseFloat(col.USE_QTY);
                  }  else {
                      tOne.PO_QTY += (-1) * parseFloat(col.PO_QTY);
                  }
                  */
                    // tOne.PO_QTY += (-1) * parseFloat(col.PO_QTY);
                    tOne.MRP_QTY += parseFloat(col.PO_QTY);
                    tOne.STOCK_QTY += parseFloat(col.USE_QTY);
                    // tOne.MRP_QTY += (-1) * parseFloat(col.USE_QTY);
                }
                if (parseFloat(tOne.PO_SEQ) < parseFloat(col.PO_SEQ))
                    tOne.PO_SEQ = col.PO_SEQ;
            });

            // FOC - 메모리에서 조회 (N+1 문제 해결)
            const focKey = `${tOne.PO_CD}-${tOne.MATL_CD}`;
            const focData = focDataMap[focKey];
            if (focData) {
                tOne.FOC_QTY = focData.FOC_QTY;
                tOne.OVER_QTY = focData.OVER_QTY;
                tOne.MOQ_QTY = focData.MOQ_QTY;
            } else {
                tOne.FOC_QTY = 0;
                tOne.OVER_QTY = 0;
                tOne.MOQ_QTY = 0;
            }

            /* Start 더하지 않는 Foc, Over, Moq을 찾음. 자기자신에서 발생한거를 자기자신에 Stock 적용한 경우 */
            // 일단 임시로 막음. 2026/03/24.  자기자신을 stock에 적용한 경우도 별도 처리안함
            /*
          var sql200 = `
              select
                  b.po_seq,
                  sum(a.po_qty) as cnt
              from
                  ksv_po_mrp a,
                  (
                      select distinct
                          po_seq,
                          stock_idx
                      from
                          ksv_po_mrp
                      where
                          po_cd = '${tOne.PO_CD}'
                          and matl_cd = '${tOne.MATL_CD}'
                          and po_seq in (97, 98, 99)
                  ) b
              where
                  a.po_cd = '${tOne.PO_CD}'
                  and a.matl_cd = '${tOne.MATL_CD}'
                  and a.po_seq not in (97, 98, 99)
                  and a.use_po_type = '2'
                  and a.diff_po_type = '0'
                  and a.stock_idx in (
                      select distinct
                          stock_idx
                      from
                          ksv_po_mrp
                      where
                          po_cd = '${tOne.PO_CD}'
                          and matl_cd = '${tOne.MATL_CD}'
                          and po_seq in (97, 98, 99)
                  )
                  and a.stock_idx = b.stock_idx
              group by
                  b.po_seq
          `;
          var tRet200  =  await prisma.$queryRaw(Prisma.raw(sql200));
          if (tRet200.length > 0) {
                tRet200.forEach((col200, i200) => {
                     if (parseFloat(col200.po_seq) === 97) {
                         if (parseFloat(col200.cnt) > parseFloat(tOne.FOC_QTY)) {
                             tOne.OVER_QTY = parseFloat(tOne.OVER_QTY) + parseFloat(col200.cnt); 
                             tOne.FOC_QTY = '0';
                         } else {
                             tOne.OVER_QTY = parseFloat(tOne.OVER_QTY) + parseFloat(col200.cnt); 
                             tOne.FOC_QTY = parseFloat(tOne.FOC_QTY) - parseFloat(col200.cnt);
                         }
                     }
                });
          }
          */
            /* End : 더하지 않는 Foc, Over, Moq을 찾음. 자기자신에서 발생한거를 자기자신에 Stock 적용한 경우 */

            var sqlPoSeq1 = '';
            // 일단 더하지 않음 : 1113
            // Foc수량은 Stock으로 간주
            // if (parseFloat(tOne.FOC_QTY) >0) tOne.STOCK_QTY = parseFloat(tOne.STOCK_QTY) + parseFloat(tOne.FOC_QTY);

            if (parseFloat(tOne.OVER_QTY) > 0)
                tOne.PO_QTY =
                    parseFloat(tOne.PO_QTY) + parseFloat(tOne.OVER_QTY);
            if (parseFloat(tOne.MOQ_QTY) > 0)
                tOne.PO_QTY =
                    parseFloat(tOne.PO_QTY) + parseFloat(tOne.MOQ_QTY);

            /*
          if (!argData.LAST) {
                tOne.FOC_QTY = 0;
                tOne.OVER_QTY = 0;
                tOne.MOQ_QTY = 0;
                // sqlPoSeq1 = ` and a.po_seq <= ${argData.IN_PO_SEQ}`;
          } else {
                if (parseFloat(tOne.OVER_QTY) >0) tOne.PO_QTY = parseFloat(tOne.PO_QTY) + parseFloat(tOne.OVER_QTY);
                if (parseFloat(tOne.MOQ_QTY) >0) tOne.PO_QTY = parseFloat(tOne.PO_QTY) + parseFloat(tOne.MOQ_QTY);
          }
          */
            console.log(
                ` ====>(MatlArray Data, foc,over,moq) ${tOne.MATL_CD} /${tOne.FOC_QTY} / ${tOne.OVER_QTY} / ${tOne.MOQ_QTY}  `,
            );

            // N+1 문제 해결: ksv_stock_mem 데이터 배치 조회
            let tRet0_stock = [];
            if (tRet0.length > 0) {
                const stockMemKey = `${tOne.PO_CD}-${tOne.MATL_CD}`;
                if (stockMemDataMap && stockMemDataMap[stockMemKey]) {
                    tRet0_stock = stockMemDataMap[stockMemKey];
                }
            }
            tOne.STOCK_MEM_PO_QTY = '0';
            tOne.STOCK_MEM_IN_QTY = '0';
            var tSumPoQty = 0;
            var tSumInQty = 0;
            var tSumNotInQty = 0;
            tRet0_stock.forEach((col9, i9) => {
                if (
                    parseFloat(col9.po_qty) > 0 &&
                    parseFloat(col9.in_qty) > 0
                ) {
                    tSumPoQty += parseFloat(col9.po_qty);
                    tSumInQty += parseFloat(col9.in_qty);
                } else if (
                    parseFloat(col9.po_qty) > 0 &&
                    parseFloat(col9.in_qty) <= 0
                ) {
                    tSumPoQty += parseFloat(col9.po_qty);
                    tSumNotInQty += parseFloat(col9.po_qty);
                }
            });
            if (tRet0_stock.length > 0) {
                tOne.STOCK_MEM_PO_QTY = String(parseFloat(tSumPoQty));
                tOne.STOCK_MEM_IN_QTY = String(parseFloat(tSumInQty));
                tOne.STOCK_MEM_NOT_IN_QTY = String(parseFloat(tSumNotInQty));
            }

            /*
          if (parseFloat(tOne.LEFTOVER_QTY) > 0) {
              var tPoQty = parseFloat(tOne.PO_QTY) + parseFloat(tOne.LEFTOVER_QTY);
              tOne.PO_QTY = String(tPoQty);
          }
          */

            tMatlArray1.push(tOne);
            console.log(
                ` ====>(MatlArray Matl#, Po_Qty, Stock_mem_Po_Qty, Stock_mem_in_qty) ${tOne.MATL_CD} /${tOne.PO_QTY} / ${tOne.STOCK_MEM_PO_QTY} / ${tOne.STOCK_MEM_IN_QTY}  `,
            );
        }
        console.log(` ====>(MatlArray1.length) ${tMatlArray1.length}`);

        console.log('============================> tMatlArray1');
        console.log(
            '++++ po/po_seq/vendor/matl_price/matl#/mrp qty/stock qty/po qty/left_over/foc/moq/over/stockmem_po/stockmem_in/stockmem_not_in',
        );
        var printArray2 = [];
        tMatlArray1.forEach((col, i) => {
            var tStr = `${col.PO_CD}`;
            tStr += `,${col.PO_SEQ} (`;
            tStr += `,${col.VENDOR_CD}`;
            tStr += `,${col.MATL_PRICE}`;
            tStr += `,${col.MATL_CD}`;
            tStr += `,${col.MRP_QTY}`;
            tStr += `,${col.STOCK_QTY}`;
            tStr += `,${col.PO_QTY}`;
            tStr += `,${col.LEFTOVER_QTY}`;
            tStr += `,${col.FOC_QTY}`;
            tStr += `,${col.MOQ_QTY}`;
            tStr += `,${col.OVER_QTY}`;
            tStr += `,${col.STOCK_MEM_PO_QTY}`;
            tStr += `,${col.STOCK_MEM_IN_QTY}`;
            tStr += `,${col.STOCK_MEM_NOT_IN_QTY}`;
            tStr += `)`;
            console.log(tStr);
            printArray2.push(tStr);
        });

        // N+1 문제 해결: ksv_stock_mem2 데이터를 한 번에 조회
        var stockMem2DataMap = {};
        if (tMatlArray1.length > 0 && argData.PU_CD) {
            let stockMem2Sql = `
                select
                    a.PO_CD,
                    a.MATL_CD,
                    a.PU_CD,
                    isnull(a1.PU_CD, '') as PU_CD0,
                    isnull(b.VENDOR_CD, '') as VENDOR_CD,
                    isnull(a1.VENDOR_CD, '') as VENDOR_CD0,
                    isnull(a.STSIN_CD, '') as STSIN_CD,
                    a.PO_PRICE,
                    isnull(a.fullin_flag, '') as FULLIN_FLAG,
                    a.MASTER_PRICE,
                    a.SURCHARGE_PRICE,
                    a.SURCHARGE_AMT,
                    a.SURCHARGE_REMARK,
                    a.PO_QTY as MRP_QTY,
                    a.STOCK_QTY as STOCK_QTY,
                    a.PO_QTY2 as PO_QTY,
                    a.MOQ as MOQ_QTY,
                    a.LEFTOVER_QTY as OVER_QTY
                from
                    ksv_stock_mem2 a
                    left join ksv_pu_mst2 a1 on a1.pu_cd = a.pu_cd,
                    kcd_matl_mst b
                where
                    a.pu_cd = '${argData.PU_CD}'
                    and a.matl_cd = b.matl_cd
            `;
            
            let stockMem2Conditions = [];
            tMatlArray1.forEach((item) => {
                stockMem2Conditions.push(`(a.po_cd = '${item.PO_CD}' AND a.matl_cd = '${item.MATL_CD}')`);
            });
            
            if (stockMem2Conditions.length > 0) {
                stockMem2Sql += ` AND (${stockMem2Conditions.join(' OR ')})`;
            }
            
            stockMem2Sql += ` order by a.PO_CD, a.MATL_CD, a.STSIN_CD`;

            var stockMem2Results = await prisma.$queryRaw(Prisma.raw(stockMem2Sql));
            stockMem2Results.forEach((item) => {
                const key = `${item.PO_CD}-${item.MATL_CD}`;
                if (!stockMem2DataMap[key]) {
                    stockMem2DataMap[key] = [];
                }
                stockMem2DataMap[key].push(item);
            });
        }

        var tMatlArray2 = [];
        var tMatlArray2_End = [];
        for (tIdx = 0; tIdx < tMatlArray1.length; tIdx++) {
            var tOne = { ...tMatlArray1[tIdx] };

            const stockMem2Key = `${tOne.PO_CD}-${tOne.MATL_CD}`;
            var tRet0 = stockMem2DataMap[stockMem2Key] || [];

            var tEndMrpQty = 0;
            var tCurrMrpQty = 0;
            var tStsInCd = '';
            var tFullInFlag = '';
            tRet0.forEach((col, i) => {
                tCurrMrpQty += parseInt(col.MRP_QTY);
                if (col.STSIN_CD !== '') tStsInCd = col.STSIN_CD;
                if (col.FULLIN_FLAG !== '') tFullInFlag = col.FULLIN_FLAG;
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
                // kMasterPrice = col.MASTER_PRICE;
                kMasterPrice = tOne.MATL_PRICE;
                kMrpQty = col.MRP_QTY;
                kStockQty = col.STOCK_QTY;
                kPoQty = col.PO_QTY;
                kMoqQty = col.MOQ_QTY;
                kOverQty = col.OVER_QTY;
                kFocQty = 0;
                kSurchargeAmt = col.SURCHARGE_AMT;
                kSurchargePrice = col.SURCHARGE_PRICE;
                kSurchargeRemark = col.SURCHARGE_REMARK;

                console.log(`====>(MatlArray2 Step-1): ${argData.PU_CD} / ${col.PU_CD},${col.PU_CD} / ${col.VENDOR_CD},${col.VENDOR_CD0} `);
                if (col.PU_CD0 && col.PU_CD !== col.PU_CD0) {
                    console.log(`====>(MatlArray2 Step-2-1): ${argData.PU_CD} / ${col.PU_CD},${col.PU_CD} / ${col.VENDOR_CD},${col.VENDOR_CD0} => ${kPoQty} `);
                    kPuCd = '';
                } else if (col.VENDOR_CD0 && col.VENDOR_CD !== col.VENDOR_CD0) {
                    if (!argData.PU_CD) kPuCd = '';
                    else {
                        // 발주서에서 해당 Matl이 빠진경우 
                        kPuCd = argData.PU_CD;
                        kPoQty = 0;
                        tOne.PO_QTY = kPoQty;
                        /*
                        if (argData.PU_CD === col.PU_CD) kPuCd = argData.PU_CD;
                        else kPuCd = '';
                        */
                    } 
                    console.log(`====>(MatlArray2 Step-2-2): ${argData.PU_CD} / ${col.PU_CD},${col.PU_CD} / ${col.VENDOR_CD},${col.VENDOR_CD0} => ${kPoQty} `);
                } else {
                    console.log(`====>(MatlArray3 Step-2-3): ${argData.PU_CD} / ${col.PU_CD},${col.PU_CD} / ${col.VENDOR_CD},${col.VENDOR_CD0} => ${kPoQty} `);
                }

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

            /*
          if (tStsInCd !== '') tOne3.PU_STATUS = 'End';
          else  tOne3.PU_STATUS = '-';
          */

            /*
          if (parseFloat(tOne.STOCK_MEM_PO_QTY) > 0 && 
              (parseFloat(tOne.STOCK_MEM_PO_QTY) <= parseFloat(tOne.STOCK_MEM_IN_QTY))) { 
             if (parseFloat(tOne.STOCK_MEM_PO_QTY) > 0) tOne3.PU_STATUS = 'FullIn';
             else tOne3.PU_STATUS = '-';
          } else  {
             tOne3.PU_STATUS = '-';
          }
          */
            tOne3.PU_STATUS = '-';
            if (parseFloat(tOne.STOCK_MEM_IN_QTY) > 0) {
                tOne3.PU_STATUS = 'PartIn';
                if (parseFloat(tOne.STOCK_MEM_NOT_IN_QTY) <= 0) {
                    // tOne3.PU_STATUS = 'PartIn-F';
                    tOne3.PU_STATUS = 'PartIn';
                }
            }
            if (tFullInFlag === '1') tOne3.PU_STATUS = 'FullIn';
            /*
          if (parseFloat(tOne.STOCK_MEM_PO_QTY) > 0 && 
              (parseFloat(tOne.STOCK_MEM_PO_QTY) <= parseFloat(tOne.STOCK_MEM_IN_QTY))) { 
             if (parseFloat(tOne.STOCK_MEM_NOT_IN_QTY) <= 0) {
                 tOne3.PU_STATUS = 'PartIn';
                 if (tFullInFlag === '1') tOne3.PU_STATUS = 'FullIn';
             }
             else tOne3.PU_STATUS = '-';
          } else  {
             tOne3.PU_STATUS = '-';
          }
          */

            if (gVendorType === '4') {
                // tOne3.CURR_CD = 'USD';
                tOne3.PO_PRICE = '0';
            }
            tMatlArray2.push(tOne3);
        }

        var tDataArray = [];
        for (tIdx = 0; tIdx < tMatlArray2.length; tIdx++) {
            var tOne = { ...tMatlArray2[tIdx] };

            if (tOne.PU_CD === argData.PU_CD || !tOne.PU_CD) tDataArray.push(tOne);
        }

        var tArray2 = [];
        tDataArray.forEach((col, i) => {
            var tCheck = 0;
            tArray2.forEach((col1, i1) => {
                // if (col.MATL_CD === col1.MATL_CD &&  col.PU_STATUS === col1.PU_STATUS) {
                if (col.MATL_CD === col1.MATL_CD) {
                    var tObj2 = { ...col1 };
                    tObj2.MRP_QTY =
                        parseFloat(tObj2.MRP_QTY) + parseFloat(col.MRP_QTY);
                    tObj2.MRP_QTY2 =
                        parseFloat(tObj2.MRP_QTY2) + parseFloat(col.MRP_QTY2);
                    tObj2.STOCK_QTY =
                        parseFloat(tObj2.STOCK_QTY) + parseFloat(col.STOCK_QTY);
                    tObj2.FOC_QTY =
                        parseFloat(tObj2.FOC_QTY) + parseFloat(col.FOC_QTY);
                    tObj2.MOQ_QTY =
                        parseFloat(tObj2.MOQ_QTY) + parseFloat(col.MOQ_QTY);
                    tObj2.OVER_QTY =
                        parseFloat(tObj2.OVER_QTY) +
                        parseFloat(col.OVER_QTY) +
                        parseFloat(col.LEFTOVER_QTY);
                    tObj2.LEFTOVER_QTY = '0';
                    tObj2.PO_QTY =
                        parseFloat(tObj2.PO_QTY) + parseFloat(col.PO_QTY);
                    tObj2.DIFF_QTY =
                        parseFloat(tObj2.DIFF_QTY) + parseFloat(col.DIFF_QTY);
                    tObj2.PO_UPDATE_QTY =
                        parseFloat(tObj2.PO_UPDATE_QTY) +
                        parseFloat(col.PO_UPDATE_QTY);
                    // tObj2.SURCHARGE_AMT = parseFloat(tObj2.SURCHARGE_AMT) + parseFloat(col.SURCHARGE_AMT);
                    tObj2.SURCHARGE_AMT = parseFloat(tObj2.SURCHARGE_AMT);
                    tObj2.PO_CD = `${tObj2.PO_CD}/${col.PO_CD}`;
                    if (parseInt(tObj2.PO_SEQ) < parseInt(col.PO_SEQ))
                        tObj2.PO_SEQ = col.PO_SEQ;

                    var tObj1 = { ...col };
                    tObj1.OVER_QTY = tObj1.OVER_QTY + tObj1.LEFTOVER_QTY;
                    tObj2.DATAS.push(tObj1);
                    tArray2[i1] = { ...tObj2 };
                    tCheck = 1;
                }
            });
            if (tCheck === 0) {
                var tObj = { ...col };
                tObj.DATAS = [];
                tObj.DATAS.push(tObj);
                tArray2.push(tObj);
            }
        });

        tArray2.forEach((col, i) => {
            var tObj = { ...col };
            var tPuStatus = '-';
            tObj.DATAS.forEach((col1, i1) => {
                if (tPuStatus !== 'FullIn') {
                    if (col1.PU_STATUS === 'FullIn') tPuStatus = 'FullIn';
                    else if (col1.PU_STATUS === 'PartIn') tPuStatus = 'PartIn';
                    // else if (col1.PU_STATUS === 'PartIn-F' && tPuStatus !== 'PartIn')  tPuStatus = 'Partin-F';
                    else if (
                        col1.PU_STATUS === 'PartIn-F' &&
                        tPuStatus !== 'PartIn'
                    )
                        tPuStatus = 'Partin';
                }
            });
            tObj.PU_STATUS = tPuStatus;
        });

        var printArray3 = [];
        // console.log(` ++++++>>>${tOne.PU_CD}/${tOne.PU_STATUS}/${tOne.MATL_CD}/${tOne.MRP_QTY}/${tOne.STOCK_QTY}/${tOne.MOQ_QTY}/${tOne.OVER_QTY}/${tOne.PO_QTY}`);
        console.log(
            '++++ pu#/pu_status/matl#/mrp/stock/moq/over/po qty/po_update/diff/po_cd/po_seq',
        );


        var tArray2_1 = [];
        tArray2.forEach((tOne, i) => {
            var tStr = `${tOne.PU_CD}`;
            tStr += `,${tOne.PU_STATUS}`;
            tStr += `,${tOne.MATL_CD}`;
            tStr += `,${tOne.MRP_QTY}`;
            tStr += `,${tOne.STOCK_QTY}`;
            tStr += `,${tOne.MOQ_QTY}`;
            tStr += `,${tOne.OVER_QTY}`;
            tStr += `,${tOne.PO_QTY}`;
            tStr += `,${tOne.PO_UPDATE_QTY}`;
            tStr += `,${tOne.DIFF_QTY}`;
            tStr += `,${tOne.PO_CD}`;
            tStr += `,${tOne.PO_SEQ}`;
            printArray3.push(tStr);
            printArray3.push(`==================>`);
            tOne.DATAS.forEach((col2, i2) => {
                var tStr = `${col2.PU_CD}`;
                tStr += `,${col2.PU_STATUS}`;
                tStr += `,${col2.MATL_CD}`;
                tStr += `,${col2.MRP_QTY}`;
                tStr += `,${col2.STOCK_QTY}`;
                tStr += `,${col2.MOQ_QTY}`;
                tStr += `,${col2.OVER_QTY}`;
                tStr += `,${col2.PO_QTY}`;
                tStr += `,${col2.PO_UPDATE_QTY}`;
                tStr += `,${col2.DIFF_QTY}`;
                tStr += `,${col2.PO_CD}`;
                tStr += `,${col2.PO_SEQ}`;
                printArray3.push(tStr);
            });
            printArray3.push(`------------------------`);
        });

        /*
       console.log(`==============>Print 1 `);
       console.log('++++ po/po_seq/vendor/matl/matl price/mrp/stock/po/leftover');
       printArray.forEach((col, i) => {
            console.log(col);
       });

       console.log(`==============>Print 2 `);
       console.log('++++ po/po_seq/vendor/matl_price/matl#/mrp qty/stock qty/po qty/left_over/foc/moq/over/stockmem_po/stockmem_in/stockmem_not_in');
       printArray2.forEach((col, i) => {
            console.log(col);
       });

       console.log(`==============>Print 3-1 `);
       console.log('++++ pu#/pu_status/matl#/mrp/stock/moq/over/po/po_update/diff');
       printArray3.forEach((col, i) => {
            console.log(col);
       });
       */

        var tWObj = {};
        tWObj.STOCK_MEM = [...tArray2];

        return tWObj;
    }
}

// export default로 Query 내용 내보내기
const moduleQuery_S040101_4_1 = {
    Query: {
        mgrQueryS040101_4_1: async (_, args, contextValue) => {
            var tInObj = { ...args.data };

            if (!args.data.PU_SEQ || args.data.PU_SEQ === 'W') {
                var tFunc = new S040101_COMM();
                var tRetObj = await tFunc.queryS040101_4_1(
                    tInObj,
                    contextValue,
                );

                if (!tInObj.IN_PO_SEQ2) {
                    tInObj.IN_PO_CD = '';
                    tInObj.IN_PO_SEQ = '';
                } else {
                    tInObj.IN_PO_SEQ = tInObj.IN_PO_SEQ2;
                    tInObj.IN_PO_CD = tInObj.IN_PO_CD2;
                }

                var tRetObj1 = [];
                if (tInObj.IN_PO_CD !== '') {
                    tInObj.LAST = '';
                    tRetObj1 = await tFunc.queryS040101_4_1(
                        tInObj,
                        contextValue,
                    );

                    var printArray3 = [];
                    tRetObj.STOCK_MEM.forEach((tOne, i) => {
                        var tStr = `${tOne.PU_CD}`;
                        tStr += `,${tOne.PU_STATUS}`;
                        tStr += `,${tOne.MATL_CD}`;
                        tStr += `,${tOne.MRP_QTY}`;
                        tStr += `,${tOne.STOCK_QTY}`;
                        tStr += `,${tOne.MOQ_QTY}`;
                        tStr += `,${tOne.OVER_QTY}`;
                        tStr += `,${tOne.FOC_QTY}`;
                        tStr += `,${tOne.PO_QTY}`;
                        tStr += `,${tOne.PO_UPDATE_QTY}`;
                        tStr += `,${tOne.DIFF_QTY}`;
                        tStr += `,${tOne.PO_CD}`;
                        tStr += `,${tOne.PO_SEQ}`;
                        printArray3.push(tStr);
                        printArray3.push(`==================>`);
                        tOne.DATAS.forEach((col2, i2) => {
                            var tStr = `${col2.PU_CD}`;
                            tStr += `,${col2.PU_STATUS}`;
                            tStr += `,${col2.MATL_CD}`;
                            tStr += `,${col2.MRP_QTY}`;
                            tStr += `,${col2.STOCK_QTY}`;
                            tStr += `,${col2.MOQ_QTY}`;
                            tStr += `,${col2.OVER_QTY}`;
                            tStr += `,${col2.FOC_QTY}`;
                            tStr += `,${col2.PO_QTY}`;
                            tStr += `,${col2.PO_UPDATE_QTY}`;
                            tStr += `,${col2.DIFF_QTY}`;
                            tStr += `,${col2.PO_CD}`;
                            tStr += `,${col2.PO_SEQ}`;
                            printArray3.push(tStr);
                        });
                        printArray3.push(`------------------------`);
                    });
                    console.log(`==============>Print 3-1(Current) `);
                    console.log(
                        '++++ pu#/pu_status/matl#/mrp/stock/moq/over/foc/po/po_update/diff',
                    );
                    printArray3.forEach((col, i) => {
                        console.log(col);
                    });

                    printArray3 = [];
                    tRetObj1.STOCK_MEM.forEach((tOne, i) => {
                        var tStr = `${tOne.PU_CD}`;
                        tStr += `,${tOne.PU_STATUS}`;
                        tStr += `,${tOne.MATL_CD}`;
                        tStr += `,${tOne.MRP_QTY}`;
                        tStr += `,${tOne.STOCK_QTY}`;
                        tStr += `,${tOne.MOQ_QTY}`;
                        tStr += `,${tOne.OVER_QTY}`;
                        tStr += `,${tOne.FOC_QTY}`;
                        tStr += `,${tOne.PO_QTY}`;
                        tStr += `,${tOne.PO_UPDATE_QTY}`;
                        tStr += `,${tOne.DIFF_QTY}`;
                        tStr += `,${tOne.PO_CD}`;
                        tStr += `,${tOne.PO_SEQ}`;
                        printArray3.push(tStr);
                        printArray3.push(`==================>`);
                        tOne.DATAS.forEach((col2, i2) => {
                            var tStr = `${col2.PU_CD}`;
                            tStr += `,${col2.PU_STATUS}`;
                            tStr += `,${col2.MATL_CD}`;
                            tStr += `,${col2.MRP_QTY}`;
                            tStr += `,${col2.STOCK_QTY}`;
                            tStr += `,${col2.MOQ_QTY}`;
                            tStr += `,${col2.OVER_QTY}`;
                            tStr += `,${col2.FOC_QTY}`;
                            tStr += `,${col2.PO_QTY}`;
                            tStr += `,${col2.PO_UPDATE_QTY}`;
                            tStr += `,${col2.DIFF_QTY}`;
                            tStr += `,${col2.PO_CD}`;
                            tStr += `,${col2.PO_SEQ}`;
                            printArray3.push(tStr);
                        });
                        printArray3.push(`------------------------`);
                    });
                    console.log(`==============>Print 3-1(Before) `);
                    console.log(
                        '++++ pu#/pu_status/matl#/mrp/stock/moq/over/po/po_update/diff',
                    );
                    printArray3.forEach((col, i) => {
                        console.log(col);
                    });
                } else {
                    tRetObj1.STOCK_MEM = [];
                    tRetObj1.PU_MST = [];
                    tRetObj1.PU_MST_NEW = [];
                }

                var sqlStockMem2Log = `
                    select
                        a.*,
                        c.FACTORY_CD,
                        c.VENDOR_Cd,
                        b.MATL_NAME,
                        b.COLOR,
                        b.SPEC,
                        b.UNIT
                    from
                        ksv_stock_mem2_log a,
                        kcd_matl_mst b,
                        ksv_pu_mst2 c
                    where
                        a.pu_cd = '${args.data.PU_CD}'
                        and a.pu_seq = (
                            select
                                max(pu_seq)
                            from
                                ksv_stock_mem2_log
                            where
                                pu_cd = '${args.data.PU_CD}'
                                and pU_seq < 900
                        )
                        and a.pu_cd = c.pu_cd
                        and a.matl_cd = b.matl_cd
                `;
                var retStockMem2Log = await prisma.$queryRaw(
                    Prisma.raw(sqlStockMem2Log),
                );

                var tArray = [];
                var tIdx100 = 0;
                for (
                    tIdx100 = 0;
                    tIdx100 < tRetObj.STOCK_MEM.length;
                    tIdx100++
                ) {
                    var col0 = { ...tRetObj.STOCK_MEM[tIdx100] };

                    if (!col0.BEF_PO_QTY) col0.BEF_PO_QTY = '0';
                    if (!col0.NEW_PO_QTY) col0.NEW_PO_QTY = '0';

                    var tSaveDatas = [];

                    /* version - 2

               var sumBefPoQty = 0;
               var sumPoQty = 0;
               var sumDiffQty = 0;
               var sumOverQty = 0;

               col0.DATAS.forEach((col10, i10) => {
                   var tTmpObj = { ...col10 };
                   var tCheck2 = 0;
                   retStockMem2Log.forEach((col11, i11) => {
                       if (col10.PO_CD === col11.PO_CD &&
                           col10.MATL_CD === col11.MATL_CD) {
                           tTmpObj.BEF_PO_QTY = col11.NEW_PO_QTY;
                           if (isNaN(tTmpObj.BEF_PO_QTY)) tTmpObj.BEF_PO_QTY = '0';

                           // BEF_PO_QTY는 PO_QTY2을 사용 . 260316
                           tTmpObj.BEF_PO_QTY = col11.PO_QTY2;

                           var tOldPoQty = 0;
                           if (parseFloat(tTmpObj.BEF_PO_QTY) > parseFloat(tTmpObj.PO_QTY))  tOldPoQty = parseFloat(tTmpObj.BEF_PO_QTY);
                           else tOldPoQty = parseFloat(tTmpObj.BEF_PO_QTY) + parseFloat(tTmpObj.MOQ_QTY) + parseFloat(tTmpObj.OVER_QTY); 


                           if (tOldPoQty >= parseFloat(tTmpObj.PO_QTY)) {
                               tTmpObj.PO_QTY = parseFloat(tOldPoQty);
                               tTmpObj.DIFF_QTY = '0';
                           } else {
                               var wDiff = parseFloat(tTmpObj.PO_QTY) - parseFloat(tOldPoQty);
                               tTmpObj.DIFF_QTY = wDiff;
                           }
                           // tTmpObj.DIFF_QTY =  parseFloat(tTmpObj.PO_QTY) - parseFloat(tTmpObj.BEF_PO_QTY);

                           sumBefPoQty += parseFloat(tTmpObj.BEF_PO_QTY);
                           sumPoQty += parseFloat(tTmpObj.PO_QTY);
                           sumDiffQty += parseFloat(tTmpObj.DIFF_QTY);
                           sumOverQty += parseFloat(tTmpObj.OVER_QTY);

                           tSaveDatas.push(tTmpObj);
                           tCheck2 = 1;
                       }
                   });
                   if (tCheck2 === 0) {
                       sumBefPoQty += 0;
                       sumPoQty += parseFloat(tTmpObj.PO_QTY);
                       sumDiffQty += parseFloat(tTmpObj.PO_QTY);
                       sumOverQty += 0;
                       tTmpObj.BEF_PO_QTY = '0';
                       tTmpObj.DIFF_QTY =  '0';
                       tSaveDatas.push(tTmpObj);
                   }
               });
               col0.DATAS = [ ...tSaveDatas ];
               var col = { ...col0 };
               var tObj = { ...col };

               if (sumDiffQty > 0 && sumOverQty === sumDiffQty) sumDiffQty = 0;

               tObj.BEF_PO_QTY = parseFloat(sumBefPoQty);
               tObj.PO_QTY = parseFloat(sumPoQty);
               tObj.DIFF_QTY = parseFloat(sumDiffQty);
               */

                    /*
               if (!col.BEF_PO_QTY) col.BEF_PO_QTY = '0';
               if (isNaN(col.BEF_PO_QTY)) col.BEF_PO_QTY = '0';
 
               tObj.DIFF_QTY = 0;
               var tCheck = 0;
               var tBefQty = 0;
               var tDiffQty = 0;
               tRetObj1.STOCK_MEM.forEach((col1, i1) => {
                   if (col.MATL_CD === col1.MATL_CD) {
                       // tObj.DIFF_QTY = parseFloat(tObj.PO_QTY) -  (parseFloat(col1.PO_QTY) + parseFloat(tObj.MOQ_QTY) + parseFloat(tObj.OVER_QTY));
                       // tObj.DIFF_QTY = parseFloat(tObj.PO_QTY) - parseFloat(col1.PO_QTY);

                       tBefQty += parseFloat(col1.PO_QTY);
                       tDiffQty += parseFloat(tObj.DIFF_QTY);
                       tCheck = 1;
                   }
               });
               tBefQty = 0;
               retStockMem2Log.forEach((col1, i1) => {
                   if (col.MATL_CD === col1.MATL_CD) {
                       tBefQty += parseFloat(col1.NEW_PO_QTY);
                   }
               });

               // tObj.DIFF_QTY = String(parseFloat(tObj.PO_QTY) - tBefQty - parseFloat(tObj.OVER_QTY));
               tObj.DIFF_QTY = String(parseFloat(tObj.PO_QTY) - tBefQty);
               tObj.BEF_PO_QTY = String(tBefQty);
               // if (tCheck === 0) tObj.DIFF_QTY = parseFloat(tObj.PO_QTY);
               */

                    /* 1114 : 수정 */
                    var sumBefPoQty = 0;
                    var sumPoQty = 0;
                    var sumDiffQty = 0;
                    var sumOverQty = 0;

                    tSaveDatas = [];
                    col0.DATAS.forEach((col10, i10) => {
                        var tTmpObj = { ...col10 };
                        var tCheck2 = 0;
                        tRetObj1.STOCK_MEM.forEach((col11, i11) => {
                            if (col0.MATL_CD === col11.MATL_CD) {
                                col11.DATAS.forEach((col12, i12) => {
                                    if (
                                        col12.PO_CD === tTmpObj.PO_CD &&
                                        col12.MATL_CD === tTmpObj.MATL_CD
                                    ) {
                                        tTmpObj.BEF_PO_QTY = col12.PO_QTY;
                                        if (isNaN(tTmpObj.BEF_PO_QTY))
                                            tTmpObj.BEF_PO_QTY = '0';

                                        // BEF_PO_QTY는 PO_QTY2을 사용 . 260316
                                        tTmpObj.BEF_PO_QTY = col12.PO_QTY2;

                                        var wDiffQty =
                                            parseFloat(tTmpObj.PO_QTY) -
                                            parseFloat(tTmpObj.BEF_PO_QTY);
                                        tTmpObj.DIFF_QTY =
                                            parseFloat(wDiffQty).toFixed(2);

                                        sumBefPoQty += parseFloat(
                                            tTmpObj.BEF_PO_QTY,
                                        );
                                        sumPoQty += parseFloat(tTmpObj.PO_QTY);
                                        sumDiffQty += parseFloat(
                                            tTmpObj.DIFF_QTY,
                                        );
                                        sumOverQty += parseFloat(
                                            tTmpObj.OVER_QTY,
                                        );

                                        tSaveDatas.push(tTmpObj);
                                        tCheck2 = 1;
                                    }
                                });
                            }
                        });
                        if (tCheck2 === 0) {
                            sumBefPoQty += 0;
                            sumPoQty += parseFloat(tTmpObj.PO_QTY);
                            sumDiffQty += parseFloat(tTmpObj.PO_QTY);
                            sumOverQty += 0;
                            tTmpObj.BEF_PO_QTY = '0';
                            tTmpObj.DIFF_QTY = '0';
                            tSaveDatas.push(tTmpObj);
                        }
                    });
                    col0.DATAS = [...tSaveDatas];

                    // ReCheck
                    tSaveDatas = [];
                    var sumBefPoQty = 0;
                    var sumPoQty = 0;
                    var sumDiffQty = 0;
                    var sumOverQty = 0;
                    var sumFocQty = 0;

                    col0.DATAS.forEach((col10, i10) => {
                        var tTmpObj = { ...col10 };
                        var tCheck2 = 0;
                        retStockMem2Log.forEach((col11, i11) => {
                            if (
                                col10.PO_CD === col11.PO_CD &&
                                col10.MATL_CD === col11.MATL_CD
                            ) {
                                tTmpObj.BEF_PO_QTY = col11.NEW_PO_QTY;

                                // BEF_PO_QTY는 PO_QTY2을 사용 . 260316
                                tTmpObj.BEF_PO_QTY = col11.PO_QTY2;

                                var wDiffQty =
                                    parseFloat(tTmpObj.PO_QTY) -
                                    parseFloat(tTmpObj.BEF_PO_QTY);
                                tTmpObj.DIFF_QTY =
                                    parseFloat(wDiffQty).toFixed(2);

                                /* WON.1230
                           if (parseFloat(tTmpObj.OVER_QTY) > 0) {
                               if (parseFloat(tTmpObj.OVER_QTY) >= parseFloat(tTmpObj.DIFF_QTY)) { 
                                    tTmpObj.PO_QTY = tTmpObj.BEF_PO_QTY;
                                    tTmpObj.DIFF_QTY = '0';
                               }
                           }
                           */

                                sumBefPoQty += parseFloat(tTmpObj.BEF_PO_QTY);
                                sumPoQty += parseFloat(tTmpObj.PO_QTY);
                                sumDiffQty += parseFloat(tTmpObj.DIFF_QTY);
                                sumOverQty += parseFloat(tTmpObj.OVER_QTY);
                                sumFocQty += parseFloat(tTmpObj.FOC_QTY);

                                tSaveDatas.push(tTmpObj);
                                tCheck2 = 1;
                            }
                        });
                        if (tCheck2 === 0) {
                            sumBefPoQty += 0;
                            sumPoQty += parseFloat(tTmpObj.PO_QTY);
                            sumDiffQty += parseFloat(tTmpObj.PO_QTY);
                            sumFocQty += parseFloat(tTmpObj.FOC_QTY);
                            sumOverQty += 0;
                            tTmpObj.BEF_PO_QTY = '0';
                            tTmpObj.DIFF_QTY = '0';
                            tSaveDatas.push(tTmpObj);
                        }
                    });
                    col0.DATAS = [...tSaveDatas];

                    var col = { ...col0 };
                    var tObj = { ...col };

                    /*  WON.1230
               if (sumDiffQty > 0 && sumOverQty === sumDiffQty) sumDiffQty = 0;
               */

                    tObj.BEF_PO_QTY = parseFloat(sumBefPoQty);
                    tObj.PO_QTY = parseFloat(sumPoQty);
                    tObj.DIFF_QTY = parseFloat(sumDiffQty);

                    tArray.push(tObj);
                }

                var tArray10 = [];
                tArray.forEach((col10, i10) => {
                    if (
                        parseFloat(col10.PO_SEQ) === 1 &&
                        parseFloat(col10.PO_QTY) <= 0 &&
                        parseFloat(col10.MRP_QTY) <= 0
                    );
                    else {
                        var tObj10 = { ...col10 };
                        tArray10.push(tObj10);
                    }
                });

                tRetObj.STOCK_MEM = [...tArray10];
            } else {
                // W가 아닌 PU Ver선택시  Start
                var tRetObj = {};
                tRetObj.STOCK_MEM = [];
                var sqlStockMem2Log = `
                    select
                        a.*,
                        c.FACTORY_CD,
                        c.VENDOR_Cd,
                        b.MATL_NAME,
                        b.COLOR,
                        b.SPEC,
                        b.UNIT,
                        d.PO_PRICE as PO_PRICE2
                    from
                        ksv_stock_mem2_log a,
                        kcd_matl_mst b,
                        ksv_pu_mst2 c,
                        ksv_stock_mem2 d
                    where
                        a.pu_cd = '${args.data.PU_CD}'
                        and a.pu_seq = '${args.data.PU_SEQ}'
                        and a.pu_cd = c.pu_cd
                        and a.matl_cd = b.matl_cd
                        and a.pu_cd = d.pu_cd
                        and a.po_cd = d.po_cd
                        and a.matl_cd = d.matl_cd
                    order by
                        a.MATL_CD
                `;
                var retStockMem2Log = await prisma.$queryRaw(
                    Prisma.raw(sqlStockMem2Log),
                );
                if (retStockMem2Log.length <= 0) {
                    var sqlStockMem2Log = `
                        select
                            a.*,
                            c.FACTORY_CD,
                            c.VENDOR_Cd,
                            b.MATL_NAME,
                            b.COLOR,
                            b.SPEC,
                            b.UNIT,
                            d.PO_PRICE as PO_PRICE2
                        from
                            ksv_stock_mem2_log a,
                            kcd_matl_mst b,
                            ksv_pu_mst2 c,
                            ksv_stock_mem2 d
                        where
                            a.pu_cd = '${args.data.PU_CD}'
                            and a.pu_seq = '999'
                            and a.pu_cd = c.pu_cd
                            and a.matl_cd = b.matl_cd
                            and a.pu_cd = d.pu_cd
                            and a.po_cd = d.po_cd
                            and a.matl_cd = d.matl_cd
                        order by
                            a.MATL_CD
                    `;
                    var retStockMem2Log = await prisma.$queryRaw(
                        Prisma.raw(sqlStockMem2Log),
                    );
                }

                var sqlStockMem2LogBef = `
                    select
                        a.*,
                        c.FACTORY_CD,
                        c.VENDOR_Cd,
                        b.MATL_NAME,
                        b.COLOR,
                        b.SPEC,
                        b.UNIT,
                        d.PO_PRICE as PO_PRICE2
                    from
                        ksv_stock_mem2_log a,
                        kcd_matl_mst b,
                        ksv_pu_mst2 c,
                        ksv_stock_mem2 d
                    where
                        a.pu_cd = '${args.data.PU_CD}'
                        and a.pu_seq = ${args.data.PU_SEQ} - 1
                        and a.pu_cd = c.pu_cd
                        and a.matl_cd = b.matl_cd
                        and a.pu_cd = d.pu_cd
                        and a.po_cd = d.po_cd
                        and a.matl_cd = d.matl_cd
                    order by
                        a.MATL_CD
                `;
                var retStockMem2LogBef = await prisma.$queryRaw(
                    Prisma.raw(sqlStockMem2LogBef),
                );
                console.log(
                    `Before stock_mem2_log: ${retStockMem2LogBef.length}`,
                );

                var tArray9 = [];
                var tSaveMatlCd = '';
                var tSaveMems = {};
                retStockMem2Log.forEach((col2_0, i2) => {
                    var col2 = { ...col2_0 };
                    if (!col2.BEF_PO_QTY) col2.BEF_PO_QTY = '0';
                    if (!col2.NEW_PO_QTY) col2.NEW_PO_QTY = '0';

                    var tBefObj = {};
                    retStockMem2LogBef.forEach((col3, i3) => {
                        if (
                            col3.PO_CD === col2.PO_CD &&
                            col3.MATL_CD === col2.MATL_CD
                        ) {
                            tBefObj = { ...col3 };
                        }
                    });

                    var tObj9 = {};
                    tObj9.PU_STATUS = col2.PU_STATUS;
                    tObj9.PO_CD = col2.PO_CD;
                    tObj9.PO_SEQ = col2.PO_SEQ;
                    tObj9.ORDER_CD = '';
                    tObj9.VENDOR_CD = col2.VENDOR_CD;
                    tObj9.MATL_CD = col2.MATL_CD;
                    tObj9.MRP_SEQ = '0';
                    tObj9.MATL_SEQ = '0';
                    tObj9.MATL_NAME = col2.MATL_NAME;
                    tObj9.COLOR = col2.COLOR;
                    tObj9.SPEC = col2.SPEC;
                    tObj9.UNIT = col2.UNIT;
                    tObj9.CURR_CD = col2.CURR_CD;
                    tObj9.FACTORY_CD = col2.FACTORY_CD;
                    tObj9.MASTER_PRICE = col2.MASTER_PRICE;
                    tObj9.SURCHARGE_AMT = col2.SURCHARGE_AMT;
                    tObj9.SURCHARGE_PRICE = col2.SURCHARGE_PRICE;
                    tObj9.SURCHARGE_REMARK = col2.SURCHARGE_REMARK;
                    // tObj9.PO_PRICE = col2.PO_PRICE;
                    tObj9.PO_PRICE = col2.PO_PRICE2;
                    tObj9.PU_CD = col2.PU_CD;

                    tObj9.MRP_QTY = col2.PO_QTY;
                    tObj9.MRP_QTY0 = col2.PO_QTY;
                    tObj9.MRP_QTY1 = col2.PO_QTY;
                    tObj9.STOCK_QTY = col2.STOCK_QTY;
                    tObj9.MOQ_QTY = col2.MOQ;
                    tObj9.OVER_QTY = col2.LEFTOVER_QTY;
                    tObj9.FOC_QTY = col2.FOC_QTY;
                    tObj9.LEFTOVER_QTY = '0';
                    tObj9.PO_QTY = col2.PO_QTY2;

                    if (!col2.BEF_PO_QTY) tObj9.BEF_PO_QTY = '0';
                    else tObj9.BEF_PO_QTY = col2.BEF_PO_QTY;
                    if (isNaN(tObj9.BEF_PO_QTY)) tObj9.BEF_PO_QTY = '0';

                    if (tBefObj.PO_QTY2) {
                        console.log(
                            `Bef StockMem2 exist: ${col2.PO_QTY2} - ${tBefObj.PO_QTY2}`,
                        );
                        tObj9.BEF_PO_QTY = parseFloat(tBefObj.PO_QTY2).toFixed(
                            2,
                        );
                    } else {
                        console.log(
                            `Bef StockMem2 not exist: ${col2.PO_QTY2} - ${tObj9.BEF_PO_QTY} `,
                        );
                        if (parseFloat(args.data.PU_SEQ) === 1)
                            tObj9.BEF_PO_QTY = '0';
                        else;
                    }
                    // tObj9.PO_UPDATE_QTY = col2.NEW_PO_QTY;
                    tObj9.PO_UPDATE_QTY = col2.PO_QTY2;

                    var tDiffQty =
                        parseFloat(tObj9.PO_UPDATE_QTY) -
                        parseFloat(tObj9.BEF_PO_QTY);
                    tObj9.DIFF_QTY = tDiffQty.toFixed(2);
                    console.log(`Diff Qty: ${tObj9.DIFF_QTY}`);

                    tObj9.MRP_QTY2 = col2.PO_QTY;
                    if (i2 === 0 || tSaveMatlCd !== col2.MATL_CD) {
                        if (i2 !== 0) {
                            tArray9.push(tSaveMems);
                            tSaveMems = { ...tObj9 };
                            tSaveMems.DATAS = [];
                            tSaveMems.DATAS.push(tObj9);
                        } else {
                            tSaveMems = { ...tObj9 };
                            tSaveMems.DATAS = [];
                            tSaveMems.DATAS.push(tObj9);
                        }
                    } else {
                        tSaveMems.DATAS.push(tObj9);
                        tSaveMems.PO_CD = `${tSaveMems.PO_CD}/${col2.PO_CD}`;
                        tSaveMems.MRP_QTY += parseFloat(col2.PO_QTY);
                        tSaveMems.MRP_QTY0 += parseFloat(col2.PO_QTY);
                        tSaveMems.MRP_QTY1 += parseFloat(col2.PO_QTY);
                        tSaveMems.STOCK_QTY += parseFloat(col2.STOCK_QTY);
                        tSaveMems.MOQ_QTY += parseFloat(col2.MOQ);
                        tSaveMems.OVER_QTY += parseFloat(col2.LEFTOVER_QTY);
                        tSaveMems.FOC_QTY += parseFloat(col2.FOC_QTY);
                        tSaveMems.LEFTOVER_QTY += parseFloat('0');
                        tSaveMems.PO_QTY += parseFloat(col2.PO_QTY2);

                        /*
            if (!col2.BEF_PO_QTY) tSaveMems.BEF_PO_QTY += parseFloat('0');
            else tSaveMems.BEF_PO_QTY += parseFloat(col2.BEF_PO_QTY);
            if (isNaN(tSaveMems.BEF_PO_QTY)) tSaveMems.BEF_PO_QTY = '0';
            tSaveMems.DIFF_QTY += parseFloat(col2.DIFF_QTY);
            */

                        var tDiffQty =
                            parseFloat(tSaveMems.DIFF_QTY) +
                            parseFloat(tObj9.DIFF_QTY);
                        console.log(
                            `${tDiffQty} = ${tSaveMems.DIFF_QTY} + ${tObj9.DIFF_QTY}`,
                        );

                        var tBefPoQty =
                            parseFloat(tSaveMems.BEF_PO_QTY) +
                            parseFloat(tObj9.BEF_PO_QTY);
                        console.log(
                            `${tBefPoQty} = ${tSaveMems.BEF_PO_QTY} + ${tObj9.BEF_PO_QTY}`,
                        );

                        tSaveMems.BEF_PO_QTY = parseFloat(tBefPoQty);
                        tSaveMems.DIFF_QTY = parseFloat(tDiffQty);

                        tSaveMems.PO_UPDATE_QTY += parseFloat(col2.NEW_PO_QTY);
                        tSaveMems.MRP_QTY2 += parseFloat(col2.PO_QTY);
                    }
                    tSaveMatlCd = tObj9.MATL_CD;
                });
                tArray9.push(tSaveMems);

                var tArray10 = [];
                tArray9.forEach((col10, i10) => {
                    if (
                        parseFloat(col10.PO_SEQ) === 1 &&
                        parseFloat(col10.PO_QTY) <= 0 &&
                        parseFloat(col10.MRP_QTY) <= 0
                    );
                    else {
                        var tObj10 = { ...col10 };
                        tArray10.push(tObj10);
                    }
                });
                tRetObj.STOCK_MEM = [...tArray10];
            }

            // PU_MST Query
            tRetObj.PU_MST = [];
            tRetObj.PU_MST_NEW = [];

            var tOne1 = {};

            var tInput = { ...args.data };
            var argData = { ...args.data };

            var sqlPoCds = '';
            var poArray = [];
            if (!argData.IN_PO_CD) {
                var tPoCds = argData.PO_CD.split('/');
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

            // tInput.PO_CD = po_cd/po_cd2/....
            var puSql = '';
            if (args.data.PU_CD)  puSql = `and a.pu_cd = '${args.data.PU_CD}' `;
            var sqlPuMst2 = `
                select
                    a.*,
                    isnull(b.cd_name, '') as PAY_TYPE_N,
                    b1.pay_type as pay_type2
                from
                    ksv_pu_mst2 a
                    left join kcd_code b on b.cd_group = 'pay_type'
                    and b.cd_code = a.pay_condition,
                    kcd_vendor b1
                where
                    a.po_cd2 = '${tInput.PO_CD}'
                    and a.vendor_cd = '${tInput.VENDOR_CD}'
                    and a.vendor_cd = b1.vendor_cd
                    ${puSql}
            `;
            var pumst2Obj = await prisma.$queryRaw(Prisma.raw(sqlPuMst2));
            if (pumst2Obj.length > 0) {
                var wObj = { ...pumst2Obj[0] };
                tOne1.PU_CD = wObj.PU_CD;
                tOne1.PAY_TYPE = wObj.PAY_TYPE_N;
                if (wObj.pay_type2 && wObj.pay_type2.length > 5) {
                    var sqlPayType1 = `
                        select
                            *
                        from
                            kcd_code
                        where
                            cd_group = 'pay_type'
                            and cd_name like '%${wObj.pay_type2}%'
                    `;
                    var retPayType1 = await prisma.$queryRaw(
                        Prisma.raw(sqlPayType1),
                    );
                    if (retPayType1.length > 0) {
                        wObj.PAY_TYPE_N = wObj.pay_type2;
                        wObj.PAY_TYPE = wObj.pay_type2;
                    } else {
                        wObj.PAY_TYPE_N = wObj.pay_type2;
                        wObj.PAY_TYPE = wObj.pay_type2;
                    }
                }
                if (!args.data.PU_CD) {
                    wObj.PU_CD = '';
                    wObj.PU_CD2 = '';
                }
                tRetObj.PU_MST.push(wObj);
            } else {
                tOne1.PU_CD = '';
            }

            var sqlVendor = `
                select
                    a.vendor_name,
                    a.vendor_matl_type,
                    a.vendor_type,
                    b.cd_name as vendor_type_n,
                    a.pay_term,
                    isnull(a.pay_type, '') as pay_type,
                    a.overshort_rate,
                    a.vendor_cd,
                    isnull(a.pay_type2, '') as pay_type2
                from
                    kcd_vendor a,
                    kcd_code b
                where
                    a.vendor_cd = '${tInput.VENDOR_CD}'
                    and b.cd_code = a.vendor_type
                    and b.cd_group = 'VENDOR_TYPE'
            `;
            var vendorObj = await prisma.$queryRaw(Prisma.raw(sqlVendor));
            tOne1.VENDOR_CD = vendorObj[0].vendor_cd;
            tOne1.VENDOR_NAME = vendorObj[0].vendor_name;
            tOne1.VENDOR_MATL_TYPE = vendorObj[0].vendor_matl_type;
            tOne1.VENDOR_TYPE = vendorObj[0].vendor_type;
            tOne1.VENDOR_TYPE_N = vendorObj[0].vendor_type_n;
            tOne1.PAY_TERM = vendorObj[0].pay_term;

            var tPuTypeCheck = 0;
            if (tOne1.PU_CD !== '') {
                var sqlPayType = `
                    select
                        *
                    from
                        kcd_code
                    where
                        cd_group = 'pay_type'
                        and cd_code = '${tOne1.PAY_CONDITION}'
                `;
                var retPayType = await prisma.$queryRaw(Prisma.raw(sqlPayType));
                if (retPayType.length > 0) {
                    tOne1.PAY_TYPE = retPayType[0].CD_NAME;
                    tOne1.PAY_TYPE_N = retPayType[0].CD_NAME;
                    tPuTypeCheck = 1;
                }
            }

            if (tPuTypeCheck === 0) {
                var sqlPayType = `
                    select
                        *
                    from
                        kcd_code
                    where
                        cd_group = 'pay_type'
                        and cd_code = '${vendorObj[0].pay_type2}'
                `;
                var retPayType = await prisma.$queryRaw(Prisma.raw(sqlPayType));
                if (retPayType.length <= 0) {
                    if (vendorObj[0].pay_type !== '') {
                        var sqlPayType1 = `
                            select
                                *
                            from
                                kcd_code
                            where
                                cd_group = 'pay_type'
                                and (
                                    cd_name like '%${vendorObj[0].pay_type}%'
                                    or cd_code like '%${vendorObj[0].pay_type}%'
                                )
                        `;
                        var retPayType1 = await prisma.$queryRaw(
                            Prisma.raw(sqlPayType1),
                        );
                        if (retPayType1.length > 0) {
                            tOne1.PAY_TYPE = vendorObj[0].pay_type;
                            tOne1.PAY_TYPE_N = vendorObj[0].pay_type;
                            tOne1.PAY_CONDITION = retPayType1[0].cd_code;
                        } else {
                            tOne1.PAY_TYPE = vendorObj[0].pay_type;
                            tOne1.PAY_TYPE_N = vendorObj[0].pay_type;
                            tOne1.PAY_CONDITION = '';
                        }
                    } else {
                        tOne1.PAY_TYPE = '';
                        tOne1.PAY_TYPE_N = '';
                        tOne1.PAY_CONDITION = '';
                    }
                } else {
                    tOne1.PAY_TYPE = retPayType[0].CD_NAME;
                    tOne1.PAY_TYPE_N = retPayType[0].CD_NAME;
                    tOne1.PAY_CONDITION = vendorObj[0].pay_type2;
                }
            }

            if (vendorObj[0].pay_type && vendorObj[0].pay_type.length > 5) {
                var sqlPayType1 = `
                    select
                        *
                    from
                        kcd_code
                    where
                        cd_group = 'pay_type'
                        and cd_name like '%${vendorObj[0].pay_type}%'
                `;
                var retPayType1 = await prisma.$queryRaw(
                    Prisma.raw(sqlPayType1),
                );
                if (retPayType1.length > 0) {
                    tOne1.PAY_TYPE_N = vendorObj[0].pay_type;
                    tOne1.PAY_TYPE = vendorObj[0].pay_type;
                } else {
                    tOne1.PAY_TYPE_N = vendorObj[0].pay_type;
                    tOne1.PAY_TYPE = vendorObj[0].pay_type;
                }
            }

            tOne1.OVERSHORT_RATE = vendorObj[0].overshort_rate;

            if (!tInput.PU_CD2) {
                tOne1.OLD_PO_QTY = 0;
                tOne1.P_PU_CD = '';
                tOne1.P_CURR_CD = '';
                tOne1.P_PI_NO = '';
                tOne1.P_ORDER_DATE = '';
                tOne1.P_DUE_DATE = '';
                tOne1.P_EX_FACTORY = '';
                tOne1.P_NORMI = '';
                tOne1.P_BILL_TO = '';
                tOne1.P_PAY_DATE = '';
                tOne1.P_PLACE_CD = '';
                tOne1.P_SHIP_TO = '';
                tOne1.ORIGIN_PORT = '';
                tOne1.TRADE_TERM = '';
                tOne1.OLD_PO_QTY = 0;
            } else {
                var tSql4 = `
                    select
                        pu_cd,
                        curr_cd,
                        pi_no,
                        order_date,
                        due_date,
                        ex_factory,
                        normi,
                        bill_to,
                        pay_date,
                        place_cd,
                        ship_to,
                        origin_port,
                        trade_term
                    from
                        ksv_pu_mst2
                    where
                        pu_cd = '${tInput.PU_CD2}'
                `;
                var tRet4 = await prisma.$queryRaw(Prisma.raw(tSql4));
                tOne1.P_PU_CD = tRet4[0].pu_cd;
                tOne1.P_CURR_CD = tRet4[0].curr_cd;
                tOne1.P_PI_NO = tRet4[0].pi_no;
                tOne1.P_ORDER_DATE = tRet4[0].order_date;
                tOne1.P_DUE_DATE = tRet4[0].due_date;
                tOne1.P_EX_FACTORY = tRet4[0].ex_factory;
                tOne1.P_NORMI = tRet4[0].normi;
                tOne1.P_BILL_TO = tRet4[0].bill_to;
                tOne1.P_PAY_DATE = tRet4[0].pay_date;
                tOne1.P_PLACE_CD = tRet4[0].place_cd;
                tOne1.P_SHIP_TO = tRet4[0].ship_to;
                tOne1.ORIGIN_PORT = tRet4[0].origin_port;
                tOne1.TRADE_TERM = tRet4[0].trade_term;

                var tSql6 = `
                    select
                        po_qty
                    from
                        ksv_pu_mem2
                    where
                        pu_cd = '${tInput.PU_CD2}'
                        and vendor_cd = '${tInput.VENDOR_CD}'
                        and po_cd = '${tInput.PO_CD}'
                        and pu_seq = (
                            select
                                max(pu_seq)
                            from
                                ksv_pu_mem2
                            where
                                pu_cd = '${tInput.PU_CD2}'
                                and po_cd = '${tInput.PO_CD}'
                        )
                `;
                var tRet6 = await prisma.$queryRaw(Prisma.raw(tSql6));
                tOne1.OLD_PO_QTY = 0;
                if (tRet6.length > 0) tOne1.OLD_PO_QTY = tRet6[0].po_qty;
            }

            var tSql3 = `
                select
                    d.buyer_cd,
                    d.buyer_name,
                    left(a.reg_datetime, 8) as mrp_date,
                    a.plan_flag,
                    a.plan_etd,
                    a.plan_eta,
                    a.factory_cd,
                    e.factory_name,
                    max(c.due_date) as prod_due_date,
                    min(isnull(c.matl_due_date, '')) as matl_due_date
                from
                    ksv_po_mst a,
                    ksv_po_mem b,
                    ksv_order_mst c,
                    kcd_buyer d,
                    kcd_factory e
                where
                    a.po_cd in (${sqlPoCds})
                    and a.po_seq = 1
                    and a.po_cd = b.po_cd
                    and b.po_seq = 1
                    and b.order_cd = c.order_cd
                    and left(c.order_cd, 2) = d.buyer_cd
                    and a.factory_cd = e.factory_cd
                group by
                    d.buyer_cd,
                    d.buyer_name,
                    left(a.reg_datetime, 8),
                    a.plan_flag,
                    a.plan_etd,
                    a.plan_eta,
                    a.factory_cd,
                    e.factory_name
            `;
            var tRet3 = await prisma.$queryRaw(Prisma.raw(tSql3));
            if (tRet3.length > 0) {
                tOne1.BUYER_CD = tRet3[0].buyer_cd;
                tOne1.BUYER_NAME = tRet3[0].buyer_name;
                tOne1.MRP_DATE = tRet3[0].mrp_date;
                tOne1.PLAN_FLAG = tRet3[0].plan_flag;
                tOne1.PLAN_ETD = tRet3[0].plan_etd;
                tOne1.FACTORY_CD = tRet3[0].factory_cd;
                tOne1.FACTORY_NAME = tRet3[0].factory_name;
                tOne1.PROD_DUE_DATE = tRet3[0].prod_due_date;
                tOne1.MATL_DUE_DATE = tRet3[0].matl_due_date;
            }

            var tSql2 = `
                select
                    a.po_cd,
                    b.vendor_cd,
                    a.use_po_type,
                    sum(use_qty) as s_use_qty,
                    sum(po_qty) as s_po_qty
                from
                    ksv_po_mrp a,
                    kcd_matl_mst b
                where
                    a.po_cd in (${sqlPoCds})
                    and a.matl_cd = b.matl_cd
                    and b.vendor_cd = '${tInput.VENDOR_CD}'
                    -- and   a.use_po_type = '2'
                group by
                    a.po_cd,
                    b.vendor_cd,
                    a.use_po_type
            `;
            var tRet2 = await prisma.$queryRaw(Prisma.raw(tSql2));
            tRet2.forEach((col, i) => {
                if (col.use_po_type === '1') {
                    tOne1.MRP_QTY = String(col.s_use_qty);
                    tOne1.PO_QTY = String(col.s_po_qty);
                }
                if (col.use_po_type === '2') {
                    tOne1.STOCK_QTY = String(col.s_use_qty);
                }
            });

            var tPoCd = poArray[0];
            var tSql3 = `
                select distinct
                    b.order_cd,
                    b.factory_cd
                from
                    ksv_po_mem a,
                    ksv_order_mst b
                where
                    a.po_cd = '${tPoCd}'
                    and a.po_seq = 1
                    and a.order_cd = b.order_cd
            `;
            var tRet3 = await prisma.$queryRaw(Prisma.raw(tSql3));

            var tMatlDueDate = '';
            var tTableName = '';
            if (tRet3.length > 0) {
                if (tRet3[0].factory_cd === 'FC034')
                    tTableName = 'KSV_CAPABOOK_MEM';
                if (tRet3[0].factory_cd === 'FC044')
                    tTableName = 'KSV_CAPABOOK_MEM_ETHIOPIA';
            }
            if (tTableName === '');
            else {
                var tOrderCd = tRet3[0].order_cd;
                var tSql4 = `
                    SELECT
                        isnull(BOOK_DATE, '') as BOOK_DATE,
                        isnull(ORDER_CD, '') as ORDER_CD,
                        isnull(M_ETA, '') as M_ETA,
                        isnull(JOB_CD, '') as JOB_CD
                    FROM
                        ${tTableName}
                    WHERE
                        order_cd = '${tOrderCd}'
                        and book_date = (
                            select
                                max(book_date) as book_date
                            from
                                ${tTableName}
                            where
                                order_cd = '${tOrderCd}'
                        )
                `;
                var tRet4 = await prisma.$queryRaw(Prisma.raw(tSql4));
                if (tRet4.length > 0) tMatlDueDate = tRet4[0].M_ETA;
            }
            tOne1.MATL_DUE_DATE = tMatlDueDate;

            if (!args.data.PU_CD) {
                tOne1.PU_CD = ''; 
            }
            tRetObj.PU_MST_NEW.push(tOne1);
            return tRetObj;
        },

        mgrQueryS040101_4_2: async (_, args) => {
            var tSQL = '';

            let sqlStr = `
                select
                    '' as PU_CD,
                    K.*,
                    isnull(K1.MOQ, 0) as MOQ_QTY,
                    isnull(K1.PO_QTY2, 0) as PO_QTY,
                    isnull(K1.MOQ_AMT, 0) as MOQ_AMT,
                    isnull(K1.MOQ_PRICE, 0) as MOQ_PRICE,
                    isnull(K1.FREIGHT_AMT, 0) as FREIGHT_AMT,
                    isnull(K1.FREIGHT_PRICE, 0) as FREIGHT_PRICE,
                    isnull(K1.OTHER_AMT, 0) as OTHER_AMT,
                    isnull(K1.OTHER_PRICE, 0) as OTHER_PRICE,
                    isnull(k1.SURCHARGE_REMARK, '') as SURCHARGE_REMARK,
                    isnull(K1.PO_PRICE, 0) as PO_PRICE
                from
                    (
                        SELECT
                            A1.PO_CD,
                            -- A1.ORDER_CD,
                            A3.VENDOR_CD,
                            A1.MATL_CD,
                            -- A1.MRP_SEQ,
                            -- A1.MATL_SEQ,
                            A3.MATL_NAME,
                            A3.COLOR,
                            A3.SPEC,
                            A3.UNIT,
                            A4.CURR_CD,
                            A4.MATL_PRICE AS MASTER_PRICE,
                            sum(A1.PO_QTY) AS MRP_QTY0,
                            sum(A2.PO_QTY) AS MRP_QTY1,
                            sum(A1.STOCK_QTY) AS STOCK_QTY,
                            max(A1.PO_SEQ) AS PO_SEQ
                        FROM
                            KSV_STOCK_MEM A1,
                            KSV_PO_MRP A2,
                            KCD_MATL_MST A3,
                            KCD_MATL_MEM A4,
                            KSV_ORDER_MST A5,
                            KSV_PO_MST A6
                        WHERE
                            A1.PU_CD = '${args.data.PU_CD}'
                            AND A1.PO_CD = A6.PO_CD
                            AND A1.PO_SEQ = A6.PO_SEQ
                            AND A6.PO_STATUS = '4'
                            AND A1.ORDER_CD = A5.ORDER_CD
                            AND A5.ORDER_STATUS in ('3', '5', '6')
                            AND A1.PO_SEQ < 97
                            -- AND   A1.PO_QTY > 0
                            AND A1.MATL_CD = A3.MATL_CD
                            AND A1.MATL_CD = A4.MATL_CD
                            AND A1.MATL_SEQ = A4.MATL_SEQ
                            -- AND   A1.STOCK_STATUS = '0' 
                            AND A1.PO_CD = A2.PO_CD
                            AND A1.PO_SEQ = A2.PO_SEQ
                            AND A1.ORDER_CD = A2.ORDER_CD
                            AND A1.MATL_CD = A2.MATL_CD
                            AND A1.MRP_SEQ = A2.MRP_SEQ
                            AND A1.MATL_SEQ = A2.MATL_SEQ
                        group by
                            A1.PO_CD,
                            -- A1.ORDER_CD, 
                            A3.VENDOR_CD,
                            A1.MATL_CD,
                            -- A1.MRP_SEQ, A1.MATL_SEQ, 
                            A3.MATL_NAME,
                            A3.COLOR,
                            A3.SPEC,
                            A3.UNIT,
                            A4.CURR_CD,
                            A4.MATL_PRICE
                    ) K
                    left join ksv_stock_mem2 K1 on K1.PO_CD = K.PO_CD
                    and K1.vendor_cd = K.VENDOR_CD
                    and K1.matl_cd = K.MATL_CD
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            var tArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tOne = { ...tRet[tIdx] };
                var sql0 = `
                    select
                        isnull(sum(use_qty), 0) as stock_qty
                    from
                        ksv_stock_use
                    where
                        use_po_cd = '${tOne.PO_CD}'
                        and use_matl_cd = '${tOne.MATL_CD}'
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                tOne.STOCK_QTY = String(tRet0[0].stock_qty);

                var tValue =
                    parseFloat(tOne.MRP_QTY0) + parseFloat(tOne.STOCK_QTY);
                tOne.MRP_QTY = String(tValue);

                tArray.push(tOne);
            }

            var tWObj = {};
            tWObj.STOCK_MEM = tArray;

            let sqlStr = `
                select
                    *
                from
                    ksv_pu_mst2
                where
                    pu_cd = '${args.data.PU_CD}'
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            var tRetArray = [];
            var tIdx0 = 0;
            for (tIdx0 = 0; tIdx0 < tRet.length; tIdx0++) {
                var tInData1 = { ...tRet[tIdx0] };
                Object.keys(tInData1).forEach((col, i) => {
                    if (tInData1[`${col}`] === null) {
                        if (typeof tInData1[`${col}`] === 'string')
                            tInData1[`${col}`] = '';
                        else tInData1[`${col}`] = 0;
                    }
                });
                tRetArray.push(tInData1);
            }
            tWObj.PU_MST = tRetArray;
            tWObj.PU_MST_NEW = [];

            return tWObj;
        },

        mgrQueryS040101_4_1_bak: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }

            var sqlPoCds = '';
            var tPoCds = args.data.PO_CD.split('/');
            tPoCds.forEach((col, i) => {
                if (i === 0) sqlPoCds += `'${col}'`;
                else sqlPoCds += `,'${col}'`;
            });

            var tPuCd = '';
            if (typeof args.data.PU_CD2 !== 'undefined') {
                tPuCd = args.data.PU_CD2;
            }

            var tInput = { ...args.data };
            if (typeof tInput.PU_CD2 === 'undefined') tInput.PU_CD2 = '';
            if (typeof tInput.MATL_TYPE === 'undefined') tInput.MATL_TYPE = '';

            let sqlStr = `
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
                            A5.FACTORY_CD,
                            max(A4.MATL_PRICE) AS MASTER_PRICE,
                            sum(A1.USE_QTY) AS MRP_QTY0,
                            sum(A1.PO_QTY) AS MRP_QTY1,
                            max(A1.PO_SEQ) AS PO_SEQ
                        FROM
                            KSV_PO_MRP A1,
                            KCD_MATL_MST A3,
                            KCD_MATL_MEM A4,
                            KSV_ORDER_MST A5,
                            KSV_PO_MST A6
                        WHERE
                            A1.PO_CD IN (${sqlPoCds})
                            AND A1.PO_CD = A6.PO_CD
                            AND A1.PO_SEQ = A6.PO_SEQ
                            AND A6.PO_STATUS = '4'
                            AND A1.ORDER_CD = A5.ORDER_CD
                            AND (
                                A1.PO_SEQ < 97
                                OR A1.PO_SEQ > 100
                            )
                            AND A1.USE_PO_TYPE = '1'
                            AND A1.DIFF_PO_TYPE in ('0', '1', '3', '2', '4')
                            AND LEFT(A1.ORDER_CD, 2) = '${args.data.BUYER_CD}'
                            AND A1.MATL_CD = A3.MATL_CD
                            AND A3.VENDOR_CD = '${args.data.VENDOR_CD}'
                            AND A1.MATL_CD = A4.MATL_CD
                            AND A4.MATL_SEQ = (
                                select
                                    max(matl_seq) as matl_seq
                                from
                                    kcd_matl_mem
                                where
                                    matl_cd = A1.MATL_CD
                            )
                        group by
                            A1.PO_CD,
                            A3.VENDOR_CD,
                            A1.MATL_CD,
                            A3.MATL_NAME,
                            A3.COLOR,
                            A3.SPEC,
                            A3.UNIT,
                            A4.CURR_CD,
                            A5.FACTORY_CD
                    ) K
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {};

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

            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tOne = { ...tRet[tIdx] };

                //
                if (
                    parseFloat(tOne.PO_PRICE) <= 0 &&
                    parseFloat(tOne.MASTER_PRICE) > 0
                ) {
                    tOne.PO_PRICE = tOne.MASTER_PRICE;
                }
                //

                var tTotalMrp = parseFloat(tOne.MRP_QTY0);
                console.log(`Total Mrp Qty: ${tTotalMrp}`);

                var tBefTotalMrp = 0;
                var tCurrMrpQty = 0;

                var tTotalStockQty = 0;
                var tCurrStockQty = 0;
                var tBefStockQty = 0;

                // Total Stock Qty
                // 재고계산
                var sql0 = `
                    select
                        po_cd,
                        matl_cd,
                        sum(use_qty) as stock_qty
                    from
                        ksv_po_mrp
                    where
                        po_cd = '${tOne.PO_CD}'
                        and po_matl_cd = '${tOne.MATL_CD}'
                        and use_po_type = '2'
                        -- and po_seq > ${max_po_seq}
                    group by
                        po_cd,
                        matl_cd
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                if (tRet0.length > 0) {
                    tTotalStockQty = String(tRet0[0].stock_qty);
                }
                console.log(`Total Stock Qty: ${tTotalStockQty}`);

                var retStockMem2 = [];
                var retStockMem2_FIX = [];
                var max_po_seq = 0;
                if (tPuCd !== '') {
                    var sqlStockMem2_FIX = `
                        select
                            *
                        from
                            ksv_stock_mem2
                        where
                            po_cd = '${tOne.PO_CD}'
                            and matl_cd = '${tOne.MATL_CD}'
                            and pu_cd = '${tPuCd}'
                            and stsin_cd <> ''
                        order by
                            stsin_cd
                    `;
                    retStockMem2_FIX = await prisma.$queryRaw(
                        Prisma.raw(sqlStockMem2_FIX),
                    );

                    console.log('----------------------------------');
                    console.log(retStockMem2_FIX);

                    var tLastStsIn = {};
                    if (retStockMem2_FIX.length > 0) {
                        tLastStsIn = {
                            ...retStockMem2_FIX[retStockMem2_FIX.length - 1],
                        };
                        tBefTotalMrp = parseFloat(tLastStsIn.BEF_TOTAL_MRP);
                        tBefStockQty = parseFloat(tLastStsIn.BEF_STOCK_QTY);
                    } else {
                        tBefTotalMrp = 0;
                        tBefStockQty = 0;
                    }

                    tBefTotalMrp = 0;
                    tBefStockQty = 0;
                    retStockMem2_FIX.forEach((col3, i3) => {
                        tBefTotalMrp += parseFloat(col3.PO_QTY);
                        tBefStockQty += parseFloat(col3.STOCK_QTY);
                    });
                    console.log(
                        `Bef Qty(${retStockMem2_FIX.length}) : ${tBefTotalMrp} / ${tBefStockQty}`,
                    );

                    var sqlStockMem2 = `
                        select
                            *
                        from
                            ksv_stock_mem2
                        where
                            po_cd = '${tOne.PO_CD}'
                            and matl_cd = '${tOne.MATL_CD}'
                            and pu_cd = '${tPuCd}'
                            and (
                                stsin_cd = ''
                                or stsin_cd is null
                            )
                    `;
                    retStockMem2 = await prisma.$queryRaw(
                        Prisma.raw(sqlStockMem2),
                    );

                    tCurrMrpQty = tTotalMrp - tBefTotalMrp;
                    tCurrStockQty = tTotalStockQty - tBefStockQty;

                    console.log(
                        `Curr Qty(1) : ${tCurrMrpQty} / ${tCurrStockQty}`,
                    );

                    var sqlTmp = `
                        select
                            isnull(max(po_seq), 0) as max_po_seq
                        from
                            ksv_stock_mem2
                        where
                            po_cd = '${tOne.PO_CD}'
                            and matl_cd = '${tOne.MATL_CD}'
                            and pu_cd = '${tPuCd}'
                            and stsin_cd <> ''
                    `;
                    var retTmp = await prisma.$queryRaw(Prisma.raw(sqlTmp));
                    if (retTmp.length > 0) max_po_seq = retTmp[0].max_po_seq;
                } else {
                    tCurrMrpQty = tTotalMrp;
                    tCurrStockQty = tTotalStockQty;
                    console.log(
                        `Curr Qty(1-1) : ${tCurrMrpQty} / ${tCurrStockQty}`,
                    );
                }
                console.log(`Curr Qty(2) : ${tCurrMrpQty} / ${tCurrStockQty}`);

                var tVal9 = 0;
                tVal9 += parseFloat(tCurrMrpQty);
                // tVal9 +=  parseFloat(tCurrStockQty);

                tOne.MRP_QTY = String(tVal9);
                tOne.STOCK_QTY = String(tCurrStockQty);

                console.log(
                    `STEP-1(Mrp): ${retStockMem2.length} / ${retStockMem2_FIX.length}/ ${tTotalMrp} / ${tBefTotalMrp} / ${tCurrMrpQty}`,
                );
                console.log(
                    `STEP-2(Stock): ${retStockMem2.length} / ${retStockMem2_FIX.length}/ ${tTotalStockQty} / ${tBefStockQty} / ${tCurrStockQty}`,
                );

                var tPuSql = '';
                if (tPuCd !== '') {
                    tPuSql = `               and pu_cd = '${tPuCd}'`;
                }
                var tTotalMoqQty = 0;
                var sql01 = `
                    select
                        isnull(sum(po_qty), 0) as moq_qty
                    from
                        ksv_po_mrp
                    where
                        po_cd = '${tOne.PO_CD}'
                        and matl_cd = '${tOne.MATL_CD}'
                        and po_seq = 99 ${tPuSql}
                `;
                var tRet01 = await prisma.$queryRaw(Prisma.raw(sql01));
                if (tRet01.length > 0) tTotalMoqQty = tRet01[0].moq_qty;

                var tTotalOverShortQty = 0;
                var sql01 = `
                    select
                        isnull(sum(po_qty), 0) as overshort_qty
                    from
                        ksv_po_mrp
                    where
                        po_cd = '${tOne.PO_CD}'
                        and matl_cd = '${tOne.MATL_CD}'
                        and po_seq = 98 ${tPuSql}
                `;
                var tRet01 = await prisma.$queryRaw(Prisma.raw(sql01));
                if (tRet01.length > 0)
                    tTotalOverShortQty = tRet01[0].overshort_qty;

                var tTotalFocQty = 0;
                var sql01 = `
                    select
                        isnull(sum(po_qty), 0) as foc_qty
                    from
                        ksv_po_mrp
                    where
                        po_cd = '${tOne.PO_CD}'
                        and matl_cd = '${tOne.MATL_CD}'
                        and po_seq = 99 ${tPuSql}
                `;
                var tRet01 = await prisma.$queryRaw(Prisma.raw(sql01));
                if (tRet01.length > 0) tTotalFocQty = tRet01[0].foc_qty;

                console.log(
                    `STEP-3(moq,overshort,foc): ${tTotalMoqQty} / ${tTotalOverShortQty}/ ${tTotalFocQty} `,
                );

                if (retStockMem2.length <= 0 && parseFloat(tOne.MRP_QTY) > 0) {
                    //  신규의 경우
                    if (retStockMem2_FIX.length <= 0) {
                        // 완전 신규
                        var tNewPoQty =
                            parseFloat(tOne.MRP_QTY) -
                            parseFloat(tOne.STOCK_QTY) +
                            tTotalMoqQty;
                        tOne.MOQ_QTY = 0;
                        tOne.MRP_QTY2 = '0';
                        tOne.PO_QTY = String(tNewPoQty);
                        tOne.DIFF_QTY = '0';
                        tOne.PO_UPDATE_QTY = tOne.PO_QTY;
                        tOne.PU_STATUS = 'New';
                        tOne.SURCHARGE_PRICE = '0';
                        tOne.SURCHARGE_AMT = '0';
                        tOne.SURCHARGE_REMARK = '';
                        tOne.PO_PRICE = tOne.MASTER_PRICE;
                        tOne.PU_CD = '';
                        if (gVendorType === '4') {
                            // tOne.CURR_CD = 'USD';
                            tOne.PO_PRICE = '0';
                        }
                        tArray.push(tOne);
                    } else {
                        // Stsin Full 후 신규

                        /*
                  var tOldMrpQty2 = 0;
                  var tOldStockQty2 = 0;
                  retStockMem2_FIX.forEach((col2, i2) => {
                      tOldMrpQty2 += parseFloat(col2.PO_QTY);
                      tOldStockQty2 += parseFloat(col2.STOCK_QTY);
                  });

                  var tNewMrpQty2 = parseFloat(tOne.MRP_QTY) - tOldMrpQty2;
                  var tNewStockQty2 = parseFloat(tOne.STOCK_QTY) - tOldStockQty2;
                      tNewStockQty2 += (tTotalMoqQty + tTotalOverShortQty + tTotalFocQty);
*/
                        var tNewStockQty2 = parseFloat(tOne.STOCK_QTY);
                        tNewStockQty2 +=
                            tTotalMoqQty + tTotalOverShortQty + tTotalFocQty;

                        var tNewPoQty =
                            parseFloat(tOne.MRP_QTY) -
                            parseFloat(tNewStockQty2);

                        var objStockMem2_FIX = {
                            ...retStockMem2_FIX[retStockMem2_FIX.length - 1],
                        };
                        tOne.MRP_QTY = String(tOne.MRP_QTY);
                        tOne.STOCK_QTY = String(tNewStockQty2);
                        tOne.MOQ_QTY = 0;
                        tOne.MRP_QTY2 = '0';
                        tOne.PO_QTY = String(tNewPoQty);
                        tOne.DIFF_QTY = '0';
                        tOne.PO_UPDATE_QTY = tOne.PO_QTY;
                        tOne.PU_STATUS = 'New';

                        tOne.SURCHARGE_PRICE = 0;
                        tOne.SURCHARGE_AMT = 0;
                        tOne.SURCHARGE_REMARK = 0;
                        tOne.PO_PRICE = objStockMem2_FIX.PO_PRICE;
                        if (parseFloat(tOne.PO_PRICE) <= 0)
                            tOne.PO_PRICE = tOne.MASTER_PRICE;
                        tOne.PU_CD = objStockMem2_FIX.PU_CD;
                        if (gVendorType === '4') {
                            // tOne.CURR_CD = 'USD';
                            tOne.PO_PRICE = '0';
                        }
                        tArray.push(tOne);
                    }
                } else {
                    // Update 경우

                    /*
              var tLogMrpQty = -1;
              var tLogPoQty  = -1;
              if (tPuCd !== '') {
                  var sql2_0 = `
                      select
                          po_qty as old_mrp_qty,
                          po_qty2 as old_po_qty
                      from
                          ksv_stock_mem2_log
                      where
                          pu_cd = '${tPuCd}'
                          and matl_cd = '${tOne.MATL_CD}'
                          and pu_seq = (
                              select
                                  max(pu_seq)
                              from
                                  ksv_stock_mem2_log
                              where
                                  pu_cd = '${tPuCd}'
                                  and matl_cd = '${tOne.MATL_CD}'
                          )
                  `;
                  var tRet2_0  =  await prisma.$queryRaw(Prisma.raw(sql2_0));

                  if (tRet2_0.length > 0) {
                      tLogMrpQty = parseFloat(tRet2_0[0].old_mrp_qty);
                      tLogPoQty = parseFloat(tRet2_0[0].old_po_qty);
                  }
              }
              */

                    var tRet2 = [];
                    var sql2_0 = `
                        select
                            isnull(STOCK_QTY, 0) as STOCK_QTY,
                            isnull(MOQ, 0) as MOQ_QTY,
                            isnull(LEFTOVER_QTY, 0) as LEFTOVER_QTY,
                            isnull(PO_QTY, 0) as MRP_QTY,
                            isnull(PO_QTY2, 0) as PO_QTY,
                            isnull(SURCHARGE_PRICE, 0) as SURCHARGE_PRICE,
                            isnull(SURCHARGE_AMT, 0) as SURCHARGE_AMT,
                            isnull(SURCHARGE_REMARK, '') as SURCHARGE_REMARK,
                            isnull(PO_PRICE, 0) as PO_PRICE,
                            isnull(PU_CD, '') as PU_CD,
                            isnull(STSIN_CD, '') as STSIN_CD
                        from
                            ksv_stock_mem2
                        where
                            po_cd = '${tOne.PO_CD}'
                            and vendor_cd = '${tOne.VENDOR_CD}'
                            and matl_cd = '${tOne.MATL_CD}'
                            and pu_cd = '${tPuCd}'
                            and stsin_cd is not null
                            and stsin_cd <> ''
                    `;

                    var sql2 = `
                        select
                            isnull(STOCK_QTY, 0) as STOCK_QTY,
                            isnull(MOQ, 0) as MOQ_QTY,
                            isnull(LEFTOVER_QTY, 0) as LEFTOVER_QTY,
                            isnull(PO_QTY, 0) as MRP_QTY,
                            isnull(PO_QTY2, 0) as PO_QTY,
                            isnull(SURCHARGE_PRICE, 0) as SURCHARGE_PRICE,
                            isnull(SURCHARGE_AMT, 0) as SURCHARGE_AMT,
                            isnull(SURCHARGE_REMARK, '') as SURCHARGE_REMARK,
                            isnull(PO_PRICE, 0) as PO_PRICE,
                            isnull(PU_CD, '') as PU_CD,
                            isnull(STSIN_CD, '') as STSIN_CD
                        from
                            ksv_stock_mem2
                        where
                            po_cd = '${tOne.PO_CD}'
                            and vendor_cd = '${tOne.VENDOR_CD}'
                            and matl_cd = '${tOne.MATL_CD}'
                            and pu_cd = '${tPuCd}'
                            and (
                                stsin_cd = ''
                                or stsin_cd is null
                            )
                    `;
                    tRet2 = await prisma.$queryRaw(Prisma.raw(sql2));
                    var objStockMem2 = {};
                    if (tRet2.length > 0) {
                        objStockMem2 = { ...tRet2[0] };
                    } else {
                        var tRet3 = await prisma.$queryRaw(Prisma.raw(sql2_0));
                        if (tRet3.length > 0) {
                            objStockMem2 = { ...tRet3[0] };
                        }
                    }

                    // var tCurrMrpQty = 0;
                    // var tCurrStockQty  = 0;

                    var tCurrPoQty = 0;
                    var tCurrMoqQty = 0;
                    var tOldMoqQty = parseFloat(objStockMem2.MOQ_QTY);
                    if (tTotalMoqQty > tOldMoqQty) tCurrMoqQty = tTotalMoqQty;
                    else tCurrMoqQty = tOldMoqQty;

                    var tCurrPoQty =
                        parseFloat(tOne.MRP_QTY) -
                        parseFloat(tOne.STOCK_QTY) +
                        parseFloat(tCurrMoqQty);
                    var tOldPoQty = parseFloat(objStockMem2.PO_QTY);

                    // var tDiffQty = tCurrPoQty - (tOldPoQty + tCurrMoqQty);
                    var tDiffQty = tCurrPoQty - tOldPoQty;
                    var tUpdateQty = tCurrPoQty;

                    console.log(
                        `STEP-4:Update:${tOldPoQty}/${tCurrPoQty}/${tDiffQty}`,
                    );

                    //
                    tOne.MOQ_QTY = String(tCurrMoqQty);
                    tOne.MRP_QTY2 = String(tCurrPoQty);
                    // tOne.PO_QTY = String(tCurrPoQty);
                    tOne.PO_QTY = String(tOldPoQty);
                    tOne.DIFF_QTY = String(tDiffQty);
                    tOne.PO_UPDATE_QTY = String(tUpdateQty);

                    /*
              if (tTotalMrp === tCurrMrpQty) tOne.PU_STATUS = '-';
              else tOne.PU_STATUS = 'Update';
              */
                    tOne.PU_STATUS = '-';
                    if (tDiffQty > 0) tOne.PU_STATUS = 'Update';
                    if (objStockMem2.STSIN_CD !== '') {
                        var sql4 = `
                            select
                                sum(in_qty) as in_qty
                            from
                                ksv_stock_in
                            where
                                pu_cd = '${tPuCd}'
                                and po_cd = '${tOne.PO_CD}'
                                and matl_cd = '${tOne.MATL_CD}'
                        `;
                        tRet4 = await prisma.$queryRaw(Prisma.raw(sql4));
                        var tStsInQty = 0;
                        if (tRet4.length > 0)
                            tStsInQty = parseFloat(tRet4[0].in_qty);
                        if (parseFloat(tStsInQty) >= parseFloat(tOne.PO_QTY))
                            tOne.PU_STATUS = 'End';
                        else tOne.PU_STATUS = '-';
                        console.log(
                            `${tStsInQty}/${tOne.PO_QTY}/${tOne.PU_STATUS}`,
                        );
                    }

                    tOne.SURCHARGE_PRICE = objStockMem2.SURCHARGE_PRICE;
                    tOne.SURCHARGE_AMT = objStockMem2.SURCHARGE_AMT;
                    tOne.SURCHARGE_REMARK = objStockMem2.SURCHARGE_REMARK;
                    tOne.PO_PRICE = objStockMem2.PO_PRICE;
                    if (parseFloat(tOne.PO_PRICE) <= 0)
                        tOne.PO_PRICE = tOne.MASTER_PRICE;
                    tOne.PU_CD = objStockMem2.PU_CD;
                    // if (retStockMem2.length  > 0)  tArray.push(tOne);
                    if (gVendorType === '4') {
                        // tOne.CURR_CD = 'USD';
                        tOne.PO_PRICE = '0';
                    }
                    if (tRet2.length > 0) tArray.push(tOne);
                }

                console.log(`stockmem2_fix:${retStockMem2_FIX.length}`);

                var tIdx8 = 0;
                for (tIdx8 = 0; tIdx8 < retStockMem2_FIX.length; tIdx8++) {
                    var tOne8_0 = { ...retStockMem2_FIX[tIdx8] };
                    var tOne8 = {};

                    tOne8.PO_CD = tOne.PO_CD;
                    tOne8.VENDOR_CD = tOne.VENDOR_CD;
                    tOne8.MATL_CD = tOne.MATL_CD;
                    tOne8.MATL_NAME = tOne.MATL_NAME;
                    tOne8.COLOR = tOne.COLOR;
                    tOne8.SPEC = tOne.SPEC;
                    tOne8.UNIT = tOne.UNIT;
                    tOne8.CURR_CD = tOne.CURR_CD;
                    tOne8.FACTORY_CD = tOne.FACTORY_CD;
                    tOne8.MASTER_PRICE = tOne8_0.MASTER_PRICE;
                    tOne8.PO_SEQ = tOne8_0.PO_SEQ;
                    tOne8.MRP_QTY = tOne8_0.PO_QTY;
                    tOne8.STOCK_QTY = tOne8_0.STOCK_QTY;
                    tOne8.MOQ_QTY = tOne8_0.MOQ;
                    tOne8.MRP_QTY2 = '0';
                    tOne8.PO_QTY = tOne8_0.PO_QTY2;
                    tOne8.DIFF_QTY = '0';
                    tOne8.PO_UPDATE_QTY = '0';
                    // tOne8.PU_STATUS = 'End';
                    tOne8.PU_STATUS = tOne.PU_STATUS;
                    tOne8.SURCHARGE_PRICE = tOne8_0.SURCHARGE_PRICE;
                    tOne8.SURCHARGE_AMT = tOne8_0.SURCHARGE_AMT;
                    tOne8.SURCHARGE_REMARK = tOne8_0.SURCHARGE_REMARK;
                    tOne8.PO_PRICE = tOne8_0.PO_PRICE;
                    if (parseFloat(tOne8.PO_PRICE) <= 0)
                        tOne8.PO_PRICE = tOne8.MASTER_PRICE;
                    tOne8.PU_CD = tOne8_0.PU_CD;
                    if (gVendorType === '4') {
                        // tOne8.CURR_CD = 'USD';
                        tOne8.PO_PRICE = '0';
                    }
                    tArray.push(tOne8);
                }
            }

            var tArray2 = [];
            tArray.forEach((col, i) => {
                var tCheck = 0;
                tArray2.forEach((col1, i1) => {
                    if (col.MATL_CD === col1.MATL_CD) {
                        var tObj2 = { ...col1 };
                        tObj2.MRP_QTY =
                            parseFloat(tObj2.MRP_QTY) + parseFloat(col.MRP_QTY);
                        tObj2.MRP_QTY2 =
                            parseFloat(tObj2.MRP_QTY2) +
                            parseFloat(col.MRP_QTY2);
                        tObj2.STOCK_QTY =
                            parseFloat(tObj2.STOCK_QTY) +
                            parseFloat(col.STOCK_QTY);
                        tObj2.MOQ_QTY =
                            parseFloat(tObj2.MOQ_QTY) + parseFloat(col.MOQ_QTY);
                        tObj2.PO_QTY =
                            parseFloat(tObj2.PO_QTY) + parseFloat(col.PO_QTY);
                        tObj2.DIFF_QTY =
                            parseFloat(tObj2.DIFF_QTY) +
                            parseFloat(col.DIFF_QTY);
                        tObj2.PO_UPDATE_QTY =
                            parseFloat(tObj2.PO_UPDATE_QTY) +
                            parseFloat(col.PO_UPDATE_QTY);
                        // tObj2.SURCHARGE_AMT = parseFloat(tObj2.SURCHARGE_AMT) + parseFloat(col.SURCHARGE_AMT);
                        tObj2.SURCHARGE_AMT = parseFloat(tObj2.SURCHARGE_AMT);
                        tObj2.PO_CD = `${tObj2.PO_CD}/${col.PO_CD}`;
                        tObj2.DATAS.push(col);
                        tArray2[i1] = { ...tObj2 };
                        tCheck = 1;
                    }
                });
                if (tCheck === 0) {
                    var tObj = { ...col };
                    tObj.DATAS = [];
                    tObj.DATAS.push(tObj);
                    tArray2.push(tObj);
                }
            });

            var tWObj = {};
            tWObj.STOCK_MEM = [...tArray2];

            tWObj.PU_MST = [];
            tWObj.PU_MST_NEW = [];

            var tOne1 = {};

            // tInput.PO_CD = po_cd/po_cd2/....
            var sqlPuMst2 = `
                select
                    a.*,
                    isnull(b.cd_name, '') as PAY_TYPE_N
                from
                    ksv_pu_mst2 a
                    left join kcd_code b on b.cd_group = 'pay_type'
                    and b.cd_code = a.pay_condition
                where
                    a.po_cd2 = '${tInput.PO_CD}'
                    and a.vendor_cd = '${tInput.VENDOR_CD}'
            `;
            var pumst2Obj = await prisma.$queryRaw(Prisma.raw(sqlPuMst2));
            if (pumst2Obj.length > 0) {
                tOne1.PU_CD = pumst2Obj[0].PU_CD;
                tWObj.PU_MST.push(pumst2Obj[0]);
            } else {
                tOne1.PU_CD = '';
            }

            var sqlVendor = `
                select
                    a.vendor_name,
                    a.vendor_matl_type,
                    a.vendor_type,
                    b.cd_name as vendor_type_n,
                    a.pay_term,
                    isnull(a.pay_type, '') as pay_type,
                    a.overshort_rate,
                    a.vendor_cd,
                    isnull(a.pay_type2, '') as pay_type2
                from
                    kcd_vendor a,
                    kcd_code b
                where
                    a.vendor_cd = '${tInput.VENDOR_CD}'
                    and b.cd_code = a.vendor_type
                    and b.cd_group = 'VENDOR_TYPE'
            `;
            var vendorObj = await prisma.$queryRaw(Prisma.raw(sqlVendor));
            tOne1.VENDOR_CD = vendorObj[0].vendor_cd;
            tOne1.VENDOR_NAME = vendorObj[0].vendor_name;
            tOne1.VENDOR_MATL_TYPE = vendorObj[0].vendor_matl_type;
            tOne1.VENDOR_TYPE = vendorObj[0].vendor_type;
            tOne1.VENDOR_TYPE_N = vendorObj[0].vendor_type_n;
            tOne1.PAY_TERM = vendorObj[0].pay_term;

            var tPuTypeCheck = 0;
            if (tOne1.PU_CD !== '') {
                var sqlPayType = `
                    select
                        *
                    from
                        kcd_code
                    where
                        cd_group = 'pay_type'
                        and cd_code = '${tOne1.PAY_CONDITION}'
                `;
                var retPayType = await prisma.$queryRaw(Prisma.raw(sqlPayType));
                if (retPayType.length > 0) {
                    tOne1.PAY_TYPE = retPayType[0].CD_NAME;
                    tOne1.PAY_TYPE_N = retPayType[0].CD_NAME;
                    tPuTypeCheck = 1;
                }
            }

            if (tPuTypeCheck === 0) {
                var sqlPayType = `
                    select
                        *
                    from
                        kcd_code
                    where
                        cd_group = 'pay_type'
                        and cd_code = '${vendorObj[0].pay_type2}'
                `;
                var retPayType = await prisma.$queryRaw(Prisma.raw(sqlPayType));
                if (retPayType.length <= 0) {
                    if (vendorObj[0].pay_type !== '') {
                        var sqlPayType1 = `
                            select
                                *
                            from
                                kcd_code
                            where
                                cd_group = 'pay_type'
                                and (
                                    cd_name like '%${vendorObj[0].pay_type}%'
                                    or cd_code like '%${vendorObj[0].pay_type}%'
                                )
                        `;
                        var retPayType1 = await prisma.$queryRaw(
                            Prisma.raw(sqlPayType1),
                        );
                        if (retPayType1.length > 0) {
                            tOne1.PAY_TYPE = vendorObj[0].pay_type;
                            tOne1.PAY_TYPE_N = vendorObj[0].pay_type;
                            tOne1.PAY_CONDITION = retPayType1[0].cd_code;
                        } else {
                            tOne1.PAY_TYPE = vendorObj[0].pay_type;
                            tOne1.PAY_TYPE_N = vendorObj[0].pay_type;
                            tOne1.PAY_CONDITION = '';
                        }
                    } else {
                        tOne1.PAY_TYPE = '';
                        tOne1.PAY_TYPE_N = '';
                        tOne1.PAY_CONDITION = '';
                    }
                } else {
                    tOne1.PAY_TYPE = retPayType[0].CD_NAME;
                    tOne1.PAY_TYPE_N = retPayType[0].CD_NAME;
                    tOne1.PAY_CONDITION = vendorObj[0].pay_type2;
                }
            }
            tOne1.OVERSHORT_RATE = vendorObj[0].overshort_rate;

            if (tInput.PU_CD2 !== '') {
                var tSql4 = `
                    select
                        pu_cd,
                        curr_cd,
                        pi_no,
                        order_date,
                        due_date,
                        ex_factory,
                        normi,
                        bill_to,
                        pay_date,
                        place_cd,
                        ship_to,
                        origin_port,
                        trade_term
                    from
                        ksv_pu_mst2
                    where
                        pu_cd = '${tInput.PU_CD2}'
                `;
                var tRet4 = await prisma.$queryRaw(Prisma.raw(tSql4));
                tOne1.P_PU_CD = tRet4[0].pu_cd;
                tOne1.P_CURR_CD = tRet4[0].curr_cd;
                tOne1.P_PI_NO = tRet4[0].pi_no;
                tOne1.P_ORDER_DATE = tRet4[0].order_date;
                tOne1.P_DUE_DATE = tRet4[0].due_date;
                tOne1.P_EX_FACTORY = tRet4[0].ex_factory;
                tOne1.P_NORMI = tRet4[0].normi;
                tOne1.P_BILL_TO = tRet4[0].bill_to;
                tOne1.P_PAY_DATE = tRet4[0].pay_date;
                tOne1.P_PLACE_CD = tRet4[0].place_cd;
                tOne1.P_SHIP_TO = tRet4[0].ship_to;
                tOne1.ORIGIN_PORT = tRet4[0].origin_port;
                tOne1.TRADE_TERM = tRet4[0].trade_term;

                var tSql6 = `
                    select
                        po_qty
                    from
                        ksv_pu_mem2
                    where
                        pu_cd = '${tInput.PU_CD2}'
                        and vendor_cd = '${tInput.VENDOR_CD}'
                        and po_cd = '${tInput.PO_CD}'
                        and pu_seq = (
                            select
                                max(pu_seq)
                            from
                                ksv_pu_mem2
                            where
                                pu_cd = '${tInput.PU_CD2}'
                                and po_cd = '${tInput.PO_CD}'
                        )
                `;
                var tRet6 = await prisma.$queryRaw(Prisma.raw(tSql6));
                tOne1.OLD_PO_QTY = 0;
                if (tRet6.length > 0) tOne1.OLD_PO_QTY = tRet6[0].po_qty;
            } else {
                tOne1.OLD_PO_QTY = 0;
                tOne1.P_PU_CD = '';
                tOne1.P_CURR_CD = '';
                tOne1.P_PI_NO = '';
                tOne1.P_ORDER_DATE = '';
                tOne1.P_DUE_DATE = '';
                tOne1.P_EX_FACTORY = '';
                tOne1.P_NORMI = '';
                tOne1.P_BILL_TO = '';
                tOne1.P_PAY_DATE = '';
                tOne1.P_PLACE_CD = '';
                tOne1.P_SHIP_TO = '';
                tOne1.ORIGIN_PORT = '';
                tOne1.TRADE_TERM = '';
                tOne1.OLD_PO_QTY = 0;
            }

            var tSql3 = `
                select
                    d.buyer_cd,
                    d.buyer_name,
                    left(a.reg_datetime, 8) as mrp_date,
                    a.plan_flag,
                    a.plan_etd,
                    a.plan_eta,
                    a.factory_cd,
                    e.factory_name,
                    max(c.due_date) as prod_due_date,
                    min(isnull(c.matl_due_date, '')) as matl_due_date
                from
                    ksv_po_mst a,
                    ksv_po_mem b,
                    ksv_order_mst c,
                    kcd_buyer d,
                    kcd_factory e
                where
                    a.po_cd in (${sqlPoCds})
                    and a.po_seq = 1
                    and a.po_cd = b.po_cd
                    and b.po_seq = 1
                    and b.order_cd = c.order_cd
                    and left(c.order_cd, 2) = d.buyer_cd
                    and a.factory_cd = e.factory_cd
                group by
                    d.buyer_cd,
                    d.buyer_name,
                    left(a.reg_datetime, 8),
                    a.plan_flag,
                    a.plan_etd,
                    a.plan_eta,
                    a.factory_cd,
                    e.factory_name
            `;
            var tRet3 = await prisma.$queryRaw(Prisma.raw(tSql3));
            if (tRet3.length > 0) {
                tOne1.BUYER_CD = tRet3[0].buyer_cd;
                tOne1.BUYER_NAME = tRet3[0].buyer_name;
                tOne1.MRP_DATE = tRet3[0].mrp_date;
                tOne1.PLAN_FLAG = tRet3[0].plan_flag;
                tOne1.PLAN_ETD = tRet3[0].plan_etd;
                tOne1.FACTORY_CD = tRet3[0].factory_cd;
                tOne1.FACTORY_NAME = tRet3[0].factory_name;
                tOne1.PROD_DUE_DATE = tRet3[0].prod_due_date;
                tOne1.MATL_DUE_DATE = tRet3[0].matl_due_date;
            }

            var tSql2 = `
                select
                    a.po_cd,
                    b.vendor_cd,
                    a.use_po_type,
                    sum(use_qty) as s_use_qty,
                    sum(po_qty) as s_po_qty
                from
                    ksv_po_mrp a,
                    kcd_matl_mst b
                where
                    a.po_cd in (${sqlPoCds})
                    and a.matl_cd = b.matl_cd
                    and b.vendor_cd = '${tInput.VENDOR_CD}'
                    -- and   a.use_po_type = '2'
                group by
                    a.po_cd,
                    b.vendor_cd,
                    a.use_po_type
            `;
            var tRet2 = await prisma.$queryRaw(Prisma.raw(tSql2));
            tRet2.forEach((col, i) => {
                if (col.use_po_type === '1') {
                    tOne1.MRP_QTY = String(col.s_use_qty);
                    tOne1.PO_QTY = String(col.s_po_qty);
                }
                if (col.use_po_type === '2') {
                    tOne1.STOCK_QTY = String(col.s_use_qty);
                }
            });
            tWObj.PU_MST_NEW.push(tOne1);

            return tWObj;
        },

        mgrQueryS040101_4_1_bak1: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }

            var sqlPoCds = '';
            var tPoCds = args.data.PO_CD.split('/');
            tPoCds.forEach((col, i) => {
                if (i === 0) sqlPoCds += `'${col}'`;
                else sqlPoCds += `,'${col}'`;
            });

            var tPuCd = '';
            if (typeof args.data.PU_CD2 !== 'undefined') {
                tPuCd = args.data.PU_CD2;
            }

            var tInput = { ...args.data };
            if (typeof tInput.PU_CD2 === 'undefined') tInput.PU_CD2 = '';
            if (typeof tInput.MATL_TYPE === 'undefined') tInput.MATL_TYPE = '';

            let sqlStr = `
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
                            A5.FACTORY_CD,
                            A1.USE_PO_TYPE,
                            A1.DIFF_PO_TYPE,
                            max(A4.MATL_PRICE) AS MASTER_PRICE,
                            sum(A1.USE_QTY) AS USE_QTY,
                            sum(A1.PO_QTY) AS PO_QTY,
                            max(A1.PO_SEQ) AS PO_SEQ
                        FROM
                            KSV_PO_MRP A1,
                            KCD_MATL_MST A3,
                            KCD_MATL_MEM A4,
                            KSV_ORDER_MST A5,
                            KSV_PO_MST A6
                        WHERE
                            A1.PO_CD IN (${sqlPoCds})
                            AND A1.PO_CD = A6.PO_CD
                            AND A1.PO_SEQ = A6.PO_SEQ
                            AND A6.PO_STATUS = '4'
                            AND A1.ORDER_CD = A5.ORDER_CD
                            AND (
                                A1.PO_SEQ < 97
                                OR A1.PO_SEQ > 100
                            )
                            AND LEFT(A1.ORDER_CD, 2) = '${args.data.BUYER_CD}'
                            AND A1.MATL_CD = A3.MATL_CD
                            AND A3.VENDOR_CD = '${args.data.VENDOR_CD}'
                            AND A1.MATL_CD = A4.MATL_CD
                            AND A4.MATL_SEQ = (
                                select
                                    max(matl_seq) as matl_seq
                                from
                                    kcd_matl_mem
                                where
                                    matl_cd = A1.MATL_CD
                            )
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
                            A1.DIFF_PO_TYPE
                    ) K
                order by
                    K.PO_CD,
                    K.VENDOR_CD,
                    K.MATL_CD
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

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
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tOne = { ...tRet[tIdx] };
                if (tIdx === 0 || tOne.MATL_CD !== tWorkObj.MATL_CD) {
                    if (tIdx > 0) tMatlArray.push(tWorkObj);
                    tWorkObj = { ...tOne };
                    tWorkObj.MRP_QTY = 0;
                    tWorkObj.STOCK_QTY = 0;
                    tWorkObj.PO_QTY = 0;
                    tWorkObj.MOQ_QTY = 0;
                    tWorkObj.FOC_QTY = 0;
                    tWorkObj.OVER_QTY = 0;

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
                    tWorkObj.C_SURCHARGE_AMT = 0;
                    tWorkObj.C_SURCHARGE_REMARK = '';
                }

                if (
                    tOne.USE_PO_TYPE === '1' &&
                    (tOne.DIFF_PO_TYPE === '0' || tOne.DIFF_PO_TYPE === '3')
                ) {
                    // Order, Order Add
                    tWorkObj.MRP_QTY += parseInt(tOne.USE_QTY);
                    tWorkObj.PO_QTY += parseInt(tOne.PO_QTY);
                }
                if (tOne.USE_PO_TYPE === '1' && tOne.DIFF_PO_TYPE === '2') {
                    // Order- cancel
                    tWorkObj.MRP_QTY += parseInt(tOne.USE_QTY);
                    tWorkObj.PO_QTY += parseInt(tOne.PO_QTY);
                }
                if (tOne.USE_PO_TYPE === '1' && tOne.DIFF_PO_TYPE === '1') {
                    // Order - OverIn/Out
                    tWorkObj.MRP_QTY += parseInt(tOne.USE_QTY);
                    tWorkObj.PO_QTY += parseInt(tOne.PO_QTY);
                }
                if (tOne.USE_PO_TYPE === '2' && tOne.DIFF_PO_TYPE === '0') {
                    // Stock Use
                    tWorkObj.STOCK_QTY += parseInt(tOne.USE_QTY);
                }
                if (tOne.USE_PO_TYPE === '2' && tOne.DIFF_PO_TYPE === '5') {
                    // Stock Use  - cancel
                    tWorkObj.MRP_QTY += parseInt(tOne.USE_QTY);
                    tWorkObj.PO_QTY += parseInt(tOne.PO_QTY);
                }
            }
            tMatlArray.push(tWorkObj);
            console.log(` ====>(MatlArray.length) ${tMatlArray.length}`);

            var tMatlArray1 = [];
            for (tIdx = 0; tIdx < tMatlArray.length; tIdx++) {
                var tOne = { ...tMatlArray[tIdx] };
                var sql0 = `
                    select
                        po_seq,
                        sum(use_qty) as use_qty
                    from
                        ksv_po_mrp
                    where
                        po_cd = '${tOne.PO_CD}'
                        and matl_cd = '${tOne.MATL_CD}'
                        and po_seq in (97, 98, 99)
                    group by
                        po_seq
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));

                if (tRet0.length > 0) {
                    tRet0.forEach((col, i) => {
                        if (col.po_seq === 97)
                            tOne.FOC_QTY = parseInt(col.use_qty);
                        if (col.po_seq === 98)
                            tOne.OVER_QTY = parseInt(col.use_qty);
                        if (col.po_seq === 99)
                            tOne.MOQ_QTY = parseInt(col.use_qty);
                    });
                }
                console.log(
                    ` ====>(MatlArray Data) ${tOne.MATL_CD} / ${tOne.MRP_QTY} / ${tOne.PO_QTY} / ${tOne.STOCK_QTY} `,
                );
                tMatlArray1.push(tOne);
            }
            console.log(` ====>(MatlArray1.length) ${tMatlArray1.length}`);

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
                    if (col.C_STSIN_CD !== '')
                        tEndMrpQty += parseInt(col.MRP_QTY);
                    else tCurrMrpQty += parseInt(col.MRP_QTY);
                });
                console.log(` ====>(MatlArray2.Data.lenght) ${tRet0.length}`);

                var tCheck1 = 0;
                var tLastEndObj = {};
                var tSumMrpQty = 0;

                tRet0.forEach((col, i) => {
                    tOne.C_PU_CD = col.PU_CD;
                    tOne.C_STSIN_CD = col.STSIN_CD;
                    tOne.C_PO_PRICE = col.PO_PRICE;
                    tOne.C_MASTER_PRICE = col.MASTER_PRICE;
                    tOne.C_MRP_QTY = col.MRP_QTY;
                    tOne.C_STOCK_QTY = col.STOCK_QTY;
                    tOne.C_PO_QTY = col.PO_QTY;
                    tOne.C_MOQ_QTY = col.MOQ_QTY;
                    tOne.C_FOC_QTY = 0;
                    tOne.C_OVER_QTY = col.OVER_QTY;
                    tOne.C_SURCHARGE_PRICE = col.SURCHARGE_PRICE;
                    tOne.C_SURCHARGE_AMT = col.SURCHARGE_AMT;
                    tOne.C_SURCHARGE_REMARK = col.SURCHARGE_REMARK;
                    tOne.C_PU_STATUS = '';
                    if (tOne.C_STSIN_CD !== '') {
                        tOne.C_PU_STATUS = 'End';
                        tLastEndObj = { ...tOne };
                        tSumMrpQty += parseFloat(tOne.C_MRP_QTY);
                    } else {
                        tCheck1 = 1;
                        if (
                            parseFloat(tOne.MRP_QTY) !==
                            tEndMrpQty + tCurrMrpQty
                        )
                            tOne.C_PU_STATUS = 'Update';
                        tSumMrpQty += parseFloat(tOne.C_MRP_QTY);
                    }
                    console.log(
                        ` ====>(MatlArray2.Record)(step-1) ${tOne.MATL_CD}/${tOne.C_PU_CD}/${tOne.C_STSIN_CD}/${tOne.C_PU_STATUS}`,
                    );
                    tMatlArray2.push(tOne);
                });

                console.log(
                    ` ====>(MatlArray2.Check) ${tCheck1}/${tOne.MRP_QTY}/${tSumMrpQty}`,
                );

                // if (tCheck1 === 0 && parseFloat(tOne.MRP_QTY) !== tSumMrpQty) {
                if (tCheck1 === 0 && parseFloat(tOne.MRP_QTY) > tSumMrpQty) {
                    tOne.MRP_QTY =
                        parseFloat(tOne.MRP_QTY) - (tEndMrpQty + tCurrMrpQty);
                    if (
                        typeof tLastEndObj.C_MOQ_QTY !== 'undefined' &&
                        parseFloat(tLastEndObj.C_MOQ_QTY) > 0
                    ) {
                        if (
                            parseFloat(tLastEndObj.C_MOQ_QTY) >
                            parseFloat(tOne.MRP_QTY)
                        ) {
                            tOne.STOCK_QTY = tOne.MRP_QTY;
                            tOne.PO_QTY = 0;
                        } else {
                            tOne.STOCK_QTY = parseFloat(tOne.MOQ_QTY);
                            tOne.PO_QTY =
                                parseFloat(tOne.MRP_QTY) -
                                parseFloat(tOne.MOQ_QTY);
                        }
                    }
                    tOne.MOQ_QTY = 0;
                    tOne.FOC_QTY = 0;
                    tOne.OVER_QTY = 0;
                    tOne.C_PU_STATUS = 'New';
                    tMatlArray2.push(tOne);
                    console.log(
                        ` ====>(MatlArray2.Record)(step-2) ${tOne.MATL_CD}/${tOne.C_PU_CD}/${tOne.C_STSIN_CD}/${tOne.C_PU_STATUS}`,
                    );
                }
            }

            var tDataArray = [];
            for (tIdx = 0; tIdx < tMatlArray2.length; tIdx++) {
                var tOne = { ...tMatlArray2[tIdx] };

                console.log(` ====> ${tOne.C_PU_CD}/${tOne.C_PU_STATUS}`);

                if (tOne.C_PU_CD === '') {
                    // 완전 신규
                    var tOne8 = {};
                    tOne8.PO_CD = tOne.PO_CD;
                    tOne8.VENDOR_CD = tOne.VENDOR_CD;
                    tOne8.MATL_CD = tOne.MATL_CD;
                    tOne8.MATL_NAME = tOne.MATL_NAME;
                    tOne8.COLOR = tOne.COLOR;
                    tOne8.SPEC = tOne.SPEC;
                    tOne8.UNIT = tOne.UNIT;
                    tOne8.CURR_CD = tOne.CURR_CD;
                    tOne8.FACTORY_CD = tOne.FACTORY_CD;
                    tOne8.MASTER_PRICE = String(tOne.MASTER_PRICE);
                    tOne8.PO_SEQ = String(tOne.PO_SEQ);
                    tOne8.MRP_QTY = String(tOne.MRP_QTY);
                    tOne8.STOCK_QTY = String(tOne.STOCK_QTY);
                    tOne8.MOQ_QTY = String(tOne.MOQ_QTY);
                    tOne8.MRP_QTY2 = '0';
                    tOne8.PO_QTY = String(tOne.PO_QTY);
                    tOne8.DIFF_QTY = '0';
                    tOne8.PO_UPDATE_QTY = '0';
                    tOne8.PU_STATUS = 'New';
                    tOne8.SURCHARGE_PRICE = '0';
                    tOne8.SURCHARGE_AMT = '0';
                    tOne8.SURCHARGE_REMARK = '0';
                    tOne8.PO_PRICE = String(tOne.C_PO_PRICE);
                    tOne8.PU_CD = '';
                    if (gVendorType === '4') {
                        // tOne8.CURR_CD = 'USD';
                        tOne8.PO_PRICE = '0';
                    }
                    tDataArray.push(tOne8);
                } else if (tOne.C_PU_CD !== '' && tOne.C_PU_STATUS === 'New') {
                    // End후 신규
                    var tOne8 = {};
                    tOne8.PO_CD = tOne.PO_CD;
                    tOne8.VENDOR_CD = tOne.VENDOR_CD;
                    tOne8.MATL_CD = tOne.MATL_CD;
                    tOne8.MATL_NAME = tOne.MATL_NAME;
                    tOne8.COLOR = tOne.COLOR;
                    tOne8.SPEC = tOne.SPEC;
                    tOne8.UNIT = tOne.UNIT;
                    tOne8.CURR_CD = tOne.CURR_CD;
                    tOne8.FACTORY_CD = tOne.FACTORY_CD;
                    tOne8.MASTER_PRICE = String(tOne.MASTER_PRICE);
                    tOne8.PO_SEQ = tOne.PO_SEQ;
                    tOne8.MRP_QTY = String(tOne.MRP_QTY);
                    tOne8.STOCK_QTY = String(tOne.STOCK_QTY);
                    tOne8.MOQ_QTY = String(tOne.MOQ_QTY);
                    tOne8.MRP_QTY2 = '0';

                    var tPoQty =
                        parseFloat(tOne.MRP_QTY) -
                        parseFloat(tOne.STOCK_QTY) -
                        parseFloat(tOne.MOQ_QTY);
                    tOne8.PO_QTY = String(tPoQty);

                    tOne8.DIFF_QTY = '0';
                    tOne8.PO_UPDATE_QTY = '0';
                    tOne8.PU_STATUS = 'New';
                    tOne8.SURCHARGE_PRICE = String(tOne.C_SURCHARGE_PRICE);
                    tOne8.SURCHARGE_AMT = String(tOne.C_SURCHARGE_AMT);
                    tOne8.SURCHARGE_REMARK = tOne.C_SURCHARGE_REMARK;
                    tOne8.PO_PRICE = String(tOne.C_PO_PRICE);
                    tOne8.PU_CD = tOne.C_PU_CD;
                    if (gVendorType === '4') {
                        // tOne8.CURR_CD = 'USD';
                        tOne8.PO_PRICE = '0';
                    }
                    tDataArray.push(tOne8);
                } else if (
                    tOne.C_PU_CD !== '' &&
                    tOne.C_PU_STATUS === 'Update'
                ) {
                    // Update
                    var tOne8 = {};
                    tOne8.PO_CD = tOne.PO_CD;
                    tOne8.VENDOR_CD = tOne.VENDOR_CD;
                    tOne8.MATL_CD = tOne.MATL_CD;
                    tOne8.MATL_NAME = tOne.MATL_NAME;
                    tOne8.COLOR = tOne.COLOR;
                    tOne8.SPEC = tOne.SPEC;
                    tOne8.UNIT = tOne.UNIT;
                    tOne8.CURR_CD = tOne.CURR_CD;
                    tOne8.FACTORY_CD = tOne.FACTORY_CD;
                    tOne8.MASTER_PRICE = String(tOne.MASTER_PRICE);
                    tOne8.PO_SEQ = tOne.PO_SEQ;
                    tOne8.MRP_QTY = String(tOne.MRP_QTY);
                    tOne8.STOCK_QTY = String(tOne.STOCK_QTY);

                    if (parseFloat(tOne.C_MOQ_QTY) > 0)
                        tOne8.MOQ_QTY = tOne.C_MOQ_QTY;
                    tOne8.MOQ_QTY = String(tOne.MOQ_QTY);
                    tOne8.MRP_QTY2 = '0';

                    tOne8.PO_QTY = tOne.C_PO_QTY;

                    var tNewPoQty =
                        parseFloat(tOne8.MRP_QTY) -
                        parseFloat(tOne8.STOCK_QTY) -
                        parseFloat(tOne8.MOQ_QTY);
                    var tDiffQty =
                        parseFloat(tNewPoQty) - parseFloat(tOne8.PO_QTY);

                    tOne8.DIFF_QTY = String(tDiffQty);
                    tOne8.PO_UPDATE_QTY = String(tNewPoQty);
                    tOne8.PU_STATUS = 'Update';
                    tOne8.SURCHARGE_PRICE = String(tOne.C_SURCHARGE_PRICE);
                    tOne8.SURCHARGE_AMT = String(tOne.C_SURCHARGE_AMT);
                    tOne8.SURCHARGE_REMARK = tOne.C_SURCHARGE_REMARK;
                    tOne8.PO_PRICE = String(tOne.C_PO_PRICE);
                    tOne8.PU_CD = tOne.C_PU_CD;
                    if (gVendorType === '4') {
                        // tOne8.CURR_CD = 'USD';
                        tOne8.PO_PRICE = '0';
                    }
                    tDataArray.push(tOne8);
                } else if (
                    tOne.C_PU_CD !== '' &&
                    (tOne.C_PU_STATUS === 'End' || tOne.C_PU_STATUS === '')
                ) {
                    var tOne8 = {};
                    tOne8.PO_CD = tOne.PO_CD;
                    tOne8.VENDOR_CD = tOne.VENDOR_CD;
                    tOne8.MATL_CD = tOne.MATL_CD;
                    tOne8.MATL_NAME = tOne.MATL_NAME;
                    tOne8.COLOR = tOne.COLOR;
                    tOne8.SPEC = tOne.SPEC;
                    tOne8.UNIT = tOne.UNIT;
                    tOne8.CURR_CD = tOne.CURR_CD;
                    tOne8.FACTORY_CD = tOne.FACTORY_CD;
                    tOne8.MASTER_PRICE = String(tOne.MASTER_PRICE);
                    tOne8.PO_SEQ = tOne.PO_SEQ;

                    tOne8.MRP_QTY = tOne.MRP_QTY;
                    if (parseFloat(tOne.C_MRP_QTY) <= parseFloat(tOne.MRP_QTY))
                        tOne8.MRP_QTY = String(tOne.C_MRP_QTY);

                    tOne8.STOCK_QTY = tOne.STOCK_QTY;
                    if (
                        parseFloat(tOne.C_STOCK_QTY) <=
                        parseFloat(tOne.STOCK_QTY)
                    )
                        tOne8.STOCK_QTY = String(tOne.C_STOCK_QTY);

                    tOne8.MOQ_QTY = tOne.MOQ_QTY;
                    if (parseFloat(tOne.C_MOQ_QTY) <= parseFloat(tOne.MOQ_QTY))
                        tOne8.MOQ_QTY = String(tOne.C_MOQ_QTY);

                    tOne8.MRP_QTY2 = '0';

                    tOne8.PO_QTY = tOne.PO_QTY;
                    if (parseFloat(tOne.C_PO_QTY) <= parseFloat(tOne.PO_QTY))
                        tOne8.PO_QTY = String(tOne.C_PO_QTY);

                    tOne8.DIFF_QTY = '0';
                    tOne8.PO_UPDATE_QTY = '0';
                    tOne8.PU_STATUS = tOne.C_PU_STATUS;
                    tOne8.SURCHARGE_PRICE = String(tOne.C_SURCHARGE_PRICE);
                    tOne8.SURCHARGE_AMT = String(tOne.C_SURCHARGE_AMT);
                    tOne8.SURCHARGE_REMARK = tOne.C_SURCHARGE_REMARK;
                    tOne8.PO_PRICE = String(tOne.C_PO_PRICE);
                    tOne8.PU_CD = tOne.C_PU_CD;
                    if (gVendorType === '4') {
                        // tOne8.CURR_CD = 'USD';
                        tOne8.PO_PRICE = '0';
                    }
                    tDataArray.push(tOne8);
                }
            }

            var tArray2 = [];
            tDataArray.forEach((col, i) => {
                var tCheck = 0;
                tArray2.forEach((col1, i1) => {
                    if (col.MATL_CD === col1.MATL_CD) {
                        var tObj2 = { ...col1 };
                        tObj2.MRP_QTY =
                            parseFloat(tObj2.MRP_QTY) + parseFloat(col.MRP_QTY);
                        tObj2.MRP_QTY2 =
                            parseFloat(tObj2.MRP_QTY2) +
                            parseFloat(col.MRP_QTY2);
                        tObj2.STOCK_QTY =
                            parseFloat(tObj2.STOCK_QTY) +
                            parseFloat(col.STOCK_QTY);
                        tObj2.MOQ_QTY =
                            parseFloat(tObj2.MOQ_QTY) + parseFloat(col.MOQ_QTY);
                        tObj2.PO_QTY =
                            parseFloat(tObj2.PO_QTY) + parseFloat(col.PO_QTY);
                        tObj2.DIFF_QTY =
                            parseFloat(tObj2.DIFF_QTY) +
                            parseFloat(col.DIFF_QTY);
                        tObj2.PO_UPDATE_QTY =
                            parseFloat(tObj2.PO_UPDATE_QTY) +
                            parseFloat(col.PO_UPDATE_QTY);
                        tObj2.SURCHARGE_AMT =
                            parseFloat(tObj2.SURCHARGE_AMT) +
                            parseFloat(col.SURCHARGE_AMT);
                        tObj2.PO_CD = `${tObj2.PO_CD}/${col.PO_CD}`;
                        tObj2.DATAS.push(col);
                        tArray2[i1] = { ...tObj2 };
                        tCheck = 1;
                    }
                });
                if (tCheck === 0) {
                    var tObj = { ...col };
                    tObj.DATAS = [];
                    tObj.DATAS.push(tObj);
                    tArray2.push(tObj);
                }
            });

            tArray2.forEach((tOne, i) => {
                console.log(
                    ` ++++++>>>${tOne.PU_CD}/${tOne.PU_STATUS}/${tOne.MATL_CD}/${tOne.MRP_QTY}/${tOne.STOCK_QTY}/${tOne.MOQ_QTY}/${tOne.PO_QTY}`,
                );
            });

            var tWObj = {};
            tWObj.STOCK_MEM = [...tArray2];

            tWObj.PU_MST = [];
            tWObj.PU_MST_NEW = [];

            var tOne1 = {};

            // tInput.PO_CD = po_cd/po_cd2/....
            var sqlPuMst2 = `
                select
                    a.*,
                    isnull(b.cd_name, '') as PAY_TYPE_N
                from
                    ksv_pu_mst2 a
                    left join kcd_code b on b.cd_group = 'pay_type'
                    and b.cd_code = a.pay_condition
                where
                    a.po_cd2 = '${tInput.PO_CD}'
                    and a.vendor_cd = '${tInput.VENDOR_CD}'
            `;
            var pumst2Obj = await prisma.$queryRaw(Prisma.raw(sqlPuMst2));
            if (pumst2Obj.length > 0) {
                tOne1.PU_CD = pumst2Obj[0].PU_CD;
                tWObj.PU_MST.push(pumst2Obj[0]);
            } else {
                tOne1.PU_CD = '';
            }

            var sqlVendor = `
                select
                    a.vendor_name,
                    a.vendor_matl_type,
                    a.vendor_type,
                    b.cd_name as vendor_type_n,
                    a.pay_term,
                    isnull(a.pay_type, '') as pay_type,
                    a.overshort_rate,
                    a.vendor_cd,
                    isnull(a.pay_type2, '') as pay_type2
                from
                    kcd_vendor a,
                    kcd_code b
                where
                    a.vendor_cd = '${tInput.VENDOR_CD}'
                    and b.cd_code = a.vendor_type
                    and b.cd_group = 'VENDOR_TYPE'
            `;
            var vendorObj = await prisma.$queryRaw(Prisma.raw(sqlVendor));
            tOne1.VENDOR_CD = vendorObj[0].vendor_cd;
            tOne1.VENDOR_NAME = vendorObj[0].vendor_name;
            tOne1.VENDOR_MATL_TYPE = vendorObj[0].vendor_matl_type;
            tOne1.VENDOR_TYPE = vendorObj[0].vendor_type;
            tOne1.VENDOR_TYPE_N = vendorObj[0].vendor_type_n;
            tOne1.PAY_TERM = vendorObj[0].pay_term;

            var tPuTypeCheck = 0;
            if (tOne1.PU_CD !== '') {
                var sqlPayType = `
                    select
                        *
                    from
                        kcd_code
                    where
                        cd_group = 'pay_type'
                        and cd_code = '${tOne1.PAY_CONDITION}'
                `;
                var retPayType = await prisma.$queryRaw(Prisma.raw(sqlPayType));
                if (retPayType.length > 0) {
                    tOne1.PAY_TYPE = retPayType[0].CD_NAME;
                    tOne1.PAY_TYPE_N = retPayType[0].CD_NAME;
                    tPuTypeCheck = 1;
                }
            }

            if (tPuTypeCheck === 0) {
                var sqlPayType = `
                    select
                        *
                    from
                        kcd_code
                    where
                        cd_group = 'pay_type'
                        and cd_code = '${vendorObj[0].pay_type2}'
                `;
                var retPayType = await prisma.$queryRaw(Prisma.raw(sqlPayType));
                if (retPayType.length <= 0) {
                    if (vendorObj[0].pay_type !== '') {
                        var sqlPayType1 = `
                            select
                                *
                            from
                                kcd_code
                            where
                                cd_group = 'pay_type'
                                and (
                                    cd_name like '%${vendorObj[0].pay_type}%'
                                    or cd_code like '%${vendorObj[0].pay_type}%'
                                )
                        `;
                        var retPayType1 = await prisma.$queryRaw(
                            Prisma.raw(sqlPayType1),
                        );
                        if (retPayType1.length > 0) {
                            tOne1.PAY_TYPE = vendorObj[0].pay_type;
                            tOne1.PAY_TYPE_N = vendorObj[0].pay_type;
                            tOne1.PAY_CONDITION = retPayType1[0].cd_code;
                        } else {
                            tOne1.PAY_TYPE = vendorObj[0].pay_type;
                            tOne1.PAY_TYPE_N = vendorObj[0].pay_type;
                            tOne1.PAY_CONDITION = '';
                        }
                    } else {
                        tOne1.PAY_TYPE = '';
                        tOne1.PAY_TYPE_N = '';
                        tOne1.PAY_CONDITION = '';
                    }
                } else {
                    tOne1.PAY_TYPE = retPayType[0].CD_NAME;
                    tOne1.PAY_TYPE_N = retPayType[0].CD_NAME;
                    tOne1.PAY_CONDITION = vendorObj[0].pay_type2;
                }
            }
            tOne1.OVERSHORT_RATE = vendorObj[0].overshort_rate;

            if (tInput.PU_CD2 !== '') {
                var tSql4 = `
                    select
                        pu_cd,
                        curr_cd,
                        pi_no,
                        order_date,
                        due_date,
                        ex_factory,
                        normi,
                        bill_to,
                        pay_date,
                        place_cd,
                        ship_to,
                        origin_port,
                        trade_term
                    from
                        ksv_pu_mst2
                    where
                        pu_cd = '${tInput.PU_CD2}'
                `;
                var tRet4 = await prisma.$queryRaw(Prisma.raw(tSql4));
                tOne1.P_PU_CD = tRet4[0].pu_cd;
                tOne1.P_CURR_CD = tRet4[0].curr_cd;
                tOne1.P_PI_NO = tRet4[0].pi_no;
                tOne1.P_ORDER_DATE = tRet4[0].order_date;
                tOne1.P_DUE_DATE = tRet4[0].due_date;
                tOne1.P_EX_FACTORY = tRet4[0].ex_factory;
                tOne1.P_NORMI = tRet4[0].normi;
                tOne1.P_BILL_TO = tRet4[0].bill_to;
                tOne1.P_PAY_DATE = tRet4[0].pay_date;
                tOne1.P_PLACE_CD = tRet4[0].place_cd;
                tOne1.P_SHIP_TO = tRet4[0].ship_to;
                tOne1.ORIGIN_PORT = tRet4[0].origin_port;
                tOne1.TRADE_TERM = tRet4[0].trade_term;

                var tSql6 = `
                    select
                        po_qty
                    from
                        ksv_pu_mem2
                    where
                        pu_cd = '${tInput.PU_CD2}'
                        and vendor_cd = '${tInput.VENDOR_CD}'
                        and po_cd = '${tInput.PO_CD}'
                        and pu_seq = (
                            select
                                max(pu_seq)
                            from
                                ksv_pu_mem2
                            where
                                pu_cd = '${tInput.PU_CD2}'
                                and po_cd = '${tInput.PO_CD}'
                        )
                `;
                var tRet6 = await prisma.$queryRaw(Prisma.raw(tSql6));
                tOne1.OLD_PO_QTY = 0;
                if (tRet6.length > 0) tOne1.OLD_PO_QTY = tRet6[0].po_qty;
            } else {
                tOne1.OLD_PO_QTY = 0;
                tOne1.P_PU_CD = '';
                tOne1.P_CURR_CD = '';
                tOne1.P_PI_NO = '';
                tOne1.P_ORDER_DATE = '';
                tOne1.P_DUE_DATE = '';
                tOne1.P_EX_FACTORY = '';
                tOne1.P_NORMI = '';
                tOne1.P_BILL_TO = '';
                tOne1.P_PAY_DATE = '';
                tOne1.P_PLACE_CD = '';
                tOne1.P_SHIP_TO = '';
                tOne1.ORIGIN_PORT = '';
                tOne1.TRADE_TERM = '';
                tOne1.OLD_PO_QTY = 0;
            }

            var tSql3 = `
                select
                    d.buyer_cd,
                    d.buyer_name,
                    left(a.reg_datetime, 8) as mrp_date,
                    a.plan_flag,
                    a.plan_etd,
                    a.plan_eta,
                    a.factory_cd,
                    e.factory_name,
                    max(c.due_date) as prod_due_date,
                    min(isnull(c.matl_due_date, '')) as matl_due_date
                from
                    ksv_po_mst a,
                    ksv_po_mem b,
                    ksv_order_mst c,
                    kcd_buyer d,
                    kcd_factory e
                where
                    a.po_cd in (${sqlPoCds})
                    and a.po_seq = 1
                    and a.po_cd = b.po_cd
                    and b.po_seq = 1
                    and b.order_cd = c.order_cd
                    and left(c.order_cd, 2) = d.buyer_cd
                    and a.factory_cd = e.factory_cd
                group by
                    d.buyer_cd,
                    d.buyer_name,
                    left(a.reg_datetime, 8),
                    a.plan_flag,
                    a.plan_etd,
                    a.plan_eta,
                    a.factory_cd,
                    e.factory_name
            `;
            var tRet3 = await prisma.$queryRaw(Prisma.raw(tSql3));
            if (tRet3.length > 0) {
                tOne1.BUYER_CD = tRet3[0].buyer_cd;
                tOne1.BUYER_NAME = tRet3[0].buyer_name;
                tOne1.MRP_DATE = tRet3[0].mrp_date;
                tOne1.PLAN_FLAG = tRet3[0].plan_flag;
                tOne1.PLAN_ETD = tRet3[0].plan_etd;
                tOne1.FACTORY_CD = tRet3[0].factory_cd;
                tOne1.FACTORY_NAME = tRet3[0].factory_name;
                tOne1.PROD_DUE_DATE = tRet3[0].prod_due_date;
                tOne1.MATL_DUE_DATE = tRet3[0].matl_due_date;
            }

            var tSql2 = `
                select
                    a.po_cd,
                    b.vendor_cd,
                    a.use_po_type,
                    sum(use_qty) as s_use_qty,
                    sum(po_qty) as s_po_qty
                from
                    ksv_po_mrp a,
                    kcd_matl_mst b
                where
                    a.po_cd in (${sqlPoCds})
                    and a.matl_cd = b.matl_cd
                    and b.vendor_cd = '${tInput.VENDOR_CD}'
                    -- and   a.use_po_type = '2'
                group by
                    a.po_cd,
                    b.vendor_cd,
                    a.use_po_type
            `;
            var tRet2 = await prisma.$queryRaw(Prisma.raw(tSql2));
            tRet2.forEach((col, i) => {
                if (col.use_po_type === '1') {
                    tOne1.MRP_QTY = String(col.s_use_qty);
                    tOne1.PO_QTY = String(col.s_po_qty);
                }
                if (col.use_po_type === '2') {
                    tOne1.STOCK_QTY = String(col.s_use_qty);
                }
            });
            tWObj.PU_MST_NEW.push(tOne1);

            return tWObj;
        },
        mgrQueryS040101_4_1_bak2: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }

            var sqlPoCds = '';
            var tPoCds = args.data.PO_CD.split('/');
            tPoCds.forEach((col, i) => {
                if (i === 0) sqlPoCds += `'${col}'`;
                else sqlPoCds += `,'${col}'`;
            });

            var tPuCd = '';
            if (typeof args.data.PU_CD2 !== 'undefined') {
                tPuCd = args.data.PU_CD2;
            }

            var tInput = { ...args.data };
            if (typeof tInput.PU_CD2 === 'undefined') tInput.PU_CD2 = '';
            if (typeof tInput.MATL_TYPE === 'undefined') tInput.MATL_TYPE = '';

            let sqlStr = `
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
                            A5.FACTORY_CD,
                            A1.USE_PO_TYPE,
                            A1.DIFF_PO_TYPE,
                            max(A4.MATL_PRICE) AS MASTER_PRICE,
                            sum(A1.USE_QTY) AS USE_QTY,
                            sum(A1.PO_QTY) AS PO_QTY,
                            max(A1.PO_SEQ) AS PO_SEQ
                        FROM
                            KSV_PO_MRP A1,
                            KCD_MATL_MST A3,
                            KCD_MATL_MEM A4,
                            KSV_ORDER_MST A5,
                            KSV_PO_MST A6
                        WHERE
                            A1.PO_CD IN (${sqlPoCds})
                            AND A1.PO_CD = A6.PO_CD
                            AND A1.PO_SEQ = A6.PO_SEQ
                            AND A6.PO_STATUS = '4'
                            AND A1.ORDER_CD = A5.ORDER_CD
                            AND (
                                A1.PO_SEQ < 97
                                OR A1.PO_SEQ > 100
                            )
                            AND LEFT(A1.ORDER_CD, 2) = '${args.data.BUYER_CD}'
                            AND A1.MATL_CD = A3.MATL_CD
                            AND A3.VENDOR_CD = '${args.data.VENDOR_CD}'
                            AND A1.MATL_CD = A4.MATL_CD
                            AND A4.MATL_SEQ = (
                                select
                                    max(matl_seq) as matl_seq
                                from
                                    kcd_matl_mem
                                where
                                    matl_cd = A1.MATL_CD
                            )
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
                            A1.DIFF_PO_TYPE
                    ) K
                order by
                    K.VENDOR_CD,
                    K.MATL_CD,
                    k.PO_CD
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

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
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tOne = { ...tRet[tIdx] };
                if (tIdx === 0 || tOne.MATL_CD !== tWorkObj.MATL_CD) {
                    if (tIdx > 0) tMatlArray.push(tWorkObj);
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
                    tWorkObj.StOCK_MEM_PO_QTY = 0;
                    tWorkObj.StOCK_MEM_IN_QTY = 0;

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
                    tWorkObj.MRP_QTY += parseInt(tOne.USE_QTY);
                    tWorkObj.PO_QTY += parseInt(tOne.PO_QTY);
                }
                if (tOne.USE_PO_TYPE === '1' && tOne.DIFF_PO_TYPE === '2') {
                    // Order- cancel
                    tWorkObj.MRP_QTY += parseInt(tOne.USE_QTY);
                    tWorkObj.PO_QTY += parseInt(tOne.PO_QTY);
                }
                if (tOne.USE_PO_TYPE === '1' && tOne.DIFF_PO_TYPE === '1') {
                    // Order - OverIn/Out
                    tWorkObj.MRP_QTY += parseInt(tOne.USE_QTY);
                    tWorkObj.PO_QTY += parseInt(tOne.PO_QTY);
                }
                if (tOne.USE_PO_TYPE === '2' && tOne.DIFF_PO_TYPE === '0') {
                    // Stock Use
                    tWorkObj.STOCK_QTY += parseInt(tOne.USE_QTY);
                }
                if (tOne.USE_PO_TYPE === '2' && tOne.DIFF_PO_TYPE === '5') {
                    // Stock Use  - cancel
                    tWorkObj.MRP_QTY += parseInt(tOne.USE_QTY);
                    tWorkObj.PO_QTY += parseInt(tOne.PO_QTY);
                    tWorkObj.STOCK_QTY += parseInt(tOne.USE_QTY);
                }
                console.log(
                    ` ====>(MatlArray Data) ${tWorkObj.MATL_CD}/ ${tWorkObj.PO_CD}/ ${tWorkObj.MRP_QTY} / ${tWorkObj.PO_QTY}/ ${tWorkObj.STOCK_QTY} `,
                );
                console.log(
                    ` ====>(MatlArray Data2) ${tWorkObj.MATL_CD}/ ${tWorkObj.PO_CD}/ ${tOne.USE_PO_TYPE}/ ${tOne.DIFF_PO_TYPE} / ${tOne.USE_QTY} / ${tOne.PO_QTY} `,
                );
            }
            tMatlArray.push(tWorkObj);
            console.log(` ====>(MatlArray.length) ${tMatlArray.length}`);

            var tMatlArray1 = [];
            for (tIdx = 0; tIdx < tMatlArray.length; tIdx++) {
                var tOne = { ...tMatlArray[tIdx] };
                var sql0 = `
                    select
                        po_seq,
                        sum(use_qty) as use_qty
                    from
                        ksv_po_mrp
                    where
                        po_cd = '${tOne.PO_CD}'
                        and matl_cd = '${tOne.MATL_CD}'
                        and po_seq in (97, 98, 99)
                    group by
                        po_seq
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));

                if (tRet0.length > 0) {
                    tRet0.forEach((col, i) => {
                        if (col.po_seq === 97)
                            tOne.FOC_QTY = parseInt(col.use_qty);
                        if (col.po_seq === 98)
                            tOne.OVER_QTY = parseInt(col.use_qty);
                        if (col.po_seq === 99)
                            tOne.MOQ_QTY = parseInt(col.use_qty);
                    });
                }
                console.log(
                    ` ====>(MatlArray Data) ${tOne.MATL_CD} / ${tOne.MRP_QTY} / ${tOne.PO_QTY} / ${tOne.STOCK_QTY} `,
                );

                sql0 = `
                    select
                        sum(po_qty) as po_qty,
                        sum(in_qty) as in_qty
                    from
                        ksv_stock_mem
                    where
                        po_cd = '${tOne.PO_CD}'
                        and matl_cd = '${tOne.MATL_CD}'
                        and vendor_cd = '${tOne.VENDOR_CD}'
                `;
                tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                if (tRet0.length > 0) {
                    tOne.STOCK_MEM_PO_QTY = String(parseFloat(tRet0[0].po_qty));
                    tOne.STOCK_MEM_IN_QTY = String(parseFloat(tRet0[0].in_qty));
                }
                tMatlArray1.push(tOne);
            }
            console.log(` ====>(MatlArray1.length) ${tMatlArray1.length}`);

            var tMatlArray2 = [];
            var tMatlArray2_End = [];
            for (tIdx = 0; tIdx < tMatlArray1.length; tIdx++) {
                var tOne = { ...tMatlArray1[tIdx] };

                var sql100 = `
                    select
                        a.po_cd,
                        a.po_seq,
                        a.matl_cd,
                        b.vendor_cd,
                        sum(a.po_qty) as po_qty,
                        sum(a.in_qty) as in_qty
                    from
                        ksv_stock_mem a,
                        kcd_matl_mst b
                    where
                        a.po_cd = '${tOne.PO_CD}'
                        and a.matl_cd = '${tOne.MATL_CD}'
                        and a.matl_cd = b.matl_cd
                        and b.vendor_cd = '${tOne.VENDOR_CD}'
                    group by
                        a.po_cd,
                        a.po_seq,
                        a.matl_cd,
                        b.vendor_cd
                `;
                var tRet100 = await prisma.$queryRaw(Prisma.raw(sql100));

                var tEndPoQty = 0;
                var tEndInQty = 0;
                var tEndMoqQty = 0;
                var tEndFocQty = 0;
                var tEndOverQty = 0;
                var tEndPoSeqs = '';

                var tCurrPoQty = 0;
                var tCurrInQty = 0;
                var tCurrMoqQty = 0;
                var tCurrFocQty = 0;
                var tCurrOverQty = 0;
                var tCurrPoSeqs = '';
                tRet100.forEach((col, i) => {
                    if (parseFloat(col.po_qty) <= parseFloat(col.in_qty)) {
                        tEndPoQty += parseFloat(col.po_qty);
                        if (col.po_seq === 97)
                            tEndFocQty = parseInt(col.po_qty);
                        if (col.po_seq === 98)
                            tEndOverQty = parseInt(col.po_qty);
                        if (col.po_seq === 99)
                            tEndMoqQty = parseInt(col.po_qty);
                        tEndInQty += parseFloat(col.in_qty);
                        if (tEndPoSeqs === '') tEndPoSeqs = `${col.po_seq}`;
                        else tEndPoSeqs += `,${col.po_seq}`;
                    } else {
                        tCurrPoQty += parseFloat(col.po_qty);
                        if (col.po_seq === 97)
                            tCurrFocQty = parseInt(col.po_qty);
                        if (col.po_seq === 98)
                            tCurrOverQty = parseInt(col.po_qty);
                        if (col.po_seq === 99)
                            tCurrMoqQty = parseInt(col.po_qty);
                        tCurrInQty += parseFloat(col.in_qty);
                        if (tCurrPoSeqs === '') tCurrPoSeqs = `${col.po_seq}`;
                        else tCurrPoSeqs += `,${col.po_seq}`;
                    }
                });

                console.log(
                    ` ====>(MatlArray2) Stock_mem(End): ${tEndPoQty}/${tEndInQty}/${tEndMoqQty}/${tEndFocQty}/${tEndOverQty}/${tEndPoSeqs}`,
                );
                console.log(
                    ` ====>(MatlArray2) Stock_mem(Curr): ${tCurrPoQty}/${tCurrInQty}/${tCurrMoqQty}/${tCurrFocQty}/${tCurrOverQty}/${tCurrPoSeqs}`,
                );

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
                    if (col.C_STSIN_CD !== '')
                        tEndMrpQty += parseInt(col.MRP_QTY);
                    else tCurrMrpQty += parseInt(col.MRP_QTY);
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
                    kPoPrice = tOne.PO_PRICE;
                    kMasterPrice = tOne.MASTER_PRICE;
                }

                var tCheck1 = 0;
                var tLastEndObj = {};
                var tSumMrpQty = 0;

                if (tEndPoSeqs !== '') {
                    var tOne3 = { ...tOne };

                    kPoQty = tEndPoQty;
                    kMoqQty = tEndMoqQty;
                    kFocQty = tEndFocQty;
                    kOverQty = tEndOverQty;

                    tOne3.PO_QTY = String(kPoQty);
                    tOne3.MOQ_QTY = String(kMoqQty);
                    tOne3.FOC_QTY = String(kFocQty);
                    tOne3.OVER_QTY = String(kOverQty);

                    tOne3.C_PU_CD = kPuCd;
                    tOne3.PU_CD = kPuCd;

                    tOne3.C_STSIN_CD = kStsInCd;

                    tOne3.C_PO_PRICE = kPoPrice;
                    tOne3.PO_PRICE = kPoPrice;

                    tOne3.C_MASTER_PRICE = kMasterPrice;
                    tOne3.MASTER_PRICE = kMasterPrice;

                    tOne3.C_MRP_QTY = kMrpQty;
                    tOne3.C_STOCK_QTY = kStockQty;
                    tOne3.C_PO_QTY = kPoQty;
                    tOne3.C_MOQ_QTY = kMoqQty;

                    tOne3.C_OVER_QTY = kOverQty;
                    tOne3.C_FOC_QTY = kFocQty;
                    if (
                        parseFloat(tOne3.C_FOC_QTY) > 0 ||
                        parseFloat(tOne3.C_OVER_QTY) > 0
                    ) {
                        tOne3.PO_QTY = String(
                            parseFloat(tOne3.PO_QTY) - parseFloat(kFocQty),
                        );
                        tOne3.PO_QTY = String(
                            parseFloat(tOne3.PO_QTY) - parseFloat(kOverQty),
                        );
                    }

                    tOne3.C_SURCHARGE_PRICE = kSurchargePrice;
                    tOne3.SURCHARGE_PRICE = kSurchargePrice;

                    tOne3.C_SURCHARGE_AMT = kSurchargeAmt;
                    tOne3.SURCHARGE_AMT = kSurchargeAmt;

                    tOne3.C_SURCHARGE_REMARK = kSurchargeRemark;
                    tOne3.SURCHARGE_REMARK = kSurchargeRemark;

                    tOne3.C_PU_STATUS = 'End';
                    tOne3.PU_STATUS = 'End';

                    tOne3.C_PO_SEQS = tEndPoSeqs;

                    if (gVendorType === '4') {
                        // tOne3.CURR_CD = 'USD';
                        tOne3.PO_PRICE = '0';
                    }

                    tMatlArray2.push(tOne3);
                    console.log(
                        ` ====>(MatlArray2.Record)(step-2) ${tOne3.MATL_CD}/${tOne3.C_PU_CD}/${tOne3.C_STSIN_CD}/${tOne3.C_PU_STATUS}/${tOne3.PO_QTY}/${tOne3.C_FOC_QTY}}`,
                    );
                }

                if (tCurrPoSeqs !== '') {
                    var tOne3 = { ...tOne };

                    kPoQty = tCurrPoQty;
                    kMoqQty = tCurrMoqQty;
                    kFocQty = tCurrFocQty;
                    kOverQty = tCurrOverQty;

                    tOne3.PO_QTY = String(kPoQty);
                    tOne3.MOQ_QTY = String(kMoqQty);
                    tOne3.FOC_QTY = String(kFocQty);
                    tOne3.OVER_QTY = String(kOverQty);

                    tOne3.C_PU_CD = kPuCd;
                    tOne3.PU_CD = kPuCd;

                    tOne3.C_STSIN_CD = kStsInCd;

                    tOne3.C_PO_PRICE = kPoPrice;
                    tOne3.PO_PRICE = kPoPrice;

                    tOne3.C_MASTER_PRICE = kMasterPrice;
                    tOne3.MASTER_PRICE = kMasterPrice;

                    tOne3.C_MRP_QTY = kMrpQty;
                    tOne3.C_STOCK_QTY = kStockQty;

                    tOne3.C_PO_QTY = kPoQty;
                    tOne3.C_MOQ_QTY = kMoqQty;

                    tOne3.C_OVER_QTY = kOverQty;
                    tOne3.C_FOC_QTY = kFocQty;
                    if (
                        parseFloat(tOne3.C_FOC_QTY) > 0 ||
                        parseFloat(tOne3.C_OVER_QTY) > 0
                    ) {
                        tOne3.PO_QTY = String(
                            parseFloat(tOne3.PO_QTY) - parseFloat(kFocQty),
                        );
                        tOne3.PO_QTY = String(
                            parseFloat(tOne3.PO_QTY) - parseFloat(kOverQty),
                        );
                    }

                    tOne3.C_SURCHARGE_PRICE = kSurchargePrice;
                    tOne3.SURCHARGE_PRICE = kSurchargePrice;

                    tOne3.C_SURCHARGE_AMT = kSurchargeAmt;
                    tOne3.SURCHARGE_AMT = kSurchargeAmt;

                    tOne3.C_SURCHARGE_REMARK = kSurchargeRemark;
                    tOne3.SURCHARGE_REMARK = kSurchargeRemark;

                    if (kPuCd === '') tOne3.C_PU_STATUS = 'New';
                    else tOne3.C_PU_STATUS = '-';
                    tOne3.PU_STATUS = tOne3.C_PU_STATUS;

                    tOne3.C_PO_SEQS = tCurrPoSeqs;

                    if (gVendorType === '4') {
                        // tOne3.CURR_CD = 'USD';
                        tOne3.PO_PRICE = '0';
                    }

                    tMatlArray2.push(tOne3);
                    console.log(
                        ` ====>(MatlArray2.Record)(step-2) ${tOne3.MATL_CD}/${tOne3.C_PU_CD}/${tOne3.C_STSIN_CD}/${tOne3.C_PU_STATUS}`,
                    );
                }
            }

            var tDataArray = [];
            for (tIdx = 0; tIdx < tMatlArray2.length; tIdx++) {
                var tOne = { ...tMatlArray2[tIdx] };
                tDataArray.push(tOne);
            }

            var tArray2 = [];
            tDataArray.forEach((col, i) => {
                var tCheck = 0;
                tArray2.forEach((col1, i1) => {
                    if (
                        col.MATL_CD === col1.MATL_CD &&
                        col.PU_STATUS === col1.PU_STATUS
                    ) {
                        var tObj2 = { ...col1 };
                        tObj2.MRP_QTY =
                            parseFloat(tObj2.MRP_QTY) + parseFloat(col.MRP_QTY);
                        tObj2.MRP_QTY2 =
                            parseFloat(tObj2.MRP_QTY2) +
                            parseFloat(col.MRP_QTY2);
                        tObj2.STOCK_QTY =
                            parseFloat(tObj2.STOCK_QTY) +
                            parseFloat(col.STOCK_QTY);
                        tObj2.MOQ_QTY =
                            parseFloat(tObj2.MOQ_QTY) + parseFloat(col.MOQ_QTY);
                        tObj2.PO_QTY =
                            parseFloat(tObj2.PO_QTY) + parseFloat(col.PO_QTY);
                        tObj2.DIFF_QTY =
                            parseFloat(tObj2.DIFF_QTY) +
                            parseFloat(col.DIFF_QTY);
                        tObj2.PO_UPDATE_QTY =
                            parseFloat(tObj2.PO_UPDATE_QTY) +
                            parseFloat(col.PO_UPDATE_QTY);
                        tObj2.SURCHARGE_AMT =
                            parseFloat(tObj2.SURCHARGE_AMT) +
                            parseFloat(col.SURCHARGE_AMT);
                        tObj2.PO_CD = `${tObj2.PO_CD}/${col.PO_CD}`;
                        tObj2.DATAS.push(col);
                        tArray2[i1] = { ...tObj2 };
                        tCheck = 1;
                    }
                });
                if (tCheck === 0) {
                    var tObj = { ...col };
                    tObj.DATAS = [];
                    tObj.DATAS.push(tObj);
                    tArray2.push(tObj);
                }
            });

            tArray2.forEach((tOne, i) => {
                console.log(
                    ` ++++++>>>${tOne.PU_CD}/${tOne.PU_STATUS}/${tOne.MATL_CD}/${tOne.MRP_QTY}/${tOne.STOCK_QTY}/${tOne.MOQ_QTY}/${tOne.PO_QTY}`,
                );
            });

            var tWObj = {};
            tWObj.STOCK_MEM = [...tArray2];

            tWObj.PU_MST = [];
            tWObj.PU_MST_NEW = [];

            var tOne1 = {};

            // tInput.PO_CD = po_cd/po_cd2/....
            var sqlPuMst2 = `
                select
                    a.*,
                    isnull(b.cd_name, '') as PAY_TYPE_N
                from
                    ksv_pu_mst2 a
                    left join kcd_code b on b.cd_group = 'pay_type'
                    and b.cd_code = a.pay_condition
                where
                    a.po_cd2 = '${tInput.PO_CD}'
                    and a.vendor_cd = '${tInput.VENDOR_CD}'
            `;
            var pumst2Obj = await prisma.$queryRaw(Prisma.raw(sqlPuMst2));
            if (pumst2Obj.length > 0) {
                tOne1.PU_CD = pumst2Obj[0].PU_CD;
                tWObj.PU_MST.push(pumst2Obj[0]);
            } else {
                tOne1.PU_CD = '';
            }

            var sqlVendor = `
                select
                    a.vendor_name,
                    a.vendor_matl_type,
                    a.vendor_type,
                    b.cd_name as vendor_type_n,
                    a.pay_term,
                    isnull(a.pay_type, '') as pay_type,
                    a.overshort_rate,
                    a.vendor_cd,
                    isnull(a.pay_type2, '') as pay_type2
                from
                    kcd_vendor a,
                    kcd_code b
                where
                    a.vendor_cd = '${tInput.VENDOR_CD}'
                    and b.cd_code = a.vendor_type
                    and b.cd_group = 'VENDOR_TYPE'
            `;
            var vendorObj = await prisma.$queryRaw(Prisma.raw(sqlVendor));
            tOne1.VENDOR_CD = vendorObj[0].vendor_cd;
            tOne1.VENDOR_NAME = vendorObj[0].vendor_name;
            tOne1.VENDOR_MATL_TYPE = vendorObj[0].vendor_matl_type;
            tOne1.VENDOR_TYPE = vendorObj[0].vendor_type;
            tOne1.VENDOR_TYPE_N = vendorObj[0].vendor_type_n;
            tOne1.PAY_TERM = vendorObj[0].pay_term;

            var tPuTypeCheck = 0;
            if (tOne1.PU_CD !== '') {
                var sqlPayType = `
                    select
                        *
                    from
                        kcd_code
                    where
                        cd_group = 'pay_type'
                        and cd_code = '${tOne1.PAY_CONDITION}'
                `;
                var retPayType = await prisma.$queryRaw(Prisma.raw(sqlPayType));
                if (retPayType.length > 0) {
                    tOne1.PAY_TYPE = retPayType[0].CD_NAME;
                    tOne1.PAY_TYPE_N = retPayType[0].CD_NAME;
                    tPuTypeCheck = 1;
                }
            }

            if (tPuTypeCheck === 0) {
                var sqlPayType = `
                    select
                        *
                    from
                        kcd_code
                    where
                        cd_group = 'pay_type'
                        and cd_code = '${vendorObj[0].pay_type2}'
                `;
                var retPayType = await prisma.$queryRaw(Prisma.raw(sqlPayType));
                if (retPayType.length <= 0) {
                    if (vendorObj[0].pay_type !== '') {
                        var sqlPayType1 = `
                            select
                                *
                            from
                                kcd_code
                            where
                                cd_group = 'pay_type'
                                and (
                                    cd_name like '%${vendorObj[0].pay_type}%'
                                    or cd_code like '%${vendorObj[0].pay_type}%'
                                )
                        `;
                        var retPayType1 = await prisma.$queryRaw(
                            Prisma.raw(sqlPayType1),
                        );
                        if (retPayType1.length > 0) {
                            tOne1.PAY_TYPE = vendorObj[0].pay_type;
                            tOne1.PAY_TYPE_N = vendorObj[0].pay_type;
                            tOne1.PAY_CONDITION = retPayType1[0].cd_code;
                        } else {
                            tOne1.PAY_TYPE = vendorObj[0].pay_type;
                            tOne1.PAY_TYPE_N = vendorObj[0].pay_type;
                            tOne1.PAY_CONDITION = '';
                        }
                    } else {
                        tOne1.PAY_TYPE = '';
                        tOne1.PAY_TYPE_N = '';
                        tOne1.PAY_CONDITION = '';
                    }
                } else {
                    tOne1.PAY_TYPE = retPayType[0].CD_NAME;
                    tOne1.PAY_TYPE_N = retPayType[0].CD_NAME;
                    tOne1.PAY_CONDITION = vendorObj[0].pay_type2;
                }
            }
            tOne1.OVERSHORT_RATE = vendorObj[0].overshort_rate;

            if (tInput.PU_CD2 !== '') {
                var tSql4 = `
                    select
                        pu_cd,
                        curr_cd,
                        pi_no,
                        order_date,
                        due_date,
                        ex_factory,
                        normi,
                        bill_to,
                        pay_date,
                        place_cd,
                        ship_to,
                        origin_port,
                        trade_term
                    from
                        ksv_pu_mst2
                    where
                        pu_cd = '${tInput.PU_CD2}'
                `;
                var tRet4 = await prisma.$queryRaw(Prisma.raw(tSql4));
                tOne1.P_PU_CD = tRet4[0].pu_cd;
                tOne1.P_CURR_CD = tRet4[0].curr_cd;
                tOne1.P_PI_NO = tRet4[0].pi_no;
                tOne1.P_ORDER_DATE = tRet4[0].order_date;
                tOne1.P_DUE_DATE = tRet4[0].due_date;
                tOne1.P_EX_FACTORY = tRet4[0].ex_factory;
                tOne1.P_NORMI = tRet4[0].normi;
                tOne1.P_BILL_TO = tRet4[0].bill_to;
                tOne1.P_PAY_DATE = tRet4[0].pay_date;
                tOne1.P_PLACE_CD = tRet4[0].place_cd;
                tOne1.P_SHIP_TO = tRet4[0].ship_to;
                tOne1.ORIGIN_PORT = tRet4[0].origin_port;
                tOne1.TRADE_TERM = tRet4[0].trade_term;

                var tSql6 = `
                    select
                        po_qty
                    from
                        ksv_pu_mem2
                    where
                        pu_cd = '${tInput.PU_CD2}'
                        and vendor_cd = '${tInput.VENDOR_CD}'
                        and po_cd = '${tInput.PO_CD}'
                        and pu_seq = (
                            select
                                max(pu_seq)
                            from
                                ksv_pu_mem2
                            where
                                pu_cd = '${tInput.PU_CD2}'
                                and po_cd = '${tInput.PO_CD}'
                        )
                `;
                var tRet6 = await prisma.$queryRaw(Prisma.raw(tSql6));
                tOne1.OLD_PO_QTY = 0;
                if (tRet6.length > 0) tOne1.OLD_PO_QTY = tRet6[0].po_qty;
            } else {
                tOne1.OLD_PO_QTY = 0;
                tOne1.P_PU_CD = '';
                tOne1.P_CURR_CD = '';
                tOne1.P_PI_NO = '';
                tOne1.P_ORDER_DATE = '';
                tOne1.P_DUE_DATE = '';
                tOne1.P_EX_FACTORY = '';
                tOne1.P_NORMI = '';
                tOne1.P_BILL_TO = '';
                tOne1.P_PAY_DATE = '';
                tOne1.P_PLACE_CD = '';
                tOne1.P_SHIP_TO = '';
                tOne1.ORIGIN_PORT = '';
                tOne1.TRADE_TERM = '';
                tOne1.OLD_PO_QTY = 0;
            }

            var tSql3 = `
                select
                    d.buyer_cd,
                    d.buyer_name,
                    left(a.reg_datetime, 8) as mrp_date,
                    a.plan_flag,
                    a.plan_etd,
                    a.plan_eta,
                    a.factory_cd,
                    e.factory_name,
                    max(c.due_date) as prod_due_date,
                    min(isnull(c.matl_due_date, '')) as matl_due_date
                from
                    ksv_po_mst a,
                    ksv_po_mem b,
                    ksv_order_mst c,
                    kcd_buyer d,
                    kcd_factory e
                where
                    a.po_cd in (${sqlPoCds})
                    and a.po_seq = 1
                    and a.po_cd = b.po_cd
                    and b.po_seq = 1
                    and b.order_cd = c.order_cd
                    and left(c.order_cd, 2) = d.buyer_cd
                    and a.factory_cd = e.factory_cd
                group by
                    d.buyer_cd,
                    d.buyer_name,
                    left(a.reg_datetime, 8),
                    a.plan_flag,
                    a.plan_etd,
                    a.plan_eta,
                    a.factory_cd,
                    e.factory_name
            `;
            var tRet3 = await prisma.$queryRaw(Prisma.raw(tSql3));
            if (tRet3.length > 0) {
                tOne1.BUYER_CD = tRet3[0].buyer_cd;
                tOne1.BUYER_NAME = tRet3[0].buyer_name;
                tOne1.MRP_DATE = tRet3[0].mrp_date;
                tOne1.PLAN_FLAG = tRet3[0].plan_flag;
                tOne1.PLAN_ETD = tRet3[0].plan_etd;
                tOne1.FACTORY_CD = tRet3[0].factory_cd;
                tOne1.FACTORY_NAME = tRet3[0].factory_name;
                tOne1.PROD_DUE_DATE = tRet3[0].prod_due_date;
                tOne1.MATL_DUE_DATE = tRet3[0].matl_due_date;
            }

            var tSql2 = `
                select
                    a.po_cd,
                    b.vendor_cd,
                    a.use_po_type,
                    sum(use_qty) as s_use_qty,
                    sum(po_qty) as s_po_qty
                from
                    ksv_po_mrp a,
                    kcd_matl_mst b
                where
                    a.po_cd in (${sqlPoCds})
                    and a.matl_cd = b.matl_cd
                    and b.vendor_cd = '${tInput.VENDOR_CD}'
                    -- and   a.use_po_type = '2'
                group by
                    a.po_cd,
                    b.vendor_cd,
                    a.use_po_type
            `;
            var tRet2 = await prisma.$queryRaw(Prisma.raw(tSql2));
            tRet2.forEach((col, i) => {
                if (col.use_po_type === '1') {
                    tOne1.MRP_QTY = String(col.s_use_qty);
                    tOne1.PO_QTY = String(col.s_po_qty);
                }
                if (col.use_po_type === '2') {
                    tOne1.STOCK_QTY = String(col.s_use_qty);
                }
            });
            tWObj.PU_MST_NEW.push(tOne1);

            return tWObj;
        },
        mgrQueryS040101_4_1_bak3: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }

            var sqlPoCds = '';
            if (!args.data.IN_PO_CD) {
                var tPoCds = args.data.PO_CD.split('/');
                tPoCds.forEach((col, i) => {
                    if (i === 0) sqlPoCds += `'${col}'`;
                    else sqlPoCds += `,'${col}'`;
                });
            } else {
                var tPoCds = args.data.IN_PO_CD.split('/');
                tPoCds.forEach((col, i) => {
                    if (i === 0) sqlPoCds += `'${col}'`;
                    else sqlPoCds += `,'${col}'`;
                });
            }

            var sqlPoSeq = '';
            if (!args.data.IN_PO_SEQ) {
                sqlPoSeq = ` AND  (A1.PO_SEQ < 97 OR A1.PO_SEQ > 100) `;
            } else {
                sqlPoSeq = ` AND  (A1.PO_SEQ < 97 OR A1.PO_SEQ > 100) `;
                sqlPoSeq += ` AND  (A1.PO_SEQ <= ${args.data.IN_PO_SEQ}) `;
            }

            var tPuCd = '';
            if (typeof args.data.PU_CD2 !== 'undefined') {
                tPuCd = args.data.PU_CD2;
            }

            var tInput = { ...args.data };
            if (typeof tInput.PU_CD2 === 'undefined') tInput.PU_CD2 = '';
            if (typeof tInput.MATL_TYPE === 'undefined') tInput.MATL_TYPE = '';

            let sqlStr = `
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
                            A5.FACTORY_CD,
                            A1.USE_PO_TYPE,
                            A1.DIFF_PO_TYPE,
                            max(A4.MATL_PRICE) AS MASTER_PRICE,
                            sum(A1.USE_QTY) AS USE_QTY,
                            sum(A1.PO_QTY) AS PO_QTY,
                            max(A1.PO_SEQ) AS PO_SEQ
                        FROM
                            KSV_PO_MRP A1,
                            KCD_MATL_MST A3,
                            KCD_MATL_MEM A4,
                            KSV_ORDER_MST A5,
                            KSV_PO_MST A6
                        WHERE
                            A1.PO_CD IN (${sqlPoCds})
                            AND A1.PO_CD = A6.PO_CD
                            AND A1.PO_SEQ = A6.PO_SEQ
                            AND A6.PO_STATUS = '4'
                            AND A1.ORDER_CD = A5.ORDER_CD ${sqlPoSeq}
                            AND LEFT(A1.ORDER_CD, 2) = '${args.data.BUYER_CD}'
                            AND A1.MATL_CD = A3.MATL_CD
                            AND A3.VENDOR_CD = '${args.data.VENDOR_CD}'
                            AND A1.MATL_CD = A4.MATL_CD
                            --AND   A4.MATL_SEQ  = (select max(matl_seq) as matl_seq from kcd_matl_mem where matl_cd = A1.MATL_CD) 
                            AND A4.MATL_SEQ = A1.MATL_SEQ
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
                            A1.DIFF_PO_TYPE
                    ) K
                order by
                    K.VENDOR_CD,
                    K.MATL_CD,
                    k.PO_CD,
                    k.PO_SEQ
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
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tOne = { ...tRet[tIdx] };
                if (tIdx === 0 || tOne.MATL_CD !== tWorkObj.MATL_CD) {
                    if (tIdx > 0) tMatlArray.push(tWorkObj);
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
                    tWorkObj.StOCK_MEM_PO_QTY = 0;
                    tWorkObj.StOCK_MEM_IN_QTY = 0;

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
                    tWorkObj.MRP_QTY += parseInt(tOne.USE_QTY);
                    tWorkObj.PO_QTY += parseInt(tOne.PO_QTY);
                }
                if (tOne.USE_PO_TYPE === '1' && tOne.DIFF_PO_TYPE === '2') {
                    // Order- cancel
                    tWorkObj.MRP_QTY += parseInt(tOne.USE_QTY);
                    tWorkObj.PO_QTY += parseInt(tOne.PO_QTY);
                }
                if (tOne.USE_PO_TYPE === '1' && tOne.DIFF_PO_TYPE === '1') {
                    // Order - OverIn/Out
                    tWorkObj.MRP_QTY += parseInt(tOne.USE_QTY);
                    tWorkObj.PO_QTY += parseInt(tOne.PO_QTY);
                }
                if (tOne.USE_PO_TYPE === '2' && tOne.DIFF_PO_TYPE === '0') {
                    // Stock Use
                    tWorkObj.STOCK_QTY += parseInt(tOne.USE_QTY);
                }
                if (tOne.USE_PO_TYPE === '2' && tOne.DIFF_PO_TYPE === '5') {
                    // Stock Use  - cancel
                    tWorkObj.MRP_QTY += parseInt(tOne.USE_QTY);
                    tWorkObj.PO_QTY += parseInt(tOne.PO_QTY);
                    tWorkObj.STOCK_QTY += parseInt(tOne.USE_QTY);
                }
                console.log(
                    ` ====>(MatlArray Data) ${tWorkObj.MATL_CD}/ ${tWorkObj.PO_CD}/ ${tWorkObj.MRP_QTY} / ${tWorkObj.PO_QTY}/ ${tWorkObj.STOCK_QTY} `,
                );
                console.log(
                    ` ====>(MatlArray Data2) ${tWorkObj.MATL_CD}/ ${tWorkObj.PO_CD}/ ${tOne.USE_PO_TYPE}/ ${tOne.DIFF_PO_TYPE} / ${tOne.USE_QTY} / ${tOne.PO_QTY} `,
                );
            }
            tMatlArray.push(tWorkObj);
            console.log(` ====>(MatlArray.length) ${tMatlArray.length}`);

            var tMatlArray1 = [];
            for (tIdx = 0; tIdx < tMatlArray.length; tIdx++) {
                var tOne = { ...tMatlArray[tIdx] };
                var sql0 = `
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
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));

                if (tRet0.length > 0) {
                    tRet0.forEach((col, i) => {
                        if (col.po_seq === 97)
                            tOne.FOC_QTY = parseInt(col.use_qty);
                        if (col.po_seq === 98)
                            tOne.OVER_QTY = parseInt(col.use_qty);
                        if (col.po_seq === 99)
                            tOne.MOQ_QTY = parseInt(col.use_qty);
                    });
                }

                var sqlPoSeq1 = '';
                if (!args.data.IN_PO_SEQ) {
                } else {
                    tOne.FOC_QTY = 0;
                    tOne.OVER_QTY = 0;
                    tOne.MOQ_QTY = 0;
                    sqlPoSeq1 = ` and a.po_seq <= ${args.data.IN_PO_SEQ}`;
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
                tMatlArray1.push(tOne);
                console.log(
                    ` ====>(MatlArray Data, stock_mem, po_qty, in_qty) ${tOne.MATL_CD} /${tOne.STOCK_MEM_PO_QTY} / ${tOne.STOCK_MEM_IN_QTY}  `,
                );
            }
            console.log(` ====>(MatlArray1.length) ${tMatlArray1.length}`);

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
                    kPoPrice = tOne.PO_PRICE;
                    kMasterPrice = tOne.MASTER_PRICE;
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
                    // tOne3.CURR_CD = 'USD';
                    tOne3.PO_PRICE = '0';
                }
                tMatlArray2.push(tOne3);
            }

            var tDataArray = [];
            for (tIdx = 0; tIdx < tMatlArray2.length; tIdx++) {
                var tOne = { ...tMatlArray2[tIdx] };
                tDataArray.push(tOne);
            }

            var tArray2 = [];
            tDataArray.forEach((col, i) => {
                var tCheck = 0;
                tArray2.forEach((col1, i1) => {
                    if (
                        col.MATL_CD === col1.MATL_CD &&
                        col.PU_STATUS === col1.PU_STATUS
                    ) {
                        var tObj2 = { ...col1 };
                        tObj2.MRP_QTY =
                            parseFloat(tObj2.MRP_QTY) + parseFloat(col.MRP_QTY);
                        tObj2.MRP_QTY2 =
                            parseFloat(tObj2.MRP_QTY2) +
                            parseFloat(col.MRP_QTY2);
                        tObj2.STOCK_QTY =
                            parseFloat(tObj2.STOCK_QTY) +
                            parseFloat(col.STOCK_QTY);
                        tObj2.MOQ_QTY =
                            parseFloat(tObj2.MOQ_QTY) + parseFloat(col.MOQ_QTY);
                        tObj2.PO_QTY =
                            parseFloat(tObj2.PO_QTY) + parseFloat(col.PO_QTY);
                        tObj2.DIFF_QTY =
                            parseFloat(tObj2.DIFF_QTY) +
                            parseFloat(col.DIFF_QTY);
                        tObj2.PO_UPDATE_QTY =
                            parseFloat(tObj2.PO_UPDATE_QTY) +
                            parseFloat(col.PO_UPDATE_QTY);
                        tObj2.SURCHARGE_AMT =
                            parseFloat(tObj2.SURCHARGE_AMT) +
                            parseFloat(col.SURCHARGE_AMT);
                        tObj2.PO_CD = `${tObj2.PO_CD}/${col.PO_CD}`;
                        tObj2.DATAS.push(col);
                        tArray2[i1] = { ...tObj2 };
                        tCheck = 1;
                    }
                });
                if (tCheck === 0) {
                    var tObj = { ...col };
                    tObj.DATAS = [];
                    tObj.DATAS.push(tObj);
                    tArray2.push(tObj);
                }
            });

            tArray2.forEach((tOne, i) => {
                console.log(
                    ` ++++++>>>${tOne.PU_CD}/${tOne.PU_STATUS}/${tOne.MATL_CD}/${tOne.MRP_QTY}/${tOne.STOCK_QTY}/${tOne.MOQ_QTY}/${tOne.PO_QTY}`,
                );
            });

            var tWObj = {};
            tWObj.STOCK_MEM = [...tArray2];

            tWObj.PU_MST = [];
            tWObj.PU_MST_NEW = [];

            var tOne1 = {};

            // tInput.PO_CD = po_cd/po_cd2/....
            var sqlPuMst2 = `
                select
                    a.*,
                    isnull(b.cd_name, '') as PAY_TYPE_N
                from
                    ksv_pu_mst2 a
                    left join kcd_code b on b.cd_group = 'pay_type'
                    and b.cd_code = a.pay_condition
                where
                    a.po_cd2 = '${tInput.PO_CD}'
                    and a.vendor_cd = '${tInput.VENDOR_CD}'
            `;
            var pumst2Obj = await prisma.$queryRaw(Prisma.raw(sqlPuMst2));
            if (pumst2Obj.length > 0) {
                tOne1.PU_CD = pumst2Obj[0].PU_CD;
                tWObj.PU_MST.push(pumst2Obj[0]);
            } else {
                tOne1.PU_CD = '';
            }

            var sqlVendor = `
                select
                    a.vendor_name,
                    a.vendor_matl_type,
                    a.vendor_type,
                    b.cd_name as vendor_type_n,
                    a.pay_term,
                    isnull(a.pay_type, '') as pay_type,
                    a.overshort_rate,
                    a.vendor_cd,
                    isnull(a.pay_type2, '') as pay_type2
                from
                    kcd_vendor a,
                    kcd_code b
                where
                    a.vendor_cd = '${tInput.VENDOR_CD}'
                    and b.cd_code = a.vendor_type
                    and b.cd_group = 'VENDOR_TYPE'
            `;
            var vendorObj = await prisma.$queryRaw(Prisma.raw(sqlVendor));
            tOne1.VENDOR_CD = vendorObj[0].vendor_cd;
            tOne1.VENDOR_NAME = vendorObj[0].vendor_name;
            tOne1.VENDOR_MATL_TYPE = vendorObj[0].vendor_matl_type;
            tOne1.VENDOR_TYPE = vendorObj[0].vendor_type;
            tOne1.VENDOR_TYPE_N = vendorObj[0].vendor_type_n;
            tOne1.PAY_TERM = vendorObj[0].pay_term;

            var tPuTypeCheck = 0;
            if (tOne1.PU_CD !== '') {
                var sqlPayType = `
                    select
                        *
                    from
                        kcd_code
                    where
                        cd_group = 'pay_type'
                        and cd_code = '${tOne1.PAY_CONDITION}'
                `;
                var retPayType = await prisma.$queryRaw(Prisma.raw(sqlPayType));
                if (retPayType.length > 0) {
                    tOne1.PAY_TYPE = retPayType[0].CD_NAME;
                    tOne1.PAY_TYPE_N = retPayType[0].CD_NAME;
                    tPuTypeCheck = 1;
                }
            }

            if (tPuTypeCheck === 0) {
                var sqlPayType = `
                    select
                        *
                    from
                        kcd_code
                    where
                        cd_group = 'pay_type'
                        and cd_code = '${vendorObj[0].pay_type2}'
                `;
                var retPayType = await prisma.$queryRaw(Prisma.raw(sqlPayType));
                if (retPayType.length <= 0) {
                    if (vendorObj[0].pay_type !== '') {
                        var sqlPayType1 = `
                            select
                                *
                            from
                                kcd_code
                            where
                                cd_group = 'pay_type'
                                and (
                                    cd_name like '%${vendorObj[0].pay_type}%'
                                    or cd_code like '%${vendorObj[0].pay_type}%'
                                )
                        `;
                        var retPayType1 = await prisma.$queryRaw(
                            Prisma.raw(sqlPayType1),
                        );
                        if (retPayType1.length > 0) {
                            tOne1.PAY_TYPE = vendorObj[0].pay_type;
                            tOne1.PAY_TYPE_N = vendorObj[0].pay_type;
                            tOne1.PAY_CONDITION = retPayType1[0].cd_code;
                        } else {
                            tOne1.PAY_TYPE = vendorObj[0].pay_type;
                            tOne1.PAY_TYPE_N = vendorObj[0].pay_type;
                            tOne1.PAY_CONDITION = '';
                        }
                    } else {
                        tOne1.PAY_TYPE = '';
                        tOne1.PAY_TYPE_N = '';
                        tOne1.PAY_CONDITION = '';
                    }
                } else {
                    tOne1.PAY_TYPE = retPayType[0].CD_NAME;
                    tOne1.PAY_TYPE_N = retPayType[0].CD_NAME;
                    tOne1.PAY_CONDITION = vendorObj[0].pay_type2;
                }
            }
            tOne1.OVERSHORT_RATE = vendorObj[0].overshort_rate;

            if (tInput.PU_CD2 !== '') {
                var tSql4 = `
                    select
                        pu_cd,
                        curr_cd,
                        pi_no,
                        order_date,
                        due_date,
                        ex_factory,
                        normi,
                        bill_to,
                        pay_date,
                        place_cd,
                        ship_to,
                        origin_port,
                        trade_term
                    from
                        ksv_pu_mst2
                    where
                        pu_cd = '${tInput.PU_CD2}'
                `;
                var tRet4 = await prisma.$queryRaw(Prisma.raw(tSql4));
                tOne1.P_PU_CD = tRet4[0].pu_cd;
                tOne1.P_CURR_CD = tRet4[0].curr_cd;
                tOne1.P_PI_NO = tRet4[0].pi_no;
                tOne1.P_ORDER_DATE = tRet4[0].order_date;
                tOne1.P_DUE_DATE = tRet4[0].due_date;
                tOne1.P_EX_FACTORY = tRet4[0].ex_factory;
                tOne1.P_NORMI = tRet4[0].normi;
                tOne1.P_BILL_TO = tRet4[0].bill_to;
                tOne1.P_PAY_DATE = tRet4[0].pay_date;
                tOne1.P_PLACE_CD = tRet4[0].place_cd;
                tOne1.P_SHIP_TO = tRet4[0].ship_to;
                tOne1.ORIGIN_PORT = tRet4[0].origin_port;
                tOne1.TRADE_TERM = tRet4[0].trade_term;

                var tSql6 = `
                    select
                        po_qty
                    from
                        ksv_pu_mem2
                    where
                        pu_cd = '${tInput.PU_CD2}'
                        and vendor_cd = '${tInput.VENDOR_CD}'
                        and po_cd = '${tInput.PO_CD}'
                        and pu_seq = (
                            select
                                max(pu_seq)
                            from
                                ksv_pu_mem2
                            where
                                pu_cd = '${tInput.PU_CD2}'
                                and po_cd = '${tInput.PO_CD}'
                        )
                `;
                var tRet6 = await prisma.$queryRaw(Prisma.raw(tSql6));
                tOne1.OLD_PO_QTY = 0;
                if (tRet6.length > 0) tOne1.OLD_PO_QTY = tRet6[0].po_qty;
            } else {
                tOne1.OLD_PO_QTY = 0;
                tOne1.P_PU_CD = '';
                tOne1.P_CURR_CD = '';
                tOne1.P_PI_NO = '';
                tOne1.P_ORDER_DATE = '';
                tOne1.P_DUE_DATE = '';
                tOne1.P_EX_FACTORY = '';
                tOne1.P_NORMI = '';
                tOne1.P_BILL_TO = '';
                tOne1.P_PAY_DATE = '';
                tOne1.P_PLACE_CD = '';
                tOne1.P_SHIP_TO = '';
                tOne1.ORIGIN_PORT = '';
                tOne1.TRADE_TERM = '';
                tOne1.OLD_PO_QTY = 0;
            }

            var tSql3 = `
                select
                    d.buyer_cd,
                    d.buyer_name,
                    left(a.reg_datetime, 8) as mrp_date,
                    a.plan_flag,
                    a.plan_etd,
                    a.plan_eta,
                    a.factory_cd,
                    e.factory_name,
                    max(c.due_date) as prod_due_date,
                    min(isnull(c.matl_due_date, '')) as matl_due_date
                from
                    ksv_po_mst a,
                    ksv_po_mem b,
                    ksv_order_mst c,
                    kcd_buyer d,
                    kcd_factory e
                where
                    a.po_cd in (${sqlPoCds})
                    and a.po_seq = 1
                    and a.po_cd = b.po_cd
                    and b.po_seq = 1
                    and b.order_cd = c.order_cd
                    and left(c.order_cd, 2) = d.buyer_cd
                    and a.factory_cd = e.factory_cd
                group by
                    d.buyer_cd,
                    d.buyer_name,
                    left(a.reg_datetime, 8),
                    a.plan_flag,
                    a.plan_etd,
                    a.plan_eta,
                    a.factory_cd,
                    e.factory_name
            `;
            var tRet3 = await prisma.$queryRaw(Prisma.raw(tSql3));
            if (tRet3.length > 0) {
                tOne1.BUYER_CD = tRet3[0].buyer_cd;
                tOne1.BUYER_NAME = tRet3[0].buyer_name;
                tOne1.MRP_DATE = tRet3[0].mrp_date;
                tOne1.PLAN_FLAG = tRet3[0].plan_flag;
                tOne1.PLAN_ETD = tRet3[0].plan_etd;
                tOne1.FACTORY_CD = tRet3[0].factory_cd;
                tOne1.FACTORY_NAME = tRet3[0].factory_name;
                tOne1.PROD_DUE_DATE = tRet3[0].prod_due_date;
                tOne1.MATL_DUE_DATE = tRet3[0].matl_due_date;
            }

            var tSql2 = `
                select
                    a.po_cd,
                    b.vendor_cd,
                    a.use_po_type,
                    sum(use_qty) as s_use_qty,
                    sum(po_qty) as s_po_qty
                from
                    ksv_po_mrp a,
                    kcd_matl_mst b
                where
                    a.po_cd in (${sqlPoCds})
                    and a.matl_cd = b.matl_cd
                    and b.vendor_cd = '${tInput.VENDOR_CD}'
                    -- and   a.use_po_type = '2'
                group by
                    a.po_cd,
                    b.vendor_cd,
                    a.use_po_type
            `;
            var tRet2 = await prisma.$queryRaw(Prisma.raw(tSql2));
            tRet2.forEach((col, i) => {
                if (col.use_po_type === '1') {
                    tOne1.MRP_QTY = String(col.s_use_qty);
                    tOne1.PO_QTY = String(col.s_po_qty);
                }
                if (col.use_po_type === '2') {
                    tOne1.STOCK_QTY = String(col.s_use_qty);
                }
            });
            tWObj.PU_MST_NEW.push(tOne1);

            return tWObj;
        },
    },
};

export default moduleQuery_S040101_4_1;
