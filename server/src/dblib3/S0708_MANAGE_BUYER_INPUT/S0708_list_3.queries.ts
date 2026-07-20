import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0708_LIST_3 = {
    Query: {
        mgrQueryS0708_LIST_3: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }
            let sqlStr = `
                select
                    a.CRDB_CD,
                    a.CURR_CD,
                    a.CRDB_AMT,
                    a.CRDB_DATE,
                    a.END_DATE,
                    '0' as IN_AMT,
                    (a.crdb_amt + isnull(a.vat, 0)) - (isnull(sum(b.bill_amt), 0)) as BALANCE,
                    c.BUYER_NAME,
                    (a.crdb_amt) - (isnull(sum(b.bill_amt), 0)) as REST_AMT,
                    a.vat as VAT_AMT,
                    a.crdb_amt as ORG_AMT,
                    '1' as doc_no
                from
                    ksv_crdb_mst a
                    left join ksv_invoice_bill b on a.crdb_cd = b.debit_cd,
                    kcd_buyer c
                where
                    a.status_cd in ('0', '2', '4', '5')
                    and a.crdb_type in ('D', 'DA')
                    and a.crdb_seq = (
                        select
                            max(crdb_seq)
                        from
                            ksv_crdb_mst
                        where
                            a.crdb_cd = crdb_cd
                    )
                    and a.messer_cd = c.buyer_cd
                    AND (
                        (C.BUYER_CD = '${args.data.BUYER_CD}')
                        or (
                            C.NEOE_BUYER_CD_MOM = (
                                select
                                    neoe_buyer_cd_mom
                                from
                                    kcd_buyer
                                where
                                    buyer_cd = '${args.data.BUYER_CD}'
                            )
                        )
                        or (C.MOM_CD = '${args.data.BUYER_CD}')
                    )
                group by
                    a.crdb_cd,
                    a.curr_cd,
                    a.crdb_amt,
                    a.crdb_date,
                    a.end_date,
                    c.buyer_name,
                    a.crdb_amt,
                    a.vat
                having
                    (a.crdb_amt + isnull(a.vat, 0)) - (isnull(sum(isnull(b.bill_amt, 0)), 0)) > 0
                union
                select
                    a.CRDB_CD,
                    a.CURR_CD,
                    a.CRDB_AMT,
                    a.CRDB_DATE,
                    a.END_DATE,
                    '0' as IN_AMT,
                    (a.crdb_amt + isnull(a.vat, 0)) - (isnull(sum(b.credit_amt), 0)) as BALANCE,
                    c.BUYER_NAME,
                    (a.crdb_amt) - (isnull(sum(b.credit_amt), 0)) as REST_AMT,
                    a.vat as VAT_AMT,
                    a.crdb_amt as ORG_AMT,
                    isnull(e.doc_no, '') as doc_no
                from
                    ksv_crdb_mst a
                    left join kcd_gwcode e on e.doc_no = a.crdb_cd
                    and e.status_cd = '2'
                    left join ksv_invoice_credit b on a.crdb_cd = b.credit_cd,
                    kcd_buyer c
                where
                    a.status_cd in ('0', '2', '4', '5')
                    and a.crdb_type in ('C')
                    and a.crdb_seq = (
                        select
                            max(crdb_seq)
                        from
                            ksv_crdb_mst
                        where
                            a.crdb_cd = crdb_cd
                    )
                    and a.messer_cd = c.buyer_cd
                    AND (
                        (C.BUYER_CD = '${args.data.BUYER_CD}')
                        or (C.MOM_CD = '${args.data.BUYER_CD}')
                    )
                group by
                    a.crdb_cd,
                    a.curr_cd,
                    a.crdb_amt,
                    a.crdb_date,
                    a.end_date,
                    c.buyer_name,
                    a.crdb_amt,
                    a.vat,
                    e.doc_no
                having
                    (a.crdb_amt + isnull(a.vat, 0)) - (isnull(sum(isnull(b.credit_amt, 0)), 0)) > 0
                union
                select
                    a.CRDB_CD,
                    a.CURR_CD,
                    a.CRDB_AMT,
                    a.CRDB_DATE,
                    a.END_DATE,
                    '0' as IN_AMT,
                    (a.crdb_amt + isnull(a.vat, 0)) - (isnull(sum(b.credit_amt), 0)) as BALANCE,
                    c.BUYER_NAME,
                    (a.crdb_amt) - (isnull(sum(b.credit_amt), 0)) as REST_AMT,
                    a.vat as VAT_AMT,
                    a.crdb_amt as ORG_AMT,
                    '1' as doc_no
                from
                    ksv_crdb_mst a
                    left join ksv_invoice_credit b on a.crdb_cd = b.credit_cd,
                    kcd_buyer c
                where
                    a.status_cd in ('0', '2', '4', '5')
                    and a.crdb_type in ('CA')
                    and a.crdb_seq = (
                        select
                            max(crdb_seq)
                        from
                            ksv_crdb_mst
                        where
                            a.crdb_cd = crdb_cd
                    )
                    and (
                        a.messer_cd = c.buyer_cd or a.buyer_cd = c.buyer_cd
                    )
                    AND (
                        (C.BUYER_CD = '${args.data.BUYER_CD}')
                        or (C.MOM_CD = '${args.data.BUYER_CD}')
                    )
                group by
                    a.crdb_cd,
                    a.curr_cd,
                    a.crdb_amt,
                    a.crdb_date,
                    a.end_date,
                    c.buyer_name,
                    a.crdb_amt,
                    a.vat
                having
                    (a.crdb_amt + isnull(a.vat, 0)) - (isnull(sum(isnull(b.credit_amt, 0)), 0)) > 0
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
                // if (tObj.doc_no !== '') tRetArray.push(tObj);
                tRetArray.push(tObj);
            }
            return tRetArray;
        },
    },
};

export default moduleQuery_S0708_LIST_3;
