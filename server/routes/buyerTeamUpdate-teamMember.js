const sql = require('mssql');
const config = require('./config');

const buyerUserList = [
    { buyer_cd: '1N', user_id: 'Roly' },
    { buyer_cd: 'NN', user_id: 'Roly' },
    { buyer_cd: 'NR', user_id: 'Roly' },
    { buyer_cd: 'NT', user_id: 'Roly' },
    { buyer_cd: 'AU', user_id: 'MIn' },
    { buyer_cd: 'BD', user_id: 'Dani' },
    { buyer_cd: 'DN', user_id: 'Dani' },
    { buyer_cd: 'BP', user_id: 'Doris' },
    { buyer_cd: 'ND', user_id: 'Min' },
    { buyer_cd: 'RN', user_id: 'Roly' },
    { buyer_cd: 'GD', user_id: 'Roly' },
    { buyer_cd: '2W', user_id: 'Doris' },
    { buyer_cd: 'WB', user_id: 'Doris' },
    { buyer_cd: 'WF', user_id: 'Doris' },
    { buyer_cd: 'WG', user_id: 'Doris' },
    { buyer_cd: 'WM', user_id: 'Doris' },
    { buyer_cd: 'BU', user_id: 'Dani' },
    { buyer_cd: 'LU', user_id: 'Dani' },
    { buyer_cd: 'KR', user_id: 'Dani' },
    { buyer_cd: 'KU', user_id: 'Dani' },

    { buyer_cd: 'BN', user_id: 'Roly' },
    { buyer_cd: 'LS', user_id: 'Dani' },
    { buyer_cd: 'KM', user_id: 'Roly' },
    { buyer_cd: 'KL', user_id: 'Janny' },
    { buyer_cd: 'PG', user_id: 'Min' },
    { buyer_cd: 'SZ', user_id: 'Min' },
    { buyer_cd: 'ZJ', user_id: 'Doris' },
    { buyer_cd: 'BE', user_id: 'Min' },
    { buyer_cd: 'MG', user_id: 'Aki' },
    { buyer_cd: 'MK', user_id: 'Aki' },
    { buyer_cd: 'ME', user_id: 'Aki' },
    { buyer_cd: 'TD', user_id: 'Doris' },
    { buyer_cd: 'NB', user_id: 'Min' },
    { buyer_cd: 'GG', user_id: 'Roly' },
    { buyer_cd: '9B', user_id: 'Doris' },
    { buyer_cd: '9I', user_id: 'Doris' },
    { buyer_cd: '9K', user_id: 'Doris' },
    { buyer_cd: '9L', user_id: 'Doris' },
    { buyer_cd: '9O', user_id: 'Doris' },
    { buyer_cd: '9S', user_id: 'Doris' },
    { buyer_cd: '9C', user_id: 'Doris' },
    { buyer_cd: '9P', user_id: 'Doris' },
    { buyer_cd: 'ML', user_id: 'Doris' },
    { buyer_cd: 'MI', user_id: 'Roly' },
    { buyer_cd: 'MY', user_id: 'Roly' },

    { buyer_cd: 'AE', user_id: 'Min' },
    { buyer_cd: 'AD', user_id: 'Min' },
    { buyer_cd: 'GT', user_id: 'Dani' },
    { buyer_cd: 'KP', user_id: 'MIn' },
    { buyer_cd: 'PN', user_id: 'Min' },
    { buyer_cd: 'RO', user_id: 'Diuptt' },
    { buyer_cd: 'TO', user_id: 'Doris' },
    { buyer_cd: 'HO', user_id: 'Doris' },
    { buyer_cd: 'HS', user_id: 'Aki' },
    { buyer_cd: 'IM', user_id: 'Doris' },
    { buyer_cd: 'IS', user_id: 'Doris' },
    { buyer_cd: 'SF', user_id: 'Dani' },
    { buyer_cd: 'SP', user_id: 'Dani' },
    { buyer_cd: 'SK', user_id: 'Diuptt' },
    { buyer_cd: 'SM', user_id: 'Dani' },
    { buyer_cd: 'KK', user_id: 'Doris' },
    { buyer_cd: 'LV', user_id: 'Roly' },
    { buyer_cd: 'TL', user_id: 'Doris' },
    { buyer_cd: 'AK', user_id: 'Roly' },
    { buyer_cd: 'FF', user_id: 'Roly' },
    { buyer_cd: 'KS', user_id: 'dani' },
    { buyer_cd: 'NE', user_id: 'Roly' },
    { buyer_cd: 'TK', user_id: 'Dani' },
    { buyer_cd: 'TS', user_id: 'Roly' },
    { buyer_cd: 'YE', user_id: 'Janny' },
    { buyer_cd: 'CR', user_id: 'Doris' },

    { buyer_cd: 'AP', user_id: 'Min' },
    { buyer_cd: 'BR', user_id: 'Dani' },
    { buyer_cd: 'BS', user_id: 'Dani' },
    { buyer_cd: 'LW', user_id: 'Doris' },
    { buyer_cd: 'RM', user_id: 'Min' },
    { buyer_cd: 'PE', user_id: 'Min' },
    { buyer_cd: 'DE', user_id: 'Diuptt' },
    { buyer_cd: 'DM', user_id: 'Dani' },
    { buyer_cd: 'OL', user_id: 'Min' },
    { buyer_cd: 'OS', user_id: 'Janny' },
    { buyer_cd: 'SV', user_id: 'Roly' },
    { buyer_cd: 'AB', user_id: 'Doris' },
    { buyer_cd: 'RV', user_id: 'Roly' },
    { buyer_cd: 'JJ', user_id: 'Min' },
    { buyer_cd: 'KO', user_id: 'Doris' },
    { buyer_cd: 'PK', user_id: 'Dani' },
    { buyer_cd: 'TR', user_id: 'Dani' },
    { buyer_cd: 'SC', user_id: 'Roly' },
    { buyer_cd: 'NK', user_id: 'Doris' },
    { buyer_cd: 'FL', user_id: 'Doris' },
    { buyer_cd: 'FK', user_id: 'Doris' },
    { buyer_cd: 'ML', user_id: 'Min' },
    { buyer_cd: 'PA', user_id: 'Min' },
    { buyer_cd: 'NE', user_id: 'Roly' },
];

