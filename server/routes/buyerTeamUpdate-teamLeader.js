const sql = require('mssql');
const config = require('./config');

const dataList = [
    {
        user_id: 'chuck',
        user_name: '한상협(chuck)',
        buyer_cd: '1N',
        team: 'smc',
    },
    {
        user_id: 'chuck',
        user_name: '한상협(chuck)',
        buyer_cd: 'NN',
        team: 'smc',
    },
    {
        user_id: 'chuck',
        user_name: '한상협(chuck)',
        buyer_cd: 'NR',
        team: 'smc',
    },
    {
        user_id: 'chuck',
        user_name: '한상협(chuck)',
        buyer_cd: 'NT',
        team: 'smc',
    },
    {
        user_id: 'chuck',
        user_name: '한상협(chuck)',
        buyer_cd: 'AU',
        team: 'smc',
    },
    {
        user_id: 'chuck',
        user_name: '한상협(chuck)',
        buyer_cd: 'BD',
        team: 'smc',
    },
    {
        user_id: 'chuck',
        user_name: '한상협(chuck)',
        buyer_cd: 'DN',
        team: 'smc',
    },
    {
        user_id: 'chuck',
        user_name: '한상협(chuck)',
        buyer_cd: 'BP',
        team: 'smc',
    },
    {
        user_id: 'chuck',
        user_name: '한상협(chuck)',
        buyer_cd: 'ND',
        team: 'smc',
    },
    {
        user_id: 'chuck',
        user_name: '한상협(chuck)',
        buyer_cd: 'RN',
        team: 'smc',
    },
    {
        user_id: 'chuck',
        user_name: '한상협(chuck)',
        buyer_cd: 'GD',
        team: 'smc',
    },
    {
        user_id: 'chuck',
        user_name: '한상협(chuck)',
        buyer_cd: '2W',
        team: 'smc',
    },
    {
        user_id: 'chuck',
        user_name: '한상협(chuck)',
        buyer_cd: 'WB',
        team: 'smc',
    },
    {
        user_id: 'chuck',
        user_name: '한상협(chuck)',
        buyer_cd: 'WF',
        team: 'smc',
    },
    {
        user_id: 'chuck',
        user_name: '한상협(chuck)',
        buyer_cd: 'WG',
        team: 'smc',
    },
    {
        user_id: 'chuck',
        user_name: '한상협(chuck)',
        buyer_cd: 'WM',
        team: 'smc',
    },
    {
        user_id: 'chuck',
        user_name: '한상협(chuck)',
        buyer_cd: 'BU',
        team: 'smc',
    },
    {
        user_id: 'chuck',
        user_name: '한상협(chuck)',
        buyer_cd: 'LU',
        team: 'smc',
    },
    {
        user_id: 'chuck',
        user_name: '한상협(chuck)',
        buyer_cd: 'KR',
        team: 'smc',
    },
    {
        user_id: 'chuck',
        user_name: '한상협(chuck)',
        buyer_cd: 'KU',
        team: 'smc',
    },

    { user_id: 'sunny', user_name: 'Sunny(MD)', buyer_cd: 'BN', team: 'smc' },
    { user_id: 'sunny', user_name: 'Sunny(MD)', buyer_cd: 'LS', team: 'smc' },
    { user_id: 'sunny', user_name: 'Sunny(MD)', buyer_cd: 'KM', team: 'smc' },
    { user_id: 'sunny', user_name: 'Sunny(MD)', buyer_cd: 'KL', team: 'smc' },
    { user_id: 'sunny', user_name: 'Sunny(MD)', buyer_cd: 'PG', team: 'smc' },
    { user_id: 'sunny', user_name: 'Sunny(MD)', buyer_cd: 'SZ', team: 'smc' },
    { user_id: 'sunny', user_name: 'Sunny(MD)', buyer_cd: 'ZJ', team: 'smc' },
    { user_id: 'sunny', user_name: 'Sunny(MD)', buyer_cd: 'BE', team: 'smc' },
    { user_id: 'sunny', user_name: 'Sunny(MD)', buyer_cd: 'MG', team: 'smc' },
    { user_id: 'sunny', user_name: 'Sunny(MD)', buyer_cd: 'MK', team: 'smc' },
    { user_id: 'sunny', user_name: 'Sunny(MD)', buyer_cd: 'ME', team: 'smc' },
    { user_id: 'sunny', user_name: 'Sunny(MD)', buyer_cd: 'TD', team: 'smc' },
    { user_id: 'sunny', user_name: 'Sunny(MD)', buyer_cd: 'NB', team: 'smc' },
    { user_id: 'sunny', user_name: 'Sunny(MD)', buyer_cd: 'GG', team: 'smc' },
    { user_id: 'sunny', user_name: 'Sunny(MD)', buyer_cd: '9B', team: 'smc' },
    { user_id: 'sunny', user_name: 'Sunny(MD)', buyer_cd: '9I', team: 'smc' },
    { user_id: 'sunny', user_name: 'Sunny(MD)', buyer_cd: '9K', team: 'smc' },
    { user_id: 'sunny', user_name: 'Sunny(MD)', buyer_cd: '9L', team: 'smc' },
    { user_id: 'sunny', user_name: 'Sunny(MD)', buyer_cd: '9O', team: 'smc' },
    { user_id: 'sunny', user_name: 'Sunny(MD)', buyer_cd: '9S', team: 'smc' },
    { user_id: 'sunny', user_name: 'Sunny(MD)', buyer_cd: '9C', team: 'smc' },
    { user_id: 'sunny', user_name: 'Sunny(MD)', buyer_cd: '9P', team: 'smc' },
    { user_id: 'sunny', user_name: 'Sunny(MD)', buyer_cd: 'ML', team: 'smc' },
    { user_id: 'sunny', user_name: 'Sunny(MD)', buyer_cd: 'MI', team: 'smc' },
    { user_id: 'sunny', user_name: 'Sunny(MD)', buyer_cd: 'MY', team: 'smc' },

    {
        user_id: 'chelsea',
        user_name: '최재인(Chelsea)',
        buyer_cd: 'AE',
        team: 'smc',
    },
    {
        user_id: 'chelsea',
        user_name: '최재인(Chelsea)',
        buyer_cd: 'AD',
        team: 'smc',
    },
    {
        user_id: 'chelsea',
        user_name: '최재인(Chelsea)',
        buyer_cd: 'GT',
        team: 'smc',
    },
    {
        user_id: 'chelsea',
        user_name: '최재인(Chelsea)',
        buyer_cd: 'KP',
        team: 'smc',
    },
    {
        user_id: 'chelsea',
        user_name: '최재인(Chelsea)',
        buyer_cd: 'PN',
        team: 'smc',
    },
    {
        user_id: 'chelsea',
        user_name: '최재인(Chelsea)',
        buyer_cd: 'RO',
        team: 'smc',
    },
    {
        user_id: 'chelsea',
        user_name: '최재인(Chelsea)',
        buyer_cd: 'TO',
        team: 'smc',
    },
    {
        user_id: 'chelsea',
        user_name: '최재인(Chelsea)',
        buyer_cd: 'HO',
        team: 'smc',
    },
    {
        user_id: 'chelsea',
        user_name: '최재인(Chelsea)',
        buyer_cd: 'HS',
        team: 'smc',
    },
    {
        user_id: 'chelsea',
        user_name: '최재인(Chelsea)',
        buyer_cd: 'IM',
        team: 'smc',
    },
    {
        user_id: 'chelsea',
        user_name: '최재인(Chelsea)',
        buyer_cd: 'IS',
        team: 'smc',
    },
    {
        user_id: 'chelsea',
        user_name: '최재인(Chelsea)',
        buyer_cd: 'SF',
        team: 'smc',
    },
    {
        user_id: 'chelsea',
        user_name: '최재인(Chelsea)',
        buyer_cd: 'SP',
        team: 'smc',
    },
    {
        user_id: 'chelsea',
        user_name: '최재인(Chelsea)',
        buyer_cd: 'SK',
        team: 'smc',
    },
    {
        user_id: 'chelsea',
        user_name: '최재인(Chelsea)',
        buyer_cd: 'SM',
        team: 'smc',
    },
    {
        user_id: 'chelsea',
        user_name: '최재인(Chelsea)',
        buyer_cd: 'KK',
        team: 'smc',
    },
    {
        user_id: 'chelsea',
        user_name: '최재인(Chelsea)',
        buyer_cd: 'LV',
        team: 'smc',
    },
    {
        user_id: 'chelsea',
        user_name: '최재인(Chelsea)',
        buyer_cd: 'TL',
        team: 'smc',
    },
    {
        user_id: 'chelsea',
        user_name: '최재인(Chelsea)',
        buyer_cd: 'AK',
        team: 'smc',
    },
    {
        user_id: 'chelsea',
        user_name: '최재인(Chelsea)',
        buyer_cd: 'FF',
        team: 'smc',
    },
    {
        user_id: 'chelsea',
        user_name: '최재인(Chelsea)',
        buyer_cd: 'KS',
        team: 'smc',
    },
    {
        user_id: 'chelsea',
        user_name: '최재인(Chelsea)',
        buyer_cd: 'NE',
        team: 'smc',
    },
    {
        user_id: 'chelsea',
        user_name: '최재인(Chelsea)',
        buyer_cd: 'TK',
        team: 'smc',
    },
    {
        user_id: 'chelsea',
        user_name: '최재인(Chelsea)',
        buyer_cd: 'TS',
        team: 'smc',
    },
    {
        user_id: 'chelsea',
        user_name: '최재인(Chelsea)',
        buyer_cd: 'YE',
        team: 'smc',
    },
    {
        user_id: 'chelsea',
        user_name: '최재인(Chelsea)',
        buyer_cd: 'CR',
        team: 'smc',
    },

    {
        user_id: 'trudy',
        user_name: '조은주(trudy)',
        buyer_cd: 'AP',
        team: 'smc',
    },
    {
        user_id: 'trudy',
        user_name: '조은주(trudy)',
        buyer_cd: 'BR',
        team: 'smc',
    },
    {
        user_id: 'trudy',
        user_name: '조은주(trudy)',
        buyer_cd: 'BS',
        team: 'smc',
    },
    {
        user_id: 'trudy',
        user_name: '조은주(trudy)',
        buyer_cd: 'LW',
        team: 'smc',
    },
    {
        user_id: 'trudy',
        user_name: '조은주(trudy)',
        buyer_cd: 'RM',
        team: 'smc',
    },
    {
        user_id: 'trudy',
        user_name: '조은주(trudy)',
        buyer_cd: 'PE',
        team: 'smc',
    },
    {
        user_id: 'trudy',
        user_name: '조은주(trudy)',
        buyer_cd: 'DE',
        team: 'smc',
    },
    {
        user_id: 'trudy',
        user_name: '조은주(trudy)',
        buyer_cd: 'DM',
        team: 'smc',
    },
    {
        user_id: 'trudy',
        user_name: '조은주(trudy)',
        buyer_cd: 'OL',
        team: 'smc',
    },
    {
        user_id: 'trudy',
        user_name: '조은주(trudy)',
        buyer_cd: 'OS',
        team: 'smc',
    },
    {
        user_id: 'trudy',
        user_name: '조은주(trudy)',
        buyer_cd: 'SV',
        team: 'smc',
    },
    {
        user_id: 'trudy',
        user_name: '조은주(trudy)',
        buyer_cd: 'AB',
        team: 'smc',
    },
    {
        user_id: 'trudy',
        user_name: '조은주(trudy)',
        buyer_cd: 'RV',
        team: 'smc',
    },
    {
        user_id: 'trudy',
        user_name: '조은주(trudy)',
        buyer_cd: 'JJ',
        team: 'smc',
    },
    {
        user_id: 'trudy',
        user_name: '조은주(trudy)',
        buyer_cd: 'KO',
        team: 'smc',
    },
    {
        user_id: 'trudy',
        user_name: '조은주(trudy)',
        buyer_cd: 'PK',
        team: 'smc',
    },
    {
        user_id: 'trudy',
        user_name: '조은주(trudy)',
        buyer_cd: 'TR',
        team: 'smc',
    },
    {
        user_id: 'trudy',
        user_name: '조은주(trudy)',
        buyer_cd: 'SC',
        team: 'smc',
    },
    {
        user_id: 'trudy',
        user_name: '조은주(trudy)',
        buyer_cd: 'NK',
        team: 'smc',
    },
    {
        user_id: 'trudy',
        user_name: '조은주(trudy)',
        buyer_cd: 'FL',
        team: 'smc',
    },
    {
        user_id: 'trudy',
        user_name: '조은주(trudy)',
        buyer_cd: 'FK',
        team: 'smc',
    },
    {
        user_id: 'trudy',
        user_name: '조은주(trudy)',
        buyer_cd: 'ML',
        team: 'smc',
    },
    {
        user_id: 'trudy',
        user_name: '조은주(trudy)',
        buyer_cd: 'PA',
        team: 'smc',
    },
    {
        user_id: 'trudy',
        user_name: '조은주(trudy)',
        buyer_cd: 'NE',
        team: 'smc',
    },
];

