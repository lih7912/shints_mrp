import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0431_3_1 = {
    Query: {
        mgrQueryS0431_3_1: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }
            let sqlStr = `
                SELECT
                    A.PU_CD,
                    A2.STSIN_CD,
                    A.BUYER_CD,
                    A.PO_CD2 AS PO_CD,
                    A.VENDOR_CD,
                    A1.VENDOR_NAME,
                    A.MATL_TYPE,
                    A.CURR_CD,
                    A.PU_AMT as S_AMT,
                    A2.IN_QTY as S_PO_QTY,
                    A2.IN_QTY as S_IN_QTY,
                    A2.OUT_QTY as S_OUT_QTY,
                    A.PAY_TYPE,
                    A.EXP_DELIVERY_DATE,
                    A.PAY_DATE,
                    A.TARGET_ETA,
                    A.FACTORY_CD,
                    A.TRADE_TERM,
                    A1.VENDOR_TYPE,
                    A3.CD_NAME as VENDOR_TYPE_N,
                    isnull(b1.NAT_NAME, '') as NAT_NAME,
                    isnull(A.ORIGIN_PORT, '') as ORIGIN_PORT,
                    A2.STSIN_CD
                FROM
                    KSV_PU_MST2 A,
                    KSV_STOCK_IN_MST A2,
                    KCD_CODE A3,
                    KCD_VENDOR A1
                    left join kcd_nation b1 on b1.nat_cd = A1.NAT_CD
                WHERE
                    A.VENDOR_CD = A1.VENDOR_CD
                    AND A.PU_TYPE = '1'
                    AND A.PU_CD = A2.PU_CD
                    AND A2.IN_QTY > 0
                    AND A2.IN_QTY > A2.OUT_QTY
                    AND A1.VENDOR_TYPE = A3.CD_CODE
                    AND A3.CD_GROUP = 'VENDOR_TYPE'
                    AND A.PO_CD2 like '%${args.data.PO_CD}%'
                    AND A.BUYER_CD like '%${args.data.BUYER_CD}%'
                    AND A.VENDOR_CD like '%${args.data.VENDOR_CD}%'
                    -- AND     A.PAYER in ('0', '3')
                    AND A.PAYER in ('SHINTS', 'BUYER')
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S0431_3_1;
