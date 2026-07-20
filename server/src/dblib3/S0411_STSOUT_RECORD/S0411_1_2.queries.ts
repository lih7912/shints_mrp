import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0411_1_2 = {
    Query: {
        mgrQueryS0411_1_2: async (_, args) => {
            var tInput = { ...args.data };

            let sqlStr0 = `
                select
                    factory_cd
                from
                    ksv_po_mst
                where
                    po_cd = '${tInput.PO_CD}'
                    and po_seq = '1'
            `;
            var tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr0));
            tInput.FACTORY_CD = tRet0[0].factory_cd;

            let sqlStr = `
                SELECT
                    A.USE_MATL_CD,
                    B.MATL_NAME,
                    B.COLOR,
                    B.SPEC,
                    C.MATL_PRICE,
                    C.CURR_CD,
                    B.UNIT,
                    '' AS STOCK_QTY,
                    A.USE_QTY AS OUT_QTY,
                    D.VENDOR_NAME,
                    E.WARE_NAME AS FACTORY,
                    A.OUTPUT_FLAG,
                    A.STOCK_IDX,
                    A.USE_DATETIME,
                    F.FACTORY_CD,
                    A.USE_PO_CD,
                    A.USE_ORDER_CD
                FROM
                    KSV_STOCK_USE A,
                    KCD_MATL_MST B,
                    KCD_MATL_MEM C,
                    KCD_VENDOR D,
                    KCD_FACTORY_WARE E,
                    KSV_STOCK_MATL F
                WHERE
                    A.USE_PO_CD = '${tInput.PO_CD}'
                    AND (
                        A.OUTPUT_FLAG IS NULL
                        OR A.OUTPUT_FLAG = ''
                    )
                    AND F.FACTORY_CD = '${tInput.FACTORY_CD}'
                    AND B.MATL_CD = A.USE_MATL_CD
                    AND C.MATL_CD = A.USE_MATL_CD
                    AND C.MATL_SEQ = (
                        SELECT
                            MAX(MATL_SEQ)
                        FROM
                            KCD_MATL_MEM
                        WHERE
                            MATL_CD = A.USE_MATL_CD
                    )
                    AND D.VENDOR_CD = B.VENDOR_CD
                    AND E.WARE_CD = F.FACTORY_CD
                    AND F.STOCK_IDX = A.STOCK_IDX
                ORDER BY
                    1,
                    2,
                    3
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            return tRet;
        },
    },
};

export default moduleQuery_S0411_1_2;
