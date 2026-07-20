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
const moduleMutation_S0607_5 = {
    Mutation: {
        mgrInsert_S0607_5_INSERT_NEGO: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput1 = { ...args.datas1 };

            console.log('Server Pro');
            var tSQLArray = [];
            // console.log(args.datas);

            let sql0 = `
                select
                    *
                from
                    ksv_invoice_nego
                where
                    ref_no = '${tInput1.REF_NO}'
            `;
            var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            if (nRet0.length > 0) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Already Regist REF_NO';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            let tSQL99 = `
                INSERT INTO
                    KSV_INVOICE_NEGO (
                        ref_no,
                        bill_date,
                        tot_amt,
                        bank_cd,
                        buyer_cd,
                        curr_cd,
                        start_date,
                        end_date,
                        delay_days,
                        delay_interest,
                        less_charge,
                        exchange_comm,
                        handling_charge,
                        postage,
                        STATUS_CD,
                        REG_USER,
                        REG_DATETIME,
                        invoice_nego_type
                    )
                VALUES
                    (
                        '${tInput1.REF_NO}',
                        '${tInput1.BILL_DATE}',
                        '${tInput1.TOT_AMT}',
                        '${tInput1.BANK_CD}',
                        '${tInput1.BUYER_CD}',
                        '${tInput1.CURR_CD}',
                        '${tInput1.START_DATE}',
                        '${tInput1.END_DATE}',
                        '${tInput1.DELAY_DAYS}',
                        '${tInput1.DELAY_INTEREST}',
                        '${tInput1.LESS_CHARGE}',
                        '${tInput1.EXCHANGE_COMM}',
                        '${tInput1.HANDLING_CHARGE}',
                        '${tInput1.POSTAGE}',
                        '0',
                        '${tUserInfo.USER_ID}',
                        '${tRetDate}',
                        '${tInput1.INVOICE_NEGO_TYPE}'
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
                tObj.CODE = 'ERROR:Insert LC NEGO';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED:Insert LC NEGO ' + tInput1.REF_NO;
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },

        mgrInsert_S0607_5_INSERT_INVOICE: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput1 = { ...args.datas1 };

            console.log('Server Pro');
            var tSQLArray = [];
            // console.log(args.datas);

            let sql0 = `
                select
                    a.factory_cd
                from
                    ksv_invoice_mst a
                where
                    a.invoice_no = '${tInput1.INVOICE_NO}'
            `;
            var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            var tFactoryCd = nRet0[0].factory_cd;

            var m_BillType = '3';
            if (tInput1.INVOICE_NEGO_TYPE === '2') m_BillType = '2';

            let tSQL99 = `
                INSERT INTO
                    KSV_INVOICE_BILL (
                        ref_no,
                        invoice_no,
                        bill_type,
                        bill_date,
                        bill_amt,
                        bank_cd,
                        curr_cd,
                        start_date,
                        end_date,
                        currency_rate,
                        bill_amt_org,
                        STATUS_CD,
                        REG_USER,
                        REG_DATETIME,
                        pre_flag
                    )
                VALUES
                    (
                        '${tInput1.REF_NO}',
                        '${tInput1.INVOICE_NO}',
                        '${m_BillType}',
                        '${tInput1.START_DATE}',
                        '${tInput1.BILL_AMT}',
                        '${tInput1.BANK_CD}',
                        '${tInput1.CURR_CD}',
                        '${tInput1.START_DATE}',
                        '${tInput1.END_DATE}',
                        '1',
                        '${tInput1.BILL_AMT}',
                        '0',
                        '${tUserInfo.USER_ID}',
                        '${tRetDate}',
                        '0'
                    )
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            let tSQL99 = `
                update ksv_invoice_nego
                set
                    factory_cd = '${tFactoryCd}'
                where
                    ref_no = '${tInput1.REF_NO}';
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
                tObj.CODE = 'ERROR:Insert LC NEGO';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED: Insert LC NEGO:Invoice ' + tInput1.REF_NO;
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },

        mgrUpdate_S0607_5_UPDATE_NEGO: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput1 = { ...args.datas1 };

            let sql0 = `
                select
                    isnull(sum(bill_amt), 0) as bill_amt
                from
                    ksv_invoice_bill
                where
                    ref_no = '${tInput1.REF_NO}'
            `;
            var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            var tBilledAmt = 0;
            if (nRet0.length > 0) tBilledAmt = parseFloat(nRet0[0].bill_amt);

            if (tBilledAmt > parseFloat(tInput1.TOT_AMT)) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE =
                    'ERROR:금액을 이미  상계한 금액보다 적게 수정할수 없습니다';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            console.log('Server Pro');
            var tSQLArray = [];
            // console.log(args.datas);
            let tSQL99 = `
                UPDATE ksv_invoice_nego
                SET
                    BILL_DATE = '${tInput1.BILL_DATE}',
                    TOT_AMT = '${tInput1.TOT_AMT}',
                    CURR_CD = '${tInput1.CURR_CD}',
                    start_date = '${tInput1.START_DATE}',
                    end_date = '${tInput1.END_DATE}',
                    delay_days = '${tInput1.DELAY_DAYS}',
                    delay_interest = '${tInput1.DELAY_INTEREST}',
                    less_charge = '${tInput1.LESS_CHARGE}',
                    buyer_cd = '${tInput1.BUYER_CD}',
                    bank_cd = '${tInput1.BANK_CD}',
                    invoice_nego_type = '${tInput1.INVOICE_NEGO_TYPE}'
                WHERE
                    REF_NO = '${tInput1.REF_NO}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            let tSQL99 = `
                UPDATE ksv_invoice_bill
                SET
                    bill_type = '${tInput1.INVOICE_NEGO_TYPE}'
                WHERE
                    REF_NO = '${tInput1.REF_NO}'
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
                tObj.CODE = 'ERROR:Update LC NEGO';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED:Update LC NEGO';
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },

        mgrDelete_S0607_5_DELETE_NEGO: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput1 = { ...args.datas1 };
            var tSQLArray = [];

            let sql0 = `
                select
                    isnull(sum(bill_amt), 0) as bill_amt
                from
                    ksv_invoice_bill
                where
                    ref_no = '${tInput1.REF_NO}'
            `;
            var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            var tBilledAmt = 0;
            if (nRet0.length > 0) {
                if (parseFloat(nRet0[0].bill_amt) > 0) {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = 'ERROR:상계된 내역이 있어 삭제가 불가능합니다.';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }
            }

            let tSQL99 = `
                delete from ksv_invoice_nego
                WHERE
                    REF_NO = '${tInput1.REF_NO}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            let tSQL99 = `
                delete from ksv_invoice_bill
                WHERE
                    REF_NO = '${tInput1.REF_NO}'
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
                tObj.CODE = 'ERROR:Delete LC NEGO';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED:Delete LC NEGO';
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },

        mgrDelete_S0607_5_DELETE_INVOICE: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput1 = { ...args.datas1 };

            var tSQLArray = [];

            let tSQL99 = `
                delete from ksv_invoice_bill
                WHERE
                    REF_NO = '${tInput1.REF_NO}'
                    AND INVOICE_NO = '${tInput1.INVOICE_NO}'
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
                tObj.CODE = 'ERROR:Delete Invoice Bill';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED:Delete Invoice Bill';
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },
    },
};

export default moduleMutation_S0607_5;
