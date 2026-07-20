const router = require('express').Router;
const mailer = router();
const nodemailer = require('nodemailer');
const config = require('./config');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const afLib = require('../src/commlib').default;

// 메일 전송 API 엔드포인트
mailer.post('/send_email', async (req, res) => {
    const { to, subject, html, files } = req.body;

    // 필수 파라미터 검증
    if (
        !to ||
        !subject ||
        !html ||
        !files ||
        !Array.isArray(files) ||
        files.length > 10
    ) {
        res.status(400).json({
            error: {
                message: 'to, subject, html, files(최대 10개) 모두 필요합니다.',
            },
        });
        return;
    }

    // 첨부파일 경로 저장
    const attachmentPaths = [];

    try {
        // 각 파일을 다운로드
        for (const file of files) {
            const { fileName, url } = file;
            if (!fileName || !url) {
                res.status(400).json({
                    error: {
                        message:
                            'files 배열 내 각 항목에 fileName과 url이 필요합니다.',
                    },
                });
                return;
            }

            const response = await axios({
                url,
                method: 'GET',
                responseType: 'stream',
            });

            const filePath = path.join(__dirname, 'attachments');
            if (!fs.existsSync(filePath)) fs.mkdirSync(filePath); // 폴더가 없으면 생성

            const fullFilePath = path.join(filePath, fileName);

            // 다운로드된 파일을 로컬에 저장
            await new Promise((resolve, reject) => {
                const fileStream = fs.createWriteStream(fullFilePath);
                response.data.pipe(fileStream);
                fileStream.on('finish', resolve);
                fileStream.on('error', reject);
            });

            attachmentPaths.push(fullFilePath);
        }

        // Nodemailer 설정
        const transporter = nodemailer.createTransport(config.mailParameter);

        // 첨부 파일 객체 배열 생성
        const attachments = attachmentPaths.map((filePath, index) => ({
            filename: files[index].fileName,
            path: filePath,
        }));

        // 메일 옵션 설정
        const mailOptions = {
            from: config.mailParameter.auth.user,
            to,
            subject,
            html, // HTML 형식으로 메일 내용 설정
            attachments,
        };

        console.log(mailOptions);

        // 메일 전송
        try {
            await transporter.sendMail(mailOptions);
            await afLib.afSendMailLog({
                ...mailOptions,
                success: '1',
                err_msg: 'SUCCESS',
            });
            console.log('---------- Mail send Success:', to, subject);
        } catch (e) {
            await afLib.afSendMailLog({
                ...mailOptions,
                success: '0',
                err_msg: `${e.message}`,
            });
            console.log('---------- Mail send error:', e.message);
        }

        // 로컬에 저장된 파일 삭제
        attachmentPaths.forEach((filePath) => fs.unlinkSync(filePath));

        res.send({ result: 'OK' });
    } catch (error) {
        console.error(error);

        // 오류 발생 시 다운로드된 파일 삭제
        attachmentPaths.forEach((filePath) => {
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        });

        res.send({
            error: { message: `메일 전송 중 오류가 발생했습니다. ${error}` },
        });
    }
});

module.exports = mailer;