async function processBuyerUpdates() {
    try {
        const pool = await sql.connect(config.mssqlConfig);

        for (const { buyer_cd, user_id } of buyerUserList) {
            // 1. USER 조회 (대소문자 무시)
            const userResult = await pool
                .request()
                .input('user_id', sql.VarChar, user_id).query(`
                    SELECT
                        USER_ID,
                        USER_NAME,
                        PART
                    FROM
                        KCD_USER
                    WHERE
                        LOWER(USER_ID) = LOWER(@user_id)
                `);

            if (userResult.recordset.length === 0) {
                console.log(`[SKIP] USER_ID not found: ${user_id}`);
                continue;
            }

            const { USER_ID, USER_NAME, PART } = userResult.recordset[0];

            // 2. PART 기준으로 FACTORY, TEAM 결정
            let FACTORY = '서울';
            let TEAM = 'SMC1';

            if (PART?.startsWith('V')) {
                FACTORY = 'BVT';
                TEAM = 'PUR';
            } else if (PART?.startsWith('E')) {
                FACTORY = 'ETP';
                TEAM = 'PUR';
            }

            // 3. 기존 USER_ID 존재 여부 확인
            const existingResult = await pool
                .request()
                .input('buyer_cd', sql.VarChar, buyer_cd)
                .input('factory', sql.VarChar, FACTORY)
                .input('team', sql.VarChar, TEAM).query(`
                    SELECT
                        USER_ID
                    FROM
                        KCD_BUYER_TEAM_INFO
                    WHERE
                        BUYER_CD = @buyer_cd
                        AND FACTORY = @factory
                        AND TEAM = @team
                `);

            const existingUserId = existingResult.recordset[0]?.USER_ID;
            if (existingUserId) {
                console.log(
                    `[SKIP] Already exists: BUYER_CD=${buyer_cd}, USER_ID=${existingUserId}`,
                );
                continue;
            }

            // 4. UPDATE 시도
            const updateResult = await pool
                .request()
                .input('user_id', sql.VarChar, USER_ID)
                .input('user_name', sql.NVarChar, USER_NAME)
                .input('buyer_cd', sql.VarChar, buyer_cd)
                .input('factory', sql.VarChar, FACTORY)
                .input('team', sql.VarChar, TEAM).query(`
                    UPDATE KCD_BUYER_TEAM_INFO
                    SET
                        USER_ID = @user_id,
                        USER_NAME = @user_name
                    WHERE
                        BUYER_CD = @buyer_cd
                        AND FACTORY = @factory
                        AND TEAM = @team
                `);

            if (updateResult.rowsAffected[0] === 0) {
                // 5. UPDATE 실패 → INSERT
                await pool
                    .request()
                    .input('buyer_cd', sql.VarChar, buyer_cd)
                    .input('factory', sql.VarChar, FACTORY)
                    .input('team', sql.VarChar, TEAM)
                    .input('user_id', sql.VarChar, USER_ID)
                    .input('user_name', sql.NVarChar, USER_NAME).query(`
                        INSERT INTO
                            KCD_BUYER_TEAM_INFO (BUYER_CD, FACTORY, TEAM, USER_ID, USER_NAME)
                        VALUES
                            (@buyer_cd, @factory, @team, @user_id, @user_name)
                    `);

                console.log(
                    `[INSERTED] BUYER_CD=${buyer_cd}, USER_ID=${USER_ID}, FACTORY=${FACTORY}, TEAM=${TEAM}`,
                );
            } else {
                console.log(
                    `[UPDATED] BUYER_CD=${buyer_cd}, USER_ID=${USER_ID}, FACTORY=${FACTORY}, TEAM=${TEAM}`,
                );
            }
        }

        await sql.close();
        console.log('✅ 모든 작업 완료!');
    } catch (err) {
        console.error('❌ 에러 발생:', err);
    }
}

processBuyerUpdates();
