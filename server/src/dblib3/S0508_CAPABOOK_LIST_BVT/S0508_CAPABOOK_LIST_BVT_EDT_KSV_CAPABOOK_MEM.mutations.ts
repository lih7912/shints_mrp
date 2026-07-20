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
const moduleMutation_S0508_CAPABOOK_LIST_BVT_EDT_KSV_CAPABOOK_MEM = {
    Mutation: {
        mgrUpdate_S0508_5_END_PRODUCTION: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            //

            var tSQLArray = [];
            var retArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var tData = args.datas[tIdx];

                let sqlCheck = `
                    select
                        K.PO_CD,
                        K.ORDER_CD,
                        K.MATL_CD,
                        '' as PU_CD,
                        0 as PO_QTY2,
                        K.PO_QTY,
                        K.PO_QTY as MRP_QTY,
                        K.PO_SEQ,
                        isnull(K1.STSIN_IN_QTY, 0) as IN_QTY,
                        isnull(K2.STSOUT_OUT_QTY, 0) as OUT_QTY,
                        isnull(K3.FACIN_IN_QTY, 0) as INFAC_QTY,
                        isnull(K4.FACOUT_OUT_QTY, 0) as OUTFAC_QTY,
                        a3.MATL_NAME,
                        a5.VENDOR_NAME,
                        a3.COLOR,
                        a3.SPEC,
                        a3.UNIT,
                        a4.CURR_CD,
                        a4.MATL_PRICE as MASTER_PRICE,
                        '0' as OUTFAC_QTY2,
                        '0' as BAL_QTY,
                        '' as REMARK
                    from
                        (
                            select
                                PO_CD,
                                ORDER_CD,
                                MATL_CD,
                                sum(PO_QTY) as PO_QTY,
                                max(PO_SEQ) as PO_SEQ
                            from
                                ksv_po_mrp
                            where
                                po_cd = '${tData.PO_CD}'
                                and order_cd = '${tData.ORDER_CD}'
                            group by
                                PO_CD,
                                ORDER_CD,
                                MATL_CD
                        ) K
                        left join (
                            select
                                PO_CD,
                                ORDER_CD,
                                MATL_CD,
                                sum(IN_QTY) as STSIN_IN_QTY,
                                sum(OUT_QTY) as STSIN_OUT_QTY
                            from
                                ksv_stock_in
                            where
                                po_cd = '${tData.PO_CD}'
                                and order_cd = '${tData.ORDER_CD}'
                            group by
                                PO_CD,
                                ORDER_CD,
                                MATL_CD
                        ) K1 on K1.PO_CD = K.PO_CD
                        and k1.ORDER_CD = k.ORDER_CD
                        and k1.MATL_CD = k.MATL_CD
                        left join (
                            select
                                PO_CD,
                                ORDER_CD,
                                MATL_CD,
                                sum(OUT_QTY) as STSOUT_OUT_QTY
                            from
                                ksv_stock_out
                            where
                                po_cd = '${tData.PO_CD}'
                                and order_cd = '${tData.ORDER_CD}'
                            group by
                                PO_CD,
                                ORDER_CD,
                                MATL_CD
                        ) K2 on K2.PO_CD = K.PO_CD
                        and k2.ORDER_CD = k.ORDER_CD
                        and k2.MATL_CD = k.MATL_CD
                        left join (
                            select
                                PO_CD,
                                ORDER_CD,
                                MATL_CD,
                                sum(IN_QTY) as FACIN_IN_QTY
                            from
                                ksv_stock_facin_order
                                -- from ksv_stock_facin
                            where
                                po_cd = '${tData.PO_CD}'
                                and order_cd = '${tData.ORDER_CD}'
                            group by
                                PO_CD,
                                ORDER_CD,
                                MATL_CD
                        ) K3 on K3.PO_CD = K.PO_CD
                        and k3.ORDER_CD = k.ORDER_CD
                        and k3.MATL_CD = k.MATL_CD
                        left join (
                            select
                                PO_CD,
                                ORDER_CD,
                                MATL_CD,
                                sum(OUT_QTY) as FACOUT_OUT_QTY
                            from
                                ksv_stock_facout
                            where
                                po_cd = '${tData.PO_CD}'
                                and order_cd = '${tData.ORDER_CD}'
                            group by
                                PO_CD,
                                ORDER_CD,
                                MATL_CD
                        ) K4 on K4.PO_CD = K.PO_CD
                        and k4.ORDER_CD = k.ORDER_CD
                        and k4.MATL_CD = k.MATL_CD,
                        kcd_matl_mst a3,
                        kcd_matl_mem a4,
                        kcd_vendor a5
                    where
                        K.MATL_CD = a3.matl_cd
                        and K.PO_QTY > 0
                        and K.MATL_CD = a4.matl_cd
                        and a4.matl_seq = (
                            select
                                max(matl_seq)
                            from
                                kcd_matl_mem
                            where
                                matl_cd = K.matl_cd
                        )
                        and a3.VENDOR_CD = a5.VENDOR_CD
                    order by
                        K3.FACIN_IN_QTY desc
                `;
                const retCheck = await prisma.$queryRaw(Prisma.raw(sqlCheck));
                var tCheckIn = 0;
                retCheck.forEach((col, i) => {
                    if (
                        parseFloat(col.IN_QTY) <= 0 ||
                        parseFloat(col.OUT_QTY) <= 0 ||
                        parseFloat(col.INFAC_QTY) <= 0
                    ) {
                        tCheckIn = 1;
                    }
                });
                /*
        if (tCheckIn === 1) {
            var tRetArray = [];
            var tObj = {};
            tObj.CODE = `ERROR:Production End:완료되지 않은 STSIN, STSOUT, FACIN이 있습니다`;
            tObj.id = 0; 
            tRetArray.push(tObj);
            return (tRetArray);
        }
        */

                let tSQL99 = `
                    update ksv_order_mst
                    set
                        end_production = '1',
                        end_production_date = '${tData.FINISH_DATE}'
                    where
                        order_cd = '${tData.ORDER_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                /*
        var tTableName = '';
        if (tData.FACTORY_CD === 'BVT') {
            if (tData.IS_SAMPLE === '1') tTableName = 'ksv_capasample_mem';
            else  tTableName = 'ksv_capabook_mem';
        }
        if (tData.FACTORY_CD === 'ETP') {
            if (tData.IS_SAMPLE === '1') tTableName = 'ksv_capasample_mem_ethiopia';
            else  tTableName = 'ksv_capabook_mem_ethiopia';
        }

        let tSQL99 = `
            update ${tTableName}
            set
                send_flag = job_cd,
                job_cd = 'E'
            where
                book_date = '${tData.BOOK_DATE}'
                -- and    user_id = '${tData.USER_ID}'
                and order_cd = '${tData.ORDER_CD}'
        `;
        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
        tSQLArray.push(tSQL99_1);

        let sql0 = `
            select distinct
                a.nat_cd,
                a.factory_cd,
                b.prod_cd,
                c.size_group,
                c.size_member
            from
                ksv_order_mst a,
                ksv_order_mem b,
                kcd_size_mst c
            where
                a.order_cd = '${tData.ORDER_CD}'
                and a.order_cd = b.order_cd
                and a.size_group = c.size_group
        `;
        const tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));

        var tIdx0 = 0;
        for (tIdx0 = 0; tIdx0 < tRet0.length; tIdx0 ++) {

            var tOne = { ...tRet0[tIdx0] };

            let sql1 = `
                select
                    prod_cd,
                    size_cnt
                from
                    ksv_order_mem
                where
                    order_cd = '${tData.ORDER_CD}'
                    and prod_cd = '${tOne.prod_cd}'
            `;
            const tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));

            var tSizeArray = [];
            var tCols = tOne.size_member.split(',');
            tCols.forEach((col, i) => {
                var tObj = {};
                tObj.size_val = col;
                tObj.size_cnt = 0; 
                tObj.size_seq = i+1; 
                tSizeArray.push(tObj);
            });

            var tIdx1 = 0;
            for (tIdx1 = 0; tIdx1 < tRet1.length; tIdx1 ++) {
                var tOne1 = { ...tRet1[tIdx1] };

                var tFindObj = {};
                args.datas1.forEach((col, i) => {
                    if (col.PROD_CD === tOne1.prod_cd) {
                        tFindObj = { ...col }; 
                    }
                });

                if (typeof tFindObj.END_SIZE_CNT !== 'undefined') {
                    let tSQL99 = `
                        update ksv_order_mem
                        set
                            end_size_cnt = '${tFindObj.END_SIZE_CNT}'
                        where
                            order_cd = '${tData.ORDER_CD}'
                            and prod_cd = '${tOne1.prod_cd}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                } 

                var tTmpArray = [ ...tSizeArray ]; 
                tTmpArray.forEach((col, i) => {
                    col.size_cnt += parseInt(tOne1.size_cnt.substring(i * 6, (i+1) *6));
                    tSizeArray[i] = { ...col };
                });
            }

            var tIdx2 = 0; 
            for (tIdx2 = 0; tIdx2 < tSizeArray.length; tIdx2 ++) {
                var tOne2 = { ...tSizeArray[tIdx2] };
                var tInObj = {};
                tInObj.order_cd = tData.ORDER_CD;
                tInObj.prod_cd  = tOne.prod_cd;
                tInObj.end_date  = tData.FINISH_DATE;
                tInObj.size  = tOne2.size_val;
                tInObj.ct_from = '';
                tInObj.ct_to = '';
                tInObj.size_seq = tOne2.size_seq;
                tInObj.end_cnt = tOne2.size_cnt;
                tInObj.nat_cd = tOne.nat_cd;
                tInObj.status_cd = '0';
                tInObj.reg_user = tUserInfo.USER_ID;
                tInObj.reg_datetime = tRetDate;
                tInObj.net_weight = '0';
                tInObj.gross_weight = '0';
                tInObj.cbm = '0';
                let tSQL99 = AFLib.createTableSql('SSV_ORDER_END', tInObj);
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            }
        }
        */
            }

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'SUCCEED:Production End';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = `ERROR:Production End:${e.message}`;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },

        mgrUpdate_S0508_5_END_CANCEL: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            //

            var tSQLArray = [];
            var retArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var tData = args.datas[tIdx];
                let sql0_1 = `
                    select
                        *
                    from
                        ksv_order_mst
                    where
                        order_cd = '${tData.ORDER_CD}'
                `;
                const tRet0_1 = await prisma.$queryRaw(Prisma.raw(sql0_1));
                if (tRet0_1.length > 0) {
                    if (parseInt(tRet0_1[0].ORDER_STATUS) >= 8) {
                        var tRetArray = [];
                        var tObj = {};
                        tObj.CODE = `ERROR:Production End Cancel:Not End Process for Ending process Order`;
                        tObj.id = 0;
                        tRetArray.push(tObj);
                        return tRetArray;
                    }
                } else {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = `ERROR:Production End Cancel:Check Order Exist`;
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }

                let tSQL99 = `
                    update ksv_order_mst
                    set
                        end_production = '0',
                        end_production_date = ''
                    where
                        order_cd = '${tData.ORDER_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                /*
        let tSQL99 = `
            update ksv_order_mem
            set
                end_size_cnt = ''
            where
                order_cd = '${tData.ORDER_CD}'
        `;
        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
        tSQLArray.push(tSQL99_1);

        let tSQL99 = `
            delete from ssv_order_end
            where
                order_cd = '${tData.ORDER_CD}'
        `;
        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
        tSQLArray.push(tSQL99_1);

        var tTableName = '';
        if (tData.FACTORY_CD === 'BVT') {
            if (tData.IS_SAMPLE === '1') tTableName = 'ksv_capasample_mem';
            else  tTableName = 'ksv_capabook_mem';
        }
        if (tData.FACTORY_CD === 'ETP') {
            if (tData.IS_SAMPLE === '1') tTableName = 'ksv_capasample_mem_ethiopia';
            else  tTableName = 'ksv_capabook_mem_ethiopia';
        }

        // 임시로  send_datetime에 org job kind보관
        let tSQL99 = `
            update ${tTableName}
            set
                job_cd = send_flag,
                send_flag = ''
            where
                book_date = '${tData.BOOK_DATE}'
                -- and    user_id = '${tData.USER_ID}'
                and order_cd = '${tData.ORDER_CD}'
        `;
        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
        tSQLArray.push(tSQL99_1);
        */
            }

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'SUCCEED:Production End Cancel';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = `ERROR:Production End Cancel:${e.message}`;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },

        mgrInsert_S0508_CAPABOOK_LIST_BVT_EDT_KSV_CAPABOOK_MEM: async (
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

        mgrUpdate_S0508_CAPABOOK_LIST_BVT_EDT_KSV_CAPABOOK_MEM: async (
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

            var retArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var tData = args.datas[tIdx];
                var tObjEDT_KSV_CAPABOOK_MEM = { ...tData };

                var tTableName = '';
                if (tObjEDT_KSV_CAPABOOK_MEM.FACTORY_CD === 'BVT') {
                    if (tObjEDT_KSV_CAPABOOK_MEM.IS_SAMPLE === '1')
                        tTableName = 'ksv_capasample_mem';
                    else tTableName = 'ksv_capabook_mem';
                }

                if (tObjEDT_KSV_CAPABOOK_MEM.FACTORY_CD === 'ETP') {
                    if (tObjEDT_KSV_CAPABOOK_MEM.IS_SAMPLE === '1')
                        tTableName = 'KSV_CAPASAMPLE_MEM_ETHIOPIA';
                    else tTableName = 'KSV_CAPABOOK_MEM_ETHIOPIA';
                }

                var tSQL = `
                    UPDATE ${tTableName}
                    set
                        JOB_CD = '${tObjEDT_KSV_CAPABOOK_MEM.JOB_CD}'
                    WHERE
                        ORDER_CD = '${tObjEDT_KSV_CAPABOOK_MEM.ORDER_CD}'
                        AND BOOK_DATE = '${tObjEDT_KSV_CAPABOOK_MEM.BOOK_DATE}'
                `;
                var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));

                /*
        const retUpdate = await prisma.@@NAME@@.update({
           where: { id: tObj@@TNAME@@.id, },
           data: tObj@@TNAME@@, 
        });

        var tObj = {};
        tObj.CODE = retUpdate.FACTORY_CD;
        tObj.id = retUpdate.id;
        retArray.push(tObj);
*/
                var tObj = {};
                tObj.CODE = tObjEDT_KSV_CAPABOOK_MEM.ORDER_CD;
                tObj.id = 0;
                retArray.push(tObj);
            }
            return retArray;
        },

        mgrUpdate_S0508_CAPABOOK_LIST_BVT_CAPA_END: async (
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
            var tRetDate1 = tRetDate.substring(0, 8);

            // let tPO = "POA2022S672";

            //
            var tUserInfo = AFLib.getUserInfo(contextValue);
            var tInput1 = args.datas[0];

            if (parseFloat(tInput1.BOOK_DATE) >= parseFloat(tRetDate1)) {
                var tRetError = [];
                var tObj = {};
                tObj.CODE = `ERROR: Book Date great then current date`;
                tObj.id = 0;
                tRetError.push(tObj);
                return tRetError;
            }

            var tSQLArray = [];
            var tNewDateStr = '';

            var retArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var tData = args.datas[tIdx];
                var tObjEDT_KSV_CAPABOOK_MEM = { ...tData };

                var tYear0 = parseInt(
                    tObjEDT_KSV_CAPABOOK_MEM.BOOK_DATE.substring(0, 4),
                );
                var tMonth0 =
                    parseInt(
                        tObjEDT_KSV_CAPABOOK_MEM.BOOK_DATE.substring(4, 6),
                    ) - 1;
                var tDay0 = parseInt(
                    tObjEDT_KSV_CAPABOOK_MEM.BOOK_DATE.substring(6, 8),
                );
                var tBookDate = new Date(tYear0, tMonth0, tDay0);
                console.log('BOOK_DATE=>' + tBookDate);

                var tSaveBookDate = tBookDate;
                var tNewDate = tBookDate;
                tNewDateStr = tObjEDT_KSV_CAPABOOK_MEM.BOOK_DATE;
                while (parseFloat(tNewDateStr) < parseFloat(tRetDate1)) {
                    tNewDate.setDate(tSaveBookDate.getDate() + 7 * 1);
                    tSaveBookDate = tNewDate;
                    console.log('NEW_DATE=>' + tNewDate);
                    tNewDateStr = tNewDate.getFullYear().toString();
                    if (tNewDate.getMonth() + 1 < 10) {
                        tNewDateStr += '0' + (tNewDate.getMonth() + 1);
                    } else {
                        tNewDateStr += tNewDate.getMonth() + 1;
                    }
                    if (tNewDate.getDate() < 10) {
                        tNewDateStr += '0' + tNewDate.getDate();
                    } else {
                        tNewDateStr += tNewDate.getDate();
                    }
                }
                if (tNewDateStr === '') {
                    var tRetError = [];
                    var tObj = {};
                    tObj.CODE = `ERROR: can not get new date; ${tNewDateStr}`;
                    tObj.id = 0;
                    tRetError.push(tObj);
                    return tRetError;
                }
                console.log('NEW_DATE_STR=>' + tNewDateStr);

                var tTableName = '';
                var tTableNameMst = '';
                if (tObjEDT_KSV_CAPABOOK_MEM.FACTORY_CD === 'BVT') {
                    if (tObjEDT_KSV_CAPABOOK_MEM.IS_SAMPLE === '1') {
                        tTableName = 'ksv_capasample_mem';
                        tTableNameMst = 'ksv_capasample_mst';
                    } else {
                        tTableName = 'ksv_capabook_mem';
                        tTableNameMst = 'ksv_capabook_mst';
                    }
                }

                if (tObjEDT_KSV_CAPABOOK_MEM.FACTORY_CD === 'ETP') {
                    if (tObjEDT_KSV_CAPABOOK_MEM.IS_SAMPLE === '1') {
                        tTableName = 'KSV_CAPASAMPLE_MEM_ETHIOPIA';
                        tTableNameMst = 'KSV_CAPASAMPLE_MST_ETHIOPIA';
                    } else {
                        tTableName = 'KSV_CAPABOOK_MEM_ETHIOPIA';
                        tTableNameMst = 'KSV_CAPABOOK_MST_ETHIOPIA';
                    }
                }

                var tSQL0 = `
                    select
                        *
                    from
                        ${tTableName}
                    where
                        book_date = '${tNewDateStr}'
                        and user_id = '${tObjEDT_KSV_CAPABOOK_MEM.USER_NAME}'
                `;
                var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL0));
                if (nRet0.length > 0) {
                    var tRetError = [];
                    var tObj = {};
                    tObj.CODE = `ERROR: Aleady Data: ${tNewDateStr} / ${tObjEDT_KSV_CAPABOOK_MEM.USER_NAME}`;
                    tObj.id = 0;
                    tRetError.push(tObj);
                    return tRetError;
                }

                var tSQL = `
                    select
                        *
                    from
                        ${tTableName}
                    where
                        book_date = '${tObjEDT_KSV_CAPABOOK_MEM.BOOK_DATE}'
                        and user_id = '${tObjEDT_KSV_CAPABOOK_MEM.USER_NAME}'
                        and job_cd in ('I', '0', 'U')
                `;
                var nRet = await prisma.$queryRaw(Prisma.raw(tSQL));

                var tInsertCAPABOOK_MEM_ARRAY = nRet.map((col, i) => {
                    var tObj = { ...col };
                    delete tObj.id;
                    tObj.JOB_CD = '0';

                    if (tObjEDT_KSV_CAPABOOK_MEM.IS_SAMPLE === '0') {
                        if (col.JOB_CD === 'I') tObj.NR = 'NEW';
                        else {
                            if (tObjEDT_KSV_CAPABOOK_MEM.FACTORY_CD === 'BVT')
                                tObj.NR = 'VR';
                            else tObj.NR = 'ER';
                        }
                    }

                    tObj.BOOK_DATE = tNewDateStr;
                    return tObj;
                });

                tInsertCAPABOOK_MEM_ARRAY.forEach((col, i) => {
                    var col1 = { ...col };
                    col1.REMARK = col.REMARK.replace(/'/gi, '');
                    var tSQL99 = AFLib.createTableSql(tTableName, col1);
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                });

                var tInsertCAPABOOK_MST = {};
                tInsertCAPABOOK_MST.BOOK_DATE = tNewDateStr;
                tInsertCAPABOOK_MST.USER_ID =
                    tObjEDT_KSV_CAPABOOK_MEM.USER_NAME;
                tInsertCAPABOOK_MST.STATUS_CD = '0';
                tInsertCAPABOOK_MST.PLAN_FLAG = '0';
                tInsertCAPABOOK_MST.REG_USER = tUserInfo.USER_ID;
                tInsertCAPABOOK_MST.REG_DATETIME = tRetDate;

                var tSQL99 = AFLib.createTableSql(
                    tTableNameMst,
                    tInsertCAPABOOK_MST,
                );
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                var tSqlUpdate = `
                    update ${tTableNameMst}
                    set
                        status_cd = '1'
                    where
                        book_date = '${tObjEDT_KSV_CAPABOOK_MEM.BOOK_DATE}'
                        and user_id = '${tObjEDT_KSV_CAPABOOK_MEM.USER_NAME}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSqlUpdate));
                tSQLArray.push(tSQL99_1);

                try {
                    global.currentTransactionInfo = {
                        contextValue: contextValue,
                        functionName: AFLib.getFunctionName(),
                    };
                    await prisma.$transaction(tSQLArray);
                    delete global.currentTransactionInfo;
                } catch (e) {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = 'ERROR:CapaEnd';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED:' + tNewDateStr;
            tObj.id = 0;
            tRetArray.push(tObj);
            return tRetArray;
        },

        mgrUpdate_S0508_CAPABOOK_LIST_BVT_CAPA_END_CANCEL: async (
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

            //
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var retArray = [];
            var tSQLArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var tData = args.datas[tIdx];

                var tTableName = '';
                var tTableNameMst = '';
                if (tData.FACTORY_CD === 'BVT') {
                    if (tData.IS_SAMPLE === '1') {
                        tTableName = 'ksv_capasample_mem';
                        tTableNameMst = 'ksv_capasample_mst';
                    } else {
                        tTableName = 'ksv_capabook_mem';
                        tTableNameMst = 'ksv_capabook_mst';
                    }
                }

                if (tData.FACTORY_CD === 'ETP') {
                    if (tData.IS_SAMPLE === '1') {
                        tTableName = 'KSV_CAPASAMPLE_MEM_ETHIOPIA';
                        tTableNameMst = 'KSV_CAPASAMPLE_MST_ETHIOPIA';
                    } else {
                        tTableName = 'KSV_CAPABOOK_MEM_ETHIOPIA';
                        tTableNameMst = 'KSV_CAPABOOK_MST_ETHIOPIA';
                    }
                }

                var tSQL = `
                    select
                        top 1 *
                    from
                        ${tTableNameMst}
                    where
                        user_id = '${tData.USER_NAME}'
                        and status_cd = '0'
                    order by
                        book_date desc
                `;
                var nRet = await prisma.$queryRaw(Prisma.raw(tSQL));
                if (nRet.length <= 0) {
                    var tRetError = [];
                    var tObj = {};
                    tObj.CODE = `ERROR: Not Found Book Date`;
                    tObj.id = 0;
                    tRetError.push(tObj);
                    return tRetError;
                }
                var tBookDate = nRet[0].BOOK_DATE;

                var tSQL1 = `
                    select
                        top 1 *
                    from
                        ${tTableNameMst}
                    where
                        user_id = '${tData.USER_NAME}'
                        and status_cd = '1'
                    order by
                        book_date desc
                `;
                var nRet1 = await prisma.$queryRaw(Prisma.raw(tSQL1));
                if (nRet1.length <= 0) {
                    var tRetError = [];
                    var tObj = {};
                    tObj.CODE = `ERROR: Not Found Last Date`;
                    tObj.id = 0;
                    tRetError.push(tObj);
                    return tRetError;
                }
                var tLastDate = nRet1[0].BOOK_DATE;

                let tSQL99 = `
                    delete from ${tTableNameMst}
                    where
                        book_date = '${tBookDate}'
                        and user_id = '${tData.USER_NAME}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    delete from ${tTableName}
                    where
                        book_date = '${tBookDate}'
                        and user_id = '${tData.USER_NAME}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    update ${tTableNameMst}
                    set
                        status_cd = '0'
                    where
                        book_date = '${tLastDate}'
                        and user_id = '${tData.USER_NAME}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            }

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'SUCCESS:CapaEnd';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:CapaEnd';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },

        mgrDelete_S0508_CAPABOOK_LIST_BVT_EDT_KSV_CAPABOOK_MEM: async (
            _,
            args,
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
    },
};

export default moduleMutation_S0508_CAPABOOK_LIST_BVT_EDT_KSV_CAPABOOK_MEM;
