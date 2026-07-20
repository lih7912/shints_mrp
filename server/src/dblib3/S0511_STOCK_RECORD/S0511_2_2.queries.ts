import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0511_2_2 = {
    Query: {
        mgrQueryS0511_2_2: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }
            let sqlStr = `
                SELECT
                    A.MATL_CD,
                    A.MATL_NAME,
                    A.COLOR,
                    A.SPEC,
                    A.UNIT,
                    0 AS STOCK_QTY,
                    '' AS RACK,
                    '' AS LOCATION,
                    '' AS REASON_PLAN,
                    '' AS REMARK,
                    C.VENDOR_NAME,
                    B.MATL_SEQ,
                    A.STATUS_CD,
                    C.STATUS_CD AS VENDOR_STATUS
                FROM
                    KCD_MATL_MST A,
                    KCD_MATL_MEM B,
                    KCD_VENDOR C
                WHERE
                    A.MATL_NAME LIKE '%${args.data.MATL_NAME}%' ESCAPE '['
                    AND A.COLOR LIKE '%${args.data.COLOR}%'
                    AND A.SPEC LIKE '%${args.data.SPEC}%'
                    AND A.MATL_CD LIKE '${args.data.MATL_CD}%'
                    AND A.STATUS_CD IN ('0', '1')
                    AND C.STATUS_CD IN ('0', '1')
                    AND B.MATL_CD = A.MATL_CD
                    AND B.MATL_SEQ = (
                        SELECT
                            MAX(MATL_SEQ)
                        FROM
                            KCD_MATL_MEM
                        WHERE
                            MATL_CD = A.MATL_CD
                    )
                    AND C.VENDOR_CD = A.VENDOR_CD
                    AND C.VENDOR_NAME LIKE '%${args.data.VENDOR_NAME}%'
                ORDER BY
                    1 DESC
                    -- OFFSET 0 ROWS FETCH NEXT 1000 ROWS ONLY
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S0511_2_2;
