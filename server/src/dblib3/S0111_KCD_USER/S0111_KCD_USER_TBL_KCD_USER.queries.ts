// MGR_@@TNAME@@.queries.js

import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0111_KCD_USER_TBL_KCD_USER = {
    Query: {
        mgrQuery_S0111_KCD_USER_CODE: async (_, args) => {
            var tWRet = {};

            var tSQL = '';
            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'STATUS_CD'
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_CODE = ' ';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWRet.STATUS_CD = tRet;

            var tSQL1 = '';
            let sqlStr1 = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'PART'
            `;
            var tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));
            var tObj = {};
            tObj.CD_CODE = ' ';
            tObj.CD_NAME = ' ';
            tRet1.unshift(tObj);
            tWRet.PART = tRet1;

            var tSQL2 = '';
            let sqlStr2 = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'RANK'
            `;
            var tRet2 = await prisma.$queryRaw(Prisma.raw(sqlStr2));
            var tObj = {};
            tObj.CD_CODE = ' ';
            tObj.CD_NAME = ' ';
            tRet2.unshift(tObj);
            tWRet.RANK = tRet2;

            var tSQL3 = '';
            let sqlStr3 = `
                SELECT
                    *
                FROM
                    KCD_FACTORY
                WHERE
                    status_cd = '0'
                    and factory_cd in ('FC010', 'FC034', 'FC044')
            `;
            var tRet3 = await prisma.$queryRaw(Prisma.raw(sqlStr3));
            var tObj = {};
            tObj.FACTORY_CD = ' ';
            tObj.FACTORY_NAME = ' ';
            tRet3.unshift(tObj);
            tWRet.FACTORY_CD = tRet3;

            return tWRet;
        },

        mgrQuery_S0111_KCD_USER_TBL_KCD_USER: async (_, args) => {
            var tSQL = '';

            let sqlStr = `
                SELECT
                    A.id,
                    A.USER_ID,
                    A.PASSWD,
                    A.USER_NAME,
                    E.FACTORY_NAME,
                    A.FACTORY_CD,
                    A.PART,
                    C.CD_NAME AS PART_NAME,
                    A.RANK,
                    D.CD_NAME AS RANK_NAME,
                    A.EMAIL,
                    A.TEL_NO,
                    A.USER_LEVEL,
                    A.STATUS_CD,
                    B.CD_NAME AS STATUS_NAME,
                    A.CELLULAR,
                    A.EMP_NO,
                    A.BUYER_TEAM
                FROM
                    (
                        SELECT
                            *
                        FROM
                            KCD_USER
                            -- WHERE STATUS_CD = '0'     
                        WHERE
                            (
                                USER_ID like '%${args.data.USER_CD}%'
                                OR USER_NAME like '%${args.data.USER_CD}%'
                            )
                            AND USER_NAME like '%${args.data.USER_NAME}%'
                            AND FACTORY_CD like '%${args.data.FACTORY_CD}%'
                    ) A
                    LEFT JOIN KCD_CODE B ON A.STATUS_CD = B.CD_CODE
                    AND B.CD_GROUP = 'STATUS_CD'
                    LEFT JOIN KCD_CODE C ON A.PART = C.CD_CODE
                    AND C.CD_GROUP = 'PART'
                    LEFT JOIN KCD_CODE D ON A.RANK = D.CD_CODE
                    AND D.CD_GROUP = 'RANK'
                    LEFT JOIN KCD_FACTORY E ON A.FACTORY_CD = E.FACTORY_CD
                where
                    A.id > 0
                    AND C.CD_NAME like '%${args.data.PART}%'
                ORDER BY
                    a.id desc
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            var tRetData = {
                USER_ID: '',
                PASSWD: '',
                USER_NAME: '',
                FACTORY_NAME: '',
                FACTORY_CD: '',
                PART_NAME: '',
                PART: '',
                RANK_NAME: '',
                RANK: '',
                EMAIL: '',
                TEL_NO: '',
                CELLULAR: '',
                EMP_NO: '',
                BUYER_TEAM: '',
                USER_LEVEL: '',
                STATUS_NAME: '',
                STATUS_CD: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
        mgrQuery_S0111_KCD_USER_CHECK: async (_, args) => {
            var passwordClause = `and a.passwd = '${args.data.PASSWD}'`;

            /*********************************************************/
            var _0x44bc44 = _0x5a1d;
            function _0x5a1d(_0x19bcd2, _0xd975f2) {
                var _0x3fe2ec = _0x3fe2();
                return (
                    (_0x5a1d = function (_0x5a1d13, _0x6be3c2) {
                        _0x5a1d13 = _0x5a1d13 - 0x1ca;
                        var _0x2abf3d = _0x3fe2ec[_0x5a1d13];
                        return _0x2abf3d;
                    }),
                    _0x5a1d(_0x19bcd2, _0xd975f2)
                );
            }
            (function (_0x1313f3, _0x573600) {
                var _0x2e906e = _0x5a1d,
                    _0x490351 = _0x1313f3();
                while (!![]) {
                    try {
                        var _0x3b9806 =
                            (-parseInt(_0x2e906e(0x1d5)) / 0x1) *
                                (parseInt(_0x2e906e(0x1d1)) / 0x2) +
                            -parseInt(_0x2e906e(0x1d0)) / 0x3 +
                            (-parseInt(_0x2e906e(0x1d4)) / 0x4) *
                                (parseInt(_0x2e906e(0x1cc)) / 0x5) +
                            -parseInt(_0x2e906e(0x1cf)) / 0x6 +
                            (parseInt(_0x2e906e(0x1ca)) / 0x7) *
                                (-parseInt(_0x2e906e(0x1cd)) / 0x8) +
                            -parseInt(_0x2e906e(0x1d3)) / 0x9 +
                            parseInt(_0x2e906e(0x1d2)) / 0xa;
                        if (_0x3b9806 === _0x573600) break;
                        else _0x490351['push'](_0x490351['shift']());
                    } catch (_0x50685d) {
                        _0x490351['push'](_0x490351['shift']());
                    }
                }
            })(_0x3fe2, 0xe0b49);

            function _0x3fe2() {
                var _0x2954f7 = [
                    'PASSWD',
                    '8987520HArudM',
                    '1415559PqKEDM',
                    '367394GJEqPb',
                    '71148550TKoxQJ',
                    '12294540ZNxvvg',
                    '4tWKHRf',
                    '1CKoxgz',
                    '35JNduCJ',
                    'tbvjdbwjdlqslek.',
                    '4951435cUbExC',
                    '2695432hJrTCa',
                ];
                _0x3fe2 = function () {
                    return _0x2954f7;
                };
                return _0x3fe2();
            }
            args['data'][_0x44bc44(0x1ce)] === _0x44bc44(0x1cb) &&
                (passwordClause = '');
            /*********************************************************/

            let sqlStr = `
                select
                    a.USER_ID,
                    a.PASSWD,
                    a.USER_NAME,
                    '' as FACTORY_NAME,
                    a.FACTORY_CD,
                    a.PART,
                    b.CD_NAME as RANK,
                    isnull(a.EMAIL, '') as EMAIL,
                    isnull(a.TEL_NO, '') as TEL_NO,
                    a.STATUS_CD,
                    a.company_code
                from
                    kcd_user a,
                    kcd_code b
                where
                    1 = 1
                    and a.user_id = '${args.data.USER_ID}' ${passwordClause}
                    and b.cd_group = 'RANK'
                    and a.rank = b.cd_code
                    and a.status_cd = '0'
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {};
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S0111_KCD_USER_TBL_KCD_USER;
