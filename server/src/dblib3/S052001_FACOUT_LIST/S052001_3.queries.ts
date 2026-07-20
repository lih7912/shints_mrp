import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S052001_3 = {
    Query: {
        mgrQueryS052001_3: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }
            let sqlStr = `
                SELECT
                    A.PO_CD,
                    '' AS IN_DATE,
                    '' AS DELIVERY,
                    D.VENDOR_NAME,
                    C.MATL_NAME,
                    C.COLOR,
                    C.SPEC,
                    C.UNIT,
                    0 AS PO_QTY,
                    '' AS COL2,
                    SUM(A.IN_QTY) AS IN_QTY,
                    SUM(A.ERR_QTY) AS ERR_QTY,
                    A.LOCATION,
                    C.MATL_CD,
                    D.VENDOR_TYPE
                FROM
                    KSV_STOCK_FACIN A,
                    KCD_MATL_MST C,
                    KCD_VENDOR D
                WHERE
                    A.PO_CD = '${args.data.PO_NO}'
                    AND A.DELIVERY LIKE '%%'
                    AND C.MATL_CD = A.MATL_CD
                    AND C.VENDOR_CD LIKE '%'
                    AND D.VENDOR_CD = C.VENDOR_CD
                    AND D.VENDOR_TYPE LIKE '%'
                    AND C.MATL_CD LIKE '%%'
                    AND C.MATL_NAME LIKE '%%'
                    AND C.COLOR LIKE '%%'
                    AND C.SPEC LIKE '%%'
                    AND C.UNIT LIKE '%%'
                GROUP BY
                    A.PO_CD,
                    D.VENDOR_NAME,
                    C.MATL_NAME,
                    C.COLOR,
                    C.SPEC,
                    C.UNIT,
                    C.MATL_CD,
                    D.VENDOR_TYPE,
                    A.LOCATION
                ORDER BY
                    2 desc
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tOne = { ...tRet[tIdx] };
                let sql0 = `
                    select
                        sum(po_qty) as po_qty
                    from
                        ksv_po_mrp
                    where
                        po_cd = '${tOne.PO_CD}'
                        and matl_cd = '${tOne.MATL_CD}'
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                if (tRet0.length > 0) tOne.PO_QTY = tRet0[0].po_qty;
                tRetArray.push(tOne);
            }
            return tRetArray;
        },
    },
};

export default moduleQuery_S052001_3;
