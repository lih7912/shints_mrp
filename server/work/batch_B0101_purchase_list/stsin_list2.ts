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
            0 as moq_qty,
            0 as leftin_qty,
            0 as foc_qty,
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
            and a.pu_cd = 'PU24-WG000039'
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

        console.log(`=======================================================`);
        console.log(
            `>>>>> (1) ${tOne['pu_cd']} | ${tOne['po_cd2']} | ${tOne['vendor_cd']} | ${tOne['po_qty']} | ${tOne['in_qty']} `,
        );

        if (parseInt(tOne['in_qty']) <= 0) {
            continue;
        }

        var sqlStsIn1: string = `
            select
                left(b2.in_datetime, 8) as in_date,
                b2.matl_cd,
                b1.po_price,
                sum(b2.in_qty) as in_qty
            from
                ksv_stock_mem2 b1,
                ksv_stock_in b2
            where
                b1.pu_cd = '${tOne['pu_cd']}'
                and b1.po_cd = b2.po_cd
                and b1.matl_cd = b2.matl_cd
            group by
                left(b2.in_datetime, 8),
                b2.matl_cd,
                b1.po_price
            order by
                left(b2.in_datetime, 8),
                b2.matl_cd,
                b1.po_price
        `;
        var objStsIn1s: any[] = await prisma.$queryRaw(Prisma.raw(sqlStsIn1));

        var tTot = 0.0;
        var tArray1: any[] = [];
        var tArray2: any[] = [];
        var tSaveInDate = '';
        var tIdx1 = 0;
        for (tIdx1 = 0; tIdx1 < objStsIn1s.length; tIdx1++) {
            var col1: any = { ...objStsIn1s[tIdx1] };

            var tMoq = 0;
            var sqlMoq: string = `
                select
                    sum(po_qty) as cnt
                from
                    ksv_po_mrp
                where
                    po_cd = '${tOne['po_cd2']}'
                    and po_seq = 99
                    and matl_cd = '${col1['matl_cd']}'
            `;
            var objMoqs: any[] = await prisma.$queryRaw(Prisma.raw(sqlMoq));
            if (objMoqs.length > 0) tMoq = objMoqs[0]['cnt'];

            var tLeftIn = 0;
            var sqlLeftIn: string = `
                select
                    sum(po_qty) as cnt
                from
                    ksv_po_mrp
                where
                    po_cd = '${tOne['po_cd2']}'
                    and po_seq = 98
                    and matl_cd = '${col1['matl_cd']}'
            `;
            var objLeftIns: any[] = await prisma.$queryRaw(
                Prisma.raw(sqlLeftIn),
            );
            if (objLeftIns.length > 0) tLeftIn = objLeftIns[0]['cnt'];

            var tFoc = 0;
            var sqlFoc: string = `
                select
                    sum(po_qty) as cnt
                from
                    ksv_po_mrp
                where
                    po_cd = '${tOne['po_cd2']}'
                    and po_seq = 97
                    and matl_cd = '${col1['matl_cd']}'
            `;
            var objFocs: any[] = await prisma.$queryRaw(Prisma.raw(sqlFoc));
            if (objFocs.length > 0) tFoc = objFocs[0]['cnt'];

            col1['moq_qty'] = tMoq;
            col1['leftin_qty'] = tLeftIn;
            col1['foc_qty'] = tFoc;

            if (tIdx1 > 0 && col1['in_date'] !== tSaveInDate) {
                tArray1.push(tArray2);
                tArray2 = [];
            }
            tArray2.push(col1);
            tSaveInDate = col1['in_date'];
            // console.log(`>>>>> (2) ${col1['matl_cd']} |${col1['in_date']}|  ${col1['in_qty']} `);
            tTot += col1['in_qty'];
        }
        tArray1.push(tArray2);
        tArray1.forEach((col2, i2) => {
            console.log(`>>>>> (2) ${col2[0]['in_date']}| ================== `);
            col2.forEach((col3, i3) => {
                console.log(
                    `>>>>> (3) ${col3['in_date']} |${col3['matl_cd']}|  ${col3['in_qty']} | ${col3['po_price']}`,
                );
            });
        });
        console.log(`>>>>> (3)  ${tOne['in_qty']} | ${tTot} `);
    }
};

// var tYear1 = process.argv[2];
process1();
