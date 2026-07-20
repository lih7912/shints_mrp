// S030516_1.queries.ts
// cpp: Shints310w.cpp ListQuery 로직 이식 (KSV_PO_MRP, DATE_KIND: 0=PO_DATE, 1=ETD)

import { Prisma } from '@prisma/client';
import prisma from '../../db';

const moduleQuery_S030516_1 = {
    Query: {
        mgrQueryS030516_CODE: async (_: any, args: any) => {
            const tWObj: any = {};

            // MATL_TYPE (VENDOR_MATL_TYPE)
            const sqlMatlType = `SELECT CD_NAME, CD_CODE FROM KCD_CODE WHERE CD_GROUP = 'VENDOR_MATL_TYPE' ORDER BY CD_CODE`;
            let retMatlType: any[] = await prisma.$queryRaw(Prisma.raw(sqlMatlType));
            retMatlType.unshift({ CD_CODE: ' ', CD_NAME: ' ' });
            tWObj.MATL_TYPE = retMatlType;

            // VENDOR_TYPE
            const sqlVendorType = `SELECT CD_NAME, CD_CODE FROM KCD_CODE WHERE CD_GROUP = 'VENDOR_TYPE' ORDER BY CD_CODE`;
            let retVendorType: any[] = await prisma.$queryRaw(Prisma.raw(sqlVendorType));
            retVendorType.unshift({ CD_CODE: ' ', CD_NAME: ' ' });
            tWObj.VENDOR_TYPE = retVendorType;

            // BUYER_CD
            const sqlBuyer = `SELECT BUYER_NAME, BUYER_CD FROM KCD_BUYER ORDER BY BUYER_CD`;
            let retBuyer: any[] = await prisma.$queryRaw(Prisma.raw(sqlBuyer));
            retBuyer.unshift({ BUYER_CD: ' ', BUYER_NAME: ' ' });
            tWObj.BUYER_CD = retBuyer;

            // PO_CD
            const buyerCd = ((args.data.BUYER_CD) || '').trim();
            const sqlPo = `SELECT DISTINCT a.PO_CD FROM KSV_PO_MST a, KSV_PO_MEM b WHERE a.PO_CD = b.PO_CD AND LEFT(b.ORDER_CD, 2) LIKE '${buyerCd}%' ORDER BY a.PO_CD`;
            let retPo: any[] = await prisma.$queryRaw(Prisma.raw(sqlPo));
            retPo.unshift({ PO_CD: ' ' });
            tWObj.PO_CD = retPo;

            // VENDOR_CD
            const sqlVendor = `SELECT VENDOR_NAME, VENDOR_CD FROM KCD_VENDOR WHERE STATUS_CD = '0' ORDER BY VENDOR_NAME`;
            let retVendor: any[] = await prisma.$queryRaw(Prisma.raw(sqlVendor));
            retVendor.unshift({ VENDOR_CD: ' ', VENDOR_NAME: ' ' });
            tWObj.VENDOR_CD = retVendor;

            return tWObj;
        },

        mgrQueryS030516_PO_BY_BUYER: async (_: any, args: any) => {
            const buyerCd = ((args.data.BUYER_CD) || '').trim();
            const sqlStr = `SELECT DISTINCT a.PO_CD FROM KSV_PO_MST a, KSV_PO_MEM b WHERE a.PO_CD = b.PO_CD AND LEFT(b.ORDER_CD, 2) LIKE '${buyerCd}%' ORDER BY a.PO_CD`;
            let ret: any[] = await prisma.$queryRaw(Prisma.raw(sqlStr));
            ret.unshift({ PO_CD: ' ' });
            return ret;
        },

        mgrQueryS030516_VENDOR_BY_PO: async (_: any, args: any) => {
            const poCd = ((args.data.PO_CD) || '').trim();
            let sqlStr = '';
            if (poCd !== '' && poCd !== ' ') {
                sqlStr = `SELECT DISTINCT c.VENDOR_NAME, b.VENDOR_CD FROM KSV_PO_MRP a INNER JOIN KCD_MATL_MST b ON a.MATL_CD = b.MATL_CD INNER JOIN KCD_VENDOR c ON b.VENDOR_CD = c.VENDOR_CD WHERE a.PO_CD = '${poCd}' ORDER BY c.VENDOR_NAME`;
            } else {
                sqlStr = `SELECT VENDOR_NAME, VENDOR_CD FROM KCD_VENDOR WHERE STATUS_CD = '0' ORDER BY VENDOR_NAME`;
            }
            let ret: any[] = await prisma.$queryRaw(Prisma.raw(sqlStr));
            ret.unshift({ VENDOR_CD: ' ', VENDOR_NAME: ' ' });
            return ret;
        },

        mgrQueryS030516_LIST_1: async (_: any, args: any) => {
            const d = args.data;
            const normalize = (value: any) => String(value ?? '').trim();
            const escapeSql = (value: string) => value.replace(/'/g, "''");

            const dateKind = normalize(d.DATE_KIND) || '1';
            const dateField = dateKind === '0' ? 'F.PO_DATE' : 'F.plan_etd';
            const vendorCd = normalize(d.VENDOR_CD);
            const poCd = normalize(d.PO_CD);
            const buyerCd = normalize(d.BUYER_CD);
            const matlCd = normalize(d.MATL_CD);
            const matlType = normalize(d.MATL_TYPE);
            const vendorType = normalize(d.VENDOR_TYPE);
            const matlName = escapeSql(normalize(d.MATL_NAME));
            const color = escapeSql(normalize(d.COLOR));
            const spec = escapeSql(normalize(d.SPEC));

            const sqlStr = `
                SELECT
                    A.PO_CD,
                    A.ORDER_CD,
                    C.STYLE_NAME,
                    E.VENDOR_NAME,
                    D.MATL_NAME,
                    D.COLOR,
                    D.SPEC,
                    D.UNIT,
                    A.MATL_CD,
                    G.CURR_CD,
                    G.MATL_PRICE,
                    A.TOT_AMT,
                    SUM(A.USE_QTY) AS EXP_USEQTY,
                    SUM(A.PO_QTY) AS EXP_POQTY,
                    ${dateField} AS ORDER_DATE,
                    F.MATL_DUE_DATE,
                    SUM(A.USE_QTY) - SUM(A.PO_QTY) AS EXP_DIFF
                FROM
                    KSV_PO_MRP AS A INNER JOIN
                    KSV_ORDER_MST AS B ON A.ORDER_CD = B.ORDER_CD INNER JOIN
                    KCD_STYLE AS C ON B.STYLE_CD = C.STYLE_CD INNER JOIN
                    KCD_MATL_MST AS D ON A.MATL_CD = D.MATL_CD INNER JOIN
                    KCD_VENDOR AS E ON D.VENDOR_CD = E.VENDOR_CD INNER JOIN
                    KSV_PO_MST AS F ON A.PO_CD = F.PO_CD AND A.PO_SEQ = F.PO_SEQ INNER JOIN
                    kcd_matl_mem AS G ON A.MATL_CD = G.MATL_CD AND A.MATL_SEQ = G.MATL_SEQ
                WHERE
                    (E.VENDOR_CD LIKE '%${vendorCd}%')
                    AND (A.PO_CD LIKE '%${poCd}%')
                    AND (${dateField} >= '${normalize(d.S_DATE)}')
                    AND (${dateField} <= '${normalize(d.E_DATE)}')
                    AND (A.MATL_CD LIKE '%${matlCd}%')
                    AND (D.MATL_CD LIKE '%${matlCd}%')
                    AND (D.MATL_NAME LIKE '%${matlName}%')
                    AND (D.SPEC LIKE '%${spec}%')
                    AND (D.COLOR LIKE '%${color}%')
                    AND ISNULL(E.VENDOR_MATL_TYPE, '') LIKE '${matlType}%'
                    AND (E.VENDOR_TYPE LIKE '%${vendorType}%')
                    AND LEFT(A.ORDER_CD, 2) LIKE '${buyerCd}%'
                GROUP BY
                    A.PO_CD, A.ORDER_CD, C.STYLE_NAME, E.VENDOR_NAME, D.MATL_NAME, A.MATL_CD,
                    G.MATL_PRICE, D.COLOR, D.SPEC, A.TOT_AMT, G.CURR_CD, D.UNIT, ${dateField}, F.MATL_DUE_DATE
                ORDER BY 1
            `;

            const tRet: any[] = await prisma.$queryRaw(Prisma.raw(sqlStr));
            return tRet;
        },

        mgrQueryS030516_LIST_1_COUNT: async (_: any, args: any) => {
            const d = args.data;
            const normalize = (value: any) => String(value ?? '').trim();
            const escapeSql = (value: string) => value.replace(/'/g, "''");

            const dateKind = normalize(d.DATE_KIND) || '1';
            const dateField = dateKind === '0' ? 'F.PO_DATE' : 'F.plan_etd';
            const vendorCd = normalize(d.VENDOR_CD);
            const poCd = normalize(d.PO_CD);
            const buyerCd = normalize(d.BUYER_CD);
            const matlCd = normalize(d.MATL_CD);
            const matlType = normalize(d.MATL_TYPE);
            const vendorType = normalize(d.VENDOR_TYPE);
            const matlName = escapeSql(normalize(d.MATL_NAME));
            const color = escapeSql(normalize(d.COLOR));
            const spec = escapeSql(normalize(d.SPEC));

            const sqlStr = `
                SELECT COUNT(1) AS ROW_CNT
                FROM (
                    SELECT 1 AS CNT_KEY
                    FROM
                        KSV_PO_MRP AS A INNER JOIN
                        KSV_ORDER_MST AS B ON A.ORDER_CD = B.ORDER_CD INNER JOIN
                        KCD_STYLE AS C ON B.STYLE_CD = C.STYLE_CD INNER JOIN
                        KCD_MATL_MST AS D ON A.MATL_CD = D.MATL_CD INNER JOIN
                        KCD_VENDOR AS E ON D.VENDOR_CD = E.VENDOR_CD INNER JOIN
                        KSV_PO_MST AS F ON A.PO_CD = F.PO_CD AND A.PO_SEQ = F.PO_SEQ INNER JOIN
                        kcd_matl_mem AS G ON A.MATL_CD = G.MATL_CD AND A.MATL_SEQ = G.MATL_SEQ
                    WHERE
                        (E.VENDOR_CD LIKE '%${vendorCd}%')
                        AND (A.PO_CD LIKE '%${poCd}%')
                        AND (${dateField} >= '${normalize(d.S_DATE)}')
                        AND (${dateField} <= '${normalize(d.E_DATE)}')
                        AND (A.MATL_CD LIKE '%${matlCd}%')
                        AND (D.MATL_CD LIKE '%${matlCd}%')
                        AND (D.MATL_NAME LIKE '%${matlName}%')
                        AND (D.SPEC LIKE '%${spec}%')
                        AND (D.COLOR LIKE '%${color}%')
                        AND ISNULL(E.VENDOR_MATL_TYPE, '') LIKE '${matlType}%'
                        AND (E.VENDOR_TYPE LIKE '%${vendorType}%')
                        AND LEFT(A.ORDER_CD, 2) LIKE '${buyerCd}%'
                    GROUP BY
                        A.PO_CD, A.ORDER_CD, C.STYLE_NAME, E.VENDOR_NAME, D.MATL_NAME, A.MATL_CD,
                        G.MATL_PRICE, D.COLOR, D.SPEC, A.TOT_AMT, G.CURR_CD, D.UNIT, ${dateField}, F.MATL_DUE_DATE
                ) AS X
            `;

            const tRet: any[] = await prisma.$queryRaw(Prisma.raw(sqlStr));
            return {
                ROW_CNT: Number(tRet?.[0]?.ROW_CNT ?? 0),
            };
        },
    },
};

export default moduleQuery_S030516_1;
