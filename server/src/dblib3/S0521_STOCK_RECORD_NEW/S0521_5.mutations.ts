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
const moduleMutation_S0521_5 = {
    Mutation: {
        mgrInsert_S0521_5: async (_, args, contextValue) => {
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

            var tInput = { ...args.datas };
            var tInput1 = [...args.datas1];
            var tInput2 = { ...args.datas2 };

            if (typeof tInput.STOCK_IDX === 'undefined') {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Insert Stock:Invalid Stock Idx(1)';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            if (tInput.STOCK_IDX === '' && tInput.IS_NEW === '1') {
                ;
            } else if (tInput.STOCK_IDX === '') {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Insert Stock:Not Found Stock Idx';
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
            if (nRet0.length > 0) col = { ...nRet0[0] };

            if (tInput.STOCK_IDX === '') {
                col = { ...tInput2 };
                col.PO_SEQ = '';
                col.FACTORY_CD = 'FC034';
                col.STOCK_STATUS_2 = 'S1';
            }

            var tIdx1 = 0;
            for (tIdx1 = 0; tIdx1 < args.datas1.length; tIdx1++) {
                var col1 = { ...args.datas1[tIdx1] };
                if (parseFloat(col1.QTY) <= 0) continue;

                if (!col1.RACK) col1.RACK = '';
                if (!col.STOCK_STATUS_2) col.STOCK_STATUS_2 = 'S1';

                if (col1.SEQ === 'LOST0') {
                    /* 현재는 처리를 보류함.  stock을 defect로 처리함 */
                    var sql0 = `
                        select
                            *
                        from
                            ksv_stock_facout
                        where
                            po_cd = '${col.PO_CD}'
                            and order_cd = '${col.ORDER_CD}'
                            and matl_cd = '${col.MATL_CD}'
                            and remark like '%storage%'
                    `;
                    var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));

                    if (nRet0.length > 0) {
                        var tUpdateObj = { ...nRet0[0] };

                        let tSQL99 = `
                            update ksv_stock_facout
                            set
                                stock_qty = stock_qty - ${col1.QTY}
                            where
                                po_cd = '${col.PO_CD}'
                                and order_cd = '${col.ORDER_CD}'
                                and matl_cd = '${col.MATL_CD}'
                                and remark like '%storage%'
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);

                        let tSQL99 = `
                            insert into
                                ksv_stock_facout (
                                    po_cd,
                                    out_date,
                                    order_cd,
                                    matl_cd,
                                    out_qty,
                                    status_cd,
                                    reg_user,
                                    reg_datetime,
                                    remark
                                )
                            values
                                (
                                    '${col.PO_CD}',
                                    '${tRetDate1}',
                                    '${col.ORDER_CD}',
                                    '${col.MATL_CD}',
                                    '${col1.QTY}',
                                    '0',
                                    '${tUserInfo.USER_ID}',
                                    '${tRetDate}',
                                    'lost'
                                )
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);
                    }
                }

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
                var tOrgStockIdx = col.STOCK_IDX;
                var tRemainQty = col1.QTY;
                var tUseQty = '0';
                if (col.STOCK_IDX === '') tOrgStockIdx = m_StockIdx;

                var tStockStatus = ''; // Mininum Wating, or '5' : normal use
                /*
                if (tInput.CONDITION === 'NORMAL') tStockStatus = '5';
                else tStockStatus = 'N';
                */

                if (col1.SEQ === 'LOST') {
                    col.REMARK = 'Lost';
                    col.REMARK0 = 'Lost';
                    tInput.CONDITION = 'DEFECT';
                    tRemainQty = '0';
                    tUseQty = col1.QTY;
                    tStockStatus = 'E'; // Lost
                }

                if (tInput.CONDITION === 'DEFECT') tStockStatus = tStockStatus;
                else if (tInput.CONDITION === 'NORMAL') tStockStatus = '5'; 
                else if (tInput.CONDITION === 'SAMPLE_ONLY') tStockStatus = '3'; 
                else if (tInput.CONDITION === 'JUST_ORDERED') tStockStatus = 'T'; 
                else if (tInput.CONDITION === 'NOT_FIXED') tStockStatus = 'N'; 
                else tStockStatus = '5';

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
                            location,
                            rack
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
                            ${col1.QTY},
                            ${tRemainQty},
                            '${tUseQty}',
                            '${col.FACTORY_CD}',
                            '${tStockStatus}',
                            '${tRetDate1}',
                            '${col.REMARK}',
                            '${col.REMARK0}',
                            '${col.REASON_REMARK}',
                            '0',
                            '${tUserInfo.USER_ID}',
                            '${tRetDate}',
                            '${tOrgStockIdx}',
                            '${m_StockIdx}',
                            '0',
                            '${col.STOCK_STATUS_2}',
                            '${tInput.OWNER_SHIP}',
                            '${tInput.REASON_MAKE}',
                            '${tInput.AUTHORITY}',
                            '${tInput.CONDITION}',
                            '${tInput.MANAGER}',
                            '${tInput.PURPOSE}',
                            '${col1.LOCATION}',
                            '${col1.RACK}'
                        )
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                if (col.STOCK_IDX) {
                    let tSQL99 = `
                        update ksv_stock_matl
                        set
                            stock_qty = stock_qty - ${col1.QTY},
                            remain_qty = remain_qty - ${col1.QTY}
                        where
                            stock_idx = '${col.STOCK_IDX}'
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
                tObj.CODE = 'SUCCEED:Stock Move';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Stock Move';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },
    },
};

export default moduleMutation_S0521_5;
