import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기

// export default로 Query 내용 내보내기
const moduleQuery_S0107_1 = {
    Query: {
        mgrQueryS0107_CODE: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = await AFLib.getUserInfoSync(contextValue);

            var tWObj = {};

            let sqlStr = `
                select
                    *
                from
                    kcd_code
                where
                    cd_group = 'STATUS_CD'
                    and cd_code in ('0', '2')
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_CODE = ' ';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.STATUS_CD = tRet;

            let sqlStr = `
                select
                    *
                from
                    kcd_buyer
                    -- where reg_user in (select distinct user_id from kcd_user where company_code = '${tUserInfo.COMPANY_CODE}')
                where
                    status_cd = '0'
                order by
                    reg_datetime desc
            `;
            let tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tRet = [];
            tRet0.forEach((col, i) => {
                var tObj = { ...col };
                tObj.BUYER_NAME = `(${col.BUYER_CD})${col.BUYER_NAME}`;
                tRet.push(tObj);
            });
            var tObj = {};
            tObj.BUYER_CD = ' ';
            tObj.BUYER_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.BUYER_CD = tRet;

            return tWObj;
        },

        mgrQueryS0107_1: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = await AFLib.getUserInfoSync(contextValue);

            var tSQL = '';
            if (tUserInfo.COMPANY_CODE === 'nsr') {
                tSQL = `
                    left join kcd_code b on a.status_cd = b.cd_code
                    inner join kcd_buyer c on a.buyer_cd = c.buyer_cd
                    -- and c.reg_user in (select distinct user_id from kcd_user where company_code = '${tUserInfo.COMPANY_CODE}')
                `;
            } else {
                tSQL = `
                    left join kcd_code b on a.status_cd = b.cd_code
                    left join kcd_buyer c on a.buyer_cd = c.buyer_cd
                    -- and c.reg_user in (select distinct user_id from kcd_user where company_code = '${tUserInfo.COMPANY_CODE}')
                `;
            }

            let sqlStr = `
                select
                    a.*,
                    b.cd_name as STATUS_CD_N,
                    c.buyer_name as BUYER_NAME
                from
                    kcd_size_mst a ${tSQL}
                    --left join kcd_code b on a.status_cd = b.cd_code
                    --left join kcd_buyer c on a.buyer_cd = c.buyer_cd
                where
                    a.status_cd like '%${args.data.STATUS_CD}%'
                    and a.size_member like '%${args.data.SIZE_MEMBER}%'
                    and (
                        a.size_group like '%${args.data.SIZE_GROUP}%'
                        or a.size_group_name like '%${args.data.SIZE_GROUP}%'
                    )
                    and b.cd_group = 'STATUS_CD'
                    -- and  a.reg_user in (select distinct user_id from kcd_user where company_code = '${tUserInfo.COMPANY_CODE}')
            `;

            sqlStr =
                args.data.BUYER_CD == ''
                    ? sqlStr.concat(` order by a.reg_datetime desc`)
                    : sqlStr +
                      `and  a.BUYER_CD like '%${args.data.BUYER_CD}%' 
                    order by a.reg_datetime desc`;

            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            return tRet;
        },
    },
};

export default moduleQuery_S0107_1;
