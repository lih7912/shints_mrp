import { Prisma } from '@prisma/client';
import prisma from './db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from './commlib'; //PrismaClient 사용하기 위해 불러오기
import AFLib2 from './po_adjust'; //PrismaClient 사용하기 위해 불러오기
const Excel = require('exceljs');
const {
    generateUploadURL,
    deleteUploadObject,
    upload,
} = require('../routes/s3');
const { MongoClient } = require('mongodb');

const moment = require('moment');

class DOCU_S0423_QRY_COMM_1 {
    async INSERT_DOCU_DOMESTIC(argData, contextValue) {}
}

const DOCU_S0423_QRY_COMM = new RPT_S030513_QRY_COMM_1();
export default DOCU_S0423_QRY_COMM;
