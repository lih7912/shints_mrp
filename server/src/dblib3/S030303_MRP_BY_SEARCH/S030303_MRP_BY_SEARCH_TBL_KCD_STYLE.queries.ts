// MGR_@@TNAME@@.queries.js

import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S030303_MRP_BY_SEARCH_TBL_KCD_STYLE = {
    Query: {
        mgrQuery_S030303_MRP_BY_SEARCH_TBL_KCD_STYLE: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_NAME !== '') {
                tSQL += `and  b.style_name like '%${args.data.STYLE_NAME}%' escape '['  `;
            }
            let sqlStr = `
                select
                    top 1000 b.STYLE_NAME,
                    b.STYLE_CD
                from
                    kcd_style b
                where
                    YY >= 2022 ${tSQL}
                    and a.style_cd = b.style_cd
                    and a.order_type in ('0', '1')
                    and a.YY >= 2022
                order by
                    a.order_cd
                    -- offset 0 rows fetch next 1000 rows only
            `;

            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                STYLE_NAME: '',
                STYLE_CD: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
        mgrQuery_S030303_MRP_BY_SEARCH_TBL_KCD_STYLE_SRC: async (_, args) => {
            var tSQL = '';
            if (args.KEY1 !== '') {
                tSQL += `and  a.style_name like '%${args.data.STYLE_NAME}%' escape '['  `;
            }
            let sqlStr = `
                select
                    *
                from
                    kcd_style
                where
                    style_cd = '${args.data.STYLE_NAME}'
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            let sqlStr1 = `
                select
                    *
                from
                    ksv_prod_mst
                where
                    style_cd = '${args.data.STYLE_NAME}'
            `;
            var tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));

            var tObj = {};
            tObj.STYLE = { ...tRet[0] };
            tObj.PROD_MST = [...tRet1];
            return tObj;
        },
    },
};

export default moduleQuery_S030303_MRP_BY_SEARCH_TBL_KCD_STYLE;
