// MGR_@@TNAME@@.queries.js

import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S030602_MRP_BY_ORDER_STYLE_TBL_KCD_STYLE = {
    Query: {
        mgrQuery_S030602_MRP_BY_ORDER_STYLE_TBL_KCD_STYLE: async (_, args) => {
            var tSQL = '';
            if (args.KEY1 !== '') {
                tSQL += `and  ( a.style_name like '%${args.data.STYLE_NAME}%' escape '['  `;
                tSQL += `or     a.style_cd like '%${args.data.STYLE_NAME}%' escape '[' ) `;
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
        mgrQuery_S030602_MRP_BY_ORDER_STYLE_TBL_KCD_STYLE_SRC: async (
            _,
            args,
        ) => {
            var tSQL = '';
            let sqlStr = `
                select
                    a.*
                from
                    kcd_style a,
                    ksv_order_mst b
                where
                    a.style_cd = b.style_cd
                    and b.order_cd = '${args.data.ORDER_CD}'
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            let sqlStr1 = `
                select
                    a.PROD_CD,
                    b.COLOR,
                    count(*) as cnt
                from
                    ksv_order_mrp a,
                    ksv_prod_mst b
                where
                    a.prod_cd = b.prod_cd
                    and a.order_cd = '${args.data.ORDER_CD}'
                    and a.order_mrp_seq = '${args.data.ORDER_MRP_SEQ}'
                group by
                    a.PROD_CD,
                    b.COLOR
            `;
            var tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));

            var tObj = {};
            tObj.STYLE = { ...tRet[0] };
            tObj.PROD_MST = [...tRet1];
            return tObj;
        },
    },
};

export default moduleQuery_S030602_MRP_BY_ORDER_STYLE_TBL_KCD_STYLE;
