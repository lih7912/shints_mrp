import { Prisma } from '@prisma/client';
import prisma from '../../db';
import AFLib from '../../commlib';
import { upload } from '../../../routes/s3';
const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');
const moment = require('moment');

// 임시 파일 저장을 위한 경로 설정 (시스템 환경에 따라 조정 필요)
const TEMP_DIR = path.join(__dirname, 'temp_reports');

const moduleQuery_S0914_FAC_IN_OUT_MANAGER_REPORT = {
    Query: {
        mgrQuery_S0914_FAC_IN_OUT_MANAGER_REPORT: async (
            _: any,
            args: any,
            contextValue: any,
        ) => {
            const qry = args.data || {};
            const poCd = qry.PO_CD || '';

            if (!poCd) throw new Error('poCd is required');

            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('PO Report');

            // 공통 스타일 함수
            const setStyle = (
                cell: any,
                isHeader = false,
                alignment = 'center',
            ) => {
                cell.font = { name: '맑은 고딕', size: 10, bold: isHeader };
                cell.alignment = {
                    vertical: 'middle',
                    horizontal: alignment,
                    wrapText: true,
                };
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' },
                };
                if (isHeader) {
                    cell.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: 'FFFFFFCC' }, // 옅은 노란색
                    };
                }
            };

            // ----------------------------------------------------
            // 1. 상단 헤더 정보 및 ORDER 목록
            // ----------------------------------------------------
            let currentRow = 1;
            worksheet.getCell(`A${currentRow}`).value = `PO NO : ${poCd}`;
            worksheet.getCell(`A${currentRow}`).font = {
                size: 12,
                bold: true,
                color: { argb: 'FFFF0000' }, //  빨간색
            };

            // PO 정보 쿼리
            const poInfoSql = Prisma.sql`
                SELECT
                    TOP 1 G.PO_DATE,
                    G.MATL_DUE_DATE
                FROM
                    KSV_PO_MST AS G
                WHERE
                    (G.PO_CD = ${poCd})
                    AND (G.PO_SEQ = '1')
            `;
            const poInfoResult = await prisma.$queryRaw<any[]>(poInfoSql);

            if (poInfoResult.length > 0) {
                const info = poInfoResult[0];
                const issueDate = info.PO_DATE
                    ? moment(info.PO_DATE).format('YYYY-MM-DD')
                    : '';
                const dueDate = info.MATL_DUE_DATE
                    ? moment(info.MATL_DUE_DATE).format('YYYY-MM-DD')
                    : '';

                worksheet.getCell(`E${currentRow}`).value =
                    `Issue Date : ${issueDate}`;
                worksheet.getCell(`E${currentRow + 1}`).value =
                    `Due Date : ${dueDate}`;
            }

            currentRow += 2; // 빈 행 추가

            // ORDER 목록 헤더 (A열~E열)
            const orderHeaders = ['ORDER NO.', 'SEQ', 'BUYER', 'STYLE', 'QTY'];
            orderHeaders.forEach((text, index) => {
                const col = index + 1;
                const cell = worksheet.getCell(currentRow, col);
                cell.value = text;
                setStyle(cell, true);
            });

            currentRow++;

            // ORDER 목록 데이터 쿼리
            const orderListSql = Prisma.sql`
                SELECT
                    A.ORDER_CD,
                    COUNT(B.PROD_CD) AS SEQ,
                    C.BUYER_NAME,
                    D.STYLE_NAME,
                    A.TOT_CNT
                FROM
                    KSV_ORDER_MST AS A
                    INNER JOIN KSV_ORDER_MEM AS B ON A.ORDER_CD = B.ORDER_CD
                    INNER JOIN KCD_BUYER AS C ON LEFT(A.ORDER_CD, 2) = C.BUYER_CD
                    INNER JOIN KCD_STYLE AS D ON A.STYLE_CD = D.STYLE_CD
                    INNER JOIN KSV_PO_MEM AS F ON A.ORDER_CD = F.ORDER_CD
                    INNER JOIN KSV_PO_MST AS G ON F.PO_CD = G.PO_CD
                WHERE
                    (F.PO_CD = ${poCd})
                    AND (F.PO_SEQ = '1')
                    AND (G.PO_SEQ = '1')
                GROUP BY
                    A.ORDER_CD,
                    C.BUYER_NAME,
                    D.STYLE_NAME,
                    A.TOT_CNT
                ORDER BY
                    A.ORDER_CD
            `;
            const orderListResult = await prisma.$queryRaw<any[]>(orderListSql);

            orderListResult.forEach((record) => {
                const data = [
                    record.ORDER_CD,
                    record.SEQ,
                    record.BUYER_NAME,
                    record.STYLE_NAME,
                    record.TOT_CNT,
                ];
                data.forEach((value, colIndex) => {
                    const cell = worksheet.getCell(currentRow, colIndex + 1);
                    cell.value = value;
                    setStyle(cell, false, colIndex === 4 ? 'right' : 'center');
                    colIndex === 4 && (cell.numFmt = '#,##0');
                });
                currentRow++;
            });

            currentRow += 1;
            const StartRow = currentRow; // 주 데이터 테이블 헤더 시작 행

            // ----------------------------------------------------
            // 2. 주 데이터 섹션 헤더 (A-H 고정 + I~ 동적)
            // ----------------------------------------------------
            const fixedHeaders = [
                'Supplier',
                'No',
                'Matl Cd',
                'Desc',
                'Color',
                'Spec',
                'Unit',
                'Total MRP Qty',
            ];
            fixedHeaders.forEach((text, index) => {
                const col = index + 1;
                const cell = worksheet.getCell(StartRow, col);
                cell.value = text;
                setStyle(cell, true);
            });

            const ORDER_START_COL = 9; // I열
            let headerCol = ORDER_START_COL;
            let mainUseIndex = 1;

            for (const orderRecord of orderListResult) {
                const orderCd = orderRecord.ORDER_CD;

                // ORDER_CD 헤더
                let headerCell = worksheet.getCell(StartRow, headerCol);
                headerCell.value = `${orderCd}`;
                setStyle(headerCell, true);
                worksheet.getColumn(headerCol).width = 15;
                headerCol++;

                // MAIN USE 헤더
                headerCell = worksheet.getCell(StartRow, headerCol);
                headerCell.value = `MAIN USE ${mainUseIndex++}`;
                setStyle(headerCell, true);
                worksheet.getColumn(headerCol).width = 15;
                headerCol++;
            }

            // ----------------------------------------------------
            // 3. 주 데이터 섹션 데이터
            // ----------------------------------------------------
            currentRow = StartRow + 1;

            const topListData = await getTopListDataForReport(poCd);

            const mainDataResult = (topListData || []).map((r: any) => ({
                SUPPLIER: r.VENDOR_NAME ?? '',
                MATL_CD: r.MATL_CD ?? '',
                DESCRIBE: r.MATL_NAME ?? '',
                COLOR: r.COLOR ?? '',
                SPEC: r.SPEC ?? '',
                UNIT: r.UNIT ?? '',
                TotalShipQty: Number(r.MRPQTY ?? 0),
            }));

            const orderQtyMap = new Map<string, number>();
            for (const row of topListData || []) {
                const matlCd = String(row?.MATL_CD ?? '');
                for (const d of row?.DATAS || []) {
                    const orderCd = String(d?.ORDER_CD ?? '');
                    const qty = Number(d?.ORDER_QTY ?? 0);
                    orderQtyMap.set(`${matlCd}|${orderCd}`, qty);
                }
            }

            let previousSupplier = '';
            let supplierGroupIndex = 0;
            let subIndex = 0;

            for (const record of mainDataResult) {
                if (record.SUPPLIER !== previousSupplier) {
                    supplierGroupIndex++;
                    subIndex = 1;
                    previousSupplier = record.SUPPLIER;
                } else {
                    subIndex++;
                }

                const noValue = `${supplierGroupIndex}-${subIndex}`;
                const baseData = [
                    record.SUPPLIER,
                    noValue,
                    record.MATL_CD,
                    record.DESCRIBE,
                    record.COLOR,
                    record.SPEC,
                    record.UNIT,
                    record.TotalShipQty,
                ];

                let colIndex = 1;
                baseData.forEach((value: any) => {
                    const cell = worksheet.getCell(currentRow, colIndex);
                    cell.value = value;
                    if (colIndex === 8) {
                        setStyle(cell, false, 'right');
                        cell.numFmt = '#,##0';
                    } else {
                        setStyle(cell, false, 'center');
                    }
                    colIndex++;
                });

                // 동적 ORDER_CD 컬럼 채우기
                let dataCol = ORDER_START_COL;
                for (const orderRecord of orderListResult) {
                    const orderCd = orderRecord.ORDER_CD;
                    const key = `${record.MATL_CD}|${orderCd}`;
                    const qty = orderQtyMap.get(key) ?? 0;

                    const qtyCell = worksheet.getCell(currentRow, dataCol);
                    qtyCell.value = qty;
                    setStyle(qtyCell, false, 'right');
                    qtyCell.numFmt = '#,##0';

                    const mainUseCell = worksheet.getCell(
                        currentRow,
                        dataCol + 1,
                    );
                    mainUseCell.value = '';
                    setStyle(mainUseCell, false, 'right');
                    mainUseCell.numFmt = '#,##0';

                    dataCol += 2;
                }
                currentRow++;
            }

            // SHIPMENT 위치를 BL# / Delivery# 고정 2개 컬럼으로 구성
            const blHeaderCol = headerCol;
            const deliveryHeaderCol = headerCol + 1;

            let headerCell = worksheet.getCell(StartRow, blHeaderCol);
            headerCell.value = 'BL#';
            setStyle(headerCell, true);

            headerCell = worksheet.getCell(StartRow, deliveryHeaderCol);
            headerCell.value = 'Delivery#';
            setStyle(headerCell, true);

            const matlCds = mainDataResult
                .map((r) => r.MATL_CD)
                .filter((v) => String(v || '').trim() !== '');

            let shipmentRows: any[] = [];
            if (matlCds.length > 0) {
                const shipmentInfoSql = Prisma.sql`
                    SELECT DISTINCT
                        D.MATL_CD AS MATL_CD,
                        ISNULL(A.BL_NO, '') AS BL_NO,
                        ISNULL(A.CLEARANCE_NO, '') AS DELIVERY_NO,
                        ISNULL(C.CT_QTY, 0) AS CT_QTY,
                        ISNULL(C.WEIGHT, 0) AS WEIGHT,
                        ISNULL(C.CBM, 0) AS CBM
                    FROM
                        KSV_SHIPMENT_MST AS A
                        INNER JOIN KSV_SHIPMENT_MEM AS C ON A.SHIPMENT_CD = C.SHIPMENT_CD
                        INNER JOIN KSV_STOCK_OUT AS D ON C.STSOUT_CD = D.STSOUT_CD
                    WHERE
                        D.PO_CD = ${poCd}
                        AND D.MATL_CD IN (${Prisma.join(matlCds)})
                `;

                shipmentRows = await prisma.$queryRaw<any[]>(shipmentInfoSql);
            }

            const toDisplayNumber = (value: any, scale = 3) => {
                const n = Number(value ?? 0);
                if (!Number.isFinite(n)) return '0';
                if (Number.isInteger(n)) return `${n}`;
                return `${parseFloat(n.toFixed(scale))}`;
            };

            const shipmentByMatl = new Map<string, any[]>();
            for (const row of shipmentRows) {
                const matlCd = String(row?.MATL_CD ?? '');
                if (!matlCd) continue;

                const list = shipmentByMatl.get(matlCd) || [];
                list.push(row);
                shipmentByMatl.set(matlCd, list);
            }

            currentRow = StartRow + 1;

            let mergeStartRow = currentRow;
            let prevBlText = '';

            for (let i = 0; i < mainDataResult.length; i++) {
                const record = mainDataResult[i];
                const matlCd = String(record.MATL_CD ?? '');
                const rows = shipmentByMatl.get(matlCd) || [];

                const groupedByBl = new Map<string, Set<string>>();
                for (const s of rows) {
                    const blNo = String(s?.BL_NO ?? '').trim();
                    const deliveryNo = String(s?.DELIVERY_NO ?? '').trim();
                    const ctQty = toDisplayNumber(s?.CT_QTY ?? 0, 0);
                    const weight = toDisplayNumber(s?.WEIGHT ?? 0, 3);
                    const cbm = toDisplayNumber(s?.CBM ?? 0, 3);
                    const deliveryText = `${deliveryNo} = ${ctQty}Pkgs / ${weight}KGS / ${cbm}CBM`;

                    if (!groupedByBl.has(blNo)) {
                        groupedByBl.set(blNo, new Set<string>());
                    }
                    groupedByBl.get(blNo)?.add(deliveryText);
                }

                const blText = Array.from(groupedByBl.keys())
                    .filter((bl) => bl !== '')
                    .join('\n');

                const deliveryText = Array.from(groupedByBl.values())
                    .map((set) => Array.from(set).join('\n'))
                    .join('\n');

                const blCell = worksheet.getCell(currentRow, blHeaderCol);
                blCell.value = blText;
                setStyle(blCell, false, 'center');

                const deliveryCell = worksheet.getCell(
                    currentRow,
                    deliveryHeaderCol,
                );
                deliveryCell.value = deliveryText;
                setStyle(deliveryCell, false, 'left');

                if (i === 0) {
                    prevBlText = blText;
                    mergeStartRow = currentRow;
                } else if (blText !== prevBlText) {
                    if (prevBlText && mergeStartRow < currentRow - 1) {
                        worksheet.mergeCells(
                            mergeStartRow,
                            blHeaderCol,
                            currentRow - 1,
                            blHeaderCol,
                        );
                        worksheet.mergeCells(
                            mergeStartRow,
                            deliveryHeaderCol,
                            currentRow - 1,
                            deliveryHeaderCol,
                        );
                    }
                    prevBlText = blText;
                    mergeStartRow = currentRow;
                }

                currentRow++;
            }

            if (prevBlText && mergeStartRow < currentRow - 1) {
                worksheet.mergeCells(
                    mergeStartRow,
                    blHeaderCol,
                    currentRow - 1,
                    blHeaderCol,
                );
                worksheet.mergeCells(
                    mergeStartRow,
                    deliveryHeaderCol,
                    currentRow - 1,
                    deliveryHeaderCol,
                );
            }

            headerCol += 2;
            let shipmentHeaderCol = headerCol;

            // 나머지 헤더
            const leftHeaders = [
                'Stock',
                'Total Ship Qty\nInc. Stock',
                'Defect',
                'Short/Over',
                'Fac Out\n(Other Use)',
                'Balance',
                'Fac Out\n(Main Use)',
                'FAC OUT\n(Storage)',
                'FAC OUT\n(Lost)',
                'Remain',
                'Delay Report\nRemark',
                'Price',
                'Curr',
                ' Price($)',
            ];
            for (const leftHeader of leftHeaders) {
                let headerCell = worksheet.getCell(StartRow, headerCol);
                headerCell.value = `${leftHeader}`;
                setStyle(headerCell, true);
                headerCol++;
            }

            // 나머지 데이터 채우기
            currentRow = StartRow + 1;

            const leftDataList = (topListData || []).map((r: any) => ({
                MATL_CD: r.MATL_CD,
                STOCK: Number(r.STOCK ?? 0),
                DEFECT: Number(r.DEFECT ?? 0),
                SHORTOVER: Number(r.SHORTOVER ?? 0),
                OTHER: Number(r.OTHER ?? 0),
                BALANCE: Number(r.REMAIN_E ?? 0),
                MAINUSE: Number(r.MAINUSE ?? 0),
                FACOUT: Number(r.FACOUT ?? 0),
                REMAIN: Number(r.REMAIN_A ?? 0),
                DELAYREMARK: r.DELAYREMARK ?? '',
            }));

            for (const record of mainDataResult) {
                let leftHeaderCol = shipmentHeaderCol;
                const leftData = leftDataList.find(
                    (item: any) => item.MATL_CD === record.MATL_CD,
                );
                const stock = leftData ? leftData.STOCK : 0;
                const totalShipQtyIncStock = record.TotalShipQty + stock;
                const defect = leftData ? leftData.DEFECT : 0;
                const shortOver = leftData ? leftData.SHORTOVER : 0;
                const otherUse = leftData ? leftData.OTHER : 0;
                const balance = leftData ? leftData.BALANCE : 0;
                const mainUse = leftData ? leftData.MAINUSE : 0;
                const facOutStorage = leftData ? leftData.FACOUT : 0;
                const facOutLost = 0; // 없어서 일단 0으로 해놓음.
                const remain = leftData ? leftData.REMAIN : 0;
                const delayRemark = leftData ? leftData.DELAYREMARK : '';

                const setCell = (value) => {
                    let cell = worksheet.getCell(currentRow, leftHeaderCol++);
                    cell.value = value;
                    setStyle(cell, false, 'right');
                    cell.numFmt = '#,##0';
                };

                setCell(stock);
                setCell(totalShipQtyIncStock);
                setCell(defect);
                setCell(shortOver);
                setCell(otherUse);
                setCell(balance);
                setCell(mainUse);
                setCell(facOutStorage);
                setCell(facOutLost);
                setCell(remain);

                let cell = worksheet.getCell(currentRow, leftHeaderCol++);
                cell.value = delayRemark;
                setStyle(cell, false);

                currentRow++;
            }

            // Price, Curr
            const matlCdsForPrice = mainDataResult
                .map((r) => r.MATL_CD)
                .filter(
                    (v: any) =>
                        v !== null &&
                        v !== undefined &&
                        String(v).trim() !== '',
                );

            let priceRows: any[] = [];
            if (matlCdsForPrice.length > 0) {
                const priceAggSql = Prisma.sql`
                    WITH
                        CURR_LATEST AS (
                            SELECT
                                CURR_CD,
                                USD_RATE,
                                START_DATE,
                                ROW_NUMBER() OVER (
                                    PARTITION BY
                                        CURR_CD
                                    ORDER BY
                                        START_DATE DESC
                                ) AS rn
                            FROM
                                KCD_CURRENCY
                        ),
                        PRICE_BASE AS (
                            SELECT
                                A.MATL_CD,
                                B.MATL_SEQ,
                                B.MATL_PRICE,
                                B.CURR_CD,
                                (B.MATL_PRICE * CL.USD_RATE) AS PRICE_USD,
                                ROW_NUMBER() OVER (
                                    PARTITION BY
                                        A.MATL_CD
                                    ORDER BY
                                        B.MATL_SEQ DESC
                                ) AS rn_matl
                            FROM
                                KSV_PO_MRP AS A
                                INNER JOIN KCD_MATL_MEM AS B ON A.MATL_CD = B.MATL_CD
                                AND A.MATL_SEQ = B.MATL_SEQ
                                INNER JOIN CURR_LATEST AS CL ON CL.CURR_CD = B.CURR_CD
                                AND CL.rn = 1
                            WHERE
                                A.PO_CD = ${poCd}
                                AND A.MATL_CD IN (${Prisma.join(matlCdsForPrice)})
                        )
                    SELECT
                        MATL_CD,
                        MATL_PRICE,
                        CURR_CD,
                        PRICE_USD
                    FROM
                        PRICE_BASE
                    WHERE
                        rn_matl = 1
                `;

                priceRows = await prisma.$queryRaw<any[]>(priceAggSql);
            }

            const priceMap = new Map<
                string,
                { price: number; curr: string; priceUsd: number }
            >();
            for (const r of priceRows) {
                const key = String(r.MATL_CD);
                if (!priceMap.has(key)) {
                    priceMap.set(key, {
                        price: Number(r.MATL_PRICE ?? 0),
                        curr: String(r.CURR_CD ?? ''),
                        priceUsd: Number(r.PRICE_USD ?? 0),
                    });
                }
            }

            currentRow = StartRow + 1;

            for (const record of mainDataResult) {
                let currColumn = headerCol - 3; // 'Price' 컬럼 위치

                const v = priceMap.get(String(record.MATL_CD));

                // Price
                {
                    const cell = worksheet.getCell(currentRow, currColumn);
                    cell.value = v ? v.price : '';
                    cell.numFmt = '#,##0.###0';
                    setStyle(cell, false, 'right');
                    currColumn++;
                }

                // Curr
                {
                    const cell = worksheet.getCell(currentRow, currColumn);
                    cell.value = v ? v.curr : '';
                    setStyle(cell, false, 'center');
                    currColumn++;
                }

                // USD
                {
                    const cell = worksheet.getCell(currentRow, currColumn);
                    cell.value = v ? v.priceUsd : '';
                    cell.numFmt = '#,##0.###0';
                    setStyle(cell, false, 'right');
                    currColumn++;
                }

                currentRow++;
            }

            // ----------------------------------------------------
            // 4. 컬럼 너비 조정 및 파일 저장
            // ----------------------------------------------------
            adjustColumnWidths(worksheet, 1, Math.max(20, headerCol - 1));
            worksheet.views = [
                {
                    state: 'frozen', // 고정 상태 설정
                    xSplit: 5,
                    ySplit: StartRow,
                    topLeftCell: 'J10',
                    activeCell: 'J10',
                },
            ];

            const fileName = `${poCd}_${moment().format('YYYYMMDD_HHmmss')}.xlsx`;
            return upload(fileName, workbook);
        },
    },
};

