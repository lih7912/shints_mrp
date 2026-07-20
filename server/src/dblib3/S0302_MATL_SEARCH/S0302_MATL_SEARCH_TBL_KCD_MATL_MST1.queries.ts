import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기

// export default로 Query 내용 내보내기
const moduleQuery_S0302_MATL_SEARCH_TBL_KCD_MATL_MST1 = {
    Query: {
        mgrQuery_S0302_MATL_SEARCH_TBL_KCD_MATL_MST1: async (_, args) => {
            let sqlStr = `
                select distinct
                    a.MATL_CD,
                    a.PROD_CD,
                    a.COLOR,
                    c.STYLE_NAME,
                    a.NET,
                    a.LOSS,
                    a.USE_SIZE,
                    a.REMARK,
                    d.ORDER_CD,
                    e.PO_CD
                from
                    (
                        select
                            a1.*,
                            b.style_cd,
                            b.COLOR
                        from
                            ksv_prod_mem a1,
                            ksv_prod_mst b
                        where
                            a1.matl_cd = '${args.data.MATL_CD}'
                            and b.prod_cd = a1.prod_cd
                    ) a
                    left join kcd_style c on c.style_cd = a.style_cd
                    left join ksv_order_mem d on d.prod_cd = a.prod_cd
                    and len(d.order_cd) = 10
                    left outer join ksv_po_mem e on d.order_cd = e.order_cd
                    and e.po_seq = 1
                order by
                    a.prod_cd,
                    d.order_cd,
                    e.po_cd
            `;

            return await prisma.$queryRaw(Prisma.raw(sqlStr));
        },
    },
};

export default moduleQuery_S0302_MATL_SEARCH_TBL_KCD_MATL_MST1;
