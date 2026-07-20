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
const moduleMutation_S0705_5 = {
    Mutation: {
        mgrInsert_S0705_5_UPDATE_BILL: async (_, args, contextValue) => {
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

            var tCheck = 0;
            var tCheckMsg = '';
            args.datas.forEach((col, i) => {
                if (col.BILL_CHK === '0') {
                    tCheck = 1;
                    tCheckMsg = 'Include Sales Part Unchecked Item.';
                }
                if (col.BILL_FLAG === '1') {
                    tCheck = 1;
                    tCheckMsg = 'Include Already Billed Item.';
                }
            });

            if (tCheck > 0) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Cmpt Payment:' + tCheckMsg;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var tOne = args.datas[tIdx];

                var tSQLArray = [];
                let tSQL99 = `
                    update ksv_order_ship
                    set
                        fc_bill_flag = '1',
                        fc_bill_date = '${args.datas1.BILL_DATE}'
                    where
                        order_cd = '${tOne.ORDER_CD}'
                        and ship_date = '${tOne.SHIP_DATE}'
                        and ship_ptype = '${tOne.SHIP_PTYPE}'
                        and exfactory = '${tOne.EXFACTORY}'
                        and invoice_no = '${tOne.INVOICE_NO}'
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
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED:Cmpy Payment';
            tObj.id = 0;
            tRetArray.push(tObj);
            return tRetArray;
        },

        mgrInsert_S0705_5_UPDATE_SALES: async (_, args, contextValue) => {
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

            var tCheck = 0;
            var tCheckMsg = '';
            args.datas.forEach((col, i) => {
                if (col.FC_NEGO_TYPE !== '1') {
                    tCheck = 1;
                    tCheckMsg = 'Cmpt Price Not Decided.';
                }
                if (col.BILL_CHK === '1') {
                    tCheck = 1;
                    tCheckMsg = 'Include Already Checked Item.';
                }
                /*
          if (col.SHIP_PTYPE !== '3') {
             tCheck = 1;
             tCheckMsg = 'Cannot Update Cmpt Price Except Repair Case.';
          }
*/
                if (col.INVOICE_NO === '') {
                    tCheck = 1;
                    tCheckMsg = 'Not input the Invoice No.';
                }
            });

            if (tCheck > 0) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Cmpt Payment:' + tCheckMsg;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var tOne = args.datas[tIdx];

                var tSQLArray = [];

                let sql1 = `
                    select
                        *
                    from
                        ksv_order_mst
                    where
                        order_cd = '${tOne.ORDER_CD}'
                `;
                const tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));

                let sql2 = `
                    select
                        isnull(sum(ship_cnt), 0) as ship_cnt
                    from
                        ksv_order_ship
                    where
                        order_cd = '${tOne.ORDER_CD}'
                `;
                const tRet2 = await prisma.$queryRaw(Prisma.raw(sql2));

                var tChkFlag = '1';
                if (
                    parseFloat(tRet1[0].TOT_CNT) > parseFloat(tRet2[0].ship_cnt)
                )
                    tChkFlag = '2';

                let tSQL99 = `
                    update ksv_order_ship
                    set
                        fc_bill_price = '${tOne.FC_BILL_PRICE}',
                        fc_chk_flag = '${tChkFlag}',
                        fc_chk_user = '${tUserInfo.USER_ID}',
                        fc_chk_datetime = '${tRetDate1}'
                    where
                        order_cd = '${tOne.ORDER_CD}'
                        and ship_date = '${tOne.SHIP_DATE}'
                        and ship_ptype = '${tOne.SHIP_PTYPE}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                if (tOne.SHIP_PTYPE === '1' || tOne.SHIP_PTYPE === '3') {
                    let tSQL99 = `
                        update ksv_order_mst
                        set
                            etc_amt = etc_amt + ${FC_AMT}
                        where
                            order_cd = '${tOne.ORDER_CD}'
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
                    tObj.CODE = 'ERROR:Insert SHIP Record';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED:Cmpy Payment';
            tObj.id = 0;
            tRetArray.push(tObj);
            return tRetArray;
        },

        mgrInsert_S0705_5_CANCEL_BILL: async (_, args, contextValue) => {
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

            var tCheck = 0;
            var tCheckMsg = '';
            args.datas.forEach((col, i) => {
                if (col.BILL_FLAG !== '1') {
                    tCheck = 1;
                    tCheckMsg = 'Include Unbilled Item';
                }
            });

            if (tCheck > 0) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Cmpt Payment:' + tCheckMsg;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var tOne = args.datas[tIdx];

                var tSQLArray = [];

                let tSQL99 = `
                    update ksv_order_ship
                    set
                        fc_bill_flag = '0',
                        fc_bill_date = ''
                    where
                        order_cd = '${tOne.ORDER_CD}'
                        and ship_date = '${tOne.SHIP_DATE}'
                        and ship_ptype = '${tOne.SHIP_PTYPE}'
                        and exfactory = '${tOne.EXFACTORY}'
                        and invoice_no = '${tOne.INVOICE_NO}'
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
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED:Cmpy Payment';
            tObj.id = 0;
            tRetArray.push(tObj);
            return tRetArray;
        },

        mgrInsert_S0705_5_CANCEL_SALES: async (_, args, contextValue) => {
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

            var tCheck = 0;
            var tCheckMsg = '';
            args.datas.forEach((col, i) => {
                if (col.BILL_CHK !== '1') {
                    tCheck = 1;
                    tCheckMsg = 'Include Sales Part Unchecked Item.';
                }
                if (col.BILL_FLAG === '1') {
                    tCheck = 1;
                    tCheckMsg = 'Already Billed..';
                }
            });

            if (tCheck > 0) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Cmpt Payment:' + tCheckMsg;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var tOne = args.datas[tIdx];

                var tSQLArray = [];

                let tSQL99 = `
                    update ksv_order_ship
                    set
                        fc_bill_price = '${tOne.FC_BILL_PRICE}',
                        fc_chk_flag = '0',
                        fc_chk_user = '${tUserInfo.USER_ID}',
                        fc_chk_datetime = ''
                    where
                        order_cd = '${tOne.ORDER_CD}'
                        and ship_date = '${tOne.SHIP_DATE}'
                        and ship_ptype = '${tOne.SHIP_PTYPE}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                if (tOne.SHIP_PTYPE === '1' || tOne.SHIP_PTYPE === '3') {
                    let tSQL99 = `
                        update ksv_order_mst
                        set
                            etc_amt = etc_amt - ${FC_AMT}
                        where
                            order_cd = '${tOne.ORDER_CD}'
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
                    tObj.CODE = 'ERROR:Insert SHIP Record';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED:Cmpy Payment';
            tObj.id = 0;
            tRetArray.push(tObj);
            return tRetArray;
        },
    },
};

export default moduleMutation_S0705_5;
