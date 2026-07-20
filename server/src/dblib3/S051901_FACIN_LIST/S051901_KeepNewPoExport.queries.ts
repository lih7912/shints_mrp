// S051901_KeepNewPoExport.queries.ts

import AFLib from '../../commlib';
import { Prisma } from '@prisma/client';
import prisma from '../../db';

const Excel = require('exceljs');
const { upload } = require('../../../routes/s3');
const moment = require('moment');

const parseExportDate = (dateValue: any) => {
    try {
        if (
            dateValue === null ||
            typeof dateValue === 'undefined' ||
            dateValue === '' ||
            dateValue === 'null' ||
            dateValue === 'undefined'
        ) {
            return null;
        }

        const text = String(dateValue).trim();
        const normalizedText = text
            .replace(/\s*\.\s*/g, '.')
            .replace(/\s*\/\s*/g, '/')
            .replace(/\s*-\s*/g, '-')
            .replace(/\s+/g, ' ')
            .trim();

        const parsed = moment(
            normalizedText,
            [
                'YYYY/MM/DD HH:mm:ss',
                'YYYY/M/D HH:mm:ss',
                'YYYY/MM/DD H:m:s',
                'YYYY/M/D H:m:s',
                'YYYY.MM.DD HH:mm:ss',
                'YYYY.M.D HH:mm:ss',
                'YYYY.MM.DD H:m:s',
                'YYYY.M.D H:m:s',
                'YYYY-MM-DD HH:mm:ss',
                'YYYY-M-D HH:mm:ss',
                'YYYY-MM-DD H:m:s',
                'YYYY-M-D H:m:s',
                'YYYYMMDDHHmmss',
                'YYYYMMDD',
                'YYYY/MM/DD',
                'YYYY/M/D',
                'YYYY.MM.DD',
                'YYYY.M.D',
                'YYYY-MM-DD',
                'YYYY-M-D',
            ],
            true,
        );

        if (!parsed.isValid()) {
            const ymdMatch = normalizedText.match(
                /^(\d{4})[.\/-](\d{1,2})[.\/-](\d{1,2})(?:\s|$)/,
            );
            if (!ymdMatch) {
                return null;
            }

            const normalizedYmd = `${Number(ymdMatch[1])}/${Number(ymdMatch[2])}/${Number(ymdMatch[3])}`;
            const fallback = moment(normalizedYmd, 'YYYY/M/D', true);
            if (!fallback.isValid()) {
                return null;
            }
            return fallback.toDate();
        }

        const normalizedYmd = parsed.format('YYYY/M/D');
        const normalized = moment(normalizedYmd, 'YYYY/M/D', true);
        if (!normalized.isValid()) {
            return null;
        }

        return normalized.toDate();
    } catch (err) {
        return null;
    }
};

const formatExportDateLabel = (dateValue: any) => {
    if (dateValue instanceof Date) {
        return moment(dateValue).format('DD-MMM');
    }
    const parsed = parseExportDate(dateValue);
    if (!parsed) {
        return '';
    }
    return moment(parsed).format('DD-MMM');
};

const toMapKey = (poCd: string, matlCd: string) => `${poCd}||${matlCd}`;

