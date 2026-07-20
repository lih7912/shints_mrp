const aws = require('aws-sdk');
const crypto1 = require('crypto');
const { promisify } = require('util');
const randomBytes = promisify(crypto1.randomBytes);
const axios = require('axios');
const { Prisma } = require('@prisma/client');
const prisma = require('../src/db').default;
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');
require('dotenv').config();

const bucketName = process.env.AWS_BUCKET_NAME;

async function generateUploadURL(objectName?: string) {
    const s3 = new aws.S3({
        region: process.env.AWS_REGION,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        signatureVersion: 'v4',
    });

    const rawBytes = await randomBytes(16);
    const imageName = rawBytes.toString('hex');
    const objectKey = objectName && String(objectName).trim()
        ? String(objectName).trim()
        : imageName;

    console.log(objectKey);

    const params = {
        Bucket: bucketName,
        Key: objectKey,
        Expires: 7 * 24 * 60 * 60, // 7 days in seconds
    };

    const uploadURL = await s3.getSignedUrlPromise('putObject', params);
    const data = {
        uploadURL,
        imageName: objectKey,
    };
    return data;
}

async function generateDownloadURL(s3Key: string, fileName: string, expiresIn: number = 3600) {
    const s3 = new aws.S3({
        region: process.env.AWS_REGION,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        signatureVersion: 'v4',
    });

    // S3 ResponseContentDisposition header must be ISO-8859-1 compatible.
    // Keep UTF-8 name in filename* and use ASCII-only fallback for filename.
    const safeFileName = (fileName && String(fileName).trim())
        ? String(fileName).trim()
        : 'download.xlsx';
    const dotIdx = safeFileName.lastIndexOf('.');
    const ext = dotIdx >= 0 ? safeFileName.substring(dotIdx) : '.xlsx';
    const base = dotIdx >= 0 ? safeFileName.substring(0, dotIdx) : safeFileName;
    const asciiBase = base
        .replace(/[^\x20-\x7E]/g, '_')
        .replace(/["\\;]/g, '_')
        .replace(/\s+/g, ' ')
        .trim();
    const asciiFallback = `${asciiBase || 'download'}${ext}`;
    const encodedFileName = encodeURIComponent(safeFileName).replace(/'/g, '%27');
    const contentDisposition = `attachment; filename="${asciiFallback}"; filename*=UTF-8''${encodedFileName}`;

    const params = {
        Bucket: bucketName,
        Key: s3Key,
        Expires: expiresIn,
        ResponseContentDisposition: contentDisposition,
        ResponseContentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    };

    const downloadURL = await s3.getSignedUrlPromise('getObject', params);
    return downloadURL;
}

async function deleteUploadObject(name: string) {
    try {
        const s3 = new aws.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            signatureVersion: 'v4',
        });

        const rawBytes = await randomBytes(16);
        const imageName = rawBytes.toString('hex');

        const params = {
            Bucket: bucketName,
            Key: imageName,
            Expires: 60,
        };

        await s3.deleteObject({ Bucket: bucketName, Key: name });
        await prisma.$queryRaw(
            Prisma.raw(
                `
                    delete from KCD_FILEINFO
                    where
                        OBJECT_NAME = '${name}'
                `,
            ),
        );

        return true;
    } catch (error) {
        console.log(error);
    }
}

async function upload(fileName, workbook, url) {
    // Excel 파일을 로컬에 임시 저장
    await workbook.xlsx.writeFile(fileName);

    // S3에 업로드
    const fileContent = fs.readFileSync(fileName);

    let presignedUrl = '';
    let fileUrl = '';
    if (url) {
        presignedUrl = url;
        fileUrl = url.split('?')[0];
    } else {
        const generated = await generateUploadURL();
        presignedUrl = generated.uploadURL;
        fileUrl = generated.uploadURL.split('?')[0];
    }

    await axios.put(presignedUrl, fileContent, {
        headers: {
            'Content-Type':
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // Excel MIME 타입
        },
    });

    fs.unlinkSync(fileName);

    console.log([{ id: 0, CODE: 'SUCCEED:?' + fileName + '?' + fileUrl }]);

    return [{ id: 0, CODE: 'SUCCEED:?' + fileName + '?' + fileUrl }];
}

/*
async function upload(fileName, workbook, url) {
    // 1. 저장 폴더 결정 (url이 없으면 기본 uploads/)
    const saveDir = url || path.join(__dirname, 'uploads');

    // 2. 저장 폴더가 없으면 생성
    if (!fs.existsSync(saveDir)) {
        fs.mkdirSync(saveDir, { recursive: true });
    }

    // 3. 최종 저장 파일 경로
    const serverFilePath = path.join(saveDir, fileName);

    // 4. ExcelJS가 실제 파일 저장
    await workbook.xlsx.writeFile(serverFilePath);

    const DOWNLOAD_BASE = "https://erp.shints.com:3202/uploads"; 
    const publicUrl = `${DOWNLOAD_BASE}/${encodeURIComponent(fileName)}`;

    console.log(publicUrl);

    // 6. 클라이언트에게 반환할 URL은 publicUrl
    return [{ id: 0, CODE: `SUCCEED:?${fileName}?${publicUrl}` }];
}
*/

async function uploadFile(filePath, url) {
    // 파일 읽기
    const fileContent = fs.readFileSync(filePath);

    // 파일 이름과 MIME 타입 추출
    const fileName = path.basename(filePath);
    const contentType = mime.lookup(fileName) || 'application/octet-stream'; // MIME 타입 자동 감지

    let presignedUrl = '';
    let fileUrl = '';
    if (url) {
        presignedUrl = url;
        fileUrl = url.split('?')[0];
    } else {
        const generated = await generateUploadURL();
        presignedUrl = generated.uploadURL;
        fileUrl = generated.uploadURL.split('?')[0];
    }

    await axios.put(presignedUrl, fileContent, {
        headers: {
            'Content-Type': contentType,
        },
    });

    return [{ id: 0, CODE: 'SUCCEED:?' + fileName + '?' + fileUrl }];
}

module.exports = {
    generateUploadURL,
    generateDownloadURL,
    deleteUploadObject,
    upload,
    uploadFile,
};
