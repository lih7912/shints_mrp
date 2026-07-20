import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0501_2_3 = {
    Query: {
        mgrQueryS0501_2_3: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }
            let sqlStr = `
                SELECT
                    A.OUT_FROM,
                    '1-1' as PR_NUM,
                    A.MATL_CD,
                    C.MATL_NAME,
                    C.COLOR,
                    C.SPEC,
                    C.UNIT,
                    D.MATL_PRICE,
                    D.CURR_CD,
                    SUM(A.OUT_QTY) as OUT_QTY,
                    SUM(A.OUT_QTY) as OUT_QTY_2,
                    A.REMARK,
                    '' as COL1,
                    '' as COL2,
                    '' as COL3
                FROM
                    KSV_STOCK_OUT A,
                    KCD_MATL_MST C,
                    KCD_MATL_MEM D
                WHERE
                    A.PO_CD = 'PO23-0229'
                    AND A.MATL_CD LIKE '%%'
                    AND C.MATL_CD = A.MATL_CD
                    AND C.MATL_NAME LIKE '%%' ESCAPE '['
                    AND C.VENDOR_CD LIKE '%'
                    AND C.COLOR LIKE '%%'
                    AND C.SPEC LIKE '%%'
                    AND C.UNIT LIKE '%'
                    AND D.MATL_CD = A.MATL_CD
                    AND D.MATL_SEQ = (
                        SELECT
                            MAX(MATL_SEQ)
                        FROM
                            KCD_MATL_MEM
                        WHERE
                            MATL_CD = A.MATL_CD
                    )
                    AND LEFT(A.OUT_FROM, 5) = 'STOCK'
                GROUP BY
                    A.OUT_FROM,
                    A.MATL_CD,
                    C.MATL_NAME,
                    C.COLOR,
                    C.SPEC,
                    C.UNIT,
                    D.MATL_PRICE,
                    D.CURR_CD,
                    A.REMARK
                ORDER BY
                    A.OUT_FROM
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                OUT_FROM: '',
                PR_NUM: '',
                MATL_CD: '',
                MATL_NAME: '',
                COLOR: '',
                SPEC: '',
                UNIT: '',
                MATL_PRICE: 0,
                CURR_CD: '',
                OUT_QTY: 0,
                OUT_QTY_2: 0,
                REMARK: '',
                COL1: '',
                COL2: '',
                COL3: '',
                ETC99: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S0501_2_3;
