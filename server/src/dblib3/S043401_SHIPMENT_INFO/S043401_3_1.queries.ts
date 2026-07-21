import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기

//
class S043401_COMM {
    async queryS043401_query(argData, contextValue) {
        var tRetDate = AFLib.getCurrTime();
        var tRetDate1 = tRetDate.substring(0, 8);
        var tUserInfo = AFLib.getUserInfo(contextValue);

        var sqlShipMode = '';
        var sqlDestination = '';
        var sqlOriginPort = '';
        var sqlStatus = ''; // 6: Not end, 0: Not Fixed, 1: Fixed, 2: on the way, 3: Arrival, 5: Discharge, 4: End
        var sqlETA = '';
        var sqlETD = '';

        let sqlStr = `
            select distinct
                A.PACK_CD_0,
                A.DELIVERY_TYPE_0,
                A.DELIVERY_TYPE_N_0,
                A.SHIP_DATE_0,
                A.ETA_0,
                A.OUT_FACTORY_CD,
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
                A.SHIPPING_COST_CURR,
                A.IMPORT_COST,
                A.SHIP_LINE,
                A.PLACE_CD,
                A.FIX_FLAG,
                A.REMARK,
                A.DESTINATION_PORT,
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
                        isnull(LEFT(A0.REG_DATETIME, 8), '') as REG_DATETIME,
                        isnull(A0.SHIP_MODE, '') as SHIP_MODE,
                        isnull(A0.ORG_ORIGIN_PORT, '') as ORG_ORIGIN_PORT,
                        isnull(A0.ORG_DESTINATION, '') as ORG_DESTINATION,
                        isnull(A0.DESTINATION, '') as DESTINATION,
                        isnull(A0.IS_SINGAPORE, '') as IS_SINGAPORE,
                        isnull(A0.BL_NO, '') as BL_NO,
                        isnull(A0.ETA, '') as ETA,
                        isnull(A0.SHIPPING_COST, '') as SHIPPING_COST,
                        isnull(A0.SHIPPING_COST_CURR, '') as SHIPPING_COST_CURR,
                        isnull(A0.IMPORT_COST, '') as IMPORT_COST,
                        isnull(A0.SHIP_LINE, '') as SHIP_LINE,
                        isnull(A0.PLACE_CD, '') as PLACE_CD,
                        isnull(A0.FIX_FLAG, '') as FIX_FLAG,
                        isnull(A0.REMARK, '') as REMARK,
                        isnull(A0.DESTINATION_PORT, '') as DESTINATION_PORT
                    from
                        (
                            select distinct
                                p.PACK_CD,
                                p.DELIVERY_TYPE,
                                isnull(p2.CD_NAME, '') as DELIVERY_TYPE_N,
                                p.SHIP_DATE,
                                p.ETA,
                                p.OUT_FACTORY_CD,
                                isnull(p1.SHIPMENT_CD, '') as SHIPMENT_CD
                            from
                                ksv_stock_out p
                                left join ksv_shipment_mem p1 on p1.stsout_cd = p.stsout_cd
                                left join kcd_code p2 on p.DELIVERY_TYPE = p2.CD_CODE
                                and p2.cd_group = 'DELIVERY_TYPE'
                            where
                                left(p.out_datetime, 8) > '20240701'
                                -- and   p.PACK_CD like '%${argData.REMARK}%'
                                and p.PACK_CD = '${argData.REMARK}'
                                and p.PACK_CD is not null
                                and p.PACK_CD <> '' ${sqlShipMode} ${sqlDestination} ${sqlStatus} ${sqlETA} ${sqlETD}
                        ) K
                        left join ksv_shipment_mst A0 on K.SHIPMENT_CD = A0.SHIPMENT_CD
                ) A
                left join ksv_blno_mst E on A.BL_NO = E.BL_NO
                left join kcd_code C on A.STATUS_CD = C.CD_CODE
                and C.cd_group = 'SHIPMENT_STATUS'
                left join kcd_code D on A.SHIP_MODE = D.CD_CODE
                and D.cd_group = 'SHIPMENT_SHIP_MODE'
                left join ksv_shipment_mem B on B.SHIPMENT_CD = A.SHIPMENT_CD
            where
                1 = 1
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
            order by
                A.SHIP_DATE_0 desc
        `;
        var tRet = (await prisma.$queryRaw(Prisma.raw(sqlStr))) as any[];
        console.log(`Count(Step-1):${tRet.length}`);

        var shipmentCdList = Array.from(
            new Set(
                tRet
                    .map((row) => row.SHIPMENT_CD)
                    .filter((shipmentCd) => shipmentCd !== ''),
            ),
        );

        var fileInfoMap = new Map();
        if (shipmentCdList.length > 0) {
            var fileInfoRows = (await prisma.$queryRaw(
                Prisma.sql`
                    select
                        *
                    from
                        kcd_fileinfo
                    where
                        kind = 'SHIPMENT'
                        and file_key in (${Prisma.join(shipmentCdList)})
                `,
            )) as any[];

            fileInfoMap = new Map(
                fileInfoRows.map((row) => [row.FILE_KEY, row]),
            );
        }

        var fallbackBlNo = '';
        if (argData.REMARK !== '') {
            var freightRows = (await prisma.$queryRaw(
                Prisma.sql`
                    select distinct
                        bl_no
                    from
                        kzz_freight
                    where
                        bl_no = ${argData.REMARK}
                `,
            )) as any[];

            if (freightRows.length > 0) {
                fallbackBlNo = freightRows[0].bl_no;
            }
        }

        var tRetArray = [] as any[];

        var tIdx = 0;
        for (tIdx = 0; tIdx < tRet.length; tIdx++) {
            var tOne1 = {
                ...tRet[tIdx],
            };

            console.log(`${tOne1.PACK_CD_0}`);

            tOne1.STATUS_N = '';
            if (tOne1.ETA_0 === '') tOne1.STATUS_N = 'Not Fixed';
            else tOne1.STATUS_N = 'Fixed';
            tOne1.SHIP_MODE_N = tOne1.DELIVERY_TYPE_N_0;
            tOne1.SHIP_MODE = tOne1.DELIVERY_TYPE_0;

            tOne1.ORG_DESTINATION = '';
            tOne1.DESTINATION = '';
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

            tOne1.ETA = tOne1.ETA_0;

            tOne1.BL_FILE = '';

            var fileInfoRow = fileInfoMap.get(tOne1.SHIPMENT_CD);
            if (fileInfoRow) {
                tOne1.BL_FILE = fileInfoRow.NAME;
            }

            if (tOne1.SHIPGO_ETA !== '')
                tOne1.ETA = tOne1.SHIPGO_ETA.replace(/-/gi, '');
            else if (tOne1.SHIPGO_ETC1 !== '' && tOne1.SHIPGO_ETC1 !== '-')
                tOne1.ETA = tOne1.SHIPGO_ETC1.replace(/-/gi, '');

            if (tOne1.REG_DATETIME === '')
                tOne1.REG_DATETIME = tOne1.SHIP_DATE_0;

            if (tOne1.BL_NO === '') {
                tOne1.BL_NO = fallbackBlNo;
            }

            tRetArray.push(tOne1);
            if (tRetArray.length > 200) break;
        }

        console.log(sqlStr);
        return tRetArray;
    }
}

