import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S080101_2 = {
    Query: {
        mgrQueryS080101_2: async (_, args) => {
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

            var tSQL = '';

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
            if (tInput.S_SHIP_DATE === '')
                sDate = `${tRetDate.substring(0, 4)}0101`;
            eDate = tInput.E_SHIP_DATE;
            if (tInput.E_SHIP_DATE === '') eDate = `99999999`;
            tSQL = `and A.SHIP_DATE  between '${sDate}' and '${eDate}' `;

            let sqlStr = `
                SELECT
                    A1.*,
                    A2.BUYER_NAME,
                    A2.EMAIL AS BUYER_EMAIL,
                    A3.CD_NAME as SHIP_MODE_N,
                    A4.CD_NAME as DELIVERY_TYPE_N,
                    '' AS BL_FILE,
                    '' AS PL_FILE,
                    '' AS DEBIT_FILE,
                    A2.NAT_CD as BUYER_NAT_CD,
                    isnull(A5.COST_CONFIRM_USER, '') as COST_CONFIRM_USER,
                    isnull(A5.LICENSE_NO, '') as LICENSE_NO,
                    isnull(A5.LICENSE_DATE, '') as LICENSE_DATE,
                    isnull(A5.IMPORT_FREIGHT_AMT, '') as IMPORT_FREIGHT_AMT,
                    isnull(A5.IMPORT_CLEARANCE_AMT, '') as IMPORT_CLEARANCE_AMT,
                    isnull(A5.IMPORT_DUTY_AMT, '') as IMPORT_DUTY_AMT,
                    isnull(A5.REMARK, '') as REMARK,
                    isnull(A5.CURR_CD, '') as INVOICE_CURR_CD,
                    (A1.SHIP_QTY - isnull(A6.s_pay_qty, 0)) as BAL_QTY,
                    '0' as SELL_QTY
                FROM
                    (
                        SELECT
                            A.INVOICE_NO,
                            LEFT(A.ORDER_CD, 2) as BUYER_CD,
                            A.ORDER_CD,
                            C.AVR_PRICE,
                            C.CURR_CD,
                            D.STYLE_NAME,
                            D2.PO_CD,
                            A.SHIP_DATE,
                            C.DUE_DATE,
                            A.NAT_CD,
                            A.SHIP_PTYPE,
                            A.DELIVERY_TYPE,
                            C.FACTORY_CD,
                            C.TOT_CNT as ORDER_QTY,
                            A.SHIP_PRICE,
                            --A.SALES_PRICE,
                            C.AVR_PRICE AS SALES_PRICE,
                            A.ORD_PRICE,
                            isnull(A.SHIP_QTY, 0) as SHIP_QTY,
                            ---isnull(A.SALES_PRICE * A.SHIP_QTY, 0) as SHIP_AMOUNT,
                            isnull(C.AVR_PRICE * A.SHIP_QTY, 0) as SHIP_AMOUNT,
                            isnull(A.SHIP_PRICE * A.SHIP_QTY, 0) as INVOICE_SHIP_AMOUNT
                        FROM
                            KSV_INVOICE_MEM A,
                            KCD_BUYER B,
                            KSV_ORDER_MST C,
                            KCD_STYLE D,
                            KSV_PO_MEM D2
                        where
                            A.ORDER_CD LIKE '%${args.data.ORDER_CD}%'
                            AND LEFT(A.ORDER_CD, 2) = B.BUYER_CD
                            AND (B.BUYER_CD LIKE '%${args.data.BUYER_CD}%')
                            AND A.ORDER_CD = C.ORDER_CD
                            AND (
                                A.NAT_CD in ('kr', 'ko', 'ks')
                                or (
                                    A.NAT_CD not in ('kr', 'ko', 'ks')
                                    and B.NAT_CD in ('kr', 'ko', 'ks')
                                )
                            )
                            AND C.STYLE_CD = D.STYLE_CD
                            AND D2.PO_CD like '%${args.data.PO_CD}%'
                            AND C.ORDER_CD = D2.ORDER_CD
                            AND D2.PO_SEQ = 1 ${tSQL}
                    ) A1
                    left join kcd_code A3 on A1.SHIP_PTYPE = A3.CD_CODE
                    and A3.CD_GROUP = 'SHIP_PTYPE'
                    left join kcd_code A4 on A1.delivery_type = A4.CD_CODE
                    and A4.CD_GROUP = 'DELIVERY_TYPE'
                    left join (
                        select
                            invoice_no,
                            order_cd,
                            sum(pay_qty) as s_pay_qty
                        from
                            ksv_tax_mem
                        group by
                            invoice_no,
                            order_cd
                    ) A6 on A6.invoice_no = A1.invoice_no
                    and A6.order_cd = A1.order_cd,
                    KCD_BUYER A2,
                    KSV_INVOICE_MST A5
                where
                    A1.BUYER_CD = A2.BUYER_CD
                    and (A1.SHIP_AMOUNT > 0 or A1.INVOICE_SHIP_AMOUNT > 0)
                    and A1.INVOICE_NO = A5.INVOICE_NO
                    and A1.INVOICE_NO like '%${tInput.INVOICE_NO}%'
                    and (
                        (
                            A1.NAT_CD in ('kr', 'ko', 'ks')
                            and A2.NAT_CD in ('kr', 'ko', 'ks')
                            and (
                                (
                                    A5.LICENSE_NO is not null
                                    and A5.LICENSE_NO <> ''
                                )
                                or (
                                    A5.LICENSE_DATE is not null
                                    and A5.LICENSE_DATE <> ''
                                )
                            )
                        )
                        or (
                            A1.NAT_CD in ('kr', 'ko', 'ks')
                            and A2.NAT_CD in ('kr', 'ko', 'ks')
                            and A1.DELIVERY_TYPE in ('1', '6', '7')
                        )
                        or A1.NAT_CD not in ('kr', 'ko', 'ks')
                    )
                    -- and (A5.DOCU_NO is null or A5.DOCU_NO = '')
                    -- and (A5.TAX_CD is null or A5.TAX_CD = '')
                order by
                    A1.SHIP_DATE,
                    A1.BUYER_CD
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {};
            var tRetArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tObj = { ...tRet[tIdx] };
                if (tObj.FACTORY_CD === 'FC034') {
                    tObj.FROM_PORT = 'BVT';
                    tObj.FROM_PORT_N = 'BVT';
                } else if (tObj.FACTORY_CD === 'FC044') {
                    tObj.FROM_PORT = 'ETP';
                    tObj.FROM_PORT_N = 'ETP';
                } else {
                    tObj.FROM_PORT = 'ETC';
                    tObj.FROM_PORT_N = 'ETC';
                }

                var tRateBase = '';
                let sqlStr0 = `
                    select
                        *
                    from
                        kcd_currency
                    where
                        curr_cd = '${tObj.INVOICE_CURR_CD}'
                        and start_date = '${tObj.SHIP_DATE}'
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr0));
                if (tRet0.length <= 0) {
                    let sqlStr1 = `
                        select
                            *
                        from
                            kcd_currency
                        where
                            curr_cd = '${tObj.INVOICE_CURR_CD}'
                            and start_date = (
                                select
                                    max(start_date)
                                from
                                    kcd_currency
                                where
                                    curr_cd = '${tObj.INVOICE_CURR_CD}'
                            )
                    `;
                    var tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));
                    if (tRet1.length > 0) tRateBase = tRet1[0].WON_AMT;
                } else {
                    if (tRet0.length > 0) tRateBase = tRet0[0].WON_AMT;
                }

                var tShipAmount = 0;
                var tShipPrice = 0;
                if (parseFloat(tObj.SALES_PRICE) > 0) {
                    var tCheck = 1.0;
                    if (tObj.CURR_CD === 'KRW') {
                        tCheck = parseFloat(tObj.SALES_PRICE) / tRateBase;
                    }
                    if (tCheck < 1) {
                        tShipPrice = parseFloat(tObj.AVR_PRICE);
                        tObj.SALES_PRICE = tShipPrice;
                    } else {
                        tShipPrice = parseFloat(tObj.SALES_PRICE);
                    }
                    // console.log(`====>${tCheck}/${tObj.SALES_PRICE}/${tRateBase}/${tObj.AVR_PRICE}/${tShipPrice}/${tObj.SALES_PRICE}`);
                } else {
                    tShipPrice = parseFloat(tObj.AVR_PRICE);
                    tObj.SALES_PRICE = tShipPrice;
                }
                tShipAmount = tShipPrice * parseFloat(tObj.BAL_QTY);

                if (tObj.CURR_CD === 'KRW') {
                    tObj.KRW_SHIP_AMOUNT = tShipAmount;
                    // tObj.KRW_SHIP_AMOUNT = parseFloat(tObj.SHIP_AMOUNT);
                    tObj.KRW_TAX_AMOUNT =
                        parseFloat(tObj.KRW_SHIP_AMOUNT) * 0.1;
                    tObj.KRW_TOT_AMOUNT =
                        tObj.KRW_SHIP_AMOUNT + tObj.KRW_TAX_AMOUNT;
                    tObj.KRW_SHIP_PRICE =
                        parseFloat(tObj.KRW_SHIP_AMOUNT) /
                        parseFloat(tObj.SHIP_QTY);
                } else {
                    tObj.KRW_SHIP_AMOUNT = tShipAmount * tRateBase;
                    // tObj.KRW_SHIP_AMOUNT = parseFloat(tObj.SHIP_AMOUNT) * tRateBase;
                    tObj.KRW_TAX_AMOUNT =
                        parseFloat(tObj.KRW_SHIP_AMOUNT) * 0.1;
                    tObj.KRW_TOT_AMOUNT =
                        tObj.KRW_SHIP_AMOUNT + tObj.KRW_TAX_AMOUNT;
                    tObj.KRW_SHIP_PRICE =
                        parseFloat(tObj.KRW_SHIP_AMOUNT) /
                        parseFloat(tObj.SHIP_QTY);
                }

                tObj.KRW_SHIP_AMOUNT = AFLib.getFloat(tObj.KRW_SHIP_AMOUNT, 0);
                tObj.KRW_TAX_AMOUNT = AFLib.getFloat(tObj.KRW_TAX_AMOUNT, 0);
                tObj.KRW_TOT_AMOUNT = AFLib.getFloat(tObj.KRW_TOT_AMOUNT, 0);
                tObj.KRW_SHIP_PRICE = AFLib.getFloat(tObj.KRW_SHIP_PRICE, 0);
                tObj.RATEBASE = String(tRateBase);

                if (parseFloat(tObj.BAL_QTY) > 0) tRetArray.push(tObj);
            }
            var tIdx = 0;
            return tRetArray;
        },
        mgrQueryS080101_2_0: async (_, args) => {
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

            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }

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

            if (tFlag === 1) {
                sDate = tInput.S_SHIP_DATE;
                eDate = tInput.E_SHIP_DATE;
                if (sDate !== '')
                    tSQL = `and A.SHIP_DATE  between '${sDate}' and '${eDate}' `;
                else tSQL = '';
            } else {
                sDate = tRetDate.substring(0, 6) + '01';
                eDate = tRetDate.substring(0, 6) + '31';
                tSQL = `and A.SHIP_DATE  between '${sDate}' and '${eDate}' `;
            }

            let sqlStr9 = `
                select
                    *
                from
                    kcd_currency
                where
                    start_date = '${tRetDate1}'
            `;
            var tRet9 = await prisma.$queryRaw(Prisma.raw(sqlStr9));

            let sqlStr = `
                SELECT
                    A1.*,
                    A2.BUYER_NAME,
                    A3.CD_NAME as SHIP_MODE_N,
                    A4.CD_NAME as DELIVERY_TYPE_N,
                    0.0 AS SHIP_PRICE,
                    '' AS BL_FILE,
                    '' AS PL_FILE,
                    '' AS DEBIT_FILE,
                    isnull(A5.COST_CONFIRM_USER, '') as COST_CONFIRM_USER,
                    isnull(A5.LICENSE_NO, '') as LICENSE_NO,
                    isnull(A5.LICENSE_DATE, '') as LICENSE_DATE,
                    isnull(A5.IMPORT_FREIGHT_AMT, '') as IMPORT_FREIGHT_AMT,
                    isnull(A5.IMPORT_CLEARANCE_AMT, '') as IMPORT_CLEARANCE_AMT,
                    isnull(A5.IMPORT_DUTY_AMT, '') as IMPORT_DUTY_AMT,
                    isnull(A5.REMARK, '') as REMARK,
                    (A1.SHIP_QTY - isnull(A6.s_pay_qty, 0)) as BAL_QTY
                FROM
                    (
                        SELECT
                            A.INVOICE_NO,
                            LEFT(A.ORDER_CD, 2) as BUYER_CD,
                            A.ORDER_CD,
                            C.AVR_PRICE as PRICE,
                            C.CURR_CD,
                            D.STYLE_NAME,
                            D2.PO_CD,
                            A.SHIP_DATE,
                            A.NAT_CD,
                            A.SHIP_PTYPE,
                            A.DELIVERY_TYPE,
                            C.FACTORY_CD,
                            C.TOT_CNT as ORDER_QTY,
                            SUM(A.SHIP_CNT) AS SHIP_QTY,
                            isnull(sum(A.SHIP_AMOUNT), 0) as SHIP_AMOUNT
                        FROM
                            KSV_ORDER_SHIP A,
                            KCD_BUYER B,
                            KSV_ORDER_MST C,
                            KCD_STYLE D,
                            KSV_PO_MEM D2
                        where
                            A.ORDER_CD LIKE '%${tInput.ORDER_CD}%'
                            AND LEFT(A.ORDER_CD, 2) = B.BUYER_CD
                            AND (B.BUYER_CD LIKE '%${tInput.BUYER_CD}%')
                            AND A.ORDER_CD = C.ORDER_CD
                            AND A.NAT_CD = 'kr'
                            AND C.STYLE_CD = D.STYLE_CD
                            AND D2.PO_CD like '%${tInput.PO_CD}%'
                            AND C.ORDER_CD = D2.ORDER_CD ${tSQL}
                        GROUP BY
                            A.INVOICE_NO,
                            LEFT(A.ORDER_CD, 2),
                            A.ORDER_CD,
                            C.AVR_PRICE,
                            C.CURR_CD,
                            D.STYLE_NAME,
                            D2.PO_CD,
                            A.SHIP_DATE,
                            A.NAT_CD,
                            A.SHIP_PTYPE,
                            A.DELIVERY_TYPE,
                            C.FACTORY_CD,
                            C.TOT_CNT
                            -- ORDER BY A.SHIP_DATE DESC
                            -- OFFSET 0 ROWS FETCH NEXT 1000 ROWS ONLY
                    ) A1
                    left join (
                        select
                            invoice_no,
                            sum(pay_qty) as s_pay_qty
                        from
                            ksv_tax_mem
                        group by
                            invoice_no
                    ) A6 on A6.invoice_no = A1.invoice_no,
                    KCD_BUYER A2,
                    KCD_CODE A3,
                    KCD_CODE A4,
                    KSV_INVOICE_MST A5
                where
                    A1.BUYER_CD = A2.BUYER_CD
                    and A1.SHIP_PTYPE = A3.CD_CODE
                    and A3.CD_GROUP = 'SHIP_PTYPE'
                    and A1.delivery_type = A4.CD_CODE
                    and A4.CD_GROUP = 'SHIPMENT_SHIP_MODE'
                    and A1.INVOICE_NO = A5.INVOICE_NO
                    and A1.INVOICE_NO like '%${tInput.INVOICE_NO}%'
                    and A5.LICENSE_NO <> ''
                    and (
                        A5.DOCU_NO is null
                        or A5.DOCU_NO = ''
                    )
                order by
                    A1.BUYER_CD,
                    A1.SHIP_DATE
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                INVOICE_NO: '',
                BUYER_CD: '',
                SHIP_DATE: '',
                NAT_CD: '',
                SHIP_PTYPE: '',
                SHIP_QTY: 0,
                BUYER_NAME: '',
                BL_FILE: '',
                PL_FILE: '',
                DEBIT_FILE: '',
                ETC99: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tObj = { ...tRet[tIdx] };
                if (tObj.FACTORY_CD === 'FC034') {
                    tObj.FROM_PORT = 'BVT';
                    tObj.FROM_PORT_N = 'BVT';
                } else if (tObj.FACTORY_CD === 'FC044') {
                    tObj.FROM_PORT = 'ETP';
                    tObj.FROM_PORT_N = 'ETP';
                } else {
                    tObj.FROM_PORT = 'ETC';
                    tObj.FROM_PORT_N = 'ETC';
                }
                var tRateBase = 0;
                tRet9.forEach((col, i) => {
                    if (col.CURR_CD === tObj.CURR_CD) tRateBase = col.WON_AMT2;
                });
                if (tObj.CURR_CD === 'KRW') tRateBase = 1.0;

                var tShipAmount = 0;
                if (parseFloat(tObj.SHIP_AMOUNT) <= 0) {
                    tShipAmount =
                        parseFloat(tObj.PRICE) * parseFloat(tObj.BAL_QTY);
                    tObj.SHIP_AMOUNT = String(tShipAmount);
                }

                tObj.KRW_SHIP_AMOUNT = parseFloat(tObj.SHIP_AMOUNT) * tRateBase;
                tObj.KRW_TAX_AMOUNT = parseFloat(tObj.KRW_SHIP_AMOUNT) * 0.1;
                tObj.KRW_TOT_AMOUNT =
                    tObj.KRW_SHIP_AMOUNT + tObj.KRW_TAX_AMOUNT;

                tObj.KRW_SHIP_AMOUNT = AFLib.getFloat(tObj.KRW_SHIP_AMOUNT, 2);
                tObj.KRW_TAX_AMOUNT = AFLib.getFloat(tObj.KRW_TAX_AMOUNT, 2);
                tObj.KRW_TOT_AMOUNT = AFLib.getFloat(tObj.KRW_TOT_AMOUNT, 2);

                tObj.RATEBASE = String(tRateBase);

                tRetArray.push(tObj);
            }
            var tIdx = 0;
            return tRetArray;
        },
    },
};

export default moduleQuery_S080101_2;
