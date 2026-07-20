import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0505_2 = {
    Query: {
        mgrQueryS0505_2: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }

            var tWObj = {};

            let sqlStr = `
                SELECT
                    B.VENDOR_NAME,
                    A.PR_NUM,
                    A.MATL_CD,
                    C.MATL_NAME,
                    C.COLOR,
                    C.SPEC,
                    C.UNIT,
                    D.CURR_CD,
                    D.MATL_PRICE,
                    A.TOT_CNT,
                    A.ORD_CNT,
                    isnull(A.STOCK_QTY, 0) as STOCK_QTY,
                    A.REMARK,
                    A.REMARK_BVT,
                    B.VENDOR_TYPE,
                    B.PAY_TERM,
                    B.VENDOR_TYPE
                FROM
                    KSV_PO_MATLLIST A,
                    KCD_VENDOR B,
                    KCD_MATL_MST C,
                    KCD_MATL_MEM D
                WHERE
                    A.PO_CD = '${args.data.PO_NO}'
                    AND B.VENDOR_CD = A.VENDOR_CD
                    AND C.MATL_CD = A.MATL_CD
                    AND C.MATL_NAME LIKE '%%' ESCAPE '['
                    AND C.VENDOR_CD LIKE '%'
                    AND C.COLOR LIKE '%%'
                    AND C.SPEC LIKE '%%'
                    AND C.UNIT LIKE '%'
                    AND D.MATL_CD = A.MATL_CD
                    AND D.MATL_SEQ = (
                        SELECT
                            MAX(MATL_SEQ)
                        FROM
                            KCD_MATL_MEM
                        WHERE
                            MATL_CD = A.MATL_CD
                    )
                ORDER BY
                    B.VENDOR_NAME,
                    LEN(A.PR_NUM),
                    A.PR_NUM
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tArray0 = [];
            let tIdx0 = 0;
            for (tIdx0 = 0; tIdx0 < tRet.length; tIdx0++) {
                let tOne = { ...tRet[tIdx0] };
                let sql0 = `
                    select
                        sum(out_qty) as STS_OUT_QTY
                    from
                        ksv_stock_out
                    where
                        po_cd = '${args.data.PO_NO}'
                        and matl_cd = '${tOne.MATL_CD}'
                        and out_status = '0'
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                tOne.STS_OUT_QTY = 0;
                if (tRet0.length > 0) tOne.STS_OUT_QTY = tRet0[0].STS_OUT_QTY;
                tArray0.push(tOne);
            }
            tWObj.DATA1 = tArray0;

            let sqlStr = `
                select distinct
                    IN_DATE,
                    DELIVERY
                from
                    ksv_stock_facin
                where
                    po_cd = '${args.data.PO_NO}'
                order by
                    in_date,
                    delivery
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWObj.DATA2 = tRet;

            let sqlStr = `
                select
                    a.IN_DATE,
                    a.DELIVERY,
                    a.MATL_CD,
                    sum(a.in_qty) as IN_QTY
                from
                    ksv_stock_facin a
                where
                    a.po_cd = '${args.data.PO_NO}'
                group by
                    a.in_date,
                    a.delivery,
                    a.matl_cd
                order by
                    a.in_date,
                    a.delivery,
                    a.matl_cd
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWObj.DATA3 = tRet;

            let sqlStr = `
                select
                    a.MATL_CD,
                    sum(a.in_qty) as IN_QTY
                from
                    ksv_stock_facin a
                where
                    a.po_cd = '${args.data.PO_NO}'
                group by
                    a.matl_cd
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWObj.DATA4 = tRet;

            let sqlStr = `
                select
                    a.MATL_CD,
                    a.ETC_TYPE,
                    sum(a.etc_qty) as IN_QTY
                from
                    ksv_stock_facetc a
                where
                    a.po_cd = '${args.data.PO_NO}'
                group by
                    a.matl_cd,
                    a.etc_type
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWObj.DATA5 = tRet;

            return tWObj;
        },
    },
};

export default moduleQuery_S0505_2;
