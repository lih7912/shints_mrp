import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S041206_1 = {
    Query: {
        mgrQueryS041206_CODE: async (_, args) => {
            var tWObj = {};

            let sqlStr = `
                select
                    *
                from
                    kcd_vendor
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.VENDOR_CD = ' ';
            tObj.VENDOR_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.VENDOR = tRet;

            let sqlStr = `
                select
                    *
                from
                    kcd_code
                where
                    cd_group = 'DELAY_REASON'
                order by
                    cd_code
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_CODE = ' ';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.REASON_TYPE = tRet;

            let sqlStr = `
                select
                    *
                from
                    kcd_code
                where
                    cd_group = 'CHARGE_KIND'
                order by
                    cd_code
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_CODE = ' ';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.CHARGE1 = tRet;

            let sqlStr = `
                select
                    *
                from
                    kcd_buyer
                order by
                    buyer_cd
                    -- offset 0 rows fetch next 1000 rows only
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.BUYER_CD = ' ';
            tObj.BUYER_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.BUYER_CD = tRet;

            let sqlStr = `
                select
                    *
                from
                    kcd_code
                where
                    cd_group = 'BUYER_TEAM'
                order by
                    cd_code
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_CODE = ' ';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.BUYER_TEAM = tRet;

            let sqlStr = `
                select
                    *
                from
                    kcd_factory
                where
                    factory_cd in ('FC044', 'FC034', 'FC010')
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.FACTORY_CD = ' ';
            tObj.FACTORY_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.FACTORY_CD = tRet;

            return tWObj;
        },

        mgrQueryS041206_1: async (_, args) => {
            let sql0 = `
                select
                    count(*) as cnt
                from
                    ksv_stock_out_freight
                where
                    pack_cd = '${args.data.PACK_CD}'
            `;
            let tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            var tCnt1 = tRet0[0].cnt;

            let sql0 = `
                select
                    count(distinct (left(order_cd, 2))) as cnt
                from
                    ksv_stock_out
                where
                    pack_cd = '${args.data.PACK_CD}'
            `;
            let tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            var tCnt2 = tRet0[0].cnt;

            if (tCnt1 > 0) {
                if (tCnt1 !== tCnt2) {
                    var tRetObj = {};
                    tRetObj.message =
                        'ERROR:패킹리스트 데이터와 운임리스트의 데이터가 맞지 않습니다';
                    tRetObj.tot_amt = 0;
                    tRetObj.data = [];
                    return tRetObj;
                }
            }

            let sql0 = `
                select
                    sum(cast(amount as float)) as tot_amt
                from
                    ksv_stock_out_freight
                where
                    pack_cd = '${args.data.PACK_CD}'
            `;
            let tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            var tTotAmt = tRet0[0].tot_amt;

            var sqlStr = `
                SELECT
                    A.BUYER_CD,
                    E.CD_NAME as DELAY_REASON_N,
                    A.DELAY_REASON,
                    C.CD_NAME as CHARGE_KIND_N,
                    A.CHARGE_KIND,
                    D.CD_NAME as BUYER_TEAM_N,
                    A.BUYER_TEAM,
                    A.FRT_PERCENT,
                    A.AMOUNT,
                    A.CURR_CD,
                    A.PERCENT_FLAG,
                    A.DISTRIBUTE_FLAG,
                    A.FRT_FLAG
                FROM
                    KSV_STOCK_OUT_FREIGHT A,
                    KCD_CODE E,
                    KCD_CODE C,
                    KCD_CODE D
                WHERE
                    A.PACK_CD = '${args.data.PACK_CD}'
                    AND E.CD_GROUP = 'DELAY_REASON'
                    AND E.CD_CODE = A.DELAY_REASON
                    AND C.CD_GROUP = 'CHARGE_KIND'
                    AND C.CD_CODE = A.CHARGE_KIND
                    AND D.CD_GROUP = 'BUYER_TEAM'
                    AND D.CD_CODE = A.BUYER_TEAM
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            var tRetObj = {};
            tRetObj.message = '';
            tRetObj.tot_amt = tTotAmt;
            tRetObj.data = tRet;
            return tRetObj;
        },
    },
};

export default moduleQuery_S041206_1;
