import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
import AFLib2 from '../../po_adjust'; //PrismaClient 사용하기 위해 불러오기
import { MrpProcedureMigration } from '../../mrpProcedureMigration';
import axios from 'axios';
const Excel = require('exceljs');
const { upload } = require('../../../routes/s3');
const { MongoClient } = require('mongodb');

const mrpMigration = new MrpProcedureMigration(prisma as any);

// export default로 Query 내용 내보내기
const moduleQuery_S030502_2 = {
    Query: {
        mgrQueryS030502_REPORT_ADD_MATL_REQ: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            // var tWExcelFile = `Partial List-${tUserInfo.USER_ID}-${tRetDate1}`;
            var tWExcelFile = '';
            if (args.data.PO_SEQ !== '') {
                tWExcelFile = `PO_ADDPO-${args.data.PO_CD}(${args.data.PO_SEQ})-${tUserInfo.USER_ID}-${tRetDate1}`;
            } else {
                var tRetArray = [];
                var tObj = {};
                tObj.id = 1;
                tObj.CODE = `ERROR:po seq을 선택하세요`;
                tRetArray.push(tObj);
                return tRetArray;
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
                        and a.po_seq = '${args.data.PO_SEQ}'
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
                    sheet.getCell(tRowIdx, 10).value = col.tot_amt;
                    tTotAmt += parseFloat(col.tot_amt);
                    sheet.getCell(tRowIdx, 11).value = col.weight;
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
                    tRowIdx += 1;
                });

                tRowIdx += 1;
                sheet.getCell(tRowIdx, 1).value = 'Total';
                sheet.getCell(tRowIdx, 10).value = tTotAmt;
                sheet.getCell(tRowIdx, 11).value = tTotWeight;

                sheet.getCell(6, 4).value =
                    `${args.data.PO_CD}($args.data.PO_SEQ)`;
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
                        and a.po_seq = '${args.data.PO_SEQ}'
                        and b.factory_cd = a.factory_cd
                    order by
                        a.po_seq
                `;
                var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                var tStrFactory = tRet1[0].factory_name;
                var tStrDelivery = tRet1[0].delivery;

                sheet.getCell(7, 11).value = tStrFactory;
                sheet.getCell(7, 19).value = tStrDelivery;
                sheet.getCell(4, 17).value =
                    `${tUserInfo.USER_NAME},${tUserInfo.USER_ID}`;

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
                        and f.po_seq = '${args.data.PO_SEQ}'
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

                sheet.getCell(6, 18).value = tRetDate1;

                //mongo
                const client = new MongoClient(
                    'mongodb://test:test1234@localhost:27017',
                );
                var mongo_db = '';
                var tSeqComment = [];
                try {
                    await client.connect();
                    mongo_db = client.db('afroba');

                    var tTabName = `S030502_QRY_SEQ_COMMENT_${tUserInfo.USER_ID}`;
                    var exists =
                        (await (
                            await mongo_db.listCollections().toArray()
                        ).findIndex((item) => item.name === tTabName)) !== -1;
                    if (exists) {
                        var cur4 = mongo_db.collection(tTabName).find();
                        for await (const doc of cur4) {
                            var tObj = { ...doc };
                            tSeqComment.push(tObj);
                        }
                    }
                } catch (error) {}

                var nRowIdx = tRowIdx + 3;
                sheet.getCell(nRowIdx, 1).value = 'PO NO';
                sheet.getCell(nRowIdx, 2).value = 'SEQ';
                sheet.getCell(nRowIdx, 3).value = 'REVISED REASON';
                sheet.getCell(nRowIdx, 4).value = 'No. for Reason';
                sheet.getCell(nRowIdx, 5).value =
                    'FROM - responsibility , Trach nhiem';
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
                    var tSeqComment2 = { ...col };
                    sheet.getCell(nRowIdx, 3).value = col.SEQ_COMMENT;
                    sheet.getCell(2, 3).value = col.SEQ_COMMENT;
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
                        and a.po_seq = '${args.data.PO_SEQ}'
                        and b.matl_cd = a.matl_cd
                        and b.vendor_cd = e.vendor_cd
                        and a.seq_comment is not null
                `;
                var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));

                var tStr0 = '';
                tRet1.forEach((col, i) => {
                    tStr0 += col.vendor_name + '  ';
                });
                sheet.getCell(nRowIdx, 15).value = tStr0;

                var tTitle = '';
                tTitle = `PO_ADDPO_${args.data.PO_CD}_${args.data.PO_SEQ}`;

                let sql12 = `
                    delete from kcd_fileinfo
                    where
                        title = '${tTitle}'
                        and kind = 'S030502'
                `;
                var tRet12 = await prisma.$queryRaw(Prisma.raw(sql12));

                const uploadInfo = await generateUploadURL();
                const uploadURL = uploadInfo.uploadURL;
                const fileURL = uploadURL.split('?')[0];

                var tInObj = {};
                tInObj.NAME = tWExcelFile;
                tInObj.URL = fileURL;
                tInObj.TITLE = tTitle;
                tInObj.KIND = 'S030502';
                tInObj.FILE_KEY = tTitle;
                var tSql11 = AFLib.createTableSql('KCD_FILEINFO', tInObj);
                var tRet11 = await prisma.$queryRaw(Prisma.raw(tSql11));

                return await upload(`${tWExcelFile}.xlsx`, wb, uploadURL);
            } catch (error) {
                var tRetArray = [];
                var tObj = {};
                tObj.id = 1;
                tObj.CODE = `ERROR:${error.message}`;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },
        mgrQueryS030502_REPORT_1: async (_, args, contextValue) => {
            // 화면에 조회된 결과를 엑셀로 출력
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

            var tPoCdStr = args.data.PO_CD.replace(/-/gi, '_');

            var tTabName = `S030502_QRY_ORDER_${tPoCdStr}_ALL_${last_po_seq}`;
            var tOrders = [];
            var exists =
                (await (
                    await mongo_db.listCollections().toArray()
                ).findIndex((item) => item.name === tTabName)) !== -1;
            if (exists) {
                var cur1 = mongo_db.collection(tTabName).find();
                for await (const doc of cur1) {
                    var tObj = { ...doc };
                    tOrders.push(tObj);
                }
            }

            tTabName = `S030502_QRY_MRP1_${tUserInfo.USER_ID}`;
            var tMrp1 = [];
            exists =
                (await (
                    await mongo_db.listCollections().toArray()
                ).findIndex((item) => item.name === tTabName)) !== -1;
            if (exists) {
                var cur2 = mongo_db.collection(tTabName).find();
                for await (const doc of cur2) {
                    var tObj = { ...doc };
                    tMrp1.push(tObj);
                }
            }

            tTabName = `S030502_QRY_MRP2_${tUserInfo.USER_ID}`;
            var tMrp2 = [];
            exists =
                (await (
                    await mongo_db.listCollections().toArray()
                ).findIndex((item) => item.name === tTabName)) !== -1;
            if (exists) {
                var cur3 = mongo_db.collection(tTabName).find();
                for await (const doc of cur3) {
                    var tObj = { ...doc };
                    tMrp2.push(tObj);
                }
            }

            tTabName = `S030502_QRY_SEQ_COMMENT_${tUserInfo.USER_ID}`;
            var tSeqComment = [];
            exists =
                (await (
                    await mongo_db.listCollections().toArray()
                ).findIndex((item) => item.name === tTabName)) !== -1;
            if (exists) {
                var cur4 = mongo_db.collection(tTabName).find();
                for await (const doc of cur4) {
                    var tObj = { ...doc };
                    tSeqComment.push(tObj);
                }
            }

            // var tWExcelFile = `Partial List-${tUserInfo.USER_ID}-${tRetDate1}`;
            var tWExcelFile = '';
            if (args.data.PO_SEQ !== '') {
                tWExcelFile = `PO_LIST-${args.data.PO_CD}(${args.data.PO_SEQ})-${tUserInfo.USER_ID}-${tRetDate1}`;
            } else {
                var tRetArray = [];
                var tObj = {};
                tObj.id = 1;
                tObj.CODE = `ERROR:po seq을 선택하세요`;
                tRetArray.push(tObj);
                return tRetArray;
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
                var tTemplateExcel = `${tPath0}/list.xlsx`;

                const wb = new Excel.Workbook();
                await wb.xlsx.readFile(tTemplateExcel);

                var tSheetName = `Sheet1`;
                var sheet = wb.getWorksheet(tSheetName);
                // const sheet = wb.getWorksheet(1);

                sheet.getCell(1, 1).value = '발주내역';

                sheet.getCell(2, 1).value =
                    `${args.data.PO_CD}(${args.data.PO_SEQ})`;
                sheet.getCell(2, 16).value = tRetDate1;

                sheet.getCell(3, 1).value = 'Order No';
                sheet.getCell(3, 2).value = 'Style';
                sheet.getCell(3, 3).value = 'Qty';
                sheet.getCell(3, 4).value = 'Due Date';
                sheet.getCell(3, 5).value = 'Order Rate';
                var tOrder = { ...tOrders[0] };
                tOrder.USE_SIZE.forEach((col, i) => {
                    sheet.getCell(3, 6 + i).value = col.SIZE_NAME;
                });

                var nRowIdx = 4;
                tOrders.forEach((col, i) => {
                    sheet.getCell(nRowIdx, 1).value = col.ORDER_CD;
                    sheet.getCell(nRowIdx, 2).value = col.STYLE_NAME;
                    sheet.getCell(nRowIdx, 3).value = col.TOT_CNT;
                    sheet.getCell(nRowIdx, 4).value = col.DUE_DATE;
                    sheet.getCell(nRowIdx, 5).value = col.ORDER_RATE;
                    col.USE_SIZE.forEach((col, i) => {
                        sheet.getCell(nRowIdx, 6 + i).value = col.SIZE_CNT;
                    });
                    nRowIdx += 1;
                });

                // Sheet변경
                tSheetName = `Sheet2`;
                sheet = wb.getWorksheet(tSheetName);

                nRowIdx = 1;
                sheet.getCell(nRowIdx, 1).value = '변경내역';
                nRowIdx += 1;
                sheet.getCell(nRowIdx, 1).value = 'Seq Comment';
                nRowIdx += 1;
                sheet.getCell(nRowIdx, 1).value = 'Add';
                nRowIdx += 2;

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
                    nRowIdx += 1;
                });

                nRowIdx += 2;
                sheet.getCell(nRowIdx, 1).value = 'Cancel';
                nRowIdx += 2;

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
                    nRowIdx += 1;
                });

                nRowIdx += 3;
                sheet.getCell(nRowIdx, 1).value = 'PO NO';
                sheet.getCell(nRowIdx, 2).value = 'SEQ';
                sheet.getCell(nRowIdx, 3).value = 'REVISED REASON';
                sheet.getCell(nRowIdx, 4).value = 'No. for Reason';
                sheet.getCell(nRowIdx, 5).value =
                    'FROM - responsibility , Trach nhiem';
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
                    var tSeqComment2 = { ...col };
                    sheet.getCell(nRowIdx, 3).value = col.SEQ_COMMENT;
                    sheet.getCell(2, 3).value = col.SEQ_COMMENT;
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
                        and a.po_seq = '${args.data.PO_SEQ}'
                        and b.matl_cd = a.matl_cd
                        and b.vendor_cd = e.vendor_cd
                        and a.seq_comment is not null
                `;
                var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));

                var tStr0 = '';
                tRet1.forEach((col, i) => {
                    tStr0 += col.vendor_name + '  ';
                });
                sheet.getCell(nRowIdx, 15).value = tStr0;

                var tTitle = '';
                tTitle = `PO_LIST_${args.data.PO_CD}_${args.data.PO_SEQ}`;

                let sql12 = `
                    delete from kcd_fileinfo
                    where
                        title = '${tTitle}'
                        and kind = 'S030502'
                `;
                var tRet12 = await prisma.$queryRaw(Prisma.raw(sql12));

                const uploadInfo = await generateUploadURL();
                const uploadURL = uploadInfo.uploadURL;
                const fileURL = uploadURL.split('?')[0];

                var tInObj = {};
                tInObj.NAME = tWExcelFile;
                tInObj.URL = fileURL;
                tInObj.TITLE = tTitle;
                tInObj.KIND = 'S030502';
                tInObj.FILE_KEY = tTitle;
                var tSql11 = AFLib.createTableSql('KCD_FILEINFO', tInObj);
                var tRet11 = await prisma.$queryRaw(Prisma.raw(tSql11));

                return await upload(`${tWExcelFile}.xlsx`, wb, uploadURL);
            } catch (error) {
                var tRetArray = [];
                var tObj = {};
                tObj.id = 1;
                tObj.CODE = `ERROR:${error.message}`;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },

        mgrQueryS030502_QRY_SEQ_COMMENT: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tUserInfo = AFLib.getUserInfo(contextValue);

            let sql0 = `
                SELECT distinct
                    isnull(seq_comment, '') as seq_comment
                from
                    ksv_po_mrp
                where
                    po_cd = '${args.data.PO_CD}'
                    and po_seq = '${args.data.PO_SEQ}'
            `;
            var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));

            var tRetObj = {};
            tRetObj.SEQ_COMMENT = '';
            if (tRet0.length > 0) {
                tRet0.forEach((col, i) => {
                    if (col.seq_comment !== '')
                        tRetObj.SEQ_COMMENT = col.seq_comment;
                });
            }

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
                var tOne = { ...tRet1[0] };
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

            var tTabName = `S030502_QRY_SEQ_COMMENT_${tUserInfo.USER_ID}`;
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

        mgrQueryS030502_QRY_PO_MRP2: async (_, args, contextValue) => {
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

            var tTabName = `S030502_QRY_MRP2_${tUserInfo.USER_ID}`;
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

        mgrQueryS030502_QRY_PO_MRP1: async (_, args, contextValue) => {
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

            var tTabName = `S030502_QRY_MRP1_${tUserInfo.USER_ID}`;
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
        mgrQueryS030502_QRY_ORDER: async (_, args, contextValue) => {
            //

            var tRetDate = AFLib.getCurrTime();
            var tUserInfo = AFLib.getUserInfo(contextValue);
            var tInput = { ...args.data };

            var tRet2 = await AFLib2.CommonFunc.CheckMrpWork(
                tUserInfo.USER_ID,
                tInput.PO_CD,
            );
            if (tRet2 > 0) {
                // MRP/Revise 작업중
                return [];
            }

            console.log('QRY_ORDER:STEP-1');

            //
            const client = new MongoClient(
                'mongodb://test:test1234@localhost:27017',
            );
            var mongo_db = '';
            try {
                await client.connect();
                mongo_db = client.db('afroba');
            } catch (error) {
                // Monog Db Error
                return [];
            }

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
            console.log('QRY_ORDER:STEP-2');

            var tTabName = ``;
            var tPoCdStr = args.data.PO_CD.replace(/-/gi, '_');
            if (args.data.PO_SEQ !== '')
                tTabName = `S030502_QRY_ORDER_${tPoCdStr}_${args.data.PO_SEQ}`;
            else tTabName = `S030502_QRY_ORDER_${tPoCdStr}_ALL_${last_po_seq}`;

            const exists =
                (await (
                    await mongo_db.listCollections().toArray()
                ).findIndex((item) => item.name === tTabName)) !== -1;
            console.log(`${tTabName}:${exists}`);
            if (exists) {
                var tRetArray = [];
                var cur1 = mongo_db.collection(tTabName).find();
                for await (const doc of cur1) {
                    var tObj = { ...doc };
                    tObj.MRP_LIST_FILE = '';
                    tObj.MRP_LIST_FILE_URL = '';
                    tRetArray.push(tObj);
                }
                var tRetArray1 = [];
                var tIdx20 = 0;
                for (tIdx20 = 0; tIdx20 < tRetArray.length; tIdx20++) {
                    var tObj = { ...tRetArray[tIdx20] };
                    let sql01 = `
                        select
                            name,
                            url
                        from
                            kcd_fileinfo
                        where
                            title = 'MRPLIST_${args.data.PO_CD}_${last_po_seq}_${tObj.ORDER_CD}'
                    `;
                    var tRet_sql01 = await prisma.$queryRaw(Prisma.raw(sql01));
                    if (tRet_sql01.length > 0) {
                        tObj.MRP_LIST_FILE = tRet_sql01[0].name;
                        tObj.MRP_LIST_FILE_URL = tRet_sql01[0].url;
                    }
                    tRetArray1.push(tObj);
                }
                return tRetArray1;
            }
            console.log('QRY_ORDER:STEP-3');

            var tRet4 = await AFLib2.CommonFunc.InsertMrpWork(
                tUserInfo.USER_ID,
                tInput.PO_CD,
                'WORKING:QRY ORDER',
                `S030502`,
            );

            let sql_order_1 = '';
            if (args.data.PO_SEQ !== '') {
                sql_order_1 = `          and po_seq = '${args.data.PO_SEQ}'  `;
            }

            let sql_order = `
                select distinct
                    a.ORDER_CD,
                    c.STYLE_NAME,
                    b.TOT_CNT,
                    '0' as COL1,
                    b.DUE_DATE,
                    isnull(b.MRP_LIST_FILE, '') as MRP_LIST_FILE,
                    isnull(b.MRP_LIST_FILE_URL, '') as MRP_LIST_FILE_URL
                from
                    ksv_po_mem a,
                    ksv_order_mst b,
                    kcd_style c
                where
                    a.po_cd = '${args.data.PO_CD}' ${sql_order_1}
                    and b.order_cd = a.order_cd
                    and c.style_cd = b.style_cd
                order by
                    a.order_cd
            `;
            var tRet_order = await prisma.$queryRaw(Prisma.raw(sql_order));

            const retNetTemp = await mrpMigration.runNetTemp({
                poCd: args.data.PO_CD,
                userId: tUserInfo.USER_ID,
            });
            if (!retNetTemp.ok)
                throw new Error(retNetTemp.message || retNetTemp.step);

            let sql_order_mem = `
                select distinct
                    a.order_cd
                from
                    ksv_po_mem a,
                    ksv_order_mst b
                where
                    a.po_cd = '${args.data.PO_CD}'
                    and a.order_cd = b.order_cd
                    and b.order_status <> '4'
            `;
            var tRet_order_mem = await prisma.$queryRaw(
                Prisma.raw(sql_order_mem),
            );
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet_order_mem.length; tIdx++) {
                var tOne = { ...tRet_order_mem[tIdx] };
                if (tOne.order_cd.substring(5, 6) === 'C') {
                    let sql11 = `
                        select
                            a.order_cd
                        from
                            ksv_order_mst a,
                            ksv_po_mem b
                        where
                            b.po_cd = '${args.data.PO_CD}'
                            and left(a.order_cd, 10) = b.order_cd
                            and a.order_cd like '${tOne.order_cd}-%'
                            and b.po_seq = '1'
                        order by
                            1
                    `;
                    var tRet_sql11 = await prisma.$queryRaw(Prisma.raw(sql11));
                    if (tRet_sql11.length <= 0) {
                        const retZip = await mrpMigration.runNetTempZip({
                            poCd: args.data.PO_CD,
                            userId: tUserInfo.USER_ID,
                            orderCd: tOne.order_cd,
                        });
                        if (!retZip.ok)
                            throw new Error(retZip.message || retZip.step);
                    } else {
                        var tIdx1 = 0;
                        for (tIdx1 = 0; tIdx1 < tRet_sql11.length; tIdx1++) {
                            var tOne1 = tRet_sql11[tIdx1];
                            const retZipComb =
                                await mrpMigration.runNetTempZipComb({
                                    poCd: args.data.PO_CD,
                                    userId: tUserInfo.USER_ID,
                                    orderCd: tOne1.order_cd,
                                });
                            if (!retZipComb.ok)
                                throw new Error(
                                    retZipComb.message || retZipComb.step,
                                );
                        }
                    }
                } else {
                    const retZip = await mrpMigration.runNetTempZip({
                        poCd: args.data.PO_CD,
                        userId: tUserInfo.USER_ID,
                        orderCd: tOne.order_cd,
                    });
                    if (!retZip.ok)
                        throw new Error(retZip.message || retZip.step);
                }
            }

            console.log('QRY_ORDER:STEP-4');

            var tArray = [];
            for (tIdx = 0; tIdx < tRet_order.length; tIdx++) {
                /*
                           a.ORDER_CD,
                           c.STYLE_NAME,
                           b.TOT_CNT,
                           '0' as COL1,
                           b.DUE_DATE
*/
                var tOne = { ...tRet_order[tIdx] };
                var tOrderCnt1 = '';
                let sql1 = `
                    select
                        isnull(sum(ord_cnt), 0) as ord_cnt
                    from
                        ksv_po_mrpnettemp
                    where
                        user_id = '${tUserInfo.USER_ID}'
                        and po_cd = '${args.data.PO_CD}'
                        and order_cd = '${tOne.ORDER_CD}'
                        and use_size <> ''
                `;
                var ret_sql1 = await prisma.$queryRaw(Prisma.raw(sql1));
                if (ret_sql1.length > 0) tOrderCnt1 = ret_sql1[0].ord_cnt;
                var tRate1 =
                    (parseFloat(tOrderCnt1) / parseFloat(tOne.TOT_CNT)) * 100.0;
                var tRate1_1 = parseInt(tRate1);
                var tRate1_2 = parseInt(tRate1) / 100;
                tOne.ORDER_RATE = tRate1_2;

                tOne.USE_SIZE = [];
                let sql2 = `
                    select
                        use_size,
                        count(*) as cnt
                    from
                        ksv_po_mrpnettemp
                    where
                        user_id = '${tUserInfo.USER_ID}'
                        and po_cd = '${args.data.PO_CD}'
                        and order_cd = '${tOne.ORDER_CD}'
                        and use_size <> ''
                    group by
                        use_size
                `;
                var ret_sql2 = await prisma.$queryRaw(Prisma.raw(sql2));
                ret_sql2.forEach((col, i) => {
                    var tObj1 = {};
                    tObj1.SIZE_NAME = col.use_size;
                    tObj1.SIZE_CNT = col.cnt;
                    tOne.USE_SIZE.push(tObj1);
                });
                tOne.MRP_LIST_FILE = '';
                tOne.MRP_LIST_FILE_URL = '';
                let sql01 = `
                    select
                        name,
                        url
                    from
                        kcd_fileinfo
                    where
                        title = 'MRPLIST_${args.data.PO_CD}_${last_po_seq}_${tOne.ORDER_CD}'
                `;
                var tRet_sql01 = await prisma.$queryRaw(Prisma.raw(sql01));
                if (tRet_sql01.length > 0) {
                    tOne.MRP_LIST_FILE = tRet_sql01[0].name;
                    tOne.MRP_LIST_FILE_URL = tRet_sql01[0].url;
                }
                tArray.push(tOne);
            }

            console.log('QRY_ORDER:STEP-5');

            if (exists) {
                await mongo_db.collection(tTabName).drop();
            }

            var tRet4 = await AFLib2.CommonFunc.DeleteMrpWork(
                tUserInfo.USER_ID,
                tInput.PO_CD,
            );

            if (tArray.length <= 0) return tArray;
            await mongo_db.collection(tTabName).insertMany(tArray);

            return tArray;
        },

        mgrQueryS030502_2: async (_, args) => {
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

        mgrQueryS030502_REPORT_MRP_LIST: async (_, args, contextValue) => {
            // Order별 MRP List 생성
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput = { ...args.data };

            var tRet2 = await AFLib2.CommonFunc.CheckMrpWork(
                tUserInfo.USER_ID,
                tInput.PO_CD,
            );
            if (tRet2 > 0) {
                // MRP/Revise 작업중
                var tRetArray = [];
                var tObj = {};
                tObj.id = 1;
                tObj.CODE = 'ERROR:MRP/Reviese 작업중';
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRet4 = await AFLib2.CommonFunc.InsertMrpWork(
                tUserInfo.USER_ID,
                tInput.PO_CD,
                'WORKING:MRP_LIST',
                `S030502`,
            );

            // var tWExcelFile = `Partial List-${tUserInfo.USER_ID}-${tRetDate1}`;
            var tWExcelFile = '';
            var tRetExcelFile = '';

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

            //
            const retNetTemp = await mrpMigration.runNetTemp({
                poCd: args.data.PO_CD,
                userId: tUserInfo.USER_ID,
            });
            if (!retNetTemp.ok)
                throw new Error(retNetTemp.message || retNetTemp.step);

            let sql_order_mem = `
                select distinct
                    a.order_cd
                from
                    ksv_po_mem a,
                    ksv_order_mst b
                where
                    a.po_cd = '${args.data.PO_CD}'
                    and a.order_cd = b.order_cd
                    and b.order_status <> '4'
            `;
            var tRet_order_mem = await prisma.$queryRaw(
                Prisma.raw(sql_order_mem),
            );
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet_order_mem.length; tIdx++) {
                var tOne = { ...tRet_order_mem[tIdx] };
                if (tOne.order_cd.substring(5, 6) === 'C') {
                    let sql11 = `
                        select
                            a.order_cd
                        from
                            ksv_order_mst a,
                            ksv_po_mem b
                        where
                            b.po_cd = '${args.data.PO_CD}'
                            and left(a.order_cd, 10) = b.order_cd
                            and a.order_cd like '${tOne.order_cd}-%'
                            and b.po_seq = '1'
                        order by
                            1
                    `;
                    var tRet_sql11 = await prisma.$queryRaw(Prisma.raw(sql11));
                    if (tRet_sql11.length <= 0) {
                        const retZip = await mrpMigration.runNetTempZip({
                            poCd: args.data.PO_CD,
                            userId: tUserInfo.USER_ID,
                            orderCd: tOne.order_cd,
                        });
                        if (!retZip.ok)
                            throw new Error(retZip.message || retZip.step);
                    } else {
                        var tIdx1 = 0;
                        for (tIdx1 = 0; tIdx1 < tRet_sql11.length; tIdx1++) {
                            var tOne1 = tRet_sql11[tIdx1];
                            const retZipComb =
                                await mrpMigration.runNetTempZipComb({
                                    poCd: args.data.PO_CD,
                                    userId: tUserInfo.USER_ID,
                                    orderCd: tOne1.order_cd,
                                });
                            if (!retZipComb.ok)
                                throw new Error(
                                    retZipComb.message || retZipComb.step,
                                );
                        }
                    }
                } else {
                    const retZip = await mrpMigration.runNetTempZip({
                        poCd: args.data.PO_CD,
                        userId: tUserInfo.USER_ID,
                        orderCd: tOne.order_cd,
                    });
                    if (!retZip.ok)
                        throw new Error(retZip.message || retZip.step);
                }
            }

            const retMrpTemp = await mrpMigration.runMrpTemp({
                poCd: args.data.PO_CD,
                userId: tUserInfo.USER_ID,
            });
            if (!retMrpTemp.ok)
                throw new Error(retMrpTemp.message || retMrpTemp.step);

            try {
                var tIdx0 = 0;
                for (tIdx0 = 0; tIdx0 < args.data.ORDER_CDS.length; tIdx0++) {
                    var tOrderCd = args.data.ORDER_CDS[tIdx0];
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
                    var tTemplateExcel = `${tPath0}/PO_MRP2.xlsx`;

                    const wb = new Excel.Workbook();
                    await wb.xlsx.readFile(tTemplateExcel);

                    var tSheetName = `Sheet1`;
                    var sheet = wb.getWorksheet(tSheetName);
                    // const sheet = wb.getWorksheet(1);

                    var tRowIdx = 10;

                    let sql4 = `
                        select
                            e.style_name
                        from
                            ksv_order_mst a,
                            kcd_style e
                        where
                            a.order_cd = '${tOrderCd}'
                            and e.style_cd = a.style_cd
                    `;
                    var tRet4 = await prisma.$queryRaw(Prisma.raw(sql4));
                    var tStyleName = tRet4[0].style_name;
                    var tStyleName_org = tStyleName;
                    tStyleName = tStyleName.replace(/ /gi, '_');
                    tStyleName = tStyleName.replace(/\//gi, '_');
                    tStyleName = tStyleName.replace(/\*/gi, '_');
                    tStyleName = tStyleName.replace(/;/gi, '_');

                    sheet.getCell(1, 1).value = args.data.PO_CD;
                    sheet.getCell(1, 13).value =
                        `${tOrderCd}(MRPByOrder기준으로 작성)`;

                    let sql4 = `
                        select
                            c.buyer_name,
                            e.style_name,
                            d.factory_name,
                            a.ref_order_no,
                            a.due_date,
                            a.size_group,
                            f.size_cnt
                        from
                            ksv_order_mst a,
                            kcd_buyer c,
                            kcd_factory d,
                            kcd_style e,
                            kcd_size_mst f
                        where
                            a.order_cd = '${tOrderCd}'
                            and c.buyer_cd = left(a.order_cd, 2)
                            and d.factory_cd = a.factory_cd
                            and e.style_cd = a.style_cd
                            and f.size_group = a.size_group
                    `;
                    var tRet4 = await prisma.$queryRaw(Prisma.raw(sql4));
                    var tOrderInfo = { ...tRet4[0] };

                    sheet.getCell(2, 20).value = tOrderInfo.buyer_name;
                    sheet.getCell(2, 13).value = tOrderInfo.style_name;
                    sheet.getCell(2, 24).value = tOrderInfo.factory_name;
                    sheet.getCell(1, 16).value = tOrderInfo.ref_order_no;
                    sheet.getCell(1, 20).value = tOrderInfo.due_date;
                    sheet.getCell(1, 24).value = tRetDate1;

                    var tSizeGroup = tOrderInfo.size_group.replace(/'/g, "''");
                    tSizeGroup = tOrderInfo.size_group.replace(/\[/, '[[');

                    sheet.getCell(4, 13).value = 'SEQ';
                    sheet.getCell(4, 14).value = 'COLOR';
                    sheet.getCell(4, 15).value = 'QTY';

                    let sql4 = `
                        select
                            size_val
                        from
                            kcd_size_mem
                        where
                            size_group like '${tSizeGroup}' escape '['
                        order by
                            size_seq
                    `;
                    var tRet4 = await prisma.$queryRaw(Prisma.raw(sql4));
                    var tSizeInfo = { ...tRet4[0] };

                    var tProdCnt = [];
                    tRet4.forEach((col, i) => {
                        sheet.getCell(4, 16 + i).value = col.size_val;
                        tProdCnt.push(0);
                    });

                    let sql5 = `
                        select
                            a.size_cnt,
                            b.color,
                            b.prod_cd,
                            a.add_flag
                        from
                            ksv_order_mem a,
                            ksv_prod_mst b
                        where
                            a.order_cd = '${tOrderCd}'
                            and b.prod_cd = a.prod_cd
                        order by
                            b.color
                    `;
                    var tRet5 = await prisma.$queryRaw(Prisma.raw(sql5));
                    var tColSeq = 0;
                    var tRowIdx = 5;
                    var tSumTotCnt = 5;
                    tRet5.forEach((col, i) => {
                        var tmpRow = [];
                        tmpRow[13] = 0;
                        tmpRow[14] = '';
                        tmpRow[15] = 0;
                        sheet.insertRow(tRowIdx, tmpRow, 'i');

                        var tIdx2 = 0;
                        var tTotCnt = 0;
                        for (tIdx2 = 0; tIdx2 < tRet4.length; tIdx2++) {
                            var tSizeCnt = parseFloat(
                                col.size_cnt.substring(
                                    6 * tIdx2,
                                    6 * (tIdx2 + 1),
                                ),
                            );
                            tTotCnt += tSizeCnt;
                            sheet.getCell(tRowIdx, 16 + tIdx2).value = tSizeCnt;
                            tProdCnt[tIdx2] += tSizeCnt;
                        }
                        sheet.getCell(tRowIdx, 13).value = i + 1;
                        sheet.getCell(tRowIdx, 14).value = col.color;
                        sheet.getCell(tRowIdx, 15).value = tTotCnt;
                        tSumTotCnt += tTotCnt;
                        tRowIdx += 1;
                    });
                    sheet.getCell(tRowIdx, 15).value = tSumTotCnt;
                    var tIdx2 = 0;
                    for (tIdx2 = 0; tIdx2 < tSizeInfo.length; tIdx2++) {
                        sheet.getCell(tRowIdx, 16 + tIdx2).value =
                            tProdCnt[tIdx2];
                    }

                    tRowIdx += 3;
                    // tRowIdx = 8;

                    //
                    const retPrint = await mrpMigration.runPrintMrp1({
                        poCd: args.data.PO_CD,
                        orderCd: tOrderCd,
                        userId: tUserInfo.USER_ID,
                        currDate: tRetDate1,
                    });
                    if (!retPrint.ok)
                        throw new Error(retPrint.message || retPrint.step);

                    let sql6 = `
                        select
                            max(po_seq) as max_po_seq
                        from
                            ksv_po_mrp
                        where
                            po_cd = '${args.data.PO_CD}'
                            and po_seq > 1
                            and po_seq < 97
                    `;
                    var tRet6 = await prisma.$queryRaw(Prisma.raw(sql6));
                    var tLastPoSeq1 = 0;
                    if (tRet6.length > 0) tLastPoSeq1 = tRet6[0].max_po_seq;

                    var tRet7 = [];
                    if (tLastPoSeq1 > 1) {
                        let sql7 = `
                            select distinct
                                matl_cd
                            from
                                ksv_po_mrp
                            where
                                po_cd = '${args.data.PO_CD}'
                                and po_seq = '${tLastPoSeq1}'
                        `;
                        tRet7 = await prisma.$queryRaw(Prisma.raw(sql7));
                    }

                    let sql8 = `
                        select
                            ex00,
                            ex01,
                            ex02,
                            ex03,
                            ex04,
                            ex05,
                            ex06,
                            ex07,
                            ex08,
                            ex09,
                            ex10,
                            ex11,
                            ex12,
                            ex13,
                            ex14,
                            ex15,
                            ex16,
                            ex17,
                            ex18,
                            ex19,
                            ex20,
                            ex21,
                            ex22,
                            ex23,
                            ex24,
                            ex25,
                            ex26,
                            ex27,
                            ex28,
                            ex29,
                            ex35,
                            ex36,
                            ex37
                        from
                            kzz_excel
                        where
                            user_id = '${tUserInfo.USER_ID}'
                            and ex_type = 'M'
                        order by
                            ex_seq
                    `;
                    var tRet8 = await prisma.$queryRaw(Prisma.raw(sql8));
                    tRet8.forEach((col, i) => {
                        var tUseCheck = col.ex29;
                        var tNatName = col.ex35;
                        var tMalType2 = col.ex37;
                        var tMatlCd = col.ex01;
                        sheet.getCell(tRowIdx, 1).value = col.ex00;
                        sheet.getCell(tRowIdx, 2).value = col.ex01;
                        sheet.getCell(tRowIdx, 3).value = col.ex02;
                        sheet.getCell(tRowIdx, 4).value = col.ex03;
                        sheet.getCell(tRowIdx, 5).value = col.ex04;
                        sheet.getCell(tRowIdx, 6).value = col.ex05;
                        sheet.getCell(tRowIdx, 7).value = col.ex06;
                        sheet.getCell(tRowIdx, 8).value = col.ex07;
                        sheet.getCell(tRowIdx, 9).value = col.ex08;
                        sheet.getCell(tRowIdx, 10).value = col.ex09;
                        sheet.getCell(tRowIdx, 11).value = col.ex10;
                        sheet.getCell(tRowIdx, 12).value = col.ex11;
                        sheet.getCell(tRowIdx, 13).value = col.ex12;
                        sheet.getCell(tRowIdx, 14).value = `'${col.ex13}`;
                        sheet.getCell(tRowIdx, 15).value = col.ex14.replace(
                            /=/,
                            '',
                        );
                        sheet.getCell(tRowIdx, 16).value = col.ex15;
                        sheet.getCell(tRowIdx, 17).value = col.ex16;
                        sheet.getCell(tRowIdx, 18).value = col.ex17;
                        sheet.getCell(tRowIdx, 19).value = col.ex18;
                        sheet.getCell(tRowIdx, 20).value = col.ex19;
                        sheet.getCell(tRowIdx, 21).value = col.ex20;
                        sheet.getCell(tRowIdx, 22).value = `'${col.ex23}`;
                        sheet.getCell(tRowIdx, 23).value = col.ex27;
                        sheet.getCell(tRowIdx, 24).value = col.ex28;
                        sheet.getCell(tRowIdx, 25).value = col.ex36;
                        sheet.getCell(tRowIdx, 26).value = tNatName;
                        tRowIdx += 1;
                    });
                    tRowIdx += 2;

                    sheet.getCell(tRowIdx, 1).value = '단품발주';

                    let sql9 = `
                        select
                            ex00,
                            ex01,
                            ex02,
                            ex03,
                            ex04,
                            ex05,
                            ex06,
                            ex07,
                            ex08,
                            ex09,
                            ex10,
                            ex11,
                            ex12,
                            ex13,
                            ex14,
                            ex15,
                            ex16,
                            ex17,
                            ex18,
                            ex19,
                            ex20,
                            ex21,
                            ex22,
                            ex23,
                            ex24,
                            ex25,
                            ex26,
                            ex27,
                            ex28,
                            ex36 as ex29,
                            ex37 as ex30
                        from
                            kzz_excel
                        where
                            user_id = '${tUserInfo.USER_ID}'
                            and ex_type = 'A'
                        order by
                            ex_seq
                    `;
                    var tRet9 = await prisma.$queryRaw(Prisma.raw(sql9));
                    tRet9.forEach((col, i) => {
                        var tUseCheck = col.ex29;
                        var tNatName = col.ex35;
                        var tMalType2 = col.ex37;
                        var tMatlCd = col.ex01;
                        sheet.getCell(tRowIdx, 1).value = col.ex00;
                        sheet.getCell(tRowIdx, 2).value = col.ex01;
                        sheet.getCell(tRowIdx, 3).value = col.ex02;
                        sheet.getCell(tRowIdx, 4).value = col.ex03;
                        sheet.getCell(tRowIdx, 5).value = col.ex04;
                        sheet.getCell(tRowIdx, 6).value = col.ex05;
                        sheet.getCell(tRowIdx, 7).value = col.ex06;
                        sheet.getCell(tRowIdx, 8).value = col.ex07;
                        sheet.getCell(tRowIdx, 9).value = col.ex08;
                        sheet.getCell(tRowIdx, 10).value = col.ex09;
                        sheet.getCell(tRowIdx, 11).value = col.ex10;
                        sheet.getCell(tRowIdx, 12).value = col.ex11;
                        sheet.getCell(tRowIdx, 13).value = col.ex12;
                        sheet.getCell(tRowIdx, 14).value = `'${col.ex13}`;
                        sheet.getCell(tRowIdx, 15).value = col.ex14.replace(
                            /=/,
                            '',
                        );
                        sheet.getCell(tRowIdx, 16).value = col.ex15;
                        sheet.getCell(tRowIdx, 17).value = col.ex16;
                        sheet.getCell(tRowIdx, 18).value = col.ex17;
                        sheet.getCell(tRowIdx, 19).value = col.ex18;
                        sheet.getCell(tRowIdx, 20).value = col.ex19;
                        sheet.getCell(tRowIdx, 21).value = col.ex20;
                        sheet.getCell(tRowIdx, 22).value = `'${col.ex23}`;
                        sheet.getCell(tRowIdx, 23).value = col.ex27;
                        sheet.getCell(tRowIdx, 24).value = col.ex28;
                        sheet.getCell(tRowIdx, 25).value = col.ex30;
                        tRowIdx += 1;
                    });
                    tRowIdx += 2;

                    // Order List
                    var tSheetName = `Sheet2`;
                    var sheet = wb.getWorksheet(tSheetName);
                    tRowIdx = 1;

                    let sql10 = `
                        SELECT
                            B.order_cd,
                            E.style_name,
                            F.color,
                            D.size_member,
                            C.size_cnt,
                            B.tot_cnt,
                            c.prod_cd,
                            g.nat_name,
                            b.ref_order_no
                        FROM
                            KSV_ORDER_MST B,
                            KSV_ORDER_MEM C,
                            KCD_SIZE_MST D,
                            KCD_STYLE E,
                            KSV_PROD_MST F,
                            kcd_nation g
                        WHERE
                            B.ORDER_CD = C.ORDER_CD
                            and B.SIZE_GROUP = D.SIZE_GROUP
                            and B.STYLE_CD = E.STYLE_CD
                            and C.PROD_CD = F.PROD_CD
                            and g.nat_cd = b.nat_cd
                            and b.order_cd like '${tOrderCd}%'
                        ORDER BY
                            B.ORDER_CD,
                            F.COLOR
                    `;
                    var tRet10 = await prisma.$queryRaw(Prisma.raw(sql10));
                    var tOne10 = { ...tRet10[0] };

                    tRowIdx += 1;
                    sheet.getCell(tRowIdx, 1).value = 'Order No';
                    sheet.getCell(tRowIdx, 3).value = 'Style';
                    sheet.getCell(tRowIdx, 5).value = 'Country';
                    sheet.getCell(tRowIdx, 6).value = 'Buyer Po';
                    sheet.getCell(tRowIdx, 7).value = 'Prod#';
                    sheet.getCell(tRowIdx, 8).value = 'Color';
                    sheet.getCell(tRowIdx, 10).value = 'Total';
                    var tCols = tOne10.size_member.split(',');
                    tCols.forEach((col, i) => {
                        sheet.getCell(tRowIdx, 11 + i).value = col;
                    });

                    tRowIdx += 1;
                    tRet10.forEach((col, i) => {
                        sheet.getCell(tRowIdx, 1).value = col.order_cd;
                        sheet.getCell(tRowIdx, 3).value = col.style_name;
                        sheet.getCell(tRowIdx, 5).value = col.nat_name;
                        sheet.getCell(tRowIdx, 6).value = col.ref_order_no;
                        sheet.getCell(tRowIdx, 7).value = col.prod_cd;
                        sheet.getCell(tRowIdx, 8).value = col.color;
                        sheet.getCell(tRowIdx, 10).value = col.tot_cnt;
                        tCols.forEach((col1, i1) => {
                            sheet.getCell(tRowIdx, 11 + i1).value = parseFloat(
                                col.size_cnt.substring(6 * i1, 6 * (i1 + 1)),
                            );
                        });
                        tRowIdx += 1;
                    });

                    tWExcelFile = `MRPLIST_${args.data.PO_CD}_${last_po_seq}_${tOrderCd}_${tStyleName}_${tRetDate1}`;

                    let sql12 = `
                        delete from kcd_fileinfo
                        where
                            title = 'MRPLIST_${args.data.PO_CD}_${last_po_seq}_${tOrderCd}'
                            and kind = 'S030502'
                    `;
                    var tRet12 = await prisma.$queryRaw(Prisma.raw(sql12));

                    const uploadInfo = await generateUploadURL();
                    const uploadURL = uploadInfo.uploadURL;
                    const fileURL = uploadURL.split('?')[0];

                    var tInObj = {};
                    tInObj.NAME = tWExcelFile;
                    tInObj.URL = fileURL;
                    tInObj.TITLE = `MRPLIST_${args.data.PO_CD}_${last_po_seq}_${tOrderCd}`;
                    tInObj.KIND = 'S030502';
                    tInObj.FILE_KEY = tInObj.TITLE;
                    var tSql11 = AFLib.createTableSql('KCD_FILEINFO', tInObj);
                    var tRet11 = await prisma.$queryRaw(Prisma.raw(tSql11));

                    return await upload(`${tWExcelFile}.xlsx`, wb, uploadURL);
                }
            } catch (error) {
                var tRetArray = [];
                var tObj = {};
                tObj.id = 1;
                tObj.CODE = `ERROR:${error.message}`;
                tRetArray.push(tObj);
                var tRet4 = await AFLib2.CommonFunc.DeleteMrpWork(
                    tUserInfo.USER_ID,
                    tInput.PO_CD,
                );
                return tRetArray;
            }
        },
    },
};

export default moduleQuery_S030502_2;
