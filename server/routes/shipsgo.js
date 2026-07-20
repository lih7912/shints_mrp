const express = require('express');
const axios = require('axios');
const fs = require('fs');

const shipsgo = express.Router();
const mssqlExec = require('./mssqlExec').mssqlExec;

shipsgo.all('/insert_shipsgo', async (req, res) => {
    console.log(req.body);
    const tInput = req.body;

    const myJSONObject = {
        authCode: 'fe73641fc4eddff2f0239273bb1b3a3c',
        shippingLine: tInput.SHIP_LINE,
        blContainersRef: tInput.BL_NO,
    };

    try {
        const response = await axios.post(
            'https://shipsgo.com/api/v1.1/ContainerService/PostContainerInfoWithBl',
            myJSONObject,
        );

        console.log('RequestId =>', response.data);

        res.send({
            status: true,
            message: 'Insert Shipment',
            data: {
                requestId: response.data,
            },
        });
    } catch (error) {
        console.error('Error inserting shipment:', error);
        res.status(500).send({
            status: false,
            message: 'Error inserting shipment',
            error: error.message,
        });
    }
});

shipsgo.all('/get_shipsgo/:request_id/:shipment_cd', async (req, res) => {
    const { request_id, shipment_cd } = req.params;
    const tUrl = `https://shipsgo.com/api/v1.1/ContainerService/GetContainerInfo/?authCode=fe73641fc4eddff2f0239273bb1b3a3c&requestId=${request_id}&mapPoint=true`;

    try {
        const response = await axios.get(tUrl);
        const tResData = response.data;

        const tCols = __dirname.split('/');
        let tPath = '';
        for (let tIdx = 0; tIdx < tCols.length - 1; tIdx++) {
            tPath += tCols[tIdx] + '/';
        }

        const file = `${tPath}upload/shipsgo/${request_id}`;
        fs.writeFileSync(file, JSON.stringify(tResData, null, 4));

        if (!Array.isArray(tResData) || tResData.length === 0) {
            return res.status(404).send({
                status: false,
                message: 'No shipment data found',
                data: null,
            });
        }

        const tData0 = { ...tResData[0] };

        const sql0 = `
            UPDATE ksv_shipment_mst
            SET
                tracking_id = '${request_id}',
                A_ETA = '${tData0.ETA}',
                F_ETA = '${tData0.FirstETA}',
                SHIP_STATUS = '${tData0.Status}',
                LOADING_DATE = '${tData0.LoadingDate.Date}',
                DEPARTURE_DATE = '${tData0.DepartureDate.Date}',
                ARRIVAL_DATE = '${tData0.ArrivalDate.Date}',
                DISCHARGE_DATE = '${tData0.DischargeDate.Date}',
                GATEOUT_DATE = ''
            WHERE
                shipment_cd = '${shipment_cd}'
        `;
        try {
            let afAuthPart = await mssqlExec(sql0);
            // await prisma.$queryRawUnsafe(sql0);
        } catch (dbError) {
            console.error('Database update error:', dbError);
            return res.status(500).send({
                status: false,
                message: 'Database update failed',
                error: dbError.message,
            });
        }

        res.send({
            status: true,
            message: 'Get Shipment',
            data: tResData,
        });
    } catch (error) {
        console.error('Error getting shipment:', error);
        res.status(500).send({
            status: false,
            message: 'Error retrieving shipment',
            error: error.message,
        });
    }
});

module.exports = shipsgo;
