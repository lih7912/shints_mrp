import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0501_1 = {
    Query: {
        mgrQueryS0501_CODE: async (_, args) => {
            var tWObj = {};

            let sqlStr = `
                select
                    *
                from
                    kcd_factory
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.FACTORY_CD = ' ';
            tObj.FACTORY_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.FACTORY_CD = tRet;

            let sqlStr = `
                select distinct
                    PO_CD,
                    PO_TYPE
                from
                    ksv_po_mst
                where
                    po_status in ('4', '5')
                    and status_cd = '0'
                    and po_type <> 'A'
                    and factory_cd like '%'
                    and yy in (2022, 2023)
                order by
                    po_type,
                    po_cd desc
                    -- offset 0 rows fetch next 300 rows only
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.PO_CD = ' ';
            tObj.PO_TYPE = ' ';
            tRet.unshift(tObj);
            tWObj.PO_CD = tRet;

            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_VENDOR
                order by
                    vendor_cd
                    -- offset 0 rows fetch next 1000 rows only
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.VENDOR_NAME = ' ';
            tObj.VENDOR_CD = ' ';
            tRet.unshift(tObj);
            tWObj.VENDOR_CD = tRet;

            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    cd_group = 'MATL_UNIT'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_CODE = ' ';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.MATL_UNIT = tRet;

            let tArray = ['Error', 'Shortage', 'Other', 'StockMove', 'Adjust'];
            let tRet = tArray.map((col, i) => {
                var tObj = {};
                tObj.CD_CODE = col;
                tObj.CD_NAME = col;
                return tObj;
            });
            var tObj = {};
            tObj.CD_NAME = ' ';
            tObj.CD_CODE = ' ';
            tRet.unshift(tObj);
            tWObj.ETC = tRet;

            return tWObj;
        },
        mgrQueryS0501_1: async (_, args) => {
            let sqlStr = `
                SELECT DISTINCT
                    A.PO_CD
                FROM
                    KSV_PO_MST A
                WHERE
                    A.PO_STATUS <> '5'
                    and PO_CD like '%${args.data.PO_CD}%'
                ORDER BY
                    A.PO_CD
            `;
            let sqlStr1 = `
                select
                    a.ORDER_CD
                from
                    ksv_order_mst a
                    left join ksv_po_mem b on a.order_cd = b.order_cd
                    and b.po_cd is null
                where
                    order_status <> '9'
                    and a.order_cd like '%${args.data.ORDER_CD}%'
            `;
            let tRet = [];
            if (args.data.KIND === 'PO')
                tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            if (args.data.KIND === 'ORDER')
                tRet = await prisma.$queryRaw(Prisma.raw(sqlStr1));

            var tRetArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                let tOne = { ...tRet[tIdx] };
                let sql0 = `
                    select
                        top 1 left(a.order_cd, 2) as buyer_cd,
                        c.cd_name as buyer_team
                    from
                        ksv_po_mem a,
                        kcd_buyer b,
                        kcd_code c
                    where
                        a.po_cd = '${tOne.PO_CD}'
                        and left(a.order_cd, 2) = b.buyer_cd
                        and c.cd_group = 'buyer_team'
                        and c.cd_code = b.buyer_team
                `;
                let sql1 = `
                    select
                        style_cd
                    from
                        ksv_order_mst
                    where
                        order_cd = '${tOne.ORDER_CD}'
                `;
                let tRet0 = [];
                var tObj = {};
                if (args.data.KIND === 'PO') {
                    tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                    tObj.COL1 = tOne.PO_CD;
                    tObj.COL2 = tRet0[0].buyer_cd;
                    tObj.COL3 = tRet0[0].buyer_team;
                }
                if (args.data.KIND === 'ORDER') {
                    tRet0 = await prisma.$queryRaw(Prisma.raw(sql1));
                    tObj.COL1 = tOne.ORDER_CD;
                    tObj.COL2 = tRet0[0].style_cd;
                    tObj.COL3 = '';
                }
                tRetArray.push(tObj);
            }

            return tRetArray;
        },
    },
};

export default moduleQuery_S0501_1;
