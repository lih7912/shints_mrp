// MGR_@@TNAME@@.queries.js

import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import axios from 'axios';

const fs = require('fs');
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
const Excel = require('exceljs');
const { generateUploadURL, generateDownloadURL, upload } = require('../../../routes/s3');
const moment = require('moment');

//
class S0214_QRY_COMM {
    async makeReportAll(argData, contextValue, resultData) {
         var tSQL = '';
         var tRetDate = AFLib.getCurrTime();

         var s_date = argData.S_SHIP_DATE;
         var e_date = argData.E_SHIP_DATE;
         if (argData.S_SHIP_DATE === '') {
             s_date = `${tRetDate.substring(0, 6)}01`;
         }
         if (argData.E_SHIP_DATE === '') {
             e_date = `${tRetDate.substring(0, 6)}31`;
         }

         var tOrdStatus = [];
         if (argData.PARTIAL_SHIP_FLAG === '1') tOrdStatus.push('5');
         if (argData.END_REPORT_FLAG === '1') tOrdStatus.push('8');
         if (argData.END_FLAG === '1') tOrdStatus.push('9');

         var tOrdStatusSql = '';
         tOrdStatus.forEach((col, i) => {
             if (i === 0) tOrdStatusSql = `('${col}' `;
             else tOrdStatusSql += `,'${col}'`;
         });
         if (tOrdStatusSql !== '') {
             tOrdStatusSql += ')';
             tOrdStatusSql = `and a.order_status in ${tOrdStatusSql} `;
         } else {
             tOrdStatusSql = `and a.order_status in ('5', '8', '9') `;
         }

         var tSQL_shipdate = '';
         var tSQL_shipdate1 = '';
         var tSQL_duedate = '';
         const tSQL_orderCd = argData.ORDER_CD
             ? `and a.order_cd like '%${argData.ORDER_CD}%'`
             : '';
         const tSQL_buyerCd = argData.BUYER_CD
             ? `and left(a.order_cd, 2) like '%${argData.BUYER_CD}%'`
             : '';
         if (argData.SHIPDATE_FLAG === '1') {
             tSQL_shipdate = `
                    left join ksv_order_ship b on b.order_cd = a.order_cd 
                    and ship_date between '${s_date}' and '${e_date}'
                    and b.ship_ptype in ('0','5')
             `;
             tSQL_shipdate1 = `
                 and a.order_cd in (
                     select
                         order_cd
                     from
                         ksv_order_ship
                     where
                         ship_date between '${s_date}' and '${e_date}'
                         and ship_ptype in ('0', '5')
                 )
             `;
             tSQL_duedate = `
                    and a.due_date between '${s_date}' and '${e_date}'
             `;
         } else {
             tSQL_shipdate = `
                    left join ksv_order_ship b on b.order_cd = a.order_cd 
                    and b.ship_ptype in ('0','5')
             `;
             tSQL_shipdate1 = `
                    and a.due_date between '${s_date}' and '${e_date}'
             `;
         }

         if (
             argData.ORDER_CD !== '' &&
             argData.ORDER_CD.length >= 6
         ) {
             if (argData.SHIPDATE_FLAG === '1') {
                 tSQL_shipdate = `
                    left join ksv_order_ship b on b.order_cd = a.order_cd 
                    and b.ship_ptype in ('0','5')
                 `;
             }
             tSQL_shipdate1 = '';
         }

         let sqlStr_Main = `
              select kk.*, 
                     kk1.order_status,
                     kk1.usd_price,
                     kk1.fc_bef,
                     kk1.etc_amt,
                     isnull(kk1.commission, 0) as commission,
                     kk1.factory_cd,
                     kk2.cd_name as status,
                     kk3.style_name as style_name,
                     kk1.remark,
                     kk1.sample_flag,
                     left(kk1.end_datetime, 8) as end_date
              from
              (
                   select
                       a.order_cd, 
                       a.tot_cnt, 
                       a.fc_price, 
                       a.matl_amt,
                       min(b.ship_date) as ship_date_min, 
                       max(b.ship_date) as ship_date_max, 
                       sum(b.ship_cnt) as ship_cnt, 
                       sum(b.ship_amount) as ship_amount
                  from ksv_order_mst a, ksv_order_ship b
                  where  a.order_cd = b.order_cd
                  and    a.sample_flag <> '1'
                  and    a.order_cd like '%${argData.ORDER_CD}%'
                  and    left(a.order_cd, 2) like '%${argData.BUYER_CD}%'
                  and    b.ship_ptype in ('0','5')
                  and    a.order_cd in (
                            select distinct order_cd from ksv_order_ship
                            where  ship_date between '${s_date}' and '${e_date}'
                         )
                  ${tOrdStatusSql}
                  group by 
                       a.order_cd, 
                       a.tot_cnt, 
                       a.fc_price, 
                       a.matl_amt
              ) kk,
              ksv_order_mst kk1 , kcd_code kk2, kcd_style kk3
              where kk.order_cd = kk1.order_cd
              and   kk1.order_status = kk2.cd_code 
              and   kk2.cd_group = 'ORDER_STATUS'
              and   kk1.style_cd = kk3.style_cd
         `;

         let sqlStr_Sample = `
              select kk.*, 
                     kk1.order_status,
                     kk1.usd_price,
                     kk1.fc_bef,
                     kk1.etc_amt,
                     isnull(kk1.commission, 0) as commission,
                     kk1.factory_cd,
                     kk2.cd_name as status,
                     kk3.style_name as style_name,
                     kk1.remark,
                     kk1.sample_flag,
                     left(kk1.end_datetime, 8) as end_date
              from
              (
                   select
                       a.order_cd, 
                       a.tot_cnt, 
                       a.fc_price,
                       a.matl_amt,
                       isnull(min(b.ship_date), '') as ship_date_min, 
                       isnull(max(b.ship_date), '') as ship_date_max, 
                       isnull(sum(b.ship_cnt), 0) as ship_cnt, 
                       isnull(sum(b.ship_amount) , 0) as ship_amount
                  from ksv_order_mst a
                       left join  ksv_order_ship b on a.order_cd = b.order_cd
                  where  a.sample_flag = '1'
                  and    a.order_cd like '%${argData.ORDER_CD}%'
                  and    left(a.order_cd, 2) like '%${argData.BUYER_CD}%'
                  and    a.order_cd in (
                            select order_cd from ksv_order_ship
                            where  ship_date between '${s_date}' and '${e_date}'
                            union
                            select order_cd from ksv_order_mst
                            where  due_date between '${s_date}' and '${e_date}'
                         )
                  ${tOrdStatusSql}
                  group by 
                       a.order_cd, 
                       a.tot_cnt, 
                       a.fc_price,
                       a.matl_amt
              ) kk,
              ksv_order_mst kk1 , kcd_code kk2, kcd_style kk3
              where kk.order_cd = kk1.order_cd
              and   kk1.order_status = kk2.cd_code 
              and   kk2.cd_group = 'ORDER_STATUS'
              and   kk1.style_cd = kk3.style_cd
         `;

         var sqlStr = `select kk2.* from (${sqlStr_Main} union ${sqlStr_Sample}) kk2 order by kk2.order_cd `;
         var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

         const toNum = (value) => {
             const num = parseFloat(String(value ?? 0));
             return Number.isFinite(num) ? num : 0;
         };

         const tRetArray = [];

         for (const src of tRet) {

             /*
                     -- (kk.matl_amt /  kk.ship_cnt) as matl_price, 
                     -- ((kk.matl_amt / kk.ship_cnt)  + kk.fc_price ) as tot_cost, 
                     -- (((kk.matl_amt / kk.ship_cnt)  + kk.fc_price) * kk.ship_cnt) as tot_amt,
                     -- (kk.ship_amount /  kk.ship_cnt) as ship_price 
             */

             const shipCnt =
                 toNum(src.ship_cnt) <= 0 &&
                 parseInt(String(src.order_status), 10) >= 4
                     ? toNum(src.tot_cntj)
                     : toNum(src.ship_cnt);
             const ordAmt = toNum(src.usd_price) * shipCnt;
             const commAmt = toNum(src.commission) * shipCnt;
             const matlPrice = shipCnt
                 ? toNum(src.matl_amt) / shipCnt
                 : 0;
             const etcPrice = shipCnt
                 ? toNum(src.etc_amt) / shipCnt
                 : 0;
             const totPrice =
                 matlPrice +
                 toNum(src.fc_price) +
                 etcPrice +
                 toNum(src.commission);
             const totAmt = totPrice * shipCnt;
             const rate =
                 ordAmt > 0 ? ((ordAmt - totAmt) / ordAmt) * 100 : 0;
             const minShipDate = src.ship_date_min;
             const maxShipDate = src.ship_date_max;

             const afterObj = {
                 ORDER_CD: src.order_cd,
                 STATUS: src.status,
                 STYLE_NAME: src.style_name,
                 TOT_CNT: parseFloat(src.tot_cnt).toFixed(2),
                 SHIP_CNT: parseFloat(shipCnt).toFixed(0),
                 SHIP_DATE: minShipDate,
                 USD_PRICE: parseFloat(src.usd_price).toFixed(2),
                 ORD_AMT: parseFloat(ordAmt).toFixed(2),
                 COMM_AMT: parseFloat(commAmt).toFixed(2),
                 MATL_AMT: parseFloat(src.matl_amt).toFixed(2),
                 MATL_PRICE: parseFloat(matlPrice).toFixed(2),
                 FC_PRICE: parseFloat(src.fc_price).toFixed(2),
                 ETC_AMT: parseFloat(src.etc_amt).toFixed(2),
                 ETC_PRICE: parseFloat(etcPrice).toFixed(2),
                 TOT_AMT: parseFloat(totAmt).toFixed(2),
                 TOT_PRICE: parseFloat(totPrice).toFixed(2),
                 RATE: parseFloat(rate).toFixed(2),
                 KIND: 'After',
                 COMMISSION: parseFloat(src.commission).toFixed(2),
                 FC_BEF: parseFloat(src.fc_bef).toFixed(2),
                 ORDER_STATUS_NAME: src.status,
                 ORDER_STATUS: src.order_status,
                 REMARK: src.remark,
                 FACTORY_CD: src.factory_cd,
                 LINE_CHARGE_PRICE: '',
                 END_DATETIME: src.end_date,
             };
             tRetArray.push(afterObj);

             let sqlStr1 = `
                  select isnull(sum(a.use_qty*c.matl_price*d.usd_rate),0)  as matl_amount_bef,
                         isnull(sum(a.use_qty*c.matl_price*d.usd_rate),0) / ${src.ship_cnt} as  matl_price_bef
                  from ksv_po_mrpnet a,ksv_order_mst b,kcd_matl_mem c,kcd_curr_com d
                  where a.order_cd = '${src.order_cd}'
                  and b.order_cd = '${src.order_cd}'
                  and a.order_cd = b.order_cd
                  and c.matl_cd = a.matl_cd
                  and c.matl_seq = a.matl_seq
                  and d.curr_cd = c.curr_cd
                  and d.start_date = (select max(start_date) from kcd_curr_com where start_date <= b.order_date)
             `;
             var tRet1 = [];
             if (parseFloat(src.ship_cnt) !== 0) tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));
             const befPrice = 0;
             if (tRet1.length > 0) befPrice = tRet1[0].matl_price_bef;

