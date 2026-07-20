import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0531_2 = {
    Query: {
        mgrQueryS0531_2: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);
            var s_date = `${tRetDate.substring(0, 4)}0101`;
            var e_date = `${tRetDate.substring(0, 8)}`;

            var tSQL = '';

            let sqlStr = `
                select distinct
                    a.ORDER_CD,
                    c.BUYER_NAME,
                    d.STYLE_NAME,
                    a.END_DATE,
                    b.TOT_CNT
                from
                    ssv_order_end a,
                    ksv_order_mst b,
                    kcd_buyer c,
                    kcd_style d
                where
                    left(a.order_cd, 2) like '%${args.data.BUYER_CD}%'
                    and a.order_cd like '%${args.data.ORDER_CD}%'
                    and a.end_date between '${s_date}' and '${e_date}'
                    and a.order_cd = b.order_cd
                    and left(a.order_cd, 2) = c.buyer_cd
                    and b.style_cd = d.style_cd
                    and b.order_status < '7'
                    and b.factory_cd = '${args.data.FACTORY_CD}'
                    and b.end_production_date is not null
                    and b.end_production_date <> ''
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            var tRetArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tObj = { ...tRet[tIdx] };

                let sql10 = `
                    select
                        TOT_CNT,
                        AVR_PRICE,
                        CURR_CD,
                        isnull(PENDING_REMARK, '') as PENDING_REMARK
                    from
                        ksv_order_mst
                    where
                        order_cd = '${tObj.ORDER_CD}'
                `;
                var tRet10 = await prisma.$queryRaw(Prisma.raw(sql10));
                var tOrderObj = { ...tRet10[0] };
                tObj.TOT_CNT = tOrderObj.TOT_CNT;
                tObj.ORDER_PRICE = tOrderObj.AVR_PRICE;
                tObj.CURR_CD = tOrderObj.CURR_CD;
                tObj.REMARK = tOrderObj.PENDING_REMARK;

                let sql0 = `
                    select
                        order_cd,
                        sum(ship_cnt) as s_ship_cnt
                    from
                        ksv_order_ship
                    where
                        order_cd = '${tObj.ORDER_CD}'
                    group by
                        order_cd
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                if (tRet0.length > 0) {
                    tObj.SHIP_QTY = tRet0[0].s_ship_cnt;
                    tObj.BAL_QTY =
                        parseFloat(tObj.TOT_CNT) -
                        parseFloat(tRet0[0].s_ship_cnt);
                    if (tObj.BAL_QTY > 0) tObj.STATUS_CD = 'pending';
                    else tObj.STATUS_CD = 'end';
                } else {
                    tObj.SHIP_QTY = '0';
                    tObj.BAL_QTY = parseFloat(tObj.TOT_CNT);
                    tObj.STATUS_CD = 'pending';
                }
                var tPendingAmt =
                    parseFloat(tObj.ORDER_PRICE) * parseFloat(tObj.BAL_QTY);
                tObj.PENDING_AMT = String(tPendingAmt);

                tObj.PENDING_DAYS = AFLib.getBetweenDay(
                    tRetDate1,
                    tObj.END_DATE,
                );

                if (parseFloat(tObj.BAL_QTY) > 0) tRetArray.push(tObj);
            }
            return tRetArray;
        },
    },
};

export default moduleQuery_S0531_2;
