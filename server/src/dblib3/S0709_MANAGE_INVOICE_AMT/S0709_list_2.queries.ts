import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0709_LIST_2 = {
    Query: {
        mgrQueryS0709_LIST_2: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var sDate = args.data.S_BILL_DATE;
            var eDate = args.data.E_BILL_DATE;
            if (sDate === '') sDate = `${tRetDate1.substring(0, 4)}0101`;
            var saveDate = eDate;
            if (eDate === '') eDate = tRetDate1;
            var saveDate = eDate;

            var tObj = {};
            if (args.data.KIND === '1') {
                // 기한초과
            } else if (args.data.KIND === '2') {
                // 1주이내
                sDate = eDate;
                eDate = AFLib.getCurrTimeAdd(7).substring(0, 8);
            } else if (args.data.KIND === '3') {
                // 2주이내
                sDate = AFLib.getCurrTimeAdd(7).substring(0, 8);
                eDate = AFLib.getCurrTimeAdd(14).substring(0, 8);
            } else if (args.data.KIND === '4') {
                // 2주 이후
                tObj.s_date = AFLib.getCurrTimeAdd(14).substring(0, 8);
                tObj.e_date = '99999999';
            }

            let sql1 = `
                select
                    a.BUYER_CD,
                    a.INVOICE_NO,
                    a.CURR_CD,
                    round(
                        isnull(sum(c.part_amt), 0) - isnull(sum(b.bill_amt), 0),
                        2
                    ) as BALANCE,
                    a.SHIP_DATE,
                    c.DUE_DATE,
                    '' as OVER_DATE,
                    '' as INTEREST
                from
                    ksv_invoice_mst a
                    left join (
                        select
                            sum(bill_amt) as bill_amt,
                            invoice_no,
                            buyer_cd
                        from
                            ksv_invoice_bill
                        where
                            bill_type in ('1', '3', '9')
                        group by
                            invoice_no,
                            buyer_cd
                    ) b on a.invoice_no = b.invoice_no,
                    ksv_invoice_part c
                where
                    c.invoice_no = a.invoice_no
                    and b.buyer_cd = a.buyer_cd
                    and c.due_date < '${eDate}'
                    and c.due_date >= '${sDate}'
                    and a.tot_amt > 0
                    and a.docu_no <> ''
                    and a.payment_type in ('1')
                    and a.trade_type2 <> '5'
                    and a.buyer_cd = '${args.data.BUYER_CD}'
                    and a.curr_cd = '${args.data.CURR_CD}'
                    and a.reg_datetime > '20200807000000'
                group by
                    c.due_date,
                    a.invoice_no,
                    a.curr_cd,
                    a.buyer_cd,
                    a.ship_date
                having
                    round(
                        isnull(sum(c.part_amt), 0) - isnull(sum(b.bill_amt), 0),
                        2
                    ) > 0
                union
                select
                    a.BUYER_CD,
                    a.INVOICE_NO,
                    a.CURR_CD,
                    round(a.tot_amt - isnull(sum(b.bill_amt), 0), 2) as BALANCE,
                    a.SHIP_DATE,
                    a.DUE_DATE,
                    '' as OVER_DATE,
                    '' as INTEREST
                from
                    ksv_invoice_mst a
                    left join ksv_invoice_bill b on a.invoice_no = b.invoice_no
                where
                    a.due_date < '${eDate}'
                    and a.due_date >= '${sDate}'
                    and a.tot_amt > 0
                    and a.docu_no <> ''
                    and a.payment_type = '1'
                    and a.trade_type2 <> '5'
                    and a.buyer_cd = '${args.data.BUYER_CD}'
                    and a.curr_cd = '${args.data.CURR_CD}'
                    and a.reg_datetime < '20200807000000'
                    and b.bill_type in ('1', '3', '9')
                group by
                    a.due_date,
                    a.invoice_no,
                    a.curr_cd,
                    a.buyer_cd,
                    a.tot_amt,
                    a.ship_date
                having
                    round(a.tot_amt - isnull(sum(b.bill_amt), 0), 2) > 0
                union
                select
                    a.BUYER_CD,
                    a.INVOICE_NO,
                    'KRW' as CURR_CD,
                    round(
                        a.vos_amt + a.vat_amt - isnull(sum(b.bill_amt), 0),
                        2
                    ) as BALANCE,
                    a.ship_date as SHIP_DATE,
                    a.due_date as DUE_DATE,
                    '' as OVER_DATE,
                    '' as INTEREST
                from
                    ksv_invoice_mst a
                    left join ksv_invoice_bill b on a.invoice_no = b.invoice_no
                where
                    a.due_date < '${eDate}'
                    and a.due_date >= '${sDate}'
                    and a.vos_amt + a.vat_amt > 0
                    and a.docu_no <> ''
                    and a.trade_type = '2'
                    and a.trade_type2 = '5'
                    and a.buyer_cd = '${args.data.BUYER_CD}'
                    and b.bill_type in ('1', '3', '9')
                group by
                    a.due_date,
                    a.invoice_no,
                    a.buyer_cd,
                    a.tot_amt,
                    a.ship_date,
                    a.vos_amt,
                    a.vat_amt
                having
                    round(
                        a.vos_amt + a.vat_amt - isnull(sum(b.bill_amt), 0),
                        2
                    ) > 0
            `;
            var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
            var tRetArray = [];
            var tIdx1 = 0;
            for (tIdx1 = 0; tIdx1 < tRet1.length; tIdx1++) {
                var tOne = { ...tRet1[tIdx1] };

                var tDate1 = tOne.SHIP_DATE;
                var tDate2 = saveDate;

                var tDays = AFLib.getBetweenDay(tDate1, tDate2);

                tOne.OVER_DATE = tDays;

                var tInterest =
                    ((parseFloat(tOne.BALANCE) * tDays) / 365.0) * 0.06;
                tOne.INTEREST = tInterest;
                tRetArray.push(tOne);
            }

            return tRetArray;
        },
    },
};

export default moduleQuery_S0709_LIST_2;
