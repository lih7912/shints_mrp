import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0522_2 = {
    Query: {
        mgrQueryS0522_2: async (_, args) => {
            var tSQL = '';
            if (args.data.BUYER_CD !== '') {
                tSQL += `AND LEFT(E.ORDER_CD, 2) = '${args.data.BUYER_CD}' `;
            }
            let sqlStr = `
                SELECT
                    top 1000 E.PO_CD,
                    E.PO_SEQ,
                    A.MATL_CD,
                    E.ORDER_CD,
                    A.MATL_NAME,
                    A.COLOR,
                    A.SPEC,
                    A.UNIT,
                    E.STOCK_QTY,
                    E.REMAIN_QTY,
                    E.STOCK_STATUS,
                    E.RACK,
                    E.LOCATION,
                    E.REASON_REMARK,
                    E.REMARK,
                    E.REMARK0,
                    C.VENDOR_NAME,
                    B.MATL_SEQ,
                    E.REMAIN_QTY,
                    E.STOCK_IDX,
                    E.ROOT_IDX,
                    isnull(E.WAITING_QTY, 0) as WAITING_QTY,
                    isnull(E.STOCK_STATUS_2, '') as STOCK_STATUS_2,
                    isnull(E.OWNER_SHIP, '') as OWNER_SHIP,
                    isnull(E.REASON_MAKE, '') as REASON_MAKE,
                    isnull(E.AUTHORITY, '') as AUTHORITY,
                    isnull(E.CONDITION, '') as CONDITION,
                    isnull(E.MANAGER, '') as MANAGER,
                    isnull(E.PURPOSE, '') as PURPOSE,
                    left(E.REG_DATETIME, 8) as STOCK_DATE,
                    E.REG_USER as CHARGER,
                    E.REG_DATETIME
                FROM
                    KCD_MATL_MST A,
                    KCD_MATL_MEM B,
                    KCD_VENDOR C,
                    KSV_STOCK_MATL E
                WHERE
                    A.MATL_NAME LIKE '%${args.data.MATL_NAME}%' ESCAPE '['
                    AND A.COLOR LIKE '%${args.data.COLOR}%'
                    AND A.SPEC LIKE '%${args.data.SPEC}%'
                    AND A.MATL_CD LIKE '%${args.data.MATL_CD}%'
                    -- AND E.PO_CD = 'EO22-0032'
                    AND E.PO_CD like '%${args.data.PO_CD}%'
                    AND E.ORDER_CD LIKE '%${args.data.ORDER_CD}%' ${tSQL}
                    -- AND E.STOCK_STATUS IN ('N','W') 
                    AND E.STOCK_STATUS = '5'
                    AND E.STOCK_STATUS_2 in ('S1', 'S2')
                    AND E.MATL_CD = A.MATL_CD
                    AND E.REMAIN_QTY > 0
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
                    AND C.VENDOR_NAME LIKE '%${args.data.VENDOR_NAME}%'
                    -- ORDER BY 1,2 
                ORDER BY
                    E.REG_DATETIME desc
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S0522_2;
