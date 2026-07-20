import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S020701_2_1 = {
    Query: {
        mgrQueryS020701_2_1: async (_, args) => {
            var tSQL = '';

            var tInput = { ...args.data };
            // if (tInput.STATUS_CD === '') tInput.STATUS_CD = '0';

            var tCurrDate = AFLib.getCurrTime().substring(0, 4);
            var s_date = tCurrDate + '0101';
            var e_date = '99999999';
            if (args.data.S_REG_DATE !== '') s_date = args.data.S_REG_DATE;
            if (args.data.E_REG_DATE !== '') e_date = args.data.E_REG_DATE;

            var tSQL1 = '';

            /*
       tSQL += `AND a1.po_status = '0' `;
       tSQL1 += `AND a.po_status = '0' `;
       */

            if (args.data.PO_CD !== '' && args.data.PO_CD !== ' ') {
                tSQL += `AND a1.po_cd like '%${args.data.PO_CD.split(' ').join('%')}%'`;
                tSQL1 += `AND a.po_cd like '%${args.data.PO_CD.split(' ').join('%')}%' `;
            }
            if (args.data.BUYER_CD !== '' && args.data.BUYER_CD !== ' ') {
                tSQL += `AND left(a2.order_cd, 2) like '${args.data.BUYER_CD}%' `;
                tSQL1 += `AND a0.buyer_cd like '${args.data.BUYER_CD}%' `;
            }

            var tSQL2 = '';
            if (args.data.PO_CD === '' && args.data.BUYER_CD === '') {
                tSQL2 = `and left(a.reg_datetime, 8) between '${s_date}' and '${e_date}' `;
            } else if (
                args.data.S_REG_DATE !== '' ||
                args.data.E_REG_DATE !== ''
            ) {
                tSQL2 = `and left(a.reg_datetime, 8) between '${s_date}' and '${e_date}' `;
            }

            if (args.data.PO_CD.length >= 9) tSQL2 = '';

            let sqlStr = `
                select
                    a.PO_STATUS,
                    a.PO_SEQ,
                    a.PO_TYPE,
                    a.PO_CD,
                    isnull(a.MATL_DUE_DATE, '') as TARGET_ETA,
                    a.REG_DATETIME,
                    a.REG_USER,
                    '' as UPD_DATETIME,
                    '' as UPD_USER,
                    a.FACTORY_CD,
                    isnull(a.MATL_DUE_DATE, '') as MATL_DUE_DATE,
                    a0.BUYER_CD,
                    b.cd_name as PO_TYPE_NAME,
                    c.cd_name as PO_STATUS_NAME,
                    d.FACTORY_NAME,
                    a0.BUYER_NAME
                from
                    ksv_po_mst a
                    left join kcd_code b on b.cd_code = a.po_type
                    and b.cd_group = 'PO_TYPE'
                    left join kcd_code c on c.cd_code = a.po_status
                    and c.cd_group = 'PO_STATUS'
                    left join kcd_factory d on d.factory_cd = a.factory_cd,
                    (
                        select
                            a1.po_cd,
                            left(a2.order_cd, 2) as buyer_cd,
                            a3.buyer_name,
                            count(*) as order_cnt
                        from
                            ksv_po_mst a1,
                            ksv_po_mem a2,
                            kcd_buyer a3
                        where
                            a1.po_seq = 1
                            and a1.po_cd = a2.po_cd
                            and left(a2.order_cd, 2) = a3.buyer_cd ${tSQL}
                        group by
                            a1.po_cd,
                            left(a2.order_cd, 2),
                            a3.buyer_name
                            -- order by a1.po_cd desc 
                            -- offset 0 rows fetch next 1000 rows only
                    ) a0
                where
                    a.po_seq = 1
                    -- where a.po_seq = 1(select max(po_seq) from ksv_po_mst where po_cd = a.po_cd and po_seq < 97) 1 
                    and a.po_cd = a0.po_cd
                    and a.po_status like '%${tInput.STATUS_CD}%' ${tSQL1} ${tSQL2}
                order by
                    a.reg_datetime desc
                    -- offset 0 rows fetch next 1000 rows only
            `;

            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {};
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S020701_2_1;
