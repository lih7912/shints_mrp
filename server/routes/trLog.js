const router = require('express').Router;
const trLog = router();
const { mysqlExec } = require('./mysqlExec');

setInterval(async () => {
    try {
        await mysqlExec(
            `
                DELETE FROM AF_TRANSACTION_LOG
                WHERE
                    timestamp < NOW () - INTERVAL 365 DAY
            `,
        );
    } catch (e) {}
}, 3600000).unref();

trLog.all('/tr_log/basic_info', async (req, res) => {
    let userId = req.body.userId;
    let menuCode = req.body.menuCode;
    let keyword = req.body.keyword;
    let seq = req.body.seq;
    let searchDate = req.body.searchDate;
    let page = req.body.page || 1;

    const pageSize = 1000;
    const offset = (page - 1) * pageSize;

    let query = `
        select
            user_id,
            DATE_FORMAT (timestamp, '%Y-%m-%d %H:%i:%s') AS timestamp,
            menu_code,
            src,
            transaction_seq
        from
            AF_TRANSACTION_LOG
        where
            1 = 1
    `;

    if (userId) {
        query += `and user_id like '%${userId}%' `;
    }

    if (menuCode) {
        query += `and menu_code like '%${menuCode}%' `;
    }

    if (keyword) {
        query += `and query like '%${keyword}%' `;
    }

    if (seq) {
        query += `and transaction_seq >= ${Number(seq)} `;
    }

    if (searchDate) {
        query += `and timestamp >= '${searchDate} 00:00:00'
                  and timestamp <= '${searchDate} 23:59:59' `;
    }

    if (seq) {
        query += `order by transaction_seq LIMIT ${pageSize}`;
    } else {
        query += `order by transaction_seq desc LIMIT ${pageSize} OFFSET ${offset}`;
    }

    console.log(query);

    res.send(JSON.stringify(await mysqlExec(query)));
});

trLog.all('/tr_log/query', async (req, res) => {
    let seq = req.body.seq;

    let query = `
        select
            query
        from
            AF_TRANSACTION_LOG
        where
            1 = 1
            and transaction_seq = ${seq}
    `;

    res.send(JSON.stringify(await mysqlExec(query)));
});

module.exports = trLog;
