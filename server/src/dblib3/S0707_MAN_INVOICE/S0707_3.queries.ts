import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0707_3 = {
    Query: {
        mgrQueryS0707_3: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }
            let sqlStr = `
                SELECT
                    A.INVOICE_NO,
                    A.BILL_AMT
                FROM
                    KSV_INVOICE_BILL A
                    -- WHERE A.REF_NO = 'N07ND2303OA00067' 
                WHERE
                    A.REF_NO = '${args.data.REF_NO}'
                ORDER BY
                    A.INVOICE_NO
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                INVOICE_NO: '',
                BILL_AMT: 0,
                ETC99: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S0707_3;
