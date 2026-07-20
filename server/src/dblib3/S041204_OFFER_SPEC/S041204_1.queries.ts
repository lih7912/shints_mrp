import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S041204_1 = {
    Query: {
        mgrQueryS041204_CODE: async (_, args) => {
            var tWObj = {};

            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_code
                where
                    cd_group = 'MATL_TYPE'
                ORDER BY
                    CD_CODE
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_NAME = ' ';
            tObj.CD_CODE = ' ';
            tRet.unshift(tObj);
            tWObj.MATL_TYPE = tRet;

            return tWObj;
        },

        mgrQueryS041204_1: async (_, args) => {
            var tRetArray = [];

            var tSql0 = `
                select
                    count(*) as cnt
                from
                    ksv_stock_out_temp_permit
                where
                    pack_cd like '${args.data.PACK_CD}%'
            `;
            var tRet0 = await prisma.$queryRaw(Prisma.raw(tSql0));
            var tPermitCnt = tRet0[0].cnt;

            var tSQL = '';
            if (args.data.MATL_TYPE === 'M') {
                tSQL = `
               and B.matl_type='M'
          `;
            } else {
                tSQL = `
               and B.matl_type <> 'M'
          `;
            }

            if (tPermitCnt > 0) {
                var sqlStr = `
                    SELECT DISTINCT
                        E.VENDOR_NAME,
                        B.MATL_NAME,
                        B.SPEC,
                        isnull(C.OFFER_SPEC, '') as OFFER_SPEC,
                        D.VENDOR_CD
                    FROM
                        KSV_STOCK_OUT A,
                        KCD_MATL_MST B
                        LEFT JOIN KCD_OFFER_SPEC C ON B.MATL_NAME = C.MATL_NAME
                        AND B.SPEC = C.SPEC
                        AND C.VENDOR_CD = B.VENDOR_CD,
                        KSV_STOCK_OUT_TEMP_PERMIT D,
                        KCD_VENDOR E
                    WHERE
                        A.MATL_CD = B.MATL_CD ${tSQL}
                        AND D.VENDOR_CD = B.VENDOR_CD
                        AND E.VENDOR_CD = B.VENDOR_CD
                        -- AND D.PERMIT = 'Y' 
                        AND D.PERMIT = 'N'
                        AND A.PACK_CD LIKE '${args.data.PACK_CD}%'
                        AND D.PACK_CD LIKE '${args.data.PACK_CD}%'
                    ORDER BY
                        1
                `;
                var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
                return tRet;
            } else {
                var sqlStr = `
                    SELECT DISTINCT
                        E.VENDOR_NAME,
                        B.MATL_NAME,
                        B.SPEC,
                        C.OFFER_SPEC,
                        E.VENDOR_CD
                    FROM
                        KSV_STOCK_OUT A,
                        KCD_MATL_MST B
                        LEFT JOIN KCD_OFFER_SPEC C ON B.MATL_NAME = C.MATL_NAME
                        AND B.SPEC = C.SPEC
                        AND C.VENDOR_CD = B.VENDOR_CD,
                        KCD_VENDOR E
                    WHERE
                        A.MATL_CD = B.MATL_CD ${tSQL}
                        AND E.VENDOR_CD = B.VENDOR_CD
                        AND A.PACK_CD LIKE '${args.data.PACK_CD}%'
                    ORDER BY
                        1
                `;
                var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
                return tRet;
            }
        },
    },
};

export default moduleQuery_S041204_1;
