const { MongoClient } = require('mongodb');
const path = require('path');
const fs = require('fs');

var request_sync = require('sync-request');
var rp = require('request-promise');
const multiparty = require('multiparty');
var amqp = require('amqplib/callback_api');
var iconv = require('iconv-lite');

import { Prisma } from '@prisma/client';
import prisma from './db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from './commlib'; //PrismaClient 사용하기 위해 불러오기

const process1 = async (argPuCd: string) => {
    var tRetDate: string = AFLib.getCurrTime();
    var tRetDate1: string = tRetDate.substring(0, 8);

    var sql0: string = `
        select
            *
        from
            kcd_size_mst
    `;
    var obj0: any[] = await prisma.$queryRaw(Prisma.raw(sql0));

    var tIdx: number = 0;
    var tArray = [];
    for (tIdx = 0; tIdx < obj0.length; tIdx++) {
        var tOne: Object = { ...obj0[tIdx] };
        var tSizeMember = tOne[`SIZE_MEMBER`].replace(/ /gi, '');
        var sql1: string = `
            update kcd_size_mst set size_member = '${tSizeMember}' where size_group = '${tOne[`SIZE_GROUP`]}' 
        `;
        var obj1: any[] = await prisma.$queryRaw(Prisma.raw(sql1));

        var sql1: string = `
            select
                *
            from
                kcd_size_mem
        `;
        var obj1: any[] = await prisma.$queryRaw(Prisma.raw(sql1));
        var tIdx1: number = 0;
        for (tIdx1 = 0; tIdx1 < obj1.length; tIdx1++) {
            var tOne1: Object = { ...obj1[tIdx] };
            var tVal = tOne1[`SIZE_VAL`].trim();
            var sql1: string = `
                update kcd_size_mem set size_val = '${tVal}' where size_group = '${tOne1[`SIZE_GROUP`]}'  and size_seq = '${tOne1[`SIZE_SEQ`]}'
            `;
            var obj1: any[] = await prisma.$queryRaw(Prisma.raw(sql1));
        }

        if (tIdx % 1000 === 0) console.log(`Process : ${tIdx}`);
    }
};

var tPuCd = process.argv[2];
process1(tPuCd);
