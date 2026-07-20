import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0709_LIST_3 = {
    Query: {
        mgrQueryS0709_LIST_3: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tSQL = '';

            var eDate = args.data.BILL_DATE;
            if (eDate === '') eDate = tRetDate1;

            let sqlStr = `
                select
                    a.BUYER_CD,
                    a.crdb_cd as INVOICE_NO,
                    a.CURR_CD,
                    a.crdb_amt - isnull(sum(b.crdb_amt), 0) as BALANCE,
                    a.crdb_date as REG_DATE,
                    a.END_DATE
                from
                    ksv_crdb_mst a
                    left join ksv_crdb_mem b on a.crdb_cd = b.crdb_cd,
                    kcd_buyer c
                where
                    a.status_cd in ('0', '2')
                    and a.crdb_type in ('D', 'C')
                    and a.crdb_seq = (
                        select
                            max(crdb_seq)
                        from
                            ksv_crdb_mst
                        where
                            a.crdb_cd = crdb_cd
                    )
                    and a.buyer_cd = c.buyer_cd
                    and (
                        c.mom_cd = '${args.data.BUYER_CD}'
                        or c.buyer_cd = '${args.data.BUYER_CD}'
                    )
                    and a.end_date < '${eDate}'
                group by
                    a.crdb_cd,
                    a.curr_cd,
                    a.crdb_amt,
                    a.crdb_date,
                    a.end_date,
                    a.buyer_cd
                having
                    a.crdb_amt - isnull(sum(b.crdb_amt), 0) > 0
                order by
                    1
            `;

            var tRet = [];
            tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            var tRetData = {};

            var tRetArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tObj = { ...tRet[tIdx] };
                tRetArray.push(tObj);
            }
            return tRetArray;
        },
    },
};

export default moduleQuery_S0709_LIST_3;
