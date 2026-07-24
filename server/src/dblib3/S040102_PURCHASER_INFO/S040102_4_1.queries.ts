import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');
const moment = require('moment');

import axios from 'axios';
const Excel = require('exceljs');
const {
    generateUploadURL,
    deleteUploadObject,
    upload,
    uploadFile,
} = require('../../../routes/s3');

const config = require('../../../routes/config.js');
const nodemailer = require('nodemailer'); // 모듈 import

//  수정: 0724-01 
class S040102_COMM {
    async queryS040102_4_1(argData, contextValue) {
        var sql1 = `
            select 
                  po_cd,
                  matl_cd,
                  sum(po_qty) as po_qty, sum(use_qty) as use_qty
            from  ksv_po_mrp 
            where pu_cd = '${argData.PU_CD}'
            and   use_po_type = '1'
            and   (po_seq < 97  or po_seq > 99)
            group by po_cd, matl_cd
        `   ;
        var ret_mrp  =  await prisma.$queryRaw(Prisma.raw(sql1));
  
        var sql1_1 = `
            select po_cd, matl_cd, sum(po_qty) as po_qty, sum(use_qty) as use_qty
            from  ksv_po_mrp 
            where pu_cd = '${argData.PU_CD}'
            and   use_po_type = '1'
            and   po_seq = 99
            group by po_cd, matl_cd
        `   ;
        var ret_moq  =  await prisma.$queryRaw(Prisma.raw(sql1_1));
  
        var sql2 = `
            select po_cd , po_matl_cd as matl_cd, sum(po_qty) as po_qty, sum(use_qty) as use_qty
            from  ksv_po_mrp 
            where pu_cd = '${argData.PU_CD}'
            and   use_po_type = '2'
            group by po_cd, po_matl_cd
        `   ;
       var ret_stock  =  await prisma.$queryRaw(Prisma.raw(sql2));
  
        var sql3 = `
            select po_cd, matl_cd, sum(po_qty) as po_qty, sum(use_qty) as use_qty
            from  ksv_po_mrp 
            where pu_cd = '${argData.PU_CD}'
            and   use_po_type = '2' and diff_po_type = '5'
            group by po_cd, matl_cd
        `   ;
        var ret_mrp_stock_cancel  =  await prisma.$queryRaw(Prisma.raw(sql3));
  
        var sql4 = `
            select 'left-over' as kind, po_cd, matl_cd, sum(po_qty * (-1)) as po_qty, sum(use_qty * (-1)) as use_qty
            from  ksv_po_mrp 
            where pu_cd = '${argData.PU_CD}'
            and   use_po_type = '1'
            and   diff_po_type = '1'
            group by po_cd, matl_cd
        `   ;
        var ret_left_over  =  await prisma.$queryRaw(Prisma.raw(sql4));
  
        var sql5 = `
            select po_cd, matl_cd, sum(po_qty) as po_qty, sum(in_qty) as in_qty, sum(out_qty) as out_qty
            from  ksv_stock_mem
            where pu_cd = '${argData.PU_CD}'
            group by po_cd, matl_cd
        `   ;
        var ret_stock_mem  =  await prisma.$queryRaw(Prisma.raw(sql5));
  
        var sql0 = `
            select 
                  a0.PO_CD,
                  A3.VENDOR_CD,
                  A0.MATL_CD,
                  A3.MATL_NAME,
                  A3.COLOR,
                  A3.SPEC,
                  A3.UNIT,
                  A4.CURR_CD,
                  A6.FACTORY_CD,
                  A4.MATL_PRICE,
                  isnull(A1.PO_PRICE, a4.matl_price) as  PO_PRICE,
                  isnull(A1.MASTER_PRICE, a4.matl_price) as MASTER_PRICE,
                  isnull(A1.SURCHARGE_AMT, 0) as SURCHARGE_AMT,
                  isnull(A1.SURCHARGE_PRICE, 0) as SURCHARGE_PRICE,
                  isnull(A1.SURCHARGE_REMARK, '') as SURCHARGE_REMARK,
                  isnull(max(A6.PO_SEQ), 1) as PO_SEQ
            from  ksv_stock_mem A0 
                  left join ksv_stock_mem2 A1 on A1.pu_cd = A0.pu_cd
                                             and A1.po_cd = A0.po_cd
                                             and A1.matl_cd = A0.matl_cd,
                  KCD_MATL_MST A3,
                  KCD_MATL_MEM A4,
                  KSV_PO_MST A6
            where a0.pu_cd = '${argData.PU_CD}'
            and   a0.matl_cd = a3.matl_cd
            and   a4.matl_cd = a0.matl_cd
            and   a4.matl_seq =(select max(matl_seq) from kcd_matl_mem where matl_cd = a0.matl_cd)
            and   a6.po_cd = a0.po_cd 
            and   a6.po_seq < 97
            group  by
                  a0.PO_CD,
                  A3.VENDOR_CD,
                  A0.MATL_CD,
                  A3.MATL_NAME,
                  A3.COLOR,
                  A3.SPEC,
                  A3.UNIT,
                  A4.CURR_CD,
                  A6.FACTORY_CD,
                  A4.MATL_PRICE,
                  isnull(A1.PO_PRICE, a4.matl_price),
                  isnull(A1.MASTER_PRICE, a4.matl_price),
                  isnull(A1.SURCHARGE_AMT, 0),
                  isnull(A1.SURCHARGE_PRICE, 0),
                  isnull(A1.SURCHARGE_REMARK, '')
            order by A0.MATL_CD
        `;
        var ret0  =  await prisma.$queryRaw(Prisma.raw(sql0));
        var idx0 = 0;
  
        var tStr = '';
                tStr += `PO#`;
                tStr += `,MATL_CD`;
                tStr += `,MRP_QTY`;
                tStr += `,STOCK_QTY`;
                tStr += `,MOQ_QTY`;
                tStr += `,PO_QTY`;
                tStr += `,LEFTOVER_QTY`;
                tStr += `,PO_QTY2`;
                tStr += `,(PartIn/StsIn)`;
                tStr += `,(PartOut/StsOut)`;
        console.log(tStr);
        var tArray1 = [];
        for (idx0 = 0; idx0 < ret0.length; idx0++) {
            var tOne = { ...ret0[idx0] };
  
            var tMrpQty = 0;
            var tPoQty = 0;
            ret_mrp.forEach((col, i) => {
                if (col.po_cd === tOne.PO_CD &&
                    col.matl_cd === tOne.MATL_CD) {
                    tMrpQty += col.use_qty;
                    tPoQty += col.po_qty;
                }
            });
  
            var tMoqQty = 0;
            ret_moq.forEach((col, i) => {
                if (col.po_cd === tOne.PO_CD &&
                    col.matl_cd === tOne.MATL_CD) {
                    tMoqQty += col.use_qty;
                }
            });
  
            var tStockQty = 0;
            ret_stock.forEach((col, i) => {
                if (col.po_cd === tOne.PO_CD &&
                    col.matl_cd === tOne.MATL_CD) {
                    tStockQty += col.po_qty;
                }
            });
  
            ret_mrp_stock_cancel.forEach((col, i) => {
                if (col.po_cd === tOne.PO_CD &&
                    col.matl_cd === tOne.MATL_CD) {
                    tMrpQty += col.po_qty;
                }
            });
  
            var tLeftOverQty = 0;
            ret_left_over.forEach((col, i) => {
                if (col.po_cd === tOne.PO_CD &&
                    col.matl_cd === tOne.MATL_CD) {
                    tLeftOverQty += col.po_qty;
                }
            });
  
            var tPoQty2 = 0;
            var tPartStsInQty = 0;
            var tPartStsOutQty = 0;
            ret_stock_mem.forEach((col, i) => {
                if (col.po_cd === tOne.PO_CD &&
                    col.matl_cd === tOne.MATL_CD) {
                    tPoQty2 += col.po_qty;
                    tPartStsInQty += col.in_qty;
                    tPartStsOutQty += col.out_qty;
                }
            });
  
            if (tLeftOverQty > 0) {
                if (tPoQty2 > tLeftOverQty) tPoQty2 -= tLeftOverQty;
                if (tPartStsInQty > tLeftOverQty) tPartStsInQty -= tLeftOverQty;
                if (tPartStsOutQty > tLeftOverQty) tPartStsOutQty -= tLeftOverQty;
            }
  
            var tBalStsInQty = tPoQty2 - tPartStsInQty;
            var tBalStsOutQty = tPartStsInQty - tPartStsOutQty;
  
            var tStr = '';
                tStr += `${tOne.PO_CD}`;
                tStr += `,${tOne.MATL_CD}`;
                tStr += `,${tMrpQty}`;
                tStr += `,${tStockQty}`;
                tStr += `,${tMoqQty}`;
                tStr += `,${tPoQty}`;
                tStr += `,${tLeftOverQty}`;
                tStr += `,${tPoQty2}`;
                tStr += `,(${tPartStsInQty}`;
                tStr += `,${tBalStsInQty})`;
                tStr += `,(${tPartStsOutQty}`;
                tStr += `,${tBalStsOutQty})`;
            console.log(`${tStr}`);

            var wObj = { ...tOne };
            wObj.PU_CD = argData.PU_CD;
            wObj.PU_STATUS = '-';
            if (parseFloat(tPartStsInQty) > 0) wObj.PU_STATUS = 'PartIn';
            wObj.MRP_QTY = parseFloat(tMrpQty).toFixed(2);
            wObj.STOCK_QTY = parseFloat(tStockQty).toFixed(2);
            wObj.MOQ_QTY = parseFloat(tMoqQty).toFixed(2);
            wObj.OVER_QTY = '0';
            wObj.LEFTOVER_QTY = parseFloat(tLeftOverQty).toFixed(2);
            wObj.PO_QTY = parseFloat(tPoQty2).toFixed(2);
            wObj.PO_UPDATE_QTY = parseFloat(tPoQty2).toFixed(2);
            wObj.DIFF_QTY = '0';
            wObj.STSIN_PO_QTY = parseFloat(tPoQty2).toFixed(2);
            wObj.STSIN_IN_QTY = parseFloat(tPartStsInQty).toFixed(2);
            wObj.STSIN_OUT_QTY = parseFloat(tPartStsOutQty).toFixed(2);
            tArray1.push(wObj);
        }

        var tArray2 = [];
        var saveObj = {};
        tArray1.forEach((col, i) => {
            if (i === 0) {
                saveObj = { ...col };
                saveObj.DATAS = [];
                saveObj.DATAS.push(col);
            } else {
                if (saveObj.MATL_CD === col.MATL_CD) {
                    saveObj.MRP_QTY = parseFloat(saveObj.MRP_QTY) + parseFloat(col.MRP_QTY);
                    saveObj.STOCK_QTY = parseFloat(saveObj.STOCK_QTY) + parseFloat(col.STOCK_QTY);
                    saveObj.MOQ_QTY = parseFloat(saveObj.MOQ_QTY) + parseFloat(col.MOQ_QTY);
                    saveObj.OVER_QTY = parseFloat(saveObj.OVER_QTY) + parseFloat(col.OVER_QTY);
                    saveObj.LEFTOVER_QTY = parseFloat(saveObj.LEFTOVER_QTY) + parseFloat(col.LEFTOVER_QTY);
                    saveObj.PO_QTY = parseFloat(saveObj.PO_QTY) + parseFloat(col.PO_QTY);
                    saveObj.PO_UPDATE_QTY = parseFloat(saveObj.PO_UPDATE_QTY) + parseFloat(col.PO_UPDATE_QTY);
                    saveObj.DIFF_QTY = parseFloat(saveObj.DIFF_QTY) + parseFloat(col.DIFF_QTY);
                    saveObj.STSIN_PO_QTY = parseFloat(saveObj.STSIN_PO_QTY) + parseFloat(col.STSIN_PO_QTY);
                    saveObj.STSIN_IN_QTY = parseFloat(saveObj.STSIN_IN_QTY) + parseFloat(col.STSIN_IN_QTY);
                    saveObj.STSIN_OUT_QTY = parseFloat(saveObj.STSIN_OUT_QTY) + parseFloat(col.STSIN_OUT_QTY);
                    saveObj.PO_CD = `${saveObj.PO_CD}/${col.PO_CD}`;
                    saveObj.DATAS.push(col);
                } else {
                    tArray2.push(saveObj);

                    saveObj = { ...col };
                    saveObj.DATAS = [];
                    saveObj.DATAS.push(col);
                }
            }
        });
        tArray2.push(saveObj);

        var printArray3 = [];        
        var tArray2_1 = [];
        tArray2.forEach((tOne, i) => {
            var tStr = `${tOne.PU_CD}`;
            tStr += `,${tOne.PU_STATUS}`;
            tStr += `,${tOne.MATL_CD}`;
            tStr += `,${tOne.MRP_QTY}`;
            tStr += `,${tOne.STOCK_QTY}`;
            tStr += `,${tOne.MOQ_QTY}`;
            tStr += `,${tOne.OVER_QTY}`;
            tStr += `,${tOne.PO_QTY}`;
            tStr += `,${tOne.PO_UPDATE_QTY}`;
            tStr += `,${tOne.DIFF_QTY}`;
            tStr += `,${tOne.PO_CD}`;
            tStr += `,${tOne.PO_SEQ}`;
            printArray3.push(tStr);
            printArray3.push(`==================>`);
            tOne.DATAS.forEach((col2, i2) => {
                var tStr = `${col2.PU_CD}`;
                tStr += `,${col2.PU_STATUS}`;
                tStr += `,${col2.MATL_CD}`;
                tStr += `,${col2.MRP_QTY}`;
                tStr += `,${col2.STOCK_QTY}`;
                tStr += `,${col2.MOQ_QTY}`;
                tStr += `,${col2.OVER_QTY}`;
                tStr += `,${col2.PO_QTY}`;
                tStr += `,${col2.PO_UPDATE_QTY}`;
                tStr += `,${col2.DIFF_QTY}`;
                tStr += `,${col2.PO_CD}`;
                tStr += `,${col2.PO_SEQ}`;
                printArray3.push(tStr);
            });
            printArray3.push(`------------------------`);
        });
        console.log(`==============>Print 3 `);
        console.log('++++ pu#/pu_status/matl#/mrp/stock/moq/over/po/po_update/diff');
        printArray3.forEach((col, i) => {
            console.log(col);
        });

        var tWObj = {};
        tWObj.STOCK_MEM = [...tArray2];

        return tWObj;
    }
}

