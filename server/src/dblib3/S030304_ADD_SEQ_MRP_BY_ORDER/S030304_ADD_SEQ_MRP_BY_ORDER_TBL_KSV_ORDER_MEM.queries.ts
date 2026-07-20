// MGR_@@TNAME@@.queries.js

import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S030304_ADD_SEQ_MRP_BY_ORDER_TBL_KSV_ORDER_MEM = {
    Query: {
        mgrQuery_S030304_ADD_SEQ_MRP_BY_ORDER_TBL_KSV_ORDER_MEM: async (
            _,
            args,
        ) => {
            var tSQL = '';
            if (args.KEY1 !== '') {
                tSQL += `AND KEY1 = '${args.KEY1}' `;
            }
            /*
       let sqlStr = `
           select distinct
               b.PO_CD,
               '${args.data.PROD_CD}' as PROD_CD,
               a.ORDER_CD
           from
               ksv_order_mem a,
               ksv_po_mem b,
               ksv_po_mst c
           where
               a.prod_cd = '${args.data.PROD_CD}'
               and b.order_cd = a.order_cd
               and b.po_seq = 1
               and c.po_cd = b.po_cd
               -- and c.po_status in ('2','3','4')
               and c.po_status in ('0', '2', '3', '4')
               and c.po_seq = b.po_seq
           order by
               1,
               2
       `;
*/
            let sqlStr = `
                select distinct
                    b.PO_CD,
                    d.PROD_CD,
                    a.ORDER_CD
                from
                    ksv_order_mem a,
                    ksv_po_mem b,
                    ksv_po_mst c,
                    ksv_prod_mst d
                where
                    d.style_cd = '${args.data.STYLE_CD}'
                    and d.prod_cd = a.prod_cd
                    and a.order_cd = b.order_cd
                    and b.po_cd = c.po_cd
                    and b.po_seq = 1
                    and c.po_status in ('0', '2', '3', '4')
                    and c.po_seq = b.po_seq
                order by
                    1,
                    2
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {};
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S030304_ADD_SEQ_MRP_BY_ORDER_TBL_KSV_ORDER_MEM;
