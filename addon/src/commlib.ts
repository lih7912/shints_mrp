const mysqlConfig = require('../routes/config.js').mysqlConfig;
const mysql = require('mysql2/promise');

class CommLib {
    getUserInfo(argData) {
        const token = argData?.token || '';
        const tCols = String(token).split(':');

        return {
            USER_ID: tCols[0] || '',
            PART: tCols[1] || '',
            FACTORY_CD: tCols[2] || '',
            EMAIL: tCols[3] || '',
        };
    }

    parseFunctionName(functionName: string) {
        const normalizedName = String(functionName || '');

        if (normalizedName.includes('dblib3/')) {
            const normalized = normalizedName.split('dblib3/')[1] || '';
            const segments = normalized.split('/').filter(Boolean);
            return {
                menuCode: segments[0] || 'addon',
                src: segments[1] || 'unknown',
            };
        }

        const normalized = normalizedName.replace(/^\/+/, '');
        const segments = normalized.split('/').filter(Boolean);

        return {
            menuCode: segments[0] || 'addon',
            src: segments[1] || segments[0] || 'restapi',
        };
    }

    async mysqlMutationLog(mutationInfo) {
        const rawQuery = String(mutationInfo.QUERY || '').trim();
        const firstKeyword = rawQuery.split(/\s+/)[0]?.toUpperCase() || '';
        const formattedQuery = rawQuery;

        if (['SELECT', 'BEGIN', 'COMMIT'].includes(firstKeyword)) {
            return { skipped: true, reason: 'read-or-control-query' };
        }

        let pool;
        let connection;

        try {
            pool = await mysql.createPool(mysqlConfig);
            connection = await pool.getConnection();

            const sqlQuery = `
                INSERT INTO AF_TRANSACTION_LOG (USER_ID, TIMESTAMP, MENU_CODE, SRC, QUERY)
                VALUES (?, ?, ?, ?, ?)
            `;

            const [result] = await connection.execute(sqlQuery, [
                mutationInfo.USER_ID ?? '',
                mutationInfo.TIME_STAMP ?? new Date().toISOString().slice(0, 19).replace('T', ' '),
                mutationInfo.MENU_CODE ?? '',
                mutationInfo.IS_ERROR
                    ? `${mutationInfo.SRC ?? ''}:ERROR`
                    : mutationInfo.SRC ?? '',
                formattedQuery,
            ]);

            return result;
        } catch (error: any) {
            console.error('[addon-transaction-log] failed:', error?.message || error);
            return { error: String(error?.message || error) };
        } finally {
            if (connection) {
                connection.release();
            }
            if (pool) {
                await pool.end();
            }
        }
    }

    async transactionLog(
        query: String,
        timeStamp: String,
        contextValue: object,
        functionName: string,
        isError: boolean,
        isClient: String,
    ) {
        const { menuCode, src } = this.parseFunctionName(functionName);
        const user = this.getUserInfo(contextValue);

        await this.mysqlMutationLog({
            USER_ID: user.USER_ID,
            TIME_STAMP: timeStamp,
            MENU_CODE: menuCode,
            SRC: src,
            QUERY: query,
            IS_ERROR: isError,
            IS_CLIENT: isClient,
        });
    }
}

const commlib = new CommLib();
export default commlib;
