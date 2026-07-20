import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0601_2 = {
    Query: {
        mgrQueryS0601_2: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }

            var tWObj = {};

            let sqlStr0 = `
                SELECT
                    A.INVOICE_NO,
                    A.DELIVERY_TYPE,
                    A.SHIP_DATE,
                    A.TOT_AMT,
                    A.ORD_AMT,
                    A.ADJ_AMT,
                    A.BUYER_CD,
                    A.CURR_CD,
                    A.REMARK,
                    isnull(A.EXT_INVOICE, '') as EXT_INVOICE,
                    A.DOCU_NO,
                    A.FACTORY_CD,
                    ISNULL(A.PAYMENT_TYPE, ' ') AS PAYMENT_TYPE,
                    ISNULL(A.TRADE_TYPE, ' ') AS TRADE_TYPE,
                    A.DUE_DATE,
                    isnull(A.TRANSFER_DATE, '') as TRANSFER_DATE,
                    isnull(A.MANAGE_AMT, 0) as MANAGE_AMT,
                    isnull(ETC_AMT, 0) as ETC_AMT,
                    isnull(LICENSE_DATE, '') as LICENSE_DATE,
                    isnull(LICENSE_NO, '') as LICENSE_NO,
                    ISNULL(A.TRADE_TYPE2, ' ') AS TRADE_TYPE2,
                    isnull(A.VOS_AMT, 0) as VOS_AMT,
                    isnull(A.VAT_AMT, 0) as VAT_AMT,
                    isnull(A.VAT_DATE, '') as VAT_DATE,
                    A.BL_NO
                FROM
                    KSV_INVOICE_MST A
                WHERE
                    A.INVOICE_NO = '${args.data.INVOICE_NO}'
                    AND INVOICE_TYPE = '1'
                ORDER BY
                    A.SHIP_DATE DESC
                    -- OFFSET 0 ROWS FETCH NEXT 10 ROWS ONLY
            `;
            var tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr0));

            var tObj9 = { ...tRet0[0] };

            let sqlStr0_1 = `
                select
                    isnull(sum(bill_amt), 0) as BILL_AMT,
                    isnull(BILL_TYPE, '') as BILL_TYPE
                from
                    ksv_invoice_bill
                where
                    invoice_no = '${args.data.INVOICE_NO}'
                group by
                    bill_type
            `;
            var tRet0_1 = await prisma.$queryRaw(Prisma.raw(sqlStr0_1));
            if (tRet0_1.length > 0) {
                tObj9.BILL_AMT = tRet0_1[0].BILL_AMT;
                tObj9.BILL_TYPE = tRet0_1[0].BILL_TYPE;
            } else {
                tObj9.BILL_AMT = 0.0;
                tObj9.BILL_TYPE = '';
            }

            let sqlStr0_2 = `
                select
                    isnull(CRDB_CD, '') as CRDB_CD
                from
                    ksv_crdb_mst
                where
                    title = '${args.data.INVOICE_NO}'
            `;
            var tRet0_2 = await prisma.$queryRaw(Prisma.raw(sqlStr0_2));
            if (tRet0_2.length > 0) {
                tObj9.CRDB_CD = tRet0_2[0].CRDB_CD;
            } else {
                tObj9.CRDB_CD = '';
            }

            let sqlStr0_3 = `
                select
                    isnull(NEOE_BUYER_CD, '') as NEOE_BUYER_CD,
                    isnull(neoe_a23, '') as NEOE_A23
                from
                    kcd_buyer
                where
                    buyer_cd = '${tObj9.BUYER_CD}'
            `;
            var tRet0_3 = await prisma.$queryRaw(Prisma.raw(sqlStr0_3));
            if (tRet0_3.length > 0) {
                tObj9.NEOE_BUYER_CD = tRet0_3[0].NEOE_BUYER_CD;
                tObj9.NEOE_A23 = tRet0_3[0].NEOE_A23;
            } else {
                tObj9.NEOE_BUYER_CD = ' ';
                tObj9.NEOE_A23 = '';
            }

            var tArray0 = [];
            tArray0.push(tObj9);
            tWObj.DATA1 = tArray0;

            let sqlStr = `
                SELECT DISTINCT
                    LEFT(A.ORDER_CD, 2) AS BUYER_CD,
                    A.PO_CD,
                    B.ORDER_CD,
                    E.STYLE_NAME,
                    A.SHIP_QTY,
                    A.ORD_PRICE,
                    A.SALES_PRICE,
                    A.SHIP_PRICE,
                    A.DIFF_PRICE,
                    A.TOT_AMT,
                    '0' AS COL1,
                    D.FACTORY_NAME,
                    A.INVOICE_NO,
                    A.SEQ,
                    F.EXFACTORY,
                    A.SHIP_DATE,
                    A.SHIP_PTYPE,
                    A.NAT_CD,
                    A.DELIVERY_TYPE
                FROM
                    KSV_INVOICE_MEM A,
                    KSV_ORDER_MST B,
                    KCD_FACTORY D,
                    KCD_STYLE E,
                    KSV_ORDER_SHIP F
                WHERE
                    A.INVOICE_NO = '${args.data.INVOICE_NO}'
                    AND B.ORDER_CD = A.ORDER_CD
                    AND D.FACTORY_CD = A.FACTORY_CD
                    AND E.STYLE_CD = B.STYLE_CD
                    AND B.ORDER_CD = F.ORDER_CD
                    AND A.INVOICE_NO = F.INVOICE_NO
                    AND A.SHIP_DATE = F.SHIP_DATE
                ORDER BY
                    1
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWObj.DATA2 = tRet;

            var tRetArray = [];
            var tIdx = 0;
            return tWObj;
        },
    },
};

export default moduleQuery_S0601_2;
