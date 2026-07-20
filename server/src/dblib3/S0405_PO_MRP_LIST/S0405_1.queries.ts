import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0405_1 = {
    Query: {
        mgrQueryS0405_CODE: async (_, args) => {
            var tWObj = {};

            let sqlStr = `
                SELECT DISTINCT
                    A.PO_CD,
                    '' as PO_STATUS
                FROM
                    KSV_PO_MST A
                    INNER JOIN KCD_CODE B ON A.PO_STATUS = B.CD_CODE
                WHERE
                    B.CD_GROUP = 'PO_STATUS'
                    AND PO_STATUS <> '0'
                ORDER BY
                    A.PO_CD
                    -- offset 0 rows fetch next 500 rows only
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.PO_CD = ' ';
            tObj.PO_STATUS = ' ';
            tRet.unshift(tObj);
            tWObj.PO_CD = tRet;

            let sqlStr = `
                select
                    *
                from
                    kcd_buyer
                order by
                    buyer_cd
                    -- offset 0 rows fetch next 1000 rows only
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.BUYER_CD = ' ';
            tObj.BUYER_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.BUYER_CD = tRet;

            return tWObj;
        },

        mgrQueryS0405_1: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }

            var tInputObj = { ...args.data };
            if (tInputObj.PO_CD === '' || tInputObj.PO_CD === ' ') {
                tInputObj.PO_CD = 'PO23-';
            }

            let sqlStr = `
                SELECT
                    A.PO_CD,
                    A.ORDER_CD,
                    C.STYLE_NAME,
                    D.BUYER_NAME,
                    B.DUE_DATE,
                    B.TOT_CNT,
                    1 AS COL1,
                    B.ORDER_STATUS
                FROM
                    KSV_PO_MEM A,
                    KSV_ORDER_MST B,
                    KCD_STYLE C,
                    KCD_BUYER D
                WHERE
                    A.PO_CD LIKE '%${tInputObj.PO_CD}%'
                    AND A.PO_SEQ = 1
                    AND B.ORDER_CD = A.ORDER_CD
                    AND C.STYLE_NAME LIKE '%%'
                    AND C.STYLE_CD = B.STYLE_CD
                    AND LEFT(A.ORDER_CD, 2) LIKE '%'
                    AND D.BUYER_CD = LEFT(A.ORDER_CD, 2)
                ORDER BY
                    1,
                    2
                    -- offset 0 rows fetch next 1000 rows only
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            return tRet;
        },
    },
};

export default moduleQuery_S0405_1;
