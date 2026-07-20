import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0530_3 = {
    Query: {
        mgrQueryS0530_3: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }

            let sqlStr0 = `
                select
                    isnull(count(*), 00) as t_cnt
                from
                    ksv_order_ship
                where
                    order_cd = '${args.data.ORDER_CD}'
            `;
            var tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr0));

            var sqlStr = '';

            if (tRet0[0].t_cnt <= 0) {
                sqlStr = `
                    SELECT
                        isnull(A.INVOICE_NO, '') as INVOICE_NO,
                        D.ORDER_CD,
                        B.PROD_CD,
                        C.COLOR,
                        B.PRICE,
                        B.TOT_CNT,
                        isnull(A.SHIP_CNT, '') as SHIP_CNT,
                        B.SIZE_CNT as ORDER_SIZE_CNT,
                        isnull(A.SIZE_CNT, '') as SHIP_SIZE_CNT,
                        E.SIZE_GROUP,
                        E.SIZE_MEMBER
                    FROM
                        KSV_ORDER_MST D
                        left join KSV_ORDER_SHIP A ON D.ORDER_CD = A.ORDER_CD
                        AND A.ORDER_CD = '${args.data.ORDER_CD}'
                        AND A.INVOICE_NO = '${args.data.INVOICE_NO}'
                        AND A.SHIP_DATE = '${args.data.SHIP_DATE}'
                        AND A.NAT_CD = '${args.data.NAT_CD}'
                        AND A.SHIP_PTYPE = '${args.data.SHIP_MODE}',
                        KSV_ORDER_MEM B,
                        KSV_PROD_MST C,
                        KCD_SIZE_MST E
                    where
                        LEFT(D.ORDER_CD, 2) = '${args.data.BUYER_CD}'
                        and D.ORDER_CD = '${args.data.ORDER_CD}'
                        AND D.ORDER_CD = B.ORDER_CD
                        AND B.ADD_FLAG = '0'
                        AND B.PROD_CD = C.PROD_CD
                        AND D.SIZE_GROUP = E.SIZE_GROUP
                `;
            }

            if (tRet0[0].t_cnt > 0) {
                sqlStr = `
                    SELECT
                        isnull(A.INVOICE_NO, '') as INVOICE_NO,
                        D.ORDER_CD,
                        A.PROD_CD,
                        C.COLOR,
                        B.PRICE,
                        D.TOT_CNT,
                        isnull(A.SHIP_CNT, '') as SHIP_CNT,
                        B.SIZE_CNT as ORDER_SIZE_CNT,
                        isnull(A.SIZE_CNT, '') as SHIP_SIZE_CNT,
                        E.SIZE_GROUP,
                        E.SIZE_MEMBER
                    FROM
                        KSV_ORDER_MST D,
                        KSV_ORDER_SHIP A,
                        KSV_ORDER_MEM B,
                        KSV_PROD_MST C,
                        KCD_SIZE_MST E
                    where
                        LEFT(D.ORDER_CD, 2) = '${args.data.BUYER_CD}'
                        and D.ORDER_CD = A.ORDER_CD
                        AND D.ORDER_CD = B.ORDER_CD
                        AND B.ORDER_CD = A.ORDER_CD
                        AND B.PROD_CD = A.PROD_CD
                        AND A.ORDER_CD = '${args.data.ORDER_CD}'
                        AND A.INVOICE_NO = '${args.data.INVOICE_NO}'
                        AND A.SHIP_DATE = '${args.data.SHIP_DATE}'
                        AND A.NAT_CD = '${args.data.NAT_CD}'
                        AND A.SHIP_PTYPE = '${args.data.SHIP_MODE}'
                        and D.ORDER_CD = '${args.data.ORDER_CD}'
                        AND B.ADD_FLAG = '0'
                        AND B.PROD_CD = C.PROD_CD
                        AND D.SIZE_GROUP = E.SIZE_GROUP
                `;
            }

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

export default moduleQuery_S0530_3;
