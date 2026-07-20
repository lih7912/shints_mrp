import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기

// export default로 Query 내용 내보내기
const moduleQuery_S0214_2 = {
    Query: {
        mgrQueryS0214_2: async (_, args) => {
            var tRetDate = AFLib.getCurrTime();

            var tSQL = '';

            var tmpArray = [];
            if (args.data.END_FLAG === '1') tmpArray.push('9');
            if (args.data.END_REPORT_FLAG === '1') tmpArray.push('8');
            if (args.data.PARTIAL_SHIP_FLAG === '1') tmpArray.push('5');

            var e_ship_date = args.data.e_ship_date;
            if (args.data.E_SHIP_DATE === '') {
                e_ship_date = tRetDate.substring(0, 8);
            }

            var tStatusStr = '';
            tmpArray.forEach((col, i) => {
                if (i === 0) tStatusStr += `'${col}'`;
                else tStatusStr += `, '${col}'`;
            });

            if (tStatusStr === '') {
                tStatusStr = `'9', '8', '5'`;
            }

            let sqlStr_shipdate = `
                SELECT
                    A.ORDER_CD,
                    C.STYLE_NAME,
                    A.TOT_CNT,
                    SUM(B.SHIP_CNT) AS SHIP_CNT,
                    MIN(B.SHIP_DATE) AS SHIP_DATE,
                    A.USD_PRICE,
                    A.MATL_AMT,
                    A.FC_PRICE,
                    A.ETC_AMT,
                    A.COMMISSION,
                    A.FC_BEF,
                    D.CD_NAME AS ORDER_STATUS_NAME,
                    A.ORDER_STATUS,
                    A.REMARK,
                    A.FACTORY_CD,
                    A.LINE_CHARGE_PRICE,
                    LEFT(A.END_DATETIME, 8) AS END_DATETIME
                FROM
                    KSV_ORDER_MST A
                    LEFT JOIN KSV_ORDER_SHIP B ON A.ORDER_CD = B.ORDER_CD
                    AND B.SHIP_PTYPE IN ('0', '5'),
                    KCD_STYLE C,
                    KCD_CODE D
                WHERE
                    (
                        A.ORDER_CD IN (
                            SELECT
                                ORDER_CD
                            FROM
                                KSV_ORDER_SHIP
                            WHERE
                                SHIP_DATE BETWEEN '${args.data.S_SHIP_DATE}' AND '${e_ship_date}'
                                AND SHIP_PTYPE IN ('0', '5')
                        )
                    )
                    AND A.ORDER_STATUS IN (${tStatusStr})
                    AND LEFT(A.ORDER_CD, 2) LIKE '%${args.data.BUYER_CD}%'
                    AND A.ORDER_CD LIKE '%${args.data.ORDER_CD}%'
                    AND A.ORDER_TYPE IN ('0', '1')
                    AND C.STYLE_CD = A.STYLE_CD
                    AND D.CD_GROUP = 'ORDER_STATUS'
                    AND D.CD_CODE = A.ORDER_STATUS
                GROUP BY
                    A.ORDER_CD,
                    C.STYLE_NAME,
                    A.TOT_CNT,
                    A.USD_PRICE,
                    A.MATL_AMT,
                    A.FC_PRICE,
                    A.ETC_AMT,
                    A.COMMISSION,
                    A.FC_BEF,
                    D.CD_NAME,
                    A.ORDER_STATUS,
                    A.REMARK,
                    A.FACTORY_CD,
                    A.LINE_CHARGE_PRICE,
                    A.END_DATETIME
                ORDER BY
                    A.ORDER_CD,
                    C.STYLE_NAME
            `;

            let sqlStr_duedate = `
                SELECT
                    A.ORDER_CD,
                    C.STYLE_NAME,
                    A.TOT_CNT,
                    SUM(B.SHIP_CNT) AS SHIP_CNT,
                    MIN(B.SHIP_DATE) AS SHIP_DATE,
                    A.USD_PRICE,
                    A.MATL_AMT,
                    A.FC_PRICE,
                    A.ETC_AMT,
                    A.COMMISSION,
                    A.FC_BEF,
                    D.CD_NAME,
                    A.ORDER_STATUS,
                    A.REMARK,
                    A.FACTORY_CD,
                    A.LINE_CHARGE_PRICE,
                    LEFT(A.END_DATETIME, 8) AS END_DATETIME
                FROM
                    KSV_ORDER_MST A
                    LEFT JOIN KSV_ORDER_SHIP B ON A.ORDER_CD = B.ORDER_CD
                    AND B.SHIP_PTYPE IN ('0', '5'),
                    KCD_STYLE C,
                    KCD_CODE D
                WHERE
                    A.DUE_DATE BETWEEN '${args.data.S_SHIP_DATE}' AND '${e_ship_date}'
                    AND A.SAMPLE_FLAG = '1'
                    AND A.ORDER_STATUS IN (${tStatusStr})
                    AND LEFT(A.ORDER_CD, 2) LIKE '%${args.data.BUYER_CD}%'
                    AND A.ORDER_CD LIKE '%${args.data.ORDER_CD}%'
                    AND A.ORDER_TYPE IN ('0', '1')
                    AND C.STYLE_CD = A.STYLE_CD
                    AND D.CD_GROUP = 'ORDER_STATUS'
                    AND D.CD_CODE = A.ORDER_STATUS
                GROUP BY
                    A.ORDER_CD,
                    C.STYLE_NAME,
                    A.TOT_CNT,
                    A.USD_PRICE,
                    A.MATL_AMT,
                    A.FC_PRICE,
                    A.ETC_AMT,
                    A.COMMISSION,
                    A.FC_BEF,
                    D.CD_NAME,
                    A.ORDER_STATUS,
                    A.REMARK,
                    A.FACTORY_CD,
                    A.LINE_CHARGE_PRICE,
                    A.END_DATETIME
                ORDER BY
                    A.ORDER_CD,
                    C.STYLE_NAME
            `;

            var tRet = [];
            if (args.data.SHIPDATE_FLAG === '1')
                tRet = await prisma.$queryRaw(Prisma.raw(sqlStr_shipdate));
            else tRet = await prisma.$queryRaw(Prisma.raw(sqlStr_duedate));

            var tRetData = {
                ORDER_CD: '',
                STYLE_NAME: '',
                TOT_CNT: 0,
                SHIP_CNT: 0,
                SHIP_DATE: '',
                USD_PRICE: 0,
                MATL_AMT: 0,
                FC_PRICE: 0,
                ETC_AMT: 0,
                COMMISSION: 0,
                FC_BEF: 0,
                ORDER_STATUS_NAME: '',
                ORDER_STATUS: '',
                REMARK: '',
                FACTORY_CD: '',
                LINE_CHARGE_PRICE: 0,
                END_DATETIME: '',
                ETC99: '',
            };

            const orderCds = tRet.map((r) => r.ORDER_CD);

            const shipRows = await prisma.$queryRaw`
                SELECT
                    order_cd,
                    MAX(ship_date) AS max_ship_date
                FROM
                    ksv_order_ship
                WHERE
                    order_cd IN (${Prisma.join(orderCds)})
                GROUP BY
                    order_cd
            `;

            const costRows = await prisma.$queryRaw`
                SELECT
                    a.order_cd,
                    COALESCE(SUM(a.use_qty * m.matl_price * c.usd_rate), 0) AS cost1
                FROM
                    ksv_po_mrpnet a
                    JOIN ksv_order_mst b ON b.order_cd = a.order_cd
                    JOIN kcd_matl_mem m ON m.matl_cd = a.matl_cd
                    AND m.matl_seq = a.matl_seq
                    JOIN kcd_curr_com c ON c.curr_cd = m.curr_cd
                    AND c.start_date = (
                        SELECT
                            MAX(start_date)
                        FROM
                            kcd_curr_com
                        WHERE
                            curr_cd = m.curr_cd
                            AND start_date <= b.order_date
                    )
                WHERE
                    a.order_cd IN (${Prisma.join(orderCds)})
                GROUP BY
                    a.order_cd
            `;

            const shipMap = Object.fromEntries(
                shipRows.map((row) => [row.order_cd, row.max_ship_date]),
            );
            const costMap = Object.fromEntries(
                costRows.map((row) => [row.order_cd, row.cost1]),
            );

            const tRetArray = tRet.map((obj) => ({
                ...obj,
                MAX_SHIP_DATE: shipMap[obj.ORDER_CD] ?? '',
                DW_BEF_COST: costMap[obj.ORDER_CD] ?? 0,
            }));

            return tRetArray;
        },
    },
};

export default moduleQuery_S0214_2;
