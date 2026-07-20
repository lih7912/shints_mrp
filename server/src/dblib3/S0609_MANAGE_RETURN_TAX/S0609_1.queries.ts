import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0609_1 = {
    Query: {
        mgrQueryS0609_CODE: async (_, args) => {
            var tWObj = {};

            let sqlStr = `
                select
                    VENDOR_NAME,
                    VENDOR_CD
                from
                    kcd_vendor
                where
                    status_cd = '0'
                    and vendor_type in ('2', '3', '6')
                union all
                select
                    buyer_name,
                    buyer_cd
                from
                    kcd_buyer
                where
                    status_cd = '0'
                order by
                    1
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.VENDOR_CODE = ' ';
            tObj.VENDOR_CD = ' ';
            tRet.unshift(tObj);
            tWObj.VENDOR_CD = tRet;

            return tWObj;
        },
    },
};

export default moduleQuery_S0609_1;
