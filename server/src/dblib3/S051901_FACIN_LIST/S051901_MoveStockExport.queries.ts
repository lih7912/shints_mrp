// S051901_MoveStockExport.queries.ts

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

const normalizeText = (value: any) => String(value ?? '').trim();

const moduleQuery_S051901_MoveStockExport = {
    Query: {
        mgrExport_S051901_MoveStock: async (_, args, contextValue) => {
            try {
                if (!args.datas || args.datas.length === 0) {
                    return {
                        CODE: 'ERROR:No data to export',
                    };
                }

                const workbook = new Excel.Workbook();
                const worksheet = workbook.addWorksheet('MOVE STOCK');
                const todayDate = new Date();
                const todayDateLabel = formatExportDateLabel(todayDate);

                const headers = [
                    'DATE',
                    'BUYER',
                    'PO#',
                    'Supplier',
                    'CODE',
                    'ITEM',
                    'COL',
                    'SPEC',
                    'UNIT',
                    'REASON',
                    "Q'TY",
                    'Arrival date',
                    'Shipment(Delivery#)',
                    'Rack/Location',
                    'WH',
                ];

                worksheet.columns = [
                    { header: 'DATE', key: 'DATE', width: 12 },
                    { header: 'BUYER', key: 'BUYER', width: 10 },
                    { header: 'PO#', key: 'PO_CD', width: 14 },
                    { header: 'Supplier', key: 'SUPPLIER', width: 20 },
                    { header: 'CODE', key: 'CODE', width: 14 },
                    { header: 'ITEM', key: 'ITEM', width: 24 },
                    { header: 'COL', key: 'COLOR', width: 12 },
                    { header: 'SPEC', key: 'SPEC', width: 16 },
                    { header: 'UNIT', key: 'UNIT', width: 10 },
                    { header: 'REASON', key: 'REASON', width: 10 },
                    { header: "Q'TY(Số lượng)", key: 'QTY', width: 10 },
                    { header: 'Arrival date', key: 'ARRIVAL_DATE', width: 14 },
                    { header: 'Shipment(Delivery#)', key: 'SHIPMENT_DELIVERY', width: 20 },
                    { header: 'Rack/Location', key: 'RACK_LOCATION', width: 18 },
                    { header: 'WH', key: 'WH', width: 10 },
                ];

                const dotumFont = { name: 'Dotum', size: 10 };
                const thinBorder = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' },
                };

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

                args.datas.forEach((row: any) => {
                    const dataRow = worksheet.addRow({
                        DATE: todayDateLabel,
                        BUYER: normalizeText(row.BUYER_CD),
                        PO_CD: normalizeText(row.PO_CD),
                        SUPPLIER: normalizeText(row.VENDOR_NAME),
                        CODE: normalizeText(row.MATL_CD),
                        ITEM: normalizeText(row.MATL_NAME),
                        COLOR: normalizeText(row.COLOR),
                        SPEC: normalizeText(row.SPEC),
                        UNIT: normalizeText(row.UNIT),
                        //REASON: normalizeText(row.STATUS_CD),
                        REASON: '',
                        QTY: Number(row.MOQ || 0),
                        ARRIVAL_DATE: formatExportDateLabel(row.ATA),
                        SHIPMENT_DELIVERY: normalizeText(row.DELIVERY),
                        //RACK_LOCATION: normalizeText(row.LOCATION),
                        RACK_LOCATION: '',
                        //WH: normalizeText(row.FACTORY_CD),
                        WH: '',
                    });

                    for (let col = 1; col <= headers.length; col += 1) {
                        dataRow.getCell(col).border = thinBorder;
                    }
                });

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

                        const arrivalCell = row.getCell(12);
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
                const fileName = `MOVE_STOCK_${timestamp}.xlsx`;

                return await upload(fileName, workbook);
            } catch (err: any) {
                console.error('Move Stock export error:', err);
                return {
                    CODE: `ERROR:${err.message}`,
                };
            }
        },
    },
};

export default moduleQuery_S051901_MoveStockExport;