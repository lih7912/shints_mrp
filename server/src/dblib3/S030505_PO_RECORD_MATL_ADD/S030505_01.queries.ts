import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S030505_01 = {
    Query: {
        mgrQueryS030505_01_CODE_VENDOR: async (_, args) => {
            let sqlStr = `
                select
                    *
                from
                    kcd_vendor
                where
                    status_cd = '0'
                    and (
                        vendor_cd like '%${args.data.VENDOR_CD}%'
                        or vendor_name like '%${args.data.VENDOR_CD}%'
                    )
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            return tRet;
        },

        mgrQueryS030505_01_CODE: async (_, args) => {
            var tWObj = {};

            if (args.data.PO_CD !== '') {
                let sqlStr = `
                    SELECT distinct
                        a.ORDER_CD
                    FROM
                        KSV_PO_MEM a,
                        ksv_order_mst b
                    WHERE
                        a.PO_CD = '${args.data.PO_CD}'
                        and a.order_cd = b.order_cd
                        and b.order_status not in ('8', '9')
                        and a.po_seq = 1
                    ORDER BY
                        a.order_cd
                `;
                let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
                let tObj = {};
                tObj.ORDER_CD = ' ';
                tRet.unshift(tObj);
                tWObj.ORDER_CD = tRet;
                console.log(tWObj.ORDER_CD);

                let sqlStr = `
                    select
                        PO_CD,
                        PO_SEQ
                    from
                        ksv_po_mst
                    where
                        po_cd = '${args.data.PO_CD}'
                        and po_seq > 100
                `;
                let tArray1 = [];
                let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
                let tObj = {};
                tObj.PO_CD = '';
                tObj.PO_SEQ = ' ';
                tRet.unshift(tObj);
                tWObj.PO_CD = tRet;

                /*
                let sqlStr = `
                    select distinct
                        a.FACTORY_CD,
                        b.FACTORY_NAME
                    from
                        ksv_po_mst a,
                        kcd_factory b
                    where
                        a.po_cd = '${args.data.PO_CD}'
                        and a.factory_cd = b.factory_cd
                `;
                */
               let sqlStr = `
                    select FACTORY_CD, FACTORY_NAME from KCD_FACTORY where FACTORY_CD in ('FC034', 'FC044')
               `;
                let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
                tWObj.FACTORY_CD = tRet;

                let sqlStr = `
                    select
                        *
                    from
                        kcd_code
                    where
                        cd_group = 'DELIVERY_TYPE'
                `;
                let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
                let tObj = {};
                tObj.CD_CODE = '';
                tObj.CD_NAME = ' ';
                tRet.unshift(tObj);
                tWObj.DELIVERY_TYPE = tRet;

                /*
       let sqlStr = `
           select
               top 1000 *
           from
               kcd_vendor
           where
               status_cd = '0'
           order by
               reg_datetime desc
       `;
       let tRet  =  await prisma.$queryRaw(Prisma.raw(sqlStr));
*/
                let tRet = [];
                let tObj = {};
                tObj.VENDOR_CD = ' ';
                tObj.VENDOR_NAME = ' ';
                tRet.unshift(tObj);
                tWObj.VENDOR_CD = tRet;

                let sqlStr = `
                    select
                        *
                    from
                        kcd_code
                    where
                        cd_group = 'REASON_TYPE'
                `;
                let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
                let tObj = {};
                tObj.CD_CODE = '';
                tObj.CD_NAME = ' ';
                tRet.unshift(tObj);
                tWObj.REASON_TYPE = tRet;

                let sqlStr = `
                    select
                        *
                    from
                        kcd_code
                    where
                        cd_group = 'FARE_TYPE'
                `;
                let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
                tWObj.FARE_TYPE = tRet;

                return tWObj;
            }

            let sqlStr = `
                select
                    *
                from
                    kcd_code
                where
                    cd_group = 'DELIVERY_TYPE'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tObj = {};
            tObj.CD_CODE = ' ';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.DELIVERY_TYPE = tRet;

            let sqlStr = `
                select
                    *
                from
                    kcd_factory
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tObj = {};
            tObj.FACTORY_CD = ' ';
            tObj.FACTORY_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.FACTORY_CD = tRet;

            tWObj.ORDER_CD = [];

            let sqlStr = `
                select
                    top 1000 *
                from
                    kcd_vendor
                where
                    status_cd = '0'
                order by
                    reg_datetime desc
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tObj = {};
            tObj.VENDOR_CD = ' ';
            tObj.VENDOR_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.VENDOR_CD = tRet;

            return tWObj;
        },

        mgrQueryS030505_LIST_1: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }
            let sqlStr = `
                SELECT
                    A.MATL_CD, -- matl_cd
                    B.MATL_NAME, -- matl_name
                    B.COLOR, -- color
                    B.SPEC, -- spec
                    C.MATL_PRICE, -- matL_price
                    C.CURR_CD, -- curr_cd
                    B.UNIT, -- unit
                    0 as STOCK_QTY, -- STOCK_QTY
                    A.PO_QTY, -- po_qty
                    E.CD_NAME as PO_TYPE_NAME, -- po_type_name
                    A.REASON_TYPE, -- REASON
                    A.FARE_TYPE, -- FARE
                    A.REMARK, -- REMARK
                    D.VENDOR_NAME, -- Vendor_name
                    '' as STOCK_STATUS, --  stock_status
                    A.USE_PO_TYPE, -- use_po_type
                    A.PO_CD as USE_PO_CD, -- use_po_cd
                    A.PO_SEQ as USE_PO_SEQ, -- use_po_seq
                    A.ORDER_CD as USE_ORDER_CD, -- use_order_cd
                    A.MATL_CD as USE_MATL_CD, -- use_matl_cd
                    A.MRP_SEQ as USE_MRP_SEQ, -- use_mrp_seq
                    A.MATL_SEQ as USE_MATL_SEQ, -- use_matl_seq
                    A.MATL_SEQ, -- matl_seq
                    '' as FACTORY_CD, -- factory_cd
                    A.STOCK_IDX, -- stock_idx
                    A.REMARK as REMARK2, -- order_cd 
                    '' as PLAN_REMARK, -- order_cd 
                    B.VENDOR_CD, -- vendor_cd
                    A.ORDER_CD as ORDER_CD -- order_cd
                FROM
                    KSV_PO_MRP A,
                    KCD_MATL_MST B,
                    KCD_MATL_MEM C,
                    KCD_VENDOR D,
                    KCD_CODE E
                WHERE
                    A.PO_CD = '${args.data.PO_CD}'
                    -- AND  A.ORDER_CD  = '${args.data.ORDER_CD}' 
                    AND A.PO_SEQ = '${args.data.PO_SEQ}'
                    AND A.PO_SEQ > 1
                    AND B.MATL_CD = A.MATL_CD
                    AND C.MATL_CD = A.MATL_CD
                    AND C.MATL_SEQ = A.MATL_SEQ
                    AND D.VENDOR_CD = B.VENDOR_CD
                    AND E.CD_GROUP = 'USE_PO_TYPE'
                    AND E.CD_CODE = A.USE_PO_TYPE
                ORDER BY
                    A.MRP_SEQ
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tObj = { ...tRet[tIdx] };
                if (tObj.USE_PO_TYPE === '2') {
                    let sqlStr3 = `
                        select
                            remain_qty
                        from
                            ksv_stock_matl
                        where
                            stock_idx = '${tObj.STOCK_IDX}'
                    `;
                    var tRet3 = await prisma.$queryRaw(Prisma.raw(sqlStr3));
                    if (tRet3.length > 0) tObj.STOCK_QTY = tRet3[0].remain_qty;
                }
                tArray.push(tObj);
            }

            let sqlStr1 = `
                select
                    a.FACTORY_CD,
                    b.FACTORY_NAME,
                    a.DELIVERY_TYPE,
                    isnull(c.cd_name, ' ') as DELIVERY_TYPE_N,
                    a.CURR_DATE
                from
                    ksv_po_mst a
                    left join kcd_code c on c.cd_group = 'DELIVERY_TYPE'
                    and c.cd_code = a.delivery_type,
                    kcd_factory b
                where
                    a.po_cd = '${args.data.PO_CD}'
                    and a.po_seq = '${args.data.PO_SEQ}'
                    and a.po_seq > 1
                    and b.factory_cd = a.factory_cd
                order by
                    a.po_seq
            `;
            var tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));

            var tWObj = {};
            tWObj.PO_MRP = tArray;
            tWObj.DELIVERY_TYPE = tRet1;

            return tWObj;
        },
    },
};

export default moduleQuery_S030505_01;
