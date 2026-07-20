import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0423_3 = {
    Query: {
        mgrQueryS0423_3: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }
            let sqlStr = `
                SELECT
                    A.PO_CD,
                    LEFT(A.ORDER_CD, 2) AS BUYER_CD,
                    B.MATL_CD,
                    E.MATL_NAME,
                    E.COLOR,
                    E.SPEC,
                    B.TOT_QTY,
                    B.IN_QTY,
                    B.IN_CURR_CD,
                    B.IN_PRICE,
                    B.PAY_CURR_CD,
                    B.PAY_PRICE,
                    B.TT_FLAG,
                    (B.IN_QTY * B.PAY_PRICE) AS PAY_AMT,
                    B.END_FLAG,
                    B.END_DATE,
                    B.PAY_DATE,
                    B.BILL_FLAG,
                    B.BILL_DATE,
                    D.VENDOR_NAME,
                    A.PO_SEQ,
                    A.ORDER_CD,
                    A.MRP_SEQ,
                    B.IN_DATETIME,
                    B.MATL_SEQ
                FROM
                    KSV_STOCK_MEM A,
                    KSV_STOCK_IN B,
                    KCD_VENDOR D,
                    KCD_MATL_MST E,
                    KCD_MATL_MEM F
                WHERE
                    B.END_DATE = '${args.data.END_DATE}'
                    -- AND B.STSIN_CD = '${args.data.STSIN_CD}'
                    AND B.STSIN_CD in (
                        select distinct
                            stsin_cd
                        from
                            ksv_stock_in_mst
                        where
                            bill_cd = '${args.data.BILL_CD}'
                    )
                    AND B.PO_CD = A.PO_CD
                    AND B.PO_SEQ = A.PO_SEQ
                    AND B.ORDER_CD = A.ORDER_CD
                    AND B.MATL_CD = A.MATL_CD
                    AND B.MRP_SEQ = A.MRP_SEQ
                    AND D.VENDOR_CD = E.VENDOR_CD
                    -- AND B.CALC_FLAG IN('0' , '1')
                    -- AND B.TT_FLAG IN ('0' ,'1')
                    -- AND B.PAY_DATE = '${args.data.PAY_DATE}' 
                    -- AND B.PUR_APP = '${args.data.PUR_APP}' 
                    AND E.VENDOR_CD LIKE '${args.data.VENDOR_CD}%'
                    -- AND B.PAY_REPORT='${args.data.PAY_REPORT}' 
                    AND E.MATL_CD = B.MATL_CD
                    AND F.MATL_CD = A.MATL_CD
                    AND F.MATL_SEQ = A.MATL_SEQ
                ORDER BY
                    1
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                PO_CD: '',
                BUYER_CD: '',
                MATL_CD: '',
                MATL_NAME: '',
                COLOR: '',
                SPEC: '',
                TOT_QTY: 0,
                IN_QTY: 0,
                IN_CURR_CD: '',
                IN_PRICE: 0,
                PAY_CURR_CD: '',
                PAY_PRICE: 0,
                TT_FLAG: '',
                PAY_AMT: 0,
                END_FLAG: '',
                END_DATE: '',
                PAY_DATE: '',
                BILL_FLAG: '',
                BILL_DATE: '',
                VENDOR_NAME: '',
                PO_SEQ: 0,
                ORDER_CD: '',
                MRP_SEQ: 0,
                IN_DATETIME: '',
                MATL_SEQ: 0,
                ETC99: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S0423_3;
