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
const moduleMutation_S0434_5 = {
    Mutation: {
        mgrDelete_S0434_5: async (_, args, contextValue) => {
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

            var tRetDate =
                yyyy.toString() +
                mm_str +
                dd_str +
                hours_str +
                minutes_str +
                seconds_str;
            var tRetDate1 = tRetDate.substring(0, 8);
            var tYY = 'B' + yyyy.toString().substring(2) + '-';

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
            var tInput = [...args.datas];

            var tSQLArray = [];

            var tIdx1 = 0;
            for (tIdx1 = 0; tIdx1 < args.datas.length; tIdx1++) {
                var col = { ...args.datas[tIdx1] };

                let sql0 = `
                    select
                        *
                    from
                        ksv_shipment_mst
                    where
                        shipment_cd = '${col.SHIPMENT_CD}'
                `;
                var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                var tShipmentMst = nRet0[0];

                let tSQL99 = `
                    delete from ksv_shipment_mem
                    where
                        stsout_cd in (
                            select distinct
                                stsout_cd
                            from
                                ksv_shipment_mem
                            where
                                shipment_cd = '${col.SHIPMENT_CD}'
                        )
                        and origin_port = 'SINGAPORE'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    update ksv_shipment_mem
                    set
                        shipment_cd = '',
                        ship_mode = '',
                        ship_date = '',
                        sendor = '',
                        receiver = '',
                        remark = '',
                        origin_port = org_origin_port,
                        destination = org_destination,
                        bl_no = ''
                    where
                        shipment_cd = '${col.SHIPMENT_CD}'
                        and stsout_cd in (
                            select distinct
                                stsout_cd
                            from
                                ksv_shipment_mem
                            where
                                shipment_cd = '${col.SHIPMENT_CD}'
                        )
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    delete from ksv_shipment_mst
                    where
                        shipment_cd = '${col.SHIPMENT_CD}'
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
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'SUCCEED:' + tNewCd;
                tObj.id = 0;
                tRetArray.push(tObj);
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:STOCK_IN';
                tObj.id = 0;
                tRetArray.push(tObj);
            }
            return tRetArray;
        },

        mgrInsert_S0434_5_SINGAPORE: async (_, args, contextValue) => {
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

            var tRetDate =
                yyyy.toString() +
                mm_str +
                dd_str +
                hours_str +
                minutes_str +
                seconds_str;
            var tRetDate1 = tRetDate.substring(0, 8);
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
            var tInput = [...args.datas];

            var tSQLArray = [];

            let tSQL99 = `
                update ksv_shipment_mst
                set
                    status_cd = '9'
                where
                    shipment_cd = '${tInput[0].SHIPMENT_CD}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            let tSQL99 = `
                insert into
                    ksv_shipment_mem (
                        shipment_cd,
                        stsout_cd,
                        is_stsout,
                        invoice_no,
                        trade_term,
                        ready_date,
                        origin_port,
                        destination,
                        ship_mode,
                        ship_date,
                        ct_qty,
                        weight,
                        cbm,
                        sendor,
                        receiver,
                        buyer,
                        description,
                        remark,
                        bl_no,
                        target_eta,
                        amount,
                        payment,
                        org_destination,
                        org_origin_port
                    )
                select
                    '',
                    stsout_cd,
                    is_stsout,
                    invoice_no,
                    trade_term,
                    ready_date,
                    'SINGAPORE',
                    org_destination,
                    ship_mode,
                    ship_date,
                    ct_qty,
                    weight,
                    cbm,
                    sendor,
                    receiver,
                    buyer,
                    description,
                    remark,
                    bl_no,
                    target_eta,
                    amount,
                    payment,
                    org_destination,
                    org_origin_port
                from
                    ksv_shipment_mem
                where
                    shipment_cd = '${tInput[0].SHIPMENT_CD}'
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
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'SUCCEED:' + tNewCd;
                tObj.id = 0;
                tRetArray.push(tObj);
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:STOCK_IN';
                tObj.id = 0;
                tRetArray.push(tObj);
            }
            return tRetArray;
        },

        mgrInsert_S0434_5_FIX: async (_, args, contextValue) => {
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

            var tRetDate =
                yyyy.toString() +
                mm_str +
                dd_str +
                hours_str +
                minutes_str +
                seconds_str;
            var tRetDate1 = tRetDate.substring(0, 8);
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
            var tInput = [...args.datas];

            var tSQLArray = [];

            var tIdx = 0;
            for (tIdx = 0; tIdx < tInput.length; tIdx++) {
                var tObj = { ...tInput[tIdx] };
                let tSQL99 = `
                    update ksv_shipment_mst
                    set
                        fix_flag = '1'
                    where
                        shipment_cd = '${tObj.SHIPMENT_CD}'
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
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'SUCCEED:' + tNewCd;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:STOCK_IN';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },
        mgrInsert_S0434_5_ETD_SYNC: async (_, args, contextValue) => {
            var tInput = [...args.datas];
            var tSQLArray = [];

            var tIdx = 0;
            for (tIdx = 0; tIdx < tInput.length; tIdx++) {
                var tObj = { ...tInput[tIdx] };
                if (!tObj.SHIPMENT_CD || !tObj.ETD) continue;

                let tSQL99 = `
                    update ksv_shipment_mst
                    set
                        etd = '${tObj.ETD}'
                    where
                        shipment_cd = '${tObj.SHIPMENT_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            }

            if (tSQLArray.length === 0) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'SUCCEED:NO_DATA';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'SUCCEED:ETD_SYNC';
                tObj.id = tSQLArray.length;
                tRetArray.push(tObj);
                return tRetArray;
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:ETD_SYNC';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },
        mgrInsert_S0434_5_END: async (_, args, contextValue) => {
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

            var tRetDate =
                yyyy.toString() +
                mm_str +
                dd_str +
                hours_str +
                minutes_str +
                seconds_str;
            var tRetDate1 = tRetDate.substring(0, 8);
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
            var tInput = [...args.datas];

            var tSQLArray = [];

            var tIdx = 0;
            for (tIdx = 0; tIdx < tInput.length; tIdx++) {
                var tObj = { ...tInput[tIdx] };

                /*
        var tSQL = `
            select
                count(*) as c_cnt
            from
                ksv_stock_out
            where
                pack_cd = '${tObj.REMARK}'
                and eta is not null
                and eta <> ''
        `;
        var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
        if (nRet0.length > 0 && nRet0[0].c_cnt > 0) {
           var tSQL1 = `
               update ksv_stock_out
               set
                   eta = ''
               where
                   pack_cd = '${tObj.REMARK}'
                   and (
                       eta is not null
                       and eta <> ''
                   )
           `;
           var nRet1 = await prisma.$queryRaw(Prisma.raw(tSQL1));
        } else {
           var tSQL1 = `
               update ksv_stock_out
               set
                   eta = '${tObj.END_DATE}'
               where
                   pack_cd = '${tObj.REMARK}'
                   and (
                       eta is null
                       or eta = ''
                   )
           `;
           var nRet1 = await prisma.$queryRaw(Prisma.raw(tSQL1));
        }
        */

                var tSQL = `
                    select
                        isnull(ETA, '') as ETA,
                        isnull(shipping_cost, '0') as shipping_cost,
                        isnull(shipping_cost_curr, '') as shipping_cost_curr,
                        isnull(shipping_cost_paid, '') as shipping_cost_paid,
                        isnull(import_cost, '0') as import_cost,
                        isnull(import_cost_curr, '') as import_cost_curr,
                        isnull(import_cost_paid, '') as import_cost_paid,
                        isnull(duty_cost, '') as duty_cost,
                        isnull(duty_cost, '') as duty_cost,
                        isnull(status_cd, '') as status_cd,
                        isnull(org_status_cd, '') as org_status_cd
                    from
                        ksv_shipment_mst
                    where
                        shipment_cd = '${tObj.SHIPMENT_CD}'
                `;
                var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
                var tShipCost = 0;
                var tShipCostCurr = '';
                var tImportCost = 0;
                var tDutyCost = 0;
                var tImportCostCurr = '';
                var tStatusCd = '';
                var tOrgStatusCd = '';
                if (nRet0.length > 0) {
                    tShipCost = parseFloat(nRet0[0].shipping_cost);
                    tShipCostCurr = nRet0[0].shipping_cost_curr;
                    tImportCost = parseFloat(nRet0[0].import_cost);
                    tImportCostCurr = nRet0[0].import_cost_curr;
                    tDutyCost = parseFloat(nRet0[0].duty_cost);
                    tStatusCd = nRet0[0].status_cd;
                    tOrgStatusCd = nRet0[0].org_status_cd;

                    if (parseFloat(nRet0[0].ETA) <= parseFloat(tRetDate1));
                    else {
                        if (nRet0[0].ETA !== '') {
                            if (nRet0[0].status_cd !== '4') {
                                var tRetArray = [];
                                var tObj = {};
                                tObj.CODE = `ERROR:Shipment End:ETA가 오늘날짜보다 큰것은 End할수 없습니다(${nRet0[0].ETA}/${tRetDate1})`;
                                tObj.id = 0;
                                tRetArray.push(tObj);
                                return tRetArray;
                            }
                        }
                    }
                }

                let tSQL99 = '';
                if (tStatusCd === '4') {
                    tSQL99 = `
                        update ksv_shipment_mst
                        set
                            status_cd = org_status_cd,
                            end_date = ''
                        where
                            shipment_cd = '${tObj.SHIPMENT_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                } else {
                    tSQL99 = `
                        update ksv_shipment_mst
                        set
                            org_status_cd = '${tStatusCd}',
                            status_cd = '4',
                            end_date = '${tObj.END_DATE}'
                        where
                            shipment_cd = '${tObj.SHIPMENT_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }

                if (tShipCost > 0 && tStatusCd === '4') {
                    let tSQL99 = `
                        delete from ksv_cost_mst
                        where
                            shipment_cd = '${tObj.SHIPMENT_CD}'
                            and
                        type = 'SHIPPING_COST'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }

                if (tShipCost > 0 && tStatusCd !== '4') {
                    let tSQL99 = `
                        delete from ksv_cost_mst
                        where
                            shipment_cd = '${tObj.SHIPMENT_CD}'
                            and
                        type = 'SHIPPING_COST'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    if (tShipmentMst.STATUS_CD === '4')
                        tSQLArray.push(tSQL99_1);

                    var sql3 = `
                        select
                            d.buyer_cd,
                            a.bl_no,
                            a.reg_datetime,
                            b.cd_name as type2,
                            sum(c.weight) as s_weight
                        from
                            ksv_shipment_mst a,
                            ksv_shipment_mem a1,
                            kcd_code b,
                            ksv_stock_out_mst c,
                            ksv_pu_mst2 d
                        where
                            a.shipment_cd = '${tObj.SHIPMENT_CD}'
                            and a.shipment_cd = a1.shipment_cd
                            and a.ship_mode = b.cd_code
                            and b.cd_group = 'SHIPMENT_SHIP_MODE'
                            and a1.stsout_cd = c.stsout_cd
                            and c.pu_cd = d.pu_cd
                        group by
                            d.buyer_cd,
                            a.bl_no,
                            a.reg_datetime,
                            b.cd_name
                    `;
                    var tRet3 = await prisma.$queryRaw(Prisma.raw(sql3));

                    var tIdx3 = 0;
                    for (tIdx3 = 0; tIdx3 < tRet3.length; tIdx3++) {
                        var tOne3 = { ...tRet3[tIdx3] };

                        var tWeight3 = parseFloat(tOne3.s_weight);
                        var tShipCost3 =
                            parseFloat(tShipCost) * (tWeight3 / tTotalWeight);

                        let tSQL99 = `
                            insert into
                                ksv_cost_mst (
                                    buyer_cd,
                                    cost_date,
                                    pu_cd,
                                    po_cd,
                                    matl_cd,
                                    shipment_cd,
                                    invoice_no,
                                    type,
                                    type2,
                                    cost_curr,
                                    cost_amt,
                                    reg_user,
                                    confirm_user,
                                    confirm_date,
                                    bl_no,
                                    ship_date
                                )
                            values
                                (
                                    '${tOne3.buyer_cd}',
                                    '${tRetDate1}',
                                    '',
                                    '',
                                    '',
                                    '${tObj.SHIPMENT_CD}',
                                    '',
                                    'SHIPPING_COST',
                                    '${tOne3.type2}',
                                    '${tShipCostCurr}',
                                    '${tShipCost3}',
                                    '${tUserInfo.USER_ID}',
                                    '',
                                    '',
                                    '${tOne3.bl_no}',
                                    '${tOne3.reg_datetime.substring(0, 8)}'
                                )
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);
                    }
                }

                if (tImportCost > 0 && tStatusCd === '4') {
                    let tSQL99 = `
                        delete from ksv_cost_mst
                        where
                            shipment_cd = '${tObj.SHIPMENT_CD}'
                            and
                        type = 'LOCAL_COST'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }
                if (tImportCost > 0 && tStatusCd !== '4') {
                    let tSQL99 = `
                        delete from ksv_cost_mst
                        where
                            shipment_cd = '${tObj.SHIPMENT_CD}'
                            and
                        type = 'LOCAL_COST'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    var sql3 = `
                        select
                            d.buyer_cd,
                            a.bl_no,
                            a.reg_datetime,
                            b.cd_name as type2,
                            sum(c.weight) as s_weight
                        from
                            ksv_shipment_mst a,
                            ksv_shipment_mem a1,
                            kcd_code b,
                            ksv_stock_out_mst c,
                            ksv_pu_mst2 d
                        where
                            a.shipment_cd = '${tObj.SHIPMENT_CD}'
                            and a.shipment_cd = a1.shipment_cd
                            and a.ship_mode = b.cd_code
                            and b.cd_group = 'SHIPMENT_SHIP_MODE'
                            and a1.stsout_cd = c.stsout_cd
                            and c.pu_cd = d.pu_cd
                        group by
                            d.buyer_cd,
                            a.bl_no,
                            a.reg_datetime,
                            b.cd_name
                    `;
                    var tRet3 = await prisma.$queryRaw(Prisma.raw(sql3));

                    var tIdx3 = 0;
                    for (tIdx3 = 0; tIdx3 < tRet3.length; tIdx3++) {
                        var tOne3 = { ...tRet3[tIdx3] };

                        var tWeight3 = parseFloat(tOne3.s_weight);
                        var tShipCost3 =
                            parseFloat(tInput.IMPORT_COST) *
                            (tWeight3 / tTotalWeight);

                        let tSQL99 = `
                            insert into
                                ksv_cost_mst (
                                    buyer_cd,
                                    cost_date,
                                    pu_cd,
                                    po_cd,
                                    matl_cd,
                                    shipment_cd,
                                    invoice_no,
                                    type,
                                    type2,
                                    cost_curr,
                                    cost_amt,
                                    reg_user,
                                    confirm_user,
                                    confirm_date,
                                    bl_no,
                                    ship_date
                                )
                            values
                                (
                                    '${tOne3.buyer_cd}',
                                    '${tRetDate1}',
                                    '',
                                    '',
                                    '',
                                    '${tObj.SHIPMENT_CD}',
                                    '',
                                    'LOCAL_COST',
                                    '${tOne3.type2}',
                                    '${tImportCostCurr}',
                                    '${tShipCost3}',
                                    '${tUserInfo.USER_ID}',
                                    '',
                                    '',
                                    '${tOne3.bl_no}',
                                    '${tOne3.reg_datetime.substring(0, 8)}'
                                )
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);
                    }
                }
            }

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'SUCCEED:Shipment End';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Shipment End';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },
    },
};

export default moduleMutation_S0434_5;
