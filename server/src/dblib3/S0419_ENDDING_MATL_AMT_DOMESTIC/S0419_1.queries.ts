import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0419_1 = {
    Query: {
        mgrQueryS0419_CODE: async (_, args, contextValue) => {
            // console.log(contextValue);

            var tWObj = {};

            let tArray = ['', '1', '2', '3', '4', '8', '10'];
            let tArray1 = [
                ' ',
                '과세',
                '영세',
                '면세',
                'T/T',
                '과세(8%)',
                '과세(10%)',
            ];
            let tRet = tArray.map((col, i) => {
                var tObj = {};
                tObj.CD_CODE = col;
                tObj.CD_NAME = tArray1[i];
                return tObj;
            });
            var tObj = {};
            tObj.CD_NAME = ' ';
            tObj.CD_CODE = ' ';
            tRet.unshift(tObj);
            tWObj.TAX_KIND = tRet;

            let tRet = [];
            if (args.data.VENDOR_CD !== '') {
                let sqlStr = `
                    SELECT
                        *
                    FROM
                        KCD_VENDOR
                    where
                        (
                            vendor_cd like '%${args.data.VENDOR_CD}%'
                            or vendor_name like '%${args.data.VENDOR_CD}%'
                        )
                    order by
                        vendor_cd
                        -- offset 0 rows fetch next 1000 rows only
                `;
                tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            }
            var tObj = {};
            tObj.VENDOR_NAME = ' ';
            tObj.VENDOR_CD = '';
            tRet.unshift(tObj);
            tWObj.VENDOR_CD = tRet;

            let tRet0 = [];
            let tRet = [];
            if (args.data.BUYER_CD !== '') {
                let sqlStr = `
                    select
                        *
                    from
                        kcd_buyer
                    where
                        (
                            buyer_cd like '%${args.data.BUYER_CD}%'
                            or buyer_name like '%${args.data.BUYER_CD}%'
                        )
                `;
                tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr));
            } else {
                let sqlStr = `
                    select
                        *
                    from
                        kcd_buyer
                    where
                        status_cd = '0'
                `;
                tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr));
            }
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

            let tRet = [];
            if (args.data.BANK_CD !== '') {
                let sqlStr = `
                    select
                        *
                    from
                        kcd_bank
                    where
                        (
                            bank_cd like '%${args.data.BANK_CD}%'
                            or bank_name like '%${args.data.BANK_CD}%'
                        )
                `;
                tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr));
                if (tRet0.length > 0) {
                    tRet0.forEach((col, i) => {
                        var tObj9 = { ...col };
                        tObj9.BANK_NAME = `${col.BANK_NAME}/${col.ACCOUNT_NAME}`;
                        tRet.push(tObj9);
                    });
                }
            }
            var tObj = {};
            tObj.BANK_CD = ' ';
            tObj.BANK_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.BANK_CD = tRet;

            let sqlStr = `
                select
                    *
                from
                    kcd_code
                where
                    cd_group = 'VENDOR_TYPE'
                    and cd_code in ('1', '3', '5')
            `;
            tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_CODE = '';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.VENDOR_TYPE = tRet;

            let sqlStr = `
                select
                    *
                from
                    kcd_factory_ware
                where
                    ware_cd in ('fc045', 'fc034', 'fc044', 'fc054')
            `;
            tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.WARE_CD = '';
            tObj.WARE_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.PUR_FACTORY = tRet;

            return tWObj;
        },
        mgrQueryS0419_1: async (_, args) => {
            let sqlStr = `
                SELECT DISTINCT
                    A.PO_CD
                FROM
                    KSV_PO_MST A
                WHERE
                    A.PO_STATUS <> '5'
                    and PO_CD like '%${args.data.PO_CD}%'
                ORDER BY
                    A.PO_CD desc
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

export default moduleQuery_S0419_1;
