import { PrismaClient } from '@prisma/client';
import commlib from './commlib';
const moment = require('moment');

const prisma = new PrismaClient({
    log: [
        {
            emit: 'event',
            level: 'query',
        },
        {
            emit: 'stdout',
            level: 'error',
        },
        {
            emit: 'stdout',
            level: 'info',
        },
        {
            emit: 'stdout',
            level: 'warn',
        },
    ],
});

prisma.$on('query', async (e) => {
    if (e.query.includes('/* ha-monitor */') || e.query.includes('SELECT 1')) {
        return;
    }

    console.log('Query: ' + e.query);
    console.log('Params: ' + e.params);
    console.log('Duration: ' + e.duration + 'ms');

    try {
        if (global.currentTransactionInfo) {
            if (!global.transactionTimestamp) {
                global.transactionTimestamp = moment().format(
                    'YYYY-MM-DD HH:mm:ss',
                );
                global.lastPrismaQuery = e.query;
            }

            if (global.currentTransactionInfo?.contextValue) {
                await commlib.transactionLog(
                    e.query,
                    global.transactionTimestamp,
                    global.currentTransactionInfo.contextValue,
                    global.currentTransactionInfo.functionName,
                    false,
                );
            }
            delete global.transactionTimestamp;
        }
    } catch (logErr) {
        console.error('Transaction log failed:', logErr);
    }
});

prisma.$on('error', async (e) => {
    console.log('message: ' + e.message);

    try {
        if (global.currentTransactionInfo) {
            if (!global.transactionTimestamp) {
                global.transactionTimestamp = moment().format(
                    'YYYY-MM-DD HH:mm:ss',
                );
            }

            if (global.currentTransactionInfo?.contextValue) {
                await commlib.transactionLog(
                    global.lastPrismaQuery,
                    global.transactionTimestamp,
                    global.currentTransactionInfo.contextValue,
                    global.currentTransactionInfo.functionName,
                    true,
                );
                await commlib.transactionLog(
                    e.message,
                    global.transactionTimestamp,
                    global.currentTransactionInfo.contextValue,
                    global.currentTransactionInfo.functionName,
                    true,
                );
            }
            delete global.transactionTimestamp;
            delete global.lastPrismaQuery;
        }
    } catch (logErr) {
        console.error('Transaction error log failed:', logErr);
    }
});

export default prisma;
