const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileupload = require('express-fileupload');
const serveStatic = require('serve-static');
const restApi = require('../routes/restapi');
const nsrApi = require('../routes/nsrApi');

const fs = require('fs');
const https = require('https');
require('dotenv').config(); // .env 파일 로드
const moment = require('moment');
import commlib from './commlib';

const { ApolloServer, gql } = require('apollo-server-express');
import  schema from './schema';

const port = process.env.PORT || 3311;

// SSL 인증서 경로
const options = {
  key: fs.readFileSync(process.env.KEY),
  cert: fs.readFileSync(process.env.CERT)
};

async function startApolloServer() {
  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      const authHeader = req.headers.authorization;
      const token = Array.isArray(authHeader) ? authHeader[0] : (authHeader || '');
      return { token };
    },
    plugins: [
      {
        async requestDidStart() {
          return {
            async didResolveOperation(requestContext) {
              if (requestContext.operation?.operation !== 'mutation') {
                return;
              }

              const rawToken = requestContext.context?.token || '';
              const selections =
                requestContext.operation?.selectionSet?.selections || [];
              const resolverNames = selections.map((s) => s.name?.value);
              const resolverName =
                resolverNames.length > 0 ? resolverNames.join(',') : 'unknown';

              await commlib.transactionLog(
                JSON.stringify(requestContext.request.variables || {}),
                moment().format('YYYY-MM-DD HH:mm:ss'),
                { token: rawToken },
                `dblib3/${resolverName}/${requestContext.operationName || 'mutation'}`,
                false,
                'CLIENT',
              );
            },
          };
        },
      },
    ],
  });
  await server.start();
  const app = express();
  
  app.use(bodyParser.urlencoded({extended: false}))
  app.use(bodyParser.json());
  app.use(cors());
  app.use(fileupload());
  app.use(serveStatic(`${__dirname}/public`));

  app.use('/restapi', (req, res, next) => {
    if (req.path === '/ha-monitor') {
      next();
      return;
    }

    const authHeader = req.headers.authorization;
    const token = Array.isArray(authHeader) ? authHeader[0] : (authHeader || '');

    global.currentTransactionInfo = {
      contextValue: { token },
      functionName: `routes/restapi${req.path}`,
    };

    const clearTransactionContext = () => {
      delete global.currentTransactionInfo;
      delete global.transactionTimestamp;
      delete global.lastPrismaQuery;
    };

    res.on('finish', clearTransactionContext);
    res.on('close', clearTransactionContext);
    next();
  });

  app.use('/restapi', restApi);
  app.use('/nsrapi', nsrApi);

  app.use(function (req, res, next) {
    /* API 접근을 허용하기 위한 Setting */
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    res.header('Access-Control-Expose-Headers', 'Authorization')
    res.header('Access-Control-Request-Headers', 'Authorization')
    res.header('Access-Control-Request-Method', 'GET, POST, OPTIONS, PUT')
    next()
  });

  server.applyMiddleware({
     app
  });

  // await new Promise(resolve => app.listen({ port: 3311 }, resolve));
  // console.log(`🚀 Server ready at http://localhost:3311${server.graphqlPath}`);

  // HTTPS 서버 실행
  https.createServer(options, app).listen(port, '0.0.0.0', () => {
    console.log(`HTTPS Server running on port ${port}`);
  });
}

startApolloServer();

