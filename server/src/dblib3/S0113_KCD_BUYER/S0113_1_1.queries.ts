import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기

// export default로 Query 내용 내보내기
const moduleQueryS0BVT_S0113_1_1 = {
    Query: {
        mgrQuery_S0113_BUYER_FILE: async (_, args, contextValue) => {
            // const file = `${__dirname}/${tKind}/${tFileName}`;
            // const file = `${tPath}upload/${tKind}/${tFileName}`;

            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            const tCols = __dirname.split('/');
            var tPath0 = '';
            var tIdx = 0;
            for (tIdx = 0; tIdx < tCols.length - 3; tIdx++) {
                tPath0 += tCols[tIdx] + '/';
            }

            const file_1 = `${tPath0}upload/vendor/file1/${args.BUYER_CD}.pdf`;
            const file_2 = `${tPath0}upload/vendor/file2/${args.BUYER_CD}.pdf`;
            const file_3 = `${tPath0}upload/vendor/file3/${args.BUYER_CD}.pdf`;

            interface tObjType {
                id: number;
                file1: string;
                file2: string;
                file3: string;
            }
            var tObj: tObjType = {
                id: 0,
                file1: '',
                file2: '',
                file3: '',
            };
            tObj.id = 1;
            tObj.file1 = 'none';
            tObj.file2 = 'none';
            tObj.file3 = 'none';

            if (fs.existsSync(file_1)) {
                tObj.file1 = '거래명세서';
            }
            if (fs.existsSync(file_2)) {
                tObj.file2 = 'LOGO';
            }
            if (fs.existsSync(file_3)) {
                tObj.file3 = '매뉴얼';
            }

            return tObj;
        },
        mgrQuery_S0113_BUYER_TEAMINFO: async (_, args) => {
            var tArray = [
                {
                    FACTORY: '서울',
                    TEAM: '제1담당자',
                    USER_ID: '',
                    USER_NAME: '',
                    BUYER_CD: '',
                },
                {
                    FACTORY: '서울',
                    TEAM: '제2담당자',
                    USER_ID: '',
                    USER_NAME: '',
                    BUYER_CD: '',
                },
                {
                    FACTORY: '서울',
                    TEAM: '제3담당자',
                    USER_ID: '',
                    USER_NAME: '',
                    BUYER_CD: '',
                },
                {
                    FACTORY: '서울',
                    TEAM: '제4담당자',
                    USER_ID: '',
                    USER_NAME: '',
                    BUYER_CD: '',
                },
                {
                    FACTORY: '서울',
                    TEAM: '담당팀장',
                    USER_ID: '',
                    USER_NAME: '',
                    BUYER_CD: '',
                },
                {
                    FACTORY: '서울',
                    TEAM: 'SMRP',
                    USER_ID: '',
                    USER_NAME: '',
                    BUYER_CD: '',
                },
                {
                    FACTORY: '서울',
                    TEAM: 'SMC',
                    USER_ID: '',
                    USER_NAME: '',
                    BUYER_CD: '',
                },
                {
                    FACTORY: '서울',
                    TEAM: 'SMC1',
                    USER_ID: '',
                    USER_NAME: '',
                    BUYER_CD: '',
                },
                {
                    FACTORY: 'BVT',
                    TEAM: '제1MD',
                    USER_ID: '',
                    USER_NAME: '',
                    BUYER_CD: '',
                },
                {
                    FACTORY: 'BVT',
                    TEAM: '제2MD',
                    USER_ID: '',
                    USER_NAME: '',
                    BUYER_CD: '',
                },
                {
                    FACTORY: 'BVT',
                    TEAM: '제3MD',
                    USER_ID: '',
                    USER_NAME: '',
                    BUYER_CD: '',
                },
                {
                    FACTORY: 'BVT',
                    TEAM: '제4MD',
                    USER_ID: '',
                    USER_NAME: '',
                    BUYER_CD: '',
                },
                {
                    FACTORY: 'BVT',
                    TEAM: 'MRP',
                    USER_ID: '',
                    USER_NAME: '',
                    BUYER_CD: '',
                },
                {
                    FACTORY: 'BVT',
                    TEAM: 'PUR',
                    USER_ID: '',
                    USER_NAME: '',
                    BUYER_CD: '',
                },
                {
                    FACTORY: 'BVT',
                    TEAM: 'PUR1',
                    USER_ID: '',
                    USER_NAME: '',
                    BUYER_CD: '',
                },
                {
                    FACTORY: 'BVT',
                    TEAM: 'MC',
                    USER_ID: '',
                    USER_NAME: '',
                    BUYER_CD: '',
                },
                {
                    FACTORY: 'BVT',
                    TEAM: 'TRADE',
                    USER_ID: '',
                    USER_NAME: '',
                    BUYER_CD: '',
                },
                {
                    FACTORY: 'ETP',
                    TEAM: '제1MD',
                    USER_ID: '',
                    USER_NAME: '',
                    BUYER_CD: '',
                },
                {
                    FACTORY: 'ETP',
                    TEAM: '제2MD',
                    USER_ID: '',
                    USER_NAME: '',
                    BUYER_CD: '',
                },
                {
                    FACTORY: 'ETP',
                    TEAM: '제3MD',
                    USER_ID: '',
                    USER_NAME: '',
                    BUYER_CD: '',
                },
                {
                    FACTORY: 'ETP',
                    TEAM: '제4MD',
                    USER_ID: '',
                    USER_NAME: '',
                    BUYER_CD: '',
                },
                {
                    FACTORY: 'ETP',
                    TEAM: 'MRP',
                    USER_ID: '',
                    USER_NAME: '',
                    BUYER_CD: '',
                },
                {
                    FACTORY: 'ETP',
                    TEAM: 'PUR',
                    USER_ID: '',
                    USER_NAME: '',
                    BUYER_CD: '',
                },
                {
                    FACTORY: 'ETP',
                    TEAM: 'MC',
                    USER_ID: '',
                    USER_NAME: '',
                    BUYER_CD: '',
                },
                {
                    FACTORY: 'ETP',
                    TEAM: 'TRADE',
                    USER_ID: '',
                    USER_NAME: '',
                    BUYER_CD: '',
                },
            ];

            let sqlStr = `
                select
                    a.USER_ID,
                    a.FACTORY,
                    a.TEAM,
                    b.USER_NAME
                from
                    kcd_buyer_team_info a,
                    kcd_user b
                where
                    a.buyer_cd = '${args.BUYER_CD}'
                    and a.user_id = b.user_id
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            var tRetArray = [];
            if (tRet.length > 0) {
                tArray.forEach((col, i) => {
                    var tObj = {
                        ...col,
                    };

                    tRet.forEach((col, i) => {
                        var currentRow = {
                            ...col,
                        };
                        if (
                            tObj.FACTORY == currentRow.FACTORY &&
                            tObj.TEAM == currentRow.TEAM
                        ) {
                            if (currentRow.USER_ID) {
                                tObj.USER_ID = currentRow.USER_ID;
                                tObj.USER_NAME = currentRow.USER_NAME;
                            }
                        }
                    });

                    tRetArray.push(tObj);
                });
            } else {
                tArray.forEach((col, i) => {
                    var tObj = {
                        ...col,
                    };
                    tObj.USER_NAME = '';
                    tObj.BUYER_CD = args.BUYER_CD;
                    tRetArray.push(tObj);
                });
            }

            return tRetArray;
        },
        mgrQuery_S0113_BUYER_FILEINFO: async (_, args) => {
            let sqlStr = `
                select
                    *
                from
                    kcd_fileinfo
                where
                    file_key = '${args.BUYER_CD}'
                order by
                    id
            `;
            let fileList = await prisma.$queryRaw(Prisma.raw(sqlStr));

            return fileList;

            // const tCols = __dirname.split('/');
            // var tPath0 = '';
            // var tIdx = 0;
            // for (tIdx = 0; tIdx < tCols.length - 3; tIdx++) {
            //   tPath0 += tCols[tIdx] + '/';
            // }

            // var tFileName = `${tPath0}upload/file_info_buyer_${args.BUYER_CD}.json`;
            // if (fs.existsSync(tFileName)) {
            //   var tDatas = JSON.parse(fs.readFileSync(tFileName).toString());
            //   var tArray = tDatas.map((col, i) => {
            //     var tObj = { ...col };
            //     tObj.id = i + 1;
            //     return (tObj);
            //   });
            //   return (tArray);
            // } else {
            //   return ([]);
            // }
        },
        mgrQuery_S0113_BUYER_CREDIT_RATING: async (_, args) => {
            var tObj = {};
            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_BUYER_CREDIT_RATING
                WHERE
                    BUYER_CD = '${args.BUYER_CD}'
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            return tRet;
        },
        mgrQuery_S0113_BUYER_BANK: async (_, args) => {
            var tObj = {};
            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_BANK
                WHERE
                    BANK_CD = '${args.BANK_CD}'
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            return tRet;
        },
        mgrQuery_S0113_BUYER_USER: async (_, args) => {
            var tObj = {};
            let sqlStr = `
                SELECT
                    A.*,
                    B.CD_NAME,
                    A.USER_NAME + '(' + A.USER_ID + ')' AS USER_ID_NAME
                FROM
                    KCD_USER A,
                    KCD_CODE B
                WHERE
                    A.PART = B.CD_CODE
                    AND B.CD_GROUP = 'part'
                ORDER BY
                    A.USER_NAME
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.USER_ID = '';
            tObj.USER_NAME = ' ';
            tRet.unshift(tObj);
            return tRet;
        },

        mgrQuery_S0113_BUYER: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = await AFLib.getUserInfoSync(contextValue);

            // console.log(tUserInfo);

            var tStr = '';
            if (args.data.COMPANY_NAME === '') {
                tStr = `             AND (COMPANY_NAME is null or COMPANY_NAME like '%%')  `;
            } else {
                tStr = `             AND (COMPANY_NAME like '%${args.data.COMPANY_NAME}%')  `;
            }

            var tObj = {};
            let sqlStr = `
                SELECT
                    A10.*
                FROM
                    (
                        SELECT
                            A.*,
                            C.CD_NAME AS STATUS_NAME,
                            C1.CD_NAME AS BUYER_TYPE_NAME,
                            C2.CD_NAME AS BUYER_TEAM_NAME,
                            C4.NAT_NAME AS NAT_NAME,
                            isnull(C5.REMARK, '') as REMARK,
                            isnull(C6.BANK_NAME, '') + '(' + isnull(C6.ACCOUNT_NO, '') + ')' as BANK_NAME,
                            C6.ACCOUNT_NAME AS ACCOUNT_NAME,
                            C6.ACCOUNT_NO AS ACCOUNT_NO,
                            isnull(C5.REMARK, '') as PAY_RULE_NAME
                        FROM
                            (
                                SELECT
                                    isnull(BUYER_TEAM, '') as BUYER_TEAM,
                                    isnull(NAT_CD, '') as NAT_CD,
                                    isnull(STATUS_CD, '') as STATUS_CD,
                                    isnull(BANK_CD, '') as BANK_CD,
                                    isnull(NEOE_A23, '') as NEOE_A23,
                                    isnull(BUYER_TYPE, '') as BUYER_TYPE,
                                    isnull(CREDIT_CURR, '') as CREDIT_CURR,
                                    BUYER_CD,
                                    BUYER_NAME,
                                    BUYER_ABBR,
                                    SHINTS_USER,
                                    USER_NAME,
                                    EMAIL,
                                    TEL_NO,
                                    FAX_NO,
                                    ZIP_NO,
                                    ADDR1,
                                    ADDR2,
                                    COMM_FLAG,
                                    SALES_TEAM,
                                    STS_FLAG,
                                    BVT_FLAG,
                                    REG_USER,
                                    REG_DATETIME,
                                    UPD_USER,
                                    UPD_DATETIME,
                                    NEOE_BUYER_CD_MOM,
                                    NEOE_BUYER_CD,
                                    isnull(loss_flag, '') as loss_flag,
                                    isnull(glove_flag, '') as glove_flag,
                                    MOM_CD,
                                    isnull(PAY_RULE, '') as PAY_RULE,
                                    id,
                                    SHIP_ADDR1,
                                    SHIP_ADDR2,
                                    SHIP_ADDR3,
                                    COMPANY_NAME,
                                    CREDIT_AMOUNT,
                                    CREDIT_AMT,
                                    isnull(TOLERANCE, '') as TOLERANCE,
                                    CREDIT_DATE,
                                    REPRESENTATIVE
                                FROM
                                    KCD_BUYER
                                WHERE
                                    id > 0
                                    -- and reg_user in (select distinct user_id from kcd_user where company_code = '${tUserInfo.COMPANY_CODE}')
                                    AND BUYER_CD like '%${args.data.BUYER_CD}%'
                                    AND BUYER_NAME like '%${args.data.BUYER_NAME}%' ${tStr}
                                    AND STATUS_CD like '%${args.data.STATUS_CD}%'
                                    -- ORDER BY id desc 
                                    -- offset 0 rows fetch next 1000 rows only 
                            ) A
                            LEFT JOIN KCD_CODE C ON C.CD_CODE = A.STATUS_CD
                            AND C.CD_GROUP = 'STATUS_CD'
                            LEFT JOIN KCD_CODE C1 ON C1.CD_CODE = A.BUYER_TYPE
                            AND C1.CD_GROUP = 'BUYER_TYPE'
                            LEFT JOIN KCD_CODE C2 ON C2.CD_CODE = A.BUYER_TEAM
                            AND C2.CD_GROUP = 'BUYER_TEAM'
                            LEFT JOIN KCD_NATION C4 ON C4.NAT_CD = A.NAT_CD
                            LEFT JOIN KCD_PAY_RULE C5 ON C5.CD_CODE = A.PAY_RULE
                            LEFT JOIN KCD_BANK C6 ON C6.BANK_CD = A.BANK_CD
                            -- LEFT JOIN KCD_CODE C7 ON C7.CD_CODE = A.PAY_RULE AND C7.CD_GROUP = 'PAY_TYPE'
                    ) A10
                    -- ORDER BY id desc 
                    -- offset 0 rows fetch next 1000 rows only
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            //console.log(tRet);
            var tArray = tRet.map((col, i) => {
                var tObj = {
                    ...col,
                };
                if (tObj.SHIP_ADDR1 === null) tObj.SHIP_ADDR1 = '';
                if (tObj.SHIP_ADDR2 === null) tObj.SHIP_ADDR2 = '';
                if (tObj.SHIP_ADDR3 === null) tObj.SHIP_ADDR3 = '';
                if (tObj.COMPANY_NAME === null) tObj.COMPANY_NAME = '';
                if (tObj.CREDIT_AMT === null) tObj.CREDIT_AMT = '0';
                if (tObj.CREDIT_CURR === null) tObj.CREDIT_CURR = '';
                if (tObj.CREDIT_DATE === null) tObj.CREDIT_DATE = '';
                if (tObj.TOLERANCE === null) tObj.TOLERANCE = '';
                if (tObj.REPRESENTATIVE === null) tObj.REPRESENTATIVE = '';
                if (tObj.TOLERANCE === ' ') tObj.TOLERANCE = '';
                return tObj;
            });

            return tArray;
        },
        mgrQuery_S0113_CODE: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = await AFLib.getUserInfoSync(contextValue);

            try {
                interface TWObjType {
                    T_KCD_BUYER_LOSS_FLAG: any;
                    T_KCD_BUYER_STATUS_CD: any;
                    T_KCD_BUYER_BUYER_TYPE: any;
                    T_KCD_BUYER_BUYER_TEAM: any;
                    T_KCD_BUYER_BUYER_TEAM_NEOE: any;
                    T_KCD_BUYER_NAT_CD: any;
                    T_KCD_BUYER_PAY_RULE: any;
                    T_KCD_BUYER_BANK_CD: any;
                    T_KCD_BUYER_CREDIT: any;
                    T_KCD_BUYER_CREDIT_CURR: any;
                    T_KCD_BUYER_TOLERANCE: any;
                }
                var tWObj: TWObjType = {
                    T_KCD_BUYER_LOSS_FLAG: undefined,
                    T_KCD_BUYER_STATUS_CD: undefined,
                    T_KCD_BUYER_BUYER_TYPE: undefined,
                    T_KCD_BUYER_BUYER_TEAM: undefined,
                    T_KCD_BUYER_BUYER_TEAM_NEOE: undefined,
                    T_KCD_BUYER_NAT_CD: undefined,
                    T_KCD_BUYER_PAY_RULE: undefined,
                    T_KCD_BUYER_BANK_CD: undefined,
                    T_KCD_BUYER_CREDIT: undefined,
                    T_KCD_BUYER_CREDIT_CURR: undefined,
                    T_KCD_BUYER_TOLERANCE: undefined,
                };

                //T_KCD_BUYER_LOSS_FLAG
                let sqlStr_T_KCD_BUYER_LOSS_FLAG = `
                    SELECT
                        *
                    FROM
                        KCD_CODE
                    WHERE
                        CD_GROUP = 'LOSS_FLAG'
                `;
                let tRet_T_KCD_BUYER_LOSS_FLAG = await prisma.$queryRaw(
                    Prisma.raw(sqlStr_T_KCD_BUYER_LOSS_FLAG),
                );
                interface ObjType {
                    CD_CODE: string;
                    CD_NAME: string;
                }
                var tObj: ObjType = {
                    CD_CODE: '',
                    CD_NAME: '',
                };
                tObj.CD_CODE = '';
                tObj.CD_NAME = ' ';
                tRet_T_KCD_BUYER_LOSS_FLAG.unshift(tObj);
                tWObj.T_KCD_BUYER_LOSS_FLAG = tRet_T_KCD_BUYER_LOSS_FLAG;

                //T_KCD_BUYER_STATUS_CD
                let sqlStr_T_KCD_BUYER_STATUS_CD = `
                    SELECT
                        *
                    FROM
                        KCD_CODE
                    WHERE
                        CD_GROUP = 'STATUS_CD'
                `;
                let tRet_T_KCD_BUYER_STATUS_CD = await prisma.$queryRaw(
                    Prisma.raw(sqlStr_T_KCD_BUYER_STATUS_CD),
                );
                var tObj: ObjType = {
                    CD_CODE: '',
                    CD_NAME: '',
                };
                tObj.CD_CODE = '';
                tObj.CD_NAME = ' ';
                tRet_T_KCD_BUYER_STATUS_CD.unshift(tObj);
                tWObj.T_KCD_BUYER_STATUS_CD = tRet_T_KCD_BUYER_STATUS_CD;

                //T_KCD_BUYER_BUYER_TYPE
                let sqlStr_T_KCD_BUYER_BUYER_TYPE = `
                    SELECT
                        *
                    FROM
                        KCD_CODE
                    WHERE
                        CD_GROUP = 'BUYER_TYPE'
                `;
                let tRet_T_KCD_BUYER_BUYER_TYPE = await prisma.$queryRaw(
                    Prisma.raw(sqlStr_T_KCD_BUYER_BUYER_TYPE),
                );
                var tObj: ObjType = {
                    CD_CODE: '',
                    CD_NAME: '',
                };
                tObj.CD_CODE = '';
                tObj.CD_NAME = ' ';
                tRet_T_KCD_BUYER_BUYER_TYPE.unshift(tObj);
                tWObj.T_KCD_BUYER_BUYER_TYPE = tRet_T_KCD_BUYER_BUYER_TYPE;

                //T_KCD_BUYER_BUYER_TEAM
                let sqlStr_T_KCD_BUYER_BUYER_TEAM = '';
                let tRet_T_KCD_BUYER_BUYER_TEAM = [];

                sqlStr_T_KCD_BUYER_BUYER_TEAM = `
                    SELECT
                        *
                    FROM
                        KCD_CODE
                    WHERE
                        CD_GROUP = 'BUYER_TEAM'
                        and cd_name in (
                            '내수영업팀',
                            '경영지원본부',
                            'NSR',
                            'Sales1',
                            'Sales2',
                            'Sales3',
                            'Sales4',
                            'Sales5',
                            '브랜드개발팀'
                        )
                `;
                tRet_T_KCD_BUYER_BUYER_TEAM = await prisma.$queryRaw(
                    Prisma.raw(sqlStr_T_KCD_BUYER_BUYER_TEAM),
                );

                var tObj: ObjType = {
                    CD_CODE: '',
                    CD_NAME: '',
                };
                tObj.CD_CODE = '';
                tObj.CD_NAME = ' ';
                tRet_T_KCD_BUYER_BUYER_TEAM.unshift(tObj);
                tWObj.T_KCD_BUYER_BUYER_TEAM = tRet_T_KCD_BUYER_BUYER_TEAM;

                //T_KCD_BUYER_BUYER_TEAM_NEOE
                let sqlStr_T_KCD_BUYER_BUYER_TEAM_NEOE = `
                    SELECT
                        *
                    FROM
                        KCD_CODE
                    WHERE
                        CD_GROUP = 'BUYER_TEAM_NEOE'
                `;
                let tRet_T_KCD_BUYER_BUYER_TEAM_NEOE = await prisma.$queryRaw(
                    Prisma.raw(sqlStr_T_KCD_BUYER_BUYER_TEAM_NEOE),
                );
                var tObj: ObjType = {
                    CD_CODE: '',
                    CD_NAME: '',
                };
                tObj.CD_CODE = '';
                tObj.CD_NAME = ' ';
                tRet_T_KCD_BUYER_BUYER_TEAM_NEOE.unshift(tObj);
                tWObj.T_KCD_BUYER_BUYER_TEAM_NEOE =
                    tRet_T_KCD_BUYER_BUYER_TEAM_NEOE;

                //T_KCD_BUYER_NAT_CD
                let sqlStr_T_KCD_BUYER_NAT_CD = `
                    SELECT
                        *
                    FROM
                        KCD_NATION
                `;
                let tRet_T_KCD_BUYER_NAT_CD = await prisma.$queryRaw(
                    Prisma.raw(sqlStr_T_KCD_BUYER_NAT_CD),
                );
                interface ObjTypeNat {
                    NAT_CD: string;
                    NAT_NAME: string;
                }
                var tObjNat: ObjTypeNat = {
                    NAT_CD: '',
                    NAT_NAME: '',
                };
                tObjNat.NAT_CD = '';
                tObjNat.NAT_NAME = ' ';
                tRet_T_KCD_BUYER_NAT_CD.unshift(tObjNat);
                tWObj.T_KCD_BUYER_NAT_CD = tRet_T_KCD_BUYER_NAT_CD;

                //T_KCD_BUYER_PAY_RULE
                let sqlStr_T_KCD_BUYER_PAY_RULE = `
                    SELECT
                        *
                    FROM
                        KCD_PAY_RULE
                `;
                let tRet_T_KCD_BUYER_PAY_RULE0 = await prisma.$queryRaw(
                    Prisma.raw(sqlStr_T_KCD_BUYER_PAY_RULE),
                );
                interface ObjTypePayRule {
                    CD_CODE: string;
                    CD_NAME: string;
                }
                var tObjPayRule: ObjTypePayRule = {
                    CD_CODE: '',
                    CD_NAME: ' ',
                };
                tObjPayRule.CD_CODE = '';
                tObjPayRule.CD_NAME = ' ';

                var tArray = [];
                tRet_T_KCD_BUYER_PAY_RULE0.forEach((col, i) => {
                    var tObj = {
                        ...col,
                    };
                    tObj.CD_CODE = String(col.CD_CODE);
                    tObj.CD_NAME = col.REMARK;
                    tArray.push(tObj);
                });
                let tRet_T_KCD_BUYER_PAY_RULE = [...tArray];
                tRet_T_KCD_BUYER_PAY_RULE.unshift(tObjPayRule);
                tWObj.T_KCD_BUYER_PAY_RULE = tRet_T_KCD_BUYER_PAY_RULE;

                //T_KCD_BUYER_BANK_CD
                let sqlStr_T_KCD_BUYER_BANK_CD = `
                    SELECT
                        BANK_CD,
                        isnull(BANK_NAME, '') + '(' + isnull(ACCOUNT_NO, '') + ')' as BANK_NAME
                    FROM
                        KCD_BANK
                    WHERE
                        ACCOUNT_NAME like '%SHIN TEXTILE%' OR
                        ACCOUNT_NAME like '%신티에스%' 
                `;
                let tRet_T_KCD_BUYER_BANK_CD = await prisma.$queryRaw(
                    Prisma.raw(sqlStr_T_KCD_BUYER_BANK_CD),
                );
                interface ObjTypeBank {
                    BANK_CD: string;
                    BANK_NAME: string;
                }
                var tObjBank: ObjTypeBank = {
                    BANK_CD: '',
                    BANK_NAME: '',
                };
                tObjBank.BANK_CD = '';
                tObjBank.BANK_NAME = ' ';
                tRet_T_KCD_BUYER_BANK_CD.unshift(tObjBank);
                tWObj.T_KCD_BUYER_BANK_CD = tRet_T_KCD_BUYER_BANK_CD;

                //T_KCD_BUYER_CREDIT
                var tArray0 = ['A', 'B', 'C', 'D', 'F', 'G', 'R', 'KR'];
                var tRet_T_KCD_BUYER_CREDIT = tArray0.map((col, i) => {
                    var tObj0: ObjType = {
                        CD_CODE: '',
                        CD_NAME: '',
                    };
                    tObj0.CD_CODE = col;
                    tObj0.CD_NAME = col;
                    return tObj0;
                });
                var tObj: ObjType = {
                    CD_CODE: '',
                    CD_NAME: '',
                };
                tObj.CD_CODE = '';
                tObj.CD_NAME = ' ';
                tRet_T_KCD_BUYER_CREDIT.unshift(tObj);
                tWObj.T_KCD_BUYER_CREDIT = tRet_T_KCD_BUYER_CREDIT;

                let sqlStr_TOLENCE = `
                    select
                        *
                    from
                        kcd_code
                    where
                        cd_group = 'PI_REMARK'
                        and cd_code in ('41', '42', '43', '44')
                `;
                let tRet_TOLENCE = await prisma.$queryRaw(
                    Prisma.raw(sqlStr_TOLENCE),
                );
                var tObj: ObjType = {
                    CD_CODE: '',
                    CD_NAME: '',
                };
                tObj.CD_CODE = '';
                tObj.CD_NAME = ' ';
                tRet_TOLENCE.unshift(tObj);
                tWObj.T_KCD_BUYER_TOLERANCE = tRet_TOLENCE;

                //T_KCD_BUYER_CREDIT_CURR
                let sqlStr = `
                    SELECT
                        *
                    FROM
                        KCD_CODE
                    WHERE
                        CD_GROUP = 'CURR_CD'
                        and CD_CODE = 'USD'
                        or CD_CODE = 'KRW'
                `;
                let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
                var tObj: ObjType = {
                    CD_CODE: '',
                    CD_NAME: '',
                };
                tObj.CD_CODE = '';
                tObj.CD_NAME = ' ';
                tRet.unshift(tObj);
                tWObj.T_KCD_BUYER_CREDIT_CURR = tRet;

                //console.log(tWObj.T_KCD_BUYER_TOLENCE);
                return tWObj;
            } catch (err) {
                console.log(err);
            }
        },
    },
};

export default moduleQueryS0BVT_S0113_1_1;
