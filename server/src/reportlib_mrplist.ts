import { Prisma } from '@prisma/client';
import prisma from './db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from './commlib'; //PrismaClient 사용하기 위해 불러오기
import AFLib2 from './po_adjust'; //PrismaClient 사용하기 위해 불러오기
const Excel = require('exceljs');
const {
    generateUploadURL,
    deleteUploadObject,
    upload,
} = require('../routes/s3');
const { MongoClient } = require('mongodb');

const moment = require('moment');

function makeBatchFilesResponse(uploadResult) {
    const code = String((uploadResult && uploadResult[0] && uploadResult[0].CODE) || '');
    if (!code.startsWith('SUCCEED:?')) {
        return uploadResult;
    }

    const parts = code.split('?');
    const fileName = parts[1] || '';
    const fileUrl = parts[2] || '';

    if (!fileName || !fileUrl) {
        return uploadResult;
    }

    const encodedFiles = Buffer.from(
        JSON.stringify([
            {
                NAME: fileName,
                URL: fileUrl,
            },
        ]),
        'utf8',
    ).toString('base64');

    return [{ id: 0, CODE: `SUCCESS:BATCH_FILES:${encodedFiles}` }];
}

class RPT_S030513_QRY_COMM {
    async REPORT_MRP_LIST(args0, contextValue, argOrderCds) {
        var args = {
            ...args0,
        };
        var tInput = {
            ...args.data,
        };
        var tUserInfo = AFLib.getUserInfo(contextValue);

        let sql00 = `
            select
                max(po_seq) as last_po_seq
            from
                ksv_po_mst
            where
                po_cd = '${args.data.PO_CD}'
                and po_seq < 97
        `;
        var tRet_sql00 = await prisma.$queryRaw(Prisma.raw(sql00));
        var last_po_seq = tRet_sql00[0].last_po_seq;

        let sql20 = `
            update ksv_po_mst
            set
                work_status = 'WORKING MRPLIST'
            where
                po_cd = '${args.data.PO_CD}'
        `;
        var tRet20 = await prisma.$queryRaw(Prisma.raw(sql20));

        console.log('REPORT_MRP_LIST step-1');

        var tIdx999 = 0;
        var argOrderCd = '';
        for (tIdx999 = 0; tIdx999 < argOrderCds.length; tIdx999++) {
            var argOrderCd = argOrderCds[tIdx999];

            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tIdx0 = 0;

            // var tWExcelFile = `Partial List-${tUserInfo.USER_ID}-${tRetDate1}`;
            var tWExcelFile = '';
            var tRetExcelFile = '';

            if (args.data.MRP_BY_STYLE === '1') {
                let sql1 = `
                  exec kspPoMrpNetProduct '${args.data.PO_CD}',  '${tUserInfo.USER_ID}'
                   `;
                var tRet_sql1 = await prisma.$queryRaw(Prisma.raw(sql1));
            }

            if (args.data.MRP_BY_ORDER === '1') {
                // if (args.data.PO_SEQ === '') {
                if (args.data.PO_SEQ !== 'temp') {
                    let sql1 = `
                      exec kspPoMrpNetTemp '${args.data.PO_CD}',  '${tUserInfo.USER_ID}'
                       `;
                    var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));

                    let sql2 = `
                        select distinct
                            a.order_cd
                        from
                            ksv_po_mem a
                        where
                            a.po_cd = '${args.data.PO_CD}'
                            and a.order_cd = '${argOrderCd}'
                    `;
                    var tRet2 = await prisma.$queryRaw(Prisma.raw(sql2));
                    var tIdx = 0;
                    for (tIdx = 0; tIdx < tRet2.length; tIdx++) {
                        var tOne = {
                            ...tRet2[tIdx],
                        };
                        if (tOne.order_cd.substring(5, 6) === 'C') {
                            let sql11 = `
                                select
                                    a.order_cd
                                from
                                    ksv_order_mst a,
                                    ksv_po_mem b
                                where
                                    b.po_cd = '${args.data.PO_CD}'
                                    and left(a.order_cd, 10) = b.order_cd
                                    and a.order_cd like '${tOne.order_cd}-%'
                                    and b.po_seq = '1'
                                order by
                                    1
                            `;
                            var tRet_sql11 = await prisma.$queryRaw(
                                Prisma.raw(sql11),
                            );
                            if (tRet_sql11.length <= 0) {
                                let sql1 = `
                                  exec kspPoMrpNetTempZip '${args.data.PO_CD}', '${tUserInfo.USER_ID}', '${tOne.order_cd}' 
                              `;
                                var sql1 = await prisma.$queryRaw(
                                    Prisma.raw(sql1),
                                );
                            } else {
                                var tIdx1 = 0;
                                for (
                                    tIdx1 = 0;
                                    tIdx1 < tRet_sql11.length;
                                    tIdx1++
                                ) {
                                    var tOne1 = tRet_sql11[tIdx1];
                                    let sql1 = `
                                        exec kspPoMrpNetTempZipComb '${args.data.PO_CD}','${tUserInfo.USER_ID}','${tOne1.order_cd}'
                                  `;
                                    var sql1 = await prisma.$queryRaw(
                                        Prisma.raw(sql1),
                                    );
                                }
                            }
                        } else {
                            let sql1 = `
                              exec kspPoMrpNetTempZip '${args.data.PO_CD}', '${tUserInfo.USER_ID}', '${tOne.order_cd}' 
                          `;
                            var sql1 = await prisma.$queryRaw(Prisma.raw(sql1));
                        }
                    }
                } else {
                    // 에러 수정할것 : args.data.PO_SEQ는 po_seq가 아니 order_mrp_seq임
                    let sql1 = `
                          exec kspPoMrpNetTempSeq '${args.data.PO_CD}','${tUserInfo.USER_ID}','${args.data.PO_SEQ}'
                       `;
                    var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                }
            }

            let sql40 = `
               exec kspPoMrpTemp '${args.data.PO_CD}',  '${tUserInfo.USER_ID}'
                `;
            var tRet40 = await prisma.$queryRaw(Prisma.raw(sql40));

