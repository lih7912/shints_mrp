import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S030511_1 = {
    Query: {
        mgrQueryS030511_1: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }
            let sqlStr = `
                SELECT DISTINCT
                    D.VENDOR_NAME,
                    C.MATL_NAME,
                    C.COLOR,
                    C.SPEC,
                    A.MATL_CD,
                    A.QTY_TYPE,
                    0 AS TOT_QTY,
                    0 AS MINI_QTY
                FROM
                    KSV_PO_IN A,
                    KCD_MATL_MST C,
                    KCD_VENDOR D
                WHERE
                    A.PO_CD = '${args.data.PO_CD}'
                    AND A.QTY_TYPE = 'PO'
                    AND C.MATL_CD = A.MATL_CD
                    AND D.VENDOR_CD = C.VENDOR_CD
                ORDER BY
                    D.VENDOR_NAME
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            var tRetArray = [];

            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tObj = { ...tRet[tIdx] };

                var tSQL1 = `
                    select
                        ORDER_CD,
                        sum(qty) as SUM_QTY
                    from
                        ksv_po_in
                    where
                        po_cd = '${args.data.PO_CD}'
                        and qty_type = 'PO'
                        and matl_cd = '${tObj.MATL_CD}'
                    group by
                        order_cd
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(tSQL1));
                tObj.ORDERS = [...tRet0];

                var tTotCnt = 0;
                tRet0.forEach((col, i) => {
                    tTotCnt += col.SUM_QTY;
                });

                tObj.TOT_QTY = tTotCnt;
                tRetArray.push(tObj);
            }

            return tRetArray;
        },
    },
};

export default moduleQuery_S030511_1;