// export default로 Query 내용 내보내기
const moduleQuery_S040102_4_1 = {
    Query: {
        mgrQueryS040102_EXCEL_PURCHASE_NORMAL: async (
            _,
            args,
            contextValue,
        ) => {
            /* Vendor type 구분 : V0606 - YKK,  '3' : Import, '5': Factory , '그외':  Normal */
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput1 = {
                ...args.data,
            }; // List1의 결과  (2_1)
            var tInput2 = {
                ...args.data1,
            }; // PU_SEQ, KIND (ALL, BAL, '')
            var tInput3 = [...args.data2]; // List3의 결과  (4_1)

            var tPoCds = tInput1.PO_CD2.replace('/', '_');
            var tPoCdArray = tPoCds.split('_');

            var tInPoCds = `'99'`;
            tPoCdArray.forEach((col, i) => {
                tInPoCds += `, '${col}'`;
            });

            var tVendorName = tInput1.VENDOR_NAME.replace(/ /gi, '_');
            tVendorName = tVendorName.replace(/\(/gi, '_');
            tVendorName = tVendorName.replace(/\)/gi, '_');

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
                var tTemplateExcel = `${tPath0}/PO_POLIST.xlsx`;

                var fileUrl = '';
                var tWExcelFile = '';

                var tIdx8 = 0;
                for (tIdx8 = 0; tIdx8 < tPoCdArray.length; tIdx8++) {
                    var tPoCd = tPoCdArray[tIdx8];

                    tWExcelFile = '';
                    if (tInput2.KIND === 'ALL')
                        tWExcelFile = `PO_POLIST_${tVendorName}_${tPoCd}_SEQ-ALL_${tRetDate1}_${tInput1.PU_CD}`;
                    else if (tInput2.KIND === 'BAL')
                        tWExcelFile = `PO_POLIST_${tVendorName}_${tPoCd}_SEQ-Bal_${tRetDate1}_${tInput1.PU_CD}`;
                    else
                        tWExcelFile = `PO_POLIST_${tVendorName}_${tPoCd}_SEQ-${tInput2.PU_SEQ}_${tRetDate1}_${tInput1.PU_CD}`;

                    const wb = new Excel.Workbook();
                    await wb.xlsx.readFile(tTemplateExcel);

                    var tSheetName = `PO19-1580`;
                    var sheet = wb.getWorksheet(tSheetName);
                    // const sheet = wb.getWorksheet(1);

                    var sql0_1 = `
                        select
                            max(pu_seq) as max_pu_seq
                        from
                            ksv_pu_mem2
                        where
                            pu_cd = '${tInput1.PU_CD}'
                            and po_cd = '${tPoCd}'
                    `;
                    var tRet0_1 = await prisma.$queryRaw(Prisma.raw(sql0_1));
                    var tMaxPuSeq = 1;
                    if (tRet0_1.length > 0) tMaxPuSeq = tRet0_1[0].max_pu_seq;

                    var sql0 = `
                        select
                            max(po_seq) as max_po_seq
                        from
                            ksv_po_mst
                        where
                            po_cd = '${tPoCd}'
                            and po_seq < 97
                    `;
                    var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                    var tMaxPoSeq = 1;
                    if (tRet0.length > 0) tMaxPoSeq = tRet0[0].max_po_seq;

                    var sql1 = `
                        select
                            email
                        from
                            kcd_user
                        where
                            user_id = '${tUserInfo.USER_ID}'
                    `;
                    var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                    var tEmail = '';
                    if (tRet1.length > 0) tEmail = tRet1[0].email;

                    var sql2 = `
                        select
                            top 1 c.factory_name,
                            c.addr1,
                            c.addr2,
                            c.tel_no,
                            c.fax_no
                        from
                            ksv_po_mst a,
                            kcd_factory c
                        where
                            a.po_cd = '${tPoCd}'
                            and c.factory_cd = a.factory_cd
                    `;
                    var tRet2 = await prisma.$queryRaw(Prisma.raw(sql2));
                    var tFactoryObj = {
                        ...tRet2[0],
                    };

                    sheet.getCell(6, 38).value = tFactoryObj.factory_name;

                    var sql22 = `
                        select
                            place_name
                        from
                            kcd_place
                        where
                            place_cd = '${tInput1.PLACE_CD}'
                    `;
                    var tRet22 = await prisma.$queryRaw(Prisma.raw(sql22));
                    var tPlaceName = '';
                    if (tRet22.length > 0) tPlaceName = tRet22[0].place_name;

                    var sql21 = `
                        SELECT
                            top 10 a.po_cd,
                            b.order_cd,
                            SUBSTRING(a.plan_etd, 1, 4) + '-' + SUBSTRING(a.plan_etd, 5, 2) + '-' + SUBSTRING(a.plan_etd, 7, 2) AS duedate,
                            d.style_name,
                            e.buyer_name
                        FROM
                            KSV_PO_MST a,
                            KSV_PO_MEM b,
                            ksv_order_mst c,
                            kcd_style d,
                            kcd_buyer e
                        WHERE
                            a.PO_CD = '${tPoCd}'
                            and a.po_seq = '1'
                            and b.PO_CD = a.PO_CD
                            and b.PO_SEQ = a.PO_SEQ
                            and b.order_cd = c.order_cd
                            and c.style_cd = d.style_cd
                            and left(b.order_cd, 2) = e.buyer_cd
                    `;
                    var tRet21 = await prisma.$queryRaw(Prisma.raw(sql21));
                    var tShipDate = tInput1.DUE_DATE;
                    var tOrderCnt = tRet21.length;
                    if (tRet21.length > 0) {
                        sheet.getCell(6, 7).value = tRet21[0].po_cd;
                        sheet.getCell(6, 25).value = tRetDate1;
                        var tOrderCds = '';
                        tRet21.forEach((col, i) => {
                            if (i === 0) tOrderCds = col.order_cd;
                            else tOrderCds += `/${col.order_cd}`;
                            if (i < 5)
                                sheet.getCell(8 + i, 8).value =
                                    `${col.order_cd}/${col.style_name}`;
                            else if (i > 4)
                                sheet.getCell(3 + i, 28).value =
                                    `${col.order_cd}/${col.style_name}`;
                        });
                        sheet.getCell(7, 38).value = tPlaceName;
                        tShipDate = tRet21[0].duedate;
                        sheet.getCell(7, 27).value = tInput1.DUE_DATE;
                        sheet.getCell(7, 7).value =
                            `(${tRet21[0].order_cd.substring(0, 2)})${tRet21[0].buyer_name}`;
                    }

                    var sql3 = `
                        select
                            vendor_name,
                            vendor_cd,
                            reg_no,
                            user_name
                        from
                            kcd_vendor
                        where
                            vendor_cd = '${tInput1.VENDOR_CD}'
                    `;
                    var tRet3 = await prisma.$queryRaw(Prisma.raw(sql3));
                    var tVendorObj = {
                        ...tRet3[0],
                    };

                    sheet.getCell(3, 11).value = tVendorObj.vendor_name;
                    sheet.getCell(4, 11).value = tVendorObj.reg_no;

                    var sql4 = `
                        select
                            user_id,
                            user_name,
                            email,
                            tel_no,
                            factory_cd
                        from
                            kcd_user
                        where
                            user_id = '${tUserInfo.USER_ID}'
                    `;
                    var tRet4 = await prisma.$queryRaw(Prisma.raw(sql4));
                    var tUserObj = {
                        ...tRet4[0],
                    };
                    sheet.getCell(3, 35).value = tUserObj.user_name;
                    sheet.getCell(4, 31).value = tUserObj.email;
                    sheet.getCell(4, 38).value = tUserObj.tel_no;

                    // 발주내역
                    var sql5 = '';
                    var tPurchaseObj = [];
                    if (tInput2.KIND === 'ALL') {
                        sql5 = `
                            SELECT
                                a.po_cd -- 1
                            ,
                                b.matl_cd -- 3
                            ,
                                b.color -- 4
                            ,
                                b.matl_name --5 
                            ,
                                b.spec --6
                            ,
                                b.unit -- 7
                            ,
                                b.unit -- 8
                            ,
                                b.weight --9
                            ,
                                sum(a.po_qty) as bal -- 12
                            FROM
                                KSV_PO_MRP a,
                                KCD_MATL_MST b
                            WHERE
                                a.PO_CD = '${tPoCd}'
                                AND b.VENDOR_CD = '${tInput1.VENDOR_CD}'
                                and a.matl_cd = b.matl_cd
                                and a.use_po_type = '1'
                                and a.diff_po_type <> '1'
                            GROUP BY
                                a.po_cd,
                                b.matl_cd,
                                b.matl_name,
                                b.spec,
                                b.color,
                                b.unit,
                                b.weight
                            having
                                sum(a.po_qty) > 0
                            ORDER BY
                                b.matl_name,
                                b.spec,
                                b.color
                        `;
                        tPurchaseObj = await prisma.$queryRaw(Prisma.raw(sql5));
                    } else if (tInput2.KIND === 'BAL') {
                        sql5 = `
                            select
                                e.po_cd, -- 1
                                f.matl_cd, --3
                                b.color, --4
                                b.matl_name, -- 5
                                b.spec, --6
                                b.unit, --7
                                b.unit, --8 
                                b.weight, -- 9
                                d.matl_price, -- 10
                                d.curr_cd, -- 11
                                sum(f.po_qty) - sum(f.in_qty) as bal -- 12
                                -- (sum(f.po_qty)-sum(f.in_qty))*d.matl_price as amt
                            from
                                kcd_matl_mst b,
                                kcd_vendor c,
                                ksv_po_mst e,
                                ksv_stock_mem f,
                                kcd_matl_mem d
                            where
                                e.po_status = '4'
                                and e.po_seq = '1'
                                -- and e.plan_flag = '1' 
                                and e.po_cd = '${tPoCd}'
                                and f.po_cd = e.po_cd
                                and b.matl_cd = f.matl_cd
                                and b.vendor_cd = '${tInput1.VENDOR_CD}'
                                and c.vendor_cd = b.vendor_cd
                                and d.matl_cd = b.matl_cd
                                and d.matl_seq = f.matl_seq
                            group by
                                e.po_cd,
                                b.matl_name,
                                b.color,
                                b.spec,
                                b.unit,
                                b.weight,
                                f.matl_cd,
                                f.matl_seq,
                                d.matl_price,
                                d.curr_cd
                            having
                                sum(f.po_qty) > sum(f.in_qty)
                                and sum(f.po_qty) - sum(f.in_qty) > 0
                                and sum(f.po_qty) > 0
                        `;
                        tPurchaseObj = await prisma.$queryRaw(Prisma.raw(sql5));
                    } else {
                        tInput3.forEach((col, i) => {
                            var tObj = {};
                            tObj.po_cd = col.PO_CD;
                            tObj.matl_cd = col.MATL_CD;
                            tObj.matl_name = col.MATL_NAME;
                            tObj.spec = col.SPEC;
                            tObj.color = col.COLOR;
                            tObj.unit = col.UNIT;
                            tObj.bal = col.PO_QTY;
                            tPurchaseObj.push(tObj);
                        });
                    }

                    var tTotQty = 0;
                    var tTotAmt = 0;
                    var tTotUsdAmt = 0;

                    var tRowIdx = 14;
                    var tIdx2 = 0;
                    for (tIdx2 = 0; tIdx2 < tPurchaseObj.length; tIdx2++) {
                        var col = tPurchaseObj[tIdx2];

                        sheet.getCell(tRowIdx, 1).value = tIdx2 + 1;
                        sheet.getCell(tRowIdx, 3).value = col.matl_cd;
                        sheet.getCell(tRowIdx, 23).value = col.color;
                        sheet.getCell(tRowIdx, 7).value = col.matl_name;
                        sheet.getCell(tRowIdx + 1, 7).value = col.spec;
                        sheet.getCell(tRowIdx, 31).value = col.unit;
                        sheet.getCell(tRowIdx, 33).value = col.bal;

                        var sql51 = `
                            SELECT
                                top 1 a.matl_price,
                                a.curr_cd,
                                c.usd_rate
                            FROM
                                kcd_matl_mem a,
                                ksv_po_mrp b,
                                kcd_curr_com c
                            WHERE
                                a.matl_cd = '${col.matl_cd}'
                                and b.po_cd = '${col.po_cd}'
                                AND a.matl_cd = b.matl_cd
                                AND a.matl_seq = b.matl_seq
                                and a.curr_cd = c.curr_cd
                                and c.start_date = (
                                    select
                                        max(start_date)
                                    from
                                        kcd_curr_com
                                )
                        `;
                        var tRet51 = await prisma.$queryRaw(Prisma.raw(sql51));

                        var tMatlPrice = '';
                        var tCurrCd = '';
                        var tUsdRate = '';
                        if (tRet51.length > 0) {
                            tMatlPrice = tRet51[0].matl_price;
                            tCurrCd = tRet51[0].curr_cd;
                            tUsdRate = tRet51[0].usd_rate;
                        }
                        tInput3.forEach((col1, i) => {
                            if (
                                col1.PO_CD === col.po_cd &&
                                col1.MATL_CD === col.matl_cd
                            ) {
                                tMatlPrice = col1.PO_PRICE;
                                tCurrCd = col1.CURR_CD;
                            }
                        });

                        var tAmt = parseFloat(tMatlPrice) * parseFloat(col.bal);
                        var tUsdAmt =
                            parseFloat(tMatlPrice) *
                            parseFloat(col.bal) *
                            tUsdRate;
                        sheet.getCell(tRowIdx, 38).value = tMatlPrice;
                        sheet.getCell(tRowIdx, 36).value = tCurrCd;
                        sheet.getCell(1136, 31).value = tCurrCd;

                        tTotAmt += tAmt;
                        tTotUsdAmt += tUsdAmt;
                        tTotQty += parseFloat(col.bal);

                        tRowIdx += 2;
                    }
                    sheet.getCell(1136, 36).value = tTotAmt;

                    var sql7 = `
                        SELECT
                            a.po_cd,
                            a.z,
                            a.matl_cd,
                            b.matl_name,
                            b.spec,
                            b.color,
                            b.unit,
                            b.weight,
                            d.matl_price,
                            d.curr_cd,
                            sum(a.po_qty) as bal,
                            sum(a.po_qty) * d.matl_price as amt
                        FROM
                            KSV_PO_MRP a,
                            KCD_MATL_MST b,
                            kcd_matl_mem d
                        WHERE
                            a.PO_CD = '${tPoCd}'
                            AND b.VENDOR_CD = '${tInput1.VENDOR_CD}'
                            and a.matl_cd = b.matl_cd
                            and a.use_po_type = '1'
                            and a.diff_po_type <> '1'
                            and d.matl_cd = b.matl_cd
                            and d.matl_seq = a.matl_seq
                        GROUP BY
                            a.po_cd,
                            a.po_seq,
                            a.matl_cd,
                            b.matl_name,
                            b.spec,
                            b.color,
                            b.unit,
                            b.weight,
                            d.matl_price,
                            d.curr_cd
                        having
                            sum(a.po_qty) < 0
                        ORDER BY
                            b.matl_name,
                            b.spec,
                            b.color
                    `;
                    var tRet7 = await prisma.$queryRaw(Prisma.raw(sql7));

                    var tTotQty = 0;
                    var tTotAmt = 0;
                    tRet7.forEach((col, i) => {
                        sheet.getCell(tRowIdx, 1).value = i + 1;
                        sheet.getCell(tRowIdx, 3).value = col.matl_cd;
                        sheet.getCell(tRowIdx, 23).value = col.color;
                        sheet.getCell(tRowIdx, 7).value = col.matl_name;
                        sheet.getCell(tRowIdx + 1, 7).value = col.spec;
                        sheet.getCell(tRowIdx, 31).value = col.unit;
                        sheet.getCell(tRowIdx, 38).value = col.matl_price;
                        sheet.getCell(tRowIdx, 36).value = col.curr_cd;
                        sheet.getCell(tRowIdx, 33).value = col.bal;
                        sheet.getCell(tRowIdx, 41).value = 'Cancel';

                        tRowIdx += 2;
                    });

                    // Sheet 변경
                    tSheetName = `ORDER DETAIL`;
                    sheet = wb.getWorksheet(tSheetName);
                    var sql8 = `
                        SELECT
                            a.order_cd,
                            G.matl_name,
                            G.color,
                            G.spec,
                            G.unit,
                            sum(E.po_qty) as bal,
                            c.style_name,
                            G.matl_cd,
                            a.ref_order_no
                        FROM
                            KCD_MATL_MST G,
                            KSV_PO_MRP E,
                            ksv_order_mst a,
                            kcd_style c
                        WHERE
                            G.MATL_CD = E.MATL_CD
                            and E.ORDER_CD = a.ORDER_CD
                            and a.style_cd = c.style_cd
                            and (G.VENDOR_CD = '${tInput1.VENDOR_CD}')
                            AND (E.PO_CD = '${tPoCd}')
                            and e.use_po_type = '1'
                        group by
                            a.order_cd,
                            g.matl_name,
                            g.color,
                            g.spec,
                            g.unit,
                            c.style_name,
                            g.matl_cd,
                            a.ref_order_no
                        having
                            sum(E.PO_QTY) > 0
                        ORDER BY
                            a.ORDER_CD,
                            G.MATL_NAME,
                            G.SPEC
                    `;
                    var tRet8 = await prisma.$queryRaw(Prisma.raw(sql8));

                    sheet.getCell(3, 1).value = `P/O No. :${tPoCd}`;
                    sheet.getCell(4, 3).value = `Shipping Date : ${tShipDate}`;
                    sheet.getCell(4, 6).value = tInput1.VENDOR_NAME;
                    sheet.getCell(2, 6).value = tRetDate1;

                    var tSaveOrder = '';
                    var tRowIdx = 5;
                    var tIdx3 = 0;

                    for (tIdx3 = 0; tIdx3 < tRet8.length; tIdx3++) {
                        var col = tRet8[tIdx3];
                        if (col.order_cd !== tSaveOrder) {
                            if (tSaveOrder === '') tRowIdx += 1;
                            else tRowIdx += 3;
                            sheet.getCell(tRowIdx, 1).value = col.order_cd;
                            sheet.getCell(tRowIdx, 2).value = col.style_name;
                            sheet.getCell(tRowIdx, 3).value = col.ref_order_no;
                            tRowIdx += 2;
                            tSaveOrder = col.order_cd;
                        }
                        sheet.getCell(tRowIdx, 1).value = col.matl_cd;
                        sheet.getCell(tRowIdx, 2).value = col.matl_name;
                        sheet.getCell(tRowIdx, 3).value = col.spec;
                        sheet.getCell(tRowIdx, 4).value = col.color;
                        sheet.getCell(tRowIdx, 5).value = col.unit;
                        sheet.getCell(tRowIdx, 6).value = col.bal;
                        var tmpData = ['', '', '', '', '', 0];
                        sheet.insertRow(tRowIdx + 1, tmpData, 'i');
                        tRowIdx += 1;
                    }
                    sheet.duplicateRow(tRowIdx, 100, false);

                    // Excel Write
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

                    // var tExcelFileName0 = `OrderSheet-${args.data.ORDER_CD}-${tUserInfo.USER_ID}-${tRetDate}.xlsx`;
                    var tExcelFileName = `${tPath}/${tWExcelFile}.xlsx`;
                    // const fileData = await wb.xlsx.writeBuffer();
                    // fs.createWriteStream(tExcelFileName).write(fileData);

                    var tInObj0 = {};
                    tInObj0.NAME = tWExcelFile;
                    const _uploadGen0 = await generateUploadURL();
                    tInObj0.URL = _uploadGen0.uploadURL.split('?')[0];
                    tInObj0.TITLE = tWExcelFile;
                    tInObj0.FILE_KEY = tWExcelFile;
                    tInObj0.KIND = 'S040102';
                    await upload(
                        `${tWExcelFile}.xlsx`,
                        wb,
                        _uploadGen0.uploadURL,
                    );
                    fileUrl = tInObj0.URL;

                    //
                    var tSQLArray = [];

                    let tSQL99 = `
                        update ksv_po_vendor
                        set
                            end_date = '${tRetDate1}'
                        where
                            pu_cd = '${tInput1.PU_CD}'
                            and po_cd = '${tPoCd}'
                            and vendor_cd = '${tInput1.VENDOR_CD}'
                    `;
                    var tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
                        delete from ksv_mail_log
                        where
                            pu_cd = '${tInput1.PU_CD}'
                            and pu_seq = '${tInput2.PU_SEQ}'
                            and po_cd = '${tPoCd}'
                            and po_seq = '${tMaxPoSeq}'
                            and vendor_cd = '${tInput1.VENDOR_CD}'
                    `;
                    var tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    var tInObj = {};
                    tInObj.send_kind = tInput2.KIND;
                    tInObj.user_id = tUserInfo.USER_ID;
                    tInObj.po_cd = tPoCd;
                    tInObj.po_seq = tMaxPoSeq;
                    tInObj.vendor_cd = tInput1.VENDOR_CD;
                    tInObj.send_email = tEmail;
                    tInObj.send_datetime = tRetDate;
                    tInObj.send_flag = '1';
                    tInObj.send_filename = `${tWExcelFile}.xlsx`;
                    tInObj.pu_cd = tInput1.PU_CD;
                    // tInObj.pu_seq = tMaxPuSeq;
                    tInObj.pu_seq = tInput2.PU_SEQ;
                    tInObj.send_fileurl = tInObj0.URL;
                    let tSQL99 = AFLib.createTableSql('ksv_mail_log', tInObj);
                    var tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    global.currentTransactionInfo = {
                        contextValue: contextValue,
                        functionName: AFLib.getFunctionName(),
                    };
                    await prisma.$transaction(tSQLArray);
                    delete global.currentTransactionInfo;

                    // Mail
                    var tTitle = '';
                    if (tInput2.KIND === 'ALL')
                        tTitle = `${tPoCd}_${tInput1.BUYER_CD}_${tInput1.VENDOR_NAME} 발주서 SEQ-ALL`;
                    else if (tInput2.KIND === 'BAL')
                        tTitle = `${tPoCd}_${tInput1.BUYER_CD}_${tInput1.VENDOR_NAME} 발주서 SEQ-BAL`;
                    else
                        tTitle = `${tPoCd}_${tInput1.BUYER_CD}_${tInput1.VENDOR_NAME} 발주서 SEQ-${tInput2.PU_SEQ}`;

                    var tBody = '';
                    tBody += `<!DOCTYPE html>` + '\r\n';
                    tBody += `<html><head><title>발주서</title>` + '\r\n';
                    tBody += `</head><body><div>` + '\r\n';
                    tBody += `<p>안녕하세요?</p>` + '\r\n';
                    tBody +=
                        `<p>${tPoCd}_${tInput1.BUYER_CD} 건으로 발주서 보내드립니다</p>` +
                        '\r\n';
                    tBody += `<p>바이어명 : ${tInput1.BUYER_NAME}</p>` + '\r\n';
                    tBody +=
                        `<p>납품요구일자 : ${tInput1.EX_FACTORY}</p>` + '\r\n';
                    tBody += `<p>납품장소 : ${tInput1.PLACE_CD}</p>` + '\r\n';
                    tBody +=
                        `<p>쉬핑마크 : ${tFactoryObj.factory_name}</p>` +
                        '\r\n';
                    tBody += `<p>*필독 사항*</p>` + '\r\n';
                    tBody +=
                        `<p>1. 발주서를 받으신후, 2일 이내에 납기 및 단가를 확인하시고 회신하여 주십시오.</p>` +
                        '\r\n';
                    tBody +=
                        `<p>2. 규격란에 기재된 폭(특히 원단류 가용/전폭) 품명, 코드 등에 오류가 있거나 불일치 할 경우 반드시 이메일로 사전 인폼 주시기 바랍니다.</p>` +
                        '\r\n';
                    tBody +=
                        `<p>3. 쉬핑마크에 발주번호, 오더번호, 품명, 색상, 혼용율, 폭(원단만 기재), 수량, C/T NO, 원산지 까지 기재하여 주십시오.</p>` +
                        '\r\n';
                    tBody +=
                        `<p>4. 납품요구일자를 지키지 못할 시 공장까지의 운임은 업체 부담입니다. 납품요구일자 내 출고가 어려>운 경우 사전에 꼭 연락 주시기 바랍니다.</p>` +
                        '\r\n';
                    tBody +=
                        `<p>발주서: <a href="${tInObj0.URL}">${tWExcelFile} </a> </p>` +
                        '\r\n';
                    tBody += `<p>Thanks & Best regards.</p>` + '\r\n';
                    tBody +=
                        `<p>${tUserObj.user_id} ${tUserObj.user_name}</p>` +
                        '\r\n';
                    tBody += `<p>Shin Textile Solutions.</p>` + '\r\n';
                    tBody += `<p>Direct Phone#:${tUserObj.tel_no}</p>` + '\r\n';
                    tBody += `</div></body></html>` + '\r\n';

                    /*  mrzx tbuy olvd stvb */
                    const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        host: 'smtp.gmail.com',
                        port: 587,
                        secure: false,
                        auth: {
                            user: 'won21kr@gmail.com',
                            pass: 'mrzxtbuyolvdstvb',
                        },
                    });

                    const mailOptions = {
                        from: 'ybwon21kr001@gmail.com', // 작성자
                        to: 'won21kr@gmail.com', // 수신자
                        subject: tTitle, // 메일 제목
                        text: tBody, // 메일 내용
                        html: tBody, // 메일 내용
                    };

                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });
                }

                //
                console.log('Success excel:' + tWExcelFile);
                var tRetArray = [];
                var tObj = {};
                tObj.id = 1;
                // tObj.CODE = `SUCCESS:${tWExcelFile}.xlsx`;
                tObj.CODE = `SUCCESS?${tWExcelFile}.xlsx?${fileUrl}`;
                tRetArray.push(tObj);
                return tRetArray;
            } catch (error) {
                var tRetArray = [];
                var tObj = {};
                tObj.id = 1;
                tObj.CODE = `ERROR:${error.message}`;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },

        mgrQueryS040102_EXCEL_PURCHASE_YKK: async (_, args, contextValue) => {
            /* Vendor type 구분 : V0606 - YKK,  '3' : Import, '5': Factory , '그외':  Normal */
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput1 = {
                ...args.data,
            }; // List1의 결과  (2_1)
            var tInput2 = {
                ...args.data1,
            }; // PU_SEQ, KIND (ALL, BAL, '')
            var tInput3 = [...args.data2]; // List3의 결과  (4_1)

            var tPoCds = tInput1.PO_CD2.replace('/', '_');
            var tPoCdArray = tPoCds.split('_');

            var tInPoCds = `'99'`;
            tPoCdArray.forEach((col, i) => {
                tInPoCds += `, '${col}'`;
            });

            var tVendorName = tInput1.VENDOR_NAME.replace(/ /gi, '_');
            tVendorName = tVendorName.replace(/\(/gi, '_');
            tVendorName = tVendorName.replace(/\)/gi, '_');

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
                var tTemplateExcel = `${tPath0}/PO_POLIST(YKK).xlsx`;

                var fileUrl = '';
                var tWExcelFile = '';

                var tIdx8 = 0;
                for (tIdx8 = 0; tIdx8 < tPoCdArray.length; tIdx8++) {
                    var tPoCd = tPoCdArray[tIdx8];

                    tWExcelFile = '';
                    if (tInput2.KIND === 'ALL')
                        tWExcelFile = `PO_POLIST_${tVendorName}_${tPoCd}_SEQ-ALL_${tRetDate1}_${tInput1.PU_CD}`;
                    else if (tInput2.KIND === 'BAL')
                        tWExcelFile = `PO_POLIST_${tVendorName}_${tPoCd}_SEQ-Bal_${tRetDate1}_${tInput1.PU_CD}`;
                    else
                        tWExcelFile = `PO_POLIST_${tVendorName}_${tPoCd}_SEQ-${tInput2.PU_SEQ}_${tRetDate1}_${tInput1.PU_CD}`;

                    const wb = new Excel.Workbook();
                    await wb.xlsx.readFile(tTemplateExcel);

                    var tSheetName = `Sheet1 (2)`;
                    var sheet = wb.getWorksheet(tSheetName);
                    // const sheet = wb.getWorksheet(1);

                    var sql0_1 = `
                        select
                            max(pu_seq) as max_pu_seq
                        from
                            ksv_pu_mem2
                        where
                            pu_cd = '${tInput1.PU_CD}'
                            and po_cd = '${tPoCd}'
                    `;
                    var tRet0_1 = await prisma.$queryRaw(Prisma.raw(sql0_1));
                    var tMaxPuSeq = 1;
                    if (tRet0_1.length > 0) tMaxPuSeq = tRet0_1[0].max_pu_seq;

                    var sql0 = `
                        select
                            max(po_seq) as max_po_seq
                        from
                            ksv_po_mst
                        where
                            po_cd = '${tPoCd}'
                            and po_seq < 97
                    `;
                    var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                    var tMaxPoSeq = 1;
                    if (tRet0.length > 0) tMaxPoSeq = tRet0[0].max_po_seq;

                    var sql1 = `
                        select
                            email
                        from
                            kcd_user
                        where
                            user_id = '${tUserInfo.USER_ID}'
                    `;
                    var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                    var tEmail = '';
                    if (tRet1.length > 0) tEmail = tRet1[0].email;

                    var sql2 = `
                        select
                            top 1 c.factory_name,
                            c.addr1,
                            c.addr2,
                            c.tel_no,
                            c.fax_no
                        from
                            ksv_po_mst a,
                            kcd_factory c
                        where
                            a.po_cd = '${tPoCd}'
                            and c.factory_cd = a.factory_cd
                    `;
                    var tRet2 = await prisma.$queryRaw(Prisma.raw(sql2));
                    var tFactoryObj = {
                        ...tRet2[0],
                    };

                    sheet.getCell(6, 25).value = tFactoryObj.factory_name;

                    var sql21 = `
                        SELECT distinct
                            a.po_cd,
                            b.order_cd,
                            SUBSTRING(a.plan_etd, 1, 4) + '-' + SUBSTRING(a.plan_etd, 5, 2) + '-' + SUBSTRING(a.plan_etd, 7, 2) AS duedate
                        FROM
                            KSV_PO_MST a,
                            KSV_PO_MEM b
                        WHERE
                            a.PO_CD = '${tPoCd}'
                            and a.po_seq = '1'
                            and b.PO_CD = a.PO_CD
                            and b.PO_SEQ = a.PO_SEQ
                    `;
                    var tRet21 = await prisma.$queryRaw(Prisma.raw(sql21));
                    var tShipDate = tInput1.DUE_DATE;
                    if (tRet21.length > 0) {
                        sheet.getCell(6, 6).value = tPoCd;
                        sheet.getCell(6, 17).value = tRetDate1;
                        var tOrderCds = '';
                        tRet21.forEach((col, i) => {
                            if (i === 0) tOrderCds = col.order_cd;
                            else tOrderCds += `/${col.order_cd}`;
                        });
                        sheet.getCell(7, 6).value = tOrderCds;
                        tShipDate = tRet21[0].duedate;
                        sheet.getCell(8, 42).value = tShipDate;
                    }

                    var sql3 = `
                        select
                            vendor_name,
                            vendor_cd,
                            reg_no,
                            user_name
                        from
                            kcd_vendor
                        where
                            vendor_cd = '${tInput1.VENDOR_CD}'
                    `;
                    var tRet3 = await prisma.$queryRaw(Prisma.raw(sql3));
                    var tVendorObj = {
                        ...tRet3[0],
                    };

                    sheet.getCell(3, 5).value = tVendorObj.vendor_name;
                    sheet.getCell(4, 5).value = tVendorObj.reg_no;
                    sheet.getCell(3, 27).value = tVendorObj.user_name;

                    var sql4 = `
                        select
                            user_id,
                            email,
                            tel_no
                        from
                            kcd_user
                        where
                            user_id = '${tUserInfo.USER_ID}'
                    `;
                    var tRet4 = await prisma.$queryRaw(Prisma.raw(sql4));
                    var tUserObj = {
                        ...tRet4[0],
                    };
                    sheet.getCell(4, 27).value = tUserObj.email;

                    // 발주내역
                    var sql5 = '';
                    var tPurchaseObj = [];
                    if (tInput2.KIND === 'ALL') {
                        sql5 = `
                            SELECT
                                a.po_cd -- 1
                            ,
                                b.matl_cd -- 3
                            ,
                                b.color -- 4
                            ,
                                b.matl_name --5 
                            ,
                                b.spec --6
                            ,
                                b.unit -- 7
                            ,
                                b.unit -- 8
                            ,
                                b.weight --9
                            ,
                                sum(a.po_qty) as bal -- 12
                            FROM
                                KSV_PO_MRP a,
                                KCD_MATL_MST b
                            WHERE
                                a.PO_CD = '${tPoCd}'
                                AND b.VENDOR_CD = '${tInput1.VENDOR_CD}'
                                and a.matl_cd = b.matl_cd
                                and a.use_po_type = '1'
                                and a.diff_po_type <> '1'
                            GROUP BY
                                a.po_cd,
                                b.matl_cd,
                                b.matl_name,
                                b.spec,
                                b.color,
                                b.unit,
                                b.weight
                            having
                                sum(a.po_qty) > 0
                            ORDER BY
                                b.matl_name,
                                b.spec,
                                b.color
                        `;
                        tPurchaseObj = await prisma.$queryRaw(Prisma.raw(sql5));
                    } else if (tInput2.KIND === 'BAL') {
                        sql5 = `
                            select
                                e.po_cd, -- 1
                                f.matl_cd, --3
                                b.color, --4
                                b.matl_name, -- 5
                                b.spec, --6
                                b.unit, --7
                                b.unit, --8 
                                b.weight, -- 9
                                d.matl_price, -- 10
                                d.curr_cd, -- 11
                                sum(f.po_qty) - sum(f.in_qty) as bal -- 12
                                -- (sum(f.po_qty)-sum(f.in_qty))*d.matl_price as amt
                            from
                                kcd_matl_mst b,
                                kcd_vendor c,
                                ksv_po_mst e,
                                ksv_stock_mem f,
                                kcd_matl_mem d
                            where
                                e.po_status = '4'
                                and e.po_seq = '1'
                                -- and e.plan_flag = '1' 
                                and e.po_cd = '${tPoCd}'
                                and f.po_cd = e.po_cd
                                and b.matl_cd = f.matl_cd
                                and b.vendor_cd = '${tInput1.VENDOR_CD}'
                                and c.vendor_cd = b.vendor_cd
                                and d.matl_cd = b.matl_cd
                                and d.matl_seq = f.matl_seq
                            group by
                                e.po_cd,
                                b.matl_name,
                                b.color,
                                b.spec,
                                b.unit,
                                b.weight,
                                f.matl_cd,
                                f.matl_seq,
                                d.matl_price,
                                d.curr_cd
                            having
                                sum(f.po_qty) > sum(f.in_qty)
                                and sum(f.po_qty) - sum(f.in_qty) > 0
                                and sum(f.po_qty) > 0
                        `;
                        tPurchaseObj = await prisma.$queryRaw(Prisma.raw(sql5));
                    } else {
                        tInput3.forEach((col, i) => {
                            var tObj = {};
                            tObj.po_cd = col.PO_CD;
                            tObj.matl_cd = col.MATL_CD;
                            tObj.matl_name = col.MATL_NAME;
                            tObj.spec = col.SPEC;
                            tObj.color = col.COLOR;
                            tObj.unit = col.UNIT;
                            tObj.bal = col.PO_QTY;
                            tPurchaseObj.push(tObj);
                        });
                    }

                    var tTotQty = 0;
                    var tTotAmt = 0;
                    var tTotUsdAmt = 0;

                    var tRowIdx = 11;
                    var tIdx2 = 0;
                    for (tIdx2 = 0; tIdx2 < tPurchaseObj.length; tIdx2++) {
                        var col = tPurchaseObj[tIdx2];

                        sheet.getCell(tRowIdx, 1).value = col.po_cd;
                        sheet.getCell(tRowIdx, 2).value = col.matl_cd;
                        sheet.getCell(tRowIdx, 5).value = col.matl_name;
                        sheet.getCell(tRowIdx, 13).value = col.spec;
                        sheet.getCell(tRowIdx, 15).value = col.color;
                        sheet.getCell(tRowIdx, 18).value = col.unit;
                        sheet.getCell(tRowIdx, 20).value = col.bal;

                        var sql51 = `
                            SELECT
                                top 1 a.matl_price,
                                a.curr_cd,
                                c.usd_rate
                            FROM
                                kcd_matl_mem a,
                                ksv_po_mrp b,
                                kcd_curr_com c
                            WHERE
                                a.matl_cd = '${col.matl_cd}'
                                and b.po_cd = '${col.po_cd}'
                                AND a.matl_cd = b.matl_cd
                                AND a.matl_seq = b.matl_seq
                                and a.curr_cd = c.curr_cd
                                and c.start_date = (
                                    select
                                        max(start_date)
                                    from
                                        kcd_curr_com
                                )
                        `;
                        var tRet51 = await prisma.$queryRaw(Prisma.raw(sql51));

                        var tMatlPrice = '';
                        var tCurrCd = '';
                        var tUsdRate = '';
                        if (tRet51.length > 0) {
                            tMatlPrice = tRet51[0].matl_price;
                            tCurrCd = tRet51[0].curr_cd;
                            tUsdRate = tRet51[0].usd_rate;
                        }
                        tInput3.forEach((col1, i) => {
                            if (
                                col1.PO_CD === col.po_cd &&
                                col1.MATL_CD === col.matl_cd
                            ) {
                                tMatlPrice = col1.PO_PRICE;
                                tCurrCd = col1.CURR_CD;
                            }
                        });

                        var tAmt = parseFloat(tMatlPrice) * parseFloat(col.bal);
                        var tUsdAmt =
                            parseFloat(tMatlPrice) *
                            parseFloat(col.bal) *
                            tUsdRate;
                        sheet.getCell(tRowIdx, 22).value = tMatlPrice;
                        sheet.getCell(tRowIdx, 24).value = tCurrCd;
                        sheet.getCell(tRowIdx, 25).value = tAmt;

                        tTotAmt += tAmt;
                        tTotUsdAmt += tUsdAmt;
                        tTotQty += parseFloat(col.bal);

                        tRowIdx += 1;
                    }
                    // sheet.getCell(41, 8).value = tTotUsdAmt;
                    sheet.getCell(1241, 20).value = tTotQty;
                    sheet.getCell(1241, 25).value = tTotAmt;

                    var sql7 = `
                        SELECT
                            a.po_cd,
                            a.po_seq,
                            a.matl_cd,
                            b.matl_name,
                            b.spec,
                            b.color,
                            b.unit,
                            b.weight,
                            d.matl_price,
                            d.curr_cd,
                            sum(a.po_qty) as bal,
                            sum(a.po_qty) * d.matl_price as amt
                        FROM
                            KSV_PO_MRP a,
                            KCD_MATL_MST b,
                            kcd_matl_mem d
                        WHERE
                            a.PO_CD = '${tPoCd}'
                            AND b.VENDOR_CD = '${tInput1.VENDOR_CD}'
                            and a.matl_cd = b.matl_cd
                            and a.use_po_type = '1'
                            and a.diff_po_type <> '1'
                            and d.matl_cd = b.matl_cd
                            and d.matl_seq = a.matl_seq
                        GROUP BY
                            a.po_cd,
                            a.po_seq,
                            a.matl_cd,
                            b.matl_name,
                            b.spec,
                            b.color,
                            b.unit,
                            b.weight,
                            d.matl_price,
                            d.curr_cd
                        having
                            sum(a.po_qty) < 0
                        ORDER BY
                            b.matl_name,
                            b.spec,
                            b.color
                    `;
                    var tRet7 = await prisma.$queryRaw(Prisma.raw(sql7));

                    var tTotQty = 0;
                    var tTotAmt = 0;
                    tRet7.forEach((col, i) => {
                        sheet.getCell(tRowIdx, 1).value = col.po_cd;
                        sheet.getCell(tRowIdx, 2).value = col.matl_cd;
                        sheet.getCell(tRowIdx, 5).value = col.matl_name;
                        sheet.getCell(tRowIdx, 13).value = col.spec;
                        sheet.getCell(tRowIdx, 15).value = col.color;
                        sheet.getCell(tRowIdx, 18).value = col.unit;
                        sheet.getCell(tRowIdx, 22).value = col.matl_price;
                        sheet.getCell(tRowIdx, 24).value = col.curr_cd;
                        sheet.getCell(tRowIdx, 20).value = col.bal;
                        sheet.getCell(tRowIdx, 25).value = col.amt;
                        sheet.getCell(tRowIdx, 26).value = 'Cancel';
                        tTotQty += parseFloat(col.bal);
                        tTotAmt += parseFloat(col.amt);
                        tRowIdx += 1;
                    });

                    // Sheet 변경
                    tSheetName = `Sheet2`;
                    sheet = wb.getWorksheet(tSheetName);
                    var sql8 = `
                        SELECT
                            a.order_cd,
                            G.matl_name,
                            G.color,
                            G.spec,
                            G.unit,
                            sum(E.po_qty) as bal,
                            c.style_name,
                            G.matl_cd
                        FROM
                            KCD_MATL_MST G,
                            KSV_PO_MRP E,
                            ksv_order_mst a,
                            kcd_style c
                        WHERE
                            G.MATL_CD = E.MATL_CD
                            and E.ORDER_CD = a.ORDER_CD
                            and a.style_cd = c.style_cd
                            and (G.VENDOR_CD = '${tInput1.VENDOR_CD}')
                            AND (E.PO_CD = '${tPoCd}')
                            and e.use_po_type = '1'
                        group by
                            a.order_cd,
                            g.matl_name,
                            g.color,
                            g.spec,
                            g.unit,
                            c.style_name,
                            g.matl_cd
                        having
                            sum(E.PO_QTY) > 0
                        ORDER BY
                            a.ORDER_CD,
                            G.MATL_NAME,
                            G.SPEC
                    `;
                    var tRet8 = await prisma.$queryRaw(Prisma.raw(sql8));

                    sheet.getCell(3, 1).value = `P/O No. :${tPoCd}`;
                    sheet.getCell(4, 3).value = `Shipping Date : ${tShipDate}`;
                    sheet.getCell(4, 6).value = tInput1.VENDOR_NAME;
                    sheet.getCell(2, 7).value = tRetDate1;

                    var tSaveOrder = '';
                    var tIdx3 = 0;
                    var tRowIdx = 7;
                    for (tIdx3 = 0; tIdx3 < tRet8.length; tIdx3++) {
                        var col = tRet8[tIdx3];
                        if (col.order_cd !== tSaveOrder) {
                            sheet.getCell(tRowIdx, 1).value = col.order_cd;
                            sheet.getCell(tRowIdx, 2).value = col.style_name;
                            tSaveOrder = col.order_cd;
                            tRowIdx += 1;
                        }
                        sheet.getCell(tRowIdx, 1).value = col.matl_name;
                        sheet.getCell(tRowIdx, 2).value = col.color;
                        sheet.getCell(tRowIdx, 3).value = col.spec;
                        sheet.getCell(tRowIdx, 4).value = col.unit;
                        sheet.getCell(tRowIdx, 5).value = col.bal;
                        tRowIdx += 1;
                    }

                    // Excel Write
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

                    // var tExcelFileName0 = `OrderSheet-${args.data.ORDER_CD}-${tUserInfo.USER_ID}-${tRetDate}.xlsx`;
                    var tExcelFileName = `${tPath}/${tWExcelFile}.xlsx`;
                    const fileData = await wb.xlsx.writeBuffer();
                    // fs.createWriteStream(tExcelFileName).write(fileData);

                    fileUrl = '';
                    try {
                        // const test = await fs.createWriteStream(tExcelFileName);
                        // console.log(test);
                        const response = await generateUploadURL();

                        const presignedUrl = response.uploadURL;

                        //console.log(presignedUrl);
                        var tResp2 = await axios.put(presignedUrl, fileData, {
                            headers: {
                                'Content-Type':
                                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                            },
                        });

                        fileUrl = presignedUrl.split('?')[0];
                    } catch (err) {
                        console.log(err);
                    }

                    //
                    var tSQLArray = [];

                    let tSQL99 = `
                        update ksv_po_vendor
                        set
                            end_date = '${tRetDate1}'
                        where
                            pu_cd = '${tInput1.PU_CD}'
                            and po_cd = '${tPoCd}'
                            and vendor_cd = '${tInput1.VENDOR_CD}'
                    `;
                    var tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    var wPuSeq = tInput2.PU_SEQ;
                    if (wPuSeq === 'W') wPuSeq = tMaxPuSeq + 1;

                    let tSQL99 = `
                        delete from ksv_mail_log
                        where
                            pu_cd = '${tInput1.PU_CD}'
                            and pu_seq = '${wPuSeq}'
                            and po_cd = '${tPoCd}'
                            and po_seq = '${tMaxPoSeq}'
                            and vendor_cd = '${tInput1.VENDOR_CD}'
                    `;
                    var tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    var tInObj = {};
                    tInObj.send_kind = tInput2.KIND;
                    tInObj.user_id = tUserInfo.USER_ID;
                    tInObj.po_cd = tPoCd;
                    tInObj.po_seq = tMaxPoSeq;
                    tInObj.vendor_cd = tInput1.VENDOR_CD;
                    tInObj.send_email = tEmail;
                    tInObj.send_datetime = tRetDate;
                    tInObj.send_flag = '1';
                    tInObj.send_filename = tWExcelFile;
                    tInObj.pu_cd = tInput1.PU_CD;
                    // tInObj.pu_seq = tMaxPuSeq;
                    tInObj.pu_seq = wPuSeq;
                    tInObj.send_fileurl = fileUrl;
                    let tSQL99 = AFLib.createTableSql('ksv_mail_log', tInObj);
                    var tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    global.currentTransactionInfo = {
                        contextValue: contextValue,
                        functionName: AFLib.getFunctionName(),
                    };
                    await prisma.$transaction(tSQLArray);
                    delete global.currentTransactionInfo;

                    // Mail
                    var tTitle = '';
                    if (tInput2.KIND === 'ALL')
                        tTitle = `${tPoCd}_${tInput1.BUYER_CD}_${tInput1.VENDOR_NAME} 발주서 SEQ-ALL`;
                    else if (tInput2.KIND === 'BAL')
                        tTitle = `${tPoCd}_${tInput1.BUYER_CD}_${tInput1.VENDOR_NAME} 발주서 SEQ-BAL`;
                    else
                        tTitle = `${tPoCd}_${tInput1.BUYER_CD}_${tInput1.VENDOR_NAME} 발주서 SEQ-${tInput2.PU_SEQ}`;

                    var tBody = '';
                    tBody += `<!DOCTYPE html>` + '\r\n';
                    tBody += `<html><head><title>발주서</title>` + '\r\n';
                    tBody += `</head><body><div>` + '\r\n';
                    tBody += `<p>안녕하세요?</p>` + '\r\n';
                    tBody +=
                        `<p>${tPoCd}_${tInput1.BUYER_CD} 건으로 발주서 보내드립니다</p>` +
                        '\r\n';
                    tBody += `<p>바이어명 : ${tInput1.BUYER_NAME}</p>` + '\r\n';
                    tBody +=
                        `<p>납품요구일자 : ${tInput1.EX_FACTORY}</p>` + '\r\n';
                    tBody += `<p>납품장소 : ${tInput1.PLACE_CD}</p>` + '\r\n';
                    tBody +=
                        `<p>쉬핑마크 : ${tFactoryObj.factory_name}</p>` +
                        '\r\n';
                    tBody += `<p>*필독 사항*</p>` + '\r\n';
                    tBody +=
                        `<p>1. 발주서를 받으신후, 2일 이내에 납기 및 단가를 확인하시고 회신하여 주십시오.</p>` +
                        '\r\n';
                    tBody +=
                        `<p>2. 규격란에 기재된 폭(특히 원단류 가용/전폭) 품명, 코드 등에 오류가 있거나 불일치 할 경우 반드시 이메일로 사전 인폼 주시기 바랍니다.</p>` +
                        '\r\n';
                    tBody +=
                        `<p>3. 쉬핑마크에 발주번호, 오더번호, 품명, 색상, 혼용율, 폭(원단만 기재), 수량, C/T NO, 원산지 까지 기재하여 주십시오.</p>` +
                        '\r\n';
                    tBody +=
                        `<p>4. 납품요구일자를 지키지 못할 시 공장까지의 운임은 업체 부담입니다. 납품요구일자 내 출고가 어려>운 경우 사전에 꼭 연락 주시기 바랍니다.</p>` +
                        '\r\n';
                    tBody +=
                        `<p>발주서: <a href="${fileUrl}">${tWExcelFile} </a> </p>` +
                        '\r\n';
                    tBody += `<p>Thanks & Best regards.</p>` + '\r\n';
                    tBody +=
                        `<p>${tUserObj.user_id} ${tUserObj.user_name}</p>` +
                        '\r\n';
                    tBody += `<p>Shin Textile Solutions.</p>` + '\r\n';
                    tBody += `<p>Direct Phone#:${tUserObj.tel_no}</p>` + '\r\n';
                    tBody += `</div></body></html>` + '\r\n';

                    /*  mrzx tbuy olvd stvb */
                    const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        host: 'smtp.gmail.com',
                        port: 587,
                        secure: false,
                        auth: {
                            user: 'won21kr@gmail.com',
                            pass: 'mrzxtbuyolvdstvb',
                        },
                    });

                    const mailOptions = {
                        from: 'ybwon21kr001@gmail.com', // 작성자
                        to: 'won21kr@gmail.com', // 수신자
                        subject: tTitle, // 메일 제목
                        text: tBody, // 메일 내용
                        html: tBody, // 메일 내용
                    };

                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });
                }

                //
                console.log('Success excel:' + tWExcelFile);
                var tRetArray = [];
                var tObj = {};
                tObj.id = 1;
                // tObj.CODE = `SUCCESS:${tWExcelFile}.xlsx`;
                tObj.CODE = `SUCCESS?${tWExcelFile}?${fileUrl}`;
                tRetArray.push(tObj);
                return tRetArray;
            } catch (error) {
                var tRetArray = [];
                var tObj = {};
                tObj.id = 1;
                tObj.CODE = `ERROR:${error.message}`;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },

        mgrQueryS040102_EXCEL_PURCHASE_FACTORY: async (
            _,
            args,
            contextValue,
        ) => {
            /* Vendor type 구분 : V0606 - YKK,  '3' : Import, '5': Factory , '그외':  Normal */
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput1 = {
                ...args.data,
            }; // List1의 결과  (2_1)
            var tInput2 = {
                ...args.data1,
            }; // PU_SEQ, KIND (ALL, BAL, '')
            var tInput3 = [...args.data2]; // List3의 결과  (4_1)

            var tPoCds = tInput1.PO_CD2.replace('/', '_');
            var tPoCdArray = tPoCds.split('_');

            var tInPoCds = `'99'`;
            tPoCdArray.forEach((col, i) => {
                tInPoCds += `, '${col}'`;
            });

            var tVendorName = tInput1.VENDOR_NAME.replace(/ /gi, '_');
            tVendorName = tVendorName.replace(/\(/gi, '_');
            tVendorName = tVendorName.replace(/\)/gi, '_');

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
                var tTemplateExcel = `${tPath0}/PO_POLIST(FACTORY).xlsx`;

                var fileUrl = '';
                var tWExcelFile = '';

                var tIdx8 = 0;
                for (tIdx8 = 0; tIdx8 < tPoCdArray.length; tIdx8++) {
                    var tPoCd = tPoCdArray[tIdx8];

                    tWExcelFile = '';
                    if (tInput2.KIND === 'ALL')
                        tWExcelFile = `PO_POLIST_${tVendorName}_${tPoCd}_SEQ-ALL_${tRetDate1}_${tInput1.PU_CD}`;
                    else if (tInput2.KIND === 'BAL')
                        tWExcelFile = `PO_POLIST_${tVendorName}_${tPoCd}_SEQ-Bal_${tRetDate1}_${tInput1.PU_CD}`;
                    else
                        tWExcelFile = `PO_POLIST_${tVendorName}_${tPoCd}_SEQ-${tInput2.PU_SEQ}_${tRetDate1}_${tInput1.PU_CD}`;

                    const wb = new Excel.Workbook();
                    await wb.xlsx.readFile(tTemplateExcel);

                    var tSheetName = `PURCHASE_ORDER`;
                    const sheet = wb.getWorksheet(tSheetName);
                    // const sheet = wb.getWorksheet(1);

                    var sql0_1 = `
                        select
                            max(pu_seq) as max_pu_seq
                        from
                            ksv_pu_mem2
                        where
                            pu_cd = '${tInput1.PU_CD}'
                            and po_cd = '${tPoCd}'
                    `;
                    var tRet0_1 = await prisma.$queryRaw(Prisma.raw(sql0_1));
                    var tMaxPuSeq = 1;
                    if (tRet0_1.length > 0) tMaxPuSeq = tRet0_1[0].max_pu_seq;

                    var sql0 = `
                        select
                            max(po_seq) as max_po_seq
                        from
                            ksv_po_mst
                        where
                            po_cd = '${tPoCd}'
                            and po_seq < 97
                    `;
                    var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                    var tMaxPoSeq = 1;
                    if (tRet0.length > 0) tMaxPoSeq = tRet0[0].max_po_seq;

                    var sql1 = `
                        select
                            email
                        from
                            kcd_user
                        where
                            user_id = '${tUserInfo.USER_ID}'
                    `;
                    var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                    var tEmail = '';
                    if (tRet1.length > 0) tEmail = tRet1[0].email;

                    var sql2 = `
                        select
                            top 1 c.factory_name,
                            c.addr1,
                            c.addr2,
                            c.tel_no,
                            c.fax_no
                        from
                            ksv_po_mst a,
                            kcd_factory c
                        where
                            a.po_cd = '${tPoCd}'
                            and c.factory_cd = a.factory_cd
                    `;
                    var tRet2 = await prisma.$queryRaw(Prisma.raw(sql2));
                    var tFactoryObj = {
                        ...tRet2[0],
                    };

                    sheet.getCell(11, 5).value = tPoCd;
                    sheet.getCell(12, 5).value = tRetDate1;
                    sheet.getCell(1591, 6).value = tInput1.EX_FACTORY;

                    var sql3 = `
                        select
                            vendor_name,
                            vendor_cd,
                            reg_no,
                            user_name
                        from
                            kcd_vendor
                        where
                            vendor_cd = '${tInput1.VENDOR_CD}'
                    `;
                    var tRet3 = await prisma.$queryRaw(Prisma.raw(sql3));
                    var tVendorObj = {
                        ...tRet3[0],
                    };

                    sheet.getCell(6, 10).value = tVendorObj.vendor_name;
                    sheet.getCell(10, 10).value = tVendorObj.user_name;

                    var sql4 = `
                        select
                            user_id,
                            email,
                            tel_no,
                            user_name
                        from
                            kcd_user
                        where
                            user_id = '${tUserInfo.USER_ID}'
                    `;
                    var tRet4 = await prisma.$queryRaw(Prisma.raw(sql4));
                    var tUserObj = {
                        ...tRet4[0],
                    };
                    sheet.getCell(10, 5).value = tUserObj.email;

                    var sql5 = '';
                    var tPurchaseObj = [];
                    if (tInput2.KIND === 'ALL') {
                        sql5 = `
                            SELECT
                                left(a.order_cd, 2) as buyer_cd,
                                a.po_cd,
                                b.matl_cd,
                                b.matl_name,
                                b.spec,
                                b.color,
                                b.unit,
                                sum(a.po_qty) as bal
                            FROM
                                KSV_PO_MRP a,
                                KCD_MATL_MST b
                            WHERE
                                a.PO_CD = '${tPoCd}'
                                AND b.VENDOR_CD = '${tInput1.VENDOR_CD}'
                                and a.matl_cd = b.matl_cd
                                and a.use_po_type = '1'
                                and a.diff_po_type <> '1'
                            GROUP BY
                                left(a.order_cd, 2),
                                a.po_cd,
                                b.matl_cd,
                                b.matl_name,
                                b.spec,
                                b.color,
                                b.unit
                            having
                                sum(a.po_qty) > 0
                            ORDER BY
                                b.matl_name,
                                b.spec,
                                b.color
                        `;
                        tPurchaseObj = await prisma.$queryRaw(Prisma.raw(sql5));
                    } else if (tInput2.KIND === 'BAL') {
                        sql5 = `
                            select
                                left(f.order_cd, 2) as buyer_cd,
                                e.po_cd,
                                f.matl_cd,
                                b.matl_name,
                                b.spec,
                                b.color,
                                b.unit,
                                sum(f.po_qty) - sum(f.in_qty) as bal
                            from
                                kcd_matl_mst b,
                                kcd_vendor c,
                                ksv_po_mst e,
                                ksv_stock_mem f
                            where
                                e.po_status = '4'
                                and e.po_seq = '1'
                                -- and e.plan_flag = '1' 
                                and e.po_cd = '${tPoCd}'
                                and f.po_cd = e.po_cd
                                and b.matl_cd = f.matl_cd
                                and b.vendor_cd = '${tInput1.VENDOR_CD}'
                                and c.vendor_cd = b.vendor_cd
                            group by
                                e.po_cd,
                                b.matl_name,
                                b.color,
                                b.spec,
                                b.unit,
                                f.matl_cd,
                                f.matl_seq,
                                left(f.order_cd, 2)
                            having
                                sum(f.po_qty) > sum(f.in_qty)
                                and sum(f.po_qty) - sum(f.in_qty) > 0
                                and sum(f.po_qty) > 0
                        `;
                        tPurchaseObj = await prisma.$queryRaw(Prisma.raw(sql5));
                    } else {
                        tInput3.forEach((col, i) => {
                            var tObj = {};
                            tObj.buyer_cd = tInput1.BUYER_CD;
                            tObj.po_cd = col.PO_CD;
                            tObj.matl_cd = col.MATL_CD;
                            tObj.matl_name = col.MATL_NAME;
                            tObj.spec = col.SPEC;
                            tObj.color = col.COLOR;
                            tObj.unit = col.UNIT;
                            tObj.bal = col.PO_QTY;
                            tPurchaseObj.push(tObj);
                        });
                    }

                    var tTotQty = 0;
                    var tTotAmt = 0;

                    var tRowIdx = 15;
                    var tIdx2 = 0;
                    for (tIdx2 = 0; tIdx2 < tPurchaseObj.length; tIdx2++) {
                        var col = tPurchaseObj[tIdx2];
                        sheet.getCell(tRowIdx, 2).value = col.buyer_cd;
                        sheet.getCell(tRowIdx, 3).value = col.po_cd;
                        sheet.getCell(tRowIdx, 4).value = col.matl_cd;
                        sheet.getCell(tRowIdx, 5).value = col.matl_name;
                        sheet.getCell(tRowIdx, 6).value = col.spec;
                        sheet.getCell(tRowIdx, 7).value = col.color;
                        sheet.getCell(tRowIdx, 8).value = col.unit;
                        sheet.getCell(tRowIdx, 9).value = col.bal;

                        var tMatlPrice = '';
                        var tCurrCd = '';
                        tInput3.forEach((col1, i) => {
                            if (
                                col1.PO_CD === col.po_cd &&
                                col1.MATL_CD === col.matl_cd
                            ) {
                                tMatlPrice = col1.PO_PRICE;
                                tCurrCd = col1.CURR_CD;
                            }
                        });
                        sheet.getCell(tRowIdx, 10).value = tMatlPrice;
                        sheet.getCell(tRowIdx, 11).value = tCurrCd;

                        var tAmt = parseFloat(tMatlPrice) * parseFloat(col.bal);
                        sheet.getCell(tRowIdx, 12).value = tAmt;

                        tTotAmt += tAmt;
                        tTotQty += parseFloat(col.bal);

                        tRowIdx += 1;
                    }
                    sheet.getCell(1587, 9).value = tTotQty;
                    sheet.getCell(1587, 12).value = tTotAmt;

                    var sql7 = `
                        SELECT
                            left(a.order_cd, 2) as buyer_cd,
                            a.po_cd,
                            b.matl_cd,
                            b.matl_name,
                            b.spec,
                            b.color,
                            b.unit,
                            sum(a.po_qty) as bal,
                            '' as col1,
                            '' as col2,
                            'Cancel' as col3
                        FROM
                            KSV_PO_MRP a,
                            KCD_MATL_MST b
                        WHERE
                            a.PO_CD = '${tPoCd}'
                            AND b.VENDOR_CD = '${tInput1.VENDOR_CD}'
                            and a.matl_cd = b.matl_cd
                            -- and a.use_po_type = '1' 
                            and a.diff_po_type <> '1'
                        GROUP BY
                            left(a.order_cd, 2),
                            a.po_cd,
                            b.matl_cd,
                            b.matl_name,
                            b.spec,
                            b.color,
                            b.unit
                        having
                            sum(a.po_qty) < 0
                        ORDER BY
                            b.matl_name
                    `;
                    var tRet7 = await prisma.$queryRaw(Prisma.raw(sql7));

                    tRet7.forEach((col, i) => {
                        sheet.getCell(tRowIdx, 2).value = col.buyer_cd;
                        sheet.getCell(tRowIdx, 3).value = col.po_cd;
                        sheet.getCell(tRowIdx, 4).value = col.matl_cd;
                        sheet.getCell(tRowIdx, 5).value = col.matl_name;
                        sheet.getCell(tRowIdx, 6).value = col.spec;
                        sheet.getCell(tRowIdx, 7).value = col.color;
                        sheet.getCell(tRowIdx, 8).value = col.unit;
                        sheet.getCell(tRowIdx, 9).value = col.bal;
                        sheet.getCell(tRowIdx, 13).value = col.col3;
                        tRowIdx += 1;
                    });

                    // Excel Write
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

                    // var tExcelFileName0 = `OrderSheet-${args.data.ORDER_CD}-${tUserInfo.USER_ID}-${tRetDate}.xlsx`;
                    var tExcelFileName = `${tPath}/${tWExcelFile}.xlsx`;
                    const fileData = await wb.xlsx.writeBuffer();
                    // fs.createWriteStream(tExcelFileName).write(fileData);

                    fileUrl = '';
                    try {
                        // const test = await fs.createWriteStream(tExcelFileName);
                        // console.log(test);
                        const response = await generateUploadURL();

                        const presignedUrl = response.uploadURL;

                        //console.log(presignedUrl);
                        var tResp2 = await axios.put(presignedUrl, fileData, {
                            headers: {
                                'Content-Type':
                                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                            },
                        });

                        fileUrl = presignedUrl.split('?')[0];
                    } catch (err) {
                        console.log(err);
                    }

                    //
                    var tSQLArray = [];

                    let tSQL99 = `
                        update ksv_po_vendor
                        set
                            end_date = '${tRetDate1}'
                        where
                            pu_cd = '${tInput1.PU_CD}'
                            and po_cd = '${tPoCd}'
                            and vendor_cd = '${tInput1.VENDOR_CD}'
                    `;
                    var tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
                        delete from ksv_mail_log
                        where
                            pu_cd = '${tInput1.PU_CD}'
                            and pu_seq = '${tInput2.PU_SEQ}'
                            and po_cd = '${tPoCd}'
                            and po_seq = '${tMaxPoSeq}'
                            and vendor_cd = '${tInput1.VENDOR_CD}'
                    `;
                    var tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    var tInObj = {};
                    tInObj.send_kind = tInput2.KIND;
                    tInObj.user_id = tUserInfo.USER_ID;
                    tInObj.po_cd = tPoCd;
                    tInObj.po_seq = tMaxPoSeq;
                    tInObj.vendor_cd = tInput1.VENDOR_CD;
                    tInObj.send_email = tEmail;
                    tInObj.send_datetime = tRetDate;
                    tInObj.send_flag = '1';
                    tInObj.send_filename = tWExcelFile;
                    tInObj.pu_cd = tInput1.PU_CD;
                    // tInObj.pu_seq = tMaxPuSeq;
                    tInObj.pu_seq = tInput2.PU_SEQ;
                    tInObj.send_fileurl = fileUrl;
                    let tSQL99 = AFLib.createTableSql('ksv_mail_log', tInObj);
                    var tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    global.currentTransactionInfo = {
                        contextValue: contextValue,
                        functionName: AFLib.getFunctionName(),
                    };
                    await prisma.$transaction(tSQLArray);
                    delete global.currentTransactionInfo;

                    // Mail
                    var tTitle = '';
                    if (tInput2.KIND === 'ALL')
                        tTitle = `${tPoCd}_${tInput1.BUYER_CD}_${tInput1.VENDOR_NAME} 발주서 SEQ-ALL`;
                    else if (tInput2.KIND === 'BAL')
                        tTitle = `${tPoCd}_${tInput1.BUYER_CD}_${tInput1.VENDOR_NAME} 발주서 SEQ-BAL`;
                    else
                        tTitle = `${tPoCd}_${tInput1.BUYER_CD}_${tInput1.VENDOR_NAME} 발주서 SEQ-${tInput2.PU_SEQ}`;

                    var tBody = '';
                    tBody += `<!DOCTYPE html>` + '\r\n';
                    tBody += `<html><head><title>발주서</title>` + '\r\n';
                    tBody += `</head><body><div>` + '\r\n';
                    tBody += `<p>안녕하세요?</p>` + '\r\n';
                    tBody +=
                        `<p>${tPoCd}_${tInput1.BUYER_CD} 건으로 발주서 보내드립니다</p>` +
                        '\r\n';
                    tBody += `<p>바이어명 : ${tInput1.BUYER_NAME}</p>` + '\r\n';
                    tBody +=
                        `<p>납품요구일자 : ${tInput1.EX_FACTORY}</p>` + '\r\n';
                    tBody += `<p>납품장소 : ${tInput1.PLACE_CD}</p>` + '\r\n';
                    tBody +=
                        `<p>쉬핑마크 : ${tFactoryObj.factory_name}</p>` +
                        '\r\n';
                    tBody += `<p>*필독 사항*</p>` + '\r\n';
                    tBody +=
                        `<p>1. 발주서를 받으신후, 2일 이내에 납기 및 단가를 확인하시고 회신하여 주십시오.</p>` +
                        '\r\n';
                    tBody +=
                        `<p>2. 규격란에 기재된 폭(특히 원단류 가용/전폭) 품명, 코드 등에 오류가 있거나 불일치 할 경우 반드시 이메일로 사전 인폼 주시기 바랍니다.</p>` +
                        '\r\n';
                    tBody +=
                        `<p>3. 쉬핑마크에 발주번호, 오더번호, 품명, 색상, 혼용율, 폭(원단만 기재), 수량, C/T NO, 원산지 까지 기재하여 주십시오.</p>` +
                        '\r\n';
                    tBody +=
                        `<p>4. 납품요구일자를 지키지 못할 시 공장까지의 운임은 업체 부담입니다. 납품요구일자 내 출고가 어려>운 경우 사전에 꼭 연락 주시기 바랍니다.</p>` +
                        '\r\n';
                    tBody +=
                        `<p>발주서: <a href="${fileUrl}">${tWExcelFile} </a> </p>` +
                        '\r\n';
                    tBody += `<p>Thanks & Best regards.</p>` + '\r\n';
                    tBody +=
                        `<p>${tUserObj.user_id} ${tUserObj.user_name}</p>` +
                        '\r\n';
                    tBody += `<p>Shin Textile Solutions.</p>` + '\r\n';
                    tBody += `<p>Direct Phone#:${tUserObj.tel_no}</p>` + '\r\n';
                    tBody += `</div></body></html>` + '\r\n';

                    /*  mrzx tbuy olvd stvb */
                    const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        host: 'smtp.gmail.com',
                        port: 587,
                        secure: false,
                        auth: {
                            user: 'won21kr@gmail.com',
                            pass: 'mrzxtbuyolvdstvb',
                        },
                    });

                    /*
                              const transporter = nodemailer.createTransport({
                                     service: 'gmail', // gmail을 사용함
                                     auth: {
                                        user: 'ybwon21kr001@gmail.com', // 나의 (작성자) 이메일 주소
                                        pass: 'comm6975' // 이메일의 비밀번호
                                     }
                              });
                    */

                    const mailOptions = {
                        from: 'ybwon21kr001@gmail.com', // 작성자
                        to: 'won21kr@gmail.com', // 수신자
                        subject: tTitle, // 메일 제목
                        text: tBody, // 메일 내용
                        html: tBody, // 메일 내용
                    };

                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });
                }

                console.log('Success excel:' + tWExcelFile);
                var tRetArray = [];
                var tObj = {};
                tObj.id = 1;
                // tObj.CODE = `SUCCESS:${tWExcelFile}.xlsx`;
                tObj.CODE = `SUCCESS?${tWExcelFile}?${fileUrl}`;
                tRetArray.push(tObj);
                return tRetArray;
            } catch (error) {
                var tRetArray = [];
                var tObj = {};
                tObj.id = 1;
                tObj.CODE = `ERROR:${error.message}`;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },

        mgrQueryS040102_EXCEL_PURCHASE_IMPORT: async (
            _,
            args,
            contextValue,
        ) => {
            /* Vendor type 구분 : V0606 - YKK,  '3' : Import, '5': Factory , '그외':  Normal */
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput1 = {
                ...args.data,
            }; // List1의 결과  (2_1)
            var tInput2 = {
                ...args.data1,
            }; // PU_SEQ, KIND (ALL, BAL, '')
            var tInput3 = [...args.data2]; // List3의 결과  (4_1)

            var tPoCds = tInput1.PO_CD2.replace('/', '_');
            var tPoCdArray = tPoCds.split('_');

            var tInPoCds = `'99'`;
            tPoCdArray.forEach((col, i) => {
                tInPoCds += `, '${col}'`;
            });

            var tVendorName = tInput1.VENDOR_NAME.replace(/ /gi, '_');
            tVendorName = tVendorName.replace(/\(/gi, '_');
            tVendorName = tVendorName.replace(/\)/gi, '_');

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
                var tTemplateExcel = `${tPath0}/PO_POLIST(IMPORT).xlsx`;

                var fileUrl = '';
                var tWExcelFile = '';

                var tIdx8 = 0;
                for (tIdx8 = 0; tIdx8 < tPoCdArray.length; tIdx8++) {
                    var tPoCd = tPoCdArray[tIdx8];

                    tWExcelFile = '';
                    if (tInput2.KIND === 'ALL')
                        tWExcelFile = `PO_POLIST_${tVendorName}_${tPoCd}_SEQ-ALL_${tRetDate1}_${tInput1.PU_CD}`;
                    else if (tInput2.KIND === 'BAL')
                        tWExcelFile = `PO_POLIST_${tVendorName}_${tPoCd}_SEQ-Bal_${tRetDate1}_${tInput1.PU_CD}`;
                    else
                        tWExcelFile = `PO_POLIST_${tVendorName}_${tPoCd}_SEQ-${tInput2.PU_SEQ}_${tRetDate1}_${tInput1.PU_CD}`;

                    const wb = new Excel.Workbook();
                    await wb.xlsx.readFile(tTemplateExcel);

                    var tSheetName = `po sheet`;
                    const sheet = wb.getWorksheet(tSheetName);
                    // const sheet = wb.getWorksheet(1);

                    var sql0_1 = `
                        select
                            max(pu_seq) as max_pu_seq
                        from
                            ksv_pu_mem2
                        where
                            pu_cd = '${tInput1.PU_CD}'
                            and po_cd = '${tPoCd}'
                    `;
                    var tRet0_1 = await prisma.$queryRaw(Prisma.raw(sql0_1));
                    var tMaxPuSeq = 1;
                    if (tRet0_1.length > 0) tMaxPuSeq = tRet0_1[0].max_pu_seq;

                    var sql0 = `
                        select
                            max(po_seq) as max_po_seq
                        from
                            ksv_po_mst
                        where
                            po_cd = '${tPoCd}'
                            and po_seq < 97
                    `;
                    var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                    var tMaxPoSeq = 1;
                    if (tRet0.length > 0) tMaxPoSeq = tRet0[0].max_po_seq;

                    var sql1 = `
                        select
                            email
                        from
                            kcd_user
                        where
                            user_id = '${tUserInfo.USER_ID}'
                    `;
                    var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                    var tEmail = '';
                    if (tRet1.length > 0) tEmail = tRet1[0].email;

                    var sql2 = `
                        select
                            top 1 c.factory_name,
                            c.addr1,
                            c.addr2,
                            c.tel_no,
                            c.fax_no
                        from
                            ksv_po_mst a,
                            kcd_factory c
                        where
                            a.po_cd = '${tPoCd}'
                            and c.factory_cd = a.factory_cd
                    `;
                    var tRet2 = await prisma.$queryRaw(Prisma.raw(sql2));
                    var tFactoryObj = {
                        ...tRet2[0],
                    };

                    sheet.getCell(1572, 3).value = tFactoryObj.factory_name;
                    sheet.getCell(9, 1).value = tFactoryObj.factory_name;
                    sheet.getCell(1573, 3).value = tFactoryObj.addr1;
                    sheet.getCell(10, 1).value = tFactoryObj.addr1;
                    sheet.getCell(1574, 3).value = tFactoryObj.addr2;
                    sheet.getCell(11, 1).value = tFactoryObj.addr2;
                    sheet.getCell(12, 2).value = tFactoryObj.tel_no;
                    sheet.getCell(13, 2).value = tFactoryObj.fax_no;
                    sheet.getCell(1575, 3).value =
                        `Attn: Ms.Ha/${tUserInfo.USER_ID}`;
                    sheet.getCell(1576, 3).value = `Tel : 84-320-3861-727`;
                    sheet.getCell(1577, 3).value = `Fax : 84-320-3861-730`;
                    sheet.getCell(1578, 3).value =
                        `E-mail:thyha@shintsbvt.com/${tEmail}`;
                    if (0) {
                        // check gore
                        sheet.getCell(9, 1).value = 'W.L.GORE&ASSOCIATES';
                        sheet.getCell(10, 1).value =
                            'TECHNOLOGIES (SHENGZHEN) COMPANY';
                        sheet.getCell(11, 1).value =
                            'LIMITED,C1 SHENFUBAO SCIENCE AND';
                        sheet.getCell(12, 1).value =
                            'TECHNOLOGY INDUSTRIAL PARK 1';
                        sheet.getCell(13, 1).value =
                            'HUANGH UAI ROAD,FUTIAN FREE ☆☆';
                        sheet.getCell(14, 1).value = '';
                        sheet.getCell(14, 2).value = '';
                        sheet.getCell(15, 1).value = '';
                        sheet.getCell(1570, 3).value =
                            'W.L.Gore & Associates (Hong Kong) Ltd.';
                        sheet.getCell(1572, 3).value = 'W.L.GORE&ASSOCIATES';
                        sheet.getCell(1573, 3).value =
                            'TECHNOLOGIES (SHENGZHEN) COMPANY';
                        sheet.getCell(1574, 3).value =
                            'LIMITED,C1 SHENFUBAO SCIENCE AND';
                        sheet.getCell(1575, 3).value =
                            'TECHNOLOGY INDUSTRIAL PARK 1';
                        sheet.getCell(1576, 3).value =
                            'HUANGH UAI ROAD,FUTIAN FREE ☆☆';
                        sheet.getCell(1577, 3).value = '';
                        sheet.getCell(1578, 3).value = '';
                        sheet.getCell(1576, 4).value = '';
                        sheet.getCell(1577, 4).value = '';
                    }

                    sheet.getCell(17, 2).value = tPoCd;
                    sheet.getCell(17, 7).value = tRetDate1;
                    sheet.getCell(1568, 3).value = tInput1.EX_FACTORY;

                    var sql3 = `
                        select
                            vendor_name,
                            vendor_cd,
                            reg_no,
                            user_name
                        from
                            kcd_vendor
                        where
                            vendor_cd = '${tInput1.VENDOR_CD}'
                    `;
                    var tRet3 = await prisma.$queryRaw(Prisma.raw(sql3));
                    var tVendorObj = {
                        ...tRet3[0],
                    };

                    sheet.getCell(19, 2).value = tVendorObj.vendor_name;

                    var sql4 = `
                        select
                            user_id,
                            email,
                            tel_no
                        from
                            kcd_user
                        where
                            user_id = '${tUserInfo.USER_ID}'
                    `;
                    var tRet4 = await prisma.$queryRaw(Prisma.raw(sql4));
                    var tUserObj = {
                        ...tRet4[0],
                    };
                    sheet.getCell(14, 2).value = tUserObj.email;
                    sheet.getCell(15, 2).value = tUserObj.tel_no;

                    var sql5 = '';
                    var tPurchaseObj = [];
                    if (tInput2.KIND === 'ALL') {
                        sql5 = `
                            SELECT
                                a.po_cd,
                                b.matl_cd,
                                b.matl_name,
                                b.spec,
                                b.color,
                                b.unit,
                                sum(a.po_qty) as bal
                            FROM
                                KSV_PO_MRP a,
                                KCD_MATL_MST b
                            WHERE
                                a.PO_CD = '${tPoCd}'
                                AND b.VENDOR_CD = '${tInput1.VENDOR_CD}'
                                and a.matl_cd = b.matl_cd
                                and a.use_po_type = '1'
                                and a.diff_po_type <> '1'
                            GROUP BY
                                left(a.order_cd, 2),
                                a.po_cd,
                                b.matl_cd,
                                b.matl_name,
                                b.spec,
                                b.color,
                                b.unit
                            having
                                sum(a.po_qty) > 0
                            ORDER BY
                                b.matl_name,
                                b.spec,
                                b.color
                        `;
                        tPurchaseObj = await prisma.$queryRaw(Prisma.raw(sql5));
                    } else if (tInput2.KIND === 'BAL') {
                        sql5 = `
                            select
                                e.po_cd,
                                f.matl_cd,
                                b.matl_name,
                                b.spec,
                                b.color,
                                b.unit,
                                d.matl_price,
                                d.curr_cd,
                                sum(f.po_qty) - sum(f.in_qty) as bal,
                                (sum(f.po_qty) - sum(f.in_qty)) * d.matl_price as amt
                            from
                                kcd_matl_mst b,
                                kcd_vendor c,
                                ksv_po_mst e,
                                ksv_stock_mem f,
                                kcd_matl_mem d
                            where
                                e.po_status = '4'
                                and e.po_seq = '1'
                                -- and e.plan_flag = '1' 
                                and e.po_cd = '${tPoCd}'
                                and f.po_cd = e.po_cd
                                and b.matl_cd = f.matl_cd
                                and b.vendor_cd = '${tInput1.VENDOR_CD}'
                                and c.vendor_cd = b.vendor_cd
                                and d.matl_cd = b.matl_cd
                                and d.matl_seq = f.matl_seq
                            group by
                                e.po_cd,
                                b.matl_name,
                                b.color,
                                b.spec,
                                b.unit,
                                f.matl_cd,
                                f.matl_seq,
                                d.matl_price,
                                d.curr_cd
                            having
                                sum(f.po_qty) > sum(f.in_qty)
                                and sum(f.po_qty) - sum(f.in_qty) > 0
                                and sum(f.po_qty) > 0
                        `;
                        tPurchaseObj = await prisma.$queryRaw(Prisma.raw(sql5));
                    } else {
                        tInput3.forEach((col, i) => {
                            var tObj = {};
                            tObj.po_cd = col.PO_CD;
                            tObj.matl_cd = col.MATL_CD;
                            tObj.matl_name = col.MATL_NAME;
                            tObj.spec = col.SPEC;
                            tObj.color = col.COLOR;
                            tObj.unit = col.UNIT;
                            tObj.bal = col.PO_QTY;
                            tPurchaseObj.push(tObj);
                        });
                    }

                    var tTotQty = 0;
                    var tTotAmt = 0;

                    var tRowIdx = 22;
                    var tIdx2 = 0;
                    for (tIdx2 = 0; tIdx2 < tPurchaseObj.length; tIdx2++) {
                        var col = tPurchaseObj[tIdx2];
                        sheet.getCell(tRowIdx, 1).value = col.po_cd;
                        sheet.getCell(tRowIdx, 2).value = col.matl_cd;
                        sheet.getCell(tRowIdx, 3).value = col.matl_name;
                        sheet.getCell(tRowIdx, 4).value = col.spec;
                        sheet.getCell(tRowIdx, 5).value = col.color;
                        sheet.getCell(tRowIdx, 6).value = col.unit;

                        var sql51 = `
                            SELECT
                                top 1 a.matl_price,
                                a.curr_cd,
                                c.usd_rate
                            FROM
                                kcd_matl_mem a,
                                ksv_po_mrp b,
                                kcd_curr_com c
                            WHERE
                                a.matl_cd = '${col.matl_cd}'
                                and b.po_cd = '${col.po_cd}'
                                AND a.matl_cd = b.matl_cd
                                AND a.matl_seq = b.matl_seq
                                and a.curr_cd = c.curr_cd
                                and c.start_date = (
                                    select
                                        max(start_date)
                                    from
                                        kcd_curr_com
                                )
                        `;
                        var tRet51 = await prisma.$queryRaw(Prisma.raw(sql51));

                        var tMatlPrice = '';
                        var tCurrCd = '';
                        var tUsdRate = '';
                        if (tRet51.length > 0) {
                            tMatlPrice = tRet51[0].matl_price;
                            tCurrCd = tRet51[0].curr_cd;
                            tUsdRate = tRet51[0].usd_rate;
                        }
                        tInput3.forEach((col1, i) => {
                            if (
                                col1.PO_CD === col.po_cd &&
                                col1.MATL_CD === col.matl_cd
                            ) {
                                tMatlPrice = col1.PO_PRICE;
                                tCurrCd = col1.CURR_CD;
                            }
                        });
                        sheet.getCell(tRowIdx, 7).value = tMatlPrice;
                        sheet.getCell(tRowIdx, 8).value = tCurrCd;
                        sheet.getCell(tRowIdx, 9).value = col.bal;

                        var tAmt = parseFloat(tMatlPrice) * parseFloat(col.bal);
                        sheet.getCell(tRowIdx, 10).value = tAmt;
                        sheet.getCell(tRowIdx, 11).value =
                            tFactoryObj.factory_name;

                        tTotAmt += tAmt;
                        tTotQty += parseFloat(col.bal);

                        tRowIdx += 1;
                    }
                    sheet.getCell(1560, 9).value = tTotQty;
                    sheet.getCell(1560, 10).value = tTotAmt;

                    sheet.getCell(1562, 3).value = tInput1.BUYER_NAME;
                    sheet.getCell(1564, 3).value = tInput1.TRADE_TERM;
                    sheet.getCell(1564, 4).value = tInput1.PAY_TERM;

                    var sql7 = `
                        SELECT
                            a.po_cd,
                            b.matl_cd,
                            b.matl_name,
                            b.spec,
                            b.color,
                            b.unit,
                            d.matl_price,
                            d.curr_cd,
                            sum(a.po_qty) as bal,
                            sum(a.po_qty) * d.matl_price as amt
                        FROM
                            KSV_PO_MRP a,
                            KCD_MATL_MST b,
                            kcd_matl_mem d
                        WHERE
                            a.PO_CD = '${tPoCd}'
                            AND b.VENDOR_CD = '${tInput1.VENDOR_CD}'
                            and a.matl_cd = b.matl_cd
                            and a.use_po_type = '1'
                            and a.diff_po_type <> '1'
                            and d.matl_cd = b.matl_cd
                            and d.matl_seq = a.matl_seq
                        GROUP BY
                            left(a.order_cd, 2),
                            a.po_cd,
                            b.matl_cd,
                            b.matl_name,
                            b.spec,
                            b.color,
                            b.unit,
                            d.matl_price,
                            d.curr_cd
                        having
                            sum(a.po_qty) < 0
                        ORDER BY
                            b.matl_name,
                            b.spec,
                            b.color
                    `;
                    var tRet7 = await prisma.$queryRaw(Prisma.raw(sql7));

                    var tTotQty = 0;
                    var tTotAmt = 0;
                    tRet7.forEach((col, i) => {
                        sheet.getCell(tRowIdx, 1).value = col.po_cd;
                        sheet.getCell(tRowIdx, 2).value = col.matl_cd;
                        sheet.getCell(tRowIdx, 3).value = col.matl_name;
                        sheet.getCell(tRowIdx, 4).value = col.spec;
                        sheet.getCell(tRowIdx, 5).value = col.color;
                        sheet.getCell(tRowIdx, 6).value = col.unit;
                        sheet.getCell(tRowIdx, 7).value = col.matl_price;
                        sheet.getCell(tRowIdx, 8).value = col.curr_cd;
                        sheet.getCell(tRowIdx, 9).value = col.bal;
                        sheet.getCell(tRowIdx, 10).value = col.amt;
                        sheet.getCell(tRowIdx, 11).value =
                            tFactoryObj.factory_name;
                        tTotQty += parseFloat(col.bal);
                        tTotAmt += parseFloat(col.amt);
                        tRowIdx += 1;
                    });

                    // Excel Write
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

                    // var tExcelFileName0 = `OrderSheet-${args.data.ORDER_CD}-${tUserInfo.USER_ID}-${tRetDate}.xlsx`;
                    var tExcelFileName = `${tPath}/${tWExcelFile}.xlsx`;
                    const fileData = await wb.xlsx.writeBuffer();
                    // fs.createWriteStream(tExcelFileName).write(fileData);

                    fileUrl = '';
                    try {
                        // const test = await fs.createWriteStream(tExcelFileName);
                        // console.log(test);
                        const response = await generateUploadURL();

                        const presignedUrl = response.uploadURL;

                        //console.log(presignedUrl);
                        var tResp2 = await axios.put(presignedUrl, fileData, {
                            headers: {
                                'Content-Type':
                                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                            },
                        });

                        fileUrl = presignedUrl.split('?')[0];
                    } catch (err) {
                        console.log(err);
                    }

                    ///
                    var tSQLArray = [];

                    let tSQL99 = `
                        update ksv_po_vendor
                        set
                            end_date = '${tRetDate1}'
                        where
                            pu_cd = '${tInput1.PU_CD}'
                            and po_cd = '${tPoCd}'
                            and vendor_cd = '${tInput1.VENDOR_CD}'
                    `;
                    var tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
                        delete from ksv_mail_log
                        where
                            pu_cd = '${tInput1.PU_CD}'
                            and pu_seq = '${tInput2.PU_SEQ}'
                            and po_cd = '${tPoCd}'
                            and po_seq = '${tMaxPoSeq}'
                            and vendor_cd = '${tInput1.VENDOR_CD}'
                    `;
                    var tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    var tInObj = {};
                    tInObj.send_kind = tInput2.KIND;
                    tInObj.user_id = tUserInfo.USER_ID;
                    tInObj.po_cd = tPoCd;
                    tInObj.po_seq = tMaxPoSeq;
                    tInObj.vendor_cd = tInput1.VENDOR_CD;
                    tInObj.send_email = tEmail;
                    tInObj.send_datetime = tRetDate;
                    tInObj.send_flag = '1';
                    tInObj.send_filename = tWExcelFile;
                    tInObj.pu_cd = tInput1.PU_CD;
                    // tInObj.pu_seq = tMaxPuSeq;
                    tInObj.pu_seq = tInput2.PU_SEQ;
                    tInObj.send_fileurl = fileUrl;
                    let tSQL99 = AFLib.createTableSql('ksv_mail_log', tInObj);
                    var tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    global.currentTransactionInfo = {
                        contextValue: contextValue,
                        functionName: AFLib.getFunctionName(),
                    };
                    await prisma.$transaction(tSQLArray);
                    delete global.currentTransactionInfo;

                    // Mail
                    var tTitle = '';
                    /*
                    if (tInput2.KIND === 'ALL') tTitle = `${tPoCd}_${tInput1.BUYER_CD}_${tInput1.VENDOR_NAME} 발주서 SEQ-ALL`;
                    else if (tInput2.KIND === 'BAL') tTitle = `${tPoCd}_${tInput1.BUYER_CD}_${tInput1.VENDOR_NAME} 발주서 SEQ-BAL`;
                    else tTitle = `${tPoCd}_${tInput1.BUYER_CD}_${tInput1.VENDOR_NAME} 발주서 SEQ-${tInput2.PU_SEQ}`;
                    */
                    tTitle = `${tPoCd}_${tInput1.BUYER_CD}_${tInput1.VENDOR_NAME} 발주서 SEQ-${tInput2.PU_SEQ}`;

                    var tBody = '';
                    tBody += `<!DOCTYPE html>` + '\r\n';
                    tBody += `<html><head><title>발주서</title>` + '\r\n';
                    tBody += `</head><body><div>` + '\r\n';
                    tBody += `<p>안녕하세요?</p>` + '\r\n';
                    tBody +=
                        `<p>${tPoCd}_${tInput1.BUYER_CD} 건으로 발주서 보내드립니다</p>` +
                        '\r\n';
                    tBody += `<p>바이어명 : ${tInput1.BUYER_NAME}</p>` + '\r\n';
                    tBody +=
                        `<p>납품요구일자 : ${tInput1.EX_FACTORY}</p>` + '\r\n';
                    tBody += `<p>납품장소 : ${tInput1.PLACE_CD}</p>` + '\r\n';
                    tBody +=
                        `<p>쉬핑마크 : ${tFactoryObj.factory_name}</p>` +
                        '\r\n';
                    tBody += `<p>*필독 사항*</p>` + '\r\n';
                    tBody +=
                        `<p>1. 발주서를 받으신후, 2일 이내에 납기 및 단가를 확인하시고 회신하여 주십시오.</p>` +
                        '\r\n';
                    tBody +=
                        `<p>2. 규격란에 기재된 폭(특히 원단류 가용/전폭) 품명, 코드 등에 오류가 있거나 불일치 할 경우 반드시 이메일로 사전 인폼 주시기 바랍니다.</p>` +
                        '\r\n';
                    tBody +=
                        `<p>3. 쉬핑마크에 발주번호, 오더번호, 품명, 색상, 혼용율, 폭(원단만 기재), 수량, C/T NO, 원산지 까지 기재하여 주십시오.</p>` +
                        '\r\n';
                    tBody +=
                        `<p>4. 납품요구일자를 지키지 못할 시 공장까지의 운임은 업체 부담입니다. 납품요구일자 내 출고가 어려>운 경우 사전에 꼭 연락 주시기 바랍니다.</p>` +
                        '\r\n';
                    tBody +=
                        `<p>발주서: <a href="${fileUrl}">${tWExcelFile} </a> </p>` +
                        '\r\n';
                    tBody += `<p>Thanks & Best regards.</p>` + '\r\n';
                    tBody +=
                        `<p>${tUserObj.user_id} ${tUserObj.user_name}</p>` +
                        '\r\n';
                    tBody += `<p>Shin Textile Solutions.</p>` + '\r\n';
                    tBody += `<p>Direct Phone#:${tUserObj.tel_no}</p>` + '\r\n';
                    tBody += `</div></body></html>` + '\r\n';

                    const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        host: 'smtp.gmail.com',
                        port: 587,
                        secure: false,
                        auth: {
                            user: 'won21kr@gmail.com',
                            pass: 'mrzxtbuyolvdstvb',
                        },
                    });

                    const mailOptions = {
                        from: 'ybwon21kr001@gmail.com', // 작성자
                        to: 'won21kr@gmail.com', // 수신자
                        subject: tTitle, // 메일 제목
                        text: tBody, // 메일 내용
                        html: tBody, // 메일 내용
                    };

                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });
                }

                //
                console.log('Success excel:' + tWExcelFile);
                var tRetArray = [];
                var tObj = {};
                tObj.id = 1;
                // tObj.CODE = `SUCCESS:${tWExcelFile}.xlsx`;
                tObj.CODE = `SUCCESS?${tWExcelFile}?${fileUrl}`;
                tRetArray.push(tObj);
                return tRetArray;
            } catch (error) {
                var tRetArray = [];
                var tObj = {};
                tObj.id = 1;
                tObj.CODE = `ERROR:${error.message}`;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },

        mgrQueryS040102_EXCEL_PURCHASE_IMPORT_NEW: async (
            _,
            args,
            contextValue,
        ) => {
            /* Vendor type 구분 : V0606 - YKK,  '3' : Import, '5': Factory , '그외':  Normal */
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput1 = {
                ...args.data,
            }; // List1의 결과  (2_1)
            var tInput2 = {
                ...args.data1,
            }; // PU_SEQ, KIND (ALL, BAL, ''), MAIL_TITLE, MAIL_BODY
            var tInput3 = [...args.data2]; // List3의 결과  (4_1)

            let kindOfReport = tInput2.KIND_OF_REPORT;

            let basicFont = { name: '돋움', size: 11 };

            /* Vendor 승인정보 */
            /*
            var sql_bank = `
                select
                    b.vendor_cd,
                    b.vendor_name,
                    isnull(a.gw, '') as gw,
                    b.vendor_type
                from
                    kcd_vendor b
                    left join kcd_vendor_bank a on a.vendor_cd = b.vendor_cd
                where
                    b.vendor_cd = '${tInput1.VENDOR_CD}'
            `;
            var ret_bank = await prisma.$queryRaw(Prisma.raw(sql_bank));
            var tCheckBank = 0;
            ret_bank.forEach((col, i) => {
                if (col.vendor_type === '1'  || col.vendor_type === '3' ) {
                    if (col.gw === '2') tCheckBank = 1;
                } else {
                    tCheckBank = 1;
                } 
            });
            if (tCheckBank <= 0) {
                var tRetArray = [];
                var tObj = {};
                tObj.id = 1;
                tObj.CODE = `ERROR:[Supplier Bank Information] must be approved before printing the purchase order.. `;
                tRetArray.push(tObj);
                return (tRetArray);
            }
            */

            // 저장된지 않은 신규 아이템이 있는지 확인. 있으면 Save후 하라고 메세지 전달
            var idx0 = 0;
            var check0 = 0;
            for (idx0 = 0; idx0 < tInput3.length; idx0++) {
                var tObj = { ...tInput3[idx0] };
                var tCols = tObj.PO_CD.split('/');

                var idx1 = 0;
                for (idx1 = 0; idx1 < tCols.length; idx1++) {
                    if (tCols[idx1]) {
                        var sqlTmp = `
                            select
                                *
                            from
                                ksv_stock_mem2
                            where
                                po_cd = '${tCols[idx1]}'
                                and matl_cd = '${tObj.MATL_CD}'
                        `;
                        var retTmp = await prisma.$queryRaw(Prisma.raw(sqlTmp));
                        if (retTmp.length <= 0) check0 = 1;
                    }
                }
            }
            if (check0 === 1) {
                var tRetArray = [];
                var tObj = {};
                tObj.id = 1;
                tObj.CODE = `ERROR:There is not save item. Please Click [Save] Button. `;
                tRetArray.push(tObj);
                return tRetArray;
            }

            /* Mail 보내기 전에 기존 보낸내용과 비교 */
            var retCurrStockMem2 = [];
            if (tInput2.PU_SEQ === 'W') {
                var sqlCurrStockMem2 = `
                    select
                        a.*,
                        a.PO_QTY2 as NEW_PO_QTY
                    from
                        ksv_stock_mem2 a
                    where
                        pu_cd = '${tInput1.PU_CD}'
                `;
                retCurrStockMem2 = await prisma.$queryRaw(
                    Prisma.raw(sqlCurrStockMem2),
                );
            } else {
                var sqlCurrStockMem2 = `
                    select
                        a.*
                    from
                        ksv_stock_mem2_log a
                    where
                        pu_cd = '${tInput1.PU_CD}'
                        and pu_seq = '${tInput2.PU_SEQ}'
                `;
                retCurrStockMem2 = await prisma.$queryRaw(
                    Prisma.raw(sqlCurrStockMem2),
                );
            }

            var retLastStockMem2 = [];
            if (tInput2.PU_SEQ === 'W') {
                var sqlLastStockMem2 = `
                    select
                        a.*,
                        b.MATL_NAME,
                        b.COLOR,
                        b.SPEC,
                        b.UNIT
                    from
                        ksv_stock_mem2_log a,
                        kcd_matl_mst b
                    where
                        a.pu_cd = '${tInput1.PU_CD}'
                        and a.pu_seq = (
                            select
                                max(pu_seq)
                            from
                                ksv_stock_mem2_log
                            where
                                pu_cd = '${tInput1.PU_CD}'
                                and pu_seq < 900
                        )
                        and a.matl_cd = b.matl_cd
                `;
                retLastStockMem2 = await prisma.$queryRaw(
                    Prisma.raw(sqlLastStockMem2),
                );
            } else {
                var sqlLastStockMem2 = `
                    select
                        a.*,
                        b.MATL_NAME,
                        b.COLOR,
                        b.SPEC,
                        b.UNIT
                    from
                        ksv_stock_mem2_log a,
                        kcd_matl_mst b
                    where
                        a.pu_cd = '${tInput1.PU_CD}'
                        and a.pu_seq = (
                            select
                                max(pu_seq)
                            from
                                ksv_stock_mem2_log
                            where
                                pu_cd = '${tInput1.PU_CD}'
                                and pu_seq < '${tInput2.PU_SEQ}'
                        )
                        and a.matl_cd = b.matl_cd
                `;
                retLastStockMem2 = await prisma.$queryRaw(
                    Prisma.raw(sqlLastStockMem2),
                );
            }

            // Find Del Item 처리
            var tCheck = 0;
            var tDelArray = [];
            if (retLastStockMem2.length > 0) {
                retCurrStockMem2.forEach((col, i) => {
                    retLastStockMem2.forEach((col1, i1) => {
                        if (
                            col.PO_CD === col1.PO_CD &&
                            col.MATL_CD === col1.MATL_CD
                        ) {
                            console.log(
                                `==========> check(Step-1. Diff 평가_Curr/Last, new_po_qty,po_qty2 ): ${col.NEW_PO_QTY} / ${col1.NEW_PO_QTY}, ${col.PO_QTY2} / ${col1.PO_QTY2} `,
                            );
                            // if (parseFloat(col.NEW_PO_QTY) !== parseFloat(col1.NEW_PO_QTY)) tCheck = 1;
                            var tSaveObj = JSON.parse(col1.SAVE_DATA);
                            var tFindObj = {};
                            tInput3.forEach((col9, i9) => {
                                if (col9.MATL_CD === col.MATL_CD) tFindObj = { ...col9 };
                            });

                            if (parseFloat(col.PO_QTY2) !== parseFloat(col1.PO_QTY2)) tCheck = 1;
                            if (tFindObj.MATL_NAME !== tSaveObj.MATL_NAME) tCheck = 2;
                            if (tFindObj.COLOR !== tSaveObj.COLOR) tCheck = 3; 
                            if (tFindObj.SPEC !== tSaveObj.SPEC) tCheck = 4;
                            if (parseFloat(tFindObj.PO_PRICE) !== parseFloat(tSaveObj.PO_PRICE)) tCheck = 5;

                            console.log(
                                `==========> [${tCheck}]  check(Step-1.1) ${col1.PO_QTY2}/${tSaveObj.MATL_NAME}/${tSaveObj.SPEC}/${tSaveObj.COLOR}/${tSaveObj.PO_PRICE}   `,
                            );
                            console.log(
                                `==========> check(Step-1.2.) ${col.PO_QTY2}/${tFindObj.MATL_NAME}/${tFindObj.SPEC}/${tFindObj.COLOR}/${tFindObj.PO_PRICE}   `,
                            );
                        }
                    });
                });
                if (retCurrStockMem2.length !== retLastStockMem2.length)
                    tCheck = 1;
            } else {
                tCheck = 1;
            }
            if (
                retLastStockMem2.length > 0 &&
                retLastStockMem2.length !== retCurrStockMem2.length
            ) {
                tCheck = 1;
                retLastStockMem2.forEach((col, i) => {
                    var tCheck2 = 0;
                    retCurrStockMem2.forEach((col1, i1) => {
                        if (
                            col.PO_CD === col1.PO_CD &&
                            col.MATL_CD === col1.MATL_CD
                        ) {
                            tCheck2 = 1;
                        }
                    });
                    if (tCheck2 === 0) {
                        tDelArray.push(col);
                    }
                });
            }
            console.log(`==========> check(Step-1. Diff 평가 ): ${tCheck} `);

            // Find Del Item 처리
            var tInsArray = [];
            if (retCurrStockMem2.length > 0) {
                retLastStockMem2.forEach((col, i) => {
                    retCurrStockMem2.forEach((col1, i1) => {
                        if (
                            col.PO_CD === col1.PO_CD &&
                            col.MATL_CD === col1.MATL_CD
                        ) {
                            console.log(
                                `==========> check(Step-1. Diff 평가_Curr/Last, new_po_qty,po_qty2 ): ${col.NEW_PO_QTY} / ${col1.NEW_PO_QTY}, ${col.PO_QTY2} / ${col1.PO_QTY2} `,
                            );
                            // if (parseFloat(col.NEW_PO_QTY) !== parseFloat(col1.NEW_PO_QTY)) tCheck = 1;
                            var tSaveObj = JSON.parse(col.SAVE_DATA);
                            var tFindObj = {};
                            tInput3.forEach((col9, i9) => {
                                if (col9.MATL_CD === col1.MATL_CD) tFindObj = { ...col9 };
                            });


                            // if (parseFloat(col.NEW_PO_QTY) !== parseFloat(col1.NEW_PO_QTY)) tCheck = 1;
                            if (
                                (parseFloat(col.PO_QTY2) !== parseFloat(col1.PO_QTY2)) ||
                                (tSaveObj.MATL_NAME !== tFindObj.MATL_NAME) ||
                                (tSaveObj.COLOR !== tFindObj.COLOR) ||
                                (tSaveObj.SPEC !== tFindObj.SPEC) ||
                                (parseFloat(tSaveObj.PO_PRICE) !== parseFloat(tFindObj.PO_PRICE)) 
                            )
                                tCheck = 1;

                            console.log(
                                `==========> [${tCheck}] ,  check(Step-2.1 : ${retCurrStockMem2.length})  ${col1.PO_QTY2}/${tSaveObj.MATL_NAME}/${tSaveObj.SPEC}/${tSaveObj.COLOR}/${tSaveObj.PO_PRICE}   `,
                            );
                            console.log(
                                `==========> [${tCheck}] , check(Step-2.2.: ${retLastStockMem2.length}) ${col.PO_QTY2}/${tFindObj.MATL_NAME}/${tFindObj.SPEC}/${tFindObj.COLOR}/${tFindObj.PO_PRICE}   `,
                            );
                        }
                    });
                });
                if (retCurrStockMem2.length !== retLastStockMem2.length)
                    tCheck = 1;
            } else {
                tCheck = 1;
            }
            /*
            if (retLastStockMem2.length > 0 && retLastStockMem2.length !== retCurrStockMem2.length) {
                tCheck = 1;
                retCurrStockMem2.forEach((col,i) => {
                    var tCheck2 = 0;
                    retLastStockMem2.forEach((col1, i1) => {
                        if (col.PO_CD === col1.PO_CD && col.MATL_CD === col1.MATL_CD) { 
                            tCheck2 = 1;
                        }
                    });
                    if (tCheck2 === 0) {
                        tInsArray.push(col);
                    }
                });
            }
            */
            console.log(`==========> check(Step-2): ${tCheck}`);

            // 변경된 항목 찾기
            const changedMap = new Set();

            tInput3.forEach((row) => {
                if (parseFloat(row.DIFF_QTY) !== 0) {
                    const poList = String(row.PO_CD || '').split('/');
                    poList.forEach((po) => {
                        const poCd = po.trim();
                        if (poCd) {
                            changedMap.add(`${poCd}_${String(row.MATL_CD || '').trim()}`);
                        }
                    });
                }
            });

            retCurrStockMem2.forEach((curr) => {
                const last = retLastStockMem2.find(
                    (last) =>
                        last.PO_CD === curr.PO_CD &&
                        last.MATL_CD === curr.MATL_CD,
                );

                if (!last) {
                    changedMap.add(`${curr.PO_CD}_${curr.MATL_CD}`);
                } else {
                    if (parseFloat(curr.PO_QTY2) !== parseFloat(last.PO_QTY2)) {
                        changedMap.add(`${curr.PO_CD}_${curr.MATL_CD}`);
                    }
                }
            });

            // 삭제된 항목도 포함
            tDelArray.forEach((col) => {
                changedMap.add(`${col.PO_CD}_${col.MATL_CD}`);
            });

            /* 가장 최근에 나간 Mail 과 변동정보 확인 */
            if (retLastStockMem2.length <= 0) tCheck = 1; // 메일발송된 발주서가 없는경우

            // 임시 코드. 0403 이후 삭제 
            if (tCheck === 0) {
                if (tInput1.PU_CD === 'PU26-NE001321' || tInput1.PU_CD === 'PU26-NE001322') ;
                else {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.id = 1;
                    tObj.CODE = `ERROR:Send Po Sheet:No changes detected, so the email was not sent. `;
                    tRetArray.push(tObj);
                    return tRetArray;
                }
            }

            var tPoCds = tInput1.PO_CD2.replace(/\//gi, '_');
            /*
            var tPoCdArray = tPoCds.split('_');
            var tInPoCds = `'99', '98' `;
            tPoCdArray.forEach((col, i) => {
                tInPoCds += `, '${col}'`;
            });
            */
            var tPoCdArray = [];
            tInput3.forEach((col, i) => {
                var tCols = col.PO_SEQ.split('/');
                tCols.forEach((col1, i1) => {
                    var tCols1 = col1.split(',');
                    if (tCols1.length > 1) {
                        var tObj = {};
                        tObj.PO_CD = tCols1[0];
                        tObj.PO_SEQ = tCols1[1];
                        var tCheck1 = 0;
                        tPoCdArray.forEach((col2, i2) => {
                            if (col2.PO_CD === tObj.PO_CD) {
                                if (
                                    parseFloat(col2.PO_SEQ) >=
                                    parseFloat(tObj.PO_SEQ)
                                )
                                    tCheck1 = 1;
                                else {
                                    tPoCdArray[i2] = {
                                        ...tObj,
                                    };
                                    tCheck1 = 1;
                                }
                            }
                        });
                        if (tCheck1 === 0) tPoCdArray.push(tObj);
                    }
                });
            });

            var tVendorName = tInput1.VENDOR_NAME.replace(/ /gi, '_');
            tVendorName = tVendorName.replace(/\(/gi, '_');
            tVendorName = tVendorName.replace(/\)/gi, '_');

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
                var tTemplateExcel = `${tPath0}/PURCHASE_ORDER_SHEET_IMPORT_240201.xlsx`;

                if (kindOfReport === 'BASIC') {
                    tTemplateExcel = `${tPath0}/PO_SHEET_BASIC.xlsx`;
                }

                if (kindOfReport === 'BVT') {
                    tTemplateExcel = `${tPath0}/PO_SHEET_BVT.xlsx`;
                }

                var fileUrl = '';
                var tWExcelFile = '';

                var tPoCd = tPoCdArray[0].PO_CD;

                tWExcelFile = '';
                /*
                if (tInput2.KIND === 'ALL')
                        tWExcelFile = `PO_POLIST_${tVendorName}_${tPoCds}_SEQ-ALL_${tRetDate1}_${tInput1.PU_CD}`;
                else if (tInput2.KIND === 'BAL')
                        tWExcelFile = `PO_POLIST_${tVendorName}_${tPoCds}_SEQ-Bal_${tRetDate1}_${tInput1.PU_CD}`;
                else
                        tWExcelFile = `PO_POLIST_${tVendorName}_${tPoCds}_SEQ-ALL_${tRetDate1}_${tInput1.PU_CD}`;
                */

                const wb = new Excel.Workbook();
                await wb.xlsx.readFile(tTemplateExcel);

                var tSheetName = `Purchase Sheet`;
                if (kindOfReport === 'BVT') {
                    tSheetName = `BVT`;
                }
                let sheet = wb.getWorksheet(tSheetName);

                var sqlPuMst = `
                    select
                        a.*,
                        b.PAY_TYPE as PAY_TYPE2
                    from
                        ksv_pu_mst2 a,
                        kcd_vendor b
                    where
                        a.pu_cd = '${tInput1.PU_CD}'
                        and a.vendor_cd = b.vendor_cd
                `;
                var retPuMst = await prisma.$queryRaw(Prisma.raw(sqlPuMst));

                var sql0_1 = `
                    select
                        max(pu_seq) as max_pu_seq
                    from
                        ksv_pu_mem2
                    where
                        pu_cd = '${tInput1.PU_CD}'
                        and po_cd = '${tPoCd}'
                `;
                var tRet0_1 = await prisma.$queryRaw(Prisma.raw(sql0_1));
                var tMaxPuSeq = 1;
                if (tRet0_1.length > 0) tMaxPuSeq = tRet0_1[0].max_pu_seq;

                var tMaxPoSeq = 1;

                tInput3.forEach((col, i) => {
                    if (parseFloat(col.PO_SEQ) > tMaxPoSeq)
                        tMaxPoSeq = parseFloat(col.PO_SEQ);
                });

                var sql1 = `
                    select
                        *
                    from
                        kcd_user
                    where
                        user_id = '${tUserInfo.USER_ID}'
                `;
                var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                var tEmail = '';
                var tUserObj = {};
                if (tRet1.length > 0) {
                    tUserObj = {
                        ...tRet1[0],
                    };
                    tEmail = tUserObj.EMAIL;
                }

                var sql2 = `
                    select
                        top 1 c.factory_name,
                        c.addr1,
                        c.addr2,
                        c.tel_no,
                        c.fax_no
                    from
                        ksv_po_mst a,
                        kcd_factory c
                    where
                        a.po_cd = '${tPoCd}'
                        and c.factory_cd = a.factory_cd
                `;
                var tRet2 = await prisma.$queryRaw(Prisma.raw(sql2));
                var tFactoryObj = {
                    ...tRet2[0],
                };

                var tStr1 = `${tUserInfo.USER_ID}|${tEmail}`;
                sheet.getCell(4, 2).value = tStr1;
                sheet.getCell(3, 15).value = moment(
                    tRetDate1,
                    'YYYYMMDD',
                ).format('YYYY-MM-DD');
                sheet.getCell(4, 15).value = tInput1.PU_CD;

                var sql3 = `
                    select
                        vendor_name,
                        vendor_cd,
                        reg_no,
                        user_name,
                        email,
                        addr1,
                        addr2,
                        tel_no,
                        fax_no
                    from
                        kcd_vendor
                    where
                        vendor_cd = '${tInput1.VENDOR_CD}'
                `;
                var tRet3 = await prisma.$queryRaw(Prisma.raw(sql3));
                var tVendorObj = {
                    ...tRet3[0],
                };

                sheet.getCell(6, 2).value = tVendorObj.vendor_name;
                //sheet.getCell(7, 2).value = `${tVendorObj.addr1} ${tVendorObj.addr2}`;
                sheet.getCell(7, 2).value = `${tVendorObj.addr1}`;
                sheet.getCell(8, 2).value =
                    `TEL:${tVendorObj.tel_no} FAX:${tVendorObj.fax_no}`;

                sheet.getCell(9, 7).value =
                    `ATTN: [${tEmail}]/fithun1.shints@gmail.com`;
                sheet.getCell(14, 7).value =
                    `* Please send the copies of shipping docs to [${tEmail}].when the goods are ready.`;

                /*
                sheet.getCell(1562, 3).value = tInput1.BUYER_NAME;
                sheet.getCell(1564, 3).value = tInput1.TRADE_TERM;
                sheet.getCell(1564, 4).value = tInput1.PAY_TERM;
                */

                sheet.getCell(11, 4).value =
                    `${tInput1.BUYER_NAME} (${tInput1.BUYER_CD})`;
                sheet.getCell(12, 4).value = tInput1.TRADE_TERM;
                // sheet.getCell(13, 4).value = moment(tInput1.DUE_DATE, 'YYYYMMDD').format('YYYY-MM-DD');
                sheet.getCell(13, 4).value = moment(
                    tInput1.EX_FACTORY,
                    'YYYYMMDD',
                ).format('YYYY-MM-DD');

                var tPayTypeN = '';
                if (retPuMst.length > 0) {
                    var paySql = `
                        select
                            *
                        from
                            kcd_code
                        where
                            cd_group = 'PAY_TYPE'
                            and cd_code = '${retPuMst[0].PAY_CONDITION}'
                    `;
                    var payRet = await prisma.$queryRaw(Prisma.raw(paySql));
                    if (payRet.length > 0) tPayTypeN = payRet[0].CD_NAME;

                    if (
                        retPuMst[0].PAY_TYPE2 &&
                        retPuMst[0].PAY_TYPE2.length > 5
                    ) {
                        var paySql = `
                            select
                                *
                            from
                                kcd_code
                            where
                                cd_group = 'PAY_TYPE'
                                and cd_name like '%${retPuMst[0].PAY_TYPE2}%'
                        `;
                        var payRet = await prisma.$queryRaw(Prisma.raw(paySql));
                        if (payRet.length > 0)
                            tPayTypeN = retPuMst[0].PAY_TYPE2;
                        else tPayTypeN = retPuMst[0].PAY_TYPE2;
                    }
                }
                sheet.getCell(14, 4).value = tPayTypeN;
                /*
                switch(tInput1.PAY_TERM) {
                    case '0':sheet.getCell(14, 4).value = 'T/T 100% before shipment'; break;
                    case '1':sheet.getCell(14, 4).value = '30days after end of delivery month'; break;
                    case '2':sheet.getCell(14, 4).value = '60days after end of delivery month'; break;
                }
                */

                if (tInput1.SHIP_TO === 'BVT')
                    sheet.getCell(16, 4).value = 'Shints BVT Co.,Ltd.';
                else if (tInput1.SHIP_TO === 'ETP')
                    sheet.getCell(16, 4).value = 'Shints ETP Garment PLC';
                else
                    sheet.getCell(16, 4).value =
                        'Shin Textile Solutions Co., Ltd.';

                if (tInput1.SHIP_TO === 'BVT' || kindOfReport === 'BVT') {
                    sheet.getCell('G6').value = 'SHINTS BVT Co,.LTD.';
                    sheet.getCell('G7').value =
                        'PHU TAO RESIDENTIAL AREA, THACH KHOI WARD, HAI PHONG CITY, VIET NAM';
                    sheet.getCell('G8').value =
                        'TEL: 84 320 3861 727 | FAX: 84 320 3861 7830';
                    sheet.getCell('G9').value =
                        'ATTN: Ms.Ha + Ms.Thuy | POSTAL CODE: 34000 | BVT TAX CODE 0800006025';
                }

                var sql4 = `
                    select
                        *
                    from
                        kcd_code
                    where
                        cd_group = 'ORIGIN_PORT'
                        and cd_code = '${tInput1.ORIGIN_PORT}'
                `;
                var tRet4 = await prisma.$queryRaw(Prisma.raw(sql4));
                if (tRet4.length > 0)
                    sheet.getCell(18, 4).value = tRet4[0].ETC2;

                var sql5 = '';
                var tPurchaseObj = [];

                tInput3.forEach((col, i) => {
                    var tObj = {};
                    tObj.po_cd = col.PO_CD;
                    tObj.matl_cd = col.MATL_CD;
                    tObj.matl_name = col.MATL_NAME;
                    tObj.spec = col.SPEC;
                    tObj.color = col.COLOR;
                    tObj.unit = col.UNIT;
                    tObj.bef_po_qty = col.BEF_PO_QTY;
                    tObj.new_po_qty = col.NEW_PO_QTY;
                    tObj.diff_qty = col.DIFF_QTY;
                    tObj.po_qty = col.PO_QTY;
                    tObj.bal = col.BAL;
                    tObj.curr_cd = col.CURR_CD;
                    tObj.po_price = col.PO_PRICE;
                    tObj.surcharge_remark = col.SURCHARGE_REMARK;
                    tObj.seq = col.SEQ;

                    tPurchaseObj.push(tObj);
                });

                tDelArray.forEach((col, i) => {
                    var tObj = {};
                    tObj.po_cd = col.PO_CD;
                    tObj.matl_cd = col.MATL_CD;
                    tObj.matl_name = col.MATL_NAME;
                    tObj.spec = col.SPEC;
                    tObj.color = col.COLOR;
                    tObj.unit = col.UNIT;
                    tObj.bef_po_qty = col.PO_QTY2;
                    tObj.new_po_qty = 0;
                    tObj.diff_qty = -1 * parseFloat(col.PO_QTY2);
                    tObj.po_qty = 0;
                    tObj.bal = 0;
                    tObj.curr_cd = col.CURR_CD;
                    tObj.po_price = col.PO_PRICE;
                    tObj.surcharge_remark = '';
                    tObj.seq = col.SEQ;

                    tPurchaseObj.push(tObj);
                });

                var tTotBefPoQty = 0;
                var tTotNewPoQty = 0;
                var tTotDiffQty = 0;
                var tTotBalQty = 0;
                var tTotAmt = 0;

                var tRowIdx = 21;
                let startIdx = tRowIdx;
                var tIdx2 = 0;

                for (tIdx2 = 0; tIdx2 < tPurchaseObj.length; tIdx2++) {
                    var col = tPurchaseObj[tIdx2];

                    if (tInput2.KIND === 'BAL' && parseInt(col.bal) === 0) {
                        continue;
                    }

                    if (
                        parseFloat(col.bef_po_qty) === 0 &&
                        parseFloat(col.new_po_qty) === 0
                    ) {
                        sheet.spliceRows(tRowIdx, 1);
                        continue;
                    }

                    if (tIdx2 > 0) {
                        sheet.insertRow(tRowIdx, []);
                    }

                    sheet.getCell(tRowIdx, 2).value = col.po_cd;
                    sheet.getCell(tRowIdx, 3).value = col.matl_cd;

                    // STYLE CODE
                    var poSql = '';
                    var tCols = col.po_cd.split('/');
                    tCols.forEach((col, i) => {
                        if (i === 0) poSql = ` '${col}' `;
                        else poSql += ` ,'${col}' `;
                    });

                    let styleNameList = await prisma.$queryRaw(
                        Prisma.raw(`
                            select
                                style_name
                            from
                                KCD_STYLE
                            where
                                STYLE_CD in (
                                    select distinct
                                        style_cd
                                    from
                                        ksv_order_mst
                                    where
                                        order_cd in (
                                            select distinct
                                                order_cd
                                            from
                                                ksv_po_mem
                                            where
                                                po_cd in (${poSql})
                                        )
                                )
                        `),
                    );

                    if (kindOfReport === 'BASIC' || kindOfReport === 'BVT') {
                        sheet.getCell(`D${tRowIdx}`).value = col.matl_name;
                        sheet.getCell(`D${tRowIdx}`).alignment = {
                            horizontal: 'left',
                        };
                    } else {
                        const styleText = styleNameList
                            .map((row) => row.style_name)
                            .join('\n');

                        sheet.getCell(tRowIdx, 4).value = styleText;
                        sheet.getCell(tRowIdx, 4).alignment = {
                            horizontal: 'left',
                            vertical: 'top',
                            wrapText: true,
                        };

                        // STYLE_NAME 기준 컬럼 폭 자동 계산
                        const maxLineLength = Math.max(
                            ...styleText
                                .split('\n')
                                .map((line) => line.length * 1.5),
                        );

                        // 최소/최대 폭 제한
                        const minWidth = 20;

                        sheet.getColumn(4).width = maxLineLength + 10;
                    }

                    sheet.getCell(tRowIdx, 5).value = col.matl_name;
                    sheet.getCell(tRowIdx, 6).value = col.color;
                    sheet.getCell(tRowIdx, 7).value = col.spec;
                    sheet.getCell(tRowIdx, 8).value = col.unit;

                    var sql51 = `
                        SELECT
                            top 1 a.matl_price,
                            a.curr_cd,
                            c.usd_rate
                        FROM
                            kcd_matl_mem a,
                            ksv_po_mrp b,
                            kcd_curr_com c
                        WHERE
                            a.matl_cd = '${col.matl_cd}'
                            and b.po_cd in (${poSql})
                            AND a.matl_cd = b.matl_cd
                            AND a.matl_seq = b.matl_seq
                            and a.curr_cd = c.curr_cd
                            and c.start_date = (
                                select
                                    max(start_date)
                                from
                                    kcd_curr_com
                            )
                    `;
                    var tRet51 = await prisma.$queryRaw(Prisma.raw(sql51));

                    var tMatlPrice = '';
                    var tCurrCd = '';
                    var tUsdRate = '';
                    if (tRet51.length > 0) {
                        tMatlPrice = tRet51[0].matl_price;
                        tCurrCd = tRet51[0].curr_cd;
                        tUsdRate = tRet51[0].usd_rate;
                    }
                    tInput3.forEach((col1, i) => {
                        if (
                            col1.PO_CD === col.po_cd &&
                            col1.MATL_CD === col.matl_cd
                        ) {
                            tMatlPrice = col1.PO_PRICE;
                            tCurrCd = col1.CURR_CD;
                        }
                    });
                    sheet.getCell(tRowIdx, 9).value = Number(col.po_price);
                    sheet.getCell(tRowIdx, 10).value = col.curr_cd;
                    sheet.getCell(tRowIdx, 10).alignment = {
                        horizontal: 'center',
                    };

                    /*
                    sheet.getCell(tRowIdx, 10).value = Number(parseInt(col.po_qty));
                    sheet.getCell(tRowIdx, 11).value = Number(parseInt(col.bal));
                    sheet.getCell(tRowIdx, 12).value = Number(parseInt(col.po_qty) - parseInt(col.bal));
                    */
                    sheet.getCell(tRowIdx, 11).value = Number(
                        parseInt(col.bef_po_qty),
                    );
                    sheet.getCell(tRowIdx, 12).value = Number(
                        parseInt(col.new_po_qty),
                    );
                    sheet.getCell(tRowIdx, 13).value = Number(
                        parseInt(col.diff_qty),
                    );
                    sheet.getCell(tRowIdx, 11).font = basicFont;
                    sheet.getCell(tRowIdx, 12).font = basicFont;
                    sheet.getCell(tRowIdx, 13).font = basicFont;

                    sheet.getCell(tRowIdx, 14).fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: {
                            argb: 'FFF9C4',
                        }, // 연한 노랑 (#FFF9C4)
                    };
                    var tAmt =
                        parseFloat(col.po_price) * parseFloat(col.diff_qty);
                    sheet.getCell(tRowIdx, 14).value = { formula: `=I${tRowIdx}*L${tRowIdx}` };
                    const diffQtyVal = parseFloat(String(col.diff_qty || '0'));

                    if ((parseInt(tInput2.PU_SEQ) > 1 || (tMaxPuSeq > 1 && tInput2.PU_SEQ === 'W'))) {
                        if (diffQtyVal > 0) sheet.getCell(tRowIdx, 15).value = 'ADD';
                            else if (diffQtyVal < 0)
                                sheet.getCell(tRowIdx, 15).value = 'CANCEL';
                            else sheet.getCell(tRowIdx, 15).value = '';
                    }

                    // 변경된 항목인 경우 배경색 음영(노란색)으로 표시
                    const poList = col.po_cd.split('/');

                    let isChanged = false;

                    for (const po of poList) {
                        const key = `${po.trim()}_${col.matl_cd.trim()}`;

                        if (changedMap.has(key)) {
                            isChanged = true;
                            break;
                        }
                    }

                    if ((parseInt(tInput2.PU_SEQ) > 1 || (tMaxPuSeq > 1 && tInput2.PU_SEQ === 'W')) && isChanged) {
                        for (let c = 2; c <= 15; c++) {
                            sheet.getCell(tRowIdx, c).fill = {
                                type: 'pattern',
                                pattern: 'solid',
                                fgColor: { argb: 'FFFFFF00' },
                            };
                        }
                    }

                    tTotAmt += tAmt;
                    tTotBefPoQty += parseFloat(col.bef_po_qty);
                    tTotNewPoQty += parseFloat(col.new_po_qty);
                    tTotDiffQty += parseFloat(col.diff_qty);

                    // B열(2) ~ O열(15)까지 테두리 적용
                    for (let colIdx = 2; colIdx <= 15; colIdx++) {
                        sheet.getCell(tRowIdx, colIdx).border = {
                            top: { style: 'thin' },
                            left: { style: 'thin' },
                            bottom: { style: 'thin' },
                            right: { style: 'thin' },
                        };
                    }

                    if (kindOfReport === 'BASIC' || kindOfReport === 'BVT') {
                        sheet.getCell(`D${tRowIdx}`).border = {};
                        sheet.getCell(`E${tRowIdx}`).border = {};

                        sheet.getCell(`D${tRowIdx}`).border = {
                            top: undefined,
                            left: undefined,
                            bottom: { style: 'thin' },
                            right: undefined,
                        };

                        sheet.getCell(`E${tRowIdx}`).border = {
                            top: undefined,
                            left: undefined,
                            bottom: { style: 'thin' },
                            right: undefined,
                        };
                    }

                    const rightCols = ['I', 'K', 'L', 'M', 'N'];
                    const centerCols = ['H', 'J'];

                    const lastRow = sheet.rowCount;

                    for (let r = 21; r <= lastRow; r++) {
                        rightCols.forEach((col) => {
                            sheet.getCell(`${col}${r}`).alignment = {
                                horizontal: 'right',
                            };
                        });

                        centerCols.forEach((col) => {
                            sheet.getCell(`${col}${r}`).alignment = {
                                horizontal: 'center',
                            };
                        });
                    }

                    tRowIdx += 1;
                }

                sheet.getCell(tRowIdx, 11).value = { formula: `=SUM(K21:K${tRowIdx - 1})` };
                sheet.getCell(tRowIdx, 12).value = { formula: `=SUM(L21:L${tRowIdx - 1})` };
                sheet.getCell(tRowIdx, 13).value = { formula: `=SUM(M21:M${tRowIdx - 1})` };
                sheet.getCell(tRowIdx, 14).value = { formula: `=SUM(N21:N${tRowIdx - 1})` };

                for (let rowNum = 21; rowNum <= tRowIdx - 1; rowNum++) {
                    const row = sheet.getRow(rowNum);
                    const cell = row.getCell(2); // B열

                    if (
                        cell.value &&
                        typeof cell.value === 'string' &&
                        cell.value.includes('/')
                    ) {
                        const modified = cell.value.split('/').join(',\n');
                        cell.value = modified;

                        // wrap text 적용
                        cell.alignment = {
                            wrapText: true,
                        };

                        // 줄 수에 따라 행 높이 조정
                        const lineCount = modified.split('\n').length;
                        row.height = 15 * lineCount; // <-- row 객체에 설정해야 함!
                    }
                    row.commit(); //
                }

                // 이미지 등록 (addImage)
                const imageId = wb.addImage({
                    filename: `${tPath0}/sign.png`,
                    extension: 'png',
                });

                if (kindOfReport !== 'BVT') {
                    sheet.addImage(imageId, {
                        tl: {
                            col: 14,
                            row: tRowIdx + 1,
                        },
                        ext: {
                            width: 220,
                            height: 100,
                        }, // px 단위로 사이즈 설정
                        editAs: 'oneCell',
                    });
                }

                /*** DETAIL (STYLE_NAME 포함) ***/
                var tPoInfoArray = [];
                var tCols2 = retPuMst[0].PO_CD2.split('/');
                tCols2.forEach((col, i) => {
                    if (col) {
                        if (tPoInfoArray.length <= 0) tPoInfoArray.push(col);
                        else {
                            var tChk2 = 0;
                            tPoInfoArray.forEach((col1, i1) => {
                                if (col1 === col) tChk2 = 1;
                            });
                            if (tChk2 === 0) tPoInfoArray.push(col);
                        }
                    }
                });

                var poDataList = [];
                var tPuMst = {
                    ...retPuMst[0],
                };
                var tIdx9 = 0;
                // for (tIdx9 = 0; tIdx9 < tPoInfoArray.length; tIdx9 ++) {
                for (tIdx9 = 0; tIdx9 < tPoCdArray.length; tIdx9++) {
                    var poObj = {
                        ...tPoCdArray[tIdx9],
                    };
                    var tPoCd = poObj.PO_CD;
                    var sqlPo = `
                        select
                            *
                        from
                            ksv_po_mst
                        where
                            po_cd = '${tPoCd}'
                            and po_seq = (
                                select
                                    max(po_seq)
                                from
                                    ksv_po_mst
                                where
                                    po_cd = '${tPoCd}'
                                    and (
                                        po_seq < 97
                                        or po_seq > 100
                                    )
                            )
                    `;
                    var retPo = await prisma.$queryRaw(Prisma.raw(sqlPo));

                    var sqlVendor = `
                        select
                            *
                        from
                            kcd_vendor
                        where
                            vendor_cd = '${tPuMst.VENDOR_CD}'
                    `;
                    var retVendor = await prisma.$queryRaw(
                        Prisma.raw(sqlVendor),
                    );

                    var tPoInfo = {};
                    tPoInfo.po_no = tPoCd;
                    tPoInfo.date = retPo[0].REG_DATETIME.substring(0, 8);
                    tPoInfo.supplier = retVendor[0].VENDOR_NAME;
                    tPoInfo.entries = [];

                    var sqlOrder = `
                        select
                            a.order_cd,
                            b.style_name,
                            a.ref_order_no
                        from
                            ksv_po_mem k,
                            ksv_order_mst a,
                            kcd_style b
                        where
                            k.po_cd = '${tPoCd}'
                            and k.po_seq = 1
                            and k.order_cd = a.order_cd
                            and a.style_cd = b.style_cd
                    `;
                    var retOrder = await prisma.$queryRaw(Prisma.raw(sqlOrder));
                    var tOrderArray = [];
                    var tIdx100 = 0;
                    for (tIdx100 = 0; tIdx100 < retOrder.length; tIdx100++) {
                        var col = {
                            ...retOrder[tIdx100],
                        };
                        var tObj = {};
                        tObj.orderNo = col.order_cd;
                        tObj.styleNo = col.style_name;
                        tObj.buyerPoNo = col.ref_order_no;
                        tObj.matlList = [];

                        // 조회시: leftOver는 제외. 작업시 이미 반영됨 (use_po_type =1, diff_po_type = 1)
                        var sqlMatl = `
                            select
                                a.order_cd,
                                a.matl_cd,
                                b.matl_name,
                                b.spec,
                                b.color,
                                b.unit,
                                -- sum(a.use_qty) as use_qty
                                sum(a.po_qty) as use_qty
                            from
                                ksv_po_mrp a,
                                kcd_matl_mst b
                            where
                                a.po_cd = '${tPoCd}'
                                and a.po_seq <= ${poObj.PO_SEQ}
                                and a.order_cd = '${col.order_cd}'
                                and a.use_po_type = '1'
                                -- and  a.diff_po_type in ('0', '1', '3', '2')
                                and a.diff_po_type in ('0', '3', '2')
                                and a.matl_cd = b.matl_cd
                                and b.vendor_cd = '${tPuMst.VENDOR_CD}'
                            group by
                                a.order_cd,
                                a.matl_cd,
                                b.matl_name,
                                b.spec,
                                b.color,
                                b.unit
                            having
                                sum(a.po_qty) > 0
                        `;
                        var retMatl = await prisma.$queryRaw(
                            Prisma.raw(sqlMatl),
                        );
                        retMatl.forEach((col, i) => {
                            var tObj3 = {};
                            tObj3.matlCd = col.matl_cd;
                            tObj3.desc = col.matl_name;
                            tObj3.spec = col.spec;
                            tObj3.color = col.color;
                            tObj3.unit = col.unit;
                            tObj3.qty = col.use_qty;
                            tObj.matlList.push(tObj3);
                        });
                        tOrderArray.push(tObj);
                    }
                    tPoInfo.entries = [...tOrderArray];
                    poDataList.push(tPoInfo);
                }

                const borderStyle = {
                    top: {
                        style: 'thin',
                    },
                    bottom: {
                        style: 'thin',
                    },
                    left: {
                        style: 'thin',
                    },
                    right: {
                        style: 'thin',
                    },
                };
                const headerFill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: {
                        argb: 'FFCCE5FF',
                    },
                };

                poDataList.forEach((poData) => {
                    if (kindOfReport !== 'DETAIL') {
                        return;
                    }
                    const shouldHighlightChangedRows =
                        parseInt(tInput2.PU_SEQ) > 1 ||
                        (tMaxPuSeq > 1 && tInput2.PU_SEQ === 'W');

                    let sheet = wb.addWorksheet(poData.po_no);

                    sheet.columns = [
                        {
                            width: 20,
                        },
                        {
                            width: 40,
                        },
                        {
                            width: 35,
                        },
                        {
                            width: 25,
                        },
                        {
                            width: 8,
                        },
                        {
                            width: 12,
                        },
                    ];

                    sheet.mergeCells('A1:F1');
                    const titleCell = sheet.getCell('A1');
                    titleCell.value = 'ORDER DETAIL';
                    titleCell.font = {
                        name: '맑은 고딕',
                        size: 18,
                        bold: true,
                    };
                    titleCell.alignment = {
                        horizontal: 'center',
                        vertical: 'middle',
                    };

                    const labels = ['P/O No:', 'DATE:', 'SUPPLIER:'];
                    //const values = [poData.po_no, poData.date, poData.supplier];
                    const values = [
                        poData.po_no,
                        moment().format('YYYY-MM-DD'),
                        poData.supplier,
                    ];

                    for (let i = 0; i < labels.length; i++) {
                        const rowNum = i + 2;
                        sheet.getCell(`A${rowNum}`).value = labels[i];
                        sheet.getCell(`A${rowNum}`).font = {
                            name: '돋움',
                            size: 11,
                            bold: true,
                        };
                        sheet.getCell(`B${rowNum}`).value = values[i];
                        sheet.getCell(`B${rowNum}`).font = basicFont;
                    }

                    let rowIdx = 6;

                    poData.entries.forEach((entry) => {
                        if (!entry.matlList.length) return;

                        sheet.mergeCells(`B${rowIdx}:E${rowIdx}`);
                        const orderHeaderRow = sheet.getRow(rowIdx);
                        orderHeaderRow.getCell(1).value = 'ORDER NO';
                        orderHeaderRow.getCell(2).value = 'STYLE NO';
                        orderHeaderRow.getCell(6).value = 'BUYER PO NO';
                        [1, 2, 6].forEach((col) => {
                            const cell = orderHeaderRow.getCell(col);
                            cell.font = {
                                name: '돋움',
                                size: 11,
                                bold: true,
                            };
                            cell.alignment = {
                                horizontal: 'center',
                            };
                            cell.fill = headerFill;
                            cell.border = borderStyle;
                        });
                        rowIdx++;

                        sheet.mergeCells(`B${rowIdx}:E${rowIdx}`);
                        const orderValueRow = sheet.getRow(rowIdx);
                        orderValueRow.getCell(1).value = entry.orderNo;
                        orderValueRow.getCell(2).value = entry.styleNo;
                        orderValueRow.getCell(6).value = entry.buyerPoNo || '';
                        [1, 2, 6].forEach((col) => {
                            const cell = orderValueRow.getCell(col);
                            cell.font = basicFont;
                            cell.alignment = {
                                horizontal: col === 2 ? 'left' : 'left',
                                vertical: 'middle',
                            };
                            cell.border = borderStyle;
                        });
                        rowIdx++;

                        const matlHeader = [
                            "Mat'l Cd",
                            'DESCRIPTION',
                            'SPECIFICATION',
                            'COLOR',
                            'UNIT',
                            "Q'TY",
                        ];
                        const matlHeaderRow = sheet.getRow(rowIdx);
                        matlHeaderRow.values = matlHeader;
                        matlHeaderRow.eachCell((cell) => {
                            cell.font = basicFont;
                            cell.fill = headerFill;
                            cell.border = borderStyle;
                            cell.alignment = {
                                horizontal: 'center',
                            };
                        });
                        rowIdx++;

                        entry.matlList.forEach((matl) => {
                            const row = sheet.getRow(rowIdx);
                            row.values = [
                                matl.matlCd,
                                matl.desc,
                                matl.spec,
                                matl.color,
                                matl.unit,
                                matl.qty,
                            ];
                            row.eachCell((cell, colNum) => {
                                cell.font = basicFont;
                                cell.border = borderStyle;
                                cell.alignment = {
                                    horizontal: colNum === 6 ? 'right' : 'left',
                                };
                            });

                            // Highlight changed rows in ORDER DETAIL with same rule as Purchase Sheet.
                            const detailChangeKey = `${poData.po_no}_${String(matl.matlCd || '').trim()}`;
                            if (
                                shouldHighlightChangedRows &&
                                changedMap.has(detailChangeKey)
                            ) {
                                row.eachCell((cell) => {
                                    cell.fill = {
                                        type: 'pattern',
                                        pattern: 'solid',
                                        fgColor: { argb: 'FFFFFF00' },
                                    };
                                });
                            }

                            rowIdx++;
                        });

                        rowIdx++;
                    });
                });

                var tSQLArray = [];

                let tSQL99 = `
                    update ksv_pu_mst2
                    set
                        -- order_date = '${tRetDate1}' ,
                        origin_port = '${tInput1.ORIGIN_PORT}',
                        place_cd = '${tInput1.PLACE_CD}',
                        forward = '${tInput1.PLACE_CD}'
                    where
                        pu_cd = '${tInput1.PU_CD}'
                `;
                var tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                if (parseFloat(tInput2.PU_SEQ) === 1) tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    update ksv_po_vendor
                    set
                        end_date = '${tRetDate1}'
                    where
                        pu_cd = '${tInput1.PU_CD}'
                        and po_cd = '${tPoCd}'
                        and vendor_cd = '${tInput1.VENDOR_CD}'
                `;
                var tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                var wCurrPuSeq = 1;
                if (tInput2.PU_SEQ === 'W') {
                    var sql9_1 = `
                        select
                            isnull(max(pu_seq), 0) as pu_seq
                        from
                            ksv_pu_mem2
                        where
                            pu_cd = '${tInput1.PU_CD}'
                            and pu_seq < 900
                            -- and   po_cd = '${tPoCd0}'
                    `;
                    var tRet9_1 = await prisma.$queryRaw(Prisma.raw(sql9_1));
                    if (tRet9_1.length > 0) {
                        wCurrPuSeq = parseInt(tRet9_1[0].pu_seq);
                        wCurrPuSeq += 1;
                    }
                } else if (!tInput2.PU_SEQ) {
                    var sql9_1 = `
                        select
                            *
                        from
                            ksv_pu_mem2
                        where
                            pu_cd = '${tInput1.PU_CD}'
                            and (
                                send_datetime is null
                                or send_datetime = ''
                            )
                    `;
                    var tRet9_1 = await prisma.$queryRaw(Prisma.raw(sql9_1));
                    if (tRet9_1.length > 0) {
                        wCurrPuSeq = parseInt(tRet9_1[0].PU_SEQ);
                    } else {
                        var sql9_2 = `
                            select
                                isnull(max(pu_seq), 0) as pu_seq
                            from
                                ksv_pu_mem2
                            where
                                pu_cd = '${tInput1.PU_CD}'
                                and pu_seq < 900
                        `;
                        var tRet9_2 = await prisma.$queryRaw(
                            Prisma.raw(sql9_2),
                        );
                        if (tRet9_2.length > 0) {
                            wCurrPuSeq = parseInt(tRet9_2[0].pu_seq);
                            wCurrPuSeq += 1;
                        }
                    }
                } else {
                    wCurrPuSeq = parseInt(tInput2.PU_SEQ);
                }

                // Excel Write
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

                let puCd = tInput1.PU_CD;
                let buyerName = tInput1.BUYER_NAME;
                buyerName = buyerName.replace('/', '_');
                tVendorName = tVendorName.replace('/', '_');

                let tWExcelFile = '';
                switch (tInput1.VENDOR_TYPE_N) {
                    case 'DOMESTIC':
                        tWExcelFile = `${puCd}_${buyerName}_${tVendorName} 발주서 (PU Ver ${wCurrPuSeq})`;
                        break;
                    case 'IMPORT':
                    case 'BUYER':
                    case 'FACTORY':
                        tWExcelFile = `${puCd}_${buyerName}_${tVendorName} Purchase Order (PU Ver ${wCurrPuSeq})`;
                        break;
                }

                var tExcelFileName = `${tPath}/${tWExcelFile}.xlsx`;

                console.log(`IMPORT_NEW Excel FileName:${tWExcelFile}`);

                var tInObj0 = {};
                tInObj0.NAME = tWExcelFile;
                const _uploadGen = await generateUploadURL();
                tInObj0.URL = _uploadGen.uploadURL.split('?')[0];
                tInObj0.TITLE = tWExcelFile;
                tInObj0.FILE_KEY = tWExcelFile;
                tInObj0.KIND = 'S040102';

                console.log(`Generated Upload URL: ${tInObj0.URL}`);
                await upload(`${tWExcelFile}.xlsx`, wb, _uploadGen.uploadURL);
                console.log('-----------------');
                fileUrl = tInObj0.URL;

                var tIdx9 = 0;
                for (tIdx9 = 0; tIdx9 < tPoCdArray.length; tIdx9++) {
                    var tOne = {
                        ...tPoCdArray[tIdx9],
                    };
                    var tPoCd0 = tOne.PO_CD;
                    var tPoSeq0 = tOne.PO_SEQ;

                    let tSQL99 = `
                        delete from ksv_mail_log
                        where
                            pu_cd = '${tInput1.PU_CD}'
                            and po_seq = '${tPoSeq0}'
                            and po_cd = '${tPoCd0}'
                            and pu_seq = '${wCurrPuSeq}'
                            and vendor_cd = '${tInput1.VENDOR_CD}'
                    `;
                    var tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    var sql0_1 = `
                        select
                            *
                        from
                            ksv_pu_mem2
                        where
                            pu_cd = '${tInput1.PU_CD}'
                            and po_cd = '${tPoCd0}'
                            and pu_seq = '${wCurrPuSeq}'
                            -- and   send_datetime = ''
                    `;
                    var tRet0_1 = await prisma.$queryRaw(Prisma.raw(sql0_1));
                    if (
                        tRet0_1.length > 0 &&
                        wCurrPuSeq !== 'W' &&
                        wCurrPuSeq !== '999'
                    ) {
                        let tSQL99 = `
                            update ksv_pu_mem2
                            set
                                send_datetime = '${tRetDate}'
                            where
                                pu_cd = '${tRet0_1[0].PU_CD}'
                                and pu_seq = '${tRet0_1[0].PU_SEQ}'
                                and po_cd = '${tRet0_1[0].PO_CD}'
                                and po_seq = '${tRet0_1[0].PO_SEQ}'
                        `;
                        var tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);
                    } else {
                        var sql0_2 = `
                            select
                                *
                            from
                                ksv_pu_mem2
                            where
                                pu_cd = '${tInput1.PU_CD}'
                                and po_cd = '${tPoCd0}'
                                and pu_seq = '999'
                        `;
                        var tRet0_2 = await prisma.$queryRaw(
                            Prisma.raw(sql0_2),
                        );
                        if (tRet0_2.length > 0) {
                            var tOne3 = {
                                ...tRet0_2[0],
                            };
                            delete tOne3.id;
                            tOne3.PU_SEQ = wCurrPuSeq;
                            tOne3.PO_SEQ = tPoSeq0;
                            tOne3.SEND_DATETIME = tRetDate;
                            let tSQL99 = AFLib.createTableSql(
                                'ksv_pu_mem2',
                                tOne3,
                            );
                            var tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                            tSQLArray.push(tSQL99_1);
                        }
                    }

                    var tInObj = {};
                    tInObj.send_kind = tInput2.KIND;
                    tInObj.user_id = tUserInfo.USER_ID;
                    tInObj.po_cd = tPoCd0;
                    tInObj.po_seq = tPoSeq0;
                    tInObj.vendor_cd = tInput1.VENDOR_CD;
                    tInObj.send_email = tEmail;
                    tInObj.send_datetime = tRetDate;
                    tInObj.send_flag = '1';
                    tInObj.send_filename = tWExcelFile;
                    tInObj.pu_cd = tInput1.PU_CD;
                    tInObj.pu_seq = wCurrPuSeq;
                    tInObj.send_fileurl = fileUrl;
                    let tSQL99 = AFLib.createTableSql('ksv_mail_log', tInObj);
                    var tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }

                // stock_mem2_log save
                var sql0_2 = `
                    select
                        *
                    from
                        ksv_stock_mem2_log
                    where
                        pu_cd = '${tInput1.PU_CD}'
                        and pu_seq = '${wCurrPuSeq}'
                `;
                var tRet0_2 = await prisma.$queryRaw(Prisma.raw(sql0_2));
                if (tRet0_2.length <= 0) {
                    var tIdx = 0;
                    for (tIdx = 0; tIdx < tInput3.length; tIdx++) {
                        var col2 = {
                            ...tInput3[tIdx],
                        };
                        var tIdx2 = 0;
                        for (tIdx2 = 0; tIdx2 < col2.DATAS.length; tIdx2++) {
                            var col = {
                                ...col2.DATAS[tIdx2],
                            };

                            var save_data0 = { ...col.SAVE_DATA };
                            save_data0.MATL_NAME = col2.MATL_NAME.replace(
                                /'/gi,
                                '',
                            );
                            save_data0.COLOR = col2.COLOR.replace(/'/gi, '');
                            save_data0.SPEC = col2.SPEC.replace(/'/gi, '');
                            save_data0.PO_PRICE = col2.PO_PRICE;

                            var save_data = JSON.stringify(save_data0, null, 4);
                            col.BEF_PO_QTY = String(
                                parseFloat(col.PO_UPDATE_QTY) -
                                    parseFloat(col.DIFF_QTY),
                            );
                            let tSQL99 = `
                                insert into
                                    ksv_stock_mem2_log (
                                        pu_cd,
                                        pu_seq,
                                        po_cd,
                                        po_seq,
                                        matl_cd,
                                        po_qty,
                                        stock_qty,
                                        po_qty2,
                                        moq,
                                        curr_cd,
                                        master_price,
                                        freight_price,
                                        other_price,
                                        po_price,
                                        surcharge_remark,
                                        moq_price,
                                        leftover_qty,
                                        foc_qty,
                                        moq_stock_idx,
                                        foc_stock_idx,
                                        leftover_stock_idx,
                                        moq_amt,
                                        other_amt,
                                        freight_amt,
                                        shortage_qty,
                                        defect_qty,
                                        moq_confirm,
                                        moq_amt_confirm,
                                        freight_amt_confirm,
                                        other_amt_confirm,
                                        surcharge_price,
                                        surcharge_amt,
                                        reason,
                                        stsin_cd,
                                        bef_po_qty,
                                        new_po_qty,
                                        diff_qty,
                                        save_data
                                    )
                                select
                                    pu_cd,
                                    '${wCurrPuSeq}',
                                    po_cd,
                                    po_seq,
                                    matl_cd,
                                    ${col.MRP_QTY},
                                    ${col.STOCK_QTY},
                                    ${col.PO_QTY},
                                    ${col.MOQ_QTY},
                                    curr_cd,
                                    master_price,
                                    freight_price,
                                    other_price,
                                    ${col.PO_PRICE},
                                    surcharge_remark,
                                    moq_price,
                                    leftover_qty,
                                    foc_qty,
                                    moq_stock_idx,
                                    foc_stock_idx,
                                    leftover_stock_idx,
                                    moq_amt,
                                    other_amt,
                                    freight_amt,
                                    shortage_qty,
                                    defect_qty,
                                    moq_confirm,
                                    moq_amt_confirm,
                                    freight_amt_confirm,
                                    other_amt_confirm,
                                    ${col.SURCHARGE_PRICE},
                                    ${col.SURCHARGE_AMT},
                                    reason,
                                    stsin_cd,
                                    ${col.BEF_PO_QTY},
                                    ${col.PO_UPDATE_QTY},
                                    ${col.DIFF_QTY},
                                    '${save_data}'
                                from
                                    ksv_stock_mem2
                                where
                                    pu_cd = '${tInput1.PU_CD}'
                                    and po_cd = '${col.PO_CD}'
                                    and matl_cd = '${col.MATL_CD}'
                            `;
                            const tSQL99_1 = prisma.$queryRaw(
                                Prisma.raw(tSQL99),
                            );
                            if (tInput2.PU_SEQ && tInput2.PU_SEQ === 'W') {
                                tSQLArray.push(tSQL99_1);
                            }

                            let tSQL99_10 = `
                                update ksv_stock_mem2
                                set
                                    po_qty2 = ${col.PO_QTY}
                                where
                                    pu_cd = '${tInput1.PU_CD}'
                                    and po_cd = '${col.PO_CD}'
                                    and matl_cd = '${col.MATL_CD}'
                            `;
                            const tSQL99_10 = prisma.$queryRaw(
                                Prisma.raw(tSQL99_10),
                            );
                            if (tInput2.PU_SEQ && tInput2.PU_SEQ === 'W') {
                                tSQLArray.push(tSQL99_10);
                            }
                        }
                    }
                }

                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;

                // Mail
                var tTitle = tWExcelFile;
                var tCols = tInput2.MAIL_BODY.split(/\r\n/);
                var tBody = '';
                tBody += '<!DOCTYPE html>\r\n';
                tBody += '<html><head><meta charset="utf-8"></head><body>\r\n';
                tBody += '<div style="white-space: pre-wrap;">\r\n';
                tCols.forEach((col) => {
                    tBody += `<p style="margin:0;">${col}</p>`;
                });
                tBody += '</div></body></html>\r\n';

                let warehouseFileName = '';
                let warehouseFileName2 = '';
                switch (tInput1.PLACE_CD) {
                    case 'T007':
                        warehouseFileName = `${tPath0}/바론웨이{비알지}입고시협조사항.xls`;
                        warehouseFileName2 = `${tPath0}/바론웨이{비알지}인천입고증.xls`;
                        break;
                    case 'T005':
                        warehouseFileName = `${tPath0}/케이원_입고시협조사항.xls`;
                        break;
                    case 'T006':
                        warehouseFileName = `${tPath0}/LK창고_입고시협조사항.xls`;
                        break;
                    case 'T008':
                        warehouseFileName = `${tPath0}/HNF입고시협조사항.xls`;
                        break;
                    case 'T009':
                        warehouseFileName = `${tPath0}/판토스입고시협조사항.xls`;
                        break;
                    case 'T011':
                        warehouseFileName = `${tPath0}/서울항공물류센터_입고시협조사항.xls`;
                        warehouseFileName2 = `${tPath0}/서울항공물류센터_입고증.xls`;
                        break;
                    case 'T012':
                        warehouseFileName = `${tPath0}/서울항공물류센터_입고시협조사항.xls`;
                        warehouseFileName2 = `${tPath0}/서울항공물류센터_입고증(BVT).xls`;
                        break;
                    case 'T015':
                        warehouseFileName = `${tPath0}/엠앤엠통운_입고증.xls`;
                        break;
                    case 'T016':
                        warehouseFileName = `${tPath0}/하람로지스_입고증.xls`;
                        break;
                    case 'T017':
                        warehouseFileName = `${tPath0}/동서콘솔공항창고_입고증_BVT.xls`;
                        break;
                    case 'T018':
                        warehouseFileName = `${tPath0}/동서콘솔공항창고_입고증_ETP.xls`;
                        break;
                    case 'T001':
                        //warehouseFileName = `${tPath0}/인천항공동물류(유수로지스틱스)입고증.xlsx`;
                        warehouseFileName = `${tPath0}/영천항운_인천항공동물류 신티에스 입고증.xlsx`;
                        break;
                    default:
                        warehouseFileName = '';
                        warehouseFileName2 = '';
                }

                let warehouseFileUrl = '';
                if (warehouseFileName !== '') {
                    const _warehouseGen = await generateUploadURL();
                    warehouseFileUrl = _warehouseGen.uploadURL.split('?')[0];
                    await uploadFile(
                        warehouseFileName,
                        _warehouseGen.uploadURL,
                    );
                }

                let warehouseFileUrl2 = '';
                if (warehouseFileName2 !== '') {
                    const _warehouseGen2 = await generateUploadURL();
                    warehouseFileUrl2 = _warehouseGen2.uploadURL.split('?')[0];
                    await uploadFile(
                        warehouseFileName2,
                        _warehouseGen2.uploadURL,
                    );
                }

                let shippingMarkFileName = '';
                switch (tInput1.SHIP_TO) {
                    case 'BVT':
                        shippingMarkFileName = `${tPath0}/쉬핑마크_BVT.xls`;
                        break;
                    case 'ETP':
                        shippingMarkFileName = `${tPath0}/쉬핑마크_ETP.xls`;
                        break;
                }

                let shippingMarkFileUrl = '';
                if (shippingMarkFileName !== '') {
                    const _shippingMarkGen = await generateUploadURL();
                    shippingMarkFileUrl =
                        _shippingMarkGen.uploadURL.split('?')[0];
                    await uploadFile(
                        shippingMarkFileName,
                        _shippingMarkGen.uploadURL,
                    );
                }

                let file = [];
                file.push({
                    fileName: tWExcelFile + '.xlsx',
                    url: fileUrl,
                });

                if (warehouseFileName !== '') {
                    file.push({
                        fileName: warehouseFileName.split('/').pop(),
                        url: warehouseFileUrl,
                    });
                }

                if (warehouseFileName2 !== '') {
                    file.push({
                        fileName: warehouseFileName2.split('/').pop(),
                        url: warehouseFileUrl2,
                    });
                }

                if (shippingMarkFileUrl !== '') {
                    file.push({
                        fileName: shippingMarkFileName.split('/').pop(),
                        url: shippingMarkFileUrl,
                    });
                }

                console.log(file);

                /* 메일 전송 */
                try {
                    const response = await axios.post(
                        `https://${config.hostname}:3202/restapi/send_email`,
                        {
                            to: tEmail,
                            subject: tTitle, // 메일 제목
                            html: tBody,
                            files: file,
                        },
                        {
                            headers: {
                                'Content-Type': 'application/json',
                            }, // JSON 형식으로 요청
                        },
                    );

                    console.log('메일 전송:', response.data);
                } catch (error) {
                    console.log('메일 전송 실패:', error);
                }

                //
                console.log('Success excel:' + tWExcelFile);

                var tRetArray = [];
                var tObj = {};
                tObj.id = 1;
                // tObj.CODE = `SUCCESS:${tWExcelFile}.xlsx`;
                tObj.CODE = `SUCCESS?${tWExcelFile}.xlsx?${fileUrl}`;
                tRetArray.push(tObj);
                return tRetArray;
            } catch (error) {
                var tRetArray = [];
                var tObj = {};
                tObj.id = 1;
                tObj.CODE = `ERROR:${error.message}`;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },

        mgrQueryS040102_4_1: async (_, args, contextValue) => {

            var tInObj = { ...args.data };

            // 새로 추가된 항목에 대해서 PU_CD 등록
            var sqlCheckNew = `
                update a set pu_cd = '${tInObj.PU_CD}'
                from ksv_stock_mem a, kcd_matl_mst b, kcd_matl_mem b1
                where a.po_cd in (select distinct po_cd from ksv_stock_mem2 where pu_cd = '${tInObj.PU_CD}')
                and   b.vendor_cd in (select distinct vendor_cd from ksv_pu_mst2 where pu_cd = '${tInObj.PU_CD}')
                and   b1.curr_cd in (select distinct curr_cd from ksv_pu_mst2 where pu_cd = '${tInObj.PU_CD}')
                and   a.matl_cd = b.matl_cd
                and   b.matl_cd = b1.matl_cd
                and   b1.matl_seq = (select max(matl_seq) from kcd_matl_mem where matl_cd = b.matl_cd)
                and   isnull(a.pu_cd, '') = ''
            `;
            var retCheckNew = await prisma.$queryRaw(Prisma.raw(sqlCheckNew));

            sqlCheckNew = `
                update a set pu_cd = '${tInObj.PU_CD}'
                from ksv_po_mrp a, kcd_matl_mst b, kcd_matl_mem b1
                where a.po_cd in (select distinct po_cd from ksv_stock_mem2 where pu_cd = '${tInObj.PU_CD}')
                and   b.vendor_cd in (select distinct vendor_cd from ksv_pu_mst2 where pu_cd = '${tInObj.PU_CD}')
                and   b1.curr_cd in (select distinct curr_cd from ksv_pu_mst2 where pu_cd = '${tInObj.PU_CD}')
                and   a.matl_cd = b.matl_cd
                and   b.matl_cd = b1.matl_cd
                and   b1.matl_seq = (select max(matl_seq) from kcd_matl_mem where matl_cd = b.matl_cd)
                and   isnull(a.pu_cd, '') = ''
            `;
            retCheckNew = await prisma.$queryRaw(Prisma.raw(sqlCheckNew));


            if (!args.data.PU_SEQ || args.data.PU_SEQ === 'W') {
                var tFunc = new S040102_COMM();
                var tRetObj = await tFunc.queryS040102_4_1(
                    tInObj,
                    contextValue,
                );

                var tRetObj1 = {};
                tRetObj1.STOCK_MEM = [];
                tRetObj1.PU_MST = [];
                tRetObj1.PU_MST_NEW = [];

                var sqlStockMem2Log = `
                    select
                        a.*,
                        c.FACTORY_CD,
                        c.VENDOR_Cd,
                        b.MATL_NAME,
                        b.COLOR,
                        b.SPEC,
                        b.UNIT
                    from
                        ksv_stock_mem2_log a,
                        kcd_matl_mst b,
                        ksv_pu_mst2 c
                    where
                        a.pu_cd = '${args.data.PU_CD}'
                        and a.pu_seq = (
                            select
                                max(pu_seq)
                            from
                                ksv_stock_mem2_log
                            where
                                pu_cd = '${args.data.PU_CD}'
                                and pU_seq < 900
                        )
                        and a.pu_cd = c.pu_cd
                        and a.matl_cd = b.matl_cd
                `;
                var retStockMem2Log = await prisma.$queryRaw(
                    Prisma.raw(sqlStockMem2Log),
                );

                var tArray = [];
                var tIdx100 = 0;
                for (
                    tIdx100 = 0;
                    tIdx100 < tRetObj.STOCK_MEM.length;
                    tIdx100++
                ) {
                    var col0 = { ...tRetObj.STOCK_MEM[tIdx100] };

                    if (!col0.BEF_PO_QTY) col0.BEF_PO_QTY = '0';
                    if (!col0.NEW_PO_QTY) col0.NEW_PO_QTY = '0';

                    var tSaveDatas = [];

                    /* 1114 : 수정 */
                    var sumBefPoQty = 0;
                    var sumPoQty = 0;
                    var sumDiffQty = 0;
                    var sumOverQty = 0;

                    tSaveDatas = [];
                    col0.DATAS.forEach((col10, i10) => {
                        var tTmpObj = { ...col10 };
                        var tCheck2 = 0;
                        tRetObj1.STOCK_MEM.forEach((col11, i11) => {
                            if (col0.MATL_CD === col11.MATL_CD) {
                                col11.DATAS.forEach((col12, i12) => {
                                    if (
                                        col12.PO_CD === tTmpObj.PO_CD &&
                                        col12.MATL_CD === tTmpObj.MATL_CD
                                    ) {
                                        tTmpObj.BEF_PO_QTY = col12.PO_QTY;
                                        if (isNaN(tTmpObj.BEF_PO_QTY))
                                            tTmpObj.BEF_PO_QTY = '0';

                                        // BEF_PO_QTY는 PO_QTY2을 사용 . 260316
                                        tTmpObj.BEF_PO_QTY = col12.PO_QTY2;

                                        var wDiffQty =
                                            parseFloat(tTmpObj.PO_QTY) -
                                            parseFloat(tTmpObj.BEF_PO_QTY);
                                        tTmpObj.DIFF_QTY =
                                            parseFloat(wDiffQty).toFixed(2);

                                        sumBefPoQty += parseFloat(
                                            tTmpObj.BEF_PO_QTY,
                                        );
                                        sumPoQty += parseFloat(tTmpObj.PO_QTY);
                                        sumDiffQty += parseFloat(
                                            tTmpObj.DIFF_QTY,
                                        );
                                        sumOverQty += parseFloat(
                                            tTmpObj.OVER_QTY,
                                        );

                                        tSaveDatas.push(tTmpObj);
                                        tCheck2 = 1;
                                    }
                                });
                            }
                        });
                        if (tCheck2 === 0) {
                            sumBefPoQty += 0;
                            sumPoQty += parseFloat(tTmpObj.PO_QTY);
                            sumDiffQty += parseFloat(tTmpObj.PO_QTY);
                            sumOverQty += 0;
                            tTmpObj.BEF_PO_QTY = '0';
                            tTmpObj.DIFF_QTY = '0';
                            tSaveDatas.push(tTmpObj);
                        }
                    });
                    col0.DATAS = [...tSaveDatas];

                    // ReCheck
                    tSaveDatas = [];
                    var sumBefPoQty = 0;
                    var sumPoQty = 0;
                    var sumDiffQty = 0;
                    var sumOverQty = 0;
                    var sumFocQty = 0;

                    col0.DATAS.forEach((col10, i10) => {
                        var tTmpObj = { ...col10 };
                        var tCheck2 = 0;
                        retStockMem2Log.forEach((col11, i11) => {
                            if (
                                col10.PO_CD === col11.PO_CD &&
                                col10.MATL_CD === col11.MATL_CD
                            ) {
                                tTmpObj.BEF_PO_QTY = col11.NEW_PO_QTY;

                                // BEF_PO_QTY는 PO_QTY2을 사용 . 260316
                                tTmpObj.BEF_PO_QTY = col11.PO_QTY2;

                                var wDiffQty =
                                    parseFloat(tTmpObj.PO_QTY) -
                                    parseFloat(tTmpObj.BEF_PO_QTY);
                                tTmpObj.DIFF_QTY =
                                    parseFloat(wDiffQty).toFixed(2);

                                console.log(`Recheck: ${tTmpObj.BEF_PO_QTY} / ${tTmpObj.PO_QTY} / ${tTmpObj.DIFF_QTY}`);

                                /* WON.1230
                           if (parseFloat(tTmpObj.OVER_QTY) > 0) {
                               if (parseFloat(tTmpObj.OVER_QTY) >= parseFloat(tTmpObj.DIFF_QTY)) { 
                                    tTmpObj.PO_QTY = tTmpObj.BEF_PO_QTY;
                                    tTmpObj.DIFF_QTY = '0';
                               }
                           }
                           */

                                sumBefPoQty += parseFloat(tTmpObj.BEF_PO_QTY);
                                sumPoQty += parseFloat(tTmpObj.PO_QTY);
                                sumDiffQty += parseFloat(tTmpObj.DIFF_QTY);
                                sumOverQty += parseFloat(tTmpObj.OVER_QTY);
                                sumFocQty += parseFloat(tTmpObj.FOC_QTY);

                                tSaveDatas.push(tTmpObj);
                                tCheck2 = 1;
                            }
                        });
                        if (tCheck2 === 0) {
                            sumBefPoQty += 0;
                            sumPoQty += parseFloat(tTmpObj.PO_QTY);
                            sumDiffQty += parseFloat(tTmpObj.PO_QTY);
                            sumFocQty += parseFloat(tTmpObj.FOC_QTY);
                            sumOverQty += 0;
                            tTmpObj.BEF_PO_QTY = '0';
                            tTmpObj.DIFF_QTY = '0';
                            tSaveDatas.push(tTmpObj);
                        }
                    });
                    col0.DATAS = [...tSaveDatas];

                    var col = { ...col0 };
                    var tObj = { ...col };

                    tObj.BEF_PO_QTY = parseFloat(sumBefPoQty);
                    tObj.PO_QTY = parseFloat(sumPoQty);
                    tObj.DIFF_QTY = parseFloat(sumDiffQty);

                    tArray.push(tObj);
                }

                var tArray10 = [];
                tArray.forEach((col10, i10) => {
                    if (
                        parseFloat(col10.PO_SEQ) === 1 &&
                        parseFloat(col10.PO_QTY) <= 0 &&
                        parseFloat(col10.MRP_QTY) <= 0
                    );
                    else {
                        var tObj10 = { ...col10 };
                        tArray10.push(tObj10);
                    }
                });

                tRetObj.STOCK_MEM = [...tArray10];
            } else {
                // W가 아닌 PU Ver선택시  Start
                var tRetObj = {};
                tRetObj.STOCK_MEM = [];
                var sqlStockMem2Log = `
                    select
                        a.*,
                        c.FACTORY_CD,
                        c.VENDOR_Cd,
                        b.MATL_NAME,
                        b.COLOR,
                        b.SPEC,
                        b.UNIT,
                        d.PO_PRICE as PO_PRICE2
                    from
                        ksv_stock_mem2_log a,
                        kcd_matl_mst b,
                        ksv_pu_mst2 c,
                        ksv_stock_mem2 d
                    where
                        a.pu_cd = '${args.data.PU_CD}'
                        and a.pu_seq = '${args.data.PU_SEQ}'
                        and a.pu_cd = c.pu_cd
                        and a.matl_cd = b.matl_cd
                        and a.pu_cd = d.pu_cd
                        and a.po_cd = d.po_cd
                        and a.matl_cd = d.matl_cd
                    order by
                        a.MATL_CD
                `;
                var retStockMem2Log = await prisma.$queryRaw(
                    Prisma.raw(sqlStockMem2Log),
                );
                if (retStockMem2Log.length <= 0) {
                    var sqlStockMem2Log = `
                        select
                            a.*,
                            c.FACTORY_CD,
                            c.VENDOR_Cd,
                            b.MATL_NAME,
                            b.COLOR,
                            b.SPEC,
                            b.UNIT,
                            d.PO_PRICE as PO_PRICE2
                        from
                            ksv_stock_mem2_log a,
                            kcd_matl_mst b,
                            ksv_pu_mst2 c,
                            ksv_stock_mem2 d
                        where
                            a.pu_cd = '${args.data.PU_CD}'
                            and a.pu_seq = '999'
                            and a.pu_cd = c.pu_cd
                            and a.matl_cd = b.matl_cd
                            and a.pu_cd = d.pu_cd
                            and a.po_cd = d.po_cd
                            and a.matl_cd = d.matl_cd
                        order by
                            a.MATL_CD
                    `;
                    var retStockMem2Log = await prisma.$queryRaw(
                        Prisma.raw(sqlStockMem2Log),
                    );
                }

                var sqlStockMem2LogBef = `
                    select
                        a.*,
                        c.FACTORY_CD,
                        c.VENDOR_Cd,
                        b.MATL_NAME,
                        b.COLOR,
                        b.SPEC,
                        b.UNIT,
                        d.PO_PRICE as PO_PRICE2
                    from
                        ksv_stock_mem2_log a,
                        kcd_matl_mst b,
                        ksv_pu_mst2 c,
                        ksv_stock_mem2 d
                    where
                        a.pu_cd = '${args.data.PU_CD}'
                        and a.pu_seq = ${args.data.PU_SEQ} - 1
                        and a.pu_cd = c.pu_cd
                        and a.matl_cd = b.matl_cd
                        and a.pu_cd = d.pu_cd
                        and a.po_cd = d.po_cd
                        and a.matl_cd = d.matl_cd
                    order by
                        a.MATL_CD
                `;
                var retStockMem2LogBef = await prisma.$queryRaw(
                    Prisma.raw(sqlStockMem2LogBef),
                );
                console.log(
                    `Before stock_mem2_log: ${retStockMem2LogBef.length}`,
                );

                var tArray9 = [];
                var tSaveMatlCd = '';
                var tSaveMems = {};
                retStockMem2Log.forEach((col2_0, i2) => {
                    var col2 = { ...col2_0 };
                    if (!col2.BEF_PO_QTY) col2.BEF_PO_QTY = '0';
                    if (!col2.NEW_PO_QTY) col2.NEW_PO_QTY = '0';

                    var tBefObj = {};
                    retStockMem2LogBef.forEach((col3, i3) => {
                        if (
                            col3.PO_CD === col2.PO_CD &&
                            col3.MATL_CD === col2.MATL_CD
                        ) {
                            tBefObj = { ...col3 };
                        }
                    });

                    var tObj9 = {};
                    tObj9.PU_STATUS = col2.PU_STATUS;
                    tObj9.PO_CD = col2.PO_CD;
                    tObj9.PO_SEQ = col2.PO_SEQ;
                    tObj9.ORDER_CD = '';
                    tObj9.VENDOR_CD = col2.VENDOR_CD;
                    tObj9.MATL_CD = col2.MATL_CD;
                    tObj9.MRP_SEQ = '0';
                    tObj9.MATL_SEQ = '0';
                    tObj9.MATL_NAME = col2.MATL_NAME;
                    tObj9.COLOR = col2.COLOR;
                    tObj9.SPEC = col2.SPEC;
                    tObj9.UNIT = col2.UNIT;
                    tObj9.CURR_CD = col2.CURR_CD;
                    tObj9.FACTORY_CD = col2.FACTORY_CD;
                    tObj9.MASTER_PRICE = col2.MASTER_PRICE;
                    tObj9.SURCHARGE_AMT = col2.SURCHARGE_AMT;
                    tObj9.SURCHARGE_PRICE = col2.SURCHARGE_PRICE;
                    tObj9.SURCHARGE_REMARK = col2.SURCHARGE_REMARK;
                    // tObj9.PO_PRICE = col2.PO_PRICE;
                    tObj9.PO_PRICE = col2.PO_PRICE2;
                    tObj9.PU_CD = col2.PU_CD;

                    tObj9.MRP_QTY = col2.PO_QTY;
                    tObj9.MRP_QTY0 = col2.PO_QTY;
                    tObj9.MRP_QTY1 = col2.PO_QTY;
                    tObj9.STOCK_QTY = col2.STOCK_QTY;
                    tObj9.MOQ_QTY = col2.MOQ;
                    tObj9.OVER_QTY = col2.LEFTOVER_QTY;
                    tObj9.FOC_QTY = col2.FOC_QTY;
                    tObj9.LEFTOVER_QTY = '0';
                    tObj9.PO_QTY = col2.PO_QTY2;

                    if (!col2.BEF_PO_QTY) tObj9.BEF_PO_QTY = '0';
                    else tObj9.BEF_PO_QTY = col2.BEF_PO_QTY;
                    if (isNaN(tObj9.BEF_PO_QTY)) tObj9.BEF_PO_QTY = '0';

                    if (tBefObj.PO_QTY2) {
                        console.log(
                            `Bef StockMem2 exist: ${col2.PO_QTY2} - ${tBefObj.PO_QTY2}`,
                        );
                        tObj9.BEF_PO_QTY = parseFloat(tBefObj.PO_QTY2).toFixed(
                            2,
                        );
                    } else {
                        console.log(
                            `Bef StockMem2 not exist: ${col2.PO_QTY2} - ${tObj9.BEF_PO_QTY} `,
                        );
                        if (parseFloat(args.data.PU_SEQ) === 1)
                            tObj9.BEF_PO_QTY = '0';
                        else;
                    }
                    // tObj9.PO_UPDATE_QTY = col2.NEW_PO_QTY;
                    tObj9.PO_UPDATE_QTY = col2.PO_QTY2;

                    var tDiffQty =
                        parseFloat(tObj9.PO_UPDATE_QTY) -
                        parseFloat(tObj9.BEF_PO_QTY);
                    tObj9.DIFF_QTY = tDiffQty.toFixed(2);
                    console.log(`Diff Qty: ${tObj9.DIFF_QTY}`);

                    tObj9.MRP_QTY2 = col2.PO_QTY;
                    if (i2 === 0 || tSaveMatlCd !== col2.MATL_CD) {
                        if (i2 !== 0) {
                            tArray9.push(tSaveMems);
                            tSaveMems = { ...tObj9 };
                            tSaveMems.DATAS = [];
                            tSaveMems.DATAS.push(tObj9);
                        } else {
                            tSaveMems = { ...tObj9 };
                            tSaveMems.DATAS = [];
                            tSaveMems.DATAS.push(tObj9);
                        }
                    } else {
                        tSaveMems.DATAS.push(tObj9);
                        tSaveMems.PO_CD = `${tSaveMems.PO_CD}/${col2.PO_CD}`;
                        tSaveMems.MRP_QTY += parseFloat(col2.PO_QTY);
                        tSaveMems.MRP_QTY0 += parseFloat(col2.PO_QTY);
                        tSaveMems.MRP_QTY1 += parseFloat(col2.PO_QTY);
                        tSaveMems.STOCK_QTY += parseFloat(col2.STOCK_QTY);
                        tSaveMems.MOQ_QTY += parseFloat(col2.MOQ);
                        tSaveMems.OVER_QTY += parseFloat(col2.LEFTOVER_QTY);
                        tSaveMems.FOC_QTY += parseFloat(col2.FOC_QTY);
                        tSaveMems.LEFTOVER_QTY += parseFloat('0');
                        tSaveMems.PO_QTY += parseFloat(col2.PO_QTY2);

                        var tDiffQty =
                            parseFloat(tSaveMems.DIFF_QTY) +
                            parseFloat(tObj9.DIFF_QTY);
                        console.log(
                            `${tDiffQty} = ${tSaveMems.DIFF_QTY} + ${tObj9.DIFF_QTY}`,
                        );

                        var tBefPoQty =
                            parseFloat(tSaveMems.BEF_PO_QTY) +
                            parseFloat(tObj9.BEF_PO_QTY);
                        console.log(
                            `${tBefPoQty} = ${tSaveMems.BEF_PO_QTY} + ${tObj9.BEF_PO_QTY}`,
                        );

                        tSaveMems.BEF_PO_QTY = parseFloat(tBefPoQty);
                        tSaveMems.DIFF_QTY = parseFloat(tDiffQty);

                        tSaveMems.PO_UPDATE_QTY += parseFloat(col2.NEW_PO_QTY);
                        tSaveMems.MRP_QTY2 += parseFloat(col2.PO_QTY);
                    }
                    tSaveMatlCd = tObj9.MATL_CD;
                });
                tArray9.push(tSaveMems);

                var tArray10 = [];
                tArray9.forEach((col10, i10) => {
                    if (
                        parseFloat(col10.PO_SEQ) === 1 &&
                        parseFloat(col10.PO_QTY) <= 0 &&
                        parseFloat(col10.MRP_QTY) <= 0
                    );
                    else {
                        var tObj10 = { ...col10 };
                        tArray10.push(tObj10);
                    }
                });
                tRetObj.STOCK_MEM = [...tArray10];
            }

            // PU_MST Query
            tRetObj.PU_MST = [];
            tRetObj.PU_MST_NEW = [];

            var tOne1 = {};

            var tInput = { ...args.data };
            var argData = { ...args.data };

            var sqlPoCds = '';
            var poArray = [];
            if (!argData.IN_PO_CD) {
                var tPoCds = argData.PO_CD.split('/');
                tPoCds.forEach((col, i) => {
                    if (col !== '') poArray.push(col);
                });
            } else {
                var tPoCds = argData.IN_PO_CD.split('/');
                tPoCds.forEach((col, i) => {
                    if (col !== '') poArray.push(col);
                });
            }

            var poSeqArray = [];
            if (!argData.IN_PO_SEQ) {
            } else {
                var tPoCds = argData.IN_PO_SEQ.split('/');
                tPoCds.forEach((col, i) => {
                    if (col !== '') poSeqArray.push(col);
                });
            }

            var sqlPo0 = ' AND  (A1.PO_SEQ < 97 OR A1.PO_SEQ > 100) ';
            var sqlPo = '';
            poArray.forEach((col, i) => {
                if (i === 0) sqlPoCds = `'${col}'`;
                else sqlPoCds += `,'${col}'`;
                if (poArray.length === poSeqArray.length) {
                    if (i === 0)
                        sqlPo = `( A1.PO_CD = '${col}' and A1.PO_SEQ  <= ${poSeqArray[i]}) `;
                    else
                        sqlPo += ` or ( A1.PO_CD = '${col}' and A1.PO_SEQ  <= ${poSeqArray[i]}) `;
                } else {
                    if (i === 0) sqlPo = `( A1.PO_CD = '${col}')  `;
                    else sqlPo += ` or ( A1.PO_CD = '${col}') `;
                }
            });

            // tInput.PO_CD = po_cd/po_cd2/....
            var puSql = '';
            if (args.data.PU_CD)  puSql = `and a.pu_cd = '${args.data.PU_CD}' `;
            var sqlPuMst2 = `
                select
                    a.*,
                    isnull(b.cd_name, '') as PAY_TYPE_N,
                    b1.pay_type as pay_type2
                from
                    ksv_pu_mst2 a
                    left join kcd_code b on b.cd_group = 'pay_type'
                    and b.cd_code = a.pay_condition,
                    kcd_vendor b1
                where
                    a.po_cd2 = '${tInput.PO_CD}'
                    and a.vendor_cd = '${tInput.VENDOR_CD}'
                    and a.vendor_cd = b1.vendor_cd
                    ${puSql}
            `;
            var pumst2Obj = await prisma.$queryRaw(Prisma.raw(sqlPuMst2));
            if (pumst2Obj.length > 0) {
                var wObj = { ...pumst2Obj[0] };
                tOne1.PU_CD = wObj.PU_CD;
                tOne1.PAY_TYPE = wObj.PAY_TYPE_N;
                if (wObj.pay_type2 && wObj.pay_type2.length > 5) {
                    var sqlPayType1 = `
                        select
                            *
                        from
                            kcd_code
                        where
                            cd_group = 'pay_type'
                            and cd_name like '%${wObj.pay_type2}%'
                    `;
                    var retPayType1 = await prisma.$queryRaw(
                        Prisma.raw(sqlPayType1),
                    );
                    if (retPayType1.length > 0) {
                        wObj.PAY_TYPE_N = wObj.pay_type2;
                        wObj.PAY_TYPE = wObj.pay_type2;
                    } else {
                        wObj.PAY_TYPE_N = wObj.pay_type2;
                        wObj.PAY_TYPE = wObj.pay_type2;
                    }
                }
                if (!args.data.PU_CD) {
                    wObj.PU_CD = '';
                    wObj.PU_CD2 = '';
                }
                tRetObj.PU_MST.push(wObj);
            } else {
                tOne1.PU_CD = '';
            }

            var sqlVendor = `
                select
                    a.vendor_name,
                    a.vendor_matl_type,
                    a.vendor_type,
                    b.cd_name as vendor_type_n,
                    a.pay_term,
                    isnull(a.pay_type, '') as pay_type,
                    a.overshort_rate,
                    a.vendor_cd,
                    isnull(a.pay_type2, '') as pay_type2
                from
                    kcd_vendor a,
                    kcd_code b
                where
                    a.vendor_cd = '${tInput.VENDOR_CD}'
                    and b.cd_code = a.vendor_type
                    and b.cd_group = 'VENDOR_TYPE'
            `;
            var vendorObj = await prisma.$queryRaw(Prisma.raw(sqlVendor));
            tOne1.VENDOR_CD = vendorObj[0].vendor_cd;
            tOne1.VENDOR_NAME = vendorObj[0].vendor_name;
            tOne1.VENDOR_MATL_TYPE = vendorObj[0].vendor_matl_type;
            tOne1.VENDOR_TYPE = vendorObj[0].vendor_type;
            tOne1.VENDOR_TYPE_N = vendorObj[0].vendor_type_n;
            tOne1.PAY_TERM = vendorObj[0].pay_term;

            var tPuTypeCheck = 0;
            if (tOne1.PU_CD !== '') {
                var sqlPayType = `
                    select
                        *
                    from
                        kcd_code
                    where
                        cd_group = 'pay_type'
                        and cd_code = '${tOne1.PAY_CONDITION}'
                `;
                var retPayType = await prisma.$queryRaw(Prisma.raw(sqlPayType));
                if (retPayType.length > 0) {
                    tOne1.PAY_TYPE = retPayType[0].CD_NAME;
                    tOne1.PAY_TYPE_N = retPayType[0].CD_NAME;
                    tPuTypeCheck = 1;
                }
            }

            if (tPuTypeCheck === 0) {
                var sqlPayType = `
                    select
                        *
                    from
                        kcd_code
                    where
                        cd_group = 'pay_type'
                        and cd_code = '${vendorObj[0].pay_type2}'
                `;
                var retPayType = await prisma.$queryRaw(Prisma.raw(sqlPayType));
                if (retPayType.length <= 0) {
                    if (vendorObj[0].pay_type !== '') {
                        var sqlPayType1 = `
                            select
                                *
                            from
                                kcd_code
                            where
                                cd_group = 'pay_type'
                                and (
                                    cd_name like '%${vendorObj[0].pay_type}%'
                                    or cd_code like '%${vendorObj[0].pay_type}%'
                                )
                        `;
                        var retPayType1 = await prisma.$queryRaw(
                            Prisma.raw(sqlPayType1),
                        );
                        if (retPayType1.length > 0) {
                            tOne1.PAY_TYPE = vendorObj[0].pay_type;
                            tOne1.PAY_TYPE_N = vendorObj[0].pay_type;
                            tOne1.PAY_CONDITION = retPayType1[0].cd_code;
                        } else {
                            tOne1.PAY_TYPE = vendorObj[0].pay_type;
                            tOne1.PAY_TYPE_N = vendorObj[0].pay_type;
                            tOne1.PAY_CONDITION = '';
                        }
                    } else {
                        tOne1.PAY_TYPE = '';
                        tOne1.PAY_TYPE_N = '';
                        tOne1.PAY_CONDITION = '';
                    }
                } else {
                    tOne1.PAY_TYPE = retPayType[0].CD_NAME;
                    tOne1.PAY_TYPE_N = retPayType[0].CD_NAME;
                    tOne1.PAY_CONDITION = vendorObj[0].pay_type2;
                }
            }

            if (vendorObj[0].pay_type && vendorObj[0].pay_type.length > 5) {
                var sqlPayType1 = `
                    select
                        *
                    from
                        kcd_code
                    where
                        cd_group = 'pay_type'
                        and cd_name like '%${vendorObj[0].pay_type}%'
                `;
                var retPayType1 = await prisma.$queryRaw(
                    Prisma.raw(sqlPayType1),
                );
                if (retPayType1.length > 0) {
                    tOne1.PAY_TYPE_N = vendorObj[0].pay_type;
                    tOne1.PAY_TYPE = vendorObj[0].pay_type;
                } else {
                    tOne1.PAY_TYPE_N = vendorObj[0].pay_type;
                    tOne1.PAY_TYPE = vendorObj[0].pay_type;
                }
            }

            tOne1.OVERSHORT_RATE = vendorObj[0].overshort_rate;

            if (!tInput.PU_CD2) {
                tOne1.OLD_PO_QTY = 0;
                tOne1.P_PU_CD = '';
                tOne1.P_CURR_CD = '';
                tOne1.P_PI_NO = '';
                tOne1.P_ORDER_DATE = '';
                tOne1.P_DUE_DATE = '';
                tOne1.P_EX_FACTORY = '';
                tOne1.P_NORMI = '';
                tOne1.P_BILL_TO = '';
                tOne1.P_PAY_DATE = '';
                tOne1.P_PLACE_CD = '';
                tOne1.P_SHIP_TO = '';
                tOne1.ORIGIN_PORT = '';
                tOne1.TRADE_TERM = '';
                tOne1.OLD_PO_QTY = 0;
            } else {
                var tSql4 = `
                    select
                        pu_cd,
                        curr_cd,
                        pi_no,
                        order_date,
                        due_date,
                        ex_factory,
                        normi,
                        bill_to,
                        pay_date,
                        place_cd,
                        ship_to,
                        origin_port,
                        trade_term
                    from
                        ksv_pu_mst2
                    where
                        pu_cd = '${tInput.PU_CD2}'
                `;
                var tRet4 = await prisma.$queryRaw(Prisma.raw(tSql4));
                tOne1.P_PU_CD = tRet4[0].pu_cd;
                tOne1.P_CURR_CD = tRet4[0].curr_cd;
                tOne1.P_PI_NO = tRet4[0].pi_no;
                tOne1.P_ORDER_DATE = tRet4[0].order_date;
                tOne1.P_DUE_DATE = tRet4[0].due_date;
                tOne1.P_EX_FACTORY = tRet4[0].ex_factory;
                tOne1.P_NORMI = tRet4[0].normi;
                tOne1.P_BILL_TO = tRet4[0].bill_to;
                tOne1.P_PAY_DATE = tRet4[0].pay_date;
                tOne1.P_PLACE_CD = tRet4[0].place_cd;
                tOne1.P_SHIP_TO = tRet4[0].ship_to;
                tOne1.ORIGIN_PORT = tRet4[0].origin_port;
                tOne1.TRADE_TERM = tRet4[0].trade_term;

                var tSql6 = `
                    select
                        po_qty
                    from
                        ksv_pu_mem2
                    where
                        pu_cd = '${tInput.PU_CD2}'
                        and vendor_cd = '${tInput.VENDOR_CD}'
                        and po_cd = '${tInput.PO_CD}'
                        and pu_seq = (
                            select
                                max(pu_seq)
                            from
                                ksv_pu_mem2
                            where
                                pu_cd = '${tInput.PU_CD2}'
                                and po_cd = '${tInput.PO_CD}'
                        )
                `;
                var tRet6 = await prisma.$queryRaw(Prisma.raw(tSql6));
                tOne1.OLD_PO_QTY = 0;
                if (tRet6.length > 0) tOne1.OLD_PO_QTY = tRet6[0].po_qty;
            }

            var tSql3 = `
                select
                    d.buyer_cd,
                    d.buyer_name,
                    left(a.reg_datetime, 8) as mrp_date,
                    a.plan_flag,
                    a.plan_etd,
                    a.plan_eta,
                    a.factory_cd,
                    e.factory_name,
                    max(c.due_date) as prod_due_date,
                    min(isnull(c.matl_due_date, '')) as matl_due_date
                from
                    ksv_po_mst a,
                    ksv_po_mem b,
                    ksv_order_mst c,
                    kcd_buyer d,
                    kcd_factory e
                where
                    a.po_cd in (${sqlPoCds})
                    and a.po_seq = 1
                    and a.po_cd = b.po_cd
                    and b.po_seq = 1
                    and b.order_cd = c.order_cd
                    and left(c.order_cd, 2) = d.buyer_cd
                    and a.factory_cd = e.factory_cd
                group by
                    d.buyer_cd,
                    d.buyer_name,
                    left(a.reg_datetime, 8),
                    a.plan_flag,
                    a.plan_etd,
                    a.plan_eta,
                    a.factory_cd,
                    e.factory_name
            `;
            var tRet3 = await prisma.$queryRaw(Prisma.raw(tSql3));
            if (tRet3.length > 0) {
                tOne1.BUYER_CD = tRet3[0].buyer_cd;
                tOne1.BUYER_NAME = tRet3[0].buyer_name;
                tOne1.MRP_DATE = tRet3[0].mrp_date;
                tOne1.PLAN_FLAG = tRet3[0].plan_flag;
                tOne1.PLAN_ETD = tRet3[0].plan_etd;
                tOne1.FACTORY_CD = tRet3[0].factory_cd;
                tOne1.FACTORY_NAME = tRet3[0].factory_name;
                tOne1.PROD_DUE_DATE = tRet3[0].prod_due_date;
                tOne1.MATL_DUE_DATE = tRet3[0].matl_due_date;
            }

            var tSql2 = `
                select
                    a.po_cd,
                    b.vendor_cd,
                    a.use_po_type,
                    sum(use_qty) as s_use_qty,
                    sum(po_qty) as s_po_qty
                from
                    ksv_po_mrp a,
                    kcd_matl_mst b
                where
                    a.po_cd in (${sqlPoCds})
                    and a.matl_cd = b.matl_cd
                    and b.vendor_cd = '${tInput.VENDOR_CD}'
                    -- and   a.use_po_type = '2'
                group by
                    a.po_cd,
                    b.vendor_cd,
                    a.use_po_type
            `;
            var tRet2 = await prisma.$queryRaw(Prisma.raw(tSql2));
            tRet2.forEach((col, i) => {
                if (col.use_po_type === '1') {
                    tOne1.MRP_QTY = String(col.s_use_qty);
                    tOne1.PO_QTY = String(col.s_po_qty);
                }
                if (col.use_po_type === '2') {
                    tOne1.STOCK_QTY = String(col.s_use_qty);
                }
            });

            var tPoCd = poArray[0];
            var tSql3 = `
                select distinct
                    b.order_cd,
                    b.factory_cd
                from
                    ksv_po_mem a,
                    ksv_order_mst b
                where
                    a.po_cd = '${tPoCd}'
                    and a.po_seq = 1
                    and a.order_cd = b.order_cd
            `;
            var tRet3 = await prisma.$queryRaw(Prisma.raw(tSql3));

            var tMatlDueDate = '';
            var tTableName = '';
            if (tRet3.length > 0) {
                if (tRet3[0].factory_cd === 'FC034')
                    tTableName = 'KSV_CAPABOOK_MEM';
                if (tRet3[0].factory_cd === 'FC044')
                    tTableName = 'KSV_CAPABOOK_MEM_ETHIOPIA';
            }
            if (tTableName === '');
            else {
                var tOrderCd = tRet3[0].order_cd;
                var tSql4 = `
                    SELECT
                        isnull(BOOK_DATE, '') as BOOK_DATE,
                        isnull(ORDER_CD, '') as ORDER_CD,
                        isnull(M_ETA, '') as M_ETA,
                        isnull(JOB_CD, '') as JOB_CD
                    FROM
                        ${tTableName}
                    WHERE
                        order_cd = '${tOrderCd}'
                        and book_date = (
                            select
                                max(book_date) as book_date
                            from
                                ${tTableName}
                            where
                                order_cd = '${tOrderCd}'
                        )
                `;
                var tRet4 = await prisma.$queryRaw(Prisma.raw(tSql4));
                if (tRet4.length > 0) tMatlDueDate = tRet4[0].M_ETA;
            }
            tOne1.MATL_DUE_DATE = tMatlDueDate;

            if (!args.data.PU_CD) {
                tOne1.PU_CD = ''; 
            }
            tRetObj.PU_MST_NEW.push(tOne1);
            return tRetObj;

        },

        mgrQueryS040102_4_2: async (_, args) => {
            var tSQL = '';

            let sqlStr = `
                select
                    '' as PU_CD,
                    K.*,
                    isnull(K1.MOQ, 0) as MOQ_QTY,
                    isnull(K1.PO_QTY2, 0) as PO_QTY,
                    isnull(K1.MOQ_AMT, 0) as MOQ_AMT,
                    isnull(K1.MOQ_PRICE, 0) as MOQ_PRICE,
                    isnull(K1.FREIGHT_AMT, 0) as FREIGHT_AMT,
                    isnull(K1.FREIGHT_PRICE, 0) as FREIGHT_PRICE,
                    isnull(K1.OTHER_AMT, 0) as OTHER_AMT,
                    isnull(K1.OTHER_PRICE, 0) as OTHER_PRICE,
                    isnull(k1.SURCHARGE_REMARK, '') as SURCHARGE_REMARK,
                    isnull(K1.PO_PRICE, 0) as PO_PRICE
                from
                    (
                        SELECT
                            A1.PO_CD,
                            -- A1.ORDER_CD,
                            A3.VENDOR_CD,
                            A1.MATL_CD,
                            -- A1.MRP_SEQ,
                            -- A1.MATL_SEQ,
                            A3.MATL_NAME,
                            A3.COLOR,
                            A3.SPEC,
                            A3.UNIT,
                            A4.CURR_CD,
                            A4.MATL_PRICE AS MASTER_PRICE,
                            sum(A1.PO_QTY) AS MRP_QTY0,
                            sum(A2.PO_QTY) AS MRP_QTY1,
                            sum(A1.STOCK_QTY) AS STOCK_QTY,
                            max(A1.PO_SEQ) AS PO_SEQ
                        FROM
                            KSV_STOCK_MEM A1,
                            KSV_PO_MRP A2,
                            KCD_MATL_MST A3,
                            KCD_MATL_MEM A4,
                            KSV_ORDER_MST A5,
                            KSV_PO_MST A6
                        WHERE
                            A1.PU_CD = '${args.data.PU_CD}'
                            AND A1.PO_CD = A6.PO_CD
                            AND A1.PO_SEQ = A6.PO_SEQ
                            AND A6.PO_STATUS = '4'
                            AND A1.ORDER_CD = A5.ORDER_CD
                            AND A5.ORDER_STATUS in ('3', '5', '6')
                            AND A1.PO_SEQ < 97
                            -- AND   A1.PO_QTY > 0
                            AND A1.MATL_CD = A3.MATL_CD
                            AND A1.MATL_CD = A4.MATL_CD
                            AND A1.MATL_SEQ = A4.MATL_SEQ
                            -- AND   A1.STOCK_STATUS = '0' 
                            AND A1.PO_CD = A2.PO_CD
                            AND A1.PO_SEQ = A2.PO_SEQ
                            AND A1.ORDER_CD = A2.ORDER_CD
                            AND A1.MATL_CD = A2.MATL_CD
                            AND A1.MRP_SEQ = A2.MRP_SEQ
                            AND A1.MATL_SEQ = A2.MATL_SEQ
                        group by
                            A1.PO_CD,
                            -- A1.ORDER_CD, 
                            A3.VENDOR_CD,
                            A1.MATL_CD,
                            -- A1.MRP_SEQ, A1.MATL_SEQ, 
                            A3.MATL_NAME,
                            A3.COLOR,
                            A3.SPEC,
                            A3.UNIT,
                            A4.CURR_CD,
                            A4.MATL_PRICE
                    ) K
                    left join ksv_stock_mem2 K1 on K1.PO_CD = K.PO_CD
                    and K1.vendor_cd = K.VENDOR_CD
                    and K1.matl_cd = K.MATL_CD
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            var tArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tOne = {
                    ...tRet[tIdx],
                };
                var sql0 = `
                    select
                        isnull(sum(use_qty), 0) as stock_qty
                    from
                        ksv_stock_use
                    where
                        use_po_cd = '${tOne.PO_CD}'
                        and use_matl_cd = '${tOne.MATL_CD}'
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                tOne.STOCK_QTY = String(tRet0[0].stock_qty);

                var tValue =
                    parseFloat(tOne.MRP_QTY0) + parseFloat(tOne.STOCK_QTY);
                tOne.MRP_QTY = String(tValue);

                tArray.push(tOne);
            }

            var tWObj = {};
            tWObj.STOCK_MEM = tArray;

            let sqlStr = `
                select
                    *
                from
                    ksv_pu_mst2
                where
                    pu_cd = '${args.data.PU_CD}'
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            var tRetArray = [];
            var tIdx0 = 0;
            for (tIdx0 = 0; tIdx0 < tRet.length; tIdx0++) {
                var tInData1 = {
                    ...tRet[tIdx0],
                };
                Object.keys(tInData1).forEach((col, i) => {
                    if (tInData1[`${col}`] === null) {
                        if (typeof tInData1[`${col}`] === 'string')
                            tInData1[`${col}`] = '';
                        else tInData1[`${col}`] = 0;
                    }
                });
                tRetArray.push(tInData1);
            }
            tWObj.PU_MST = tRetArray;

            return tWObj;
        },

        mgrQueryS040102_4_LOG: async (_, args) => {
            var tSQL = '';

            let sqlStr = `
                select
                    A.PO_CD,
                    A.PO_SEQ,
                    A.MATL_CD,
                    B.MATL_NAME,
                    B.COLOR,
                    B.SPEC,
                    B.UNIT,
                    A.PO_QTY as MRP_QTY,
                    isnull(A.STOCK_QTY, 0) as STOCK_QTY,
                    A.MOQ as MOQ_QTY,
                    A.PO_QTY2 as PO_QTY,
                    A.DIFF_QTY as DIFF_QTY,
                    A.CURR_CD,
                    C.MATL_PRICE as MASTER_PRICE,
                    isnull(A.OTHER_PRICE, 0) as SURCHARGE_PRICE,
                    isnull(A.OTHER_AMT, 0) as SURCHARGE_AMT,
                    A.PO_PRICE,
                    A.SURCHARGE_REMARK,
                    isnull(A.STSIN_CD, '') as STSIN_CD,
                    '' as PU_STATUS
                from
                    ksv_stock_mem2_log A,
                    kcd_matl_mst B,
                    kcd_matl_mem C
                where
                    A.MATL_CD = B.MATL_CD
                    and B.MATL_CD = C.MATL_CD
                    and C.matl_seq = 1
                    and A.PU_CD = '${args.data.PU_CD}'
                    and A.PU_SEQ = '${args.data.PU_SEQ}'
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {};

            var tArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tOne = {
                    ...tRet[tIdx],
                };
                // tOne.DIFF_QTY = '0';
                tOne.MRP_QTY = AFLib.getFloat(parseFloat(tOne.MRP_QTY), 2);
                tOne.STOCK_QTY = AFLib.getFloat(parseFloat(tOne.STOCK_QTY), 2);
                tOne.MOQ_QTY = AFLib.getFloat(parseFloat(tOne.MOQ_QTY), 2);
                tOne.PO_QTY = AFLib.getFloat(parseFloat(tOne.PO_QTY), 2);
                tOne.MASTER_PRICE = AFLib.getFloat(
                    parseFloat(tOne.MASTER_PRICE),
                    4,
                );
                tOne.SURCHARGE_PRICE = AFLib.getFloat(
                    parseFloat(tOne.SURCHARGE_PRICE),
                    4,
                );
                tOne.SURCHARGE_AMT = AFLib.getFloat(
                    parseFloat(tOne.SURCHARGE_AMT),
                    2,
                );
                tOne.PO_PRICE = AFLib.getFloat(parseFloat(tOne.PO_PRICE), 4);

                // 재고계산
                let sqlStr1 = `
                    select
                        isnull(sum(isnull(use_qty, 0)), 0) as stock_qty
                    from
                        ksv_po_mrp
                    where
                        po_cd = '${tOne.PO_CD}'
                        and po_matl_cd = '${tOne.MATL_CD}'
                        and use_po_type = '2'
                        and po_seq = ${tOne.PO_SEQ}
                `;
                var tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));
                var tCurrStockQty = 0;
                if (tRet1.length > 0)
                    tCurrStockQty = parseFloat(tRet1[0].stock_qty);

                sqlStr1 = `
                    select
                        isnull(sum(isnull(use_qty, 0)), 0) as stock_qty
                    from
                        ksv_po_mrp
                    where
                        po_cd = '${tOne.PO_CD}'
                        and po_matl_cd = '${tOne.MATL_CD}'
                        and use_po_type = '2'
                        and po_seq < ${tOne.PO_SEQ}
                `;
                var tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));
                var tOldStockQty = 0;
                if (tRet1.length > 0)
                    tOldStockQty = parseFloat(tRet1[0].stock_qty);

                //  MRP 계산
                let sqlStr1 = `
                    select
                        isnull(sum(isnull(use_qty, 0)), 0) as mrp_qty
                    from
                        ksv_po_mrp
                    where
                        po_cd = '${tOne.PO_CD}'
                        and matl_cd = '${tOne.MATL_CD}'
                        and use_po_type = '1'
                        and diff_po_type in ('0', '1', '3', '2', '4')
                        and po_seq = ${tOne.PO_SEQ}
                `;
                var tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));
                var tCurrMrpQty = 0;
                if (tRet1.length > 0)
                    tCurrMrpQty = parseFloat(tRet1[0].mrp_qty);

                let sqlStr1 = `
                    select
                        isnull(sum(isnull(use_qty, 0)), 0) as mrp_qty
                    from
                        ksv_po_mrp
                    where
                        po_cd = '${tOne.PO_CD}'
                        and matl_cd = '${tOne.MATL_CD}'
                        and use_po_type = '1'
                        and diff_po_type in ('0', '1', '3', '2', '4')
                        and po_seq < ${tOne.PO_SEQ}
                `;
                var tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));
                var tOldMrpQty = 0;
                if (tRet1.length > 0) tOldMrpQty = parseFloat(tRet1[0].mrp_qty);

                //  PO 계산
                let sqlStr1 = `
                    select
                        isnull(sum(isnull(po_qty, 0)), 0) as po_qty
                    from
                        ksv_po_mrp
                    where
                        po_cd = '${tOne.PO_CD}'
                        and matl_cd = '${tOne.MATL_CD}'
                        and use_po_type = '1'
                        and diff_po_type in ('0', '1', '3', '2', '4')
                        and po_seq = ${tOne.PO_SEQ}
                `;
                var tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));
                var tCurrPoQty = 0;
                if (tRet1.length > 0) tCurrMrpQty = parseFloat(tRet1[0].po_qty);

                let sqlStr1 = `
                    select
                        isnull(sum(isnull(po_qty, 0)), 0) as po_qty
                    from
                        ksv_po_mrp
                    where
                        po_cd = '${tOne.PO_CD}'
                        and matl_cd = '${tOne.MATL_CD}'
                        and use_po_type = '1'
                        and diff_po_type in ('0', '1', '3', '2', '4')
                        and po_seq < ${tOne.PO_SEQ}
                `;
                var tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));
                var tOldPoQty = 0;
                if (tRet1.length > 0) tOldPoQty = parseFloat(tRet1[0].po_qty);

                //
                console.log(`MRP:${tCurrMrpQty}/${tOldMrpQty}`);
                var tTotMrpQty = tCurrMrpQty + tOldMrpQty;
                tOne.MRP_QTY = AFLib.getFloat(parseFloat(tTotMrpQty), 2);

                console.log(`Stock;${tCurrStockQty}/${tOldStockQty}`);
                var tTotStockQty = tCurrStockQty + tOldStockQty;
                tOne.STOCK_QTY = AFLib.getFloat(parseFloat(tTotStockQty), 2);

                console.log(`PO:${tCurrPoQty}/${tOldPoQty}`);
                var tTotPoQty = tCurrPoQty + tOldPoQty;
                tOne.PO_QTY = AFLib.getFloat(parseFloat(tTotPoQty), 2);

                var tDiffQty = tTotMrpQty - tTotPoQty;
                tOne.DIFF_QTY = AFLib.getFloat(parseFloat(tDiffQty), 2);

                let sqlStr9 = `
                    select
                        sum(po_qty) as sum_po_qty,
                        sum(in_qty) as sum_in_qty,
                        sum(out_qty) as sum_out_qty,
                        sum(infac_qty) as sum_infac_qty
                    from
                        ksv_stock_mem
                    where
                        pu_cd = '${args.data.PU_CD}'
                        and po_cd = '${tOne.PO_CD}'
                        and matl_cd = '${tOne.MATL_CD}'
                `;
                var tRet9 = await prisma.$queryRaw(Prisma.raw(sqlStr9));

                if (tRet9.length > 0) {
                    console.log(
                        `${tOne.PO_CD}/${tOne.MATL_CD}/${tOne.PO_QTY}/${tRet9[0].sum_po_qty}/${tRet9[0].sum_in_qty}/${tRet9[0].sum_out_qty}`,
                    );
                }

                tOne.PU_STATUS = '-';
                if (tOne.STSIN_CD !== '') tOne.PU_STATUS = 'End';

                tArray.push(tOne);
            }

            var tWObj = {};
            tWObj.STOCK_MEM = tArray;

            tWObj.PU_MST = [];
            tWObj.PO_SEQ = [];

            return tWObj;
        },
    },
};

