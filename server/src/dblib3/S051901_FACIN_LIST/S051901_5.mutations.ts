// MGR_@@TNAME@@.mutations.js

import * as fs from 'fs';
import * as path from 'path';
import { Prisma } from '@prisma/client';
import ExcelJS from 'exceljs';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
const moment = require('moment');

const parseExportDate = (dateValue: any) => {
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

/*
                STD_FLAG: String 
                NET: String 
                LOSS: String 
                USE_SIZE: String 
                REMARK: String 

*/

// export default로 Mutation 내용 내보내기
const moduleMutation_S051901_5 = {
    Mutation: {
        mgrInsert_S051901_5_CANCEL: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tSQLArray = [];

            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var col = { ...args.datas[tIdx] };
                var tErrQty =
                    parseFloat(col.SHORTAGE_QTY) + parseFloat(col.DEFECT_QTY);
                let tSQL99 = `
                    delete from ksv_stock_facin
                    where
                        matl_cd = '${col.MATL_CD}'
                        and facin_cd = '${col.FACIN_CD}'
                        and stsout_cd = '${col.STSOUT_CD}'
                        and po_cd = '${col.PO_CD}'
                        and in_date = '${col.FACIN_DATE}'
                        and delivery like '%${col.DELIVERY_ORG}%'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    delete from ksv_stock_facin_order
                    where
                        matl_cd = '${col.MATL_CD}'
                        and facin_cd = '${col.FACIN_CD}'
                        and po_cd = '${col.PO_CD}'
                        -- and in_date = '${col.FACIN_DATE}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    update ksv_stock_mem2
                    set
                        infac_qty = infac_qty - ${col.FACIN_QTY},
                        shortage_qty = shortage_qty - ${col.SHORTAGE_QTY},
                        defect_qty = defect_qty - ${col.DEFECT_QTY}
                    where
                        po_cd = '${col.PO_CD}'
                        and matl_cd = '${col.MATL_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                var tPercent =
                    parseFloat(col.FACIN_QTY) / parseFloat(col.S_OUT_QTY);
                if (tPercent > 0.9) tPercent = 1.0;

                var sql0 = `
                    select
                        *
                    from
                        ksv_stock_out
                    where
                        stsout_cd = '${col.STSOUT_CD}'
                        and po_cd = '${col.PO_CD}'
                        and matl_cd = '${col.MATL_CD}'
                `;
                var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));

                var tIdx1 = 0;
                for (tIdx1 = 0; tIdx1 < nRet0.length; tIdx1++) {
                    var col1 = { ...nRet0[tIdx1] };

                    var tFacInQty = parseFloat(col1.OUT_QTY) * tPercent;
                        tFacInQty = parseFloat(tFacInQty).toFixed(2);

                    let tSQL99 = `
                        update ksv_stock_mem
                        set
                            infac_qty = infac_qty - ${tFacInQty}
                        where
                            po_cd = '${col1.PO_CD}'
                            and po_seq = '${col1.PO_SEQ}'
                            and order_cd = '${col1.ORDER_CD}'
                            and matl_cd = '${col1.MATL_CD}'
                            and mrp_seq = '${col1.MRP_SEQ}'
                            and matl_seq = '${col1.MATL_SEQ}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
                        update ksv_stock_out
                        set
                            facin_user = '',
                            facin_datetime = ''
                        where
                            po_cd = '${col1.PO_CD}'
                            and po_seq = '${col1.PO_SEQ}'
                            and order_cd = '${col1.ORDER_CD}'
                            and matl_cd = '${col1.MATL_CD}'
                            and mrp_seq = '${col1.MRP_SEQ}'
                            and matl_seq = '${col1.MATL_SEQ}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }
            }

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'SUCCEED:STOCK_IN:' + args.datas.length;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:STOCK_IN';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },
        mgrUpdate_S051901_5_LOCATION: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput = { ...args.datas[0] };
            var tSQLArray = [];

            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var tOne = { ...args.datas[tIdx] };

                let tSQL99 = `
                    update ksv_stock_facin
                    set
                        location = '${tOne.LOCATION}'
                    where
                        matl_cd = '${tOne.MATL_CD}'
                        and facin_cd = '${tOne.FACIN_CD}'
                        and stsout_cd = '${tOne.STSOUT_CD}'
                        and po_cd = '${tOne.PO_CD}'
                        and in_date = '${tOne.FACIN_DATE}'
                        and delivery = '${tOne.DELIVERY_ORG}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            }

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Update Location Error';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED: Update Location ';
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },

        mgrInsert_S051901_5_UPDATE_LOCATION: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tSQLArray = [];

            var tRetDate = AFLib.getCurrTime();
            var tFacInCdPrefix = 'FACIN-' + tRetDate;
            var tFileKey = tFacInCdPrefix;

            var tStsoutCd = args.datas1.FILE_KEY;
            var tFileName = args.datas1.NAME;
            var tFileUrl = args.datas1.URL;
            var tFileObjName = args.datas1.OBJECT_NAME;
            // var tStsoutCds = args.datas1.STSOUT_CD.split('|');

            var sqlStsout = '';
            args.datas.forEach((col, i) => {
                if (col !== '') {
                    if (i === 0) sqlStsout += ` '${col.STSOUT_CD}' `;
                    else sqlStsout += ` ,'${col.STSOUT_CD}' `;
                }
            });

            if (args.datas.length <= 0) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Not Found Data. ';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tIdx0 = 0;
            for (tIdx0 = 0; tIdx0 < args.datas.length; tIdx0++) {
                var col = { ...args.datas[tIdx0] };

                let tSQL99 = `
                    update ksv_stock_facin
                    set
                        location = '${col.LOCATION}'
                    where
                        po_cd = '${col.PO_CD}'
                        and matl_cd = '${col.MATL_CD}'
                        and   in_date =  '${col.IN_DATE}'
                        and   delivery =  '${col.DELIVERY}'
                        and   facin_cd =  '${col.FACIN_CD}'
                        -- and   (location is null or location = '')
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            }

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;

                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'SUCCEED:FAC-IN Update Location:';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = `ERROR:Facin Update Location:${e.message}`;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },

        mgrExport_S051901_KeepNewPO: async (_, args, contextValue) => {
            try {
                if (!args.datas || args.datas.length === 0) {
                    return {
                        CODE: 'ERROR:No data to export',
                        URL: '',
                    };
                }

                const workbook = new ExcelJS.Workbook();
                const worksheet = workbook.addWorksheet('KEEPING TO NEW PO#');

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
                    'Shipment/Delivery',
                    'WH',
                ];

                worksheet.columns = headers.map((h) => ({
                    header: h,
                    key: h.toUpperCase().replace(/[^A-Z0-9]/g, '_'),
                    width: 15,
                }));

                // 헤더 스타일
                worksheet.getRow(1).font = {
                    bold: true,
                    color: { argb: 'FFFFFF' },
                };
                worksheet.getRow(1).fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: '000000' },
                };
                worksheet.getRow(1).alignment = {
                    horizontal: 'center',
                    vertical: 'center',
                };

                // 데이터 추가
                args.datas.forEach((row: any) => {
                    const ataDate = parseExportDate(row.ATA);
                    const todayDateLabel = formatExportDateLabel(new Date());

                    const dataRow = worksheet.addRow({
                        DATE: todayDateLabel,
                        BUYER: row.BUYER_CD || '',
                        OLD_PON: '',
                        KEEP_NEW_PO: row.PO_CD || '',
                        SUPPLIER: row.VENDOR_NAME || '',
                        CODE: row.MATL_CD || '',
                        DESCRIPTION: row.MATL_NAME || '',
                        COLOR: row.COLOR || '',
                        SPEC: row.SPEC || '',
                        UNIT: row.UNIT || '',
                        CONDITION: row.STATUS_CD_N || '',
                        QTY: row.MOQ || '',
                        ARRIVAL_DATE: ataDate,
                        SHIPMENT_DELIVERY: row.DELIVERY || '',
                        WH: row.LOCATION || '',
                    });

                    dataRow.getCell(13).numFmt = 'DD-MMM';
                });

                // 행 스타일
                worksheet.eachRow((row, rowNumber) => {
                    if (rowNumber > 1) {
                        const dateCell = row.getCell(1);
                        if (dateCell.value instanceof Date) {
                            dateCell.value = moment(dateCell.value).format('DD-MMM');
                        }

                        const arrivalCell = row.getCell(13);
                        if (!(arrivalCell.value instanceof Date)) {
                            if (
                                typeof arrivalCell.value === 'string' &&
                                /^\d{2}-[A-Za-z]{3}$/.test(arrivalCell.value.trim())
                            ) {
                                arrivalCell.value = arrivalCell.value.trim();
                            } else {
                                const normalized = parseExportDate(arrivalCell.value);
                                if (normalized) {
                                    arrivalCell.value = moment(normalized).format(
                                        'DD-MMM',
                                    );
                                }
                            }
                        } else {
                            arrivalCell.value = moment(arrivalCell.value).format(
                                'DD-MMM',
                            );
                        }

                        row.alignment = {
                            horizontal: 'center',
                            vertical: 'center',
                        };
                    }
                });

                // 다운로드 폴더 경로
                const downloadDir = path.join(
                    process.cwd(),
                    'public',
                    'download'
                );

                // 다운로드 폴더 없으면 생성
                if (!fs.existsSync(downloadDir)) {
                    fs.mkdirSync(downloadDir, { recursive: true });
                }

                // 파일명 생성
                const timestamp = AFLib.getCurrTime();
                const fileName = `KEEPING_TO_NEW_PO_${timestamp}.xlsx`;
                const filePath = path.join(downloadDir, fileName);

                // 파일 저장
                await workbook.xlsx.writeFile(filePath);

                // 다운로드 URL 반환
                const downloadUrl = `/download/${fileName}`;

                return {
                    CODE: 'SUCCESS',
                    URL: downloadUrl,
                };
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

export default moduleMutation_S051901_5;
