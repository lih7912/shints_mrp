import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0413_2 = {
    Query: {
        mgrQueryS0413_2: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }
            let sqlStr = `
                SELECT
                    A.PACK_CD,
                    A.OUT_DATE,
                    A.DELIVERY_AMT,
                    A.DELIVERY_WON,
                    A.CURR_DATE,
                    B.USD_RATE,
                    A.DOCU_NO,
                    ISNULL(A.PAYMENT_TYPE, ' ') AS PAYMENT_TYPE,
                    ISNULL(A.TRADE_TYPE, ' ') AS TRADE_TYPE,
                    A.CURR_CD,
                    A.TRADE_KIND,
                    A.LICENSE_NO,
                    A.LICENSE_DATE
                FROM
                    KSV_INVOICE_MATL A,
                    KCD_CURRENCY B
                WHERE
                    A.INVOICE_NO = '${args.data.INVOICE_NO}'
                    AND B.CURR_CD = A.CURR_CD
                    AND B.START_DATE = A.CURR_DATE
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            return tRet;
        },

        mgrQueryS0413_2_1: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }

            var tRetArray = [];

            if (args.data.PACK_CD === '') return tRetArray;
            var tIdx = 0;

            let sqlStr1 = `
                select
                    b.cd_name as DELIVERY_TYPE_N,
                    c.FACTORY_NAME,
                    a.DELIVERY_TYPE,
                    a.OUT_FACTORY_CD
                from
                    ksv_stock_out a,
                    kcd_code b,
                    kcd_factory c
                where
                    a.pack_cd = '${args.data.PACK_CD}'
                    and b.cd_group = 'DELIVERY_TYPE'
                    and b.cd_code = a.delivery_type
                    and c.factory_cd = a.out_factory_cd
            `;
            var tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));

            return tRet1;
        },
    },
};

export default moduleQuery_S0413_2;
