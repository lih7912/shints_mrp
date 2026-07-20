const path = require('path');
const fs = require('fs');

var request_sync = require('sync-request');
var rp = require('request-promise');
const multiparty = require('multiparty');
var amqp = require('amqplib/callback_api');
var iconv = require('iconv-lite');

import { Prisma } from "@prisma/client";
import prisma from "./db";  //PrismaClient 사용하기 위해 불러오기
import AFLib from "./commlib";  //PrismaClient 사용하기 위해 불러오기

const process1 = async(argPuCd:string) => {

    var tRetDate: string = AFLib.getCurrTime();
    var tRetDate1: string = tRetDate.substring(0, 8);

    var sql0_bak : string =  `
        select row_id, row_no, no_tax, cd_acct, amt, nm_note, cd_pjt, dt_acct from neoe.fi_adocu
        where row_id = '${argPuCd}' 
        order by row_no
    `;

    var sql0 : string =  `
        select row_id, row_no, no_tax, cd_acct, amt, nm_note, cd_pjt, dt_acct, cd_exch, rt_exch, nm_mngd5 from neoe.fi_adocu
        where 1 = 1
          and dt_acct >= '20250901'
          and row_id like 'IS20%'
        order by row_id, row_no
    `;
    var obj0 : any[]  =  await prisma.$queryRaw(Prisma.raw(sql0));

    var tIdx :number = 0; 
    var tArray = [];
    var saveObj : Object = {};
    var writeArray : string[] = [];
    for (tIdx = 0; tIdx < obj0.length; tIdx++) {
        var tOne : Object  = { ...obj0[tIdx] };

        if (tIdx === 0) saveObj = { ...tOne };
        else {
            if (tOne['row_id'] !== saveObj['row_id']) console.log('----------------------------------------------------------------');
            saveObj = { ...tOne };
        }

        var row_id  = tOne['row_id'];
        var row_no  = tOne['row_no'];
        var no_tax  = tOne['no_tax'];
        var cd_acct  = tOne['cd_acct'];
        var amt  = tOne['amt'];
        var nm_note  = tOne['nm_note'];
        var cd_pjt  = tOne['cd_pjt'];
        var dt_acct  = tOne['dt_acct'];
        var cd_exch  = tOne['cd_exch'];
        var rt_exch  = tOne['rt_exch'];
        var nm_mngd5  = tOne['nm_mngd5'];

        let sql1_1 = `
             select rate_base
             from neoe.ma_exchange
             where curr_sour = '${cd_exch}'
             and   yymmdd = '${dt_acct}'
              `;
        var tRet1: any[] = await prisma.$queryRaw(Prisma.raw(sql1_1));
        var strRateBase : number  = 1;
        if (tRet1.length > 0) strRateBase = parseFloat(tRet1[0].rate_base);

        var strRateBase1 : string = strRateBase.toFixed(2);

        if (rt_exch !== strRateBase) {
            console.log(`${row_id}/${row_no}/${no_tax}/${cd_acct}/${amt}/${nm_note}/${cd_pjt}/${dt_acct}/${cd_exch}/${rt_exch}/${nm_mngd5}==> ${strRateBase}/${strRateBase1}`);

            /*
            let sqlUp = `
                 update neoe.fi_adocu set 
                       rt_exch = ${strRateBase1}, 
                       nm_mngd5 = '${strRateBase1}'
                 where row_id = '${row_id}'
                  and  row_no = '${row_no}'
              `;
            var tRetUp: any[] = await prisma.$queryRaw(Prisma.raw(sqlUp));
            */

            if (parseInt(row_no) === 2) {
                var tStr : string = '';
                tStr = `${row_id}/${nm_note}`;
                writeArray.push(tStr);
            }
        }
    }

    writeArray.forEach((col, i) => {
        console.log(col);
    });

}

const process0 = async(argPuCd:string) => {
    var sql0 : string =  `
           select  *
           from neoe.ma_codedtl
           where  cd_company = '1000'
           -- and  cd_field='MA_B000005'
           order by CD_FIELD
    `;
    var obj0 : any[]  =  await prisma.$queryRaw(Prisma.raw(sql0));

    var tIdx :number = 0;
    for (tIdx = 0; tIdx < obj0.length; tIdx++) {
        var tOne : Object  = { ...obj0[tIdx] };

        var tCdField = tOne['CD_FIELD'];
        var tCdSysDef = tOne['CD_SYSDEF'];
        var tNmSysDef = tOne['NM_SYSDEF'];
        var tCdUsrDef = tOne['CD_USRDEF'];
        var tNmUsrDef = tOne['NM_USRDEF'];
        var tRemark = tOne['REMARK'];

        var tStr: string = '';
        tStr += `${tCdField}`;
        tStr += `,${tCdSysDef}`;
        tStr += `,${tNmSysDef}`;
        tStr += `,${tCdUsrDef}`;
        tStr += `,${tNmUsrDef}`;
        tStr += `,${tRemark}`;
        console.log(tStr); 
    }
}

var tPuCd = process.argv[2];
// process1(tPuCd);
process0(tPuCd);

