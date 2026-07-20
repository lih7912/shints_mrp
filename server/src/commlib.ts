const fs = require('fs');
const { MongoClient } = require('mongodb');
const mssql = require('../routes/mssqlExec');
const mysqlConfig = require('../routes/config.js').mysqlConfig;
const mailConfig = require('../routes/config.js').mailParameter;
const { format } = require('sql-formatter');

import { Prisma } from '@prisma/client';
import prisma from './db'; //PrismaClient 사용하기 위해 불러오기
const mysql = require('mysql2/promise'); // mysql2의 promise 기반 모듈 사용
const nodemailer = require('nodemailer');

class CommLib {
    async getKcdUserInfo(contextValue) {
        var tRet = {};
        var tCols = contextValue.token.split(':');

        if (tCols.length >= 2) {
            tRet.USER_ID = tCols[0];
            tRet.USER_NAME = tCols[1];
        } else {
            tRet.USER_ID = '';
            tRet.USER_NAME = '';
        }

        return (
            await mssql.mssqlExec(`
                select
                    a.*,
                    b.cd_name as PART_NAME
                from
                    kcd_user a,
                    kcd_code b
                where
                    1 = 1
                    and a.part = b.CD_CODE
                    and a.user_id = '${tRet.USER_ID}'
                    and b.cd_group = 'part'
            `)
        )[0];
    }

    async mysqlMutationLog(mutationInfo) {
        try {
            const rawQuery = String(mutationInfo.QUERY || '').trim();
            const firstKeyword = rawQuery
                .split(/\s+/)[0]
                ?.toUpperCase() || '';

            let formattedQuery = rawQuery;

            if (['SELECT', 'BEGIN', 'COMMIT'].includes(firstKeyword)) {
                return { query: rawQuery };
            }

            // MySQL 연결 설정
            const pool = await mysql.createPool(mysqlConfig);
            const connection = await pool.getConnection();

            console.log(
                mysqlConfig.host +
                    ':' +
                    mysqlConfig.port +
                    ' MySQL connected - fetchDbMultiConn()',
            );

            // SQL 쿼리 준비
            if (mutationInfo.IS_CLIENT === 'CLIENT') {
                formattedQuery = JSON.stringify(
                    JSON.parse(rawQuery),
                    null,
                    4,
                );
            } else {
                formattedQuery = !mutationInfo.IS_ERROR
                    ? format(rawQuery)
                    : rawQuery;

            }

            const sqlQuery = `
            INSERT INTO AF_TRANSACTION_LOG (USER_ID, TIMESTAMP, MENU_CODE, SRC, QUERY)
            VALUES (?, ?, ?, ?, ?)`;
            console.log(sqlQuery);
            console.log(
                `Parameters: USER_ID=${mutationInfo.USER_ID}, TIMESTAMP=${mutationInfo.TIME_STAMP}, MENU_CODE=${mutationInfo.MENU_CODE}, SRC=${mutationInfo.SRC}`,
            );
            console.log(`Formatted Query: ${formattedQuery}`);

            // 쿼리 실행
            const [result] = await connection.execute(sqlQuery, [
                mutationInfo.USER_ID ?? '',
                mutationInfo.TIME_STAMP ?? new Date().toISOString().slice(0, 19).replace('T', ' '),
                mutationInfo.MENU_CODE ?? '',
                mutationInfo.IS_ERROR
                    ? `${mutationInfo.SRC ?? ''}:ERROR`
                    : mutationInfo.SRC ?? '',
                formattedQuery,
            ]);

            console.log(result);

            // 결과 반환
            return result;
        } catch (error) {
            console.error('ERROR:', error.message);
            return { error: error.message };
        }
    }

    getFunctionName() {
        const stack = new Error().stack.split('\n');
        return stack[2]?.trim() || 'Unknown function';
    }

    async transactionLog(
        query: String,
        timeStamp: String,
        contextValue: object,
        functionName: string,
        isError: boolean,
        isClient: String,
    ) {
        const normalizedFunctionName = String(functionName || '');
        const functionPath = normalizedFunctionName.includes('dblib3/')
            ? normalizedFunctionName.split('dblib3/')[1] || ''
            : normalizedFunctionName;
        const functionParts = functionPath.split('/').filter(Boolean);
        let menuCode = functionParts[0] || 'addon';
        let src = functionParts[1] || 'unknown';

        console.log(`userInfo`, this.getUserInfo(contextValue).USER_ID);
        console.log(`timeStamp`, timeStamp);
        console.log(`menuCode`, menuCode);
        console.log(`src`, src);
        console.log(`Executing SQL: ${query}`);
        console.log(`isError: ${isError}`);

        await this.mysqlMutationLog({
            USER_ID: this.getUserInfo(contextValue).USER_ID,
            TIME_STAMP: timeStamp,
            MENU_CODE: menuCode,
            SRC: src,
            QUERY: query,
            IS_ERROR: isError,
            IS_CLIENT: isClient,
        });
    }

