import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0307_2_1 = {
    Query: {
        mgrQueryS0307_2_1: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }

            var tRetArray = [];

            let sqlStr0 = `
                select
                    a.ORDER_CD,
                    a.STYLE_CD,
                    a1.STYLE_NAME,
                    b.PROD_CD,
                    c.COLOR,
                    d.PO_CD
                from
                    ksv_order_mst a,
                    kcd_style a1,
                    ksv_order_mem b,
                    ksv_prod_mst c,
                    ksv_po_mem d
                where
                    a.ORDER_CD = '${args.data.ORDER_CD}'
                    and a.STYLE_CD = a1.STYLE_CD
                    and a.ORDER_CD = b.ORDER_CD
                    and b.PROD_CD = c.PROD_CD
                    and a.ORDER_CD = d.ORDER_CD
                    and d.PO_SEQ = 1
            `;
            var tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr0));

            return tRet0;
        },
    },
};

export default moduleQuery_S0307_2_1;