const adjustColumnWidths = (
    worksheet: any,
    startCol: number = 1,
    endCol: number = 20,
) => {
    const MIN_WIDTH = 10;
    const MAX_WIDTH_LIMIT = 50;
    const PADDING = 2;

    for (let colIndex = startCol; colIndex <= endCol; colIndex++) {
        let maxCellWidth = MIN_WIDTH;
        const column = worksheet.getColumn(colIndex);

        worksheet.eachRow((row: any) => {
            const cell = row.getCell(colIndex);
            if (cell.value) {
                let cellValue = cell.value;

                if (typeof cellValue === 'object') {
                    if (cellValue.richText) {
                        cellValue = cellValue.richText
                            .map((item: any) => item.text)
                            .join('');
                    } else if (cellValue.result !== undefined) {
                        cellValue = cellValue.result;
                    }
                }

                const text = String(cellValue);
                if (text.length > 0) {
                    const koreanMatch = text.match(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g);
                    const koreanCount = koreanMatch ? koreanMatch.length : 0;
                    const calculatedWidth =
                        (text.length - koreanCount) * 1.1 + koreanCount * 2.0;

                    if (calculatedWidth > maxCellWidth) {
                        maxCellWidth = calculatedWidth;
                    }
                }
            }
        });

        const finalWidth = Math.min(MAX_WIDTH_LIMIT, maxCellWidth + PADDING);
        column.width = Math.max(MIN_WIDTH, finalWidth);
    }
};

