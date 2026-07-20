// MGR_@@TNAME@@.mutations.js

import * as fs from 'fs';
import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
const moment = require('moment'); // 날짜 처리 라이브러리

/*
                STD_FLAG: String 
                NET: String 
                LOSS: String 
                USE_SIZE: String STANDBY
                REMARK: String 

*/

// export default로 Mutation 내용 내보내기
const moduleMutation_S0433_5 = {
    Mutation: {
        mgrInsert_S0433_5: async (_, args, contextValue) => {
            // mgrInsert_SHIPMENT

            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);
            var tYY = `${tRetDate.substring(2, 4)}`;

            var tInput = {
                ...args.datas,
            };
            var tInput1 = {
                ...args.datas1[0],
            };

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

            var tIdx1 = 0;
            var tStsOuts = [];

            var tDeliveryType = '2';
            if (tInput.SHIP_MODE === '1')
                tDeliveryType = '2'; //  FCL
            else if (tInput.SHIP_MODE === '11')
                tDeliveryType = '2'; // LCL
            else if (tInput.SHIP_MODE === '2')
                tDeliveryType = '2'; // LCL
            else if (tInput.SHIP_MODE === '3')
                tDeliveryType = '1'; // AIR
            else if (tInput.SHIP_MODE === '4')
                tDeliveryType = 'F'; // FEDEX
            else if (tInput.SHIP_MODE === '5')
                tDeliveryType = 'D'; // DHL
            else if (tInput.SHIP_MODE === '6')
                tDeliveryType = '7'; // EXPRESS
            else if (tInput.SHIP_MODE === '7')
                tDeliveryType = '6'; // Handcarry
            else if (tInput.SHIP_MODE === '8')
                tDeliveryType = '42'; // Handcarry
            else if (tInput.SHIP_MODE === '9')
                tDeliveryType = '43'; // Handcarry
            else if (tInput.SHIP_MODE === '10') tDeliveryType = '8'; // Handcarry

            var tDeliveryType1 = 'SEA';
            if (tDeliveryType === '2')
                tDeliveryType1 = 'SEA'; //  FCL
            else if (tDeliveryType === '1')
                tDeliveryType1 = 'AIR'; // AIR
            else if (tDeliveryType === 'F')
                tDeliveryType1 = 'FEDEX'; // FEDEX
            else if (tDeliveryType === 'D')
                tDeliveryType1 = 'DHL'; // DHL
            else if (tDeliveryType === '7')
                tDeliveryType1 = 'EXPRESS'; // EXPRESS
            else if (tDeliveryType === '6') tDeliveryType1 = 'Handcarry'; // Handcarry

            var tFromType = '';
            if (
                tInput.ORIGIN_PORT.toUpperCase() === 'KOREA' ||
                tInput.ORIGIN_PORT.toUpperCase() === 'SEOUL' ||
                tInput.ORIGIN_PORT.toUpperCase() === 'INCHEON' ||
                tInput.ORIGIN_PORT.toUpperCase() === 'BUSAN'
            )
                tFromType = 'S';
            else tFromType = 'O';

            var tToType = tInput.DESTINATION.substring(0, 1);
            var tOutDate = tRetDate.substring(2, 4);
            var tPackCd = `${tFromType}T${tToType}-${tDeliveryType1}${tRetDate}`;
            if (!tInput.REMARK);
            else tPackCd = tInput.REMARK;

            if (tInput.REMARK) {
                var sql0_1 = `
                    select
                        *
                    from
                        ksv_shipment_mst
                    where
                        ltrim(rtrim(remark)) = '${tInput.REMARK.trim()}'
                `;
                var nRet0_1 = await prisma.$queryRaw(Prisma.raw(sql0_1));
                if (nRet0_1.length > 0) {
                    /*
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = `ERROR:Shipment Reg:Remark already in use. Please use another remark.`;
                    tObj.id = 0; 
                    tRetArray.push(tObj);
                    return (tRetArray);
                    */
                    tInput.REMARK = `${tInput.REMARK}-AF-${tRetDate}`;
                }
            }

            var sql0 = `
                select
                    isnull(max(left(pack_cd, 11)), '00000000000') as max_seq
                from
                    ksv_stock_out
                where
                    pack_cd like '${tPackCd}%'
            `;
            var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            var nMaxStr = nRet0[0].max_seq;
            var tMaxSeq = parseInt(nMaxStr.substring(8, 11)) + 1;
            var tSeqStr = AFLib.printF(tMaxSeq, 3);
            // tPackCd += tSeqStr;

            for (tIdx1 = 0; tIdx1 < args.datas1.length; tIdx1++) {
                var col = {
                    ...args.datas1[tIdx1],
                };
                var tOrigin = tInput.ORIGIN_PORT;
                var tDestination = tInput.DESTINATION;

                if (tInput.IS_SINGAPORE === '1') {
                    tDestination = 'SINGAPORE';
                }

                tStsOuts.push(col.STSOUT_CD);

                var tTmpSql = '';

                var sql1 = `
                    select
                        *
                    from
                        ksv_shipment_mem
                    where
                        stsout_cd = '${col.STSOUT_CD}'
                        and (
                            shipment_cd is null
                            or shipment_cd = ''
                        )
                `;
                var nRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                if (nRet1.length <= 0) {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = `ERROR:stsout_cd is not find. Contact IT Team(${col.STSOUT_CD})`;
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }
                if (nRet1.length > 1) {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = `ERROR:stsout_cd is wrong. Contact IT Team(${col.STSOUT_CD}/${nRet1.length})`;
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }
                var tSelObj = {
                    ...nRet1[0],
                };
                if (tSelObj.SHIPMENT_CD) {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = `ERROR:This shipment has already been registered. (${tSelObj.SHIPMENT_CD}/${col.STSOUT_CD})`;
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }

                var tOrgOrigin = tSelObj.ORG_ORIGIN_PORT;
                var tOrgDestination = tSelObj.ORG_DESTINATION;
                if (tInput.ORIGIN_PORT !== 'SINGAPORE') {
                    tOrgOrigin = tInput.ORIGIN_PORT;
                    tOrgDestination = tInput.DESTINATION;
                }

                let tSQL99 = `
                    update ksv_shipment_mem
                    set
                        shipment_cd = '${tNewCd}',
                        ship_mode = '${tInput.SHIP_MODE}',
                        ship_date = '${tInput.ETD}',
                        origin_port = '${tInput.ORIGIN_PORT}',
                        destination = '${tDestination}',
                        org_origin_port = '${tOrgOrigin}',
                        org_destination = '${tOrgDestination}',
                        bl_no = '${tInput.BL_NO}',
                        invoice_no = '${tInput.INVOICE_NO}'
                    where
                        1 = 1
                        and stsout_cd = '${col.STSOUT_CD}'
                        and (
                            shipment_cd is null
                            or shipment_cd = ''
                        )
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                var wBL_NO = '';
                if (!tInput.BL_NO) wBL_NO = tPackCd;
                else wBL_NO = tInput.BL_NO;

                if (tInput.ORIGIN_PORT === 'SINGAPORE') {
                    let tSQL99 = `
                        update kzz_freight
                        set
                            bl_no_singapore = '${wBL_NO}',
                            invoice_no_singapore = '${tPackCd}'
                        where
                            stsout_cd = '${col.STSOUT_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
                        update ksv_stock_out
                        set
                            pack_cd2 = pack_cd
                        where
                            stsout_cd = '${col.STSOUT_CD}'
                            and (
                                pack_cd2 is null
                                or pack_cd2 = ''
                            )
                            and (
                                pack_cd is not null
                                and pack_cd <> ''
                            )
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
                        update ksv_stock_out
                        set
                            shipment_cd = '${tNewCd}',
                            delivery_type = '${tDeliveryType}',
                            ct_no = '${tInput.CONTAINER_NO}',
                            pack_cd_singapore = '${tPackCd}'
                        where
                            stsout_cd = '${col.STSOUT_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                } else {
                    let tSQL99 = `
                        update kzz_freight
                        set
                            bl_no = '${wBL_NO}',
                            invoice_no = '${tPackCd}'
                        where
                            stsout_cd = '${col.STSOUT_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
                        update ksv_stock_out
                        set
                            pack_cd2 = pack_cd
                        where
                            stsout_cd = '${col.STSOUT_CD}'
                            and (
                                pack_cd2 is null
                                or pack_cd2 = ''
                            )
                            and (
                                pack_cd is not null
                                and pack_cd <> ''
                            )
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
                        update ksv_stock_out
                        set
                            shipment_cd = '${tNewCd}',
                            delivery_type = '${tDeliveryType}',
                            ct_no = '${tInput.CONTAINER_NO}',
                            pack_cd = '${tPackCd}'
                        where
                            stsout_cd = '${col.STSOUT_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }

                if (tInput.IS_SINGAPORE !== '1') continue;

                var tInObj = {};
                tInObj.shipment_cd = '';
                tInObj.stsout_cd = tSelObj.STSOUT_CD;
                tInObj.is_stsout = tSelObj.IS_STSOUT;
                tInObj.invoice_no = tSelObj.INVOICE_NO;
                tInObj.trade_term = tSelObj.TRADE_TERM;
                tInObj.ready_date = tInput1.TARGET_ETA;
                tInObj.origin_port = 'SINGAPORE';
                tInObj.destination = tSelObj.DESTINATION;
                tInObj.ship_mode = '';
                tInObj.ship_date = '';
                tInObj.ct_qty = tSelObj.CT_QTY;
                tInObj.weight = tSelObj.WEIGHT;
                tInObj.cbm = tSelObj.CBM;
                tInObj.sendor = tSelObj.SENDOR;
                tInObj.receiver = tSelObj.RECEIVER;
                tInObj.buyer = tSelObj.BUYER;
                tInObj.description = tSelObj.DESCRIPTION;
                tInObj.remark = tSelObj.REMARK;
                tInObj.bl_no = '';
                tInObj.target_eta = tSelObj.TARGET_ETA;
                tInObj.amount = tSelObj.AMOUNT;
                tInObj.payment = tSelObj.PAYMENT;
                tInObj.org_destination = tOrgDestination;
                tInObj.org_origin_port = tOrgOrigin;
                let tSQL99 = AFLib.createTableSql('ksv_shipment_mem', tInObj);
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            }

            var tOrgPort = tInput.ORIGIN_PORT;
            var tDestination = tInput.DESTINATION;
            var tOrgDestination = tInput.DESTINATION;

            if (tInput.IS_SINGAPORE === '1') {
                tOrgPort = tInput.ORIGIN_PORT;
                tDestination = 'SINGAPORE';
            }

            var tRemark = tInput.REMARK;
            var tRemark2 = '';
            if (tInput.REMARK === '') {
                tRemark = tPackCd;
                tRemark2 = tPackCd;
            } else {
                tRemark2 = tPackCd;
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
                        remark,
                        remark2,
                        target_eta,
                        invoice_no
                    )
                values
                    (
                        '${tNewCd}',
                        '${tInput.SHIP_MODE}',
                        '${tInput.PLACE_CD}',
                        '${tInput.ORIGIN_PORT}',
                        '${tInput.BL_NO}',
                        '${tInput.ETD}',
                        '${tInput.ETA}',
                        '${tInput.CONTAINER_NO}',
                        '${tUserInfo.USER_ID}',
                        '${tRetDate}',
                        '0',
                        '${tDestination}',
                        '${tInput.IS_SINGAPORE}',
                        '${tInput.COST}',
                        '${tInput.SHIP_LINE}',
                        '${tInput.ORIGIN_PORT}',
                        '${tInput.DESTINATION}',
                        '${tRemark}',
                        '${tRemark2}',
                        '${tInput.ETA_T}',
                        '${tInput.INVOICE_NO}'
                    )
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            var sql90 = `
                select
                    *
                from
                    ksv_blno_mst
                where
                    bl_no = '${tInput.BL_NO}'
            `;
            var nRet90 = await prisma.$queryRaw(Prisma.raw(sql90));

            if (nRet90.length <= 0 && tInput.SHIP_LINE !== '') {
                let tSQL99 = `
                    insert into
                        ksv_blno_mst (bl_no, ship_line, container_no)
                    values
                        ('${tInput.BL_NO}', '${tInput.SHIP_LINE}', '${tInput.CONTAINER_NO}')
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    delete ksv_tradlinx
                    where
                        bl_no = '${tInput.BL_NO}'
                `;
                tSQLArray.push(prisma.$queryRaw(Prisma.raw(tSQL99)));

                if (
                    tInput.SHIP_LINE &&
                    ![
                        'TRUCK',
                        'FEDEX',
                        'DHL',
                        'UPS',
                        'AIR',
                        'EXPRESS',
                        'Handcarry',
                        'EXPRESS(3rd)',
                        'EXPRESS(Pick-up)',
                    ].includes(tInput.SHIP_LINE)
                ) {
                    let tSQL99 = `
                        insert into
                            ksv_tradlinx (bl_no, line_cd, tracking_status, update_datetime)
                        values
                            (
                                '${tInput.BL_NO}',
                                '${tInput.SHIP_LINE}',
                                'REGIST',
                                '${moment().format('YYYYMMDDHHmmss')}'
                            )
                    `;
                    tSQLArray.push(prisma.$queryRaw(Prisma.raw(tSQL99)));
                }

                var sql90_sub = '';
                tStsOuts.forEach((col, i) => {
                    if (i === 0) sql90_sub = ` '${col}' `;
                    else sql90_sub += ` ,'${col}' `;
                });

                var sql91 = `
                    select distinct
                        b.po_cd2
                    from
                        ksv_stock_out_mst a,
                        ksv_pu_mst2 b
                    where
                        a.stsout_cd in (${sql90_sub})
                        and a.pu_cd = b.pu_cd
                `;
                var nRet91 = await prisma.$queryRaw(Prisma.raw(sql90));

                var tIdx2 = 0;
                for (tIdx2 = 0; tIdx2 < nRet91.length; tIdx2++) {
                    var tOne = {
                        ...nRet91[tIdx2],
                    };
                    let tSQL99 = `
                        insert into
                            ksv_blno_mem (bl_no, po_cd)
                        values
                            ('${tInput.BL_NO}', '${tOne.po_cd2}')
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

        mgrInsert_S0433_5_ADD_SHIP: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput = {
                ...args.datas,
            };

            var sql90 = `
                select
                    *
                from
                    ksv_shipment_mst
                where
                    shipment_cd = '${tInput.SHIPMENT_CD}'
            `;
            var nRet90 = await prisma.$queryRaw(Prisma.raw(sql90));
            var tShipmentMst = {
                ...nRet90[0],
            };
            tInput.IS_SINGAPORE = tShipmentMst.IS_SINGAPORE;

            /*
            if (tInput.SHIP_MODE === '' ||
                tInput.ETD === '' ||
                tInput.ORIGIN_PORT === '') {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = `ERROR:Add Ship:Ship Mode, Etd, Origin Port는 필수입니다`;
                tObj.id = 0; 
                tRetArray.push(tObj);
                return (tRetArray);
            }
            */

            var tSQLArray = [];

            var tNewCd = tInput.SHIPMENT_CD;
            if (
                typeof tInput.SHIPMENT_CD === 'undefined' ||
                tInput.SHIPMENT_CD === null ||
                tInput.SHIPMENT_CD === ''
            ) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Shipment Cd을 Check하세요';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tIdx1 = 0;
            for (tIdx1 = 0; tIdx1 < args.datas1.length; tIdx1++) {
                var col = {
                    ...args.datas1[tIdx1],
                };
                var tOrigin = tInput.ORIGIN_PORT;
                var tDestination = tInput.DESTINATION;

                var sql1 = `
                    select
                        *
                    from
                        ksv_shipment_mem
                    where
                        stsout_cd = '${col.STSOUT_CD}'
                        and (
                            shipment_cd is null
                            or shipment_cd = ''
                        )
                `;
                var nRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                if (nRet1.length <= 0) {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = `ERROR:stsout_cd is not find. Contact IT Team(${col.STSOUT_CD})`;
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }
                if (nRet1.length > 1) {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = `ERROR:stsout_cd is wrong. Contact IT Team(${col.STSOUT_CD}/${nRet1.length})`;
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }
                var tSelObj = {
                    ...nRet1[0],
                };
                if (tSelObj.SHIPMENT_CD) {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = `ERROR:This shipment has already been registered. (${tSelObj.SHIPMENT_CD}/${col.STSOUT_CD})`;
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }

                if (tInput.IS_SINGAPORE === '1') {
                    tDestination = 'SINGAPORE';
                }

                let tSQL99 = `
                    update ksv_shipment_mem
                    set
                        shipment_cd = '${tNewCd}',
                        ship_mode = '${tInput.SHIP_MODE}',
                        ship_date = '${tInput.ETD}',
                        sendor = '',
                        receiver = '',
                        remark = '',
                        origin_port = '${tInput.ORIGIN_PORT}',
                        destination = '${tDestination}',
                        bl_no = '${tInput.BL_NO}'
                    where
                        stsout_cd = '${col.STSOUT_CD}'
                        and (
                            shipment_cd is null
                            or shipment_cd = ''
                        )
                        -- and invoice_no = '${col.INVOICE_NO}' 
                        -- and origin_port = '${col.ORIGIN_PORT}' 
                        -- and trade_term = '${col.TRADE_TERM}' 
                        -- and target_eta = '${col.TARGET_ETA}' 
                        -- and ready_date = '${col.READY_DATE}' 
                        -- and destination = '${col.DESTINATION}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                if (tInput.ORIGIN_PORT === 'SINGAPORE') {
                    let tSQL99 = `
                        update kzz_freight
                        set
                            bl_no_singapore = '${tShipmentMst.BL_NO}',
                            invoice_no_singapore = '${tShipmentMst.REMARK}'
                        where
                            stsout_cd = '${col.STSOUT_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
                        update ksv_stock_out
                        set
                            pack_cd2 = pack_cd
                        where
                            stsout_cd = '${col.STSOUT_CD}'
                            and (
                                pack_cd2 is null
                                or pack_cd2 = ''
                            )
                            and (
                                pack_cd is not null
                                and pack_cd <> ''
                            )
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
                        update ksv_stock_out
                        set
                            pack_cd_singapore = '${tShipmentMst.REMARK}'
                        where
                            stsout_cd = '${col.STSOUT_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    var sql1 = `
                        select
                            *
                        from
                            ksv_shipment_mem
                        where
                            stsout_cd = '${col.STSOUT_CD}'
                            and (
                                shipment_cd is null
                                or shipment_cd = ''
                            )
                    `;
                    var nRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                    var tSelObj = {
                        ...nRet1[0],
                    };
                } else {
                    let tSQL99 = `
                        update kzz_freight
                        set
                            bl_no = '${tShipmentMst.BL_NO}',
                            invoice_no = '${tShipmentMst.REMARK}'
                        where
                            stsout_cd = '${col.STSOUT_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
                        update ksv_stock_out
                        set
                            pack_cd2 = pack_cd
                        where
                            stsout_cd = '${col.STSOUT_CD}'
                            and (
                                pack_cd2 is null
                                or pack_cd2 = ''
                            )
                            and (
                                pack_cd is not null
                                and pack_cd <> ''
                            )
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
                        update ksv_stock_out
                        set
                            pack_cd = '${tShipmentMst.REMARK}'
                        where
                            stsout_cd = '${col.STSOUT_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    var sql1 = `
                        select
                            *
                        from
                            ksv_shipment_mem
                        where
                            stsout_cd = '${col.STSOUT_CD}'
                            and (
                                shipment_cd is null
                                or shipment_cd = ''
                            )
                    `;
                    var nRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                    var tSelObj = {
                        ...nRet1[0],
                    };
                }

                if (tInput.IS_SINGAPORE !== '1') continue;

                var tInObj = {};
                tInObj.shipment_cd = '';
                tInObj.stsout_cd = tSelObj.STSOUT_CD;
                tInObj.is_stsout = tSelObj.IS_STSOUT;
                tInObj.invoice_no = tSelObj.INVOICE_NO;
                tInObj.trade_term = tSelObj.TRADE_TERM;
                // tInObj.ready_date  = tShipmentMst.TARGET_ETA;
                tInObj.ready_date = tSelObj.TARGET_ETA;
                tInObj.origin_port = 'SINGAPORE';
                tInObj.destination = tSelObj.DESTINATION;
                tInObj.ship_mode = '';
                tInObj.ship_date = '';
                tInObj.ct_qty = tSelObj.CT_QTY;
                tInObj.weight = tSelObj.WEIGHT;
                tInObj.cbm = tSelObj.CBM;
                tInObj.sendor = tSelObj.SENDOR;
                tInObj.receiver = tSelObj.RECEIVER;
                tInObj.buyer = tSelObj.BUYER;
                tInObj.description = tSelObj.DESCRIPTION;
                tInObj.remark = tSelObj.REMARK;
                tInObj.bl_no = '';
                tInObj.target_eta = tSelObj.TARGET_ETA;
                tInObj.amount = tSelObj.AMOUNT;
                tInObj.payment = tSelObj.PAYMENT;
                tInObj.org_destination = tSelObj.DESTINATION;
                tInObj.org_origin_port = tSelObj.ORIGIN_PORT;
                let tSQL99 = AFLib.createTableSql('ksv_shipment_mem', tInObj);
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
                tObj.CODE = 'SUCCEED:Add Ship';
                tObj.id = 0;
                tRetArray.push(tObj);
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Add Ship';
                tObj.id = 0;
                tRetArray.push(tObj);
            }
            return tRetArray;
        },

        mgrDelete_S0433_5: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tSQLArray = [];

            var sql0 = `
                select
                    *
                from
                    ksv_shipment_mst wehre shipment_cd = '${args.data.SHIPMENT_CD}'
            `;
            var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            var tShipmentMst = {
                ...nRet0[0],
            };

            var nRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
            var tIdx1 = 0;
            for (tIdx1 = 0; tIdx1 < nRet1.length; tIdx1++) {
                var tOne = {
                    ...nRet1[tIdx1],
                };
                if (tShipmentMst.IS_SINGAPORE === '1') {
                    let tSQL99 = `
                        delete from ksv_shipment_mem
                        where
                            stsout_cd = '${tOne.STSOUT_CD}'
                            and origin_port = 'SINGAPORE'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
                        update ksv_shipment_mem
                        set
                            shipment_cd = '',
                            origin_port = org_origin_port,
                            destination = org_destination
                        where
                            stsout_cd = '${tOne.STSOUT_CD}'
                            and shipment_cd = '${args.data.SHIPMENT_CD}'
                            and destination = 'SINGAPORE'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                } else {
                    let tSQL99 = `
                        update ksv_shipment_mem
                        set
                            shipment_cd = '',
                            origin_port = org_origin_port,
                            destination = org_destination
                        where
                            stsout_cd = '${tOne.STSOUT_CD}'
                            and shipment_cd = '${args.data.SHIPMENT_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }
            }

            let tSQL99 = `
                delete from ksv_shipment_mst
                where
                    shipment_cd = '${args.datas.SHIPMENT_CD}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            /*
            let tSQL99 = `
                update ksv_stock_out
                set
                    pack_cd = ''
                where
                    pack_cd = '${args.datas.SHIPMENT_CD}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);
            */

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'SUCCEED:Delete PU_CD:' + args.datas.PU_CD;
                tObj.id = 0;
                tRetArray.push(tObj);
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Delete PU_CD';
                tObj.id = 0;
                tRetArray.push(tObj);
            }

            return tRetArray;
        },

        mgrUpdate_S0433_5: async (_, args, contextValue) => {
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
            var tInput = args.datas;

            var tSQLArray = [];
            let tSQL99 = `
                update ksv_shipment_mst
                set
                    ship_mode = '${tInput.SHIP_MODE}',
                    place_cd = '${tInput.PLACE_CD}',
                    BL_FILE = '${tInput.BL_FILE}',
                    ORIGIN_PORT = '${tInput.ORIGIN_PORT}',
                    BL_NO = '${tInput.BL_NO}',
                    PL_FILE = '${tInput.PL_FILE}',
                    ETD = '${tInput.ETD}',
                    CONTAINER_NO = '${tInput.CONTAINER_NO}',
                    CI_FILE = '${tInput.CI_FILE}',
                    DESTINATION = '${tInput.DESTINATION}',
                    COST = '${tInput.COST}',
                    UPD_DATETIME = '${tRetDate}',
                    REMARK = '${tInput.REMARK}',
                    TRACKING_ID = '${tInput.TRACKING_ID}'
                where
                    shipment_cd = '${tInput.SHIPMENT_CD}'
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
                tObj.CODE = 'SUCCEED:Delete PU_CD:' + args.datas.PU_CD;
                tObj.id = 0;
                tRetArray.push(tObj);
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Delete PU_CD';
                tObj.id = 0;
                tRetArray.push(tObj);
            }

            return tRetArray;
        },

        mgrUpdate_S0433_5_1: async (_, args, contextValue) => {
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
            var tInput = args.datas;

            var tSQLArray = [];
            let tSQL99 = `
                update ksv_shipment_mst
                set
                    TRACKING_ID = '${tInput.TRACKING_ID}',
                    A_ETA = '${tInput.A_ETA}',
                    F_ETA = '${tInput.F_ETA}',
                    SHIP_STATUS = '${tInput.SHIP_STATUS}',
                    LOADING_DATE = '${tInput.LOADING_DATE}',
                    ARRIVAL_DATE = '${tInput.ARRIVAL_DATE}',
                    DISCHARGE_DATE = '${tInput.DISCHARGE_DATE}',
                    GATEOUT_DATE = '${tInput.GATEOUT_DATE}'
                where
                    shipment_cd = '${tInput.SHIPMENT_CD}'
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
                tObj.CODE = 'SUCCEED:Delete PU_CD:' + args.datas.PU_CD;
                tObj.id = 0;
                tRetArray.push(tObj);
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Delete PU_CD';
                tObj.id = 0;
                tRetArray.push(tObj);
            }

            return tRetArray;
        },
    },
};

export default moduleMutation_S0433_5;
