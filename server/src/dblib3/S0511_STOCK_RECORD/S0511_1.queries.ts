import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0511_1 = {
    Query: {
        mgrQueryS0511_CODE: async (_, args) => {
            var tWObj = {};

            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_FACTORY
                WHERE
                    STATUS_CD = '0'
                    and factory_cd in ('FC010', 'FC044', 'FC034')
                ORDER BY
                    FACTORY_NAME
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.FACTORY_NAME = ' ';
            tObj.FACTORY_CD = ' ';
            tRet.unshift(tObj);
            tWObj.FACTORY_CD = tRet;

            let sqlStr = `
                select
                    *
                from
                    kcd_code
                where
                    cd_group = 'STOCK_STATUS_S'
                    and cd_code in ('5', 'M', 'B', 'C', 'R', 'S', 'F')
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_CODE = ' ';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.STOCK_STATUS_S = tRet;

            let sqlStr = `
                select
                    *
                from
                    kcd_code
                where
                    cd_group = 'STOCK_REMARK'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_CODE = ' ';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.STOCK_REMARK = tRet;

            if (args.data.PO_CD !== '') {
                let sqlStr = `
                    select distinct
                        a.PO_CD
                    from
                        ksv_po_mst a,
                        ksv_po_mem b
                    where
                        a.po_seq = 1
                        and a.factory_cd = '${args.data.FACTORY_CD}'
                        and a.po_cd like '%${args.data.PO_CD}%'
                        and a.po_cd = b.po_cd
                    order by
                        a.po_cd
                `;
                let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
                var tObj = {};
                tObj.PO_CD = ' ';
                tRet.unshift(tObj);
                tWObj.PO_CD = tRet;
            } else {
                let tRet = [];
                var tObj = {};
                tObj.PO_CD = ' ';
                tRet.unshift(tObj);
                tWObj.PO_CD = tRet;
            }

            if (args.data.PO_CD !== '') {
                let sqlStr = `
                    select
                        b.ORDER_CD
                    from
                        ksv_po_mem a,
                        ksv_order_mst b
                    where
                        a.po_cd = '${args.data.PO_CD}'
                        and a.po_seq = 1
                        and b.order_cd = a.order_cd
                    order by
                        b.order_cd
                `;
                let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
                var tObj = {};
                tObj.ORDER_CD = ' ';
                tRet.unshift(tObj);
                tWObj.ORDER_CD = tRet;
            } else {
                let tRet = [];
                var tObj = {};
                tObj.ORDER_CD = ' ';
                tRet.unshift(tObj);
                tWObj.ORDER_CD = tRet;
            }

            return tWObj;
        },
        mgrQueryS0511_1: async (_, args) => {
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

export default moduleQuery_S0511_1;
