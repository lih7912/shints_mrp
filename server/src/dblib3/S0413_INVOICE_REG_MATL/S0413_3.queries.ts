import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0413_3 = {
    Query: {
        mgrQueryS0413_3: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }

            if (args.data.INVOICE_NO !== '') {
                let sqlStr = `
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
                return tRet;
            } else if (args.data.PACK_CD !== '') {
                /*
         let sqlStr = `
             select distinct
                 a.PACK_CD,
                 a.PO_CD,
                 0 as PO_AMT,
                 0 as DELIVERY_AMT,
                 0 as DELIVERY_WON
             from
                 ksv_stock_out a
             where
                 a.pack_cd = '${args.data.PACK_CD}'
             order by
                 a.pack_cd,
                 a.po_cd
         `;
*/
                let sqlStr = `
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
                        and a.pack_cd = '${args.data.PACK_CD}'
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
                return tArray;
            }
        },
    },
};

export default moduleQuery_S0413_3;