            try {
                var tOrderCd = argOrderCd;
                // Excel Read
                var tPath0 = '';
                var tCols0 = __dirname.split('/');
                var tFlag0 = 0;
                tCols0.forEach((col999, i) => {
                    if (col999 !== '') {
                        if (col999 === 'src') {
                            tPath0 += '/upload/excel_template';
                            tFlag0 = 1;
                        }
                        if (tFlag0 === 0) {
                            tPath0 += '/' + col999;
                        }
                    }
                });

                var tTemplateName = '';
                var tFileName = '';
                if (args.data.WITHOUT_PRICE === '1') {
                    if (args.data.LOCAL_WORD === '1') {
                        tTemplateName = 'PO_MRP2_BVT';
                    } else {
                        tTemplateName = 'PO_MRP2';
                    }
                    tFileName = 'MRP2';
                } else {
                    if (args.data.LOCAL_WORD === '1') {
                        tTemplateName = 'PO_MRP_BVT';
                    } else {
                        tTemplateName = 'PO_MRP';
                    }
                    tFileName = 'MRP';
                }

                let sql4 = `
                    select
                        e.style_name
                    from
                        ksv_order_mst a,
                        kcd_style e
                    where
                        a.order_cd = '${tOrderCd}'
                        and e.style_cd = a.style_cd
                `;
                var tRet4 = await prisma.$queryRaw(Prisma.raw(sql4));
                var tStyleName = tRet4[0].style_name;
                var tStyleName_org = tStyleName;
                tStyleName = tStyleName.replace(/ /gi, '_');
                tStyleName = tStyleName.replace(/\//gi, '_');
                tStyleName = tStyleName.replace(/\*/gi, '_');
                tStyleName = tStyleName.replace(/;/gi, '_');

                var tTemplateExcel = `${tPath0}/${tTemplateName}.xlsx`;
                if (args.data.MRP_BY_STYLE === '1')
                    tWExcelFile = `${tOrderCd}-${tStyleName}-${moment().format('YYYYMMDDHHmmss')}P`;
                else if (args.data.MRP_BY_ORDER === '1')
                    tWExcelFile = `${tOrderCd}-${tStyleName}-${moment().format('YYYYMMDDHHmmss')}M`;
                else
                    tWExcelFile = `${tOrderCd}-${tStyleName}-${moment().format('YYYYMMDDHHmmss')}`;

                const wb = new Excel.Workbook();
                await wb.xlsx.readFile(tTemplateExcel);

                console.log(`Excel-1:${tTemplateExcel}`);

                var sheet = wb.getWorksheet(`MRPByOrder`);
                var tRowIdx = 10;
                console.log(`Excel-2:${tTemplateExcel}`);

                sheet.getCell(1, 1).value = args.data.PO_CD;
                console.log(`Excel-3:${tTemplateExcel}`);

                // 그리드 라인 숨김
                if (sheet.views && sheet.views.length > 0) {
                    sheet.views[0].showGridLines = false;
                }

                if (args.data.MRP_BY_STYLE === '1')
                    sheet.getCell(1, 13).value =
                        `${tOrderCd}(제품기준으로 작성)`;
                else if (args.data.MRP_BY_ORDER === '1')
                    sheet.getCell(1, 13).value =
                        `${tOrderCd}(MRPByOrder기준으로 작성)`;
                else sheet.getCell(1, 13).value = `${tOrderCd}`;

                let sql4 = `
                    select
                        c.buyer_name,
                        e.style_name,
                        d.factory_name,
                        a.ref_order_no,
                        a.due_date,
                        a.size_group,
                        f.size_cnt
                    from
                        ksv_order_mst a,
                        kcd_buyer c,
                        kcd_factory d,
                        kcd_style e,
                        kcd_size_mst f
                    where
                        a.order_cd = '${tOrderCd}'
                        and c.buyer_cd = left(a.order_cd, 2)
                        and d.factory_cd = a.factory_cd
                        and e.style_cd = a.style_cd
                        and f.size_group = a.size_group
                `;
                var tRet4 = await prisma.$queryRaw(Prisma.raw(sql4));
                var tOrderInfo = {
                    ...tRet4[0],
                };

                sheet.getCell(2, 20).value = tOrderInfo.buyer_name;
                sheet.getCell(2, 13).value = tOrderInfo.style_name;
                sheet.getCell(2, 24).value = tOrderInfo.factory_name;
                sheet.getCell(1, 16).value = tOrderInfo.ref_order_no;
                sheet.getCell(1, 20).value = moment(
                    tOrderInfo.due_date,
                    'YYYYMMDD',
                ).format('YYYY-MM-DD');
                sheet.getCell(1, 24).value = moment(
                    tRetDate1,
                    'YYYYMMDD',
                ).format('YYYY-MM-DD');

                var tSizeGroup = tOrderInfo.size_group.replace(/'/g, "''");
                tSizeGroup = tOrderInfo.size_group.replace(/\[/, '[[');

                var tHeader = AFLib.printF_Space(' ', 3, 'L');
                tHeader += AFLib.printF_Space('SEQ', 5, 'L');
                tHeader += AFLib.printF_Space('COLOR', 30, 'L');
                tHeader += AFLib.printF_Space('QTY', 10, 'L');

                let sql4 = `
                    select
                        size_val
                    from
                        kcd_size_mem
                    where
                        size_group like '${tSizeGroup}' escape '['
                    order by
                        size_seq
                `;
                var tRet4 = await prisma.$queryRaw(Prisma.raw(sql4));

                var tProdCnt = [];
                tRet4.forEach((col, i) => {
                    tHeader += AFLib.printF_Space(col.size_val, 5, 'L');
                    tProdCnt.push(0);
                });
                sheet.mergeCells('M4:AC4');
                sheet.getCell(4, 13).value = tHeader;
                sheet.getCell(4, 13).font = {
                    name: 'DotumChe',
                    family: 4,
                    size: 10,
                    underline: false,
                };
                sheet.getCell(4, 13).alignment = {
                    vertical: 'bottom',
                    horizontal: 'left',
                };

                let sql5 = `
                    select
                        a.size_cnt,
                        b.color,
                        b.prod_cd,
                        a.add_flag
                    from
                        ksv_order_mem a,
                        ksv_prod_mst b
                    where
                        a.order_cd = '${tOrderCd}'
                        and b.prod_cd = a.prod_cd
                    order by
                        b.color
                `;
                var tRet5 = await prisma.$queryRaw(Prisma.raw(sql5));
                var tColSeq = 0;
                var tRowIdx = 5;
                var tSumTotCnt = 0;

                tRet5.forEach((col, i) => {
                    var tmpRow = [];
                    tmpRow[13] = 0;
                    tmpRow[14] = '';
                    tmpRow[15] = 0;
                    sheet.insertRow(tRowIdx, tmpRow, 'i');

                    var tIdx2 = 0;
                    var tTotCnt = 0;
                    for (tIdx2 = 0; tIdx2 < tRet4.length; tIdx2++) {
                        var tSizeCnt = parseFloat(
                            col.size_cnt.substring(6 * tIdx2, 6 * (tIdx2 + 1)),
                        );
                        tTotCnt += tSizeCnt;
                        tProdCnt[tIdx2] += tSizeCnt;
                    }

                    var tData = AFLib.printF_Space(col.add_flag, 3, 'L');
                    tData += AFLib.printF_Space(i + 1, 5, 'L');
                    tData += AFLib.printF_Space(col.color, 30, 'L');
                    tData += AFLib.printF_Space(tTotCnt, 10, 'L');
                    tIdx2 = 0;
                    for (tIdx2 = 0; tIdx2 < tRet4.length; tIdx2++) {
                        var tSizeCnt = parseFloat(
                            col.size_cnt.substring(6 * tIdx2, 6 * (tIdx2 + 1)),
                        );
                        tData += AFLib.printF_Space(tSizeCnt, 5, 'L');
                    }

                    sheet.mergeCells(`M${tRowIdx}:AC${tRowIdx}`);
                    sheet.getCell(tRowIdx, 13).value = tData;

                    tSumTotCnt += tTotCnt;
                    tRowIdx += 1;
                });

                var tData = AFLib.printF_Space(' ', 3, 'L');
                tData += AFLib.printF_Space(' ', 5, 'L');
                tData += AFLib.printF_Space('Total', 30, 'L');
                tData += AFLib.printF_Space(tSumTotCnt, 10, 'L');

                var tIdx2 = 0;
                for (tIdx2 = 0; tIdx2 < tProdCnt.length; tIdx2++) {
                    tData += AFLib.printF_Space(tProdCnt[tIdx2], 5, 'L');
                }
                sheet.getCell(tRowIdx, 13).value = tData;
                sheet.getCell(tRowIdx, 13).font = {
                    name: 'DotumChe',
                    family: 4,
                    size: 10,
                    underline: false,
                };
                sheet.getCell(tRowIdx, 13).alignment = {
                    vertical: 'bottom',
                    horizontal: 'left',
                };

                tRowIdx += 3;

                let sql5 = '';
                let tRet5 = '';
                if (
                    args.data.MRP_BY_ORDER === '0' &&
                    args.data.MRP_BY_STYLE === '0'
                ) {
                    sql5 = `
                            exec kspPrintMrp0 '${args.data.PO_CD}','${tOrderCd}','${tUserInfo.USER_ID}','${tRetDate1}'
                        `;
                    tRet5 = await prisma.$queryRaw(Prisma.raw(sql5));
                } else {
                    sql5 = `
                            exec kspPrintMrp1 '${args.data.PO_CD}','${tOrderCd}','${tUserInfo.USER_ID}','${tRetDate1}'
                        `;
                    tRet5 = await prisma.$queryRaw(Prisma.raw(sql5));
                }

                let sql6 = `
                    select
                        isnull(max(po_seq), 1) as max_po_seq
                    from
                        ksv_po_mrp
                    where
                        po_cd = '${args.data.PO_CD}'
                        and po_seq > 1
                        and po_seq < 98
                `;
                var tRet6 = await prisma.$queryRaw(Prisma.raw(sql6));
                var tLastPoSeq1 = 0;
                if (tRet6.length > 0) tLastPoSeq1 = tRet6[0].max_po_seq;

                var tRet7 = [];
                let sql7 = `
                    select distinct
                        matl_cd
                    from
                        ksv_po_mrp
                    where
                        po_cd = '${args.data.PO_CD}'
                        and po_seq = '${tLastPoSeq1}'
                `;
                tRet7 = await prisma.$queryRaw(Prisma.raw(sql7));

                let sql8 = `
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
                        ex37,
                        ex34,
                        isnull(b.cus_name, '') as cus_name,
                        isnull(b.cus_code, '') as cus_code,
                        isnull(b.cus_unit, '') as cus_unit
                    from
                        kzz_excel a
                        left outer join KCD_MATL_PUR b on (a.ex01 = b.matl_cd)
                    where
                        user_id = '${tUserInfo.USER_ID}'
                        and ex_type = 'M'
                    order by
                        ex_seq
                `;
                var tRet8 = await prisma.$queryRaw(Prisma.raw(sql8));

                if (args.data.LOCAL_WORD === '1') {
                    if (args.data.WITHOUT_PRICE === '0') {
                        sheet.getCell(tRowIdx - 1, 32).value = 'Usd Price';
                        sheet.getCell(tRowIdx - 1, 33).value = 'Kind2';
                    } else {
                        sheet.getCell(tRowIdx - 1, 26).value = 'Kind2';
                        sheet.getCell(tRowIdx - 1, 27).value = 'Vendor';
                    }
                } else {
                    if (args.data.WITHOUT_PRICE === '0') {
                        //sheet.getCell(tRowIdx-1, 31).value = 'Usd Price';
                        //sheet.getCell(tRowIdx-1, 32).value = 'Kind2';
                    } else {
                        sheet.getCell(tRowIdx - 1, 25).value = 'Kind2';
                    }
                }

                tRet8.forEach((col, i) => {
                    var tUseCheck = col.ex29;
                    var tNatName = col.ex35;
                    var tMalType2 = col.ex37;
                    var tMatlCd = col.ex01;
                    var j = 1;
                    sheet.getCell(tRowIdx, j++).value = col.ex00; // No
                    sheet.getCell(tRowIdx, j++).value = col.ex01; // Matl_Code
                    sheet.getCell(tRowIdx, j++).value = col.ex02; // Star-1
                    sheet.getCell(tRowIdx, j++).value = col.ex03; // S-2
                    sheet.getCell(tRowIdx, j++).value = col.ex04; // S-3
                    sheet.getCell(tRowIdx, j++).value = col.ex05; // S-4
                    sheet.getCell(tRowIdx, j++).value = col.ex06; // S-5
                    sheet.getCell(tRowIdx, j++).value = col.ex07; // S-6
                    sheet.getCell(tRowIdx, j++).value = col.ex08; // S-7
                    sheet.getCell(tRowIdx, j++).value = col.ex09; // S-8
                    sheet.getCell(tRowIdx, j++).value = col.ex10; // S-9
                    sheet.getCell(tRowIdx, j++).value = col.ex11; // S-10
                    sheet.getCell(tRowIdx, j++).value = col.ex12; // Desc

                    // 주황색 배경 적용 조건 (matl_cd 포함 여부)
                    const isHighlighted = tRet7.some(
                        (row) => row.matl_cd === tMatlCd,
                    );
                    if (isHighlighted) {
                        for (let colIdx = 1; colIdx <= 29; colIdx++) {
                            const cell = sheet.getCell(tRowIdx, colIdx);
                            cell.fill = {
                                type: 'pattern',
                                pattern: 'solid',
                                fgColor: {
                                    argb: 'FFFFE5CC',
                                }, // 주황색
                            };
                        }
                    }

                    if (args.data.LOCAL_WORD === '1') {
                        sheet.getCell(tRowIdx, j++).value = col.ex12; // BVT-Desc
                    }

                    sheet.getCell(tRowIdx, j++).value = col.ex13; // color
                    sheet.getCell(tRowIdx, j++).value = col.ex14.replace(
                        /=/,
                        '',
                    ); // Spec
                    sheet.getCell(tRowIdx, j++).value = col.ex15; // Unit
                    let rawNet = Number(col.ex16);
                    let net = isNaN(rawNet) ? 0 : parseFloat(rawNet.toFixed(4));
                    let netCell = sheet.getCell(tRowIdx, j++);
                    netCell.value = net;
                    netCell.numFmt = '0.0000';
                    sheet.getCell(tRowIdx, j++).value = parseFloat(
                        parseFloat(col.ex17).toFixed(4),
                    ); // Loss
                    sheet.getCell(tRowIdx, j++).value = parseFloat(
                        parseFloat(col.ex18).toFixed(4),
                    ); // Gross
                    sheet.getCell(tRowIdx, j++).value = parseFloat(
                        parseFloat(col.ex19).toFixed(0),
                    ); // Qty

                    let tTotal = parseFloat(col.ex18) * parseFloat(col.ex19);
                    tTotal = Math.ceil(tTotal);
                    let totalCell = sheet.getCell(tRowIdx, j++);
                    totalCell.value = parseFloat(tTotal);

                    // 스타일 적용 (Net이 0일 경우)
                    if (net === 0) {
                        netCell.style = {
                            font: {
                                name: '돋움',
                                size: 10,
                                bold: true,
                                color: {
                                    argb: 'FFFF0000',
                                },
                            }, // 빨간색
                        };
                        netCell.numFmt = '0.0000';

                        totalCell.style = {
                            font: {
                                name: '돋움',
                                size: 10,
                                bold: true,
                                color: {
                                    argb: 'FFFF0000',
                                },
                            }, // 빨간색
                        };
                        totalCell.numFmt = '0';
                    }

                    if (args.data.WITHOUT_PRICE === '1') {
                        sheet.getCell(tRowIdx, j++).value = col.ex23; // Size
                        sheet.getCell(tRowIdx, j++).value = col.ex27; // Usage
                        if (args.data.LOCAL_WORD === '1') {
                            sheet.getCell(tRowIdx, j++).value = col.ex34; // Bvt-Usage
                            sheet.getCell(tRowIdx, j++).value = col.ex28; // Vendor
                            sheet.getCell(tRowIdx, j++).value = col.ex37; // Kind2
                            sheet.getCell(tRowIdx, j++).value = col.cus_name; // CusName
                            sheet.getCell(tRowIdx, j++).value = col.cus_code; // CusCode
                            sheet.getCell(tRowIdx, j++).value = col.cus_unit; // CusUnit
                        } else {
                            sheet.getCell(tRowIdx, j++).value = col.ex28; // Vendor
                            sheet.getCell(tRowIdx, j++).value = col.ex37; // Kind2
                            sheet.getCell(tRowIdx, j++).value = col.cus_name; // CusName
                            sheet.getCell(tRowIdx, j++).value = col.cus_code; // CusCode
                            sheet.getCell(tRowIdx, j++).value = col.cus_unit; // CusUnit
                        }
                    } else {
                        //sheet.getCell(tRowIdx, j++).value = col.ex21; // Price
                        //sheet.getCell(tRowIdx, j++).value = col.ex22;// curr
                        if (args.data.LOCAL_WORD === '1') {
                            sheet.getCell(tRowIdx, j++).value = col.ex21; // Price
                            sheet.getCell(tRowIdx, j++).value = col.ex22; // curr
                            sheet.getCell(tRowIdx, j++).value = col.ex23; // Size
                            sheet.getCell(tRowIdx, j++).value = col.ex24; // Amt
                            sheet.getCell(tRowIdx, j++).value = col.ex25; // Amt(S)
                            sheet.getCell(tRowIdx, j++).value = col.ex26; // Amt($/Unit)
                            sheet.getCell(tRowIdx, j++).value = col.ex27; // Usage
                            sheet.getCell(tRowIdx, j++).value = col.ex34; // Bvt Remark
                            sheet.getCell(tRowIdx, j++).value = col.ex28; // Vendor
                            sheet.getCell(tRowIdx, j++).value = col.ex36; // Usd-Price
                            sheet.getCell(tRowIdx, j++).value = col.ex37; // Kind2
                            sheet.getCell(tRowIdx, j++).value = col.cus_name; // CusName
                            sheet.getCell(tRowIdx, j++).value = col.cus_code; // CusCode
                            sheet.getCell(tRowIdx, j++).value = col.cus_unit; // CusUnit
                        } else {
                            sheet.getCell(tRowIdx, j++).value = col.ex23; // Size
                            sheet.getCell(tRowIdx, j++).value = col.ex27; // Usage
                            sheet.getCell(tRowIdx, j++).value = col.ex28; // Vendor
                            sheet.getCell(tRowIdx, j++).value = col.ex37; // KInd2 (24-37)
                            sheet.getCell(tRowIdx, j++).value = '';
                            sheet.getCell(tRowIdx, j++).value = col.cus_name; // CusName
                            sheet.getCell(tRowIdx, j++).value = col.cus_code; // CusCode
                            sheet.getCell(tRowIdx, j++).value = col.cus_unit; // CusUnit
                        }
                    }

                    if (tRowIdx % 2 === 0) {
                        for (let colIndex = 1; colIndex <= j; colIndex++) {
                            const cell = sheet.getCell(tRowIdx, colIndex);

                            // 기존 배경색이 있는지 체크
                            if (!cell.fill || !cell.fill.fgColor) {
                                cell.fill = {
                                    type: 'pattern',
                                    pattern: 'solid',
                                    fgColor: {
                                        argb: 'FFE6FFFF',
                                    },
                                };
                            }
                        }
                    }
                    tRowIdx += 1;
                });

                tRowIdx += 2;

                //sheet.getCell(tRowIdx, 1).value = '단품발주';

                let sql9 = `
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
                        ex36 as ex29,
                        ex37 as ex30
                    from
                        kzz_excel
                    where
                        user_id = '${tUserInfo.USER_ID}'
                        and ex_type = 'A'
                    order by
                        ex_seq
                `;
                var tRet9 = await prisma.$queryRaw(Prisma.raw(sql9));
                tRet9.forEach((col, i) => {
                    var tUseCheck = col.ex29;
                    var tNatName = col.ex35;
                    var tMalType2 = col.ex37;
                    var tMatlCd = col.ex01;
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
                    sheet.getCell(tRowIdx, 14).value = `'${col.ex13}`;
                    sheet.getCell(tRowIdx, 15).value = col.ex14.replace(
                        /=/,
                        '',
                    );
                    sheet.getCell(tRowIdx, 16).value = col.ex15;
                    sheet.getCell(tRowIdx, 17).value = col.ex16;
                    sheet.getCell(tRowIdx, 18).value = col.ex17;
                    sheet.getCell(tRowIdx, 19).value = col.ex18;
                    sheet.getCell(tRowIdx, 20).value = col.ex19;
                    sheet.getCell(tRowIdx, 21).value = col.ex20;
                    if (args.data.WITHOUT_PRICE === '1') {
                        sheet.getCell(tRowIdx, 22).value = `'${col.ex23}`;
                        sheet.getCell(tRowIdx, 23).value = col.ex27;
                        sheet.getCell(tRowIdx, 24).value = col.ex28;
                        sheet.getCell(tRowIdx, 25).value = col.ex30;
                    } else {
                        sheet.getCell(tRowIdx, 22).value = col.ex21;
                        sheet.getCell(tRowIdx, 23).value = col.ex22;
                        sheet.getCell(tRowIdx, 24).value = `'${col.ex23}`;
                        sheet.getCell(tRowIdx, 25).value = col.ex24;
                        sheet.getCell(tRowIdx, 26).value = col.ex25;
                        sheet.getCell(tRowIdx, 27).value = col.ex26;
                        sheet.getCell(tRowIdx, 28).value = col.ex27;
                        sheet.getCell(tRowIdx, 29).value = col.ex28;
                        sheet.getCell(tRowIdx, 30).value = col.ex29;
                        sheet.getCell(tRowIdx, 31).value = col.ex30;
                    }
                    tRowIdx += 1;
                });
                tRowIdx += 2;

                // Total
                if (args.data.WITHOUT_PRICE !== '1') {
                    var j = 0;
                    if (args.data.LOCAL_WORD === '1') j = 1;
                    sheet.getCell(tRowIdx, 24 + j).value = 'Curr';
                    sheet.getCell(tRowIdx, 25 + j).value = 'Amount';
                    sheet.getCell(tRowIdx, 26 + j).value = 'Rate';
                    sheet.getCell(tRowIdx, 27 + j).value = 'ChgAmount';
                    tRowIdx += 1;

                    let sql91 = `
                        select
                            c.curr_cd,
                            sum(a.use_qty * c.matl_price) as sum1,
                            f.usd_rate,
                            f.won_amt
                        from
                            ksv_po_mrp a,
                            kcd_matl_mem c,
                            kcd_currency f
                        where
                            a.po_cd = '${args.data.PO_CD}'
                            and a.order_cd = '${tOrderCd}'
                            and a.use_po_type = '1'
                            and a.diff_po_type <> '2'
                            and c.matl_cd = a.matl_cd
                            and c.matl_seq = a.matl_seq
                            and f.curr_cd = a.curr_cd
                            and f.start_date = '${args.data.CURR_DATE}'
                        group by
                            c.curr_cd,
                            f.usd_rate,
                            f.won_amt
                        order by
                            c.curr_cd
                    `;

                    var tRet91 = await prisma.$queryRaw(Prisma.raw(sql91));
                    var tDwAmt = 0;

                    tRet91.forEach((col, i) => {
                        sheet.getCell(tRowIdx, 24 + j).value = col.curr_cd;
                        sheet.getCell(tRowIdx, 25 + j).value = col.sum1;
                        sheet.getCell(tRowIdx, 26 + j).value = col.usd_rate;
                        tDwAmt +=
                            parseFloat(col.sum1) * parseFloat(col.usd_rate);
                        sheet.getCell(tRowIdx, 27 + j).value = col.won_amt;
                        tRowIdx += 1;
                    });

                    tRowIdx += 1;
                    sheet.getCell(tRowIdx, 24 + j).value = 'Sum';

                    tRowIdx += 1;
                    sheet.getCell(tRowIdx, 26 + j).value = 'Total';
                    sheet.getCell(tRowIdx, 27 + j).value = 'Price($)';

                    tRowIdx += 1;
                    sheet.getCell(tRowIdx, 26 + j).value = tSumTotCnt;
                    sheet.getCell(tRowIdx, 27 + j).value =
                        tDwAmt / parseFloat(tSumTotCnt);
                }

                // Order List
                var sheet = wb.getWorksheet(`Sheet2`);
                sheet.name = tOrderCd;

                tRowIdx = 1;

                let sqlOrder = `
                    select
                        *
                    from
                        ksv_order_mst
                    where
                        order_cd = '${tOrderCd}'
                `;
                var tRetOrder = await prisma.$queryRaw(Prisma.raw(sqlOrder));
                var tOrderInfo = {};
                if (tRetOrder.length > 0)
                    tOrderInfo = {
                        ...tRetOrder[0],
                    };
                var tIsCombined = 0;
                var tSQL0 = '';
                if (tOrderInfo.ORDER_CD.substring(5, 6) === 'C') {
                    tIsCombined = 1;
                    tSQL0 = `and b.ref_order_no <> 'Combined Order' `;
                }

                let sql10 = `
                    SELECT
                        B.order_cd,
                        E.style_name,
                        F.color,
                        D.size_member,
                        C.size_cnt,
                        C.tot_cnt,
                        c.prod_cd,
                        isnull(c.add_flag, '') as add_flag,
                        g.nat_name,
                        b.ref_order_no
                    FROM
                        KSV_ORDER_MST B,
                        KSV_ORDER_MEM C,
                        KCD_SIZE_MST D,
                        KCD_STYLE E,
                        KSV_PROD_MST F,
                        kcd_nation g
                    WHERE
                        B.ORDER_CD = C.ORDER_CD
                        and B.SIZE_GROUP = D.SIZE_GROUP
                        and B.STYLE_CD = E.STYLE_CD
                        and C.PROD_CD = F.PROD_CD
                        and g.nat_cd = b.nat_cd
                        and b.order_cd like '${tOrderCd}%'
                        -- and B.order_type in ('0', '1')
                        ${tSQL0}
                    ORDER BY
                        B.ORDER_CD,
                        F.COLOR
                `;
                var tRet10 = await prisma.$queryRaw(Prisma.raw(sql10));
                var tOne10 = {
                    ...tRet10[0],
                };

                var tTotalArray = [];
                var tDataArray = [];
                var tCommObj = {};
                tCommObj.order_cd = '';
                tCommObj.style_name = '';
                tCommObj.nat_name = '';
                tCommObj.ref_order_no = '';
                tCommObj.prod_cd = '';
                tCommObj.color = '';
                tCommObj.add_flag = '';
                tCommObj.total = 0;
                tCommObj.size_array = [];

                var tCols = tOne10.size_member.split(',');
                tCols.forEach((col, i) => {
                    var tObj = {};
                    tObj.size = col;
                    tObj.value = 0;
                    tCommObj.size_array.push(tObj);
                });

                var tTotalObj = {
                    ...tCommObj,
                };
                tTotalObj.order_cd = tOrderCd;

                var tDataObj = {
                    ...tCommObj,
                };
                var tStyleName = '';
                tRet10.forEach((col, i) => {
                    var tObj = {
                        ...tDataObj,
                    };
                    tObj.order_cd = col.order_cd;
                    tObj.style_name = col.style_name;
                    tStyleName = col.style_name;
                    tObj.nat_name = col.nat_name;
                    tObj.ref_order_no = col.ref_order_no;
                    tObj.prod_cd = col.prod_cd;
                    tObj.color = col.color;
                    tObj.size_array = [];
                    var tTotal = 0;
                    tCols.forEach((col1, i1) => {
                        var tVal = parseFloat(
                            col.size_cnt.substring(6 * i1, 6 * (i1 + 1)),
                        );
                        tTotal += tVal;
                        tObj.size_array.push(tVal);
                    });
                    tObj.total = tTotal;
                    tDataArray.push(tObj);

                    var tFlag = 0;
                    var tArray10 = [];
                    tTotalArray.forEach((col1, i1) => {
                        var tObj8 = {
                            ...col1,
                        };
                        if (
                            col1.prod_cd === col.prod_cd &&
                            col1.add_flag === col.add_flag
                        ) {
                            var tArray11 = [];
                            tObj8.total = 0;
                            tCols.forEach((col2, i2) => {
                                var tVal = parseFloat(
                                    col.size_cnt.substring(
                                        6 * i2,
                                        6 * (i2 + 1),
                                    ),
                                );
                                var tSaveVal = tObj8.size_array[i2];
                                tSaveVal += tVal;
                                tArray11.push(tSaveVal);
                                tObj8.total += tSaveVal;
                            });
                            tObj8.size_array = [...tArray11];
                            tArray10.push(tObj8);
                            tFlag = 1;
                        } else {
                            tArray10.push(tObj8);
                        }
                    });

                    // TODO: 이 부분 때문에 Combined Order가 아닌것도 Combined Order로 자꾸 출력되요.
                    if (tFlag === 0) {
                        var tObj8 = {};
                        tObj8.order_cd = tOrderCd;
                        tObj8.prod_cd = col.prod_cd;
                        tObj8.add_flag = col.add_flag;
                        tObj8.style_name = '';
                        tObj8.nat_name = '';
                        tObj8.ref_order_no = 'Combined Order';
                        tObj8.color = col.color;
                        tObj8.total = 0;
                        var tArray11 = [];
                        tCols.forEach((col2, i2) => {
                            var tVal = parseFloat(
                                col.size_cnt.substring(6 * i2, 6 * (i2 + 1)),
                            );
                            tArray11.push(tVal);
                            tObj8.total += tVal;
                        });
                        tObj8.size_array = [...tArray11];
                        tTotalArray.push(tObj8);
                    } else {
                        tTotalArray = [...tArray10];
                    }
                });

                tTotalObj.style_name = tStyleName;

                tRowIdx += 1;
                sheet.getCell(tRowIdx, 1).value = 'Order No';
                sheet.getCell(tRowIdx, 3).value = 'Style';
                sheet.getCell(tRowIdx, 5).value = 'Country';
                sheet.getCell(tRowIdx, 6).value = 'Buyer Po';
                sheet.getCell(tRowIdx, 7).value = 'Prod#';
                sheet.getCell(tRowIdx, 8).value = 'Color';
                sheet.getCell(tRowIdx, 10).value = 'Total';
                tCols = tOne10.size_member.split(',');
                tCols.forEach((col, i) => {
                    sheet.getCell(tRowIdx, 11 + i).value = col;
                    sheet.getCell(tRowIdx, 11 + i).fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: {
                            argb: 'FFFF00',
                        }, // 노란색 (ARGB 코드)
                    };
                });

                // 행 전체 배경색 노란색으로 설정
                for (let colIndex = 1; colIndex <= 10; colIndex++) {
                    sheet.getCell(tRowIdx, colIndex).fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: {
                            argb: 'FFFF00',
                        }, // 노란색 (ARGB 코드)
                    };
                }

                tRowIdx += 1;

                var tTotRowIdx = tRowIdx;

                tRowIdx += 1;
                tTotalArray.forEach((col, i) => {
                    sheet.getCell(tRowIdx, 1).value = col.order_cd;
                    sheet.getCell(tRowIdx, 3).value = col.style_name;
                    sheet.getCell(tRowIdx, 5).value = col.nat_name;
                    sheet.getCell(tRowIdx, 6).value = col.ref_order_no;
                    sheet.getCell(tRowIdx, 7).value = col.prod_cd;
                    sheet.getCell(tRowIdx, 8).value = col.color;
                    sheet.getCell(tRowIdx, 10).value = col.total;

                    var tArray9 = [];
                    col.size_array.forEach((col1, i) => {
                        sheet.getCell(tRowIdx, 11 + i).value = parseFloat(col1);

                        var tObj9 = {
                            ...tTotalObj.size_array[i],
                        };
                        tObj9.value += parseFloat(col1);
                        tArray9.push(tObj9);
                    });
                    tTotalObj.size_array = [...tArray9];

                    tRowIdx += 1;
                });

                tDataArray.forEach((col, i) => {
                    sheet.getCell(tRowIdx, 1).value = col.order_cd;
                    sheet.getCell(tRowIdx, 3).value = ''; //col.style_name;
                    sheet.getCell(tRowIdx, 5).value = col.nat_name;
                    sheet.getCell(tRowIdx, 6).value = col.ref_order_no;
                    sheet.getCell(tRowIdx, 7).value = col.prod_cd;
                    sheet.getCell(tRowIdx, 8).value = col.color;
                    sheet.getCell(tRowIdx, 10).value = col.total;
                    col.size_array.forEach((col1, i1) => {
                        sheet.getCell(tRowIdx, 11 + i1).value =
                            parseFloat(col1);
                    });
                    tRowIdx += 1;
                });

                tTotalObj.size_array.forEach((col1, i1) => {
                    tTotalObj.total += parseFloat(col1.value);
                });

                sheet.getCell(tTotRowIdx, 1).value = tTotalObj.order_cd;
                sheet.getCell(tTotRowIdx, 3).value = tTotalObj.style_name;
                sheet.getCell(tTotRowIdx, 5).value = tTotalObj.nat_name;
                sheet.getCell(tTotRowIdx, 6).value = tTotalObj.ref_order_no;
                sheet.getCell(tTotRowIdx, 7).value = tTotalObj.prod_cd;
                sheet.getCell(tTotRowIdx, 8).value = tTotalObj.color;
                sheet.getCell(tTotRowIdx, 10).value = tTotalObj.total;

                // total 배경색 설정
                sheet.getCell(tTotRowIdx, 10).fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: {
                        argb: 'FFE6FFFF',
                    }, // 청록색 (ARGB 코드)
                };

                tTotalObj.size_array.forEach((col1, i) => {
                    sheet.getCell(tTotRowIdx, 11 + i).value = parseFloat(
                        col1.value,
                    );

                    sheet.getCell(tTotRowIdx, 11 + i).fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: {
                            argb: 'FFE6FFFF',
                        }, // 청록색 (ARGB 코드)
                    };
                });

