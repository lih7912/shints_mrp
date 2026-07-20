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
const moduleMutation_S0509_5 = {
    Mutation: {
        mgrInsert_S0509_5_RETURN_MATL: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tSQLArray = [];
            var tInput = { ...args.datas[0] };

            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var col = { ...args.datas[tIdx] };

                let tSQL98_1 = `
                    update ksv_stock_idx
                    set
                        idx = idx + 1
                `;
                let nSQL98_1 = await prisma.$queryRaw(Prisma.raw(tSQL98_1));

                let tSQL98_2 = `
                    select
                        fac,
                        idx
                    from
                        ksv_stock_idx
                `;
                let nRet98_2 = await prisma.$queryRaw(Prisma.raw(tSQL98_2));

                let tSQL98_3 = `
                    select
                        *
                    from
                        ksv_order_mst
                    where
                        order_cd = '${col.ORDER_CD}'
                `;
                let nRet98_3 = await prisma.$queryRaw(Prisma.raw(tSQL98_3));

                var tStockIdx = nRet98_2[0].idx;
                var t_Zero = '0000000000';
                var m_StockIdx =
                    'S' +
                    t_Zero.substring(0, 9 - String(tStockIdx)) +
                    String(tStockIdx);
                var m_OutFactoryCd = nRet98_3[0].FACTORY_CD;

                var tOutFac_qty = parseFloat(col.OUTFAC_QTY2);

                let tSQL99 = `
                    delete from ksv_stock_matl
                    where
                        po_cd = '${col.PO_CD}'
                        and po_seq = '${col.PO_SEQ}'
                        and order_cd = '${col.ORDER_CD}'
                        and matl_cd = '${col.MATL_CD}'
                        and reason_make = 'RETURN'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                if (tOutFac_qty > 0) tSQLArray.push(tSQL99_1);

                let tSQL99 = `
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
                            root_idx,
                            waiting_qty,
                            stock_status_2,
                            owner_ship,
                            reason_make,
                            authority,
                            condition,
                            manager,
                            purpose,
                            org_stock_idx
                        )
                    values
                        (
                            '${m_StockIdx}',
                            '${col.PO_CD}',
                            '${col.PO_SEQ}',
                            '${col.ORDER_CD}',
                            '${col.MATL_CD}',
                            '1',
                            '1',
                            ${tOutFac_qty},
                            ${tOutFac_qty},
                            '0',
                            '${m_OutFactoryCd}',
                            'W',
                            '${tRetDate1}',
                            '09.Acc Line return',
                            '09.Acc Line return',
                            '09',
                            '0',
                            '${tUserInfo.USER_ID}',
                            '${tRetDate}',
                            '${m_StockIdx}',
                            '0',
                            'S1',
                            'SHINTS',
                            'RETURN',
                            'PIC',
                            '',
                            'SALES',
                            '',
                            '${m_StockIdx}'
                        )
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                if (tOutFac_qty > 0) tSQLArray.push(tSQL99_1);

                var tMaxDate = '';
                var tSQL = `
                    select
                        max(out_date) as max_date
                    from
                        ksv_stock_facout
                    where
                        po_cd = '${col.PO_CD}'
                        and order_cd = '${col.ORDER_CD}'
                        and matl_cd = '${col.MATL_CD}'
                `;
                var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
                tMaxDate = nRet0[0].max_date;

                let tSQL99 = `
                    update ksv_stock_facout
                    set
                        out_qty = out_qty - ${col.OUTFAC_QTY2}
                    where
                        po_cd = '${col.PO_CD}'
                        and out_date = '${tMaxDate}'
                        and order_cd = '${col.ORDER_CD}'
                        and matl_cd = '${col.MATL_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    update ksv_stock_mem2
                    set
                        outfac_qty = outfac_qty - ${col.OUTFAC_QTY2}
                    where
                        po_cd = '${col.PO_CD}'
                        and matl_cd = '${col.MATL_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                var tSQL = `
                    select
                        top 1 *
                    from
                        ksv_stock_mem
                    where
                        po_cd = '${col.PO_CD}'
                        and matl_cd = '${col.MATL_CD}'
                        and order_cd = '${col.ORDER_CD}'
                        and outfac_qty > ${col.OUTFAC_QTY2}
                `;
                var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));

                if (nRet0.length > 0) {
                    var col1 = { ...nRet0[0] };
                    let tSQL99 = `
                        update ksv_stock_mem
                        set
                            outfac_qty = outfac_qty - ${col.OUTFAC_QTY2}
                        where
                            po_cd = '${col1.PO_CD}'
                            and po_seq = '${col1.PO_SEQ}'
                            and order_cd = '${col1.ORDER_CD}'
                            and matl_cd = '${col1.MATL_CD}'
                            and mrp_seq = '${col1.MRP_SEQ}'
                            and matl_seq = '${col1.MATL_SEQ}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }

                //
                var tInObj = {};
                tInObj.po_cd = col.PO_CD;
                tInObj.order_cd = col.ORDER_CD;
                tInObj.matl_cd = col.MATL_CD;
                tInObj.facout_qty = col.OUTFAC_QTY;
                tInObj.return_qty = col.OUTFAC_QTY2;
                tInObj.reg_user = tUserInfo.USER_ID;
                tInObj.reg_datetime = tRetDate;
                let tSQL99 = AFLib.createTableSql(
                    'ksv_stock_facout_return',
                    tInObj,
                );
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
                tObj.CODE = 'SUCCEED:RETURN MATL';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:RETURN_MATL';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },
        mgrInsert_S0509_5_RETURN_NOTHING: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tSQLArray = [];
            var tInput = { ...args.datas[0] };

            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var col = { ...args.datas[tIdx] };

                let tSQL98_2 = `
                    select
                        *
                    from
                        ksv_stock_facout_return
                    where
                        po_cd = '${col.PO_CD}'
                        and order_cd = '${col.ORDER_CD}'
                        and matl_cd = '${col.MATL_CD}'
                `;
                let nRet98_2 = await prisma.$queryRaw(Prisma.raw(tSQL98_2));

                if (nRet98_2.length <= 0) {
                    var tInObj = {};
                    tInObj.po_cd = col.PO_CD;
                    tInObj.order_cd = col.ORDER_CD;
                    tInObj.matl_cd = col.MATL_CD;
                    tInObj.facout_qty = col.OUTFAC_QTY;
                    tInObj.return_qty = col.OUTFAC_QTY2;
                    tInObj.reg_user = tUserInfo.USER_ID;
                    tInObj.reg_datetime = tRetDate;
                    let tSQL99 = AFLib.createTableSql(
                        'ksv_stock_facout_return',
                        tInObj,
                    );
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
                tObj.CODE = 'SUCCEED:RETURN MATL';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:RETURN_MATL';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },
    },
};

export default moduleMutation_S0509_5;
