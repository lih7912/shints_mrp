const sql = require('mssql');
const config = require('./config');
const moment = require('moment');

const yyyymmdd = moment().format('YYYYMMDD');

async function runQuery() {
    let neoePool;
    try {
        neoePool = await new sql.ConnectionPool(
            config.mssqlNeoeConfig,
        ).connect();
        const result = await neoePool.query`
            SELECT
                CURR_SOUR,
                ISNULL(RATE_BASE, '0.00') AS RATE_BASE
            FROM
                neoe.MA_EXCHANGE
            WHERE
                cd_company = '1000'
                AND YYMMDD = ${yyyymmdd}
        `;

        const recordset = result.recordset;
        const targetCurrencies = [
            'KRW',
            '001',
            '002',
            '003',
            '004',
            'GBP',
            'CHF',
            'HKD',
            'IDR',
            'VND',
            'ETB',
        ];

        // 통화명 매핑
        const currencyMap = {
            '001': 'USD',
            '002': 'JPY',
            '003': 'EUR',
            '004': 'CNY',
        };

        // 필터링
        const filtered = recordset.filter((r) =>
            targetCurrencies.includes(r.CURR_SOUR),
        );

        // 기준 환율 설정
        let standardRate = -1;
        for (const record of filtered) {
            if (record.CURR_SOUR === '001') {
                standardRate = parseFloat(record.RATE_BASE);
                break;
            }
        }

        if (standardRate === -1) {
            console.error('기준 환율 (001)이 존재하지 않습니다.');
            return;
        }

        // 기준 환율 기반으로 계산
        const results = filtered.map((record) => {
            const rateBase = parseFloat(record.RATE_BASE);
            const usdRate = rateBase / standardRate;
            const currencyName =
                currencyMap[record.CURR_SOUR] || record.CURR_SOUR;

            return {
                CURRENCY: currencyName,
                USD_RATE:
                    currencyName === 'JPY'
                        ? (usdRate / 100.0).toFixed(8)
                        : usdRate.toFixed(8),
                RATE_BASE: rateBase.toFixed(8),
            };
        });

        results.unshift({
            CURRENCY: 'KRW',
            USD_RATE: (1 / standardRate).toFixed(8),
            RATE_BASE: 1,
        });
        console.log(results);
        await runInsert(results);
    } catch (err) {
        console.error('SQL 오류:', err);
    } finally {
        await neoePool.close();
    }
}

async function runInsert(results) {
    let insertPool;
    try {
        insertPool = await new sql.ConnectionPool(config.mssqlConfig).connect();

        // 기존 데이터 삭제
        await insertPool
            .request()
            .input('START_DATE', sql.VarChar(8), yyyymmdd)
            .query(
                `
                    DELETE FROM dbo.KCD_CURRENCY
                    WHERE
                        START_DATE = @START_DATE
                `,
            );

        for (const row of results) {
            await insertPool
                .request()
                .input('START_DATE', sql.VarChar(8), yyyymmdd)
                .input('CURR_CD', sql.VarChar(3), row.CURRENCY)
                .input('WON_AMT', sql.Decimal(18, 8), parseFloat(row.RATE_BASE))
                .input(
                    'WON_AMT2',
                    sql.Decimal(18, 8),
                    parseFloat(row.RATE_BASE),
                )
                .input('USD_RATE', sql.Decimal(18, 8), parseFloat(row.USD_RATE))
                .query(`
                    INSERT INTO
                        dbo.KCD_CURRENCY (START_DATE, CURR_CD, WON_AMT, WON_AMT2, USD_RATE)
                    VALUES
                        (
                            @START_DATE,
                            @CURR_CD,
                            @WON_AMT,
                            @WON_AMT2,
                            @USD_RATE
                        )
                `);
        }

        console.log('모든 데이터가 성공적으로 삽입되었습니다.');
    } catch (err) {
        console.error('INSERT 오류:', err);
    } finally {
        if (insertPool) await insertPool.close();
    }
}

runQuery();