             const beforeObj = {
                 ORDER_CD: src.ORDER_CD,
                 STATUS: '',
                 STYLE_NAME: '',
                 TOT_CNT: '',
                 SHIP_CNT: '',
                 SHIP_DATE: maxShipDate,
                 USD_PRICE: '',
                 ORD_AMT: '',
                 COMM_AMT: '',
                 MATL_AMT: '',
                 FC_PRICE: '',
                 ETC_AMT: '',
                 ETC_PRICE: '',
                 TOT_AMT: '',
                 TOT_PRICE: '',
                 RATE: '',
                 KIND: 'Before',
                 COMMISSION: '',
                 FC_BEF: '',
                 ORDER_STATUS_NAME: '',
                 ORDER_STATUS: '',
                 REMARK: '',
                 FACTORY_CD: '',
                 LINE_CHARGE_PRICE: '',
                 END_DATETIME: '',
                 MATL_PRICE: parseFloat(befPrice).toFixed(2),
             };
             tRetArray.push(beforeObj);
         }

         console.log(`makeReportAll : ${tRetArray.length}`);


         return (tRetArray);
    }
    async makeReport10(argData, contextValue, resultData) {
        // End Report 
        var tRetDate = AFLib.getCurrTime();
        var tRetDate1 = tRetDate.substring(0, 8);
        var tUserInfo = AFLib.getUserInfo(contextValue);

        // var tWExcelFile = `완료보고서2-${tUserInfo.USER_ID}-${tRetDate1}`;
        var tWExcelFile = `OrderStatus(EndReport)-${tUserInfo.USER_ID}-${tRetDate1}`;

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
            // var tTemplateExcel = `${tPath0}/완료보고서2.xlsx`;
            var tTemplateExcel = `${tPath0}/orderstatus_endreport.xlsx`;

            const wb = new Excel.Workbook();
            await wb.xlsx.readFile(tTemplateExcel);

            var tSheetName = `Sheet2`;
            const sheet = wb.getWorksheet(tSheetName);
            // const sheet = wb.getWorksheet(1);

            sheet.getCell(3, 17).value = 'REMARK';
            var nRowIdx = 4;
            var nColMax = 17;

            var tIdx = 0;
            for (tIdx = 0; tIdx < resultData.length; tIdx++) {
                var col = { ...resultData[tIdx] };
                if (col.STATUS) {
                    sheet.getCell(nRowIdx, 1).value = col.ORDER_CD;
                    sheet.getCell(nRowIdx, 2).value = col.STYLE_NAME;
                    sheet.getCell(nRowIdx, 3).value = Number(parseFloat(col.TOT_CNT).toFixed(2));
                    sheet.getCell(nRowIdx, 4).value = Number(parseFloat(col.SHIP_CNT).toFixed(2));
                    sheet.getCell(nRowIdx, 5).value = Number(parseFloat(col.USD_PRICE).toFixed(2));
                    sheet.getCell(nRowIdx, 6).value = Number(parseFloat(col.COMM_AMT).toFixed(2));
                    sheet.getCell(nRowIdx, 7).value = Number(parseFloat(col.ORD_AMT).toFixed(2));
                    sheet.getCell(nRowIdx, 8).value = moment(col.SHIP_DATE).format('YYYY-MM-DD');
                    sheet.getCell(nRowIdx, 9).value = col.KIND;
                    sheet.getCell(nRowIdx, 10).value = Number(parseFloat(col.MATL_PRICE).toFixed(2));
                    sheet.getCell(nRowIdx, 11).value = Number(parseFloat(col.FC_PRICE).toFixed(2));
                    sheet.getCell(nRowIdx, 12).value = Number(parseFloat(col.COMMISSION).toFixed(2));
                    sheet.getCell(nRowIdx, 13).value = Number(parseFloat(col.ETC_PRICE).toFixed(2));
                    sheet.getCell(nRowIdx, 14).value = Number(parseFloat(col.TOT_PRICE).toFixed(2));
                    sheet.getCell(nRowIdx, 15).value = Number(parseFloat(col.RATE).toFixed(2));
                    sheet.getCell(nRowIdx, 16).value = Number(parseFloat(col.TOT_AMT).toFixed(2));
                    sheet.getCell(nRowIdx, 17).value = col.REMARK;
                } else {
                    sheet.getCell(nRowIdx, 1).value = col.ORDER_CD;
                    sheet.getCell(nRowIdx, 2).value = col.STYLE_NAME;
                    sheet.getCell(nRowIdx, 3).value = 0;
                    sheet.getCell(nRowIdx, 4).value = 0;
                    sheet.getCell(nRowIdx, 5).value = 0;
                    sheet.getCell(nRowIdx, 6).value = 0;
                    sheet.getCell(nRowIdx, 7).value = 0;
                    sheet.getCell(nRowIdx, 8).value = moment(col.SHIP_DATE).format('YYYY-MM-DD');
                    sheet.getCell(nRowIdx, 9).value = col.KIND;
                    sheet.getCell(nRowIdx, 10).value = Number(parseFloat(col.MATL_PRICE).toFixed(2));
                    sheet.getCell(nRowIdx, 11).value = 0;
                    sheet.getCell(nRowIdx, 12).value = 0;
                    sheet.getCell(nRowIdx, 13).value = 0;
                    sheet.getCell(nRowIdx, 14).value = 0;
                    sheet.getCell(nRowIdx, 15).value = 0;
                    sheet.getCell(nRowIdx, 16).value = 0;
                    sheet.getCell(nRowIdx, 17).value = col.REMARK;
                }
                nRowIdx += 1;
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
            fs.createWriteStream(tExcelFileName).write(fileData);

            let fileUrl = '';
            const fileNameWithExt = `${tWExcelFile}.xlsx`;

            try {
                const objectName = `excel/${fileNameWithExt}`;
                const response = await generateUploadURL(objectName);
                const presignedUrl = response.uploadURL;

                await axios.put(presignedUrl, fileData, {
                    headers: {
                        'Content-Type':
                            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    },
                });

                fileUrl = await generateDownloadURL(
                    response.imageName,
                    fileNameWithExt,
                );
            } catch (uploadError) {
                console.log('S0214 makeReport10 upload error:', uploadError);
            }

            console.log('Success excel:' + tWExcelFile);

            return {
                NAME: tWExcelFile,
                FILE_NAME: fileNameWithExt,
                FILE_URL: fileUrl,
            };
        } catch (error) {
            console.log('Error  excel:' + error.message);
            return {
                NAME: '',
                FILE_NAME: '',
                FILE_URL: '',
            };
        }
    }
    async makeReport11(argData, contextValue, resultData) {
        // Excel 
        var tRetDate = AFLib.getCurrTime();
        var tRetDate1 = tRetDate.substring(0, 8);
        var tUserInfo = AFLib.getUserInfo(contextValue);

        // var tWExcelFile = `완료보고서2-${tUserInfo.USER_ID}-${tRetDate1}`;
        var tWExcelFile = `OrderStatus(Excel)-${tUserInfo.USER_ID}-${tRetDate1}`;

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
            // var tTemplateExcel = `${tPath0}/완료보고서2_1.xlsx`;
            var tTemplateExcel = `${tPath0}/orderstatus_excel.xlsx`;

            const wb = new Excel.Workbook();
            await wb.xlsx.readFile(tTemplateExcel);

            var tSheetName = `Sheet2`;
            const sheet = wb.getWorksheet(tSheetName);
            // const sheet = wb.getWorksheet(1);

            sheet.getCell(3, 17).value = 'REMARK';
            var nRowIdx = 4;
            var nColMax = 17;

            var tIdx = 0;
            for (tIdx = 0; tIdx < resultData.length; tIdx++) {
                var col = { ...resultData[tIdx] };
                if (col.STATUS) {
                    sheet.getCell(nRowIdx, 1).value = col.ORDER_CD;
                    sheet.getCell(nRowIdx, 2).value = col.STATUS;
                    sheet.getCell(nRowIdx, 3).value = col.STYLE_NAME;
                    sheet.getCell(nRowIdx, 4).value = Number(parseFloat(col.TOT_CNT).toFixed(2));
                    sheet.getCell(nRowIdx, 5).value = Number(parseFloat(col.SHIP_CNT).toFixed(2));
                    sheet.getCell(nRowIdx, 6).value = Number(parseFloat(col.USD_PRICE).toFixed(2));
                    sheet.getCell(nRowIdx, 7).value = Number(parseFloat(col.ORD_AMT).toFixed(2));
                    sheet.getCell(nRowIdx, 8).value = moment(col.SHIP_DATE).format('YYYY-MM-DD');
                    sheet.getCell(nRowIdx, 9).value = col.KIND;
                    sheet.getCell(nRowIdx, 10).value = Number(parseFloat(col.MATL_PRICE).toFixed(2));
                    sheet.getCell(nRowIdx, 11).value = Number(parseFloat(col.FC_PRICE).toFixed(2));
                    sheet.getCell(nRowIdx, 12).value = Number(parseFloat(col.COMMISSION).toFixed(2));
                    sheet.getCell(nRowIdx, 13).value = Number(parseFloat(col.ETC_PRICE).toFixed(2));
                    sheet.getCell(nRowIdx, 14).value = Number(parseFloat(col.TOT_PRICE).toFixed(2));
                    sheet.getCell(nRowIdx, 15).value = Number(parseFloat(col.RATE).toFixed(2));
                    sheet.getCell(nRowIdx, 16).value = Number(parseFloat(col.TOT_AMT).toFixed(2));
                    sheet.getCell(nRowIdx, 17).value = col.REMARK;
                    sheet.getCell(nRowIdx, 18).value = col.STYLE_CD;
                } else {
                    sheet.getCell(nRowIdx, 1).value = col.ORDER_CD;
                    sheet.getCell(nRowIdx, 2).value = col.STATUS;
                    sheet.getCell(nRowIdx, 3).value = col.STYLE_NAME;
                    sheet.getCell(nRowIdx, 4).value = 0;
                    sheet.getCell(nRowIdx, 5).value = 0;
                    sheet.getCell(nRowIdx, 6).value = 0;
                    sheet.getCell(nRowIdx, 7).value = 0;
                    sheet.getCell(nRowIdx, 8).value = moment(col.SHIP_DATE).format('YYYY-MM-DD');
                    sheet.getCell(nRowIdx, 9).value = col.KIND;
                    sheet.getCell(nRowIdx, 10).value = Number(parseFloat(col.MATL_PRICE).toFixed(2));
                    sheet.getCell(nRowIdx, 11).value = 0;
                    sheet.getCell(nRowIdx, 12).value = 0;
                    sheet.getCell(nRowIdx, 13).value = 0;
                    sheet.getCell(nRowIdx, 14).value = 0;
                    sheet.getCell(nRowIdx, 15).value = 0;
                    sheet.getCell(nRowIdx, 16).value = 0;
                    sheet.getCell(nRowIdx, 17).value = col.REMARK;
                    sheet.getCell(nRowIdx, 18).value = col.STYLE_CD;
                }
                nRowIdx += 1;
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
            fs.createWriteStream(tExcelFileName).write(fileData);

            let fileUrl = '';
            const fileNameWithExt = `${tWExcelFile}.xlsx`;

            try {
                const objectName = `excel/${fileNameWithExt}`;
                const response = await generateUploadURL(objectName);
                const presignedUrl = response.uploadURL;

                await axios.put(presignedUrl, fileData, {
                    headers: {
                        'Content-Type':
                            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    },
                });

                fileUrl = await generateDownloadURL(
                    response.imageName,
                    fileNameWithExt,
                );
            } catch (uploadError) {
                console.log('S0214 makeReport10 upload error:', uploadError);
            }

            console.log('Success excel:' + tWExcelFile);

            return {
                NAME: tWExcelFile,
                FILE_NAME: fileNameWithExt,
                FILE_URL: fileUrl,
            };
        } catch (error) {
            console.log('Error  excel:' + error.message);
            return {
                NAME: '',
                FILE_NAME: '',
                FILE_URL: '',
            };
        }
    }
    async makeReport12(argData, contextValue, resultData) {
        // Excel 
        var tRetDate = AFLib.getCurrTime();
        var tRetDate1 = tRetDate.substring(0, 8);
        var tUserInfo = AFLib.getUserInfo(contextValue);

        // var tWExcelFile = `완료보고서2-${tUserInfo.USER_ID}-${tRetDate1}`;
        var tWExcelFile = `OrderStatus(Partial)-${tUserInfo.USER_ID}-${tRetDate1}`;

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
            // var tTemplateExcel = `${tPath0}/완료보고서2_1.xlsx`;
            var tTemplateExcel = `${tPath0}/orderstatus_partial.xlsx`;

            const wb = new Excel.Workbook();
            await wb.xlsx.readFile(tTemplateExcel);

            var tSheetName = `Sheet2`;
            const sheet = wb.getWorksheet(tSheetName);
            // const sheet = wb.getWorksheet(1);

            var nRowIdx = 4;
            var nColMax = 17;

            var tIdx = 0;
            for (tIdx = 0; tIdx < resultData.length; tIdx++) {
                var col = { ...resultData[tIdx] };
                if (!col.STATUS) continue;
                sheet.getCell(nRowIdx, 1).value = col.ORDER_CD;
                sheet.getCell(nRowIdx, 2).value = col.STYLE_NAME;
                sheet.getCell(nRowIdx, 3).value = Number(parseFloat(col.TOT_CNT).toFixed(2));
                sheet.getCell(nRowIdx, 4).value = Number(parseFloat(col.SHIP_CNT).toFixed(2));
                sheet.getCell(nRowIdx, 5).value = moment(col.SHIP_DATE).format('YYYY-MM-DD');
                sheet.getCell(nRowIdx, 6).value = Number(parseFloat(col.USD_PRICE).toFixed(2));
                sheet.getCell(nRowIdx, 7).value = Number(parseFloat(col.ORD_AMT).toFixed(2));
                sheet.getCell(nRowIdx, 8).value = Number(parseFloat(col.FC_PRICE).toFixed(2));
                sheet.getCell(nRowIdx, 9).value = Number(parseFloat(col.ETC_PRICE).toFixed(2));
                sheet.getCell(nRowIdx, 10).value = Number(parseFloat(col.COMMISSION).toFixed(2));
                sheet.getCell(nRowIdx, 11).value = col.ORDER_STATUS_NAME;
                sheet.getCell(nRowIdx, 12).value = col.REMARK;
                nRowIdx += 1;
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
            fs.createWriteStream(tExcelFileName).write(fileData);

            let fileUrl = '';
            const fileNameWithExt = `${tWExcelFile}.xlsx`;

            try {
                const objectName = `excel/${fileNameWithExt}`;
                const response = await generateUploadURL(objectName);
                const presignedUrl = response.uploadURL;

                await axios.put(presignedUrl, fileData, {
                    headers: {
                        'Content-Type':
                            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    },
                });

                fileUrl = await generateDownloadURL(
                    response.imageName,
                    fileNameWithExt,
                );
            } catch (uploadError) {
                console.log('S0214 makeReport10 upload error:', uploadError);
            }

            console.log('Success excel:' + tWExcelFile);

            return {
                NAME: tWExcelFile,
                FILE_NAME: fileNameWithExt,
                FILE_URL: fileUrl,
            };
        } catch (error) {
            console.log('Error  excel:' + error.message);
            return {
                NAME: '',
                FILE_NAME: '',
                FILE_URL: '',
            };
        }
    }
}

