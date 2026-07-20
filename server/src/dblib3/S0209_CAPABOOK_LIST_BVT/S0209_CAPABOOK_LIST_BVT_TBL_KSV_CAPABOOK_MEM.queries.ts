// MGR_@@TNAME@@.queries.js

import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
const Excel = require('exceljs');
const fs = require('fs');
const { upload } = require('../../../routes/s3');
import axios from 'axios';
const moment = require('moment');

// export default로 Query 내용 내보내기
const moduleQuery_S0209_CAPABOOK_LIST_BVT_TBL_KSV_CAPABOOK_MEM = {
    Query: {
        mgrQuery_S0209_CODE: async (_, args) => {
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

            console.log(tWRet);

            return tWRet;
        },
        mgrQuery_S0209_ALL_LIST: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tArray = [];

            if (args.data.FACTORY_CD === 'BVT' && args.data.IS_SAMPLE !== '1') {
                let sql0 = `
                    select
                        USER_ID,
                        max(BOOK_DATE) as BOOK_DATE
                    from
                        ksv_capabook_mst
                    where
                        status_cd = '1'
                        and user_id in (
                            select
                                user_id
                            from
                                ksv_capabook_user
                            where
                                kind = 'BVT_MST'
                        )
                    group by
                        user_id
                `;
                const tRet = await prisma.$queryRaw(Prisma.raw(sql0));
                tRet.forEach((col, i) => {
                    var tObj = { ...col };
                    tObj.KIND = 'BVT_MST';
                    // tObj.BOOK_DATE = tRetDate1;
                    tArray.push(tObj);
                });
            }
            if (args.data.FACTORY_CD === 'ETP' && args.data.IS_SAMPLE !== '1') {
                let sql0 = `
                    select
                        USER_ID,
                        max(BOOK_DATE) as BOOK_DATE
                    from
                        ksv_capabook_mst_ethiopia
                    where
                        status_cd = '1'
                        and user_id in (
                            select
                                user_id
                            from
                                ksv_capabook_user
                            where
                                kind = 'ETP_MST'
                        )
                    group by
                        user_id
                `;
                const tRet = await prisma.$queryRaw(Prisma.raw(sql0));
                tRet.forEach((col, i) => {
                    var tObj = { ...col };
                    tObj.KIND = 'ETP_MST';
                    // tObj.BOOK_DATE = tRetDate1;
                    tArray.push(tObj);
                });
            }

            if (args.data.FACTORY_CD === 'BVT' && args.data.IS_SAMPLE === '1') {
                let sql0 = `
                    select
                        USER_ID,
                        max(BOOK_DATE) as BOOK_DATE
                    from
                        ksv_capasample_mst
                    where
                        status_cd = '1'
                        and user_id in (
                            select
                                user_id
                            from
                                ksv_capabook_user
                            where
                                kind = 'BVT_SAMPLE'
                        )
                    group by
                        user_id
                `;
                const tRet = await prisma.$queryRaw(Prisma.raw(sql0));
                tRet.forEach((col, i) => {
                    var tObj = { ...col };
                    tObj.KIND = 'BVT_SAMPLE';
                    // tObj.BOOK_DATE = tRetDate1;
                    tArray.push(tObj);
                });
            }

            if (args.data.FACTORY_CD === 'ETP' && args.data.IS_SAMPLE === '1') {
                let sql0 = `
                    select
                        USER_ID,
                        max(BOOK_DATE) as BOOK_DATE
                    from
                        ksv_capasample_mst_ethiopia
                    where
                        status_cd = '1'
                        and user_id in (
                            select
                                user_id
                            from
                                ksv_capabook_user
                            where
                                kind = 'ETP_SAMPLE'
                        )
                    group by
                        user_id
                `;
                const tRet = await prisma.$queryRaw(Prisma.raw(sql0));
                tRet.forEach((col, i) => {
                    var tObj = { ...col };
                    tObj.KIND = 'ETP_SAMPLE';
                    // tObj.BOOK_DATE = tRetDate1;
                    tArray.push(tObj);
                });
            }

            return tArray;
        },
        mgrQuery_S0209_CAPABOOK_LIST_BVT_DATE: async (_, args) => {
            var tWRet = {};

            let sqlStr9 = `
                SELECT
                    BOOK_DATE,
                    STATUS_CD
                FROM
                    ksv_capabook_mst_ethiopia
                where
                    user_id = '${args.USER_ID}'
                order by
                    BOOK_DATE desc
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr9));
            tWRet.BOOK_DATES_ETP = tRet;

            let sqlStr9_1 = `
                SELECT
                    BOOK_DATE,
                    STATUS_CD
                FROM
                    ksv_capabook_mst
                where
                    user_id = '${args.USER_ID}'
                order by
                    BOOK_DATE desc
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr9_1));
            tWRet.BOOK_DATES_BVT = tRet;

            let sqlStr9 = `
                SELECT
                    BOOK_DATE,
                    STATUS_CD
                FROM
                    ksv_capasample_mst_ethiopia
                where
                    user_id = '${args.USER_ID}'
                order by
                    BOOK_DATE desc
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr9));
            tWRet.SAMPLE_DATES_ETP = tRet;

            let sqlStr9_1 = `
                SELECT
                    BOOK_DATE,
                    STATUS_CD
                FROM
                    ksv_capasample_mst
                where
                    user_id = '${args.USER_ID}'
                order by
                    BOOK_DATE desc
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr9_1));
            tWRet.SAMPLE_DATES_BVT = tRet;

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
            tObj6.push(tObj61);
            var tObj62 = {};
            tObj62.id = 2;
            tObj62.CD_CODE = 'ETP';
            tObj62.CD_NAME = 'ETP';
            tObj62.CD_GROUP = 'FACTORY';
            tObj6.push(tObj62);
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
        mgrQuery_S0209_CAPABOOK_LIST_BVT_TBL_KSV_CAPABOOK_MEM: async (
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

            if (args.data.PO_CD !== '') {
                tSQL += `AND po_cd like '%${args.data.PO_CD}%' `;
            }

            let sqlStr = `
                select
                    a.*,
                    isnull(c.NEGO_TYPE, '0') as NEGO_TYPE,
                    b.STYLE_NAME,
                    b0.BUYER_NAME,
                    isnull(d.CAPA_M_ETA, '') as CAPA_M_ETA,
                    isnull(d.DUE_DATE, '') as ETD,
                    isnull(d.DUE_DATE, '') as ORDER_DUE_DATE,
                    isnull(d.APPROVAL_DATE, '') as APPROVAL_DATE,
                    isnull(d.MATL_DUE_DATE, '') as MATL_DUE_DATE
                from
                    (
                        select
                            top 2000 a0.*
                        from
                            ${tTableName} a0
                        where
                            a0.book_date = '${args.data.BOOK_DATE}'
                            AND a0.po_cd like '%${args.data.PO_CD}%'
                            and a0.user_id = '${args.data.USER_NAME}'
                        order by
                            left(a0.order_cd, 2),
                            a0.order_cd
                            -- offset 0 rows fetch next 1000 rows only
                    ) a
                    left join ksv_order_mst d on a.order_cd = d.order_cd
                    left join kcd_style b on a.style_cd = b.style_cd
                    left join kcd_buyer b0 on b0.buyer_cd = left(a.order_cd, 2)
                    left join ksv_order_cmpt c on a.order_cd = c.order_cd
                    and c.nego_type = '1'
                    and c.nego_seq = (
                        select
                            max(nego_seq)
                        from
                            ksv_order_cmpt
                        where
                            order_cd = a.order_cd
                    )
                order by
                    a.po_cd,
                    a.order_cd
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                JOB_CD: '',
                IN_DATE: '',
                BUYER_NAME: '',
                BUYER_CD: '',
                PO_CD: '',
                ORDER_CD: '',
                STYLE_NAME: '',
                STYLE_CD: '',
                NR: '',
                QTY: '',
                MW: '',
                SHIP_DATE: '',
                S_ETA: '',
                M_ETA: '',
                SD: '',
                FOB: '',
                EXP_CMPT: '',
                NEGO_TYPE: '',
                EMBRO: '',
                TP: '',
                SP: '',
                LTHR: '',
                G: '',
                W: '',
                S: '',
                FND: '',
                DL: '',
                TPR: '',
                EMBOSSING: '',
                WASHING: '',
                DOWN: '',
                CUT: '',
                FTP: '',
                DTP: '',
                LAZE: '',
                BVT_KIND: '',
                SEQ: '',
                REMARK: '',
            };

            var tRetArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
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
                var tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));
                if (tRet1.length > 0) tOne.SHIP_DATE = tRet1[0].ship_date;

                tOne.EXF = tOne.SD;
                tOne.M_ETA = tOne.M_ETA;
                // if (tOne.CAPA_M_ETA !== '') tOne.M_ETA = tObj.CAPA_M_ETA;
                if (typeof tOne.USAGE !== 'undefined') {
                    tOne.USAGE_N = '';
                    let sqlStr9 = `
                        select
                            *
                        from
                            kcd_code
                        where
                            cd_group = 'SAMPLE_USAGE'
                            and cd_code = '${tOne.USAGE}'
                    `;
                    var tRet9 = await prisma.$queryRaw(Prisma.raw(sqlStr9));
                    if (tRet9.length > 0) tOne.USAGE_N = tRet9[0].CD_NAME;
                } else {
                    tOne.USAGE = '';
                    tOne.USAGE_N = '';
                }
                tRetArray.push(tOne);
            }
            return tRetArray;
        },
        mgrQuery_S0209_EXCEL_PRINT: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tSQL = '';

            var arrColName = new Array(50);
            var strExcel = new Array(50);
            var strLData = new Array(50);

            var tMaxCol = 41;

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
            arrColName[35] = 'CONFIRM DATE';
            arrColName[36] = 'Production Input Plan';
            arrColName[37] = ' ';
            arrColName[38] = 'Style Code';
            arrColName[39] = 'Kind Name';
            arrColName[40] = 'Remarks';
            arrColName[41] = 'IDX';

            var tExcelTemplateName = '';
            var tExcelTemplate = '영업_CAPABOOK';
            let factory = '영업';
            if (args.data.FACTORY_CD === 'ETP') {
                // tExcelTemplate = 'ETP_CAPABOOK';
                tExcelTemplateName = 'ETP_CAPABOOK';
                factory = 'ETP';
            } else {
                tExcelTemplateName = 'BVT_CAPABOOK';
                factory = 'BVT';
            }

            var tWExcelFile = `${tExcelTemplateName}-${args.data.USER_NAME}-${tRetDate}.xlsx`;
            if (args.data.IS_ALL === '1')
                tWExcelFile = `${tExcelTemplateName}-All-${tRetDate}.xlsx`;

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

            let sqlStr9 = `
                select
                    min(book_date) as book_date
                from
                    ${tTableNameMst}
                where
                    user_id = '${args.data.USER_NAME}'
                    and status_cd = '0'
                order by
                    book_date desc
            `;
            var tRet9 = await prisma.$queryRaw(Prisma.raw(sqlStr9));
            var tNewDate = '';
            if (tRet9.length > 0) {
                tNewDate = tRet9[0].book_date;
                if (tNewDate !== args.data.BOOK_DATE)
                    tNewDate = args.data.BOOK_DATE;
            }

            let sqlStr = `
                select
                    max(book_date) as book_date
                from
                    ${tTableNameMst}
                where
                    user_id = '${args.data.USER_NAME}'
                    and book_date < '${tNewDate}'
                    and status_cd = '1'
                order by
                    book_date desc
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tLastDate = '';
            if (tRet.length > 0) {
                tLastDate = tRet[0].book_date;
            }

            if (tLastDate === '' || tNewDate === '') {
                var tRetArray: any[] = [];
                var tObj = {
                    id: 0,
                    CODE: 'ERROR: 잘못된 User입니다',
                };
                tRetArray.push(tObj);
                return tRetArray;
            }

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
                    isnull(a.po_cd, '') as po_cd,
                    a.order_cd,
                    b.style_name,
                    isnull(a.nr, '') as nr,
                    a.qty,
                    isnull(a.mw, '') as mw,
                    isnull(a.cat, '') as cat,
                    isnull(a.embro, '') as embro,
                    isnull(a.tp, '') as tp,
                    isnull(a.sp, '') as sp,
                    isnull(a.lthr, '') as lthr,
                    isnull(a.g, '') as g,
                    isnull(a.w, '') as w,
                    isnull(a.s, '') as s,
                    isnull(a.fnd, '') as fnd,
                    isnull(a.dl, '') as dl,
                    isnull(a.tpr, '') as tpr,
                    isnull(a.embossing, '') as embossing,
                    isnull(a.washing, '') as washing,
                    isnull(a.down, '') as down,
                    isnull(a.cut, '') as cut,
                    isnull(a.ftp, '') as ftp,
                    isnull(a.dtp, '') as dtp,
                    isnull(a.laze, '') as laze,
                    isnull(a.m_eta, '') as m_eta,
                    isnull(a.fob, '') as fob,
                    isnull(a.sd, '') as sd,
                    isnull(a.bvt_kind, '') as bvt_kind,
                    isnull(a.s_eta, '') as s_eta,
                    isnull(a.exp_cmpt, '') as exp_cmpt,
                    '' as fix_cmpt,
                    '' as confirm_date,
                    '' as production_input_plan,
                    b.style_cd,
                    c.cd_name as kind_n,
                    isnull(a.remark, '') as remark,
                    a.capabook_idx,
                    a.job_cd, --제외
                    a.user_id, -- 제외
                    a.seq --제외
                from
                    ${tTableNameMem} a,
                    kcd_style b
                    left join kcd_code c on c.cd_group = 'bvt_kind'
                    and c.cd_code = b.bvt_kind
                where
                    a.book_date = '${tNewDate}' ${tSQL1}
                    and b.style_cd = a.style_cd
                    -- order by a.user_id,a.po_cd, a.order_cd 
                order by
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

                var tSheetName = 'Main_Capabook';
                const sheet = wb.getWorksheet(tSheetName);

                sheet.getCell(10, 1).value =
                    `Monthly Production CAPACITY Booking in ${tRetDate.substring(0, 4)} in SHINTS ${factory}`;
                sheet.getCell(11, 1).value = 'BookDate:' + args.data.BOOK_DATE;

                var tChangeArray: String[] = [];

                var tIdx1 = 0;
                var tRowIdx = 14;
                for (tIdx1 = 0; tIdx1 < tRet1.length; tIdx1++) {
                    const tOne = { ...tRet1[tIdx1] };
                    sheet.getCell(tRowIdx, 1).value = tOne.month;
                    sheet.getCell(tRowIdx, 2).value = moment(
                        tOne.in_date,
                        'YYYYMMDD',
                    ).format('YYYY-MM-DD');
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
                    sheet.getCell(tRowIdx, 29).value = moment(
                        tOne.m_eta,
                        'YYYYMMDD',
                    ).format('YYYY-MM-DD');
                    sheet.getCell(tRowIdx, 30).value = tOne.fob;
                    sheet.getCell(tRowIdx, 31).value = moment(
                        tOne.sd,
                        'YYYYMMDD',
                    ).format('YYYY-MM-DD');
                    sheet.getCell(tRowIdx, 32).value = tOne.bvt_kind;
                    sheet.getCell(tRowIdx, 33).value = moment(
                        tOne.s_eta,
                        'YYYYMMDD',
                    ).format('YYYY-MM-DD');
                    sheet.getCell(tRowIdx, 34).value = tOne.exp_cmpt;
                    sheet.getCell(tRowIdx, 35).value = tOne.fix_cmpt;
                    sheet.getCell(tRowIdx, 35 + 1).value = '';
                    sheet.getCell(tRowIdx, 36 + 1).value = '';
                    sheet.getCell(tRowIdx, 37 + 1).value = '';
                    sheet.getCell(tRowIdx, 38 + 1).value = tOne.style_cd;
                    sheet.getCell(tRowIdx, 39 + 1).value = tOne.kind_n;
                    sheet.getCell(tRowIdx, 40 + 1).value = tOne.remark;
                    sheet.getCell(tRowIdx, 41 + 1).value = tOne.capabook_idx;

                    let fillColor = '';
                    if (tOne.job_cd === 'I') {
                        fillColor = 'FF00FFFF'; // 청녹색
                    } else if (tOne.job_cd === 'E') {
                        fillColor = 'FFFFFF00'; // 노란색
                    } else if (tOne.job_cd === 'D') {
                        fillColor = 'FFFF0000'; // 빨간색
                    }

                    if (fillColor) {
                        for (let colIdx = 1; colIdx <= 41; colIdx++) {
                            const cell = sheet.getCell(tRowIdx, colIdx);
                            cell.fill = {
                                type: 'pattern',
                                pattern: 'solid',
                                fgColor: { argb: fillColor },
                            };
                        }
                    }

                    // Apply borders to the row
                    for (let colIdx = 1; colIdx <= 41; colIdx++) {
                        const cell = sheet.getCell(tRowIdx, colIdx);
                        cell.border = {
                            top: { style: 'thin' },
                            left: { style: 'thin' },
                            bottom: { style: 'thin' },
                            right: { style: 'thin' },
                        };
                    }

                    if (tOne.job_cd !== 'U') {
                        tRowIdx++;
                        continue;
                    }

                    let sqlStr2 = `
                        select
                            a.month,
                            a.in_date,
                            a.job_cd,
                            a.buyer_cd,
                            isnull(a.po_cd, '') as po_cd,
                            a.order_cd,
                            b.style_name,
                            isnull(a.nr, '') as nr,
                            a.qty,
                            isnull(a.mw, '') as mw,
                            isnull(a.cat, '') as cat,
                            isnull(a.embro, '') as embro,
                            isnull(a.tp, '') as tp,
                            isnull(a.sp, '') as sp,
                            isnull(a.lthr, '') as lthr,
                            isnull(a.g, '') as g,
                            isnull(a.w, '') as w,
                            isnull(a.s, '') as s,
                            isnull(a.fnd, '') as fnd,
                            isnull(a.dl, '') as dl,
                            isnull(a.tpr, '') as tpr,
                            isnull(a.embossing, '') as embossing,
                            isnull(a.washing, '') as washing,
                            isnull(a.down, '') as down,
                            isnull(a.cut, '') as cut,
                            isnull(a.ftp, '') as ftp,
                            isnull(a.dtp, '') as dtp,
                            isnull(a.laze, '') as laze,
                            isnull(a.m_eta, '') as m_eta,
                            isnull(a.fob, '') as fob,
                            isnull(a.sd, '') as sd,
                            isnull(a.bvt_kind, '') as bvt_kind,
                            isnull(a.s_eta, '') as s_eta,
                            isnull(a.exp_cmpt, '') as exp_cmpt,
                            '' as fix_cmpt,
                            '' as confirm_date,
                            '' as production_input_plan,
                            b.style_cd,
                            c.cd_name as kind_n,
                            isnull(a.remark, '') as remark,
                            a.capabook_idx,
                            a.job_cd, --제외
                            a.user_id, -- 제외
                            a.seq --제외
                        from
                            ${tTableNameMem} a,
                            kcd_style b
                            left join kcd_code c on c.cd_group = 'bvt_kind'
                            and c.cd_code = b.bvt_kind
                        where
                            a.book_date = '${tLastDate}'
                            and a.user_id = '${tOne.user_id}'
                            -- and a.seq = '${tOne.seq}'
                            and a.order_cd = '${tOne.order_cd}'
                            and b.style_cd = a.style_cd
                        order by
                            a.user_id,
                            a.po_cd,
                            a.order_cd
                    `;
                    var tRet2 = await prisma.$queryRaw(Prisma.raw(sqlStr2));

                    // 변경부분 찾는 코드
                    let changedIndexArray: number[] = [];
                    if (tRet2.length > 0 && tOne.job_cd === 'U') {
                        var tOne2 = { ...tRet2[0] };

                        var tKeys = Object.keys(tOne);
                        var tIdx2 = 0;
                        var tFlag9 = 0;
                        var tJobCdValue = '';

                        for (tIdx2 = 0; tIdx2 < tKeys.length; tIdx2++) {
                            var tKey = tKeys[tIdx2];
                            var tVal1 = tOne[`${tKey}`];
                            var tVal2 = tOne2[`${tKey}`];
                            var arrColName0 = arrColName[tIdx2];
                            // var tStr1 = `${tOne.po_cd} ${tOne.order_cd}:${arrColName0} ${tVal1}->${tVal2}`;
                            // console.log(tStr1);

                            if (tVal1 !== tVal2) {
                                changedIndexArray.push(tIdx2);

                                if (typeof arrColName0 !== 'undefined') {
                                    tChangeArray.push(
                                        `${tOne.po_cd} ${tOne.order_cd}:${arrColName0} ${tVal2}->${tVal1}`,
                                    );

                                    var tFlag9 = 1;
                                    if (arrColName0 === 'JOB CD') {
                                        tJobCdValue = tVal2;
                                    }
                                }
                            } else {
                                if (typeof arrColName0 !== 'undefined') {
                                    if (arrColName0 === 'JOB CD') {
                                        changedIndexArray.push(tIdx2);
                                    }
                                }
                            }
                        }

                        if (tFlag9 === 0) {
                            tChangeArray.push(
                                `${tOne.po_cd} ${tOne.order_cd}:Remark U->`,
                            );
                            tChangeArray.push('');
                        } else {
                            var tStr = '';
                            if (tJobCdValue === '')
                                tStr = `${tOne.po_cd} ${tOne.order_cd}:Remark U->`;
                            else
                                tStr = `${tOne.po_cd} ${tOne.order_cd}:Remark ${tJobCdValue}->`;
                            tChangeArray.push(tStr);
                            tChangeArray.push('');
                        }
                    }

                    if (tOne.job_cd === 'U' && changedIndexArray.length > 0) {
                        for (let i = 0; i < changedIndexArray.length; i++) {
                            const colIdx = changedIndexArray[i] + 1; // 배열 인덱스(0기준)를 Excel 열 번호(1기준)로
                            const cell = sheet.getCell(tRowIdx, colIdx);
                            cell.font = { color: { argb: 'FFFF0000' } }; // 빨간색 폰트
                        }
                    }

                    tRowIdx += 1;
                }

                tRowIdx += 2;
                tChangeArray.forEach((col, i) => {
                    sheet.getCell(tRowIdx, 1).value = col;
                    tRowIdx += 1;
                });

                return await upload(tWExcelFile, wb);
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

        mgrQuery_S0209_EXCEL_PRINT_SAMPLE: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tSQL = '';

            var arrColName = new Array(50);
            var strExcel = new Array(50);
            var strLData = new Array(50);

            var tMaxCol = 34;

            arrColName[0] = 'BookDate';
            arrColName[1] = 'JOB CD';
            arrColName[2] = 'BUYER';
            arrColName[3] = 'P/O #';
            arrColName[4] = 'ORDER #(for fixed order)';
            arrColName[5] = 'STYLE';
            arrColName[6] = 'COLOR VERSION';
            arrColName[7] = 'SIZE';
            arrColName[8] = 'USAGE';
            arrColName[9] = "Q'TIES";
            arrColName[10] = 'FROM';
            arrColName[11] = 'TO';
            arrColName[12] = 'AVERAGE';
            arrColName[13] = 'S/D';
            arrColName[14] = 'Materials ETA';
            arrColName[15] = 'W/SHEET';
            arrColName[16] = 'SAMPLE';
            arrColName[17] = 'EM';
            arrColName[18] = 'T/P';
            arrColName[19] = 'S/P';
            arrColName[20] = 'LTHR';
            arrColName[21] = 'GO';
            arrColName[22] = 'WE';
            arrColName[23] = 'SS';
            arrColName[24] = '4ND';
            arrColName[25] = 'D/L';
            arrColName[26] = 'TPR';
            arrColName[27] = 'Embossing';
            arrColName[28] = 'Washing';
            arrColName[29] = 'Remarks';
            arrColName[30] = 'CMPT';
            arrColName[31] = 'Style Code';
            arrColName[32] = 'Kind Name';

            var tExcelTemplateName = '';
            var tExcelTemplate = '영업_CAPABOOK_SAMPLE';
            let factory = '영업';
            if (args.data.FACTORY_CD === 'ETP') {
                // tExcelTemplate = 'ETP_CAPABOOK';
                tExcelTemplateName = 'ETP_CAPABOOK_SAMPLE';
                factory = 'ETP';
            } else {
                tExcelTemplateName = 'BVT_CAPABOOK_SAMPLE';
                factory = 'BVT';
            }

            var tWExcelFile = `${tExcelTemplateName}-${args.data.USER_NAME}-${tRetDate}.xlsx`;
            if (args.data.IS_ALL === '1')
                tWExcelFile = `${tExcelTemplateName}-All-${tRetDate}.xlsx`;

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

            let sqlStr9 = `
                select
                    min(book_date) as book_date
                from
                    ${tTableNameMst}
                where
                    user_id = '${args.data.USER_NAME}'
                    and status_cd = '0'
                order by
                    book_date desc
            `;
            var tRet9 = await prisma.$queryRaw(Prisma.raw(sqlStr9));
            var tNewDate = '';
            if (tRet9.length > 0) {
                tNewDate = tRet9[0].book_date;
                if (tNewDate !== args.data.BOOK_DATE)
                    tNewDate = args.data.BOOK_DATE;
            }

            let sqlStr = `
                select
                    max(book_date) as book_date
                from
                    ${tTableNameMst}
                where
                    user_id = '${args.data.USER_NAME}'
                    and book_date < '${tNewDate}'
                    and status_cd = '1'
                order by
                    book_date desc
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tLastDate = '';
            if (tRet.length > 0) {
                tLastDate = tRet[0].book_date;
            }

            if (tLastDate === '' || tNewDate === '') {
                var tRetArray: any[] = [];
                var tObj = {
                    id: 0,
                    CODE: 'ERROR: 잘못된 User입니다',
                };
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tSQL1 = '';
            if (args.data.IS_ALL !== '1') {
                tSQL1 = `and a.user_id = '${args.data.USER_NAME}' `;
            }

            let sqlStr1 = `
                select
                    a.in_date, -- 0
                    a.job_cd, -- 1
                    a.buyer_cd, -- 2
                    a.po_cd, --3
                    a.order_cd, --4
                    b.style_name, --5
                    a.color, -- 6
                    use_size, -- 7
                    c.cd_name as usage_n, -- 8
                    a.qty, -- 9
                    a.sts_qty, -- 
                    '', -- 10
                    '', -- 11
                    '', --12 
                    a.sd, -- 13
                    a.m_eta, --14
                    a.s_eta, --15 
                    a.p_eta, --16
                    a.embro, --17
                    a.tp, --18
                    a.sp, --19
                    a.lthr, --20
                    a.g, -- 21
                    a.w, -- 22
                    a.s, -- 23
                    a.fnd, -- 24
                    a.dl, --25
                    a.tpr, --26
                    a.embossing, --27
                    a.washing, --28
                    a.remark, --29
                    a.exp_cmpt, --30
                    --a.kind,
                    --a.bvt_kind,
                    --stock_flag,
                    --a.job_cd,
                    --a.user_id,
                    --a.seq,
                    b.style_cd, -- 31  
                    d.cd_name as bvt_kind_n --32 
                from
                    ${tTableNameMem} a
                    left join kcd_code c on c.cd_group = 'sample_usage'
                    and c.cd_code = a.usage,
                    kcd_style b
                    left join kcd_code d on d.cd_group = 'bvt_kind'
                    and d.cd_code = b.bvt_kind
                where
                    a.book_date = '${tNewDate}'
                    and b.style_cd = a.style_cd ${tSQL1}
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

                var tSheetName = 'Sample_Capa';
                const sheet = wb.getWorksheet(tSheetName);

                // sheet.getCell(10, 1).value = `Monthly Production CAPACITY Booking in ${tRetDate.substring(0,4)} in SHINTS ${factory}`
                sheet.getCell(12, 1).value = 'BookDate:' + args.data.BOOK_DATE;

                var tChangeArray = [];

                var tIdx1 = 0;
                var tRowIdx = 14;
                for (tIdx1 = 0; tIdx1 < tRet1.length; tIdx1++) {
                    const tOne = { ...tRet1[tIdx1] };
                    console.log(tOne);

                    sheet.getCell(tRowIdx, 0 + 1).value = moment(
                        tOne.in_date,
                        'YYYYMMDD',
                    ).format('YYYY-MM-DD');
                    sheet.getCell(tRowIdx, 1 + 1).value = tOne.job_cd;
                    sheet.getCell(tRowIdx, 2 + 1).value = tOne.buyer_cd;
                    sheet.getCell(tRowIdx, 3 + 1).value = tOne.po_cd;
                    sheet.getCell(tRowIdx, 4 + 1).value = tOne.order_cd;
                    sheet.getCell(tRowIdx, 5 + 1).value = tOne.style_name;
                    sheet.getCell(tRowIdx, 6 + 1).value = tOne.color;
                    sheet.getCell(tRowIdx, 7 + 1).value = tOne.use_size;
                    sheet.getCell(tRowIdx, 8 + 1).value = tOne.usage_n;
                    sheet.getCell(tRowIdx, 9 + 1).value = tOne.qty;
                    sheet.getCell(tRowIdx, 10 + 1).value = '';
                    sheet.getCell(tRowIdx, 11 + 1).value = '';
                    sheet.getCell(tRowIdx, 12 + 1).value = '';
                    sheet.getCell(tRowIdx, 13 + 1).value = '';
                    sheet.getCell(tRowIdx, 14 + 1).value = moment(
                        tOne.sd,
                        'YYYYMMDD',
                    ).format('YYYY-MM-DD');
                    sheet.getCell(tRowIdx, 15 + 1).value = moment(
                        tOne.m_eta,
                        'YYYYMMDD',
                    ).format('YYYY-MM-DD');
                    sheet.getCell(tRowIdx, 16 + 1).value = moment(
                        tOne.s_eta,
                        'YYYYMMDD',
                    ).format('YYYY-MM-DD');
                    sheet.getCell(tRowIdx, 17 + 1).value = moment(
                        tOne.p_eta,
                        'YYYYMMDD',
                    ).format('YYYY-MM-DD');
                    sheet.getCell(tRowIdx, 18 + 1).value = tOne.embro;
                    sheet.getCell(tRowIdx, 19 + 1).value = tOne.tp;
                    sheet.getCell(tRowIdx, 20 + 1).value = tOne.sp;
                    sheet.getCell(tRowIdx, 21 + 1).value = tOne.lthr;
                    sheet.getCell(tRowIdx, 22 + 1).value = tOne.g;
                    sheet.getCell(tRowIdx, 23 + 1).value = tOne.w;
                    sheet.getCell(tRowIdx, 24 + 1).value = tOne.s;
                    sheet.getCell(tRowIdx, 25 + 1).value = tOne.fnd;
                    sheet.getCell(tRowIdx, 26 + 1).value = tOne.dl;
                    sheet.getCell(tRowIdx, 27 + 1).value = tOne.tpr;
                    sheet.getCell(tRowIdx, 28 + 1).value = tOne.embossing;
                    sheet.getCell(tRowIdx, 29 + 1).value = tOne.washing;
                    sheet.getCell(tRowIdx, 30 + 1).value = tOne.remark;
                    sheet.getCell(tRowIdx, 31 + 1).value = tOne.exp_cmpt;
                    sheet.getCell(tRowIdx, 32 + 1).value = tOne.style_cd;
                    sheet.getCell(tRowIdx, 33 + 1).value = tOne.bvt_kind_n;

                    /*
              if (tOne.job_cd === "U") {
                for (let colIdx = 1; colIdx <= 34; colIdx++) {
                    const cell = sheet.getCell(tRowIdx, colIdx);
                    cell.font = { color: { argb: 'FFFF0000' } }; // Red font
                }
              }
              */

                    let fillColor = '';
                    if (tOne.job_cd === 'I') {
                        fillColor = 'FF00FFFF'; // 청녹색
                    } else if (tOne.job_cd === 'E') {
                        fillColor = 'FFFFFF00'; // 노란색
                    } else if (tOne.job_cd === 'D') {
                        fillColor = 'FFFF0000'; // 빨간색
                    }

                    if (fillColor) {
                        for (let colIdx = 1; colIdx <= 34; colIdx++) {
                            const cell = sheet.getCell(tRowIdx, colIdx);
                            cell.fill = {
                                type: 'pattern',
                                pattern: 'solid',
                                fgColor: { argb: fillColor },
                            };
                        }
                    }

                    // Apply borders to the row
                    for (let colIdx = 1; colIdx <= 34; colIdx++) {
                        const cell = sheet.getCell(tRowIdx, colIdx);
                        cell.border = {
                            top: { style: 'thin' },
                            left: { style: 'thin' },
                            bottom: { style: 'thin' },
                            right: { style: 'thin' },
                        };
                    }

                    if (tOne.job_cd !== 'U') {
                        tRowIdx += 1;
                        continue;
                    }

                    let sqlStr2 = `
                        select
                            a.in_date, -- 0
                            a.job_cd, -- 1
                            a.buyer_cd, -- 2
                            a.po_cd, --3
                            a.order_cd, --4
                            b.style_name, --5
                            a.color, -- 6
                            use_size, -- 7
                            c.cd_name as usage_n, -- 8
                            a.qty, -- 9
                            a.sts_qty, -- 
                            '', -- 10
                            '', -- 11
                            '', --12 
                            a.sd, -- 13
                            a.m_eta, --14
                            a.s_eta, --15 
                            a.p_eta, --16
                            a.embro, --17
                            a.tp, --18
                            a.sp, --19
                            a.lthr, --20
                            a.g, -- 21
                            a.w, -- 22
                            a.s, -- 23
                            a.fnd, -- 24
                            a.dl, --25
                            a.tpr, --26
                            a.embossing, --27
                            a.washing, --28
                            a.remark, --29
                            a.exp_cmpt, --30
                            --a.kind,
                            --a.bvt_kind,
                            --stock_flag,
                            --a.job_cd,
                            --a.user_id,
                            --a.seq,
                            b.style_cd, -- 31  
                            d.cd_name as bvt_kind_n --32 
                        from
                            ${tTableNameMem} a
                            left join kcd_code c on c.cd_group = 'sample_usage'
                            and c.cd_code = a.usage,
                            kcd_style b
                            left join kcd_code d on d.cd_group = 'bvt_kind'
                            and d.cd_code = b.bvt_kind
                        where
                            a.book_date = '${tLastDate}'
                            and b.style_cd = a.style_cd ${tSQL1}
                        order by
                            a.user_id,
                            a.po_cd,
                            a.order_cd
                    `;
                    var tRet2 = await prisma.$queryRaw(Prisma.raw(sqlStr2));
                    console.log(tOne);

                    // 변경부분 찾는 코드
                    arrColName[0] = 'Book Date';
                    arrColName[1] = 'JOB CD';
                    arrColName[2] = 'BUYER';
                    arrColName[3] = 'P/O #';
                    arrColName[4] = 'ORDER #';
                    arrColName[5] = 'STYLE';
                    arrColName[6] = 'COLOR VERSION';
                    arrColName[7] = 'SIZE';
                    arrColName[8] = 'USAGE';
                    arrColName[9] = "Q'TIES";
                    arrColName[10] = ' ';
                    arrColName[11] = 'FROM';
                    arrColName[12] = 'TO';
                    arrColName[13] = 'AVER AGE';
                    arrColName[14] = 'S/D';
                    arrColName[15] = 'Materials ETA';
                    arrColName[16] = 'W/SHEET';
                    arrColName[17] = 'SAMPLE';
                    arrColName[18] = 'EM';
                    arrColName[19] = 'T/P';
                    arrColName[20] = 'S/P';
                    arrColName[21] = 'LTHR';
                    arrColName[22] = 'GO';
                    arrColName[23] = 'WE';
                    arrColName[24] = 'SS';
                    arrColName[25] = '4ND';
                    arrColName[26] = 'D/L';
                    arrColName[27] = 'TPR';
                    arrColName[28] = 'Embossing';
                    arrColName[29] = 'Washing';
                    arrColName[30] = 'REMARK';
                    arrColName[31] = 'CMPT';
                    arrColName[32] = 'Style Code';
                    arrColName[33] = 'Kind Name';

                    const fieldMap = {
                        'Book Date': 'in_date',
                        'JOB CD': 'job_cd',
                        BUYER: 'buyer_cd',
                        'P/O #': 'po_cd',
                        'ORDER #': 'order_cd',
                        STYLE: 'style_name',
                        'COLOR VERSION': 'color',
                        SIZE: 'use_size',
                        USAGE: 'usage_n',
                        "Q'TIES": 'qty',
                        ' ': '', // 빈 칸
                        FROM: '', // 빈 칸
                        TO: '', // 빈 칸
                        'AVER AGE': '', // 빈 칸
                        'S/D': 'sd',
                        'Materials ETA': 'm_eta',
                        'W/SHEET': 's_eta',
                        SAMPLE: 'p_eta',
                        EM: 'embro',
                        'T/P': 'tp',
                        'S/P': 'sp',
                        LTHR: 'lthr',
                        GO: 'g',
                        WE: 'w',
                        SS: 's',
                        '4ND': 'fnd',
                        'D/L': 'dl',
                        TPR: 'tpr',
                        Embossing: 'embossing',
                        Washing: 'washing',
                        REMARK: 'remark',
                        CMPT: 'exp_cmpt',
                        'Style Code': 'style_cd',
                        'Kind Name': 'bvt_kind_n',
                    };

                    if (tOne.job_cd === 'U' && tRet2.length > 0) {
                        const tOne2 = tRet2.find(
                            (row) =>
                                row.order_cd === tOne.order_cd &&
                                row.po_cd === tOne.po_cd,
                        );

                        if (tOne2) {
                            const changedIndexArray: number[] = [];
                            let hasChange = false;
                            let tJobCdValue = '';

                            for (let i = 0; i < arrColName.length; i++) {
                                const label = arrColName[i];
                                const field = fieldMap[label];
                                if (!field) continue;

                                const val1 = (tOne[field] ?? '')
                                    .toString()
                                    .trim();
                                const val2 = (tOne2[field] ?? '')
                                    .toString()
                                    .trim();

                                if (val1 !== val2) {
                                    changedIndexArray.push(i); // 열 인덱스 보존
                                    hasChange = true;
                                    if (label === 'JOB CD') tJobCdValue = val2;

                                    tChangeArray.push(
                                        `${tOne.po_cd} ${tOne.order_cd}:${label} ${val2} -> ${val1}`,
                                    );
                                }
                            }

                            if (!hasChange) {
                                tChangeArray.push(
                                    `${tOne.po_cd} ${tOne.order_cd}:Remark U->`,
                                );
                                tChangeArray.push('');
                            } else {
                                const remark = tJobCdValue
                                    ? `${tOne.po_cd} ${tOne.order_cd}:Remark ${tJobCdValue}->`
                                    : `${tOne.po_cd} ${tOne.order_cd}:Remark U->`;
                                tChangeArray.push(remark);
                                tChangeArray.push('');
                            }

                            // 빨간 글씨 처리
                            changedIndexArray.forEach((colIdx) => {
                                const cell = sheet.getCell(tRowIdx, colIdx + 1);
                                cell.font = { color: { argb: 'FFFF0000' } };
                            });
                        }
                    }
                    tRowIdx++;
                }

                tRowIdx += 2;
                tChangeArray.forEach((col, i) => {
                    sheet.getCell(tRowIdx, 1).value = col;
                    tRowIdx += 1;
                });

                return await upload(tWExcelFile, wb);
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

        mgrQuery_S0209_EXCEL_PRINT_ALL: async (_, args, contextValue) => {
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

            var tExcelTemplateName = '';
            var tExcelTemplate = '영업_CAPABOOK';
            if (args.data.FACTORY_CD === 'ETP') {
                tExcelTemplate = 'ETP_CAPABOOK';
                tExcelTemplateName = 'ETP_CAPABOOK';
            } else {
                tExcelTemplateName = 'BVT_CAPABOOK';
            }

            var tWExcelFile = `${tExcelTemplateName}-${args.data.USER_NAME}-${tRetDate}.xlsx`;
            if (args.data.IS_ALL === '1')
                tWExcelFile = `${tExcelTemplateName}-All-${tRetDate}.xlsx`;

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
                    sheet.getCell(tRowIdx, 2).value = moment(
                        tOne.in_date,
                        'YYYYMMDD',
                    ).format('YYYY-MM-DD');
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
                    sheet.getCell(tRowIdx, 31).value = moment(
                        tOne.sd,
                        'YYYYMMDD',
                    ).format('YYYY-MM-DD');
                    sheet.getCell(tRowIdx, 32).value = tOne.bvt_kind;
                    sheet.getCell(tRowIdx, 33).value = moment(
                        tOne.s_eta,
                        'YYYYMMDD',
                    ).format('YYYY-MM-DD');
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

                return await upload(tWExcelFile, wb);
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

        mgrQuery_S0209_ALL_LIST_bak: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tArray = [];
            /*
       let sql0 = `
           select
               a.*
           from
               (
                   select
                       USER_ID,
                       'BVT_MST' as KIND,
                       min(BOOK_DATE) as BOOK_DATE
                   from
                       ksv_capabook_mst
                   where
                       status_cd = '0'
                   group by
                       user_id
                   union
                   select
                       USER_ID,
                       'ETP_MST' as KIND,
                       min(BOOK_DATE) as BOOK_DATE
                   from
                       ksv_capabook_mst_ethiopia
                   where
                       status_cd = '0'
                   group by
                       user_id
                   union
                   select
                       USER_ID,
                       'BVT_SAMPLE' as KIND,
                       min(BOOK_DATE) as BOOK_DATE
                   from
                       ksv_capasample_mst
                   where
                       status_cd = '0'
                   group by
                       user_id
                   union
                   select
                       USER_ID,
                       'ETP_SAMPLE' as KIND,
                       min(BOOK_DATE) as BOOK_DATE
                   from
                       ksv_capasample_mst_ethiopia
                   where
                       status_cd = '0'
                   group by
                       user_id
               ) a
           order by
               USER_ID
       `;
       const tRet  =  await prisma.$queryRaw(Prisma.raw(sql0));
       tRet.forEach((col, i) => {
          var tObj = { ...col };
          tArray.push(tObj);
       });
       */

            if (args.data.FACTORY_CD === 'BVT' && args.data.IS_SAMPLE !== '1') {
                let sql0 = `
                    select
                        USER_ID,
                        min(BOOK_DATE) as BOOK_DATE
                    from
                        ksv_capabook_mst
                    where
                        status_cd = '0'
                        and user_id in (
                            select
                                cd_code
                            from
                                kcd_code
                            where
                                cd_group = 'capa_user'
                                and cd_flag = '1'
                        )
                    group by
                        user_id
                `;
                const tRet = await prisma.$queryRaw(Prisma.raw(sql0));
                tRet.forEach((col, i) => {
                    var tObj = { ...col };
                    tObj.KIND = 'BVT_MST';
                    // tObj.BOOK_DATE = tRetDate1;
                    tArray.push(tObj);
                });
            }
            if (args.data.FACTORY_CD === 'ETP' && args.data.IS_SAMPLE !== '1') {
                let sql0 = `
                    select
                        USER_ID,
                        min(BOOK_DATE) as BOOK_DATE
                    from
                        ksv_capabook_mst_ethiopia
                    where
                        status_cd = '0'
                        and user_id in (
                            select
                                cd_code
                            from
                                kcd_code
                            where
                                cd_group = 'capa_user'
                                and cd_flag = '1'
                        )
                    group by
                        user_id
                `;
                const tRet = await prisma.$queryRaw(Prisma.raw(sql0));
                tRet.forEach((col, i) => {
                    var tObj = { ...col };
                    tObj.KIND = 'ETP_MST';
                    // tObj.BOOK_DATE = tRetDate1;
                    tArray.push(tObj);
                });
            }

            if (args.data.FACTORY_CD === 'BVT' && args.data.IS_SAMPLE === '1') {
                let sql0 = `
                    select
                        USER_ID,
                        min(BOOK_DATE) as BOOK_DATE
                    from
                        ksv_capasample_mst
                    where
                        status_cd = '0'
                        and user_id in (
                            select
                                cd_code
                            from
                                kcd_code
                            where
                                cd_group = 'capa_user'
                                and cd_flag = '1'
                        )
                    group by
                        user_id
                `;
                const tRet = await prisma.$queryRaw(Prisma.raw(sql0));
                tRet.forEach((col, i) => {
                    var tObj = { ...col };
                    tObj.KIND = 'BVT_SAMPLE';
                    // tObj.BOOK_DATE = tRetDate1;
                    tArray.push(tObj);
                });
            }

            if (args.data.FACTORY_CD === 'ETP' && args.data.IS_SAMPLE === '1') {
                let sql0 = `
                    select
                        USER_ID,
                        min(BOOK_DATE) as BOOK_DATE
                    from
                        ksv_capasample_mst_ethiopia
                    where
                        status_cd = '0'
                        and user_id in (
                            select
                                cd_code
                            from
                                kcd_code
                            where
                                cd_group = 'capa_user'
                                and cd_flag = '1'
                        )
                    group by
                        user_id
                `;
                const tRet = await prisma.$queryRaw(Prisma.raw(sql0));
                tRet.forEach((col, i) => {
                    var tObj = { ...col };
                    tObj.KIND = 'ETP_SAMPLE';
                    // tObj.BOOK_DATE = tRetDate1;
                    tArray.push(tObj);
                });
            }

            return tArray;
        },

        mgrQuery_S0209_ALL_LIST_bak1: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tArray = [];

            if (args.data.FACTORY_CD === 'BVT' && args.data.IS_SAMPLE !== '1') {
                let sql0 = `
                    select
                        USER_ID,
                        max(BOOK_DATE) as BOOK_DATE
                    from
                        ksv_capabook_mst
                    where
                        status_cd = '1'
                        and user_id in (
                            select
                                cd_code
                            from
                                kcd_code
                            where
                                cd_group = 'capa_user'
                                and cd_flag = '1'
                        )
                    group by
                        user_id
                `;
                const tRet = await prisma.$queryRaw(Prisma.raw(sql0));
                tRet.forEach((col, i) => {
                    var tObj = { ...col };
                    tObj.KIND = 'BVT_MST';
                    // tObj.BOOK_DATE = tRetDate1;
                    tArray.push(tObj);
                });
            }
            if (args.data.FACTORY_CD === 'ETP' && args.data.IS_SAMPLE !== '1') {
                let sql0 = `
                    select
                        USER_ID,
                        max(BOOK_DATE) as BOOK_DATE
                    from
                        ksv_capabook_mst_ethiopia
                    where
                        status_cd = '1'
                        and user_id in (
                            select
                                cd_code
                            from
                                kcd_code
                            where
                                cd_group = 'capa_user'
                                and cd_flag = '1'
                        )
                    group by
                        user_id
                `;
                const tRet = await prisma.$queryRaw(Prisma.raw(sql0));
                tRet.forEach((col, i) => {
                    var tObj = { ...col };
                    tObj.KIND = 'ETP_MST';
                    // tObj.BOOK_DATE = tRetDate1;
                    tArray.push(tObj);
                });
            }

            if (args.data.FACTORY_CD === 'BVT' && args.data.IS_SAMPLE === '1') {
                let sql0 = `
                    select
                        USER_ID,
                        max(BOOK_DATE) as BOOK_DATE
                    from
                        ksv_capasample_mst
                    where
                        status_cd = '1'
                        and user_id in (
                            select
                                cd_code
                            from
                                kcd_code
                            where
                                cd_group = 'capa_user'
                                and cd_flag = '1'
                        )
                    group by
                        user_id
                `;
                const tRet = await prisma.$queryRaw(Prisma.raw(sql0));
                tRet.forEach((col, i) => {
                    var tObj = { ...col };
                    tObj.KIND = 'BVT_SAMPLE';
                    // tObj.BOOK_DATE = tRetDate1;
                    tArray.push(tObj);
                });
            }

            if (args.data.FACTORY_CD === 'ETP' && args.data.IS_SAMPLE === '1') {
                let sql0 = `
                    select
                        USER_ID,
                        max(BOOK_DATE) as BOOK_DATE
                    from
                        ksv_capasample_mst_ethiopia
                    where
                        status_cd = '1'
                        and user_id in (
                            select
                                cd_code
                            from
                                kcd_code
                            where
                                cd_group = 'capa_user'
                                and cd_flag = '1'
                        )
                    group by
                        user_id
                `;
                const tRet = await prisma.$queryRaw(Prisma.raw(sql0));
                tRet.forEach((col, i) => {
                    var tObj = { ...col };
                    tObj.KIND = 'ETP_SAMPLE';
                    // tObj.BOOK_DATE = tRetDate1;
                    tArray.push(tObj);
                });
            }

            return tArray;
        },
    },
};

export default moduleQuery_S0209_CAPABOOK_LIST_BVT_TBL_KSV_CAPABOOK_MEM;
