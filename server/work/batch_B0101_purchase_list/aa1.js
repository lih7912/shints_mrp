const { MongoClient } = require('mongodb');
const path = require('path');
const fs = require('fs');

// import { Prisma } from "@prisma/client";
// import prisma from "../../db";  //PrismaClient 사용하기 위해 불러오기

/*
const { PrismaClient : PrismaClient1 } = require('../../prisma/client');
const prisma = new PrismaClient1();
*/
/*
const { PrismaClient : PrismaClient2 } = require('../../prisma/mysql_client');
const prisma_mysql = new PrismaClient2();
*/

const { PrismaClient: PrismaClient1 } = require('@prisma/client');
const prisma = new PrismaClient1();

const process1 = async (argYear, argYear1) => {
    var tDate = new Date();
    var mm = tDate.getMonth() + 1;
    var mm_str = '';
    if (mm > 9) mm_str = mm.toString();
    else mm_str = '0' + mm;

    var dd = tDate.getDate();
    var dd_str = '';
    if (dd > 9) dd_str = dd;
    else dd_str = '0' + dd;

    var hours = tDate.getHours();
    var hours_str = '';
    if (hours > 9) hours_str = hours.toString();
    else hours_str = '0' + hours;

    var minutes = tDate.getMinutes();
    var minutes_str = '';
    if (minutes > 9) minutes_str = minutes.toString();
    else minutes_str = '0' + minutes;

    var seconds = tDate.getSeconds();
    var seconds_str = '';
    if (seconds > 9) seconds_str = seconds.toString();
    else seconds_str = '0' + seconds;

    var yyyy = tDate.getFullYear();
    var tRetDate =
        yyyy.toString() +
        mm_str +
        dd_str +
        hours_str +
        minutes_str +
        seconds_str;
    var tBuyerCd = 'NB';

    var tRet0 = await prisma.$queryRaw`
        select distinct
            a.book_date,
            a.user_id,
            a.buyer_cd,
            a.po_cd
        from
            ksv_capabook_mem a,
            (
                select
                    user_id,
                    min(book_date) as book_date
                from
                    ksv_capabook_mst
                where
                    status_cd = '0'
                    and user_id in (
                        'kr',
                        'rnd',
                        'sales1',
                        'sales2',
                        'sales3',
                        'sales4'
                    )
                group by
                    user_id
            ) b
        where
            a.user_id = b.user_id
            and a.book_date = b.book_date
            and job_cd in ('0', 'I', 'U')
            and a.buyer_cd = ${tBuyerCd}
            and a.po_cd <> ''
        union
        select distinct
            a.book_date,
            a.user_id,
            a.buyer_cd,
            a.po_cd
        from
            ksv_capabook_mem_ethiopia a,
            (
                select
                    user_id,
                    min(book_date) as book_date
                from
                    ksv_capabook_mst_ethiopia
                where
                    status_cd = '0'
                    and user_id in (
                        'kr',
                        'rnd',
                        'sales1',
                        'sales2',
                        'sales3',
                        'sales4'
                    )
                group by
                    user_id
            ) b
        where
            a.user_id = b.user_id
            and a.book_date = b.book_date
            and job_cd in ('0', 'I', 'U')
            and a.buyer_cd = ${tBuyerCd}
            and a.po_cd <> ''
        union
        select distinct
            a.book_date,
            a.user_id,
            a.buyer_cd,
            a.po_cd
        from
            ksv_capasample_mem a,
            (
                select
                    user_id,
                    min(book_date) as book_date
                from
                    ksv_capasample_mst
                where
                    status_cd = '0'
                    and user_id in (
                        'kr',
                        'rnd',
                        'sales1',
                        'sales2',
                        'sales3',
                        'sales4'
                    )
                group by
                    user_id
            ) b
        where
            a.user_id = b.user_id
            and a.book_date = b.book_date
            and job_cd in ('0', 'I', 'U')
            and a.buyer_cd = ${tBuyerCd}
            and a.po_cd <> ''
        union
        select distinct
            a.book_date,
            a.user_id,
            a.buyer_cd,
            a.po_cd
        from
            ksv_capasample_mem_ethiopia a,
            (
                select
                    user_id,
                    min(book_date) as book_date
                from
                    ksv_capasample_mst_ethiopia
                where
                    status_cd = '0'
                    and user_id in (
                        'kr',
                        'rnd',
                        'sales1',
                        'sales2',
                        'sales3',
                        'sales4'
                    )
                group by
                    user_id
            ) b
        where
            a.user_id = b.user_id
            and a.book_date = b.book_date
            and job_cd in ('0', 'I', 'U')
            and a.buyer_cd = ${tBuyerCd}
            and a.po_cd <> ''
    `;
    // console.log("Select Count:" + tRet0[0].cnt1);
    //if (tRet0[0].cnt1 > 90000) process.exit();
    // console.log(tRet0);

    var tIdx = 0;
    var tArray = [];
    for (tIdx = 0; tIdx < tRet0.length; tIdx++) {
        var tOne = tRet0[tIdx];

        var tRet1 = await prisma.$queryRaw`
            select
                b.vendor_cd,
                b3.vendor_name,
                b3.vendor_matl_type,
                b3.vendor_type,
                b3.pay_term,
                b3.pay_type,
                b3.overshort_rate,
                a.po_cd,
                isnull(c.pu_cd, '') as pu_cd,
                sum(a.po_qty) as po_qty,
                sum(a.po_qty * b1.matl_price * b2.usd_rate) as matl_amt
            from
                ksv_po_mrp a,
                kcd_matl_mst b,
                ksv_po_vendor c,
                kcd_matl_mem b1,
                kcd_currency b2,
                kcd_vendor b3
            where
                a.po_cd = ${tOne.po_cd}
                and (
                    a.pu_cd is null
                    or a.pu_cd = ''
                )
                and (
                    a.po_seq < 97
                    or a.po_seq > 100
                )
                and a.use_po_type = '1'
                -- and a.diff_po_type <> '1'
                and a.po_cd = c.po_cd
                and a.matl_cd = b.matl_cd
                and b.vendor_cd = c.vendor_cd
                and b.vendor_cd = b3.vendor_cd
                and b.matl_cd = b1.matl_cd
                and b1.matl_seq = 1
                and b1.curr_cd = b2.curr_cd
                and b2.start_date = '20240523'
            group by
                b.vendor_cd,
                b3.vendor_name,
                b3.vendor_matl_type,
                b3.vendor_type,
                b3.pay_term,
                b3.pay_type,
                b3.overshort_rate,
                a.po_cd,
                isnull(c.pu_cd, '')
        `;
        // console.log(tRet1);

        var tIdx1 = 0;
        for (tIdx1 = 0; tIdx1 < tRet1.length; tIdx1++) {
            var tOne1 = { ...tRet1[tIdx1] };

            if (tOne1.pu_cd !== '') {
                var tRet4 = await prisma.$queryRaw`
                    select
                        pu_cd,
                        curr_cd,
                        pi_no,
                        order_date,
                        due_date,
                        ex_factory,
                        normi,
                        bill_to,
                        pay_date,
                        place_cd,
                        ship_to,
                        origin_port,
                        trade_term
                    from
                        ksv_pu_mst2
                    where
                        pu_cd = ${tOne1.pu_cd}
                `;
                tOne1.p_pu_cd = tRet4[0].pu_cd;
                tOne1.p_curr_cd = tRet4[0].curr_cd;
                tOne1.p_pi_no = tRet4[0].pi_no;
                tOne1.p_order_date = tRet4[0].order_date;
                tOne1.p_due_date = tRet4[0].due_date;
                tOne1.p_ex_factory = tRet4[0].ex_factory;
                tOne1.p_normi = tRet4[0].normi;
                tOne1.p_bill_to = tRet4[0].bill_to;
                tOne1.p_pay_date = tRet4[0].pay_date;
                tOne1.p_place_cd = tRet4[0].place_cd;
                tOne1.p_ship_to = tRet4[0].ship_to;
                tOne1.origin_port = tRet4[0].origin_port;
                tOne1.trade_term = tRet4[0].trade_term;
            } else {
                tOne1.p_pu_cd = '';
                tOne1.p_curr_cd = '';
                tOne1.p_pi_no = '';
                tOne1.p_order_date = '';
                tOne1.p_due_date = '';
                tOne1.p_ex_factory = '';
                tOne1.p_normi = '';
                tOne1.p_bill_to = '';
                tOne1.p_pay_date = '';
                tOne1.p_place_cd = '';
                tOne1.p_ship_to = '';
                tOne1.origin_port = '';
                tOne1.trade_term = '';
            }

            var tRet3 = await prisma.$queryRaw`
                select
                    d.buyer_cd,
                    d.buyer_name,
                    left(a.reg_datetime, 8) as mrp_date,
                    a.plan_flag,
                    a.plan_etd,
                    a.plan_eta,
                    a.factory_cd,
                    e.factory_name,
                    max(c.due_date) as prod_due_date,
                    min(c.matl_due_date) as matl_due_date
                from
                    ksv_po_mst a,
                    ksv_po_mem b,
                    ksv_order_mst c,
                    kcd_buyer d,
                    kcd_factory e
                where
                    a.po_cd = ${tOne.po_cd}
                    and a.po_seq = 1
                    and a.po_cd = b.po_cd
                    and b.po_seq = 1
                    and b.order_cd = c.order_cd
                    and left(c.order_cd, 2) = d.buyer_cd
                    and a.factory_cd = e.factory_cd
                group by
                    d.buyer_cd,
                    d.buyer_name,
                    left(a.reg_datetime, 8),
                    a.plan_flag,
                    a.plan_etd,
                    a.plan_eta,
                    a.factory_cd,
                    e.factory_name
            `;
            if (tRet3.length > 0) {
                tOne1.buyer_cd = tRet3[0].buyer_cd;
                tOne1.buyer_name = tRet3[0].buyer_name;
                tOne1.mrp_date = tRet3[0].mrp_date;
                tOne1.plan_flag = tRet3[0].plan_flag;
                tOne1.plan_etd = tRet3[0].plan_etd;
                tOne1.factory_cd = tRet3[0].factory_cd;
                tOne1.factory_name = tRet3[0].factory_name;
                tOne1.prod_due_date = tRet3[0].prod_due_date;
                tOne1.matl_due_date = tRet3[0].matl_due_date;
            }

            var tRet2 = await prisma.$queryRaw`
                select
                    b1.vendor_cd,
                    sum(a1.use_qty) as po_qty
                from
                    ksv_stock_use a1,
                    kcd_matl_mst b1,
                    ksv_po_vendor c1
                where
                    a1.use_po_cd = ${tOne.po_cd}
                    and (
                        a1.use_po_seq < 97
                        or a1.use_po_seq > 100
                    )
                    and a1.use_po_cd = c1.po_cd
                    and a1.use_matl_cd = b1.matl_cd
                    and b1.vendor_cd = c1.vendor_cd
                    and b1.vendor_cd = ${tOne1.vendor_cd}
                group by
                    b1.vendor_cd
            `;

            if (tRet2.length > 0) {
                tOne1.stock_qty = tRet2[0].po_qty;
                tOne1.mrp_qty = tOne1.stock_qty + tOne1.po_qty;
                tArray.push(tOne1);
            } else {
                tOne1.stock_qty = 0;
                tOne1.mrp_qty = tOne1.stock_qty + tOne1.po_qty;
                tArray.push(tOne1);
            }
        }
    }

    var tArray1 = [];
    tArray.forEach((col, i) => {
        var tObj = {};

        var tCols = Object.keys(col);

        tCols.forEach((col1, i1) => {
            var tKey = col1;
            var tKey1 = col1.toUpperCase();
            tObj[`${tKey1}`] = col[`${tKey}`];
        });

        tArray1.push(tObj);
    });

    console.log(tArray1);

    /*
    const client = new MongoClient('mongodb://test:test1234@localhost:27017');
    var mongo_db = '';
    var tInitData = 0;

    try {
         await client.connect();
         console.log('connect-1');
         mongo_db = client.db('afroba');
    } catch(error) {
         process.exit();
    }

    try {
       await mongo_db.collection('B0101').insertMany(tArray);
       tCnt1 = await mongo_db.collection('B0101').count();

       console.log("init data insert:" + tCnt1 );
       mongo_db.close();

       console.log(`${argYear} is length(${tRet.length}) ==> Process End `);
   } catch (e) {
       console.error('error insert :' + e.message);
       process.exit();
   }
*/
};

var tYear1 = process.argv[2];
var tYear2 = process.argv[3];
process1(tYear1, tYear2);
