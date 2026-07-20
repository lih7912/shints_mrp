// MGR_@@TNAME@@.queries.js

import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S020401_ORDER_INFO_TBL_KSV_ORDER_MEM1 = {
    Query: {
        mgrQuery_S020401_ORDER_INFO_TBL_KSV_ORDER_MEM1: async (_, args) => {
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
                INVOICE_DATE: '',
                SHIP_PROD_TYPE: '',
                SHIP_QTY: '',
                SALE_PRICE: '',
                INVOICE_NO: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            return tRetArray;
        },
    },
};

export default moduleQuery_S020401_ORDER_INFO_TBL_KSV_ORDER_MEM1;
