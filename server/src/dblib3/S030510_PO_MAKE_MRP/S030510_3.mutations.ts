// MGR_@@TNAME@@.mutations.js

import * as fs from 'fs';
import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
import AFLib2 from '../../po_adjust'; //PrismaClient 사용하기 위해 불러오기

/*
                STD_FLAG: String 
                NET: String 
                LOSS: String 
                USE_SIZE: String 
                REMARK: String 

*/

//
class S030510_QRY_COMM {
    async mrpMake(args, contextValue) {
        //
        var tRetDate = AFLib.getCurrTime();
        var tRetDate1 = tRetDate.substring(0, 8);
        var tUserInfo = AFLib.getUserInfo(contextValue);

        var tInputObj = args.datas[0];

        try {
            var sql0 = `
                exec kspPoMrpNetTemp '${tInputObj.PO_CD}', '${tUserInfo.USER_ID}'
            `;
            var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));

            var sql1 = `
                select distinct
                    a.order_cd
                from
                    ksv_po_mem a,
                    ksv_order_mst b
                where
                    a.po_cd = '${tInputObj.PO_CD}'
                    and a.order_cd = b.order_cd
                    and b.order_status <> '4'
            `;
            var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));

            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet1.length; tIdx++) {
                var tOneObj = tRet1[tIdx];
                var tIsCombined = tOneObj.order_cd.substring(5, 6);

                if (tIsCombined === 'C') {
                    var sql2 = `
                        select
                            a.order_cd
                        from
                            ksv_order_mst a,
                            ksv_po_mem b
                        where
                            b.po_cd = '${tInputObj.PO_CD}'
                            and left(a.order_cd, 10) = b.order_cd
                            and a.order_cd like '${tOneObj.order_cd}-%'
                            and b.po_seq = '1'
                        order by
                            1
                    `;
                    var tRet2 = await prisma.$queryRaw(Prisma.raw(sql2));

                    var tIdx1 = 0;
                    for (tIdx1 = 0; tIdx1 < tRet2.length; tIdx1++) {
                        var tOrderBaby = tRet2[tIdx1].order_cd;
                        var sql3 = `
                            exec kspPoMrpNetTempZipComb '${tInputObj.PO_CD}', '${tUserInfo.USER_ID}', '${tOrderBaby}'
                        `;
                        var tRet3 = await prisma.$queryRaw(Prisma.raw(sql3));
                    }
                    if (tRet2.length <= 0) {
                        var sql4 = `
                            exec kspPoMrpNetTempZip '${tInputObj.PO_CD}', '${tUserInfo.USER_ID}', '${tOneObj.order_cd}'
                        `;
                        var tRet4 = await prisma.$queryRaw(Prisma.raw(sql4));
                    }
                } else {
                    var sql4 = `
                            exec kspPoMrpNetTempZip '${tInputObj.PO_CD}', '${tUserInfo.USER_ID}', '${tOneObj.order_cd}'
                    `;
                    var tRet4 = await prisma.$queryRaw(Prisma.raw(sql4));
                }
            }

            var sql5 = `
                exec kspPoMrpTemp '${tInputObj.PO_CD}', '${tUserInfo.USER_ID}'
            `;
            var tRet4 = await prisma.$queryRaw(Prisma.raw(sql5));

            // Exit Process
            var tRetArray = [];
            var tObj = {};
            tObj.CODE = `SUCCESS:MRP MAKE: ${tInputObj.PO_CD}`;
            tObj.id = 0;
            tRetArray.push(tObj);

            var tRet2 = AFLib2.CommonFunc.UpdateMrpWork(
                tUserInfo.USER_ID,
                tInputObj.PO_CD,
                tObj.CODE,
            );
            return tRetArray;
        } catch (e) {
            console.log(e);
            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'ERROR:MRP MAKE';
            tObj.id = 0;
            tRetArray.push(tObj);

            var tRet2 = AFLib2.CommonFunc.UpdateMrpWork(
                tUserInfo.USER_ID,
                tInputObj.PO_CD,
                tObj.CODE,
            );
            return tRetArray;
        }
    }

    async saveMRP(args, contextValue) {
        var tRetDate = AFLib.getCurrTime();
        var tRetDate1 = tRetDate.substring(0, 8);
        var tUserInfo = AFLib.getUserInfo(contextValue);

        var tSQLArray = [];
        var tInputObj = args.datas[0];

        var sql_MaxSeq = `
            select
                isnull(max(po_seq), 0) as max_po_seq
            from
                ksv_po_mrp
            where
                po_cd = '${tInputObj.PO_CD}'
                and po_seq < 98
        `;
        var tRet0 = await prisma.$queryRaw(Prisma.raw(sql_MaxSeq));
        var tMaxSeq = tRet0[0].max_po_seq + 1;

        var sql_MrpSeq = `
            select
                isnull(max(mrp_seq), 0) as max_mrp_seq
            from
                ksv_po_mrp
            where
                po_cd = '${tInputObj.PO_CD}'
        `;
        var tRet1 = await prisma.$queryRaw(Prisma.raw(sql_MrpSeq));
        var tMrpSeq = tRet1[0].max_mrp_seq + 1;

        // KSV_PO_MRP 생성: ksv_po_mrptemp copy

        var tMaxCnt = 0;
        var tIdx = 0;
        for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
            var col = { ...args.datas[tIdx] };

            if (parseInt(col.PO_SEQ) === tMaxSeq) {
                var tSQL = `
                    insert into
                        ksv_po_mrp (
                            PO_CD,
                            PO_SEQ,
                            ORDER_CD,
                            MATL_CD,
                            MATL_SEQ,
                            MATL_PRICE,
                            MRP_SEQ,
                            USE_SIZE,
                            USE_QTY,
                            PO_QTY,
                            BEF_PO_QTY,
                            DIFF_QTY,
                            DIFF_PO_TYPE,
                            CHANGE_REASON,
                            USE_PO_TYPE,
                            CURR_CD,
                            TOT_AMT,
                            CURR_DATE,
                            USD_AMT,
                            STATUS_CD,
                            REG_USER,
                            REG_DATETIME,
                            use_real_qty,
                            use_sum_qty,
                            use_int_qty
                        )
                    select
                        PO_CD,
                        ${tMaxSeq},
                        ORDER_CD,
                        MATL_CD,
                        MATL_SEQ,
                        MATL_PRICE,
                        ${tMrpSeq},
                        USE_SIZE,
                        USE_QTY,
                        PO_QTY,
                        BEF_PO_QTY,
                        DIFF_QTY,
                        DIFF_PO_TYPE,
                        CHANGE_REASON,
                        USE_PO_TYPE,
                        CURR_CD,
                        TOT_AMT,
                        CURR_DATE,
                        USD_AMT,
                        STATUS_CD,
                        REG_USER,
                        REG_DATETIME,
                        use_real_qty,
                        use_sum_qty,
                        use_int_qty
                    from
                        ksv_po_mrptemp
                    where
                        user_id = '${tUserInfo.USER_ID}'
                        and po_cd = '${col.PO_CD}'
                        and order_cd = '${col.ORDER_CD}'
                        and matl_cd = '${col.MATL_CD}'
                        and mrp_seq = ${col.MRP_SEQ}
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL));
                tSQLArray.push(tSQL99_1);
                tMrpSeq += 1;
                tMaxCnt += 1;
            } else {
                var tSQL = `
                    update ksv_po_mrp
                    set
                        po_qty = ${col.PO_QTY}
                    where
                        po_cd = '${col.PO_CD}'
                        and po_seq = '${col.PO_SEQ}'
                        and order_cd = '${col.ORDER_CD}'
                        and matl_cd = '${col.MATL_CD}'
                        and mrp_seq = '${col.MRP_SEQ}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL));
                tSQLArray.push(tSQL99_1);
            }
        }

        if (tMaxCnt > 0 && tMaxSeq > 1) {
            // 1일 아니면 ksv_po_mst 생성
            var tInsPoMstSql = `
                insert into
                    ksv_po_mst (
                        po_cd,
                        po_seq,
                        po_type,
                        po_date,
                        po_status,
                        matl_due_date,
                        prod_due_date,
                        place_cd,
                        curr_date,
                        yy,
                        seq,
                        factory_cd,
                        delivery_type,
                        status_cd,
                        reg_user,
                        reg_datetime
                    )
                select
                    po_cd,
                    ${tMaxSeq},
                    po_type,
                    '${tRetDate1}',
                    '4',
                    matl_due_date,
                    prod_due_date,
                    place_cd,
                    '${tRetDate1}',
                    yy,
                    seq,
                    factory_cd,
                    delivery_type,
                    '0',
                    '${tUserInfo.USER_ID}',
                    '${tRetDate}'
                from
                    ksv_po_mst
                where
                    po_cd = '${tInputObj.PO_CD}'
                    and po_seq = 1
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tInsPoMstSql));
            tSQLArray.push(tSQL99_1);

            var tInsPoMemSql = `
                insert into
                    ksv_po_mem (po_cd, po_seq, order_cd)
                select
                    po_cd,
                    ${tMaxSeq},
                    order_cd
                from
                    ksv_po_mem
                where
                    po_cd = '${tInputObj.PO_CD}'
                    and po_seq = 1
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tInsPoMemSql));
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
            tObj.CODE = 'ERROR:Save Mrp. Insert ksv_po_mrp ';
            tObj.id = 0;
            tRetArray.push(tObj);
            var tRet4 = AFLib2.CommonFunc.DeleteMrpWork(
                tUserInfo.USER_ID,
                tInputObj.PO_CD,
            );
            return tRetArray;
        }

        /*
      let sql_update1 = `
          update ksv_po_mst
          set
              work_status = 'WORKING SAVE MAKE:insert ksv_po_mrp, ksv_po_mst'
          where
              po_cd = '${tInputObj.PO_CD}'
      `;
      var sql_update1 =  await prisma.$queryRaw(Prisma.raw(sql_update1));
*/

        tSQLArray = [];

        /*
     + "exec kspPoMatlListMain '"+m_strPoCd+"','"+m_strUserNo+"' " ^M
         -> 자재종합표. KSV_PO_MATLLIST <- KSV_PO_MRP
         -> PO_CD, VENDOR_CD, PR_NUM, MATL_CD, matl_seq, TOT_CNT, ORD_CNT, REG_USER, REG_DATETIME
      + "exec kspPoMrpList '"+m_strPoCd+"','"+m_strUserNo+"' "^M
         -> ksv_po_mrplist <- ksv_po_mrpnet
         -> po_cd,order_cd,prod_cd,add_flag,matl_cd
*/

        var tExecSql = `exec kspPoMatlListMain '${tInputObj.PO_CD}','${tUserInfo.USER_ID}' `;
        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tExecSql));
        tSQLArray.push(tSQL99_1);

        var tExecSql1 = `exec kspPoMrpList '${tInputObj.PO_CD}','${tUserInfo.USER_ID}' `;
        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tExecSql1));
        tSQLArray.push(tSQL99_1);

        var tUpdatePoMstSql = `
            update ksv_po_mst
            set
                po_status = '2',
                curr_date = '${tRetDate1}',
                req_status = ''
            where
                po_cd = '${tInputObj.PO_CD}'
                -- and   po_seq = '${tMaxSeq}'
        `;
        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tUpdatePoMstSql));
        tSQLArray.push(tSQL99_1);

        var tUpdateOrderMstSql = `
            update ksv_order_mst
            set
                order_status = '2'
            where
                order_cd in (
                    select
                        order_cd
                    from
                        ksv_po_mem
                    where
                        po_cd = '${tInputObj.PO_CD}'
                        and po_seq = '1'
                )
                and order_status <> '4'
        `;
        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tUpdateOrderMstSql));
        tSQLArray.push(tSQL99_1);

        /*
      var tUpdateOrderMstSql1 = `
          update ksv_order_mst
          set
              order_status = '2'
          where
              po_cd = '${tInputObj.PO_CD}'
              and order_status <> '4'
      `;
*/

        try {
            global.currentTransactionInfo = {
                contextValue: contextValue,
                functionName: AFLib.getFunctionName(),
            };
            await prisma.$transaction(tSQLArray);
            delete global.currentTransactionInfo;

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCESS:MRP SAVE:' + tInputObj.PO_CD + ',' + tMaxSeq;
            tObj.id = 0;
            tRetArray.push(tObj);
            var tRet4 = AFLib2.CommonFunc.DeleteMrpWork(
                tUserInfo.USER_ID,
                tInputObj.PO_CD,
            );
            return tRetArray;
        } catch (e) {
            console.log(e);
            var tRetArray = [];
            var tObj = {};
            tObj.CODE = `ERROR:MRP SAVE:(${e.message})`;
            tObj.id = 0;
            tRetArray.push(tObj);
            var tRet4 = AFLib2.CommonFunc.DeleteMrpWork(
                tUserInfo.USER_ID,
                tInputObj.PO_CD,
            );
            return tRetArray;
        }
    }
}