// ExcelJS 병합 분할 + E열 강제 삭제 (4-space indent)
// - E열과 겹치는 병합을 좌/우로 쪼개 재병합하여 최대한 보존
// - 마지막에 E열을 삭제(우측 셀/병합은 자동으로 한 칸씩 당겨짐)

function forceDeleteColumnE_keepingMerges(worksheet) {
    const COL_E = 5;

    const mergeList = getMergeList(worksheet); // ['A1:C1', 'D3:F6', ...] 스냅샷

    for (const range of mergeList) {
        const { tl, br } = parseA1Range(range); // tl:{c,r}, br:{c,r}
        const overlapsE = tl.c <= COL_E && br.c >= COL_E;
        if (!overlapsE) continue;

        // 1) 원 병합 해제
        safeUnmerge(worksheet, range);

        // 2) 좌측 조각: tl.c ~ (E-1)
        const left_c1 = tl.c;
        const left_c2 = COL_E - 1;
        if (left_c1 <= left_c2) {
            const leftRange = `${numToCol(left_c1)}${tl.r}:${numToCol(left_c2)}${br.r}`;
            safeMerge(worksheet, leftRange);
        }

        // 3) 우측 조각: (E+1) ~ br.c
        const right_c1 = COL_E + 1;
        const right_c2 = br.c;
        if (right_c1 <= right_c2) {
            const rightRange = `${numToCol(right_c1)}${tl.r}:${numToCol(right_c2)}${br.r}`;
            safeMerge(worksheet, rightRange);
        }
    }

    // 4) E열 삭제 (우측 병합/셀은 자동으로 한 칸씩 좌로 이동)
    worksheet.spliceColumns(COL_E, 1);
}

