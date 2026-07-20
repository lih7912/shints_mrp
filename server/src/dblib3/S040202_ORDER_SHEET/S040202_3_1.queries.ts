import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S040202_3_1 = {
    Query: {
        mgrQueryS040202_CODE: async (_, args) => {
            var tWObj = {};

            let sqlStr = `
                select
                    *
                from
                    kcd_place
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.PLACE_CD = ' ';
            tObj.PLACE_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.PLACE_CD = tRet;

            let sqlStr = `
                select distinct
                    a.PO_CD,
                    a.PO_SEQ,
                    LEFT(b.ORDER_CD, 2) as BUYER_CD,
                    a.reg_datetime
                from
                    ksv_po_mst a,
                    ksv_po_mem b
                where
                    a.po_status <> '5'
                    and yy in (2022, 2023)
                    and a.po_cd = '${args.data.PO_CD}'
                    and a.po_cd = b.po_cd
                order by
                    a.reg_datetime desc
                    -- offset 0 rows fetch next 1000 rows only
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj1 = {};
            tObj1.PO_CD = 'BAL';
            tObj1.PO_SEQ = 'BAL ';
            tRet.unshift(tObj1);
            var tObj = {};
            tObj.PO_CD = 'all';
            tObj.PO_SEQ = 'all ';
            tRet.unshift(tObj);
            tWObj.PO_SEQ = tRet;

            return tWObj;
        },

        mgrQueryS040202_CODE2: async (_, args) => {
            var tWObj = {};

            let sqlStr = `
                SELECT
                    A.MD,
                    B.EMAIL
                FROM
                    KCD_BUYER_MD A,
                    KCD_USER B
                WHERE
                    A.BUYER_CD = '${args.data.BUYER_CD}'
                    AND B.USER_ID = A.MD
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWObj.MD_LIST = tRet;

            var tDate = new Date();
            var mm = tDate.getMonth() + 1;
            var mm_str = '';
            if (mm > 9) mm_str = mm.toString();
            else mm_str = '0' + mm;

            var dd = tDate.getDate();
            var dd_str = '';
            if (dd > 9) dd_str = dd;
            else dd_str = '0' + dd;

            var hours = tDate.getHours();
            var hours_str = '';
            if (hours > 9) hours_str = hours.toString();
            else hours_str = '0' + hours;

            var minutes = tDate.getMinutes();
            var minutes_str = '';
            if (minutes > 9) minutes_str = minutes.toString();
            else minutes_str = '0' + minutes;

            var seconds = tDate.getSeconds();
            var seconds_str = '';
            if (seconds > 9) seconds_str = seconds.toString();
            else seconds_str = '0' + seconds;

            var yyyy = tDate.getFullYear();
            var tRetDate =
                yyyy.toString() +
                mm_str +
                dd_str +
                hours_str +
                minutes_str +
                seconds_str;
            var tRetDate1 = tRetDate.substring(0, 8);

            let sqlStr = `
                SELECT
                    *
                FROM
                    KSV_PO_MST
                WHERE
                    PO_CD = '${args.data.PO_CD}'
                    AND PO_SEQ = 1
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj0 = { ...tRet[0] };
            var tArray = [];
            if (tObj0.PLAN_ETD === null) {
                tObj0.PLAN_FLAG = '0';
                tObj0.PLAN_ETD = tRetDate1;
                tObj0.PLAN_ETA = tRetDate1;
                tArray.push(tObj0);
            } else {
                tArray.push(tObj0);
            }
            tWObj.PLAN = tArray;

            return tWObj;
        },

        mgrQueryS040202_3_1: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }

            let sqlStr = `
                SELECT DISTINCT
                    D.VENDOR_NAME,
                    C.END_DATE,
                    '0' as COL1,
                    D.EMAIL,
                    '' as COL2,
                    '' as COL3,
                    C.VENDOR_CD,
                    D.VENDOR_TYPE,
                    '' as COL4
                FROM
                    KSV_STOCK_MEM A,
                    KCD_MATL_MST B,
                    KSV_PO_VENDOR C,
                    KCD_VENDOR D
                WHERE
                    A.PO_CD = '${args.data.PO_CD}'
                    AND A.PO_QTY > 0
                    AND A.PO_QTY > A.IN_QTY
                    AND B.MATL_CD = A.MATL_CD
                    AND C.PO_CD = A.PO_CD
                    AND C.VENDOR_CD = B.VENDOR_CD
                    AND D.VENDOR_CD = B.VENDOR_CD
                ORDER BY
                    1
            `;

            let sqlStr1 = `
                SELECT DISTINCT
                    D.VENDOR_NAME,
                    C.END_DATE,
                    '0' as COL1,
                    D.EMAIL,
                    '' as COL2,
                    '' as COL3,
                    C.VENDOR_CD,
                    D.VENDOR_TYPE,
                    '' as COL4
                FROM
                    KSV_PO_MRP A,
                    KCD_MATL_MST B,
                    KSV_PO_VENDOR C,
                    KCD_VENDOR D
                WHERE
                    A.PO_CD = '${args.data.PO_CD}'
                    AND A.PO_SEQ = 1
                    AND A.USE_PO_TYPE = '1'
                    AND A.PO_QTY <> 0
                    AND B.MATL_CD = A.MATL_CD
                    AND C.PO_CD = A.PO_CD
                    AND C.VENDOR_CD = B.VENDOR_CD
                    AND D.VENDOR_CD = B.VENDOR_CD
                    AND A.DIFF_PO_TYPE <> '1'
                ORDER BY
                    1
            `;

            let sqlStr2 = `
                SELECT
                    D.VENDOR_NAME,
                    C.END_DATE,
                    '0' as COL1,
                    D.EMAIL,
                    '' as COL2,
                    '' as COL3,
                    C.VENDOR_CD,
                    D.VENDOR_TYPE,
                    '' as COL4
                FROM
                    KSV_PO_MRP A,
                    KCD_MATL_MST B,
                    KSV_PO_VENDOR C,
                    KCD_VENDOR D
                WHERE
                    A.PO_CD = '${args.data.PO_CD}'
                    AND A.USE_PO_TYPE = '1'
                    AND A.PO_QTY <> 0
                    AND B.MATL_CD = A.MATL_CD
                    AND C.PO_CD = A.PO_CD
                    AND C.VENDOR_CD = B.VENDOR_CD
                    AND D.VENDOR_CD = B.VENDOR_CD
                GROUP BY
                    D.VENDOR_NAME,
                    C.END_DATE,
                    D.EMAIL,
                    C.VENDOR_CD,
                    D.VENDOR_TYPE
                HAVING
                    SUM(A.PO_QTY) > 0
                ORDER BY
                    1
            `;

            if (args.data.PO_SEQ === 'BAL') {
                var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
                return tRet;
            } else if (args.data.PO_SEQ === 'all') {
                var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr2));
                return tRet;
            } else {
                var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr1));
                return tRet;
            }
        },
    },
};

export default moduleQuery_S040202_3_1;