// export default로 Mutation 내용 내보내기
const moduleMutation_S030510_3 = {
    Mutation: {
        mgrInsert_S030510_MRP_MAKE: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput = { ...args.datas[0] };

            try {
                /*
                var tRet2 = await AFLib2.CommonFunc.CheckMrpWork(
                    tUserInfo.USER_ID,
                    tInput.PO_CD,
                );
                if (tRet2 > 0) {
                    var tObj = {};
                    tObj.id = 0;
                    tObj.CODE =
                        'ERROR:현재 작업중입니다. 잠시후에 다시 조회하십시요';
                    tObj.CODE1 = '';
                    tObj.CODE2 = '';
                    tObj.NEW_PO_SEQ = '';
                    tObj.LAST_PO_SEQ = '';
                    var tArray = [];
                    tArray.push(tObj);
                    return tArray;
                } else {
                    var tRet3 = await AFLib2.CommonFunc.CheckMrpWorkEnd(
                        tUserInfo.USER_ID,
                        tInput.PO_CD,
                    );
                    if (tRet3 > 0) {
                        var tObj = {};
                        tObj.id = 0;
                        tObj.CODE = `ERROR:처리해야할 MRP결과가 있습니다. 상태를 확인하세요`;
                        var tArray = [];
                        tArray.push(tObj);
                        return tArray;
                    } else if (tRet3 < 0) {
                        var tObj = {};
                        tObj.id = 0;
                        tObj.CODE = `ERROR:다른 PO의 Mrp 처리결과가 남아있습니다. 상태를 확인하세요`;
                        var tArray = [];
                        tArray.push(tObj);
                        return tArray;
                    } else {
                        var tRet4 = await AFLib2.CommonFunc.DeleteMrpWork(
                            tUserInfo.USER_ID,
                            tInput.PO_CD,
                        );
                    }
                }
                */

                var tRet4 = await AFLib2.CommonFunc.InsertMrpWork(
                    tUserInfo.USER_ID,
                    tInput.PO_CD,
                    'WORKING:MRP MAKE',
                    `S030510`,
                );
                var tRetArray = [];
                var tFunc = new S030510_QRY_COMM();
                tRetArray = tFunc.mrpMake(args, contextValue);

                var tRetArray = [];
                var tObj = {};
                tObj.CODE =
                    'WORKING: Mrp Make을 요청했습니다. 처리상태는 Mrp Manager에서 확인하세요.:' +
                    tInput.PO_CD;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            } catch (e) {
                var tWorkStatus = `ERROR:${e.message}:::::`;
                var tRet4 = await AFLib2.CommonFunc.DeleteMrpWork(
                    tUserInfo.USER_ID,
                    tInput.PO_CD,
                );

                var tObj = {};
                tObj.id = 0;
                tObj.CODE = 'ERROR:Mrp Make중 오류가 발생했습니다. ';
                var tArray = [];
                tArray.push(tObj);
                return tArray;
            }
        },
        mgrInsert_S030510_MRP_SAVE: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput = { ...args.datas[0] };

            try {
                /*
                var tRet2 = await AFLib2.CommonFunc.CheckMrpWork(
                    tUserInfo.USER_ID,
                    tInput.PO_CD,
                );
                if (tRet2 > 0) {
                    var tObj = {};
                    tObj.id = 0;
                    tObj.CODE =
                        'ERROR:현재 작업중입니다. 잠시후에 다시 조회하십시요';
                    tObj.CODE1 = '';
                    tObj.CODE2 = '';
                    tObj.NEW_PO_SEQ = '';
                    tObj.LAST_PO_SEQ = '';
                    var tArray = [];
                    tArray.push(tObj);
                    return tArray;
                } else {
                    var tRet3_0 = await AFLib2.CommonFunc.CheckMrpWorkEnd(
                        tUserInfo.USER_ID,
                        tInput.PO_CD,
                    );
                    var tRet3 = parseInt(tRet3_0);
                    console.log('step_4:' + tRet3_0);
                    if (tRet3 > 0) {
                        var tRet4 = await AFLib2.CommonFunc.CheckMrpWorkStatus(
                            tUserInfo.USER_ID,
                            tInput.PO_CD,
                        );
                        if (tRet4.includes('SUCCESS:MRP MAKE')) {
                        } else {
                            var tObj = {};
                            tObj.id = 0;
                            tObj.CODE = `ERROR:처리해야할 MRP결과가 있습니다. 상태를 확인하세요(001)`;
                            var tArray = [];
                            tArray.push(tObj);
                            return tArray;
                        }
                    } else if (tRet3 < 0) {
                        var tObj = {};
                        tObj.id = 0;
                        tObj.CODE = `ERROR:다른 PO의 Mrp 처리결과가 남아있습니다. 상태를 확인하세요(002)`;
                        var tArray = [];
                        tArray.push(tObj);
                        return tArray;
                    } else {
                        
                  var tObj = {};
                  tObj.id = 0;
                  tObj.CODE = `ERROR:다른 PO의 Mrp 처리결과가 남아있습니다. 상태를 확인하세요(003)`;
                  var tArray = [];
                  tArray.push(tObj);
                  return (tArray);
                  
                    }
                }
                */

                if (args.datas.length <= 0) {
                    var tRet5 = await AFLib2.CommonFunc.DeleteMrpWork(
                        tUserInfo.USER_ID,
                        tInput.PO_CD,
                    );
                    var tRetArray1 = [];
                    var tObj = {};
                    tObj.CODE = `SUCCESS:계산된 결과를 초기화 했습니다. 다시 계산하십시요`;
                    tObj.id = 0;
                    tRetArray1.push(tObj);
                    return tRetArray1;
                }

                var tRetArray = [];
                var tFunc = new S030510_QRY_COMM();
                tRetArray = await tFunc.saveMRP(args, contextValue);

                var tRet5 = await AFLib2.CommonFunc.DeleteMrpWork(
                    tUserInfo.USER_ID,
                    tInput.PO_CD,
                );
                var tRetArray1 = [];
                var tObj = {};
                tObj.CODE = tRetArray[0].CODE;
                tObj.id = 0;
                tRetArray1.push(tObj);
                return tRetArray1;
            } catch (e) {
                var tRet5 = await AFLib2.CommonFunc.DeleteMrpWork(
                    tUserInfo.USER_ID,
                    tInput.PO_CD,
                );

                var tObj = {};
                tObj.id = 0;
                tObj.CODE = 'ERROR:Mrp Save중 오류가 발생했습니다. ';
                var tArray = [];
                tArray.push(tObj);
                return tArray;
            }
        },
    },
};

export default moduleMutation_S030510_3;
