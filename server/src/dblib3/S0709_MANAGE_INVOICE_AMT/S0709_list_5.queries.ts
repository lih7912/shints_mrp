import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0709_LIST_5 = {
    Query: {
        mgrQueryS0709_LIST_5: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }
            let sqlStr = `
                select
                    a.CREDIT_CD,
                    a.CREDIT_AMT
                from
                    ksv_invoice_credit a
                where
                    a.ref_no = '${args.data.REF_NO}'
                    and a.invoice_no <> '미정'
                    and a.pre_flag = '${args.data.PRE_FLAG}'
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

export default moduleQuery_S0709_LIST_5;
