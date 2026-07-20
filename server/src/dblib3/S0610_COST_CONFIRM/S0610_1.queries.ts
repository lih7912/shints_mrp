import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0610_1 = {
    Query: {
        mgrQueryS0610_CODE: async (_, args) => {
            var tWObj = {};

            let sqlStr = `
                select
                    *
                from
                    kcd_buyer
                where
                    status_cd = '0'
                    -- and buyer_cd like '%${args.data.BUYER_CD}%'
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

            var tArray = [
                '',
                'AIR',
                'SEA',
                'DHL/FEDEX',
                'EXPRESS',
                'Local Import Cost',
                'Korea Import Cost',
                'MOQ',
                'Surcharge(MOQ)',
                'Surcharge(Freight)',
                'Surcharge(Other)',
            ];
            var tArray1 = [
                ' ',
                'AIR',
                'SEA',
                'DHL/FEDEX',
                'EXPRESS',
                'Local Import Cost',
                'Korea Import Cost',
                'MOQ',
                'Surcharge(MOQ)',
                'Surcharge(Freight)',
                'Surcharge(Other)',
            ];

            let tRet = [];
            tArray.forEach((col, i) => {
                var tObj = {};
                tObj.CD_CODE = tArray[i];
                tObj.CD_NAME = tArray1[i];
                tRet.push(tObj);
            });
            tWObj.TYPE = tRet;

            sqlStr = `
                select distinct
                    a.buyer_team as CD_CODE,
                    b.CD_NAME
                from
                    kcd_buyer a,
                    kcd_code b
                where
                    1 = 1
                    and a.BUYER_TEAM = b.CD_CODE
                    and b.CD_GROUP = 'BUYER_TEAM'
                order by
                    a.CD_CODE
            `;
            tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tRet.unshift({ CD_CODE: ' ', CD_NAME: ' ' });
            tWObj.BUYER_TEAM = tRet;

            sqlStr = `
                select
                    *
                from
                    kcd_code
                where
                    cd_group = 'CURR_CD'
                order by
                    cd_code
            `;
            tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tRet.unshift({ CD_GROUP: 'CURR_CD', CD_CODE: '', CD_NAME: ' ', CD_FLAG: '' });
            tWObj.CURR_CD = tRet;

            return tWObj;
        },
        mgrQueryS0610_1: async (_, args) => {
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

export default moduleQuery_S0610_1;
