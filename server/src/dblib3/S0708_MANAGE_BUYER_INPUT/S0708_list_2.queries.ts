import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

const domesticBuyerNameSet = new Set(
    [
        'AMER SPORTS KOREA',
        'NSR Garment',
        'THISISNEVERTHAT',
        'CREAS F&C',
        'BRANDSUNIVERSE',
        'NSR TEAM WEAR',
        'F&F (에프앤에프)',
        'NSR Glove',
        'NATIONAL GEOGRAPHIC',
        'New Balance',
        'WOLF CAMPING GEAR',
        'SHINTS-STOCK',
        'NSR CUSTOMER',
        'NSR CUSTOMER GLOVES',
        'MILIMEAL',
        'WOLF LAUNCH(SHINTS)',
        '7FLOOR (POLARIS)',
        'OHNONE',
        'YESEYESEE',
        'GBGH(Good Brand Good House)',
        'Faerie Corporation (페어리 코퍼레이션) -Glove',
        '999 Humanity (999 휴머니티)',
        'Shints Internal 3',
        'THE EARTH',
        'NEW BALANCE KIDS',
        'SPYDER',
        'BACJIN GLOBAL CO.,LTD',
        '(ET)E-LAND',
        'MINYOUNG',
        'WOLF MASK ORDER',
        'UMBRO',
        'WF WORK WEAR',
        'OK OUTDOOR',
        'SNOWLINE_TENT',
        '(주)이랜드리테일',
    ].map((buyerName) => buyerName.trim().toUpperCase())
);

const isDomesticBuyer = (buyerName) =>
    domesticBuyerNameSet.has(String(buyerName ?? '').trim().toUpperCase());