async function updateBuyerTeamInfo() {
    try {
        const pool = await sql.connect(config.mssqlConfig);

        for (const item of dataList) {
            const { user_id, user_name, buyer_cd, team } = item;

            const result = await pool
                .request()
                .input('buyer_cd', sql.VarChar, buyer_cd)
                .input('team', sql.VarChar, team).query(`
                    SELECT
                        USER_ID
                    FROM
                        KCD_BUYER_TEAM_INFO
                    WHERE
                        BUYER_CD = @buyer_cd
                        AND TEAM = @team
                `);

            const record = result.recordset[0];

            if (!record || !record.USER_ID) {
                console.log(`Updating: ${buyer_cd} / ${team} -> ${user_id}`);

                await pool
                    .request()
                    .input('user_id', sql.VarChar, user_id)
                    .input('user_name', sql.NVarChar, user_name)
                    .input('buyer_cd', sql.VarChar, buyer_cd)
                    .input('team', sql.VarChar, team).query(`
                        UPDATE KCD_BUYER_TEAM_INFO
                        SET
                            USER_ID = @user_id,
                            USER_NAME = @user_name
                        WHERE
                            BUYER_CD = @buyer_cd
                            AND TEAM = @team
                    `);
            } else {
                console.log(
                    `Skipping: ${buyer_cd} / ${team} already has USER_ID`,
                );
            }
        }

        await sql.close();
        console.log('Update process completed!');
    } catch (err) {
        console.error('Error:', err);
    }
}

updateBuyerTeamInfo();
