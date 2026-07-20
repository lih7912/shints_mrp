import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기

// export default로 Query 내용 내보내기
const moduleQuery_S052001_2 = {
    Query: {
        mgrQueryS052001_2: async (_, args, contextValue) => {
            var tSQL = '';
            var sDate = '';
            var eDate = '';
            if (args.data.S_OUT_DATE) {
                sDate = args.data.S_OUT_DATE;
            } else {
                sDate = '20260101';
            }
            if (args.data.E_OUT_DATE) {
                eDate = args.data.E_OUT_DATE;
            } else {
                eDate = '99999999';
            }
            tSQL = `and a.out_date between '${sDate}' and '${eDate}' `;

            let sqlStr = `
                select
                    a.*,
                    d.VENDOR_NAME,
                    c.MATL_NAME,
                    c.COLOR,
                    c.SPEC,
                    c.UNIT,
                    b.PO_QTY,
                    b.IN_QTY,
                    b.OUT_QTY0,
                    b.INFAC_QTY,
                    b.OUTFAC_QTY,
                    a.REG_USER,
                    case
                        when charindex('-', isnull(a.remark, '')) > 0 then ltrim(rtrim(left(a.remark, charindex('-', a.remark) - 1)))
                        else ltrim(rtrim(isnull(a.remark, '')))
                    end as PURPOSE,
                    case
                        when charindex('-', isnull(a.remark, '')) > 0 then ltrim(rtrim(substring(a.remark, charindex('-', a.remark) + 1, len(a.remark))))
                        else ''
                    end as remark
                from
                    ksv_stock_facout a,
                    (
                        select
                            po_cd,
                            order_cd,
                            matl_cd,
                            max(po_seq) as po_seq,
                            sum(po_qty) as po_qty,
                            sum(in_qty) as in_qty,
                            sum(out_qty) as out_qty0,
                            sum(infac_qty) as infac_qty,
                            sum(outfac_qty) as outfac_qty
                        from
                            ksv_stock_mem
                        where
                            po_cd like '%${args.data.PO_CD}%'
                            and po_seq >= 1
                            and po_seq < 97
                        group by
                            po_cd,
                            order_cd,
                            matl_cd
                            -- having sum(outfac_qty) > 0
                    ) b,
                    kcd_matl_mst c,
                    kcd_vendor d
                where
                    a.po_cd = b.po_cd
                    and a.po_cd like '%${args.data.PO_CD}%'
                    and a.order_cd = b.order_cd
                    and a.order_cd like '%${args.data.ORDER_CD}%'
                    and left(a.order_cd, 2) like '%${args.data.BUYER_CD}%'
                    and a.matl_cd = b.matl_cd
                    and a.matl_cd = c.matl_cd
                    and c.vendor_cd = d.vendor_cd
                    and a.matl_cd like '%${args.data.MATL_NAME}%'
                    and c.matl_name like '%${args.data.DESC}%'
                    and c.unit like '%${args.data.UNIT}%'
                    and c.spec like '%${args.data.SPEC}%'
                    and c.color like '%${args.data.COLOR}%'
                    and d.vendor_name like '%${args.data.VENDOR_NAME}%' ${tSQL}
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            return tRet;
        },
    },
};

export default moduleQuery_S052001_2;
