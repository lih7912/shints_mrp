import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
import AFLib2 from '../../po_adjust'; //PrismaClient 사용하기 위해 불러오기
import S030513_QRY_COMM from '../../reportlib_mrplist'; //PrismaClient 사용하기 위해 불러오기
import axios from 'axios';
const Excel = require('exceljs');
const { upload } = require('../../../routes/s3');
const { MongoClient } = require('mongodb');

const escapeSql = (value) => String(value || '').replace(/'/g, "''");

const pickMaxSeq = (seqList) => {
    const cleaned = (seqList || [])
        .map((x) => String(x || '').trim())
        .filter((x) => x !== '');
    if (cleaned.length <= 0) return '';

    let maxSeq = cleaned[0];
    cleaned.forEach((seq) => {
        const currVal = parseInt(seq, 10);
        const maxVal = parseInt(maxSeq, 10);
        if (!Number.isNaN(currVal) && (Number.isNaN(maxVal) || currVal > maxVal)) {
            maxSeq = seq;
        }
    });
    return maxSeq;
};

const buildOrderGroupsForMrp = async (inputData) => {
    const tInput = inputData || {};
    const tOrderInfos = Array.isArray(tInput.ORDER_INFOS) ? tInput.ORDER_INFOS : [];
    const tOrderCds = Array.isArray(tInput.ORDER_CDS) ? tInput.ORDER_CDS : [];

    const tOrderMap = new Map();

    tOrderInfos.forEach((info) => {
        const orderCd = String((info && info.ORDER_CD) || '').trim();
        if (orderCd === '') return;

        const poCd = String((info && info.PO_CD) || '').trim();
        const poSeq = String((info && info.PO_SEQ) || '').trim();
        tOrderMap.set(orderCd, {
            ORDER_CD: orderCd,
            PO_CD: poCd,
            PO_SEQ: poSeq,
        });
    });

    tOrderCds.forEach((orderCd0) => {
        const orderCd = String(orderCd0 || '').trim();
        if (orderCd === '' || tOrderMap.has(orderCd)) return;
        tOrderMap.set(orderCd, {
            ORDER_CD: orderCd,
            PO_CD: '',
            PO_SEQ: '',
        });
    });

    if (tOrderMap.size <= 0) {
        return [];
    }

    const unresolvedOrders = [];
    tOrderMap.forEach((one) => {
        if (!one.PO_CD) unresolvedOrders.push(one.ORDER_CD);
    });

    if (unresolvedOrders.length > 0) {
        const orderList = unresolvedOrders
            .map((orderCd) => `'${escapeSql(orderCd)}'`)
            .join(',');
        const sqlOrderPo = `
            select
                order_cd,
                po_cd,
                po_seq
            from
                ksv_order_mst
            where
                order_cd in (${orderList})
        `;
        const orderPoRows = await prisma.$queryRaw(Prisma.raw(sqlOrderPo));
        orderPoRows.forEach((row) => {
            const orderCd = String((row && row.order_cd) || '').trim();
            const poCd = String((row && row.po_cd) || '').trim();
            const poSeq = String((row && row.po_seq) || '').trim();
            if (!tOrderMap.has(orderCd)) return;
            const prev = tOrderMap.get(orderCd);
            tOrderMap.set(orderCd, {
                ORDER_CD: orderCd,
                PO_CD: prev.PO_CD || poCd,
                PO_SEQ: prev.PO_SEQ || poSeq,
            });
        });
    }

    const groupMap = new Map();
    tOrderMap.forEach((one) => {
        const poCd = String(one.PO_CD || '').trim();
        if (poCd === '') return;

        if (!groupMap.has(poCd)) {
            groupMap.set(poCd, {
                PO_CD: poCd,
                ORDER_CDS: [],
                _SEQ_CANDIDATES: [],
            });
        }
        const group = groupMap.get(poCd);
        if (!group.ORDER_CDS.includes(one.ORDER_CD)) {
            group.ORDER_CDS.push(one.ORDER_CD);
        }
        if (String(one.PO_SEQ || '').trim() !== '') {
            group._SEQ_CANDIDATES.push(String(one.PO_SEQ).trim());
        }
    });

    const poCds = Array.from(groupMap.keys());
    if (poCds.length <= 0 && String(tInput.PO_CD || '').trim() !== '') {
        const fallbackPo = String(tInput.PO_CD || '').trim();
        groupMap.set(fallbackPo, {
            PO_CD: fallbackPo,
            ORDER_CDS: Array.from(tOrderMap.keys()),
            _SEQ_CANDIDATES: [String(tInput.PO_SEQ || '').trim()].filter(
                (x) => x !== '',
            ),
        });
    }

    const poCdsForSeq = Array.from(groupMap.keys());
    const maxSeqByPo = {};
    if (poCdsForSeq.length > 0) {
        const poListSql = poCdsForSeq
            .map((poCd) => `'${escapeSql(poCd)}'`)
            .join(',');
        const sqlMaxPoSeq = `
            select
                po_cd,
                max(po_seq) as max_po_seq
            from
                ksv_po_mst
            where
                po_cd in (${poListSql})
                and po_seq < 97
            group by
                po_cd
        `;
        const maxPoSeqRows = await prisma.$queryRaw(Prisma.raw(sqlMaxPoSeq));
        maxPoSeqRows.forEach((row) => {
            const poCd = String((row && row.po_cd) || '').trim();
            const maxPoSeq = String((row && row.max_po_seq) || '').trim();
            maxSeqByPo[poCd] = maxPoSeq;
        });
    }

    const groups = [];
    groupMap.forEach((group) => {
        groups.push({
            PO_CD: group.PO_CD,
            PO_SEQ: pickMaxSeq(group._SEQ_CANDIDATES) || maxSeqByPo[group.PO_CD] || '',
            ORDER_CDS: group.ORDER_CDS,
        });
    });

    return groups;
};

const findCanceledOrderCd = async (orderCds) => {
    const validOrders = (orderCds || [])
        .map((x) => String(x || '').trim())
        .filter((x) => x !== '');
    if (validOrders.length <= 0) return '';

    const orderList = validOrders.map((x) => `'${escapeSql(x)}'`).join(',');
    const sqlOrderStatus = `
        select
            order_cd,
            order_status
        from
            ksv_order_mst
        where
            order_cd in (${orderList})
    `;
    const rows = await prisma.$queryRaw(Prisma.raw(sqlOrderStatus));
    const canceled = rows.find(
        (row) => String((row && row.order_status) || '') === '4',
    );
    return canceled ? String(canceled.order_cd || '') : '';
};

// export default로 Query 내용 내보내기
const moduleQuery_S030513_2 = {
    Query: {
        mgrQueryS030513_REPORT_ADD_MATL_REQ: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = await AFLib.getUserInfoSync(contextValue);

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
                    sql0_s = `and a.diff_po_type = '3' `;
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
                        case
                            when charindex('-', isnull(a.remark, '')) > 0 then ltrim(rtrim(left(a.remark, charindex('-', a.remark) - 1)))
                            else ltrim(rtrim(isnull(a.remark, '')))
                        end as PURPOSE,
                        case
                            when charindex('-', isnull(a.remark, '')) > 0 then ltrim(rtrim(substring(a.remark, charindex('-', a.remark) + 1, len(a.remark))))
                            else ''
                        end as remark,
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

                sheet.getCell(6, 4).value =
                    `${args.data.PO_CD}(${args.data.PO_SEQ})`;
                sheet.getCell(7, 4).value = ``;

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
                sheet.getCell(tRowIdx, 9).value = 'Total';
                sheet.getCell(tRowIdx, 10).value = tTotAmt;
                sheet.getCell(tRowIdx, 11).value = tTotWeight;

                const borderThin = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' },
                };

                const startRow = 10;
                const endRow = tRowIdx;
                const startCol = 1;
                const endCol = 19;

                for (let r = startRow; r <= endRow; r++) {
                    for (let c = startCol; c <= endCol; c++) {
                        sheet.getCell(r, c).border = borderThin;
                    }
                }

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

                let leftStartRow;
                if (tRet2.length > 0) {
                    tRowIdx += 2;
                    sheet.getCell(tRowIdx, 1).value = 'Left over';

                    tRowIdx += 1;
                    leftStartRow = tRowIdx;

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

                if (tRet2.length > 0) {
                    const startRow = leftStartRow;
                    const endRow = tRowIdx;
                    const startCol = 1;
                    const endCol = 19;

                    for (let r = startRow; r <= endRow; r++) {
                        for (let c = startCol; c <= endCol; c++) {
                            sheet.getCell(r, c).border = borderThin;
                        }
                    }
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

                    var tTabName = `S030513_QRY_SEQ_COMMENT_${tUserInfo.USER_ID}`;
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
                const commentStartRow = nRowIdx;
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

                const commentEndRow = nRowIdx;

                for (let r = commentStartRow; r <= commentEndRow; r++) {
                    for (let c = 1; c <= 19; c++) {
                        sheet.getCell(r, c).border = borderThin;
                    }
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
        mgrQueryS030513_REPORT_1: async (_, args, contextValue) => {
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

            var tTabName = `S030513_QRY_ORDER_${tPoCdStr}_ALL_${last_po_seq}`;
            var tOrders = [];
            var exists =
                (await (
                    await mongo_db.listCollections().toArray()
                ).findIndex((item) => item.name === tTabName)) !== -1;
            if (exists) {
                var cur1 = mongo_db.collection(tTabName).find();
                for await (const doc of cur1) {
                    var tObj = {
                        ...doc,
                    };
                    tOrders.push(tObj);
                }
            }

            tTabName = `S030513_QRY_MRP1_${tUserInfo.USER_ID}`;
            var tMrp1 = [];
            exists =
                (await (
                    await mongo_db.listCollections().toArray()
                ).findIndex((item) => item.name === tTabName)) !== -1;
            if (exists) {
                var cur2 = mongo_db.collection(tTabName).find();
                for await (const doc of cur2) {
                    var tObj = {
                        ...doc,
                    };
                    tMrp1.push(tObj);
                }
            }

            tTabName = `S030513_QRY_MRP2_${tUserInfo.USER_ID}`;
            var tMrp2 = [];
            exists =
                (await (
                    await mongo_db.listCollections().toArray()
                ).findIndex((item) => item.name === tTabName)) !== -1;
            if (exists) {
                var cur3 = mongo_db.collection(tTabName).find();
                for await (const doc of cur3) {
                    var tObj = {
                        ...doc,
                    };
                    tMrp2.push(tObj);
                }
            }

            tTabName = `S030513_QRY_SEQ_COMMENT_${tUserInfo.USER_ID}`;
            var tSeqComment = [];
            exists =
                (await (
                    await mongo_db.listCollections().toArray()
                ).findIndex((item) => item.name === tTabName)) !== -1;
            if (exists) {
                var cur4 = mongo_db.collection(tTabName).find();
                for await (const doc of cur4) {
                    var tObj = {
                        ...doc,
                    };
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
                var tOrder = {
                    ...tOrders[0],
                };
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
                    var tSeqComment2 = {
                        ...col,
                    };
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

        mgrQueryS030513_QRY_SEQ_COMMENT: async (_, args, contextValue) => {
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

            var tTabName = `S030513_QRY_SEQ_COMMENT_${tUserInfo.USER_ID}`;
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

        mgrQueryS030513_QRY_PO_MRP2: async (_, args, contextValue) => {
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
                    case
                        when charindex('-', isnull(a.remark, '')) > 0 then ltrim(rtrim(left(a.remark, charindex('-', a.remark) - 1)))
                        else ltrim(rtrim(isnull(a.remark, '')))
                    end as PURPOSE,
                    case
                        when charindex('-', isnull(a.remark, '')) > 0 then ltrim(rtrim(substring(a.remark, charindex('-', a.remark) + 1, len(a.remark))))
                        else ''
                    end as remark,
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

            var tTabName = `S030513_QRY_MRP2_${tUserInfo.USER_ID}`;
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

        mgrQueryS030513_QRY_PO_MRP1: async (_, args, contextValue) => {
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

            var tTabName = `S030513_QRY_MRP1_${tUserInfo.USER_ID}`;
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
        mgrQueryS030513_QRY_ORDER: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tPoSeq = '1';
            if (args.data.PO_SEQ !== '') tPoSeq = args.data.PO_SEQ;

            // 1. PO_CD에서 MAX(PO_SEQ) 가져오기 (한 번만 조회)
            let maxSeqSql = `
                SELECT
                    MAX(po_seq) AS max_seq
                FROM
                    ksv_po_mst
                WHERE
                    po_cd = '${args.data.PO_CD}'
                    AND po_seq < 98
            `;
            let maxSeqResult = await prisma.$queryRaw(Prisma.raw(maxSeqSql));
            let last_po_seq = maxSeqResult[0]?.max_seq || 1;

            const poCd = (args.data.PO_CD ?? '').split(' ').join('%');
            const styleName = (args.data.STYLE_NAME ?? '').split(' ').join('%');
            const buyerCd = (args.data.BUYER_CD ?? '').split(' ').join('%');

            // 2. 메인 데이터 조회
            let sql0 = `
                SELECT
                    a.PO_CD,
                    a.ORDER_CD,
                    c.STYLE_NAME,
                    d.BUYER_NAME,
                    b.DUE_DATE,
                    b.TOT_CNT,
                    a.PO_SEQ,
                    b.ORDER_STATUS,
                    '' AS MRP_LIST_FILE,
                    '' AS MRP_LIST_FILE_URL,
                    '' AS MRP_LIST2_FILE,
                    '' AS MRP_LIST2_FILE_URL,
                    '' AS MRP_LIST3_FILE,
                    '' AS MRP_LIST3_FILE_URL
                FROM
                    ksv_po_mem a
                    JOIN ksv_order_mst b ON b.order_cd = a.order_cd
                    JOIN kcd_style c ON c.style_cd = b.style_cd
                    JOIN kcd_buyer d ON d.buyer_cd = LEFT(a.order_cd, 2)
                WHERE
                    1 = 1
                    AND a.po_cd LIKE '%${poCd}%'
                    AND c.style_name LIKE '%${styleName}%'
                    AND (
                        d.buyer_cd LIKE '%${buyerCd}%'
                        OR d.buyer_name LIKE '%${buyerCd}%'
                    )
                    AND a.po_seq = '1'
                ORDER BY
                    a.PO_CD,
                    a.ORDER_CD
            `;

            let mainList = await prisma.$queryRaw(Prisma.raw(sql0));

            // 3. MRP 파일 타이틀 목록 만들기
            let titles = mainList.map((row) => ({
                key: `${row.PO_CD}_${row.ORDER_CD}`,
                title1: `MRPLIST_${row.PO_CD}_${row.ORDER_CD}`,
                title2: `MRPLIST2_${row.PO_CD}_${row.ORDER_CD}`,
                title3: `MRPLIST3_${row.PO_CD}_${row.ORDER_CD}`,
            }));

            // 4. 파일 목록 조회 (긴 OR 조건 대신 VALUES JOIN + chunk 처리)
            const escapeSqlString = (value) => String(value || '').replace(/'/g, "''");
            const allTitles = Array.from(
                new Set(
                    titles
                        .flatMap((t) => [t.title1, t.title2, t.title3])
                        .filter((x) => !!x),
                ),
            );

            let fileList = [];
            const chunkSize = 60;
            for (let i = 0; i < allTitles.length; i += chunkSize) {
                const chunk = allTitles.slice(i, i + chunkSize);
                const prefixSql = chunk
                    .map((title, idx) => {
                        const escaped = escapeSqlString(title);
                        return idx === 0
                            ? `SELECT '${escaped}' AS prefix`
                            : `UNION ALL SELECT '${escaped}'`;
                    })
                    .join(' ');

                if (!prefixSql) continue;

                const fileSql = `
                    SELECT
                        f.title,
                        f.name,
                        f.url
                    FROM
                        kcd_fileinfo f
                        JOIN (${prefixSql}) p
                            ON f.title LIKE p.prefix + '%'
                    ORDER BY
                        f.id DESC
                `;

                const partial = await prisma.$queryRaw(Prisma.raw(fileSql));
                fileList = fileList.concat(partial || []);
            }

            // 5. 타이틀별 파일 매핑
            let fileMap = {};

            // 모든 title1~3 기준으로 각각 첫 번째 매칭되는 파일 저장
            for (let t of titles) {
                let key = `${t.key}`; // PO_CD_ORDER_CD

                let t1 = `MRPLIST_${key}`;
                let t2 = `MRPLIST2_${key}`;
                let t3 = `MRPLIST3_${key}`;

                // 각각 파일 중 title이 시작하는 것 중 첫 번째 매칭
                fileMap[t1] = fileList.find((f) => f.title.startsWith(t1));
                fileMap[t2] = fileList.find((f) => f.title.startsWith(t2));
                fileMap[t3] = fileList.find((f) => f.title.startsWith(t3));
            }

            let result = mainList.map((row) => {
                let key = `${row.PO_CD}_${row.ORDER_CD}`;
                let t1 = `MRPLIST_${key}`;
                let t2 = `MRPLIST2_${key}`;
                let t3 = `MRPLIST3_${key}`;

                if (fileMap[t1]) {
                    row.MRP_LIST_FILE = fileMap[t1].name;
                    row.MRP_LIST_FILE_URL = fileMap[t1].url;
                }
                if (fileMap[t2]) {
                    row.MRP_LIST2_FILE = fileMap[t2].name;
                    row.MRP_LIST2_FILE_URL = fileMap[t2].url;
                }
                if (fileMap[t3]) {
                    row.MRP_LIST3_FILE = fileMap[t3].name;
                    row.MRP_LIST3_FILE_URL = fileMap[t3].url;
                }

                return row;
            });

            return result;
        },

        mgrQueryS030513_QRY_ORDER_COMBINED: async (_, args, contextValue) => {
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
                        and kind = 'S030513'
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

        mgrQueryS030513_2: async (_, args) => {
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

        mgrQueryS030513_REPORT_MRP_LIST: async (_, args, contextValue) => {
            var tUserInfo = AFLib.getUserInfo(contextValue);
            try {
                var tOrderGroups = await buildOrderGroupsForMrp(args.data);
                if (tOrderGroups.length <= 0) {
                    return [{ id: 0, CODE: 'ERROR:ORDER_CDS/ORDER_INFOS is empty' }];
                }

                var tAllOrderCds = [];
                tOrderGroups.forEach((group) => {
                    group.ORDER_CDS.forEach((orderCd) => tAllOrderCds.push(orderCd));
                });
                const canceledOrderCd = await findCanceledOrderCd(tAllOrderCds);
                if (canceledOrderCd !== '') {
                    return [
                        {
                            id: 0,
                            CODE: `ERROR:CANNOT DOWNLOAD FOR CANCEL ORDER. PLEASE CHECK THE ORDER STATUS. ORDER_CD=${canceledOrderCd}`,
                        },
                    ];
                }

                var allBatchFiles = [];

                for (const group of tOrderGroups) {
                    let tRet2 = await AFLib2.CommonFunc.CheckMrpWork(
                        tUserInfo.USER_ID,
                        group.PO_CD,
                    );
                    if (tRet2 > 0) {
                        // Recover from stale lock rows left by interrupted previous runs.
                        try {
                            await AFLib2.CommonFunc.DeleteMrpWork(
                                tUserInfo.USER_ID,
                                group.PO_CD,
                            );
                        } catch (e2) {}
                        tRet2 = await AFLib2.CommonFunc.CheckMrpWork(
                            tUserInfo.USER_ID,
                            group.PO_CD,
                        );
                        if (tRet2 > 0) {
                            return [
                                {
                                    id: 0,
                                    CODE: 'ERROR:현재 작업중입니다. 잠시후에 다시 조회하십시요',
                                },
                            ];
                        }
                    }
                    var insertedWork = false;
                    try {
                        await AFLib2.CommonFunc.InsertMrpWork(
                            tUserInfo.USER_ID,
                            group.PO_CD,
                            'WORKING:MRP_LIST',
                            `S030513`,
                        );
                        insertedWork = true;

                        const groupArgs = {
                            ...args,
                            data: {
                                ...args.data,
                                PO_CD: group.PO_CD,
                                PO_SEQ: group.PO_SEQ,
                            },
                        };

                        const tRetArray = await S030513_QRY_COMM.REPORT_MRP_LIST(
                            groupArgs,
                            contextValue,
                            group.ORDER_CDS,
                        );

                        if (!Array.isArray(tRetArray) || tRetArray.length <= 0) {
                            continue;
                        }

                        const firstCode = String((tRetArray[0] && tRetArray[0].CODE) || '');
                        if (firstCode.includes('ERROR')) {
                            return tRetArray;
                        }

                        if (firstCode.startsWith('SUCCESS:BATCH_FILES:')) {
                            try {
                                const encoded = firstCode.replace('SUCCESS:BATCH_FILES:', '');
                                const decoded = Buffer.from(encoded, 'base64').toString('utf8');
                                const files = JSON.parse(decoded);
                                if (Array.isArray(files)) {
                                    allBatchFiles = allBatchFiles.concat(files);
                                }
                            } catch (e2) {
                                console.log('BATCH_FILES parse error', e2);
                            }
                        }
                    } finally {
                        if (insertedWork) {
                            try {
                                await AFLib2.CommonFunc.DeleteMrpWork(
                                    tUserInfo.USER_ID,
                                    group.PO_CD,
                                );
                            } catch (e2) {
                                console.log('DeleteMrpWork failed', e2);
                            }
                        }
                    }
                }

                if (allBatchFiles.length > 0) {
                    const encodedFiles = Buffer.from(
                        JSON.stringify(allBatchFiles),
                        'utf8',
                    ).toString('base64');
                    return [{ id: 0, CODE: `SUCCESS:BATCH_FILES:${encodedFiles}` }];
                }
            } catch (e) {
                console.log(
                    'mgrQueryS030513_REPORT_MRP_LIST error => ' +
                        (e && e.message ? e.message : String(e)),
                );
                return [
                    {
                        id: 0,
                        CODE: `ERROR:처리중 오류가 발생했습니다:${
                            e && e.message ? e.message : String(e)
                        }`,
                    },
                ];
            }

            return [
                {
                    id: 0,
                    CODE: 'SUCCESS:MRP List을 요청했습니다. 완료되면 재조회 후 다운로드 하세요.',
                },
            ];
        },

        mgrQueryS030513_REPORT_MRP_LIST2: async (_, args, contextValue) => {
            var tUserInfo = AFLib.getUserInfo(contextValue);

            try {
                var tOrderGroups = await buildOrderGroupsForMrp(args.data);
                if (tOrderGroups.length <= 0) {
                    return [{ id: 0, CODE: 'ERROR:ORDER_CDS/ORDER_INFOS is empty' }];
                }

                for (const group of tOrderGroups) {
                    for (const orderCd of group.ORDER_CDS) {
                        var tRet2 = await AFLib2.CommonFunc.CheckMrpWork(
                            tUserInfo.USER_ID,
                            group.PO_CD,
                        );
                        if (tRet2 > 0) {
                            try {
                                await AFLib2.CommonFunc.DeleteMrpWork(
                                    tUserInfo.USER_ID,
                                    group.PO_CD,
                                );
                            } catch (e2) {}
                            tRet2 = await AFLib2.CommonFunc.CheckMrpWork(
                                tUserInfo.USER_ID,
                                group.PO_CD,
                            );
                            if (tRet2 > 0) {
                                return [
                                    {
                                        id: 0,
                                        CODE: 'ERROR:현재 작업중입니다. 잠시후에 다시 조회해보세요.',
                                    },
                                ];
                            }
                        }
                        var insertedWork = false;
                        try {
                            await AFLib2.CommonFunc.InsertMrpWork(
                                tUserInfo.USER_ID,
                                group.PO_CD,
                                'WORKING:MRP_LIST2',
                                `S030513`,
                            );
                            insertedWork = true;

                            const groupArgs = {
                                ...args,
                                data: {
                                    ...args.data,
                                    PO_CD: group.PO_CD,
                                    PO_SEQ: group.PO_SEQ,
                                },
                            };

                            const tRetArray = await S030513_QRY_COMM.REPORT_MRP_LIST2(
                                groupArgs,
                                contextValue,
                                [orderCd],
                            );

                            if (
                                Array.isArray(tRetArray) &&
                                tRetArray.length > 0 &&
                                String((tRetArray[0] && tRetArray[0].CODE) || '').includes('ERROR')
                            ) {
                                return tRetArray;
                            }
                        } finally {
                            if (insertedWork) {
                                try {
                                    await AFLib2.CommonFunc.DeleteMrpWork(
                                        tUserInfo.USER_ID,
                                        group.PO_CD,
                                    );
                                } catch (e2) {
                                    console.log('DeleteMrpWork failed', e2);
                                }
                            }
                        }
                    }
                }
            } catch (e) {
                return [
                    {
                        id: 0,
                        CODE: `ERROR:MRP List 생성중 오류가 발생했습니다.:${e}`,
                    },
                ];
            }

            return [{ id: 0, CODE: 'SUCCESS:MRP List 작성이 성공했습니다.' }];
        },

        mgrQueryS030513_REPORT_MRP_LIST3: async (_, args, contextValue) => {
            var tUserInfo = AFLib.getUserInfo(contextValue);

            try {
                var tOrderGroups = await buildOrderGroupsForMrp(args.data);
                if (tOrderGroups.length <= 0) {
                    return [{ id: 0, CODE: 'ERROR:ORDER_CDS/ORDER_INFOS is empty' }];
                }

                for (const group of tOrderGroups) {
                    for (const orderCd of group.ORDER_CDS) {
                        var tRet2 = await AFLib2.CommonFunc.CheckMrpWork(
                            tUserInfo.USER_ID,
                            group.PO_CD,
                        );
                        if (tRet2 > 0) {
                            try {
                                await AFLib2.CommonFunc.DeleteMrpWork(
                                    tUserInfo.USER_ID,
                                    group.PO_CD,
                                );
                            } catch (e2) {}
                            tRet2 = await AFLib2.CommonFunc.CheckMrpWork(
                                tUserInfo.USER_ID,
                                group.PO_CD,
                            );
                            if (tRet2 > 0) {
                                return [
                                    {
                                        id: 0,
                                        CODE: 'ERROR:현재 작업중입니다. 잠시후에 다시 조회해보세요.',
                                    },
                                ];
                            }
                        }
                        var insertedWork = false;
                        try {
                            await AFLib2.CommonFunc.InsertMrpWork(
                                tUserInfo.USER_ID,
                                group.PO_CD,
                                'WORKING:MRP_LIST3',
                                `S030513`,
                            );
                            insertedWork = true;

                            const groupArgs = {
                                ...args,
                                data: {
                                    ...args.data,
                                    PO_CD: group.PO_CD,
                                    PO_SEQ: group.PO_SEQ,
                                },
                            };

                            const tRetArray = await S030513_QRY_COMM.REPORT_MRP_LIST3(
                                groupArgs,
                                contextValue,
                                [orderCd],
                            );

                            if (
                                Array.isArray(tRetArray) &&
                                tRetArray.length > 0 &&
                                String((tRetArray[0] && tRetArray[0].CODE) || '').includes('ERROR')
                            ) {
                                return tRetArray;
                            }
                        } finally {
                            if (insertedWork) {
                                try {
                                    await AFLib2.CommonFunc.DeleteMrpWork(
                                        tUserInfo.USER_ID,
                                        group.PO_CD,
                                    );
                                } catch (e2) {
                                    console.log('DeleteMrpWork failed', e2);
                                }
                            }
                        }
                    }
                }
            } catch (e) {
                return [
                    {
                        id: 0,
                        CODE: `ERROR:처리중 오류가 발생했습니다:${e.message}`,
                    },
                ];
            }

            return [{ id: 0, CODE: 'SUCCESS:MRP List 작성이 성공했습니다.' }];
        },
    },
};

export default moduleQuery_S030513_2;
