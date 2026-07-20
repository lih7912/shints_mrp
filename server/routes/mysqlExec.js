const { mysqlConfig } = require('./config.js');
const mysql = require('mysql2/promise');

// MySQL Pool 설정
const poolConfig = {
    host: mysqlConfig.host,
    user: mysqlConfig.user,
    password: mysqlConfig.password,
    database: mysqlConfig.database,
    port: mysqlConfig.port || 3306,

    waitForConnections: true,
    connectionLimit: mysqlConfig.connectionLimit || 50,
    queueLimit: 0,

    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
    connectTimeout: 10000,
};

const pool = mysql.createPool(poolConfig);

// 공용 쿼리 실행 함수
async function mysqlExec(sql, params = []) {
    try {
        const [rows] = await pool.query(sql, params);
        return rows;
    } catch (err) {
        console.error('MySQL Query Error:', err.code, err.message);
        throw err;
    }
}

// Pool 종료 처리
const closePool = async () => {
    try {
        await pool.end();
        console.log('MySQL pool closed.');
    } catch (e) {
        console.error('Error closing MySQL pool:', e.message);
    }
};

// 정상 종료 시 pool 정리
process.on('SIGINT', async () => {
    await closePool();
    process.exit(0);
});

// 예외 로깅 (pool은 자동 회수됨)
process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION:', err);
});

process.on('unhandledRejection', (err) => {
    console.error('UNHANDLED REJECTION:', err);
});

module.exports = { mysqlExec, pool };