                // 1) 컬럼 삭제 (뒤에서부터: I → D → B)
                sheet.spliceColumns(9, 1); // I(9번째)
                sheet.spliceColumns(4, 1); // D(4번째)
                sheet.spliceColumns(2, 1); // B(2번째)

                sheet.mergeCells('B3:F3');

                const lastRow = sheet.lastRow ? sheet.lastRow.number : 0;
                const lastCol = sheet.columnCount;

                for (let r = 1; r <= lastRow; r++) {
                    for (let c = 1; c <= lastCol; c++) {
                        const cell = sheet.getCell(r, c);
                        cell.border = {
                            top: {
                                style: 'thin',
                            },
                            left: {
                                style: 'thin',
                            },
                            bottom: {
                                style: 'thin',
                            },
                            right: {
                                style: 'thin',
                            },
                        };
                    }
                }

                let pmTag = '';

                if (args.data.MRP_BY_ORDER === '1') {
                    pmTag = 'P';
                } else if (args.data.MRP_BY_STYLE === '1') {
                    pmTag = 'M';
                }

                if (args.data.PO_SEQ === '') {
                    tWExcelFile = `MRPLIST_${args.data.PO_CD}_ALL_${last_po_seq}_${tOrderCd}_${tStyleName}_${moment().format('YYYYMMDDHHmmss')}${pmTag}`;
                } else {
                    tWExcelFile = `MRPLIST_${args.data.PO_CD}_${args.data.PO_SEQ}_${tOrderCd}_${tStyleName}_${moment().format('YYYYMMDDHHmmss')}${pmTag}`;
                }