/* ================= 유틸들 ================= */

// 워크시트의 병합 목록 스냅샷 (버전 호환)
function getMergeList(ws) {
    const set = new Set();
    if (Array.isArray(ws.model?.merges)) {
        ws.model.merges.forEach((m) => set.add(m));
    }
    // 일부 버전은 내부 맵을 가짐(비공식이지만 실무에서 자주 사용)
    if (ws._merges && typeof ws._merges.keys === 'function') {
        for (const k of ws._merges.keys()) set.add(k);
    }
    return [...set];
}

function safeUnmerge(ws, a1) {
    try {
        ws.unMergeCells(a1);
    } catch (_) {}
}

function safeMerge(ws, a1) {
    try {
        // 단일셀 형태('C5')로 들어올 일은 드물지만 방어적으로 범위화
        const { tl, br } = parseA1Range(a1);
        const range =
            tl.c === br.c && tl.r === br.r
                ? `${numToCol(tl.c)}${tl.r}:${numToCol(br.c)}${br.r}`
                : a1;
        ws.mergeCells(range);
    } catch (_) {}
}

// 'A'->1, 'Z'->26, 'AA'->27 ...
function colToNum(letters) {
    let n = 0;
    for (let i = 0; i < letters.length; i++) {
        n = n * 26 + (letters.charCodeAt(i) - 64); // 'A' = 65
    }
    return n;
}

function numToCol(n) {
    let s = '';
    while (n > 0) {
        const rem = (n - 1) % 26;
        s = String.fromCharCode(65 + rem) + s;
        n = Math.floor((n - 1) / 26);
    }
    return s;
}

function parseA1Cell(a1) {
    const m = /^([A-Z]+)(\d+)$/.exec(a1.toUpperCase());
    if (!m) throw new Error(`잘못된 A1 주소: ${a1}`);
    return {
        c: colToNum(m[1]),
        r: parseInt(m[2], 10),
    };
}

function parseA1Range(a1) {
    const parts = a1.split(':');
    const tl = parseA1Cell(parts[0]);
    const br = parts[1]
        ? parseA1Cell(parts[1])
        : {
              ...tl,
          };
    const c1 = Math.min(tl.c, br.c),
        c2 = Math.max(tl.c, br.c);
    const r1 = Math.min(tl.r, br.r),
        r2 = Math.max(tl.r, br.r);
    return {
        tl: {
            c: c1,
            r: r1,
        },
        br: {
            c: c2,
            r: r2,
        },
    };
}

export default moduleQuery_S040102_4_1;
