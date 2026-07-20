import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기

// export default로 Query 내용 내보내기
const moduleQuery_S0518_3_1 = {
    Query: {
        mgrQueryS0518_3_1: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var sqlShipMode = '';
            if (!args.data.SHIP_MODE);
            else {
                if (
                    args.data.SHIP_MODE === '1' ||
                    args.data.SHIP_MODE === '11' ||
                    args.data.SHIP_MODE === '2'
                ) {
                    sqlShipMode = ` and p.delivery_type in ('2', '3' )`;
                }
                if (args.data.SHIP_MODE === '3') {
                    sqlShipMode = ` and p.delivery_type in ('1', '31', '4', '5' )`;
                }
                if (args.data.SHIP_MODE === '4') {
                    sqlShipMode = ` and p.delivery_type in ('P')`;
                }
                if (args.data.SHIP_MODE === '5') {
                    sqlShipMode = ` and p.delivery_type in ('D')`;
                }
                if (args.data.SHIP_MODE === '6') {
                    sqlShipMode = ` and p.delivery_type in ('7')`;
                }
                if (args.data.SHIP_MODE === '7') {
                    sqlShipMode = ` and p.delivery_type in ('6')`;
                }
                if (args.data.SHIP_MODE === '8') {
                    sqlShipMode = ` and p.delivery_type in ('42')`;
                }
                if (args.data.SHIP_MODE === '9') {
                    sqlShipMode = ` and p.delivery_type in ('43')`;
                }
                if (args.data.SHIP_MODE === '10') {
                    sqlShipMode = ` and p.delivery_type in ('8')`;
                }
            }

            /*
            var sqlDestination = '';
            if (!args.data.DESTINATION);
            else {
                if (args.data.DESTINATION === 'SHINTS') {
                    sqlDestination = ` and p.out_factory_cd in ('FC010' )`;
                }
                if (args.data.DESTINATION === 'BVT') {
                    sqlDestination = ` and p.out_factory_cd in ('FC034' )`;
                }
                if (args.data.DESTINATION === 'ETP') {
                    sqlDestination = ` and p.out_factory_cd in ('FC044' )`;
                }
            }
            */

            var sqlDestination = '';
            var sqlDestination1 = '';
            if (!args.data.FACTORY);
            else {
                if (args.data.FACTORY === 'SHINTS') {
                    sqlDestination = ` and p1.destination in ('SHINTS' )`;
                    sqlDestination1 = ` and A.destination in ('SHINTS' )`;
                }
                if (args.data.FACTORY === 'BVT') {
                    sqlDestination = ` and (p1.destination in ('BVT') or p1.destination in ('TN')) `;
                    sqlDestination1 = ` and (A.destination in ('BVT') or A.destination in ('TN')) `;
                } 
                if (args.data.FACTORY === 'ETP') {
                    sqlDestination = ` and p1.destination in ('ETP' )`;
                    sqlDestination1 = ` and A.destination in ('ETP' )`;
                }
            }




            var sqlOriginPort = '';
            if (!args.data.ORIGIN_PORT);
            else
                sqlOriginPort = ` and A.org_origin_port like '%${args.data.ORIGIN_PORT}%' `;

            var sqlStatus = ''; // 6: Not end, 0: Not Fixed, 1: Fixed, 2: on the way, 3: Arrival, 5: Discharge, 4: End
            var sqlStatus1 = ''; // 6: Not end, 0: Not Fixed, 1: Fixed, 2: on the way, 3: Arrival, 5: Discharge, 4: End
            if (!args.data.STATUS_CD);
            else {
                if (args.data.STATUS_CD === '6') {
                    // Not End
                    sqlStatus = ` and (A.end_date is null or A.end_date = '') `;
                    sqlStatus += ` and A.STATUS_CD = '${args.data.STATUS_CD}'  `;
                } else if (args.data.STATUS_CD === '0') {
                    // Not Fix
                    sqlStatus = ` and A.ETA_0 = ''  `;
                    sqlStatus += ` and (A.fix_flag = '9' or ( A.fix_flag = '' or A.fix_flag = '0')) `;
                    sqlStatus += ` and A.STATUS_CD = '${args.data.STATUS_CD}'  `;
                } else if (args.data.STATUS_CD === '1') {
                    // Fix
                    sqlStatus = ` and ((A.ETA_0 <> '' and A.ETA_0 > '20250630' and a.fix_flag = '9' )  `;
                    sqlStatus += ` or  (A.fix_flag = '1'))  `;
                    sqlStatus += ` and A.STATUS_CD = '${args.data.STATUS_CD}'  `;
                } else if (args.data.STATUS_CD === '4') {
                    //  End
                    sqlStatus = ` and (A.end_date is not null and A.end_date <> '')  `;
                    sqlStatus += ` and A.STATUS_CD = '${args.data.STATUS_CD}'  `;
                } else if (args.data.STATUS_CD === '3') {
                    //  Arrival
                    /*
              sqlStatus  = ` and (A.ETA_0 <> '' and A.ETA_0 <= '20250630' ) `;
              sqlStatus += ` and A.STATUS_CD = '${args.data.STATUS_CD}'  `;
              */
                    sqlStatus = ` and ((A.ETA_0 <> '' and A.ETA_0 <= '20250630' ) `;
                    sqlStatus += ` or  A.STATUS_CD = '${args.data.STATUS_CD}')  `;
                } else {
                    sqlStatus = ` and (A.ETA_0 = '')  `;
                    sqlStatus += ` and A.STATUS_CD = '${args.data.STATUS_CD}'  `;
                }
            }

            var sqlETA = '';
            if (!args.data.S_ETA && !args.data.E_ETA) {
                sqlETA = ` and ((p.eta is null or p.eta = '')  `;
                sqlETA += ` or  (p1.eta is null or p1.eta = ''))  `;
            } else {
                var sETA = args.data.S_ETA;
                var eETA = args.data.E_ETA;
                if (sETA === '') {
                    sETA = `${tRetDate1.substring(0, 4)}0101`;
                }
                if (eETA === '') {
                    eETA = '99999999';
                }
                sqlETA = ` and (p.eta between '${sETA}' and '${eETA}'  `;
                sqlETA += ` or p1.eta between '${sETA}' and '${eETA}')  `;
            }

            var sqlETD = '';
            if (!args.data.S_ETD && !args.data.E_ETD);
            else {
                var sETD = args.data.S_ETD;
                var eETD = args.data.E_ETD;
                if (sETD === '') {
                    sETD = `${tRetDate1.substring(0, 4)}0101`;
                }
                if (eETD === '') {
                    eETD = '99999999';
                }
                sqlETD = ` and p.ship_date between '${sETD}' and '${eETD}'  `;
            }

            var tOutFactoryCd = '';
            if (args.data.FACTORY === 'BVT') tOutFactoryCd = 'FC034';
            if (args.data.FACTORY === 'ETP') tOutFactoryCd = 'FC044';

            var sqlInvoiceNo = '';
            var sqlInvoiceNo1 = '';
            if (args.data.INVOICE_NO) {
                sqlInvoiceNo = `and p1.INVOICE_NO like '%${args.data.INVOICE_NO}%' `;
								sqlInvoiceNo1 = `and A0.INVOICE_NO like '%${args.data.INVOICE_NO}%' `;
            }

            let sqlStr = `
                select
                    isnull(A.ATA, '') as ATA,
                    isnull(A.F_ETA, '') as F_ETA,
                    isnull(A.A_ETA, '') as A_ETA,
                    A.ORIGIN_NATION,
                    isnull(A.CLEARANCE_NO, '') as CLEARANCE_NO,
                    A.SHIPMENT_CD,
                    A.STATUS_CD,
                    C.CD_NAME as SHIP_STATUS_N,
                    isnull(A.REG_DATETIME, '') as REG_DATETIME,
                    A.SHIP_MODE,
                    D.CD_NAME as SHIP_MODE_N,
                    A.ORG_ORIGIN_PORT,
                    A.ORG_DESTINATION,
                    A.ORIGIN_PORT,
                    A.DESTINATION,
                    A.IS_SINGAPORE,
                    A.BL_NO,
                    A.ETA,
                    A.SHIPPING_COST,
                    A.IMPORT_COST,
                    A.SHIP_LINE,
                    A.PLACE_CD,
                    A.FIX_FLAG,
                    A.REMARK,
                    A.INVOICE_NO,
                    A.ETD,
                    isnull(E.TRACKING_ID, '') as TRACKING_ID,
                    isnull(E.SHIP_STATUS, '') as SHIPGO_STATUS,
                    isnull(E.F_ETA, '') as SHIPGO_ETA,
                    isnull(E.A_ETA, '') as SHIPGO_ETC1,
                    isnull(E.DEPARTURE_DATE, '') as SHIPGO_ETC2,
                    isnull(E.ARRIVAL_DATE, '') as SHIPGO_ETC3,
                    isnull(E.DISCHARGE_DATE, '') as SHIPGO_ETC4,
                    isnull(E.LOADING_DATE, '') as SHIPGO_ETC5,
                    isnull(E.UPD_DATETIME, '') as UPD_DATETIME,
                    A.PACK_CD_0,
                    A.DELIVERY_TYPE_0,
                    A.DELIVERY_TYPE_N_0,
                    A.SHIP_DATE_0,
                    A.ETA_0,
                    A.OUT_FACTORY_CD,
                    isnull(F1.NAME, '') as FILE_NAME,
                    isnull(F1.URL, '') as FILE_URL,
                    sum(B.WEIGHT) as S_WEIGHT,
                    sum(B.CBM) as S_CBM,
                    sum(B.CT_QTY) as S_CT_QTY
                from
                    (
                        select
                            K.PACK_CD as PACK_CD_0,
                            K.DELIVERY_TYPE as DELIVERY_TYPE_0,
                            K.DELIVERY_TYPE_N as DELIVERY_TYPE_N_0,
                            K.SHIP_DATE as SHIP_DATE_0,
                            K.ETA as ETA_0,
                            K.OUT_FACTORY_CD as OUT_FACTORY_CD,
                            K.SHIPMENT_CD,
                            isnull(A0.STATUS_CD, '') as STATUS_CD,
                            isnull(A0.ETD, '') as REG_DATETIME,
                            isnull(A0.SHIP_MODE, '') as SHIP_MODE,
                            isnull(A0.ORG_ORIGIN_PORT, '') as ORG_ORIGIN_PORT,
                            isnull(A0.ORG_DESTINATION, '') as ORG_DESTINATION,
                            isnull(A0.ORIGIN_PORT, '') as ORIGIN_PORT,
                            isnull(A0.DESTINATION, '') as DESTINATION,
                            isnull(A0.IS_SINGAPORE, '') as IS_SINGAPORE,
                            isnull(A0.BL_NO, '') as BL_NO,
                            isnull(A0.ETA, '') as ETA,
                            isnull(A0.SHIPPING_COST, '') as SHIPPING_COST,
                            isnull(A0.IMPORT_COST, '') as IMPORT_COST,
                            isnull(A0.SHIP_LINE, '') as SHIP_LINE,
                            isnull(A0.PLACE_CD, '') as PLACE_CD,
                            isnull(A0.FIX_FLAG, '9') as FIX_FLAG,
                            isnull(A0.REMARK, '') as REMARK,
                            isnull(A0.INVOICE_NO, '') as INVOICE_NO,
                            isnull(A0.ATA, '') as ATA,
                            isnull(A0.F_ETA, '') as F_ETA,
                            isnull(A0.A_ETA, '') as A_ETA,
                            '' as ORIGIN_NATION,
                            isnull(A0.CLEARANCE_NO, '') as CLEARANCE_NO,
                            isnull(A0.ETD, '') as ETD
                        from
                            (
                                select
                                    p.PACK_CD,
                                    p1.SHIP_MODE as DELIVERY_TYPE,
                                    '' as DELIVERY_TYPE_N,
                                    p.OUT_FACTORY_CD,
                                    isnull(p1.SHIPMENT_CD, '') as SHIPMENT_CD,
                                    isnull(max(p.SHIP_DATE), '') as SHIP_DATE,
                                    isnull(max(p.ETA), '') as ETA
                                from
                                    ksv_shipment_mst p1,
                                    ksv_stock_out p
                                where
                                    left(p.out_datetime, 8) > '20240701'
                                    and p1.REMARK is not null
                                    and p1.REMARK like '%${args.data.REMARK}%'
                                    and p1.DESTINATION like '%${args.data.DESTINATION}%'
                                    ${sqlInvoiceNo}
                                    and p.PACK_CD <> ''
                                    and p.stsout_cd in (
                                        select distinct
                                            stsout_cd
                                        from
                                            ksv_shipment_mem
                                        where
                                            shipment_cd = p1.shipment_cd
                                    ) ${sqlShipMode} ${sqlDestination} ${sqlETA}
                                group by
                                    p.PACK_CD,
                                    p1.SHIP_MODE,
                                    p.OUT_FACTORY_CD,
                                    isnull(p1.SHIPMENT_CD, '')
                            ) K
                            left join ksv_shipment_mst A0 on K.SHIPMENT_CD = A0.SHIPMENT_CD
                                                         and A0.REMARK like '%${args.data.REMARK}%'
                                                         ${sqlInvoiceNo1}
                    ) A
                    left join ksv_blno_mst E on A.BL_NO = E.BL_NO
                    left join kcd_code C on A.STATUS_CD = C.CD_CODE
                    and C.cd_group = 'SHIPMENT_STATUS'
                    left join kcd_code D on A.SHIP_MODE = D.CD_CODE
                    and D.cd_group = 'SHIPMENT_SHIP_MODE'
                    left join ksv_shipment_mem B on B.SHIPMENT_CD = A.SHIPMENT_CD
                    left join kcd_fileinfo F1 on (
                        F1.file_key = A.CLEARANCE_NO
                        or F1.file_key = A.SHIPMENT_CD
                    )
                    and F1.kind = 'CLEARANCE'
                where
                    1 = 1
                    and  A.DESTINATION like '%${args.data.DESTINATION}%'
                    ${sqlDestination1}
                    ${sqlStatus} 
                    ${sqlOriginPort}
                    -- and A.BL_NO like '%${args.data.BL_NO}%'
                    and isnull(A.CLEARANCE_NO, '') like '%${args.data.CUSTOMER_NO ?? ''}%'
                group by
                    isnull(A.ATA, ''),
                    isnull(A.F_ETA, ''),
                    isnull(A.A_ETA, ''),
                    A.ORIGIN_NATION,
                    isnull(A.CLEARANCE_NO, ''),
                    A.SHIPMENT_CD,
                    A.STATUS_CD,
                    C.CD_NAME,
                    isnull(A.REG_DATETIME, ''),
                    A.SHIP_MODE,
                    D.CD_NAME,
                    A.ORG_ORIGIN_PORT,
                    A.ORG_DESTINATION,
                    A.ORIGIN_PORT,
                    A.DESTINATION,
                    A.IS_SINGAPORE,
                    A.BL_NO,
                    A.ETA,
                    A.SHIPPING_COST,
                    A.IMPORT_COST,
                    A.SHIP_LINE,
                    A.PLACE_CD,
                    A.FIX_FLAG,
                    A.REMARK,
                    A.INVOICE_NO,
                    A.ETD,
                    isnull(E.TRACKING_ID, ''),
                    isnull(E.SHIP_STATUS, ''),
                    isnull(E.F_ETA, ''),
                    isnull(E.A_ETA, ''),
                    isnull(E.DEPARTURE_DATE, ''),
                    isnull(E.ARRIVAL_DATE, ''),
                    isnull(E.DISCHARGE_DATE, ''),
                    isnull(E.LOADING_DATE, ''),
                    isnull(E.UPD_DATETIME, ''),
                    A.PACK_CD_0,
                    A.DELIVERY_TYPE_0,
                    A.DELIVERY_TYPE_N_0,
                    A.SHIP_DATE_0,
                    A.ETA_0,
                    A.OUT_FACTORY_CD,
                    isnull(F1.NAME, ''),
                    isnull(F1.URL, '')
                order by
                    A.SHIP_DATE_0 desc,
                    A.REMARK
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            var shipmentCdSet = new Set();
            var tIdx0 = 0;
            for (tIdx0 = 0; tIdx0 < tRet.length; tIdx0++) {
                var tObj0 = { ...tRet[tIdx0] };
                if (tObj0.SHIPMENT_CD && tObj0.SHIPMENT_CD !== '') {
                    shipmentCdSet.add(
                        `'${tObj0.SHIPMENT_CD.replace(/'/gi, "''")}'`,
                    );
                }
            }

            var shipmentCdArray = [...shipmentCdSet];
            var shipmentFileMap = {};
            if (shipmentCdArray.length > 0) {
                let sqlFile = `
                    select
                        *
                    from
                        kcd_fileinfo
                    where
                        kind = 'SHIPMENT'
                        and left(FILE_KEY, charindex('-', FILE_KEY + '-') - 1) in (${shipmentCdArray.join(
                                            ',',
                                        )})
                `;
                var tRetFile = await prisma.$queryRaw(Prisma.raw(sqlFile));

                tRetFile.forEach((col, i) => {
                    var tShipmentCd = (col.FILE_KEY || '').split('-')[0];
                    if (!shipmentFileMap[tShipmentCd]) {
                        shipmentFileMap[tShipmentCd] = [];
                    }
                    shipmentFileMap[tShipmentCd].push(col);
                });
            }

            var tRetArray = [];

            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tObj = { ...tRet[tIdx] };

                if (!tObj.ORG_ORIGIN_PORT)
                    tObj.ORG_ORIGIN_PORT = tObj.ORIGIN_PORT;

                if (tObj.SHIPMENT_CD === '') {
                    tObj.REMARK = tObj.PACK_CD_0;
                    tObj.SHIP_MODE = tObj.DELIVERY_TYPE_0;
                    tObj.SHIP_MODE_N = tObj.DELIVERY_TYPE_N_0;
                    tObj.ETD = tObj.SHIP_DATE_0;
                    tObj.ETA = tObj.ETA_0;
                    tObj.DESTINATION = args.data.FACTORY;
                } else {
                    // tObj.SHIP_MODE_N = tObj.DELIVERY_TYPE_N_0;
                }

                tObj.DELIVERY = '';
                if (tObj.INVOICE_NO) tObj.DELIVERY = tObj.INVOICE_NO;
                else if (tObj.REMARK) tObj.DELIVERY = tObj.REMARK;

                var tRet1 = shipmentFileMap[tObj.SHIPMENT_CD] || [];
                tObj.BL_FILE = '';
                tObj.BL_FILE_URL = '';
                tObj.PL_FILE = '';
                tObj.PL_FILE_URL = '';
                tObj.CI_FILE = '';
                tObj.CI_FILE_URL = '';
                tRet1.forEach((col, i) => {
                    if (col.FILE_KEY.includes('-BL_FILE')) {
                        tObj.BL_FILE = col.NAME;
                        tObj.BL_FILE_URL = col.URL;
                    }
                    if (col.FILE_KEY.includes('-PL_FILE')) {
                        tObj.PL_FILE = col.NAME;
                        tObj.PL_FILE_URL = col.URL;
                    }
                    if (col.FILE_KEY.includes('-CI_FILE')) {
                        tObj.CI_FILE = col.NAME;
                        tObj.CI_FILE_URL = col.URL;
                    }
                });

                /* Remark , BL_NO 따로 검색 */
                if (args.data.REMARK) {
                    var tVal1 = args.data.REMARK.replace(/ /gi, '');
                    tVal1 = tVal1.toUpperCase();
                    var tVal2 = tObj.REMARK.replace(/ /gi, '');
                    tVal2 = tVal2.toUpperCase();
                    if (tVal2.includes(tVal1));
                    else continue;
                }
                if (args.data.BL_NO) {
                    var tVal1 = args.data.BL_NO.replace(/ /gi, '');
                    tVal1 = tVal1.toUpperCase();
                    var tVal2 = tObj.BL_NO.replace(/ /gi, '');
                    tVal2 = tVal2.toUpperCase();
                    if (tVal2.includes(tVal1));
                    else continue;
                }

                tRetArray.push(tObj);
            }

            console.log(sqlStr);
            return tRetArray;
        },
        mgrQueryS0518_3_2: async (_, args) => {
            var tSQL = '';

            var sqlPackCd = '';
            if (args.data.SHIPMENT_CD) {
                sqlPackCd = `   and  C.PACK_CD = (select distinct remark from ksv_shipment_mst  `;
                sqlPackCd += `                     where shipment_cd = '${args.data.SHIPMENT_CD}') `;
            } else {
                if (args.data.PACK_CD) {
                    sqlPackCd = `   and  C.PACK_CD = '${args.data.PACK_CD}'  `;
                }
            }

            let sqlStr = `
                SELECT distinct
                    isnull(A.PU_CD, '') as PU_CD,
                    C.STSOUT_CD,
                    C.PACK_CD,
                    isnull(D.INVOICE_NO, '') as INVOICE_NO,
                    isnull(D.TRADE_TERM, '') as TRADE_TERM,
                    isnull(D.READY_DATE, '') as READY_DATE,
                    isnull(A.ETA, '') as ETA,
                    isnull(D.ORIGIN_PORT, '') as ORIGIN_PORT,
                    isnull(D.DESTINATION, '') as DESTINATION,
                    isnull(D.CT_QTY, '0') as CT_QTY,
                    isnull(D.CBM, '0') as CBM,
                    isnull(D.WEIGHT, '0') as WEIGHT,
                    isnull(A.VENDOR_CD, '') as VENDOR_CD,
                    isnull(A.BUYER_CD, '') as BUYER_CD,
                    C.PO_CD,
                    C.PO_SEQ,
                    C.MATL_CD,
                    C.ORDER_CD,
                    C.OUT_QTY,
                    C.WEIGHT as STSOUT_WEIGHT,
                    B.MATL_NAME,
                    B.COLOR,
                    B.SPEC,
                    B.UNIT,
                    isnull(C.ERR_QTY, 0) as ERR_QTY,
                    isnull(E.DOCU_NO, '') as DOCU_NO,
                    '' as STSIN_CD,
                    '0' as STSIN_PRICE,
                    '' as BL_NO,
                    '' as HS_CODE,
                    '' as COMPOSITION,
                    '' as CUSTOMS_CODE,
                    '' as CUSTOMS_UNIT,
                    -- isnull(F.PO_PRICE, '') as STSIN_PRICE,
                    C1.VENDOR_NAME
                FROM
                    KSV_STOCK_OUT C
                    left join KSV_PU_MST2 A on A.PU_CD = C.PU_CD
                    left join KSV_INVOICE_MATL E ON C.INVOICE_NO = E.INVOICE_NO,
                    KSV_SHIPMENT_MEM D,
                    KSV_SHIPMENT_MST G,
                    KCD_MATL_MST B,
                    kcd_vendor C1
                where
                    1 = 1
                    and d.shipment_cd = '${args.data.SHIPMENT_CD}'
                    and c.stsout_cd = d.stsout_cd
                    and d.shipment_cd = g.shipment_cd
                    and C.MATL_CD = B.MATL_CD
                    and B.VENDOR_CD = C1.VENDOR_CD
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S0518_3_1;
