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
const moduleMutation_S0708_5 = {
    Mutation: {
        mgrInsert_S0708_5_INSERT_BILL: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tSQLArray = [];

            var tInput1 = { ...args.datas };
            var tInput2 = [...args.datas1];

            var tIdx = 0;
            for (tIdx = 0; tIdx < tInput2.length; tIdx++) {
                var tOne = { ...tInput2[tIdx] };

                var tInvoiceBill = {};
                tInvoiceBill.invoice_no = tOne.INVOICE_NO;
                tInvoiceBill.bill_date = tOne.BILL_DATE;
                tInvoiceBill.bill_amt = tOne.IN_AMT;
                tInvoiceBill.ref_no = tInput1.REF_NO;
                tInvoiceBill.bill_type = '1';
                tInvoiceBill.bank_cd = tInput1.BANK_CD;
                tInvoiceBill.curr_cd = tInput1.CURR_CD;
                tInvoiceBill.start_date = tOne.SHIP_DATE;
                tInvoiceBill.debit_cd = '';
                tInvoiceBill.pre_flag = tInput1.PRE_FLAG;
                tInvoiceBill.status_cd = '0';
                tInvoiceBill.reg_user = tUserInfo.USER_ID;
                tInvoiceBill.reg_datetime = tRetDate;
                tInvoiceBill.currency_rate = '1';
                tInvoiceBill.bill_amt_org = tOne.IN_AMT;
                tInvoiceBill.buyer_cd = tInput1.BUYER_CD;
                let tSQL99 = AFLib.createTableSql(
                    'ksv_invoice_bill',
                    tInvoiceBill,
                );
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    update ksv_invoice_bill
                    set
                        bill_amt = bill_amt - ${tOne.IN_AMT}
                    where
                        ref_no = '${tInput1.REF_NO}'
                        and pre_flag = '${tInput1.PRE_FLAG}'
                        and invoice_no = '미정'
                        and buyer_cd = '${tInput1.BUYER_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    update ksv_invoice_prebill
                    set
                        end_flag = '2'
                    where
                        ref_no = '${tInput1.REF_NO}'
                        and pre_flag = '${tInput1.PRE_FLAG}'
                        and buyer_cd = '${tInput1.BUYER_CD}'
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
                tObj.CODE = 'ERROR:Insert Invoice Bill';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED: Insert Invoice Bill ';
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },

        mgrInsert_S0708_5_DELETE_BILL: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tSQLArray = [];

            var tInput1 = [...args.datas];

            var tIdx = 0;
            for (tIdx = 0; tIdx < tInput1.length; tIdx++) {
                var tOne = { ...tInput1[tIdx] };

                let tSQL99 = `
                    delete from ksv_invoice_bill
                    where
                        ref_no = '${tOne.REF_NO}'
                        and pre_flag = '${tOne.PRE_FLAG}'
                        and invoice_no = '${tOne.INVOICE_NO}'
                        and buyer_cd = '${tOne.BUYER_CD}'
                        and bill_date = '${tOne.BILL_DATE}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    update ksv_invoice_bill
                    set
                        bill_amt = bill_amt + ${tOne.BILL_AMT}
                    where
                        ref_no = '${tOne.REF_NO}'
                        and pre_flag = '${tOne.PRE_FLAG}'
                        and invoice_no = '미정'
                        and buyer_cd = '${tOne.BUYER_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    update ksv_invoice_prebill
                    set
                        end_flag = '2'
                    where
                        ref_no = '${tOne.REF_NO}'
                        and pre_flag = '${tOne.PRE_FLAG}'
                        and buyer_cd = '${tOne.BUYER_CD}'
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
                tObj.CODE = 'ERROR:Delete Invoice Bill';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED: Delete Invoice Bill ';
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },

        mgrInsert_S0708_5_INSERT_DC: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tSQLArray = [];

            var tInput1 = { ...args.datas };
            var tInput2 = [...args.datas1];

            var tIdx = 0;
            for (tIdx = 0; tIdx < tInput2.length; tIdx++) {
                var tOne = { ...tInput2[tIdx] };

                if (tOne.CRDB_CD.substring(0, 1) === 'D') {
                    var tInvoiceBill = {};
                    tInvoiceBill.invoice_no = 'DEBIT';
                    tInvoiceBill.bill_date = tInput1.BILL_DATE;
                    tInvoiceBill.bill_amt = tOne.IN_AMT;
                    tInvoiceBill.ref_no = tInput1.REF_NO;
                    tInvoiceBill.bill_type = '1';
                    tInvoiceBill.bank_cd = tInput1.BANK_CD;
                    tInvoiceBill.curr_cd = tInput1.CURR_CD;
                    tInvoiceBill.start_date = tRetDate1;
                    tInvoiceBill.debit_cd = tOne.CRDB_CD;
                    tInvoiceBill.pre_flag = tInput1.PRE_FLAG;
                    tInvoiceBill.status_cd = '0';
                    tInvoiceBill.reg_user = tUserInfo.USER_ID;
                    tInvoiceBill.reg_datetime = tRetDate;
                    tInvoiceBill.currency_rate = '1';
                    tInvoiceBill.bill_amt_org = tOne.IN_AMT;
                    tInvoiceBill.buyer_cd = tInput1.BUYER_CD;
                    let tSQL99 = AFLib.createTableSql(
                        'ksv_invoice_bill',
                        tInvoiceBill,
                    );
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
                        update ksv_invoice_bill
                        set
                            bill_amt = bill_amt - ${tOne.IN_AMT}
                        where
                            ref_no = '${tInput1.REF_NO}'
                            and pre_flag = '${tInput1.PRE_FLAG}'
                            and invoice_no = '미정'
                            and buyer_cd = '${tInput1.BUYER_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    if (parseFloat(tOne.CRDB_AMT) > 0) {
                        var tCrdbMem = {};
                        tCrdbMem.crdb_cd = tOne.CRDB_CD;
                        tCrdbMem.end_date = tInput1.BILL_DATE;
                        tCrdbMem.crdb_amt = tOne.IN_AMT;
                        tCrdbMem.ref_no = tInput1.REF_NO;
                        tCrdbMem.pre_flag = tInput1.PRE_FLAG;
                        tCrdbMem.status_cd = '0';
                        tCrdbMem.reg_user = tUserInfo.USER_ID;
                        tCrdbMem.reg_datetime = tRetDate;
                        tCrdbMem.vat = tOne.VAT_AMT;
                        let tSQL99 = AFLib.createTableSql(
                            'ksv_crdb_mem',
                            tCrdbMem,
                        );
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);
                    }

                    if (parseFloat(tOne.IN_AMT) === parseFloat(tOne.REST_AMT)) {
                        let tSQL99 = `
                            update ksv_crdb_mst
                            set
                                status_cd = '1',
                                end_date = '${tRetDate1}'
                            where
                                crdb_cd = '${tOne.CRDB_CD}'
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);
                    } else {
                        let tSQL99 = `
                            update ksv_crdb_mst
                            set
                                status_cd = '2'
                            where
                                crdb_cd = '${tOne.CRDB_CD}'
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);
                    }
                } else {
                    var tInObj = {};
                    tInObj.ref_no = tInput1.REF_NO;
                    tInObj.credit_cd = tOne.CRDB_CD;
                    tInObj.credit_amt = tOne.IN_AMT;
                    tInObj.pre_flag = tInput1.PRE_FLAG;
                    tInObj.buyer_cd = tInput1.BUYER_CD;
                    let tSQL99 = AFLib.createTableSql(
                        'ksv_invoice_credit',
                        tInObj,
                    );
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
                        update ksv_invoice_prebill
                        set
                            credit_amt = credit_amt + ${tOne.IN_AMT}
                        where
                            ref_no = '${tInput1.REF_NO}'
                            and pre_flag = '${tInput1.PRE_FLAG}'
                            and buyer_cd = '${tInput1.BUYER_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
                        update ksv_invoice_bill
                        set
                            bill_amt = bill_amt + ${tOne.IN_AMT}
                        where
                            ref_no = '${tInput1.REF_NO}'
                            and invoice_no = '미정'
                            and pre_flag = '${tInput1.PRE_FLAG}'
                            and buyer_cd = '${tInput1.BUYER_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    if (parseFloat(tOne.CRDB_AMT) > 0) {
                        var tCrdbMem = {};
                        tCrdbMem.crdb_cd = tOne.CRDB_CD;
                        tCrdbMem.end_date = tInput1.BILL_DATE;
                        tCrdbMem.crdb_amt = tOne.IN_AMT;
                        tCrdbMem.ref_no = tInput1.REF_NO;
                        tCrdbMem.pre_flag = tInput1.PRE_FLAG;
                        tCrdbMem.status_cd = '0';
                        tCrdbMem.reg_user = tUserInfo.USER_ID;
                        tCrdbMem.reg_datetime = tRetDate;
                        tCrdbMem.vat = tOne.VAT_AMT;
                        let tSQL99 = AFLib.createTableSql(
                            'ksv_crdb_mem',
                            tCrdbMem,
                        );
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);
                    }

                    if (parseFloat(tOne.IN_AMT) === parseFloat(tOne.REST_AMT)) {
                        let tSQL99 = `
                            update ksv_crdb_mst
                            set
                                status_cd = '1',
                                end_date = '${tRetDate1}'
                            where
                                crdb_cd = '${tOne.CRDB_CD}'
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);
                    } else {
                        let tSQL99 = `
                            update ksv_crdb_mst
                            set
                                status_cd = '2'
                            where
                                crdb_cd = '${tOne.CRDB_CD}'
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
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Insert Invoice DC';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED: Insert Invoice DC ';
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },

        mgrInsert_S0708_5_DELETE_DC: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tSQLArray = [];

            var tInput1 = [...args.datas];

            var tIdx = 0;
            for (tIdx = 0; tIdx < tInput1.length; tIdx++) {
                var tOne = { ...tInput1[tIdx] };

                let tSQL99 = `
                    delete from ksv_invoice_bill
                    where
                        ref_no = '${tOne.REF_NO}'
                        and pre_flag = '${tOne.PRE_FLAG}'
                        and invoice_no = 'DEBIT'
                        and debit_cd = '${tOne.INVOICE_NO}'
                        and buyer_cd = '${tOne.BUYER_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    delete from ksv_crdb_mem
                    where
                        ref_no = '${tOne.REF_NO}'
                        and crdb_cd = '${tOne.INVOICE_NO}'
                        and pre_flag = '${tOne.PRE_FLAG}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    update ksv_invoice_bill
                    set
                        bill_amt = bill_amt + ${tOne.BILL_AMT}
                    where
                        ref_no = '${tOne.REF_NO}'
                        and pre_flag = '${tOne.PRE_FLAG}'
                        and invoice_no = '미정'
                        and buyer_cd = '${tOne.BUYER_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    update ksv_crdb_mst
                    set
                        status_cd = '0',
                        end_date = ''
                    where
                        crdb_cd = '${tOne.INVOICE_NO}'
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
                tObj.CODE = 'ERROR:Delete DC';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED: Delete DC ';
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },

        mgrInsert_S0708_5_DELETE_CREDIT: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tSQLArray = [];

            var tInput1 = [...args.datas];

            var tIdx = 0;
            for (tIdx = 0; tIdx < tInput1.length; tIdx++) {
                var tOne = { ...tInput1[tIdx] };

                let tSQL99 = `
                    delete from ksv_invoice_credit
                    where
                        ref_no = '${tOne.REF_NO}'
                        and credit_cd = '${tOne.CREDIT_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    delete from ksv_crdb_mem
                    where
                        ref_no = '${tOne.REF_NO}'
                        and crdb_cd = '${tOne.CREDIT_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    update ksv_crdb_mst
                    set
                        status_cd = '0',
                        end_date = ''
                    where
                        crdb_cd = '${tOne.CREDIT_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    update ksv_invoice_prebill
                    set
                        credit_amt = credit_amt - ${tOne.CREDIT_AMT}
                    where
                        ref_no = '${tOne.REF_NO}'
                        -- and   pre_flag = '${tOne.PRE_FLAG}'
                        -- and   buyer_cd = '${tOne.BUYER_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    update ksv_invoice_bill
                    set
                        bill_amt = bill_amt - ${tOne.CREDIT_AMT}
                    where
                        ref_no = '${tOne.REF_NO}'
                        and invoice_no = '미정'
                        -- and   pre_flag = '${tInput1.PRE_FLAG}'
                        -- and   buyer_cd = '${tInput1.BUYER_CD}'
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
                tObj.CODE = 'ERROR:Delete Credit';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED: Delete Credit ';
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },
    },
};

export default moduleMutation_S0708_5;
