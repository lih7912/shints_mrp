import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0702_1 = {
    Query: {
        mgrQueryS0702_CODE1: async (_, args) => {
            var tWObj = {};
            let sqlStr = '';
            let tRet0: any[] = [];
            let tRet: any[] = [];

            sqlStr = `
                select distinct
                    a.PO_CD
                from
                    ksv_po_mst a,
                    ksv_po_mem b
                where
                    b.po_cd = a.po_cd
                    and a.po_seq = 1
                    and a.po_seq = b.po_seq
                    and left(b.order_cd, 2) = '${args.data.BUYER_CD}'
            `;
            tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tRet = [];
            tRet0.forEach((col, i) => {
                var tObj = { ...col };
                tObj.PO_SEQ = tObj.PO_CD;
                tRet.push(tObj);
            });
            var tObj = {};
            tObj.PO_CD = '';
            tObj.PO_DATE = ' ';
            tRet.unshift(tObj);
            tWObj.PO_CD = tRet;

            sqlStr = `
                select distinct
                    b.ORDER_CD
                from
                    ksv_po_mst a,
                    ksv_po_mem b
                where
                    b.po_cd = a.po_cd
                    and a.po_seq = 1
                    and a.po_seq = b.po_seq
                    and left(b.order_cd, 2) = '${args.data.BUYER_CD}'
            `;
            tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tRet = [];
            tRet0.forEach((col, i) => {
                var tObj = { ...col };
                tObj.STYLE_CD = tObj.ORDER_CD;
                tRet.push(tObj);
            });
            var tObj = {};
            tObj.ORDER_CD = '';
            tObj.STYLE_CD = ' ';
            tRet.unshift(tObj);
            tWObj.ORDER_CD = tRet;

            return tWObj;
        },

        mgrQueryS0702_CODE: async (_, args) => {
            var tWObj = {};
            tWObj.FACTORY = [];
            tWObj.MESSER = [];
            tWObj.BUYER3 = [];
            tWObj.USER = [];
            tWObj.DEBIT_STATUS = [];
            tWObj.DEBIT_TYPE = [];
            tWObj.CURR_CD = [];
            tWObj.PAY_TYPE = [];
            tWObj.CREDIT_END_TYPE = [];
            tWObj.AUTH = [];
            tWObj.BANK = [];
            tWObj.PO_CD = [];
            tWObj.ORDER_CD = [];

            let tRet0: any[] = [];
            let sqlStr = '';
            let tRet: any[] = [];

            sqlStr = `
                select
                    COM_NAME,
                    COM_CD
                from
                    kvw_company
                where
                    com_cd not in ('V0228', 'SB', 'EP', 'V1652')
                    and (
                        com_cd like '%${args.data.COM_CD}%'
                        or com_name like '%${args.data.COM_CD}%'
                    )
            `;
            tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr));

            tRet = [];
            tRet0.forEach((col, i) => {
                var tObj = { ...col };
                tObj.COM_NAME = `(${col.COM_CD})${col.COM_NAME}`;
                tRet.push(tObj);
            });
            var tObj = {};
            tObj.COM_NAME = ' ';
            tObj.COM_CD = ' ';
            tRet.unshift(tObj);
            tWObj.MESSER = tRet;

            tRet0 = [];
            /*
       if (args.data.BUYER_CD !== '') {
          let sqlStr  = `
              SELECT
                  BUYER_CD,
                  BUYER_NAME
              FROM
                  KCD_BUYER
              WHERE
                  status_cd = '0'
                  and (
                      buyer_cd like '%${args.data.BUYER_CD}%'
                      or buyer_name like '%${args.data.BUYER_CD}%'
                  )
          `;
         tRet0  =  await prisma.$queryRaw(Prisma.raw(sqlStr));
       }
       let tRet = [];
       tRet0.forEach((col, i) => {
           var tObj = { ...col };
           tObj.BUYER_NAME = `(${col.BUYER_CD})${col.BUYER_NAME}`;
           tRet.push(tObj);
       });
*/
            sqlStr = `
                SELECT
                    BUYER_CD,
                    BUYER_NAME
                FROM
                    KCD_BUYER
                WHERE
                    status_cd = '0'
            `;
            tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tRet = [];
            tRet0.forEach((col, i) => {
                var tObj = { ...col };
                tObj.BUYER_NAME = `(${col.BUYER_CD})${col.BUYER_NAME}`;
                tRet.push(tObj);
            });
            var tObj = {};
            tObj.BUYER_CD = ' ';
            tObj.BUYER_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.BUYER3 = [...tRet];

            /*
       var tArray1 = ['FC045', 'FC034', 'FC044'];
       var tArray2 = ['ShinTS', 'SHINTS BVT CO., LTD', 'SHINTS ETP GARMENT PLC'];
       tArray1.forEach((col, i) => {
           var tObj = {};
           tObj.BUYER_CD = col;
           tObj.BUYER_NAME = tArray2[i];
           tWObj.BUYER3.push(tObj);
       });
       */

            tRet = [];
            sqlStr = `
                select
                    BANK_NAME,
                    BANK_CD
                from
                    kcd_bank
                where
                    (
                        bank_cd like '%${args.data.BANK_CD}%'
                        or bank_name like '%${args.data.BANK_CD}%'
                    )
            `;
            tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            var tObj = {};
            tObj.BANK_NAME = ' ';
            tObj.BANK_CD = ' ';
            tRet.unshift(tObj);
            tWObj.BANK = tRet;

            sqlStr = `
                select
                    FACTORY_CD,
                    FACTORY_NAME
                from
                    kcd_factory
                where
                    status_cd = '0'
                    and factory_cd in ('FC010', 'FC034', 'FC044', 'FC045')
            `;
            tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.FACTORY_CD = '';
            tObj.FACTORY_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.FACTORY = tRet;

            sqlStr = `
                select
                    USER_NAME,
                    USER_ID
                from
                    kcd_user
                order by
                    user_name
            `;
            tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.USER_ID = ' ';
            tObj.USER_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.USER = tRet;

            sqlStr = `
                select
                    CD_NAME,
                    CD_CODE
                from
                    kcd_code
                where
                    cd_group = 'CREDIT_STATUS'
            `;
            tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_CODE = '';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.DEBIT_STATUS = tRet;

            sqlStr = `
                select
                    CD_NAME,
                    CD_CODE
                from
                    kcd_code
                where
                    cd_group = 'DEBIT_TYPE'
            `;
            tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_CODE = '';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.DEBIT_TYPE = tRet;

            sqlStr = `
                select
                    CD_NAME,
                    CD_CODE
                from
                    kcd_code
                where
                    cd_group = 'PAYMENT_TYPE'
            `;
            tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_CODE = '';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.PAY_TYPE = tRet;

            sqlStr = `
                select
                    CD_NAME,
                    CD_CODE
                from
                    kcd_code
                where
                    cd_group = 'CURR_CD'
            `;
            tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_CODE = '';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.CURR_CD = tRet;

            sqlStr = `
                select
                    CD_NAME,
                    CD_CODE
                from
                    kcd_code
                where
                    cd_group = 'CREDIT_END_TYPE'
            `;
            tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_CODE = '';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.CREDIT_END_TYPE = tRet;

            sqlStr = `
                select
                    PART,
                    USER_NAME
                from
                    kcd_user
                where
                    user_id = '${args.data.USER_ID}'
            `;
            tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.PART = ' ';
            tObj.USER_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.AUTH = tRet;

            tRet0 = [];
            sqlStr = `
                select distinct
                    PO_CD,
                    id
                from
                    ksv_po_mst
                where
                    po_seq = 1
                    and (po_cd like '%${args.data.PO_CD}%')
                    and left(reg_datetime, 4) >= '2024'
                order by
                    id desc
            `;
            tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tRet = [];
            tRet0.forEach((col, i) => {
                var tObj = { ...col };
                tObj.PO_DATE = tObj.PO_CD;
                tRet.push(tObj);
            });
            var tObj = {};
            tObj.PO_CD = '';
            tObj.PO_DATE = ' ';
            tRet.unshift(tObj);
            tWObj.PO_CD = tRet;

            tRet0 = [];
            sqlStr = `
                select distinct
                    ORDER_CD,
                    id
                from
                    ksv_order_mst
                where
                    (order_cd like '%${args.data.ORDER_CD}%')
                    and left(reg_datetime, 4) >= '2024'
                order by
                    id desc
            `;
            tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tRet = [];
            tRet0.forEach((col, i) => {
                var tObj = { ...col };
                tObj.STYLE_CD = tObj.ORDER_CD;
                tRet.push(tObj);
            });
            var tObj = {};
            tObj.ORDER_CD = '';
            tObj.STYLE_CD = ' ';
            tRet.unshift(tObj);
            tWObj.ORDER_CD = tRet;

            return tWObj;
        },
        mgrQueryS0702_1: async (_, args) => {
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

export default moduleQuery_S0702_1;
