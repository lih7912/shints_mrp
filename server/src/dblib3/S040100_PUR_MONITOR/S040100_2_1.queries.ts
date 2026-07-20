import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기

// export default로 Query 내용 내보내기
const moduleQuery_S040100_2_1 = {
    Query: {
        mgrQueryS040100_2_1: async (_, args) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tSQL = '';

            var tBuyerCd = args.data.BUYER_CD;

            var tSql0_bak = `
                select distinct
                    a.book_date,
                    a.user_id,
                    a.buyer_cd,
                    a.po_cd
                from
                    ksv_capabook_mem a,
                    (
                        select
                            user_id,
                            min(book_date) as book_date
                        from
                            ksv_capabook_mst
                        where
                            status_cd = '0'
                            and user_id in (
                                'kr',
                                'rnd',
                                'sales1',
                                'sales2',
                                'sales3',
                                'sales4'
                            )
                        group by
                            user_id
                    ) b
                where
                    a.user_id = b.user_id
                    and a.book_date = b.book_date
                    and job_cd in ('0', 'I', 'U')
                    and a.buyer_cd = '${tBuyerCd}'
                    and a.po_cd like '%${args.data.PO_CD}%'
                    and a.po_cd <> ''
                union
                select distinct
                    a.book_date,
                    a.user_id,
                    a.buyer_cd,
                    a.po_cd
                from
                    ksv_capabook_mem_ethiopia a,
                    (
                        select
                            user_id,
                            min(book_date) as book_date
                        from
                            ksv_capabook_mst_ethiopia
                        where
                            status_cd = '0'
                            and user_id in (
                                'kr',
                                'rnd',
                                'sales1',
                                'sales2',
                                'sales3',
                                'sales4'
                            )
                        group by
                            user_id
                    ) b
                where
                    a.user_id = b.user_id
                    and a.book_date = b.book_date
                    and job_cd in ('0', 'I', 'U')
                    and a.buyer_cd = '${tBuyerCd}'
                    and a.po_cd like '%${args.data.PO_CD}%'
                    and a.po_cd <> ''
                union
                select distinct
                    a.book_date,
                    a.user_id,
                    a.buyer_cd,
                    a.po_cd
                from
                    ksv_capasample_mem a,
                    (
                        select
                            user_id,
                            min(book_date) as book_date
                        from
                            ksv_capasample_mst
                        where
                            status_cd = '0'
                            and user_id in (
                                'kr',
                                'rnd',
                                'sales1',
                                'sales2',
                                'sales3',
                                'sales4'
                            )
                        group by
                            user_id
                    ) b
                where
                    a.user_id = b.user_id
                    and a.book_date = b.book_date
                    and job_cd in ('0', 'I', 'U')
                    and a.buyer_cd = '${tBuyerCd}'
                    and a.po_cd like '%${args.data.PO_CD}%'
                    and a.po_cd <> ''
                union
                select distinct
                    a.book_date,
                    a.user_id,
                    a.buyer_cd,
                    a.po_cd
                from
                    ksv_capasample_mem_ethiopia a,
                    (
                        select
                            user_id,
                            min(book_date) as book_date
                        from
                            ksv_capasample_mst_ethiopia
                        where
                            status_cd = '0'
                            and user_id in (
                                'kr',
                                'rnd',
                                'sales1',
                                'sales2',
                                'sales3',
                                'sales4'
                            )
                        group by
                            user_id
                    ) b
                where
                    a.user_id = b.user_id
                    and a.book_date = b.book_date
                    and job_cd in ('0', 'I', 'U')
                    and a.buyer_cd = '${tBuyerCd}'
                    and a.po_cd like '%${args.data.PO_CD}%'
                    and a.po_cd <> ''
            `;

            var sMrpDate = '';
            var eMrpDate = '';
            if (args.data.S_MRP_DATE !== '') {
                sMrpDate = args.data.S_MRP_DATE;
                eMrpDate = args.data.E_MRP_DATE;
                if (args.data.E_MRP_DATE === '')
                    eMrpDate = tRetDate.substring(0, 8);
                tSQL += `                and   left(a.reg_datetime, 8) between '${sMrpDate}' and '${eMrpDate}' `;
            } else {
                sMrpDate = tRetDate.substring(0, 4) + '0101';
                if (args.data.E_MRP_DATE === '')
                    eMrpDate = tRetDate.substring(0, 8);
                tSQL += `                and   left(a.reg_datetime, 8) between '${sMrpDate}' and '${eMrpDate}' `;
            }

            var sMatlEta = '';
            var eMatlEta = '';
            if (args.data.S_MATL_ETA !== '') {
                sMatlEta = args.data.S_MATL_ETA;
                eMatlEta = args.data.E_MATL_ETA;
                if (args.data.E_MATL_ETA === '')
                    eMatlEta = tRetDate.substring(0, 8);
                tSQL += `                and   left(d.matl_due_date, 8) between '${sMatlEta}' and '${eMatlEta}' `;
            }

            var tSQL1 = '';
            if (args.data.PO_CD !== '') {
                var tCols = args.data.PO_CD.split('/');
                if (tCols.length <= 1) {
                    tSQL1 = `                and   a.po_cd like '%${args.data.PO_CD}%' `;
                } else {
                    var tSql99 = '';
                    tCols.forEach((col, i) => {
                        if (i === 0) tSql99 = ` '${col}' `;
                        else tSql99 += ` ,'${col}' `;
                    });
                    tSQL1 = `                and   a.po_cd in (${tSql99}) `;
                }
                tSQL = '';
            }

            var tSql0 = `
                select distinct
                    a.po_cd
                from
                    ksv_po_mst a,
                    ksv_po_mem b,
                    ksv_po_worklist c -- ,ksv_order_mst d
                where
                    a.po_cd = b.po_cd
                    and a.po_cd = c.po_cd
                    and c.status_cd = '0'
                    and left(b.order_cd, 2) = '${tBuyerCd}' ${tSQL1} ${tSQL}
            `;
            var tRet0 = await prisma.$queryRaw(Prisma.raw(tSql0));
            // console.log("Select Count:" + tRet0[0].cnt1);
            //if (tRet0[0].cnt1 > 90000) process.exit();
            // console.log(tRet0);

            tSQL = '';
            if (args.data.PU_STATUS !== '') {
                if (args.data.PU_STATUS === 'Update') {
                    tSQL = `                   and c.pu_cd  <>  '' `;
                    if (args.data.PU_CD !== '') {
                        tSQL = `                   and c.pu_cd  =  '${args.data.PU_CD}' `;
                    }
                }
            }

            var tIdx = 0;
            var tArray = [];
            for (tIdx = 0; tIdx < tRet0.length; tIdx++) {
                var tOne = tRet0[tIdx];

                var tSql1 = `
                    select
                        b.vendor_cd,
                        b3.vendor_name,
                        b3.vendor_matl_type,
                        b3.vendor_type,
                        b3.pay_term,
                        b3.pay_type,
                        b3.overshort_rate,
                        a.po_cd,
                        isnull(c.pu_cd, '') as pu_cd,
                        sum(a.po_qty) as po_qty,
                        sum(a.po_qty * b1.matl_price * b2.usd_rate) as matl_amt
                    from
                        ksv_po_mrp a,
                        kcd_matl_mst b,
                        ksv_po_vendor c,
                        kcd_matl_mem b1,
                        kcd_currency b2,
                        kcd_vendor b3
                    where
                        a.po_cd = '${tOne.po_cd}'
                        -- and (a.pu_cd is null  or a.pu_cd = '')
                        and (
                            a.po_seq < 97
                            or a.po_seq > 100
                        )
                        and a.use_po_type = '1'
                        and a.diff_po_type in ('0', '2', '3', '4') ${tSQL}
                        -- and a.diff_po_type <> '1'
                        and a.po_cd = c.po_cd
                        and a.matl_cd = b.matl_cd
                        and b.vendor_cd = c.vendor_cd
                        and b.vendor_cd = b3.vendor_cd
                        and b3.vendor_name like '%${args.data.VENDOR_CD}%'
                        and b3.vendor_type like '%${args.data.VENDOR_TYPE}%'
                        and b.matl_cd = b1.matl_cd
                        and b1.matl_seq = 1
                        and b1.curr_cd = b2.curr_cd
                        and b2.start_date = '${tRetDate1}'
                    group by
                        b.vendor_cd,
                        b3.vendor_name,
                        b3.vendor_matl_type,
                        b3.vendor_type,
                        b3.pay_term,
                        b3.pay_type,
                        b3.overshort_rate,
                        a.po_cd,
                        isnull(c.pu_cd, '')
                    order by
                        b.vendor_cd
                `;
                var tRet1 = await prisma.$queryRaw(Prisma.raw(tSql1));
                // console.log(tRet1);

                var tIdx1 = 0;
                for (tIdx1 = 0; tIdx1 < tRet1.length; tIdx1++) {
                    var tOne1 = { ...tRet1[tIdx1] };

                    if (tOne1.pu_cd !== '') {
                        var tSql4 = `
                            select
                                pu_cd,
                                curr_cd,
                                pi_no,
                                order_date,
                                due_date,
                                ex_factory,
                                normi,
                                bill_to,
                                pay_date,
                                place_cd,
                                ship_to,
                                origin_port,
                                trade_term
                            from
                                ksv_pu_mst2
                            where
                                pu_cd = '${tOne1.pu_cd}'
                        `;
                        var tRet4 = await prisma.$queryRaw(Prisma.raw(tSql4));
                        tOne1.p_pu_cd = tRet4[0].pu_cd;
                        tOne1.p_curr_cd = tRet4[0].curr_cd;
                        tOne1.p_pi_no = tRet4[0].pi_no;
                        tOne1.p_order_date = tRet4[0].order_date;
                        tOne1.p_due_date = tRet4[0].due_date;
                        tOne1.p_ex_factory = tRet4[0].ex_factory;
                        tOne1.p_normi = tRet4[0].normi;
                        tOne1.p_bill_to = tRet4[0].bill_to;
                        tOne1.p_pay_date = tRet4[0].pay_date;
                        tOne1.p_place_cd = tRet4[0].place_cd;
                        tOne1.p_ship_to = tRet4[0].ship_to;
                        tOne1.origin_port = tRet4[0].origin_port;
                        tOne1.trade_term = tRet4[0].trade_term;

                        var tSql6 = `
                            select
                                po_qty
                            from
                                ksv_pu_mem2
                            where
                                pu_cd = '${tOne1.pu_cd}'
                                and vendor_cd = '${tOne1.vendor_cd}'
                                and po_cd = '${tOne.po_cd}'
                                and pu_seq = (
                                    select
                                        max(pu_seq)
                                    from
                                        ksv_pu_mem2
                                    where
                                        pu_cd = '${tOne1.pu_cd}'
                                        and po_cd = '${tOne.po_cd}'
                                )
                        `;
                        var tRet6 = await prisma.$queryRaw(Prisma.raw(tSql6));
                        tOne1.old_po_qty = 0;
                        if (tRet6.length > 0)
                            tOne1.old_po_qty = tRet6[0].po_qty;
                    } else {
                        tOne1.old_po_qty = 0;
                        tOne1.p_pu_cd = '';
                        tOne1.p_curr_cd = '';
                        tOne1.p_pi_no = '';
                        tOne1.p_order_date = '';
                        tOne1.p_due_date = '';
                        tOne1.p_ex_factory = '';
                        tOne1.p_normi = '';
                        tOne1.p_bill_to = '';
                        tOne1.p_pay_date = '';
                        tOne1.p_place_cd = '';
                        tOne1.p_ship_to = '';
                        tOne1.origin_port = '';
                        tOne1.trade_term = '';
                    }

                    var tSql3 = `
                        select
                            d.buyer_cd,
                            d.buyer_name,
                            left(a.reg_datetime, 8) as mrp_date,
                            a.plan_flag,
                            a.plan_etd,
                            a.plan_eta,
                            a.factory_cd,
                            e.factory_name,
                            max(c.due_date) as prod_due_date,
                            min(isnull(c.matl_due_date, '')) as matl_due_date
                        from
                            ksv_po_mst a,
                            ksv_po_mem b,
                            ksv_order_mst c,
                            kcd_buyer d,
                            kcd_factory e
                        where
                            a.po_cd = '${tOne.po_cd}'
                            and a.po_seq = 1
                            and a.po_cd = b.po_cd
                            and b.po_seq = 1
                            and b.order_cd = c.order_cd
                            and left(c.order_cd, 2) = d.buyer_cd
                            and a.factory_cd = e.factory_cd
                        group by
                            d.buyer_cd,
                            d.buyer_name,
                            left(a.reg_datetime, 8),
                            a.plan_flag,
                            a.plan_etd,
                            a.plan_eta,
                            a.factory_cd,
                            e.factory_name
                    `;
                    var tRet3 = await prisma.$queryRaw(Prisma.raw(tSql3));
                    if (tRet3.length > 0) {
                        tOne1.buyer_cd = tRet3[0].buyer_cd;
                        tOne1.buyer_name = tRet3[0].buyer_name;
                        tOne1.mrp_date = tRet3[0].mrp_date;
                        tOne1.plan_flag = tRet3[0].plan_flag;
                        tOne1.plan_etd = tRet3[0].plan_etd;
                        tOne1.factory_cd = tRet3[0].factory_cd;
                        tOne1.factory_name = tRet3[0].factory_name;
                        tOne1.prod_due_date = tRet3[0].prod_due_date;
                        tOne1.matl_due_date = tRet3[0].matl_due_date;
                    }

                    var tSql2 = `
                        select
                            b1.vendor_cd,
                            sum(a1.use_qty) as po_qty
                        from
                            ksv_stock_use a1,
                            kcd_matl_mst b1,
                            ksv_po_vendor c1
                        where
                            a1.use_po_cd = '${tOne.po_cd}'
                            and (
                                a1.use_po_seq < 97
                                or a1.use_po_seq > 100
                            )
                            and a1.use_po_cd = c1.po_cd
                            and a1.use_matl_cd = b1.matl_cd
                            and b1.vendor_cd = c1.vendor_cd
                            and b1.vendor_cd = '${tOne1.vendor_cd}'
                        group by
                            b1.vendor_cd
                    `;
                    var tRet2 = await prisma.$queryRaw(Prisma.raw(tSql2));

                    if (tRet2.length > 0) {
                        tOne1.stock_qty = tRet2[0].po_qty;
                        tOne1.mrp_qty = tOne1.stock_qty + tOne1.po_qty;
                    } else {
                        tOne1.stock_qty = 0;
                        tOne1.mrp_qty = tOne1.stock_qty + tOne1.po_qty;
                    }
                    if (
                        parseFloat(tOne1.po_qty) ===
                        parseFloat(tOne1.old_po_qty)
                    );
                    else tArray.push(tOne1);
                }
            }

            var tArray1 = [];
            tArray.forEach((col, i) => {
                var tObj = {};

                var tCols = Object.keys(col);

                tCols.forEach((col1, i1) => {
                    var tKey = col1;
                    var tKey1 = col1.toUpperCase();
                    tObj[`${tKey1}`] = col[`${tKey}`];
                });

                tArray1.push(tObj);
            });

            return tArray1;
        },
    },
};

export default moduleQuery_S040100_2_1;
