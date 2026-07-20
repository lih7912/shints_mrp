import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0603_2 = {
    Query: {
        mgrQueryS0603_2: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }
            let sqlStr = `
                SELECT
                    A.INVOICE_NO,
                    A.EXT_INVOICE,
                    A.SHIP_DATE,
                    A.DUE_DATE,
                    A.TRANSFER_DATE,
                    A.CURR_CD,
                    A.TOT_AMT,
                    A.ADJ_AMT,
                    0 AS IN_AMT,
                    0 AS OA_NEGO,
                    0 AS REST_AMT,
                    A.REMARK,
                    D.CD_NAME AS DELIVERY_TYPE_N,
                    C.BUYER_CD,
                    C.BUYER_NAME,
                    A.DOCU_NO,
                    C.NEOE_BUYER_CD
                FROM
                    KSV_INVOICE_MST A,
                    KCD_BUYER C,
                    KCD_CODE D
                WHERE
                    A.SHIP_DATE BETWEEN '20230101' AND '20231230'
                    AND A.DELIVERY_TYPE LIKE '%'
                    AND A.BUYER_CD LIKE '%'
                    AND A.FACTORY_CD LIKE '%'
                    AND ISNULL(A.PAYMENT_TYPE, '') LIKE '%'
                    AND ISNULL(A.TRADE_TYPE, '') LIKE '%'
                    AND A.INVOICE_TYPE = '1'
                    AND C.BUYER_CD = A.BUYER_CD
                    AND D.CD_GROUP = 'DELIVERY_TYPE'
                    AND D.CD_CODE = A.DELIVERY_TYPE
                ORDER BY
                    A.SHIP_DATE DESC
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                INVOICE_NO: '',
                EXT_INVOICE: '',
                SHIP_DATE: '',
                DUE_DATE: '',
                TRANSFER_DATE: '',
                CURR_CD: '',
                TOT_AMT: 0,
                ADJ_AMT: 0,
                IN_AMT: 0,
                OA_NEGO: 0,
                REST_AMT: 0,
                REMARK: '',
                DELIVERY_TYPE_N: '',
                BUYER_CD: '',
                BUYER_NAME: '',
                DOCU_NO: '',
                NEOE_BUYER_CD: '',
                ETC99: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S0603_2;
