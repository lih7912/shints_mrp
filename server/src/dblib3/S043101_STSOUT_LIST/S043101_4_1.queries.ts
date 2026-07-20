import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
import axios from 'axios';
const Excel = require('exceljs');
const {
    generateUploadURL,
    deleteUploadObject,
    upload,
    uploadFile,
} = require('../../../routes/s3');

// export default로 Query 내용 내보내기
const moduleQuery_S043101_4_1 = {
    Query: {
        mgrQueryS043101_4_1: async (_, args, contextValue) => {
            var tSQL = '';

            var sqlPo = '';
            var tCols = args.data.PO_CD.split('/');
            tCols.forEach((col, i) => {
                if (col !== '') {
                    if (sqlPo === '') sqlPo = `'${col}'`;
                    else sqlPo += `,'${col}'`;
                }
            });

            var sqlPu = '';
            var tCols = args.data.PU_CD.split('/');
            tCols.forEach((col, i) => {
                if (col !== '') {
                    if (sqlPu === '') sqlPu = `'${col}'`;
                    else sqlPu += `,'${col}'`;
                }
            });
            if (sqlPu !== '') {
                sqlPu = `and   A6.PU_CD in (${sqlPu}) `;
            }

            var sqlStsout = '';
            var tCols = args.data.STSOUT_CD.split('/');
            tCols.forEach((col, i) => {
                if (col !== '') {
                    if (sqlStsout === '') sqlStsout = `'${col}'`;
                    else sqlStsout += `,'${col}'`;
                }
            });
            if (sqlStsout !== '') {
                sqlStsout = `and   A6.STSOUT_CD in (${sqlStsout}) `;
            }

            /*
                   let sqlComp = `
                       select
                           *
                       from
                           kcd_code
                       where
                           cd_group = 'COMPOSITION'
                   `;
                   var retComp  =  await prisma.$queryRaw(Prisma.raw(sqlComp));
            */

            let sqlStr = `
                SELECT distinct
                    isnull(A6.PU_CD, '') as PU_CD,
                    A6.PO_CD,
                    A6.PO_SEQ,
                    A6.ORDER_CD,
                    A6.MATL_CD,
                    A6.MRP_SEQ,
                    A6.MATL_SEQ,
                    A3.MATL_NAME,
                    A3.COLOR,
                    A3.SPEC,
                    A3.UNIT,
                    isnull(A6.STSOUT_CD, '') as STSOUT_CD,
                    isnull(B4.SHIPMENT_CD, '') as SHIPMENT_CD,
                    A6.OUT_QTY,
                    A6.OUT_QTY as OUT_QTY2,
                    A51.BUYER_CD,
                    A51.BUYER_NAME,
                    A52.VENDOR_CD,
                    A52.VENDOR_NAME,
                    A3.WEIGHT,
                    isnull(B3.HS_CD, '') as HS_CD,
                    isnull(B3.HS_NAME, '') as HS_NAME,
                    isnull(B1.COMP1, '') as COMP1,
                    isnull(B1.COMP1_PERCENT, '') as COMP1_P,
                    isnull(B1.COMP2, '') as COMP2,
                    isnull(B1.COMP2_PERCENT, '') as COMP2_P,
                    isnull(B1.COMP3, '') as COMP3,
                    isnull(B1.COMP3_PERCENT, '') as COMP3_P,
                    isnull(B1.COMP4, '') as COMP4,
                    isnull(B1.COMP4_PERCENT, '') as COMP4_P,
                    isnull(B2.COMP1, '') as V_COMP,
                    A6.IN_DATETIME,
                    A6.CT_QTY,
                    A6.CT_NO,
                    A6.IN_DATETIME,
                    isnull(A6.REMARK, '') as REMARK
                FROM
                    KSV_STOCK_OUT A6
                    left join ksv_shipment_mem B4 on B4.stsout_cd = A6.stsout_cd
                    left join ksv_pu_mst2 A5 on A6.PU_CD = A5.PU_CD,
                    KCD_BUYER A51,
                    KCD_VENDOR A52,
                    KCD_MATL_MST A3
                    left join KCD_COMPOSITION B1 on B1.matl_name = A3.MATL_NAME
                    left join KCD_COMPOSITION_V B2 on B2.matl_name = A3.MATL_NAME
                    left join kcd_hscode B3 on B3.HS_NO = A3.HS_CD
                where
                    1 = 1
                    and A3.VENDOR_CD = '${args.data.VENDOR_CD}'
                    -- and A6.PACK_CD like '%${args.data.PACK_CD}%' 
                    ${sqlPu} 
                    ${sqlStsout}
                    and A6.PO_CD in (${sqlPo})
                    and left(A6.order_cd, 2) = A51.buyer_cd
                    and A6.matl_cd = A3.matl_cd
                    and A3.vendor_cd = A52.vendor_cd
                    AND A6.OUT_QTY > 0
                order by
                    A6.MATL_CD
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tObj = {
                    ...tRet[tIdx],
                };
                tObj.PO_QTY = '0';
                tObj.IN_QTY = '0';
                tObj.SHIP_QTY = '0';

                let sql0 = `
                    select
                        isnull(in_qty, 0) as IN_QTY,
                        isnull(lc_qty, 0) as LC_QTY
                    from
                        ksv_stock_in
                    where
                        po_cd = '${tObj.PO_CD}'
                        and po_seq = '${tObj.PO_SEQ}'
                        and matl_cd = '${tObj.MATL_CD}'
                        and matl_seq = '${tObj.MATL_SEQ}'
                        and mrp_seq = '${tObj.MRP_SEQ}'
                        and order_cd = '${tObj.ORDER_CD}'
                        and in_datetime = '${tObj.IN_DATETIME}'
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                console.log(tRet0);
                if (tRet0.length > 0) {
                    tObj.PO_QTY = String(tRet0[0].IN_QTY + tRet0[0].LC_QTY);
                    tObj.IN_QTY = tObj.PO_QTY;
                    tObj.SHIP_QTY = tObj.PO_QTY;
                }

                tObj.COMP = `${tObj.COMP1} ${tObj.COMP2} ${tObj.COMP3} ${tObj.COMP4}`;

                var tWeight =
                    parseFloat(tObj.WEIGHT) * parseFloat(tObj.OUT_QTY);
                tObj.WEIGHT = String(tWeight);

                var tMatlName = tObj.MATL_NAME.replace(/'/gi, "''");

                let sql0 = `
                    select
                        offer_spec
                    from
                        kcd_offer_spec
                    where
                        matl_name = '${tMatlName}'
                        and vendor_cd = '${tObj.VENDOR_CD}'
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                tObj.OFFER_SPEC = '';
                if (tRet0.length > 0) tObj.OFFER_SPEC = tRet0[0].offer_spec;

                if (tObj.SHIPMENT_CD) {
                    let sql10 = `
                        select
                            *
                        from
                            ksv_shipment_mst
                        where
                            shipment_cd = '${tObj.SHIPMENT_CD}'
                    `;
                    var tRet10 = await prisma.$queryRaw(Prisma.raw(sql10));
                    if (tRet10.length > 0)
                        tObj.SHIPMENT_CD = `${tObj.SHIPMENT_CD}/${tRet10[0].REMARK}`;
                }

                tArray.push(tObj);
            }
            return tArray;
        },

        mgrQueryS043101_4_1_EXCEL: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);
            var tInput = {
                ...args,
            };

            // Query

            var sqlStr = '';
            sqlStr = `
                SELECT
                    a.stsout_cd,
                    a.po_cd,
                    a.order_cd,
                    c.vendor_name,
                    b.matl_name,
                    b.color,
                    b.spec,
                    b.unit,
                    LEFT(a.out_datetime, 8) AS etd,
                    '' AS eta,
                    a.pack_cd AS pl_no,
                    a.out_qty,
                    a.out_from,
                    a.ct_qty,
                    a.ct_no,
                    a.remark,
                    d.cd_name AS delivery,
                    '' AS input_kind,
                    b.matl_cd,
                    e.hs_cd AS hs_no,
                    e.hs_name AS hs_name,
                    '' AS width,
                    LTRIM(
                        RTRIM(
                            CASE
                                WHEN ISNULL(f.comp1, '') <> ''
                                AND f.comp1_percent IS NOT NULL THEN f.comp1 + '/' + CAST(f.comp1_percent AS VARCHAR(10))
                                ELSE ''
                            END + CASE
                                WHEN ISNULL(f.comp2, '') <> ''
                                AND f.comp2_percent IS NOT NULL THEN ' ' + f.comp2 + '/' + CAST(f.comp2_percent AS VARCHAR(10))
                                ELSE ''
                            END + CASE
                                WHEN ISNULL(f.comp3, '') <> ''
                                AND f.comp3_percent IS NOT NULL THEN ' ' + f.comp3 + '/' + CAST(f.comp3_percent AS VARCHAR(10))
                                ELSE ''
                            END + CASE
                                WHEN ISNULL(f.comp4, '') <> ''
                                AND f.comp4_percent IS NOT NULL THEN ' ' + f.comp4 + '/' + CAST(f.comp4_percent AS VARCHAR(10))
                                ELSE ''
                            END
                        )
                    ) AS composition,
                    '' AS custom_name,
                    '' AS custom_code,
                    '' AS custom_unit
                FROM
                    ksv_stock_out a
                    JOIN kcd_matl_mst b ON a.matl_cd = b.matl_cd
                    JOIN kcd_vendor c ON b.vendor_cd = c.vendor_cd
                    LEFT JOIN kcd_hscode e ON b.hs_cd = e.hs_no
                    LEFT JOIN kcd_composition f ON b.matl_name = f.matl_name
                    LEFT JOIN kcd_code d ON d.cd_group = 'delivery_type'
                    AND d.cd_code = a.delivery_type
                    --WHERE a.pack_cd like '%${args.data.PACK_CD}%'
                    --and (b.vendor_cd like '%${args.data.VENDOR_CD}%' or c.vendor_name like '%${args.data.VENDOR_CD}%')
                WHERE
                    1 = 1
                    AND a.PU_CD = '${args.data.PU_CD}'
                ORDER BY
                    c.vendor_name
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            // Excel
            var tTitle = `출고현황리스트`;
            var tWExcelFile = `출고현황list-${tUserInfo.USER_ID}-${tRetDate}`;
            var tRetExcelFile = '';

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

                var tTemplateName = '출고현황';
                var tTemplateExcel = `${tPath0}/${tTemplateName}.xlsx`;

                const wb = new Excel.Workbook();
                await wb.xlsx.readFile(tTemplateExcel);

                var tSheetName = `list`;
                var sheet = wb.getWorksheet(tSheetName);

                //
                var tRowIdx = 4;
                var writtenRowCount = 0;

                var tIdx99 = 0;
                for (tIdx99 = 0; tIdx99 < tRet.length; tIdx99++) {
                    var col = {
                        ...tRet[tIdx99],
                    };
                    if (tIdx99 > 0) {
                        var tmpRow = [];
                        sheet.insertRow(tRowIdx, tmpRow, 'i');
                    }
                    sheet.getCell(tRowIdx, 1).value = col.po_cd;
                    sheet.getCell(tRowIdx, 2).value = col.order_cd;
                    sheet.getCell(tRowIdx, 3).value = col.vendor_name;
                    sheet.getCell(tRowIdx, 4).value = col.matl_name;
                    sheet.getCell(tRowIdx, 5).value = col.color;
                    sheet.getCell(tRowIdx, 6).value = col.spec;
                    sheet.getCell(tRowIdx, 7).value = col.unit;
                    sheet.getCell(tRowIdx, 8).value = col.etd;
                    sheet.getCell(tRowIdx, 9).value = col.eta;
                    sheet.getCell(tRowIdx, 10).value = col.pl_no;
                    sheet.getCell(tRowIdx, 11).value = '';
                    sheet.getCell(tRowIdx, 12).value = col.out_qty;
                    sheet.getCell(tRowIdx, 13).value = col.out_from;
                    sheet.getCell(tRowIdx, 14).value = col.ct_qty;
                    sheet.getCell(tRowIdx, 15).value = col.ct_no;
                    sheet.getCell(tRowIdx, 16).value = col.remark;
                    sheet.getCell(tRowIdx, 17).value = col.delivery;
                    sheet.getCell(tRowIdx, 18).value = col.input_kind;
                    sheet.getCell(tRowIdx, 19).value = col.matl_cd;
                    sheet.getCell(tRowIdx, 20).value = col.hs_no;
                    sheet.getCell(tRowIdx, 21).value = col.hs_name;
                    sheet.getCell(tRowIdx, 22).value = col.width;
                    sheet.getCell(tRowIdx, 23).value = col.composition;
                    sheet.getCell(tRowIdx, 24).value = col.custom_name;
                    sheet.getCell(tRowIdx, 25).value = col.custom_code;
                    sheet.getCell(tRowIdx, 26).value = col.custom_unit;

                    tRowIdx += 1;
                }

                wb.eachSheet((worksheet) => {
                    worksheet.eachRow((row) => {
                        row.eachCell((cell) => {
                            cell.font = {
                                name: 'Dotum', // 돋움체
                                size: 11,
                            };
                        });
                    });
                });

                return await upload(`${tWExcelFile}.xlsx`, wb);
            } catch (error) {
                var tRetArray = [];
                var tObj = {};
                tObj.id = 1;
                tObj.CODE = `ERROR:Excel Print:${error.message}`;
                console.log(tObj.CODE);
                tRetArray.push(tObj);
                return tRetArray;
            }
        },

        mgrQueryS043101_4_1_EXCEL2: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);
            var tInput = {
                ...args.data,
            };

            if (!tInput.VENDOR_CD || !tInput.S_IN_DATE || !tInput.E_IN_DATE) {
                if (!tInput.PACK_CD) {
                    // kkk
                    var tRetArray = [];
                    var tObj = {};
                    tObj.id = 1;
                    tObj.CODE = `ERROR:You must input Supplier, in_date`;
                    // console.log(tInput);
                    // console.log(tObj.CODE);
                    tRetArray.push(tObj);
                    return tRetArray;
                }
            }

            const packCdExact = String(args.data.PACK_CD || '').replace(/'/g, "''");
            var sql1 = '';
            if (args.data.PACK_CD) {
                // invoice_no prefix로 STB-S26-026D까지 포함하고, pack_cd는 제외한다.
                sql1 += `and    isnull(h.invoice_no, '') like '${packCdExact}%' `;
            } else {
                if (args.data.VENDOR_CD) {
                    sql1 += `and    c.vendor_name like '%${args.data.VENDOR_CD}%' `;
                }
                if (args.data.S_IN_DATE && args.data.E_IN_DATE) {
                    sql1 += `and    left(a.in_datetime, 8) between '${args.data.S_IN_DATE}' and '${args.data.E_IN_DATE}' `;
                }
            }

            // Query

            var sqlStr = '';
            sqlStr = `
                SELECT
                    a.stsout_cd,
                    a.po_cd,
                    a.order_cd,
                    c.vendor_name,
                    b.matl_name,
                    b.color,
                    b.spec,
                    b.unit,
                    LEFT(a.out_datetime, 8) AS etd,
                    '' AS eta,
                    a.pack_cd AS pl_no,
                    a.out_qty,
                    a.out_from,
                    a.ct_qty,
                    a.ct_no,
                    a.remark,
                    d.cd_name AS delivery,
                    '' AS input_kind,
                    b.matl_cd,
                    e.hs_cd AS hs_no,
                    e.hs_name AS hs_name,
                    '' AS width,
                    LTRIM(
                        RTRIM(
                            CASE
                                WHEN ISNULL(f.comp1, '') <> ''
                                AND f.comp1_percent IS NOT NULL THEN f.comp1 + '/' + CAST(f.comp1_percent AS VARCHAR(10))
                                ELSE ''
                            END + CASE
                                WHEN ISNULL(f.comp2, '') <> ''
                                AND f.comp2_percent IS NOT NULL THEN ' ' + f.comp2 + '/' + CAST(f.comp2_percent AS VARCHAR(10))
                                ELSE ''
                            END + CASE
                                WHEN ISNULL(f.comp3, '') <> ''
                                AND f.comp3_percent IS NOT NULL THEN ' ' + f.comp3 + '/' + CAST(f.comp3_percent AS VARCHAR(10))
                                ELSE ''
                            END + CASE
                                WHEN ISNULL(f.comp4, '') <> ''
                                AND f.comp4_percent IS NOT NULL THEN ' ' + f.comp4 + '/' + CAST(f.comp4_percent AS VARCHAR(10))
                                ELSE ''
                            END
                        )
                    ) AS composition,
                    '' AS custom_name,
                    '' AS custom_code,
                    '' AS custom_unit
                FROM
                    ksv_stock_out a
                    JOIN kcd_matl_mst b ON a.matl_cd = b.matl_cd
                    JOIN kcd_vendor c ON b.vendor_cd = c.vendor_cd
                    LEFT JOIN kcd_code d ON d.cd_group = 'delivery_type'
                    AND d.cd_code = a.delivery_type
                    LEFT JOIN kcd_hscode e ON b.hs_cd = e.hs_no
                    LEFT JOIN kcd_composition f ON b.matl_name = f.matl_name
                    LEFT JOIN KSV_SHIPMENT_MEM g on a.STSOUT_CD = g.STSOUT_CD
                    LEFT JOIN KSV_SHIPMENT_MST h on h.SHIPMENT_CD = g.SHIPMENT_CD
                where
                    1 = 1 ${sql1}
                ORDER BY
                    h.invoice_no,
                    a.pack_cd,
                    c.vendor_name,
                    a.stsout_cd,
                    a.ct_no,
                    a.remark,
                    a.po_cd,
                    a.ct_qty,
                    b.matl_name,
                    b.color
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            if (args.data.PACK_CD) {
                const sqlDiagBase = `
                    SELECT
                        COUNT(*) AS row_cnt,
                        ISNULL(SUM(ISNULL(a.ct_qty, 0)), 0) AS ct_sum
                    FROM
                        ksv_stock_out a
                        JOIN KSV_SHIPMENT_MEM g on a.STSOUT_CD = g.STSOUT_CD
                        JOIN KSV_SHIPMENT_MST h on h.SHIPMENT_CD = g.SHIPMENT_CD
                    WHERE
                        1 = 1
                        and isnull(h.invoice_no, '') like '${packCdExact}%'
                `;

                const sqlDiagJoinLoss = `
                    SELECT
                        COUNT(*) AS base_rows,
                        ISNULL(SUM(ISNULL(a.ct_qty, 0)), 0) AS base_ct,
                        SUM(CASE WHEN b.matl_cd IS NULL THEN 1 ELSE 0 END) AS missing_matl_rows,
                        ISNULL(SUM(CASE WHEN b.matl_cd IS NULL THEN ISNULL(a.ct_qty, 0) ELSE 0 END), 0) AS missing_matl_ct,
                        SUM(CASE WHEN b.matl_cd IS NOT NULL AND c.vendor_cd IS NULL THEN 1 ELSE 0 END) AS missing_vendor_rows,
                        ISNULL(SUM(CASE WHEN b.matl_cd IS NOT NULL AND c.vendor_cd IS NULL THEN ISNULL(a.ct_qty, 0) ELSE 0 END), 0) AS missing_vendor_ct
                    FROM
                        ksv_stock_out a
                        LEFT JOIN kcd_matl_mst b ON a.matl_cd = b.matl_cd
                        LEFT JOIN kcd_vendor c ON b.vendor_cd = c.vendor_cd
                        LEFT JOIN KSV_SHIPMENT_MEM g on a.STSOUT_CD = g.STSOUT_CD
                        LEFT JOIN KSV_SHIPMENT_MST h on h.SHIPMENT_CD = g.SHIPMENT_CD
                    WHERE
                        1 = 1
                        and isnull(h.invoice_no, '') like '${packCdExact}%'
                `;

                const baseDiagRet = await prisma.$queryRaw(Prisma.raw(sqlDiagBase));
                const joinLossDiagRet = await prisma.$queryRaw(
                    Prisma.raw(sqlDiagJoinLoss),
                );

                const baseDiag = baseDiagRet && baseDiagRet[0] ? baseDiagRet[0] : {};
                const joinLossDiag =
                    joinLossDiagRet && joinLossDiagRet[0] ? joinLossDiagRet[0] : {};

                const joinedCt = tRet.reduce((sum, row) => {
                    return sum + (parseFloat(row.ct_qty) || 0);
                }, 0);

                const supplierDiagMap = new Map();
                tRet.forEach((row) => {
                    const supplier = String(row.vendor_name || '').trim() || '(BLANK_VENDOR)';
                    const ctQty = parseFloat(row.ct_qty) || 0;
                    const found = supplierDiagMap.get(supplier) || {
                        rows: 0,
                        ctQty: 0,
                    };
                    found.rows += 1;
                    found.ctQty += ctQty;
                    supplierDiagMap.set(supplier, found);
                });

                const supplierDiagList = Array.from(supplierDiagMap.entries())
                    .sort((a, b) => a[0].localeCompare(b[0]))
                    .map(([supplier, stat]) => {
                        return `${supplier}:rows=${stat.rows},ct=${stat.ctQty}`;
                    });

                const packDiagMap = new Map();
                tRet.forEach((row) => {
                    const packCd = String(row.pl_no || '').trim() || '(BLANK_PACK)';
                    const ctQty = parseFloat(row.ct_qty) || 0;
                    const found = packDiagMap.get(packCd) || {
                        rows: 0,
                        ctQty: 0,
                    };
                    found.rows += 1;
                    found.ctQty += ctQty;
                    packDiagMap.set(packCd, found);
                });

                const packDiagList = Array.from(packDiagMap.entries())
                    .sort((a, b) => a[0].localeCompare(b[0]))
                    .map(([packCd, stat]) => {
                        return `${packCd}:rows=${stat.rows},ct=${stat.ctQty}`;
                    });

                console.log(
                    `[S043101_EXCEL2][DIAG] pack=${args.data.PACK_CD}, baseRows=${baseDiag.row_cnt || 0}, baseCt=${baseDiag.ct_sum || 0}, joinedRows=${tRet.length}, joinedCt=${joinedCt}, missingMatlRows=${joinLossDiag.missing_matl_rows || 0}, missingMatlCt=${joinLossDiag.missing_matl_ct || 0}, missingVendorRows=${joinLossDiag.missing_vendor_rows || 0}, missingVendorCt=${joinLossDiag.missing_vendor_ct || 0}`,
                );
                console.log(
                    `[S043101_EXCEL2][SUPPLIER_DIAG] pack=${args.data.PACK_CD} :: ${supplierDiagList.join(' | ')}`,
                );
                console.log(
                    `[S043101_EXCEL2][PACK_DIAG] pack=${args.data.PACK_CD} :: ${packDiagList.join(' | ')}`,
                );
            }
            const ctQtyByCtKey = new Map();
            tRet.forEach((row) => {
                const ctNo = String(row.ct_no || '').trim();
                const ctQty = parseFloat(row.ct_qty) || 0;

                const key =
                    ctNo !== ''
                        ? `CTNO::${ctNo}`
                        : `FALLBACK::${String(row.vendor_name || '').trim()}::${String(row.remark || '').trim()}::${String(row.po_cd || '').trim()}::${ctQty}`;

                if (!ctQtyByCtKey.has(key)) {
                    ctQtyByCtKey.set(key, ctQty);
                } else if (ctNo !== '') {
                    const prev = ctQtyByCtKey.get(key) || 0;
                    ctQtyByCtKey.set(key, Math.max(prev, ctQty));
                }
            });
            const totalCtQtyByCtNo = Array.from(ctQtyByCtKey.values()).reduce(
                (sum, qty) => sum + (parseFloat(qty) || 0),
                0,
            );
            if (args.data.PACK_CD) {
                console.log(
                    `[S043101_EXCEL2][CTNO_SUM] pack=${args.data.PACK_CD}, totalCtQtyByCtNo=${totalCtQtyByCtNo}`,
                );
            }

            // Excel
            var tTitle = `출고현황리스트`;
            var tWExcelFile = `출고현황list-${tUserInfo.USER_ID}-${tRetDate}`;
            var tRetExcelFile = '';

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

                // Grouping
                // S043401 PL_PRINT와 동일하게 vendor + stsout_cd + ct_no 기준으로만 합친다.
                var groupArray = [];
                var itemArray = [];
                var saveObj = {};
                var sumCtQty = 0;
                for (let tIdx99 = 0; tIdx99 < tRet.length; tIdx99++) {
                    var tObj = { ...tRet[tIdx99] };
                    if (tIdx99 === 0) {
                        saveObj = { ...tObj };
                        itemArray.push(saveObj);
                    } else {
                        const saveCtNo = String(saveObj.ct_no || '').trim();
                        const currCtNo = String(tObj.ct_no || '').trim();
                        const isSameCtGroup =
                            saveObj.vendor_name === tObj.vendor_name &&
                            saveObj.stsout_cd === tObj.stsout_cd &&
                            saveCtNo !== '' &&
                            currCtNo !== '' &&
                            saveCtNo === currCtNo;

                        if (isSameCtGroup) {
                            saveObj = { ...tObj };
                            itemArray.push(saveObj);
                        } else {
                            console.log(
                                `${saveObj.vendor_name}/${saveObj.remark}/${saveObj.po_cd}/${saveObj.ct_qty}=>${itemArray.length}`,
                            );
                            sumCtQty += parseFloat(saveObj.ct_qty);
                            groupArray.push(itemArray);
                            saveObj = { ...tObj };
                            itemArray = [];
                            itemArray.push(saveObj);
                        }
                    }
                }
                sumCtQty += parseFloat(saveObj.ct_qty);
                console.log(
                    `${saveObj.vendor_name}/${saveObj.remark}/${saveObj.po_cd}/${saveObj.ct_qty}=>${itemArray.length} ===> ${sumCtQty}`,
                );
                groupArray.push(itemArray);

                var tTemplateName = '출고현황';
                var tTemplateExcel = `${tPath0}/${tTemplateName}.xlsx`;

                const wb = new Excel.Workbook();
                await wb.xlsx.readFile(tTemplateExcel);

                var tSheetName = `list`;
                var sheet = wb.getWorksheet(tSheetName);

                //
                sheet.getCell(2, 10).value =
                    `${tInput.S_IN_DATE} ~ ${tInput.E_IN_DATE}`;
                sheet.getCell(2, 12).value = `${tInput.VENDOR_CD}`;

                var tRowIdx = 4;
                var writtenRowCount = 0;
                let saveObj = {};
                let mergeStartRow = tRowIdx;

                for (let tIdx99 = 0; tIdx99 < groupArray.length; tIdx99++) {
                    var itemArray = [...groupArray[tIdx99]];

                    mergeStartRow = tRowIdx;
                    for (let tIdx98 = 0; tIdx98 < itemArray.length; tIdx98++) {
                        var col = {
                            ...itemArray[tIdx98],
                        };

                        if (tRowIdx > 4) {
                            sheet.insertRow(tRowIdx, [], 'i');
                        }

                        const currentVendor = String(col.vendor_name || '').trim();
                        const currentRemark = String(col.remark || '').trim();
                        const currentPoCd = String(col.po_cd || '').trim();
                        const currentCtQty = parseFloat(col.ct_qty) || 0;
                        let displayCtQty = 0;

                        if (Object.keys(saveObj).length === 0) {
                            saveObj = { ...col };
                            displayCtQty = currentCtQty;
                        } else {
                            const saveVendor = String(saveObj.vendor_name || '').trim();
                            const saveRemark = String(saveObj.remark || '').trim();
                            const savePoCd = String(saveObj.po_cd || '').trim();
                            const saveCtQty = parseFloat(saveObj.ct_qty) || 0;

                            if (
                                currentVendor === saveVendor &&
                                currentRemark !== '' &&
                                currentRemark === saveRemark &&
                                currentCtQty === saveCtQty
                            ) {
                                displayCtQty = 0;
                            } else if (
                                currentVendor === saveVendor &&
                                currentRemark === '' &&
                                currentPoCd === savePoCd &&
                                currentCtQty === saveCtQty
                            ) {
                                displayCtQty = 0;
                            } else {
                                displayCtQty = currentCtQty;
                            }

                            saveObj = { ...col };
                        }

                        if (displayCtQty > 0 && tIdx99 !== 0) {
                            let mergeEndRow = tRowIdx - 1;
                            if (mergeEndRow > mergeStartRow) {
                                sheet.mergeCells(mergeStartRow, 14, mergeEndRow, 14);
                                sheet.mergeCells(mergeStartRow, 15, mergeEndRow, 15);
                                sheet.mergeCells(mergeStartRow, 16, mergeEndRow, 16);
                            }
                            mergeStartRow = tRowIdx;
                        }

                        sheet.getCell(tRowIdx, 1).value = col.po_cd;
                        sheet.getCell(tRowIdx, 2).value = col.order_cd;
                        sheet.getCell(tRowIdx, 3).value = col.vendor_name;
                        sheet.getCell(tRowIdx, 4).value = col.matl_name;
                        sheet.getCell(tRowIdx, 5).value = col.color;
                        sheet.getCell(tRowIdx, 6).value = col.spec;
                        sheet.getCell(tRowIdx, 7).value = col.unit;
                        sheet.getCell(tRowIdx, 8).value = col.etd;
                        sheet.getCell(tRowIdx, 9).value = col.eta;
                        sheet.getCell(tRowIdx, 10).value = col.pl_no;
                        sheet.getCell(tRowIdx, 11).value = '';
                        sheet.getCell(tRowIdx, 12).value = col.out_qty;
                        sheet.getCell(tRowIdx, 13).value = col.out_from;
                        sheet.getCell(tRowIdx, 14).value = displayCtQty;
                        sheet.getCell(tRowIdx, 15).value = col.ct_no;
                        sheet.getCell(tRowIdx, 16).value = col.remark;
                        sheet.getCell(tRowIdx, 17).value = col.delivery;
                        sheet.getCell(tRowIdx, 18).value = col.input_kind;
                        sheet.getCell(tRowIdx, 19).value = col.matl_cd;
                        sheet.getCell(tRowIdx, 20).value = col.hs_no;
                        sheet.getCell(tRowIdx, 21).value = col.hs_name;
                        sheet.getCell(tRowIdx, 22).value = col.width;
                        sheet.getCell(tRowIdx, 23).value = col.composition;
                        sheet.getCell(tRowIdx, 24).value = col.custom_name;
                        sheet.getCell(tRowIdx, 25).value = col.custom_code;
                        sheet.getCell(tRowIdx, 26).value = col.custom_unit;

                        if (displayCtQty > 0) {
                            mergeStartRow = tRowIdx;
                        }

                        tRowIdx += 1;
                        writtenRowCount += 1;
                    }

                    let mergeEndRow = tRowIdx - 1;
                    if (mergeEndRow > mergeStartRow) {
                        sheet.mergeCells(mergeStartRow, 14, mergeEndRow, 14);
                        sheet.mergeCells(mergeStartRow, 15, mergeEndRow, 15);
                        sheet.mergeCells(mergeStartRow, 16, mergeEndRow, 16);
                    }
                }

                /*
                let finalMergeEndRow = tRowIdx - 1;
                if (finalMergeEndRow > mergeStartRow) {
                    sheet.mergeCells(mergeStartRow, 14, finalMergeEndRow, 14);
                    sheet.mergeCells(mergeStartRow, 15, finalMergeEndRow, 15);
                    sheet.mergeCells(mergeStartRow, 16, finalMergeEndRow, 16);
                }
                */

                // ===== TOTAL ROW 추가 =====
                const totalRowIdx = tRowIdx; // 마지막 데이터 다음 줄
                const dataStartRow = 4; // 데이터 시작 행 (현재 코드 기준)

                sheet.mergeCells(totalRowIdx, 1, totalRowIdx, 11);

                sheet.getCell(totalRowIdx, 1).value = 'TOTAL';

                sheet.getCell(totalRowIdx, 12).value = {
                    formula: `SUM(L${dataStartRow}:L${totalRowIdx - 1})`,
                };

                sheet.getCell(totalRowIdx, 14).value = {
                    formula: `SUM(N${dataStartRow}:N${totalRowIdx - 1})`,
                };

                console.log(
                    `[S043101_EXCEL2] sourceRows=${tRet.length}, writtenRows=${writtenRowCount}`,
                );

                wb.eachSheet((worksheet) => {
                    worksheet.eachRow((row) => {
                        row.eachCell((cell) => {
                            cell.font = {
                                name: 'Dotum', // 돋움체
                                size: 11,
                            };
                        });
                    });
                });

                return await upload(`${tWExcelFile}.xlsx`, wb);
            } catch (error) {
                var tRetArray = [];
                var tObj = {};
                tObj.id = 1;
                tObj.CODE = `ERROR:Excel Print:${error.message}`;
                console.log(tObj.CODE);
                tRetArray.push(tObj);
                return tRetArray;
            }
        },

        //
        mgrQueryS043101_4_1_EXCEL2_260225: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);
            var tInput = {
                ...args.data,
            };

            if (!tInput.VENDOR_CD || !tInput.S_IN_DATE || !tInput.E_IN_DATE) {
                if (!tInput.PACK_CD) {
                    // kkk
                    var tRetArray = [];
                    var tObj = {};
                    tObj.id = 1;
                    tObj.CODE = `ERROR:You must input Supplier, in_date`;
                    // console.log(tInput);
                    // console.log(tObj.CODE);
                    tRetArray.push(tObj);
                    return tRetArray;
                }
            }

            const packCdExact = String(args.data.PACK_CD || '').replace(/'/g, "''");
            var sql1 = '';
            if (args.data.PACK_CD) {
                // Invoice(PACK_CD) 조회 우선: 공급처/기간 조건을 빼고 PACK 기준으로만 조회
                sql1 += `and    isnull(a.pack_cd, '') like '${packCdExact}%' `;
            } else {
                if (args.data.VENDOR_CD) {
                    sql1 += `and    c.vendor_name like '%${args.data.VENDOR_CD}%' `;
                }
                if (args.data.S_IN_DATE && args.data.E_IN_DATE) {
                    sql1 += `and    left(a.in_datetime, 8) between '${args.data.S_IN_DATE}' and '${args.data.E_IN_DATE}' `;
                }
            }

            // Query

            var sqlStr = '';
            sqlStr = `
                SELECT
                    a.stsout_cd,
                    a.po_cd,
                    a.order_cd,
                    c.vendor_name,
                    b.matl_name,
                    b.color,
                    b.spec,
                    b.unit,
                    LEFT(a.out_datetime, 8) AS etd,
                    '' AS eta,
                    a.pack_cd AS pl_no,
                    a.out_qty,
                    a.out_from,
                    a.ct_qty,
                    a.ct_no,
                    a.remark,
                    d.cd_name AS delivery,
                    '' AS input_kind,
                    b.matl_cd,
                    e.hs_cd AS hs_no,
                    e.hs_name AS hs_name,
                    '' AS width,
                    LTRIM(
                        RTRIM(
                            CASE
                                WHEN ISNULL(f.comp1, '') <> ''
                                AND f.comp1_percent IS NOT NULL THEN f.comp1 + '/' + CAST(f.comp1_percent AS VARCHAR(10))
                                ELSE ''
                            END + CASE
                                WHEN ISNULL(f.comp2, '') <> ''
                                AND f.comp2_percent IS NOT NULL THEN ' ' + f.comp2 + '/' + CAST(f.comp2_percent AS VARCHAR(10))
                                ELSE ''
                            END + CASE
                                WHEN ISNULL(f.comp3, '') <> ''
                                AND f.comp3_percent IS NOT NULL THEN ' ' + f.comp3 + '/' + CAST(f.comp3_percent AS VARCHAR(10))
                                ELSE ''
                            END + CASE
                                WHEN ISNULL(f.comp4, '') <> ''
                                AND f.comp4_percent IS NOT NULL THEN ' ' + f.comp4 + '/' + CAST(f.comp4_percent AS VARCHAR(10))
                                ELSE ''
                            END
                        )
                    ) AS composition,
                    '' AS custom_name,
                    '' AS custom_code,
                    '' AS custom_unit
                FROM
                    ksv_stock_out a
                    JOIN kcd_matl_mst b ON a.matl_cd = b.matl_cd
                    JOIN kcd_vendor c ON b.vendor_cd = c.vendor_cd
                    LEFT JOIN kcd_hscode e ON b.hs_cd = e.hs_no
                    LEFT JOIN kcd_composition f ON b.matl_name = f.matl_name
                    LEFT JOIN kcd_code d ON d.cd_group = 'delivery_type'
                    AND d.cd_code = a.delivery_type
                where
                    1 = 1 ${sql1}
                ORDER BY
                    c.vendor_name,
                    a.stsout_cd,
                    a.remark,
                    a.po_cd,
                    a.ct_qty,
                    b.matl_name,
                    b.color
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            if (args.data.PACK_CD) {
                const sqlDiagBase = `
                    SELECT
                        COUNT(*) AS row_cnt,
                        ISNULL(SUM(ISNULL(a.ct_qty, 0)), 0) AS ct_sum
                    FROM
                        ksv_stock_out a
                    WHERE
                        1 = 1
                        and isnull(a.pack_cd, '') like '${packCdExact}%'
                `;

                const sqlDiagJoinLoss = `
                    SELECT
                        COUNT(*) AS base_rows,
                        ISNULL(SUM(ISNULL(a.ct_qty, 0)), 0) AS base_ct,
                        SUM(CASE WHEN b.matl_cd IS NULL THEN 1 ELSE 0 END) AS missing_matl_rows,
                        ISNULL(SUM(CASE WHEN b.matl_cd IS NULL THEN ISNULL(a.ct_qty, 0) ELSE 0 END), 0) AS missing_matl_ct,
                        SUM(CASE WHEN b.matl_cd IS NOT NULL AND c.vendor_cd IS NULL THEN 1 ELSE 0 END) AS missing_vendor_rows,
                        ISNULL(SUM(CASE WHEN b.matl_cd IS NOT NULL AND c.vendor_cd IS NULL THEN ISNULL(a.ct_qty, 0) ELSE 0 END), 0) AS missing_vendor_ct
                    FROM
                        ksv_stock_out a
                        LEFT JOIN kcd_matl_mst b ON a.matl_cd = b.matl_cd
                        LEFT JOIN kcd_vendor c ON b.vendor_cd = c.vendor_cd
                    WHERE
                        1 = 1
                        and isnull(a.pack_cd, '') like '${packCdExact}%'
                `;

                const baseDiagRet = await prisma.$queryRaw(Prisma.raw(sqlDiagBase));
                const joinLossDiagRet = await prisma.$queryRaw(
                    Prisma.raw(sqlDiagJoinLoss),
                );

                const baseDiag = baseDiagRet && baseDiagRet[0] ? baseDiagRet[0] : {};
                const joinLossDiag =
                    joinLossDiagRet && joinLossDiagRet[0] ? joinLossDiagRet[0] : {};

                const joinedCt = tRet.reduce((sum, row) => {
                    return sum + (parseFloat(row.ct_qty) || 0);
                }, 0);

                const supplierDiagMap = new Map();
                tRet.forEach((row) => {
                    const supplier = String(row.vendor_name || '').trim() || '(BLANK_VENDOR)';
                    const ctQty = parseFloat(row.ct_qty) || 0;
                    const found = supplierDiagMap.get(supplier) || {
                        rows: 0,
                        ctQty: 0,
                    };
                    found.rows += 1;
                    found.ctQty += ctQty;
                    supplierDiagMap.set(supplier, found);
                });

                const supplierDiagList = Array.from(supplierDiagMap.entries())
                    .sort((a, b) => a[0].localeCompare(b[0]))
                    .map(([supplier, stat]) => {
                        return `${supplier}:rows=${stat.rows},ct=${stat.ctQty}`;
                    });

                console.log(
                    `[S043101_EXCEL2_260225][DIAG] pack=${args.data.PACK_CD}, baseRows=${baseDiag.row_cnt || 0}, baseCt=${baseDiag.ct_sum || 0}, joinedRows=${tRet.length}, joinedCt=${joinedCt}, missingMatlRows=${joinLossDiag.missing_matl_rows || 0}, missingMatlCt=${joinLossDiag.missing_matl_ct || 0}, missingVendorRows=${joinLossDiag.missing_vendor_rows || 0}, missingVendorCt=${joinLossDiag.missing_vendor_ct || 0}`,
                );
                console.log(
                    `[S043101_EXCEL2_260225][SUPPLIER_DIAG] pack=${args.data.PACK_CD} :: ${supplierDiagList.join(' | ')}`,
                );
            }

            // Excel
            var tTitle = `출고현황리스트`;
            var tWExcelFile = `출고현황list-${tUserInfo.USER_ID}-${tRetDate}`;
            var tRetExcelFile = '';

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

                // Grouping
                var groupArray = [];
                var itemArray = [];
                var saveObj = {};
                for (let tIdx99 = 0; tIdx99 < tRet.length; tIdx99++) {
                    var tObj = { ...tRet[tIdx99] };
                    if (tIdx99 === 0) {
                        saveObj = { ...tObj };
                        itemArray.push(saveObj);
                    } else {
                        if (saveObj.vendor_name !== tObj.vendor_name) {
                            groupArray.push(itemArray);
                            saveObj = { ...tObj };
                            itemArray = [];
                            itemArray.push(saveObj);
                        } else if (
                            saveObj.remark &&
                            saveObj.remark !== tObj.remark
                        ) {
                            groupArray.push(itemArray);
                            saveObj = { ...tObj };
                            itemArray = [];
                            itemArray.push(saveObj);
                        } else if (
                            !saveObj.remark &&
                            saveObj.remark !== tObj.remark
                        ) {
                            groupArray.push(itemArray);
                            saveObj = { ...tObj };
                            itemArray = [];
                            itemArray.push(saveObj);
                        } else if (
                            !saveObj.remark &&
                            saveObj.remark === tObj.remark &&
                            saveObj.po_cd !== tObj.po_cd
                        ) {
                            groupArray.push(itemArray);
                            saveObj = { ...tObj };
                            itemArray = [];
                            itemArray.push(saveObj);
                        } else {
                            saveObj = { ...tObj };
                            itemArray.push(saveObj);
                        }
                    }
                }
                groupArray.push(itemArray);

                var tTemplateName = '출고현황';
                var tTemplateExcel = `${tPath0}/${tTemplateName}.xlsx`;

                const wb = new Excel.Workbook();
                await wb.xlsx.readFile(tTemplateExcel);

                var tSheetName = `list`;
                var sheet = wb.getWorksheet(tSheetName);

                //
                sheet.getCell(2, 10).value =
                    `${tInput.S_IN_DATE} ~ ${tInput.E_IN_DATE}`;
                sheet.getCell(2, 12).value = `${tInput.VENDOR_CD}`;

                var tRowIdx = 4;
                var writtenRowCount = 0;

                let prevRemark = null;
                let prevCtQty = null;
                let prevCtNo = null;
                let mergeStartRow = tRowIdx;

                for (let tIdx99 = 0; tIdx99 < tRet.length; tIdx99++) {
                    var col = {
                        ...tRet[tIdx99],
                    };

                    if (tIdx99 > 0) {
                        sheet.insertRow(tRowIdx, [], 'i');
                    }

                    const currentVendor = String(col.vendor_name || '').trim();
                    const currentRemark = String(col.remark || '').trim();
                    const currentPoCd = String(col.po_cd || '').trim();
                    const currentCtQty = parseFloat(col.ct_qty) || 0;
                    let displayCtQty = 0;

                    if (tIdx99 === 0) {
                        saveObj = { ...col };
                        displayCtQty = currentCtQty;
                    } else {
                        const saveVendor = String(saveObj.vendor_name || '').trim();
                        const saveRemark = String(saveObj.remark || '').trim();
                        const savePoCd = String(saveObj.po_cd || '').trim();
                        const saveCtQty = parseFloat(saveObj.ct_qty) || 0;

                        if (
                            currentVendor === saveVendor &&
                            currentRemark !== '' &&
                            currentRemark === saveRemark &&
                            currentCtQty === saveCtQty
                        ) {
                            displayCtQty = 0;
                        } else if (
                            currentVendor === saveVendor &&
                            currentRemark === '' &&
                            currentPoCd === savePoCd &&
                            currentCtQty === saveCtQty
                        ) {
                            displayCtQty = 0;
                        } else {
                            displayCtQty = currentCtQty;
                        }

                        saveObj = { ...col };
                    }

                    if (displayCtQty > 0 && tIdx99 !== 0) {
                        let mergeEndRow = tRowIdx - 1;
                        if (mergeEndRow > mergeStartRow) {
                            sheet.mergeCells(
                                mergeStartRow,
                                14,
                                mergeEndRow,
                                14,
                            );
                            sheet.mergeCells(
                                mergeStartRow,
                                15,
                                mergeEndRow,
                                15,
                            );
                            sheet.mergeCells(
                                mergeStartRow,
                                16,
                                mergeEndRow,
                                16,
                            );
                        }
                        mergeStartRow = tRowIdx;
                    }

                    sheet.getCell(tRowIdx, 1).value = col.po_cd;
                    sheet.getCell(tRowIdx, 2).value = col.order_cd;
                    sheet.getCell(tRowIdx, 3).value = col.vendor_name;
                    sheet.getCell(tRowIdx, 4).value = col.matl_name;
                    sheet.getCell(tRowIdx, 5).value = col.color;
                    sheet.getCell(tRowIdx, 6).value = col.spec;
                    sheet.getCell(tRowIdx, 7).value = col.unit;
                    sheet.getCell(tRowIdx, 8).value = col.etd;
                    sheet.getCell(tRowIdx, 9).value = col.eta;
                    sheet.getCell(tRowIdx, 10).value = col.pl_no;
                    sheet.getCell(tRowIdx, 11).value = '';
                    sheet.getCell(tRowIdx, 12).value = col.out_qty;
                    sheet.getCell(tRowIdx, 13).value = col.out_from;
                    sheet.getCell(tRowIdx, 14).value = displayCtQty;
                    sheet.getCell(tRowIdx, 15).value = col.ct_no;
                    sheet.getCell(tRowIdx, 16).value = col.remark;
                    sheet.getCell(tRowIdx, 17).value = col.delivery;
                    sheet.getCell(tRowIdx, 18).value = col.input_kind;
                    sheet.getCell(tRowIdx, 19).value = col.matl_cd;
                    sheet.getCell(tRowIdx, 20).value = col.hs_no;
                    sheet.getCell(tRowIdx, 21).value = col.hs_name;
                    sheet.getCell(tRowIdx, 22).value = col.width;
                    sheet.getCell(tRowIdx, 23).value = col.composition;
                    sheet.getCell(tRowIdx, 24).value = col.custom_name;
                    sheet.getCell(tRowIdx, 25).value = col.custom_code;
                    sheet.getCell(tRowIdx, 26).value = col.custom_unit;

                    tRowIdx += 1;
                    writtenRowCount += 1;
                }

                let finalMergeEndRow = tRowIdx - 1;
                if (finalMergeEndRow > mergeStartRow) {
                    sheet.mergeCells(mergeStartRow, 14, finalMergeEndRow, 14);
                    sheet.mergeCells(mergeStartRow, 15, finalMergeEndRow, 15);
                    sheet.mergeCells(mergeStartRow, 16, finalMergeEndRow, 16);
                }

                // ===== TOTAL ROW 추가 =====
                const totalRowIdx = tRowIdx; // 마지막 데이터 다음 줄
                const dataStartRow = 4; // 데이터 시작 행 (현재 코드 기준)

                sheet.mergeCells(totalRowIdx, 1, totalRowIdx, 11);

                sheet.getCell(totalRowIdx, 1).value = 'TOTAL';

                sheet.getCell(totalRowIdx, 12).value = {
                    formula: `SUM(L${dataStartRow}:L${totalRowIdx - 1})`,
                };

                sheet.getCell(totalRowIdx, 14).value = {
                    formula: `SUM(N${dataStartRow}:N${totalRowIdx - 1})`,
                };

                console.log(
                    `[S043101_EXCEL2_260225] sourceRows=${tRet.length}, writtenRows=${writtenRowCount}`,
                );

                wb.eachSheet((worksheet) => {
                    worksheet.eachRow((row) => {
                        row.eachCell((cell) => {
                            cell.font = {
                                name: 'Dotum', // 돋움체
                                size: 11,
                            };
                        });
                    });
                });

                return await upload(`${tWExcelFile}.xlsx`, wb);
            } catch (error) {
                var tRetArray = [];
                var tObj = {};
                tObj.id = 1;
                tObj.CODE = `ERROR:Excel Print:${error.message}`;
                console.log(tObj.CODE);
                tRetArray.push(tObj);
                return tRetArray;
            }
        },

        // 4_1 Backup
        mgrQueryS043101_4_1_1: async (_, args) => {
            var tSQL = '';

            let sqlStr = `
                SELECT
                    A1.PO_CD,
                    A1.PO_SEQ,
                    A1.ORDER_CD,
                    A1.MATL_CD,
                    A1.MRP_SEQ,
                    A1.MATL_SEQ,
                    A3.MATL_NAME,
                    A3.COLOR,
                    A3.SPEC,
                    A3.UNIT,
                    (
                        A1.PO_QTY - A1.STOCK_QTY + A1.MOQ + isnull(A1.LEFTOVER_QTY, 0)
                    ) as PO_QTY,
                    A1.IN_QTY as IN_QTY,
                    A1.OUT_QTY as OUT_QTY,
                    A6.OUT_QTY as OUT_QTY2
                FROM
                    KSV_STOCK_MEM A1,
                    KSV_STOCK_OUT A6,
                    KSV_PU_MST2 A5,
                    KSV_PO_MRP A2,
                    KCD_MATL_MST A3,
                    KCD_MATL_MEM A4
                WHERE
                    A1.PU_CD = '${args.data.PU_CD}'
                    AND A1.PU_CD = A6.PU_CD
                    AND A1.PO_CD = A6.PO_CD
                    AND A1.PO_SEQ = A6.PO_SEQ
                    AND A1.ORDER_CD = A6.ORDER_CD
                    AND A1.MATL_CD = A6.MATL_CD
                    AND A1.MRP_SEQ = A6.MRP_SEQ
                    AND A6.STSOUT_CD = '${args.data.STSOUT_CD}'
                    -- AND   A6.IN_QTY > 0 
                    -- AND   A6.IN_QTY > A6.OUT_QTY
                    AND A1.PU_CD = A5.PU_CD
                    AND A1.MATL_CD = A3.MATL_CD
                    AND A1.MATL_CD = A4.MATL_CD
                    AND A1.MATL_SEQ = A4.MATL_SEQ
                    AND A1.PO_CD = A2.PO_CD
                    AND A1.PO_SEQ = A2.PO_SEQ
                    AND A1.ORDER_CD = A2.ORDER_CD
                    AND A1.MATL_CD = A2.MATL_CD
                    AND A1.MRP_SEQ = A2.MRP_SEQ
                    AND A1.MATL_SEQ = A2.MATL_SEQ
                    -- AND   A1.IN_QTY > 0 
                    -- AND   A1.IN_QTY > A1.OUT_QTY
                    -- AND   A5.BUYER_CD = A51.BUYER_CD
                    -- AND   A5.VENDOR_CD = A52.VENDOR_CD
                order by
                    A1.PO_CD,
                    A1.PO_SEQ
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            return tRet;
        },

        mgrQueryS043101_4_1_bak: async (_, args) => {
            var tSQL = '';

            let sqlStr = `
                SELECT
                    A1.PO_CD,
                    A1.PO_SEQ,
                    A1.ORDER_CD,
                    A1.MATL_CD,
                    A1.MRP_SEQ,
                    A1.MATL_SEQ,
                    A3.MATL_NAME,
                    A3.COLOR,
                    A3.SPEC,
                    A3.UNIT,
                    A1.PO_QTY2 as PO_QTY,
                    A1.IN_QTY,
                    (A1.IN_QTY + A1.FOC_QTY) as SHIP_QTY,
                    A6.STSOUT_CD,
                    A6.SHIPMENT_CD,
                    A1.OUT_QTY,
                    A6.S_OUT_QTY as OUT_QTY2,
                    isnull(B3.HS_CD, '') as HS_CD,
                    isnull(B3.HS_NAME, '') as HS_NAME,
                    isnull(B1.COMP1, '') as COMP1,
                    isnull(B1.COMP1_PERCENT, '') as COMP1_P,
                    isnull(B1.COMP2, '') as COMP2,
                    isnull(B1.COMP2_PERCENT, '') as COMP2_P,
                    isnull(B1.COMP3, '') as COMP3,
                    isnull(B1.COMP3_PERCENT, '') as COMP3_P,
                    isnull(B1.COMP4, '') as COMP4,
                    isnull(B1.COMP4_PERCENT, '') as COMP4_P,
                    isnull(B2.COMP1, '') as V_COMP,
                    A51.BUYER_CD,
                    A51.BUYER_NAME,
                    A52.VENDOR_CD,
                    A52.VENDOR_NAME,
                    A3.WEIGHT
                FROM
                    KSV_STOCK_MEM2 A1,
                    (
                        select
                            a.PO_CD,
                            a.MATL_CD,
                            b.VENDOR_CD,
                            a.STSOUT_CD,
                            a.SHIPMENT_CD,
                            sum(OUT_QTY) as S_OUT_QTY
                        from
                            ksv_stock_out a,
                            kcd_matl_mst b
                        where
                            a.pu_cd = '${args.data.PU_CD}'
                            and a.stsout_cd = '${args.data.STSOUT_CD}'
                            and a.matl_cd = b.matl_cd
                        group by
                            a.PO_CD,
                            a.MATL_CD,
                            b.VENDOR_CD,
                            a.STSOUT_CD,
                            a.SHIPMENT_CD
                    ) A6,
                    KSV_PU_MST2 A5,
                    KCD_BUYER A51,
                    KCD_VENDOR A52,
                    KCD_MATL_MST A3
                    left join KCD_COMPOSITION B1 on B1.matl_name = A3.MATL_NAME
                    left join KCD_COMPOSITION_V B2 on B2.matl_name = A3.MATL_NAME
                    left join kcd_hscode B3 on B3.HS_NO = A3.HS_CD
                    --KSV_PO_MRP A2, 
                    --KCD_MATL_MEM A4, 
                WHERE
                    A1.PU_CD = '${args.data.PU_CD}'
                    AND A1.PO_CD = A6.PO_CD
                    AND A1.VENDOR_CD = A6.VENDOR_CD
                    AND A1.MATL_CD = A6.MATL_CD
                    AND A1.PU_CD = A5.PU_CD
                    AND A1.MATL_CD = A3.MATL_CD
                    -- AND   A1.MATL_CD = A4.MATL_CD
                    -- AND   A1.MATL_SEQ = A4.MATL_SEQ
                    AND A1.OUT_QTY > 0
                    AND A5.BUYER_CD = A51.BUYER_CD
                    AND A5.VENDOR_CD = A52.VENDOR_CD
                order by
                    A1.PO_CD,
                    A1.PO_SEQ
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tObj = {
                    ...tRet[tIdx],
                };
                tObj.COMP = `${tObj.COMP1} ${tObj.COMP2} ${tObj.COMP3} ${tObj.COMP4}`;

                var tWeight =
                    parseFloat(tObj.WEIGHT) * parseFloat(tObj.OUT_QTY);
                tObj.WEIGHT = String(tWeight);

                let sql0 = `
                    select
                        offer_spec
                    from
                        kcd_offer_spec
                    where
                        matl_name = '${tObj.MATL_NAME}'
                        and vendor_cd = '${tObj.VENDOR_CD}'
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                tObj.OFFER_SPEC = '';
                if (tRet0.length > 0) tObj.OFFER_SPEC = tRet0[0].offer_spec;
                tArray.push(tObj);
            }
            return tArray;
        },

        mgrQueryS043101_4_1_bak2: async (_, args) => {
            var tSQL = '';

            let sqlStr = `
                SELECT
                    A1.PO_CD,
                    A1.PO_SEQ,
                    A1.ORDER_CD,
                    A1.MATL_CD,
                    A1.MRP_SEQ,
                    A1.MATL_SEQ,
                    A3.MATL_NAME,
                    A3.COLOR,
                    A3.SPEC,
                    A3.UNIT,
                    A1.PO_QTY2 as PO_QTY,
                    A1.IN_QTY,
                    (A1.IN_QTY + A1.FOC_QTY) as SHIP_QTY,
                    A6.STSOUT_CD,
                    A6.SHIPMENT_CD,
                    A1.OUT_QTY,
                    A6.S_OUT_QTY as OUT_QTY2,
                    isnull(B3.HS_CD, '') as HS_CD,
                    isnull(B3.HS_NAME, '') as HS_NAME,
                    isnull(B1.COMP1, '') as COMP1,
                    isnull(B1.COMP1_PERCENT, '') as COMP1_P,
                    isnull(B1.COMP2, '') as COMP2,
                    isnull(B1.COMP2_PERCENT, '') as COMP2_P,
                    isnull(B1.COMP3, '') as COMP3,
                    isnull(B1.COMP3_PERCENT, '') as COMP3_P,
                    isnull(B1.COMP4, '') as COMP4,
                    isnull(B1.COMP4_PERCENT, '') as COMP4_P,
                    isnull(B2.COMP1, '') as V_COMP,
                    A51.BUYER_CD,
                    A51.BUYER_NAME,
                    A52.VENDOR_CD,
                    A52.VENDOR_NAME,
                    A3.WEIGHT
                FROM
                    KSV_STOCK_MEM2 A1,
                    (
                        select
                            a.PU_CD,
                            a.PO_CD,
                            a.MATL_CD,
                            b.VENDOR_CD,
                            a.STSOUT_CD,
                            a.SHIPMENT_CD,
                            sum(OUT_QTY) as S_OUT_QTY
                        from
                            ksv_stock_out a,
                            kcd_matl_mst b
                        where
                            a.pu_cd = '${args.data.PU_CD}'
                            and a.stsout_cd = '${args.data.STSOUT_CD}'
                            and a.matl_cd = b.matl_cd
                        group by
                            a.PU_CD,
                            a.PO_CD,
                            a.MATL_CD,
                            b.VENDOR_CD,
                            a.STSOUT_CD,
                            a.SHIPMENT_CD
                    ) A6,
                    KSV_PU_MST2 A5,
                    KCD_BUYER A51,
                    KCD_VENDOR A52,
                    KCD_MATL_MST A3
                    left join KCD_COMPOSITION B1 on B1.matl_name = A3.MATL_NAME
                    left join KCD_COMPOSITION_V B2 on B2.matl_name = A3.MATL_NAME
                    left join kcd_hscode B3 on B3.HS_NO = A3.HS_CD
                    --KSV_PO_MRP A2, 
                    --KCD_MATL_MEM A4, 
                WHERE
                    A1.PU_CD = A6.PU_CD
                    AND A1.PO_CD = A6.PO_CD
                    AND A1.VENDOR_CD = A6.VENDOR_CD
                    AND A1.MATL_CD = A6.MATL_CD
                    AND A6.PU_CD = A5.PU_CD
                    AND A1.MATL_CD = A3.MATL_CD
                    -- AND   A1.MATL_CD = A4.MATL_CD
                    -- AND   A1.MATL_SEQ = A4.MATL_SEQ
                    AND A1.OUT_QTY > 0
                    AND A5.BUYER_CD = A51.BUYER_CD
                    AND A5.VENDOR_CD = A52.VENDOR_CD
                order by
                    A1.PO_CD,
                    A1.PO_SEQ
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tObj = {
                    ...tRet[tIdx],
                };
                tObj.COMP = `${tObj.COMP1} ${tObj.COMP2} ${tObj.COMP3} ${tObj.COMP4}`;

                var tWeight =
                    parseFloat(tObj.WEIGHT) * parseFloat(tObj.OUT_QTY);
                tObj.WEIGHT = String(tWeight);

                let sql0 = `
                    select
                        offer_spec
                    from
                        kcd_offer_spec
                    where
                        matl_name = '${tObj.MATL_NAME}'
                        and vendor_cd = '${tObj.VENDOR_CD}'
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                tObj.OFFER_SPEC = '';
                if (tRet0.length > 0) tObj.OFFER_SPEC = tRet0[0].offer_spec;
                tArray.push(tObj);
            }
            return tArray;
        },
    },
};

export default moduleQuery_S043101_4_1;
