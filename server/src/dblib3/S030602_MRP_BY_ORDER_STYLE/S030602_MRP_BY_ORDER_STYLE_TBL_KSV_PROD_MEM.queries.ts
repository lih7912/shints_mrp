// MGR_@@TNAME@@.queries.js

import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S030602_MRP_BY_ORDER_STYLE_TBL_KSV_PROD_MEM = {
    Query: {
        mgrQuery_S030602_MRP_BY_ORDER_STYLE_TBL_KSV_PROD_MEM: async (
            _,
            args,
        ) => {
            var tSQL = '';
            /*
       if (args.KEY1 !== '') {
           tSQL += `AND KEY1 = '${args.KEY1}' `;
       }
*/
            let sqlStr = `
                select
                    a.*,
                    c.matl_price,
                    c.curr_cd,
                    d.vendor_name,
                    e.nat_name
                from
                    (
                        select
                            a1.*,
                            a2.COLOR,
                            a2.SPEC,
                            a2.UNIT,
                            a2.MATL_NAME,
                            a2.VENDOR_CD
                        from
                            ksv_prod_mem a1,
                            kcd_matl_mst a2
                        where
                            a1.prod_cd = '${args.data.PROD_CD}'
                            and a1.matl_cd = a2.matl_cd
                    ) a
                    left join kcd_matl_mem c on c.matl_cd = a.matl_cd
                    and c.matl_seq = (
                        select
                            max(matl_seq)
                        from
                            kcd_matl_mem
                        where
                            matl_cd = a.matl_cd
                    )
                    left join kcd_vendor d on d.vendor_cd = a.vendor_cd
                    left join kcd_nation e on e.nat_cd = a.country
                order by
                    a.seq
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                MATL_TYPE2: '',
                MATL_CD: '',
                MATL_NAME: '',
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
                STD_GROSS: '',
                NET: '',
                LOSS: '',
                GROSS: '',
                VENDOR_NAME: '',
                VENDOR_CD: '',
                SEQ: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },

        mgrQuery_S030602_MRP_BY_ORDER_STYLE_TBL_KSV_ORDER_MRP: async (
            _,
            args,
        ) => {
            var tSQL = '';
            /*
       if (args.KEY1 !== '') {
           tSQL += `AND KEY1 = '${args.KEY1}' `;
       }
*/
            let sqlStr = `
                select
                    a.*,
                    c.MATL_PRICE,
                    c.CURR_CD,
                    d.VENDOR_NAME,
                    e.NAT_NAME
                from
                    (
                        select
                            a1.*,
                            a2.COLOR,
                            a2.SPEC,
                            a2.UNIT,
                            a2.MATL_NAME,
                            a2.VENDOR_CD,
                            a3.MATL_TYPE2
                        from
                            ksv_order_mrp a1,
                            kcd_matl_mst a2,
                            kcd_matl_type2 a3
                        where
                            a1.prod_cd = '${args.data.PROD_CD}'
                            and a1.order_cd = '${args.data.ORDER_CD}'
                            and a1.order_mrp_seq = '${args.data.ORDER_MRP_SEQ}'
                            and a1.matl_cd = a2.matl_cd
                            and a2.matl_type2 = a3.seq
                    ) a
                    left join kcd_matl_mem c on c.matl_cd = a.matl_cd
                    and c.matl_seq = (
                        select
                            max(matl_seq)
                        from
                            kcd_matl_mem
                        where
                            matl_cd = a.matl_cd
                    )
                    left join kcd_vendor d on d.vendor_cd = a.vendor_cd
                    left join kcd_nation e on e.nat_cd = a.country
                order by
                    a.seq
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                MATL_TYPE2: '',
                MATL_CD: '',
                MATL_NAME: '',
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
                STD_GROSS: '',
                NET: '',
                LOSS: '',
                GROSS: '',
                VENDOR_NAME: '',
                VENDOR_CD: '',
                SEQ: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S030602_MRP_BY_ORDER_STYLE_TBL_KSV_PROD_MEM;
