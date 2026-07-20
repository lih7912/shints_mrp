import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0605_2 = {
    Query: {
        mgrQueryS0605_2: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }
            let sqlStr = `
                SELECT
                    A.INVOICE_NO,
                    A.SHIP_DATE,
                    A.CURR_CD,
                    A.ORD_AMT,
                    A.TOT_AMT,
                    A.CUSTOMS,
                    A.VAT,
                    A.FREIGHT,
                    A.CLEARANCE,
                    A.REMARK,
                    D.CD_NAME,
                    C.BUYER_CD,
                    C.BUYER_NAME
                FROM
                    KSV_IMPCHARGE_MST A,
                    KCD_BUYER C,
                    KCD_CODE D
                WHERE
                    A.SHIP_DATE BETWEEN '20230101' AND '20231231'
                    AND A.DELIVERY_TYPE LIKE '%'
                    AND A.BUYER_CD LIKE '%'
                    AND A.INVOICE_TYPE = '3'
                    AND C.BUYER_CD = A.BUYER_CD
                    AND D.CD_GROUP = 'DELIVERY_TYPE'
                    AND D.CD_CODE = A.DELIVERY_TYPE
                ORDER BY
                    2 DESC
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                INVOICE_NO: '',
                SHIP_DATE: '',
                CURR_CD: '',
                ORD_AMT: 0,
                TOT_AMT: 0,
                CUSTOMS: 0,
                VAT: 0,
                FREIGHT: 0,
                CLEARANCE: 0,
                REMARK: '',
                CD_NAME: '',
                BUYER_CD: '',
                BUYER_NAME: '',
                ETC99: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S0605_2;
