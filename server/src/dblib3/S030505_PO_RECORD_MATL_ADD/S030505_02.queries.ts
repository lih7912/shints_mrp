import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S030505_02 = {
    Query: {
        mgrQueryS030505_02: async (_, args) => {
            var tSQL = '';
            var tSQL1 = '';
            var tSQL2 = '';
            if (args.data.MATL_CD !== '') {
                tSQL += `AND A.MATL_CD  like '%${args.data.MATL_CD}%' `;
            }
            if (args.data.MATL_NAME !== '') {
                var tVal0 = args.data.MATL_NAME.replace(/\'/gi, "''");
                tSQL1 = `AND (`;
                var tArray0 = tVal0.split(' ');
                tArray0.forEach((col, i) => {
                    if (i === 0)
                        tSQL1 += `A.matl_name like '%${col}%' ESCAPE '[' `;
                    else tSQL1 += `and A.matl_name like '%${col}%' ESCAPE '[' `;
                });
                tSQL1 += `)`;
            }
            if (args.data.COLOR !== '') {
                tSQL += `AND A.COLOR  like '%${args.data.COLOR}%' `;
            }
            if (args.data.SPEC !== '') {
                var tVal0 = args.data.SPEC.replace(/\'/gi, "''");
                tSQL2 = `AND (`;
                var tArray0 = tVal0.split(' ');
                tArray0.forEach((col, i) => {
                    if (i === 0) tSQL2 += `A.spec like '%${col}%' ESCAPE '[' `;
                    else tSQL2 += `and A.spec like '%${col}%' ESCAPE '[' `;
                });
                tSQL2 += `)`;
            }
            if (args.data.VENDOR_CD !== '') {
                tSQL += `AND (C.VENDOR_CD  like '%${args.data.VENDOR_CD}%' OR `;
                tSQL += `     C.VENDOR_NAME  like '%${args.data.VENDOR_CD}%' ) `;
            }

            let sqlStr = `
                SELECT
                    A.MATL_CD, -- matl-cd
                    A.MATL_NAME, -- matl_name
                    A.COLOR, -- color
                    A.SPEC, -- spec
                    B.MATL_PRICE, -- matl_price
                    B.CURR_CD, -- curr_cd
                    A.UNIT, -- unit
                    0 AS STOCK_QTY, -- stock_qty
                    0 AS PO_QTY, -- po_qty
                    '발주' as PO_TYPE_NAMe, -- po_type-name
                    0 as REASON_TYPE, -- reason
                    0 as FARE_TYPE, -- fare
                    '' as REMARK, -- remark
                    C.VENDOR_NAME, -- vendor_name
                    '' as STOCK_STATUS, -- stock_status
                    '1' as USE_PO_TYPE, -- use_po_type
                    '' as USE_PO_CD,
                    0 as USE_PO_SEQ,
                    '' as USE_ORDER_CD,
                    0 as USE_MRP_SEQ,
                    0 as USE_MATL_SEQ,
                    B.MATL_SEQ,
                    '' as FACTORY_CD,
                    0 as STOCK_IDX,
                    '' as REMARK2,
                    '' as PLAN_REMARK,
                    A.VENDOR_CD,
                    '' as ORDER_CD
                FROM
                    KCD_MATL_MST A,
                    KCD_MATL_MEM B,
                    KCD_VENDOR C
                WHERE
                    A.STATUS_CD IN ('0', '1') ${tSQL} ${tSQL1} ${tSQL2}
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
                ORDER BY
                    A.MATL_CD
                    -- OFFSET 0 ROWS FETCH NEXT 1000 ROWS ONLY
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {};
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S030505_02;
