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

        mgrQuery_S0914_FAC_IN_OUT_MANAGER_REPORT2: async (
            _: any,
            args: any,
            contextValue: any,
        ) => {
            const qry = normalizeReportFilter(args.data || {});
            const poCd = qry.PO_CD;

            if (!poCd) throw new Error('poCd is required');

            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('PO Report2');

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
                        fgColor: { argb: 'FFFFFFCC' },
                    };
                }
            };

            const orderList = await getOrderSummaryForReport(poCd);
            const topListData = await getTopListDataForReport2(qry);
            const inDateHeaders = await getInDateHeadersForReport2(poCd);
            const inDateQtyMap = await getInDateQtyMapForReport2(poCd);
            const stsQtyMap = await getStsQtyMapForReport2(poCd);
            const regUserMap = await getRegUserMapForReport2(poCd);
            const matlInfoMap = await getMaterialInfoMapForReport2(
                poCd,
                topListData.map((row: any) => row.MATL_CD),
            );
            const stockUseRows = await getStockUseRowsForReport2(poCd);
            const leftOverRows = await getLeftOverRowsForReport2(poCd);

            const toNumber = (value: any) => {
                const num = Number(value ?? 0);
                return Number.isFinite(num) ? num : 0;
            };

            const toDisplay = (
                value: any,
                decimals = 0,
                blankWhenZero = true,
            ) => {
                const num = toNumber(value);
                if (blankWhenZero && Math.abs(num) < 0.0000001) {
                    return '';
                }
                return num.toFixed(decimals);
            };

            let currentRow = 1;

            const thinBorder = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' },
            };

            worksheet.getCell('F1').value = `PO NO. : ${poCd}`;
            worksheet.getCell('F1').font = {
                size: 12,
                bold: true,
                color: { argb: 'FFFF0000' },
            };
            worksheet.getCell('F1').border = thinBorder;
            worksheet.getCell('F1').alignment = { vertical: 'middle', horizontal: 'left' };

            if (orderList.length > 0) {
                const issueDate = orderList[0].PO_DATE
                    ? moment(orderList[0].PO_DATE).format('YYYY-MM-DD')
                    : '';
                const dueDate = orderList[0].MATL_DUE_DATE
                    ? moment(orderList[0].MATL_DUE_DATE).format('YYYY-MM-DD')
                    : '';

                worksheet.getCell('F2').value = `Issue Date : ${issueDate}`;
                worksheet.getCell('F2').border = thinBorder;
                worksheet.getCell('F2').alignment = { vertical: 'middle', horizontal: 'left' };
                worksheet.getCell('F2').font = { name: '맑은 고딕', size: 10 };

                worksheet.getCell('F3').value = `Due Date : ${dueDate}`;
                worksheet.getCell('F3').border = thinBorder;
                worksheet.getCell('F3').alignment = { vertical: 'middle', horizontal: 'left' };
                worksheet.getCell('F3').font = { name: '맑은 고딕', size: 10 };
            }

            // 오더 목록 헤더 행 (row 1, A~E)
            const orderColHeaders = ['ORDER NO', 'SEQ', 'BUYER', 'STYLE', "Q'TY"];
            orderColHeaders.forEach((text, i) => {
                const cell = worksheet.getCell(1, i + 1);
                cell.value = text;
                setStyle(cell, true, 'center');
            });

            orderList.forEach((record: any, index: number) => {
                currentRow = index + 2;
                const values = [
                    `(${index + 1}) ${record.ORDER_CD}`,
                    Number(record.SEQ ?? 0),
                    record.BUYER_NAME,
                    record.STYLE_NAME,
                    Number(record.TOT_CNT ?? 0),
                ];

                values.forEach((value, index) => {
                    const cell = worksheet.getCell(currentRow, index + 1);
                    cell.value = value;
                    setStyle(
                        cell,
                        false,
                        index === 1 || index === 4 ? 'right' : 'center',
                    );
                    if (index === 4) {
                        cell.numFmt = '#,##0';
                    }
                });
            });

            const tableStartRow = Math.max(orderList.length + 3, 5);

            const leadingHeaders = [
                'Supplier',
                'No',
                'Matl Cd',
                'Desc',
                'Color',
                'Spec',
                'Unit',
                'Need Qty',
            ];

            let headerCol = 1;
            leadingHeaders.forEach((text) => {
                const cell = worksheet.getCell(tableStartRow, headerCol++);
                cell.value = text;
                setStyle(cell, true);
            });

            for (const orderRecord of orderList) {
                let cell = worksheet.getCell(tableStartRow, headerCol++);
                cell.value = orderRecord.ORDER_CD;
                setStyle(cell, true);

                cell = worksheet.getCell(tableStartRow, headerCol++);
                cell.value = `N${headerCol / 2 - 4}`;
                setStyle(cell, true);
            }

            for (const item of inDateHeaders) {
                const cell = worksheet.getCell(tableStartRow, headerCol++);
                const inDate = String(item.IN_DATE || '');
                cell.value = `${inDate.substring(4)}(${item.DELIVERY || ''})`;
                setStyle(cell, true);
            }

            const trailingHeaders = [
                'Stock',
                'Total',
                'Err',
                'Shortage in Roll',
                'Other',
                'Bal',
                `ActCon's`,
                'Adjust Qty',
                'OutputBal   ',
                'Sts',
                'Bal2',
                'Remark STS',
                'Remark BVT',
                'EXP/ETD/ETA/Delivery',
                'RegUser',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                'Price',
                'Curr',
                'Kind2',
                'V-Custom',
                'HS CODE',
                'HS NAME',
                'COMPOSITION',
            ];
            trailingHeaders.forEach((text) => {
                const cell = worksheet.getCell(tableStartRow, headerCol++);
                cell.value = text;
                setStyle(cell, true);
            });

            currentRow = tableStartRow + 1;
            let previousSupplier = '';
            let supplierGroupIndex = 0;
            let subIndex = 0;

            for (const row of topListData) {
                if (row.VENDOR_NAME !== previousSupplier) {
                    supplierGroupIndex++;
                    subIndex = 1;
                    previousSupplier = row.VENDOR_NAME;
                } else {
                    subIndex++;
                }

                const noValue = `${supplierGroupIndex}-${subIndex}`;
                const selectedOrder = qry.ORDER_CD
                    ? (row.DATAS || []).find(
                          (item: any) => item.ORDER_CD === qry.ORDER_CD,
                      )
                    : null;
                if (
                    qry.ORDER_CD &&
                    toNumber(selectedOrder?.ORDER_QTY ?? 0) <= 0
                ) {
                    continue;
                }

                const total = toNumber(row.FACIN ?? 0);
                const err = toNumber(row.DEFECT ?? 0);
                const shortage = toNumber(row.SHORTOVER ?? 0);
                const other = toNumber(row.OTHER ?? 0);
                const adjustQty =
                    toNumber(row.MOVE_STOCK ?? 0) + toNumber(row.ADJUST ?? 0);
                const actCon = (row.DATAS || []).reduce(
                    (sum: number, item: any) => sum + toNumber(item.OUT_QTY ?? 0),
                    0,
                );
                const stsQty = toNumber(stsQtyMap.get(row.MATL_CD) ?? 0);
                const bal =
                    total -
                    toNumber(row.MRPQTY ?? 0) -
                    err -
                    shortage -
                    other -
                    adjustQty;
                const outputBal = total - actCon - err - shortage - other - adjustQty;
                const bal2 = stsQty + toNumber(row.STOCK ?? 0) - total;

                const fixedValues = [
                    row.VENDOR_NAME,
                    noValue,
                    row.MATL_CD,
                    row.MATL_NAME,
                    row.COLOR,
                    row.SPEC,
                    row.UNIT,
                    toNumber(row.MRPQTY ?? 0),
                ];

                let dataCol = 1;
                fixedValues.forEach((value, index) => {
                    const cell = worksheet.getCell(currentRow, dataCol++);
                    cell.value = value;
                    setStyle(cell, false, index === 7 ? 'right' : 'center');
                    if (index === 7) {
                        cell.numFmt = '#,##0';
                    }
                });

                for (const orderRecord of orderList) {
                    const orderRow = (row.DATAS || []).find(
                        (item: any) => item.ORDER_CD === orderRecord.ORDER_CD,
                    );

                    let cell = worksheet.getCell(currentRow, dataCol++);
                    const oQty = toNumber(orderRow?.ORDER_QTY ?? 0);
                    cell.value = oQty === 0 ? null : oQty;
                    cell.numFmt = '#,##0';
                    setStyle(cell, false, 'right');

                    cell = worksheet.getCell(currentRow, dataCol++);
                    const outQty = toNumber(orderRow?.OUT_QTY ?? 0);
                    cell.value = outQty === 0 ? null : outQty;
                    cell.numFmt = '#,##0';
                    setStyle(cell, false, 'right');
                }

                for (const item of inDateHeaders) {
                    const key = `${row.MATL_CD}|${item.IN_DATE}|${item.DELIVERY}`;
                    const cell = worksheet.getCell(currentRow, dataCol++);
                    const inQty = toNumber(inDateQtyMap.get(key) ?? 0);
                    cell.value = inQty === 0 ? null : inQty;
                    cell.numFmt = '#,##0.0';
                    setStyle(cell, false, 'right');
                }

                const regUser = regUserMap.get(row.MATL_CD) ?? '';

                // trailing 숫자 컬럼 (index 0~10): 실제 숫자로 저장
                const trailingNumFmts = [
                    '#,##0',   // 0: Stock
                    '#,##0',   // 1: Total
                    '#,##0',   // 2: Err
                    '#,##0',   // 3: Shortage
                    '#,##0',   // 4: Other
                    '#,##0.0', // 5: Bal
                    '#,##0',   // 6: ActCon
                    '#,##0',   // 7: AdjustQty
                    '#,##0',   // 8: OutputBal
                    '#,##0.0', // 9: Sts
                    '#,##0.0', // 10: Bal2
                ];
                const trailingNums = [
                    toNumber(row.STOCK ?? 0),
                    total,
                    err,
                    shortage,
                    other,
                    bal,
                    actCon,
                    adjustQty,
                    outputBal,
                    stsQty,
                    bal2,
                ];
                const trailingTexts = [
                    row.DELAYREMARK ?? '',
                    row.REMARK_BVT ?? '',
                    row.EXP_ETD_ETA_DELIVERY ?? ' /  /  / ',
                    regUser,
                    '', '', '', '', '', '', '',
                    row.PRICE ?? '',
                    matlInfoMap.get(String(row.MATL_CD ?? ''))?.CURR_CD ?? '',
                    matlInfoMap.get(String(row.MATL_CD ?? ''))?.KIND2 ?? '',
                    matlInfoMap.get(String(row.MATL_CD ?? ''))?.V_CUSTOM ?? '',
                    matlInfoMap.get(String(row.MATL_CD ?? ''))?.HS_CODE ?? '',
                    matlInfoMap.get(String(row.MATL_CD ?? ''))?.HS_NAME ?? '',
                    matlInfoMap.get(String(row.MATL_CD ?? ''))?.COMPOSITION ?? '',
                ];

                trailingNums.forEach((num, index) => {
                    const cell = worksheet.getCell(currentRow, dataCol++);
                    cell.value = num === 0 ? null : num;
                    cell.numFmt = trailingNumFmts[index];
                    setStyle(cell, false, 'right');
                });

                trailingTexts.forEach((value) => {
                    const cell = worksheet.getCell(currentRow, dataCol++);
                    cell.value = value;
                    setStyle(cell, false, 'left');
                });

                currentRow++;
            }

            currentRow += 2;
            worksheet.getCell(currentRow, 1).value = 'Stock Use';
            worksheet.getCell(currentRow, 1).font = { bold: true, size: 11 };
            currentRow++;

            ['W/H', 'Matl Code', 'Matl Name', 'Color', 'Spec', 'Unit', 'Qty'].forEach(
                (text, index) => {
                    const cell = worksheet.getCell(currentRow, index + 1);
                    cell.value = text;
                    setStyle(cell, true);
                },
            );
            currentRow++;

            stockUseRows.forEach((row: any) => {
                const values = [
                    row.WARE_NAME,
                    row.MATL_CD,
                    row.MATL_NAME,
                    row.COLOR,
                    row.SPEC,
                    row.UNIT,
                    Number(row.QTY ?? 0),
                ];

                values.forEach((value, index) => {
                    const cell = worksheet.getCell(currentRow, index + 1);
                    cell.value = value;
                    setStyle(cell, false, index === 6 ? 'right' : 'center');
                    if (index === 6) {
                        cell.numFmt = '#,##0.00';
                    }
                });

                currentRow++;
            });

            currentRow += 2;
            worksheet.getCell(currentRow, 1).value = 'Left Over';
            worksheet.getCell(currentRow, 1).font = { bold: true, size: 11 };
            currentRow++;

            ['Supplier', 'Matl Code', 'Matl Name', 'Color', 'Spec', 'Unit', 'Qty'].forEach(
                (text, index) => {
                    const cell = worksheet.getCell(currentRow, index + 1);
                    cell.value = text;
                    setStyle(cell, true);
                },
            );
            currentRow++;

            leftOverRows.forEach((row: any) => {
                const values = [
                    row.VENDOR_NAME,
                    row.MATL_CD,
                    row.MATL_NAME,
                    row.COLOR,
                    row.SPEC,
                    row.UNIT,
                    Number(row.QTY ?? 0),
                ];

                values.forEach((value, index) => {
                    const cell = worksheet.getCell(currentRow, index + 1);
                    cell.value = value;
                    setStyle(cell, false, index === 6 ? 'right' : 'center');
                    if (index === 6) {
                        cell.numFmt = '#,##0.00';
                    }
                });

                currentRow++;
            });

            adjustColumnWidths(worksheet, 1, Math.max(12, headerCol - 1));

            const fileName = `${poCd}_report2_${moment().format('YYYYMMDD_HHmmss')}.xlsx`;
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