// export default로 Query 내용 내보내기
const moduleQuery_S0708_LIST_2 = {
    Query: {
        mgrQueryS0708_LIST_2: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tSQL = '';
            var sDate = args.data.S_DUE_DATE;
            if (sDate === '') sDate = `${tRetDate1.substring(0, 6)}01`;

            let sql_SB = `
                select
                    a.INVOICE_NO,
                    'KRW' as CURR_CD,
                    a.curr_cd as ORG_CURR_CD,
                    round(
                        (round(sum(d.po_amt), 2) + a.delivery_amt) *
                            case
                                when a.curr_cd = 'KRW' then 1
                                else isnull(
                                    (
                                        select
                                            ccy.won_amt
                                        from
                                            kcd_currency ccy
                                        where
                                            ccy.curr_cd = a.curr_cd
                                            and ccy.start_date = (
                                                select
                                                    max(start_date)
                                                from
                                                    kcd_currency
                                                where
                                                    curr_cd = a.curr_cd
                                            )
                                    ),
                                    1
                                )
                            end,
                        2
                    ) as TOT_AMT,
                    round(sum(d.po_amt), 2) + a.delivery_amt as TOT_AMT_ORG,
                    a.out_date as SHIP_DATE,
                    convert(
                        varchar(8),
                        CONVERT(DATETIME, a.out_date) + 45,
                        112
                    ) as DUE_DATE,
                    round(
                        (
                            isnull(round(sum(b.bill_amt_org), 2), 0)
                        ) *
                            case
                                when b.curr_cd = 'KRW' then 1
                                else isnull(
                                    (
                                        select
                                            ccy.won_amt
                                        from
                                            kcd_currency ccy
                                        where
                                            ccy.curr_cd = b.curr_cd
                                            and ccy.start_date = (
                                                select
                                                    max(start_date)
                                                from
                                                    kcd_currency
                                                where
                                                    curr_cd = b.curr_cd
                                            )
                                    ),
                                    1
                                )
                            end,
                        2
                    ) as BILL_AMT,
                    0 as IN_AMT,
                    (round(sum(d.po_amt), 2) + a.delivery_amt)
                    - isnull(round(sum(b.bill_amt_org), 2), 0) as IN_AMT_ORG,
                    '0' as OA_NEGO,
                    round(
                        (
                            (round(sum(d.po_amt), 2) + a.delivery_amt)
                            - isnull(round(sum(b.bill_amt_org), 2), 0)
                        ) *
                            case
                                when a.curr_cd = 'KRW' then 1
                                else isnull(
                                    (
                                        select
                                            ccy.won_amt
                                        from
                                            kcd_currency ccy
                                        where
                                            ccy.curr_cd = a.curr_cd
                                            and ccy.start_date = (
                                                select
                                                    max(start_date)
                                                from
                                                    kcd_currency
                                                where
                                                    curr_cd = a.curr_cd
                                            )
                                    ),
                                    1
                                )
                            end,
                        2
                    ) as BALANCE,
                    (round(sum(d.po_amt), 2) + a.delivery_amt)
                    - isnull(round(sum(b.bill_amt_org), 2), 0) as BALANCE_ORG,
                    c.buyer_name as BUYER_NAME,
                    c.buyer_cd as BUYER_CD,
                    '' as INCOME_DATE,
                    isnull(tx.docu_no, '') as DOCU_NO,
                    isnull(tm.tot_amt, 0) *
                    case
                        when a.curr_cd = 'KRW' then 1
                        else isnull(
                            (
                                select
                                    ccy.won_amt
                                from
                                    kcd_currency ccy
                                where
                                    ccy.curr_cd = a.curr_cd
                                    and ccy.start_date = (
                                        select
                                            max(start_date)
                                        from
                                            kcd_currency
                                        where
                                            curr_cd = a.curr_cd
                                    )
                            ),
                            1
                        )
                    end as TAX_MEM_TOT_AMT
                    ,isnull(tm.tot_amt, 0) as TAX_MEM_TOT_AMT_ORG
                from
                    ksv_invoice_matl a
                    left join ksv_invoice_bill b on a.invoice_no = b.invoice_no,
                    kcd_buyer c,
                    ksv_invoice_matlmem d
                    left join ksv_tax_mem tm on tm.invoice_no = a.invoice_no
                    left join ksv_tax_mst tx on tx.tax_cd = tm.tax_cd
                where
                    (c.buyer_cd = 'sb')
                    and isnull(a.docu_no, '') <> ''
                    and d.invoice_no = a.invoice_no
                group by
                    a.invoice_no,
                    a.curr_cd,
                    a.out_date,
                    c.buyer_name,
                    a.delivery_amt,
                    c.buyer_cd,
                    tx.docu_no,
                    tm.tot_amt
                having
                    round(sum(d.po_amt), 2) - isnull(round(sum(b.bill_amt_org), 2), 0) > 0
                order by
                    a.invoice_no
            `;

            let sqlStr = `
                SELECT
                    A.INVOICE_NO,
                    'KRW' as CURR_CD,
                    A.CURR_CD as ORG_CURR_CD,
                    ROUND(
                        A.TOT_AMT *
                            case
                                when A.curr_cd = 'KRW' then 1
                                else isnull(
                                    (
                                        select
                                            ccy.won_amt
                                        from
                                            kcd_currency ccy
                                        where
                                            ccy.curr_cd = A.curr_cd
                                            and ccy.start_date = (
                                                select
                                                    max(start_date)
                                                from
                                                    kcd_currency
                                                where
                                                    curr_cd = A.curr_cd
                                            )
                                    ),
                                    1
                                )
                            end,
                        2
                    ) AS TOT_AMT,
                    A.TOT_AMT as TOT_AMT_ORG,
                    isnull(A.ATD, '') as SHIP_DATE,
                    A.DUE_DATE,
                    ROUND(
                        (
                            ISNULL(SUM(isnull(IB.BILL_AMT_ORG, 0)), 0)
                        ) *
                            case
                                when ib.curr_cd = 'KRW' then 1
                                else isnull(
                                    (
                                        select
                                            ccy.won_amt
                                        from
                                            kcd_currency ccy
                                        where
                                            ccy.curr_cd = ib.curr_cd
                                            and ccy.start_date = (
                                                select
                                                    max(start_date)
                                                from
                                                    kcd_currency
                                                where
                                                    curr_cd = ib.curr_cd
                                            )
                                    ),
                                    1
                                )
                            end,
                        2
                    ) as BILL_AMT,
                    0 as IN_AMT,
                    A.TOT_AMT
                    - ISNULL(SUM(isnull(IB.BILL_AMT_ORG, 0)), 0) as IN_AMT_ORG,
                    '0' as OA_NEGO,
                    ROUND(
                        (
                            A.TOT_AMT
                            - ISNULL(SUM(isnull(IB.BILL_AMT_ORG, 0)), 0)
                        ) *
                            case
                                when A.curr_cd = 'KRW' then 1
                                else isnull(
                                    (
                                        select
                                            ccy.won_amt
                                        from
                                            kcd_currency ccy
                                        where
                                            ccy.curr_cd = A.curr_cd
                                            and ccy.start_date = (
                                                select
                                                    max(start_date)
                                                from
                                                    kcd_currency
                                                where
                                                    curr_cd = A.curr_cd
                                            )
                                    ),
                                    1
                                )
                            end,
                        2
                    ) AS BALANCE,
                    A.TOT_AMT
                    - ISNULL(SUM(isnull(IB.BILL_AMT_ORG, 0)), 0) as BALANCE_ORG,
                    BYR.BUYER_NAME,
                    BYR.BUYER_CD,
                    isnull(A.INCOME_DATE, '') as INCOME_DATE
                FROM
                    KSV_INVOICE_MST A
                    LEFT JOIN KSV_INVOICE_BILL IB ON IB.INVOICE_NO = A.INVOICE_NO
                    and IB.bill_type in ('1', '')
                    LEFT JOIN KCD_BUYER BYR on BYR.BUYER_CD = A.BUYER_CD
                WHERE
                    1 = 1
                    -- AND A.TOT_AMT > 0
                    AND (
                        (
                            (BYR.BUYER_CD = '${args.data.BUYER_CD}')
                            or (BYR.MOM_CD = '${args.data.BUYER_CD}')
                        )
                        or (
                            BYR.NEOE_BUYER_CD_MOM = (
                                select
                                    neoe_buyer_cd_mom
                                from
                                    kcd_buyer
                                where
                                    buyer_cd = '${args.data.BUYER_CD}'
                            )
                        )
                        or (A.BUYER_CD like '${args.data.BUYER_CD}')
                    )
                    AND A.PAYMENT_TYPE  in ('1', '2')
                    AND A.REG_DATETIME > '20220608000000'
                GROUP BY
                    A.INVOICE_NO,
                    A.CURR_CD,
                    IB.CURR_CD,
                    A.TOT_AMT,
                    A.ATD,
                    A.DUE_DATE,
                    BYR.BUYER_NAME,
                    BYR.BUYER_CD,
                    A.INCOME_DATE
                -- HAVING 
                    --  (
                    --    ROUND(A.TOT_AMT, 2) - ISNULL(ROUND(SUM(isnull(IB.BILL_AMT_ORG, 0)), 2), 0) > 0
                    --    or
                    --    (ROUND(A.TOT_AMT, 2) <= 0 and ISNULL(ROUND(SUM(isnull(IB.BILL_AMT_ORG, 0)), 2), 0) <= 0)
                    --  )
                order by
                    a.invoice_no
            `;

            let sqlStr_Tax = `
                select 
                       kk.INVOICE_NO, 
                       -- kk.REF_NO,
                       kk.DOCU_NO,
                       kk.TAX_CD,
                       sum(kk.TAX_AMT) as TAX_AMT
                from
                (
                SELECT
                    distinct
                    A.INVOICE_NO,
                    -- IB.REF_NO,
                    isnull(A.DOCU_NO, '') as DOCU_NO,
                    isnull(TM.TAX_CD, '') as TAX_CD,
                    isnull(TM.tot_amt, 0) as TAX_AMT
                FROM
                    KSV_INVOICE_MST A
                    LEFT JOIN KCD_BUYER BYR on BYR.BUYER_CD = A.BUYER_CD
                    LEFT JOIN KSV_INVOICE_BILL IB ON IB.INVOICE_NO = A.INVOICE_NO
                                                 and IB.bill_type in ('1', '')
                    left join ksv_tax_mem TM on TM.invoice_no = A.invoice_no
                    left join ksv_tax_mst TX on TX.tax_cd = TM.tax_cd
                WHERE
                    1 = 1
                    AND (A.TOT_AMT > 0 or TM.tot_amt > 0)
                    AND (
                        (
                            (BYR.BUYER_CD = '${args.data.BUYER_CD}')
                            or (BYR.MOM_CD = '${args.data.BUYER_CD}')
                        )
                        or (
                            BYR.NEOE_BUYER_CD_MOM = (
                                select
                                    neoe_buyer_cd_mom
                                from
                                    kcd_buyer
                                where
                                    buyer_cd = '${args.data.BUYER_CD}'
                            )
                        )
                        or (A.BUYER_CD like '${args.data.BUYER_CD}')
                    )
                    AND A.PAYMENT_TYPE  in ('1', '2')
                    AND A.REG_DATETIME > '20220608000000'
                ) kk
                group by
                    kk.INVOICE_NO, 
                    -- kk.REF_NO,
                    kk.DOCU_NO,
                    kk.TAX_CD
                order by kk.INVOICE_NO
            `;
            var tRet_Tax = await prisma.$queryRaw(Prisma.raw(sqlStr_Tax));

            var tRet = [];
            if (args.data.BUYER_CD == 'SB')
                tRet = await prisma.$queryRaw(Prisma.raw(sql_SB));
            else tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            var tRetResult = [];
            var tSaveObj = {};
            tRet.forEach((col, i) => {
                var tObj = { ...col };

                var tmpInAmt = parseFloat(tObj.TOT_AMT) - parseFloat(tObj.BILL_AMT);
                    tmpInAmt = parseFloat(tmpInAmt).toFixed(0);
                tObj.IN_AMT = tmpInAmt;

                console.log(`(Step-0): ${tObj.INVOICE_NO}/${tObj.TOT_AMT}/${tObj.BILL_AMT}/${tObj.IN_AMT} => ${tRet_Tax.length}`);

                tObj.TAX_TOT_AMT = '0';
                tObj.TAX_TOT_AMT_ORG = '0';
                tObj.TAX_CD = '';
                var chk = 0;
                tRet_Tax.forEach((col1, i1) => {
                    if (col.INVOICE_NO === col1.INVOICE_NO && parseFloat(col1.TAX_AMT) > 0) {
                        var tVal1 = parseFloat(tObj.TAX_TOT_AMT) + parseFloat(col1.TAX_AMT);
                        tObj.TAX_TOT_AMT = parseFloat(tVal1).toFixed(2);
                        tObj.TAX_TOT_AMT_ORG = col.TAX_TOT_AMT;
                        tObj.TAX_CD = col1.TAX_CD;
                        if (parseFloat(tObj.TOT_AMT) <= 0 && parseFloat(col1.TAX_AMT) > 0) {
                            tObj.TOT_AMT = col1.TAX_AMT;
                            tObj.IN_AMT = col1.TAX_AMT;
                            tmpInAmt = parseFloat(col1.TAX_AMT);
                        }
                        chk = 1;
                    } else if (col.INVOICE_NO === col1.INVOICE_NO && col1.DOCU_NO) {
                        if (!isDomesticBuyer(tObj.BUYER_NAME)) {
                            var tVal1 = parseFloat(tObj.TAX_TOT_AMT) + parseFloat(col.TOT_AMT_ORG);
                            tObj.TAX_TOT_AMT = parseFloat(tVal1).toFixed(2);
                            tObj.TAX_TOT_AMT_ORG = col.TAX_TOT_AMT;
                            tObj.TAX_CD = '';
                        } else {
                            var tVal1 = parseFloat(tObj.TAX_TOT_AMT) + parseFloat(col.TOT_AMT);
                            tObj.TAX_TOT_AMT = parseFloat(tVal1).toFixed(2);
                            tObj.TAX_TOT_AMT_ORG = col.TAX_TOT_AMT;
                            tObj.TAX_CD = '';
                        } 
                        chk = 1;
                    }
                });
                if (parseFloat(tObj.TOT_AMT) <= 0 && parseFloat(tObj.TAX_TOT_AMT) > 0) tObj.TOT_AMT = tObj.TAX_TOT_AMT;

                // 실제 지급된 금액을 체크. 20260630 .won
                if (parseFloat(tmpInAmt) <= 0) chk = 0;
                if (chk > 0) tRetResult.push(tObj);
            });

            var tRetData = {};

            var tRetArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRetResult.length; tIdx++) {
                var tObj = { ...tRetResult[tIdx] };

                if (tObj.INCOME_DATE) tObj.DUE_DATE = tObj.INCOME_DATE;

                /*
                if (tObj.DOCU_NO === '') tObj.TAX_TOT_AMT = '0';
                else tObj.TAX_TOT_AMT = String(tObj.TAX_MEM_TOT_AMT ?? 0);
                if (tObj.DOCU_NO === '') tObj.TAX_TOT_AMT_ORG = '0';
                else tObj.TAX_TOT_AMT_ORG = String(tObj.TAX_MEM_TOT_AMT_ORG ?? 0);
                */

                console.log(`OA NEGO-1; ${tObj.OA_NEGO}`);

                var sql0 = `
                    select
                        isnull(sum(b.bill_amt), 0) as bill_amt,
                        b.bill_type
                    from
                        ksv_invoice_bill b,
                        ksv_invoice_nego c
                    where
                        b.invoice_no = '${tObj.INVOICE_NO}'
                        and b.bill_type in ('2', '3')
                        and c.ref_no = b.ref_no
                        and c.invoice_nego_type in ('1', '2', '3')
                    group by
                        b.bill_type
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                if (tRet0.length > 0) tObj.OA_NEGO = tRet0[0].bill_amt;
                console.log(`OA NEGO-2; ${tObj.OA_NEGO}`);

                var sql1 = `
                    select
                        isnull(sum(b.bill_amt_org), 0) as bill_amt_org,
                        b.bill_type
                    from
                        ksv_invoice_bill b,
                        ksv_invoice_nego c
                    where
                        b.invoice_no = '${tObj.INVOICE_NO}'
                        and b.bill_type in ('2', '3')
                        and c.ref_no = b.ref_no
                        and c.invoice_nego_type in ('1', '2', '3')
                    group by
                        b.bill_type
                `;
                var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                if (tRet1.length > 0) tObj.OA_NEGO_ORG = tRet1[0].bill_amt_org;
                else tObj.OA_NEGO_ORG = '0';

                if (!isDomesticBuyer(tObj.BUYER_NAME)) {

                    console.log(`(Step-1): ${tObj.INVOICE_NO}/${tObj.ORG_CURR_CD}/${tObj.TOT_AMT_ORG}/${tObj.IN_AMT_ORG}`);

                    tObj.CURR_CD = tObj.ORG_CURR_CD ?? tObj.CURR_CD;

                    if (tObj.CURR_CD === 'KRW') {
                        tObj.TOT_AMT = String(tObj.TOT_AMT_ORG ?? tObj.TOT_AMT ?? 0);
                        tObj.TOT_AMT = parseFloat(tObj.TOT_AMT).toFixed(0);

                        tObj.IN_AMT = String(tObj.IN_AMT_ORG ?? tObj.IN_AMT ?? 0);
                        tObj.IN_AMT = parseFloat(tObj.IN_AMT).toFixed(0);
                         
                        tObj.BALANCE = String(tObj.BALANCE_ORG ?? tObj.BALANCE ?? 0);
                        tObj.BALANCE = parseFloat(tObj.BALANCE).toFixed(0);

                        tObj.OA_NEGO = String(tObj.OA_NEGO_ORG ?? tObj.OA_NEGO ?? 0);
                        tObj.OA_NEGO = parseFloat(tObj.OA_NEGO).toFixed(0);

                        tObj.TAX_TOT_AMT = String(
                             tObj.TAX_TOT_AMT_ORG ?? tObj.TAX_TOT_AMT ?? 0
                        );
                        tObj.TAX_TOT_AMT = parseFloat(tObj.TAX_TOT_AMT).toFixed(0);
                    } else {
                        tObj.TOT_AMT = String(tObj.TOT_AMT_ORG ?? tObj.TOT_AMT ?? 0);
                        tObj.TOT_AMT = parseFloat(tObj.TOT_AMT).toFixed(2);

                        tObj.IN_AMT = String(tObj.IN_AMT_ORG ?? tObj.IN_AMT ?? 0);
                        tObj.IN_AMT = parseFloat(tObj.IN_AMT).toFixed(2);
                         
                        tObj.BALANCE = String(tObj.BALANCE_ORG ?? tObj.BALANCE ?? 0);
                        tObj.BALANCE = parseFloat(tObj.BALANCE).toFixed(2);

                        tObj.OA_NEGO = String(tObj.OA_NEGO_ORG ?? tObj.OA_NEGO ?? 0);
                        tObj.OA_NEGO = parseFloat(tObj.OA_NEGO).toFixed(2);

                        tObj.TAX_TOT_AMT = String(
                             tObj.TAX_TOT_AMT_ORG ?? tObj.TAX_TOT_AMT ?? 0
                        );
                        tObj.TAX_TOT_AMT = parseFloat(tObj.TAX_TOT_AMT).toFixed(2);
                    }

                    console.log(`(Step-2): ${tObj.INVOICE_NO}/${tObj.CURR_CD}/${tObj.TOT_AMT}/${tObj.IN_AMT}/${tObj.TAX_TOT_AMT}`);

                    // 전표금액이 있는 경우 전표금액을 미입금잔액으로 설정 .  20260430
                    // if (parseFloat(tObj.TAX_TOT_AMT) > 0) tObj.BALANCE = tObj.TAX_TOT_AMT;
                } else {
                    // if (parseFloat(tObj.TAX_TOT_AMT) > 0) tObj.BALANCE = tObj.TAX_TOT_AMT;

                    if (tObj.CURR_CD === 'KRW') {
                        tObj.TOT_AMT = parseFloat(tObj.TOT_AMT).toFixed(0);
                        tObj.IN_AMT = parseFloat(tObj.IN_AMT).toFixed(0);
                        tObj.BALANCE = parseFloat(tObj.BALANCE).toFixed(0);
                        tObj.OA_NEGO = parseFloat(tObj.OA_NEGO).toFixed(0);
                        tObj.TAX_TOT_AMT = parseFloat(tObj.TAX_TOT_AMT).toFixed(0);
                    } else {
                        tObj.TOT_AMT = parseFloat(tObj.TOT_AMT).toFixed(2);
                        tObj.IN_AMT = parseFloat(tObj.IN_AMT).toFixed(2);
                        tObj.BALANCE = parseFloat(tObj.BALANCE).toFixed(2);
                        tObj.OA_NEGO = parseFloat(tObj.OA_NEGO).toFixed(2);
                        tObj.TAX_TOT_AMT = parseFloat(tObj.TAX_TOT_AMT).toFixed(2);
                    }
                    console.log(`(Step-2-1): ${tObj.INVOICE_NO}/${tObj.CURR_CD}/${tObj.TOT_AMT}/${tObj.IN_AMT}/${tObj.TAX_TOT_AMT}`);
                }

                // 미입금잔액:잔표발행금액 - 금회입금액 
                var tBalance = parseFloat(tObj.TAX_TOT_AMT) - (parseFloat(tObj.TOT_AMT) - parseFloat (tObj.IN_AMT));
                if (tObj.CURR_CD === 'KRW') {
                    tObj.BALANCE = parseFloat(tBalance).toFixed(0);
                } else {
                    tObj.BALANCE = parseFloat(tBalance).toFixed(2);
                }
                console.log(`(Step-3): ${tObj.INVOICE_NO}/${tObj.CURR_CD}/${tObj.TOT_AMT}/${tObj.IN_AMT}/${tObj.TAX_TOT_AMT}/${tObj.BALANCE}`);

                if (parseFloat(tObj.BALANCE) > 0) tRetArray.push(tObj);
            }
            return tRetArray;
        },
    },
};

export default moduleQuery_S0708_LIST_2;
