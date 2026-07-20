// MGR_@@TNAME@@.queries.js

import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0208_CAPABOOK_RECORD_BVT_TBL_KSV_CAPABOOK_MEM1 = {
    Query: {
        mgrQuery_S0208_CAPABOOK_RECORD_BVT_TBL_KSV_CAPABOOK_MEM1: async (
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
                JOB_CD: '',
                IN_DATE: '',
                BUYER_NAME: '',
                BUYER_CD: '',
                PO_CD: '',
                ORDER_CD: '',
                STYLE_NAME: '',
                STYLE_CD: '',
                NR: '',
                QTY: '',
                MW: '',
                SHIP_DATE: '',
                S_ETA: '',
                M_ETA: '',
                SD: '',
                FOB: '',
                EXP_CMPT: '',
                NEGO_TYPE: '',
                EMBRO: '',
                TP: '',
                SP: '',
                LTHR: '',
                G: '',
                W: '',
                S: '',
                FND: '',
                DL: '',
                TPR: '',
                EMBOSSING: '',
                WASHING: '',
                DOWN: '',
                CUT: '',
                FTP: '',
                DTP: '',
                LAZE: '',
                BVT_KIND: '',
                SEQ: '',
                REMARK: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            return tRetArray;
        },
    },
};

export default moduleQuery_S0208_CAPABOOK_RECORD_BVT_TBL_KSV_CAPABOOK_MEM1;
