import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0601_3 = {
    Query: {
        mgrQueryS0601_3: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }
            let sqlStr = `
                SELECT
                    A.ORDER_CD,
                    LEFT(A.ORDER_CD, 2) AS BUYER_CD,
                    H.NAT_NAME,
                    A.INVOICE_NO,
                    B.PO_CD,
                    E.STYLE_NAME,
                    C.CD_NAME AS SHIP_PTYPE_N,
                    F.CD_NAME AS DELIVERY_TYPE_N,
                    SUM(A.SHIP_CNT) AS SHIP_CNT,
                    G.AVR_PRICE,
                    D.FACTORY_NAME,
                    D.FACTORY_CD,
                    A.NAT_CD,
                    A.DELIVERY_TYPE,
                    A.SHIP_PTYPE,
                    A.SHIP_DATE,
                    G.ORDER_STATUS
                FROM
                    KSV_ORDER_SHIP A
                    LEFT JOIN KSV_PO_MEM B ON B.ORDER_CD = A.ORDER_CD
                    AND B.PO_SEQ = '1'
                    LEFT JOIN KCD_CODE F ON F.CD_GROUP = 'DELIVERY_TYPE'
                    AND F.CD_CODE = A.DELIVERY_TYPE,
                    KCD_CODE C,
                    KCD_FACTORY D,
                    KCD_STYLE E,
                    KSV_ORDER_MST G
                    LEFT JOIN KCD_NATION H ON H.NAT_CD = G.NAT_CD
                WHERE
                    A.INVOICE_NO = '${args.data.INVOICE_NO}'
                    AND C.CD_GROUP = 'SHIP_PTYPE'
                    AND C.CD_CODE = A.SHIP_PTYPE
                    AND D.FACTORY_CD = G.FACTORY_CD
                    AND E.STYLE_CD = G.STYLE_CD
                    AND G.ORDER_CD = A.ORDER_CD
                GROUP BY
                    H.NAT_NAME,
                    A.INVOICE_NO,
                    B.PO_CD,
                    A.ORDER_CD,
                    E.STYLE_NAME,
                    C.CD_NAME,
                    F.CD_NAME,
                    G.AVR_PRICE,
                    D.FACTORY_NAME,
                    D.FACTORY_CD,
                    A.NAT_CD,
                    A.DELIVERY_TYPE,
                    A.SHIP_PTYPE,
                    A.SHIP_DATE,
                    G.ORDER_STATUS
                ORDER BY
                    1
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                ORDER_CD: '',
                BUYER_CD: '',
                NAT_NAME: '',
                INVOICE_NO: '',
                PO_CD: '',
                ORDER_CD: '',
                STYLE_NAME: '',
                SHIP_PTYPE_N: '',
                DELIVERY_TYPE_N: '',
                SHIP_CNT: 0,
                AVR_PRICE: 0,
                FACTORY_NAME: '',
                FACTORY_CD: '',
                NAT_CD: '',
                DELIVERY_TYPE: '',
                SHIP_PTYPE: '',
                SHIP_DATE: '',
                ORDER_STATUS: '',
                ETC99: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S0601_3;
