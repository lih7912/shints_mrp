// MGR_@@TNAME@@.queries.js

import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0301_MATL_RECORD_TBL_KCD_MATL_MEM = {
    Query: {
        mgrQuery_S0301_MATL_RECORD_TBL_KCD_MATL_MEM: async (_, args) => {
            var tSQL = '';
            if (args.KEY1 !== '') {
                tSQL += `AND KEY1 = '${args.KEY1}' `;
            }
            let sqlStr = `
                select
                    a.*,
                    b.cd_name as CURR_CD_NAME,
                    c.cd_name as MATL_CONF_FLAG_NAME,
                    d.cd_name as PRICE_TYPE_NAME
                from
                    (
                        select
                            *
                        from
                            kcd_matl_mem
                        where
                            matl_cd = '${args.data.MATL_CD}'
                    ) a
                    left join kcd_code b on a.curr_cd = b.cd_code
                    and b.cd_group = 'CURR_CD'
                    left join kcd_code c on a.conf_flag = c.cd_code
                    and c.cd_group = 'MATL_CONF_FLAG'
                    left join kcd_code d on a.price_type = d.cd_code
                    and d.cd_group = 'PRICE_TYPE'
                order by
                    a.MATL_SEQ desc
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            if (tRet.length <= 0) return [];

            let reasonSql = `
                select
                    UPDATE_REMARK
                from
                    KCD_MATL_UPDATE_REMARK
                where
                    matl_cd = '${args.data.MATL_CD}'
                ORDER BY
                    id DESC
            `;
            var retReason = await prisma.$queryRaw(Prisma.raw(reasonSql));
            tRet[0].UPDATE_REASON = '';
            if (retReason.length > 0)
                tRet[0].UPDATE_REASON = retReason[0].UPDATE_REMARK;

            /* 
      tRet[0].UPDATE_REASON = (await prisma.$queryRaw(
        Prisma.raw(
          `
              select
                  UPDATE_REMARK
              from
                  KCD_MATL_UPDATE_REMARK
              where
                  matl_cd = '${args.data.MATL_CD}'
              ORDER BY
                  id DESC
          `
        )
      ))[0].UPDATE_REMARK;
      */

            return tRet;
        },
    },
};

export default moduleQuery_S0301_MATL_RECORD_TBL_KCD_MATL_MEM;
