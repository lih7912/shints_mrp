import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0439_4_1 = {
    Query: {
        mgrQueryS0439_4_1: async (_, args) => {
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
                            sum(A1.PO_QTY) AS MRP_QTY,
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
                            A1.PO_CD IN (${tSQL0})
                            AND A1.PO_CD = A6.PO_CD
                            AND A1.PO_SEQ = A6.PO_SEQ
                            AND A6.PO_STATUS = '4'
                            AND A1.ORDER_CD = A5.ORDER_CD
                            AND A5.ORDER_STATUS in ('3', '5', '6')
                            AND A1.PO_SEQ < 97
                            AND A1.PO_QTY > 0
                            AND LEFT(A1.ORDER_CD, 2) = '${args.data.BUYER_CD}'
                            AND A1.MATL_CD = A3.MATL_CD
                            AND A3.VENDOR_CD = '${args.data.VENDOR_CD}'
                            AND A1.MATL_CD = A4.MATL_CD
                            AND A1.MATL_SEQ = A4.MATL_SEQ
                            AND A1.STOCK_STATUS = '0'
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

            var tWObj = {};
            tWObj.STOCK_MEM = tRet;

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

        mgrQueryS0439_4_2: async (_, args) => {
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
                            sum(A1.PO_QTY) AS MRP_QTY,
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
                            AND A1.PO_QTY > 0
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

            var tWObj = {};
            tWObj.STOCK_MEM = tRet;

            let sqlStr = `
                select
                    *
                from
                    ksv_pu_mst2
                where
                    pu_cd = '${args.data.PU_CD}'
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWObj.PU_MST = tRet;

            return tWObj;
        },
    },
};

export default moduleQuery_S0439_4_1;
