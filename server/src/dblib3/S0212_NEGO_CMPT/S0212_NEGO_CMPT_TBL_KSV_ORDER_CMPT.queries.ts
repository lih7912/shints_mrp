// MGR_@@TNAME@@.queries.js

import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');
const Excel = require('exceljs');
const {
    generateUploadURL,
    deleteUploadObject,
    upload,
    uploadFile,
} = require('../../../routes/s3');

// export default로 Query 내용 내보내기
const moduleQuery_S0212_NEGO_CMPT_TBL_KSV_ORDER_CMPT = {
    Query: {
        mgrQuery_S0212_EXCEL_PRINT: async (_, args, contextValue) => {
            var tInput1 = {
                ...args.data,
            };

            var tSQL = '';
            let sqlStr = `
                select
                    c.matl_type,
                    c.matl_cd,
                    c.matl_name,
                    c.color,
                    c.spec,
                    a.use_qty,
                    d.matl_price,
                    isnull(a.use_qty * d.matl_price, 0) as matl_amt,
                    e.tot_cnt,
                    isnull(((a.use_qty * d.matl_price) / e.tot_cnt), 0) as cmpt
                from
                    ksv_po_mrp a,
                    kcd_matl_mst c,
                    kcd_matl_mem d,
                    ksv_order_mst e
                where
                    1 = 1
                    and a.order_cd = '${tInput1.ORDER_CD}'
                    and a.order_cd = e.order_cd
                    and c.matl_cd = a.matl_cd
                    and c.matl_type in ('P', 'H', 'E', 'R', 'W', 'Q', 'D', 'L')
                    and d.matl_cd = a.matl_cd
                    and d.matl_seq = (
                        select
                            max(matl_seq)
                        from
                            kcd_matl_mem
                        where
                            c.matl_cd = matl_cd
                    )
                    and (
                        (a.use_po_type = '1')
                        or (
                            a.use_po_type = '2'
                            and a.diff_po_type = '5'
                        )
                    )
                    and c.vendor_cd in ('V0882', 'V1838', 'V2078')
                order by
                    1
            `;

            if (tInput1.IS_LOCAL_DETAIL) {
                sqlStr = `
                    SELECT
                        c.matl_type,
                        c.matl_cd,
                        c.matl_name,
                        c.color,
                        c.spec,
                        a.in_qty as use_qty,
                        a.pay_price as matl_price,
                        (a.in_qty * (a.pay_price * d.usd_rate)) AS matl_amt,
                        e.tot_cnt,
                        (a.in_qty * (a.pay_price * d.usd_rate)) / e.tot_cnt AS cmpt,
                        b.vendor_name as vendor,
                        LEFT(a.in_datetime, 8) AS in_date
                    FROM
                        ksv_stock_in a,
                        kcd_matl_mst c,
                        kcd_vendor b,
                        kcd_curr_avr d,
                        ksv_order_mst e
                    WHERE
                        a.po_cd = '${tInput1.PO_CD}'
                        AND a.order_cd = '${tInput1.ORDER_CD}'
                        AND a.in_datetime >= '20230801000000'
                        AND a.order_cd = e.order_cd
                        AND c.matl_cd = a.matl_cd
                        AND d.start_date = (
                            SELECT
                                MAX(start_date)
                            FROM
                                kcd_curr_avr
                        )
                        AND d.curr_cd = a.pay_curr_cd
                        AND b.vendor_cd NOT IN ('V0882', 'V1838', 'V2078')
                        AND b.vendor_cd = c.vendor_cd
                        AND b.vendor_type = '5'
                        AND b.vendor_name NOT LIKE '%free%'
                    UNION
                    SELECT
                        c.matl_type,
                        c.matl_cd,
                        c.matl_name,
                        c.color,
                        c.spec,
                        a.in_qty,
                        a.pay_price,
                        (a.in_qty * (a.pay_price * d.usd_rate)) AS total_usd,
                        e.tot_cnt,
                        (a.in_qty * (a.pay_price * d.usd_rate)) / e.tot_cnt AS usd_per_cnt,
                        b.vendor_name as vendor,
                        LEFT(a.in_datetime, 8) AS in_date
                    FROM
                        ksv_stock_in a
                        INNER JOIN ksv_stock_mem f ON (
                            a.po_cd = f.po_cd
                            AND a.matl_cd = f.matl_cd
                            AND f.min_order = '${tInput1.ORDER_CD}'
                        ),
                        kcd_matl_mst c,
                        kcd_vendor b,
                        kcd_curr_avr d,
                        ksv_order_mst e
                    WHERE
                        a.po_cd = '${tInput1.PO_CD}'
                        AND a.po_seq IN ('98', '99')
                        AND a.in_datetime >= '20230801000000'
                        AND c.matl_cd = a.matl_cd
                        AND d.start_date = (
                            SELECT
                                MAX(start_date)
                            FROM
                                kcd_curr_avr
                        )
                        AND d.curr_cd = a.pay_curr_cd
                        AND b.vendor_cd NOT IN ('V0882', 'V1838', 'V2078')
                        AND b.vendor_cd = c.vendor_cd
                        AND b.vendor_type = '5'
                        AND e.order_cd = f.min_order
                        AND b.vendor_name NOT LIKE '%free%'
                    ORDER BY
                        1;
                `;
            }

            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            try {
                var tSQL = '';
                var tRetDate = AFLib.getCurrTime();
                var tRetDate1 = tRetDate.substring(0, 8);
                var tUserInfo = AFLib.getUserInfo(contextValue);

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
                const sheet = wb.getWorksheet(tSheetName);

                const borderStyle = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' },
                };

                sheet.getCell(1, 1).value = 'CMPT Detail';
                if (tInput1.IS_LOCAL_DETAIL) {
                    sheet.getCell(1, 1).value = 'Local Detail';
                }
                sheet.getCell(2, 1).value = args.data.ORDER_CD;

                sheet.getCell(3, 1).value = 'Matl Type';
                sheet.getCell(3, 2).value = 'Matl Cd';
                sheet.getCell(3, 3).value = 'Desc';
                sheet.getCell(3, 4).value = 'Color';
                sheet.getCell(3, 5).value = 'Spec';
                sheet.getCell(3, 6).value = 'Qty';
                sheet.getCell(3, 7).value = 'Price';
                sheet.getCell(3, 8).value = 'Amt';
                sheet.getCell(3, 9).value = 'Order Qty';
                sheet.getCell(3, 10).value = 'CMPT';

                if (tInput1.IS_LOCAL_DETAIL) {
                    sheet.getCell(3, 11).value = 'Vendor';
                    sheet.getCell(3, 12).value = 'IN Date';
                }

                sheet.getRow(3).eachCell((cell) => {
                    cell.border = borderStyle;
                });

                tRet.forEach((col, i) => {
                    const rowIdx = 4 + i;
                    const row = sheet.getRow(rowIdx);

                    sheet.getCell(4 + i, 1).value = col.matl_type;
                    sheet.getCell(4 + i, 2).value = col.matl_cd;
                    sheet.getCell(4 + i, 3).value = col.matl_name;
                    sheet.getCell(4 + i, 4).value = col.color;
                    sheet.getCell(4 + i, 5).value = col.spec;
                    sheet.getCell(4 + i, 6).value = Number(col.use_qty);
                    sheet.getCell(4 + i, 6).numFmt = '#,##0';
                    sheet.getCell(4 + i, 7).value = Number(col.matl_price);
                    sheet.getCell(4 + i, 7).numFmt = '#,##0.00';
                    sheet.getCell(4 + i, 8).value = Number(col.matl_amt);
                    sheet.getCell(4 + i, 8).numFmt = '#,##0.00';
                    sheet.getCell(4 + i, 9).value = Number(col.tot_cnt);
                    sheet.getCell(4 + i, 9).numFmt = '#,##0';
                    sheet.getCell(4 + i, 10).value = Number(col.cmpt);

                    if (tInput1.IS_LOCAL_DETAIL) {
                        sheet.getCell(4 + i, 11).value = col.vendor;
                        sheet.getCell(4 + i, 12).value = col.in_date;
                    }

                    // 테두리 적용 및 정렬
                    row.eachCell((cell, colNumber) => {
                        cell.border = borderStyle;
                        // 숫자형 컬럼은 오른쪽 정렬
                        if ([6, 7, 8, 9, 10].includes(colNumber)) {
                            cell.alignment = { horizontal: 'right' };
                        } else {
                            cell.alignment = { horizontal: 'left' };
                        }
                    });
                });

                var tWExcelFile = `Cmpt Detail-${args.data.ORDER_CD}-${tUserInfo.USER_ID}-${tRetDate}`;
                if (tInput1.IS_LOCAL_DETAIL) {
                    tWExcelFile = `Local Detail-${args.data.ORDER_CD}-${tUserInfo.USER_ID}-${tRetDate}`;
                }

                const uploadInfo = await generateUploadURL();
                const uploadURL = uploadInfo.uploadURL;
                const fileURL = uploadURL.split('?')[0];

                var tInObj0 = {};
                tInObj0.NAME = tWExcelFile;
                tInObj0.URL = fileURL;
                tInObj0.TITLE = tWExcelFile;
                tInObj0.FILE_KEY = tWExcelFile;
                tInObj0.KIND = 'S0212';
                await upload(`${tWExcelFile}.xlsx`, wb, uploadURL);
                let fileUrl = tInObj0.URL;

                var tRetArray = [];
                var tObj = {};
                tObj.id = 1;
                tObj.CODE = `SUCCESS?${tWExcelFile}.xlsx?${fileUrl}`;
                tRetArray.push(tObj);
                return tRetArray;
            } catch (error) {
                var tRetArray = [];
                var tObj = {};
                tObj.id = 0;
                tObj.CODE = 'ERROR: ' + error.message;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },
        mgrQuery_S0212_NEGO_HISTORY: async (_, args) => {
            var tSQL = '';

            let sqlStr = `
                SELECT
                    A.NEGO_SEQ,
                    A.BVT_CMPT,
                    B.CD_NAME,
                    A.STS_CMPT,
                    A.REMARK,
                    A.REG_USER,
                    A.REG_DATETIME
                FROM
                    KSV_ORDER_CMPT A,
                    KCD_CODE B
                WHERE
                    A.ORDER_CD = '${args.data.ORDER_CD}'
                    AND B.CD_GROUP = 'FC_NEGO_TYPE'
                    AND B.CD_CODE = A.NEGO_TYPE
                ORDER BY
                    A.NEGO_SEQ
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },

        mgrQuery_S0212_NEGO_CMPT_CODE: async (_, args) => {
            var tWRet = {};

            var tSQL = '';
            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'FC_NEGO_TYPE'
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            var tObj = {};
            tObj.CD_CODE = '';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);

            tWRet.NEGO_TYPE = tRet;

            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_FACTORY
                where
                    factory_cd in ('FC034', 'FC044', 'FC010')
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            var tObj = {};
            tObj.FACTORY_CD = '';
            tObj.FACTORY_NAME = ' ';
            tRet.unshift(tObj);

            tWRet.FACTORY_CD = tRet;

            let sqlStr = `
                SELECT
                    BUYER_CD,
                    BUYER_NAME
                FROM
                    KCD_BUYER
                order by
                    reg_datetime desc
                    -- offset 0 rows fetch next 1000 rows only
            `;
            let tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRet = [];
            tRet0.forEach((col, i) => {
                var tObj = {
                    ...col,
                };
                tObj.BUYER_NAME = `${tObj.BUYER_CD}) ${tObj.BUYER_NAME}`;
                tRet.push(tObj);
            });
            var tObj = {};
            tObj.BUYER_CD = '';
            tObj.BUYER_NAME = ' ';
            tRet.unshift(tObj);
            tWRet.BUYER_CD = tRet;

            /*
                   let sqlStr = `
                       SELECT DISTINCT
                           A.id,
                           A.PO_CD,
                           A.PO_STATUS,
                           B.CD_NAME as PO_STATUS_NAME
                       FROM
                           KSV_PO_MST A
                           INNER JOIN KCD_CODE B ON A.PO_STATUS = B.CD_CODE
                           AND B.CD_GROUP = 'PO_STATUS'
                       WHERE
                           A.PO_STATUS <> '5'
                       ORDER BY
                           a.id desc,
                           A.PO_CD desc
                           -- OFFSET 0 rows fetch next 1000 rows only
                   `;
                   let tRet  =  await prisma.$queryRaw(Prisma.raw(sqlStr));
            */
            let tRet = [];

            var tObj = {};
            tObj.PO_CD = '';
            tObj.PO_CD = ' ';
            tRet.unshift(tObj);

            tWRet.PO_CD = tRet;

            return tWRet;
        },
        mgrQuery_S0212_LIST_1: async (_, args) => {
            let sqlStr0 = `
                select
                    k0.*
                from
                    (
                        select
                            e.PO_CD,
                            a.ORDER_CD,
                            c.STYLE_NAME,
                            a.DUE_DATE,
                            a.TOT_CNT,
                            a.AVR_PRICE as PRICE,
                            'FAC' as LOC,
                            '' as CMPT,
                            '0' as SCREEN_PRINT,
                            '0' as HEAT_SILICON,
                            '0' as EMBROIDERY,
                            '0' as TPR,
                            '0' as WELDING,
                            '0' as QUILTING,
                            '0' as DIGITAL_PRINT,
                            '0' as LABEL_PRINT,
                            '0' as LOCAL,
                            '0' as SUB_TOTAL_COST,
                            '0' as LINE_CHARGE,
                            '0' as TOTAL_COST,
                            d.cd_name as NEGO_TYPE_N,
                            '' as REMARK,
                            a.FC_NEGO_TYPE as NEGO_TYPE,
                            '' as STS_CMPT,
                            a.ORDER_STATUS,
                            '0' as NEGO_SEQ,
                            a.FACTORY_CD,
                            a.REG_DATETIME
                        from
                            ksv_order_mst a
                            left join kcd_code d on a.fc_nego_type = d.cd_code
                            and d.cd_group = 'FC_NEGO_TYPE'
                            left join ksv_po_mem e on a.order_cd = e.order_cd
                            and e.po_seq = 1
                            and e.po_cd like '%${args.data.PO_CD}%',
                            kcd_style c
                        where
                            a.due_date between '${args.data.S_DUE_DATE}' and '${args.data.E_DUE_DATE}'
                            and a.style_cd = c.style_cd
                            and a.style_cd <> '00-0000'
                            and a.fc_nego_type like '%${args.data.FC_NEGO_TYPE}%'
                            AND (
                                a.fc_nego_type is null
                                or a.fc_nego_type = ''
                                or a.fc_nego_type = '0'
                            )
                            and a.order_status <> '4'
                            and a.order_type in ('0', '1')
                            and a.order_cd like '%${args.data.ORDER_CD}%'
                            AND a.factory_cd like '%${args.data.FACTORY_CD}%'
                            AND left(a.order_cd, 2) like '%${args.data.BUYER_CD}%'
                            and c.style_name like '%${args.data.STYLE_NAME}%'
                            and a.order_cd like '%${args.data.ORDER_CD}%'
                        union
                        select
                            e.PO_CD,
                            a.ORDER_CD,
                            c.STYLE_NAME,
                            a.DUE_DATE,
                            a.TOT_CNT,
                            a.AVR_PRICE as PRICE,
                            'FAC' as LOC,
                            isnull(b.BVT_CMPT, '0') as CMPT,
                            isnull(b.BVT_SCREEN_PRINT, '0') as SCREEN_PRINT,
                            isnull(b.BVT_HEAT_SILICON, '0') as HEAT_SILICON,
                            isnull(b.BVT_EMBROIDERY, '0') as EMBROIDERY,
                            isnull(b.BVT_TPR, '0') as TPR,
                            isnull(b.BVT_WELDING, '0') as WELDING,
                            isnull(b.BVT_QUILTING, '0') as QUILTING,
                            isnull(b.BVT_DIGITAL_PRINT, '0') as DIGITAL_PRINT,
                            isnull(b.bvt_label_print, '0') as LABEL_PRINT,
                            isnull(b.bvt_local, '0') as LOCAL,
                            (
                                isnull(b.bvt_cmpt, 0) + isnull(b.bvt_screen_print, 0) + isnull(b.bvt_heat_silicon, 0) + isnull(b.bvt_embroidery, 0) + isnull(b.bvt_tpr, 0) + isnull(b.bvt_welding, 0) + isnull(b.bvt_quilting, '0') + isnull(b.bvt_digital_print, '0') + isnull(b.bvt_label_print, '0')
                            ) as SUB_TOTAL_COST,
                            isnull(b.bvt_line_charge, '0') as LINE_CHARGE,
                            (
                                isnull(b.bvt_cmpt, 0) + isnull(b.bvt_screen_print, 0) + isnull(b.bvt_heat_silicon, 0) + isnull(b.bvt_embroidery, 0) + isnull(b.bvt_tpr, 0) + isnull(b.bvt_welding, 0) + isnull(b.bvt_quilting, '0') + isnull(b.bvt_digital_print, '0') + isnull(b.bvt_label_print, '0') + isnull(b.bvt_local, '0') + isnull(b.bvt_line_charge, '0')
                            ) as TOTAL_COST,
                            d.cd_name as NEGO_TYPE_N,
                            b.REMARK,
                            b.NEGO_TYPE as NEGO_TYPE,
                            b.STS_CMPT,
                            a.ORDER_STATUS,
                            b.NEGO_SEQ,
                            a.FACTORY_CD,
                            a.REG_DATETIME
                        from
                            ksv_order_mst a
                            left join ksv_po_mem e on a.order_cd = e.order_cd
                            and e.po_seq = 1
                            and e.po_cd like '%${args.data.PO_CD}%',
                            kcd_style c,
                            ksv_order_cmpt b
                            left join kcd_code d on b.nego_type = d.cd_code
                            and d.cd_group = 'FC_NEGO_TYPE'
                        where
                            a.due_date between '${args.data.S_DUE_DATE}' and '${args.data.E_DUE_DATE}'
                            AND left(a.order_cd, 2) like '%${args.data.BUYER_CD}%'
                            and a.style_cd <> '00-0000'
                            AND a.factory_cd like '%${args.data.FACTORY_CD}%'
                            AND a.fc_nego_type <> '0'
                            and a.order_status <> '4'
                            and a.order_type in ('0', '1')
                            and a.order_cd = b.order_cd
                            and b.nego_seq = (
                                select
                                    max(nego_seq)
                                from
                                    ksv_order_cmpt
                                where
                                    order_cd = a.order_cd
                            )
                            and b.nego_type like '%${args.data.FC_NEGO_TYPE}%'
                            and a.style_cd = c.style_cd
                            and a.order_cd like '%${args.data.ORDER_CD}%'
                            and c.style_name like '%${args.data.STYLE_NAME}%'
                            and a.order_cd like '%${args.data.ORDER_CD}%'
                    ) k0
                order by
                    k0.PO_CD desc,
                    k0.ORDER_CD desc,
                    k0.NEGO_SEQ
            `;

            let sqlStr1 = `
                select
                    k0.*
                from
                    (
                        select distinct
                            e.PO_CD,
                            a.ORDER_CD,
                            c.STYLE_NAME,
                            a.DUE_DATE,
                            a.TOT_CNT,
                            a.AVR_PRICE as PRICE,
                            'FAC' as LOC,
                            '' as CMPT,
                            '0' as SCREEN_PRINT,
                            '0' as HEAT_SILICON,
                            '0' as EMBROIDERY,
                            '0' as TPR,
                            '0' as WELDING,
                            '0' as QUILTING,
                            '0' as DIGITAL_PRINT,
                            '0' as LABEL_PRINT,
                            '0' as LOCAL,
                            '0' as SUB_TOTAL_COST,
                            '0' as LINE_CHARGE,
                            '0' as TOTAL_COST,
                            d.cd_name as NEGO_TYPE_N,
                            '' as REMARK,
                            a.FC_NEGO_TYPE as NEGO_TYPE,
                            '' as STS_CMPT,
                            a.ORDER_STATUS,
                            '0' as NEGO_SEQ,
                            a.FACTORY_CD,
                            a.REG_DATETIME
                        from
                            ksv_order_mst a
                            left join kcd_code d on a.fc_nego_type = d.cd_code
                            and d.cd_group = 'FC_NEGO_TYPE'
                            left join ksv_po_mem e on a.order_cd = e.order_cd
                            and e.po_seq = 1
                            and e.po_cd like '%${args.data.PO_CD}%',
                            kcd_style c,
                            ksv_order_ship f
                        where
                            f.exfactory between '${args.data.S_EXFACTORY_DATE}' and '${args.data.E_EXFACTORY_DATE}'
                            and a.order_cd = f.order_cd
                            and a.style_cd = c.style_cd
                            and a.style_cd <> '00-0000'
                            and a.order_cd like '${args.data.ORDER_CD}%'
                            AND a.factory_cd like '%${args.data.FACTORY_CD}%'
                            AND left(a.order_cd, 2) like '%${args.data.BUYER_CD}%'
                            -- AND   a.style_cd in (select style_cd from kcd_style where style_name like '%${args.data.STYLE_NAME}%' )
                            -- AND   a.order_cd in (select order_cd from ksv_po_mem where po_cd like '%${args.data.PO_CD}%' )
                            and a.fc_nego_type = '0'
                            and a.order_status <> '4'
                            and a.order_type in ('0', '1')
                            and c.style_name like '%${args.data.STYLE_NAME}%'
                            and a.order_cd like '%${args.data.ORDER_CD}%'
                        union
                        select distinct
                            e.PO_CD,
                            a.ORDER_CD,
                            c.STYLE_NAME,
                            a.DUE_DATE,
                            a.TOT_CNT,
                            a.AVR_PRICE as PRICE,
                            'FAC' as LOC,
                            isnull(b.BVT_CMPT, '0') as CMPT,
                            isnull(b.BVT_SCREEN_PRINT, '0') as SCREEN_PRINT,
                            isnull(b.BVT_HEAT_SILICON, '0') as HEAT_SILICON,
                            isnull(b.BVT_EMBROIDERY, '0') as EMBROIDERY,
                            isnull(b.BVT_TPR, '0') as TPR,
                            isnull(b.BVT_WELDING, '0') as WELDING,
                            isnull(b.BVT_QUILTING, '0') as QUILTING,
                            isnull(b.BVT_DIGITAL_PRINT, '0') as DIGITAL_PRINT,
                            isnull(b.bvt_label_print, '0') as LABEL_PRINT,
                            isnull(b.bvt_local, '0') as LOCAL,
                            (
                                isnull(b.bvt_cmpt, 0) + isnull(b.bvt_screen_print, 0) + isnull(b.bvt_heat_silicon, 0) + isnull(b.bvt_embroidery, 0) + isnull(b.bvt_tpr, 0) + isnull(b.bvt_welding, 0) + isnull(b.bvt_quilting, '0') + isnull(b.bvt_digital_print, '0') + isnull(b.bvt_label_print, '0')
                            ) as SUB_TOTAL_COST,
                            isnull(b.bvt_line_charge, '0') as LINE_CHARGE,
                            (
                                isnull(b.bvt_cmpt, 0) + isnull(b.bvt_screen_print, 0) + isnull(b.bvt_heat_silicon, 0) + isnull(b.bvt_embroidery, 0) + isnull(b.bvt_tpr, 0) + isnull(b.bvt_welding, 0) + isnull(b.bvt_quilting, '0') + isnull(b.bvt_digital_print, '0') + isnull(b.bvt_label_print, '0') + isnull(b.bvt_local, '0') + isnull(b.bvt_line_charge, '0')
                            ) as TOTAL_COST,
                            d.cd_name as NEGO_TYPE_N,
                            b.REMARK,
                            b.NEGO_TYPE as NEGO_TYPE,
                            b.STS_CMPT,
                            a.ORDER_STATUS,
                            b.NEGO_SEQ,
                            a.FACTORY_CD,
                            a.REG_DATETIME
                        from
                            ksv_order_mst a
                            left join ksv_po_mem e on a.order_cd = e.order_cd
                            and e.po_seq = 1
                            and e.po_cd like '%${args.data.PO_CD}%',
                            kcd_style c,
                            ksv_order_ship f,
                            ksv_order_cmpt b
                            left join kcd_code d on b.nego_type = d.cd_code
                            and d.cd_group = 'FC_NEGO_TYPE'
                        where
                            f.exfactory between '${args.data.S_EXFACTORY_DATE}' and '${args.data.E_EXFACTORY_DATE}'
                            and a.order_cd = f.order_cd
                            AND left(a.order_cd, 2) like '%${args.data.BUYER_CD}%'
                            and a.style_cd <> '00-0000'
                            AND a.factory_cd like '%${args.data.FACTORY_CD}%'
                            AND a.fc_nego_type <> '0'
                            and a.order_status <> '4'
                            and a.order_type in ('0', '1')
                            and a.order_cd = b.order_cd
                            and b.nego_seq = (
                                select
                                    max(nego_seq)
                                from
                                    ksv_order_cmpt
                                where
                                    order_cd = a.order_cd
                            )
                            and a.style_cd = c.style_cd
                            and a.order_cd like '%${args.data.ORDER_CD}%'
                            and b.nego_type like '%${args.data.FC_NEGO_TYPE}%'
                            and c.style_name like '%${args.data.STYLE_NAME}%'
                            -- AND   a.style_cd in (select style_cd from kcd_style where style_name like '%${args.data.STYLE_NAME}%' )
                            -- AND   a.order_cd in (select order_cd from ksv_po_mem where po_cd like '%${args.data.PO_CD}%' )
                    ) k0
                order by
                    k0.PO_CD desc,
                    k0.ORDER_CD desc,
                    k0.NEGO_SEQ
            `;

            var tRet = [];
            if (args.data.DUE_DATE_FLAG === '1')
                tRet = await prisma.$queryRaw(Prisma.raw(sqlStr0));
            if (args.data.EXFACTORY_DATE_FLAG === '1')
                tRet = await prisma.$queryRaw(Prisma.raw(sqlStr1));

            var tRetArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tOne = {
                    ...tRet[tIdx],
                };

                let sql0 = `
                    select
                        prod_cd
                    from
                        ksv_order_mem
                    where
                        order_cd = '${tOne.ORDER_CD}'
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                var tProdCd = '';
                if (tRet0.length > 0) tProdCd = tRet0[0].prod_cd;

                // Start 계산
                var tP = 0;
                var tH = 0;
                var tE = 0;
                var tR = 0;
                var tW = 0;
                var tQ = 0;
                var tD = 0;
                var tL = 0;
                var tLocal = 0;
                if (tOne.NEGO_TYPE === '0') {
                    let sql1 = `
                        select
                            c.matl_type,
                            (
                                isnull(sum(a.use_qty * (d.matl_price * e.usd_rate)), 0) / ${tOne.TOT_CNT}
                            ) as c_value
                        from
                            ksv_po_mrp a,
                            kcd_matl_mst c,
                            kcd_matl_mem d,
                            kcd_curr_avr e
                        where
                            a.po_cd = '${tOne.PO_CD}'
                            AND e.START_DATE = (
                                SELECT
                                    max(START_DATE)
                                from
                                    KCD_CURR_AVR
                            )
                            AND e.CURR_CD = d.CURR_CD
                            and a.order_cd = '${tOne.ORDER_CD}'
                            and c.matl_cd = a.matl_cd
                            and c.matl_type in ('P', 'H', 'E', 'R', 'W', 'Q', 'D', 'L')
                            and d.matl_cd = a.matl_cd
                            and d.matl_seq = (
                                select
                                    max(matl_seq)
                                from
                                    kcd_matl_mem
                                where
                                    c.matl_cd = matl_cd
                            )
                            and c.vendor_cd in ('V0882', 'V1838', 'V2078')
                            and (
                                (a.use_po_type = '1')
                                or (
                                    a.use_po_type = '2'
                                    and a.diff_po_type = '5'
                                )
                            )
                        group by
                            c.matl_type
                    `;
                    var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                    tRet1.forEach((col, i) => {
                        if (col.matl_type === 'P')
                            tP += parseFloat(col.c_value);
                        if (col.matl_type === 'H')
                            tH += parseFloat(col.c_value);
                        if (col.matl_type === 'E')
                            tE += parseFloat(col.c_value);
                        if (col.matl_type === 'R')
                            tR += parseFloat(col.c_value);
                        if (col.matl_type === 'W')
                            tW += parseFloat(col.c_value);
                        if (col.matl_type === 'Q')
                            tQ += parseFloat(col.c_value);
                        if (col.matl_type === 'D')
                            tD += parseFloat(col.c_value);
                        if (col.matl_type === 'L')
                            tL += parseFloat(col.c_value);
                    });
                    tOne.SCREEN_PRINT = tP;
                    tOne.HEAT_SILICON = tH;
                    tOne.EMBROIDERY = tE;
                    tOne.TPR = tR;
                    tOne.WELDING = tW;
                    tOne.QUILTING = tQ;
                    tOne.DIGITAL_PRINT = tD;
                    tOne.LABEL_PRINT = tL;
                    tOne.SUB_TOTAL_COST =
                        parseFloat(tOne.CMPT) +
                        tP +
                        tH +
                        tE +
                        tR +
                        tW +
                        tQ +
                        tD +
                        tL;
                    if (
                        tOne.FACTORY_CD === 'FC034' ||
                        tOne.FACTORY_CD === 'FC113' ||
                        tOne.FACTORY_CD === 'FC087'
                    ) {
                        let sql2 = `
                            SELECT
                                (
                                    ISNULL(SUM(A.IN_QTY * (A.PAY_PRICE * D.USD_RATE)), 0) / ${tOne.TOT_CNT}
                                ) as c_value
                            FROM
                                KSV_STOCK_IN A,
                                KCD_MATL_MST C,
                                KCD_VENDOR B,
                                KCD_CURR_AVR D
                            WHERE
                                A.PO_CD = '${tOne.PO_CD}'
                                AND A.ORDER_CD = '${tOne.ORDER_CD}'
                                AND A.IN_DATETIME >= '20230801000000'
                                AND C.MATL_CD = A.MATL_CD
                                AND D.START_DATE = (
                                    SELECT
                                        max(START_DATE)
                                    from
                                        KCD_CURR_AVR
                                )
                                AND D.CURR_CD = A.PAY_CURR_CD
                                AND B.VENDOR_CD NOT IN ('V0882', 'V1838', 'V2078')
                                AND B.VENDOR_CD = C.VENDOR_CD
                                AND B.VENDOR_TYPE = '5'
                                AND B.VENDOR_NAME not like '%free%'
                            union
                            SELECT
                                (
                                    ISNULL(SUM(A.IN_QTY * (A.PAY_PRICE * D.USD_RATE)), 0) / ${tOne.TOT_CNT}
                                ) as c_value
                            FROM
                                KSV_STOCK_IN A
                                inner join KSV_STOCK_MEM E on (
                                    a.PO_CD = e.PO_CD
                                    and a.matl_cd = e.matl_cd
                                    and e.min_order = '${tOne.ORDER_CD}'
                                ),
                                KCD_MATL_MST C,
                                KCD_VENDOR B,
                                KCD_CURR_AVR D
                            WHERE
                                A.PO_CD = '${tOne.PO_CD}'
                                AND A.PO_SEQ in ('98', '99')
                                AND A.IN_DATETIME >= '20230801000000'
                                AND C.MATL_CD = A.MATL_CD
                                AND D.START_DATE = (
                                    SELECT
                                        max(START_DATE)
                                    from
                                        KCD_CURR_AVR
                                )
                                AND D.CURR_CD = A.PAY_CURR_CD
                                AND B.VENDOR_CD NOT IN ('V0882', 'V1838', 'V2078')
                                AND B.VENDOR_CD = C.VENDOR_CD
                                AND B.VENDOR_TYPE = '5'
                                AND B.VENDOR_NAME not like '%free%'
                        `;
                        var tRet2 = await prisma.$queryRaw(Prisma.raw(sql2));
                        tRet2.forEach((col, i) => {
                            tLocal += parseFloat(col.c_value);
                        });
                    }
                    tOne.LOCAL = tLocal;
                    tOne.TOTAL_COST =
                        parseFloat(tOne.SUB_TOTAL_COST) + parseFloat(tLocal);
                    //  Start End
                } else {
                    tLocal = parseFloat(tOne.LOCAL);
                }

                // 재계산
                tP = 0;
                tH = 0;
                tE = 0;
                tR = 0;
                tW = 0;
                tQ = 0;
                tD = 0;
                tL = 0;
                if (parseInt(tOne.ORDER_STATUS) >= 2) {
                    // MRP 이상
                    let sql3 = `
                        select
                            c.matl_type,
                            (
                                isnull(sum(a.use_qty * (d.matl_price * e.usd_rate)), 0) / ${tOne.TOT_CNT}
                            ) as c_value
                        from
                            ksv_po_mrp a,
                            kcd_matl_mst c,
                            kcd_matl_mem d,
                            kcd_curr_avr e
                        where
                            a.po_cd = '${tOne.PO_CD}'
                            AND e.START_DATE = (
                                SELECT
                                    max(START_DATE)
                                from
                                    KCD_CURR_AVR
                            )
                            AND e.CURR_CD = d.CURR_CD
                            and a.order_cd = '${tOne.ORDER_CD}'
                            and c.matl_cd = a.matl_cd
                            and c.matl_type in ('P', 'H', 'E', 'R', 'W', 'Q', 'D', 'L')
                            and d.matl_cd = a.matl_cd
                            and d.matl_seq = (
                                select
                                    max(matl_seq)
                                from
                                    kcd_matl_mem
                                where
                                    c.matl_cd = matl_cd
                            )
                            and c.vendor_cd in ('V0882', 'V1838', 'V2078')
                            and (
                                (a.use_po_type = '1')
                                or (
                                    a.use_po_type = '2'
                                    and a.diff_po_type = '5'
                                )
                            )
                        group by
                            c.matl_type
                    `;
                    var tRet3 = await prisma.$queryRaw(Prisma.raw(sql3));
                    tRet3.forEach((col, i) => {
                        if (col.matl_type === 'P')
                            tP += parseFloat(col.c_value);
                        if (col.matl_type === 'H')
                            tH += parseFloat(col.c_value);
                        if (col.matl_type === 'E')
                            tE += parseFloat(col.c_value);
                        if (col.matl_type === 'R')
                            tR += parseFloat(col.c_value);
                        if (col.matl_type === 'W')
                            tW += parseFloat(col.c_value);
                        if (col.matl_type === 'Q')
                            tQ += parseFloat(col.c_value);
                        if (col.matl_type === 'D')
                            tD += parseFloat(col.c_value);
                        if (col.matl_type === 'L')
                            tL += parseFloat(col.c_value);
                    });
                    if (tOne.NEGO_TYPE === '1') {
                        tP = parseFloat(tOne.SCREEN_PRINT);
                        tH = parseFloat(tOne.HEAT_SILICON);
                        tE = parseFloat(tOne.EMBROIDERY);
                        tR = parseFloat(tOne.TPR);
                        tW = parseFloat(tOne.WELDING);
                        tQ = parseFloat(tOne.QUILTING);
                        tD = parseFloat(tOne.DIGITAL_PRINT);
                        tL = parseFloat(tOne.LABEL_PRINT);
                        tOne.SUB_TOTAL_COST =
                            parseFloat(tOne.CMPT) +
                            tP +
                            tH +
                            tE +
                            tR +
                            tW +
                            tQ +
                            tD +
                            tL;
                        tOne.TOTAL_COST =
                            parseFloat(tOne.SUB_TOTAL_COST) +
                            parseFloat(tOne.LOCAL);
                    } else {
                        tOne.SCREEN_PRINT = tP;
                        tOne.HEAT_SILICON = tH;
                        tOne.EMBROIDERY = tE;
                        tOne.TPR = tR;
                        if (parseFloat(tOne.WELDING) <= 0) tOne.WELDING = tW;
                        tOne.QUILTING = tQ;
                        tOne.DIGITAL_PRINT = tD;
                        tOne.LABEL_PRINT = tL;
                        tOne.SUB_TOTAL_COST =
                            parseFloat(tOne.CMPT) +
                            tP +
                            tH +
                            tE +
                            tR +
                            parseFloat(tOne.WELDING) +
                            tQ +
                            tD +
                            tL;
                        tOne.TOTAL_COST =
                            parseFloat(tOne.SUB_TOTAL_COST) + tLocal;
                    }
                } else {
                    var tArray = ['P', 'H', 'E', 'R', 'W', 'Q', 'D', 'L'];
                    var tIdx4 = 0;
                    for (tIdx4 = 0; tIdx4 < tArray.length; tIdx4++) {
                        var tKind = tArray[tIdx4];
                        let sql5 = `
                            select distinct
                                a.tot_cnt,
                                c.matl_type,
                                isnull(b.net * (d.matl_price * e.usd_rate), 0) as c_value
                            from
                                ksv_order_mem a,
                                ksv_prod_mem b,
                                kcd_matl_mst c,
                                kcd_matl_mem d,
                                kcd_curr_avr e
                            where
                                a.order_cd = '${tOne.ORDER_CD}'
                                AND e.START_DATE = (
                                    SELECT
                                        max(START_DATE)
                                    from
                                        KCD_CURR_AVR
                                )
                                AND e.CURR_CD = d.CURR_CD
                                and b.prod_cd = a.prod_cd
                                and c.matl_cd = b.matl_cd
                                and c.matl_type in ('${tKind}')
                                and d.matl_cd = b.matl_cd
                                and a.add_flag = 0
                                and d.matl_seq = (
                                    select
                                        max(matl_seq)
                                    from
                                        kcd_matl_mem
                                    where
                                        matl_cd = b.matl_cd
                                )
                        `;
                        var tRet5 = await prisma.$queryRaw(Prisma.raw(sql5));
                        tRet5.forEach((col, i) => {
                            var tQty = parseFloat(col.c_value);
                            if (tKind === 'P') tP += tQty;
                            if (tKind === 'H') tH += tQty;
                            if (tKind === 'E') tE += tQty;
                            if (tKind === 'R') tR += tQty;
                            if (tKind === 'W') tW += tQty;
                            if (tKind === 'Q') tQ += tQty;
                            if (tKind === 'D') tD += tQty;
                            if (tKind === 'L') tL += tQty;
                        });
                    }
                    if (tOne.NEGO_TYPE === '1') {
                        tP = parseFloat(tOne.SCREEN_PRINT);
                        tH = parseFloat(tOne.HEAT_SILICON);
                        tE = parseFloat(tOne.EMBROIDERY);
                        tR = parseFloat(tOne.TPR);
                        tW = parseFloat(tOne.WELDING);
                        tQ = parseFloat(tOne.QUILTING);
                        tD = parseFloat(tOne.DIGITAL_PRINT);
                        tL = parseFloat(tOne.LABEL_PRINT);
                        tOne.SUB_TOTAL_COST =
                            parseFloat(tOne.CMPT) +
                            tP +
                            tH +
                            tE +
                            tR +
                            tW +
                            tQ +
                            tD +
                            tL;
                        tOne.TOTAL_COST =
                            parseFloat(tOne.SUB_TOTAL_COST) +
                            parseFloat(tOne.LOCAL);
                    } else {
                        tOne.SCREEN_PRINT = tP;
                        tOne.HEAT_SILICON = tH;
                        tOne.EMBROIDERY = tE;
                        tOne.TPR = tR;
                        if (parseFloat(tOne.WELDING) <= 0) tOne.WELDING = tW;
                        tOne.QUILTING = tQ;
                        tOne.DIGITAL_PRINT = tD;
                        tOne.LABEL_PRINT = tL;
                        tOne.SUB_TOTAL_COST =
                            parseFloat(tOne.CMPT) +
                            tP +
                            tH +
                            tE +
                            tR +
                            parseFloat(tOne.WELDING) +
                            tQ +
                            tD +
                            tL;
                        tOne.TOTAL_COST =
                            parseFloat(tOne.SUB_TOTAL_COST) + tLocal;
                    }
                }

                if (tOne.NEGO_TYPE !== '0') {
                    if (parseFloat(tOne.STS_CMPT) <= 0) {
                        tOne.STS_CMPT = tOne.CMPT;
                    }
                }

                tRetArray.push(tOne);
            }
            return tRetArray;
        },
    },
};

export default moduleQuery_S0212_NEGO_CMPT_TBL_KSV_ORDER_CMPT;
