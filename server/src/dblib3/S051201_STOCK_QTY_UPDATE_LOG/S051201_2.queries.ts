import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S051201_2 = {
    Query: {
        mgrQueryS051201_2: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }

            var tWObj = {};

            let sql0 = `
                select
                    sum(a.stock_qty) as SUM_STOCK_QTY,
                    sum(a.remain_qty) as SUM_REMAIN_QTY,
                    sum(a.use_qty) as SUM_USE_QTY,
                    sum(a.out_qty) as SUM_OUT_QTY
                from
                    ksv_stock_matl a
                where
                    a.root_idx = '${args.data.ROOT_IDX}'
            `;
            var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            tWObj.SUM_INFO = tRet0;

            let sqlStr = `
                SELECT
                    A.STOCK_IDX,
                    A.ORG_STOCK_IDX,
                    A.PO_CD,
                    A.ORDER_CD,
                    A.MATL_CD,
                    A.STOCK_DATE,
                    LEFT(A.REG_DATETIME, 8) AS REG_DATE,
                    B.CD_NAME AS STOCK_STATUS_N,
                    A.STOCK_QTY,
                    A.REMAIN_QTY,
                    A.USE_QTY,
                    A.OUT_QTY,
                    A.REG_USER,
                    A.REMARK,
                    '' AS USE_PO,
                    '' AS USE_PO_SEQ,
                    '' AS USE_ORDER,
                    '' AS USE_POQTY,
                    '' AS USE_DATETIME,
                    C.MATL_NAME,
                    C.COLOR,
                    C.SPEC,
                    C.UNIT
                FROM
                    KSV_STOCK_MATL A,
                    KCD_CODE B,
                    KCD_MATL_MST C
                WHERE
                    A.ROOT_IDX = '${args.data.ROOT_IDX}'
                    AND B.CD_GROUP = 'STOCK_STATUS_S'
                    AND B.CD_CODE = A.STOCK_STATUS
                    AND A.MATL_CD = C.MATL_CD
                ORDER BY
                    A.STOCK_IDX
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tIdx = 0;
            var tRetArray = [];
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tOne = { ...tRet[tIdx] };

                var sql1 = `
                    select
                        USE_PO_CD,
                        USE_PO_SEQ,
                        USE_ORDER_CD,
                        USE_QTY,
                        USE_DATETIME
                    from
                        ksv_stock_use
                    where
                        stock_idx = '${tOne.STOCK_IDX}'
                    order by
                        use_datetime
                `;
                var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                if (tRet1.length > 0) {
                    var tOne1 = { ...tRet1[0] };
                    tOne.USE_PO = tOne1.USE_PO_CD;
                    tOne.USE_PO_SEQ = tOne1.USE_PO_SEQ;
                    tOne.USE_ORDER = tOne1.USE_ORDER_CD;
                    tOne.USE_POQTY = tOne1.USE_QTY;
                    tOne.USE_DATETIME = tOne1.USE_DATETIME;

                    tRetArray.push(tOne);
                } else {
                    tRetArray.push(tOne);
                }
            }

            tWObj.DATA = tRetArray;

            var tIdx = 0;
            return tWObj;
        },
    },
};

export default moduleQuery_S051201_2;
