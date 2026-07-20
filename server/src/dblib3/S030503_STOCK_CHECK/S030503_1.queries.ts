import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S030503_1 = {
    Query: {
        mgrQueryS030503_1: async (_, args, contextValue) => {
            var tSQL = '';
            var tUserInfo = AFLib.getUserInfo(contextValue);

            const poCd = String(args.data.PO_CD || '').replace(/'/g, "''");
            const poSeq = String(args.data.PO_SEQ || '').replace(/'/g, "''");
            const orderCdLike = String(args.data.ORDER_CD || '').replace(/'/g, "''");
            const matlCdLike = String(args.data.MATL_CD || '').replace(/'/g, "''");
            const regUser = String(tUserInfo.USER_ID || '').replace(/'/g, "''");

            let factoryCd = '';
            const factorySql = `
                select top 1
                    isnull(e.factory_cd, '') as FACTORY_CD
                from
                    ksv_po_mrp a,
                    ksv_order_mst e
                where
                    a.po_cd = '${poCd}'
                    and a.po_seq = '${poSeq}'
                    and a.order_cd = e.order_cd
            `;
            const factoryRet = await prisma.$queryRaw(Prisma.raw(factorySql));
            if (factoryRet.length > 0) {
                factoryCd = String(factoryRet[0].FACTORY_CD || '').replace(/'/g, "''");
            }

            const stockFactoryIn = `('${factoryCd}','FC040','FC034')`;

            const preSql1 = `
                update ksv_po_mrp
                set stock_chk = ''
                where po_cd = '${poCd}'
                and po_seq = '${poSeq}'
            `;

            const preSql2 = `
                delete from kcd_matl_cd_rep
                where reg_user='${regUser}'
            `;

            const preSql3 = `
                insert into kcd_matl_cd_rep
                select distinct a.matl_cd,b.rep_matl_cd,'${regUser}'
                from ksv_po_mrp a,kcd_matl_mst b
                where a.matl_cd=b.matl_cd
                and a.po_cd = '${poCd}'
                and a.po_seq = '${poSeq}'
            `;

            const preSql4 = `
                update ksv_po_mrp
                set stock_chk = '*'
                where po_cd = '${poCd}'
                and po_seq = '${poSeq}'
                and matl_cd in (
                    select matl_cd
                    from ksv_stock_matl
                    where factory_cd in ${stockFactoryIn}
                    and matl_cd = ksv_po_mrp.matl_cd
                    and stock_status in ('3','5','M','N','Y','W','F','R','P','C','G','U','I','H','A','FA','FG','FH','FI','FU','O')
                    and remain_qty > 0.999
                )
            `;

            const preSql5 = `
                update ksv_po_mrp
                set stock_chk = '*'
                where po_cd = '${poCd}'
                and po_seq = '${poSeq}'
                and matl_cd in (
                    select b.rep_matl_cd
                    from ksv_stock_matl a,kcd_matl_cd_rep b
                    where a.matl_cd=b.matl_cd
                    and a.factory_cd in ${stockFactoryIn}
                    and a.stock_status in ('3','5','M','R','Y','P','C','A','N','W','O')
                    and a.remain_qty > 0.999
                    and b.reg_user='${regUser}'
                )
            `;

            const preSql6 = `
                update ksv_po_mrp
                set sum_qty = (
                    select sum(b.po_qty)
                    from ksv_po_mrp b
                    where b.po_cd = ksv_po_mrp.po_cd
                    and b.order_cd = ksv_po_mrp.order_cd
                    and b.matl_cd = ksv_po_mrp.matl_cd
                    and b.use_po_type = '1'
                )
                where po_cd = '${poCd}'
                and po_seq = '${poSeq}'
                and use_po_type = '1'
            `;

            await prisma.$transaction([
                prisma.$executeRaw(Prisma.raw(preSql1)),
                prisma.$executeRaw(Prisma.raw(preSql2)),
                prisma.$executeRaw(Prisma.raw(preSql3)),
                prisma.$executeRaw(Prisma.raw(preSql4)),
                prisma.$executeRaw(Prisma.raw(preSql5)),
                prisma.$executeRaw(Prisma.raw(preSql6)),
            ]);

            let sqlStr = `
                 select 
                            a.PO_SEQ,
                            a.ORDER_CD,
                            a.MATL_CD,
                            c.MATL_NAME,
                            c.COLOR,
                            c.SPEC,
                            c.UNIT,
                            a.PO_MATL_CD,
                            b.cd_name as USE_PO_TYPE_N,
                            isnull(a.USE_QTY, 0) as USE_QTY,
                            isnull(a.PO_QTY, 0) as PO_QTY,
                            isnull(a.SUM_QTY, 0) as SUM_QTY,
                            d.VENDOR_NAME,
                            rtrim(isnull(a.STOCK_CHK, '')) as STOCK_CHK,
                            a.MRP_SEQ,
                            a.MATL_SEQ,
                            a.MATL_PRICE,
                            a.CURR_CD,
                            a.PO_MRP_SEQ,
                            a.REG_DATETIME,
                            a.STOCK_IDX,
                            c.VENDOR_CD,
                            c.MATL_TYPE2 as MATL_KIND2,
                            c.STATUS_CD,
                            e.FACTORY_CD,
                            isnull(a1.RACK, '') as RACK, 
                            isnull(a1.root_idx, '') as ROOT_IDX,
                            '' as NEW_FACTORY_CD
                 from
                            ksv_po_mrp a
                            left join ksv_stock_matl a1 on a1.stock_idx = a.stock_idx,
                            kcd_matl_mst c,
                            kcd_code b,
                            kcd_vendor d,
                            ksv_order_mst e
                 where
                            a.po_cd = '${poCd}'
                            and a.order_cd = e.order_cd
                            and a.po_seq = '${poSeq}'
                            and a.diff_po_type not in ('1', '2', '4')
                            and b.cd_group = 'USE_PO_TYPE'
                            and b.cd_code = a.use_po_type
                            and c.matl_cd = a.matl_cd
                            and d.vendor_cd = c.vendor_cd 
                            and a.order_cd like '%${orderCdLike}%'
                            and a.matl_cd like '%${matlCdLike}%'
                 order by
                            a.STOCK_CHK desc,
                            c.MATL_NAME,
                            a.MATL_CD
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetArray = [];
            tRet.forEach((col, i) => {
                var tObj = { ...col };
                if (tObj.USE_PO_TYPE_N === 'Using Stock') {
                    tObj.SUM_QTY = '0';
                }
                tRetArray.push(tObj);
            });
            console.log(sqlStr);

            return tRetArray;
        },

        mgrQueryS030503_1_260330: async (_, args) => {
            var tSQL = '';
            if (typeof args.data.ORDER_CD !== 'undefined') {
                if (args.data.ORDER_CD !== '')
                    tSQL += `AND a.ORDER_CD = '${args.data.ORDER_CD}' `;
            }
            if (typeof args.data.MATL_CD !== 'undefined') {
                if (args.data.MATL_CD !== '')
                    tSQL += `AND a.MATL_CD = '${args.data.MATL_CD}' `;
            }

            let sqlStr = `
                select
                    k.*,
                    isnull(e.RACK, '') as RACK,
                    e.ROOT_IDX
                from
                    (
                        select
                            a.ORDER_CD,
                            a.MATL_CD,
                            c.MATL_NAME,
                            c.COLOR,
                            c.SPEC,
                            c.UNIT,
                            a.PO_MATL_CD,
                            b.cd_name as USE_PO_TYPE_N,
                            isnull(a.USE_QTY, 0) as USE_QTY,
                            isnull(a.PO_QTY, 0) as PO_QTY,
                            isnull(a.PO_QTY, 0) as SUM_QTY,
                            d.VENDOR_NAME,
                            rtrim(isnull(a.STOCK_CHK, '')) as STOCK_CHK,
                            a.MRP_SEQ,
                            a.MATL_SEQ,
                            a.MATL_PRICE,
                            a.CURR_CD,
                            a.PO_MRP_SEQ,
                            a.REG_DATETIME,
                            a.STOCK_IDX,
                            c.VENDOR_CD,
                            c.MATL_TYPE2 as MATL_KIND2,
                            c.STATUS_CD,
                            e.FACTORY_CD
                        from
                            ksv_po_mrp a,
                            kcd_matl_mst c,
                            kcd_code b,
                            kcd_vendor d,
                            ksv_order_mst e
                        where
                            a.po_cd = '${args.data.PO_CD}'
                            and a.order_cd = e.order_cd
                            and a.po_seq = '${args.data.PO_SEQ}'
                            and a.diff_po_type not in ('1', '2', '4')
                            and b.cd_group = 'USE_PO_TYPE'
                            and b.cd_code = a.use_po_type
                            and c.matl_cd = a.matl_cd
                            and d.vendor_cd = c.vendor_cd ${tSQL}
                    ) k
                    left join ksv_stock_matl e on e.stock_idx = k.stock_idx
                    -- order by  k.order_cd, k.matl_cd  , k.reg_datetime
                order by
                    k.matl_name,
                    k.order_cd,
                    k.po_matl_cd asc
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {};
            var tRetArray = [];
            var tRetArray1 = [];
            var tRetArray2 = [];
            var tIdx = 0;
            var tBuyerCd = args.data.ORDER_CD.substring(0, 2);
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tObj = { ...tRet[tIdx] };
                // Autostock 조건
                // stock_status_2 : Y, S1, S2 
                // stock_status : 'B', 'Z' 가 아니고 
                // condition = ''  or condition = 'NORMAL'
                // buyer 가 동일, matl_cd 동일, factory_cd 동일 

                // * 조건: 재고조건
                let sql0 = `
                    select
                        *
                    from
                        ksv_stock_matl
                    where
                        (
                            STOCK_STATUS_2 in ('Y', 'S1', 'S2')
                            or (
                                STOCK_STATUS_2 = ''
                                and STOCK_STATUS in ('W')
                            )
                        )
                        -- and   stock_status not in ('B', 'Z')
                        -- and   left(order_cd, 2) = '${tBuyerCd}'
                        and (
                            condition = ''
                            or condition = 'NORMAL'
                        )
                        and matl_cd = '${tObj.MATL_CD}'
                        and factory_cd = '${tObj.FACTORY_CD}'
                        and remain_qty > 0
                `;

                var tRet0 = [];
                if (tObj.USE_PO_TYPE_N === 'Order') {
                    tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                }
                if (tObj.USE_PO_TYPE_N === 'Using Stock') {
                    tObj.SUM_QTY = '0';
                }
                console.log(`>>>>>> ${tObj.MATL_CD}/${tRet0.length} `);
                if (tRet0.length > 0) {
                    if (parseFloat(tObj.PO_QTY) > 0) {
                        tObj.STOCK_CHK = '*';
                    } else {
                        tObj.STOCK_CHK = '';
                    }
                } else {
                    tObj.STOCK_CHK = '';
                }

                // var tBalQty = parseFloat(tObj.USE_QTY) - parseFloat(tObj.PO_QTY);
                // tObj.SUM_QTY = String(tBalQty);

                if (tObj.STOCK_CHK === '*' && tObj.PO_MATL_CD === '')
                    tRetArray1.push(tObj);
                else tRetArray2.push(tObj);
            }

            tRetArray1.forEach((col, i) => {
                var tObj = { ...col };
                tRetArray.push(tObj);
            });

            tRetArray2.forEach((col, i) => {
                var tObj = { ...col };
                tRetArray.push(tObj);
            });

            console.log(sqlStr);

            return tRetArray;
        },


        mgrQueryS030503_1_bak: async (_, args) => {
            var tSQL = '';
            if (typeof args.data.ORDER_CD !== 'undefined') {
                if (args.data.ORDER_CD !== '')
                    tSQL += `AND a.ORDER_CD = '${args.data.ORDER_CD}' `;
            }
            if (typeof args.data.MATL_CD !== 'undefined') {
                if (args.data.MATL_CD !== '')
                    tSQL += `AND a.MATL_CD = '${args.data.MATL_CD}' `;
            }

            let sqlStr = `
                select
                    k.*,
                    isnull(e.RACK, '') as RACK,
                    e.ROOT_IDX
                from
                    (
                        select
                            a.ORDER_CD,
                            a.MATL_CD,
                            c.MATL_NAME,
                            c.COLOR,
                            c.SPEC,
                            c.UNIT,
                            a.PO_MATL_CD,
                            b.cd_name as USE_PO_TYPE_N,
                            isnull(a.USE_QTY, 0) as USE_QTY,
                            isnull(a.PO_QTY, 0) as PO_QTY,
                            isnull(a.SUM_QTY, 0) as SUM_QTY,
                            d.VENDOR_NAME,
                            rtrim(isnull(a.STOCK_CHK, '')) as STOCK_CHK,
                            a.MRP_SEQ,
                            a.MATL_SEQ,
                            a.MATL_PRICE,
                            a.CURR_CD,
                            a.PO_MRP_SEQ,
                            a.REG_DATETIME,
                            a.STOCK_IDX,
                            c.VENDOR_CD,
                            c.MATL_TYPE2 as MATL_KIND2,
                            c.STATUS_CD,
                            e.FACTORY_CD
                        from
                            ksv_po_mrp a,
                            kcd_matl_mst c,
                            kcd_code b,
                            kcd_vendor d,
                            ksv_order_mst e
                        where
                            a.po_cd = '${args.data.PO_CD}'
                            and a.order_cd = e.order_cd
                            and a.po_seq = '${args.data.PO_SEQ}'
                            and a.diff_po_type not in ('1', '2', '4')
                            and b.cd_group = 'USE_PO_TYPE'
                            and b.cd_code = a.use_po_type
                            and c.matl_cd = a.matl_cd
                            and d.vendor_cd = c.vendor_cd ${tSQL}
                    ) k
                    left join ksv_stock_matl e on e.stock_idx = k.stock_idx
                    -- order by  k.order_cd, k.matl_cd  , k.reg_datetime
                order by
                    k.matl_name,
                    k.order_cd,
                    k.po_matl_cd desc
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                ORDER_CD: '',
                MATL_CD: '',
                MATL_NAME: '',
                COLOR: '',
                SPEC: '',
                UNIT: '',
                PO_MATL_CD: '',
                USE_PO_TYPE_N: '',
                USE_QTY: 0,
                PO_QTY: 0,
                SUM_QTY: 0,
                VENDOR_NAME: '',
                STOCK_CHK: '',
                MRP_SEQ: 0,
                MATL_SEQ: 0,
                MATL_PRICE: 0,
                CURR_CD: '',
                PO_MRP_SEQ: 0,
                REG_DATETIME: '',
                STOCK_IDX: '',
                RACK: '',
                ROOT_IDX: '',
                ETC99: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tObj = { ...tRet[tIdx] };

                var tMatlName = tObj.MATL_NAME.trim().replace(/'/gi, "''");

                let sql0 = `
                    SELECT
                        A.PO_CD,
                        A.ORDER_CD,
                        A.MATL_CD,
                        C.MATL_NAME,
                        C.COLOR,
                        C.SPEC,
                        C.UNIT,
                        A.RACK,
                        A.LOCATION,
                        A.REMAIN_QTY,
                        E.VENDOR_NAME,
                        A.STOCK_STATUS,
                        F.FACTORY_NAME,
                        A.FACTORY_CD,
                        A.REMARK,
                        A.PLAN_REMARK,
                        A.REASON_REMARK,
                        A.PO_SEQ,
                        A.MRP_SEQ,
                        A.MATL_SEQ,
                        D.MATL_PRICE,
                        D.CURR_CD,
                        A.STOCK_IDX,
                        A.ORG_STOCK_IDX,
                        A.ROOT_IDX,
                        C.MATL_TYPE,
                        C.MATL_TYPE2,
                        isnull(c1.MATL_TYPE2, '') as MATL_TYPE2_N,
                        isnull(c2.CD_NAME, '') as MATL_TYPE_N,
                        isnull(A.AUTHORITY, '') as AUTHORITY,
                        '0' as USE_QTY
                    FROM
                        KSV_STOCK_MATL A,
                        KCD_MATL_MEM D,
                        KCD_VENDOR E,
                        KCD_FACTORY F,
                        KCD_MATL_MST C
                        left join kcd_matl_type2 c1 on c1.seq = C.MATL_TYPE2
                        left join kcd_code c2 on c2.cd_code = C.MATL_TYPE
                        and c2.cd_group = 'MATL_TYPE'
                    WHERE
                        A.REMAIN_QTY >= 1
                        AND A.CONDITION = ''
                        AND A.MATL_CD like '%${tObj.MATL_CD}%'
                        AND A.FACTORY_CD like '%${tObj.FACTORY_CD}%'
                        AND (
                            A.STOCK_STATUS_2 in ('S1', 'S2')
                            or (
                                A.STOCK_STATUS_2 = ''
                                and A.STOCK_STATUS in ('W')
                            )
                        )
                        AND C.MATL_CD = A.MATL_CD
                        AND C.MATL_NAME like '%${tMatlName}%'
                        AND D.MATL_CD = A.MATL_CD
                        AND D.MATL_SEQ = A.MATL_SEQ
                        AND E.VENDOR_CD = C.VENDOR_CD
                        AND F.FACTORY_CD = A.FACTORY_CD
                    ORDER BY
                        A.PO_CD,
                        A.ORDER_CD,
                        A.MATL_CD
                `;
                var tRet0 = [];
                if (tObj.USE_PO_TYPE_N === 'Order') {
                    tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                }
                if (tRet0.length > 0) {
                    tObj.STOCK_CHECK = '*';
                    // tObj.STOCK_IDX = tRet0[0].STOCK_IDX;
                    /*
							 if (parseFloat(tObj.PO_QTY) <= parseFloat(tRet0[0].REMAIN_QTY)) {
									 tObj.STOCK_CHECK = '*';
									 tObj.STOCK_IDX = tRet0[0].STOCK_IDX;
							 }
              */
                } else {
                    tObj.STOCK_CHECK = '';
                }
                tRetArray.push(tObj);
            }
            return tRetArray;
        },
    },
};

export default moduleQuery_S030503_1;
