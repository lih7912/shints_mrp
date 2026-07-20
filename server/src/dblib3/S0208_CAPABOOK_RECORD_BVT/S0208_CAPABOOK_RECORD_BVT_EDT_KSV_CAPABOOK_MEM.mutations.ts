// MGR_@@TNAME@@.mutations.js

import * as fs from 'fs';
import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기

/*
                IN_DATE: String 
                STYLE_CD: String 
                STYLE_NAME: String 
                BUYER_CD: String 
                BUYER_CD: String 
                JOB_CD: String 
                PO_CD: String 
                ORDER_CD: String 
                FOB: String 
                QTY: String 
                NR: String 
                REMARK: String 
                MW: String 
                S_ETA: String 
                S_ETA: String 
                M_ETA: String 
                EXP_CMPT: String 
                BVT_KIND: String 
                TPR: String 
                EMBOSSING: String 
                WASHING: String 
                DL: String 
                S: String 
                FND: String 
                DOWN: String 
                CUT: String 
                EMBRO: String 
                TP: String 
                SP: String 
                LTHR: String 
                G: String 
                W: String 
                FTP: String 
                DTP: String 
                SD: String 
                NEGO_TYPE: String 
                LAZE: String 
                SEQ: String 

*/

// export default로 Mutation 내용 내보내기
const moduleMutation_S0208_CAPABOOK_RECORD_BVT_EDT_KSV_CAPABOOK_MEM = {
    Mutation: {
        mgrInsert_S0208_CAPABOOK_RECORD_BVT_EDT_KSV_CAPABOOK_MEM: async (
            _,
            args,
            contextValue,
        ) => {
            //
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
            var tYY = 'B' + yyyy.toString().substring(2) + '-';

            // let tPO = "POA2022S672";

            /*
      var tSQL = `
          SELECT
              max(A.SEQ) + 1 as max_seq
          FROM
              KSV_ORDER_MST A,
              KCD_STYLE B
          WHERE
              A.STYLE_CD = B.STYLE_CD
              and A.YY = ${tOneMst.YY}
              and B.BUYER_CD = '${tOneMst.BUYER_CD}'
      `;
      var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
      var tRet = nRet0[0];
      var tMaxSeq = tRet.max_seq;
*/

            var retArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var tData = args.datas[tIdx];
                var tObjEDT_KSV_CAPABOOK_MEM = { ...tData };
                delete tObjEDT_KSV_CAPABOOK_MEM.id;

                /*
        let retInsert = await prisma.EDT_KSV_CAPABOOK_MEM.create({data:tObj@@TNAME@@});
        if (typeof retInsert.id === 'undefined') {
          var tObj = {};
          tObj.CODE = 'ERROR';
          tObj.id = 0;
          retArray.push(tObj);
        } else {
          var tObj = {};
          tObj.CODE = retInsert.FACTORY_CD;
          tObj.id = retInsert.id;
          retArray.push(tObj);
        } 
*/
            }
            return retArray;
        },

        mgrUpdate_S0208_CAPABOOK_RECORD_BVT_EDT_KSV_CAPABOOK_MEM: async (
            _,
            args,
            contextValue,
        ) => {
            //
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
            var tYY = 'B' + yyyy.toString().substring(2) + '-';

            // let tPO = "POA2022S672";
            var tUserInfo = AFLib.getUserInfo(contextValue);
            var tSQLArray = [];

            var tInput = { ...args.datas };

            if (typeof tInput.M_ETA === 'undefined') {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR: M_ETA입력이 잘못되었습니다';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tTableName = '';
            if (tInput.FACTORY_CD === 'BVT') {
                if (tInput.IS_SAMPLE === '1') tTableName = 'ksv_capasample_mem';
                else tTableName = 'ksv_capabook_mem';
            }

            if (tInput.FACTORY_CD === 'ETP') {
                if (tInput.IS_SAMPLE === '1')
                    tTableName = 'KSV_CAPASAMPLE_MEM_ETHIOPIA';
                else tTableName = 'KSV_CAPABOOK_MEM_ETHIOPIA';
            }

            var retArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas1.length; tIdx++) {
                var tOrderCd = args.datas1[tIdx].ORDER_CD;

                var tChangeFlag = '';
                var changeStyleFlag = 0;
                var changeStyleObj = {}; 
                var sql0 = '';
                var tRet0 = [];
                var tOrgObj = {};
                if (tInput.IS_SAMPLE === '1') {
                    sql0 = `
                        select
                            a.job_cd,
                            '' as nr,
                            a.remark,
                            a.s_eta,
                            a.m_eta,
                            b.capa_m_eta,
                            a.style_cd as capa_style_cd,
                            b.style_cd as order_style_cd
                        from
                            ${tTableName} a,
                            ksv_order_mst b
                        where
                            a.order_cd = '${tOrderCd}'
                            and left(a.order_cd, 10) = b.order_cd
                            and a.book_date = '${tInput.BOOK_DATE}'
                            and a.user_id = '${tInput.USER_NAME}'
                    `;
                    tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                    tOrgObj = { ...tRet0[0] };
                    var tIdx66 =0;
                    for (tIdx66 = 0; tIdx66 < tRet0.length; tIdx66++) {
                        var col = { ...tRet0[tIdx66] };
                        if (
                            col.usage !== tInput.USAGE ||
                            col.remark !== tInput.REMARK ||
                            col.s_eta !== tInput.APPROVAl_DATE ||
                            col.m_eta !== tInput.EXF ||
                            col.capa_m_eta !== tInput.M_ETA
                        )
                            tChangeFlag = '1';

                        if (col.capa_style_cd !== col.order_style_cd) {
                            changeStyleFlag = 1; 
                            var sql100 = `
                                select * from kcd_style where style_cd = '${col.order_style_cd}'
                            `;
                            var ret100 = await prisma.$queryRaw(Prisma.raw(sql100));
                            if (ret100.length > 0) changeStyleObj = { ...ret100[0] };
                        }
                    }
                } else {
                    sql0 = `
                        select
                            a.job_cd,
                            a.nr,
                            a.remark,
                            a.s_eta,
                            a.m_eta,
                            b.capa_m_eta,
                            a.style_cd as capa_style_cd,
                            b.style_cd as order_style_cd
                        from
                            ${tTableName} a,
                            ksv_order_mst b
                        where
                            a.order_cd = '${tOrderCd}'
                            and left(a.order_cd, 10) = b.order_cd
                            and a.book_date = '${tInput.BOOK_DATE}'
                            and a.user_id = '${tInput.USER_NAME}'
                    `;
                    tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                    tOrgObj = { ...tRet0[0] };
                    var tIdx66 =0;
                    for (tIdx66 = 0; tIdx66 < tRet0.length; tIdx66++) {
                        var col = { ...tRet0[tIdx66] };
                        if (
                            col.remark !== tInput.REMARK ||
                            col.nr !== tInput.NR ||
                            col.s_eta !== tInput.APPROVAl_DATE ||
                            col.m_eta !== tInput.EXF ||
                            col.capa_m_eta !== tInput.M_ETA
                        )
                            tChangeFlag = '1';

                        if (col.capa_style_cd !== col.order_style_cd) {
                            changeStyleFlag = 1; 
                            var sql100 = `
                                select * from kcd_style where style_cd = '${col.order_style_cd}'
                            `;
                            var ret100 = await prisma.$queryRaw(Prisma.raw(sql100));
                            if (ret100.length > 0) changeStyleObj = { ...ret100[0] };
                        }
                    }
                }

                var tChange = tInput.JOB_CD;
                if (tChange === 'U' && (tChangeFlag === '1' || changeStyleFlag > 0)) {
                    var tChangeJobCd = '';
                    if (tOrgObj.job_cd === 'I') tChangeJobCd = 'I';
                    else if (tOrgObj.job_cd === '0') tChangeJobCd = 'U';
                    else if (tOrgObj.job_cd === 'U') tChangeJobCd = 'U';

                    var tSampleSql = '';
                    var tSampleSql1 = '';
                    var tSampleSql2 = '';
                    if (tInput.IS_SAMPLE === '1') {
                        tSampleSql = `                      USAGE = '${tInput.USAGE}',`;
                    } else {
                        tSampleSql = `                      NR = '${tInput.NR}',`;
                        tSampleSql1 = `                     FOB = '${tInput.FOB}',`;

                        if (!tInput.NR || !tInput.FOB) {
                            var tObj = {};
                            tObj.CODE = `ERROR: Capa Update Error.  NR, FOB값을 확인하세요. (${tInput.NR}/${tInput.FOB}) `;
                            tObj.id = 0;
                            tRetArray.push(tObj);
                            reutrn(tRetArray);
                        }
                    }
                    if (changeStyleFlag > 0) {
                        tSampleSql2 = `                     STYLE_CD = '${changeStyleObj.STYLE_CD}',`;
                        tSampleSql2 += `                    MW = '${changeStyleObj.MW}',`;
                        tSampleSql2 += `                    EMBRO = '${changeStyleObj.EMBRO}',`;
                        tSampleSql2 += `                    TP = '${changeStyleObj.TP}',`;
                        tSampleSql2 += `                    SP = '${changeStyleObj.SP}',`;
                        tSampleSql2 += `                    LTHR = '${changeStyleObj.LTHR}',`;
                        tSampleSql2 += `                    G = '${changeStyleObj.G}',`;
                        tSampleSql2 += `                    W = '${changeStyleObj.W}',`;
                        tSampleSql2 += `                    S = '${changeStyleObj.S}',`;
                        tSampleSql2 += `                    FND = '${changeStyleObj.FND}',`;
                        tSampleSql2 += `                    DL = '${changeStyleObj.DL}',`;
                        tSampleSql2 += `                    TPR = '${changeStyleObj.TPR}',`;
                        tSampleSql2 += `                    EMBOSSING = '${changeStyleObj.EMBOSSING}',`;
                        tSampleSql2 += `                    WASHING = '${changeStyleObj.WASHING}',`;
                        tSampleSql2 += `                    CUT = '${changeStyleObj.CUT}',`;
                        tSampleSql2 += `                    FTP = '${changeStyleObj.FTP}',`;
                        tSampleSql2 += `                    DTP = '${changeStyleObj.DTP}',`;
                        tSampleSql2 += `                    LAZE = '${changeStyleObj.LAZE}',`;
                    }

                    if (typeof tInput.PO_CD === 'undefined') tInput.PO_CD = '';
                    var tSQL = `
                        UPDATE ${tTableName}
                        set
                            ${tSampleSql} ${tSampleSql1} ${tSampleSql2} JOB_CD = '${tChangeJobCd}',
                            REMARK = '${tInput.REMARK}',
                            S_ETA = '${tInput.APPROVAL_DATE}',
                            M_ETA = '${tInput.M_ETA}',
                            SD = '${tInput.EXF}',
                            PO_CD = '${tInput.PO_CD}',
                            QTY = '${tInput.QTY}',
                            EXP_CMPT = '${tInput.EXP_CMPT}'
                        WHERE
                            ORDER_CD = '${tOrderCd}'
                            AND BOOK_DATE = '${tInput.BOOK_DATE}'
                    `;

                    var tSQL_1 = `
                        UPDATE ${tTableName}
                        set
                            JOB_CD = '${tChangeJobCd}', ${tSampleSql}
                            REMARK = '${tInput.REMARK}',
                            S_ETA = '${tInput.APPROVAL_DATE}',
                            M_ETA = '${tInput.M_ETA}',
                            SD = '${tInput.EXF}'
                        WHERE
                            ORDER_CD = '${tOrderCd}'
                            AND BOOK_DATE = '${tInput.BOOK_DATE}'
                    `;

                    if (args.datas1.length > 1) {
                        // Sel Update 처리
                        var nRet0 = prisma.$queryRaw(Prisma.raw(tSQL_1));
                        tSQLArray.push(nRet0);
                    }
                    if (args.datas1.length === 1) {
                        // 단일 Update 처리
                        var nRet0 = prisma.$queryRaw(Prisma.raw(tSQL));
                        tSQLArray.push(nRet0);
                    }

                    var tSQL = `
                        UPDATE ksv_order_mst
                        set
                            matl_due_date = '${tInput.M_ETA}',
                            capa_m_eta = '${tInput.M_ETA}',
                            due_date = '${tInput.EXF}'
                        WHERE
                            ORDER_CD = '${tOrderCd}'
                    `;
                    var nRet0 = prisma.$queryRaw(Prisma.raw(tSQL));
                    tSQLArray.push(nRet0);
                } else {
                    var tSQL = `
                        UPDATE ${tTableName}
                        set
                            JOB_CD = '${tChange}'
                        WHERE
                            ORDER_CD = '${tOrderCd}'
                            AND BOOK_DATE = '${tInput.BOOK_DATE}'
                    `;
                    var nRet0 = prisma.$queryRaw(Prisma.raw(tSQL));
                    tSQLArray.push(nRet0);
                }
            }

            var tRetArray = [];
            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
                var tObj = {};
                tObj.CODE = 'SUCCEED:Update Capa';
                tObj.id = 0;
                tRetArray.push(tObj);
            } catch (e) {
                var tObj = {};
                tObj.CODE = 'ERROR: Update Capa';
                tObj.id = 0;
                tRetArray.push(tObj);
            }

            return tRetArray;
        },

        mgrUpdate_S0208_CAPABOOK_RECORD_BVT_EDT_KSV_CAPABOOK_MEM_CANCEL: async (
            _,
            args,
            contextValue,
        ) => {
            //
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
            var tYY = 'B' + yyyy.toString().substring(2) + '-';

            // let tPO = "POA2022S672";
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tSQLArray = [];
            var tInput = { ...args.datas };

            var tTableName = '';
            var tTableNameMst = '';
            if (tInput.FACTORY_CD === 'BVT') {
                if (tInput.IS_SAMPLE === '1') {
                    tTableName = 'ksv_capasample_mem';
                    tTableNameMst = 'ksv_capasample_mst';
                } else {
                    tTableName = 'ksv_capabook_mem';
                    tTableNameMst = 'ksv_capabook_mst';
                }
            }

            if (tInput.FACTORY_CD === 'ETP') {
                if (tInput.IS_SAMPLE === '1') {
                    tTableName = 'KSV_CAPASAMPLE_MEM_ETHIOPIA';
                    tTableNameMst = 'KSV_CAPASAMPLE_MST_ETHIOPIA';
                } else {
                    tTableName = 'KSV_CAPABOOK_MEM_ETHIOPIA';
                    tTableNameMst = 'KSV_CAPABOOK_MST_ETHIOPIA';
                }
            }

            var retArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas1.length; tIdx++) {
                var tOrderCd = args.datas1[tIdx].ORDER_CD;

                var sql0 = `
                    select
                        a.job_cd
                    from
                        ${tTableName} a,
                        ksv_order_mst b
                    where
                        a.order_cd = '${tOrderCd}'
                        and left(a.order_cd, 10) = b.order_cd
                        and a.book_date = '${tInput.BOOK_DATE}'
                        and a.user_id = '${tInput.USER_NAME}'
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                var tJobCd = '';
                if (tRet0.length > 0) tJobCd = tRet0[0].job_cd;
                if (tJobCd !== tInput.JOB_CD) continue;
                if (tInput.JOB_CD === 'U') {


                    var sql1 = `
                        select
                            *
                        from
                            ${tTableName}
                        where
                            book_date = (
                                select
                                    max(book_date) as book_date
                                from
                                    ${tTableNameMst}
                                where
                                    book_date < '${tInput.BOOK_DATE}'
                                    -- and status_cd = '1'
                            )
                            and order_cd = '${tOrderCd}'
                            and user_id = '${tInput.USER_NAME}'
                    `;
                    var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));

                    var tSampleSql = '';
                    var tSampleSql1 = '';
                    if (tInput.IS_SAMPLE === '1') {
                        tSampleSql = `                      USAGE = '${tRet1[0].USAGE}',`;
                    } else {
                        tSampleSql = `                      NR = '${tRet1[0].NR}',`;
                        tSampleSql1 = `                     FOB = '${tRet1[0].FOB}',`;
                    }

                    if (tRet1.length > 0) {


                        console.log(`Before Info: ${tRet1[0].BOOK_DATE}, ${tRet1[0].ORDER_CD}`);
                        var tSQL = `
                            UPDATE ${tTableName}
                            set
                                JOB_CD = '0',
                                REMARK = '${tRet1[0].REMARK}',
                                S_ETA = '${tRet1[0].S_ETA}',
                                M_ETA = '${tRet1[0].M_ETA}',
                                SD = '${tRet1[0].SD}',
                                PO_CD = '${tRet1[0].PO_CD}',
                                QTY = '${tRet1[0].QTY}', ${tSampleSql} ${tSampleSql1}
                                EXP_CMPT = '${tRet1[0].EXP_CMPT}'
                            WHERE
                                ORDER_CD = '${tOrderCd}'
                                AND BOOK_DATE = '${tInput.BOOK_DATE}'
                        `;
                        var nRet0 = prisma.$queryRaw(Prisma.raw(tSQL));
                        tSQLArray.push(nRet0);
                    } else {
                        var tSQL = `
                            UPDATE ${tTableName}
                            set
                                JOB_CD = '0'
                            WHERE
                                ORDER_CD = '${tOrderCd}'
                                AND BOOK_DATE = '${tInput.BOOK_DATE}'
                        `;
                        var nRet0 = prisma.$queryRaw(Prisma.raw(tSQL));
                        tSQLArray.push(nRet0);
                    }
                }

                if (tInput.JOB_CD === 'D') {
                    var tSQL = `
                        UPDATE ${tTableName}
                        set
                            JOB_CD = '0'
                        WHERE
                            ORDER_CD = '${tOrderCd}'
                            AND BOOK_DATE = '${tInput.BOOK_DATE}'
                    `;
                    var nRet0 = prisma.$queryRaw(Prisma.raw(tSQL));
                    tSQLArray.push(nRet0);
                }

                if (tInput.JOB_CD === 'E') {
                    var tSQL = `
                        UPDATE ${tTableName}
                        set
                            JOB_CD = '0'
                        WHERE
                            ORDER_CD = '${tOrderCd}'
                            AND BOOK_DATE = '${tInput.BOOK_DATE}'
                    `;
                    var nRet0 = prisma.$queryRaw(Prisma.raw(tSQL));
                    tSQLArray.push(nRet0);
                }

                if (tInput.JOB_CD === 'I') {
                    var tSQL = `
                        delete from ${tTableName}
                        WHERE
                            ORDER_CD = '${tOrderCd}'
                            AND BOOK_DATE = '${tInput.BOOK_DATE}'
                    `;
                    var nRet0 = prisma.$queryRaw(Prisma.raw(tSQL));
                    tSQLArray.push(nRet0);
                }
            }

            var tRetArray = [];
            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
                var tObj = {};
                tObj.CODE = 'SUCCEED:Cancel Capa';
                tObj.id = 0;
                tRetArray.push(tObj);
            } catch (e) {
                var tObj = {};
                tObj.CODE = 'ERROR:Cancel Capa';
                tObj.id = 0;
                tRetArray.push(tObj);
            }

            return tRetArray;
        },

        mgrDelete_S0208_CAPABOOK_RECORD_BVT_EDT_KSV_CAPABOOK_MEM: async (
            _,
            args,
            contextValue,
        ) => {
            //
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
            var tYY = 'B' + yyyy.toString().substring(2) + '-';

            // let tPO = "POA2022S672";

            var tUserInfo = AFLib.getUserInfo(contextValue);

            var retArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var tData = args.datas[tIdx];
                var tObjEDT_KSV_CAPABOOK_MEM = { ...tData };

                /*
        const retDelete = await prisma.@@TNAME@@.delete({
           where: { id: tObj@@TNAME@@.id, },
        });

        var tObj = {};
        tObj.CODE = tObj@@TNAME@@.id;
        retArray.push(tObj);
*/
            }
            return retArray;
        },

        mgrUpdate_S0208_CAPA_REFRESH: async (_, args, contextValue) => {
            //
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
            var tYY = 'B' + yyyy.toString().substring(2) + '-';

            // let tPO = "POA2022S672";
            var tUserInfo = AFLib.getUserInfo(contextValue);
            var tSQLArray = [];

            var tInput = { ...args.datas };

            var tTableName = '';
            if (tInput.FACTORY_CD === 'BVT') {
                if (tInput.IS_SAMPLE === '1') tTableName = 'ksv_capasample_mem';
                else tTableName = 'ksv_capabook_mem';
            }

            if (tInput.FACTORY_CD === 'ETP') {
                if (tInput.IS_SAMPLE === '1')
                    tTableName = 'KSV_CAPASAMPLE_MEM_ETHIOPIA';
                else tTableName = 'KSV_CAPABOOK_MEM_ETHIOPIA';
            }

            var retArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas1.length; tIdx++) {
                var tOrderCd = args.datas1[tIdx].ORDER_CD;

                var sqlOrder = `
                    select
                        *
                    from
                        ksv_order_mst
                    where
                        order_cd = '${tOrderCd}'
                `;
                var retOrder = await prisma.$queryRaw(Prisma.raw(sqlOrder));
                var objOrder = {};
                if (retOrder.length > 0) objOrder = { ...retOrder[0] };
                else {
                    var tObj = {};
                    tObj.CODE = `ERROR: Refresh Capa: 없는 Order입니다`;
                    tObj.id = 0;
                    tRetArray.push(tObj);
                }

                var sqlStyle = `
                    select
                        *
                    from
                        kcd_style
                    where
                        style_cd = '${objOrder.STYLE_CD}'
                `;
                var retStyle = await prisma.$queryRaw(Prisma.raw(sqlStyle));
                var objStyle = {};
                if (retStyle.length > 0) objStyle = { ...retStyle[0] };

                var sqlCapa = `
                    select
                        *
                    from
                        ${tTableName}
                    where
                        order_cd = '${objOrder.ORDER_CD}'
                        and book_date in (
                            select
                                max(book_date)
                            from
                                ${tTableName}
                            where
                                order_cd = '${objOrder.ORDER_CD}'
                        )
                `;
                var retCapa = await prisma.$queryRaw(Prisma.raw(sqlCapa));
                var objCapa = {};
                if (retCapa.length > 0) objCapa = { ...retCapa[0] };
                else {
                    var tObj = {};
                    tObj.CODE = `ERROR: Refresh Capa: 없는 Capa입니다`;
                    tObj.id = 0;
                    tRetArray.push(tObj);
                }
                console.log(objCapa);

                if (objCapa.JOB_CD === 'D' || objCapa.JOB_CD === 'E') continue;

                var sql5 = `
                    select
                        a1.size_cnt,
                        a2.color,
                        a4.size_member
                    from
                        ksv_order_mst a3,
                        ksv_order_mem a1,
                        ksv_prod_mst a2,
                        kcd_size_mst a4
                    where
                        left(a3.order_cd, 10) = '${objOrder.ORDER_CD}'
                        and a3.order_cd = a1.order_cd
                        and a1.prod_cd = a2.prod_cd
                        and a3.size_group = a4.size_group
                `;
                var nRet5 = await prisma.$queryRaw(Prisma.raw(sql5));
                var tInput3 = nRet5[0];

                var tCOLOR = tInput3.color;
                var tSIZE = '';
                var tSizes = tInput3.size_member.split(',');
                tSizes.forEach((col, i) => {
                    var tQty = parseInt(tInput3.size_cnt.substring(i * 6, 6));
                    if (tQty > 0) tSIZE = tSIZE + `${col}(${tQty}),`;
                });

                var tQTY = objOrder.TOT_CNT;
                var tFOB = objOrder.AVR_PRICE;
                var tPO_CD = '';
                var sql101 = `
                    select
                        po_cd
                    from
                        ksv_po_mem
                    where
                        order_cd = '${objOrder.ORDER_CD}'
                        and po_seq = 1
                `;
                var tRet101 = await prisma.$queryRaw(Prisma.raw(sql101));
                if (tRet101.length > 0) tPO_CD = tRet101[0].po_cd;

                var tUpdateObj = {};
                var tSaveJobCd = objCapa.JOB_CD;
                var tUpdateChk = 0;
                if (1) {
                    if (tInput.IS_SAMPLE === '1') {
                        if (parseFloat(objCapa.QTY) !== parseFloat(tQTY)) {
                            tUpdateObj.qty = tQTY;
                            tUpdateChk = 1;
                        }
                        if (parseFloat(objCapa.COLOR) !== tCOLOR) {
                            tUpdateObj.color = tCOLOR;
                            tUpdateChk = 1;
                        }
                        if (objCapa.USE_SIZE !== tSIZE) {
                            tUpdateObj.use_size = tSIZE;
                            tUpdateChk = 1;
                        }
                    } else {
                        if (parseFloat(objCapa.QTY) !== parseFloat(tQTY)) {
                            tUpdateObj.qty = tQTY;
                            tUpdateChk = 1;
                        }
                    }
                    if (objCapa.PO_CD !== tPO_CD) {
                        tUpdateObj.po_cd = tPO_CD;
                        tUpdateChk = 1;
                    }
                    if (objCapa.MW !== objStyle.MW) {
                        tUpdateObj.mw = objStyle.MW;
                        tUpdateChk = 1;
                    }
                    if (objCapa.EMBRO !== objStyle.EMBRO) {
                        tUpdateObj.embro = objStyle.EMBRO;
                        tUpdateChk = 1;
                    }
                    if (objCapa.TP !== objStyle.TP) {
                        tUpdateObj.tp = objStyle.TP;
                        tUpdateChk = 1;
                    }
                    if (objCapa.SP !== objStyle.SP) {
                        tUpdateObj.sp = objStyle.SP;
                        tUpdateChk = 1;
                    }
                    if (objCapa.LTHR !== objStyle.LTHR) {
                        tUpdateObj.lthr = objStyle.LTHR;
                        tUpdateChk = 1;
                    }
                    if (objCapa.G !== objStyle.G) {
                        tUpdateObj.g = objStyle.G;
                        tUpdateChk = 1;
                    }
                    if (objCapa.W !== objStyle.W) {
                        tUpdateObj.w = objStyle.W;
                        tUpdateChk = 1;
                    }
                    if (objCapa.S !== objStyle.S) {
                        tUpdateObj.s = objStyle.S;
                        tUpdateChk = 1;
                    }
                    if (objCapa.FND !== objStyle.FND) {
                        tUpdateObj.fnd = objStyle.FND;
                        tUpdateChk = 1;
                    }
                    if (objCapa.DL !== objStyle.DL) {
                        tUpdateObj.dl = objStyle.DL;
                        tUpdateChk = 1;
                    }
                    if (objCapa.TPR !== objStyle.TPR) {
                        tUpdateObj.tpr = objStyle.TPR;
                        tUpdateChk = 1;
                    }
                    if (objCapa.EMBOSSING !== objStyle.EMBOSSING) {
                        tUpdateObj.embossing = objStyle.EMBOSSING;
                        tUpdateChk = 1;
                    }
                    if (objCapa.WASHING !== objStyle.WASHING) {
                        tUpdateObj.washing = objStyle.WASHING;
                        tUpdateChk = 1;
                    }
                    if (objCapa.CUT !== objStyle.CUT) {
                        tUpdateObj.cut = objStyle.CUT;
                        tUpdateChk = 1;
                    }
                    if (objCapa.FTP !== objStyle.FTP) {
                        tUpdateObj.ftp = objStyle.FTP;
                        tUpdateChk = 1;
                    }
                    if (objCapa.DTP !== objStyle.DTP) {
                        tUpdateObj.dtp = objStyle.DTP;
                        tUpdateChk = 1;
                    }
                    if (objCapa.LAZE !== objStyle.LAZE) {
                        tUpdateObj.laze = objStyle.LAZE;
                        tUpdateChk = 1;
                    }
                    if (objCapa.KIND !== objStyle.KIND) {
                        tUpdateObj.kind = objStyle.KIND;
                        tUpdateChk = 1;
                    }
                    if (objCapa.BVT_KIND !== objStyle.BVT_KIND) {
                        tUpdateObj.bvt_kind = objStyle.BVT_KIND;
                        tUpdateChk = 1;
                    }

                    if (tUpdateChk !== 1) continue;

                    if (tSaveJobCd === 'I') tUpdateObj.job_cd = 'I';
                    else if (tSaveJobCd === '0') tUpdateObj.job_cd = 'U';
                    else if (tSaveJobCd === 'U') tUpdateObj.job_cd = 'U';
                    else continue;

                    let tSQL99 = AFLib.updateTableSql(tTableName, tUpdateObj);
                    tSQL99 += ` where order_cd = '${objOrder.ORDER_CD}' `;
                    tSQL99 += `
                        and book_date in (
                            select
                                max(book_date)
                            from
                                ${tTableName}
                            where
                                order_cd = '${objOrder.ORDER_CD}'
                        )
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }
            }

            var tRetArray = [];
            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
                var tObj = {};
                tObj.CODE = 'SUCCEED:Sel Refresh Capa';
                tObj.id = 0;
                tRetArray.push(tObj);
            } catch (e) {
                var tObj = {};
                tObj.CODE = 'ERROR: Sel Refresh Capa';
                tObj.id = 0;
                tRetArray.push(tObj);
            }

            return tRetArray;
        },
    },
};

export default moduleMutation_S0208_CAPABOOK_RECORD_BVT_EDT_KSV_CAPABOOK_MEM;
