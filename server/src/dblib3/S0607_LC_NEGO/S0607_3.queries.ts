import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기

// export default로 Query 내용 내보내기
const moduleQuery_S0607_3 = {
    Query: {
        mgrQueryS0607_3: async (_, args) => {
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
            tRet.forEach((col, i) => {
                var tObj = { ...col };
                tObj.BILL_AMT = AFLib.numToFixed(parseFloat(tObj.BILL_AMT), 2);
                tRetArray.push(tObj);
            });
            return tRetArray;
        },
    },
};

export default moduleQuery_S0607_3;
