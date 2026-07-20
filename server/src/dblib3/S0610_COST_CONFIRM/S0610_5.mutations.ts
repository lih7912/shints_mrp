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
const moduleMutation_S0610_5 = {
    Mutation: {
        mgrInsert_S0610_5: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput1 = [...args.datas];
            var tInput2 = { ...args.datas1 };

            // 해당 바이어의 MD만 승인가능하도록
            let sqlUser = `
                select
                    *
                from
                    kcd_user
                where
                    user_id = '${tUserInfo.USER_ID}'
            `;
            var retUser = await prisma.$queryRaw(Prisma.raw(sqlUser));
            if (retUser.length > 0) {
                if (
                    retUser[0].PART === 'S01' ||
                    retUser[0].USER_ID === 'won21kr' ||
                    retUser[0].PART === 'S02' ||
                    retUser[0].PART === 'S03' ||
                    retUser[0].PART === 'S04' ||
                    retUser[0].PART === 'S05' ||
                    retUser[0].PART === 'S06' ||
                    retUser[0].PART === 'S07' ||
                    retUser[0].PART === 'S08'
                ) {
                } else {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE =
                        'ERROR:Cost Confirm:서울 SMD만Confirm 가능합니다';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }
            }

            var tSQLArray = [];

            var tIdx = 0;
            for (tIdx = 0; tIdx < tInput1.length; tIdx++) {
                var tOne = { ...tInput1[tIdx] };

                let sql0 = `
                    select
                        *
                    from
                        ksv_cost_mst
                    where
                        id = ${tOne.id}
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));

                let tSQL99 = `
                    update ksv_cost_mst
                    set
                        confirm_user = '${tUserInfo.USER_ID}',
                        confirm_date = '${tInput2.CONFIRM_DATE}'
                    where
                        id = ${tOne.id}
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = '';
                /*
          if (tOne.TYPE === 'STS_IN' && tOne.TYPE2 === 'MOQ') {
              tSQL99 = `
                  update ksv_stock_mem2_stsin
                  set
                      moq_confirm = '${tUserInfo.USER_ID}'
                  where
                      stsin_cd = '${tOne.STSIN_CD}'
                      and matl_cd = '${tOne.MATL_CD}'
              `;
             const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
             tSQLArray.push(tSQL99_1);
          }
          if (tOne.TYPE === 'STS_IN' && tOne.TYPE2 === 'Surcharge') {
              tSQL99 = `
                  update ksv_stock_mem2_stsin
                  set
                      surcharge_confirm = '${tUserInfo.USER_ID}'
                  where
                      stsin_cd = '${tOne.STSIN_CD}'
                      and matl_cd = '${tOne.MATL_CD}'
              `;
             const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
             tSQLArray.push(tSQL99_1);
          }
          */
                if (tOne.TYPE === '수입등록') {
                    tSQL99 = `
                        update ksv_invoice_mst
                        set
                            cost_confirm_user = '${tUserInfo.USER_ID}'
                        where
                            invoice_no = '${tRet0[0].INVOICE_NO}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }

                if (
                    tOne.TYPE2 === 'MOQ' ||
                    tOne.TYPE2 === 'OVER-IN' ||
                    tOne.TYPE2 === 'FOC'
                ) {
                    var tPoSeq = '999';
                    if (tOne.TYPE2 === 'MOQ') tPoSeq = 99;
                    if (tOne.TYPE2 === 'OVER-IN') tPoSeq = 98;
                    if (tOne.TYPE2 === 'FOC') tPoSeq = 97;

                    tSQL99 = `
                        update ksv_stock_mem
                        set
                            min_conf_user = '${tUserInfo.USER_ID}',
                            min_conf_datetime = '${tRetDate}'
                        where
                            po_cd = '${tOne.PO_CD}'
                            and matl_cd = '${tOne.MATL_CD}'
                            and po_seq = '${tPoSeq}'
                            and (
                                min_conf_user is null
                                or min_conf_user = ''
                            )
                    `;
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
                tObj.CODE = 'ERROR:Insert SHIP Record';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED: Insert SHIP Record :' + args.datas.length;
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },

        mgrInsert_S0610_5_CANCEL: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput1 = [...args.datas];
            var tInput2 = { ...args.datas1 };

            var tSQLArray = [];

            var tIdx = 0;
            for (tIdx = 0; tIdx < tInput1.length; tIdx++) {
                var tOne = { ...tInput1[tIdx] };

                let sql0 = `
                    select
                        *
                    from
                        ksv_cost_mst
                    where
                        id = ${tOne.id}
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));

                let tSQL99 = `
                    update ksv_cost_mst
                    set
                        confirm_user = '',
                        confirm_date = ''
                    where
                        id = ${tOne.id}
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = '';
                if (tOne.TYPE === 'STS_IN' && tOne.TYPE2 === 'MOQ') {
                    tSQL99 = `
                        update ksv_stock_mem2_stsin
                        set
                            moq_confirm = ''
                        where
                            stsin_cd = '${tOne.STSIN_CD}'
                            and matl_cd = '${tOne.MATL_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }
                if (tOne.TYPE === 'STS_IN' && tOne.TYPE2 === 'Surcharge') {
                    tSQL99 = `
                        update ksv_stock_mem2_stsin
                        set
                            surcharge_confirm = ''
                        where
                            stsin_cd = '${tOne.STSIN_CD}'
                            and matl_cd = '${tOne.MATL_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }
                if (tOne.TYPE === '수입등록') {
                    tSQL99 = `
                        update ksv_invoice_mst
                        set
                            cost_confirm_user = ''
                        where
                            invoice_no = '${tRet0[0].INVOICE_NO}'
                    `;
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
                tObj.CODE = 'ERROR:Insert SHIP Record';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED: Insert SHIP Record :' + args.datas.length;
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },
    },
};

export default moduleMutation_S0610_5;
