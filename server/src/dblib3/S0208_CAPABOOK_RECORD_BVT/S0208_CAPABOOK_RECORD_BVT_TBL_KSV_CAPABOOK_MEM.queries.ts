// MGR_@@TNAME@@.queries.js

import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0208_CAPABOOK_RECORD_BVT_TBL_KSV_CAPABOOK_MEM = {
    Query: {
        mgrQuery_S0208_SEARCH_STYLE2: async (_, args) => {
            let sqlStr4 = `
                SELECT
                    *
                FROM
                    kcd_style
                WHERE
                    style_name like '%${args.data.STYLE_CD2.split(' ').join('%')}%'
            `;
            var tRet4 = await prisma.$queryRaw(Prisma.raw(sqlStr4));
            return tRet4;
        },
        mgrQuery_S0208_SEARCH_ORDER2: async (_, args) => {
            var tFactoryCd = '';
            if (args.data.FACTORY_CD === 'BVT') tFactoryCd = 'FC034';
            if (args.data.FACTORY_CD === 'ETP') tFactoryCd = 'FC044';

            var tSQL = '';
            if (args.data.IS_SAMPLE === '1') {
                tSQL = `           and   a.sample_flag = '1' `;
            } else {
                tSQL = `           and   (a.sample_flag = '0'  or a.sample_flag = '')`;
            }

            var qryBuyerName = '';
            if (args.data.USER_NAME.toLowerCase() === 'rnd')
                qryBuyerName = 'NSR';
            else qryBuyerName = args.data.USER_NAME;

            let sqlStr4 = `
                SELECT
                    a.*,
                    b.STYLE_NAME
                FROM
                    ksv_order_mst a,
                    kcd_style b,
                    kcd_code c
                WHERE
                    (
                        b.style_cd like '%${args.data.STYLE_CD.split(' ').join('%')}%'
                        or b.style_name like '%${args.data.STYLE_CD.split(' ').join('%')}%'
                    )
                    and a.order_cd like '%${args.data.ORDER_CD.split(' ').join('%')}%' ${tSQL}
                    and a.order_type in ('0', '1')
                    -- and   ((a.factory_cd = '${tFactoryCd}')
                    -- or    (a.factory_cd = 'FC010'))
                    and (a.factory_cd = '${tFactoryCd}')
                    and a.style_cd = b.style_cd
                    and c.cd_group = 'buyer_team'
                    and c.cd_code = a.buyer_team
                    and (
                        (lower(c.cd_name) like '%${qryBuyerName}%')
                        or (a.buyer_team = '${qryBuyerName}')
                    )
            `;
            var tRet4 = await prisma.$queryRaw(Prisma.raw(sqlStr4));
            var tArray = [];
            var tIdx = 0;
            console.log('Order Rrecord: ' + tRet4.length);
            for (tIdx = 0; tIdx < tRet4.length; tIdx++) {
                var tObj = { ...tRet4[tIdx] };

                var tTableName = '';
                if (args.data.FACTORY_CD === 'BVT') {
                    if (args.data.IS_SAMPLE === '1')
                        tTableName = 'ksv_capasample_mem';
                    else tTableName = 'ksv_capabook_mem';
                }

                if (args.data.FACTORY_CD === 'ETP') {
                    if (args.data.IS_SAMPLE === '1')
                        tTableName = 'KSV_CAPASAMPLE_MEM_ETHIOPIA';
                    else tTableName = 'KSV_CAPABOOK_MEM_ETHIOPIA';
                }

                let sqlStr5 = `
                    select
                        isnull(max(book_date), '') as book_date
                    from
                        ${tTableName}
                    where
                        order_cd = '${tObj.ORDER_CD}'
                        -- ${tObj.FACTORY_CD}
                        -- ${tObj.SAMPLE_FLAG}
                `;
                var tRet5 = await prisma.$queryRaw(Prisma.raw(sqlStr5));
                var tCapaDate = '';
                if (tRet5.length <= 0);
                else tCapaDate = tRet5[0].book_date;

                let sqlStr6 = `
                    select
                        *
                    from
                        kcd_style
                    where
                        style_cd = '${tObj.STYLE_CD}'
                `;
                var tRet6 = await prisma.$queryRaw(Prisma.raw(sqlStr6));

                let sqlStr7 = `
                    select
                        *
                    from
                        ksv_po_mem
                    where
                        order_cd = '${tObj.ORDER_CD}'
                `;
                var tRet7 = await prisma.$queryRaw(Prisma.raw(sqlStr7));
                var tPoCd = '';
                if (tRet7.length > 0) tPoCd = tRet7[0].PO_CD;

                var tWObj = {};
                tWObj.ORDER = { ...tObj };
                tWObj.STYLE = { ...tRet6[0] };
                tWObj.CAPA_DATE = tCapaDate;
                tWObj.PO_CD = tPoCd;

                tArray.push(tWObj);
            }
            return tArray;
        },

        mgrQuery_S0208_CODE: async (_, args) => {
            var tWRet = {};

            let sqlStr4 = `
                SELECT
                    *
                FROM
                    kcd_code
                WHERE
                    cd_group = 'BVT_KIND'
            `;
            var tRet4 = await prisma.$queryRaw(Prisma.raw(sqlStr4));
            var tObj = {};
            tObj.CD_CODE = '';
            tObj.CD_NAME = ' ';
            tRet4.unshift(tObj);
            tWRet.BVT_KIND = tRet4;

            var tObj5 = [];
            var tObj53 = {};
            tObj53.id = 3;
            tObj53.CD_CODE = ' ';
            tObj53.CD_NAME = ' ';
            tObj53.CD_GROUP = ' ';
            tObj5.push(tObj53);
            var tObj51 = {};
            tObj51.id = 1;
            tObj51.CD_CODE = 'NEW';
            tObj51.CD_NAME = 'NEW';
            tObj51.CD_GROUP = 'NR_TYPE';
            tObj5.push(tObj51);
            var tObj52 = {};
            tObj52.id = 2;
            tObj52.CD_CODE = 'REPEAT';
            tObj52.CD_NAME = 'REPEAT';
            tObj52.CD_GROUP = 'NR_TYPE';
            tObj5.push(tObj52);
            tWRet.NR = tObj5;

            var tObj6 = [];
            var tObj63 = {};
            tObj63.id = 3;
            tObj63.CD_CODE = ' ';
            tObj63.CD_NAME = ' ';
            tObj63.CD_GROUP = ' ';
            tObj6.push(tObj63);
            var tObj61 = {};
            tObj61.id = 1;
            tObj61.CD_CODE = 'BVT';
            tObj61.CD_NAME = 'BVT';
            tObj61.CD_GROUP = 'FACTOYR';
            tObj6.push(tObj61);
            var tObj62 = {};
            tObj62.id = 2;
            tObj62.CD_CODE = 'ETP';
            tObj62.CD_NAME = 'ETP';
            tObj62.CD_GROUP = 'FACTORY';
            tObj6.push(tObj62);
            tWRet.FACTORY_CD = tObj6;

            let sqlStr9 = `
                SELECT
                    *
                FROM
                    kcd_code
                WHERE
                    cd_group = 'CAPA_USER'
                    and cd_flag = '1'
            `;
            var tRet9 = await prisma.$queryRaw(Prisma.raw(sqlStr9));
            var tObj = {};
            tObj.CD_CODE = '';
            tObj.CD_NAME = ' ';
            tRet9.unshift(tObj);
            tWRet.CAPA_USER = tRet9;

            console.log(tWRet);

            return tWRet;
        },
        mgrQuery_S0208_CAPABOOK_RECORD_BVT_DATE: async (_, args) => {
            var tWRet = {};

            var tSQL = '';
            let sqlStr = `
                SELECT
                    max(BOOK_DATE) as MAX_BOOK_DATE
                FROM
                    ksv_capabook_mst_ethiopia
                WHERE
                    status_cd = '1'
                    and user_id = '${args.USER_ID}'
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWRet.BOOK_DATE_ETP = tRet[0].MAX_BOOK_DATE;

            let sqlStr1 = `
                SELECT
                    min(BOOK_DATE) as MIN_BOOK_DATE
                FROM
                    ksv_capabook_mst_ethiopia
                WHERE
                    status_cd = '0'
                    and user_id = '${args.USER_ID}'
            `;
            var tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));
            tWRet.NEW_DATE_ETP = tRet1[0].MIN_BOOK_DATE;

            var tSQL = '';
            let sqlStr = `
                SELECT
                    max(BOOK_DATE) as MAX_BOOK_DATE
                FROM
                    ksv_capasample_mst_ethiopia
                WHERE
                    status_cd = '1'
                    and user_id = '${args.USER_ID}'
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWRet.BOOK_DATE_SAMPLE_ETP = tRet[0].MAX_BOOK_DATE;

            let sqlStr1 = `
                SELECT
                    min(BOOK_DATE) as MIN_BOOK_DATE
                FROM
                    ksv_capasample_mst_ethiopia
                WHERE
                    status_cd = '0'
                    and user_id = '${args.USER_ID}'
            `;
            var tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));
            tWRet.NEW_DATE_SAMPLE_ETP = tRet1[0].MIN_BOOK_DATE;

            let sqlStr2 = `
                SELECT
                    max(BOOK_DATE) as MAX_BOOK_DATE
                FROM
                    ksv_capabook_mst
                WHERE
                    status_cd = '1'
                    and user_id = '${args.USER_ID}'
            `;
            var tRet2 = await prisma.$queryRaw(Prisma.raw(sqlStr2));
            tWRet.BOOK_DATE_BVT = tRet2[0].MAX_BOOK_DATE;

            let sqlStr3 = `
                SELECT
                    min(BOOK_DATE) as MIN_BOOK_DATE
                FROM
                    ksv_capabook_mst
                WHERE
                    status_cd = '0'
                    and user_id = '${args.USER_ID}'
            `;
            var tRet3 = await prisma.$queryRaw(Prisma.raw(sqlStr3));
            tWRet.NEW_DATE_BVT = tRet3[0].MIN_BOOK_DATE;

            let sqlStr2 = `
                SELECT
                    max(BOOK_DATE) as MAX_BOOK_DATE
                FROM
                    ksv_capasample_mst
                WHERE
                    status_cd = '1'
                    and user_id = '${args.USER_ID}'
            `;
            var tRet2 = await prisma.$queryRaw(Prisma.raw(sqlStr2));
            tWRet.BOOK_DATE_SAMPLE_BVT = tRet2[0].MAX_BOOK_DATE;

            let sqlStr3 = `
                SELECT
                    min(BOOK_DATE) as MIN_BOOK_DATE
                FROM
                    ksv_capasample_mst
                WHERE
                    status_cd = '0'
                    and user_id = '${args.USER_ID}'
            `;
            var tRet3 = await prisma.$queryRaw(Prisma.raw(sqlStr3));
            tWRet.NEW_DATE_SAMPLE_BVT = tRet3[0].MIN_BOOK_DATE;

            let sqlStr4 = `
                SELECT
                    *
                FROM
                    kcd_code
                WHERE
                    cd_group = 'BVT_KIND'
            `;
            var tRet4 = await prisma.$queryRaw(Prisma.raw(sqlStr4));
            tWRet.BVT_KIND = tRet4;

            var tObj5 = [];
            var tObj51 = {};
            tObj51.id = 1;
            tObj51.CD_CODE = 'NEW';
            tObj51.CD_NAME = 'NEW';
            tObj51.CD_GROUP = 'NR_TYPE';
            tObj5.push(tObj51);
            var tObj52 = {};
            tObj52.id = 2;
            tObj52.CD_CODE = 'REPEAT';
            tObj52.CD_NAME = 'REPEAT';
            tObj52.CD_GROUP = 'NR_TYPE';
            tObj5.push(tObj52);
            var tObj53 = {};
            tObj53.id = 3;
            tObj53.CD_CODE = ' ';
            tObj53.CD_NAME = ' ';
            tObj53.CD_GROUP = ' ';
            tObj5.push(tObj53);
            tWRet.NR = tObj5;

            var tObj6 = [];
            var tObj61 = {};
            tObj61.id = 1;
            tObj61.CD_CODE = 'BVT';
            tObj61.CD_NAME = 'BVT';
            tObj61.CD_GROUP = 'FACTOYR';
            tObj6.push(tObj61);
            var tObj62 = {};
            tObj62.id = 2;
            tObj62.CD_CODE = 'ETP';
            tObj62.CD_NAME = 'ETP';
            tObj62.CD_GROUP = 'FACTORY';
            tObj6.push(tObj62);
            var tObj63 = {};
            tObj63.id = 3;
            tObj63.CD_CODE = ' ';
            tObj63.CD_NAME = ' ';
            tObj63.CD_GROUP = ' ';
            tObj6.push(tObj63);
            tWRet.FACTORY_CD = tObj6;

            let sqlStr9 = `
                SELECT
                    *
                FROM
                    kcd_code
                WHERE
                    cd_group = 'CAPA_USER'
            `;
            var tRet9 = await prisma.$queryRaw(Prisma.raw(sqlStr9));
            var tObj = {};
            tObj.CD_CODE = ' ';
            tObj.CD_NAME = ' ';
            tRet9.unshift(tObj);
            tWRet.CAPA_USER = tRet9;

            console.log(tWRet);

            return tWRet;
        },

        mgrQuery_S0208_CAPABOOK_RECORD_BVT_TBL_KSV_CAPABOOK_MEM: async (
            _,
            args,
        ) => {
            let tTableName = '';
            if (args.data.FACTORY_CD === 'ETP') {
                tTableName =
                    args.data.IS_SAMPLE === '1'
                        ? 'ksv_capasample_mem_ethiopia'
                        : 'ksv_capabook_mem_ethiopia';
            } else {
                tTableName =
                    args.data.IS_SAMPLE === '1'
                        ? 'ksv_capasample_mem'
                        : 'ksv_capabook_mem';
            }

            // 1. 메인 쿼리 실행
            const sqlStr = `
                SELECT
                    a.*,
                    ISNULL(c.NEGO_TYPE, '0') AS NEGO_TYPE,
                    b.STYLE_NAME,
                    b0.BUYER_NAME,
                    ISNULL(d.CAPA_M_ETA, '') AS CAPA_M_ETA,
                    ISNULL(d.DUE_DATE, '') AS ETD,
                    ISNULL(d.DUE_DATE, '') AS ORDER_DUE_DATE,
                    ISNULL(d.APPROVAL_DATE, '') AS APPROVAL_DATE,
                    ISNULL(d.MATL_DUE_DATE, '') AS MATL_DUE_DATE
                FROM
                    (
                        SELECT
                            TOP 2000 a0.*
                        FROM
                            ${tTableName} a0
                        WHERE
                            a0.book_date = '${args.data.BOOK_DATE}'
                            AND a0.po_cd LIKE '%${args.data.PO_CD.split(' ').join('%')}%'
                            AND a0.user_id = '${args.data.USER_NAME}'
                            AND LEFT(a0.order_cd, 2) LIKE '%${args.data.BUYER_CD}%'
                            AND A0.order_cd LIKE '%${args.data.ORDER_CD}%'
                        ORDER BY
                            LEFT(a0.order_cd, 2),
                            a0.order_cd
                    ) a
                    LEFT JOIN ksv_order_mst d ON a.order_cd = d.order_cd
                    LEFT JOIN kcd_style b ON a.style_cd = b.style_cd
                    LEFT JOIN kcd_buyer b0 ON b0.buyer_cd = LEFT(a.order_cd, 2)
                    AND b0.buyer_cd LIKE '%${args.data.BUYER_CD}%'
                    LEFT JOIN ksv_order_cmpt c ON a.order_cd = c.order_cd
                    AND c.nego_type = '1'
                    and c.nego_seq = (
                        select
                            max(nego_seq)
                        from
                            ksv_order_cmpt
                        where
                            order_cd = a.order_cd
                    )
                ORDER BY
                    a.po_cd,
                    a.order_cd;
            `;

            const tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            if (!tRet.length) return [];

            // 2. 모든 ORDER_CD 수집 후 SHIP_DATE 한번에 조회
            var orderCdList = [];
            for (var i = 0; i < tRet.length; i++) {
                var orderCd = tRet[i].ORDER_CD;
                if (orderCdList.indexOf(orderCd) === -1) {
                    orderCdList.push(orderCd);
                }
            }

            // SQL용 문자열 생성 ('A001','A002',...)
            var orderCds = "'" + orderCdList.join("','") + "'";
            const shipSql = `
                SELECT
                    order_cd,
                    ISNULL(MAX(ship_date), '') AS ship_date
                FROM
                    ksv_order_ship
                WHERE
                    order_cd IN (${orderCds})
                GROUP BY
                    order_cd
            `;
            const shipData = await prisma.$queryRaw(Prisma.raw(shipSql));
            const shipMap = Object.fromEntries(
                shipData.map((row) => [row.order_cd, row.ship_date]),
            );

            //
            const usageSql = `
                select
                    *
                from
                    kcd_code
                where
                    cd_group = 'SAMPLE_USAGE'
            `;
            const usageRet = await prisma.$queryRaw(Prisma.raw(usageSql));
            const usageMap = Object.fromEntries(
                usageRet.map((row) => [row.CD_CODE, row.CD_NAME]),
            );

            // 3. 최종 결과 조립
            const result = tRet.map((row) => {
                if (tTableName.includes('_capasample_')) {
                    return {
                        ...row,
                        SHIP_DATE: shipMap[row.ORDER_CD] || '',
                        EXF: row.SD || '',
                        M_ETA: row.M_ETA || '',
                        USAGE: row.USAGE || '',
                        USAGE_N: usageMap[row.USAGE] || '',
                    };
                } else {
                    return {
                        ...row,
                        SHIP_DATE: shipMap[row.ORDER_CD] || '',
                        EXF: row.SD || '',
                        M_ETA: row.M_ETA || '',
                        USAGE: '',
                        USAGE_N: '',
                    };
                }
            });

            return result;
        },
    },
};

export default moduleQuery_S0208_CAPABOOK_RECORD_BVT_TBL_KSV_CAPABOOK_MEM;
