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
                a.po_cd,
                sum(a.po_qty) as po_qty
            from
                ksv_po_mrp a,
                kcd_matl_mst b,
                ksv_po_vendor c
            where
                a.po_cd = ${tOne.po_cd}
                and (
                    a.po_seq < 97
                    or a.po_seq > 100
                )
                and a.use_po_type = '1'
                -- and a.diff_po_type <> '1'
                and a.po_cd = c.po_cd
                and a.matl_cd = b.matl_cd
                and b.vendor_cd = c.vendor_cd
            group by
                b.vendor_cd,
                a.po_cd
        `;
        // console.log(tRet1);

        var tIdx1 = 0;
        for (tIdx1 = 0; tIdx1 < tRet1.length; tIdx1++) {
            var tOne1 = tRet1[tIdx1];
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
                var tObj = { ...tOne1 };
                tObj.stock_qty = tRet2[0].po_qty;
                tArray.push(tObj);
            } else {
                var tObj = { ...tOne1 };
                tObj.stock_qty = 0;
                tArray.push(tObj);
            }
        }
    }

    console.log(tArray);

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
