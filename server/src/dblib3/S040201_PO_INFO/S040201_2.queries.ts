import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S040201_2 = {
    Query: {
        mgrQueryS040201_2_1: async (_, args) => {
            var tSQL = '';

            var tWObj = {};

            let sqlStr = `
                select
                    isnull(
                        sum(
                            case
                                when a.adj_po_qty < 0 then a.po_qty
                                else a.adj_po_qty
                            end
                        ),
                        0
                    ) as SUM_QTY
                from
                    ksv_po_mrp a
                where
                    a.po_cd = '${args.data.PO_CD}'
                    and a.matl_cd = '${args.data.MATL_CD}'
                    and a.use_po_type = '1'
                    and a.po_seq not in ('98', '99')
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWObj.SUM_QTY = tRet[0].SUM_QTY;

            let sqlStr = `
                select
                    isnull(sum(a.po_qty), 0) as MIN_QTY
                from
                    ksv_po_mrp a
                where
                    a.po_cd = '${args.data.PO_CD}'
                    and a.matl_cd = '${args.data.MATL_CD}'
                    and a.use_po_type = '1'
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWObj.MIN_QTY = tRet[0].MIN_QTY;

            return tWObj;
        },

        mgrQueryS040201_2: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }
            let sqlStr = `
                SELECT
                    A.PO_CD,
                    A.PO_SEQ,
                    A.ORDER_CD,
                    A.MATL_CD,
                    C.MATL_NAME,
                    C.COLOR,
                    C.SPEC,
                    '' as COL1,
                    A.ORG_PO_SEQ,
                    A.PO_QTY,
                    A.DIFF_QTY,
                    E.CD_NAME AS DIFF_PO_TYPE_NAME,
                    'X' AS COL2,
                    A.REMARK,
                    D.VENDOR_NAME,
                    A.DIFF_PO_TYPE,
                    A.MRP_SEQ,
                    A.MATL_SEQ,
                    A.STOCK_IDX,
                    A.SEQ_COMMENT
                FROM
                    KSV_PO_MRP A,
                    KCD_MATL_MST C,
                    KCD_VENDOR D,
                    KCD_CODE E
                WHERE
                    A.PO_CD = '${args.data.PO_CD}'
                    AND D.VENDOR_CD LIKE '%'
                    AND D.VENDOR_TYPE LIKE '%'
                    AND C.MATL_CD = A.MATL_CD
                    AND D.VENDOR_CD = C.VENDOR_CD
                    AND E.CD_GROUP = 'DIFF_PO_TYPE'
                    AND E.CD_CODE = A.DIFF_PO_TYPE
                    AND A.DIFF_PO_TYPE IN ('1', '2', '4')
                ORDER BY
                    D.VENDOR_NAME,
                    A.PO_SEQ,
                    A.ORDER_CD,
                    C.MATL_NAME
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S040201_2;