                var tTitle = '';
                var tFileKey = '';
                if (args.data.PO_SEQ === '') {
                    tTitle = `MRPLIST_${args.data.PO_CD}_${tOrderCd}_ALL_${last_po_seq}`;
                    tFileKey = `${args.data.PO_CD}_ALL`;
                } else {
                    tTitle = `MRPLIST_${args.data.PO_CD}_${tOrderCd}_${args.data.PO_SEQ}`;
                    tFileKey = `${args.data.PO_CD}_${args.data.PO_SEQ}`;
                }

                let sql12 = `
                    delete from kcd_fileinfo
                    where
                        title = '${tTitle}'
                        and file_key = '${tFileKey}'
                        and kind = 'S030513'
                `;

                await prisma.$queryRaw(Prisma.raw(sql12));

                const uploadInfo = await generateUploadURL();
                const uploadURL = uploadInfo.uploadURL;
                const fileURL = uploadURL.split('?')[0];

                var tInObj = {};
                tInObj.NAME = tWExcelFile;
                tInObj.URL = fileURL;
                tInObj.TITLE = tTitle;
                tInObj.FILE_KEY = tFileKey;
                tInObj.KIND = 'S030513';
                var tSql11 = AFLib.createTableSql('KCD_FILEINFO', tInObj);
                await prisma.$queryRaw(Prisma.raw(tSql11));

