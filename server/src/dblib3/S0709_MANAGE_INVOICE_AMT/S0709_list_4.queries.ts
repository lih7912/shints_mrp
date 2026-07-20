import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0709_LIST_4 = {
    Query: {
        mgrQueryS0709_LIST_4: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }
            let sqlStr = `
                select
                    a.BILL_DATE,
                    a.BILL_AMT,
                    (
                        case
                            when a.invoice_no = 'DEBIT' then a.debit_cd
                            else a.invoice_no
                        end
                    ) as INVOICE_NO,
                    a.CURRENCY_RATE,
                    a.REF_NO,
                    a.BILL_AMT_ORG,
                    a.END_DATE,
                    a.BUYER_CD,
                    a.PRE_FLAG
                from
                    ksv_invoice_prebill a0,
                    ksv_invoice_bill a
                where
                    a.ref_no = '${args.data.REF_NO}'
                    and a.invoice_no <> '미정'
                    and a.pre_flag = '${args.data.PRE_FLAG}'
                    and a.ref_no = a0.ref_no
                    and a.pre_flag = a0.pre_flag
                    and a.bill_amt > 0.0
                    and a0.buyer_cd is not null
                    and a0.buyer_cd <> ''
                order by
                    a.ref_no,
                    a.invoice_no desc,
                    a.debit_cd
            `;

            var tRet = [];
            tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            var tRetData = {};

            var tRetArray = [];
            var tIdx = 0;
            var tTotal = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tObj = { ...tRet[tIdx] };
                tTotal += parseFloat(tObj.BILL_AMT);
                tRetArray.push(tObj);
            }
            var tObj = {};
            tObj.BILL_DATE = 'Total';
            tObj.BILL_AMT = String(tTotal);
            tObj.INVOICE_NO = '';
            tObj.CURRENCY_RATE = '';
            tObj.REF_NO = '';
            tObj.BILL_AMT_ORG = '';
            tObj.END_DATE = 'Total';
            tObj.BUYER_CD = '';
            tObj.PRE_FLAG = '';
            tRetArray.push(tObj);

            return tRetArray;
        },
    },
};

export default moduleQuery_S0709_LIST_4;
