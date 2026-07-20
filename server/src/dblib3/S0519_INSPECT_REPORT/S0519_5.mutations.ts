// MGR_@@TNAME@@.mutations.js

import * as fs from 'fs';
import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기

/*
                STD_FLAG: String 
                NET: String 
                LOSS: String 
                USE_SIZE: String 
                REMARK: String 

*/

// export default로 Mutation 내용 내보내기
const moduleMutation_S0519_5 = {
    Mutation: {
        mgrInsert_S0519_5_FACIN: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            let sql0_1 = `           
               select db_name() as db_name
              `;
            var tRet0_1 = await prisma.$queryRaw(Prisma.raw(sql0_1));
            var tDbName = '';
            if (tRet0_1.length > 0) tDbName = tRet0_1[0].db_name;
            if (tDbName.includes('test20')) {
               ;
            } else {
               ;
            }

            var tSQLArray = [];

            var tRetDate = AFLib.getCurrTime();

            var tIdx0 = 0;

            for (tIdx0 = 0; tIdx0 < args.datas.length; tIdx0++) {
                var tOne = { ...args.datas[tIdx0] };

                var tFacInCdPrefix = 'FACIN-' + tRetDate;
                var tFileKey = tFacInCdPrefix;

                var tStsoutCd = args.datas1.FILE_KEY;
                var tFileName = args.datas1.NAME;
                var tFileUrl = args.datas1.URL;
                var tFileObjName = args.datas1.OBJECT_NAME;
                var tStsoutCds = args.datas1.STSOUT_CD.split('|');

                let tSQL99 = `
                    update ksv_stock_facin set
                           inspect_date = '${tRetDate1}',
                           shortage_qty = ${tOne.SHORTAGE_QTY},
                           defect_qty = ${tOne.DEFECT_QTY},
                           in_qty = ${tOne.FACIN_QTY},
                           file_name = '${tFileName}',
                           file_url = '${tFileUrl}'
                     where po_cd = '${tOne.PO_CD}'
                     and   matl_cd = '${tOne.MATL_CD}'
                     and   in_date = '${tOne.FACIN_DATE}'
                     and   delivery = '${tOne.DELIVERY}'
                     and   facin_cd = '${tOne.FACIN_CD}'
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
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = `ERROR:FAC-In: (${e.message})`;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED:FAC-IN Inspect:';
            tObj.id = 0;
            tRetArray.push(tObj);
            return tRetArray;
        },
        mgrInsert_S0519_5_FACIN_bak1: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tSQLArray = [];

            var tRetDate = AFLib.getCurrTime();
            var tFacInCdPrefix = 'FACIN-' + tRetDate;
            var tFileKey = tFacInCdPrefix;

            var tStsoutCd = args.datas1.FILE_KEY;
            var tFileName = args.datas1.NAME;
            var tFileUrl = args.datas1.URL;
            var tFileObjName = args.datas1.OBJECT_NAME;
            var tStsoutCds = args.datas1.STSOUT_CD.split('|');

            var sqlStsout = '';
            tStsoutCds.forEach((col, i) => {
                if (col !== '') {
                    if (i === 0) sqlStsout += ` '${col}' `;
                    else sqlStsout += ` ,'${col}' `;
                }
            });

            var tIdx = 0;
            for (tIdx = 0; tIdx < tStsoutCds.length; tIdx++) {
                var tStsoutCd = tStsoutCds[tIdx];
                var sql110 = `
                    select
                        *
                    from
                        kcd_fileinfo
                    where
                        kind = 'INSPECT'
                        and file_key = '${tStsoutCd}'
                `;
                var nRet110 = await prisma.$queryRaw(Prisma.raw(sql110));
                console.log(`${nRet110.length} / ${tFileUrl} `);
                if (nRet110.length <= 0 && tFileUrl !== '') {
                    var tFileObj = {};
                    tFileObj.KIND = 'INSPECT';
                    tFileObj.FILE_KEY = tStsoutCd;
                    tFileObj.TITLE = `inspect doc-${tStsoutCd}`;
                    tFileObj.NAME = tFileName;
                    tFileObj.URL = tFileUrl;
                    tFileObj.OBJECT_NAME = tFileObjName;
                    let tSQL99 = AFLib.createTableSql('KCD_FILEINFO', tFileObj);
                    const tSQL99_1 = await prisma.$queryRaw(Prisma.raw(tSQL99));
                } else {
                    console.log(`${nRet110.length} / ${nRet110[0].NAME} `);
                }
            }

            if (args.datas.length <= 0) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'SUCCESS:Fac In ';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tIdx0 = 0;
            for (tIdx0 = 0; tIdx0 < args.datas.length; tIdx0++) {
                var tOne = { ...args.datas[tIdx0] };

                var sql201 = `
                    select
                        a.STSOUT_CD,
                        a.PO_CD,
                        a.MATL_CD,
                        b.MATL_NAME,
                        b.COLOR,
                        b.SPEC,
                        b.UNIT,
                        isnull(sum(OUT_QTY), 0) as S_OUT_QTY
                    from
                        ksv_stock_out a,
                        kcd_matl_mst b
                    where
                        a.matl_cd = b.matl_cd
                        and a.stsout_cd in (${sqlStsout})
                        and a.PO_CD = '${tOne.PO_CD}'
                        and a.MATL_CD = '${tOne.MATL_CD}'
                    group by
                        a.STSOUT_CD,
                        a.PO_CD,
                        a.MATL_CD,
                        b.MATL_NAME,
                        b.COLOR,
                        b.SPEC,
                        b.UNIT
                `;
                var nRet201 = await prisma.$queryRaw(Prisma.raw(sql201));

                tIdx1 = 0;
                for (tIdx1 = 0; tIdx1 < nRet201.length; tIdx1++) {
                    var tOne2 = { ...nRet201[tIdx1] };

                    var tRemark = '';
                    var tShipmentCd = '';
                    var sql101 = `
                        select
                            *
                        from
                            ksv_shipment_mst
                        where
                            shipment_cd = (
                                select distinct
                                    shipment_cd
                                from
                                    ksv_shipment_mem
                                where
                                    stsout_cd = '${tOne2.STSOUT_CD}'
                            )
                    `;
                    var nRet101 = await prisma.$queryRaw(Prisma.raw(sql101));
                    if (nRet101.length > 0) {
                        tRemark = nRet101[0].REMARK;
                        tShipmentCd = nRet101[0].SHIPMENT_CD;
                    }
                    var tInput = { ...args.datas[0] };
                    if (tInput.IN_DATE === '') tInput.IN_DATE = tRetDate1;
                    // var tDelivery = `${tRemark}-#${tInput.IN_DATE}-#${tOne2.STSOUT_CD}`;
                    // var tDelivery = `${tRemark}-#${tInput.IN_DATE}-#${tOne2.STSOUT_CD}`;
                    var tDelivery = `#${tInput.IN_DATE}-#${tOne2.STSOUT_CD}`;

                    var tIdx = 0;
                    for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                        var col = { ...args.datas[tIdx] };
                        if (col.IN_DATE === '') col.IN_DATE = tRetDate1;
                        var tErrQty =
                            parseFloat(col.SHORTAGE_QTY) +
                            parseFloat(col.DEFECT_QTY);
                        var tFacInCd = `${tFacInCdPrefix}-${tIdx + 1}`;

                        var tPuCd = '';
                        var sql100 = `
                            select
                                pu_cd
                            from
                                ksv_stock_mem2
                            where
                                po_cd = '${col.PO_CD}'
                                and matl_cd = '${col.MATL_CD}'
                        `;
                        var nRet100 = await prisma.$queryRaw(
                            Prisma.raw(sql100),
                        );
                        if (nRet100.length > 0) tPuCd = nRet100[0].pu_cd;

                        var wInQty = col.FACIN_QTY;
                        var wDefectQty = col.DEFECT_QTY;
                        var wShortAgeQty = col.SHORTAGE_QTY;
                        var tTotFacInQty = 0;
                        var tTotShortAgeQty = 0;
                        var tTotDefectQty = 0;

                        var tCheck1 = `
                            select
                                isnull(sum(in_qty), 0) as old_facin_qty,
                                isnull(sum(defect_qty), 0) as old_defect_qty,
                                isnull(sum(shortage_qty), 0) as old_shortage_qty
                            from
                                ksv_stock_facin
                            where
                                po_cd = '${col.PO_CD}'
                                -- and   in_date =  '${col.IN_DATE}'
                                -- and   delivery =  '${tDelivery}'
                                and matl_cd = '${col.MATL_CD}'
                        `;
                        var nCheck1 = await prisma.$queryRaw(
                            Prisma.raw(tCheck1),
                        );
                        if (nCheck1.length > 0) {
                            var tDiff =
                                parseFloat(col.S_OUT_QTY) -
                                parseFloat(nCheck1[0].old_facin_qty);
                            console.log(
                                `${col.S_OUT_QTY} / ${nCheck1[0].old_facin_qty}`,
                            );
                            if (
                                parseFloat(nCheck1[0].old_facin_qty) >=
                                parseFloat(col.S_OUT_QTY)
                            ) {
                                var tRetArray = [];
                                var tObj = {};
                                tObj.CODE =
                                    'ERROR:이미 Facin 된것은 Cancel 후 다시 Facin 하세요';
                                tObj.id = 0;
                                tRetArray.push(tObj);
                                return tRetArray;
                            }

                            var tCheck2 = `
                                select
                                    isnull(sum(in_qty), 0) as old_facin_qty,
                                    isnull(sum(defect_qty), 0) as old_defect_qty,
                                    isnull(sum(shortage_qty), 0) as old_shortage_qty
                                from
                                    ksv_stock_facin
                                where
                                    po_cd = '${col.PO_CD}'
                                    and in_date = '${col.IN_DATE}'
                                    and delivery = '${tDelivery}'
                                    and matl_cd = '${col.MATL_CD}'
                            `;
                            var nCheck2 = await prisma.$queryRaw(
                                Prisma.raw(tCheck2),
                            );
                            var tCurrInQty = 0;
                            var tCurrShortAgeQty = 0;
                            var tCurrDefectQty = 0;
                            if (nCheck2.length > 0) {
                                tCurrInQty = parseFloat(
                                    nCheck2[0].old_facin_qty,
                                );
                                tCurrShortAgeQty = parseFloat(
                                    nCheck2[0].old_shortage_qty,
                                );
                                tCurrDefectQty = parseFloat(
                                    nCheck2[0].old_defect_qty,
                                );
                            }

                            let tSQL99 = `
                                delete from ksv_stock_facin
                                where
                                    po_cd = '${col.PO_CD}'
                                    and in_date = '${col.IN_DATE}'
                                    and delivery = '${tDelivery}'
                                    and matl_cd = '${col.MATL_CD}'
                            `;
                            const tSQL99_1 = prisma.$queryRaw(
                                Prisma.raw(tSQL99),
                            );
                            tSQLArray.push(tSQL99_1);

                            wDefectQty =
                                parseFloat(wDefectQty) -
                                parseFloat(nCheck1[0].old_defect_qty) +
                                tCurrDefectQty;
                            if (wDefectQty < 0) wDefectQty = 0;

                            wShortAgeQty =
                                parseFloat(wShortAgeQty) -
                                parseFloat(nCheck1[0].old_shortage_qty) +
                                tCurrShortAgeQty;
                            if (wShortAgeQty < 0) wShortAgeQty = 0;

                            wInQty =
                                parseFloat(wInQty) -
                                parseFloat(nCheck1[0].old_facin_qty) +
                                tCurrInQty;

                            tTotFacInQty = parseFloat(nCheck1[0].old_facin_qty);
                            tTotDefectQty = parseFloat(
                                nCheck1[0].old_defect_qty,
                            );
                            tTotShortAgeQty = parseFloat(
                                nCheck1[0].old_shortage_qty,
                            );
                        }
                        tTotFacInQty += parseFloat(wInQty);
                        tTotDefectQty += parseFloat(wDefectQty);
                        tTotShortAgeQty += parseFloat(wShortAgeQty);

                        let tSQL99 = `
                            insert into
                                ksv_stock_facin (
                                    PO_CD,
                                    IN_DATE,
                                    MATL_CD,
                                    IN_QTY,
                                    ERR_QTY,
                                    DELIVERY,
                                    LOCATION,
                                    STATUS_CD,
                                    REG_USER,
                                    REG_DATETIME,
                                    STSOUT_CD,
                                    SHORTAGE_QTY,
                                    DEFECT_QTY,
                                    facin_cd,
                                    clearance_no,
                                    pu_cd
                                )
                            values
                                (
                                    '${col.PO_CD}',
                                    '${col.IN_DATE}',
                                    '${col.MATL_CD}',
                                    '${wInQty}',
                                    '0',
                                    '${tDelivery}',
                                    '${col.LOCATION}',
                                    '0',
                                    '${tUserInfo.USER_ID}',
                                    '${tRetDate}',
                                    '${col.STSOUT_CD}',
                                    '${wShortAgeQty}',
                                    '${wDefectQty}',
                                    '${tFacInCd}',
                                    '',
                                    '${tPuCd}'
                                )
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);

                        let tSQL99 = `
                            update ksv_stock_mem2
                            set
                                infac_qty = ${tTotFacInQty},
                                shortage_qty = ${tTotShortAgeQty},
                                defect_qty = ${tTotDefectQty}
                            where
                                po_cd = '${col.PO_CD}'
                                and matl_cd = '${col.MATL_CD}'
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);

                        var sqlStsOutCd = '';
                        if (col.STSOUT_CD)
                            sqlStsOutCd = ` where stsout_cd = '${col.STSOUT_CD}' `;
                        else if (col.PACK_CD)
                            sqlStsOutCd = ` where pack_cd = '${col.PACK_CD}' `;

                        var tPercent =
                            parseFloat(tTotFacInQty) /
                            parseFloat(col.S_OUT_QTY);
                        var sql0 = `
                            select
                                *
                            from
                                ksv_stock_out ${sqlStsOutCd}
                                -- and   shipment_cd = '${col.SHIPMENT_CD}'
                                and po_cd = '${col.PO_CD}'
                                and matl_cd = '${col.MATL_CD}'
                        `;
                        var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));

                        var tIdx1 = 0;
                        for (tIdx1 = 0; tIdx1 < nRet0.length; tIdx1++) {
                            var col1 = { ...nRet0[tIdx1] };

                            var tFacInQty = AFLib.getFloat(
                                parseFloat(col1.OUT_QTY) * tPercent,
                                2,
                            );

                            var tCheck1 = `
                                select
                                    *
                                from
                                    ksv_stock_facin_order
                                where
                                    po_cd = '${col1.PO_CD}'
                                    and po_seq = '${col1.PO_SEQ}'
                                    and order_cd = '${col1.ORDER_CD}'
                                    and matl_cd = '${col1.MATL_CD}'
                                    and mrp_seq = '${col1.MRP_SEQ}'
                                    and matl_seq = '${col1.MATL_SEQ}'
                            `;
                            var nCheck1 = await prisma.$queryRaw(
                                Prisma.raw(tCheck1),
                            );
                            if (nCheck1.length > 0) {
                            } else {
                                var tFacinOrder = {};
                                tFacinOrder.PO_CD = col1.PO_CD;
                                tFacinOrder.PO_SEQ = col1.PO_SEQ;
                                tFacinOrder.ORDER_CD = col1.ORDER_CD;
                                tFacinOrder.MATL_CD = col1.MATL_CD;
                                tFacinOrder.MRP_SEQ = col1.MRP_SEQ;
                                tFacinOrder.MATL_SEQ = col1.MATL_SEQ;
                                tFacinOrder.IN_QTY = tFacInQty;
                                tFacinOrder.TOT_QTY = col1.OUT_QTY;
                                tFacinOrder.IN_DATE = tRetDate1;
                                tFacinOrder.REG_USER = tUserInfo.USER_ID;
                                tFacinOrder.REG_DATETIME = tRetDate;
                                tFacinOrder.PAY_PRICE = 0;
                                tFacinOrder.PAY_CURR_CD = '';
                                tFacinOrder.FACIN_CD = tFacInCd;
                                let tSQL99 = AFLib.createTableSql(
                                    'KSV_STOCK_FACIN_ORDER',
                                    tFacinOrder,
                                );
                                const tSQL99_1 = prisma.$queryRaw(
                                    Prisma.raw(tSQL99),
                                );
                                tSQLArray.push(tSQL99_1);
                            }

                            var sql2 = `
                                select
                                    *
                                from
                                    ksv_stock_mem
                                where
                                    po_cd = '${col1.PO_CD}'
                                    and po_seq = '${col1.PO_SEQ}'
                                    and order_cd = '${col1.ORDER_CD}'
                                    and matl_cd = '${col1.MATL_CD}'
                                    and mrp_seq = '${col1.MRP_SEQ}'
                                    and matl_seq = '${col1.MATL_SEQ}'
                            `;
                            var tRet2 = await prisma.$queryRaw(
                                Prisma.raw(sql2),
                            );
                            if (tRet2.length > 0) {
                                let tSQL99 = `
                                    update ksv_stock_mem
                                    set
                                        infac_qty = ${tFacInQty}
                                    where
                                        po_cd = '${col1.PO_CD}'
                                        and po_seq = '${col1.PO_SEQ}'
                                        and order_cd = '${col1.ORDER_CD}'
                                        and matl_cd = '${col1.MATL_CD}'
                                        and mrp_seq = '${col1.MRP_SEQ}'
                                        and matl_seq = '${col1.MATL_SEQ}'
                                `;
                                const tSQL99_1 = prisma.$queryRaw(
                                    Prisma.raw(tSQL99),
                                );
                                tSQLArray.push(tSQL99_1);

                                // moq, foc, leftover 처리
                                if (
                                    parseInt(col1.PO_SEQ) >= 97 &&
                                    parseInt(col1.PO_SEQ) <= 100
                                ) {
                                    var tStockIdx = '999999999';
                                    if (parseInt(col1.PO_SEQ) === 97)
                                        tStockIdx = tRet2[0].FOC_STOCK_IDX;
                                    if (parseInt(col1.PO_SEQ) === 98)
                                        tStockIdx = tRet2[0].LEFTOVER_STOCK_IDX;
                                    if (parseInt(col1.PO_SEQ) === 99)
                                        tStockIdx = tRet2[0].MOQ_STOCK_IDX;

                                    var sql3 = `
                                        select
                                            *
                                        from
                                            ksv_stock_matl
                                        where
                                            stock_idx = '${tStockIdx}'
                                    `;
                                    var tRet3 = await prisma.$queryRaw(
                                        Prisma.raw(sql3),
                                    );

                                    var tCheck1 = `
                                        select
                                            *
                                        from
                                            ksv_stock_use
                                        where
                                            stock_idx = '${tStockIdx}'
                                            and use_po_cd = '${col1.PO_CD}'
                                            and use_po_seq = '${col1.PO_SEQ}'
                                            and use_order_cd = '${col1.ORDER_CD}'
                                            and use_matl_cd = '${col1.MATL_CD}'
                                            and use_mrp_seq = '${col1.MRP_SEQ}'
                                            and use_matl_seq = '${col1.MATL_SEQ}'
                                    `;
                                    var nCheck1 = await prisma.$queryRaw(
                                        Prisma.raw(tCheck1),
                                    );
                                    if (nCheck1.length <= 0) {
                                    } else {
                                        var tInObj = {};
                                        tInObj.stock_idx = tStockIdx;
                                        tInObj.use_datetime = tRetDate;
                                        tInObj.use_qty = tRet3[0].STOCK_QTY;
                                        tInObj.use_po_cd = col1.PO_CD;
                                        tInObj.use_po_seq = col1.PO_SEQ;
                                        tInObj.use_order_cd = col1.ORDER_CD;
                                        tInObj.use_matl_cd = col1.MATL_CD;
                                        tInObj.use_mrp_seq = col1.MRP_SEQ;
                                        tInObj.use_matl_seq = col1.MATL_SEQ;
                                        tInObj.factory_cd = tRet3[0].FACTORY_CD;
                                        tInObj.status_cd = '0';
                                        tInObj.reg_user = tUserInfo.USER_ID;
                                        tInObj.reg_datetime = tRetDate;
                                        tInObj.out_date = '';
                                        tInObj.facin_cd = tFacInCd;
                                        tInObj.facout_cd = '';
                                        tInObj.stsin_cd = tStsInCd;
                                        tInObj.stsout_cd = col.STSOUT_CD;
                                        let tSQL99 = AFLib.createTableSql(
                                            'KSV_STOCK_USE',
                                            tInObj,
                                        );
                                        const tSQL99_1 = prisma.$queryRaw(
                                            Prisma.raw(tSQL99),
                                        );
                                        tSQLArray.push(tSQL99_1);

                                        let tSQL99 = `
                                            update ksv_stock_matl
                                            set
                                                stock_qty = 0,
                                                use_qty = '${tInObj.use_qty}'
                                            where
                                                stock_idx = '${tStockIdx}'
                                        `;
                                        const tSQL99_1 = prisma.$queryRaw(
                                            Prisma.raw(tSQL99),
                                        );
                                        tSQLArray.push(tSQL99_1);
                                    }
                                }
                            }

                            let tSQL99 = `
                                update ksv_stock_out
                                set
                                    facin_user = '${tUserInfo.USER_ID}',
                                    facin_datetime = '${tRetDate}'
                                where
                                    po_cd = '${col1.PO_CD}'
                                    and po_seq = '${col1.PO_SEQ}'
                                    and order_cd = '${col1.ORDER_CD}'
                                    and matl_cd = '${col1.MATL_CD}'
                                    and mrp_seq = '${col1.MRP_SEQ}'
                                    and matl_seq = '${col1.MATL_SEQ}'
                            `;
                            const tSQL99_1 = prisma.$queryRaw(
                                Prisma.raw(tSQL99),
                            );
                            tSQLArray.push(tSQL99_1);
                        }
                    }

                    let tSQL99 = `
                        update ksv_shipment_mst
                        set
                            remark2 = '${tDelivery}'
                        where
                            shipment_cd = '${tShipmentCd}'
                            and (
                                remark2 is null
                                or remark2 = ''
                            )
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
                    } catch (e) {
                        var tRetArray = [];
                        var tObj = {};
                        tObj.CODE = 'ERROR:FAC-In';
                        tObj.id = 0;
                        tRetArray.push(tObj);
                        return tRetArray;
                    }
                }

                // 금액재계산
                var sql3 = `
                    select
                        b.pu_cd,
                        isnull(sum(a.in_qty * b.PO_PRICE), 0) as facin_amt
                    from
                        ksv_stock_facin a,
                        ksv_stock_mem2 b
                    where
                        b.pu_cd in (
                            select distinct
                                pu_cd
                            from
                                ksv_stock_out
                            where
                                stsout_cd in (${sqlStsout})
                        )
                        and a.po_cd = b.po_cd
                        and a.matl_cd = b.matl_cd
                    group by
                        b.pu_cd
                `;
                var nRet3 = await prisma.$queryRaw(Prisma.raw(sql3));
                var tIdx3 = 0;
                tSQLArray = [];
                for (tIdx3 = 0; tIdx3 < nRet3.length; tIdx3++) {
                    var tOne3 = { ...nRet3[tIdx3] };
                    var tPuCd = tOne3.pu_cd;
                    var tFacinAmt = AFLib.numToFixed(
                        parseFloat(tOne3.facin_amt),
                        2,
                    );
                    console.log(`${tPuCd}/${tFacinAmt}`);
                    let tSQL99 = `
                        update ksv_pu_mst2
                        set
                            facin_amt = ${tFacinAmt}
                        where
                            pu_cd = '${tPuCd}'
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
                    tObj.CODE = 'SUCCEED:FAC-IN:';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                } catch (e) {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = `ERROR:Facin :${e.message}`;
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }
            }
        },
        mgrInsert_S0519_5_UPDATE_LOCATION: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tSQLArray = [];

            var tRetDate = AFLib.getCurrTime();
            var tFacInCdPrefix = 'FACIN-' + tRetDate;
            var tFileKey = tFacInCdPrefix;

            var tStsoutCd = args.datas1.FILE_KEY;
            var tFileName = args.datas1.NAME;
            var tFileUrl = args.datas1.URL;
            var tFileObjName = args.datas1.OBJECT_NAME;
            var tStsoutCds = args.datas1.STSOUT_CD.split('|');

            var sqlStsout = '';
            tStsoutCds.forEach((col, i) => {
                if (col !== '') {
                    if (i === 0) sqlStsout += ` '${col}' `;
                    else sqlStsout += ` ,'${col}' `;
                }
            });

            if (args.datas.length <= 0) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Not Found Data. ';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tIdx0 = 0;
            for (tIdx0 = 0; tIdx0 < args.datas.length; tIdx0++) {
                var col = { ...args.datas[tIdx0] };

                let tSQL99 = `
                    update ksv_stock_facin
                    set
                        location = '${col.LOCATION}'
                    where
                        po_cd = '${col.PO_CD}'
                        and in_date = '${col.IN_DATE}'
                        and matl_cd = '${col.MATL_CD}'
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
                tObj.CODE = 'SUCCEED:FAC-IN Update Location:';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = `ERROR:Facin Update Location:${e.message}`;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },
    },
};

export default moduleMutation_S0519_5;
