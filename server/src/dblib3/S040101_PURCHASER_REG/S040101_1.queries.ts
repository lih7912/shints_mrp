import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기

// export default로 Query 내용 내보내기
const moduleQuery_S040101_1 = {
    Query: {
        mgrQueryS040101_1_CODE: async (_, args) => {
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
                var tObj = { ...col };
                tObj.BUYER_NAME = `${col.BUYER_NAME}(${col.BUYER_CD})`;
                tRet.push(tObj);
            });

            let tObj = {};
            tObj.BUYER_CD = '';
            tObj.BUYER_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.BUYER_CD = tRet;

            return tWObj;
        },

        mgrQueryS040101_1_CODE3: async (_, args) => {
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
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            if (tRet.length <= 0) {
                let sqlStr = `
                    select
                        BANK_CD,
                        BANK_NAME
                    from
                        kcd_bank
                    where
                        status_cd = '0'
                `;
                tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            }

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

        mgrQueryS040101_1_CODE2: async (_, args, contextValue) => {
            var tWObj = {};

            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            let sqlStr = `
                select
                    *
                from
                    kcd_place
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tObj = {};
            tObj.PLACE_CD = '';
            tObj.PLACE_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.PLACE_CD = tRet;

            var userSql = `
                select
                    *
                from
                    kcd_user
                where
                    user_id = '${tUserInfo.USER_ID}'
            `;
            var tRetUser = await prisma.$queryRaw(Prisma.raw(userSql));
            var tFactory = '';
            if (tRetUser[0].FACTORY_CD === 'FC010') tFactory = '서울';
            else if (tRetUser[0].FACTORY_CD === 'FC034') tFactory = 'BVT';
            else if (tRetUser[0].FACTORY_CD === 'FC044') tFactory = 'ETP';

            var tUserId = args.data.USER_ID;
            if (!tUserId) tUserId = tUserInfo.USER_ID;

            var buyerSql = `
                select
                    *
                from
                    kcd_buyer_team_info
                where
                    factory = '${tFactory}'
                    and (
                        team = 'SMC'
                        or team = 'SMC1'
                        or team = 'PUR'
                        or team = 'PUR1'
                        or team = 'EMC'
                        or team = 'VMC'
                        or team = 'VM'
                        or team = 'EM'
                    )
                    and user_id = '${tUserId}'
            `;
            var tRetBuyerSql = await prisma.$queryRaw(Prisma.raw(buyerSql));

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
                        a.team = 'SMC'
                        or a.team = 'SMC1'
                        or a.team = 'PUR'
                        or a.team = 'PUR1'
                        or a.team = 'EMC'
                        or a.team = 'VMC'
                        or a.team = 'EM'
                        or a.team = 'VM'
                    )
                    and a.user_id = b.user_id
                union
                select
                    USER_ID,
                    USER_NAME,
                    PART
                from
                    kcd_user
                where
                    (
                        part = 'VPUR'
                        or part = 'S11'
                        or part = 'VFP'
                        or part = 'VM'
                        or part = 'EM'
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

            var tBuyerSql = '';
            tRetBuyerSql.forEach((col, i) => {
                if (i === 0) tBuyerSql += `('${col.BUYER_CD}'`;
                else tBuyerSql += `, '${col.BUYER_CD}'`;
            });
            if (tRetBuyerSql.length > 0) {
                tBuyerSql += ')';
                let sqlStr10 = `
                    select
                        *
                    from
                        kcd_Buyer
                    where
                        status_cd = '0'
                        and buyer_cd in ${tBuyerSql}
                `;
                var tRet10 = await prisma.$queryRaw(Prisma.raw(sqlStr10));
            }

            var tRet = [];
            var tRet0 = [];
            var tRet1 = [];
            if (tBuyerSql !== '') {
                let sqlStr = `
                    select
                        *
                    from
                        kcd_Buyer
                    where
                        status_cd = '0'
                        and buyer_cd in ${tBuyerSql}
                `;
                tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr));
            }

            let sqlStr = '';
            if (tBuyerSql !== '') {
                sqlStr = `
                    select
                        *
                    from
                        kcd_Buyer
                    where
                        status_cd = '0'
                        and buyer_cd not in ${tBuyerSql}
                `;
                tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr));
            } else {
                sqlStr = `
                    select
                        *
                    from
                        kcd_Buyer
                    where
                        status_cd = '0'
                `;
                tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr));
            }

            let tRet = [];
            tRet0.forEach((col, i) => {
                var tObj = { ...col };
                tObj.BUYER_NAME = `${col.BUYER_NAME}(${col.BUYER_CD})*`;
                tRet.push(tObj);
            });
            tRet1.forEach((col, i) => {
                var tObj = { ...col };
                tObj.BUYER_NAME = `${col.BUYER_NAME}(${col.BUYER_CD})`;
                tRet.push(tObj);
            });
            let tObj = {};
            tObj.BUYER_CD = '';
            tObj.BUYER_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.BUYER_CD = tRet;

            let sqlStr = `
                -- select * from kcd_code where cd_group = 'DELIVERY_TYPE'
                select
                    *
                from
                    kcd_code
                where
                    cd_group = 'SHIPMENT_SHIP_MODE'
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
                    kcd_vendor
                order by
                    reg_datetime desc
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tObj = {};
            tObj.VENDOR_CD = '';
            tObj.VENDOR_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.VENDOR_CD = tRet;

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

            let sqlStr = `
                select
                    *
                from
                    kcd_code
                where
                    cd_group = 'PAY_TYPE'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tObj = {};
            tObj.CD_CODE = '';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.PAY_CONDITION = tRet;

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

            let tArray = ['', 'New', 'Update'];
            let tArray1 = [' ', 'New', 'Update'];
            let tRet = tArray.map((col, i) => {
                var tObj = {};
                tObj.id = i;
                tObj.CD_CODE = col;
                tObj.CD_NAME = tArray1[i];
                return tObj;
            });
            tWObj.PU_STATUS = tRet;

            let tArray = ['', 'EXW', 'FOB', 'CIF', 'DDP', 'FCA'];
            let tArray1 = [' ', 'EXW', 'FOB', 'CIF', 'DDP', 'FCA'];
            let tRet = tArray.map((col, i) => {
                var tObj = {};
                tObj.id = i;
                tObj.CD_CODE = col;
                tObj.CD_NAME = tArray1[i];
                return tObj;
            });
            tWObj.TRADE_TERM = tRet;

            let tArray = ['', 'SHINTS', 'BUYER', 'BVT', 'ETP'];
            let tArray1 = [' ', 'SHINTS', 'BUYER', 'BVT', 'ETP'];
            let tRet = tArray.map((col, i) => {
                var tObj = {};
                tObj.id = i;
                tObj.CD_CODE = col;
                tObj.CD_NAME = tArray1[i];
                return tObj;
            });
            tWObj.BILL_TYPE = tRet;

            /*
       let tArray = ['', 'china', 'busan', 'seoul', 'incheon', 'vietnam' ];
       let tArray1 = [' ', 'china', 'busan', 'seoul', 'incheon', 'vietnam' ];
       let tRet = tArray.map((col, i) => {
           var tObj = {};
           tObj.id = i;
           tObj.CD_CODE = col;
           tObj.CD_NAME = tArray1[i];
           return (tObj);
       });
       tWObj.ORIGIN_PORT = tRet;
*/

            let sqlStr = `
                select
                    *
                from
                    kcd_code
                where
                    cd_group = 'ORIGIN_PORT'
            `;
            let tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr));

            var tRet = [];
            tRet0.forEach((col, i) => {
                var tObj = { ...col };
                tObj.CD_NAME += ` / ${col.ETC2}`;
                tRet.push(tObj);
            });

            let tObj = {};
            tObj.CD_CODE = '';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.ORIGIN_PORT = tRet;

            return tWObj;
        },

        mgrQueryS040101_1: async (_, args) => {
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

export default moduleQuery_S040101_1;
