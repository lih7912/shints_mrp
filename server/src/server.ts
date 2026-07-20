const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileupload = require('express-fileupload');
const serveStatic = require('serve-static');
const twoFa = require('../routes/twoFa');
const trLog = require('../routes/trLog');
const mailer = require('../routes/mailer');
const userInfo = require('../routes/userInfo');
const mrpWorkStatus = require('../routes/mrpWorkStatus');
const shipsgo = require('../routes/shipsgo');
const fileManage = require('../routes/fileManage');
const gw = require('../routes/gw');
const mrpMailConfirm = require('../routes/mrpMailConfirm');
const dbName = require('../routes/dbName');
const tradlinx = require('../routes/tradlinx.js');
const events = require('../routes/events');
const moment = require('moment');
import commlib from './commlib';

import { deepTrim } from './deepTrim';

import { Prisma } from '@prisma/client';
import prisma from './db';

const fs = require('fs');
const https = require('https');
require('dotenv').config();

const { ApolloServer, AuthenticationError } = require('apollo-server-express');
import schema from './schema';

const port = process.env.PORT;

const options = {
    key: fs.readFileSync(process.env.KEY),
    cert: fs.readFileSync(process.env.CERT),
};

async function startApolloServer() {
    const server = new ApolloServer({
        schema,

        context: ({ req }) => {
            let rawToken = '';

            if (!req.headers.authorization) {
                if (req.headers.clientname === 'LOGIN') {
                    rawToken = req.headers.clientname;
                } else {
                    throw new AuthenticationError('missing token');
                }
            } else {
                rawToken = req.headers.authorization;
            }

            return { token: rawToken };
        },

        plugins: [
            {
                async requestDidStart(requestContext) {
                    const queryStr = requestContext.request.query || '';
                    const shouldLog = !queryStr.includes('mgrQuery');

                    return {
                        async didResolveOperation(requestContext) {
                            const vars = requestContext.request.variables;

                            if (vars) {
                                requestContext.request.variables =
                                    deepTrim(vars);
                            }

                            if (shouldLog) {
                                const rawToken =
                                    requestContext.context?.token || '';
                                const selections =
                                    requestContext.operation?.selectionSet
                                        ?.selections || [];
                                const resolverNames = selections.map(
                                    (s) => s.name?.value,
                                );
                                const resolverName =
                                    resolverNames.length > 0
                                        ? resolverNames.join(',')
                                        : '';

                                /*
                                console.log("===== GRAPHQL LOG =====");
                                console.log("TOKEN:", rawToken);
                                console.log("RESOLVER:", resolverName);
                                console.log("OPERATION:", requestContext.operationName);
                                console.log("VARIABLES:", requestContext.request.variables);
                                */

                                await commlib.transactionLog(
                                    JSON.stringify(
                                        requestContext.request.variables,
                                    ),
                                    moment().format('YYYY-MM-DD HH:mm:ss'),
                                    { token: rawToken },
                                    'dblib3/' +
                                        resolverName +
                                        '/' +
                                        requestContext.operationName,
                                    false,
                                    'CLIENT',
                                );
                            }
                        },
                    };
                },
            },
        ],
    });

    await server.start();

    const app = express();

    app.use(bodyParser.json({ limit: '10mb' }));
    app.use(
        bodyParser.urlencoded({
            limit: 50000000,
            extended: true,
            parameterLimit: 50000,
        }),
    );

    const allowedOrigins = [
        'https://localhost:3201',
        'https://erp.shints.com:3201',
        'https://erp-test.shints.com:3201',
        'https://afroba.iptime.org:3201',
        'https://localhost:3210',
        'https://erp.shints.com:3210',
        'https://erp-test.shints.com:3210',
        'https://afroba.iptime.org:3210',
        'https://localhost:3211',
        'https://erp.shints.com:3211',
        'https://erp-test.shints.com:3211',
        'https://afroba.iptime.org:3211',
    ];

    app.use(
        cors({
            origin: function (origin, callback) {
                if (!origin || allowedOrigins.includes(origin)) {
                    callback(null, true);
                } else {
                    console.warn(`[CORS] Rejected origin: ${origin}`);
                    callback(null, false);
                }
            },
            credentials: true,
        }),
    );

    app.use(fileupload());
    app.use(serveStatic(`${__dirname}/public`));

    app.get('/restapi/ha-monitor', async (req, res) => {
        try {
            await prisma.$queryRaw(Prisma.raw('/* ha-monitor */ SELECT 1 AS ok'));
            res.status(200).json({ ok: true });
        } catch (err) {
            console.error('[ha-monitor] health check failed:', err);
            res.status(500).json({ ok: false });
        }
    });

    app.use('/restapi', gw);
    app.use('/restapi', twoFa);
    app.use('/restapi', trLog);
    app.use('/restapi', mailer);
    app.use('/restapi', userInfo);
    app.use('/restapi', mrpWorkStatus);
    app.use('/restapi', shipsgo);
    app.use('/restapi', fileManage);
    app.use('/restapi', mrpMailConfirm);
    app.use('/restapi', dbName);
    app.use('/restapi', tradlinx);
    app.use('/restapi', events);

    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Private-Network', 'true');
        
        res.header(
            'Access-Control-Allow-Methods',
            'GET, POST, PUT, DELETE, OPTIONS',
        );
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Authorization',
        );
        res.header('Access-Control-Expose-Headers', 'Authorization');
        res.header('Access-Control-Request-Headers', 'Authorization');
        res.header('Access-Control-Request-Method', 'GET, POST, OPTIONS, PUT');
        next();
    });

    server.applyMiddleware({ app });

    https.createServer(options, app).listen(port, () => {
        console.log(`HTTPS Server running on port ${port}`);
    });
}

startApolloServer();
