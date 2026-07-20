import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0516_1 = {
    Query: {
        mgrQueryS0516_CODE: async (_, args) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);

            var tWObj = {};

            let sqlStr = `
                SELECT
                    WARE_NAME,
                    FACTORY_CD
                FROM
                    KCD_FACTORY_WARE
                WHERE
                    FACTORY_CD = WARE_CD
                    AND STATUS_CD = '0'
                ORDER BY
                    FACTORY_CD
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.FACTORY_CD = ' ';
            tObj.WARE_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.FACTORY_WARE = tRet;

            if (args.data.PO_CD !== '') {
                let sqlStr = `
                    SELECT distinct
                        a.use_po_cd as PO_CD
                    FROM
                        ksv_stock_use a,
                        ksv_po_mst b
                    where
                        a.use_po_cd = b.po_cd
                        and a.use_po_cd like '%${args.data.PO_CD.trim()}%'
                    order by
                        a.use_po_cd desc
                        -- offset 0 rows fetch next 500 rows only
                `;
                let tRet9 = await prisma.$queryRaw(Prisma.raw(sqlStr));
                let tRet = [];
                tRet9.forEach((col, i) => {
                    var tObj = { ...col };
                    if (i < 500) tRet.push(tObj);
                });
                var tObj = {};
                tObj.PO_CD = ' ';
                tRet.unshift(tObj);
                tWObj.PO_CD = tRet;
            } else {
                var tRangeMonth = AFLib.getRangeMonth(tRetDate1, 1);
                let sqlStr = `
                    SELECT distinct
                        a.use_po_cd as PO_CD
                    FROM
                        ksv_stock_use a,
                        ksv_po_mst b
                    where
                        a.use_po_cd = b.po_cd
                        and left(b.reg_datetime, 8) between '${tRangeMonth.s_date}' and '${tRangeMonth.e_date}'
                    order by
                        a.use_po_cd desc
                        -- offset 0 rows fetch next 500 rows only
                `;
                let tRet9 = await prisma.$queryRaw(Prisma.raw(sqlStr));
                let tRet = [];
                tRet9.forEach((col, i) => {
                    var tObj = { ...col };
                    if (i < 1000) tRet.push(tObj);
                });
                var tObj = {};
                tObj.PO_CD = ' ';
                tRet.unshift(tObj);
                tWObj.PO_CD = tRet;
            }

            var tRet = [];
            var tObj = {};
            tObj.PO_CD = ' ';
            tRet.unshift(tObj);
            tWObj.PO_SEQ = [];

            let sqlStr = `
                SELECT
                    VENDOR_NAME,
                    VENDOR_CD
                FROM
                    KCD_VENDOR
                where
                    status_cd = '0'
                ORDER BY
                    VENDOR_NAME
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.VENDOR_CD = ' ';
            tObj.VENDOR_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.VENDOR_CD = tRet;

            let sqlStr = `
                SELECT
                    CD_CODE,
                    CD_NAME
                FROM
                    KCD_CODE
                where
                    CD_GROUP = 'STOCK_CONDITION'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_NAME = ' ';
            tObj.CD_CODE = ' ';
            tRet.unshift(tObj);
            tWObj.CONDITION = tRet;

            return tWObj;
        },
        mgrQueryS0516_CODE_PO_SEQ: async (_, args) => {
            var tWObj = {};

            if (args.data.PO_CD !== '') {
                let sqlStr = `
                    SELECT
                        PO_SEQ
                    FROM
                        KSV_PO_MST
                    WHERE
                        PO_CD like '%${args.data.PO_CD}%'
                `;
                let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
                var tObj = {};
                tObj.PO_SEQ = 'All';
                tRet.unshift(tObj);
                tWObj.PO_SEQ = tRet;

                tWObj.FACTORY_WARE = [];
                tWObj.PO_CD = [];
                tWObj.VENDOR_CD = [];

                return tWObj;
            } else {
                tWObj.FACTORY_WARE = [];
                tWObj.PO_CD = [];
                tWObj.VENDOR_CD = [];
                tWObj.PO_SEQ = [];
            }

            return tWObj;
        },
    },
};

export default moduleQuery_S0516_1;
