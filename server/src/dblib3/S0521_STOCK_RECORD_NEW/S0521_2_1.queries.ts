import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0521_2_1 = {
    Query: {
        mgrQueryS0521_2_1: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }
            let sqlStr = `
                SELECT
                    A1.REG_USER,
                    A1.BUYER_CD,
                    A3.BUYER_NAME,
                    A1.PO_CD2,
                    A1.VENDOR_CD,
                    A4.VENDOR_NAME,
                    A2.TRADE_TERM,
                    A2.ORIGIN_PORT,
                    A1.EXP_DELIVERY_DATE,
                    A2.TARGET_ETA,
                    A2.CT_QTY,
                    A2.WEIGHT,
                    A2.CBM,
                    A2.PU_CD,
                    A2.STSOUT_CD,
                    A2.INVOICE_NO,
                    A2.READY_DATE,
                    A2.DESTINATION
                FROM
                    KSV_PU_MST2 A1,
                    (
                        SELECT
                            B1.PU_CD,
                            B.STSOUT_CD,
                            B.INVOICE_NO,
                            B.TRADE_TERM,
                            B.READY_DATE,
                            B.TARGET_ETA,
                            B.ORIGIN_PORT,
                            B.WEIGHT,
                            B.CBM,
                            B.DESTINATION,
                            B.CT_QTY,
                            COUNT(*) AS ROW_CNT
                        FROM
                            KSV_STOCK_OUT B1,
                            KSV_SHIPMENT_MEM B
                        WHERE
                            B.STSOUT_CD = B1.STSOUT_CD
                            AND B.SHIPMENT_CD = ''
                        GROUP BY
                            B1.PU_CD,
                            B.STSOUT_CD,
                            B.INVOICE_NO,
                            B.TRADE_TERM,
                            B.READY_DATE,
                            B.TARGET_ETA,
                            B.ORIGIN_PORT,
                            B.WEIGHT,
                            B.CBM,
                            B.DESTINATION,
                            B.CT_QTY
                    ) A2,
                    KCD_BUYER A3,
                    KCD_VENDOR A4
                WHERE
                    A1.PU_CD = A2.PU_CD
                    AND A1.BUYER_CD = A3.BUYER_CD
                    AND A1.VENDOR_CD = A4.VENDOR_CD
                order by
                    A2.ORIGIN_PORT
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                REG_USER: '',
                BUYER_CD: '',
                BUYER_NAME: '',
                PO_CD2: '',
                VENDOR_CD: '',
                VENDOR_NAME: '',
                TRADE_TERM: '',
                ORIGIN_PORT: '',
                EXP_DELIVERY_DATE: '',
                TARGET_ETA: '',
                CT_QTY: 0,
                WEIGHT: 0,
                CBM: 0,
                ETC99: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S0521_2_1;
