// MGR_@@TNAME@@.mutations.js

import * as fs from 'fs';
import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
import UserAuthLib from '../../userlib'; //PrismaClient 사용하기 위해 불러오기

/*
                STD_FLAG: String 
                NET: String 
                LOSS: String 
                USE_SIZE: String 
                REMARK: String 

*/

// export default로 Mutation 내용 내보내기
const moduleMutation_S0110_5 = {
    Mutation: {
        mgrInsert_S0110_5: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);
            var tYY = tRetDate.substring(2, 4);

            var tUserInfo: any = AFLib.getUserInfo(contextValue);
            var tInput1 = { ...args.datas1 };

            console.log('------------------------');
            console.log(tInput1);

            var sql0 = `
                SELECT
                    isnull(max(right(bank_cd, 4)), '0000') as max_str
                FROM
                    KCD_BANK
                where
                    bank_cd like '${tYY}%'
            `;
            var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            var tMax = parseInt(nRet0[0].max_str) + 1;

            var tZero = '0000';
            var tNewBankCd =
                tYY +
                tZero.substring(0, 4 - String(tMax).length) +
                String(tMax);

            var tSQLArray: any[] = [];
            // console.log(args.datas);

            //Duplication Check
            var tCheckAccount = tInput1.ACCOUNT_NO.replace(/-/gi, '');
            tCheckAccount = tCheckAccount.replace(/_/gi, '');
            tCheckAccount = tCheckAccount.replace(/ /gi, '');

            let sqlStr = `
                select
                    *
                from
                    KCD_BANK
                where
                    CHK_ACCOUNT_NO = '${tCheckAccount}'
            `;
            const sqlTest = await prisma.$queryRaw(Prisma.raw(sqlStr));

            console.log(sqlTest);

            interface ObjType {
                CODE: string;
                id: number;
            }
            if (sqlTest.length > 0) {
                let tRetArray: any[] = [];

                var tObj: ObjType = {
                    CODE: '',
                    id: 0,
                };
                tObj.CODE = 'ERROR:duplication Account NO ';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            tInput1.BANK_TYPE = '3';
            tInput1.ADDR2 = '';

            let tSQL99 = `
                INSERT INTO
                    KCD_BANK (
                        bank_cd,
                        bank_name,
                        account_no,
                        account_name,
                        sftcode,
                        addr1,
                        addr2,
                        bank_type,
                        status_cd,
                        reg_user,
                        reg_datetime,
                        bank_branch,
                        bank_type1,
                        chk_account_no
                    )
                VALUES
                    (
                        '${tNewBankCd}',
                        '${tInput1.BANK_NAME.replace(/'/g, "''")}',
                        '${tInput1.ACCOUNT_NO}',
                        '${tInput1.ACCOUNT_NAME.replace(/'/g, "''")}',
                        '${tInput1.SFTCODE}',
                        '${tInput1.ADDR1.replace(/'/g, "''")}',
                        '${tInput1.ADDR2.replace(/'/g, "''")}',
                        '${tInput1.BANK_TYPE}',
                        '0',
                        '${tUserInfo.USER_ID}',
                        '${tRetDate}',
                        '${tInput1.BANK_BRANCH}',
                        '${tInput1.BANK_TYPE1}',
                        '${tCheckAccount}'
                    )
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            if (tInput1.imgURL != undefined) {
                let imgSaveSQL = `
                    Insert INTO
                        KCD_FILEINFO (
                            KIND,
                            FILE_KEY,
                            NAME,
                            URL,
                            OBJECT_NAME,
                            UPD_DATETIME
                        )
                    VALUES
                        (
                            'BANK',
                            '${tNewBankCd}',
                            '${tInput1.fileName}',
                            '${tInput1.imgURL}',
                            '${tInput1.objectName}',
                            '${tRetDate1}'
                        )
                `;

                const imgSaveSQL_1 = prisma.$queryRaw(Prisma.raw(imgSaveSQL));
                tSQLArray.push(imgSaveSQL_1);
            }

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
            } catch (e) {
                let tRetArray: any[] = [];
                var tObj: ObjType = {
                    CODE: '',
                    id: 0,
                };
                tObj.CODE = `ERROR:Insert Insert Bank Cd (${tNewBankCd}, ${e.message})`;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray: any[] = [];
            var tObj1: ObjType = {
                CODE: '',
                id: 0,
            };
            tObj1.CODE = 'SUCCEED: Insert Bank Cd ' + tNewBankCd;
            tObj1.id = 0;
            tRetArray.push(tObj1);

            return tRetArray;
        },

        mgrUpdate_S0110_5: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tUserInfo: any = AFLib.getUserInfo(contextValue);
            var tInput1 = { ...args.datas1 };

            var tCheckAccount = tInput1.ACCOUNT_NO.replace(/-/gi, '');
            tCheckAccount = tCheckAccount.replace(/_/gi, '');
            tCheckAccount = tCheckAccount.replace(/ /gi, '');

            var tSQL = '';
            let sqlStr = `
                select
                    *
                from
                    KCD_BANK
                where
                    CHK_ACCOUNT_NO = '${tCheckAccount}'
                    AND BANK_CD <> '${tInput1.BANK_CD}'
            `;
            let sqlTest = await prisma.$queryRaw(Prisma.raw(sqlStr));

            /*
      if (sqlTest.length) {
        return [{ CODE:'ERROR: 동일 계좌번호가 존재합니다.', id: 0 }]
      } else {
        tSQL = `account_no = '${tInput1.ACCOUNT_NO}',  `;
        tSQL = `chk_account_no = '${tCheckAccount}',  `;
      }
      */

            tSQL = `account_no = '${tInput1.ACCOUNT_NO}',  `;
            tSQL = `chk_account_no = '${tCheckAccount}',  `;

            var tSQLArray: any[] = [];

            let tSQL99 = `
                update kcd_bank
                set
                    bank_name = '${tInput1.BANK_NAME.replace(/'/g, "''")}',
                    account_no = '${tInput1.ACCOUNT_NO}',
                    account_name = '${tInput1.ACCOUNT_NAME.replace(/'/g, "''")}',
                    sftcode = '${tInput1.SFTCODE}',
                    addr1 = '${tInput1.ADDR1.replace(/'/g, "''")}',
                    -- addr2 = '${tInput1.ADDR2}',
                    -- bank_type = '${tInput1.BANK_TYPE}',
                    status_cd = '${tInput1.STATUS_CD}',
                    upd_user = '${tUserInfo.USER_ID}',
                    upd_datetime = '${tRetDate}',
                    bank_branch = '${tInput1.BANK_BRANCH}',
                    bank_type1 = '${tInput1.BANK_TYPE1}',
                    chk_account_no = '${tCheckAccount}'
                where
                    bank_cd = '${tInput1.BANK_CD}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            let checkImgUrl = `
                select
                    *
                from
                    kcd_fileinfo
                where
                    FILE_KEY = '${tInput1.BANK_CD}'
                    and KIND = 'BANK'
            `;

            let check = await prisma.$queryRaw(Prisma.raw(checkImgUrl));
            let imgUpdSQL = '';
            if (tInput1.imgURL != undefined) {
                if (check.length > 0) {
                    imgUpdSQL = `
                        update kcd_fileinfo
                        set
                            NAME = '${tInput1.fileName}',
                            URL = '${tInput1.imgURL}',
                            OBJECT_NAME = '${tInput1.objectName}',
                            UPD_DATETIME = '${tRetDate}'
                        where
                            FILE_KEY = '${tInput1.BANK_CD}'
                    `;
                } else {
                    imgUpdSQL = `
                        Insert INTO
                            KCD_FILEINFO (
                                KIND,
                                FILE_KEY,
                                NAME,
                                URL,
                                OBJECT_NAME,
                                UPD_DATETIME
                            )
                        VALUES
                            (
                                'BANK',
                                '${tInput1.BANK_CD}',
                                '${tInput1.fileName}',
                                '${tInput1.imgURL}',
                                '${tInput1.objectName}',
                                '${tRetDate}'
                            )
                    `;
                }

                const imgSaveSQL_1 = prisma.$queryRaw(Prisma.raw(imgUpdSQL));
                tSQLArray.push(imgSaveSQL_1);
            }

            /* Vendor 상신 상태 초기화 */
            let tSQL99_VENDOR = `
                update kcd_vendor
                set
                    gw = '0'
                where
                    bank_cd = '${tInput1.BANK_CD}'
            `;
            const tSQL99_1_VENDOR = prisma.$queryRaw(Prisma.raw(tSQL99_VENDOR));
            tSQLArray.push(tSQL99_1_VENDOR);

            const tSQL99_2_VENDOR = prisma.$queryRaw(
                Prisma.raw(`
                    update kcd_vendor_bank
                    set
                        gw = '0'
                    where
                        bank_cd = '${tInput1.BANK_CD}'
                `),
            );
            tSQLArray.push(tSQL99_2_VENDOR);

            interface ObjType {
                CODE: string;
                id: number;
            }

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
            } catch (e) {
                var tRetArray: any[] = [];
                var tObj: ObjType = {
                    CODE: '',
                    id: 0,
                };
                tObj.CODE = 'ERROR:Insert SHIP Record';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray: any[] = [];
            var tObj: ObjType = {
                CODE: '',
                id: 0,
            };
            tObj.CODE = 'SUCCEED: update Bank Record ' + tInput1.BANK_CD;
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },

        mgrUpdate_S0110_5_1: async (_, args, contextValue) => {
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
            if (dd > 9) dd_str = dd.toString();
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
            var tInput1 = { ...args.datas1 };
            var tInput2 = { ...args.datas2 };
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tSQLArray: any[] = [];
            // console.log(args.datas);

            let tSQL99_VENDOR = `
                update kcd_vendor
                set
                    bank_cd = '${tInput1.BANK_CD}',
                    bank1 = '${tInput1.BANK_NAME}',
                    gw = '0'
                where
                    vendor_cd = '${tInput2.VENDOR_CD}'
            `;
            const tSQL99_1_VENDOR = prisma.$queryRaw(Prisma.raw(tSQL99_VENDOR));
            tSQLArray.push(tSQL99_1_VENDOR);

            var tSql9 = `
                select
                    isnull(max(SEQ), 0) as max_seq
                from
                    kcd_vendor_bank
                where
                    vendor_cd = '${tInput2.VENDOR_CD}'
            `;
            var nRet0 = await prisma.$queryRaw(Prisma.raw(tSql9));
            var tNewSeq = nRet0[0].max_seq + 1;

            let tSQL99 = `
                insert into
                    kcd_vendor_bank (vendor_cd, seq, bank_cd)
                values
                    ('${tInput2.VENDOR_CD}', '${tNewSeq}', '${tInput1.BANK_CD}')
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
                console.log(e);
                var tRetArray: any[] = [];
                interface ObjType {
                    CODE: string;
                    id: number;
                }
                var tObj: any = {
                    CODE: '',
                    id: 0,
                };
                tObj.CODE = 'ERROR:Insert SHIP Record';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray: any[] = [];
            var tObj: any = {};
            tObj.CODE = 'SUCCEED: update Bank Record ' + tInput1.BANK_CD;
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },

        mgrDelete_S0110_5_1: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput = { ...args.datas };

            var tSQLArray = [];
            // console.log(args.datas);

            let delete_vendorQry = `
                delete from kcd_vendor_bank
                where
                    BANK_CD = '${tInput.BANK_CD}'
                    and VENDOR_CD = '${tInput.VENDOR_CD}'
            `;
            const delete_vendor = prisma.$queryRaw(
                Prisma.raw(delete_vendorQry),
            );
            tSQLArray.push(delete_vendor);

            let tSQL99 = `
                update kcd_vendor
                set
                    bank_cd = '',
                    bank1 = '',
                    gw = '0'
                where
                    vendor_cd = '${tInput.VENDOR_CD}'
                    and bank_cd = '${tInput.BANK_CD}'
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
                tObj.CODE = 'ERROR:Update Vendor Bank';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED: update Bank Record ' + tInput.BANK_CD;
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },

        mgrDelete_S0110_5: async (_, args, contextValue) => {
            var tUserInfo = AFLib.getUserInfo(contextValue);

            console.log('-----------------------');
            console.log(args);
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
            if (dd > 9) dd_str = dd.toString();
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

            var tInput1 = { ...args.datas1 };

            var tSQLArray: any[] = [];
            // console.log(args.datas);

            //let nMemberArray = tInput1.SIZE_MEMBER.split(',');
            //let nCnt = nMemberArray.length;

            let tSQL99 = `
                delete from kcd_bank
                where
                    bank_cd = '${tInput1.BANK_CD}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            let delete_vendorQry = `
                delete from kcd_vendor_bank
                where
                    BANK_CD = '${tInput1.BANK_CD}'
            `;
            const delete_vendor = prisma.$queryRaw(
                Prisma.raw(delete_vendorQry),
            );
            tSQLArray.push(delete_vendor);

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
                let tRetArray: any[] = [];
                let tObj = {
                    CODE:
                        'SUCCEED: Delete Bank Record Record ' + tInput1.BANK_CD,
                    id: tInput1.id,
                };

                tRetArray.push(tObj);

                return tRetArray;
            } catch (e) {
                let tRetArray: any[] = [];
                let tObj = {
                    CODE: 'ERROR:Delete BANK Record',
                    id: 0,
                };

                tRetArray.push(tObj);
                return tRetArray;
            }
        },
    },
};

export default moduleMutation_S0110_5;
