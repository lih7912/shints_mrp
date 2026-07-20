import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0401_1 = {
    Query: {
        mgrQueryS0401_1_CODE: async (_, args) => {
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
            let tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tRet = [];
            tRet0.forEach((col, i) => {
                var tOne = { ...col };
                tOne.BUYER_NAME = `(${col.BUYER_CD})${col.BUYER_NAME}`;
                tRet.push(tOne);
            });

            let tObj = {};
            tObj.BUYER_CD = '';
            tObj.BUYER_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.BUYER_CD = tRet;

            return tWObj;
        },

        mgrQueryS0401_1_CODE0: async (_, args) => {
            var tWObj = {};

            let sqlStr = `
                select
                    *
                from
                    kcd_code
                where
                    cd_group = 'PU_STATUS'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tObj = {};
            tObj.CD_CODE = '';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.PU_STATUS = tRet;

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
            tObj.CD_CODE = '';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.VENDOR_TYPE = tRet;

            let sqlStr = `
                select distinct
                    left(b.order_cd, 2) as BUYER_CD,
                    c.BUYER_NAME
                from
                    ksv_po_worklist a,
                    ksv_po_mem b,
                    kcd_buyer c
                where
                    a.po_cd = b.po_cd
                    and left(b.order_cd, 2) = c.buyer_cd
                order by
                    left(b.order_cd, 2)
            `;
            let tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tRet = [];
            tRet0.forEach((col, i) => {
                var tOne = { ...col };
                tOne.BUYER_NAME = `(${col.BUYER_CD})${col.BUYER_NAME}`;
                tRet.push(tOne);
            });
            let tObj = {};
            tObj.BUYER_CD = '';
            tObj.BUYER_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.BUYER_CD = tRet;

            let sqlStr = `
                select distinct
                    a.USER_ID,
                    b.USER_NAME,
                    b.PART
                from
                    kcd_buyer_team_info a,
                    kcd_user b
                where
                    (
                        team = 'SMC'
                        or a.team = 'SMC1'
                        or a.team = 'PUR'
                        or a.team = 'PUR1'
                    )
                    and a.user_id = b.user_id
                union
                select
                    USER_ID,
                    USER_NAME,
                    PART
                from
                    kcd_user
                    -- where (part = 'VPUR' or part = 'S11' or part = 'VFP' or part = 'M01' or part = 'M03')
                where
                    (
                        part = 'VPUR'
                        or part = 'S11'
                        or part = 'VFP'
                    )
            `;
            let tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tRet = [];
            tRet0.forEach((col, i) => {
                var tObj = { ...col };
                tObj.USER_NAME = `(${col.USER_ID})${col.USER_NAME}/${col.PART}`;
                tRet.push(tObj);
            });
            let tObj = {};
            tObj.USER_ID = '';
            tObj.USER_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.USER = tRet;

            return tWObj;
        },

        mgrQueryS0401_1_CODE3: async (_, args) => {
            var tWObj = {};

            let sqlStr = `
                select
                    b.BANK_CD,
                    b.BANK_NAME
                from
                    kcd_vendor_bank a,
                    kcd_bank b
                where
                    a.vendor_cd = '${args.data.VENDOR_CD}'
                    and a.bank_cd = b.bank_cd
            `;
            let tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr));
            if (tRet0.length <= 0) {
                let sqlStr = `
                    select
                        BANK_CD,
                        BANK_NAME
                    from
                        kcd_bank
                    where
                        status_cd = '0'
                `;
                tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr));
            }

            let tRet = [];
            tRet0.forEach((col, i) => {
                var tOne = { ...col };
                tOne.BUYER_NAME = `(${col.BUYER_CD})${col.BUYER_NAME}`;
                tRet.push(tOne);
            });

            let tObj = {};
            tObj.BANK_CD = ' ';
            tObj.BANK_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.BANK_CD = tRet;

            let sqlStr = `
                select
                    a.CD_CODE,
                    a.CD_NAME
                from
                    kcd_code a,
                    kcd_vendor b
                where
                    a.cd_group = 'PAY_TYPE'
                    and a.cd_code = b.pay_type
                    and b.vendor_cd = '${args.data.VENDOR_CD}'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tObj = {};
            tObj.CD_CODE = ' ';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.PAY_TYPE = tRet;

            return tWObj;
        },

        mgrQueryS0401_1_CODE2: async (_, args) => {
            var tWObj = {};

            let sqlStr = `
                select
                    *
                from
                    kcd_place
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tObj = {};
            tObj.PLACE_CD = ' ';
            tObj.PLACE_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.PLACE_CD = tRet;

            let sqlStr = `
                select
                    *
                from
                    kcd_code
                where
                    cd_group = 'DELIVERY_TYPE'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tObj = {};
            tObj.CD_CODE = '';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.SHIP_MODE = tRet;

            let sqlStr = `
                select
                    *
                from
                    kcd_code
                where
                    cd_group = 'CURR_CD'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tObj = {};
            tObj.CD_CODE = '';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.CURR_CD = tRet;

            let tArray = ['', 'O', 'X'];
            let tArray1 = [' ', 'O', 'X'];
            let tRet = tArray.map((col, i) => {
                var tObj = {};
                tObj.id = i;
                tObj.CD_CODE = col;
                tObj.CD_NAME = tArray1[i];
                return tObj;
            });
            tWObj.NORMI = tRet;

            let tArray = ['', 'EXW', 'FOB', 'CIF'];
            let tArray1 = [' ', 'EXW', 'FOB', 'CIF'];
            let tRet = tArray.map((col, i) => {
                var tObj = {};
                tObj.id = i;
                tObj.CD_CODE = col;
                tObj.CD_NAME = tArray1[i];
                return tObj;
            });
            tWObj.TRADE_TERM = tRet;

            let tArray = ['', 'SHINTS', 'BUYER', 'FACTORY'];
            let tArray1 = [' ', 'SHINTS', 'BUYER', 'FACTORY'];
            let tRet = tArray.map((col, i) => {
                var tObj = {};
                tObj.id = i;
                tObj.CD_CODE = col;
                tObj.CD_NAME = tArray1[i];
                return tObj;
            });
            tWObj.BILL_TYPE = tRet;

            return tWObj;
        },

        mgrQueryS0401_1: async (_, args) => {
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

export default moduleQuery_S0401_1;
