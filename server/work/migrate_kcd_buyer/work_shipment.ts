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
            ksv_shipment_mst
    `;
    var obj0: any[] = await prisma.$queryRaw(Prisma.raw(sql0));

    var tIdx: number = 0;
    var tArray = [];
    for (tIdx = 0; tIdx < obj0.length; tIdx++) {
        var tOne: Object = { ...obj0[tIdx] };

        var tRemark = tOne[`REMARK`];
        var tShipmentCd = tOne[`SHIPMENT_CD`];

        var sql1: string = `
            select
                max(a.eta) as eta,
                max(isnull(b.c_cnt, 0)) as comfirm_cnt
            from
                ksv_stock_out a
                left join (
                    select
                        pack_cd,
                        count(*) as c_cnt
                    from
                        ksv_stock_out_temp_permit
                    where
                        pack_cd = '${tRemark}'
                    group by
                        pack_cd
                ) b on b.pack_cd = a.pack_cd
            where
                a.pack_cd = '${tRemark}'
        `;
        var obj1: any[] = await prisma.$queryRaw(Prisma.raw(sql1));
        var tConfirmCnt = tOne['confirm_cnt'];
        var tETA = tOne['eta'];
        var tFixFlag = '0';
        if (tConfirmCnt > 0) tFixFlag = '1';

        var sql1: string = `
            select
                kk.po_cd,
                kk.in_date,
                kk.delivery,
                kk.clearance_no,
                count(*)
            from
                ksv_stock_facin kk,
                (
                    select distinct
                        pack_cd,
                        po_cd,
                        matl_cd
                    from
                        ksv_stock_out a
                    where
                        a.pack_cd = '${tRemark}'
                ) kk1
            where
                kk.po_cd = kk1.po_cd
                and kk.matl_cd = kk1.matl_cd
                and kk.delivery like '%${tRemark}%'
            group by
                kk.po_cd,
                kk.in_date,
                kk.delivery,
                kk.clearance_no
        `;
        var obj1: any[] = await prisma.$queryRaw(Prisma.raw(sql1));
        var tDelivery = '';
        var tClearance_no = '';
        obj1.forEach((col, i) => {
            if (col.delivery !== '') tDelivery = col.delivery;
            if (col.clearance_no !== '') tClearance_no = col.clearance_no;
        });

        var sql0: string = `
            update ksv_shipment_mst
            set
                eta = '${tETA}',
                clearance_no = '${tClearance_no}',
                fix_flag = '${tFixFlag}'
            where
                shipment_cd = '${tShipmentCd}'
        `;

        /*
        var tVal = tAccountNo.replace(/-/gi, '');
        tVal = tVal.replace(/_/gi, '');
        tVal = tVal.replace(/ /gi, '');
         */
    }
};

var tPuCd = process.argv[2];
process1(tPuCd);
