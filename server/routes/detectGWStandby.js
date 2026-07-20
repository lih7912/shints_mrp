const sql = require('mssql');
const config = require('./config');

const neoeDocStsComplete = '90';
const afrobaMrpGwStandby = '6';

async function detectVendor() {
    try {
        const pool = await new sql.ConnectionPool(config.mssqlConfig).connect();
        const neoePool = await new sql.ConnectionPool({
            ...config.mssqlNeoeConfig,
            database: 'NeoBizboxS2',
        }).connect();
        let detected = false;

        let resultVendor = await pool.query(`
            SELECT
                APPROKEY
            FROM
                KCD_VENDOR
            WHERE
                GW = '${afrobaMrpGwStandby}'
                AND APPROKEY <> ' '
        `);

        if (!resultVendor.recordset.length) {
            console.log('GW VENDOR 응답대기 없음');
            return;
        }

        let approKey = resultVendor.recordset[0].APPROKEY;
        console.log(`approKey : ${approKey}`);

        let resultDocSts = await pool.query(`
            select
                DOC_STS
            from
                BX.TEAG_APPDOC
            where
                approkey = '${APPROKEY}'
        `);

        if (!resultDocSts.recordset.length) {
            // NEOE에 없는 경우
            // 5분 뒤 한 번 더 검색
            setTimeout(async () => {
                let resultDocSts = await pool.query(`
                    select
                        DOC_STS
                    from
                        BX.TEAG_APPDOC
                    where
                        approkey = '${APPROKEY}'
                `);

                if (!resultDocSts.recordset.length) {
                    // NEOE에 없는 경우
                    detected = true;
                }
            });

            if (detected) {
                console.log('NEOE 내역 없음');
                await pool.query(
                    `
                        UPDATE KCD_VENDOR
                        SET
                            GW = ' '
                        WHERE
                            APPROKEY = ${approKey}
                    `,
                );
                await pool.query(
                    `
                        UPDATE KCD_VENDOR_BANK
                        SET
                            GW = ' '
                        WHERE
                            APPROKEY = ${approKey}
                    `,
                );
                detected = false;
            }
        } else if (resultDocSts.recordset[0].DOC_STS == neoeDocStsComplete) {
            console.log('NEOE 종결됨');
            await pool.query(
                `
                    UPDATE KCD_VENDOR
                    SET
                        GW = '2'
                    WHERE
                        APPROKEY = ${approKey}
                `,
            );
            await pool.query(
                `
                    UPDATE KCD_VENDOR_BANK
                    SET
                        GW = '2'
                    WHERE
                        APPROKEY = ${approKey}
                `,
            );
        }

        // MAIL 전송
        const nodemailer = require('nodemailer');
        const transporter = nodemailer.createTransport(config.mailParameter);

        const mailOptions = {
            from: config.mailParameter.from,
            to: 'lih7912@autostock.co.kr',
            subject: 'DETECTED GW STATUS afrobaMrpGwStandby(6)',
            html: `
DETECTED GW STATUS afrobaMrpGwStandby(6) at ${new Date()}<br>
<br>
${JSON.stringify(resultVendor.recordset)}
`,
        };

        try {
            await transporter.sendMail(mailOptions);
        } catch (mailErr) {
            console.error('Failed to send email:', mailErr);
        }

        await pool.close();
        await neoePool.close();
    } catch (err) {
        console.error('Database query failed:', err);
    }
}

// 10분마다 detect 함수 실행
if (!config.thisIsTestServer) {
    //detectVendor();
    //setInterval(detectVendor, 10 * 60 * 1000);
}
