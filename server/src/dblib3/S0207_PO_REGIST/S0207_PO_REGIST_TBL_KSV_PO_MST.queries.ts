// MGR_@@TNAME@@.queries.js

import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0207_PO_REGIST_TBL_KSV_PO_MST = {
    Query: {
        mgrQuery_S0207_PO_REGIST_TBL_KSV_PO_MST: async (_, args) => {
            var tSQL = '';
            let sqlStr = `
                select
                    a.PO_CD,
                    a.ORDER_CD,
                    b.STYLE_NAME,
                    a.DUE_DATE,
                    a.TOT_CNT,
                    c.CD_NAME as ORDER_STATUS_NAME,
                    d.FACTORY_NAME,
                    a.STYLE_CD,
                    a.ORDER_STATUS,
                    a.FACTORY_CD,
                    a.SAMPLE_FLAG
                from
                    (
                        select
                            a1.*,
                            a2.po_cd
                        from
                            ksv_order_mst a1,
                            ksv_po_mem a2
                        where
                            a1.order_type in ('0', '1')
                            and a1.order_cd = a2.order_cd
                            and a2.po_cd = '${args.data.PO_CD}'
                        order by
                            a1.order_cd
                            -- offset 0 rows fetch next 1000 rows only
                    ) a
                    left join kcd_style b on a.style_cd = b.style_cd
                    left join kcd_code c on c.cd_group = 'ORDER_STATUS_E'
                    and c.cd_code = a.order_status
                    left join kcd_factory d on a.factory_cd = d.factory_cd
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S0207_PO_REGIST_TBL_KSV_PO_MST;
