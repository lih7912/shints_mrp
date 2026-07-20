import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0437_3_1 = {
    Query: {
        mgrQueryS0437_3_1: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }
            let sqlStr = `
                select
                    A.SHIPMENT_CD,
                    A.STATUS_CD,
                    LEFT(A.REG_DATETIME, 8) as REG_DATETIME,
                    A.SHIP_MODE,
                    A.ORG_ORIGIN_PORT,
                    A.ORG_DESTINATION,
                    A.DESTINATION,
                    A.IS_SINGAPORE,
                    A.BL_NO,
                    A.ETA,
                    A.SHIPPING_COST,
                    A.IMPORT_COST,
                    sum(B.WEIGHT) as S_WEIGHT,
                    sum(B.CBM) as S_CBM
                from
                    ksv_shipment_mst A,
                    ksv_shipment_mem B,
                    kcd_cdoe C
                where
                    A.SHIPMENT_CD = B.SHIPMENT_CD
                    and A.ORG_ORIGIN_PORT = C.CD_CODE
                    and C.CD_GROUP = 'ORIGIN_PORT'
                    and C.ETC = 'KOREA'
                    -- and A.ORG_ORIGIN_PORT in ('korea', 'Korea', 'korea1')
                group by
                    A.SHIPMENT_CD,
                    A.STATUS_CD,
                    LEFT(A.REG_DATETIME, 8),
                    A.SHIP_MODE,
                    A.ORG_ORIGIN_PORT,
                    A.ORG_DESTINATION,
                    A.DESTINATION,
                    A.IS_SINGAPORE,
                    A.BL_NO,
                    A.ETA,
                    A.SHIPPING_COST,
                    A.IMPORT_COST
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
        mgrQueryS0437_3_2: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }
            let sqlStr = `
                SELECT
                    A.PU_CD,
                    C.STSOUT_CD,
                    '' as PACK_CD,
                    D.INVOICE_NO,
                    D.TRADE_TERM,
                    D.READY_DATE,
                    A.ETA,
                    D.ORIGIN_PORT,
                    D.DESTINATION,
                    D.CT_QTY,
                    D.CBM,
                    D.WEIGHT,
                    A.VENDOR_CD,
                    A.BUYER_CD,
                    A.PO_CD2 as PO_CD
                FROM
                    KSV_PU_MST2 A,
                    KSV_SHIPMENT_MEM D,
                    (
                        select
                            PU_CD,
                            STSOUT_CD,
                            sum(OUT_QTY) as S_OUT_QTY
                        from
                            KSV_STOCK_OUT
                        where
                            PU_CD is not null
                            and PU_CD <> ''
                        group by
                            PU_CD,
                            STSOUT_CD
                    ) C
                WHERE
                    A.PU_CD = C.PU_CD
                    AND C.STSOUT_CD = D.STSOUT_CD
                    AND D.SHIPMENT_CD = '${args.data.SHIPMENT_CD}'
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S0437_3_1;
