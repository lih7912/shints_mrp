import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0307_3_1 = {
    Query: {
        mgrQuery_S0307_3_1: async (_, args) => {
            var tSQL = '';
            if (args.data.DL_FLAG !== '') {
                tSQL += `AND a.dl_flag like '%${args.data.DL_FLAG}%' `;
            }
            let sqlStr = `
                select
                    a1.*,
                    c.MATL_PRICE,
                    c.CURR_CD,
                    d.VENDOR_NAME,
                    d.STATUS_CD as VENDOR_STATUS_CD
                from
                    (
                        select
                            a.*,
                            b.MATL_TYPE2,
                            b.MATL_NAME,
                            b.COLOR,
                            b.SPEC,
                            b.UNIT,
                            b.ADD_LOSS,
                            b.STATUS_CD,
                            b.VENDOR_CD
                            -- from ksv_prod_mem a, kcd_matl_mst b
                        from
                            ksv_order_mrp a,
                            kcd_matl_mst b
                        where
                            a.prod_cd = '${args.data.PROD_CD}'
                            and a.order_cd = '${args.data.ORDER_CD}'
                            and b.matl_cd = a.matl_cd
                            and a.order_mrp_seq = (
                                select
                                    max(order_mrp_seq)
                                from
                                    ksv_order_mrp
                                where
                                    order_cd = '${args.data.ORDER_CD}'
                            ) ${tSQL}
                    ) a1
                    left join kcd_matl_sale c on c.matl_cd = a1.matl_cd
                    and c.matl_seq = (
                        select
                            max(matl_seq)
                        from
                            kcd_matl_sale
                        where
                            matl_cd = a1.matl_cd
                    )
                    left join kcd_vendor d on d.vendor_cd = a1.vendor_cd
                    left join kcd_matl_type2 e on e.seq = a1.matl_type2
                order by
                    a1.seq
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                MRP_CHECK: '',
                MRP_TYPE2: '',
                MATL_NAME: '',
                MATL_CD: '',
                COLOR: '',
                SPEC: '',
                MATL_PRICE: '',
                CURR_CD: '',
                UNIT: '',
                ADD_LOSS: '',
                USE_SIZE: '',
                REMARK: '',
                BVT_REMARK: '',
                COUNTRY: '',
                STD_NET: '',
                STD_LOSS: '',
                NET: '',
                LOSS: '',
                GROSS: '',
                VENDOR_NAME: '',
                VENDOR_CD: '',
                STD_GROSS: '',
                SEQ: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S0307_3_1;
