import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0801_2 = {
    Query: {
        mgrQueryS0801_2: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var sDate = args.data.S_BILL_DATE;
            // if (sDate === '') sDate = `${tRetDate1.substring(0, 6)}01`;
            if (sDate === '') sDate = `20200101`;
            var eDate = args.data.E_BILL_DATE;
            if (eDate === '') eDate = tRetDate1;

            var tSQL = '';
            let sqlStr = `
                select
                    '' as STATUS_NAME,
                    a.TAX_CD,
                    left(a.REG_DATETIME, 8) as REG_DATE,
                    left(a.BILL_DATE, 8) as BILL_DATE,
                    isnull(a.PAY_DUE_DATE, '') as PAY_DUE_DATE,
                    a.BILL_USER,
                    a.BUYER_CD,
                    isnull(b.BUYER_NAME, '') as NEOE_CD_N,
                    isnull(b.PAY_DUE_DAYS, 0) as BUYER_PAY_DUE_DATE,
                    b.NEOE_A23 as NEOE_CD,
                    b.NEOE_BUYER_CD,
                    b.NEOE_BUYER_CD_MOM,
                    a.KRW_AMT as KRW_PAY_AMOUNT,
                    a.VAT_AMT as KRW_TAX_AMOUNT,
                    a.TOT_AMT as KRW_TOT_AMOUNT,
                    a.DOCU_NO,
                    a.ACC_USER,
                    isnull(c1.USER_NAME, '') as ACC_USER_NAME,
                    a.BILL_USER as ORDER_USER_ID,
                    isnull(c2.USER_NAME, '') as ORDER_USER_NAME,
                    isnull(a.BUYER_EMAIL, '') as BUYER_EMAIL
                from
                    ksv_tax_mst a
                    left join kcd_user c2 on c2.user_id = a.bill_user
                    left join kcd_user c1 on c1.user_id = a.acc_user,
                    kcd_buyer b
                where
                    a.buyer_cd = b.buyer_cd
                    and a.buyer_cd like '%${args.data.BUYER_CD}%'
                    and a.bill_user like '%${args.data.ORDER_USER_ID}%'
                    and b.neoe_buyer_cd like '%${args.data.NEOE_CD}%'
                    and a.bill_date between '${sDate}' and '${eDate}'
                    and (
                        a.nat_cd in ('kr', 'ko', 'ks')
                        or (
                            a.nat_cd not in ('kr', 'ko', 'ks')
                            and b.nat_cd in ('kr', 'ko', 'ks')
                        )
                    )
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {};
            var tRetArray = [];
            tRet.forEach((col, i) => {
                var tObj = { ...col };
                if (tObj.DOCU_NO !== '') {
                    tObj.STATUS_NAME = 'END';
                } else {
                    tObj.STATUS_NAME = '';
                }
                if (args.data.STATUS_CD !== '') {
                    if (tObj.STATUS_NAME === args.data.STATUS_CD)
                        tRetArray.push(tObj);
                } else {
                    tRetArray.push(tObj);
                }
            });
            var tIdx = 0;
            return tRetArray;
        },
    },
};

export default moduleQuery_S0801_2;
