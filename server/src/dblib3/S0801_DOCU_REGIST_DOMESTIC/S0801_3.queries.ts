import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0801_3 = {
    Query: {
        mgrQueryS0801_3: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }
            let sqlStr = `
                select
                    '' as SHIP_DATE,
                    b.INVOICE_NO,
                    g.BUYER_NAME,
                    '' as PO_CD,
                    b.order_cd as ORDER_CD,
                    '' as STYLE_NAME,
                    b.PAY_QTY as SHIP_QTY,
                    b.PAY_QTY,
                    b.CURR_CD,
                    b.PAY_PRICE as PRICE,
                    (b.PAY_QTY * b.PAY_PRICE) as PAY_AMT,
                    b.KRW_AMT as KRW_SHIP_AMOUNT,
                    b.VAT_AMT as KRW_TAX_AMOUNT,
                    b.TOT_AMT as KRW_TOT_AMOUNT
                from
                    ksv_tax_mst a,
                    ksv_tax_mem b
                    left join ksv_invoice_mst c on c.invoice_no = b.invoice_no,
                    kcd_buyer g
                where
                    a.tax_cd = '${args.data.TAX_CD}'
                    and a.tax_cd = b.tax_cd
                    and a.buyer_cd = g.buyer_cd
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tObj = { ...tRet[tIdx] };
                if (tObj.INVOICE_NO) {
                    let sqlStr1 = `
                        select
                            a.ship_date,
                            a.order_cd,
                            c.po_cd,
                            d.style_name
                        from
                            ksv_invoice_mem a,
                            ksv_order_mst b,
                            ksv_po_mem c,
                            kcd_style d,
                            kcd_buyer e
                        where
                            a.invoice_no = '${tObj.INVOICE_NO}'
                            and a.order_cd = '${tObj.ORDER_CD}'
                            and a.order_cd = b.order_cd
                            and c.order_cd = a.order_cd
                            and c.po_seq = 1
                            and b.style_cd = d.style_cd
                            and left(a.order_cd, 2) = e.buyer_cd
                    `;
                    var tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));
                    if (tRet1.length > 0) {
                        tObj.SHIP_DATE = tRet1[0].ship_date;
                        tObj.ORDER_CD = tRet1[0].order_cd;
                        tObj.PO_CD = tRet1[0].po_cd;
                        tObj.STYLE_NAME = tRet1[0].style_name;
                    }
                }
                tRetArray.push(tObj);
            }
            return tRetArray;
        },
    },
};

export default moduleQuery_S0801_3;
