// MGR_@@TNAME@@.queries.js

import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S030602_MRP_BY_ORDER_STYLE_TBL_KSV_PROD_MST = {
    Query: {
        mgrQuery_S030602_MRP_BY_ORDER_STYLE_TBL_KSV_PROD_MST: async (
            _,
            args,
        ) => {
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
        mgrQuery_S030602_SEARCH_ORDER_MRP: async (_, args) => {
            var tSQL = '';

            let sqlStr = `
                select distinct
                    a.ORDER_CD,
                    a.PROD_CD
                from
                    KSV_ORDER_MEM a,
                    ksv_order_mst b
                where
                    a.prod_cd = '${args.data.PROD_CD}'
                    and a.order_cd = b.order_cd
                    and b.order_type in ('0', '1')
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S030602_MRP_BY_ORDER_STYLE_TBL_KSV_PROD_MST;
