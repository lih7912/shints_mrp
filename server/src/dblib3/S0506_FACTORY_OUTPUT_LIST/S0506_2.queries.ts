import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0506_2 = {
    Query: {
        mgrQueryS0506_2: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }
            let sqlStr = `
                SELECT
                    A.PO_CD,
                    A.OUT_DATE,
                    A.ORDER_CD,
                    D.VENDOR_NAME,
                    C.MATL_NAME,
                    C.COLOR,
                    C.SPEC,
                    C.UNIT,
                    A.OUT_QTY,
                    C.MATL_CD,
                    D.VENDOR_TYPE
                FROM
                    KSV_STOCK_FACOUT A,
                    KCD_MATL_MST C,
                    KCD_VENDOR D
                WHERE
                    LEFT(A.OUT_DATE, 8) BETWEEN '20230101' AND '20231231'
                    AND A.PO_CD LIKE '%%'
                    AND C.MATL_CD = A.MATL_CD
                    AND C.VENDOR_CD LIKE '%'
                    AND C.MATL_CD LIKE '%%'
                    AND C.MATL_NAME LIKE '%%'
                    AND C.COLOR LIKE '%%'
                    AND C.SPEC LIKE '%%'
                    AND C.UNIT LIKE '%%'
                    AND A.ORDER_CD LIKE '%%'
                    AND D.VENDOR_CD = C.VENDOR_CD
                    AND D.VENDOR_TYPE LIKE '%'
                ORDER BY
                    2 DESC
                    -- OFFSET 0 ROWS FETCH NEXT 1000 ROWS ONLY
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                PO_CD: '',
                OUT_DATE: '',
                ORDER_CD: '',
                VENDOR_NAME: '',
                MATL_NAME: '',
                COLOR: '',
                SPEC: '',
                UNIT: '',
                OUT_QTY: 0,
                MATL_CD: '',
                VENDOR_TYPE: '',
                ETC99: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S0506_2;
