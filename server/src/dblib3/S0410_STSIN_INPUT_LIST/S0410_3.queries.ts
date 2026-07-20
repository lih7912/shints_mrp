import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0410_3 = {
    Query: {
        mgrQueryS0410_3_1: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }

            var tWObj = {};

            let sqlStr = `
                select
                    *
                from
                    kcd_code
                where
                    cd_group = 'VENDOR_TYPE'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tObj = {};
            tObj.CD_CODE = ' ';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.VENDOR_TYPE = tRet;

            let sqlStr = `
                select
                    *
                from
                    kcd_vendor
                where
                    status_cd = '0'
                    and vendor_type like '%'
                order by
                    vendor_name
                    -- offset 0 rows fetch next 1000 rows only
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tObj = {};
            tObj.VENDOR_CD = ' ';
            tObj.VENDOR_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.VENDOR_CD = tRet;

            let sqlStr = `
                select distinct
                    PO_CD as CD_CODE
                from
                    ksv_stock_in
                where
                    left(in_datetime, 8) between '${args.data.S_IN_DATE}' and '${args.data.E_IN_DATE}'
                    and out_status = '0'
                    and matl_cd in (
                        select
                            a1.matl_cd
                        from
                            kcd_matl_mst a1,
                            kcd_vendor b1
                        where
                            a1.vendor_cd = b1.vendor_cd
                            and b1.vendor_type = '${args.data.VENDOR_TYPE}'
                    )
                order by
                    po_cd
                    -- offset 0 rows fetch next 1000 rows only
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tObj = {};
            tObj.CD_CODE = ' ';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.PO_CD = tRet;

            let sqlStr = `
                select
                    *
                from
                    kcd_code
                where
                    cd_group = 'BILL_TYPE'
                    and cd_code <> '1'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tObj = {};
            tObj.CD_CODE = ' ';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.BILL_TYPE = tRet;

            let tRet = [];
            let tObj0 = {};
            tObj0.CD_CODE = ' ';
            tObj0.CD_NAME = ' ';
            tRet.push(tObj0);
            let tObj = {};
            tObj.CD_CODE = 'T/T';
            tObj.CD_NAME = 'T/T';
            tRet.push(tObj);
            let tObj1 = {};
            tObj1.CD_CODE = 'L/C';
            tObj1.CD_NAME = 'L/C';
            tRet.push(tObj1);
            tWObj.BILL_TYPE2 = tRet;

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
            let tObj = {};
            tObj.BUYER_CD = ' ';
            tObj.BUYER_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.BUYER_CD = tRet;

            let sqlStr = `
                select
                    *
                from
                    kcd_user
                where
                    status_cd = '0'
                order by
                    user_id
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tObj = {};
            tObj.USER_ID = ' ';
            tObj.USER_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.USER_ID = tRet;

            let sqlStr = `
                select
                    *
                from
                    kcd_bank
                order by
                    bank_cd
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tObj = {};
            tObj.BANK_CD = ' ';
            tObj.BANK_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.BANK_CD = tRet;

            return tWObj;
        },

        mgrQueryS0410_3: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }

            let sqlStr = `
                SELECT
                    A.PO_CD,
                    A.ORDER_CD,
                    D.VENDOR_NAME,
                    C.MATL_NAME,
                    C.COLOR,
                    C.SPEC,
                    C.UNIT,
                    A.IN_QTY,
                    A.TOT_QTY,
                    A.LC_QTY,
                    E.CD_NAME AS BILL_TYPE,
                    LEFT(A.IN_DATETIME, 8) AS IN_DATE,
                    B.CD_NAME AS IN_TYPE_NAME,
                    A.PAY_PRICE,
                    A.PAY_CURR_CD,
                    A.PAY_DATE,
                    A.PAY_REPORT,
                    A.LC_BILL_NO,
                    C.MATL_CD,
                    A.MIN_FLAG,
                    A.STOCK_QTY,
                    A.OUT_STATUS,
                    A.OUT_QTY,
                    A.PO_SEQ,
                    A.MRP_SEQ,
                    A.IN_DATETIME,
                    A.BILL_FLAG,
                    A.IN_TYPE,
                    D.VENDOR_TYPE,
                    A.STOCK_IDX,
                    A.CALC_FLAG
                FROM
                    KSV_STOCK_IN A
                    LEFT JOIN KCD_CODE E ON E.CD_GROUP = 'BILL_TYPE'
                    AND E.CD_CODE = A.BILL_TYPE,
                    KCD_CODE B,
                    KCD_MATL_MST C,
                    KCD_VENDOR D,
                    KCD_CODE F,
                    KCD_MATL_TYPE2 G
                WHERE
                    LEFT(A.IN_DATETIME, 8) BETWEEN '${args.data.S_IN_DATE}' AND '${args.data.E_IN_DATE}'
                    AND A.PO_CD LIKE '%${args.data.PO_CD}%'
                    AND A.MATL_CD LIKE '%${args.data.MATL_CD}%'
                    AND LEFT(A.ORDER_CD, 2) LIKE '${args.data.BUYER_CD}%'
                    AND C.MATL_NAME LIKE '%${args.data.MATL_NAME}%'
                    AND A.OUT_STATUS = '0'
                    AND B.CD_GROUP = 'IN_TYPE'
                    AND B.CD_CODE = A.IN_TYPE
                    AND C.MATL_CD = A.MATL_CD
                    AND C.VENDOR_CD LIKE '${args.data.VENDOR_CD}%'
                    AND D.VENDOR_CD = C.VENDOR_CD
                    AND D.VENDOR_TYPE LIKE '${args.data.VENDOR_TYPE}%'
                    AND F.CD_GROUP = 'MATL_TYPE'
                    AND F.CD_CODE = C.MATL_TYPE
                    AND G.SEQ = C.MATL_TYPE2
                    AND A.REG_USER LIKE '%${args.data.USER_ID}%'
                ORDER BY
                    1,
                    2
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            return tRet;
        },
    },
};

export default moduleQuery_S0410_3;
