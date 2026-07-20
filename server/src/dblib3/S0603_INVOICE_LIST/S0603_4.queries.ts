import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0603_4 = {
    Query: {
        mgrQueryS0603_4: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }
            let sqlStr = `
                SELECT
                    A.INVOICE_NO,
                    A.ORDER_CD,
                    SUM(A.SHIP_CNT) AS SHIP_CNT,
                    C.CD_NAME AS SHIP_PTYPE_N,
                    ISNULL(F.CD_NAME, '') AS DELIVERY_TYPE_N
                FROM
                    KSV_ORDER_SHIP A
                    LEFT JOIN KCD_CODE F ON F.CD_GROUP = 'DELIVERY_TYPE'
                    AND F.CD_CODE = A.DELIVERY_TYPE,
                    KCD_CODE C
                WHERE
                    A.SHIP_DATE = '20230624'
                    AND A.INVOICE_NO = 'AFIN-001'
                    AND A.SHIP_PTYPE IN ('0', '5')
                    AND C.CD_GROUP = 'SHIP_PTYPE'
                    AND C.CD_CODE = A.SHIP_PTYPE
                GROUP BY
                    A.INVOICE_NO,
                    A.ORDER_CD,
                    C.CD_NAME,
                    F.CD_NAME
                ORDER BY
                    A.ORDER_CD
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                INVOICE_NO: '',
                ORDER_CD: '',
                SHIP_CNT: 0,
                SHIP_PTYPE_N: '',
                DELIVERY_TYPE_N: '',
                ETC99: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S0603_4;
