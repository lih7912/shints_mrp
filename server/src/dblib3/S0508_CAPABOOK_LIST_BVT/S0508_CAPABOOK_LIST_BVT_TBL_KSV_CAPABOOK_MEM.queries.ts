// MGR_@@TNAME@@.queries.js

import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
const Excel = require('exceljs');
const fs = require('fs');
const { upload } = require('../../../routes/s3');
import axios from 'axios';

// export default로 Query 내용 내보내기
const moduleQuery_S0508_CAPABOOK_LIST_BVT_TBL_KSV_CAPABOOK_MEM = {
    Query: {
        mgrQuery_S0508_CODE: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tWRet: any = {};

            let sqlStr9 = `
                SELECT
                    *
                FROM
                    kcd_code
                WHERE
                    cd_group = 'CAPA_USER'
                    and cd_flag = '1'
            `;
            var tRet9 = await prisma.$queryRaw(Prisma.raw(sqlStr9));
            var tObj = {
                CD_CODE: '',
                CD_NAME: ' ',
            };

            tRet9.unshift(tObj);
            tWRet.CAPA_USER = tRet9;

            let sqlStr9 = `
                SELECT
                    *
                FROM
                    kcd_buyer
                WHERE
                    status_cd = '0'
            `;
            var tRet9 = await prisma.$queryRaw(Prisma.raw(sqlStr9));
            var tRet = [];
            tRet9.forEach((col, i) => {
                var tObj = { ...col };
                tObj.BUYER_NAME = `(${col.BUYER_CD})${col.BUYER_NAME}`;
                tRet.push(tObj);
            });
            var tObj = {
                BUYER_CD: '',
                BUYER_NAME: ' ',
            };
            tRet.unshift(tObj);
            tWRet.BUYER_CD = tRet;

            return tWRet;
        },
        mgrQuery_S0508_ALL_LIST: async (_, args) => {
            var tArray = [];

            let sql0 = `
                select
                    USER_ID,
                    min(BOOK_DATE) as BOOK_DATE
                from
                    ksv_capabook_mst
                where
                    status_cd = '0'
                group by
                    user_id
            `;
            const tRet = await prisma.$queryRaw(Prisma.raw(sql0));
            tRet.forEach((col, i) => {
                var tObj = { ...col };
                tObj.KIND = 'BVT_MST';
                tArray.push(tObj);
            });

            let sql0 = `
                select
                    USER_ID,
                    min(BOOK_DATE) as BOOK_DATE
                from
                    ksv_capabook_mst_ethiopia
                where
                    status_cd = '0'
                group by
                    user_id
            `;
            const tRet = await prisma.$queryRaw(Prisma.raw(sql0));
            tRet.forEach((col, i) => {
                var tObj = { ...col };
                tObj.KIND = 'ETP_MST';
                tArray.push(tObj);
            });

            let sql0 = `
                select
                    USER_ID,
                    min(BOOK_DATE) as BOOK_DATE
                from
                    ksv_capasample_mst
                where
                    status_cd = '0'
                group by
                    user_id
            `;
            const tRet = await prisma.$queryRaw(Prisma.raw(sql0));
            tRet.forEach((col, i) => {
                var tObj = { ...col };
                tObj.KIND = 'BVT_SAMPLE';
                tArray.push(tObj);
            });

            let sql0 = `
                select
                    USER_ID,
                    min(BOOK_DATE) as BOOK_DATE
                from
                    ksv_capasample_mst_ethiopia
                where
                    status_cd = '0'
                group by
                    user_id
            `;
            const tRet = await prisma.$queryRaw(Prisma.raw(sql0));
            tRet.forEach((col, i) => {
                var tObj = { ...col };
                tObj.KIND = 'ETP_SAMPLE';
                tArray.push(tObj);
            });

            return tArray;
        },
        mgrQuery_S0508_CAPABOOK_LIST_BVT_DATE: async (
            _,
            args,
            contextValue,
        ) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            console.log(tUserInfo);

            var tWRet = {};

            var tSQL = '';
            let sqlStr = `
                SELECT
                    max(BOOK_DATE) as MAX_BOOK_DATE
                FROM
                    ksv_capabook_mst_ethiopia
                WHERE
                    status_cd = '1'
                    and user_id = '${args.USER_ID}'
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWRet.BOOK_DATE_ETP = tRet[0].MAX_BOOK_DATE;

            let sqlStr1 = `
                SELECT
                    min(BOOK_DATE) as MIN_BOOK_DATE
                FROM
                    ksv_capabook_mst_ethiopia
                WHERE
                    status_cd = '0'
                    and user_id = '${args.USER_ID}'
            `;
            var tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));
            tWRet.NEW_DATE_ETP = tRet1[0].MIN_BOOK_DATE;

            var tSQL = '';
            let sqlStr = `
                SELECT
                    max(BOOK_DATE) as MAX_BOOK_DATE
                FROM
                    ksv_capasample_mst_ethiopia
                WHERE
                    status_cd = '1'
                    and user_id = '${args.USER_ID}'
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWRet.BOOK_DATE_SAMPLE_ETP = tRet[0].MAX_BOOK_DATE;

            let sqlStr1 = `
                SELECT
                    min(BOOK_DATE) as MIN_BOOK_DATE
                FROM
                    ksv_capasample_mst_ethiopia
                WHERE
                    status_cd = '0'
                    and user_id = '${args.USER_ID}'
            `;
            var tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));
            tWRet.NEW_DATE_SAMPLE_ETP = tRet1[0].MIN_BOOK_DATE;

            let sqlStr2 = `
                SELECT
                    max(BOOK_DATE) as MAX_BOOK_DATE
                FROM
                    ksv_capabook_mst
                WHERE
                    status_cd = '1'
                    and user_id = '${args.USER_ID}'
            `;
            var tRet2 = await prisma.$queryRaw(Prisma.raw(sqlStr2));
            tWRet.BOOK_DATE_BVT = tRet2[0].MAX_BOOK_DATE;

            let sqlStr3 = `
                SELECT
                    min(BOOK_DATE) as MIN_BOOK_DATE
                FROM
                    ksv_capabook_mst
                WHERE
                    status_cd = '0'
                    and user_id = '${args.USER_ID}'
            `;
            var tRet3 = await prisma.$queryRaw(Prisma.raw(sqlStr3));
            tWRet.NEW_DATE_BVT = tRet3[0].MIN_BOOK_DATE;

            let sqlStr2 = `
                SELECT
                    max(BOOK_DATE) as MAX_BOOK_DATE
                FROM
                    ksv_capasample_mst
                WHERE
                    status_cd = '1'
                    and user_id = '${args.USER_ID}'
            `;
            var tRet2 = await prisma.$queryRaw(Prisma.raw(sqlStr2));
            tWRet.BOOK_DATE_SAMPLE_BVT = tRet2[0].MAX_BOOK_DATE;

            let sqlStr3 = `
                SELECT
                    min(BOOK_DATE) as MIN_BOOK_DATE
                FROM
                    ksv_capasample_mst
                WHERE
                    status_cd = '0'
                    and user_id = '${args.USER_ID}'
            `;
            var tRet3 = await prisma.$queryRaw(Prisma.raw(sqlStr3));
            tWRet.NEW_DATE_SAMPLE_BVT = tRet3[0].MIN_BOOK_DATE;

            let sqlStr4 = `
                SELECT
                    *
                FROM
                    kcd_code
                WHERE
                    cd_group = 'BVT_KIND'
            `;
            var tRet4 = await prisma.$queryRaw(Prisma.raw(sqlStr4));
            tWRet.BVT_KIND = tRet4;

            var tObj5 = [];
            var tObj51 = {};
            tObj51.id = 1;
            tObj51.CD_CODE = 'NEW';
            tObj51.CD_NAME = 'NEW';
            tObj51.CD_GROUP = 'NR_TYPE';
            tObj5.push(tObj51);
            var tObj52 = {};
            tObj52.id = 2;
            tObj52.CD_CODE = 'REPEAT';
            tObj52.CD_NAME = 'REPEAT';
            tObj52.CD_GROUP = 'NR_TYPE';
            tObj5.push(tObj52);
            var tObj53 = {};
            tObj53.id = 3;
            tObj53.CD_CODE = ' ';
            tObj53.CD_NAME = ' ';
            tObj53.CD_GROUP = ' ';
            tObj5.push(tObj53);
            tWRet.NR = tObj5;

            var tObj6 = [];
            var tObj61 = {};
            tObj61.id = 1;
            tObj61.CD_CODE = 'BVT';
            tObj61.CD_NAME = 'BVT';
            tObj61.CD_GROUP = 'FACTOYR';
            if (tUserInfo.PART !== 'EPS') tObj6.push(tObj61);

            var tObj62 = {};
            tObj62.id = 2;
            tObj62.CD_CODE = 'ETP';
            tObj62.CD_NAME = 'ETP';
            tObj62.CD_GROUP = 'FACTORY';
            if (tUserInfo.PART !== 'VPS') tObj6.push(tObj62);

            var tObj63 = {};
            tObj63.id = 3;
            tObj63.CD_CODE = ' ';
            tObj63.CD_NAME = ' ';
            tObj63.CD_GROUP = ' ';
            tObj6.push(tObj63);
            tWRet.FACTORY_CD = tObj6;

            // console.log(tWRet);

            return tWRet;
        },
        mgrQuery_S0508_CAPABOOK_LIST_BVT_TBL_KSV_CAPABOOK_MEM: async (
            _,
            args,
        ) => {
            var tSQL = '';
            var tTableName = '';
            var tStatus = '1';

            if (args.data.FACTORY_CD === 'ETP') {
                if (args.data.IS_SAMPLE === '1')
                    tTableName = 'ksv_capasample_mem_ethiopia';
                else tTableName = 'ksv_capabook_mem_ethiopia';
            } else {
                if (args.data.IS_SAMPLE === '1')
                    tTableName = 'ksv_capasample_mem';
                else tTableName = 'ksv_capabook_mem';
            }

            if (args.data.BUYER_CD !== '') {
                tSQL += `and left(order_cd, 2) = '${args.data.BUYER_CD}' `;
            }

            let sqlStr = `
                select
                    a.*,
                    b.STYLE_NAME,
                    c.NEGO_TYPE,
                    b0.BUYER_NAME,
                    '9999' as SHIP_DATE,
                    isnull(d.END_PRODUCTION_DATE, '') as END_PRODUCTION_DATE
                from
                    (
                        select
                            top 1000 *
                        from
                            ${tTableName}
                        where
                            id > 0
                            and book_date = '${args.data.BOOK_DATE}'
                            -- and user_id = '${args.data.USER_NAME}'
                            and order_cd like '%${args.data.ORDER_CD}%' ${tSQL}
                            -- offset 0 rows fetch next 1000 rows only
                        order by
                            a.po_cd,
                            a.order_cd
                    ) a
                    left join kcd_style b on a.style_cd = b.style_cd
                    left join kcd_buyer b0 on b0.buyer_cd = left(a.order_cd, 2)
                    left join ksv_order_cmpt c on a.order_cd = c.order_cd
                    and c.nego_type = '1',
                    ksv_order_mst d
                where
                    a.ORDER_CD = d.ORDER_CD
            `;

            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            const orderCodes = tRet.map((r) => r.ORDER_CD);
            if (orderCodes.length === 0) return [];

            const BATCH_SIZE = 100;
            const shipMap = new Map();

            for (let i = 0; i < orderCodes.length; i += BATCH_SIZE) {
                const batch = orderCodes.slice(i, i + BATCH_SIZE);
                const rows = await prisma.$queryRaw`
                    SELECT
                        order_cd,
                        MAX(ship_date) AS ship_date
                    FROM
                        ksv_order_ship
                    WHERE
                        order_cd IN (${Prisma.join(batch)})
                    GROUP BY
                        order_cd
                `;
                rows.forEach((r) => shipMap.set(r.order_cd, r.ship_date || ''));
            }

            return tRet.map((row) => ({
                ...row,
                SHIP_DATE: shipMap.get(row.ORDER_CD) ?? '',
            }));
            /*
      var tRetArray = [];
      var tIdx = 0; 
      for (tIdx = 0; tIdx < tRet.length ; tIdx++) {
          var tOne = { ...tRet[tIdx] };
          tOne.SHIP_DATE = '';
          let sqlStr1 = `
              select
                  isnull(max(ship_date), '') as ship_date
              from
                  ksv_order_ship
              where
                  order_cd = '${tOne.ORDER_CD}'
          `;
          var tRet1  =  await prisma.$queryRaw(Prisma.raw(sqlStr1));
          if (tRet1.length > 0) tOne.SHIP_DATE = tRet1[0].ship_date;
          tRetArray.push(tOne);
      }
      return (tRetArray);
      */
        },
        mgrQuery_S0508_EXCEL_PRINT: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tSQL = '';

            var arrColName = new Array(50);
            var strExcel = new Array(50);
            var strLData = new Array(50);

            var tMaxCol = 37;

            arrColName[0] = 'Mon';
            arrColName[1] = 'BookDate';
            arrColName[2] = 'JOB CD';
            arrColName[3] = 'BUYER';
            arrColName[4] = 'P/O #';
            arrColName[5] = 'ORDER #(for fixed order)';
            arrColName[6] = 'STYLE';
            arrColName[7] = 'New or Repeat';
            arrColName[8] = "Q'ty";
            arrColName[9] = 'For men or women';
            arrColName[10] = 'CAT #';
            arrColName[11] = 'EMBROIDERY';
            arrColName[12] = 'T/P';
            arrColName[13] = 'S/P';
            arrColName[14] = 'LTHR';
            arrColName[15] = 'G';
            arrColName[16] = 'W';
            arrColName[17] = 'S';
            arrColName[18] = '4ND';
            arrColName[19] = 'D/L';
            arrColName[20] = 'TPR';
            arrColName[21] = 'Embossing';
            arrColName[22] = 'Washing';
            arrColName[23] = 'Down';
            arrColName[24] = 'Cut Protector';
            arrColName[25] = 'FTP';
            arrColName[26] = 'DTP';
            arrColName[27] = 'Laze';
            arrColName[28] = 'Materials ETA';
            arrColName[29] = 'FOB(U$)';
            arrColName[30] = 'S/D';
            arrColName[31] = 'KIND';
            arrColName[32] = 'ETA of W/sheet+Sample+pattern';
            arrColName[33] = 'Expected CMPT';
            arrColName[34] = 'Fixed CMPT';
            arrColName[35] = 'Remark';
            arrColName[36] = 'Style Cd';
            arrColName[37] = 'Kind';

            var tExcelTemplate = '영업_CAPABOOK';
            if (args.data.FACTORY_CD === 'FC044')
                tExcelTemplate = 'ETP_CAPABOOK';

            var tWExcelFile = `${tExcelTemplate}-${args.data.USER_NAME}-${tRetDate}.xlsx`;
            if (args.data.IS_ALL === '1')
                tWExcelFile = `${tExcelTemplate}-All-${tRetDate}.xlsx`;

            var tTableNameMem = '';
            var tTableNameMst = '';
            if (args.data.FACTORY_CD === 'BVT') {
                if (args.data.IS_SAMPLE === '1') {
                    tTableNameMem = 'ksv_capasample_mem';
                    tTableNameMst = 'ksv_capasample_mst';
                } else {
                    tTableNameMem = 'ksv_capabook_mem';
                    tTableNameMst = 'ksv_capabook_mst';
                }
            }
            if (args.data.FACTORY_CD === 'ETP') {
                if (args.data.IS_SAMPLE === '1') {
                    tTableNameMem = 'ksv_capasample_mem_ethiopia';
                    tTableNameMst = 'ksv_capasample_mst_ethiopia';
                } else {
                    tTableNameMem = 'ksv_capabook_mem_ethiopia';
                    tTableNameMst = 'ksv_capabook_mst_ethiopia';
                }
            }

            let sqlStr = `
                select
                    top 1 *
                from
                    ${tTableNameMst}
                where
                    user_id = '${args.data.USER_NAME}'
                    and status_cd = '1'
                order by
                    book_date desc
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            if (tRet.length <= 0) {
                var tRetArray: any[] = [];
                var tObj = {
                    id: 0,
                    CODE: 'ERROR: 잘못된 User입니다',
                };

                tRetArray.push(tObj);
                return tRetArray;
            }

            var tLastDate = tRet[0].BOOK_DATE;

            var tSQL1 = '';
            if (args.data.IS_ALL !== '1') {
                tSQL1 = `and a.user_id = '${args.data.USER_NAME}' `;
            }
            let sqlStr1 = `
                select
                    a.month,
                    a.in_date,
                    a.job_cd,
                    a.buyer_cd,
                    a.po_cd,
                    a.order_cd,
                    b.style_name,
                    a.nr,
                    a.qty,
                    a.mw,
                    a.cat,
                    a.embro,
                    a.tp,
                    a.sp,
                    a.lthr,
                    a.g,
                    a.w,
                    a.s,
                    a.fnd,
                    a.dl,
                    a.tpr,
                    a.embossing,
                    a.washing,
                    a.down,
                    a.cut,
                    a.ftp,
                    a.dtp,
                    a.laze,
                    a.m_eta,
                    a.fob,
                    a.sd,
                    a.bvt_kind,
                    a.s_eta,
                    a.exp_cmpt,
                    '' as fix_cmpt,
                    a.job_cd, --제외
                    a.user_id, -- 제외
                    a.seq, --제외
                    a.remark,
                    b.style_cd,
                    c.cd_name as kind_n
                from
                    ${tTableNameMem} a,
                    kcd_style b,
                    kcd_code c
                where
                    a.book_date = '${args.data.BOOK_DATE}' ${tSQL1}
                    and b.style_cd = a.style_cd
                    and c.cd_group = 'bvt_kind'
                    and b.bvt_kind = c.cd_code
                order by
                    a.user_id,
                    a.po_cd,
                    a.order_cd
            `;
            var tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));

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

                var tTemplateExcel = `${tPath0}/${tExcelTemplate}.xlsx`;

                const wb = new Excel.Workbook();
                await wb.xlsx.readFile(tTemplateExcel);

                var tSheetName = '부자재 출고';
                const sheet = wb.getWorksheet(tSheetName);

                sheet.getCell(11, 1).value = args.data.BOOK_DATE;

                var tChangeArray = [];

                var tIdx1 = 0;
                var tRowIdx = 14;
                for (tIdx1 = 0; tIdx1 < tRet1.length; tIdx1++) {
                    const tOne = { ...tRet1[tIdx1] };
                    sheet.getCell(tRowIdx, 1).value = tOne.month;
                    sheet.getCell(tRowIdx, 2).value = tOne.in_date;
                    sheet.getCell(tRowIdx, 3).value = tOne.job_cd;
                    sheet.getCell(tRowIdx, 4).value = tOne.buyer_cd;
                    sheet.getCell(tRowIdx, 5).value = tOne.po_cd;
                    sheet.getCell(tRowIdx, 6).value = tOne.order_cd;
                    sheet.getCell(tRowIdx, 7).value = tOne.style_name;
                    sheet.getCell(tRowIdx, 8).value = tOne.nr;
                    sheet.getCell(tRowIdx, 9).value = tOne.qty;
                    sheet.getCell(tRowIdx, 10).value = tOne.mw;
                    sheet.getCell(tRowIdx, 11).value = tOne.cat;
                    sheet.getCell(tRowIdx, 12).value = tOne.embro;
                    sheet.getCell(tRowIdx, 13).value = tOne.tp;
                    sheet.getCell(tRowIdx, 14).value = tOne.sp;
                    sheet.getCell(tRowIdx, 15).value = tOne.lthr;
                    sheet.getCell(tRowIdx, 16).value = tOne.g;
                    sheet.getCell(tRowIdx, 17).value = tOne.w;
                    sheet.getCell(tRowIdx, 18).value = tOne.s;
                    sheet.getCell(tRowIdx, 19).value = tOne.fnd;
                    sheet.getCell(tRowIdx, 20).value = tOne.dl;
                    sheet.getCell(tRowIdx, 21).value = tOne.tpr;
                    sheet.getCell(tRowIdx, 22).value = tOne.embossing;
                    sheet.getCell(tRowIdx, 23).value = tOne.washing;
                    sheet.getCell(tRowIdx, 24).value = tOne.down;
                    sheet.getCell(tRowIdx, 25).value = tOne.cut;
                    sheet.getCell(tRowIdx, 26).value = tOne.ftp;
                    sheet.getCell(tRowIdx, 27).value = tOne.dtp;
                    sheet.getCell(tRowIdx, 28).value = tOne.laze;
                    sheet.getCell(tRowIdx, 29).value = tOne.m_eta;
                    sheet.getCell(tRowIdx, 30).value = tOne.fob;
                    sheet.getCell(tRowIdx, 31).value = tOne.sd;
                    sheet.getCell(tRowIdx, 32).value = tOne.bvt_kind;
                    sheet.getCell(tRowIdx, 33).value = tOne.s_eta;
                    sheet.getCell(tRowIdx, 34).value = tOne.exp_cmpt;
                    sheet.getCell(tRowIdx, 35).value = tOne.fix_cmpt;

                    sheet.getCell(tRowIdx, 39).value = tOne.style_cd;
                    sheet.getCell(tRowIdx, 40).value = tOne.kind_n;
                    sheet.getCell(tRowIdx, 41).value = tOne.remark;

                    if (tOne.job_cd !== 'U') {
                        tRowIdx += 1;
                        continue;
                    }

                    let sqlStr2 = `
                        select
                            a.month,
                            a.in_date,
                            a.job_cd,
                            a.buyer_cd,
                            a.po_cd,
                            a.order_cd,
                            b.style_name,
                            a.nr,
                            a.qty,
                            a.mw,
                            a.cat,
                            a.embro,
                            a.tp,
                            a.sp,
                            a.lthr,
                            a.g,
                            a.w,
                            a.s,
                            a.fnd,
                            a.dl,
                            a.tpr,
                            a.embossing,
                            a.washing,
                            a.down,
                            a.cut,
                            a.ftp,
                            a.dtp,
                            a.laze,
                            a.m_eta,
                            a.fob,
                            a.sd,
                            a.bvt_kind,
                            a.s_eta,
                            a.exp_cmpt,
                            '' as fix_cmpt,
                            a.job_cd,
                            a.user_id,
                            a.seq,
                            a.remark,
                            b.style_cd,
                            c.cd_name as kind_n
                        from
                            ${tTableNameMem} a,
                            kcd_style b,
                            kcd_code c
                        where
                            a.book_date = '${tLastDate}'
                            and a.user_id = '${tOne.user_id}'
                            and a.seq = '${tOne.seq}'
                            and b.style_cd = a.style_cd
                            and c.cd_group = 'bvt_kind'
                            and b.bvt_kind = c.cd_code
                        order by
                            a.user_id,
                            a.po_cd,
                            a.order_cd
                    `;
                    var tRet2 = await prisma.$queryRaw(Prisma.raw(sqlStr2));

                    if (tRet2.length > 0 && tOne.job_cd === 'U') {
                        var tOne2 = { ...tRet2[0] };

                        var tKeys = Object.keys(tOne);
                        var tIdx2 = 0;
                        for (tIdx2 = 0; tIdx2 < tKeys.length; tIdx2++) {
                            var tKey = tKeys[tIdx2];

                            var tVal1 = tOne[`${tKey}`];
                            var tVal2 = tOne2[`${tKey}`];
                            var arrColName0 = arrColName[tIdx2];
                            // var tStr1 = `${tOne.po_cd} ${tOne.order_cd}:${arrColName0} ${tVal1}->${tVal2}`;
                            // console.log(tStr1);

                            if (tVal1 !== tVal2) {
                                if (typeof arrColName0 !== 'undefined') {
                                    var tStr = `${tOne.po_cd} ${tOne.order_cd}:${arrColName0} ${tVal1}->${tVal2}`;
                                    tChangeArray.push(tStr);
                                }
                            }
                        }
                    }
                    tRowIdx += 1;
                }

                tRowIdx += 2;
                tChangeArray.forEach((col, i) => {
                    sheet.getCell(tRowIdx, 1).value = col;
                    tRowIdx += 1;
                });

                return await upload(`${tWExcelFile}.xlsx`, wb);
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
    },
};

export default moduleQuery_S0508_CAPABOOK_LIST_BVT_TBL_KSV_CAPABOOK_MEM;
