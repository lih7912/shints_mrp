import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
import S030515_QRY_COMM from '../../reportlib_mrplist'; //PrismaClient 사용하기 위해 불러오기
import S030514_QRY_COMM from '../S030514_PO_LIST/S030514_2.queries';

import axios from 'axios';
const Excel = require('exceljs');
const moment = require('moment');
const { upload, generateUploadURL } = require('../../../routes/s3');
const { MongoClient } = require('mongodb');
const mssql = require('../../../routes/mssqlExec');

const nodemailer = require('nodemailer'); // 모듈 import

const border = {
    top: { style: 'thin' },
    left: { style: 'thin' },
    bottom: { style: 'thin' },
    right: { style: 'thin' },
};

const headAlign = { horizontal: 'center', vertical: 'middle', wrapText: true };

// export default로 Query 내용 내보내기
const moduleQuery_S030515_2 = {
    Query: {
        mgrQueryS030515_REPORT_ADD_MATL_REQ: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = await AFLib.getUserInfoSync(contextValue);

            // var tWExcelFile = `Partial List-${tUserInfo.USER_ID}-${tRetDate1}`;
            console.log(`REPORT_ADD_MATL_REQ:(${args.data.PO_SEQ})`);
            var tWExcelFile = '';
            if (args.data.PO_SEQ) {
                tWExcelFile = `PO_ADDPO-${args.data.PO_CD}(${args.data.PO_SEQ})-${tUserInfo.USER_ID}-${tRetDate1}`;
            } else {
                tWExcelFile = `PO_ADDPO-${args.data.PO_CD}(All)-${tUserInfo.USER_ID}-${tRetDate1}`;
                /*
                var tRetArray = [];
                var tObj = {};
                tObj.id = 1;
                tObj.CODE = `ERROR:po seq을 선택하세요`;
                tRetArray.push(tObj);
                return tRetArray;
                */
            }

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
                var tTemplateExcel = `${tPath0}/PO_ADDPO.xlsx`;

                const wb = new Excel.Workbook();
                await wb.xlsx.readFile(tTemplateExcel);

                var tSheetName = `Sheet1`;
                var sheet = wb.getWorksheet(tSheetName);
                // const sheet = wb.getWorksheet(1);

                var tRowIdx = 10;

                var sql0_s = '';
                if (parseInt(args.data.PO_SEQ) < 100) {
                    sql0_s = `                and a.diff_po_type = '3' `;
                }

                var sqlPoSeq = '';
                var sqlPoSeq1 = '';
                var sqlPoSeq2 = '';
                if (args.data.PO_SEQ) {
                    sqlPoSeq = `and a.po_seq = '${args.data.PO_SEQ}'`;
                    sqlPoSeq1 = `and f.po_seq = '${args.data.PO_SEQ}'`;
                    sqlPoSeq2 = `and po_seq = '${args.data.PO_SEQ}' `;
                }

                //
                let sql0 = `
                    select
                        a.matl_cd,
                        b.color,
                        b.matl_name,
                        b.spec,
                        b.unit,
                        a.po_qty,
                        c.matl_price,
                        c.curr_cd,
                        (a.po_qty * c.matl_price * d.usd_rate) as tot_amt,
                        (convert(float, b.weight) / 1000 * a.po_qty) as weight,
                        a.reason_type,
                        a.fare_type,
                        a.remark,
                        a.order_cd,
                        e.vendor_name
                    from
                        ksv_po_mrp a,
                        kcd_matl_mst b,
                        kcd_matl_mem c,
                        kcd_currency d,
                        kcd_vendor e
                    where
                        a.po_cd = '${args.data.PO_CD}'
                        ${sqlPoSeq}
                        and b.matl_cd = a.matl_cd
                        and b.vendor_cd = e.vendor_cd
                        and c.matl_cd = a.matl_cd
                        and c.matl_seq = a.matl_seq
                        and d.curr_cd = c.curr_cd
                        and d.start_date = (
                            select
                                max(start_date)
                            from
                                kcd_currency
                        )
                        and a.use_po_type = '1' -- 20201125 김미라 재고적용된건 나오지 말게
                        and a.po_qty > 0 -- 20130416 김미라 발주수량 0이상인것만
                        ${sql0_s}
                    order by
                        e.vendor_name,
                        a.mrp_seq
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));

                tRowIdx = 10;
                var tTotAmt = 0;
                var tTotWeight = 0;
                tRet0.forEach((col, i) => {
                    sheet.getCell(tRowIdx, 1).value = i + 1;
                    sheet.getCell(tRowIdx, 2).value = col.vendor_name;
                    sheet.getCell(tRowIdx, 3).value = col.matl_cd;
                    sheet.getCell(tRowIdx, 4).value = col.color;
                    sheet.getCell(tRowIdx, 5).value = col.matl_name;
                    sheet.getCell(tRowIdx, 6).value = col.spec;
                    sheet.getCell(tRowIdx, 7).value = col.unit;
                    sheet.getCell(tRowIdx, 8).value = col.po_qty;
                    sheet.getCell(tRowIdx, 9).value =
                        `${col.matl_price} ${col.curr_cd}`;
                    sheet.getCell(tRowIdx, 10).value = Number(
                        col.tot_amt.toFixed(4),
                    );
                    tTotAmt += parseFloat(col.tot_amt);
                    sheet.getCell(tRowIdx, 11).value = Number(
                        col.weight.toFixed(2),
                    );
                    tTotWeight += parseFloat(col.weight);
                    if (col.reason_type === 1)
                        sheet.getCell(tRowIdx, 12).value = 'O';
                    if (col.reason_type === 2)
                        sheet.getCell(tRowIdx, 13).value = 'O';
                    if (col.reason_type === 3)
                        sheet.getCell(tRowIdx, 14).value = 'O';
                    if (col.reason_type === 4)
                        sheet.getCell(tRowIdx, 15).value = 'O';
                    if (col.fare_type === 1)
                        sheet.getCell(tRowIdx, 16).value = 'O';
                    if (col.fare_type === 2)
                        sheet.getCell(tRowIdx, 17).value = 'O';
                    sheet.getCell(tRowIdx, 18).value = 'O';
                    sheet.getCell(tRowIdx, 19).value =
                        `${col.remark}${col.order_cd}`;

                    for (let c = 1; c <= 19; c++) {
                        sheet.getCell(tRowIdx, c).border = border;
                    }

                    tRowIdx += 1;
                });

                sheet.getCell(tRowIdx, 1).value = 'Total';
                sheet.getCell(tRowIdx, 10).value = Number(tTotAmt.toFixed(4));
                sheet.getCell(tRowIdx, 11).value = tTotWeight;

                sheet.mergeCells(`A${tRowIdx}`, `I${tRowIdx}`);
                sheet.getCell(tRowIdx, 1).alignment = headAlign;

                for (let c = 1; c <= 19; c++) {
                    sheet.getCell(tRowIdx, c).border = border;
                }

                sheet.getCell(6, 4).value =
                    `${args.data.PO_CD} (${args.data.PO_SEQ})`;
                sheet.getCell(7, 4).value = ``;

                let sql1 = `
                    select
                        b.factory_name,
                        isnull(c.cd_name, '') as delivery
                    from
                        ksv_po_mst a
                        left join kcd_code c on c.cd_group = 'DELIVERY_TYPE'
                        and c.cd_code = a.delivery_type,
                        kcd_factory b
                    where
                        a.po_cd = '${args.data.PO_CD}'
                        ${sqlPoSeq}
                        and b.factory_cd = a.factory_cd
                    order by
                        a.po_seq
                `;
                var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                var tStrFactory = tRet1[0].factory_name;
                var tStrDelivery = tRet1[0].delivery;

                sheet.getCell(7, 11).value = tStrFactory;
                sheet.getCell(7, 20).value = tStrDelivery;
                sheet.getCell(4, 17).value =
                    `${tUserInfo.USER_NAME}(${tUserInfo.USER_ID})`;

                let sql2 = `
                    select
                        f.matl_cd,
                        b.color,
                        b.matl_name,
                        b.spec,
                        b.unit,
                        g.remain_qty,
                        d.matl_price,
                        d.curr_cd,
                        (g.remain_qty * d.matl_price * e.usd_rate) as tot_amt,
                        (convert(float, b.weight) / 1000 * g.remain_qty) as weight,
                        f.order_cd
                    from
                        kcd_matl_mst b,
                        kcd_vendor c,
                        kcd_matl_mem d,
                        kcd_currency e,
                        ksv_po_mrp f,
                        ksv_stock_matl g
                    where
                        f.po_cd = '${args.data.PO_CD}'
                        ${sqlPoSeq1}
                        and f.matl_cd = b.matl_cd
                        and b.vendor_cd = c.vendor_cd
                        and f.diff_po_type = '1'
                        and d.matl_cd = f.matl_cd
                        and d.matl_seq = (
                            select
                                max(matl_seq)
                            from
                                kcd_matl_mem
                            where
                                matl_cd = f.matl_cd
                        )
                        and e.curr_cd = d.curr_cd
                        and e.start_date = (
                            select
                                max(start_date)
                            from
                                kcd_currency
                        )
                        and f.stock_idx = g.stock_idx
                    order by
                        1
                `;
                var tRet2 = await prisma.$queryRaw(Prisma.raw(sql2));

                if (tRet2.length > 0) {
                    tRowIdx += 2;
                    sheet.getCell(tRowIdx, 1).value = 'Left over';

                    tRowIdx += 1;
                    sheet.getCell(tRowIdx, 1).value = 'NO';
                    sheet.getCell(tRowIdx, 2).value = 'Matl Code';
                    sheet.getCell(tRowIdx, 3).value = 'Order';
                    sheet.getCell(tRowIdx, 4).value = 'Color';
                    sheet.getCell(tRowIdx, 5).value = 'Desc';
                    sheet.getCell(tRowIdx, 6).value = 'Spec';
                    sheet.getCell(tRowIdx, 7).value = 'Unit';
                    sheet.getCell(tRowIdx, 8).value = 'Qty';
                    sheet.getCell(tRowIdx, 9).value = 'Price';
                    sheet.getCell(tRowIdx, 10).value = 'Amount';
                    sheet.getCell(tRowIdx, 11).value = 'Kg';
                }

                var tTot0 = 0;
                var tTot1 = 0;
                tRet2.forEach((col, i) => {
                    tRowIdx += 1;
                    sheet.getCell(tRowIdx, 1).value = i + 1;
                    sheet.getCell(tRowIdx, 2).value = col.matl_cd;
                    sheet.getCell(tRowIdx, 3).value = col.order_cd;
                    sheet.getCell(tRowIdx, 4).value = col.color;
                    sheet.getCell(tRowIdx, 5).value = col.matl_name;
                    sheet.getCell(tRowIdx, 6).value = col.spec;
                    sheet.getCell(tRowIdx, 7).value = col.unit;
                    sheet.getCell(tRowIdx, 8).value = col.remain_qty;
                    sheet.getCell(tRowIdx, 9).value = col.matl_price;
                    sheet.getCell(tRowIdx, 10).value = col.tot_amt;
                    tTot0 += parseFloat(col.tot_amt);
                    sheet.getCell(tRowIdx, 11).value = col.weight;
                    tTot1 += parseFloat(col.weight);
                });

                if (tRet2.length > 0) {
                    tRowIdx += 1;
                    sheet.getCell(tRowIdx, 10).value = tTot0;
                    sheet.getCell(tRowIdx, 11).value = tTot1;
                }

                sheet.getCell(6, 19).value = tRetDate1;

                let sql0 = `
                    SELECT distinct
                        isnull(seq_comment, '') as seq_comment
                    from
                        ksv_po_mrp
                    where
                        po_cd = '${args.data.PO_CD}'
                        ${sqlPoSeq2}
                        and po_seq = '${args.data.PO_SEQ} '
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));

                var tRetObj = {};
                tRetObj.SEQ_COMMENT = '';
                if (tRet0.length > 0)
                    tRetObj.SEQ_COMMENT = tRet0[0].seq_comment;

                let sql1 = `
                    SELECT
                        a.buyer,
                        a.sales,
                        a.matl,
                        a.mrp,
                        a.mrp2,
                        a.etc,
                        a.cad,
                        b.cd_name as sql_reason_n,
                        a.seq_reason
                    from
                        ksv_po_reason a,
                        kcd_code b
                    where
                        po_cd = '${args.data.PO_CD}'
                        ${sqlPoSeq2}
                        and b.cd_group = 'seq_reason'
                        and b.cd_code = a.seq_reason
                `;
                var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                tRetObj.CHK_BUYER = '0';
                tRetObj.CHK_SALES = '0';
                tRetObj.CHK_MATL = '0';
                tRetObj.CHK_MRP = '0';
                tRetObj.CHK_MRP2 = '0';
                tRetObj.CHK_ETC = '0';
                tRetObj.CHK_CAD = '0';
                tRetObj.SEQ_REASON = '';

                if (tRet1.length > 0) {
                    var tOne = {
                        ...tRet1[0],
                    };
                    tRetObj.CHK_BUYER = tOne.buyer;
                    tRetObj.CHK_SALES = tOne.sales;
                    tRetObj.CHK_MATL = tOne.matl;
                    tRetObj.CHK_MRP = tOne.mrp;
                    tRetObj.CHK_MRP2 = tOne.mrp2;
                    tRetObj.CHK_ETC = tOne.etc;
                    tRetObj.CHK_CAD = tOne.cad;
                    tRetObj.SEQ_REASON = tOne.seq_reason;
                }

                /*
                var tArray = [];
                tArray.push(tRetObj);
                let tSeqComment = tArray;

                console.log('tSeqComment', tSeqComment);

                var nRowIdx = tRowIdx + 3;
                sheet.getCell(nRowIdx, 1).value = 'PO NO';
                sheet.getCell(nRowIdx, 2).value = 'SEQ';
                sheet.getCell(nRowIdx, 3).value = 'REVISED REASON';
                sheet.getCell(nRowIdx, 4).value = 'No. for Reason';
                sheet.getCell(nRowIdx, 5).value = 'FROM - responsibility , Trach nhiem';
                sheet.getCell(nRowIdx, 12).value = 'FREIGHT CHARGE';
                sheet.getCell(nRowIdx, 14).value = 'Remark';
                sheet.getCell(nRowIdx, 15).value = 'Related supplier';

                nRowIdx += 1;
                sheet.getCell(nRowIdx, 5).value = 'SALES';
                sheet.getCell(nRowIdx, 6).value = 'BUYER';
                sheet.getCell(nRowIdx, 7).value = 'CAD';
                sheet.getCell(nRowIdx, 8).value = 'MRP';
                sheet.getCell(nRowIdx, 9).value = 'MRP2';
                sheet.getCell(nRowIdx, 10).value = 'MATL';
                sheet.getCell(nRowIdx, 11).value = 'Etc';
                sheet.getCell(nRowIdx, 12).value = 'SEA';
                sheet.getCell(nRowIdx, 13).value = 'AIR/EXPRESS(Need approval)';
                nRowIdx += 1;

                sheet.getCell(nRowIdx, 1).value = args.data.PO_CD;
                sheet.getCell(nRowIdx, 2).value = args.data.PO_SEQ;
                tSeqComment.forEach((col, i) => {
                    sheet.getCell(nRowIdx, 3).value = col.SEQ_COMMENT;
                    sheet.getCell(2, 3).value = col.SEQ_COMMENT;
                    sheet.getCell(nRowIdx, 4).value = col.SEQ_REASON;
                    sheet.getCell(nRowIdx, 5).value = col.CHK_SALES;
                    sheet.getCell(nRowIdx, 6).value = col.CHK_BUYER;
                    sheet.getCell(nRowIdx, 7).value = col.CHK_CAD;
                    sheet.getCell(nRowIdx, 8).value = col.CHK_MRP;
                    sheet.getCell(nRowIdx, 9).value = col.CHK_MRP2;
                    sheet.getCell(nRowIdx, 10).value = col.CHK_MATL;
                    sheet.getCell(nRowIdx, 11).value = col.CHK_ETC;
                    sheet.getCell(nRowIdx, 12).value = '';
                    sheet.getCell(nRowIdx, 13).value = '';
                    sheet.getCell(nRowIdx, 14).value = '';
                });

                var vendorInfo = await prisma.$queryRaw(Prisma.raw(
                    `
                        select distinct
                            a.po_seq,
                            e.vendor_name
                        from
                            ksv_po_mrp a,
                            kcd_matl_mst b,
                            kcd_vendor e
                        where
                            a.po_cd = '${args.data.PO_CD}'
                            and a.po_seq = '${args.data.PO_SEQ}'
                            and b.matl_cd = a.matl_cd
                            and b.vendor_cd = e.vendor_cd
                            and a.seq_comment is not null
                    `
                ));

                let vendorNames = vendorInfo.map(col => col.vendor_name).join(' ');
                sheet.getCell(nRowIdx, 15).value = vendorNames;
                */

                const uploadInfo = await generateUploadURL();
                const uploadURL = uploadInfo.uploadURL;
                let url = uploadURL.split('?')[0];

                var tPoSeqStr = 'All';
                if (args.data.PO_SEQ) tPoSeqStr = args.data.PO_SEQ;
                await prisma.$queryRaw(
                    Prisma.raw(
                        `
                            delete FROM KCD_FILEINFO
                            where
                                1 = 1
                                and name = '${tWExcelFile}'
                                and title = '${tWExcelFile}'
                                and file_key = '${args.data.PO_CD}_${tPoSeqStr}'
                        `,
                    ),
                );

                await prisma.$queryRaw(
                    Prisma.raw(
                        AFLib.createTableSql('KCD_FILEINFO', {
                            NAME: tWExcelFile,
                            URL: url,
                            TITLE: tWExcelFile,
                            FILE_KEY: `${args.data.PO_CD}_${tPoSeqStr}`,
                            KIND: 'PO_ADDPO',
                        }),
                    ),
                );

                return await upload(`${tWExcelFile}.xlsx`, wb, uploadURL);
            } catch (error) {
                return [
                    {
                        id: 1,
                        CODE: `ERROR:${error.message}`,
                    },
                ];
            }
        },
        mgrQueryS030515_REPORT_1: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            //
            let sql00 = `
                select
                    max(po_seq) as last_po_seq
                from
                    ksv_po_mst
                where
                    po_cd = '${args.data.PO_CD}'
                    and po_seq < 97
            `;
            var tRet_sql00 = await prisma.$queryRaw(Prisma.raw(sql00));
            var last_po_seq = tRet_sql00[0].last_po_seq;

            console.log(`REPORT_1: ${args.data.PO_SEQ}`);

            var sqlPoSeq = '';
            var sqlPoSeq1 = '';
            var sqlPoSeq2 = '';
            if (args.data.PO_SEQ) {
                sqlPoSeq = ` and b.po_seq = '${args.data.PO_SEQ}' `;
                sqlPoSeq1 = `and a.po_seq = '${args.data.PO_SEQ}' `;
                sqlPoSeq2 = `and po_seq = '${args.data.PO_SEQ}' `;
            }


            let tOrders = await prisma.$queryRaw(
                Prisma.raw(
                    `
                        select
                            a.SIZE_MEMBER,
                            b.ORDER_CD,
                            d.STYLE_NAME,
                            sum(e.tot_cnt) as TOT_CNT
                        from
                            kcd_size_mst a,
                            ksv_po_mem b,
                            ksv_order_mst c,
                            KCD_STYLE d,
                            ksv_order_mem e
                        where
                            1 = 1
                            and a.SIZE_GROUP = c.SIZE_GROUP
                            and b.order_cd = c.ORDER_CD
                            and c.STYLE_CD = d.STYLE_CD
                            and b.po_cd = '${args.data.PO_CD}'
                            ${sqlPoSeq}
                            and b.order_cd = e.order_cd
                        group by
                            a.SIZE_MEMBER,
                            b.ORDER_CD,
                            d.STYLE_NAME
                    `,
                ),
            );

            let sqlMrp1 = `
                select
                    a.po_seq,
                    a.order_cd,
                    a.matl_cd,
                    c.matl_name,
                    c.color,
                    c.spec,
                    c.unit,
                    b.cd_name as use_po_type_n,
                    a.use_qty,
                    a.po_qty,
                    a.diff_qty,
                    e.cd_name as diff_po_type_n,
                    a.matl_price,
                    a.curr_cd,
                    (a.matl_price * a.po_qty) as po_amt,
                    d.vendor_name,
                    a.mrp_seq,
                    a.matl_seq,
                    a.reg_datetime
                from
                    ksv_po_mrp a,
                    kcd_matl_mst c,
                    kcd_code b,
                    kcd_vendor d,
                    kcd_code e
                where
                    a.po_cd = '${args.data.PO_CD}'
                    ${sqlPoSeq1}
                    and a.diff_po_type not in ('1', '2', '4')
                    and c.matl_cd = a.matl_cd
                    and d.vendor_cd = c.vendor_cd
                    and b.cd_group = 'USE_PO_TYPE'
                    and b.cd_code = a.use_po_type
                    and e.cd_group = 'DIFF_PO_TYPE'
                    and e.cd_code = a.diff_po_type
                order by
                    1,
                    2,
                    4
            `;
            var tMrp1 = await prisma.$queryRaw(Prisma.raw(sqlMrp1));

            let sqlMrp2 = `
                select
                    a.po_seq,
                    a.order_cd,
                    a.matl_cd,
                    c.matl_name,
                    c.color,
                    c.spec,
                    c.unit,
                    a.org_po_seq,
                    a.po_qty,
                    a.diff_qty,
                    e.cd_name as diff_po_type_n,
                    a.remark,
                    f.matl_price,
                    f.curr_cd,
                    (a.diff_qty * f.matl_price) as po_amt,
                    d.vendor_name,
                    a.mrp_seq,
                    seq_comment
                from
                    ksv_po_mrp a,
                    kcd_matl_mst c,
                    kcd_vendor d,
                    kcd_code e,
                    kcd_matl_mem f
                where
                    a.po_cd = '${args.data.PO_CD}'
                    ${sqlPoSeq1}
                    and c.matl_cd = a.matl_cd
                    and d.vendor_cd = c.vendor_cd
                    and e.cd_group = 'DIFF_PO_TYPE'
                    and e.cd_code = a.diff_po_type
                    and a.diff_po_type in ('1', '2', '4')
                    and f.matl_cd = c.matl_cd
                    and a.matl_seq = f.matl_seq
                order by
                    a.po_seq,
                    a.order_cd,
                    c.matl_name
            `;
            var tMrp2 = await prisma.$queryRaw(Prisma.raw(sqlMrp2));

            var tRet0 = await prisma.$queryRaw(
                Prisma.raw(
                    `
                        SELECT distinct
                            isnull(seq_comment, '') as seq_comment
                        from
                            ksv_po_mrp
                        where
                            po_cd = '${args.data.PO_CD}'
                            ${sqlPoSeq2}
                            and po_seq = '${args.data.PO_SEQ} '
                    `,
                ),
            );

            var tRetSeqObj = {};
            tRetSeqObj.SEQ_COMMENT = '';
            let seqComment = '';
            if (tRet0.length > 0) {
                tRetSeqObj.SEQ_COMMENT = tRet0[0].seq_comment;
                seqComment = tRet0[0].seq_comment;
            }

            let sqlSeq = `
                SELECT
                    a.buyer,
                    a.sales,
                    a.matl,
                    a.mrp,
                    a.mrp2,
                    a.etc,
                    a.cad,
                    b.cd_name as seq_reason_n,
                    a.seq_reason
                from
                    ksv_po_reason a,
                    kcd_code b
                where
                    po_cd = '${args.data.PO_CD}'
                    ${sqlPoSeq2}
                    and b.cd_group = 'seq_reason'
                    and b.cd_code = a.seq_reason
            `;
            var tRet1 = await prisma.$queryRaw(Prisma.raw(sqlSeq));
            let tRetObj = {};
            tRetObj.CHK_BUYER = '0';
            tRetObj.CHK_SALES = '0';
            tRetObj.CHK_MATL = '0';
            tRetObj.CHK_MRP = '0';
            tRetObj.CHK_MRP2 = '0';
            tRetObj.CHK_ETC = '0';
            tRetObj.CHK_CAD = '0';
            tRetObj.SEQ_REASON = '';
            tRetObj.SEQ_COMMENT = seqComment;

            if (tRet1.length > 0) {
                var tOne = {
                    ...tRet1[0],
                };
                tRetObj.CHK_BUYER = tOne.buyer;
                tRetObj.CHK_SALES = tOne.sales;
                tRetObj.CHK_MATL = tOne.matl;
                tRetObj.CHK_MRP = tOne.mrp;
                tRetObj.CHK_MRP2 = tOne.mrp2;
                tRetObj.CHK_ETC = tOne.etc;
                tRetObj.CHK_CAD = tOne.cad;
                tRetObj.SEQ_REASON = tOne.seq_reason_n;
            }
            var tArray = [];
            tArray.push(tRetObj);
            let tSeqComment = tArray;

            var tWExcelFile = '';
            var poSeqStr = 'All';
            if (args.data.PO_SEQ)  poSeqStr = args.data.PO_SEQ;
            if (args.data.PO_SEQ) {
                tWExcelFile = `PO_LIST-${args.data.PO_CD}(${poSeqStr})-${tUserInfo.USER_ID}-${tRetDate1}`;
            } else {
                tWExcelFile = `PO_LIST-${args.data.PO_CD}(All})-${tUserInfo.USER_ID}-${tRetDate1}`;
                /*
                var tRetArray = [];
                var tObj = {};
                tObj.id = 1;
                tObj.CODE = `ERROR:po seq을 선택하세요`;
                tRetArray.push(tObj);
                return tRetArray;
                */
            }

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
                var tTemplateExcel = `${tPath0}/PO_LIST.xlsx`;

                const wb = new Excel.Workbook();
                await wb.xlsx.readFile(tTemplateExcel);

                var tSheetName = `list`;
                var sheet = wb.getWorksheet(tSheetName);

                sheet.getCell(1, 1).value = '발주내역';
                sheet.getCell(2, 1).value =
                    `${args.data.PO_CD}(${args.data.PO_SEQ})`;
                sheet.getCell(2, 16).value = moment(
                    tRetDate1,
                    'YYYYMMDD',
                ).format('YYYY-MM-DD');

                sheet.getCell(3, 1).value = 'Order No';
                sheet.getCell(3, 2).value = 'Style';
                sheet.getCell(3, 3).value = 'Qty';
                //sheet.getCell(3, 4).value = 'Due Date';
                //sheet.getCell(3, 5).value = 'Order Rate';

                /*
                var tOrder = { ...tOrders[0] };
                tOrder.USE_SIZE.forEach((col, i) => {
                    sheet.getCell(3, 6+i).value = col.SIZE_NAME;
                });
                */
                var nRowIdx = 4;
                let LAST_COL = 16; // A~P

                tOrders.forEach((col, i) => {
                    sheet.getCell(nRowIdx, 1).value = col.ORDER_CD;
                    sheet.getCell(nRowIdx, 2).value = col.STYLE_NAME;
                    sheet.getCell(nRowIdx, 3).value = Number(col.TOT_CNT);
                    //sheet.getCell(nRowIdx, 4).value = col.DUE_DATE;
                    //sheet.getCell(nRowIdx, 5).value = col.ORDER_RATE;
                    //col.USE_SIZE.forEach((col, i) => {
                    //sheet.getCell(nRowIdx, 6+i).value = col.SIZE_CNT;
                    //});

                    for (let c = 1; c <= LAST_COL; c++) {
                        const cell = sheet.getCell(nRowIdx, c);
                        cell.border = border;
                    }
                    nRowIdx += 1;
                });

                // Sheet변경
                tSheetName = `변경내역`;
                sheet = wb.getWorksheet(tSheetName);

                let nRowIdx = 2;
                sheet.getCell(nRowIdx, 1).value = `Seq Comment : ${seqComment}`;
                nRowIdx += 1;
                nRowIdx += 1;
                sheet.getCell(nRowIdx, 1).value = 'Add';
                nRowIdx += 1;
                sheet.getCell(nRowIdx, 1).value = 'Seq';
                sheet.getCell(nRowIdx, 2).value = 'Order No';
                sheet.getCell(nRowIdx, 3).value = 'Code';
                sheet.getCell(nRowIdx, 4).value = 'Material Desc';
                sheet.getCell(nRowIdx, 5).value = 'Color';
                sheet.getCell(nRowIdx, 6).value = 'Spec';
                sheet.getCell(nRowIdx, 7).value = 'Unit';
                sheet.getCell(nRowIdx, 8).value = 'Status';
                sheet.getCell(nRowIdx, 9).value = 'Mrp Qty';
                sheet.getCell(nRowIdx, 10).value = 'Ord Qty';
                sheet.getCell(nRowIdx, 11).value = 'Change Qty';
                sheet.getCell(nRowIdx, 12).value = 'Change';
                sheet.getCell(nRowIdx, 13).value = 'Price';
                sheet.getCell(nRowIdx, 14).value = 'Curr';
                sheet.getCell(nRowIdx, 15).value = 'Amt';
                sheet.getCell(nRowIdx, 16).value = 'Vendor';

                LAST_COL = 16;
                let fillYellow = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: {
                        argb: 'FFFFFFCC',
                    },
                };
                for (let c = 1; c <= LAST_COL; c++) {
                    const cell = sheet.getCell(nRowIdx, c);
                    cell.border = border;
                    cell.fill = fillYellow;
                    cell.alignment = headAlign;
                }

                sheet.mergeCells(1, 1, 1, 16);
                sheet.getCell(1, 1).alignment = {
                    horizontal: 'center',
                    vertical: 'middle',
                };

                nRowIdx += 1;

                tMrp1.forEach((col, i) => {
                    sheet.getCell(nRowIdx, 1).value = col.po_seq;
                    sheet.getCell(nRowIdx, 2).value = col.order_cd;
                    sheet.getCell(nRowIdx, 3).value = col.matl_cd;
                    sheet.getCell(nRowIdx, 4).value = col.matl_name;
                    sheet.getCell(nRowIdx, 5).value = col.color;
                    sheet.getCell(nRowIdx, 6).value = col.spec;
                    sheet.getCell(nRowIdx, 7).value = col.unit;
                    sheet.getCell(nRowIdx, 8).value = col.use_po_type_n;
                    sheet.getCell(nRowIdx, 9).value = col.use_qty;
                    sheet.getCell(nRowIdx, 10).value = col.po_qty;
                    sheet.getCell(nRowIdx, 11).value = col.diff_qty;
                    sheet.getCell(nRowIdx, 12).value = col.diff_po_type_n;
                    sheet.getCell(nRowIdx, 13).value = col.matl_price;
                    sheet.getCell(nRowIdx, 14).value = col.curr_cd;
                    sheet.getCell(nRowIdx, 15).value = col.po_amt;
                    sheet.getCell(nRowIdx, 16).value = col.vendor_name;

                    for (let c = 1; c <= LAST_COL; c++) {
                        const cell = sheet.getCell(nRowIdx, c);
                        cell.border = border;
                    }
                    nRowIdx += 1;
                });
                nRowIdx += 1;
                sheet.getCell(nRowIdx, 1).value = 'Cancel';
                nRowIdx += 1;
                sheet.getCell(nRowIdx, 1).value = 'Seq';
                sheet.getCell(nRowIdx, 2).value = 'Order No';
                sheet.getCell(nRowIdx, 3).value = 'Code';
                sheet.getCell(nRowIdx, 4).value = 'Material Desc';
                sheet.getCell(nRowIdx, 5).value = 'Color';
                sheet.getCell(nRowIdx, 6).value = 'Spec';
                sheet.getCell(nRowIdx, 7).value = 'Unit';
                sheet.getCell(nRowIdx, 8).value = 'Status';
                sheet.getCell(nRowIdx, 9).value = 'Mrp Qty';
                sheet.getCell(nRowIdx, 10).value = 'Ord Qty';
                sheet.getCell(nRowIdx, 11).value = 'Change Qty';
                sheet.getCell(nRowIdx, 12).value = 'Change';
                sheet.getCell(nRowIdx, 13).value = 'Price';
                sheet.getCell(nRowIdx, 14).value = 'Curr';
                sheet.getCell(nRowIdx, 15).value = 'Amt';
                sheet.getCell(nRowIdx, 16).value = 'Vendor';

                for (let c = 1; c <= LAST_COL; c++) {
                    const cell = sheet.getCell(nRowIdx, c);
                    cell.border = border;
                    cell.fill = fillYellow;
                    cell.alignment = headAlign;
                }

                nRowIdx += 1;

                tMrp2.forEach((col, i) => {
                    sheet.getCell(nRowIdx, 1).value = col.po_seq;
                    sheet.getCell(nRowIdx, 2).value = col.order_cd;
                    sheet.getCell(nRowIdx, 3).value = col.matl_cd;
                    sheet.getCell(nRowIdx, 4).value = col.matl_name;
                    sheet.getCell(nRowIdx, 5).value = col.color;
                    sheet.getCell(nRowIdx, 6).value = col.spec;
                    sheet.getCell(nRowIdx, 7).value = col.unit;
                    sheet.getCell(nRowIdx, 8).value = '';
                    sheet.getCell(nRowIdx, 9).value = '';
                    sheet.getCell(nRowIdx, 10).value = col.po_qty;
                    sheet.getCell(nRowIdx, 11).value = col.diff_qty;
                    sheet.getCell(nRowIdx, 12).value = col.diff_po_type_n;
                    sheet.getCell(nRowIdx, 13).value = col.matl_price;
                    sheet.getCell(nRowIdx, 14).value = col.curr_cd;
                    sheet.getCell(nRowIdx, 15).value = col.po_amt;
                    sheet.getCell(nRowIdx, 16).value = col.vendor_name;

                    for (let c = 1; c <= LAST_COL; c++) {
                        const cell = sheet.getCell(nRowIdx, c);
                        cell.border = border;
                    }
                    nRowIdx += 1;
                });

                nRowIdx += 1;
                nRowIdx += 1;
                sheet.getCell(nRowIdx, 1).value = 'PO NO';
                sheet.getCell(nRowIdx, 2).value = 'SEQ';
                sheet.getCell(nRowIdx, 3).value = 'REVISED REASON';
                sheet.getCell(nRowIdx, 4).value = 'No. for Reason';
                sheet.getCell(nRowIdx, 5).value =
                    'FROM - responsibility , Trach nhiem';
                sheet.getCell(nRowIdx, 12).value = 'FREIGHT CHARGE';
                sheet.getCell(nRowIdx, 14).value = 'Remark';
                sheet.getCell(nRowIdx, 15).value = 'Related supplier';
                for (let c = 1; c <= LAST_COL; c++) {
                    const cell = sheet.getCell(nRowIdx, c);
                    cell.border = border;
                    cell.fill = fillYellow;
                }

                nRowIdx += 1;
                sheet.getCell(nRowIdx, 5).value = 'SALES';
                sheet.getCell(nRowIdx, 6).value = 'BUYER';
                sheet.getCell(nRowIdx, 7).value = 'CAD';
                sheet.getCell(nRowIdx, 8).value = 'MRP';
                sheet.getCell(nRowIdx, 9).value = 'MRP2';
                sheet.getCell(nRowIdx, 10).value = 'MATL';
                sheet.getCell(nRowIdx, 11).value = 'Etc';
                sheet.getCell(nRowIdx, 12).value = 'SEA';
                sheet.getCell(nRowIdx, 13).value = 'AIR/EXPRESS(Need approval)';

                for (let c = 1; c <= LAST_COL; c++) {
                    const cell = sheet.getCell(nRowIdx, c);
                    cell.border = border;
                    cell.fill = fillYellow;
                }

                sheet.mergeCells(`A${nRowIdx - 1}`, `A${nRowIdx}`);
                sheet.mergeCells(`B${nRowIdx - 1}`, `B${nRowIdx}`);
                sheet.mergeCells(`C${nRowIdx - 1}`, `C${nRowIdx}`);
                sheet.mergeCells(`D${nRowIdx - 1}`, `D${nRowIdx}`);
                sheet.mergeCells(`E${nRowIdx - 1}`, `K${nRowIdx - 1}`);
                sheet.mergeCells(`L${nRowIdx - 1}`, `M${nRowIdx - 1}`);
                sheet.mergeCells(`N${nRowIdx - 1}`, `N${nRowIdx}`);
                sheet.mergeCells(`O${nRowIdx - 1}`, `P${nRowIdx}`);

                for (let c = 1; c <= LAST_COL; c++) {
                    sheet.getCell(nRowIdx - 1, c).alignment = headAlign;
                    sheet.getCell(nRowIdx, c).alignment = headAlign;
                }

                nRowIdx += 1;
                sheet.getCell(nRowIdx, 1).value = args.data.PO_CD;
                sheet.getCell(nRowIdx, 2).value = args.data.PO_SEQ;
                tSeqComment.forEach((col, i) => {
                    sheet.getCell(2, 3).value = col.SEQ_COMMENT;
                    sheet.getCell(nRowIdx, 3).value = col.SEQ_COMMENT;
                    sheet.getCell(nRowIdx, 4).value = col.SEQ_REASON;
                    sheet.getCell(nRowIdx, 14).value = '';

                    sheet.getCell(nRowIdx, 5).value = col.CHK_SALES;
                    sheet.getCell(nRowIdx, 6).value = col.CHK_BUYER;
                    sheet.getCell(nRowIdx, 7).value = col.CHK_CAD;
                    sheet.getCell(nRowIdx, 8).value = col.CHK_MRP;
                    sheet.getCell(nRowIdx, 9).value = col.CHK_MRP2;
                    sheet.getCell(nRowIdx, 10).value = col.CHK_MATL;
                    sheet.getCell(nRowIdx, 11).value = col.CHK_ETC;
                    sheet.getCell(nRowIdx, 12).value = '';
                    sheet.getCell(nRowIdx, 13).value = '';
                });

                for (let c = 1; c <= LAST_COL; c++) {
                    const cell = sheet.getCell(nRowIdx, c);
                    cell.border = border;
                }

                var sql1 = `
                    select distinct
                        a.po_seq,
                        e.vendor_name
                    from
                        ksv_po_mrp a,
                        kcd_matl_mst b,
                        kcd_vendor e
                    where
                        a.po_cd = '${args.data.PO_CD}'
                        ${sqlPoSeq1}
                        and b.matl_cd = a.matl_cd
                        and b.vendor_cd = e.vendor_cd
                        and a.seq_comment is not null
                `;
                var vendorInfo = await prisma.$queryRaw(Prisma.raw(sql1));

                let vendorNames = vendorInfo
                    .map((col) => col.vendor_name)
                    .join(' ');
                sheet.getCell(nRowIdx, 15).value = vendorNames;
                sheet.mergeCells(`O${nRowIdx}`, `P${nRowIdx}`);

                const uploadInfo = await generateUploadURL();
                const uploadURL = uploadInfo.uploadURL;
                let url = uploadURL.split('?')[0];

                var strSeq = 'All';
                if (args.data.PO_SEQ) strSeq = args.data.PO_SEQ;
                

                await prisma.$queryRaw(
                    Prisma.raw(
                        `
                            delete FROM KCD_FILEINFO
                            where
                                1 = 1
                                and name like 'PO_LIST%'
                                and title like 'PO_LIST%'
                                and file_key = '${args.data.PO_CD}_${strSeq}'
                        `,
                    ),
                );

                await prisma.$queryRaw(
                    Prisma.raw(
                        AFLib.createTableSql('KCD_FILEINFO', {
                            NAME: tWExcelFile,
                            URL: url,
                            TITLE: tWExcelFile,
                            FILE_KEY: `${args.data.PO_CD}_${strSeq}`,
                            KIND: 'PO_LIST',
                        }),
                    ),
                );

                return await upload(`${tWExcelFile}.xlsx`, wb, uploadURL);
            } catch (error) {
                return [
                    {
                        id: 1,
                        CODE: `ERROR:${error.message}`,
                    },
                ];
            }
        },

        mgrQueryS030515_QRY_SEQ_COMMENT: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tUserInfo = AFLib.getUserInfo(contextValue);

            let sql0 = `
                SELECT distinct
                    isnull(seq_comment, '') as seq_comment
                from
                    ksv_po_mrp
                where
                    po_cd = '${args.data.PO_CD}'
                    and po_seq = '${args.data.PO_SEQ} '
            `;
            var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));

            var tRetObj = {};
            tRetObj.SEQ_COMMENT = '';
            if (tRet0.length > 0) tRetObj.SEQ_COMMENT = tRet0[0].seq_comment;

            let sql1 = `
                SELECT
                    a.buyer,
                    a.sales,
                    a.matl,
                    a.mrp,
                    a.mrp2,
                    a.etc,
                    a.cad,
                    b.cd_name as sql_reason_n,
                    a.seq_reason
                from
                    ksv_po_reason a,
                    kcd_code b
                where
                    po_cd = '${args.data.PO_CD}'
                    and po_seq = '${args.data.PO_SEQ}'
                    and b.cd_group = 'seq_reason'
                    and b.cd_code = a.seq_reason
            `;
            var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
            tRetObj.CHK_BUYER = '0';
            tRetObj.CHK_SALES = '0';
            tRetObj.CHK_MATL = '0';
            tRetObj.CHK_MRP = '0';
            tRetObj.CHK_MRP2 = '0';
            tRetObj.CHK_ETC = '0';
            tRetObj.CHK_CAD = '0';
            tRetObj.SEQ_REASON = '';
            if (tRet1.length > 0) {
                var tOne = {
                    ...tRet1[0],
                };
                tRetObj.CHK_BUYER = tOne.buyer;
                tRetObj.CHK_SALES = tOne.sales;
                tRetObj.CHK_MATL = tOne.matl;
                tRetObj.CHK_MRP = tOne.mrp;
                tRetObj.CHK_MRP2 = tOne.mrp2;
                tRetObj.CHK_ETC = tOne.etc;
                tRetObj.CHK_CAD = tOne.cad;
                tRetObj.SEQ_REASON = tOne.seq_reason;
            }
            var tArray = [];
            tArray.push(tRetObj);

            // Mongo
            const client = new MongoClient(
                'mongodb://test:test1234@localhost:27017',
            );
            var mongo_db = '';
            try {
                await client.connect();
                mongo_db = client.db('afroba');
            } catch (error) {
                var tRetArray = [];
                return tRetArray;
            }

            var tTabName = `S030515_QRY_SEQ_COMMENT_${tUserInfo.USER_ID}`;
            var tSrcData = [];

            const exists =
                (await (
                    await mongo_db.listCollections().toArray()
                ).findIndex((item) => item.name === tTabName)) !== -1;

            if (exists) {
                await mongo_db.collection(tTabName).drop();
            }

            if (tArray <= 0) {
                return tArray;
            }
            await mongo_db.collection(tTabName).insertMany(tArray);

            return tArray;
        },

        mgrQueryS030515_QRY_PO_MRP2: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tUserInfo = AFLib.getUserInfo(contextValue);

            let sql_order_1 = '';
            if (args.data.PO_SEQ !== '') {
                sql_order_1 = `          and a.po_seq = '${args.data.PO_SEQ}'  `;
            }
            let sql_order = `
                select
                    a.po_seq,
                    a.order_cd,
                    a.matl_cd,
                    c.matl_name,
                    c.color,
                    c.spec,
                    c.unit,
                    a.org_po_seq,
                    a.po_qty,
                    a.diff_qty,
                    e.cd_name as diff_po_type_n,
                    a.remark,
                    f.matl_price,
                    f.curr_cd,
                    (a.diff_qty * f.matl_price) as po_amt,
                    d.vendor_name,
                    a.mrp_seq,
                    seq_comment
                from
                    ksv_po_mrp a,
                    kcd_matl_mst c,
                    kcd_vendor d,
                    kcd_code e,
                    kcd_matl_mem f
                where
                    a.po_cd = '${args.data.PO_CD}' ${sql_order_1}
                    and c.matl_cd = a.matl_cd
                    and d.vendor_cd = c.vendor_cd
                    and e.cd_group = 'DIFF_PO_TYPE'
                    and e.cd_code = a.diff_po_type
                    and a.diff_po_type in ('1', '2', '4')
                    and f.matl_cd = c.matl_cd
                    and a.matl_seq = f.matl_seq
                order by
                    a.po_seq,
                    a.order_cd,
                    c.matl_name
            `;
            var tRet_order = await prisma.$queryRaw(Prisma.raw(sql_order));

            // Mongo
            const client = new MongoClient(
                'mongodb://test:test1234@localhost:27017',
            );
            var mongo_db = '';
            try {
                await client.connect();
                mongo_db = client.db('afroba');
            } catch (error) {
                var tRetArray = [];
                var tObj = {};
                tObj.id = 1;
                tObj.CODE = `ERROR:Mongo DB Connection Error`;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tTabName = `S030515_QRY_MRP2_${tUserInfo.USER_ID}`;
            var tSrcData = [];

            const exists =
                (await (
                    await mongo_db.listCollections().toArray()
                ).findIndex((item) => item.name === tTabName)) !== -1;

            if (exists) {
                await mongo_db.collection(tTabName).drop();
            }

            if (tRet_order.length <= 0) {
                return tRet_order;
            }
            await mongo_db.collection(tTabName).insertMany(tRet_order);

            return tRet_order;
        },

        mgrQueryS030515_QRY_PO_MRP1: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tUserInfo = AFLib.getUserInfo(contextValue);

            let sql_order_1 = '';
            if (args.data.PO_SEQ !== '') {
                sql_order_1 = `          and a.po_seq = '${args.data.PO_SEQ}'  `;
            }

            let sql_order = `
                select
                    a.po_seq,
                    a.order_cd,
                    a.matl_cd,
                    c.matl_name,
                    c.color,
                    c.spec,
                    c.unit,
                    b.cd_name as use_po_type_n,
                    a.use_qty,
                    a.po_qty,
                    a.diff_qty,
                    e.cd_name as diff_po_type_n,
                    a.matl_price,
                    a.curr_cd,
                    (a.matl_price * a.po_qty) as po_amt,
                    d.vendor_name,
                    a.mrp_seq,
                    a.matl_seq,
                    a.reg_datetime
                from
                    ksv_po_mrp a,
                    kcd_matl_mst c,
                    kcd_code b,
                    kcd_vendor d,
                    kcd_code e
                where
                    a.po_cd = '${args.data.PO_CD}' ${sql_order_1}
                    and a.diff_po_type not in ('1', '2', '4')
                    and c.matl_cd = a.matl_cd
                    and d.vendor_cd = c.vendor_cd
                    and b.cd_group = 'USE_PO_TYPE'
                    and b.cd_code = a.use_po_type
                    and e.cd_group = 'DIFF_PO_TYPE'
                    and e.cd_code = a.diff_po_type
                order by
                    1,
                    2,
                    4
            `;
            var tRet_order = await prisma.$queryRaw(Prisma.raw(sql_order));

            //
            const client = new MongoClient(
                'mongodb://test:test1234@localhost:27017',
            );
            var mongo_db = '';
            try {
                await client.connect();
                mongo_db = client.db('afroba');
            } catch (error) {
                var tRetArray = [];
                var tObj = {};
                tObj.id = 1;
                tObj.CODE = `ERROR:Mongo DB Connection Error`;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tTabName = `S030515_QRY_MRP1_${tUserInfo.USER_ID}`;
            var tSrcData = [];

            const exists =
                (await (
                    await mongo_db.listCollections().toArray()
                ).findIndex((item) => item.name === tTabName)) !== -1;
            if (exists) {
                await mongo_db.collection(tTabName).drop();
            }

            if (tRet_order.length <= 0) return tRet_order;

            await mongo_db.collection(tTabName).insertMany(tRet_order);

            return tRet_order;
        },
        mgrQueryS030515_QRY_ORDER: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tUserInfo = AFLib.getUserInfo(contextValue);
            var tSQL = '';

            var tFileKey = `${args.data.PO_CD}`;
            tSQL = `and file_key like '%${tFileKey}%' `;
            var tPoSeq = '';
            if (args.data.PO_SEQ !== '') {
                tPoSeq = args.data.PO_SEQ;
                tFileKey = `${args.data.PO_CD}_${tPoSeq}`;
                tSQL = `and file_key = '${tFileKey}' `;
            }

            let sql0 = `
                select
                    *
                from
                    kcd_fileinfo
                where
                    ((
                        title like 'MATL_LIST_NET_QTY%'
                        or title like 'PO_ADDPO%'
                        or title like 'PO_LIST%'
                    ) ${tSQL})  
                 or (
                        title like 'MRPLIST%' and file_key like '%${args.data.PO_CD}%'
                    )
                order by
                    file_key
            `;
            var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            var tArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet0.length; tIdx++) {
                var tOne = {
                    ...tRet0[tIdx],
                };
                var tCols = tOne.FILE_KEY.split('_');
                var tPoCd = tCols[0];
                var tPoSeq = tCols[1];
                var tObj = {};
                if (tOne.TITLE.includes('PO_LIST')) {
                    tObj.KIND = '발주내역';
                    tObj.TITLE = tOne.TITLE;
                    tObj.FILE_NAME = tOne.NAME;
                    tObj.FILE_URL = tOne.URL;
                    tObj.PO_CD = tPoCd;
                    tObj.PO_SEQ = tPoSeq;
                }
                if (tOne.TITLE.includes('PO_ADDPO')) {
                    tObj.KIND = '추가발주';
                    tObj.TITLE = tOne.TITLE;
                    tObj.FILE_NAME = tOne.NAME;
                    tObj.FILE_URL = tOne.URL;
                    tObj.PO_CD = tPoCd;
                    tObj.PO_SEQ = tPoSeq;
                }
                if (tOne.TITLE.includes('MATL_LIST_NET_QTY')) {
                    tObj.KIND = 'MRP PACK';
                    tObj.TITLE = tOne.TITLE;
                    tObj.FILE_NAME = tOne.NAME;
                    tObj.FILE_URL = tOne.URL;
                    tObj.PO_CD = tPoCd;
                    tObj.PO_SEQ = tPoSeq;
                }
                if (tOne.TITLE.includes('MRPLIST_')) {
                    tObj.KIND = 'MRP List';
                    tObj.TITLE = tOne.TITLE;
                    tObj.FILE_NAME = tOne.NAME;
                    tObj.FILE_URL = tOne.URL;
                    tObj.PO_CD = tPoCd;
                    tObj.PO_SEQ = tPoSeq;
                }
                tArray.push(tObj);
            }
            return tArray;
        },

        mgrQueryS030515_UPDATE_QRY_ORDER: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tUserInfo = AFLib.getUserInfo(contextValue);
            console.log(tUserInfo);

            let sql1 = `
                select
                    *
                from
                    kcd_user
                where
                    user_id = '${tUserInfo.USER_ID}'
            `;
            var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
            var tPart = '';
            if (tRet1.length > 0) tPart = tRet1[0].PART;

            var tArray = [];

            var tSQL = '';
            if (tPart === 'VMRP')
                tSQL = ` factory_flag = '${tUserInfo.USER_ID}' `;
            else if (tPart === 'VT')
                tSQL = ` import_flag = '${tUserInfo.USER_ID}' `;
            else if (tPart === 'VS')
                tSQL = ` domestic_flag = '${tUserInfo.USER_ID}' `;
            else {
                return tArray;
            }

            var tPoSeq = '1';
            if (args.data.PO_SEQ !== '') tPoSeq = args.data.PO_SEQ;

            let sql0 = `
                update ksv_po_mst
                set
                    ${tSQL}
                where
                    po_cd = '${args.data.PO_CD}'
                    and po_seq = '${args.data.PO_SEQ}'
            `;
            var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            return tArray;
        },

        mgrQueryS030515_QRY_ORDER_COMBINED: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tPoSeq = '1';
            if (args.data.PO_SEQ !== '') tPoSeq = args.data.PO_SEQ;

            let sql0 = `
                select
                    '' as PO_CD,
                    b.ORDER_CD,
                    c.STYLE_NAME,
                    d.BUYER_NAME,
                    b.DUE_DATE,
                    b.TOT_CNT,
                    '' as PO_SEQ,
                    b.ORDER_STATUS,
                    '' as MRP_LIST_FILE,
                    '' as MRP_LIST_FILE_URL,
                    '' as MRP_LIST2_FILE,
                    '' as MRP_LIST2_FILE_URL
                from
                    ksv_order_mst b,
                    kcd_style c,
                    kcd_buyer d
                where
                    b.order_cd like '${args.data.ORDER_CD}-%'
                    and b.order_type = '2'
                    and c.style_cd = b.style_cd
                    and d.buyer_cd = left(b.order_cd, 2)
                order by
                    1,
                    2
            `;
            var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            var tArray = [];
            var tIdx = 0;
            var last_po_seq = 1;
            for (tIdx = 0; tIdx < tRet0.length; tIdx++) {
                var tOne = {
                    ...tRet0[tIdx],
                };

                let sql1 = `
                    select
                        max(po_seq) as max_seq
                    from
                        ksv_po_mst
                    where
                        po_cd = '${args.data.PO_CD}'
                        and po_seq < 98
                `;
                var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                last_po_seq = tRet1[0].max_seq;

                var tTitle = '';
                tTitle = `MRPLIST3_${args.data.PO_CD}_ALL_${last_po_seq}_${tOne.ORDER_CD}`;

                let sql2 = `
                    select
                        name,
                        url
                    from
                        kcd_fileinfo
                    where
                        title = '${tTitle}'
                        and file_key = 'S030515'
                `;
                var tRet2 = await prisma.$queryRaw(Prisma.raw(sql2));

                if (tRet2.length <= 0) tArray.push(tOne);
                else {
                    if (tRet2.length > 0) {
                        tOne.MRP_LIST_FILE = tRet2[0].name;
                        tOne.MRP_LIST_FILE_URL = tRet2[0].url;
                    }
                    tArray.push(tOne);
                }
            }
            return tArray;
        },

        mgrQueryS030515_2: async (_, args) => {
            /*
            DIFF_PO_TYPE: 
            0                    Order                                                                                               
            1                    Left over                                                                                           
            2                    Cancel                                                                                              
            3                    ADD                                                                                                 
            4                    Part Cancel                                                                                         
            5                    Cancel StockUse                                                     
            */
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }
            let sqlStr = `
                select
                    a.PO_SEQ,
                    a.ORDER_CD,
                    a.MATL_CD,
                    c.MATL_NAME,
                    c.COLOR,
                    c.SPEC,
                    c.UNIT,
                    a.ORG_PO_SEQ,
                    a.PO_QTY,
                    a.DIFF_QTY,
                    e.cd_name as DIFF_PO_TYPE_NAME,
                    a.REMARK,
                    f.MATL_PRICE,
                    f.CURR_CD,
                    (a.diff_qty * f.matl_price) as MATL_AMT,
                    d.VENDOR_NAME,
                    a.MRP_SEQ,
                    a.SEQ_COMMENT
                from
                    ksv_po_mrp a,
                    kcd_matl_mst c,
                    kcd_vendor d,
                    kcd_code e,
                    kcd_matl_mem f
                where
                    a.po_cd = '${args.data.PO_CD}'
                    and c.matl_cd = a.matl_cd
                    and d.vendor_cd = c.vendor_cd
                    -- and a.diff_po_type not in ('1','2','4') 
                    and f.matl_cd = c.matl_cd
                    and a.matl_seq = f.matl_seq
                    and e.cd_group = 'DIFF_PO_TYPE'
                    and e.cd_code = a.diff_po_type
                order by
                    a.po_seq,
                    a.order_cd,
                    c.matl_name
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                PO_SEQ: 0,
                ORDER_CD: '',
                MATL_CD: '',
                MATL_NAME: '',
                COLOR: '',
                SPEC: '',
                UNIT: '',
                ORG_PO_SEQ: 0,
                PO_QTY: 0,
                DIFF_QTY: 0,
                DIFF_PO_TYPE_NAME: '',
                REMARK: '',
                MATL_PRICE: 0,
                CURR_CD: '',
                MATL_AMT: 0,
                VENDOR_NAME: '',
                MRP_SEQ: 0,
                SEQ_COMMENT: '',
                ETC99: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },

        mgrQueryS030515_REPORT_MRP_LIST: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            try {
                await S030514_QRY_COMM.Query.mgrQueryS030514_REPORT_MATL_LIST_NET_QTY(
                    _,
                    {
                        data: {
                            BUYER_CD: '',
                            FACTORY_CD: '',
                            IS_PRICE: '0',
                            OP_KIND: '0',
                            ORDER_KIND: '',
                            PO_CD: args.data.PO_CD,
                            PO_SEQ: args.data.PO_SEQ,
                        },
                    },
                    contextValue,
                );
            } catch (e) {
                var tObj = {};
                tObj.id = 0;
                tObj.CODE = 'ERROR:처리중 오류가 발생했습니다';
                var tArray = [];
                tArray.push(tObj);
                return tArray;
            }

            var tObj = {};
            tObj.id = 0;
            tObj.CODE =
                'SUCCESS:MRP List을 요청했습니다. 완료되면 다운로드 하십시요';
            var tArray = [];
            tArray.push(tObj);
            return tArray;
        },

        mgrQueryS030515_REPORT_MRP_LIST2: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            try {
                var tRetArray = [];
                var tIdx0 = 0;
                for (tIdx0 = 0; tIdx0 < args.data.ORDER_CDS.length; tIdx0++) {
                    var tOrderCd = args.data.ORDER_CDS[tIdx0];
                    tRetArray = await S030515_QRY_COMM.REPORT_MRP_LIST2(
                        args,
                        contextValue,
                        tOrderCd,
                    );
                    if (tRetArray[0].CODE.includes('SUCC')) continue;
                    else {
                    }
                }
            } catch (e) {
                var tObj = {};
                tObj.id = 0;
                tObj.CODE = 'ERROR:처리중 오류가 발생했습니다';
                var tArray = [];
                tArray.push(tObj);
                return tArray;
            }

            var tObj = {};
            tObj.id = 0;
            tObj.CODE = 'ERROR:MRP List가 성공했습니다';
            var tArray = [];
            tArray.push(tObj);
            return tArray;
        },

        mgrQueryS030515_REPORT_MRP_LIST3: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            try {
                var tRetArray = [];
                var tIdx0 = 0;
                for (tIdx0 = 0; tIdx0 < args.data.ORDER_CDS.length; tIdx0++) {
                    var tOrderCd = args.data.ORDER_CDS[tIdx0];
                    tRetArray = await S030515_QRY_COMM.REPORT_MRP_LIST3(
                        args,
                        contextValue,
                        tOrderCd,
                    );
                    if (tRetArray[0].CODE.includes('SUCC')) continue;
                    else {
                        return tRetArray;
                    }
                }
            } catch (e) {
                var tObj = {};
                tObj.id = 0;
                tObj.CODE = `ERROR:처리중 오류가 발생했습니다:${e.message}`;
                var tArray = [];
                tArray.push(tObj);
                return tArray;
            }

            var tObj = {};
            tObj.id = 0;
            tObj.CODE = 'SUCCESS:MRP List가 성공했습니다';
            var tArray = [];
            tArray.push(tObj);
            return tArray;
        },

        mgrQueryS030515_PROCESS_MAIL: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);
            const kcdUserInfo = await AFLib.getKcdUserInfo(contextValue);

            var tInput = {
                ...args.data,
            };
            var tInput2 = [...args.data1];

            const buyerTeamInfo = await mssql.mssqlExec(
                `
                    SELECT
                        a.*,
                        b.user_name AS USER_NAME,
                        b.email AS EMAIL
                    from
                        KCD_BUYER_TEAM_INFO a,
                        KCD_USER b
                    where
                        1 = 1
                        and a.user_id = b.USER_ID
                        and a.buyer_cd = (
                            select
                                top 1 left(ORDER_CD, 2)
                            from
                                ksv_po_mem
                            where
                                po_cd = '${tInput.PO_CD}'
                                and po_seq = '1'
                        )
                `,
            );

            console.log('---------------------');
            console.log(kcdUserInfo);
            const userMrpPack = {
                USER_ID: kcdUserInfo.USER_ID,
                USER_NAME: kcdUserInfo.USER_NAME,
                EMAIL: kcdUserInfo.EMAIL,
            };
            const userDomestic = buyerTeamInfo.filter(
                (item) => item.FACTORY === '서울' && item.TEAM === 'SMC',
            )[0];
            const userImport = buyerTeamInfo.filter(
                (item) => item.FACTORY === 'BVT' && item.TEAM === 'PUR',
            )[0];
            const userFactory = buyerTeamInfo.filter(
                (item) => item.FACTORY === 'BVT' && item.TEAM === 'PUR1',
            )[0];

            console.log('userMrpPack:', userMrpPack);
            console.log('userDomestic:', userDomestic);
            console.log('userImport:', userImport);
            console.log('userFactory:', userFactory);

            const targetUserList = [
                userMrpPack,
                userDomestic,
                userImport,
                userFactory,
            ];

            const formatUserInfo = (label, user) => {
                if (!user) {
                    return `${label}: USER_ID= EMAIL=`;
                }

                return `${label}: USER_ID=${user.USER_ID || ''} EMAIL=${user.EMAIL || ''}`;
            };

            const receiverMessage = [
                formatUserInfo('Domestic', userDomestic),
                formatUserInfo('Import', userImport),
                formatUserInfo('Factory', userFactory),
            ].join('<br><br>');

            try {
                for (let user of targetUserList) {
                    if (!user) continue;

                    // 적용시에는 지워야 함. 실제 사용자에게 메일 나가는 것 방지
                    //if (!user.EMAIL.includes('@autostock.co.kr')) continue;

                    var title = `MRP 변경내역 - ${tInput.PO_CD} / ${tInput.PO_SEQ || '1'}  `;
                    var body = '';
                    body += `<!DOCTYPE html>` + '\r\n';
                    body += `<html><head><title>MRP 내역</title>` + '\r\n';
                    body += `</head><body><div>` + '\r\n';
                    body +=
                        `<p>SEQ Comment : ${tInput.SEQ_COMMENT || '없음'}</p>` +
                        '\r\n';
                    body +=
                        `<p>아래 링크를 클릭해서 해당 파일을 다운로드 해주세요.</p><br>` +
                        '\r\n';
                    tInput2.forEach((col, i) => {
                        body += `<a 
                    href="https://erp.shints.com:3202/restapi/mrp_mail_confirm?userId=${user.USER_ID}&poCd=${tInput.PO_CD}&poSeq=${tInput.PO_SEQ || '1'}&fileName=${col.FILE_NAME}.xlsx&fileUrl=${col.FILE_URL}">
                    ${col.FILE_NAME} 다운로드
                    </a><br>`;
                    });
                    body += `</div></body></html>` + '\r\n';

                    const response = await axios.post(
                        'https://erp-test.shints.com:3202/restapi/send_email',
                        {
                            to: user.EMAIL,
                            subject: title,
                            html: body,
                            files: [],
                        },
                        {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        },
                    );

                    console.log('메일 전송:', response.data);
                }
            } catch (e) {
                var tObj = {};
                tObj.id = 0;
                tObj.CODE = `ERROR:Email 처리중 오류가 발생했습니다.:${e.message}`;
                var tArray = [];
                tArray.push(tObj);
                return tArray;
            }

            var tObj = {};
            tObj.id = 0;
            tObj.CODE = `SUCCESS:Email 전송이 성공했습니다.<br><br>${receiverMessage}`;
            var tArray = [];
            tArray.push(tObj);
            return tArray;
        },

        mgrQueryS030515_PROCESS_GENERATE: async (_, args, contextValue) => {
            let poCd = args.data.PO_CD;
            let poSeq = args.data.PO_SEQ;

            var sqlPoSeq = '';
            if (poSeq) {
                sqlPoSeq = `AND a.po_seq = '${poSeq}' `;
            }

            try {
                let result = await prisma.$queryRaw(
                    Prisma.raw(
                        `
                            SELECT
                                a.PO_CD,
                                a.ORDER_CD,
                                c.STYLE_NAME,
                                d.BUYER_NAME,
                                b.DUE_DATE,
                                b.TOT_CNT,
                                a.PO_SEQ,
                                b.ORDER_STATUS
                            FROM
                                ksv_po_mem a
                                JOIN ksv_order_mst b ON b.order_cd = a.order_cd
                                JOIN kcd_style c ON c.style_cd = b.style_cd
                                JOIN kcd_buyer d ON d.buyer_cd = LEFT(a.order_cd, 2)
                            WHERE
                                1 = 1
                                AND a.po_cd LIKE '%${poCd}%'
                                ${sqlPoSeq}
                            ORDER BY
                                a.PO_CD,
                                a.ORDER_CD
                        `,
                    ),
                );

                let orderCdArray = result.map((row) => row.ORDER_CD);

                console.log('orderCdArray:', orderCdArray);

                // MATL LIST
                await moduleQuery_S030515_2.Query.mgrQueryS030515_REPORT_MRP_LIST(
                    _,
                    {
                        data: {
                            PO_CD: poCd,
                            PO_SEQ: poSeq,
                            ORDER_CDS: orderCdArray,
                        },
                    },
                    contextValue,
                );

                // PO_LIST
                await moduleQuery_S030515_2.Query.mgrQueryS030515_REPORT_1(
                    _,
                    {
                        data: {
                            PO_CD: poCd,
                            PO_SEQ: poSeq,
                        },
                    },
                    contextValue,
                );

                // PO_ADDPO
                await moduleQuery_S030515_2.Query.mgrQueryS030515_REPORT_ADD_MATL_REQ(
                    _,
                    { data: { PO_CD: poCd, PO_SEQ: poSeq } },
                    contextValue,
                );
            } catch (e) {
                return [
                    {
                        id: 0,
                        CODE: `ERROR:처리중 오류가 발생했습니다:${e.message}`,
                    },
                ];
            }

            return [
                {
                    id: 0,
                    CODE: `'SUCCESS:MRP Pack 생성이 성공했습니다'`,
                },
            ];
        },
    },
};

export default moduleQuery_S030515_2;
