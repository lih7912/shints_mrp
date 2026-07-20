import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0412_1 = {
    Query: {
        mgrQueryS0412_CODE: async (_, args) => {
            var tWObj = {};

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

            let sqlStr = '';
            if (args.data.VENDOR_TYPE !== '') {
                sqlStr = `
                    select distinct
                        PO_CD
                    from
                        ksv_stock_out
                    where
                        ship_date between '${args.data.S_ETD}' and '${args.data.E_ETD}'
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
            } else {
                sqlStr = `
                    select distinct
                        PO_CD
                    from
                        ksv_stock_out
                    where
                        ship_date between '${args.data.S_ETD}' and '${args.data.E_ETD}'
                    order by
                        po_cd
                        -- offset 0 rows fetch next 1000 rows only
                `;
            }
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.PO_CD = ' ';
            tRet.unshift(tObj);
            tWObj.PO_CD = tRet;

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
                select distinct
                    PACK_CD,
                    SHIP_DATE
                from
                    ksv_stock_out
                where
                    ship_date between '${args.data.S_ETD}' and '${args.data.E_ETD}'
                    and pack_cd <> ''
                order by
                    pack_cd
                    -- offset 0 rows fetch next 1000 rows only
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.PACK_CD = ' ';
            tObj.SHIP_DATE = ' ';
            tRet.unshift(tObj);
            tWObj.PACK_CD = tRet;

            let sqlStr = `
                select distinct
                    HIS_NO
                from
                    ksv_stock_out
                where
                    ship_date between '${args.data.S_ETD}' and '${args.data.E_ETD}'
                    and his_no <> ''
                order by
                    his_no
                    -- offset 0 rows fetch next 1000 rows only
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.HIS_NO = ' ';
            tRet.unshift(tObj);
            tWObj.HIS_NO = tRet;

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

            return tWObj;
        },

        mgrQueryS0412_1: async (_, args) => {
            var tSQL = '';

            if (args.data.PL_NO === '') {
                tSQL += `
		          WHERE A.SHIP_DATE BETWEEN '${args.data.S_ETD}' AND '${args.data.E_ETD}' 
		          AND A.PO_CD LIKE '${args.data.PO_CD}%' 
			        AND A.OUT_FROM = 'PO' 
           `;
            } else {
                tSQL += `
			        where A.pack_cd = '${args.data.PL_NO}'
			        and A.po_cd like '${args.data.PO_CD}%'
			        and A.out_from = 'PO' 
           `;
            }

            var tSQL1 = '';
            if (args.data.PL_NO === '') {
                tSQL1 += `
				where A.ship_date between '${args.data.S_ETD}' and '${args.data.E_ETD}' 
				and A.po_cd like '${args.data.PO_CD}%' 
           `;
            } else {
                tSQL1 += `
			where A.pack_cd = '${args.data.PL_NO}' 
			and A.po_cd like '${args.data.PO_CD}%' 
           `;
            }
            if (args.data.VENDOR_CD === 'V-BVT') {
                tSQL1 += `
               and A.out_from = 'STOCK BVT'
           `;
            } else if (args.data.VENDOR_CD === 'V-ETP') {
                tSQL1 += `
               and A.out_from = 'STOCK ETP'
           `;
            } else {
                tSQL1 += `
			         AND C.VENDOR_CD LIKE '%' 
           `;
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
                    A.SHIP_DATE,
                    A.ETA,
                    A.PACK_CD,
                    A.HIS_NO,
                    A.OUT_QTY,
                    A.OUT_FROM,
                    A.CT_QTY,
                    A.CT_NO,
                    A.REMARK,
                    F.CD_NAME AS DELIVERY,
                    B.CD_NAME AS IN_TYPE_NAME,
                    C.MATL_CD,
                    E.CD_NAME AS OUT_TYPE_NAME,
                    A.DEBIT_CD,
                    G.IN_TYPE,
                    A.OUT_STATUS,
                    A.PO_SEQ,
                    A.MRP_SEQ,
                    A.IN_DATETIME,
                    A.OUT_DATETIME,
                    A.OUT_QTY,
                    C.VENDOR_CD,
                    D.VENDOR_TYPE,
                    A.REG_DATETIME,
                    G.PACK_CONFIRM,
                    A.STOCK_IDX
                FROM
                    KSV_STOCK_OUT A,
                    KCD_CODE B,
                    KCD_MATL_MST C,
                    KCD_VENDOR D,
                    KCD_CODE E,
                    KCD_CODE F,
                    KSV_STOCK_IN G ${tSQL}
                    AND A.HIS_NO LIKE '%'
                    AND LEFT(A.ORDER_CD, 2) LIKE '%'
                    AND C.MATL_CD LIKE '%%'
                    AND C.SPEC LIKE '%%'
                    AND C.MATL_NAME LIKE '%%'
                    AND C.COLOR LIKE '%%'
                    AND B.CD_GROUP = 'IN_TYPE'
                    AND B.CD_CODE = G.IN_TYPE
                    AND C.MATL_CD = A.MATL_CD
                    AND D.VENDOR_CD = C.VENDOR_CD
                    AND D.VENDOR_TYPE LIKE '%'
                    AND A.REG_USER LIKE '%'
                    AND E.CD_GROUP = 'OUT_TYPE'
                    AND E.CD_CODE = A.OUT_TYPE
                    AND F.CD_GROUP = 'DELIVERY_TYPE'
                    AND F.CD_CODE = A.DELIVERY_TYPE
                    AND G.PO_CD = A.PO_CD
                    AND G.PO_SEQ = A.PO_SEQ
                    AND G.ORDER_CD = A.ORDER_CD
                    AND G.MATL_CD = A.MATL_CD
                    AND G.MRP_SEQ = A.MRP_SEQ
                    AND G.IN_DATETIME = A.IN_DATETIME
                ORDER BY
                    1
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            let sqlStr1 = `
                SELECT
                    A.PO_CD,
                    A.ORDER_CD,
                    A.OUT_FROM AS VENDOR_NAME,
                    C.MATL_NAME,
                    C.COLOR,
                    C.SPEC,
                    C.UNIT,
                    A.SHIP_DATE,
                    A.ETA,
                    A.PACK_CD,
                    A.HIS_NO,
                    A.OUT_QTY,
                    A.OUT_FROM,
                    A.CT_QTY,
                    A.CT_NO,
                    A.REMARK,
                    F.CD_NAME AS DELIVERY,
                    'STOCK' AS IN_TYPE_NAME,
                    C.MATL_CD,
                    E.CD_NAME AS OUT_TYPE_NAME,
                    A.DEBIT_CD,
                    '' AS IN_TYPE,
                    A.OUT_STATUS,
                    A.PO_SEQ,
                    A.MRP_SEQ,
                    A.IN_DATETIME,
                    A.OUT_DATETIME,
                    A.OUT_QTY AS OUT_QTY2,
                    C.VENDOR_CD,
                    D.VENDOR_TYPE,
                    A.REG_DATETIME,
                    '0' AS PACK_CONFIRM,
                    A.STOCK_IDX
                FROM
                    KSV_STOCK_OUT A,
                    KCD_MATL_MST C,
                    KCD_VENDOR D,
                    KCD_CODE E,
                    KCD_CODE F ${tSQL1}
                    AND A.HIS_NO LIKE '%'
                    AND C.SPEC LIKE '%%'
                    AND C.MATL_NAME LIKE '%%'
                    AND C.COLOR LIKE '%%'
                    AND C.MATL_CD = A.MATL_CD
                    AND LEFT(A.OUT_FROM, 5) = 'STOCK'
                    AND C.VENDOR_CD LIKE '%'
                    AND LEFT(A.ORDER_CD, 2) LIKE '%'
                    AND D.VENDOR_CD = C.VENDOR_CD
                    AND D.VENDOR_TYPE LIKE '%'
                    AND E.CD_GROUP = 'OUT_TYPE'
                    AND E.CD_CODE = A.OUT_TYPE
                    AND F.CD_GROUP = 'DELIVERY_TYPE'
                    AND F.CD_CODE = A.DELIVERY_TYPE
                ORDER BY
                    1,
                    2
            `;
            var tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));

            var tWObj = {};
            tWObj.DATA1 = tRet;
            tWObj.DATA2 = tRet1;

            return tWObj;
        },
    },
};

export default moduleQuery_S0412_1;
