// MGR_@@TNAME@@.queries.js

import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0105_KCD_HSCODE_TBL_KCD_HSCODE = {
    Query: {
        mgrQuery_S0105_KCD_HSCODE_TBL_KCD_HSCODE: async (_, args) => {
            var tSQL = '';
            /*
       if (args.KEY1 !== '') {
           tSQL += `AND KEY1 = '${args.KEY1}' `;
       }
*/
            /*
       if(args.data.HS_CD !== ''){
        tSQL = ` AND HS_CD like '%%${args.data.HS_CD}%%'`
       }
       
       if(args.data.HS_NAME !== ''){
        tSQL = ` AND HS_NAME like '%%${args.data.HS_NAME}%%'`
       }
*/

            let tempCD = args.data.HS_CD.replace(".","").replace('/-/g',"");
            //let tempCD = args.data.HS_CD;

            let sqlStr = `
                SELECT
                    id,
                    HS_NO,
                    HS_CD,
                    HS_NAME
                FROM
                    KCD_HSCODE
                WHERE
                    id > 0
                    AND CHK_HS_CD like '%${tempCD}%'
                    AND HS_NAME like '%${args.data.HS_NAME}%'
                ORDER BY
                    HS_NO
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                HS_NO: '',
                HS_CODE: '',
                HS_NAME: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S0105_KCD_HSCODE_TBL_KCD_HSCODE;
