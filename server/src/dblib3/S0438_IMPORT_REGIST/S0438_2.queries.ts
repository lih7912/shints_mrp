import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0438_2 = {
    Query: {
        mgrQueryS0438_2: async (_, args) => {
            var tRetDate = AFLib.getCurrTime();

            var tSQL = '';
            var tSQL1 = '';

            var sDate = '';
            var eDate = '';
            var tFlag = 0;

            var tInput = { ...args.data };

            var tKeys = Object.keys(tInput);
            var tIdx3 = 0;
            for (tIdx3 = 0; tIdx3 < tKeys.length; tIdx3++) {
                var tKey = tKeys[tIdx3];
                var tValue = tInput[`${tKey}`];
                if (tValue === ' ') {
                    tInput[`${tKey}`] = '';
                    tValue = '';
                }
                if (tValue !== '' && tValue !== ' ') tFlag = 1;
            }

            sDate = tInput.S_SHIP_DATE;
            if (sDate === '') sDate = `${tRetDate.substring(0, 6)}01`;
            eDate = tInput.E_SHIP_DATE;
            if (eDate === '') eDate = `99999999`;
            tSQL = ` and a.ship_date between '${sDate}' and '${eDate}'  `;
            tSQL1 = ` and ship_date between '${sDate}' and '${eDate}'  `;

            /*
       if (tFlag === 1) {
           sDate = tInput.S_SHIP_DATE;
           eDate = tInput.E_SHIP_DATE;
           if (sDate !== '') {
              tSQL = ` and a.ship_date between '${sDate}' and '${eDate}'  `;
              tSQL1 = ` and ship_date between '${sDate}' and '${eDate}'  `;
           }
           else tSQL = '';
       } else {
           var tYear = parseInt(tRetDate.substring(0, 4))-1;
           var tMon = tRetDate.substring(4, 6);

           sDate = tYear + '01' + '01';
           eDate = tRetDate.substring(0, 6) + '31';
           tSQL = ` and a.ship_date between '${sDate}' and '${eDate}'  `;
           tSQL1 = ` and ship_date between '${sDate}' and '${eDate}'  `;
       }
       */

            if (args.data.STATUS_CD !== '') {
                if (args.data.STATUS_CD === 'Ship') {
                    tSQL += ` and (a.license_date is null or a.license_date = '') `;
                    tSQL += ` and (a.license_no is null or a.license_no = '') `;
                    tSQL += ` and (a.docu_no is null or a.docu_no = '') `;
                    tSQL += ` and (a.cost_confirm_user is null or a.cost_confirm_user = '') `;
                }
                if (args.data.STATUS_CD === 'Import') {
                    tSQL += ` and ((a.license_date is not null and a.license_date <> '') `;
                    tSQL += ` or   (a.license_no is not null and a.license_no <> '')) `;
                    tSQL += ` and (a.docu_no is null or a.docu_no = '') `;
                    tSQL += ` and (a.cost_confirm_user is null or a.cost_confirm_user = '') `;
                }
                if (args.data.STATUS_CD === 'End') {
                    tSQL += ` and ((a.docu_no is not null and a.docu_no <> '') `;
                    tSQL += ` or   (a.cost_confirm_user is not null and a.cost_confirm_user <> '')) `;
                }
            }

            let sqlStr = `
                select
                    '제품수입' as KIND,
                    '' as STATUS_CD,
                    a.INVOICE_NO,
                    a.BUYER_CD,
                    a.SHIP_DATE,
                    b.NAT_CD as NAT_CD,
                    d.NAT_NAME as NAT_NAME,
                    a.DELIVERY_TYPE,
                    a1.CD_NAME as DELIVERY_TYPE_N,
                    b.S_SHIP_CNT as QTY,
                    a.TOT_AMT as TOT_AMT,
                    a.ORD_AMT as ORD_AMT,
                    -- a.CURR_CD as CURR_CD,
                    isnull(c.CURR_CD, '') as CURR_CD,
                    a2.BUYER_NAME,
                    isnull(a.DOCU_NO, '') as DOCU_NO,
                    isnull(a.LICENSE_NO, '') as LICENSE_NO,
                    isnull(a.LICENSE_DATE, '') as LICENSE_DATE,
                    isnull(a.COST_CONFIRM_USER, '') as CONFIRM_USER,
                    isnull(a.REMARK, '') as REMARK,
                    isnull(a.IMPORT_FREIGHT_AMT, '0') as IMPORT_FREIGHT_AMT1,
                    isnull(a.IMPORT_CLEARANCE_AMT, '0') as IMPORT_CLEARANCE_AMT1,
                    isnull(a.IMPORT_DUTY_AMT, '0') as IMPORT_DUTY_AMT1,
                    '0' as IMPORT_HANDLING_AMT,
                    isnull(c.freight, '0') as IMPORT_FREIGHT_AMT2,
                    isnull(c.clearance, '0') as IMPORT_CLEARANCE_AMT2,
                    isnull(c.customs, '0') as IMPORT_DUTY_AMT2,
                    isnull(c.vat, '0') as IMPORT_VAT,
                    isnull(c.ord_amt, '0') as IMP_ORD_AMT,
                    isnull(c.tot_amt, '0') as IMP_TOT_AMT,
                    isnull(c.invoice_no, '') as IMP_INVOICE_NO,
                    '' as DUTY_ITEM,
                    '' as RETURN_REMARK,
                    b.SHIP_PRICE,
                    '0' as IMPORT_FREIGHT_AMT,
                    '0' as IMPORT_CLEARANCE_AMT,
                    '0' as IMPORT_DUTY_AMT,
                    a3.FACTORY_NAME
                from
                    ksv_invoice_mst a
                    -- left join kcd_code a1 on a1.CD_CODE = a.DELIVERY_TYPE and a1.cd_group = 'SHIPMENT_SHIP_MODE'
                    left join kcd_code a1 on a1.CD_CODE = a.DELIVERY_TYPE
                    and a1.cd_group = 'DELIVERY_TYPE'
                    left join kcd_buyer a2 on a2.BUYER_CD = a.BUYER_CD
                    left join KCD_FACTORY a3 on a.FACTORY_CD = a3.FACTORY_CD
                    left join ksv_impcharge_mst c on c.INVOICE_NO = a.invoice_no
                    and c.BUYER_CD = a.buyer_cd,
                    (
                        select
                            INVOICE_NO,
                            NAT_CD,
                            max(ship_price) as SHIP_PRICE,
                            sum(ship_cnt) as S_SHIP_CNT
                        from
                            ksv_order_ship
                        where
                            nat_cd in ('kr', 'ks', 'ko')
                            -- where nat_cd in ('ks')
                            and invoice_no like '%${args.data.INVOICE_NO}%'
                            and left(order_cd, 2) like '%${args.data.BUYER_CD}%' ${tSQL1}
                        group by
                            INVOICE_NO,
                            NAT_CD
                    ) b,
                    kcd_nation d
                where
                    a.invoice_no like '%${args.data.INVOICE_NO}%'
                    and a.license_no like '%${args.data.LICENSE_NO}%'
                    and a.buyer_cd like '%${args.data.BUYER_CD}%'
                    and a.invoice_no = b.invoice_no
                    and b.nat_cd = d.nat_cd
                    and a.delivery_type <> '6'
                    and a.delivery_type <> '7' ${tSQL}
                order by
                    a.SHIP_DATE desc
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {};
            var tRetArray = [];
            tRet.forEach((col, i) => {
                var tObj = { ...col };
                if (tObj.CONFIRM_USER !== '' || tObj.DOCU_NO !== '') {
                    tObj.STATUS_CD = 'End';
                } else if (tObj.LICENSE_DATE !== '' || tObj.LICENSE_NO !== '') {
                    tObj.STATUS_CD = 'Import';
                } else {
                    tObj.STATUS_CD = 'Ship';
                }

                if (tObj.IMP_INVOICE_NO !== '') {
                    tObj.IMPORT_FREIGHT_AMT = tObj.IMPORT_FREIGHT_AMT2;
                    tObj.IMPORT_CLEARANCE_AMT = tObj.IMPORT_CLEARANCE_AMT2;
                    tObj.IMPORT_DUTY_AMT = tObj.IMPORT_DUTY_AMT2;
                } else {
                    tObj.IMPORT_FREIGHT_AMT = tObj.IMPORT_FREIGHT_AMT1;
                    tObj.IMPORT_CLEARANCE_AMT = tObj.IMPORT_CLEARANCE_AMT1;
                    tObj.IMPORT_DUTY_AMT = tObj.IMPORT_DUTY_AMT1;
                }

                /*
					 if (parseFloat(tObj.IMPORT_FREIGHT_AMT1) > 0) tObj.IMPORT_FREIGHT_AMT = tObj.IMPORT_FREIGHT_AMT1; 
					 else if (parseFloat(tObj.IMPORT_FREIGHT_AMT2) > 0) tObj.IMPORT_FREIGHT_AMT = tObj.IMPORT_FREIGHT_AMT2; 

					 if (parseFloat(tObj.IMPORT_CLEARANCE_AMT1) > 0) tObj.IMPORT_CLEARANCE_AMT = tObj.IMPORT_CLEARANCE_AMT1; 
					 else if (parseFloat(tObj.IMPORT_CLEARANCE_AMT2) > 0) tObj.IMPORT_CLEARANCE_AMT = tObj.IMPORT_CLEARANCE_AMT2; 

					 if (parseFloat(tObj.IMPORT_DUTY_AMT1) > 0) tObj.IMPORT_DUTY_AMT = tObj.IMPORT_DUTY_AMT1; 
					 else if (parseFloat(tObj.IMPORT_DUTY_AMT2) > 0) tObj.IMPORT_DUTY_AMT = tObj.IMPORT_DUTY_AMT2; 
           */

                tRetArray.push(tObj);
            });

            // 자재수입
            var tSQL2 = '';
            if (tFlag === 1) {
                sDate = tInput.S_SHIP_DATE;
                eDate = tInput.E_SHIP_DATE;
                if (sDate !== '') {
                    tSQL2 = ` and a.out_date between '${sDate}' and '${eDate}'  `;
                } else tSQL2 = '';
            } else {
                var tYear = parseInt(tRetDate.substring(0, 4)) - 1;
                var tMon = tRetDate.substring(4, 6);

                sDate = tYear + '01' + '01';
                eDate = tRetDate.substring(0, 6) + '31';
                tSQL2 = ` and a.out_date between '${sDate}' and '${eDate}'  `;
            }

            let sqlStr1 = `
                select
                    '자재수입' as KIND,
                    'Ship' as STATUS_CD,
                    a.INVOICE_NO,
                    a.PACK_CD,
                    a.BUYER_CD,
                    a.OUT_DATE as SHIP_DATE,
                    'kr' as NAT_CD,
                    '' as DELIVERY_TYPE,
                    '' as DELIVERY_TYPE_N,
                    '' as QTY,
                    '' as TOT_AMT,
                    '' as ORD_AMT,
                    a.CURR_CD as CURR_CD,
                    a2.BUYER_NAME,
                    '0' as SHIP_PRICE,
                    isnull(a.LICENSE_NO, '') as LICENSE_NO,
                    isnull(a.LICENSE_DATE, '') as LICENSE_DATE,
                    isnull(a.COST_CONFIRM_USER, '') as CONFIRM_USER,
                    isnull(a.REMARK, '') as REMARK,
                    isnull(a.IMPORT_FREIGHT_AMT, '') as IMPORT_FREIGHT_AMT1,
                    isnull(a.IMPORT_CLEARANCE_AMT, '') as IMPORT_CLEARANCE_AMT1,
                    isnull(a.IMPORT_DUTY_AMT, '') as IMPORT_DUTY_AMT1,
                    isnull(c.freight, '') as IMPORT_FREIGHT_AMT2,
                    isnull(c.clearance, '') as IMPORT_CLEARANCE_AMT2,
                    isnull(c.customs, '') as IMPORT_DUTY_AMT2,
                    isnull(c.vat, '') as IMPORT_VAT,
                    isnull(c.ord_amt, '0') as IMP_ORD_AMT,
                    isnull(c.tot_amt, '0') as IMP_TOT_AMT,
                    isnull(c.invoice_no, '') as IMP_INVOICE_NO,
                    isnull(a4.ITEM, '') as DUTY_ITEM,
                    isnull(a4.REMARK, '') as RETURN_REMARK,
                    '0' as IMPORT_FREIGHT_AMT,
                    '0' as IMPORT_CLEARANCE_AMT,
                    '0' as IMPORT_DUTY_AMT,
                    a3.FACTORY_NAME
                from
                    ksv_invoice_matl a
                    left join kcd_buyer a2 on a2.BUYER_CD = a.BUYER_CD
                    left join KCD_FACTORY a3 on a.FACTORY_CD = a3.FACTORY_CD
                    left join ksv_duty_mst a4 on a.LICENSE_NO = a4.INCOME_NO
                    left join ksv_impcharge_mst c on c.INVOICE_NO = a.invoice_no
                    and c.BUYER_CD = a.buyer_cd,
                    ksv_pu_mst2 b
                where
                    a.invoice_no like '%${args.data.INVOICE_NO}%'
                    and left(a.invoice_no, 3) = 'OTS'
                    and a.license_no like '%${args.data.LICENSE_NO}%'
                    and a.pu_cd = b.pu_cd
                    and b.buyer_cd like '%${args.data.BUYER_CD}%' ${tSQL2}
                order by
                    a.OUT_DATE desc
            `;
            var tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));
            var tIdx1 = 0;
            for (tIdx1 = 0; tIdx1 < tRet1.length; tIdx1++) {
                var tObj = { ...tRet1[tIdx1] };

                if (tObj.LICENSE_DATE !== '') {
                    tObj.STATUS_CD = 'Import';
                } else if (tObj.CONFIRM_USER !== '') {
                    tObj.STATUS_CD = 'End';
                } else {
                    tObj.STATUS_CD = 'Ship';
                }

                let sql10 = `
                    select
                        INVOICE_NO,
                        SUM(DELIVERY_AMT) as S_DELIVERY_AMT
                    from
                        ksv_invoice_matlmem
                    where
                        invoice_no = '${tObj.INVOICE_NO}'
                    group by
                        INVOICE_NO
                `;
                var tRet10 = await prisma.$queryRaw(Prisma.raw(sql10));
                if (tRet10.length > 0) {
                    tObj.AMT = tRet10[0].S_DELIVERY_AMT;
                }

                let sql11 = `
                    select
                        k1.PACK_CD,
                        k1.DELIVERY_TYPE,
                        isnull(k2.CD_NAME, '') as DELIVERY_TYPE_N,
                        SUM(OUT_QTY) as S_OUT_QTY
                    from
                        ksv_stock_out k1
                        left join kcd_code k2 on k2.cd_code = k1.DELIVERY_TYPE
                        and k2.cd_group = 'SHIPMENT_SHIP_MODE'
                    where
                        k1.pack_cd = '${tObj.PACK_CD}'
                    group by
                        k1.PACK_CD,
                        k1.DELIVERY_TYPE,
                        k2.CD_NAME
                `;
                var tRet11 = await prisma.$queryRaw(Prisma.raw(sql11));
                if (tRet11.length > 0) {
                    tObj.QTY = tRet11[0].S_OUT_QTY;
                    tObj.DELIVERY_TYPE = tRet11[0].DELIVERY_TYPE;
                    tObj.DELIVERY_TYPE_N = tRet11[0].DELIVERY_TYPE_N;
                }

                var tPrice = 0;
                tPrice = parseFloat(tObj.AMT) / parseFloat(tObj.QTY);
                tObj.SHIP_PRICE = String(tPrice);

                if (tObj.IMP_INVOICE_NO !== '') {
                    tObj.IMPORT_FREIGHT_AMT = tObj.IMPORT_FREIGHT_AMT2;
                    tObj.IMPORT_CLEARANCE_AMT = tObj.IMPORT_CLEARANCE_AMT2;
                    tObj.IMPORT_DUTY_AMT = tObj.IMPORT_DUTY_AMT2;
                } else {
                    tObj.IMPORT_FREIGHT_AMT = tObj.IMPORT_FREIGHT_AMT1;
                    tObj.IMPORT_CLEARANCE_AMT = tObj.IMPORT_CLEARANCE_AMT1;
                    tObj.IMPORT_DUTY_AMT = tObj.IMPORT_DUTY_AMT1;
                }

                /*
					 if (parseFloat(tObj.IMPORT_FREIGHT_AMT1) > 0) tObj.IMPORT_FREIGHT_AMT = tObj.IMPORT_FREIGHT_AMT1; 
					 else if (parseFloat(tObj.IMPORT_FREIGHT_AMT2) > 0) tObj.IMPORT_FREIGHT_AMT = tObj.IMPORT_FREIGHT_AMT2; 

					 if (parseFloat(tObj.IMPORT_CLEARANCE_AMT1) > 0) tObj.IMPORT_CLEARANCE_AMT = tObj.IMPORT_CLEARANCE_AMT1; 
					 else if (parseFloat(tObj.IMPORT_CLEARANCE_AMT2) > 0) tObj.IMPORT_CLEARANCE_AMT = tObj.IMPORT_CLEARANCE_AMT2; 

					 if (parseFloat(tObj.IMPORT_DUTY_AMT1) > 0) tObj.IMPORT_DUTY_AMT = tObj.IMPORT_DUTY_AMT1; 
					 else if (parseFloat(tObj.IMPORT_DUTY_AMT2) > 0) tObj.IMPORT_DUTY_AMT = tObj.IMPORT_DUTY_AMT2; 
           */

                tRetArray.push(tObj);
            }

            return tRetArray;
        },

        mgrQueryS0438_2_DUTY_MST: async (_, args) => {
            let sqlStr1 = `
                select
                    a.INCOME_NO,
                    a.END_FLAG,
                    a.RETURN_AMT as S_RETURN_AMT,
                    b.EXPORT_DATE,
                    b.EXPORT_NO,
                    b.RETURN_DATE,
                    b.RETURN_AMT
                from
                    ksv_duty_mst a,
                    ksv_duty_mem b
                where
                    a.income_no = '${args.data.INCOME_NO}'
                    and a.income_no = b.income_no
            `;
            var tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));
            var tArray = [];
            if (tRet1.length > 0) tArray = [...tRet1];
            else {
                var tObj = {};
                tObj.END_FLAG = '';
                tObj.S_RETURN_AMT = '0';
                tArray.push(tObj);
            }
            return tArray;
        },
    },
};

export default moduleQuery_S0438_2;
