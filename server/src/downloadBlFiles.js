const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { mssqlExec } = require('../routes/mssqlExec');

const invoiceNos = [
    'IN0125-013',
    'IN1224-045',
    'IN0125-EP-019',
    'IN0725-051',
    'IN0825-045RDS',
    'IN0925-033RDS',
    'IN0825-016RDS',
    'IN1025-014',
    'IN0925-209',
    'IN0925-210',
    'IN1025-039',
    'IN1025-018',
    'IN1025-068',
    'IN1025-059',
    'IN0925-050RDS-1',
    'IN0925-050RDS-2',
    'IN0925-069RDS',
    'IN1025-011RDS',
    'IN1025-016RDS',
    'IN1025-058',
    'IN1025-016RDS',
];

// 파일명에 사용할 수 없는 문자 제거
function sanitizeFileName(fileName) {
    return String(fileName || 'unknown')
        .replace(/[<>:"/\\|?*\x00-\x1F]/g, '_')
        .replace(/\s+/g, ' ')
        .trim();
}

// url에서 확장자 추출
function getExtensionFromUrl(fileUrl) {
    try {
        const parsed = new URL(fileUrl);
        const ext = path.extname(parsed.pathname);
        return ext || '';
    } catch (e) {
        return '';
    }
}

// 파일 다운로드
async function downloadFile(fileUrl, savePath) {
    const response = await axios({
        method: 'get',
        url: fileUrl,
        responseType: 'stream',
        timeout: 60000,
    });

    await new Promise((resolve, reject) => {
        const writer = fs.createWriteStream(savePath);
        response.data.pipe(writer);
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
}

async function main() {
    const baseDir = path.join(__dirname, 'blFiles');

    if (!fs.existsSync(baseDir)) {
        fs.mkdirSync(baseDir, { recursive: true });
    }

    for (const invoiceNo of invoiceNos) {
        try {
            console.log(`\n=== 처리 시작: ${invoiceNo} ===`);

            const invoiceDir = path.join(baseDir, invoiceNo);
            if (!fs.existsSync(invoiceDir)) {
                fs.mkdirSync(invoiceDir, { recursive: true });
            }

            const query = `
                select
                    file_key,
                    kind,
                    name,
                    url
                from
                    kcd_fileinfo
                where
                    file_key = '${invoiceNo.replace(/'/g, "''")}'
                    and kind like 'ORDER_SHIP_%'
            `;

            const rows = await mssqlExec(query);

            if (!Array.isArray(rows)) {
                console.log(`[${invoiceNo}] 조회 실패`, rows);
                continue;
            }

            if (rows.length === 0) {
                console.log(`[${invoiceNo}] 조회 결과 없음`);
                continue;
            }

            for (let i = 0; i < rows.length; i++) {
                const row = rows[i];
                const fileUrl = row.url;

                if (!fileUrl) {
                    console.log(`[${invoiceNo}] url 없음 - skip`);
                    continue;
                }

                const safeName = sanitizeFileName(row.name || `file_${i + 1}`);
                const ext =
                    path.extname(safeName) ||
                    getExtensionFromUrl(fileUrl) ||
                    '';
                const finalName = path.extname(safeName)
                    ? safeName
                    : `${safeName}${ext}`;
                const savePath = path.join(invoiceDir, finalName);

                console.log(`[${invoiceNo}] 다운로드: ${finalName}`);
                console.log(`URL: ${fileUrl}`);

                try {
                    await downloadFile(fileUrl, savePath);
                    console.log(`[${invoiceNo}] 저장 완료: ${savePath}`);
                } catch (downloadErr) {
                    console.log(`[${invoiceNo}] 다운로드 실패: ${finalName}`);
                    console.log(downloadErr.message);
                }
            }
        } catch (err) {
            console.log(`[${invoiceNo}] 처리 중 오류`);
            console.log(err.message);
        }
    }

    console.log('\n모든 작업 완료');
    return;
}

main();