                const uploadResult = await upload(`${tWExcelFile}.xlsx`, wb, uploadURL);
                return makeBatchFilesResponse(uploadResult);
            } catch (error) {
                console.log(`ERROR:MRP LIST:${error.message}`);

                var tRet4 = await AFLib2.CommonFunc.DeleteMrpWork(
                    tUserInfo.USER_ID,
                    tInput.PO_CD,
                );

                var tRetArray = [];
                var tObj = {};
                tObj.id = 1;
                tObj.CODE = `ERROR:${error.message}`;
                tRetArray.push(tObj);
                return tRetArray;
            }
        }

        var tRet4 = await AFLib2.CommonFunc.DeleteMrpWork(
            tUserInfo.USER_ID,
            tInput.PO_CD,
        );

        var tRetArray = [];
        var tObj = {};
        tObj.id = 1;
        tObj.CODE = tRetExcelFile;
        tRetArray.push(tObj);
        return tRetArray;
    }

    async REPORT_MRP_LIST2(args0, contextValue, argOrderCds) {
        var args = {
            ...args0,
        };
        args.data.PO_SEQ = '';

        var tInput = {
            ...args0.data,
        };
        var tUserInfo = AFLib.getUserInfo(contextValue);

        let sql00 = `
            select
                max(po_seq) as last_po_seq
            from
                ksv_po_mst
            where
                po_cd = '${args.data.PO_CD}'
                and po_seq < 97
        `;
        var tRet_sql00 = await prisma.$queryRaw(Prisma.raw(sql00));
        var last_po_seq = tRet_sql00[0].last_po_seq;

        let sql20 = `
            update ksv_po_mst
            set
                work_status = 'WORKING MRPLIST'
            where
                po_cd = '${args.data.PO_CD}'
        `;
        var tRet20 = await prisma.$queryRaw(Prisma.raw(sql20));

        console.log('REPORT_MRP_LIST step-1:${argOrderCds.length}');
        console.log(argOrderCds);

        var tIdx999 = 0;
        var argOrderCd = '';
        for (tIdx999 = 0; tIdx999 < argOrderCds.length; tIdx999++) {
            var argOrderCd = argOrderCds[tIdx999];

            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tIdx0 = 0;
            let sql00 = `
                select
                    max(po_seq) as last_po_seq
                from
                    ksv_po_mst
                where
                    po_cd = '${args.data.PO_CD}'
                    and po_seq < 97
            `;
            var tRet_sql00 = await prisma.$queryRaw(Prisma.raw(sql00));
            var last_po_seq = tRet_sql00[0].last_po_seq;

            // var tWExcelFile = `Partial List-${tUserInfo.USER_ID}-${tRetDate1}`;
            var tWExcelFile = '';
            var tRetExcelFile = '';

            if (args.data.MRP_BY_STYLE === '1') {
                let sql1 = `
                       exec kspPoMrpNetProduct '${args.data.PO_CD}',  '${tUserInfo.USER_ID}'
                        `;
                var tRet_sql1 = await prisma.$queryRaw(Prisma.raw(sql1));
            }

            if (args.data.MRP_BY_ORDER === '1') {
                if (args.data.PO_SEQ !== 'temp') {
                    // if (args.data.PO_SEQ === '') {
                    let sql1 = `
                           exec kspPoMrpNetTemp '${args.data.PO_CD}',  '${tUserInfo.USER_ID}'
                            `;
                    var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));

                    let sql2 = `
                        select distinct
                            a.order_cd
                        from
                            ksv_po_mem a
                        where
                            a.po_cd = '${args.data.PO_CD}'
                            and a.order_cd = '${argOrderCd}'
                    `;
                    var tRet2 = await prisma.$queryRaw(Prisma.raw(sql2));
                    var tIdx = 0;
                    for (tIdx = 0; tIdx < tRet2.length; tIdx++) {
                        var tOne = {
                            ...tRet2[tIdx],
                        };
                        if (tOne.order_cd.substring(5, 6) === 'C') {
                            let sql11 = `
                                select
                                    a.order_cd
                                from
                                    ksv_order_mst a,
                                    ksv_po_mem b
                                where
                                    b.po_cd = '${args.data.PO_CD}'
                                    and left(a.order_cd, 10) = b.order_cd
                                    and a.order_cd like '${tOne.order_cd}-%'
                                    and b.po_seq = '1'
                                order by
                                    1
                            `;
                            var tRet_sql11 = await prisma.$queryRaw(
                                Prisma.raw(sql11),
                            );
                            if (tRet_sql11.length <= 0) {
                                let sql1 = `
                                       exec kspPoMrpNetTempZip '${args.data.PO_CD}', '${tUserInfo.USER_ID}', '${tOne.order_cd}' 
                                   `;
                                var sql1 = await prisma.$queryRaw(
                                    Prisma.raw(sql1),
                                );
                            } else {
                                var tIdx1 = 0;
                                for (
                                    tIdx1 = 0;
                                    tIdx1 < tRet_sql11.length;
                                    tIdx1++
                                ) {
                                    var tOne1 = tRet_sql11[tIdx1];
                                    let sql1 = `
                                             exec kspPoMrpNetTempZipComb '${args.data.PO_CD}','${tUserInfo.USER_ID}','${tOne1.order_cd}'
                                       `;
                                    var sql1 = await prisma.$queryRaw(
                                        Prisma.raw(sql1),
                                    );
                                }
                            }
                        } else {
                            let sql1 = `
                                   exec kspPoMrpNetTempZip '${args.data.PO_CD}', '${tUserInfo.USER_ID}', '${tOne.order_cd}' 
                               `;
                            var sql1 = await prisma.$queryRaw(Prisma.raw(sql1));
                        }
                    }
                } else {
                    // 에러 수정할것
                    let sql1 = `
                               exec kspPoMrpNetTempSeq '${args.data.PO_CD}','${tUserInfo.USER_ID}','${args.data.PO_SEQ}'
                            `;
                    var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                }
            }

            let sql40 = `
                    exec kspPoMrpTemp '${args.data.PO_CD}',  '${tUserInfo.USER_ID}'
                     `;
            var tRet40 = await prisma.$queryRaw(Prisma.raw(sql40));

            try {
                var tOrderCd = argOrderCd;
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

                var tTemplateName = '';
                var tFileName = '';
                if (args.data.WITHOUT_PRICE === '1') {
                    tTemplateName = 'PO_PRODMRP2';
                    tFileName = 'MRP2';
                } else {
                    tTemplateName = 'PO_PRODMRP';
                    tFileName = 'MRP';
                }

                let sql4 = `
                    select
                        e.style_name
                    from
                        ksv_order_mst a,
                        kcd_style e
                    where
                        a.order_cd = '${tOrderCd}'
                        and e.style_cd = a.style_cd
                `;
                var tRet4 = await prisma.$queryRaw(Prisma.raw(sql4));
                var tStyleName = tRet4[0].style_name;
                var tStyleName_org = tStyleName;
                tStyleName = tStyleName.replace(/ /gi, '_');
                tStyleName = tStyleName.replace(/\//gi, '_');
                tStyleName = tStyleName.replace(/\*/gi, '_');
                tStyleName = tStyleName.replace(/;/gi, '_');

                var tTemplateExcel = `${tPath0}/${tTemplateName}.xlsx`;
                if (args.data.MRP_BY_STYLE === '1')
                    tWExcelFile = `${tOrderCd}-${tStyleName}-${moment().format('YYYYMMDDHHmmss')}P`;
                else if (args.data.MRP_BY_ORDER === '1')
                    tWExcelFile = `${tOrderCd}-${tStyleName}-${moment().format('YYYYMMDDHHmmss')}M`;
                else
                    tWExcelFile = `${tOrderCd}-${tStyleName}-${moment().format('YYYYMMDDHHmmss')}`;

                const wb = new Excel.Workbook();
                await wb.xlsx.readFile(tTemplateExcel);

                let sql4 = `
                    select
                        c.buyer_name,
                        e.style_name,
                        d.factory_name,
                        a.ref_order_no,
                        a.due_date,
                        a.size_group,
                        f.size_cnt
                    from
                        ksv_order_mst a,
                        kcd_buyer c,
                        kcd_factory d,
                        kcd_style e,
                        kcd_size_mst f
                    where
                        a.order_cd = '${tOrderCd}'
                        and c.buyer_cd = left(a.order_cd, 2)
                        and d.factory_cd = a.factory_cd
                        and e.style_cd = a.style_cd
                        and f.size_group = a.size_group
                `;
                var tRet4 = await prisma.$queryRaw(Prisma.raw(sql4));
                var tOrderInfo = {
                    ...tRet4[0],
                };
                var tSizeGroup = tOrderInfo.size_group.replace(/'/g, "''");
                tSizeGroup = tOrderInfo.size_group.replace(/\[/, '[[');

                let sql4 = `
                    select
                        size_val
                    from
                        kcd_size_mem
                    where
                        size_group like '${tSizeGroup}' escape '['
                    order by
                        size_seq
                `;
                var tRet4 = await prisma.$queryRaw(Prisma.raw(sql4));
                var tSizeInfo = {
                    ...tRet4[0],
                };

                let sql5_9 = `
                    select
                        a.size_cnt,
                        b.color,
                        b.prod_cd,
                        a.add_flag
                    from
                        ksv_order_mem a,
                        ksv_prod_mst b
                    where
                        a.order_cd = '${tOrderCd}'
                        and b.prod_cd = a.prod_cd
                    order by
                        b.color
                `;
                var tRet5_9 = await prisma.$queryRaw(Prisma.raw(sql5_9));

                var tIdx99 = 0;
                for (tIdx99 = 0; tIdx99 < tRet5_9.length; tIdx99++) {
                    var tProdInfo = {
                        ...tRet5_9[tIdx99],
                    };

                    var tSheetName = `Sheet${tIdx99 + 1}`;
                    var sheet = wb.getWorksheet(tSheetName);
                    sheet.name = `${tProdInfo.prod_cd}${tProdInfo.add_flag === '1' ? '_ADD' : ''}`;

                    // const sheet = wb.getWorksheet(1);
                    console.log(`MRP_LIST2:Step-1:${tSheetName}`);

                    var tRowIdx = 10;

                    sheet.getCell(1, 1).value = args.data.PO_CD;
                    console.log(`MRP_LIST2:Step-2:${tSheetName}`);

                    if (args.data.MRP_BY_STYLE === '1')
                        sheet.getCell(1, 13).value =
                            `${tOrderCd}(제품기준으로 작성)`;
                    else if (args.data.MRP_BY_ORDER === '1')
                        sheet.getCell(1, 13).value =
                            `${tOrderCd}(MRPByOrder기준으로 작성)`;
                    else sheet.getCell(1, 13).value = `${tOrderCd}`;
                    sheet.getCell(1, 4).value = `${tOrderCd}`;

                    sheet.getCell(2, 11).value = tOrderInfo.buyer_name;
                    sheet.getCell(2, 4).value = tOrderInfo.style_name;
                    sheet.getCell(2, 15).value = tOrderInfo.factory_name;
                    sheet.getCell(1, 7).value = tOrderInfo.ref_order_no;
                    sheet.getCell(1, 11).value = moment(
                        tOrderInfo.due_date,
                        'YYYYMMDD',
                    ).format('YYYY-MM-DD');
                    sheet.getCell(1, 15).value = moment(
                        tRetDate1,
                        'YYYYMMDD',
                    ).format('YYYY-MM-DD');

                    sheet.getCell(4, 4).value = 'Add Flag';
                    sheet.getCell(4, 5).value = 'SEQ';
                    sheet.getCell(4, 6).value = 'COLOR';
                    sheet.getCell(4, 7).value = 'QTY';

                    var tProdCnt = [];
                    tRet4.forEach((col, i) => {
                        sheet.getCell(4, 8 + i).value = col.size_val;
                        tProdCnt.push(0);
                    });

                    var tColSeq = 0;
                    var tRowIdx = 5;
                    var tSumTotCnt = 0;
                    let sql5 = `
                        select
                            a.size_cnt,
                            b.color,
                            b.prod_cd,
                            a.add_flag
                        from
                            ksv_order_mem a,
                            ksv_prod_mst b
                        where
                            a.order_cd = '${tOrderCd}'
                            --and b.prod_cd = '${tProdInfo.prod_cd}'
                            and a.add_flag = '${tProdInfo.add_flag}'
                            and b.prod_cd = a.prod_cd
                        order by
                            b.color
                    `;

                    var result: [] = await prisma.$queryRaw(Prisma.raw(sql5));
                    result.forEach((col, i) => {
                        var tmpRow: any = [];
                        tmpRow[4] = '';
                        tmpRow[5] = 0;
                        tmpRow[6] = '';
                        tmpRow[7] = 0;
                        sheet.insertRow(tRowIdx, tmpRow, 'i');

                        let colLength = tRet4.length + 7;
                        for (let c = 4; c <= colLength; c++) {
                            sheet.getCell(tRowIdx, c).style = {
                                borderBottom: {
                                    style: 'none',
                                },
                            };
                        }

                        var tIdx2 = 0;
                        var tTotCnt = 0;
                        for (tIdx2 = 0; tIdx2 < tRet4.length; tIdx2++) {
                            var tSizeCnt = parseFloat(
                                col.size_cnt.substring(
                                    6 * tIdx2,
                                    6 * (tIdx2 + 1),
                                ),
                            );
                            tTotCnt += tSizeCnt;
                            sheet.getCell(tRowIdx, 8 + tIdx2).value = tSizeCnt;
                            tProdCnt[tIdx2] += tSizeCnt;
                        }
                        sheet.getCell(tRowIdx, 4).value = col.add_flag;
                        sheet.getCell(tRowIdx, 5).value = i + 1;
                        sheet.getCell(tRowIdx, 6).value = col.color;
                        sheet.getCell(tRowIdx, 7).value = tTotCnt;
                        tSumTotCnt += tTotCnt;
                        tRowIdx += 1;
                    });

                    sheet.getCell(tRowIdx, 6).value = 'TOTAL';
                    const colLetters = [
                        'G',
                        'H',
                        'I',
                        'J',
                        'K',
                        'L',
                        'M',
                        'N',
                        'O',
                        'P',
                        'Q',
                        'R',
                        'S',
                        'T',
                        'U',
                        'V',
                        'W',
                        'X',
                        'Y',
                        'Z',
                    ];

                    for (let tIdx2 = 0; tIdx2 < tRet4.length; tIdx2++) {
                        const colLetter = colLetters[tIdx2]; // G부터 시작
                        sheet.getCell(tRowIdx, 7 + tIdx2).value = {
                            formula: `SUM(${colLetter}5:${colLetter}${tRowIdx - 1})`,
                        };
                    }

                    for (let col = 4; col <= 15; col++) {
                        // D=4, O=15
                        sheet.getCell(tRowIdx, col).style = {
                            border: {
                                top: {
                                    style: 'thin',
                                },
                                bottom: {
                                    style: 'thin',
                                },
                            },
                        };
                    }

                    const highlightRow = 5 + tIdx99;
                    for (let col = 1; col <= 20; col++) {
                        sheet.getCell(highlightRow, col).font = {
                            color: {
                                argb: 'FFFF0000',
                            }, // 빨간색 (ARGB: FF + RRGGBB)
                        };
                    }

                    tRowIdx += 3;

                    let sql5 = '';
                    let tRet5 = '';
                    if (
                        args.data.MRP_BY_ORDER === '0' &&
                        args.data.MRP_BY_STYLE === '0'
                    ) {
                        sql5 = `
                                    exec kspPrintMrpP0 '${args.data.PO_CD}','${tOrderCd}','${tProdInfo.prod_cd}', '${tProdInfo.add_flag}', '${tUserInfo.USER_ID}','${tRetDate1}'
                                `;
                        tRet5 = await prisma.$queryRaw(Prisma.raw(sql5));
                    } else {
                        sql5 = `
                                    exec kspPrintMrpP1 '${args.data.PO_CD}','${tOrderCd}','${tProdInfo.prod_cd}', '${tProdInfo.add_flag}', '${tUserInfo.USER_ID}','${tRetDate1}'
                                `;
                        tRet5 = await prisma.$queryRaw(Prisma.raw(sql5));
                    }

                    let sql6 = `
                        select
                            isnull(max(po_seq), 1) as max_po_seq
                        from
                            ksv_po_mrp
                        where
                            po_cd = '${args.data.PO_CD}'
                            and po_seq > 1
                            and po_seq < 98
                    `;
                    var tRet6 = await prisma.$queryRaw(Prisma.raw(sql6));
                    var tLastPoSeq1 = 1;
                    if (tRet6.length > 0) tLastPoSeq1 = tRet6[0].max_po_seq;

                    var tRet7 = [];
                    let sql7 = `
                        select distinct
                            matl_cd
                        from
                            ksv_po_mrp
                        where
                            po_cd = '${args.data.PO_CD}'
                            and po_seq = '${tLastPoSeq1}'
                    `;
                    tRet7 = await prisma.$queryRaw(Prisma.raw(sql7));

                    let sql8 = `
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
                            ex36 as ex21
                        from
                            kzz_excel
                        where
                            user_id = '${tUserInfo.USER_ID}'
                            and ex_type = 'M'
                        order by
                            ex_seq
                    `;
                    var tRet8 = await prisma.$queryRaw(Prisma.raw(sql8));

                    sheet.getCell(tRowIdx - 1, 21).value = 'Usd Price';

                    tRet8.forEach((col, i) => {
                        var j = 1;
                        sheet.getCell(tRowIdx, j).value = col.ex00;
                        j = j + 1; // No
                        sheet.getCell(tRowIdx, j).value = col.ex01;
                        j = j + 1; // Matl_Code
                        sheet.getCell(tRowIdx, j).value = col.ex02;
                        j = j + 1; // Star-1
                        sheet.getCell(tRowIdx, j).value = col.ex03;
                        j = j + 1; // Desc
                        sheet.getCell(tRowIdx, j).value = `'${col.ex04}`;
                        j = j + 1; // color
                        sheet.getCell(tRowIdx, j).value = col.ex05;
                        j = j + 1; // spec
                        sheet.getCell(tRowIdx, j).value = col.ex06;
                        j = j + 1; // unit
                        sheet.getCell(tRowIdx, j).value = parseFloat(
                            parseFloat(col.ex07).toFixed(4),
                        );
                        j = j + 1; // net
                        sheet.getCell(tRowIdx, j).value = parseFloat(
                            parseFloat(col.ex08).toFixed(4),
                        );
                        j = j + 1; // Loss
                        sheet.getCell(tRowIdx, j).value = parseFloat(
                            parseFloat(col.ex09).toFixed(4),
                        );
                        j = j + 1; // Gross
                        sheet.getCell(tRowIdx, j).value = Math.round(col.ex10);
                        j = j + 1; // qty
                        sheet.getCell(tRowIdx, j).value = Math.ceil(col.ex11);
                        j = j + 1; // total
                        if (args.data.WITHOUT_PRICE === '1') {
                            sheet.getCell(tRowIdx, j).value = col.ex14;
                            j = j + 1; //  amount
                            sheet.getCell(tRowIdx, j).value = col.ex18;
                            j = j + 1; // Vendor
                            sheet.getCell(tRowIdx, j).value = col.ex19;
                            j = j + 1; //   Kind2
                        } else {
                            sheet.getCell(tRowIdx, j).value = col.ex12;
                            j = j + 1; // price
                            sheet.getCell(tRowIdx, j).value = col.ex13;
                            j = j + 1; // size
                            sheet.getCell(tRowIdx, j).value = col.ex14;
                            j = j + 1; //  amount
                            sheet.getCell(tRowIdx, j).value = col.ex15;
                            j = j + 1; // amt$
                            sheet.getCell(tRowIdx, j).value = col.ex16;
                            j = j + 1; // amt($ /Unit)
                            sheet.getCell(tRowIdx, j).value = col.ex17;
                            j = j + 1; // Usage
                            sheet.getCell(tRowIdx, j).value = col.ex18;
                            j = j + 1; // Vendor
                            sheet.getCell(tRowIdx, j).value = col.ex19;
                            j = j + 1; //   Kind2
                            sheet.getCell(tRowIdx, j).value = col.ex20;
                            j = j + 1; //   Use Check
                            sheet.getCell(tRowIdx, j).value = col.ex21;
                            j = j + 1; //   Usd Price
                        }
                        tRowIdx += 1;
                    });

                    tRowIdx += 2;
                    sheet.getCell(tRowIdx, 1).value = '재고사용';
                    let sql8 = `
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
                            ex36 as ex20
                        from
                            kzz_excel
                        where
                            user_id = '${tUserInfo.USER_ID}'
                            and ex_type = 'S'
                        order by
                            ex_seq
                    `;
                    var tRet8 = await prisma.$queryRaw(Prisma.raw(sql8));

                    if (tRet8.length > 0)
                        sheet.getCell(tRowIdx - 1, 21).value = 'Usd Price';

                    tRet8.forEach((col, i) => {
                        var j = 1;
                        sheet.getCell(tRowIdx, j).value = col.ex00;
                        j = j + 1; // No
                        sheet.getCell(tRowIdx, j).value = col.ex01;
                        j = j + 1; // Matl_Code
                        sheet.getCell(tRowIdx, j).value = col.ex02;
                        j = j + 1; // Star-1
                        sheet.getCell(tRowIdx, j).value = col.ex03;
                        j = j + 1; // Desc
                        sheet.getCell(tRowIdx, j).value = `'${col.ex04}`;
                        j = j + 1; // color
                        sheet.getCell(tRowIdx, j).value = col.ex05;
                        j = j + 1; // spec
                        sheet.getCell(tRowIdx, j).value = col.ex06;
                        j = j + 1; // unit
                        // Net
                        let net = parseFloat(parseFloat(col.ex07).toFixed(4));
                        let netCell = sheet.getCell(tRowIdx, j);
                        netCell.value = net;
                        j = j + 1;
                        sheet.getCell(tRowIdx, j).value = parseFloat(
                            parseFloat(col.ex08).toFixed(4),
                        );
                        j = j + 1; // Loss
                        sheet.getCell(tRowIdx, j).value = parseFloat(
                            parseFloat(col.ex09).toFixed(4),
                        );
                        j = j + 1; // Gross
                        sheet.getCell(tRowIdx, j).value = Math.round(col.ex10);
                        j = j + 1; // qty

                        // Total
                        let total = Math.ceil(col.ex11);
                        let totalCell = sheet.getCell(tRowIdx, j);
                        totalCell.value = total;
                        j = j + 1;

                        // 스타일 적용 (Net이 0일 경우)
                        if (net === 0) {
                            netCell.style = {
                                font: {
                                    bold: true,
                                    color: {
                                        argb: 'FFFF0000',
                                    },
                                }, // 빨간색 BOLD
                            };
                            totalCell.style = {
                                font: {
                                    bold: true,
                                    color: {
                                        argb: 'FFFF0000',
                                    },
                                }, // 빨간색 BOLD
                            };
                        }
                        if (args.data.WITHOUT_PRICE === '1') {
                            sheet.getCell(tRowIdx, j).value = col.ex14;
                            j = j + 1; //  amount
                            sheet.getCell(tRowIdx, j).value = col.ex18;
                            j = j + 1; // Vendor
                            sheet.getCell(tRowIdx, j).value = col.ex19;
                            j = j + 1; //   Kind2
                        } else {
                            sheet.getCell(tRowIdx, j).value = col.ex12;
                            j = j + 1; // price
                            sheet.getCell(tRowIdx, j).value = col.ex13;
                            j = j + 1; // size
                            sheet.getCell(tRowIdx, j).value = col.ex14;
                            j = j + 1; //  amount
                            sheet.getCell(tRowIdx, j).value = col.ex15;
                            j = j + 1; // amt$
                            sheet.getCell(tRowIdx, j).value = col.ex16;
                            j = j + 1; // amt($ /Unit)
                            sheet.getCell(tRowIdx, j).value = col.ex17;
                            j = j + 1; // Usage
                            sheet.getCell(tRowIdx, j).value = col.ex18;
                            j = j + 1; // Vendor
                            sheet.getCell(tRowIdx, j).value = col.ex19;
                            j = j + 1; //   Kind2
                            sheet.getCell(tRowIdx, j).value = col.ex20;
                            j = j + 1; //   Usd Price
                        }
                        tRowIdx += 1;
                    });

                    tRowIdx += 2;
                    //sheet.getCell(tRowIdx, 1).value = '단품발주';
                    let sql8 = `
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
                            ex36 as ex20
                        from
                            kzz_excel
                        where
                            user_id = '${tUserInfo.USER_ID}'
                            and ex_type = 'A'
                        order by
                            ex_seq
                    `;
                    var tRet8 = await prisma.$queryRaw(Prisma.raw(sql8));

                    if (tRet8.length > 0)
                        sheet.getCell(tRowIdx - 1, 21).value = 'Usd Price';

                    tRet8.forEach((col, i) => {
                        var j = 1;
                        sheet.getCell(tRowIdx, j).value = col.ex00;
                        j = j + 1; // No
                        sheet.getCell(tRowIdx, j).value = col.ex01;
                        j = j + 1; // Matl_Code
                        sheet.getCell(tRowIdx, j).value = col.ex02;
                        j = j + 1; // Star-1
                        sheet.getCell(tRowIdx, j).value = col.ex03;
                        j = j + 1; // Desc
                        sheet.getCell(tRowIdx, j).value = `'${col.ex04}`;
                        j = j + 1; // color
                        sheet.getCell(tRowIdx, j).value = col.ex05;
                        j = j + 1; // spec
                        sheet.getCell(tRowIdx, j).value = col.ex06;
                        j = j + 1; // unit
                        // Net
                        let net = parseFloat(parseFloat(col.ex07).toFixed(4));
                        let netCell = sheet.getCell(tRowIdx, j);
                        netCell.value = net;
                        j = j + 1;
                        sheet.getCell(tRowIdx, j).value = parseFloat(
                            parseFloat(col.ex08).toFixed(4),
                        );
                        j = j + 1; // Loss
                        sheet.getCell(tRowIdx, j).value = parseFloat(
                            parseFloat(col.ex09).toFixed(4),
                        );
                        j = j + 1; // Gross
                        sheet.getCell(tRowIdx, j).value = Math.round(col.ex10);
                        j = j + 1; // qty
                        // Total
                        let total = Math.ceil(col.ex11);
                        let totalCell = sheet.getCell(tRowIdx, j);
                        totalCell.value = total;
                        j = j + 1;

                        // 스타일 적용: Net 값이 0일 경우 Net과 Total을 빨간색 BOLD로
                        if (net === 0) {
                            netCell.style = {
                                font: {
                                    bold: true,
                                    color: {
                                        argb: 'FFFF0000',
                                    },
                                },
                            };
                            totalCell.style = {
                                font: {
                                    bold: true,
                                    color: {
                                        argb: 'FFFF0000',
                                    },
                                },
                            };
                        }
                        if (args.data.WITHOUT_PRICE === '1') {
                            sheet.getCell(tRowIdx, j).value = col.ex14;
                            j = j + 1; //  amount
                            sheet.getCell(tRowIdx, j).value = col.ex18;
                            j = j + 1; // Vendor
                            sheet.getCell(tRowIdx, j).value = col.ex19;
                            j = j + 1; //   Kind2
                        } else {
                            sheet.getCell(tRowIdx, j).value = col.ex12;
                            j = j + 1; // price
                            sheet.getCell(tRowIdx, j).value = col.ex13;
                            j = j + 1; // size
                            sheet.getCell(tRowIdx, j).value = col.ex14;
                            j = j + 1; //  amount
                            sheet.getCell(tRowIdx, j).value = col.ex15;
                            j = j + 1; // amt$
                            sheet.getCell(tRowIdx, j).value = col.ex16;
                            j = j + 1; // amt($ /Unit)
                            sheet.getCell(tRowIdx, j).value = col.ex17;
                            j = j + 1; // Usage
                            sheet.getCell(tRowIdx, j).value = col.ex18;
                            j = j + 1; // Vendor
                            sheet.getCell(tRowIdx, j).value = col.ex19;
                            j = j + 1; //   Kind2
                            sheet.getCell(tRowIdx, j).value = col.ex20;
                            j = j + 1; //   Usd Price
                        }
                        tRowIdx += 1;
                    });

                    // Total
                    if (args.data.WITHOUT_PRICE !== '1') {
                        var j = 0;
                        sheet.getCell(tRowIdx, 15 + j).value = 'Curr';
                        sheet.getCell(tRowIdx, 16 + j).value = 'Amount';
                        sheet.getCell(tRowIdx, 17 + j).value = 'Rate';
                        sheet.getCell(tRowIdx, 18 + j).value = 'ChgAmount';
                        tRowIdx += 1;

                        let sql91 = `
                            select
                                c.curr_cd,
                                sum(a.use_qty * c.matl_price) as sum1,
                                f.usd_rate,
                                f.won_amt
                            from
                                ksv_po_mrp a,
                                kcd_matl_mem c,
                                kcd_currency f
                            where
                                a.po_cd = '${args.data.PO_CD}'
                                and a.order_cd = '${tOrderCd}'
                                and a.use_po_type = '1'
                                and a.diff_po_type <> '2'
                                and c.matl_cd = a.matl_cd
                                and c.matl_seq = a.matl_seq
                                and f.curr_cd = a.curr_cd
                                and f.start_date = '${args.data.CURR_DATE}'
                            group by
                                c.curr_cd,
                                f.usd_rate,
                                f.won_amt
                            order by
                                c.curr_cd
                        `;
                        var tRet91 = await prisma.$queryRaw(Prisma.raw(sql91));
                        var tDwAmt = 0;
                        tRet91.forEach((col, i) => {
                            sheet.getCell(tRowIdx, 15 + j).value = col.curr_cd;
                            sheet.getCell(tRowIdx, 16 + j).value = col.sum1;
                            sheet.getCell(tRowIdx, 17 + j).value = col.usd_rate;
                            tDwAmt +=
                                parseFloat(col.sum1) * parseFloat(col.usd_rate);
                            sheet.getCell(tRowIdx, 18 + j).value = col.won_amt;
                            tRowIdx += 1;
                        });

                        console.log(`MRP_LIST2:Step-3:${tSheetName}`);

                        tRowIdx += 1;
                        sheet.getCell(tRowIdx, 15 + j).value = 'Sum';

                        tRowIdx += 1;
                        sheet.getCell(tRowIdx, 16 + j).value = 'Total';
                        sheet.getCell(tRowIdx, 17 + j).value = 'Price($)';

                        tRowIdx += 1;
                        sheet.getCell(tRowIdx, 16 + j).value = tSumTotCnt;
                        sheet.getCell(tRowIdx, 17 + j).value =
                            tDwAmt / parseFloat(tSumTotCnt);
                        console.log(`MRP_LIST2:Step-4:${tSheetName}`);
                    }
                }

                if (args.data.PO_SEQ === '') {
                    tWExcelFile = `MRPLIST2_${args.data.PO_CD}_ALL_${last_po_seq}_${tOrderCd}_${tStyleName}_${moment().format('YYYYMMDDHHmmss')}`;
                } else {
                    tWExcelFile = `MRPLIST2_${args.data.PO_CD}_${args.data.PO_SEQ}_${tOrderCd}_${tStyleName}_${moment().format('YYYYMMDDHHmmss')}`;
                }

                var tTitle = '';
                var tFileKey = '';
                if (args.data.PO_SEQ === '') {
                    tTitle = `MRPLIST2_${args.data.PO_CD}_${tOrderCd}_ALL_${last_po_seq}`;
                    tFileKey = `${args.data.PO_CD}_ALL`;
                } else {
                    tTitle = `MRPLIST2_${args.data.PO_CD}_${tOrderCd}_${args.data.PO_SEQ}`;
                    tFileKey = `${args.data.PO_CD}_${args.data.PO_SEQ}`;
                }

                let sql12 = `
                    delete from kcd_fileinfo
                    where
                        title = '${tTitle}'
                        and file_key = '${tTitle}'
                        and kind = 'S030513'
                `;
                var tRet12 = await prisma.$queryRaw(Prisma.raw(sql12));

                const uploadInfo = await generateUploadURL();
                const uploadURL = uploadInfo.uploadURL;
                const fileURL = uploadURL.split('?')[0];

                var tInObj = {};
                tInObj.NAME = tWExcelFile;
                tInObj.URL = fileURL;
                tInObj.TITLE = tTitle;
                tInObj.FILE_KEY = tFileKey;
                tInObj.KIND = 'S030513';
                var tSql11 = AFLib.createTableSql('KCD_FILEINFO', tInObj);
                var tRet11 = await prisma.$queryRaw(Prisma.raw(tSql11));

                const uploadResult = await upload(`${tWExcelFile}.xlsx`, wb, uploadURL);
                return makeBatchFilesResponse(uploadResult);
            } catch (error) {
                console.log(`ERROR(MRP Excel):${error.message}`);

                var tRet4 = await AFLib2.CommonFunc.DeleteMrpWork(
                    tUserInfo.USER_ID,
                    tInput.PO_CD,
                );

                var tRetArray = [];
                var tObj = {};
                tObj.id = 1;
                tObj.CODE = `ERROR:${error.message}`;
                tRetArray.push(tObj);
                return tRetArray;
            }
        }

        var tRet4 = await AFLib2.CommonFunc.DeleteMrpWork(
            tUserInfo.USER_ID,
            tInput.PO_CD,
        );

        var tRetArray = [];
        var tObj = {};
        tObj.id = 1;
        tObj.CODE = tRetExcelFile;
        tRetArray.push(tObj);
        return tRetArray;
    }

    async REPORT_MRP_LIST3(args0, contextValue, argOrderCds) {
        var args = {
            ...args0,
        };
        args.data.PO_SEQ = '';
        var tInput = {
            ...args0.data,
        };
        var tUserInfo = AFLib.getUserInfo(contextValue);

        let sql00 = `
            select
                max(po_seq) as last_po_seq
            from
                ksv_po_mst
            where
                po_cd = '${args.data.PO_CD}'
                and po_seq < 97
        `;
        var tRet_sql00 = await prisma.$queryRaw(Prisma.raw(sql00));
        var last_po_seq = tRet_sql00[0].last_po_seq;

        let sql20 = `
            update ksv_po_mst
            set
                work_status = 'WORKING MRPLIST'
            where
                po_cd = '${args.data.PO_CD}'
        `;
        var tRet20 = await prisma.$queryRaw(Prisma.raw(sql20));

        console.log('REPORT_MRP_LIST step-1');

        var tIdx999 = 0;
        for (tIdx999 = 0; tIdx999 < argOrderCds.length; tIdx999++) {
            var argOrderCd = argOrderCds[tIdx999];
            if (argOrderCd === '') continue;

            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tIdx0 = 0;
            let sql00 = `
                select
                    max(po_seq) as last_po_seq
                from
                    ksv_po_mst
                where
                    po_cd = '${args.data.PO_CD}'
                    and po_seq < 97
            `;
            var tRet_sql00 = await prisma.$queryRaw(Prisma.raw(sql00));
            var last_po_seq = tRet_sql00[0].last_po_seq;

            // var tWExcelFile = `Partial List-${tUserInfo.USER_ID}-${tRetDate1}`;
            var tWExcelFile = '';
            var tRetExcelFile = '';

            if (args.data.MRP_BY_STYLE === '1') {
                let sql1 = `
                      exec kspPoMrpNetProduct '${args.data.PO_CD}', '${tUserInfo.USER_ID}'
                       `;
                var tRet_sql1 = await prisma.$queryRaw(Prisma.raw(sql1));
            }

            if (args.data.MRP_BY_ORDER === '1') {
                if (args.data.PO_SEQ === '') {
                    let sql1 = `
                          exec kspPoMrpNetTempCombined '${args.data.PO_CD}',  '${tUserInfo.USER_ID}', '${argOrderCd}'
                           `;
                    var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));

                    let sql2 = `
                        select
                            b.order_cd
                        from
                            ksv_po_mem a,
                            ksv_order_mst b
                        where
                            a.po_cd = '${args.data.PO_CD}'
                            and a.order_cd = left(b.order_cd, 10)
                            and a.po_seq = '1'
                            and left(b.order_cd, 10) = '${argOrderCd}'
                            and b.order_type = '2'
                        order by
                            1
                    `;
                    var tRet2 = await prisma.$queryRaw(Prisma.raw(sql2));
                    var tIdx = 0;
                    for (tIdx = 0; tIdx < tRet2.length; tIdx++) {
                        var tOne = {
                            ...tRet2[tIdx],
                        };
                        let sql1 = `
                                      exec kspPoMrpNetTempCombinedZip '${args.data.PO_CD}', '${tUserInfo.USER_ID}', '${tOne.order_cd}' 
                             `;
                        var sql1 = await prisma.$queryRaw(Prisma.raw(sql1));
                    }
                } else {
                    // 에러 수정할것
                    let sql1 = `
                              exec kspPoMrpNetTempSeq '${args.data.PO_CD}','${tUserInfo.USER_ID}','${args.data.PO_SEQ}'
                           `;
                    var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                }
            }

            let sql40 = `
                   exec kspPoMrpTemp '${args.data.PO_CD}',  '${tUserInfo.USER_ID}'
                    `;
            var tRet40 = await prisma.$queryRaw(Prisma.raw(sql40));

            let sql41 = `
                select
                    a.order_cd,
                    b.nat_name
                from
                    ksv_order_mst a,
                    kcd_nation b
                where
                    a.nat_cd = b.nat_cd
                    and a.order_cd like '${argOrderCd}%'
                    and a.order_type = '2'
            `;
            var tRet41 = await prisma.$queryRaw(Prisma.raw(sql41));

            console.log('---------------------0');
            try {
                for (tIdx0 = 0; tIdx0 < tRet41.length; tIdx0++) {
                    var tOrderCd = tRet41[tIdx0].order_cd;

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

                    console.log('---------------------1');
                    var tTemplateName = '';
                    var tFileName = '';
                    if (args.data.WITHOUT_PRICE === '1') {
                        tTemplateName = 'PO_MRP2';
                        tFileName = 'MRP2';
                    } else {
                        tTemplateName = 'PO_MRP';
                        tFileName = 'MRP';
                    }

                    let sql4 = `
                        select
                            e.style_name
                        from
                            ksv_order_mst a,
                            kcd_style e
                        where
                            a.order_cd = '${tOrderCd}'
                            and e.style_cd = a.style_cd
                    `;
                    var tRet4 = await prisma.$queryRaw(Prisma.raw(sql4));
                    var tStyleName = tRet4[0].style_name;
                    tStyleName = tStyleName.replace(/ /gi, '_');
                    tStyleName = tStyleName.replace(/\//gi, '_');
                    tStyleName = tStyleName.replace(/\*/gi, '_');
                    tStyleName = tStyleName.replace(/;/gi, '_');

                    console.log('---------------------2');

                    var tTemplateExcel = `${tPath0}/${tTemplateName}.xlsx`;
                    if (args.data.MRP_BY_STYLE === '1')
                        tWExcelFile = `${tOrderCd}-${tStyleName}-${moment().format('YYYYMMDDHHmmss')}P`;
                    else if (args.data.MRP_BY_ORDER === '1')
                        tWExcelFile = `${tOrderCd}-${tStyleName}-${moment().format('YYYYMMDDHHmmss')}M`;
                    else
                        tWExcelFile = `${tOrderCd}-${tStyleName}-${moment().format('YYYYMMDDHHmmss')}`;

                    const wb = new Excel.Workbook();
                    await wb.xlsx.readFile(tTemplateExcel);

                    console.log('---------------------3');
                    var tSheetName = `MRPByOrder`;
                    var sheet = wb.getWorksheet(tSheetName);
                    // const sheet = wb.getWorksheet(1);

                    console.log('---------------------4');

                    var tRowIdx = 10;

                    sheet.getCell(1, 1).value = args.data.PO_CD;

                    if (args.data.MRP_BY_STYLE === '1')
                        sheet.getCell(1, 13).value =
                            `${tOrderCd}(제품기준으로 작성)`;
                    else if (args.data.MRP_BY_ORDER === '1')
                        sheet.getCell(1, 13).value =
                            `${tOrderCd}(MRPByOrder기준으로 작성)`;
                    else sheet.getCell(1, 13).value = `${tOrderCd}`;

                    let sql4 = `
                        select
                            c.buyer_name,
                            e.style_name,
                            d.factory_name,
                            a.ref_order_no,
                            a.due_date,
                            a.size_group,
                            f.size_cnt
                        from
                            ksv_order_mst a,
                            kcd_buyer c,
                            kcd_factory d,
                            kcd_style e,
                            kcd_size_mst f
                        where
                            a.order_cd = '${tOrderCd}'
                            and c.buyer_cd = left(a.order_cd, 2)
                            and d.factory_cd = a.factory_cd
                            and e.style_cd = a.style_cd
                            and f.size_group = a.size_group
                    `;
                    var tRet4 = await prisma.$queryRaw(Prisma.raw(sql4));
                    var tOrderInfo = {
                        ...tRet4[0],
                    };

                    sheet.getCell(2, 20).value = tOrderInfo.buyer_name;
                    sheet.getCell(2, 13).value = tOrderInfo.style_name;
                    sheet.getCell(2, 24).value = tOrderInfo.factory_name;
                    sheet.getCell(1, 16).value = tOrderInfo.ref_order_no;
                    sheet.getCell(1, 20).value = tOrderInfo.due_date;
                    sheet.getCell(1, 24).value = tRetDate1;

                    var tSizeGroup = tOrderInfo.size_group.replace(/'/g, "''");
                    tSizeGroup = tOrderInfo.size_group.replace(/\[/, '[[');

                    sheet.getCell(4, 13).value = 'SEQ';
                    sheet.getCell(4, 14).value = 'COLOR';
                    sheet.getCell(4, 15).value = 'QTY';

                    let sql4 = `
                        select
                            size_val
                        from
                            kcd_size_mem
                        where
                            size_group like '${tSizeGroup}' escape '['
                        order by
                            size_seq
                    `;
                    var tRet4 = await prisma.$queryRaw(Prisma.raw(sql4));
                    var tSizeInfo = {
                        ...tRet4[0],
                    };

                    var tProdCnt = [];
                    tRet4.forEach((col, i) => {
                        sheet.getCell(4, 16 + i).value = col.size_val;
                        tProdCnt.push(0);
                    });

                    let sql5 = `
                        select
                            a.size_cnt,
                            b.color,
                            b.prod_cd,
                            a.add_flag
                        from
                            ksv_order_mem a,
                            ksv_prod_mst b
                        where
                            a.order_cd = '${tOrderCd}'
                            and b.prod_cd = a.prod_cd
                        order by
                            b.color
                    `;
                    var tRet5 = await prisma.$queryRaw(Prisma.raw(sql5));
                    var tColSeq = 0;
                    var tRowIdx = 5;
                    var tSumTotCnt = 0;
                    tRet5.forEach((col, i) => {
                        var tmpRow = [];
                        tmpRow[13] = 0;
                        tmpRow[14] = '';
                        tmpRow[15] = 0;
                        sheet.insertRow(tRowIdx, tmpRow, 'i');

                        var tIdx2 = 0;
                        var tTotCnt = 0;
                        for (tIdx2 = 0; tIdx2 < tRet4.length; tIdx2++) {
                            var tSizeCnt = parseFloat(
                                col.size_cnt.substring(
                                    6 * tIdx2,
                                    6 * (tIdx2 + 1),
                                ),
                            );
                            tTotCnt += tSizeCnt;
                            sheet.getCell(tRowIdx, 16 + tIdx2).value = tSizeCnt;
                            tProdCnt[tIdx2] += tSizeCnt;
                        }
                        sheet.getCell(tRowIdx, 13).value = i + 1;
                        sheet.getCell(tRowIdx, 14).value = col.color;
                        sheet.getCell(tRowIdx, 15).value = tTotCnt;
                        tSumTotCnt += tTotCnt;
                        tRowIdx += 1;
                    });
                    sheet.getCell(tRowIdx, 15).value = tSumTotCnt;
                    var tIdx2 = 0;
                    for (tIdx2 = 0; tIdx2 < tSizeInfo.length; tIdx2++) {
                        sheet.getCell(tRowIdx, 16 + tIdx2).value =
                            tProdCnt[tIdx2];
                    }

                    tRowIdx += 3;

                    let sql5 = '';
                    let tRet5 = '';
                    if (
                        args.data.MRP_BY_ORDER === '0' &&
                        args.data.MRP_BY_STYLE === '0'
                    ) {
                        sql5 = `
                               exec kspPrintMrp0 '${args.data.PO_CD}','${tOrderCd}','${tUserInfo.USER_ID}','${tRetDate1}'
                           `;
                        tRet5 = await prisma.$queryRaw(Prisma.raw(sql5));
                    } else {
                        sql5 = `
                               exec kspPrintMrp1 '${args.data.PO_CD}','${tOrderCd}','${tUserInfo.USER_ID}','${tRetDate1}'
                           `;
                        tRet5 = await prisma.$queryRaw(Prisma.raw(sql5));
                    }

                    let sql6 = `
                        select
                            isnull(max(po_seq), 1) as max_po_seq
                        from
                            ksv_po_mrp
                        where
                            po_cd = '${args.data.PO_CD}'
                            and po_seq > 1
                            and po_seq < 98
                    `;
                    var tRet6 = await prisma.$queryRaw(Prisma.raw(sql6));
                    var tLastPoSeq1 = 1;
                    if (tRet6.length > 0) tLastPoSeq1 = tRet6[0].max_po_seq;

                    var tRet7 = [];
                    let sql7 = `
                        select distinct
                            matl_cd
                        from
                            ksv_po_mrp
                        where
                            po_cd = '${args.data.PO_CD}'
                            and po_seq = '${tLastPoSeq1}'
                    `;
                    tRet7 = await prisma.$queryRaw(Prisma.raw(sql7));

                    let sql8 = `
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
                            ex37,
                            ex34
                        from
                            kzz_excel
                        where
                            user_id = '${tUserInfo.USER_ID}'
                            and ex_type = 'M'
                        order by
                            ex_seq
                    `;
                    var tRet8 = await prisma.$queryRaw(Prisma.raw(sql8));

                    if (args.data.WITHOUT_PRICE === '0') {
                        sheet.getCell(tRowIdx - 1, 31).value = 'Usd Price';
                        sheet.getCell(tRowIdx - 1, 32).value = 'Kind2';
                    } else {
                        sheet.getCell(tRowIdx - 1, 25).value = 'Kind2';
                    }

                    tRet8.forEach((col, i) => {
                        var tUseCheck = col.ex29;
                        var tNatName = col.ex35;
                        var tMalType2 = col.ex37;
                        var tMatlCd = col.ex01;
                        var j = 1;
                        sheet.getCell(tRowIdx, j).value = col.ex00;
                        j = j + 1; // No
                        sheet.getCell(tRowIdx, j).value = col.ex01;
                        j = j + 1; // Matl_Code
                        sheet.getCell(tRowIdx, j).value = col.ex02;
                        j = j + 1; // Star-1
                        sheet.getCell(tRowIdx, j).value = col.ex03;
                        j = j + 1; // S-2
                        sheet.getCell(tRowIdx, j).value = col.ex04;
                        j = j + 1; // S-3
                        sheet.getCell(tRowIdx, j).value = col.ex05;
                        j = j + 1; // S-4
                        sheet.getCell(tRowIdx, j).value = col.ex06;
                        j = j + 1; // S-5
                        sheet.getCell(tRowIdx, j).value = col.ex07;
                        j = j + 1; // S-6
                        sheet.getCell(tRowIdx, j).value = col.ex08;
                        j = j + 1; // S-7
                        sheet.getCell(tRowIdx, j).value = col.ex09;
                        j = j + 1; // S-8
                        sheet.getCell(tRowIdx, j).value = col.ex10;
                        j = j + 1; // S-9
                        sheet.getCell(tRowIdx, j).value = col.ex11;
                        j = j + 1; // S-10
                        sheet.getCell(tRowIdx, j).value = col.ex12;
                        j = j + 1; // Desc
                        sheet.getCell(tRowIdx, j).value = `'${col.ex13}`;
                        j = j + 1; // color
                        sheet.getCell(tRowIdx, j).value = col.ex14.replace(
                            /=/,
                            '',
                        );
                        j = j + 1; // Spec
                        sheet.getCell(tRowIdx, j).value = col.ex15;
                        j = j + 1; // Unit
                        // Net
                        let net = parseFloat(parseFloat(col.ex16).toFixed(4));
                        let netCell = sheet.getCell(tRowIdx, j);
                        netCell.value = net;
                        j = j + 1;
                        sheet.getCell(tRowIdx, j).value = parseFloat(
                            parseFloat(col.ex17).toFixed(4),
                        );
                        j = j + 1; // Loss
                        sheet.getCell(tRowIdx, j).value = parseFloat(
                            parseFloat(col.ex18).toFixed(4),
                        );
                        j = j + 1; // Gross
                        sheet.getCell(tRowIdx, j).value = Math.round(col.ex19);
                        j = j + 1; // Qty
                        // Total
                        let total = Math.ceil(col.ex20);
                        let totalCell = sheet.getCell(tRowIdx, j);
                        totalCell.value = total;
                        j = j + 1;

                        // 스타일 적용: Net 값이 0일 경우 Net과 Total을 빨간색 BOLD로
                        if (net === 0) {
                            netCell.style = {
                                font: {
                                    bold: true,
                                    color: {
                                        argb: 'FFFF0000',
                                    },
                                }, // 빨간색 BOLD
                            };
                            totalCell.style = {
                                font: {
                                    bold: true,
                                    color: {
                                        argb: 'FFFF0000',
                                    },
                                }, // 빨간색 BOLD
                            };
                        }

                        if (args.data.WITHOUT_PRICE === '1') {
                            sheet.getCell(tRowIdx, j).value = `'${col.ex23}`;
                            j = j + 1; // Size
                            sheet.getCell(tRowIdx, j).value = col.ex27;
                            j = j + 1; // Usage
                            sheet.getCell(tRowIdx, j).value = col.ex37;
                            j = j + 1; // Vendor
                            sheet.getCell(tRowIdx, j).value = col.ex36;
                            j = j + 1; // usd_price
                            sheet.getCell(tRowIdx, j).value = col.ex28;
                            j = j + 1; // Kind2
                        } else {
                            sheet.getCell(tRowIdx, j).value = col.ex21;
                            j = j + 1; // Price
                            sheet.getCell(tRowIdx, j).value = col.ex22;
                            j = j + 1; // curr
                            sheet.getCell(tRowIdx, j).value = col.ex23;
                            j = j + 1; // Size
                            sheet.getCell(tRowIdx, j).value = col.ex37;
                            j = j + 1; // KInd2 (24-37)
                            sheet.getCell(tRowIdx, j).value = col.ex25;
                            j = j + 1; // Amt(S)
                            sheet.getCell(tRowIdx, j).value = col.ex26;
                            j = j + 1; // Amt($/Unit)
                            sheet.getCell(tRowIdx, j).value = col.ex27;
                            j = j + 1; // Usage
                            sheet.getCell(tRowIdx, j).value = col.ex28;
                            j = j + 1; // Vendor
                            sheet.getCell(tRowIdx, j).value = col.ex35;
                            j = j + 1; //
                            sheet.getCell(tRowIdx, j).value = col.ex36;
                            j = j + 1; // Usd-Price
                            sheet.getCell(tRowIdx, j).value = col.ex37;
                            j = j + 1; // KInd2
                        }
                        tRowIdx += 1;
                    });

                    tRowIdx += 2;

                    //sheet.getCell(tRowIdx, 1).value = '단품발주';

                    let sql9 = `
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
                            ex36 as ex29,
                            ex37 as ex30
                        from
                            kzz_excel
                        where
                            user_id = '${tUserInfo.USER_ID}'
                            and ex_type = 'A'
                        order by
                            ex_seq
                    `;
                    var tRet9 = await prisma.$queryRaw(Prisma.raw(sql9));
                    tRet9.forEach((col, i) => {
                        var tUseCheck = col.ex29;
                        var tNatName = col.ex35;
                        var tMalType2 = col.ex37;
                        var tMatlCd = col.ex01;
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
                        sheet.getCell(tRowIdx, 14).value = `'${col.ex13}`;
                        sheet.getCell(tRowIdx, 15).value = col.ex14.replace(
                            /=/,
                            '',
                        );
                        sheet.getCell(tRowIdx, 16).value = col.ex15;
                        sheet.getCell(tRowIdx, 17).value = col.ex16;
                        sheet.getCell(tRowIdx, 18).value = col.ex17;
                        sheet.getCell(tRowIdx, 19).value = col.ex18;
                        sheet.getCell(tRowIdx, 20).value = col.ex19;
                        sheet.getCell(tRowIdx, 21).value = col.ex20;
                        if (args.data.WITHOUT_PRICE === '1') {
                            sheet.getCell(tRowIdx, 22).value = `'${col.ex23}`;
                            sheet.getCell(tRowIdx, 23).value = col.ex27;
                            sheet.getCell(tRowIdx, 24).value = col.ex28;
                            sheet.getCell(tRowIdx, 25).value = col.ex30;
                        } else {
                            sheet.getCell(tRowIdx, 22).value = col.ex21;
                            sheet.getCell(tRowIdx, 23).value = col.ex22;
                            sheet.getCell(tRowIdx, 24).value = `'${col.ex23}`;
                            sheet.getCell(tRowIdx, 25).value = col.ex24;
                            sheet.getCell(tRowIdx, 26).value = col.ex25;
                            sheet.getCell(tRowIdx, 27).value = col.ex26;
                            sheet.getCell(tRowIdx, 28).value = col.ex27;
                            sheet.getCell(tRowIdx, 29).value = col.ex28;
                            sheet.getCell(tRowIdx, 30).value = col.ex29;
                            sheet.getCell(tRowIdx, 31).value = col.ex30;
                        }
                        tRowIdx += 1;
                    });
                    tRowIdx += 2;

                    // Total
                    if (args.data.WITHOUT_PRICE !== '1') {
                        var j = 0;
                        if (args.data.LOCAL_WORD === '1') j = 1;
                        sheet.getCell(tRowIdx, 24 + j).value = 'Curr';
                        sheet.getCell(tRowIdx, 25 + j).value = 'Amount';
                        sheet.getCell(tRowIdx, 26 + j).value = 'Rate';
                        sheet.getCell(tRowIdx, 27 + j).value = 'ChgAmount';
                        tRowIdx += 1;

                        let sql91 = `
                            select
                                c.curr_cd,
                                sum(a.use_qty * c.matl_price) as sum1,
                                f.usd_rate,
                                f.won_amt
                            from
                                ksv_po_mrp a,
                                kcd_matl_mem c,
                                kcd_currency f
                            where
                                a.po_cd = '${args.data.PO_CD}'
                                and a.order_cd = '${tOrderCd}'
                                and a.use_po_type = '1'
                                and a.diff_po_type <> '2'
                                and c.matl_cd = a.matl_cd
                                and c.matl_seq = a.matl_seq
                                and f.curr_cd = a.curr_cd
                                and f.start_date = '${args.data.CURR_DATE}'
                            group by
                                c.curr_cd,
                                f.usd_rate,
                                f.won_amt
                            order by
                                c.curr_cd
                        `;
                        var tRet91 = await prisma.$queryRaw(Prisma.raw(sql91));
                        var tDwAmt = 0;
                        tRet91.forEach((col, i) => {
                            sheet.getCell(tRowIdx, 24 + j).value = col.curr_cd;
                            sheet.getCell(tRowIdx, 25 + j).value = col.sum1;
                            sheet.getCell(tRowIdx, 26 + j).value = col.usd_rate;
                            tDwAmt +=
                                parseFloat(col.sum1) * parseFloat(col.usd_rate);
                            sheet.getCell(tRowIdx, 27 + j).value = col.won_amt;
                            tRowIdx += 1;
                        });

                        tRowIdx += 1;
                        sheet.getCell(tRowIdx, 24 + j).value = 'Sum';

                        tRowIdx += 1;
                        sheet.getCell(tRowIdx, 26 + j).value = 'Total';
                        sheet.getCell(tRowIdx, 27 + j).value = 'Price($)';

                        tRowIdx += 1;
                        sheet.getCell(tRowIdx, 26 + j).value = tSumTotCnt;
                        sheet.getCell(tRowIdx, 27 + j).value =
                            tDwAmt / parseFloat(tSumTotCnt);
                    }

                    if (args.data.PO_SEQ === '') {
                        tWExcelFile = `MRPLIST3_${args.data.PO_CD}_ALL_${last_po_seq}_${tOrderCd}_${tStyleName}_${moment().format('YYYYMMDDHHmmss')}`;
                    } else {
                        tWExcelFile = `MRPLIST3_${args.data.PO_CD}_${args.data.PO_SEQ}_${tOrderCd}_${tStyleName}_${moment().format('YYYYMMDDHHmmss')}`;
                    }

                    var tTitle = '';
                    var tFileKey = '';
                    if (args.data.PO_SEQ === '') {
                        tTitle = `MRPLIST3_${args.data.PO_CD}_${tOrderCd}_ALL_${last_po_seq}`;
                        tFileKey = `${args.data.PO_CD}_ALL`;
                    } else {
                        tTitle = `MRPLIST3_${args.data.PO_CD}_${tOrderCd}_${args.data.PO_SEQ}`;
                        tFileKey = `${args.data.PO_CD}_${args.data.PO_SEQ}`;
                    }

                    let sql12 = `
                        delete from kcd_fileinfo
                        where
                            title = '${tTitle}'
                            and file_key = '${tTitle}'
                            and kind = 'S030513'
                    `;
                    var tRet12 = await prisma.$queryRaw(Prisma.raw(sql12));

                    const uploadInfo = await generateUploadURL();
                    const uploadURL = uploadInfo.uploadURL;
                    const fileURL = uploadURL.split('?')[0];

                    var tInObj = {};
                    tInObj.NAME = tWExcelFile;
                    tInObj.URL = fileURL;
                    tInObj.TITLE = tTitle;
                    tInObj.FILE_KEY = tFileKey;
                    tInObj.KIND = 'S030513';
                    var tSql11 = AFLib.createTableSql('KCD_FILEINFO', tInObj);
                    var tRet11 = await prisma.$queryRaw(Prisma.raw(tSql11));

                    const uploadResult = await upload(`${tWExcelFile}.xlsx`, wb, uploadURL);
                    return makeBatchFilesResponse(uploadResult);
                }
            } catch (error) {
                console.log(`ERROR(MRP Excel):${error.message}`);

                var tRet4 = await AFLib2.CommonFunc.DeleteMrpWork(
                    tUserInfo.USER_ID,
                    tInput.PO_CD,
                );

                var tRetArray = [];
                var tObj = {};
                tObj.id = 1;
                tObj.CODE = `ERROR:${error.message}`;
                tRetArray.push(tObj);
                return tRetArray;
            }
        }

        var tRet4 = await AFLib2.CommonFunc.DeleteMrpWork(
            tUserInfo.USER_ID,
            tInput.PO_CD,
        );

        var tRetArray = [];
        var tObj = {};
        tObj.id = 1;
        tObj.CODE = tRetExcelFile;
        tRetArray.push(tObj);
        return tRetArray;
    }
}

class ReportLib_S030513 {
    async saveMongoDb(argData, argTable) {
        //
        const client = new MongoClient(
            'mongodb://test:test1234@localhost:27017',
        );
        var mongo_db = '';
        try {
            await client.connect();
            mongo_db = client.db('afroba');
        } catch (error) {
            return -1;
        }

        var tTabName = argTable;
        var tSrcData = [];

        var tRet = 0;
        if ((await mongo_db.collection(tTabName).countDocuments()) === 0) {
            await mongo_db.collection(tTabName).insertMany(tRet_order);
            tRet = await mongo_db.collection(tTabName).countDocuments();
        } else {
            await mongo_db.collection(tTabName).drop();
            await mongo_db.collection(tTabName).insertMany(tRet_order);
            tRet = await mongo_db.collection(tTabName).countDocuments();
        }
        return tRet;
    }

    getUserInfo(argData) {
        console.log(argData);
        var tRet = {};
        var tCols = argData.token.split(':');
        if (tCols.length >= 2) {
            tRet.USER_ID = tCols[0];
            tRet.USER_NAME = tCols[1];
        } else {
            tRet.USER_ID = '';
            tRet.USER_NAME = '';
        }
        return tRet;
    }
    getCurrTime() {
        var tDate = new Date();
        var mm = tDate.getMonth() + 1;
        var mm_str = '';
        if (mm > 9) mm_str = mm.toString();
        else mm_str = '0' + mm;

        var dd = tDate.getDate();
        var dd_str = '';
        if (dd > 9) dd_str = dd;
        else dd_str = '0' + dd;

        var hours = tDate.getHours();
        var hours_str = '';
        if (hours > 9) hours_str = hours.toString();
        else hours_str = '0' + hours;

        var minutes = tDate.getMinutes();
        var minutes_str = '';
        if (minutes > 9) minutes_str = minutes.toString();
        else minutes_str = '0' + minutes;

        var seconds = tDate.getSeconds();
        var seconds_str = '';
        if (seconds > 9) seconds_str = seconds.toString();
        else seconds_str = '0' + seconds;

        var yyyy = tDate.getFullYear();

        var tRetDate =
            yyyy.toString() +
            mm_str +
            dd_str +
            hours_str +
            minutes_str +
            seconds_str;
        return tRetDate;
    }
    printF(argValue, argLength) {
        var argZero = '';
        var tIdx = 0;
        for (tIdx = 0; tIdx < argLength; tIdx++) {
            argZero += '0';
        }

        var tRet =
            argZero.substring(0, argLength - String(argValue).length) +
            String(argValue);
        return tRet;
    }
    getFloat(argValue: float, argPoint: int) {
        var b = parseInt(argValue * 10 ** argPoint) / 10 ** argPoint;
        return b;
    }
    createTableSql(argTable: var, argValue: var) {
        var tKeys = Object.keys(argValue);
        var tIdx3 = 0;
        var tColumeStr = '';
        var tValueStr = '';
        for (tIdx3 = 0; tIdx3 < tKeys.length; tIdx3++) {
            var tKey = tKeys[tIdx3];
            var tValue = argValue[`${tKey}`];

            if (tValue === null) continue;

            if (tIdx3 === 0) {
                tColumeStr += tKey;
                tValueStr += `'${tValue}'`;
            } else {
                tColumeStr += ',' + tKey;
                tValueStr += ',' + `'${tValue}'`;
            }
        }
        var tRetSql =
            'insert into ' +
            argTable +
            '(' +
            tColumeStr +
            ') values (' +
            tValueStr +
            ')';
        return tRetSql;
    }
    updateTableSql(argTable: var, argValue: var) {
        var tKeys = Object.keys(argValue);
        var tIdx3 = 0;
        var tColumeStr = '';
        var tValueStr = '';
        for (tIdx3 = 0; tIdx3 < tKeys.length; tIdx3++) {
            var tKey = tKeys[tIdx3];
            var tValue = argValue[`${tKey}`];

            if (tValue === null) continue;

            if (tIdx3 === 0) {
                tColumeStr += tKey;
                tValueStr += `${tKey} = '${tValue}'`;
            } else {
                tColumeStr += ',' + tKey;
                tValueStr += ',' + `${tKey} = '${tValue}'`;
            }
        }
        var tRetSql = 'update ' + argTable + ' set ' + tValueStr + ' ';
        return tRetSql;
    }
}

const S030513_QRY_COMM = new RPT_S030513_QRY_COMM();
export default S030513_QRY_COMM;
