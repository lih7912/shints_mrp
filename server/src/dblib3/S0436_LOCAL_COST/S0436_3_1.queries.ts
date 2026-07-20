import { Prisma } from '@prisma/client';
import prisma from '../../db';
const fs = require('fs');

const moduleQuery_S0436_3_1 = {
    Query: {
        mgrQueryS0436_3_1: async (_, args) => {
            var tSQL = '';

            if (args.data.S_ETA) {
                tSQL += `AND A.ETA between '${args.data.S_ETA}' and '${args.data.E_ETA}' `;
            }
            if (args.data.STATUS_CD) {
                tSQL += `AND A.STATUS_CD like '%${args.data.STATUS_CD}%' `;
            }
            if (args.data.ORIGIN_PORT) {
                tSQL += `AND A.ORIGIN_PORT like '%${args.data.ORIGIN_PORT}%' `;
            }
            if (args.data.DESTINATION) {
                tSQL += `AND A.DESTINATION like '%${args.data.DESTINATION}%' `;
            }
            if (args.data.PAYER) {
                tSQL += `AND A.IMPORT_COST_PAID like '%${args.data.PAYER}%' `;
            }
            if (args.data.CUSTOMS_NO) {
                tSQL += `AND A.CLEARANCE_NO like '%${args.data.CUSTOMS_NO}%' `;
            }
            if (args.data.BL_NO) {
                tSQL += `AND A.BL_NO like '%${args.data.BL_NO}%' `;
            }
            if (args.data.REMARK) {
                tSQL += `AND A.REMARK like '%${args.data.REMARK}%' `;
            }

            let sqlStr = `
                select
                    A.SHIPMENT_CD,
                    C.CD_NAME as STATUS_CD,
                    LEFT(A.REG_DATETIME, 8) as REG_DATE,
                    D.CD_NAME as SHIP_MODE,
                    A.ORIGIN_PORT,
                    A.DESTINATION,
                    A.BL_NO,
                    A.ETA,
                    A.ETD,
                    isnull(A.SHIPPING_COST_CURR, '') as SHIPPING_COST_CURR,
                    isnull(A.SHIPPING_COST, 0) as SHIPPING_COST,
                    isnull(A.SHIPPING_COST_PAID, '') as SHIPPING_COST_PAID,
                    isnull(A.IMPORT_COST_CURR, '') as IMPORT_COST_CURR,
                    isnull(A.IMPORT_COST_PAID, '') as IMPORT_COST_PAID,
                    isnull(A.IMPORT_COST, 0) as IMPORT_COST,
                    isnull(A.IMPORT_COST_LOCAL, 0) as IMPORT_COST_LOCAL,
                    isnull(A.IMPORT_COST_CURR_LOCAL, '') as IMPORT_COST_CURR_LOCAL,
                    isnull(A.IMPORT_COST_PAID_LOCAL, '') as IMPORT_COST_PAID_LOCAL,
                    isnull(A.DUTY_COST, 0) as DUTY_COST,
                    isnull(A.CLEARANCE_NO, '') as CUSTOMS_NO,
                    sum(B.WEIGHT) as S_WEIGHT,
                    sum(B.CBM) as S_CBM
                from
                    ksv_shipment_mst A
                    join ksv_shipment_mem B on A.SHIPMENT_CD = B.SHIPMENT_CD
                    join kcd_code C on A.STATUS_CD = C.CD_CODE
                    and C.CD_GROUP = 'SHIPMENT_STATUS'
                    join kcd_code D on A.SHIP_MODE = D.CD_CODE
                    and D.CD_GROUP = 'SHIPMENT_SHIP_MODE'
                where
                    1 = 1 ${tSQL}
                group by
                    A.SHIPMENT_CD,
                    C.CD_NAME,
                    LEFT(A.REG_DATETIME, 8),
                    D.CD_NAME,
                    A.ORIGIN_PORT,
                    A.DESTINATION,
                    A.BL_NO,
                    A.ETA,
                    A.ETD,
                    A.SHIPPING_COST,
                    A.SHIPPING_COST_CURR,
                    A.SHIPPING_COST_PAID,
                    A.IMPORT_COST,
                    A.IMPORT_COST_CURR,
                    A.IMPORT_COST_PAID,
                    A.IMPORT_COST_LOCAL,
                    A.IMPORT_COST_CURR_LOCAL,
                    A.IMPORT_COST_PAID_LOCAL,
                    A.DUTY_COST,
                    A.CLEARANCE_NO
                order by
                    A.ETA
            `;

            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            return tRet;
        },
    },
};

export default moduleQuery_S0436_3_1;
