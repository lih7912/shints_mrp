// MGR_@@TNAME@@.mutations.js

import * as fs from 'fs';
import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기

// export default로 Mutation 내용 내보내기
const moduleMutation_S0114_KCD_SUPPLIER_EDT_KCD_VENDOR = {
    Mutation: {
        mgrInsert_S0114_KCD_VENDOR_SAVE: async (_, args, contextValue) => {
            //
            console.log(args);
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
            // let tPO = "POA2022S672";

            var tUserInfo: any = AFLib.getUserInfo(contextValue);

            let tKCD_VENDOR = args.datas;
            let tId = tKCD_VENDOR.id;

            var tChkRegNo = tKCD_VENDOR.REG_NO.replace(/-/gi, '');
            tChkRegNo = tChkRegNo.replace(/_/gi, '');
            tChkRegNo = tChkRegNo.replace(/ /gi, '');
            var sql0 = `
                select
                    *
                from
                    kcd_vendor
                where
                    chk_reg_no = '${tChkRegNo}'
            `;
            var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            if (tRet0.length > 0 && tKCD_VENDOR.VENDOR_CD !== '') {
                var tFlag1 = 0;
                tRet0.forEach((col, i) => {
                    if (col.VENDOR_CD === tKCD_VENDOR.VENDOR_CD) tFlag1 = 1;
                });

                if (tFlag1 === 0) {
                    let tRetArray: any[] = [];
                    let tObj = {
                        CODE: '',
                        id: 0,
                    };
                    tObj.CODE = 'ERROR: Dulication Reg No: ';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }
            }

            var sqlStr = `
                SELECT
                    max(VENDOR_CD) as max_id
                from
                    KCD_VENDOR
                where
                    VENDOR_CD like 'E%'
                    and VENDOR_CD <> 'ENaN'
                    and VENDOR_CD <> 'E-ETP'
                    and VENDOR_CD <> 'E-BVT'
                    and len(VENDOR_CD) >= 5
            `;

            var sqlStr1 = `
                SELECT
                    max(VENDOR_CD) as max_id
                from
                    KCD_VENDOR
                where
                    VENDOR_CD like 'V%'
                    and VENDOR_CD <> 'VNaN'
                    and VENDOR_CD <> 'V-ETP'
                    and VENDOR_CD <> 'V-BVT'
                    and len(VENDOR_CD) >= 5
            `;

            let tRetArray = [];
            let tPrefix = '';
            if (tKCD_VENDOR.VENDOR_TYPE === '7') {
                tPrefix = 'E';
                tRetArray = await prisma.$queryRaw(Prisma.raw(sqlStr));
            } else {
                tPrefix = 'V';
                tRetArray = await prisma.$queryRaw(Prisma.raw(sqlStr1));
            }
            let tMax0: any = tRetArray[0];

            let tMax = String(parseInt(tMax0.max_id.substring(1)) + 1);
            var tZero = '0000';
            var tMaxStr = tZero.substring(0, 4 - tMax.length) + tMax;
            let tNewVendorCd = tPrefix + tMaxStr;

            let tPAY_TYPE_CODE = '';
            let tPAY_TYPE = '';
            let tPAY_TERM = '';
            var sqlStr2 = `
                select
                    *
                from
                    kcd_code
                where
                    cd_group = 'pay_type'
                    and cd_name like '%${tKCD_VENDOR.PAY_TYPE}%'
            `;
            var tRet2 = await prisma.$queryRaw(Prisma.raw(sqlStr2));
            if (tRet2.length > 0) {
                tPAY_TYPE_CODE = tRet2[0].CD_CODE;
                tPAY_TYPE = tRet2[0].CD_NAME;
                tPAY_TERM = parseFloat(tRet2[0].ETC3).toFixed(0);
            }

            let tObjKCD_VENDOR = {
                VENDOR_CD: tNewVendorCd,
                VENDOR_NAME: tKCD_VENDOR.VENDOR_NAME,
                INVOICE_NAME: tKCD_VENDOR.INVOICE_NAME,
                VENDOR_TYPE: tKCD_VENDOR.VENDOR_TYPE,
                VENDOR_MATL_TYPE: tKCD_VENDOR.VENDOR_MATL_TYPE,
                GW_STATUS: tKCD_VENDOR.GW_STATUS,
                REG_NO: tKCD_VENDOR.REG_NO,
                CHK_REG_NO: tChkRegNo,
                PRESIDENT: tKCD_VENDOR.PRESIDENT,
                USER_NAME: tKCD_VENDOR.USER_NAME,
                PART: tKCD_VENDOR.PART,
                RANK: tKCD_VENDOR.RANK,
                EMAIL: tKCD_VENDOR.EMAIL,
                TEL_NO: tKCD_VENDOR.TEL_NO,
                FAX_NO: tKCD_VENDOR.FAX_NO,
                PAY_TYPE: tKCD_VENDOR.PAY_TYPE,
                PAY_TYPE2: tPAY_TYPE_CODE,
                PAY_TERM: tPAY_TERM,
                NAT_CD: tKCD_VENDOR.NAT_CD,
                ZIP_NO: tKCD_VENDOR.ZIP_NO,
                ADDR1: tKCD_VENDOR.ADDR1,
                ADDR2: tKCD_VENDOR.ADDR2,
                STATUS_CD: tKCD_VENDOR.STATUS_CD,
                REG_USER: tUserInfo.USER_ID,
                REG_DATETIME: tRetDate,
                PERMIT: tKCD_VENDOR.PERMIT,
                LEAD_TIME: tKCD_VENDOR.LEAD_TIME,
                REMARK: tKCD_VENDOR.REMARK,
                APPROKEY: tKCD_VENDOR.APPROKEY,
                NEOE_NO: tKCD_VENDOR.NEOE_NO,
                OVERSHORT_RATE: tKCD_VENDOR.OVERSHORT_RATE,
                NSR_TR_CD: tKCD_VENDOR.NSR_TR_CD,
            };

            if (tKCD_VENDOR.VENDOR_CD === '') {
                let tSQLArray: any[] = [];

                let sqlStr = `
                    INSERT INTO
                        KCD_VENDOR (
                            VENDOR_CD,
                            VENDOR_NAME,
                            INVOICE_NAME,
                            VENDOR_TYPE,
                            VENDOR_MATL_TYPE,
                            REG_NO,
                            CHK_REG_NO,
                            PRESIDENT,
                            USER_NAME,
                            PART,
                            RANK,
                            EMAIL,
                            TEL_NO,
                            FAX_NO,
                            PAY_TYPE,
                            PAY_TYPE2,
                            PAY_TERM,
                            NAT_CD,
                            ZIP_NO,
                            ADDR1,
                            ADDR2,
                            STATUS_CD,
                            REG_USER,
                            REG_DATETIME,
                            PERMIT,
                            LEAD_TIME,
                            REMARK,
                            APPROKEY,
                            NEOE_NO,
                            OVERSHORT_RATE,
                            NSR_TR_CD
                        )
                    VALUES
                        (
                            '${tObjKCD_VENDOR.VENDOR_CD}',
                            '${tObjKCD_VENDOR.VENDOR_NAME}',
                            '${tObjKCD_VENDOR.INVOICE_NAME}',
                            '${tObjKCD_VENDOR.VENDOR_TYPE}',
                            '${tObjKCD_VENDOR.VENDOR_MATL_TYPE}',
                            '${tObjKCD_VENDOR.REG_NO}',
                            '${tChkRegNo}',
                            '${tObjKCD_VENDOR.PRESIDENT}',
                            '${tObjKCD_VENDOR.USER_NAME}',
                            '${tObjKCD_VENDOR.PART}',
                            '${tObjKCD_VENDOR.RANK}',
                            '${tObjKCD_VENDOR.EMAIL}',
                            '${tObjKCD_VENDOR.TEL_NO}',
                            '${tObjKCD_VENDOR.FAX_NO}',
                            '${tObjKCD_VENDOR.PAY_TYPE}',
                            '${tObjKCD_VENDOR.PAY_TYPE2}',
                            '${tObjKCD_VENDOR.PAY_TERM}',
                            '${tObjKCD_VENDOR.NAT_CD}',
                            '${tObjKCD_VENDOR.ZIP_NO}',
                            '${tObjKCD_VENDOR.ADDR1}',
                            '${tObjKCD_VENDOR.ADDR2}',
                            '0',
                            '${tObjKCD_VENDOR.REG_USER}',
                            '${tObjKCD_VENDOR.REG_DATETIME}',
                            '${tObjKCD_VENDOR.PERMIT}',
                            '${tObjKCD_VENDOR.LEAD_TIME}',
                            '${tObjKCD_VENDOR.REMARK}',
                            '${tObjKCD_VENDOR.APPROKEY}',
                            '${tObjKCD_VENDOR.NEOE_NO}',
                            '${tObjKCD_VENDOR.OVERSHORT_RATE}',
                            '${tObjKCD_VENDOR.NSR_TR_CD}'
                        )
                `;
                let retInsert = prisma.$queryRaw(Prisma.raw(sqlStr));
                tSQLArray.push(retInsert);

                let imgUpdSQL = '';

                // if(tKCD_VENDOR.imgURL != undefined){
                if (tKCD_VENDOR.fileName !== '' && tKCD_VENDOR.imgURL !== '') {
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
                                'VENDOR',
                                '${tObjKCD_VENDOR.VENDOR_CD}',
                                '${tKCD_VENDOR.fileName}',
                                '${tKCD_VENDOR.imgURL}',
                                '${tKCD_VENDOR.objectName}',
                                '${tRetDate}'
                            )
                    `;
                    const imgSaveSQL_1 = prisma.$queryRaw(
                        Prisma.raw(imgUpdSQL),
                    );
                    tSQLArray.push(imgSaveSQL_1);
                }

                try {
                    global.currentTransactionInfo = {
                        contextValue: contextValue,
                        functionName: AFLib.getFunctionName(),
                    };
                    await prisma.$transaction(tSQLArray);
                    delete global.currentTransactionInfo;
                    let tRetArray: any[] = [];
                    let tObj = {
                        CODE: '',
                        id: 0,
                    };
                    tObj.CODE = 'SUCCEED:  Vendor Insert ';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                } catch (err) {
                    let tRetArray: any[] = [];
                    let tObj = {
                        CODE: '',
                        id: 0,
                    };
                    tObj.CODE = 'ERROR: Vendor Insert:';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }
            } else {
                let tSQLArray: any[] = [];
                const vendorCD = tKCD_VENDOR.VENDOR_CD;
                let sqlStr = `
                    UPDATE KCD_VENDOR
                    SET
                        VENDOR_NAME = '${tKCD_VENDOR.VENDOR_NAME}',
                        PRESIDENT = '${tKCD_VENDOR.PRESIDENT}',
                        VENDOR_TYPE = '${tKCD_VENDOR.VENDOR_TYPE}',
                        VENDOR_MATL_TYPE = '${tKCD_VENDOR.VENDOR_MATL_TYPE}',
                        PAY_TYPE = '${tObjKCD_VENDOR.PAY_TYPE}',
                        PAY_TYPE2 = '${tObjKCD_VENDOR.PAY_TYPE2}',
                        PAY_TERM = '${tObjKCD_VENDOR.PAY_TERM}',
                        INVOICE_NAME = '${tKCD_VENDOR.INVOICE_NAME}',
                        REG_NO = '${tKCD_VENDOR.REG_NO}',
                        CHK_REG_NO = '${tChkRegNo}',
                        TEL_NO = '${tKCD_VENDOR.TEL_NO}',
                        UPD_DATETIME = '${tRetDate}',
                        UPD_USER = '${tUserInfo.USER_ID}',
                        USER_NAME = '${tKCD_VENDOR.USER_NAME}',
                        PART = '${tKCD_VENDOR.PART}',
                        RANK = '${tKCD_VENDOR.RANK}',
                        EMAIL = '${tKCD_VENDOR.EMAIL}',
                        FAX_NO = '${tKCD_VENDOR.FAX_NO}',
                        NAT_CD = '${tKCD_VENDOR.NAT_CD}',
                        ZIP_NO = '${tKCD_VENDOR.ZIP_NO}',
                        ADDR1 = '${tKCD_VENDOR.ADDR1}',
                        ADDR2 = '${tKCD_VENDOR.ADDR2}',
                        STATUS_CD = '${tKCD_VENDOR.STATUS_CD}',
                        REG_USER = '${tUserInfo.USER_ID}',
                        PERMIT = '${tKCD_VENDOR.PERMIT}',
                        LEAD_TIME = '${tKCD_VENDOR.LEAD_TIME}',
                        REMARK = '${tKCD_VENDOR.REMARK}',
                        APPROKEY = '${tKCD_VENDOR.APPROKEY}',
                        NEOE_NO = '${tKCD_VENDOR.NEOE_NO}',
                        OVERSHORT_RATE = '${tKCD_VENDOR.OVERSHORT_RATE}',
                        NSR_TR_CD = '${tKCD_VENDOR.NSR_TR_CD}'
                    WHERE
                        VENDOR_CD = '${tKCD_VENDOR.VENDOR_CD}'
                `;

                let retUpdate = prisma.$queryRaw(Prisma.raw(sqlStr));
                console.log(retUpdate);
                tSQLArray.push(retUpdate);

                // File
                let imgUpdSQL = '';
                let checkImgUrl = `
                    select
                        *
                    from
                        kcd_fileinfo
                    where
                        FILE_KEY = '${tKCD_VENDOR.VENDOR_CD}'
                        and KIND = 'VENDOR'
                `;

                let check = await prisma.$queryRaw(Prisma.raw(checkImgUrl));
                console.log(check);

                if (tKCD_VENDOR.imgURL != undefined) {
                    if (check.length > 0) {
                        imgUpdSQL = `
                            update kcd_fileinfo
                            set
                                NAME = '${tKCD_VENDOR.fileName}',
                                URL = '${tKCD_VENDOR.imgURL}',
                                OBJECT_NAME = '${tKCD_VENDOR.objectName}',
                                UPD_DATETIME = '${tRetDate}'
                            where
                                FILE_KEY = '${vendorCD}'
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
                                    'VENDOR',
                                    '${vendorCD}',
                                    '${tKCD_VENDOR.fileName}',
                                    '${tKCD_VENDOR.imgURL}',
                                    '${tKCD_VENDOR.objectName}',
                                    '${tRetDate}'
                                )
                        `;
                    }
                    const imgSaveSQL_1 = prisma.$queryRaw(
                        Prisma.raw(imgUpdSQL),
                    );
                    tSQLArray.push(imgSaveSQL_1);
                }

                try {
                    global.currentTransactionInfo = {
                        contextValue: contextValue,
                        functionName: AFLib.getFunctionName(),
                    };
                    await prisma.$transaction(tSQLArray);
                    delete global.currentTransactionInfo;
                    let tRetArray: any[] = [];
                    let tObj = {
                        CODE: '',
                        id: 0,
                    };
                    tObj.CODE = 'SUCCEED: Vendor Update: ';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                } catch (err) {
                    let tRetArray: any[] = [];
                    let tObj = {
                        CODE: '',
                        id: 0,
                    };
                    tObj.CODE = 'ERROR: Vendor Update: ';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }
            }
        },

        mgrInsert_S0114_KCD_VENDOR_DELETE: async (_, args, contextValue) => {
            const vendor = args.datas;
            let tSQLArray: any[] = [];

            const currentRegisterdMatl: any[] = await prisma.$queryRaw(Prisma.raw(`
                SELECT
                    COUNT(*) AS COUNT
                FROM
                    kcd_matl_mst
                WHERE
                    vendor_cd = '${vendor.VENDOR_CD}'
            `));

            if (Number(currentRegisterdMatl[0].COUNT) > 0) {
                return [
                    {
                        CODE: 'ERROR: Current Registered Material Exist',
                        id: 0,
                    },
                ];
            }

            let deleteSql = prisma.$queryRaw(Prisma.raw(`
                DELETE FROM KCD_VENDOR
                WHERE
                    VENDOR_CD = '${vendor.VENDOR_CD}'
            `));

            tSQLArray.push(deleteSql);

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
                let tRetArray: any[] = [];
                let tObj = {
                    CODE: '',
                    id: 0,
                };
                tObj.CODE = 'SUCCEED: Vendor Delete';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            } catch (err) {
                let tRetArray: any[] = [];
                let tObj = {
                    CODE: '',
                    id: 0,
                };
                tObj.CODE = 'ERROR: Vendor Delete';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },
    },
};

export default moduleMutation_S0114_KCD_SUPPLIER_EDT_KCD_VENDOR;
