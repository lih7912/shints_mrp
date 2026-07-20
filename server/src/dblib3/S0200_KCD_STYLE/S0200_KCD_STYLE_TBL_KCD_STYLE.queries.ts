// MGR_@@TNAME@@.queries.js

import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0200_KCD_STYLE_TBL_KCD_STYLE = {
    Query: {
        mgrQuery_S0200_KCD_STYLE_IMAGE: async (_, args) => {
            var tObj = {};
            tObj.IMAGE_NAME = '';

            const tCols = __dirname.split('/');
            var tPath0 = '';
            var tIdx = 0;
            for (tIdx = 0; tIdx < tCols.length - 3; tIdx++) {
                tPath0 += tCols[tIdx] + '/';
            }
            console.log(tPath0);
            var tPath = `${tPath0}upload/style/${args.STYLE_CD}_1.png`;
            var tPath1 = `${tPath0}upload/style/${args.STYLE_CD}_1.jpg`;

            if (fs.existsSync(tPath)) {
                tObj.IMAGE_NAME = `${args.STYLE_CD}_1.png`;
            } else if (fs.existsSync(tPath1)) {
                tObj.IMAGE_NAME = `${args.STYLE_CD}_1.jpg`;
            }

            var tArray = [];
            tArray.push(tObj);
            return tArray;
        },

        mgrQuery_S0200_KCD_STYLE_CHILD: async (_, args) => {
            var tStr = '';
            if (args.STYLE_NAME !== '') {
                tStr += `AND (A.STYLE_CD  = '${args.STYLE_CD}-DL'  `;
                tStr += `OR   A.STYLE_CD  = '${args.STYLE_CD}-ZL') `;
            }

            var tObj = {};
            let sqlStr = `
                SELECT DISTINCT
                    A1.*,
                    D1.CD_NAME AS BVT_KIND,
                    D.CD_NAME AS STATUS_NAME,
                    E.COLOR_CNT AS COLOR_CNT
                FROM
                    (
                        SELECT
                            TOP 1000 A.*,
                            C.BUYER_NAME
                        FROM
                            KCD_STYLE A,
                            KCD_BUYER C
                        WHERE
                            A.STYLE_CD <> '' ${tStr}
                            AND A.BUYER_CD = C.BUYER_CD
                            -- ORDER BY A.REG_DATETIME desc 
                            -- OFFSET 0 rows FETCH NEXT 1000 rows only
                    ) A1
                    LEFT JOIN KCD_CODE D ON A1.STATUS_CD = D.CD_CODE
                    AND D.CD_GROUP = 'STATUS_CD'
                    LEFT JOIN KCD_CODE D1 ON (
                        A1.BVT_KIND = D1.CD_CODE
                        OR A1.BVT_KIND = D1.CD_NAME
                    )
                    AND D1.CD_GROUP = 'BVT_KIND'
                    LEFT JOIN (
                        SELECT
                            STYLE_CD,
                            COUNT(*) AS COLOR_CNT
                        FROM
                            KSV_ORDER_MST
                        GROUP BY
                            STYLE_CD
                    ) E ON A1.STYLE_CD = E.STYLE_CD
                ORDER BY
                    A1.REG_DATETIME desc
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            return tRet;
        },

        mgrQuery_S0200_KSV_PROD_MST: async (_, args) => {
            var tStr = '';

            var tObj = {};
            let sqlStr = `
                SELECT
                    a.*,
                    isnull(b.CD_NAME, '') as PROD_TYPE_N
                FROM
                    KSV_PROD_MST a
                    left join KCD_CODE b on b.cd_code = a.PROD_TYPE
                    and b.cd_group = 'PROD_TYPE'
                WHERE
                    a.STYLE_CD = '${args.STYLE_CD}'
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            return tRet;
        },

        mgrQuery_S0200_KCD_STYLE: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = await AFLib.getUserInfoSync(contextValue);

            console.log(args);
            var tStr = '';
            var tStr1 = '';

            var tRetDate = AFLib.getCurrTime();

            if (
                args.STYLE_NAME === '' &&
                args.BUYER_NAME === '' &&
                args.KIND === ''
            ) {
                tStr += `AND left(A.REG_DATETIME, 4) = '${tRetDate.substring(0, 4)}' `;
            } else {
                if (args.STYLE_NAME !== '') {
                    tStr += `AND (A.STYLE_CD  like '%${args.STYLE_NAME.replace(/'/g, "''")}%'  `;
                    tStr += `OR  A.STYLE_NAME  like '%${args.STYLE_NAME.replace(/'/g, "''")}%' ) `;
                }
                if (args.BUYER_NAME !== '' && args.BUYER_NAME !== ' ') {
                    tStr1 += `AND C.BUYER_CD  like '%${args.BUYER_NAME.replace(/'/g, "''")}%'  `;
                }

                if (args.KIND !== '' && args.KIND !== ' ') {
                    tStr += `AND A.BVT_KIND  like '%${args.KIND.replace(/'/g, "''")}%'  `;
                }
            }

            var tObj = {};
            let sqlStr = `
                SELECT DISTINCT
                    A1.*,
                    D1.CD_NAME AS BVT_KIND,
                    D.CD_NAME AS STATUS_NAME,
                    -- E.COLOR_CNT AS COLOR_CNT,
                    '0' AS COLOR_CNT,
                    D2.CD_NAME AS PURPOSE_NAME,
                    D3.CD_NAME AS FABRIC_NAME
                FROM
                    (
                        SELECT
                            top 2000 A.*,
                            C.BUYER_NAME,
                            isnull(F.name, '') as fileName,
                            isnull(F.URL, '') as fileUrl,
                            isnull(F.OBJECT_NAME, '') as objectName
                        FROM
                            KCD_STYLE A
                            left join KCd_FILEINFO F on A.STYLE_CD = F.FILE_KEY,
                            KCD_BUYER C
                        WHERE
                            A.STYLE_CD <> ''
                            AND A.BUYER_CD = C.BUYER_CD
                            --and c.REG_USER in (select distinct user_id from kcd_user where company_code = '${tUserInfo.COMPANY_CODE}')
                            AND RIGHT(A.STYLE_CD, 3) <> '-DL'
                            AND RIGHT(A.STYLE_CD, 3) <> '-ZL' ${tStr} ${tStr1}
                            -- ORDER BY A.REG_DATETIME desc 
                            -- OFFSET 0 rows FETCH NEXT 1000 rows only
                    ) A1
                    LEFT JOIN KCD_CODE D ON A1.STATUS_CD = D.CD_CODE
                    AND D.CD_GROUP = 'STATUS_CD'
                    LEFT JOIN KCD_CODE D1 ON (
                        A1.BVT_KIND = D1.CD_CODE
                        OR A1.BVT_KIND = D1.CD_NAME
                    )
                    AND D1.CD_GROUP = 'BVT_KIND'
                    LEFT JOIN KCD_CODE D2 ON A1.PURPOSE = D2.CD_CODE
                    AND D2.CD_GROUP = 'PURPOSE_KIND'
                    LEFT JOIN KCD_CODE D3 ON A1.FABRIC = D3.CD_CODE
                    AND D3.CD_GROUP = 'FABRIC_KIND'
                    -- LEFT JOIN (SELECT STYLE_CD, COUNT(*) AS COLOR_CNT FROM KSV_ORDER_MST GROUP BY STYLE_CD) E ON A1.STYLE_CD = E.STYLE_CD
                ORDER BY
                    A1.REG_DATETIME desc
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            //console.log(tRet[0]);
            return tRet;
        },

        mgrQuery_S0200_KCD_STYLE_CODE: async (_, args, contextValue) => {
            var tObj = {};
            var tIdx = 0;

            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = await AFLib.getUserInfoSync(contextValue);

            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'STYLE_DL'
                ORDER BY
                    CASE
                        WHEN CD_CODE NOT LIKE '%[^0-9]%' THEN 0
                    END,
                    CASE
                        WHEN CD_CODE NOT LIKE '%[^0-9]%' THEN CAST(CD_CODE AS INT)
                        ELSE NULL
                    END,
                    CD_CODE
            `;
            tObj.T_KCD_STYLE_DL = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj1 = {};
            tObj1.CD_CODE = '';
            tObj1.CD_NAME = '-';
            tObj.T_KCD_STYLE_DL.unshift(tObj1);

            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'STYLE_NW'
                ORDER BY
                    CASE
                        WHEN CD_CODE NOT LIKE '%[^0-9]%' THEN 0
                    END,
                    CASE
                        WHEN CD_CODE NOT LIKE '%[^0-9]%' THEN CAST(CD_CODE AS INT)
                        ELSE NULL
                    END,
                    CD_CODE
            `;
            tObj.T_KCD_STYLE_MW = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj1 = {};
            tObj1.CD_CODE = '';
            tObj1.CD_NAME = '-';
            tObj.T_KCD_STYLE_MW.unshift(tObj1);

            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'STYLE_EMBRO'
                ORDER BY
                    CASE
                        WHEN CD_CODE NOT LIKE '%[^0-9]%' THEN 0
                    END,
                    CASE
                        WHEN CD_CODE NOT LIKE '%[^0-9]%' THEN CAST(CD_CODE AS INT)
                        ELSE NULL
                    END,
                    CD_CODE
            `;
            tObj.T_KCD_STYLE_EMBRO = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj1 = {};
            tObj1.CD_CODE = '';
            tObj1.CD_NAME = '-';
            tObj.T_KCD_STYLE_EMBRO.unshift(tObj1);

            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'STYLE_TP'
                ORDER BY
                    CASE
                        WHEN CD_CODE NOT LIKE '%[^0-9]%' THEN 0
                    END,
                    CASE
                        WHEN CD_CODE NOT LIKE '%[^0-9]%' THEN CAST(CD_CODE AS INT)
                        ELSE NULL
                    END,
                    CD_CODE
            `;
            tObj.T_KCD_STYLE_TP = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj1 = {};
            tObj1.CD_CODE = '';
            tObj1.CD_NAME = '-';
            tObj.T_KCD_STYLE_TP.unshift(tObj1);

            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'STYLE_SP'
                ORDER BY
                    CASE
                        WHEN CD_CODE NOT LIKE '%[^0-9]%' THEN 0
                    END,
                    CASE
                        WHEN CD_CODE NOT LIKE '%[^0-9]%' THEN CAST(CD_CODE AS INT)
                        ELSE NULL
                    END,
                    CD_CODE
            `;
            tObj.T_KCD_STYLE_SP = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj1 = {};
            tObj1.CD_CODE = '';
            tObj1.CD_NAME = '-';
            tObj.T_KCD_STYLE_SP.unshift(tObj1);

            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'STYLE_LTHR'
                ORDER BY
                    CASE
                        WHEN CD_CODE NOT LIKE '%[^0-9]%' THEN 0
                    END,
                    CASE
                        WHEN CD_CODE NOT LIKE '%[^0-9]%' THEN CAST(CD_CODE AS INT)
                        ELSE NULL
                    END,
                    CD_CODE
            `;
            tObj.T_KCD_STYLE_LTHR = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj1 = {};
            tObj1.CD_CODE = '';
            tObj1.CD_NAME = '-';
            tObj.T_KCD_STYLE_LTHR.unshift(tObj1);

            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'STYLE_G'
                ORDER BY
                    CASE
                        WHEN CD_CODE NOT LIKE '%[^0-9]%' THEN 0
                    END,
                    CASE
                        WHEN CD_CODE NOT LIKE '%[^0-9]%' THEN CAST(CD_CODE AS INT)
                        ELSE NULL
                    END,
                    CD_CODE
            `;
            tObj.T_KCD_STYLE_G = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj1 = {};
            tObj1.CD_CODE = 'X';
            tObj1.CD_NAME = 'X';
            tObj.T_KCD_STYLE_G.unshift(tObj1);

            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'STYLE_W'
                ORDER BY
                    CASE
                        WHEN CD_CODE NOT LIKE '%[^0-9]%' THEN 0
                    END,
                    CASE
                        WHEN CD_CODE NOT LIKE '%[^0-9]%' THEN CAST(CD_CODE AS INT)
                        ELSE NULL
                    END,
                    CD_CODE
            `;
            tObj.T_KCD_STYLE_W = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj1 = {};
            tObj1.CD_CODE = '';
            tObj1.CD_NAME = '-';
            tObj.T_KCD_STYLE_W.unshift(tObj1);

            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'STYLE_LAZE'
                ORDER BY
                    CASE
                        WHEN CD_CODE NOT LIKE '%[^0-9]%' THEN 0
                    END,
                    CASE
                        WHEN CD_CODE NOT LIKE '%[^0-9]%' THEN CAST(CD_CODE AS INT)
                        ELSE NULL
                    END,
                    CD_CODE
            `;
            tObj.T_KCD_STYLE_LAZE = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj1 = {};
            tObj1.CD_CODE = '';
            tObj1.CD_NAME = '-';
            tObj.T_KCD_STYLE_LAZE.unshift(tObj1);

            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'STYLE_S'
                ORDER BY
                    CASE
                        WHEN CD_CODE NOT LIKE '%[^0-9]%' THEN 0
                    END,
                    CASE
                        WHEN CD_CODE NOT LIKE '%[^0-9]%' THEN CAST(CD_CODE AS INT)
                        ELSE NULL
                    END,
                    CD_CODE
            `;
            tObj.T_KCD_STYLE_S = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj1 = {};
            tObj1.CD_CODE = 'X';
            tObj1.CD_NAME = 'X';
            tObj.T_KCD_STYLE_S.unshift(tObj1);

            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'STYLE_FND'
                ORDER BY
                    CASE
                        WHEN CD_CODE NOT LIKE '%[^0-9]%' THEN 0
                    END,
                    CASE
                        WHEN CD_CODE NOT LIKE '%[^0-9]%' THEN CAST(CD_CODE AS INT)
                        ELSE NULL
                    END,
                    CD_CODE
            `;
            tObj.T_KCD_STYLE_FND = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj1 = {};
            tObj1.CD_CODE = '';
            tObj1.CD_NAME = '-';
            tObj.T_KCD_STYLE_FND.unshift(tObj1);

            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'STYLE_EMBOSSING'
                ORDER BY
                    CASE
                        WHEN CD_CODE NOT LIKE '%[^0-9]%' THEN 0
                    END,
                    CASE
                        WHEN CD_CODE NOT LIKE '%[^0-9]%' THEN CAST(CD_CODE AS INT)
                        ELSE NULL
                    END,
                    CD_CODE
            `;
            tObj.T_KCD_STYLE_EMBOSSING = await prisma.$queryRaw(
                Prisma.raw(sqlStr),
            );
            var tObj1 = {};
            tObj1.CD_CODE = '';
            tObj1.CD_NAME = '-';
            tObj.T_KCD_STYLE_EMBOSSING.unshift(tObj1);

            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'STYLE_WASHING'
                ORDER BY
                    CASE
                        WHEN CD_CODE NOT LIKE '%[^0-9]%' THEN 0
                    END,
                    CASE
                        WHEN CD_CODE NOT LIKE '%[^0-9]%' THEN CAST(CD_CODE AS INT)
                        ELSE NULL
                    END,
                    CD_CODE
            `;
            tObj.T_KCD_STYLE_WASHING = await prisma.$queryRaw(
                Prisma.raw(sqlStr),
            );
            var tObj1 = {};
            tObj1.CD_CODE = '';
            tObj1.CD_NAME = '-';
            tObj.T_KCD_STYLE_WASHING.unshift(tObj1);

            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'STYLE_DOWN'
                ORDER BY
                    CASE
                        WHEN CD_CODE NOT LIKE '%[^0-9]%' THEN 0
                    END,
                    CASE
                        WHEN CD_CODE NOT LIKE '%[^0-9]%' THEN CAST(CD_CODE AS INT)
                        ELSE NULL
                    END,
                    CD_CODE
            `;
            tObj.T_KCD_STYLE_DOWN = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj1 = {};
            tObj1.CD_CODE = '';
            tObj1.CD_NAME = '-';
            tObj.T_KCD_STYLE_DOWN.unshift(tObj1);

            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'STYLE_CUT'
                ORDER BY
                    CASE
                        WHEN CD_CODE NOT LIKE '%[^0-9]%' THEN 0
                    END,
                    CASE
                        WHEN CD_CODE NOT LIKE '%[^0-9]%' THEN CAST(CD_CODE AS INT)
                        ELSE NULL
                    END,
                    CD_CODE
            `;
            tObj.T_KCD_STYLE_CUT = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj1 = {};
            tObj1.CD_CODE = '';
            tObj1.CD_NAME = '-';
            tObj.T_KCD_STYLE_CUT.unshift(tObj1);

            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'STYLE_FTP'
                ORDER BY
                    CASE
                        WHEN CD_CODE NOT LIKE '%[^0-9]%' THEN 0
                    END,
                    CASE
                        WHEN CD_CODE NOT LIKE '%[^0-9]%' THEN CAST(CD_CODE AS INT)
                        ELSE NULL
                    END,
                    CD_CODE
            `;
            tObj.T_KCD_STYLE_FTP = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj1 = {};
            tObj1.CD_CODE = '';
            tObj1.CD_NAME = '-';
            tObj.T_KCD_STYLE_FTP.unshift(tObj1);

            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'STYLE_DTP'
                ORDER BY
                    CASE
                        WHEN CD_CODE NOT LIKE '%[^0-9]%' THEN 0
                    END,
                    CASE
                        WHEN CD_CODE NOT LIKE '%[^0-9]%' THEN CAST(CD_CODE AS INT)
                        ELSE NULL
                    END,
                    CD_CODE
            `;
            tObj.T_KCD_STYLE_DTP = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj1 = {};
            tObj1.CD_CODE = '';
            tObj1.CD_NAME = '-';
            tObj.T_KCD_STYLE_DTP.unshift(tObj1);

            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'STATUS_CD'
                ORDER BY
                    CASE
                        WHEN CD_CODE NOT LIKE '%[^0-9]%' THEN 0
                    END,
                    CASE
                        WHEN CD_CODE NOT LIKE '%[^0-9]%' THEN CAST(CD_CODE AS INT)
                        ELSE NULL
                    END,
                    CD_CODE
            `;
            tObj.T_KCD_STYLE_STATUS_CD = await prisma.$queryRaw(
                Prisma.raw(sqlStr),
            );
            var tObj1 = {};
            tObj1.CD_CODE = '';
            tObj1.CD_NAME = '-';
            tObj.T_KCD_STYLE_STATUS_CD.unshift(tObj1);

            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'BVT_KIND'
                ORDER BY
                    CASE
                        WHEN CD_CODE NOT LIKE '%[^0-9]%' THEN 0
                    END,
                    CASE
                        WHEN CD_CODE NOT LIKE '%[^0-9]%' THEN CAST(CD_CODE AS INT)
                        ELSE NULL
                    END,
                    CD_CODE
            `;
            tObj.T_KCD_STYLE_KIND = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj1 = {};
            tObj1.CD_CODE = '';
            tObj1.CD_NAME = '-';
            tObj.T_KCD_STYLE_KIND.unshift(tObj1);

            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'STYLE_UNIT'
                ORDER BY
                    CASE
                        WHEN CD_CODE NOT LIKE '%[^0-9]%' THEN 0
                    END,
                    CASE
                        WHEN CD_CODE NOT LIKE '%[^0-9]%' THEN CAST(CD_CODE AS INT)
                        ELSE NULL
                    END,
                    CD_CODE
            `;
            tObj.T_KCD_STYLE_UNIT = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj1 = {};
            tObj1.CD_CODE = '';
            tObj1.CD_NAME = '-';
            tObj.T_KCD_STYLE_UNIT.unshift(tObj1);

            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'PURPOSE_KIND'
                ORDER BY
                    CASE
                        WHEN CD_CODE NOT LIKE '%[^0-9]%' THEN 0
                    END,
                    CASE
                        WHEN CD_CODE NOT LIKE '%[^0-9]%' THEN CAST(CD_CODE AS INT)
                        ELSE NULL
                    END,
                    CD_CODE
            `;
            tObj.T_KCD_STYLE_PURPOSE = await prisma.$queryRaw(
                Prisma.raw(sqlStr),
            );
            var tObj1 = {};
            tObj1.CD_CODE = '';
            tObj1.CD_NAME = '-';
            tObj.T_KCD_STYLE_PURPOSE.unshift(tObj1);

            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'FABRIC_KIND'
                ORDER BY
                    CASE
                        WHEN CD_CODE NOT LIKE '%[^0-9]%' THEN 0
                    END,
                    CASE
                        WHEN CD_CODE NOT LIKE '%[^0-9]%' THEN CAST(CD_CODE AS INT)
                        ELSE NULL
                    END,
                    CD_CODE
            `;
            tObj.T_KCD_STYLE_FABRIC = await prisma.$queryRaw(
                Prisma.raw(sqlStr),
            );
            var tObj1 = {};
            tObj1.CD_CODE = '';
            tObj1.CD_NAME = '-';
            tObj.T_KCD_STYLE_FABRIC.unshift(tObj1);

            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'SAMPLE_USAGE'
                ORDER BY
                    CASE
                        WHEN CD_CODE NOT LIKE '%[^0-9]%' THEN 0
                    END,
                    CASE
                        WHEN CD_CODE NOT LIKE '%[^0-9]%' THEN CAST(CD_CODE AS INT)
                        ELSE NULL
                    END,
                    CD_CODE
            `;
            tObj.T_KCD_STYLE_SAMPLE_USAGE = await prisma.$queryRaw(
                Prisma.raw(sqlStr),
            );
            var tObj1 = {};
            tObj1.CD_CODE = '';
            tObj1.CD_NAME = '-';
            tObj.T_KCD_STYLE_SAMPLE_USAGE.unshift(tObj1);

            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'PROD_TYPE'
                ORDER BY
                    CASE
                        WHEN CD_CODE NOT LIKE '%[^0-9]%' THEN 0
                    END,
                    CASE
                        WHEN CD_CODE NOT LIKE '%[^0-9]%' THEN CAST(CD_CODE AS INT)
                        ELSE NULL
                    END,
                    CD_CODE
            `;
            tObj.T_KCD_STYLE_PROD_TYPE = await prisma.$queryRaw(
                Prisma.raw(sqlStr),
            );
            var tObj1 = {};
            tObj1.CD_CODE = '';
            tObj1.CD_NAME = '-';
            tObj.T_KCD_STYLE_PROD_TYPE.unshift(tObj1);

            sqlStr = `
                SELECT
                    top 1000 *
                FROM
                    KCD_BUYER
                WHERE
                    STATUS_CD = '0'
                    --and reg_user in (select distinct user_id from kcd_user where company_code = '${tUserInfo.COMPANY_CODE}')
                ORDER BY
                    REG_DATETIME DESC
            `;
            var tArray1 = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tArray2 = [];

            tArray1.forEach((col, i) => {
                var tObj = { ...col };
                tObj.BUYER_NAME = `(${col.BUYER_CD})${col.BUYER_NAME}`;
                tArray2.push(tObj);
            });
            tObj.T_KCD_STYLE_BUYER = [...tArray2];
            var tObj1 = {};
            tObj1.BUYER_CD = '';
            tObj1.BUYER_NAME = '-';
            tObj.T_KCD_STYLE_BUYER.unshift(tObj1);

            return tObj;
        },
    },
};

export default moduleQuery_S0200_KCD_STYLE_TBL_KCD_STYLE;
