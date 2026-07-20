import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S051901_3_1 = {
    Query: {
        mgrQueryS051901_3_1: async (_, args) => {
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
                    A2.S_AMT,
                    A2.S_PO_QTY,
                    A2.S_IN_QTY,
                    A2.S_OUT_QTY,
                    A.PAY_TYPE,
                    A.EXP_DELIVERY_DATE,
                    A.PAY_DATE,
                    A.TARGET_ETA,
                    A.FACTORY_CD,
                    A.TRADE_TERM
                FROM
                    KSV_PU_MST2 A,
                    KCD_VENDOR A1,
                    (
                        SELECT
                            PU_CD,
                            sum(PO_QTY2) as S_PO_QTY,
                            sum(IN_QTY) as S_IN_QTY,
                            sum(OUT_QTY) as S_OUT_QTY,
                            sum(PO_QTY * PO_PRICE) as S_AMT
                        FROM
                            KSV_STOCK_MEM2
                        where
                            (
                                PU_CD is not null
                                and PU_CD <> ''
                            )
                        group by
                            PU_CD
                        having
                            sum(IN_QTY) > 0
                            and sum(IN_QTY) > sum(OUT_QTY)
                    ) A2
                WHERE
                    A.VENDOR_CD = A1.VENDOR_CD
                    AND A.PU_TYPE = '1'
                    AND A.PU_CD = A2.PU_CD
                    AND A2.S_IN_QTY > A2.S_OUT_QTY
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S051901_3_1;
