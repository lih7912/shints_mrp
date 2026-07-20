const { MongoClient } = require('mongodb');
const path = require('path');
const fs = require('fs');

import { Prisma } from '@prisma/client';
import prisma from '../../src/db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from './commlib'; //PrismaClient 사용하기 위해 불러오기

const process1 = async () => {
    var tRetDate: string = AFLib.getCurrTime();
    var tRetDate1: string = tRetDate.substring(0, 8);

    var sqlStsIn: string = `
        select
            a.pu_cd,
            a.po_cd2,
            a.vendor_cd,
            sum(b2.po_qty) as po_qty,
            sum(b2.in_qty) as in_qty
        from
            ksv_pu_mst2 a,
            ksv_stock_mem2 b1,
            ksv_stock_mem b2
        where
            a.pu_cd = b1.pu_cd
            and b1.po_cd = b2.po_cd
            and b1.matl_cd = b2.matl_cd
        group by
            a.pu_cd,
            a.po_cd2,
            a.vendor_cd
    `;
    var objStsIns: any[] = await prisma.$queryRaw(Prisma.raw(sqlStsIn));

    var tIdx: number = 0;
    var tArray = [];
    for (tIdx = 0; tIdx < objStsIns.length; tIdx++) {
        var tOne: Object = { ...objStsIns[tIdx] };

        // console.log(`=======================================================`);
        // console.log(`>>>>> (1) ${tOne['pu_cd']} | ${tOne['po_cd2']} | ${tOne['vendor_cd']} | ${tOne['po_qty']} | ${tOne['in_qty']} `);

        if (parseInt(tOne['in_qty']) <= 0) {
            continue;
        }

        console.log(
            `${tOne['pu_cd']}|${tOne['po_cd2']}|${tOne['vendor_cd']}|${tOne['po_qty']}|${tOne['in_qty']}|`,
        );

        /*

        var sqlStsIn1: string =  `
            select
                b2.matl_cd,
                left(b2.in_datetime, 8) as in_date,
                sum(b2.in_qty) as in_qty
            from
                ksv_stock_mem2 b1,
                ksv_stock_in b2
            where
                b1.pu_cd = '${tOne['pu_cd']}'
                and b1.po_cd = b2.po_cd
                and b1.matl_cd = b2.matl_cd
            group by
                b2.matl_cd,
                left(b2.in_datetime, 8)
            order by
                b2.matl_cd,
                left(b2.in_datetime, 8)
        `;
        var objStsIn1s:any[]  =  await prisma.$queryRaw(Prisma.raw(sqlStsIn1));

        var tTot = 0.0;
        var tArray1 : any[] = [];
        var tArray2 : any[] = [];
        var tSaveMatlCd = '';
        objStsIn1s.forEach((col1, i) => {
            if (i > 0 && col1['matl_cd']  !== tSaveMatlCd) {
                tArray1.push(tArray2);
                tArray2 = [];
            }
            tArray2.push(col1);
            tSaveMatlCd = col1['matl_cd'];
            // console.log(`>>>>> (2) ${col1['matl_cd']} |${col1['in_date']}|  ${col1['in_qty']} `);
            tTot += col1['in_qty'];
        });
        tArray1.push(tArray2);
        tArray1.forEach((col2, i2) => {
            console.log(`>>>>> (2) ${col2[0]['matl_cd']} ================== `);
            col2.forEach((col3, i3) => {
                console.log(`>>>>> (3) ${col3['matl_cd']} |${col3['in_date']}|  ${col3['in_qty']} `);
            });
        });
        console.log(`>>>>> (3)  ${tOne['in_qty']} | ${tTot} `);
*/
    }
};

// var tYear1 = process.argv[2];
process1();
