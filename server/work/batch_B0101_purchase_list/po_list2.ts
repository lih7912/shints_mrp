const { MongoClient } = require('mongodb');
const path = require('path');
const fs = require('fs');

import { Prisma } from '@prisma/client';
import prisma from './db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from './commlib'; //PrismaClient 사용하기 위해 불러오기

const process1 = async (argYear: string, argYear1: string) => {
    type TRet0 = {
        po_cd: string;
        po_status: string;
        plan_flag: string;
    };

    var tRetDate: string = AFLib.getCurrTime();
    var tRetDate1: string = tRetDate.substring(0, 8);

    var sql0: string = `
        select
            po_cd,
            po_status,
            plan_flag
        from
            ksv_po_mst
            -- where left(reg_datetime, 4) >= '2022'
        where
            left(reg_datetime, 4) >= '2024'
            and po_seq = 1
    `;
    var tRet0: TRet0[] = await prisma.$queryRaw(Prisma.raw(sql0));
    console.log(tRet0.length);

    var tIdx: number = 0;
    var tArray = [];
    for (tIdx = 0; tIdx < tRet0.length; tIdx++) {
        var tOne: TRet0 = { ...tRet0[tIdx] };

        var sql1: string = `
            select
                isnull(count(*), 0) as cnt
            from
                ksv_po_vendor
            where
                po_cd = '${tOne.po_cd}'
        `;
        var tRet1: any[] = await prisma.$queryRaw(Prisma.raw(sql1));

        var sql2: string = `
            select
                isnull(count(*), 0) as cnt
            from
                ksv_mail_log
            where
                po_cd = '${tOne.po_cd}'
        `;
        var tRet2: any[] = await prisma.$queryRaw(Prisma.raw(sql2));

        var sql3: string = `
            select
                isnull(sum(po_qty), 0) as cnt
            from
                ksv_stock_mem
            where
                po_cd = '${tOne.po_cd}'
        `;
        var tRet3: any[] = await prisma.$queryRaw(Prisma.raw(sql3));

        if (tRet3[0].cnt <= 0) {
            console.log(
                `${tOne.po_cd}|${tOne.po_status}|${tOne.plan_flag}|${tRet1[0].cnt}|${tRet2[0].cnt}|${tRet3[0].cnt}|`,
            );
        }
    }
};

// var tYear1 = process.argv[2];
// var tYear2 = process.argv[3];
var tYear1: string = '';
var tYear2: string = '';
process1(tYear1, tYear2);
