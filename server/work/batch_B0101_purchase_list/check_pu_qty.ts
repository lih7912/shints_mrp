const { MongoClient } = require('mongodb');
const path = require('path');
const fs = require('fs');

import { Prisma } from '@prisma/client';
import prisma from './db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from './commlib'; //PrismaClient 사용하기 위해 불러오기

const process1 = async (argPoCd) => {
    var tRetDate = AFLib.getCurrTime();
    var tRetDate1 = tRetDate.substring(0, 8);

    var sql0 = `
        select
            pu_cd,
            matl_cd,
            po_qty as mrp_qty,
            stock_qty,
            po_qty2 as po_qty
        from
            ksv_stock_mem2
        where
            po_cd = '${argPoCd}'
    `;
    var tRet0: any[] = await prisma.$queryRaw(Prisma.raw(sql0));

    console.log(
        'pu_cd|matl_cd|mrp_qty|stock_qty|po_qty|po_mrp_qty|moq_qty|leftover_qty|foc_qty|etc_qty|stock_qty|',
    );

    var tIdx = 0;
    var tArray: any[] = [];
    for (tIdx = 0; tIdx < tRet0.length; tIdx++) {
        var tOne: any = { ...tRet0[tIdx] };

        var tWStr = `${tOne['pu_cd']}|`;
        tWStr += `${tOne['matl_cd']}|`;
        tWStr += `${tOne['mrp_qty']}|`;
        tWStr += `${tOne['stock_qty']}|`;
        tWStr += `${tOne['po_qty']}|`;

        var sql1 = `
            select
                sum(po_qty) as po_mrp_qty
            from
                ksv_po_mrp
            where
                po_cd = '${argPoCd}'
                and matl_cd = '${tOne['matl_cd']}'
                and pu_cd = '${tOne['pu_cd']}'
        `;
        var tRet1: any[] = await prisma.$queryRaw(Prisma.raw(sql1));
        if (tRet1.length > 0) tWStr += `${tRet1[0]['po_mrp_qty']}|`;

        var sql1_1 = `
            select
                isnull(sum(po_qty), 0) as moq_qty
            from
                ksv_po_mrp
            where
                po_cd = '${argPoCd}'
                and matl_cd = '${tOne['matl_cd']}'
                and pu_cd = '${tOne['pu_cd']}'
                and po_seq = 99
        `;
        var tRet1_1: any[] = await prisma.$queryRaw(Prisma.raw(sql1_1));
        if (tRet1_1.length > 0) tWStr += `${tRet1_1[0]['moq_qty']}|`;

        var sql1_2 = `
            select
                isnull(sum(po_qty), 0) as leftover_qty
            from
                ksv_po_mrp
            where
                po_cd = '${argPoCd}'
                and matl_cd = '${tOne['matl_cd']}'
                and pu_cd = '${tOne['pu_cd']}'
                and po_seq = 98
        `;
        var tRet1_2: any[] = await prisma.$queryRaw(Prisma.raw(sql1_2));
        if (tRet1_2.length > 0) tWStr += `${tRet1_2[0]['leftover_qty']}|`;

        var sql1_3 = `
            select
                isnull(sum(po_qty), 0) as foc_qty
            from
                ksv_po_mrp
            where
                po_cd = '${argPoCd}'
                and matl_cd = '${tOne['matl_cd']}'
                and pu_cd = '${tOne['pu_cd']}'
                and po_seq = 97
        `;
        var tRet1_3: any[] = await prisma.$queryRaw(Prisma.raw(sql1_3));
        if (tRet1_3.length > 0) tWStr += `${tRet1_3[0]['foc_qty']}|`;

        var sql1_4 = `
            select
                isnull(sum(po_qty), 0) as etc_qty
            from
                ksv_po_mrp
            where
                po_cd = '${argPoCd}'
                and matl_cd = '${tOne['matl_cd']}'
                and pu_cd = '${tOne['pu_cd']}'
                and po_seq > 100
        `;
        var tRet1_4: any[] = await prisma.$queryRaw(Prisma.raw(sql1_4));
        if (tRet1_4.length > 0) tWStr += `${tRet1_4[0]['etc_qty']}|`;

        var sql2 = `
            select
                isnull(sum(po_qty), 0) as stock_mem_qty
            from
                ksv_stock_mem
            where
                po_cd = '${argPoCd}'
                and matl_cd = '${tOne['matl_cd']}'
                and pu_cd = '${tOne['pu_cd']}'
        `;
        var tRet2: any[] = await prisma.$queryRaw(Prisma.raw(sql2));
        if (tRet2.length > 0) tWStr += `${tRet2[0]['stock_mem_qty']}|`;

        console.log(tWStr);
    }
};

process1('PO24-0499');
