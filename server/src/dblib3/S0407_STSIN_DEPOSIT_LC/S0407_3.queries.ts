import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0407_3 = {
    Query: {
        mgrQueryS0407_3_1: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }

            let sqlStr = `
                select distinct
                    a.PO_CD
                from
                    ksv_po_mst a,
                    ksv_stock_mem b
                where
                    a.po_status = '4'
                    and a.new_flag = '0'
                    and b.po_cd = a.po_cd
                    and b.po_seq = a.po_seq
                    and b.po_qty > 0
                    and b.stock_status = '0'
                    and a.po_cd like '%${args.data.PO_CD}%'
                order by
                    a.po_cd
            `;

            let sqlStr1 = `
                select distinct
                    a.PO_CD
                from
                    ksv_po_mst a,
                    ksv_stock_mem b
                where
                    a.po_status = '4'
                    and a.new_flag = '0'
                    and b.po_cd = a.po_cd
                    and b.po_seq = a.po_seq
                    and b.matl_cd in (
                        select
                            a1.matl_cd
                        from
                            kcd_matl_mst a1,
                            kcd_vendor b1
                        where
                            a1.vendor_cd = b1.vendor_cd
                            and b1.vendor_type = '${args.data.VENDOR_TYPE}'
                    )
                    and b.stock_status = '0'
                    and b.po_qty > 0
                    and a.po_cd like '%${args.data.PO_CD}%'
                order by
                    a.po_cd
            `;

            var tRet = [];

            if (args.data.VENDOR_TYPE === '') {
                tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            } else {
                tRet = await prisma.$queryRaw(Prisma.raw(sqlStr1));
            }
            return tRet;
        },

        mgrQueryS0407_3_2: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }

            var tPoCds = '';
            args.data.PO_CD_ARRAY.forEach((col, i) => {
                if (i >= args.data.PO_CD_ARRAY.length - 1) {
                    tPoCds += `'${col}'`;
                } else {
                    tPoCds += `'${col}',`;
                }
            });

            let sqlStr = `
                select distinct
                    b.VENDOR_NAME,
                    c.VENDOR_CD
                from
                    ksv_stock_mem a,
                    kcd_vendor b,
                    kcd_matl_mst c
                where
                    a.po_cd in (${tPoCds})
                    and b.vendor_cd = c.vendor_cd
                    and b.vendor_type like '%'
                    and b.vendor_name like '%%'
                    and c.matl_cd = a.matl_cd
                order by
                    b.vendor_name
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            return tRet;
        },

        mgrQueryS0407_3: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }

            var tPoCds = '';
            args.data.PO_CD_ARRAY.forEach((col, i) => {
                if (i >= args.data.PO_CD_ARRAY.length - 1) {
                    tPoCds += `'${col}'`;
                } else {
                    tPoCds += `'${col}',`;
                }
            });

            let sqlStr = `
                SELECT
                    B.MATL_NAME,
                    B.COLOR,
                    B.SPEC,
                    B.UNIT,
                    C.MATL_PRICE,
                    SUM(A.PO_QTY) AS PO_QTY,
                    0 AS LC_QTY,
                    B.MATL_CD,
                    E.CD_NAME AS MATL_CONF_FLAG_N,
                    C.CONF_FLAG,
                    C.CURR_CD,
                    A.TEMP_PRICE
                FROM
                    KSV_STOCK_MEM A,
                    KCD_MATL_MST B,
                    KCD_MATL_MEM C,
                    KCD_VENDOR D,
                    KCD_CODE E
                WHERE
                    A.PO_CD IN (${tPoCds})
                    AND A.DIFF_PO_TYPE <> '2'
                    AND B.VENDOR_CD = '${args.data.VENDOR_CD}'
                    AND B.MATL_CD = A.MATL_CD
                    AND C.MATL_CD = A.MATL_CD
                    AND C.MATL_SEQ = A.MATL_SEQ
                    AND D.VENDOR_CD = B.VENDOR_CD
                    AND E.CD_GROUP = 'MATL_CONF_FLAG'
                    AND E.CD_CODE = C.CONF_FLAG
                GROUP BY
                    B.MATL_NAME,
                    B.COLOR,
                    B.SPEC,
                    B.UNIT,
                    C.MATL_PRICE,
                    B.MATL_CD,
                    E.CD_NAME,
                    C.CONF_FLAG,
                    C.CURR_CD,
                    A.TEMP_PRICE
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            var tIdx = 0;
            var tRetArray = [];
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tObjOne = { ...tRet[tIdx] };
                let sqlStr1 = `
                    select
                        isnull(sum(lc_qty), 0) as lc_qty
                    from
                        ksv_stock_in
                    where
                        po_cd in (${tPoCds})
                        and matl_cd = '${tObjOne.MATL_CD}'
                `;
                var tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));

                tObjOne.LC_QTY = tRet1[0].lc_qty;
                tRetArray.push(tObjOne);
            }

            return tRetArray;
        },
    },
};

export default moduleQuery_S0407_3;
