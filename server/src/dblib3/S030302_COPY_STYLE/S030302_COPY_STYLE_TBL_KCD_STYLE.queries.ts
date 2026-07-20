// MGR_@@TNAME@@.queries.js

import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S030302_COPY_STYLE_TBL_KCD_STYLE = {
    Query: {
        mgrQuery_S030302_COPY_STYLE_TBL_KCD_STYLE2: async (_, args) => {
            let sqlStr = `
                select distinct
                    a.ORDER_CD,
                    a.PROD_CD
                from
                    KSV_ORDER_MEM a,
                    ksv_order_mst b,
                    kcd_style c
                where
                    a.order_cd = b.order_cd
                    and b.order_type in ('0', '1')
                    and b.style_cd = c.style_cd
                    and c.style_name like '%${args.data.STYLE_NAME.replace(/\s+/g, '%')}%'
            `;

            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {};
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
        mgrQuery_S030302_COPY_STYLE_TBL_KCD_STYLE: async (_, args) => {
            var tSQL = '';
            if (args.KEY1 !== '') {
                tSQL += `and  ( a.style_name like '%${args.data.STYLE_NAME.replace(/\s+/g, '%')}%' escape '[' )  `;
                //tSQL += `or     a.style_cd like '%${args.data.STYLE_NAME}%' escape '[' ) `;
            }
            let sqlStr = `
                select
                    top 1000 a.STYLE_NAME,
                    a.STYLE_CD,
                    b.BUYER_NAME,
                    a.BUYER_CD
                from
                    kcd_style a,
                    kcd_buyer b
                where
                    a.status_cd = '0'
                    and len(a.style_cd) <= 9 
                    ${tSQL}
                    and b.buyer_cd = a.buyer_cd
                order by
                    a.style_name
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
        mgrQuery_S030302_COPY_STYLE_TBL_KCD_STYLE_SRC: async (_, args) => {
            var tSQL = '';
            if (args.KEY1 !== '') {
                tSQL += `and  a.style_name like '%${args.data.STYLE_NAME.replace(/\s+/g, '%')}%' escape '['  `;
            }
            let sqlStr = `
                select
                    *
                from
                    kcd_style
                where
                    style_cd = '${args.data.STYLE_NAME.replace(/\s+/g, '%')}'
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            let sqlStr1 = `
                select
                    *
                from
                    ksv_prod_mst
                where
                    style_cd = '${args.data.STYLE_NAME.replace(/\s+/g, '%')}'
            `;
            var tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));

            var tObj = {};
            tObj.STYLE = { ...tRet[0] };
            tObj.PROD_MST = [...tRet1];
            return tObj;
        },
    },
};

export default moduleQuery_S030302_COPY_STYLE_TBL_KCD_STYLE;
