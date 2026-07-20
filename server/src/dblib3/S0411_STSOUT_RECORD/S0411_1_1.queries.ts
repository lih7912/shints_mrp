import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0411_1_1 = {
    Query: {
        mgrQueryS0411_CODE_1: async (_, args) => {
            var tWObj = {};

            let sqlStr = `
                select
                    isnull(max(pack_cd), '') as max_cnt
                from
                    ksv_stock_out
                where
                    pack_cd like '${args.data.PACK_CD}%'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWObj.MAX_SEQ = tRet[0].max_cnt;
            return tWObj;
        },

        mgrQueryS0411_CODE: async (_, args) => {
            var tWObj = {};

            let sqlStr = `
                SELECT
                    RECEIVER_ID,
                    USER_NAME
                FROM
                    KCD_RECEIVER
                ORDER BY
                    1
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.Receiver_ID = ' ';
            tObj.USER_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.RECEIVER = tRet;

            let sqlStr = `
                select
                    *
                from
                    kcd_code
                where
                    cd_group = 'VENDOR_TYPE'
                order by
                    cd_code
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_CODE = ' ';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.VENDOR_TYPE = tRet;

            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_VENDOR
                where
                    status_cd = '0'
                    and vendor_type like '%'
                ORDER BY
                    VENDOR_NAME
                    -- offset 0 rows fetch next 1000 rows only
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.VENDOR_CD = ' ';
            tObj.VENDOR_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.VENDOR_CD = tRet;

            let sqlStr = `
                select distinct
                    a.PO_CD
                from
                    ksv_stock_in a,
                    ksv_po_mst b,
                    kcd_matl_mst c,
                    kcd_vendor d
                where
                    left(a.in_datetime, 8) between '${args.data.S_IN_DATE}' and '${args.data.E_IN_DATE}'
                    and a.out_status = '0'
                    and a.tot_qty > 0
                    and c.matl_cd = a.matl_cd
                    and d.vendor_cd = c.vendor_cd
                    and d.vendor_type like '${args.data.VENDOR_TYPE}%'
                    and b.po_cd = a.po_cd
                    and b.po_seq = a.po_seq
                order by
                    a.po_cd
                    -- offset 0 rows fetch next 1000 rows only
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.PO_CD = ' ';
            tRet.unshift(tObj);
            tWObj.PO_CD = tRet;

            let sqlStr = `
                select
                    *
                from
                    kcd_code
                where
                    cd_group = 'OUT_TYPE'
                order by
                    cd_code
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_CODE = ' ';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.OUT_TYPE = tRet;

            let sqlStr = `
                select
                    *
                from
                    kcd_code
                where
                    cd_group = 'DELIVERY_TYPE'
                    and cd_code in ('1', '2', '6', '7', '8', 'D', 'A', '31', '42')
                order by
                    cd_code
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_CODE = ' ';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.DELIVERY_TYPE = tRet;

            let sqlStr = `
                select
                    *
                from
                    kcd_code
                where
                    cd_group = 'DELAY_REASON'
                order by
                    cd_code
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_CODE = ' ';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.REASON_TYPE = tRet;

            let sqlStr = `
                select
                    *
                from
                    kcd_code
                where
                    cd_group = 'CHARGE_KIND'
                order by
                    cd_code
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_CODE = ' ';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.CHARGE1 = tRet;

            let sqlStr = `
                select
                    *
                from
                    kcd_user
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.USER_ID = ' ';
            tObj.USER_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.USER_ID = tRet;

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
            var tObj = {};
            tObj.BUYER_CD = ' ';
            tObj.BUYER_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.BUYER_CD = tRet;

            let sqlStr = `
                select
                    *
                from
                    kcd_code
                where
                    cd_group = 'BUYER_TEAM'
                order by
                    cd_code
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_CODE = ' ';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.BUYER_TEAM = tRet;

            let sqlStr = `
                select
                    *
                from
                    kcd_factory
                where
                    factory_cd in ('FC044', 'FC034', 'FC010')
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.FACTORY_CD = ' ';
            tObj.FACTORY_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.FACTORY_CD = tRet;

            let tRet = [];
            var tObj = {};
            tObj.CD_CODE = ' ';
            tObj.CD_NAME = ' ';
            tRet.push(tObj);

            var tObj1 = {};
            tObj1.CD_CODE = '1';
            tObj1.CD_NAME = 'SHINT ';
            tRet.push(tObj1);

            var tObj2 = {};
            tObj2.CD_CODE = '2';
            tObj2.CD_NAME = 'BVT ';
            tRet.push(tObj2);

            var tObj3 = {};
            tObj3.CD_CODE = '3';
            tObj3.CD_NAME = 'ETP ';
            tRet.push(tObj3);

            var tObj4 = {};
            tObj4.CD_CODE = '4';
            tObj4.CD_NAME = 'Others ';
            tRet.push(tObj4);

            tWObj.FROM_TYPE = tRet;

            return tWObj;
        },

        mgrQueryS0411_1_1: async (_, args) => {
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
                    LEFT(A.IN_DATETIME, 8) AS IN_DATE,
                    A.TOT_QTY AS INFAC_QTY,
                    (A.TOT_QTY - A.OUT_QTY) AS REMAIN_QTY,
                    (A.TOT_QTY - A.OUT_QTY) AS OUT_QTY,
                    B.CD_NAME AS IN_TYPE_NAME,
                    C.MATL_CD,
                    A.IN_TYPE,
                    A.PO_SEQ,
                    A.MRP_SEQ,
                    A.IN_DATETIME,
                    A.REG_USER,
                    C.VENDOR_CD,
                    D.VENDOR_TYPE,
                    A.MATL_SEQ
                FROM
                    KSV_STOCK_IN A,
                    KCD_CODE B,
                    KCD_MATL_MST C,
                    KCD_VENDOR D,
                    KSV_PO_MST E
                WHERE
                    LEFT(A.IN_DATETIME, 8) BETWEEN '${args.data.S_IN_DATE}' AND '${args.data.E_IN_DATE}'
                    AND A.PO_CD LIKE '${args.data.PO_CD}%'
                    AND A.TOT_QTY > 0
                    AND A.OUT_QTY < A.TOT_QTY
                    AND B.CD_GROUP = 'IN_TYPE'
                    AND B.CD_CODE = A.IN_TYPE
                    AND C.MATL_CD = A.MATL_CD
                    AND C.VENDOR_CD LIKE '${args.data.VENDOR_CD}%'
                    AND D.VENDOR_CD = C.VENDOR_CD
                    AND D.VENDOR_TYPE LIKE '${args.data.VENDOR_TYPE}%'
                    AND E.PO_CD = A.PO_CD
                    AND E.PO_SEQ = A.PO_SEQ
                    AND A.REG_USER LIKE '${args.data.USER_ID}%'
                ORDER BY
                    1,
                    2,
                    3
                    -- OFFSET 0 ROWS FETCH NEXT 1000 ROWS ONLY
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            return tRet;
        },
    },
};

export default moduleQuery_S0411_1_1;
