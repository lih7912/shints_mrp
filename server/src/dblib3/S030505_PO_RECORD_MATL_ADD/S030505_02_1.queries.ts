import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S030505_02_1 = {
    Query: {
        mgrQueryS030505_02_1: async (_, args) => {
            var tSQL = '';
            if (args.data.MATL_CD !== '') {
                tSQL += `AND A.MATL_CD  like '${args.data.MATL_CD}%' `;
            }
            if (args.data.MATL_NAME !== '') {
                tSQL += `AND B.MATL_NAME  like '%${args.data.MATL_NAME}%' `;
            }
            if (args.data.COLOR !== '') {
                tSQL += `AND B.COLOR  like '%${args.data.COLOR}%' `;
            }
            if (args.data.SPEC !== '') {
                tSQL += `AND B.SPEC  like '%${args.data.SPEC}%' `;
            }
            if (args.data.VENDOR_CD !== '') {
                tSQL += `AND (C.VENDOR_CD  like '%${args.data.VENDOR_CD}%' OR `;
                tSQL += `     C.VENDOR_NAME  like '%${args.data.VENDOR_CD}%' ) `;
            }

            let sqlStr = `
                SELECT
                    A.MATL_CD, -- matl-cd
                    B.MATL_NAME, -- matl_name
                    B.COLOR, -- color
                    B.SPEC, -- spec
                    D.MATL_PRICE, -- matl_price
                    D.CURR_CD, -- curr_cd
                    B.UNIT, -- unit
                    A.REMAIN_QTY AS STOCK_QTY,
                    0 AS PO_QTY,
                    '재고사용' AS PO_TYPE_NAME,
                    0 AS REASON_TYPE,
                    0 AS FARE_TYPE,
                    '' AS REMARK,
                    C.VENDOR_NAME,
                    A.STOCK_STATUS AS STOCK_STATUS,
                    '2' AS USE_PO_TYPE,
                    A.PO_CD as USE_PO_CD,
                    A.PO_SEQ as USE_PO_SEQ,
                    A.ORDER_CD as USE_ORDER_CD,
                    A.MRP_SEQ as USE_MRP_SEQ,
                    A.MATL_SEQ as USE_MATL_SEQ,
                    A.MATL_SEQ as MATL_SEQ,
                    A.FACTORY_CD,
                    A.STOCK_IDX,
                    A.REMARK as REMARK2,
                    A.PLAN_REMARK as PLAN_REMARK,
                    B.VENDOR_CD,
                    '' as ORDER_CD
                FROM
                    KSV_STOCK_MATL A,
                    KCD_MATL_MST B,
                    KCD_VENDOR C,
                    KCD_MATL_MEM D
                WHERE
                    A.STOCK_STATUS IN (
                        '3',
                        '5',
                        'M',
                        'Y',
                        'F',
                        'R',
                        'P',
                        'C',
                        'G',
                        'U',
                        'I',
                        'H',
                        'A',
                        'W',
                        'N'
                    )
                    AND A.FACTORY_CD = '${args.data.FACTORY_CD}' ${tSQL}
                    AND A.REMAIN_QTY >= 1
                    AND B.MATL_CD = A.MATL_CD
                    AND C.VENDOR_CD = B.VENDOR_CD
                    AND D.MATL_CD = A.MATL_CD
                    AND D.MATL_SEQ = A.MATL_SEQ
                ORDER BY
                    A.MATL_CD
                    -- OFFSET 0 ROWS FETCH NEXT 1000 ROWS ONLY
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                MATL_CD: '',
                MATL_NAME: '',
                COLOR: '',
                SPEC: '',
                MATL_PRICE: 0,
                CURR_CD: '',
                UNIT: '',
                STOCK_QTY: 0,
                PO_QTY: 0,
                IS_STOCK: '',
                COL2: 0,
                COL3: 0,
                COL4: '',
                VENDOR_NAME: '',
                STOCK_STATUS: '',
                COL6: '',
                PO_CD: '',
                PO_SEQ: 0,
                ORDER_CD: '',
                MRP_SEQ: 0,
                MATL_SEQ: 0,
                FACTORY_CD: '',
                STOCK_IDX: '',
                REMARK: '',
                PLAN_REMARK: '',
                ETC99: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S030505_02_1;
