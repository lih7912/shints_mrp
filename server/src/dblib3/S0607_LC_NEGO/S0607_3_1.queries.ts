import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0607_3_1 = {
    Query: {
        mgrQueryS0607_3_1: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }
            let sqlStr = `
                SELECT
                    A.REG_USER,
                    A.PU_STATUS,
                    A.PU_CD,
                    A.BUYER_CD,
                    A.PO_CD2 AS PO_CD,
                    A.VENDOR_CD,
                    A1.VENDOR_NAME,
                    A.MATL_TYPE,
                    A.NORMI,
                    A.MRP_DATE,
                    A.ORDER_DATE,
                    A.TRADE_TERM AS PAY_TERM,
                    A.DELIVERY_DATE AS CONTRACT_DELIVERY_DATE,
                    A.EXP_DELIVERY_DATE,
                    A.TARGET_ETA,
                    A.ETA,
                    A.PI_NO,
                    A.PI_FILE,
                    '' AS STSIN_STATUS,
                    '' AS STSOUT_STATUS,
                    '' AS SHIPMENT_STATUS,
                    '' AS ORIGIN_PORT,
                    A.SHIP_MODE,
                    A.CURR_CD,
                    A.PU_AMT,
                    A.DEPOSIT_AMT,
                    A.PAY_TYPE AS PAY_TYPE,
                    A.PAY_DATE AS PAY_DATE,
                    '' AS GW
                FROM
                    KSV_PU_MST2 A,
                    KCD_VENDOR A1
                WHERE
                    A.VENDOR_CD = A1.VENDOR_CD
                    AND A.PU_TYPE = '1'
                    AND A.PO_CD2 like '%${args.data.PO_CD}%'
                    AND A.BUYER_CD like '%${args.data.BUYER_CD}%'
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S0607_3_1;
