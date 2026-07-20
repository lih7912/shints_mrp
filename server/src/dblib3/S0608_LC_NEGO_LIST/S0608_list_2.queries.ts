import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0608_LIST_2 = {
    Query: {
        mgrQueryS0608_LIST_2: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            let sql1 = `
                select
                    a.REF_NO,
                    a.INVOICE_NO,
                    a.DEBIT_CD,
                    a.BILL_AMT
                from
                    ksv_invoice_bill a
                where
                    a.ref_no = '${args.data.REF_NO}'
                    and a.bill_type = '${args.data.BILL_TYPE}'
                order by
                    a.invoice_no
            `;
            var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));

            let sql2 = `
                select
                    a.REF_NO,
                    a.CREDIT_CD,
                    a.CREDIT_AMT
                from
                    ksv_invoice_credit a
                where
                    a.ref_no = '${args.data.REF_NO}'
                order by
                    a.credit_cd
            `;
            var tRet2 = await prisma.$queryRaw(Prisma.raw(sql2));

            var tWObj = {};
            tWObj.DATA1 = [...tRet1];
            tWObj.DATA2 = [...tRet2];

            return tWObj;
        },
    },
};

export default moduleQuery_S0608_LIST_2;
