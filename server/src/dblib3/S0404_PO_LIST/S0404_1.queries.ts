import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0404_1 = {
    Query: {
        mgrQueryS0404_CODE: async (_, args) => {
            var tWObj = {};

            let sqlStr = `
                select
                    *
                from
                    kcd_factory
                where
                    factory_cd in ('FC044', 'FC034', 'FC087')
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.FACTORY_CD = 'all';
            tObj.FACTORY_NAME = 'all';
            tRet.unshift(tObj);
            tWObj.FACTORY_CD = tRet;

            let sqlStr = `
                SELECT
                    COM_NAME,
                    COM_CD
                FROM
                    KVW_COMPANY
                where
                    com_cd not in ('V0228', 'SB', 'EP', 'V1652')
                order by
                    COM_CD
                    -- offset 0 rows fetch next 500 rows only
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.COM_NAME = ' ';
            tObj.COM_CD = ' ';
            tRet.unshift(tObj);
            tWObj.BUYER_CD = tRet;

            let sqlStr = `
                SELECT DISTINCT
                    A.PO_CD,
                    '' as PO_STATUS
                FROM
                    KSV_PO_MST A
                    INNER JOIN KCD_CODE B ON A.PO_STATUS = B.CD_CODE
                WHERE
                    B.CD_GROUP = 'PO_STATUS'
                    AND PO_STATUS <> '0'
                ORDER BY
                    A.PO_CD
                    -- offset 0 rows fetch next 500 rows only
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.PO_CD = ' ';
            tObj.PO_STATUS = ' ';
            tRet.unshift(tObj);
            tWObj.PO_CD = tRet;

            return tWObj;
        },

        mgrQueryS0404_1: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }
            let sqlStr = `
                SELECT
                    A.REG_USER,
                    C.VENDOR_NAME,
                    A.PR_NUM,
                    A.MATL_CD,
                    B.COLOR,
                    B.MATL_NAME,
                    B.SPEC,
                    B.UNIT,
                    A.TOT_CNT,
                    A.STOCK_QTY,
                    CAST(A.TOT_CNT AS FLOAT) - A.STOCK_QTY as COL1,
                    A.REMARK
                FROM
                    KSV_PO_MATLLIST A,
                    KCD_MATL_MST B,
                    KCD_VENDOR C
                WHERE
                    A.VENDOR_CD = C.VENDOR_CD
                    AND A.MATL_CD = B.MATL_CD
                    AND (PO_CD = '${args.data.PO_CD}')
                ORDER BY
                    C.VENDOR_NAME,
                    LEN(A.PR_NUM),
                    A.PR_NUM,
                    B.MATL_NAME,
                    B.SPEC
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            return tRet;
        },
    },
};

export default moduleQuery_S0404_1;
