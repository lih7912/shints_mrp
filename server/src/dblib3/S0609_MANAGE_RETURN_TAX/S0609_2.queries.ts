import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0609_2 = {
    Query: {
        mgrQueryS0609_2: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }
            let sqlStr = `
                SELECT
                    A.INCOME_NO,
                    A.VENDOR_NAME,
                    A.ITEM,
                    A.INCOME_DATE,
                    A.DUTY_AMT,
                    A.RETURN_AMT,
                    C.CD_NAME AS END_FLAG_N,
                    (
                        CASE
                            WHEN A.NO_RET_FLAG = '1' THEN '환급불가'
                            ELSE ''
                        END
                    ) AS NO_RET_NAME,
                    A.REMARK,
                    A.NO_RET_FLAG,
                    A.END_FLAG,
                    A.VENDOR_CD,
                    LEFT(A.INCOME_NO, 5) AS INCOME_NO1,
                    SUBSTRING(A.INCOME_NO, 7, 2) AS INCOME_NO2,
                    RIGHT(A.INCOME_NO, 7) AS INCOME_NO3
                FROM
                    KSV_DUTY_MST A,
                    KCD_CODE C
                    -- WHERE A.END_FLAG = '0' 
                WHERE
                    A.INCOME_NO LIKE '%%'
                    AND C.CD_GROUP = 'END_FLAG'
                    AND C.CD_CODE = A.END_FLAG
                ORDER BY
                    A.INCOME_DATE DESC
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                INCOME_NO: '',
                VENDOR_NAME: '',
                ITEM: '',
                INCOME_DATE: '',
                DUTY_AMT: 0,
                RETURN_AMT: 0,
                END_FLAG_N: '',
                NO_RET_NAME: '',
                REMARK: '',
                NO_RET_FLAG: '',
                END_FLAG: '',
                VENDOR_CD: '',
                INCOME_NO1: '',
                INCOME_NO2: '',
                INCOME_NO3: '',
                ETC99: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S0609_2;
