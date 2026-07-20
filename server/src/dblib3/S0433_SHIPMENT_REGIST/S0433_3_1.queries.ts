import { Prisma } from '@prisma/client';
import prisma from '../../db';
const fs = require('fs');
import AFLib from '../../commlib';

const moduleQuery_S0433_3_1 = {
    Query: {
        mgrQueryS0433_3_1: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }


            var sqlOrigin = '';
            if (args.data.ORIGIN_PORT) {
                var tCols = args.data.ORIGIN_PORT.split('/');
                if (tCols.length > 1) {
                    sqlOrigin = `and (A.ORIGIN_PORT like '%${args.data.ORIGIN_PORT}%' or A.ORIGIN_PORT like '%${tCols[0]}%') `;
                } else {
                    sqlOrigin = `and A.ORIGIN_PORT like '%${args.data.ORIGIN_PORT}%'`;
                }
            }


            let sqlStr = `
                select
                    A.*,
                    isnull(B.CD_NAME, '') as SHIP_MODE_N,
                    isnull(A.INVOICE_NO, '') as INVOICE_NO
                from
                    ksv_shipment_mst A
                    left join kcd_code B on A.SHIP_MODE = B.CD_CODE
                    and B.CD_GROUP = 'SHIPMENT_SHIP_MODE'
                where
                    (
                        A.fix_flag is null
                        or A.fix_flag = ''
                        or A.fix_flag = '0'
                    )
                    -- and A.status_cd = '0'
                    -- and A.ORIGIN_PORT like '%${args.data.ORIGIN_PORT}%'
                    ${sqlOrigin}
                    and A.DESTINATION like '%${args.data.DESTINATION}%'
                    and A.INVOICE_NO like '%${args.data.INVOICE_NO}%'
                order by
                    A.id desc,
                    A.ETD desc
            `;
            var tRet: any[] = await prisma.$queryRaw(Prisma.raw(sqlStr));

            var tRetArray: any[] = [];

            const shipmentList = tRet.map((row) => row.SHIPMENT_CD);

            const weightMap: {
                [key: string]: {
                    s_weight: number;
                    s_cbm: number;
                    target_eta: string;
                };
            } = {};

            if (shipmentList.length > 0) {
                const shipmentIn = shipmentList
                    .map((cd) => `'${cd}'`)
                    .join(',');

                const sql0All = `
                    select
                        shipment_cd,
                        target_eta,
                        isnull(sum(weight), 0) as s_weight,
                        isnull(sum(cbm), 0) as s_cbm
                    from
                        ksv_shipment_mem
                    where
                        shipment_cd in (${shipmentIn})
                    group by
                        shipment_cd,
                        target_eta
                `;
                const tRet0All: any[] = await prisma.$queryRaw(
                    Prisma.raw(sql0All),
                );

                tRet0All.forEach((row) => {
                    const key = row.shipment_cd;
                    weightMap[key] = {
                        s_weight: parseFloat(row.s_weight),
                        s_cbm: parseFloat(row.s_cbm),
                        target_eta: row.target_eta,
                    };
                });
            }

            for (let tIdx = 0; tIdx < tRet.length; tIdx++) {
                const tOne: any = { ...tRet[tIdx] };
                const w = weightMap[tOne.SHIPMENT_CD];

                console.log('w=', w);

                if (w) {
                    tOne.WEIGHT = String(w.s_weight);
                    tOne.CBM = String(w.s_cbm);
                    tOne.TARGET_ETA = w.target_eta || tOne.TARGET_ETA || '';
                } else {
                    tOne.WEIGHT = '0';
                    tOne.CBM = '0';
                    // mst 값 유지
                    tOne.TARGET_ETA = tOne.TARGET_ETA || '';
                }

                tRetArray.push(tOne);
            }

            return tRetArray;
        },
    },
};

export default moduleQuery_S0433_3_1;