    async saveMongoDb(argData, argTable) {
        const client = new MongoClient(
            'mongodb://test:test1234@localhost:27017',
        );
        var mongo_db = '';
        try {
            await client.connect();
            mongo_db = client.db('afroba');
        } catch (error) {
            return -1;
        }

        var tTabName = argTable;
        var tSrcData = [];

        var tRet = 0;
        if ((await mongo_db.collection(tTabName).countDocuments()) === 0) {
            await mongo_db.collection(tTabName).insertMany(tRet_order);
            tRet = await mongo_db.collection(tTabName).countDocuments();
        } else {
            await mongo_db.collection(tTabName).drop();
            await mongo_db.collection(tTabName).insertMany(tRet_order);
            tRet = await mongo_db.collection(tTabName).countDocuments();
        }
        return tRet;
    }

    async getUserInfoSync(argData) {
        var tRet = {};
        var tCols = argData.token.split(':');

        let sql0 = `
            select
                *
            from
                kcd_user
            where
                user_id = '${tCols[0]}'
            update ksv_stock_idx
            set
                idx = idx + 1
        `;
        var tRet = await prisma.$queryRaw(Prisma.raw(sql0));

        if (tCols.length >= 2) {
            tRet.USER_ID = tCols[0];
            tRet.USER_NAME = tRet[0].USER_NAME;
            tRet.COMPANY_CODE = tRet[0].company_code;
        } else {
            tRet.USER_ID = '';
            tRet.USER_NAME = '';
            tRet.COMPANY_CODE = '';
        }
        return tRet;
    }

    async getBuyerInfo(buyerCd) {
        return (
            await prisma.$queryRaw(
                Prisma.raw(
                    `
                        select
                            *
                        from
                            kcd_buyer
                        where
                            buyer_cd = '${buyerCd}'
                    `,
                ),
            )
        )[0];
    }

    getUserInfo(argData) {
        var tRet = {};
        var tCols = String(argData?.token || '').split(':');

        if (tCols.length >= 2) {
            tRet.USER_ID = tCols[0];
            tRet.PART = tCols[1];
            tRet.FACTORY_CD = tCols[2];
            tRet.EMAIL = tCols[3];
        } else {
            tRet.USER_ID = '';
            tRet.PART = '';
            tRet.FACTORY_CD = '';
            tRet.EMAIL = '';
        }

        return tRet;
    }

    getBetweenDay(date1, date2) {
        var arg_date1 = `${date1.substring(0, 4)}-${date1.substring(4, 6)}-${date1.substring(6, 8)}`;
        var arg_date2 = `${date2.substring(0, 4)}-${date2.substring(4, 6)}-${date2.substring(6, 8)}`;
        const _date1 = new Date(arg_date1);
        const _date2 = new Date(arg_date2);
        const diffDate = _date1.getTime() - _date2.getTime();
        return Math.abs(diffDate / (1000 * 60 * 60 * 24));
    }

    getCurrTimeAdd(addDate) {
        var tAddDate = parseInt(addDate);
        var tDate0 = new Date();
        var tDate = new Date(tDate0.setDate(tDate0.getDate() + tAddDate));
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
        return tRetDate;
    }
    getDateFormat(argDate) {
        return `${argDate.substring(0, 4)}-${argDate.substring(4, 6)}-${argDate.substring(6, 8)}`;
    }
    getCurrTime() {
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
        return tRetDate;
    }
    printF_Space(argValue, argLength, argMode) {
        var argZero = '';
        var tIdx = 0;
        for (tIdx = 0; tIdx < argLength; tIdx++) {
            argZero += ' ';
        }

        var tRet = '';
        if (argMode === 'R') {
            tRet =
                argZero.substring(0, argLength - String(argValue).length) +
                String(argValue);
        } else {
            tRet =
                String(argValue) +
                argZero.substring(0, argLength - String(argValue).length);
        }
        return tRet;
    }
    printF(argValue, argLength) {
        var argZero = '';
        var tIdx = 0;
        for (tIdx = 0; tIdx < argLength; tIdx++) {
            argZero += '0';
        }

        var tRet =
            argZero.substring(0, argLength - String(argValue).length) +
            String(argValue);
        return tRet;
    }
    numToFixed(argValue: float, argPoint: int) {
        var tRet = Math.round(argValue * 10 ** argPoint);
        tRet = tRet / 10 ** argPoint;
        return parseFloat(tRet);
    }
    getFloat(argValue: float, argPoint: int) {
        var b = parseInt(argValue * 10 ** argPoint) / 10 ** argPoint;
        return b;
    }
    getRangeMonth(argValue: String, argRange: int) {
        var tMonth = argValue.substring(4, 6);
        var sMonth = 1;
        var eMonth = 1;

        var tVal = parseInt(tMonth);
        if (tVal < 3) {
            sMonth = 1;
            eMonth = tVal;
        } else {
            sMonth = tVal - 3;
            eMonth = tVal;
        }

        var sMonthStr = String(sMonth);
        var eMonthStr = String(eMonth);

        if (sMonth < 10) sMonthStr = '0' + sMonthStr;
        if (eMonth < 10) eMonthStr = '0' + eMonthStr;

        var tYear = argValue.substring(0, 4);
        var tRetObj = {};
        tRetObj.s_date = `${tYear}${sMonthStr}01`;
        tRetObj.e_date = `${tYear}${eMonthStr}31`;
        return tRetObj;
    }

