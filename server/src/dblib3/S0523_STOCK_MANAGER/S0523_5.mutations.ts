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
const moduleMutation_S0523_5 = {
    Mutation: {
        mgrUpdate_S0523_5_STOCK_UPDATE: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput = { ...args.datas };

            if (
                typeof tInput.STOCK_IDX === 'undefined' ||
                tInput.STOCK_IDX === ''
            ) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Stock Idx가 입력되지 않았습니다 ';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tSQLArray = [];

            var sql0 = `
                select
                    *
                from
                    ksv_stock_matl
                where
                    stock_idx = '${tInput.STOCK_IDX}'
            `;
            var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            var col = {};
            if (nRet0.length > 0) {
                col = { ...nRet0[0] };
            } else {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:없은 재고입니다.stock idx을 확인하세요  ';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            // Condition이 Normal이면 stock_status(구버전호환코드)는 5
            // 그외의 경우 '5' 이면 'N' . Waiting으르 변경
            // 구버전 호환코드 변경하지 않음.  20260520
            var tStockStatus = col.STOCK_STATUS;
            /*
            if (tInput.CONDITION === 'NORMAL') tStockStatus = '5';
            else {
                if (tStockStatus === '5') tStockStatus = 'N';
            }
            */

            // 수량 확인
            var sqlStockQty = '';
            var tNewStockStatus = tInput.STOCK_STATUS_S;
            var tRemainQty = col.REMAIN_QTY;
            if (tNewStockStatus === 'D' ||
                tNewStockStatus === 'E' ||
                tNewStockStatus === 'L' ||
                tNewStockStatus === 'S' ||
                tNewStockStatus === 'X' ||
                tNewStockStatus === 'B') {
                sqlStockQty = `remain_qty = 0, use_qty = use_qty + ${tRemainQty} , `;
            } else {
                ; 
            }
            /*
            if (tInput.CHANGE_QTY) {
                var tBefStockQty = parseFloat(col.STOCK_QTY);
                var tBefRemainQty = parseFloat(col.REMAIN_QTY);
                var tNewStockQty = parseFloat(tInput.CHANGE_QTY);
                var tDiffQty = 0;
                if (tBefStockQty !== tNewStockQty) {
                    tDiffQty = tNewStockQty - tBefStockQty;

                    var tNewRemainQty = tBefRemainQty + tDiffQty;
                    if (tNewRemainQty < 0) tNewRemainQty = 0;

                    sqlStockQty = `stock_qty = ${tNewStockQty}, remain_qty = ${tNewRemainQty}, `;
                }
            }
            */

            let tSQL99 = `
                update ksv_stock_matl
                set
                    location = '${tInput.LOCATION}',
                    rack = '${tInput.RACK}',
                    owner_ship = '${tInput.OWNER_SHIP}',
                    reason_make = '${tInput.REASON_MAKE}',
                    authority = '${tInput.AUTHORITY}',
                    condition = '${tInput.CONDITION}',
                    stock_status = '${tNewStockStatus}',
                    manager = '${tInput.MANAGER}',
                    remark = '${tInput.REMARK}',
                    reason_remark = '${tInput.REASON_REMARK}',
                    plan_remark = '${tInput.PLAN_REMARK}',
                    purpose = '${tInput.PURPOSE}',
                    ware_cd = '${tInput.WARE_CD}', ${sqlStockQty} 
                    upd_user = '${tUserInfo.USER_ID}',
                    upd_datetime = '${tRetDate}'
                where
                    stock_idx = '${col.STOCK_IDX}'
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
                tObj.CODE = 'SUCCEED:Stock Update';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Stock Update';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },

        mgrUpdate_S0523_5_UPDATE_QTY: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput = { ...args.datas };

            /*
            if (1) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = `ERROR:Test (${tInput.STOCK_IDX}/${tInput.ROOT_IDX}/${tInput.CHANGE_QTY}/${tInput.CONDITION}/${tInput.REMARK}) `;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
                
            }
            */

            if (
                typeof tInput.STOCK_IDX === 'undefined' ||
                tInput.STOCK_IDX === ''
            ) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Stock Idx가 입력되지 않았습니다 ';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tSQLArray = [];

            var sql0 = `
                select
                    *
                from
                    ksv_stock_matl
                where
                    stock_idx = '${tInput.STOCK_IDX}'
            `;
            var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            var col = {};
            if (nRet0.length > 0) {
                col = { ...nRet0[0] };
            } else {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:없은 재고입니다.stock idx을 확인하세요  ';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }


            // 수량확인
            if (parseFloat(tInput.CHANGE_QTY) > parseFloat(col.REMAIN_QTY)) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = `ERROR:변경할 수량이 Remain Qty보다 큽니다. 수량을 확인해 주세요 `;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }


            // var wUpdateQty = parseFloat(parseFloat(col.REMAIN_QTY) - parseFloat(tInput.CHANGE_QTY));
            var wUpdateQty = parseFloat(tInput.CHANGE_QTY);

            // 
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
            var tNewStockIdx =
                'S' +
                t_Zero.substring(0, 9 - String(tStockIdx).length) +
                String(tStockIdx);

            //
            var tInObj = { ...col };
            delete tInObj.id;

            var tStockStatus = col.STOCK_STATUS;
            // var tNewStockStatus = tInput.CONDITION;
            var tNewStockStatus = tInput.STOCK_STATUS_S;

            var newStockQty = 0;
            var newRemainQty = 0;
            var newUseQty = 0;
            var newOutQty = 0;

            // 기존버전의 Stock Status을 받아서 변경
            if (tNewStockStatus === 'D' ||
                tNewStockStatus === 'E' ||
                tNewStockStatus === 'L' ||
                tNewStockStatus === 'S' ||
                tNewStockStatus === 'X' ||
                tNewStockStatus === 'B') {
                newStockQty = wUpdateQty;
                newRemainQty = 0;
                newUseQty = wUpdateQty;
                tInObj.CONDITION = 'DEFECT';
                tInObj.STOCK_STATUS_2  = 'S1';
            } else if (tNewStockStatus === 'M' || 
                       tNewStockStatus === '5') {
                newStockQty = wUpdateQty;
                newRemainQty = wUpdateQty;
                newUseQty = 0;
                tInObj.CONDITION = 'NORMAL';
                tInObj.STOCK_STATUS_2  = 'S1';
            } else {
                newStockQty = wUpdateQty;
                newRemainQty = wUpdateQty;
                newUseQty = 0;
                tInObj.CONDITION = 'NORMAL';
                tInObj.STOCK_STATUS_2  = 'S1';
            }

            tInObj.STOCK_QTY = newStockQty;
            tInObj.REMAIN_QTY = newRemainQty;
            tInObj.USE_QTY = newUseQty;
            tInObj.OUT_QTY = '0';
            tInObj.STOCK_STATUS  = tNewStockStatus;

            /*
            // Condition이 Normal이면 stock_status(구버전호환코드)는 5
            // 그외의 경우 '5' 이면 'N' . Waiting으르 변경
            var tStockStatus = col.STOCK_STATUS;
            if (tInput.CONDITION === 'DEFECT') tStockStatus = 'B';
            else if (tInput.CONDITION === 'JUST_ORDERED') tStockStatus = '5';
            else if (tInput.CONDITION === 'NORMAL') tStockStatus = '5';
            else if (tInput.CONDITION === 'NOT_FIXED') tStockStatus = 'N';
            else if (tInput.CONDITION === 'SAMPLE_ONLY') tStockStatus = 'S';

            if (tInput.CONDITION === 'DEFECT') {
                tInObj.STOCK_QTY = tInput.CHANGE_QTY;
                tInObj.REMAIN_QTY = '0';
                tInObj.USE_QTY = tInput.CHANGE_QTY;
                tInObj.OUT_QTY = '0';
                tInObj.STOCK_STATUS  = tStockStatus;
                tInObj.STOCK_STATUS_2  = 'S1';
            } else { 
                tInObj.STOCK_QTY = tInput.CHANGE_QTY;
                tInObj.REMAIN_QTY = tInput.CHANGE_QTY;
                tInObj.USE_QTY = '0';
                tInObj.OUT_QTY = '0';
                tInObj.STOCK_STATUS  = tStockStatus;
                tInObj.STOCK_STATUS_2  = 'S1';
            }
            tInObj.CONDITION = tInput.CONDITION;
            */

            tInObj.AUTHORITY = tInput.AUTHORITY;
            tInObj.OWNER_SHIP = tInput.AUTHORITY;
            tInObj.PURPOSE = tInput.PURPOSE;
            tInObj.REMARK = tInput.REMARK;
            tInObj.LOCATION = tInput.LOCATION;
            tInObj.RACK = tInput.RACK;
            tInObj.REASON_REMARK = tInput.REASON_REMARK;
            tInObj.PLAN_REMARK = tInput.PLAN_REMARK;
            tInObj.REASON_MAKE = tInput.REASON_MAKE;
            tInObj.STOCK_IDX = tNewStockIdx;
            tInObj.ORG_STOCK_IDX = tInput.STOCK_IDX;
            tInObj.root_idx = col.root_idx;

            let tSQL99 = `
                update ksv_stock_matl
                set
                    stock_qty = stock_qty - ${wUpdateQty},
                    remain_qty = remain_qty - ${wUpdateQty},
                    out_qty =  out_qty + ${wUpdateQty},
                    upd_user = '${tUserInfo.USER_ID}',
                    upd_datetime = '${tRetDate}'
                where
                    stock_idx = '${tInput.STOCK_IDX}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            tInObj.REG_DATETIME = tRetDate;
            tInObj.REG_USER = tUserInfo.USER_ID;
            tInObj.UPD_DATETIME = tRetDate;
            tInObj.UPD_USER = tUserInfo.USER_ID;

            let tSQL99 = AFLib.createTableSql('KSV_STOCK_MATL', tInObj);
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
                tObj.CODE = 'SUCCEED:Update Qty';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Update Qty';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },

        mgrUpdate_S0523_5_BATCH_UPDATE: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput = { ...args.datas };
            var tInput1 = [...args.datas1];

            var tIdx = 0;
            for (tIdx = 0; tIdx < tInput1.length; tIdx++) {
                var tOne = { ...tInput1[tIdx] };
                var col = {};

                var tSQLArray = [];

                var sql0 = `
                    select
                        *
                    from
                        ksv_stock_matl
                    where
                        stock_idx = '${tOne.STOCK_IDX}'
                `;
                var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                var col = {};
                if (nRet0.length > 0) {
                    col = { ...nRet0[0] };
                } else {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE =
                        'ERROR:없은 재고입니다.stock idx을 확인하세요  ';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }

                var tSQL = '';
                var tSQL1 = '';
                if (tInput.REMARK === 'AUTHORITY')
                    tSQL = `                 authority = '${tInput.AUTHORITY}',`;
                if (tInput.REMARK === 'PURPOSE')
                    tSQL = `                 purpose = '${tInput.PURPOSE}',`;
                if (tInput.REMARK === 'CONDITION') {
                    tSQL = `                 condition = '${tInput.CONDITION}',`;
                    var tStockStatus = col.STOCK_STATUS;
                    if (tInput.CONDITION === 'NORMAL') tStockStatus = '5';
                    else {
                        if (tStockStatus === '5') tStockStatus = 'N';
                    }
                    tSQL1 = `                stock_status = '${tStockStatus}',`;
                }
                if (tInput.REMARK === 'RACK')
                    tSQL = `                 rack = '${tInput.RACK}',`;
                if (tInput.REMARK === 'LOCATION')
                    tSQL = `                 location = '${tInput.LOCATION}',`;

                let tSQL99 = `
                    update ksv_stock_matl
                    set
                        ${tSQL} ${tSQL1} upd_user = '${tUserInfo.USER_ID}',
                        upd_datetime = '${tRetDate}'
                    where
                        stock_idx = '${col.STOCK_IDX}'
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
                    tObj.CODE = 'ERROR:Stock Update';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }
            }
            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED:Stock Update';
            tObj.id = 0;
            tRetArray.push(tObj);
            return tRetArray;
        },

        mgrUpdate_S0523_5_DEFECT_UPDATE: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput = { ...args.datas };

            if (
                typeof tInput.STOCK_IDX === 'undefined' ||
                tInput.STOCK_IDX === ''
            ) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Stock Idx가 입력되지 않았습니다 ';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tSQLArray = [];

            var sql0 = `
                select
                    isnull(defect_qty, 0) as defect_qty,
                    isnull(remain_qty, 0) as remain_qty
                from
                    ksv_stock_matl
                where
                    stock_idx = '${tInput.STOCK_IDX}'
            `;
            var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            var col = {};
            if (nRet0.length > 0) {
                col = { ...nRet0[0] };
            } else {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:없은 재고입니다.stock idx을 확인하세요  ';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            if (parseFloat(col.remain_qty) < parseFloat(tInput.defect_qty)) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Remain수량보다 Defect 수량이 더 큽니다  ';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRemainQty =
                parseFloat(col.remain_qty) - parseFloat(tInput.DEFECT_QTY);
            var tDefectQty =
                parseFloat(col.defect_qty) + parseFloat(tInput.DEFECT_QTY);

            let tSQL99 = `
                update ksv_stock_matl
                set
                    defect_qty = ${tRemainQty},
                    remain_qty = ${tDefectQty}
                where
                    stock_idx = '${tInput.STOCK_IDX}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

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
            var m_OutFactoryCd = tInput.FACTORY_CD;

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
                        upd_user,
                        upd_datetime,
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
                select
                    '${m_StockIdx}',
                    po_cd,
                    po_seq,
                    order_cd,
                    matl_cd,
                    mrp_seq,
                    matl_seq,
                    '${tInput.DEFECT_QTY}',
                    '0',
                    '0',
                    factory_cd,
                    stock_status,
                    '${tRetDate1}',
                    remark,
                    remark0,
                    reason_remark,
                    status_cd,
                    '${tUserInfo.USER_ID}',
                    '${tRetDate}',
                    '${tUserInfo.USER_ID}',
                    '${tRetDate}',
                    org_stock_idx,
                    '${tInput.STOCK_IDX}',
                    '0',
                    'E',
                    owner_ship,
                    reason_make,
                    authority,
                    'DEFECT',
                    manager,
                    purpose,
                    location
                from
                    ksv_stock_matl
                where
                    stock_idx = '${tInput.STOCK_IDX}'
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
                tObj.CODE = 'SUCCEED:Stock Update';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Stock Update';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },

        mgrUpdate_S0523_5_FACTORY_UPDATE: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput = { ...args.datas };

            if (
                typeof tInput.STOCK_IDX === 'undefined' ||
                tInput.STOCK_IDX === ''
            ) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Stock Idx가 입력되지 않았습니다 ';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tSQLArray = [];

            var sql0 = `
                select
                    *
                from
                    ksv_stock_matl
                where
                    stock_idx = '${tInput.STOCK_IDX}'
            `;
            var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            var col = {};
            if (nRet0.length > 0) {
                col = { ...nRet0[0] };
            } else {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:없은 재고입니다.stock idx을 확인하세요  ';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            if (col.FACTORY_CD === tInput.FACTORY_CD) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:같은 Factory입니다 .  ';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRemainQty = parseFloat(col.REMAIN_QTY);

            let tSQL99 = `
                update ksv_stock_matl
                set
                    out_qty = ${tRemainQty},
                    remain_qty = 0,
                    upd_datetime = '${tRetDate}',
                    upd_user = '${tUserInfo.USER_ID}'
                where
                    stock_idx = '${col.STOCK_IDX}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

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
            var m_OutFactoryCd = tInput.FACTORY_CD;

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
                        upd_user,
                        upd_datetime,
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
                select
                    '${m_StockIdx}',
                    po_cd,
                    po_seq,
                    order_cd,
                    matl_cd,
                    mrp_seq,
                    matl_seq,
                    '${tRemainQty}',
                    '${tRemainQty}',
                    '0',
                    '0',
                    '${tInput.FACTORY_CD}',
                    stock_status,
                    '${tRetDate1}',
                    'Factory Change:${col.FACTORY_CD}->${tInput.FACTORY_CD}',
                    remark0,
                    '13',
                    status_cd,
                    '${tUserInfo.USER_ID}',
                    '${tRetDate}',
                    '${tUserInfo.USER_ID}',
                    '${tRetDate}',
                    org_stock_idx,
                    '${tInput.STOCK_IDX}',
                    '0',
                    stock_status_2,
                    owner_ship,
                    reason_make,
                    authority,
                    condition,
                    manager,
                    purpose,
                    location
                from
                    ksv_stock_matl
                where
                    stock_idx = '${tInput.STOCK_IDX}'
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
                tObj.CODE = 'SUCCEED:Stock Update';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Stock Update';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },
    },
};

export default moduleMutation_S0523_5;
