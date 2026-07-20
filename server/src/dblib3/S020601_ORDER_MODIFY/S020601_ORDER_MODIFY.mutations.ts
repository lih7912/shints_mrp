// MGR_@@TNAME@@.mutations.js

import * as fs from 'fs';
import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기

// export default로 Mutation 내용 내보내기
const moduleMutation_S020601_ORDER_MODIFY_EDT_KSV_ORDER_MST = {
    Mutation: {
        mgrInsert_S020601_BUYER_FILE_INFO_SAVE: async (
            _,
            args,
            contextValue,
        ) => {
            var tInput = { ...args.datas };

            // console.log( ` ${tBuyerCd} ,  path=> ${__dirname}`);
            // console.log(JSON.stringify(tInput1));
            // var tPath = `../../../upload/team_info_${tBuyerCd}.json`;

            const tCols = __dirname.split('/');
            var tPath0 = '';
            var tIdx = 0;
            for (tIdx = 0; tIdx < tCols.length - 3; tIdx++) {
                tPath0 += tCols[tIdx] + '/';
            }

            var tPath = `${tPath0}upload/file_info_order_${tInput.BUYER_CD}.json`;
            if (fs.existsSync(tPath)) {
                var tDataObj = JSON.parse(fs.readFileSync(tPath).toString());
                var tObj = {};
                tObj.col1 = tInput.KIND;
                tObj.col2 = tInput.NAME;
                tObj.col3 = tInput.FILE_NAME;
                tDataObj.push(tObj);
                fs.writeFileSync(tPath, JSON.stringify(tDataObj, null, 4));
            } else {
                var tDataObj = [];
                var tObj = {};
                tObj.col1 = tInput.KIND;
                tObj.col2 = tInput.NAME;
                tObj.col3 = tInput.FILE_NAME;
                tDataObj.push(tObj);
                fs.writeFileSync(tPath, JSON.stringify(tDataObj, null, 4));
            }

            return tInput.BUYER_CD;
        },
        mgrInsert_S020601_ORDER_MODIFY: async (_, args, contextValue) => {
            //
            var tDate = new Date();
            var mm = tDate.getMonth() + 1;
            var mm_str = '';
            if (mm > 9) mm_str = mm.toString();
            else mm_str = '0' + mm;

            var dd = tDate.getDate();
            var dd_str = '';
            if (dd > 9) dd_str = dd;
            else dd_str = '0' + dd;

            var hours = tDate.getHours();
            var hours_str = '';
            if (hours > 9) hours_str = hours.toString();
            else hours_str = '0' + hours;

            var minutes = tDate.getMinutes();
            var minutes_str = '';
            if (minutes > 9) minutes_str = minutes.toString();
            else minutes_str = '0' + minutes;

            var seconds = tDate.getSeconds();
            var seconds_str = '';
            if (seconds > 9) seconds_str = seconds.toString();
            else seconds_str = '0' + seconds;

            var yyyy = tDate.getFullYear();

            var tRetDate =
                yyyy.toString() +
                mm_str +
                dd_str +
                hours_str +
                minutes_str +
                seconds_str;
            var tYY = 'B' + yyyy.toString().substring(2) + '-';

            // let tPO = "POA2022S672";

            var tOrderMst = args.datas.ORDER_MST;
            var tOrderMst1 = args.datas.ORDER_MST1;
            var tOrderMst2 = args.datas.ORDER_MST2;
            var tOrderMstArray = args.datas.ORDER_MST_ARRAY;

            console.log(args.datas);

            var tSQL = `
                SELECT
                    isnull(max(A.SEQ) + 1, 1) as max_seq
                FROM
                    KSV_ORDER_MST A,
                    KCD_STYLE B
                WHERE
                    A.STYLE_CD = B.STYLE_CD
                    and A.YY = ${yyyy}
                    and B.BUYER_CD = '${tOrderMst.BUYER_CD}'
            `;
            var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
            var tRet = nRet0[0];

            var tYYStr = yyyy.toString();

            var tType = 'D';
            var tORDER_CD = tOrderMst.BUYER_CD + tYYStr.substring(2, 4) + '-';

            if (tOrderMst.IS_COMBINED === '1' && tOrderMst.IS_SAMPLE === '1')
                tType = 'CS';
            else if (tOrderMst.IS_COMBINED === '1') tType = 'C';
            else if (tOrderMst.IS_SAMPLE === '1') tType = 'S';

            var tMaxSeqStr = String(tRet.max_seq);
            var tZero = '0000000000';
            var tOrderSeq = tZero.substring(0, 5 - tType.length);
            tOrderSeq =
                tOrderSeq.substring(0, tOrderSeq.length - tMaxSeqStr.length) +
                tMaxSeqStr;
            tORDER_CD += tType + tOrderSeq;

            var tOrderMstArray = args.datas.ORDER_MST_ARRAY;

            var tCombineIdx = 1;
            var tIdx = 0;
            var tMems = [];
            for (tIdx = 0; tIdx < tOrderMstArray.length; tIdx++) {
                var tORDER_CD_0;
                var tObj = tOrderMstArray[tIdx];
                if (tObj.TYPE === 'Main') {
                    tORDER_CD_0 = tORDER_CD;
                } else {
                    tORDER_CD_0 = tORDER_CD + '-0' + tCombineIdx;
                    tCombineIdx++;
                }

                var tIdx1 = 0;
                for (tIdx1 = 0; tIdx1 < tObj.ORDER_MEM.length; tIdx1++) {
                    var tOneMem = tObj.ORDER_MEM[tIdx1];

                    var wOne = {};

                    wOne.ORDER_CD = tORDER_CD_0;
                    wOne.PROD_CD = tOneMem.PROD_CD;
                    wOne.ADD_FLAG = tOneMem.ADD_FLAG;
                    wOne.PRICE = parseFloat(tOneMem.PRICE);
                    wOne.TOT_CNT = parseInt(tOneMem.TOT_CNT);
                    wOne.SIZE_CNT = tOneMem.SIZE_CNT;
                    wOne.SIZE_LOSS = '0';

                    tMems.push(wOne);
                }
            }

            var tMstMain = {};
            tMstMain.ORDER_CD = tORDER_CD;
            tMstMain.STYLE_CD = tOrderMst.STYLE_CD;
            tMstMain.ORDER_TYPE = tType;
            tMstMain.YY = yyyy;
            tMstMain.SEQ = tRet.max_seq;
            tMstMain.TOT_CNT = parseInt(tOrderMst.ORDER_QTY);
            tMstMain.ADD_CNT = parseInt(tOrderMst.ADD_QTY);
            tMstMain.CURR_CD = tOrderMst1.CURR_CD;
            tMstMain.ORDER_DATE = tOrderMst1.ORDER_DATE;
            tMstMain.DUE_DATE = tOrderMst1.DUE_DATE;
            tMstMain.MATL_DUE_DATE = tOrderMst1.MATLDUE_DATE;
            tMstMain.NAT_CD = tOrderMst1.NAT_CD;
            tMstMain.FACTORY_CD = tOrderMst1.FACTORY_CD;
            tMstMain.SIZE_GROUP = tOrderMst1.SIZE_GROUP;
            tMstMain.ORDER_STATUS = '*';
            tMstMain.STATUS_CD = '0';
            /*
*                    Waiting                                                                                             
0                    Order Reg.                                                                                          
1                    PO Reg.                                                                                             
2                    MRP                                                                                                 
3                    PO                                                                                                  
4                    Cancel                                                                                              
5                    Partial Ship                                                                                        
6                    Stock Checking                                                                                      
7                    Ship End                                                                                            
8                    End Report                                                                                          
9                    End                                      
      */
            tMstMain.SAMPLE_FLAG = tOrderMst.IS_SAMPLE;
            tMstMain.REMARK = tOrderMst2.REMARK;
            tMstMain.REG_USER = AFLib.getUserInfo(contextValue).USER_ID;
            tMstMain.REG_DATETIME = tRetDate;
            tMstMain.UPD_USER = AFLib.getUserInfo(contextValue).USER_ID;
            tMstMain.UPD_DATETIME = tRetDate;

            tCombineIdx = 1;
            tIdx = 0;
            var tMsts = [];
            for (tIdx = 0; tIdx < tOrderMstArray.length; tIdx++) {
                var tORDER_CD_0;
                var tORDER_TYPE;
                var tObj = tOrderMstArray[tIdx];
                if (tObj.TYPE === 'Main') {
                    tORDER_CD_0 = tORDER_CD;
                    if (tOrderMst.IS_COMBINED === '1') tORDER_TYPE = '1';
                    tORDER_TYPE = '0';
                } else {
                    tORDER_CD_0 = tORDER_CD + '-0' + tCombineIdx;
                    tCombineIdx++;
                    tORDER_TYPE = '2';
                }

                var tWObj = { ...tMstMain };
                tWObj.ORDER_CD = tORDER_CD_0;
                tWObj.ORDER_TYPE = tORDER_TYPE;

                console.log(
                    'ORDER_CD: ' +
                        tWObj.ORDER_CD +
                        ',' +
                        tObj.TYPE +
                        ',' +
                        tORDER_CD_0,
                );

                if (tObj.TYPE === 'Main') {
                } else {
                    tWObj.NAT_CD = tObj.NAT_CD;
                }
                tWObj.TOT_CNT = parseInt(tObj.ORDER_QTY);
                tWObj.ADD_CNT = parseInt(tObj.ADD_QTY);
                tMsts.push(tWObj);
            }

            console.log(
                'MGR_KSV_ORDER_MST_1:mgrKsvOrderRecordReg=>' + tMsts.length,
            );

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                var [nRet1, nRet2] = await prisma.$transaction([
                    prisma.KSV_ORDER_MST.createMany({
                        data: tMsts,
                    }),
                    prisma.KSV_ORDER_MEM.createMany({
                        data: tMems,
                    }),
                ]);
                delete global.currentTransactionInfo;

                console.log(nRet1);
                console.log(nRet2);

                var retArray = [];
                var tObj = {};
                tObj.CODE = tORDER_CD;
                tObj.id = 0;
                retArray.push(tObj);

                return retArray;
            } catch (e) {
                var retArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR';
                tObj.id = 0;
                retArray.push(tObj);

                return retArray;
            }
        },
    },
};

export default moduleMutation_S020601_ORDER_MODIFY_EDT_KSV_ORDER_MST;
