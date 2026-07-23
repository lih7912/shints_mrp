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
class S0435_5_COMM {
    async query_SHIP_LIST (argData, contextValue) {


            //------------------------------------------------------
            // 1. 메인 조회 쿼리
            //------------------------------------------------------

            let sqlStr = `
                select
                    a.REG_USER,
                    left(a.order_cd, 2) as BUYER_CD,
                    d.BUYER_NAME,
                    c.VENDOR_CD,
                    c.VENDOR_NAME,
                    c.PERMIT,
                    a.PO_CD,
                    a.CT_QTY,
                    isnull(a.REMARK, '') as REMARK,
                    e.ORIGIN_PORT,
                    e.DESTINATION,
                    left(a.out_datetime, 8) as READY_DATE,
                    a.STSOUT_CD,
                    a.CT_NO,
                    a.DELIVERY_TYPE,
                    e.remark as REMARK2,
                    e.CBM as CBM,
                    e1.company_code as COMPANY_CODE,
                    ISNULL((a.out_qty * b.weight) / 1000.0, 0) AS WEIGHT2,
                    ISNULL(a.weight, 0) AS WEIGHT,
                    f.MATL_PRICE,
                    a.OUT_QTY, 
                    e.TARGET_ETA,
                    e.TRADE_TERM,
                    e.WEIGHT as WEIGHT3
                from
                    ksv_stock_out a,
                    kcd_matl_mst b,
                    kcd_vendor c,
                    kcd_buyer d,
                    ksv_shipment_mem e,
                    kcd_user e1,
                    (
                        SELECT
                            matl_cd,
                            matl_price,
                            matl_seq
                        FROM
                            kcd_matl_mem m1
                        WHERE
                            matl_seq = (
                                SELECT
                                    MAX(matl_seq)
                                FROM
                                    kcd_matl_mem m2
                                WHERE
                                    m1.matl_cd = m2.matl_cd
                            )
                    ) f
                where
                    a.stsout_cd in (
                        select distinct
                            stsout_cd
                        from
                            ksv_shipment_mem
                        where
                            shipment_cd = (
                                select distinct
                                    shipment_cd
                                from
                                    ksv_shipment_mst
                                where
                                    shipment_cd = '${argData.SHIPMENT_CD}'
                            )
                    )
                    and a.matl_cd = b.matl_cd
                    and a.matl_cd = f.matl_cd
                    and b.vendor_cd = c.vendor_cd
                    and left(a.order_cd, 2) = d.buyer_cd
                    and a.stsout_cd = e.stsout_cd
                    and d.reg_user = e1.user_id
                    and e.shipment_cd = '${argData.SHIPMENT_CD}'
                    and left(a.stsout_cd, 5) <> 'SOTMP'
                order by
                    a.stsout_cd,
                    c.vendor_name,
                    a.remark,
                    a.ct_qty,
                    a.po_cd
            `;

            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            //------------------------------------------------------
            // 2. PACK별 MERGE 로직 (tRet → tRetArray)
            //------------------------------------------------------
            var tRetArray = [];
            var tIdx = 0;
            var tSaveObj = {};
            var tPoCds = '';
            var tBuyers = '';
            var tSumWeight = 0;
            var tSumWeight2 = 0;
            var tSumOutQty = 0;

            tSaveObj.REMARK = '';
            const seenRemarks = new Set();

            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tObj = { ...tRet[tIdx] };

                if (tIdx === 0) {
                    tSumWeight = parseFloat(tObj.WEIGHT);
                    tSumWeight2 = parseFloat(tObj.WEIGHT2);
                    tSumOutQty = parseFloat(tObj.OUT_QTY);
                    tPoCds = `${tObj.PO_CD}`;
                    tSaveObj = { ...tObj };
                    continue;
                }

                // 신규 블럭이 시작되는 경우
                if (
                    tObj.STSOUT_CD === tSaveObj.STSOUT_CD &&
                    tObj.VENDOR_NAME === tSaveObj.VENDOR_NAME &&
                    tObj.REMARK !== '' &&
                    tObj.REMARK === tSaveObj.REMARK &&
                    tObj.CT_QTY === tSaveObj.CT_QTY
                ) {
                    // 동일 블럭(REMARk, CT_QTY 동일)
                    if (tPoCds.includes(tObj.PO_CD));
                    else tPoCds += `/${tObj.PO_CD}`;

                    tSumWeight += parseFloat(tObj.WEIGHT);
                    tSumWeight2 += parseFloat(tObj.WEIGHT2);
                    tSumOutQty += parseFloat(tObj.OUT_QTY);
                    /*
                    if (tObj.REMARK === tSaveObj.REMARK && tObj.CT_QTY === tSaveObj.CT_QTY) {
                        tPoCds     += `/${tObj.PO_CD}`;
                        tSumWeight += parseFloat(tObj.WEIGHT);
                        tSumWeight2 += parseFloat(tObj.WEIGHT2);
                    } else {
                        tPoCds     = `${tObj.PO_CD}`;
                        tSumWeight += parseFloat(tObj.WEIGHT);
                        tSumWeight2 += parseFloat(tObj.WEIGHT2);
                    }
                    */
                } else if (
                    tObj.STSOUT_CD === tSaveObj.STSOUT_CD &&
                    tObj.VENDOR_NAME === tSaveObj.VENDOR_NAME &&
                    tObj.REMARK === '' &&
                    tObj.PO_CD === tSaveObj.PO_CD &&
                    tObj.CT_QTY === tSaveObj.CT_QTY
                ) {
                    // 동일 블럭(REMARk, CT_QTY 동일)
                    if (tPoCds.includes(tObj.PO_CD));
                    else tPoCds += `/${tObj.PO_CD}`;

                    tSumWeight += parseFloat(tObj.WEIGHT);
                    tSumWeight2 += parseFloat(tObj.WEIGHT2);
                    tSumOutQty += parseFloat(tObj.OUT_QTY);
                } else {
                    // 이전 블럭 저장
                    if (tIdx !== 0) {
                        tSaveObj.PO_CD2 = tPoCds;
                        // tSaveObj.TRADE_TERM = '';
                        tSaveObj.EXP_DELIVERY_DATE = '';
                        // tSaveObj.TARGET_ETA = '';
                        tSaveObj.OUT_QTY = tSumOutQty.toFixed(2);

                        if (tSumWeight <= 0 && tSumWeight2 > 0) {
                            tSaveObj.WEIGHT = tSumWeight2.toFixed(4);
                        } else {
                            tSaveObj.WEIGHT = tSumWeight.toFixed(4);
                        }
                        // Shipment의 Weight우선.   won. 20260521
                        tSaveObj.WEIGHT = tSaveObj.WEIGHT3;

                        tPoCds = '';
                        // tSaveObj.CBM              = '0';
                        tSaveObj.PU_CD = '';
                        tSaveObj.INVOICE_NO = '';

                        const currRemark =
                            tObj.REMARK.toUpperCase().trim() || '';
                        /*
                        if (currRemark !== '' && seenRemarks.has(currRemark)) {
                            // 같은 REMARK가 이미 등장한 경우 CT_QTY 0 처리
                            tSaveObj.CT_QTY = 0;
                            console.log(tSaveObj);
                        } else if (currRemark !== '') {
                            seenRemarks.add(currRemark);
                        }
                        */

                        if (tSaveObj.COMPANY_CODE === 'nsr')
                            tSaveObj.BUYER_NAME = `[nsr]${tSaveObj.BUYER_NAME}`;

                        tRetArray.push(tSaveObj);
                    }

                    // 새 블럭 초기화
                    tSumWeight = parseFloat(tObj.WEIGHT);
                    tSumWeight2 = parseFloat(tObj.WEIGHT2);
                    tSumOutQty = parseFloat(tObj.OUT_QTY);
                    tPoCds = `${tObj.PO_CD}`;
                }
                tSaveObj = { ...tObj };
            }
            // 마지막 블럭 반영
            if (tRet.length > 0) {
                tSaveObj.PO_CD2 = tPoCds;
                // tSaveObj.TRADE_TERM = '';
                tSaveObj.EXP_DELIVERY_DATE = '';
                // tSaveObj.TARGET_ETA = '';
                tSaveObj.OUT_QTY = tSumOutQty.toFixed(2);

                if (tSumWeight <= 0 && tSumWeight2 > 0) {
                    tSaveObj.WEIGHT = tSumWeight2.toFixed(4);
                } else {
                    tSaveObj.WEIGHT = tSumWeight.toFixed(4);
                }
                // Shipment의 Weight우선.   won. 20260521
                tSaveObj.WEIGHT = tSaveObj.WEIGHT3;

                /*
                if (tSumWeight <= 0 && tSumWeight2 > 0) tSaveObj.WEIGHT  = tSumWeight2;
                else tSaveObj.WEIGHT           = tSumWeight;
                */

                // tSaveObj.CBM               = '0';
                tSaveObj.PU_CD = '';
                tSaveObj.INVOICE_NO = '';
                if (tSaveObj.COMPANY_CODE === 'nsr')
                    tSaveObj.BUYER_NAME = `[nsr]${tSaveObj.BUYER_NAME}`;
                tRetArray.push(tSaveObj);
            }
            console.log(
                `=================> STSOUT Count(1): ${tRetArray.length}`,
            );

