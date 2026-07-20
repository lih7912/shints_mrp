import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0521_2 = {
    Query: {
        mgrQueryS0521_2: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tSQL = '';

            // Calculate date 3 years ago
            const year = parseInt(tRetDate1.substring(0, 4));
            const month = tRetDate1.substring(4, 6);
            const day = tRetDate1.substring(6, 8);
            const lastYearDate = `${year - 3}${month}${day}`;

            // Default: use 1 year range
            var sDate = lastYearDate;
            var eDate = `${tRetDate1}`;

            // If dates are explicitly provided, use them
            if (args.data.S_OUT_DATE && args.data.S_OUT_DATE !== '') sDate = args.data.S_OUT_DATE;
            if (args.data.E_OUT_DATE && args.data.E_OUT_DATE !== '') eDate = args.data.E_OUT_DATE;

            let sqlStr = `
                SELECT
                    E.PO_CD,
                    E.PO_SEQ,
                    A.MATL_CD,
                    C.VENDOR_NAME as SUPPLIER,
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
                    E.REG_USER as CHARGER
                FROM
                    KCD_MATL_MST A,
                    KCD_MATL_MEM B,
                    KCD_VENDOR C,
                    KSV_STOCK_MATL E
                WHERE
                    A.MATL_NAME LIKE '%${args.data.MATL_NAME}%' ESCAPE '['
                    AND left(e.reg_datetime, 8) between '${sDate}' and '${eDate}'
                    -- AND A.COLOR LIKE '%${args.data.COLOR}%'
                    -- AND A.SPEC LIKE '%${args.data.SPEC}%'
                    AND A.MATL_CD LIKE '%${args.data.MATL_CD}%'
                    -- AND E.PO_CD = 'EO22-0032'
                    AND E.PO_CD like '%${args.data.PO_CD}%'
                    AND E.ORDER_CD LIKE '%${args.data.ORDER_CD}%'
                    AND E.FACTORY_CD LIKE '%${args.data.FACTORY_CD}%'
                    AND left(E.ORDER_CD, 2) LIKE '%${args.data.BUYER_CD}%'
                    AND (E.STOCK_STATUS IN ('W', 'O')  or 
                         (E.STOCK_STATUS IN ('N') and (e.STOCK_STATUS_2 is null or e.STOCK_STATUS_2 <> 'NOT_FIXED'))
                        )
                    -- AND E.STOCK_STATUS = 'W' 
                    AND (E.STOCK_STATUS_2 in ('S1', 'S2') or E.STOCK_STATUS_2 is null or E.STOCK_STATUS_2 = '')
                    AND E.MATL_CD = A.MATL_CD
                    AND E.REMAIN_QTY > 0
                    -- AND E.STOCK_QTY > 0 
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
                    -- AND C.VENDOR_NAME LIKE '%${args.data.VENDOR_NAME}%'
                ORDER BY
                    1,
                    2
            `;

            let sqlStr1 = `
                SELECT
                    '${args.data.PO_CD.toUpperCase()}' as PO_CD,
                    '1' as PO_SEQ,
                    A.MATL_CD,
                    C.VENDOR_NAME as SUPPLIER,
                    '${args.data.ORDER_CD.toUpperCase()}' as ORDER_CD,
                    A.MATL_NAME,
                    A.COLOR,
                    A.SPEC,
                    A.UNIT,
                    '1' as STOCK_QTY,
                    '1' as REMAIN_QTY,
                    'W' as STOCK_STATUS,
                    '' as RACK,
                    '' as LOCATION,
                    '09' as REASON_REMARK,
                    '09.Acc Line Return' as REMARK,
                    '09.Acc Line Return' as REMARK0,
                    C.VENDOR_NAME,
                    B.MATL_SEQ,
                    '1' as REMAIN_QTY,
                    '' as STOCK_IDX,
                    '' as ROOT_IDX,
                    '1' as WAITING_QTY,
                    'S1' as STOCK_STATUS_2,
                    'SHINTS' as OWNER_SHIP,
                    'STORAGE' as REASON_MAKE,
                    'PIC' as AUTHORITY,
                    '' as CONDITION,
                    'SALES' as MANAGER,
                    '' as PURPOSE,
                    '${tRetDate1}' as STOCK_DATE,
                    '${tUserInfo.USER_ID}' as CHARGER
                FROM
                    KCD_MATL_MST A,
                    KCD_MATL_MEM B,
                    KCD_VENDOR C
                WHERE
                    A.MATL_NAME LIKE '%${args.data.MATL_NAME}%' ESCAPE '['
                    AND A.MATL_CD LIKE '%${args.data.MATL_CD}%'
                    AND A.COLOR LIKE '%${args.data.COLOR}%'
                    AND A.SPEC LIKE '%${args.data.SPEC}%'
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
                    1,
                    2
            `;

            var tRet = [];
            if (args.data.IS_NEW === '1')
                tRet = await prisma.$queryRaw(Prisma.raw(sqlStr1));
            else var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetArray = [];
            tRet.forEach((col, i) => {
                var tObj = { ...col };
                if (parseFloat(tObj.STOCK_QTY) <= 0)
                    tObj.STOCK_QTY = tObj.REMAIN_QTY;
                tRetArray.push(tObj);
            });
            var tIdx = 0;
            return tRetArray;
        },
    },
};

export default moduleQuery_S0521_2;
