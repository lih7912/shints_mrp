// MGR_@@TNAME@@.queries.js

import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0202_STYLE_COST_TBL_KSV_PROD_MST = {
    Query: {
        mgrQuery_S0202_STYLE_COST_TBL_KSV_PROD_MST: async (_, args) => {
            var tSQL = '';
            /*
       if (args.KEY1 !== '') {
           tSQL += `AND KEY1 = '${args.KEY1}' `;
       }
*/
            /*
       var tStyleCd = args.data.STYLE_CD;
       let sqlStr = `
           SELECT
               B.CD_NAME,
               A.COLOR,
               A.COLLECTION,
               '0',
               A.PROD_UNIT,
               A.PROD_CD,
               A.PROD_TYPE
           FROM
               (
                   SELECT
                       *
                   FROM
                       KSV_PROD_MST
                   WHERE
                       STYLE_CD = '${tStyleCd}'
               ) A
               LEFT JOIN KCD_CODE B ON A.PROD_TYPE = B.CD_CODE
               AND B.CD_GROUP = 'PROD_TYPE'
       `;
*/
            var tStyleCd = args.data.STYLE_CD;
            let sqlStr = `
                select
                    B.CD_NAME as PROD_TYPE_NAME,
                    A.COLOR,
                    A.COLLECTION,
                    A.PROD_UNIT,
                    A.PROD_CD,
                    A.PROD_TYPE,
                    count(*) as c_cnt
                from
                    KSV_PROD_MST A
                    LEFT JOIN KCD_CODE B ON A.PROD_TYPE = B.CD_CODE
                    AND B.CD_GROUP = 'PROD_TYPE'
                    LEFT JOIN KSV_PROD_MEM C ON A.PROD_CD = C.PROD_CD
                where
                    A.STYLE_CD = '${tStyleCd}'
                group by
                    B.CD_NAME,
                    A.COLOR,
                    A.COLLECTION,
                    A.PROD_UNIT,
                    A.PROD_CD,
                    A.PROD_TYPE
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            var tRetData = {
                PROD_TYPE_NAME: '',
                COLOR: '',
                COLLECTION: '',
                PROD_UNIT: '',
                PROD_CD: '',
                PROD_TYPE: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S0202_STYLE_COST_TBL_KSV_PROD_MST;
