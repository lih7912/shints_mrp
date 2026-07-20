import { Prisma } from '@prisma/client';
import prisma from './db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');
import AFLib from './commlib'; //PrismaClient 사용하기 위해 불러오기
import AFLib2 from './po_adjust'; //PrismaClient 사용하기 위해 불러오기
import axios from 'axios';
const path = require('path');
const Excel = require('exceljs');
const moment = require('moment');
const {
    generateUploadURL,
    deleteUploadObject,
    upload,
} = require('../routes/s3');
const { MongoClient } = require('mongodb');

const basicBorder = {
    top: {
        style: 'thin',
        color: {
            argb: 'FF000000',
        },
    },
    left: {
        style: 'thin',
        color: {
            argb: 'FF000000',
        },
    },
    bottom: {
        style: 'thin',
        color: {
            argb: 'FF000000',
        },
    },
    right: {
        style: 'thin',
        color: {
            argb: 'FF000000',
        },
    },
};

class RPT_S030514_QRY_COMM {
    async REPORT_MATL_LIST_NET_QTY(args, contextValue) {
        var tRetDate = AFLib.getCurrTime();
        var tRetDate1 = tRetDate.substring(0, 8);
        var tUserInfo = AFLib.getUserInfo(contextValue);
        var tInput = {
            ...args,
        };

        var tTitle = '';

        var tPoStr = 'All';
        if (args.data.PO_SEQ) tPoStr = args.data.PO_SEQ;

        if (args.data.OP_KIND === '0') {
            tTitle = `MATL_LIST_NET_QTY_${args.data.PO_CD}(${tPoStr})`;
        } else if (args.data.OP_KIND === '1') {
            tTitle = `MATL_LIST_POINT_${args.data.PO_CD}(${tPoStr})`;
        } else if (args.data.OP_KIND === '2') {
            tTitle = `MATL_LIST_PO_QTY_${args.data.PO_CD}(${tPoStr})`;
        } else if (args.data.OP_KIND === '3') {
            tTitle = `MATL_LIST_STSIN_QTY_${args.data.PO_CD}(${tPoStr})`;
        }

        // var tWExcelFile = `Partial List-${tUserInfo.USER_ID}-${tRetDate1}`;
        var tWExcelFile = '';
        var tRetExcelFile = '';

        var tPoCd = args.data.PO_CD;

        let sql0 = `
            select
                po_type,
                max(po_seq) as max_po_seq
            from
                ksv_po_mst
            where
                po_cd = '${tPoCd}'
                and po_seq < 97
            group by
                po_type
        `;
        var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
        var tPoType = '';
        var tMaxPoSeq = '1';
        var tFileKey = '';
        if (tRet0.length > 0) {
            tPoType = tRet0[0].po_type;
            tMaxPoSeq = tRet0[0].max_po_seq;
            // tFileKey = `${tPoCd}_${tMaxPoSeq}`;
            tFileKey = `${tPoCd}_${tPoStr}`;
            tTitle += `_${tMaxPoSeq}`;
        }

        var tSQL = '';
        if (tPoType === 'M') tSQL += `, count(b.prod_cd) as seq`;
        else tSQL += `, '1' as seq `;

        var tSQL1 = '';
        if (tPoType === 'M')
            tSQL1 += ` inner join KSV_ORDER_MEM AS B ON A.ORDER_CD = B.ORDER_CD `;

        let sql1 = `
            select
                a.order_cd ${tSQL},
                C.buyer_name,
                D.style_name,
                A.tot_cnt,
                A.due_date,
                E.factory_name,
                F.po_cd,
                G.po_date,
                G.matl_due_date,
                h.cd_name as order_status_n
            FROM
                KSV_ORDER_MST AS A ${tSQL1}
                inner join KCD_BUYER AS C ON LEFT(A.ORDER_CD, 2) = C.BUYER_CD
                inner join KCD_STYLE AS D ON A.STYLE_CD = D.STYLE_CD
                inner join KCD_FACTORY AS E ON A.FACTORY_CD = E.FACTORY_CD
                inner join KSV_PO_MEM AS F ON A.ORDER_CD = F.ORDER_CD
                inner join KSV_PO_MST AS G ON F.PO_CD = G.PO_CD
                inner join kcd_code as h on h.cd_code = a.order_status
                and h.cd_group = 'order_status'
            where
                f.po_cd = '${tPoCd}'
                and f.po_seq = '1'
                and g.po_seq = '1'
            GROUP BY
                A.ORDER_CD,
                C.BUYER_NAME,
                D.STYLE_NAME,
                A.TOT_CNT,
                A.DUE_DATE,
                E.FACTORY_NAME,
                F.PO_CD,
                G.PO_DATE,
                G.MATL_DUE_DATE,
                h.cd_name
            order by
                1
        `;
        var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
        var tBuyerCd = '';
        if (tRet1.length > 0) tBuyerCd = tRet1[0].order_cd.substring(0, 2);
        var tInfo = {
            ...tRet1[0],
        };

        try {
            var tPoCd = args.data.PO_CD;
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

            var tTemplateName = '';
            if (args.data.OP_KIND === '0') {
                // MatlList_Point .. price:13, 14
                tTemplateName = 'PO_MATLTOTAL';
            } else if (args.data.OP_KIND === '1') {
                // MatlList_NetQty .. price: 13, 14
                tTemplateName = 'PO_MATLTOTAL';
            } else if (args.data.OP_KIND === '2') {
                // MatlList_PoQty  .. price: 14, 15
                tTemplateName = 'PO_MATLTOTAL(POQty)';
            } else if (args.data.OP_KIND === '3') {
                // MatlList_STSIn
                tTemplateName = 'PO_MATL_IN';
            }
            var tTemplateExcel = `${tPath0}/${tTemplateName}.xlsx`;

            var tFileName = '';
            if (args.data.OP_KIND === '0') {
                if (args.data.IS_PRICE === '1') {
                    tFileName = `${tPoCd}-${tPoStr}(${tMaxPoSeq})-${tBuyerCd}-MATLTOTAL-${tRetDate1}(price)`;
                } else {
                    tFileName = `${tPoCd}-${tPoStr}(${tMaxPoSeq})-${tBuyerCd}-MATLTOTAL-${tRetDate1}`;
                }
            } else if (args.data.OP_KIND === '1') {
                if (args.data.IS_PRICE === '1') {
                    tFileName = `${tPoCd}-${tPoStr}(${tMaxPoSeq})-${tBuyerCd}-MATLTOTAL-POINT-${tRetDate1}(price)`;
                } else {
                    tFileName = `${tPoCd}-${tPoStr}(${tMaxPoSeq})-${tBuyerCd}-MATLTOTAL-POINT-${tRetDate1}`;
                }
            } else if (args.data.OP_KIND === '2') {
                if (args.data.IS_PRICE === '1') {
                    tFileName = `${tPoCd}-${tPoStr}(${tMaxPoSeq})-${tBuyerCd}-MATLTOTAL-POQTY-${tRetDate1}(price)`;
                } else {
                    tFileName = `${tPoCd}-${tPoStr}(${tMaxPoSeq}-${tBuyerCd}-MATLTOTAL-POQTY-${tRetDate1}`;
                }
            } else if (args.data.OP_KIND === '3') {
                tFileName = `${tPoCd}-MATLTOTAL(IN)-${tRetDate1}`;
            }
            tWExcelFile = tFileName;

            const wb = new Excel.Workbook();
            await wb.xlsx.readFile(tTemplateExcel);

            var tSheetName = `Sheet1`;
            var sheet = wb.getWorksheet(tSheetName);

            // Price Info 제거
            if (args.data.OP_KIND === '0' || args.data.OP_KIND === '1') {
                if (args.data.IS_PRICE !== '1') {
                    // Price 삭제 (Curr 유지, 헤더 '*'로 변경)
                    sheet.spliceColumns(12, 2);

                    // 헤더 수정
                    //sheet.getCell(6, 12).value = '*';
                    //sheet.getCell(6, 13).value = 'Need';
                }
            } else if (args.data.OP_KIND === '2') {
                if (args.data.IS_PRICE !== '1') {
                    // Price만 삭제 (Curr 유지, 헤더 '*'로 변경)
                    sheet.spliceColumns(14, 1);
                    sheet.getCell(6, 14).value = '*';
                }
            }

            // Order 정보
            var tOrdArray = [];
            var tRowIdx = 2;
            var tColIdx0 = 17;
            var tColIdx_Adj = 1;
            var tColIdx0_cnt = 0;
            if (args.data.OP_KIND === '0' || args.data.OP_KIND === '1') {
                tColIdx0 = 17;
                tColIdx_Adj = 1;
                if (args.data.IS_PRICE !== '1') tColIdx0 -= 2;
            } else if (args.data.OP_KIND === '2') {
                tColIdx0 = 16;
                tColIdx_Adj = 1;
                if (args.data.IS_PRICE !== '1') tColIdx0 -= 1;
            } else if (args.data.OP_KIND === '3') {
                tColIdx0 = 13;
                tColIdx_Adj = 3;
            }

            var tOrderColIdx = tColIdx0;
            var tStartIdx = tColIdx0;
            var tOrderRowIdxS = 2;

            tRet1.forEach((col, i) => {
                tOrdArray.push(col.order_cd);
                var tmpRow = [];
                if (tRowIdx > 2) {
                    sheet.insertRow(tRowIdx, tmpRow, 'i');
                }
                sheet.getCell(tRowIdx, 1).value = `(${i + 1})${col.order_cd}`;
                sheet.getCell(tRowIdx, 2).value = col.seq;
                sheet.getCell(tRowIdx, 3).value = col.buyer_name;
                sheet.getCell(tRowIdx, 5).value = col.style_name;
                sheet.getCell(tRowIdx, 7).value = parseFloat(col.tot_cnt);
                sheet.getCell(tRowIdx, 8).value = moment(
                    col.due_date,
                    'YYYYMMDD',
                ).format('YYYY-MM-DD');
                sheet.getCell(tRowIdx, 9).value = col.factory_name;
                sheet.getCell(tRowIdx, 11).value = col.order_status_n;
                tRowIdx += 1;

                var tmpArray2 = [];
                var tmpArray3 = [];
                sheet.spliceColumns(tColIdx0, 0, tmpArray2);
                tColIdx0 += 1;
                tColIdx0_cnt += 1;

                if (args.data.IS_PRICE === '1') {
                    sheet.spliceColumns(tColIdx0, 0, tmpArray2);
                    tColIdx0 += 1;
                    tColIdx0_cnt += 1;
                }
            });
            sheet.insertRow(tRowIdx, tmpRow, 'i');
            // Order 정보 Styling
            var tStockColIdx = 0;
            var tEndIdx = tColIdx0 - 1;
            var tOrderRowIdxE = tRowIdx;
            var tIdx89 = 0;
            for (
                tIdx89 = tOrderRowIdxS + 1;
                tIdx89 <= tOrderRowIdxE;
                tIdx89++
            ) {
                var tIdx = 1;
                for (tIdx = 1; tIdx < 30; tIdx++) {
                    sheet.getCell(tIdx89, tIdx).border = basicBorder;
                }
            }

            if (args.data.OP_KIND === '0' || args.data.OP_KIND === '1') {
                sheet.spliceColumns(tColIdx0, 2);
            } else if (args.data.OP_KIND === '2') {
                sheet.spliceColumns(tColIdx0, 2);
            } else if (args.data.OP_KIND === '3') {
                sheet.spliceColumns(tColIdx0, 2);
            }

            var tRetStsIn = [];
            var tStsInColIdx = tColIdx0 + 1;
            if (args.data.OP_KIND === '3') {
                tColIdx0 += 1;
                let sql97 = `
                    select distinct
                        left(in_datetime, 8) as in_datetime
                    from
                        ksv_stock_in
                    where
                        po_cd = '${tPoCd}'
                    order by
                        1
                `;
                tRetStsIn = await prisma.$queryRaw(Prisma.raw(sql97));

                var tmpArray2 = [];
                var tmpArray3 = [];
                tRetStsIn.forEach((col, i) => {
                    sheet.spliceColumns(tColIdx0, 0, tmpArray2);
                    tColIdx0 += 1;
                    tColIdx0_cnt += 1;
                });
                sheet.spliceColumns(tColIdx0, 2);
            }

            // 기본정보
            sheet.getCell(1, 15).value = `발주번호 : ${tInfo.po_cd}`;
            sheet.getCell(1, 15).style = {
                font: {
                    name: '돋움',
                    bold: true,
                    size: 15
                },
            };

            sheet.getCell(2, 15).value =
                `발주일자 : ${moment(tInfo.po_date, 'YYYYMMDD').format('YYYY-MM-DD')}`;
            sheet.getCell(3, 15).value =
                `납품기한 : ${moment(tInfo.matl_due_date, 'YYYYMMDD').format('YYYY-MM-DD')}`;
            sheet.getCell(4, 15).value =
                `작성날짜 : ${moment(tRetDate1, 'YYYYMMDD').format('YYYY-MM-DD')}`;

            // 주문 요약 상단 영역 테두리 제거
            for (let r = 2; r <= tOrderRowIdxE; r++) {
                const row = sheet.getRow(r);
                for (let c = 1; c <= 27; c++) {
                    row.getCell(c).border = {};
                }
            }

            // Matl Info
            tRowIdx += 3;
            var tHeaderIdx = tRowIdx - 1;

            // 주문영역(상단 요약) 테두리는 유지하고, 그 아래 빈 영역만 초기화
            for (let r = tOrderRowIdxE + 1; r < tHeaderIdx; r++) {
                const row = sheet.getRow(r);

                for (let c = 1; c <= 27; c++) {
                    row.getCell(c).border = {};
                }
            }

            // Order Header 정보 입력
            var tTmpIdx = tOrderColIdx;
            const hasSeparatedPriceOrderColumns =
                args.data.IS_PRICE === '1' &&
                (args.data.OP_KIND === '0' || args.data.OP_KIND === '1');
            const tOrderAmtColIdx = hasSeparatedPriceOrderColumns
                ? tOrderColIdx + tRet1.length + 1
                : 0;
            tRet1.forEach((col2, i2) => {
                if (hasSeparatedPriceOrderColumns) {
                    const qtyHeaderCell = sheet.getCell(
                        tHeaderIdx,
                        tOrderColIdx + i2,
                    );
                    qtyHeaderCell.value = `Ord ${i2 + 1}`;
                    qtyHeaderCell.font = {
                        name: '돋움',
                        bold: true,
                    };
                    qtyHeaderCell.border = basicBorder;

                    const amtHeaderCell = sheet.getCell(
                        tHeaderIdx,
                        tOrderAmtColIdx + i2,
                    );
                    amtHeaderCell.value = `Ord ${i2 + 1}`;
                    amtHeaderCell.font = {
                        name: '돋움',
                        bold: true,
                    };
                    amtHeaderCell.border = basicBorder;
                } else {
                    sheet.getCell(tHeaderIdx, tTmpIdx).value = `Ord ${i2 + 1}`;
                    sheet.getCell(tHeaderIdx, tTmpIdx).font = {
                        name: '돋움',
                        bold: true,
                    };
                    sheet.getCell(tHeaderIdx, tTmpIdx).border = basicBorder;
                    tTmpIdx += 1;
                    if (args.data.IS_PRICE === '1') {
                        sheet.getCell(tHeaderIdx, tTmpIdx).border =
                            basicBorder;
                        tTmpIdx += 1;
                    }
                }
            });

            if (hasSeparatedPriceOrderColumns) {
                const separatorHeaderCell = sheet.getCell(
                    tHeaderIdx,
                    tOrderColIdx + tRet1.length,
                );
                separatorHeaderCell.border = basicBorder;
            }

            if (args.data.OP_KIND === '3') {
                // STS-IN Header 정보 입력
                tRetStsIn.forEach((col2, i2) => {
                    sheet.getCell(tHeaderIdx, tStsInColIdx + i2).value =
                        col2.in_datetime;
                    sheet.getCell(tHeaderIdx, tStsInColIdx + i2).border =
                        basicBorder;
                });
            }

            let sql2 = `
                select distinct
                    po_matl_cd
                from
                    ksv_po_mrp
                where
                    po_cd = '${tPoCd}'
                    and use_po_type = '2'
                    and diff_po_type <> '2'
            `;
            var tRet2 = await prisma.$queryRaw(Prisma.raw(sql2));
            var tStockMatlCount = tRet2.length;
            var tStockMatlArray = [];
            tRet2.forEach((col, i) => {
                tStockMatlArray.push(col.po_matl_cd);
            });

            let sql3 = '';
            if (args.data.IS_PRICE === '1') {
                sql3 = `
                    SELECT
                        a.po_cd,
                        a.vendor_cd,
                        c.vendor_name,
                        a.pr_num,
                        a.matl_cd,
                        b.matl_name,
                        b.color,
                        b.spec,
                        b.unit,
                        a.tot_cnt,
                        d.matl_price,
                        d.curr_cd,
                        a.ord_cnt,
                        '' as col1,
                        a.reg_user,
                        a.reg_datetime,
                        '' as col2,
                        isnull(a.stock_qty, 0) as stock_qty,
                        a.remark,
                        e.matl_type2
                    FROM
                        KSV_PO_MATLLIST a,
                        kcd_matl_mst b,
                        kcd_vendor c,
                        kcd_matl_mem d,
                        kcd_matl_type2 e
                    WHERE
                        a.VENDOR_CD = c.VENDOR_CD
                        and a.matl_cd = b.matl_cd
                        and b.matl_cd = d.matl_cd
                        and a.matl_seq = d.matl_seq
                        and b.matl_type2 = e.seq
                        and PO_CD = '${tPoCd}'
                    ORDER BY
                        c.VENDOR_NAME,
                        LEN(a.PR_NUM),
                        a.PR_NUM,
                        b.matl_name,
                        b.spec
                `;
            } else {
                sql3 = `
                    SELECT
                        a.po_cd,
                        a.vendor_cd,
                        c.vendor_name,
                        a.pr_num,
                        a.matl_cd,
                        b.matl_name,
                        b.color,
                        b.spec,
                        b.unit,
                        a.tot_cnt,
                        '' as matl_price,
                        d.curr_cd,
                        a.ord_cnt,
                        '' as col1,
                        a.reg_user,
                        a.reg_datetime,
                        '' as col2,
                        isnull(a.stock_qty, 0) as stock_qty,
                        a.remark,
                        e.matl_type2
                    FROM
                        KSV_PO_MATLLIST a,
                        kcd_matl_mst b,
                        kcd_vendor c,
                        kcd_matl_mem d,
                        kcd_matl_type2 e
                    WHERE
                        a.VENDOR_CD = c.VENDOR_CD
                        and a.matl_cd = b.matl_cd
                        and b.matl_cd = d.matl_cd
                        and a.matl_seq = d.matl_seq
                        and b.matl_type2 = e.seq
                        and PO_CD = '${tPoCd}'
                    group by
                        a.PO_CD,
                        a.vendor_cd,
                        c.vendor_name,
                        a.matl_cd,
                        b.matl_name,
                        b.color,
                        b.spec,
                        b.unit,
                        a.tot_cnt,
                        d.curr_cd,
                        a.ord_cnt,
                        a.reg_user,
                        a.reg_datetime,
                        a.stock_qty,
                        a.remark,
                        a.pr_num,
                        e.matl_type2
                    order by
                        c.vendor_name,
                        LEN(a.PR_NUM),
                        b.matl_name,
                        b.color,
                        b.spec
                `;
            }
            var tRet3 = await prisma.$queryRaw(Prisma.raw(sql3));

            var sql4 = `
                select
                    isnull(max(po_seq), 0) as max_po_seq
                from
                    ksv_po_mrp
                where
                    po_cd = '${tPoCd}'
                    and po_seq > 1
                    and po_seq < 98
            `;
            var tRet4 = await prisma.$queryRaw(Prisma.raw(sql4));
            var tPoSeq = tRet4[0].max_po_seq;

            var sql5 = `
                select distinct
                    matl_cd
                from
                    ksv_po_mrp
                where
                    po_cd = '${tPoCd}'
                    and po_seq = '${tPoSeq}'
            `;
            var tRet5 = await prisma.$queryRaw(Prisma.raw(sql5));
            var tMatlCdArray = [];
            tRet5.forEach((col, i) => {
                tMatlCdArray.push(col.matl_cd);
            });

            var sql6 = `
                select
                    a.curr_cd,
                    a.usd_rate
                from
                    kcd_currency a,
                    kcd_code b
                where
                    a.start_date = '${tRetDate1}'
                    and a.curr_cd = b.cd_code
                    and b.cd_group = 'CURR_CD'
            `;
            var tRet6 = await prisma.$queryRaw(Prisma.raw(sql6));

            var tSaveVendor = '';
            var tFixCol = 0;
            var tIdx3 = 0;
            var tMatlRowS = tRowIdx;
            const supplierStartRows = new Set<number>();
            const getLastUsedColumnInRow = (rowNumber: number) => {
                let lastColumn = 1;
                const row = sheet.getRow(rowNumber);

                row.eachCell(
                    {
                        includeEmpty: false,
                    },
                    (cell, colNumber) => {
                        if (
                            cell.value !== null &&
                            cell.value !== undefined &&
                            cell.value !== ''
                        ) {
                            lastColumn = colNumber;
                        }
                    },
                );

                return lastColumn;
            };
            for (tIdx3 = 0; tIdx3 < tRet3.length; tIdx3++) {
                var col = {
                    ...tRet3[tIdx3],
                };
                var tmpRow = [];
                var tColIdx = 0;
                let supplierDividerRow = 0;

                if (tIdx3 > 0 && tSaveVendor !== col.vendor_name) {
                    supplierDividerRow = tRowIdx;
                    tRowIdx += 1;
                }
                // if (tIdx3 > 0) sheet.insertRow(tRowIdx, tmpRow, 'i');
                sheet.getCell(tRowIdx, 1).value = col.vendor_name;
                sheet.mergeCells(tRowIdx, 1, tRowIdx, 2);
                sheet.getCell(tRowIdx, 3).value = col.pr_num;
                sheet.getCell(tRowIdx, 4).value = col.matl_cd;
                sheet.getCell(tRowIdx, 5).value = col.matl_name;
                sheet.mergeCells(tRowIdx, 5, tRowIdx, 6);
                // sheet.getCell(tRowIdx, 7).value = `'${col.color}`;
                sheet.getCell(tRowIdx, 7).value = String(`${col.color}`);
                sheet.getCell(tRowIdx, 8).value = col.spec;
                sheet.mergeCells(tRowIdx, 8, tRowIdx, 9);
                sheet.getCell(tRowIdx, 10).value = col.unit;

                if (args.data.OP_KIND === '0' || args.data.OP_KIND === '1') {
                    sheet.getCell(tRowIdx, 11).value = Math.round(
                        parseFloat(col.tot_cnt),
                    ); // MRP Qty

                    var tFlag = 0;
                    tStockMatlArray.forEach((col1, i1) => {
                        if (col1.po_matl_cd === col.matl_cd) tFlag = 1;
                    });
                    if (tFlag === 1) {
                        sheet.getCell(tRowIdx, 12).value = '*';
                        sheet.getCell(tRowIdx, 12).alignment = {
                            horizontal: 'center',
                            vertical: 'middle',
                        };
                    }
                    else sheet.getCell(tRowIdx, 12).value = '';

                    if (args.data.IS_PRICE === '1') {
                        if (parseFloat(col.stock_qty) > 0) {
                            sheet.getCell(tRowIdx, 4).value = `${col.matl_cd}`;
                            sheet.getCell(tRowIdx, 12).value = `*`;
                            sheet.getCell(tHeaderIdx, 12).value = `*`;
                        }

                        sheet.getCell(tRowIdx, 13).value = col.matl_price;
                        sheet.getCell(tRowIdx, 13).numFmt = '#,##0.0000';
                        sheet.getCell(tRowIdx, 14).value = col.curr_cd;
                        sheet.getCell(tRowIdx, 15).value = col.stock_qty; // Stock Qty
                        sheet.getCell(tRowIdx, 16).value = Math.round(
                            parseFloat(col.tot_cnt) - parseFloat(col.stock_qty),
                        ); // Need Qty

                        tColIdx = 17;
                        tStockColIdx = 15;
                    } else {
                        sheet.getCell(tRowIdx, 13).value = col.stock_qty; // Stock Qty
                        if (parseFloat(col.stock_qty) > 0) {
                            sheet.getCell(tRowIdx, 4).value = `${col.matl_cd}`;
                            sheet.getCell(tRowIdx, 12).value = `*`;
                            sheet.getCell(tHeaderIdx, 12).value = `*`;
                            sheet.getCell(tRowIdx, 12).alignment = {
                                horizontal: 'center',
                                vertical: 'middle',
                            };
                        }
                        sheet.getCell(tRowIdx, 14).value = Math.round(
                            parseFloat(col.tot_cnt) - parseFloat(col.stock_qty),
                        ); // Need Qty
                        tStockColIdx = 13;
                        tColIdx = 15;
                    }
                }
                if (args.data.OP_KIND === '3') {
                    sheet.getCell(tRowIdx, 11).value = Math.round(col.tot_cnt); // MRP Qty
                    var tFlag = 0;
                    tStockMatlArray.forEach((col1, i1) => {
                        if (col1.po_matl_cd === col.matl_cd) tFlag = 1;
                    });
                    if (tFlag === 1) {
                        sheet.getCell(tRowIdx, 12).value = '*';
                        sheet.getCell(tRowIdx, 12).alignment = {
                            horizontal: 'center',
                            vertical: 'middle',
                        };
                    } else {
                        sheet.getCell(tRowIdx, 12).value = '';
                    }
                    tColIdx = 13;
                } else if (args.data.OP_KIND === '2') {
                    //sheet.getCell(tRowIdx, 11).value = Math.round(parseFloat(col.tot_cnt)-parseFloat(col.stock_qty)); // Need Qty
                    sheet.getCell(tRowIdx, 11).value = Math.round(
                        parseFloat(col.tot_cnt),
                    ); // Need Qty
                    var sql98 = `
                        select
                            po_cd,
                            matl_cd,
                            sum(po_qty) as qty
                        from
                            ksv_po_mrp
                        where
                            po_cd = '${tPoCd}'
                            and use_po_type <> '2'
                            and matl_cd = '${col.matl_cd}'
                        group by
                            po_cd,
                            matl_cd
                    `;
                    var tRet98 = await prisma.$queryRaw(Prisma.raw(sql98));
                    var tPoQty = 0;
                    if (tRet98.length > 0) tPoQty = tRet98[0].qty;
                    sheet.getCell(tRowIdx, 12).value = Math.round(tPoQty); // Po Qty

                    if (parseFloat(col.stock_qty) > 0) {
                        sheet.getCell(tRowIdx, 13).value = `*`;
                        sheet.getCell(tHeaderIdx, 13).value = `*`;
                        sheet.getCell(tRowIdx, 13).alignment = {
                            horizontal: 'center',
                            vertical: 'middle',
                        };
                    }


                    if (args.data.IS_PRICE === '1') {
                        sheet.getCell(tRowIdx, 14).value = col.matl_price;
                        sheet.getCell(tRowIdx, 15).value = col.curr_cd;
                        tColIdx = 16;
                    } else {
                        sheet.getCell(tRowIdx, 14).value = col.curr_cd;
                        tColIdx = 15;
                    }
                }

                var tUsdRate = 0;
                tRet6.forEach((col4, i4) => {
                    if (col4.curr_cd === col.curr_cd) tUsdRate = col4.usd_rate;
                });

                // Order 수량 입력
                var tOrderColS = 0;
                var tOrderColE = 0;
                if (args.data.OP_KIND === '0') {
                    if (hasSeparatedPriceOrderColumns) {
                        const qtyStartCol = tColIdx;
                        const amtStartCol = qtyStartCol + tRet1.length + 1;

                        tOrderColS = qtyStartCol;
                        tRet1.forEach((col3, i3) => {
                            const qtyColIdx = qtyStartCol + i3;
                            const amtColIdx = amtStartCol + i3;
                            const tOrderCnt = col.ord_cnt.substring(
                                8 * i3,
                                8 * (i3 + 1),
                            );
                            const isEmptyOrderCnt =
                                tOrderCnt === '00000000' ||
                                tOrderCnt === '________';

                            if (isEmptyOrderCnt) {
                                sheet.getCell(tRowIdx, qtyColIdx).value = 0;
                                sheet.getCell(tRowIdx, qtyColIdx).alignment = {
                                    horizontal: 'right',
                                    vertical: 'middle',
                                };
                                sheet.getCell(tRowIdx, amtColIdx).value = 0;
                                sheet.getCell(tRowIdx, amtColIdx).alignment = {
                                    horizontal: 'right',
                                    vertical: 'middle',
                                };
                            } else {
                                sheet.getCell(tRowIdx, qtyColIdx).value =
                                    Number(parseFloat(tOrderCnt).toFixed(0));
                                sheet.getCell(tRowIdx, qtyColIdx).numFmt =
                                    '#,##0';
                                sheet.getCell(tRowIdx, qtyColIdx).alignment = {
                                    horizontal: 'right',
                                    vertical: 'middle',
                                };
                                sheet.getCell(tRowIdx, amtColIdx).value =
                                    Number(
                                        (
                                            parseFloat(tOrderCnt) *
                                            parseFloat(col.matl_price) *
                                            parseFloat(tUsdRate)
                                        ).toFixed(2),
                                    );
                                sheet.getCell(tRowIdx, amtColIdx).alignment = {
                                    horizontal: 'right',
                                    vertical: 'middle',
                                };
                                sheet.getCell(tRowIdx, amtColIdx).numFmt =
                                    '#,##0.00';
                            }
                        });
                        tColIdx = amtStartCol + tRet1.length;
                    } else {
                        tOrderColS = tColIdx;
                        tRet1.forEach((col3, i3) => {
                            var tOrderCnt = col.ord_cnt.substring(
                                8 * i3,
                                8 * (i3 + 1),
                            );
                            if (
                                tOrderCnt === '00000000' ||
                                tOrderCnt === '________'
                            ) {
                                sheet.getCell(tRowIdx, tColIdx).value = 0;
                                sheet.getCell(tRowIdx, tColIdx).alignment = {
                                    horizontal: 'right',
                                    vertical: 'middle',
                                };
                            } else {
                                sheet.getCell(tRowIdx, tColIdx).value = Number(
                                    parseFloat(tOrderCnt).toFixed(0),
                                );
                                sheet.getCell(tRowIdx, tColIdx).numFmt = '#,##0';
                                sheet.getCell(tRowIdx, tColIdx).alignment = {
                                    horizontal: 'right',
                                    vertical: 'middle',
                                };
                            }
                            tColIdx += 1;
                            if (args.data.IS_PRICE === '1') {
                                tColIdx += 2;
                                if (
                                    tOrderCnt === '00000000' ||
                                    tOrderCnt === '________'
                                ) {
                                    sheet.getCell(tRowIdx, tColIdx).value = 0;
                                    sheet.getCell(tRowIdx, tColIdx).alignment = {
                                        horizontal: 'right',
                                        vertical: 'middle',
                                    };
                                } else {
                                    sheet.getCell(tRowIdx, tColIdx).value = Number(
                                        (
                                            parseFloat(tOrderCnt) *
                                            parseFloat(col.matl_price) *
                                            parseFloat(tUsdRate)
                                        ).toFixed(2),
                                    );
                                    sheet.getCell(tRowIdx, tColIdx).alignment = {
                                        horizontal: 'right',
                                        vertical: 'middle',
                                    };
                                    sheet.getCell(tRowIdx, tColIdx).numFmt =
                                        '#,##0.00';
                                }

                                tColIdx += 1;
                            }
                        });
                    }
                    tOrderColE = tColIdx;
                    tFixCol = tColIdx;
                    sheet.getCell(tRowIdx, tColIdx + 5).value = col.remark;
                    sheet.getCell(tRowIdx, tColIdx + 6).value = col.matl_type2;
                    sheet.getCell(tHeaderIdx, tColIdx + 6).value = 'Kind2';
                } else if (args.data.OP_KIND === '1') {
                    var tIdx99 = 0;
                    if (hasSeparatedPriceOrderColumns) {
                        const qtyStartCol = tColIdx;
                        const amtStartCol = qtyStartCol + tRet1.length + 1;

                        tOrderColS = qtyStartCol;
                        for (tIdx99 = 0; tIdx99 < tRet1.length; tIdx99++) {
                            var col3 = {
                                ...tRet1[tIdx99],
                            };
                            var sql99 = `
                                select
                                    a.matl_cd,
                                    a.order_cd,
                                    isnull(sum(a.net_qty), 0) as net_qty
                                from
                                    ksv_po_mrpnet as a
                                where
                                    po_cd = '${tPoCd}'
                                    and matl_cd = '${col.matl_cd}'
                                    and order_cd = '${col3.order_cd}'
                                group by
                                    a.matl_cd,
                                    a.order_cd
                            `;
                            var tRet99 = await prisma.$queryRaw(
                                Prisma.raw(sql99),
                            );
                            var tOrderCnt = 0;
                            const qtyColIdx = qtyStartCol + tIdx99;
                            const amtColIdx = amtStartCol + tIdx99;

                            if (tRet99.length > 0) {
                                tOrderCnt = tRet99[0].net_qty;
                                sheet.getCell(tRowIdx, qtyColIdx).value =
                                    Number(tRet99[0].net_qty.toFixed(2));
                                sheet.getCell(tRowIdx, qtyColIdx).numFmt =
                                    '#,##0.00';
                                sheet.getCell(tRowIdx, qtyColIdx).alignment = {
                                    horizontal: 'right',
                                    vertical: 'middle',
                                };
                            } else {
                                sheet.getCell(tRowIdx, qtyColIdx).value = 0;
                                sheet.getCell(tRowIdx, qtyColIdx).alignment = {
                                    horizontal: 'right',
                                    vertical: 'middle',
                                };
                                sheet.getCell(tRowIdx, qtyColIdx).numFmt =
                                    '#,##0';
                            }

                            sheet.getCell(tRowIdx, amtColIdx).value = Number(
                                (
                                    parseFloat(tOrderCnt) *
                                    parseFloat(col.matl_price) *
                                    parseFloat(tUsdRate)
                                ).toFixed(2),
                            );
                            sheet.getCell(tRowIdx, amtColIdx).alignment = {
                                horizontal: 'right',
                                vertical: 'middle',
                            };
                            sheet.getCell(tRowIdx, amtColIdx).numFmt =
                                '#,##0.00';
                        }
                        tColIdx = amtStartCol + tRet1.length;
                    } else {
                        tOrderColS = tColIdx;
                        for (tIdx99 = 0; tIdx99 < tRet1.length; tIdx99++) {
                            var col3 = {
                                ...tRet1[tIdx99],
                            };
                            var sql99 = `
                                select
                                    a.matl_cd,
                                    a.order_cd,
                                    isnull(sum(a.net_qty), 0) as net_qty
                                from
                                    ksv_po_mrpnet as a
                                where
                                    po_cd = '${tPoCd}'
                                    and matl_cd = '${col.matl_cd}'
                                    and order_cd = '${col3.order_cd}'
                                group by
                                    a.matl_cd,
                                    a.order_cd
                            `;
                            var tRet99 = await prisma.$queryRaw(
                                Prisma.raw(sql99),
                            );
                            var tOrderCnt = 0;
                            if (tRet99.length > 0) {
                                tOrderCnt = tRet99[0].net_qty;
                                sheet.getCell(tRowIdx, tColIdx).value = Number(
                                    tRet99[0].net_qty.toFixed(2),
                                );
                                sheet.getCell(tRowIdx, tColIdx).numFmt = '#,##0.00';
                                sheet.getCell(tRowIdx, tColIdx).alignment = {
                                    horizontal: 'right',
                                    vertical: 'middle',
                                };
                            } else {
                                sheet.getCell(tRowIdx, tColIdx).value = 0;
                                sheet.getCell(tRowIdx, tColIdx).alignment = {
                                    horizontal: 'right',
                                    vertical: 'middle',
                                };
                                sheet.getCell(tRowIdx, tColIdx).numFmt = '#,##0';
                            }
                            tColIdx += 1;
                            if (args.data.IS_PRICE === '1') {
                                sheet.getCell(tRowIdx, tColIdx).value = Number(
                                    (
                                        parseFloat(tOrderCnt) *
                                        parseFloat(col.matl_price) *
                                        parseFloat(tUsdRate)
                                    ).toFixed(2),
                                );
                                sheet.getCell(tRowIdx, tColIdx).alignment = {
                                    horizontal: 'right',
                                    vertical: 'middle',
                                };
                                sheet.getCell(tRowIdx, tColIdx).numFmt = '#,##0.00';
                                tColIdx += 1;
                            }
                        }
                    }
                    tOrderColE = tColIdx;
                    tFixCol = tColIdx;
                    sheet.getCell(tRowIdx, tColIdx + 5).value = col.remark;
                    sheet.getCell(tRowIdx, tColIdx + 6).value = col.matl_type2;
                    sheet.getCell(tHeaderIdx, tColIdx + 6).value = 'Kind2';
                } else if (args.data.OP_KIND === '2') {
                    tOrderColS = tColIdx;
                    tRet1.forEach((col3, i3) => {
                        var tOrderCnt = col.ord_cnt.substring(
                            8 * i3,
                            8 * (i3 + 1),
                        );
                        if (
                            tOrderCnt === '00000000' ||
                            tOrderCnt === '________'
                        ) {
                            sheet.getCell(tRowIdx, tColIdx).value = 0;
                            sheet.getCell(tRowIdx, tColIdx).alignment = {
                                horizontal: 'right',
                                vertical: 'middle',
                            };
                            sheet.getCell(tRowIdx, tColIdx).numFmt = '#,##0';
                        } else {
                            sheet.getCell(tRowIdx, tColIdx).value = Number(
                                parseFloat(tOrderCnt).toFixed(2),
                            );
                            sheet.getCell(tRowIdx, tColIdx).alignment = {
                                horizontal: 'right',
                                vertical: 'middle',
                            };
                            sheet.getCell(tRowIdx, tColIdx).numFmt = '#,##0.00';
                        }

                        tColIdx += 1;
                        if (args.data.IS_PRICE === '1') {
                            if (
                                tOrderCnt === '00000000' ||
                                tOrderCnt === '________'
                            ) {
                                sheet.getCell(tRowIdx, tColIdx).value = 0;
                                sheet.getCell(tRowIdx, tColIdx).alignment = {
                                    horizontal: 'right',
                                    vertical: 'middle',
                                };
                                sheet.getCell(tRowIdx, tColIdx).numFmt =
                                    '#,##0';
                            } else {
                                sheet.getCell(tRowIdx, tColIdx).value = Number(
                                    (
                                        parseFloat(tOrderCnt) *
                                        parseFloat(col.matl_price) *
                                        parseFloat(tUsdRate)
                                    ).toFixed(2),
                                );
                                sheet.getCell(tRowIdx, tColIdx).alignment = {
                                    horizontal: 'right',
                                    vertical: 'middle',
                                };
                                sheet.getCell(tRowIdx, tColIdx).numFmt =
                                    '#,##0.00';
                            }
                            tColIdx += 1;
                        }
                    });
                    tOrderColE = tColIdx;
                    sheet.getCell(tRowIdx, tColIdx).value = col.stock_qty;
                    if (parseFloat(col.stock_qty) > 0)
                        sheet.getCell(tRowIdx, 4).value = `*${col.matl_cd}`;
                    tFixCol = tColIdx;
                    sheet.getCell(tRowIdx, tColIdx + 5).value = col.remark;
                    sheet.getCell(tRowIdx, tColIdx + 6).value = col.matl_type2;
                    sheet.getCell(tHeaderIdx, tColIdx + 6).value = 'Kind2';
                } else if (args.data.OP_KIND === '3') {
                    tOrderColS = tColIdx;
                    tRet1.forEach((col3, i3) => {
                        var tOrderCnt = col.ord_cnt.substring(
                            8 * i3,
                            8 * (i3 + 1),
                        );
                        if (
                            tOrderCnt === '00000000' ||
                            tOrderCnt === '________'
                        ) {
                            sheet.getCell(tRowIdx, tColIdx).value = 0;
                            sheet.getCell(tRowIdx, tColIdx).alignment = {
                                horizontal: 'right',
                                vertical: 'middle',
                            };
                            sheet.getCell(tRowIdx, tColIdx).numFmt = '#,##0';
                        } else {
                            sheet.getCell(tRowIdx, tColIdx).value = Number(
                                parseFloat(tOrderCnt).toFixed(2),
                            );
                            sheet.getCell(tRowIdx, tColIdx).alignment = {
                                horizontal: 'right',
                                vertical: 'middle',
                            };
                            sheet.getCell(tRowIdx, tColIdx).numFmt = '#,##0.00';
                        }
                        tColIdx += 1;
                        if (args.data.IS_PRICE === '1') {
                            if (
                                tOrderCnt === '00000000' ||
                                tOrderCnt === '________'
                            ) {
                                sheet.getCell(tRowIdx, tColIdx).value = 0;
                                sheet.getCell(tRowIdx, tColIdx).alignment = {
                                    horizontal: 'right',
                                    vertical: 'middle',
                                };
                                sheet.getCell(tRowIdx, tColIdx).numFmt =
                                    '#,##0';
                            } else {
                                sheet.getCell(tRowIdx, tColIdx).value = Number(
                                    (
                                        parseFloat(tOrderCnt) *
                                        parseFloat(col.matl_price) *
                                        parseFloat(tUsdRate)
                                    ).toFixed(2),
                                );
                                sheet.getCell(tRowIdx, tColIdx).alignment = {
                                    horizontal: 'right',
                                    vertical: 'middle',
                                };
                                sheet.getCell(tRowIdx, tColIdx).numFmt =
                                    '#,##0.00';
                            }
                            tColIdx += 1;
                        }
                    });

                    tOrderColE = tColIdx;
                    tColIdx += 1;
                    var tIdxStsIn = 0;
                    var tTotStsIn = 0;
                    for (
                        tIdxStsIn = 0;
                        tIdxStsIn < tRetStsIn.length;
                        tIdxStsIn++
                    ) {
                        var tOne = {
                            ...tRetStsIn[tIdxStsIn],
                        };
                        var sql96 = `
                            select
                                isnull(sum(in_qty), 0) as in_qty
                            from
                                ksv_stock_in
                            where
                                po_cd = '${tPoCd}'
                                and matl_cd = '${col.matl_cd}'
                                and left(in_datetime, 8) = '${tOne.in_datetime}'
                        `;
                        var tRet96 = await prisma.$queryRaw(Prisma.raw(sql96));
                        var tStsInCnt = 0;
                        if (tRet96.length > 0) tStsInCnt = tRet96[0].in_qty;
                        sheet.getCell(tRowIdx, tColIdx).value = tStsInCnt;
                        tTotStsIn += tStsInCnt;
                        tColIdx += 1;
                    }

                    sheet.getCell(tRowIdx, tColIdx).value = col.stock_qty;
                    if (parseFloat(col.stock_qty) > 0)
                        sheet.getCell(tRowIdx, 4).value = `*${col.matl_cd}`;
                    tColIdx += 1;

                    var tTotal = tTotStsIn + parseFloat(col.stock_qty);
                    sheet.getCell(tRowIdx, tColIdx).value = tTotal;
                    tColIdx += 1;

                    var tBal = parseFloat(col.tot_cnt) - tTotal;
                    sheet.getCell(tRowIdx, tColIdx).value = tBal;
                    tColIdx += 1;

                    tFixCol = tColIdx;
                    sheet.getCell(tRowIdx, tColIdx).value = col.remark;
                    sheet.getCell(tRowIdx, tColIdx + 1).value = col.matl_type2;
                    sheet.getCell(tHeaderIdx, tColIdx + 1).value = 'Kind2';
                }

                if (supplierDividerRow > 0) {
                    const endColumn = tColIdx + 6;

                    // Divider row: 데이터 행과 같이 mergeCells 적용
                    sheet.mergeCells(supplierDividerRow, 1, supplierDividerRow, 2);
                    sheet.mergeCells(supplierDividerRow, 5, supplierDividerRow, 6);
                    sheet.mergeCells(supplierDividerRow, 8, supplierDividerRow, 9);

                    // Divider row에 배경색과 헤더와 같은 테두리 추가
                    const dividerRow = sheet.getRow(supplierDividerRow);
                    for (let c = 1; c <= endColumn; c++) {
                        dividerRow.getCell(c).fill = {
                            type: 'pattern',
                            pattern: 'solid',
                            fgColor: {
                                argb: 'FFFFF8CE',
                            },
                        };
                        dividerRow.getCell(c).border = basicBorder;
                    }

                    // 다음 ROW(첫 번째 데이터 행)에 테두리 추가
                    const dataRow = sheet.getRow(tRowIdx);
                    for (let c = 1; c <= endColumn; c++) {
                        dataRow.getCell(c).border = basicBorder;
                    }

                    supplierStartRows.add(tRowIdx);
                }

                tRowIdx += 1;
                tSaveVendor = col.vendor_name;
            }
            var tMatlRowE = tRowIdx;
            tIdx89 = 0;
            for (tIdx89 = tMatlRowS; tIdx89 <= tMatlRowE; tIdx89++) {
                var tIdx = 1;
                for (tIdx = 1; tIdx < tColIdx + 7; tIdx++) {
                    // supplierStartRows의 행들도 테두리 유지
                    sheet.getCell(tIdx89, tIdx).border = basicBorder;
                    if (tIdx89 === tMatlRowS && tOrderColS > 0) {
                        tOrderColE = tColIdx - 1;
                        if (tIdx >= tOrderColS && tIdx <= tOrderColE) {
                            sheet.getCell(tHeaderIdx, tIdx).fill = {
                                type: 'pattern',
                                pattern: 'solid',
                                fgColor: {
                                    argb: 'FFFFFF99',
                                },
                                bgColor: {
                                    argb: 'FFFFFF99',
                                },
                            };
                        }
                    }
                }
            }

            tRowIdx += 2;

            sheet.getCell(tRowIdx, 1).value = '재고정보';
            tRowIdx += 1;

            let stockHeaderRowIdx = tRowIdx;
            const orderQtyStartCol = tOrderColS > 0 ? tOrderColS : tOrderColIdx;
            // 재고정보
            let sql7 = '';
            if (args.data.OP_KIND === '0' || args.data.OP_KIND === '1') {
                sql7 = `
                    SELECT
                        C.vendor_name,
                        B.matl_cd,
                        A.matl_name,
                        A.color,
                        A.spec,
                        A.unit,
                        SUM(B.PO_QTY) AS potoqty,
                        SUM(B.TOT_AMT) AS pototal,
                        D.matl_price,
                        D.curr_cd,
                        '',
                        B.po_cd,
                        B.po_matl_cd,
                        B.po_seq,
                        b.mrp_seq,
                        f.ware_name
                    FROM
                        KCD_MATL_MST AS A
                        INNER JOIN KSV_PO_MRP AS B ON A.MATL_CD = B.MATL_CD
                        INNER JOIN KCD_VENDOR AS C ON A.VENDOR_CD = C.VENDOR_CD
                        INNER JOIN KCD_MATL_MEM AS D ON A.MATL_CD = D.MATL_CD
                        AND B.MATL_SEQ = D.MATL_SEQ
                        inner join ksv_stock_matl AS e ON b.stock_idx = e.stock_idx
                        inner join kcd_factory_ware AS f ON f.ware_cd = e.Factory_cd
                    WHERE
                        B.PO_CD = '${tPoCd}'
                        AND B.USE_PO_TYPE = '2'
                        AND B.DIFF_PO_TYPE <> '2'
                    GROUP BY
                        C.VENDOR_NAME,
                        B.MATL_CD,
                        A.COLOR,
                        A.MATL_NAME,
                        A.SPEC,
                        A.UNIT,
                        B.PO_CD,
                        D.MATL_PRICE,
                        D.CURR_CD,
                        B.PO_MATL_CD,
                        B.PO_SEQ,
                        b.mrp_seq,
                        f.ware_name
                    ORDER BY
                        C.VENDOR_NAME,
                        A.MATL_NAME,
                        A.COLOR,
                        A.SPEC
                `;
            } else if (args.data.OP_KIND === '2' || args.data.OP_KIND === '3') {
                sql7 = `
                    SELECT
                        C.vendor_name,
                        B.matl_cd,
                        A.matl_name,
                        A.color,
                        A.spec,
                        A.unit,
                        SUM(B.PO_QTY) AS potoqty,
                        SUM(B.TOT_AMT) AS pototal,
                        D.matl_price,
                        D.curr_cd,
                        '',
                        B.po_cd,
                        B.po_matl_cd,
                        b.po_seq as po_seq,
                        '' as mrp_seq,
                        f.ware_name
                    FROM
                        KCD_MATL_MST AS A
                        INNER JOIN KSV_PO_MRP AS B ON A.MATL_CD = B.MATL_CD
                        INNER JOIN KCD_VENDOR AS C ON A.VENDOR_CD = C.VENDOR_CD
                        INNER JOIN KCD_MATL_MEM AS D ON A.MATL_CD = D.MATL_CD
                        AND B.MATL_SEQ = D.MATL_SEQ
                        inner join ksv_stock_matl AS e ON b.stock_idx = e.stock_idx
                        inner join kcd_factory_ware AS f ON f.ware_cd = e.Factory_cd
                    WHERE
                        B.PO_CD = '${tPoCd}'
                        AND B.USE_PO_TYPE = '2'
                        AND B.DIFF_PO_TYPE <> '2'
                    GROUP BY
                        C.VENDOR_NAME,
                        B.MATL_CD,
                        A.COLOR,
                        A.MATL_NAME,
                        A.SPEC,
                        A.UNIT,
                        B.PO_CD,
                        D.MATL_PRICE,
                        D.CURR_CD,
                        B.PO_MATL_CD,
                        b.po_seq,
                        f.ware_name
                    ORDER BY
                        C.VENDOR_NAME,
                        A.MATL_NAME,
                        A.COLOR,
                        A.SPEC
                `;
            }

            var tRet7 = await prisma.$queryRaw(Prisma.raw(sql7));
            var tIdx7 = 0;
            var tStockRowS = tRowIdx;
            for (tIdx7 = 0; tIdx7 < tRet7.length; tIdx7++) {
                var col = {
                    ...tRet7[tIdx7],
                };
                if (col.po_cd !== '')
                    sheet.getCell(tRowIdx, 1).value =
                        `${col.ware_name}(${col.po_matl_cd})`;
                else
                    sheet.getCell(tRowIdx, 1).value =
                        `${col.ware_name}(${col.po_matl_cd})`;

                if (args.data.OP_KIND === '0' || args.data.OP_KIND === '1')
                    sheet.getCell(tRowIdx, 2).value = col.po_seq;

                let sql8 = `
                    select
                        b.matl_cd,
                        b.rack,
                        b.po_cd,
                        b.order_cd,
                        a.stock_idx,
                        b.stock_status,
                        c.use_qty
                    from
                        ksv_po_mrp a,
                        ksv_stock_matl b,
                        ksv_stock_use c
                    where
                        a.po_cd = c.use_po_cd
                        and a.po_seq = c.use_po_seq
                        and a.order_cd = c.use_order_cd
                        and a.matl_cd = c.use_matl_cd
                        and a.mrp_seq = c.use_mrp_seq
                        and b.stock_idx = c.stock_idx
                        and (a.po_cd = '${tPoCd}')
                        and (a.matl_cd = '${col.matl_cd}')
                        and (a.mrp_seq = '${col.mrp_seq}')
                `;
                var tRet8 = await prisma.$queryRaw(Prisma.raw(sql8));
                tRet8.forEach((col1, i1) => {
                    var tObj = {
                        ...col1,
                    };
                    if (col1.po_cd === '0000-0000') tObj.po_cd = '';
                    if (col1.order_cd === '0000-00000') tObj.order_cd = '';
                    if (col1.stock_status === 'B') {
                        sheet.getCell(tRowIdx, 13).value =
                            `Defect${col1.stock_status}`;
                        sheet.getCell(tRowIdx, 14).value = col1.use_qty;
                    } else if (col1.stock_status === 'L') {
                        sheet.getCell(tRowIdx, 15).value =
                            `Loss${col1.stock_status}`;
                        sheet.getCell(tRowIdx, 16).value = col1.use_qty;
                    } else {
                        sheet.getCell(tRowIdx, 3).value =
                            `${col1.stock_status}_${col1.rack}_${col1.po_cd}_${col1.order_cd}`;
                    }
                });

                for (let orderIdx = 0; orderIdx < tOrdArray.length; orderIdx++) {
                    const orderCd = tOrdArray[orderIdx];
                    const sqlStockOrd = `
                        SELECT
                            A.MATL_CD,
                            B.ORDER_CD,
                            sum(A.PO_QTY) as po_qty,
                            sum(A.PO_QTY) * A.MATL_PRICE * D.USD_RATE as amt
                        FROM
                            KSV_PO_MRP AS A
                            INNER JOIN KSV_PO_MEM AS B ON A.PO_CD = B.PO_CD AND A.ORDER_CD = B.ORDER_CD AND A.PO_SEQ = B.PO_SEQ
                            INNER JOIN KCD_CURRENCY AS D ON A.CURR_CD = D.CURR_CD
                        WHERE
                            (A.PO_CD = '${tPoCd}')
                            AND (D.START_DATE = '${tRetDate1}')
                            AND (A.MATL_CD = '${col.matl_cd}')
                            AND (B.ORDER_CD = '${orderCd}')
                            AND (A.USE_PO_TYPE = '2')
                            AND (A.DIFF_PO_TYPE <> '2')
                            AND (a.mrp_seq = '${col.mrp_seq}')
                        GROUP BY A.MATL_CD, B.ORDER_CD, A.MATL_PRICE, D.USD_RATE
                        ORDER BY A.MATL_CD, B.ORDER_CD
                    `;
                    const tRetStockOrd = await prisma.$queryRaw(Prisma.raw(sqlStockOrd));
                    if (tRetStockOrd.length > 0) {
                        const qty = Number(tRetStockOrd[0].po_qty ?? 0);
                        if (qty !== 0) {
                            const ordColIdx = orderQtyStartCol + orderIdx;
                            sheet.getCell(tRowIdx, ordColIdx).value = Math.round(qty);
                            sheet.getCell(tRowIdx, ordColIdx).numFmt = '#,##0';
                            sheet.getCell(tRowIdx, ordColIdx).alignment = {
                                horizontal: 'right',
                                vertical: 'middle',
                            };
                        }
                    }
                }

                sheet.getCell(tRowIdx, 4).value = col.matl_cd;
                sheet.getCell(tRowIdx, 5).value = col.matl_name;
                sheet.mergeCells(tRowIdx, 5, tRowIdx, 6);
                sheet.getCell(tRowIdx, 7).value = String(col.color);
                sheet.getCell(tRowIdx, 8).value = col.spec;
                sheet.mergeCells(tRowIdx, 8, tRowIdx, 9);
                sheet.getCell(tRowIdx, 10).value = col.unit;

                sheet.getCell(tRowIdx, 11).value = parseFloat(col.potoqty);

                var tColIdx = 17;
                var tPriceIdx = 13;

                if (args.data.OP_KIND === '2') {
                    tColIdx = 16;
                    tPriceIdx = 14;
                }

                if (args.data.IS_PRICE === '1') {
                    sheet.getCell(tRowIdx, tPriceIdx).value = col.matl_price;
                    sheet.getCell(tRowIdx, tPriceIdx + 1).value = col.curr_cd;
                    tColIdx = tColIdx;
                } else {
                    tColIdx = tColIdx - 2;
                }
                tRowIdx += 1;
            }
            var tStockRowE = tRowIdx;
            tIdx89 = 0;

            for (tIdx89 = tStockRowS; tIdx89 <= tStockRowE; tIdx89++) {
                var tIdx = 1;
                for (tIdx = 1; tIdx < tColIdx + 7; tIdx++) {
                    sheet.getCell(tIdx89, tIdx).border = basicBorder;
                }
            }

            // 마지막 시퀀스에 해당하는 MATL 코드에 대해 배경색 지정
            let maxPoSeqMatlList = await prisma.$queryRaw(
                Prisma.raw(`
                    select
                        matl_cd
                    from
                        ksv_po_mrp
                    where
                        1 = 1
                        and po_cd = '${tPoCd}'
                        and po_seq = (
                            select
                                max(po_seq)
                            from
                                ksv_po_mrp
                            where
                                po_cd = '${tPoCd}'
                                and po_seq between 2 and 96
                        )
                `),
            );

            const maxPoMatlSet = new Set(
                maxPoSeqMatlList.map((r) => String(r.matl_cd ?? '').trim()),
            );

            sheet.eachRow((row, rowNumber) => {
                if (rowNumber > stockHeaderRowIdx) return;
                const dCellValue = String(row.getCell('D').value ?? '').trim();

                if (maxPoMatlSet.has(dCellValue)) {
                    // A(1) ~ J(10)까지 반복하며 배경색 지정
                    for (let col = 1; col <= 10; col++) {
                        row.getCell(col).fill = {
                            type: 'pattern',
                            pattern: 'solid',
                            fgColor: {
                                argb: 'FFADD8E6',
                            },
                        };
                    }
                }
            });

            // - [ ]  재고 정보에서 자재 코드 다른 재고 반영시 연초록색 표시
            let differentMatlCdAndPoMatlCd = await prisma.$queryRaw(
                Prisma.raw(`
                    select
                        matl_cd
                    from
                        ksv_po_mrp
                    where
                        1 = 1
                        and po_matl_cd in (
                            select
                                matl_cd
                            from
                                ksv_po_mrp
                            where
                                po_cd = '${tPoCd}'
                                and po_matl_cd = '재고발주'
                        )
                        and po_cd = '${tPoCd}'
                        and matl_cd <> po_matl_cd
                        and po_matl_cd <> '재고발주'
                        and po_matl_cd <> ''
                        and (po_seq between 2 and 96)
                `),
            );

            const diffMatlSet = new Set(
                differentMatlCdAndPoMatlCd.map((r) =>
                    String(r.matl_cd ?? '').trim(),
                ),
            );

            sheet.eachRow((row, rowNumber) => {
                if (rowNumber < stockHeaderRowIdx) return;

                const dVal = String(row.getCell('D').value ?? '').trim();

                if (diffMatlSet.has(dVal)) {
                    row.getCell('D').fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: {
                            argb: 'FF90EE90',
                        }, // 연초록색
                    };
                }
            });

            tRowIdx += 3;
            sheet.getCell(tRowIdx, 1).value = 'LeftOver';
            tRowIdx += 1;

            // Left Over 정보
            let sql10 = `
                select
                    c.vendor_name,
                    a.matl_cd,
                    b.matl_name,
                    b.color,
                    b.spec,
                    b.unit,
                    sum(a.diff_qty) as s_qty,
                    a.po_seq
                from
                    ksv_po_mrp a,
                    kcd_matl_mst b,
                    kcd_vendor c
                where
                    a.po_cd = '${tPoCd}'
                    and a.diff_po_type = '1'
                    and b.matl_cd = a.matl_cd
                    and c.vendor_cd = b.vendor_cd
                group by
                    c.vendor_name,
                    a.matl_cd,
                    b.matl_name,
                    b.color,
                    b.spec,
                    b.unit,
                    a.po_seq
                order by
                    1,
                    2,
                    3,
                    4,
                    5
            `;
            var tRet10 = await prisma.$queryRaw(Prisma.raw(sql10));
            var tIdx10 = 0;
            var tLeftOverRowS = tRowIdx;
            for (tIdx10 = 0; tIdx10 < tRet10.length; tIdx10++) {
                var col = {
                    ...tRet10[tIdx10],
                };
                sheet.getCell(tRowIdx, 1).value = col.vendor_name;
                sheet.getCell(tRowIdx, 2).value = col.po_seq;
                sheet.getCell(tRowIdx, 4).value = col.matl_cd;
                sheet.getCell(tRowIdx, 5).value = col.matl_name;
                sheet.getCell(tRowIdx, 7).value = String(`${col.color}`);
                sheet.getCell(tRowIdx, 8).value = col.spec;
                sheet.getCell(tRowIdx, 10).value = col.unit;
                sheet.getCell(tRowIdx, 11).value = col.s_qty;
                var tIdx11 = 0;
                for (tIdx11 = 0; tIdx11 < tOrdArray.length; tIdx11++) {
                    var tOrderCd = tOrdArray[tIdx11];
                    let sql11 = `
                        select
                            a.matl_cd,
                            a.order_cd,
                            sum(a.stock_qty) as s_stock_qty
                        from
                            ksv_stock_matl a,
                            kcd_matl_mst b,
                            kcd_vendor c,
                            ksv_po_mrp d
                        where
                            a.matl_cd = b.matl_cd
                            and b.vendor_cd = c.vendor_cd
                            and b.matl_cd = d.matl_cd
                            and (a.po_cd = '${tPoCd}')
                            and (a.matl_cd = '${col.matl_cd}')
                            and (a.order_cd = '${tOrderCd}')
                            and (a.stock_status = 'W')
                            and d.stock_idx = a.stock_idx
                            and d.po_cd = a.po_cd
                        group by
                            a.matl_cd,
                            a.order_cd
                    `;
                    var tRet11 = await prisma.$queryRaw(Prisma.raw(sql11));
                    var tStockQty = 0;
                    if (tRet11.length > 0) {
                        tStockQty = parseFloat(tRet11[0].s_stock_qty);
                    }
                        const ordColIdx = orderQtyStartCol + tIdx11;
                        if (tStockQty !== 0) {
                            sheet.getCell(tRowIdx, ordColIdx).value = Math.round(tStockQty);
                            sheet.getCell(tRowIdx, ordColIdx).numFmt = '#,##0';
                            sheet.getCell(tRowIdx, ordColIdx).alignment = {
                                horizontal: 'right',
                                vertical: 'middle',
                            };
                        }
                }
                tRowIdx += 1;
            }
            var tLeftOverRowE = tRowIdx;
            tIdx89 = 0;
            for (tIdx89 = tLeftOverRowS; tIdx89 <= tLeftOverRowE; tIdx89++) {
                var tIdx = 1;
                for (tIdx = 1; tIdx < tColIdx + 7; tIdx++) {
                    sheet.getCell(tIdx89, tIdx).border = basicBorder;
                }
            }

            sheet.eachRow((row) => {
                row.eachCell((cell) => {
                    if (
                        cell.value !== null &&
                        cell.value !== undefined &&
                        cell.value !== ''
                    ) {
                        const prevFont = cell.font || {};
                        cell.font = {
                            ...prevFont,
                            name: '돋움',
                            size: prevFont.size || 10,
                        };
                    }
                });
            });

            let sql15 = `
                delete from kcd_fileinfo
                where
                    title = '${tTitle}'
                    and file_key = '${tFileKey}'
                    and kind = 'S030514'
            `;
            var tRet15 = await prisma.$queryRaw(Prisma.raw(sql15));

            const uploadInfo = await generateUploadURL();
            const uploadURL = uploadInfo.uploadURL;
            const fileUrl = uploadURL.split('?')[0];

            var tFileObj = {};
            tFileObj.title = tTitle;
            tFileObj.kind = 'S030514';
            tFileObj.file_key = tFileKey;
            tFileObj.name = tWExcelFile;
            tFileObj.url = fileUrl;
            tFileObj.upd_datetime = tRetDate;
            tFileObj.upd_user = tUserInfo.USER_ID;
            var sql12 = AFLib.createTableSql('kcd_fileinfo', tFileObj);
            var tRet12 = await prisma.$queryRaw(Prisma.raw(sql12));

            return await upload(`${tWExcelFile}.xlsx`, wb, uploadURL);
        } catch (error) {
            let sql12 = `
                delete from kcd_fileinfo
                where
                    title = '${tTitle}'
                    and kind = 'S030514'
            `;
            var tRet12 = await prisma.$queryRaw(Prisma.raw(sql12));
            var tRetArray = [];
            var tObj = {};
            tObj.id = 1;
            tObj.CODE = `ERROR:${error.message}`;
            console.log(tObj.CODE);
            tRetArray.push(tObj);
            return tRetArray;
        }
    }

    async REPORT_ORDER_QTY(args, contextValue) {
        var tRetDate = AFLib.getCurrTime();
        var tRetDate1 = tRetDate.substring(0, 8);
        var tUserInfo = AFLib.getUserInfo(contextValue);

        var tTitle = '';
        tTitle = `ORDER_QTY_${args.data.PO_CD}`;

        let sql99 = `
            delete from kcd_fileinfo
            where
                title = '${tTitle}'
                and file_key = 'S030514'
        `;
        var tRet99 = await prisma.$queryRaw(Prisma.raw(sql99));

        const uploadInfo = await generateUploadURL();

        var tInObj = {};
        tInObj.NAME = '작업중';
        tInObj.URL = uploadInfo.uploadURL.split('?')[0];
        tInObj.TITLE = tTitle;
        tInObj.FILE_KEY = 'S030514';
        var tSql98 = AFLib.createTableSql('KCD_FILEINFO', tInObj);
        var tRet98 = await prisma.$queryRaw(Prisma.raw(tSql98));

        // var tWExcelFile = `Partial List-${tUserInfo.USER_ID}-${tRetDate1}`;
        var tWExcelFile = '';
        var tRetExcelFile = '';

        var tPoCd = args.data.PO_CD;

        let sql0 = `
            SELECT
                A.PO_CD,
                B.ORDER_CD,
                B.REF_ORDER_NO,
                E.STYLE_NAME,
                F.COLOR,
                D.SIZE_MEMBER,
                C.SIZE_CNT,
                B.TOT_CNT,
                c.PROD_CD,
                g.NAT_NAME
            FROM
                KSV_PO_MEM A,
                KSV_ORDER_MST B,
                KSV_ORDER_MEM C,
                KCD_SIZE_MST D,
                KCD_STYLE E,
                KSV_PROD_MST F,
                kcd_nation g
            WHERE
                A.ORDER_CD = B.ORDER_CD
                and B.ORDER_CD = C.ORDER_CD
                and B.SIZE_GROUP = D.SIZE_GROUP
                and B.STYLE_CD = E.STYLE_CD
                and C.PROD_CD = F.PROD_CD
                and g.nat_cd = b.nat_cd
                and (A.PO_CD = '${tPoCd}')
                AND (A.PO_SEQ = 1)
            ORDER BY
                B.ORDER_CD,
                F.COLOR
        `;
        var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
        var tInfo = [];
        var tBuyerCd = '';
        if (tRet0.length > 0) {
            tInfo = [...tRet0];
            tBuyerCd = tInfo[0].ORDER_CD.substring(0, 2);
        }

        try {
            var tPoCd = args.data.PO_CD;
            const templatePath = path.join(
                process.cwd(),
                'upload',
                'excel_template',
                'list.xlsx',
            );

            var tFileName = '';
            tFileName = `${tPoCd}${tBuyerCd}-PO_POQty-${tUserInfo.USER_ID}${tRetDate1}`;
            tWExcelFile = tFileName;

            const wb = new Excel.Workbook();
            await wb.xlsx.readFile(templatePath);

            var tSheetName = `Sheet1`;
            var sheet = wb.getWorksheet(tSheetName);
            sheet.getCell(1, 1).value = tPoCd;
            sheet.getCell(1, 1).font = {
                name: 'Dotum',
                size: 14,
                bold: true,
                color: {
                    argb: BLACK,
                },
            };

            if (tInfo.length > 0) {
                const getQtyArray = (sizeCnt, sizeLen) => {
                    const clean = String(sizeCnt ?? '').replace(/[^0-9]/g, '');
                    const out = [];
                    for (let idx = 0; idx < sizeLen; idx++) {
                        const seg = clean.substring(idx * 6, idx * 6 + 6);
                        out.push(parseInt(seg || '0', 10) || 0);
                    }
                    return out;
                };

                const fetchCombinedChildren = async (baseOrderCd) => {
                    const sqlChildren = `
                        SELECT
                            B.ORDER_CD,
                            B.REF_ORDER_NO,
                            E.STYLE_NAME,
                            F.COLOR,
                            D.SIZE_MEMBER,
                            C.SIZE_CNT,
                            B.TOT_CNT,
                            C.PROD_CD,
                            G.NAT_NAME
                        FROM
                            KSV_ORDER_MST B
                            JOIN KSV_ORDER_MEM C ON B.ORDER_CD = C.ORDER_CD
                            JOIN KCD_SIZE_MST D ON B.SIZE_GROUP = D.SIZE_GROUP
                            JOIN KCD_STYLE E ON B.STYLE_CD = E.STYLE_CD
                            JOIN KSV_PROD_MST F ON C.PROD_CD = F.PROD_CD
                            JOIN KCD_NATION G ON G.NAT_CD = B.NAT_CD
                        WHERE
                            B.ORDER_CD LIKE '${baseOrderCd}%'
                            AND LTRIM(RTRIM(ISNULL(B.REF_ORDER_NO, ''))) NOT IN ('Combined', 'Combined Order')
                        ORDER BY
                            B.ORDER_CD,
                            F.COLOR
                    `;
                    return await prisma.$queryRaw(Prisma.raw(sqlChildren));
                };

                let i = 0;
                let rowCursor = 3;
                let maxColUsed = 6;
                let orderIdx = 0;

                while (i < tInfo.length) {
                    orderIdx++;
                    const first = tInfo[i];
                    const orderCd = String(first.ORDER_CD ?? '');
                    const styleName = String(first.STYLE_NAME ?? '');
                    const sizeNames = String(first.SIZE_MEMBER ?? '')
                        .split(',')
                        .map((v) => String(v).trim())
                        .filter(Boolean);
                    const sizeCnt = sizeNames.length;
                    const firstSizeCol = 8;
                    const endCol = 7 + sizeCnt;
                    maxColUsed = Math.max(maxColUsed, endCol);

                    const orderRows = [];
                    const startIdx = i;
                    while (
                        i < tInfo.length &&
                        String(tInfo[i].ORDER_CD ?? '') === orderCd
                    ) {
                        orderRows.push(tInfo[i]);
                        i++;
                    }
                    
                    // 메모리 누수 방지: 처리된 항목 제거
                    // i는 현재 읽은 위치이므로, 처음부터 i까지를 제거하고 i를 0으로 리셋
                    if (i > startIdx && i > 0) {
                        tInfo.splice(0, i);
                        i = 0; // 인덱스 리셋 (배열이 줄었으므로 다시 0부터 시작)
                    }

                    let detailRows = orderRows;
                    const firstBuyerPo = String(first.REF_ORDER_NO ?? first.ref_order_no ?? '').trim();
                    const isCombinedOrder = firstBuyerPo === 'Combined' || firstBuyerPo === 'Combined Order';
                    if (isCombinedOrder) {
                        const children = await fetchCombinedChildren(orderCd);
                        if (children && children.length > 0) {
                            detailRows = children;
                        }
                    }

                    const headerRow = rowCursor;
                    const totalRow = headerRow + 1;
                    const dataStartRow = totalRow + 1;

                    sheet.getCell(headerRow, 1).value = 'Order No.';
                    sheet.getCell(headerRow, 2).value = 'Style';
                    sheet.getCell(headerRow, 3).value = 'Country';
                    sheet.getCell(headerRow, 4).value = 'Buyer Po';
                    sheet.getCell(headerRow, 5).value = 'Prod. Code';
                    sheet.getCell(headerRow, 6).value = 'Color';
                    sheet.getCell(headerRow, 7).value = 'Total';
                    for (let k = 0; k < sizeCnt; k++) {
                        sheet.getCell(headerRow, firstSizeCol + k).value = sizeNames[k];
                    }

                    for (let c = 1; c <= endCol; c++) {
                        const cell = sheet.getCell(headerRow, c);
                        cell.fill = {
                            type: 'pattern',
                            pattern: 'solid',
                            fgColor: {
                                argb: YELLOW,
                            },
                        };
                        cell.border = basicBorder;
                        cell.alignment = {
                            vertical: 'middle',
                            horizontal: 'center',
                        };
                    }

                    sheet.getCell(totalRow, 1).value = orderCd;
                    sheet.getCell(totalRow, 2).value = styleName;
                    sheet.getCell(totalRow, 1).border = basicBorder;
                    sheet.getCell(totalRow, 2).border = basicBorder;

                    // 구프로그램 패턴: Buyer Po 그룹 순서로 상세 Order No suffix 생성 (예: IS26-C0010-01, -02, -03)
                    const buyerPoSeqMap = new Map<string, number>();
                    let buyerPoSeq = 1;
                    detailRows.forEach((row) => {
                        const key = String(row.REF_ORDER_NO ?? row.ref_order_no ?? '').trim();
                        if (!key) return;
                        if (!buyerPoSeqMap.has(key)) {
                            buyerPoSeqMap.set(key, buyerPoSeq);
                            buyerPoSeq += 1;
                        }
                    });

                    detailRows.forEach((row, idx) => {
                        const r = dataStartRow + idx;
                        const country = String(row.NAT_NAME ?? row.nat_name ?? '').trim();
                        const buyerPo = String(row.REF_ORDER_NO ?? row.ref_order_no ?? '').trim();
                        const suffixNo = buyerPoSeqMap.get(buyerPo);
                        const detailOrderNo = suffixNo
                            ? `${orderCd}-${String(suffixNo).padStart(2, '0')}`
                            : orderCd;

                        sheet.getCell(r, 1).value = detailOrderNo;
                        sheet.getCell(r, 3).value = country;
                        sheet.getCell(r, 4).value = buyerPo;
                        sheet.getCell(r, 5).value = String(row.PROD_CD ?? '');
                        sheet.getCell(r, 6).value = String(row.COLOR ?? '');

                        const qtyArray = getQtyArray(row.SIZE_CNT, sizeCnt);
                        let rowTotal = 0;
                        for (let k = 0; k < sizeCnt; k++) {
                            const qty = qtyArray[k] ?? 0;
                            rowTotal += qty;
                            const qtyCell = sheet.getCell(r, firstSizeCol + k);
                            qtyCell.value = qty;
                            qtyCell.alignment = {
                                vertical: 'middle',
                                horizontal: 'center',
                            };
                        }

                        const totalCell = sheet.getCell(r, 7);
                        totalCell.value = rowTotal;
                        totalCell.alignment = {
                            vertical: 'middle',
                            horizontal: 'center',
                        };

                        for (let c = 1; c <= endCol; c++) {
                            sheet.getCell(r, c).border = basicBorder;
                        }
                    });

                    const dataEndRow = dataStartRow + detailRows.length - 1;
                    for (let k = 0; k < sizeCnt; k++) {
                        const col = firstSizeCol + k;
                        const colL = colLetter(col);
                        const cell = sheet.getCell(totalRow, col);
                        cell.value = {
                            formula: `SUM(${colL}${dataStartRow}:${colL}${dataEndRow})`,
                        };
                        cell.fill = {
                            type: 'pattern',
                            pattern: 'solid',
                            fgColor: {
                                argb: TEAL,
                            },
                        };
                        cell.border = basicBorder;
                        cell.alignment = {
                            vertical: 'middle',
                            horizontal: 'center',
                        };
                    }

                    const firstSizeL = colLetter(firstSizeCol);
                    const lastSizeL = colLetter(firstSizeCol + sizeCnt - 1);
                    const totalSumCell = sheet.getCell(totalRow, 7);
                    totalSumCell.value = {
                        formula: `SUM(${firstSizeL}${totalRow}:${lastSizeL}${totalRow})`,
                    };
                    totalSumCell.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: {
                            argb: TEAL,
                        },
                    };
                    totalSumCell.border = basicBorder;
                    totalSumCell.alignment = {
                        vertical: 'middle',
                        horizontal: 'center',
                    };

                    for (let c = 1; c <= endCol; c++) {
                        if (!sheet.getCell(totalRow, c).border) {
                            sheet.getCell(totalRow, c).border = basicBorder;
                        }
                    }

                    rowCursor = dataEndRow + 2;
                }
                
                // 명시적 가비지 컬렉션
                tInfo = null;

                // 동적 lastRow 참조로 인한 장시간 루프 방지: 데이터가 있는 마지막 행으로 고정
                const lastDataRow = Math.max(1, rowCursor - 1);
                for (let r = 3; r <= lastDataRow; r++) {
                    for (let c = 1; c <= maxColUsed; c++) {
                        const cell = sheet.getCell(r, c);
                        const prev = cell.font || {};
                        cell.font = {
                            ...prev,
                            name: 'Dotum',
                            size: 10,
                            color: {
                                argb: BLACK,
                            },
                        };
                    }
                }

                for (let c = 1; c <= maxColUsed; c++) {
                    let maxLength = 10;
                    for (let r = 1; r <= lastDataRow; r++) {
                        const value = sheet.getCell(r, c).value;
                        let len = 0;
                        if (typeof value === 'string') len = value.length;
                        else if (typeof value === 'number') len = String(value).length;
                        else if (value && typeof value === 'object' && value.richText) {
                            len = value.richText.map((t) => t.text).join('').length;
                        }
                        if (len > maxLength) maxLength = len;
                    }
                    sheet.getColumn(c).width = maxLength + 2;
                }
            }

            const uploadInfo = await generateUploadURL();
            const uploadURL = uploadInfo.uploadURL;
            let fileUrl = uploadURL.split('?')[0];

            let sql12 = `
                update kcd_fileinfo
                set
                    name = '${tWExcelFile}',
                    url = '${fileUrl}',
                    upd_datetime = '${tRetDate}',
                    upd_user = '${tUserInfo.USER_ID}'
                where
                    title = '${tTitle}'
                    and kind = 'S030514'
            `;
            var tRet12 = await prisma.$queryRaw(Prisma.raw(sql12));
            const result = await upload(`${tWExcelFile}.xlsx`, wb, uploadURL);
            return result;
        } catch (error) {
            let sql12 = `
                delete from kcd_fileinfo
                where
                    title = '${tTitle}'
                    and kind = 'S030514'
            `;
            var tRet12 = await prisma.$queryRaw(Prisma.raw(sql12));
            var tRetArray = [];
            var tObj = {};
            tObj.id = 1;
            tObj.CODE = `ERROR:${error.message}`;
            console.log(tObj.CODE);
            tRetArray.push(tObj);
            return tRetArray;
        }
    }

    async REPORT_ORDER_QTY2(args, contextValue) {
        var tRetDate = AFLib.getCurrTime();
        var tRetDate1 = tRetDate.substring(0, 8);
        var tUserInfo = AFLib.getUserInfo(contextValue);

        var tTitle = `ORDER_QTY2`;
        args.data.forEach((col, i) => {
            tTitle += `_${col.PO_CD}`;
        });

        let sql99 = `
            delete from kcd_fileinfo
            where
                title = '${tTitle}'
                and file_key = 'S030514'
        `;
        var tRet99 = await prisma.$queryRaw(Prisma.raw(sql99));

        const uploadInfo = await generateUploadURL();

        var tInObj = {};
        tInObj.NAME = '작업중';
        tInObj.URL = uploadInfo.uploadURL.split('?')[0];
        tInObj.TITLE = tTitle;
        tInObj.FILE_KEY = 'S030514';
        var tSql98 = AFLib.createTableSql('KCD_FILEINFO', tInObj);
        var tRet98 = await prisma.$queryRaw(Prisma.raw(tSql98));

        try {
            var tWExcelFile = '';
            var tRetExcelFile = '';

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

            var tTemplateName = 'list';
            var tTemplateExcel = `${tPath0}/${tTemplateName}.xlsx`;

            var tFileName = '';
            tFileName = `PO_POQty2-${tUserInfo.USER_ID}${tRetDate1}`;
            tWExcelFile = tFileName;

            const wb = new Excel.Workbook();
            await wb.xlsx.readFile(tTemplateExcel);

            const ids = wb.worksheets.slice(0, 6).map((ws) => ws.id);
            ids.forEach((id) => wb.removeWorksheet(id));

            // ─────────────────────────────
            // 유틸리티: 컬럼 인덱스 → 문자
            function colLetter(n) {
                let s = '';
                while (n > 0) {
                    const m = (n - 1) % 26;
                    s = String.fromCharCode(65 + m) + s;
                    n = Math.floor((n - 1) / 26);
                }
                return s;
            }
            // 유틸리티: 동일 내용 병합(연속 구간만)
            function mergeSame(sheet, colIdx, startRow, endRow) {
                if (endRow < startRow) return;
                let runStart = startRow;
                let prev = sheet.getCell(startRow, colIdx).value;
                for (let r = startRow + 1; r <= endRow + 1; r++) {
                    const cur =
                        r <= endRow
                            ? sheet.getCell(r, colIdx).value
                            : Symbol('end');
                    if (cur !== prev) {
                        // 병합 대상 구간
                        const s = runStart,
                            e = r - 1;
                        if (prev != null && prev !== '' && e > s) {
                            sheet.mergeCells(s, colIdx, e, colIdx);
                            const top = sheet.getCell(s, colIdx);
                            top.alignment = {
                                vertical: 'middle',
                            };
                        }
                        runStart = r;
                        prev = cur;
                    }
                }
            }
            // 유틸리티: A/B 폭 자동 맞춤(대략적인 char 단위)
            function autoFitColumns(sheet, colIndices) {
                colIndices.forEach((ci) => {
                    let maxLen = 0;
                    sheet.eachRow(
                        {
                            includeEmpty: false,
                        },
                        (row) => {
                            const cell = row.getCell(ci);
                            let v = cell.value;
                            if (v && typeof v === 'object' && 'richText' in v) {
                                v = v.richText.map((t) => t.text).join('');
                            } else if (
                                v &&
                                typeof v === 'object' &&
                                'result' in v
                            ) {
                                v = v.result;
                            } else if (
                                v &&
                                typeof v === 'object' &&
                                'formula' in v
                            ) {
                                // 수식 셀은 표시 텍스트가 없으니 스킵
                                v = '';
                            }
                            const text =
                                v === null || v === undefined ? '' : String(v);
                            // 한글/영문 혼용을 감안하여 약간 보정
                            maxLen = Math.max(maxLen, text.length);
                        },
                    );
                    const width = Math.min(60, Math.max(12, maxLen + 2));
                    sheet.getColumn(ci).width = width;
                });
            }
            // ─────────────────────────────

            var tIdx0 = 0;

            for (tIdx0 = 0; tIdx0 < args.data.length; tIdx0++) {
                var tPoCd = args.data[tIdx0].PO_CD;

                let sql0 = `
                    SELECT
                        A.PO_CD,
                        B.ORDER_CD,
                        E.STYLE_NAME,
                        F.COLOR,
                        D.SIZE_MEMBER,
                        C.SIZE_CNT,
                        B.TOT_CNT,
                        C.PROD_CD,
                        G.NAT_NAME,
                        B.REF_ORDER_NO
                    FROM
                        KSV_PO_MEM A
                        JOIN KSV_ORDER_MST B ON A.ORDER_CD = B.ORDER_CD
                        JOIN KSV_ORDER_MEM C ON B.ORDER_CD = C.ORDER_CD
                        JOIN KCD_SIZE_MST D ON B.SIZE_GROUP = D.SIZE_GROUP
                        JOIN KCD_STYLE E ON B.STYLE_CD = E.STYLE_CD
                        JOIN KSV_PROD_MST F ON C.PROD_CD = F.PROD_CD
                        JOIN kcd_nation G ON G.nat_cd = B.nat_cd
                    WHERE
                        (A.PO_CD = '${tPoCd}')
                        AND (A.PO_SEQ = 1)
                    ORDER BY
                        B.ORDER_CD,
                        F.COLOR,
                        C.SIZE_CNT DESC
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));

                var tInfo = [];
                var tBuyerCd = '';
                if (tRet0.length > 0) {
                    tInfo = [...tRet0];
                    tBuyerCd = tInfo[0].ORDER_CD.substring(0, 2);
                } else {
                    return [
                        {
                            CODE: `ERROR:${tPoCd}를 KSV_PO_MEM에서 찾을 수 없습니다.`,
                            id: 1,
                        },
                    ];
                }

                var tSheetName = `${tPoCd}`;
                var sheet = wb.addWorksheet(tSheetName);

                sheet.getCell(1, 1).value = tPoCd;

                /* 루프 앞쪽 변수 */
                let tRowIdx = 2;
                let tSaveOrder = '';
                let orderStartFormulaRow = 0; // Totals Row 위치
                let orderDataStartRow = 0; // 첫 상세 행
                let sizeNames = [];
                const firstSizeCol = 8; // H열
                let maxTotalCols = 7;
                let currentBlockTotalCols = 7;
                const rowBorderEndCol = new Map();
                const markRowBorderEndCol = (rowNo, endCol) => {
                    const prev = rowBorderEndCol.get(rowNo) || 0;
                    if (endCol > prev) rowBorderEndCol.set(rowNo, endCol);
                };

                // 상세 데이터 전체 범위 추적(테두리 등)
                const globalDataStartRow = 3;

                /* 상세 루프 */
                for (let i = 0; i < tInfo.length; i++) {
                    const row = tInfo[i];

                    /* ─── 새 Order 시작 ─── */
                    if (tSaveOrder !== row.ORDER_CD) {
                        // 직전 Order 마감: 합계/병합
                        if (orderStartFormulaRow) {
                            // 1) 합계
                            fillTotals(
                                orderStartFormulaRow,
                                orderDataStartRow,
                                tRowIdx - 1,
                                sizeNames.length,
                            );
                            // 2) A/B 병합(직전 주문 블록)
                            /*
                            mergeSame(
                                sheet,
                                1,
                                orderStartFormulaRow,
                                tRowIdx - 1,
                            );
                            mergeSame(
                                sheet,
                                2,
                                orderStartFormulaRow,
                                tRowIdx - 1,
                            );
                            */
                        }

                        // 헤더 출력
                        tRowIdx++; // 빈 줄
                        sizeNames = row.SIZE_MEMBER.split(',');
                        currentBlockTotalCols = 7 + sizeNames.length;
                        maxTotalCols = Math.max(maxTotalCols, currentBlockTotalCols);
                        sheet.getRow(tRowIdx).values = [
                            ,
                            'Order No',
                            'Style',
                            'Country',
                            'Buyer PO',
                            'Prod. Code',
                            'Color',
                            'Total',
                            ...sizeNames,
                        ];

                        sheet.getRow(tRowIdx).eachCell((cell) => {
                            cell.fill = {
                                type: 'pattern',
                                pattern: 'solid',
                                fgColor: {
                                    argb: 'FFFF00',
                                },
                            };
                        });
                        markRowBorderEndCol(tRowIdx, currentBlockTotalCols);

                        // Totals Row(공식은 나중)
                        tRowIdx++;
                        orderStartFormulaRow = tRowIdx;
                        sheet.getCell(tRowIdx, 1).value = row.ORDER_CD; // A열 = Order No
                        sheet.getCell(tRowIdx, 2).value = row.STYLE_NAME;
                        sheet.getCell(tRowIdx, 3).value = row.NAT_NAME;
                        sheet.getCell(tRowIdx, 4).value = row.REF_ORDER_NO;
                        markRowBorderEndCol(tRowIdx, currentBlockTotalCols);

                        // 다음 줄부터 상세
                        tRowIdx++;
                        orderDataStartRow = tRowIdx;
                    }

                    /* ─── 상세 행 출력 ─── */
                    sheet.getCell(tRowIdx, 1).value = '';
                    sheet.getCell(tRowIdx, 2).value = '';
                    sheet.getCell(tRowIdx, 3).value = row.NAT_NAME;
                    sheet.getCell(tRowIdx, 4).value = row.REF_ORDER_NO;
                    sheet.getCell(tRowIdx, 5).value = row.PROD_CD;
                    sheet.getCell(tRowIdx, 6).value = row.COLOR;

                    const sizeCntArr = row.SIZE_CNT.match(/.{6}/g).map((v) =>
                        parseInt(v, 10),
                    );
                    let rowTot = 0;
                    sizeCntArr.forEach((v, k) => {
                        sheet.getCell(tRowIdx, firstSizeCol + k).value = v;
                        rowTot += v;
                    });
                    sheet.getCell(tRowIdx, 7).value = rowTot;
                    markRowBorderEndCol(tRowIdx, currentBlockTotalCols);

                    tSaveOrder = row.ORDER_CD;
                    tRowIdx++;
                }

                // 마지막 주문 블록 마감: 합계/병합
                fillTotals(
                    orderStartFormulaRow,
                    orderDataStartRow,
                    tRowIdx - 1,
                    sizeNames.length,
                );
                /*
                mergeSame(sheet, 1, orderStartFormulaRow, tRowIdx - 1);
                mergeSame(sheet, 2, orderStartFormulaRow, tRowIdx - 1);
                */

                function fillTotals(totRow, dataStart, dataEnd, sizeCnt) {
                    const tealFill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: {
                            argb: 'FF00FFFF',
                        },
                    };

                    // 사이즈별 합계 (조건 없이 그냥 합계)
                    for (let k = 0; k < sizeCnt; k++) {
                        const colL = colLetter(firstSizeCol + k);
                        const cell = sheet.getCell(totRow, firstSizeCol + k);
                        cell.value = {
                            formula: `SUM(${colL}${dataStart}:${colL}${dataEnd})`,
                        };
                        cell.fill = tealFill;
                    }

                    // Total(사이즈 합계)
                    const firstSizeL = colLetter(firstSizeCol);
                    const lastSizeL = colLetter(firstSizeCol + sizeCnt - 1);
                    const totalCell = sheet.getCell(totRow, 7);
                    totalCell.value = {
                        formula: `SUM(${firstSizeL}${totRow}:${lastSizeL}${totRow})`,
                    };
                    totalCell.fill = tealFill;
                }

                // 테두리(필요 시 basicBorder 사용)
                const dataStartRow = globalDataStartRow;
                const dataEndRow = tRowIdx - 1;
                const totalCols = maxTotalCols;
                for (let r = dataStartRow; r <= dataEndRow; r++) {
                    const rowEndCol = rowBorderEndCol.get(r);
                    if (!rowEndCol) continue;
                    for (let c = 1; c <= rowEndCol; c++) {
                        const cell = sheet.getCell(r, c);
                        if (typeof basicBorder !== 'undefined') {
                            cell.border = basicBorder;
                        }
                    }
                }

                // A/B 열 폭 자동 맞춤
                autoFitColumns(sheet, [1, 2]);
            }

            const uploadInfo = await generateUploadURL();
            const uploadURL = uploadInfo.uploadURL;
            let fileUrl = uploadURL.split('?')[0];
            let sql12 = `
                update kcd_fileinfo
                set
                    name = '${tWExcelFile}',
                    url = '${fileUrl}',
                    upd_datetime = '${tRetDate}',
                    upd_user = '${tUserInfo.USER_ID}'
                where
                    title = '${tTitle}'
                    and kind = 'S030514'
            `;
            var tRet12 = await prisma.$queryRaw(Prisma.raw(sql12));

            return await upload(`${tWExcelFile}.xlsx`, wb, uploadURL);
        } catch (error) {
            let sql12 = `
                delete from kcd_fileinfo
                where
                    title = '${tTitle}'
                    and kind = 'S030514'
            `;
            var tRet12 = await prisma.$queryRaw(Prisma.raw(sql12));
            var tRetArray = [];
            var tObj = {};
            tObj.id = 1;
            tObj.CODE = `ERROR:${error.message}`;
            console.log(tObj.CODE);
            tRetArray.push(tObj);
            return tRetArray;
        }
    }

    async REPORT_BUYER_ORDER_QTY(args, contextValue) {
        const sqlMain = `
            SELECT
                '' AS dummy0,
                B.ORDER_CD,
                E.STYLE_NAME,
                F.COLOR,
                D.SIZE_MEMBER,
                C.SIZE_CNT,
                B.TOT_CNT,
                C.PROD_CD,
                G.NAT_NAME,
                B.REF_ORDER_NO,
                B.DUE_DATE,
                B.NAT_CD
            FROM
                KSV_ORDER_MST B
                JOIN KSV_ORDER_MEM C ON B.ORDER_CD = C.ORDER_CD
                JOIN KCD_SIZE_MST D ON B.SIZE_GROUP = D.SIZE_GROUP
                JOIN KCD_STYLE E ON B.STYLE_CD = E.STYLE_CD
                JOIN KSV_PROD_MST F ON C.PROD_CD = F.PROD_CD
                JOIN KCD_NATION G ON G.NAT_CD = B.NAT_CD
            WHERE
                LEFT(B.ORDER_CD, 2) = '${args.data.BUYER_CD}'
                AND B.FACTORY_CD LIKE '%${args.data.FACTORY_CD}%'
                AND B.SAMPLE_FLAG LIKE '%${args.data.SAMPLE_FLAG}%'
                AND B.ORDER_STATUS NOT IN ('*', '4', '9')
            ORDER BY
                B.ORDER_CD,
                F.COLOR
        `;
        const rows = await prisma.$queryRaw(Prisma.raw(sqlMain));
        if (!rows || rows.length === 0) {
            return {
                ok: false,
                message: '데이터가 없습니다.',
            };
        }

        console.log(`조회된 행 수: ${rows.length}`);

        // 2) 템플릿을 메모리로 로드 (디스크 저장 없음)
        const templatePath = path.join(
            process.cwd(),
            'upload',
            'excel_template',
            'list.xlsx',
        );
        console.log(`템플릿 경로: ${templatePath}`);
        const wb = new Excel.Workbook();
        await wb.xlsx.readFile(templatePath);
        const ws = wb.worksheets[0] || wb.addWorksheet('Sheet1');
        ws.name = args.data.BUYER_CD;

        // 3) 타이틀
        ws.getCell(1, 1).value = args.data.BUYER_NAME;
        ws.getCell(1, 1).font = {
            name: 'Dotum',
            size: 14,
            bold: true,
            color: {
                argb: BLACK,
            },
        };

        const setCell = (
            r,
            c,
            val,
            {
                fill = null,
                border = true,
                align = null,
                numFmt = null,
                font = null,
            } = {},
        ) => {
            const cell = ws.getCell(r, c);
            cell.value = val;
            if (fill)
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: {
                        argb: fill,
                    },
                };
            if (border) cell.border = borderThin();
            if (align === 'center') alignCenter(cell);
            if (align === 'right') alignRight(cell);
            if (align === 'left') alignLeft(cell);
            if (numFmt) cell.numFmt = numFmt;
            if (font) cell.font = font;
            return cell;
        };

        // 컬럼 인덱스
        const col_OrderNo = 1; // A
        const col_Style = 2; // B
        const col_DueDate = 3; // C
        const col_Country = 4; // D
        const col_BuyerPo = 5; // E
        const col_ProdCode = 6; // F
        const col_Color = 7; // G
        const col_Total = 8; // H
        const firstSizeCol = 9; // I~

        let hdrRow = 3;

        if (hdrRow === 3) {
            const row3 = ws.getRow(3);
            row3.values = [];
            row3.eachCell((cell) => {
                cell.style = {};
            });
        }

        function writeHeaderBlock(hdrRow, sizeList) {
            setCell(hdrRow, col_OrderNo, 'Order No.', {
                fill: YELLOW,
                align: 'center',
            });
            setCell(hdrRow, col_Style, 'Style', {
                fill: YELLOW,
                align: 'center',
            });
            setCell(hdrRow, col_DueDate, 'Due Date', {
                fill: YELLOW,
                align: 'center',
            });
            setCell(hdrRow, col_Country, 'Country', {
                fill: YELLOW,
                align: 'center',
            });
            setCell(hdrRow, col_BuyerPo, 'Buyer Po', {
                fill: YELLOW,
                align: 'center',
            });
            setCell(hdrRow, col_ProdCode, 'Prod. Code', {
                fill: YELLOW,
                align: 'center',
            });
            setCell(hdrRow, col_Color, 'Color', {
                fill: YELLOW,
                align: 'center',
            });
            setCell(hdrRow, col_Total, 'Total', {
                fill: YELLOW,
                align: 'center',
            });
            for (let k = 0; k < sizeList.length; k++) {
                const c = firstSizeCol + k;
                setCell(hdrRow, c, String(sizeList[k]), {
                    fill: YELLOW,
                    align: 'center',
                    numFmt: '@',
                });
            }
        }

        function applyBaseFont(
            r1,
            c1,
            r2,
            c2,
            { name = 'Gulim', size = 10 } = {},
        ) {
            for (let r = r1; r <= r2; r++) {
                for (let c = c1; c <= c2; c++) {
                    const cell = ws.getCell(r, c);
                    const prev = cell.font || {};
                    cell.font = {
                        ...prev,
                        name,
                        size,
                        color: {
                            argb: BLACK,
                        },
                    };
                }
            }
        }

        async function fetchCombinedChildren(orderCdPrefix) {
            const sql = `
                SELECT
                    '' dummy0,
                    B.ORDER_CD,
                    E.STYLE_NAME,
                    F.COLOR,
                    D.SIZE_MEMBER,
                    C.SIZE_CNT,
                    B.TOT_CNT,
                    C.PROD_CD,
                    G.NAT_NAME,
                    B.REF_ORDER_NO,
                    B.DUE_DATE
                FROM
                    KSV_ORDER_MST B
                    JOIN KSV_ORDER_MEM C ON B.ORDER_CD = C.ORDER_CD
                    JOIN KCD_SIZE_MST D ON B.SIZE_GROUP = D.SIZE_GROUP
                    JOIN KCD_STYLE E ON B.STYLE_CD = E.STYLE_CD
                    JOIN KSV_PROD_MST F ON C.PROD_CD = F.PROD_CD
                    JOIN KCD_NATION G ON G.NAT_CD = B.NAT_CD
                WHERE
                    B.ORDER_CD LIKE '${orderCdPrefix}%'
                    AND B.FACTORY_CD LIKE '%${args.data.FACTORY_CD}%'
                    AND B.SAMPLE_FLAG LIKE '%${args.data.SAMPLE_FLAG}%'
                    AND B.ORDER_STATUS NOT IN ('*', '4', '9')
                    AND LTRIM(RTRIM(ISNULL(B.REF_ORDER_NO, ''))) NOT IN ('Combined', 'Combined Order')
                ORDER BY
                    B.ORDER_CD,
                    F.COLOR
            `;
            return prisma.$queryRaw(Prisma.raw(sql));
        }

        // 4) 본문 전개
        let i = 0;
        let isFirstSection = true;

        while (i < rows.length) {
            const r = rows[i];
            const thisOrd = r.ORDER_CD;

            const sizeList = parseSizeMembers(r.SIZE_MEMBER);
            const sizeCnt = sizeList.length;

            // 같은 ORDER_CD 묶음
            const sameOrdRows = [];
            while (i < rows.length && rows[i].ORDER_CD === thisOrd) {
                sameOrdRows.push(rows[i]);
                i++;
            }

            // 섹션 사이 공백행(첫 섹션 제외)
            if (!isFirstSection) ws.addRow([]);
            isFirstSection = false;

            // 1) 헤더(제목줄: 노란색)
            const hdrRow = (ws.lastRow ? ws.lastRow.number : 1) + 1;
            writeHeaderBlock(hdrRow, sizeList);

            // 2) 합계줄(블록의 첫줄)
            const sumRow = hdrRow + 1; // 캡처 기준: 헤더 바로 아래 줄
            const dataStart = sumRow + 1; // 두 번째 줄부터 내용 시작
            let dataRow = dataStart;

            // 합계줄: A~C 비움(명시), D~G(Country~Color) 비움, H~(Total/사이즈)만 채움
            setCell(sumRow, col_OrderNo, '', {
                align: 'left',
            });
            setCell(sumRow, col_Style, '', {
                align: 'left',
            });
            setCell(sumRow, col_DueDate, null, {
                align: 'center',
            });
            setCell(sumRow, col_Country, '', {
                align: 'left',
            }); // D
            setCell(sumRow, col_BuyerPo, '', {
                align: 'left',
            }); // E
            setCell(sumRow, col_ProdCode, '', {
                align: 'left',
            }); // F
            setCell(sumRow, col_Color, '', {
                align: 'left',
            }); // G

            // 3) 출력 대상 데이터 레코드 준비 (Combined 처리 포함)
            const refOrderNo = String(sameOrdRows[0]?.REF_ORDER_NO ?? '').trim();
            const isCombinedByRefOrderNo =
                refOrderNo === 'Combined' || refOrderNo === 'Combined Order';
            const orderCd = String(thisOrd ?? '').trim();
            const isCombinedByOrderCd =
                orderCd.length >= 6 && orderCd.substring(5, 6).toUpperCase() === 'C';
            const isCombined = isCombinedByRefOrderNo || isCombinedByOrderCd;
            const detailRows = [];
            if (isCombined) {
                const kids = await fetchCombinedChildren(thisOrd);
                if (kids && kids.length > 0) {
                    detailRows.push(...kids);
                } else {
                    detailRows.push(...sameOrdRows);
                }
            } else {
                detailRows.push(...sameOrdRows);
            }

            // 4) 내용행 출력 (두 번째 줄부터)
            detailRows.forEach((item, idx) => {
                const isFirstLine = idx === 0;

                // A~C: 같은 주문의 첫 줄에만 채움, 나머지는 공란
                setCell(
                    dataRow,
                    col_OrderNo,
                    isFirstLine ? item.ORDER_CD : '',
                    {
                        fill: WHITE,
                        align: 'left',
                    },
                );
                setCell(
                    dataRow,
                    col_Style,
                    isFirstLine ? item.STYLE_NAME : '',
                    {
                        fill: WHITE,
                        align: 'left',
                    },
                );
                setCell(
                    dataRow,
                    col_DueDate,
                    isFirstLine ? yyyymmddToDate(item.DUE_DATE) : null,
                    isFirstLine
                        ? {
                              align: 'center',
                              numFmt: 'yyyy-mm-dd',
                          }
                        : {
                              align: 'center',
                          },
                );

                // D~G: 항상 실제 값
                setCell(dataRow, col_Country, item.NAT_NAME, {
                    fill: WHITE,
                    align: 'left',
                });
                setCell(dataRow, col_BuyerPo, item.REF_ORDER_NO, {
                    fill: WHITE,
                    align: 'left',
                });
                setCell(dataRow, col_ProdCode, item.PROD_CD, {
                    fill: WHITE,
                    align: 'left',
                });
                setCell(dataRow, col_Color, item.COLOR, {
                    fill: WHITE,
                    align: 'left',
                });

                // I~ 사이즈 수량 (SIZE_CNT에서 6자리씩)
                const qtys = parseFix6QtyStr(item.SIZE_CNT, sizeCnt);
                let rowTotal = 0;
                for (let k = 0; k < sizeCnt; k++) {
                    const c = firstSizeCol + k;
                    const v = qtys[k] ?? 0;
                    setCell(dataRow, c, v, {
                        fill: WHITE,
                        align: 'right',
                    });
                    rowTotal += v;
                }

                // H열: 그 행의 합계
                setCell(dataRow, col_Total, rowTotal, {
                    fill: WHITE,
                    align: 'right',
                });

                dataRow++;
            });

            // 5) 합계줄(H~I..) 수식 채우기 + 청록색 배경
            const dataEnd = dataRow - 1; // 마지막 내용행
            if (dataEnd >= dataStart) {
                // 사이즈별 합계(I~)
                for (let k = 0; k < sizeCnt; k++) {
                    const c = firstSizeCol + k;
                    const L = colLetter(c);
                    setCell(
                        sumRow,
                        c,
                        {
                            formula: `SUM(${L}${dataStart}:${L}${dataEnd})`,
                        },
                        {
                            align: 'right',
                            fill: TEAL,
                        },
                    );
                }
                // H열(합계줄의 Total) = 같은 줄의 사이즈 합
                const firstSizeL = colLetter(firstSizeCol);
                const lastSizeL = colLetter(firstSizeCol + sizeCnt - 1);
                setCell(
                    sumRow,
                    col_Total,
                    {
                        formula: `SUM(${firstSizeL}${sumRow}:${lastSizeL}${sumRow})`,
                    },
                    {
                        align: 'right',
                        fill: TEAL,
                    },
                );
            } else {
                // 데이터가 없을 때(안정성) 0으로
                for (let k = 0; k < sizeCnt; k++) {
                    const c = firstSizeCol + k;
                    setCell(sumRow, c, 0, {
                        align: 'right',
                        fill: TEAL,
                    });
                }
                setCell(sumRow, col_Total, 0, {
                    align: 'right',
                    fill: TEAL,
                });
            }
        }

        applyBaseFont(1, 1, ws.lastRow.number, Math.max(8, ws.columnCount), {
            name: 'Dotum',
            size: 10,
        });

        const userId = AFLib.getUserInfo(contextValue).USER_ID;
        const nowStr = moment().format('YYYYMMDDHHmmss');
        const tWExcelFile = `${args.data.BUYER_CD}-PO_POQty-${userId}-${nowStr}`;
        const uploadInfo = await generateUploadURL();
        const uploadURL = uploadInfo.uploadURL;
        const fileURL = uploadURL.split('?')[0];
        const title = `BUYER_ORDER_QTY_${args.data.BUYER_CD}`;
        const fileKey = `BUYER_ORDER_QTY_${args.data.BUYER_CD}`;

        await prisma.$queryRaw(
            Prisma.raw(
                `
                    delete from kcd_fileinfo
                    where
                        title = '${title}'
                        and file_key = '${fileKey}'
                        and kind = 'S030514'
                `,
            ),
        );

        await prisma.$queryRaw(
            Prisma.raw(
                AFLib.createTableSql('kcd_fileinfo', {
                    title: title,
                    kind: 'S030514',
                    file_key: fileKey,
                    name: tWExcelFile,
                    url: fileURL,
                    upd_datetime: AFLib.getCurrTime(),
                    upd_user: userId,
                }),
            ),
        );

        return await upload(`${tWExcelFile}.xlsx`, wb, uploadURL);
    }
}

// 열 번호 -> 엑셀 열 문자
function colLetter(n) {
    let s = '';
    while (n > 0) {
        const m = (n - 1) % 26;
        s = String.fromCharCode(65 + m) + s;
        n = (n - m - 1) / 26;
    }
    return s;
}

const rgb = (r, g, b) =>
    `FF${[r, g, b].map((v) => v.toString(16).padStart(2, '0').toUpperCase()).join('')}`;
const YELLOW = rgb(255, 255, 0);
const TEAL = rgb(175, 238, 238);
const WHITE = rgb(255, 255, 255);
const BLACK = rgb(0, 0, 0);

function colLetter(n) {
    let s = '';
    while (n > 0) {
        const m = (n - 1) % 26;
        s = String.fromCharCode(65 + m) + s;
        n = Math.floor((n - 1) / 26);
    }
    return s;
}

function borderThin() {
    return {
        top: {
            style: 'thin',
        },
        left: {
            style: 'thin',
        },
        right: {
            style: 'thin',
        },
        bottom: {
            style: 'thin',
        },
    };
}

function alignCenter(cell) {
    cell.alignment = {
        vertical: 'middle',
        horizontal: 'center',
    };
}

function alignRight(cell) {
    cell.alignment = {
        vertical: 'middle',
        horizontal: 'right',
    };
}

function alignLeft(cell) {
    cell.alignment = {
        vertical: 'middle',
        horizontal: 'left',
    };
}

function yyyymmddToDate(s) {
    if (!s || s.length < 8) return null;
    const y = parseInt(s.slice(0, 4), 10);
    const m = parseInt(s.slice(4, 6), 10) - 1;
    const d = parseInt(s.slice(6, 8), 10);
    return new Date(y, m, d);
}

// "S,M,L" → ["S","M","L"]
function parseSizeMembers(sizeMemberStr) {
    if (!sizeMemberStr) return [];
    return sizeMemberStr
        .split(',')
        .map((x) => x.trim())
        .filter(Boolean);
}

function parseFix6QtyStr(qtyStr, count) {
    let s = (qtyStr ?? '').toString().replace(/\s+/g, '');
    s = s.replace(/[^0-9]/g, ''); // 혹시 섞인 문자를 제거
    const needLen = count * 6;
    if (s.length < needLen) {
        s = s.padEnd(needLen, '0'); // 부족하면 0으로 패딩
    }
    const out = [];
    for (let i = 0; i < count; i++) {
        const seg = s.substring(i * 6, i * 6 + 6);
        const n = parseInt(seg, 10);
        out.push(Number.isFinite(n) ? n : 0);
    }
    return out;
}

const S030514_QRY_COMM = new RPT_S030514_QRY_COMM();
export default S030514_QRY_COMM;
