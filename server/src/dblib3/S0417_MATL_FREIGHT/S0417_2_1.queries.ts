import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0417_2_1 = {
    Query: {
        mgrQueryS0417_2_1: async (_, args) => {
            var tSQL = '';

            var tInput = { ...args.data };
            Object.keys(tInput).forEach((col, i) => {
                if (tInput[`${col}`] === ' ' || tInput[`${col}`] === null) {
                    tInput[`${col}`] = '';
                }
            });

            if (tInput.QRY_KIND === 'DHL') {
                tSQL += `and A.ADP_CHECK = '0' `;
                tSQL += `and A.FRT_TYPE in ('5','6') `;
                tSQL += `AND A.FRT_DATE >= '20220101' `;
                tSQL += `AND A.FRT_DATE <= '20231231' `;
            } else if (tInput.QRY_KIND === 'ADP') {
                tSQL += `and A.ADP_CHECK = '0' `;
                tSQL += `AND A.FRT_TYPE = '${tInput.FRT_TYPE}' `;
                if (tInput.DESTINATION === 'BVT') {
                    tSQL += `AND A.DESTINATION in ('SB', 'FC034', 'V0228', '56', '55') `;
                } else if (tInput.DESTINATION === 'SHINTS') {
                    tSQL += `AND A.DESTINATION in ('00', 'FC010', 'V1002', 'V0153', 'SN', 'SS') `;
                } else if (tInput.DESTINATION === 'ETP') {
                    tSQL += `AND A.DESTINATION in ('FC044', '66', 'EP') `;
                } else if (tInput.DESTINATION === 'TN') {
                    tSQL += `AND A.DESTINATION in ('FC087') `;
                } else {
                    tSQL += `AND A.DESTINATION like '%' `;
                }
            } else {
                tSQL += `AND A.BL_NO <> '' `;
                tSQL += `AND A.FRT_DATE >= '20220101' `;
                tSQL += `AND A.FRT_DATE <= '20231231' `;
                tSQL += `AND A.BUYER_CD LIKE '${tInput.BUYER_CD}%'  `;
                tSQL += `AND A.DESTINATION LIKE '${tInput.DESTINATION}%' `;
                tSQL += `AND A.PO_CD LIKE '${tInput.PO_CD}%'  `;
                tSQL += `AND A.INVOICE_NO LIKE '%${tInput.INVOICE_NO}%'  `;
                tSQL += `AND A.FRT_TYPE LIKE  '${tInput.FRT_TYPE}%' `;
            }

            let sqlStr = `
                SELECT
                    A.FRT_DATE,
                    C.CD_NAME AS TRADE_TYPE_N,
                    '' AS COL,
                    ISNULL(A.CONFIRM_CHECK, '') AS CONFIRM_CHECK,
                    F.COM_NAME AS DEPARTURE_N,
                    G.COM_NAME AS DESTINATION_N,
                    A.SENDER,
                    A.RECEIVER,
                    A.BUYER_CD,
                    A.PO_CD,
                    A.ORDER_CD,
                    A.SPEC,
                    A.QTY,
                    A.WEIGHT,
                    A.AMOUNT,
                    A.CURR_CD,
                    J.CD_NAME AS DELAY_REASON_N,
                    B.CD_NAME AS FRT_TYPE_N,
                    D.CD_NAME AS AREA_TYPE_N,
                    E.CD_NAME AS PARCEL_TYPE_N,
                    A.BL_NO,
                    '' AS COL2,
                    '' AS COL3,
                    A.REMARK,
                    ISNULL(H.STYLE_NAME, '') AS STYLE_NAME,
                    A.MATL_CD,
                    A.WEIGHT_NET,
                    A.NET,
                    A.VAT,
                    A.ADP_CHECK,
                    A.INVOICE_NO,
                    A.CHARGE_KIND,
                    A.CHARGE_CODE,
                    A.REG_USER,
                    A.REG_DATETIME,
                    A.TRADE_TYPE,
                    A.DESTINATION,
                    A.FRT_TYPE,
                    A.AREA_TYPE,
                    A.MATL_TYPE,
                    A.UNIT,
                    A.PRICE,
                    A.MW,
                    A.GARMENT_COMPO,
                    A.PO_SEQ,
                    A.MRP_SEQ,
                    A.IN_DATETIME,
                    I.MATL_NAME,
                    I.COLOR,
                    I.SPEC,
                    I.UNIT,
                    A.FRT_IDX,
                    '0' AS COL4,
                    A.DEPARTURE,
                    A.DELAY_REASON
                FROM
                    KZZ_FREIGHT A
                    LEFT JOIN KCD_CODE E ON A.MATL_TYPE = E.CD_CODE
                    AND E.CD_GROUP = 'PARCEL_TYPE'
                    LEFT JOIN KCD_CODE J ON A.DELAY_REASON = J.CD_CODE
                    AND J.CD_GROUP = 'DELAY_REASON'
                    LEFT JOIN KCD_STYLE H ON A.STYLE_CD = H.STYLE_CD
                    LEFT JOIN KCD_MATL_MST I ON A.MATL_CD = I.MATL_CD,
                    KCD_CODE B,
                    KCD_CODE C,
                    KCD_CODE D,
                    KVW_COMPANY F,
                    KVW_COMPANY G
                WHERE
                    A.FRT_TYPE = B.CD_CODE
                    AND B.CD_GROUP = 'FRT_TYPE'
                    AND A.TRADE_TYPE = C.CD_CODE
                    AND C.CD_GROUP = 'TRADE_TYPE'
                    AND A.AREA_TYPE = D.CD_CODE
                    AND D.CD_GROUP = 'AREA_TYPE'
                    AND A.DESTINATION = G.COM_CD
                    AND A.DEPARTURE = F.COM_CD
                    AND A.REG_USER LIKE '%%' ${tSQL}
                    AND A.SENDER LIKE '%'
                ORDER BY
                    1 desc
                    -- OFFSET 0 ROWS FETCH NEXT 1000 ROWS ONLY
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S0417_2_1;
