import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S043101_2_1 = {
    Query: {
        mgrQueryS043101_2_1: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }

            let sqlStr = `
                select
                    p.*,
                    p1.buyer_name,
                    p2.vendor_name,
                    p3.factory_name
                from
                    (
                        select
                            k.buyer_cd,
                            k.vendor_cd,
                            k.matl_type,
                            k.po_cd,
                            k.s_po_qty,
                            k1.factory_cd,
                            k1.matl_due_date,
                            k1.prod_due_date,
                            max(k1.plan_flag) as plan_flag,
                            max(k1.plan_etd) as plan_etd,
                            max(k1.plan_eta) as plan_eta
                        from
                            (
                                select
                                    left(a.order_cd, 2) as buyer_cd,
                                    b.vendor_cd,
                                    a.po_cd,
                                    b.matl_type,
                                    sum(a.po_qty) as s_po_qty
                                from
                                    ksv_stock_mem a,
                                    kcd_matl_mst b,
                                    ksv_po_mst c
                                where
                                    a.matl_cd = b.matl_cd
                                    and a.stock_status = '0'
                                    and (
                                        a.pu_cd = ''
                                        or a.pu_cd is null
                                    )
                                    and a.po_cd = c.po_cd
                                    and c.po_status = '4'
                                    and left(a.order_cd, 2) = '${args.data.BUYER_CD}'
                                group by
                                    left(a.order_cd, 2),
                                    b.vendor_cd,
                                    a.po_cd,
                                    b.matl_type
                                having
                                    sum(a.po_qty) > 0
                            ) k,
                            ksv_po_mst k1
                        where
                            k.po_cd = k1.po_cd
                        group by
                            k.buyer_cd,
                            k.vendor_cd,
                            k.matl_type,
                            k.po_cd,
                            k.s_po_qty,
                            k1.factory_cd,
                            k1.matl_due_date,
                            k1.prod_due_date
                    ) p,
                    kcd_buyer p1,
                    kcd_vendor p2,
                    kcd_factory p3
                where
                    p.buyer_cd = p1.buyer_cd
                    and p.vendor_cd = p2.vendor_cd
                    and p.factory_cd = p3.factory_cd
                order by
                    p.buyer_cd,
                    p.vendor_cd,
                    p.matl_type,
                    p.po_cd
            `;

            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                BUYER_CD: '',
                VENDOR_CD: '',
                MATL_TYPE: '',
                PO_CD: '',
                S_PO_QTY: 0,
                FACTORY_CD: '',
                MATL_DUE_DATE: '',
                PROD_DUE_DATE: '',
                PLAN_FLAG: '',
                PLAN_ETD: '',
                PLAN_ETA: '',
                ETC99: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S043101_2_1;
