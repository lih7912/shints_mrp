import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0434_3_1 = {
    Query: {
        mgrQueryS0434_3_1: async (_, args, contextValue) => {
            const tRetDate = AFLib.getCurrTime();
            const tRetDate1 = tRetDate.substring(0, 8);

            //
            // --- Won.yongbong
            let sqlETA = '';
            if (args.data.S_ETA || args.data.E_ETA) {
                let sETA = args.data.S_ETA;
                let eETA = args.data.E_ETA;
                if (sETA === '') {
                    sETA = `${tRetDate1.substring(0, 4)}0101`;
                }
                if (eETA === '') {
                    eETA = '99999999';
                }
                sqlETA += ` and A.eta between '${sETA}' and '${eETA}'  `;
            }

            let sqlETD = '';
            if (args.data.S_ETD || args.data.E_ETD) {
                let sETD = args.data.S_ETD;
                let eETD = args.data.E_ETD;
                if (sETD === '') {
                    sETD = `${tRetDate1.substring(0, 4)}0101`;
                }
                if (eETD === '') {
                    eETD = '99999999';
                }
                sqlETD = ` and  A.ETD between '${sETD}' and '${eETD}'   `;
            }

            var shipModeSQL = '';

            if (args.data.SHIP_MODE && args.data.SHIP_MODE !== '') {
                const arr = args.data.SHIP_MODE.split(',')
                    .map((v) => v.trim())
                    .filter((v) => v !== '');
                const inList = arr.map((v) => `'${v}'`).join(',');
                shipModeSQL += ` AND A.SHIP_MODE IN (${inList}) `;
            }

            let statusSql = '';

            if (args.data.STATUS_CD) {
                const arr = args.data.STATUS_CD.split(',').map((v) => `'${v}'`);
                statusSql += ` AND A.STATUS_CD IN (${arr.join(',')}) `;
            }

            // INVOICE_NO 필터: 입력되었을 때만 적용
            let invoiceNoSQL = '';
            if (args.data.INVOICE_NO && args.data.INVOICE_NO !== '') {
                invoiceNoSQL = ` AND A.INVOICE_NO LIKE '%${args.data.INVOICE_NO}%' `;
            }

            let shippingCostCurrSQL = '';
            if (
                args.data.SHIPPING_COST_CURR &&
                args.data.SHIPPING_COST_CURR !== ''
            ) {
                shippingCostCurrSQL = ` AND A.SHIPPING_COST_CURR LIKE '%${args.data.SHIPPING_COST_CURR}%' `;
            }


            const sqlStr = `
                select
                    top 1000 A.SHIPMENT_CD,
                    A.STATUS_CD,
                    C.CD_NAME as STATUS_N,
                    isnull(A.ETD, '') as ETD,
                    A.SHIP_MODE,
                    D.CD_NAME as SHIP_MODE_N,
                    A.ORG_ORIGIN_PORT,
                    A.ORG_DESTINATION,
                    A.DESTINATION,
                    A.IS_SINGAPORE,
                    A.BL_NO,
                    A.ETA,
                    A.ATA,
                    A.SHIPPING_COST,
                    A.SHIPPING_COST_CURR,
                    A.IMPORT_COST,
                    A.SHIP_LINE,
                    A.PLACE_CD,
                    isnull(A.FIX_FLAG, '') as FIX_FLAG,
                    A.INVOICE_NO,
                    A.REMARK,
                    isnull(E.TRACKING_ID, '') as TRACKING_ID,
                    isnull(E.SHIP_STATUS, '') as SHIPGO_STATUS,
                    isnull(E.F_ETA, '') as SHIPGO_ETA,
                    isnull(E.A_ETA, '') as SHIPGO_ETC1,
                    isnull(E.DEPARTURE_DATE, '') as SHIPGO_ETC2,
                    isnull(E.ARRIVAL_DATE, '') as SHIPGO_ETC3,
                    isnull(E.DISCHARGE_DATE, '') as SHIPGO_ETC4,
                    isnull(E.LOADING_DATE, '') as SHIPGO_ETC5,
                    isnull(E.UPD_DATETIME, '') as UPD_DATETIME,
                    -- sum(B.WEIGHT) / 1000 as S_WEIGHT, 
                    sum(B.WEIGHT) as S_WEIGHT,
                    sum(B.CBM) as S_CBM
                from
                    ksv_shipment_mst A
                    left join ksv_blno_mst E on A.BL_NO = E.BL_NO
                    left join kcd_code C on A.STATUS_CD = C.CD_CODE
                    and C.cd_group = 'SHIPMENT_STATUS'
                    left join kcd_code D on A.SHIP_MODE = D.CD_CODE
                    and D.cd_group = 'SHIPMENT_SHIP_MODE'
                    left join ksv_shipment_mem B on B.SHIPMENT_CD = A.SHIPMENT_CD
                where
                    1 = 1
                    and A.SHIPMENT_CD like '%${args.data.SHIPMENT_CD}%'
                    --and A.REMARK like '%${args.data.REMARK}%'
                    ${invoiceNoSQL}
                    ${shippingCostCurrSQL}
                    and A.BL_NO like '%${args.data.BL_NO}%' ${shipModeSQL}
                    and A.ORIGIN_PORT like '%${args.data.ORIGIN_PORT}%'
                    and A.DESTINATION like '%${args.data.DESTINATION}%' ${statusSql} ${sqlETD} ${sqlETA}
                group by
                    A.SHIPMENT_CD,
                    A.STATUS_CD,
                    C.CD_NAME,
                    A.ETD,
                    A.SHIP_MODE,
                    D.CD_NAME,
                    A.ORG_ORIGIN_PORT,
                    A.ORG_DESTINATION,
                    A.DESTINATION,
                    A.IS_SINGAPORE,
                    A.BL_NO,
                    A.ETA,
                    A.ATA,
                    A.SHIPPING_COST,
                    A.SHIPPING_COST_CURR,
                    A.IMPORT_COST,
                    A.SHIP_LINE,
                    A.PLACE_CD,
                    A.FIX_FLAG,
                    A.INVOICE_NO,
                    A.REMARK,
                    isnull(E.TRACKING_ID, ''),
                    isnull(E.SHIP_STATUS, ''),
                    isnull(E.F_ETA, ''),
                    isnull(E.A_ETA, ''),
                    isnull(E.DEPARTURE_DATE, ''),
                    isnull(E.ARRIVAL_DATE, ''),
                    isnull(E.DISCHARGE_DATE, ''),
                    isnull(E.LOADING_DATE, ''),
                    isnull(E.UPD_DATETIME, '')
                order by
                    A.ETD desc
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            console.log(`Count(Step-1):${tRet.length}`);

            const tRetArray: any[] = [];
            for (let i = 0; i < tRet.length; i++) {
                const tOne1: any = { ...tRet[i] };
                tOne1.PACK_CD_0 = '';
                tOne1.DELIVERY_TYPE_0 = '';
                tOne1.DELIVERY_TYPE_N_0 = '';
                tOne1.SHIP_DATE_0 = '';
                tOne1.ETA_0 = '';
                tOne1.OUT_FACTORY_CD = '';

                if (!tOne1.SHIP_MODE) {
                    tOne1.SHIP_MODE = tOne1.DELIVERY_TYPE_0;
                }

                if (!tOne1.ORG_DESTINATION && !tOne1.DESTINATION) {
                    if (tOne1.OUT_FACTORY_CD === 'FC010') {
                        tOne1.ORG_DESTINATION = 'SHINTS';
                        tOne1.DESTINATION = 'SHINTS';
                    } else if (tOne1.OUT_FACTORY_CD === 'FC034') {
                        tOne1.ORG_DESTINATION = 'BVT';
                        tOne1.DESTINATION = 'BVT';
                    } else if (tOne1.OUT_FACTORY_CD === 'ETP') {
                        tOne1.ORG_DESTINATION = 'ETP';
                        tOne1.DESTINATION = 'ETP';
                    }
                }

                if (!tOne1.ORG_ORIGIN_PORT) {
                    tOne1.ORG_ORIGIN_PORT = '';
                    tOne1.ORIGIN_PORT = '';
                }

                if (!tOne1.ETA) {
                    if (tOne1.ETA_0) {
                        tOne1.ETA = tOne1.ETA_0;
                    } else {
                        tOne1.ETA = '';
                    }
                }

                tOne1.BL_FILE = '';

                if (tOne1.SHIPGO_ETA !== '') {
                    tOne1.ETA = tOne1.SHIPGO_ETA.replace(/-/gi, '');
                } else if (
                    tOne1.SHIPGO_ETC1 !== '' &&
                    tOne1.SHIPGO_ETC1 !== '-'
                ) {
                    tOne1.ETA = tOne1.SHIPGO_ETC1.replace(/-/gi, '');
                }

                if (!tOne1.REG_DATETIME) {
                    tOne1.REG_DATETIME = tOne1.SHIP_DATE_0;
                }

                if (tOne1.FIX_FLAG !== '1') {
                    tOne1.STATUS_CD = ''; 
                    tOne1.STATUS_N = 'NOT FIXED'; 
                }

                tRetArray.push(tOne1);
            }

            const escapeQuote = (v: string) => v.replace(/'/g, "''");

            const shipmentCdList = Array.from(
                new Set(
                    tRetArray
                        .map((r) => r.SHIPMENT_CD)
                        .filter((v: string | null | undefined) => !!v),
                ),
            );
            if (shipmentCdList.length > 0) {
                const inList = shipmentCdList
                    .map((v) => `'${escapeQuote(v)}'`)
                    .join(',');
                const sqlFile = `
                    select
                        file_key,
                        max(name) as NAME
                    from
                        kcd_fileinfo
                    where
                        kind = 'SHIPMENT'
                        and file_key in (${inList})
                    group by
                        file_key
                `;
                const fileRows: any[] = await prisma.$queryRaw(
                    Prisma.raw(sqlFile),
                );
                const fileMap = new Map<string, string>();
                for (const row of fileRows) {
                    fileMap.set(row.file_key, row.NAME);
                }
                for (const row of tRetArray) {
                    const name = fileMap.get(row.SHIPMENT_CD);
                    if (name) {
                        row.BL_FILE = name;
                    }
                }
            }

            const blNoList = Array.from(
                new Set(
                    tRetArray
                        .map((r) => r.BL_NO)
                        .filter((v: string | null | undefined) => !!v),
                ),
            );
            let tradlinxSummaryMap = new Map<string, any>();
            let tradlinxErrorMap = new Map<string, any>();

            if (blNoList.length > 0) {
                const blInList = blNoList
                    .map((v) => `'${escapeQuote(v)}'`)
                    .join(',');

                const sqlTradSummary = `
                    select
                        x.bl_no,
                        max(
                            case
                                when x.is_first = 1 then x.tracking_status
                            end
                        ) as tracking_status,
                        max(
                            case
                                when x.is_first = 1 then x.pol_name
                            end
                        ) as pol_name,
                        max(
                            case
                                when x.is_first = 1 then x.etd
                            end
                        ) as etd,
                        max(
                            case
                                when x.is_first = 1 then x.atd
                            end
                        ) as atd,
                        max(
                            case
                                when x.is_last = 1 then x.pod_name
                            end
                        ) as pod_name,
                        max(
                            case
                                when x.is_last = 1 then x.eta
                            end
                        ) as eta,
                        max(
                            case
                                when x.is_last = 1 then x.ata
                            end
                        ) as ata,
                        max(
                            case
                                when x.is_first = 1 then x.update_datetime
                            end
                        ) as first_update_datetime,
                        max(
                            case
                                when x.is_last = 1 then x.update_datetime
                            end
                        ) as last_update_datetime
                    from
                        (
                            select
                                t.*,
                                case
                                    when t.route_order = 1
                                    and t.rn_order = 1 then 1
                                    else 0
                                end as is_first,
                                case
                                    when t.route_order = t.max_route_order
                                    and t.rn_route = 1 then 1
                                    else 0
                                end as is_last
                            from
                                (
                                    select
                                        *,
                                        row_number() over (
                                            partition by
                                                bl_no,
                                                route_order
                                            order by
                                                update_datetime desc
                                        ) as rn_route,
                                        row_number() over (
                                            partition by
                                                bl_no
                                            order by
                                                route_order asc
                                        ) as rn_order,
                                        max(route_order) over (
                                            partition by
                                                bl_no
                                        ) as max_route_order
                                    from
                                        ksv_tradlinx
                                    where
                                        bl_no in (${blInList})
                                        and route_order is not null
                                ) t
                        ) x
                    group by
                        x.bl_no
                `;
                const tradSummaryRows: any[] = await prisma.$queryRaw(
                    Prisma.raw(sqlTradSummary),
                );
                tradlinxSummaryMap = new Map<string, any>();
                for (const row of tradSummaryRows) {
                    tradlinxSummaryMap.set(row.bl_no, row);
                }

                const sqlTradError = `
                    select
                        bl_no,
                        max(
                            case
                                when tracking_status = 'ERROR' then 1
                                else 0
                            end
                        ) as has_error
                    from
                        ksv_tradlinx
                    where
                        bl_no in (${blInList})
                    group by
                        bl_no
                `;
                const tradErrorRows: any[] = await prisma.$queryRaw(
                    Prisma.raw(sqlTradError),
                );
                tradlinxErrorMap = new Map<string, any>();
                for (const row of tradErrorRows) {
                    tradlinxErrorMap.set(row.bl_no, row);
                }
            }

            for (const row of tRetArray) {
                if (!row.BL_NO) {
                    continue;
                }

                const summary = tradlinxSummaryMap.get(row.BL_NO);
                if (summary) {
                    row.TRADLINX_STATUS = summary.tracking_status;
                    row.TRADLINX_POL_NAME = summary.pol_name;
                    row.TRADLINX_ETD = summary.etd;
                    row.TRADLINX_ATD = summary.atd;
                    row.TRADLINX_POD_NAME = summary.pod_name;
                    row.TRADLINX_ETA = summary.eta;
                    row.TRADLINX_ATA = summary.ata;
                    row.TRADLINX_UPDATE_DATETIME =
                        summary.last_update_datetime ||
                        summary.first_update_datetime;
                } else {
                    row.TRADLINX_STATUS = '';
                }

                const errInfo = tradlinxErrorMap.get(row.BL_NO);
                if (errInfo && errInfo.has_error) {
                    row.TRADLINX_STATUS = 'BL.NO 오류';
                }
            }

            return tRetArray;
        },

        mgrQueryS0434_3_1_1023: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var sqlShipMode = '';
            if (args.data.SHIP_MODE) {
                if (
                    args.data.SHIP_MODE === '1' ||
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
            }

            var sqlDestination = '';
            if (args.data.DESTINATION) {
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

            var sqlStatus = ''; // 6: Not end, 0: Not Fixed, 1: Fixed, 2: on the way, 3: Arrival, 5: Discharge, 4: End
            /*
       if (args.data.STATUS_CD) {
           if (args.data.STATUS_CD === '6') {    // Not End
              sqlStatus = ` and (A.end_date is null or A.end_date = '') `; 
           } else if (args.data.STATUS_CD === '0') {    // Not Fix 
              sqlStatus   = ` and A.ETA_0 = ''  `; 
              sqlStatus  += ` and (A.fix_flag = '9' or ( A.fix_flag = '' or A.fix_flag = '0')) `; 
           } else if (args.data.STATUS_CD === '1') {    // Fix 
              sqlStatus  = ` and ((A.ETA_0 <> '' and A.ETA_0 > '20250630' and a.fix_flag = '9' )  `; 
              sqlStatus += ` or  (A.fix_flag = '1'))  `; 
           } else if (args.data.STATUS_CD === '4') {    //  End
              sqlStatus  = ` and (A.end_date is not null and A.end_date <> '')  `; 
           } else if (args.data.STATUS_CD === '3') {    //  Arrival 
              sqlStatus  = ` and (A.ETA_0 <> '' and A.ETA_0 <= '20250630' ) `; 
           } else {
              sqlStatus  = ` and (A.ETA_0 = '')  `; 
              sqlStatus += ` and A.STATUS_CD = '${args.data.STATUS_CD}'  `; 
           } 
       }
        */

            var sqlETA = '';
            if (!args.data.S_ETA && !args.data.E_ETA);
            else {
                var sETA = args.data.S_ETA;
                var eETA = args.data.E_ETA;
                if (sETA === '') {
                    sETA = `${tRetDate1.substring(0, 4)}0101`;
                }
                if (eETA === '') {
                    eETA = '99999999';
                }
                sqlETA = ` and (p.eta between '${sETA}' and '${eETA}'  `;
                sqlETA += ` or  p1.eta between '${sETA}' and '${eETA}')  `;
            }

            var sqlETD = '';
            if (args.data.S_ETD && !args.data.E_ETD) {
                var sETD = args.data.S_ETD;
                var eETD = args.data.E_ETD;
                if (sETD === '') {
                    sETD = `${tRetDate1.substring(0, 4)}0101`;
                }
                if (eETD === '') {
                    eETD = '99999999';
                }
                sqlETD = ` and ((A.SHIP_DATE_0 between '${sETD}' and '${eETD}')     `;
                sqlETD += ` or  (A.ETD between '${sETD}' and '${eETD}'))   `;
            }
            /*
       if (!args.data.S_ETD && !args.data.E_ETD) ;
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
       */

            var sqlTmp = '';
            if (args.data.SHIPMENT_CD) sqlTmp = 'inner join';
            else sqlTmp = 'left join';

            let sqlStr = `
                select
                    A.PACK_CD_0,
                    A.DELIVERY_TYPE_0,
                    A.DELIVERY_TYPE_N_0,
                    A.SHIP_DATE_0,
                    A.ETA_0,
                    A.OUT_FACTORY_CD,
                    A.SHIPMENT_CD,
                    A.STATUS_CD,
                    C.CD_NAME as STATUS_N,
                    isnull(A.ETD, '') as ETD,
                    A.SHIP_MODE,
                    D.CD_NAME as SHIP_MODE_N,
                    A.ORG_ORIGIN_PORT,
                    A.ORG_DESTINATION,
                    A.DESTINATION,
                    A.IS_SINGAPORE,
                    A.BL_NO,
                    A.ETA,
                    A.ATA,
                    A.SHIPPING_COST,
                    A.SHIPPING_COST_CURR,
                    A.IMPORT_COST,
                    A.SHIP_LINE,
                    A.PLACE_CD,
                    A.FIX_FLAG,
                    A.REMARK,
                    isnull(E.TRACKING_ID, '') as TRACKING_ID,
                    isnull(E.SHIP_STATUS, '') as SHIPGO_STATUS,
                    isnull(E.F_ETA, '') as SHIPGO_ETA,
                    isnull(E.A_ETA, '') as SHIPGO_ETC1,
                    isnull(E.DEPARTURE_DATE, '') as SHIPGO_ETC2,
                    isnull(E.ARRIVAL_DATE, '') as SHIPGO_ETC3,
                    isnull(E.DISCHARGE_DATE, '') as SHIPGO_ETC4,
                    isnull(E.LOADING_DATE, '') as SHIPGO_ETC5,
                    isnull(E.UPD_DATETIME, '') as UPD_DATETIME,
                    sum(B.WEIGHT) as S_WEIGHT,
                    sum(B.CBM) as S_CBM
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
                            isnull(A0.ETD, '') as ETD,
                            isnull(A0.SHIP_MODE, '') as SHIP_MODE,
                            isnull(A0.ORG_ORIGIN_PORT, '') as ORG_ORIGIN_PORT,
                            isnull(A0.ORG_DESTINATION, '') as ORG_DESTINATION,
                            isnull(A0.DESTINATION, '') as DESTINATION,
                            isnull(A0.IS_SINGAPORE, '') as IS_SINGAPORE,
                            isnull(A0.BL_NO, '') as BL_NO,
                            isnull(A0.ETA, '') as ETA,
                            isnull(A0.ATA, '') as ATA,
                            isnull(A0.SHIPPING_COST, '') as SHIPPING_COST,
                            isnull(A0.SHIPPING_COST_CURR, '') as SHIPPING_COST_CURR,
                            isnull(A0.IMPORT_COST, '') as IMPORT_COST,
                            isnull(A0.SHIP_LINE, '') as SHIP_LINE,
                            isnull(A0.PLACE_CD, '') as PLACE_CD,
                            isnull(A0.FIX_FLAG, '9') as FIX_FLAG,
                            isnull(A0.REMARK, '') as REMARK,
                            isnull(A0.END_DATE, '') as END_DATE
                        from
                            (
                                select
                                    p.PACK_CD,
                                    p.DELIVERY_TYPE,
                                    isnull(p2.CD_NAME, '') as DELIVERY_TYPE_N,
                                    p.OUT_FACTORY_CD,
                                    isnull(p1.SHIPMENT_CD, '') as SHIPMENT_CD,
                                    isnull(max(p.SHIP_DATE), '') as SHIP_DATE,
                                    isnull(max(p.ETA), '') as ETA
                                from
                                    ksv_stock_out p ${sqlTmp} ksv_shipment_mst p1 on p1.remark = p.pack_cd
                                    and p1.shipment_cd like '%${args.data.SHIPMENT_CD}%'
                                    left join kcd_code p2 on p.DELIVERY_TYPE = p2.CD_CODE
                                    and p2.cd_group = 'DELIVERY_TYPE'
                                where
                                    left(p.out_datetime, 8) > '20240701'
                                    and p.PACK_CD like '%${args.data.REMARK}%'
                                    and p.PACK_CD is not null
                                    and p.PACK_CD <> ''
                                    and left(p.STSOUT_CD, 5) <> 'SOTMP' ${sqlShipMode} ${sqlDestination} ${sqlETA}
                                group by
                                    p.PACK_CD,
                                    p.DELIVERY_TYPE,
                                    p2.CD_NAME,
                                    p.OUT_FACTORY_CD,
                                    isnull(p1.SHIPMENT_CD, '')
                            ) K ${sqlTmp} ksv_shipment_mst A0 on K.SHIPMENT_CD = A0.SHIPMENT_CD
                            and A0.SHIPMENT_CD like '%${args.data.SHIPMENT_CD}%'
                    ) A
                    left join ksv_blno_mst E on A.BL_NO = E.BL_NO
                    left join kcd_code C on A.STATUS_CD = C.CD_CODE
                    and C.cd_group = 'SHIPMENT_STATUS'
                    left join kcd_code D on A.SHIP_MODE = D.CD_CODE
                    and D.cd_group = 'SHIPMENT_SHIP_MODE'
                    left join ksv_shipment_mem B on B.SHIPMENT_CD = A.SHIPMENT_CD
                where
                    1 = 1
                    --${sqlStatus}
                    and A.STATUS_CD like '%${args.data.STATUS_CD}%' ${sqlETD}
                    and A.BL_NO like '%${args.data.BL_NO}%'
                group by
                    A.PACK_CD_0,
                    A.DELIVERY_TYPE_0,
                    A.DELIVERY_TYPE_N_0,
                    A.SHIP_DATE_0,
                    A.ETA_0,
                    A.OUT_FACTORY_CD,
                    A.SHIPMENT_CD,
                    A.STATUS_CD,
                    C.CD_NAME,
                    A.ETD,
                    A.SHIP_MODE,
                    D.CD_NAME,
                    A.ORG_ORIGIN_PORT,
                    A.ORG_DESTINATION,
                    A.DESTINATION,
                    A.IS_SINGAPORE,
                    A.BL_NO,
                    A.ETA,
                    A.ATA,
                    A.SHIPPING_COST,
                    A.SHIPPING_COST_CURR,
                    A.IMPORT_COST,
                    A.SHIP_LINE,
                    A.PLACE_CD,
                    A.FIX_FLAG,
                    A.REMARK,
                    isnull(E.TRACKING_ID, ''),
                    isnull(E.SHIP_STATUS, ''),
                    isnull(E.F_ETA, ''),
                    isnull(E.A_ETA, ''),
                    isnull(E.DEPARTURE_DATE, ''),
                    isnull(E.ARRIVAL_DATE, ''),
                    isnull(E.DISCHARGE_DATE, ''),
                    isnull(E.LOADING_DATE, ''),
                    isnull(E.UPD_DATETIME, '')
                order by
                    A.SHIP_DATE_0 desc
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            console.log(`Count(Step-1):${tRet.length}`);

            let statusCd = args.data.STATUS_CD;

            // 다 걸러지지 않아서 추가로 필터링
            if (statusCd) {
                tRet = tRet.filter((item) => {
                    return item.STATUS_CD == statusCd;
                });
            }

            var tRetArray = [];

            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tOne1 = { ...tRet[tIdx] };
                console.log(`${tOne1.PACK_CD_0}`);
                tOne1.SHIP_MODE_N = tOne1.DELIVERY_TYPE_N_0;
                if (!tOne1.SHIP_MODE) tOne1.SHIP_MODE = tOne1.DELIVERY_TYPE_0;

                if (!tOne1.ORG_DESTINATION && !tOne1.DESTINATION) {
                    if (tOne1.OUT_FACTORY_CD === 'FC010') {
                        tOne1.ORG_DESTINATION = 'SHINTS';
                        tOne1.DESTINATION = 'SHINTS';
                    } else if (tOne1.OUT_FACTORY_CD === 'FC034') {
                        tOne1.ORG_DESTINATION = 'BVT';
                        tOne1.DESTINATION = 'BVT';
                    } else if (tOne1.OUT_FACTORY_CD === 'ETP') {
                        tOne1.ORG_DESTINATION = 'ETP';
                        tOne1.DESTINATION = 'ETP';
                    }
                }

                if (!tOne1.ORG_ORIGIN_PORT) {
                    tOne1.ORG_ORIGIN_PORT = '';
                    tOne1.ORIGIN_PORT = '';
                }

                console.log(
                    `${tOne1.PACK_CD_0}, ${tOne1.ORG_DESTINATION}, ${tOne1.DESTINATION}, ${tOne1.ORG_ORIGIN_PORT}, ${tOne1.ORIGIN_PORT}`,
                );

                if (tOne1.ETA);
                else if (tOne1.ETA_0) tOne1.ETA = tOne1.ETA_0;
                else tOne1.ETA = '';

                tOne1.REMARK = tOne1.PACK_CD_0;

                let sqlStr0 = `
                    select
                        *
                    from
                        kcd_fileinfo
                    where
                        kind = 'SHIPMENT'
                        and file_key = '${tOne1.SHIPMENT_CD}'
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr0));

                tOne1.BL_FILE = '';
                // tOne1.BL_FILE_URL = '';

                if (tRet0.length > 0) {
                    tOne1.BL_FILE = tRet0[0].NAME;
                    // tOne1.BL_FILE_URL = tRet0[0].URL;
                }

                if (tOne1.SHIPGO_ETA !== '')
                    tOne1.ETA = tOne1.SHIPGO_ETA.replace(/-/gi, '');
                else if (tOne1.SHIPGO_ETC1 !== '' && tOne1.SHIPGO_ETC1 !== '-')
                    tOne1.ETA = tOne1.SHIPGO_ETC1.replace(/-/gi, '');

                // if (tOne1.REMARK === '') tOne1.REMARK = tOne1.PACK_CD_0;
                if (tOne1.REG_DATETIME === '')
                    tOne1.REG_DATETIME = tOne1.SHIP_DATE_0;

                // if (tOne1.ORG_ORIGIN_PORT && tOne1.ORG_DESTINATION) tRetArray.push(tOne1);
                if (tOne1.ORG_DESTINATION) tRetArray.push(tOne1);
                if (tRetArray.length > 200) break;
            }

            /*
       sqlShipMode = ` and A.ship_mode like '%${args.data.SHIP_MODE}%' `; 
       sqlDestination =  ` and A.destination like '%${args.data.DESTINATION}%'   `; 
       var sqlOriginPort = ''; 
 
       sqlStatus = '';    // 6: Not end, 0: Not Fixed, 1: Fixed, 2: on the way, 3: Arrival, 5: Discharge, 4: End
       if (!args.data.STATUS_CD) ;  
       else {
           if (args.data.STATUS_CD === '6') {    // Not End
              sqlStatus = ` and (A.end_date is null or  A.end_date = '')  `; 
           } else if (args.data.STATUS_CD === '0') {    // Not Fix 
              sqlStatus = ` and (A.fix_flag is not null and ( A.fix_flag = '' or A.fix_flag = '0')) `; 
           } else if (args.data.STATUS_CD === '1') {    // Fix 
              sqlStatus = ` and (A.fix_flag is not null and  A.fix_flag = '1')  `; 
           } else if (args.data.STATUS_CD === '4') {    //  End
              sqlStatus = ` and (A.end_date is not null and A.end_date <> '')  `; 
           } else {
              sqlStatus = ` and A.STATUS_CD = '${args.data.STATUS_CD}'  `; 
           } 
       }
 
       sqlETA = '';
       if (!args.data.S_ETA && !args.data.E_ETA) ;
       else {
           var sETA = args.data.S_ETA;
           var eETA = args.data.E_ETA;
           if (sETA === '') {
               sETA = `${tRetDate1.substring(0, 4)}0101`;
           }
           if (eETA === '') {
               eETA = '99999999'; 
           }
           sqlETA = ` and A.eta between '${sETA}' and '${eETA}'  `; 
       }
 
       var sqlETD = '';
       if (!args.data.S_ETD && !args.data.E_ETD) ;
       else {
           var sETD = args.data.S_ETD;
           var eETD = args.data.E_ETD;
           if (sETD === '') {
               sETD = `${tRetDate1.substring(0, 4)}0101`;
           }
           if (eETD === '') {
               eETD = '99999999'; 
           }
           sqlETD = ` and A.etd between '${sETD}' and '${eETD}'  `; 
       }


       // Materfial Freight 
       let sqlStr2 = `
           select
               A.SHIPMENT_CD,
               isnull(B.SHIPMENT_CD, '') as SHIPMENT_CD2,
               A.STATUS_CD,
               C.CD_NAME as STATUS_N,
               LEFT(A.REG_DATETIME, 8) as REG_DATETIME,
               A.SHIP_MODE,
               D.CD_NAME as SHIP_MODE_N,
               A.ORG_ORIGIN_PORT,
               A.ORG_DESTINATION,
               A.DESTINATION,
               A.IS_SINGAPORE,
               A.BL_NO,
               A.ETA,
               A.SHIPPING_COST,
               A.SHIPPING_COST_CURR,
               A.IMPORT_COST,
               A.SHIP_LINE,
               A.PLACE_CD,
               isnull(A.FIX_FLAG, '') as FIX_FLAG,
               A.REMARK,
               isnull(E.TRACKING_ID, '') as TRACKING_ID,
               -- isnull(A.SHIPGO_STATUS, '') as SHIPGO_STATUS,
               isnull(E.SHIP_STATUS, '') as SHIPGO_STATUS,
               isnull(E.F_ETA, '') as SHIPGO_ETA,
               isnull(E.A_ETA, '') as SHIPGO_ETC1,
               isnull(E.DEPARTURE_DATE, '') as SHIPGO_ETC2,
               isnull(E.ARRIVAL_DATE, '') as SHIPGO_ETC3,
               isnull(E.DISCHARGE_DATE, '') as SHIPGO_ETC4,
               isnull(E.LOADING_DATE, '') as SHIPGO_ETC5,
               isnull(E.UPD_DATETIME, '') as UPD_DATETIME,
               sum(B.WEIGHT) as S_WEIGHT,
               sum(B.CBM) as S_CBM
           from
               ksv_shipment_mst A
               left join kcd_code C on A.STATUS_CD = C.CD_CODE
               and C.cd_group = 'SHIPMENT_STATUS'
               left join kcd_code D on A.SHIP_MODE = D.CD_CODE
               and D.cd_group = 'SHIPMENT_SHIP_MODE'
               left join ksv_blno_mst E on A.BL_NO = E.BL_NO,
               ksv_shipment_mem B
           where
               1 = 1
               and A.SHIPMENT_CD = B.SHIPMENT_CD
               and B.STSOUT_CD like 'SOTMP-%'
               and A.REMARK like '%${args.data.REMARK}%'
               and A.SHIPMENT_CD like '%${args.data.SHIPMENT_CD}%' ${sqlShipMode} ${sqlDestination} ${sqlStatus} ${sqlETA} ${sqlETD}
               and A.BL_NO like '%${args.data.BL_NO}%'
               and A.SHIP_MODE like '%${args.data.SHIP_MODE}%'
           group by
               A.SHIPMENT_CD,
               isnull(B.SHIPMENT_CD, ''),
               A.STATUS_CD,
               C.CD_NAME,
               LEFT(A.REG_DATETIME, 8),
               A.SHIP_MODE,
               D.CD_NAME,
               A.ORG_ORIGIN_PORT,
               A.ORG_DESTINATION,
               A.DESTINATION,
               A.IS_SINGAPORE,
               A.BL_NO,
               A.ETA,
               A.SHIPPING_COST,
               A.SHIPPING_COST_CURR,
               A.IMPORT_COST,
               A.SHIP_LINE,
               A.PLACE_CD,
               A.FIX_FLAG,
               A.REMARK,
               E.TRACKING_ID,
               E.SHIP_STATUS,
               E.F_ETA,
               E.A_ETA,
               E.DEPARTURE_DATE,
               E.ARRIVAL_DATE,
               E.DISCHARGE_DATE,
               E.LOADING_DATE,
               E.UPD_DATETIME
       `;
       tRet  =  [];

        var tRet  =  await prisma.$queryRaw(Prisma.raw(sqlStr2));
        console.log(`Count(Step-2):${tRet.length}`);
        tRet.forEach((col, i) => {
            var tOne1 = { ...col };
            tOne1.STATUS_N = '';
            if (tOne1.FIX_FLAG === '1') tOne1.STATUS_N = 'Fixed';
            else  tOne1.STATUS_N = 'Not Fixed';
            if (tOne1.ORG_ORIGIN_PORT) tRetArray.push(tOne1);
        });
        console.log(sqlStr2);
       console.log(sqlStr);

       //  Empty Shipment Mst 
       let sqlStr2 = `
           select
               A.SHIPMENT_CD,
               isnull(B.SHIPMENT_CD, '') as SHIPMENT_CD2,
               A.STATUS_CD,
               C.CD_NAME as STATUS_N,
               LEFT(A.REG_DATETIME, 8) as REG_DATETIME,
               A.SHIP_MODE,
               D.CD_NAME as SHIP_MODE_N,
               A.ORG_ORIGIN_PORT,
               A.ORG_DESTINATION,
               A.DESTINATION,
               A.IS_SINGAPORE,
               A.BL_NO,
               A.ETA,
               A.SHIPPING_COST,
               A.SHIPPING_COST_CURR,
               A.IMPORT_COST,
               A.SHIP_LINE,
               A.PLACE_CD,
               isnull(A.FIX_FLAG, '') as FIX_FLAG,
               A.REMARK,
               isnull(E.TRACKING_ID, '') as TRACKING_ID,
               -- isnull(A.SHIPGO_STATUS, '') as SHIPGO_STATUS,
               isnull(E.SHIP_STATUS, '') as SHIPGO_STATUS,
               isnull(E.F_ETA, '') as SHIPGO_ETA,
               isnull(E.A_ETA, '') as SHIPGO_ETC1,
               isnull(E.DEPARTURE_DATE, '') as SHIPGO_ETC2,
               isnull(E.ARRIVAL_DATE, '') as SHIPGO_ETC3,
               isnull(E.DISCHARGE_DATE, '') as SHIPGO_ETC4,
               isnull(E.LOADING_DATE, '') as SHIPGO_ETC5,
               isnull(E.UPD_DATETIME, '') as UPD_DATETIME,
               sum(B.WEIGHT) as S_WEIGHT,
               sum(B.CBM) as S_CBM
           from
               ksv_shipment_mst A
               left join ksv_shipment_mem B on A.SHIPMENT_CD = B.SHIPMENT_CD
               left join kcd_code C on A.STATUS_CD = C.CD_CODE
               and C.cd_group = 'SHIPMENT_STATUS'
               left join kcd_code D on A.SHIP_MODE = D.CD_CODE
               and D.cd_group = 'SHIPMENT_SHIP_MODE'
               left join ksv_blno_mst E on A.BL_NO = E.BL_NO
           where
               1 = 1
               and A.REMARK like '%${args.data.REMARK}%'
               and A.SHIPMENT_CD like '%${args.data.SHIPMENT_CD}%' ${sqlShipMode} ${sqlDestination} ${sqlStatus} ${sqlETA} ${sqlETD}
               and A.BL_NO like '%${args.data.BL_NO}%'
               and A.SHIP_MODE like '%${args.data.SHIP_MODE}%'
               --and   B.SHIPMENT_CD is null
           group by
               A.SHIPMENT_CD,
               isnull(B.SHIPMENT_CD, ''),
               A.STATUS_CD,
               C.CD_NAME,
               LEFT(A.REG_DATETIME, 8),
               A.SHIP_MODE,
               D.CD_NAME,
               A.ORG_ORIGIN_PORT,
               A.ORG_DESTINATION,
               A.DESTINATION,
               A.IS_SINGAPORE,
               A.BL_NO,
               A.ETA,
               A.SHIPPING_COST,
               A.SHIPPING_COST_CURR,
               A.IMPORT_COST,
               A.SHIP_LINE,
               A.PLACE_CD,
               A.FIX_FLAG,
               A.REMARK,
               E.TRACKING_ID,
               E.SHIP_STATUS,
               E.F_ETA,
               E.A_ETA,
               E.DEPARTURE_DATE,
               E.ARRIVAL_DATE,
               E.DISCHARGE_DATE,
               E.LOADING_DATE,
               E.UPD_DATETIME
       `;
        tRet  =  [];
        var tRet  =  await prisma.$queryRaw(Prisma.raw(sqlStr2));
        console.log(`Count(Step-2=>Empty Shipment Mst):${tRet.length}`);
        tRet.forEach((col, i) => {
            var tOne1 = { ...col };
            tOne1.STATUS_N = '';
            if (tOne1.FIX_FLAG === '1') tOne1.STATUS_N = 'Fixed';
            else  tOne1.STATUS_N = 'Not Fixed';
            var tChk = 0;
            tRetArray.forEach((col2, i2) => {
                if (col2.SHIPMENT_CD === tOne1.SHIPMENT_CD) tChk = 1;
            });
            if (tChk === 0) {
                //if (!tOne1.ORG_ORIGIN_PORT) tRetArray.push(tOne1);
                tRetArray.push(tOne1);
            }
        });
        */

            for (let row of tRetArray) {
                if (!row.BL_NO) continue;
                let sqlStr3 = `
                    select
                        a.tracking_status,
                        a.pol_name,
                        a.etd,
                        a.atd,
                        b.pod_name,
                        b.eta,
                        b.ata,
                        a.update_datetime
                    from
                        (
                            select
                                top 1 *
                            from
                                ksv_tradlinx
                            where
                                1 = 1
                                and bl_no = '${row.BL_NO}'
                                and route_order = 1
                            order by
                                update_datetime desc
                        ) a,
                        (
                            select
                                top 1 *
                            from
                                ksv_tradlinx
                            where
                                1 = 1
                                and bl_no = '${row.BL_NO}'
                                and route_order = (
                                    select
                                        max(route_order)
                                    from
                                        ksv_tradlinx
                                    where
                                        bl_no = '${row.BL_NO}'
                                )
                            order by
                                update_datetime desc
                        ) b
                `;
                let tradlinxResult = (
                    await prisma.$queryRaw(Prisma.raw(sqlStr3))
                )[0];

                if (tradlinxResult) {
                    row.TRADLINX_STATUS = tradlinxResult.tracking_status;
                    row.TRADLINX_POL_NAME = tradlinxResult.pol_name;
                    row.TRADLINX_ETD = tradlinxResult.etd;
                    row.TRADLINX_ATD = tradlinxResult.atd;
                    row.TRADLINX_POD_NAME = tradlinxResult.pod_name;
                    row.TRADLINX_ETA = tradlinxResult.eta;
                    row.TRADLINX_ATA = tradlinxResult.ata;
                    row.TRADLINX_UPDATE_DATETIME =
                        tradlinxResult.update_datetime;
                } else {
                    let isExist = await prisma.$queryRaw(
                        Prisma.raw(
                            `
                                select
                                    top 1 *
                                from
                                    ksv_tradlinx
                                where
                                    1 = 1
                                    and bl_no = '${row.BL_NO}'
                            `,
                        ),
                    );

                    if (isExist.length) {
                        row.TRADLINX_STATUS = '추적대기중';
                    } else {
                        row.TRADLINX_STATUS = 'BL.NO 오류';
                    }
                }

                let isError = await prisma.$queryRaw(
                    Prisma.raw(
                        `
                            select
                                top 1 *
                            from
                                ksv_tradlinx
                            where
                                1 = 1
                                and bl_no = '${row.BL_NO}'
                                and tracking_status = 'ERROR'
                        `,
                    ),
                );

                if (isError.length) {
                    row.TRADLINX_STATUS = 'BL.NO 오류';
                }
            }

            return tRetArray;
        },

        mgrQueryS0434_3_2: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }
            let sqlStr = `
                SELECT
                    A.PU_CD,
                    C.STSOUT_CD,
                    '' as PACK_CD,
                    D.INVOICE_NO,
                    D.TRADE_TERM,
                    D.READY_DATE,
                    A.ETA,
                    D.ORIGIN_PORT,
                    D.DESTINATION,
                    D.CT_QTY,
                    D.CBM,
                    D.WEIGHT,
                    A.VENDOR_CD,
                    A.BUYER_CD,
                    A.PO_CD2 as PO_CD
                FROM
                    KSV_PU_MST2 A,
                    KSV_SHIPMENT_MEM D,
                    (
                        select
                            PU_CD,
                            STSOUT_CD,
                            sum(OUT_QTY) as S_OUT_QTY
                        from
                            KSV_STOCK_OUT
                        where
                            PU_CD is not null
                            and PU_CD <> ''
                        group by
                            PU_CD,
                            STSOUT_CD
                    ) C
                WHERE
                    A.PU_CD = C.PU_CD
                    AND C.STSOUT_CD = D.STSOUT_CD
                    AND D.SHIPMENT_CD = '${args.data.SHIPMENT_CD}'
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },

        mgrQueryS0434_3_1_bak: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }

            var sETA = args.data.S_ETA;
            var eETA = args.data.E_ETA;
            if (sETA === '') {
                sETA = `${tRetDate1.substring(0, 4)}0101`;
            }
            if (eETA === '') {
                eETA = '99999999';
            }

            var sETD = args.data.S_ETD;
            var eETD = args.data.E_ETD;
            if (sETD === '') {
                sETD = `${tRetDate1.substring(0, 4)}0101`;
            }
            if (eETD === '') {
                eETD = '99999999';
            }

            var tSQL10 = `           and   A.ETA between '${sETA}' and '${eETA}'  `;
            var tSQL11 = `           and   LEFT(A.REG_DATETIME, 8) between '${sETD}' and '${eETD}'  `;
            if (args.data.REMARK !== '') {
                tSQL10 = '';
                tSQL11 = '';
            } else {
                if (args.data.S_ETA === '' && args.data.E_ETA === '')
                    tSQL10 = '';
                if (args.data.S_ETD === '' && args.data.E_ETD === '')
                    tSQL11 = '';
            }

            var sqlStatus = '';
            if (args.data.STATUS_CD === '6')
                sqlStatus = `           and   A.STATUS_CD <> '4'  `;
            else
                sqlStatus = `           and   A.STATUS_CD like '%${args.data.STATUS_CD}%' `;

            let sqlStr = `
                select
                    A.SHIPMENT_CD,
                    A.STATUS_CD,
                    C.CD_NAME as STATUS_N,
                    LEFT(A.REG_DATETIME, 8) as REG_DATETIME,
                    A.SHIP_MODE,
                    D.CD_NAME as SHIP_MODE_N,
                    A.ORG_ORIGIN_PORT,
                    A.ORG_DESTINATION,
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
                    isnull(E.TRACKING_ID, '') as TRACKING_ID,
                    -- isnull(A.SHIPGO_STATUS, '') as SHIPGO_STATUS,
                    isnull(E.SHIP_STATUS, '') as SHIPGO_STATUS,
                    isnull(E.F_ETA, '') as SHIPGO_ETA,
                    isnull(E.A_ETA, '') as SHIPGO_ETC1,
                    isnull(E.DEPARTURE_DATE, '') as SHIPGO_ETC2,
                    isnull(E.ARRIVAL_DATE, '') as SHIPGO_ETC3,
                    isnull(E.DISCHARGE_DATE, '') as SHIPGO_ETC4,
                    isnull(E.LOADING_DATE, '') as SHIPGO_ETC5,
                    isnull(E.UPD_DATETIME, '') as UPD_DATETIME,
                    sum(B.WEIGHT) as S_WEIGHT,
                    sum(B.CBM) as S_CBM
                from
                    ksv_shipment_mst A
                    left join kcd_code C on A.STATUS_CD = C.CD_CODE
                    and C.cd_group = 'SHIPMENT_STATUS'
                    -- left join kcd_code D on A.STATUS_CD = D.CD_CODE and C.cd_group = 'DELIVERY_TYPE'
                    left join kcd_code D on A.SHIP_MODE = D.CD_CODE
                    and D.cd_group = 'SHIPMENT_SHIP_MODE'
                    left join ksv_blno_mst E on A.BL_NO = E.BL_NO
                    left join ksv_shipment_mem B on B.SHIPMENT_CD = A.SHIPMENT_CD
                    -- ksv_shipment_mem B 
                    -- left join ksv_stock_out C1 on B.STSOUT_CD = C1.STSOUT_CD
                where
                    A.SHIP_MODE like '%${args.data.SHIP_MODE}%'
                    and A.ORG_ORIGIN_PORT like '%${args.data.ORIGIN_PORT}%'
                    and A.ORG_DESTINATION like '%${args.data.DESTINATION}%' ${sqlStatus}
                    and (
                        A.REMARK like '%${args.data.REMARK}%'
                        or A.REMARK2 like '%${args.data.REMARK}%'
                    ) ${tSQL10} ${tSQL11}
                group by
                    A.SHIPMENT_CD,
                    A.STATUS_CD,
                    C.CD_NAME,
                    LEFT(A.REG_DATETIME, 8),
                    A.SHIP_MODE,
                    D.CD_NAME,
                    A.ORG_ORIGIN_PORT,
                    A.ORG_DESTINATION,
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
                    E.TRACKING_ID,
                    E.SHIP_STATUS,
                    E.F_ETA,
                    E.A_ETA,
                    E.DEPARTURE_DATE,
                    E.ARRIVAL_DATE,
                    E.DISCHARGE_DATE,
                    E.LOADING_DATE,
                    E.UPD_DATETIME
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            var tRetArray = [];

            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tOne1 = { ...tRet[tIdx] };

                let sqlStr0 = `
                    select
                        *
                    from
                        kcd_fileinfo
                    where
                        kind = 'SHIPMENT'
                        and file_key = '${tOne1.SHIPMENT_CD}'
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr0));

                tOne1.BL_FILE = '';
                // tOne1.BL_FILE_URL = '';

                if (tRet0.length > 0) {
                    tOne1.BL_FILE = tRet0[0].NAME;
                    // tOne1.BL_FILE_URL = tRet0[0].URL;
                }

                if (tOne1.SHIPGO_ETA !== '')
                    tOne1.ETA = tOne1.SHIPGO_ETA.replace(/-/gi, '');
                else if (tOne1.SHIPGO_ETC1 !== '' && tOne1.SHIPGO_ETC1 !== '-')
                    tOne1.ETA = tOne1.SHIPGO_ETC1.replace(/-/gi, '');

                tRetArray.push(tOne1);
            }

            return tRetArray;
        },

        mgrQueryS0434_3_1_bak1: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }

            var sETA = args.data.S_ETA;
            var eETA = args.data.E_ETA;
            if (sETA === '') {
                sETA = `${tRetDate1.substring(0, 4)}0101`;
            }
            if (eETA === '') {
                eETA = '99999999';
            }

            var sETD = args.data.S_ETD;
            var eETD = args.data.E_ETD;
            if (sETD === '') {
                sETD = `${tRetDate1.substring(0, 4)}0101`;
            }
            if (eETD === '') {
                eETD = '99999999';
            }

            var tSQL10 = `           and   A.ETA between '${sETA}' and '${eETA}'  `;
            var tSQL11 = `           and   LEFT(A.REG_DATETIME, 8) between '${sETD}' and '${eETD}'  `;
            if (args.data.REMARK !== '') {
                tSQL10 = '';
                tSQL11 = '';
            } else {
                if (args.data.S_ETA === '' && args.data.E_ETA === '')
                    tSQL10 = '';
                if (args.data.S_ETD === '' && args.data.E_ETD === '')
                    tSQL11 = '';
            }

            var sqlStatus = '';
            if (args.data.STATUS_CD === '6')
                sqlStatus = `           and   A.STATUS_CD <> '4'  `;
            else
                sqlStatus = `           and   A.STATUS_CD like '%${args.data.STATUS_CD}%' `;

            let sqlStr = `
                select distinct
                    A.SHIPMENT_CD,
                    A.STATUS_CD,
                    C.CD_NAME as STATUS_N,
                    LEFT(A.REG_DATETIME, 8) as REG_DATETIME,
                    A.SHIP_MODE,
                    D.CD_NAME as SHIP_MODE_N,
                    A.ORG_ORIGIN_PORT,
                    A.ORG_DESTINATION,
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
                    -- A.PACK_CD_0, 
                    '' as PACK_CD_0,
                    A.DELIVERY_TYPE_0,
                    A.SHIP_DATE_0,
                    isnull(E.TRACKING_ID, '') as TRACKING_ID,
                    -- isnull(A.SHIPGO_STATUS, '') as SHIPGO_STATUS,
                    isnull(E.SHIP_STATUS, '') as SHIPGO_STATUS,
                    isnull(E.F_ETA, '') as SHIPGO_ETA,
                    isnull(E.A_ETA, '') as SHIPGO_ETC1,
                    isnull(E.DEPARTURE_DATE, '') as SHIPGO_ETC2,
                    isnull(E.ARRIVAL_DATE, '') as SHIPGO_ETC3,
                    isnull(E.DISCHARGE_DATE, '') as SHIPGO_ETC4,
                    isnull(E.LOADING_DATE, '') as SHIPGO_ETC5,
                    isnull(E.UPD_DATETIME, '') as UPD_DATETIME,
                    sum(B.WEIGHT) as S_WEIGHT,
                    sum(B.CBM) as S_CBM
                from
                    (
                        select
                            K.PACK_CD as PACK_CD_0,
                            K.DELIVERY_TYPE as DELIVERY_TYPE_0,
                            K.SHIP_DATE as SHIP_DATE_0,
                            K.SHIPMENT_CD,
                            isnull(A0.STATUS_CD, '') as STATUS_CD,
                            isnull(LEFT(A0.REG_DATETIME, 8), '') as REG_DATETIME,
                            isnull(A0.SHIP_MODE, '') as SHIP_MODE,
                            isnull(A0.ORG_ORIGIN_PORT, '') as ORG_ORIGIN_PORT,
                            isnull(A0.ORG_DESTINATION, '') as ORG_DESTINATION,
                            isnull(A0.DESTINATION, '') as DESTINATION,
                            isnull(A0.IS_SINGAPORE, '') as IS_SINGAPORE,
                            isnull(A0.BL_NO, '') as BL_NO,
                            isnull(A0.ETA, '') as ETA,
                            isnull(A0.SHIPPING_COST, '') as SHIPPING_COST,
                            isnull(A0.IMPORT_COST, '') as IMPORT_COST,
                            isnull(A0.SHIP_LINE, '') as SHIP_LINE,
                            isnull(A0.PLACE_CD, '') as PLACE_CD,
                            isnull(A0.FIX_FLAG, '') as FIX_FLAG,
                            isnull(A0.REMARK, '') as REMARK
                        from
                            (
                                select distinct
                                    p.PACK_CD,
                                    p.DELIVERY_TYPE,
                                    p.SHIP_DATE,
                                    isnull(p1.SHIPMENT_CD, '') as SHIPMENT_CD
                                from
                                    ksv_stock_out p
                                    left join ksv_shipment_mem p1 on p1.stsout_cd = p.stsout_cd
                                where
                                    left(p.out_datetime, 8) > '20240701'
                                    and p.PACK_CD like '%${args.data.REMARK}%'
                            ) K
                            left join ksv_shipment_mst A0 on K.SHIPMENT_CD = A0.SHIPMENT_CD
                            and (
                                A0.REMARK like '%${args.data.REMARK}%'
                                or A0.REMARK2 like '%${args.data.REMARK}%'
                            )
                    ) A
                    left join kcd_code C on A.STATUS_CD = C.CD_CODE
                    and C.cd_group = 'SHIPMENT_STATUS'
                    left join kcd_code D on A.SHIP_MODE = D.CD_CODE
                    and D.cd_group = 'SHIPMENT_SHIP_MODE'
                    left join ksv_blno_mst E on A.BL_NO = E.BL_NO
                    left join ksv_shipment_mem B on B.SHIPMENT_CD = A.SHIPMENT_CD
                where
                    A.SHIP_MODE like '%${args.data.SHIP_MODE}%'
                    and A.ORG_ORIGIN_PORT like '%${args.data.ORIGIN_PORT}%'
                    and A.ORG_DESTINATION like '%${args.data.DESTINATION}%' ${sqlStatus} ${tSQL10} ${tSQL11}
                group by
                    A.SHIPMENT_CD,
                    A.STATUS_CD,
                    C.CD_NAME,
                    LEFT(A.REG_DATETIME, 8),
                    A.SHIP_MODE,
                    D.CD_NAME,
                    A.ORG_ORIGIN_PORT,
                    A.ORG_DESTINATION,
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
                    E.TRACKING_ID,
                    E.SHIP_STATUS,
                    E.F_ETA,
                    E.A_ETA,
                    E.DEPARTURE_DATE,
                    E.ARRIVAL_DATE,
                    E.DISCHARGE_DATE,
                    E.LOADING_DATE,
                    E.UPD_DATETIME,
                    A.PACK_CD_0,
                    A.SHIP_DATE_0,
                    A.DELIVERY_TYPE_0
                order by
                    A.SHIP_DATE_0 desc
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            console.log(`Count(Step-1):${tRet.length}`);

            var tRetArray = [];

            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tOne1 = { ...tRet[tIdx] };

                let sqlStr0 = `
                    select
                        *
                    from
                        kcd_fileinfo
                    where
                        kind = 'SHIPMENT'
                        and file_key = '${tOne1.SHIPMENT_CD}'
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr0));

                tOne1.BL_FILE = '';
                // tOne1.BL_FILE_URL = '';

                if (tRet0.length > 0) {
                    tOne1.BL_FILE = tRet0[0].NAME;
                    // tOne1.BL_FILE_URL = tRet0[0].URL;
                }

                if (tOne1.SHIPGO_ETA !== '')
                    tOne1.ETA = tOne1.SHIPGO_ETA.replace(/-/gi, '');
                else if (tOne1.SHIPGO_ETC1 !== '' && tOne1.SHIPGO_ETC1 !== '-')
                    tOne1.ETA = tOne1.SHIPGO_ETC1.replace(/-/gi, '');

                if (tOne1.REMARK === '') tOne1.REMARK = tOne1.PACK_CD_0;
                if (tOne1.REG_DATETIME === '')
                    tOne1.REG_DATETIME = tOne1.SHIP_DATE_0;

                tRetArray.push(tOne1);
                if (tRetArray.length > 200) break;
            }

            let sqlStr2 = `
                select
                    A.SHIPMENT_CD,
                    isnull(B.SHIPMENT_CD, '') as SHIPMENT_CD2,
                    A.STATUS_CD,
                    C.CD_NAME as STATUS_N,
                    LEFT(A.REG_DATETIME, 8) as REG_DATETIME,
                    A.SHIP_MODE,
                    D.CD_NAME as SHIP_MODE_N,
                    A.ORG_ORIGIN_PORT,
                    A.ORG_DESTINATION,
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
                    isnull(E.TRACKING_ID, '') as TRACKING_ID,
                    -- isnull(A.SHIPGO_STATUS, '') as SHIPGO_STATUS,
                    isnull(E.SHIP_STATUS, '') as SHIPGO_STATUS,
                    isnull(E.F_ETA, '') as SHIPGO_ETA,
                    isnull(E.A_ETA, '') as SHIPGO_ETC1,
                    isnull(E.DEPARTURE_DATE, '') as SHIPGO_ETC2,
                    isnull(E.ARRIVAL_DATE, '') as SHIPGO_ETC3,
                    isnull(E.DISCHARGE_DATE, '') as SHIPGO_ETC4,
                    isnull(E.LOADING_DATE, '') as SHIPGO_ETC5,
                    isnull(E.UPD_DATETIME, '') as UPD_DATETIME,
                    sum(B.WEIGHT) as S_WEIGHT,
                    sum(B.CBM) as S_CBM
                from
                    ksv_shipment_mst A
                    left join kcd_code C on A.STATUS_CD = C.CD_CODE
                    and C.cd_group = 'SHIPMENT_STATUS'
                    left join kcd_code D on A.SHIP_MODE = D.CD_CODE
                    and D.cd_group = 'SHIPMENT_SHIP_MODE'
                    left join ksv_blno_mst E on A.BL_NO = E.BL_NO
                    left join ksv_shipment_mem B on B.SHIPMENT_CD = A.SHIPMENT_CD
                where
                    isnull(B.SHIPMENT_CD, '') = ''
                group by
                    A.SHIPMENT_CD,
                    isnull(B.SHIPMENT_CD, ''),
                    A.STATUS_CD,
                    C.CD_NAME,
                    LEFT(A.REG_DATETIME, 8),
                    A.SHIP_MODE,
                    D.CD_NAME,
                    A.ORG_ORIGIN_PORT,
                    A.ORG_DESTINATION,
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
                    E.TRACKING_ID,
                    E.SHIP_STATUS,
                    E.F_ETA,
                    E.A_ETA,
                    E.DEPARTURE_DATE,
                    E.ARRIVAL_DATE,
                    E.DISCHARGE_DATE,
                    E.LOADING_DATE,
                    E.UPD_DATETIME
            `;
            tRet = [];
            if (args.data.STATUS_CD === '0') {
                // Not Fiexed
                var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr2));
                console.log(`Count(Step-2):${tRet.length}`);
                tRet.forEach((col, i) => {
                    tRetArray.push(col);
                });
            }

            console.log(sqlStr);
            return tRetArray;
        },

        mgrQueryS0434_3_1_0926: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var sqlShipMode = '';
            if (!args.data.SHIP_MODE);
            else {
                if (
                    args.data.SHIP_MODE === '1' ||
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
            }

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

            var sqlOriginPort = '';

            var sqlStatus = ''; // 6: Not end, 0: Not Fixed, 1: Fixed, 2: on the way, 3: Arrival, 5: Discharge, 4: End
            var sqlStatus1 = ''; // 6: Not end, 0: Not Fixed, 1: Fixed, 2: on the way, 3: Arrival, 5: Discharge, 4: End
            if (!args.data.STATUS_CD);
            else {
                if (args.data.STATUS_CD === '6') {
                    // Not End
                    sqlStatus = ` and (A.end_date is null or A.end_date = '') `;
                } else if (args.data.STATUS_CD === '0') {
                    // Not Fix
                    sqlStatus = ` and A.ETA_0 = ''  `;
                    sqlStatus += ` and (A.fix_flag = '9' or ( A.fix_flag = '' or A.fix_flag = '0')) `;
                } else if (args.data.STATUS_CD === '1') {
                    // Fix
                    sqlStatus = ` and ((A.ETA_0 <> '' and A.ETA_0 > '20250630' and a.fix_flag = '9' )  `;
                    sqlStatus += ` or  (A.fix_flag = '1'))  `;
                } else if (args.data.STATUS_CD === '4') {
                    //  End
                    sqlStatus = ` and (A.end_date is not null and A.end_date <> '')  `;
                } else if (args.data.STATUS_CD === '3') {
                    //  Arrival
                    sqlStatus = ` and (A.ETA_0 <> '' and A.ETA_0 <= '20250630' ) `;
                } else {
                    sqlStatus = ` and (A.ETA_0 = '')  `;
                    sqlStatus += ` and A.STATUS_CD = '${args.data.STATUS_CD}'  `;
                }
            }

            var sqlETA = '';
            if (!args.data.S_ETA && !args.data.E_ETA);
            else {
                var sETA = args.data.S_ETA;
                var eETA = args.data.E_ETA;
                if (sETA === '') {
                    sETA = `${tRetDate1.substring(0, 4)}0101`;
                }
                if (eETA === '') {
                    eETA = '99999999';
                }
                sqlETA = ` and (p.eta between '${sETA}' and '${eETA}'  `;
                sqlETA += ` or  p1.eta between '${sETA}' and '${eETA}')  `;
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
                sqlETD = ` and ((A.SHIP_DATE_0 between '${sETD}' and '${eETD}')     `;
                sqlETD += ` or  (A.REG_DATETIME between '${sETD}' and '${eETD}'))   `;
            }
            /*
       if (!args.data.S_ETD && !args.data.E_ETD) ;
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
       */

            var sqlTmp = '';
            if (args.data.SHIPMENT_CD) sqlTmp = 'inner join';
            else sqlTmp = 'left join';

            let sqlStr = `
                select
                    A.PACK_CD_0,
                    A.DELIVERY_TYPE_0,
                    A.DELIVERY_TYPE_N_0,
                    A.SHIP_DATE_0,
                    A.ETA_0,
                    A.OUT_FACTORY_CD,
                    A.SHIPMENT_CD,
                    A.STATUS_CD,
                    C.CD_NAME as STATUS_N,
                    isnull(A.REG_DATETIME, '') as REG_DATETIME,
                    A.SHIP_MODE,
                    D.CD_NAME as SHIP_MODE_N,
                    A.ORG_ORIGIN_PORT,
                    A.ORG_DESTINATION,
                    A.DESTINATION,
                    A.IS_SINGAPORE,
                    A.BL_NO,
                    A.ETA,
                    A.ATA,
                    A.SHIPPING_COST,
                    A.SHIPPING_COST_CURR,
                    A.IMPORT_COST,
                    A.SHIP_LINE,
                    A.PLACE_CD,
                    A.FIX_FLAG,
                    A.REMARK,
                    isnull(E.TRACKING_ID, '') as TRACKING_ID,
                    isnull(E.SHIP_STATUS, '') as SHIPGO_STATUS,
                    isnull(E.F_ETA, '') as SHIPGO_ETA,
                    isnull(E.A_ETA, '') as SHIPGO_ETC1,
                    isnull(E.DEPARTURE_DATE, '') as SHIPGO_ETC2,
                    isnull(E.ARRIVAL_DATE, '') as SHIPGO_ETC3,
                    isnull(E.DISCHARGE_DATE, '') as SHIPGO_ETC4,
                    isnull(E.LOADING_DATE, '') as SHIPGO_ETC5,
                    isnull(E.UPD_DATETIME, '') as UPD_DATETIME,
                    sum(B.WEIGHT) as S_WEIGHT,
                    sum(B.CBM) as S_CBM
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
                            isnull(A0.DESTINATION, '') as DESTINATION,
                            isnull(A0.IS_SINGAPORE, '') as IS_SINGAPORE,
                            isnull(A0.BL_NO, '') as BL_NO,
                            isnull(A0.ETA, '') as ETA,
                            isnull(A0.ATA, '') as ATA,
                            isnull(A0.SHIPPING_COST, '') as SHIPPING_COST,
                            isnull(A0.SHIPPING_COST_CURR, '') as SHIPPING_COST_CURR,
                            isnull(A0.IMPORT_COST, '') as IMPORT_COST,
                            isnull(A0.SHIP_LINE, '') as SHIP_LINE,
                            isnull(A0.PLACE_CD, '') as PLACE_CD,
                            isnull(A0.FIX_FLAG, '9') as FIX_FLAG,
                            isnull(A0.REMARK, '') as REMARK,
                            isnull(A0.END_DATE, '') as END_DATE
                        from
                            (
                                select
                                    p.PACK_CD,
                                    p.DELIVERY_TYPE,
                                    isnull(p2.CD_NAME, '') as DELIVERY_TYPE_N,
                                    p.OUT_FACTORY_CD,
                                    isnull(p1.SHIPMENT_CD, '') as SHIPMENT_CD,
                                    isnull(max(p.SHIP_DATE), '') as SHIP_DATE,
                                    isnull(max(p.ETA), '') as ETA
                                from
                                    ksv_stock_out p ${sqlTmp} ksv_shipment_mst p1 on p1.remark = p.pack_cd
                                    and p1.shipment_cd like '%${args.data.SHIPMENT_CD}%'
                                    left join kcd_code p2 on p.DELIVERY_TYPE = p2.CD_CODE
                                    and p2.cd_group = 'DELIVERY_TYPE'
                                where
                                    left(p.out_datetime, 8) > '20240701'
                                    and p.PACK_CD like '%${args.data.REMARK}%'
                                    and p.PACK_CD is not null
                                    and p.PACK_CD <> ''
                                    and left(p.STSOUT_CD, 5) <> 'SOTMP' ${sqlShipMode} ${sqlDestination} ${sqlETA}
                                group by
                                    p.PACK_CD,
                                    p.DELIVERY_TYPE,
                                    p2.CD_NAME,
                                    p.OUT_FACTORY_CD,
                                    isnull(p1.SHIPMENT_CD, '')
                            ) K ${sqlTmp} ksv_shipment_mst A0 on K.SHIPMENT_CD = A0.SHIPMENT_CD
                            and A0.SHIPMENT_CD like '%${args.data.SHIPMENT_CD}%'
                    ) A
                    left join ksv_blno_mst E on A.BL_NO = E.BL_NO
                    left join kcd_code C on A.STATUS_CD = C.CD_CODE
                    and C.cd_group = 'SHIPMENT_STATUS'
                    left join kcd_code D on A.SHIP_MODE = D.CD_CODE
                    and D.cd_group = 'SHIPMENT_SHIP_MODE'
                    left join ksv_shipment_mem B on B.SHIPMENT_CD = A.SHIPMENT_CD
                where
                    1 = 1 ${sqlStatus} ${sqlETD}
                    and A.BL_NO like '%${args.data.BL_NO}%'
                group by
                    A.PACK_CD_0,
                    A.DELIVERY_TYPE_0,
                    A.DELIVERY_TYPE_N_0,
                    A.SHIP_DATE_0,
                    A.ETA_0,
                    A.OUT_FACTORY_CD,
                    A.SHIPMENT_CD,
                    A.STATUS_CD,
                    C.CD_NAME,
                    A.REG_DATETIME,
                    A.SHIP_MODE,
                    D.CD_NAME,
                    A.ORG_ORIGIN_PORT,
                    A.ORG_DESTINATION,
                    A.DESTINATION,
                    A.IS_SINGAPORE,
                    A.BL_NO,
                    A.ETA,
                    A.ATA,
                    A.SHIPPING_COST,
                    A.SHIPPING_COST_CURR,
                    A.IMPORT_COST,
                    A.SHIP_LINE,
                    A.PLACE_CD,
                    A.FIX_FLAG,
                    A.REMARK,
                    isnull(E.TRACKING_ID, ''),
                    isnull(E.SHIP_STATUS, ''),
                    isnull(E.F_ETA, ''),
                    isnull(E.A_ETA, ''),
                    isnull(E.DEPARTURE_DATE, ''),
                    isnull(E.ARRIVAL_DATE, ''),
                    isnull(E.DISCHARGE_DATE, ''),
                    isnull(E.LOADING_DATE, ''),
                    isnull(E.UPD_DATETIME, '')
                order by
                    A.SHIP_DATE_0 desc
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            console.log(`Count(Step-1):${tRet.length}`);

            var tRetArray = [];

            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tOne1 = { ...tRet[tIdx] };

                console.log(`${tOne1.PACK_CD_0}`);

                // if (tOne1.SHIPMENT_CD === '') {
                if (1) {
                    tOne1.STATUS_N = '';
                    // ETA_0은 STSOUT의 ETA
                    if (tOne1.ATA !== '') tOne1.STATUS_N = 'Arrival';
                    else if (tOne1.ETA_0 === '') tOne1.STATUS_N = 'Not Fixed';
                    else {
                        if (parseFloat(tOne1.ETA_0) <= 20250630)
                            tOne1.STATUS_N = 'Arrival';
                        else if (tOne1.ATA !== '') tOne1.STATUS_N = 'Arrival';
                        else tOne1.STATUS_N = 'Fixed';
                    }
                    if (tOne1.FIX_FLAG === '1' && tOne1.STATUS_N !== 'Arrival')
                        tOne1.STATUS_N = 'Fixed';

                    tOne1.SHIP_MODE_N = tOne1.DELIVERY_TYPE_N_0;
                    if (!tOne1.SHIP_MODE)
                        tOne1.SHIP_MODE = tOne1.DELIVERY_TYPE_0;

                    if (!tOne1.ORG_DESTINATION && !tOne1.DESTINATION) {
                        if (tOne1.OUT_FACTORY_CD === 'FC010') {
                            tOne1.ORG_DESTINATION = 'SHINTS';
                            tOne1.DESTINATION = 'SHINTS';
                        } else if (tOne1.OUT_FACTORY_CD === 'FC034') {
                            tOne1.ORG_DESTINATION = 'BVT';
                            tOne1.DESTINATION = 'BVT';
                        } else if (tOne1.OUT_FACTORY_CD === 'ETP') {
                            tOne1.ORG_DESTINATION = 'ETP';
                            tOne1.DESTINATION = 'ETP';
                        }
                    }

                    if (tOne1.ETA);
                    else if (tOne1.ETA_0) tOne1.ETA = tOne1.ETA_0;
                    else tOne1.ETA = '';

                    tOne1.REMARK = tOne1.PACK_CD_0;
                }

                let sqlStr0 = `
                    select
                        *
                    from
                        kcd_fileinfo
                    where
                        kind = 'SHIPMENT'
                        and file_key = '${tOne1.SHIPMENT_CD}'
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr0));

                tOne1.BL_FILE = '';
                // tOne1.BL_FILE_URL = '';

                if (tRet0.length > 0) {
                    tOne1.BL_FILE = tRet0[0].NAME;
                    // tOne1.BL_FILE_URL = tRet0[0].URL;
                }

                if (tOne1.SHIPGO_ETA !== '')
                    tOne1.ETA = tOne1.SHIPGO_ETA.replace(/-/gi, '');
                else if (tOne1.SHIPGO_ETC1 !== '' && tOne1.SHIPGO_ETC1 !== '-')
                    tOne1.ETA = tOne1.SHIPGO_ETC1.replace(/-/gi, '');

                // if (tOne1.REMARK === '') tOne1.REMARK = tOne1.PACK_CD_0;
                if (tOne1.REG_DATETIME === '')
                    tOne1.REG_DATETIME = tOne1.SHIP_DATE_0;

                if (tOne1.ORG_ORIGIN_PORT && tOne1.ORG_DESTINATION)
                    tRetArray.push(tOne1);
                if (tRetArray.length > 200) break;
            }

            sqlShipMode = ` and A.ship_mode like '%${args.data.SHIP_MODE}%' `;
            sqlDestination = ` and A.destination like '%${args.data.DESTINATION}%'   `;
            var sqlOriginPort = '';

            sqlStatus = ''; // 6: Not end, 0: Not Fixed, 1: Fixed, 2: on the way, 3: Arrival, 5: Discharge, 4: End
            if (!args.data.STATUS_CD);
            else {
                if (args.data.STATUS_CD === '6') {
                    // Not End
                    sqlStatus = ` and (A.end_date is null or  A.end_date = '')  `;
                } else if (args.data.STATUS_CD === '0') {
                    // Not Fix
                    sqlStatus = ` and (A.fix_flag is not null and ( A.fix_flag = '' or A.fix_flag = '0')) `;
                } else if (args.data.STATUS_CD === '1') {
                    // Fix
                    sqlStatus = ` and (A.fix_flag is not null and  A.fix_flag = '1')  `;
                } else if (args.data.STATUS_CD === '4') {
                    //  End
                    sqlStatus = ` and (A.end_date is not null and A.end_date <> '')  `;
                } else {
                    sqlStatus = ` and A.STATUS_CD = '${args.data.STATUS_CD}'  `;
                }
            }

            sqlETA = '';
            if (!args.data.S_ETA && !args.data.E_ETA);
            else {
                var sETA = args.data.S_ETA;
                var eETA = args.data.E_ETA;
                if (sETA === '') {
                    sETA = `${tRetDate1.substring(0, 4)}0101`;
                }
                if (eETA === '') {
                    eETA = '99999999';
                }
                sqlETA = ` and A.eta between '${sETA}' and '${eETA}'  `;
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
                sqlETD = ` and A.etd between '${sETD}' and '${eETD}'  `;
            }

            // Materfial Freight
            let sqlStr2 = `
                select
                    A.SHIPMENT_CD,
                    isnull(B.SHIPMENT_CD, '') as SHIPMENT_CD2,
                    A.STATUS_CD,
                    C.CD_NAME as STATUS_N,
                    LEFT(A.REG_DATETIME, 8) as REG_DATETIME,
                    A.SHIP_MODE,
                    D.CD_NAME as SHIP_MODE_N,
                    A.ORG_ORIGIN_PORT,
                    A.ORG_DESTINATION,
                    A.DESTINATION,
                    A.IS_SINGAPORE,
                    A.BL_NO,
                    A.ETA,
                    A.SHIPPING_COST,
                    A.SHIPPING_COST_CURR,
                    A.IMPORT_COST,
                    A.SHIP_LINE,
                    A.PLACE_CD,
                    isnull(A.FIX_FLAG, '') as FIX_FLAG,
                    A.REMARK,
                    isnull(E.TRACKING_ID, '') as TRACKING_ID,
                    -- isnull(A.SHIPGO_STATUS, '') as SHIPGO_STATUS,
                    isnull(E.SHIP_STATUS, '') as SHIPGO_STATUS,
                    isnull(E.F_ETA, '') as SHIPGO_ETA,
                    isnull(E.A_ETA, '') as SHIPGO_ETC1,
                    isnull(E.DEPARTURE_DATE, '') as SHIPGO_ETC2,
                    isnull(E.ARRIVAL_DATE, '') as SHIPGO_ETC3,
                    isnull(E.DISCHARGE_DATE, '') as SHIPGO_ETC4,
                    isnull(E.LOADING_DATE, '') as SHIPGO_ETC5,
                    isnull(E.UPD_DATETIME, '') as UPD_DATETIME,
                    sum(B.WEIGHT) as S_WEIGHT,
                    sum(B.CBM) as S_CBM
                from
                    ksv_shipment_mst A
                    left join kcd_code C on A.STATUS_CD = C.CD_CODE
                    and C.cd_group = 'SHIPMENT_STATUS'
                    left join kcd_code D on A.SHIP_MODE = D.CD_CODE
                    and D.cd_group = 'SHIPMENT_SHIP_MODE'
                    left join ksv_blno_mst E on A.BL_NO = E.BL_NO,
                    ksv_shipment_mem B
                where
                    1 = 1
                    and A.SHIPMENT_CD = B.SHIPMENT_CD
                    and B.STSOUT_CD like 'SOTMP-%'
                    and A.REMARK like '%${args.data.REMARK}%'
                    and A.SHIPMENT_CD like '%${args.data.SHIPMENT_CD}%' ${sqlShipMode} ${sqlDestination} ${sqlStatus} ${sqlETA} ${sqlETD}
                    and A.BL_NO like '%${args.data.BL_NO}%'
                    and A.SHIP_MODE like '%${args.data.SHIP_MODE}%'
                group by
                    A.SHIPMENT_CD,
                    isnull(B.SHIPMENT_CD, ''),
                    A.STATUS_CD,
                    C.CD_NAME,
                    LEFT(A.REG_DATETIME, 8),
                    A.SHIP_MODE,
                    D.CD_NAME,
                    A.ORG_ORIGIN_PORT,
                    A.ORG_DESTINATION,
                    A.DESTINATION,
                    A.IS_SINGAPORE,
                    A.BL_NO,
                    A.ETA,
                    A.SHIPPING_COST,
                    A.SHIPPING_COST_CURR,
                    A.IMPORT_COST,
                    A.SHIP_LINE,
                    A.PLACE_CD,
                    A.FIX_FLAG,
                    A.REMARK,
                    E.TRACKING_ID,
                    E.SHIP_STATUS,
                    E.F_ETA,
                    E.A_ETA,
                    E.DEPARTURE_DATE,
                    E.ARRIVAL_DATE,
                    E.DISCHARGE_DATE,
                    E.LOADING_DATE,
                    E.UPD_DATETIME
            `;
            tRet = [];

            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr2));
            console.log(`Count(Step-2):${tRet.length}`);
            tRet.forEach((col, i) => {
                var tOne1 = { ...col };
                tOne1.STATUS_N = '';
                if (tOne1.FIX_FLAG === '1') tOne1.STATUS_N = 'Fixed';
                else tOne1.STATUS_N = 'Not Fixed';
                /*
            if (tOne1.ETA === '') tOne1.STATUS_N = 'Not End';
            else  tOne1.STATUS_N = 'End';
            */
                /*
            if (tOne1.FIX_FLAG === '') tOne1.STATUS_N = 'Not End';
            else  tOne1.STATUS_N = 'End';
            */
                if (tOne1.ORG_ORIGIN_PORT) tRetArray.push(tOne1);
            });
            console.log(sqlStr2);
            console.log(sqlStr);

            //  Empty Shipment Mst
            let sqlStr2 = `
                select
                    A.SHIPMENT_CD,
                    isnull(B.SHIPMENT_CD, '') as SHIPMENT_CD2,
                    A.STATUS_CD,
                    C.CD_NAME as STATUS_N,
                    LEFT(A.REG_DATETIME, 8) as REG_DATETIME,
                    A.SHIP_MODE,
                    D.CD_NAME as SHIP_MODE_N,
                    A.ORG_ORIGIN_PORT,
                    A.ORG_DESTINATION,
                    A.DESTINATION,
                    A.IS_SINGAPORE,
                    A.BL_NO,
                    A.ETA,
                    A.SHIPPING_COST,
                    A.SHIPPING_COST_CURR,
                    A.IMPORT_COST,
                    A.SHIP_LINE,
                    A.PLACE_CD,
                    isnull(A.FIX_FLAG, '') as FIX_FLAG,
                    A.REMARK,
                    isnull(E.TRACKING_ID, '') as TRACKING_ID,
                    -- isnull(A.SHIPGO_STATUS, '') as SHIPGO_STATUS,
                    isnull(E.SHIP_STATUS, '') as SHIPGO_STATUS,
                    isnull(E.F_ETA, '') as SHIPGO_ETA,
                    isnull(E.A_ETA, '') as SHIPGO_ETC1,
                    isnull(E.DEPARTURE_DATE, '') as SHIPGO_ETC2,
                    isnull(E.ARRIVAL_DATE, '') as SHIPGO_ETC3,
                    isnull(E.DISCHARGE_DATE, '') as SHIPGO_ETC4,
                    isnull(E.LOADING_DATE, '') as SHIPGO_ETC5,
                    isnull(E.UPD_DATETIME, '') as UPD_DATETIME,
                    sum(B.WEIGHT) as S_WEIGHT,
                    sum(B.CBM) as S_CBM
                from
                    ksv_shipment_mst A
                    left join ksv_shipment_mem B on A.SHIPMENT_CD = B.SHIPMENT_CD
                    left join kcd_code C on A.STATUS_CD = C.CD_CODE
                    and C.cd_group = 'SHIPMENT_STATUS'
                    left join kcd_code D on A.SHIP_MODE = D.CD_CODE
                    and D.cd_group = 'SHIPMENT_SHIP_MODE'
                    left join ksv_blno_mst E on A.BL_NO = E.BL_NO
                where
                    1 = 1
                    and A.REMARK like '%${args.data.REMARK}%'
                    and A.SHIPMENT_CD like '%${args.data.SHIPMENT_CD}%' ${sqlShipMode} ${sqlDestination} ${sqlStatus} ${sqlETA} ${sqlETD}
                    and A.BL_NO like '%${args.data.BL_NO}%'
                    and A.SHIP_MODE like '%${args.data.SHIP_MODE}%'
                    --and   B.SHIPMENT_CD is null
                group by
                    A.SHIPMENT_CD,
                    isnull(B.SHIPMENT_CD, ''),
                    A.STATUS_CD,
                    C.CD_NAME,
                    LEFT(A.REG_DATETIME, 8),
                    A.SHIP_MODE,
                    D.CD_NAME,
                    A.ORG_ORIGIN_PORT,
                    A.ORG_DESTINATION,
                    A.DESTINATION,
                    A.IS_SINGAPORE,
                    A.BL_NO,
                    A.ETA,
                    A.SHIPPING_COST,
                    A.SHIPPING_COST_CURR,
                    A.IMPORT_COST,
                    A.SHIP_LINE,
                    A.PLACE_CD,
                    A.FIX_FLAG,
                    A.REMARK,
                    E.TRACKING_ID,
                    E.SHIP_STATUS,
                    E.F_ETA,
                    E.A_ETA,
                    E.DEPARTURE_DATE,
                    E.ARRIVAL_DATE,
                    E.DISCHARGE_DATE,
                    E.LOADING_DATE,
                    E.UPD_DATETIME
            `;
            tRet = [];
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr2));
            console.log(`Count(Step-2=>Empty Shipment Mst):${tRet.length}`);
            tRet.forEach((col, i) => {
                var tOne1 = { ...col };
                tOne1.STATUS_N = '';
                if (tOne1.FIX_FLAG === '1') tOne1.STATUS_N = 'Fixed';
                else tOne1.STATUS_N = 'Not Fixed';
                /*
            if (tOne1.ETA === '') tOne1.STATUS_N = 'Not End';
            else  tOne1.STATUS_N = 'End';
            */
                /*
            if (tOne1.FIX_FLAG === '') tOne1.STATUS_N = 'Not End';
            else  tOne1.STATUS_N = 'End';
            */
                var tChk = 0;
                tRetArray.forEach((col2, i2) => {
                    if (col2.SHIPMENT_CD === tOne1.SHIPMENT_CD) tChk = 1;
                });
                if (tChk === 0) {
                    //if (!tOne1.ORG_ORIGIN_PORT) tRetArray.push(tOne1);
                    tRetArray.push(tOne1);
                }
            });

            for (let row of tRetArray) {
                if (!row.BL_NO) continue;
                let sqlStr3 = `
                    select
                        a.tracking_status,
                        a.pol_name,
                        a.etd,
                        a.atd,
                        b.pod_name,
                        b.eta,
                        b.ata,
                        a.update_datetime
                    from
                        (
                            select
                                top 1 *
                            from
                                ksv_tradlinx
                            where
                                1 = 1
                                and bl_no = '${row.BL_NO}'
                                and route_order = 1
                            order by
                                update_datetime desc
                        ) a,
                        (
                            select
                                top 1 *
                            from
                                ksv_tradlinx
                            where
                                1 = 1
                                and bl_no = '${row.BL_NO}'
                                and route_order = (
                                    select
                                        max(route_order)
                                    from
                                        ksv_tradlinx
                                    where
                                        bl_no = '${row.BL_NO}'
                                )
                            order by
                                update_datetime desc
                        ) b
                `;
                let tradlinxResult = (
                    await prisma.$queryRaw(Prisma.raw(sqlStr3))
                )[0];

                if (tradlinxResult) {
                    row.TRADLINX_STATUS = tradlinxResult.tracking_status;
                    row.TRADLINX_POL_NAME = tradlinxResult.pol_name;
                    row.TRADLINX_ETD = tradlinxResult.etd;
                    row.TRADLINX_ATD = tradlinxResult.atd;
                    row.TRADLINX_POD_NAME = tradlinxResult.pod_name;
                    row.TRADLINX_ETA = tradlinxResult.eta;
                    row.TRADLINX_ATA = tradlinxResult.ata;
                    row.TRADLINX_UPDATE_DATETIME =
                        tradlinxResult.update_datetime;
                } else {
                    let isExist = await prisma.$queryRaw(
                        Prisma.raw(
                            `
                                select
                                    top 1 *
                                from
                                    ksv_tradlinx
                                where
                                    1 = 1
                                    and bl_no = '${row.BL_NO}'
                            `,
                        ),
                    );

                    if (isExist.length) {
                        row.TRADLINX_STATUS = '추적대기중';
                    } else {
                        row.TRADLINX_STATUS = 'BL.NO 오류';
                    }
                }

                let isError = await prisma.$queryRaw(
                    Prisma.raw(
                        `
                            select
                                top 1 *
                            from
                                ksv_tradlinx
                            where
                                1 = 1
                                and bl_no = '${row.BL_NO}'
                                and tracking_status = 'ERROR'
                        `,
                    ),
                );

                if (isError.length) {
                    row.TRADLINX_STATUS = 'BL.NO 오류';
                }
            }

            return tRetArray;
        },
    },
};

export default moduleQuery_S0434_3_1;
