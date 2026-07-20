import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0520_4_1 = {
    Query: {
        mgrQueryS0520_4_1: async (_, args) => {
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
                    AND (
                        A1.PO_QTY - A1.STOCK_QTY + isnull(A1.MOQ, 0) - A1.IN_QTY
                    ) > 0
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

        mgrQueryS0520_4_2: async (_, args) => {
            var tSQL = '';

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
                    A1.PO_QTY2 as PO_QTY,
                    A1.IN_QTY as STSIN_QTY,
                    (A1.IN_QTY + A1.FOC_QTY) as SHIP_QTY,
                    A6.IN_DATETIME,
                    (A1.IN_QTY + A1.FOC_QTY - A1.OUT_QTY) as BAL_QTY,
                    (A1.IN_QTY + A1.FOC_QTY - A1.OUT_QTY) as OUT_QTY
                FROM
                    KSV_STOCK_MEM2 A1,
                    (
                        select
                            left(in_datetime, 8) as in_datetime,
                            po_cd,
                            vendor_cd,
                            matl_cd,
                            out_status,
                            bill_flag,
                            bill_date
                        from
                            ksv_stock_in
                        where
                            pu_cd = '${args.data.PU_CD}'
                        group by
                            left(in_datetime, 8),
                            po_cd,
                            vendor_cd,
                            matl_cd,
                            out_status,
                            bill_flag,
                            bill_date
                    ) A6,
                    KSV_PU_MST2 A5,
                    --KSV_PO_MRP A2, 
                    KCD_MATL_MST A3,
                    --KCD_MATL_MEM A4, 
                    KCD_BUYER A51,
                    KCD_VENDOR A52
                WHERE
                    A1.PU_CD = '${args.data.PU_CD}'
                    AND A1.PO_CD = A6.po_cd
                    AND A1.VENDOR_CD = A6.vendor_cd
                    AND A1.MATL_CD = A6.matl_cd
                    AND A1.PU_CD = A5.PU_CD
                    AND A1.MATL_CD = A3.MATL_CD
                    -- AND   A1.MATL_CD = A4.MATL_CD
                    -- AND   A1.MATL_SEQ = A4.MATL_SEQ
                    AND A1.IN_QTY > 0
                    AND A5.BUYER_CD = A51.BUYER_CD
                    AND A5.VENDOR_CD = A52.VENDOR_CD
                    AND (A1.IN_QTY + A1.FOC_QTY - A1.OUT_QTY) > 0
                order by
                    A1.PO_CD,
                    A1.PO_SEQ
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            return tRet;
        },

        // 4_2 Backup
        mgrQueryS0520_4_2_1: async (_, args) => {
            var tSQL = '';

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
                    (
                        A1.PO_QTY - A1.STOCK_QTY + A1.MOQ + isnull(A1.LEFTOVER_QTY, 0)
                    ) as PO_QTY,
                    A6.IN_QTY as STSIN_QTY,
                    A6.IN_DATETIME,
                    (A1.IN_QTY - A1.OUT_QTY) as BAL_QTY,
                    (A1.IN_QTY - A1.OUT_QTY) as OUT_QTY
                FROM
                    KSV_STOCK_MEM A1,
                    KSV_STOCK_IN A6,
                    KSV_PU_MST2 A5,
                    KSV_PO_MRP A2,
                    KCD_MATL_MST A3,
                    KCD_MATL_MEM A4
                WHERE
                    A1.PU_CD = '${args.data.PU_CD}'
                    AND A1.PU_CD = A6.PU_CD
                    AND A1.PO_CD = A6.PO_CD
                    AND A1.PO_SEQ = A6.PO_SEQ
                    AND A1.ORDER_CD = A6.ORDER_CD
                    AND A1.MATL_CD = A6.MATL_CD
                    AND A1.MRP_SEQ = A6.MRP_SEQ
                    AND A6.IN_QTY > 0
                    AND A6.IN_QTY > A6.OUT_QTY
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
                    AND A1.IN_QTY > A1.OUT_QTY
                order by
                    A1.PO_CD,
                    A1.PO_SEQ
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            return tRet;
        },
    },
};

export default moduleQuery_S0520_4_1;
