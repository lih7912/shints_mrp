// MGR_@@TNAME@@.queries.js

import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0303_MRP_RECORD_STYLE_TBL_KSV_PROD_MST = {
    Query: {
        mgrQuery_S0303_MRP_RECORD_STYLE_TBL_KSV_PROD_MST: async (_, args) => {
            var tSQL = '';
            if (args.KEY1 !== '') {
                tSQL += `AND KEY1 = '${args.KEY1}' `;
            }
            let sqlStr = `
                SELECT
                    B.CD_NAME AS PROD_TYPE_NAME,
                    A.COLOR,
                    A.SIZE_LOSS,
                    isnull(A.upd_user, '') as UPD_USER,
                    isnull(A.upd_datetime, '') as UPD_DATETIME,
                    A.COLLECTION,
                    A.PROD_UNIT,
                    A.PROD_CD,
                    A.PROD_TYPE,
                    A.REG_USER,
                    A.REG_DATETIME,
                    isnull(C.PROD_MEM_CNT, 0) as PROD_MEM_CNT
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
                WHERE
                    (A.STYLE_CD = '${args.data.STYLE_CD}')
                order by
                    A.COLOR
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S0303_MRP_RECORD_STYLE_TBL_KSV_PROD_MST;
