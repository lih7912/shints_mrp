import { Prisma } from '@prisma/client';
import prisma from '../../db'; // 기존 경로 유지
import AFLib from '../../commlib'; // 필요 없으면 제거

const moduleQuery_S0914_FAC_IN_OUT_MANAGER = {
    Query: {
        //--------------------------------------------------
        // 1. 코드 조회 (BUYER 콤보박스)
        //--------------------------------------------------
        mgrQuery_S0914_getBuyerCd: async (
            _: any,
            __: any,
            contextValue: any,
        ) => {
            try {
                const sqlBuyer = `
                    SELECT
                        ROW_NUMBER() OVER (
                            ORDER BY
                                BUYER_CD
                        ) AS id,
                        BUYER_CD,
                        '(' + BUYER_CD + ')' + BUYER_NAME AS BUYER_NAME
                    FROM
                        KCD_BUYER
                `;

                const buyer = await prisma.$queryRaw(Prisma.sql([sqlBuyer]));

                return {
                    BUYER: buyer,
                };
            } catch (err) {
                throw err;
            }
        },

        mgrQuery_S0914_getPoCd: async (
            _: any,
            args: any,
            contextValue: any,
        ) => {
            const qry = args.data || {};
            const buyerCd = qry.BUYER_CD || '';

            try {
                const sql = `
                    SELECT
                        ROW_NUMBER() OVER (
                            ORDER BY
                                PO_CD DESC
                        ) AS id,
                        PO_CD
                    FROM
                        (
                            SELECT DISTINCT
                                PO_CD
                            FROM
                                KSV_PO_MEM
                            WHERE
                                1 = 1
                                AND LEFT(ORDER_CD, 2) = '${buyerCd}'
                        ) A
                `;

                const ret = await prisma.$queryRaw(Prisma.sql([sql]));

                return {
                    PO_CD: ret,
                };
            } catch (err) {
                throw err;
            }
        },

        mgrQuery_S0914_getOrderCd: async (
            _: any,
            args: any,
            contextValue: any,
        ) => {
            const qry = args.data || {};
            const poCd = qry.PO_CD || '';

            try {
                const sql = `
                    SELECT
                        ROW_NUMBER() OVER (
                            ORDER BY
                                ORDER_CD DESC
                        ) AS id,
                        ORDER_CD
                    FROM
                        (
                            SELECT DISTINCT
                                ORDER_CD
                            FROM
                                KSV_PO_MEM
                            WHERE
                                1 = 1
                                AND PO_CD = '${poCd}'
                        ) A
                `;

                const ret = await prisma.$queryRaw(Prisma.sql([sql]));

                return {
                    ORDER_CD: ret,
                };
            } catch (err) {
                throw err;
            }
        },

        //--------------------------------------------------
        // 2. 상단 메인 그리드
        //--------------------------------------------------
        mgrQuery_S0914_TopList: async (
            _: any,
            args: any,
            contextValue: any,
        ) => {
            const qry = args.data || {};
            const PO_CD = qry.PO_CD || '';
            const ORDER_CD = qry.ORDER_CD || '';
            const VENDOR_NAME = qry.VENDOR_NAME || '';
            const SUPPLIER = qry.SUPPLIER || '';
            const DESCRIPTION = qry.DESCRIPTION || '';
            const UNIT = qry.UNIT || '';
            const MATL_CD = qry.MATL_CD || '';
            const COLOR = qry.COLOR || '';
            const SPEC = qry.SPEC || '';

            if (!PO_CD) {
                return [];
            }

            try {
                const sqlStr = `
                    select
                        row_number() over (order by b.vendor_name, len(a.pr_num), a.pr_num) as id,
                        a.po_cd as PO_CD,
                        b.vendor_name as VENDOR_NAME,
                        a.matl_cd as MATL_CD,
                        c.matl_name as MATL_NAME,
                        c.color as COLOR,
                        c.spec as SPEC,
                        c.unit as UNIT,
                        isnull(a.ord_cnt, '') as ORD_CNT,
                        isnull(a.tot_cnt, 0) as MRPQTY,
                        isnull((select sum(tot_qty) from ksv_stock_in where po_cd = a.po_cd and matl_cd = a.matl_cd), 0) as STSIN,
                        isnull((select sum(out_qty) from ksv_stock_out where po_cd = a.po_cd and matl_cd = a.matl_cd and left(out_from,5) <> 'stock'), 0) as STSOUT,
                        (
                            isnull((
                                select
                                    sum(m.po_qty)
                                from
                                    ksv_po_mrp m
                                where
                                    m.po_cd = a.po_cd
                                    and m.po_matl_cd = a.matl_cd
                                    and m.use_po_type = '2'
                            ), 0)
                            - isnull((
                                select
                                    sum(m.po_qty)
                                from
                                    ksv_po_mrp m
                                    inner join ksv_stock_matl s on m.stock_idx = s.stock_idx
                                    and m.matl_cd = s.matl_cd
                                where
                                    m.po_cd = a.po_cd
                                    and m.po_matl_cd = a.matl_cd
                                    and m.matl_cd = a.matl_cd
                                    and m.use_po_type = '2'
                                    and s.po_cd = a.po_cd
                            ), 0)
                        ) as STOCK,
                        isnull((select sum(in_qty) from ksv_stock_facin where po_cd = a.po_cd and matl_cd = a.matl_cd), 0) as FACIN_BASE,
                        isnull((select sum(case when etc_type='Shortage' then etc_qty else 0 end) from ksv_stock_facetc where po_cd = a.po_cd and matl_cd = a.matl_cd), 0) as SHORTOVER,
                        isnull((select sum(case when etc_type='Error' then etc_qty else 0 end) from ksv_stock_facetc where po_cd = a.po_cd and matl_cd = a.matl_cd), 0) as DEFECT,
                        isnull((select sum(case when etc_type='Other' then etc_qty else 0 end) from ksv_stock_facetc where po_cd = a.po_cd and matl_cd = a.matl_cd), 0) as OTHER0,
                        isnull((select sum(out_qty) from ksv_stock_facout where po_cd = a.po_cd and matl_cd = a.matl_cd and (remark like '%sasmple%' or remark like '%m_up%' or remark like '%test%')), 0) as OTHER,
                        isnull((select sum(out_qty) from ksv_stock_facout where po_cd = a.po_cd and matl_cd = a.matl_cd and remark like 'defect%'), 0) as DEFECT_A,
                        isnull((select sum(out_qty) from ksv_stock_facout where po_cd = a.po_cd and matl_cd = a.matl_cd and remark like '%main%'), 0) as MAINUSE,
                        isnull((select sum(out_qty) from ksv_stock_facout where po_cd = a.po_cd and matl_cd = a.matl_cd and remark like '%table_shortage%'), 0) as TABLE_SHORT,
                        isnull((select sum(out_qty) from ksv_stock_facout where po_cd = a.po_cd and matl_cd = a.matl_cd and remark like '%keep_stock%'), 0) as KEEP_STOCK,
                        isnull((select sum(out_qty) from ksv_stock_facout where po_cd = a.po_cd and matl_cd = a.matl_cd and remark like '%move_stock%'), 0) as MOVE_STOCK,
                        isnull((select sum(out_qty) from ksv_stock_facout where po_cd = a.po_cd and matl_cd = a.matl_cd and remark like '%lost%'), 0) as LOST,
                        isnull((select sum(stock_qty) from ksv_stock_matl where po_cd = a.po_cd and matl_cd = a.matl_cd and reason_make='RETURN'), 0) as LINE_RETURN,
                        isnull((select sum(out_qty) from ksv_stock_facout where po_cd = a.po_cd and matl_cd = a.matl_cd), 0) as FACOUT,
                        isnull((
                            select
                                sum(isnull(su.use_qty, 0))
                            from
                                ksv_stock_matl sm
                                inner join ksv_stock_use su on su.stock_idx = sm.stock_idx
                            where
                                sm.po_cd = a.po_cd
                                and sm.matl_cd = a.matl_cd
                                and sm.stock_status in ('W', 'N')
                                and su.use_po_cd <> a.po_cd
                        ), 0) as MOQ_BASE,
                        isnull((select sum(po_qty) from ksv_stock_mem where po_cd = a.po_cd and matl_cd = a.matl_cd and po_seq in (98, 99)), 0) as OVERIN,
                        isnull(d.matl_price, 0) as PRICE,
                        isnull(a.remark, '') as DELAYREMARK,
                        isnull(a.remark_bvt, '') as REMARK_BVT
                    from ksv_po_matllist a
                    inner join kcd_vendor b on b.vendor_cd = a.vendor_cd
                    inner join kcd_matl_mst c on c.matl_cd = a.matl_cd
                    left join kcd_matl_mem d on d.matl_cd = a.matl_cd
                        and d.matl_seq = (select max(matl_seq) from kcd_matl_mem where matl_cd = a.matl_cd)
                    where 1=1
                      and a.po_cd = '${PO_CD}'
                      and a.matl_cd like '%${MATL_CD}%'
                      and c.matl_name like '%${DESCRIPTION}%'
                      and c.color like '%${COLOR}%'
                      and c.spec like '%${SPEC}%'
                      and c.unit like '%${UNIT}%'
                      and b.vendor_name like '%${SUPPLIER}%'
                    order by b.vendor_name, len(a.pr_num), a.pr_num
                `;

                const ret = (await prisma.$queryRaw(Prisma.sql([sqlStr]))) as any[];

                const tRetArray = (ret || []).map((col: any, i: number) => {
                    const tObj: any = { ...col };
                    tObj.id = i + 1;

                    tObj.PO_CD = tObj.PO_CD ?? tObj.po_cd ?? '';
                    tObj.VENDOR_NAME = tObj.VENDOR_NAME ?? tObj.vendor_name ?? '';
                    tObj.MATL_CD = tObj.MATL_CD ?? tObj.matl_cd ?? '';
                    tObj.MATL_NAME = tObj.MATL_NAME ?? tObj.matl_name ?? '';
                    tObj.COLOR = tObj.COLOR ?? tObj.color ?? '';
                    tObj.SPEC = tObj.SPEC ?? tObj.spec ?? '';
                    tObj.UNIT = tObj.UNIT ?? tObj.unit ?? '';

                    tObj.MRPQTY = Number(tObj.MRPQTY || 0);
                    tObj.STSIN = Number(tObj.STSIN || 0);
                    tObj.STSOUT = Number(tObj.STSOUT || 0);
                    tObj.STOCK = Number(tObj.STOCK || 0);
                    tObj.FACIN_BASE = Number(tObj.FACIN_BASE || tObj.FACIN || 0);
                    tObj.FACIN = Number(tObj.FACIN || 0);
                    tObj.SHORTOVER = Number(tObj.SHORTOVER || 0);
                    tObj.DEFECT = Number(tObj.DEFECT || 0);
                    tObj.ERROR = Number(tObj.DEFECT || 0);
                    tObj.DEFECT_A = Number(tObj.DEFECT_A || 0);
                    tObj.MAINUSE = Number(tObj.MAINUSE || 0);
                    tObj.OTHER = Number(tObj.OTHER || 0);
                    tObj.TABLE_SHORT = Number(tObj.TABLE_SHORT || 0);
                    tObj.KEEP_STOCK = Number(tObj.KEEP_STOCK || 0);
                    tObj.MOVE_STOCK = Number(tObj.MOVE_STOCK || 0);
                    tObj.LOST = Number(tObj.LOST || 0);
                    tObj.LINE_RETURN = Number(tObj.LINE_RETURN || 0);
                    tObj.FACOUT = Number(((tObj.SHORTOVER +
                            tObj.DEFECT_A +
                            tObj.MAINUSE +
                            tObj.OTHER +
                            tObj.TABLE_SHORT +
                            tObj.KEEP_STOCK +
                            tObj.LOST)) - tObj.LINE_RETURN || 0);
                    tObj.MOQ_BASE = Number(tObj.MOQ_BASE || tObj.MOQ || 0);
                    tObj.MOQ = Number(tObj.MOQ_BASE || 0);
                    tObj.OVERIN = Number(tObj.OVERIN || 0);
                    tObj.PRICE = Number(tObj.PRICE || 0);
                    tObj.DELAYREMARK = tObj.DELAYREMARK || '';
                    tObj.REMARK_BVT = tObj.REMARK_BVT || tObj.remark_bvt || tObj.DELAYREMARK || '';

                    tObj.STOCK = Number(tObj.STOCK || 0);
                    tObj.FACIN = Number(tObj.FACIN_BASE || 0) + Number(tObj.STOCK || 0);
                    tObj.DEFECT = Number(tObj.DEFECT || 0);
                    tObj.MAINUSE = Number(tObj.MAINUSE || 0);
                    

                    if (!Number.isFinite(tObj.FACIN)) {
                        tObj.FACIN = Number(tObj.FACIN_BASE || 0) + Number(tObj.STOCK || 0);
                    }
                    if (!Number.isFinite(tObj.DEFECT) || tObj.DEFECT === 0) {
                        tObj.DEFECT = Number(tObj.ERROR || 0);
                    }
                    if (!Number.isFinite(tObj.MAINUSE) || tObj.MAINUSE === 0) {
                        tObj.MAINUSE = Number(tObj.FACOUT || 0);
                    }

                    tObj.SHIPQTY = tObj.STSOUT + tObj.ERROR;
                    if (!Number.isFinite(tObj.FACIN)) {
                        tObj.FACIN = Number(tObj.FACIN_BASE || 0) + Number(tObj.STOCK || 0);
                    }
                    tObj.REMAIN_A =
                        tObj.FACIN -
                        (tObj.SHORTOVER +
                            tObj.DEFECT_A +
                            tObj.MAINUSE +
                            tObj.OTHER +
                            tObj.TABLE_SHORT +
                            tObj.KEEP_STOCK +
                            tObj.LOST);
                    tObj.REMAIN_E =
                        tObj.FACIN -
                        tObj.SHORTOVER -
                        tObj.DEFECT -
                        tObj.MRPQTY -
                        tObj.OTHER -
                        tObj.KEEP_STOCK -
                        tObj.LOST;

                    tObj.MRP1 = 0;
                    tObj.USE1 = 0;
                    tObj.MRP2 = 0;
                    tObj.USE2 = 0;
                    tObj.MRP3 = 0;
                    tObj.USE3 = 0;
                    tObj.DATAS = [];

                    return tObj;
                });

                var sqlPo = `
                    select
                        a.order_cd
                    from
                        kvw_po_order a,
                        ksv_order_mst b
                    where
                        a.po_cd = '${PO_CD}'
                        and a.order_cd = b.order_cd
                        ${ORDER_CD ? `and a.order_cd = '${ORDER_CD}'` : ''}
                    order by
                        a.order_cd
                `;
                var retPo = await prisma.$queryRaw(Prisma.raw(sqlPo));

                var sqlOrder = `
                    select
                        matl_cd,
                        order_cd,
                        isnull(sum(use_qty), 0) as po_qty
                    from
                        ksv_po_mrp
                    where
                        po_cd = '${PO_CD}'
                        and use_po_type = '1'
                        ${ORDER_CD ? `and order_cd = '${ORDER_CD}'` : ''}
                        -- and use_qty > 0
                        -- and diff_po_type in ('0', '3')
                    group by
                        matl_cd,
                        order_cd
                    order by
                        matl_cd
                `;
                var retOrder = await prisma.$queryRaw(Prisma.raw(sqlOrder));

                var sqlMainUseByOrder = `
                    select
                        matl_cd,
                        order_cd,
                        isnull(sum(out_qty), 0) as main_use
                    from
                        ksv_stock_facout
                    where
                        po_cd = '${PO_CD}'
                        and remark like '%main%'
                        ${ORDER_CD ? `and order_cd = '${ORDER_CD}'` : ''}
                    group by
                        matl_cd,
                        order_cd
                `;
                var retMainUseByOrder = await prisma.$queryRaw(
                    Prisma.raw(sqlMainUseByOrder),
                );

                var tRetArray1 = [];
                var tIdx1 = 0;
                for (tIdx1 = 0; tIdx1 < tRetArray.length; tIdx1++) {
                    var tOne = { ...tRetArray[tIdx1] };
                    tOne.DATAS = [];

                    var tDatas = [];
                    retPo.forEach((col, i) => {
                        var tObj: any = {};
                        var tCheck = 0;
                        var tMainUse = '0';

                        retMainUseByOrder.forEach((col2, i2) => {
                            if (
                                (col2 as any).matl_cd === tOne.MATL_CD &&
                                (col2 as any).order_cd === (col as any).order_cd
                            ) {
                                tMainUse = parseFloat(
                                    (col2 as any).main_use,
                                ).toFixed(2);
                            }
                        });

                        // ORDER_CD 지정 시에는 ORD_CNT 보정값 대신 실제 오더 매핑 데이터만 사용
                        if (!ORDER_CD) {
                            // Old C++ OnBnQuery 기준: ORD_CNT(8자리*오더수)에서 오더별 MRP 수량을 추출
                            const ordCnt = (tOne.ORD_CNT || '').toString();
                            const chunk = ordCnt.substring(i * 8, i * 8 + 8);
                            if (
                                chunk &&
                                chunk !== '00000000' &&
                                chunk !== '________'
                            ) {
                                const qtyByOrdCnt = parseInt(chunk, 10);
                                if (Number.isFinite(qtyByOrdCnt) && qtyByOrdCnt > 0) {
                                    tObj.ORDER_CD = (col as any).order_cd;
                                    tObj.ORDER_QTY = qtyByOrdCnt.toFixed(2);
                                    tObj.MAIN_USE = tMainUse;
                                    tCheck = 1;
                                }
                            }
                        }

                        retOrder.forEach((col1, i1) => {
                            if (
                                tCheck === 0 &&
                                (col1 as any).matl_cd === tOne.MATL_CD &&
                                (col as any).order_cd === (col1 as any).order_cd
                            ) {
                                tObj.ORDER_CD = (col as any).order_cd;
                                tObj.ORDER_QTY = parseFloat(
                                    (col1 as any).po_qty,
                                ).toFixed(2);
                                tObj.MAIN_USE = tMainUse;
                                tCheck = 1;
                            }
                        });
                        if (tCheck === 1) {
                            tDatas.push(tObj);
                        } else {
                            tObj.ORDER_CD = (col as any).order_cd;
                            tObj.ORDER_QTY = '0';
                            tObj.MAIN_USE = tMainUse;
                            tDatas.push(tObj);
                        }
                    });
                    tOne.DATAS = [...tDatas];
                    if (ORDER_CD) {
                        const orderRow = tOne.DATAS.find(
                            (x: any) => x.ORDER_CD === ORDER_CD,
                        );
                        const orderQty = Number(orderRow?.ORDER_QTY || 0);
                        const mainUseQty = Number(orderRow?.MAIN_USE || 0);
                        if (!orderRow || (orderQty <= 0 && mainUseQty <= 0)) {
                            continue;
                        }
                    }
                    if (VENDOR_NAME && tOne.VENDOR_NAME.includes(VENDOR_NAME))
                        tRetArray1.push(tOne);
                    else if (!VENDOR_NAME) tRetArray1.push(tOne);
                }

                return tRetArray1;
            } catch (err) {
                console.log('mgrQuery_S0914_TopList error =>', err);
                throw err;
            }
        },

        //--------------------------------------------------
        // 3. 하단 좌측 그리드
        //--------------------------------------------------
        mgrQuery_S0914_BottomLeftList: async (
            _: any,
            args: any,
            contextValue: any,
        ) => {
            const qry = args.data || {};

            const poCd = qry.PO_CD || '';
            const matlCd = qry.MATL_CD || '';
            const unit = qry.UNIT || '';
            const shortOver = qry.SHORTOVER || '';

            try {
                const sqlStr = `
                    SELECT
                        ROW_NUMBER() OVER (ORDER BY T.STSOUT_DATE DESC, T.SRC ASC) AS id,
                        T.SHIPMENTCD,
                        T.PACKCD,
                        T.ATA,
                        T.DELIVERY,
                        T.BLNO,
                        T.CTNO,
                        T.UNIT,
                        T.SHIPQTY,
                        T.SHORTOVER,
                        T.DEFECT,
                        T.FACINQTY,
                        T.LOCATION,
                        T.MC,
                        T.STSOUT_DATE
                    FROM (
                        -- Part 1: FACIN 데이터
                        SELECT
                            1 AS SRC,
                            ISNULL(SM.SHIPMENT_CD, '') AS SHIPMENTCD,
                            ISNULL(SM.PACK_CD, '') AS PACKCD,
                            SM.ATA AS ATA,
                            ISNULL(F.DELIVERY, '') AS DELIVERY,
                            ISNULL(SM.BL_NO, '') AS BLNO,
                            ISNULL(SM.CONTAINER_NO, '') AS CTNO,
                            '${unit}' AS UNIT,
                            ISNULL(SQ.SHIPQTY, 0) AS SHIPQTY,
                            '${shortOver}' AS SHORTOVER,
                            ISNULL(SQ.DEFECT, 0) AS DEFECT,
                            CONVERT(VARCHAR(30), CAST(ISNULL(F.IN_QTY, 0) AS FLOAT)) AS FACINQTY,
                            ISNULL(F.LOCATION, '') AS LOCATION,
                            ISNULL(F.REG_USER, '') AS MC,
                            ISNULL(SM.STSOUT_DATE, '') AS STSOUT_DATE
                        FROM
                            KSV_STOCK_FACIN F
                            OUTER APPLY (
                                SELECT TOP 1
                                    B.STSOUT_CD,
                                    B.PACK_CD,
                                    B.OUT_DATETIME AS STSOUT_DATE,
                                    C.SHIPMENT_CD,
                                    D.ATA,
                                    D.BL_NO,
                                    D.CONTAINER_NO
                                FROM
                                    KSV_STOCK_OUT B
                                    inner join KSV_SHIPMENT_MEM C on C.STSOUT_CD = B.STSOUT_CD
                                    inner join KSV_SHIPMENT_MST D on D.SHIPMENT_CD = C.SHIPMENT_CD
                                WHERE
                                    B.PO_CD = F.PO_CD
                                    AND B.MATL_CD = F.MATL_CD
                                    AND D.ATA <= F.IN_DATE
                                ORDER BY
                                    CASE
                                        WHEN ISNULL(D.CLEARANCE_NO, '') = ISNULL(F.CLEARANCE_NO, '') THEN 0
                                        ELSE 1
                                    END,
                                    D.ATA DESC
                            ) SM
                            OUTER APPLY (
                                SELECT
                                    SUM(SO.OUT_QTY) AS SHIPQTY,
                                    SUM(SO.ERR_QTY) AS DEFECT
                                FROM
                                    KSV_STOCK_OUT SO
                                WHERE
                                    SO.STSOUT_CD = SM.STSOUT_CD
                                    AND SO.PO_CD = F.PO_CD
                                    AND SO.MATL_CD = F.MATL_CD
                            ) SQ
                        WHERE
                            1 = 1
                            AND F.PO_CD like '%${poCd}%'
                            AND F.MATL_CD like '%${matlCd}%'

                        UNION ALL

                        -- Part 2: STSOUT은 있으나 FACIN이 없는 데이터
                        SELECT
                            2 AS SRC,
                            ISNULL(C2.SHIPMENT_CD, '') AS SHIPMENTCD,
                            ISNULL(B2.PACK_CD, '') AS PACKCD,
                            D2.ATA AS ATA,
                            '' AS DELIVERY,
                            ISNULL(D2.BL_NO, '') AS BLNO,
                            ISNULL(D2.CONTAINER_NO, '') AS CTNO,
                            '${unit}' AS UNIT,
                            SUM(ISNULL(B2.OUT_QTY, 0)) AS SHIPQTY,
                            '${shortOver}' AS SHORTOVER,
                            SUM(ISNULL(B2.ERR_QTY, 0)) AS DEFECT,
                            '0' AS FACINQTY,
                            '' AS LOCATION,
                            '' AS MC,
                            ISNULL(CONVERT(VARCHAR(30), MIN(B2.OUT_DATETIME), 120), '') AS STSOUT_DATE
                        FROM
                            KSV_STOCK_OUT B2
                            INNER JOIN KSV_SHIPMENT_MEM C2 ON C2.STSOUT_CD = B2.STSOUT_CD
                            INNER JOIN KSV_SHIPMENT_MST D2 ON D2.SHIPMENT_CD = C2.SHIPMENT_CD
                        WHERE
                            B2.PO_CD LIKE '%${poCd}%'
                            AND B2.MATL_CD LIKE '%${matlCd}%'
                            AND NOT EXISTS (
                                SELECT 1
                                FROM KSV_STOCK_FACIN
                                WHERE PO_CD = B2.PO_CD
                                  AND MATL_CD = B2.MATL_CD
                            )
                        GROUP BY
                            C2.SHIPMENT_CD,
                            B2.PACK_CD,
                            D2.ATA,
                            D2.BL_NO,
                            D2.CONTAINER_NO,
                            B2.STSOUT_CD
                    ) T
                `;
                const ret = await prisma.$queryRaw(Prisma.sql([sqlStr]));
                return ret;
            } catch (err) {
                console.log('mgrQuery_S0914_BottomLeftList error =>', err);
                throw err;
            }
        },

        //--------------------------------------------------
        // 4. 하단 우측 그리드
        //--------------------------------------------------
        mgrQuery_S0914_BottomRightList: async (
            _: any,
            args: any,
            contextValue: any,
        ) => {
            const qry = args.data || {};
            const matlCd = qry.MATL_CD || '';
            const poCd = qry.PO_CD || '';
            const unit = qry.UNIT || '';

            try {
                const sqlStr = `
                    SELECT
                        ROW_NUMBER() OVER (
                            ORDER BY
                                OUT_DATE
                        ) AS id,
                        OUT_DATE AS OUTDATE,
                        '${unit}' AS UNIT,
                        OUT_QTY AS OUTQTY,
                        LEFT(isnull(remark,''), CHARINDEX('-', isnull(remark,'') + '-') - 1) AS PURPOSE,
                        REMARK AS REMARK,
                        ORDER_CD AS ORDER_CD
                    FROM
                        KSV_STOCK_FACOUT
                    WHERE
                        1 = 1
                        AND PO_CD like '%${poCd}%'
                        AND MATL_CD like '%${matlCd}%'
                `;

                const ret = await prisma.$queryRaw(Prisma.sql([sqlStr]));
                const totalOutQty = (ret || []).reduce((sum, row) => {
                    const v = Number(row?.OUTQTY ?? row?.outqty ?? 0);
                    return sum + (Number.isFinite(v) ? v : 0);
                }, 0);

                const totalRow = {
                    id: 0,
                    OUTDATE: null,
                    UNIT: 'TOTAL',
                    OUTQTY: totalOutQty,
                    PURPOSE: '',
                    REMARK: '',
                    ORDDR_CD: '',
                    IS_TOTAL: true,
                };

                const rows = (ret || []).map((r, idx) => ({
                    ...r,
                    id: idx + 1,
                    IS_TOTAL: false,
                    OUTDATE: r.OUTDATE ?? r.outdate ?? null,
                    UNIT: r.UNIT ?? r.unit ?? '',
                    OUTQTY: r.OUTQTY ?? r.outqty ?? 0,
                    PURPOSE: r.PURPOSE ?? r.purpose ?? '',
                    REMARK: r.REMARK ?? r.remark ?? '',
                    ORDER_CD: r.ORDER_CD ?? r.order_cd ?? '',
                }));

                return [totalRow, ...rows];
            } catch (err) {
                console.log('mgrQuery_S0914_BottomRightList error =>', err);
                throw err;
            }
        },

        //--------------------------------------------------
        // 5. 하단 우측 MOQ 그리드
        //--------------------------------------------------
        mgrQuery_S0914_BottomMOQList: async (
            _: any,
            args: any,
            contextValue: any,
        ) => {
            const qry = args.data || {};
            const poCd = qry.PO_CD || '';
            const matlCd = qry.MATL_CD || '';

            try {
                const sqlStr = `
                    SELECT
                        ROW_NUMBER() OVER (
                            ORDER BY A.STOCK_STATUS
                        ) AS id,
                        ISNULL(B.USE_PO_CD, '') AS USE_PO_CD,
                        ISNULL(B.USE_ORDER_CD, '') AS USE_ORDER_CD,
                        B.USE_QTY AS USE_QTY,
                        B.USE_DATETIME AS USE_DATETIME
                    FROM
                        KSV_STOCK_MATL A
                        INNER JOIN KSV_STOCK_USE B ON B.STOCK_IDX = A.STOCK_IDX
                            AND B.USE_PO_CD <> '${poCd}'
                    WHERE
                        A.PO_CD LIKE '%${poCd}%'
                        AND A.MATL_CD LIKE '%${matlCd}%'
                        AND A.STOCK_STATUS IN ('W', 'N')
                    ORDER BY
                        A.STOCK_STATUS
                `;

                const ret = await prisma.$queryRaw(Prisma.sql([sqlStr]));

                return ret;
            } catch (err) {
                console.log('mgrQuery_S0914_BottomMOQList error =>', err);
                throw err;
            }
        },

        //--------------------------------------------------
        // 6. 상단 STOCK 더블클릭 다이얼로그
        //--------------------------------------------------
        mgrQuery_S0914_StockUseList: async (
            _: any,
            args: any,
            contextValue: any,
        ) => {
            const qry = args.data || {};
            const poCd = qry.PO_CD || '';
            const matlCd = qry.MATL_CD || '';

            if (!poCd || !matlCd) {
                return [];
            }

            try {
                const sqlStr = `
                    SELECT
                        ROW_NUMBER() OVER (
                            ORDER BY
                                A.USE_PO_CD,
                                A.USE_PO_SEQ,
                                A.USE_ORDER_CD,
                                A.USE_MATL_CD,
                                A.USE_MRP_SEQ
                        ) AS id,
                        E.WARE_NAME,
                        B.PO_CD,
                        CONVERT(VARCHAR(20), B.PO_SEQ) AS PO_SEQ,
                        ISNULL(A.USE_ORDER_CD, '') AS USE_ORDER_CD,
                        ISNULL(B.ORDER_CD, '') AS ORDER_CD,
                        '' AS EMPTY_COL,
                        B.MATL_CD,
                        D.VENDOR_NAME,
                        C.MATL_NAME,
                        C.COLOR,
                        C.SPEC,
                        C.UNIT,
                        B.RACK,
                        B.LOCATION,
                        A.USE_QTY,
                        B.STOCK_QTY,
                        CONVERT(VARCHAR(50), A.STOCK_IDX) AS STOCK_IDX
                    FROM
                        KSV_STOCK_USE A,
                        KSV_STOCK_MATL B,
                        KCD_MATL_MST C,
                        KCD_VENDOR D,
                        KCD_FACTORY_WARE E,
                        KSV_PO_MRP F
                    WHERE
                        F.PO_CD = '${poCd}'
                        AND F.PO_MATL_CD = '${matlCd}'
                        AND B.STOCK_IDX = A.STOCK_IDX
                        AND C.MATL_CD = B.MATL_CD
                        AND D.VENDOR_CD = C.VENDOR_CD
                        AND E.WARE_CD = B.FACTORY_CD
                        AND A.USE_PO_CD = F.PO_CD
                        AND A.USE_PO_SEQ = F.PO_SEQ
                        AND A.USE_ORDER_CD = F.ORDER_CD
                        AND A.USE_MATL_CD = F.MATL_CD
                        AND A.USE_MRP_SEQ = F.MRP_SEQ
                    ORDER BY
                        A.USE_PO_CD,
                        A.USE_PO_SEQ,
                        A.USE_ORDER_CD,
                        A.USE_MATL_CD,
                        A.USE_MRP_SEQ
                `;

                const ret = await prisma.$queryRaw(Prisma.sql([sqlStr]));
                return ret;
            } catch (err) {
                console.log('mgrQuery_S0914_StockUseList error =>', err);
                throw err;
            }
        },
    },
};

export default moduleQuery_S0914_FAC_IN_OUT_MANAGER;
