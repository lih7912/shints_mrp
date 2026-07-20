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
const moduleMutation_S0438_5 = {
    Mutation: {
        mgrInsert_S0438_5: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput1 = { ...args.datas };
            var tInput2 = { ...args.datas1 };

            var tSQLArray = [];

            var tSQL = '';
            var nRet0 = [];

            if (tInput1.KIND === '제품수입') {
                var tSQL = `
                    select
                        *
                    from
                        ksv_invoice_mst
                    where
                        invoice_no = '${tInput1.INVOICE_NO}'
                `;
                var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
                var tInvoiceObj = { ...nRet0[0] };

                tSQL = `
                    select
                        a.order_cd,
                        sum(a.ship_cnt) as s_ship_cnt,
                        i.ship_price,
                        b.po_cd,
                        a.nat_cd,
                        h.nat_name,
                        c.factory_cd,
                        c.curr_cd,
                        a.ship_date,
                        a.ship_ptype,
                        a.delivery_type
                    from
                        ksv_order_ship a
                        left join ksv_po_mem b on b.order_cd = a.order_cd
                        and b.po_seq = '1'
                        left join kcd_nation h on h.nat_cd = a.nat_cd,
                        ksv_order_mst c,
                        ksv_invoice_mem i
                    where
                        a.invoice_no = '${tInput1.INVOICE_NO}'
                        and c.order_cd = a.order_cd
                        and i.order_cd = a.order_cd
                        and a.invoice_no = i.invoice_no
                    group by
                        a.order_cd,
                        i.ship_price,
                        b.po_cd,
                        a.nat_cd,
                        h.nat_name,
                        c.factory_cd,
                        c.curr_cd,
                        a.ship_date,
                        a.ship_ptype,
                        a.delivery_type
                    order by
                        a.order_cd
                `;
                nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
            }

            if (tInput1.KIND === '자재수입') {
                var tSQL = `
                    select
                        *
                    from
                        ksv_invoice_matl
                    where
                        invoice_no = '${tInput1.INVOICE_NO}'
                `;
                var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
                var tInvoiceObj = { ...nRet0[0] };
                tInvoiceObj.VAT_AMT = 0;

                tSQL = `
                    select
                        a.order_cd,
                        '0' as ship_price,
                        b.po_cd,
                        'kr' as nat_cd,
                        'Korea' as nat_name,
                        c.factory_cd,
                        c.curr_cd,
                        a.ship_date,
                        a.out_type as ship_ptype,
                        a.delivery_type,
                        sum(a.out_qty) as s_ship_cnt
                    from
                        ksv_stock_out a
                        left join ksv_po_mem b on b.order_cd = a.order_cd
                        and b.po_seq = '1'
                        left join ksv_invoice_matlmem i on a.invoice_no = i.invoice_no,
                        ksv_order_mst c
                    where
                        a.invoice_no = '${tInput1.INVOICE_NO}'
                        and c.order_cd = a.order_cd
                    group by
                        a.order_cd,
                        b.po_cd,
                        c.factory_cd,
                        c.curr_cd,
                        a.ship_date,
                        a.out_type,
                        a.delivery_type
                    order by
                        a.order_cd
                `;
                nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
            }

            if (nRet0.length <= 0) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Not Exist Invoice';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tOrdAmt = 0;
            var tIdx0 = 0;
            for (tIdx0 = 0; tIdx0 < nRet0.length; tIdx0++) {
                var col = { ...nRet0[tIdx0] };

                var tSQL100 = `
                    select
                        *
                    from
                        ksv_impcharge_mem
                    where
                        invoice_no = '${tInput1.INVOICE_NO}'
                        and order_cd = '${col.order_cd}'
                `;
                var nRet100 = await prisma.$queryRaw(Prisma.raw(tSQL100));

                var tObj = {};
                tObj.invoice_no = tInput1.INVOICE_NO;
                tObj.order_cd = col.order_cd;
                tObj.seq = tIdx0 + 1;
                tObj.ship_qty = col.s_ship_cnt;
                tObj.ship_price = col.ship_price;
                tObj.ord_price = col.ship_price;
                tObj.diff_price = '0';
                tObj.tot_amt = '0';
                tObj.po_cd = col.po_cd;
                tObj.country = col.nat_cd;
                tObj.factory_cd = col.factory_cd;
                tObj.ship_date = col.ship_date;
                tObj.ship_ptype = col.ship_ptype;
                tObj.nat_cd = col.nat_cd;
                tObj.delivery_type = col.delivery_type;
                tOrdAmt +=
                    parseFloat(tObj.ship_qty) * parseFloat(tObj.ship_price);

                let tSQL99 = AFLib.createTableSql('KSV_IMPCHARGE_MEM', tObj);
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                if (nRet100.length <= 0) tSQLArray.push(tSQL99_1);
            }

            var tSQL101 = `
                select
                    *
                from
                    ksv_impcharge_mst
                where
                    invoice_no = '${tInput1.INVOICE_NO}'
            `;
            var nRet101 = await prisma.$queryRaw(Prisma.raw(tSQL101));

            var tAmt = parseFloat(tInput2.IMPORT_FREIGHT_AMT);
            tAmt += parseFloat(tInput2.IMPORT_CLEARANCE_AMT);
            tAmt += parseFloat(tInput2.IMPORT_DUTY_AMT);
            tAmt += parseFloat(tInput2.IMPORT_HANDLING_AMT);

            var tObj = {};
            tObj.invoice_no = tInput1.INVOICE_NO;
            tObj.ship_date = tInput1.SHIP_DATE;
            tObj.delivery_type = tInput1.DELIVERY_TYPE;
            tObj.buyer_cd = tInput1.BUYER_CD;
            tObj.tot_amt = tAmt;
            tObj.ord_amt = tInput1.TOT_AMT;
            tObj.adj_amt = '0';
            if (tInput2.IMPORT_FREIGHT_AMT !== '0') {
                tObj.curr_cd = tInput2.IMPORT_FREIGHT_AMT_CURR;
            } else {
                tObj.curr_cd = tInvoiceObj.CURR_CD;
            }

            var tImportCurr = tObj.curr_cd;

            if (!tObj.curr_cd) tObj.curr_cd = 'KRW';
            tObj.remark = tInput2.REMARK;
            tObj.ext_invoice = '';
            tObj.invoice_type = '3';
            tObj.status_cd = '0';
            tObj.reg_user = tUserInfo.USER_ID;
            tObj.reg_datetime = tRetDate;
            tObj.customs = tInput2.IMPORT_DUTY_AMT;
            tObj.vat = tInvoiceObj.VAT_AMT;
            tObj.freight = tInput2.IMPORT_FREIGHT_AMT;
            tObj.clearance = tInput2.IMPORT_CLEARANCE_AMT;

            var tSQL99_1 = '';
            if (nRet101.length <= 0) {
                let tSQL99 = AFLib.createTableSql('KSV_IMPCHARGE_MST', tObj);
                tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            } else {
                /*
				Obj.invoice_no = '';
				Obj.reg_user = '';
				Obj.reg_datetime  = '';
                */
                let tSQL99 = AFLib.updateTableSql('KSV_IMPCHARGE_MST', tObj);
                tSQL99 += ` where invoice_no = '${tInput1.INVOICE_NO}' `;
                tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            }
            tSQLArray.push(tSQL99_1);

            let tSQL99 = '';
            if (tInput1.KIND === '제품수입') {
                var tImportCurr = 'KRW';
                if (parseFloat(tInput2.IMPORT_FREIGHT_AMT) > 0) {
                    if (!tInvoiceObj.IMPORT_FREIGHT_AMT_CURR)
                        tImportCurr = 'KRW';
                    else tImportCurr = tInvoiceObj.IMPORT_FREIGHT_AMT_CURR;
                }

                tSQL99 = `
             update ksv_invoice_mst  set
                license_no = '${tInput2.LICENSE_NO}',
                license_date = '${tInput2.LICENSE_DATE}',
                remark = '${tInput2.REMARK}',
                import_freight_amt = '${tInput2.IMPORT_FREIGHT_AMT}',
                ${tInput2.IMPORT_FREIGHT_AMT !== '0' ? ` import_freight_amt_curr = '${tInput2.IMPORT_FREIGHT_AMT_CURR}', ` : ''}
                import_clearance_amt = '${tInput2.IMPORT_CLEARANCE_AMT}',
                import_duty_amt = '${tInput2.IMPORT_DUTY_AMT}'
             where invoice_no = '${tInput1.INVOICE_NO}'
          `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            }

            if (tInput1.KIND === '자재수입') {
                var tImportCurr = 'KRW';
                if (parseFloat(tInput2.IMPORT_FREIGHT_AMT) > 0) {
                    if (!tInvoiceObj.IMPORT_FREIGHT_AMT_CURR)
                        tImportCurr = 'KRW';
                    else tImportCurr = tInvoiceObj.IMPORT_FREIGHT_AMT_CURR;
                }

                tSQL99 = `
             update ksv_invoice_matl  set
                license_no = '${tInput2.LICENSE_NO}',
                license_date = '${tInput2.LICENSE_DATE}',
                remark = '${tInput2.REMARK}',
                import_freight_amt = '${tInput2.IMPORT_FREIGHT_AMT}',
                ${tInput2.IMPORT_FREIGHT_AMT !== '0' ? ` import_freight_amt_curr = '${tInput2.IMPORT_FREIGHT_AMT_CURR}', ` : ''}
                import_clearance_amt = '${tInput2.IMPORT_CLEARANCE_AMT}',
                import_duty_amt = '${tInput2.IMPORT_DUTY_AMT}'
             where invoice_no = '${tInput1.INVOICE_NO}'
          `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            }

            if (parseFloat(tAmt) <= 0) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = `ERROR:Insert Import:Amt Error:${tAmt}`;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            tSQL99 = `
                delete from ksv_cost_mst
                where
                    invoice_no = '${tInput1.INVOICE_NO}'
                    and
                type = '수입등록'
                and type2 = 'Korea Import Cost'
                and buyer_cd = '${tInvoiceObj.BUYER_CD}'
                and bl_no = '${tInvoiceObj.BL_NO}'
                and ship_date = '${tInvoiceObj.SHIP_DATE}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            var tCostObj = {};
            tCostObj.buyer_cd = tInvoiceObj.BUYER_CD;
            tCostObj.cost_date = tRetDate1;
            tCostObj.pu_cd = '';
            tCostObj.po_cd = '';
            tCostObj.matl_cd = '';
            tCostObj.shipment_cd = '';
            tCostObj.invoice_no = tInvoiceObj.INVOICE_NO;
            tCostObj.type = '수입등록';
            tCostObj.type2 = 'Korea Import Cost';
            tCostObj.cost_curr = tImportCurr;
            tCostObj.cost_amt = tAmt;
            tCostObj.reg_user = tUserInfo.USER_ID;
            tCostObj.confirm_user = '';
            tCostObj.confirm_date = '';
            tCostObj.bl_no = tInvoiceObj.BL_NO;
            tCostObj.ship_date = tInvoiceObj.SHIP_DATE;
            let tSQL99 = AFLib.createTableSql('KSV_COST_MST', tCostObj);
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
                tObj.CODE = `ERROR:Insert Import Record:${e.message}`;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED: Insert Import Record ';
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },
        mgrDelete_S0438_5: async (_, args, contextValue) => {
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
            var tInput1 = { ...args.datas };
            var tInput2 = { ...args.datas1 };

            var tSQLArray = [];

            var tSQL = '';
            var nRet0 = [];

            if (tInput1.KIND === '제품수입') {
                tSQL = `
                    select
                        *
                    from
                        ksv_invoice_mst
                    where
                        invoice_no = '${tInput1.INVOICE_NO}'
                `;
                nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
            } else {
                tSQL = `
                    select
                        *
                    from
                        ksv_invoice_matl
                    where
                        invoice_no = '${tInput1.INVOICE_NO}'
                `;
                nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
            }
            if (nRet0.length <= 0) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Not Exist Invoice';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
            if (nRet0[0].DOCU_NO !== '') {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:전표처리된 invoice는 취소가 안됩니다';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tInvoiceObj = { ...nRet0[0] };

            let tSQL99 = '';
            if (tInput1.KIND === '제품수입') {
                tSQL99 = `
                    update ksv_invoice_mst
                    set
                        license_no = '',
                        license_date = '',
                        remark = '',
                        import_freight_amt = '',
                        import_clearance_amt = '',
                        import_duty_amt = ''
                    where
                        invoice_no = '${tInvoiceObj.INVOICE_NO}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            }
            if (tInput1.KIND === '자재수입') {
                tSQL99 = `
                    update ksv_invoice_matl
                    set
                        license_no = '',
                        license_date = '',
                        remark = '',
                        import_freight_amt = '',
                        import_clearance_amt = '',
                        import_duty_amt = ''
                    where
                        invoice_no = '${tInvoiceObj.INVOICE_NO}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            }

            var tAmt = parseFloat(tInput2.IMPORT_FREIGHT_AMT);
            tAmt = +parseFloat(tInput2.IMPORT_CLEARANCE_AMT);
            tAmt = +parseFloat(tInput2.IMPORT_DUTY_AMT);

            let tSQL99 = `
                delete from ksv_impcharge_mem
                where
                    invoice_no = '${tInvoiceObj.INVOICE_NO}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            let tSQL99 = `
                delete from ksv_impcharge_mst
                where
                    invoice_no = '${tInvoiceObj.INVOICE_NO}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            let tSQL99 = `
                delete from ksv_cost_mst
                where
                    invoice_no = '${tInvoiceObj.INVOICE_NO}'
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
        mgrInsert_S0438_5_INSERT_RETURN: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput1 = { ...args.datas };
            var tInput2 = { ...args.datas1 };

            var tSQLArray = [];

            var tSQL = '';
            var nRet0 = [];

            if (tInput1.KIND === '제품수입') {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:제품수입은 관세환급등록 불가.';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tSQL = `
                select
                    isnull(a.VENDOR_CD, '') as VENDOR_CD,
                    a.LICENSE_NO,
                    isnull(b.VENDOR_NAME, '') as VENDOR_NAME,
                    isnull(c.INCOME_NO, '') as INCOME_NO
                from
                    ksv_invoice_matl a
                    left join ksv_duty_mst c on a.license_no = c.income_no
                    left join kcd_vendor b on a.vendor_cd = b.vendor_cd
                where
                    a.invoice_no = '${tInput1.INVOICE_NO}'
            `;
            var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
            var tInvoiceObj = { ...nRet0[0] };
            if (tInvoiceObj.VENDOR_CD === '') {
                var sql9 = `
                    select
                        b.vendor_cd,
                        c.vendor_name
                    from
                        ksv_invoice_matl a,
                        ksv_pu_mst2 b,
                        kcd_vendor c
                    where
                        a.pu_cd = b.pu_cd
                        and b.vendor_cd = c.vendor_cd
                `;
                var nRet9 = await prisma.$queryRaw(Prisma.raw(sql9));
                if (nRet9.length > 0) {
                    tInvoiceObj.VENDOR_CD = nRet9[0].vendor_cd;
                    tInvoiceObj.VENDOR_NAME = nRet9[0].vendor_name;
                }
            }
            if (nRet0.length <= 0) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Not Exist Invoice';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
            if (tInput2.LICENSE_NO === '') {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE =
                    'ERROR:수입처리 전데이타는 관세환급 등록 불가합니다';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
            /*
      if (tInvoiceObj.INCOME_NO !== '') {
          var tRetArray = [];
          var tObj = {};
          tObj.CODE = 'ERROR:이미 관세환급 정보가 등록되었습니다';
          tObj.id = 0; 
          tRetArray.push(tObj);
          return (tRetArray);
      }
*/

            if (tInvoiceObj.INCOME_NO === '') {
                var tObj = {};
                tObj.income_no = tInput2.LICENSE_NO;
                tObj.income_date = tInput2.LICENSE_DATE;
                tObj.vendor_cd = tInvoiceObj.VENDOR_CD;
                tObj.vendor_name = tInvoiceObj.VENDOR_NAME;
                tObj.item = tInput2.DUTY_ITEM;
                tObj.duty_amt = tInput2.IMPORT_DUTY_AMT;
                tObj.end_flag = '0';
                tObj.no_ret_flag = '0';
                tObj.remark = tInput2.RETURN_REMARK;
                tObj.status_cd = '0';
                tObj.reg_user = tUserInfo.USER_ID;
                tObj.reg_datetime = tRetDate;
                let tSQL99 = AFLib.createTableSql('KSV_DUTY_MST', tObj);
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            } else {
                let tSQL99 = `
                    update ksv_duty_mst
                    set
                        remark = '${tInput2.RETURN_REMARK}',
                        item = '${tInput2.DUTY_ITEM}'
                    where
                        income_no = '${tInvoiceObj.INCOME_NO}'
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
                tObj.CODE = 'ERROR:Insert Return Tax ';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED: Insert Return Tax :';
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },

        mgrInsert_S0438_5_END_RETURN: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput1 = { ...args.datas };
            var tInput2 = { ...args.datas1 };

            var tSQLArray = [];

            var tSQL = '';
            var nRet0 = [];

            if (tInput1.KIND === '제품수입') {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:제품수입은 관세환급등록 불가.';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tSQL = `
                select
                    a.VENDOR_CD,
                    a.LICENSE_NO,
                    isnull(c.INCOME_NO, '') as INCOME_NO,
                    isnull(c.END_FLAG, '') as END_FLAG
                from
                    ksv_invoice_matl a
                    left join ksv_duty_mst c on a.license_no = c.income_no
                where
                    a.invoice_no = '${tInput1.INVOICE_NO}'
            `;
            var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
            var tInvoiceObj = { ...nRet0[0] };

            if (nRet0.length <= 0) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Not Exist Invoice';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
            if (tInvoiceObj.END_FLAG === '1') {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:이미 End 처리된 데이타입니다';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
            if (tInput2.LICENSE_NO === '') {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE =
                    'ERROR:수입처리 전데이타는 관세환급 등록 불가합니다';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
            if (tInvoiceObj.INCOME_NO === '') {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:등록된 관세환급 정보가 없습니다';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var sql1 = `
                select
                    isnull(sum(return_amt), 0) as s_return_amt
                from
                    ksv_duty_mem
                where
                    income_no = '${tInvoiceObj.INCOME_NO}'
            `;
            var nRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
            var tReturnAmt = 0;
            if (nRet1.length > 0)
                tReturnAmt = parseFloat(nRet1[0].s_return_amt);

            let tSQL99 = `
                update ksv_duty_mst
                set
                    end_flag = '1',
                    return_amt = '${tReturnAmt}',
                    remark = '${tInput2.RETURN_REMARK}',
                    item = '${tInput2.DUTY_ITEM}'
                where
                    income_no = '${tInvoiceObj.INCOME_NO}'
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
                tObj.CODE = 'ERROR:End Return Tax';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED:End Return Tax';
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },

        mgrInsert_S0438_5_INSERT_EXPORT: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput1 = { ...args.datas };
            var tInput2 = { ...args.datas1 };

            var tSQLArray = [];

            var tSQL = '';
            var nRet0 = [];

            if (tInput1.KIND === '제품수입') {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:제품수입은 관세환급등록 불가.';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tSQL = `
                select
                    a.VENDOR_CD,
                    a.LICENSE_NO,
                    isnull(c.INCOME_NO, '') as INCOME_NO,
                    isnull(c.END_FLAG, '') as END_FLAG
                from
                    ksv_invoice_matl a
                    left join ksv_duty_mst c on a.license_no = c.income_no
                where
                    a.invoice_no = '${tInput1.INVOICE_NO}'
            `;
            var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
            var tInvoiceObj = { ...nRet0[0] };

            if (nRet0.length <= 0) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Not Exist Invoice';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
            if (tInvoiceObj.END_FLAG === '1') {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:이미 End 처리된 데이타입니다';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
            if (tInput2.LICENSE_NO === '') {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE =
                    'ERROR:수입처리 전데이타는 관세환급 등록 불가합니다';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
            if (tInput2.INCOME_NO === '') {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:등록된 관세환급 정보가 없습니다';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tObj = {};
            tObj.income_no = tInvoiceObj.INCOME_NO;
            tObj.export_date = tInput2.EXPORT_DATE;
            tObj.export_no = tInput2.EXPORT_NO;
            tObj.return_date = '';
            tObj.return_amt = '';
            tObj.status_cd = '0';
            tObj.reg_user = tUserInfo.USER_ID;
            tObj.reg_datetime = tRetDate;
            let tSQL99 = AFLib.createTableSql('KSV_DUTY_MEM', tObj);
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
                tObj.CODE = 'ERROR:End Return Tax';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED:End Return Tax';
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },

        mgrInsert_S0438_5_PROCESS_RETURN: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput1 = { ...args.datas };
            var tInput2 = { ...args.datas1 };

            var tSQLArray = [];

            var tSQL = '';
            var nRet0 = [];

            if (tInput1.KIND === '제품수입') {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:제품수입은 관세환급등록 불가.';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tSQL = `
                select
                    a.VENDOR_CD,
                    a.LICENSE_NO,
                    isnull(c.INCOME_NO, '') as INCOME_NO,
                    isnull(c.END_FLAG, '') as END_FLAG
                from
                    ksv_invoice_matl a
                    left join ksv_duty_mst c on a.license_no = c.income_no
                where
                    a.invoice_no = '${tInput1.INVOICE_NO}'
            `;
            var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
            var tInvoiceObj = { ...nRet0[0] };

            if (nRet0.length <= 0) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Not Exist Invoice';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
            if (tInvoiceObj.END_FLAG === '1') {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:이미 End 처리된 데이타입니다';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
            if (tInput2.LICENSE_NO === '') {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE =
                    'ERROR:수입처리 전데이타는 관세환급 등록 불가합니다';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
            if (tInput2.INCOME_NO === '') {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:등록된 관세환급 정보가 없습니다';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            let tSQL99 = `
                update ksv_duty_mem
                set
                    return_date = '${tInput2.RETURN_DATE}',
                    return_amt = '${tInput2.RETURN_AMT}'
                where
                    income_no = '${tInvoiceObj.LICENSE_NO}'
                    and export_date = '${tInput2.EXPORT_DATE}'
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
                tObj.CODE = 'ERROR:End Return Tax';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED:End Return Tax';
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },
    },
};

export default moduleMutation_S0438_5;
