import { Prisma } from '@prisma/client';
import prisma from '../../db';
import AFLib from '../../commlib';

const moduleMutation_S0517_5 = {
    Mutation: {
        mgrUpdate_S0517_5_MATL_CD: async (_, args, contextValue) => {
            var tRetObj = { CODE: '', id: 0 };
            try {
                var tStockIdx = String(args.datas.STOCK_IDX || '').trim();
                var tMatlCd = String(args.datas.MATL_CD || '').trim();
                var tRetDate = AFLib.getCurrTime();
                var tUserInfo = AFLib.getUserInfo(contextValue);
                var tRegUser = String(tUserInfo?.USER_ID || '').trim();

                const escapeSql = (val) => String(val || '').replace(/'/g, "''");

                if (tStockIdx === '' || tMatlCd === '') {
                    tRetObj.CODE = 'ERROR:STOCK_IDX and MATL_CD are required';
                    return [tRetObj];
                }

                let sqlMatlSeq = `
                    select
                        max(matl_seq) as matl_seq
                    from
                        kcd_matl_mem
                    where
                        matl_cd = '${escapeSql(tMatlCd)}'
                `;
                var tSeqRet = await prisma.$queryRaw(Prisma.raw(sqlMatlSeq));
                var tMatlSeq = '';
                if (tSeqRet.length > 0) {
                    tMatlSeq = String(tSeqRet[0].matl_seq || '').trim();
                }

                if (tMatlSeq === '') {
                    tRetObj.CODE = 'ERROR:MATL_SEQ not found for MATL_CD';
                    return [tRetObj];
                }

                let tUpdateSql = `
                    update ksv_stock_matl set 
                        matl_cd = '${escapeSql(tMatlCd)}', 
                        matl_seq = '${escapeSql(tMatlSeq)}'
                    where 
                        stock_idx='${escapeSql(tStockIdx)}'
                `;

                let tEscapedSqlForLog = tUpdateSql.replace(/'/g, "''");
                let tInsertLogSql = `
                    insert into kzz_sendetp_log (
                        table_name,
                        job_flag,
                        send_flag,
                        send_datetime,
                        key1,
                        sql1,
                        status_cd,
                        reg_user,
                        reg_datetime
                    )
                    values (
                        'KSV_STOCK_MATL',
                        'U',
                        '0',
                        '',
                        '${escapeSql(tStockIdx)}',
                        '${tEscapedSqlForLog}',
                        '0',
                        '${escapeSql(tRegUser)}',
                        '${escapeSql(tRetDate)}'
                    )
                `;

                var tSQLArray = [];
                tSQLArray.push(prisma.$queryRaw(Prisma.raw(tUpdateSql)));
                tSQLArray.push(prisma.$queryRaw(Prisma.raw(tInsertLogSql)));

                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
                
                tRetObj.CODE = 'SUCCEED:Update Matl Cd';
                tRetObj.id = 1;
            } catch (e) {
                delete global.currentTransactionInfo;
                tRetObj.CODE = `ERROR:Update Matl Cd:${e.message}`;
            }

            return [tRetObj];
        },

        mgrUpdate_S0517_5_BUYER_CD: async (_, args, contextValue) => {
            var tRetObj = { CODE: '', id: 0 };
            try {
                var tStockIdx = String(args.datas.STOCK_IDX || '').trim();
                var tBuyerCd = String(args.datas.BUYER_CD || '').trim();
                var tRetDate = AFLib.getCurrTime();
                var tUserInfo = AFLib.getUserInfo(contextValue);
                var tRegUser = String(tUserInfo?.USER_ID || '').trim();

                const escapeSql = (val) => String(val || '').replace(/'/g, "''");

                if (tStockIdx === '' || tBuyerCd === '') {
                    tRetObj.CODE = 'ERROR:STOCK_IDX and BUYER_CD are required';
                    return [tRetObj];
                }

                let tOrderCd = `${tBuyerCd}00-00000`;
                let tUpdateSql = `
                    update ksv_stock_matl set 
                        order_cd = '${escapeSql(tOrderCd)}'
                    where 
                        stock_idx='${escapeSql(tStockIdx)}'
                `;

                let tEscapedSqlForLog = tUpdateSql.replace(/'/g, "''");
                let tInsertLogSql = `
                    insert into kzz_sendetp_log (
                        table_name,
                        job_flag,
                        send_flag,
                        send_datetime,
                        key1,
                        sql1,
                        status_cd,
                        reg_user,
                        reg_datetime
                    )
                    values (
                        'KSV_STOCK_MATL',
                        'U',
                        '0',
                        '',
                        '${escapeSql(tStockIdx)}',
                        '${tEscapedSqlForLog}',
                        '0',
                        '${escapeSql(tRegUser)}',
                        '${escapeSql(tRetDate)}'
                    )
                `;

                var tSQLArray = [];
                tSQLArray.push(prisma.$queryRaw(Prisma.raw(tUpdateSql)));
                tSQLArray.push(prisma.$queryRaw(Prisma.raw(tInsertLogSql)));

                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;

                tRetObj.CODE = 'SUCCEED:Update Buyer Cd';
                tRetObj.id = 1;
            } catch (e) {
                delete global.currentTransactionInfo;
                tRetObj.CODE = `ERROR:Update Buyer Cd:${e.message}`;
            }

            return [tRetObj];
        },

        mgrUpdate_S0517_5_REMARK: async (_, args, contextValue) => {
            var tRetObj = { CODE: '', id: 0 };
            try {
                var tRetDate = AFLib.getCurrTime();
                var tUserInfo = AFLib.getUserInfo(contextValue);
                var tRegUser = String(tUserInfo?.USER_ID || '').trim();

                const escapeSql = (val) => String(val || '').replace(/'/g, "''");

                var tRows = args.datas.DATAS;
                if (!tRows || tRows.length === 0) {
                    tRetObj.CODE = 'ERROR:No rows to update';
                    return [tRetObj];
                }

                var tSQLArray = [];
                for (var i = 0; i < tRows.length; i++) {
                    var tStockIdx = String(tRows[i].STOCK_IDX || '').trim();
                    var tRemark = String(tRows[i].REMARK || '').trim();

                    if (tStockIdx === '') continue;

                    let tUpdateSql = `
                        update ksv_stock_matl set
                            remark = '${escapeSql(tRemark)}'
                        where
                            stock_idx = '${escapeSql(tStockIdx)}'
                    `;

                    let tEscapedSqlForLog = tUpdateSql.replace(/'/g, "''");
                    let tInsertLogSql = `
                        insert into kzz_sendetp_log (
                            table_name,
                            job_flag,
                            send_flag,
                            send_datetime,
                            key1,
                            sql1,
                            status_cd,
                            reg_user,
                            reg_datetime
                        )
                        values (
                            'KSV_STOCK_MATL',
                            'U',
                            '0',
                            '',
                            '${escapeSql(tStockIdx)}',
                            '${tEscapedSqlForLog}',
                            '0',
                            '${escapeSql(tRegUser)}',
                            '${escapeSql(tRetDate)}'
                        )
                    `;

                    tSQLArray.push(prisma.$queryRaw(Prisma.raw(tUpdateSql)));
                    tSQLArray.push(prisma.$queryRaw(Prisma.raw(tInsertLogSql)));
                }

                if (tSQLArray.length === 0) {
                    tRetObj.CODE = 'ERROR:No valid rows to update';
                    return [tRetObj];
                }

                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;

                tRetObj.CODE = 'SUCCEED:Update Remark';
                tRetObj.id = tRows.length;
            } catch (e) {
                delete global.currentTransactionInfo;
                tRetObj.CODE = `ERROR:Update Remark:${e.message}`;
            }

            return [tRetObj];
        },

        mgrUpdate_S0517_5_QTY: async (_, args, contextValue) => {
            var tRetObj = { CODE: '', id: 0 };
            try {
                var tRetDate = AFLib.getCurrTime();
                var tUserInfo = AFLib.getUserInfo(contextValue);
                var tRegUser = String(tUserInfo?.USER_ID || '').trim();

                const escapeSql = (val) => String(val || '').replace(/'/g, "''");

                var tRows = args.datas.DATAS;
                if (!tRows || tRows.length === 0) {
                    tRetObj.CODE = 'ERROR:No rows to update';
                    return [tRetObj];
                }

                var tSQLArray = [];
                var tUpdatedCnt = 0;

                for (var i = 0; i < tRows.length; i++) {
                    var tStockIdx = String(tRows[i].STOCK_IDX || '').trim();
                    var tStockQty = String(tRows[i].STOCK_QTY || '').replace(/,/g, '').trim();
                    var tRemainQty = String(tRows[i].REMAIN_QTY || '').replace(/,/g, '').trim();

                    if (tStockIdx === '') continue;

                    let tUpdateSql = `
                        update ksv_stock_matl set
                            stock_qty = '${escapeSql(tStockQty)}',
                            remain_qty = '${escapeSql(tRemainQty)}'
                        where
                            stock_idx = '${escapeSql(tStockIdx)}'
                    `;

                    let tEscapedSqlForLog = tUpdateSql.replace(/'/g, "''");
                    let tInsertLogSql = `
                        insert into kzz_sendetp_log (
                            table_name,
                            job_flag,
                            send_flag,
                            send_datetime,
                            key1,
                            sql1,
                            status_cd,
                            reg_user,
                            reg_datetime
                        )
                        values (
                            'KSV_STOCK_MATL',
                            'U',
                            '0',
                            '',
                            '${escapeSql(tStockIdx)}',
                            '${tEscapedSqlForLog}',
                            '0',
                            '${escapeSql(tRegUser)}',
                            '${escapeSql(tRetDate)}'
                        )
                    `;

                    tSQLArray.push(prisma.$queryRaw(Prisma.raw(tUpdateSql)));
                    tSQLArray.push(prisma.$queryRaw(Prisma.raw(tInsertLogSql)));
                    tUpdatedCnt += 1;
                }

                if (tSQLArray.length === 0) {
                    tRetObj.CODE = 'ERROR:No valid rows to update';
                    return [tRetObj];
                }

                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;

                tRetObj.CODE = 'SUCCEED:Update Qty';
                tRetObj.id = tUpdatedCnt;
            } catch (e) {
                delete global.currentTransactionInfo;
                tRetObj.CODE = `ERROR:Update Qty:${e.message}`;
            }

            return [tRetObj];
        },

        mgrUpdate_S0517_5_PO_ORDER: async (_, args, contextValue) => {
            var tRetObj = { CODE: '', id: 0 };
            try {
                var tStockIdx = String(args.datas.STOCK_IDX || '').trim();
                var tPoCd = String(args.datas.PO_CD || '').trim();
                var tOrderCd = String(args.datas.ORDER_CD || '').trim();
                var tRetDate = AFLib.getCurrTime();
                var tUserInfo = AFLib.getUserInfo(contextValue);
                var tRegUser = String(tUserInfo?.USER_ID || '').trim();

                const escapeSql = (val) => String(val || '').replace(/'/g, "''");

                if (tStockIdx === '') {
                    tRetObj.CODE = 'ERROR:STOCK_IDX is required';
                    return [tRetObj];
                }

                if (tOrderCd === '' && tPoCd !== '') {
                    let tOrderCdSql = `
                        select top 1
                            order_cd as ORDER_CD
                        from
                            ksv_po_mem
                        where
                            po_cd = '${escapeSql(tPoCd)}'
                            and isnull(order_cd, '') <> ''
                        order by
                            order_cd desc
                    `;

                    var tOrderCdRet = await prisma.$queryRaw(
                        Prisma.raw(tOrderCdSql),
                    );
                    if (tOrderCdRet.length > 0) {
                        var tDbOrderCd = String(
                            tOrderCdRet[0].ORDER_CD || tOrderCdRet[0].order_cd || '',
                        ).trim();
                        if (tDbOrderCd !== '') {
                            tOrderCd = `${tDbOrderCd.substring(0, 2)}00-0000`;
                        }
                    }
                }

                let tUpdateSql = `
                    update ksv_stock_matl set
                        po_cd = '${escapeSql(tPoCd)}',
                        order_cd = '${escapeSql(tOrderCd)}'
                    where
                        stock_idx = '${escapeSql(tStockIdx)}'
                `;

                let tEscapedSqlForLog = tUpdateSql.replace(/'/g, "''");
                let tInsertLogSql = `
                    insert into kzz_sendetp_log (
                        table_name,
                        job_flag,
                        send_flag,
                        send_datetime,
                        key1,
                        sql1,
                        status_cd,
                        reg_user,
                        reg_datetime
                    )
                    values (
                        'KSV_STOCK_MATL',
                        'U',
                        '0',
                        '',
                        '${escapeSql(tStockIdx)}',
                        '${tEscapedSqlForLog}',
                        '0',
                        '${escapeSql(tRegUser)}',
                        '${escapeSql(tRetDate)}'
                    )
                `;

                var tSQLArray = [];
                tSQLArray.push(prisma.$queryRaw(Prisma.raw(tUpdateSql)));
                tSQLArray.push(prisma.$queryRaw(Prisma.raw(tInsertLogSql)));

                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;

                tRetObj.CODE = 'SUCCEED:Update Po Order';
                tRetObj.id = 1;
            } catch (e) {
                delete global.currentTransactionInfo;
                tRetObj.CODE = `ERROR:Update Po Order:${e.message}`;
            }

            return [tRetObj];
        },
    },
};

export default moduleMutation_S0517_5;
