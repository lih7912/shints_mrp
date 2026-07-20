// MGR_@@TNAME@@.queries.js

import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S030303_MRP_BY_SEARCH_TBL_KSV_PROD_MEM = {
    Query: {
        mgrQuery_S030303_MRP_BY_SEARCH_TBL_KSV_PROD_MEM: async (_, args) => {
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
                            isnull(ADD_LOSS, '0') as ADD_LOSS,
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
            tRet.forEach((col, i) => {
                var tObj = { ...col };
                if (col.ADD_LOSS === null) tObj.ADD_LOSS = '0';
                tRetArray.push(tObj);
            });
            return tRetArray;
        },

        mgrQuery_S030303_MRP_BY_SEARCH_TBL_KSV_ORDER_MRP: async (_, args) => {
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
                            isnull(a2.ADD_LOSS, '0') as ADD_LOSS,
                            a2.COLOR,
                            a2.SPEC,
                            a2.UNIT,
                            a2.MATL_NAME,
                            a2.VENDOR_CD
                        from
                            ksv_order_mrp a1,
                            kcd_matl_mst a2
                        where
                            a1.prod_cd = '${args.data.PROD_CD}'
                            and a1.order_cd = '${args.data.ORDER_CD}'
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
            tRet.forEach((col, i) => {
                var tObj = {};
                if (col.ADD_LOSS === null) tObj.ADD_LOSS = '0';
                tRetArray.push(tObj);
            });
            return tRetArray;
        },

        mgrQuery_S030303_MRP_BY_SEARCH_TBL_KSV_ORDER_MRP2: async (_, args) => {
            var tSQL = '';
            /*
       if (args.KEY1 !== '') {
           tSQL += `AND KEY1 = '${args.KEY1}' `;
       }
*/
            let sqlStr = `
                select
                    a.ORDER_CD,
                    a.PROD_CD,
                    b.COLOR,
                    c.STYLE_NAME,
                    count(*) as c_cnt
                from
                    ksv_order_mrp a,
                    ksv_prod_mst b,
                    kcd_style c
                where
                    a.order_cd in (
                        select distinct
                            order_cd
                        from
                            ksv_order_mst
                        where
                            style_cd = '${args.data.PROD_CD}'
                    )
                    and a.prod_cd = b.prod_cd
                    and b.style_cd = c.style_cd
                group by
                    a.ORDER_CD,
                    a.PROD_CD,
                    b.COLOR,
                    c.STYLE_NAME
            `;

            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {};
            var tRetArray = [];
            tRet.forEach((col, i) => {
                var tObj = {};
                tObj.ORDER_CD = col.ORDER_CD;
                tObj.PROD_CD = col.PROD_CD;
                tObj.COLOR = col.COLOR;
                tObj.STYLE_NAME = col.STYLE_NAME;
                // if (col.ADD_LOSS === null) tObj.ADD_LOSS = '0';
                tRetArray.push(tObj);
            });
            return tRetArray;
        },
        mgrQuery_S030303_MRP_BY_SEARCH_TBL_KSV_ORDER_MRP2_BY_STYLE: async (
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
                    a.ORDER_CD,
                    a.PROD_CD,
                    b.COLOR,
                    c.STYLE_NAME,
                    count(*) as c_cnt
                from
                    ksv_order_mrp a,
                    ksv_prod_mst b,
                    kcd_style c
                where
                    a.order_cd in (
                        select distinct
                            a.order_cd
                        from
                            ksv_order_mst a,
                            kcd_style b
                        where
                            a.style_cd = b.style_cd
                            and b.style_name like '%${args.data.PROD_CD}%'
                    )
                    and a.prod_cd = b.prod_cd
                    and b.style_cd = c.style_cd
                group by
                    a.ORDER_CD,
                    a.PROD_CD,
                    b.COLOR,
                    c.style_name
            `;

            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {};
            var tRetArray = [];
            tRet.forEach((col, i) => {
                var tObj = {};
                tObj.ORDER_CD = col.ORDER_CD;
                tObj.PROD_CD = col.PROD_CD;
                tObj.COLOR = col.COLOR;
                tObj.STYLE_NAME = col.STYLE_NAME;
                // if (col.ADD_LOSS === null) tObj.ADD_LOSS = '0';
                tRetArray.push(tObj);
            });

            return tRetArray;
        },
    },
};

export default moduleQuery_S030303_MRP_BY_SEARCH_TBL_KSV_PROD_MEM;
