import { Prisma } from '@prisma/client';
import prisma from '../../db';

const moduleQuery_S0440_2_1 = {
    Query: {
        mgrQueryS0440_2_1: async (_, args) => {
            let sDate = args.data.S_READY_DATE || '20240101';
            let eDate = args.data.E_READY_DATE || '99999999';
            const readyDateSql = ` and A2.READY_DATE between '${sDate}' and '${eDate}' `;

            const tOriginPort = args.data.ORIGIN_PORT || '';

            const sqlStr1 = `
                SELECT
                    top 100 isnull(A2.REG_USER, '') as REG_USER,
                    isnull(A2.BUYER, '') as BUYER_CD,
                    isnull(A3.BUYER_NAME, '') as BUYER_NAME,
                    isnull(A2.PO_CD, '') as PO_CD2,
                    '' as VENDOR_CD,
                    '' as VENDOR_NAME,
                    A2.TRADE_TERM,
                    A2.ORIGIN_PORT,
                    '' as EXP_DELIVERY_DATE,
                    A2.TARGET_ETA,
                    A2.CT_QTY,
                    A2.WEIGHT,
                    A2.CBM,
                    '' as PU_CD,
                    A2.STSOUT_CD,
                    A2.INVOICE_NO,
                    A2.READY_DATE,
                    A2.DESTINATION,
                    A2.REMARK,
                    A2.SHIP_MODE,
                    A4.CD_NAME as SHIP_MODE_N,
                    A2.DESCRIPTION,
                    A2.SENDOR as SENDER,
                    A2.RECEIVER,
                    A2.BL_NO,
                    A2.AMOUNT,
                    A2.PAYMENT,
                    A2.SHIPMENT_CD,
                    A5.ETD as TARGET_ETD,
                    A2.ORG_ORIGIN_PORT,
                    A2.ORG_DESTINATION
                FROM
                    KSV_SHIPMENT_MEM A2
                    left join kcd_buyer A3 on A2.BUYER = A3.BUYER_CD
                    left join kcd_code A4 on A4.cd_code = A2.ship_mode
                    and A4.cd_group = 'SHIPMENT_SHIP_MODE'
                    left join KSV_SHIPMENT_MST A5 on A2.SHIPMENT_CD = A5.SHIPMENT_CD
                WHERE
                    A2.stsout_cd like 'SOTMP-%'
                    and A2.ORIGIN_PORT like '%${tOriginPort}%'
                    and (
                        A2.shipment_cd is null
                        or A2.shipment_cd = ''
                    ) ${readyDateSql}
                order by
                    A2.READY_DATE desc,
                    A2.origin_port
            `;
            const tRet1: any[] = await prisma.$queryRaw(Prisma.raw(sqlStr1));
            if (!tRet1 || tRet1.length === 0) {
                return [];
            }

            /*
            const stsoutList = [
                ...new Set(
                    tRet1
                        .map(row => row.STSOUT_CD)
                        .filter((v: string | null | undefined) => !!v)
                )
            ];
            if (stsoutList.length === 0) {
                return tRet1.map(row => ({
                    ...row,
                    MATL_INFO: []
                }));
            }
            const inClause = stsoutList
                .map(cd => `'${String(cd).replace(/'/g, "''")}'`)
                .join(",");
            */

            var setStsout = new Set();
            tRet1.forEach((col, i) => {
                setStsout.add(col.STSOUT_CD);
            });

            var sqlStsout = '';
            setStsout.forEach((col, i) => {
                if (sqlStsout === '') sqlStsout = `'${col}'`;
                else sqlStsout += `,'${col}'`;
            });

            const sqlStr2_bak = `
                select
                    A.stsout_cd as STSOUT_CD,
                    A.MATL_CD,
                    B.MATL_NAME,
                    B.COLOR,
                    B.SPEC,
                    C.MATL_PRICE,
                    C.CURR_CD,
                    B.UNIT,
                    A.OUT_QTY as PO_QTY,
                    D.VENDOR_NAME
                from
                    ksv_stock_out A,
                    kcd_matL_mst B,
                    kcd_matl_mem C,
                    kcd_vendor D
                where
                    A.stsout_cd in (${sqlStsout})
                    and A.matl_cd = B.matl_cd
                    and B.matl_cd = C.matl_cd
                    and C.matl_seq = (
                        select
                            max(matl_seq)
                        from
                            kcd_matl_mem
                        where
                            matl_cd = A.matl_cd
                    )
                    and B.vendor_cd = D.vendor_cd
            `;

            const sqlStr2 = `
                select
                    A.stsout_cd as STSOUT_CD,
                    A.MATL_CD,
                    B.MATL_NAME,
                    B.COLOR,
                    B.SPEC,
                    C.MATL_PRICE,
                    C.CURR_CD,
                    B.UNIT,
                    A.QTY as PO_QTY,
                    D.VENDOR_NAME,
                    A.PO_CD
                from
                    kzz_freight A,
                    kcd_matL_mst B,
                    kcd_matl_mem C,
                    kcd_vendor D
                where
                    A.stsout_cd in (${sqlStsout})
                    and A.matl_cd = B.matl_cd
                    and B.matl_cd = C.matl_cd
                    and C.matl_seq = (
                        select
                            max(matl_seq)
                        from
                            kcd_matl_mem
                        where
                            matl_cd = A.matl_cd
                    )
                    and B.vendor_cd = D.vendor_cd
            `;

            const tRet2: any[] = await prisma.$queryRaw(Prisma.raw(sqlStr2));

            /*
            const matlMap = new Map<string, any[]>();
            for (const row of tRet2) {
                const key = row.STSOUT_CD as string;
                if (!matlMap.has(key)) {
                    matlMap.set(key, []);
                }
                matlMap.get(key)!.push(row);
            }
            const tRetArray0 = tRet1.map(row => ({
                ...row,
                MATL_INFO: matlMap.get(row.STSOUT_CD) || []
            }));
            */

            var tRetArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet1.length; tIdx++) {
                var col = { ...tRet1[tIdx] };
                col.MATL_INFO = [];
                var tFindObjs = [];
                tRet2.forEach((col1, i1) => {
                    if (col1.STSOUT_CD === col.STSOUT_CD)
                        tFindObjs.push({ ...col1 });
                });
                if (tFindObjs.length > 0) {
                    col.PO_CD2 = tFindObjs[0].PO_CD;
                    col.VENDOR_NAME = tFindObjs[0].VENDOR_NAME;
                    col.MATL_INFO = [...tFindObjs];
                }
                tRetArray.push(col);
            }

            return tRetArray;
        },
    },
};

export default moduleQuery_S0440_2_1;
