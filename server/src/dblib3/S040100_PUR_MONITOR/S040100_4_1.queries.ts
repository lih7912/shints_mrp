import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S040100_4_1 = {
    Query: {
        mgrQueryS040100_4_1: async (_, args) => {
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
            /*
       0 AS MOQ_QTY,
       0 AS PO_QTY,
       0 AS MOQ_AMT,
       0 AS MOQ_PRICE,
       0 AS FREIGHT_AMT,
       0 AS FREIGHT_PRICE,
       0 AS OTHER_AMT,
       0 AS OTHER_PRICE,
       '' AS SURCHAGE_REMARK ,
       0 AS PO_PRICE 
*/

            let sqlStr = `
                select
                    K.*
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
                            max(A4.MATL_PRICE) AS MASTER_PRICE,
                            sum(A1.PO_QTY) AS MRP_QTY0,
                            sum(A1.PO_QTY) AS MRP_QTY1,
                            -- sum(A1.STOCK_QTY) AS STOCK_QTY,
                            max(A1.PO_SEQ) AS PO_SEQ
                            -- FROM KSV_STOCK_MEM A1, KSV_PO_MRP A2, KCD_MATL_MST A3, KCD_MATL_MEM A4 , 
                        FROM
                            KSV_PO_MRP A1,
                            KCD_MATL_MST A3,
                            KCD_MATL_MEM A4,
                            KSV_ORDER_MST A5,
                            KSV_PO_MST A6
                        WHERE
                            A1.PO_CD IN (${tSQL0})
                            AND A1.PO_CD = A6.PO_CD
                            AND A1.PO_SEQ = A6.PO_SEQ
                            AND A6.PO_STATUS = '4'
                            AND A1.ORDER_CD = A5.ORDER_CD
                            -- AND A5.ORDER_STATUS in ('3', '5', '6')
                            AND (
                                A1.PO_SEQ < 97
                                OR A1.PO_SEQ > 100
                            )
                            AND A1.USE_PO_TYPE = '1'
                            AND A1.DIFF_PO_TYPE in ('0', '3', '2', '4')
                            -- AND   A1.PO_QTY > 0
                            AND LEFT(A1.ORDER_CD, 2) = '${args.data.BUYER_CD}'
                            AND A1.MATL_CD = A3.MATL_CD
                            AND A3.VENDOR_CD = '${args.data.VENDOR_CD}'
                            AND A1.MATL_CD = A4.MATL_CD
                            AND A1.MATL_SEQ = A4.MATL_SEQ
                            -- AND   A1.STOCK_STATUS = '0' 
                            -- AND   A1.PO_CD = A2.PO_CD
                            -- AND   A1.PO_SEQ = A2.PO_SEQ
                            -- AND   A1.ORDER_CD = A2.ORDER_CD
                            -- AND   A1.MATL_CD = A2.MATL_CD
                            -- AND   A1.MRP_SEQ= A2.MRP_SEQ
                            -- AND   A1.MATL_SEQ= A2.MATL_SEQ
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
                            A4.CURR_CD
                            -- , A4.MATL_PRICE
                    ) K
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {};

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

                var tMoqQty = 0;
                var sql01 = `
                    select
                        sum(po_qty) as moq_qty
                    from
                        ksv_po_mrp
                    where
                        po_cd = '${tOne.PO_CD}'
                        and matl_cd = '${tOne.MATL_CD}'
                        and po_seq = 99
                `;
                var tRet01 = await prisma.$queryRaw(Prisma.raw(sql01));
                if (tRet01.length > 0) tMoqQty = tRet01[0].moq_qty;

                var sql2 = `
                    select
                        isnull(MOQ, 0) as MOQ_QTY,
                        isnull(PO_QTY, 0) as MRP_QTY2,
                        isnull(PO_QTY2, 0) as PO_QTY,
                        isnull(SURCHARGE_PRICE, 0) as SURCHARGE_PRICE,
                        isnull(SURCHARGE_AMT, 0) as SURCHARGE_AMT,
                        isnull(SURCHARGE_REMARK, '') as SURCHARGE_REMARK,
                        isnull(PO_PRICE, 0) as PO_PRICE,
                        isnull(PU_CD, '') as PU_CD
                    from
                        ksv_stock_mem2
                    where
                        po_cd = '${tOne.PO_CD}'
                        and vendor_cd = '${tOne.VENDOR_CD}'
                        and matl_cd = '${tOne.MATL_CD}'
                `;
                var tRet2 = await prisma.$queryRaw(Prisma.raw(sql2));
                if (tRet2.length > 0) {
                    var tPoQty = parseFloat(tRet2[0].PO_QTY);
                    var tMoqQty = parseFloat(tRet2[0].MOQ_QTY);
                    var tDiffQty = 0;
                    var tPoUpdateQty = 0;
                    if (tMoqQty > 0) {
                        if (tPoQty > tOne.MRP_QTY0) {
                            // 수량감소
                            tDiffQty = tPoQty - tOne.MRP_QTY0;
                            tMoqQty += tDiffQty;
                            tDiffQty = 0;
                            tPoUpdateQty = tPoQty;
                        } else {
                            // 수량증가
                            tDiffQty = tOne.MRP_QTY - tPoQty;
                            if (tDiffQty < tMoqQty) {
                                tMoqQty = tMoqQty - tDiffQty;
                                tDiffQty = 0;
                                tPoUpdateQty = tPoQty;
                            } else {
                                tMoqQty = 0;
                                tDiffQty = tOne.MRP_QTY0 - tPoQty;
                                tPoUpdateQty = tPoQty + tDiffQty;
                            }
                        }
                    } else {
                        tMoqQty = 0;
                        tDiffQty = tOne.MRP_QTY0 - tPoQty;
                        tPoUpdateQty = tPoQty + tDiffQty;
                    }

                    tOne.MOQ_QTY = String(tMoqQty);
                    tOne.MRP_QTY2 = tRet2[0].PO_QTY;
                    tOne.PO_QTY = String(tPoQty);
                    tOne.DIFF_QTY = String(tDiffQty);
                    tOne.PO_UPDATE_QTY = String(tPoUpdateQty);
                    tOne.PU_STATUS = 'Update';
                    tOne.SURCHARGE_PRICE = tRet2[0].SURCHARGE_PRICE;
                    tOne.SURCHARGE_AMT = tRet2[0].SURCHARGE_AMT;
                    tOne.SURCHARGE_REMARK = tRet2[0].SURCHARGE_REMARK;
                    tOne.PO_PRICE = tRet2[0].PO_PRICE;
                    tOne.PU_CD = tRet2[0].PU_CD;
                } else {
                    tOne.MOQ_QTY = 0;
                    if (tOne.MOQ_QTY <= 0 && tMoqQty > 0)
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
                }

                tArray.push(tOne);
            }

            var tWObj = {};
            tWObj.STOCK_MEM = tArray;

            if (args.data.PU_CD2 !== '') {
                let sqlStr = `
                    select
                        *
                    from
                        ksv_pu_mst2
                    where
                        pu_cd = '${args.data.PU_CD2}'
                `;
                var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
                tWObj.PU_MST = tRet;
            } else {
                tWObj.PU_MST = [];
            }

            return tWObj;
        },

        mgrQueryS040100_4_2: async (_, args) => {
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

            return tWObj;
        },
    },
};

export default moduleQuery_S040100_4_1;
