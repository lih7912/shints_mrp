import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S030514_1 = {
    Query: {
        mgrQueryS030514_LIST_1: async (_, args) => {
            var tSQL = '';

            let sqlStr = `
                SELECT
                    a.REG_USER,
                    a.PO_CD,
                    e.CD_NAME AS PO_STATUS,
                    d.PO_DATE,
                    c.VENDOR_NAME,
                    a.PR_NUM,
                    a.MATL_CD,
                    b.COLOR,
                    b.MATL_NAME,
                    b.SPEC,
                    b.UNIT,
                    a.TOT_CNT,
                    a.STOCK_QTY,
                    cast(a.tot_cnt as float) - a.stock_qty as BAL,
                    a.REMARK,
                    a.stock_qty as STOCK_QTY1,
                    a.remark as REMARK1
                FROM
                    KSV_PO_MATLLIST a,
                    kcd_matl_mst b,
                    kcd_vendor c,
                    ksv_po_mst d,
                    kcd_code e
                WHERE
                    1 = 1
                    and a.po_cd = d.po_cd
                    and d.po_status <> '5'
                    and d.po_status = e.cd_code
                    and e.cd_group = 'PO_STATUS'
                    and d.po_seq = (
                        select
                            min(po_seq)
                        from
                            ksv_po_mst
                        where
                            po_cd = '${args.data.PO_CD}'
                    )
                    and a.VENDOR_CD = c.VENDOR_CD
                    and a.matl_cd = b.matl_cd
                    and a.PO_CD = '${args.data.PO_CD}'
                ORDER BY
                    c.vendor_name,
                    LEN(a.PR_NUM),
                    a.PR_NUM,
                    b.matl_name,
                    b.spec
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            return tRet;
        },
        mgrQueryS030514_LIST_2: async (_, args) => {
            var tSQL = '';

            let sqlStr = `
                SELECT
                    name as FILE_NAME,
                    url as FILE_URL,
                    title as TITLE,
                    upd_datetime as UPD_DATETIME,
                    upd_user as UPD_USER
                FROM
                    KCD_FILEINFO
                WHERE
                    kind = 'S030514'
                    and title like '%${args.data.PO_CD}%'
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            return tRet;
        },
        mgrQueryS030514_LIST_3: async (_, args) => {
            var tSQL = '';

            let sqlStr = `
                SELECT
                    name as FILE_NAME,
                    url as FILE_URL,
                    title as TITLE,
                    upd_datetime as UPD_DATETIME,
                    upd_user as UPD_USER
                FROM
                    KCD_FILEINFO
                WHERE
                    kind = 'S030514'
                    and title like 'ORDER_QTY2_%'
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            return tRet;
        },

        mgrQueryS030514_QRY_PO: async (_, args) => {
            var tSQL = '';

            let sqlStr = `
                select
                    top 100 PO_CD,
                    PO_CD as PO_NAME
                from
                    ksv_po_mst
                where
                    po_cd like '%${args.data.PO_CD}%'
                    and po_seq = 1
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.PO_CD = '';
            tObj.PO_NAME = ' ';
            tRet.unshift(tObj);
            return tRet;
        },
        mgrQueryS030514_QRY_BUYER: async (_, args) => {
            var tSQL = '';

            let sqlStr = `
                select
                    BUYER_CD,
                    BUYER_NAME
                from
                    kcd_buyer
                    --where (buyer_cd like '%${args.data.BUYER_CD}%'
                    --or  buyer_name like '%${args.data.BUYER_CD}%')
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tRet.forEach((e) => {
                e.BUYER_NAME = `(${e.BUYER_CD})${e.BUYER_NAME}`;
            });
            tRet.unshift({ BUYER_CD: '', BUYER_NAME: ' ' });
            return tRet;
        },
        mgrQueryS030514_QRY_PO_BY_BUYER: async (_, args) => {
            var tSQL = '';

            let sqlStr = `
                select distinct
                    a.PO_CD,
                    a.PO_CD as PO_NAME
                from
                    ksv_po_mst a,
                    ksv_po_mem b
                where
                    a.po_cd = b.po_cd
                    and a.po_seq = 1
                    and b.po_seq = 1
                    and left(b.order_cd, 2) = '${args.data.BUYER_CD}'
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.PO_CD = '';
            tObj.PO_NAME = ' ';
            tRet.unshift(tObj);
            return tRet;
        },

        mgrQueryS030514_CODE: async (_, args) => {
            var tWObj = {};

            var tRet = [];
            var tObj = {};
            tObj.PO_CD = '';
            tObj.PO_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.PO_CD = tRet;

            var tRet = [];
            var tObj = {};
            tObj.BUYER_CD = '';
            tObj.BUYER_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.BUYER_CD = tRet;

            let sqlStr = `
                select
                    FACTORY_CD,
                    FACTORY_NAME
                from
                    kcd_factory
                where
                    factory_cd in ('fc034', 'fc044', 'fc010', 'fc045')
                order by
                    factory_cd desc
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.FACTORY_CD = '';
            tObj.FACTORY_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.FACTORY_CD = tRet;

            var tCodeArray = ['All', 'Main', 'Sample'];
            var tCodeArray1 = ['', '0', '1'];
            var tRet = [];
            tCodeArray.forEach((col, i) => {
                var tObj = {};
                tObj.CD_CODE = tCodeArray1[i];
                tObj.CD_NAME = tCodeArray[i];
                tRet.push(tObj);
            });
            var tObj = {};
            tObj.CD_CODE = '';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.ORDER_KIND = tRet;

            return tWObj;
        },
    },
};

export default moduleQuery_S030514_1;
