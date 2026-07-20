// MGR_@@TNAME@@.queries.js

import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0301_MATL_RECORD_TBL_KCD_MATL_SALE = {
    Query: {
        mgrQuery_S0301_MATL_RECORD_TBL_KCD_MATL_SALE: async (_, args) => {
            var tSQL = '';
            if (args.KEY1 !== '') {
                tSQL += `AND KEY1 = '${args.KEY1}' `;
            }
            let sqlStr = `
                select
                    a.*,
                    b.cd_name as CURR_CD_NAME
                from
                    (
                        select
                            *
                        from
                            kcd_matl_sale
                        where
                            matl_cd = '${args.data.MATL_CD}'
                    ) a
                    left join kcd_code b on a.CURR_CD = b.cd_code
                    and b.cd_group = 'CURR_CD'
                order by
                    a.MATL_SEQ desc
                    -- offset 0 rows fetch next 1000 rows only
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                MATL_CD: '',
                MATL_SEQ: '',
                MATL_PRICE: '',
                CURR_CD: '',
                CONF_FLAG: '',
                PRICE_TYPE: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S0301_MATL_RECORD_TBL_KCD_MATL_SALE;
