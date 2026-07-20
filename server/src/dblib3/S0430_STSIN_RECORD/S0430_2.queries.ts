import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0430_2 = {
    Query: {
        mgrQueryS0430_2: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }
            let sqlStr = `
                (
                    SELECT
                        A.PU_STATUS,
                        A.PU_CD,
                        A.BUYER_CD,
                        A.PO_CD2 AS PO_CD,
                        A.VENDOR_CD,
                        A1.VENDOR_NAME,
                        A.MATL_TYPE,
                        0.0 as S_PO_QTY,
                        0.0 as S_IN_QTY,
                        A.NORMI,
                        A.ORDER_DATE,
                        A.TRADE_TERM AS PAY_TERM,
                        A.DELIVERY_DATE AS EXP_DELIVERY_DATE,
                        A.DELIVERY_DATE AS CONTRACT_DELIVERY_DATE,
                        A.TARGET_ETA,
                        A.PI_NO,
                        A.PI_FILE,
                        '' AS STSIN_STATUS,
                        '' AS STSOUT_STATUS,
                        '' AS SHIPMENT_STATUS,
                        '' AS ORIGIN_POART,
                        A.SHIP_MODE,
                        A.CURR_CD,
                        0 AS AMOT_USD,
                        A.DEPOSIT_AMT,
                        '' AS PAY_TYPE,
                        '' AS PAY_DATE,
                        '' AS GW
                    FROM
                        KSV_PU_MST2 A,
                        KCD_VENDOR A1
                    WHERE
                        A.VENDOR_CD = A1.VENDOR_CD
                        AND A.PU_TYPE = '1'
                )
                UNION
                (
                    SELECT
                        '' AS PU_STATUS,
                        '' AS PU_CD,
                        P.BUYER_CD,
                        P.PO_CD,
                        P.VENDOR_CD,
                        P2.VENDOR_NAME,
                        P.MATL_TYPE,
                        P.S_PO_QTY,
                        P.S_IN_QTY,
                        '' AS NORMI,
                        '' AS ORDER_DATE,
                        '' AS PAY_TERM,
                        '' AS EXP_DELIVERY_DATE,
                        '' AS CONTRACT_DELIVERY_DATE,
                        P.PLAN_ETA AS TARGET_ETA,
                        '' AS PI_NO,
                        '' AS PI_FILE,
                        '' AS STSIN_STATUS,
                        '' AS STSOUT_STATUS,
                        '' AS SHIPMENT_STATUS,
                        '' AS ORIGIN_POART,
                        '' AS SHIP_MODE,
                        '' AS CURR_CD,
                        0.0 AS AMOT_USD,
                        0.0 AS DEPOSIT_AMT,
                        '' AS PAY_TYPE,
                        '' AS PAY_DATE,
                        '' AS GW
                    FROM
                        (
                            SELECT
                                K.BUYER_CD,
                                K.VENDOR_CD,
                                K.MATL_TYPE,
                                K.PO_CD,
                                K.S_PO_QTY,
                                K.S_IN_QTY,
                                K1.FACTORY_CD,
                                K1.MATL_DUE_DATE,
                                K1.PROD_DUE_DATE,
                                K1.PLAN_FLAG,
                                K1.PLAN_ETD,
                                K1.PLAN_ETA
                            FROM
                                (
                                    SELECT
                                        LEFT(A.ORDER_CD, 2) AS BUYER_CD,
                                        B.VENDOR_CD,
                                        A.PO_CD,
                                        B.MATL_TYPE,
                                        SUM(A.PO_QTY) AS S_PO_QTY,
                                        SUM(A.IN_QTY) AS S_IN_QTY
                                    FROM
                                        KSV_STOCK_MEM A,
                                        KCD_MATL_MST B,
                                        KSV_PO_MST C
                                    WHERE
                                        A.MATL_CD = B.MATL_CD
                                        --AND   A.STOCK_STATUS = '0'
                                        AND A.PO_QTY > A.IN_QTY
                                        AND (
                                            A.PU_CD = ''
                                            OR A.PU_CD IS NULL
                                        )
                                        AND A.PO_CD = C.PO_CD
                                        AND A.PO_SEQ = C.PO_SEQ
                                        AND C.PO_STATUS = '4'
                                        AND C.PO_SEQ < 97
                                        AND LEFT(A.ORDER_CD, 2) = '${args.data.BUYER_CD}'
                                    GROUP BY
                                        LEFT(A.ORDER_CD, 2),
                                        B.VENDOR_CD,
                                        A.PO_CD,
                                        B.MATL_TYPE
                                    HAVING
                                        SUM(A.PO_QTY) > 0
                                ) K,
                                KSV_PO_MST K1
                            WHERE
                                K.PO_CD = K1.PO_CD
                                AND K1.PO_SEQ = 1
                                -- GROUP BY K.BUYER_CD, K.VENDOR_CD, K.MATL_TYPE, K.PO_CD,  K.S_PO_QTY, K1.FACTORY_CD, K1.MATL_DUE_DATE, K1.PROD_DUE_DATE
                        ) P,
                        KCD_BUYER P1,
                        KCD_VENDOR P2,
                        KCD_FACTORY P3
                    WHERE
                        P.BUYER_CD = P1.BUYER_CD
                        AND P.VENDOR_CD = P2.VENDOR_CD
                        AND P.FACTORY_CD = P3.FACTORY_CD
                        -- ORDER BY P.BUYER_CD, P.VENDOR_CD, P.MATL_TYPE, P.PO_CD
                )
                ORDER BY
                    PU_CD DESC,
                    BUYER_CD,
                    VENDOR_CD,
                    MATL_TYPE,
                    PO_CD
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                PU_STATUS: '',
                PU_CD: '',
                BUYER_CD: '',
                PO_CD: '',
                VENDOR_CD: '',
                VENDOR_NAME: '',
                MATL_TYPE: '',
                NORMI: '',
                ORDER_DATE: '',
                PAY_TERM: '',
                EXP_DELIVERY_DATE: '',
                CONTRACT_DELIVERY_DATE: '',
                TARGET_ETA: '',
                PI_NO: '',
                PI_FILE: '',
                STSIN_STATUS: '',
                STSOUT_STATUS: '',
                SHIPMENT_STATUS: '',
                ORIGIN_POART: '',
                SHIP_MODE: '',
                CURR_CD: '',
                DEPOSIT_AMT: 0,
                PAY_TYPE: '',
                PAY_DATE: '',
                GW: '',
                ETC99: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S0430_2;
