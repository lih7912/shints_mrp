import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S020701_3_1 = {
    Query: {
        mgrQueryS020701_3_1: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }
            let sqlStr = `
                SELECT
                    top 1 A.REF_ORDER_NO,
                    A.ORDER_CD,
                    B.STYLE_NAME,
                    A.DUE_DATE,
                    C.QTY,
                    C.FOB,
                    A.CURR_CD,
                    D.MESSERS,
                    D.ADDR1,
                    D.ADDR2,
                    D.CONSIGNEE,
                    D.CADDR1,
                    D.CADDR2,
                    D.PRICE_TERM,
                    D.DESTINATION,
                    D.PORT,
                    (F.BANK_NAME + '_' + F.ACCOUNT_NO) AS BANK,
                    G.REMARK,
                    D.BVT_FLAG,
                    D.PI_REMARK1,
                    D.PI_REMARK2,
                    D.PI_REMARK3,
                    D.PI_REMARK4,
                    D.PI_REMARK5,
                    D.PI_REMARK6,
                    D.PI_REMARK7,
                    D.PI_REMARK8
                FROM
                    KSV_ORDER_MST A,
                    KCD_STYLE B,
                    KSV_ORDER_PIMEM C,
                    KSV_ORDER_PIMST D,
                    KCD_BUYER E,
                    KCD_BANK F,
                    KCD_PAY_RULE G
                WHERE
                    A.ORDER_CD = C.ORDER_CD
                    AND A.STYLE_CD = B.STYLE_CD
                    AND C.PI_CD = '${args.data.PI_CD}'
                    -- AND C.PI_CD like '%22-%' 
                    AND D.PI_CD = C.PI_CD
                    AND E.BUYER_CD = LEFT(A.ORDER_CD, 2)
                    AND E.BANK_CD = F.BANK_CD
                    AND G.CD_CODE = E.PAY_RULE
                ORDER BY
                    2
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                REF_ORDER_NO: '',
                ORDER_CD: '',
                STYLE_NAME: '',
                DUE_DATE: '',
                QTY: 0,
                FOB: 0,
                CURR_CD: '',
                MESSERS: '',
                ADDR1: '',
                ADDR2: '',
                CONSIGNEE: '',
                CADDR1: '',
                CADDR2: '',
                PRICE_TERM: '',
                DESTINATION: '',
                PORT: '',
                BANK: '',
                REMARK: '',
                BVT_FLAG: '',
                PI_REMARK1: '',
                PI_REMARK2: '',
                PI_REMARK3: '',
                PI_REMARK4: '',
                PI_REMARK5: '',
                PI_REMARK6: '',
                PI_REMARK7: '',
                PI_REMARK8: '',
                ETC99: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S020701_3_1;
