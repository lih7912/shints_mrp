const { MongoClient } = require('mongodb');
const path = require('path');
const fs = require('fs');

import { Prisma } from '@prisma/client';
import prisma from './db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from './commlib'; //PrismaClient 사용하기 위해 불러오기

const process_fullin = async (
    argPuCd: string,
    argVendor: string,
    argMatlInfo: any[],
    argInDate: string,
    argInQty: number,
    argInAmt: number,
): Promise<string> => {
    var tRetDateFull: string = AFLib.getCurrTime();
    var tRetDate: string = tRetDateFull.substring(0, 14);
    var tRetDate1: string = tRetDateFull.substring(0, 8);
    var tUserId: string = 'aftest01';

    var tSQLArray: any[] = [];

    var tPurFactory = '';
    var tPayBank = '';
    var tAccountNo = '';
    var tSQL = `
        select
            a.vendor_type,
            b.bank_cd,
            c.account_no
        from
            kcd_vendor a,
            kcd_vendor_bank b,
            kcd_bank c
        where
            a.vendor_cd = '${argVendor}'
            and a.vendor_cd = b.vendor_cd
            and b.bank_cd = c.bank_cd
    `;
    var nRet0: any[] = await prisma.$queryRaw(Prisma.raw(tSQL));
    if (nRet0.length > 0) {
        tPurFactory = nRet0[0]['vendor_type'];
        tPayBank = nRet0[0]['bank_cd'];
        tAccountNo = nRet0[0]['account_no'];
    }

    var tPuMst2: any = {};
    var tSQL1 = `
        select
            *
        from
            ksv_pu_mst2
        where
            pu_cd = '${argPuCd}'
    `;
    var nRet1: any[] = await prisma.$queryRaw(Prisma.raw(tSQL1));
    if (nRet1.length > 0) tPuMst2 = { ...nRet1[0] };

    var tPayReport = '';
    var tLcFlag = '0';

    var tYY2 = tRetDateFull.substring(2, 4);
    var tSEQ = tRetDateFull.substring(4, 17);

    // var tNewStsOutCd = `SO${tYY2}-${tSEQ}`;
    // var mNewStsOutCd = tNewStsInCd;

    var tNewStsInCd = `SI${tYY2}-${tSEQ}`;
    // var mNewStsInCd = tNewStsInCd;

    var tIdx1 = 0;
    for (tIdx1 = 0; tIdx1 < argMatlInfo.length; tIdx1++) {
        var col: any = { ...argMatlInfo[tIdx1] };

        let sqlStockIn = `
            select
                *
            from
                ksv_stock_in
            where
                po_cd = '${tPuMst2['PO_CD2']}'
                and matl_cd = '${col['matl_cd']}'
                and in_datetime like '${argInDate}%'
                and (
                    pu_cd is null
                    or pu_cd = ''
                )
        `;
        const objStockIns: any[] = await prisma.$queryRaw(
            Prisma.raw(sqlStockIn),
        );

        var tIdx2 = 0;
        for (tIdx2 = 0; tIdx2 < objStockIns.length; tIdx2++) {
            var col2: any = { ...objStockIns[tIdx2] };

            var tInQty: number = col2['IN_QTY'];
            var tInPrice: number = col2['IN_PRICE'];

            let sqlUpStockMem = `
                update ksv_stock_in
                set
                    pu_cd = '${argPuCd}',
                    stsin_cd = '${tNewStsInCd}'
                where
                    po_cd = '${tPuMst2['PO_CD2']}'
                    and matl_cd = '${col2['MATL_CD']}'
                    and in_datetime = '${col2['IN_DATETIME']}'
                    and (
                        pu_cd is null
                        or pu_cd = ''
                    )
            `;
            const objUpStockMem: any = prisma.$queryRaw(
                Prisma.raw(sqlUpStockMem),
            );
            tSQLArray.push(objUpStockMem);

            // STOCK_MEM2
            if (tPuMst2['BILL_TO'] === 'BVT' || tPuMst2['BILL_TO'] === 'ETP') {
                // PAYER : 1(BVT), 2(ETP)
                let sqlUpStockMem2 = `
                    update ksv_stock_mem2
                    set
                        in_qty = in_qty + '${tInQty}',
                        out_qty = out_qty + '${tInQty}',
                        stock_status = '2',
                        po_price = '${tInPrice}'
                    where
                        po_cd = '${col2['PO_CD']}'
                        and matl_cd = '${col2['MATL_CD']}'
                        and pu_cd = '${argPuCd}'
                `;
                const objUpStockMem2: any = prisma.$queryRaw(
                    Prisma.raw(sqlUpStockMem2),
                );
                tSQLArray.push(objUpStockMem2);
            } else {
                let sqlUpStockMem2 = `
                    update ksv_stock_mem2
                    set
                        in_qty = in_qty + '${tInQty}',
                        stock_status = '1',
                        po_price = '${tInPrice}'
                    where
                        po_cd = '${col2['PO_CD']}'
                        and matl_cd = '${col2['MATL_CD']}'
                        and pu_cd = '${argPuCd}'
                `;
                const objUpStockMem2: any = prisma.$queryRaw(
                    Prisma.raw(sqlUpStockMem2),
                );
                tSQLArray.push(objUpStockMem2);
            }
        }
        let sqlInStockMemLog = `
            insert into
                ksv_stock_mem2_stsin (
                    po_cd,
                    matl_cd,
                    pu_cd,
                    stsin_cd,
                    po_qty,
                    partin_qty,
                    stock_qty,
                    stsin_qty,
                    po_price
                )
            select
                po_cd,
                matl_cd,
                pu_cd,
                '${tNewStsInCd}',
                po_qty,
                '0',
                stock_qty,
                '${col['in_qty']}',
                po_price
            from
                ksv_stock_mem2
            where
                po_cd = '${tPuMst2['PO_CD2']}'
                and matl_cd = '${col['matl_cd']}'
                and pu_cd = '${argPuCd}'
        `;
        const objInStockMemLog: any = prisma.$queryRaw(
            Prisma.raw(sqlInStockMemLog),
        );
        tSQLArray.push(objInStockMemLog);
    }

    //
    var tInDateTime = `${argInDate}000000`;
    let sqlInStockInMst = `
        insert into
            ksv_stock_in_mst (
                stsin_cd,
                pu_cd,
                in_datetime,
                reg_user,
                reg_datetime,
                in_qty,
                in_amt,
                out_qty,
                facin_qty,
                facout_qty,
                moq_amt,
                surchase_amt
            )
        values
            (
                '${tNewStsInCd}',
                '${argPuCd}',
                '${tInDateTime}',
                '${tUserId}',
                '${tRetDate}',
                '${argInQty}',
                '${argInAmt}',
                '0',
                '0',
                '0',
                '0',
                '0'
            )
    `;
    const objInStockInMst: any = prisma.$queryRaw(Prisma.raw(sqlInStockInMst));
    tSQLArray.push(objInStockInMst);

    try {
        await prisma.$transaction(tSQLArray);
        console.log(
            `SUCCESS:MAKE_STSIN:${argPuCd}:${argInDate}:${tNewStsInCd}`,
        );
        return 'SUCCESS';
    } catch (e) {
        console.log(`FAIL:MAKE_STSIN:${argPuCd}:${argInDate}:${tNewStsInCd}`);
        return 'FAIL';
    }
};

