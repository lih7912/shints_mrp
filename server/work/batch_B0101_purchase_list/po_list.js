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
        select
            po_cd,
            po_status,
            plan_flag
        from
            ksv_po_mst
        where
            left(reg_datetime, 4) >= '2022'
            and po_seq = 1
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
                isnull(count(*), 0) as cnt
            from
                ksv_po_vendor
            where
                po_cd = ${tOne.po_cd}
        `;

        var tRet2 = await prisma.$queryRaw`
            select
                isnull(count(*), 0) as cnt
            from
                ksv_mail_log
            where
                po_cd = ${tOne.po_cd}
        `;

        var tRet3 = await prisma.$queryRaw`
            select
                isnull(sum(po_qty), 0) as cnt
            from
                ksv_stock_mem
            where
                po_cd = ${tOne.po_cd}
        `;

        var tRet4 = await prisma.$queryRaw`
            select
                isnull(sum(in_qty), 0) as cnt
            from
                ksv_stock_in
            where
                po_cd = ${tOne.po_cd}
        `;

        var tRet5 = await prisma.$queryRaw`
            select
                isnull(sum(out_qty), 0) as cnt
            from
                ksv_stock_out
            where
                po_cd = ${tOne.po_cd}
        `;

        console.log(
            `${tOne.po_cd}|${tOne.po_status}|${tOne.plan_flag}|${tRet1[0].cnt}|${tRet2[0].cnt}|${tRet3[0].cnt}|${tRet4[0].cnt}|${tRet5[0].cnt}`,
        );
    }

    /*
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
*/

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

// var tYear1 = process.argv[2];
// var tYear2 = process.argv[3];
var tYear1 = '';
var tYear2 = '';
process1(tYear1, tYear2);
