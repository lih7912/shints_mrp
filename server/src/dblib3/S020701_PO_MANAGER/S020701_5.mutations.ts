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
const moduleMutation_S020701_5 = {
    Mutation: {
        mgrInsert_S020701_5_REMOVE_ORDER: async (_, args, contextValue) => {
            //
            var tDateNew = new Date();
            tDateNew.setMonth(tDateNew.getMonth() + 1);
            var tZeroDate = '00';
            var tDateNew_M =
                tZeroDate.substring(
                    0,
                    2 - String(tDateNew.getMonth() + 1).length,
                ) + String(tDateNew.getMonth() + 1);
            var tDateNew_D =
                tZeroDate.substring(0, 2 - String(tDateNew.getDate()).length) +
                String(tDateNew.getMonth());
            var tNewDateStr = tDateNew.getFullYear() + tDateNew_M + tDateNew_D;

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
            var yyyy_str = yyyy.toString();

            var tRetDate =
                yyyy.toString() +
                mm_str +
                dd_str +
                hours_str +
                minutes_str +
                seconds_str;
            var tRetDate1 = tRetDate.substring(0, 8);
            var tYY = 'B' + yyyy.toString().substring(2) + '-';
            tYY = yyyy.toString().substring(2, 4);

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

            var tInput1 = { ...args.datas };
            var tInput2 = [...args.datas1];

            var tPoCd = tInput1.PO_CD;

            var tOrderCds = tInput2.map((col, i) => {
                return col.ORDER_CD;
            });
            console.log(tOrderCds);

            var tSql1 = tOrderCds.reduce((acc, curr, i) => {
                if (i === tOrderCds.length - 1) acc += `'${curr}' `;
                else acc += `'${curr}', `;
                return acc;
            }, '');
            console.log(tSql1);

            var sql_PO = `
                select
                    isnull(PO_STATUS, '0') as PO_STATUS
                from
                    ksv_po_mst
                where
                    po_cd = '${tPoCd}'
            `;
            var ret_PO = await prisma.$queryRaw(Prisma.raw(sql_PO));

            var tSQL = `
                select
                    *
                from
                    ksv_order_mst
                where
                    order_cd in (${tSql1})
            `;

            var tSaveBuyer = '';
            var tSaveFactory = '';
            var tSaveSample = '';
            var tFlag = 0;

            var tRet = await prisma.$queryRaw(Prisma.raw(tSQL));
            var tIdx = 0;
            var tOrderObj = tRet[0];
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tObj = tRet[tIdx];
                console.log(tObj.ORDER_STATUS);

                var tMrpCnt = 0;
                var sql101 = `
                    select
                        isnull(count(*), 0) as cnt
                    from
                        ksv_po_mrp
                    where
                        order_cd = '${tObj.ORDER_CD}'
                        and po_cd = '${tPoCd}'
                `;
                var nRet101 = await prisma.$queryRaw(Prisma.raw(sql101));
                if (nRet101.length > 0 && nRet101[0].cnt > 0) {
                    tMrpCnt = nRet101[0].cnt;
                }

                if (parseInt(ret_PO[0].PO_STATUS) <= 0 || tMrpCnt <= 0) {
                } else {
                    if (
                        tObj.ORDER_CD.substring(2, 4) !== 'XX' &&
                        tObj.SAMPLE_FLAG !== '1'
                    ) {
                        // Order Cancel시에 FOB를 0으로 함. 20260520. Won
                        /*
                        if (parseFloat(tObj.AVR_PRICE) > 0) {
                            var tRetArray = [];
                            var tObj = {};
                            tObj.CODE =
                                'ERROR:FOB를 0으로 Update한후 Cacnel 하세요.';
                            tObj.id = 0;
                            tRetArray.push(tObj);
                            return tRetArray;
                        }
                        */
                    }

                    if (tObj.ORDER_STATUS === '4') {
                        var tRetArray = [];
                        var tObj = {};
                        tObj.CODE = 'ERROR:Cancel Order는 Cancel이 불가함.';
                        tObj.id = 0;
                        tRetArray.push(tObj);
                        return tRetArray;
                    }

                    if (tObj.ORDER_STATUS === '9') {
                        var tRetArray = [];
                        var tObj = {};
                        tObj.CODE = 'ERROR:End Order는 Cancel이 불가함.';
                        tObj.id = 0;
                        tRetArray.push(tObj);
                        return tRetArray;
                    }

                    if (tObj.ORDER_STATUS === '*') {
                        var tRetArray = [];
                        var tObj = {};
                        tObj.CODE = 'ERROR:Waiting Order는 Cancel이 불가함.';
                        tObj.id = 0;
                        tRetArray.push(tObj);
                        return tRetArray;
                    }

                    var sql100 = `
                        select
                            isnull(count(*), 0) as cnt
                        from
                            ksv_order_ship
                        where
                            order_cd = '${tObj.ORDER_CD}'
                    `;
                    var nRet100 = await prisma.$queryRaw(Prisma.raw(sql100));
                    if (nRet100.length > 0 && nRet100[0].cnt > 0) {
                        var tRetArray = [];
                        var tObj = {};
                        tObj.CODE =
                            'ERROR:Already Ship. Ship Qty > 0인 Order는 Cancel이 불가함.';
                        tObj.id = 0;
                        tRetArray.push(tObj);
                        return tRetArray;
                    }
                }

                var tOrderStatus = '';
                if (ret_PO[0].PO_STATUS === '0' ||
                    ret_PO[0].PO_STATUS === '2' ||
                    ret_PO[0].PO_STATUS === '3') 
                {
                    tOrderStatus = 'D';
                } else if (ret_PO[0].PO_STATUS === '4') {
                    tOrderStatus = '4'; // cancel
                }

                if (parseInt(ret_PO[0].PO_STATUS) <= 3 || tMrpCnt <= 0) {
                    //PO_STATUS 가 Reg이면 Order 삭제.재할당 가능
                    var tUpdateSQL = '';
                    tUpdateSQL += `update ksv_order_mst  `;
                    tUpdateSQL += `set order_status = '0' `;
                    tUpdateSQL += `    ,po_cd = '' `;
                    tUpdateSQL += `    ,po_m_eta = '' `;
                    tUpdateSQL += `where order_cd = '${tObj.ORDER_CD}' `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tUpdateSQL));
                    if (tObj.ORDER_STATUS !== '4') tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
                        update ksv_capabook_mem
                        set
                            po_cd = ''
                        where
                            order_cd = '${tObj.ORDER_CD}';
                        
                        update ksv_capabook_mem_ethiopia
                        set
                            po_cd = ''
                        where
                            order_cd = '${tObj.ORDER_CD}';
                        
                        update ksv_capasample_mem
                        set
                            po_cd = ''
                        where
                            order_cd = '${tObj.ORDER_CD}';
                        
                        update ksv_capasample_mem_ethiopia
                        set
                            po_cd = ''
                        where
                            order_cd = '${tObj.ORDER_CD}';
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
                        delete from ksv_po_mem
                        where
                            po_cd = '${tPoCd}'
                            and order_cd = '${tObj.ORDER_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                } else {
                    // PO_STATUS 가 PO Fix이면 Cancel 처리. FOB는 0
                    var tUpdateSQL = '';
                    tUpdateSQL += `update ksv_order_mst  `;
                    tUpdateSQL += `set order_status = '4', avr_price = 0, usd_price = 0 `;
                    tUpdateSQL += `where order_cd = '${tObj.ORDER_CD}' `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tUpdateSQL));
                    tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
                        update ksv_capabook_mem
                        set
                            job_cd = 'D'
                        where
                            order_cd = '${tObj.ORDER_CD}'
                            and book_date = (
                                select
                                    max(book_date)
                                from
                                    ksv_capabook_mem
                                where
                                    order_cd = '${tObj.ORDER_CD}'
                            );
                        
                        update ksv_capabook_mem_ethiopia
                        set
                            job_cd = 'D'
                        where
                            order_cd = '${tObj.ORDER_CD}'
                            and book_date = (
                                select
                                    max(book_date)
                                from
                                    ksv_capabook_mem_ethiopia
                                where
                                    order_cd = '${tObj.ORDER_CD}'
                            );
                        
                        update ksv_capasample_mem
                        set
                            job_cd = 'D'
                        where
                            order_cd = '${tObj.ORDER_CD}'
                            and book_date = (
                                select
                                    max(book_date)
                                from
                                    ksv_capasample_mem
                                where
                                    order_cd = '${tObj.ORDER_CD}'
                            );
                        
                        update ksv_capasample_mem_ethiopia
                        set
                            job_cd = 'D'
                        where
                            order_cd = '${tObj.ORDER_CD}'
                            and book_date = (
                                select
                                    max(book_date)
                                from
                                    ksv_capasample_mem_ethiopia
                                where
                                    order_cd = '${tObj.ORDER_CD}'
                            );
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    if (tObj.ORDER_STATUS !== '4') tSQLArray.push(tSQL99_1);
                     
                    // PO_STATUS가 PO fix인 경우는 해당PO에 계속 Order을 남겨둠.
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
                    tObj.CODE = 'ERROR:Remove Order';
                    tObj.id = 0;
                    retArray.push(tObj);
                    return retArray;
                }
            }
            var retArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCESS:Remove Order';
            tObj.id = 0;
            retArray.push(tObj);
            return retArray;
        },

        mgrInsert_S020701_5_ADD_ORDER: async (_, args, contextValue) => {
            //
            var tDateNew = new Date();
            tDateNew.setMonth(tDateNew.getMonth() + 1);
            var tZeroDate = '00';
            var tDateNew_M =
                tZeroDate.substring(
                    0,
                    2 - String(tDateNew.getMonth() + 1).length,
                ) + String(tDateNew.getMonth() + 1);
            var tDateNew_D =
                tZeroDate.substring(0, 2 - String(tDateNew.getDate()).length) +
                String(tDateNew.getMonth());
            var tNewDateStr = tDateNew.getFullYear() + tDateNew_M + tDateNew_D;

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
            var yyyy_str = yyyy.toString();

            var tRetDate =
                yyyy.toString() +
                mm_str +
                dd_str +
                hours_str +
                minutes_str +
                seconds_str;
            var tRetDate1 = tRetDate.substring(0, 8);
            var tYY = 'B' + yyyy.toString().substring(2) + '-';
            tYY = yyyy.toString().substring(2, 4);

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

            var tInput1 = { ...args.datas };
            var tInput2 = [...args.datas1];

            var tPoCd = tInput1.PO_CD;

            var tOrderCds = tInput2.map((col, i) => {
                return col.ORDER_CD;
            });
            console.log(tOrderCds);

            var sql_PO = `
                select
                    *
                from
                    ksv_po_mst
                where
                    po_cd = '${tPoCd}'
            `;
            var ret_PO = await prisma.$queryRaw(Prisma.raw(sql_PO));

            var tSql1 = tOrderCds.reduce((acc, curr, i) => {
                if (i === tOrderCds.length - 1) acc += `'${curr}' `;
                else acc += `'${curr}', `;
                return acc;
            }, '');
            console.log(tSql1);

            var tSQL = `
                select
                    *
                from
                    ksv_order_mst
                where
                    order_cd in (${tSql1})
            `;

            var tSaveBuyer = '';
            var tSaveFactory = '';
            var tSaveSample = '';
            var tFlag = 0;

            var tRet = await prisma.$queryRaw(Prisma.raw(tSQL));
            var tIdx = 0;
            var tOrderObj = tRet[0];
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tObj = tRet[tIdx];
                console.log(tObj.ORDER_STATUS);

                tSQLArray = [];

                var tOrderStatus = '';
                if (ret_PO[0].PO_STATUS === '0') {
                    tOrderStatus = '1'; // PO Reg
                } else if (
                    ret_PO[0].PO_STATUS === '2' ||
                    ret_PO[0].PO_STATUS === '3'
                ) {
                    tOrderStatus = '2'; // MRP
                } else if (ret_PO[0].PO_STATUS === '4') {
                    tOrderStatus = '3'; // PO
                }

                if (tObj.ORDER_STATUS !== '0') {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE =
                        'ERROR:Order Status가 Reg인것만 등록가능합니다.';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }

                var tUpdateSQL = `
                    update ksv_order_mst
                    set
                        order_status = '${tOrderStatus}',
                        po_cd = '${tPoCd}',
                        po_m_eta = '${tInput1.MATL_ETA}'
                    where
                        order_cd = '${tObj.ORDER_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tUpdateSQL));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    update ksv_capabook_mem
                    set
                        po_cd = '${tPoCd}'
                    where
                        order_cd = '${tObj.ORDER_CD}'
                        and book_date = (
                            select
                                max(book_date)
                            from
                                ksv_capabook_mem
                            where
                                order_cd = '${tObj.ORDER_CD}'
                        );
                    
                    update ksv_capabook_mem_ethiopia
                    set
                        po_cd = '${tPoCd}'
                    where
                        order_cd = '${tObj.ORDER_CD}'
                        and book_date = (
                            select
                                max(book_date)
                            from
                                ksv_capabook_mem
                            where
                                order_cd = '${tObj.ORDER_CD}'
                        );
                    
                    update ksv_capasample_mem
                    set
                        po_cd = '${tPoCd}'
                    where
                        order_cd = '${tObj.ORDER_CD}'
                        and book_date = (
                            select
                                max(book_date)
                            from
                                ksv_capabook_mem
                            where
                                order_cd = '${tObj.ORDER_CD}'
                        );
                    
                    update ksv_capasample_mem_ethiopia
                    set
                        po_cd = '${tPoCd}'
                    where
                        order_cd = '${tObj.ORDER_CD}'
                        and book_date = (
                            select
                                max(book_date)
                            from
                                ksv_capabook_mem
                            where
                                order_cd = '${tObj.ORDER_CD}'
                        );
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    update ksv_capabook_mem
                    set
                        job_cd = 'U'
                    where
                        order_cd = '${tObj.ORDER_CD}'
                        and job_cd in ('0', 'U')
                        and book_date = (
                            select
                                max(book_date)
                            from
                                ksv_capabook_mem
                            where
                                order_cd = '${tObj.ORDER_CD}'
                        );
                    
                    update ksv_capabook_mem_ethiopia
                    set
                        job_cd = 'U'
                    where
                        order_cd = '${tObj.ORDER_CD}'
                        and job_cd in ('0', 'U')
                        and book_date = (
                            select
                                max(book_date)
                            from
                                ksv_capabook_mem
                            where
                                order_cd = '${tObj.ORDER_CD}'
                        );
                    
                    update ksv_capasample_mem
                    set
                        job_cd = 'U'
                    where
                        order_cd = '${tObj.ORDER_CD}'
                        and job_cd in ('0', 'U')
                        and book_date = (
                            select
                                max(book_date)
                            from
                                ksv_capabook_mem
                            where
                                order_cd = '${tObj.ORDER_CD}'
                        );
                    
                    update ksv_capasample_mem_ethiopia
                    set
                        job_cd = 'U'
                    where
                        order_cd = '${tObj.ORDER_CD}'
                        and job_cd in ('0', 'U')
                        and book_date = (
                            select
                                max(book_date)
                            from
                                ksv_capabook_mem
                            where
                                order_cd = '${tObj.ORDER_CD}'
                        );
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                var tInObj = {};
                tInObj.PO_CD = tPoCd;
                tInObj.PO_SEQ = ret_PO[0].PO_SEQ;
                tInObj.ORDER_CD = tObj.ORDER_CD;
                let tSQL99 = AFLib.createTableSql('KSV_PO_MEM', tInObj);
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
                    var retArray = [];
                    var tObj = {};
                    tObj.CODE = `ERROR:Add Order:${e.message}`;
                    tObj.id = 0;
                    retArray.push(tObj);
                    return retArray;
                }
            }
            var retArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCESS:Add Order';
            tObj.id = 0;
            retArray.push(tObj);
            return retArray;
        },

        mgrInsert_S020701_5: async (_, args, contextValue) => {
            //
            var tDateNew = new Date();
            tDateNew.setMonth(tDateNew.getMonth() + 1);
            var tZeroDate = '00';
            var tDateNew_M =
                tZeroDate.substring(
                    0,
                    2 - String(tDateNew.getMonth() + 1).length,
                ) + String(tDateNew.getMonth() + 1);
            var tDateNew_D =
                tZeroDate.substring(0, 2 - String(tDateNew.getDate()).length) +
                String(tDateNew.getMonth());
            var tNewDateStr = tDateNew.getFullYear() + tDateNew_M + tDateNew_D;

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
            var yyyy_str = yyyy.toString();

            var tRetDate =
                yyyy.toString() +
                mm_str +
                dd_str +
                hours_str +
                minutes_str +
                seconds_str;
            var tRetDate1 = tRetDate.substring(0, 8);
            var tYY = 'B' + yyyy.toString().substring(2) + '-';
            tYY = yyyy.toString().substring(2, 4);

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

            var tInput1 = { ...args.datas };
            var tInput2 = [...args.datas1];

            var tOrderCds = tInput2.map((col, i) => {
                return col.ORDER_CD;
            });
            console.log(tOrderCds);

            // Check NSR
            var tSQL900 = `
                select
                    a.buyer_cd,
                    b.company_code
                from
                    kcd_buyer a,
                    kcd_user b
                where
                    a.buyer_cd = '${tOrderCds[0].substring(0, 2)}'
                    and a.reg_user = b.user_id
            `;
            var nRet900 = await prisma.$queryRaw(Prisma.raw(tSQL900));
            var tNsrFlag = 0;
            if (nRet900.length > 0 && nRet900[0].company_code === 'nsr')
                tNsrFlag = 1;

            var tSql1 = tOrderCds.reduce((acc, curr, i) => {
                if (i === tOrderCds.length - 1) acc += `'${curr}' `;
                else acc += `'${curr}', `;
                return acc;
            }, '');
            console.log(tSql1);

            var sql0 = `
                select
                    *
                from
                    ksv_po_mem
                where
                    order_cd in (${tSql1})
            `;
            var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            if (tRet0.length > 0) {
                var retArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR: 이미 PO가 등록된 오더입니다';
                tObj.id = 0;
                retArray.push(tObj);
                return retArray;
            }

            var tSQL = `
                select
                    *
                from
                    ksv_order_mst
                where
                    order_cd in (${tSql1})
            `;

            var tSaveBuyer = '';
            var tSaveFactory = '';
            var tSaveSample = '';
            var tSaveFacLc = '';
            var tIS_SAMPLE = '';
            var tIS_FAC_LC_FLAG = '';
            var tFlag = 0;

            var tRet = await prisma.$queryRaw(Prisma.raw(tSQL));
            var tIdx = 0;
            var tOrderObj = tRet[0];
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tObj = tRet[tIdx];
                if (tObj.SAMPLE_FLAG == '1') tIS_SAMPLE = '1';
                if (tObj.FAC_LC_FLAG == '1') tIS_FAC_LC_FLAG = '1';

                if (tSaveBuyer === '') {
                    tSaveBuyer = tObj.ORDER_CD.substring(0, 2);
                    tSaveFactory = tObj.FACTORY_CD;
                    tSaveSample = tObj.SAMPLE_FLAG;
                    tSaveFacLc = tObj.FAC_LC_FLAG;
                    continue;
                }
                var tBuyer = tObj.ORDER_CD.substring(0, 2);
                if (tSaveBuyer !== tBuyer) {
                    tFlag = 1;
                    break;
                }
                if (tSaveFactory !== tObj.FACTORY_CD) {
                    tFlag = 2;
                    break;
                }
                if (tSaveSample !== tObj.SAMPLE_FLAG) {
                    tFlag = 3;
                    break;
                }
                if (tSaveFacLc !== tObj.FAC_LC_FLAG) {
                    tFlag = 4;
                    break;
                }
                tSaveBuyer = tBuyer;
                tSaveFactory = tObj.FACTORY_CD;
            }

            if (tFlag === 1) {
                var retArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR: 다른 바이어입니다';
                tObj.id = 0;
                retArray.push(tObj);
                return retArray;
            }
            if (tFlag === 2) {
                var retArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR: 다른 공장입니다';
                tObj.id = 0;
                retArray.push(tObj);
                return retArray;
            }
            if (tFlag === 3) {
                var retArray = [];
                var tObj = {};
                tObj.CODE =
                    'ERROR: Main, Sample 오더는 같은 PO로 설정할수 없습니다';
                tObj.id = 0;
                retArray.push(tObj);
                return retArray;
            }
            if (tFlag === 4) {
                var retArray = [];
                var tObj = {};
                tObj.CODE =
                    'ERROR: Factory FOB 오더는 동일 종류 오더로만 PO 설정할수 있습니다';
                tObj.id = 0;
                retArray.push(tObj);
                return retArray;
            }

            var tPoType = '';
            var tOrderStatus = '';
            var tPoStatus = '';

            var tInputObj = args.datas[0];

            var tPO = '';
            var tPO_Prefix = '';
            /*
      var tSQL1 = `
          select
              TAG_PO
          from
              kcd_factory
          where
              factory_cd = '${tOrderObj.FACTORY_CD}'
      `;
      var tRet1 = await prisma.$queryRaw(Prisma.raw(tSQL1));
      if (tRet1.length > 0) {
         tPO = tRet1[0].TAG_PO;
      }

*/
            var tHyphon = '-';
            tPoType = 'M';
            tOrderStatus = '1';
            tPoStatus = '0';

            if (tSaveFactory !== 'FC044') {
                // fc034, fc010, fc045
                if (tSaveSample === '1') {
                    tPO = 'PO';
                    tHyphon = 'S';
                    tPO_Prefix = 'P';
                    tPoType = 'N';
                } else if (tSaveFacLc === '1') {
                    tPO = 'PO';
                    tHyphon = 'L';
                    tPO_Prefix = 'P';
                    tPoType = 'U';
                } else {
                    tPO = 'PO';
                    tHyphon = '-';
                    tPO_Prefix = 'P';
                    tPoType = 'M';
                }

                if (tNsrFlag === 1) {
                    tHyphon = 'N';
                }
            }
            if (tSaveFactory === 'FC044') {
                if (tSaveSample === '1') {
                    tPO = 'EO';
                    tHyphon = 'S';
                    tPO_Prefix = 'E';
                    tPoType = 'N';
                } else if (tSaveFacLc === '1') {
                    tPO = 'EO';
                    tHyphon = 'L';
                    tPO_Prefix = 'E';
                    tPoType = 'U';
                } else {
                    tPO = 'EO';
                    tHyphon = '-';
                    tPO_Prefix = 'E';
                    tPoType = 'M';
                }

                if (tNsrFlag === 1) {
                    tHyphon = 'N';
                }
            }

            var tSeq = 0;

            var tSQL2 = `
                SELECT
                    isnull(max(seq), 0) as max_seq
                FROM
                    ksv_po_getseq
                WHERE
                    PO = '${tPO_Prefix}'
                    and YY = ${yyyy}
            `;
            var tRet2 = await prisma.$queryRaw(Prisma.raw(tSQL2));
            if (tRet2.length > 0) {
                tSeq = tRet2[0].max_seq + 1;
            } else {
                tSeq = 1;
            }
            console.log('max_seq:' + tSeq);

            var tGetSeqSQL = '';
            if (tSeq === 1) {
                tGetSeqSQL += `
                    insert into
                        ksv_po_getseq
                `;
                tGetSeqSQL += `(PO, YY, SEQ) values (  `;
                tGetSeqSQL += ` '${tPO_Prefix}', ${yyyy}, 1)`;
            } else {
                tGetSeqSQL += `
                    update ksv_po_getseq
                    set
                `;
                tGetSeqSQL += ` seq = seq + 1  `;
                tGetSeqSQL += ` WHERE  PO = '${tPO_Prefix}' and YY = ${yyyy} `;
            }
            var tRet2_0 = await prisma.$queryRaw(Prisma.raw(tGetSeqSQL));

            var tBvtFlag = '0';
            if (tOrderObj.FACTORY_CD === 'FC034') tBvtFlag = '1';

            var tSeqStr = '0000';
            var tSeqStr1 = String(tSeq);
            var tSeqStr2 = tSeqStr.substring(0, 4 - tSeqStr1.length) + tSeqStr1;

            var tPoCd = tPO + tRetDate.substring(2, 4) + tHyphon + tSeqStr2;

            var tInsertObj1 = {};
            tInsertObj1.PO_CD = tPoCd;
            tInsertObj1.STATUS_CD = '0';
            tInsertObj1.BUYER_CD = tRet[0].ORDER_CD.substring(0, 2);
            tInsertObj1.FACTORY_CD = tRet[0].FACTORY_CD;
            tInsertObj1.REG_USER = tUserInfo.USER_ID;
            tInsertObj1.REG_DATETIME = tRetDate;
            let tSQL99 = AFLib.createTableSql('KSV_PO_WORKLIST', tInsertObj1);
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            var tInsertKSV_PO_MST = [];
            var tInsertObj = {};
            tInsertObj.PO_CD = tPoCd;
            tInsertObj.PO_SEQ = 1;
            tInsertObj.PO_TYPE = tPoType;
            tInsertObj.PO_DATE = tRetDate.substring(0, 8);
            tInsertObj.PO_STATUS = tPoStatus;
            tInsertObj.MATL_DUE_DATE = tOrderObj.MATL_DUE_DATE.substring(0, 8);
            if (tInput1.MATL_ETA !== '')
                tInsertObj.MATL_DUE_DATE = tInput1.MATL_ETA;
            tInsertObj.PROD_DUE_DATE = tOrderObj.DUE_DATE.substring(0, 8);
            tInsertObj.PLACE_CD = '';
            tInsertObj.CURR_DATE = tRetDate.substring(0, 8);
            tInsertObj.YY = yyyy;
            tInsertObj.SEQ = tSeq;
            tInsertObj.FACTORY_CD = tOrderObj.FACTORY_CD;
            tInsertObj.DELIVERY_TYPE = '';
            tInsertObj.STATUS_CD = '0';
            tInsertObj.BVT_FLAG = tBvtFlag;
            tInsertObj.REG_USER = tUserInfo.USER_ID;
            tInsertObj.REG_DATETIME = tRetDate;

            let tSQL99 = AFLib.createTableSql('KSV_PO_MST', tInsertObj);
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            tRet.forEach((col, i) => {
                var tObj = {};
                tObj.PO_CD = tPoCd;
                tObj.PO_SEQ = 1;
                tObj.ORDER_CD = col.ORDER_CD;

                let tSQL99 = AFLib.createTableSql('KSV_PO_MEM', tObj);
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            });

            var tIdx9 = 0;
            for (tIdx9 = 0; tIdx9 < tOrderCds.length; tIdx9++) {
                var tOrderCd = tOrderCds[tIdx9];

                var tUpdateSQL = '';
                tUpdateSQL += `update ksv_order_mst  `;
                tUpdateSQL += `set order_status = '${tOrderStatus}' `;
                tUpdateSQL += `    ,po_cd = '${tPoCd}' `;
                tUpdateSQL += `    ,po_m_eta = '${tInput1.MATL_ETA}' `;
                tUpdateSQL += `where order_cd = '${tOrderCd}' `;

                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tUpdateSQL));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    update ksv_capabook_mem
                    set
                        po_cd = '${tPoCd}'
                    where
                        order_cd = '${tOrderCd}'
                        and book_date = (
                            select
                                max(book_date)
                            from
                                ksv_capabook_mem
                            where
                                order_cd = '${tOrderCd}'
                        );
                    
                    update ksv_capabook_mem_ethiopia
                    set
                        po_cd = '${tPoCd}'
                    where
                        order_cd = '${tOrderCd}'
                        and book_date = (
                            select
                                max(book_date)
                            from
                                ksv_capabook_mem
                            where
                                order_cd = '${tOrderCd}'
                        );
                    
                    update ksv_capasample_mem
                    set
                        po_cd = '${tPoCd}'
                    where
                        order_cd = '${tOrderCd}'
                        and book_date = (
                            select
                                max(book_date)
                            from
                                ksv_capabook_mem
                            where
                                order_cd = '${tOrderCd}'
                        );
                    
                    update ksv_capasample_mem_ethiopia
                    set
                        po_cd = '${tPoCd}'
                    where
                        order_cd = '${tOrderCd}'
                        and book_date = (
                            select
                                max(book_date)
                            from
                                ksv_capabook_mem
                            where
                                order_cd = '${tOrderCd}'
                        );
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    update ksv_capabook_mem
                    set
                        job_cd = 'U'
                    where
                        order_cd = '${tOrderCd}'
                        and job_cd in ('0', 'U')
                        and book_date = (
                            select
                                max(book_date)
                            from
                                ksv_capabook_mem
                            where
                                order_cd = '${tOrderCd}'
                        );
                    
                    update ksv_capabook_mem_ethiopia
                    set
                        job_cd = 'U'
                    where
                        order_cd = '${tOrderCd}'
                        and job_cd in ('0', 'U')
                        and book_date = (
                            select
                                max(book_date)
                            from
                                ksv_capabook_mem
                            where
                                order_cd = '${tOrderCd}'
                        );
                    
                    update ksv_capasample_mem
                    set
                        job_cd = 'U'
                    where
                        order_cd = '${tOrderCd}'
                        and job_cd in ('0', 'U')
                        and book_date = (
                            select
                                max(book_date)
                            from
                                ksv_capabook_mem
                            where
                                order_cd = '${tOrderCd}'
                        );
                    
                    update ksv_capasample_mem_ethiopia
                    set
                        job_cd = 'U'
                    where
                        order_cd = '${tOrderCd}'
                        and job_cd in ('0', 'U')
                        and book_date = (
                            select
                                max(book_date)
                            from
                                ksv_capabook_mem
                            where
                                order_cd = '${tOrderCd}'
                        );
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            }

            /*
      var tUpdateSQL = tRet.map ((col, i) => {
          var tSQL = '';
          tSQL += `update ksv_order_mst  `;
          tSQL += `set order_status = '${tOrderStatus}', `;
          tSQL += `    po_cd = '${tPoCd}', `;
          tSQL += `where order_ = '${col.ORDER_CD}' `;
          return (tSQL);
      });
*/

            tRet.forEach((col, i) => {
                var tInsertKZZ_SENDDATA_LOG = {};
                tInsertKZZ_SENDDATA_LOG.TABLE_NAME = 'KSV_ORDER_MST';
                tInsertKZZ_SENDDATA_LOG.JOB_FLAG = 'U';
                tInsertKZZ_SENDDATA_LOG.SEND_FLAG = '0';
                tInsertKZZ_SENDDATA_LOG.SEND_DATETIME = '';
                tInsertKZZ_SENDDATA_LOG.KEY1 = col.ORDER_CD;
                tInsertKZZ_SENDDATA_LOG.SQL1 = tUpdateSQL[i];
                tInsertKZZ_SENDDATA_LOG.STATUS_CD = '0';
                tInsertKZZ_SENDDATA_LOG.REG_USER = tUserInfo.USER_ID;
                tInsertKZZ_SENDDATA_LOG.REG_DATETIME = tRetDate;

                let tSQL99 = AFLib.createTableSql(
                    'KZZ_SENDDATA_LOG',
                    tInsertKZZ_SENDDATA_LOG,
                );
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
                var retArray = [];
                var tObj = {};
                tObj.CODE = 'SUCCESS:' + tPoCd;
                tObj.id = 0;
                retArray.push(tObj);
                return retArray;
            } catch (e) {
                var retArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:' + tPoCd;
                tObj.id = 0;
                retArray.push(tObj);
                return retArray;
            }
        },

        mgrUpdate_S020701_5: async (_, args, contextValue) => {
            //
            var tDateNew = new Date();
            tDateNew.setMonth(tDateNew.getMonth() + 1);
            var tZeroDate = '00';
            var tDateNew_M =
                tZeroDate.substring(
                    0,
                    2 - String(tDateNew.getMonth() + 1).length,
                ) + String(tDateNew.getMonth() + 1);
            var tDateNew_D =
                tZeroDate.substring(0, 2 - String(tDateNew.getDate()).length) +
                String(tDateNew.getMonth());
            var tNewDateStr = tDateNew.getFullYear() + tDateNew_M + tDateNew_D;

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
            var yyyy_str = yyyy.toString();

            var tRetDate =
                yyyy.toString() +
                mm_str +
                dd_str +
                hours_str +
                minutes_str +
                seconds_str;
            var tRetDate1 = tRetDate.substring(0, 8);
            var tYY = 'B' + yyyy.toString().substring(2) + '-';
            tYY = yyyy.toString().substring(2, 4);

            // let tPO = "POA2022S672";

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
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tSQLArray = [];

            var tInput1 = { ...args.datas };
            var tInput2 = [...args.datas1];

            var tOrderCds = tInput2.map((col, i) => {
                return col.ORDER_CD;
            });
            console.log(tOrderCds);

            var tSql1 = tOrderCds.reduce((acc, curr, i) => {
                if (i === tOrderCds.length - 1) acc += `'${curr}' `;
                else acc += `'${curr}', `;
                return acc;
            }, '');
            console.log(tSql1);

            var tSQL = `
                select
                    *
                from
                    ksv_order_mst
                where
                    order_cd in (${tSql1})
            `;

            var tSaveBuyer = '';
            var tSaveFactory = '';
            var tFlag = 0;

            var tRet = await prisma.$queryRaw(Prisma.raw(tSQL));
            var tIdx = 0;
            var tOrderObj = tRet[0];
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tObj = tRet[tIdx];

                if (tSaveBuyer === '') {
                    tSaveBuyer = tObj.ORDER_CD.substring(0, 2);
                    tSaveFactory = tObj.FACTORY_CD;
                    continue;
                }
                var tBuyer = tObj.ORDER_CD.substring(0, 2);
                if (tSaveBuyer !== tBuyer || tSaveFactory !== tObj.FACTORY_CD) {
                    tFlag = 1;
                    break;
                }
                tSaveBuyer = tBuyer;
                tSaveFactory = tObj.FACTORY_CD;
            }

            if (tFlag === 1) {
                var retArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR: 다른 바이어입니다';
                tObj.id = 0;
                retArray.push(tObj);
                return retArray;
            }

            let SQL99 = `
                update ksv_order_mst
                set
                    po_cd = '',
                    order_status = '0'
                where
                    po_cd = '${tInput1.PO_CD}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(SQL99));
            tSQLArray.push(tSQL99_1);

            let SQL99 = `
                delete from ksv_po_mem
                where
                    po_cd = '${tInput1.PO_CD}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(SQL99));
            tSQLArray.push(tSQL99_1);

            if (typeof tInput1.MATL_ETA === 'undefined') tInput1.MATL_ETA = '';

            let SQL99 = `
                update ksv_po_mst
                set
                    matl_due_date = '${tInput1.MATL_ETA}'
                where
                    po_cd = '${tInput1.PO_CD}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(SQL99));
            if (tInput1.MATL_DUE_DATE !== '') tSQLArray.push(tSQL99_1);

            tRet.forEach((col, i) => {
                var tObj = {};
                tObj.PO_CD = tInput1.PO_CD;
                tObj.PO_SEQ = 1;
                tObj.ORDER_CD = col.ORDER_CD;

                let tSQL99 = AFLib.createTableSql('KSV_PO_MEM', tObj);
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                var tUpdateSQL0 = `
                    update ksv_order_mst
                    set
                        po_cd = '${tInput1.PO_CD}',
                        po_m_eta = '${tInput1.MATL_ETA}',
                        order_status = '1'
                    where
                        order_cd = '${col.ORDER_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tUpdateSQL0));
                tSQLArray.push(tSQL99_1);
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
                tObj.CODE = 'SUCCESS:' + tInput1.PO_CD;
                tObj.id = 0;
                retArray.push(tObj);
                return retArray;
            } catch (e) {
                var retArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:' + tInput1.PO_CD;
                tObj.id = 0;
                retArray.push(tObj);
                return retArray;
            }
        },
        mgrDelete_S020701_5: async (_, args, contextValue) => {
            //
            var tDateNew = new Date();
            tDateNew.setMonth(tDateNew.getMonth() + 1);
            var tZeroDate = '00';
            var tDateNew_M =
                tZeroDate.substring(
                    0,
                    2 - String(tDateNew.getMonth() + 1).length,
                ) + String(tDateNew.getMonth() + 1);
            var tDateNew_D =
                tZeroDate.substring(0, 2 - String(tDateNew.getDate()).length) +
                String(tDateNew.getMonth());
            var tNewDateStr = tDateNew.getFullYear() + tDateNew_M + tDateNew_D;

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
            var yyyy_str = yyyy.toString();

            var tRetDate =
                yyyy.toString() +
                mm_str +
                dd_str +
                hours_str +
                minutes_str +
                seconds_str;
            var tRetDate1 = tRetDate.substring(0, 8);
            var tYY = 'B' + yyyy.toString().substring(2) + '-';
            tYY = yyyy.toString().substring(2, 4);

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

            var tInput1 = { ...args.datas };
            var tInput2 = [...args.datas1];

            var tOrderCds = tInput2.map((col, i) => {
                return col.ORDER_CD;
            });
            console.log(tOrderCds);

            var tSql1 = tOrderCds.reduce((acc, curr, i) => {
                if (i === tOrderCds.length - 1) acc += `'${curr}' `;
                else acc += `'${curr}', `;
                return acc;
            }, '');
            console.log(tSql1);

            var tSQL = `
                select
                    *
                from
                    ksv_order_mst
                where
                    order_cd in (${tSql1})
            `;

            var tSaveBuyer = '';
            var tSaveFactory = '';
            var tFlag = 0;

            var tRet = await prisma.$queryRaw(Prisma.raw(tSQL));
            var tIdx = 0;
            var tOrderObj = tRet[0];
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tObj = tRet[tIdx];

                if (tSaveBuyer === '') {
                    tSaveBuyer = tObj.ORDER_CD.substring(0, 2);
                    tSaveFactory = tObj.FACTORY_CD;
                    continue;
                }
                var tBuyer = tObj.ORDER_CD.substring(0, 2);
                if (tSaveBuyer !== tBuyer || tSaveFactory !== tObj.FACTORY_CD) {
                    tFlag = 1;
                    break;
                }
                tSaveBuyer = tBuyer;
                tSaveFactory = tObj.FACTORY_CD;
            }

            if (tFlag === 1) {
                var retArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR: 다른 바이어입니다';
                tObj.id = 0;
                retArray.push(tObj);
                return retArray;
            }

            /*
      tRet.forEach((col, i) => { 
          var tObj = {};
          tObj.PO_CD = tInput1.PO_CD;
          tObj.PO_SEQ = 1;
          tObj.ORDER_CD = col.ORDER_CD;

          let tSQL99 = AFLib.createTableSql('KSV_PO_MEM', tObj);
          const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
          tSQLArray.push(tSQL99_1);
      });
*/

            var tDeleteSQL = `
                delete from ksv_po_mem
                where
                    po_cd = '${tInput1.PO_CD}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tDeleteSQL));
            tSQLArray.push(tSQL99_1);

            var tDeleteSQL1 = `
                delete from ksv_po_mst
                where
                    po_cd = '${tInput1.PO_CD}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tDeleteSQL1));
            tSQLArray.push(tSQL99_1);

            var tDeleteSQL1 = `
                delete from ksv_po_worklist
                where
                    po_cd = '${tInput1.PO_CD}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tDeleteSQL1));
            tSQLArray.push(tSQL99_1);

            var tUpdateSQL = `
                update ksv_order_mst
                set
                    po_cd = '',
                    order_status = '0'
                where
                    po_cd = '${tInput1.PO_CD}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tUpdateSQL));
            tSQLArray.push(tSQL99_1);

            tRet.forEach((col, i) => {
                var tInsertKZZ_SENDDATA_LOG = {};
                tInsertKZZ_SENDDATA_LOG.TABLE_NAME = 'KSV_ORDER_MST';
                tInsertKZZ_SENDDATA_LOG.JOB_FLAG = 'U';
                tInsertKZZ_SENDDATA_LOG.SEND_FLAG = '0';
                tInsertKZZ_SENDDATA_LOG.SEND_DATETIME = '';
                tInsertKZZ_SENDDATA_LOG.KEY1 = col.ORDER_CD;
                tInsertKZZ_SENDDATA_LOG.SQL1 = tUpdateSQL;
                tInsertKZZ_SENDDATA_LOG.STATUS_CD = '0';
                tInsertKZZ_SENDDATA_LOG.REG_USER = tUserInfo.USER_ID;
                tInsertKZZ_SENDDATA_LOG.REG_DATETIME = tRetDate;

                /*
          let tSQL99 = AFLib.createTableSql('KZZ_SENDDATA_LOG', tInsertKZZ_SENDDATA_LOG);
          const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
          tSQLArray.push(tSQL99_1);
*/
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
                tObj.CODE = 'SUCCESS:' + tInput1.PO_CD;
                tObj.id = 0;
                retArray.push(tObj);
                return retArray;
            } catch (e) {
                var retArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:' + tInpu1.PO_CD;
                tObj.id = 0;
                retArray.push(tObj);
                return retArray;
            }
        },
    },
};

export default moduleMutation_S020701_5;
