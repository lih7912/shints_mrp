// MGR_@@TNAME@@.queries.js

import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0514_SHIPPING_REGIST_BVT_OLD_TBL_KSV_ORDER_SHIP = {
    Query: {
        mgrQuery_S0514_SHIPPING_REGIST_BVT_OLD_TBL_KSV_ORDER_SHIP: async (
            _,
            args,
        ) => {
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
                ORDER_CD: '',
                BUYER_NAME: '',
                STYLE_NAME: '',
                DUE_DATE: '',
                ORDER_QTY: '',
                SHIP_QTY: '',
                FOB_USD: '',
                EXFACTORY: '',
                SHIP_DATE: '',
                SHIP_PROD_TYPE: '',
                INVOICE_NO: '',
                NAT_NAME: '',
                DELIVERY_TYPE: '',
                ORDER_STATUS: '',
                FACTORY_NAME: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            return tRetArray;
        },
    },
};

export default moduleQuery_S0514_SHIPPING_REGIST_BVT_OLD_TBL_KSV_ORDER_SHIP;
