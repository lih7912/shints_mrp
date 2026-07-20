const express = require('express');
const fs = require('fs');
const { generateUploadURL, deleteUploadObject } = require('./s3');

const fileManage = express.Router();

fileManage.all('/imgUpload', async (req, res) => {
    try {
        const response = await generateUploadURL();
        console.log(response);
        res.send(response);
    } catch (error) {
        res.status(500).send({
            status: false,
            message: 'Image upload URL generation failed',
            error: error.message,
        });
    }
});

fileManage.post('/deleteImg', async (req, res) => {
    try {
        await deleteUploadObject(req.body.objectName);
        res.send(true);
    } catch (error) {
        res.status(500).send({
            status: false,
            message: 'Failed to delete image',
            error: error.message,
        });
    }
});

fileManage.all('/fileupload/:kind/:filename', async (req, res) => {
    const { kind, filename } = req.params;

    const filePath = `${__dirname}/upload/${kind}/${filename}`;

    try {
        if (!req.files) {
            return res.send({ status: false, message: 'No file uploaded' });
        }

        let in_doc = req.files.account_doc;
        let fileExtension = '';

        if (in_doc.name.includes('.pdf')) fileExtension = '.pdf';
        else if (in_doc.name.includes('jpg')) fileExtension = '.jpg';
        else if (in_doc.name.includes('png')) fileExtension = '.png';

        const finalFilePath = filePath + fileExtension;
        in_doc.mv(finalFilePath);

        const fileInfo = {
            filename: in_doc.name,
            file_id: filename,
        };

        const infoFilePath = `${__dirname}/upload/file_info_bank_${filename}.json`;
        fs.writeFileSync(infoFilePath, JSON.stringify(fileInfo, null, 4));

        res.send({
            status: true,
            message: 'File is uploaded',
            data: {
                name: in_doc.name,
                mimetype: in_doc.mimetype,
                size: in_doc.size,
            },
        });
    } catch (err) {
        res.status(500).send(err);
    }
});

fileManage.all('/filedown/:kind/:filename', async (req, res) => {
    const { kind, filename } = req.params;
    const filePath = `${__dirname}/upload/${kind}/${filename}`;

    res.download(filePath);
});

fileManage.all('/filedown/:kind/:kind2/:filename', async (req, res) => {
    const { kind, kind2, filename } = req.params;
    const filePath = `${__dirname}/upload/${kind}/${kind2}/${filename}`;

    res.download(filePath);
});

fileManage.all('/imageget/:kind/:filename/:fileext', async (req, res) => {
    const { kind, filename } = req.params;
    const infoFilePath = `${__dirname}/upload/file_info_${kind}_${filename.split('_')[0]}.json`;

    try {
        const fileData = JSON.parse(fs.readFileSync(infoFilePath).toString());
        const latestFile = fileData[fileData.length - 1].col3;
        const filePath = `${__dirname}/upload/${kind}/${latestFile}`;

        res.sendFile(filePath);
    } catch (err) {
        res.status(500).send({
            status: false,
            message: 'File not found',
            error: err.message,
        });
    }
});

fileManage.all('/imagegetlast/:kind/:filename/:fileext', async (req, res) => {
    const { kind, filename, fileext } = req.params;
    const filePath = `${__dirname}/upload/${kind}/${filename}.${fileext}`;

    res.sendFile(filePath);
});

fileManage.all('/fileupload2/:kind/:fileprefix/:fileidx', async (req, res) => {
    const { kind, fileprefix } = req.params;
    const uploadPath = `${__dirname}/upload/${kind}/`;

    try {
        if (!req.files) {
            return res.send({ status: false, message: 'No file uploaded' });
        }

        const infoFilePath = `${__dirname}/upload/file_info_${kind}_${fileprefix}.json`;
        let fileInfoArray = [];

        if (fs.existsSync(infoFilePath)) {
            fileInfoArray = JSON.parse(
                fs.readFileSync(infoFilePath).toString(),
            );
        }

        const fileIdx = fileInfoArray.length + 1;
        let fileName = `${fileprefix}_${fileIdx}`;
        const finalFilePath = `${uploadPath}${fileName}`;

        let in_doc = req.files.file1_doc;
        let fileExtension = '';

        if (in_doc.name.includes('.pdf')) fileExtension = '.pdf';
        else if (in_doc.name.includes('jpg')) fileExtension = '.jpg';
        else if (in_doc.name.includes('png')) fileExtension = '.png';

        in_doc.mv(finalFilePath + fileExtension);

        fileInfoArray.push({
            col1: 'File',
            col2: in_doc.name,
            col3: fileName + fileExtension,
        });

        fs.writeFileSync(infoFilePath, JSON.stringify(fileInfoArray, null, 4));

        res.send({
            status: true,
            message: 'File is uploaded',
            data: {
                name: in_doc.name,
                mimetype: in_doc.mimetype,
                size: in_doc.size,
            },
        });
    } catch (err) {
        res.status(500).send(err);
    }
});

fileManage.all('/test', async (req, res) => {
    try {
        const result = await prisma.KCD_CODE.findMany();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send({
            status: false,
            message: 'Database query failed',
            error: error.message,
        });
    }
});

module.exports = fileManage;
