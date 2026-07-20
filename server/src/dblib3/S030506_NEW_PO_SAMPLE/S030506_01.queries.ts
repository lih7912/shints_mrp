import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S030506_01 = {
    Query: {
        mgrQueryS030506_01_CODE_VENDOR: async (_, args) => {
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

        mgrQueryS030506_01_CODE_BUYER: async (_, args) => {
            let sqlStr = `
                select
                    *
                from
                    kcd_buyer
                where
                    (
                        buyer_cd like '%${args.data.BUYER_CD}%'
                        or buyer_name like '%${args.data.BUYER_CD}%'
                    )
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            return tRet;
        },

        mgrQueryS030506_01_CODE: async (_, args) => {
            var tWObj = {};

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
            let tObj = {};
            tObj.CD_CODE = '';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.FARE_TYPE = tRet;

            let sqlStr = `
                select
                    *
                from
                    kcd_factory
                where
                    factory_cd in ('FC010', 'FC034', 'FC044')
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tObj = {};
            tObj.FACTORY_CD = '';
            tObj.FACTORY_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.FACTORY_CD = tRet;

            let sqlStr = `
                select
                    top 1000 *
                from
                    kcd_buyer
                where
                    status_cd = '0'
                order by
                    reg_datetime desc
            `;
            let tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tRet = [];
            tRet0.forEach((col, i) => {
                var tObj = { ...col };
                tObj.BUYER_NAME = `(${col.BUYER_CD})${col.BUYER_NAME})`;
                tRet.push(tObj);
            });
            let tObj = {};
            tObj.BUYER_CD = ' ';
            tObj.BUYER_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.BUYER_CD = tRet;

            let sqlStr = `
                select
                    *
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

            let sqlStr = `
                select
                    *
                from
                    kcd_place
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tObj = {};
            tObj.PLACE_CD = ' ';
            tObj.PLACE_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.PLACE_CD = tRet;

            let tArray = [];
            let tObj1 = {};
            tObj1.CD_CODE = '';
            tObj1.CD_NAME = ' ';
            tArray.push(tObj1);

            let tObj1 = {};
            tObj1.CD_CODE = '0';
            tObj1.CD_NAME = 'Sample';
            tArray.push(tObj1);

            let tObj2 = {};
            tObj2.CD_CODE = '1';
            tObj2.CD_NAME = 'Storage';
            tArray.push(tObj2);

            let tObj3 = {};
            tObj3.CD_CODE = '2';
            tObj3.CD_NAME = 'Factory FOB';
            tArray.push(tObj3);
            tWObj.PO_TYPE = tArray;

            let tObj3 = {};
            tObj3.CD_CODE = '3';
            tObj3.CD_NAME = 'Factory Sample';
            tArray.push(tObj3);
            tWObj.PO_TYPE = tArray;

            let tObj3 = {};
            tObj3.CD_CODE = '4';
            tObj3.CD_NAME = 'HQ Sample';
            tArray.push(tObj3);
            tWObj.PO_TYPE = tArray;

            return tWObj;
        },

        mgrQueryS030506_LIST_1: async (_, args) => {
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
                    A.USE_QTY, -- po_qty
                    E.CD_NAME as PO_TYPE_NAME, -- po_type_name
                    A.REASON_TYPE, -- REASON
                    A.FARE_TYPE, -- FARE
                    isnull(H.REMARK, '') as REMARK, -- REMARK
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
                    G.factory_cd as FACTORY_CD, -- factory_cd
                    A.STOCK_IDX, -- stock_idx
                    A.REMARK as REMARK2, -- order_cd 
                    '' as PLAN_REMARK, -- order_cd 
                    B.VENDOR_CD, -- vendor_cd
                    A.ORDER_CD as ORDER_CD, -- order_cd
                    A.PO_SEQ as PO_SEQ, -- use_po_seq
                    G.PO_TYPE, -- use_po_seq
                    G.PO_DATE, -- use_po_seq
                    G.MATL_DUE_DATE as MATERIAL_DUE_DATE, -- use_po_seq
                    G.PROD_DUE_DATE as DELIVERY_DATE, -- use_po_seq
                    G.PLACE_CD, -- use_po_seq,
                    F.BUYER_NAME,
                    A.PO_MATL_CD,
                    H.SAMPLE_FLAG,
                    H.fac_lc_flag as FAC_LC_FLAG,
                    I.FACTORY_NAME
                FROM
                    KSV_PO_MRP A,
                    KCD_MATL_MST B,
                    KCD_MATL_MEM C,
                    KCD_VENDOR D,
                    KCD_CODE E,
                    KSV_PO_MST G,
                    KCD_BUYER F,
                    KSV_ORDER_MST H,
                    KCD_FACTORY I
                WHERE
                    A.PO_CD = '${args.data.PO_CD}'
                    AND A.PO_SEQ like '%${args.data.PO_SEQ}%'
                    AND A.PO_CD = G.PO_CD
                    and A.PO_SEQ = G.PO_SEQ
                    AND A.USE_PO_TYPE = '1'
                    AND B.MATL_CD = A.MATL_CD
                    AND C.MATL_CD = A.MATL_CD
                    AND C.MATL_SEQ = A.MATL_SEQ
                    AND D.VENDOR_CD = B.VENDOR_CD
                    AND A.ORDER_CD = H.ORDER_CD
                    AND E.CD_GROUP = 'USE_PO_TYPE'
                    AND E.CD_CODE = A.USE_PO_TYPE
                    AND F.BUYER_CD = left(A.ORDER_CD, 2)
                    AND G.FACTORY_CD = I.FACTORY_CD
                ORDER BY
                    A.MRP_SEQ
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tObj = { ...tRet[tIdx] };
                if (tObj.PO_MATL_CD.includes('재고')) {
                    let sqlStr3 = `
                        select
                            isnull(sum(po_qty), 0) as po_qty
                        from
                            ksv_po_mrp
                        where
                            po_cd = '${args.data.PO_CD}'
                            and po_matl_cd = '${tObj.MATL_CD}'
                            and use_po_type = '2'
                    `;
                    var tRet3 = await prisma.$queryRaw(Prisma.raw(sqlStr3));
                    if (tRet3.length > 0) {
                        tObj.STOCK_QTY = tRet3[0].po_qty;
                        tObj.PO_QTY = String(
                            parseFloat(tObj.PO_QTY) +
                                parseFloat(tObj.STOCK_QTY),
                        );
                    }
                }

                var tPoType = '0';
                /*
           if (tObj.PO_TYPE === 'S' && tObj.SAMPLE_FLAG === '1' && tObj.FAC_LC_FLAG === '0') tPoType = '0';
           else if (tObj.PO_TYPE === 'T' && tObj.SAMPLE_FLAG === '0' && tObj.FAC_LC_FLAG === '0') tPoType = '1';
           else if (tObj.PO_TYPE === 'F' && tObj.SAMPLE_FLAG === '1' && tObj.FAC_LC_FLAG === '0') tPoType = '3';
           else if (tObj.PO_TYPE === 'F' && tObj.SAMPLE_FLAG === '0' && tObj.FAC_LC_FLAG === '1') tPoType = '2';
           tObj.PO_TYPE = tPoType;
           */
                var tPoType0 = args.data.PO_CD.substring(0, 2);
                if (tPoType0 === 'PS') {
                    if (tObj.SAMPLE_FLAG === '1') {
                        tObj.PO_TYPE = '0';
                        tObj.PO_TYPE_NAME = 'Sample';
                    }
                } else if (tPoType0 === 'PT') {
                    if (tObj.SAMPLE_FLAG === '0') {
                        tObj.PO_TYPE = '1';
                        tObj.PO_TYPE_NAME = 'Storage';
                    }
                } else if (tPoType0 === 'PF') {
                    if (tObj.SAMPLE_FLAG === '1') {
                        tObj.PO_TYPE = '3';
                        tObj.PO_TYPE_NAME = 'Factory Sample';
                    } else if (tObj.FAC_LC_FLAG === '1') {
                        tObj.PO_TYPE = '2';
                        tObj.PO_TYPE_NAME = 'Factory FOB';
                    }
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
                    and a.po_seq like '%${args.data.PO_SEQ}%'
                    -- and a.po_seq > 1 
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

export default moduleQuery_S030506_01;
