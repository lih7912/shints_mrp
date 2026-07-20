// MGR_@@TNAME@@.queries.js

import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
import axios from 'axios';
import { MrpProcedureMigration } from '../../mrpProcedureMigration';

const mrpMigration = new MrpProcedureMigration(prisma as any);

const fs = require('fs');
const Excel = require('exceljs');
const { upload } = require('../../../routes/s3');

// export default로 Query 내용 내보내기
const moduleQuery_S0202_STYLE_COST_TBL_KCD_STYLE = {
    Query: {
        mgrQuery_S0202_STYLE_COST_CODE: async (_, args) => {
            var tWRet = {};
            var tStyleCd = args.data.STYLE_CD;

            /*
         var tSQL = '';
         let sqlStr = `
             SELECT
                 SIZE_MEMBER,
                 SIZE_GROUP
             FROM
                 KCD_SIZE_MST
             WHERE
                 STATUS_CD = '0'
                 -- ORDER BY SIZE_GROUP 
                 -- OFFSET 0 rows FETCH NEXT 1000 rows only
         `;
         var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
*/
            tWRet.SIZE_MST = [];

            var tSQL1 = '';
            let sqlStr1 = `
                SELECT DISTINCT
                    A.USE_SIZE,
                    A.USE_SIZE as USE_SIZE_NAME
                FROM
                    KSV_PROD_MST B
                    LEFT JOIN KSV_PROD_MEM A ON A.PROD_CD = B.PROD_CD
                WHERE
                    B.STYLE_CD = '${tStyleCd}'
                    AND A.USE_SIZE <> ''
            `;
            var tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));
            var tObj = {};
            tObj.USE_SIZE = 'ALL';
            tObj.USE_SIZE_NAME = 'ALL';
            tRet1.unshift(tObj);
            tWRet.USE_SIZE = tRet1;

            var tSQL1 = '';
            let sqlStr1 = `
                SELECT
                    BUYER_CD,
                    BUYER_NAME
                FROM
                    KCD_BUYER
                order by
                    BUYER_CD
            `;
            var tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));

            var tArray = [];
            tRet1.forEach((col, i) => {
                var tObj = { ...col };
                tObj.BUYER_NAME = `(${col.BUYER_CD})${col.BUYER_NAME}`;
                tArray.push(tObj);
            });
            tWRet.BUYER_CD = [...tArray];
            var tObj = {};
            tObj.BUYER_CD = '';
            tObj.BUYER_NAME = ' ';
            tWRet.BUYER_CD.unshift(tObj);

            return tWRet;
        },

        mgrQuery_S0202_STYLE_CODE: async (_, args) => {
            var tWRet = {};

            var tSQL = '';
            let sqlStr = `
                select
                    *
                from
                    kcd_style
                where
                    style_name like '%${args.data.STYLE_NAME}%'
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWRet.STYLE_CD = tRet;

            return tWRet;
        },

        mgrQuery_S0202_SIZE_GROUP_BY_BUYER: async (_, args) => {
            var tSQL = '';
            let sqlStr = `
                SELECT
                    SIZE_MEMBER,
                    SIZE_GROUP
                FROM
                    KCD_SIZE_MST
                WHERE
                    STATUS_CD = '0'
                    and buyer_cd = '${args.data.BUYER_CD}'
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            if (tRet.length <= 0) {
                /*
             var sqlStr = `
                 ;
                 
                 select distinct
                     a.SIZE_GROUP,
                     b.SIZE_MEMBER
                 from
                     ksv_order_mst a,
                     kcd_size_mst b
                 where
                     left(a.order_cd, 2) = '${args.data.BUYER_CD}'
                     and a.size_group = b.size_group
             `;
             tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
             */
            }

            var tObj = {};
            tObj.SIZE_MEMBER = ' ';
            tObj.SIZE_GROUP = '';
            tRet.unshift(tObj);
            return tRet;
        },

        mgrQuery_S0202_STYLE_COST_TBL_KCD_STYLE: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND (STYLE_CD like  '%${args.data.STYLE_CD}%' `;
                tSQL += ` OR  STYLE_NAME like  '%${args.data.STYLE_CD}%') `;
            }

            let sqlStr = `
                SELECT
                    id,
                    STYLE_NAME,
                    STYLE_CD,
                    BUYER_CD
                FROM
                    KCD_STYLE
                where
                    status_cd = '0'
                    -- and   len(style_cd) = 9
                    AND (
                        STYLE_CD like '%${args.data.STYLE_NAME.split(' ').join('%')}%'
                        OR STYLE_NAME like '%${args.data.STYLE_NAME.split(' ').join('%')}%'
                    )
                    AND BUYER_CD like '%${args.data.BUYER_CD}%'
                ORDER BY
                    STYLE_CD desc
                    -- OFFSET 0 rows FETCH NEXT 1000 rows only
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                STYLE_NAME: '',
                STYLE_CD: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },

        mgrQuery_S0202_REPORT_1: async (_, args) => {
            try {
                var tSQL = '';
                var tRetDate = AFLib.getCurrTime();
                var tRetDate1 = tRetDate.substring(0, 8);

                var tInput1 = { ...args.data1 };
                var tInput2 = [...args.data2];

                var tIdx = 0;
                var tArray: any[] = [];
                var tArray3: any[] = [];

                var tSumAmtArray: any[] = [];

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

                var tTemplateExcel = `${tPath0}/MAG_STYLE.xlsx`;

                const wb = new Excel.Workbook();
                await wb.xlsx.readFile(tTemplateExcel);

                // COLOR - Process
                var tIdx99 = 0;
                let lastIndex = 0;
                let totalStartIndex = 0;
                let totalLastIndex = 0;

                for (tIdx99 = 0; tIdx99 < tInput2.length; tIdx99++) {
                    var tOne = { ...tInput2[tIdx99] };

                    // var tSheetName  = `S_${tOne.COLOR}`;
                    // const sheet = wb.addWorksheet(tSheetName);

                    var tSheetName = `Sheet${tIdx99 + 1}`;
                    const sheet = wb.getWorksheet(tSheetName);

                    let sqlStr = `
                        select
                            '' AS NUM,
                            c.MATL_CD,
                            '' AS PRODCHK,
                            d.MATL_NAME,
                            d.COLOR,
                            d.SPEC,
                            h.CD_NAME AS MATL_UNIT,
                            c.NET,
                            c.LOSS,
                            c.GROSS,
                            '0' AS QTY,
                            '0' AS TOTAL,
                            e.MATL_PRICE,
                            isnull(d.ADD_RATE, 0) as ADD_RATE,
                            d.ADD_AMT,
                            e.CURR_CD,
                            c.USE_SIZE,
                            '0' AS AMOUNT,
                            '0' AS USDAMOUNT,
                            c.REMARK,
                            I.VENDOR_NAME,
                            b.COLOR as COLOR2,
                            '',
                            '0',
                            I.VENDOR_type,
                            isnull(e.upd_datetime, '') as UPD_DATETIME,
                            isnull(e.reg_datetime, '') as REG_DATETIME,
                            (a.usd_rate * e.matl_price) as PRICE1,
                            (f.usd_rate * e.matl_price) as PRICE2,
                            isnull(d.ADD_LOSS, 0) as ADD_LOSS,
                            g.MATL_PRICE as MATL_PRICE1
                        from
                            ksv_prod_mem c,
                            ksv_prod_mst b,
                            kcd_vendor i,
                            kcd_matl_mst d,
                            kcd_code h,
                            kcd_matl_sale e,
                            kcd_curr_com a,
                            kcd_currency f,
                            kcd_matl_mem g
                        where
                            c.matl_cd = d.matl_cd
                            and d.vendor_cd = i.vendor_cd
                            and h.cd_group = 'MATL_UNIT'
                            and h.cd_code = d.unit
                            and c.prod_cd = b.prod_cd
                            and e.matl_cd = d.matl_cd
                            and e.matl_seq = (
                                select
                                    max(matl_seq)
                                from
                                    kcd_matl_sale
                                where
                                    matl_cd = d.matl_cd
                            )
                            and g.matl_cd = d.matl_cd
                            and g.matl_seq = (
                                select
                                    max(matl_seq)
                                from
                                    kcd_matl_mem
                                where
                                    matl_cd = d.matl_cd
                            )
                            and b.prod_cd = '${tOne.PROD_CD}'
                            and a.start_date = (
                                select
                                    max(start_date)
                                from
                                    kcd_curr_com
                            )
                            and a.curr_cd = e.curr_cd
                            and f.start_date = (
                                select
                                    max(start_date)
                                from
                                    kcd_currency
                            )
                            and f.curr_cd = e.curr_cd
                        ORDER BY
                            c.SEQ,
                            c.MATL_CD,
                            b.PROD_CD
                    `;

                    var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
                    if (tRet.length <= 0) {
                        var tRetArray: any[] = [];
                        var tObj = {
                            id: 0,
                            CODE: 'ERROR:no Material',
                        };

                        tRetArray.push(tObj);
                        return tRetArray;
                    }

                    let sqlStr1 = `
                        SELECT
                            '' AS NUM,
                            c.MATL_CD,
                            '' AS PRODCHK,
                            d.MATL_NAME,
                            d.COLOR,
                            d.SPEC,
                            d.unit,
                            c.NET,
                            c.LOSS,
                            c.GROSS,
                            '0' AS QTY,
                            '0' AS TOTAL,
                            e.MATL_PRICE,
                            d.ADD_RATE,
                            d.ADD_AMT,
                            e.CURR_CD,
                            c.USE_SIZE,
                            '0' AS AMOUNT,
                            '0' AS USDAMOUNT,
                            c.REMARK,
                            I.VENDOR_NAME,
                            b.COLOR as COLOR2,
                            '',
                            e.CONF_FLAG,
                            I.VENDOR_type,
                            isnull(e.upd_datetime, '') as UPD_DATETIME,
                            isnull(e.reg_datetime, '') as REG_DATETIME,
                            d.ADD_LOSS
                        from
                            ksv_prod_mst b,
                            ksv_prod_mem c,
                            kcd_vendor i,
                            kcd_matl_mst d,
                            KCD_MATL_mem e
                        where
                            i.vendor_cd = d.vendor_cd
                            and b.prod_cd = c.prod_cd
                            and c.matl_cd = d.matl_cd
                            and d.matl_cd = e.matl_cd
                            and e.matl_seq = (
                                select
                                    max(matl_seq)
                                from
                                    kcd_matl_mem
                                where
                                    e.matl_cd = matl_cd
                            )
                            and b.PROD_CD = '${tOne.PROD_CD}'
                        ORDER BY
                            c.SEQ,
                            c.MATL_CD,
                            b.PROD_CD;
                    `;

                    var tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));
                    if (tRet1.length <= 0) {
                        var tRetArray: any[] = [];
                        var tObj = {
                            id: 0,
                            CODE: 'ERROR:no Material(1)',
                        };

                        tRetArray.push(tObj);
                        return tRetArray;
                    }

                    var tArray1: any[] = [];
                    var tIdx2 = 0;
                    var tSumAmt = 0;

                    sheet.getCell(9, 31).value = 'STS Usd';
                    sheet.getCell(9, 32).value = 'Usd Price';
                    sheet.getCell(9, 33).value = 'Master Price';

                    sheet.getCell(1, 4).value = tInput1.STYLE_NAME;
                    sheet.getCell(2, 27).value = tRetDate1;

                    var tRowIdx = 10;
                    let startIndex = tRowIdx;
                    var tCount = 0;

                    for (tIdx2 = 0; tIdx2 < tRet.length; tIdx2++) {
                        var tOne1 = tRet[tIdx2];
                        var tOne2 = tRet1[tIdx2];

                        sheet.getCell(5, 5).value = tOne1.COLOR2;
                        sheet.getCell(5, 6).value = tInput1.QTY;
                        sheet.getCell(5, 7).value = tInput1.USE_SIZE;

                        var tWObj: any = {};
                        if (
                            tInput1.USE_SIZE === 'FREE' ||
                            tInput1.USE_SIZE === tOne1.USE_SIZE ||
                            tOne1.USE_SIZE === ''
                        ) {
                            tWObj.NO = tCount + 1;
                            tWObj.MATL_CD = tOne1.MATL_CD;
                            tWObj.START = '*';
                            tWObj.MATL_NAME = tOne1.MATL_NAME;
                            tWObj.COLOR = tOne1.COLOR;
                            tWObj.SPEC = tOne1.SPEC;
                            tWObj.UNIT = tOne1.MATL_UNIT;
                            tWObj.NET = tOne1.NET;
                            tWObj.LOSS = tOne1.LOSS;
                            //tWObj.GROSS = parseFloat(tOne1.NET) + parseFloat(tOne1.NET) * (parseFloat(tOne1.LOSS)) * 0.01;
                            tWObj.GROSS =
                                parseFloat(tOne1.NET) +
                                parseFloat(tOne1.NET) *
                                    parseFloat(tOne1.LOSS) *
                                    0.01;
                            tWObj.QTY = parseInt(tInput1.QTY);
                            tWObj.TOTAL = AFLib.getFloat(
                                tWObj.GROSS * tWObj.QTY,
                                2,
                            );
                            if (tInput1.IS_PRICE)
                                tWObj.PRICE = tOne1.MATL_PRICE;
                            else {
                                if (tOne2.VENDOR_TYPE === '4') {
                                    tWObj.PRICE = 0;
                                } else {
                                    tWObj.PRICE = tOne1.MATL_PRICE;
                                }
                            }
                            if (tOne2.VENDOR_TYPE === '0') tWObj.GUBUN = '*';
                            else if (tOne2.UPD_DATETIME !== '')
                                tWObj.GUBUN = tOne2.UPD_DATETIME;
                            else tWObj.GUBUN = tOne2.REG_DATETIME;
                            tWObj.ADD_RATE = tOne1.ADD_RATE;
                            tWObj.ADD_LOSS = tOne1.ADD_LOSS;
                            tWObj.ADD_AMT = tOne1.ADD_AMT;
                            tWObj.CURR_CD = tOne1.CURR_CD;
                            tWObj.USE_SIZE = tOne1.USE_SIZE;
                            tWObj.AMT =
                                tWObj.TOTAL *
                                (tWObj.PRICE + tWObj.ADD_AMT) *
                                (1 + tWObj.ADD_RATE / 100) *
                                (1 + tWObj.ADD_LOSS / 100);
                            tSumAmt += tWObj.AMT;
                            tWObj.AMT2 = tWObj.AMT / tWObj.QTY;
                            tWObj.USAGE = tOne1.REMARK;
                            tWObj.VENDOR = tOne1.VENDOR_NAME;
                            tWObj.USD_PRICE = tOne1.PRICE1;
                            tWObj.CURR_USD_PRICE = tOne1.PRICE2;
                            tWObj.MEM_PRICE = tOne1.MATL_PRICE1;
                            tWObj.USD_AMT =
                                parseFloat(tWObj.TOTAL) *
                                parseFloat(tOne1.PRICE2);

                            tRowIdx = tCount + 10;
                            tCount += 1;
                        } else if (tInput1.USE_SIZE === 'ALL') {
                            tWObj.NO = tCount + 1;
                            tWObj.MATL_CD = tOne1.MATL_CD;
                            tWObj.START = '*';
                            tWObj.MATL_NAME = tOne1.MATL_NAME;
                            tWObj.COLOR = tOne1.COLOR;
                            tWObj.SPEC = tOne1.SPEC;
                            tWObj.UNIT = tOne1.MATL_UNIT;
                            tWObj.NET = tOne1.NET;
                            tWObj.LOSS = tOne1.LOSS;
                            tWObj.GROSS =
                                parseFloat(tOne1.NET) +
                                parseFloat(tOne1.NET) *
                                    parseFloat(tOne1.LOSS) *
                                    0.01;
                            tWObj.QTY = parseInt(tInput1.QTY);
                            tWObj.TOTAL = AFLib.getFloat(
                                tWObj.GROSS * tWObj.QTY,
                                2,
                            );
                            if (tInput1.IS_PRICE)
                                tWObj.PRICE = tOne1.MATL_PRICE;
                            else {
                                if (tOne2.VENDOR_TYPE === '4') {
                                    tWObj.PRICE = 0;
                                } else {
                                    tWObj.PRICE = tOne1.MATL_PRICE;
                                }
                            }
                            if (tOne2.VENDOR_TYPE === '0') tWObj.GUBUN = '*';
                            else if (tOne2.UPD_DATETIME !== '')
                                tWObj.GUBUN = tOne2.UPD_DATETIME;
                            else tWObj.GUBUN = tOne2.REG_DATETIME;
                            tWObj.ADD_RATE = tOne1.ADD_RATE;
                            tWObj.ADD_LOSS = tOne1.ADD_LOSS;
                            tWObj.ADD_AMT = tOne1.ADD_AMT;
                            tWObj.CURR_CD = tOne1.CURR_CD;
                            tWObj.USE_SIZE = tOne1.USE_SIZE;
                            tWObj.AMT =
                                tWObj.TOTAL *
                                (tWObj.PRICE + tWObj.ADD_AMT) *
                                (1 + tWObj.ADD_RATE / 100) *
                                (1 + tWObj.ADD_LOSS / 100);
                            tSumAmt += tWObj.AMT;
                            tWObj.AMT2 = tWObj.AMT / tWObj.QTY;
                            tWObj.USAGE = tOne1.REMARK;
                            tWObj.VENDOR = tOne1.VENDOR_NAME;
                            tWObj.USD_PRICE = tOne1.PRICE1;
                            tWObj.CURR_USD_PRICE = tOne1.PRICE2;
                            tWObj.MEM_PRICE = tOne1.MATL_PRICE1;
                            tWObj.USD_AMT =
                                parseFloat(tWObj.TOTAL) *
                                parseFloat(tOne1.PRICE2);

                            tRowIdx = tCount + 10;
                            tCount += 1;
                        }

                        if (typeof tWObj.NO !== 'undefined') {
                            sheet.getCell(tRowIdx, 1).value = tWObj.NO;
                            sheet.getCell(tRowIdx, 2).value = tWObj.MATL_CD;
                            sheet.getCell(tRowIdx, 3).value = tWObj.START;
                            sheet.getCell(tRowIdx, 4).value = tWObj.MATL_NAME;
                            sheet.getCell(tRowIdx, 7).value = tWObj.COLOR;
                            sheet.getCell(tRowIdx, 9).value = tWObj.SPEC;
                            sheet.getCell(tRowIdx, 11).value = tWObj.UNIT;
                            sheet.getCell(tRowIdx, 12).value = parseFloat(
                                tWObj.NET,
                            );
                            sheet.getCell(tRowIdx, 12).numFmt = '0.0000';
                            sheet.getCell(tRowIdx, 13).value = parseFloat(
                                tWObj.LOSS,
                            );
                            //sheet.getCell(tRowIdx, 14).value = parseFloat(tWObj.GROSS);
                            sheet.getCell(tRowIdx, 14).value = {
                                formula: `L${tRowIdx}*(1+(M${tRowIdx}/100))`,
                            };
                            sheet.getCell(tRowIdx, 14).numFmt = '0.0000';
                            sheet.getCell(tRowIdx, 15).value = parseFloat(
                                tInput1.QTY,
                            );
                            //sheet.getCell(tRowIdx,16).value = parseFloat(tWObj.TOTAL);
                            sheet.getCell(tRowIdx, 16).value = {
                                formula: `ROUNDUP(N${tRowIdx}*O${tRowIdx},0)`,
                            };
                            sheet.getCell(tRowIdx, 17).value = parseFloat(
                                tWObj.PRICE,
                            );
                            sheet.getCell(tRowIdx, 17).numFmt = '0.0000';
                            if (parseFloat(tWObj.PRICE) === 0) {
                                sheet.getCell(tRowIdx, 17).font = {
                                    size: 10,
                                    name: 'Dotum',
                                    color: { argb: 'FFFF0000' },
                                }; // 빨간색
                            }
                            sheet.getCell(tRowIdx, 18).value = tWObj.GUBUN;
                            sheet.getCell(tRowIdx, 19).value = parseFloat(
                                tWObj.ADD_RATE,
                            );
                            sheet.getCell(tRowIdx, 20).value = parseFloat(
                                tWObj.ADD_LOSS,
                            );
                            sheet.getCell(tRowIdx, 21).value = parseFloat(
                                tWObj.ADD_AMT,
                            );
                            sheet.getCell(tRowIdx, 22).value = tWObj.CURR_CD;
                            sheet.getCell(tRowIdx, 23).value = tWObj.USE_SIZE;
                            //sheet.getCell(tRowIdx, 24).value = parseFloat(tWObj.AMT);
                            sheet.getCell(tRowIdx, 24).value = {
                                formula: `P${tRowIdx}*(Q${tRowIdx}+U${tRowIdx})*(1+S${tRowIdx}/100)*(1+T${tRowIdx}/100)`,
                            };
                            //sheet.getCell(tRowIdx, 25).value = parseFloat(tWObj.USD_AMT);

                            //sheet.getCell(tRowIdx, 26).value = parseFloat(tWObj.AMT2);
                            sheet.getCell(tRowIdx, 26).value = {
                                formula: `Y${tRowIdx}/O${tRowIdx}`,
                            };
                            sheet.getCell(tRowIdx, 27).value = tWObj.USAGE;
                            sheet.getCell(tRowIdx, 29).value = tWObj.VENDOR;
                            // sheet.getCell(tRowIdx, 30).value = parseFloat(tWObj.USD_AMT) / parseFloat(tWObj.TOTAL);
                            sheet.getCell(tRowIdx, 31).value = parseFloat(
                                tWObj.USD_PRICE,
                            );
                            sheet.getCell(tRowIdx, 32).value = parseFloat(
                                tWObj.CURR_USD_PRICE,
                            );
                            sheet.getCell(tRowIdx, 33).value = parseFloat(
                                tWObj.MEM_PRICE,
                            );
                        }

                        tArray1.push(tWObj);
                        tSumAmtArray.push(tSumAmt);
                    }
                    tArray.push(tArray1);

                    if (tInput1.IS_PRICE !== '1') {
                        // include price가 꺼져있으면 가격과 관련된 필드 지움
                        // Q=17, U=21, X=24, Y=25, Z=26 → 열 삭제는 뒤에서부터 해야 순서 안 꼬임

                        const columnsToDelete = [30, 26, 25, 24, 21, 17];

                        for (let col of columnsToDelete) {
                            sheet.spliceColumns(col, 1);
                        }

                        continue;
                    }

                    // var tOne = tInput2[tIdx];

                    let sqlStr9 = `
                        SELECT
                            A.CURR_CD,
                            C.CURR_AMT
                        FROM
                            KCD_MATL_sale AS A
                            INNER JOIN KSV_PROD_MEM AS B ON A.MATL_CD = B.MATL_CD
                            INNER JOIN KCD_CURR_COM AS C ON A.CURR_CD = C.CURR_CD
                        WHERE
                            (B.PROD_CD = '${tOne.PROD_CD}')
                            and c.start_date = (
                                SELECT
                                    MAX(START_DATE) AS Expr1
                                FROM
                                    KCD_CURR_COM AS KCD_CURR_COM_1
                            )
                        GROUP BY
                            A.CURR_CD,
                            C.CURR_AMT
                        ORDER BY
                            A.CURR_CD
                    `;

                    var tRet9 = await prisma.$queryRaw(Prisma.raw(sqlStr9));

                    var tArray2: any = {};
                    tArray2.data = [];
                    tArray2.SUM = 0.0;
                    tArray2.TOTAL = 0.0;
                    tArray2.PRICE_USD = 0.0;
                    var tIdx = 0;
                    var tSum = 0;
                    for (tIdx = 0; tIdx < tRet9.length; tIdx++) {
                        var tOne = tRet9[tIdx];
                        var tWObj: any = {};
                        tWObj.CURR = tOne.CURR_CD;
                        tWObj.AMT = tSumAmtArray[tIdx];
                        tWObj.RATE = tOne.CURR_AMT;
                        tWObj.CHG_AMT = tWObj.AMT / tWObj.RATE;
                        tSum += tWObj.CHG_AMT;
                        tArray2.data.push(tWObj);
                    }
                    tArray2.SUM = tSum;
                    tArray2.TOTAL = parseInt(tInput1.QTY);
                    tArray2.PRICE_USD = tArray2.SUM / tArray2.TOTAL;

                    tArray3.push(tArray2);

                    lastIndex = tRowIdx;

                    tRowIdx++;
                    tRowIdx++;
                    tRowIdx++;

                    sheet.getCell(`W${tRowIdx}`).value = 'Curr';
                    sheet.getCell(`X${tRowIdx}`).value = 'Amount';
                    sheet.getCell(`Y${tRowIdx}`).value = '$Rate';
                    sheet.getCell(`Z${tRowIdx}`).value = '$chgAmount';

                    tRowIdx++;

                    totalStartIndex = tRowIdx;
                    totalLastIndex = tRowIdx;
                    for (let row of tArray2.data) {
                        sheet.getCell(`W${tRowIdx}`).value = row.CURR;
                        sheet.getCell(`X${tRowIdx}`).value = {
                            formula: `SUMIF($V$${startIndex}:$V$${lastIndex},W${tRowIdx},$X$${startIndex}:$X$${lastIndex})`,
                        };
                        sheet.getCell(`Y${tRowIdx}`).value = row.RATE;
                        sheet.getCell(`Z${tRowIdx}`).value = {
                            formula: `X${tRowIdx}/Y${tRowIdx}`,
                        };
                        totalLastIndex = tRowIdx;
                        tRowIdx++;
                    }

                    sheet.getCell(`Y${tRowIdx}`).value = 'Sum';
                    sheet.getCell(`Z${tRowIdx}`).value = {
                        formula: `SUM(Z${totalStartIndex}:Z${totalLastIndex})`,
                    };
                    let sumRow = tRowIdx;

                    tRowIdx++;
                    tRowIdx++;

                    const tealColor = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: '008080' },
                    }; // 청록색 (#008080)
                    sheet.getCell(`Y${tRowIdx}`).value = 'Total';
                    //sheet.getCell(`Y${tRowIdx}`).fill = tealColor; // 배경색 적용
                    sheet.getCell(`Z${tRowIdx}`).value = 'Price($)';
                    //sheet.getCell(`Z${tRowIdx}`).fill = tealColor; // 배경색 적용

                    tRowIdx++;
                    sheet.getCell(`Y${tRowIdx}`).value = tArray2.TOTAL;
                    //sheet.getCell(`Y${tRowIdx}`).fill = tealColor; // 배경색 적용
                    sheet.getCell(`Z${tRowIdx}`).value = {
                        formula: `Z${sumRow} / Y${tRowIdx}`,
                    };
                    //sheet.getCell(`Z${tRowIdx}`).fill = tealColor; // 배경색 적용

                    // 마지막으로 vlookup을 하기위하여 Y컬럼(25)을 세팅
                    for (tRowIdx = 10; tRowIdx <= lastIndex; tRowIdx++) {
                        sheet.getCell(tRowIdx, 25).value = {
                            formula: `X${tRowIdx} / VLOOKUP(V${tRowIdx},$W$${totalStartIndex}:$Y$${totalLastIndex},3)`,
                        };
                    }
                    sheet.getCell(tRowIdx, 26).value = {
                        formula: `SUM(Z10:Z${lastIndex})`,
                    };
                }

                return await upload(
                    `MAG_STYLE-${tInput1.STYLE_NAME.replaceAll(/[\/\\]/g, '-')}-${tRetDate}.xlsx`,
                    wb,
                );
            } catch (error) {
                console.log(error.message);
                var tRetArray: any[] = [];
                var tObj = {
                    id: 0,
                    CODE: 'ERROR: ' + error.message,
                };

                tRetArray.push(tObj);
                return tRetArray;
            }
        },

        mgrQuery_S0202_REPORT_2: async (_, args) => {
            try {
                var tSQL = '';
                var tRetDate = AFLib.getCurrTime();
                var tRetDate1 = tRetDate.substring(0, 8);

                var tInput1 = { ...args.data1 };
                var tInput2 = [...args.data2];

                var tIdx = 0;
                var tArray = [];

                var tSumAmtArray = [];

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

                var tTemplateExcel = `${tPath0}/MAG_STYLE3.xlsx`;

                const wb = new Excel.Workbook();
                await wb.xlsx.readFile(tTemplateExcel);

                var tOne = { ...tInput2[0] };

                var tSheetName = `Sheet1`;
                const sheet = wb.getWorksheet(tSheetName);

                var tStyleName = tInput1.STYLE_NAME.replace(' ', '_');
                tStyleName = tStyleName.replace('/', '_');
                tStyleName = tStyleName.replace('?', '_');
                tStyleName = tStyleName.replace('*', '_');
                tStyleName = tStyleName.replace(':', ';');

                sheet.getCell(4, 7).value = tStyleName;
                sheet.getCell(1, 12).value = tRetDate1;

                let sqlStr = `
                    select
                        left(c.matl_name, 10) as matl_name0,
                        c.matl_name,
                        a.remark,
                        b.vendor_name,
                        a.gross,
                        (d.matl_price * e.usd_rate) as usdprice,
                        c.unit,
                        (
                            (d.matl_price * e.usd_rate) * ((c.add_rate / 100) + 1)
                        ) as price2,
                        (
                            a.gross * (d.matl_price * e.usd_rate) * ((c.add_rate / 100) + 1)
                        ) as price3
                    from
                        ksv_prod_mem a,
                        kcd_vendor b,
                        kcd_matl_mst c,
                        kcd_matl_sale d,
                        kcd_curr_com e,
                        kcd_matl_type2 f
                    where
                        a.matl_cd = c.matl_cd
                        and b.vendor_cd = c.vendor_cd
                        and c.matl_cd = d.matl_cd
                        and d.matl_seq = (
                            select
                                max(matl_seq)
                            from
                                kcd_matl_sale
                            where
                                c.matl_cd = matl_cd
                        )
                        and e.start_date = (
                            select
                                max(start_date)
                            from
                                kcd_curr_com
                        )
                        and e.curr_cd = d.curr_cd
                        and f.seq = c.matl_type2
                        and a.prod_cd = '${tOne.PROD_CD}'
                        and c.matl_type <> 'M'
                    ORDER BY
                        a.SEQ,
                        c.MATL_CD
                `;

                var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
                if (tRet.length <= 0) {
                    /*
               var tRetArray = [];
               var tObj = {};
               tObj.id = 0;
               tObj.CODE = 'ERROR:no Material';
               tRetArray.push(tObj);
               return (tRetArray);
               */
                } else {
                    tRet.forEach((col, i) => {
                        sheet.getCell(62 + i, 2).value = col.matl_name0;
                        sheet.getCell(62 + i, 3).value = col.matl_name;
                        sheet.getCell(62 + i, 6).value = col.remark;
                        sheet.getCell(62 + i, 8).value = col.vendor_name;
                        sheet.getCell(62 + i, 9).value = col.gross;
                        sheet.getCell(62 + i, 10).value = col.usdprice;
                        sheet.getCell(62 + i, 11).value = col.unit;
                        sheet.getCell(62 + i, 12).value = col.price2;
                        sheet.getCell(62 + i, 13).value = col.price3;
                    });
                }

                let sqlStr1 = `
                    select
                        left(c.matl_name, 10) as matl_name0,
                        c.matl_name,
                        a.remark,
                        b.vendor_name,
                        a.gross,
                        (d.matl_price * e.usd_rate) as usdprice,
                        c.unit,
                        (
                            (d.matl_price * e.usd_rate) * ((c.add_rate / 100) + 1)
                        ) as price2,
                        (
                            a.gross * (d.matl_price * e.usd_rate) * ((c.add_rate / 100) + 1)
                        ) as price3
                    from
                        ksv_prod_mem a,
                        kcd_vendor b,
                        kcd_matl_mst c,
                        kcd_matl_sale d,
                        kcd_curr_com e,
                        kcd_matl_type2 f
                    where
                        a.matl_cd = c.matl_cd
                        and b.vendor_cd = c.vendor_cd
                        and c.matl_cd = d.matl_cd
                        and d.matl_seq = (
                            select
                                max(matl_seq)
                            from
                                kcd_matl_sale
                            where
                                c.matl_cd = matl_cd
                        )
                        and e.start_date = (
                            select
                                max(start_date)
                            from
                                kcd_curr_com
                        )
                        and e.curr_cd = d.curr_cd
                        and f.seq = c.matl_type2
                        and a.prod_cd = '${tOne.PROD_CD}'
                        and c.matl_type = 'M'
                    ORDER BY
                        a.SEQ,
                        c.MATL_CD
                `;
                var tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));
                if (tRet1.length <= 0) {
                    /*
                              var tRetArray = [];
                              var tObj = {};
                              tObj.id = 0;
                              tObj.CODE = 'ERROR:no Material';
                              tRetArray.push(tObj);
                              return (tRetArray);
               */
                } else {
                    tRet1.forEach((col, i) => {
                        console.log(col);
                        sheet.getCell(10 + i, 2).value = col.matl_name0;
                        sheet.getCell(10 + i, 3).value = col.matl_name;
                        sheet.getCell(10 + i, 6).value = col.remark;
                        sheet.getCell(10 + i, 8).value = col.vendor_name;
                        sheet.getCell(10 + i, 9).value = col.gross;
                        sheet.getCell(10 + i, 10).value = col.usdprice;
                        sheet.getCell(10 + i, 11).value = col.unit;
                        sheet.getCell(10 + i, 12).value = col.price2;
                        sheet.getCell(10 + i, 13).value = col.price3;
                    });
                }

                var tPath = '';
                var tCols = __dirname.split('/');
                var tFlag = 0;
                tCols.forEach((col, i) => {
                    if (col === 'src') {
                        tPath += '/upload/excel';
                        tFlag = 1;
                    }
                    if (tFlag === 0) {
                        tPath += '/' + col;
                    }
                });

                if (tRet.length <= 0 && tRet1.length <= 0) {
                    var tRetArray: any[] = [];
                    let tObj: any = {
                        id: 0,
                        CODE: 'ERROR:no Material',
                    };

                    tRetArray.push(tObj);
                    return tRetArray;
                }

                return await upload(
                    `MSG_STYLE3-${tStyleName}-${tRetDate}.xlsx`,
                    wb,
                );
            } catch (error) {
                var tRetArray: any[] = [];
                let tObj = {
                    id: 0,
                    CODE: 'ERROR: ' + error.message,
                };

                tRetArray.push(tObj);
                return tRetArray;
            }
        },

        mgrQuery_S0202_REPORT_3: async (_, args, contextValue) => {
            try {
                var tSQLArray = [];
                var tRetDate = AFLib.getCurrTime();
                var tRetDate1 = tRetDate.substring(0, 8);
                var tUserInfo = AFLib.getUserInfo(contextValue);

                var tInput1 = { ...args.data1 };
                var tInput2 = [...args.data2];

                var sql0 = `
                    select
                        size_cnt,
                        size_member
                    from
                        kcd_size_mst
                    where
                        size_group = '${tInput1.SIZE_GROUP}'
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                if (tRet0.length <= 0) {
                    var tRetArray: any[] = [];
                    let tObj = {
                        id: 0,
                        CODE: 'ERROR: Size Group not found ',
                    };
                    tRetArray.push(tObj);
                    return tRetArray;
                }

                var tSizeCnt = parseInt(tRet0[0].size_cnt);
                var tStrQty = parseInt(tInput1.QTY);
                var tTotCnt = tSizeCnt * tStrQty * tInput2.length;

                let sql0 = `
                    delete ksv_order_mst_temp
                    where
                        order_cd = '${tUserInfo.USER_ID}'
                `;
                var tRet0 = prisma.$queryRaw(Prisma.raw(sql0));
                tSQLArray.push(tRet0);

                let sql1 = `
                    delete ksv_order_mem_temp
                    where
                        order_cd = '${tUserInfo.USER_ID}'
                `;
                var tRet1 = prisma.$queryRaw(Prisma.raw(sql1));
                tSQLArray.push(tRet1);

                var tInObj = {};
                tInObj.order_cd = tUserInfo.USER_ID;
                tInObj.style_cd = tInput1.STYLE_CD;
                tInObj.tot_cnt = String(tTotCnt);
                tInObj.size_group = tInput1.SIZE_GROUP;
                tInObj.reg_user = tUserInfo.USER_ID;
                tInObj.reg_datetime = tRetDate;
                let sql2 = AFLib.createTableSql('ksv_order_mst_temp', tInObj);
                var tRet2 = prisma.$queryRaw(Prisma.raw(sql2));
                tSQLArray.push(tRet2);

                /*
            var tTotCnt2  = tSizeCnt * tStrQty;
            var tSizeCnt2 = AFLib.printF(tTotCnt2, 6);
            var tSizeCntStr  = ''; 
            var tIdx1 = 0;
            for (tIdx1 = 0; tIdx1 < tSizeCnt; tIdx1++) {
                tSizeCntStr += tSizeCnt2;
            }
            */

                var tTotCnt2 = tSizeCnt * tStrQty;
                var tSizeCnt2 = AFLib.printF(tStrQty, 6);
                var tSizeCntStr = '';
                var tIdx1 = 0;
                for (tIdx1 = 0; tIdx1 < tSizeCnt; tIdx1++) {
                    tSizeCntStr += tSizeCnt2;
                }

                for (tIdx1 = 0; tIdx1 < tInput2.length; tIdx1++) {
                    var tOne = { ...tInput2[tIdx1] };
                    var tInObj = {};
                    tInObj.ORDER_CD = tUserInfo.USER_ID;
                    tInObj.PROD_CD = tOne.PROD_CD;
                    tInObj.TOT_CNT = String(tTotCnt2);
                    tInObj.SIZE_CNT = tSizeCntStr;
                    let sql3 = AFLib.createTableSql(
                        'ksv_order_mem_temp',
                        tInObj,
                    );
                    var tRet3 = prisma.$queryRaw(Prisma.raw(sql3));
                    tSQLArray.push(tRet3);
                }
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;

                  const retNetCost = await mrpMigration.runNetProductCost(tUserInfo.USER_ID);
                  if (!retNetCost.ok) throw new Error(retNetCost.message || retNetCost.step);

                  // PoMrpTemp
                  const retMrpTemp = await mrpMigration.runMrpTemp({ poCd: tUserInfo.USER_ID, userId: tUserInfo.USER_ID });
                  if (!retMrpTemp.ok) throw new Error(retMrpTemp.message || retMrpTemp.step);

                // Make Excel
                // MaxCol : 31

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

                var tTemplateExcel = `${tPath0}/발주_MRP.xlsx`;
                // var tTemplateExcel = `${tPath0}/발주_제품별MRP.xlsx`;

                const wb = new Excel.Workbook();
                await wb.xlsx.readFile(tTemplateExcel);

                var tSheetName = `Sheet1`;
                const sheet = wb.getWorksheet(tSheetName);

                let sql_style = `
                    select
                        e.style_name,
                        e.buyer_cd
                    from
                        ksv_order_mst_temp a,
                        kcd_style e
                    where
                        a.order_cd = '${tUserInfo.USER_ID}'
                        and e.style_cd = a.style_cd
                `;
                var tRet_style = await prisma.$queryRaw(Prisma.raw(sql_style));

                sheet.getCell(1, 13).value =
                    `${tUserInfo.USER_ID}(제품기준으로작성)`;

                let sql_style1 = `
                    select
                        c.buyer_name,
                        e.style_name,
                        '',
                        '',
                        '',
                        a.size_group,
                        f.size_cnt
                    from
                        ksv_order_mst_temp a,
                        kcd_buyer c,
                        kcd_style e,
                        kcd_size_mst f
                    where
                        a.order_cd = '${tUserInfo.USER_ID}'
                        and c.buyer_cd = e.buyer_cd
                        and e.style_cd = a.style_cd
                        and f.size_group = a.size_group
                `;
                var tRet_style1 = await prisma.$queryRaw(
                    Prisma.raw(sql_style1),
                );

                var tStyleName = tRet_style1[0].style_name;
                var tBuyerName = tRet_style1[0].buyer_name;

                sheet.getCell(2, 20).value = tRet_style1[0].buyer_name;
                sheet.getCell(2, 13).value = tRet_style1[0].style_name;
                sheet.getCell(1, 24).value = tRetDate1;

                let sql_size = `
                    select
                        size_val
                    from
                        kcd_size_mem
                        -- where size_group = '${tInput1.SIZE_GROUP}' escape '[' 
                    where
                        size_group = '${tInput1.SIZE_GROUP}'
                    order by
                        size_seq
                `;
                var tRet_size = await prisma.$queryRaw(Prisma.raw(sql_size));
                var tSizeTitle = '';
                tRet_size.forEach((col, i) => {
                    var tSpace = '     ';
                    tSizeTitle +=
                        tSpace.substring(0, 5 - col.size_val.length) +
                        col.size_val;
                });
                var strTitle = `SEQ COLOR QTY ${tSizeTitle}`;
                sheet.getCell(4, 13).value = 'SEQ';
                sheet.getCell(4, 14).value = 'COLOR';
                sheet.getCell(4, 15).value = 'QTY';
                sheet.getCell(4, 16).value = tSizeTitle;

                // 병합
                sheet.mergeCells(`P4:AC4`);
                sheet.getCell('P4').alignment = { horizontal: 'left' };

                // 제품별 사이즈별 오더수량
                let sql_order = `
                    select
                        a.size_cnt,
                        b.color,
                        b.prod_cd,
                        '0'
                    from
                        ksv_order_mem_temp a,
                        ksv_prod_mst b
                    where
                        a.order_cd = '${tUserInfo.USER_ID}'
                        and b.prod_cd = a.prod_cd
                    order by
                        b.color
                `;
                var tRet_order = await prisma.$queryRaw(Prisma.raw(sql_order));

                var tProdCnt = [];
                var tIdx1 = 0;
                for (tIdx1 = 0; tIdx1 < tSizeCnt; tIdx1++) {
                    tProdCnt.push(0);
                }

                var tRowIdx = 5;
                tRet_order.forEach((col, i) => {
                    var tmpRow = [];
                    tmpRow[13] = 0;
                    tmpRow[14] = '';
                    tmpRow[15] = 0;
                    tmpRow[16] = '';
                    sheet.insertRow(tRowIdx, tmpRow, 'i');

                    sheet.getCell(tRowIdx, 13).value = i + 1;
                    sheet.getCell(tRowIdx, 14).value = col.color;

                    var tTotQty = 0;
                    var tSizeTitle = '';
                    for (tIdx1 = 0; tIdx1 < tSizeCnt; tIdx1++) {
                        var tVal = parseInt(
                            col.size_cnt.substring(tIdx1 * 6, (tIdx1 + 1) * 6),
                        );
                        tProdCnt[tIdx1] += tVal;
                        tTotQty += tVal;

                        var tValStr = String(tVal);
                        var tSpace = '      ';
                        tSizeTitle +=
                            tSpace.substring(0, 6 - tValStr.length) + tValStr;
                    }
                    sheet.getCell(tRowIdx, 15).value = tTotQty;
                    sheet.getCell(tRowIdx, 16).value = tSizeTitle;

                    // 병합
                    sheet.mergeCells(`P${tRowIdx}:AC${tRowIdx}`);
                    sheet.getCell(`P${tRowIdx}`).alignment = {
                        horizontal: 'left',
                    };
                    sheet.getCell(`P${tRowIdx}`).border = {
                        bottom: { style: 'thin' },
                    };

                    tRowIdx += 1;
                });

                var tmpRow = [];
                tmpRow[13] = 0;
                tmpRow[14] = '';
                tmpRow[15] = 0;
                tmpRow[16] = '';
                sheet.insertRow(tRowIdx, tmpRow, 'i');
                var tTotQty = 0;
                var tSizeTitle = '';
                for (tIdx1 = 0; tIdx1 < tSizeCnt; tIdx1++) {
                    var tVal = tProdCnt[tIdx1];
                    tTotQty += tVal;
                    var tValStr = String(tVal);
                    var tSpace = '      ';
                    tSizeTitle +=
                        tSpace.substring(0, 6 - tValStr.length) + tValStr;
                }
                sheet.getCell(tRowIdx, 15).value = tTotQty;
                sheet.getCell(tRowIdx, 16).value = tSizeTitle;
                tRowIdx += 4;

                //
                let sql10_0 = `
                    select
                        max(start_date) as start_date
                    from
                        kcd_currency
                    where
                        curr_cd = 'USD'
                `;
                var tRet10_0 = await prisma.$queryRaw(Prisma.raw(sql10_0));
                var tMaxCurrDate = '';
                if (tRet10_0.length > 0) {
                    tMaxCurrDate = tRet10_0[0].start_date;
                }

                var tCurrDate = tRetDate1;
                if (tMaxCurrDate !== tRetDate1) tCurrDate = tMaxCurrDate;

                // Main
                  const retPrint = await mrpMigration.runPrintMrp1Temp(tUserInfo.USER_ID, tCurrDate);
                  if (!retPrint.ok) throw new Error(retPrint.message || retPrint.step);

                let sql11 = `
                    select
                        ex00,
                        ex01,
                        ex02,
                        ex03,
                        ex04,
                        ex05,
                        ex06,
                        ex07,
                        ex08,
                        ex09,
                        ex10,
                        ex11,
                        ex12,
                        ex13,
                        ex14,
                        ex15,
                        ex16,
                        ex17,
                        ex18,
                        ex19,
                        ex20,
                        ex21,
                        ex22,
                        ex23,
                        ex24,
                        ex25,
                        ex26,
                        ex27,
                        ex28,
                        ex29,
                        ex35,
                        ex36,
                        ex37
                    from
                        kzz_excel
                    where
                        user_id = '${tUserInfo.USER_ID}'
                        and ex_type = 'M'
                    order by
                        ex_seq
                `;
                var tRet11 = await prisma.$queryRaw(Prisma.raw(sql11));

                sheet.getCell(tRowIdx - 1, 31).value = 'Usd Price';
                sheet.getCell(tRowIdx - 1, 32).value = 'Kind2';

                tRet11.forEach((col, i) => {
                    sheet.getCell(tRowIdx, 1).value = col.ex00;
                    sheet.getCell(tRowIdx, 2).value = col.ex01;
                    sheet.getCell(tRowIdx, 3).value = col.ex02;
                    sheet.getCell(tRowIdx, 4).value = col.ex03;
                    sheet.getCell(tRowIdx, 5).value = col.ex04;
                    sheet.getCell(tRowIdx, 6).value = col.ex05;
                    sheet.getCell(tRowIdx, 7).value = col.ex06;
                    sheet.getCell(tRowIdx, 8).value = col.ex07;
                    sheet.getCell(tRowIdx, 9).value = col.ex08;
                    sheet.getCell(tRowIdx, 10).value = col.ex09;
                    sheet.getCell(tRowIdx, 11).value = col.ex10;
                    sheet.getCell(tRowIdx, 12).value = col.ex11;
                    sheet.getCell(tRowIdx, 13).value = col.ex12;
                    sheet.getCell(tRowIdx, 14).value = col.ex13;
                    sheet.getCell(tRowIdx, 12).numFmt = '0.0000';
                    sheet.getCell(tRowIdx, 14).numFmt = '0.0000';
                    sheet.getCell(tRowIdx, 15).value = col.ex14;
                    sheet.getCell(tRowIdx, 16).value = col.ex15;
                    sheet.getCell(tRowIdx, 17).value = col.ex16;
                    sheet.getCell(tRowIdx, 17).numFmt = '0.0000';
                    sheet.getCell(tRowIdx, 18).value = col.ex17;
                    sheet.getCell(tRowIdx, 19).value = col.ex18;
                    sheet.getCell(tRowIdx, 20).value = col.ex19;
                    sheet.getCell(tRowIdx, 21).value = col.ex20;
                    sheet.getCell(tRowIdx, 22).value = col.ex21;
                    sheet.getCell(tRowIdx, 23).value = col.ex22;
                    sheet.getCell(tRowIdx, 24).value = col.ex23;
                    sheet.getCell(tRowIdx, 25).value = col.ex24;
                    sheet.getCell(tRowIdx, 26).value = col.ex25;
                    sheet.getCell(tRowIdx, 27).value = col.ex26;
                    sheet.getCell(tRowIdx, 28).value = col.ex27;
                    sheet.getCell(tRowIdx, 29).value = col.ex28;
                    sheet.getCell(tRowIdx, 30).value = ''; // Nat Name
                    sheet.getCell(tRowIdx, 31).value = col.ex30;
                    sheet.getCell(tRowIdx, 32).value = col.ex31;
                    tRowIdx += 1;
                });

                if (tInput1.IS_PRICE !== '1') {
                    // include price가 꺼져있으면 가격과 관련된 필드 지움

                    const columnsToDelete = [27, 26, 25, 22];

                    for (let col of columnsToDelete) {
                        sheet.spliceColumns(col, 1);
                    }
                }

                // 가이드라인 안보이게
                wb.worksheets.forEach((sheet, index) => {
                    console.log(
                        `Index: ${index}, Position: ${index + 1}, Name: ${sheet.name}`,
                    );

                    // views 설정
                    if (!sheet.views || sheet.views.length === 0) {
                        sheet.views = [
                            {
                                showGridLines: false,
                            },
                        ];
                    } else {
                        sheet.views[0].showGridLines = false;
                    }

                    // properties에도 한번 더 적용
                    sheet.properties.defaultGridlines = false;
                });

                return await upload(
                    `제품기준MRP-${tStyleName.replaceAll('/', '-')}-${tRetDate}.xlsx`,
                    wb,
                );
            } catch (error) {
                var tRetArray: any[] = [];
                let tObj = {
                    id: 0,
                    CODE: 'ERROR: ' + error.message,
                };

                console.log(error.message);

                tRetArray.push(tObj);
                return tRetArray;
            }
        },
    },
};

export default moduleQuery_S0202_STYLE_COST_TBL_KCD_STYLE;
