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
const moduleMutation_S0702_5 = {
    Mutation: {
        mgrInsert_S0702_5_UPDATE_END_TYPE: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput = [...args.datas];

            var tIdx = 0;
            for (tIdx = 0; tIdx < tInput.length; tIdx++) {
                var tOne = { ...tInput[tIdx] };
                var tSQLArray = [];
                let tSQL99 = `
                    update ksv_crdb_mem
                    set
                        end_type = '${tOne.END_TYPE}'
                    where
                        crdb_cd = '${tOne.CRDB_CD}'
                        and end_date = '${tOne.END_DATE}'
                        and crdb_amt = '${tOne.AMT}'
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
                tObj.CODE = 'ERROR:Update End Type';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED:Update End Type';
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },

        // Insert Debit Node
        mgrInsert_S0702_5_INSERT_DEBIT_NOTE: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);
            var tNextDate = AFLib.getCurrTimeAdd(10);

            var tInput = { ...args.datas };
            tInput.TITLE = tInput.TITLE.replace(/'/gi, "''");

            var tSQLArray = [];

            var tErrorStr = '';
            if (tInput.LINK_TO === '' || tInput.LINK_TO === ' ') {
                tErrorStr = 'Select Link To.';
            }
            if (tInput.BUYER_CD === '' || tInput.BUYER_CD === ' ') {
                tErrorStr = 'Select Buyer Cd.';
            }
            if (tInput.ISSUE_DATE === '') {
                // tErrorStr = 'Issue Date는 필수입력값 입니다..';
                tErrorStr = '';
                tInput.ISSUE_DATE = tRetDate1;
            }
            if (tInput.tNextDate === '') tInput.tNextDate = tRetDate1;
            if (tInput.ISSUE_DATE > tInput.tNextDate) {
                tErrorStr =
                    'Issue Date가 현재일보다 10일 이상이면 등록이 안됩니다.';
            }
            if (tInput.DEBIT_TYPE === '') {
                tErrorStr = 'Select Debit Type.';
            }
            // inside debit
            if (tInput.DEBIT_TYPE === '3' && tInput.PAY_TO.length > 2) {
                tErrorStr = 'Select Buyer in bill to (inside debit).';
            }
            if (tErrorStr !== '') {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = `ERROR:Insert Debit: ${tErrorStr}}`;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tYY = tRetDate1.substring(2, 4);
            var tYYYY = tRetDate1.substring(0, 4);
            var tDebitPrefix = '';
            if (tInput.DEBIT_TYPE === '5') {
                // Advance
                tDebitPrefix = 'DA';
            } else {
                tDebitPrefix = 'D';
            }

            var tDebitSeq = 1;
            var tDebitSeqStr = 1;
            var tSQL = `
                SELECT
                    convert(varchar(10), ISNULL(MAX(SEQ), 0)) AS ddseq
                FROM
                    KSV_CRDB_MST
                WHERE
                    (YY = ${tYYYY})
                    AND CRDB_TYPE = '${tDebitPrefix}'
            `;
            var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
            if (nRet0.length > 0) {
                tDebitSeq = parseFloat(nRet0[0].ddseq) + 1;
            }

            var tZero = '0000';
            tDebitSeqStr =
                tZero.substring(0, 4 - String(tDebitSeq).length) +
                String(tDebitSeq);

            var tNewDebitCd = '';
            var tNewCrdbType = '';

            tNewDebitCd = ``;
            tNewCrdbType = '';

            var tNewCreditCd = '';
            var tNewCreditType = '';
            var tCreditSeq = 1;
            var tCreditSeqStr = 1;
            if (tInput.DEBIT_TYPE === '5') {
                tNewDebitCd = `DA${tYY}-${tDebitSeqStr}`;
                tNewCrdbType = 'DA';

                var tSQL = `
                    SELECT
                        convert(varchar(10), ISNULL(MAX(SEQ), 0)) AS ddseq
                    FROM
                        KSV_CRDB_MST
                    WHERE
                        (YY = ${tYYYY})
                        AND CRDB_TYPE in ('C', 'CA')
                `;
                var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
                if (nRet0.length > 0) {
                    tCreditSeq = parseFloat(nRet0[0].ddseq) + 1;
                }

                var tZero = '0000';
                tCreditSeqStr =
                    tZero.substring(0, 4 - String(tCreditSeq).length) +
                    String(tCreditSeq);

                tNewCreditCd = `CA${tYY}-${tCreditSeqStr}`;
                tNewCreditType = 'CA';
            } else {
                tNewDebitCd = `DN${tYY}-${tDebitSeqStr}`;
                tNewCrdbType = 'D';
            }

            /*
      var tSQL = `
          select
              count(*) as t_cnt
          from
              ksv_crdb_mst
          where
              messer_cd = '${tInput.PAY_TO}'
              and title = '${tInput.TITLE}'
              and remark = '${tInput.REMARK}'
              and crdb_amt = '${tInput.PAY_AMT}'
              and end_date = '${tInput.EXP_DATE}'
      `;
      var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
      if (nRet0.length > 0 && nRet0[0].t_cnt > 0) {
          var tRetArray = [];
          var tObj = {};
          tObj.CODE = 'ERROR:Already registered has same data.';
          tObj.id = 0; 
          tRetArray.push(tObj);
          return (tRetArray);
      }
      */

            if (tInput.STOCK_IDX !== '') {
                let tSQL99 = `
                    update ksv_stock_matl
                    set
                        debit_cd = '${tNewDebitCd}'
                    where
                        stock_idx = '${tInput.STOCK_IDX}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            }

            /*
      var tBuyerCd = '';
      if (tInput.BUYER_CD.length <= 2)  tBuyerCd = tInput.BUYER_CD;
      */
            var tBuyerCd = tInput.BUYER_CD;

            let tSQL99 = `
                INSERT INTO
                    KSV_CRDB_MST (
                        CRDB_CD,
                        crdb_seq,
                        CRDB_TYPE,
                        CRDB_DATE,
                        END_DATE,
                        MESSER_CD,
                        CRDB_AMT,
                        CURR_CD,
                        TITLE,
                        REMARK,
                        YY,
                        SEQ,
                        STATUS_CD,
                        charger,
                        REG_USER,
                        REG_DATETIME,
                        BANK_CD,
                        po_cd,
                        order_cd,
                        buyer_Cd,
                        payment_plan,
                        debit_type,
                        link_to,
                        vat,
                        bill_no
                    )
                VALUES
                    (
                        '${tNewDebitCd}',
                        1,
                        '${tNewCrdbType}',
                        '${tInput.DATE_OF_ISSUE}',
                        '${tInput.EXP_DATE}',
                        '${tInput.PAY_TO}',
                        '${tInput.PAY_AMT}',
                        '${tInput.PAY_CURR_CD}',
                        '${tInput.TITLE}',
                        '${tInput.REMARK}',
                        '${tYYYY}',
                        '${tDebitSeq}',
                        '0',
                        '${tUserInfo.USER_ID}',
                        '${tUserInfo.USER_ID}',
                        '${tRetDate1}',
                        '${tInput.BANK_CD}',
                        '${tInput.PO_CD}',
                        '${tInput.ORDER_CD}',
                        '${tBuyerCd}',
                        '${tInput.PAYMENT_PLAN}',
                        '${tInput.DEBIT_TYPE}',
                        '${tInput.LINK_TO}',
                        '${tInput.VAT_AMT}',
                        '${tInput.BILL_NO}'
                    )
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            if (tInput.DEBIT_TYPE === '5') {
                let tSQL99 = `
                    INSERT INTO
                        KSV_CRDB_MST (
                            CRDB_CD,
                            crdb_seq,
                            CRDB_TYPE,
                            CRDB_DATE,
                            END_DATE,
                            MESSER_CD,
                            CRDB_AMT,
                            CURR_CD,
                            TITLE,
                            REMARK,
                            YY,
                            SEQ,
                            STATUS_CD,
                            charger,
                            REG_USER,
                            REG_DATETIME,
                            BANK_CD,
                            po_cd,
                            order_cd,
                            buyer_Cd,
                            payment_plan,
                            debit_type,
                            link_to,
                            remark_s,
                            vat,
                            bill_no
                        )
                    VALUES
                        (
                            '${tNewCreditCd}',
                            '1',
                            '${tNewCreditType}',
                            '${tRetDate1}',
                            '${tInput.EXP_DATE}',
                            '${tInput.PAY_TO}',
                            '${tInput.PAY_AMT}',
                            '${tInput.PAY_CURR_CD}',
                            '${tInput.TITLE}',
                            '${tInput.REMARK}',
                            '${tYYYY}',
                            '${tCreditSeq}',
                            '0',
                            '${tUserInfo.USER_ID}',
                            '${tUserInfo.USER_ID}',
                            '${tRetDate1}',
                            '${tInput.BANK_CD}',
                            '${tInput.PO_CD}',
                            '${tInput.ORDER_CD}',
                            '${tInput.BUYER_CD}',
                            '${tInput.PAYMENT_PLAN}',
                            '${tInput.DEBIT_TYPE}',
                            '${tInput.LINK_TO}',
                            '${tNewDebitCd}',
                            '${tInput.VAT_AMT}',
                            '${tInput.BILL_NO}'
                        )
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
                tObj.CODE = `ERROR:Insert Debit:${e.message} `;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = `SUCCEED:Insert Credit:${tNewDebitCd}`;
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },

        // Debit Node Delete
        mgrInsert_S0702_5_CANCEL_DEBIT_NOTE: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput = { ...args.datas };
            var tSQLArray = [];

            var tSQL = `
                select
                    isnull(a.status_cd, '') as STATUS_CD,
                    isnull(a.reg_user, '') as REG_USER,
                    isnull(h.approkey, '') as GW_CODE
                from
                    ksv_crdb_mst a
                    left join kcd_gwcode h on h.doc_no = a.crdb_cd
                where
                    a.crdb_cd = '${tInput.DEBIT_NO}'
            `;
            var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
            var tCrdbObj = {};
            if (nRet0.length > 0) tCrdbObj = { ...nRet0[0] };

            var tErrorStr = '';
            if (tCrdbObj.STATUS_CD !== '0') {
                tErrorStr = 'ERROR:등록(Regist)인 경우만 삭제가능합니다 ';
            }
            if (
                tCrdbObj.REG_USER !== tUserInfo.USER_ID &&
                tUserInfo.PART !== 'AC'
            ) {
                if (tUserInfo.USER_ID === 'won21kr');
                else
                    tErrorStr =
                        'ERROR:자신이 등록한 것만 삭제가능합니다, 또는 재경팀(AC)만 삭제가능합니다.';
            }
            if (tCrdbObj.GW_CODE !== '') {
                tErrorStr = 'ERROR:상신 처리중인 데이타는 삭제 불가능합니다   ';
            }
            if (tErrorStr !== '') {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = `ERROR:Cancel Debit Note:${tErrorStr}`;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            let tSQL99 = `
                update KSV_CRDB_MST
                set
                    status_cd = '3'
                where
                    crdb_cd = '${tInput.DEBIT_NO}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            let tSQL99 = `
                delete from KSV_CRDB_MEM
                where
                    crdb_cd = '${tInput.DEBIT_NO}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            let tSQL99 = `
                delete from KZZ_CREDIT_COST
                where
                    crdb_cd = '${tInput.DEBIT_NO}'
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
                tObj.CODE = 'ERROR:Cancel Debit';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED:Cancel Crdit ';
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },

        // Debit Node End
        mgrInsert_S0702_5_END_DEBIT_NOTE: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput = { ...args.datas };
            var tInput1 = { ...args.datas1 };
            var tSQLArray = [];

            var tSQL = `
                select
                    isnull(status_cd, '0') as STATUS_CD,
                    isnull(CRDB_AMT, 0) as CRDB_AMT,
                    isnull(DEBIT_TYPE, '') as DEBIT_TYPE
                from
                    ksv_crdb_mst
                where
                    crdb_cd = '${tInput.DEBIT_NO}'
                    and crdb_seq = (
                        select
                            max(crdb_seq)
                        from
                            ksv_crdb_mst
                        where
                            crdb_cd = '${tInput.DEBIT_NO}'
                    )
            `;
            var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
            var tCrdbObj = {};
            if (nRet0.length > 0) tCrdbObj = nRet0[0];

            var tErrorStr = '';
            if (tCrdbObj.STATUS_CD !== '0' && tCrdbObj.STATUS_CD !== '2') {
                tErrorStr = '상태가 등록 or 부분End만 End가 가능합니다 ';
            }

            var sql1 = `
                select
                    isnull(sum(crdb_amt), 0) as s_amt
                from
                    ksv_crdb_mem
                where
                    crdb_cd = '${tInput.DEBIT_NO}'
            `;
            var nRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
            var tSumEndAmt = 0;
            if (nRet1.length > 0) tSumEndAmt = parseFloat(nRet1[0].s_amt);

            if (
                parseFloat(tInput1.AMT) >
                parseFloat((tInput1.AMT-tSumEndAmt).toFixed(2))
            ) {
                tErrorStr = `End 금액(${parseFloat(tInput1.AMT)})이 Balance(${parseFloat((tInput1.AMT-tSumEndAmt).toFixed(2))})보다 큽니다.`;
            }

            if (tUserInfo.PART !== 'AC' ) {
                if (tUserInfo.USER_ID !== 'won21kr' && tUserInfo.USER_ID !== 'lih7912') {
                    return [ { id:0, CODE: `ERROR: 재경팀(AC)만 END  가능합니다.(${tUserInfo.USER_ID})` } ];
                }
            }

            if (tErrorStr !== '') {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = `ERROR:End Debit: ${tErrorStr}`;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }



            let tSQL99 = `
                insert into
                    ksv_crdb_mem (
                        crdb_cd,
                        end_date,
                        crdb_amt,
                        ref_no,
                        status_cd,
                        reg_user,
                        reg_datetime,
                        manage_date,
                        pre_flag,
                        end_type,
                        vat
                    )
                values
                    (
                        '${tInput.DEBIT_NO}',
                        '${tInput1.END_DATE}',
                        '${tInput1.AMT}',
                        '',
                        '0',
                        '${tUserInfo.USER_ID}',
                        '${tRetDate}',
                        '',
                        '',
                        '${tInput1.END_TYPE}',
                        '${tInput.VAT_AMT}'
                    )
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            var tStatusCd = '1';
            tSumEndAmt += parseFloat(tInput1.AMT);
            if (parseFloat(tSumEndAmt) < parseFloat(tCrdbObj.CRDB_AMT))
                tStatusCd = '2';
            let tSQL99 = `
                update ksv_crdb_mst
                set
                    status_cd = '${tStatusCd}',
                    end_user = '${tUserInfo.USER_ID}'
                where
                    crdb_cd = '${tInput.DEBIT_NO}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            // Won 일단 막음.  0706
            /*
            if (tCrdbObj.DEBIT_TYPE === '3') {
                // Inside debit End시 Credit생성하고 End처리

                var tYY = tRetDate1.substring(2, 4);
                var tYYYY = tRetDate1.substring(0, 4);

                var tSQL = `
                    SELECT
                        convert(varchar(10), ISNULL(MAX(SEQ), 0)) AS ddseq
                    FROM
                        KSV_CRDB_MST
                    WHERE
                        (YY = ${tYYYY})
                        AND CRDB_TYPE in ('C', 'CA')
                `;
                var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
                var tCreditSeq = 1;
                if (nRet0.length > 0) {
                    tCreditSeq = parseFloat(nRet0[0].ddseq) + 1;
                }

                var tZero = '0000';
                var tCreditSeqStr =
                    tZero.substring(0, 4 - String(tCreditSeq).length) +
                    String(tCreditSeq);

                var tNewCreditCd = `CN${tYY}-${tCreditSeqStr}`;
                var tNewCreditType = 'C';

                let tSQL99 = `
                    INSERT INTO
                        KSV_CRDB_MST (
                            CRDB_CD,
                            crdb_seq,
                            CRDB_TYPE,
                            CRDB_DATE,
                            END_DATE,
                            MESSER_CD,
                            CRDB_AMT,
                            CURR_CD,
                            TITLE,
                            REMARK,
                            YY,
                            SEQ,
                            STATUS_CD,
                            charger,
                            REG_DATETIME,
                            BANK_CD,
                            po_cd,
                            order_cd,
                            buyer_Cd,
                            payment_plan,
                            debit_type,
                            link_to,
                            vat,
                            conf_flag,
                            END_USER
                        )
                    select
                        '${tNewCreditCd}}',
                        crdb_seq,
                        'C',
                        crdb_date,
                        end_date,
                        buyer_cd,
                        crdb_amt,
                        curr_cd,
                        title,
                        remark,
                        '${tRetDate1.substring(0, 4)}',
                        ${tCreditSeqStr},
                        '1',
                        charger,
                        '${tRetDate}',
                        bank_cd,
                        po_cd,
                        order_cd,
                        messer_cd,
                        payment_plan,
                        debit_type,
                        link_to,
                        vat,
                        conf_flag,
                        '${tUserInfo.USER_ID}'
                    from
                        ksv_crdb_mst
                    where
                        crdb_cd = '${tInput.DEBIT_NO}'
                        and crdb_seq = (
                            select
                                max(crdb_seq)
                            from
                                ksv_crdb_mst
                            where
                                crdb_cd = '${tInput.DEBIT_NO}'
                        )
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    insert into
                        ksv_crdb_mem (
                            crdb_cd,
                            end_date,
                            crdb_amt,
                            ref_no,
                            status_cd,
                            reg_user,
                            reg_datetime,
                            manage_date,
                            pre_flag,
                            end_type,
                            vat
                        )
                    values
                        (
                            '${tNewCreditCd}}',
                            '${tInput1.END_DATE}',
                            '${tInput1.AMT}',
                            '',
                            '0',
                            '${tUserInfo.USER_ID}',
                            '${tRetDate}',
                            '',
                            '',
                            '${tInput1.END_TYPE}',
                            '${tInput.VAT_AMT}'
                        )
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            }
            */

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
                tObj.CODE = 'ERROR:End Debit';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED:End Debit';
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },

        mgrInsert_S0702_5_CANCEL_END_CREDIT: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput = { ...args.datas };
            var tSQLArray = [];

            var tSQL = `
                select
                    *
                from
                    ksv_crdb_mst
                where
                    crdb_cd = '${tInput.DEBIT_NO}'
            `;
            var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
            var tCrdbObj = {};
            if (nRet0.length > 0) tCrdbObj = { ...nRet0[0] };

            if (tUserInfo.PART !== 'AC' ) {
                if (tUserInfo.USER_ID !== 'won21kr' && tUserInfo.USER_ID !== 'lih7912') {
                    return [ { id:0, CODE: 'ERROR: 재경팀(AC)만 END CANCEL 가능합니다.' } ];
                }
            }

            var sql1 = `
                select
                    sum(crdb_amt) as s_amt
                from
                    ksv_crdb_mem
                where
                    crdb_cd = '${tInput.DEBIT_NO}'
            `;
            var nRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
            var tSumEndAmt = 0;
            if (nRet1.length > 0) tSumEndAmt = parseFloat(nRet1[0].s_amt);

            var tIdx = 0;
            var tSumAmt = 0;
            for (tIdx = 0; tIdx < args.datas1.length; tIdx++) {
                var tOne = { ...args.datas1[tIdx] };
                let tSQL99 = `
                    delete from KSV_CRDB_MEM
                    where
                        crdb_cd = '${tInput.DEBIT_NO}'
                        and reg_datetime = '${tOne.REG_DATETIME}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
                tSumAmt += parseFloat(tOne.CRDB_AMT);
            }

            var tStatus = '0';
            if (tSumEndAmt > tSumAmt) tStatus = '2';

            let tSQL99 = `
                update KSV_CRDB_MST
                set
                    status_cd = '${tStatus}'
                where
                    crdb_cd = '${tInput.DEBIT_NO}'
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
                tObj.CODE = 'ERROR:Cancel End Debit';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED:Cancel End Debit :';
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },

        mgrInsert_S0702_5_UPDATE_DEBIT_NOTE: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput = { ...args.datas };
            var tSQLArray = [];

            var sql0 = `
                select
                    *
                from
                    ksv_crdb_mst
                where
                    crdb_cd = '${tInput.DEBIT_NO}'
                    and crdb_seq = (
                        select
                            max(crdb_seq) as crdb_seq
                        from
                            ksv_crdb_mst
                        where
                            crdb_cd = '${tInput.DEBIT_NO}'
                    )
            `;
            var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            var tCrdbObj = {};
            if (nRet0.length > 0) tCrdbObj = { ...nRet0[0] };

            var tInsertChk = 0;
            var tErrorStr = '';

            if (
                tCrdbObj.REG_USER !== tUserInfo.USER_ID &&
                tUserInfo.PART !== 'AC'
            ) {
                if (
                    tUserInfo.USER_ID === 'won21kr' ||
                    tUserInfo.USER_ID === 'lih7912'
                );
                else
                    tErrorStr =
                        'ERROR:자신이 등록한 것만 UPDATE가능합니다, 또는 재경팀(AC)만 UPDATE가능합니다.';
            }
            if (
                tCrdbObj.STATUS_CD === '1' ||
                tCrdbObj.STATUS_CD === '4' ||
                tCrdbObj.STATUS_CD === '3'
            ) {
                tErrorStr =
                    'ERROR:End , Cancel, Taxbill End 된것은 수정불가합니다.  ';
            }
            if (tCrdbObj.CRDB_DATE !== tInput.DATE_OF_ISSUE) {
                if (tInput.GW_CODE !== '')
                    tErrorStr =
                        'ERROR:Crdb Date는 수정할수 없습니다.(상신중인 데이타)  ';
            }

            // 기존 CRDB_AMT와 다른경우 INSSERT 처리하여 HISTORY로 남김.
            if (parseFloat(tCrdbObj.CRDB_AMT) !== parseFloat(tInput.PAY_AMT)) {
                tInsertChk = 1;
                if (tInput.GW_CODE !== '')
                    tErrorStr =
                        'ERROR:Crdb Amt는 수정할수 없습니다.(상신중인 데이타)  ';
            }
            if (tCrdbObj.CURR_CD !== tInput.PAY_CURR_CD) {
                tInsertChk = 2;
                if (tInput.GW_CODE !== '')
                    tErrorStr =
                        'ERROR:Curr Cd는 수정할수 없습니다.(상신중인 데이타)  ';
            }
            if (tErrorStr !== '') {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = `ERROR:Update Debit Note:${tErrorStr}`;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            if (tCrdbObj.BUYER_CD !== tInput.BUYER_CD) tInsertChk = 3;
            if (tCrdbObj.MESSER_CD !== tInput.PAY_TO) tInsertChk = 4;

            var tCreditObj = {};
            if (tCrdbObj.CRDB_TYPE === 'DA') {
                var sql0 = `
                    select
                        *
                    from
                        ksv_crdb_mst
                    where
                        remark_s = '${tInput.DEBIT_NO}'
                `;
                var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                if (nRet0.length > 0) tCreditObj = { ...nRet0[0] };
            }

            console.log(tInsertChk);

            var tNewCrdbSeq = 0;
            if (tInsertChk === 1) {
                tNewCrdbSeq = parseInt(tCrdbObj.CRDB_SEQ) + 1;
            }

            if (tInsertChk === 1) {
                var tInObj = { ...tCrdbObj };
                delete tInObj.id;
                tInObj.CRDB_SEQ = tNewCrdbSeq;

                if (tInput.TITLE) tInObj.TITLE = tInput.TITLE;
                if (tInput.DATE_OF_ISSUE)
                    tInObj.CRDB_DATE = tInput.DATE_OF_ISSUE;
                if (tInput.EXP_DATE) tInObj.END_DATE = tInput.EXP_DATE;
                if (tInput.BUYER_CD) tInObj.BUYER_CD = tInput.BUYER_CD;
                if (tInput.CHARGER) tInObj.CHARGER = tInput.CHARGER;
                if (tInput.PO_CD) tInObj.PO_CD = tInput.PO_CD;
                if (tInput.ORDER_CD) tInObj.ORDER_CD = tInput.ORDER_CD;
                if (tInput.REMARK) tInObj.REMARK = tInput.REMARK;
                if (tInput.PAYMENT_PLAN)
                    tInObj.PAYMENT_PLAN = tInput.PAYMENT_PLAN;
                if (tInput.DOCU_NO) tInObj.DOCU_NO = tInput.DOCU_NO;
                if (tInput.LINK_TO) tInObj.LINK_TO = tInput.LINK_TO;
                if (tInput.VAT_AMT) tInObj.VAT = tInput.VAT_AMT;
                else tInObj.VAT = 0;
                if (tInput.END_TYPE) tInObj.END_TYPE = tInput.END_TYPE;
                if (tInput.PAY_TO) tInObj.MESSER_CD = tInput.PAY_TO;
                if (tInput.PAY_AMT) tInObj.CRDB_AMT = tInput.PAY_AMT;
                if (tInput.CURR_CD) tInObj.CURR_CD = tInput.PAY_CURR_CD;
                if (tInput.BANK_CD) tInObj.BANK_CD = tInput.BANK_CD;

                let tSQL99 = AFLib.createTableSql('ksv_crdb_mst', tInObj);
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                if (tCrdbObj.CRDB_TYPE === 'DA') {
                    var sql0 = `
                        update ksv_crdb_mst
                        set
                            crdb_amt = ${tInput.PAY_AMT}
                        where
                            crdb_cd = '${tCreditObj.CRDB_CD}'
                    `;
                    var nRet0 = prisma.$queryRaw(Prisma.raw(sql0));
                    tSQLArray.push(nRet0);
                }
            } else {
                if (!tInput.DOCU_NO) tInput.DOCU_NO = '';
                var tInObj = {};
                if (tInput.TITLE) tInObj.title = tInput.TITLE;
                if (tInput.DATE_OF_ISSUE)
                    tInObj.crdb_date = tInput.DATE_OF_ISSUE;
                if (tInput.EXP_DATE) tInObj.end_date = tInput.EXP_DATE;
                if (tInput.BUYER_CD) tInObj.buyer_cd = tInput.BUYER_CD;
                if (tInput.CHARGER) tInObj.charger = tInput.CHARGER;
                if (tInput.PO_CD) tInObj.po_cd = tInput.PO_CD;
                if (tInput.ORDER_CD) tInObj.order_cd = tInput.ORDER_CD;
                if (tInput.REMARK) tInObj.remark = tInput.REMARK;
                if (tInput.PAYMENT_PLAN)
                    tInObj.payment_plan = tInput.PAYMENT_PLAN;
                if (tInput.DOCU_NO) tInObj.docu_no = tInput.DOCU_NO;
                if (tInput.LINK_TO) tInObj.link_to = tInput.LINK_TO;
                if (tInput.VAT_AMT) tInObj.vat = tInput.VAT_AMT;
                else tInObj.VAT = 0;
                if (tInput.END_TYPE) tInObj.end_type = tInput.END_TYPE;
                if (tInput.PAY_TO) tInObj.messer_cd = tInput.PAY_TO;
                if (tInput.PAY_AMT) tInObj.crdb_amt = tInput.PAY_AMT;
                if (tInput.PAY_CURR_CD) tInObj.curr_cd = tInput.PAY_CURR_CD;
                if (tInput.BANK_CD) tInObj.bank_cd = tInput.BANK_CD;
                let tSQL99 = AFLib.updateTableSql('ksv_crdb_mst', tInObj);
                tSQL99 += ` where crdb_cd = '${tInput.DEBIT_NO}' `;
                tSQL99 += `
                    and crdb_seq = (
                        select
                            max(crdb_seq) as crdb_seq
                        from
                            ksv_crdb_mst
                        where
                            crdb_cd = '${tInput.DEBIT_NO}'
                    )
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                if (tCrdbObj.CRDB_TYPE === 'DA') {
                    var sql0 = `
                        update ksv_crdb_mst
                        set
                            crdb_amt = ${tInput.PAY_AMT}
                        where
                            crdb_cd = '${tCreditObj.CRDB_CD}'
                    `;
                    var nRet0 = prisma.$queryRaw(Prisma.raw(sql0));
                    tSQLArray.push(nRet0);
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
                tObj.CODE = 'ERROR:Update Debit';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED:Update Debit :';
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },

        //  GW (국내자재)
        mgrUpdate_S0702_5_GW_DEBIT_NOTE: async (_, args, contextValue) => {
            // End Proc
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

            /*
      var tSQL = `
          SELECT
              max(A.SEQ) + 1 as max_seq
          FROM
              KSV_ORDER_MST A,
              KCD_STYLE B
          WHERE
              A.STYLE_CD = B.STYLE_CD
              and A.YY = ${tOneMst.YY}
              and B.BUYER_CD = '${tOneMst.BUYER_CD}'
      `;
      var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
      var tRet = nRet0[0];
      var tMaxSeq = tRet.max_seq;
*/
            var tInput = { ...args.datas[0] };
            var tSQLArray = [];

            var tCheckVendorGW = 0;
            var tCheckPayReport = 0;
            var tCheckCalc = 0;
            var tCheckGW = 0;
            var tCheckBillDate = 0;

            var tPayDateArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var tCol = { ...args.datas[tIdx] };
                var tFlag = 0;
                var tIdx1 = 0;
                if (tCol.CALC_FLAG2 !== '1') tCheckCalc += 1;
                for (tIdx1 = 0; tIdx1 < tPayDateArray.length; tIdx1++) {
                    if (tPayDateArray[tIdx1] === tCol.PAY_DATE) {
                        tFlag = 1;
                        break;
                    }
                }
                if (tFlag === 0) tPayDateArray.push(tCol.PAY_DATE);
            }

            if (tCheckCalc > 0) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Bill Ok된것만 상신가능합니다 ';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            if (tPayDateArray.length > 2) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Pay Date는 두개까지만 가능합니다';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tYear = tRetDate.substring(0, 4);

            // 1건 즉시 발주
            if (args.datas.length <= 1) {
                var tOne = args.datas[0];
                var tAppKey = '';
                var tAppKeyPrefix = 'DM' + tRetDate1.substring(2, 4);
                var tEmpNo = '';
                var tSQL = `
                    select
                        APPROKEY
                    from
                        KCD_GW_TAXBILL_KR
                    where
                        APPROKEY = (
                            select
                                max(APPROKEY)
                            from
                                KCD_GW_TAXBILL_KR
                            where
                                left(APPROKEY, 4) = '${tAppKeyPrefix}'
                        )
                        and left(APPROKEY, 4) = '${tAppKeyPrefix}'
                `;
                var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
                if (nRet0.length <= 0) {
                    tAppKey = tAppKeyPrefix + '-000000';
                } else {
                    var tSeq =
                        parseFloat(nRet0[0].APPROKEY.substring(5, 11)) + 1;
                    var tZero = '000000';
                    var tSeqStr =
                        tZero.substring(0, 6 - String(tSeq).length) +
                        String(tSeq);
                    tAppKey = tAppKeyPrefix + '-' + tSeqStr;
                }

                /*
0                    NEW       
1                    상신   
2                    종결
3                    반려  
4                    상신취소   
5                    삭제                                
*/

                let tSQL99 = `
                    update KCD_GW_TAXBILL_KR
                    set
                        APPROKEY = '${tAppKey}',
                        REG_USER = '${tUserInfo.USER_ID}',
                        REG_DATETIME = '${tRetDate}',
                        YEAR = '${tYear}',
                        CURR_RATE = '${tOne.CURR_INPUT}',
                        KRW_AMOUNT = '${tOne.KRW_AMOUNT}',
                        STATUS_CD = '2'
                    where
                        TAXBILL_CD = '${tOne.TAXBILL_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            } else {
                // 여러건 결제
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
                tObj.CODE = 'ERROR:Cancel TaxBill Error';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED:Cancel TaxBill :' + args.datas.length;
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },
    },
};

export default moduleMutation_S0702_5;