const process1 = async (argPuCd: string) => {
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
            and a.pu_cd = '${argPuCd}'
        group by
            a.pu_cd,
            a.po_cd2,
            a.vendor_cd
    `;
    var objStsIns: any[] = await prisma.$queryRaw(Prisma.raw(sqlStsIn));

    var tIdx: number = 0;
    var tArray = [];
    var tPuCd = '';
    var tPoCd = '';
    var tVendor = '';
    for (tIdx = 0; tIdx < objStsIns.length; tIdx++) {
        var tOne: Object = { ...objStsIns[tIdx] };

        console.log(`=======================================================`);
        console.log(
            `>>>>> (1) ${tOne['pu_cd']} | ${tOne['po_cd2']} | ${tOne['vendor_cd']} | ${tOne['po_qty']} | ${tOne['in_qty']} `,
        );

        tPuCd = tOne['pu_cd'];
        tPoCd = tOne['po_cd2'];
        tVendor = tOne['vendor_cd'];

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
        var tTotAmt = 0.0;
        var tArray1: any[] = [];
        var tArray2: any[] = [];
        var tSaveInDate = '';
        objStsIn1s.forEach((col1, i) => {
            if (i > 0 && col1['in_date'] !== tSaveInDate) {
                tArray1.push(tArray2);
                tArray2 = [];
            }
            tArray2.push(col1);
            tSaveInDate = col1['in_date'];
            // console.log(`>>>>> (2) ${col1['matl_cd']} |${col1['in_date']}|  ${col1['in_qty']} `);
            tTot += col1['in_qty'];
        });
        tArray1.push(tArray2);

        var tIdx3 = 0;
        for (tIdx3 = 0; tIdx3 < tArray1.length; tIdx3++) {
            var col2: any[] = [...tArray1[tIdx3]];
            console.log(`>>>>> (2) ${col2[0]['in_date']} ================== `);
            var tInDate = col2[0]['in_date'];
            var tInQty = 0.0;
            var tInAmt = 0.0;

            var tIdx4 = 0;
            for (tIdx4 = 0; tIdx4 < col2.length; tIdx4++) {
                var col3: any = { ...col2[tIdx4] };
                console.log(
                    `>>>>> (3) ${col3['matl_cd']} |${col3['in_date']}|  ${col3['in_qty']} `,
                );
                tInQty += col3['in_qty'];
                tInAmt += col3['in_qty'] * col3['po_price'];
            }
            if (col2.length > 0 && tInDate !== '') {
                var tRet99: string = await process_fullin(
                    tPuCd,
                    tVendor,
                    col2,
                    tInDate,
                    tInQty,
                    tInAmt,
                );
                console.log(`>>>>> (4)  ${tRet99} `);
            }
        }
    }
};

var tPuCd = process.argv[2];
process1(tPuCd);
