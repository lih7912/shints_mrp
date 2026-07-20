import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0802_3 = {
    Query: {
        mgrQueryS0802_3: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }
            let sqlStr = `
                SELECT
                    A.INVOICE_NO,
                    A.ORDER_CD,
                    A.PROD_CD,
                    C.COLOR,
                    B.PRICE,
                    B.TOT_CNT,
                    A.SHIP_CNT,
                    B.SIZE_CNT as ORDER_SIZE_CNT,
                    A.SIZE_CNT as SHIP_SIZE_CNT,
                    E.SIZE_GROUP,
                    E.SIZE_MEMBER
                FROM
                    KSV_ORDER_SHIP A,
                    KSV_ORDER_MEM B,
                    KSV_PROD_MST C,
                    KSV_ORDER_MST D,
                    KCD_SIZE_MST E
                WHERE
                    A.INVOICE_NO = '${args.data.INVOICE_NO}'
                    AND LEFT(A.ORDER_CD, 2) = '${args.data.BUYER_CD}'
                    AND A.SHIP_DATE = '${args.data.SHIP_DATE}'
                    AND A.NAT_CD = '${args.data.NAT_CD}'
                    AND A.SHIP_PTYPE = '${args.data.SHIP_MODE}'
                    AND A.ORDER_CD = B.ORDER_CD
                    AND A.PROD_CD = B.PROD_CD
                    AND B.ADD_FLAG = '0'
                    AND B.PROD_CD = C.PROD_CD
                    AND A.ORDER_CD = D.ORDER_CD
                    AND D.SIZE_GROUP = E.SIZE_GROUP
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                INVOICE_NO: '',
                ORDER_CD: '',
                PROD_CD: '',
                COLOR: '',
                PRICE: 0,
                TOT_CNT: 0,
                SHIP_CNT: 0,
                ORDER_SIZE_CNT: '',
                SHIP_SIZE_CNT: '',
                ETC99: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S0802_3;
