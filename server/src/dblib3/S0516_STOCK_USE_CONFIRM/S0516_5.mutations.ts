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
const moduleMutation_S0516_5 = {
    Mutation: {
        mgrInsert_S0516_5_stock_confirm: async (_, args, contextValue) => {
            //
            var tDateNew = new Date();
            tDateNew.setMonth(tDateNew.getMonth() + 1);
            var tZeroDate = '00';
            var tDateNew_M =
                tZeroDate.substring(
                    0,
                    2 - String(tDateNew.getMonth() + 1).length,
                ) + String(tDateNew.getMonth() + 1);
            var tDateNew_D =
                tZeroDate.substring(0, 2 - String(tDateNew.getDate()).length) +
                String(tDateNew.getMonth());
            var tNewDateStr = tDateNew.getFullYear() + tDateNew_M + tDateNew_D;

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

            // let tPO = "POA2022S672";
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tSQLArray = [];

            var tIdx0 = 0;
            for (tIdx0 = 0; tIdx0 < args.datas.length; tIdx0++) {
                var col = { ...args.datas[tIdx0] };

                var tObj = {};
                tObj.CONF_FLAG2 = '1';
                tObj.CONF_USER = tUserInfo.USER_ID;

                if (col.REASON) tObj.REASON = col.REASON;
                if (col.OKUSE_QTY) tObj.okuse_qty = col.OKUSE_QTY;
                if (col.DEFECT_QTY) tObj.defect_qty = col.DEFECT_QTY;
                if (col.SHORT_QTY) tObj.short_qty = col.SHORT_QTY;

                /*
          if (col.REASON === '') {
              tObj.DEFECT_QTY = '0';
              tObj.LOSS_QTY = '0';
              tObj.NOTUSE_QTY = '0';
          } else {
              if (col.REASON === 'LOST') tObj.LOSS_QTY = col.CANCEL_QTY;
              if (col.REASON === 'DEFECT') tObj.DEFECT_QTY = col.CANCEL_QTY;
              if (col.REASON === 'NOT_USE') tObj.NOTUSE_QTY = col.CANCEL_QTY;
              tObj.REASON = col.REASON;
          }
          */

                let tSQL99 = AFLib.updateTableSql('ksv_stock_use', tObj);
                tSQL99 += ` where stock_idx = '${col.STOCK_IDX}' `;
                tSQL99 += ` and  use_po_cd  = '${col.PO_CD}' `;
                tSQL99 += ` and  use_po_seq  = '${col.PO_SEQ}' `;
                tSQL99 += ` and  use_order_cd  = '${col.ORDER_CD}' `;
                tSQL99 += ` and  use_matl_cd  = '${col.ORG_MATL_CD}' `;
                tSQL99 += ` and  use_mrp_seq  = '${col.MRP_SEQ}' `;
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
                tObj.CODE = 'SUCCEED:STOCK_CHECK:';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:STOCK_CHECK';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },

        mgrUpdate_S0516_5_stock_cancel: async (_, args, contextValue) => {
            //
            var tDateNew = new Date();
            tDateNew.setMonth(tDateNew.getMonth() + 1);
            var tZeroDate = '00';
            var tDateNew_M =
                tZeroDate.substring(
                    0,
                    2 - String(tDateNew.getMonth() + 1).length,
                ) + String(tDateNew.getMonth() + 1);
            var tDateNew_D =
                tZeroDate.substring(0, 2 - String(tDateNew.getDate()).length) +
                String(tDateNew.getMonth());
            var tNewDateStr = tDateNew.getFullYear() + tDateNew_M + tDateNew_D;

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

            // let tPO = "POA2022S672";
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tSQLArray = [];

            var tIdx0 = 0;
            for (tIdx0 = 0; tIdx0 < args.datas.length; tIdx0++) {
                var col = { ...args.datas[tIdx0] };
                var tObj = {};
                tObj.CONF_FLAG2 = '';
                tObj.CONF_USER = '';
                tObj.REASON = '';
                tObj.DEFECT_QTY = '0';
                tObj.LOSS_QTY = '0';
                tObj.NOTUSE_QTY = '0';
                let tSQL99 = AFLib.updateTableSql('ksv_stock_use', tObj);
                tSQL99 += ` where stock_idx = '${col.STOCK_IDX2}' `;
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
                tObj.CODE = 'SUCCEED:STOCK_CHECK_confirm_cancel:';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:STOCK_CHECK_confirm_cancel';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },

        mgrInsert_S0516_5_stock_confirm_purchase: async (
            _,
            args,
            contextValue,
        ) => {
            //
            var tDateNew = new Date();
            tDateNew.setMonth(tDateNew.getMonth() + 1);
            var tZeroDate = '00';
            var tDateNew_M =
                tZeroDate.substring(
                    0,
                    2 - String(tDateNew.getMonth() + 1).length,
                ) + String(tDateNew.getMonth() + 1);
            var tDateNew_D =
                tZeroDate.substring(0, 2 - String(tDateNew.getDate()).length) +
                String(tDateNew.getMonth());
            var tNewDateStr = tDateNew.getFullYear() + tDateNew_M + tDateNew_D;

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

            // let tPO = "POA2022S672";
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tIdx0 = 0;
            for (tIdx0 = 0; tIdx0 < args.datas.length; tIdx0++) {
                var col = { ...args.datas[tIdx0] };

                if (
                    col.REASON === 'LOST' ||
                    col.REASON === 'DEFECT' ||
                    col.REASON === 'NOT_USE'
                ) {
                    if (parseFloat(col.LOSS_QTY) > 0)
                        col.CANCEL_QTY = col.LOSS_QTY;
                    if (parseFloat(col.DEFECT_QTY) > 0)
                        col.CANCEL_QTY = col.DEFECT_QTY;
                    if (parseFloat(col.NOTUSE_QTY) > 0)
                        col.CANCEL_QTY = col.NOTUSE_QTY;
                }

                /*
          if (col.REASON === 'LOST') col.CANCEL_QTY = col.LOSS_QTY;
          if (col.REASON === 'DEFECT') col.CANCEL_QTY = col.DEFECT_QTY;
          if (col.REASON === 'NOT_USE') col.CANCEL_QTY = col.NOTUSE_QTY;
          */

                var tSQLArray = [];

                var tSQL0 = `
                    select
                        *
                    from
                        ksv_stock_use
                    where
                        stock_idx = '${col.STOCK_IDX2}'
                        and use_po_cd = '${col.PO_CD}'
                        and use_po_seq = '${col.PO_SEQ}'
                        and use_matl_cd = '${col.MATL_CD}'
                        and use_order_cd = '${col.ORDER_CD}'
                        -- and use_datetime = '${col.REG_DATETIME}'
                `;
                var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL0));
                if (nRet0.length <= 0) continue;
                var tStockUse = { ...nRet0[0] };

                var tSQL0_2 = `
                    select
                        *
                    from
                        ksv_stock_matl
                    where
                        stock_idx = '${col.STOCK_IDX2}'
                `;
                var nRet0_2 = await prisma.$queryRaw(Prisma.raw(tSQL0_2));
                if (nRet0_2.length <= 0) continue;
                var tStockMatl = { ...nRet0_2[0] };

                var tSQL0_1 = `
                    select
                        *
                    from
                        ksv_po_mrp
                    where
                        po_cd = '${tStockUse.USE_PO_CD}'
                        and po_seq = '${tStockUse.USE_PO_SEQ}'
                        and order_cd = '${tStockUse.USE_ORDER_CD}'
                        and matl_cd = '${tStockUse.USE_MATL_CD}'
                        and use_po_type = '1'
                `;
                var nRet0_1 = await prisma.$queryRaw(Prisma.raw(tSQL0_1));
                if (nRet0_1.length <= 0) continue;
                var tPoMrp = { ...nRet0_1[0] };

                var tSQL3 = `
                    update ksv_po_mrp
                    set
                        po_qty = po_qty + ${col.CANCEL_QTY}
                    where
                        po_cd = '${tStockUse.USE_PO_CD}'
                        and po_seq = '${tStockUse.USE_PO_SEQ}'
                        and order_cd = '${tStockUse.USE_ORDER_CD}'
                        and matl_cd = '${tStockUse.USE_MATL_CD}'
                        and use_po_type = '1'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL3));
                tSQLArray.push(tSQL99_1);

                var tSQL3 = `
                    update ksv_po_mrp
                    set
                        po_qty = po_qty - ${col.CANCEL_QTY},
                        use_qty = use_qty - ${col.CANCEL_QTY}
                    where
                        po_cd = '${tStockUse.USE_PO_CD}'
                        and po_seq = '${tStockUse.USE_PO_SEQ}'
                        and order_cd = '${tStockUse.USE_ORDER_CD}'
                        and matl_cd = '${tStockUse.USE_MATL_CD}'
                        and mrp_seq = '${tStockUse.USE_MRP_SEQ}'
                        and stock_idx = '${tStockUse.STOCK_IDX}'
                        and use_po_type = '2'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL3));
                tSQLArray.push(tSQL99_1);

                var tSQL3 = `
                    update ksv_stock_use
                    set
                        use_qty = use_qty - ${col.CANCEL_QTY},
                        conf_flag2 = '2'
                    where
                        use_po_cd = '${tStockUse.USE_PO_CD}'
                        and use_po_seq = '${tStockUse.USE_PO_SEQ}'
                        and use_order_cd = '${tStockUse.USE_ORDER_CD}'
                        and use_matl_cd = '${tStockUse.USE_MATL_CD}'
                        and use_mrp_seq = '${tStockUse.USE_MRP_SEQ}'
                        and stock_idx = '${tStockUse.STOCK_IDX}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL3));
                tSQLArray.push(tSQL99_1);

                if (
                    parseFloat(tStockUse.USE_QTY) === parseFloat(col.CANCEL_QTY)
                ) {
                    var tSQL3 = `
                        delete from ksv_po_mrp
                        where
                            po_cd = '${tStockUse.USE_PO_CD}'
                            and po_seq = '${tStockUse.USE_PO_SEQ}'
                            and order_cd = '${tStockUse.USE_ORDER_CD}'
                            and matl_cd = '${tStockUse.USE_MATL_CD}'
                            and mrp_seq = '${tStockUse.USE_MRP_SEQ}'
                            and stock_idx = '${tStockUse.STOCK_IDX}'
                            and use_po_type = '2'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL3));
                    tSQLArray.push(tSQL99_1);

                    var tSQL3 = `
                        delete from ksv_stock_use
                        where
                            use_po_cd = '${tStockUse.USE_PO_CD}'
                            and use_po_seq = '${tStockUse.USE_PO_SEQ}'
                            and use_order_cd = '${tStockUse.USE_ORDER_CD}'
                            and use_matl_cd = '${tStockUse.USE_MATL_CD}'
                            and use_mrp_seq = '${tStockUse.USE_MRP_SEQ}'
                            and stock_idx = '${tStockUse.STOCK_IDX}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL3));
                    tSQLArray.push(tSQL99_1);
                }

                if (col.REASON === 'DEFECT' || col.REASON === 'LOST') {
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
                        t_Zero.substring(0, 9 - String(tStockIdx)) +
                        String(tStockIdx);
                    var tOrgStockIdx = col.STOCK_IDX2;
                    if (col.REASON === 'LOST') {
                        tStockMatl.REMARK = 'Lost';
                        tStockMatl.REMARK0 = 'Lost';
                        tStockMatl.CONDITION = 'DEFECT';
                        tStockMatl.STOCK_QTY = col.CANCEL_QTY;
                        tStockMatl.USE_QTY = '0';
                    }
                    if (col.REASON === 'DEFECT') {
                        tStockMatl.REMARK = 'Defect';
                        tStockMatl.REMARK0 = 'Defect';
                        tStockMatl.CONDITION = 'DEFECT';
                        tStockMatl.STOCK_QTY = col.CANCEL_QTY;
                        tStockMatl.USE_QTY = '0';
                    }

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
                                org_stock_idx,
                                root_idx,
                                waiting_qty,
                                stock_status_2,
                                owner_ship,
                                reason_make,
                                authority,
                                condition,
                                manager,
                                purpose,
                                location
                            )
                        values
                            (
                                '${m_StockIdx}',
                                '${tStockMatl.PO_CD}',
                                '${tStockMatl.PO_SEQ}',
                                '${tStockMatl.ORDER_CD}',
                                '${tStockMatl.MATL_CD}',
                                '1',
                                '1',
                                ${tStockMatl.STOCK_QTY},
                                ${tStockMatl.REMAIN_QTY},
                                '${tStockMatl.USE_QTY}',
                                '${tStockMatl.FACTORY_CD}',
                                '5',
                                '${tRetDate1}',
                                '${tStockMatl.REMARK}',
                                '${tStockMatl.REMARK0}',
                                '${tStockMatl.REASON_REMARK}',
                                '0',
                                '${tUserInfo.USER_ID}',
                                '${tRetDate}',
                                '${tOrgStockIdx}',
                                '${m_StockIdx}',
                                '0',
                                '${tStockMatl.STOCK_STATUS_2}',
                                '${tStockMatl.OWNER_SHIP}',
                                '${tStockMatl.REASON_MAKE}',
                                '${tStockMatl.AUTHORITY}',
                                '${tStockMatl.CONDITION}',
                                '${tStockMatl.MANAGER}',
                                '${tStockMatl.PURPOSE}',
                                '${tStockMatl.LOCATION}'
                            )
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }

                var tSQL3 = `
                    update ksv_stock_mem
                    set
                        po_qty = po_qty + ${col.CANCEL_QTY}
                    where
                        po_cd = '${tStockUse.USE_PO_CD}'
                        and po_seq = '${tStockUse.USE_PO_SEQ}'
                        and order_cd = '${tStockUse.USE_ORDER_CD}'
                        and matl_cd = '${tStockUse.USE_MATL_CD}'
                        and mrp_seq = '${tPoMrp.MRP_SEQ}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL3));
                tSQLArray.push(tSQL99_1);

                var tSQL3 = `
                    update ksv_stock_matl
                    set
                        remain_qty = remain_qty + ${col.CANCEL_QTY},
                        use_qty = use_qty - ${col.CANCEL_QTY}
                    where
                        stock_idx = '${col.STOCK_IDX2}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL3));
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
                    tObj.CODE = 'ERROR:STOCK_CHECK';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED:STOCK_CHECK:';
            tObj.id = 0;
            tRetArray.push(tObj);
            return tRetArray;
        },

        mgrUpdate_S0516_5_stock_cancel_purchase: async (
            _,
            args,
            contextValue,
        ) => {
            //
            var tDateNew = new Date();
            tDateNew.setMonth(tDateNew.getMonth() + 1);
            var tZeroDate = '00';
            var tDateNew_M =
                tZeroDate.substring(
                    0,
                    2 - String(tDateNew.getMonth() + 1).length,
                ) + String(tDateNew.getMonth() + 1);
            var tDateNew_D =
                tZeroDate.substring(0, 2 - String(tDateNew.getDate()).length) +
                String(tDateNew.getMonth());
            var tNewDateStr = tDateNew.getFullYear() + tDateNew_M + tDateNew_D;

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

            // let tPO = "POA2022S672";
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tSQLArray = [];

            var tIdx0 = 0;
            for (tIdx0 = 0; tIdx0 < args.datas.length; tIdx0++) {
                var col = { ...args.datas[tIdx0] };
                var tObj = {};
                tObj.CONF_FLAG2 = '';
                tObj.CONF_USER = '';
                tObj.REASON = '';
                tObj.DEFECT_QTY = '0';
                let tSQL99 = AFLib.updateTableSql('ksv_stock_use', tObj);
                tSQL99 += ` where stock_idx = '${col.STOCK_IDX2}' `;
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
                tObj.CODE = 'SUCCEED:STOCK_CHECK_confirm_cancel:';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:STOCK_CHECK_confirm_cancel';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },
    },
};

export default moduleMutation_S0516_5;
