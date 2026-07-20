import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0439_1 = {
    Query: {
        mgrQueryS0439_1_CODE: async (_, args) => {
            var tWObj = {};
            let sqlStr = `
                select distinct
                    left(b.order_cd, 2) as BUYER_CD,
                    c.BUYER_NAME
                from
                    ksv_po_mem b,
                    ksv_po_mst a,
                    kcd_buyer c,
                    ksv_order_mst d
                where
                    a.po_status in ('4')
                    and b.po_cd = a.po_cd
                    and b.po_seq = a.po_seq
                    and b.order_cd = d.order_cd
                    and d.order_status in ('3', '5', '6')
                    -- and a.yy in (2022, 2023)
                    and left(b.order_cd, 2) = c.buyer_cd
                order by
                    c.BUYER_NAME asc
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tObj = {};
            tObj.BUYER_CD = '';
            tObj.BUYER_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.BUYER_CD = tRet;

            return tWObj;
        },

        mgrQueryS0439_1_CODE2: async (_, args) => {
            var tWObj = {};

            let sqlStr = `
                select
                    CD_CODE,
                    ETC2 as CD_NAME
                from
                    kcd_code
                where
                    cd_group = 'GW_STATUS'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tObj = {};
            tObj.CD_CODE = '';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.GW_STATUS = tRet;

            let tArray = ['', 'LC', 'Deposit'];
            let tArray1 = [' ', 'LC', 'Deposit'];
            let tRet = tArray.map((col, i) => {
                var tObj = {};
                tObj.id = i;
                tObj.CD_CODE = col;
                tObj.CD_NAME = tArray1[i];
                return tObj;
            });
            tWObj.TYPE = tRet;

            return tWObj;
        },

        mgrQueryS0439_1: async (_, args) => {
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

export default moduleQuery_S0439_1;
