import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0417_1 = {
    Query: {
        mgrQueryS0417_CODE: async (_, args) => {
            var tWObj = {};

            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_code
                where
                    cd_group = 'FRT_TYPE'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_NAME = ' ';
            tObj.CD_CODE = ' ';
            tRet.unshift(tObj);
            tWObj.FRT_TYPE = tRet;

            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_code
                where
                    cd_group = 'TRADE_TYPE'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_NAME = ' ';
            tObj.CD_CODE = ' ';
            tRet.unshift(tObj);
            tWObj.TRADE_TYPE = tRet;

            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_code
                where
                    cd_group = 'PARCEL_TYPE'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_NAME = ' ';
            tObj.CD_CODE = ' ';
            tRet.unshift(tObj);
            tWObj.PARCEL_TYPE = tRet;

            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_code
                where
                    cd_group = 'AREA_TYPE'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_NAME = ' ';
            tObj.CD_CODE = ' ';
            tRet.unshift(tObj);
            tWObj.AREA_TYPE = tRet;

            let tArray = ['ETP', 'BVT', 'TN', 'SHINTS'];
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
            tWObj.DESTINATION2 = tRet;

            let sqlStr = `
                SELECT
                    VENDOR_NAME AS CD_NAME,
                    VENDOR_CD AS CD_CODE
                FROM
                    KCD_VENDOR
                WHERE
                    STATUS_CD = '0'
                    AND VENDOR_CD NOT IN (
                        'V1002',
                        'V0153',
                        'V1683',
                        'V0228',
                        'V1838',
                        'V2496'
                    )
                UNION
                SELECT
                    BUYER_NAME AS CD_NAME,
                    BUYER_CD AS CD_CODE
                FROM
                    KCD_BUYER
                WHERE
                    STATUS_CD = '0'
                    AND BUYER_CD NOT IN (
                        '88',
                        'SI',
                        'SS',
                        'X1',
                        'X2',
                        'X3',
                        'X4',
                        'X5',
                        'X6',
                        'X9',
                        'X7',
                        'Y9',
                        '55',
                        '56',
                        'SB',
                        '66',
                        'EP',
                        'S3',
                        '58',
                        'SN'
                    )
                UNION
                SELECT
                    FACTORY_NAME AS CD_NAME,
                    FACTORY_CD AS CD_CODE
                FROM
                    KCD_FACTORY
                WHERE
                    STATUS_CD = '0'
                    AND FACTORY_CD NOT IN ('FC045', 'FC010')
                ORDER BY
                    1
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_NAME = ' ';
            tObj.CD_CODE = ' ';
            tRet.unshift(tObj);
            tWObj.DEPARTURE = tRet;

            tRet.forEach((col, i) => {
                var tObj = { ...col };
                tWObj.DESTINATION2.push(tObj);
            });

            tWObj.DESTINATION = tWObj.DESTINATION2;

            let sqlStr = `
                SELECT
                    RECEIVER_ID,
                    USER_NAME
                FROM
                    KCD_RECEIVER
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.RECEIVER_ID = ' ';
            tObj.USER_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.RECEIVER = tRet;

            let sqlStr = `
                SELECT
                    USER_ID,
                    USER_NAME
                FROM
                    KCD_USER
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.USER_ID = ' ';
            tObj.USER_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.SENDER = tRet;

            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_code
                where
                    cd_group = 'FRT_TYPE'
                    and cd_code not in ('6', '7', '8')
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_NAME = ' ';
            tObj.CD_CODE = ' ';
            tRet.unshift(tObj);
            tWObj.FRT_TYPE2 = tRet;

            let sqlStr = `
                SELECT DISTINCT
                    A.PO_CD
                FROM
                    KSV_PO_MST A
                WHERE
                    A.PO_STATUS <> '5'
                ORDER BY
                    A.PO_CD
                    -- offset 0 rows fetch next 1000 rows only
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.PO_CD = ' ';
            tRet.unshift(tObj);
            tWObj.PO_CD = tRet;

            let tArray = ['PCS', 'SET', 'YD', 'PACK'];
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
            tWObj.UNIT = tRet;

            let tArray = ['All', 'Y', 'N'];
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
            tWObj.BL_TYPE = tRet;

            let tArray = ['UNISEX', 'MEN', 'WOMEN'];
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
            tWObj.MW = tRet;

            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_code
                where
                    cd_group = 'DELAY_REASON'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_NAME = ' ';
            tObj.CD_CODE = ' ';
            tRet.unshift(tObj);
            tWObj.DELAY_REASON = tRet;

            let sqlStr = `
                SELECT DISTINCT
                    BL_NO,
                    BL_NO
                FROM
                    KZZ_FREIGHT
                where
                    frt_date between '202201' and '202312'
                ORDER BY
                    1
                    -- offset 0 rows fetch next 1000 rows only
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.BL_NO = ' ';
            tRet.unshift(tObj);
            tWObj.BL_NO = tRet;

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
                    KCD_code
                where
                    cd_group = 'CURR_CD'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_NAME = ' ';
            tObj.CD_CODE = ' ';
            tRet.unshift(tObj);
            tWObj.CURR_CD = tRet;

            let sqlStr = `
                SELECT
                    charge as CD_CODE,
                    charge as CD_NAME
                FROM
                    kzz_freight_charge
                WHERE
                    frt_type = '4'
                    and reg_datetime = (
                        select
                            max(reg_datetime)
                        from
                            kzz_freight_charge
                        where
                            frt_type = '4'
                    )
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWObj.EXPRESS_CHARGE = tRet;

            let sqlStr = `
                SELECT
                    charge as CD_CODE,
                    charge as CD_NAME
                FROM
                    kzz_freight_charge
                WHERE
                    frt_type = '3'
                    and reg_datetime = (
                        select
                            max(reg_datetime)
                        from
                            kzz_freight_charge
                        where
                            frt_type = '3'
                    )
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWObj.AIR_CHARGE = tRet;

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
                select
                    *
                from
                    kcd_code
                where
                    cd_group = 'BUYER_TEAM'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_NAME = ' ';
            tObj.CD_CODE = ' ';
            tRet.unshift(tObj);
            tWObj.BUYER_TEAM = tRet;

            let sqlStr = `
                select
                    *
                from
                    kcd_code
                where
                    cd_group = 'CHARGE_KIND'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_NAME = ' ';
            tObj.CD_CODE = ' ';
            tRet.unshift(tObj);
            tWObj.CHARGE_KIND = tRet;

            let sqlStr = `
                select
                    *
                from
                    kcd_factory
                where
                    factory_cd in ('FC010', 'FC034', 'FC044')
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.FACTORY_CD = ' ';
            tObj.FACTORY_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.FACTORY_CD = tRet;

            return tWObj;
        },
        mgrQueryS0417_1: async (_, args) => {
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

export default moduleQuery_S0417_1;
