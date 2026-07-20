import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0419_3_1 = {
    Query: {
        mgrQueryS0419_3_1: async (_, args) => {
            var tSQL = '';

            var tPO_CD = '';
            var tS_DATE = '20231001';
            var tE_DATE = '20241230';

            if (args.data.PO_CD !== '') tPO_CD = args.data.PO_CD;
            if (args.data.S_IN_DATE !== '') {
                tS_DATE = args.data.S_IN_DATE;
                tE_DATE = args.data.E_IN_DATE;
            }

            if (tS_DATE !== '') {
                // tSQL += `AND B.IN_DATETIME BETWEEN '${tS_DATE}' AND '${tE_DATE}'  `;

                tSQL += `AND A3.PAY_DATE BETWEEN '${tS_DATE}' AND '${tE_DATE}'  `;
            }

            if (args.data.CLOSE_OX === 'O') {
                tSQL += `AND A3.END_FLAG === '1' `;
            } else if (args.data.CLOSE_OX === 'X') {
                tSQL += `AND (A3.END_FLAG <> '1' OR A3.END_FLAG is null) `;
            } else if (args.data.CLOSE_OX === 'All') {
            } else {
                tSQL += `AND (A3.END_FLAG <> '1' OR A3.END_FLAG is null) `;
            }

            if (args.data.CURR_CD !== '') {
                tSQL += `AND A.CURR_CD = '${args.data.CURR_CD}' `;
            }

            let sqlStr = `
                SELECT
                    A.PU_CD,
                    A.BUYER_CD,
                    A.PO_CD2 AS PO_CD,
                    A.VENDOR_CD,
                    A1.VENDOR_NAME,
                    A1.VENDOR_TYPE,
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
                    A.TRADE_TERM,
                    A3.STSIN_CD,
                    A3.PAYER,
                    A3.END_FLAG,
                    A3.END_DATE,
                    A3.BILL_FLAG,
                    A3.BILL_DATE,
                    A3.CALC_FLAG,
                    A3.IN_QTY,
                    A3.IN_PRICE,
                    A3.IN_CURR_CD,
                    A3.IN_AMT,
                    A3.PUR_FACTORY,
                    A3.BILL_CD,
                    A4.CD_NAME AS VENDOR_TYPE_NAME,
                    A3.IN_DATETIME,
                    (A3.IN_AMT * (A.DEPOSIT_AMT / A.PU_AMT)) as DEPOSIT_AMT,
                    (A3.IN_AMT * (A.LC_AMT / A.PU_AMT)) as LC_AMT,
                    -- (A3.IN_AMT - (A3.IN_AMT * (A.DEPOSIT_AMT /  A.PU_AMT)) - (A3.IN_AMT * (A.LC_AMT / A.PU_AMT))) as PAY_AMT, 
                    A3.IN_AMT as PAY_AMT,
                    A.LC_FLAG,
                    '1' as TT_FLAG,
                    A3.TAX_KIND,
                    A5.BUYER_NAME
                FROM
                    KSV_PU_MST2 A,
                    KCD_VENDOR A1,
                    (
                        SELECT
                            PU_CD,
                            sum(PO_QTY2) as S_PO_QTY,
                            sum(IN_QTY) as S_IN_QTY,
                            sum(OUT_QTY) as S_OUT_QTY,
                            sum(PO_QTY2 * PO_PRICE) as S_AMT
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
                    ) A2,
                    ksv_stock_in_mst A3,
                    kcd_code A4,
                    kcd_buyer A5
                WHERE
                    A.VENDOR_CD = A1.VENDOR_CD
                    AND A.PU_TYPE = '1'
                    AND A.PU_CD = A2.PU_CD
                    and A.BUYER_CD like '%${args.data.BUYER_CD}%'
                    and A.PO_CD2 like '%${args.data.PO_CD}%'
                    and A.PU_CD = A3.PU_CD
                    and A3.PAYER = '0'
                    and A4.CD_CODE = A1.VENDOR_TYPE
                    and A4.CD_GROUP = 'VENDOR_TYPE'
                    and A.BUYER_CD = A5.BUYER_CD
                    and A.PU_AMT > 0 ${tSQL}
                    -- AND     A2.S_IN_QTY > A2.S_OUT_QTY
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetArray = [];
            tRet.forEach((col, i) => {
                var tObj = { ...col };
                if (tObj.LC_FLAG === '1') tObj.TT_FLAG = '0';
                else tObj.TT_FLAG = '1';
                tRetArray.push(tObj);
            });
            var tIdx = 0;
            return tRetArray;
        },
    },
};

export default moduleQuery_S0419_3_1;
