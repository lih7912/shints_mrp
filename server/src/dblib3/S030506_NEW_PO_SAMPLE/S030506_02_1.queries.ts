import { Prisma } from '@prisma/client';
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S030506_02_1 = {
    Query: {
        mgrQueryS030506_02_1: async (_, args) => {
            var tSQL = '';
            if (args.data.MATL_CD) {
                tSQL += `AND A.MATL_CD  like '%${args.data.MATL_CD}%' `;
            }
            /*
       if (args.data.MATL_NAME) {
           tSQL += `AND A.MATL_NAME  like '%${args.data.MATL_NAME}%' `;
       }
       */
            if (args.data.MATL_NAME) {
                var tSQL2 = '';
                var tCols = args.data.MATL_NAME.split(' ');
                tCols.forEach((col1, i1) => {
                    if (col1) {
                        if (tSQL2 === '')
                            tSQL2 = ` B.MATL_NAME like '%${col1}%' `;
                        else tSQL2 += ` AND B.MATL_NAME like '%${col1}%' `;
                    }
                });
                tSQL2 = ` AND (${tSQL2})  `;
                tSQL += tSQL2;
            }
            if (args.data.COLOR) {
                tSQL += `AND B.COLOR  like '%${args.data.COLOR}%' `;
            }
            if (args.data.SPEC) {
                tSQL += `AND B.SPEC  like '%${args.data.SPEC}%' `;
            }

            if (args.data.VENDOR_NAME) {
                tSQL += `AND (C.VENDOR_NAME  like '%${args.data.VENDOR_NAME}%')  `;
            }
            /*
       if (args.data.VENDOR_NAME) {
           tSQL += `AND (C.VENDOR_CD  like '%${args.data.VENDOR_CD}%' OR `;
           tSQL += `     C.VENDOR_NAME  like '%${args.data.VENDOR_CD}%' ) `;
       }
       */

            let sqlStr = `
                SELECT
                    A.MATL_CD, -- matl-cd
                    B.MATL_NAME, -- matl_name
                    B.COLOR, -- color
                    B.SPEC, -- spec
                    D.MATL_PRICE, -- matl_price
                    D.CURR_CD, -- curr_cd
                    B.UNIT, -- unit
                    A.REMAIN_QTY AS STOCK_QTY,
                    0 AS PO_QTY,
                    '재고사용' AS PO_TYPE_NAME,
                    0 AS REASON_TYPE,
                    0 AS FARE_TYPE,
                    '' AS REMARK,
                    C.VENDOR_NAME,
                    A.STOCK_STATUS AS STOCK_STATUS,
                    '2' AS USE_PO_TYPE,
                    A.PO_CD as USE_PO_CD,
                    A.PO_SEQ as USE_PO_SEQ,
                    A.ORDER_CD as USE_ORDER_CD,
                    A.MRP_SEQ as USE_MRP_SEQ,
                    A.MATL_SEQ as USE_MATL_SEQ,
                    A.MATL_SEQ as MATL_SEQ,
                    A.FACTORY_CD,
                    E.FACTORY_NAME,
                    A.STOCK_IDX,
                    A.REMARK as REMARK2,
                    A.PLAN_REMARK as PLAN_REMARK,
                    B.VENDOR_CD,
                    '' as ORDER_CD,
                    A.RACK
                FROM
                    KSV_STOCK_MATL A,
                    KCD_MATL_MST B,
                    KCD_VENDOR C,
                    KCD_MATL_MEM D,
                    KCD_FACTORY E
                WHERE
                    A.STOCK_STATUS IN (
                        '3',
                        '5',
                        'M',
                        'Y',
                        'F',
                        'R',
                        'P',
                        'C',
                        'G',
                        'U',
                        'I',
                        'H',
                        'A',
                        'W',
                        'N'
                    )
                    AND A.FACTORY_CD = '${args.data.FACTORY_CD}'
                    AND A.REMAIN_QTY >= 1
                    AND B.MATL_CD = A.MATL_CD
                    AND C.VENDOR_CD = B.VENDOR_CD
                    AND D.MATL_CD = A.MATL_CD
                    AND D.MATL_SEQ = A.MATL_SEQ
                    AND A.FACTORY_CD = E.FACTORY_CD ${tSQL}
                ORDER BY
                    A.MATL_CD
                    -- OFFSET 0 ROWS FETCH NEXT 1000 ROWS ONLY
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                MATL_CD: '',
                MATL_NAME: '',
                COLOR: '',
                SPEC: '',
                MATL_PRICE: 0,
                CURR_CD: '',
                UNIT: '',
                STOCK_QTY: 0,
                PO_QTY: 0,
                IS_STOCK: '',
                COL2: 0,
                COL3: 0,
                COL4: '',
                VENDOR_NAME: '',
                STOCK_STATUS: '',
                COL6: '',
                PO_CD: '',
                PO_SEQ: 0,
                ORDER_CD: '',
                MRP_SEQ: 0,
                MATL_SEQ: 0,
                FACTORY_CD: '',
                STOCK_IDX: '',
                REMARK: '',
                PLAN_REMARK: '',
                ETC99: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },

        mgrQueryS030506_02_2: async (_, args, contextValue) => {
            var tSQL = '';
            var tSQL1 = '';
            var tSQL2 = '';
            var tSQL2_1 = '';

            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = await AFLib.getUserInfo(contextValue);

            let sqlStr = `
                select
                    a.*,
                    f.PO_SEQ AS PO_SEQ_1,
                    a0.BUYER_CD,
                    b.cd_name as PO_TYPE_NAME,
                    c.cd_name as PO_STATUS_NAME,
                    d.FACTORY_NAME,
                    a0.BUYER_NAME,
                    a0.MATL_DUE_DATE,
                    a0.DUE_DATE,
                    '' as P_STATUS_CD
                from
                    ksv_po_mst a
                    left join ksv_po_mst f on f.po_cd = a.po_cd
                    and f.po_seq = (
                        select
                            max(po_seq)
                        from
                            ksv_po_mst
                        where
                            po_cd = a.po_cd
                            and po_seq < 97
                    )
                    left join kcd_code b on b.cd_code = a.po_type
                    and b.cd_group = 'PO_TYPE'
                    left join kcd_code c on c.cd_code = a.po_status
                    and c.cd_group = 'PO_STATUS'
                    left join kcd_factory d on d.factory_cd = a.factory_cd,
                    (
                        select
                            top 200 a1.po_cd,
                            left(a2.order_cd, 2) as buyer_cd,
                            a3.buyer_name,
                            min(a4.matl_due_date) as matl_due_date,
                            max(a4.due_date) as due_date,
                            count(*) as order_cnt
                        from
                            ksv_po_mst a1,
                            ksv_po_mem a2,
                            kcd_buyer a3,
                            ksv_order_mst a4,
                            kcd_style a5
                        where
                            a1.po_seq = 1
                            and a1.po_cd like '%${args.data.PO_CD}%'
                            and a1.po_type in ('S', 'T', 'F')
                            and a1.po_cd = a2.po_cd
                            and left(a2.order_cd, 2) = a3.buyer_cd
                            and a4.order_cd = a2.order_cd
                            and a4.style_cd = a5.style_cd
                        group by
                            a1.po_cd,
                            left(a2.order_cd, 2),
                            a3.buyer_name
                    ) a0
                where
                    a.po_cd = a0.po_cd
                order by
                    a.po_cd
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            var tRetData = {
                PO_STATUS_NAME: '',
                PO_STATUS: '',
                PO_SEQ: '',
                BUYER_NAME: '',
                BUYER_CD: '',
                PO_TYPE_NAME: '',
                PO_TYPE: '',
                PO_CD: '',
                TARGET_ETA: '',
                REG_DATETIME: '',
                REG_USER: '',
                UPD_DATETIME: '',
                UPD_USER: '',
                MRP_PACK_FLAG: '',
                BUYER_NAME: '',
                BUYER_CD: '',
                DOMESTIC_FLAG: '',
                IMPORT_FLAG: '',
                FACTORY_FLAG: '',
            };
            var tRetArray = [];

            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tObj = { ...tRet[tIdx] };

                let sqlStr0 = `
                    select
                        *
                    from
                        ksv_po_mst
                    where
                        po_cd = '${tObj.PO_CD}'
                        and po_seq = '1'
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr0));
                tObj.UPD_DATETIME = tObj.REG_DATETIME;
                tObj.UPD_USER = tObj.REG_USER;

                if (tRet0.length > 0) {
                    tObj.REG_DATETIME = tRet0[0].REG_DATETIME;
                    tObj.REG_USER = tRet0[0].REG_USER;
                }
                tObj.TARGET_ETA = tObj.MATL_DUE_DATE;
                if (!tObj.PURCHASE_REQUEST) tObj.PURCHASE_REQUEST = '';
                tRetArray.push(tObj);
            }

            console.log(sqlStr);

            return tRetArray;
        },
    },
};

export default moduleQuery_S030506_02_1;
