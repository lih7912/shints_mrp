// MGR_@@TNAME@@.queries.js

import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0217_SALES_MATL_PLAN_LIST_TBL_KSV_ORDER_MST = {
    Query: {
        mgrQuery_S0217_SALES_MATL_PLAN_LIST_CODE: async (_, args) => {
            var tWRet = {};

            var tArray1 = [];
            var arrayYY: string[] = [
                '2019',
                '2020',
                '2021',
                '2022',
                '2023',
                '2024',
                '2025',
                '2026',
            ];
            var arrayMM: string[] = [
                '01',
                '02',
                '03',
                '04',
                '05',
                '06',
                '07',
                '08',
                '09',
                '10',
                '11',
                '12',
            ];
            arrayYY.forEach((col, i) => {
                arrayMM.forEach((col1, i1) => {
                    var tStr = `${col}${col1}`;
                    var tObj = {};
                    tObj.CD_CODE = tStr;
                    tObj.CD_NAME = tStr;
                    tArray1.push(tObj);
                });
            });

            tWRet.S_DATE = tArray1;
            tWRet.E_DATE = tArray1;

            var tSQL = '';
            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'BUYER_TEAM'
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_CODE = '';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWRet.TEAM = tRet;

            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_USER
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.USER_ID = '';
            tObj.USER_NAME = ' ';
            tRet.unshift(tObj);
            tWRet.USER = tRet;

            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_BUYER
            `;
            let tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tRet = [];
            tRet0.forEach((col, i) => {
                var tObj = { ...col };
                tObj.BUYER_NAME = `(${col.BUYER_CD})${col.BUYER_NAME}`;
                tRet.push(tObj);
            });
            var tObj = {};
            tObj.BUYER_CD = '';
            tObj.BUYER_NAME = ' ';
            tRet.unshift(tObj);
            tWRet.BUYER_CD = tRet;

            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_FACTORY
                    -- where factory_cd in ('FC010', 'FC034', 'FC044')
                where
                    factory_cd in ('FC034', 'FC044')
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.FACTORY_CD = '';
            tObj.FACTORY_NAME = ' ';
            tRet.unshift(tObj);
            tWRet.FACTORY_CD = tRet;

            return tWRet;
        },

        mgrQuery_S0217_SALES_MATL_PLAN_LIST_TBL_KSV_ORDER_MST: async (
            _,
            args,
        ) => {
            var tSQL = '';
            var tTableName = '';
            if (args.data.FACTORY_CD !== 'FC034') {
                tTableName = 'KSV_ORDER_PLAN_ETHIOPIA';
            }
            if (args.data.FACTORY_CD !== 'FC044') {
                tTableName = 'KSV_ORDER_PLAN';
            }

            var sqlStr = `
                SELECT
                    A.USER_ID,
                    B.USER_NAME,
                    A.BUYER_CD,
                    C.BUYER_NAME,
                    C.BUYER_TEAM,
                    A.COLLECTION,
                    A.CURR_CD,
                    isnull(SUM(A.PLAN_QTY), 0) as TOTAL_QTY,
                    isnull(SUM(A.PLAN_AMT), 0) as TOTAL_AMT
                FROM
                    ${tTableName} A,
                    KCD_USER B,
                    KCD_BUYER C
                WHERE
                    (A.YYMM >= '${args.data.S_DATE}')
                    AND A.USER_ID = B.USER_ID
                    AND A.BUYER_CD = C.BUYER_CD
                    AND (A.YYMM <= '${args.data.E_DATE}')
                    AND (B.USER_ID LIKE '%${args.data.USER_CD}%')
                    AND (C.BUYER_CD LIKE '%${args.data.BUYER_CD}%')
                    AND (C.BUYER_TEAM LIKE '%${args.data.TEAM_CD}%')
                GROUP BY
                    B.USER_NAME,
                    C.BUYER_NAME,
                    C.BUYER_TEAM,
                    A.COLLECTION,
                    A.BUYER_CD,
                    A.USER_ID,
                    A.CURR_CD
                order by
                    a.user_id,
                    a.buyer_cd,
                    a.collection
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            var tRetArray = [];

            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tOne = { ...tRet[tIdx] };

                var sqlStr1 = `
                    SELECT
                        A.LINE_TYPE,
                        isnull(SUM(A.PLAN_QTY), 0) as LINE_QTY,
                        isnull(SUM(A.PLAN_AMT), 0) as LINE_AMT
                    FROM
                        ${tTableName} A,
                        KCD_USER B,
                        KCD_BUYER C
                    WHERE
                        (A.YYMM >= '${args.data.S_DATE}')
                        AND A.USER_ID = B.USER_ID
                        AND A.COLLECTION = '${tOne.COLLECTION}'
                        AND A.BUYER_CD = C.BUYER_CD
                        AND (A.YYMM <= '${args.data.E_DATE}')
                        AND (B.USER_ID LIKE '%${tOne.USER_ID}%')
                        AND (C.BUYER_CD LIKE '%${tOne.BUYER_CD}%')
                        AND (C.BUYER_TEAM LIKE '%${tOne.BUYER_TEAM}%')
                    GROUP BY
                        A.LINE_TYPE
                `;
                var tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));
                tOne.LINE_SUM = tRet1;
                tRetArray.push(tOne);
            }

            return tRetArray;
        },
    },
};

export default moduleQuery_S0217_SALES_MATL_PLAN_LIST_TBL_KSV_ORDER_MST;
