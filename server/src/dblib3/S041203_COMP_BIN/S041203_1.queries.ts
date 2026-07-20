import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S041203_1 = {
    Query: {
        mgrQueryS041203_CODE: async (_, args) => {
            var tWObj = {};

            let sqlStr = `
                select
                    HS_CD + '-' + HS_NAME as HS_NAME,
                    HS_NO,
                    HS_CD
                from
                    kcd_hscode
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.HS_NAME = ' ';
            tObj.HS_NO = ' ';
            tRet.unshift(tObj);
            tWObj.HS_CODE = tRet;

            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_code
                where
                    cd_group = 'COMPOSITION'
                ORDER BY
                    CD_CODE
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_NAME = ' ';
            tObj.CD_CODE = ' ';
            tRet.unshift(tObj);
            tWObj.COMP = tRet;

            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_code
                where
                    cd_group = 'MATL_TYPE'
                ORDER BY
                    CD_CODE
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_NAME = ' ';
            tObj.CD_CODE = ' ';
            tRet.unshift(tObj);
            tWObj.MATL_TYPE = tRet;

            return tWObj;
        },

        mgrQueryS041203_1: async (_, args) => {
            var tRetArray = [];

            var sqlStr = `
                SELECT DISTINCT
                    E.VENDOR_NAME,
                    B.MATL_NAME,
                    B.SPEC,
                    (
                        CASE
                            WHEN B.WIDTH <> '' THEN B.WIDTH
                            WHEN CHARINDEX(' ', B.SPEC) = 0 THEN B.SPEC
                            ELSE LEFT(B.SPEC, CHARINDEX(' ', B.SPEC))
                        END
                    ) AS WIDTH,
                    B.WEIGHT,
                    D.HS_CD + '-' + D.HS_NAME AS HS_NAME,
                    B.HS_CD,
                    isnull(C.COMP1, '') as COMP1,
                    isnull(C.COMP1_PERCENT, 0) as COMP1_PERCENT,
                    isnull(C.COMP2, '') as COMP2,
                    isnull(C.COMP2_PERCENT, 0) as COMP2_PERCENT,
                    isnull(C.COMP3, '') as COMP3,
                    isnull(C.COMP3_PERCENT, 0) as COMP3_PERCENT,
                    isnull(C.COMP4, '') as COMP4,
                    isnull(C.COMP4_PERCENT, 0) as COMP4_PERCENT
                FROM
                    KSV_STOCK_OUT A,
                    KCD_MATL_MST B
                    LEFT JOIN KCD_HSCODE D ON D.HS_NO = B.HS_CD
                    LEFT JOIN KCD_COMPOSITION C ON B.MATL_NAME = C.MATL_NAME,
                    KCD_VENDOR E
                WHERE
                    A.MATL_CD = B.MATL_CD
                    AND B.VENDOR_CD = E.VENDOR_CD
                    AND B.MATL_CD = A.MATL_CD
                    AND A.PACK_CD LIKE '${args.data.PACK_CD}%'
                ORDER BY
                    1
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

export default moduleQuery_S041203_1;
