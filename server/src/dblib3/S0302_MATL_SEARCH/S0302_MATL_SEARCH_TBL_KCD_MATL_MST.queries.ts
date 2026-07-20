// MGR_@@TNAME@@.queries.js

import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
import axios from 'axios';
const Excel = require('exceljs');
const { upload } = require('../../../routes/s3');

// export default로 Query 내용 내보내기
const moduleQuery_S0302_MATL_SEARCH_TBL_KCD_MATL_MST = {
    Query: {
        mgrQuery_S0302_EXCEL: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var s_date = args.data.S_SHIP_DATE;
            var e_date = '';
            if (args.data.E_SHIP_DATE === '') e_date = tRetDate.substring(0, 8);
            if (args.data.S_SHIP_DATE === '') s_date = '20230101';

            var tWExcelFile = `MaterialSearchList-${tUserInfo.USER_ID}-${tRetDate1}`;

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
                const sheet = wb.getWorksheet(tSheetName);
                // const sheet = wb.getWorksheet(1);

                sheet.getCell(1, 1).value =
                    `Material Search(${args.data.MATL_CD})`;

                sheet.getCell(3, 1).value = 'Matl Cd';
                sheet.getCell(3, 2).value = 'Description';
                sheet.getCell(3, 3).value = 'Color';
                sheet.getCell(3, 4).value = 'Spec';
                sheet.getCell(3, 5).value = 'Sale Price';
                sheet.getCell(3, 6).value = 'Curr';
                sheet.getCell(3, 7).value = 'Unit';
                sheet.getCell(3, 8).value = 'Supplier';

                for (let c = 1; c <= 8; c++) {
                    const cell = sheet.getCell(3, c);
                    cell.border = {
                        top: { style: 'thin', color: { argb: 'FF000000' } },
                        left: { style: 'thin', color: { argb: 'FF000000' } },
                        bottom: { style: 'thin', color: { argb: 'FF000000' } },
                        right: { style: 'thin', color: { argb: 'FF000000' } },
                    };

                    cell.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: 'FFFF00' },
                    };
                }

                var nRowIdx = 4;
                var sql1 = `
                    select
                        a.matl_cd,
                        a.matl_name,
                        a.color,
                        a.spec,
                        b.matl_price,
                        b.curr_cd,
                        a.unit,
                        c.vendor_name
                    from
                        kcd_matl_mst a,
                        kcd_matl_sale b,
                        kcd_vendor c
                    where
                        a.matl_cd like '${args.data.MATL_CD}'
                        and b.matl_cd = a.matl_cd
                        and b.matl_seq = (
                            select
                                max(matl_seq)
                            from
                                kcd_matl_sale
                            where
                                matl_cd = a.matl_cd
                        )
                        and c.vendor_cd = a.vendor_cd
                `;
                var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                var tIdx = 0;
                for (tIdx = 0; tIdx < tRet1.length; tIdx++) {
                    var col = { ...tRet1[tIdx] };
                    sheet.getCell(nRowIdx, 1).value = col.matl_cd;
                    sheet.getCell(nRowIdx, 2).value = col.matl_name;
                    sheet.getCell(nRowIdx, 3).value = col.color;
                    sheet.getCell(nRowIdx, 4).value = col.spec;
                    sheet.getCell(nRowIdx, 5).value = col.matl_price;
                    sheet.getCell(nRowIdx, 6).value = col.curr_cd;
                    sheet.getCell(nRowIdx, 7).value = col.unit;
                    sheet.getCell(nRowIdx, 8).value = col.vendor_name;

                    for (let c = 1; c <= 8; c++) {
                        const cell = sheet.getCell(nRowIdx, c);
                        cell.border = {
                            top: { style: 'thin', color: { argb: 'FF000000' } },
                            left: {
                                style: 'thin',
                                color: { argb: 'FF000000' },
                            },
                            bottom: {
                                style: 'thin',
                                color: { argb: 'FF000000' },
                            },
                            right: {
                                style: 'thin',
                                color: { argb: 'FF000000' },
                            },
                        };
                    }
                }

                nRowIdx = 6;
                sheet.getCell(nRowIdx, 1).value = 'Matl Cd';
                sheet.getCell(nRowIdx, 2).value = 'Prod Cd';
                sheet.getCell(nRowIdx, 3).value = 'Style';
                sheet.getCell(nRowIdx, 4).value = 'NET';
                sheet.getCell(nRowIdx, 5).value = 'LOSS';
                sheet.getCell(nRowIdx, 6).value = 'SIZE';
                sheet.getCell(nRowIdx, 7).value = 'Usage';
                sheet.getCell(nRowIdx, 8).value = 'Order';

                for (let c = 1; c <= 8; c++) {
                    const cell = sheet.getCell(nRowIdx, c);
                    cell.border = {
                        top: { style: 'thin', color: { argb: 'FF000000' } },
                        left: { style: 'thin', color: { argb: 'FF000000' } },
                        bottom: { style: 'thin', color: { argb: 'FF000000' } },
                        right: { style: 'thin', color: { argb: 'FF000000' } },
                    };

                    cell.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: 'FFFF00' },
                    };
                }
                var sql2 = `
                    select distinct
                        a.matl_cd,
                        a.prod_cd,
                        c.style_name,
                        a.net,
                        a.loss,
                        a.use_size,
                        a.remark,
                        d.order_cd
                    from
                        ksv_prod_mem a,
                        ksv_prod_mst b
                        left join ksv_order_mem d on d.prod_cd = b.prod_cd
                        and len(d.order_cd) = 10,
                        kcd_style c
                    where
                        a.matl_cd = '${args.data.MATL_CD}'
                        and b.prod_cd = a.prod_cd
                        and c.style_cd = b.style_cd
                    order by
                        a.matl_cd
                `;
                var tRet2 = await prisma.$queryRaw(Prisma.raw(sql2));
                tIdx = 0;
                nRowIdx = 7;
                for (tIdx = 0; tIdx < tRet2.length; tIdx++) {
                    var col = { ...tRet2[tIdx] };
                    sheet.getCell(nRowIdx, 1).value = col.matl_cd;
                    sheet.getCell(nRowIdx, 2).value = col.prod_cd;
                    sheet.getCell(nRowIdx, 3).value = col.style_name;
                    sheet.getCell(nRowIdx, 4).value = col.net;
                    sheet.getCell(nRowIdx, 5).value = col.loss;
                    sheet.getCell(nRowIdx, 6).value = col.use_size;
                    sheet.getCell(nRowIdx, 7).value = col.remark;
                    sheet.getCell(nRowIdx, 8).value = col.order_cd;

                    for (let c = 1; c <= 8; c++) {
                        const cell = sheet.getCell(nRowIdx, c);
                        cell.border = {
                            top: { style: 'thin', color: { argb: 'FF000000' } },
                            left: {
                                style: 'thin',
                                color: { argb: 'FF000000' },
                            },
                            bottom: {
                                style: 'thin',
                                color: { argb: 'FF000000' },
                            },
                            right: {
                                style: 'thin',
                                color: { argb: 'FF000000' },
                            },
                        };
                    }

                    nRowIdx += 1;
                }

                return await upload(tWExcelFile, wb);
            } catch (error) {
                var tRetArray = [];
                var tObj = {};
                tObj.id = 1;
                tObj.CODE = `ERROR:${error.message}`;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },

        mgrQuery_S0302_MATL_SEARCH_TBL_KCD_MATL_MST: async (_, args) => {
            var tSQL = '';
            var tSQL1 = '';
            if (args.data.MATL_NAME !== '') {
                tSQL += `AND a1.matl_name like  '%${args.data.MATL_NAME}%' `;
            }
            if (args.data.COLOR !== '') {
                tSQL += `AND a1.color like  '%${args.data.COLOR}%' `;
            }
            if (args.data.SPEC !== '') {
                tSQL += `AND a1.spec like  '%${args.data.SPEC}%' `;
            }
            if (args.data.MATL_CD !== '') {
                tSQL += `AND a1.matl_cd like  '%${args.data.MATL_CD}%' `;
            }

            if (args.data.VENDOR_CD !== '') {
                tSQL += `AND (a2.vendor_cd like '%${args.data.VENDOR_CD}%' OR a2.vendor_name like '%${args.data.VENDOR_CD}%') `;
            }
            let sqlStr = `
                select
                    a.*,
                    b.MATL_PRICE,
                    b.CURR_CD,
                    c.VENDOR_NAME,
                    c.status_cd as VENDOR_STATUS_CD,
                    d.matl_type2 as MATL_TYPE2_NAME,
                    e.cd_name as MATL_TYPE_NAME
                from
                    (
                        select
                            top 1000 a1.*
                        from
                            kcd_matl_mst a1,
                            kcd_vendor a2
                        where
                            a1.vendor_cd = a2.vendor_cd ${tSQL}
                        order by
                            a1.reg_datetime desc
                            -- offset 0 rows fetch next 1000 rows only
                    ) a
                    left join kcd_matl_sale b on b.matl_cd = a.matl_cd
                    and b.matl_seq = (
                        select
                            max(matl_seq)
                        from
                            kcd_matl_sale
                        where
                            matl_cd = a.matl_cd
                    )
                    left join kcd_vendor c on c.vendor_cd = a.vendor_cd
                    left join kcd_matl_type2 d on d.seq = a.matl_type2
                    left join kcd_code e on e.cd_code = a.matl_type
                    and e.cd_group = 'MATL_TYPE' ${tSQL1}
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                MATL_TYPE2: '',
                MATL_CD: '',
                MATL_TYPE: '',
                MATL_TYPE_NAME: '',
                VENDOR_CD: '',
                VENDOR_NAME: '',
                MATL_NAME: '',
                COLOR: '',
                SPEC: '',
                UNIT: '',
                UNIT_NAME: '',
                MATL_PRICE: '',
                CURR_CD: '',
                S_MATL_PRICE: '',
                S_CURR_CD: '',
                WEIGHT: '',
                BOX_UNIT: '',
                BOX_UNIT_NAME: '',
                STATUS_CD: '',
                STATUS_NAME: '',
                UPD_USER: '',
                REG_USER: '',
                VENDOR_TYPE: '',
                HS_CD: '',
                ADD_RATE: '',
                ADD_AMT: '',
                ADD_LOSS: '',
                REG_DATETIME: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S0302_MATL_SEARCH_TBL_KCD_MATL_MST;
