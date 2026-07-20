// MGR_@@TNAME@@.queries.js

import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0306_MRP_BY_ORDER_TBL_KSV_PROD_MEM = {
    Query: {
        mgrQuery_S0306_MRP_BY_ORDER_TBL_KSV_PROD_MEM: async (_, args) => {
            var tSQL = '';
            if (args.data.DL_FLAG !== '') {
                tSQL += `AND a.dl_flag like '%${args.data.DL_FLAG}%' `;
            }
            let sqlStr = `
                select
                    a1.*,
                    c.MATL_PRICE,
                    c.CURR_CD,
                    f.MATL_PRICE as SALES_MATL_PRICE,
                    f.CURR_CD as SALES_CURR_CD,
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
                        b.STATUS_CD as MATL_STATUS_CD,
                        b.VENDOR_CD
                    from
                        ksv_order_mrp a,
                        kcd_matl_mst b
                    where
                        a.prod_cd = '${args.data.PROD_CD}'
                        and a.order_cd = '${args.data.ORDER_CD}'
                        and b.matl_cd = a.matl_cd
                        and a.order_mrp_seq = (
                            select
                                max(a2.order_mrp_seq)
                            from
                                ksv_order_mrp a2
                            where
                                a2.prod_cd = a.prod_cd
                                and a2.order_cd = a.order_cd
                        )
                        ${tSQL}
                ) a1
                left join kcd_matl_mem c 
                    on c.matl_cd = a1.matl_cd
                    and c.matl_seq = (
                        select max(matl_seq)
                        from kcd_matl_mem
                        where matl_cd = a1.matl_cd
                    )
                left join kcd_vendor d 
                    on d.vendor_cd = a1.vendor_cd
                left join kcd_matl_type2 e 
                    on e.seq = a1.matl_type2
                left join kcd_matl_sale f 
                    on f.matl_cd = a1.matl_cd
                    and f.matl_seq = (
                        select max(matl_seq)
                        from kcd_matl_sale
                        where matl_cd = a1.matl_cd
                    )
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
            tRet.forEach((col, i) => {
                var tObj = { ...col };
                if (tObj.ADD_LOSS === null) tObj.ADD_LOSS = '0';
                tObj.S_FLAG = '0';
                tObj.S_MATL_CD = tObj.MATL_CD;
                tObj.S_USE_SIZE = tObj.USE_SIZE;
                tObj.S_REMARK = tObj.REMARK;
                tRetArray.push(tObj);
            });
            return tRetArray;
        },

        mgrQuery_S0306_MRP_RECORD_STYLE_TBL_KSV_PROD_MEM_BY_USAGE: async (
            _,
            args,
        ) => {
            let sqlStr = `
                select
                    a1.*,
                    c.MATL_PRICE,
                    c.CURR_CD,
                    d.VENDOR_NAME,
                    d.STATUS_CD as VENDOR_STATUS_CD,
                    isnull(e.MATL_TYPE2, '') as MATL_TYPE2_N
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
                            b.STATUS_CD as MATL_STATUS_CD,
                            b.VENDOR_CD,
                            c.COLOR as PROD_CD_N
                        from
                            ksv_order_mrp a,
                            kcd_matl_mst b,
                            ksv_prod_mst c
                        where
                            c.style_cd = (
                                select distinct
                                    style_cd
                                from
                                    ksv_prod_mst
                                where
                                    prod_cd = '${args.data.PROD_CD}'
                            )
                            and c.prod_cd = a.prod_cd
                            and b.matl_cd = a.matl_cd
                            and a.remark = '${args.data.REMARK}'
                            and a.order_cd = '${args.data.ORDER_CD}'
                            and a.order_mrp_seq = (
                                select
                                    max(a2.order_mrp_seq)
                                from
                                    ksv_order_mrp a2
                                where
                                    a2.prod_cd = a.prod_cd
                                    and a2.order_cd = a.order_cd
                            )
                    ) a1
                    left join kcd_matl_mem c on c.matl_cd = a1.matl_cd
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
                    a1.prod_cd_n
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
            tRet.forEach((col, i) => {
                var tObj = { ...col };
                if (tObj.ADD_LOSS === null) tObj.ADD_LOSS = '0';
                if (tObj.MRP_CHECK === null) tObj.MRP_CHECK = '';
                tObj.S_FLAG = '0';
                tObj.S_MATL_CD = tObj.MATL_CD;
                tObj.S_USE_SIZE = tObj.USE_SIZE;
                tObj.S_REMARK = tObj.REMARK;
                tRetArray.push(tObj);
            });
            return tRetArray;
        },
    },
};

export default moduleQuery_S0306_MRP_BY_ORDER_TBL_KSV_PROD_MEM;
