import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0413_1 = {
    Query: {
        mgrQueryS0413_CODE: async (_, args) => {
            var tWObj = {};

            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_code
                where
                    cd_group = 'CURR_CD'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_NAME = ' ';
            tObj.CD_CODE = ' ';
            tRet.unshift(tObj);
            tWObj.CURR_CD = tRet;

            let sqlStr = `
                SELECT
                    INVOICE_NO,
                    OUT_DATE
                FROM
                    ksv_invoice_matl
                order by
                    out_date desc
                    -- offset 0 rows fetch next 1000 rows only
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.INVOICE_NO = ' ';
            tObj.OUT_DATE = ' ';
            tRet.unshift(tObj);
            tWObj.INVOICE = tRet;

            let sqlStr = `
                SELECT distinct
                    PACK_CD
                FROM
                    KSV_STOCK_OUT
                WHERE
                    eta <> ''
                    and left(reg_datetime, 8) >= '20220101'
                    and left(reg_datetime, 8) <= '20231241'
                ORDER BY
                    PACK_CD
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.PACK_CD = ' ';
            tRet.unshift(tObj);
            tWObj.PACK_CD = tRet;

            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_code
                where
                    cd_group = 'PAYMENT_TYPE'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_NAME = ' ';
            tObj.CD_CODE = ' ';
            tRet.unshift(tObj);
            tWObj.PAYMENT_TYPE = tRet;

            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_code
                where
                    cd_group = 'TRADE_TYPE'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_NAME = ' ';
            tObj.CD_CODE = ' ';
            tRet.unshift(tObj);
            tWObj.TRADE_TYPE = tRet;

            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_code
                where
                    cd_group = 'TRADE_KIND'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_NAME = ' ';
            tObj.CD_CODE = ' ';
            tRet.unshift(tObj);
            tWObj.TRADE_KIND = tRet;

            var tArray = [];
            var tObj = {};
            tObj.LN_PARTNER = ' ';
            tObj.CD_PARTNER = ' ';
            tArray.unshift(tObj);
            tWObj.NEOE_KIND = tArray;

            return tWObj;
        },

        mgrQueryS0413_1: async (_, args) => {
            var tWObj = {};
            var tPackCd = '';

            if (args.data.INVOICE_NO !== '') {
                var sqlStr = `
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
                tWObj.INVOICE = tRet;
                if (tRet.length > 0) {
                    tPackCd = tRet[0].PACK_CD;
                } else {
                    tPackCd = '';
                }
            } else {
                tWObj.INVOICE = [];
                tPackCd = args.data.PACK_CD;
            }

            if (tPackCd === '') {
                tWObj.INVOICE_1 = [];
            } else {
                var sqlStr = `
                    select distinct
                        b.cd_name as DELIVERY_TYPE_N,
                        c.FACTORY_NAME,
                        a.DELIVERY_TYPE,
                        a.OUT_FACTORY_CD
                    from
                        ksv_stock_out a,
                        kcd_code b,
                        kcd_factory c
                    where
                        a.pack_cd = '${tPackCd}'
                        and b.cd_group = 'DELIVERY_TYPE'
                        and b.cd_code = a.delivery_type
                        and c.factory_cd = a.out_factory_cd
                `;
                var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
                tWObj.INVOICE_1 = tRet;
            }

            if (args.data.INVOICE_NO !== '') {
                var sqlStr = `
                    SELECT
                        A.PACK_CD,
                        A.PO_CD,
                        A.PO_AMT,
                        A.DELIVERY_AMT,
                        A.DELIVERY_WON
                    FROM
                        KSV_INVOICE_MATLMEM A
                    WHERE
                        A.INVOICE_NO = '${args.data.INVOICE_NO}'
                    ORDER BY
                        A.PACK_CD,
                        A.PO_CD
                `;
                var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
                tWObj.INVOICE_PO = tRet;
            } else if (tPackCd !== '') {
                var sqlStr = `
                    select
                        a.pack_cd,
                        a.po_cd,
                        sum(a.out_qty * b.in_price * c.usd_rate) as sum_amt
                    from
                        ksv_stock_out a,
                        ksv_stock_in b,
                        kcd_currency c
                    where
                        a.po_cd = b.po_cd
                        and a.po_seq = b.po_seq
                        and a.order_cd = b.order_cd
                        and a.matl_cd = b.matl_cd
                        and a.matl_seq = b.matl_seq
                        and left(a.in_datetime, 8) = left(b.in_datetime, 8)
                        and c.curr_cd = b.in_curr_cd
                        and c.start_date = (
                            select
                                max(start_date)
                            from
                                kcd_currency
                        )
                        and a.pack_cd = '${tPackCd}'
                    group by
                        a.pack_cd,
                        a.po_cd
                `;
                var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
                var tArray = tRet.map((col, i) => {
                    var tObj = {};
                    tObj.PACK_CD = col.pack_cd;
                    tObj.PO_CD = col.po_cd;
                    tObj.PO_AMT = col.sum_amt;
                    tObj.DELIVERY_AMT = 0;
                    tObj.DELIVERY_WON = 0;
                    return tObj;
                });
                tWObj.INVOICE_PO = tArray;
            } else {
                tWObj.INVOICE_PO = [];
            }

            return tWObj;
        },
    },
};

export default moduleQuery_S0413_1;