const escapeSql = (value: string) => String(value || '').replace(/'/g, "''");

const loadUsePoSummaryMap = async (datas: any[]) => {
    const summaryMap: Record<string, Array<{ USE_PO_CD: string; USE_QTY: number }>> = {};
    const uniqueKeys: Record<string, boolean> = {};

    for (const one of datas || []) {
        const poCd = String(one?.PO_CD || '').trim();
        const matlCd = String(one?.MATL_CD || '').trim();
        if (!poCd || !matlCd) continue;

        const key = toMapKey(poCd, matlCd);
        if (uniqueKeys[key]) continue;
        uniqueKeys[key] = true;

        const sql = `
            SELECT
                USE_PO_CD,
                ISNULL(SUM(USE_QTY), 0) AS USE_QTY
            FROM
                KSV_STOCK_USE
            WHERE
                STOCK_IDX IN (
                    SELECT
                        STOCK_IDX
                    FROM
                        KSV_PO_MRP
                    WHERE
                        1 = 1
                        AND PO_CD = '${escapeSql(poCd)}'
                        AND MATL_CD = '${escapeSql(matlCd)}'
                        AND PO_SEQ IN ('97', '98', '99')
                        AND PO_CD IS NOT NULL
                )
            GROUP BY
                USE_PO_CD
            ORDER BY
                USE_PO_CD
        `;

        const rows = (await prisma.$queryRaw(Prisma.raw(sql))) as any[];
        summaryMap[key] = (rows || []).map((r) => ({
            USE_PO_CD: String(r.USE_PO_CD || ''),
            USE_QTY: Number(r.USE_QTY || 0),
        }));
    }

    return summaryMap;
};

const moduleQuery_S051901_KeepNewPoExport = {
    Query: {
        mgrExport_S051901_KeepNewPO: async (_, args, contextValue) => {
            try {
                if (!args.datas || args.datas.length === 0) {
                    return {
                        CODE: 'ERROR:No data to export',
                        URL: '',
                    };
                }

                const workbook = new Excel.Workbook();
                const worksheet = workbook.addWorksheet('KEEPING TO NEW PO#');
                const usePoSummaryMap = await loadUsePoSummaryMap(args.datas || []);
                const todayDate = new Date();
                const todayDateLabel = formatExportDateLabel(todayDate);

                // 컬럼 정의
                const headers = [
                    'DATE',
                    'BUYER',
                    'OLD PO#',
                    'KEEP NEW PO#',
                    'Supplier',
                    'CODE',
                    'DESCRIPTION',
                    'COLOR',
                    'SPEC',
                    'UNIT',
                    'Condition',
                    'QTY',
                    'Arrival date',
                    'Shipment(Delivery#)',
                    'WH',
                ];

                worksheet.columns = [
                    { header: 'DATE', key: 'DATE', width: 15 },
                    { header: 'BUYER', key: 'BUYER', width: 15 },
                    { header: 'OLD PO#', key: 'OLD_PON', width: 15 },
                    { header: 'KEEP NEW PO#', key: 'KEEP_NEW_PO', width: 15 },
                    { header: 'Supplier', key: 'SUPPLIER', width: 15 },
                    { header: 'CODE', key: 'CODE', width: 15 },
                    { header: 'DESCRIPTION', key: 'DESCRIPTION', width: 15 },
                    { header: 'COLOR', key: 'COLOR', width: 15 },
                    { header: 'SPEC', key: 'SPEC', width: 15 },
                    { header: 'UNIT', key: 'UNIT', width: 15 },
                    { header: 'Condition', key: 'CONDITION', width: 15 },
                    { header: 'QTY', key: 'QTY', width: 15 },
                    { header: 'Arrival date', key: 'ARRIVAL_DATE', width: 15 },
                    { header: 'Shipment(Delivery#)', key: 'SHIPMENT_DELIVERY', width: 15 },
                    { header: 'WH', key: 'WH', width: 15 },
                ];

                const dotumFont = {
                    name: 'Dotum',
                    size: 10,
                };
                const thinBorder = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' },
                };

                // 헤더 스타일
                worksheet.getRow(1).font = {
                    ...dotumFont,
                    bold: true,
                    color: { argb: '000000' },
                };
                worksheet.getRow(1).fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FFFDE9A9' },
                };
                worksheet.getRow(1).alignment = {
                    horizontal: 'center',
                    vertical: 'center',
                };

                // 데이터 추가
                args.datas.forEach((row: any) => {
                    const ataDate = parseExportDate(row.ATA);
                    const poCd = String(row.PO_CD || '').trim();
                    const matlCd = String(row.MATL_CD || '').trim();
                    const summaryKey = toMapKey(poCd, matlCd);
                    const usePoRows = usePoSummaryMap[summaryKey] || [];

                    const addExportRow = (keepNewPo: string, qty: number) => {
                        const dataRow = worksheet.addRow({
                            DATE: todayDateLabel,
                            BUYER: row.BUYER_CD || '',
                            OLD_PON: row.OLD_PON || row.PO_CD || '',
                            KEEP_NEW_PO: keepNewPo,
                            SUPPLIER: row.VENDOR_NAME || '',
                            CODE: row.MATL_CD || '',
                            DESCRIPTION: row.MATL_NAME || '',
                            COLOR: row.COLOR || '',
                            SPEC: row.SPEC || '',
                            UNIT: row.UNIT || '',
                            CONDITION: row.STATUS_CD_N || '',
                            QTY: qty,
                            ARRIVAL_DATE: formatExportDateLabel(row.ATA),
                            SHIPMENT_DELIVERY: row.DELIVERY || '',
                            WH: row.LOCATION || '',
                        });

                        for (let col = 1; col <= headers.length; col += 1) {
                            dataRow.getCell(col).border = thinBorder;
                        }
                    };

                    if (usePoRows.length > 0) {
                        usePoRows.forEach((useOne) => {
                            addExportRow(useOne.USE_PO_CD || '', Number(useOne.USE_QTY || 0));
                        });
                    } else {
                        addExportRow(row.PO_CD || '', Number(row.MOQ || 0));
                    }
                });

                // 행 스타일
                worksheet.eachRow((row, rowNumber) => {
                    for (let col = 1; col <= headers.length; col += 1) {
                        const cell = row.getCell(col);
                        cell.font = {
                            ...dotumFont,
                            bold: rowNumber === 1,
                            color: { argb: '000000' },
                        };
                        cell.border = thinBorder;
                    }

                    if (rowNumber > 1) {
                        const dateCell = row.getCell(1);
                        if (dateCell.value instanceof Date) {
                            dateCell.value = moment(dateCell.value).format('DD-MMM');
                        }

                        const arrivalCell = row.getCell(13);
                        if (arrivalCell.value instanceof Date) {
                            arrivalCell.value = moment(arrivalCell.value).format(
                                'DD-MMM',
                            );
                        } else if (
                            typeof arrivalCell.value === 'string' &&
                            /^\d{2}-[A-Za-z]{3}$/.test(arrivalCell.value.trim())
                        ) {
                            arrivalCell.value = arrivalCell.value.trim();
                        } else {
                            arrivalCell.value = formatExportDateLabel(
                                arrivalCell.value,
                            );
                        }

                        row.alignment = {
                            horizontal: 'center',
                            vertical: 'center',
                        };
                    }
                });

                const timestamp = AFLib.getCurrTime();
                const fileName = `KEEPING_TO_NEW_PO_${timestamp}.xlsx`;

                return await upload(fileName, workbook);
            } catch (err: any) {
                console.error('Export error:', err);
                return {
                    CODE: `ERROR:${err.message}`,
                    URL: '',
                };
            }
        },
    },
};

export default moduleQuery_S051901_KeepNewPoExport;
