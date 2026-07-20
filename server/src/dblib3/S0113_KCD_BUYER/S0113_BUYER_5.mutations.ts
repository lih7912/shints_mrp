// MGR_@@TNAME@@.mutations.js

import * as fs from 'fs';
import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기

/*
                FACTORY_CD:String 
                FACTORY_NAME:String 
                USER_NAME:String 
                EMAIL:String 
                TEL_NO:String 
                FAX_NO:String 
                ZIP_NO:String 
                ADDR1:String 
                ADDR2:String 
                PORT:String 
                AIRPORT:String 
                BANK_CD:String 
                BANK_NAME:String 
                ACCOUNT_NO:String 
                ACCOUNT_NAME:String 

*/

// export default로 Mutation 내용 내보내기
const moduleMutation_S0113_BUYER_5 = {
    Mutation: {
        mgrInsert_S0113_BUYER_SAVE: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = await AFLib.getUserInfoSync(contextValue);

            console.log(tUserInfo);

            var tSQLArray = [];

            let tKCD_BUYER = {
                ...args.datas,
            };
            tKCD_BUYER.BUYER_CD = tKCD_BUYER.BUYER_CD.toUpperCase();
            let tId = tKCD_BUYER.id;

            let sql0 = `
                select
                    *
                from
                    kcd_buyer
                where
                    buyer_cd = '${tKCD_BUYER.BUYER_CD}'
            `;
            let tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));

            if (tRet0.length <= 0) {
                if (tUserInfo.USER_ID !== 'jhoen') {
                    if (tUserInfo.USER_ID !== 'won21kr') {
                        let tRetArray: any[] = [];
                        let tObj = {
                            CODE: '',
                            id: 0,
                        };
                        tObj.CODE = 'ERROR: No authority to create vendor';
                        tObj.id = 0;
                        tRetArray.push(tObj);
                        return tRetArray;
                    }
                }

                interface buyerType {
                    BUYER_CD: any;
                    BUYER_NAME: any;
                    BUYER_ABBR: any;
                    BUYER_TEAM: any;
                    SHINTS_USER: any;
                    USER_NAME: any;
                    EMAIL: any;
                    TEL_NO: any;
                    FAX_NO: any;
                    ADDR1: any;
                    NAT_CD: any;
                    BANK_CD: any;
                    STATUS_CD: string;
                    REG_USER: any;
                    REG_DATETIME: string;
                    UPD_USER: any;
                    UPD_DATETIME: string;
                    NEOE_BUYER_CD_MOM: any;
                    NEOE_BUYER_CD: any;
                    NEOE_A23: any;
                    MOM_CD: any;
                    BUYER_TYPE: any;
                    PAY_RULE: any;
                    loss_flag: any;
                    COMPANY_NAME: any;
                    CREDIT_DATE: any;
                    TOLERANCE: any;
                    SHIP_ADDR1: any;
                    SHIP_ADDR2: any;
                    SHIP_ADDR3: any;
                    REPRESENTATIVE: any;
                    company_code: any;
                }

                var tObjKCD_BUYER: buyerType = {
                    BUYER_CD: tKCD_BUYER.BUYER_CD,
                    BUYER_NAME: tKCD_BUYER.BUYER_NAME,
                    BUYER_ABBR: tKCD_BUYER.BUYER_ABBR,
                    BUYER_TEAM: tKCD_BUYER.BUYER_TEAM,
                    SHINTS_USER: '',
                    USER_NAME: tKCD_BUYER.USER_NAME,
                    EMAIL: tKCD_BUYER.EMAIL,
                    TEL_NO: tKCD_BUYER.TEL_NO,
                    FAX_NO: tKCD_BUYER.FAX_NO,
                    ADDR1: tKCD_BUYER.ADDR1,
                    NAT_CD: tKCD_BUYER.NAT_CD,
                    BANK_CD: tKCD_BUYER.BANK_CD,
                    STATUS_CD: '0',
                    REG_USER: tUserInfo.USER_ID,
                    REG_DATETIME: tRetDate,
                    UPD_USER: tUserInfo.USER_ID,
                    UPD_DATETIME: tRetDate,
                    NEOE_BUYER_CD_MOM: tKCD_BUYER.NEOE_BUYER_CD_MOM,
                    NEOE_BUYER_CD: tKCD_BUYER.NEOE_BUYER_CD,
                    NEOE_A23: tKCD_BUYER.NEOE_TYPE,
                    MOM_CD: '',
                    BUYER_TYPE: tKCD_BUYER.BUYER_TYPE,
                    PAY_RULE: tKCD_BUYER.PAY_RULE,
                    loss_flag: tKCD_BUYER.loss_flag,
                    COMPANY_NAME: tKCD_BUYER.COMPANY_NAME,
                    TOLERANCE: tKCD_BUYER.TOLERANCE,
                    CREDIT_DATE: tKCD_BUYER.CREDIT_DATE,
                    SHIP_ADDR1: tKCD_BUYER.SHIP_ADDR1,
                    SHIP_ADDR2: tKCD_BUYER.SHIP_ADDR2,
                    SHIP_ADDR3: tKCD_BUYER.SHIP_ADDR3,
                    REPRESENTATIVE: tKCD_BUYER.REPRESENTATIVE,
                    company_code: tUserInfo.COMPANY_CODE,
                };

                let tSQL99 = AFLib.createTableSql('kcd_buyer', tObjKCD_BUYER);
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            } else {
                const escSql = (val: any) =>
                    String(val ?? '').replace(/'/g, "''");

                let sqlStr = `
                    UPDATE KCD_BUYER
                    SET
                        BUYER_NAME = '${escSql(tKCD_BUYER.BUYER_NAME)}',
                        BUYER_ABBR = '${escSql(tKCD_BUYER.BUYER_ABBR)}',
                        -- BUYER_TEAM = '', 
                        -- SHINTS_USER = '', 
                        USER_NAME = '${escSql(tKCD_BUYER.USER_NAME)}',
                        EMAIL = '${escSql(tKCD_BUYER.EMAIL)}',
                        TEL_NO = '${escSql(tKCD_BUYER.TEL_NO)}',
                        FAX_NO = '${escSql(tKCD_BUYER.FAX_NO)}',
                        ADDR1 = '${escSql(tKCD_BUYER.ADDR1)}',
                        NAT_CD = '${escSql(tKCD_BUYER.NAT_CD)}',
                        BANK_CD = '${escSql(tKCD_BUYER.BANK_CD)}',
                        STATUS_CD = '${escSql(tKCD_BUYER.STATUS_CD)}',
                        UPD_USER = '${escSql(tUserInfo.USER_ID)}',
                        UPD_DATETIME = '${escSql(tRetDate)}',
                        NEOE_BUYER_CD_MOM = '${escSql(tKCD_BUYER.NEOE_BUYER_CD_MOM)}',
                        NEOE_BUYER_CD = '${escSql(tKCD_BUYER.NEOE_BUYER_CD)}',
                        NEOE_A23 = '${escSql(tKCD_BUYER.NEOE_TYPE)}',
                        -- MOM_CD = '${tKCD_BUYER.MOM_CD}', 
                        BUYER_TYPE = '${escSql(tKCD_BUYER.BUYER_TYPE)}',
                        BUYER_TEAM = '${escSql(tKCD_BUYER.BUYER_TEAM)}',
                        PAY_RULE = '${escSql(tKCD_BUYER.PAY_RULE)}',
                        loss_flag = '${escSql(tKCD_BUYER.loss_flag)}',
                        SHIP_ADDR1 = '${escSql(tKCD_BUYER.SHIP_ADDR1)}',
                        SHIP_ADDR2 = '${escSql(tKCD_BUYER.SHIP_ADDR2)}',
                        SHIP_ADDR3 = '${escSql(tKCD_BUYER.SHIP_ADDR3)}',
                        CREDIT_DATE = '${escSql(tKCD_BUYER.CREDIT_DATE)}',
                        CREDIT_CURR = '${escSql(tKCD_BUYER.CREDIT_CURR)}',
                        CREDIT_AMT = '${escSql(tKCD_BUYER.CREDIT_AMT)}',
                        CREDIT_AMOUNT = '${escSql(tKCD_BUYER.CREDIT_AMT)}',
                        TOLERANCE = '${escSql(tKCD_BUYER.TOLERANCE)}',
                        REPRESENTATIVE = '${escSql(tKCD_BUYER.REPRESENTATIVE)}'
                    WHERE
                        BUYER_CD = '${escSql(tKCD_BUYER.BUYER_CD)}'
                `;
                let tSQL99 = prisma.$queryRaw(Prisma.raw(sqlStr));
                tSQLArray.push(tSQL99);
            }
            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
                let tRetArray: any[] = [];
                var tObj: ObjType = {
                    CODE: '',
                    id: 0,
                };
                tObj.CODE = 'SUCCESS:Insert Buyer';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            } catch (e) {
                let tRetArray: any[] = [];
                var tObj: ObjType = {
                    CODE: '',
                    id: 0,
                };
                tObj.CODE = 'ERROR:Insert Buyer';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },

        mgrInsert_S0113_BUYER_CREDIT_RATING_SAVE: async (
            _,
            args,
            contextValue,
        ) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tSQLArray = [];

            let sqlStr = `
                UPDATE KCD_BUYER
                SET
                    CREDIT_CURR = '${args.datas.CREDIT_CURR}',
                    CREDIT_AMT = '${args.datas.CREDIT_AMT}'
                WHERE
                    BUYER_CD = '${args.datas.BUYER_CD}'
            `;
            let tSQL99 = prisma.$queryRaw(Prisma.raw(sqlStr));
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
                let tRetArray: any[] = [];
                var tObj: ObjType = {
                    CODE: '',
                    id: 0,
                };
                tObj.CODE = 'SUCCESS:Insert Credit Info';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            } catch (e) {
                let tRetArray: any[] = [];
                var tObj: ObjType = {
                    CODE: '',
                    id: 0,
                };
                tObj.CODE = 'ERROR:Insert Credit Info';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },

        mgrInsert_S0113_BUYER_TEAM_INFO_SAVE: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput1 = [...args.datas];

            var tBuyerCd = args.datas1;

            var tSQLArray: any[] = [];
            let tSQL99 = `
                delete from kcd_buyer_team_info
                where
                    buyer_cd = '${tBuyerCd}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            var tIdx = 0;
            for (tIdx = 0; tIdx < tInput1.length; tIdx++) {
                var tOne = {
                    ...tInput1[tIdx],
                };

                let tSQL99 = `
                    insert into
                        kcd_buyer_team_info (buyer_cd, factory, team, user_id, user_name)
                    values
                        (
                            '${tBuyerCd}',
                            '${tOne.FACTORY}',
                            '${tOne.TEAM}',
                            '${tOne.USER_ID}',
                            '${tOne.USER_NAME}'
                        )
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                var tBuyerTeam = '';
                if (tOne.FACTORY === '서울' && tOne.TEAM === '담당팀') {
                    tBuyerTeam = tOne.col3;
                    let tSQL99 = `
                        update kcd_buyer
                        set
                            buyer_team = '${tBuyerTeam}'
                        where
                            buyer_cd = '${tBuyerCd}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    // tSQLArray.push(tSQL99_1);
                }
            }

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
                let tRetArray: any[] = [];
                var tObj: ObjType = {
                    CODE: '',
                    id: 0,
                };
                tObj.CODE = 'SUCCESS:Insert Team Info';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            } catch (e) {
                let tRetArray: any[] = [];
                var tObj: ObjType = {
                    CODE: '',
                    id: 0,
                };
                tObj.CODE = 'ERROR:Insert Team Info';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },

        mgrInsert_S0113_BUYER_FILE_INFO_SAVE: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tSQLArray = [];

            let tInput = {
                ...args.datas,
            };

            var tObj = {};
            tObj.kind = 'BUYER';
            tObj.title = tInput.title;
            tObj.file_key = tInput.BUYER_CD;
            tObj.name = tInput.fileName;
            tObj.url = tInput.imgURL;
            tObj.object_name = tInput.objectName;
            tObj.upd_datetime = tRetDate;

            let tSQL99 = AFLib.createTableSql('kcd_fileinfo', tObj);
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
                let tRetArray: any[] = [];
                var tObj: ObjType = {
                    CODE: '',
                    id: 0,
                };
                tObj.CODE = 'SUCCESS:Insert File Info';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            } catch (e) {
                let tRetArray: any[] = [];
                var tObj: ObjType = {
                    CODE: '',
                    id: 0,
                };
                tObj.CODE = 'ERROR:Insert File Info';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },

        mgrInsert_S0113_BUYER_DELETE: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            let tSQLArray: any[] = [];

            var sql0 = `
                select
                    count(*) as c_cnt
                from
                    kcd_style
                where
                    buyer_cd = '${args.datas.BUYER_CD}'
            `;
            let tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            if (tRet0.length > 0) {
                if (parseFloat(tRet0[0].c_cnt) > 0) {
                    let tRetArray: any[] = [];
                    var tObj: ObjType = {
                        CODE: '',
                        id: 0,
                    };
                    tObj.CODE = 'ERROR:Already Style Registed.';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }
            }

            let sqlStrBuyer = `
                delete from KCD_BUYER
                where
                    BUYER_CD = '${args.datas.BUYER_CD}'
            `;
            const tSQL99_Buyer = prisma.$queryRaw(Prisma.raw(sqlStrBuyer));
            tSQLArray.push(tSQL99_Buyer);

            let sqlStrBuyerTeam = `
                delete from KCD_BUYER_TEAM_INFO
                where
                    BUYER_CD = '${args.datas.BUYER_CD}'
            `;
            const tSQL99_BuyerTeam = prisma.$queryRaw(
                Prisma.raw(sqlStrBuyerTeam),
            );
            tSQLArray.push(tSQL99_BuyerTeam);

            let sqlStrFileInfo = `
                delete from KCD_FILEINFO
                where
                    FILE_KEY = '${args.datas.BUYER_CD}'
            `;
            const tSQL99_FileInfo = prisma.$queryRaw(
                Prisma.raw(sqlStrFileInfo),
            );
            tSQLArray.push(tSQL99_FileInfo);

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
                let tRetArray: any[] = [];
                var tObj: ObjType = {
                    CODE: '',
                    id: 0,
                };
                tObj.CODE = 'SUCCESS:Delete Buyer';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            } catch (e) {
                let tRetArray: any[] = [];
                var tObj: ObjType = {
                    CODE: '',
                    id: 0,
                };
                tObj.CODE = 'ERROR:Delete Buyer';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },
    },
};

export default moduleMutation_S0113_BUYER_5;
