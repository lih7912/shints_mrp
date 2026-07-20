import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');
const Excel = require('exceljs');
const { upload } = require('../../../routes/s3');
import axios from 'axios';

const moment = require('moment');

// export default로 Query 내용 내보내기
const moduleQuery_S0205_4_1 = {
    Query: {
        mgrQueryS0205_EXCEL_PI_PRINT: async (_, args, contextValue) => {
            var tSQL = '';

            try {
                var tSQL = '';
                var tRetDate = AFLib.getCurrTime();
                var tRetDate1 = tRetDate.substring(0, 8);
                var tUserInfo: any = AFLib.getUserInfo(contextValue);

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

                var tTemplateExcel = `${tPath0}/Proforma Invoice.xlsx`;

                const wb = new Excel.Workbook();
                await wb.xlsx.readFile(tTemplateExcel);

                var tSheetName = `MAIN ORDER`;
                const sheet = wb.getWorksheet(tSheetName);

                var tContractNo = `Contract No. : ${args.data.PI_CD}`;
                sheet.getCell(5, 2).value = tContractNo;
                sheet.getCell(5, 10).value =
                    `Date: ${moment(tRetDate1, 'YYYYMMDD').format('YYYY-MM-DD')}`;

                let sqlStr = `
                    select
                        *
                    from
                        ksv_order_pimst
                    where
                        pi_cd = '${args.data.PI_CD}'
                `;
                var tRet: any[] = await prisma.$queryRaw(Prisma.raw(sqlStr));

                let tBuyerCd = '';

                if (tRet[0].BUYER_CD) tBuyerCd = tRet[0].BUYER_CD;
                else tBuyerCd = args.data.PI_CD.slice(0, 2);

                let sqlStr1 = `
                    select
                        a.*,
                        b.nat_name,
                        c.cd_name as PAY_RULE_N
                    from
                        kcd_buyer a
                        left join kcd_code c on a.pay_rule = c.cd_code
                        and c.cd_group = 'pay_rule',
                        kcd_nation b
                    where
                        a.buyer_cd = '${tBuyerCd}'
                        and a.nat_cd = b.nat_cd
                `;
                var tRet1: any[] = await prisma.$queryRaw(Prisma.raw(sqlStr1));

                var tBuyerName = tRet1[0].BUYER_NAME;
                var tPresentName = tRet1[0].BUYER_ABBR;
                var tCompany = `${tBuyerName} / Mr. ${tPresentName}`;
                sheet.getCell(7, 3).value = tCompany;

                var tAddr = tRet1[0].ADDR1;
                var tNatName = tRet1[0].nat_name;
                sheet.getCell(8, 3).value = tCompany;
                sheet.getCell(9, 3).value = tAddr;
                sheet.getCell(10, 3).value = tNatName;

                var tNatCode = '+82';
                var tPhoneNo = tRet1[0].TEL_NO;
                var tFaxNo = tRet1[0].FAX_NO;
                // var tPhoneInfo = `Phone: +${tNatCode} (0) ${6102 7999 120 / Fax: +49 (0) 6102 7999 292`;
                //var tPhoneInfo = `Phone: +${tNatCode} (0) ${tPhoneNo} / Fax: +${tNatCode} (0) ${tFaxNo}`;
                var tPhoneInfo = `Phone: ${tPhoneNo} / Fax: ${tFaxNo}`;
                sheet.getCell(11, 3).value = tPhoneInfo;

                //
                let sqlStr2 = `
                    select
                        isnull(c.PO_CD, '') as PO_CD,
                        a.ORDER_CD,
                        d.STYLE_NAME,
                        -- b.TOT_CNT,
                        a.QTY as TOT_CNT,
                        'PCS' as UNIT,
                        b.USD_PRICE,
                        -- (b.USD_PRICE * b.TOT_CNT) as ORDER_AMT,
                        (b.USD_PRICE * a.QTY) as ORDER_AMT,
                        b.CURR_CD,
                        b.DUE_DATE as EX_FACTORY_DATE,
                        b.PRICE_TERM
                    from
                        ksv_order_pimem a
                        left join ksv_po_mem c on a.order_cd = c.order_cd
                        and c.po_seq = 1,
                        ksv_order_mst b,
                        kcd_style d
                    where
                        a.pi_cd = '${args.data.PI_CD}'
                        and b.style_cd = d.style_cd
                        and a.order_cd = b.order_cd
                `;
                var tOrders = await prisma.$queryRaw(Prisma.raw(sqlStr2));
                var tRowIdx = 15;
                var tTotAmt = 0;
                var tTotQty = 0;
                var tUnit = 0;
                var tPriceTerm = '';

                sheet.pageSetup = {
                    fitToPage: true, // 모든 데이터를 한 페이지에 맞춤
                    fitToWidth: 1, // 한 페이지 너비에 맞춤
                    fitToHeight: 1, // 한 페이지 높이에 맞춤
                    orientation: 'landscape', // 가로 방향 (옵션)
                    paperSize: 9, // A4 용지 크기 (옵션)
                };

                tOrders.forEach((col, i) => {
                    sheet.getCell(tRowIdx, 2).value = col.PO_CD;
                    sheet.getCell(tRowIdx, 3).value = col.ORDER_CD;
                    sheet.getCell(tRowIdx, 4).value = col.STYLE_NAME;
                    sheet.getCell(tRowIdx, 5).value = col.TOT_CNT;
                    sheet.getCell(tRowIdx, 6).value = col.UNIT;
                    sheet.getCell(tRowIdx, 7).value = col.USD_PRICE;
                    sheet.getCell(tRowIdx, 8).value = col.ORDER_AMT;
                    sheet.getCell(tRowIdx, 9).value = col.CURR_CD;
                    sheet.getCell(tRowIdx, 10).value = col.EX_FACTORY_DATE
                        ? moment(col.EX_FACTORY_DATE, 'YYYYMMDD').format(
                              'YYYY-MM-DD',
                          )
                        : '';
                    tTotAmt += parseFloat(col.ORDER_AMT);
                    tTotQty += parseFloat(col.TOT_CNT);
                    tUnit = col.UNIT;
                    tPriceTerm = col.PRICE_TERM;

                    for (let colIndex = 2; colIndex <= 10; colIndex++) {
                        let borderStyle = {
                            top: { style: 'thin' }, // 위쪽 실선
                            bottom: { style: 'thin' }, // 아래쪽 실선
                            left: { style: 'thin' }, // 왼쪽 실선 (기본)
                            right: { style: 'thin' }, // 오른쪽 실선 (기본)
                        };

                        // 맨 왼쪽 (첫 열)
                        if (colIndex === 2) {
                            borderStyle.left = { style: 'double' }; // 두 줄 실선
                        }

                        // 맨 오른쪽 (마지막 열)
                        if (colIndex === 10) {
                            borderStyle.right = { style: 'double' }; // 두 줄 실선
                        }

                        sheet.getCell(tRowIdx, colIndex).border = borderStyle;
                    }

                    var tmpRow = sheet.getRow(tRowIdx);
                    tRowIdx += 1;
                    sheet.insertRow(tRowIdx, tmpRow, 'i');
                });
                tRowIdx += 3;
                // if (tRowIdx < 16) tRowIdx = 16;

                sheet.getCell(tRowIdx, 5).value = tTotQty;
                sheet.getCell(tRowIdx, 6).value = tTotQty ? tUnit : '';
                sheet.getCell(tRowIdx, 8).value = tTotAmt;

                tRowIdx += 2;
                sheet.getCell(tRowIdx, 4).value = tPriceTerm
                    ? tPriceTerm
                    : 'FOB';
                tRowIdx += 1;
                // var tPayTerm = tRet1[0].PAY_RULE;
                var tPayTerm = tRet1[0].PAY_RULE_N;
                sheet.getCell(tRowIdx, 4).value = tPayTerm;
                tRowIdx += 1;
                var tCO = tRet[0].PI_REMARK4;
                sheet.getCell(tRowIdx, 4).value = tCO;
                tRowIdx += 1;
                var tLoadingPort = tRet[0].PORT;
                sheet.getCell(tRowIdx, 4).value = tLoadingPort;
                tRowIdx += 1;
                var tDestination = tRet[0].DESTINATION;
                sheet.getCell(tRowIdx, 4).value = tDestination;
                tRowIdx += 1;

                if (tRet[0].PI_REMARK1 !== '50') {
                    var tTorance = '';
                    let sqlStr3_1 = `
                        select
                            *
                        from
                            kcd_code
                        where
                            cd_code = '${tRet[0].PI_REMARK1.replace(/'/g, "''")}'
                            and cd_group = 'PI_REMARK'
                    `;
                    var tRet3_1 = await prisma.$queryRaw(Prisma.raw(sqlStr3_1));
                    if (tRet3_1.length > 0) {
                        tTorance = tRet3_1[0].CD_NAME;
                    }
                    sheet.getCell(tRowIdx, 4).value = tTorance;
                    tRowIdx += 1;
                } else {
                    var tTorance = tRet[0].PI_REMARK8;
                    sheet.getCell(tRowIdx, 4).value = tTorance;
                    tRowIdx += 1;
                }

                var tPartShip = '';
                if (tRet[0].PI_REMARK2 === 'Y') tPartShip = 'allowed';
                else tPartShip = 'not allowed';
                sheet.getCell(tRowIdx, 4).value = tPartShip;
                tRowIdx += 1;
                var tTransShip = '';
                if (tRet[0].PI_REMARK3 === 'Y') tTransShip = 'allowed';
                else tTransShip = 'not allowed';
                sheet.getCell(tRowIdx, 4).value = tTransShip;
                tRowIdx += 1;

                if (tRet1[0].BANK_CD === '') {
                    var tRetArray: any[] = [];
                    var tObj = {
                        id: 0,
                        CODE: 'ERROR:Buyer에 Bank정보가 등록되어 있지 않습니다',
                    };

                    tRetArray.push(tObj);
                    return tRetArray;
                }

                let sqlStr4 = `
                    select
                        *
                    from
                        kcd_bank
                    where
                        bank_cd = '${tRet1[0].BANK_CD}'
                `;
                var tRet4 = await prisma.$queryRaw(Prisma.raw(sqlStr4));
                if (tRet4.length <= 0) {
                    var tRetArray: any[] = [];
                    var tObj = {
                        id: 0,
                        CODE: 'ERROR:없는 Bank입니다. Bank정보를 확인하세요',
                    };

                    tRetArray.push(tObj);
                    return tRetArray;
                }

                tRowIdx += 3;
                sheet.getCell(tRowIdx++, 4).value =
                    `${tRet4[0].BANK_NAME}, ${tRet4[0].BRANCH_NAME || ''}`;
                sheet.getCell(tRowIdx++, 4).value = tRet4[0].ADDR1;
                // sheet.getCell(tRowIdx++, 4).value = tRet4[0].ADDR2 || '';
                tRowIdx += 2;
                sheet.getCell(tRowIdx, 4).value = tRet4[0].ACCOUNT_NAME;
                sheet.getCell(tRowIdx++, 4).value = tRet4[0].ACCOUNT_NO;
                sheet.getCell(tRowIdx++, 4).value = tRet4[0].SFTCODE || '';

                return await upload(
                    `Proforma-Invoice-${args.data.PI_CD}-${tUserInfo.USER_ID}-${tRetDate}.xlsx`,
                    wb,
                );
            } catch (error) {
                var tRetArray: any[] = [];
                var tObj = {
                    id: 0,
                    CODE: 'ERROR: ' + error.message,
                };

                tRetArray.push(tObj);
                return tRetArray;
            }
        },

        mgrQueryS0205_4_1: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }
            let sqlStr = `
                select
                    C.*,
                    isnull(c1.PO_CD, '') as PO_CD,
                    c2.BUYER_NAME
                from
                    (
                        SELECT
                            isnull(A.REF_ORDER_NO, '') as REF_ORDER_NO,
                            A.ORDER_CD,
                            B.STYLE_NAME,
                            B.STYLE_CD,
                            (A.TOT_CNT - A.ADD_CNT) as TOT_CNT,
                            A.AVR_PRICE,
                            (A.AVR_PRICE * (A.TOT_CNT - A.ADD_CNT)) AS AMT,
                            A.CURR_CD,
                            A.DUE_DATE,
                            isnull(A.PRICE_TERM, '') as PRICE_TERM,
                            isnull(B.STYLE_UNIT, '') as UNIT
                        FROM
                            KSV_ORDER_MST A,
                            KCD_STYLE B
                            -- WHERE (A.PI_CD = '${args.data.PI_CD}'
                            --  OR 
                            --     A.ORDER_CD in (select distinct order_cd from ksv_order_pimem where pi_cd = '${args.data.PI_CD}'))
                        WHERE
                            A.ORDER_CD in (
                                select distinct
                                    order_cd
                                from
                                    ksv_order_pimem
                                where
                                    pi_cd = '${args.data.PI_CD}'
                            )
                            AND A.STYLE_CD = B.STYLE_CD
                    ) C
                    left join ksv_po_mem c1 on c1.order_cd = C.order_cd
                    and c1.po_seq = 1
                    left join kcd_buyer c2 on c2.buyer_cd = left(C.order_cd, 2)
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                REF_ORDER_NO: '',
                ORDER_CD: '',
                STYLE_NAME: '',
                TOT_CNT: 0,
                UNIT: '',
                PRICE_TERM: '',
                AVR_PRICE: 0,
                AMT: 0,
                CURR_CD: '',
                DUE_DATE: '',
                ETC99: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
        mgrQueryS0205_4_2: async (_, args) => {
            var tSQL = '';
            args.data.ORDER_CD.forEach((col, i) => {
                if (i === 0) tSQL += `'${col}'`;
                else tSQL += `, '${col}'`;
            });

            let sqlStr = `
                select
                    C.*
                from
                    (
                        SELECT
                            B1.*,
                            isnull(B2.ORDER_CD, '') as ORDER_CD2,
                            isnull(c1.PO_CD, '') as PO_CD,
                            c2.BUYER_NAME
                        FROM
                            (
                                SELECT
                                    isnull(A.REF_ORDER_NO, '') as REF_ORDER_NO,
                                    A.ORDER_CD,
                                    B.STYLE_NAME,
                                    B.STYLE_CD,
                                    (A.TOT_CNT - A.ADD_CNT) as TOT_CNT,
                                    A.AVR_PRICE,
                                    (A.AVR_PRICE * (A.TOT_CNT - A.ADD_CNT)) AS AMT,
                                    A.CURR_CD,
                                    A.DUE_DATE,
                                    isnull(C2.NAT_NAME, '') as NAT_NAME,
                                    isnull(A.PRICE_TERM, '') as PRICE_TERM,
                                    isnull(B.STYLE_UNIT, '') as UNIT
                                FROM
                                    KSV_ORDER_MST A
                                    left join kcd_nation C2 on C2.NAT_CD = A.NAT_CD,
                                    KCD_STYLE B
                                WHERE
                                    A.STYLE_CD = B.STYLE_CD
                                    AND A.ORDER_CD in (${tSQL})
                                    AND ORDER_TYPE in ('0', '1')
                            ) B1
                            left join ksv_order_pimem B2 on B1.ORDER_CD = B2.ORDER_CD
                            left join ksv_po_mem c1 on c1.order_cd = B1.ORDER_CD
                            and c1.po_seq = 1
                            left join kcd_buyer c2 on c2.buyer_cd = left(B1.order_cd, 2)
                    ) C
                where
                    C.ORDER_CD2 = ''
                order by
                    C.ORDER_CD desc
                    -- offset 0 rows fetch next 1000 rows only
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                REF_ORDER_NO: '',
                ORDER_CD: '',
                STYLE_NAME: '',
                TOT_CNT: 0,
                UNIT: '',
                PRICE_TERM: '',
                AVR_PRICE: 0,
                AMT: 0,
                CURR_CD: '',
                DUE_DATE: '',
                ETC99: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
        mgrQueryS0205_4_3: async (_, args) => {
            var tSQL = '';
            args.data.ORDER_CD.forEach((col, i) => {
                if (i === 0) tSQL += `'${col}'`;
                else tSQL += `, '${col}'`;
            });

            let sqlStr = `
                select
                    C.*
                from
                    (
                        SELECT
                            B1.*,
                            isnull(B2.ORDER_CD, '') as ORDER_CD2,
                            isnull(c1.PO_CD, '') as PO_CD,
                            c2.BUYER_NAME
                        FROM
                            (
                                SELECT
                                    isnull(A.REF_ORDER_NO, '') as REF_ORDER_NO,
                                    A.ORDER_CD,
                                    B.STYLE_NAME,
                                    B.STYLE_CD,
                                    (A.TOT_CNT - A.ADD_CNT) as TOT_CNT,
                                    A.AVR_PRICE,
                                    (A.AVR_PRICE * (A.TOT_CNT - A.ADD_CNT)) AS AMT,
                                    A.CURR_CD,
                                    A.DUE_DATE,
                                    isnull(A.PRICE_TERM, '') as PRICE_TERM,
                                    isnull(B.STYLE_UNIT, '') as UNIT
                                FROM
                                    KSV_ORDER_MST A,
                                    KCD_STYLE B
                                WHERE
                                    A.STYLE_CD = B.STYLE_CD
                                    AND A.ORDER_STATUS in ('0', '1', '2', '3', '5', '6', '7', '9', '8')
                                    AND left(A.ORDER_CD, 2) = '${args.data.BUYER_CD.substring(0, 2)}'
                                    AND A.ORDER_CD like '%${args.data.BUYER_CD}%'
                                    AND A.ORDER_CD not in (${tSQL})
                                    AND ORDER_TYPE in ('0', '1')
                                    AND (
                                        A.PI_CD is null
                                        or A.PI_CD = ''
                                    )
                            ) B1
                            left join ksv_order_pimem B2 on B1.ORDER_CD = B2.ORDER_CD
                            left join ksv_po_mem c1 on c1.order_cd = B1.ORDER_CD
                            and c1.po_seq = 1
                            left join kcd_buyer c2 on c2.buyer_cd = left(B1.order_cd, 2)
                    ) C
                where
                    C.ORDER_CD2 = ''
                order by
                    C.ORDER_CD desc
                    -- offset 0 rows fetch next 1000 rows only
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                REF_ORDER_NO: '',
                ORDER_CD: '',
                STYLE_NAME: '',
                TOT_CNT: 0,
                UNIT: '',
                PRICE_TERM: '',
                AVR_PRICE: 0,
                AMT: 0,
                CURR_CD: '',
                DUE_DATE: '',
                ETC99: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S0205_4_1;
