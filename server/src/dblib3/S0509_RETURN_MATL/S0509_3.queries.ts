import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0509_3 = {
    Query: {
        mgrQueryS0509_3: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }
            let sqlStr = `
                SELECT
                    A.MATL_CD,
                    B.CD_NAME AS STOCK_STATUS_S_N,
                    A.STOCK_QTY,
                    A.RACK,
                    A.LOCATION,
                    A.REMARK,
                    A.ORDER_CD,
                    A.STOCK_STATUS,
                    A.STOCK_IDX,
                    A.ORG_STOCK_IDX,
                    A.REMAIN_QTY
                FROM
                    KSV_STOCK_MATL A,
                    KCD_CODE B
                WHERE
                    A.ORG_STOCK_IDX = '${args.data.STOCK_IDX}'
                    AND B.CD_GROUP = 'STOCK_STATUS_S'
                    AND B.CD_CODE = A.STOCK_STATUS
                ORDER BY
                    A.STOCK_IDX
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                MATL_CD: '',
                STOCK_STATUS_S_N: '',
                STOCK_QTY: 0,
                RACK: '',
                LOCATION: '',
                REMARK: '',
                ORDER_CD: '',
                STOCK_STATUS: '',
                STOCK_IDX: '',
                ORG_STOCK_IDX: '',
                REMAIN_QTY: 0,
                ETC99: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S0509_3;
