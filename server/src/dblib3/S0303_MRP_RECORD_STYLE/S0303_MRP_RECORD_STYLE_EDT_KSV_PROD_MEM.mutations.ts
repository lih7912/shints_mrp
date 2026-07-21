// MGR_@@TNAME@@.mutations.js

import * as fs from 'fs';
import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기

/*
                STD_FLAG: String 
                NET: String 
                LOSS: String 
                USE_SIZE: String 
                REMARK: String 

*/

// export default로 Mutation 내용 내보내기
const moduleMutation_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM = {
    Mutation: {
        mgrInsert_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM: async (
            _,
            args,
            contextValue,
        ) => {
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
            var tSQLArray = [];

            var tProdCd = args.datas[0].PROD_CD;
            var tDeleteSQL = `
                delete from ksv_prod_mem
                where
                    prod_cd = '${tProdCd}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tDeleteSQL));
            tSQLArray.push(tSQL99_1);

            args.datas.forEach((col, i) => {
                var tObj = { ...col };
                delete tObj.MATL_TYPE2;
                delete tObj.MATL_NAME;
                delete tObj.COLOR;
                delete tObj.SPEC;
                delete tObj.MATL_PRICE;
                delete tObj.CURR_CD;
                delete tObj.UNIT;
                delete tObj.ADD_LOSS;
                delete tObj.VENDOR_NAME;
                delete tObj.VENDOR_STATUS;
                delete tObj.VENDOR_CD;

                if (tObj.VERSION === null) tObj.VERSION = '';
                if (tObj.MRP_CHECK === null) tObj.MRP_CHECK = '';
                if (tObj.ADD_LOSS === null) tObj.ADD_LOSS = '0';

                tObj.STD_NET = parseFloat(tObj.STD_NET);
                tObj.STD_LOSS = parseFloat(tObj.STD_LOSS);
                tObj.STD_GROSS = parseFloat(tObj.STD_GROSS);
                tObj.NET = parseFloat(tObj.NET);
                tObj.LOSS = parseFloat(tObj.LOSS);
                tObj.GROSS = parseFloat(tObj.GROSS);

                let tSQL99 = AFLib.createTableSql('KSV_PROD_MEM', tObj);
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            });

            var tUpdateSQL = '';
            args.datas.forEach((col, i) => {
                var tSQL = `
                    update kcd_matl_mst
                    set
                        add_loss = ${col.ADD_LOSS}
                    where
                        matl_cd = '${col.MATL_CD}';
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL));
                // tSQLArray.push(tSQL99_1);
            });

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
                var retArray = [];
                var tObj = {};
                tObj.CODE = tProdCd;
                tObj.id = 0;
                retArray.push(tObj);
                return retArray;
            } catch (e) {
                var retArray = [];
                var tObj = {};
                tObj.CODE = `ERROR: ${e.message}`;
                tObj.id = 0;
                retArray.push(tObj);
                return retArray;
            }
        },

        mgrUpdate_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM: async (
            _,
            args,
            contextValue,
        ) => {
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
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var retArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var tData = args.datas[tIdx];
                var tObjEDT_KSV_PROD_MEM = { ...tData };

                /*
        const retUpdate = await prisma.@@NAME@@.update({
           where: { id: tObj@@TNAME@@.id, },
           data: tObj@@TNAME@@, 
        });

        var tObj = {};
        tObj.CODE = retUpdate.FACTORY_CD;
        tObj.id = retUpdate.id;
        retArray.push(tObj);
*/
            }
            return retArray;
        },

        mgrDelete_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM: async (_, args) => {
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

            var retArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var tData = args.datas[tIdx];
                var tObjEDT_KSV_PROD_MEM = { ...tData };

                /*
        const retDelete = await prisma.@@TNAME@@.delete({
           where: { id: tObj@@TNAME@@.id, },
        });

        var tObj = {};
        tObj.CODE = tObj@@TNAME@@.id;
        retArray.push(tObj);
*/
            }
            return retArray;
        },
        mgrInsert_S0303_ALL_ADD_MATERIAL: async (_, args, contextValue) => {
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
            var tAddArray = [...args.datas]; // 추가할 데이타
            var tProdCdArray = [...args.datas1]; // 추가할 prod 목록
            var tAddPos = { ...args.datas2 }; // 추가할 Position

            var tIdx = 0;
            for (tIdx = 0; tIdx < tProdCdArray.length; tIdx++) {
                var tSQLArray = [];

                var tOne0 = tProdCdArray[tIdx];
                var tProdCd = tOne0.PROD_CD;
                var tSQL = `
                    select
                        *
                    from
                        ksv_prod_mem
                    where
                        prod_cd = '${tProdCd}'
                    order by
                        seq
                `;
                var nRet = await prisma.$queryRaw(Prisma.raw(tSQL));

                var tDeleteSQL = `
                    delete from ksv_prod_mem
                    where
                        prod_cd = '${tProdCd}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tDeleteSQL));
                tSQLArray.push(tSQL99_1);

                // get add object
                var tAddObj = [];
                tAddArray.forEach((col, i) => {
                    var tFlag = 0;
                    nRet.forEach((col1, i1) => {
                        if (
                            col.MATL_CD === col1.MATL_CD &&
                            col.USE_SIZE === col1.USE_SIZE &&
                            col.REMARK === col1.REMARK
                        )
                            tFlag = 1;
                    });
                    if (tFlag === 0) {
                        var tObj = { ...col };
                        tAddObj.push(tObj);
                    }
                });

                //
                var tFlag1 = 0;
                var tInsObj = [];
                var tIdx1 = 0;
                for (tIdx1 = 0; tIdx1 < nRet.length; tIdx1++) {
                    var tOne = { ...nRet[tIdx1] };
                    /*
             if (tOne.MATL_CD === tAddPos.MATL_CD &&
                 tOne.USE_SIZE === tAddPos.USE_SIZE &&
                 tOne.REMARK === tAddPos.REMARK && tFlag1 === 0) {
		     */
                    if (parseInt(tAddPos.SEQ) === tIdx1 + 1) {
                        tFlag1 = 1;
                        tInsObj.push(tOne);
                        tAddObj.forEach((col, i) => {
                            var tObj = { ...col };
                            delete tObj.MATL_TYPE2;
                            delete tObj.MATL_NAME;
                            delete tObj.COLOR;
                            delete tObj.SPEC;
                            delete tObj.MATL_PRICE;
                            delete tObj.CURR_CD;
                            delete tObj.UNIT;
                            delete tObj.VENDOR_NAME;
                            delete tObj.VENDOR_STATUS;
                            delete tObj.VENDOR_CD;
                            delete tObj.ADD_LOSS;

                            if (tObj.VERSION === null) tObj.VERSION = '';
                            if (tObj.MRP_CHECK === null) tObj.MRP_CHECK = '';

                            tObj.PROD_CD = tProdCd;
                            tInsObj.push(tObj);
                        });
                    } else {
                        tInsObj.push(tOne);
                    }
                }

                if (tFlag1 === 0) {
                    tAddObj.forEach((col, i) => {
                        var tObj = { ...col };
                        delete tObj.MATL_TYPE2;
                        delete tObj.MATL_NAME;
                        delete tObj.COLOR;
                        delete tObj.SPEC;
                        delete tObj.MATL_PRICE;
                        delete tObj.CURR_CD;
                        delete tObj.UNIT;
                        delete tObj.VENDOR_NAME;
                        delete tObj.VENDOR_STATUS;
                        delete tObj.VENDOR_CD;
                        delete tObj.ADD_LOSS;

                        if (tObj.VERSION === null) tObj.VERSION = '';
                        if (tObj.MRP_CHECK === null) tObj.MRP_CHECK = '';

                        tObj.PROD_CD = tProdCd;
                        tObj.STD_NET = parseFloat(tObj.STD_NET);
                        tObj.STD_LOSS = parseFloat(tObj.STD_LOSS);
                        tObj.STD_GROSS = parseFloat(tObj.STD_GROSS);
                        tObj.NET = parseFloat(tObj.NET);
                        tObj.LOSS = parseFloat(tObj.LOSS);
                        tObj.GROSS = parseFloat(tObj.GROSS);
                        tInsObj.push(tObj);
                    });
                }

                var tIdx2 = 0;
                for (tIdx2 = 0; tIdx2 < tInsObj.length; tIdx2++) {
                    var tOne = { ...tInsObj[tIdx2] };
                    tOne.SEQ = tIdx2 + 1;
                    delete tOne.id;
                    let tSQL99 = AFLib.createTableSql('KSV_PROD_MEM', tOne);
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                    if (
                        typeof tOne.ADD_LOSS !== 'undefined' &&
                        parseFloat(tOne.ADD_LOSS) !== 0
                    ) {
                        var tSQL = `
                            update kcd_matl_mst
                            set
                                add_loss = ${tOne.ADD_LOSS}
                            where
                                matl_cd = '${tOne.MATL_CD}';
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL));
                        // tSQLArray.push(tSQL99_1);
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
                    var retArray = [];
                    var tObj = {};
                    var tErrMsg = '';
                    if (e && typeof e.message === 'string') tErrMsg = e.message;

                    if (
                        tErrMsg.includes('KSV_PROD_MEM_PK') ||
                        tErrMsg.includes('KSV_PROD_MPR_PK') ||
                        tErrMsg.includes('중복 키 행을 삽입할 수 없습니다') ||
                        tErrMsg.includes('Cannot insert duplicate key row')
                    ) {
                        tObj.CODE = 'ERROR:Same material exist';
                    } else {
                        tObj.CODE = `ERROR:${tErrMsg}`;
                    }
                    tObj.id = 0;
                    retArray.push(tObj);
                    return retArray;
                }
            }
            var retArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCESS:Add Prod';
            tObj.id = 0;
            retArray.push(tObj);
            return retArray;
        },

        mgrInsert_S0303_ALL_UPDATE_MATERIAL: async (_, args, contextValue) => {
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
            var tAddArray = [...args.datas]; // 추가할 데이타
            var tProdCdArray = [...args.datas1]; // 추가할 prod 목록
            var tAddPos = { ...args.datas2 }; // 추가할 Position

            var tIdx = 0;
            
            for (tIdx = 0; tIdx < tProdCdArray.length; tIdx++) {
                var tOne = { ...tProdCdArray[tIdx] };

                var tSQLArray = [];

                tAddArray.forEach((col, i) => {
                    var tObj = {};
                    const tWhereMatlCd = col.MATL_CD || col.S_MATL_CD;
                    tObj.STD_NET = col.STD_NET;
                    tObj.STD_LOSS = col.STD_LOSS;
                    tObj.STD_GROSS = col.STD_GROSS;
                    tObj.NET = col.NET;
                    tObj.LOSS = col.LOSS;
                    tObj.GROSS = col.GROSS;
                    tObj.REMARK = col.REMARK;
                    tObj.USE_SIZE = col.USE_SIZE;
                    tObj.MRP_CHECK = col.MRP_CHECK;
                    tObj.DL_FLAG = col.DL_FLAG;
                    tObj.COUNTRY = col.COUNTRY;

                    let tSQL99 = AFLib.updateTableSql('KSV_PROD_MEM', tObj);
                    if (!tSQL99) return; // skip if nothing to update
                    tSQL99 += `where matl_cd = '${tWhereMatlCd}' `;
                    tSQL99 += `and  prod_cd = '${tOne.PROD_CD}' `;
                    tSQL99 += `and  seq = '${col.SEQ}' `;

                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);


                    tObj = {
                        UPD_USER: tUserInfo.USER_ID,
                        UPD_DATETIME: tRetDate
                    };

                    const updUserDateTime = AFLib.updateTableSql('KSV_PROD_MST', tObj);
                    updUserDateTime += `where prod_cd = '${tOne.PROD_CD}' `;
                    const tSQL99_2 = prisma.$queryRaw(Prisma.raw(updUserDateTime));
                    tSQLArray.push(tSQL99_2);
                    

                    if (parseFloat(col.ADD_LOSS) > 0) {
                        var tSQL = `
                            update kcd_matl_mst
                            set
                                add_loss = ${col.ADD_LOSS}
                            where
                                matl_cd = '${tWhereMatlCd}';
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL));
                        // tSQLArray.push(tSQL99_1);
                    }
                });

                try {
                    global.currentTransactionInfo = {
                        contextValue: contextValue,
                        functionName: AFLib.getFunctionName(),
                    };
                    await prisma.$transaction(tSQLArray);
                    delete global.currentTransactionInfo;
                } catch (e) {
                    var retArray = [];
                    var tObj = {};
                    tObj.CODE = 'ERROR:Update Prod Mem';
                    tObj.id = 0;
                    retArray.push(tObj);
                    return retArray;
                }
            }
            var retArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCESS:Update Prod';
            tObj.id = 0;
            retArray.push(tObj);
            return retArray;
        },

        mgrInsert_S0303_ALL_UPDATE_MATERIAL_NET_LOSS: async (
            _,
            args,
            contextValue,
        ) => {
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
            var tAddArray0 = [...args.datas]; // 추가할 데이타
            var tProdCdArray = [...args.datas1]; // 추가할 prod 목록
            var tEditObj = { ...args.datas2 }; // 추가할 Position

            var tIdx = 0;
            for (tIdx = 0; tIdx < tProdCdArray.length; tIdx++) {
                var tOne = { ...tProdCdArray[tIdx] };

                var sql0 = `
                    select
                        a.*,
                        isnull(b.ADD_LOSS, 0) as ADD_LOSS
                    from
                        ksv_prod_mem a,
                        kcd_matl_mst b
                    where
                        a.prod_cd = '${tOne.PROD_CD}'
                        and a.matl_cd = b.matl_cd
                    order by
                        a.seq
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));

                var tAddArray = [];
                if (tEditObj.ALL_FLAG === '1') {
                    tAddArray = [...tRet0];
                } else {
                    tAddArray = [...tAddArray0];
                }

                var tSQLArray = [];
                tAddArray.forEach((col, i) => {
                    var tObj = {};

                    if (tEditObj.STD_FLAG === '1') {
                        var tStdNet = col.STD_NET;
                        var tStdLoss = col.STD_LOSS;
                        var tNet = col.NET;
                        var tLoss = col.LOSS;
                        if (tEditObj.NET !== '') {
                            tStdNet = tEditObj.NET;
                            tNet = tEditObj.NET;
                        }
                        if (tEditObj.LOSS !== '') {
                            tStdLoss = tEditObj.LOSS;
                            tLoss = tEditObj.LOSS;
                        }
                        var tStdGross =
                            parseFloat(tStdNet) +
                            parseFloat(tStdNet) *
                                (parseFloat(tStdLoss) +
                                    parseFloat(col.ADD_LOSS)) *
                                0.01;
                        var tGross =
                            parseFloat(tNet) +
                            parseFloat(tNet) *
                                (parseFloat(tLoss) + parseFloat(col.ADD_LOSS)) *
                                0.01;
                        tObj.STD_NET = tStdNet;
                        tObj.STD_LOSS = tStdLoss;
                        tObj.STD_GROSS = String(tStdGross);
                        tObj.NET = tStdNet;
                        tObj.LOSS = tStdLoss;
                        tObj.GROSS = String(tGross);

                        let tSQL99 = AFLib.updateTableSql('KSV_PROD_MEM', tObj);
                    if (!tSQL99) return; // skip if nothing to update
                        tSQL99 += `where matl_cd = '${col.MATL_CD}' `;
                        tSQL99 += `and  prod_cd = '${tOne.PROD_CD}' `;
                        tSQL99 += `and  seq = '${col.SEQ}' `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);
                    } else {
                        var tNet = col.NET;
                        var tLoss = col.LOSS;
                        if (tEditObj.NET !== '') tNet = tEditObj.NET;
                        if (tEditObj.LOSS !== '') tLoss = tEditObj.LOSS;
                        var tGross =
                            parseFloat(tNet) +
                            parseFloat(tNet) *
                                (parseFloat(tLoss) + parseFloat(col.ADD_LOSS)) *
                                0.01;
                        // Keep STD values persisted from each row payload even when STD_FLAG is off.
                        tObj.STD_NET = col.STD_NET;
                        tObj.STD_LOSS = col.STD_LOSS;
                        tObj.STD_GROSS = col.STD_GROSS;
                        tObj.NET = tNet;
                        tObj.LOSS = tLoss;
                        tObj.GROSS = String(tGross);

                        let tSQL99 = AFLib.updateTableSql('KSV_PROD_MEM', tObj);
                    if (!tSQL99) return; // skip if nothing to update
                        tSQL99 += `where matl_cd = '${col.MATL_CD}' `;
                        tSQL99 += `and  prod_cd = '${tOne.PROD_CD}' `;
                        tSQL99 += `and  seq = '${col.SEQ}' `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);
                    }
                });

                try {
                    global.currentTransactionInfo = {
                        contextValue: contextValue,
                        functionName: AFLib.getFunctionName(),
                    };
                    await prisma.$transaction(tSQLArray);
                    delete global.currentTransactionInfo;
                } catch (e) {
                    var retArray = [];
                    var tObj = {};
                    tObj.CODE = 'ERROR:Update Prod Mem';
                    tObj.id = 0;
                    retArray.push(tObj);
                    return retArray;
                }
            }
            var retArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCESS:Update Prod';
            tObj.id = 0;
            retArray.push(tObj);
            return retArray;
        },

        mgrInsert_S0303_ALL_UPDATE_MATERIAL_MOVE_UP: async (
            _,
            args,
            contextValue,
        ) => {
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
            var tWorkObj = { ...args.datas[0] }; // 추가할 데이타
            var tProdCdArray = [...args.datas1]; // 추가할 prod 목록
            var tEditObj = { ...args.datas2 }; // 추가할 Position

            var tIdx = 0;
            for (tIdx = 0; tIdx < tProdCdArray.length; tIdx++) {
                var tOne = { ...tProdCdArray[tIdx] };
                var tSQLArray = [];

                var sql0 = `
                    select
                        a.*
                    from
                        ksv_prod_mem a
                    where
                        a.prod_cd = '${tOne.PROD_CD}'
                    order by
                        a.seq
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));

                // Find Self Position
                var tOrgPos = -1;
                var tOrgObj = {};
                tRet0.forEach((col, i) => {
                    var tObj = { ...col };
                    if (
                        col.MATL_CD === tWorkObj.MATL_CD &&
                        col.USE_SIZE === tWorkObj.USE_SIZE &&
                        col.REMARK === tWorkObj.REMARK
                    ) {
                        tOrgPos = i;
                        tOrgObj = { ...tObj };
                    }
                });

                // If the selected row does not exist for this prod, skip to next prod.
                if (tOrgPos < 0) continue;

                var tDestPos = -1;
                if (tEditObj.IS_TOP === '1') {
                    tDestPos = 0;
                } else {
                    tDestPos = tOrgPos - parseInt(tEditObj.MOVE_CNT);
                    if (tDestPos < 0) tDestPos = 0;
                }

                var tInObj = [];
                tRet0.forEach((col, i) => {
                    var tObj = { ...col };
                    if (i === tDestPos) {
                        tInObj.push(tOrgObj);
                        tInObj.push(tObj);
                    } else if (i === tOrgPos) {
                    } else {
                        tInObj.push(tObj);
                    }
                });

                tInObj.forEach((col, i) => {
                    var tObj2 = {};
                    tObj2.SEQ = i + 1;
                    const tWhereUseSize = String(col.USE_SIZE || '').replace(
                        /'/gi,
                        "''",
                    );
                    const tWhereRemark = String(col.REMARK || '').replace(
                        /'/gi,
                        "''",
                    );

                    let tSQL99 = AFLib.updateTableSql('KSV_PROD_MEM', tObj2);
                    if (!tSQL99) return; // skip if nothing to update
                    tSQL99 += `where matl_cd = '${col.MATL_CD}' `;
                    tSQL99 += `and  prod_cd = '${tOne.PROD_CD}' `;
                    tSQL99 += `and  use_size = '${tWhereUseSize}' `;
                    tSQL99 += `and  remark = '${tWhereRemark}' `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                });

                try {
                    global.currentTransactionInfo = {
                        contextValue: contextValue,
                        functionName: AFLib.getFunctionName(),
                    };
                    await prisma.$transaction(tSQLArray);
                    delete global.currentTransactionInfo;
                } catch (e) {
                    var retArray = [];
                    var tObj = {};
                    tObj.CODE = 'ERROR:Update Prod Mem';
                    tObj.id = 0;
                    retArray.push(tObj);
                    return retArray;
                }
            }
            var retArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCESS:Update Prod';
            tObj.id = 0;
            retArray.push(tObj);
            return retArray;
        },

        mgrInsert_S0303_ALL_UPDATE_MATERIAL_MOVE_DOWN: async (
            _,
            args,
            contextValue,
        ) => {
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
            var tWorkObj = { ...args.datas[0] }; // 추가할 데이타
            var tProdCdArray = [...args.datas1]; // 추가할 prod 목록
            var tEditObj = { ...args.datas2 }; // 추가할 Position

            var tIdx = 0;
            for (tIdx = 0; tIdx < tProdCdArray.length; tIdx++) {
                var tOne = { ...tProdCdArray[tIdx] };
                var tSQLArray = [];

                var sql0 = `
                    select
                        a.*
                    from
                        ksv_prod_mem a
                    where
                        a.prod_cd = '${tOne.PROD_CD}'
                    order by
                        a.seq
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));

                // Find Self Position
                var tOrgPos = -1;
                var tOrgObj = {};
                tRet0.forEach((col, i) => {
                    var tObj = { ...col };
                    if (
                        col.MATL_CD === tWorkObj.MATL_CD &&
                        col.USE_SIZE === tWorkObj.USE_SIZE &&
                        col.REMARK === tWorkObj.REMARK
                    ) {
                        tOrgPos = i;
                        tOrgObj = { ...tObj };
                    }
                });

                // If the selected row does not exist for this prod, skip to next prod.
                if (tOrgPos < 0) continue;

                var tDestPos = -1;
                if (tEditObj.IS_BOTTOM === '1') {
                    tDestPos = tRet0.length - 1;
                } else {
                    tDestPos = tOrgPos + parseInt(tEditObj.MOVE_CNT);
                    if (tDestPos > tRet0.length - 1)
                        tDestPos = tRet0.length - 1;
                }

                var tInObj = [];
                tRet0.forEach((col, i) => {
                    var tObj = { ...col };
                    if (i === tDestPos) {
                        tInObj.push(tObj);
                        tInObj.push(tOrgObj);
                    } else if (i === tOrgPos) {
                    } else {
                        tInObj.push(tObj);
                    }
                });

                tInObj.forEach((col, i) => {
                    var tObj2 = {};
                    tObj2.SEQ = i + 1;
                    const tWhereUseSize = String(col.USE_SIZE || '').replace(
                        /'/gi,
                        "''",
                    );
                    const tWhereRemark = String(col.REMARK || '').replace(
                        /'/gi,
                        "''",
                    );

                    let tSQL99 = AFLib.updateTableSql('KSV_PROD_MEM', tObj2);
                    if (!tSQL99) return; // skip if nothing to update
                    tSQL99 += `where matl_cd = '${col.MATL_CD}' `;
                    tSQL99 += `and  prod_cd = '${tOne.PROD_CD}' `;
                    tSQL99 += `and  use_size = '${tWhereUseSize}' `;
                    tSQL99 += `and  remark = '${tWhereRemark}' `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                });

                try {
                    global.currentTransactionInfo = {
                        contextValue: contextValue,
                        functionName: AFLib.getFunctionName(),
                    };
                    await prisma.$transaction(tSQLArray);
                    delete global.currentTransactionInfo;
                } catch (e) {
                    var retArray = [];
                    var tObj = {};
                    tObj.CODE = 'ERROR:Update Prod Mem';
                    tObj.id = 0;
                    retArray.push(tObj);
                    return retArray;
                }
            }
            var retArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCESS:Update Prod';
            tObj.id = 0;
            retArray.push(tObj);
            return retArray;
        },

        mgrInsert_S0303_ALL_UPDATE_MATERIAL_SIZE_USAGE: async (
            _,
            args,
            contextValue,
        ) => {
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
            var tAddArray0 = [...args.datas]; // 추가할 데이타
            var tProdCdArray = [...args.datas1]; // 추가할 prod 목록
            var tEditObj = { ...args.datas2 }; // 추가할 Position

            var tIdx = 0;
            for (tIdx = 0; tIdx < tProdCdArray.length; tIdx++) {
                var tOne = { ...tProdCdArray[tIdx] };

                var sql0 = `
                    select
                        a.*,
                        isnull(b.ADD_LOSS, 0) as ADD_LOSS
                    from
                        ksv_prod_mem a,
                        kcd_matl_mst b
                    where
                        a.prod_cd = '${tOne.PROD_CD}'
                        and a.matl_cd = b.matl_cd
                    order by
                        a.seq
                `;
                var tRet0_1 = await prisma.$queryRaw(Prisma.raw(sql0));
                var tRet0 = [];
                tRet0_1.forEach((col, i) => {
                    var tObj = { ...col };
                    tObj.S_MATL_CD = tObj.MATL_CD;
                    tObj.S_USE_SIZE = tObj.USE_SIZE;
                    tObj.S_REMARK = tObj.REMARK.replace(/'/gi, "''");
                    tRet0.push(tObj);
                });

                var tAddArray = [];
                if (tEditObj.ALL_FLAG === '1') {
                    tAddArray = [...tRet0];
                } else {
                    tAddArray = [...tAddArray0];
                }

                var tSQLArray = [];
                tAddArray.forEach((col, i) => {
                    var tObj = {};
                    const tWhereMatlCd = col.S_MATL_CD || col.MATL_CD;
                    const tWhereUseSize =
                        typeof col.S_USE_SIZE !== 'undefined'
                            ? col.S_USE_SIZE
                            : col.USE_SIZE;
                    const tWhereRemarkRaw =
                        typeof col.S_REMARK !== 'undefined'
                            ? col.S_REMARK
                            : col.REMARK;
                    const tWhereRemark = String(
                        tWhereRemarkRaw || '',
                    ).replace(/'/gi, "''");
                    if (tEditObj.USE_SIZE !== '')
                        tObj.USE_SIZE = tEditObj.USE_SIZE;
                    if (tEditObj.REMARK !== '')
                        tObj.REMARK = tEditObj.REMARK.replace(/'/gi, "''");

                    let tSQL99 = AFLib.updateTableSql('KSV_PROD_MEM', tObj);
                    if (!tSQL99) return; // skip if nothing to update
                    if (tEditObj.ALL_FLAG === '1') {
                        // ALL_FLAG: use DB-fetched S_ values for WHERE
                        tSQL99 += `where matl_cd = '${tWhereMatlCd}' `;
                        tSQL99 += `and  prod_cd = '${tOne.PROD_CD}' `;
                        tSQL99 += `and  use_size = '${tWhereUseSize}' `;
                        tSQL99 += `and  remark = '${tWhereRemark}' `;
                    } else {
                        // selected rows: identify by SEQ to avoid NULL/mismatch issues
                        tSQL99 += `where matl_cd = '${tWhereMatlCd}' `;
                        tSQL99 += `and  prod_cd = '${tOne.PROD_CD}' `;
                        tSQL99 += `and  seq = '${col.SEQ}' `;
                    }
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                });

                try {
                    global.currentTransactionInfo = {
                        contextValue: contextValue,
                        functionName: AFLib.getFunctionName(),
                    };
                    await prisma.$transaction(tSQLArray);
                    delete global.currentTransactionInfo;
                } catch (e) {
                    var retArray = [];
                    var tObj = {};
                    tObj.CODE = 'ERROR:Update Prod Mem';
                    tObj.id = 0;
                    retArray.push(tObj);
                    return retArray;
                }
            }
            var retArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCESS:Update Prod';
            tObj.id = 0;
            retArray.push(tObj);
            return retArray;
        },

        mgrInsert_S0303_ALL_UPDATE_MATERIAL_DL_FLAG: async (
            _,
            args,
            contextValue,
        ) => {
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
            var tAddArray0 = [...args.datas]; // 추가할 데이타
            var tProdCdArray = [...args.datas1]; // 추가할 prod 목록
            var tEditObj = { ...args.datas2 }; // 추가할 Position

            var tIdx = 0;
            for (tIdx = 0; tIdx < tProdCdArray.length; tIdx++) {
                var tOne = { ...tProdCdArray[tIdx] };

                var sql0 = `
                    select
                        a.*,
                        isnull(b.ADD_LOSS, 0) as ADD_LOSS
                    from
                        ksv_prod_mem a,
                        kcd_matl_mst b
                    where
                        a.prod_cd = '${tOne.PROD_CD}'
                        and a.matl_cd = b.matl_cd
                    order by
                        a.seq
                `;
                var tRet0_1 = await prisma.$queryRaw(Prisma.raw(sql0));
                var tRet0 = [];
                tRet0_1.forEach((col, i) => {
                    var tObj = { ...col };
                    tObj.S_MATL_CD = tObj.MATL_CD;
                    tObj.S_USE_SIZE = tObj.USE_SIZE;
                    tObj.S_REMARK = tObj.REMARK.replace(/'/gi, "''");
                    tRet0.push(tObj);
                });

                var tAddArray = [];
                if (tEditObj.ALL_FLAG === '1') {
                    tAddArray = [...tRet0];
                } else {
                    tAddArray = [...tAddArray0];
                }

                var tSQLArray = [];
                tAddArray.forEach((col, i) => {
                    var tObj = {};
                    const tWhereMatlCd = col.S_MATL_CD || col.MATL_CD;
                    const tWhereUseSize =
                        typeof col.S_USE_SIZE !== 'undefined'
                            ? col.S_USE_SIZE
                            : col.USE_SIZE;
                    const tWhereRemarkRaw =
                        typeof col.S_REMARK !== 'undefined'
                            ? col.S_REMARK
                            : col.REMARK;
                    const tWhereRemark = String(
                        tWhereRemarkRaw || '',
                    ).replace(/'/gi, "''");
                    tObj.DL_FLAG = col.DL_FLAG;
                    let tSQL99 = AFLib.updateTableSql('KSV_PROD_MEM', tObj);
                    if (!tSQL99) return; // skip if DL_FLAG is null
                    tSQL99 += `where matl_cd = '${tWhereMatlCd}' `;
                    tSQL99 += `and  prod_cd = '${tOne.PROD_CD}' `;
                    tSQL99 += `and  use_size = '${tWhereUseSize}' `;
                    tSQL99 += `and  remark = '${tWhereRemark}' `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                });

                try {
                    global.currentTransactionInfo = {
                        contextValue: contextValue,
                        functionName: AFLib.getFunctionName(),
                    };
                    await prisma.$transaction(tSQLArray);
                    delete global.currentTransactionInfo;
                } catch (e) {
                    var retArray = [];
                    var tObj = {};
                    tObj.CODE = 'ERROR:Update Prod Mem';
                    tObj.id = 0;
                    retArray.push(tObj);
                    return retArray;
                }
            }
            var retArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCESS:Update Prod';
            tObj.id = 0;
            retArray.push(tObj);
            return retArray;
        },

        mgrInsert_S0303_ALL_UPDATE_MATERIAL_STD_LOSS_TO_LOSS: async (
            _,
            args,
            contextValue,
        ) => {
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
            var tAddArray0 = [...args.datas]; // 추가할 데이타
            var tProdCdArray = [...args.datas1]; // 추가할 prod 목록
            var tEditObj = { ...args.datas2 }; // 추가할 Position

            var tSizeLossTypeCnt = tProdCdArray.length;

            var tIdx = 0;
            for (tIdx = 0; tIdx < tProdCdArray.length; tIdx++) {
                var tOne = { ...tProdCdArray[tIdx] };

                var sql0 = `
                    select
                        a.*,
                        isnull(b.ADD_LOSS, 0) as ADD_LOSS
                    from
                        ksv_prod_mem a,
                        kcd_matl_mst b
                    where
                        a.prod_cd = '${tOne.PROD_CD}'
                        and a.matl_cd = b.matl_cd
                    order by
                        a.seq
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));

                var tAddArray = [];
                if (tEditObj.ALL_FLAG === '1') {
                    tAddArray = [...tRet0];
                } else {
                    tAddArray = [...tAddArray0];
                }

                var tSQLArray = [];
                tAddArray.forEach((col, i) => {
                    var tObj = {};
                    var tNet = col.NET;
                    var tLoss = col.STD_LOSS;
                    var tGross =
                        parseFloat(tNet) +
                        parseFloat(tNet) *
                            (parseFloat(tLoss) + parseFloat(col.ADD_LOSS)) *
                            0.01;
                    tObj.NET = tNet;
                    tObj.LOSS = tLoss;
                    tObj.GROSS = String(tGross);

                    let tSQL99 = AFLib.updateTableSql('KSV_PROD_MEM', tObj);
                    if (!tSQL99) return; // skip if nothing to update

                    if (tSizeLossTypeCnt > 1) {
                        tSQL99 += `where matl_cd = '${col.MATL_CD}' `;
                        tSQL99 += `and  prod_cd = '${tOne.PROD_CD}' `;
                        tSQL99 += `and  use_size = '${col.USE_SIZE}' `;
                        tSQL99 += `and  remark = '${col.S_REMARK.replace(/'/gi, "''")}' `;
                    } else {
                        tSQL99 += `where seq = '${col.SEQ}' `;
                    }
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                });

                try {
                    global.currentTransactionInfo = {
                        contextValue: contextValue,
                        functionName: AFLib.getFunctionName(),
                    };
                    await prisma.$transaction(tSQLArray);
                    delete global.currentTransactionInfo;
                } catch (e) {
                    var retArray = [];
                    var tObj = {};
                    tObj.CODE = 'ERROR:Update Prod Mem';
                    tObj.id = 0;
                    retArray.push(tObj);
                    return retArray;
                }
            }
            var retArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCESS:Update Prod';
            tObj.id = 0;
            retArray.push(tObj);
            return retArray;
        },

        mgrInsert_S0303_ALL_CHANGE_MATERIAL: async (_, args, contextValue) => {
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
            var tProdCdArray = [...args.datas1]; // 추가할 prod 목록
            var tAddPos = { ...args.datas2 }; // 추가할 Position
            var tChangeMatlArray = [...args.datas]; // 변경할 자재 데이터 배열

            var tIdx = 0;
            for (tIdx = 0; tIdx < tProdCdArray.length; tIdx++) {
                var tOne = { ...tProdCdArray[tIdx] };
                var tSQLArray = [];

                // 각 선택된 행마다 반복
                for (let mIdx = 0; mIdx < tChangeMatlArray.length; mIdx++) {
                    var tChangeMatlObj = { ...tChangeMatlArray[mIdx] };
                    var tNewMatl = tChangeMatlObj.MATL_CD;
                    var tOldMatl =
                        tChangeMatlObj.S_MATL_CD || tChangeMatlObj.MATL_CD;
                    var tUseSize =
                        typeof tChangeMatlObj.USE_SIZE === 'string'
                            ? tChangeMatlObj.USE_SIZE
                            : '';
                    var tRemark =
                        typeof tChangeMatlObj.REMARK === 'string'
                            ? tChangeMatlObj.REMARK
                            : '';

                    const tEscNewMatl = String(tNewMatl).replace(/'/gi, "''");
                    const tEscOldMatl = String(tOldMatl).replace(/'/gi, "''");
                    const tEscUseSize = String(tUseSize).replace(/'/gi, "''");
                    const tEscRemark = String(tRemark).replace(/'/gi, "''");

                    // 동일 키(변경 목표)가 이미 존재하면 PK 중복이 발생하므로 사전 차단
                    if (tEscNewMatl !== tEscOldMatl) {
                        const tDupCheckSql = `
                            select top 1 1 as EXIST_FLAG
                            from KSV_PROD_MEM
                            where prod_cd = '${tOne.PROD_CD}'
                              and matl_cd = '${tEscNewMatl}'
                              and use_size = '${tEscUseSize}'
                              and remark = '${tEscRemark}'
                        `;
                        const tDupCheckRet = await prisma.$queryRaw(
                            Prisma.raw(tDupCheckSql),
                        );
                        if (Array.isArray(tDupCheckRet) && tDupCheckRet.length > 0) {
                            var retArray = [];
                            var tObj = {};
                            tObj.CODE = 'ERROR:Same material exist';
                            tObj.id = 0;
                            retArray.push(tObj);
                            return retArray;
                        }
                    }

                    // 변경 대상 데이터 (MATL_CD만 변경)
                    var tInObj = {};
                    tInObj.MATL_CD = tNewMatl;
                    let tSQL99 = AFLib.updateTableSql('KSV_PROD_MEM', tInObj);
                    if (!tSQL99) continue; // skip if nothing to update
                    tSQL99 += `where prod_cd = '${tOne.PROD_CD}' `;
                    tSQL99 += `and matl_cd = '${tEscOldMatl}' `;
                    tSQL99 += `and use_size = '${tEscUseSize}' `;
                    tSQL99 += `and remark = '${tEscRemark}' `;
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
                    var retArray = [];
                    var tObj = {};
                    var tErrMsg = '';
                    if (e && typeof e.message === 'string') tErrMsg = e.message;
                    if (
                        tErrMsg.includes('KSV_PROD_MEM_PK') ||
                        tErrMsg.includes('중복 키 행을 삽입할 수 없습니다') ||
                        tErrMsg.includes('Cannot insert duplicate key row')
                    ) {
                        tObj.CODE = 'ERROR:Same material exist';
                    } else {
                        tObj.CODE = 'ERROR:Update Prod Mem';
                    }
                    tObj.id = 0;
                    retArray.push(tObj);
                    return retArray;
                }
            }
            var retArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCESS:Update Prod';
            tObj.id = 0;
            retArray.push(tObj);
            return retArray;
        },

        mgrInsert_S0303_ALL_DELETE_MATERIAL: async (_, args, contextValue) => {
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
            var tAddArray = [...args.datas]; // 추가할 데이타
            var tProdCdArray = [...args.datas1]; // 추가할 prod 목록
            var tAddPos = { ...args.datas2 }; // 추가할 Position

            var tIdx = 0;
            for (tIdx = 0; tIdx < tProdCdArray.length; tIdx++) {
                var tSQLArray = [];

                var tOne = { ...tProdCdArray[tIdx] };

                var tSQL = `
                    select
                        *
                    from
                        ksv_prod_mem
                    where
                        prod_cd = '${tOne.PROD_CD}'
                    order by
                        seq
                `;
                var nRet = await prisma.$queryRaw(Prisma.raw(tSQL));

                var tSQL2 = `
                    delete from ksv_prod_mem
                    where
                        prod_cd = '${tOne.PROD_CD}'
                `;
                var nRet2 = prisma.$queryRaw(Prisma.raw(tSQL2));
                tSQLArray.push(nRet2);

                var tInObj = [];
                nRet.forEach((col, i) => {
                    var tFlag = 0;
                    tAddArray.forEach((col1, i1) => {
                        if (
                            col.MATL_CD === col1.MATL_CD &&
                            col.USE_SIZE === col1.USE_SIZE &&
                            col.REMARK === col1.REMARK
                        ) {
                            tFlag = 1;
                        }
                    });
                    if (tFlag === 0) {
                        var tObj1 = { ...col };
                        tInObj.push(tObj1);
                    }
                });

                tInObj.forEach((col, i) => {
                    var tObj = { ...col };
                    delete tObj.id;
                    tObj.SEQ = i + 1;
                    let tSQL99 = AFLib.createTableSql('KSV_PROD_MEM', tObj);
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                });

                try {
                    global.currentTransactionInfo = {
                        contextValue: contextValue,
                        functionName: AFLib.getFunctionName(),
                    };
                    await prisma.$transaction(tSQLArray);
                    delete global.currentTransactionInfo;
                } catch (e) {
                    var retArray = [];
                    var tObj = {};
                    tObj.CODE = 'ERROR:Update Prod Mem';
                    tObj.id = 0;
                    retArray.push(tObj);
                    return retArray;
                }
            }
            var retArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCESS:Update Prod';
            tObj.id = 0;
            retArray.push(tObj);
            return retArray;
        },

        mgrInsert_S0303_UPDATE_SIZE_LOSS: async (_, args, contextValue) => {
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
            var tAddArray = [...args.datas]; // 추가할 데이타
            var tProdCdArray = [...args.datas1]; // 추가할 prod 목록
            var tAddPos = { ...args.datas2 }; // 추가할 Position

            var tIdx = 0;
            var tSQLArray = [];
            for (tIdx = 0; tIdx < tProdCdArray.length; tIdx++) {
                var tOne = { ...tProdCdArray[tIdx] };

                var tObj = {};
                tObj.SIZE_LOSS = tOne.SIZE_LOSS;
                let tSQL99 = AFLib.updateTableSql('KSV_PROD_MST', tObj);
                tSQL99 += `where  prod_cd = '${tOne.PROD_CD}' `;
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
                var retArray = [];
                var tObj = {};
                tObj.CODE = 'SUCCESS:Update Prod Mst';
                tObj.id = 0;
                retArray.push(tObj);
                return retArray;
            } catch (e) {
                var retArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Update Prod Mst';
                tObj.id = 0;
                retArray.push(tObj);
                return retArray;
            }
        },

        mgrInsert_S0303_CHANGE_VENDOR: async (_, args, contextValue) => {
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
            var tSrcVendor = { ...args.datas[0] }; // 추가할 데이타
            var tDestVendor = { ...args.datas[1] }; // 추가할 데이타
            var tProdCdArray = [...args.datas1]; // 추가할 prod 목록
            var tProdMemArray = [...args.datas2]; // 추가할 prod mem 목록

            var tIdx = 0;
            for (tIdx = 0; tIdx < tProdMemArray.length; tIdx++) {
                var tOne = { ...tProdMemArray[tIdx] };

                var sqlAdd = '';
                if (tSrcVendor.VENDOR_CD !== '') {
                    sqlAdd = `and b.vendor_cd = '${tSrcVendor.VENDOR_CD}' `;
                }

                var sql0 = `
                    select
                        a.*,
                        b.COLOR,
                        b.SPEC,
                        b.MATL_NAME
                    from
                        ksv_prod_mem a,
                        kcd_matl_mst b
                    where
                        a.prod_cd = '${tOne.PROD_CD}'
                        and a.matl_cd = '${tOne.MATL_CD}'
                        and a.matl_cd = b.matl_cd ${sqlAdd}
                `;
                var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));

                var tIdx1 = 0;
                for (tIdx1 = 0; tIdx1 < nRet0.length; tIdx1++) {
                    var tSQLArray = [];
                    var tOne1 = { ...nRet0[tIdx1] };

                    var sql1 = `
                        select
                            *
                        from
                            kcd_matl_mst
                        where
                            matl_name = '${tOne1.MATL_NAME.replace(/'/gi, "''")}'
                            and color = '${tOne1.COLOR.replace(/'/gi, "''")}'
                            and spec = '${tOne1.SPEC.replace(/'/gi, "''")}'
                            and vendor_cd = '${tDestVendor.VENDOR_CD}'
                    `;
                    var nRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                    if (nRet1.length > 0) {
                        var tUpObj = {};
                        tUpObj.MATL_CD = nRet1[0].MATL_CD;
                        let sql99 = AFLib.updateTableSql(
                            'KSV_PROD_MEM',
                            tUpObj,
                        );
                        sql99 += `where matl_cd = '${tOne1.MATL_CD}'  `;
                        sql99 += `and   prod_cd = '${tOne.PROD_CD}'  `;
                        sql99 += `and   use_size = '${tOne1.USE_SIZE}'  `;
                        sql99 += `and   remark = '${tOne1.REMARK.replace(/'/gi, "''")}'  `;
                        const sql99_1 = prisma.$queryRaw(Prisma.raw(sql99));
                        tSQLArray.push(sql99_1);
                    } else {
                        var sql2 = `
                            select
                                *
                            from
                                kcd_matl_mst
                            where
                                matl_cd = '${tOne1.MATL_CD}'
                        `;
                        var nRet2 = await prisma.$queryRaw(Prisma.raw(sql2));
                        var tObj2 = { ...nRet2[0] };
                        var tPrefix = `${tObj2.MATL_TYPE.substring(0, 1)}${tRetDate.substring(2, 4)}-`;
                       
                        var sql2_1 = `
                            select
                                isnull(max(seq), 0) as max_cnt
                            from
                                kcd_matl_mst
                            where
                                matl_cd like '%${tPrefix}%'
                        `;
                        var nRet2_1 = await prisma.$queryRaw(
                            Prisma.raw(sql2_1),
                        );
                        var tMaxSeq = String(parseInt(nRet2_1[0].max_cnt) + 1);
                        var tZero = '00000';
                        var tMaxStr =
                            tZero.substring(0, 5 - tMaxSeq.length) + tMaxSeq;
                        var tNewMatlCd = tPrefix + tMaxStr;
                        delete tObj2.id;
                        tObj2.MATL_CD = tNewMatlCd;
                        tObj2.MATL_NAME = tOne1.MATL_NAME;
                        tObj2.COLOR = tOne1.COLOR;
                        tObj2.SPEC = tOne1.SPEC;
                        tObj2.VENDOR_CD = tDestVendor.VENDOR_CD;
                        tObj2.REG_USER = tUserInfo.USER_ID;
                        tObj2.REG_DATETIME = tRetDate;
                        tObj2.UPD_USER = tUserInfo.USER_ID;
                        tObj2.UPD_DATETIME = tRetDate;
                        tObj2.add_loss = '0';
                        tObj2.SEQ = tMaxSeq;
                        var sql2_2 = `
                            select
                                *
                            from
                                kcd_matl_mst
                            where
                                matl_cd = '${tNewMatlCd}'
                        `;
                        var nRet2_2 = await prisma.$queryRaw(
                            Prisma.raw(sql2_2),
                        );
                        let sql99 = AFLib.upsertTableSql(
                            'KCD_MATL_MST',
                            tObj2,
                            nRet2_2,
                            { MATL_CD: tNewMatlCd },
                        );
                        const sql99_1 = prisma.$queryRaw(Prisma.raw(sql99));
                        tSQLArray.push(sql99_1);

                        var sql3 = `
                            select
                                *
                            from
                                kcd_matl_mem
                            where
                                matl_cd = '${tOne1.MATL_CD}'
                        `;
                        var nRet3 = await prisma.$queryRaw(Prisma.raw(sql3));
                        var tObj3 = { ...nRet3[0] };
                        delete tObj3.id;
                        tObj3.MATL_CD = tNewMatlCd;
                        tObj3.MATL_SEQ = '1';
                        tObj3.REG_USER = tUserInfo.USER_ID;
                        tObj3.REG_DATETIME = tRetDate;
                        tObj3.UPD_USER = tUserInfo.USER_ID;
                        tObj3.UPD_DATETIME = tRetDate;
                        tObj3.MATL_PRICE = '0';
                        tObj3.CURR_CD = 'USD';
                        var sql3_1 = `
                            select
                                *
                            from
                                kcd_matl_mem
                            where
                                matl_cd = '${tNewMatlCd}'
                                and matl_seq = '1'
                        `;
                        var nRet3_1 = await prisma.$queryRaw(
                            Prisma.raw(sql3_1),
                        );
                        let sql99 = AFLib.upsertTableSql(
                            'KCD_MATL_MEM',
                            tObj3,
                            nRet3_1,
                            { MATL_CD: tNewMatlCd, MATL_SEQ: '1' },
                        );
                        const sql99_1 = prisma.$queryRaw(Prisma.raw(sql99));
                        tSQLArray.push(sql99_1);

                        var sql4 = `
                            select
                                *
                            from
                                kcd_matl_sale
                            where
                                matl_cd = '${tOne1.MATL_CD}'
                        `;
                        var nRet4 = await prisma.$queryRaw(Prisma.raw(sql4));
                        var tObj4 = { ...nRet4[0] };
                        delete tObj4.id;
                        tObj4.MATL_CD = tNewMatlCd;
                        tObj4.MATL_SEQ = '1';
                        tObj4.REG_USER = tUserInfo.USER_ID;
                        tObj4.REG_DATETIME = tRetDate;
                        tObj4.UPD_USER = tUserInfo.USER_ID;
                        tObj4.UPD_DATETIME = tRetDate;
                        tObj4.MATL_PRICE = '0';
                        tObj4.CURR_CD = 'USD';
                        var sql4_1 = `
                            select
                                *
                            from
                                kcd_matl_sale
                            where
                                matl_cd = '${tNewMatlCd}'
                                and matl_seq = '1'
                        `;
                        var nRet4_1 = await prisma.$queryRaw(
                            Prisma.raw(sql4_1),
                        );
                        let sql99 = AFLib.upsertTableSql(
                            'KCD_MATL_SALE',
                            tObj4,
                            nRet4_1,
                            { MATL_CD: tNewMatlCd, MATL_SEQ: '1' },
                        );
                        const sql99_1 = prisma.$queryRaw(Prisma.raw(sql99));
                        tSQLArray.push(sql99_1);

                        var tUpObj = {};
                        tUpObj.MATL_CD = tNewMatlCd;
                        let sql99 = AFLib.updateTableSql(
                            'KSV_PROD_MEM',
                            tUpObj,
                        );
                        sql99 += `where matl_cd = '${tOne1.MATL_CD}'  `;
                        sql99 += `and   prod_cd = '${tOne.PROD_CD}'  `;
                        sql99 += `and   use_size = '${tOne1.USE_SIZE}'  `;
                        sql99 += `and   remark = '${String(tOne1.REMARK || '').replace(/'/gi, "''")}'  `;
                        const sql99_1 = prisma.$queryRaw(Prisma.raw(sql99));
                        tSQLArray.push(sql99_1);
                    }
                    try {
                        global.currentTransactionInfo = {
                            contextValue: contextValue,
                            functionName: AFLib.getFunctionName(),
                        };
                        await prisma.$transaction(tSQLArray);
                        delete global.currentTransactionInfo;
                    } catch {
                        var retArray = [];
                        var tObj = {};
                        tObj.CODE = 'ERROR:Change Vendor';
                        tObj.id = 0;
                        retArray.push(tObj);
                        return retArray;
                    }
                }
            }

            var retArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCESS:Change Vendor';
            tObj.id = 0;
            retArray.push(tObj);
            return retArray;
        },
        mgrInsert_S0303_CHANGE_VENDOR_bak: async (_, args, contextValue) => {
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
            var tSrcVendor = { ...args.datas[0] }; // 추가할 데이타
            var tDestVendor = { ...args.datas[1] }; // 추가할 데이타
            var tProdCdArray = [...args.datas1]; // 추가할 prod 목록
            var tProdMemArray = [...args.datas2]; // 추가할 prod mem 목록

            var tIdx = 0;
            for (tIdx = 0; tIdx < tProdCdArray.length; tIdx++) {
                var tOne = { ...tProdCdArray[tIdx] };

                var sql0 = `
                    select
                        a.*,
                        b.COLOR,
                        b.SPEC
                    from
                        ksv_prod_mem a,
                        kcd_matl_mst b
                    where
                        a.prod_cd = '${tOne.PROD_CD}'
                        and a.matl_cd = b.matl_cd
                        and b.vendor_cd like '%${tSrcVendor.VENDOR_CD}%'
                `;
                var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));

                var tIdx1 = 0;
                for (tIdx1 = 0; tIdx1 < nRet0.length; tIdx1++) {
                    var tSQLArray = [];
                    var tOne1 = { ...nRet0[tIdx1] };
                    if (tProdMemArray.length > 0) {
                        var tCheck1 = 0;
                        tProdMemArray.forEach((col1, i1) => {
                            console.log(
                                `${col1.PROD_CD}, ${col1.MATL_CD}, ${col1.SEQ} =>${tOne1.PROD_CD}, ${tOne1.MATL_CD}, ${tOne1.SEQ}`,
                            );
                            if (
                                col1.PROD_CD === tOne1.PROD_CD &&
                                col1.MATL_CD === tOne1.MATL_CD &&
                                parseInt(col1.SEQ) === parseInt(tOne1.SEQ)
                            )
                                tCheck1 = 1;
                        });
                        console.log(`====> ${tCheck1}`);
                        if (tCheck1 === 0) continue;
                    }

                    var sql1 = `
                        select
                            *
                        from
                            kcd_matl_mst
                        where
                            color = '${tOne1.COLOR.replace(/'/gi, "''")}'
                            and spec = '${tOne1.SPEC.replace(/'/gi, "''")}'
                            and vendor_cd = '${tDestVendor.VENDOR_CD}'
                    `;
                    var nRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                    if (nRet1.length > 0) {
                        var tUpObj = {};
                        tUpObj.MATL_CD = nRet1[0].MATL_CD;
                        let sql99 = AFLib.updateTableSql(
                            'KSV_PROD_MEM',
                            tUpObj,
                        );
                        sql99 += `where matl_cd = '${tOne1.MATL_CD}'  `;
                        sql99 += `and   prod_cd = '${tOne.PROD_CD}'  `;
                        sql99 += `and   use_size = '${tOne1.USE_SIZE}'  `;
                        sql99 += `and   remark = '${String(tOne1.REMARK || '').replace(/'/gi, "''")}'  `;
                        const sql99_1 = prisma.$queryRaw(Prisma.raw(sql99));
                        tSQLArray.push(sql99_1);
                    } else {
                        var sql2 = `
                            select
                                *
                            from
                                kcd_matl_mst
                            where
                                matl_cd = '${tOne1.MATL_CD}'
                        `;
                        var nRet2 = await prisma.$queryRaw(Prisma.raw(sql2));
                        var tObj2 = { ...nRet2[0] };
                        var tPrefix = `${tObj2.MATL_TYPE.substring(0, 1)}${tRetDate.substring(2, 4)}-`;

                        var sql2_1 = `
                            select
                                isnull(max(right(matl_cd, 5)), '00000') as max_cnt
                            from
                                kcd_matl_mst
                            where
                                matl_cd like '%${tPrefix}%'
                        `;
                        var nRet2_1 = await prisma.$queryRaw(
                            Prisma.raw(sql2_1),
                        );
                        var tMaxSeq = String(parseInt(nRet2_1[0].max_cnt) + 1);
                        var tZero = '00000';
                        var tMaxStr =
                            tZero.substring(0, 5 - tMaxSeq.length) + tMaxSeq;
                        var tNewMatlCd = tPrefix + tMaxStr;
                        delete tObj2.id;
                        tObj2.MATL_CD = tNewMatlCd;
                        tObj2.VENDOR_CD = tDestVendor.VENDOR_CD;
                        tObj2.MATL_NAME = tObj2.MATL_NAME + '-' + tRetDate;
                        tObj2.REG_USER = tUserInfo.USER_ID;
                        tObj2.REG_DATETIME = tRetDate;
                        tObj2.UPD_USER = tUserInfo.USER_ID;
                        tObj2.UPD_DATETIME = tRetDate;
                        tObj2.add_loss = '0';
                        var sql2_2 = `
                            select
                                *
                            from
                                kcd_matl_mst
                            where
                                matl_cd = '${tNewMatlCd}'
                        `;
                        var nRet2_2 = await prisma.$queryRaw(
                            Prisma.raw(sql2_2),
                        );
                        let sql99 = AFLib.upsertTableSql(
                            'KCD_MATL_MST',
                            tObj2,
                            nRet2_2,
                            { MATL_CD: tNewMatlCd },
                        );
                        const sql99_1 = prisma.$queryRaw(Prisma.raw(sql99));
                        tSQLArray.push(sql99_1);

                        var sql3 = `
                            select
                                *
                            from
                                kcd_matl_mem
                            where
                                matl_cd = '${tOne1.MATL_CD}'
                        `;
                        var nRet3 = await prisma.$queryRaw(Prisma.raw(sql3));
                        var tObj3 = { ...nRet3[0] };
                        delete tObj3.id;
                        tObj3.MATL_CD = tNewMatlCd;
                        tObj3.MATL_SEQ = '1';
                        tObj3.REG_USER = tUserInfo.USER_ID;
                        tObj3.REG_DATETIME = tRetDate;
                        tObj3.UPD_USER = tUserInfo.USER_ID;
                        tObj3.UPD_DATETIME = tRetDate;
                        tObj3.MATL_PRICE = '0';
                        tObj3.CURR_CD = 'USD';
                        var sql3_1 = `
                            select
                                *
                            from
                                kcd_matl_mem
                            where
                                matl_cd = '${tNewMatlCd}'
                                and matl_seq = '1'
                        `;
                        var nRet3_1 = await prisma.$queryRaw(
                            Prisma.raw(sql3_1),
                        );
                        let sql99 = AFLib.upsertTableSql(
                            'KCD_MATL_MEM',
                            tObj3,
                            nRet3_1,
                            { MATL_CD: tNewMatlCd, MATL_SEQ: '1' },
                        );
                        const sql99_1 = prisma.$queryRaw(Prisma.raw(sql99));
                        tSQLArray.push(sql99_1);

                        var sql4 = `
                            select
                                *
                            from
                                kcd_matl_sale
                            where
                                matl_cd = '${tOne1.MATL_CD}'
                        `;
                        var nRet4 = await prisma.$queryRaw(Prisma.raw(sql4));
                        var tObj4 = { ...nRet4[0] };
                        delete tObj4.id;
                        tObj4.MATL_CD = tNewMatlCd;
                        tObj4.MATL_SEQ = '1';
                        tObj4.REG_USER = tUserInfo.USER_ID;
                        tObj4.REG_DATETIME = tRetDate;
                        tObj4.UPD_USER = tUserInfo.USER_ID;
                        tObj4.UPD_DATETIME = tRetDate;
                        tObj4.MATL_PRICE = '0';
                        tObj4.CURR_CD = 'USD';
                        var sql4_1 = `
                            select
                                *
                            from
                                kcd_matl_sale
                            where
                                matl_cd = '${tNewMatlCd}'
                                and matl_seq = '1'
                        `;
                        var nRet4_1 = await prisma.$queryRaw(
                            Prisma.raw(sql4_1),
                        );
                        let sql99 = AFLib.upsertTableSql(
                            'KCD_MATL_SALE',
                            tObj4,
                            nRet4_1,
                            { MATL_CD: tNewMatlCd, MATL_SEQ: '1' },
                        );
                        const sql99_1 = prisma.$queryRaw(Prisma.raw(sql99));
                        tSQLArray.push(sql99_1);

                        var tUpObj = {};
                        tUpObj.MATL_CD = tNewMatlCd;
                        let sql99 = AFLib.updateTableSql(
                            'KSV_PROD_MEM',
                            tUpObj,
                        );
                        sql99 += `where matl_cd = '${tOne1.MATL_CD}'  `;
                        sql99 += `and   prod_cd = '${tOne.PROD_CD}'  `;
                        sql99 += `and   use_size = '${tOne1.USE_SIZE}'  `;
                        sql99 += `and   remark = '${String(tOne1.REMARK || '').replace(/'/gi, "''")}'  `;
                        const sql99_1 = prisma.$queryRaw(Prisma.raw(sql99));
                        tSQLArray.push(sql99_1);
                    }
                    try {
                        global.currentTransactionInfo = {
                            contextValue: contextValue,
                            functionName: AFLib.getFunctionName(),
                        };
                        await prisma.$transaction(tSQLArray);
                        delete global.currentTransactionInfo;
                    } catch {
                        var retArray = [];
                        var tObj = {};
                        tObj.CODE = 'ERROR:Change Vendor';
                        tObj.id = 0;
                        retArray.push(tObj);
                        return retArray;
                    }
                }
            }

            var retArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCESS:Change Vendor';
            tObj.id = 0;
            retArray.push(tObj);
            return retArray;
        },
    },
};

export default moduleMutation_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM;
