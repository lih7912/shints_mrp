import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0801_1 = {
    Query: {
        mgrQueryS0801_CODE: async (_, args) => {
            var tWObj = {};

            var tArray = ['', 'END'];
            var tArray1 = [' ', 'END'];
            let tRet = [];
            tArray.forEach((col, i) => {
                var tObj = {};
                tObj.CD_CODE = tArray[i];
                tObj.CD_NAME = tArray1[i];
                tRet.push(tObj);
            });
            tWObj.STATUS_CD = tRet;

            let sqlStr = `
                select
                    *
                from
                    kcd_buyer
                where
                    status_cd = '0'
                order by
                    buyer_cd
                    -- offset 0 rows fetch next 1000 rows only
            `;
            let tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tRet = [];
            tRet0.forEach((col, i) => {
                var tObj = { ...col };
                tObj.BUYER_NAME = `(${col.BUYER_CD})${col.BUYER_NAME}`;
                tRet.push(tObj);
            });
            var tObj = {};
            tObj.BUYER_CD = '';
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
                    -- offset 0 rows fetch next 1000 rows only
            `;
            let tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tRet = [];
            tRet0.forEach((col, i) => {
                var tObj = { ...col };
                tObj.USER_NAME = `(${col.USER_ID})${col.USER_NAME}`;
                tRet.push(tObj);
            });
            var tObj = {};
            tObj.USER_ID = '';
            tObj.USER_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.USER = tRet;

            return tWObj;
        },
        mgrQueryS0801_1: async (_, args) => {
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

export default moduleQuery_S0801_1;
