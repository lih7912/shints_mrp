import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0604_2 = {
    Query: {
        mgrQueryS0604_2: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }

            var tWObj = {};

            let sqlStr0 = `
                SELECT
                    A.DELIVERY_TYPE,
                    A.SHIP_DATE,
                    A.TOT_AMT,
                    A.ORD_AMT,
                    A.ADJ_AMT,
                    A.BUYER_CD,
                    A.CURR_CD,
                    A.REMARK,
                    A.EXT_INVOICE,
                    A.CUSTOMS,
                    A.VAT,
                    A.FREIGHT,
                    A.CLEARANCE
                FROM
                    KSV_IMPCHARGE_MST A
                WHERE
                    A.INVOICE_NO = '${args.data.INVOICE_NO}'
            `;
            var tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr0));
            tWObj.DATA1 = tRet0;

            let sqlStr = `
                SELECT
                    LEFT(A.ORDER_CD, 2) AS BUYER_CD,
                    A.PO_CD,
                    B.ORDER_CD,
                    E.STYLE_NAME,
                    A.SHIP_QTY,
                    A.SHIP_PRICE,
                    (A.SHIP_QTY * A.SHIP_PRICE) AS SHIP_AMT,
                    A.TOT_AMT,
                    D.FACTORY_NAME,
                    A.INVOICE_NO,
                    A.SEQ,
                    A.SHIP_DATE,
                    A.SHIP_PTYPE,
                    A.NAT_CD,
                    A.DELIVERY_TYPE,
                    A.TOT_AMT AS IMPORT_ORG
                FROM
                    KSV_IMPCHARGE_MEM A,
                    KSV_ORDER_MST B,
                    KCD_FACTORY D,
                    KCD_STYLE E
                WHERE
                    A.INVOICE_NO = '${args.data.INVOICE_NO}'
                    AND B.ORDER_CD = A.ORDER_CD
                    AND D.FACTORY_CD = A.FACTORY_CD
                    AND E.STYLE_CD = B.STYLE_CD
                    AND A.SHIP_DATE >= '20230101'
                ORDER BY
                    A.SHIP_DATE DESC
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWObj.DATA2 = tRet;

            return tWObj;
        },
    },
};

export default moduleQuery_S0604_2;
