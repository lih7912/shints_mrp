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
const moduleMutation_S0512_5 = {
    Mutation: {
        mgrInsert_S0512_5: async (_, args, contextValue) => {
            // Update Location
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
            var tInput0 = { ...args.datas[0] };

            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var tSQLArray = [];

                var tInput = { ...args.datas[tIdx] };

                let sql0 = `
                    select
                        fac,
                        idx
                    from
                        ksv_stock_idx
                `;
                var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                var tFAC = nRet0[0].fac;
                var tIDX = nRet0[0].idx + 1;
                var tZero = '000000000';

                var tNewStockIdx = tFAC;
                tNewStockIdx +=
                    tZero.substring(0, 9 - String(tIDX).length) + String(tIDX);

                let tSQL99 = `
                    update ksv_stock_idx
                    set
                        idx = idx + 1
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                var m_OrderCd = tInput.ORDER_CD;
                if (tInput.BUYER_CD !== '')
                    m_OrderCd = tInput.BUYER_CD + '00-00000';

                var m_NewSeq = '1';
                if (tInput.PO_CD === '0000-0000') {
                    let sql0 = `
                        select
                            isnull(max(po_seq), 0) as po_seq
                        from
                            ksv_stock_mst
                        where
                            po_cd = '${tInput.PO_CD}'
                    `;
                    var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                    m_NewSeq = nRet0[0].po_seq + 1;
                }

                var m_NewStatus = tInput.STOCK_STATUS;

                if (tInput.STOCK_IDX === '') {
                    let tSQL99 = `
                        insert into
                            ksv_stock_matl (
                                stock_idx,
                                po_cd,
                                po_seq,
                                order_cd,
                                matl_cd,
                                mrp_seq,
                                matl_seq,
                                stock_qty,
                                remain_qty,
                                rack,
                                location,
                                use_qty,
                                factory_cd,
                                stock_status,
                                stock_date,
                                status_cd,
                                reg_user,
                                reg_datetime,
                                remark,
                                remark0,
                                root_idx,
                                reason_remark
                            )
                        values
                            (
                                '${tNewStockIdx}',
                                '${tInput.PO_CD}',
                                '${m_NewSeq}',
                                '${m_OrderCd}',
                                '${tInput.MATL_CD}',
                                '${tInput.MRP_SEQ}',
                                '${tInput.MATL_SEQ}',
                                '${tInput.STOCK_QTY}',
                                '${tInput.STOCK_QTY}',
                                '${tInput.RACK}',
                                '${tInput.LOCATION}',
                                '0',
                                '${tInput.FACTORY_CD}',
                                '${m_NewStatus}',
                                '${tRetDate1}',
                                '0',
                                '${tInput.USER_ID}',
                                '${tRetDate}',
                                '${tInput.REMARK}',
                                '${tInput.REMARK}',
                                '${tNewStockIdx}',
                                '${tInput.REASON_REMARK}'
                            )
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                } else {
                    if (tInput.STOCK_STATUS === 'N') m_NewStatus = 'M';
                    else m_NewStatus = 'S';

                    let tSQL99 = `
                        update ksv_stock_matl
                        set
                            stock_qty = stock_qty - ${tInput.STOCK_QTY},
                            remain_qty = remain_qty - ${tInput.STOCK_QTY}
                        where
                            stock_idx = '${tInput.STOCK_IDX}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
                        insert into
                            ksv_stock_matl (
                                stock_idx,
                                po_cd,
                                po_seq,
                                order_cd,
                                matl_cd,
                                mrp_seq,
                                matl_seq,
                                stock_qty,
                                remain_qty,
                                use_qty,
                                out_qty,
                                factory_cd,
                                stock_status,
                                stock_date,
                                rack,
                                location,
                                status_cd,
                                reg_user,
                                reg_datetime,
                                remark,
                                remark0,
                                org_stock_idx,
                                debit_cd,
                                root_idx
                            )
                        select
                            '${tNewStockIdx}',
                            po_cd,
                            po_seq,
                            order_cd,
                            matl_cd,
                            mrp_seq,
                            matl_seq,
                            '${tInput.STOCK_QTY}',
                            '${tInput.STOCK_QTY}',
                            '0',
                            '0',
                            factory_cd,
                            '${m_NewStatus}',
                            stock_date,
                            rack,
                            location,
                            status_cd,
                            '${tInput.USER_ID}',
                            '${tRetDate1}',
                            remark,
                            remark0,
                            stock_idx,
                            debit_cd,
                            '${tInput.ROOT_IDX}'
                        from
                            ksv_stock_matl
                        where
                            stock_idx = '${tInput.STOCK_IDX}'
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
                    tObj.CODE = 'ERROR:Insert Fac Out';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED: Insert Fac Out :' + args.datas.length;
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },

        mgrInsert_S0512_5_1: async (_, args, contextValue) => {
            // End Proc
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
            var tInput = { ...args.datas[0] };
            var tSQLArray = [];

            var tCheckVendorGW = 0;
            var tCheckPayReport = 0;
            var tCheckCalc = 0;
            var tCheckGW = 0;
            var tCheckBillDate = 0;

            /*
      var tIdx = 0;
      for (tIdx = 0; tIdx < args.datas.length; tIdx ++) {
          var tOne = { ...args.datas[tIdx] };
          if (tOne.CALC_FLAG === '1') tCheckCalc += 1;
          if (tOne.GW_STATUS === '1' || tOne.GW_STATUS === '2') tCheckGW += 1; 
          if (tOne.TOT_AMOUNT <= 0 && tOne.PAY_REPORT === '') tCheckPayReport += 1;
          if (tOne.VENDOR_TYPE === '1' && tOne.PUR_APP === 'X' && 
              tOne.TT_FLAG === '0' && tOne.TAXBILL_DATE === '') tCheckBillDate += 1;
          
          let sql0 = `
              select
                  GW
              from
                  KCD_VENDOR
              where
                  VENDOR_CD = '${tOne.VENDOR_CD}'
          `; 
          var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
          if (nRet0[0].GW != '2') tCheckVendorGW += 1;
      }

      var tCheckVendorGW = 0;
      var tCheckPayReport = 0;
      var tCheckCalc = 0;
      var tCheckGW = 0;
      var tCheckBillDate = 0;

      var tErrorStr = '';
      if (tCheckVendorGW > 0) {
          tErrorStr = '상태가 종결인 Supplier만 Taxbill Ok 가능합니다.';
      }
      else if (tCheckPayReport > 0) {
          tErrorStr = 'Deposit, LC report를 만든 후에 진행 해주세요..';
      }
      else if (tCheckCalc > 0) {
          tErrorStr = 'Taxbill OK 된 문서입니다..';
      }
      else if (tCheckGW > 0) {
          tErrorStr = '그룹웨어 상신 중인 문서는 작업이 불가 합니다..';
      }
      else if (tCheckBillDate > 0) {
          tErrorStr = 'TaxBill Date를 확인해 주시기 바랍니다.';
      }
      if (tErrorStr !== '') {
          var tRetArray = [];
          var tObj = {};
          tObj.CODE = 'ERROR:MATL Endding Error';
          tObj.id = 0; 
          tRetArray.push(tObj);
          return (tRetArray);
      }
*/

            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var tOne = { ...args.datas[tIdx] };

                let tSQL99 = `
                    delete from KCD_GW_TAXBILL_KR
                    where
                        TAXBILL_CD = '${tOne.TAXBILL_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    update ksv_stock_in
                    set
                        calc_flag = '0',
                        tax = '0'
                    from
                        ksv_stock_in a,
                        kcd_vendor b,
                        kcd_matl_mst c
                    where
                        a.matl_cd = c.matl_cd
                        and c.vendor_cd = b.vendor_cd
                        and a.end_date = '${tOne.END_DATE}'
                        and b.vendor_cd = '${tOne.VENDOR_CD}'
                        and a.pay_curr_cd = '${tOne.PAY_CURR_CD}'
                        and a.calc_flag = '${tOne.CALC_FLAG2}'
                        and a.pur_app = '${tOne.PUR_APP2}'
                        and a.tt_flag = '${tOne.TT_FLAG2}'
                        and a.pay_report = '${tOne.PAY_REPORT}'
                        and a.pay_date = '${tOne.PAY_DATE}'
                        and a.pur_factory = '${tOne.PUR_FACTORY_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    update ksv_dc_amount
                    set
                        calc_flag = '0'
                    where
                        end_date = '${tOne.END_DATE}'
                        and vendor_cd = '${tOne.VENDOR_CD}'
                        and curr_cd = '${tOne.PAY_CURR_CD}'
                        and calc_flag = '${tOne.CALC_FLAG2}'
                        and tt_flag = '${tOne.TT_FLAG2}'
                        and pur_factory = '${tOne.PUR_FACTORY_CD}'
                        and pay_report = '${tOne.PAY_REPORT}'
                        and pay_date = '${tOne.PAY_DATE}'
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
                tObj.CODE = 'ERROR:Cancel TaxBill Error';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED:Cancel TaxBill :' + args.datas.length;
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },
    },
};

export default moduleMutation_S0512_5;
