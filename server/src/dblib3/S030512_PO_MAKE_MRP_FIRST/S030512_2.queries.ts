import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S030512_2 = {
    Query: {
        mgrQueryS030512_2: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }
            let sqlStr = `
                SELECT
                    A.PO_SEQ,
                    A.ORDER_CD,
                    A.MATL_CD,
                    C.MATL_NAME,
                    C.COLOR,
                    C.SPEC,
                    C.UNIT,
                    B.CD_NAME AS USE_PO_TYPE_NAME,
                    A.PO_QTY,
                    A.MATL_PRICE,
                    A.CURR_CD,
                    D.VENDOR_NAME,
                    '' AS COL1,
                    A.MRP_SEQ,
                    A.MATL_SEQ,
                    A.REG_DATETIME
                FROM
                    KSV_PO_MRP A,
                    KCD_MATL_MST C,
                    KCD_CODE B,
                    KCD_VENDOR D
                WHERE
                    A.PO_CD = '${args.data.PO_CD}'
                    AND C.MATL_CD = A.MATL_CD
                    AND D.VENDOR_CD = C.VENDOR_CD
                    AND B.CD_GROUP = 'USE_PO_TYPE'
                    AND B.CD_CODE = A.USE_PO_TYPE
                ORDER BY
                    A.MATL_CD
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                PO_SEQ: 0,
                ORDER_CD: '',
                MATL_CD: '',
                MATL_NAME: '',
                COLOR: '',
                SPEC: '',
                UNIT: '',
                USE_PO_TYPE_NAME: '',
                PO_QTY: 0,
                MATL_PRICE: 0,
                CURR_CD: '',
                VENDOR_NAME: '',
                COL1: '',
                MRP_SEQ: 0,
                MATL_SEQ: 0,
                REG_DATETIME: '',
                ETC99: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S030512_2;
