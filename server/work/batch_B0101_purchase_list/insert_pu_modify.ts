const { MongoClient } = require('mongodb');
const path = require('path');
const fs = require('fs');

import { Prisma } from '@prisma/client';
import prisma from './db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from './commlib'; //PrismaClient 사용하기 위해 불러오기

const process1 = async (
    argPoCd: string,
    argVendorCd: string,
): Promise<string> => {
    var tRetDateFull: string = AFLib.getCurrTime();
    var tRetDate: string = tRetDateFull.substring(0, 14);
    var tRetDate1: string = tRetDate.substring(0, 8);

    var tYY2: string = tRetDate.substring(2, 4);
    var tSEQ: string = tRetDate.substring(4, 17);

    var tZero: string = '000000';
    var tNewCd: string = `PU${tYY2}-`;

    var tSQLArray: any[] = [];

    var sqlPoMst = `
        select
            *
        from
            ksv_po_mst
        where
            po_cd = '${argPoCd}'
            and po_seq = 1
    `;
    var tObjPoMsts: Object[] = await prisma.$queryRaw(Prisma.raw(sqlPoMst));
    var tObjPoMst: Object = { ...tObjPoMsts[0] };

    var sqlUpPoMrp = `
        update ksv_pu_mst2
        set
            mrp_date = '${tObjPoMst['PO_DATE']}',
            order_date = '${tObjPoMst['PO_DATE']}'
        where
            po_cd2 = '${argPoCd}'
    `;
    var objUpPoMrp: any = prisma.$queryRaw(Prisma.raw(sqlUpPoMrp));
    tSQLArray.push(objUpPoMrp);

    try {
        await prisma.$transaction(tSQLArray);
        console.log(
            `Make Purchase Succeed: ${argPoCd} / ${argVendorCd} / ${tNewCd}  `,
        );
        return 'SUCCESS';
    } catch (e) {
        console.log(`Make Purchase  Error: ${argPoCd} / ${argVendorCd} `);
        return 'FAIL';
    }
};

const process0 = async (argPoCd: string) => {
    var tRet99: string = await process1(argPoCd, '');
};

var tPoCd = process.argv[2];
process0(tPoCd);

// var tRet process1(tPoCd, tVendorCd);