// export default로 Query 내용 내보내기
const moduleQuery_S0214_ORDER_STATUS_BEFORE_AFTER_CHECK_TBL_KSV_ORDER_MST = {
    Query: {
        mgrQuery_S0214_ORDER_STATUS_BEFORE_AFTER_CHECK_CODE: async (
            _,
            args,
        ) => {
            var tWRet: any = {};

            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_BUYER
            `;
            let tRet0: any = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tRet = [];
            tRet0.forEach((col, i) => {
                var tObj = { ...col };
                tObj.BUYER_NAME = `(${col.BUYER_CD})${col.BUYER_NAME}`;
                tRet.push(tObj);
            });

            var tObj: any = {};
            tObj.BUYER_CD = ' ';
            tObj.BUYER_NAME = ' ';
            tRet.unshift(tObj);

            tWRet.BUYER_CD = tRet;

            return tWRet;
        },

        mgrQuery_S0214_ORDER_STATUS_BEFORE_AFTER_CHECK_TBL_KSV_ORDER_MST:
            async (_, args, contextValue) => {
                var tSQL = '';
                var tRetDate = AFLib.getCurrTime();

                const func = new S0214_QRY_COMM();
                var tRetArray = [];
                tRetArray = await func.makeReportAll(
                    args.data,
                    contextValue,
                    [],
                );

                let reportInfo = null;

                if (args.data.REPORT_KIND === 'END_REPORT') {
                    reportInfo = await func.makeReport10(
                        args.data,
                        contextValue,
                        tRetArray,
                    );
                }
                else if (args.data.REPORT_KIND === 'EXCEL') {
                    reportInfo = await func.makeReport11(
                        args.data,
                        contextValue,
                        tRetArray,
                    );
                }
                else if (args.data.REPORT_KIND === 'PARTIAL') {
                    reportInfo = await func.makeReport12(
                        args.data,
                        contextValue,
                        tRetArray,
                    );
                }

                const tRetObj = {
                    filename: reportInfo?.NAME || '',
                    FILE_NAME: reportInfo?.FILE_NAME || '',
                    FILE_URL: reportInfo?.FILE_URL || '',
                    datas: [...tRetArray ],
                };

                return tRetObj;
            },

        mgrQuery_S0214_EXCEL_REPORT5: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var s_date = args.data.S_SHIP_DATE;
            var e_date = args.data.E_SHIP_DATE;
            if (args.data.E_SHIP_DATE === '') e_date = '99999999';
            if (args.data.S_SHIP_DATE === '') {
                s_date = moment().subtract(6, 'months');
            }

            var tWExcelFile = `Partial List-${tUserInfo.USER_ID}-${tRetDate1}`;

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

                sheet.getCell(1, 1).value = 'Partial List';

                sheet.getCell(3, 1).value = 'ORDER';
                sheet.getCell(3, 2).value = 'STYLE';
                sheet.getCell(3, 3).value = 'ORD QTY';
                sheet.getCell(3, 4).value = 'SHIP QTY';
                sheet.getCell(3, 5).value = 'S/DATE';
                sheet.getCell(3, 6).value = 'U/PRC';
                sheet.getCell(3, 7).value = 'MATL AMT';
                sheet.getCell(3, 8).value = 'FC PRC';
                sheet.getCell(3, 9).value = 'ETC';
                sheet.getCell(3, 10).value = 'COMM';
                sheet.getCell(3, 11).value = 'STATUS';
                sheet.getCell(3, 12).value = 'REMARK';

                var nRowIdx = 4;

                const func = new S0214_QRY_COMM();
                var tRetArray = [];
                tRetArray = await func.makeReportAll(
                    args.data,
                    contextValue,
                    [],
                );

                var tIdx = 0;
                for (tIdx = 0; tIdx < tRetArray.length; tIdx++) {
                    var col = { ...tRetArray[tIdx] };
                    if (!col.STYLE_NAME) continue;

                    sheet.getCell(nRowIdx, 1).value = col.ORDER_CD;
                    sheet.getCell(nRowIdx, 2).value = col.STYLE_NAME;
                    sheet.getCell(nRowIdx, 3).value = col.TOT_CNT;
                    sheet.getCell(nRowIdx, 4).value = col.SHIP_CNT;
                    sheet.getCell(nRowIdx, 5).value = col.SHIP_DATE;
                    sheet.getCell(nRowIdx, 6).value = col.USD_PRICE;
                    sheet.getCell(nRowIdx, 7).value = col.MATL_AMT;
                    sheet.getCell(nRowIdx, 8).value = col.FC_PRICE;
                    sheet.getCell(nRowIdx, 9).value = col.ETC_AMT;
                    sheet.getCell(nRowIdx, 10).value = col.COMMISSION;
                    sheet.getCell(nRowIdx, 11).value = col.ORDER_STATUS_NAME;
                    sheet.getCell(nRowIdx, 12).value = col.REMARK;
                    nRowIdx += 1;
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
                fs.createWriteStream(tExcelFileName).write(fileData);

                let fileUrl = '';

                const response = await generateUploadURL(
                    `excel/${tWExcelFile}.xlsx`,
                );
                const presignedUrl = response.uploadURL;

                await axios.put(
                    presignedUrl,
                    fileData,
                    {
                        headers: {
                            'Content-Type':
                                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                        },
                    },
                );

                fileUrl = await generateDownloadURL(
                    response.imageName,
                    `${tWExcelFile}.xlsx`,
                );

                console.log('Success excel:' + tWExcelFile);
                var tRetArray: any[] = [];
                var tObj = {
                    id: 1,
                    CODE: 'SUCCESS',
                    FILE_NAME: `${tWExcelFile}.xlsx`,
                    URL: fileUrl,
                };

                tRetArray.push(tObj);
                return tRetArray;
            } catch (error) {
                var tRetArray: any[] = [];
                let tObj = {
                    id: 1,
                    CODE: `ERROR:${error.message}`,
                    FILE_NAME: '',
                    URL: '',
                };

                tRetArray.push(tObj);
                return tRetArray;
            }
        },

        mgrQuery_S0214_ORDER_STATUS_BEFORE_AFTER_CHECK_TBL_KSV_ORDER_MST_bak1:
            async (_, args, contextValue) => {
                var tSQL = '';
                var tRetDate = AFLib.getCurrTime();

                var s_date = args.data.S_SHIP_DATE;
                var e_date = args.data.E_SHIP_DATE;
                if (args.data.S_SHIP_DATE === '') {
                    s_date = `${tRetDate.substring(0, 6)}01`;
                }
                if (args.data.E_SHIP_DATE === '') {
                    e_date = `${tRetDate.substring(0, 6)}31`;
                }

                var tOrdStatus = [];
                if (args.data.PARTIAL_SHIP_FLAG === '1') tOrdStatus.push('5');
                if (args.data.END_REPORT_FLAG === '1') tOrdStatus.push('8');
                if (args.data.END_FLAG === '1') tOrdStatus.push('9');

                var tOrdStatusSql = '';
                tOrdStatus.forEach((col, i) => {
                    if (i === 0) tOrdStatusSql = `('${col}' `;
                    else tOrdStatusSql += `,'${col}'`;
                });
                if (tOrdStatusSql !== '') {
                    tOrdStatusSql += ')';
                    tOrdStatusSql = `and a.order_status in ${tOrdStatusSql} `;
                } else {
                    tOrdStatusSql = `and a.order_status in ('5', '8', '9') `;
                }

                var tSQL_shipdate = '';
                var tSQL_shipdate1 = '';
                var tSQL_duedate = '';
                if (args.data.SHIPDATE_FLAG === '1') {
                    tSQL_shipdate = `
                            left join ksv_order_ship b on b.order_cd = a.order_cd 
                                                      -- and ship_date between '${s_date}' and '${e_date}'
                                                      and b.ship_ptype in ('0','5')
              `;
                    tSQL_shipdate1 = `
                        and a.order_cd in (
                            select
                                order_cd
                            from
                                ksv_order_ship
                            where
                                ship_date between '${s_date}' and '${e_date}'
                                and ship_ptype in ('0', '5')
                        )
                    `;
                } else {
                    tSQL_shipdate = `
                            left join ksv_order_ship b on b.order_cd = a.order_cd 
                                                      and b.ship_ptype in ('0','5')
               `;
                    tSQL_shipdate1 = `
                 			                      and a.due_date between '${s_date}' and '${e_date}'
               `;
                }

                if (
                    args.data.ORDER_CD !== '' &&
                    args.data.ORDER_CD.length >= 6
                ) {
                    if (args.data.SHIPDATE_FLAG === '1') {
                        tSQL_shipdate = `
                            left join ksv_order_ship b on b.order_cd = a.order_cd 
                                                      and b.ship_ptype in ('0','5')
              `;
                    }
                    tSQL_shipdate1 = '';
                }

                let sqlStr = `
                    select
                        a.order_cd as ORDER_CD,
                        c.style_name as STYLE_NAME,
                        a.tot_cnt as TOT_CNT,
                        isnull(sum(b.ship_cnt), 0) as SHIP_CNT,
                        isnull(min(b.ship_date), '') as SHIP_DATE,
                        isnull(a.usd_price, 0) as USD_PRICE,
                        isnull(a.matl_amt, 0) as MATL_AMT,
                        isnull(a.fc_price, 0) as FC_PRICE,
                        isnull(a.etc_amt, 0) as ETC_AMT,
                        isnull(a.commission, 0) as COMMISSION,
                        isnull(a.fc_bef, 0) as FC_BEF,
                        d.cd_name as ORDER_STATUS_NAME,
                        a.order_status as ORDER_STATUS,
                        a.remark as REMARK,
                        a.factory_cd as FACTORY_CD,
                        a.line_charge_price as LINE_CHARGE_PRICE,
                        left(a.end_datetime, 8) as END_DATETIME
                    from
                        ksv_order_mst a ${tSQL_shipdate},
                        kcd_style c,
                        kcd_code d
                    where
                        a.order_cd like '%${args.data.ORDER_CD}%' ${tSQL_shipdate1} ${tOrdStatusSql}
                        and left(a.order_cd, 2) like '%${args.data.BUYER_CD}%'
                        and a.order_type in ('0', '1')
                        and c.style_cd = a.style_cd
                        and d.cd_group = 'ORDER_STATUS'
                        and d.cd_code = a.order_status
                    group by
                        a.order_cd,
                        c.style_name,
                        a.tot_cnt,
                        a.usd_price,
                        a.matl_amt,
                        a.fc_price,
                        a.etc_amt,
                        a.commission,
                        a.fc_bef,
                        d.cd_name,
                        a.order_status,
                        a.remark,
                        a.factory_cd,
                        a.line_charge_price,
                        a.end_datetime
                    union
                    select
                        a.order_cd as ORDER_CD,
                        c.style_name as STYLE_NAME,
                        a.tot_cnt as TOT_CNT,
                        isnull(sum(b.ship_cnt), 0) as SHIP_CNT,
                        isnull(min(b.ship_date), 0) as SHIP_DATE,
                        isnull(a.usd_price, 0) as USD_PRICE,
                        isnull(a.matl_amt, 0) as MATL_AMT,
                        isnull(a.fc_price, 0) as FC_PRICE,
                        isnull(a.etc_amt, 0) as ETC_AMT,
                        isnull(a.commission, 0) as COMMISSION,
                        isnull(a.fc_bef, 0) as FC_BEF,
                        d.cd_name as ORDER_STATUS_NAME,
                        a.order_status as ORDER_STATUS,
                        a.remark as REMARK,
                        a.factory_cd as FACTORY_CD,
                        a.line_charge_price as LINE_CHARGE_PRICE,
                        left(a.end_datetime, 8) as END_DATETIME
                    from
                        ksv_order_mst a ${tSQL_shipdate},
                        kcd_style c,
                        kcd_code d
                    where
                        a.sample_flag = '1' ${tSQL_shipdate1} ${tOrdStatusSql}
                        and left(a.order_cd, 2) like '%${args.data.BUYER_CD}%'
                        and a.order_cd like '%${args.data.ORDER_CD}%'
                        and a.order_type in ('0', '1')
                        and c.style_cd = a.style_cd
                        and d.cd_group = 'ORDER_STATUS'
                        and d.cd_code = a.order_status
                    group by
                        a.order_cd,
                        c.style_name,
                        a.tot_cnt,
                        a.usd_price,
                        a.matl_amt,
                        a.fc_price,
                        a.etc_amt,
                        a.commission,
                        a.fc_bef,
                        d.cd_name,
                        a.order_status,
                        a.remark,
                        a.factory_cd,
                        a.line_charge_price,
                        a.end_datetime
                        -- order by a.order_cd,c.style_name
                `;
                var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

                var tRetData = {};

                const orderCds = tRet.map((r) => r.ORDER_CD);

                const shipRows = await prisma.$queryRaw`
                    SELECT
                        order_cd,
                        ISNULL(MAX(ship_date), '') AS max_ship_date
                    FROM
                        ksv_order_ship
                    WHERE
                        order_cd IN (${Prisma.join(orderCds)})
                    GROUP BY
                        order_cd
                `;

                const costRows = await prisma.$queryRaw`
                    SELECT
                        a.order_cd,
                        ISNULL(SUM(a.use_qty * m.matl_price * c.usd_rate), 0) AS bef_cost
                    FROM
                        ksv_po_mrpnet a
                        JOIN ksv_order_mst b ON b.order_cd = a.order_cd
                        JOIN kcd_matl_mem m ON m.matl_cd = a.matl_cd
                        AND m.matl_seq = a.matl_seq
                        JOIN kcd_curr_com c ON c.curr_cd = m.curr_cd
                        AND c.start_date = (
                            SELECT
                                MAX(start_date)
                            FROM
                                kcd_curr_com
                            WHERE
                                curr_cd = m.curr_cd
                                AND start_date <= b.order_date
                        )
                    WHERE
                        a.order_cd IN (${Prisma.join(orderCds)})
                    GROUP BY
                        a.order_cd
                `;

                const shipMap = Object.fromEntries(
                    shipRows.map((r) => [r.order_cd, r.max_ship_date]),
                );
                const costMap = Object.fromEntries(
                    costRows.map((r) => [r.order_cd, r.bef_cost]),
                );

                const tRetArray = [];

                for (const src of tRet) {
                    const shipCnt =
                        parseFloat(src.SHIP_CNT) <= 0 &&
                        parseInt(src.ORDER_STATUS, 10) >= 4
                            ? parseFloat(src.TOT_CNT)
                            : parseFloat(src.SHIP_CNT);

                    const ordAmt = parseFloat(src.USD_PRICE) * shipCnt;
                    const commAmt = parseFloat(src.COMMISSION) * shipCnt;
                    const matlPrice = shipCnt
                        ? parseFloat(src.MATL_AMT) / shipCnt
                        : 0;
                    const etcPrice = shipCnt
                        ? parseFloat(src.ETC_AMT) / shipCnt
                        : 0;
                    const totPrice =
                        matlPrice +
                        parseFloat(src.FC_PRICE) +
                        etcPrice +
                        parseFloat(src.COMMISSION);
                    const totAmt = totPrice * shipCnt;
                    const rate =
                        ordAmt > 0 ? ((ordAmt - totAmt) / ordAmt) * 100 : 0;
                    const maxShipDate = shipMap[src.ORDER_CD] ?? '';

                    const afterObj = {
                        ...src,
                        SHIP_DATE: maxShipDate,
                        SHIP_CNT: String(shipCnt),
                        ORD_AMT: String(ordAmt),
                        COMM_AMT: String(commAmt),
                        MATL_PRICE: String(matlPrice),
                        ETC_PRICE: String(etcPrice),
                        TOT_PRICE: String(totPrice),
                        TOT_AMT: String(totAmt),
                        RATE: String(rate),
                        KIND: 'After',
                        STATUS: src.ORDER_STATUS_NAME,
                    };
                    tRetArray.push(afterObj);

                    const befCost = costMap[src.ORDER_CD] ?? 0;
                    const befPrice = shipCnt ? befCost / shipCnt : 0;

                    const beforeObj = {
                        ORDER_CD: src.ORDER_CD,
                        STATUS: '',
                        STYLE_NAME: '',
                        TOT_CNT: '',
                        SHIP_CNT: '',
                        SHIP_DATE: maxShipDate,
                        USD_PRICE: '',
                        ORD_AMT: '',
                        COMM_AMT: '',
                        MATL_AMT: '',
                        FC_PRICE: '',
                        ETC_AMT: '',
                        ETC_PRICE: '',
                        TOT_AMT: '',
                        TOT_PRICE: '',
                        RATE: '',
                        KIND: 'Before',
                        COMMISSION: '',
                        FC_BEF: '',
                        ORDER_STATUS_NAME: '',
                        ORDER_STATUS: '',
                        REMARK: '',
                        FACTORY_CD: '',
                        LINE_CHARGE_PRICE: '',
                        END_DATETIME: '',
                        MATL_PRICE: String(befPrice),
                    };
                    tRetArray.push(beforeObj);
                }

                const func = new S0214_QRY_COMM();
                const reportInfo = await func.makeReport10(
                    args.data,
                    contextValue,
                    tRetArray,
                );

                const tRetObj = {
                    filename: reportInfo?.NAME || '',
                    FILE_NAME: reportInfo?.FILE_NAME || '',
                    FILE_URL: reportInfo?.FILE_URL || '',
                    datas: [...tRetArray],
                };

                return tRetObj;

                /*
       var tRetArray = [];
       var tIdx = 0; 
       for (tIdx = 0; tIdx < tRet.length; tIdx++) {
           var tObj = { ...tRet[tIdx] };
           var sql0 = `
               select
                   isnull(max(ship_date), '') as max_ship_date
               from
                   ksv_order_ship
               where
                   order_cd = '${tObj.ORDER_CD}'
           `;
           var tRet0  =  await prisma.$queryRaw(Prisma.raw(sql0));
           var tMaxShipDate = '';
           if (tRet0.length > 0) tMaxShipDate = tRet0[0].max_ship_date;

           var tShipCnt = 0;
           if (parseFloat(tObj.SHIP_CNT) <= 0 && parseInt(tObj.ORDER_STATUS) >= 4) tShipCnt = parseFloat(tObj.TOT_CNT);
           else tShipCnt = parseFloat(tObj.SHIP_CNT);

           var tOrdAmt = parseFloat(tObj.USD_PRICE) * tShipCnt;
           tObj.ORD_AMT = String(tOrdAmt);

           var tCommAmt = parseFloat(tObj.COMMISSION) * tShipCnt;
           tObj.COMM_AMT = String(tCommAmt);

           var tMatlPrice = 0;
           if (tShipCnt > 0) tMatlPrice = parseFloat(tObj.MATL_AMT) /  tShipCnt; 
           tObj.MATL_PRICE = String(tMatlPrice);

           var tEtcPrice = 0;
           if (tShipCnt > 0) tEtcPrice = parseFloat(tObj.ETC_AMT) /  tShipCnt; 
           tObj.ETC_PRICE = String(tEtcPrice);

           var tTotPrice = tMatlPrice + parseFloat(tObj.FC_PRICE) + tEtcPrice + parseFloat(tObj.COMMISSION);
           tObj.TOT_PRICE = String(tTotPrice);
           
           var tTotAmt = tTotPrice * tShipCnt;
           tObj.TOT_AMT = String(tTotAmt);

           var tRate = 0;
           var tDiff = tOrdAmt - tTotAmt;
           if (tOrdAmt > 0) tRate = tDiff / tOrdAmt * 100.0;
           tObj.RATE = String(tRate);
           tObj.KIND = 'After';
           tObj.STATUS = tObj.ORDER_STATUS_NAME;
           tRetArray.push(tObj);

           var sql1 = `
               select
                   isnull(sum(a.use_qty * c.matl_price * d.usd_rate), 0) as bef_cost
               from
                   ksv_po_mrpnet a,
                   ksv_order_mst b,
                   kcd_matl_mem c,
                   kcd_curr_com d
               where
                   a.order_cd = '${tObj.ORDER_CD}'
                   and b.order_cd = '${tObj.ORDER_CD}'
                   and c.matl_cd = a.matl_cd
                   and c.matl_seq = a.matl_seq
                   and d.curr_cd = c.curr_cd
                   and d.start_date = (
                       select
                           max(start_date)
                       from
                           kcd_curr_com
                       where
                           start_date <= b.order_date
                   )
           `;
           var tRet1  =  await prisma.$queryRaw(Prisma.raw(sql1));
           var tBefCost = 0;
           if (tRet1.length > 0) tBefCost = tRet1[0].bef_cost;

           var tObj2 = {};
           tObj2.ORDER_CD = '';
           tObj2.STATUS = '';
           tObj2.STYLE_NAME = '';
           tObj2.TOT_CNT = '';
           tObj2.SHIP_CNT = '';
           tObj2.SHIP_DATE = '';
           tObj2.USD_PRICE = '';
           tObj2.ORD_AMT = '';
           tObj2.COMMIT_AMT = '';
           tObj2.MATL_AMT = '';
           tObj2.FC_PRICE = '';
           tObj2.ETC_AMT = '';
           tObj2.ETC_PRICE = '';
           tObj2.TOT_AMT = '';
           tObj2.TOT_PRICE = '';
           tObj2.RATE = '';
           tObj2.KIND = '';
           tObj2.COMMISSTION = '';
           tObj2.FC_BEF = '';
           tObj2.ORDER_STATUS_NAME = '';
           tObj2.ORDER_STATUS = '';
           tObj2.REMARK = '';
           tObj2.FACTORY_CD = '';
           tObj2.LINE_CHARGE_PRICE = '';
           tObj2.END_DATETIME = '';
           tObj2.KIND = 'Before';
           tObj2.MATL_PRICE = '0';
           if (tShipCnt > 0) tObj2.MATL_PRICE = String(tBefCost / tShipCnt);
           tObj2.SHIP_DATE = tMaxShipDate;
           tRetArray.push(tObj2);
       }
       var tFunc = new S0214_QRY_COMM();
       var tFileName = await tFunc.makeReport10(args.data, contextValue, tRetArray);

       console.log(sqlStr);

       var tRetObj = {};
       tRetObj.filename = tFileName;
       tRetObj.datas = [ ...tRetArray ];
       return (tRetObj);
       */
            },
    },
};

export default moduleQuery_S0214_ORDER_STATUS_BEFORE_AFTER_CHECK_TBL_KSV_ORDER_MST;
