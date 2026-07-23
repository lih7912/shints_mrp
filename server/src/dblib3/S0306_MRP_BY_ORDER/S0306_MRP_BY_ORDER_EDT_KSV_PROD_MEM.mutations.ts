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
const moduleMutation_S0306_MRP_BY_ORDER_EDT_KSV_PROD_MEM = {
    Mutation: {
        mgrInsert_S0306_MRP_BY_ORDER_EDT_KSV_PROD_MEM: async (
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
            var tOrderCd = args.datas[0].ORDER_CD;
            var tOrderMrpSeq = args.datas[0].ORDER_MRP_SEQ;
            var tDeleteSQL = `
                delete from ksv_order_mrp
                where
                    prod_cd = '${tProdCd}'
                    and order_cd = '${tOrderCd}'
                    and order_mrp_seq = '${tOrderMrpSeq}'
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
                if (typeof tObj.VERSION !== 'undefined') delete tObj.VERSION;
                if (typeof tObj.MRP_CHECK !== 'undefined')
                    delete tObj.MRP_CHECK;
                if (tObj.ADD_LOSS === null) tObj.ADD_LOSS = '0';

                tObj.STD_NET = parseFloat(tObj.STD_NET);
                tObj.STD_LOSS = parseFloat(tObj.STD_LOSS);
                tObj.STD_GROSS = parseFloat(tObj.STD_GROSS);
                tObj.NET = parseFloat(tObj.NET);
                tObj.LOSS = parseFloat(tObj.LOSS);
                tObj.GROSS = parseFloat(tObj.GROSS);

                let tSQL99 = AFLib.createTableSql('KSV_ORDER_MRP', tObj);
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
                tObj.CODE = 'ERROR';
                tObj.id = 0;
                retArray.push(tObj);
                return retArray;
            }
        },

        mgrUpdate_S0306_MRP_BY_ORDER_EDT_KSV_PROD_MEM: async (
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

        mgrDelete_S0306_MRP_BY_ORDER_EDT_KSV_PROD_MEM: async (_, args) => {
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

        mgrInsert_S0306_ALL_ADD_MATERIAL: async (_, args, contextValue) => {
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
                        ksv_order_mrp
                    where
                        prod_cd = '${tProdCd}'
                        and order_cd = '${tOne0.ORDER_CD}'
                        and order_mrp_seq = '${tOne0.ORDER_MRP_SEQ}'
                    order by
                        seq
                `;
                var nRet = await prisma.$queryRaw(Prisma.raw(tSQL));

                var tDeleteSQL = `
                    delete from ksv_order_mrp
                    where
                        prod_cd = '${tProdCd}'
                        and order_cd = '${tOne0.ORDER_CD}'
                        and order_mrp_seq = '${tOne0.ORDER_MRP_SEQ}'
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
                        tAddArray.forEach((col, i) => {
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
                            delete tObj.DL_FLAG;
                            delete tObj.BVT_REMARK;
                            if (typeof tObj.MRP_CHECK !== 'undefined')
                                delete tObj.MRP_CHECK;

                            tObj.VERSION = '';
                            tObj.PROD_CD = tProdCd;
                            tObj.ORDER_CD = tOne0.ORDER_CD;
                            tObj.ORDER_MRP_SEQ = tOne0.ORDER_MRP_SEQ;
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
                        delete tObj.DL_FLAG;
                        delete tObj.BVT_REMARK;
                        if (typeof tObj.MRP_CHECK !== 'undefined')
                            delete tObj.MRP_CHECK;

                        tObj.VERSION = '';
                        tObj.PROD_CD = tProdCd;
                        tObj.ORDER_CD = tOne0.ORDER_CD;
                        tObj.ORDER_MRP_SEQ = tOne0.ORDER_MRP_SEQ;
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
                    let tSQL99 = AFLib.createTableSql('KSV_ORDER_MRP', tOne);
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
                        tErrMsg.includes('KSV_ORDER_MPR_PK') ||
                        tErrMsg.includes('중복 키 행을 삽입할 수 없습니다') ||
                        tErrMsg.includes('Cannot insert duplicate key row')
                    ) {
                        tObj.CODE = 'ERROR:Same material exist';
                    } else {
                        tObj.CODE = 'ERROR:Add Prod';
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

        mgrInsert_S0306_ALL_UPDATE_MATERIAL: async (_, args, contextValue) => {
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

            // usage list 저장 시 datas1에 일부 prod만 담겨도,
            // datas 내 스코프(prod/order/order_mrp_seq) 정보를 함께 사용해 누락 대상까지 처리한다.
            var tTargetProdMap = new Map();
            tProdCdArray.forEach((prod) => {
                const tKey = `${String(prod?.PROD_CD || '')}|${String(prod?.ORDER_CD || '')}|${String(prod?.ORDER_MRP_SEQ || '')}`;
                if (tKey === '||') return;
                if (!tTargetProdMap.has(tKey)) {
                    tTargetProdMap.set(tKey, {
                        PROD_CD: prod?.PROD_CD || '',
                        ORDER_CD: prod?.ORDER_CD || '',
                        ORDER_MRP_SEQ: prod?.ORDER_MRP_SEQ || '',
                    });
                }
            });
            tAddArray.forEach((row) => {
                const tKey = `${String(row?.PROD_CD || '')}|${String(row?.ORDER_CD || '')}|${String(row?.ORDER_MRP_SEQ || '')}`;
                if (tKey === '||') return;
                if (!tTargetProdMap.has(tKey)) {
                    tTargetProdMap.set(tKey, {
                        PROD_CD: row?.PROD_CD || '',
                        ORDER_CD: row?.ORDER_CD || '',
                        ORDER_MRP_SEQ: row?.ORDER_MRP_SEQ || '',
                    });
                }
            });
            var tTargetProdArray = Array.from(tTargetProdMap.values());

            var tSizeLossTypeCnt = tProdCdArray.length;

            var tIdx = 0;
            for (tIdx = 0; tIdx < tTargetProdArray.length; tIdx++) {
                var tOne = { ...tTargetProdArray[tIdx] };

                var tSQLArray = [];

                // usage list save: datas1 대상(prod/order/order_mrp_seq)별로 행을 분리 적용
                let tTargetRows = tAddArray.filter(
                    (col) =>
                        String(col.PROD_CD || '') === String(tOne.PROD_CD || '') &&
                        String(col.ORDER_CD || '') === String(tOne.ORDER_CD || '') &&
                        String(col.ORDER_MRP_SEQ || '') ===
                            String(tOne.ORDER_MRP_SEQ || ''),
                );

                // 전달된 datas가 템플릿(단일 prod 기준)인 경우 전체를 현재 datas1 대상에 적용
                if (tTargetRows.length <= 0) {
                    tTargetRows = [...tAddArray];
                }

                // 같은 대상(prod)에서 동일 key(matl_cd + seq) 중복 update 방지
                const tUniqueRows = [];
                const tRowKeySet = new Set();
                tTargetRows.forEach((col) => {
                    const tWhereMatlCd = col.MATL_CD || col.S_MATL_CD;
                    const tKey = `${String(tWhereMatlCd || '')}|${String(col.SEQ || '')}`;
                    if (tRowKeySet.has(tKey)) return;
                    tRowKeySet.add(tKey);
                    tUniqueRows.push(col);
                });

                tUniqueRows.forEach((col, i) => {
                    var tObj = {};
                    const tWhereMatlCd = col.MATL_CD || col.S_MATL_CD;
                    // datas1로 넘어온 대상(prod/order/order_mrp_seq) 각각에 동일 편집을 적용
                    const tWhereProdCd = tOne.PROD_CD;
                    // usage popup 저장 데이터는 ORDER_CD / ORDER_MRP_SEQ 가 비어올 수 있어
                    // row 값으로 보정하고, 없으면 최신 order_mrp_seq 를 대상으로 갱신한다.
                    const tWhereOrderCd =
                        tOne.ORDER_CD || col.ORDER_CD || '';
                    const tWhereOrderMrpSeq =
                        tOne.ORDER_MRP_SEQ || col.ORDER_MRP_SEQ || '';
                    tObj.STD_NET = col.STD_NET;
                    tObj.STD_LOSS = col.STD_LOSS;
                    tObj.STD_GROSS = col.STD_GROSS;
                    tObj.NET = col.NET;
                    tObj.LOSS = col.LOSS;
                    tObj.GROSS = col.GROSS;
                    tObj.REMARK = col.REMARK;
                    tObj.USE_SIZE = col.USE_SIZE;
                    tObj.COUNTRY = col.COUNTRY;

                    let tSQL99 = AFLib.updateTableSql('KSV_ORDER_MRP', tObj);
                    /*
                    tSQL99 += `where id = '${col.id}' `;
                    */
                    tSQL99 += `where matl_cd = '${tWhereMatlCd}' `;
                    tSQL99 += `and prod_cd = '${tWhereProdCd}' `;
                    if (tWhereOrderCd !== '') {
                        tSQL99 += `and order_cd = '${tWhereOrderCd}' `;
                    }
                    if (tWhereOrderMrpSeq !== '') {
                        tSQL99 += `and order_mrp_seq = '${tWhereOrderMrpSeq}' `;
                    } else {
                        tSQL99 += `and order_mrp_seq = ( `;
                        tSQL99 += `select max(a2.order_mrp_seq) `;
                        tSQL99 += `from ksv_order_mrp a2 `;
                        tSQL99 += `where a2.prod_cd = '${tWhereProdCd}' `;
                        tSQL99 += `and a2.matl_cd = '${tWhereMatlCd}' `;
                        tSQL99 += `and a2.seq = '${col.SEQ}' `;
                        if (tWhereOrderCd !== '') {
                            tSQL99 += `and a2.order_cd = '${tWhereOrderCd}' `;
                        }
                        tSQL99 += `) `;
                    }
                    tSQL99 += `and  seq = '${col.SEQ}' `;
                    
                    /*
                    if (tSizeLossTypeCnt > 1) {
                        tSQL99 += `and remark = '${col.S_REMARK}' `;
                        tSQL99 += `and use_size = '${tObj.USE_SIZE}' `;
                    } else {
                        tSQL99 += `and  seq = '${col.SEQ}' `;
                    }
                    */

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
                    var tErrMsg = '';
                    if (e && typeof e.message === 'string') tErrMsg = e.message;

                    if (
                        tErrMsg.includes('KSV_ORDER_MPR_PK') ||
                        tErrMsg.includes('KSV_ORDER_MRP_PK') ||
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

        mgrInsert_S0306_ALL_UPDATE_MATERIAL_NET_LOSS: async (
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
                        ksv_order_mrp a,
                        kcd_matl_mst b
                    where
                        a.prod_cd = '${tOne.PROD_CD}'
                        and a.order_cd = '${tOne.ORDER_CD}'
                        and a.order_mrp_seq = '${tOne.ORDER_MRP_SEQ}'
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

                        let tSQL99 = AFLib.updateTableSql(
                            'KSV_ORDER_MRP',
                            tObj,
                        );
                        tSQL99 += `where matl_cd = '${col.MATL_CD}' `;
                        tSQL99 += `and  prod_cd = '${tOne.PROD_CD}' `;
                        tSQL99 += `and  order_cd = '${tOne.ORDER_CD}' `;
                        tSQL99 += `and  order_mrp_seq = '${tOne.ORDER_MRP_SEQ}' `;
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
                        tObj.NET = tNet;
                        tObj.LOSS = tLoss;
                        tObj.GROSS = String(tGross);

                        let tSQL99 = AFLib.updateTableSql(
                            'KSV_ORDER_MRP',
                            tObj,
                        );
                        tSQL99 += `where matl_cd = '${col.MATL_CD}' `;
                        tSQL99 += `and  prod_cd = '${tOne.PROD_CD}' `;
                        tSQL99 += `and  order_cd = '${tOne.ORDER_CD}' `;
                        tSQL99 += `and  order_mrp_seq = '${tOne.ORDER_MRP_SEQ}' `;
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

        mgrInsert_S0306_ALL_UPDATE_MATERIAL_MOVE_UP: async (
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
                        ksv_order_mrp a
                    where
                        a.prod_cd = '${tOne.PROD_CD}'
                        and a.order_cd = '${tWorkObj.ORDER_CD}'
                        and a.order_mrp_seq = '${tWorkObj.ORDER_MRP_SEQ}'
                    order by
                        a.seq
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));

                // Find Self Position
                var tOrgPos = -1;
                var tOrgObj = {};
                tRet0.forEach((col, i) => {
                    var tObj = { ...col };
                    if (parseInt(col.SEQ) === parseInt(tWorkObj.SEQ)) {
                        tOrgPos = i;
                        tOrgObj = { ...tObj };
                    }
                    /*
             if (col.MATL_CD === tWorkObj.MATL_CD &&
                 col.MATL_NAME === tWorkObj.MATL_NAME &&
                 col.SPEC === tWorkObj.SPEC &&
                 col.COLOR === tWorkObj.COLOR &&
                 col.USE_SIZE === tWorkObj.USE_SIZE &&
                 col.REMARK === tWorkObj.REMARK) {
                 tOrgPos = i;
                 tOrgObj = { ...tObj };
             }  
             */
                });

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

                var sql99 = `
                    delete from ksv_order_mrp
                    where
                        prod_cd = '${tOne.PROD_CD}'
                        and order_cd = '${tWorkObj.ORDER_CD}'
                        and order_mrp_seq = '${tWorkObj.ORDER_MRP_SEQ}'
                `;
                const tRet99 = prisma.$queryRaw(Prisma.raw(sql99));
                tSQLArray.push(tRet99);

                tInObj.forEach((col, i) => {
                    var tObj2 = { ...col };
                    delete tObj2.id;
                    tObj2.SEQ = i + 1;
                    let tSQL99 = AFLib.createTableSql('KSV_ORDER_MRP', tObj2);
                    /*
             let tSQL99 = AFLib.updateTableSql('KSV_ORDER_MRP', tObj2);
             tSQL99 += `where matl_cd = '${col.MATL_CD}' `;
             tSQL99 += `and  prod_cd = '${tOne.PROD_CD}' `;
             tSQL99 += `and  order_cd = '${tWorkObj.ORDER_CD}' `;
             tSQL99 += `and  order_mrp_seq = '${tWorkObj.ORDER_MRP_SEQ}' `;
             tSQL99 += `and  use_size = '${col.USE_SIZE}' `;
             tSQL99 += `and  remark = '${col.REMARK}' `;
             */
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

        mgrInsert_S0306_ALL_UPDATE_MATERIAL_MOVE_DOWN: async (
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
                        ksv_order_mrp a
                    where
                        a.prod_cd = '${tOne.PROD_CD}'
                        and a.order_cd = '${tWorkObj.ORDER_CD}'
                        and a.order_mrp_seq = '${tWorkObj.ORDER_MRP_SEQ}'
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

                    let tSQL99 = AFLib.updateTableSql('KSV_ORDER_MRP', tObj2);
                    tSQL99 += `where matl_cd = '${col.MATL_CD}' `;
                    tSQL99 += `and  prod_cd = '${tOne.PROD_CD}' `;
                    tSQL99 += `and  order_cd = '${tWorkObj.ORDER_CD}' `;
                    tSQL99 += `and  order_mrp_seq = '${tWorkObj.ORDER_MRP_SEQ}' `;
                    tSQL99 += `and  use_size = '${col.USE_SIZE}' `;
                    tSQL99 += `and  remark = '${col.REMARK.replace(/'/gi, "''")}' `;
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

        mgrInsert_S0306_ALL_UPDATE_MATERIAL_SIZE_USAGE: async (
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
                        ksv_order_mrp a,
                        kcd_matl_mst b
                    where
                        a.prod_cd = '${tOne.PROD_CD}'
                        and a.order_cd = '${tOne.ORDER_CD}'
                        and a.order_mrp_seq = '${tOne.ORDER_MRP_SEQ}'
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
                    var tObj: any = {};

                    if (tEditObj.ALL_FLAG === '1') {
                        // ALL_FLAG: edit panel 값을 전체 row에 적용
                        if (tEditObj.USE_SIZE !== '') tObj.USE_SIZE = tEditObj.USE_SIZE;
                        if (tEditObj.REMARK !== '') tObj.REMARK = tEditObj.REMARK;

                        if (Object.keys(tObj).length === 0) return;

                        const sMatl = col.MATL_CD ?? col.S_MATL_CD;
                        const sUseSize = col.S_USE_SIZE ?? col.USE_SIZE ?? '';
                        const sRemark = col.S_REMARK ?? (col.REMARK ?? '').replace(/'/gi, "''");

                        let tSQL99 = AFLib.updateTableSql('KSV_ORDER_MRP', tObj);
                        tSQL99 += `where matl_cd = '${sMatl}' `;
                        tSQL99 += `and  prod_cd = '${tOne.PROD_CD}' `;
                        tSQL99 += `and  order_cd = '${tOne.ORDER_CD}' `;
                        tSQL99 += `and  order_mrp_seq = '${tOne.ORDER_MRP_SEQ}' `;
                        tSQL99 += `and  use_size = '${sUseSize}' `;
                        tSQL99 += `and  remark = '${sRemark}' `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);
                    } else {
                        // 선택된 rows: edit panel 값이 있으면 그 값, 없으면 셀 편집된 값 사용
                        tObj.USE_SIZE = tEditObj.USE_SIZE !== '' ? tEditObj.USE_SIZE : (col.USE_SIZE ?? '');
                        tObj.REMARK = tEditObj.REMARK !== '' ? tEditObj.REMARK : (col.REMARK ?? '');

                        const sMatl = col.MATL_CD;
                        const sProdCd = col.PROD_CD ?? tOne.PROD_CD;
                        const sOrderCd = col.ORDER_CD ?? tOne.ORDER_CD;
                        const sOrderMrpSeq = col.ORDER_MRP_SEQ ?? tOne.ORDER_MRP_SEQ;

                        let tSQL99 = AFLib.updateTableSql('KSV_ORDER_MRP', tObj);
                        tSQL99 += `where matl_cd = '${sMatl}' `;
                        tSQL99 += `and  prod_cd = '${sProdCd}' `;
                        tSQL99 += `and  order_cd = '${sOrderCd}' `;
                        tSQL99 += `and  order_mrp_seq = '${sOrderMrpSeq}' `;
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

        mgrInsert_S0306_ALL_UPDATE_MATERIAL_DL_FLAG: async (
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
                    tObj.DL_FLAG = col.DL_FLAG;
                    let tSQL99 = AFLib.updateTableSql('KSV_PROD_MEM', tObj);
                    if (!tSQL99) return; // skip if nothing to update (e.g. DL_FLAG is null)
                    tSQL99 += `where matl_cd = '${col.MATL_CD || col.S_MATL_CD}' `;
                    tSQL99 += `and  prod_cd = '${tOne.PROD_CD}' `;
                    tSQL99 += `and  use_size = '${col.S_USE_SIZE}' `;
                    tSQL99 += `and  remark = '${col.S_REMARK}' `;
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

        mgrInsert_S0306_ALL_UPDATE_MATERIAL_STD_LOSS_TO_LOSS: async (
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
                        ksv_order_mrp a,
                        kcd_matl_mst b
                    where
                        a.prod_cd = '${tOne.PROD_CD}'
                        and a.order_cd = '${tOne.ORDER_CD}'
                        and a.order_mrp_seq = '${tOne.ORDER_MRP_SEQ}'
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

                    let tSQL99 = AFLib.updateTableSql('KSV_ORDER_MRP', tObj);
                    tSQL99 += `where matl_cd = '${col.MATL_CD}' `;
                    tSQL99 += `and  prod_cd = '${tOne.PROD_CD}' `;
                    tSQL99 += `and  order_cd = '${tOne.ORDER_CD}' `;
                    tSQL99 += `and  order_mrp_seq = '${tOne.ORDER_MRP_SEQ}' `;
                    tSQL99 += `and  use_size = '${col.USE_SIZE}' `;
                    tSQL99 += `and  remark = '${String(col.REMARK || '').replace(/'/gi, "''")}' `;
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

        mgrInsert_S0306_ALL_CHANGE_MATERIAL: async (_, args, contextValue) => {
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
                            from KSV_ORDER_MRP
                            where prod_cd = '${tOne.PROD_CD}'
                              and order_cd = '${tOne.ORDER_CD}'
                              and order_mrp_seq = '${tOne.ORDER_MRP_SEQ}'
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
                    let tSQL99 = AFLib.updateTableSql('KSV_ORDER_MRP', tInObj);
                    tSQL99 += `where prod_cd = '${tOne.PROD_CD}' `;
                    tSQL99 += `and order_cd = '${tOne.ORDER_CD}' `;
                    tSQL99 += `and order_mrp_seq = '${tOne.ORDER_MRP_SEQ}' `;
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
                        tErrMsg.includes('KSV_ORDER_MPR_PK') ||
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

        mgrInsert_S0306_ALL_DELETE_MATERIAL: async (_, args, contextValue) => {
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
                        ksv_order_mrp
                    where
                        prod_cd = '${tOne.PROD_CD}'
                        and order_cd = '${tOne.ORDER_CD}'
                        and order_mrp_seq = '${tOne.ORDER_MRP_SEQ}'
                    order by
                        seq
                `;
                var nRet = await prisma.$queryRaw(Prisma.raw(tSQL));

                var tDeleteSQL = `
                    delete from ksv_order_mrp
                    where
                        prod_cd = '${tOne.PROD_CD}'
                        and order_cd = '${tOne.ORDER_CD}'
                        and order_mrp_seq = '${tOne.ORDER_MRP_SEQ}'
                `;
                var nRet2 = prisma.$queryRaw(Prisma.raw(tDeleteSQL));
                tSQLArray.push(nRet2);

                var tInObj = [];
                nRet.forEach((col, i) => {
                    var tFlag = 0;
                    tAddArray.forEach((col1, i1) => {
                        if (
                            col.MATL_CD === col1.MATL_CD &&
                            col.USE_SIZE === col1.USE_SIZE &&
                            col.REMARK === col.REMARK
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
                    let tSQL99 = AFLib.createTableSql('KSV_ORDER_MRP', tObj);
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

        mgrInsert_S0306_UPDATE_SIZE_LOSS: async (_, args, contextValue) => {
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
                let tSQL99 = AFLib.updateTableSql('KSV_ORDER_MEM', tObj);
                tSQL99 += `where  prod_cd = '${tOne.PROD_CD}' `;
                tSQL99 += `and  order_cd = '${tOne.ORDER_CD}' `;
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
                tObj.CODE = 'SUCCESS:Update Order Mem';
                tObj.id = 0;
                retArray.push(tObj);
                return retArray;
            } catch (e) {
                var retArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Update Order Mem';
                tObj.id = 0;
                retArray.push(tObj);
                return retArray;
            }
        },

        mgrInsert_S0306_CHANGE_VENDOR: async (_, args, contextValue) => {
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
                        ksv_order_mrp a,
                        kcd_matl_mst b
                    where
                        a.prod_cd = '${tOne.PROD_CD}'
                        and a.order_cd = '${tOne.ORDER_CD}'
                        and a.order_mrp_seq = '${tOne.ORDER_MRP_SEQ}'
                        and a.matl_cd = b.matl_cd
                        and a.matl_cd = '${tOne.MATL_CD}' ${sqlAdd}
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
                            'KSV_ORDER_MRP',
                            tUpObj,
                        );
                        sql99 += `where matl_cd = '${tOne1.MATL_CD}'  `;
                        sql99 += `and   prod_cd = '${tOne.PROD_CD}'  `;
                        sql99 += `and   order_cd = '${tOne.ORDER_CD}'  `;
                        sql99 += `and   order_mrp_seq = '${tOne.ORDER_MRP_SEQ}'  `;
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
                            'KSV_ORDER_MRP',
                            tUpObj,
                        );
                        sql99 += `where matl_cd = '${tOne1.MATL_CD}'  `;
                        sql99 += `and   prod_cd = '${tOne.PROD_CD}'  `;
                        sql99 += `and   order_cd = '${tOne.ORDER_CD}'  `;
                        sql99 += `and   order_mrp_seq = '${tOne.ORDER_MRP_SEQ}'  `;
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

        mgrInsert_S0306_ADD_SEQ: async (_, args, contextValue) => {
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
            var tProdCdArray = [...args.datas]; // 추가할 prod 목록

            var tIdx = 0;
            for (tIdx = 0; tIdx < tProdCdArray.length; tIdx++) {
                var tSQLArray = [];
                var tOne = { ...tProdCdArray[tIdx] };

                var tSQL0 = `
                    select
                        isnull(max(order_mrp_seq), 0) as max_seq
                    from
                        ksv_order_mrp
                    where
                        order_cd = '${tOne.ORDER_CD}'
                        and prod_cd = '${tOne.PROD_CD}'
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(tSQL0));
                var tMaxSeq = 0;
                var tLastSeq = 0;
                if (tRet0.length > 0) {
                    tMaxSeq = tRet0[0].max_seq + 1;
                    tLastSeq = tRet0[0].max_seq;
                }

                var sql1 = `
                    select
                        *
                    from
                        ksv_order_mrp_seqmax
                    where
                        user_id = '${tUserInfo.USER_ID}'
                        and order_cd = '${tOne.ORDER_CD}'
                        and prod_cd = '${tOne.PROD_CD}'
                `;
                var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                var tMrpSeq = 0;
                if (tRet1.length > 0) {
                    let tSQL99 = `
                        update ksv_order_mrp_seqmax
                        set
                            order_mrp_seq = ${tMaxSeq}
                        where
                            user_id = '${tUserInfo.USER_ID}'
                            and order_cd = '${tOne.ORDER_CD}'
                            and prod_cd = '${tOne.PROD_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                } else {
                    let tSQL99 = `
                        insert into
                            ksv_order_mrp_seqmax (user_id, order_cd, prod_cd, order_mrp_seq)
                        values
                            (
                                '${tUserInfo.USER_ID}',
                                '${tOne.ORDER_CD}',
                                '${tOne.PROD_CD}',
                                '${tMaxSeq}'
                            )
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }

                var sql4 = `
                    select
                        *
                    from
                        KSV_ORDER_MRP
                    where
                        order_cd = '${tOne.ORDER_CD}'
                        and prod_cd = '${tOne.PROD_CD}'
                        and order_mrp_seq = (
                            select
                                max(order_mrp_seq) as max_seq
                            from
                                ksv_order_mrp
                            where
                                order_cd = '${tOne.ORDER_CD}'
                                and prod_cd = '${tOne.PROD_CD}'
                        )
                    order by
                        seq
                `;
                var tRet4 = await prisma.$queryRaw(Prisma.raw(sql4));

                var tIdx4 = 0;
                for (tIdx4 = 0; tIdx4 < tRet4.length; tIdx4++) {
                    var tOne4 = { ...tRet4[tIdx4] };
                    var tEscRemark = String(tOne4.REMARK || '').replace(
                        /'/gi,
                        "''",
                    );

                    if (tIdx4 < args.datas1.length) {
                        var tTmp = { ...args.datas1[tIdx4] };
                        if (tTmp.S_FLAG === '1') {
                            tOne4.STD_NET = tTmp.STD_NET;
                            tOne4.STD_LOSS = tTmp.STD_LOSS;
                            tOne4.STD_GROSS = tTmp.STD_GROSS;
                            tOne4.NET = tTmp.NET;
                            tOne4.LOSS = tTmp.LOSS;
                            tOne4.GROSS = tTmp.GROSS;
                        }
                    }

                    let tSQL99 = `
                        INSERT INTO
                            KSV_ORDER_MRP (
                                ORDER_CD,
                                PROD_CD,
                                ORDER_MRP_SEQ,
                                MATL_CD,
                                STD_NET,
                                STD_LOSS,
                                STD_GROSS,
                                NET,
                                LOSS,
                                GROSS,
                                VERSION,
                                REMARK,
                                USE_SIZE,
                                SEQ,
                                COUNTRY,
                                REG_USER,
                                REG_DATETIME
                            )
                        values
                            (
                                '${tOne4.ORDER_CD}',
                                '${tOne4.PROD_CD}',
                                '${tMaxSeq}',
                                '${tOne4.MATL_CD}',
                                '${tOne4.STD_NET}',
                                '${tOne4.STD_LOSS}',
                                '${tOne4.STD_GROSS}',
                                '${tOne4.NET}',
                                '${tOne4.LOSS}',
                                '${tOne4.GROSS}',
                                '${tOne4.VERSION}',
                                '${tEscRemark}',
                                '${tOne4.USE_SIZE}',
                                '${tOne4.SEQ}',
                                '${tOne4.COUNTRY}',
                                '${tUserInfo.USER_ID}',
                                '${tRetDate}'
                            )
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }

                let tSQL99 = `
                    UPDATE KSV_ORDER_MEM
                    SET
                        SIZE_LOSS = b.SIZE_LOSS
                    FROM
                        KSV_PROD_MST b,
                        KSV_ORDER_MEM c
                    WHERE
                        b.PROD_CD = c.PROD_CD
                        AND c.ORDER_CD = '${tOne.ORDER_CD}'
                        AND c.PROD_CD = '${tOne.PROD_CD}'
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
                } catch {
                    var retArray = [];
                    var tObj = {};
                    tObj.CODE = 'ERROR:Add Seq';
                    tObj.id = 0;
                    retArray.push(tObj);
                    return retArray;
                }
            }

            var retArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCESS:Add Seq';
            tObj.id = 0;
            retArray.push(tObj);
            return retArray;
        },

        mgrInsert_S0306_DEL_LAST_SEQ: async (_, args, contextValue) => {
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
            var tProdCdArray = [...args.datas]; // 추가할 prod 목록

            var tIdx = 0;
            for (tIdx = 0; tIdx < tProdCdArray.length; tIdx++) {
                var tSQLArray = [];
                var tOne = { ...tProdCdArray[tIdx] };

                var sql1 = `
                    delete from ksv_order_mrp
                    where
                        order_cd = '${tOne.ORDER_CD}'
                        and prod_cd = '${tOne.PROD_CD}'
                        and order_mrp_seq = (
                            select
                                max(order_mrp_seq)
                            from
                                ksv_order_mrp
                            where
                                order_cd = '${tOne.ORDER_CD}'
                                and prod_cd = '${tOne.PROD_CD}'
                        )
                `;
                var nRet1 = prisma.$queryRaw(Prisma.raw(sql1));
                tSQLArray.push(nRet1);

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
                    tObj.CODE = 'ERROR:Add Seq';
                    tObj.id = 0;
                    retArray.push(tObj);
                    return retArray;
                }
            }

            var retArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCESS:Add Seq';
            tObj.id = 0;
            retArray.push(tObj);
            return retArray;
        },

        mgrInsert_S0306_ADD_SEQ_bak: async (_, args, contextValue) => {
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
            var tProdCdArray = [...args.datas]; // 추가할 prod 목록

            var tIdx = 0;
            for (tIdx = 0; tIdx < tProdCdArray.length; tIdx++) {
                var tSQLArray = [];
                var tOne = { ...tProdCdArray[tIdx] };

                var sql1 = `
                    select
                        *
                    from
                        ksv_order_mrp
                    where
                        prod_cd = '${tOne.PROD_CD}'
                        and order_cd = '${tOne.ORDER_CD}'
                        and order_mrp_seq = (
                            select
                                max(order_mrp_seq)
                            from
                                ksv_order_mrp
                            where
                                prod_cd = '${tOne.PROD_CD}'
                                and order_cd = '${tOne.ORDER_CD}'
                        )
                `;
                var nRet1 = await prisma.$queryRaw(Prisma.raw(sql1));

                nRet1.forEach((col, i) => {
                    var tObj = { ...col };
                    delete tObj.id;
                    tObj.ORDER_MRP_SEQ = parseInt(tObj.ORDER_MRP_SEQ) + 1;
                    let sql99 = AFLib.createTableSql('ksv_order_mrp', tObj);
                    const sql99_1 = prisma.$queryRaw(Prisma.raw(sql99));
                    tSQLArray.push(sql99_1);
                });

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
                    tObj.CODE = 'ERROR:Add Seq';
                    tObj.id = 0;
                    retArray.push(tObj);
                    return retArray;
                }
            }

            var retArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCESS:Add Seq';
            tObj.id = 0;
            retArray.push(tObj);
            return retArray;
        },
    },
};

export default moduleMutation_S0306_MRP_BY_ORDER_EDT_KSV_PROD_MEM;
