import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S040201_1 = {
    Query: {
        mgrQueryS040201_1_CODE: async (_, args) => {
            var tWObj = {};
            let sqlStr = `
                select
                    a.PO_CD,
                    a.FACTORY_CD,
                    a.reg_datetime,
                    a.PO_STATUS
                from
                    ksv_po_mst a,
                    ksv_po_mrp b
                where
                    a.po_seq = 1
                    and a.po_status <> '5'
                    and a.yy in (2022, 2023)
                    and a.po_cd = b.po_cd
                    and b.diff_po_type in ('1', '2', '4')
                order by
                    a.reg_datetime desc,
                    a.po_cd desc
                    -- offset 0 rows fetch next 1000 rows only
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tObj = {};
            tObj.PO_CD = ' ';
            tObj.FACTORY_CD = ' ';
            tRet.unshift(tObj);
            tWObj.PO_CD = tRet;

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
                    kcd_code
                where
                    cd_group = 'VENDOR_MATL_TYPE'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tObj = {};
            tObj.CD_CODE = ' ';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.MATL_TYPE = tRet;

            return tWObj;
        },

        mgrQueryS040201_1_CODE2: async (_, args) => {
            var tWObj = {};

            let sqlStr = `
                select distinct
                    c.VENDOR_NAME,
                    b.VENDOR_CD
                from
                    ksv_po_mrp a,
                    kcd_matl_mst b,
                    kcd_vendor c
                WHERE
                    a.PO_CD = '${args.data.PO_CD}'
                    and a.matl_cd = b.matl_cd
                    and b.vendor_cd = c.vendor_cd
                    and c.vendor_type like '%'
                    and c.vendor_matl_type like '%'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tObj = {};
            tObj.VENDOR_CD = ' ';
            tObj.VENDOR_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.VENDOR_CD = tRet;

            let sqlStr = `
                select
                    *
                from
                    ksv_po_mst
                where
                    po_cd = '${args.data.PO_CD}'
                    and po_seq > 1
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tObj = {};
            tObj.PO_CD = 'all';
            tObj.PO_SEQ = 1;
            tRet.unshift(tObj);
            tWObj.PO_SEQ = tRet;

            let sqlStr = `
                select
                    *
                from
                    kcd_code
                where
                    cd_group = 'PO_STATUS'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tObj = {};
            tObj.CD_CODE = ' ';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.PO_STATUS = tRet;

            return tWObj;
        },

        mgrQueryS040201_1: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }
            let sqlStr = `
                SELECT
                    A.PO_CD,
                    A.PO_SEQ,
                    A.ORDER_CD,
                    D.VENDOR_NAME,
                    A.MATL_CD,
                    C.MATL_NAME,
                    C.COLOR,
                    C.SPEC,
                    B.CD_NAME AS USE_PO_TYPE_NAME,
                    A.USE_QTY,
                    A.DIFF_QTY,
                    '' as COL1,
                    0 as COL2,
                    A.PO_QTY,
                    A.ADJ_PO_QTY,
                    E.CD_NAME AS DIFF_PO_TYPE_NAME,
                    C.UNIT,
                    A.MATL_PRICE,
                    A.CURR_CD,
                    A.TOT_AMT,
                    A.MRP_SEQ,
                    A.MATL_SEQ,
                    A.REG_DATETIME,
                    A.USE_PO_TYPE,
                    A.DIFF_PO_TYPE,
                    A.PO_MATL_CD,
                    A.ADJ_PO_QTY,
                    D.VENDOR_CD
                FROM
                    KSV_PO_MRP A,
                    KCD_MATL_MST C,
                    KCD_CODE B,
                    KCD_VENDOR D,
                    KCD_CODE E
                WHERE
                    A.PO_CD = '${args.data.PO_CD}'
                    AND C.MATL_CD = A.MATL_CD
                    AND C.MATL_NAME LIKE '%%'
                    AND C.MATL_CD LIKE '%%'
                    AND C.COLOR LIKE '%%'
                    AND C.SPEC LIKE '%%'
                    AND D.VENDOR_CD LIKE '%'
                    AND D.VENDOR_TYPE LIKE '%'
                    AND D.VENDOR_CD = C.VENDOR_CD
                    AND B.CD_GROUP = 'USE_PO_TYPE'
                    AND B.CD_CODE = A.USE_PO_TYPE
                    AND E.CD_GROUP = 'DIFF_PO_TYPE'
                    AND E.CD_CODE = A.DIFF_PO_TYPE
                ORDER BY
                    D.VENDOR_NAME,
                    C.MATL_NAME,
                    C.COLOR,
                    C.SPEC,
                    A.PO_SEQ
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S040201_1;