            //------------------------------------------------------
            // 4. tRetArray → tRetArray3 (필드 재매핑)
            //------------------------------------------------------
            var tRetArray3 = [];
            var tIdx3 = 0;
            for (tIdx3 = 0; tIdx3 < tRetArray.length; tIdx3++) {
                var col = { ...tRetArray[tIdx3] };

                var sqlPo = '';
                if (col.PO_CD2) {
                    var tCols = col.PO_CD2.split('/');
                    tCols.forEach((col9, i9) => {
                        if (col9) {
                            if (sqlPo === '') sqlPo = `'${col9}'`;
                            else sqlPo += `,'${col9}'`;
                        }
                    });
                }
                if (sqlPo !== '') sqlPo = `and a.po_cd in (${sqlPo})`;

                let sqlStr101 = `
                    select distinct
                        b.buyer_cd,
                        b.buyer_name
                    from
                        ksv_po_mem a,
                        kcd_buyer b
                    where
                        left(a.order_cd, 2) = b.buyer_cd ${sqlPo}
                `;
                var tRet101 = await prisma.$queryRaw(Prisma.raw(sqlStr101));
                var tBuyerName = '';
                var tBuyerCd = '';
                tRet101.forEach((col9, i9) => {
                    if (col9.buyer_cd) {
                        if (tBuyerCd === '') {
                            tBuyerCd = `${col9.buyer_cd}`;
                            tBuyerName = `${col9.buyer_name}`;
                        } else {
                            if (tBuyerCd.includes(col9.buyer_cd));
                            else {
                                tBuyerCd += `/${col9.buyer_cd}`;
                                tBuyerName += `/${col9.buyer_name}`;
                            }
                        }
                    }
                });

                var tObj = { ...col };
                tObj.REG_USER = col.REG_USER;
                tObj.BUYER_CD = tBuyerCd;
                tObj.BUYER_NAME = tBuyerName;
                if (tObj.COMPANY_CODE === 'nsr')
                    tObj.BUYER_NAME = `[nsr]${tObj.BUYER_NAME}`;
                tObj.PO_CD2 = col.PO_CD2;
                tObj.VENDOR_CD = col.VENDOR_CD;
                tObj.VENDOR_NAME = col.VENDOR_NAME;
                tObj.TRADE_TERM = col.TRADE_TERM;
                tObj.ORIGIN_PORT = col.ORIGIN_PORT;
                tObj.EXP_DELIVERY_DATE = col.EXP_DELIVERY_DATE;
                tObj.TARGET_ETA = col.TARGET_ETA;
                tObj.CT_QTY = col.CT_QTY;
                tObj.WEIGHT = col.WEIGHT;
                tObj.CBM = col.CBM;
                tObj.PU_CD = col.PU_CD;
                tObj.STSOUT_CD = col.STSOUT_CD;
                tObj.INVOICE_DATE = col.READY_DATE;
                tObj.DESTINATION = col.DESTINATION;
                tRetArray3.push(tObj);
            }
            console.log(
                `=================> STSOUT Count(2): ${tRetArray3.length}`,
            );

