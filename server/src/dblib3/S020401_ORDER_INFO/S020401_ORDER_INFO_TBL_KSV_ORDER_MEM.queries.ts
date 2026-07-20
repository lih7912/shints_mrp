// MGR_@@TNAME@@.queries.js

import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S020401_ORDER_INFO_TBL_KSV_ORDER_MEM = {
    Query: {
        mgrQuery_S020401_ORDER_INFO_QRY1: async (_, args) => {
            var tStrOrderCd = args.data.ORDER_CD;

            var tWRet = {};

            var tSQL = '';
            let sqlStr = `
                select
                    (
                        bvt_screen_print + bvt_heat_silicon + bvt_embroidery + bvt_tpr + bvt_quilting + bvt_digital_print + bvt_line_charge + bvt_label_print
                    ) as ORDER_CMPT
                from
                    ksv_order_cmpt
                where
                    order_cd = '${tStrOrderCd}'
                    and nego_seq = (
                        select
                            max(nego_seq)
                        from
                            ksv_order_cmpt
                        where
                            order_cd = '${tStrOrderCd}'
                    )
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWRet.ORDER_CMPT = tRet;

            tSQL = '';
            let sqlStr = `
                select
                    *
                from
                    ksv_po_mem
                where
                    order_cd = '${tStrOrderCd}'
                    and po_seq = 1
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWRet.PO = tRet;

            tSQL = '';
            let sqlStr = `
                select
                    count(*) as SUM_SHIP_CNT
                from
                    ksv_order_ship
                where
                    order_cd = '${tStrOrderCd}'
                    and cm_bill_flag = '1'
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWRet.SHIP_CNT = tRet;

            tSQL = '';
            let sqlStr = `
                select
                    *
                from
                    kzz_sample_cost
                where
                    order_cd = '${tStrOrderCd}'
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWRet.SAMPLE_COST = tRet;

            tSQL = '';
            let sqlStr = `
                SELECT
                    a.*,
                    b.COLOR
                FROM
                    KSV_ORDER_MEM a,
                    KSV_PROD_MST b
                WHERE
                    a.prod_cd = b.prod_cd
                    and a.order_cd = '${tStrOrderCd}'
                order by
                    b.color,
                    a.add_flag
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWRet.ORDER_MEM = tRet;

            tSQL = '';
            let sqlStr = `
                select distinct
                    f.SHIP_DATE,
                    c.cd_name as SHIP_TYPE_NAME,
                    b.SHIP_QTY,
                    isnull(b.SALES_PRICE, 0),
                    b.INVOICE_NO,
                    e.cd_name as DELIVERY_TYPE_NAME,
                    isnull(b.SHIP_PRICE, 0),
                    g.SHIP_DATE as SHIP_DATE1
                from
                    kcd_code c,
                    ksv_invoice_mem b,
                    kcd_code e,
                    ksv_invoice_mst f,
                    ksv_order_ship g
                where
                    b.order_cd = '${tStrOrderCd}'
                    and c.cd_group = 'SHIP_PTYPE'
                    and c.cd_code = b.ship_ptype
                    and e.cd_group = 'DELIVERY_TYPE'
                    and e.cd_code = b.delivery_type
                    and b.invoice_no = f.invoice_no
                    and g.order_cd = b.order_cd
                    and g.invoice_no = f.invoice_no
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWRet.INVOICE_MEM = tRet;

            tSQL = '';
            let sqlStr = `
                SELECT
                    a.*,
                    d.STYLE_NAME,
                    c.CD_NAME as ORDER_STATUS_NAME,
                    e.BUYER_NAME,
                    f.SIZE_MEMBER
                FROM
                    (
                        SELECT
                            *
                        FROM
                            KSV_ORDER_MST
                        WHERE
                            id > 0
                            AND ORDER_CD = '${tStrOrderCd}'
                            -- order by YY desc , seq desc
                            -- offset 0 rows fetch next 1000 rows only
                    ) a
                    LEFT JOIN KCD_SIZE_MST f on a.SIZE_GROUP = f.SIZE_GROUP
                    LEFT JOIN KCD_CODE c on a.ORDER_STATUS = c.CD_CODE
                    and c.cd_group = 'ORDER_STATUS'
                    LEFT JOIN KCD_BUYER e on LEFT(a.ORDER_CD, 2) = e.BUYER_CD
                    LEFT JOIN KCD_STYLE d on a.STYLE_CD = d.STYLE_CD
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWRet.ORDER_MST = tRet;

            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_FACTORY
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWRet.CODE_FACTORY_CD = tRet;
            let tFactoryCd = {};
            tFactoryCd.FACTORY_CD = ' ';
            tFactoryCd.FACTORY_NAME = ' ';
            tWRet.CODE_FACTORY_CD.unshift(tFactoryCd);

            var tSQL = '';
            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_NATION
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWRet.CODE_NAT_CD = tRet;
            let tNatCd = {};
            tNatCd.NAT_CD = ' ';
            tNatCd.NAT_NAME = ' ';
            tWRet.CODE_NAT_CD.unshift(tNatCd);

            var tSQL = '';
            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_USER
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWRet.CODE_PATT_USER = tRet;
            let tPattUser = {};
            tPattUser.USER_ID = ' ';
            tPattUser.USER_NAME = ' ';
            tWRet.CODE_PATT_USER.unshift(tPattUser);

            var tSQL = '';
            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_USER
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWRet.CODE_SEW_USER = tRet;
            let tSewUser = {};
            tSewUser.USER_ID = ' ';
            tSewUser.USER_NAME = ' ';
            tWRet.CODE_SEW_USER.unshift(tSewUser);

            let tCode = {};
            tCode.CD_CODE = ' ';
            tCode.CD_NAME = ' ';

            tSQL = '';
            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'BUYER_TEAM'
            `;
            tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWRet.CODE_BUYER_TEAM = tRet;
            tWRet.CODE_BUYER_TEAM.unshift(tCode);

            tSQL = '';
            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'CURR_CD'
            `;
            tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWRet.CODE_CURR_CD = tRet;
            tWRet.CODE_CURR_CD.unshift(tCode);

            tSQL = '';
            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'SAMPLE_STEP'
            `;
            tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWRet.CODE_SAMPLE_STEP = tRet;
            tWRet.CODE_SAMPLE_STEP.unshift(tCode);

            tSQL = '';
            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'SAMPLE_ROUND'
            `;
            tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWRet.CODE_SAMPLE_ROUND = tRet;
            tWRet.CODE_SAMPLE_ROUND.unshift(tCode);

            tSQL = '';
            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'SAMPLE_REASON'
            `;
            tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWRet.CODE_SAMPLE_REASON = tRet;
            tWRet.CODE_SAMPLE_REASON.unshift(tCode);

            var tMstArray = [];
            tSQL = '';
            let sqlStr = `
                SELECT
                    *
                FROM
                    KSV_ORDER_MST
                WHERE
                    ORDER_CD like '${tStrOrderCd}%'
                ORDER BY
                    ORDER_CD
            `;
            tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tIdx9 = 0;
            for (tIdx9 = 0; tIdx9 < tRet.length; tIdx9++) {
                var tOne = tRet[tIdx9];
                var tWOne = {};
                tWOne.ORDER_CD = tOne.ORDER_CD;
                tWOne.NAT_CD = tOne.NAT_CD;
                tWOne.DUE_DATE = tOne.DUE_DATE;
                tWOne.TOT_QRY = tOne.TOT_QRY;
                tWOne.ORDER_MEM = [];

                let tSQL1 = `
                    SELECT
                        a.*,
                        b.COLOR
                    FROM
                        KSV_ORDER_MEM a,
                        KSV_PROD_MST b
                    WHERE
                        a.prod_cd = b.prod_cd
                        and a.order_cd = '${tWOne.ORDER_CD}'
                    order by
                        b.color,
                        a.add_flag
                `;
                var tRet10 = await prisma.$queryRaw(Prisma.raw(tSQL1));
                var tIdx10 = 0;
                for (tIdx10 = 0; tIdx10 < tRet10.length; tIdx10++) {
                    var tOne1 = tRet10[tIdx10];
                    var tWOne1 = {};
                    tWOne1.ORDER_CD = tOne1.ORDER_CD;
                    tWOne1.PROD_CD = tOne1.PROD_CD;
                    tWOne1.ADD_FLAG = tOne1.ADD_FLAG;
                    tWOne1.PRICE = tOne1.PRICE;
                    tWOne1.TOT_CNT = tOne1.TOT_CNT;
                    tWOne1.SIZE_CNT = tOne1.SIZE_CNT;
                    tWOne1.OLD_PROD_CD = tOne1.OLD_PROD_CD;
                    tWOne1.end_price = tOne1.end_price;
                    tWOne1.barcode = tOne1.barcode;
                    tWOne1.MID_SIZE = tOne1.MID_SIZE;
                    tWOne1.MID_SIZE_QTY = tOne1.MID_SIZE_QTY;
                    tWOne1.SIZE_LOSS = tOne1.SIZE_LOSS;
                    tWOne1.id = tOne1.id;
                    tWOne1.COLOR = tOne1.COLOR;
                    tWOne.ORDER_MEM.push(tWOne1);
                }

                tMstArray.push(tWOne);
            }
            tWRet.ORDER_MST_ARRAY = tMstArray;

            return tWRet;
        },

        mgrQuery_S020401_ORDER_INFO_QRY2: async (_, args) => {
            var tStrOrderCd = args.data.ORDER_CD;

            var tWRet = {};

            var tSQL = '';
            let sqlStr = `
                select
                    (
                        bvt_screen_print + bvt_heat_silicon + bvt_embroidery + bvt_tpr + bvt_quilting + bvt_digital_print + bvt_line_charge + bvt_label_print
                    ) as ORDER_CMPT
                from
                    ksv_order_cmpt
                where
                    order_cd = '${tStrOrderCd}'
                    and nego_seq = (
                        select
                            max(nego_seq)
                        from
                            ksv_order_cmpt
                        where
                            order_cd = '${tStrOrderCd}'
                    )
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWRet.ORDER_CMPT = tRet;

            tSQL = '';
            let sqlStr = `
                select
                    *
                from
                    ksv_po_mem
                where
                    order_cd = '${tStrOrderCd}'
                    and po_seq = 1
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWRet.PO = tRet;

            tSQL = '';
            let sqlStr = `
                select
                    count(*) as SUM_SHIP_CNT
                from
                    ksv_order_ship
                where
                    order_cd = '${tStrOrderCd}'
                    and cm_bill_flag = '1'
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWRet.SHIP_CNT = tRet;

            tSQL = '';
            let sqlStr = `
                select
                    *
                from
                    kzz_sample_cost
                where
                    order_cd = '${tStrOrderCd}'
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWRet.SAMPLE_COST = tRet;

            tWRet.ORDER_MEM = [];

            tSQL = '';
            let sqlStr = `
                select distinct
                    f.SHIP_DATE,
                    c.cd_name as SHIP_TYPE_NAME,
                    b.SHIP_QTY,
                    isnull(b.SALES_PRICE, 0),
                    b.INVOICE_NO,
                    e.cd_name as DELIVERY_TYPE_NAME,
                    isnull(b.SHIP_PRICE, 0),
                    g.SHIP_DATE as SHIP_DATE1
                from
                    kcd_code c,
                    ksv_invoice_mem b,
                    kcd_code e,
                    ksv_invoice_mst f,
                    ksv_order_ship g
                where
                    b.order_cd = '${tStrOrderCd}'
                    and c.cd_group = 'SHIP_PTYPE'
                    and c.cd_code = b.ship_ptype
                    and e.cd_group = 'DELIVERY_TYPE'
                    and e.cd_code = b.delivery_type
                    and b.invoice_no = f.invoice_no
                    and g.order_cd = b.order_cd
                    and g.invoice_no = f.invoice_no
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWRet.INVOICE_MEM = tRet;

            tSQL = '';
            let sqlStr = `
                SELECT
                    a.*,
                    d.STYLE_NAME,
                    c.CD_NAME as ORDER_STATUS_NAME,
                    e.BUYER_NAME,
                    f.SIZE_MEMBER
                FROM
                    (
                        SELECT
                            *
                        FROM
                            KSV_ORDER_MST
                        WHERE
                            id > 0
                            AND ORDER_CD = '${tStrOrderCd}'
                            -- order by YY desc , seq desc
                            -- offset 0 rows fetch next 1000 rows only
                    ) a
                    LEFT JOIN KCD_SIZE_MST f on a.SIZE_GROUP = f.SIZE_GROUP
                    LEFT JOIN KCD_CODE c on a.ORDER_STATUS = c.CD_CODE
                    and c.cd_group = 'ORDER_STATUS'
                    LEFT JOIN KCD_BUYER e on LEFT(a.ORDER_CD, 2) = e.BUYER_CD
                    LEFT JOIN KCD_STYLE d on a.STYLE_CD = d.STYLE_CD
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWRet.ORDER_MST = tRet;

            tWRet.CODE_FACTORY_CD = [];
            tWRet.CODE_NAT_CD = [];
            tWRet.CODE_PATT_USER = [];
            tWRet.CODE_SEW_USER = [];
            tWRet.CODE_BUYER_TEAM = [];
            tWRet.CODE_CURR_CD = [];
            tWRet.CODE_SAMPLE_STEP = [];
            tWRet.CODE_SAMPLE_ROUND = [];
            tWRet.CODE_SAMPLE_REASON = [];
            tWRet.ORDER_MST_ARRAY = [];

            return tWRet;
        },

        mgrQuery_S020401_ORDER_INFO_TBL_KSV_ORDER_MEM: async (_, args) => {
            var tSQL = '';
            /*
       if (args.KEY1 !== '') {
           tSQL += `AND KEY1 = '${args.KEY1}' `;
       }
*/
            /*
       let sqlStr = `
           SELECT
               *
           FROM
               @@TNAME@@
           WHERE
               id > 0 ${tSQL}
       `;
       var tRet  =  await prisma.$queryRaw(Prisma.raw(sqlStr));
*/
            var tRetData = {
                PROD_CD: '',
                ADD_FLAG: '',
                COLOR: '',
                TOT_CNT: '',
                PRICE: '',
                SIZE_CNT: '',
                OLD_PROD_CD: '',
                end_price: '',
                MID_SIZE: '',
                MID_SIZE_QTY: '',
                SIZE_LOSS: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            return tRetArray;
        },

        mgrQuery_S020401_ORDER_INFO_CODE: async (_, args) => {
            var tSQL = '';

            var tWRet = {};

            var tSQL = '';
            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_FACTORY
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWRet.FACTORY_CD = tRet;
            let tFactoryCd = {};
            tFactoryCd.FACTORY_CD = ' ';
            tFactoryCd.FACTORY_NAME = ' ';
            tWRet.FACTORY_CD.unshift(tFactoryCd);

            var tSQL = '';
            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_NATION
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWRet.NAT_CD = tRet;
            let tNatCd = {};
            tNatCd.NAT_CD = ' ';
            tNatCd.NAT_NAME = ' ';
            tWRet.NAT_CD.unshift(tNatCd);

            var tSQL = '';
            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_USER
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWRet.PATT_USER = tRet;
            let tPattUser = {};
            tPattUser.USER_ID = ' ';
            tPattUser.USER_NAME = ' ';
            tWRet.PATT_USER.unshift(tPattUser);

            var tSQL = '';
            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_USER
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWRet.SEW_USER = tRet;
            tWRet.SEW_USER = tRet;
            let tSewUser = {};
            tSewUser.USER_ID = ' ';
            tSewUser.USER_NAME = ' ';
            tWRet.SEW_USER.unshift(tSewUser);

            let tCode = {};
            tCode.CD_CODE = ' ';
            tCode.CD_NAME = ' ';

            tSQL = '';
            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'BUYER_TEAM'
            `;
            tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWRet.BUYER_TEAM = tRet;
            tWRet.BUYER_TEAM.unshift(tCode);

            tSQL = '';
            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'CURR_CD'
            `;
            tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWRet.CURR_CD = tRet;
            tWRet.CURR_CD.unshift(tCode);

            tSQL = '';
            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'SAMPLE_STEP'
            `;
            tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWRet.SAMPLE_STEP = tRet;
            tWRet.SAMPLE_STEP.unshift(tCode);

            tSQL = '';
            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'SAMPLE_ROUND'
            `;
            tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWRet.SAMPLE_ROUND = tRet;
            tWRet.SAMPLE_ROUND.unshift(tCode);

            tSQL = '';
            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'SAMPLE_REASON'
            `;
            tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            tWRet.SAMPLE_REASON = tRet;
            tWRet.SAMPLE_REASON.unshift(tCode);

            return tWRet;
        },
    },
};

export default moduleQuery_S020401_ORDER_INFO_TBL_KSV_ORDER_MEM;
