// MGR_@@TNAME@@.mutations.js

import * as fs from 'fs';
import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
import { MrpProcedureMigration } from '../../mrpProcedureMigration';
const mrpMigration = new MrpProcedureMigration(prisma as any);

/*
                STD_FLAG: String 
                NET: String 
                LOSS: String 
                USE_SIZE: String 
                REMARK: String 

*/

// export default로 Mutation 내용 내보내기
const moduleMutation_S030506_03 = {
    Mutation: {
        mgrAddPo_S030506_03: async (_, args, contextValue) => {
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
            var tRetDate1 = tRetDate.substring(0, 8);
            var tYY = 'B' + yyyy.toString().substring(2) + '-';

            if (args.datas.BUYER_CD === '') {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:BUYER_CD';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            if (args.datas.PO_CD !== '') {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Update 을 사용하세요';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            // let tPO = "POA2022S672";
            var tUserInfo = AFLib.getUserInfo(contextValue);

            /*
        Type – Factory에 따라 BVT – P, ETP는 E로 시작
        Sample(0) – PS23-S0001
        Storage(1) – PT23-S0001
        Factory LC(2) – PS23S0001
        */

            /* 
        PO_TYPE: E, EO, ES, ET, P, PO, PS, PT, S, T, TS
        */

            let sqlUser = `
                select
                    isnull(company_code, '') as company_code
                from
                    kcd_user
                where
                    user_id = '${tUserInfo.USER_ID}'
            `;
            let retUser = await prisma.$queryRaw(Prisma.raw(sqlUser));
            var objUser = {};
            if (retUser.length > 0) objUser = { ...retUser[0] };

            let sqlBuyer = `
                select
                    isnull(b.company_code, '') as company_code
                from
                    kcd_buyer a,
                    kcd_user b
                where
                    a.reg_user = b.user_id
                    and a.buyer_cd = '${args.datas.BUYER_CD}'
            `;
            let retBuyer = await prisma.$queryRaw(Prisma.raw(sqlBuyer));
            if (retBuyer.length > 0 && objUser.company_code !== 'nsr') {
                objUser.company_code = retBuyer[0].company_code;
            }

            var tSQLArray = [];

            var tPO = 'P';
            var tHypon = '-';

            let tSql0_1 = `
                select
                    tag_po,
                    tag_order
                from
                    kcd_factory
                where
                    factory_cd = '${args.datas.FACTORY_CD}'
            `;
            let nRet0_1 = await prisma.$queryRaw(Prisma.raw(tSql0_1));
            if (nRet0_1.length > 0) {
                tPO = nRet0_1[0].tag_po;
                tHypon = nRet0_1[0].tag_order;
            }

            var tPoType = 'S';
            var wPoType = 'S';
            var tFactoryLc = '0';
            var tSampleFlag = '1';

            if (args.datas.PO_TYPE === '0') {
                // Sample
                tPoType = 'S';
                wPoType = 'S';
                tFactoryLc = '0';
                tSampleFlag = '1';
            } else if (args.datas.PO_TYPE === '1') {
                // Storage
                wPoType = 'T';
                tPoType = 'S';
                tFactoryLc = '0';
                tSampleFlag = '0';
            } else if (args.datas.PO_TYPE === '2') {
                // Factory FOB
                wPoType = 'F';
                tPoType = 'S';
                tFactoryLc = '1';
                tSampleFlag = '0';
            } else if (args.datas.PO_TYPE === '3') {
                // Factory Sample
                wPoType = 'F';
                tPoType = 'S';
                tFactoryLc = '0';
                tSampleFlag = '1';
            }

            var tPoYY = parseInt(tRetDate.substring(0, 4));
            var tPoYY_2 = parseInt(tRetDate.substring(2, 4));

            var tPoType1 = `${tPO}${tPoType}`;

            // 새로운 Po Cd Seq 을 생성
            let tSql0 = `
                SELECT
                    isnull(max(seq), 0) as cnt
                FROM
                    ksv_po_getseq
                WHERE
                    PO = '${tPoType1}'
                    and YY = ${tPoYY}
            `;
            let nRet = await prisma.$queryRaw(Prisma.raw(tSql0));
            var tPoNum = nRet[0].cnt + 1;

            let tUpdatePoNumSql = '';
            if (tPoNum === 1) {
                tUpdatePoNumSql = `
                    INSERT INTO
                        ksv_po_getseq (PO, YY, SEQ)
                    VALUES
                        ('${tPoType1}', ${tPoYY}, 1)
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tUpdatePoNumSql));
                tSQLArray.push(tSQL99_1);
            } else {
                tUpdatePoNumSql = `
                    update ksv_po_getseq
                    set
                        seq = seq + 1
                    where
                        po = '${tPoType1}'
                        and yy = ${tPoYY}
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tUpdatePoNumSql));
                tSQLArray.push(tSQL99_1);
            }

            let tSql0 = `
                select
                    isnull(max(seq), 0) as cnt
                from
                    ksv_order_mst
                where
                    yy = ${tPoYY}
                    and left(order_cd, 2) = '${args.datas.BUYER_CD}'
            `;
            let nRet = await prisma.$queryRaw(Prisma.raw(tSql0));
            var tOrderNum = nRet[0].cnt + 1;

            var tZero = '0000';
            var tNewOrderCd =
                args.datas.BUYER_CD +
                String(tPoYY_2) +
                tHypon +
                'S' +
                tZero.substring(0, 4 - String(tOrderNum).length) +
                tOrderNum;
            var tNewPoCd = '';

            if (objUser.company_code === 'nsr') {
                tNewPoCd =
                    tPO +
                    wPoType +
                    String(tPoYY_2) +
                    'N' +
                    tZero.substring(0, 4 - String(tPoNum).length) +
                    tPoNum;
            } else if (args.datas.PO_TYPE === '2') {
                tNewPoCd =
                    tPO +
                    wPoType +
                    String(tPoYY_2) +
                    'L' +
                    tZero.substring(0, 4 - String(tPoNum).length) +
                    tPoNum;
            } else {
                tNewPoCd =
                    tPO +
                    wPoType +
                    String(tPoYY_2) +
                    'S' +
                    tZero.substring(0, 4 - String(tPoNum).length) +
                    tPoNum;
            }

            var tNewPoSeq = 1;
            var tMrpSeq0 = 0;
            if (args.datas.PO_CD !== '') {
                tNewOrderCd = args.datas.ORDER_CD;
                tNewPoCd = args.datas.PO_CD;
                // tNewPoSeq = parseInt(args.datas1[0].PO_SEQ);
                tNewPoSeq = parseInt(args.datas.PO_SEQ);

                let tSql0_1 = `
                    select
                        max(mrp_seq) as max_seq
                    from
                        ksv_po_mrp
                    where
                        po_cd = '${args.datas.PO_CD}'
                `;
                let nRet0_1 = await prisma.$queryRaw(Prisma.raw(tSql0_1));
                if (nRet0_1.length > 0) tMrpSeq0 = nRet0_1[0].max_seq;
            }

            var tInsSql0 = `
                INSERT INTO
                    KSV_ORDER_MST (
                        ORDER_CD,
                        STYLE_CD,
                        YY,
                        SEQ,
                        TOT_CNT,
                        AVR_PRICE,
                        FC_PRICE,
                        MATL_AMT,
                        ETC_AMT,
                        COMMISSION,
                        ORDER_DATE,
                        DUE_DATE,
                        FACTORY_CD,
                        SIZE_GROUP,
                        ORDER_FLAG,
                        SAMPLE_FLAG,
                        fac_lc_flag,
                        ORDER_STATUS,
                        END_DATETIME,
                        REMARK,
                        REF_ORDER_NO,
                        REF_Q_OUTER,
                        REF_Q_LINER,
                        REF_ORDER_REQ,
                        REF_COLOR1,
                        REF_COLOR2,
                        REF_SIZE1,
                        REF_SIZE2,
                        REF_QTY1,
                        REF_QTY2,
                        nat_cd,
                        STATUS_CD,
                        REG_USER,
                        REG_DATETIME,
                        UPD_USER,
                        UPD_DATETIME,
                        CURR_CD,
                        USD_PRICE
                    )
                VALUES
                    (
                        '${tNewOrderCd}',
                        '00-0000',
                        ${tPoYY},
                        ${tOrderNum},
                        1,
                        0,
                        0,
                        0,
                        0,
                        0,
                        '${tRetDate1}',
                        '${tRetDate1}',
                        '${args.datas.FACTORY_CD}',
                        'G158',
                        '0',
                        '${tSampleFlag}',
                        '${tFactoryLc}',
                        '3',
                        '',
                        '${args.datas.END_REMARK}',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '0',
                        '${tUserInfo.USER_ID}',
                        '${tRetDate}',
                        '',
                        '',
                        'USD',
                        0
                    )
            `;
            if (args.datas.PO_CD === '') {
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tInsSql0));
                tSQLArray.push(tSQL99_1);
            }

            var tInsSql0_1 = `
                insert into
                    ksv_order_fob (order_cd, fob_seq, ship_qty, fob, fob100)
                values
                    ('${tNewOrderCd}', '1', '1', '0', '0')
            `;
            if (args.datas.PO_CD === '') {
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tInsSql0_1));
                tSQLArray.push(tSQL99_1);
            }

            var tInsSql1 = `
                INSERT INTO
                    KSV_PO_MEM (PO_CD, PO_SEQ, ORDER_CD)
                VALUES
                    ('${tNewPoCd}', ${tNewPoSeq}, '${tNewOrderCd}')
            `;
            if (args.datas.PO_CD === '') {
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tInsSql1));
                tSQLArray.push(tSQL99_1);
            }

            var tInsSql2 = `
                INSERT INTO
                    KSV_PO_MST (
                        PO_CD,
                        PO_SEQ,
                        PO_TYPE,
                        PO_DATE,
                        PO_STATUS,
                        MATL_DUE_DATE,
                        PROD_DUE_DATE,
                        po_conf_date,
                        PLACE_CD,
                        CURR_DATE,
                        YY,
                        SEQ,
                        factory_cd,
                        delivery_type,
                        STATUS_CD,
                        REG_USER,
                        REG_DATETIME,
                        PURCHASE_REQUEST
                    )
                VALUES
                    (
                        '${tNewPoCd}',
                        ${tNewPoSeq},
                        '${tPoType}',
                        '${tRetDate1}',
                        '4',
                        '${args.datas.MATERIAL_DUE_DATE}',
                        '${args.datas.DELIVERY_DATE}',
                        '${tRetDate1}',
                        '${args.datas.PLACE_CD}',
                        '${tRetDate1}',
                        ${tPoYY},
                        ${tPoNum},
                        '${args.datas.FACTORY_CD}',
                        '',
                        '0',
                        '${tUserInfo.USER_ID}',
                        '${tRetDate}',
                        '1'
                    )
            `;

            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tInsSql2));
            tSQLArray.push(tSQL99_1);

            var tInObj = {};
            tInObj.po_cd = tNewPoCd;
            tInObj.buyer_cd = tNewOrderCd.substring(0, 2);
            tInObj.factory_cd = args.datas.FACTORY_CD;
            tInObj.reg_user = tUserInfo.USER_ID;
            tInObj.reg_datetime = tRetDate;
            tInObj.status_cd = '0';
            let tInsSql99 = AFLib.createTableSql('ksv_po_worklist', tInObj);
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tInsSql99));
            tSQLArray.push(tSQL99_1);

            var tInsSql3 = '';
            var saveMrpSeq = 0;
            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas1.length; tIdx++) {
                var col = { ...args.datas1[tIdx] };
                console.log(`==========> Step-1`);
                let tSql_curr = `
                    select
                        *
                    from
                        kcd_currency
                    where
                        curr_cd = '${col.CURR_CD}'
                        and start_date = '${tRetDate1}'
                `;
                let nRet_curr = await prisma.$queryRaw(Prisma.raw(tSql_curr));
                if (nRet_curr.length <= 0) {
                    var tSql_curr_1 = `
                        select
                            *
                        from
                            kcd_currency
                        where
                            curr_cd = '${col.CURR_CD}'
                            and start_date = (
                                select
                                    max(start_date) as start_date
                                from
                                    kcd_currency
                                where
                                    curr_cd = '${col.CURR_CD}'
                            )
                    `;
                    nRet_curr = await prisma.$queryRaw(Prisma.raw(tSql_curr_1));
                }
                console.log(`==========> Step-2`);
                if (nRet_curr.length <= 0) {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = 'ERROR:Check currnecye';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }
                console.log(`==========> Step-3`);

                var tMrpSeq = tMrpSeq0 + tIdx + 1;
                var tTotAmt = parseInt(col.PO_QTY) * parseFloat(col.MATL_PRICE);
                var tUsdAmt = tTotAmt * parseFloat(nRet_curr[0].USD_RATE);
                var tStockIdx = col.STOCK_IDX;
                var tUsePoType = '1';
                var tDiffPoType = '0';

                var tUseQty = 0;
                var tPoQty = 0;
                var tStockQty = 0;
                var tPoMatlCd = '';
                console.log(`==========> Step-4`);

                if (col.PO_TYPE_NAME === '발주') {
                    tTotAmt =
                        parseFloat(col.PO_QTY) * parseFloat(col.MATL_PRICE);
                    tUsdAmt = tTotAmt * parseFloat(nRet_curr[0].USD_RATE);
                    tStockIdx = '';
                    tUsePoType = '1';
                    tDiffPoType = '0';
                    tUseQty = parseFloat(col.PO_QTY);
                    tPoQty = parseFloat(col.PO_QTY);
                    tStockQty = 0;
                    tPoMatlCd = '';
                } else if (col.PO_TYPE_NAME === '재고사용') {
                    tTotAmt = '0';
                    tUsdAmt = '0';
                    tStockIdx = col.STOCK_IDX;
                    tUsePoType = '1';
                    tDiffPoType = '0';
                    tUseQty = parseFloat(col.PO_QTY);
                    tPoQty = 0;
                    tStockQty = tUseQty;
                    tPoMatlCd = '재고발주';
                } else {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = 'ERROR:Check Po Type';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }
                console.log(`==========> Step-5`);

                var tInSql = {};
                tInSql.po_cd = tNewPoCd;
                tInSql.po_seq = tNewPoSeq;
                tInSql.order_cd = tNewOrderCd;
                tInSql.matl_cd = col.MATL_CD;
                tInSql.mrp_seq = tMrpSeq;
                tInSql.matl_seq = col.MATL_SEQ;
                tInSql.matl_price = col.MATL_PRICE;
                tInSql.use_size = '';
                tInSql.use_qty = tUseQty;
                tInSql.po_qty = tPoQty;
                tInSql.diff_qty = '0';
                tInSql.use_po_type = tUsePoType;
                tInSql.diff_po_type = tDiffPoType;
                tInSql.change_reason = '';
                tInSql.curr_cd = col.CURR_CD;
                tInSql.tot_amt = tTotAmt;
                tInSql.curr_date = tRetDate1;
                tInSql.usd_amt = tUsdAmt;
                tInSql.status_cd = '0';
                tInSql.reg_user = tUserInfo.USER_ID;
                tInSql.reg_datetime = tRetDate;
                tInSql.reason_type = col.REASON_TYPE;
                tInSql.fare_type = col.FARE_TYPE;
                tInSql.remark = col.REMARK;
                tInSql.stock_idx = tStockIdx;
                tInSql.po_matl_cd = tPoMatlCd;
                let tSQL99_1 = AFLib.createTableSql('ksv_po_mrp', tInSql);
                const tSQL99 = prisma.$queryRaw(Prisma.raw(tSQL99_1));
                tSQLArray.push(tSQL99);
                saveMrpSeq = tMrpSeq;
                tMrpSeq += 1;

                if (col.PO_TYPE_NAME === '발주') {
                    tSql = `
                        INSERT INTO
                            KSV_STOCK_MEM (
                                PO_CD,
                                PO_SEQ,
                                ORDER_CD,
                                MATL_CD,
                                MRP_SEQ,
                                MATL_SEQ,
                                PO_QTY,
                                IN_QTY,
                                OUT_QTY,
                                INFAC_QTY,
                                OUTFAC_QTY,
                                REMAIN_QTY,
                                use_qty,
                                FACTORY_CD,
                                DIFF_PO_TYPE,
                                diff_qty,
                                STOCK_STATUS,
                                STATUS_CD,
                                REG_USER,
                                REG_DATETIME
                            )
                        VALUES
                            (
                                '${tInSql.po_cd}',
                                ${tInSql.po_seq},
                                '${tInSql.order_cd}',
                                '${tInSql.matl_cd}',
                                ${tInSql.mrp_seq},
                                ${tInSql.matl_seq},
                                ${tPoQty},
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                '${args.datas.FACTORY_CD}',
                                '0',
                                0,
                                '0',
                                '0',
                                '${tUserInfo.USER_ID}',
                                '${tRetDate}'
                            );
                    `;
                    tInsSql3 += tSql;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSql));
                    tSQLArray.push(tSQL99_1);
                }
                console.log(`==========> Step-6`);

                if (col.PO_TYPE_NAME === '발주' && args.datas.PO_TYPE === '1') {
                    // Storage
                    // 새로운 Stock Cd 을 생성
                    var tInsSql99 = '';
                    let tSql0 = `
                        select
                            idx
                        from
                            ksv_stock_idx
                    `;
                    let nRet = await prisma.$queryRaw(Prisma.raw(tSql0));
                    var tNewStockIdx0 = nRet[0].idx + 1;
                    var tZero_10 = '0000000000';
                    var tNewStockIdx =
                        'S' +
                        tZero_10.substring(
                            0,
                            10 - String(tNewStockIdx0).length,
                        ) +
                        tNewStockIdx0;

                    let tUpdateStockIdxSql = `
                        update ksv_stock_idx
                        set
                            idx = idx + 1
                    `;
                    const tSQL99_1 = await prisma.$queryRaw(
                        Prisma.raw(tUpdateStockIdxSql),
                    );

                    tSql = `
                        insert into
                            ksv_stock_matl (
                                stock_idx,
                                po_cd,
                                po_seq,
                                order_cd,
                                matl_cd,
                                mrp_seq,
                                matl_seq,
                                stock_qty,
                                remain_qty,
                                use_qty,
                                out_qty,
                                factory_cd,
                                stock_status,
                                stock_date,
                                remark,
                                remark0,
                                reason_remark,
                                status_cd,
                                reg_user,
                                reg_datetime,
                                root_idx
                            )
                        values
                            (
                                '${tNewStockIdx}',
                                '${tInSql.po_cd}',
                                ${tInSql.po_seq},
                                '${tInSql.order_cd}',
                                '${tInSql.matl_cd}',
                                ${tInSql.mrp_seq},
                                '${tInSql.matl_seq}',
                                ${tPoQty},
                                ${tPoQty},
                                '0',
                                '0',
                                '${args.datas.FACTORY_CD}',
                                'R',
                                '${tRetDate1}',
                                'STORAGE',
                                'STORAGE',
                                '00',
                                '0',
                                '${tUserInfo.USER_ID}',
                                '${tRetDate}',
                                '${tNewStockIdx}'
                            )
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSql));
                    tSQLArray.push(tSQL99_1);

                    tSql = `
                        update ksv_po_mrp
                        set
                            stock_idx = '${tNewStockIdx}'
                        where
                            po_cd = '${tInSql.po_cd}'
                            and po_seq = '${tInSql.po_seq}'
                            and order_cd = '${tInSql.order_cd}'
                            and matl_cd = '${tInSql.matl_cd}'
                            and mrp_seq = '${tInSql.mrp_seq}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSql));
                    tSQLArray.push(tSQL99_1);
                }

                console.log(`==========> Step-7`);

                if (col.PO_TYPE_NAME === '재고사용') {
                    let tSql_stock = `
                        select
                            a.*,
                            b.MATL_PRICE
                        from
                            ksv_stock_matl a,
                            kcd_matl_mem b
                        where
                            a.stock_idx = '${tStockIdx}'
                            and a.matl_cd = b.matl_cd
                            and a.matl_seq = b.matl_seq
                    `;
                    let nRet_stock = await prisma.$queryRaw(
                        Prisma.raw(tSql_stock),
                    );
                    if (nRet_stock.length <= 0) {
                        var tRetArray = [];
                        var tObj = {};
                        tObj.CODE = 'ERROR:Check Stock Idx';
                        tObj.id = 0;
                        tRetArray.push(tObj);
                        return tRetArray;
                    }

                    var tStockObj = { ...nRet_stock[0] };

                    if (
                        parseFloat(col.PO_QTY) >
                        parseFloat(tStockObj.REMAIN_QTY)
                    ) {
                        var tRetArray = [];
                        var tObj = {};
                        tObj.CODE = 'ERROR:Check Stock Remain Qty';
                        tObj.id = 0;
                        tRetArray.push(tObj);
                        return tRetArray;
                    }

                    var tRemainQty =
                        parseFloat(col.PO_QTY) -
                        parseFloat(tStockObj.REMAIN_QTY);

                    tTotAmt = '0';
                    tUsdAmt = '0';
                    tStockIdx = tStockIdx;
                    tUsePoType = '2';
                    tDiffPoType = '0';
                    tUseQty = parseFloat(col.PO_QTY);
                    tPoQty = parseFloat(col.PO_QTY);
                    tPoMatlCd = col.MATL_CD;

                    tInSql = {};
                    tInSql.po_cd = tNewPoCd;
                    tInSql.po_seq = tNewPoSeq;
                    tInSql.order_cd = tNewOrderCd;
                    tInSql.matl_cd = col.MATL_CD;
                    tInSql.mrp_seq = tMrpSeq;
                    tInSql.matl_seq = col.MATL_SEQ;
                    tInSql.matl_price = col.MATL_PRICE;
                    tInSql.use_size = '';
                    tInSql.use_qty = tUseQty;
                    tInSql.po_qty = tPoQty;
                    tInSql.diff_qty = '0';
                    tInSql.use_po_type = tUsePoType;
                    tInSql.diff_po_type = tDiffPoType;
                    tInSql.change_reason = '';
                    tInSql.curr_cd = col.CURR_CD;
                    tInSql.tot_amt = tTotAmt;
                    tInSql.curr_date = tRetDate1;
                    tInSql.usd_amt = tUsdAmt;
                    tInSql.status_cd = '0';
                    tInSql.reg_user = tUserInfo.USER_ID;
                    tInSql.reg_datetime = tRetDate;
                    tInSql.reason_type = col.REASON_TYPE;
                    tInSql.fare_type = col.FARE_TYPE;
                    tInSql.remark = col.REMARK;
                    tInSql.stock_idx = tStockIdx;
                    tInSql.po_matl_cd = tPoMatlCd;
                    tInSql.po_mrp_seq = saveMrpSeq;
                    let tSQL99_1 = AFLib.createTableSql('ksv_po_mrp', tInSql);
                    const tSQL99 = prisma.$queryRaw(Prisma.raw(tSQL99_1));
                    tSQLArray.push(tSQL99);
                    saveMrpSeq = tMrpSeq;
                    tMrpSeq += 1;

                    var tSql = `
                        update ksv_stock_matl
                        set
                            remain_qty = remain_qty - ${tUseQty},
                            use_qty = use_qty + ${tUseQty}
                        where
                            stock_idx = '${tStockIdx}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSql));
                    tSQLArray.push(tSQL99_1);

                    /*
                tInSql.po_cd = tNewPoCd;
                tInSql.po_seq = tNewPoSeq ;
                tInSql.order_cd = tNewOrderCd;
                tInSql.matl_cd = col.MATL_CD; 
                tInSql.mrp_seq = tMrpSeq;
                tInSql.matl_seq = col.MATL_SEQ;
                */

                    tSql = `
                        insert into
                            ksv_stock_use (
                                stock_idx,
                                use_datetime,
                                use_qty,
                                use_po_cd,
                                use_po_seq,
                                use_order_cd,
                                use_matl_cd,
                                use_mrp_seq,
                                use_matl_seq,
                                factory_cd,
                                status_cd,
                                reg_user,
                                reg_datetime
                            )
                        values
                            (
                                '${tStockObj.STOCK_IDX}',
                                '${tRetDate}',
                                ${tUseQty},
                                '${tInSql.po_cd}',
                                ${tInSql.po_seq},
                                '${tInSql.order_cd}',
                                '${tInSql.matl_cd}',
                                ${tInSql.mrp_seq},
                                ${tInSql.matl_seq},
                                '${args.datas.FACTORY_CD}',
                                '0',
                                '${tUserInfo.USER_ID}',
                                '${tRetDate}'
                            );
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSql));
                    tSQLArray.push(tSQL99_1);
                }
                console.log(`==========> Step-8`);
            }

            var tInsSql4 = `
                INSERT INTO
                    KSV_STOCK_MST (
                        PO_CD,
                        PO_SEQ,
                        IN_FACTORY_CD,
                        OUT_FACTORY_CD,
                        STATUS_CD,
                        REG_DATETIME,
                        REG_USER
                    )
                VALUES
                    (
                        '${tNewPoCd}',
                        ${tNewPoSeq},
                        'FC010',
                        '${args.datas.FACTORY_CD}',
                        '0',
                        '${tRetDate}',
                        '${tUserInfo.USER_ID}'
                    )
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tInsSql4));
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
                tObj.CODE = `ERROR:${e.message}`;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            // 자재종합표
            const retPoMatlSample1 = await mrpMigration.runPoMatlListSample({
                poCd: tNewPoCd,
                userId: tUserInfo.USER_ID,
            });
            if (!retPoMatlSample1.ok)
                throw new Error(retPoMatlSample1.message || retPoMatlSample1.step);

            tSQLArray = [];
            var tSql1 = `
                select
                    a.po_cd,
                    b.vendor_cd,
                    count(*) as c_cnt
                from
                    ksv_po_mrp a,
                    kcd_matl_mst b
                where
                    a.po_cd = '${tNewPoCd}'
                    and a.matl_cd = b.matl_cd
                group by
                    a.po_cd,
                    b.vendor_cd
            `;
            var tRet1 = await prisma.$queryRaw(Prisma.raw(tSql1));
            var tIdx10 = 0;
            for (tIdx10 = 0; tIdx10 < tRet1.length; tIdx10++) {
                var col = { ...tRet1[tIdx10] };
                var tSql2 = `
                    select
                        count(*) as cnt
                    from
                        ksv_po_vendor
                    where
                        vendor_cd = '${col.vendor_cd}'
                        and po_cd = '${col.po_cd}'
                `;
                var tRet2 = await prisma.$queryRaw(Prisma.raw(tSql2));
                if (tRet2.length > 0 && tRet2[0].cnt > 0);
                else {
                    tSql = `
                        insert INTO
                            KSV_po_vendor (PO_CD, vendor_cd, end_date)
                        VALUES
                            ('${tNewPoCd}', '${col.vendor_cd}', '');
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSql));
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
                tObj.CODE = `SUCCEED:${tNewPoCd}:${tNewPoSeq}:${tNewOrderCd}`;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = `ERROR:${e.message}`;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },

        mgrDeletePo_S030506_03: async (_, args, contextValue) => {
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
            var tRetDate1 = tRetDate.substring(0, 8);
            var tYY = 'B' + yyyy.toString().substring(2) + '-';

            var tSQLArray = [];

            if (args.datas.BUYER_CD === '') {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:You must input BUYER_CD';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            if (args.datas.PO_CD === '') {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:PO_CD가 입력되지 않았습니다';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            // let tPO = "POA2022S672";
            var tUserInfo = AFLib.getUserInfo(contextValue);

            let sql_purchase = `
                select
                    *
                from
                    ksv_pu_mst2
                where
                    po_cd2 like '%${args.datas.PO_CD}%'
            `;
            let ret_purchase = await prisma.$queryRaw(Prisma.raw(sql_purchase));
            if (ret_purchase.length > 0) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE =
                    'ERROR:PO가 발주진행중(purchase)이면 삭제할수 없습니다';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            let sql_stsin = `
                select
                    *
                from
                    ksv_stock_in
                where
                    po_cd = '${args.datas.PO_CD}'
            `;
            let ret_stsin = await prisma.$queryRaw(Prisma.raw(sql_stsin));
            if (ret_stsin.length > 0) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE =
                    'ERROR:PO가 구매진행중(STS-IN)이면 삭제할수 없습니다';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            let sql_stsout = `
                select
                    *
                from
                    ksv_stock_out
                where
                    po_cd = '${args.datas.PO_CD}'
            `;
            let ret_stsout = await prisma.$queryRaw(Prisma.raw(sql_stsout));
            if (ret_stsout.length > 0) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE =
                    'ERROR:PO가 출고진행중(STS-OUt)이면 삭제할수 없습니다';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            let sql_pomst = `
                select
                    *
                from
                    ksv_po_mst
                where
                    po_cd = '${args.datas.PO_CD}'
            `;
            let ret_pomst = await prisma.$queryRaw(Prisma.raw(sql_pomst));

            let sql_pomem = `
                select
                    *
                from
                    ksv_po_mem
                where
                    po_cd = '${args.datas.PO_CD}'
                    and po_seq = 1
            `;
            let ret_pomem = await prisma.$queryRaw(Prisma.raw(sql_pomem));

            if (ret_pomem.length > 0) {
                let sql_ordermst = `
                    select
                        *
                    from
                        ksv_order_mst
                    where
                        order_cd = '${ret_pomem[0].ORDER_CD}'
                `;
                let ret_ordermst = await prisma.$queryRaw(
                    Prisma.raw(sql_ordermst),
                );

                if (
                    ret_ordermst[0].ORDER_STATUS === '8' ||
                    ret_ordermst[0].ORDER_STATUS === '9'
                ) {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = 'ERROR:end된  Order는 삭제할수 없습니다 ';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }

                var sql_del_ordermst = `
                    delete from ksv_order_mst
                    where
                        order_cd = '${ret_pomem[0].ORDER_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(sql_del_ordermst));
                tSQLArray.push(tSQL99_1);

                var sql_del_orderfob = `
                    delete from ksv_order_fob
                    where
                        order_cd = '${ret_pomem[0].ORDER_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(sql_del_orderfob));
                tSQLArray.push(tSQL99_1);

                var sql_del_pomem = `
                    delete from ksv_po_mem
                    where
                        po_cd = '${ret_pomem[0].PO_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(sql_del_pomem));
                tSQLArray.push(tSQL99_1);

                var sql_del_pomst = `
                    delete from ksv_po_mst
                    where
                        po_cd = '${ret_pomem[0].PO_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(sql_del_pomst));
                tSQLArray.push(tSQL99_1);

                var sql_del_poworklist = `
                    delete from ksv_po_worklist
                    where
                        po_cd = '${ret_pomem[0].PO_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(
                    Prisma.raw(sql_del_poworklist),
                );
                tSQLArray.push(tSQL99_1);
            }

            let sql_pomrp = `
                select
                    *
                from
                    ksv_po_mrp
                where
                    po_cd = '${args.datas.PO_CD}'
            `;
            let ret_pomrp = await prisma.$queryRaw(Prisma.raw(sql_pomrp));

            var tIdx = 0;
            for (tIdx = 0; tIdx < ret_pomrp.length; tIdx++) {
                var col = { ...ret_pomrp[tIdx] };

                if (col.PO_QTY > 0 && col.USE_PO_TYPE === '1') {
                    var sql_del_pomrp = `
                        delete from ksv_po_mrp
                        where
                            po_cd = '${col.PO_CD}'
                            and matl_cd = '${col.MATL_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(
                        Prisma.raw(sql_del_pomrp),
                    );
                    tSQLArray.push(tSQL99_1);

                    var sql_del_stockmem = `
                        delete from ksv_stock_mem
                        where
                            po_cd = '${col.PO_CD}'
                            and matl_cd = '${col.MATL_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(
                        Prisma.raw(sql_del_stockmem),
                    );
                    tSQLArray.push(tSQL99_1);

                    var tStockIdx = 'non-stock-idx';
                    if (col.stock_idx) {
                        tStockIdx = col.stock_idx;
                    }

                    let sql_stockmatl = `
                        select
                            *
                        from
                            ksv_stock_matl
                        where
                            stock_idx = '${tStockIdx}'
                            -- where po_cd = '${col.PO_CD}'
                            -- and   po_seq = '${col.PO_SEQ}'
                            -- and   order_cd = '${col.ORDER_CD}'
                            -- and   matl_cd = '${col.MATL_CD}'
                            -- and   mrp_seq = '${col.MRP_SEQ}'
                    `;
                    let ret_stockmatl = await prisma.$queryRaw(
                        Prisma.raw(sql_stockmatl),
                    );
                    if (ret_stockmatl.length > 0) {
                        var tChk = 0;
                        var tUseStockIdx = 0;
                        ret_stockmatl.forEach((col9, i9) => {
                            if (parseFloat(col9.USE_QTY) > 0) {
                                tChk = 1;
                                tUseStockIdx = col9.stock_idx;
                            }
                        });
                        if (tChk === 1) {
                            var tRetArray = [];
                            var tObj = {};
                            tObj.CODE = `ERROR:${args.datas.PO_CD}:해당 PO로 생성된 재고가 사용중이라 취소할수 없습니다 . (${tUseStockIdx})`;
                            tObj.id = 0;
                            tRetArray.push(tObj);
                            return tRetArray;
                        }
                        let sql_del_stockmatl = `
                            delete from ksv_stock_matl
                            where
                                stock_idx = '${tStockIdx}'
                                -- where po_cd = '${col.PO_CD}'
                                -- and   po_seq = '${col.PO_SEQ}'
                                -- and   order_cd = '${col.ORDER_CD}'
                                -- and   matl_cd = '${col.MATL_CD}'
                                -- and   mrp_seq = '${col.MRP_SEQ}'
                        `;
                        const tSQL99_1 = prisma.$queryRaw(
                            Prisma.raw(sql_del_stockmatl),
                        );
                        tSQLArray.push(tSQL99_1);
                    }
                } else if (col.PO_QTY > 0 && col.USE_PO_TYPE === '2') {
                    var sql_del_pomrp = `
                        delete from ksv_po_mrp
                        where
                            po_cd = '${col.PO_CD}'
                            and matl_cd = '${col.MATL_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(
                        Prisma.raw(sql_del_pomrp),
                    );
                    tSQLArray.push(tSQL99_1);

                    var sql_del_stockuse = `
                        delete from ksv_stock_use
                        where
                            use_po_cd = '${col.PO_CD}'
                            and stock_idx = '${col.STOCK_IDX}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(
                        Prisma.raw(sql_del_stockuse),
                    );
                    tSQLArray.push(tSQL99_1);

                    var sql_up_stockmatl = `
                        update ksv_stock_matl
                        set
                            remain_qty = remain_qty + ${col.PO_QTY},
                            use_qty = use_qty - ${col.PO_QTY}
                        where
                            stock_idx = '${col.stock_idx}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(
                        Prisma.raw(sql_up_stockmatl),
                    );
                    tSQLArray.push(tSQL99_1);
                }
            }

            var sql_del_stockmst = `
                delete from ksv_stock_mst
                where
                    po_cd = '${args.datas.PO_CD}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(sql_del_stockmst));
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
                tObj.CODE = `SUCCEED Delete Po:${args.datas.PO_CD}`;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = `ERROR:${args.datas.PO_CD}:${e.message}`;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },

        mgrUpdatePo_S030506_03: async (_, args, contextValue) => {
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
            var tRetDate1 = tRetDate.substring(0, 8);
            var tYY = 'B' + yyyy.toString().substring(2) + '-';

            var tSQLArray = [];

            if (args.datas.BUYER_CD === '') {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:You must input BUYER_CD';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            if (args.datas.PO_CD === '') {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:PO_CD가 입력되지 않았습니다';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            // 새로운 Po Cd Seq 을 생성
            /*
            var tPoType1 = args.datas.PO_CD.substring(0, 2);
            let tSql0 = `
                SELECT
                    isnull(max(seq), 0) as cnt
                FROM
                    ksv_po_getseq
                WHERE
                    PO = '${tPoType1}'
                    and YY = ${tPoYY}
            `;
            let nRet = await prisma.$queryRaw(Prisma.raw(tSql0));
            var tPoNum = nRet[0].cnt + 1;

            let tUpdatePoNumSql = '';
            if (tPoNum === 1) {
                tUpdatePoNumSql = `
                    INSERT INTO
                        ksv_po_getseq (PO, YY, SEQ)
                    VALUES
                        ('${tPoType1}', ${tPoYY}, 1)
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tUpdatePoNumSql));
                tSQLArray.push(tSQL99_1);
            } else {
                tUpdatePoNumSql = `
                    update ksv_po_getseq
                    set
                        seq = seq + 1
                    where
                        po = '${tPoType1}'
                        and yy = ${tPoYY}
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tUpdatePoNumSql));
                tSQLArray.push(tSQL99_1);
            }
            */

            // let tPO = "POA2022S672";
            var tUserInfo = AFLib.getUserInfo(contextValue);

            /*
      let sql_purchase = `
          select
              *
          from
              ksv_pu_mst2
          where
              po_cd2 like '%${args.datas.PO_CD}%'
      `;
      let ret_purchase = await prisma.$queryRaw(Prisma.raw(sql_purchase));
      if (ret_purchase.length > 0) {
          var tRetArray = [];
          var tObj = {};
          tObj.CODE = 'ERROR:PO가 발주진행중(purchase)이면 수정할수 없습니다';
          tObj.id = 0; 
          tRetArray.push(tObj);
          return(tRetArray) ;
      } 
      */

            let sql_stsin = `
                select
                    *
                from
                    ksv_stock_in
                where
                    po_cd = '${args.datas.PO_CD}'
            `;
            let ret_stsin = await prisma.$queryRaw(Prisma.raw(sql_stsin));
            /*
            if (ret_stsin.length > 0) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE =
                    'ERROR:PO가 구매진행중(STS-IN)이면 수정할수 없습니다';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
            */

            let sql_stsout = `
                select
                    *
                from
                    ksv_stock_out
                where
                    po_cd = '${args.datas.PO_CD}'
            `;
            let ret_stsout = await prisma.$queryRaw(Prisma.raw(sql_stsout));
            /*
            if (ret_stsout.length > 0) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE =
                    'ERROR:PO가 출고진행중(STS-OUt)이면 수정할수 없습니다';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
            */

            let sql_pomst = `
                select
                    *
                from
                    ksv_po_mst
                where
                    po_cd = '${args.datas.PO_CD}'
            `;
            let ret_pomst = await prisma.$queryRaw(Prisma.raw(sql_pomst));

            let sql_pomem = `
                select
                    *
                from
                    ksv_po_mem
                where
                    po_cd = '${args.datas.PO_CD}'
                    and po_seq = 1
            `;
            let ret_pomem = await prisma.$queryRaw(Prisma.raw(sql_pomem));

            if (ret_pomem.length > 0) {
                var tSql = `
                    update ksv_po_mst
                    set
                        matl_due_date = '${args.datas.MATERIAL_DUE_DATE}'
                    where
                        po_cd = '${ret_pomem[0].PO_CD}'
                        and po_seq = 1
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSql));
                tSQLArray.push(tSQL99_1);

                if (args.datas.END_REMARK !== '') {
                    var tSql = `
                        update ksv_order_mst
                        set
                            remark = '${args.datas.END_REMARK}'
                        where
                            order_cd = '${ret_pomem[0].ORDER_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSql));
                    tSQLArray.push(tSQL99_1);
                }
            }

            // 올라온것 처리
            var tInsSql3 = '';
            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas1.length; tIdx++) {
                var col = { ...args.datas1[tIdx] };

                var chk_stsin = 0;
                var chk_stsout = 0;

                ret_stsin.forEach((col1, i1) => {
                    if (col1.PO_CD === args.datas.PO_CD && col1.MATL_CD === col.MATL_CD)  chk_stsin = 1;
                });

                ret_stsout.forEach((col1, i1) => {
                    if (col1.PO_CD === args.datas.PO_CD && col1.MATL_CD === col.MATL_CD)  chk_stsout = 1;
                });

                if (chk_stsin > 0 || chk_stsout > 0)  {
                    // STS-IN , STS-OUT 진행중인 항목은 수정 불가
                    continue;
                }

                let sql_pomrp = `
                    select
                        *
                    from
                        ksv_po_mrp
                    where
                        po_cd = '${args.datas.PO_CD}'
                        and matl_cd = '${col.MATL_CD}'
                        and use_po_type = '1'
                `;
                let ret_pomrp = await prisma.$queryRaw(Prisma.raw(sql_pomrp));

                if (ret_pomrp.length <= 0) {
                    // Insert
                    let tSql_curr = `
                        select
                            *
                        from
                            kcd_currency
                        where
                            curr_cd = '${col.CURR_CD}'
                            and start_date = '${tRetDate1}'
                    `;
                    let nRet_curr = await prisma.$queryRaw(
                        Prisma.raw(tSql_curr),
                    );

                    if (!nRet_curr.length) {
                        tSql_curr = `
                            select
                                *
                            from
                                kcd_currency
                            where
                                curr_cd = '${col.CURR_CD}'
                                and start_date = (
                                    select
                                        max(start_date) as start_date
                                    from
                                        kcd_currency
                                    where
                                        curr_cd = '${col.CURR_CD}'
                                )
                        `;
                        nRet_curr = await prisma.$queryRaw(
                            Prisma.raw(tSql_curr),
                        );
                    }

                    var tTotAmt =
                        parseInt(col.PO_QTY) * parseFloat(col.MATL_PRICE);
                    var tUsdAmt = tTotAmt * parseFloat(nRet_curr[0].USD_RATE);
                    var tStockIdx = col.STOCK_IDX;
                    var tUsePoType = '1';
                    var tDiffPoType = '0';
                    var tZero_10 = '0000000000';

                    tNewStockIdx =
                        'S' +
                        tZero_10.substring(
                            0,
                            10 - String(tNewStockIdx0).length,
                        ) +
                        tNewStockIdx0;

                    if (args.datas.PO_TYPE === '1') {
                        // Storage
                        tStockIdx = tNewStockIdx;
                        tNewStockIdx0 += 1;
                    }

                    var tInQty = parseFloat(col.PO_QTY);
                    var tOrgStockQty = parseFloat(col.STOCK_QTY);
                    var tPoQty = 0;
                    var tStockQty = 0;
                    if (tInQty > tOrgStockQty) {
                        tStockQty = tOrgStockQty;
                        tPoQty = tInQty - tOrgStockQty;
                    } else {
                        tPoQty = 0;
                        tStockQty = tInQty;
                    }

                    var tInSql = {};
                    let tMrpSeq = (
                        await prisma.$queryRaw(
                            Prisma.raw(`
                                select
                                    max(MRP_SEQ) + 1 as NEW_MRP_SEQ
                                from
                                    ksv_po_mrp
                                where
                                    po_cd = '${args.datas.PO_CD}'
                            `),
                        )
                    )[0].NEW_MRP_SEQ;

                    var saveMrpSeq = 0;
                    tInSql.po_cd = args.datas.PO_CD;
                    tInSql.po_seq = args.datas.PO_SEQ;
                    tInSql.order_cd = args.datas.ORDER_CD;
                    tInSql.matl_cd = col.MATL_CD;
                    tInSql.mrp_seq = tMrpSeq;
                    tInSql.matl_seq = col.MATL_SEQ;
                    tInSql.matl_price = col.MATL_PRICE;
                    tInSql.use_size = '';
                    tInSql.use_qty = tInQty;
                    tInSql.po_qty = tPoQty;
                    tInSql.diff_qty = '0';
                    tInSql.use_po_type = tUsePoType;
                    tInSql.diff_po_type = tDiffPoType;
                    tInSql.change_reason = '';
                    tInSql.curr_cd = col.CURR_CD;
                    tInSql.tot_amt = tTotAmt;
                    tInSql.curr_date = tRetDate1;
                    tInSql.usd_amt = tUsdAmt;
                    tInSql.status_cd = '0';
                    tInSql.reg_user = tUserInfo.USER_ID;
                    tInSql.reg_datetime = tRetDate;
                    tInSql.reason_type = col.REASON_TYPE;
                    tInSql.fare_type = col.FARE_TYPE;
                    tInSql.remark = col.REMARK;
                    tInSql.stock_idx = tStockIdx;
                    if (tStockQty > 0) tInSql.po_matl_cd = '재고발주';
                    else tInSql.po_matl_cd = '';
                    let tSQL99_1 = AFLib.createTableSql('ksv_po_mrp', tInSql);
                    const tSQL99 = prisma.$queryRaw(Prisma.raw(tSQL99_1));
                    tSQLArray.push(tSQL99);
                    saveMrpSeq = tMrpSeq;
                    tMrpSeq += 1;

                    if (tStockQty > 0) {
                        let tSql_stock = `
                            select
                                a.*,
                                b.MATL_PRICE
                            from
                                ksv_stock_matl a,
                                kcd_matl_mem b
                            where
                                a.matl_cd = '${col.MATL_CD}'
                                and a.remain_qty > 0
                                and a.matl_cd = b.matl_cd
                                and a.matl_seq = b.matl_seq
                        `;
                        let nRet_stock = await prisma.$queryRaw(
                            Prisma.raw(tSql_stock),
                        );

                        var tRemainQty = tStockQty;

                        var tIdx9 = 0;
                        for (tIdx9 = 0; tIdx9 < nRet_stock.length; tIdx9++) {
                            var tStockObj = { ...nRet_stock[tIdx9] };

                            if (tRemainQty <= 0) break;

                            var tUpdateQty = 0;
                            if (parseFloat(tStockObj.REMAIN_QTY) > tRemainQty) {
                                tUpdateQty = tRemainQty;
                            } else {
                                tUpdateQty = parseFloat(tStockObj.REMAIN_QTY);
                            }
                            tRemainQty -= tUpdateQty;

                            tTotAmt =
                                parseInt(tUpdateQty) *
                                parseFloat(col.MATL_PRICE);
                            tUsdAmt =
                                tTotAmt * parseFloat(nRet_curr[0].USD_RATE);

                            var tInSql = {};
                            tInSql.po_cd = args.datas.PO_CD;
                            tInSql.po_seq = args.datas.PO_SEQ;
                            tInSql.order_cd = args.datas.ORDER_CD;
                            tInSql.matl_cd = tStockObj.MATL_CD;
                            tInSql.mrp_seq = tMrpSeq;
                            tInSql.matl_seq = tStockObj.MATL_SEQ;
                            tInSql.matl_price = tStockObj.MATL_PRICE;
                            tInSql.use_size = '';
                            tInSql.use_qty = tUpdateQty;
                            tInSql.po_qty = tUpdateQty;
                            tInSql.diff_qty = '0';
                            tInSql.use_po_type = '2';
                            tInSql.diff_po_type = '0';
                            tInSql.change_reason = '';
                            tInSql.curr_cd = col.CURR_CD;
                            tInSql.tot_amt = tTotAmt;
                            tInSql.curr_date = tRetDate1;
                            tInSql.usd_amt = tUsdAmt;
                            tInSql.status_cd = '0';
                            tInSql.reg_user = tUserInfo.USER_ID;
                            tInSql.reg_datetime = tRetDate;
                            tInSql.reason_type = col.REASON_TYPE;
                            tInSql.fare_type = col.FARE_TYPE;
                            tInSql.remark = col.REMARK;
                            tInSql.stock_idx = tStockObj.STOCK_IDX;
                            tInSql.po_matl_cd = col.MATL_CD;
                            tInSql.po_mrp_seq = saveMrpSeq;
                            let tSQL99_1 = AFLib.createTableSql(
                                'ksv_po_mrp',
                                tInSql,
                            );
                            const tSQL99 = prisma.$queryRaw(
                                Prisma.raw(tSQL99_1),
                            );
                            tSQLArray.push(tSQL99);

                            tMrpSeq += 1;

                            var tSql = `
                                update ksv_stock_matl
                                set
                                    remain_qty = remain_qty - ${tUpdateQty},
                                    use_qty = use_qty + ${tUpdateQty}
                                where
                                    stock_idx = '${tStockObj.STOCK_IDX}'
                            `;
                            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSql));
                            tSQLArray.push(tSQL99_1);

                            tSql = `
                                insert into
                                    ksv_stock_use (
                                        stock_idx,
                                        use_datetime,
                                        use_qty,
                                        use_po_cd,
                                        use_po_seq,
                                        use_order_cd,
                                        use_matl_cd,
                                        use_mrp_seq,
                                        use_matl_seq,
                                        factory_cd,
                                        status_cd,
                                        reg_user,
                                        reg_datetime
                                    )
                                values
                                    (
                                        '${tStockObj.STOCK_IdX}',
                                        '${tRetDate}',
                                        ${tUpdateQty},
                                        '${tInSql.po_cd}',
                                        ${tInSql.po_seq},
                                        '${tInSql.order_cd}',
                                        '${tInSql.matl_cd}',
                                        ${tInSql.mrp_seq},
                                        ${tInSql.matl_seq},
                                        '${args.datas.FACTORY_CD}',
                                        '0',
                                        '${tUserInfo.USER_ID}',
                                        '${tRetDate}'
                                    );
                            `;
                            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSql));
                            tSQLArray.push(tSQL99_1);
                        }
                    }

                    if (tPoQty > 0) {
                        tSql = `
                            INSERT INTO
                                KSV_STOCK_MEM (
                                    PO_CD,
                                    PO_SEQ,
                                    ORDER_CD,
                                    MATL_CD,
                                    MRP_SEQ,
                                    MATL_SEQ,
                                    PO_QTY,
                                    IN_QTY,
                                    OUT_QTY,
                                    INFAC_QTY,
                                    OUTFAC_QTY,
                                    REMAIN_QTY,
                                    use_qty,
                                    FACTORY_CD,
                                    DIFF_PO_TYPE,
                                    diff_qty,
                                    STOCK_STATUS,
                                    STATUS_CD,
                                    REG_USER,
                                    REG_DATETIME
                                )
                            VALUES
                                (
                                    '${args.datas.PO_CD}',
                                    ${args.datas.PO_SEQ},
                                    '${args.datas.ORDER_CD}',
                                    '${col.MATL_CD}',
                                    ${tMrpSeq},
                                    ${col.MATL_SEQ},
                                    ${col.PO_QTY},
                                    0,
                                    0,
                                    0,
                                    0,
                                    0,
                                    0,
                                    '${args.datas.FACTORY_CD}',
                                    '0',
                                    0,
                                    '0',
                                    '0',
                                    '${tUserInfo.USER_ID}',
                                    '${tRetDate}'
                                );
                        `;
                        tInsSql3 += tSql;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSql));
                        tSQLArray.push(tSQL99_1);
                    }

                    if (args.datas.PO_TYPE === '1') {
                        // Storage
                        // 새로운 Stock Cd 을 생성
                        var tInsSql99 = '';
                        let nRet = await prisma.$queryRaw(
                            Prisma.raw(`
                                select
                                    idx
                                from
                                    ksv_stock_idx
                            `),
                        );
                        var tNewStockIdx0 = nRet[0].idx + 1;
                        var tZero_10 = '0000000000';
                        var tNewStockIdx =
                            'S' +
                            tZero_10.substring(
                                0,
                                10 - String(tNewStockIdx0).length,
                            ) +
                            tNewStockIdx0;

                        let tUpdateStockIdxSql = `
                            update ksv_stock_idx
                            set
                                idx = idx + 1
                        `;
                        const tSQL99_1 = await prisma.$queryRaw(
                            Prisma.raw(tUpdateStockIdxSql),
                        );

                        tSql = `
                            insert into
                                ksv_stock_matl (
                                    stock_idx,
                                    po_cd,
                                    po_seq,
                                    order_cd,
                                    matl_cd,
                                    mrp_seq,
                                    matl_seq,
                                    stock_qty,
                                    remain_qty,
                                    use_qty,
                                    factory_cd,
                                    stock_status,
                                    stock_date,
                                    remark,
                                    remark0,
                                    reason_remark,
                                    status_cd,
                                    reg_user,
                                    reg_datetime,
                                    root_idx
                                )
                            values
                                (
                                    '${tNewStockIdx}',
                                    '${args.datas.PO_CD}',
                                    ${args.datas.PO_SEQ},
                                    '${args.datas.ORDER_CD}',
                                    '${col.MATL_CD}',
                                    ${tMrpSeq},
                                    '${col.MATL_SEQ}',
                                    ${col.PO_QTY},
                                    ${col.PO_QTY},
                                    '0',
                                    '${args.datas.FACTORY_CD}',
                                    'R',
                                    '${tRetDate1}',
                                    'STORAGE',
                                    'STORAGE',
                                    '00',
                                    '0',
                                    '${tUserInfo.USER_ID}',
                                    '${tRetDate}',
                                    '${tNewStockIdx}'
                                )
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSql));
                        tSQLArray.push(tSQL99_1);
                    }
                } else {
                    // update
                    var saveObj = { ...ret_pomrp[0] };

                    var tOldPoQty = 0;
                    var tOldUseQty = 0;
                    var tDiffQty = 0;
                    var tNewPoQty = 0;
                    var tNewUseQty = 0;
                    if (parseFloat(col.STOCK_QTY) > 0) {
                        tOldPoQty = parseFloat(saveObj.PO_QTY);
                        tOldUseQty = parseFloat(saveObj.USE_QTY);

                        tDiffQty = parseFloat(col.PO_QTY) - tOldUseQty;

                        tNewPoQty = parseFloat(col.PO_QTY) - parseFloat(col.STOCK_QTY);
                        tNewUseQty = parseFloat(col.PO_QTY);
                    } else {
                        tOldPoQty = parseFloat(saveObj.PO_QTY);
                        tOldUseQty = parseFloat(saveObj.USE_QTY);
                        tDiffQty = parseFloat(col.PO_QTY) - tOldPoQty;
                        tNewPoQty = parseFloat(col.PO_QTY);
                        tNewUseQty = parseFloat(col.PO_QTY);
                    }

                    if (tNewPoQty < 0) {
                        var tRetArray = [];
                        var tObj = {};
                        tObj.CODE = `ERROR:재고보다 적게 수량을 조정할수 없습니다  `;
                        tObj.id = 0;
                        tRetArray.push(tObj);
                        return (tRetArray);
                    }

                    var tPoMrpObj = { ...ret_pomrp[0] };

                    var tSql = `
                        update ksv_po_mrp
                        set
                            po_qty = ${tNewPoQty},
                            use_qty = ${tNewUseQty}
                        where
                            po_cd = '${tPoMrpObj.PO_CD}'
                            and po_seq = '${tPoMrpObj.PO_SEQ}'
                            and order_cd = '${tPoMrpObj.ORDER_CD}'
                            and matl_cd = '${tPoMrpObj.MATL_CD}'
                            and use_po_type = '1'
                            and mrp_seq = '${tPoMrpObj.MRP_SEQ}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSql));
                    tSQLArray.push(tSQL99_1);

                    var tSql = `
                        update ksv_stock_mem
                        set
                            po_qty = ${tNewPoQty}
                        where
                            po_cd = '${tPoMrpObj.PO_CD}'
                            and po_seq = '${tPoMrpObj.PO_SEQ}'
                            and matl_cd = '${tPoMrpObj.MATL_CD}'
                            and order_cd = '${tPoMrpObj.ORDER_CD}'
                            and matl_cd = '${tPoMrpObj.MATL_CD}'
                            and mrp_seq = '${tPoMrpObj.MRP_SEQ}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSql));
                    tSQLArray.push(tSQL99_1);

                    if (tPoMrpObj.stock_idx && tDiffQty !== 0) {
                        var sqlStockMatl = `
                            select
                                *
                            from
                                ksv_stock_matl
                            where
                                stock_idx = '${tPoMrpObj.stock_idx}'
                        `;
                        var retStockMatl = await prisma.$queryRaw(
                            Prisma.raw(sqlStockMatl),
                        );
                        if (retStockMatl.length > 0) {
                            var tObj2 = { ...retStockMatl[0] };

                            var tNewStockQty = 0;
                            var tRemainQty = 0;
                            if (tDiffQty < 0) {
                                tNewStockQty =
                                    parseFloat(tObj2.STOCK_QTY) + -1 * tDiffQty;
                                tRemainQty =
                                    parseFloat(tObj2.REMAIN_QTY) +
                                    -1 * tDiffQty;
                            } else {
                                if (tRemainQty > tDiffQty) {
                                    tNewStockQty =
                                        parseFloat(tObj2.STOCK_QTY) - tDiffQty;
                                    tRemainQty =
                                        parseFloat(tObj2.REMAIN_QTY) - tDiffQty;
                                } else {
                                    tDiffQty = tRemainQty;
                                    tNewStockQty =
                                        parseFloat(tObj2.STOCK_QTY) - tDiffQty;
                                    tRemainQty =
                                        parseFloat(tObj2.REMAIN_QTY) - tDiffQty;
                                }
                            }
                            var tSql = `
                                update ksv_stock_matl
                                set
                                    stock_qty = stock_qty + ${tDiffQty},
                                    remain_qty = remain_qty + ${tDiffQty}
                                where
                                    stock_idx = '${tPoMrpObj.stock_idx}'
                            `;
                            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSql));
                            tSQLArray.push(tSQL99_1);
                        }
                    }
                }
            }

            // 삭제된것 처리
            var tInsSql3 = '';
            var tIdx = 0;
            let sql_pomrp_0 = `
                select
                    *
                from
                    ksv_po_mrp
                where
                    po_cd = '${args.datas.PO_CD}'
            `;
            let ret_pomrp_0 = await prisma.$queryRaw(Prisma.raw(sql_pomrp_0));
            for (tIdx = 0; tIdx < ret_pomrp_0.length; tIdx++) {
                var col = { ...ret_pomrp_0[tIdx] };

                // Check Stsin/Stsout
                var chk_stsin = 0;
                var chk_stsout = 0;

                ret_stsin.forEach((col1, i1) => {
                    if (col1.PO_CD === args.datas.PO_CD && col1.MATL_CD === col.MATL_CD)  chk_stsin = 1;
                });

                ret_stsout.forEach((col1, i1) => {
                    if (col1.PO_CD === args.datas.PO_CD && col1.MATL_CD === col.MATL_CD)  chk_stsout = 1;
                });

                if (chk_stsin > 0 || chk_stsout > 0)  {
                    // STS-IN , STS-OUT 진행중인 항목은 수정 불가
                    continue;
                }

                // 삭제항목인지 Check
                var tCheck = 0;
                args.datas1.forEach((col1, i) => {
                    if (col1.MATL_CD === col.MATL_CD) tCheck = 1;
                });

                if (tCheck === 0) {
                    var obj_stockmatl_0 = {};
                    var ret_stockmatl_0 = [];
                    if (
                        parseFloat(col.PO_QTY) <= 0 &&
                        parseFloat(col.USE_QTY) > 0 &&
                        col.USE_PO_TYPE === '1'
                    ) {
                        var sql_del_pomrp = `
                            delete from ksv_po_mrp
                            where
                                po_cd = '${col.PO_CD}'
                                and po_matl_cd = '${col.MATL_CD}'
                        `;
                        const tSQL99_1 = prisma.$queryRaw(
                            Prisma.raw(sql_del_pomrp),
                        );
                        tSQLArray.push(tSQL99_1);

                        var sql_del_pomrp1 = `
                            delete from ksv_po_mrp
                            where
                                po_cd = '${col.PO_CD}'
                                and matl_cd = '${col.MATL_CD}'
                        `;
                        const tSQL99_1 = prisma.$queryRaw(
                            Prisma.raw(sql_del_pomrp1),
                        );
                        tSQLArray.push(tSQL99_1);

                        /*
                 var sql_del_stockuse = `
                     delete from ksv_stock_use
                     where
                         use_po_cd = '${col.PO_CD}'
                         and stock_idx = '${col.STOCK_IDX}'
                 `;
                 const tSQL99_1 = prisma.$queryRaw(Prisma.raw(sql_del_stockuse));
                 tSQLArray.push(tSQL99_1);

                 var sql_up_stockmatl = `
                     update ksv_stock_matl
                     set
                         remain_qty = remain_qty + ${col.USE_QTY},
                         use_qty = use_qty - ${col.USE_QTY}
                     where
                         stock_idx = '${col.STOCK_IDX}'
                 `;
                 const tSQL99_1 = prisma.$queryRaw(Prisma.raw(sql_del_pomrp));
                 tSQLArray.push(tSQL99_1);
                 */

                        /*
                 let sql_stockmatl_0 = `
                     select
                         *
                     from
                         ksv_stock_matl
                     where
                         stock_idx = '${col.stock_idx}'
                 `;
                 ret_stockmatl_0 = await prisma.$queryRaw(Prisma.raw(sql_stockmatl_0));
                 var tChk2 = 0;
                 ret_stockmatl_0.forEach((col1, i1) => {
                     if (parseFloat(col1.REMAIN_QTY) !== parseFloat(col1.STOCK_QTY)) tChk2 = 1;
                     else if (parseFloat(col1.USE_QTY) > 0) tChk2 = 2;
                     else if (parseFloat(col1.OUT_QTY) > 0) tChk2 = 3;
                 });
                 if (tChk2 !== 0) {
                     var tRetArray = [];
                     var tObj = {};
                     tObj.CODE = `ERROR:재고 전환된 자재가 이미 사용중이므로 자재를 삭제할수 없습니다. ${col.MATL_CD} `;
                     tObj.id = 0;
                     tRetArray.push(tObj);
                     return (tRetArray);
                 }
                 var sql_del_pomrp = `
                     delete from ksv_stock_matl
                     where
                         stock_idx = '${col.stock_idx}'
                 `;
                 const tSQL99_1 = prisma.$queryRaw(Prisma.raw(sql_del_pomrp));
                 tSQLArray.push(tSQL99_1);
                 */
                    } else if (
                        parseFloat(col.PO_QTY) > 0 &&
                        parseFloat(col.USE_QTY) > 0 &&
                        col.USE_PO_TYPE === '1'
                    ) {
                        var sql_del_pomrp = `
                            delete from ksv_po_mrp
                            where
                                po_cd = '${col.PO_CD}'
                                and matl_cd = '${col.MATL_CD}'
                        `;
                        const tSQL99_1 = prisma.$queryRaw(
                            Prisma.raw(sql_del_pomrp),
                        );
                        tSQLArray.push(tSQL99_1);

                        var sql_del_stockmem = `
                            delete from ksv_stock_mem
                            where
                                po_cd = '${col.PO_CD}'
                                and matl_cd = '${col.MATL_CD}'
                        `;
                        const tSQL99_1 = prisma.$queryRaw(
                            Prisma.raw(sql_del_stockmem),
                        );
                        tSQLArray.push(tSQL99_1);

                        if (col.stock_idx !== '') {
                            var sql_del_stockmatl = `
                                delete from ksv_stock_matl
                                where
                                    stock_idx = '${col.stock_idx}'
                            `;
                            const tSQL99_1 = prisma.$queryRaw(
                                Prisma.raw(sql_del_stockmatl),
                            );
                            tSQLArray.push(tSQL99_1);
                        }
                    } else if (col.USE_PO_TYPE === '2') {
                        var sql_del_pomrp = `
                            delete from ksv_po_mrp
                            where
                                po_cd = '${col.PO_CD}'
                                and matl_cd = '${col.MATL_CD}'
                        `;
                        const tSQL99_1 = prisma.$queryRaw(
                            Prisma.raw(sql_del_pomrp),
                        );
                        tSQLArray.push(tSQL99_1);

                        var sql_del_stockuse = `
                            delete from ksv_stock_use
                            where
                                use_po_cd = '${col.PO_CD}'
                                and stock_idx = '${col.stock_idx}'
                        `;
                        const tSQL99_1 = prisma.$queryRaw(
                            Prisma.raw(sql_del_stockuse),
                        );
                        tSQLArray.push(tSQL99_1);

                        var sql_up_stockmatl = `
                            update ksv_stock_matl
                            set
                                remain_qty = remain_qty + ${col.PO_QTY},
                                use_qty = use_qty - ${col.PO_QTY}
                            where
                                stock_idx = '${col.stock_idx}'
                        `;
                        const tSQL99_1 = prisma.$queryRaw(
                            Prisma.raw(sql_up_stockmatl),
                        );
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
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = `ERROR:${e.message}`;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            tSQLArray = [];
            var tSql1 = `
                select
                    a.po_cd,
                    b.vendor_cd,
                    count(*) as c_cnt
                from
                    ksv_po_mrp a,
                    kcd_matl_mst b
                where
                    a.po_cd = '${args.datas.PO_CD}'
                    and a.matl_cd = b.matl_cd
                group by
                    a.po_cd,
                    b.vendor_cd
            `;
            var tRet1 = await prisma.$queryRaw(Prisma.raw(tSql1));
            var tIdx10 = 0;
            for (tIdx10 = 0; tIdx10 < tRet1.length; tIdx10++) {
                var col = { ...tRet1[tIdx10] };
                var tSql2 = `
                    select
                        count(*) as cnt
                    from
                        ksv_po_vendor
                    where
                        vendor_cd = '${col.vendor_cd}'
                        and po_cd = '${col.po_cd}'
                `;
                var tRet2 = await prisma.$queryRaw(Prisma.raw(tSql2));
                if (tRet2.length > 0 && tRet2[0].cnt > 0);
                else {
                    tSql = `
                        insert INTO
                            KSV_po_vendor (PO_CD, vendor_cd, end_date)
                        VALUES
                            ('${args.datas.PO_CD}', '${col.vendor_cd}', '');
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSql));
                    tSQLArray.push(tSQL99_1);
                }
            }

            // 자재종합표
            const retPoMatlSample2 = await mrpMigration.runPoMatlListSample({
                poCd: args.datas.PO_CD,
                userId: tUserInfo.USER_ID,
            });
            if (!retPoMatlSample2.ok)
                throw new Error(retPoMatlSample2.message || retPoMatlSample2.step);

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = `SUCCEED:Update PO:${args.datas.PO_CD}`;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = `ERROR:Update Po:${e.message}`;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },
    },
};

export default moduleMutation_S030506_03;