const getTopListDataForReport = async (PO_CD: string) => {
    const sqlStr = `
        select
            row_number() over (order by b.vendor_name, len(a.pr_num), a.pr_num) as id,
            a.po_cd as PO_CD,
            b.vendor_name as VENDOR_NAME,
            a.matl_cd as MATL_CD,
            c.matl_name as MATL_NAME,
            c.color as COLOR,
            c.spec as SPEC,
            c.unit as UNIT,
            isnull(a.ord_cnt, '') as ORD_CNT,
            isnull(a.tot_cnt, 0) as MRPQTY,
            isnull((select sum(tot_qty) from ksv_stock_in where po_cd = a.po_cd and matl_cd = a.matl_cd), 0) as STSIN,
            isnull((select sum(out_qty) from ksv_stock_out where po_cd = a.po_cd and matl_cd = a.matl_cd and left(out_from,5) <> 'stock'), 0) as STSOUT,
            (
                isnull((
                    select sum(m.po_qty)
                    from ksv_po_mrp m
                    where m.po_cd = a.po_cd and m.po_matl_cd = a.matl_cd and m.use_po_type = '2'
                ), 0)
                - isnull((
                    select sum(m.po_qty)
                    from ksv_po_mrp m
                    inner join ksv_stock_matl s on m.stock_idx = s.stock_idx and m.matl_cd = s.matl_cd
                    where m.po_cd = a.po_cd
                      and m.po_matl_cd = a.matl_cd
                      and m.matl_cd = a.matl_cd
                      and m.use_po_type = '2'
                      and s.po_cd = a.po_cd
                ), 0)
            ) as STOCK,
            isnull((select sum(in_qty) from ksv_stock_facin where po_cd = a.po_cd and matl_cd = a.matl_cd), 0) as FACIN_BASE,
            isnull((select sum(case when etc_type='Shortage' then etc_qty else 0 end) from ksv_stock_facetc where po_cd = a.po_cd and matl_cd = a.matl_cd), 0) as SHORTOVER,
            isnull((select sum(case when etc_type='Error' then etc_qty else 0 end) from ksv_stock_facetc where po_cd = a.po_cd and matl_cd = a.matl_cd), 0) as DEFECT,
            isnull((select sum(case when etc_type='Other' then etc_qty else 0 end) from ksv_stock_facetc where po_cd = a.po_cd and matl_cd = a.matl_cd), 0) as OTHER,
            isnull((select sum(out_qty) from ksv_stock_facout where po_cd = a.po_cd and matl_cd = a.matl_cd and remark like '%main%'), 0) as MAINUSE,
            isnull((select sum(out_qty) from ksv_stock_facout where po_cd = a.po_cd and matl_cd = a.matl_cd and remark like '%table_shortage%'), 0) as TABLE_SHORT,
            isnull((select sum(out_qty) from ksv_stock_facout where po_cd = a.po_cd and matl_cd = a.matl_cd and remark like '%keep_stock%'), 0) as KEEP_STOCK,
            isnull((select sum(out_qty) from ksv_stock_facout where po_cd = a.po_cd and matl_cd = a.matl_cd and remark like '%lost%'), 0) as LOST,
            isnull((select sum(stock_qty) from ksv_stock_matl where po_cd = a.po_cd and matl_cd = a.matl_cd and reason_make='RETURN'), 0) as LINE_RETURN,
            isnull((select sum(out_qty) from ksv_stock_facout where po_cd = a.po_cd and matl_cd = a.matl_cd), 0) as FACOUT,
            isnull((select sum(remain_qty) from ksv_stock_matl where po_cd = a.po_cd and matl_cd = a.matl_cd and stock_status in ('W','N')), 0) as MOQ_BASE,
            isnull((select sum(po_qty) from ksv_stock_mem where po_cd = a.po_cd and matl_cd = a.matl_cd and po_seq in (98, 99)), 0) as OVERIN,
            isnull(d.matl_price, 0) as PRICE,
            isnull(a.remark_bvt, '') as DELAYREMARK
        from ksv_po_matllist a
        inner join kcd_vendor b on b.vendor_cd = a.vendor_cd
        inner join kcd_matl_mst c on c.matl_cd = a.matl_cd
        left join kcd_matl_mem d on d.matl_cd = a.matl_cd
            and d.matl_seq = (select max(matl_seq) from kcd_matl_mem where matl_cd = a.matl_cd)
        where a.po_cd = '${PO_CD}'
        order by b.vendor_name, len(a.pr_num), a.pr_num
    `;

    const ret = (await prisma.$queryRaw(Prisma.sql([sqlStr]))) as any[];

    const tRetArray = (ret || []).map((col: any, i: number) => {
        const tObj: any = { ...col };
        tObj.id = i + 1;

        tObj.PO_CD = tObj.PO_CD ?? tObj.po_cd ?? '';
        tObj.VENDOR_NAME = tObj.VENDOR_NAME ?? tObj.vendor_name ?? '';
        tObj.MATL_CD = tObj.MATL_CD ?? tObj.matl_cd ?? '';
        tObj.MATL_NAME = tObj.MATL_NAME ?? tObj.matl_name ?? '';
        tObj.COLOR = tObj.COLOR ?? tObj.color ?? '';
        tObj.SPEC = tObj.SPEC ?? tObj.spec ?? '';
        tObj.UNIT = tObj.UNIT ?? tObj.unit ?? '';

        tObj.MRPQTY = Number(tObj.MRPQTY || 0);
        tObj.STSIN = Number(tObj.STSIN || 0);
        tObj.STSOUT = Number(tObj.STSOUT || 0);
        tObj.STOCK = Number(tObj.STOCK || 0);
        tObj.FACIN_BASE = Number(tObj.FACIN_BASE || tObj.FACIN || 0);
        tObj.SHORTOVER = Number(tObj.SHORTOVER || 0);
        tObj.DEFECT = Number(tObj.DEFECT || 0);
        tObj.ERROR = Number(tObj.DEFECT || 0);
        tObj.MAINUSE = Number(tObj.MAINUSE || 0);
        tObj.OTHER = Number(tObj.OTHER || 0);
        tObj.TABLE_SHORT = Number(tObj.TABLE_SHORT || 0);
        tObj.KEEP_STOCK = Number(tObj.KEEP_STOCK || 0);
        tObj.LOST = Number(tObj.LOST || 0);
        tObj.LINE_RETURN = Number(tObj.LINE_RETURN || 0);
        tObj.FACOUT = Number(tObj.FACOUT || 0);
        tObj.MOQ_BASE = Number(tObj.MOQ_BASE || 0);
        tObj.OVERIN = Number(tObj.OVERIN || 0);
        tObj.MOQ = Number(tObj.MOQ_BASE || 0);
        tObj.PRICE = Number(tObj.PRICE || 0);
        tObj.DELAYREMARK = tObj.DELAYREMARK || '';

        tObj.FACIN = Number(tObj.FACIN_BASE || 0) + Number(tObj.STOCK || 0);
        tObj.SHIPQTY = tObj.STSOUT - tObj.ERROR;
        tObj.REMAIN_A =
            tObj.FACIN -
            (tObj.SHORTOVER +
                tObj.DEFECT +
                tObj.MAINUSE +
                tObj.OTHER +
                tObj.TABLE_SHORT +
                tObj.KEEP_STOCK +
                tObj.LOST -
                tObj.LINE_RETURN);
        tObj.REMAIN_E =
            tObj.FACIN -
            tObj.SHORTOVER -
            tObj.DEFECT -
            tObj.MRPQTY -
            tObj.OTHER -
            tObj.KEEP_STOCK -
            tObj.LOST;

        tObj.DATAS = [];
        return tObj;
    });

    const sqlPo = `
        select a.order_cd
        from kvw_po_order a, ksv_order_mst b
        where a.po_cd = '${PO_CD}'
          and a.order_cd = b.order_cd
        order by a.order_cd
    `;
    const retPo = (await prisma.$queryRaw(Prisma.raw(sqlPo))) as any[];

    const sqlOrder = `
        select matl_cd, order_cd, isnull(sum(use_qty), 0) as po_qty
        from ksv_po_mrp
        where po_cd = '${PO_CD}'
          and use_po_type = '1'
        group by matl_cd, order_cd
        order by matl_cd
    `;
    const retOrder = (await prisma.$queryRaw(Prisma.raw(sqlOrder))) as any[];

    const tRetArray1: any[] = [];
    for (let k = 0; k < tRetArray.length; k++) {
        const tOne: any = { ...tRetArray[k] };
        const tDatas: any[] = [];

        retPo.forEach((col, i) => {
            const tObj: any = {};
            let tCheck = 0;

            const ordCnt = (tOne.ORD_CNT || '').toString();
            const chunk = ordCnt.substring(i * 8, i * 8 + 8);
            if (chunk && chunk !== '00000000' && chunk !== '________') {
                const qtyByOrdCnt = parseInt(chunk, 10);
                if (Number.isFinite(qtyByOrdCnt) && qtyByOrdCnt > 0) {
                    tObj.ORDER_CD = col.order_cd;
                    tObj.ORDER_QTY = qtyByOrdCnt.toFixed(2);
                    tCheck = 1;
                }
            }

            retOrder.forEach((col1) => {
                if (
                    tCheck === 0 &&
                    col1.matl_cd === tOne.MATL_CD &&
                    col.order_cd === col1.order_cd
                ) {
                    tObj.ORDER_CD = col.order_cd;
                    tObj.ORDER_QTY = parseFloat(col1.po_qty).toFixed(2);
                    tCheck = 1;
                }
            });

            if (tCheck === 0) {
                tObj.ORDER_CD = col.order_cd;
                tObj.ORDER_QTY = '0';
            }
            tDatas.push(tObj);
        });

        tOne.DATAS = [...tDatas];
        tRetArray1.push(tOne);
    }

    return tRetArray1;
};

export default moduleQuery_S0914_FAC_IN_OUT_MANAGER_REPORT;