            //------------------------------------------------------
            // 5. SOTMP* (임시 STSOUT) 추가
            //------------------------------------------------------
            const sqlStr1 = `
                SELECT
                    ISNULL(A2.REG_USER, '') AS REG_USER,
                    ISNULL(A2.BUYER, '') AS BUYER_CD,
                    ISNULL(A3.BUYER_NAME, '') AS BUYER_NAME,
                    '' AS VENDOR_CD,
                    '' AS VENDOR_NAME,
                    '' AS PERMIT,
                    '' AS PO_CD,
                    A2.CT_QTY,
                    A2.TRADE_TERM,
                    A4.ORIGIN_PORT,
                    '' AS EXP_DELIVERY_DATE,
                    A2.TARGET_ETA,
                    A2.WEIGHT,
                    A2.CBM,
                    '' AS PU_CD,
                    A2.STSOUT_CD,
                    A2.INVOICE_NO,
                    A2.READY_DATE,
                    A4.DESTINATION
                FROM
                    KSV_SHIPMENT_MEM A2
                    LEFT JOIN kcd_buyer A3 ON A2.BUYER = A3.BUYER_CD,
                    KSV_SHIPMENT_MST A4
                WHERE
                    A2.stsout_cd LIKE 'SOTMP%'
                    AND A2.SHIPMENT_CD = '${argData.SHIPMENT_CD}'
                    AND A2.shipment_cd = A4.shipment_cd
                ORDER BY
                    A2.origin_port
            `;