const normalizeReportFilter = (data: any) => ({
    PO_CD: String(data?.PO_CD ?? '').trim(),
    ORDER_CD: String(data?.ORDER_CD ?? '').trim(),
    SUPPLIER: String(data?.SUPPLIER ?? '').trim(),
    DESCRIPTION: String(data?.DESCRIPTION ?? '').trim(),
    UNIT: String(data?.UNIT ?? '').trim(),
    MATL_CD: String(data?.MATL_CD ?? '').trim(),
    COLOR: String(data?.COLOR ?? '').trim(),
    SPEC: String(data?.SPEC ?? '').trim(),
});

const getOrderSummaryForReport = async (PO_CD: string) => {
    const sqlStr = `
        SELECT
            A.ORDER_CD,
            COUNT(B.PROD_CD) AS SEQ,
            C.BUYER_NAME,
            D.STYLE_NAME,
            A.TOT_CNT,
            MAX(G.PO_DATE) AS PO_DATE,
            MAX(G.MATL_DUE_DATE) AS MATL_DUE_DATE
        FROM
            KSV_ORDER_MST AS A
            INNER JOIN KSV_ORDER_MEM AS B ON A.ORDER_CD = B.ORDER_CD
            INNER JOIN KCD_BUYER AS C ON LEFT(A.ORDER_CD, 2) = C.BUYER_CD
            INNER JOIN KCD_STYLE AS D ON A.STYLE_CD = D.STYLE_CD
            INNER JOIN KSV_PO_MEM AS F ON A.ORDER_CD = F.ORDER_CD
            INNER JOIN KSV_PO_MST AS G ON F.PO_CD = G.PO_CD
        WHERE
            F.PO_CD = '${PO_CD}'
            AND F.PO_SEQ = '1'
            AND G.PO_SEQ = '1'
        GROUP BY
            A.ORDER_CD,
            C.BUYER_NAME,
            D.STYLE_NAME,
            A.TOT_CNT
        ORDER BY
            A.ORDER_CD
    `;

    return (await prisma.$queryRaw(Prisma.raw(sqlStr))) as any[];
};

