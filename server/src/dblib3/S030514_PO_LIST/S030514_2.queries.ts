import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
import S030514_QRY_COMM from '../../reportlib_polist'; //PrismaClient 사용하기 위해 불러오기
import axios from 'axios';
const Excel = require('exceljs');
const { upload } = require('../../../routes/s3');
const { MongoClient } = require('mongodb');

// export default로 Query 내용 내보내기
const moduleQuery_S030514_2 = {
    Query: {
        mgrQueryS030514_REPORT_MATL_LIST_NET_QTY: async (
            _,
            args,
            contextValue,
        ) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tTitle = '';
            if (args.data.OP_KIND === '0') {
                tTitle = `MATL_LIST_NET_QTY_${args.data.PO_CD}`;
            } else if (args.data.OP_KIND === '1') {
                tTitle = `MATL_LIST_POINT_${args.data.PO_CD}`;
            } else if (args.data.OP_KIND === '2') {
                tTitle = `MATL_LIST_PO_QTY_${args.data.PO_CD}`;
            } else if (args.data.OP_KIND === '3') {
                tTitle = `MATL_LIST_STSIN_QTY_${args.data.PO_CD}`;
            }

            try {
                var tRetArray = [];
                tRetArray = await S030514_QRY_COMM.REPORT_MATL_LIST_NET_QTY(
                    args,
                    contextValue,
                );
                var tRetObj = tRetArray[0];
                if (tRetObj.CODE.includes('SUCC')) {
                    let sql0 = `
                        update ksv_po_mst
                        set
                            mrp_pack_flag = '${tUserInfo.USER_ID}'
                        where
                            po_cd = '${args.data.PO_CD}'
                    `;
                    var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                }
                return tRetArray;
            } catch (e) {
                var tObj = {};
                tObj.id = 0;
                tObj.CODE = `ERROR:처리중 오류가 발생했습니다:${e.message}`;
                var tArray = [];
                tArray.push(tObj);
                return tArray;
            }
        },

        mgrQueryS030514_REPORT_ORDER_QTY: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tTitle = `ORDER_QTY_${args.data.PO_CD}`;

            try {
                var tRetArray = [];
                tRetArray = await S030514_QRY_COMM.REPORT_ORDER_QTY(
                    args,
                    contextValue,
                );
                return tRetArray;
            } catch (e) {
                var tObj = {};
                tObj.id = 0;
                tObj.CODE = `ERROR:${e.message}`;
                var tArray = [];
                tArray.push(tObj);
                return tArray;
            }
        },

        mgrQueryS030514_REPORT_ORDER_QTY2: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            try {
                var tRetArray = [];
                tRetArray = await S030514_QRY_COMM.REPORT_ORDER_QTY2(
                    args,
                    contextValue,
                );
                return tRetArray;
            } catch (e) {
                var tObj = {};
                tObj.id = 0;
                tObj.CODE = `ERROR:${e.message}`;
                var tArray = [];
                tArray.push(tObj);
                return tArray;
            }
        },

        mgrQueryS030514_REPORT_BUYER_ORDER_QTY: async (
            _,
            args,
            contextValue,
        ) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tTitle = `ORDER_QTY_${args.data.PO_CD}`;

            try {
                var tRetArray = [];
                tRetArray = await S030514_QRY_COMM.REPORT_BUYER_ORDER_QTY(
                    args,
                    contextValue,
                );
                return tRetArray;
            } catch (e) {
                var tObj = {};
                tObj.id = 0;
                tObj.CODE = `ERROR:${e.message}`;
                var tArray = [];
                tArray.push(tObj);
                return tArray;
            }
        },
    },
};

export default moduleQuery_S030514_2;
