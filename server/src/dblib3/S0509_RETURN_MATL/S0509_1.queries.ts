import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0509_1 = {
    Query: {
        mgrQueryS0509_1_CODE: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tWObj = {};
            tWObj.BUYER_CD = [];
            tWObj.ORDER_CD = [];
            tWObj.PO_CD = [];
            tWObj.PUR_FACTORY = [];
            tWObj.PAY_TYPE = [];
            tWObj.PURPOSE = [];
            tWObj.FACOUT_CD = [];

            if (args.data.PO_CD !== '' && args.data.ORDER_CD !== '') {
                let sqlStr = `
                    select
                        facout_cd,
                        out_date,
                        remark,
                        count(*) as c_cnt
                    from
                        ksv_stock_facout
                    where
                        po_cd = '${args.data.PO_CD}'
                        and order_cd = '${args.data.ORDER_CD}'
                    group by
                        facout_cd,
                        out_date,
                        remark
                `;
                let tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr));
                let tRet = [];
                tRet0.forEach((col, i) => {
                    var tObj = { ...col };
                    tObj.CD_NAME = `(${col.out_date})${col.remark}`;
                    tRet.push(tObj);
                });
                let tObj = {};
                tObj.CD_CODE = '';
                tObj.CD_NAME = ' ';
                tRet.unshift(tObj);
                tWObj.FACOUT_CD = tRet;

                return tWObj;
            } else {
                let tRet = [];
                let tObj = {};
                tObj.CD_CODE = '';
                tObj.CD_NAME = ' ';
                tRet.unshift(tObj);
                tWObj.FACOUT_CD = tRet;
            }

            let sqlStr = `
                select
                    *
                from
                    kcd_buyer
                where
                    status_cd = '0'
            `;
            let tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tRet = [];
            tRet0.forEach((col, i) => {
                var tObj = { ...col };
                tObj.BUYER_NAME = `(${col.BUYER_CD})${col.BUYER_NAME}`;
                tRet.push(tObj);
            });
            let tObj = {};
            tObj.BUYER_CD = '';
            tObj.BUYER_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.BUYER_CD = tRet;

            let tRet = [];
            let tObj = {};
            tObj.CD_CODE = '';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.ORDER_CD = tRet;

            let tRet = [];
            let tObj = {};
            tObj.CD_CODE = '';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.PO_CD = tRet;

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
            tWObj.PUR_FACTORY = tRet;

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
            tWObj.PAY_TYPE = tRet;

            let tRet = [];
            /*
      let tArray = ['', 'main', 'sample', 'm-up', 'test', 'stock_regist', 'loss' ];
      let tArray1 = [' ', 'main', 'sample', 'm-up', 'test', 'stock_regist', 'loss' ];
*/
            let tArray = [
                '',
                'main',
                'sample',
                'm_up',
                'test',
                'storage',
                'lost',
                'defect',
                'shortage in roll',
            ];
            let tArray1 = [
                ' ',
                'main',
                'sample',
                'm_up',
                'test',
                'storage',
                'lost',
                'defect',
                'shortage in roll',
            ];
            tArray.forEach((col, i) => {
                var tObj = {};
                tObj.id = i;
                tObj.CD_CODE = col;
                tObj.CD_NAME = tArray1[i];
                tRet.push(tObj);
            });
            tWObj.PURPOSE = tRet;

            return tWObj;
        },

        mgrQueryS0509_1_CODE_DETAIL: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tWObj = {};

            if (args.data.BUYER_CD !== '') {
                let sqlStr = `
                    select
                        *
                    from
                        kcd_buyer
                    where
                        status_cd = '0'
                `;
                let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
                let tObj = {};
                tObj.BUYER_CD = '';
                tObj.BUYER_NAME = ' ';
                tRet.unshift(tObj);
                tWObj.BUYER_CD = tRet;
            } else {
                tWObj.BUYER_CD = [];
            }

            if (args.data.PO_CD !== '') {
                let sqlStr = `
                    select
                        distinct po_cd
                    from
                        ksv_po_mst
                    where
                        po_cd like '%${args.data.PO_CD}%'
                `;
                let tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr));
                let tRet = [];
                tRet0.forEach((col, i) => {
                    var tObj = {};
                    tObj.CD_CODE = col.PO_CD;
                    tObj.CD_NAME = col.PO_CD;
                    tRet.push(tObj);
                });

                let tObj = {};
                tObj.CD_CODE = '';
                tObj.CD_NAME = ' ';
                tRet.unshift(tObj);
                tWObj.PO_CD = tRet;
            } else {
                tWObj.PO_CD = [];
            }

            if (args.data.ORDER_CD !== '') {
                let sqlStr = `
                    select
                        *
                    from
                        ksv_order_mst
                    where
                        order_cd like '%${args.data.ORDER_CD}%'
                `;
                let tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr));
                let tRet = [];
                tRet0.forEach((col, i) => {
                    var tObj = {};
                    tObj.CD_CODE = col.ORDER_CD;
                    tObj.CD_NAME = col.ORDER_CD;
                    tRet.push(tObj);
                });
                let tObj = {};
                tObj.CD_CODE = '';
                tObj.CD_NAME = ' ';
                tRet.unshift(tObj);
                tWObj.ORDER_CD = tRet;
            } else {
                tWObj.ORDER_CD = [];
            }

            tWObj.PUR_FACTORY = [];
            tWObj.PAY_TYPE = [];
            tWObj.PURPOSE = [];

            return tWObj;
        },

        mgrQueryS0509_1_CODE_DETAIL2: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tWObj = {};

            tWObj.BUYER_CD = [];
            tWObj.PO_CD = [];
            tWObj.ORDER_CD = [];

            if (args.data.BUYER_CD !== '') {
                let sqlStr = `
             select a.PO_CD from ksv_po_mst a, ksv_po_mem b 
             where a.po_seq = 1'
             and a.po_cd = b.po_cd
             and left(a.reg_datetime, 8) >= '2023'  
             and left(b.order_cd, 2) = '${args.data.BUYER_CD}'
            `;
                let tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr));
                let tRet = [];
                tRet0.forEach((col, i) => {
                    var tObj = {};
                    tObj.CD_CODE = col.PO_CD;
                    tObj.CD_NAME = col.PO_CD;
                    tRet.push(tObj);
                });
                let tObj = {};
                tObj.CD_CODE = '';
                tObj.CD_NAME = ' ';
                tRet.unshift(tObj);
                tWObj.PO_CD = tRet;
            }

            if (args.data.PO_CD !== '') {
                let sqlStr = `
             select b.ORDER_CD from ksv_po_mst a, ksv_po_mem b 
             where a.po_seq = 1'
             and a.po_cd = '${args.data.PO_CD}' 
            `;
                let tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr));
                let tRet = [];
                tRet0.forEach((col, i) => {
                    var tObj = {};
                    tObj.CD_CODE = col.ORDER_CD;
                    tObj.CD_NAME = col.ORDER_CD;
                    tRet.push(tObj);
                });
                let tObj = {};
                tObj.CD_CODE = '';
                tObj.CD_NAME = '';
                tRet.unshift(tObj);
                tWObj.ORDER_CD = tRet;
            }

            tWObj.PUR_FACTORY = [];
            tWObj.PAY_TYPE = [];
            tWObj.PURPOSE = [];

            return tWObj;
        },

        mgrQueryS0509_1_CODE0: async (_, args) => {
            var tWObj = {};

            if (args.data.PO_CD !== '') {
                let sqlStr = `
                    select
                        a.ORDER_CD
                    from
                        ksv_po_mem a,
                        ksv_order_mst b
                    where
                        a.po_cd = '${args.data.PO_CD}'
                        and a.po_seq = 1
                        and a.ORDER_CD = b.ORDER_CD
                        and b.end_production_date is not null
                        and b.end_production_date <> ''
                `;
                let tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr));
                let tRet = [];
                let tObj = {};
                tObj.CD_CODE = '';
                tObj.CD_NAME = ' ';
                tRet.push(tObj);

                tRet0.forEach((col, i) => {
                    let tObj = {};
                    tObj.CD_CODE = col.ORDER_CD;
                    tObj.CD_NAME = col.ORDER_CD;
                    tRet.push(tObj);
                });
                tWObj.ORDER_CD = tRet;
                tWObj.PO_CD = [];
            } else {
                let sqlStr = `
                    select distinct
                        PO_CD
                    from
                        ksv_po_mem
                    where
                        left(order_cd, 2) = '${args.data.BUYER_CD}'
                `;
                let tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr));
                let tRet = [];
                let tObj = {};
                tObj.CD_CODE = '';
                tObj.CD_NAME = ' ';
                tRet.push(tObj);

                tRet0.forEach((col, i) => {
                    let tObj = {};
                    tObj.CD_CODE = col.PO_CD;
                    tObj.CD_NAME = col.PO_CD;
                    tRet.push(tObj);
                });
                tWObj.PO_CD = tRet;
                tWObj.ORDER_CD = [];
            }

            return tWObj;
        },

        mgrQueryS0509_1_CODE2: async (_, args) => {
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

        mgrQueryS0509_1: async (_, args) => {
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

export default moduleQuery_S0509_1;
