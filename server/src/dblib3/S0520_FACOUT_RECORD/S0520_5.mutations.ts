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
const moduleMutation_S0520_5 = {
    Mutation: {
        mgrInsert_S0520_5_FACOUT: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tEdit = { ...args.datas1 };
            if (tEdit.OUT_DATE === '') tEdit.OUT_DATE = tRetDate1;
            tEdit.OUT_DATE = tEdit.OUT_DATE + tRetDate.substring(8, 14);
            var tFacoutCd = `FO${tRetDate.substring(2, 4)}-${tRetDate}`;

            var tSQLArray = [];

            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var col = { ...args.datas[tIdx] };

                if (!col.ORDER_CD) {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.id = 0;
                    tObj.CODE = `ERROR:You must input order_cd. `;
                    tRetArray.push(tObj);
                    return tRetArray;
                }

                var tRemark = `${tEdit.PURPOSE}`;
                if (tEdit.REMARK !== '')
                    tRemark = `${tEdit.PURPOSE}-${tEdit.REMARK}`;

                let tSQL99 = `
                    insert into
                        ksv_stock_facout (
                            PO_CD,
                            OUT_DATE,
                            ORDER_CD,
                            MATL_CD,
                            OUT_QTY,
                            STATUS_CD,
                            REG_USER,
                            REG_DATETIME,
                            remark,
                            facout_cd
                        )
                    values
                        (
                            '${col.PO_CD}',
                            '${tEdit.OUT_DATE}',
                            '${col.ORDER_CD}',
                            '${col.MATL_CD}',
                            '${col.OUT_QTY}',
                            '0',
                            '${tUserInfo.USER_ID}',
                            '${tRetDate}',
                            '${tRemark}',
                            '${tFacoutCd}'
                        )
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                if (col.REMARK.includes('keep stock')) {
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

                    var tStockIdx = nRet98_2[0].idx;
                    var t_Zero = '0000000000';
                    var m_StockIdx =
                        'S' +
                        t_Zero.substring(0, 9 - String(tStockIdx).length) +
                        String(tStockIdx);
                    var m_OutFactoryCd = 'FC034';

                    // var tOutFac_qty = parseFloat(col.OUT_QTY) - parseFloat(col.STOCK_QTY);
                    var tOutFac_qty = parseFloat(col.OUT_QTY);

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
                                'T',
                                '${tRetDate1}',
                                '${tEdit.REMARK}',
                                '${tEdit.REMARK}',
                                '09',
                                '0',
                                '${tUserInfo.USER_ID}',
                                '${tRetDate}',
                                '${m_StockIdx}',
                                '0',
                                'S1',
                                'SHINTS',
                                'STORAGE',
                                'PIC',
                                '',
                                'SALES',
                                '${tEdit.PURPOSE}',
                                '${m_StockIdx}'
                            )
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }

                if (col.REMARK.includes('table storage')) {
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

                    var tStockIdx = nRet98_2[0].idx;
                    var t_Zero = '0000000000';
                    var m_StockIdx =
                        'S' +
                        t_Zero.substring(0, 9 - String(tStockIdx).length) +
                        String(tStockIdx);
                    var m_OutFactoryCd = 'FC034';

                    // var tOutFac_qty = parseFloat(col.OUT_QTY) - parseFloat(col.STOCK_QTY);
                    var tOutFac_qty = parseFloat(col.OUT_QTY);

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
                                'T',
                                '${tRetDate1}',
                                '${tEdit.REMARK}',
                                '${tEdit.REMARK}',
                                '09',
                                '0',
                                '${tUserInfo.USER_ID}',
                                '${tRetDate}',
                                '${m_StockIdx}',
                                '0',
                                'S1',
                                'SHINTS',
                                'STORAGE',
                                'PIC',
                                '',
                                'SALES',
                                '${tEdit.PURPOSE}',
                                '${m_StockIdx}'
                            )
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }


                if (col.REMARK.includes('lost')) {
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

                    var tStockIdx = nRet98_2[0].idx;
                    var t_Zero = '0000000000';
                    var m_StockIdx =
                        'S' +
                        t_Zero.substring(0, 9 - String(tStockIdx).length) +
                        String(tStockIdx);
                    var m_OutFactoryCd = 'FC034';

                    // var tOutFac_qty = parseFloat(col.OUT_QTY) - parseFloat(col.STOCK_QTY);
                    var tOutFac_qty = parseFloat(col.OUT_QTY);

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
                                'E',
                                '${tRetDate1}',
                                '${tEdit.REMARK}',
                                '${tEdit.REMARK}',
                                '09',
                                '0',
                                '${tUserInfo.USER_ID}',
                                '${tRetDate}',
                                '${m_StockIdx}',
                                '0',
                                'S1',
                                'SHINTS',
                                'LOST',
                                'PIC',
                                '',
                                'SALES',
                                '${tEdit.PURPOSE}',
                                '${m_StockIdx}'
                            )
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }

                if (col.REMARK.includes('defect')) {
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

                    var tStockIdx = nRet98_2[0].idx;
                    var t_Zero = '0000000000';
                    var m_StockIdx =
                        'S' +
                        t_Zero.substring(0, 9 - String(tStockIdx).length) +
                        String(tStockIdx);
                    var m_OutFactoryCd = 'FC034';

                    // var tOutFac_qty = parseFloat(col.OUT_QTY) - parseFloat(col.STOCK_QTY);
                    var tOutFac_qty = parseFloat(col.OUT_QTY);

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
                                'E',
                                '${tRetDate1}',
                                '${tEdit.REMARK}',
                                '${tEdit.REMARK}',
                                '09',
                                '0',
                                '${tUserInfo.USER_ID}',
                                '${tRetDate}',
                                '${m_StockIdx}',
                                '0',
                                'S1',
                                'SHINTS',
                                'DEFECT',
                                'PIC',
                                '',
                                'SALES',
                                '${tEdit.PURPOSE}',
                                '${m_StockIdx}'
                            )
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }

                let tSQL99 = `
                    update ksv_stock_mem2
                    set
                        outfac_qty = outfac_qty + ${col.OUT_QTY}
                    where
                        po_cd = '${col.PO_CD}'
                        and matl_cd = '${col.MATL_CD}'
                        -- and   pu_cd = '${col.PU_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                var tSQL = `
                    select
                        *
                    from
                        ksv_stock_mem
                    where
                        po_cd = '${col.PO_CD}'
                        and matl_cd = '${col.MATL_CD}'
                        and order_cd = '${col.ORDER_CD}'
                `;
                var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));

                var tSaveOutQty = parseFloat(col.OUT_QTY);

                var tIdx0 = 0;
                for (tIdx0 = 0; tIdx0 < nRet0.length; tIdx0++) {
                    var col1 = { ...nRet0[tIdx0] };

                    if (tSaveOutQty <= 0) break;

                    var tOutQty = 0;

                    if (col1.OUTFAC_QTY + tSaveOutQty >= col1.INFAC_QTY) {
                        tOutQty = col1.INFAC_QTY - col1.OUTFAC_QTY;
                        tSaveOutQty -= tOutQty;
                    } else {
                        tOutQty = tSaveOutQty;
                        tSaveOutQty = 0;
                    }

                    let tSQL99 = `
                        update ksv_stock_mem
                        set
                            outfac_qty = outfac_qty + ${tOutQty}
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
                tObj.CODE = 'SUCCEED:STOCK_IN:' + args.datas.length;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:STOCK_IN';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },
    },
};

export default moduleMutation_S0520_5;
