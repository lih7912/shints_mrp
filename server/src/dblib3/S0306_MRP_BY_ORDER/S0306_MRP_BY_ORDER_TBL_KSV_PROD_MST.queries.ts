// MGR_@@TNAME@@.queries.js

import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0306_MRP_BY_ORDER_TBL_KSV_PROD_MST = {
    Query: {
        mgrQuery_S0306_MRP_BY_ORDER_TBL_KSV_PROD_MST: async (_, args) => {
            var tSQL = '';
            if (args.KEY1 !== '') {
                tSQL += `AND KEY1 = '${args.KEY1}' `;
            }

            let sqlStr = `
                SELECT
                    B.CD_NAME AS PROD_TYPE_NAME,
                    A.COLOR,
                    isnull(D.SIZE_LOSS, 0) as SIZE_LOSS,
                    isnull(A.upd_user, '') as UPD_USER,
                    isnull(A.upd_datetime, '') as UPD_DATETIME,
                    A.COLLECTION,
                    A.PROD_UNIT,
                    A.PROD_CD,
                    A.PROD_TYPE,
                    A.REG_USER,
                    A.REG_DATETIME,
                    isnull(C.prod_mem_cnt, 0) as PROD_MEM_CNT
                FROM
                    KSV_PROD_MST A
                    INNER JOIN KCD_CODE B ON A.PROD_TYPE = B.CD_CODE
                    AND (B.CD_GROUP = 'PROD_TYPE')
                    LEFT JOIN (
                        select
                            a1.prod_cd,
                            count(*) as prod_mem_cnt
                        from
                            ksv_prod_mem a1,
                            ksv_prod_mst a2
                        where
                            a1.prod_cd = a2.prod_cd
                            and a2.style_cd = '${args.data.STYLE_CD}'
                        group by
                            a1.prod_cd
                    ) C ON A.PROD_CD = C.PROD_CD
                    LEFT JOIN (
                        select
                            prod_cd,
                            max(isnull(size_loss, 0)) as size_loss
                        from
                            ksv_order_mem
                        group by
                            prod_cd
                    ) D ON A.PROD_CD = D.PROD_CD
                WHERE
                    (A.STYLE_CD = '${args.data.STYLE_CD}')
                order by
                    A.COLOR
            `;

            let sqlStr1 = `
                SELECT
                    A.COLOR,
                    D_SUM.SIZE_LOSS,
                    A.PROD_CD,
                    C.ORDER_CD,
                    D_SUM.ORDER_QTY,
                    MAX(C.ORDER_MRP_SEQ) as ORDER_MRP_SEQ
                FROM
                    KSV_PROD_MST A
                    JOIN KCD_CODE B ON A.PROD_TYPE = B.CD_CODE
                    JOIN KSV_ORDER_MRP C ON A.PROD_CD = C.PROD_CD
                    JOIN (
                        SELECT
                            PROD_CD,
                            ORDER_CD,
                            SUM(TOT_CNT) as ORDER_QTY,
                            MAX(isnull(SIZE_LOSS, 0)) as SIZE_LOSS
                        FROM
                            KSV_ORDER_MEM
                        GROUP BY
                            PROD_CD,
                            ORDER_CD
                    ) D_SUM
                        ON A.PROD_CD = D_SUM.PROD_CD
                        AND C.ORDER_CD = D_SUM.ORDER_CD

                WHERE
                    A.id > 0
                    AND B.CD_GROUP = 'PROD_TYPE'
                    AND C.ORDER_CD = '${args.data.ORDER_CD}'

                GROUP BY
                    A.COLOR,
                    D_SUM.SIZE_LOSS,
                    A.PROD_CD,
                    C.ORDER_CD,
                    D_SUM.ORDER_QTY

                ORDER BY
                    A.COLOR
            `;

            var tRet = [];
            if (args.data.STYLE_CD !== '')
                tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            if (args.data.ORDER_CD !== '')
                tRet = await prisma.$queryRaw(Prisma.raw(sqlStr1));

            return tRet;
        },
        mgrQuery_S0306_QRY_ORDER_MRP_SEQ: async (_, args) => {
            var tSQL = '';
            if (args.KEY1 !== '') {
                tSQL += `AND KEY1 = '${args.KEY1}' `;
            }

            let sqlStr1 = `
                SELECT distinct
                    ORDER_MRP_SEQ
                FROM
                    KSV_ORDER_MRP
                where
                    ORDER_CD = '${args.data.ORDER_CD}'
                order by
                    ORDER_MRP_SEQ
            `;

            var tRet = [];
            tRet = await prisma.$queryRaw(Prisma.raw(sqlStr1));
            return tRet;
        },
    },
};

export default moduleQuery_S0306_MRP_BY_ORDER_TBL_KSV_PROD_MST;
