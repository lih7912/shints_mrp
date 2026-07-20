// MGR_@@TNAME@@.queries.js

import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0114_KCD_SUPPLIER_TBL_KCD_VENDOR = {
    Query: {
        mgrQuery_S0114_KCD_BANK_VENDOR: async (_, args) => {
            console.log(args.VENDOR_CD);
            var tObj = {};
            let sqlStr = `
                SELECT
                    A.*,
                    B.GW,
                    isnull(c.cd_name, '') as GW_N
                FROM
                    KCD_BANK A,
                    KCD_VENDOR_BANK B
                    left join kcd_code c on c.cd_code = b.gw
                    and cd_group = 'GW_STATUS'
                WHERE
                    B.VENDOR_CD = '${args.VENDOR_CD}'
                    AND A.BANK_CD = B.BANK_CD
                order by
                    reg_datetime
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            console.log(tRet);
            var tArray = [];

            const tCols = __dirname.split('/');
            var tPath = '';
            var tIdx = 0;
            for (tIdx = 0; tIdx < tCols.length - 1; tIdx++) {
                tPath += tCols[tIdx] + '/';
            }

            // const file = `${__dirname}/${tKind}/${tFileName}`;
            // const file = `${tPath}upload/${tKind}/${tFileName}`;

            const tCols = __dirname.split('/');
            var tPath0 = '';
            var tIdx = 0;
            for (tIdx = 0; tIdx < tCols.length - 3; tIdx++) {
                tPath0 += tCols[tIdx] + '/';
            }

            const file_0 = `${tPath0}upload/bank/`;

            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tObj = { ...tRet[tIdx] };
                console.log(file_0 + tObj.BANK_CD + '.pdf');
                if (fs.existsSync(file_0 + tObj.BANK_CD + '.pdf')) {
                    tObj.FILENAME = tObj.BANK_CD + '.pdf';
                } else {
                    tObj.FILENAME = '';
                }
                tArray.push(tObj);
            }

            return tArray;
        },

        mgrQuery_S0114_KCD_VENDOR_CODE: async (_, args) => {
            interface typeTWRet {
                STATUS_CD: any;
                VENDOR_TYPE: any;
                PAY_TERM: any;
                VENDOR_MATL_TYPE: any;
                GW_STATUS: any;
                SHINTS_USER: any;
                NAT_CD: any;
                PERMIT: any;
                OVERSHORT: any;
            }
            var tWRet: typeTWRet = {
                STATUS_CD: undefined,
                VENDOR_TYPE: undefined,
                PAY_TERM: undefined,
                VENDOR_MATL_TYPE: undefined,
                GW_STATUS: undefined,
                SHINTS_USER: undefined,
                NAT_CD: undefined,
                PERMIT: undefined,
                OVERSHORT: undefined,
            };

            var tSQL = '';
            let sqlStr_STATUS_CD = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'STATUS_CD'
            `;
            var tRet_STATUS_CD = await prisma.$queryRaw(
                Prisma.raw(sqlStr_STATUS_CD),
            );
            var tObj = {
                CD_CODE: '',
                CD_NAME: ' ',
            };

            tRet_STATUS_CD.unshift(tObj);
            tWRet.STATUS_CD = tRet_STATUS_CD;

            let sqlStr_VENDOR_TYPE = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'VENDOR_TYPE'
            `;
            let tRet_sqlStr_VENDOR_TYPE = await prisma.$queryRaw(
                Prisma.raw(sqlStr_VENDOR_TYPE),
            );
            tRet_sqlStr_VENDOR_TYPE.unshift(tObj);
            tWRet.VENDOR_TYPE = tRet_sqlStr_VENDOR_TYPE;

            let sqlStr_PAY_TYPE = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'PAY_TYPE'
                order by
                    cd_flag
            `;
            let tRet_PAY_TYPE = await prisma.$queryRaw(
                Prisma.raw(sqlStr_PAY_TYPE),
            );
            tRet_PAY_TYPE.unshift(tObj);
            tWRet.PAY_TERM = tRet_PAY_TYPE;

            let sqlStr_VENDOR_MATL_TYPE = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'VENDOR_MATL_TYPE'
            `;
            let tRet_VENDOR_MATL_TYPE = await prisma.$queryRaw(
                Prisma.raw(sqlStr_VENDOR_MATL_TYPE),
            );
            tRet_VENDOR_MATL_TYPE.unshift(tObj);
            tWRet.VENDOR_MATL_TYPE = tRet_VENDOR_MATL_TYPE;

            let sqlStr_GW_STATUS = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'GW_STATUS'
            `;
            let tRet_GW_STATUS = await prisma.$queryRaw(
                Prisma.raw(sqlStr_GW_STATUS),
            );
            tRet_GW_STATUS.unshift(tObj);
            tWRet.GW_STATUS = tRet_GW_STATUS;

            let sqlStr_USER = `
                SELECT
                    *
                FROM
                    KCD_USER
            `;
            let tRet_USER = await prisma.$queryRaw(Prisma.raw(sqlStr_USER));
            var tObj1 = {
                USER_ID: '',
                USER_NAME: ' ',
            };

            tRet_USER.unshift(tObj1);
            tWRet.SHINTS_USER = tRet_USER;

            let sqlStr_NATION = `
                SELECT
                    *
                FROM
                    KCD_NATION
            `;
            let tRet_NATION = await prisma.$queryRaw(Prisma.raw(sqlStr_NATION));
            var tObj2 = {
                NAT_CD: '',
                NAT_NAME: ' ',
            };

            tRet_NATION.unshift(tObj2);
            tWRet.NAT_CD = tRet_NATION;

            let sqlStr_OVERSHORT = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'OVERSHORT_CD'
            `;
            let tRet_OVERSHORT = await prisma.$queryRaw(
                Prisma.raw(sqlStr_OVERSHORT),
            );

            tRet_OVERSHORT.unshift(tObj);
            tWRet.OVERSHORT = tRet_OVERSHORT;

            var tArray0 = ['Y', 'N'];
            var tRet = tArray0.map((col, i) => {
                var tObj = {};
                tObj.CD_CODE = col;
                tObj.CD_NAME = col;
                return tObj;
            });
            var tObj = {};
            tObj.CD_CODE = '';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWRet.PERMIT = tRet;

            return tWRet;
        },
    },
};

export default moduleQuery_S0114_KCD_SUPPLIER_TBL_KCD_VENDOR;
