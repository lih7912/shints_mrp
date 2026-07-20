import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0414_2 = {
    Query: {
        mgrQueryS0414_2: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }

            var tInput = { ...args.data };
            if (tInput.S_OUT_DATE === '') {
                tInput.S_OUT_DATE = '20220101';
                tInput.E_OUT_DATE = '20231231';
            }
            tInput.DELIVERY_TYPE = tInput.DELIVERY_TYPE.trim();
            tInput.FACTORY_CD = tInput.FACTORY_CD.trim();
            tInput.PAYMENT_TYPE = tInput.PAYMENT_TYPE.trim();
            tInput.TRADE_TYPE = tInput.TRADE_TYPE.trim();

            let sqlStr = `
                SELECT
                    A.INVOICE_NO,
                    A.OUT_DATE,
                    A.PACK_CD,
                    F.PO_AMT,
                    C.CD_NAME AS DELIVERY_TYPE_N,
                    A.DELIVERY_WON,
                    E.WON_AMT,
                    A.DELIVERY_AMT,
                    D.FACTORY_NAME,
                    A.LICENSE_NO,
                    A.LICENSE_DATE,
                    A.REG_DATETIME
                FROM
                    KSV_INVOICE_MATL A,
                    KCD_CODE C,
                    KCD_FACTORY D,
                    KCD_CURRENCY E,
                    (
                        SELECT DISTINCT
                            PACK_CD,
                            DELIVERY_TYPE,
                            OUT_FACTORY_CD
                        FROM
                            KSV_STOCK_OUT
                    ) B,
                    (
                        SELECT
                            INVOICE_NO,
                            SUM(PO_AMT) AS PO_AMT
                        FROM
                            KSV_INVOICE_MATLMEM
                        GROUP BY
                            INVOICE_NO
                    ) F
                WHERE
                    A.OUT_DATE BETWEEN '${tInput.S_OUT_DATE}' AND '${tInput.E_OUT_DATE}'
                    AND B.PACK_CD = A.PACK_CD
                    AND B.DELIVERY_TYPE LIKE '${tInput.DELIVERY_TYPE}%'
                    AND D.FACTORY_CD LIKE '${tInput.FACTORY_CD}%'
                    AND ISNULL(A.PAYMENT_TYPE, '') LIKE '${tInput.PAYMENT_TYPE}%'
                    AND ISNULL(A.TRADE_TYPE, '') LIKE '${tInput.TRADE_TYPE}%'
                    AND C.CD_GROUP = 'DELIVERY_TYPE'
                    AND C.CD_CODE = B.DELIVERY_TYPE
                    AND D.FACTORY_CD = B.OUT_FACTORY_CD
                    AND E.CURR_CD = 'USD'
                    AND E.START_DATE = A.CURR_DATE
                    AND F.INVOICE_NO = A.INVOICE_NO
                ORDER BY
                    A.REG_DATETIME DESC
                    -- OFFSET 0 ROWS FETCH NEXT 1000 ROWS ONLY
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                INVOICE_NO: '',
                OUT_DATE: '',
                PACK_CD: '',
                PO_AMT: 0,
                DELIVERY_TYPE_N: '',
                DELIVERY_WON: 0,
                WON_AMT: 0,
                DELIVERY_AMT: 0,
                FACTORY_NAME: '',
                LICENSE_NO: '',
                LICENSE_DATE: '',
                REG_DATETIME: '',
                ETC99: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
        mgrQueryS0414_2_1: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }
            let sqlStr = `
                select
                    b.INVOICE_NO,
                    b.PO_CD,
                    b.PO_AMT,
                    b.DELIVERY_AMT
                from
                    ksv_invoice_matlmem b
                where
                    b.invoice_no = '${args.data.INVOICE_NO}'
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S0414_2;