// export default로 Query 내용 내보내기
const moduleQuery_S043401_3_1 = {
    Query: {
        mgrQueryS043401_3_1: async (_, args, contextValue) => {
            let sqlStr = `
                select
                    a.SHIPMENT_CD,
                    a.SHIP_MODE,
                    a.PLACE_CD,
                    a.ORIGIN_PORT,
                    a.BL_NO,
                    a.ETA,
                    a.ETD,
                    a.CONTAINER_NO,
                    a.REG_USER,
                    a.REG_DATETIME,
                    a.UPD_DATETIME,
                    a.STATUS_CD,
                    a.BL_FILE,
                    a.PL_FILE,
                    a.CI_FILE,
                    a.DESTINATION,
                    a.IS_SINGAPORE,
                    a.TRACKING_ID,
                    a.SHIP_LINE,
                    a.A_ETA,
                    a.F_ETA,
                    a.SHIP_STATUS,
                    a.LOADING_DATE,
                    a.DEPARTURE_DATE,
                    a.ARRIVAL_DATE,
                    a.DISCHARGE_DATE,
                    a.GATEOUT_DATE,
                    a.SHIPPING_COST,
                    a.SHIPPING_COST_CURR,
                    a.IMPORT_COST,
                    a.DUTY_COST,
                    isnull(a.FIX_FLAG, '') as FIX_FLAG,
                    a.CLEARANCE_NO,
                    a.REMARK,
                    isnull(a.CBM, '0') as CBM,
                    isnull(b.CD_NAME, '') as STATUS_N,
                    isnull(a.INVOICE_NO, '') as INVOICE_NO,
                    a.DESTINATION_PORT
                from
                    ksv_shipment_mst a
                    left join kcd_code b on a.STATUS_CD = b.CD_CODE
                    and b.CD_GROUP = 'SHIPMENT_STATUS'
                where
                    a.SHIPMENT_CD = '${args.data.SHIPMENT_CD}'
            `;
            var tRet = (await prisma.$queryRaw(Prisma.raw(sqlStr))) as any[];
            var tRetArray = [] as any[];

            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tOne1 = {
                    ...tRet[tIdx],
                };

                console.log('----------------------', tOne1);

                let sqlStr0 = `
                    select
                        *
                    from
                        kcd_fileinfo
                    where
                        kind = 'SHIPMENT'
                        and file_key like '${tOne1.SHIPMENT_CD}-%'
                `;
                var tRet0 = (await prisma.$queryRaw(
                    Prisma.raw(sqlStr0),
                )) as any[];

                tOne1.BL_FILE = '';
                tOne1.BL_FILE_URL = '';
                tOne1.PL_FILE = '';
                tOne1.PL_FILE_URL = '';
                tOne1.CI_FILE = '';
                tOne1.CI_FILE_URL = '';

                tRet0.forEach((col, i) => {
                    if (col.FILE_KEY.includes('-BL_FILE')) {
                        tOne1.BL_FILE = col.NAME;
                        tOne1.BL_FILE_URL = col.URL;
                    }
                    if (col.FILE_KEY.includes('-PL_FILE')) {
                        tOne1.PL_FILE = col.NAME;
                        tOne1.PL_FILE_URL = col.URL;
                    }
                    if (col.FILE_KEY.includes('-CI_FILE')) {
                        tOne1.CI_FILE = col.NAME;
                        tOne1.CI_FILE_URL = col.URL;
                    }
                });

                /*
                let sqlStr1 = `
                    select
                        *
                    from
                        ksv_blno_mst
                    where
                        bl_no = '${tOne1.BL_NO}'
                `;
                var tRet1  =  await prisma.$queryRaw(Prisma.raw(sqlStr1));
                if (tRet1.length > 0) {
                    tOne1.A_ETA = tRet1.A_ETA;
                    tOne1.F_ETA = tRet1.F_ETA;
                }
                */
                const tradlinxBlNo = `${tOne1.BL_NO || ''}`
                    .trim()
                    .replace(/^'+|'+$/g, '')
                    .replace(/'/g, "''");

                var tradlinxResultArr = (await prisma.$queryRaw(
                    Prisma.raw(`
                        select
                            a.tracking_status,
                            a.pol_name,
                            a.etd,
                            a.atd,
                            b.pod_name,
                            b.eta,
                            b.ata
                        from
                            (
                                select
                                    top 1 *
                                from
                                    ksv_tradlinx
                                where
                                    1 = 1
                                    and bl_no = '${tradlinxBlNo}'
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
                                    and bl_no = '${tradlinxBlNo}'
                                    and route_order = (
                                        select
                                            max(route_order)
                                        from
                                            ksv_tradlinx
                                        where
                                            bl_no = '${tradlinxBlNo}'
                                    )
                                order by
                                    update_datetime desc
                            ) b
                    `),
                )) as any[];
                const tradlinxResult = tradlinxResultArr[0] || {};

                console.log(tradlinxResultArr);

                if (tradlinxResult) {
                    //tOne1.ORIGIN_PORT =
                        //tradlinxResult.pol_name || tOne1.ORIGIN_PORT;
                    //tOne1.DESTINATION = tradlinxResult.pod_name || tOne1.DESTINATION;
                    //tOne1.STATUS_N = tradlinxResult.tracking_status;
                    //tOne1.ETD = tradlinxResult.etd || tOne1.ETD;
                    tOne1.ETA = tradlinxResult.eta || tOne1.ETA;
                }

                if (tOne1.FIX_FLAG !== '1') {
                    tOne1.STATUS_N = 'NOT FIXED';
                }

                tRetArray.push(tOne1);
            }

            console.log(tRetArray);

            /*
            if (tRetArray.length <= 0) {
                 var tInObj = { ...args.data };
                 var tFunc = new S043401_COMM();
                 var tRetObj = await tFunc.queryS043401_query(tInObj, contextValue);

                 var tOne1 = { ...tRetObj[0] };

                 var a = {};
                 a.SHIPMENT_CD = '';
                 a.SHIP_MODE = tOne1.SHIP_MODE; 
                 if (a.SHIP_MODE === '2' || a.SHIP_MODE === '3') a.SHIP_MODE = '1'; 
                 else if (a.SHIP_MODE === '1' || a.SHIP_MODE === '31' || a.SHIP_MODE === '4' || a.SHIP_MODE === '5') a.SHIP_MODE = '3'; 
                 else if (a.SHIP_MODE === 'P') a.SHIP_MODE = '4'; 
                 else if (a.SHIP_MODE === 'D') a.SHIP_MODE = '5'; 
                 else if (a.SHIP_MODE === '7' || a.SHIP_MODE === '42' || a.SHIP_MODE === '43') a.SHIP_MODE = '6'; 
                 else if (a.SHIP_MODE === '6') a.SHIP_MODE = '7'; 

                 //
                 a.PLACE_CD = ''; 
                 a.ORIGIN_PORT  = tOne1.ORG_ORIGIN_PORT;
                 a.BL_NO  = tOne1.BL_NO;
                 a.ETA = tOne1.ETA; 
                 a.ETD = tOne1.REG_DATETIME; 
                 a.CONTAINER_NO  = '';
                 a.REG_USER  = '';
                 a.REG_DATETIME = '';
                 a.UPD_DATETIME = ''; 
                 a.STATUS_CD = ''; 
                 a.BL_FILE = '';
                 a.PL_FILE = ''; 
                 a.CI_FILE = '';
                 a.DESTINATION = tOne1.DESTINATION; 
                 a.IS_SINGAPORE = ''; 
                 a.TRACKING_ID = ''; 
                 a.SHIP_LINE = ''; 
                 a.A_ETA = '';
                 a.F_ETA = ''; 
                 a.SHIP_STATUS = '';
                 a.LOADING_DATE = ''; 
                 a.DEPARTURE_DATE = ''; 
                 a.ARRIVAL_DATE = ''; 
                 a.DISCHARGE_DATE  = '';
                 a.GATEOUT_DATE = ''; 
                 a.SHIPPING_COST = '';
                 a.IMPORT_COST = '';
                 a.DUTY_COST = '';
                 a.FIX_FLAG = '';
                 a.CLEARANCE_NO = ''; 
                 a.REMARK = tOne1.REMARK; 
                 a.CBM = '';
                 a.STATUS_N = tOne1.STATUS_N;
                 tRetArray.push(a);
            }
             */

            return tRetArray;
        },

        mgrQueryS043401_3_1_bak: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }
            let sqlStr = `
                select
                    a.SHIPMENT_CD,
                    a.SHIP_MODE,
                    a.PLACE_CD,
                    a.ORIGIN_PORT,
                    a.BL_NO,
                    a.ETA,
                    a.ETD,
                    a.CONTAINER_NO,
                    a.REG_USER,
                    a.REG_DATETIME,
                    a.UPD_DATETIME,
                    a.STATUS_CD,
                    a.BL_FILE,
                    a.PL_FILE,
                    a.CI_FILE,
                    a.DESTINATION,
                    a.IS_SINGAPORE,
                    a.TRACKING_ID,
                    a.SHIP_LINE,
                    a.A_ETA,
                    a.F_ETA,
                    a.SHIP_STATUS,
                    a.LOADING_DATE,
                    a.DEPARTURE_DATE,
                    a.ARRIVAL_DATE,
                    a.DISCHARGE_DATE,
                    a.GATEOUT_DATE,
                    a.SHIPPING_COST,
                    a.IMPORT_COST,
                    a.DUTY_COST,
                    a.FIX_FLAG,
                    a.CLEARANCE_NO,
                    a.REMARK,
                    isnull(a.CBM, '0') as CBM,
                    isnull(b.CD_NAME, '') as STATUS_N
                from
                    ksv_shipment_mst a
                    left join kcd_code b on a.status_cd = b.cd_code
                    and b.cd_group = 'shipment_status'
                where
                    shipment_cd = '${args.data.SHIPMENT_CD}'
            `;
            var tRet = (await prisma.$queryRaw(Prisma.raw(sqlStr))) as any[];
            var tRetArray = [] as any[];

            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tOne1 = {
                    ...tRet[tIdx],
                };

                let sqlStr0 = `
                    select
                        *
                    from
                        kcd_fileinfo
                    where
                        kind = 'SHIPMENT'
                        and file_key like '${tOne1.SHIPMENT_CD}-%'
                `;
                var tRet0 = (await prisma.$queryRaw(
                    Prisma.raw(sqlStr0),
                )) as any[];

                tOne1.BL_FILE = '';
                tOne1.BL_FILE_URL = '';
                tOne1.PL_FILE = '';
                tOne1.PL_FILE_URL = '';
                tOne1.CI_FILE = '';
                tOne1.CI_FILE_URL = '';

                tRet0.forEach((col, i) => {
                    if (col.FILE_KEY.includes('-BL_FILE')) {
                        tOne1.BL_FILE = col.NAME;
                        tOne1.BL_FILE_URL = col.URL;
                    }
                    if (col.FILE_KEY.includes('-PL_FILE')) {
                        tOne1.PL_FILE = col.NAME;
                        tOne1.PL_FILE_URL = col.URL;
                    }
                    if (col.FILE_KEY.includes('-CI_FILE')) {
                        tOne1.CI_FILE = col.NAME;
                        tOne1.CI_FILE_URL = col.URL;
                    }
                });

                const blNoForLookup = `${tOne1.BL_NO || ''}`
                    .trim()
                    .replace(/^'+|'+$/g, '')
                    .replace(/'/g, "''");

                let sqlStr1 = `
                    select
                        *
                    from
                        ksv_blno_mst
                    where
                        bl_no = '${blNoForLookup}'
                `;
                var tRet1 = (await prisma.$queryRaw(
                    Prisma.raw(sqlStr1),
                )) as any[];
                if (tRet1.length > 0) {
                    tOne1.A_ETA = tRet1[0].A_ETA;
                    tOne1.F_ETA = tRet1[0].F_ETA;
                }

                tRetArray.push(tOne1);
            }
            return tRetArray;
        },
    },
};

export default moduleQuery_S043401_3_1;
