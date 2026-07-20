// MGR_@@TNAME@@.queries.js

import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0303_MRP_RECORD_STYLE_TBL_KCD_STYLE = {
    Query: {
        mgrQuery_S0303_QRY_VENDOR: async (_, args) => {
            let sqlStr = `
                select
                    *
                from
                    kcd_vendor
                where
                    (
                        vendor_name like '%${args.data.VENDOR_CD}%'
                        or vendor_cd like '%${args.data.VENDOR_CD}%'
                    )
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.VENDOR_CD = '';
            tObj.VENDOR_NAME = ' ';
            tRet.unshift(tObj);
            return tRet;
        },
        mgrQuery_S0303_QRY_STYLE: async (_, args) => {
            let sqlStr = `
                select
                    *
                from
                    kcd_style
                where
                    (
                        style_name like '%${args.data.STYLE_CD}%'
                        or style_cd like '%${args.data.STYLE_CD}%'
                    )
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            return tRet;
        },
        mgrQuery_S0303_QRY_STYLE_BY_BUYER: async (_, args) => {
            let sqlStr = `
                select
                    *
                from
                    kcd_style
                where
                    buyer_cd = '${args.data.BUYER_CD}'
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            return tRet;
        },
        mgrQuery_S0303_QRY_BUYER: async (_, args) => {
            let sqlStr = `
                select
                    *
                from
                    kcd_buyer
                where
                    (
                        buyer_name like '%${args.data.BUYER_CD}%'
                        or buyer_cd like '%${args.data.BUYER_CD}%'
                    )
            `;
            var tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tRet = [];
            tRet0.forEach((col, i) => {
                var tObj = { ...col };
                tObj.BUYER_NAME = `(${col.BUYER_CD})${col.BUYER_NAME}`;
                tRet.push(tObj);
            });
            var tObj = {};
            tObj.BUYER_CD = '';
            tObj.BUYER_NAME = ' ';
            tRet.unshift(tObj);
            return tRet;
        },
        mgrQuery_S0303_QRY_NATION: async (_, args) => {
            let sqlStr = `
                select
                    *
                from
                    kcd_nation
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.NAT_CD = '';
            tObj.NAT_NAME = ' ';
            tRet.unshift(tObj);
            return tRet;
        },
        mgrQuery_S0303_QRY_BUYER_BY_STYLE: async (_, args) => {
            let sqlStr = `
                select
                    a.*
                from
                    kcd_buyer a,
                    kcd_style b
                where
                    a.buyer_cd = b.buyer_cd
                    and b.style_cd = '${args.data.STYLE_CD}'
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            return tRet;
        },

        mgrQuery_S0303_MRP_RECORD_STYLE_TBL_KCD_STYLE: async (_, args) => {
            var tSQL = '';
            var tSQL1 = '';
            var tQryArray = [];
            tQryArray = args.data.STYLE_CD.split(' ');
            tQryArray.forEach((col0, i) => {
                var col = col0.replace(/'/g, "''");
                if (i === 0) {
                    tSQL1 = `and (style_name like '%${col.split(' ').join('%')}%'`;
                } else {
                    tSQL1 += ` and style_name like '%${col.split(' ').join('%')}%' `;
                }
            });

            if (tSQL1 !== '') tSQL1 += ')';

            if (args.data.BUYER_CD !== '') {
                tSQL += `AND (b.buyer_name  like '%${args.data.BUYER_CD}%' or b.buyer_cd like '%${args.data.BUYER_CD}%') `;
                tSQL += `AND a.buyer_cd = b.buyer_cd `;
            }
            let sqlStr = `
                select
                    top 1000 a.STYLE_NAME,
                    c.cd_name as BVT_FLAG_NAME,
                    a.BVT_FLAG,
                    a.STYLE_CD,
                    a.BUYER_NAME,
                    a.BUYER_CD,
                    0 as PROD_CNT
                from
                    (
                        select
                            a1.*,
                            b1.BUYER_NAME
                        from
                            kcd_style a1,
                            kcd_buyer b1
                        where
                            a1.status_cd = '0'
                            and a1.buyer_cd = b1.buyer_cd
                            -- and len(a1.style_cd) = 9
                            and len(a1.style_cd) <= 9 ${tSQL1}
                            and (
                                b1.buyer_name like '%${args.data.BUYER_CD}%'
                                or b1.buyer_cd like '%${args.data.BUYER_CD}%'
                            )
                    ) a
                    left join kcd_code c on c.cd_code = a.bvt_flag
                    and c.cd_group = 'BVT_FLAG'
                order by
                    a.STYLE_NAME
                    -- offset 0 rows fetch next 1000 rows only
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                STYLE_NAME: '',
                STYLE_CD: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S0303_MRP_RECORD_STYLE_TBL_KCD_STYLE;
