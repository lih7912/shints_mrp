// MGR_@@TNAME@@.queries.js

import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S030303_MRP_BY_SEARCH_TBL_KSV_PROD_MST = {
    Query: {
        mgrQuery_S030303_MRP_BY_SEARCH_TBL_KSV_PROD_MST: async (_, args) => {
            var tSQL = '';
            if (args.KEY1 !== '') {
                tSQL += `AND KEY1 = '${args.KEY1}' `;
            }
            let sqlStr = `
                SELECT
                    B.CD_NAME AS PROD_TYPE_NAME,
                    A.COLOR,
                    A.COLLECTION,
                    A.PROD_UNIT,
                    A.PROD_CD,
                    A.PROD_TYPE
                FROM
                    (
                        SELECT
                            *
                        FROM
                            KSV_PROD_MST
                        WHERE
                            STYLE_CD = '${args.data.STYLE_CD}'
                    ) A
                    left join KCD_CODE B ON A.PROD_TYPE = B.CD_CODE
                WHERE
                    B.CD_GROUP = 'PROD_TYPE'
                order by
                    A.COLOR
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
        mgrQuery_S030303_KSV_ORDER_MST: async (_, args) => {
            var tSQL = '';
            if (args.KEY1 !== '') {
                tSQL += `AND KEY1 = '${args.KEY1}' `;
            }
            let sqlStr = `
                select
                    a.ORDER_CD,
                    b.STYLE_NAME
                from
                    ksv_order_mst a,
                    kcd_style b
                where
                    a.style_cd in ('${args.data.STYLE_CD}')
                    -- and b.buyer_cd='' 
                    and a.style_cd = b.style_cd
                    and a.order_type in ('0', '1')
                order by
                    1
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S030303_MRP_BY_SEARCH_TBL_KSV_PROD_MST;
