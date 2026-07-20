import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S041201_1 = {
    Query: {
        mgrQueryS041201_CODE: async (_, args) => {
            var tWObj = {};

            let sqlStr = `
                select
                    HS_NAME,
                    HS_CD,
                    HS_NO
                from
                    kcd_hscode
                order by
                    hs_name
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.HS_CD = ' ';
            tObj.HS_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.HS_CODE = tRet;

            let sqlStr = `
                select
                    HS_CD,
                    PERMIT_COMPO1,
                    PERMIT_COMPO2,
                    PERMIT_COMPO3,
                    PERMIT_DETAIL
                from
                    kcd_matl_mst
                where
                    matl_cd = '${args.data.MATL_CD}'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.HS_CD = ' ';
            tObj.PERMIT_DETAIL = ' ';
            tRet.unshift(tObj);
            tWObj.HS_COMP = tRet;

            return tWObj;
        },

        mgrQueryS041201_1: async (_, args) => {
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

export default moduleQuery_S041201_1;
