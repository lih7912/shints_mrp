// MGR_@@TNAME@@.mutations.js

import * as fs from 'fs';
import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib2 from '../../po_adjust'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기

// export default로 Mutation 내용 내보내기
const moduleMutation_S0305_3 = {
    Mutation: {
        mgrInsert_S0305_MAKE_ORDER_MRP: async (_, args, contextValue) => {
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
            var tRetDate1 = yyyy.toString() + mm_str + dd_str;
            var tYY = 'B' + yyyy.toString().substring(2) + '-';

            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInputObj = args.datas;
            if (!tInputObj.ORDER_CD) tInputObj.ORDER_CD = '';

            var sqlIn = '';
            var tCols = tInputObj.ORDER_CD.split('/');
            tCols.forEach((col, i) => {
                if (col !== '') {
                    if (sqlIn === '') sqlIn = `'${col}'`;
                    else sqlIn = `,'${col}'`;
                }
            });
            var sqlOrderCd = '';
            if (sqlIn !== '') sqlOrderCd = `and order_cd in (${sqlIn})`;

            var sql0 = `
                select
                    order_cd
                from
                    ksv_po_mem
                where
                    po_cd = '${tInputObj.PO_CD}' ${sqlOrderCd}
            `;
            var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));

            // N+1 방지: order별 size 조회를 한 번에 가져온다.
            var sqlSizeAll = `
                select
                    a.order_cd,
                    b.size_val
                from
                    ksv_order_mst a,
                    kcd_size_mem b,
                    ksv_po_mem c
                where
                    c.po_cd = '${tInputObj.PO_CD}'
                    ${sqlOrderCd}
                    and a.order_cd = c.order_cd
                    and b.size_group = a.size_group
            `;
            var tRetSizeAll = await prisma.$queryRaw(Prisma.raw(sqlSizeAll));
            var sizeValsByOrder = {};
            var tIdxSize = 0;
            for (tIdxSize = 0; tIdxSize < tRetSizeAll.length; tIdxSize++) {
                var tSizeRow = tRetSizeAll[tIdxSize];
                var tSizeOrderCd = tSizeRow.order_cd;
                if (!sizeValsByOrder[tSizeOrderCd]) sizeValsByOrder[tSizeOrderCd] = [];
                sizeValsByOrder[tSizeOrderCd].push(tSizeRow);
            }

            var tSQLArray = [];

            // N+1 방지: 주문별 반복 DML을 PO 단위 일괄 처리로 전환
            let tSQLBulk01 = `
                delete from ksv_order_mrp
                where
                    order_cd in (
                        select
                            order_cd
                        from
                            ksv_po_mem
                        where
                            po_cd = '${tInputObj.PO_CD}' ${sqlOrderCd}
                    )
            `;
            const tSQLBulk01_1 = prisma.$queryRaw(Prisma.raw(tSQLBulk01));
            tSQLArray.push(tSQLBulk01_1);

            let tSQLBulk02 = `
                INSERT INTO
                    KSV_ORDER_MRP (
                        ORDER_CD,
                        PROD_CD,
                        ORDER_MRP_SEQ,
                        MATL_CD,
                        STD_NET,
                        STD_LOSS,
                        STD_GROSS,
                        NET,
                        LOSS,
                        GROSS,
                        REMARK,
                        USE_SIZE,
                        SEQ,
                        COUNTRY,
                        REG_USER,
                        REG_DATETIME
                    )
                select
                    a.order_cd,
                    a.prod_cd,
                    1,
                    b.MATL_CD,
                    b.STD_NET,
                    b.STD_LOSS,
                    b.STD_GROSS,
                    b.NET,
                    b.LOSS,
                    b.GROSS,
                    b.REMARK,
                    b.USE_SIZE,
                    b.SEQ,
                    b.COUNTRY,
                    '${tUserInfo.USER_ID}',
                    '${tRetDate}'
                from
                    ksv_order_mem a,
                    ksv_prod_mem b
                where
                    b.prod_cd = a.prod_cd
                    and a.add_flag = '0'
                    and a.order_cd in (
                        select
                            order_cd
                        from
                            ksv_po_mem
                        where
                            po_cd = '${tInputObj.PO_CD}' ${sqlOrderCd}
                    )
            `;
            const tSQLBulk02_1 = prisma.$queryRaw(Prisma.raw(tSQLBulk02));
            tSQLArray.push(tSQLBulk02_1);

            let tSQLBulk03 = `
                update ksv_order_mem
                set
                    size_loss = a.size_loss
                from
                    ksv_prod_mst a,
                    ksv_order_mem b,
                    ksv_po_mem c
                where
                    a.prod_cd = b.prod_cd
                    and c.order_cd = b.order_cd
                    and c.po_seq = '1'
                    and c.po_cd = '${tInputObj.PO_CD}' ${sqlOrderCd}
            `;
            const tSQLBulk03_1 = prisma.$queryRaw(Prisma.raw(tSQLBulk03));
            tSQLArray.push(tSQLBulk03_1);

            let tSQLBulk04 = `
                delete ksv_order_mrp_seqmax
                where
                    order_cd in (
                        select
                            order_cd
                        from
                            ksv_po_mem
                        where
                            po_cd = '${tInputObj.PO_CD}' ${sqlOrderCd}
                    )
            `;
            const tSQLBulk04_1 = prisma.$queryRaw(Prisma.raw(tSQLBulk04));
            tSQLArray.push(tSQLBulk04_1);

            let tSQLBulk05 = `
                insert into
                    ksv_order_mrp_seqmax
                select
                    '${tUserInfo.USER_ID}',
                    order_cd,
                    prod_cd,
                    max(order_mrp_seq)
                from
                    ksv_order_mrp
                where
                    order_cd in (
                        select
                            order_cd
                        from
                            ksv_po_mem
                        where
                            po_cd = '${tInputObj.PO_CD}' ${sqlOrderCd}
                    )
                group by
                    order_cd,
                    prod_cd
                order by
                    order_cd
            `;
            const tSQLBulk05_1 = prisma.$queryRaw(Prisma.raw(tSQLBulk05));
            tSQLArray.push(tSQLBulk05_1);

            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet0.length; tIdx++) {
                var tOrderCd = tRet0[tIdx].order_cd;

                var tRet1 = sizeValsByOrder[tOrderCd] || [];

                var tIdx9 = 0;
                for (tIdx9 = 0; tIdx9 < tRet1.length; tIdx9++) {
                    var tOne = { ...tRet1[tIdx9] };
                    if (tOne === 'XXL' || tOne === '2XL' || tOne === '2X') {
                        let tSQL99 = `
                            update ksv_order_mrp
                            set
                                use_size = '$tOne'
                            where
                                order_cd = '${tOrderCd}'
                                and use_size in ('XXL', '2XL', '2X')
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);
                    }
                    if (tOne === 'XXXL' || tOne === '3XL' || tOne === '3X') {
                        let tSQL99 = `
                            update ksv_order_mrp
                            set
                                use_size = '$tOne'
                            where
                                order_cd = '${tOrderCd}'
                                and use_size in ('XXXL', '3XL', '3X')
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);
                    }
                    if (tOne === 'XXXXL' || tOne === '4XL' || tOne === '4X') {
                        let tSQL99 = `
                            update ksv_order_mrp
                            set
                                use_size = '$tOne'
                            where
                                order_cd = '${tOrderCd}'
                                and use_size in ('XXXXL', '4XL', '4X')
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);
                    }
                    if (tOne === 'XXXXXL' || tOne === '5XL' || tOne === '5X') {
                        let tSQL99 = `
                            update ksv_order_mrp
                            set
                                use_size = '$tOne'
                            where
                                order_cd = '${tOrderCd}'
                                and use_size in ('XXXXXL', '5XL', '5X')
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);
                    }
                }
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
                tObj.CODE = 'SUCCEED:MakeOrderMrp:' + tInputObj.PO_CD;
                tObj.id = 0;
                tRetArray.push(tObj);
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:MakeOrderMrp';
                tObj.id = 0;
                tRetArray.push(tObj);
            }

            return tRetArray;
        },
        mgrInsert_S0305_ADJUST_LOSS: async (_, args, contextValue) => {
            var tUserInfo = AFLib.getUserInfo(contextValue);
            var tInputObj = args.datas;

            await AFLib2.CommonFunc.ResetOrderMrpSeqMax(
                tInputObj.PO_CD,
                tUserInfo.USER_ID,
                tInputObj.ORDER_CD,
            );

            var tLossFlag = '1';
            let sql0 = `
                select
                    isnull(loss_flag, '1') as loss_flag
                from
                    kcd_buyer
                where
                    buyer_cd = '${tInputObj.BUYER_CD}'
            `;
            var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            if (nRet0.length > 0) {
                tLossFlag = nRet0[0].loss_flag;
                if (tLossFlag === '') tLossFlag = '1';
            }

            // tLossFlag = '1';   // TEST

            var tOrderMrpSeq = '1';
            var tDbName = 'shints';

            let sql1 = `
                select
                    a.order_cd
                from
                    ksv_po_mem a
                where
                    a.po_cd = '${tInputObj.PO_CD}'
                    and a.po_seq = 1
            `;
            var nRet1 = await prisma.$queryRaw(Prisma.raw(sql1));

            // N+1 방지: order별 sample_flag를 한 번에 가져온다.
            let sqlSampleAll = `
                select
                    a.order_cd,
                    b.sample_flag
                from
                    ksv_po_mem a,
                    ksv_order_mst b
                where
                    a.po_cd = '${tInputObj.PO_CD}'
                    and a.po_seq = 1
                    and b.order_cd = a.order_cd
            `;
            var nRetSampleAll = await prisma.$queryRaw(Prisma.raw(sqlSampleAll));
            var sampleFlagByOrder = {};
            var tIdxSample = 0;
            for (tIdxSample = 0; tIdxSample < nRetSampleAll.length; tIdxSample++) {
                var tSampleRow = nRetSampleAll[tIdxSample];
                sampleFlagByOrder[tSampleRow.order_cd] =
                    tSampleRow.sample_flag || '';
            }

            var tIdx1 = 0;
            for (tIdx1 = 0; tIdx1 < nRet1.length; tIdx1++) {
                var tOne = nRet1[tIdx1];

                var tSampleFlag = sampleFlagByOrder[tOne.order_cd] || '';

                var tFactoryCd = tInputObj.FACTORY_CD;

                if (
                    (tDbName === 'shintsbvt' || tDbName === 'shintsetp') &&
                    tLossFlag !== '2'
                ) {
                    //  CM Order
                    // main matl
                    await AFLib2.AdjustLoss.AdjustLossMainMatlCM(
                        tOne.order_cd,
                        tOrderMrpSeq,
                        tUserInfo.USER_ID,
                    );
                    // sub cm
                    await AFLib2.AdjustLoss.AdjustLossMainMatlCM(
                        tOne.order_cd,
                        tOrderMrpSeq,
                        tUserInfo.USER_ID,
                    );
                } else if (tDbName === 'shints' && tLossFlag !== '2') {
                    //  Shints Order
                    if (tFactoryCd === 'FC034') {
                        // BVT
                        if (tSampleFlag === '1') {
                            // Main
                            await AFLib2.AdjustLoss.AdjustLossMainMatlSample(
                                tOne.order_cd,
                                tOrderMrpSeq,
                                tUserInfo.USER_ID,
                            );

                            // Sub
                            await AFLib2.AdjustLoss.AdjustLossSubMatlSample(
                                tOne.order_cd,
                                tOrderMrpSeq,
                                tUserInfo.USER_ID,
                            );
                        } else {
                            // 특정 'v0313','v1874', //20210126김미라삭제'v0568','v1405','v1091','v2214'
                            await AFLib2.AdjustLoss.AdjustLossSubMatlThread(
                                tOne.order_cd,
                                tOrderMrpSeq,
                                tUserInfo.USER_ID,
                            );

                            if (
                                tOne.order_cd.substring(0, 2) === 'KL' ||
                                tOne.order_cd.substring(0, 2) === 'IS' ||
                                tOne.order_cd.substring(0, 2) === 'PK'
                            ) {
                                if (tOne.order_cd.substring(0, 2) === 'KL') {
                                    await AFLib2.AdjustLoss.AdjustLossMainMatlGore(
                                        tOne.order_cd,
                                        tOrderMrpSeq,
                                        tUserInfo.USER_ID,
                                    );
                                    await AFLib2.AdjustLoss.AdjustLossMainMatlHuamao(
                                        tOne.order_cd,
                                        tOrderMrpSeq,
                                        tUserInfo.USER_ID,
                                    );
                                    await AFLib2.AdjustLoss.AdjustLossMainMatlKl(
                                        tOne.order_cd,
                                        tOrderMrpSeq,
                                        tUserInfo.USER_ID,
                                    );
                                } else if (
                                    tOne.order_cd.substring(0, 2) === 'IS'
                                ) {
                                    await AFLib2.AdjustLoss.AdjustLossMainMatlGore(
                                        tOne.order_cd,
                                        tOrderMrpSeq,
                                        tUserInfo.USER_ID,
                                    );
                                    await AFLib2.AdjustLoss.AdjustLossMainMatlIs(
                                        tOne.order_cd,
                                        tOrderMrpSeq,
                                        tUserInfo.USER_ID,
                                    );
                                } else if (
                                    tOne.order_cd.substring(0, 2) === 'PK'
                                ) {
                                    await AFLib2.AdjustLoss.AdjustLossMainMatlHuamao(
                                        tOne.order_cd,
                                        tOrderMrpSeq,
                                        tUserInfo.USER_ID,
                                    );
                                    await AFLib2.AdjustLoss.AdjustLossMainMatlPk(
                                        tOne.order_cd,
                                        tOrderMrpSeq,
                                        tUserInfo.USER_ID,
                                    );
                                }
                            } else {
                                // main matl : Matl type (M, Q)
                                await AFLib2.AdjustLoss.AdjustLossMainMatl(
                                    tOne.order_cd,
                                    tOrderMrpSeq,
                                    tUserInfo.USER_ID,
                                );
                            }

                            // YD : E/BAND,E/STRING,E/BIAS TAPE
                            // matl type: M, Q제외 /  matl_type2: '25', '45', '54', '64', '68', '22'
                            await AFLib2.AdjustLoss.AdjustLossSubMatlEband(
                                tOne.order_cd,
                                tOrderMrpSeq,
                                tUserInfo.USER_ID,
                            );

                            // YD : TAPE,WEBBING
                            // matl type: M, Q제외 /  matl_type2: '26', '27', '24' 
                            await AFLib2.AdjustLoss.AdjustLossSubMatlTape(
                                tOne.order_cd,
                                tOrderMrpSeq,
                                tUserInfo.USER_ID,
                            );

                            // YD : VELCRO
                            // matl type: M, Q제외 /  matl_type2: '31' 
                            await AFLib2.AdjustLoss.AdjustLossSubMatlVelcro(
                                tOne.order_cd,
                                tOrderMrpSeq,
                                tUserInfo.USER_ID,
                            );

                            // M : SEALING TAPE
                            // matl type: M, Q제외 /  matl_type2: '28', '46' 
                            await AFLib2.AdjustLoss.AdjustLossSubMatlSealing(
                                tOne.order_cd,
                                tOrderMrpSeq,
                                tUserInfo.USER_ID,
                            );

                            if (tLossFlag === '1') {
                                // 1은 보통 auto loss 함
                                // PC : ZIPPER
                                // matl type: M, Q제외 /  matl_type2: '33' 
                                await AFLib2.AdjustLoss.AdjustLossSubMatlZipper(
                                    tOne.order_cd,
                                    tOrderMrpSeq,
                                    tUserInfo.USER_ID,
                                );
                            } else {
                                // PC : ZIPPER
                                // matl type: M, Q제외 /  matl_type2: '33' 
                                await AFLib2.AdjustLoss.AdjustLossSubMatlZipper3(
                                    tOne.order_cd,
                                    tOrderMrpSeq,
                                    tUserInfo.USER_ID,
                                );
                            }

                            // PC : PULLER
                            await AFLib2.AdjustLoss.AdjustLossSubMatlPuller(
                                tOne.order_cd,
                                tOrderMrpSeq,
                                tUserInfo.USER_ID,
                            );

                            // PC : STOPPER,BUCKLE
                            await AFLib2.AdjustLoss.AdjustLossSubMatlStopper(
                                tOne.order_cd,
                                tOrderMrpSeq,
                                tUserInfo.USER_ID,
                            );

                            // PC : SNAP,EYELET
                            await AFLib2.AdjustLoss.AdjustLossSubMatlSnap(
                                tOne.order_cd,
                                tOrderMrpSeq,
                                tUserInfo.USER_ID,
                            );

                            // PC : LABEL,GANGTAG
                            await AFLib2.AdjustLoss.AdjustLossSubMatlLabel(
                                tOne.order_cd,
                                tOrderMrpSeq,
                                tUserInfo.USER_ID,
                            );

                            // PC : TRANSFER PRINT
                            await AFLib2.AdjustLoss.AdjustLossSubMatlTransfer(
                                tOne.order_cd,
                                tOrderMrpSeq,
                                tUserInfo.USER_ID,
                            );

                            // 남은것들
                            await AFLib2.AdjustLoss.AdjustLossSubMatlRemain(
                                tOne.order_cd,
                                tOrderMrpSeq,
                                tUserInfo.USER_ID,
                            );

                            // size loss 부자재 추가 된것들
                            await AFLib2.AdjustLoss.AdjustSizeLossSubMatl(
                                tOne.order_cd,
                                tOrderMrpSeq,
                                tUserInfo.USER_ID,
                            );
                        }
                    } else if (tFactoryCd === 'FC044') {
                        // ETP
                        if (tSampleFlag === '1') {
                            // Main
                            await AFLib2.AdjustLoss.AdjustLossETPMainMatlSample(
                                tOne.order_cd,
                                tOrderMrpSeq,
                                tUserInfo.USER_ID,
                            );

                            // Sub
                            await AFLib2.AdjustLoss.AdjustLossETPSubMatlSample(
                                tOne.order_cd,
                                tOrderMrpSeq,
                                tUserInfo.USER_ID,
                            );
                        } else {
                            // main matl
                            await AFLib2.AdjustLoss.AdjustLossETPMainMatl(
                                tOne.order_cd,
                                tOrderMrpSeq,
                                tUserInfo.USER_ID,
                            );

                            // sub matl20210208김미라 thread는 따로 값주기
                            await AFLib2.AdjustLoss.AdjustLossETPSubMatl(
                                tOne.order_cd,
                                tOrderMrpSeq,
                                tUserInfo.USER_ID,
                            );

                            await AFLib2.AdjustLoss.AdjustLossETPSubMatl2(
                                tOne.order_cd,
                                tOrderMrpSeq,
                                tUserInfo.USER_ID,
                            );

                            await AFLib2.AdjustLoss.AdjustLossETPSubMatl3(
                                tOne.order_cd,
                                tOrderMrpSeq,
                                tUserInfo.USER_ID,
                            );

                            // size loss 부자재 추가 된것들
                            await AFLib2.AdjustLoss.AdjustSizeLossSubMatl(
                                tOne.order_cd,
                                tOrderMrpSeq,
                                tUserInfo.USER_ID,
                            );

                            // PC : Transfer Print
                            await AFLib2.AdjustLoss.AdjustLossETPSubMatlTransfer(
                                tOne.order_cd,
                                tOrderMrpSeq,
                                tUserInfo.USER_ID,
                            );

                            // PC : NYLON THREAD
                            await AFLib2.AdjustLoss.AdjustLossETPSubMatlNylon(
                                tOne.order_cd,
                                tOrderMrpSeq,
                                tUserInfo.USER_ID,
                            );

                            // sub : 오더수량으로 계산
                            await AFLib2.AdjustLoss.AdjustLossETPSubMatlOrderQty(
                                tOne.order_cd,
                                tOrderMrpSeq,
                                tUserInfo.USER_ID,
                            );
                        }
                    } else {
                    }
                } else {
                    if (tFactoryCd === 'FC034') {
                        // BVT
                        if (tSampleFlag !== '1') {
                            await AFLib2.AdjustLoss.AdjustLossSubMatlThread(
                                tOne.order_cd,
                                tOrderMrpSeq,
                                tUserInfo.USER_ID,
                            );
                        }
                    }
                }
            }

            console.log(`Adjust Loss => ${tLossFlag}`);

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCESS:ADJUST_LOSS';
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },
        mgrInsert_S0305_ADJUST_LOSS_MRP_BY_ORDER: async (
            _,
            args,
            contextValue,
        ) => {
            var tUserInfo = AFLib.getUserInfo(contextValue);
            var tInputObj = args.datas; // BUYER_CD, PO_CD, ORDER_CD, FACTORY_CD, ORDER_MRP_SEQ, SAMPLE_FLAG

            await AFLib2.CommonFunc.ResetOrderMrpSeqMax(
                tInputObj.PO_CD,
                tUserInfo.USER_ID,
                tInputObj.ORDER_CD,
            );

            let sql0_1 = `           
                 select db_name() as db_name
              `;
            var tRet0_1 = await prisma.$queryRaw(Prisma.raw(sql0_1));
            var tDbName = '';
            if (tRet0_1.length > 0) tDbName = tRet0_1[0].db_name;
            
            var tLossFlag = '1';
            let sql0 = `
                select
                    isnull(loss_flag, '1') as loss_flag
                from
                    kcd_buyer
                where
                    buyer_cd = '${tInputObj.BUYER_CD}'
            `;
            var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            if (nRet0.length > 0) {
                tLossFlag = nRet0[0].loss_flag;
                if (tLossFlag === '') tLossFlag = '1';
            }

            var tOrderMrpSeq = tInputObj.ORDER_MRP_SEQ;
            var tOrderCd = tInputObj.ORDER_CD;
            tDbName = 'shints';

            let sql2 = `
                select
                    order_cd,
                    sample_flag,
                    factory_cd,
                    sample_flag
                from
                    ksv_order_mst
                where
                    order_cd = '${tOrderCd}'
            `;
            var nRet2 = await prisma.$queryRaw(Prisma.raw(sql2));
            var tOne = { ...nRet2[0] };
            var tSampleFlag = nRet2[0].sample_flag;
            var tFactoryCd = nRet2[0].factory_cd;

            try {
                console.log(`1-----ADJUST_LOSS(MRP_BY_ORDER)=> ${tDbName} / ${tLossFlag} / ${tOrderCd} / lih7912`);

                if (
                    (tDbName === 'shintsbvt' || tDbName === 'shintsetp') &&
                    tLossFlag !== '2'
                ) {

                    console.log(`2-----ADJUST_LOSS(MRP_BY_ORDER)=> ${tDbName} / ${tLossFlag} / ${tOrderCd} / lih7912`);
                    //  CM Order
                    // main matl
                    await AFLib2.AdjustLoss.AdjustLossMainMatlCM(
                        tOne.order_cd,
                        tOrderMrpSeq,
                        tUserInfo.USER_ID,
                    );
                    // sub cm
                    await AFLib2.AdjustLoss.AdjustLossMainMatlCM(
                        tOne.order_cd,
                        tOrderMrpSeq,
                        tUserInfo.USER_ID,
                    );
                } else if (tDbName === 'shints' && tLossFlag !== '2') {
                    console.log(`3-----ADJUST_LOSS(MRP_BY_ORDER)=> ${tDbName} / ${tLossFlag} / ${tOrderCd} / lih7912`);
                    console.log(
                        `ADJUST_LOSS=> ${tDbName} / ${tFactoryCd} / ${tSampleFlag} }`,
                    );
                    //  Shints Order
                    if (tFactoryCd === 'FC034') {
                        // BVT
                        if (tSampleFlag === '1') {
                            console.log(
                                `ADJUST_LOSS(Sample)=> ${tDbName} / ${tFactoryCd} / ${tSampleFlag} }`,
                            );
                            // Main
                            await AFLib2.AdjustLoss.AdjustLossMainMatlSample(
                                tOne.order_cd,
                                tOrderMrpSeq,
                                tUserInfo.USER_ID,
                            );

                            // Sub
                            await AFLib2.AdjustLoss.AdjustLossSubMatlSample(
                                tOne.order_cd,
                                tOrderMrpSeq,
                                tUserInfo.USER_ID,
                            );
                        } else {
                            // 특정 'v0313','v1874', //20210126김미라삭제'v0568','v1405','v1091','v2214'
                            console.log(
                                `ADJUST_LOSS(SubMatlThread)=> ${tOne.order_cd} / ${tOrderMrpSeq} `,
                            );
                            await AFLib2.AdjustLoss.AdjustLossSubMatlThread(
                                tOne.order_cd,
                                tOrderMrpSeq,
                                tUserInfo.USER_ID,
                            );

                            if (
                                tOne.order_cd.substring(0, 2) === 'KL' ||
                                tOne.order_cd.substring(0, 2) === 'IS' ||
                                tOne.order_cd.substring(0, 2) === 'PK'
                            ) {
                                if (tOne.order_cd.substring(0, 2) === 'KL') {
                                    console.log(
                                        `ADJUST_LOSS(KL:AdjustLossMainMatlGore,AdjustLossMainMatlHuamao,AdjustLossMainMatlKl)=> ${tOne.order_cd} / ${tOrderMrpSeq} `,
                                    );
                                    await AFLib2.AdjustLoss.AdjustLossMainMatlGore(
                                        tOne.order_cd,
                                        tOrderMrpSeq,
                                        tUserInfo.USER_ID,
                                    );
                                    await AFLib2.AdjustLoss.AdjustLossMainMatlHuamao(
                                        tOne.order_cd,
                                        tOrderMrpSeq,
                                        tUserInfo.USER_ID,
                                    );
                                    await AFLib2.AdjustLoss.AdjustLossMainMatlKl(
                                        tOne.order_cd,
                                        tOrderMrpSeq,
                                        tUserInfo.USER_ID,
                                    );
                                } else if (
                                    tOne.order_cd.substring(0, 2) === 'IS'
                                ) {
                                    console.log(
                                        `ADJUST_LOSS(IS:AdjustLossMainMatlGore,AdjustLossMainMatlIs)=> ${tOne.order_cd} / ${tOrderMrpSeq} `,
                                    );
                                    await AFLib2.AdjustLoss.AdjustLossMainMatlGore(
                                        tOne.order_cd,
                                        tOrderMrpSeq,
                                        tUserInfo.USER_ID,
                                    );
                                    await AFLib2.AdjustLoss.AdjustLossMainMatlIs(
                                        tOne.order_cd,
                                        tOrderMrpSeq,
                                        tUserInfo.USER_ID,
                                    );
                                } else if (
                                    tOne.order_cd.substring(0, 2) === 'PK'
                                ) {
                                    console.log(
                                        `ADJUST_LOSS(IS:AdjustLossMainMatlHuamao,AdjustLossMainMatlPk)=> ${tOne.order_cd} / ${tOrderMrpSeq} `,
                                    );
                                    await AFLib2.AdjustLoss.AdjustLossMainMatlHuamao(
                                        tOne.order_cd,
                                        tOrderMrpSeq,
                                        tUserInfo.USER_ID,
                                    );
                                    await AFLib2.AdjustLoss.AdjustLossMainMatlPk(
                                        tOne.order_cd,
                                        tOrderMrpSeq,
                                        tUserInfo.USER_ID,
                                    );
                                }
                            } else {
                                // main matl
                                console.log(
                                    `ADJUST_LOSS(MainMatl)=> ${tOne.order_cd} / ${tOrderMrpSeq} `,
                                );
                                await AFLib2.AdjustLoss.AdjustLossMainMatl(
                                    tOne.order_cd,
                                    tOrderMrpSeq,
                                    tUserInfo.USER_ID,
                                );
                            }

                            // YD : E/BAND,E/STRING,E/BIAS TAPE
                            console.log(
                                `ADJUST_LOSS(Eband)=> ${tOne.order_cd} / ${tOrderMrpSeq} `,
                            );
                            await AFLib2.AdjustLoss.AdjustLossSubMatlEband(
                                tOne.order_cd,
                                tOrderMrpSeq,
                                tUserInfo.USER_ID,
                            );

                            // YD : TAPE,WEBBING
                            console.log(
                                `ADJUST_LOSS(Tape)=> ${tOne.order_cd} / ${tOrderMrpSeq} `,
                            );
                            await AFLib2.AdjustLoss.AdjustLossSubMatlTape(
                                tOne.order_cd,
                                tOrderMrpSeq,
                                tUserInfo.USER_ID,
                            );

                            // YD : VELCRO
                            await console.log(
                                `ADJUST_LOSS(Velcro)=> ${tOne.order_cd} / ${tOrderMrpSeq} `,
                            );
                            await AFLib2.AdjustLoss.AdjustLossSubMatlVelcro(
                                tOne.order_cd,
                                tOrderMrpSeq,
                                tUserInfo.USER_ID,
                            );

                            // M : SEALING TAPE
                            console.log(
                                `ADJUST_LOSS(SEALING Tape)=> ${tOne.order_cd} / ${tOrderMrpSeq} `,
                            );
                            await AFLib2.AdjustLoss.AdjustLossSubMatlSealing(
                                tOne.order_cd,
                                tOrderMrpSeq,
                                tUserInfo.USER_ID,
                            );

                            if (tLossFlag === '1') {
                                // 1은 보통 auto loss 함
                                // PC : ZIPPER
                                console.log(
                                    `ADJUST_LOSS(Zipper Auto)=> ${tOne.order_cd} / ${tOrderMrpSeq} `,
                                );
                                await AFLib2.AdjustLoss.AdjustLossSubMatlZipper(
                                    tOne.order_cd,
                                    tOrderMrpSeq,
                                    tUserInfo.USER_ID,
                                );
                            } else {
                                // PC : ZIPPER
                                console.log(
                                    `ADJUST_LOSS(Zipper Non Auto)=> ${tOne.order_cd} / ${tOrderMrpSeq} `,
                                );
                                await AFLib2.AdjustLoss.AdjustLossSubMatlZipper3(
                                    tOne.order_cd,
                                    tOrderMrpSeq,
                                    tUserInfo.USER_ID,
                                );
                            }

                            // PC : PULLER
                            console.log(
                                `ADJUST_LOSS(Puller)=> ${tOne.order_cd} / ${tOrderMrpSeq} `,
                            );
                            await AFLib2.AdjustLoss.AdjustLossSubMatlPuller(
                                tOne.order_cd,
                                tOrderMrpSeq,
                                tUserInfo.USER_ID,
                            );

                            // PC : STOPPER,BUCKLE
                            console.log(
                                `ADJUST_LOSS(Stopper)=> ${tOne.order_cd} / ${tOrderMrpSeq} `,
                            );
                            await AFLib2.AdjustLoss.AdjustLossSubMatlStopper(
                                tOne.order_cd,
                                tOrderMrpSeq,
                                tUserInfo.USER_ID,
                            );

                            // PC : SNAP,EYELET
                            console.log(
                                `ADJUST_LOSS(Snap)=> ${tOne.order_cd} / ${tOrderMrpSeq} `,
                            );
                            await AFLib2.AdjustLoss.AdjustLossSubMatlSnap(
                                tOne.order_cd,
                                tOrderMrpSeq,
                                tUserInfo.USER_ID,
                            );

                            // PC : LABEL,GANGTAG
                            console.log(
                                `ADJUST_LOSS(Label)=> ${tOne.order_cd} / ${tOrderMrpSeq} `,
                            );
                            await AFLib2.AdjustLoss.AdjustLossSubMatlLabel(
                                tOne.order_cd,
                                tOrderMrpSeq,
                                tUserInfo.USER_ID,
                            );

                            // PC : TRANSFER PRINT
                            console.log(
                                `ADJUST_LOSS(Print)=> ${tOne.order_cd} / ${tOrderMrpSeq} `,
                            );
                            await AFLib2.AdjustLoss.AdjustLossSubMatlTransfer(
                                tOne.order_cd,
                                tOrderMrpSeq,
                                tUserInfo.USER_ID,
                            );

                            // 남은것들
                            console.log(
                                `ADJUST_LOSS(Remain)=> ${tOne.order_cd} / ${tOrderMrpSeq} `,
                            );
                            await AFLib2.AdjustLoss.AdjustLossSubMatlRemain(
                                tOne.order_cd,
                                tOrderMrpSeq,
                                tUserInfo.USER_ID,
                            );

                            // size loss 부자재 추가 된것들
                            console.log(
                                `ADJUST_LOSS(SubMatl)=> ${tOne.order_cd} / ${tOrderMrpSeq} `,
                            );
                            await AFLib2.AdjustLoss.AdjustSizeLossSubMatl(
                                tOne.order_cd,
                                tOrderMrpSeq,
                                tUserInfo.USER_ID,
                            );
                        }
                    } else if (tFactoryCd === 'FC044') {
                        // ETP
                        if (tSampleFlag === '1') {
                            console.log(
                                `ADJUST_LOSS(ETP Sample)=> ${tDbName} / ${tFactoryCd} / ${tSampleFlag} }`,
                            );
                            // Main
                            await AFLib2.AdjustLoss.AdjustLossETPMainMatlSample(
                                tOne.order_cd,
                                tOrderMrpSeq,
                                tUserInfo.USER_ID,
                            );

                            // Sub
                            await AFLib2.AdjustLoss.AdjustLossETPSubMatlSample(
                                tOne.order_cd,
                                tOrderMrpSeq,
                                tUserInfo.USER_ID,
                            );
                        } else {
                            console.log(
                                `ADJUST_LOSS(ETP Main)=> ${tDbName} / ${tFactoryCd} / ${tSampleFlag} }`,
                            );
                            // main matl
                            await AFLib2.AdjustLoss.AdjustLossETPMainMatl(
                                tOne.order_cd,
                                tOrderMrpSeq,
                                tUserInfo.USER_ID,
                            );

                            console.log(
                                `ADJUST_LOSS(ETP Sub)=> ${tDbName} / ${tFactoryCd} / ${tSampleFlag} }`,
                            );
                            // sub matl20210208김미라 thread는 따로 값주기
                            await AFLib2.AdjustLoss.AdjustLossETPSubMatl(
                                tOne.order_cd,
                                tOrderMrpSeq,
                                tUserInfo.USER_ID,
                            );

                            await AFLib2.AdjustLoss.AdjustLossETPSubMatl2(
                                tOne.order_cd,
                                tOrderMrpSeq,
                                tUserInfo.USER_ID,
                            );

                            await AFLib2.AdjustLoss.AdjustLossETPSubMatl3(
                                tOne.order_cd,
                                tOrderMrpSeq,
                                tUserInfo.USER_ID,
                            );

                            // size loss 부자재 추가 된것들
                            console.log(
                                `ADJUST_LOSS(SizeLoss Sub)=> ${tDbName} / ${tFactoryCd} / ${tSampleFlag} }`,
                            );
                            await AFLib2.AdjustLoss.AdjustSizeLossSubMatl(
                                tOne.order_cd,
                                tOrderMrpSeq,
                                tUserInfo.USER_ID,
                            );

                            // PC : Transfer Print
                            console.log(
                                `ADJUST_LOSS(ETP Transfer)=> ${tDbName} / ${tFactoryCd} / ${tSampleFlag} }`,
                            );
                            await AFLib2.AdjustLoss.AdjustLossETPSubMatlTransfer(
                                tOne.order_cd,
                                tOrderMrpSeq,
                                tUserInfo.USER_ID,
                            );

                            // PC : NYLON THREAD
                            console.log(
                                `ADJUST_LOSS(ETP Nylon)=> ${tDbName} / ${tFactoryCd} / ${tSampleFlag} }`,
                            );
                            await AFLib2.AdjustLoss.AdjustLossETPSubMatlNylon(
                                tOne.order_cd,
                                tOrderMrpSeq,
                                tUserInfo.USER_ID,
                            );

                            // sub : 오더수량으로 계산
                            console.log(
                                `ADJUST_LOSS(ETP OrderQty)=> ${tDbName} / ${tFactoryCd} / ${tSampleFlag} }`,
                            );
                            await AFLib2.AdjustLoss.AdjustLossETPSubMatlOrderQty(
                                tOne.order_cd,
                                tOrderMrpSeq,
                                tUserInfo.USER_ID,
                            );
                        }
                    } else {
                    }
                } else {
                    // Shints ,  Loss_Flag = '2' (product base)
                    if (tFactoryCd === 'FC034') {
                        // BVT
                        if (tSampleFlag !== '1') {
                            await AFLib2.AdjustLoss.AdjustLossSubMatlThread(
                                tOne.order_cd,
                                tOrderMrpSeq,
                                tUserInfo.USER_ID,
                            );

                            // PC : ZIPPER
                            await AFLib2.AdjustLoss.AdjustLossSubMatlZipper3(
                                tOne.order_cd,
                                tOrderMrpSeq,
                                tUserInfo.USER_ID,
                            );
                        }
                    }
                }
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = `ERROR:ADJUST_LOSS:${e.message}`;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = `SUCCESS:ADJUST_LOSS(MRP BY ORDER:${tLossFlag})`;
            tObj.id = 0;
            tRetArray.push(tObj);
            return tRetArray;
        },
        mgrInsert_S0305_PO_SETTLE: async (_, args, contextValue) => {
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
            var tRetDate1 = yyyy.toString() + mm_str + dd_str;
            var tYY = 'B' + yyyy.toString().substring(2) + '-';

            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput1 = args.datas;

            // po_seq = 1에 대한 po_fix flag상태확인 , 없으면 insert
            var tPoLogCnt = 0;
            var sql0 = `
                select
                    count(po_cd) as cnt1
                from
                    ksv_po_log
                where
                    po_cd = '${tInput1.PO_CD}'
                    and fix_flag = '1'
                    and po_seq = '1'
            `;
            var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            if (tRet0.length > 0 && tRet0[0].cnt1 > 0)
                tPoLogCnt = tRet0[0].cnt1;

            var tSQLArray = [];

            // PO_Status 변경
            let tSQL99 = `
                update ksv_po_mst
                set
                    po_status = '4'
                where
                    po_cd = '${tInput1.PO_CD}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            // 처음 Stock Mst 생성.  (발주내역 Mst)  . PO_MST copy
            let tSQL99 = `
                insert into
                    ksv_stock_mst (
                        po_cd,
                        po_seq,
                        in_factory_cd,
                        out_factory_cd,
                        status_cd,
                        reg_user,
                        reg_datetime
                    )
                select
                    po_cd,
                    po_seq,
                    'FC010',
                    '${tInput1.FACTORY_CD}',
                    '0',
                    '${tUserInfo.USER_ID}',
                    '${tRetDate}'
                from
                    ksv_po_mst
                where
                    po_cd = '${tInput1.PO_CD}'
                    and po_seq < 97
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            // 초기 Stock Mem  (발주내역 상세), KSV_PO_MRP  copy
            // USE_PO_TYPE (1: order, 2:  재고),  1인 Order만
            // DIFF_PO_TYPE  : Cancel 이 아닌것
            //   0                    Order
            //   1                    Left over
            //   2                    Cancel
            //   3                    ADD
            //   4                    Part Cancel
            //   5                    Cancel StockUse
            // PO_SEQ < 97 . 일반 MRP만. 단품발주, FOC, MOQ, LeftOver 제외
            let tSQL99 = `
                insert into
                    ksv_stock_mem (
                        po_cd,
                        po_seq,
                        order_cd,
                        matl_cd,
                        mrp_seq,
                        matl_seq,
                        po_qty,
                        in_qty,
                        out_qty,
                        infac_qty,
                        outfac_qty,
                        remain_qty,
                        factory_cd,
                        diff_po_type,
                        stock_status,
                        status_cd,
                        reg_user,
                        reg_datetime,
                        min_conf_user,
                        min_conf_datetime
                    )
                select
                    po_cd,
                    po_seq,
                    order_cd,
                    matl_cd,
                    mrp_seq,
                    matl_seq,
                    po_qty,
                    0,
                    0,
                    0,
                    0,
                    0,
                    '${tInput1.FACTORY_CD}',
                    diff_po_type,
                    '0',
                    '0',
                    '${tUserInfo.USER_ID}',
                    '${tRetDate}',
                    min_conf_user,
                    min_conf_datetime
                from
                    ksv_po_mrp
                where
                    po_cd = '${tInput1.PO_CD}'
                    and use_po_type = '1'
                    and diff_po_type <> '2'
                    and po_seq < '97'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            if (tPoLogCnt > 0) {
                let tSQL99 = `
                    update ksv_po_log
                    set
                        reg_datetime = '${tRetDate}',
                        reg_user = '${tUserInfo.USER_ID}'
                    where
                        po_cd = '${tInput1.PO_CD}'
                        and po_seq = '1'
                        and fix_flag = '1'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            } else {
                let tSQL99 = `
                    insert into
                        ksv_po_log (po_cd, po_seq, reg_user, reg_datetime, fix_flag)
                    values
                        ('${tInput1.PO_CD}', 1, '${tUserInfo.USER_ID}', '${tRetDate}', '1')
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            }

            // ORDER_STATUS을 PO로 변경
            let tSQL99 = `
                update ksv_order_mst
                set
                    order_status = '3'
                where
                    order_cd in (
                        select
                            order_cd
                        from
                            ksv_po_mem
                        where
                            po_cd = '${tInput1.PO_CD}'
                            and po_seq = '1'
                    )
                    and order_status <> '4'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            // PO_VENDOR delete/insert
            let tSQL99 = `
                delete from ksv_po_vendor
                where
                    po_cd = '${tInput1.PO_CD}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            //
            var sql9 = `
                select
                    a.po_cd,
                    b.vendor_cd,
                    count(*) as cnt
                from
                    ksv_po_mrp a,
                    kcd_matl_mst b
                where
                    a.po_cd = '${tInput1.PO_CD}'
                    and a.matl_cd = b.matl_cd
                    and a.use_po_type = '1'
                    and a.diff_po_type <> '1'
                group by
                    a.po_cd,
                    b.vendor_cd
            `;
            var tRet9 = await prisma.$queryRaw(Prisma.raw(sql9));
            var tIdx9 = 0;
            for (tIdx9 = 0; tIdx9 < tRet9.length; tIdx9++) {
                var tObj = {};
                tObj.po_cd = tRet9[tIdx9].po_cd;
                tObj.vendor_cd = tRet9[tIdx9].vendor_cd;
                tObj.end_date = '';
                tObj.pu_cd = '';
                let tSQL99 = AFLib.createTableSql('KSV_PO_VENDOR', tObj);
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
                tObj.CODE = 'SUCCEED:PO_SETTLE' + tInput1.PO_CD;
                tObj.id = 0;
                tRetArray.push(tObj);
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:PO_SETTLE';
                tObj.id = 0;
                tRetArray.push(tObj);
            }

            return tRetArray;
        },
        mgrInsert_S0305_PURCHASE_REQUEST: async (_, args, contextValue) => {
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
            var tRetDate1 = yyyy.toString() + mm_str + dd_str;
            var tYY = 'B' + yyyy.toString().substring(2) + '-';

            // let tPO = "POA2022S672";
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tSQLArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var tInput1 = { ...args.datas[tIdx] };

                var sql0 = `
                    select
                        purchase_request
                    from
                        ksv_po_mst
                    where
                        po_cd = '${tInput1.PO_CD}'
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                if (tRet0.length <= 0) {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = `ERROR:Purchaes Request:${tInput1.PO_CD} po가 없습니다 `;
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }
                var tHasEmptyPurchaseRequest = tRet0.some((row) => {
                    var tPurchaseRequest = row.purchase_request;
                    if (tPurchaseRequest === null || typeof tPurchaseRequest === 'undefined') return true;
                    var tPurchaseRequestStr = String(tPurchaseRequest).trim().toLowerCase();
                    return tPurchaseRequestStr === '' || tPurchaseRequestStr === 'null';
                });

                if (tHasEmptyPurchaseRequest) {
                    let tSQL99 = `
                        update ksv_po_mst
                        set
                            purchase_request = 'O'
                        where
                            po_cd = '${tInput1.PO_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                } else {
                    let tSQL99 = `
                        update ksv_po_mst
                        set
                            purchase_request = null
                        where
                            po_cd = '${tInput1.PO_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }
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
                tObj.CODE = `SUCCEED:Purchase Request`;
                tObj.id = 0;
                tRetArray.push(tObj);
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Purchase Request';
                tObj.id = 0;
                tRetArray.push(tObj);
            }
            return tRetArray;
        },
        mgrInsert_S0305_PO_CANCEL: async (_, args, contextValue) => {
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
            var tRetDate1 = yyyy.toString() + mm_str + dd_str;
            var tYY = 'B' + yyyy.toString().substring(2) + '-';

            // let tPO = "POA2022S672";
            var tUserInfo = AFLib.getUserInfo(contextValue);

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

            /*
      var tTempSQL = `EXEC sp_helptext N'kspPoMrpNetTemp' `;
      var tTempRet = await prisma.$queryRaw(Prisma.raw(tTempSQL));
      console.log(tTempRet);
*/

            /*
      let tSQL99 = `
          update ksv_pu_mst2
          set
              pay_type = '${tInput.PAY_TYPE}',
              pay_date = '${tInput.PAY_DATE}'
          where
              pu_cd = '${tInput.PU_CD}'
      `;
      const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
      tSQLArray.push(tSQL99_1);
*/

            var tInput1 = args.datas;

            if (tInput1.PO_TYPE === 'S') {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE =
                    'ERROR:PO_CANCEL:샘플발주를 취소하려면 발주삭제를 하십시오.';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
            if (tInput1.PO_STATUS === '5') {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:PO_CANCEL:End Po..';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            // Check Mininum
            let sql0 = `
                select
                    a.matl_cd,
                    b.matl_name,
                    a.order_cd
                from
                    ksv_stock_mem a,
                    kcd_matl_mst b
                where
                    a.po_cd = '${tInput1.PO_CD}'
                    and a.po_seq in ('99', '98', '97')
                    and b.matl_cd = a.matl_cd
            `;
            let tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            if (tRet0.length > 0) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE =
                    'ERROR:PO_CANCEL:Have Minimum order. if need cancel, check with purchase team.';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            // Check StockIn
            let sql0 = `
                select
                    matl_cd
                from
                    ksv_stock_in
                where
                    po_cd = '${tInput1.PO_CD}'
            `;
            let tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            if (tRet0.length > 0) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:PO_CANCEL:First Cancel input progress.';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tSQLArray = [];

            // PO Status. PO Reg로 변경
            let tSQL99 = `
                update ksv_po_mst
                set
                    po_status = '0'
                where
                    po_cd = '${tInput1.PO_CD}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            // 재고사용 취소처리
            let sql0 = `
                select
                    stock_idx,
                    use_qty
                from
                    ksv_stock_use
                where
                    use_po_cd = '${tInput1.PO_CD}'
            `;
            let tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));

            var tIdx0 = 0;
            for (tIdx0 = 0; tIdx0 < tRet0.length; tIdx0++) {
                var tIn = { ...tRet0[tIdx0] };

                let tSQL99 = `
                    update ksv_stock_matl
                    set
                        remain_qty = remain_qty + ${tIn.use_qty},
                        use_qty = use_qty - ${tIn.use_qty}
                    where
                        stock_idx = '${tIn.stock_idx}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            }

            // 1번만 남기고 PO 정보 삭제
            let tSQL99 = `
                delete ksv_po_mst
                where
                    po_cd = '${tInput1.PO_CD}'
                    and po_seq > 1;
                
                delete ksv_po_mem
                where
                    po_cd = '${tInput1.PO_CD}'
                    and po_seq > 1;
                
                delete ksv_po_mrp
                where
                    po_cd = '${tInput1.PO_CD}';
                
                delete ksv_po_matllist
                where
                    po_cd = '${tInput1.PO_CD}';
                
                delete ksv_stock_matl
                where
                    po_cd = '${tInput1.PO_CD}'
                    and right(order_cd, 8) <> '00-00000';
                
                delete ksv_stock_use
                where
                    use_po_cd = '${tInput1.PO_CD}';
                
                delete ksv_stock_mst
                where
                    po_cd = '${tInput1.PO_CD}';
                
                delete ksv_stock_mem
                where
                    po_cd = '${tInput1.PO_CD}';
                
                delete from ksv_po_log
                where
                    po_cd = '${tInput1.PO_CD}';
                
                update ksv_po_mst
                set
                    reg_datetime = '${tRetDate}'
                where
                    po_cd = '${tInput1.PO_CD}'
                    and po_seq = 1;
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            let tSQL99 = `
                update ksv_order_mst
                set
                    order_status = '1'
                where
                    order_cd in (
                        select
                            order_cd
                        from
                            ksv_po_mem
                        where
                            po_cd = '${tInput1.PO_CD}'
                            and po_seq = '1'
                    )
                    and order_status <> '4'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'SUCCEED:PO_SETTLE' + tInput1.PO_CD;
                tObj.id = 0;
                tRetArray.push(tObj);
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:PO_SETTLE';
                tObj.id = 0;
                tRetArray.push(tObj);
            }

            return tRetArray;
        },
        mgrInsert_S0305_PO_END: async (_, args, contextValue) => {
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
            var tRetDate1 = yyyy.toString() + mm_str + dd_str;
            var tYY = 'B' + yyyy.toString().substring(2) + '-';

            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput1 = args.datas;

            if (tInput1.PO_STATUS === '5') {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:PO_CANCEL:End Po..';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var chkOrderEnd = '1';
            var sql0 = `
                select
                    order_cd,
                    order_status
                from
                    ksv_order_mst
                where
                    order_cd in (
                        select
                            order_cd
                        from
                            ksv_po_mem
                        where
                            po_cd = '${tInput1.PO_CD}'
                            and po_seq = 1
                    )
            `;
            var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));

            var tIdx9 = 0;
            for (tIdx9 = 0; tIdx9 < nRet0.length; tIdx9++) {
                var tOne0 = nRet0[tIdx9];
                if (tOne0.order_status !== '9' && tOne0.order_status !== '4')
                    chkOrderEnd = '0';
            }

            if (tInput1.PO_STATUS !== '4' && chkOrderEnd !== '1') {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = "ERROR:PO_CANCEL:The Po hasn't been fix yet.";
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            if (chkOrderEnd !== '1') {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:PO_CANCEL:All orders must be Ended.';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tSQLArray = [];

            let tSQL99 = `
                update ksv_po_mst
                set
                    po_status = '5',
                    close_user = '${tUserInfo.USER_ID}',
                    close_datetime = '${tRetDate}'
                where
                    po_cd = '${tInput1.PO_CD}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            let tSQL99 = `
                update ksv_order_mst
                set
                    order_status = '8'
                where
                    order_cd in (
                        select
                            order_cd
                        from
                            ksv_po_mem
                        where
                            po_cd = '${tInput1.PO_CD}'
                            and po_seq = '1'
                    )
                    and order_status <> '4'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            if (tInput1.PO_TYPE === 'S') tSQLArray.push(tSQL99_1);

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'SUCCEED:PO_END' + tInput1.PO_CD;
                tObj.id = 0;
                tRetArray.push(tObj);
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:PO_END';
                tObj.id = 0;
                tRetArray.push(tObj);
            }

            return tRetArray;
        },
    },
};

export default moduleMutation_S0305_3;
