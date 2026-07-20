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
const moduleMutation_S0440_5 = {
    Mutation: {
        mgrInsert_S0440_5: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);
            var tYY = `${tRetDate.substring(2, 4)}`;

            var tInput = { ...args.datas };
            tInput.DESC = tInput.DESC.replace(/'/gi, '');
            tInput.REMARK = tInput.REMARK.replace(/'/gi, '');

            var tInput2 = [...args.datas1];
            var tSQLArray = [];

            var sql0 = `
                select
                    isnull(max(right(shipment_cd, 6)), '000000') as stsout_seq
                from
                    ksv_shipment_mst
                where
                    shipment_cd like 'SHIP${tYY}-%'
            `;
            var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            var nMaxSeq = parseInt(nRet0[0].stsout_seq) + 1;

            var tZero = '000000';
            var tNewCd =
                `SHIP${tYY}-` +
                tZero.substring(0, 6 - String(nMaxSeq).length) +
                String(nMaxSeq);

            var gOutSeq = 1;

            var tSrc = '';
            var tDest = '';
            var tInvoiceNo = '';
            var tFactoryCd = '';
            if (tInput.ORIGIN_PORT === 'SHINTS') tSrc = 'S';
            else if (tInput.ORIGIN_PORT === 'BVT') tSrc = 'B';
            else if (tInput.ORIGIN_PORT === 'ETP') tSrc = 'E';
            else if (tInput.ORIGIN_PORT === '3RD') tSrc = 'O';

            if (tInput.DESTINATION === 'SHINTS') {
                tDest = 'S';
                tFactoryCd = 'FC010';
            } else if (tInput.DESTINATION === 'BVT') {
                tDest = 'B';
                tFactoryCd = 'FC034';
            } else if (tInput.DESTINATION === 'TN') {
                tDest = 'B';
                tFactoryCd = 'FC087';
            } else if (tInput.DESTINATION === 'ETP') {
                tDest = 'E';
                tFactoryCd = 'FC044';
            } else if (tInput.DESTINATION === '3RD') {
                tDest = 'O';
                tFactoryCd = 'FC000';
            }

            // tInvoiceNo = `${tSrc}T${tDest}-M${tRetDate.substring(2,4)}-${tRetDate}`;
            tInvoiceNo = '';

            var tOriginPort = tInput.ORIGIN_PORT.toUpperCase();
            var tEtcOriginPort = tInput.ORIGIN_PORT.toUpperCase();
            if (tOriginPort === '3RD') tEtcOriginPort = tInput.ETC_ORIGIN;
            else if (tOriginPort === 'SHINTS') tEtcOriginPort = 'INCHEON';
            else if (tOriginPort === 'BVT') tEtcOriginPort = 'HAIPHONG';
            else if (tOriginPort === 'ETP') tEtcOriginPort = 'SOKHNA';
            if (tInput.ETC_ORIGIN !== '')
                tEtcOriginPort = tInput.ETC_ORIGIN.toUpperCase();

            var tDestination = tInput.DESTINATION.toUpperCase();
            var tEtcDestination = tInput.DESTINATION.toUpperCase();
            if (tDestination === '3RD')
                tEtcDestination = tInput.ETC_DESTINATION.toUpperCase();

            var tInObj = {};
            if (tInput.SHIP_MODE === '4' || tInput.SHIP_MODE === '5' || tInput.SHIP_MODE === '12') {
                tInObj.shipment_cd = tNewCd;
            } else {
                tInObj.shipment_cd = '';
            }


            var tTime = new Date();
            var tSeq = tTime.getTime();
                tSeq = String(tSeq);
                tSeq = tSeq.slice(-5);

            tInObj.stsout_cd = `SOTMP-${tRetDate}-${tSeq}`;
            tInObj.is_stsout = '';
            tInObj.invoice_no = tInvoiceNo;
            tInObj.trade_term = '';
            tInObj.ready_date = tInput.SHIP_DATE;
            tInObj.origin_port = tOriginPort;
            tInObj.destination = tDestination;
            tInObj.ship_mode = tInput.SHIP_MODE;
            tInObj.ship_date = tInput.SHIP_DATE;
            tInObj.ct_qty = tInput.CT_NO;
            tInObj.weight = tInput.WEIGHT;
            tInObj.cbm = tInput.CBM;
            tInObj.sendor = tInput.SENDER;
            tInObj.receiver = tInput.RECEIVER;
            tInObj.buyer = tInput.BUYER_CD;
            tInObj.description = tInput.DESC;
            tInObj.remark = tInput.REMARK;
            tInObj.bl_no = tInput.BL_NO;
            tInObj.target_eta = tInput.TARGET_ETA;
            tInObj.amount = tInput.AMOUNT;
            tInObj.payment = tInput.PAYMENT;
            tInObj.org_destination = tEtcDestination;
            tInObj.org_origin_port = tEtcOriginPort;
            tInObj.reg_user = tUserInfo.USER_ID;
            tInObj.reg_datetime = tRetDate;
            let tSQL99 = AFLib.createTableSql('ksv_shipment_mem', tInObj);
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            if (tInput.SHIP_MODE === '4' || tInput.SHIP_MODE === '5' || tInput.SHIP_MODE === '12') {
                // FEDEX, DHL, UPS
                var tPlaceCd = '0';

                var wRemark = tInput.REMARK;
                var sqlShipment = `
                    select
                        *
                    from
                        ksv_shipment_mst
                    where
                        remark = '${tInput.REMARK}'
                `;
                var retShipment = await prisma.$queryRaw(
                    Prisma.raw(sqlShipment),
                );
                if (retShipment.length > 0) {
                    wRemark = `${wRemark}-AF-${tRetDate}`;
                }

                let tSQL99 = `
                    insert into
                        ksv_shipment_mst (
                            shipment_cd,
                            ship_mode,
                            place_cd,
                            origin_port,
                            bl_no,
                            etd,
                            eta,
                            container_no,
                            reg_user,
                            reg_datetime,
                            status_cd,
                            destination,
                            is_singapore,
                            cost,
                            ship_line,
                            org_origin_port,
                            org_destination,
                            fix_flag,
                            remark
                        )
                    values
                        (
                            '${tNewCd}',
                            '${tInput.SHIP_MODE}',
                            '${tPlaceCd}',
                            '${tOriginPort}',
                            '${tInput.BL_NO}',
                            '${tInput.SHIP_DATE}',
                            '${tInput.TARGET_ETA}',
                            '',
                            '${tUserInfo.USER_ID}',
                            '${tRetDate}',
                            '1',
                            '${tDestination}',
                            '0',
                            '0',
                            '',
                            '${tOriginPort}',
                            '${tDestination}',
                            '1',
                            '${wRemark}'
                        )
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            }

            // SHIP_MODE: 1(FCL), 2(LCL), 3:AIR, 4:FEDEX, 5:DHL, 6:Express, 7:Hand
            // Delivery Mode:
            var m_AirCharge = 0;
            var m_ExpressCharge = 0;
            if (tInput.SHIP_MODE === '6' || tInput.SHIP_MODE === '3') {
                let tSql0 = `
                    SELECT
                        charge
                    FROM
                        kzz_freight_charge
                    WHERE
                        frt_type = '4'
                        and reg_datetime = (
                            select
                                max(reg_datetime)
                            from
                                kzz_freight_charge
                            where
                                frt_type = '4'
                        )
                `;
                var nRet0 = await prisma.$queryRaw(Prisma.raw(tSql0));
                if (nRet0.length > 0)
                    m_ExpressCharge = parseFloat(nRet0[0].charge);

                let tSql0 = `
                    SELECT
                        charge
                    FROM
                        kzz_freight_charge
                    WHERE
                        frt_type = '3'
                        and reg_datetime = (
                            select
                                max(reg_datetime)
                            from
                                kzz_freight_charge
                            where
                                frt_type = '3'
                        )
                `;
                var nRet0 = await prisma.$queryRaw(Prisma.raw(tSql0));
                if (nRet0.length > 0) m_AirCharge = parseFloat(nRet0[0].charge);
            }

            var m_FrtType = '';
            var m_AreaType = '';
            var m_Weight = tInput.WEIGHT;
            var m_Weight_Gross = tInput.WEIGHT;
            var m_Amount = tInput.AMOUNT;
            var m_BLNo = tInput.BL_NO;
            var m_InvoiceNo = '';
            var m_BuyerCd = '';
            var tDeliveryType = tInput.SHIP_MODE;
            var m_adp_check = '0';
            if (tInput.SHIP_MODE === '6') {
                // Express
                m_FrtType = '4';
                m_AreaType = '2';
                m_adp_check = '1';
            } else if (tDeliveryType === '7') {
                // Hand
                m_FrtType = '41';
                m_AreaType = '2';
            } else if (tDeliveryType === '5') {
                /// DHL
                m_FrtType = '5';
                m_AreaType = '2';
            } else if (tDeliveryType === 'A') {
                // ADC
                m_FrtType = 'A';
                m_AreaType = '2';
            } else if (tDeliveryType === '31') {
                // AIR(Third)
                m_FrtType = '31';
                m_AreaType = '3';
            } else if (tDeliveryType === '42') {
                // Express(Thired)
                m_adp_check = '1';
                m_FrtType = '42';
                m_AreaType = '3';
            } else if (tDeliveryType === '43') {
                // Express(Thired)
                m_adp_check = '1';
                m_FrtType = '43';
                m_AreaType = '3';
            } else {
                m_FrtType = '3';
                m_AreaType = '2';
            }

            m_Weight = parseFloat(tInput.WEIGHT);
            m_Weight_Gross = parseFloat(tInput.WEIGHT);

            if (tInput.SHIP_MODE === '6') {
                m_Amount = m_Weight * m_ExpressCharge;
            } else if (tInput.SHIP_MODE === '3') {
                m_Amount = m_Weight * m_AirCharge;
            }
            if (tInput.AMOUNT) m_Amount = parseFloat(tInput.AMOUNT);

            // BL_NO는 구버전의 Pack_cd 에 해당
            m_BLNo = tInput.BL_NO;
            // m_InvoiceNo = tInObj.stsout_cd;
            m_InvoiceNo = '';
            var m_STSOUT_CD = tInObj.stsout_cd;

            var mChargeKind = '3';
            var mChargeCode = '02';
            var mDelayReason = '12';
            var mDestination = tFactoryCd;

            if (tInput2.length <= 0) {
                let tSQL99 = `
                    INSERT INTO
                        KZZ_FREIGHT (
                            FRT_DATE,
                            TRADE_TYPE,
                            departure,
                            destination,
                            FRT_TYPE,
                            AREA_TYPE,
                            MATL_TYPE,
                            PO_CD,
                            ORDER_CD,
                            STYLE_CD,
                            MATL_CD,
                            unit,
                            price,
                            mw,
                            garment_compo,
                            qty,
                            SENDER,
                            RECEIVER,
                            SPEC,
                            REMARK,
                            po_seq,
                            mrp_seq,
                            in_datetime,
                            REG_USER,
                            REG_DATETIME,
                            DELAY_REASON,
                            weight,
                            weight_net,
                            amount,
                            net,
                            vat,
                            adp_check,
                            bl_no,
                            invoice_no,
                            charge_kind,
                            charge_code,
                            buyer_cd,
                            stsout_cd
                        )
                    VALUES
                        (
                            '${tInput.SHIP_DATE}',
                            '1',
                            '00',
                            '${mDestination}',
                            '${m_FrtType}',
                            '${m_AreaType}',
                            'M',
                            '${tInput.PO_CD}',
                            '${tInput.ORDER_CD}',
                            '',
                            '',
                            '',
                            '',
                            '',
                            '',
                            '1',
                            '${tInput.SENDER}',
                            '${tInput.RECEIVER}',
                            '${tInput.DESC}',
                            '${tInput.REMARK}',
                            0,
                            0,
                            '',
                            '${tUserInfo.USER_ID}',
                            '${tRetDate}',
                            '${mDelayReason}',
                            ${m_Weight},
                            '${m_Weight_Gross}',
                            '${m_Amount}',
                            '0',
                            '0',
                            '${m_adp_check}',
                            '${m_BLNo}',
                            '${m_InvoiceNo}',
                            '${mChargeKind}',
                            '${mChargeCode}',
                            '${tInput.BUYER_CD}',
                            '${m_STSOUT_CD}'
                        )
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            } else {
                var tIdx1 = 0;
                for (tIdx1 = 0; tIdx1 < tInput2.length; tIdx1++) {
                    var tOne = { ...tInput2[tIdx1] };

                    let tSql0 = `
                        select
                            *
                        from
                            kcd_matl_mem
                        where
                            matl_cd = '${tOne.MATL_CD}'
                        order by
                            matl_seq desc
                    `;
                    var nRet0 = await prisma.$queryRaw(Prisma.raw(tSql0));
                    var tMatlSeq = 0;
                    var tMatlPrice = 0;
                    if (nRet0.length > 0) {
                        tMatlSeq = parseFloat(nRet0[0].MATL_SEQ);
                        tMatlPrice = parseFloat(nRet0[0].MATL_PRICE);
                    }

                    let tSql0 = `
                        select
                            isnull(weight, 0) as weight
                        from
                            kcd_matl_mst
                        where
                            matl_cd = '${tOne.MATL_CD}'
                    `;
                    var nRet0 = await prisma.$queryRaw(Prisma.raw(tSql0));
                    var tMatlWeight = 0;
                    if (nRet0.length > 0)
                        tMatlWeight =
                            parseFloat(nRet0[0].weight) *
                            parseFloat(tOne.PO_QTY) *
                            0.001;

                    var tOutObj = {};
                    tOutObj.po_cd = tInput.PO_CD;
                    tOutObj.po_seq = '1';
                    tOutObj.order_cd = tInput.ORDER_CD;
                    tOutObj.matl_cd = tOne.MATL_CD;
                    tOutObj.mrp_seq = '0';
                    tOutObj.matl_seq = tMatlSeq;
                    tOutObj.in_datetime = '';
                    tOutObj.out_datetime = `${tRetDate}${gOutSeq}`;
                    gOutSeq += 1;
                    tOutObj.out_qty = tOne.PO_QTY;
                    tOutObj.out_type = '';
                    tOutObj.out_status = '0';
                    tOutObj.pack_cd = '';
                    tOutObj.delivery_type = m_FrtType;
                    tOutObj.ship_date = tRetDate1;
                    tOutObj.ct_qty = tInput.CT_NO;
                    tOutObj.ct_no = `box_${tInObj.stsout_cd}`;
                    tOutObj.remark = tInput.REMARK;
                    tOutObj.out_factory_cd = tFactoryCd;
                    tOutObj.status_cd = '0';
                    tOutObj.reg_user = tUserInfo.USER_ID;
                    tOutObj.reg_datetime = tRetDate;
                    tOutObj.pu_cd = '';
                    tOutObj.stsout_cd = tInObj.stsout_cd;
                    tOutObj.invoice_no = '';
                    tOutObj.trade_term = '';
                    tOutObj.ready_date = tRetDate1;
                    tOutObj.origin_port = tOriginPort;
                    tOutObj.weight = tMatlWeight;
                    tOutObj.cbm = tInput.CBM;
                    tOutObj.destination = tDestination;
                    tOutObj.eta = '';
                    tOutObj.stsin_cd = '';
                    tOutObj.in_price = '0';
                    tOutObj.delivery_amt = '0';
                    let tSQL99 = AFLib.createTableSql('ksv_stock_out', tOutObj);
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    var tAmount = parseFloat(tOne.PO_QTY) * tMatlPrice;
                    let tSQL99 = `
                        INSERT INTO
                            KZZ_FREIGHT (
                                FRT_DATE,
                                TRADE_TYPE,
                                departure,
                                destination,
                                FRT_TYPE,
                                AREA_TYPE,
                                MATL_TYPE,
                                PO_CD,
                                ORDER_CD,
                                STYLE_CD,
                                MATL_CD,
                                unit,
                                price,
                                mw,
                                garment_compo,
                                qty,
                                SENDER,
                                RECEIVER,
                                SPEC,
                                REMARK,
                                po_seq,
                                mrp_seq,
                                in_datetime,
                                REG_USER,
                                REG_DATETIME,
                                DELAY_REASON,
                                weight,
                                weight_net,
                                amount,
                                net,
                                vat,
                                adp_check,
                                bl_no,
                                invoice_no,
                                charge_kind,
                                charge_code,
                                buyer_cd,
                                stsout_cd
                            )
                        VALUES
                            (
                                '${tInput.SHIP_DATE}',
                                '1',
                                '00',
                                '${mDestination}',
                                '${m_FrtType}',
                                '${m_AreaType}',
                                'M',
                                '${tInput.PO_CD}',
                                '${tInput.ORDER_CD}',
                                '',
                                '${tOne.MATL_CD}',
                                '${tOne.UNIT}',
                                '${tMatlPrice}',
                                '',
                                '',
                                '${tOne.PO_QTY}',
                                '${tInput.SENDER}',
                                '${tInput.RECEIVER}',
                                '${tInput.DESC}',
                                '${tInput.REMARK}',
                                0,
                                0,
                                '',
                                '${tUserInfo.USER_ID}',
                                '${tRetDate}',
                                '${mDelayReason}',
                                ${tMatlWeight},
                                '${tMatlWeight}',
                                '${tAmount}',
                                '0',
                                '0',
                                '${m_adp_check}',
                                '${m_BLNo}',
                                '${m_InvoiceNo}',
                                '${mChargeKind}',
                                '${mChargeCode}',
                                '${tInput.BUYER_CD}',
                                '${m_STSOUT_CD}'
                            )
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
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
                tObj.CODE = 'SUCCEED:Insert Freight';
                tObj.id = 0;
                tRetArray.push(tObj);
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Insert Freight';
                tObj.id = 0;
                tRetArray.push(tObj);
            }
            return tRetArray;
        },
        mgrUpdate_S0440_5: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);
            var tYY = `${tRetDate.substring(2, 4)}`;

            var tInput = { ...args.datas };
            tInput.DESC = tInput.DESC.replace(/'/gi, '');
            tInput.REMARK = tInput.REMARK.replace(/'/gi, '');

            var tSQLArray = [];

            var tNewCd = tInput.STSOUT_CD;

            var sql0 = `
                select
                    *
                from
                    ksv_shipment_mem
                where
                    stsout_cd = '${tInput.STSOUT_CD}'
            `;
            var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            var tShipmentMem = { ...nRet0[0] };

            var tSrc = '';
            var tDest = '';
            var tInvoiceNo = '';
            if (tInput.ORIGIN_PORT === 'SHINTS') tSrc = 'S';
            else if (tInput.ORIGIN_PORT === 'BVT') tSrc = 'B';
            else if (tInput.ORIGIN_PORT === 'ETP') tSrc = 'E';
            else if (tInput.ORIGIN_PORT === '3RD') tSrc = 'O';
            if (tInput.DESTINATION === 'SHINTS') tDest = 'S';
            else if (tInput.DESTINATION === 'BVT') tDest = 'B';
            else if (tInput.DESTINATION === 'ETP') tDest = 'E';
            else if (tInput.DESTINATION === '3RD') tDest = 'O';
            tInvoiceNo = `${tSrc}T${tDest}-M${tRetDate.substring(2, 4)}-${tRetDate}`;

            var tOriginPort = tInput.ORIGIN_PORT.toUpperCase();
            var tEtcOriginPort = tInput.ORIGIN_PORT.toUpperCase();
            if (tOriginPort === '3RD') tEtcOriginPort = tInput.ETC_ORIGIN;
            else if (tOriginPort === 'SHINTS') tEtcOriginPort = 'INCHEON';
            else if (tOriginPort === 'BVT') tEtcOriginPort = 'HAIPHONG';
            else if (tOriginPort === 'ETP') tEtcOriginPort = 'SOKHNA';
            if (tInput.ETC_ORIGIN !== '')
                tEtcOriginPort = tInput.ETC_ORIGIN.toUpperCase();

            var tDestination = tInput.DESTINATION.toUpperCase();
            var tEtcDestination = tInput.DESTINATION.toUpperCase();
            if (tDestination === '3RD')
                tEtcDestination = tInput.ETC_DESTINATION.toUpperCase();

            var tShipModeFlag = 0;
            if (tInput.SHIP_MODE === '4' || tInput.SHIP_MODE === '5') {
                if (
                    tShipmentMem.SHIP_MODE !== '4' &&
                    tShipmentMem.SHIP_MODE !== '5'
                )
                    tShipModeFlag = 1; // New
            } else {
                if (
                    tShipmentMem.SHIP_MODE !== '4' &&
                    tShipmentMem.SHIP_MODE !== '5'
                )
                    tShipModeFlag = 0; // No Change
                else tShipModeFlag = 2; // Delete
            }

            var tInObj = {};
            if (tShipModeFlag === 1) {
                tInObj.shipment_cd = tNewCd;
            } else {
                tInObj.shipment_cd = '';
            }
            // tInObj.stsout_cd = `SOTMP-${tRetDate}`;
            // tInObj.is_stsout = '';
            // tInObj.invoice_no = tInvoiceNo;
            tInObj.trade_term = '';
            tInObj.ready_date = tInput.SHIP_DATE;
            tInObj.origin_port = tOriginPort;
            tInObj.destination = tDestination;
            tInObj.ship_mode = tInput.SHIP_MODE;
            tInObj.ship_date = tInput.SHIP_DATE;
            tInObj.ct_qty = tInput.CT_NO;
            tInObj.weight = tInput.WEIGHT;
            tInObj.cbm = tInput.CBM;
            tInObj.sendor = tInput.SENDER;
            tInObj.receiver = tInput.RECEIVER;
            tInObj.buyer = tInput.BUYER_CD;
            tInObj.description = tInput.DESC;
            tInObj.remark = tInput.REMARK;
            tInObj.bl_no = tInput.BL_NO;
            tInObj.target_eta = tInput.TARGET_ETA;
            tInObj.amount = tInput.AMOUNT;
            tInObj.payment = tInput.PAYMENT;
            tInObj.org_destination = tEtcDestination;
            tInObj.org_origin_port = tEtcOriginPort;
            // tInObj.reg_user  =  tUserInfo.USER_ID;
            // tInObj.reg_datetime  =  tRetDate;
            let tSQL99 = AFLib.updateTableSql('ksv_shipment_mem', tInObj);
            tSQL99 += `
               where stsout_cd = '${tInput.STSOUT_CD}'
               `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            if (tShipModeFlag === 1) {
                // FEDEX, DHL

                var tPlaceCd = '0';
                let tSQL99 = `
                    insert into
                        ksv_shipment_mst (
                            shipment_cd,
                            ship_mode,
                            place_cd,
                            origin_port,
                            bl_no,
                            etd,
                            eta,
                            container_no,
                            reg_user,
                            reg_datetime,
                            status_cd,
                            destination,
                            is_singapore,
                            cost,
                            ship_line,
                            org_origin_port,
                            org_destination,
                            fix_flag
                        )
                    values
                        (
                            '${tNewCd}',
                            '${tInput.SHIP_MODE}',
                            '${tPlaceCd}',
                            '${tOriginPort}',
                            '${tInput.BL_NO}',
                            '${tInput.SHIP_DATE}',
                            '${tInput.TARGET_ETA}',
                            '',
                            '${tUserInfo.USER_ID}',
                            '${tRetDate}',
                            '0',
                            '${tDestination}',
                            '0',
                            '0',
                            '',
                            '${tOriginPort}',
                            '${tDestination}',
                            '1'
                        )
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            }

            if (tShipModeFlag === 1) {
                // FEDEX, DHL
                let tSQL99 = `
                    delete from ksv_shipment_msg
                    where
                        shipment_cd = '${tShipmentMem.SHIPMENT_CD}'
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
                tObj.CODE = 'SUCCEED:Update Freight';
                tObj.id = 0;
                tRetArray.push(tObj);
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Update Freight';
                tObj.id = 0;
                tRetArray.push(tObj);
            }
            return tRetArray;
        },
        mgrDelete_S0440_5: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tSQLArray = [];

            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var tOne = { ...args.datas[tIdx] };

                let sql0 = `
                    select
                        isnull(shipment_cd, '') as shipment_cd,
                        isnull(ship_mode, '') as ship_mode
                    from
                        ksv_shipment_mem
                    where
                        stsout_cd = '${tOne.STSOUT_CD}'
                `;
                var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                var tSQL = '';
                var tSelObj = {};
                if (nRet0.length > 0) {
                    tSelObj = { ...nRet0[0] };
                    if (tSelObj.ship_mode === '4' || tSelObj.ship_mode === '5');
                    else
                        tSQL = ` and   (shipment_cd is null or shipment_cd = '')  `;
                }

                if (tSelObj.ship_mode === '4' || tSelObj.ship_mode === '5') {
                    let tSQL99 = `
                        delete from ksv_shipment_mst
                        where
                            shipment_cd in (
                                select
                                    shipment_cd
                                from
                                    ksv_shipment_mem
                                where
                                    stsout_cd = '${tOne.STSOUT_CD}'
                            )
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }

                let tSQL99 = `
                    delete from ksv_shipment_mem
                    where
                        stsout_cd = '${tOne.STSOUT_CD}' ${tSQL}
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
                tObj.CODE = 'SUCCEED:Delete Freight';
                tObj.id = 0;
                tRetArray.push(tObj);
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Delete Freight';
                tObj.id = 0;
                tRetArray.push(tObj);
            }
            return tRetArray;
        },
    },
};

export default moduleMutation_S0440_5;
