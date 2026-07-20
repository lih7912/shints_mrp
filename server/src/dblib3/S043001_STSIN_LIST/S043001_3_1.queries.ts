import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S043001_3_1 = {
    Query: {
        mgrQueryS043001_3_1: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }
            let sqlStr = `
                SELECT
                    A.PU_CD,
                    A.BUYER_CD,
                    A.PO_CD2 AS PO_CD,
                    A.VENDOR_CD,
                    A1.VENDOR_NAME,
                    A.MATL_TYPE,
                    A.CURR_CD,
                    A.PU_AMT as S_AMT,
                    A3.S_PO_QTY as S_PO_QTY,
                    A2.IN_QTY AS S_IN_QTY,
                    A2.OUT_QTY AS S_OUT_QTY,
                    A.PAY_TYPE,
                    A.EXP_DELIVERY_DATE,
                    A.PAY_DATE,
                    A.TARGET_ETA,
                    A.FACTORY_CD,
                    A.TRADE_TERM,
                    A2.STSIN_CD,
                    A2.PAYER,
                    A2.END_FLAG,
                    A2.END_DATE,
                    A2.BILL_FLAG,
                    A2.BILL_DATE,
                    A2.CALC_FLAG,
                    A2.IN_QTY,
                    A2.IN_PRICE,
                    A2.IN_CURR_CD,
                    A2.IN_AMT,
                    '0' as S_IN_QTY1,
                    isnull(A2.STSIN_AMT, 0) as STSIN_AMT,
                    isnull(A2.SURCHARGE_AMT, 0) as SURCHARGE_AMT,
                    isnull(A2.MOQ_AMT, 0) as MOQ_AMT,
                    isnull(A2.OVERSHORT, 0) as OVERSHORT
                FROM
                    KSV_PU_MST2 A,
                    KCD_VENDOR A1,
                    KSV_STOCK_IN_MST A2,
                    (
                        select
                            PU_CD,
                            sum(PO_QTY2) as S_PO_QTY
                        from
                            ksv_stock_mem2
                        group by
                            PU_CD
                    ) A3
                WHERE
                    A.VENDOR_CD = A1.VENDOR_CD
                    AND A.PU_TYPE = '1'
                    AND A.PU_CD = A2.PU_CD
                    AND A.PU_CD = A3.PU_CD
                    and A.BUYER_CD like '%${args.data.BUYER_CD}%'
                    and A.PO_CD2 like '%${args.data.PO_CD}%'
                    -- AND     A2.IN_QTY > A2.S_OUT_QTY
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S043001_3_1;
