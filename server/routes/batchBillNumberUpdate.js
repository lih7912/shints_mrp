const fs = require('fs');
const path = require('path');
const { mssqlExec } = require('./mssqlExec');

const inputFile = path.join(__dirname, 'batchBillNumber.txt');
const outputFile = path.join(__dirname, 'batchOutput.txt');

async function processBatch() {
    const lines = fs.readFileSync(inputFile, 'utf-8').trim().split('\n');
    const output = [];

    for (let line of lines) {
        const [ATA, REMARK, CLEARANCE_NO] = line.trim().split(/\s+/);

        try {
            const selectQuery = `
                SELECT
                    status_cd,
                    CLEARANCE_NO,
                    ata,
                    remark
                FROM
                    KSV_SHIPMENT_MST
                WHERE
                    REPLACE(remark, ' ', '') LIKE '%${REMARK.replace(/\s+/g, '')}%'
            `;

            const result = await mssqlExec(selectQuery);

            if (!result || result.length === 0) {
                output.push(line);
                console.log(
                    `No match found for REMARK=${REMARK}, logged to batchOutput.txt`,
                );
            } else {
                const updateQuery = `
                    UPDATE KSV_SHIPMENT_MST
                    SET
                        status_cd = '3',
                        ATA = '${ATA}',
                        CLEARANCE_NO = '${CLEARANCE_NO}'
                    WHERE
                        REPLACE(remark, ' ', '') LIKE '%${REMARK.replace(/\s+/g, '')}%'
                `;
                await mssqlExec(updateQuery);
                console.log(`Updated record with REMARK=${REMARK}`);
            }
        } catch (err) {
            console.error(`Error processing line: ${line}, ${err.message}`);
            output.push(line);
        }
    }

    if (output.length > 0) {
        fs.writeFileSync(outputFile, output.join('\n'), 'utf-8');
        console.log(
            `batchOutput.txt written with ${output.length} unmatched lines`,
        );
        return;
    } else {
        console.log('All lines matched and updated.');
    }
}

processBatch();
