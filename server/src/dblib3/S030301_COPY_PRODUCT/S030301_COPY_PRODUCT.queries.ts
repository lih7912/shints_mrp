// MGR_@@TNAME@@.queries.js

import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S030301_COPY_PRODUCT_TBL_KCD_STYLE = {
    Query: {
        mgrQuery_S030301_QRY_STYLE: async (_, args) => {
            var tSQL = '';

            let sqlStr = `
                select
                    a.STYLE_NAME,
                    a.STYLE_CD,
                    b.BUYER_NAME,
                    a.BUYER_CD
                from
                    kcd_style a,
                    kcd_buyer b
                where
                    a.status_cd = '0'
                    and len(a.style_cd) <= 9
                    and b.buyer_cd = a.buyer_cd
                    and (
                        a.style_name like '%${args.data.STYLE_CD}%'
                        or a.style_cd like '%${args.data.STYLE_CD}%'
                    )
                order by
                    a.style_name
            `;

            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {};
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },

        mgrQuery_S030301_QRY_PROD: async (_, args) => {
            var tSQL = '';

            let sqlStr1 = `
                select
                    *
                from
                    ksv_prod_mst
                where
                    style_cd = '${args.data.STYLE_CD}'
            `;
            var tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));

            return tRet1;
        },
    },
};

export default moduleQuery_S030301_COPY_PRODUCT_TBL_KCD_STYLE;
