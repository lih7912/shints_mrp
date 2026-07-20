// MGR_@@TNAME@@.mutations.js

import * as fs from 'fs';
import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기

const nodemailer = require('nodemailer');
const config = require('../../../routes/config.js');

const to = 'shints_acc@shints.com';
const cc = 'dain_lee@shints.com';
const bcc = 'lkj83@shints.com';

/*
                STD_FLAG: String 
                NET: String 
                LOSS: String 
                USE_SIZE: String 
                REMARK: String 

*/

// export default로 Mutation 내용 내보내기
const moduleMutation_S0707_5 = {
    Mutation: {
        mgrInsert_S0707_5_INSERT_CREDIT: async (_, args, contextValue) => {
            /* INSERT_TT */

            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput = { ...args.datas };

            console.log('Server Pro');
            var tSQLArray = [];
            // console.log(args.datas);

            let sql0 = `
                select
                    *
                from
                    ksv_invoice_prebill
                where
                    ref_no = '${tInput.REF_NO}'
            `;
            var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            var tPreBillObj = {};
            if (nRet0.length > 0) {
                tPreBillObj = { ...nRet0[0] };
            } else {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Check Ref No(Not Exist)';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tTotal =
                parseFloat(tPreBillObj.TOT_AMT) +
                parseFloat(tPreBillObj.CHARGE) +
                parseFloat(tPreBillObj.CREDIT_AMT);
            if (parseFloat(tInput.CREDIT_AMT) > tTotal) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Credit금액이 총입금액 보다 큽니다';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            let sql1 = `
                select
                    isnull(sum(bill_amt), 0) as billed_amt
                from
                    ksv_invoice_bill
                where
                    ref_no = '${tInput.REF_NO}'
                    and invoice_no <> '미정'
            `;
            var nRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
            var tBilledAmt = 0;
            if (nRet1.length > 0) tBilledAmt = parseFloat(nRet1[0].billed_amt);

            if (tBilledAmt + parseFloat(tInput.CREDIT_AMT) > tTotal) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE =
                    'ERROR:Credit금액이 이미 상계처리된 금액보다 큽니다';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tNewCreditAmt = parseFloat(tInput.CREDIT_AMT);
            var tBillAmt = tTotal - tNewCreditAmt;
            var tCharge = parseFloat(tPreBillObj.CHARGE);
            tBillAmt -= tCharge;

            let tSQL99 = `
                update ksv_invoice_prebill
                set
                    credit_amt = ${tNewCreditAmt},
                    tot_amt = ${tBillAmt},
                    charge = ${tCharge}
                where
                    ref_no = '${tInput.REF_NO}'
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
                tObj.CODE = `ERROR:Update Credit:${e.message}`;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED:Update Credit ';
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },

        mgrInsert_S0707_5_UPDATE_TT: async (_, args, contextValue) => {
            /* INSERT_TT */

            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput = { ...args.datas };
            tInput.BILL_AMT = tInput.BILL_AMT.replace(/,/gi, '');
            tInput.CHARGE = tInput.CHARGE.replace(/,/gi, '');

            console.log('Server Pro');
            var tSQLArray = [];
            // console.log(args.datas);

            let sql0 = `
                select
                    *
                from
                    ksv_invoice_prebill
                where
                    ref_no = '${tInput.REF_NO}'
            `;
            var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            var tPreBillObj = {};
            if (nRet0.length > 0) {
                tPreBillObj = { ...nRet0[0] };
            } else {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Check Ref No(Not Exist)';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tBillAmt = parseFloat(tPreBillObj.TOT_AMT);
            var tCharge = parseFloat(tPreBillObj.CHARGE);
            var tCreditAmt = parseFloat(tPreBillObj.CREDIT_AMT);
            var tDiffAmt = 0;
            if (
                parseFloat(tInput.BILL_AMT) !==
                    parseFloat(tPreBillObj.TOT_AMT) ||
                parseFloat(tInput.CHARGE) !== parseFloat(tPreBillObj.CHARGE)
            ) {
                var tTotal =
                    parseFloat(tInput.BILL_AMT) +
                    tCreditAmt +
                    parseFloat(tInput.CHARGE);

                let sql1 = `
                    select
                        isnull(sum(bill_amt), 0) as billed_amt
                    from
                        ksv_invoice_bill
                    where
                        ref_no = '${tInput.REF_NO}'
                        and invoice_no <> '미정'
                `;
                var nRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                var tBilledAmt = 0;
                if (nRet1.length > 0)
                    tBilledAmt = parseFloat(nRet1[0].billed_amt);

                if (tBilledAmt > tTotal) {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = `ERROR:이미 상계된 금액보다 수정금액이 작습니다(${tBilledAmt} / ${tTotal})`;
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }

                tBillAmt = parseFloat(tInput.BILL_AMT);
                tCharge = parseFloat(tInput.CHARGE);
                tDiffAmt = tTotal - tBilledAmt;
            }

            if (
                parseFloat(tPreBillObj.END_FLAG) > 0 &&
                tPreBillObj.BILL_DATE !== tInput.BILL_DATE
            ) {
                if (tPreBillObj.END_FLAG === '1') {
                    // end
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = `ERROR:End가 진행중인것(End Flag가 1)은 입금일을 수정할수 없습니다 `;
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }

                let sql1 = `
                    select
                        count(*) as c_cnt
                    from
                        ksv_invoice_bill
                    where
                        ref_no = '${tInput.REF_NO}'
                        and invoice_no <> '미정'
                `;
                var nRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                if (nRet1.length > 0 && nRet1[0].c_cnt > 0) {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = `ERROR:입금정리된 Invoice가 있는경우는 입금일을 수정할수 없습니다 `;
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }
            }

            let tSQL99 = `
                update ksv_invoice_prebill
                set
                    bill_date = '${tInput.BILL_DATE}',
                    remark = '${tInput.REMARK}',
                    end_flag = '${tInput.END_TYPE}',
                    pre_flag = '${tInput.BILL_TYPE}',
                    buyer_cd = '${tInput.BUYER_CD}',
                    bank_cd = '${tInput.BANK_CD}',
                    curr_cd = '${tInput.CURR_CD}',
                    tot_amt = ${tBillAmt},
                    charge = ${tCharge}
                where
                    ref_no = '${tInput.REF_NO}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            let tSQL99 = `
                update ksv_invoice_bill
                set
                    bill_amt = ${tDiffAmt}
                where
                    ref_no = '${tInput.REF_NO}'
                    and invoice_no = '미정'
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

                /* 메일 발송 */

                // END FLAG
                let endTitle = '';
                if (tInput.END_TYPE === '1') {
                    endTitle = 'END';
                }

                if (tPreBillObj.END_FLAG === '1' && tInput.END_TYPE !== '1') {
                    // end
                    endTitle = 'END CANCEL';
                }

                let sqlSelDb = `           
                    select db_name() as db_name
                  `;
                var retSelDb = await prisma.$queryRaw(Prisma.raw(sqlSelDb));
                var tDbName = '';
                if (retSelDb.length > 0) tDbName = retSelDb[0].db_name;

                console.log(`Before Mail Check: ${tDbName}`);
                if (
                    tDbName === 'shints' && 
                    (tInput.END_TYPE === '1' ||
                    (tPreBillObj.END_FLAG === '1' && tInput.END_TYPE !== '1'))
                ) {
                    console.log(`Send Mail ===>  ${tDbName}`);
                    const transporter = nodemailer.createTransport(
                        config.mailParameter,
                    );
                    const buyerName = (
                        await AFLib.getBuyerInfo(tInput.BUYER_CD)
                    ).BUYER_NAME;
                    const mailTitle = `(${buyerName}) 입금 내역 ${endTitle} 알림 : ${tInput.BILL_DATE}`;
                    const mailBody = `입금 내역이 ${endTitle} 되었습니다. 처리자 : ${tUserInfo.USER_ID}<br>
<br>
바이어명 : ${buyerName}<br>
Ref No : ${tInput.REF_NO}<br>
입금액 : ${tInput.BILL_AMT}${tInput.CURR_CD}<br>
확인금액 : ${tInput.CHECK_AMT}${tInput.CURR_CD}<br>
Balance : ${tInput.BALANCE}${tInput.CURR_CD}<br>
<br>
`;

                    AFLib.afSendMail({
                        to: to,
                        cc: cc,
                        bcc: bcc,
                        subject: mailTitle,
                        html: mailBody,
                    });
                }
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = `ERROR:Update Credit:${e.message}`;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED:Update Credit ';
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },

        mgrInsert_S0707_5_INSERT_TT: async (_, args, contextValue) => {
            /* INSERT_TT */

            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput = { ...args.datas };
            tInput.BILL_AMT = tInput.BILL_AMT.replace(/,/gi, '');
            tInput.CHARGE = tInput.CHARGE.replace(/,/gi, '');

            var tSQLArray = [];

            let sqlCheck = `
                select
                    *
                from
                    ksv_invoice_prebill
                where
                    ref_no = '${tInput.REF_NO}'
            `;
            var retCheck = await prisma.$queryRaw(Prisma.raw(sqlCheck));
            if (retCheck.length > 0) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = `ERROR:매출입금관리 : 이미 등록된 REF_NO입니다 `;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tTotal =
                parseFloat(tInput.BILL_AMT) + parseFloat(tInput.CHARGE);

            var tPreFlag = tInput.BILL_TYPE;
            if (tPreFlag === '') tPreFlag = '0';

            if (!tInput.BUYER_CD) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = `ERROR:매출입금관리 : Buyer CD는 필수입력입니다`;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            let tSQL99 = `
                insert into
                    ksv_invoice_bill (
                        invoice_no,
                        bill_date,
                        bill_amt,
                        ref_no,
                        bill_type,
                        bank_cd,
                        curr_cd,
                        start_date,
                        STATUS_CD,
                        REG_USER,
                        REG_DATETIME,
                        buyer_cd,
                        pre_flag
                    )
                values
                    (
                        '미정',
                        '${tInput.BILL_DATE}',
                        '${tTotal}',
                        '${tInput.REF_NO}',
                        '1',
                        '${tInput.BANK_CD}',
                        '${tInput.CURR_CD}',
                        '${tInput.BILL_DATE}',
                        '0',
                        '${tUserInfo.USER_ID}',
                        '${tRetDate}',
                        '${tInput.BUYER_CD}',
                        '${tPreFlag}'
                    )
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            let tSQL99 = `
                insert into
                    ksv_invoice_prebill (
                        ref_no,
                        buyer_cd,
                        tot_amt,
                        charge,
                        bill_date,
                        bank_cd,
                        curr_cd,
                        credit_amt,
                        end_flag,
                        pre_flag,
                        STATUS_CD,
                        REG_USER,
                        REG_DATETIME,
                        remark
                    )
                values
                    (
                        '${tInput.REF_NO}',
                        '${tInput.BUYER_CD}',
                        '${tInput.BILL_AMT}',
                        '${tInput.CHARGE}',
                        '${tInput.BILL_DATE}',
                        '${tInput.BANK_CD}',
                        '${tInput.CURR_CD}',
                        '0',
                        '0',
                        '${tPreFlag}',
                        '0',
                        '${tUserInfo.USER_ID}',
                        '${tRetDate}',
                        '${tInput.REMARK}'
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

                /* 메일 발송 */
                const buyerName = (await AFLib.getBuyerInfo(tInput.BUYER_CD))
                    .BUYER_NAME;
                const teamEmail = await prisma.$queryRaw(
                    Prisma.raw(
                        `
                            select distinct
                                a.team_email as team_email
                            from
                                kcd_user b,
                                KCD_BUYER c,
                                kcd_team_email a
                            where
                                b.buyer_team = c.BUYER_TEAM
                                and c.buyer_cd = '${tInput.BUYER_CD}'
                                and b.buyer_team = a.buyer_team
                        `,
                    ),
                );

                console.log('---------teamEmail:', teamEmail);
                if (!teamEmail || teamEmail.length === 0) {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = `ERROR:No Team Email Found`;
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }

                const mailTitle = `(${buyerName}) Ref No: ${tInput.REF_NO}`;
                const mailBody = `안녕하세요?<br>
<br>
상기건으로 매출대금이 입금되었습니다.<br>
입금전문을 확인하시고 관련 Invoice, Debit note, Credit note를 등록해주세요.<br>
등록 내용을 메일로 회신하여 주시기 바랍니다.<br>
제경팀은 관련 증빙을 은행에 제출하고 당사 통장에 입금하여 주세요.<br>
<br>
바이어명 : ${buyerName}<br>
Ref No : ${tInput.REF_NO}<br>
입금액 : ${tInput.BILL_AMT}${tInput.CURR_CD}<br>
`;


                let sqlSelDb = `           
                   select db_name() as db_name
                `;
                var retSelDb = await prisma.$queryRaw(Prisma.raw(sqlSelDb));
                var tDbName = '';
                if (retSelDb.length > 0) tDbName = retSelDb[0].db_name;

                console.log(`Send Mail Check: ${tDbName}`);

                if (tDbName === 'shints') { 
                    console.log(`Send Mail : ${tDbName}`);

                    AFLib.afSendMail({
                        to: teamEmail[0].team_email,
                        //to: 'lih7912@autostock.co.kr',
                        cc: cc,
                        bcc: bcc,
                        subject: mailTitle,
                        html: mailBody,
                    });
                }
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = `ERROR:Insert LC NEGO :${e.message}`;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED: Insert LC NEGO ';
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },

        mgrInsert_S0707_5_DELETE_TT: async (_, args, contextValue) => {
            /* INSERT_TT */

            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput = { ...args.datas };

            console.log('Server Pro');
            var tSQLArray = [];
            // console.log(args.datas);

            let sql0 = `
                select
                    *
                from
                    ksv_invoice_bill
                where
                    ref_no = '${tInput.REF_NO}'
                    and buyer_cd = '${tInput.BUYER_CD}'
                    -- and  invoice_no = '미정'
            `;
            var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            if (nRet0.length === 1 && nRet0[0].INVOICE_NO === '미정') {
            } else {
                if (nRet0.lengt >= 1)
                    return [
                        {
                            CODE: 'ERROR:해당 REF_NO는 작업중이므로 삭제할수 없습니다. (Check)',
                            id: 0,
                        },
                    ];
                else {
                    let tSQL99 = `
                        delete from ksv_invoice_prebill
                        where
                            ref_no = '${tInput.REF_NO}'
                            and buyer_cd = '${tInput.BUYER_CD}'
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
                        tObj.CODE = `SUCCESS:Delete TT`;
                        tObj.id = 0;
                        tRetArray.push(tObj);
                        return tRetArray;
                    } catch (e) {
                        var tRetArray = [];
                        var tObj = {};
                        tObj.CODE = `ERROR:Delete TT(${e.message})`;
                        tObj.id = 0;
                        tRetArray.push(tObj);
                        return tRetArray;
                    }
                }
            }

            let sql1 = `
                select
                    *
                from
                    ksv_invoice_credit
                where
                    ref_no = '${tInput.REF_NO}'
                    -- and  invoice_no = '미정'
            `;
            var nRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
            if (nRet1.length !== 0) {
                return [
                    {
                        CODE: 'ERROR:해당 REF_NO는 작업중이므로 삭제할수 없습니다. 3',
                        id: 0,
                    },
                ];
            }

            let tSQL99 = `
                delete from ksv_invoice_bill
                where
                    ref_no = '${tInput.REF_NO}'
                    and buyer_cd = '${tInput.BUYER_CD}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            let tSQL99 = `
                delete from ksv_invoice_credit
                where
                    ref_no = '${tInput.REF_NO}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));

            let tSQL99 = `
                delete from ksv_invoice_prebill
                where
                    ref_no = '${tInput.REF_NO}'
                    and buyer_cd = '${tInput.BUYER_CD}'
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
                tObj.CODE = `ERROR:Delete TT(${e.message})`;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED: Delete TT ';
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },

        mgrInsert_S0707_5_1: async (_, args, contextValue) => {
            // Update Location
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
            var tInput1 = { ...args.datas1 };

            console.log('Server Pro');
            var tSQLArray = [];
            // console.log(args.datas);

            /*
      let sql0 = `
      `;
      var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
      var tInput0 = { ...nRet0[0] };
*/

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
                        REG_DATETIME
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
                        '${tRetDate}'
                    );
                
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
                tObj.CODE = 'ERROR:Insert TT';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED: Insert TT: ' + tInput1.REF_NO;
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },

        mgrUpdate_S0707_5: async (_, args, contextValue) => {
            // Update Location
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
            var tInput1 = { ...args.datas1 };

            console.log('Server Pro');
            var tSQLArray = [];
            // console.log(args.datas);
            let tSQL99 = `
                UPDATE ksv_impcharge_mst
                SET
                    SHIP_DATE = '${tInput1.SHIP_DATE}',
                    TOT_AMT = '${tInput1.TOTAL_AMT}',
                    DELIVERY_TYPE = '${tInput1.DELIVERY_TYPE}',
                    remark = '${tInput1.REMARK}',
                    customs = '${tInput1.VENDOR_NAME}',
                    vat = '${tInput1.DUTY_AMT}',
                    freight = '${tInput1.FREIGHT_AMT}',
                    clearance = '${tInput1.COST_CLEAR}',
                    curr_cd = '${tInput1.CURR_CD}',
                    BUYER_CD = '${tInput1.BUYER_CD}'
                WHERE
                    INVOICE_NO = '${tInput1.INVOICE_NO}'
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
                tObj.CODE = 'ERROR:Update TT';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED: Update TT ';
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },

        mgrDelete_S0707_5: async (_, args, contextValue) => {
            // Update Location
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
            var tInput1 = { ...args.datas1 };

            console.log('Server Pro');
            var tSQLArray = [];
            // console.log(args.datas);
            let tSQL99 = `
                delete from ksv_impcharge_mst
                WHERE
                    INVOICE_NO = '${tInput1.INVOICE_NO}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            let tSQL99 = `
                delete from ksv_impcharge_mem
                WHERE
                    INVOICE_NO = '${tInput1.INVOICE_NO}'
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
                tObj.CODE = 'ERROR:Insert SHIP Record';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED: Insert SHIP Record :' + tInput1.INVOICE_NO;
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },
    },
};

export default moduleMutation_S0707_5;
