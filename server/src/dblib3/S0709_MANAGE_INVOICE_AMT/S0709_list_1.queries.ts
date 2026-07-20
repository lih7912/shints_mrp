import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0709_LIST_1 = {
    Query: {
        mgrQueryS0709_LIST_1: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var sDate = args.data.S_BILL_DATE;
            var eDate = args.data.E_BILL_DATE;
            if (sDate === '') {
                sDate = `${tRetDate.substring(0, 4)}0101`;
            }
            eDate = tRetDate1;

            try {
                let del1 = `
                    DELETE FROM ksv_invoice_temp
                    where
                        reg_user = '${tUserInfo.USER_ID}'
                `;
                var tDel1 = await prisma.$queryRaw(Prisma.raw(del1));

                let in1 = `
                    insert into
                        ksv_invoice_temp
                    select distinct
                        a.buyer_cd,
                        a.curr_cd,
                        '${tUserInfo.USER_ID}'
                    from
                        ksv_invoice_mst a
                    where
                        a.due_date > '${sDate}'
                        and a.buyer_cd like '%${args.data.BUYER_CD}%'
                        and a.payment_type = '1'
                        and a.trade_type2 <> '5'
                        and a.docu_no <> ''
                    union
                    select distinct
                        a.buyer_cd,
                        'KRW',
                        '${tUserInfo.USER_ID}'
                    from
                        ksv_invoice_mst a
                    where
                        a.due_date > '${sDate}'
                        and a.buyer_cd like '%${args.data.BUYER_CD}%'
                        and a.trade_type = '2'
                        and a.trade_type2 = '5'
                        and a.docu_no <> ''
                `;
                var tIn1 = await prisma.$queryRaw(Prisma.raw(in1));

                let in2 = `
                    insert into
                        ksv_invoice_temp
                    select distinct
                        a.buyer_cd,
                        a.curr_cd,
                        '${tUserInfo.USER_ID}'
                    from
                        ksv_crdb_mst a
                        left join ksv_crdb_mem b on a.crdb_cd = b.crdb_cd
                    where
                        a.end_date between '${sDate}' and '${eDate}'
                        and a.buyer_cd like '%${args.data.BUYER_CD}%'
                        and a.status_cd in ('0', '2')
                        and a.crdb_type in ('D', 'C')
                        and a.crdb_Seq = (
                            select
                                max(crdb_seq)
                            from
                                ksv_crdb_mst
                            where
                                a.crdb_cd = crdb_cd
                        )
                `;
                var tIn2 = await prisma.$queryRaw(Prisma.raw(in2));

                let sql1 = `
                    select distinct
                        buyer_cd,
                        curr_cd
                    from
                        ksv_invoice_temp
                    where
                        reg_user = '${tUserInfo.USER_ID}'
                        and buyer_cd like '%${args.data.BUYER_CD}%'
                    order by
                        1,
                        2
                `;
                var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));

                var buyerCurrList = tRet1.map((x) => ({
                    buyer_cd: x.buyer_cd,
                    curr_cd: x.curr_cd,
                }));
                var buyerCurrKeys = buyerCurrList.map(
                    (x) => `'${x.buyer_cd}_${x.curr_cd}'`,
                );

                var tDateArray = [
                    { s_date: sDate, e_date: eDate },
                    {
                        s_date: eDate,
                        e_date: AFLib.getCurrTimeAdd(7).substring(0, 8),
                    },
                    {
                        s_date: AFLib.getCurrTimeAdd(7).substring(0, 8),
                        e_date: AFLib.getCurrTimeAdd(14).substring(0, 8),
                    },
                    {
                        s_date: AFLib.getCurrTimeAdd(14).substring(0, 8),
                        e_date: '99999999',
                    },
                ];

                var sql2All = '';
                for (let tIdx = 0; tIdx < 4; tIdx++) {
                    let range = tDateArray[tIdx];
                    sql2All += `
                        select
                            '${tIdx}' as idx,
                            round(
                                isnull(sum(c.part_amt), 0) - isnull(sum(b.bill_amt), 0),
                                2
                            ) as c_amt,
                            a.buyer_cd,
                            a.invoice_no,
                            a.ship_date,
                            c.due_date,
                            a.curr_cd
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
                            and c.due_date < '${range.e_date}'
                            and c.due_date >= '${range.s_date}'
                            and a.tot_amt > 0
                            and a.docu_no <> ''
                            and a.payment_type = '1'
                            and a.trade_type2 <> '5'
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
                        union all
                        select
                            '${tIdx}' as idx,
                            round(a.tot_amt - isnull(sum(b.bill_amt), 0), 2) as c_amt,
                            a.buyer_cd,
                            a.invoice_no,
                            a.ship_date,
                            a.due_date,
                            a.curr_cd
                        from
                            ksv_invoice_mst a
                            left join ksv_invoice_bill b on a.invoice_no = b.invoice_no
                        where
                            a.due_date < '${range.e_date}'
                            and a.due_date >= '${range.s_date}'
                            and a.tot_amt > 0
                            and a.docu_no <> ''
                            and a.payment_type = '1'
                            and a.trade_type2 <> '5'
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
                        union all
                        select
                            '${tIdx}' as idx,
                            round(
                                a.vos_amt + a.vat_amt - isnull(sum(b.bill_amt), 0),
                                2
                            ) as c_amt,
                            a.buyer_cd,
                            a.invoice_no,
                            a.ship_date,
                            a.due_date,
                            'KRW' as curr_cd
                        from
                            ksv_invoice_mst a
                            left join ksv_invoice_bill b on a.invoice_no = b.invoice_no
                        where
                            a.due_date < '${range.e_date}'
                            and a.due_date >= '${range.s_date}'
                            and a.vos_amt + a.vat_amt > 0
                            and a.docu_no <> ''
                            and a.trade_type = '2'
                            and a.trade_type2 = '5'
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
                            ) > 0;
                    `;
                }
                var tRet2All = await prisma.$queryRaw(Prisma.raw(sql2All));

                var tRet3All = await prisma.$queryRaw(
                    Prisma.raw(`
                        select
                            c.due_date,
                            a.buyer_cd,
                            a.curr_cd
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
                            b.buyer_cd = a.buyer_cd
                            and c.invoice_no = a.invoice_no
                            and c.due_date < '${eDate}'
                            and c.due_date >= '${sDate}'
                            and a.payment_type = '1'
                            and a.tot_amt > 0
                            and a.docu_no <> ''
                            and a.reg_datetime > '20200807000000'
                        group by
                            c.due_date,
                            a.invoice_no,
                            a.buyer_cd,
                            a.curr_cd
                        having
                            round(sum(c.part_amt) - isnull(sum(b.bill_amt), 0), 2) > 0
                    `),
                );

                var tRet4All = await prisma.$queryRaw(
                    Prisma.raw(`
                        select
                            a.buyer_cd,
                            a.curr_cd,
                            isnull(sum(a.crdb_amt), 0) - isnull(sum(b.crdb_amt), 0) as s_amt
                        from
                            ksv_crdb_mst a
                            left join ksv_crdb_mem b on a.crdb_cd = b.crdb_cd
                        where
                            a.end_date < '${eDate}'
                            and a.end_date >= '${sDate}'
                            and a.status_cd in ('0', '2')
                            and a.crdb_type = 'D'
                            and a.crdb_seq = (
                                select
                                    max(crdb_seq)
                                from
                                    ksv_crdb_mst
                                where
                                    a.crdb_cd = crdb_cd
                            )
                        group by
                            a.buyer_cd,
                            a.curr_cd
                    `),
                );

                var tRet5All = await prisma.$queryRaw(
                    Prisma.raw(`
                        select
                            a.buyer_cd,
                            a.curr_cd,
                            isnull(sum(a.crdb_amt), 0) - isnull(sum(b.crdb_amt), 0) as s_amt
                        from
                            ksv_crdb_mst a
                            left join ksv_crdb_mem b on a.crdb_cd = b.crdb_cd
                        where
                            a.end_date < '${eDate}'
                            and a.end_date >= '${sDate}'
                            and a.status_cd in ('0', '2')
                            and a.crdb_type = 'C'
                            and a.crdb_seq = (
                                select
                                    max(crdb_seq)
                                from
                                    ksv_crdb_mst
                                where
                                    a.crdb_cd = crdb_cd
                            )
                        group by
                            a.buyer_cd,
                            a.curr_cd
                    `),
                );

                var tRetArray = [];
                for (let tOne of tRet1) {
                    var tWObj = {};
                    tWObj.BUYER_CD = tOne.buyer_cd;
                    tWObj.CURR_CD = tOne.curr_cd;
                    var tKey = `${tOne.buyer_cd}_${tOne.curr_cd}`;

                    var tAmt = [0, 0, 0, 0];
                    for (let i = 0; i < 4; i++) {
                        var match = tRet2All.find(
                            (x) =>
                                x.idx === `${i}` &&
                                x.buyer_cd === tOne.buyer_cd &&
                                x.curr_cd === tOne.curr_cd,
                        );
                        if (match) tAmt[i] = parseFloat(match.c_amt);
                    }
                    var tTotal = tAmt.reduce((a, b) => a + b, 0);

                    tWObj.OVER_DATE = tAmt[0];
                    tWObj.ONE_WEEK = tAmt[1];
                    tWObj.TWO_WEEK = tAmt[2];
                    tWObj.TWO_WEEK_AFTER = tAmt[3];
                    tWObj.TOTAL = tTotal;

                    var tOverDates = tRet3All.filter(
                        (x) =>
                            x.buyer_cd === tOne.buyer_cd &&
                            x.curr_cd === tOne.curr_cd,
                    );
                    var tOverDays = 0;
                    for (let x of tOverDates) {
                        tOverDays += AFLib.getBetweenDay(x.due_date, eDate);
                    }
                    tWObj.TOTAL_DATE = tOverDays;

                    tWObj.INTEREST = ((tTotal * tOverDays) / 365.0) * 0.06;

                    var debit = tRet4All.find(
                        (x) =>
                            x.buyer_cd === tOne.buyer_cd &&
                            x.curr_cd === tOne.curr_cd,
                    );
                    tWObj.DEBIT = debit ? parseFloat(debit.s_amt) : 0;

                    var credit = tRet5All.find(
                        (x) =>
                            x.buyer_cd === tOne.buyer_cd &&
                            x.curr_cd === tOne.curr_cd,
                    );
                    tWObj.CREDIT = credit ? parseFloat(credit.s_amt) : 0;

                    tRetArray.push(tWObj);
                }

                console.log(tRetArray[0]);
                return tRetArray;
            } catch (e) {
                return [];
            }
        },
    },
};

export default moduleQuery_S0709_LIST_1;
