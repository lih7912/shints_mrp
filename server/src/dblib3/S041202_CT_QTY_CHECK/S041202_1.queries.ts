import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S041202_1 = {
    Query: {
        mgrQueryS041202_1: async (_, args) => {
            var tRetArray = [];

            var sqlStr = `
                select
                    b.VENDOR_NAME,
                    isnull(b.permit, '') as PERMIT,
                    0 as CT_QTY,
                    0 as CT_QTY2,
                    0 as TOT,
                    b.VENDOR_CD,
                    a.REG_USER,
                    b.VENDOR_MATL_TYPE
                from
                    ksv_stock_out_temp a,
                    kcd_vendor b
                where
                    a.vendor_cd = b.vendor_cd
                    and a.pack_cd like '${args.data.PACK_CD}%'
                    and a.reg_user = '${args.data.USER_ID}'
                group by
                    b.vendor_name,
                    b.permit,
                    b.vendor_cd,
                    a.reg_user,
                    b.vendor_matl_type
                order by
                    b.vendor_matl_type,
                    b.vendor_name
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tInputOne = { ...tRet[tIdx] };

                var tVendorCd = tInputOne.VENDOR_CD;

                var tTot = 0;

                var tCtQty = 0;
                let sqlStr1 = `
                    select distinct
                        ct_qty,
                        remark,
                        ct_no
                    from
                        ksv_stock_out_temp
                    where
                        pack_cd = '${args.data.PACK_CD}'
                        and reg_user = '${args.data.USER_ID}'
                        and vendor_cd = '${tVendorCd}'
                        and upper(remark) like '%MIX%'
                `;
                let tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));
                tRet1.forEach((col, i) => {
                    tCtQty += col.ct_qty;
                });

                let sqlStr1 = `
                    select distinct
                        ct_qty,
                        remark,
                        ct_no
                    from
                        ksv_stock_out_temp
                    where
                        pack_cd = '${args.data.PACK_CD}'
                        and reg_user = '${args.data.USER_ID}'
                        and vendor_cd = '${tVendorCd}'
                        and upper(remark) not like '%MIX%'
                `;
                let tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));
                tRet1.forEach((col, i) => {
                    tCtQty += col.ct_qty;
                });

                var tCtQty2 = 0;
                let sqlStr1 = `
                    select distinct
                        ct_qty,
                        remark,
                        ct_no
                    from
                        ksv_stock_out_temp
                    where
                        pack_cd = '${args.data.PACK_CD}D'
                        and reg_user = '${args.data.USER_ID}'
                        and vendor_cd = '${tVendorCd}'
                        and upper(remark) like '%MIX%'
                `;
                let tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));
                tRet1.forEach((col, i) => {
                    tCtQty2 += col.ct_qty;
                });

                let sqlStr1 = `
                    select distinct
                        ct_qty,
                        remark,
                        ct_no
                    from
                        ksv_stock_out_temp
                    where
                        pack_cd = '${args.data.PACK_CD}D'
                        and reg_user = '${args.data.USER_ID}'
                        and vendor_cd = '${tVendorCd}'
                        and upper(remark) not like '%MIX%'
                `;
                let tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));
                tRet1.forEach((col, i) => {
                    tCtQty2 += col.ct_qty;
                });

                tTot = tCtQty + tCtQty2;

                tInputOne.CT_QTY = tCtQty;
                tInputOne.CT_QTY2 = tCtQty2;
                tInputOne.TOT = tTot;

                tRetArray.push(tInputOne);
            }

            return tRetArray;
        },

        mgrQueryS041202_2: async (_, args) => {
            var tRetArray = [];

            var sqlStr = `
                select
                    b.VENDOR_NAME,
                    isnull(c.permit, '') as PERMIT,
                    0 as CT_QTY,
                    0 as CT_QTY2,
                    0 as TOT,
                    b.VENDOR_CD,
                    a.REG_USER,
                    b.VENDOR_MATL_TYPE
                from
                    ksv_stock_out_temp a
                    left join ksv_stock_out_temp_permit c on c.pack_cd = left(a.pack_cd, 11)
                    and c.vendor_cd = a.vendor_cd,
                    kcd_vendor b
                where
                    a.vendor_cd = b.vendor_cd
                    and a.pack_cd like '${args.data.PACK_CD}%'
                    and a.reg_user = '${args.data.USER_ID}'
                group by
                    b.vendor_name,
                    c.permit,
                    b.vendor_cd,
                    a.reg_user,
                    b.vendor_matl_type
                order by
                    b.vendor_matl_type,
                    b.vendor_name
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tInputOne = { ...tRet[tIdx] };

                var tVendorCd = tInputOne.VENDOR_CD;

                var tTot = 0;

                var tCtQty = 0;
                let sqlStr1 = `
                    select distinct
                        ct_qty,
                        remark,
                        ct_no
                    from
                        ksv_stock_out_temp
                    where
                        pack_cd = '${args.data.PACK_CD}'
                        and reg_user = '${args.data.USER_ID}'
                        and vendor_cd = '${tVendorCd}'
                        and upper(remark) like '%MIX%'
                `;
                let tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));
                tRet1.forEach((col, i) => {
                    tCtQty += col.ct_qty;
                });

                let sqlStr1 = `
                    select distinct
                        ct_qty,
                        remark,
                        ct_no
                    from
                        ksv_stock_out_temp
                    where
                        pack_cd = '${args.data.PACK_CD}'
                        and reg_user = '${args.data.USER_ID}'
                        and vendor_cd = '${tVendorCd}'
                        and upper(remark) not like '%MIX%'
                `;
                let tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));
                tRet1.forEach((col, i) => {
                    tCtQty += col.ct_qty;
                });

                var tCtQty2 = 0;
                let sqlStr1 = `
                    select distinct
                        ct_qty,
                        remark,
                        ct_no
                    from
                        ksv_stock_out_temp
                    where
                        pack_cd = '${args.data.PACK_CD}D'
                        and reg_user = '${args.data.USER_ID}'
                        and vendor_cd = '${tVendorCd}'
                        and upper(remark) like '%MIX%'
                `;
                let tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));
                tRet1.forEach((col, i) => {
                    tCtQty2 += col.ct_qty;
                });

                let sqlStr1 = `
                    select distinct
                        ct_qty,
                        remark,
                        ct_no
                    from
                        ksv_stock_out_temp
                    where
                        pack_cd = '${args.data.PACK_CD}D'
                        and reg_user = '${args.data.USER_ID}'
                        and vendor_cd = '${tVendorCd}'
                        and upper(remark) not like '%MIX%'
                `;
                let tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));
                tRet1.forEach((col, i) => {
                    tCtQty2 += col.ct_qty;
                });

                tTot = tCtQty + tCtQty2;

                tInputOne.CT_QTY = tCtQty;
                tInputOne.CT_QTY2 = tCtQty2;
                tInputOne.TOT = tTot;

                tRetArray.push(tInputOne);
            }

            return tRetArray;
        },
    },
};

export default moduleQuery_S041202_1;
