import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S030502_1 = {
    Query: {
        mgrQueryS030502_1: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }
            let sqlStr = `
                select
                    a.ORDER_CD,
                    a.TOT_CNT,
                    a.DUE_DATE,
                    a.STYLE_CD,
                    b.STYLE_NAME,
                    c.SIZE_MEMBER
                from
                    ksv_order_mst a,
                    kcd_style b,
                    kcd_size_mst c
                where
                    a.order_cd in (
                        select distinct
                            order_cd
                        from
                            ksv_po_mem
                        where
                            po_cd = '${args.data.PO_CD}'
                    )
                    and a.style_cd = b.style_cd
                    and a.size_group = c.size_group
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            var tRetArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tOne = { ...tRet[tIdx] };

                var tSQL0 = `
                    select
                        *
                    from
                        ksv_order_mem
                    where
                        order_cd = '${tOne.ORDER_CD}'
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(tSQL0));

                var tCols = tOne.SIZE_MEMBER.split(',');

                var tSizeCnts = [];

                tRet0.forEach((col, i) => {
                    var tIdx0 = 0;
                    for (tIdx0 = 0; tIdx0 < tCols.length; tIdx0++) {
                        var tColName = 'SIZE_' + tCols[tIdx0];
                        var tColValue = parseInt(
                            col.SIZE_CNT.substring(tIdx0 * 6, (tIdx0 + 1) * 6),
                        );

                        var tObj1 = {};
                        tObj1.SIZE_NAME = tCols[tIdx0];
                        tObj1.SIZE_CNT = tColValue;
                        tSizeCnts.push(tObj1);
                    }
                });

                tOne.SIZE_CNTS = [...tSizeCnts];
                tRetArray.push(tOne);
            }
            return tRetArray;
        },
        mgrQueryS030502_1_CODE: async (_, args) => {
            var tWObj = {};
            let sqlStr = `
                select
                    PO_CD,
                    PO_SEQ
                from
                    ksv_po_mst
                where
                    po_cd = '${args.data.PO_CD}'
                    and po_seq < 97
            `;
            var tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRet = [];
            tRet0.forEach((col, i) => {
                var tObj = {};
                tObj.CD_CODE = col.PO_SEQ;
                tObj.CD_NAME = col.PO_SEQ;
                tRet.push(tObj);
            });
            var tObj = {};
            tObj.CD_CODE = '';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);

            tWObj.PO_SEQ = tRet;

            let sqlStr = `
                select
                    *
                from
                    kcd_code
                where
                    cd_group = 'SEQ_REASON'
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWObj.SEQ_REASON = tRet;

            return tWObj;
        },
    },
};

export default moduleQuery_S030502_1;
