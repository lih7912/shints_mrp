import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0609_3 = {
    Query: {
        mgrQueryS0609_3: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }
            let sqlStr = `
                SELECT
                    A.INCOME_NO,
                    A.EXPORT_DATE,
                    A.EXPORT_NO,
                    A.RETURN_DATE,
                    A.RETURN_AMT
                FROM
                    KSV_DUTY_MEM A
                WHERE
                    A.INCOME_NO = '12866-09-101706U'
                ORDER BY
                    A.INCOME_NO,
                    A.EXPORT_DATE
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                INCOME_NO: '',
                EXPORT_DATE: '',
                EXPORT_NO: '',
                RETURN_DATE: '',
                RETURN_AMT: 0,
                ETC99: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S0609_3;
