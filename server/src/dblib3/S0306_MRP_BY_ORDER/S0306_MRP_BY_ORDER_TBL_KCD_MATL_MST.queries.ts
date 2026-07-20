// MGR_@@TNAME@@.queries.js

import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0306_MRP_BY_ORDER_TBL_KCD_MATL_MST = {
    Query: {
        mgrQuery_S0306_MRP_BY_ORDER_TBL_KCD_MATL_MST: async (_, args) => {
            var tSQL = '';
            var tSQL1 = '';
            if (args.data.MATL_NAME !== '') {
                tSQL += `and a.matl_name like '%${args.data.MATL_NAME}%' escape '[' `;
            }
            if (args.data.COLOR !== '') {
                tSQL += `and a.color like '%${args.data.COLOR}%'  `;
            }
            if (args.data.SPEC !== '') {
                tSQL += `and a.spec like '%${args.data.SPEC}%'  `;
            }
            if (args.data.MATL_CD !== '') {
                tSQL += `and a.matl_cd like '%${args.data.MATL_CD}%'  `;
            }

            if (args.data.VENDOR_NAME !== '') {
                tSQL += `and (c.vendor_name like '%${args.data.VENDOR_NAME}%' or c.vendor_cd like '%${args.data.VENDOR_NAME}%') and a.vendor_cd = c.vendor_cd `;
            }

            let sqlStr = `
                select
                    a1.MATL_NAME,
                    a1.COLOR,
                    a1.SPEC,
                    b.MATL_PRICE,
                    b.CURR_CD,
                    a1.UNIT,
                    '' as COL1,
                    '' as COL2,
                    a1.VENDOR_NAME,
                    a1.VENDOR_CD,
                    '0' as COL3,
                    a1.MATL_CD,
                    a1.STATUS_CD,
                    isnull(a1.ADD_LOSS, 0) as ADD_LOSS
                from
                    (
                        select
                            top 1000 a.*,
                            c.vendor_name
                        from
                            kcd_matl_mst a,
                            kcd_vendor c
                        where
                            a.status_cd in ('0', '1')
                            and a.vendor_cd = c.vendor_cd ${tSQL}
                        order by
                            a.reg_datetime desc
                            -- offset 0 rows fetch next 1000 rows only
                    ) a1
                    left join kcd_matl_sale b on b.matl_cd = a1.matl_cd
                    and b.matl_seq = (
                        select
                            max(matl_seq)
                        from
                            kcd_matl_sale
                        where
                            matl_cd = a1.matl_cd
                    )
            `;

            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                MATL_NAME: '',
                COLOR: '',
                SPEC: '',
                MATL_PRICE: '',
                CURR_CD: '',
                UNIT: '',
                VENDOR_NAME: '',
                VENDOR_CD: '',
                MATL_CD: '',
                STATUS_CD: '',
                STATUS_NAME: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S0306_MRP_BY_ORDER_TBL_KCD_MATL_MST;
