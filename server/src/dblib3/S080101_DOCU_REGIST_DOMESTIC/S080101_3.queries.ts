import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S080101_3 = {
    Query: {
        mgrQueryS080101_3: async (_, args) => {
            var tSQL = '';

            var tWObj = {};

            let sqlStr = `
                select
                    *
                from
                    ksv_tax_mst
                where
                    tax_cd = '${args.data.TAX_CD}'
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWObj.TAX_MST = [...tRet];

            let sqlStr1 = `
                select
                    a.*,
                    b.PO_CD,
                    c.STYLE_NAME
                from
                    ksv_tax_mem  a
                    left join KSV_PO_MEM b on b.ORDER_CD = a.ORDER_CD and b.PO_SEQ = 1
                    left join KSV_ORDER_MST d on d.order_cd = a.order_cd
                    left join KCD_STYLE c on c.style_cd = d.style_cd
                where 1 = 1
                and   a.tax_cd = '${args.data.TAX_CD}'
            `;
            var tRet1_0 = await prisma.$queryRaw(Prisma.raw(sqlStr1));
            var tRet1 = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet1_0.length; tIdx++) {
                var tOne = { ...tRet1_0[tIdx] };

                let sqlStr2 = `
                    select
                        isnull(sum(pay_qty), 0) as pay_qty
                    from
                        ksv_tax_mem
                    where
                        invoice_no = '${tOne.INVOICE_NO}'
                        and order_cd = '${tOne.ORDER_CD}'
                `;
                var tRet2 = await prisma.$queryRaw(Prisma.raw(sqlStr2));
                var tPayedQty = 0;
                if (tRet2.length > 0) tPayedQty = parseFloat(tRet2[0].pay_qty);

                tOne.BAL_QTY = parseFloat(tOne.TOT_QTY) - tPayedQty;
                tRet1.push(tOne);
            }

            tWObj.TAX_MEM = [...tRet1];

            return tWObj;
        },

        mgrQueryS080101_3_bak: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }
            let sqlStr = `
                SELECT
                    A.INVOICE_NO,
                    A.ORDER_CD,
                    A.PROD_CD,
                    C.COLOR,
                    B.PRICE,
                    B.TOT_CNT,
                    A.SHIP_CNT,
                    B.SIZE_CNT as ORDER_SIZE_CNT,
                    A.SIZE_CNT as SHIP_SIZE_CNT,
                    E.SIZE_GROUP,
                    E.SIZE_MEMBER
                FROM
                    KSV_ORDER_SHIP A,
                    KSV_ORDER_MEM B,
                    KSV_PROD_MST C,
                    KSV_ORDER_MST D,
                    KCD_SIZE_MST E
                WHERE
                    A.INVOICE_NO = '${args.data.INVOICE_NO}'
                    AND LEFT(A.ORDER_CD, 2) = '${args.data.BUYER_CD}'
                    AND A.SHIP_DATE = '${args.data.SHIP_DATE}'
                    AND A.NAT_CD = '${args.data.NAT_CD}'
                    AND A.SHIP_PTYPE = '${args.data.SHIP_MODE}'
                    AND A.ORDER_CD = B.ORDER_CD
                    AND A.PROD_CD = B.PROD_CD
                    AND B.ADD_FLAG = '0'
                    AND B.PROD_CD = C.PROD_CD
                    AND A.ORDER_CD = D.ORDER_CD
                    AND D.SIZE_GROUP = E.SIZE_GROUP
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                INVOICE_NO: '',
                ORDER_CD: '',
                PROD_CD: '',
                COLOR: '',
                PRICE: 0,
                TOT_CNT: 0,
                SHIP_CNT: 0,
                ORDER_SIZE_CNT: '',
                SHIP_SIZE_CNT: '',
                ETC99: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S080101_3;
