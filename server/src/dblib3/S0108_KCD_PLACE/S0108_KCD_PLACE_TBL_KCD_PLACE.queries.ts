// MGR_@@TNAME@@.queries.js

import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0108_KCD_PLACE_TBL_KCD_PLACE = {
    Query: {
        mgrQuery_S0108_KCD_PLACE_CODE: async (_, args) => {
            interface tWRetType {
                STATUS_CD: any;
                PLACE_TYPE: any;
            }

            const tWRet: tWRetType = {
                STATUS_CD: undefined,
                PLACE_TYPE: undefined,
            };

            var tSQL = '';
            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'STATUS_CD'
                    and cd_code in ('0', '2')
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tObj = {
                CD_CODE: '',
                CD_NAME: '',
            };

            tRet.unshift(tObj);
            tWRet.STATUS_CD = tRet;

            var tSQL1 = '';
            let sqlStr1 = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'PLACE_TYPE'
            `;
            var tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));
            tWRet.PLACE_TYPE = tRet1;

            return tWRet;
        },

        mgrQuery_S0108_KCD_PLACE_TBL_KCD_PLACE: async (_, args) => {
            var tSQL = '';
            /*
             if (args.KEY1 !== '') {
                 tSQL += `AND KEY1 = '${args.KEY1}' `;
             }
            WHERE   (A.PLACE_NAME LIKE '%"	+ m_strPlaceName + "%') AND (B.CD_GROUP = 'STATUS_CD') AND (C.CD_GROUP = 'PLACE_TYPE') "
      */

            console.log(args.data.PLACE_NAME);

            if (args.data.PLACE_CD !== '') {
                tSQL += ` AND A.PLACE_CD like '%%${args.data.PLACE_CD}%%' `;
            }
            if (args.data.PLACE_NAME !== '') {
                tSQL += ` AND A.PLACE_NAME like '%%${args.data.PLACE_NAME}%%' `;
            }
            if (args.data.STATUS_CD !== '') {
                tSQL += ` AND A.STATUS_CD = '${args.data.STATUS_CD}'`;
            }
            let sqlStr = `
                SELECT
                    A.id,
                    A.PLACE_CD,
                    A.PLACE_NAME,
                    A.USER_NAME,
                    A.TEL_NO,
                    A.EMAIL,
                    isnull(B.CD_NAME, '0') as STATUS_NAME,
                    A.STATUS_CD,
                    ISNULL(C.CD_NAME, '0') AS PLACE_TYPE_NAME,
                    A.PLACE_TYPE,
                    '' as DELIVERY_TYPE_NAME,
                    A.DELIVERY_TYPE
                FROM
                    KCD_PLACE A
                    LEFT JOIN KCD_CODE B ON A.STATUS_CD = B.CD_CODE
                    AND B.CD_GROUP = 'STATUS_CD'
                    left join KCD_CODE C ON A.PLACE_TYPE = C.CD_CODE
                    AND C.CD_GROUP = 'PLACE_TYPE'
                WHERE
                    A.id > 0
                    AND A.PLACE_CD like '%${args.data.PLACE_CD}%'
                    AND A.PLACE_NAME like '%${args.data.PLACE_NAME}%'
                    AND A.STATUS_CD like '%${args.data.STATUS_CD}%'
                ORDER BY
                    A.id desc
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                PLACE_CD: '',
                PLACE_NAME: '',
                USER_NAME: '',
                TEL_NO: '',
                EMAIL: '',
                STATUS_NAME: '',
                STATUS_CD: '',
                PLACE_TYPE: '',
                PLACE_TYPE_NAME: '',
                DELIVERY_TYPE: '',
                DELIVERY_TYPE_NAME: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S0108_KCD_PLACE_TBL_KCD_PLACE;