            const tmpRows = await prisma.$queryRaw(Prisma.raw(sqlStr1));

            for (const row of tmpRows) {
                // 기본 값은 첫 쿼리 결과 그대로 사용
                const tObj = { ...row };

                // 해당 STSOUT_CD에 연결된 PO / VENDOR 조회
                const sqlStr2 = `
                    SELECT
                        a.PO_CD,
                        sum(a.QTY) as QTY,
                        isnull(c.VENDOR_CD, '') as VENDOR_CD,
                        isnull(c.VENDOR_NAME, '') as VENDOR_NAME,
                        d.TARGET_ETA,
                        d.READY_DATE
                    FROM
                        kzz_freight a
                        left join kcd_matl_mst b on b.matl_cd = a.matl_cd
                        left join kcd_vendor c on b.vendor_cd = c.vendor_cd
                        left join ksv_shipment_mem d on a.STSOUT_CD = d.STSOUT_CD
                    WHERE
                        a.stsout_cd = '${row.STSOUT_CD}'
                    GROUP BY
                        A.PO_CD,
                        isnull(c.VENDOR_CD, ''),
                        isnull(c.VENDOR_NAME, ''),
                        d.TARGET_ETA,
                        d.READY_DATE
                `;
                const poRows = await prisma.$queryRaw(Prisma.raw(sqlStr2));

                // 하나라도 있으면 PO / VENDOR_NAME 세팅
                if (poRows.length > 0) {
                    tObj.PO_CD2 = poRows[0].PO_CD;
                    tObj.PO_CD = poRows[0].PO_CD;
                    tObj.OUT_QTY = poRows[0].QTY;
                    tObj.VENDOR_CD = poRows[0].VENDOR_CD;
                    tObj.VENDOR_NAME = poRows[0].VENDOR_NAME;
                    tObj.PERMIT = 'N';
                    tObj.TARGET_ETA = poRows[0].TARGET_ETA;
                    tObj.READY_DATE = poRows[0].READY_DATE;
                } else {
                    tObj.PO_CD2 = '';
                    tObj.PO_CD = '';
                    tObj.VENDOR_NAME = '';
                    tObj.PERMIT = '';
                }

                tRetArray3.push(tObj);
            }

            //------------------------------------------------------
            // 3. 데이터가 하나도 없을 때 기본 ROW 구성
            //------------------------------------------------------
            if (tRetArray.length <= 0 && tRetArray3.length <= 0) {
                return [
                    {
                        REG_USER: '',
                        BUYER_CD: '',
                        BUYER_NAME: '',
                        PO_CD2: '',
                        VENDOR_CD: '',
                        VENDOR_NAME: '',
                        TRADE_TERM: '',
                        ORIGIN_PORT: '',
                        EXP_DELIVERY_DATE: '',
                        TARGET_ETA: '',
                        CT_QTY: 0,
                        WEIGHT: 0,
                        CBM: 0,
                        PU_CD: '',
                        STSOUT_CD: '',
                        INVOICE_DATE: '',
                        DESTINATION: '',
                        OUT_QTY: 0,
                    },
                ];
            }

