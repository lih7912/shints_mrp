// MGR_@@TNAME@@.queries.js

import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0707_MAN_INVOICE_TBL_KSV_INVOICE_MST = {
    Query: {
        mgrQuery_S0707_MAN_INVOICE_TBL_KSV_INVOICE_MST: async (_, args) => {
            var tSQL = '';
            /*
       if (args.KEY1 !== '') {
           tSQL += `AND KEY1 = '${args.KEY1}' `;
       }
*/
            /*
       let sqlStr = `
           SELECT
               *
           FROM
               @@TNAME@@
           WHERE
               id > 0 ${tSQL}
       `;
       var tRet  =  await prisma.$queryRaw(Prisma.raw(sqlStr));
*/
            var tRetData = {
                REF_NO: '',
                BANK_NAME: '',
                BUYER_NAME: '',
                BILL_DATE: '',
                CURR_CD: '',
                BILL_AMT: '',
                CONFIRM_AMT: '',
                BAL_AMT: '',
                END_FLAG: '',
                BILL_TYPE: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            return tRetArray;
        },
    },
};

export default moduleQuery_S0707_MAN_INVOICE_TBL_KSV_INVOICE_MST;
