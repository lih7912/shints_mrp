import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0438_4 = {
    Query: {
        mgrQueryS0438_4: async (_, args) => {
            var tSQL = '';
            if (args.data.BUYER_CD !== '') {
                tSQL += `AND left(B.ORDER_CD, 2) = '${args.data.BUYER_CD}' `;
            }
            let sqlStr = `
                SELECT
                    B.ORDER_CD,
                    B.PROD_CD,
                    C.COLOR,
                    B.PRICE,
                    B.TOT_CNT,
                    ISNULL(D.SHIP_CNT, 0) AS SHIP_CNT,
                    B.SIZE_CNT as ORDER_SIZE_CNT,
                    isnull(D.SIZE_CNT, '') as SHIP_SIZE_CNT,
                    A.SIZE_GROUP,
                    E.SIZE_MEMBER
                FROM
                    KSV_ORDER_MEM B
                    LEFT JOIN (
                        SELECT
                            ORDER_CD,
                            PROD_CD,
                            SIZE_CNT,
                            SUM(SHIP_CNT) AS SHIP_CNT
                        FROM
                            KSV_ORDER_SHIP
                        WHERE
                            ORDER_CD like '${args.data.ORDER_CD}%'
                        GROUP BY
                            ORDER_CD,
                            PROD_CD,
                            SIZE_CNT
                    ) D ON B.ORDER_CD = D.ORDER_CD
                    AND B.PROD_CD = D.PROD_CD,
                    KSV_PROD_MST C,
                    KSV_ORDER_MST A,
                    KCD_SIZE_MST E
                WHERE
                    B.ORDER_CD like '${args.data.ORDER_CD}%' ${tSQL}
                    AND B.ORDER_CD = B.ORDER_CD
                    AND B.PROD_CD = B.PROD_CD
                    AND B.ADD_FLAG = '0'
                    AND B.PROD_CD = C.PROD_CD
                    AND B.ORDER_CD = A.ORDER_CD
                    AND A.SIZE_GROUP = E.SIZE_GROUP
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                ORDER_CD: '',
                PROD_CD: '',
                COLOR: '',
                PRICE: 0,
                TOT_CNT: 0,
                SIZE_CNT: '',
                SHIP_CNT: 0,
                SIZE_GROUP: '',
                SIZE_MEMBER: '',
                ETC99: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S0438_4;