            var sumWeight = 0;
            tRetArray3.forEach((col, i) => {
                var tStr = '';
                tStr += `,${col.REG_USER}`;
                tStr += `,${col.BUYER_CD}`;
                tStr += `,${col.BUYER_NAME}`;
                tStr += `,${col.PO_CD2}`;
                tStr += `,${col.VENDOR_CD}`;
                tStr += `,${col.VENDOR_NAME}`;
                tStr += `,${col.TRADE_TERM}`;
                tStr += `,${col.ORIGIN_PORT}`;
                tStr += `,${col.CT_QTY}`;
                tStr += `,${col.WEIGHT}`;
                tStr += `,${col.CBM}`;
                tStr += `,${col.PU_CD}`;
                tStr += `,${col.STSOUT_CD}`;
                tStr += `,${col.OUT_QTY}`;
                sumWeight += parseFloat(col.WEIGHT);
                console.log(tStr);
            });
            console.log(`Total => ${sumWeight}`);

            //


            var tRetArray4 = [];
            var tIdx4 = 0;
            for (tIdx4 = 0; tIdx4 < tRetArray3.length; tIdx4++) {
                var tOne = { ...tRetArray3[tIdx4] };
                var tCols0 = tOne.BUYER_CD.split('/');
                var tCols = [];
                tCols0.forEach((col8, i8) => {
                   if (col8) tCols.push(col8);
                });

                if (tCols.length > 1) {
                    var tIdx5  =0;
                    var tRemain = parseFloat(tOne.WEIGHT);
                    var tSaveObj = {};
                    for (tIdx5 = 0; tIdx5 < tCols.length; tIdx5++) {
                        if (tCols[tIdx5]) {
                            const sqlWeight = `
                                select isnull(sum(a.out_qty  * b.weight / 1000.0), 0) as weight
                                from ksv_stock_out a, kcd_matl_mst b
                                where a.stsout_cd = '${tOne.STSOUT_CD}'
                                and   left(a.order_cd, 2) = '${tCols[tIdx5]}'
                                and   a.matl_cd = b.matl_cd
                            `;
                            const retWeight = await prisma.$queryRaw(Prisma.raw(sqlWeight));
                            if (retWeight.length > 0) {
                                tSaveObj = { ...tOne };
                                tSaveObj.BUYER_CD = tCols[tIdx5]; 
                                if (parseFloat(retWeight[0].weight) > tRemain || (tCols.length-1 === tIdx5)) {
                                   tSaveObj.WEIGHT = parseFloat(tRemain);
                                   tRemain = 0;
                                } else  {
                                   tSaveObj.WEIGHT = parseFloat(retWeight[0].weight);
                                   tRemain -= parseFloat(retWeight[0].weight);
                                }
                                tRetArray4.push(tSaveObj);
                            }
                        }
                    }
                } else {
                    tRetArray4.push(tOne);
                }
            }

            var tRetArray5 = [];
            var tRetArray4_1 = tRetArray4.sort((a,b) => a.BUYER_CD.toLowerCase() < b.BUYER_CD.toLowerCase() ? -1: 1); 
            var tSaveObj = {};
            tRetArray4_1.forEach((col, i) => {
                if (i === 0) {
                    tSaveObj = { ...col };
                } else {
                    if (tSaveObj.BUYER_CD === col.BUYER_CD) {
                        var tVal = parseFloat(tSaveObj.WEIGHT) + parseFloat(col.WEIGHT);
                        tSaveObj.WEIGHT = parseFloat(tVal).toFixed(4); 
                    } else {
                        tRetArray5.push(tSaveObj);
                        tSaveObj = { ...col };
                    }
                } 
            });
            tRetArray5.push(tSaveObj);

            return tRetArray5;

    }
}

