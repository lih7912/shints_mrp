// MGR_@@TNAME@@.mutations.js

import * as fs from 'fs';
import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
const moment = require('moment');

const normalizeSqlText = (value) => String(value ?? '').replace(/''/g, "'");
const escapeSqlLiteral = (value) =>
    normalizeSqlText(value).replace(/'/g, "''");
const DUP_MATL_MESSAGE = 'ERROR:Already have the same material.';
const isMatlDuplicateError = (message) => {
    if (!message) return false;
    return (
        message.includes('KCD_MATL_MST_K1') ||
        message.includes("고유 인덱스가 'KCD_MATL_MST_K1'") ||
        message.includes('중복 키 행을 삽입할 수 없습니다') ||
        message.includes('Cannot insert duplicate key row') ||
        message.includes('Unique constraint failed')
    );
};

/*
                MATL_CD: String 
                VENDOR_CD: String 
                MATL_NAME: String 
                COLOR: String 
                SPEC: String 
                STATUS_CD: String 
                MATL_TYPE: String 
                UNIT: String 
                BOX_UNIT: String 
                MATL_TYPE2: String 
                CURR_CD: String 
                REG_DATE: String 
                REG_USER: String 
                ADD_RATE: String 
                ADD_AMT: String 
                ADD_LOSS: String 
                MATL_PRICE: String 
                PRICE_TYPE: String 

*/

// export default로 Mutation 내용 내보내기
const moduleMutation_S0301_MATL_RECORD_EDT_KCD_MATL_MST = {
    Mutation: {
        mgrInsert_S0301_MATL_RECORD_EDT_KCD_MATL_MST: async (
            _,
            args,
            contextValue,
        ) => {
            //
            var tRetDate = moment().format('YYYYMMDDHHmmss');
            var yyyy = moment().year();
            var tYY = 'B' + yyyy.toString().substring(2) + '-';

            // let tPO = "POA2022S672";
            var tUserInfo = AFLib.getUserInfo(contextValue);

            /*
                  var tSQL = `
                      SELECT
                          max(A.SEQ) + 1 as max_seq
                      FROM
                          KSV_ORDER_MST A,
                          KCD_STYLE B
                      WHERE
                          A.STYLE_CD = B.STYLE_CD
                          and A.YY = ${tOneMst.YY}
                          and B.BUYER_CD = '${tOneMst.BUYER_CD}'
                  `;
                  var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
                  var tRet = nRet0[0];
                  var tMaxSeq = tRet.max_seq;
            */

            /*
                  var sql0 = `
                      select
                          *
                      from
                          kcd_user
                      where
                          user_id = '${tUserInfo.USER_ID}'
                  `;
                  var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                  if (nRet0.length <= 0) {
                      var tRetArray = [];
                      var tObj = {};
                      tObj.CODE = 'ERROR:NO User';
                      tObj.id = 0; 
                      tRetArray.push(tObj);
                      return (tRetArray);
                  } else {
                      var tObj = { ...nRet0[0] };
                      if (tObj.PART !== '08' && tObj.PART !== 'S11' && tObj.PART !== 'VMRP') {
                         var tRetArray = [];
                         var tObj = {};
                         tObj.CODE = 'ERROR:Oney MRP Team';
                         tObj.id = 0; 
                         tRetArray.push(tObj);
                         return (tRetArray);
                      }
                  }
            */

            var tData = {
                ...args.datas[0],
            };

            var tMatlName = escapeSqlLiteral(tData.MATL_NAME);
            var tColor = escapeSqlLiteral(tData.COLOR);
            var tSpec = escapeSqlLiteral(tData.SPEC);
            var tMatlNameEsc = escapeSqlLiteral(tData.MATL_NAME);
            var tColorEsc = escapeSqlLiteral(tData.COLOR);
            var tSpecEsc = escapeSqlLiteral(tData.SPEC);

            if (tData.MATL_NAME === '') {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Material name is required.';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
            if (tData.VENDOR_CD === '') {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Vendor is required..';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
            if (tData.MATL_TYPE === '' || tData.MATL_TYPE2 === '') {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:You have to put Kind & Kind2.';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
            /*
            if (tData.CURR_CD === '') {
                  var tRetArray = [];
                  var tObj = {};
                  tObj.CODE = 'ERROR:Select currency..';
                  tObj.id = 0; 
                  tRetArray.push(tObj);
                  return (tRetArray);
            }
            */

            var tStatusCd = '0';
            if (tData.STATUS_CD !== '') tStatusCd = tData.STATUS_CD;

            var tMatlPrice = '0';
            if (tData.MATL_PRICE !== '') tMatlPrice = tData.MATL_PRICE;

            var tAddRate = '4';
            if (tData.ADD_RATE !== '') tAddRate = tData.ADD_RATE;

            var tAddAmt = '0';
            if (tData.ADD_AMT !== '') tAddAmt = tData.ADD_AMT;

            var tAddLoss = '0';
            if (tData.ADD_LOSS !== '') tAddLoss = tData.ADD_LOSS;

            if (tData.UNIT === '') {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Please select Unit type';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
            if (tData.MATL_TYPE2 === '') {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Please select Kind2.';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
            if (tData.MATL_TYPE2 === 'N') tData.MATL_TYPE2 = 'M';
            if (tData.MATL_TYPE2 === 'T') tData.MATL_TYPE2 = 'S';

            var tCountFlag = '0';
            if (tData.UNIT === 'PC') tCountFlag = '1';

            var tSQLArray = [];
            var retArray = [];

            var tPreFix =
                tData.MATL_TYPE + yyyy.toString().substring(2, 4) + '-';

            var tSQL = `
                select
                    isnull(max(seq), 0) as max_seq
                from
                    kcd_matl_mst
                where
                    matl_cd like '${tPreFix}%'
            `;
            var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
            var tRet = nRet0[0];
            var tMaxSeq = tRet.max_seq + 1;

            /*
            if (tMaxSeq > 99999) {
                if (tData.MATL_TYPE === 'S') tData.MATL_TYPE2 = 'T';
                if (tData.MATL_TYPE === 'M') tData.MATL_TYPE2 = 'N';

                tPreFix = tData.MATL_TYPE2 + yyyy.toString().substring(2, 4) + '-';
                tSQL = `
                    select
                        isnull(max(seq), 0) as max_seq
                    from
                        kcd_matl_mst
                    where
                        matl_cd like '${tPreFix}%'
                `;
                nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
                tRet = nRet0[0];
                tMaxSeq = tRet.max_seq + 1;
            }
            */

            var tZero = '00000';
            var tMaxStr = String(tMaxSeq);
            var tSeqStr = tZero.substring(0, 5 - tMaxStr.length) + tMaxStr;
            var tNewMatlCd = tPreFix + tSeqStr;

            var tMatlPrice = '0';

            var tSQL9 = `
                select
                    *
                from
                    kcd_matl_mst
                where
                    matl_name = '${tMatlNameEsc}'
                    and vendor_cd = '${tData.VENDOR_CD}'
                    and color = '${tColorEsc}'
                    and spec = '${tSpecEsc}'
            `;
            var nRet9 = await prisma.$queryRaw(Prisma.raw(tSQL9));
            if (nRet9.length > 0) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE =
                    'ERROR:중복된 Matl이 이미 존재합니다.<br><br>Existing Matl with same name, vendor, color, spec.';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tInObj = {};
            tInObj.MATL_CD = tNewMatlCd;
            tInObj.MATL_NAME = tData.MATL_NAME;
            tInObj.VENDOR_CD = tData.VENDOR_CD;
            tInObj.MATL_TYPE = tData.MATL_TYPE;
            tInObj.SEQ = tMaxStr;
            tInObj.COLOR = tData.COLOR;
            tInObj.SPEC = tData.SPEC;
            tInObj.UNIT = tData.UNIT;
            tInObj.WEIGHT = tData.WEIGHT;
            tInObj.BOX_UNIT = tData.BOX_UNIT;
            tInObj.COUNTRY = '';
            tInObj.COUNT_FLAG = tCountFlag;
            tInObj.STATUS_CD = tStatusCd;
            tInObj.REG_USER = tUserInfo.USER_ID;
            tInObj.REG_DATETIME = tRetDate;
            tInObj.ADD_RATE = tAddRate;
            tInObj.ADD_LOSS = tAddLoss;
            tInObj.ADD_AMT = tAddAmt;
            tInObj.MATL_TYPE2 = tData.MATL_TYPE2;
            tInObj.rep_matl_cd = tNewMatlCd;

            let tSQL99 = AFLib.createTableSql('KCD_MATL_MST', tInObj);
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            tInObj = {};
            tInObj.MATL_CD = tNewMatlCd;
            tInObj.MATL_SEQ = 1;
            tInObj.MATL_PRICE = tMatlPrice;
            tInObj.CURR_CD = tData.CURR_CD;
            tInObj.PRICE_TYPE = tData.PRICE_TYPE;
            tInObj.conf_flag = '0';
            tInObj.REG_USER = tUserInfo.USER_ID;
            tInObj.REG_DATETIME = tRetDate;
            tInObj.UPD_USER = tUserInfo.USER_ID;
            tInObj.UPD_DATETIME = tRetDate;

            let tSQL99 = AFLib.createTableSql('KCD_MATL_MEM', tInObj);
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            tInObj = {};
            tInObj.MATL_CD = tNewMatlCd;
            tInObj.MATL_SEQ = 1;
            tInObj.MATL_PRICE = tMatlPrice;
            tInObj.CURR_CD = tData.CURR_CD;
            tInObj.REG_USER = tUserInfo.USER_ID;
            tInObj.REG_DATETIME = tRetDate;
            tInObj.UPD_USER = tUserInfo.USER_ID;
            tInObj.UPD_DATETIME = tRetDate;

            let tSQL99 = AFLib.createTableSql('KCD_MATL_SALE', tInObj);
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                var tErrMsg = '';
                if (e && typeof e.message === 'string') tErrMsg = e.message;

                if (isMatlDuplicateError(tErrMsg)) {
                    tObj.CODE = DUP_MATL_MESSAGE;
                } else {
                    tObj.CODE = 'ERROR:MATL_RECORD';
                }
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED:' + tNewMatlCd;
            tObj.id = 0;
            tRetArray.push(tObj);
            return tRetArray;
        },

        mgrUpdate_S0301_MATL_RECORD_EDT_KCD_MATL_MST: async (
            _,
            args,
            contextValue,
        ) => {
            //
            var tRetDate = moment().format('YYYYMMDDHHmmss');
            var yyyy = moment().year();
            var tYY = 'B' + yyyy.toString().substring(2) + '-';

            // let tPO = "POA2022S672";
            var tUserInfo = AFLib.getUserInfo(contextValue);
            var tSQLArray = [];

            var tData = {
                ...args.datas[0],
            };

            var tMatlName = escapeSqlLiteral(tData.MATL_NAME);
            var tColor = escapeSqlLiteral(tData.COLOR);
            var tSpec = escapeSqlLiteral(tData.SPEC);

            if (tData.MATL_NAME === '') {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Material name is required.';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
            if (tData.VENDOR_CD === '') {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Vendor is required..';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
            if (tData.MATL_TYPE === '' || tData.MATL_TYPE2 === '') {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:You have to put Kind & Kind2.';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
            /*
                  if (tData.CURR_CD === '') {
                        var tRetArray = [];
                        var tObj = {};
                        tObj.CODE = 'ERROR:Select currency..';
                        tObj.id = 0; 
                        tRetArray.push(tObj);
                        return (tRetArray);
                  }
            */

            /*
                  var sql0 = `
                      select
                          *
                      from
                          kcd_user
                      where
                          user_id = '${tUserInfo.USER_ID}'
                  `;
                  var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                  if (nRet0.length <= 0) {
                      var tRetArray = [];
                      var tObj = {};
                      tObj.CODE = 'ERROR:NO User';
                      tObj.id = 0; 
                      tRetArray.push(tObj);
                      return (tRetArray);
                  } else {
                      var tObj = { ...nRet0[0] };
                      if (tObj.PART !== '08' && tObj.PART !== 'S11' && tObj.PART !== 'VMRP') {
                         var tRetArray = [];
                         var tObj = {};
                         tObj.CODE = 'ERROR:Oney MRP Team';
                         tObj.id = 0; 
                         tRetArray.push(tObj);
                         return (tRetArray);
                      }
                  }
            */

            var tData = {
                ...args.datas[0],
            };
            if (tData.UNIT === '') {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Please select Unit type';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
            if (tData.MATL_TYPE2 === '') {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Please select Kind2.';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
            if (tData.MATL_TYPE2 === 'N') tData.MATL_TYPE2 = 'M';
            if (tData.MATL_TYPE2 === 'T') tData.MATL_TYPE2 = 'S';

            var tCountFlag = '0';
            if (tData.UNIT === 'PC') tCountFlag = '1';

            /*
      let sql0 = `
          SELECT
              isnull(COUNT(*), 0) as cnt
          FROM
              KCD_MATL_MST
          WHERE
              MATL_NAME = '${tMatlName}'
              AND VENDOR_CD = '${tData.VENDOR_CD}'
              AND COLOR = '${tColor}'
              AND SPEC = '${tSpec}'
              and MATL_TYPE = '${tData.MATL_TYPE}'
              and UNIT = '${tData.UNIT}'
              and WEIGHT = '${tData.WEIGHT}'
              and BOX_UNIT = '${tData.BOX_UNIT}'
              and COUNT_FLAG = '${tCountFlag}'
              and STATUS_CD = '${tData.STATUS_CD}'
              and ADD_RATE = '${tData.ADD_RATE}'
              and ADD_AMT = '${tData.ADD_AMT}'
              and ADD_LOSS = '${tData.ADD_LOSS}'
              and MATL_TYPE2 = '${tData.MATL_TYPE2}'
      `;
      const tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
      var tCnt = 0;
      if (tRet0.length > 0) tCnt = tRet0[0].cnt;
      if (tCnt > 0){
           var tRetArray = [];
           var tObj = {};
           tObj.CODE = 'ERROR:Already have the same material';
           tObj.id = 0; 
           tRetArray.push(tObj);
           return (tRetArray);
    }
    */

            let sql1 = `
                select
                    *
                from
                    kcd_matl_mst
                where
                    matl_cd = '${tData.MATL_CD}'
            `;
            const tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
            var tDataOld = {
                ...tRet1[0],
            };

            let sql2 = `
                select distinct
                    b.po_cd
                from
                    ksv_po_mrp a,
                    ksv_po_mst b
                where
                    a.po_cd = b.po_cd
                    and a.po_seq = b.po_seq
                    and b.po_status in ('4', '5')
                    and b.po_type not in ('n', 's')
                    and a.matl_cd = '${tData.MATL_CD}'
            `;
            const tRet2 = await prisma.$queryRaw(Prisma.raw(sql2));
            var poArray = '';
            tRet2.forEach((col, i) => {
                if (i === 0) poArray = col.po_cd;
                else poArray += `/${col.po_cd}`;
            });

            // Vendor 변경 제한 조건 체크
            if (
                tDataOld.VENDOR_CD !== tData.VENDOR_CD
            ) {
                let sqlChk = `
                    select * from ksv_stock_mem2 
                    where  matl_cd = '${tData.MATL_CD}'
                `;
                const tRetChk = await prisma.$queryRaw(Prisma.raw(sqlChk));
                if (tRetChk.length > 0) {
                    var tRetArray = [];
                    var tObj = {}; 
                    tObj.CODE = 'ERROR:The [Supplier] of [Material] registered in [PU] cannot be changed.';
                    tObj.id = 0; 
                    tRetArray.push(tObj);
                    return tRetArray;
                }
            }


            if (
                tDataOld.VENDOR_CD !== tData.VENDOR_CD ||
                tDataOld.MATL_NAME !== tData.MATL_NAME ||
                tDataOld.COLOR !== tData.COLOR ||
                tDataOld.SPEC !== tData.SPEC ||
                tDataOld.UNIT !== tData.UNIT
            ) {
                if (tRet2.length > 0) {
                    if (!tData.UPDATE_REASON) {
                        var tRetArray = [];
                        var tObj = {};
                        tObj.CODE = `Confirm:You must input update reason:${poArray} `;
                        tObj.id = 0;
                        tRetArray.push(tObj);
                        return tRetArray;
                    } else {
                        var tInObj2 = {};
                        tInObj2.matl_cd = tData.MATL_CD;
                        tInObj2.update_remark = tData.UPDATE_REASON;
                        tInObj2.upd_user = tUserInfo.USER_ID;
                        tInObj2.upd_datetime = tRetDate;
                        let tSQL99 = AFLib.createTableSql(
                            'KCD_MATL_UPDATE_REMARK',
                            tInObj2,
                        );
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);
                    }
                }
            }

            var tObj = {};
            if (tDataOld.MATL_NAME !== tData.MATL_NAME)
                tObj.MATL_NAME = tData.MATL_NAME;
            if (tDataOld.VENDOR_CD !== tData.VENDOR_CD)
                tObj.VENDOR_CD = tData.VENDOR_CD;
            if (tDataOld.MATL_TYPE !== tData.MATL_TYPE)
                tObj.MATL_TYPE = tData.MATL_TYPE;
            if (tDataOld.COLOR !== tData.COLOR) tObj.COLOR = tData.COLOR;
            if (tDataOld.SPEC !== tData.SPEC) tObj.SPEC = tData.SPEC;
            if (tDataOld.UNIT !== tData.UNIT) tObj.UNIT = tData.UNIT;
            if (tDataOld.WEIGHT !== tData.WEIGHT) tObj.WEIGHT = tData.WEIGHT;
            if (tDataOld.BOX_UNIT !== tData.BOX_UNIT)
                tObj.BOX_UNIT = tData.BOX_UNIT;
            tObj.COUNT_FLAG = tCountFlag;
            if (tDataOld.STATUS_CD !== tData.STATUS_CD)
                tObj.STATUS_CD = tData.STATUS_CD;
            if (tDataOld.ADD_RATE !== tData.ADD_RATE)
                tObj.ADD_RATE = tData.ADD_RATE;
            if (tDataOld.ADD_AMT !== tData.ADD_AMT)
                tObj.ADD_AMT = tData.ADD_AMT;

            if (tDataOld.ADD_LOSS !== tData.ADD_LOSS)
                tObj.ADD_LOSS = tData.ADD_LOSS;
            if (tObj.ADD_LOSS === null) tObj.ADD_LOSS = '0';

            if (tDataOld.MATL_TYPE2 !== tData.MATL_TYPE2)
                tObj.MATL_TYPE2 = tData.MATL_TYPE2;
            tObj.UPD_USER = tUserInfo.USER_ID;
            tObj.UPD_DATETIME = tRetDate;

            let tSQL99 = AFLib.updateTableSql('KCD_MATL_MST', tObj);
            tSQL99 += `where MATL_CD = '${tData.MATL_CD}'`;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            let tSQL99 = `
                update kcd_matl_mem
                set
                    price_type = '${tData.PRICE_TYPE}'
                where
                    matl_cd = '${tData.MATL_CD}'
                    and matl_seq = (
                        select
                            max(matl_seq)
                        from
                            kcd_matl_mem
                        where
                            matl_cd = '${tData.MATL_CD}'
                    )
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                var tErrMsg = '';
                if (e && typeof e.message === 'string') tErrMsg = e.message;
                tObj.CODE = isMatlDuplicateError(tErrMsg)
                    ? DUP_MATL_MESSAGE
                    : 'ERROR:MATL_RECORD';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED:MATL_UPDATE:';
            tObj.id = 0;
            tRetArray.push(tObj);
            return tRetArray;
        },

        mgrUpdate_S0301_MATL_RECORD_EDT_KCD_MATL_MST_MULTI: async (
            _,
            args,
            contextValue,
        ) => {
            //
            var tRetDate = moment().format('YYYYMMDDHHmmss');
            var yyyy = moment().year();
            var tYY = 'B' + yyyy.toString().substring(2) + '-';

            // let tPO = "POA2022S672";
            var tUserInfo = AFLib.getUserInfo(contextValue);
            var tSQLArray = [];

            var tData = {
                ...args.datas[0],
            };
            var tData2 = [...args.datas1];

            var tMatlName = escapeSqlLiteral(tData.MATL_NAME);
            var tColor = escapeSqlLiteral(tData.COLOR);
            var tSpec = escapeSqlLiteral(tData.SPEC);
            var tMatlType = tData.MATL_TYPE;
            var tMatlType2 = tData.MATL_TYPE2;
            var tVendorCd = tData.VENDOR_CD;

            var tIdx = 0;
            for (tIdx = 0; tIdx < tData2.length; tIdx++) {
                var tOne = {
                    ...tData2[tIdx],
                };

                // Supplier 변경시 발주서에 포함여부 Check
                if (tData.VENDOR_CD) {
                    let sql2_9 = `
                        select * 
                        from
                            ksv_stock_mem2 
                        where
                            matl_cd = '${tOne.MATL_CD}' 
                    `;
                    const tRet2_9 = await prisma.$queryRaw(Prisma.raw(sql2_9));
                    if (tRet2_9.length > 0) {
                        var tRetArray = [];
                        var tObj = {};
                        tObj.CODE = `ERROR:MATL_UPDATE_MULTI.이미 발주처리된 자재의 업체를 변경할수 없습니다(${tOne.MATL_CD})  `;
                        tObj.id = 0;
                        tRetArray.push(tObj);
                        return tRetArray;
                    }
                }

                let sql2_0 = `
                    select distinct
                        b.po_cd
                    from
                        ksv_po_mrp a,
                        ksv_po_mst b
                    where
                        a.po_cd = b.po_cd
                        and a.po_seq = b.po_seq
                        and b.po_status in ('4', '5')
                        and b.po_type not in ('n', 's')
                        and a.matl_cd = '${tOne.MATL_CD}'
                `;
                const tRet2_0 = await prisma.$queryRaw(Prisma.raw(sql2_0));
                if (tRet2_0.length > 0) {
                    var tInObj2 = {};
                    tInObj2.matl_cd = tOne.MATL_CD;
                    tInObj2.update_remark = '';
                    tInObj2.upd_user = tUserInfo.USER_ID;
                    tInObj2.upd_datetime = tRetDate;
                    let tSQL99 = AFLib.createTableSql(
                        'KCD_MATL_UPDATE_REMARK',
                        tInObj2,
                    );
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }

                let sql2 = `
                    select
                        *
                    from
                        kcd_matl_mst
                    where
                        matl_cd = '${tOne.MATL_CD}'
                `;
                const tRet2 = await prisma.$queryRaw(Prisma.raw(sql2));
                var tDataOld = {
                    ...tRet2[0],
                };

                var tObj = {};
                if (tData.MATL_NAME !== '') tObj.MATL_NAME = tData.MATL_NAME;
                if (tData.COLOR !== '') tObj.COLOR = tData.COLOR;
                if (tData.SPEC !== '') tObj.SPEC = tData.SPEC;
                if (tData.MATL_TYPE !== '') tObj.MATL_TYPE = tMatlType;
                if (tData.MATL_TYPE2 !== '') tObj.MATL_TYPE2 = tMatlType2;
                if (tData.VENDOR_CD !== '') tObj.VENDOR_CD = tVendorCd;
                if (tData.UNIT !== '') tObj.UNIT = tData.UNIT;
                if (
                    typeof tData.STATUS_CD !== 'undefined' &&
                    tData.STATUS_CD !== null &&
                    tData.STATUS_CD !== ''
                )
                    tObj.STATUS_CD = tData.STATUS_CD;
                /*
                if (tDataOld.MATL_NAME !== tData.MATL_NAME) tObj.MATL_NAME  = tMatlName;
                if (tDataOld.COLOR !== tData.COLOR) tObj.COLOR  = tColor;
                if (tDataOld.SPEC !== tData.SPEC) tObj.SPEC  = tSpec;
                */
                if (Object.keys(tObj).length > 0) {
                    let tSQL99 = AFLib.updateTableSql('KCD_MATL_MST', tObj);
                    tSQL99 += `where MATL_CD = '${tOne.MATL_CD}'`;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }
            }

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                var tErrMsg = '';
                if (e && typeof e.message === 'string') tErrMsg = e.message;
                tObj.CODE = isMatlDuplicateError(tErrMsg)
                    ? DUP_MATL_MESSAGE
                    : 'ERROR:MATL_UPDATE_MULTI';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED:MATL_UPDATE_MULTI:';
            tObj.id = 0;
            tRetArray.push(tObj);
            return tRetArray;
        },

        mgrUpdate_S0301_ETC_UPDATE: async (_, args, contextValue) => {
            //
            var tRetDate = moment().format('YYYYMMDDHHmmss');
            var yyyy = moment().year();
            var tYY = 'B' + yyyy.toString().substring(2) + '-';

            // let tPO = "POA2022S672";
            var tUserInfo = AFLib.getUserInfo(contextValue);
            var tSQLArray = [];

            var tData = {
                ...args.datas[0],
            };
            var tMatlNameEsc = escapeSqlLiteral(tData.MATL_NAME);
            var tVendorCdEsc = escapeSqlLiteral(tData.VENDOR_CD);

            var tSQLArray = [];
            if (tData.HS_CD !== '') {
                var tObj = {};
                tObj.HS_CD = tData.HS_CD;
                let tSQL99 = AFLib.updateTableSql('KCD_MATL_MST', tObj);
                tSQL99 += `where MATL_CD = '${tData.MATL_CD}'`;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            }
            if (
                tData.COMP1 !== '' ||
                tData.COMP2 !== '' ||
                tData.COMP3 !== '' ||
                tData.COMP4 !== ''
            ) {
                var tSQL0 = `
                    delete from kcd_composition
                    where
                        matl_name = '${tMatlNameEsc}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL0));
                tSQLArray.push(tSQL99_1);

                var tObj = {};
                tObj.matl_name = tData.MATL_NAME;
                if (tObj.comp1 !== '' && tObj.comp1_percent !== '') {
                    tObj.comp1 = tData.COMP1;
                    tObj.comp1_percent = tData.COMP1_P;
                }
                if (tObj.comp2 !== '' && tObj.comp2_percent !== '') {
                    tObj.comp2 = tData.COMP2;
                    tObj.comp2_percent = tData.COMP2_P;
                }
                if (tObj.comp3 !== '' && tObj.comp3_percent !== '') {
                    tObj.comp3 = tData.COMP3;
                    tObj.comp3_percent = tData.COMP3_P;
                }
                if (tObj.comp4 !== '' && tObj.comp4_percent !== '') {
                    tObj.comp4 = tData.COMP4;
                    tObj.comp4_percent = tData.COMP4_P;
                }
                let tSQL99 = AFLib.createTableSql('KCD_COMPOSITION', tObj);
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            }
            if (tData.V_COMP !== '') {
                var tSQL0 = `
                    delete from kcd_composition_v
                    where
                        matl_name = '${tMatlNameEsc}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL0));
                tSQLArray.push(tSQL99_1);

                var tObj = {};
                tObj.matl_name = tData.MATL_NAME;
                tObj.comp1 = tData.V_COMP;
                let tSQL99 = AFLib.createTableSql('KCD_COMPOSITION_V', tObj);
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            }
            if (tData.OFFER_SPEC !== '') {
                var tSQL0 = `
                    delete from kcd_offer_spec
                    where
                        matl_name = '${tMatlNameEsc}'
                        and vendor_cd = '${tVendorCdEsc}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL0));
                tSQLArray.push(tSQL99_1);

                var tObj = {};
                tObj.matl_name = tData.MATL_NAME;
                tObj.vendor_cd = tData.VENDOR_CD;
                tObj.spec = tData.SPEC;
                tObj.offer_spec = tData.OFFER_SPEC;
                let tSQL99 = AFLib.createTableSql('KCD_OFFER_SPEC', tObj);
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            }

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:ETC_UPDATE';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED:ETC_UPDATE:';
            tObj.id = 0;
            tRetArray.push(tObj);
            return tRetArray;
        },

        mgrUpdate_S0301_SET_MOMCODE: async (_, args, contextValue) => {
            //
            var tRetDate = moment().format('YYYYMMDDHHmmss');
            var yyyy = moment().year();
            var tYY = 'B' + yyyy.toString().substring(2) + '-';

            // let tPO = "POA2022S672";
            var tUserInfo = AFLib.getUserInfo(contextValue);
            var tSQLArray = [];

            var tInput = {
                ...args.datas,
            };
            var tInput2 = [...args.datas1];

            var tIdx = 0;
            for (tIdx = 0; tIdx < tInput2.length; tIdx++) {
                var tOne = tInput2[tIdx];
                let tSQL99 = `
                    update kcd_matl_mst
                    set
                        rep_matl_cd = '${tInput.MOM_CD}'
                    where
                        matl_cd = '${tOne.MATL_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            }

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:SET_MOMCODE';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED:SET_MOMCODE:';
            tObj.id = 0;
            tRetArray.push(tObj);
            return tRetArray;
        },

        mgrDelete_S0301_MATL_RECORD_EDT_KCD_MATL_MST: async (
            _,
            args,
            contextValue,
        ) => {
            //
            var tRetDate = moment().format('YYYYMMDDHHmmss');
            var yyyy = moment().year();
            var tYY = 'B' + yyyy.toString().substring(2) + '-';

            // let tPO = "POA2022S672";
            var tUserInfo = AFLib.getUserInfo(contextValue);
            var tSQLArray = [];

            for (let di = 0; di < args.datas.length; di++) {
            var tData = {
                ...args.datas[di],
            };

            var sql1 = `
                select
                    isnull(count(matl_cd), 0) as cnt
                from
                    ksv_prod_mem
                where
                    matl_cd = '${tData.MATL_CD}'
            `;
            var nRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
            if (nRet1.length > 0 && nRet1[0].cnt > 0) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE =
                    'ERROR:I can not delete it because I have a product that uses material.';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var sql2 = `
                select
                    count(matl_cd) as cnt
                from
                    ksv_po_mrp
                where
                    matl_cd = '${tData.MATL_CD}'
            `;
            var nRet2 = await prisma.$queryRaw(Prisma.raw(sql2));
            if (nRet2.length > 0 && nRet2[0].cnt > 0) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE =
                    'ERROR:I can not delete it because I have a PO that uses material.';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            if (tData.STATUS_CD === '0') {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE =
                    'ERROR:Can not delete if Normal status of Matl.Check it again.';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            let sql99_del1 = `
                delete from kcd_matl_mst
                where
                    matl_cd = '${tData.MATL_CD}'
            `;
            tSQLArray.push(prisma.$queryRaw(Prisma.raw(sql99_del1)));

            let sql99_del2 = `
                delete from kcd_matl_mem
                where
                    matl_cd = '${tData.MATL_CD}'
            `;
            tSQLArray.push(prisma.$queryRaw(Prisma.raw(sql99_del2)));

            let sql99_del3 = `
                delete from kcd_matl_sale
                where
                    matl_cd = '${tData.MATL_CD}'
            `;
            tSQLArray.push(prisma.$queryRaw(Prisma.raw(sql99_del3)));

            } // end for di

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:MATL_RECORD';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED:MATL_UPDATE:';
            tObj.id = 0;
            tRetArray.push(tObj);
            return tRetArray;
        },

        mgrInsert_S0301_BATCH_SAVE: async (_, args, contextValue) => {
            //
            var tRetDate = moment().format('YYYYMMDDHHmmss');
            var yyyy = moment().year();
            var tYY = 'B' + yyyy.toString().substring(2) + '-';

            // let tPO = "POA2022S672";
            var tUserInfo = AFLib.getUserInfo(contextValue);
            var tInput = {
                ...args.datas,
            };
            var tInput1 = [...args.datas1];

            var sql0 = `
                select
                    *
                from
                    kcd_matl_mst
                where
                    matl_cd = '${tInput.MATL_CD}'
            `;
            var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            var tData = {
                ...nRet0[0],
            };

            var sql1 = `
                select
                    *
                from
                    kcd_matl_mem
                where
                    matl_cd = '${tInput.MATL_CD}'
            `;
            var nRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
            var tDataMem = {
                ...nRet1[0],
            };

            var sql2 = `
                select
                    *
                from
                    kcd_matl_sale
                where
                    matl_cd = '${tInput.MATL_CD}'
            `;
            var nRet2 = await prisma.$queryRaw(Prisma.raw(sql2));
            var tDataSale = {
                ...nRet2[0],
            };

            var tIdx = 0;
            for (tIdx = 0; tIdx < tInput1.length; tIdx++) {
                var tOne = tInput1[tIdx];
                var tOneMatlName = normalizeSqlText(tOne.MATL_NAME);
                var tOneColor = normalizeSqlText(tOne.COLOR);
                var tOneSpec = normalizeSqlText(tOne.SPEC);
                var tOneMatlNameEsc = escapeSqlLiteral(tOne.MATL_NAME);
                var tOneColorEsc = escapeSqlLiteral(tOne.COLOR);
                var tOneSpecEsc = escapeSqlLiteral(tOne.SPEC);

                var sql3 = `
                    select
                        isnull(count(*), 0) as cnt
                    from
                        kcd_matl_mst
                    where
                        matl_name = '${tOneMatlNameEsc}'
                        and color = '${tOneColorEsc}'
                        and spec = '${tOneSpecEsc}'
                `;
                var nRet3 = await prisma.$queryRaw(Prisma.raw(sql3));
                if (nRet3.length > 0 && nRet3[0].cnt > 0) continue;

                var tSQLArray = [];

                var tPreFix =
                    tData.MATL_TYPE + yyyy.toString().substring(2, 4) + '-';
                var tSQL = `
                    select
                        max(seq) as max_seq
                    from
                        kcd_matl_mst
                    where
                        matl_cd like '${tPreFix}%'
                `;
                var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
                var tRet = nRet0[0];
                var tMaxSeq = tRet.max_seq + 1;

                var tZero = '00000';
                var tMaxStr = String(tMaxSeq);
                var tSeqStr = tZero.substring(0, 5 - tMaxStr.length) + tMaxStr;
                var tNewMatlCd = tPreFix + tSeqStr;

                var tMatlPrice = '0';
                var tAddLoss = '0';

                var tInObj = {};
                tInObj.MATL_CD = tNewMatlCd;
                tInObj.MATL_NAME = tOneMatlName;
                tInObj.VENDOR_CD = tData.VENDOR_CD;
                tInObj.MATL_TYPE = tData.MATL_TYPE;
                tInObj.SEQ = tMaxStr;
                tInObj.COLOR = tOneColor;
                tInObj.SPEC = tOneSpec;
                tInObj.UNIT = tData.UNIT;
                tInObj.WEIGHT = tData.WEIGHT;
                tInObj.BOX_UNIT = tData.BOX_UNIT;
                tInObj.COUNTRY = '';
                tInObj.COUNT_FLAG = tData.COUNT_FLAG;
                tInObj.STATUS_CD = '0';
                tInObj.REG_USER = tUserInfo.USER_ID;
                tInObj.REG_DATETIME = tRetDate;
                tInObj.ADD_RATE = tData.ADD_RATE;
                tInObj.ADD_AMT = tData.ADD_AMT;
                tInObj.MATL_TYPE2 = tData.MATL_TYPE2;
                tInObj.rep_matl_cd = '';
                tInObj.ADD_LOSS = tAddLoss;

                let tSQL99 = AFLib.createTableSql('KCD_MATL_MST', tInObj);
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                tInObj = {};
                tInObj.MATL_CD = tNewMatlCd;
                tInObj.MATL_SEQ = 1;
                tInObj.MATL_PRICE = 0;
                tInObj.CURR_CD = tDataMem.CURR_CD;
                tInObj.PRICE_TYPE = tDataMem.PRICE_TYPE;
                tInObj.conf_flag = '0';
                tInObj.REG_USER = tUserInfo.USER_ID;
                tInObj.REG_DATETIME = tRetDate;
                tInObj.UPD_USER = tUserInfo.USER_ID;
                tInObj.UPD_DATETIME = tRetDate;

                let tSQL99 = AFLib.createTableSql('KCD_MATL_MEM', tInObj);
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                tInObj = {};
                tInObj.MATL_CD = tNewMatlCd;
                tInObj.MATL_SEQ = 1;
                tInObj.MATL_PRICE = 0;
                tInObj.CURR_CD = tDataSale.CURR_CD;
                tInObj.REG_USER = tUserInfo.USER_ID;
                tInObj.REG_DATETIME = tRetDate;
                tInObj.UPD_USER = tUserInfo.USER_ID;
                tInObj.UPD_DATETIME = tRetDate;

                let tSQL99 = AFLib.createTableSql('KCD_MATL_SALE', tInObj);
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                try {
                    global.currentTransactionInfo = {
                        contextValue: contextValue,
                        functionName: AFLib.getFunctionName(),
                    };
                    await prisma.$transaction(tSQLArray);
                    delete global.currentTransactionInfo;
                } catch (e) {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = 'ERROR:MATL_RECORD';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED:' + tUserInfo.USER_ID + ':' + tRetDate;
            tObj.id = 0;
            tRetArray.push(tObj);
            return tRetArray;
        },
        mgrInsert_S0301_BATCH_UPDATE: async (_, args, contextValue) => {
            //
            var tRetDate = moment().format('YYYYMMDDHHmmss');
            var yyyy = moment().year();
            var tYY = 'B' + yyyy.toString().substring(2) + '-';

            // let tPO = "POA2022S672";
            var tUserInfo = AFLib.getUserInfo(contextValue);
            var tInput = {
                ...args.datas,
            };
            var tInput1 = [...args.datas1];

            var tIdx = 0;
            for (tIdx = 0; tIdx < tInput1.length; tIdx++) {
                var tOne = tInput1[tIdx];

                var tSQLArray = [];

                var sql0 = `
                    select
                        *
                    from
                        kcd_matl_mst
                    where
                        matl_cd = '${tOne.MATL_CD}'
                `;
                var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                var tData = {
                    ...nRet0[0],
                };

                if (tInput.MATL_TYPE !== '') tData.MATL_TYPE = tInput.MATL_TYPE;
                if (tInput.MATL_TYPE2 !== '')
                    tData.MATL_TYPE2 = tInput.MATL_TYPE2;
                if (tInput.BOX_UNIT !== '') tData.BOX_UNIT = tInput.BOX_UNIT;
                if (tInput.STATUS_CD !== '') tData.STATUS_CD = tInput.STATUS_CD;
                if (tInput.ADD_RATE !== '') tData.ADD_RATE = tInput.ADD_RATE;

                var tInObj = {};
                tInObj.MATL_TYPE = tData.MATL_TYPE;
                tInObj.BOX_UNIT = tData.BOX_UNIT;
                tInObj.ADD_RATE = tData.ADD_RATE;
                tInObj.STATUS_CD = '0';
                tInObj.MATL_TYPE2 = tData.MATL_TYPE2;
                tInObj.MATL_NAME = tOne.MATL_NAME;
                tInObj.COLOR = tOne.COLOR;
                tInObj.SPEC = tOne.SPEC;

                let tSQL99 = AFLib.updateTableSql('KCD_MATL_MST', tInObj);
                tSQL99 += ` where matl_cd = '${tOne.MATL_CD}' `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                try {
                    global.currentTransactionInfo = {
                        contextValue: contextValue,
                        functionName: AFLib.getFunctionName(),
                    };
                    await prisma.$transaction(tSQLArray);
                    delete global.currentTransactionInfo;
                } catch (e) {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = 'ERROR:MATL_RECORD';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED:' + tUserInfo.USER_ID + ':' + tRetDate;
            tObj.id = 0;
            tRetArray.push(tObj);
            return tRetArray;
        },

        mgrInsert_S0301_BATCH_DELETE: async (_, args, contextValue) => {
            //
            var tRetDate = moment().format('YYYYMMDDHHmmss');
            var yyyy = moment().year();
            var tYY = 'B' + yyyy.toString().substring(2) + '-';

            // let tPO = "POA2022S672";
            var tUserInfo = AFLib.getUserInfo(contextValue);
            var tInput = {
                ...args.datas,
            };
            var tInput1 = [...args.datas1];

            var tIdx = 0;
            var tSQLArray = [];
            for (tIdx = 0; tIdx < tInput1.length; tIdx++) {
                var tOne = tInput1[tIdx];

                var sql0 = `
                    delete from kcd_matl_mst
                    where
                        matl_cd = '${tOne.MATL_CD}'
                `;
                var nRet0 = prisma.$queryRaw(Prisma.raw(sql0));
                tSQLArray.push(nRet0);

                var sql0 = `
                    delete from kcd_matl_mem
                    where
                        matl_cd = '${tOne.MATL_CD}'
                `;
                var nRet0 = prisma.$queryRaw(Prisma.raw(sql0));
                tSQLArray.push(nRet0);

                var sql0 = `
                    delete from kcd_matl_sale
                    where
                        matl_cd = '${tOne.MATL_CD}'
                `;
                var nRet0 = prisma.$queryRaw(Prisma.raw(sql0));
                tSQLArray.push(nRet0);
            }

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:BATCH_DELETE';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED:' + tUserInfo.USER_ID + ':' + tRetDate;
            tObj.id = 0;
            tRetArray.push(tObj);
            return tRetArray;
        },
    },
};

export default moduleMutation_S0301_MATL_RECORD_EDT_KCD_MATL_MST;
