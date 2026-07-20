import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S043401_2_1 = {
    Query: {
        mgrQueryS043401_2_1: async (_, args) => {
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
                                    shipment_cd = '${args.data.SHIPMENT_CD}'
                            )
                    )
                    and a.matl_cd = b.matl_cd
                    and a.matl_cd = f.matl_cd
                    and b.vendor_cd = c.vendor_cd
                    and left(a.order_cd, 2) = d.buyer_cd
                    and a.stsout_cd = e.stsout_cd
                    and d.reg_user = e1.user_id
                    and e.shipment_cd = '${args.data.SHIPMENT_CD}'
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
                    AND A2.SHIPMENT_CD = '${args.data.SHIPMENT_CD}'
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

            return tRetArray3;
        },

        mgrQueryS043401_2_1_COMP: async (_, args) => {
            let sqlStr_1 = `
                SELECT distinct
                    B.VENDOR_NAME,
                    G.MATL_TYPE,
                    G.MATL_CD,
                    G.MATL_NAME,
                    G.HS_CD as HS_NO,
                    isnull(G1.HS_NAME, '') as HS_NAME,
                    isnull(G1.HS_CD, '') as HS_CD,
                    isnull(G2.COMP1, '') as COMP1,
                    isnull(G2.COMP1_PERCENT, '') as COMP1_PERCENT,
                    isnull(G2.COMP2, '') as COMP2,
                    isnull(G2.COMP2_PERCENT, '') as COMP2_PERCENT,
                    isnull(G2.COMP3, '') as COMP3,
                    isnull(G2.COMP3_PERCENT, '') as COMP3_PERCENT,
                    isnull(G2.COMP4, '') as COMP4,
                    isnull(G2.COMP4_PERCENT, '') as COMP4_PERCENT
                from
                    ksv_stock_out F,
                    kcd_vendor B,
                    kcd_buyer E,
                    kcd_matl_mst G
                    left join kcd_hscode G1 on G1.hs_no = G.hs_cd
                    left join kcd_composition G2 on G2.matl_name = G.matl_name
                    -- WHERE  F.PACK_CD like '%${args.data.REMARK}%'
                WHERE
                    F.STSOUT_CD in (
                        select distinct
                            stsout_cd
                        from
                            ksv_shipment_mem
                        where
                            shipment_cd = '${args.data.SHIPMENT_CD}'
                    )
                    AND left(F.ORDER_CD, 2) = E.BUYER_CD
                    AND F.MATL_CD = G.MATL_CD
                    AND G.VENDOR_CD = B.VENDOR_CD
                    AND left(F.STSOUT_CD, 6) <> 'SOTMP-'
                ORDER BY
                    G.MATL_CD
            `;
            var tRet_1 = await prisma.$queryRaw(Prisma.raw(sqlStr_1));

            let sqlStr_2 = `
                SELECT distinct
                    B.VENDOR_NAME,
                    G.MATL_TYPE,
                    G.MATL_CD,
                    G.MATL_NAME,
                    G.HS_CD as HS_NO,
                    isnull(G1.HS_NAME, '') as HS_NAME,
                    isnull(G1.HS_CD, '') as HS_CD,
                    isnull(G2.COMP1, '') as COMP1,
                    isnull(G2.COMP1_PERCENT, '') as COMP1_PERCENT,
                    isnull(G2.COMP2, '') as COMP2,
                    isnull(G2.COMP2_PERCENT, '') as COMP2_PERCENT,
                    isnull(G2.COMP3, '') as COMP3,
                    isnull(G2.COMP3_PERCENT, '') as COMP3_PERCENT,
                    isnull(G2.COMP4, '') as COMP4,
                    isnull(G2.COMP4_PERCENT, '') as COMP4_PERCENT
                from
                    kzz_freight F,
                    kcd_vendor B,
                    kcd_matl_mst G
                    left join kcd_hscode G1 on G1.hs_no = G.hs_cd
                    left join kcd_composition G2 on G2.matl_name = G.matl_name
                WHERE
                    F.STSOUT_CD in (
                        select distinct
                            stsout_cd
                        from
                            ksv_shipment_mem
                        where
                            shipment_cd = '${args.data.SHIPMENT_CD}'
                    )
                    AND F.MATL_CD = G.MATL_CD
                    AND G.VENDOR_CD = B.VENDOR_CD
                    AND left(F.STSOUT_CD, 6) = 'SOTMP-'
                ORDER BY
                    G.MATL_CD
            `;
            var tRet_2 = await prisma.$queryRaw(Prisma.raw(sqlStr_2));

            var tRet = [];
            tRet_1.forEach((col, i) => {
                tRet.push(col);
            });
            tRet_2.forEach((col, i) => {
                tRet.push(col);
            });

            console.log(`Count: ${tRet.length}`);

            return tRet;
        },

        mgrQueryS043401_2_1_OFFER_SPEC: async (_, args) => {
            let sqlStr = `
                SELECT
                    K.*,
                    isnull(K1.OFFER_SPEC, '') as OFFER_SPEC
                from
                    (
                        SELECT distinct
                            B.VENDOR_CD,
                            B.VENDOR_NAME,
                            G.MATL_NAME,
                            G.SPEC,
                            '' as OFFER_SPEC
                        from
                            ksv_stock_out F
                            left join ksv_stock_out_mst C ON F.STSOUT_CD = C.STSOUT_CD,
                            kcd_vendor B,
                            kcd_buyer E,
                            kcd_matl_mst G
                            left join kcd_hscode G1 on G1.hs_no = G.hs_cd
                            left join kcd_composition G2 on G2.matl_name = G.matl_name
                        WHERE
                            F.PACK_CD like '%${args.data.REMARK}%'
                            AND left(F.ORDER_CD, 2) = E.BUYER_CD
                            AND F.MATL_CD = G.MATL_CD
                            AND G.VENDOR_CD = B.VENDOR_CD
                            AND B.PERMIT = 'Y'
                    ) K
                    left join kcd_offer_spec K1 on K1.VENDOR_CD = K.VENDOR_CD
                    and K1.MATL_NAME = K.MATL_NAME
                    and K1.SPEC = K.SPEC
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            console.log(`Count: ${tRet.length}`);

            return tRet;
        },
    },
};

export default moduleQuery_S043401_2_1;
