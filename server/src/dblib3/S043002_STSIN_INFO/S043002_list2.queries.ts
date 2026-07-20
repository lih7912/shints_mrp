import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S043002_LIST_2_0 = {
    Query: {
        mgrQueryS043002_LIST_2: async (_, args) => {
            var tSQL = '';

            let sqlStr = `
                SELECT
                    A1.PO_CD,
                    A1.PO_SEQ,
                    A1.MATL_CD,
                    '0' as MRP_SEQ,
                    '0' as MATL_SEQ,
                    A3.MATL_NAME,
                    A3.COLOR,
                    A3.SPEC,
                    A3.UNIT,
                    -- A1.PO_QTY AS MRP_QTY,
                    A7.PO_QTY AS MRP_QTY,
                    A1.STOCK_QTY as STOCK_QTY,
                    A1.MOQ_QTY as MOQ_QTY,
                    isnull(A1.OVERSHORT_QTY, 0) as LEFTOVER_QTY,
                    (
                        A1.PO_QTY - A1.STOCK_QTY + A1.MOQ_QTY + isnull(A1.OVERSHORT_QTY, 0)
                    ) as PO_QTY0,
                    isnull(A1.PO_QTY, 0) as PO_QTY,
                    isnull(A1.STSIN_QTY, 0) as STSIN_QTY,
                    isnull(A1.FOC_QTY, 0) as FOC_QTY,
                    isnull(A1.SHIP_QTY, 0) as SHIP_QTY,
                    A1.CURR_CD,
                    A1.MASTER_PRICE,
                    (A1.PO_PRICE - A1.MASTER_PRICE) as DIFF_PRICE,
                    A1.PO_PRICE,
                    isnull(A1.SURCHARGE_AMT, 0) as SURCHARGE_AMT,
                    isnull(A1.SURCHARGE_PRICE, 0) as SURCHARGE_PRICE,
                    isnull(A1.SURCHARGE_REMARK, '') as SURCHARGE_REMARK,
                    '' as ORDER_CD,
                    0 as OVERSHORT_RATE,
                    isnull(A1.BILL_CD, '') as BILL_CD
                FROM
                    KSV_STOCK_MEM2_STSIN A1
                    left join (
                        select
                            po_cd,
                            vendor_cd,
                            matl_cd,
                            sum(in_qty) as s_in_qty
                        from
                            ksv_stock_in
                        where
                            stsin_cd = '${args.data.STSIN_CD}'
                        group by
                            po_cd,
                            vendor_cd,
                            matl_cd
                    ) A6 ON A6.vendor_cd = A1.vendor_cd
                    and A6.matl_cd = A1.MATL_CD
                    and A6.po_cd = A1.PO_CD,
                    KSV_PU_MST2 A5,
                    KCD_MATL_MST A3,
                    ksv_stock_mem2 A7
                WHERE
                    A1.STSIN_CD = '${args.data.STSIN_CD}'
                    AND A1.PU_CD = a5.PU_CD
                    AND A1.MATL_CD = A3.MATL_CD
                    AND A1.PU_CD = A7.PU_CD
                    AND A1.MATL_CD = A7.MATL_CD
                    AND A1.PO_CD = A7.PO_CD
                    AND (
                        A1.STSIN_CD = A7.STSIN_CD
                        or (A7.STSIN_ARRAY like '%${args.data.STSIN_CD}%')
                    )
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            var tArray = [];
            tRet.forEach((col, i) => {
                var tObj = { ...col };
                tObj.MRP_QTY = String(
                    AFLib.getFloat(parseFloat(tObj.MRP_QTY), 2),
                );
                tObj.STOCK_QTY = String(
                    AFLib.getFloat(parseFloat(tObj.STOCK_QTY), 2),
                );
                tObj.MOQ_QTY = String(
                    AFLib.getFloat(parseFloat(tObj.MOQ_QTY), 2),
                );
                tObj.LEFTOVER_QTY = String(
                    AFLib.getFloat(parseFloat(tObj.LEFTOVER_QTY), 2),
                );
                tObj.PO_QTY = String(
                    AFLib.getFloat(parseFloat(tObj.PO_QTY), 2),
                );
                tObj.STSIN_QTY = String(
                    AFLib.getFloat(parseFloat(tObj.STSIN_QTY), 2),
                );
                tObj.FOC_QTY = String(
                    AFLib.getFloat(parseFloat(tObj.FOC_QTY), 2),
                );
                tObj.SHIP_QTY = String(
                    AFLib.getFloat(parseFloat(tObj.SHIP_QTY), 2),
                );
                tObj.MASTER_PRICE = String(
                    AFLib.getFloat(parseFloat(tObj.MASTER_PRICE), 4),
                );
                tObj.DIFF_PRICE = String(
                    AFLib.getFloat(parseFloat(tObj.DIFF_PRICE), 4),
                );
                tObj.PO_PRICE = String(
                    AFLib.getFloat(parseFloat(tObj.PO_PRICE), 4),
                );
                tObj.SURCHARGE_AMT = String(
                    AFLib.getFloat(parseFloat(tObj.SURCHARGE_AMT), 4),
                );
                tObj.SURCHARGE_PRICE = String(
                    AFLib.getFloat(parseFloat(tObj.SURCHARGE_PRICE), 4),
                );
            });

            return tRet;
        },

        mgrQueryS043002_LIST_2_bak: async (_, args) => {
            var tSQL = '';

            let sqlStr = `
                SELECT
                    A1.PO_CD,
                    A1.PO_SEQ,
                    A1.MATL_CD,
                    A1.MRP_SEQ,
                    A1.MATL_SEQ,
                    A3.MATL_NAME,
                    A3.COLOR,
                    A3.SPEC,
                    A3.UNIT,
                    A1.PO_QTY AS MRP_QTY,
                    A1.STOCK_QTY as STOCK_QTY,
                    A1.MOQ as MOQ_QTY,
                    isnull(A1.LEFTOVER_QTY, 0) as LEFTOVER_QTY,
                    (
                        A1.PO_QTY - A1.STOCK_QTY + A1.MOQ + isnull(A1.LEFTOVER_QTY, 0)
                    ) as PO_QTY0,
                    -- A1.PO_QTY2 as PO_QTY,
                    (
                        A1.PO_QTY - A1.STOCK_QTY + A1.MOQ + isnull(A1.LEFTOVER_QTY, 0) - isnull(A6.S_IN_QTY, 0)
                    ) as PO_QTY,
                    isnull(A6.S_IN_QTY, 0) as STSIN_QTY,
                    -- (A1.PO_QTY - A1.STOCK_QTY + A1.MOQ + isnull(A1.LEFTOVER_QTY, 0) - isnull(A6.S_IN_QTY, 0)) as BAL_QTY,
                    -- (A1.PO_QTY - A1.STOCK_QTY + A1.MOQ + isnull(A1.LEFTOVER_QTY, 0) - isnull(A6.S_IN_QTY, 0))  as IN_QTY,
                    0.0 as FOC_QTY,
                    (
                        A1.PO_QTY - A1.STOCK_QTY + A1.MOQ + isnull(A1.LEFTOVER_QTY, 0) - isnull(A6.S_IN_QTY, 0)
                    ) as SHIP_QTY,
                    A1.CURR_CD,
                    A1.MASTER_PRICE,
                    (A1.PO_PRICE - A1.MASTER_PRICE) as DIFF_PRICE,
                    A1.PO_PRICE,
                    isnull(A1.SURCHARGE_AMT, 0) as SURCHARGE_AMT,
                    isnull(A1.SURCHARGE_PRICE, 0) as SURCHARGE_PRICE,
                    isnull(A1.SURCHARGE_REMARK, '') as SURCHARGE_REMARK,
                    '' as ORDER_CD,
                    0 as OVERSHORT_RATE
                FROM
                    KSV_STOCK_MEM2 A1
                    left join (
                        select
                            po_cd,
                            vendor_cd,
                            matl_cd,
                            sum(in_qty) as s_in_qty
                        from
                            ksv_stock_in
                        where
                            pu_cd = '${args.data.PU_CD}'
                        group by
                            po_cd,
                            vendor_cd,
                            matl_cd
                    ) A6 ON A6.vendor_cd = A1.vendor_cd
                    and A6.matl_cd = A1.MATL_CD
                    and A6.po_cd = A1.PO_CD,
                    KSV_PU_MST2 A5,
                    KCD_MATL_MST A3
                WHERE
                    A1.PU_CD = '${args.data.PU_CD}'
                    AND A1.PU_CD = a5.PU_CD
                    AND A1.MATL_CD = A3.MATL_CD
                    AND (A1.PO_QTY2 - isnull(A6.S_IN_QTY, 0)) > 0
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            var tArray = [];
            tRet.forEach((col, i) => {
                var tObj = { ...col };
                tObj.MRP_QTY = String(
                    AFLib.getFloat(parseFloat(tObj.MRP_QTY), 2),
                );
                tObj.STOCK_QTY = String(
                    AFLib.getFloat(parseFloat(tObj.STOCK_QTY), 2),
                );
                tObj.MOQ_QTY = String(
                    AFLib.getFloat(parseFloat(tObj.MOQ_QTY), 2),
                );
                tObj.LEFTOVER_QTY = String(
                    AFLib.getFloat(parseFloat(tObj.LEFTOVER_QTY), 2),
                );
                tObj.PO_QTY = String(
                    AFLib.getFloat(parseFloat(tObj.PO_QTY), 2),
                );
                tObj.STSIN_QTY = String(
                    AFLib.getFloat(parseFloat(tObj.STSIN_QTY), 2),
                );
                tObj.FOC_QTY = String(
                    AFLib.getFloat(parseFloat(tObj.FOC_QTY), 2),
                );
                tObj.SHIP_QTY = String(
                    AFLib.getFloat(parseFloat(tObj.SHIP_QTY), 2),
                );
                tObj.MASTER_PRICE = String(
                    AFLib.getFloat(parseFloat(tObj.MASTER_PRICE), 4),
                );
                tObj.DIFF_PRICE = String(
                    AFLib.getFloat(parseFloat(tObj.DIFF_PRICE), 4),
                );
                tObj.PO_PRICE = String(
                    AFLib.getFloat(parseFloat(tObj.PO_PRICE), 4),
                );
                tObj.SURCHARGE_AMT = String(
                    AFLib.getFloat(parseFloat(tObj.SURCHARGE_AMT), 4),
                );
                tObj.SURCHARGE_PRICE = String(
                    AFLib.getFloat(parseFloat(tObj.SURCHARGE_PRICE), 4),
                );
            });

            return tRet;
        },
    },
};

export default moduleQuery_S043002_LIST_2_0;
