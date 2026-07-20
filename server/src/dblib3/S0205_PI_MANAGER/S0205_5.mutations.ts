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
const moduleMutation_S0205_5 = {
    Mutation: {
        mgrInsert_S0205_5: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput1 = { ...args.datas };
            var tInput2 = [...args.datas1];

            var tBuyerCd = tInput2[0].ORDER_CD.substring(0, 2);
            var tStyleCd = tInput2[0].STYLE_CD;

            var tYY = tRetDate.substring(2, 4);
            var yyyy_str = tRetDate.substring(0, 4);

            var sql0 = `
                SELECT
                    isnull(max(PI_CD), '${tBuyerCd}${tYY}-P0000') AS max_pi_cd
                FROM
                    KSV_ORDER_PIMST
                WHERE
                    PI_CD like '${tBuyerCd}${tYY}-P%'
            `;
            var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            var tMaxSeq = 1;
            if (nRet0.length > 0)
                tMaxSeq = parseInt(nRet0[0].max_pi_cd.substring(6, 10)) + 1;

            var tZero = '0000';
            var tNewPI_CD =
                `${tInput1.BUYER_CD}${tYY}-P` +
                tZero.substring(0, 4 - String(tMaxSeq).length) +
                String(tMaxSeq);

            var sql1 = `
                SELECT
                    a.BUYER_NAME,
                    a.BANK_CD,
                    a.PAY_RULE,
                    a.USER_NAME,
                    a.ADDR1,
                    a.ADDR2,
                    (
                        isnull(b.bank_name, '') + '_' + isnull(b.account_no, '')
                    ) as BANK,
                    isnull(c.remark, '') as REMARK
                FROM
                    KCD_BUYER a
                    left join kcd_bank b on b.bank_cd = a.bank_cd
                    left join kcd_pay_rule c on c.cd_code = a.pay_rule
                WHERE
                    (a.BUYER_CD = '${tBuyerCd}')
            `;
            var nRet1 = await prisma.$queryRaw(Prisma.raw(sql1));

            var tMesser = '';
            var tCosignee = '';
            var tMAddr1 = '';
            var tCAddr1 = '';
            var tMAddr2 = '';
            var tCAddr2 = '';
            var tBankCd = '';
            var tBank = '';
            var tPayRule = '';
            var tPayRuleName = '';
            var tPriceTerm = '0';
            var tBvtFlag = '0';
            console.log('step-4');

            if (nRet1.length > 0) {
                tMesser = nRet1[0].BUYER_NAME;
                tCosignee = nRet1[0].USER_NAME;
                tMAddr1 = nRet1[0].ADDR1;
                tMAddr2 = tInput1.DESTINATION;
                tCAddr1 = tInput1.LOADING_PORT;
                tCAddr2 = '';
                /*
        tMAddr1 = nRet1[0].ADDR1;
        tCAddr1 = nRet1[0].ADDR1;
        tMAddr2 = nRet1[0].ADDR2;
        tCAddr2 = nRet1[0].ADDR2;
        */
                tBank = nRet1[0].BANK;
                tPayRuleName = nRet1[0].REMARK;
                tPayRule = nRet1[0].PAY_RULE;
                tBankCd = nRet1[0].BANK_CD;
            }

            var tSQLArray = [];

            let tSQL99 = `
                INSERT INTO
                    KSV_ORDER_PIMST (
                        PI_CD,
                        MESSERS,
                        ADDR1,
                        ADDR2,
                        CONSIGNEE,
                        CADDR1,
                        CADDR2,
                        PRICE_TERM,
                        DESTINATION,
                        PORT,
                        BANK_CD,
                        PAY_TYPE_CD,
                        BVT_FLAG,
                        PI_REMARK1,
                        PI_REMARK2,
                        PI_REMARK3,
                        PI_REMARK4,
                        PI_REMARK5,
                        PI_REMARK6,
                        PI_REMARK7,
                        PI_REMARK8,
                        YY,
                        SEQ,
                        STATUS_CD,
                        REG_USER,
                        REG_DATETIME,
                        UPD_USER,
                        UPD_DATETIME,
                        BUYER_CD,
                        STYLE_CD
                    )
                VALUES
                    (
                        '${tNewPI_CD}',
                        '${tMesser}',
                        '${tMAddr1}',
                        '${tMAddr2}',
                        '${tCosignee} ',
                        '${tCAddr1}',
                        '${tCAddr2}',
                        '${tPriceTerm}',
                        '${tInput1.DESTINATION}',
                        '${tInput1.LOADING_PORT}',
                        '${tBankCd}',
                        '${tPayRule}',
                        '${tBvtFlag}',
                        '${tInput1.TOLENCE}',
                        '${tInput1.PART_SHIP}',
                        '${tInput1.TRANS_SHIP}',
                        '${tInput1.CD}',
                        '',
                        '',
                        '',
                        '${tInput1.TOLENCE_ETC}',
                        '${yyyy_str}',
                        '${tMaxSeq}',
                        '0',
                        '${tUserInfo.USER_ID}',
                        '${tRetDate1}',
                        '${tUserInfo.USER_ID}',
                        '${tRetDate1}',
                        '${tBuyerCd}',
                        '${tStyleCd}'
                    )
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            var tIdx0 = 0;
            for (tIdx0 = 0; tIdx0 < tInput2.length; tIdx0++) {
                var col = { ...tInput2[tIdx0] };

                let tSQL99 = `
                    INSERT INTO
                        KSV_ORDER_PIMEM (PI_CD, ORDER_CD, FOB, QTY)
                    VALUES
                        (
                            '${tNewPI_CD}',
                            '${col.ORDER_CD}',
                            '${col.AVR_PRICE}',
                            '${col.TOT_CNT}'
                        )
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    update ksv_order_mst
                    set
                        pi_cd = '${tNewPI_CD}'
                    where
                        order_cd = '${col.ORDER_CD}'
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
                tObj.CODE = 'SUCCEED:' + tNewPI_CD;
                tObj.id = 0;
                tRetArray.push(tObj);
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Insert PI_MST:' + tNewPI_CD;
                tObj.id = 0;
                tRetArray.push(tObj);
            }

            return tRetArray;
        },

        mgrInsert_S0205_5_FILE_INFO: async (_, args, contextValue) => {
            //
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);

            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput1 = { ...args.datas };

            var tSQLArray = [];

            var sql1 = `
                delete from kcd_fileinfo
                where
                    file_key = '${tInput1.PI_CD}'
            `;
            var nRet1 = await prisma.$queryRaw(Prisma.raw(sql1));

            var tObj = {};
            tObj.KIND = 'PI';
            tObj.FILE_KEY = tInput1.PI_CD;
            tObj.TITLE = tInput1.TITLE;
            tObj.NAME = tInput1.NAME;
            tObj.URL = tInput1.URL;
            tObj.UPD_DATETIME = tRetDate;
            tObj.OBJECT_NAME = tInput1.OBJECT_NAME;
            let tSQL99 = AFLib.createTableSql('KCD_FILEINFO', tObj);
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
                tObj.CODE = 'SUCCEED:' + tInput1.NAME;
                tObj.id = 0;
                tRetArray.push(tObj);
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Update PI_MST:' + e.message;
                tObj.id = 0;
                tRetArray.push(tObj);
            }

            return tRetArray;
        },

        mgrUpdate_S0205_5: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput1 = { ...args.datas };
            var tInput2 = [...args.datas1];

            var tBuyerCd = tInput2[0].ORDER_CD.substring(0, 2);
            var tStyleCd = tInput2[0].STYLE_CD;

            var sql1 = `
                SELECT
                    a.BUYER_NAME,
                    a.bank_cd,
                    a.pay_rule,
                    a.USER_NAME,
                    a.ADDR1,
                    a.ADDR2,
                    (b.bank_name + '_' + b.account_no) as bank,
                    c.remark
                FROM
                    KCD_BUYER a,
                    kcd_bank b,
                    kcd_pay_rule c
                WHERE
                    (a.BUYER_CD = '${tBuyerCd}')
                    and a.bank_cd = b.bank_cd
                    and c.cd_code = a.pay_rule
            `;
            var nRet1 = await prisma.$queryRaw(Prisma.raw(sql1));

            var tMesser = '';
            var tCosignee = '';
            var tMAddr1 = '';
            var tCAddr1 = '';
            var tMAddr2 = '';
            var tCAddr2 = '';
            var tBankCd = '';
            var tBank = '';
            var tPayRule = '';
            var tPayRuleName = '';
            var tPriceTerm = '0';
            var tBvtFlag = '0';

            if (nRet1.length > 0) {
                tMesser = nRet1[0].BUYER_NAME;
                tCosignee = nRet1[0].USER_NAME;
                tMAddr1 = nRet1[0].ADDR1;
                tCAddr1 = nRet1[0].ADDR1;
                tMAddr2 = nRet1[0].ADDR2;
                tCAddr2 = nRet1[0].ADDR2;
                tBank = nRet1[0].bank;
                tPayRuleName = nRet1[0].remark;
                tPayRule = nRet1[0].pay_rule;
                tBankCd = nRet1[0].bank_cd;
            }

            // var tMaxSeq = nRet0[0].ddseq + 1;

            var tSQLArray = [];

            let tSQL99 = `
                update ksv_order_pimst
                set
                    destination = '${tInput1.DESTINATION}',
                    port = '${tInput1.LOADING_PORT}',
                    pi_remark1 = '${tInput1.TOLENCE}',
                    pi_remark2 = '${tInput1.PART_SHIP}',
                    pi_remark3 = '${tInput1.TRANS_SHIP}',
                    pi_remark4 = '${tInput1.CD}',
                    pi_remark8 = '${tInput1.TOLENCE_ETC}',
                    upd_datetime = '${tRetDate}',
                    upd_user = '${tUserInfo.USER_ID}'
                where
                    pi_cd = '${tInput1.PI_CD}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            let tSQL99 = `
                delete ksv_order_pimem
                where
                    pi_cd = '${tInput1.PI_CD}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            let tSQL99 = `
                update ksv_order_mst
                set
                    pi_cd = ''
                where
                    pi_cd = '${tInput1.PI_CD}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            var tIdx0 = 0;
            for (tIdx0 = 0; tIdx0 < tInput2.length; tIdx0++) {
                var col = { ...tInput2[tIdx0] };

                let tSQL99 = `
                    INSERT INTO
                        KSV_ORDER_PIMEM (PI_CD, ORDER_CD, FOB, QTY)
                    VALUES
                        (
                            '${tInput1.PI_CD}',
                            '${col.ORDER_CD}',
                            '${col.AVR_PRICE}',
                            '${col.TOT_CNT}'
                        )
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    update ksv_order_mst
                    set
                        pi_cd = '${tInput1.PI_CD}'
                    where
                        order_cd = '${col.ORDER_CD}'
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
                tObj.CODE = 'SUCCEED:' + tInput1.PI_CD;
                tObj.id = 0;
                tRetArray.push(tObj);
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Update PI_MST:';
                tObj.id = 0;
                tRetArray.push(tObj);
            }

            return tRetArray;
        },
        mgrDelete_S0205_5: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput1 = { ...args.datas };
            var tInput2 = [...args.datas1];

            var tBuyerCd = tInput2[0].ORDER_CD.substring(0, 2);
            var tStyleCd = tInput2[0].STYLE_CD;

            var sql1 = `
                SELECT
                    a.BUYER_NAME,
                    a.bank_cd,
                    a.pay_rule,
                    a.USER_NAME,
                    a.ADDR1,
                    a.ADDR2,
                    (b.bank_name + '_' + b.account_no) as bank,
                    c.remark
                FROM
                    KCD_BUYER a,
                    kcd_bank b,
                    kcd_pay_rule c
                WHERE
                    (a.BUYER_CD = '${tBuyerCd}')
                    and a.bank_cd = b.bank_cd
                    and c.cd_code = a.pay_rule
            `;
            var nRet1 = await prisma.$queryRaw(Prisma.raw(sql1));

            var tMesser = '';
            var tCosignee = '';
            var tMAddr1 = '';
            var tCAddr1 = '';
            var tMAddr2 = '';
            var tCAddr2 = '';
            var tBankCd = '';
            var tBank = '';
            var tPayRule = '';
            var tPayRuleName = '';
            var tPriceTerm = '0';
            var tBvtFlag = '0';

            if (nRet1.length > 0) {
                tMesser = nRet1[0].BUYER_NAME;
                tCosignee = nRet1[0].USER_NAME;
                tMAddr1 = nRet1[0].ADDR1;
                tCAddr1 = nRet1[0].ADDR1;
                tMAddr2 = nRet1[0].ADDR2;
                tCAddr2 = nRet1[0].ADDR2;
                tBank = nRet1[0].bank;
                tPayRuleName = nRet1[0].remark;
                tPayRule = nRet1[0].pay_rule;
                tBankCd = nRet1[0].bank_cd;
            }

            // var tMaxSeq = nRet0[0].ddseq + 1;

            var tSQLArray = [];

            let tSQL99 = `
                delete ksv_order_pimst
                where
                    pi_cd = '${tInput1.PI_CD}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            let tSQL99 = `
                delete ksv_order_pimem
                where
                    pi_cd = '${tInput1.PI_CD}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            let tSQL99 = `
                update ksv_order_mst
                set
                    pi_cd = ''
                where
                    pi_cd = '${tInput1.PI_CD}'
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
                tObj.CODE = 'SUCCEED:' + tInput1.PI_CD;
                tObj.id = 0;
                tRetArray.push(tObj);
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Delete PI_MST:' + tInput1.PI_CD;
                tObj.id = 0;
                tRetArray.push(tObj);
            }

            return tRetArray;
        },
    },
};

export default moduleMutation_S0205_5;
