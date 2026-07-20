import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0603_3 = {
    Query: {
        mgrQueryS0603_3: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }
            let sqlStr = `
                SELECT
                    A.INVOICE_NO,
                    A.ORDER_CD,
                    E.STYLE_NAME,
                    A.SHIP_QTY,
                    A.SHIP_PRICE,
                    A.TOT_AMT,
                    LEFT(B.ORDER_CD, 2) AS BUYER_CD,
                    A.PO_CD
                FROM
                    KSV_INVOICE_MEM A,
                    KSV_ORDER_MST B,
                    KCD_STYLE E
                WHERE
                    A.INVOICE_NO = 'AFIN-001'
                    AND B.ORDER_CD = A.ORDER_CD
                    AND E.STYLE_CD = B.STYLE_CD
                ORDER BY
                    A.ORDER_CD
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                INVOICE_NO: '',
                ORDER_CD: '',
                STYLE_NAME: '',
                SHIP_QTY: 0,
                SHIP_PRICE: 0,
                TOT_AMT: 0,
                BUYER_CD: '',
                PO_CD: '',
                ETC99: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S0603_3;