const moduleMutation_S0435_5 = {
    Mutation: {
        mgrUpdate_S0435_5: async (_, args, contextValue) => {

            /*
            Shipping Cost 분배 규칙.
            1. shipment mst 에 금액 입력
            2. shipment mem(shipment내 화물)의 중량단위로 shipment mem의 금액 할당
            4. shipment mem에 할당된 금액을 shipment men 내의 stsout 에 중량단위로 금액 할당
               4.1 stsout에 할당된 금액이 0인경우 강제로 1을 부여함. 
            5. shipment 에 포함된 stsout 내역을 바이어별로 합산하여 cost mst 에 저장
            */

            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput = {
                ...args.datas,
            };

            if (tInput.CHK_SHINTS === '1') tInput.SHIPPING_COST_PAID = 'SHINTS';
            else if (tInput.CHK_BVT === '1') tInput.SHIPPING_COST_PAID = 'BVT';
            else if (tInput.CHK_ETP === '1') tInput.SHIPPING_COST_PAID = 'ETP';

            var tSQLArray = [];

            var sql0 = `
                select
                    a.*, b.cd_name as TYPE2 
                from
                    ksv_shipment_mst a, kcd_code b
                where
                    a.shipment_cd = '${tInput.SHIPMENT_CD}'
                and b.cd_group = 'SHIPMENT_SHIP_MODE'
                and b.cd_code = a.ship_mode
            `;
            var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            var tShipmentMst = {};
            if (tRet0.length > 0) tShipmentMst = { ...tRet0[0] };

            let tSQL99 = `
                update ksv_shipment_mst
                set
                    shipping_cost = ${tInput.SHIPPING_COST},
                    shipping_cost_curr = '${tInput.CURR_CD}',
                    shipping_cost_paid = '${tInput.SHIPPING_COST_PAID}'
                where
                    shipment_cd = '${tInput.SHIPMENT_CD}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            var sql0 = `
                select
                    sum(weight) as s_weight
                from
                    ksv_shipment_mem
                where
                    shipment_cd = '${tInput.SHIPMENT_CD}'
            `;
            var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            var tTotalWeight = 0.0;
            if (tRet0.length > 0) tTotalWeight = parseFloat(tRet0[0].s_weight);
            if (tTotalWeight === 0.0) {
                return [
                    {
                        id: 0,
                        CODE: `ERROR', ${tInput.SHIPMENT_CD} weight is '0'`,
                    },
                ];
            }

            var sql1 = `
                select
                    *
                from
                    ksv_shipment_mem
                where
                    shipment_cd = '${tInput.SHIPMENT_CD}'
            `;
            var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
            var tIdx1 = 0;
            for (tIdx1 = 0; tIdx1 < tRet1.length; tIdx1++) {
                var tOne = {
                    ...tRet1[tIdx1],
                };
                var tWeight = parseFloat(tOne.WEIGHT);
                var tShipCost =
                    parseFloat(tInput.SHIPPING_COST) * (tWeight / tTotalWeight);

                let tSQL99 = `
                    update ksv_shipment_mem
                    set
                        ship_cost = ${tShipCost}
                    where
                        shipment_cd = '${tInput.SHIPMENT_CD}'
                        and stsout_cd = '${tOne.STSOUT_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    update ksv_stock_out_mst
                    set
                        ship_cost = ${tShipCost}
                    where
                        stsout_cd = '${tOne.STSOUT_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                var sql2 = `
                    select
                        kk.*
                    from
                        (
                            select
                                a.PO_CD,
                                a.PO_SEQ,
                                a.ORDER_CD,
                                a.MATL_CD,
                                a.MRP_SEQ,
                                a.STSOUT_CD,
                                (a.OUT_QTY * b.WEIGHT * 0.001) as WEIGHT
                            from
                                ksv_stock_out a,
                                kcd_matl_mst b
                            where
                                a.stsout_cd = '${tOne.STSOUT_CD}'
                                and a.matl_cd = b.matl_cd
                        ) kk
                    order by
                        kk.WEIGHT
                `;
                var tRet2 = await prisma.$queryRaw(Prisma.raw(sql2));

                var tStsOutWeight = 0;
                tRet2.forEach((col, i) => {
                    tStsOutWeight += parseFloat(col.WEIGHT);
                });

                var tRemain = parseFloat(tShipCost);
                var tIdx2 = 0;
                for (tIdx2 = 0; tIdx2 < tRet2.length; tIdx2++) {
                    var tOne2 = {
                        ...tRet2[tIdx2],
                    };
                    var tWeight2 = parseFloat(tOne2.WEIGHT);
                    var tShipCost2 = 0;
                    /*
                    if (tWeight > 0) tShipCost2 = parseFloat(tShipCost) * (tWeight2 / tWeight);
                    */
                    if (tStsOutWeight > 0) tShipCost2 = parseFloat(tShipCost) * (tWeight2 / tStsOutWeight);

                    tShipCost2 = parseFloat(tShipCost2).toFixed(2);
                    if (tIdx2 === tRet2.length - 1) {
                        tShipCost2 = tRemain;
                        tRemain = 0;
                    } else {
                        tRemain -= parseFloat(tShipCost2);
                    }

                    let tSQL99 = `
                        update ksv_stock_out
                        set
                            ship_cost = '${tShipCost2}'
                        where
                            po_cd = '${tOne2.PO_CD}'
                            and po_seq = '${tOne2.PO_SEQ}'
                            and order_cd = '${tOne2.ORDER_CD}'
                            and matl_cd = '${tOne2.MATL_CD}'
                            and mrp_seq = '${tOne2.MRP_SEQ}'
                            and stsout_cd = '${tOne.STSOUT_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }
            }

            // Stsout 단위로 금액 처리
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
                tObj.CODE = 'ERROR:Update Shipping Cost';
                tObj.id = 0;
                tRetArray.push(tObj);
            }

            tSQLArray = [];

            let tSQL99 = `
                delete from ksv_cost_mst
                where
                    shipment_cd = '${tInput.SHIPMENT_CD}'
                    and
                type = 'SHIPPING_COST'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);
            // 향후 ATA 된것만 처리
            // if (tShipmentMst.STATUS_CD === '4') tSQLArray.push(tSQL99_1);

            var sql3_bak = `
                select
                    left(c.order_cd, 2) as buyer_cd,
                    a.bl_no,
                    a.reg_datetime,
                    b.cd_name as type2,
                    isnull(sum(c.ship_cost), 0) as ship_cost
                from
                    ksv_shipment_mst a,
                    ksv_shipment_mem a1,
                    kcd_code b,
                    ksv_stock_out c
                where
                    a.shipment_cd = '${tInput.SHIPMENT_CD}'
                    and a.shipment_cd = a1.shipment_cd
                    and a.ship_mode = b.cd_code
                    and b.cd_group = 'SHIPMENT_SHIP_MODE'
                    and a1.stsout_cd = c.stsout_cd
                group by
                    left(c.order_cd, 2),
                    a.bl_no,
                    a.reg_datetime,
                    b.cd_name
            `;

            /*
            var sql3_0 = `
                select left(a.order_cd, 2) as buyer_cd, 
                       sum(a.out_qty) as s_qty,
                       sum(a.out_qty *  a.weight) as s_weight
                from ksv_stock_out a
                     inner join kcd_matl_mst b on b.matl_cd = a.matl_cd
                where a.stsout_cd in (
                     select stsout_cd 
                     from ksv_shipment_mem
                     where shipment_cd = '${tInput.SHIPMENT_CD}' 
                      )
                and  left(a.stsout_cd, 6) <> 'SOTMP-'
                group by left(a.order_cd, 2)
                union
                select 
                       buyer as buyer_cd, 
                       '0' as s_qty,
                       weight as s_weight
                from ksv_shipment_mem
                where shipment_cd  = '${tInput.SHIPMENT_CD}'
                and  left(stsout_cd, 6) = 'SOTMP-'
            `;
            var tRet3_0 = await prisma.$queryRaw(Prisma.raw(sql3_0));
            */
            tRet3_0 = [];
            var tRet3 = [];

            var tFunc = new S0435_5_COMM();
            var tmpInObj = {};
            tmpInObj.SHIPMENT_CD = tInput.SHIPMENT_CD;
            var tRet3_0 = await tFunc.query_SHIP_LIST(
                tmpInObj,
                contextValue,
            );

            var tRemain1 = parseFloat(tInput.SHIPPING_COST);
            var totalWeight1 = 0;
            tRet3_0.forEach((col, i) => {
                totalWeight1 += parseFloat(col.WEIGHT);

                var tStr = '';
                tStr += `${col.REG_USER}`;
                tStr += `,${col.BUYER_CD}`;
                tStr += `,${col.BUYER_NAME}`;
                tStr += `,${col.PO_CD}`;
                tStr += `,${col.VENDOR_CD}`;
                tStr += `,${col.TRADE_TERM}`;
                tStr += `,${col.ORIGIN_PORT}`;
                tStr += `,${col.CT_QTY}`;
                tStr += `,${col.WEIGHT}`;
                tStr += `,${col.CBM}`;
                tStr += `,${col.PU_CD}`;
                tStr += `,${col.STSOUT_CD}`;
                tStr += `,${col.INVOICE_DATE}`;
                tStr += `,${col.DESTINATION}`;
                tStr += `,${col.OUT_QTY}`;
                console.log(tStr);
            });

            if (totalWeight1 <= 0) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Update Shipping Cost: Weight is 0';
                tObj.id = 0;
                tRetArray.push(tObj);
                return (tRetArray);
            }

            var sumAmt = 0;
            tRet3_0.forEach((col, i) => {
                var tObj = {};
                tObj.buyer_cd =  col.BUYER_CD;

                // var tCost = parseFloat(tShipCost) * parseFloat(col.s_weight) / totalWeight1;
                var tCost = 0; 
                if (totalWeight1 > 0) {
                    tCost = parseFloat(tInput.SHIPPING_COST) * parseFloat(col.WEIGHT) / totalWeight1;
                    console.log(`${col.BUYER_CD} :  ${tCost} = ${tInput.SHIPPING_COST} * ${col.WEIGHT} / ${totalWeight1} `)
                }

                if (tInput.CURR_CD === 'KRW') tCost = parseFloat(parseFloat(tCost).toFixed(0));
                else  tCost = parseFloat(parseFloat(tCost).toFixed(2));

                if (tRet3_0.length-1 === i) {
                    tCost = tRemain1; 
                }

                // Cost 가 0인 경우 무조건 1을 입력함 . 260507
                if (tCost <= 0) tCost = 1;

                tObj.cost_amt = tCost;
                tRemain1 -= tCost;

                sumAmt += tCost;

                console.log(`Compute Amt(${parseFloat(tInput.SHIPPING_COST)}: ${tCost} / ${tRemain1} / ${sumAmt} ===> ${tShipCost}/${tObj.buyer_cd} / ${parseFloat(col.WEIGHT) / totalWeight1} / ${tCost} `);

                tRet3.push(tObj);
            });

            var tIdx3 = 0;
            for (tIdx3 = 0; tIdx3 < tRet3.length; tIdx3++) {
                var tOne3 = {
                    ...tRet3[tIdx3],
                };

                var tCostDate = tRetDate1;
                var tShipDate = tShipmentMst.REG_DATETIME.substring(0, 8);
                if (tShipmentMst.ETD)  {
                    tCostDate = tShipmentMst.ETD; 
                    tShipDate = tShipmentMst.ETD;
                }

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
                            '${tCostDate}',
                            '',
                            '',
                            '',
                            '${tInput.SHIPMENT_CD}',
                            '',
                            'SHIPPING_COST',
                            '${tShipmentMst.TYPE2}',
                            '${tInput.CURR_CD}',
                            '${tOne3.cost_amt}',
                            '${tUserInfo.USER_ID}',
                            '',
                            '',
                            '${tShipmentMst.BL_NO}',
                            '${tShipDate}'
                        )
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
                // 향후 ATA 된것만 처리
                // if (tShipmentMst.STATUS_CD === '4') tSQLArray.push(tSQL99_1);
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
                tObj.CODE = 'SUCCEED:Update Shipping Cost';
                tObj.id = 0;
                tRetArray.push(tObj);
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Update Shipping Cost';
                tObj.id = 0;
                tRetArray.push(tObj);
            }
            return tRetArray;
        },
        mgrCancel_S0435_5: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput = {
                ...args.datas,
            };

            var tSQLArray = [];

            let tSQL99 = `
                update ksv_shipment_mst
                set
                    shipping_cost = 0,
                    shipping_cost_curr = '',
                    shipping_cost_paid = ''
                where
                    shipment_cd = '${tInput.SHIPMENT_CD}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            let tSQL99 = `
                update ksv_shipment_mem
                set
                    ship_cost = 0
                where
                    shipment_cd = '${tInput.SHIPMENT_CD}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            let tSQL99 = `
                delete from ksv_cost_mst
                where
                    shipment_cd = '${tInput.SHIPMENT_CD}'
                    and type = 'SHIPPING_COST'
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
                tObj.CODE = 'SUCCESS:Cancel Shipping Cost';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Cancel Shipping Cost';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

        },
    },
};

export default moduleMutation_S0435_5;
