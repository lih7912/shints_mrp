import { Prisma } from '@prisma/client';
import prisma from '../../db';

const moduleQuery_S0435_3_1 = {
    Query: {
        mgrQueryS0435_3_1: async (_, args) => {
            let tSQL = '';

            if (args.data.S_ETA !== '') {
                tSQL += `AND A.ETA BETWEEN '${args.data.S_ETA}' AND '${args.data.E_ETA}' `;
            }

            if (args.data.REMARK) {
                tSQL = '';
            }

            const sqlStr = `
                WITH
                    STOCK_WEIGHT AS (
                        SELECT
                            sm.shipment_cd,
                            SUM(ISNULL((so.out_qty * mm.weight) / 1000.0, 0)) AS WEIGHT2,
                            SUM(ISNULL(so.weight, 0)) AS WEIGHT
                        FROM
                            ksv_shipment_mem sm
                            JOIN ksv_stock_out so ON sm.stsout_cd = so.stsout_cd
                            JOIN kcd_matl_mst mm ON so.matl_cd = mm.matl_cd
                        GROUP BY
                            sm.shipment_cd
                    )
                SELECT
                    A.SHIPMENT_CD,
                    C.CD_NAME AS STATUS_CD,
                    LEFT(A.REG_DATETIME, 8) AS REG_DATETIME,
                    D.CD_NAME AS SHIP_MODE,
                    A.ORIGIN_PORT,
                    A.DESTINATION,
                    A.BL_NO,
                    A.ETA,
                    A.ETD,
                    A.REMARK,
                    A.INVOICE_NO,
                    ISNULL(A.SHIPPING_COST, 0) AS SHIPPING_COST,
                    ISNULL(A.IMPORT_COST, 0) AS IMPORT_COST,
                    ISNULL(A.DUTY_COST, 0) AS DUTY_COST,
                    ISNULL(A.SHIPPING_COST_CURR, '') AS SHIPPING_COST_CURR,
                    ISNULL(A.IMPORT_COST_CURR, '') AS IMPORT_COST_CURR,
                    ISNULL(A.SHIPPING_COST_PAID, '') AS SHIPPING_COST_PAID,
                    ISNULL(A.IMPORT_COST_PAID, '') AS IMPORT_COST_PAID,
                    CASE
                        WHEN SUM(B.WEIGHT) = 0 THEN CASE
                            WHEN ISNULL(SW.WEIGHT, 0) <= 0 THEN ISNULL(SW.WEIGHT2, 0)
                            ELSE ISNULL(SW.WEIGHT, 0)
                        END
                        ELSE SUM(B.WEIGHT)
                    END AS S_WEIGHT,
                    SUM(B.CBM) AS S_CBM
                FROM
                    ksv_shipment_mst A
                    JOIN ksv_shipment_mem B ON A.SHIPMENT_CD = B.SHIPMENT_CD
                    JOIN kcd_code C ON A.STATUS_CD = C.CD_CODE
                    AND C.CD_GROUP = 'SHIPMENT_STATUS'
                    JOIN kcd_code D ON A.SHIP_MODE = D.CD_CODE
                    AND D.CD_GROUP = 'SHIPMENT_SHIP_MODE'
                    LEFT JOIN STOCK_WEIGHT SW ON A.SHIPMENT_CD = SW.shipment_cd
                WHERE
                    A.status_cd >= '1' ${tSQL}
                    AND A.BL_NO LIKE '%${args.data.BL_NO}%'
                    AND A.STATUS_CD LIKE '%${args.data.STATUS_CD}%'
                    AND A.SHIP_MODE LIKE '%${args.data.SHIP_MODE}%'
                    AND A.ORIGIN_PORT LIKE '%${args.data.ORIGIN_PORT}%'
                    AND A.DESTINATION LIKE '%${args.data.DESTINATION}%'
                    AND A.SHIPPING_COST_PAID LIKE '%${args.data.PAYER}%'
                    AND A.REMARK LIKE '%${args.data.REMARK}%'
                    AND (
                        A.INVOICE_NO LIKE '%${args.data.INVOICE_NO}%'
                        OR A.INVOICE_NO IS NULL
                    )
                GROUP BY
                    A.SHIPMENT_CD,
                    C.CD_NAME,
                    LEFT(A.REG_DATETIME, 8),
                    D.CD_NAME,
                    A.ORIGIN_PORT,
                    A.DESTINATION,
                    A.BL_NO,
                    A.ETA,
                    A.ETD,
                    A.REMARK,
                    A.INVOICE_NO,
                    A.SHIPPING_COST,
                    A.IMPORT_COST,
                    A.DUTY_COST,
                    A.SHIPPING_COST_CURR,
                    A.IMPORT_COST_CURR,
                    A.SHIPPING_COST_PAID,
                    A.IMPORT_COST_PAID,
                    SW.WEIGHT,
                    SW.WEIGHT2
                ORDER BY
                    LEFT(A.REG_DATETIME, 8) DESC
            `;

            const tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            return tRet;
        },
    },
};

export default moduleQuery_S0435_3_1;