const getTopListDataForReport2 = async (filter: any) => {
    const qry = normalizeReportFilter(filter);
    const { PO_CD, ORDER_CD, SUPPLIER, DESCRIPTION, UNIT, MATL_CD, COLOR, SPEC } =
        qry;

    if (!PO_CD) {
        return [];
    }

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
                    where m.po_cd = a.po_cd
                      and m.po_matl_cd = a.matl_cd
                      and m.use_po_type = '2'
                ), 0)
                - isnull((
                    select sum(m.po_qty)
                    from ksv_po_mrp m
                    inner join ksv_stock_matl s on m.stock_idx = s.stock_idx
                        and m.matl_cd = s.matl_cd
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
            isnull((select sum(case when etc_type='Adjust' then etc_qty else 0 end) from ksv_stock_facetc where po_cd = a.po_cd and matl_cd = a.matl_cd), 0) as ADJUST,
            isnull((select sum(out_qty) from ksv_stock_facout where po_cd = a.po_cd and matl_cd = a.matl_cd and (remark like '%sasmple%' or remark like '%m_up%' or remark like '%test%')), 0) as OTHER,
            isnull((select sum(out_qty) from ksv_stock_facout where po_cd = a.po_cd and matl_cd = a.matl_cd and remark like 'defect%'), 0) as DEFECT_A,
            isnull((select sum(out_qty) from ksv_stock_facout where po_cd = a.po_cd and matl_cd = a.matl_cd and remark like '%main%'), 0) as MAINUSE,
            isnull((select sum(out_qty) from ksv_stock_facout where po_cd = a.po_cd and matl_cd = a.matl_cd and remark like '%table_shortage%'), 0) as TABLE_SHORT,
            isnull((select sum(out_qty) from ksv_stock_facout where po_cd = a.po_cd and matl_cd = a.matl_cd and remark like '%keep_stock%'), 0) as KEEP_STOCK,
            isnull((select sum(out_qty) from ksv_stock_facout where po_cd = a.po_cd and matl_cd = a.matl_cd and remark like '%move_stock%'), 0) as MOVE_STOCK,
            isnull((select sum(out_qty) from ksv_stock_facout where po_cd = a.po_cd and matl_cd = a.matl_cd and remark like '%lost%'), 0) as LOST,
            isnull((select sum(stock_qty) from ksv_stock_matl where po_cd = a.po_cd and matl_cd = a.matl_cd and reason_make='RETURN'), 0) as LINE_RETURN,
            isnull((
                select sum(isnull(su.use_qty, 0))
                from ksv_stock_matl sm
                inner join ksv_stock_use su on su.stock_idx = sm.stock_idx
                where sm.po_cd = a.po_cd
                  and sm.matl_cd = a.matl_cd
                  and sm.stock_status in ('W', 'N')
                  and su.use_po_cd <> a.po_cd
            ), 0) as MOQ_BASE,
            isnull((select sum(po_qty) from ksv_stock_mem where po_cd = a.po_cd and matl_cd = a.matl_cd and po_seq in (98, 99)), 0) as OVERIN,
            isnull(d.matl_price, 0) as PRICE,
            isnull(a.remark, '') as DELAYREMARK,
            isnull(a.remark_bvt, '') as REMARK_BVT,
            isnull(a.exp_date + ' / ' + a.etd + ' / ' + a.eta + ' / ' + a.delivery, ' /  /  / ') as EXP_ETD_ETA_DELIVERY
        from ksv_po_matllist a
        inner join kcd_vendor b on b.vendor_cd = a.vendor_cd
        inner join kcd_matl_mst c on c.matl_cd = a.matl_cd
        left join kcd_matl_mem d on d.matl_cd = a.matl_cd
            and d.matl_seq = (select max(matl_seq) from kcd_matl_mem where matl_cd = a.matl_cd)
        where 1 = 1
          and a.po_cd = '${PO_CD}'
          and a.matl_cd like '%${MATL_CD}%'
          and c.matl_name like '%${DESCRIPTION}%'
          and c.color like '%${COLOR}%'
          and c.spec like '%${SPEC}%'
          and c.unit like '%${UNIT}%'
          and b.vendor_name like '%${SUPPLIER}%'
        order by b.vendor_name, len(a.pr_num), a.pr_num
    `;

    const ret = (await prisma.$queryRaw(Prisma.sql([sqlStr]))) as any[];

    const mapped = (ret || []).map((col: any, i: number) => {
        const row: any = { ...col };

        row.id = i + 1;
        row.PO_CD = row.PO_CD ?? row.po_cd ?? '';
        row.VENDOR_NAME = row.VENDOR_NAME ?? row.vendor_name ?? '';
        row.MATL_CD = row.MATL_CD ?? row.matl_cd ?? '';
        row.MATL_NAME = row.MATL_NAME ?? row.matl_name ?? '';
        row.COLOR = row.COLOR ?? row.color ?? '';
        row.SPEC = row.SPEC ?? row.spec ?? '';
        row.UNIT = row.UNIT ?? row.unit ?? '';
        row.ORD_CNT = row.ORD_CNT ?? row.ord_cnt ?? '';
        row.MRPQTY = Number(row.MRPQTY || 0);
        row.STSIN = Number(row.STSIN || 0);
        row.STSOUT = Number(row.STSOUT || 0);
        row.STOCK = Number(row.STOCK || 0);
        row.FACIN_BASE = Number(row.FACIN_BASE || 0);
        row.SHORTOVER = Number(row.SHORTOVER || 0);
        row.DEFECT = Number(row.DEFECT || 0);
        row.ERROR = Number(row.DEFECT || 0);
        row.ADJUST = Number(row.ADJUST || 0);
        row.DEFECT_A = Number(row.DEFECT_A || 0);
        row.MAINUSE = Number(row.MAINUSE || 0);
        row.OTHER = Number(row.OTHER || 0);
        row.TABLE_SHORT = Number(row.TABLE_SHORT || 0);
        row.KEEP_STOCK = Number(row.KEEP_STOCK || 0);
        row.MOVE_STOCK = Number(row.MOVE_STOCK || 0);
        row.LOST = Number(row.LOST || 0);
        row.LINE_RETURN = Number(row.LINE_RETURN || 0);
        row.MOQ_BASE = Number(row.MOQ_BASE || 0);
        row.OVERIN = Number(row.OVERIN || 0);
        row.MOQ = row.MOQ_BASE;
        row.PRICE = Number(row.PRICE || 0);
        row.DELAYREMARK = row.DELAYREMARK || '';
        row.REMARK_BVT = row.REMARK_BVT || row.DELAYREMARK || '';
        row.EXP_ETD_ETA_DELIVERY = row.EXP_ETD_ETA_DELIVERY || ' /  /  / ';
        row.FACIN = row.FACIN_BASE + row.STOCK;
        row.SHIPQTY = row.STSOUT + row.ERROR;
        row.FACOUT =
            row.SHORTOVER +
            row.DEFECT_A +
            row.MAINUSE +
            row.OTHER +
            row.TABLE_SHORT +
            row.KEEP_STOCK +
            row.LOST -
            row.LINE_RETURN;
        row.REMAIN_A =
            row.FACIN -
            (row.SHORTOVER +
                row.DEFECT_A +
                row.MAINUSE +
                row.OTHER +
                row.TABLE_SHORT +
                row.KEEP_STOCK +
                row.LOST);
        row.REMAIN_E =
            row.FACIN -
            row.SHORTOVER -
            row.DEFECT -
            row.MRPQTY -
            row.OTHER -
            row.KEEP_STOCK -
            row.LOST;
        row.DATAS = [];

        return row;
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

    const sqlOutByOrder = `
        select matl_cd, order_cd, isnull(sum(out_qty), 0) as out_qty
        from ksv_stock_facout
        where po_cd = '${PO_CD}'
        group by matl_cd, order_cd
    `;
    const retOutByOrder = (await prisma.$queryRaw(
        Prisma.raw(sqlOutByOrder),
    )) as any[];

    const result: any[] = [];
    for (const one of mapped) {
        const next = { ...one };
        const datas: any[] = [];

        retPo.forEach((col: any, index: number) => {
            const dataRow: any = {};
            let matched = false;
            let outQty = '0';

            retOutByOrder.forEach((col2: any) => {
                if (col2.matl_cd === next.MATL_CD && col2.order_cd === col.order_cd) {
                    outQty = parseFloat(col2.out_qty).toFixed(2);
                }
            });

            if (!ORDER_CD) {
                const ordCnt = String(next.ORD_CNT || '');
                const chunk = ordCnt.substring(index * 8, index * 8 + 8);
                if (chunk && chunk !== '00000000' && chunk !== '________') {
                    const qtyByOrdCnt = parseInt(chunk, 10);
                    if (Number.isFinite(qtyByOrdCnt) && qtyByOrdCnt > 0) {
                        dataRow.ORDER_CD = col.order_cd;
                        dataRow.ORDER_QTY = qtyByOrdCnt.toFixed(2);
                        dataRow.OUT_QTY = outQty;
                        matched = true;
                    }
                }
            }

            retOrder.forEach((col1: any) => {
                if (
                    !matched &&
                    col1.matl_cd === next.MATL_CD &&
                    col.order_cd === col1.order_cd
                ) {
                    dataRow.ORDER_CD = col.order_cd;
                    dataRow.ORDER_QTY = parseFloat(col1.po_qty).toFixed(2);
                    dataRow.OUT_QTY = outQty;
                    matched = true;
                }
            });

            if (!matched) {
                dataRow.ORDER_CD = col.order_cd;
                dataRow.ORDER_QTY = '0';
                dataRow.OUT_QTY = outQty;
            }

            datas.push(dataRow);
        });

        next.DATAS = datas;

        if (ORDER_CD) {
            const orderRow = next.DATAS.find(
                (x: any) => x.ORDER_CD === ORDER_CD,
            );
            const orderQty = Number(orderRow?.ORDER_QTY || 0);
            if (!orderRow || orderQty <= 0) {
                continue;
            }
        }

        result.push(next);
    }

    return result;
};

const getInDateHeadersForReport2 = async (PO_CD: string) => {
    const sqlStr = `
        select distinct in_date as IN_DATE, delivery as DELIVERY
        from ksv_stock_facin
        where po_cd = '${PO_CD}'
        order by in_date, delivery
    `;

    return (await prisma.$queryRaw(Prisma.raw(sqlStr))) as any[];
};

const getInDateQtyMapForReport2 = async (PO_CD: string) => {
    const sqlStr = `
        select in_date as IN_DATE, delivery as DELIVERY, matl_cd as MATL_CD, sum(in_qty) as IN_QTY
        from ksv_stock_facin
        where po_cd = '${PO_CD}'
        group by in_date, delivery, matl_cd
    `;

    const rows = (await prisma.$queryRaw(Prisma.raw(sqlStr))) as any[];
    const result = new Map<string, number>();
    rows.forEach((row) => {
        result.set(
            `${row.MATL_CD}|${row.IN_DATE}|${row.DELIVERY}`,
            Number(row.IN_QTY ?? 0),
        );
    });
    return result;
};

const getStsQtyMapForReport2 = async (PO_CD: string) => {
    const sqlStr = `
        select matl_cd as MATL_CD, sum(tot_qty) as STS_QTY
        from ksv_stock_in
        where po_cd = '${PO_CD}'
        group by matl_cd
    `;

    const rows = (await prisma.$queryRaw(Prisma.raw(sqlStr))) as any[];
    const result = new Map<string, number>();
    rows.forEach((row) => {
        result.set(String(row.MATL_CD ?? ''), Number(row.STS_QTY ?? 0));
    });
    return result;
};

const getRegUserMapForReport2 = async (PO_CD: string) => {
    const sqlStr = `
        select t.matl_cd as MATL_CD, t.reg_user as REG_USER
        from (
            select matl_cd, reg_user,
                   row_number() over (partition by matl_cd order by reg_datetime asc, reg_user asc) as rn
            from ksv_stock_facin
            where po_cd = '${PO_CD}'
        ) t
        where t.rn = 1
    `;

    const rows = (await prisma.$queryRaw(Prisma.raw(sqlStr))) as any[];
    const result = new Map<string, string>();
    rows.forEach((row) => {
        result.set(String(row.MATL_CD ?? ''), String(row.REG_USER ?? ''));
    });
    return result;
};

const getMaterialInfoMapForReport2 = async (
    PO_CD: string,
    matlCds: string[],
) => {
    const keys = Array.from(
        new Set(
            (matlCds || [])
                .map((value) => String(value || '').trim())
                .filter((value) => value !== ''),
        ),
    );

    const result = new Map<string, any>();

    if (keys.length === 0) {
        return result;
    }

    const sqlStr = Prisma.sql`
        SELECT
            A.MATL_CD,
            ISNULL(MM.CURR_CD, '') AS CURR_CD,
            ISNULL(T2.MATL_TYPE2, '') AS KIND2,
            ISNULL(CV.COMP1, '') AS V_CUSTOM,
            ISNULL(HS.HS_CD, '') AS HS_CODE,
            ISNULL(HS.HS_NAME, '') AS HS_NAME,
            ISNULL(
                CASE
                    WHEN ISNULL(CP.COMP4, '') <> '' THEN
                        CP.COMP1 + '-' + CAST(CP.COMP1_PERCENT AS VARCHAR) + '%' + ' ' +
                        CP.COMP2 + '-' + CAST(CP.COMP2_PERCENT AS VARCHAR) + '%' + ' ' +
                        CP.COMP3 + '-' + CAST(CP.COMP3_PERCENT AS VARCHAR) + '%' + ' ' +
                        CP.COMP4 + '-' + CAST(CP.COMP4_PERCENT AS VARCHAR) + '%'
                    WHEN ISNULL(CP.COMP3, '') <> '' THEN
                        CP.COMP1 + '-' + CAST(CP.COMP1_PERCENT AS VARCHAR) + '%' + ' ' +
                        CP.COMP2 + '-' + CAST(CP.COMP2_PERCENT AS VARCHAR) + '%' + ' ' +
                        CP.COMP3 + '-' + CAST(CP.COMP3_PERCENT AS VARCHAR) + '%'
                    WHEN ISNULL(CP.COMP2, '') <> '' THEN
                        CP.COMP1 + '-' + CAST(CP.COMP1_PERCENT AS VARCHAR) + '%' + ' ' +
                        CP.COMP2 + '-' + CAST(CP.COMP2_PERCENT AS VARCHAR) + '%'
                    WHEN ISNULL(CP.COMP1, '') <> '' THEN
                        CP.COMP1 + '-' + CAST(CP.COMP1_PERCENT AS VARCHAR) + '%'
                    ELSE ''
                END,
                ''
            ) AS COMPOSITION
        FROM
            KCD_MATL_MST A
            OUTER APPLY (
                SELECT TOP 1 CURR_CD
                FROM KCD_MATL_MEM
                WHERE MATL_CD = A.MATL_CD
                ORDER BY MATL_SEQ DESC
            ) MM
            OUTER APPLY (
                SELECT TOP 1 COMP1
                FROM KCD_COMPOSITION_V
                WHERE MATL_NAME = A.MATL_NAME
            ) CV
            OUTER APPLY (
                SELECT TOP 1 COMP1, COMP1_PERCENT, COMP2, COMP2_PERCENT, COMP3, COMP3_PERCENT, COMP4, COMP4_PERCENT
                FROM KCD_COMPOSITION
                WHERE MATL_NAME = A.MATL_NAME
            ) CP
            LEFT JOIN KCD_MATL_TYPE2 T2 ON A.MATL_TYPE2 = T2.SEQ
            LEFT JOIN KCD_HSCODE HS ON A.HS_CD = HS.HS_NO
        WHERE
            A.MATL_CD IN (${Prisma.join(keys)})
    `;

    const rows = (await prisma.$queryRaw(sqlStr)) as any[];
    rows.forEach((row) => {
        result.set(String(row.MATL_CD ?? ''), {
            CURR_CD: row.CURR_CD ?? '',
            KIND2: row.KIND2 ?? '',
            V_CUSTOM: row.V_CUSTOM ?? '',
            HS_CODE: row.HS_CODE ?? '',
            HS_NAME: row.HS_NAME ?? '',
            COMPOSITION: row.COMPOSITION ?? '',
        });
    });

    return result;
};

const getStockUseRowsForReport2 = async (PO_CD: string) => {
    const sqlStr = `
        SELECT
            F.WARE_NAME + '(' + B.PO_MATL_CD + ')' AS WARE_NAME,
            B.MATL_CD,
            A.MATL_NAME,
            A.COLOR,
            A.SPEC,
            A.UNIT,
            SUM(B.PO_QTY) AS QTY
        FROM
            KCD_MATL_MST AS A
            INNER JOIN KSV_PO_MRP AS B ON A.MATL_CD = B.MATL_CD
            INNER JOIN KCD_VENDOR AS C ON A.VENDOR_CD = C.VENDOR_CD
            INNER JOIN KCD_MATL_MEM AS D ON A.MATL_CD = D.MATL_CD
                AND B.MATL_SEQ = D.MATL_SEQ
            INNER JOIN KSV_STOCK_MATL AS E ON B.STOCK_IDX = E.STOCK_IDX
            INNER JOIN KCD_FACTORY_WARE AS F ON F.WARE_CD = E.FACTORY_CD
        WHERE
            B.PO_CD = '${PO_CD}'
            AND B.USE_PO_TYPE = '2'
            AND B.DIFF_PO_TYPE <> '2'
        GROUP BY
            C.VENDOR_NAME,
            B.MATL_CD,
            A.COLOR,
            A.MATL_NAME,
            A.SPEC,
            A.UNIT,
            B.PO_MATL_CD,
            F.WARE_NAME
        ORDER BY
            F.WARE_NAME,
            C.VENDOR_NAME,
            A.MATL_NAME,
            A.COLOR,
            A.SPEC
    `;

    return (await prisma.$queryRaw(Prisma.raw(sqlStr))) as any[];
};

const getLeftOverRowsForReport2 = async (PO_CD: string) => {
    const sqlStr = `
        SELECT
            C.VENDOR_NAME,
            A.MATL_CD,
            B.MATL_NAME,
            B.COLOR,
            B.SPEC,
            B.UNIT,
            SUM(A.DIFF_QTY) AS QTY
        FROM
            KSV_PO_MRP A,
            KCD_MATL_MST B,
            KCD_VENDOR C
        WHERE
            A.PO_CD = '${PO_CD}'
            AND A.DIFF_PO_TYPE = '1'
            AND B.MATL_CD = A.MATL_CD
            AND C.VENDOR_CD = B.VENDOR_CD
        GROUP BY
            C.VENDOR_NAME,
            A.MATL_CD,
            B.MATL_NAME,
            B.COLOR,
            B.SPEC,
            B.UNIT,
            A.PO_SEQ
        ORDER BY
            1,
            2,
            3,
            4,
            5
    `;

    return (await prisma.$queryRaw(Prisma.raw(sqlStr))) as any[];
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