    createTableSql(argTable: var, argValue: var) {
        var tKeys = Object.keys(argValue);
        var tIdx3 = 0;
        var tColumeStr = '';
        var tValueStr = '';
        for (tIdx3 = 0; tIdx3 < tKeys.length; tIdx3++) {
            var tKey = tKeys[tIdx3];
            var tValue = argValue[`${tKey}`];

            if (tValue === null) continue;

            if (tIdx3 === 0) {
                tColumeStr += tKey;
                tValueStr += `'${String(tValue).replace(/'/g, "''")}'`;
            } else {
                tColumeStr += ',' + tKey;
                tValueStr += ',' + `'${String(tValue).replace(/'/g, "''")}'`;
            }
        }
        var tRetSql =
            'insert into ' +
            argTable +
            '(' +
            tColumeStr +
            ') values (' +
            tValueStr +
            ')';
        return tRetSql;
    }

    updateTableSql(argTable: var, argValue: var) {
        var tKeys = Object.keys(argValue);
        var tIdx3 = 0;
        var tValueList = [];
        for (tIdx3 = 0; tIdx3 < tKeys.length; tIdx3++) {
            var tKey = tKeys[tIdx3];
            var tValue = argValue[`${tKey}`];

            if (tValue === null) continue;

            tValueList.push(`${tKey} = '${String(tValue).replace(/'/g, "''")}'`);
        }
        if (tValueList.length === 0) return null;
        var tValueStr = tValueList.join(',');
        var tRetSql = 'update ' + argTable + ' set ' + tValueStr + ' ';
        return tRetSql;
    }

    upsertTableSql(
        argTable: var,
        argValue: var,
        argSearchResult: var,
        argWhereValue: var,
    ) {
        if (argSearchResult && argSearchResult.length > 0) {
            var tWhereKeys = Object.keys(argWhereValue || {});
            var tWhereSql = '';
            var tIdx = 0;
            for (tIdx = 0; tIdx < tWhereKeys.length; tIdx++) {
                var tKey = tWhereKeys[tIdx];
                var tValue = argWhereValue[`${tKey}`];
                if (tValue === null) continue;

                if (tWhereSql === '') {
                    tWhereSql = `${tKey} = '${String(tValue).replace(/'/g, "''")}'`;
                } else {
                    tWhereSql += ` and ${tKey} = '${String(tValue).replace(/'/g, "''")}'`;
                }
            }

            var tUpdateSql = this.updateTableSql(argTable, argValue);
            if (tWhereSql !== '') {
                tUpdateSql += `where ${tWhereSql}`;
            }
            return tUpdateSql;
        }

        return this.createTableSql(argTable, argValue);
    }

    /* 메일 발송 */
    async afSendMail(option) {
        const transporter = nodemailer.createTransport(mailConfig);
        const mailOptions = {
            from: mailConfig.auth.user,
            to: option.to,
            cc: option.cc,
            bcc: option.bcc,
            subject: option.subject,
            html: option.html,
        };

        try {
            console.log(mailOptions);
            await transporter.sendMail(mailOptions);
            console.log('---------- Mail send Success:');
            await this.afSendMailLog({
                ...mailOptions,
                success: '1',
                err_msg: 'SUCCESS',
            });
        } catch (e) {
            console.log('---------- Mail send error:');
            await this.afSendMailLog({
                ...mailOptions,
                success: '0',
                err_msg: `${e.message}`,
            });
        }
    }

    async afSendMailLog(option) {
        return await mssql.mssqlExec(
            `
                insert into
                    af_mail_log (
                        addr_from,
                        addr_to,
                        addr_cc,
                        addr_bcc,
                        subject,
                        success,
                        err_msg
                    )
                values
                    (
                        '${option.from}',
                        '${option.to}',
                        '${option.cc || ''}',
                        '${option.bcc || ''}',
                        '${option.subject}',
                        '${option.success}',
                        '${option.err_msg}'
                    )
            `,
        );
    }
}

const AFLib = new CommLib();

export default AFLib;
