import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
// PRE_FLAG
const moduleQuery_S0708_LIST_5 = {
    Query: {
        mgrQueryS0708_LIST_5: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }

            var sql_PRE_FLAG = '';
            if (args.data.PRE_FLAG === '0' || args.data.PRE_FLAG === '') {
                sql_PRE_FLAG = ` and a.pre_flag  in ('0', '')  `;
            } else {
                sql_PRE_FLAG = ` and a.pre_flag  = '${args.data.PRE_FLAG}'  `;
            }

            let sqlStr = `
                select
                    a.CREDIT_CD,
                    a.CREDIT_AMT,
                    a.ref_no
                from
                    ksv_invoice_credit a
                where
                    a.ref_no = '${args.data.REF_NO}'
                    -- where a.buyer_cd like '%${args.data.BUYER_CD}%' 
                    ${sql_PRE_FLAG}
                order by
                    a.credit_cd
            `;

            var tRet = [];
            tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            var tRetData = {};

            var tRetArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tObj = { ...tRet[tIdx] };
                tRetArray.push(tObj);
            }
            return tRetArray;
        },
    },
};

export default moduleQuery_S0708_LIST_5;
