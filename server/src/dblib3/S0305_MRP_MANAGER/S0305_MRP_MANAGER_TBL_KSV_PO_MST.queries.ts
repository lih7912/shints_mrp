// MGR_@@TNAME@@.queries.js

import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
import axios from 'axios';
const Excel = require('exceljs');
const { upload } = require('../../../routes/s3');
const { MongoClient } = require('mongodb');

const moment = require('moment');
const moment = require('moment-timezone');

// export default로 Query 내용 내보내기
const moduleQuery_S0305_MRP_MANAGER_TBL_KSV_PO_MST = {
    Query: {
        mgrQuery_S0305_REPORT_SEQ_LIST2: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            // var tWExcelFile = `Partial List-${tUserInfo.USER_ID}-${tRetDate1}`;
            var tWExcelFile = '';
            tWExcelFile = `PO_PERIOD-${args.data.S_DATE}-${args.data.E_DATE}-${tUserInfo.USER_ID}-${tRetDate1}`;

            try {
                // Excel Read
                var tPath0 = '';
                var tCols0 = __dirname.split('/');
                var tFlag0 = 0;
                tCols0.forEach((col, i) => {
                    if (col !== '') {
                        if (col === 'src') {
                            tPath0 += '/upload/excel_template';
                            tFlag0 = 1;
                        }
                        if (tFlag0 === 0) {
                            tPath0 += '/' + col;
                        }
                    }
                });
                var tTemplateExcel = `${tPath0}/po_period.xlsx`;

                const wb = new Excel.Workbook();
                await wb.xlsx.readFile(tTemplateExcel);

                var tSheetName = `List`;
                var sheet = wb.getWorksheet(tSheetName);
                // const sheet = wb.getWorksheet(1);

                sheet.getCell(1, 23).value = '1.본사부담';
                sheet.getCell(2, 23).value =
                    '2.공장부담(if Debit, put debit number)';
                sheet.getCell(3, 23).value =
                    '3.BUYER/SUPPLIER(if Debit, put debit number)';
                sheet.getCell(4, 23).value = '4.원가 포함';
                sheet.getCell(5, 23).value = '5.OTHERS';

                sheet.getCell(6, 1).value = 'Date';
                sheet.getCell(6, 2).value = 'Buyer';
                sheet.getCell(6, 3).value = 'PO NO';
                sheet.getCell(6, 4).value = 'SEQ';
                sheet.getCell(6, 5).value = 'REVISED REASON';
                sheet.getCell(6, 6).value = 'No. for Reason';

                sheet.getCell(6, 7).value =
                    'FROM - responsibliity, Trach nhiem';
                sheet.getCell(7, 7).value = 'SALES';
                sheet.getCell(7, 8).value = 'BUYER';
                sheet.getCell(7, 9).value = 'CAD';
                sheet.getCell(7, 10).value = 'MRP';
                sheet.getCell(7, 11).value = 'MRP2';
                sheet.getCell(7, 12).value = 'MATL';
                sheet.getCell(7, 13).value = 'ETC';

                sheet.getCell(6, 14).value = 'FREIGHT CHARGE';
                sheet.getCell(7, 14).value = 'SEA';
                sheet.getCell(7, 15).value = 'AIR/EXPRESS(Need approval)';

                sheet.getCell(6, 16).value = 'AMOUNT';
                sheet.getCell(7, 16).value = 'add';
                sheet.getCell(7, 17).value = 'cancel';
                sheet.getCell(7, 18).value = 'leftover';

                sheet.getCell(6, 19).value = 'REMARK';
                sheet.getCell(6, 20).value = 'Related Supplier';
                sheet.getCell(7, 21).value = '결제해당여부';
                sheet.getCell(7, 22).value = '결제일';
                sheet.getCell(7, 23).value = '금액부담 주체';
                sheet.getCell(7, 24).value = '비고';

                var tRowIdx = 8;

                //
                let sql0 = `
                    select
                        a.buyer,
                        a.sales,
                        a.matl,
                        a.mrp,
                        a.mrp2,
                        a.etc,
                        a.cad,
                        left(c.reg_datetime, 8) as reg_datetime,
                        a.po_cd,
                        a.po_seq,
                        b.cd_name as seq_reason_n,
                        isnull(approval, '') as approval
                    from
                        ksv_po_reason a,
                        kcd_code b,
                        ksv_po_mst c
                    where
                        left(c.reg_datetime, 8) between '${args.data.S_DATE}' and '${args.data.E_DATE}'
                        and substring(c.po_cd, 5, 1) <> 'S'
                        and b.cd_group = 'SEQ_REASON'
                        and a.seq_reason = b.cd_code
                        and c.po_cd = a.po_cd
                        and a.po_seq = c.po_seq
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));

                var tIdx = 0;
                var tSumAdd = 0;
                var tSumCancel = 0;
                var tSumLeftover = 0;
                for (tIdx = 0; tIdx < tRet0.length; tIdx++) {
                    var tOne = { ...tRet0[tIdx] };

                    sheet.getCell(tRowIdx, 1).value = tOne.reg_datetime;
                    sheet.getCell(tRowIdx, 2).value = tOne.buyer;
                    sheet.getCell(tRowIdx, 3).value = tOne.po_cd;
                    sheet.getCell(tRowIdx, 4).value = tOne.po_seq;
                    sheet.getCell(tRowIdx, 6).value = tOne.seq_reason_n; // No. for Reason';

                    sheet.getCell(tRowIdx, 21).value = ' ';
                    if (tOne.approval !== '')
                        sheet.getCell(tRowIdx, 21).value = tOne.approval;

                    sheet.getCell(tRowIdx, 7).value = ' ';
                    sheet.getCell(tRowIdx, 8).value = ' ';
                    sheet.getCell(tRowIdx, 9).value = ' ';
                    sheet.getCell(tRowIdx, 10).value = ' ';
                    sheet.getCell(tRowIdx, 11).value = ' ';
                    sheet.getCell(tRowIdx, 12).value = ' ';
                    sheet.getCell(tRowIdx, 13).value = ' ';

                    if (tOne.sales === '1')
                        sheet.getCell(tRowIdx, 7).value = 'O';
                    if (tOne.buyer === '1')
                        sheet.getCell(tRowIdx, 8).value = 'O';
                    if (tOne.cad === '1') sheet.getCell(tRowIdx, 9).value = 'O';
                    if (tOne.mrp === '1')
                        sheet.getCell(tRowIdx, 10).value = 'O';
                    if (tOne.mrp2 === '1')
                        sheet.getCell(tRowIdx, 11).value = 'O';
                    if (tOne.matl === '1')
                        sheet.getCell(tRowIdx, 12).value = 'O';
                    if (tOne.etc === '1')
                        sheet.getCell(tRowIdx, 13).value = 'O';

                    let sql_po = `
                        select distinct
                            a.po_seq,
                            e.vendor_name,
                            a.seq_comment,
                            left(order_cd, 2) as buyer_cd
                        from
                            ksv_po_mrp a,
                            kcd_matl_mst b,
                            kcd_vendor e
                        where
                            a.po_cd = '${tOne.po_cd}'
                            and a.po_seq = '${tOne.po_seq}'
                            and b.matl_cd = a.matl_cd
                            and b.vendor_cd = e.vendor_cd
                            and a.seq_comment is not null
                    `;
                    var tRet_po = await prisma.$queryRaw(Prisma.raw(sql_po));

                    sheet.getCell(tRowIdx, 5).value = tRet_po[0].seq_comment; // REVISED REASON
                    sheet.getCell(tRowIdx, 19).value = '';
                    sheet.getCell(tRowIdx, 20).value = tRet_po[0].vendor_name;

                    sheet.getCell(tRowIdx, 22).value = ' ';
                    sheet.getCell(tRowIdx, 23).value = ' ';
                    sheet.getCell(tRowIdx, 24).value = ' ';

                    let sql_add = `
                        select
                            sum(a.po_qty * c.matl_price * d.usd_rate) as amount
                        from
                            ksv_po_mrp a,
                            kcd_matl_mem c,
                            kcd_currency d
                        where
                            a.po_cd = '${tOne.po_cd}'
                            and a.po_seq = '${tOne.po_seq}'
                            and c.matl_cd = a.matl_cd
                            and c.curr_cd = a.curr_cd
                            and d.start_date = a.curr_date
                            and a.curr_cd = d.curr_cd
                            and a.use_po_type = '1'
                            and a.diff_po_type = '3'
                            and c.matl_seq = a.matl_seq
                    `;
                    var tRet_add = await prisma.$queryRaw(Prisma.raw(sql_add));
                    var tAddAmt = 0;
                    if (tRet_add.length > 0) tAddAmt = tRet_add[0].amount;
                    sheet.getCell(tRowIdx, 16).value = tAddAmt;
                    tSumAdd += tAddAmt;

                    let sql_cancel = `
                        select
                            sum(a.po_qty * c.matl_price * d.usd_rate) as amount
                        from
                            ksv_po_mrp a,
                            kcd_matl_mem c,
                            kcd_currency d
                        where
                            a.po_cd = '${tOne.po_cd}'
                            and a.po_seq = '${tOne.po_seq}'
                            and c.matl_cd = a.matl_cd
                            and c.curr_cd = a.curr_cd
                            and d.start_date = a.curr_date
                            and a.curr_cd = d.curr_cd
                            and a.use_po_type = '1'
                            and a.diff_po_type = '2'
                            and c.matl_seq = a.matl_seq
                    `;
                    var tRet_cancel = await prisma.$queryRaw(
                        Prisma.raw(sql_cancel),
                    );
                    var tCancelAmt = 0;
                    if (tRet_cancel.length > 0)
                        tCancelAmt = tRet_cancel[0].amount;
                    sheet.getCell(tRowIdx, 17).value = tCancelAmt;
                    tSumCancel += tCancelAmt;

                    let sql_leftover = `
                        select
                            (sum(a.po_qty * c.matl_price * d.usd_rate) * -1) as amount
                        from
                            ksv_po_mrp a,
                            kcd_matl_mem c,
                            kcd_currency d
                        where
                            a.po_cd = '${tOne.po_cd}'
                            and a.po_seq = '${tOne.po_seq}'
                            and c.matl_cd = a.matl_cd
                            and c.curr_cd = a.curr_cd
                            and d.start_date = a.curr_date
                            and a.curr_cd = d.curr_cd
                            and a.use_po_type = '1'
                            and a.diff_po_type = '1'
                            and c.matl_seq = a.matl_seq
                    `;
                    var tRet_leftover = await prisma.$queryRaw(
                        Prisma.raw(sql_leftover),
                    );
                    var tLeftoverAmt = 0;
                    if (tRet_leftover.length > 0)
                        tLeftoverAmt = tRet_leftover[0].amount;
                    sheet.getCell(tRowIdx, 18).value = tLeftoverAmt;
                    tSumLeftover += tLeftoverAmt;

                    for (let c = 1; c <= 24; c++) {
                        const cell = sheet.getCell(tRowIdx, c);
                        cell.border = {
                            top: { style: 'thin', color: { argb: 'FF000000' } },
                            left: {
                                style: 'thin',
                                color: { argb: 'FF000000' },
                            },
                            bottom: {
                                style: 'thin',
                                color: { argb: 'FF000000' },
                            },
                            right: {
                                style: 'thin',
                                color: { argb: 'FF000000' },
                            },
                        };
                    }
                    tRowIdx += 1;
                }

                sheet.getCell(tRowIdx, 16).value = tSumAdd;
                sheet.getCell(tRowIdx, 17).value = tSumCancel;
                sheet.getCell(tRowIdx, 18).value = tSumLeftover;

                // Sheet 2: SeqAmtList

                tSheetName = `SeqAmtList`;
                sheet = wb.getWorksheet(tSheetName);

                sheet.getCell(3, 1).value = 'Buyer';
                sheet.getCell(3, 2).value = 'Po No';
                sheet.getCell(3, 3).value = 'Proc';
                sheet.getCell(3, 4).value = 'SEQ';
                sheet.getCell(3, 5).value = 'Order Cd';
                sheet.getCell(3, 6).value = 'Code';
                sheet.getCell(3, 7).value = 'Material Desc';
                sheet.getCell(3, 8).value = 'Color';
                sheet.getCell(3, 9).value = 'Spec';
                sheet.getCell(3, 10).value = 'Unit';
                sheet.getCell(3, 11).value = 'Status';
                sheet.getCell(3, 12).value = 'MRP Qty';
                sheet.getCell(3, 13).value = 'Ord Qty';
                sheet.getCell(3, 14).value = 'Price';
                sheet.getCell(3, 15).value = 'Curr';
                sheet.getCell(3, 16).value = 'USD Amt';
                sheet.getCell(3, 17).value = 'Vendor';

                var tRowIdx = 4;

                //
                let sql0 = `
                    select
                        left(a.order_cd, 2) as buyer_cd,
                        a.po_cd,
                        f.cd_name as diff_po_type_n,
                        a.po_seq,
                        a.order_cd,
                        a.matl_cd,
                        b.matl_name,
                        b.color,
                        b.spec,
                        b.unit,
                        'order' as
                    type,
                    a.use_qty,
                    a.po_qty,
                    c.matl_price,
                    c.curr_cd,
                    a.po_qty * c.matl_price * d.usd_rate as usd_amt,
                    usd_rate,
                    g.vendor_name
                    from
                        ksv_po_mrp a,
                        kcd_matl_mst b,
                        kcd_matl_mem c,
                        kcd_currency d,
                        ksv_po_mst e,
                        kcd_code f,
                        kcd_vendor g
                    where
                        c.matl_cd = a.matl_cd
                        and left(e.reg_datetime, 8) between '${args.data.S_DATE}' and '${args.data.E_DATE}'
                        and substring(e.po_cd, 5, 1) <> 'S'
                        and e.po_cd = a.po_cd
                        and e.po_seq = a.po_seq
                        and f.cd_group = 'diff_po_type'
                        and f.cd_code = a.diff_po_type
                        and a.matl_cd = b.matl_cd
                        and b.vendor_cd = g.vendor_cd
                        and c.curr_cd = a.curr_cd
                        and d.start_date = a.curr_date
                        and a.curr_cd = d.curr_cd
                        and a.use_po_type = '1'
                        and a.diff_po_type in ('3', '2', '1')
                        and c.matl_seq = a.matl_seq
                `;
                tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));

                tIdx = 0;
                for (tIdx = 0; tIdx < tRet0.length; tIdx++) {
                    var tOne = { ...tRet0[tIdx] };
                    sheet.getCell(tRowIdx, 1).value = tOne.buyer_cd;
                    sheet.getCell(tRowIdx, 2).value = tOne.po_cd;
                    sheet.getCell(tRowIdx, 3).value = tOne.diff_po_type_n;
                    sheet.getCell(tRowIdx, 4).value = tOne.po_seq;
                    sheet.getCell(tRowIdx, 5).value = tOne.order_cd;
                    sheet.getCell(tRowIdx, 6).value = tOne.matl_cd;
                    sheet.getCell(tRowIdx, 7).value = tOne.matl_name;
                    sheet.getCell(tRowIdx, 8).value = tOne.color;
                    sheet.getCell(tRowIdx, 9).value = tOne.spec;
                    sheet.getCell(tRowIdx, 10).value = tOne.unit;
                    sheet.getCell(tRowIdx, 11).value = 'order';
                    sheet.getCell(tRowIdx, 12).value = tOne.use_qty;
                    sheet.getCell(tRowIdx, 13).value = tOne.po_qty;
                    sheet.getCell(tRowIdx, 14).value = tOne.matl_price;
                    sheet.getCell(tRowIdx, 15).value = tOne.curr_cd;
                    sheet.getCell(tRowIdx, 16).value = tOne.usd_amt;
                    sheet.getCell(tRowIdx, 17).value = tOne.vendor_name;

                    for (let c = 1; c <= 17; c++) {
                        const cell = sheet.getCell(tRowIdx, c);
                        cell.border = {
                            top: { style: 'thin', color: { argb: 'FF000000' } },
                            left: {
                                style: 'thin',
                                color: { argb: 'FF000000' },
                            },
                            bottom: {
                                style: 'thin',
                                color: { argb: 'FF000000' },
                            },
                            right: {
                                style: 'thin',
                                color: { argb: 'FF000000' },
                            },
                        };
                    }

                    tRowIdx += 1;
                }

                // Shhet 3: Sample PO List

                tSheetName = `SMS List`;
                sheet = wb.getWorksheet(tSheetName);
                // const sheet = wb.getWorksheet(1);

                sheet.getCell(1, 23).value = '1.본사부담';
                sheet.getCell(2, 23).value =
                    '2.공장부담(if Debit, put debit number)';
                sheet.getCell(3, 23).value =
                    '3.BUYER/SUPPLIER(if Debit, put debit number)';
                sheet.getCell(4, 23).value = '4.원가 포함';
                sheet.getCell(5, 23).value = '5.OTHERS';

                sheet.getCell(6, 1).value = 'Date';
                sheet.getCell(6, 2).value = 'Buyer';
                sheet.getCell(6, 3).value = 'PO NO';
                sheet.getCell(6, 4).value = 'SEQ';
                sheet.getCell(6, 5).value = 'REVISED REASON';
                sheet.getCell(6, 6).value = 'No. for Reason';

                sheet.getCell(6, 7).value =
                    'FROM - responsibliity, Trach nhiem';
                sheet.getCell(7, 7).value = 'SALES';
                sheet.getCell(7, 8).value = 'BUYER';
                sheet.getCell(7, 9).value = 'CAD';
                sheet.getCell(7, 10).value = 'MRP';
                sheet.getCell(7, 11).value = 'MRP2';
                sheet.getCell(7, 12).value = 'MATL';
                sheet.getCell(7, 13).value = 'ETC';

                sheet.getCell(6, 14).value = 'FREIGHT CHARGE';
                sheet.getCell(7, 14).value = 'SEA';
                sheet.getCell(7, 15).value = 'AIR/EXPRESS(Need approval)';

                sheet.getCell(6, 16).value = 'AMOUNT';
                sheet.getCell(7, 16).value = 'add';
                sheet.getCell(7, 17).value = 'cancel';
                sheet.getCell(7, 18).value = 'leftover';

                sheet.getCell(6, 19).value = 'REMARK';
                sheet.getCell(6, 20).value = 'Related Supplier';
                sheet.getCell(7, 21).value = '결제해당여부';
                sheet.getCell(7, 22).value = '결제일';
                sheet.getCell(7, 23).value = '금액부담 주체';
                sheet.getCell(7, 24).value = '비고';

                tRowIdx = 8;

                //
                let sql0 = `
                    select
                        a.buyer,
                        a.sales,
                        a.matl,
                        a.mrp,
                        a.mrp2,
                        a.etc,
                        a.cad,
                        left(c.reg_datetime, 8) as reg_datetime,
                        a.po_cd,
                        a.po_seq,
                        b.cd_name as seq_reason_n,
                        isnull(approval, ' ') as approval
                    from
                        ksv_po_reason a,
                        kcd_code b,
                        ksv_po_mst c
                    where
                        left(c.reg_datetime, 8) between '${args.data.S_DATE}' and '${args.data.E_DATE}'
                        and substring(c.po_cd, 5, 1) = 'S'
                        and b.cd_group = 'SEQ_REASON'
                        and a.seq_reason = b.cd_code
                        and c.po_cd = a.po_cd
                        and a.po_seq = c.po_seq
                `;
                tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));

                tIdx = 0;
                tSumAdd = 0;
                tSumCancel = 0;
                tSumLeftover = 0;
                for (tIdx = 0; tIdx < tRet0.length; tIdx++) {
                    var tOne = { ...tRet0[tIdx] };

                    sheet.getCell(tRowIdx, 1).value = tOne.reg_datetime;
                    sheet.getCell(tRowIdx, 2).value = tOne.buyer;
                    sheet.getCell(tRowIdx, 3).value = tOne.po_cd;
                    sheet.getCell(tRowIdx, 4).value = tOne.po_seq;
                    sheet.getCell(tRowIdx, 6).value = tOne.seq_reason_n; // No. for Reason';

                    sheet.getCell(tRowIdx, 21).value = ' ';
                    if (tOne.approval !== '')
                        sheet.getCell(tRowIdx, 21).value = tOne.approval;

                    sheet.getCell(tRowIdx, 22).value = ' ';
                    sheet.getCell(tRowIdx, 23).value = ' ';
                    sheet.getCell(tRowIdx, 24).value = ' ';

                    sheet.getCell(tRowIdx, 7).value = ' ';
                    sheet.getCell(tRowIdx, 8).value = ' ';
                    sheet.getCell(tRowIdx, 9).value = ' ';
                    sheet.getCell(tRowIdx, 10).value = ' ';
                    sheet.getCell(tRowIdx, 11).value = ' ';
                    sheet.getCell(tRowIdx, 12).value = ' ';
                    sheet.getCell(tRowIdx, 13).value = ' ';

                    if (tOne.sales === '1')
                        sheet.getCell(tRowIdx, 7).value = 'O';
                    if (tOne.buyer === '1')
                        sheet.getCell(tRowIdx, 8).value = 'O';
                    if (tOne.cad === '1') sheet.getCell(tRowIdx, 9).value = 'O';
                    if (tOne.mrp === '1')
                        sheet.getCell(tRowIdx, 10).value = 'O';
                    if (tOne.mrp2 === '1')
                        sheet.getCell(tRowIdx, 11).value = 'O';
                    if (tOne.matl === '1')
                        sheet.getCell(tRowIdx, 12).value = 'O';
                    if (tOne.etc === '1')
                        sheet.getCell(tRowIdx, 13).value = 'O';

                    let sql_po = `
                        select distinct
                            a.po_seq,
                            e.vendor_name,
                            a.seq_comment,
                            left(order_cd, 2) as buyer_cd
                        from
                            ksv_po_mrp a,
                            kcd_matl_mst b,
                            kcd_vendor e
                        where
                            a.po_cd = '${tOne.po_cd}'
                            and a.po_seq = '${tOne.po_seq}'
                            and b.matl_cd = a.matl_cd
                            and b.vendor_cd = e.vendor_cd
                            and a.seq_comment is not null
                    `;
                    var tRet_po = await prisma.$queryRaw(Prisma.raw(sql_po));

                    sheet.getCell(tRowIdx, 5).value = tRet_po[0].seq_comment; // REVISED REASON
                    sheet.getCell(tRowIdx, 19).value = '';
                    sheet.getCell(tRowIdx, 20).value = tRet_po[0].vendor_name;

                    let sql_add = `
                        select
                            sum(a.po_qty * c.matl_price * d.usd_rate) as amount
                        from
                            ksv_po_mrp a,
                            kcd_matl_mem c,
                            kcd_currency d
                        where
                            a.po_cd = '${tOne.po_cd}'
                            and a.po_seq = '${tOne.po_seq}'
                            and c.matl_cd = a.matl_cd
                            and c.curr_cd = a.curr_cd
                            and d.start_date = a.curr_date
                            and a.curr_cd = d.curr_cd
                            and a.use_po_type = '1'
                            and a.diff_po_type = '3'
                            and c.matl_seq = a.matl_seq
                    `;
                    var tRet_add = await prisma.$queryRaw(Prisma.raw(sql_add));
                    var tAddAmt = 0;
                    if (tRet_add.length > 0) tAddAmt = tRet_add[0].amount;
                    sheet.getCell(tRowIdx, 16).value = tAddAmt;
                    tSumAdd += tAddAmt;

                    let sql_cancel = `
                        select
                            sum(a.po_qty * c.matl_price * d.usd_rate) as amount
                        from
                            ksv_po_mrp a,
                            kcd_matl_mem c,
                            kcd_currency d
                        where
                            a.po_cd = '${tOne.po_cd}'
                            and a.po_seq = '${tOne.po_seq}'
                            and c.matl_cd = a.matl_cd
                            and c.curr_cd = a.curr_cd
                            and d.start_date = a.curr_date
                            and a.curr_cd = d.curr_cd
                            and a.use_po_type = '1'
                            and a.diff_po_type = '2'
                            and c.matl_seq = a.matl_seq
                    `;
                    var tRet_cancel = await prisma.$queryRaw(
                        Prisma.raw(sql_cancel),
                    );
                    var tCancelAmt = 0;
                    if (tRet_cancel.length > 0)
                        tCancelAmt = tRet_cancel[0].amount;
                    sheet.getCell(tRowIdx, 17).value = tCancelAmt;
                    tSumCancel += tCancelAmt;

                    let sql_leftover = `
                        select
                            (sum(a.po_qty * c.matl_price * d.usd_rate) * -1) as amount
                        from
                            ksv_po_mrp a,
                            kcd_matl_mem c,
                            kcd_currency d
                        where
                            a.po_cd = '${tOne.po_cd}'
                            and a.po_seq = '${tOne.po_seq}'
                            and c.matl_cd = a.matl_cd
                            and c.curr_cd = a.curr_cd
                            and d.start_date = a.curr_date
                            and a.curr_cd = d.curr_cd
                            and a.use_po_type = '1'
                            and a.diff_po_type = '1'
                            and c.matl_seq = a.matl_seq
                    `;
                    var tRet_leftover = await prisma.$queryRaw(
                        Prisma.raw(sql_leftover),
                    );
                    var tLeftoverAmt = 0;
                    if (tRet_leftover.length > 0)
                        tLeftoverAmt = tRet_leftover[0].amount;
                    sheet.getCell(tRowIdx, 18).value = tLeftoverAmt;
                    tSumLeftover += tLeftoverAmt;

                    for (let c = 1; c <= 24; c++) {
                        const cell = sheet.getCell(tRowIdx, c);
                        cell.border = {
                            top: { style: 'thin', color: { argb: 'FF000000' } },
                            left: {
                                style: 'thin',
                                color: { argb: 'FF000000' },
                            },
                            bottom: {
                                style: 'thin',
                                color: { argb: 'FF000000' },
                            },
                            right: {
                                style: 'thin',
                                color: { argb: 'FF000000' },
                            },
                        };
                    }

                    tRowIdx += 1;
                }

                sheet.getCell(tRowIdx, 16).value = tSumAdd;
                sheet.getCell(tRowIdx, 17).value = tSumCancel;
                sheet.getCell(tRowIdx, 18).value = tSumLeftover;

                // Shhet 4: Sample SeqAmtList

                tSheetName = `SMS SeqAmtlist`;
                sheet = wb.getWorksheet(tSheetName);

                sheet.getCell(3, 1).value = 'Buyer';
                sheet.getCell(3, 2).value = 'Po No';
                sheet.getCell(3, 3).value = 'Proc';
                sheet.getCell(3, 4).value = 'SEQ';
                sheet.getCell(3, 5).value = 'Order Cd';
                sheet.getCell(3, 6).value = 'Code';
                sheet.getCell(3, 7).value = 'Material Desc';
                sheet.getCell(3, 8).value = 'Color';
                sheet.getCell(3, 9).value = 'Spec';
                sheet.getCell(3, 10).value = 'Unit';
                sheet.getCell(3, 11).value = 'Status';
                sheet.getCell(3, 12).value = 'MRP Qty';
                sheet.getCell(3, 13).value = 'Ord Qty';
                sheet.getCell(3, 14).value = 'Price';
                sheet.getCell(3, 15).value = 'Curr';
                sheet.getCell(3, 16).value = 'USD Amt';
                sheet.getCell(3, 17).value = 'Vendor';

                tRowIdx = 4;

                //
                let sql0 = `
                    select
                        left(a.order_cd, 2) as buyer_cd,
                        a.po_cd,
                        f.cd_name as diff_po_type_n,
                        a.po_seq,
                        a.order_cd,
                        a.matl_cd,
                        b.matl_name,
                        b.color,
                        b.spec,
                        b.unit,
                        'order' as
                    type,
                    a.use_qty,
                    a.po_qty,
                    c.matl_price,
                    c.curr_cd,
                    a.po_qty * c.matl_price * d.usd_rate as usd_amt,
                    usd_rate,
                    g.vendor_name
                    from
                        ksv_po_mrp a,
                        kcd_matl_mst b,
                        kcd_matl_mem c,
                        kcd_currency d,
                        ksv_po_mst e,
                        kcd_code f,
                        kcd_vendor g
                    where
                        c.matl_cd = a.matl_cd
                        and left(e.reg_datetime, 8) between '${args.data.S_DATE}' and '${args.data.E_DATE}'
                        and substring(e.po_cd, 5, 1) = 'S'
                        and e.po_cd = a.po_cd
                        and e.po_seq = a.po_seq
                        and f.cd_group = 'diff_po_type'
                        and f.cd_code = a.diff_po_type
                        and a.matl_cd = b.matl_cd
                        and b.vendor_cd = g.vendor_cd
                        and c.curr_cd = a.curr_cd
                        and d.start_date = a.curr_date
                        and a.curr_cd = d.curr_cd
                        and a.use_po_type = '1'
                        and a.diff_po_type in ('3', '2', '1')
                        and c.matl_seq = a.matl_seq
                `;
                tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));

                tIdx = 0;
                for (tIdx = 0; tIdx < tRet0.length; tIdx++) {
                    var tOne = { ...tRet0[tIdx] };
                    sheet.getCell(tRowIdx, 1).value = tOne.buyer_cd;
                    sheet.getCell(tRowIdx, 2).value = tOne.po_cd;
                    sheet.getCell(tRowIdx, 3).value = tOne.diff_po_type_n;
                    sheet.getCell(tRowIdx, 4).value = tOne.po_seq;
                    sheet.getCell(tRowIdx, 5).value = tOne.order_cd;
                    sheet.getCell(tRowIdx, 6).value = tOne.matl_cd;
                    sheet.getCell(tRowIdx, 7).value = tOne.matl_name;
                    sheet.getCell(tRowIdx, 8).value = tOne.color;
                    sheet.getCell(tRowIdx, 9).value = tOne.spec;
                    sheet.getCell(tRowIdx, 10).value = tOne.unit;
                    sheet.getCell(tRowIdx, 11).value = 'order';
                    sheet.getCell(tRowIdx, 12).value = tOne.use_qty;
                    sheet.getCell(tRowIdx, 13).value = tOne.po_qty;
                    sheet.getCell(tRowIdx, 14).value = tOne.matl_price;
                    sheet.getCell(tRowIdx, 15).value = tOne.curr_cd;
                    sheet.getCell(tRowIdx, 16).value = tOne.usd_amt;
                    sheet.getCell(tRowIdx, 17).value = tOne.vendor_name;

                    for (let c = 1; c <= 17; c++) {
                        const cell = sheet.getCell(tRowIdx, c);
                        cell.border = {
                            top: { style: 'thin', color: { argb: 'FF000000' } },
                            left: {
                                style: 'thin',
                                color: { argb: 'FF000000' },
                            },
                            bottom: {
                                style: 'thin',
                                color: { argb: 'FF000000' },
                            },
                            right: {
                                style: 'thin',
                                color: { argb: 'FF000000' },
                            },
                        };
                    }
                    tRowIdx += 1;
                }

                return await upload(`${tWExcelFile}.xlsx`, wb);
            } catch (error) {
                var tRetArray = [];
                var tObj = {};
                tObj.id = 1;
                tObj.CODE = `ERROR:${error.message}`;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },
        mgrQuery_S0305_REPORT_SEQ_LIST: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            // var tWExcelFile = `Partial List-${tUserInfo.USER_ID}-${tRetDate1}`;
            var tWExcelFile = '';
            tWExcelFile = `POSeqList-${tUserInfo.USER_ID}-${tRetDate1}`;

            try {
                // Excel Read
                var tPath0 = '';
                var tCols0 = __dirname.split('/');
                var tFlag0 = 0;
                tCols0.forEach((col, i) => {
                    if (col !== '') {
                        if (col === 'src') {
                            tPath0 += '/upload/excel_template';
                            tFlag0 = 1;
                        }
                        if (tFlag0 === 0) {
                            tPath0 += '/' + col;
                        }
                    }
                });
                var tTemplateExcel = `${tPath0}/po_seq_list.xlsx`;

                const wb = new Excel.Workbook();
                await wb.xlsx.readFile(tTemplateExcel);

                var tSheetName = `list`;
                var sheet = wb.getWorksheet(tSheetName);
                // const sheet = wb.getWorksheet(1);

                sheet.getCell(1, 1).value =
                    `${args.data.S_DATE}~${args.data.E_DATE}`;

                sheet.getCell(2, 1).value = 'Po Cd';
                sheet.getCell(2, 2).value = 'Seq';
                sheet.getCell(2, 3).value = 'Order Cd';
                sheet.getCell(2, 4).value = 'Kind';
                sheet.getCell(2, 5).value = 'Reg Datetime';
                sheet.getCell(2, 6).value = 'Reg User';
                sheet.getCell(2, 7).value = '+';
                sheet.getCell(2, 8).value = '-';

                var tRowIdx = 3;

                //
                let sql0 = `
                    select distinct
                        a.po_cd,
                        a.po_seq,
                        b.order_cd,
                        a.reg_datetime,
                        a.reg_user,
                        e.cd_name as bvt_kind_n
                    from
                        ksv_po_mst a,
                        ksv_po_mem b,
                        ksv_order_mst c,
                        kcd_style d,
                        kcd_code e,
                        ksv_po_mrp f
                    where
                        a.po_cd = b.po_cd
                        and a.po_seq = b.po_seq
                        and left(a.reg_datetime, 8) between '${args.data.S_DATE}' and '${args.data.E_DATE}'
                        and a.po_seq < 97
                        and b.order_cd = c.order_cd
                        and c.style_cd = d.style_Cd
                        and d.bvt_kind = e.cd_code
                        and e.cd_group = 'BVT_KIND'
                        and b.order_Cd = f.order_cd
                        and b.po_Cd = f.po_cd
                        and b.po_seq = f.po_seq
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));

                var tIdx = 0;
                for (tIdx = 0; tIdx < tRet0.length; tIdx++) {
                    var tOne = { ...tRet0[tIdx] };
                    tOne.plus_cnt = 0;
                    tOne.minus_cnt = 0;
                    if (parseInt(tOne.po_seq) > 1) {
                        let sql1 = `
                            select
                                count(diff_po_type) as plus_cnt
                            from
                                ksv_po_mrp
                            where
                                po_cd = '${tOne.po_cd}'
                                and po_seq = '${tOne.po_seq}'
                                and order_cd = '${tOne.order_cd}'
                                and diff_po_type = '3'
                        `;
                        var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                        if (tRet1.length > 0) tOne.plus_cnt = tRet1[0].plus_cnt;

                        let sql2 = `
                            select
                                count(diff_po_type) as minus_cnt
                            from
                                ksv_po_mrp
                            where
                                po_cd = '${tOne.po_cd}'
                                and po_seq = '${tOne.po_seq}'
                                and order_cd = '${tOne.order_cd}'
                                and diff_po_type in ('2', '1')
                        `;
                        var tRet2 = await prisma.$queryRaw(Prisma.raw(sql2));
                        if (tRet2.length > 0) tOne.plus_cnt = tRet2[0].plus_cnt;
                    } else {
                        let sql1 = `
                            select
                                count(matl_cd) as plus_cnt
                            from
                                ksv_po_mrp
                            where
                                po_cd = '${tOne.po_cd}'
                                and po_seq = '${tOne.po_seq}'
                                and order_cd = '${tOne.order_cd}'
                        `;
                        var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                        if (tRet1.length > 0) tOne.plus_cnt = tRet1[0].plus_cnt;
                    }

                    sheet.getCell(tRowIdx, 1).value = tOne.po_cd;
                    sheet.getCell(tRowIdx, 2).value = tOne.po_seq;
                    sheet.getCell(tRowIdx, 3).value = tOne.order_cd;
                    sheet.getCell(tRowIdx, 4).value = tOne.bvt_kind_n;
                    sheet.getCell(tRowIdx, 5).value = tOne.reg_datetime;
                    sheet.getCell(tRowIdx, 6).value = tOne.reg_user;
                    sheet.getCell(tRowIdx, 7).value = tOne.plus_cnt;
                    sheet.getCell(tRowIdx, 8).value = tOne.minus_cnt;
                    tRowIdx += 1;
                }

                return await upload(`${tWExcelFile}.xlsx`, wb);
            } catch (error) {
                var tRetArray = [];
                var tObj = {};
                tObj.id = 1;
                tObj.CODE = `ERROR:${error.message}`;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },

        mgrQuery_S0305_REPORT_STOCK_LOG: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            // var tWExcelFile = `Partial List-${tUserInfo.USER_ID}-${tRetDate1}`;
            var tWExcelFile = '';
            tWExcelFile = `(${args.data.S_DATE}-${args.data.E_DATE})POStockLogList-${tUserInfo.USER_ID}-${tRetDate1}`;

            try {
                // Excel Read
                var tPath0 = '';
                var tCols0 = __dirname.split('/');
                var tFlag0 = 0;
                tCols0.forEach((col, i) => {
                    if (col !== '') {
                        if (col === 'src') {
                            tPath0 += '/upload/excel_template';
                            tFlag0 = 1;
                        }
                        if (tFlag0 === 0) {
                            tPath0 += '/' + col;
                        }
                    }
                });
                var tTemplateExcel = `${tPath0}/po_stocklog_list.xlsx`;

                const wb = new Excel.Workbook();
                await wb.xlsx.readFile(tTemplateExcel);

                var tSheetName = `list`;
                var sheet = wb.getWorksheet(tSheetName);
                // const sheet = wb.getWorksheet(1);

                sheet.getCell(2, 8).value =
                    `${args.data.S_DATE}~${args.data.E_DATE}`;

                var tRowIdx = 5;

                let sql0 = `
                    select distinct
                        a.po_cd,
                        a.po_seq,
                        left(b.order_cd, 2) as buyer_cd,
                        left(a.reg_datetime, 8) as reg_datetime,
                        a.reg_user
                    from
                        ksv_po_log a,
                        ksv_po_mem b
                    where
                        left(a.reg_datetime, 8) between '${args.data.S_DATE}' and '${args.data.E_DATE}'
                        and a.po_cd = b.po_cd
                        and a.po_seq = b.po_seq
                        and a.fix_flag = '0'
                    order by
                        1
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));

                var tIdx = 0;
                for (tIdx = 0; tIdx < tRet0.length; tIdx++) {
                    var tOne = { ...tRet0[tIdx] };
                    let sql1 = `
                        select
                            top 1 a.po_seq,
                            left(a.reg_datetime, 8) as reg_datetime,
                            a.reg_user,
                            c.cd_name as log1
                        from
                            ksv_po_log a,
                            kcd_code c
                        where
                            a.po_cd = '${tOne.po_cd}'
                            and a.po_seq = '${tOne.po_seq}'
                            and a.fix_flag = '1'
                            and c.cd_code = a.po_log_type
                            and c.cd_group = 'po_log_type'
                        order by
                            2 desc
                    `;
                    var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));

                    var tUser2 = '';
                    var tDate2 = '';
                    var tCheck = '';
                    if (tRet1.length > 0) {
                        tUser2 = tRet1[0].reg_user;
                        tDate2 = tRet1[0].reg_datetime;
                        tCheck = tRet1[0].log1;
                    }

                    sheet.getCell(tRowIdx, 1).value = tOne.buyer_cd;
                    sheet.getCell(tRowIdx, 2).value = tOne.po_cd;
                    sheet.getCell(tRowIdx, 3).value = tOne.po_seq;
                    sheet.getCell(tRowIdx, 4).value =
                        tOne.reg_datetime == ''
                            ? '--'
                            : new Date(
                                  moment(
                                      tOne.reg_datetime,
                                      'YYYYMMDD',
                                  ).toDate(),
                              );
                    sheet.getCell(tRowIdx, 5).value = tOne.reg_user;
                    sheet.getCell(tRowIdx, 6).value =
                        tDate2 == ''
                            ? '--'
                            : new Date(moment(tDate2, 'YYYYMMDD').toDate());
                    sheet.getCell(tRowIdx, 7).value = tUser2;
                    sheet.getCell(tRowIdx, 8).value = tCheck;

                    for (let c = 1; c <= 8; c++) {
                        const cell = sheet.getCell(tRowIdx, c);
                        cell.border = {
                            top: { style: 'thin', color: { argb: 'FF000000' } },
                            left: {
                                style: 'thin',
                                color: { argb: 'FF000000' },
                            },
                            bottom: {
                                style: 'thin',
                                color: { argb: 'FF000000' },
                            },
                            right: {
                                style: 'thin',
                                color: { argb: 'FF000000' },
                            },
                        };
                    }

                    tRowIdx += 1;
                }

                return await upload(`${tWExcelFile}.xlsx`, wb);
            } catch (error) {
                var tRetArray = [];
                var tObj = {};
                tObj.id = 1;
                tObj.CODE = `ERROR:${error.message}`;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },

        mgrQuery_S0305_REPORT_US_LIST: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            // var tWExcelFile = `Partial List-${tUserInfo.USER_ID}-${tRetDate1}`;
            var tWExcelFile = '';
            tWExcelFile = `UsedStockList-${args.data.PO_CD}-${tUserInfo.USER_ID}-${tRetDate1}`;

            try {
                // Excel Read
                var tPath0 = '';
                var tCols0 = __dirname.split('/');
                var tFlag0 = 0;
                tCols0.forEach((col, i) => {
                    if (col !== '') {
                        if (col === 'src') {
                            tPath0 += '/upload/excel_template';
                            tFlag0 = 1;
                        }
                        if (tFlag0 === 0) {
                            tPath0 += '/' + col;
                        }
                    }
                });
                var tTemplateExcel = `${tPath0}/list.xlsx`;

                const wb = new Excel.Workbook();
                await wb.xlsx.readFile(tTemplateExcel);

                var tSheetName = `Sheet1`;
                var sheet = wb.getWorksheet(tSheetName);
                // const sheet = wb.getWorksheet(1);

                sheet.getCell(1, 1).value =
                    `Used Stock List-${args.data.PO_CD}`;

                sheet.getCell(3, 1).value = 'PO Seq';
                sheet.getCell(3, 2).value = 'Order Cd';
                sheet.getCell(3, 3).value = 'Matl Cd';
                sheet.getCell(3, 4).value = 'Matl Name';
                sheet.getCell(3, 5).value = 'Color';
                sheet.getCell(3, 6).value = 'Spec';
                sheet.getCell(3, 7).value = 'Unit';
                sheet.getCell(3, 8).value = 'PO Qty';

                var tRowIdx = 4;

                //
                let sql0 = `
                    select
                        a.po_seq,
                        a.order_cd,
                        a.matl_cd,
                        b.matl_name,
                        b.color,
                        b.spec,
                        b.unit,
                        a.po_qty
                    from
                        ksv_po_mrp a,
                        kcd_matl_mst b
                    WHERE
                        PO_CD = '${args.data.PO_CD}'
                        and po_matl_cd <> '재고발주'
                        and a.matl_cd = b.matl_cd
                    order by
                        a.po_seq,
                        b.matl_name
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));

                var tIdx = 0;
                for (tIdx = 0; tIdx < tRet0.length; tIdx++) {
                    var tOne = { ...tRet0[tIdx] };
                    sheet.getCell(tRowIdx, 1).value = tOne.po_seq;
                    sheet.getCell(tRowIdx, 2).value = tOne.order_cd;
                    sheet.getCell(tRowIdx, 3).value = tOne.matl_cd;
                    sheet.getCell(tRowIdx, 4).value = tOne.matl_name;
                    sheet.getCell(tRowIdx, 5).value = tOne.color;
                    sheet.getCell(tRowIdx, 6).value = tOne.spec;
                    sheet.getCell(tRowIdx, 7).value = tOne.unit;
                    sheet.getCell(tRowIdx, 8).value = tOne.po_qty;
                    tRowIdx += 1;
                }

                return await upload(`${tWExcelFile}.xlsx`, wb);
            } catch (error) {
                var tRetArray = [];
                var tObj = {};
                tObj.id = 1;
                tObj.CODE = `ERROR:${error.message}`;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },

        mgrQuery_S0305_MRP_MANAGER_TBL_KSV_PO_MST: async (
            _,
            args,
            contextValue,
        ) => {
            var tSQL = '';
            var tSQL1 = '';
            var tSQL2 = '';
            var tSQL2_1 = '';

            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = await AFLib.getUserInfo(contextValue);

            var eDate = moment(tRetDate1, 'YYYYMMDD').format('YYYYMMDD');
            var sDate = moment(tRetDate1, 'YYYYMMDD')
                .subtract(6, 'months')
                .format('YYYYMMDD');

            tSQL2 = `and left(a1.reg_datetime,8) between '${sDate}' and '${eDate}' `;
            tSQL2_1 = `and left(a.reg_datetime,8) between '${sDate}' and '${eDate}' `;

            var sqlPoSeq =
                'where a.po_seq >= 1 and a.po_seq < 97 and a.po_seq = (select max(po_seq) from ksv_po_mst where po_cd = a.po_cd and po_seq < 97)';
            if (args.data.PO_TYPE !== '' && args.data.PO_TYPE !== ' ') {
                if (args.data.PO_TYPE === 'A') {
                    // 단품발주
                    tSQL += ``;
                    tSQL1 += `AND a.po_type in ('A') `;
                    sqlPoSeq =
                        'where a.po_seq >= 1 and  a.po_seq = (select max(po_seq) from ksv_po_mst where po_cd = a.po_cd and po_seq > 100)';
                }
                if (args.data.PO_TYPE === 'M') {
                    // Main Order
                    tSQL += `AND a1.po_type in ('M') and right(left(a1.po_cd, 5), 1) in ('-', 'N') `;
                    tSQL1 += `AND a.po_type in ('M') and right(left(a.po_cd, 5), 1) in ('-', 'N') `;
                }
                if (args.data.PO_TYPE === 'N') {
                    // Sample Order
                    tSQL += `AND a1.po_type in ('M', 'N') and right(left(a1.po_cd, 5), 1) in ('S') `;
                    tSQL1 += `AND a.po_type in ('M', 'N') and right(left(a.po_cd, 5), 1) in ('S') `;
                }
                if (args.data.PO_TYPE === 'S') {
                    // Sample, New Po
                    tSQL += `AND a1.po_type in ('S', 'T', 'F' )  `;
                    tSQL1 += `AND a.po_type in ('S', 'T', 'F' )  `;
                }
                if (args.data.PO_TYPE === 'P') {
                    // Goods
                    tSQL += `AND a1.po_type in ('P')  `;
                    tSQL1 += `AND a.po_type in ('P')  `;
                }
                if (args.data.PO_TYPE === 'U') {
                    // Factory LC
                    tSQL += `AND a1.po_type in ('U')  `;
                    tSQL1 += `AND a.po_type in ('U')  `;
                }
            }

            if (
                args.data.PO_STATUS !== '' &&
                args.data.PO_STATUS !== ' ' &&
                args.data.PO_STATUS !== 'all' &&
                args.data.PO_STATUS !== 'all(ing)'
            ) {
                tSQL += `AND a1.po_status like '%${args.data.PO_STATUS}%' `;
                tSQL1 += `AND a.po_status like '%${args.data.PO_STATUS}%' `;
            } else {
                if (args.data.PO_STATUS === 'all(ing)') {
                    tSQL += `AND a1.po_status <> '5' `;
                    tSQL1 += `AND a.po_status <> '5' `;
                }
            }

            if (args.data.ORDER_CD !== '' && args.data.ORDER_CD !== ' ') {
                tSQL2 = '';
                tSQL2_1 = '';
            }
            if (args.data.STYLE_CD !== '' && args.data.STYLE_CD !== ' ') {
                tSQL2 = '';
                tSQL2_1 = '';
            }
            if (args.data.PO_CD !== '' && args.data.PO_CD !== ' ') {
                tSQL2 = '';
                tSQL2_1 = '';
                tSQL += `AND a1.po_cd like '%${args.data.PO_CD}%' `;
                tSQL1 += `AND a.po_cd like '%${args.data.PO_CD}%' `;
            }
            if (args.data.BUYER_CD !== '' && args.data.BUYER_CD !== ' ') {
                tSQL2 = '';
                tSQL2_1 = '';
                tSQL += `AND left(a2.order_cd, 2) like '%${args.data.BUYER_CD}%' `;
                tSQL1 += `AND a0.buyer_cd like '%${args.data.BUYER_CD}%' `;
            }
            if (args.data.REG_USER !== '') {
                tSQL2 = '';
                tSQL2_1 = '';
                tSQL += `and a1.reg_user like '%${args.data.REG_USER}%' `;
                tSQL1 += `and a.reg_user like '%${args.data.REG_USER}%' `;
            }

            if (args.data.PO_TYPE) {
                tSQL += `and a1.po_type = '${args.data.PO_TYPE}' `;
                tSQL1 += `and a.po_type = '${args.data.PO_TYPE}' `;
            }
            /*
       if (args.data.S_PO_DATE !== '') {
           var tE_PO_DATE = args.data.E_PO_DATE;
           if (tE_PO_DATE === '') tE_PO_DATE = tRetDate.substring(0, 8);
           
           tSQL += `and left(a1.reg_datetime,8) between '${args.data.S_PO_DATE}' and '${tE_PO_DATE}' `; 
           tSQL1 += `and left(a.reg_datetime,8) between '${args.data.S_PO_DATE}' and '${tE_PO_DATE}' `;
       } else {
           var tMon1 = parseInt(tRetDate.substring(4, 6));
           if (tMon1 < 4) tMon1 = 1;
           else tMon1 = tMon1 - 3;
            
           var tMonStr = '0';
           if (tMon1 < 10) tMonStr = `0${tMon1}`;
           else tMonStr = String(tMon1);

           var sDate =  `${tRetDate.substring(0, 4)}${tMonStr}01`;
           var eDate =  tRetDate.substring(0, 8);

           if (args.data.BUYER_CD === "" &&
               args.data.PO_CD === "" &&
               args.data.PO_STATUS === "" &&
               args.data.PO_TYPE === "" &&
               args.data.S_PO_DATE === "") { 
               tSQL += `and left(a1.reg_datetime,8) between '${sDate}' and '${eDate}' `; 
               tSQL1 += `and left(a.reg_datetime,8) between '${sDate}' and '${eDate}' `;
           }
       }
       if (tSQL === '') {
           tSQL += `AND a1.YY >= 2022 `;
           tSQL1 += `AND a.YY >= 2022 `;
       }
       */

            let sqlStr = `
                select
                    a.*,
                    f.PO_SEQ AS PO_SEQ_1,
                    a0.BUYER_CD,
                    b.cd_name as PO_TYPE_NAME,
                    c.cd_name as PO_STATUS_NAME,
                    d.FACTORY_NAME,
                    a0.BUYER_NAME,
                    a0.MATL_DUE_DATE,
                    a0.DUE_DATE,
                    isnull(c1.STATUS_CD, '') as P_STATUS_CD
                from
                    ksv_po_mst a
                    left join ksv_po_mst f on f.po_cd = a.po_cd
                    and f.po_seq = (
                        select
                            max(po_seq)
                        from
                            ksv_po_mst
                        where
                            po_cd = a.po_cd
                            and po_seq < 97
                    )
                    left join kcd_code b on b.cd_code = a.po_type
                    and b.cd_group = 'PO_TYPE'
                    left join kcd_code c on c.cd_code = a.po_status
                    and c.cd_group = 'PO_STATUS'
                    left join kcd_jobmonitor c1 on c1.po_cd = a.po_cd
                    and c1.user_id = '${tUserInfo.USER_ID}'
                    and c1.id = (
                        select
                            max(id)
                        from
                            kcd_jobmonitor
                        where
                            po_cd = a.po_cd
                            and user_id = '${tUserInfo.USER_ID}'
                    )
                    left join kcd_factory d on d.factory_cd = a.factory_cd,
                    (
                        select
                            top 200 a1.po_cd,
                            left(a2.order_cd, 2) as buyer_cd,
                            a3.buyer_name,
                            max(a4.matl_due_date) as matl_due_date,
                            max(a4.due_date) as due_date,
                            count(*) as order_cnt
                        from
                            ksv_po_mst a1,
                            ksv_po_mem a2,
                            kcd_buyer a3,
                            ksv_order_mst a4,
                            kcd_style a5
                        where
                            a1.po_seq = 1
                            and a1.po_cd = a2.po_cd
                            and left(a2.order_cd, 2) = a3.buyer_cd
                            and a4.order_cd = a2.order_cd
                            and a4.style_cd = a5.style_cd
                            and a5.style_name like '%${args.data.STYLE_CD}%'
                            and a2.order_cd like '%${args.data.ORDER_CD}%' ${tSQL} ${tSQL2}
                        group by
                            a1.po_cd,
                            left(a2.order_cd, 2),
                            a3.buyer_name
                            -- order by a1.po_cd desc 
                            -- offset 0 rows fetch next 1000 rows only
                    ) a0 ${sqlPoSeq}
                    -- and a.po_seq = (select max(po_seq) from ksv_po_mst where po_cd = a.po_cd and po_seq < 97) 
                    and a.po_cd = a0.po_cd
                    -- and isnull(C1.STATUS_CD, '') = '' 
                    -- and (
                    --     a.work_status = ''
                    --     or a.work_status is null
                    -- )
                    -- and (
                    --     a.req_status = ''
                    --     or a.req_status is null
                    -- ) 
                    ${tSQL1} ${tSQL2_1}
                order by
                    a.po_cd
                    -- order by a.reg_datetime desc 
                    -- offset 0 rows fetch next 1000 rows only
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            let sqlStr100 = `
                select
                    a.*,
                    f.PO_SEQ AS PO_SEQ_1,
                    a0.BUYER_CD,
                    b.cd_name as PO_TYPE_NAME,
                    c.cd_name as PO_STATUS_NAME,
                    d.FACTORY_NAME,
                    a0.BUYER_NAME,
                    a0.MATL_DUE_DATE,
                    a0.DUE_DATE,
                    isnull(c1.STATUS_CD, '') as P_STATUS_CD
                from
                    ksv_po_mst a
                    left join ksv_po_mst f on f.po_cd = a.po_cd
                    and f.po_seq = (
                        select
                            max(po_seq)
                        from
                            ksv_po_mst
                        where
                            po_cd = a.po_cd
                            and po_seq < 97
                    )
                    left join kcd_code b on b.cd_code = a.po_type
                    and b.cd_group = 'PO_TYPE'
                    left join kcd_code c on c.cd_code = a.po_status
                    and c.cd_group = 'PO_STATUS'
                    left join kcd_jobmonitor c1 on c1.po_cd = a.po_cd
                    and c1.user_id = '${tUserInfo.USER_ID}'
                    and c1.id = (
                        select
                            max(id)
                        from
                            kcd_jobmonitor
                        where
                            po_cd = a.po_cd
                            and user_id = '${tUserInfo.USER_ID}'
                    )
                    left join kcd_factory d on d.factory_cd = a.factory_cd,
                    (
                        select
                            top 200 a1.po_cd,
                            left(a2.order_cd, 2) as buyer_cd,
                            a3.buyer_name,
                            max(a4.matl_due_date) as matl_due_date,
                            max(a4.due_date) as due_date,
                            count(*) as order_cnt
                        from
                            ksv_po_mst a1,
                            ksv_po_mem a2,
                            kcd_buyer a3,
                            ksv_order_mst a4,
                            kcd_style a5
                        where
                            a1.po_seq = 1
                            and a1.po_cd = a2.po_cd
                            and left(a2.order_cd, 2) = a3.buyer_cd
                            and a4.order_cd = a2.order_cd
                            and a4.style_cd = a5.style_cd
                            and a5.style_name like '%${args.data.STYLE_CD}%'
                            and a2.order_cd like '%${args.data.ORDER_CD}%' ${tSQL} ${tSQL2}
                        group by
                            a1.po_cd,
                            left(a2.order_cd, 2),
                            a3.buyer_name
                            -- order by a1.po_cd desc 
                            -- offset 0 rows fetch next 1000 rows only
                    ) a0 ${sqlPoSeq}
                    -- and a.po_seq = (select max(po_seq) from ksv_po_mst where po_cd = a.po_cd and po_seq < 97) 
                    and a.po_cd = a0.po_cd
                    -- and isnull(C1.STATUS_CD, '') = '' 
                    and (
                        (
                            a.work_status <> ''
                            and a.work_status is not null
                        )
                        or (
                            a.req_status <> ''
                            and a.req_status is not null
                        )
                    ) ${tSQL1} ${tSQL2_1}
                order by
                    a.po_cd
                    -- order by a.reg_datetime desc 
                    -- offset 0 rows fetch next 1000 rows only
            `;
            // var tRet100 = await prisma.$queryRaw(Prisma.raw(sqlStr100));
            var tRet100 = [];

            let sqlStr1 = `
                select
                    a.*,
                    f.PO_SEQ AS PO_SEQ_1,
                    a0.BUYER_CD,
                    b.cd_name as PO_TYPE_NAME,
                    c.cd_name as PO_STATUS_NAME,
                    d.FACTORY_NAME,
                    a0.BUYER_NAME,
                    a0.MATL_DUE_DATE,
                    a0.DUE_DATE,
                    isnull(a9.STATUS_CD, '') as P_STATUS_CD
                from
                    ksv_po_mst a
                    left join ksv_po_mst f on f.po_cd = a.po_cd
                    and f.po_seq = (
                        select
                            max(po_seq)
                        from
                            ksv_po_mst
                        where
                            po_cd = a.po_cd
                            and po_seq < 97
                    )
                    left join kcd_code b on b.cd_code = a.po_type
                    and b.cd_group = 'PO_TYPE'
                    left join kcd_code c on c.cd_code = a.po_status
                    and c.cd_group = 'PO_STATUS'
                    left join kcd_factory d on d.factory_cd = a.factory_cd,
                    (
                        select
                            a1.po_cd,
                            left(a2.order_cd, 2) as buyer_cd,
                            a3.buyer_name,
                            max(a4.matl_due_date) as matl_due_date,
                            max(a4.due_date) as due_date,
                            count(*) as order_cnt
                        from
                            ksv_po_mst a1,
                            ksv_po_mem a2,
                            kcd_buyer a3,
                            ksv_order_mst a4,
                            kcd_style a5
                        where
                            a1.po_seq = 1
                            and a1.po_cd = a2.po_cd
                            and a1.po_cd in (
                                select distinct
                                    po_cd
                                from
                                    kcd_jobmonitor
                                where
                                    user_id = '${tUserInfo.USER_ID}'
                            )
                            and left(a2.order_cd, 2) = a3.buyer_cd
                            and a4.order_cd = a2.order_cd
                            and a4.style_cd = a5.style_cd
                            and a5.style_name like '%%'
                            and a2.order_cd like '%%'
                        group by
                            a1.po_cd,
                            left(a2.order_cd, 2),
                            a3.buyer_name
                    ) a0,
                    kcd_jobmonitor a9
                where
                    a.po_cd = a0.po_cd
                    and a.po_cd = a9.po_cd
                    -- and a9.status_cd = '0'
                    and a9.user_id = '${tUserInfo.USER_ID}'
                order by
                    a.po_cd
            `;
            var tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));

            var tRetData = {
                PO_STATUS_NAME: '',
                PO_STATUS: '',
                PO_SEQ: '',
                BUYER_NAME: '',
                BUYER_CD: '',
                PO_TYPE_NAME: '',
                PO_TYPE: '',
                PO_CD: '',
                TARGET_ETA: '',
                REG_DATETIME: '',
                REG_USER: '',
                UPD_DATETIME: '',
                UPD_USER: '',
                MRP_PACK_FLAG: '',
                BUYER_NAME: '',
                BUYER_CD: '',
                DOMESTIC_FLAG: '',
                IMPORT_FLAG: '',
                FACTORY_FLAG: '',
            };
            var tRetArray = [];

            /*
       var tIdx = 0; 
       for (tIdx = 0; tIdx < tRet1.length; tIdx++) {
           var tObj = { ...tRet1[tIdx] };

           let sqlStr0 = `
               select
                   *
               from
                   ksv_po_mst
               where
                   po_cd = '${tObj.PO_CD}'
                   and po_seq = '1'
           `;
           var tRet0  =  await prisma.$queryRaw(Prisma.raw(sqlStr0));
           tObj.UPD_DATETIME = tObj.REG_DATETIME;
           tObj.UPD_USER = tObj.REG_USER;

           if (tRet0.length > 0) {
               tObj.REG_DATETIME = tRet0[0].REG_DATETIME;
               tObj.REG_USER = tRet0[0].REG_USER;
           } 

           tObj.TARGET_ETA = tObj.MATL_DUE_DATE;
           tRetArray.push(tObj);
       }
       */

            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet100.length; tIdx++) {
                var tObj = { ...tRet100[tIdx] };

                let sqlStr0 = `
                    select
                        *
                    from
                        ksv_po_mst
                    where
                        po_cd = '${tObj.PO_CD}'
                        and po_seq = '1'
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr0));
                tObj.UPD_DATETIME = tObj.REG_DATETIME;
                tObj.UPD_USER = tObj.REG_USER;

                if (tRet0.length > 0) {
                    tObj.REG_DATETIME = tRet0[0].REG_DATETIME;
                    tObj.REG_USER = tRet0[0].REG_USER;
                }

                tObj.TARGET_ETA = tObj.MATL_DUE_DATE;
                if (!tObj.PURCHASE_REQUEST) tObj.PURCHASE_REQUEST = '';
                tRetArray.push(tObj);
            }

            tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tObj = { ...tRet[tIdx] };

                let sqlStr0 = `
                    select
                        *
                    from
                        ksv_po_mst
                    where
                        po_cd = '${tObj.PO_CD}'
                        and po_seq = '1'
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr0));
                tObj.UPD_DATETIME = tObj.REG_DATETIME;
                tObj.UPD_USER = tObj.REG_USER;

                if (tRet0.length > 0) {
                    tObj.REG_DATETIME = tRet0[0].REG_DATETIME;
                    tObj.REG_USER = tRet0[0].REG_USER;
                }

                tObj.TARGET_ETA = tObj.MATL_DUE_DATE;
                if (!tObj.PURCHASE_REQUEST) tObj.PURCHASE_REQUEST = '';
                tRetArray.push(tObj);
            }

            console.log(sqlStr);
            console.log(sqlStr100);

            return tRetArray;
        },
        mgrQuery_S0305_MRP_MANAGER_CODE: async (_, args) => {
            var tSQL = '';

            var tWObj = {};

            let sqlStr = `
                select
                    *
                from
                    kcd_code
                where
                    cd_group = 'PO_TYPE'
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_CODE = '';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.PO_TYPE = tRet;

            let sqlStr = `
                select
                    *
                from
                    kcd_code
                where
                    cd_group = 'PO_STATUS'
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_CODE = 'all';
            tObj.CD_NAME = 'all';
            tRet.unshift(tObj);
            tObj = {};
            tObj.CD_CODE = 'all(ing)';
            tObj.CD_NAME = 'all(ing)';
            tRet.unshift(tObj);
            tWObj.PO_STATUS = tRet;

            let sqlStr = `
                select
                    *
                from
                    kcd_buyer
            `;
            var tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRet = [];
            tRet0.forEach((col, i) => {
                var tObj1 = { ...col };
                tObj1.BUYER_NAME = `(${col.BUYER_CD})${col.BUYER_NAME}`;
                tRet.push(tObj1);
            });

            var tObj = {};
            tObj.BUYER_CD = '';
            tObj.BUYER_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.BUYER_CD = tRet;

            let sqlStr = `
                select
                    *
                from
                    kcd_user
            `;
            var tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRet = [];
            tRet0.forEach((col, i) => {
                var tObj1 = { ...col };
                tObj1.USER_NAME = `(${col.USER_ID})${col.USER_NAME}`;
                tRet.push(tObj1);
            });
            var tObj = {};
            tObj.USER_ID = '';
            tObj.USER_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.REG_USER = tRet;

            return tWObj;
        },
        mgrQuery_S0305_ORDER_MRP_CNT: async (_, args) => {
            var tSQL = '';

            let sqlStr = `
                select
                    isnull(count(*), 0) as order_mrp_cnt
                from
                    ksv_order_mrp
                where
                    order_cd in (
                        select
                            order_cd
                        from
                            ksv_po_mem
                        where
                            po_cd = '${args.data.PO_CD}'
                            and po_seq = 1
                    )
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.ORDER_MRP_CNT = String(tRet[0].order_mrp_cnt);
            return tObj;
        },

        mgrQuery_S0305_WORK_STATUS: async (_, args, contextValue) => {
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tSQL = '';
            var tInput = { ...args.data };

            let sqlStr = `
                select
                    a.PO_CD,
                    isnull(a.work_status, '') as WORK_STATUS
                from
                    ksv_po_mst a
                where
                    a.po_cd = '${tInput.PO_CD}'
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = { ...tRet[0] };

            let sqlStr1 = `
                select
                    *
                from
                    kcd_jobmonitor
                where
                    user_id = '${tUserInfo.USER_ID}'
                    and status_cd = '0'
            `;
            var tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));
            tObj.JOB_CNT = String(tRet1.length);

            let sqlStr2 = `
                select
                    isnull(max(po_seq), 0) as max_po_seq
                from
                    ksv_po_mrp
                where
                    po_cd = '${tInput.PO_CD}'
            `;
            var tRet2 = await prisma.$queryRaw(Prisma.raw(sqlStr2));
            tObj.PO_SEQ = '0';
            if (tRet2.length > 0) {
                tObj.PO_SEQ = String(tRet2[0].max_po_seq);
            }

            var tArray = [];
            tArray.push(tObj);
            return tArray;
        },
    },
};

export default moduleQuery_S0305_MRP_MANAGER_TBL_KSV_PO_MST;
