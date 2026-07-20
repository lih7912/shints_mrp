import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0504_2 = {
    Query: {
        mgrQueryS0504_2: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }
            let sqlStr = `
                SELECT
                    A.STSOUT_CD,
                    A.PO_CD,
                    A.IN_DATE,
                    A.DELIVERY,
                    D.VENDOR_NAME,
                    C.MATL_NAME,
                    C.COLOR,
                    C.SPEC,
                    C.UNIT,
                    G1.PO_QTY2 AS COL1,
                    G.STSOUT_QTY AS COL2,
                    A.IN_QTY,
                    A.ERR_QTY,
                    isnull(A.SHORTAGE_QTY, 0) as SHORTAGE_QTY,
                    isnull(A.DEFECT_QTY, 0) as DEFECT_QTY,
                    A.LOCATION,
                    C.MATL_CD,
                    D.VENDOR_TYPE,
                    F.BUYER_NAME,
                    A.REG_USER
                FROM
                    KSV_STOCK_FACIN A,
                    KCD_MATL_MST C,
                    KCD_VENDOR D,
                    (
                        SELECT DISTINCT
                            PO_CD,
                            LEFT(ORDER_CD, 2) AS BUYER
                        FROM
                            KSV_PO_MEM
                    ) E,
                    KCD_BUYER F,
                    (
                        select
                            STSOUT_CD,
                            PO_CD,
                            MATL_CD,
                            sum(OUT_QTY) as STSOUT_QTY
                        from
                            ksv_stock_out
                        where
                            STSOUT_CD is not null
                            and STSOUT_CD <> ''
                        group by
                            STSOUT_CD,
                            PO_CD,
                            MATL_CD
                    ) G,
                    KSV_STOCK_MEM2 G1
                WHERE
                    LEFT(A.IN_DATE, 8) BETWEEN '20220101' AND '20231231'
                    AND A.PO_CD LIKE '%${args.data.PO_NO}%'
                    AND A.DELIVERY LIKE '%${args.data.DELIVERY}%'
                    AND C.MATL_CD = A.MATL_CD
                    AND C.VENDOR_CD LIKE '${args.data.VENDOR_CD}%'
                    AND D.VENDOR_CD = C.VENDOR_CD
                    AND D.VENDOR_TYPE LIKE '%'
                    AND C.MATL_CD LIKE '%${args.data.MATL_CD}%'
                    AND C.MATL_NAME LIKE '%${args.data.MATL_NAME}%'
                    AND C.COLOR LIKE '%${args.data.COLOR}%'
                    AND C.SPEC LIKE '%${args.data.SPEC}%'
                    AND C.UNIT LIKE '%${args.data.UNIT}%'
                    AND A.REG_USER LIKE '%%'
                    AND E.PO_CD = A.PO_CD
                    AND E.BUYER LIKE '%${args.data.BUYER_CD}%'
                    AND E.BUYER = F.BUYER_CD
                    AND A.STSOUT_CD is not null
                    and A.STSOUT_CD <> ''
                    AND A.STSOUT_CD = G.STSOUT_CD
                    AND A.PO_CD = G.PO_CD
                    AND A.MATL_CD = G.MATL_CD
                    AND A.PO_CD = G1.PO_CD
                    AND A.MATL_CD = G1.MATL_CD
                ORDER BY
                    A.IN_DATE,
                    A.PO_CD DESC
                    -- OFFSET 0 ROWS FETCH NEXT 1000 ROWS ONLY
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S0504_2;
