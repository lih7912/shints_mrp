import { Prisma } from '@prisma/client';
import prisma from '../../db';
import AFLib from '../../commlib';
const moment = require('moment');
const Excel = require('exceljs');
const fs = require('fs');
const {
    generateUploadURL,
    deleteUploadObject,
    upload,
} = require('../../../routes/s3');

import stsInvoice from './sheets/stsInvoice';
import shints from './sheets/shints';
import vendorSheets from './sheets/vendorSheets';
import pSheet from './sheets/pSheet';
import bvtInv from './sheets/bvtInv';
import cInv from './sheets/cInv';
import pac from './sheets/pac';
import dInv from './sheets/dInv';
import dPac from './sheets/dPac';

const moduleQuery_S043401_4_1 = {
    Query: {
        // ================================================
        // PL_PRINT
        // ================================================

        mgrQueryS043401_4_PL_PRINT: async (_, args, contextValue) => {
            // ----------------------------------------------------------
            // 기본 정보 생성
            // ----------------------------------------------------------
            console.log('[PL_PRINT] Resolver Start');

            var tRetDate = AFLib.getCurrTime();

            // 로그인 사용자 정보
            var tUserInfo = AFLib.getUserInfo(contextValue);

            // 입력 데이터 복사
            var tInput = { ...args.data };

            // 회사 코드
            let company = tInput.COMPANY || 'shints';
            company = company.toLowerCase();

            console.log('[PL_PRINT] COMPANY :', company);
            console.log('[PL_PRINT] SHIPMENT_CD :', tInput.SHIPMENT_CD);

            // ----------------------------------------------------------
            // 입력 Weight 문자열 -> 숫자 변환
            // ----------------------------------------------------------
            tInput.WEIGHT = parseFloat(tInput.WEIGHT.replace(/,/g, ''));

            // ----------------------------------------------------------
            // NSR 처리용 SQL 조건
            // ----------------------------------------------------------
            var nsrSql = '';
            var nsrSql1 = '';

            if (company === 'nsr') {
                nsrSql = `AND A.STSOUT_CD = '999999' `;
                nsrSql1 = `AND STSOUT_CD = '999999' `;
            }

            // ----------------------------------------------------------
            // Shipment Master 조회
            // ----------------------------------------------------------
            console.log('[PL_PRINT] Query Shipment Master');

            let sqlStr0 = `
                select
                    a.*
                from
                    ksv_shipment_mst a
                where
                    shipment_cd = '${tInput.SHIPMENT_CD}'
            `;
            console.log(sqlStr0);

            var tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr0));

            var tShipmentObj = {};

            if (tRet0.length > 0) {
                tShipmentObj = { ...tRet0[0], PORT: tInput.PORT };
            }

            console.log('[PL_PRINT] Shipment Result Count :', tRet0.length);

            // ----------------------------------------------------------
            // Shipment에 연결된 STSOUT_CD 조회
            // ----------------------------------------------------------
            console.log('[PL_PRINT] Query STSOUT_CD');

            sqlStr0 = `
                select distinct
                    stsout_cd
                from
                    ksv_shipment_mem
                where
                    shipment_cd = '${tInput.SHIPMENT_CD}'
            `;
            tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr0));

            var sqlStsoutCd9 = '';

            if (tRet0.length > 0) {
                tRet0.forEach((col, i) => {
                    if (col.stsout_cd) {
                        if (sqlStsoutCd9 === '')
                            sqlStsoutCd9 = `'${col.stsout_cd}'`;
                        else sqlStsoutCd9 += `,'${col.stsout_cd}'`;
                    }
                });
            }

            console.log('[PL_PRINT] STSOUT Count :', tRet0.length);

            // ----------------------------------------------------------
            // PACK_CD / Ship Mode
            // ----------------------------------------------------------
            let tPackCd = tInput.PACK_CD;
            let shipMode = tShipmentObj.SHIP_MODE;

            if (tPackCd === null || tPackCd === '')
                return [{ id: 1, CODE: 'Remark is required.' }];

            console.log('[PL_PRINT] PACK_CD :', tPackCd);
            console.log('[PL_PRINT] SHIP_MODE :', shipMode);

            // ----------------------------------------------------------
            // Offer Spec 미등록/필수 조건 검사
            //  - 특정 조건(offer_spec='')이면 오류 반환
            // ----------------------------------------------------------
            console.log('[PL_PRINT] Offer Spec Check Start');

            let sqlCheck = `
                select
                    count(*) as c_cnt
                from
                    ksv_stock_out a,
                    kcd_matl_mst b,
                    kcd_offer_spec c,
                    ksv_stock_out_temp_permit d,
                    kcd_vendor e,
                    kcd_buyer kcd_buyer,
                    kcd_user kcd_user
                where
                    a.matl_cd = b.matl_Cd
                    and b.matl_name = c.matl_name
                    and b.spec = c.spec
                    and b.matl_type = 'm'
                    and b.matl_cd = a.matl_cd
                    and d.vendor_cd = b.vendor_cd
                    and e.vendor_cd = b.vendor_cd
                    and d.permit = 'Y'
                    and a.stsout_cd in (
                        select distinct
                            stsout_cd
                        from
                            ksv_shipment_mem
                        where
                            shipment_cd = '${tInput.SHIPMENT_CD}'
                    )
                    -- and a.pack_cd like '${tPackCd}%'
                    and d.pack_cd like '${tPackCd}%'
                    and e.vendor_type in ('1')
                    and c.offer_spec = ''
                    --
                    and left(a.order_cd, 2) = kcd_buyer.buyer_cd
                    and kcd_buyer.reg_user = kcd_user.user_id
                    and kcd_user.company_code = '${company}'
            `;

            var tRetCheck = await prisma.$queryRaw(Prisma.raw(sqlCheck));

            console.log('[PL_PRINT] Result:', tRetCheck);

            if (tRetCheck.length > 0 && tRetCheck[0].c_cnt > 0) {
                // Offer Spec 누락이면 즉시 종료
                var tRetArray = [];
                var tObj = {};
                tObj.id = 1;
                tObj.CODE = `ERROR:Insert Offer Spec`;

                console.log('[PL_PRINT] FAIL:', tObj.CODE);

                tRetArray.push(tObj);
                return tRetArray;
            }

            // ----------------------------------------------------------
            // ksv_stock_out_temp_permit 를 PACK 기준으로 초기화
            //  - 매 실행 시 강제로 재생성
            // ----------------------------------------------------------
            console.log('[PL_PRINT] Temp Permit Reset Start');

            const tDeleteSql = `
                delete from ksv_stock_out_temp_permit
                where
                    pack_cd = '${tPackCd}'
            `;

            console.log('[PL_PRINT] SQL:\n', tDeleteSql);

            await prisma.$queryRaw(Prisma.raw(tDeleteSql));

            console.log('[PL_PRINT] Temp Permit Reset Done');

            // ----------------------------------------------------------
            // Permit 대상 벤더 목록 조회 (Stock Out + Freight 합집합)
            //  - permit='Y' 인 벤더만 temp_permit에 넣음
            // ----------------------------------------------------------
            console.log('[PL_PRINT] Permit Vendor Query Start');

            var sql100 = `
                SELECT distinct
                    d.vendor_name,
                    d.vendor_cd,
                    d.permit
                FROM
                    KSV_STOCK_OUT a,
                    kcd_matl_mst b,
                    kcd_vendor d,
                    kcd_buyer kcd_buyer,
                    kcd_user kcd_user
                WHERE
                    a.STSOUT_CD in (
                        select distinct
                            stsout_cd
                        from
                            ksv_shipment_mem
                        where
                            shipment_cd = '${tInput.SHIPMENT_CD}'
                    )
                    and a.matl_cd = b.matl_cd
                    and b.vendor_cd = d.vendor_cd
                    and d.permit = 'Y'
                    and left(a.order_cd, 2) = kcd_buyer.buyer_cd
                    and kcd_buyer.reg_user = kcd_user.user_id
                    and kcd_user.company_code = '${company}'
            `;

            console.log('[PL_PRINT] SQL:\n', sql100);

            var ret100 = await prisma.$queryRaw(Prisma.raw(sql100));

            console.log('[PL_PRINT] Vendor Count:', ret100.length);

            // ----------------------------------------------------------
            // temp_permit 테이블에 vendor별 permit insert
            //  - 중복 방지 where not exists
            // ----------------------------------------------------------
            console.log('[PL_PRINT] Temp Permit Insert Start');

            for (let i = 0; i < ret100.length; i++) {
                const tOne100 = ret100[i];

                const tInsertSql = `
                    insert into
                        ksv_stock_out_temp_permit (pack_cd, vendor_cd, permit)
                    select
                        '${tPackCd}',
                        '${tOne100.vendor_cd}',
                        '${tOne100.permit}'
                    where
                        not exists (
                            select
                                1
                            from
                                ksv_stock_out_temp_permit
                            where
                                pack_cd = '${tPackCd}'
                                and vendor_cd = '${tOne100.vendor_cd}'
                        )
                `;

                console.log('[PL_PRINT] Insert SQL:\n', tInsertSql);

                await prisma.$queryRaw(Prisma.raw(tInsertSql));
            }

            console.log('[PL_PRINT] Temp Permit Insert Done');

            // ----------------------------------------------------------
            // stock_in pack_confirm 관련(업체수 확인용) 체크 -> 실제 출력 로직과는 무관
            // ----------------------------------------------------------
            console.log('[PL_PRINT] Stock Confirm Check Start');

            var tCheckCnt2 = 0;

            sqlCheck = `
                select
                    count(distinct d.vendor_cd) as c_cnt
                from
                    ksv_stock_out a,
                    kcd_matl_mst d,
                    kcd_buyer kcd_buyer,
                    kcd_user kcd_user
                where
                    a.STSOUT_CD in (
                        select distinct
                            stsout_cd
                        from
                            ksv_shipment_mem
                        where
                            shipment_cd = '${tInput.SHIPMENT_CD}'
                    )
                    and a.matl_cd = d.matl_cd
                    and a.out_from = 'po'
                    --
                    and left(a.order_cd, 2) = kcd_buyer.buyer_cd
                    and kcd_buyer.reg_user = kcd_user.user_id
                    and kcd_user.company_code = '${company}'
            `;

            console.log('[PL_PRINT] SQL:\n', sqlCheck);

            tRetCheck = await prisma.$queryRaw(Prisma.raw(sqlCheck));

            console.log('[PL_PRINT] Result:', tRetCheck);

            if (tRetCheck.length > 0) tCheckCnt2 = tRetCheck[0].c_cnt;

            console.log(
                '[PL_PRINT] Vendor Cnt(from stock_out/out_from=po):',
                tCheckCnt2,
            );

            // ----------------------------------------------------------
            // Vendor / PO 배열 구성 시작
            //  - Vendor: permit='Y' 대상 (Stock Out + Freight)
            //  - PO: Stock Out에서 조회 + Freight에서 PO 보강
            // ----------------------------------------------------------
            console.log('[PL_PRINT] Build Vendor/PO Arrays Start');

            // Vendor 배열
            var arrVendorObj = [];
            var arrVendor = [];
            var arrVendorCd = [];

            sqlCheck = `
                SELECT distinct
                    d.vendor_name,
                    d.vendor_cd,
                    d.permit
                FROM
                    KSV_STOCK_OUT a,
                    kcd_matl_mst b,
                    kcd_vendor d,
                    kcd_buyer kcd_buyer,
                    kcd_user kcd_user
                WHERE
                    a.STSOUT_CD in (
                        select distinct
                            stsout_cd
                        from
                            ksv_shipment_mem
                        where
                            shipment_cd = '${tInput.SHIPMENT_CD}'
                    )
                    and a.matl_cd = b.matl_cd
                    and b.vendor_cd = d.vendor_cd
                    and d.permit = 'Y'
                    and left(a.order_cd, 2) = kcd_buyer.buyer_cd
                    and kcd_buyer.reg_user = kcd_user.user_id
                    and kcd_user.company_code = '${company}'
            `;

            console.log('[PL_PRINT] Vendor SQL:\n', sqlCheck);

            tRetCheck = await prisma.$queryRaw(Prisma.raw(sqlCheck));

            console.log('[PL_PRINT] Vendor Result Count:', tRetCheck.length);

            tRetCheck.forEach((col, i) => {
                var tObj = {};
                tObj.vendor_cd = col.vendor_cd;
                tObj.vendor_name = col.vendor_name;
                tObj.permit = col.permit;

                // 이후 계산/출력에 쓰는 누적 필드
                tObj.ct_qty = 0;
                tObj.weight = 0;

                // inv / pac 데이터를 벤더별로 모아 담기
                tObj.inv = [];
                tObj.pac = [];

                arrVendorObj.push(tObj);
                arrVendor.push(col.vendor_name);
                arrVendorCd.push(col.vendor_cd);
            });

            console.log('[PL_PRINT] arrVendor.length:', arrVendor.length);
            console.log('[PL_PRINT] arrVendorCd:', arrVendorCd);

            // PO 배열
            var arrPoObj = [];
            var arrPoNo = [];

            sqlCheck = `
                SELECT distinct
                    a.PO_CD,
                    kcd_buyer.BUYER_CD,
                    kcd_buyer.BUYER_NAME
                FROM
                    KSV_STOCK_OUT a,
                    kcd_buyer kcd_buyer,
                    kcd_user kcd_user
                WHERE
                    a.STSOUT_CD in (
                        select distinct
                            stsout_cd
                        from
                            ksv_shipment_mem
                        where
                            shipment_cd = '${tInput.SHIPMENT_CD}'
                    )
                    --
                    and left(a.order_cd, 2) = kcd_buyer.buyer_cd
                    and kcd_buyer.reg_user = kcd_user.user_id
                    and kcd_user.company_code = '${company}'
            `;

            console.log('[PL_PRINT] PO SQL:\n', sqlCheck);

            tRetCheck = await prisma.$queryRaw(Prisma.raw(sqlCheck));

            console.log('[PL_PRINT] PO Result Count:', tRetCheck.length);

            tRetCheck.forEach((col, i) => {
                var tObj = {};
                tObj.po_cd = col.PO_CD;
                tObj.buyer_cd = col.BUYER_CD;
                tObj.buyer_name = col.BUYER_NAME;

                // po별 inv / pac 데이터 담기
                tObj.inv = [];
                tObj.pac = [];

                arrPoObj.push(tObj);
                arrPoNo.push(col.PO_CD);
            });

            console.log(
                '[PL_PRINT] arrPoNo.length(from stock_out):',
                arrPoNo.length,
            );

            // ----------------------------------------------------------
            // Freight에만 있는 PO 보강 (SOTMP-)
            // ----------------------------------------------------------
            console.log('[PL_PRINT] Freight PO Append Start');

            var sqlCheck6_2 = `
                select distinct
                    b.po_cd
                from
                    ksv_shipment_mem a,
                    kzz_freight b
                where
                    a.shipment_cd = '${tInput.SHIPMENT_CD}'
                    and left(a.stsout_cd, 6) = 'SOTMP-'
                    and a.stsout_cd = b.stsout_cd ${nsrSql}
            `;

            console.log('[PL_PRINT] SQL:\n', sqlCheck6_2);

            var tRetCheck6_2 = await prisma.$queryRaw(Prisma.raw(sqlCheck6_2));

            console.log('[PL_PRINT] Freight PO Count:', tRetCheck6_2.length);

            tRetCheck6_2.forEach((col6, i6) => {
                if (col6.po_cd) {
                    var tObj = {};
                    tObj.po_cd = col6.po_cd;

                    // Freight로 들어온 PO는 buyer정보가 없을 수 있어 빈값 처리
                    tObj.buyer_cd = '';
                    tObj.buyer_name = '';

                    tObj.inv = [];
                    tObj.pac = [];

                    arrPoObj.push(tObj);
                    arrPoNo.push(col6.po_cd);
                }
            });

            console.log('[PL_PRINT] arrPoNo.length(total):', arrPoNo.length);

            // ----------------------------------------------------------
            // 이후 단계에서 사용하는 데이터 컨테이너 초기화
            // ----------------------------------------------------------
            var arrSHINTS_INV = [];
            var arrBVT_INV = [];
            var arrP_PAC = [];

            console.log('[PL_PRINT] Build Vendor/PO Arrays Done');

            // ----------------------------------------------------------
            // CT_QTY 계산
            //  - 같은 vendor / remark / po_cd / ct_qty 조건이면 중복으로 보지 않음
            // ----------------------------------------------------------
            console.log('[PL_PRINT] CT_QTY Calculation Start');

            var mCTCnt = 0;
            var mCTCnt_N = 0;
            var mCTCnt_Y = 0;

            var vendorCtQty = [];

            var sqlCheck9_1 = `
                select
                    kk.*
                from
                    (
                        select
                            c.vendor_name,
                            a.stsout_cd,
                            a.remark,
                            a.po_cd,
                            a.ct_qty,
                            b.matl_name,
                            b.color,
                            b.spec,
                            b.unit,
                            a.out_qty,
                            a.ct_no,
                            c.permit,
                            c.vendor_cd
                        from
                            ksv_stock_out a,
                            kcd_matl_mst b,
                            kcd_vendor c,
                            kcd_buyer d,
                            kcd_user e
                        WHERE
                            a.STSOUT_CD in (
                                select distinct
                                    stsout_cd
                                from
                                    ksv_shipment_mem
                                where
                                    shipment_cd = '${tInput.SHIPMENT_CD}'
                            )
                            and left(a.order_cd, 2) = d.buyer_cd
                            and d.reg_user = e.user_id
                            and e.company_code = '${company}'
                            and a.matl_cd = b.matl_cd
                            and b.vendor_cd = c.vendor_cd
                            and left(a.stsout_cd, 6) <> 'SOTMP-'
                            and a.stsout_cd in (${sqlStsoutCd9})
                        union
                        SELECT
                            j.vendor_name,
                            a.stsout_cd,
                            '' as remark,
                            a.po_cd,
                            A0.ct_qty,
                            c.matl_name,
                            c.color,
                            c.spec,
                            c.unit,
                            a.qty,
                            '' as ct_no,
                            'N' as permit,
                            j.vendor_cd
                        FROM
                            KZZ_FREIGHT A
                            JOIN KSV_SHIPMENT_MEM A0 ON A.STSOUT_CD = A0.STSOUT_CD
                            LEFT JOIN KCD_MATL_MST C ON A.MATL_CD = C.MATL_CD
                            LEFT JOIN KCD_VENDOR j ON j.vendor_cd = C.vendor_cd
                        WHERE
                            A.STSOUT_CD LIKE 'SOTMP-%'
                            and A.STSOUT_CD in (
                                select distinct
                                    stsout_cd
                                from
                                    ksv_shipment_mem
                                where
                                    shipment_cd in (
                                        select distinct
                                            shipment_cd
                                        from
                                            ksv_shipment_mst
                                        where
                                            invoice_no = '${tPackCd}'
                                    )
                            ) ${nsrSql}
                    ) kk
                order by
                    kk.vendor_name,
                    kk.stsout_cd,
                    kk.remark,
                    kk.po_cd,
                    kk.ct_qty
            `;

            console.log('[PL_PRINT] SQL:\n', sqlCheck9_1);

            var tRetCheck9_1 = await prisma.$queryRaw(Prisma.raw(sqlCheck9_1));

            console.log('[PL_PRINT] Row Count:', tRetCheck9_1.length);

            // CT 진단 로그(임시): 병합 후보 키 분포 확인
            const ctDiagCounts = new Map();
            tRetCheck9_1.forEach((row) => {
                const key = [
                    row.vendor_name || '',
                    row.stsout_cd || '',
                    row.ct_no || '',
                    row.ct_qty || '',
                    row.po_cd || '',
                    row.remark || '',
                ].join('||');
                ctDiagCounts.set(key, (ctDiagCounts.get(key) || 0) + 1);
            });
            Array.from(ctDiagCounts.entries())
                .filter(([, cnt]) => cnt > 1)
                .forEach(([key, cnt]) => {
                    console.log('[PL_PRINT][CT_DIAG][DUP_KEY]', cnt, key);
                });

            var saveObj9 = {};

            tRetCheck9_1.forEach((col9, i9) => {
                if (i9 === 0) {
                    saveObj9 = { ...col9 };
                } else {
                    if (
                        col9.vendor_name === saveObj9.vendor_name &&
                        col9.stsout_cd === saveObj9.stsout_cd &&
                        (col9.ct_no || '') !== '' &&
                        (saveObj9.ct_no || '') !== '' &&
                        col9.ct_no === saveObj9.ct_no
                    ) {
                        console.log(
                            '[PL_PRINT][CT_DIAG][MERGED:CT_NO]',
                            col9.vendor_name,
                            col9.stsout_cd,
                            col9.ct_no,
                            col9.ct_qty,
                            col9.po_cd,
                        );
                    } else {
                        mCTCnt += parseInt(saveObj9.ct_qty);

                        if (saveObj9.permit === 'Y')
                            mCTCnt_Y += parseInt(saveObj9.ct_qty);
                        else mCTCnt_N += parseInt(saveObj9.ct_qty);

                        console.log(
                            '[PL_PRINT] CT_ADD:',
                            saveObj9.vendor_name,
                            saveObj9.po_cd,
                            saveObj9.ct_qty,
                            'TOTAL:',
                            mCTCnt,
                        );

                        var chk1 = 0;

                        vendorCtQty.forEach((col10, i) => {
                            if (col10.VENDOR_CD === saveObj9.vendor_cd) {
                                var tObj10 = { ...col10 };

                                tObj10.CT_QTY += parseInt(saveObj9.ct_qty);

                                vendorCtQty[i] = { ...tObj10 };

                                chk1 = 1;
                            }
                        });

                        if (chk1 === 0) {
                            var tObj10 = {};

                            tObj10.VENDOR_CD = saveObj9.vendor_cd;
                            tObj10.CT_QTY = parseInt(saveObj9.ct_qty);

                            vendorCtQty.push(tObj10);
                        }
                    }

                    saveObj9 = { ...col9 };
                }
            });

            mCTCnt += parseInt(saveObj9.ct_qty);

            if (saveObj9.permit === 'Y') mCTCnt_Y += parseInt(saveObj9.ct_qty);
            else mCTCnt_N += parseInt(saveObj9.ct_qty);

            console.log(
                '[PL_PRINT] FINAL_CT:',
                mCTCnt,
                'PermitY:',
                mCTCnt_Y,
                'PermitN:',
                mCTCnt_N,
            );

            // ----------------------------------------------------------
            // Freight CT_QTY 및 Freight 금액 계산
            // ----------------------------------------------------------
            console.log('[PL_PRINT] Freight CT Calculation');

            var sqlCheck6_1 = `
                select
                    *
                from
                    ksv_shipment_mem
                where
                    shipment_cd = '${tInput.SHIPMENT_CD}'
                    and left(stsout_cd, 6) = 'SOTMP-' ${nsrSql1}
            `;

            console.log(sqlCheck6_1);

            var tRetCheck6_1 = await prisma.$queryRaw(Prisma.raw(sqlCheck6_1));

            var cntCtQty = 0;
            var amtFreight = 0;

            var kzzBuyerArray = [];

            tRetCheck6_1.forEach((col6) => {
                cntCtQty += parseFloat(col6.CT_QTY);

                if (col6.PAYMENT === '2') amtFreight += 0;
                else amtFreight += parseFloat(col6.AMOUNT);

                if (col6.BUYER) kzzBuyerArray.push(col6.BUYER);
            });

            console.log('[PL_PRINT] Freight_CT:', cntCtQty);
            console.log('[PL_PRINT] Freight_AMT:', amtFreight);

            // ----------------------------------------------------------
            // Packing List Total Amount 계산
            // ----------------------------------------------------------
            console.log('[PL_PRINT] Total PL Amount Calculation');

            var strTotalPLAmt = 0;

            sqlCheck = `
                SELECT
                    isnull(
                        sum(d.pay_PRICE * d.pack_exch_rate * A.out_QTY),
                        0
                    ) as amt
                FROM
                    KSV_STOCK_OUT A,
                    ksv_stock_in d,
                    kcd_buyer kcd_buyer,
                    kcd_user kcd_user
                WHERE
                    d.po_cd = a.po_cd
                    and d.po_seq = a.po_seq
                    and d.order_cd = a.order_cd
                    and a.STSOUT_CD in (
                        select distinct
                            stsout_cd
                        from
                            ksv_shipment_mem
                        where
                            shipment_cd = '${tInput.SHIPMENT_CD}'
                    )
                    and a.matl_cd = d.matl_cd
                    and d.matl_seq = a.matl_seq
                    --
                    and left(a.order_cd, 2) = kcd_buyer.buyer_cd
                    and kcd_buyer.reg_user = kcd_user.user_id
                    and kcd_user.company_code = '${company}'
            `;

            console.log(sqlCheck);

            tRetCheck = await prisma.$queryRaw(Prisma.raw(sqlCheck));

            if (tRetCheck.length > 0)
                strTotalPLAmt = parseFloat(tRetCheck[0].amt);

            strTotalPLAmt += amtFreight;

            console.log('[PL_PRINT] Total PL Amount:', strTotalPLAmt);

            // ----------------------------------------------------------
            // Factory 정보 조회 (출발지)
            // ----------------------------------------------------------
            console.log('[PL_PRINT] Factory Info Query');

            var tFactoryCd = '';

            if (tShipmentObj.DESTINATION === 'SHINTS') tFactoryCd = 'FC010';
            else if (tShipmentObj.DESTINATION === 'BVT') tFactoryCd = 'FC034';
            else if (tShipmentObj.DESTINATION === 'ETP') tFactoryCd = 'FC044';

            sqlCheck = `
                select
                    c.pack_name,
                    c.addr1,
                    c.addr2,
                    c.tel_no,
                    c.fax_no
                from
                    kcd_factory c
                where
                    c.factory_cd = '${tFactoryCd}'
            `;

            console.log(sqlCheck);

            tRetCheck = await prisma.$queryRaw(Prisma.raw(sqlCheck));

            var strFacName = '';
            var strAddr1 = '';
            var strAddr2 = '';
            var strTel = '';
            var strFax = '';

            if (tRetCheck.length > 0) {
                strFacName = tRetCheck[0].pack_name;
                strAddr1 = tRetCheck[0].addr1;
                strAddr2 = tRetCheck[0].addr2;
                strTel = tRetCheck[0].tel_no;
                strFax = tRetCheck[0].fax_no;
            }

            console.log('[PL_PRINT] Factory:', strFacName);

            // ----------------------------------------------------------
            // Destination Factory 조회
            // ----------------------------------------------------------
            console.log('[PL_PRINT] Destination Factory Query');

            tFactoryCd = '';

            if (tShipmentObj.DESTINATION === 'SHINTS') tFactoryCd = 'FC010';
            else if (tShipmentObj.DESTINATION === 'BVT') tFactoryCd = 'FC034';
            else if (tShipmentObj.DESTINATION === 'ETP') tFactoryCd = 'FC044';

            sqlCheck = `
                select
                    c.pack_name,
                    c.addr1,
                    c.addr2,
                    c.tel_no,
                    c.fax_no
                from
                    kcd_factory c
                where
                    c.factory_cd = '${tFactoryCd}'
            `;

            console.log(sqlCheck);

            tRetCheck = await prisma.$queryRaw(Prisma.raw(sqlCheck));

            var strFacName2 = '';
            var strAddr12 = '';
            var strAddr22 = '';
            var strTel2 = '';
            var strFax2 = '';

            if (tRetCheck.length > 0) {
                strFacName2 = tRetCheck[0].pack_name;
                strAddr12 = tRetCheck[0].addr1;
                strAddr22 = tRetCheck[0].addr2;
                strTel2 = tRetCheck[0].tel_no;
                strFax2 = tRetCheck[0].fax_no;
            }

            console.log('[PL_PRINT] Destination Factory:', strFacName2);

            // ----------------------------------------------------------
            // Excel 파일 생성 준비 (파일명/템플릿/워크북 로드)
            // 템플릿 경로 계산 (__dirname 기준)
            //  - src 폴더를 기준으로 /upload/excel_template 로 치환
            // ----------------------------------------------------------
            console.log('[PL_PRINT] Template Path Build');

            var tPath0 = '';
            var tCols0 = __dirname.split('/');
            var tFlag0 = 0;

            tCols0.forEach((col, i) => {
                if (col !== '') {
                    if (col === 'src') {
                        tPath0 += '/upload/excel_template';
                        tFlag0 = 1;
                    }

                    if (tFlag0 === 0) {
                        tPath0 += '/' + col;
                    }
                }
            });

            console.log('[PL_PRINT] Template Base Path:', tPath0);

            // ----------------------------------------------------------
            // 템플릿 엑셀 로드
            // ----------------------------------------------------------
            var tTemplateName = 'PL_PRINT';
            var tTemplateExcel = `${tPath0}/${tTemplateName}.xlsx`;

            console.log('[PL_PRINT] Template File:', tTemplateExcel);

            const wb = new Excel.Workbook();
            await wb.xlsx.readFile(tTemplateExcel);

            console.log('[PL_PRINT] Template Loaded');

            // ----------------------------------------------------------
            // Invoice Query (Stock Out + Freight) 실행
            //  - currency_max CTE로 최신 환율만 적용
            //  - StockOut은 ksv_stock_in과 조인하여 pay_price 기반 USD 계산
            //  - Freight는 KZZ_FREIGHT 기반으로 USD 계산
            // ----------------------------------------------------------
            console.log('[PL_PRINT] Invoice SQL Start');

            let sql_INV = `
                WITH
                    CURRENCY_MAX AS (
                        SELECT
                            curr_cd,
                            MAX(start_date) AS max_start_date
                        FROM
                            KCD_CURRENCY
                        GROUP BY
                            curr_cd
                    )
                select
                    isnull(E.hs_cd, '') as hs_cd,
                    b.matl_name,
                    a.po_cd,
                    b.vendor_cd,
                    CONVERT(
                        varchar,
                        ROUND(
                            CASE
                                WHEN cm2.usd_rate * D.pay_PRICE < 0.01 THEN 0.01
                                ELSE cm2.usd_rate * D.pay_PRICE
                            END + 0.004,
                            2
                        )
                    ) AS usd,
                    SUM(A.OUT_QTY) AS out_qty,
                    b.unit,
                    h.nat_name,
                    ISNULL(b.weight, 0) AS weight,
                    CONVERT(
                        varchar,
                        ROUND(
                            CASE
                                WHEN cm2.usd_rate * D.pay_PRICE < 0.01 THEN 0.01
                                ELSE cm2.usd_rate * D.pay_PRICE
                            END + 0.004,
                            2
                        )
                    ) * SUM(A.OUT_QTY) AS amt,
                    b.width,
                    CASE
                        WHEN ISNULL(b.matl_type, '') <> 'M' THEN ''
                        WHEN ISNULL(j.comp2, '') = '' THEN j.comp1 + ' ' + CONVERT(varchar, j.comp1_percent) + '%'
                        WHEN ISNULL(j.comp3, '') = '' THEN j.comp1 + ' ' + CONVERT(varchar, j.comp1_percent) + '%/' + j.comp2 + ' ' + CONVERT(varchar, j.comp2_percent) + '%'
                        WHEN ISNULL(j.comp4, '') = '' THEN j.comp1 + ' ' + CONVERT(varchar, j.comp1_percent) + '%/' + j.comp2 + ' ' + CONVERT(varchar, j.comp2_percent) + '%/' + j.comp3 + ' ' + CONVERT(varchar, j.comp3_percent) + '%'
                        ELSE j.comp1 + ' ' + CONVERT(varchar, j.comp1_percent) + '%/' + j.comp2 + ' ' + CONVERT(varchar, j.comp2_percent) + '%/' + j.comp3 + ' ' + CONVERT(varchar, j.comp3_percent) + '%/' + j.comp4 + ' ' + CONVERT(varchar, j.comp4_percent) + '%'
                    END AS comp_str,
                    b.matl_type,
                    isnull(e.hs_name, '') as hs_name,
                    isnull(p.offer_spec, '') as offer_spec,
                    c.permit,
                    isnull(sum(a.weight), 0) as out_weight
                from
                    ksv_stock_out a
                    JOIN ksv_stock_in D ON A.po_CD = D.po_CD
                    AND A.po_seq = D.po_seq
                    AND A.order_cd = D.order_cd
                    AND A.matl_cd = D.matl_cd
                    AND A.mrp_seq = D.mrp_seq
                    AND A.in_datetime = D.in_datetime,
                    kcd_matl_mst b
                    left join kcd_composition j on j.matl_name = b.matl_name
                    left join kcd_hscode e on e.hs_no = b.hs_cd
                    left join KCD_offer_spec p on b.matl_name = p.matl_name
                    and b.spec = p.spec,
                    kcd_vendor c
                    left join KCD_nation h ON c.nat_CD = h.nat_cd,
                    kcd_buyer d1,
                    kcd_user e1,
                    currency_max cm,
                    kcd_currency cm2
                where
                    a.STSOUT_CD in (
                        select distinct
                            stsout_cd
                        from
                            ksv_shipment_mem
                        where
                            shipment_cd = '${tInput.SHIPMENT_CD}'
                    )
                    and left(a.order_cd, 2) = d1.buyer_cd
                    and d1.reg_user = e1.user_id
                    and e1.company_code = '${company}'
                    and a.matl_cd = b.matl_cd
                    and b.vendor_cd = c.vendor_cd
                    and d.pay_curr_cd = cm.curr_cd
                    and cm.curr_cd = d.pay_curr_cd
                    and cm2.curr_cd = cm.curr_cd
                    and cm2.start_date = cm.max_start_date
                    and left(a.stsout_cd, 6) <> 'SOTMP-'
                    and a.stsout_cd in (${sqlStsoutCd9})
                GROUP BY
                    E.HS_CD,
                    B.MATL_NAME,
                    D.pay_PRICE,
                    B.UNIT,
                    B.WEIGHT,
                    h.nat_name,
                    cm2.usd_rate,
                    j.comp1,
                    j.comp1_percent,
                    j.comp2,
                    j.comp2_percent,
                    j.comp3,
                    j.comp3_percent,
                    j.comp4,
                    j.comp4_percent,
                    B.width,
                    B.matl_type,
                    a.po_cd,
                    b.vendor_cd,
                    e.hs_name,
                    p.offer_spec,
                    c.permit
                union all
                SELECT
                    isnull(E.hs_cd, '') as hs_cd,
                    isnull(B.matl_name, '') as matl_name,
                    A.po_cd,
                    b.vendor_cd,
                    CONVERT(varchar, ROUND(A.PRICE * E1.USD_RATE, 2)) AS usd,
                    A.QTY AS out_qty,
                    B.unit,
                    '' AS nat_name,
                    (ISNULL(A.weight, 0) / NULLIF(A.QTY, 0) * 1000.0) AS weight,
                    CONVERT(
                        varchar,
                        ROUND((A.QTY * A.PRICE * E1.USD_RATE) + 0.004, 2)
                    ) AS amt,
                    '0' AS width,
                    CASE
                        WHEN ISNULL(B.matl_type, '') <> 'M' THEN ''
                        WHEN ISNULL(j.comp2, '') = '' THEN j.comp1 + ' ' + CONVERT(varchar, j.comp1_percent) + '%'
                        WHEN ISNULL(j.comp3, '') = '' THEN j.comp1 + ' ' + CONVERT(varchar, j.comp1_percent) + '%/' + j.comp2 + ' ' + CONVERT(varchar, j.comp2_percent) + '%'
                        WHEN ISNULL(j.comp4, '') = '' THEN j.comp1 + ' ' + CONVERT(varchar, j.comp1_percent) + '%/' + j.comp2 + ' ' + CONVERT(varchar, j.comp2_percent) + '%/' + j.comp3 + ' ' + CONVERT(varchar, j.comp3_percent) + '%'
                        ELSE j.comp1 + ' ' + CONVERT(varchar, j.comp1_percent) + '%/' + j.comp2 + ' ' + CONVERT(varchar, j.comp2_percent) + '%/' + j.comp3 + ' ' + CONVERT(varchar, j.comp3_percent) + '%/' + j.comp4 + ' ' + CONVERT(varchar, j.comp4_percent) + '%'
                    END AS comp_str,
                    B.matl_type,
                    isnull(e.hs_name, '') as hs_name,
                    '' as offer_spec,
                    isnull(I.permit, 'N') as permit,
                    '0' as out_weight
                FROM
                    KZZ_FREIGHT A
                    LEFT JOIN KCD_MATL_MST B ON A.MATL_CD = B.MATL_CD
                    LEFT JOIN kcd_composition j ON j.matl_name = B.matl_name
                    LEFT JOIN KCD_HSCODE E ON B.HS_CD = E.HS_NO
                    LEFT JOIN KCD_VENDOR I ON I.VENDOR_CD = B.VENDOR_CD
                    JOIN CURRENCY_MAX CM ON A.CURR_CD = CM.curr_cd
                    JOIN KCD_CURRENCY E1 ON E1.CURR_CD = CM.curr_cd
                    AND E1.start_date = CM.max_start_date
                    and a.stsout_cd in (${sqlStsoutCd9})
                WHERE
                    A.STSOUT_CD LIKE 'SOTMP-%' ${nsrSql}
                    AND EXISTS (
                        SELECT
                            1
                        FROM
                            ksv_shipment_mem sm
                            JOIN ksv_shipment_mst mst ON sm.shipment_cd = mst.shipment_cd
                        WHERE
                            sm.stsout_cd = A.STSOUT_CD
                            AND mst.invoice_no = '${tPackCd}'
                    )
                ORDER BY
                    comp_str desc,
                    b.matl_name,
                    a.po_cd,
                    b.vendor_cd
            `;

            console.log('[PL_PRINT] SQL:\n', sql_INV);

            var ret_INV = await prisma.$queryRaw(Prisma.raw(sql_INV));

            console.log('[PL_PRINT] Invoice Row Count:', ret_INV.length);


            // ----------------------------------------------------------
            // Invoice 데이터 전체 수량 합계 계산
            //  - WEIGHT 분배 계산을 위해 총 out_qty 를 먼저 구함
            // ----------------------------------------------------------
            console.log('[PL_PRINT] Invoice Total Qty Calc');

            var tmpTotalQty = 0;

            ret_INV.forEach((col) => {
                tmpTotalQty += parseFloat(col.out_qty);
            });

            console.log('[PL_PRINT] tmpTotalQty:', tmpTotalQty);

            // ----------------------------------------------------------
            // Invoice 데이터 가공
            //  - usd 최소값 보정
            //  - Weight를 입력 WEIGHT 기준으로 out_qty 비율대로 배분
            //  - arrBVT_INV(전체), arrSHINTS_INV(permit='N') 생성
            // ----------------------------------------------------------
            console.log('[PL_PRINT] Invoice Row Transform Start');

            var tRemainWeight = parseFloat(tInput.WEIGHT);

            ret_INV.forEach((col, i) => {
                var tObj = { ...col };

                // Unit Price 보정 (0.01 미만 최소단가 처리)
                var tUnitPrice = parseFloat(col.usd);

                if (tUnitPrice <= 0.0009) tUnitPrice = 0.0;
                else if (tUnitPrice <= 0.009) tUnitPrice = 0.01;

                tObj.usd = parseFloat(tUnitPrice);

                // Weight 배분 : 전체 WEIGHT를 out_qty 비율로 나누어 각 Row에 배분
                // 미사용
                /*
                var tWeight0 =
                    parseFloat(tInput.WEIGHT) *
                    (parseFloat(col.out_qty) / parseFloat(tmpTotalQty));
                tWeight0 = parseFloat(tWeight).toFixed(2);
                // 마지막 Row는 잔여 무게를 몰아주어 합계가 정확히 맞도록 처리
                if (i === ret_INV.length - 1) {
                    tWeight0 = tRemainWeight;
                    tRemainWeight = 0;
                } else {
                    tRemainWeight -= parseFloat(tWeight);
                }
                tObj.weight0 = parseFloat(tWeight0); //  향후 사용
                */

                // Won. 260319
                // Weight 배분 : 엑셀에 Print 하는 Weight =  item의 Weight * item 의 OutQty
                /* 엑셀에서 수식으로 계산하도록 변경하면서 아래 로직은 주석 처리
                var tWeight =
                    parseFloat(col.weight) * parseFloat(col.out_qty);
                tObj.weight = parseFloat(parseFloat(tWeight).toFixed(4));
                */


                // Amount 재계산 (usd * out_qty)
                tObj.usd = Number(Number(tObj.usd).toFixed(2));
                tObj.out_qty = Number(tObj.out_qty);
                tObj.amt = Number((tObj.usd * tObj.out_qty).toFixed(2));

                arrBVT_INV.push(tObj);

                // permit='N'인 항목은 SHINTS에 출력되는 대상으로 분리
                if (col.permit === 'N') arrSHINTS_INV.push(tObj);
            });

            console.log('[PL_PRINT] arrBVT_INV:', arrBVT_INV.length);
            console.log('[PL_PRINT] arrSHINTS_INV:', arrSHINTS_INV.length);

            // ----------------------------------------------------------
            // Vendor / PO 객체에 INV 데이터 매핑
            //  - vendor_cd 기준으로 arrVendorObj[i].inv에 push
            //  - po_cd 기준으로 arrPoObj[i].inv에 push
            // ----------------------------------------------------------
            console.log('[PL_PRINT] Map INV to Vendor/PO Start');

            arrBVT_INV.forEach((col) => {
                var saveObj = { ...col };

                // Vendor 매핑
                var findIdx = -1;

                arrVendorObj.forEach((col1, i) => {
                    if (col1.vendor_cd === saveObj.vendor_cd) findIdx = i;
                });

                if (findIdx >= 0) {
                    var tObj1 = { ...arrVendorObj[findIdx] };
                    tObj1.inv.push(saveObj);
                    arrVendorObj[findIdx] = { ...tObj1 };
                }

                // PO 매핑
                findIdx = -1;

                arrPoObj.forEach((col1, i) => {
                    if (col1.po_cd === saveObj.po_cd) findIdx = i;
                });

                if (findIdx >= 0) {
                    var tObj1 = { ...arrPoObj[findIdx] };
                    tObj1.inv.push(saveObj);
                    arrPoObj[findIdx] = { ...tObj1 };
                }
            });

            console.log('[PL_PRINT] Map INV Done');

            // ----------------------------------------------------------
            // 동일 matl_name 기준으로 Invoice 집계
            //  - 같은 matl_name이면 out_qty/amt/weight 합산
            //  - 최종적으로 arrBVT_INV / arrSHINTS_INV 를 집계된 배열로 교체
            // ----------------------------------------------------------
            console.log('[PL_PRINT] Group INV By matl_name Start');

            var tArrayTmp = [];
            var tArrayTmp_Shints = [];
            var saveObj = {};
            var strTotalPLAmt1 = 0;
            var totalInQty = 0;

            arrBVT_INV.forEach((col, i) => {
                if (i === 0) {
                    saveObj = { ...col };
                } else {
                    if (col.matl_name.trim() === saveObj.matl_name.trim()) {
                        // 같은 자재명이면 합산
                        saveObj.amt =
                            Number(saveObj.amt || 0) + Number(col.amt || 0);
                        saveObj.out_qty =
                            Number(saveObj.out_qty || 0) +
                            Number(col.out_qty || 0);
                        saveObj.weight =
                            Number(saveObj.weight || 0) +
                            Number(col.weight || 0);
                    } else {
                        // 그룹 종료시 usd/amt/out_qty/weight 정리
                        saveObj.amt = Number(saveObj.amt || 0);
                        saveObj.out_qty = Number(saveObj.out_qty || 0);
                        saveObj.weight = Number(saveObj.weight || 0);
                        saveObj.usd =
                            saveObj.out_qty === 0
                                ? 0
                                : saveObj.amt / saveObj.out_qty;

                        // Total 금액/수량 누적
                        strTotalPLAmt1 += saveObj.amt;
                        strTotalPLAmt1 = Number(strTotalPLAmt1);

                        tArrayTmp.push(saveObj);

                        // permit='N'은 Shints용
                        if (saveObj.permit === 'N')
                            tArrayTmp_Shints.push(saveObj);

                        // 다음 그룹 시작
                        saveObj = { ...col };
                    }
                }
            });

            // 마지막 그룹 처리
            saveObj.out_qty = Number(saveObj.out_qty || 0);
            saveObj.weight = Number(saveObj.weight || 0);
            saveObj.usd =
                saveObj.out_qty === 0 ? 0 : saveObj.amt / saveObj.out_qty;
            saveObj.amt = saveObj.usd * saveObj.out_qty;

            strTotalPLAmt1 += saveObj.amt;
            strTotalPLAmt1 = strTotalPLAmt1;

            totalInQty += parseFloat(saveObj.out_qty);

            tArrayTmp.push(saveObj);

            if (saveObj.permit === 'N') tArrayTmp_Shints.push(saveObj);

            console.log('[PL_PRINT] Grouped INV Count:', tArrayTmp.length);
            console.log(
                '[PL_PRINT] Grouped SHINTS INV Count:',
                tArrayTmp_Shints.length,
            );
            console.log('[PL_PRINT] strTotalPLAmt1:', strTotalPLAmt1);
            console.log('[PL_PRINT] totalInQty:', totalInQty);

            // 집계된 배열로 교체
            arrBVT_INV = [...tArrayTmp];
            arrSHINTS_INV = [...tArrayTmp_Shints];

            // ----------------------------------------------------------
            // Vendor별 weight 합계 계산 (inv에 들어있는 weight 합산)
            // ----------------------------------------------------------
            console.log('[PL_PRINT] Vendor Weight Sum Start');

            arrVendorObj.forEach((col0, i0) => {
                var tObj0 = { ...col0 };

                var sWeight = 0;

                tObj0.inv.forEach((col) => {
                    sWeight += parseFloat(col.weight);
                });

                tObj0.weight = parseFloat(sWeight);

                arrVendorObj[i0] = { ...tObj0 };
            });

            console.log('[PL_PRINT] Vendor Weight Sum Done');
            console.log('[PL_PRINT] (End) Invoice Query');

            // ----------------------------------------------------------
            // PAC Query 실행
            //  - Packing List 상세 데이터 조회
            // ----------------------------------------------------------
            console.log('[PL_PRINT] PAC Query Start');

            let sql_PAC = `
                select
                    kk.*
                from
                    (
                        select
                            c.vendor_name,
                            a.stsout_cd,
                            a.remark,
                            a.po_cd,
                            a.ct_qty,
                            a.matl_cd,
                            b.matl_name,
                            b.color,
                            b.spec,
                            b.unit,
                            a.out_qty,
                            a.ct_no,
                            CASE
                                WHEN ISNULL(B.matl_type, '') <> 'M' THEN ''
                                WHEN ISNULL(j.comp2, '') = '' THEN j.comp1 + ' ' + CONVERT(varchar, j.comp1_percent) + '%'
                                WHEN ISNULL(j.comp3, '') = '' THEN j.comp1 + ' ' + CONVERT(varchar, j.comp1_percent) + '%/' + j.comp2 + ' ' + CONVERT(varchar, j.comp2_percent) + '%'
                                WHEN ISNULL(j.comp4, '') = '' THEN j.comp1 + ' ' + CONVERT(varchar, j.comp1_percent) + '%/' + j.comp2 + ' ' + CONVERT(varchar, j.comp2_percent) + '%/' + j.comp3 + ' ' + CONVERT(varchar, j.comp3_percent) + '%'
                                ELSE j.comp1 + ' ' + CONVERT(varchar, j.comp1_percent) + '%/' + j.comp2 + ' ' + CONVERT(varchar, j.comp2_percent) + '%/' + j.comp3 + ' ' + CONVERT(varchar, j.comp3_percent) + '%/' + j.comp4 + ' ' + CONVERT(varchar, j.comp4_percent) + '%'
                            END AS comp_str,
                            e1.hs_cd,
                            e1.hs_name,
                            isnull(p.offer_spec, '') as offer_spec
                        from
                            ksv_stock_out a,
                            kcd_matl_mst b
                            left join kcd_composition j on j.matl_name = b.matl_name
                            left join kcd_hscode e1 on e1.hs_no = b.hs_cd
                            left join KCD_offer_spec p on b.matl_name = p.matl_name
                            and b.spec = p.spec,
                            kcd_vendor c,
                            kcd_buyer d,
                            kcd_user e
                        where
                            a.STSOUT_CD in (
                                select distinct
                                    stsout_cd
                                from
                                    ksv_shipment_mem
                                where
                                    shipment_cd = '${tInput.SHIPMENT_CD}'
                            )
                            and left(a.order_cd, 2) = d.buyer_cd
                            and d.reg_user = e.user_id
                            and e.company_code = '${company}'
                            and a.matl_cd = b.matl_cd
                            and b.vendor_cd = c.vendor_cd
                            and left(a.stsout_cd, 6) <> 'SOTMP-'
                            and a.stsout_cd in (${sqlStsoutCd9})
                        union all
                        SELECT
                            j.vendor_name,
                            a.stsout_cd,
                            '' as remark,
                            a.po_cd,
                            A0.ct_qty,
                            a.matl_cd,
                            c.matl_name,
                            c.color,
                            c.spec,
                            c.unit,
                            a.qty,
                            '' as ct_no,
                            '' as comp_str,
                            '' as hs_cd,
                            '' as hs_name,
                            '' as offer_spec
                        FROM
                            KZZ_FREIGHT A
                            JOIN KSV_SHIPMENT_MEM A0 ON A.STSOUT_CD = A0.STSOUT_CD
                            LEFT JOIN KCD_MATL_MST C ON A.MATL_CD = C.MATL_CD
                            LEFT JOIN KCD_VENDOR j ON j.vendor_cd = C.vendor_cd
                        WHERE
                            A.STSOUT_CD LIKE 'SOTMP-%'
                            and A.STSOUT_CD in (
                                select distinct
                                    stsout_cd
                                from
                                    ksv_shipment_mem
                                where
                                    shipment_cd in (
                                        select distinct
                                            shipment_cd
                                        from
                                            ksv_shipment_mst
                                        where
                                            invoice_no = '${tPackCd}'
                                    )
                            ) ${nsrSql}
                    ) kk
                order by
                    kk.vendor_name,
                    kk.stsout_cd,
                    kk.remark,
                    kk.po_cd,
                    kk.ct_qty,
                    kk.matl_name,
                    kk.out_qty
            `;

            console.log(sql_PAC);

            var ret_PAC = await prisma.$queryRaw(Prisma.raw(sql_PAC));

            console.log('[PL_PRINT] PAC Row Count:', ret_PAC.length);

            // PAC 진단 로그(임시): 병합 후보 키 분포 확인
            const pacDiagCounts = new Map();
            ret_PAC.forEach((row) => {
                const key = [
                    row.vendor_name || '',
                    row.stsout_cd || '',
                    row.ct_no || '',
                    row.ct_qty || '',
                    row.po_cd || '',
                    row.remark || '',
                    row.matl_cd || '',
                ].join('||');
                pacDiagCounts.set(key, (pacDiagCounts.get(key) || 0) + 1);
            });
            Array.from(pacDiagCounts.entries())
                .filter(([, cnt]) => cnt > 1)
                .forEach(([key, cnt]) => {
                    console.log('[PL_PRINT][PAC_DIAG][DUP_KEY]', cnt, key);
                });

            var saveObj9 = {};
            var ptab_ctqty = 0;
            var sum_p_pac = 0;
            var vendor_ctqty = 0;

            // ----------------------------------------------------------
            // PAC 데이터 가공
            // ----------------------------------------------------------
            ret_PAC.forEach((col9, i9) => {
                var tObj0 = { ...col9 };

                var pCtQty = 0;

                if (i9 === 0) {
                    saveObj9 = { ...col9 };
                    pCtQty = parseFloat(saveObj9.ct_qty);
                } else {
                    if (
                        col9.vendor_name === saveObj9.vendor_name &&
                        col9.remark !== '' &&
                        col9.remark === saveObj9.remark &&
                        col9.ct_qty === saveObj9.ct_qty
                    ) {
                        pCtQty = 0;
                        console.log(
                            '[PL_PRINT][PAC_DIAG][MERGED:REMARK]',
                            col9.vendor_name,
                            col9.stsout_cd,
                            col9.remark,
                            col9.ct_qty,
                            col9.po_cd,
                            col9.matl_cd,
                        );
                    } else if (
                        col9.vendor_name === saveObj9.vendor_name &&
                        col9.remark === '' &&
                        col9.po_cd === saveObj9.po_cd &&
                        col9.ct_qty === saveObj9.ct_qty
                    ) {
                        pCtQty = 0;
                        console.log(
                            '[PL_PRINT][PAC_DIAG][MERGED:PO_CD]',
                            col9.vendor_name,
                            col9.stsout_cd,
                            col9.po_cd,
                            col9.ct_qty,
                            col9.matl_cd,
                        );
                    } else {
                        pCtQty = parseFloat(col9.ct_qty);
                        ptab_ctqty += parseFloat(saveObj9.ct_qty);
                    }

                    saveObj9 = { ...col9 };
                }

                tObj0.ct_qty = parseFloat(pCtQty);

                sum_p_pac += parseFloat(tObj0.out_qty);

                arrP_PAC.push(tObj0);

                // ----------------------------------------------------------
                // PO별 PAC 데이터 매핑
                // ----------------------------------------------------------
                var findIdx = -1;

                arrPoObj.forEach((col1, i) => {
                    if (col1.po_cd === col9.po_cd) findIdx = i;
                });

                if (findIdx >= 0) {
                    var tObj1 = { ...arrPoObj[findIdx] };
                    tObj1.pac.push(tObj0);
                    arrPoObj[findIdx] = { ...tObj1 };
                }

                // ----------------------------------------------------------
                // Vendor별 PAC 데이터 매핑
                // ----------------------------------------------------------
                findIdx = -1;

                arrVendorObj.forEach((col1, i) => {
                    if (col1.vendor_name === col9.vendor_name) findIdx = i;
                });

                if (findIdx >= 0) {
                    var tObj1 = { ...arrVendorObj[findIdx] };

                    vendor_ctqty += parseFloat(tObj0.ct_qty);

                    tObj1.pac.push(tObj0);

                    arrVendorObj[findIdx] = { ...tObj1 };
                }
            });

            ptab_ctqty += parseFloat(saveObj9.ct_qty);

            console.log('[PL_PRINT] arrP_PAC Count:', arrP_PAC.length);
            console.log('[PL_PRINT] sum_p_pac:', sum_p_pac);
            console.log(
                '[PL_PRINT] arrVendorObj:',
                JSON.stringify(arrVendorObj, null, 4),
            );

            // ----------------------------------------------------------
            // 엑셀 출력
            // ----------------------------------------------------------
            const stsResult = await stsInvoice({
                wb,
                arrSHINTS_INV,
            });

            const { stsInvoiceSumAmt, tSumNetWeight } = stsResult;

            await shints({
                wb,
                prisma,
                company,
                tPackCd,
                shipMode,
                strFacName2,
                strAddr12,
                strAddr22,
                strTel2,
                strFax2,
                tShipmentObj,
                stsInvoiceSumAmt,
                ptab_ctqty,
                vendor_ctqty,
                tSumNetWeight,
                strTotalPLAmt1,
            });

            await vendorSheets({
                wb,
                prisma,
                arrVendorObj,
                arrVendor,
                tPackCd,
                shipMode,
                strFacName2,
                strAddr12,
                strAddr22,
                strTel2,
                strFax2,
                tShipmentObj,
                strTotalPLAmt1,
                tPath0,
            });

            await pSheet({
                wb,
                prisma,
                arrP_PAC,
            });

            const bvtInvGrandTotalWeightCell = await bvtInv({
                wb,
                prisma,
                arrBVT_INV,
            });

            await cInv({
                wb,
                prisma,
                tPackCd,
                shipMode,
                strFacName2,
                strAddr12,
                strAddr22,
                strTel2,
                strFax2,
                tShipmentObj,
            });

            await pac({
                wb,
                prisma,
                tPackCd,
                shipMode,
                strFacName2,
                strAddr12,
                strAddr22,
                strTel2,
                strFax2,
                tShipmentObj,
                bvtInvGrandTotalWeightCell,
            });

            await dInv({
                wb,
                prisma,
                arrPoObj,
                company,
                tPackCd,
                etd: moment(tShipmentObj.ETD, 'YYYYMMDD', true), // ETD
            });

            await dPac({
                wb,
                prisma,
                arrPoObj,
            });

            // ----------------------------------------------------------
            // 그리드 라인 숨김
            // ----------------------------------------------------------

            wb.eachSheet((sheet) => {
                if (sheet.views && sheet.views.length > 0)
                    sheet.views[0].showGridLines = false;
            });

            // ----------------------------------------------------------
            // 결과 리턴
            // ----------------------------------------------------------

            const safePackCd = (tPackCd || '').replace(/[\/\\]/g, '-');
            const safeMblNo = String(tInput.MBL_NO || '').trim().replace(/[\/\\]/g, '-');
            const safeInvoiceNo = String(tInput.INVOICE_NO || '').trim().replace(/[\/\\]/g, '-');
            const fileKey = safeMblNo || safeInvoiceNo || safePackCd;
            const fileName = `(PL PRINT-${company})${fileKey}-${tUserInfo.USER_ID}-${tRetDate}.xlsx`;

            const dirPath = `${process.cwd()}/upload/excel_output`;
            const outputPath = `${dirPath}/${fileName}`;

            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath, { recursive: true });
            }

            await wb.xlsx.writeFile(outputPath);

            // 업로드
            const result = await upload(fileName, wb);

            if (fs.existsSync(outputPath)) {
                fs.unlinkSync(outputPath);
            }

            return result;
        },

        // ================================================
        // PL_PRINT_EXPRESS
        // ================================================

        mgrQueryS043401_4_PL_PRINT_EXPRESS: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);
            var tInput = {
                ...args.data,
            };

            let sqlStr0 = `
                select
                    *
                from
                    ksv_shipment_mst
                where
                    shipment_cd = '${tInput.SHIPMENT_CD}'
            `;
            var tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr0));
            var tShipmentObj = {};
            var tPackCd = '';
            if (tRet0.length > 0) {
                tShipmentObj = {
                    ...tRet0[0],
                };
                //tPackCd = tShipmentObj.BL_NO;
                tPackCd = tShipmentObj.REMARK;
            }

            var sqlStsoutCd = '';
            var sqlStsout = `
                select distinct
                    stsout_cd
                from
                    ksv_shipment_mem
                where
                    shipment_cd = '${tInput.SHIPMENT_CD}'
            `;
            var retStsout = await prisma.$queryRaw(Prisma.raw(sqlStsout));
            if (retStsout.length > 0) {
                retStsout.forEach((col, i) => {
                    if (sqlStsoutCd === '') sqlStsoutCd = `'${col.stsout_cd}'`;
                    else sqlStsoutCd += `,'${col.stsout_cd}'`;
                });
                sqlStsoutCd = ` a.stsout_cd in (${sqlStsoutCd}) `;
            }

            var sql100 = '';
            if (tPackCd) {
                sql100 = `and (a.bl_no = '${tPackCd}' or ${sqlStsoutCd} ) `;
            } else {
                sql100 = `and (${sqlStsoutCd} ) `;
            }

            let sqlQry = `
                SELECT
                    a.SENDER,
                    ISNULL(a.FRT_DATE, '') AS FRT_DATE,
                    ISNULL(a.PO_CD, '') AS PO_CD,
                    ISNULL(a.ORDER_CD, '') AS ORDER_CD,
                    '' AS STYLE_NAME,
                    isnull(a.price, 0) AS PRICE,
                    ISNULL(d.MATL_NAME, '') AS MATL_NAME,
                    ISNULL(b.DESCRIPTION, '') AS DESCRIPTION,
                    ISNULL(d.COLOR, '') AS COLOR,
                    ISNULL(d.SPEC, '') AS MATL_SPEC,
                    ISNULL(d.UNIT, '') AS UNIT,
                    ISNULL(a.QTY, '0') AS QTY,
                    isnull(a.WEIGHT, 0) as WEIGHT,
                    isnull(a.WEIGHT_NET, 0) as WEIGHT_NET,
                    isnull(a.SPEC, '') as SPEC,
                    a.RECEIVER,
                    a.REMARK,
                    ISNULL(a.MATL_CD, '') AS MATL_CD,
                    a.FRT_DATE,
                    a.REG_USER,
                    a.DESTINATION,
                    isnull(a.confirm_check, '') as CONFIRM_CHECK,
                    isnull(e.cd_name, '') as DELAY_REASON_N,
                    isnull(a.BL_NO, '') as BL_NO,
                    f.buyer_name as BUYER_NAME
                FROM
                    KZZ_FREIGHT a
                    left join KCD_CODE e ON a.DELAY_REASON = e.CD_CODE
                    AND e.cd_group = 'DELAY_REASON'
                    left join KCD_MATL_MST d ON a.MATL_CD = d.MATL_CD
                    left join KSV_ORDER_MST AS c ON a.ORDER_CD = c.ORDER_CD
                    left join KCD_BUYER f on a.buyer_cd = f.buyer_cd
                    left join KSV_SHIPMENT_MEM b on a.stsout_cd = b.stsout_cd
                WHERE
                    left(a.STSOUT_CD, 6) = 'SOTMP-' ${sql100}
                order by
                    1
            `;

            var retQry = await prisma.$queryRaw(Prisma.raw(sqlQry));

            var retQry1 = [];
            /*
            if (retQry.length <= 0) {
            */
            let sqlQry1 = `
                SELECT
                    a.REG_USER as SENDER,
                    left(a.OUT_DATETIME, 8) AS FRT_DATE,
                    ISNULL(a.PO_CD, '') AS PO_CD,
                    ISNULL(a.ORDER_CD, '') AS ORDER_CD,
                    '' AS STYLE_NAME,
                    (isnull(a3.pay_price, 0) * a.out_qty) AS PRICE,
                    ISNULL(d.MATL_NAME, '') AS MATL_NAME,
                    '' as DESCRIPTION,
                    ISNULL(d.COLOR, '') AS COLOR,
                    ISNULL(d.SPEC, '') AS MATL_SPEC,
                    ISNULL(d.UNIT, '') AS UNIT,
                    ISNULL(a.OUT_QTY, '0') AS QTY,
                    isnull(a.WEIGHT, 0) as WEIGHT,
                    0 as WEIGHT_NET,
                    '' as SPEC,
                    '' as RECEIVER,
                    a.REMARK,
                    ISNULL(a.MATL_CD, '') AS MATL_CD,
                    a.REG_USER,
                    isnull(a2.DESTINATION, '') as DESTINATION,
                    '' as CONFIRM_CHECK,
                    '' as DELAY_REASON_N,
                    isnull(a2.BL_NO, '') as BL_NO,
                    isnull(a.PACK_CD, '') as PACK_CD,
                    isnull(a.IN_DATETIME, '') as IN_DATETIME,
                    isnull(a3.pay_price, -1) as PAY_PRICE,
                    isnull(a4.buyer_name, '') as BUYER_NAME
                FROM
                    kSV_STOCK_OUT a
                    left join KCD_MATL_MST d ON a.MATL_CD = d.MATL_CD
                    left join KSV_ORDER_MST c ON a.ORDER_CD = c.ORDER_CD
                    left join ksv_stock_in a3 on a.po_cd = a3.po_cd
                    and a.po_cd = a3.po_cd
                    and a.po_seq = a3.po_seq
                    and a.order_cd = a3.order_cd
                    and a.matl_cd = a3.matl_cd
                    and a.mrp_seq = a3.mrp_seq
                    and a.in_datetime = a3.in_datetime,
                    KSV_SHIPMENT_MEM a1,
                    KSV_SHIPMENT_MST a2,
                    KCD_BUYER a4
                WHERE
                    a2.SHIPMENT_CD = '${tInput.SHIPMENT_CD}'
                    and a2.SHIPMENT_CD = a1.SHIPMENT_CD
                    and a.STSOUT_CD = a1.STSOUT_CD
                    and left(a.STSOUT_CD, 6) <> 'SOTMP-'
                    and left(a.order_cd, 2) = a4.buyer_cd
                order by
                    1
            `;
            retQry1 = await prisma.$queryRaw(Prisma.raw(sqlQry1));

            /*
            }
            */

            if (retQry.length <= 0 && retQry1.length <= 0) {
                var tRetArray = [];
                var tObj = {};
                tObj.id = 1;
                tObj.CODE = `ERROR:No Data.Check STS-OUT Data, KZZ_Freight. `;
                console.log(tObj.CODE);
                tRetArray.push(tObj);
                return tRetArray;
            }

            var retQry0 = [];
            retQry.forEach((col, i) => {
                var tObj = { ...col };
                retQry0.push(tObj);
            });
            retQry1.forEach((col, i) => {
                var tObj = { ...col };
                retQry0.push(tObj);
            });

            var tIdx = 0;
            var tDataArray = [];
            for (tIdx = 0; tIdx < retQry0.length; tIdx++) {
                var tOne = {
                    ...retQry0[tIdx],
                };

                if (tShipmentObj.BL_NO) tOne.BL_NO = tShipmentObj.BL_NO;

                var sqlStyle = `
                    select
                        b.style_name
                    from
                        ksv_order_mst a,
                        kcd_style b
                    where
                        a.order_cd = '${tOne.ORDER_CD}'
                        and a.style_cd = b.style_cd
                `;
                var retStyle = await prisma.$queryRaw(Prisma.raw(sqlStyle));
                if (retStyle.length > 0)
                    tOne.STYLE_NAME = retStyle[0].style_name;

                if (tOne.PO_CD && tOne.MATL_CD) {
                    var sqlPrice = `
                        select
                            (a.matl_price * b.usd_rate) as usd_price
                        from
                            ksv_po_mrp a,
                            kcd_currency b
                        where
                            a.po_cd = '${tOne.PO_CD}'
                            and a.matl_cd = '${tOne.MATL_CD}'
                            and b.start_date = '${tRetDate1}'
                            and a.curr_cd = b.curr_cd
                    `;
                    var retPrice = await prisma.$queryRaw(Prisma.raw(sqlPrice));
                    if (retPrice.length > 0)
                        tOne.PRICE = parseFloat(retPrice[0].usd_price);
                }
                tDataArray.push(tOne);
            }

            // Excel
            var tFrtDate = tDataArray[0].FRT_DATE;
            var tTitle = `Express_LIST-${tFrtDate}-${tPackCd}`;
            var tWExcelFile = `Express_LIST-${tFrtDate}-${tPackCd}`;
            var tRetExcelFile = '';

            try {
                // Excel Read
                var tPath0 = '';
                var tCols0 = __dirname.split('/');
                var tFlag0 = 0;
                tCols0.forEach((col, i) => {
                    if (col !== '') {
                        if (col === 'src') {
                            tPath0 += '/upload/excel_template';
                            tFlag0 = 1;
                        }
                        if (tFlag0 === 0) {
                            tPath0 += '/' + col;
                        }
                    }
                });

                var tTemplateName = 'PL_PRINT_EXPRESS';
                var tTemplateExcel = `${tPath0}/${tTemplateName}.xlsx`;

                const wb = new Excel.Workbook();
                await wb.xlsx.readFile(tTemplateExcel);

                var tSheetName = `Express_LIST`;
                var sheet = wb.getWorksheet(tSheetName);

                sheet.getCell(2, 15).value = tShipmentObj.BL_NO;

                if (tShipmentObj.BL_NO.includes('(TN)')) {
                    sheet.getCell(3, 1).value = 'SHINTS TN';
                }

                sheet.getCell(2, 19).value = tRetDate1;

                var tRowIdx = 5;
                var tIdx2 = 0;
                for (tIdx2 = 0; tIdx2 < tDataArray.length; tIdx2++) {
                    var col = {
                        ...tDataArray[tIdx2],
                    };
                    if (tIdx2 > 0) {
                        var tmpRow = [];
                        sheet.insertRow(tRowIdx, tmpRow, 'i');
                    }

                    sheet.getCell(tRowIdx, 3).value = col.SENDER;
                    //sheet.getCell(tRowIdx, 5 + 1).value = `${col.PO_CD}`;
                    //sheet.getCell(tRowIdx, 6 + 1).value = col.STYLE_NAME;

                    sheet.getCell(tRowIdx, 4).value = col.RECEIVER;
                    sheet.getCell(tRowIdx, 5).value = col.BUYER_NAME;
                    sheet.getCell(tRowIdx, 6).value = col.PO_CD;

                    var tMatlName = '';
                    if (col.MATL_NAME) tMatlName = col.MATL_NAME;
                    else {
                        if (col.DESCRIPTION) tMatlName = col.DESCRIPTION;
                    }

                    /*
                    var tMatlName = col.MATL_NAME;
                    if (!col.SPEC);
                    else tMatlName = col.SPEC;
                    */

                    sheet.getCell(tRowIdx, 7).value = tMatlName;
                    sheet.getCell(tRowIdx, 8).value = col.COLOR;
                    sheet.getCell(tRowIdx, 9).value = col.MATL_SPEC;
                    sheet.getCell(tRowIdx, 10).value = col.UNIT;
                    sheet.getCell(tRowIdx, 11).value = Number(col.QTY);
                    sheet.getCell(tRowIdx, 12).value = Number(col.WEIGHT);
                    sheet.getCell(tRowIdx, 13).value = Number(col.WEIGHT_NET);
                    sheet.getCell(tRowIdx, 14).value = ''; // Purpose
                    sheet.getCell(tRowIdx, 15).value = col.RECEIVER; // ATTN
                    sheet.getCell(tRowIdx, 16 + 3).value = col.DELAY_REASON_N;
                    sheet.getCell(tRowIdx, 17 + 3).value = col.REMARK;

                    const currentRow = sheet.getRow(tRowIdx);
                    currentRow.eachCell(
                        {
                            includeEmpty: true,
                        },
                        (cell) => {
                            cell.font = {
                                size: 16,
                            };
                            cell.border = {
                                top: {
                                    style: 'thin',
                                },
                                left: {
                                    style: 'thin',
                                },
                                bottom: {
                                    style: 'thin',
                                },
                                right: {
                                    style: 'thin',
                                },
                            };
                        },
                    );
                    tRowIdx += 1;
                }

                //  STS.INVOICE
                tSheetName = `INVOICE`;
                sheet = wb.getWorksheet(tSheetName);

                sheet.getCell(3, 8).value = tPackCd;
                sheet.getCell(4, 8).value = tRetDate1;
                sheet.getCell(20, 5).value = tRetDate1;

                tRowIdx = 25;
                tIdx2 = 0;
                for (tIdx2 = 0; tIdx2 < tDataArray.length; tIdx2++) {
                    var col = {
                        ...tDataArray[tIdx2],
                    };
                    if (tIdx2 > 0) {
                        var tmpRow = [];
                        sheet.insertRow(tRowIdx, tmpRow, 'i');
                    }

                    sheet.getCell(tRowIdx, 2).value = col.SENDER;
                    sheet.getCell(tRowIdx, 3).value = col.RECEIVER; // ATTN
                    sheet.getCell(tRowIdx, 4).value = `${col.PO_CD}`;

                    var tMatlName = '';
                    if (col.MATL_NAME) tMatlName = col.MATL_NAME;
                    else {
                        if (col.DESCRIPTION) tMatlName = col.DESCRIPTION;
                    }
                    /*
                    var tMatlName = col.MATL_NAME;
                    if (!col.SPEC);
                    else tMatlName = col.SPEC;
                    */

                    sheet.getCell(tRowIdx, 5).value = tMatlName;
                    sheet.getCell(tRowIdx, 6 + 1).value = Number(col.QTY);
                    sheet.getCell(tRowIdx, 7 + 1).value = col.UNIT;
                    sheet.getCell(tRowIdx, 8 + 1).value = Number(col.PRICE);

                    var tAmt = parseFloat(col.PRICE) * parseFloat(col.QTY);
                    sheet.getCell(tRowIdx, 9 + 1).value = Number(tAmt);

                    const row = sheet.getRow(tRowIdx);
                    row.eachCell(
                        {
                            includeEmpty: true,
                        },
                        (cell) => {
                            cell.border = {
                                top: {
                                    style: 'thin',
                                },
                                left: {
                                    style: 'thin',
                                },
                                bottom: {
                                    style: 'thin',
                                },
                                right: {
                                    style: 'thin',
                                },
                            };
                        },
                    );

                    tRowIdx += 1;
                }
                const imagePath = `${tPath0}/sign.png`;
                const imageId = wb.addImage({
                    filename: imagePath,
                    extension: 'png',
                });

                sheet.addImage(imageId, {
                    tl: {
                        col: 8,
                        row: tRowIdx,
                    },
                    ext: {
                        width: 250,
                        height: 160,
                    },
                });

                tSheetName = `Express_LIST`;
                sheet = wb.getWorksheet(tSheetName);

                wb.worksheets.forEach((sheet, index) => {
                    console.log(
                        `Index: ${index}, Position: ${index + 1}, Name: ${sheet.name}`,
                    );
                });

                var tWExcelFile = tWExcelFile.replace(/[\\\/:*?"<>|]/g, ' ');

                return await upload(`${tWExcelFile}.xlsx`, wb);
            } catch (error) {
                var tRetArray = [];
                var tObj = {};
                tObj.id = 1;
                tObj.CODE = `ERROR:Excel Print:${error.message}`;
                console.log(tObj.CODE);
                tRetArray.push(tObj);
                return tRetArray;
            }
        },

        mgrQueryS043401_4_1: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }

            var tSQL0 = '';
            var tPoCds = args.data.PO_CD.split('/');
            tPoCds.forEach((col, i) => {
                if (i === 0) tSQL0 += `'${col}'`;
                else tSQL0 += `,'${col}'`;
            });

            let sqlStr = `
                SELECT
                    A1.PO_CD,
                    A1.PO_SEQ,
                    A1.ORDER_CD,
                    A1.MATL_CD,
                    A1.MRP_SEQ,
                    A1.MATL_SEQ,
                    A3.MATL_NAME,
                    A3.COLOR,
                    A3.SPEC,
                    A3.UNIT,
                    A1.PO_QTY AS MRP_QTY,
                    A1.STOCK_QTY,
                    A1.MOQ AS MOQ_QTY,
                    (A1.PO_QTY - A1.STOCK_QTY + isnull(A1.MOQ, 0)) AS PO_QTY,
                    (
                        A1.PO_QTY - A1.STOCK_QTY + isnull(A1.MOQ, 0) - A1.IN_QTY
                    ) AS BAL_QTY,
                    (
                        A1.PO_QTY - A1.STOCK_QTY + isnull(A1.MOQ, 0) - A1.IN_QTY
                    ) AS STSIN_QTY,
                    A4.CURR_CD,
                    A4.MATL_PRICE AS MASTER_PRICE,
                    0 AS MOQ_PRICE,
                    0 AS FREIGHT_PRICE,
                    0 AS OTHER_PRICE,
                    0 AS SURCHAGE_REMARK,
                    0 AS PO_PRICE
                    -- FROM KSV_STOCK_MEM A1, KSV_PO_MRP A2, KCD_MATL_MST A3, KCD_MATL_MEM A4 
                FROM
                    KSV_STOCK_MEM A1,
                    KCD_MATL_MST A3,
                    KCD_MATL_MEM A4
                WHERE
                    A1.PO_CD IN (${tSQL0})
                    AND LEFT(A1.ORDER_CD, 2) = '${args.data.BUYER_CD}'
                    AND A1.MATL_CD = A3.MATL_CD
                    -- AND   A1.MATL_SEQ = A3.SEQ
                    AND A3.VENDOR_CD = '${args.data.VENDOR_CD}'
                    AND A3.MATL_TYPE = '${args.data.MATL_TYPE}'
                    AND A1.MATL_CD = A4.MATL_CD
                    AND A1.MATL_SEQ = A4.MATL_SEQ
                    AND A1.PO_SEQ < 97
                    -- AND   A1.STOCK_STATUS = '0' 
                    -- AND   A1.PO_CD = A2.PO_CD
                    -- AND   A1.PO_SEQ = A2.PO_SEQ
                    -- AND   A1.ORDER_CD = A2.ORDER_CD
                    -- AND   A1.MATL_CD = A2.MATL_CD
                    -- AND   A1.MRP_SEQ= A2.MRP_SEQ
                    -- AND   A1.MATL_SEQ= A2.MATL_SEQ
                    AND (
                        A1.PO_QTY - A1.STOCK_QTY + isnull(A1.MOQ, 0) - A1.IN_QTY
                    ) > 0
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                PO_CD: '',
                PO_SEQ: 0,
                ORDER_CD: '',
                MATL_CD: '',
                MRP_SEQ: 0,
                MATL_SEQ: 0,
                MATL_NAME: '',
                COLOR: '',
                SPEC: '',
                UNIT: '',
                MRP_QTY: 0,
                MRP_QTY1: 0,
                STOCK_QTY: 0,
                MOQ_QTY: 0,
                PO_QTY: 0,
                CURR_CD: '',
                MASTER_PRICE: 0,
                MOQ_PRICE: 0,
                FREIGHT_PRICE: 0,
                OTHER_PRICE: 0,
                SURCHAGE_PRICE: 0,
                PO_PRICE: 0,
                ETC99: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },

        mgrQueryS043401_4_2: async (_, args) => {
            var tSQL = '';

            let sqlStr = `
                SELECT
                    A1.PO_CD,
                    A1.PO_SEQ,
                    A1.ORDER_CD,
                    A1.MATL_CD,
                    A1.MRP_SEQ,
                    A1.MATL_SEQ,
                    A3.MATL_NAME,
                    A3.COLOR,
                    A3.SPEC,
                    A3.UNIT,
                    (
                        A1.PO_QTY - A1.STOCK_QTY + A1.MOQ + isnull(A1.LEFTOVER_QTY, 0)
                    ) as PO_QTY,
                    A6.IN_QTY as STSIN_QTY,
                    A6.IN_DATETIME,
                    (A1.IN_QTY - A1.OUT_QTY) as BAL_QTY,
                    (A1.IN_QTY - A1.OUT_QTY) as OUT_QTY
                FROM
                    KSV_STOCK_MEM A1,
                    KSV_STOCK_IN A6,
                    KSV_PU_MST A5,
                    KSV_PO_MRP A2,
                    KCD_MATL_MST A3,
                    KCD_MATL_MEM A4
                WHERE
                    A1.PU_CD = '${args.data.PU_CD}'
                    AND A1.PU_CD = A6.PU_CD
                    AND A1.PO_CD = A6.PO_CD
                    AND A1.PO_SEQ = A6.PO_SEQ
                    AND A1.ORDER_CD = A6.ORDER_CD
                    AND A1.MATL_CD = A6.MATL_CD
                    AND A1.MRP_SEQ = A6.MRP_SEQ
                    AND A6.IN_QTY > 0
                    AND A6.IN_QTY > A6.OUT_QTY
                    AND A1.PU_CD = A5.PU_CD
                    AND A1.MATL_CD = A3.MATL_CD
                    AND A1.MATL_CD = A4.MATL_CD
                    AND A1.MATL_SEQ = A4.MATL_SEQ
                    AND A1.PO_CD = A2.PO_CD
                    AND A1.PO_SEQ = A2.PO_SEQ
                    AND A1.ORDER_CD = A2.ORDER_CD
                    AND A1.MATL_CD = A2.MATL_CD
                    AND A1.MRP_SEQ = A2.MRP_SEQ
                    AND A1.MATL_SEQ = A2.MATL_SEQ
                    AND A1.IN_QTY > 0
                    AND A1.IN_QTY > A1.OUT_QTY
                order by
                    A1.PO_CD,
                    A1.PO_SEQ
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            return tRet;
        },
    },
};

module.exports = moduleQuery_S043401_4_1;
