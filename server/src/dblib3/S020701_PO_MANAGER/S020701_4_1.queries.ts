import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S020701_4_1 = {
    Query: {
        mgrQueryS020701_4_1: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }
            let sqlStr = `
                select distinct
                    C.*,
                    isnull(c1.PO_CD, '') as PO_CD,
                    c2.BUYER_NAME,
                    isnull(c4.CD_NAME, '') as ORDER_STATUS_NAME,
                    '' as REG_USER,
                    '' as REG_DATETIME
                from
                    (
                        SELECT
                            isnull(A.REF_ORDER_NO, '') as REF_ORDER_NO,
                            A.ORDER_CD,
                            A.ORDER_STATUS,
                            isnull(a1.cd_name, '') as ORDER_STATUS_NAME,
                            B.STYLE_NAME,
                            B.STYLE_CD,
                            A.TOT_CNT,
                            A.AVR_PRICE,
                            (A.AVR_PRICE * A.TOT_CNT) AS AMT,
                            A.CURR_CD,
                            A.DUE_DATE,
                            isnull(A.PRICE_TERM, '') as PRICE_TERM,
                            isnull(B.STYLE_UNIT, '') as UNIT
                        FROM
                            KSV_ORDER_MST A
                            left join kcd_code a1 on a1.cd_code = A.ORDER_STATUS and a1.cd_group = 'order_status',
                            KCD_STYLE B
                        WHERE
                            A.ORDER_CD in (
                                select distinct
                                    order_cd
                                from
                                    ksv_po_mem
                                where
                                    po_cd = '${args.data.PO_CD}'
                            )
                            AND A.STYLE_CD = B.STYLE_CD
                    ) C
                    left join ksv_po_mem c1 on c1.order_cd = C.order_cd
                    and c1.po_seq = 1
                    and c1.po_cd = '${args.data.PO_CD}'
                    left join kcd_buyer c2 on c2.buyer_cd = left(C.order_cd, 2)
                    left join ksv_po_mst c3 on c3.po_cd = '${args.data.PO_CD}'
                    left join kcd_code c4 on c4.cd_group = 'order_status' and c4.cd_code = C.ORDER_STATUS
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                REF_ORDER_NO: '',
                ORDER_CD: '',
                STYLE_NAME: '',
                TOT_CNT: 0,
                UNIT: '',
                PRICE_TERM: '',
                AVR_PRICE: 0,
                AMT: 0,
                CURR_CD: '',
                DUE_DATE: '',
                ETC99: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tObj = { ...tRet[tIdx] };

                let sql0 = `
                    select
                        b.tot_cnt,
                        isnull(sum(a.ord_cnt), 0) as s_ord_cnt
                    from
                        ksv_po_mrpnet a,
                        ksv_order_mst b
                    where
                        a.po_cd = '${args.data.PO_CD}'
                        and a.order_cd = '${tObj.ORDER_CD}'
                        and a.use_size <> ''
                        and a.order_cd = b.order_cd
                    group by
                        b.tot_cnt
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                tObj.ORDER_CD2 = '';
                if (tRet0.length > 0) {
                    var tValue =
                        parseFloat(tRet0[0].s_ord_cnt) /
                        parseFloat(tRet0[0].tot_cnt);
                    var tValue100 = parseFloat(Math.ceil(tValue * 100)) / 100.0;

                    var tIntVal = Math.ceil(tValue100) * 100;
                    var tFloatVal = tValue100 * 100;

                    if (parseFloat(tIntVal) === parseFloat(tFloatVal)) {
                        tObj.ORDER_CD2 = `${tValue100}(Ok)`;
                    } else {
                        tObj.ORDER_CD2 = `${tValue100}(Error:${tIntVal}/${tFloatVal})`;
                    }
                }
                tRetArray.push(tObj);
            }
            return tRetArray;
        },
        mgrQueryS020701_4_2: async (_, args) => {
            var tSQL = '';
            args.data.ORDER_CD.forEach((col, i) => {
                if (i === 0) tSQL += `'${col}'`;
                else tSQL += `, '${col}'`;
            });

            let sqlStr = `
                select
                    C.*
                from
                    (
                        SELECT
                            B1.*,
                            isnull(c1.PO_CD, '') as PO_CD,
                            c2.BUYER_NAME
                        FROM
                            (
                                SELECT
                                    isnull(A.REF_ORDER_NO, '') as REF_ORDER_NO,
                                    A.ORDER_CD,
                                    B.STYLE_NAME,
                                    B.STYLE_CD,
                                    A.TOT_CNT,
                                    A.AVR_PRICE,
                                    (A.AVR_PRICE * A.TOT_CNT) AS AMT,
                                    A.CURR_CD,
                                    A.DUE_DATE,
                                    isnull(A.PRICE_TERM, '') as PRICE_TERM,
                                    isnull(B.STYLE_UNIT, '') as UNIT
                                FROM
                                    KSV_ORDER_MST A,
                                    KCD_STYLE B
                                WHERE
                                    A.STYLE_CD = B.STYLE_CD
                                    AND A.ORDER_CD in (${tSQL})
                                    AND ORDER_TYPE in ('0', '1')
                            ) B1
                            left join ksv_po_mem c1 on c1.order_cd = B1.ORDER_CD
                            and c1.po_seq = 1
                            left join kcd_buyer c2 on c2.buyer_cd = left(B1.order_cd, 2)
                    ) C
                    -- where C.ORDER_CD2 = ''
                order by
                    C.ORDER_CD desc
                    -- offset 0 rows fetch next 1000 rows only
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                REF_ORDER_NO: '',
                ORDER_CD: '',
                STYLE_NAME: '',
                TOT_CNT: 0,
                UNIT: '',
                PRICE_TERM: '',
                AVR_PRICE: 0,
                AMT: 0,
                CURR_CD: '',
                DUE_DATE: '',
                ETC99: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
        mgrQueryS020701_4_3: async (_, args) => {
            var tSQL = '';
            args.data.ORDER_CD.forEach((col, i) => {
                if (i === 0) tSQL += `'${col}'`;
                else tSQL += `, '${col}'`;
            });

            let sqlStr = `
                select
                    C.*
                from
                    (
                        SELECT
                            B1.*,
                            isnull(c1.PO_CD, '') as PO_CD,
                            c2.BUYER_NAME
                        FROM
                            (
                                SELECT
                                    isnull(A.REF_ORDER_NO, '') as REF_ORDER_NO,
                                    A.ORDER_CD,
                                    B.STYLE_NAME,
                                    B.STYLE_CD,
                                    A.TOT_CNT,
                                    A.AVR_PRICE,
                                    (A.AVR_PRICE * A.TOT_CNT) AS AMT,
                                    A.CURR_CD,
                                    A.DUE_DATE,
                                    isnull(A.PRICE_TERM, '') as PRICE_TERM,
                                    isnull(B.STYLE_UNIT, '') as UNIT
                                FROM
                                    KSV_ORDER_MST A,
                                    KCD_STYLE B
                                WHERE
                                    A.STYLE_CD = B.STYLE_CD
                                    AND left(A.ORDER_CD, 2) = '${args.data.BUYER_CD}'
                                    AND ORDER_TYPE in ('0', '1')
                                    AND ORDER_STATUS in ('0')
                                    AND A.ORDER_CD not in (${tSQL})
                                    AND (
                                        A.PO_CD is null
                                        or A.PO_CD = ''
                                    )
                            ) B1
                            left join ksv_po_mem c1 on c1.order_cd = B1.ORDER_CD
                            and c1.po_seq = 1
                            left join kcd_buyer c2 on c2.buyer_cd = left(B1.order_cd, 2)
                    ) C
                where
                    C.PO_CD = ''
                order by
                    C.ORDER_CD desc
                    -- offset 0 rows fetch next 1000 rows only
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                REF_ORDER_NO: '',
                ORDER_CD: '',
                STYLE_NAME: '',
                TOT_CNT: 0,
                UNIT: '',
                PRICE_TERM: '',
                AVR_PRICE: 0,
                AMT: 0,
                CURR_CD: '',
                DUE_DATE: '',
                ETC99: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            tRet.forEach((col, i) => {
                var tObj = { ...col };
                /*
           if (tObj.ORDER_CD.includes('XX-')) {
               ;
           } else {
               tRetArray.push(tObj);
           }
           */
                tRetArray.push(tObj);
            });
            return tRetArray;
        },
        mgrQueryS020701_4_4: async (_, args) => {
            var tSQL = '';
            var tORDER_CD = args.data.ORDER_CD;

            let sqlStr = `
                select
                    C.*
                from
                    (
                        SELECT
                            B1.*,
                            isnull(c1.PO_CD, '') as PO_CD,
                            c2.BUYER_NAME
                        FROM
                            (
                                SELECT
                                    isnull(A.REF_ORDER_NO, '') as REF_ORDER_NO,
                                    A.ORDER_CD,
                                    B.STYLE_NAME,
                                    B.STYLE_CD,
                                    A.TOT_CNT,
                                    A.AVR_PRICE,
                                    (A.AVR_PRICE * A.TOT_CNT) AS AMT,
                                    A.CURR_CD,
                                    A.DUE_DATE,
                                    isnull(A.PRICE_TERM, '') as PRICE_TERM,
                                    isnull(B.STYLE_UNIT, '') as UNIT
                                FROM
                                    KSV_ORDER_MST A,
                                    KCD_STYLE B
                                WHERE
                                    A.STYLE_CD = B.STYLE_CD
                                    --AND  left(A.ORDER_CD, 2) = '${args.data.BUYER_CD}'
                                    AND ORDER_TYPE in ('0', '1')
                                    AND ORDER_STATUS in ('0')
                                    AND A.ORDER_CD like '%${tORDER_CD}%'
                                    -- AND (A.PO_CD is null or A.PO_CD = '')
                            ) B1
                            left join ksv_po_mem c1 on c1.order_cd = B1.ORDER_CD
                            and c1.po_seq = 1
                            left join kcd_buyer c2 on c2.buyer_cd = left(B1.order_cd, 2)
                    ) C
                where
                    C.PO_CD = ''
                order by
                    C.ORDER_CD desc
                    -- offset 0 rows fetch next 1000 rows only
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                REF_ORDER_NO: '',
                ORDER_CD: '',
                STYLE_NAME: '',
                TOT_CNT: 0,
                UNIT: '',
                PRICE_TERM: '',
                AVR_PRICE: 0,
                AMT: 0,
                CURR_CD: '',
                DUE_DATE: '',
                ETC99: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            tRet.forEach((col, i) => {
                var tObj = { ...col };
                /*
           if (tObj.ORDER_CD.includes('XX-')) {
               ;
           } else {
               tRetArray.push(tObj);
           }
           */
                tRetArray.push(tObj);
            });
            return tRetArray;
        },
    },
};

export default moduleQuery_S020701_4_1;
