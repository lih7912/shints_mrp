import { Prisma } from '@prisma/client';
import prisma from './db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');
import AFLib from './commlib'; //PrismaClient 사용하기 위해 불러오기
import AFLib2 from './po_adjust'; //PrismaClient 사용하기 위해 불러오기
import axios from 'axios';
const Excel = require('exceljs');
const { generateUploadURL, deleteUploadObject } = require('../routes/s3');
const { MongoClient } = require('mongodb');

//
class USER_AUTH_LIB {
    async checkAuth(argPart, contextValue) {
        var tUserInfo = AFLib.getUserInfo(contextValue);

        let sql00 = `
            select
                *
            from
                kcd_user
            where
                user_id = '${tUserInfo.USER_ID}'
        `;
        var tRet_sql00 = await prisma.$queryRaw(Prisma.raw(sql00));

        var tRet = '0';
        var tPart = tRet_sql00[0].PART;
        if (tPart === argPart) tRet = '1';
        return tRet;
    }
}

const UserAuthLib = new USER_AUTH_LIB();
export default UserAuthLib;
