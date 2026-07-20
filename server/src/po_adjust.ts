import * as fs from 'fs';
import { Prisma } from '@prisma/client';
import prisma from './db'; 

const module_ADJUST_LOSS = {
    CommonFunc: {
        GetStockIdx: async () => {
            let sql0 = `
                update ksv_stock_idx
                set
                    idx = idx + 1
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sql0));

            let sql1 = `
                select
                    fac,
                    idx
                from
                    ksv_stock_idx
            `;
            var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));

            var tFac = tRet1[0].fac;
            var tIdx = tRet1[0].idx;

            var tRetStr = '';
            var tZero = '000000000';
            tRetStr =
                tFac +
                tZero.substring(0, 9 - String(tIdx).length) +
                String(tIdx);
            console.log('NewStockIdx=' + tRetStr);

            return tRetStr;
        },
        CheckMrpWork: async (argUserId, argPoCd) => {
            let sql0 = `
                select
                    *
                from
                    kcd_jobmonitor
                where kind like 'S0305%'
                and user_id = '${argUserId}'
                and status_cd = '0'
                and (status_cd is not null and  status_cd <> '') 
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sql0));
            var tRetValue = 0; // tRet.length
            if (tRet.length > 0) {
                /*
                var sql_update1 = `
                    update ksv_po_mst
                    set
                        work_status = ''
                    where po_cd = '${argPoCd}'
                `;
                var sql_update1 = await prisma.$queryRaw(Prisma.raw(sql_update1));

                var sql_update2 = `
                    update kcd_jobmonitor  
                    set
                        status_cd = ''
                    where kind like 'S0305%'
                    and user_id = '${argUserId}'
                    and (status_cd is not null and  status_cd <> '') 
                `;
                var sql_update2 = await prisma.$queryRaw(Prisma.raw(sql_update2));
                */
                tRetValue = tRet.length;
            }
            return tRetValue; 
        },
        CheckMrpWorkEnd: async (argUserId, argPoCd) => {
            let sql0 = `
                select
                    *
                from
                    kcd_jobmonitor
                where
                    kind like 'S0305%'
                    and user_id = '${argUserId}'
                    and status_cd = '1'
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sql0));

            var tWorkStatus = '';
            if (tRet.length > 0) {
                let sql1 = `
                    select
                        isnull(work_status, '') as work_status
                    from
                        ksv_po_mst
                    where
                        po_cd = '${tRet[0].PO_CD}'
                `;
                var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                tRet1.forEach((col, i) => {
                    tWorkStatus = tRet1[0].work_status;
                });
            }

            var tRetW = 0;
            if (tRet.length <= 0) {
                tRetW = 0;
                console.log('step-1');
            } else {
                if (tRet.length > 0 && tWorkStatus === '') {
                    console.log('step-2');
                    tRetW = 0;
                    let sql2 = `
                        delete from kcd_jobmonitor
                        where
                            kind like 'S0305%'
                            and user_id = '${argUserId}'
                            and status_cd = '1'
                    `;
                    var tRet2 = await prisma.$queryRaw(Prisma.raw(sql2));
                } else {
                    if (argPoCd === tRet[0].PO_CD)
                        tRetW = 1; 
                    else tRetW = -1;
                    console.log('step-3:' + tRetW);
                }
            }

            return tRetW;
        },
        CheckMrpWorkStatus: async (argUserId, argPoCd) => {
            let sql0 = `
                select
                    isnull(work_status, 'ERROR:NO Work') as work_status
                from
                    ksv_po_mst
                where
                    po_cd = '${argPoCd}'
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sql0));
            return tRet[0].work_status;
        },
        UpdateMrpWork: async (argUserId, argPoCd, argStatus) => {
            var sql_update = `
                update kcd_jobmonitor
                set
                    status_cd = '1'
                    -- where kind =  'S030510_MRP_MAKE_${argPoCd}'
                where
                    status_cd = '0'
                    and user_id = '${argUserId}'
            `;
            var sql_update = await prisma.$queryRaw(Prisma.raw(sql_update));

            var sql_update1 = `
                update ksv_po_mst
                set
                    work_status = '${argStatus}'
                where
                    po_cd = '${argPoCd}'
            `;
            var sql_update1 = await prisma.$queryRaw(Prisma.raw(sql_update1));
            return 0;
        },
        InsertMrpWork: async (argUserId, argPoCd, argStatus, argKind) => {
            var sql_update = `
                insert into
                    kcd_jobmonitor (kind, po_cd, user_id, reg_datetime, status_cd)
                values
                    ('${argKind}', '${argPoCd}', '${argUserId}', '', '0')
            `;

            var sql_update = await prisma.$queryRaw(Prisma.raw(sql_update));

            var sql_update1 = `
                update ksv_po_mst
                set
                    work_status = '${argStatus}'
                where
                    po_cd = '${argPoCd}'
            `;
            var sql_update1 = await prisma.$queryRaw(Prisma.raw(sql_update1));
            return 0;
        },
        DeleteMrpWork: async (argUserId, argPoCd) => {
            var sql_update = `
                delete from kcd_jobmonitor
                where
                    user_id = '${argUserId}'
            `;
            var sql_update = await prisma.$queryRaw(Prisma.raw(sql_update));

            var sql_update1 = `
                update ksv_po_mst
                set
                    work_status = ''
                where
                    po_cd = '${argPoCd}'
            `;
            var sql_update1 = await prisma.$queryRaw(Prisma.raw(sql_update1));
            return 0;
        },
        ResetOrderMrpSeqMax: async (argPoCd, argUserId, argOrderCd = '') => {
            let sqlOrders = `
                select
                    order_cd
                from
                    ksv_po_mem
                where
                    po_cd = '${argPoCd}'
                    and po_seq = '1'
            `;
            var tRetOrders = await prisma.$queryRaw(Prisma.raw(sqlOrders));

            var tIdxOrder = 0;
            for (tIdxOrder = 0; tIdxOrder < tRetOrders.length; tIdxOrder++) {
                var strOrderCd = String(tRetOrders[tIdxOrder].order_cd || '').replace(
                    /'/g,
                    "''",
                );
                if (strOrderCd === '') continue;

                let sqlDel = `
                    delete ksv_order_mrp_seqmax
                    where
                        user_id = '${argUserId}'
                        and order_cd = '${strOrderCd}'
                `;
                let sqlIns = `
                    insert into ksv_order_mrp_seqmax
                    select
                        '${argUserId}',
                        order_cd,
                        prod_cd,
                        max(order_mrp_seq)
                    from
                        ksv_order_mrp
                    where
                        order_cd = '${strOrderCd}'
                    group by
                        order_cd,
                        prod_cd
                    order by
                        order_cd
                `;
                await prisma.$transaction([
                    prisma.$queryRaw(Prisma.raw(sqlDel)),
                    prisma.$queryRaw(Prisma.raw(sqlIns)),
                ]);
            }

            return 0;
        },
    },
    AdjustLoss: {
        AdjustLossMainMatl: async (
            orderCd: string,
            orderMrpSeq: string,
            userId: string,
        ) => {
            let sql0 = `
                select distinct
                    a.matl_cd,
                    isnull(b.add_loss, 0) as add_loss,
                    a.remark
                from
                    ksv_order_mrp a,
                    kcd_matl_mst b,
                    ksv_order_mrp_seqmax c
                where
                    a.order_cd = '${orderCd}'
                    and b.matl_cd = a.matl_cd
                    and b.matl_type in ('M', 'Q')
                    and c.user_id = '${userId}'
                    and c.order_cd = a.order_cd
                    and c.prod_cd = a.prod_cd
                    and c.order_mrp_seq = a.order_mrp_seq
                    and b.vendor_cd not in ('v0313', 'v1874', 'v3357')
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sql0));
            console.log(`ADJUST_LOSS(MainMatl-Step1)=> ${tRet.length} `);

            let sqlProdAll = `
                select
                    a.matl_cd,
                    max(a.order_mrp_seq) as order_mrp_seq,
                    a.prod_cd,
                    isnull(max(c.size_loss), 0) as size_loss
                from
                    ksv_order_mrp a
                    left outer join ksv_order_mem c on c.order_cd = a.order_cd
                    and c.prod_cd = a.prod_cd
                where
                    a.order_cd = '${orderCd}'
                group by
                    a.matl_cd,
                    a.prod_cd
            `;
            var tRetProdAll = await prisma.$queryRaw(Prisma.raw(sqlProdAll));
            var prodRowsByMatlCd = {};
            var tIdxProdAll = 0;
            for (
                tIdxProdAll = 0;
                tIdxProdAll < tRetProdAll.length;
                tIdxProdAll++
            ) {
                var tProdRow = tRetProdAll[tIdxProdAll];
                if (!prodRowsByMatlCd[tProdRow.matl_cd])
                    prodRowsByMatlCd[tProdRow.matl_cd] = [];
                prodRowsByMatlCd[tProdRow.matl_cd].push(tProdRow);
            }

            let sqlTotCntAll = `
                select
                    a.matl_cd,
                    a.remark,
                    sum(b.tot_cnt) as t_cnt
                from
                    (
                        select distinct
                            a.matl_cd,
                            a.remark,
                            a.prod_cd
                        from
                            ksv_order_mrp a,
                            ksv_order_mrp_seqmax c
                        where
                            a.order_cd = '${orderCd}'
                            and c.user_id = '${userId}'
                            and c.order_cd = a.order_cd
                            and c.prod_cd = a.prod_cd
                            and c.order_mrp_seq = a.order_mrp_seq
                    ) a,
                    ksv_order_mem b
                where
                    b.order_cd = '${orderCd}'
                    and b.prod_cd = a.prod_cd
                group by
                    a.matl_cd,
                    a.remark
            `;
            var tRetTotCntAll = await prisma.$queryRaw(Prisma.raw(sqlTotCntAll));
            var totCntByMatlRemark = {};
            var tIdxTotAll = 0;
            for (
                tIdxTotAll = 0;
                tIdxTotAll < tRetTotCntAll.length;
                tIdxTotAll++
            ) {
                var tTotRow = tRetTotCntAll[tIdxTotAll];
                var tTotRemark = tTotRow.remark || '';
                var tTotKey = `${tTotRow.matl_cd}@@${tTotRemark}`;
                totCntByMatlRemark[tTotKey] = tTotRow.t_cnt || 0;
            }

            var tTotCnt = 0;
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tMatlCd = tRet[tIdx].matl_cd;
                var addLoss = tRet[tIdx].add_loss;
                var tRemark = tRet[tIdx].remark || '';

                var tTotCnt = 0;
                var tTotKey = `${tMatlCd}@@${tRemark}`;
                tTotCnt = parseFloat(String(totCntByMatlRemark[tTotKey] || 0));

                var strLoss = 0.0;
                if (tTotCnt >= 10000) strLoss = 0.3;
                else if (tTotCnt >= 9000) strLoss = 0.4;
                else if (tTotCnt >= 8000) strLoss = 0.5;
                else if (tTotCnt >= 7000) strLoss = 0.55;
                else if (tTotCnt >= 6000) strLoss = 0.6;
                else if (tTotCnt >= 5000) strLoss = 0.7;
                else if (tTotCnt >= 4000) strLoss = 0.75;
                else if (tTotCnt >= 3000) strLoss = 0.8;
                else if (tTotCnt >= 2000) strLoss = 0.85;
                else if (tTotCnt >= 1000) strLoss = 0.9;
                else if (tTotCnt >= 900) strLoss = 0.9;
                else if (tTotCnt >= 800) strLoss = 1.0;
                else if (tTotCnt >= 700) strLoss = 1.1;
                else if (tTotCnt >= 600) strLoss = 1.12;
                else if (tTotCnt >= 500) strLoss = 1.25;
                else if (tTotCnt >= 400) strLoss = 1.3;
                else if (tTotCnt >= 300) strLoss = 1.5;
                else if (tTotCnt >= 200) strLoss = 1.7;
                else if (tTotCnt >= 100) strLoss = 2.0;
                else strLoss = 2.0;

                var tRet2 = prodRowsByMatlCd[tMatlCd] || [];
                if (tRet2.length <= 0) continue;

                var tValueRows = [];
                var tIdx1 = 0;
                for (tIdx1 = 0; tIdx1 < tRet2.length; tIdx1++) {
                    var tOrderMrpSeq = tRet2[tIdx1].order_mrp_seq;
                    var tProdCd = tRet2[tIdx1].prod_cd;
                    var sizeLoss = parseFloat(
                        String(tRet2[tIdx1].size_loss || 0),
                    );

                    console.log(
                        `===> AdjustLossMainMatl :${orderCd}, ${tProdCd}, ${tOrderMrpSeq} , ${tMatlCd}, ${userId}: OrderCnt:${tTotCnt} , Loss: ${strLoss}, sizeloss: ${sizeLoss}, addLoss:${addLoss}  `,
                    );

                    tValueRows.push(
                        `'${tProdCd}', '${tOrderMrpSeq}', ${sizeLoss}`,
                    );
                }

                var tDerivedRowsSql = `select ${tValueRows.join(
                    ' union all select ',
                )}`;

                let sql4 = `
                    update a
                    set
                        std_loss = ${strLoss} + ${addLoss} + b.size_loss,
                        std_gross = a.std_net + a.std_net * (${strLoss} + ${addLoss}) / 100.0 + a.std_net * b.size_loss / 100.0,
                        loss = ${strLoss} + ${addLoss} + b.size_loss,
                        gross = a.net + a.net * (${strLoss} + ${addLoss}) / 100.0 + a.net * b.size_loss / 100.0
                    from
                        ksv_order_mrp a,
                        (${tDerivedRowsSql}) b(prod_cd, order_mrp_seq, size_loss)
                    where
                        a.order_cd = '${orderCd}'
                        and a.matl_cd = '${tMatlCd}'
                        and a.prod_cd = b.prod_cd
                        and a.order_mrp_seq = b.order_mrp_seq
                `;
                var tRet4 = await prisma.$queryRaw(Prisma.raw(sql4));
            }
        },
        AdjustLossMainMatlGore: async (
            orderCd: string,
            orderMrpSeq: string,
            userId: string,
        ) => {
            let sql9 = `
                select distinct
                    a.prod_cd,
                    isnull(c.size_loss, 0) as size_loss,
                    a.order_mrp_seq
                from
                    ksv_order_mrp a,
                    ksv_prod_mst b,
                    ksv_order_mem c
                where
                    a.order_cd = '${orderCd}'
                    and a.prod_cd = b.prod_cd
                    and c.prod_cd = a.prod_cd
                    and c.order_cd = a.order_cd
                    and a.order_mrp_seq = (
                        select
                            max(order_mrp_seq)
                        from
                            ksv_order_mrp
                        where
                            order_cd = '${orderCd}'
                            and a.prod_cd = prod_cd
                    )
            `;
            var tRet9 = await prisma.$queryRaw(Prisma.raw(sql9));
            console.log(`ADJUST_LOSS(MainMatlGore-Step1)=> ${tRet9.length} `);
            var tIdx9 = 0;
            var sizeLoss = 0.0;
            for (tIdx9 = 0; tIdx9 < tRet9.length; tIdx9++) {
                var tProdCd = tRet9[tIdx9].prod_cd;
                sizeLoss = tRet9[tIdx9].size_loss;
                var tOrderMrpSeq = tRet9[tIdx9].order_mrp_seq;

                let sql0 = `
                    select distinct
                        a.matl_cd,
                        isnull(b.add_loss, 0) as add_loss
                    from
                        ksv_order_mrp a,
                        kcd_matl_mst b
                    where
                        a.order_cd = '${orderCd}'
                        and a.prod_cd = '${tProdCd}'
                        and a.order_mrp_seq = '${tOrderMrpSeq}'
                        and b.matl_cd = a.matl_cd
                        and b.matl_type in ('M', 'Q')
                        and b.vendor_cd in ('v0328')
                `;
                var tRet = await prisma.$queryRaw(Prisma.raw(sql0));

                var tTotCnt = 0;
                var tIdx = 0;
                for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                    var tMatlCd = tRet[tIdx].matl_cd;
                    var addLoss = tRet[tIdx].add_loss;

                    var tTotCnt = 0;

                    let sql1 = `
                        select
                            sum(tot_cnt) as t_cnt
                        from
                            ksv_order_mem
                        where
                            order_cd = '${orderCd}'
                            and prod_cd in (
                                select
                                    prod_cd
                                from
                                    ksv_order_mrp
                                where
                                    order_cd = '${orderCd}'
                                    and prod_cd = '${tProdCd}'
                                    and order_mrp_seq = '${tOrderMrpSeq}'
                                    and matl_cd = '${tMatlCd}'
                            )
                    `;
                    var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                    tRet1.forEach((col, i) => {
                        tTotCnt += col.t_cnt;
                    });

                    var strLoss = 0.0;
                    if (tTotCnt >= 10000) strLoss = 0.36;
                    else if (tTotCnt >= 9000) strLoss = 0.48;
                    else if (tTotCnt >= 8000) strLoss = 0.6;
                    else if (tTotCnt >= 7000) strLoss = 0.66;
                    else if (tTotCnt >= 6000) strLoss = 0.72;
                    else if (tTotCnt >= 5000) strLoss = 0.84;
                    else if (tTotCnt >= 4000) strLoss = 0.9;
                    else if (tTotCnt >= 3000) strLoss = 0.96;
                    else if (tTotCnt >= 2000) strLoss = 1.02;
                    else if (tTotCnt >= 1000) strLoss = 1.08;
                    else if (tTotCnt >= 900) strLoss = 1.08;
                    else if (tTotCnt >= 800) strLoss = 1.2;
                    else if (tTotCnt >= 700) strLoss = 1.32;
                    else if (tTotCnt >= 600) strLoss = 1.34;
                    else if (tTotCnt >= 500) strLoss = 1.5;
                    else if (tTotCnt >= 400) strLoss = 1.56;
                    else if (tTotCnt >= 300) strLoss = 1.8;
                    else if (tTotCnt >= 200) strLoss = 2.04;
                    else if (tTotCnt >= 100) strLoss = 2.4;
                    else strLoss = 2.4;
                    console.log(
                        `===> AdjustLossMainMatlGore :${orderCd}, ${tProdCd}, ${tOrderMrpSeq} , ${tMatlCd}, ${userId}: OrderCnt:${tTotCnt} , Loss: ${strLoss}, sizeloss: ${sizeLoss}, addLoss:${addLoss}  `,
                    );

                    let sql4 = `
                        update ksv_order_mrp
                        set
                            -- is_autoloss = '1',
                            std_loss = ${strLoss} + ${addLoss} + ${sizeLoss},
                            std_gross = std_net + std_net * (${strLoss} + ${addLoss}) / 100.0 + std_net * ${sizeLoss} / 100.0,
                            loss = ${strLoss} + ${addLoss} + ${sizeLoss},
                            gross = net + net * (${strLoss} + ${addLoss}) / 100.0 + net * ${sizeLoss} / 100.0
                        where
                            order_cd = '${orderCd}'
                            and prod_cd = '${tProdCd}'
                            and order_mrp_seq = '${tOrderMrpSeq}'
                            and matl_cd = '${tMatlCd}'
                    `;
                    var tRet4 = await prisma.$queryRaw(Prisma.raw(sql4));
                }
            }
        },
        AdjustLossMainMatlHuamao: async (
            orderCd: string,
            orderMrpSeq: string,
            userId: string,
        ) => {
            let sql9 = `
                select distinct
                    a.prod_cd,
                    isnull(c.size_loss, 0) as size_loss,
                    a.order_mrp_seq
                from
                    ksv_order_mrp a,
                    ksv_prod_mst b,
                    ksv_order_mem c
                where
                    a.order_cd = '${orderCd}'
                    and a.prod_cd = b.prod_cd
                    and c.prod_cd = a.prod_cd
                    and c.order_cd = a.order_cd
                    and a.order_mrp_seq = (
                        select
                            max(order_mrp_seq)
                        from
                            ksv_order_mrp
                        where
                            order_cd = '${orderCd}'
                            and a.prod_cd = prod_cd
                    )
            `;
            var tRet9 = await prisma.$queryRaw(Prisma.raw(sql9));
            console.log(`ADJUST_LOSS(MainMatlHuamao-Step1)=> ${tRet9.length} `);
            var tIdx9 = 0;
            var sizeLoss = 0.0;
            for (tIdx9 = 0; tIdx9 < tRet9.length; tIdx9++) {
                var tProdCd = tRet9[tIdx9].prod_cd;
                sizeLoss = tRet9[tIdx9].size_loss;
                var tOrderMrpSeq = tRet9[tIdx9].order_mrp_seq;

                let sql0 = `
                    select distinct
                        a.matl_cd,
                        isnull(b.add_loss, 0) as add_loss
                    from
                        ksv_order_mrp a,
                        kcd_matl_mst b
                    where
                        a.order_cd = '${orderCd}'
                        and a.prod_cd = '${tProdCd}'
                        and a.order_mrp_seq = '${tOrderMrpSeq}'
                        and b.matl_cd = a.matl_cd
                        and b.matl_type in ('M', 'Q')
                        and b.vendor_cd in ('v0458')
                `;
                var tRet = await prisma.$queryRaw(Prisma.raw(sql0));

                var tTotCnt = 0;
                var tIdx = 0;
                for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                    var tMatlCd = tRet[tIdx].matl_cd;
                    var addLoss = tRet[tIdx].add_loss;

                    var tTotCnt = 0;

                    let sql1 = `
                        select
                            sum(tot_cnt) as t_cnt
                        from
                            ksv_order_mem
                        where
                            order_cd = '${orderCd}'
                            and prod_cd in (
                                select
                                    prod_cd
                                from
                                    ksv_order_mrp
                                where
                                    order_cd = '${orderCd}'
                                    and prod_cd = '${tProdCd}'
                                    and order_mrp_seq = '${tOrderMrpSeq}'
                                    and matl_cd = '${tMatlCd}'
                            )
                    `;
                    var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                    tRet1.forEach((col, i) => {
                        tTotCnt += col.t_cnt;
                    });

                    var strLoss = 0.0;
                    if (tTotCnt >= 10000) strLoss = 0.42;
                    else if (tTotCnt >= 9000) strLoss = 0.56;
                    else if (tTotCnt >= 8000) strLoss = 0.7;
                    else if (tTotCnt >= 7000) strLoss = 0.77;
                    else if (tTotCnt >= 6000) strLoss = 0.84;
                    else if (tTotCnt >= 5000) strLoss = 0.98;
                    else if (tTotCnt >= 4000) strLoss = 1.05;
                    else if (tTotCnt >= 3000) strLoss = 1.12;
                    else if (tTotCnt >= 2000) strLoss = 1.19;
                    else if (tTotCnt >= 1000) strLoss = 1.26;
                    else if (tTotCnt >= 900) strLoss = 1.26;
                    else if (tTotCnt >= 800) strLoss = 1.4;
                    else if (tTotCnt >= 700) strLoss = 1.54;
                    else if (tTotCnt >= 600) strLoss = 1.57;
                    else if (tTotCnt >= 500) strLoss = 1.75;
                    else if (tTotCnt >= 400) strLoss = 1.82;
                    else if (tTotCnt >= 300) strLoss = 2.1;
                    else if (tTotCnt >= 200) strLoss = 2.38;
                    else if (tTotCnt >= 100) strLoss = 2.8;
                    else strLoss = 2.8;

                    console.log(
                        `===> AdjustLossMainMatlHuamo :${orderCd}, ${tProdCd}, ${tOrderMrpSeq} , ${tMatlCd}, ${userId}: OrderCnt:${tTotCnt} , Loss: ${strLoss}, sizeloss: ${sizeLoss}, addLoss:${addLoss}  `,
                    );
                    let sql4 = `
                        update ksv_order_mrp
                        set
                            -- is_autoloss = '1',
                            std_loss = ${strLoss} + ${addLoss} + ${sizeLoss},
                            std_gross = std_net + std_net * (${strLoss} + ${addLoss}) / 100.0 + std_net * ${sizeLoss} / 100.0,
                            loss = ${strLoss} + ${addLoss} + ${sizeLoss},
                            gross = net + net * (${strLoss} + ${addLoss}) / 100.0 + net * ${sizeLoss} / 100.0
                        where
                            order_cd = '${orderCd}'
                            and prod_cd = '${tProdCd}'
                            and order_mrp_seq = '${tOrderMrpSeq}'
                            and matl_cd = '${tMatlCd}'
                    `;
                    var tRet4 = await prisma.$queryRaw(Prisma.raw(sql4));
                }
            }
        },
        AdjustLossMainMatlKl: async (
            orderCd: string,
            orderMrpSeq: string,
            userId: string,
        ) => {
            let sql9 = `
                select distinct
                    a.prod_cd,
                    isnull(c.size_loss, 0) as size_loss,
                    a.order_mrp_seq
                from
                    ksv_order_mrp a,
                    ksv_prod_mst b,
                    ksv_order_mem c
                where
                    a.order_cd = '${orderCd}'
                    and a.prod_cd = b.prod_cd
                    and c.prod_cd = a.prod_cd
                    and c.order_cd = a.order_cd
                    and a.order_mrp_seq = (
                        select
                            max(order_mrp_seq)
                        from
                            ksv_order_mrp
                        where
                            order_cd = '${orderCd}'
                            and a.prod_cd = prod_cd
                    )
            `;
            var tRet9 = await prisma.$queryRaw(Prisma.raw(sql9));
            console.log(`ADJUST_LOSS(MainMatlKl-Step1)=> ${tRet9.length} `);
            var tIdx9 = 0;
            var sizeLoss = 0.0;
            for (tIdx9 = 0; tIdx9 < tRet9.length; tIdx9++) {
                var tProdCd = tRet9[tIdx9].prod_cd;
                sizeLoss = tRet9[tIdx9].size_loss;
                var tOrderMrpSeq = tRet9[tIdx9].order_mrp_seq;

                let sql0 = `
                    select distinct
                        a.matl_cd,
                        isnull(b.add_loss, 0) as add_loss
                    from
                        ksv_order_mrp a,
                        kcd_matl_mst b
                    where
                        a.order_cd = '${orderCd}'
                        and a.prod_cd = '${tProdCd}'
                        and a.order_mrp_seq = '${tOrderMrpSeq}'
                        and b.matl_cd = a.matl_cd
                        and b.matl_type in ('M', 'Q')
                        and b.vendor_cd not in ('v0313', 'v1874', 'v0328', 'v0458', 'v3357')
                `;
                var tRet = await prisma.$queryRaw(Prisma.raw(sql0));

                var tTotCnt = 0;
                var tIdx = 0;
                for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                    var tMatlCd = tRet[tIdx].matl_cd;
                    var addLoss = tRet[tIdx].add_loss;

                    var tTotCnt = 0;

                    let sql1 = `
                        select
                            sum(tot_cnt) as t_cnt
                        from
                            ksv_order_mem
                        where
                            order_cd = '${orderCd}'
                            and prod_cd in (
                                select
                                    prod_cd
                                from
                                    ksv_order_mrp
                                where
                                    order_cd = '${orderCd}'
                                    and prod_cd = '${tProdCd}'
                                    and order_mrp_seq = '${tOrderMrpSeq}'
                                    and matl_cd = '${tMatlCd}'
                            )
                    `;
                    var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                    tRet1.forEach((col, i) => {
                        tTotCnt += col.t_cnt;
                    });

                    var strLoss = 0.0;
                    if (tTotCnt >= 10000) strLoss = 0.3;
                    else if (tTotCnt >= 9000) strLoss = 0.4;
                    else if (tTotCnt >= 8000) strLoss = 0.5;
                    else if (tTotCnt >= 7000) strLoss = 0.55;
                    else if (tTotCnt >= 6000) strLoss = 0.6;
                    else if (tTotCnt >= 5000) strLoss = 0.7;
                    else if (tTotCnt >= 4000) strLoss = 0.75;
                    else if (tTotCnt >= 3000) strLoss = 0.8;
                    else if (tTotCnt >= 2000) strLoss = 0.85;
                    else if (tTotCnt >= 1000) strLoss = 0.9;
                    else if (tTotCnt >= 900) strLoss = 0.9;
                    else if (tTotCnt >= 800) strLoss = 1.0;
                    else if (tTotCnt >= 700) strLoss = 1.1;
                    else if (tTotCnt >= 600) strLoss = 1.12;
                    else if (tTotCnt >= 500) strLoss = 1.25;
                    else if (tTotCnt >= 400) strLoss = 1.3;
                    else if (tTotCnt >= 300) strLoss = 1.5;
                    else if (tTotCnt >= 200) strLoss = 1.7;
                    else if (tTotCnt >= 100) strLoss = 2.0;
                    else strLoss = 2.0;

                    console.log(
                        `===> AdjustLossMainMatlKl :${orderCd}, ${tProdCd}, ${tOrderMrpSeq} , ${tMatlCd}, ${userId}: OrderCnt:${tTotCnt} , Loss: ${strLoss}, sizeloss: ${sizeLoss}, addLoss:${addLoss}  `,
                    );
                    let sql4 = `
                        update ksv_order_mrp
                        set
                            -- is_autoloss = '1',
                            std_loss = ${strLoss} + ${addLoss} + ${sizeLoss},
                            std_gross = std_net + std_net * (${strLoss} + ${addLoss}) / 100.0 + std_net * ${sizeLoss} / 100.0,
                            loss = ${strLoss} + ${addLoss} + ${sizeLoss},
                            gross = net + net * (${strLoss} + ${addLoss}) / 100.0 + net * ${sizeLoss} / 100.0
                        where
                            order_cd = '${orderCd}'
                            and prod_cd = '${tProdCd}'
                            and order_mrp_seq = '${tOrderMrpSeq}'
                            and matl_cd = '${tMatlCd}'
                    `;
                    var tRet4 = await prisma.$queryRaw(Prisma.raw(sql4));
                }
            }
        },
        AdjustLossMainMatlIs: async (
            orderCd: string,
            orderMrpSeq: string,
            userId: string,
        ) => {
            let sql9 = `
                select distinct
                    a.prod_cd,
                    isnull(c.size_loss, 0) as size_loss,
                    a.order_mrp_seq
                from
                    ksv_order_mrp a,
                    ksv_prod_mst b,
                    ksv_order_mem c
                where
                    a.order_cd = '${orderCd}'
                    and a.prod_cd = b.prod_cd
                    and c.prod_cd = a.prod_cd
                    and c.order_cd = a.order_cd
                    and a.order_mrp_seq = (
                        select
                            max(order_mrp_seq)
                        from
                            ksv_order_mrp
                        where
                            order_cd = '${orderCd}'
                            and a.prod_cd = prod_cd
                    )
            `;
            var tRet9 = await prisma.$queryRaw(Prisma.raw(sql9));
            console.log(`ADJUST_LOSS(MainMatlIs-Step1)=> ${tRet9.length} `);
            var tIdx9 = 0;
            var sizeLoss = 0.0;
            for (tIdx9 = 0; tIdx9 < tRet9.length; tIdx9++) {
                var tProdCd = tRet9[tIdx9].prod_cd;
                sizeLoss = tRet9[tIdx9].size_loss;
                var tOrderMrpSeq = tRet9[tIdx9].order_mrp_seq;

                let sql0 = `
                    select distinct
                        a.matl_cd,
                        isnull(b.add_loss, 0) as add_loss
                    from
                        ksv_order_mrp a,
                        kcd_matl_mst b
                    where
                        a.order_cd = '${orderCd}'
                        and a.prod_cd = '${tProdCd}'
                        and a.order_mrp_seq = '${tOrderMrpSeq}'
                        and b.matl_cd = a.matl_cd
                        and b.matl_type in ('M', 'Q')
                        and b.vendor_cd not in ('v0313', 'v1874', 'v0328', 'v3357')
                `;
                var tRet = await prisma.$queryRaw(Prisma.raw(sql0));

                var tTotCnt = 0;
                var tIdx = 0;
                for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                    var tMatlCd = tRet[tIdx].matl_cd;
                    var addLoss = tRet[tIdx].add_loss;

                    var tTotCnt = 0;

                    let sql1 = `
                        select
                            sum(tot_cnt) as t_cnt
                        from
                            ksv_order_mem
                        where
                            order_cd = '${orderCd}'
                            and prod_cd in (
                                select
                                    prod_cd
                                from
                                    ksv_order_mrp
                                where
                                    order_cd = '${orderCd}'
                                    and prod_cd = '${tProdCd}'
                                    and order_mrp_seq = '${tOrderMrpSeq}'
                                    and matl_cd = '${tMatlCd}'
                            )
                    `;
                    var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                    tRet1.forEach((col, i) => {
                        tTotCnt += col.t_cnt;
                    });

                    var strLoss = 0.0;
                    if (tTotCnt >= 10000) strLoss = 0.3;
                    else if (tTotCnt >= 9000) strLoss = 0.4;
                    else if (tTotCnt >= 8000) strLoss = 0.5;
                    else if (tTotCnt >= 7000) strLoss = 0.55;
                    else if (tTotCnt >= 6000) strLoss = 0.6;
                    else if (tTotCnt >= 5000) strLoss = 0.7;
                    else if (tTotCnt >= 4000) strLoss = 0.75;
                    else if (tTotCnt >= 3000) strLoss = 0.8;
                    else if (tTotCnt >= 2000) strLoss = 0.85;
                    else if (tTotCnt >= 1000) strLoss = 0.9;
                    else if (tTotCnt >= 900) strLoss = 0.9;
                    else if (tTotCnt >= 800) strLoss = 1.0;
                    else if (tTotCnt >= 700) strLoss = 1.1;
                    else if (tTotCnt >= 600) strLoss = 1.12;
                    else if (tTotCnt >= 500) strLoss = 1.25;
                    else if (tTotCnt >= 400) strLoss = 1.3;
                    else if (tTotCnt >= 300) strLoss = 1.5;
                    else if (tTotCnt >= 200) strLoss = 1.7;
                    else if (tTotCnt >= 100) strLoss = 2.0;
                    else strLoss = 2.0;

                    console.log(
                        `===> AdjustLossMainMatlIs :${orderCd}, ${tProdCd}, ${tOrderMrpSeq} , ${tMatlCd}, ${userId}: OrderCnt:${tTotCnt} , Loss: ${strLoss}, sizeloss: ${sizeLoss}, addLoss:${addLoss}  `,
                    );
                    let sql4 = `
                        update ksv_order_mrp
                        set
                            -- is_autoloss = '1',
                            std_loss = ${strLoss} + ${addLoss} + ${sizeLoss},
                            std_gross = std_net + std_net * (${strLoss} + ${addLoss}) / 100.0 + std_net * ${sizeLoss} / 100.0,
                            loss = ${strLoss} + ${addLoss} + ${sizeLoss},
                            gross = net + net * (${strLoss} + ${addLoss}) / 100.0 + net * ${sizeLoss} / 100.0
                        where
                            order_cd = '${orderCd}'
                            and prod_cd = '${tProdCd}'
                            and order_mrp_seq = '${tOrderMrpSeq}'
                            and matl_cd = '${tMatlCd}'
                    `;
                    var tRet4 = await prisma.$queryRaw(Prisma.raw(sql4));
                }
            }
        },
        AdjustLossMainMatlPk: async (
            orderCd: string,
            orderMrpSeq: string,
            userId: string,
        ) => {
            let sql9 = `
                select distinct
                    a.prod_cd,
                    isnull(c.size_loss, 0) as size_loss,
                    a.order_mrp_seq
                from
                    ksv_order_mrp a,
                    ksv_prod_mst b,
                    ksv_order_mem c
                where
                    a.order_cd = '${orderCd}'
                    and a.prod_cd = b.prod_cd
                    and c.prod_cd = a.prod_cd
                    and c.order_cd = a.order_cd
                    and a.order_mrp_seq = (
                        select
                            max(order_mrp_seq)
                        from
                            ksv_order_mrp
                        where
                            order_cd = '${orderCd}'
                            and a.prod_cd = prod_cd
                    )
            `;
            var tRet9 = await prisma.$queryRaw(Prisma.raw(sql9));
            console.log(`ADJUST_LOSS(MainMatlPk-Step1)=> ${tRet9.length} `);
            var tIdx9 = 0;
            var sizeLoss = 0.0;
            for (tIdx9 = 0; tIdx9 < tRet9.length; tIdx9++) {
                var tProdCd = tRet9[tIdx9].prod_cd;
                sizeLoss = tRet9[tIdx9].size_loss;
                var tOrderMrpSeq = tRet9[tIdx9].order_mrp_seq;

                let sql0 = `
                    select distinct
                        a.matl_cd,
                        isnull(b.add_loss, 0) as add_loss
                    from
                        ksv_order_mrp a,
                        kcd_matl_mst b
                    where
                        a.order_cd = '${orderCd}'
                        and a.prod_cd = '${tProdCd}'
                        and a.order_mrp_seq = '${tOrderMrpSeq}'
                        and b.matl_cd = a.matl_cd
                        and b.matl_type in ('M', 'Q')
                        and b.vendor_cd not in ('v0313', 'v1874', 'v0458', 'v3357')
                `;
                var tRet = await prisma.$queryRaw(Prisma.raw(sql0));

                var tTotCnt = 0;
                var tIdx = 0;
                for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                    var tMatlCd = tRet[tIdx].matl_cd;
                    var addLoss = tRet[tIdx].add_loss;

                    var tTotCnt = 0;

                    let sql1 = `
                        select
                            sum(tot_cnt) as t_cnt
                        from
                            ksv_order_mem
                        where
                            order_cd = '${orderCd}'
                            and prod_cd in (
                                select
                                    prod_cd
                                from
                                    ksv_order_mrp
                                where
                                    order_cd = '${orderCd}'
                                    and prod_cd = '${tProdCd}'
                                    and order_mrp_seq = '${tOrderMrpSeq}'
                                    and matl_cd = '${tMatlCd}'
                            )
                    `;
                    var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                    tRet1.forEach((col, i) => {
                        tTotCnt += col.t_cnt;
                    });

                    var strLoss = 0.0;
                    if (tTotCnt >= 10000) strLoss = 0.3;
                    else if (tTotCnt >= 9000) strLoss = 0.4;
                    else if (tTotCnt >= 8000) strLoss = 0.5;
                    else if (tTotCnt >= 7000) strLoss = 0.55;
                    else if (tTotCnt >= 6000) strLoss = 0.6;
                    else if (tTotCnt >= 5000) strLoss = 0.7;
                    else if (tTotCnt >= 4000) strLoss = 0.75;
                    else if (tTotCnt >= 3000) strLoss = 0.8;
                    else if (tTotCnt >= 2000) strLoss = 0.85;
                    else if (tTotCnt >= 1000) strLoss = 0.9;
                    else if (tTotCnt >= 900) strLoss = 0.9;
                    else if (tTotCnt >= 800) strLoss = 1.0;
                    else if (tTotCnt >= 700) strLoss = 1.1;
                    else if (tTotCnt >= 600) strLoss = 1.12;
                    else if (tTotCnt >= 500) strLoss = 1.25;
                    else if (tTotCnt >= 400) strLoss = 1.3;
                    else if (tTotCnt >= 300) strLoss = 1.5;
                    else if (tTotCnt >= 200) strLoss = 1.7;
                    else if (tTotCnt >= 100) strLoss = 2.0;
                    else strLoss = 2.0;

                    console.log(
                        `===> AdjustLossMainMatlPk :${orderCd}, ${tProdCd}, ${tOrderMrpSeq} , ${tMatlCd}, ${userId}: OrderCnt:${tTotCnt} , Loss: ${strLoss}, sizeloss: ${sizeLoss}, addLoss:${addLoss}  `,
                    );
                    let sql4 = `
                        update ksv_order_mrp
                        set
                            -- is_autoloss = '1',
                            std_loss = ${strLoss} + ${addLoss} + ${sizeLoss},
                            std_gross = std_net + std_net * (${strLoss} + ${addLoss}) / 100.0 + std_net * ${sizeLoss} / 100.0,
                            loss = ${strLoss} + ${addLoss} + ${sizeLoss},
                            gross = net + net * (${strLoss} + ${addLoss}) / 100.0 + net * ${sizeLoss} / 100.0
                        where
                            order_cd = '${orderCd}'
                            and prod_cd = '${tProdCd}'
                            and order_mrp_seq = '${tOrderMrpSeq}'
                            and matl_cd = '${tMatlCd}'
                    `;
                    var tRet4 = await prisma.$queryRaw(Prisma.raw(sql4));
                }
            }
        },
        AdjustLossMainMatlCM: async (
            orderCd: string,
            orderMrpSeq: string,
            userId: string,
        ) => {
            let sql9 = `
                select distinct
                    a.prod_cd,
                    isnull(c.size_loss, 0) as size_loss,
                    a.order_mrp_seq
                from
                    ksv_order_mrp a,
                    ksv_prod_mst b,
                    ksv_order_mem c
                where
                    a.order_cd = '${orderCd}'
                    and a.prod_cd = b.prod_cd
                    and c.prod_cd = a.prod_cd
                    and c.order_cd = a.order_cd
                    and a.order_mrp_seq = (
                        select
                            max(order_mrp_seq)
                        from
                            ksv_order_mrp
                        where
                            order_cd = '${orderCd}'
                            and a.prod_cd = prod_cd
                    )
            `;
            var tRet9 = await prisma.$queryRaw(Prisma.raw(sql9));
            console.log(`ADJUST_LOSS(MainMatlCM-Step1)=> ${tRet9.length} `);
            var tIdx9 = 0;
            var sizeLoss = 0.0;
            for (tIdx9 = 0; tIdx9 < tRet9.length; tIdx9++) {
                var tProdCd = tRet9[tIdx9].prod_cd;
                sizeLoss = tRet9[tIdx9].size_loss;
                var tOrderMrpSeq = tRet9[tIdx9].order_mrp_seq;

                let sql0 = `
                    select distinct
                        a.matl_cd,
                        isnull(b.add_loss, 0) as add_loss
                    from
                        ksv_order_mrp a,
                        kcd_matl_mst b
                    where
                        a.order_cd = '${orderCd}'
                        and a.prod_cd = '${tProdCd}'
                        and a.order_mrp_seq = '${tOrderMrpSeq}'
                        and b.matl_cd = a.matl_cd
                        and b.matl_type in ('M')
                `;
                var tRet = await prisma.$queryRaw(Prisma.raw(sql0));

                var tTotCnt = 0;
                var tIdx = 0;
                for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                    var tMatlCd = tRet[tIdx].matl_cd;
                    var addLoss = tRet[tIdx].add_loss;

                    var tTotCnt = 0;

                    let sql1 = `
                        select
                            sum(tot_cnt) as t_cnt
                        from
                            ksv_order_mem
                        where
                            order_cd = '${orderCd}'
                            and prod_cd in (
                                select
                                    prod_cd
                                from
                                    ksv_order_mrp
                                where
                                    order_cd = '${orderCd}'
                                    and prod_cd = '${tProdCd}'
                                    and order_mrp_seq = '${tOrderMrpSeq}'
                                    and matl_cd = '${tMatlCd}'
                            )
                    `;
                    var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                    tRet1.forEach((col, i) => {
                        tTotCnt += col.t_cnt;
                    });

                    var strLoss = 0.0;
                    if (tTotCnt >= 1000) strLoss = 2.0;
                    else if (tTotCnt >= 501) strLoss = 3.0;
                    else strLoss = 5.0;

                    console.log(
                        `===> AdjustLossMainMatlCM :${orderCd}, ${tProdCd}, ${tOrderMrpSeq} , ${tMatlCd}, ${userId}: OrderCnt:${tTotCnt} , Loss: ${strLoss}, sizeloss: ${sizeLoss}, addLoss:${addLoss}  `,
                    );
                    let sql4 = `
                        update ksv_order_mrp
                        set
                            -- is_autoloss = '1',
                            std_loss = ${strLoss} + ${addLoss} + ${sizeLoss},
                            std_gross = std_net + std_net * (${strLoss} + ${addLoss}) / 100.0 + std_net * ${sizeLoss} / 100.0,
                            loss = ${strLoss} + ${addLoss} + ${sizeLoss},
                            gross = net + net * (${strLoss} + ${addLoss}) / 100.0 + net * ${sizeLoss} / 100.0
                        where
                            order_cd = '${orderCd}'
                            and prod_cd = '${tProdCd}'
                            and order_mrp_seq = '${tOrderMrpSeq}'
                            and matl_cd = '${tMatlCd}'
                    `;
                    var tRet4 = await prisma.$queryRaw(Prisma.raw(sql4));
                }
            }
        },
        AdjustLossSubMatlCM: async (
            orderCd: string,
            orderMrpSeq: string,
            userId: string,
        ) => {
            let sql0 = `
                select distinct
                    a.matl_cd,
                    b.matl_type2
                from
                    ksv_order_mrp a,
                    kcd_matl_mst b
                where
                    a.order_cd = '${orderCd}'
                    and b.matl_cd = a.matl_cd
                    and b.matl_type not in ('M', 'Q')
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sql0));
            console.log(`ADJUST_LOSS(SubMatlCM-Step1)=> ${tRet.length} `);

            var tTotCnt = 0;
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tMatlCd = tRet[tIdx].matl_cd;
                var tMatlType2 = tRet[tIdx].matl_type2;

                var strLoss = 0;
                if (parseInt(tMatlType2) === 57) strLoss = 0;
                else if (parseInt(tMatlType2) === 59) strLoss = 0;
                else if (parseInt(tMatlType2) === 60) strLoss = 0;
                else if (parseInt(tMatlType2) === 61) strLoss = 0;
                else if (parseInt(tMatlType2) === 36) strLoss = 0;
                else if (parseInt(tMatlType2) === 58) strLoss = 0;
                else if (parseInt(tMatlType2) === 67) strLoss = 0;
                else if (parseInt(tMatlType2) === 51) strLoss = 1;
                else if (parseInt(tMatlType2) === 29) strLoss = 2;
                else if (parseInt(tMatlType2) === 32) strLoss = 2;
                else if (parseInt(tMatlType2) === 33) strLoss = 2;
                else if (parseInt(tMatlType2) === 47) strLoss = 2;
                else if (parseInt(tMatlType2) === 48) strLoss = 2;
                else if (parseInt(tMatlType2) === 55) strLoss = 2;
                else if (parseInt(tMatlType2) === 56) strLoss = 2;
                else if (parseInt(tMatlType2) === 79) strLoss = 2;
                else if (parseInt(tMatlType2) === 80) strLoss = 2;
                else if (parseInt(tMatlType2) === 81) strLoss = 2;
                else if (parseInt(tMatlType2) === 53) strLoss = 2;
                else if (parseInt(tMatlType2) === 30) strLoss = 3;
                else if (parseInt(tMatlType2) === 49) strLoss = 3;
                else if (parseInt(tMatlType2) === 66) strLoss = 3;
                else if (parseInt(tMatlType2) === 22) strLoss = 5;
                else if (parseInt(tMatlType2) === 24) strLoss = 5;
                else if (parseInt(tMatlType2) === 28) strLoss = 5;
                else if (parseInt(tMatlType2) === 46) strLoss = 5;
                else if (parseInt(tMatlType2) === 54) strLoss = 5;
                else if (parseInt(tMatlType2) === 64) strLoss = 5;
                else if (parseInt(tMatlType2) === 68) strLoss = 5;
                else if (parseInt(tMatlType2) === 73) strLoss = 5;
                else if (parseInt(tMatlType2) === 26) strLoss = 5;
                else if (parseInt(tMatlType2) === 27) strLoss = 5;
                else if (parseInt(tMatlType2) === 31) strLoss = 5;
                else if (parseInt(tMatlType2) === 25) strLoss = 8;
                else if (parseInt(tMatlType2) === 45) strLoss = 8;
                else continue;

                let sql1 = `
                    select
                        max(order_mrp_seq) as order_mrp_seq,
                        prod_cd
                    from
                        ksv_order_mrp
                    where
                        order_cd = '${orderCd}'
                        and matl_cd = '${tMatlCd}'
                    group by
                        prod_cd
                `;
                var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));

                var tIdx1 = 0;
                for (tIdx1 = 0; tIdx1 < tRet1.length; tIdx1++) {
                    var tOrderMrpSeq = tRet1[tIdx1].order_mrp_seq;
                    var tProdCd = tRet1[tIdx1].prod_cd;

                    console.log(
                        `===> AdjustLossSubamtlCm :${orderCd}, ${tProdCd}, ${tOrderMrpSeq} , ${tMatlCd}, ${userId}: OrderCnt:${tTotCnt} , Loss: ${strLoss}, sizeloss: 0, addLoss:0  `,
                    );

                    let sql4 = `
                        update ksv_order_mrp
                        set
                            -- is_autoloss = '1',
                            std_loss = ${strLoss},
                            std_gross = std_net + std_net * ${strLoss} / 100.0,
                            loss = ${strLoss},
                            gross = net + net * ${strLoss} / 100.0
                        where
                            order_cd = '${orderCd}'
                            and prod_cd = '${tProdCd}'
                            and order_mrp_seq = '${tOrderMrpSeq}'
                            and matl_cd = '${tMatlCd}'
                    `;
                    var tRet4 = await prisma.$queryRaw(Prisma.raw(sql4));
                }
            }
        },
        AdjustLossMainMatlSample: async (
            orderCd: string,
            orderMrpSeq: string,
            userId: string,
        ) => {
            let sql0 = `
                select distinct
                    a.matl_cd
                from
                    ksv_order_mrp a,
                    kcd_matl_mst b
                where
                    a.order_cd = '${orderCd}'
                    and b.matl_cd = a.matl_cd
                    and b.matl_type in ('M', 'Q')
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sql0));
            console.log(`ADJUST_LOSS(MainMatlSample-Step1)=> ${tRet.length} `);

            var tTotCnt = 0;
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tMatlCd = tRet[tIdx].matl_cd;
                var tMatlType2 = tRet[tIdx].matl_type2;

                let sql1 = `
                    select
                        max(order_mrp_seq) as order_mrp_seq,
                        prod_cd
                    from
                        ksv_order_mrp
                    where
                        order_cd = '${orderCd}'
                        and matl_cd = '${tMatlCd}'
                    group by
                        prod_cd
                `;
                var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));

                var tIdx1 = 0;
                for (tIdx1 = 0; tIdx1 < tRet1.length; tIdx1++) {
                    var tOrderMrpSeq = tRet1[tIdx1].order_mrp_seq;
                    var tProdCd = tRet1[tIdx1].prod_cd;

                    var tTotCnt = 0;
                    let sql4 = `
                        select
                            sum(tot_cnt) as t_cnt
                        from
                            ksv_order_mem
                        where
                            order_cd = '${orderCd}'
                            and prod_cd in (
                                select
                                    prod_cd
                                from
                                    ksv_order_mrp
                                where
                                    order_cd = '${orderCd}'
                                    and prod_cd = '${tProdCd}'
                                    and order_mrp_seq = '${tOrderMrpSeq}'
                                    and matl_cd = '${tMatlCd}'
                            )
                    `;
                    var tRet4 = await prisma.$queryRaw(Prisma.raw(sql4));
                    tRet4.forEach((col, i) => {
                        tTotCnt += col.t_cnt;
                    });

                    var strLoss = 0;
                    if (
                        orderCd.substring(0, 2) === 'SW' ||
                        orderCd.substring(0, 2) === 'DY' ||
                        orderCd.substring(0, 2) === '1W' ||
                        orderCd.substring(0, 2) === '1F'
                    ) {
                        if (tTotCnt >= 51) strLoss = 20.0;
                        else if (tTotCnt >= 21) strLoss = 25.0;
                        else strLoss = 30.0;
                    } else if (orderCd.substring(0, 2) === 'KL') strLoss = 30.0;
                    else {
                        if (tTotCnt >= 51) strLoss = 10.0;
                        else if (tTotCnt >= 21) strLoss = 15.0;
                        else strLoss = 20.0;
                    }

                    console.log(
                        `===> AdjustLossMainMatlSample :${orderCd}, ${tProdCd}, ${tOrderMrpSeq} , ${tMatlCd}, ${userId}: OrderCnt:${tTotCnt} , Loss: ${strLoss}, sizeloss: 0, addLoss:0  `,
                    );
                    let sql5 = `
                        update ksv_order_mrp
                        set
                            -- is_autoloss = '1',
                            std_loss = ${strLoss},
                            std_gross = std_net + std_net * ${strLoss} / 100.0,
                            loss = ${strLoss},
                            gross = net + net * ${strLoss} / 100.0
                        where
                            order_cd = '${orderCd}'
                            and prod_cd = '${tProdCd}'
                            and order_mrp_seq = '${tOrderMrpSeq}'
                            and matl_cd = '${tMatlCd}'
                    `;
                    var tRet5 = await prisma.$queryRaw(Prisma.raw(sql5));
                }
            }
        },
        AdjustLossSubMatlSample: async (
            orderCd: string,
            orderMrpSeq: string,
            userId: string,
        ) => {
            let sql0 = `
                select distinct
                    a.matl_cd,
                    b.matl_type2
                from
                    ksv_order_mrp a,
                    kcd_matl_mst b
                where
                    a.order_cd = '${orderCd}'
                    and b.matl_cd = a.matl_cd
                    and b.matl_type not in ('M', 'Q')
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sql0));
            console.log(`ADJUST_LOSS(SubMatlSample-Step1)=> ${tRet.length} `);

            var tTotCnt = 0;
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tMatlCd = tRet[tIdx].matl_cd;
                var tMatlType2 = tRet[tIdx].matl_type2;

                var strLoss = 0;
                if (parseInt(tMatlType2) === 51) strLoss = 0;
                else if (parseInt(tMatlType2) === 59) strLoss = 0;
                else if (parseInt(tMatlType2) === 60) strLoss = 0;
                else if (parseInt(tMatlType2) === 70) strLoss = 1;
                else if (parseInt(tMatlType2) === 32) strLoss = 2;
                else if (parseInt(tMatlType2) === 47) strLoss = 2;
                else if (parseInt(tMatlType2) === 48) strLoss = 2;
                else if (parseInt(tMatlType2) === 55) strLoss = 2;
                else if (parseInt(tMatlType2) === 56) strLoss = 2;
                else if (parseInt(tMatlType2) === 69) strLoss = 10;
                else if (parseInt(tMatlType2) === 29) strLoss = 5;
                else if (parseInt(tMatlType2) === 33) strLoss = 5;
                else if (parseInt(tMatlType2) === 57) strLoss = 5;
                else if (parseInt(tMatlType2) === 68) strLoss = 5;
                else if (parseInt(tMatlType2) === 22) strLoss = 10;
                else if (parseInt(tMatlType2) === 24) strLoss = 10;
                else if (parseInt(tMatlType2) === 25) strLoss = 10;
                else if (parseInt(tMatlType2) === 26) strLoss = 10;
                else if (parseInt(tMatlType2) === 27) strLoss = 10;
                else if (parseInt(tMatlType2) === 28) strLoss = 10;
                else if (parseInt(tMatlType2) === 30) strLoss = 10;
                else if (parseInt(tMatlType2) === 31) strLoss = 10;
                else if (parseInt(tMatlType2) === 46) strLoss = 10;
                else if (parseInt(tMatlType2) === 49) strLoss = 10;
                else if (parseInt(tMatlType2) === 53) strLoss = 10;
                else if (parseInt(tMatlType2) === 54) strLoss = 10;
                else if (parseInt(tMatlType2) === 61) strLoss = 10;
                else if (parseInt(tMatlType2) === 64) strLoss = 10;
                else if (parseInt(tMatlType2) === 66) strLoss = 10;
                else if (parseInt(tMatlType2) === 45) strLoss = 15;
                else if (parseInt(tMatlType2) === 36) strLoss = 2;
                else if (parseInt(tMatlType2) === 83) strLoss = 10;
                else continue;

                if (parseInt(tMatlType2) === 69) {
                    let sql1 = `
                       select a.matl_cd,sum(a.net*c.tot_cnt)  as s_sum
                       from ksv_order_mrp a,ksv_order_mem c,kcd_matl_mst b,ksv_order_mrp_seqmax d 
                       where a.order_cd = '${orderCd}'  
                       and a.order_mrp_seq = d.order_mrp_seq 
                       and d.user_id='${userId}'    
                       and d.order_cd=a.order_cd 
                       and d.prod_cd=a.prod_cd 
                       and a.matl_cd = '${tMatlCd}'  
                       and c.order_cd = a.order_cd 
                       and c.prod_cd = a.prod_cd 
                       and b.matl_cd = a.matl_cd 
                       and b.matl_type2 in ('28','46') 
                       group by a.matl_cd 
                    `;
                    var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                    var tTot = 0;
                    tRet1.forEach((col9, i9) => {
                        tTot += parseFloat(col9.s_sum);
                    });
                    if (tTot > 100)  strLoss = 10.0;
                    else if (tTot > 70)  strLoss = 15.0;
                    else if (tTot > 50)  strLoss = 20.0;
                    else if (tTot > 25)  strLoss = 30.0;
                    else strLoss = 40.0;
                }

                let sql1 = `
                    select
                        max(order_mrp_seq) as order_mrp_seq,
                        prod_cd
                    from
                        ksv_order_mrp
                    where
                        order_cd = '${orderCd}'
                        and matl_cd = '${tMatlCd}'
                    group by
                        prod_cd
                `;
                var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));

                var tIdx1 = 0;
                for (tIdx1 = 0; tIdx1 < tRet1.length; tIdx1++) {
                    var tOrderMrpSeq = tRet1[tIdx1].order_mrp_seq;
                    var tProdCd = tRet1[tIdx1].prod_cd;

                    console.log(
                        `===> AdjustLossSubMatlSample :${orderCd}, ${tProdCd}, ${tOrderMrpSeq} , ${tMatlCd}, ${userId}: OrderCnt:${tTotCnt} , Loss: ${strLoss}, sizeloss: 0, addLoss:0  `,
                    );

                    let sql4 = `
                        update ksv_order_mrp
                        set
                            -- is_autoloss = '1',
                            std_loss = ${strLoss},
                            std_gross = std_net + std_net * ${strLoss} / 100.0,
                            loss = ${strLoss},
                            gross = net + net * ${strLoss} / 100.0
                        where
                            order_cd = '${orderCd}'
                            and prod_cd = '${tProdCd}'
                            and order_mrp_seq = '${tOrderMrpSeq}'
                            and matl_cd = '${tMatlCd}'
                    `;
                    var tRet4 = await prisma.$queryRaw(Prisma.raw(sql4));
                }
            }
        },
        AdjustLossSubMatlEband: async (
            orderCd: string,
            orderMrpSeq: string,
            userId: string,
        ) => {
            let sql0 = `
                select distinct
                    a.matl_cd,
                    isnull(b.add_loss, 0) as add_loss
                from
                    ksv_order_mrp a,
                    kcd_matl_mst b,
                    ksv_order_mrp_seqmax c
                where
                    a.order_cd = '${orderCd}'
                    and b.matl_cd = a.matl_cd
                    and b.matl_type2 in ('25', '45', '54', '64', '68', '22')
                    and b.matl_type not in ('M', 'Q')
                    and c.user_id = '${userId}'
                    and c.order_cd = a.order_cd
                    and c.prod_cd = a.prod_cd
                    and c.order_mrp_seq = a.order_mrp_seq
                    and b.vendor_cd not in ('v0313', 'v1874')
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sql0));
            console.log(`ADJUST_LOSS(SubMatlEbank-Step1)=> ${tRet.length} `);

            var tTotCnt = 0;
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tMatlCd = tRet[tIdx].matl_cd;
                var addLoss = tRet[tIdx].add_loss;

                var tTotCnt = 0;

                let sql1 = `
                    select
                        a.matl_cd,
                        sum(a.net * c.tot_cnt) as net_tot
                    from
                        ksv_order_mrp a,
                        ksv_order_mem c,
                        kcd_matl_mst b,
                        ksv_order_mrp_seqmax d
                    where
                        a.order_cd = '${orderCd}'
                        and a.order_mrp_seq = d.order_mrp_seq
                        and d.user_id = '${userId}'
                        and d.order_cd = a.order_cd
                        and d.prod_cd = a.prod_cd
                        and a.matl_cd = '${tMatlCd}'
                        and c.order_cd = a.order_cd
                        and c.prod_cd = a.prod_cd
                        and b.matl_cd = a.matl_cd
                        and b.matl_type2 in ('25', '45', '54', '64', '68', '22')
                    group by
                        a.matl_cd
                `;
                var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                tRet1.forEach((col, i) => {
                    tTotCnt += parseFloat(String(col.net_tot)) || 0;
                });

                var strLoss = 0.0;
                if (tTotCnt >= 10000) strLoss = 0.5;
                else if (tTotCnt >= 5000) strLoss = 1.0;
                else if (tTotCnt >= 1000) strLoss = 2.0;
                else strLoss = 3.0;

                var sizeLoss = 0;

                let sql2 = `
                    select
                        max(order_mrp_seq) as order_mrp_seq,
                        prod_cd
                    from
                        ksv_order_mrp
                    where
                        order_cd = '${orderCd}'
                        and matl_cd = '${tMatlCd}'
                    group by
                        prod_cd
                `;
                var tRet2 = await prisma.$queryRaw(Prisma.raw(sql2));

                var tIdx2 = 0;
                for (tIdx2 = 0; tIdx2 < tRet2.length; tIdx2++) {
                    var tOrderMrpSeq = tRet2[tIdx2].order_mrp_seq;
                    var tProdCd = tRet2[tIdx2].prod_cd;

                    console.log(
                        `===> AdjustLossSubMatlEband :${orderCd}, ${tProdCd}, ${tOrderMrpSeq} , ${tMatlCd}, ${userId}: OrderCnt:${tTotCnt} , Loss: ${strLoss}, sizeloss: ${sizeLoss}, addLoss:${addLoss}  `,
                    );

                    let sql4 = `
                        update ksv_order_mrp
                        set
                            -- is_autoloss = '1',
                            std_loss = ${strLoss} + ${addLoss} + ${sizeLoss},
                            std_gross = std_net + std_net * (${strLoss} + ${addLoss}) / 100.0 + std_net * ${sizeLoss} / 100.0,
                            loss = ${strLoss} + ${addLoss} + ${sizeLoss},
                            gross = net + net * (${strLoss} + ${addLoss}) / 100.0 + net * ${sizeLoss} / 100.0
                        where
                            order_cd = '${orderCd}'
                            and prod_cd = '${tProdCd}'
                            and order_mrp_seq = '${tOrderMrpSeq}'
                            and matl_cd = '${tMatlCd}'
                    `;
                    var tRet4 = await prisma.$queryRaw(Prisma.raw(sql4));
                }
            }
        },
        AdjustLossSubMatlTape: async (
            orderCd: string,
            orderMrpSeq: string,
            userId: string,
        ) => {
            let sql0 = `
                select distinct
                    a.matl_cd,
                    isnull(b.add_loss, 0) as add_loss
                from
                    ksv_order_mrp a,
                    kcd_matl_mst b,
                    ksv_order_mrp_seqmax c
                where
                    a.order_cd = '${orderCd}'
                    and b.matl_cd = a.matl_cd
                    and b.matl_type2 in ('26', '27', '24')
                    and b.matl_type not in ('M', 'Q')
                    and c.user_id = '${userId}'
                    and c.order_cd = a.order_cd
                    and c.prod_cd = a.prod_cd
                    and c.order_mrp_seq = a.order_mrp_seq
                    and b.vendor_cd not in ('v0313', 'v1874', 'v3357')
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sql0));
            console.log(`ADJUST_LOSS(SubMatlTape-Step1)=> ${tRet.length} `);

            var tTotCnt = 0;
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tMatlCd = tRet[tIdx].matl_cd;
                var addLoss = tRet[tIdx].add_loss;

                var tTotCnt = 0;

                let sql1 = `
                    select
                        a.matl_cd,
                        sum(a.net * c.tot_cnt) as net_tot
                    from
                        ksv_order_mrp a,
                        ksv_order_mem c,
                        kcd_matl_mst b,
                        ksv_order_mrp_seqmax d
                    where
                        a.order_cd = '${orderCd}'
                        and a.order_mrp_seq = d.order_mrp_seq
                        and d.user_id = '${userId}'
                        and d.order_cd = a.order_cd
                        and d.prod_cd = a.prod_cd
                        and a.matl_cd = '${tMatlCd}'
                        and c.order_cd = a.order_cd
                        and c.prod_cd = a.prod_cd
                        and b.matl_cd = a.matl_cd
                        and b.matl_type2 in ('26', '27', '24')
                    group by
                        a.matl_cd
                `;
                var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                tRet1.forEach((col, i) => {
                    tTotCnt += parseFloat(String(col.net_tot)) || 0;
                });

                var strLoss = 0.0;
                if (tTotCnt > 10000) strLoss = 0.5;
                else if (tTotCnt > 5000) strLoss = 1.0;
                else if (tTotCnt > 1000) strLoss = 1.5;
                else strLoss = 2.0;

                let sql2 = `
                    select
                        max(order_mrp_seq) as order_mrp_seq,
                        prod_cd
                    from
                        ksv_order_mrp
                    where
                        order_cd = '${orderCd}'
                        and matl_cd = '${tMatlCd}'
                    group by
                        prod_cd
                `;
                var tRet2 = await prisma.$queryRaw(Prisma.raw(sql2));

                var tIdx2 = 0;
                for (tIdx2 = 0; tIdx2 < tRet2.length; tIdx2++) {
                    var tOrderMrpSeq = tRet2[tIdx2].order_mrp_seq;
                    var tProdCd = tRet2[tIdx2].prod_cd;

                    console.log(
                        `===> AdjustLossSubMatlTape :${orderCd}, ${tProdCd}, ${tOrderMrpSeq} , ${tMatlCd}, ${userId}: OrderCnt:${tTotCnt} , Loss: ${strLoss}, addLoss:${addLoss}  `,
                    );
                    let sql4 = `
                        update ksv_order_mrp
                        set
                            -- is_autoloss = '1',
                            std_loss = ${strLoss} + ${addLoss},
                            std_gross = std_net + std_net * (${strLoss} + ${addLoss}) / 100.0,
                            loss = ${strLoss} + ${addLoss},
                            gross = net + net * (${strLoss} + ${addLoss}) / 100.0
                        where
                            order_cd = '${orderCd}'
                            and prod_cd = '${tProdCd}'
                            and order_mrp_seq = '${tOrderMrpSeq}'
                            and matl_cd = '${tMatlCd}'
                    `;
                    var tRet4 = await prisma.$queryRaw(Prisma.raw(sql4));
                }
            }
        },
        AdjustLossSubMatlVelcro: async (
            orderCd: string,
            orderMrpSeq: string,
            userId: string,
        ) => {
            let sql0 = `
                select distinct
                    a.matl_cd,
                    isnull(b.add_loss, 0) as add_loss
                from
                    ksv_order_mrp a,
                    kcd_matl_mst b,
                    ksv_order_mrp_seqmax c
                where
                    a.order_cd = '${orderCd}'
                    and b.matl_cd = a.matl_cd
                    and b.matl_type2 in ('31')
                    and b.matl_type not in ('M', 'Q')
                    and c.user_id = '${userId}'
                    and c.order_cd = a.order_cd
                    and c.prod_cd = a.prod_cd
                    and c.order_mrp_seq = a.order_mrp_seq
                    and b.vendor_cd not in ('v0313', 'v1874')
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sql0));
            console.log(`ADJUST_LOSS(SubMatlVelcro-Step1)=> ${tRet.length} `);

            var tTotCnt = 0;
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tMatlCd = tRet[tIdx].matl_cd;
                var addLoss = tRet[tIdx].add_loss;

                var tTotCnt = 0;

                let sql1 = `
                    select
                        a.matl_cd,
                        sum(a.net * c.tot_cnt) as net_tot
                    from
                        ksv_order_mrp a,
                        ksv_order_mem c,
                        kcd_matl_mst b,
                        ksv_order_mrp_seqmax d
                    where
                        a.order_cd = '${orderCd}'
                        and a.order_mrp_seq = d.order_mrp_seq
                        and d.user_id = '${userId}'
                        and d.order_cd = a.order_cd
                        and d.prod_cd = a.prod_cd
                        and a.matl_cd = '${tMatlCd}'
                        and c.order_cd = a.order_cd
                        and c.prod_cd = a.prod_cd
                        and b.matl_cd = a.matl_cd
                        and b.matl_type2 in ('31')
                    group by
                        a.matl_cd
                `;
                var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                tRet1.forEach((col, i) => {
                    tTotCnt += parseFloat(String(col.net_tot)) || 0;
                });

                var strLoss = 0.0;
                if (tTotCnt >= 10000) strLoss = 0.5;
                else if (tTotCnt >= 5000) strLoss = 1.0;
                else if (tTotCnt >= 1000) strLoss = 2.0;
                else strLoss = 2.0;

                var sizeLoss = 0;

                let sql2 = `
                    select
                        max(order_mrp_seq) as order_mrp_seq,
                        prod_cd
                    from
                        ksv_order_mrp
                    where
                        order_cd = '${orderCd}'
                        and matl_cd = '${tMatlCd}'
                    group by
                        prod_cd
                `;
                var tRet2 = await prisma.$queryRaw(Prisma.raw(sql2));

                var tIdx2 = 0;
                for (tIdx2 = 0; tIdx2 < tRet2.length; tIdx2++) {
                    var tOrderMrpSeq = tRet2[tIdx2].order_mrp_seq;
                    var tProdCd = tRet2[tIdx2].prod_cd;
                    console.log(
                        `===> AdjustLossSubMatlVelcro :${orderCd}, ${tProdCd}, ${tOrderMrpSeq} , ${tMatlCd}, ${userId}: OrderCnt:${tTotCnt} , Loss: ${strLoss}, sizeloss: ${sizeLoss}, addLoss:${addLoss}  `,
                    );
                    let sql4 = `
                        update ksv_order_mrp
                        set
                            -- is_autoloss = '1',
                            std_loss = ${strLoss} + ${addLoss} + ${sizeLoss},
                            std_gross = std_net + std_net * (${strLoss} + ${addLoss}) / 100.0 + std_net * ${sizeLoss} / 100.0,
                            loss = ${strLoss} + ${addLoss} + ${sizeLoss},
                            gross = net + net * (${strLoss} + ${addLoss}) / 100.0 + net * ${sizeLoss} / 100.0
                        where
                            order_cd = '${orderCd}'
                            and prod_cd = '${tProdCd}'
                            and order_mrp_seq = '${tOrderMrpSeq}'
                            and matl_cd = '${tMatlCd}'
                    `;
                    var tRet4 = await prisma.$queryRaw(Prisma.raw(sql4));
                }
            }
        },
        AdjustLossSubMatlSealing: async (
            orderCd: string,
            orderMrpSeq: string,
            userId: string,
        ) => {
            let sql0 = `
                select distinct
                    a.matl_cd,
                    isnull(b.add_loss, 0) as add_loss
                from
                    ksv_order_mrp a,
                    kcd_matl_mst b,
                    ksv_order_mrp_seqmax c
                where
                    a.order_cd = '${orderCd}'
                    and b.matl_cd = a.matl_cd
                    and b.matl_type2 in ('28', '46')
                    and b.matl_type not in ('M', 'Q')
                    and c.user_id = '${userId}'
                    and c.order_cd = a.order_cd
                    and c.prod_cd = a.prod_cd
                    and c.order_mrp_seq = a.order_mrp_seq
                    and b.vendor_cd not in ('v0313', 'v1874')
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sql0));
            console.log(`ADJUST_LOSS(SubMatlSealing-Step1)=> ${tRet.length} `);

            var tTotCnt = 0;
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tMatlCd = tRet[tIdx].matl_cd;
                var addLoss = tRet[tIdx].add_loss;

                var tTotCnt = 0;

                let sql1 = `
                    select
                        a.matl_cd,
                        sum(a.net * c.tot_cnt) as net_tot
                    from
                        ksv_order_mrp a,
                        ksv_order_mem c,
                        kcd_matl_mst b,
                        ksv_order_mrp_seqmax d
                    where
                        a.order_cd = '${orderCd}'
                        and a.order_mrp_seq = d.order_mrp_seq
                        and d.user_id = '${userId}'
                        and d.order_cd = a.order_cd
                        and d.prod_cd = a.prod_cd
                        and a.matl_cd = '${tMatlCd}'
                        and c.order_cd = a.order_cd
                        and c.prod_cd = a.prod_cd
                        and b.matl_cd = a.matl_cd
                        and b.matl_type2 in ('28', '46')
                    group by
                        a.matl_cd
                `;
                var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                tRet1.forEach((col, i) => {
                    tTotCnt += parseFloat(String(col.net_tot)) || 0;
                });

                var strLoss = 0.0;
                if (tTotCnt > 50000) strLoss = 0.2;
                else if (tTotCnt > 30000) strLoss = 0.5;
                else if (tTotCnt > 10000) strLoss = 1.0;
                else strLoss = 2.0;

                var sizeLoss = 0;

                let sql2 = `
                    select
                        max(order_mrp_seq) as order_mrp_seq,
                        prod_cd
                    from
                        ksv_order_mrp
                    where
                        order_cd = '${orderCd}'
                        and matl_cd = '${tMatlCd}'
                    group by
                        prod_cd
                `;
                var tRet2 = await prisma.$queryRaw(Prisma.raw(sql2));

                var tIdx2 = 0;
                for (tIdx2 = 0; tIdx2 < tRet2.length; tIdx2++) {
                    var tOrderMrpSeq = tRet2[tIdx2].order_mrp_seq;
                    var tProdCd = tRet2[tIdx2].prod_cd;

                    console.log(
                        `===> AdjustLossSubMatlDealing :${orderCd}, ${tProdCd}, ${tOrderMrpSeq} , ${tMatlCd}, ${userId}: OrderCnt:${tTotCnt} , Loss: ${strLoss}, sizeloss: ${sizeLoss}, addLoss:${addLoss}  `,
                    );
                    let sql4 = `
                        update ksv_order_mrp
                        set
                            -- is_autoloss = '1',
                            std_loss = ${strLoss} + ${addLoss} + ${sizeLoss},
                            std_gross = std_net + std_net * (${strLoss} + ${addLoss}) / 100.0 + std_net * ${sizeLoss} / 100.0,
                            loss = ${strLoss} + ${addLoss} + ${sizeLoss},
                            gross = net + net * (${strLoss} + ${addLoss}) / 100.0 + net * ${sizeLoss} / 100.0
                        where
                            order_cd = '${orderCd}'
                            and prod_cd = '${tProdCd}'
                            and order_mrp_seq = '${tOrderMrpSeq}'
                            and matl_cd = '${tMatlCd}'
                    `;
                    var tRet4 = await prisma.$queryRaw(Prisma.raw(sql4));
                }
            }
        },
        AdjustLossSubMatlZipper: async (
            orderCd: string,
            orderMrpSeq: string,
            userId: string,
        ) => {
            let sql01 = `
                select distinct
                    isnull(mid_size, '#') as mid_size,
                    prod_cd
                from
                    ksv_order_mem
                where
                    order_cd = '${orderCd}'
            `;
            var tRet01 = await prisma.$queryRaw(Prisma.raw(sql01));
            var tIdx01 = 0;
            for (tIdx01 = 0; tIdx01 < tRet01.length; tIdx01++) {
                var tProdCd = tRet01[tIdx01].prod_cd;
                var tMidSize1 = tRet01[tIdx01].mid_size;
                var tMidSize2 = '#';
                var tMidSize3 = '#';
                var tMidSize4 = '#';

                let sql0 = `
                    select
                        a.matl_cd,
                        isnull(a.use_size, '') as use_size,
                        isnull(b.add_loss, 0) as add_loss,
                        a.remark
                    from
                        ksv_order_mrp a,
                        kcd_matl_mst b
                    where
                        a.order_cd = '${orderCd}'
                        and a.use_size in ('${tMidSize1}', '#', '#', '#')
                        and a.prod_cd = '${tProdCd}'
                        and b.matl_cd = a.matl_cd
                        and b.matl_type2 in ('33')
                        and b.matl_type not in ('M', 'Q')
                        and b.vendor_cd not in ('v0313', 'v1874')
                    group by
                        a.matl_cd,
                        a.use_size,
                        b.add_loss,
                        a.remark
                `;
                var tRet = await prisma.$queryRaw(Prisma.raw(sql0));
                console.log(
                    `ADJUST_LOSS(SubMatlZipper-Step1)=> ${tRet.length} `,
                );

                var tTotCnt = 0;
                var tIdx = 0;
                for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                    var tMatlCd = tRet[tIdx].matl_cd;
                    var addLoss = tRet[tIdx].add_loss;
                    var useSize = tRet[tIdx].use_size;
                    var remark = tRet[tIdx].remark.replace(/'/g, "''");

                    let sql2 = `
                        select
                            max(order_mrp_seq) as order_mrp_seq,
                            prod_cd
                        from
                            ksv_order_mrp
                        where
                            order_cd = '${orderCd}'
                            and prod_cd = '${tProdCd}'
                            and matl_cd = '${tMatlCd}'
                            and use_size in ('${useSize}')
                        group by
                            prod_cd
                    `;
                    var tRet2 = await prisma.$queryRaw(Prisma.raw(sql2));

                    var tTotCnt = 0;
                    var tIdx2 = 0;
                    for (tIdx2 = 0; tIdx2 < tRet2.length; tIdx2++) {
                        var tOrderMrpSeq = tRet2[tIdx2].order_mrp_seq;
                        let sql1 = `
                            select
                                a.matl_cd,
                                c.mid_size_qty as net_tot
                            from
                                ksv_order_mrp a,
                                ksv_order_mem c,
                                kcd_matl_mst b
                            where
                                a.order_cd = '${orderCd}'
                                and a.order_mrp_seq = '${tOrderMrpSeq}'
                                and a.prod_cd = '${tProdCd}'
                                and a.matl_cd = '${tMatlCd}'
                                and a.remark = '${remark}'
                                and a.use_size in ('${useSize}')
                                and c.add_flag = '0'
                                and c.order_cd = a.order_cd
                                and c.prod_cd = a.prod_cd
                                and b.matl_cd = a.matl_cd
                                and b.matl_type2 in ('33')
                        `;
                        var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                        tRet1.forEach((col, i) => {
                            tTotCnt += parseFloat(String(col.net_tot)) || 0;
                        });
                    }

                    var strLoss = 0.0;
                    if (tTotCnt > 5000) strLoss = 0.5;
                    else if (tTotCnt > 2000) strLoss = 0.7;
                    else if (tTotCnt > 1000) strLoss = 1.0;
                    else if (tTotCnt > 500) strLoss = 1.5;
                    else if (tTotCnt > 300) strLoss = 2.0;
                    else strLoss = 2.5;

                    var sizeLoss = 0;

                    tIdx2 = 0;
                    for (tIdx2 = 0; tIdx2 < tRet2.length; tIdx2++) {
                        var tOrderMrpSeq = tRet2[tIdx2].order_mrp_seq;

                        console.log(
                            `===> AdjustLossSubMatlZipper :${orderCd}, ${tProdCd}, ${tOrderMrpSeq} , ${tMatlCd}, ${userId}: OrderCnt:${tTotCnt} , Loss: ${strLoss}, sizeloss: ${sizeLoss}, addLoss:${addLoss}  `,
                        );
                        let sql4 = `
                            update ksv_order_mrp
                            set
                                -- is_autoloss = '1',
                                std_loss = ${strLoss} + ${addLoss} + ${sizeLoss},
                                std_gross = std_net + std_net * (${strLoss} + ${addLoss}) / 100.0 + std_net * ${sizeLoss} / 100.0,
                                loss = ${strLoss} + ${addLoss} + ${sizeLoss},
                                gross = net + net * (${strLoss} + ${addLoss}) / 100.0 + net * ${sizeLoss} / 100.0
                            where
                                order_cd = '${orderCd}'
                                and prod_cd = '${tProdCd}'
                                and order_mrp_seq = '${tOrderMrpSeq}'
                                and matl_cd = '${tMatlCd}'
                        `;
                        var tRet4 = await prisma.$queryRaw(Prisma.raw(sql4));
                    }
                }
            }

            // 사이즈없는 지퍼 계산
            // WORK_SQL1_1
            let sql0 = `
                select
                    a.matl_cd,
                    isnull(b.add_loss, 0) as add_loss,
                    a.remark
                from
                    ksv_order_mrp a,
                    ksv_order_mem c,
                    kcd_matl_mst b
                where
                    a.order_cd = '${orderCd}'
                    and a.use_size in ('')
                    and c.order_cd = a.order_cd
                    and c.prod_cd = a.prod_cd
                    and b.matl_cd = a.matl_cd
                    and b.matl_type2 in ('33')
                    and b.matl_type not in ('M', 'Q')
                    and b.vendor_cd not in ('v0313', 'v1874', 'v3357')
                group by
                    a.matl_cd,
                    b.add_loss,
                    a.remark
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sql0));
            console.log(
                `ADJUST_LOSS(SubMatlZipper(1)-Step1)=> ${tRet.length} `,
            );

            var tTotCnt = 0;
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tMatlCd = tRet[tIdx].matl_cd;
                var addLoss = tRet[tIdx].add_loss;
                var remark = String(tRet[tIdx].remark || '').replace(/'/g, "''");

                let sql2 = `
                    select
                        max(order_mrp_seq) as order_mrp_seq,
                        prod_cd
                    from
                        ksv_order_mrp
                    where
                        order_cd = '${orderCd}'
                        and matl_cd = '${tMatlCd}'
                        and use_size in ('')
                    group by
                        prod_cd
                `;
                var tRet2 = await prisma.$queryRaw(Prisma.raw(sql2));

                var tTotCnt = 0;
                var tIdx2 = 0;
                for (tIdx2 = 0; tIdx2 < tRet2.length; tIdx2++) {
                    var tOrderMrpSeq = tRet2[tIdx2].order_mrp_seq;
                    var tProdCd = tRet2[tIdx2].prod_cd;
                    let sql1 = `
                        select
                            a.matl_cd,
                            sum(c.tot_cnt) as net_tot
                        from
                            ksv_order_mrp a,
                            ksv_order_mem c,
                            kcd_matl_mst b
                        where
                            a.order_cd = '${orderCd}'
                            and a.order_mrp_seq = '${tOrderMrpSeq}'
                            and a.prod_cd = '${tProdCd}'
                            and a.matl_cd = '${tMatlCd}'
                            and a.remark = '${remark}'
                            and a.use_size in ('')
                            and c.order_cd = a.order_cd
                            and c.prod_cd = a.prod_cd
                            and b.matl_cd = a.matl_cd
                            and b.matl_type2 in ('33')
                        group by
                            a.matl_cd
                    `;
                    var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                    tRet1.forEach((col, i) => {
                        tTotCnt += parseFloat(String(col.net_tot)) || 0;
                    });
                }

                var strLoss = 0.0;
                if (tTotCnt > 5000) strLoss = 0.5;
                else if (tTotCnt > 2000) strLoss = 0.7;
                else if (tTotCnt > 1000) strLoss = 1.0;
                else if (tTotCnt > 500) strLoss = 1.5;
                else if (tTotCnt > 300) strLoss = 2.0;
                else strLoss = 2.5;

                var sizeLoss = 0;

                tIdx2 = 0;
                for (tIdx2 = 0; tIdx2 < tRet2.length; tIdx2++) {
                    var tOrderMrpSeq = tRet2[tIdx2].order_mrp_seq;
                    var tProdCd = tRet2[tIdx2].prod_cd;

                    console.log(
                        `===> AdjustLossSubMatlZipper(1) :${orderCd}, ${tProdCd}, ${tOrderMrpSeq} , ${tMatlCd}, ${userId}: OrderCnt:${tTotCnt} , Loss: ${strLoss}, sizeloss: ${sizeLoss}, addLoss:${addLoss}  `,
                    );
                    let sql4 = `
                        update ksv_order_mrp
                        set
                            -- is_autoloss = '1',
                            std_loss = ${strLoss} + ${addLoss} + ${sizeLoss},
                            std_gross = std_net + std_net * (${strLoss} + ${addLoss}) / 100.0 + std_net * ${sizeLoss} / 100.0,
                            loss = ${strLoss} + ${addLoss} + ${sizeLoss},
                            gross = net + net * (${strLoss} + ${addLoss}) / 100.0 + net * ${sizeLoss} / 100.0
                        where
                            order_cd = '${orderCd}'
                            and prod_cd = '${tProdCd}'
                            and order_mrp_seq = '${tOrderMrpSeq}'
                            and matl_cd = '${tMatlCd}'
                            and use_size = ''
                            and remark = '${remark}'
                    `;
                    var tRet4 = await prisma.$queryRaw(Prisma.raw(sql4));
                }
            }

            let sql01 = `
                select distinct
                    isnull(mid_size, '#') as mid_size,
                    prod_cd
                from
                    ksv_order_mem
                where
                    order_cd = '${orderCd}'
            `;
            var tRet01 = await prisma.$queryRaw(Prisma.raw(sql01));
            var tIdx01 = 0;
            for (tIdx01 = 0; tIdx01 < tRet01.length; tIdx01++) {
                var tProdCd = tRet01[tIdx01].prod_cd;
                var tMidSize1 = tRet01[tIdx01].mid_size;
                var tMidSize2 = '#';
                var tMidSize3 = '#';
                var tMidSize4 = '#';

                let sql0 = `
                    select
                        a.matl_cd,
                        isnull(b.add_loss, 0) as add_loss
                    from
                        ksv_order_mrp a,
                        ksv_order_mem c,
                        kcd_matl_mst b
                    where
                        a.order_cd = '${orderCd}'
                        and a.use_size not in ('${tMidSize1}', '#', '#', '#', '')
                        and a.prod_cd = '${tProdCd}'
                        and c.order_cd = a.order_cd
                        and c.prod_cd = a.prod_cd
                        and b.matl_cd = a.matl_cd
                        and b.matl_type2 in ('33')
                        and b.matl_type <> 'M'
                        and b.vendor_cd not in ('v0313', 'v1874', 'v3357')
                    group by
                        a.matl_cd,
                        b.add_loss
                `;
                var tRet = await prisma.$queryRaw(Prisma.raw(sql0));
                console.log(
                    `ADJUST_LOSS(SubMatlZipper(2)-Step1)=> ${tRet.length} `,
                );

                var tTotCnt = 0;
                var tIdx = 0;
                for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                    var tMatlCd = tRet[tIdx].matl_cd;
                    var addLoss = tRet[tIdx].add_loss;

                    let sql2 = `
                        select
                            max(order_mrp_seq) as order_mrp_seq,
                            prod_cd
                        from
                            ksv_order_mrp
                        where
                            order_cd = '${orderCd}'
                            and prod_cd = '${tProdCd}'
                            and matl_cd = '${tMatlCd}'
                        group by
                            prod_cd
                    `;
                    var tRet2 = await prisma.$queryRaw(Prisma.raw(sql2));

                    var strLoss = 0;
                    var sizeLoss = 0;

                    tIdx2 = 0;
                    for (tIdx2 = 0; tIdx2 < tRet2.length; tIdx2++) {
                        var tOrderMrpSeq = tRet2[tIdx2].order_mrp_seq;

                        console.log(
                            `===> AdjustLossSubMatlZipper(2) :${orderCd}, ${tProdCd}, ${tOrderMrpSeq} , ${tMatlCd}, ${userId}: OrderCnt:${tTotCnt} , Loss: 0, sizeloss: 0, addLoss:0 `,
                        );
                        let sql4 = `
                            update ksv_order_mrp
                            set
                                -- is_autoloss = '1',
                                std_loss = 0,
                                std_gross = std_net,
                                loss = 0,
                                gross = net
                            from
                                kcd_matl_mst a,
                                ksv_order_mrp b
                            where
                                b.order_cd = '${orderCd}'
                                and b.prod_cd = '${tProdCd}'
                                and b.order_mrp_seq = '${tOrderMrpSeq}'
                                and b.use_size not in ('${tMidSize1}', '#', '#', '#', '')
                                and b.matl_cd = '${tMatlCd}'
                                and a.matl_cd = b.matl_cd
                                and a.matl_type2 in ('33')
                        `;
                        var tRet4 = await prisma.$queryRaw(Prisma.raw(sql4));
                    }
                }
            }
        },
        AdjustLossSubMatlZipper3: async (
            orderCd: string,
            orderMrpSeq: string,
            userId: string,
        ) => {
            let sql01 = `
                select distinct
                    isnull(mid_size, '#') as mid_size,
                    prod_cd
                from
                    ksv_order_mem
                where
                    order_cd = '${orderCd}'
            `;
            var tRet01 = await prisma.$queryRaw(Prisma.raw(sql01));
            var tIdx01 = 0;
            for (tIdx01 = 0; tIdx01 < tRet01.length; tIdx01++) {
                var tProdCd = tRet01[tIdx01].prod_cd;
                var tMidSize1 = tRet01[tIdx01].mid_size;
                var tMidSize2 = '#';
                var tMidSize3 = '#';
                var tMidSize4 = '#';

                let sql0 = `
                    select
                        a.matl_cd,
                        isnull(a.use_size, '') as use_size,
                        isnull(b.add_loss, 0) as add_loss,
                        a.remark
                    from
                        ksv_order_mrp a,
                        kcd_matl_mst b
                    where
                        a.order_cd = '${orderCd}'
                        and a.use_size in ('${tMidSize1}', '#', '#', '#')
                        and a.prod_cd = '${tProdCd}'
                        and b.matl_cd = a.matl_cd
                        and b.matl_type2 in ('33')
                        and b.matl_type not in ('M', 'Q')
                        and b.vendor_cd not in ('v0313', 'v1874')
                    group by
                        a.matl_cd,
                        a.use_size,
                        b.add_loss,
                        a.remark
                `;
                var tRet = await prisma.$queryRaw(Prisma.raw(sql0));
                console.log(
                    `ADJUST_LOSS(SubMatlZipper3(1)-Step1)=> ${tRet.length} `,
                );

                var tTotCnt = 0;
                var tIdx = 0;
                for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                    var tMatlCd = tRet[tIdx].matl_cd;
                    var addLoss = tRet[tIdx].add_loss;
                    var useSize = tRet[tIdx].use_size;
                    var remark = tRet[tIdx].remark.replace(/'/g, "''");

                    let sql2 = `
                        select
                            max(order_mrp_seq) as order_mrp_seq,
                            prod_cd
                        from
                            ksv_order_mrp
                        where
                            order_cd = '${orderCd}'
                            and prod_cd = '${tProdCd}'
                            and matl_cd = '${tMatlCd}'
                            and use_size in ('${useSize}')
                        group by
                            prod_cd
                    `;
                    var tRet2 = await prisma.$queryRaw(Prisma.raw(sql2));

                    var tTotCnt = 0;
                    var tIdx2 = 0;
                    for (tIdx2 = 0; tIdx2 < tRet2.length; tIdx2++) {
                        var tOrderMrpSeq = tRet2[tIdx2].order_mrp_seq;
                        let sql1 = `
                            select
                                a.matl_cd,
                                c.mid_size_qty as net_tot
                            from
                                ksv_order_mrp a,
                                ksv_order_mem c,
                                kcd_matl_mst b
                            where
                                a.order_cd = '${orderCd}'
                                and a.order_mrp_seq = '${tOrderMrpSeq}'
                                and a.prod_cd = '${tProdCd}'
                                and a.matl_cd = '${tMatlCd}'
                                and a.remark = '${remark}'
                                and a.use_size in ('${useSize}')
                                and c.add_flag = '0'
                                and c.order_cd = a.order_cd
                                and c.prod_cd = a.prod_cd
                                and b.matl_cd = a.matl_cd
                                and b.matl_type2 in ('33')
                        `;
                        var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                        tRet1.forEach((col, i) => {
                            tTotCnt += parseFloat(String(col.net_tot)) || 0;
                        });
                    }

                    var strLoss = 0.0;
                    if (tTotCnt > 800) strLoss = 0.2;
                    else if (tTotCnt > 600) strLoss = 0.4;
                    else if (tTotCnt > 400) strLoss = 0.6;
                    else if (tTotCnt > 200) strLoss = 1.0;
                    else strLoss = 1.5;

                    var sizeLoss = 0;

                    tIdx2 = 0;
                    for (tIdx2 = 0; tIdx2 < tRet2.length; tIdx2++) {
                        var tOrderMrpSeq = tRet2[tIdx2].order_mrp_seq;
                        console.log(
                            `===> AdjustLossSubMatlZipper3(1) :${orderCd}, ${tProdCd}, ${tOrderMrpSeq} , ${tMatlCd}, ${userId}: OrderCnt:${tTotCnt} , Loss: ${strLoss}, sizeloss: ${sizeLoss}, addLoss:${addLoss}  `,
                        );

                        let sql4 = `
                            update ksv_order_mrp
                            set
                                -- is_autoloss = '1',
                                std_loss = ${strLoss} + ${addLoss} + ${sizeLoss},
                                std_gross = std_net + std_net * (${strLoss} + ${addLoss}) / 100.0 + std_net * ${sizeLoss} / 100.0,
                                loss = ${strLoss} + ${addLoss} + ${sizeLoss},
                                gross = net + net * (${strLoss} + ${addLoss}) / 100.0 + net * ${sizeLoss} / 100.0
                            where
                                order_cd = '${orderCd}'
                                and prod_cd = '${tProdCd}'
                                and order_mrp_seq = '${tOrderMrpSeq}'
                                and matl_cd = '${tMatlCd}'
                        `;
                        var tRet4 = await prisma.$queryRaw(Prisma.raw(sql4));
                    }
                }
            }

            let sql0 = `
                select
                    a.matl_cd,
                    isnull(b.add_loss, 0) as add_loss,
                    a.remark
                from
                    ksv_order_mrp a,
                    ksv_order_mem c,
                    kcd_matl_mst b
                where
                    a.order_cd = '${orderCd}'
                    and a.use_size in ('')
                    and c.order_cd = a.order_cd
                    and c.prod_cd = a.prod_cd
                    and b.matl_cd = a.matl_cd
                    and b.matl_type2 in ('33')
                    and b.matl_type not in ('M', 'Q')
                    and b.vendor_cd not in ('v0313', 'v1874', 'v3357')
                group by
                    a.matl_cd,
                    b.add_loss,
                    a.remark
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sql0));
            console.log(
                `ADJUST_LOSS(SubMatlZipper3(2)-Step1)=> ${tRet.length} `,
            );

            var tTotCnt = 0;
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tMatlCd = tRet[tIdx].matl_cd;
                var addLoss = tRet[tIdx].add_loss;
                var remark = String(tRet[tIdx].remark || '').replace(/'/g, "''");

                let sql2 = `
                    select
                        max(order_mrp_seq) as order_mrp_seq,
                        prod_cd
                    from
                        ksv_order_mrp
                    where
                        order_cd = '${orderCd}'
                        and matl_cd = '${tMatlCd}'
                        and use_size in ('')
                    group by
                        prod_cd
                `;
                var tRet2 = await prisma.$queryRaw(Prisma.raw(sql2));

                var tTotCnt = 0;
                var tIdx2 = 0;
                for (tIdx2 = 0; tIdx2 < tRet2.length; tIdx2++) {
                    var tOrderMrpSeq = tRet2[tIdx2].order_mrp_seq;
                    var tProdCd = tRet2[tIdx2].prod_cd;
                    let sql1 = `
                        select
                            a.matl_cd,
                            sum(c.tot_cnt) as net_tot
                        from
                            ksv_order_mrp a,
                            ksv_order_mem c,
                            kcd_matl_mst b
                        where
                            a.order_cd = '${orderCd}'
                            and a.order_mrp_seq = '${tOrderMrpSeq}'
                            and a.prod_cd = '${tProdCd}'
                            and a.matl_cd = '${tMatlCd}'
                            and a.remark = '${remark}'
                            and a.use_size in ('')
                            -- and c.add_flag='0' 
                            and c.order_cd = a.order_cd
                            and c.prod_cd = a.prod_cd
                            and b.matl_cd = a.matl_cd
                            and b.matl_type2 in ('33')
                        group by
                            a.matl_cd
                    `;
                    var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                    tRet1.forEach((col, i) => {
                        tTotCnt += parseFloat(String(col.net_tot)) || 0;
                    });
                }

                var strLoss = 0.0;
                if (tTotCnt > 800) strLoss = 0.2;
                else if (tTotCnt > 600) strLoss = 0.4;
                else if (tTotCnt > 400) strLoss = 0.6;
                else if (tTotCnt > 200) strLoss = 1.0;
                else strLoss = 1.5;

                var sizeLoss = 0;

                tIdx2 = 0;
                for (tIdx2 = 0; tIdx2 < tRet2.length; tIdx2++) {
                    var tOrderMrpSeq = tRet2[tIdx2].order_mrp_seq;
                    var tProdCd = tRet2[tIdx2].prod_cd;
                    console.log(
                        `===> AdjustLossSubMatlZipper3(2) :${orderCd}, ${tProdCd}, ${tOrderMrpSeq} , ${tMatlCd}, ${userId}: OrderCnt:${tTotCnt} , Loss: ${strLoss}, sizeloss: ${sizeLoss}, addLoss:${addLoss}  `,
                    );
                    let sql4 = `
                        update ksv_order_mrp
                        set
                            -- is_autoloss = '1',
                            std_loss = ${strLoss} + ${addLoss} + ${sizeLoss},
                            std_gross = std_net + std_net * (${strLoss} + ${addLoss}) / 100.0 + std_net * ${sizeLoss} / 100.0,
                            loss = ${strLoss} + ${addLoss} + ${sizeLoss},
                            gross = net + net * (${strLoss} + ${addLoss}) / 100.0 + net * ${sizeLoss} / 100.0
                        where
                            order_cd = '${orderCd}'
                            and prod_cd = '${tProdCd}'
                            and order_mrp_seq = '${tOrderMrpSeq}'
                            and matl_cd = '${tMatlCd}'
                            and use_size = ''
                            and remark = '${remark}'
                    `;
                    var tRet4 = await prisma.$queryRaw(Prisma.raw(sql4));
                }
            }

            let sql01 = `
                select distinct
                    isnull(mid_size, '#') as mid_size,
                    prod_cd
                from
                    ksv_order_mem
                where
                    order_cd = '${orderCd}'
            `;
            var tRet01 = await prisma.$queryRaw(Prisma.raw(sql01));
            var tIdx01 = 0;
            for (tIdx01 = 0; tIdx01 < tRet01.length; tIdx01++) {
                var tProdCd = tRet01[tIdx01].prod_cd;
                var tMidSize1 = tRet01[tIdx01].mid_size;
                var tMidSize2 = '#';
                var tMidSize3 = '#';
                var tMidSize4 = '#';

                let sql0 = `
                    select
                        a.matl_cd,
                        isnull(b.add_loss, 0) as add_loss
                    from
                        ksv_order_mrp a,
                        ksv_order_mem c,
                        kcd_matl_mst b
                    where
                        a.order_cd = '${orderCd}'
                        and a.use_size not in ('${tMidSize1}', '#', '#', '#', '')
                        and a.prod_cd = '${tProdCd}'
                        and c.order_cd = a.order_cd
                        and c.prod_cd = a.prod_cd
                        and b.matl_cd = a.matl_cd
                        and b.matl_type2 in ('33')
                        and b.matl_type <> 'M'
                        and b.vendor_cd not in ('v0313', 'v1874', 'v3357')
                    group by
                        a.matl_cd,
                        b.add_loss
                `;
                var tRet = await prisma.$queryRaw(Prisma.raw(sql0));
                
                console.log(
                    `ADJUST_LOSS(SubMatlZipper3(3)-Step1)=> ${tRet.length} `,
                );

                var tTotCnt = 0;
                var tIdx = 0;
                for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                    var tMatlCd = tRet[tIdx].matl_cd;
                    var addLoss = tRet[tIdx].add_loss;

                    let sql2 = `
                        select
                            max(order_mrp_seq) as order_mrp_seq,
                            prod_cd
                        from
                            ksv_order_mrp
                        where
                            order_cd = '${orderCd}'
                            and prod_cd = '${tProdCd}'
                            and matl_cd = '${tMatlCd}'
                        group by
                            prod_cd
                    `;
                    var tRet2 = await prisma.$queryRaw(Prisma.raw(sql2));

                    var strLoss = 0;
                    var sizeLoss = 0;

                    tIdx2 = 0;
                    for (tIdx2 = 0; tIdx2 < tRet2.length; tIdx2++) {
                        var tOrderMrpSeq = tRet2[tIdx2].order_mrp_seq;
                        console.log(
                            `===> AdjustLossSubMatlZipper3(3) :${orderCd}, ${tProdCd}, ${tOrderMrpSeq} , ${tMatlCd}, ${userId}: OrderCnt:${tTotCnt} , Loss: 0, sizeloss: 0, addLoss:0 `,
                        );
                        let sql4 = `
                            update ksv_order_mrp
                            set
                                -- is_autoloss = '1',
                                std_loss = 0,
                                std_gross = std_net,
                                loss = 0,
                                gross = net
                            from
                                kcd_matl_mst a,
                                ksv_order_mrp b
                            where
                                b.order_cd = '${orderCd}'
                                and b.prod_cd = '${tProdCd}'
                                and b.order_mrp_seq = '${tOrderMrpSeq}'
                                and b.use_size not in ('${tMidSize1}', '#', '#', '#')
                                and a.matl_cd = b.matl_cd
                                and a.matl_type2 in ('33')
                        `;
                        var tRet4 = await prisma.$queryRaw(Prisma.raw(sql4));
                    }
                }
            }
        },
        AdjustLossSubMatlPuller: async (
            orderCd: string,
            orderMrpSeq: string,
            userId: string,
        ) => {
            let sql0 = `
                select distinct
                    a.matl_cd,
                    isnull(b.add_loss, 0) as add_loss
                from
                    ksv_order_mrp a,
                    kcd_matl_mst b,
                    ksv_order_mrp_seqmax c
                where
                    a.order_cd = '${orderCd}'
                    and b.matl_cd = a.matl_cd
                    and b.matl_type2 in ('47', '48')
                    and b.matl_type not in ('M', 'Q')
                    and c.user_id = '${userId}'
                    and c.order_cd = a.order_cd
                    and c.prod_cd = a.prod_cd
                    and c.order_mrp_seq = a.order_mrp_seq
                    and b.vendor_cd not in ('v0313', 'v1874')
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sql0));
            console.log(`ADJUST_LOSS(SubMatlPuller-Step1)=> ${tRet.length} `);

            var tTotCnt = 0;
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tMatlCd = tRet[tIdx].matl_cd;
                var addLoss = tRet[tIdx].add_loss;

                var tTotCnt = 0;

                let sql1 = `
                    select
                        a.matl_cd,
                        sum(a.net * c.tot_cnt) as net_tot
                    from
                        ksv_order_mrp a,
                        ksv_order_mem c,
                        kcd_matl_mst b,
                        ksv_order_mrp_seqmax d
                    where
                        a.order_cd = '${orderCd}'
                        and a.order_mrp_seq = d.order_mrp_seq
                        and d.user_id = '${userId}'
                        and d.order_cd = a.order_cd
                        and d.prod_cd = a.prod_cd
                        and a.matl_cd = '${tMatlCd}'
                        and c.order_cd = a.order_cd
                        and c.prod_cd = a.prod_cd
                        and b.matl_cd = a.matl_cd
                        and b.matl_type2 in ('47', '48')
                    group by
                        a.matl_cd
                `;
                var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                tRet1.forEach((col, i) => {
                    tTotCnt += parseFloat(String(col.net_tot)) || 0;
                });

                var strLoss = 0.0;
                if (tTotCnt > 10000) strLoss = 0.05;
                else if (tTotCnt > 5000) strLoss = 0.1;
                else if (tTotCnt > 3000) strLoss = 0.2;
                else if (tTotCnt > 1000) strLoss = 0.5;
                else strLoss = 1.0;

                var sizeLoss = 0;

                let sql2 = `
                    select
                        max(order_mrp_seq) as order_mrp_seq,
                        prod_cd
                    from
                        ksv_order_mrp
                    where
                        order_cd = '${orderCd}'
                        and matl_cd = '${tMatlCd}'
                    group by
                        prod_cd
                `;
                var tRet2 = await prisma.$queryRaw(Prisma.raw(sql2));

                var tIdx2 = 0;
                for (tIdx2 = 0; tIdx2 < tRet2.length; tIdx2++) {
                    var tOrderMrpSeq = tRet2[tIdx2].order_mrp_seq;
                    var tProdCd = tRet2[tIdx2].prod_cd;

                    console.log(
                        `===> AdjustLossSubMatlPuller :${orderCd}, ${tProdCd}, ${tOrderMrpSeq} , ${tMatlCd}, ${userId}: OrderCnt:${tTotCnt} , Loss: ${strLoss}, sizeloss: ${sizeLoss}, addLoss:${addLoss}  `,
                    );
                    let sql4 = `
                        update ksv_order_mrp
                        set
                            -- is_autoloss = '1',
                            std_loss = ${strLoss} + ${addLoss} + ${sizeLoss},
                            std_gross = std_net + std_net * (${strLoss} + ${addLoss}) / 100.0 + std_net * ${sizeLoss} / 100.0,
                            loss = ${strLoss} + ${addLoss} + ${sizeLoss},
                            gross = net + net * (${strLoss} + ${addLoss}) / 100.0 + net * ${sizeLoss} / 100.0
                        where
                            order_cd = '${orderCd}'
                            and prod_cd = '${tProdCd}'
                            and order_mrp_seq = '${tOrderMrpSeq}'
                            and matl_cd = '${tMatlCd}'
                    `;
                    var tRet4 = await prisma.$queryRaw(Prisma.raw(sql4));
                }
            }
        },
        AdjustLossSubMatlStopper: async (
            orderCd: string,
            orderMrpSeq: string,
            userId: string,
        ) => {
            let sql0 = `
                select distinct
                    a.matl_cd,
                    isnull(b.add_loss, 0) as add_loss
                from
                    ksv_order_mrp a,
                    kcd_matl_mst b,
                    ksv_order_mrp_seqmax c
                where
                    a.order_cd = '${orderCd}'
                    and b.matl_cd = a.matl_cd
                    and b.matl_type2 in ('29', '32')
                    and b.matl_type not in ('M', 'Q')
                    and c.user_id = '${userId}'
                    and c.order_cd = a.order_cd
                    and c.prod_cd = a.prod_cd
                    and c.order_mrp_seq = a.order_mrp_seq
                    and b.vendor_cd not in ('v0313', 'v1874')
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sql0));
            console.log(`ADJUST_LOSS(SubMatlStopper-Step1)=> ${tRet.length} `);

            var tTotCnt = 0;
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tMatlCd = tRet[tIdx].matl_cd;
                var addLoss = tRet[tIdx].add_loss;

                var tTotCnt = 0;

                let sql1 = `
                    select
                        a.matl_cd,
                        sum(a.net * c.tot_cnt) as net_tot
                    from
                        ksv_order_mrp a,
                        ksv_order_mem c,
                        kcd_matl_mst b,
                        ksv_order_mrp_seqmax d
                    where
                        a.order_cd = '${orderCd}'
                        and a.order_mrp_seq = d.order_mrp_seq
                        and d.user_id = '${userId}'
                        and d.order_cd = a.order_cd
                        and d.prod_cd = a.prod_cd
                        and a.matl_cd = '${tMatlCd}'
                        and c.order_cd = a.order_cd
                        and c.prod_cd = a.prod_cd
                        and b.matl_cd = a.matl_cd
                        and b.matl_type2 in ('29', '32')
                    group by
                        a.matl_cd
                `;
                var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                tRet1.forEach((col, i) => {
                    tTotCnt += parseFloat(String(col.net_tot)) || 0;
                });

                var strLoss = 0.0;
                if (tTotCnt > 10000) strLoss = 0.05;
                else if (tTotCnt > 5000) strLoss = 0.1;
                else if (tTotCnt > 3000) strLoss = 0.2;
                else if (tTotCnt > 1000) strLoss = 0.5;
                else strLoss = 1.0;

                var sizeLoss = 0;

                let sql2 = `
                    select
                        max(order_mrp_seq) as order_mrp_seq,
                        prod_cd
                    from
                        ksv_order_mrp
                    where
                        order_cd = '${orderCd}'
                        and matl_cd = '${tMatlCd}'
                    group by
                        prod_cd
                `;
                var tRet2 = await prisma.$queryRaw(Prisma.raw(sql2));

                var tIdx2 = 0;
                for (tIdx2 = 0; tIdx2 < tRet2.length; tIdx2++) {
                    var tOrderMrpSeq = tRet2[tIdx2].order_mrp_seq;
                    var tProdCd = tRet2[tIdx2].prod_cd;

                    console.log(
                        `===> AdjustLossSubMatlStopper :${orderCd}, ${tProdCd}, ${tOrderMrpSeq} , ${tMatlCd}, ${userId}: OrderCnt:${tTotCnt} , Loss: ${strLoss}, sizeloss: ${sizeLoss}, addLoss:${addLoss}  `,
                    );
                    let sql4 = `
                        update ksv_order_mrp
                        set
                            -- is_autoloss = '1',
                            std_loss = ${strLoss} + ${addLoss} + ${sizeLoss},
                            std_gross = std_net + std_net * (${strLoss} + ${addLoss}) / 100.0 + std_net * ${sizeLoss} / 100.0,
                            loss = ${strLoss} + ${addLoss} + ${sizeLoss},
                            gross = net + net * (${strLoss} + ${addLoss}) / 100.0 + net * ${sizeLoss} / 100.0
                        where
                            order_cd = '${orderCd}'
                            and prod_cd = '${tProdCd}'
                            and order_mrp_seq = '${tOrderMrpSeq}'
                            and matl_cd = '${tMatlCd}'
                    `;
                    var tRet4 = await prisma.$queryRaw(Prisma.raw(sql4));
                }
            }
        },
        AdjustLossSubMatlTransfer: async (
            orderCd: string,
            orderMrpSeq: string,
            userId: string,
        ) => {
            let sql0 = `
                select distinct
                    a.matl_cd,
                    isnull(b.add_loss, 0) as add_loss
                from
                    ksv_order_mrp a,
                    kcd_matl_mst b,
                    ksv_order_mrp_seqmax c
                where
                    a.order_cd = '${orderCd}'
                    and b.matl_cd = a.matl_cd
                    and b.matl_type2 in ('69')
                    and b.matl_type not in ('M', 'Q')
                    and c.user_id = '${userId}'
                    and c.order_cd = a.order_cd
                    and c.prod_cd = a.prod_cd
                    and c.order_mrp_seq = a.order_mrp_seq
                    and b.vendor_cd not in ('v0313', 'v1874')
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sql0));
            console.log(`ADJUST_LOSS(SubMatlTransfer-Step1)=> ${tRet.length} `);

            var tTotCnt = 0;
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tMatlCd = tRet[tIdx].matl_cd;
                var addLoss = tRet[tIdx].add_loss;

                var tTotCnt = 0;

                let sql1 = `
                    select
                        a.matl_cd,
                        sum(a.net * c.tot_cnt) as net_tot
                    from
                        ksv_order_mrp a,
                        ksv_order_mem c,
                        kcd_matl_mst b,
                        ksv_order_mrp_seqmax d
                    where
                        a.order_cd = '${orderCd}'
                        and a.order_mrp_seq = d.order_mrp_seq
                        and d.user_id = '${userId}'
                        and d.order_cd = a.order_cd
                        and d.prod_cd = a.prod_cd
                        and a.matl_cd = '${tMatlCd}'
                        and c.order_cd = a.order_cd
                        and c.prod_cd = a.prod_cd
                        and b.matl_cd = a.matl_cd
                        and b.matl_type2 in ('69')
                    group by
                        a.matl_cd
                `;
                var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                tRet1.forEach((col, i) => {
                    tTotCnt += parseFloat(String(col.net_tot)) || 0;
                });

                var strLoss = 0.0;
                if (tTotCnt > 20000) strLoss = 0.2;
                else if (tTotCnt > 10000) strLoss = 0.5;
                else if (tTotCnt > 5000) strLoss = 0.8;
                else if (tTotCnt > 3000) strLoss = 1.0;
                else if (tTotCnt > 1000) strLoss = 1.5;
                else if (tTotCnt > 600) strLoss = 2.5;
                else strLoss = 3.0;

                var sizeLoss = 0;

                let sql2 = `
                    select
                        max(order_mrp_seq) as order_mrp_seq,
                        prod_cd
                    from
                        ksv_order_mrp
                    where
                        order_cd = '${orderCd}'
                        and matl_cd = '${tMatlCd}'
                    group by
                        prod_cd
                `;
                var tRet2 = await prisma.$queryRaw(Prisma.raw(sql2));

                var tIdx2 = 0;
                for (tIdx2 = 0; tIdx2 < tRet2.length; tIdx2++) {
                    var tOrderMrpSeq = tRet2[tIdx2].order_mrp_seq;
                    var tProdCd = tRet2[tIdx2].prod_cd;

                    console.log(
                        `===> AdjustLossSubMatlTransfer :${orderCd}, ${tProdCd}, ${tOrderMrpSeq} , ${tMatlCd}, ${userId}: OrderCnt:${tTotCnt} , Loss: ${strLoss}, sizeloss: ${sizeLoss}, addLoss:${addLoss}  `,
                    );
                    let sql4 = `
                        update ksv_order_mrp
                        set
                            -- is_autoloss = '1',
                            std_loss = ${strLoss} + ${addLoss} + ${sizeLoss},
                            std_gross = std_net + std_net * (${strLoss} + ${addLoss}) / 100.0 + std_net * ${sizeLoss} / 100.0,
                            loss = ${strLoss} + ${addLoss} + ${sizeLoss},
                            gross = net + net * (${strLoss} + ${addLoss}) / 100.0 + net * ${sizeLoss} / 100.0
                        where
                            order_cd = '${orderCd}'
                            and prod_cd = '${tProdCd}'
                            and order_mrp_seq = '${tOrderMrpSeq}'
                            and matl_cd = '${tMatlCd}'
                    `;
                    var tRet4 = await prisma.$queryRaw(Prisma.raw(sql4));
                }
            }
        },
        AdjustLossSubMatlSnap: async (
            orderCd: string,
            orderMrpSeq: string,
            userId: string,
        ) => {
            let sql0 = `
                select distinct
                    a.matl_cd,
                    isnull(b.add_loss, 0) as add_loss
                from
                    ksv_order_mrp a,
                    kcd_matl_mst b,
                    ksv_order_mrp_seqmax c
                where
                    a.order_cd = '${orderCd}'
                    and b.matl_cd = a.matl_cd
                    and b.matl_type2 in ('30', '49', '66')
                    and b.matl_type not in ('M', 'Q')
                    and c.user_id = '${userId}'
                    and c.order_cd = a.order_cd
                    and c.prod_cd = a.prod_cd
                    and c.order_mrp_seq = a.order_mrp_seq
                    and b.vendor_cd not in ('v0313', 'v1874')
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sql0));
            console.log(`ADJUST_LOSS(SubMatlSnap-Step1)=> ${tRet.length} `);

            var tTotCnt = 0;
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tMatlCd = tRet[tIdx].matl_cd;
                var addLoss = tRet[tIdx].add_loss;

                var tTotCnt = 0;

                let sql1 = `
                    select
                        a.matl_cd,
                        sum(a.net * c.tot_cnt) as net_tot
                    from
                        ksv_order_mrp a,
                        ksv_order_mem c,
                        kcd_matl_mst b,
                        ksv_order_mrp_seqmax d
                    where
                        a.order_cd = '${orderCd}'
                        and a.order_mrp_seq = d.order_mrp_seq
                        and d.user_id = '${userId}'
                        and d.order_cd = a.order_cd
                        and d.prod_cd = a.prod_cd
                        and a.matl_cd = '${tMatlCd}'
                        and c.order_cd = a.order_cd
                        and c.prod_cd = a.prod_cd
                        and b.matl_cd = a.matl_cd
                        and b.matl_type2 in ('30', '49', '66')
                    group by
                        a.matl_cd
                `;
                var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                tRet1.forEach((col, i) => {
                    tTotCnt += parseFloat(String(col.net_tot)) || 0;
                });

                var strLoss = 0.0;
                if (tTotCnt > 10000) strLoss = 0.1;
                else if (tTotCnt > 5000) strLoss = 0.2;
                else if (tTotCnt > 3000) strLoss = 0.5;
                else if (tTotCnt > 1000) strLoss = 1.0;
                else strLoss = 2.0;

                var sizeLoss = 0;

                let sql2 = `
                    select
                        max(order_mrp_seq) as order_mrp_seq,
                        prod_cd
                    from
                        ksv_order_mrp
                    where
                        order_cd = '${orderCd}'
                        and matl_cd = '${tMatlCd}'
                    group by
                        prod_cd
                `;
                var tRet2 = await prisma.$queryRaw(Prisma.raw(sql2));

                var tIdx2 = 0;
                for (tIdx2 = 0; tIdx2 < tRet2.length; tIdx2++) {
                    var tOrderMrpSeq = tRet2[tIdx2].order_mrp_seq;
                    var tProdCd = tRet2[tIdx2].prod_cd;

                    console.log(
                        `===> AdjustLossSubMatlSnap :${orderCd}, ${tProdCd}, ${tOrderMrpSeq} , ${tMatlCd}, ${userId}: OrderCnt:${tTotCnt} , Loss: ${strLoss}, sizeloss: ${sizeLoss}, addLoss:${addLoss}  `,
                    );
                    let sql4 = `
                        update ksv_order_mrp
                        set
                            -- is_autoloss = '1',
                            std_loss = ${strLoss} + ${addLoss} + ${sizeLoss},
                            std_gross = std_net + std_net * (${strLoss} + ${addLoss}) / 100.0 + std_net * ${sizeLoss} / 100.0,
                            loss = ${strLoss} + ${addLoss} + ${sizeLoss},
                            gross = net + net * (${strLoss} + ${addLoss}) / 100.0 + net * ${sizeLoss} / 100.0
                        where
                            order_cd = '${orderCd}'
                            and prod_cd = '${tProdCd}'
                            and order_mrp_seq = '${tOrderMrpSeq}'
                            and matl_cd = '${tMatlCd}'
                    `;
                    var tRet4 = await prisma.$queryRaw(Prisma.raw(sql4));
                }
            }
        },
        AdjustLossSubMatlLabel: async (
            orderCd: string,
            orderMrpSeq: string,
            userId: string,
        ) => {
            let sql0 = `
                select distinct
                    a.matl_cd,
                    isnull(b.add_loss, 0) as add_loss
                from
                    ksv_order_mrp a,
                    kcd_matl_mst b,
                    ksv_order_mrp_seqmax c
                where
                    a.order_cd = '${orderCd}'
                    and b.matl_cd = a.matl_cd
                    and b.matl_type2 in ('55', '56')
                    and b.matl_type not in ('M', 'Q')
                    and c.user_id = '${userId}'
                    and c.order_cd = a.order_cd
                    and c.prod_cd = a.prod_cd
                    and c.order_mrp_seq = a.order_mrp_seq
                    and b.vendor_cd not in ('v0313', 'v1874')
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sql0));
            console.log(`ADJUST_LOSS(SubMatlLabel-Step1)=> ${tRet.length} `);

            var tTotCnt = 0;
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tMatlCd = tRet[tIdx].matl_cd;
                var addLoss = tRet[tIdx].add_loss;

                var tTotCnt = 0;
                var strLoss = 0.0;
                var sizeLoss = 0;

                let sql2 = `
                    select
                        max(order_mrp_seq) as order_mrp_seq,
                        prod_cd
                    from
                        ksv_order_mrp
                    where
                        order_cd = '${orderCd}'
                        and matl_cd = '${tMatlCd}'
                    group by
                        prod_cd
                `;
                var tRet2 = await prisma.$queryRaw(Prisma.raw(sql2));

                var tIdx2 = 0;
                for (tIdx2 = 0; tIdx2 < tRet2.length; tIdx2++) {
                    var tOrderMrpSeq = tRet2[tIdx2].order_mrp_seq;
                    var tProdCd = tRet2[tIdx2].prod_cd;

                    console.log(
                        `===> AdjustLossSubMatlLabel :${orderCd}, ${tProdCd}, ${tOrderMrpSeq} , ${tMatlCd}, ${userId}: OrderCnt:${tTotCnt} , Loss: ${strLoss}, sizeloss: ${sizeLoss}, addLoss:${addLoss}  `,
                    );
                    let sql4 = `
                        update ksv_order_mrp
                        set
                            -- is_autoloss = '1',
                            std_loss = ${strLoss} + ${addLoss} + ${sizeLoss},
                            std_gross = std_net + std_net * (${strLoss} + ${addLoss}) / 100.0 + std_net * ${sizeLoss} / 100.0,
                            loss = ${strLoss} + ${addLoss} + ${sizeLoss},
                            gross = net + net * (${strLoss} + ${addLoss}) / 100.0 + net * ${sizeLoss} / 100.0
                        where
                            order_cd = '${orderCd}'
                            and prod_cd = '${tProdCd}'
                            and order_mrp_seq = '${tOrderMrpSeq}'
                            and matl_cd = '${tMatlCd}'
                    `;
                    var tRet4 = await prisma.$queryRaw(Prisma.raw(sql4));
                }
            }
        },
        AdjustLossSubMatlRemain: async (
            orderCd: string,
            orderMrpSeq: string,
            userId: string,
        ) => {
            let sql0 = `
                select distinct
                    a.matl_cd,
                    isnull(b.add_loss, 0) as add_loss
                from
                    ksv_order_mrp a,
                    kcd_matl_mst b,
                    ksv_order_mrp_seqmax c
                where
                    a.order_cd = '${orderCd}'
                    and b.matl_cd = a.matl_cd
                    and b.matl_type2 not in (
                        '25',
                        '45',
                        '54',
                        '64',
                        '68',
                        '22',
                        '26',
                        '27',
                        '24',
                        '31',
                        '28',
                        '46',
                        '33',
                        '47',
                        '48',
                        '55',
                        '56',
                        '29',
                        '32',
                        '69',
                        '30',
                        '49',
                        '66'
                    )
                    and b.matl_type not in ('M', 'Q')
                    and c.user_id = '${userId}'
                    and c.order_cd = a.order_cd
                    and c.prod_cd = a.prod_cd
                    and c.order_mrp_seq = a.order_mrp_seq
                    and b.vendor_cd not in ('v0313', 'v1874')
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sql0));
            console.log(`ADJUST_LOSS(SubMatlRemain-Step1)=> ${tRet.length} `);

            var tTotCnt = 0;
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tMatlCd = tRet[tIdx].matl_cd;
                var addLoss = tRet[tIdx].add_loss;

                var tTotCnt = 0;
                var strLoss = 0.0;
                var sizeLoss = 0;

                let sql2 = `
                    select
                        max(order_mrp_seq) as order_mrp_seq,
                        prod_cd
                    from
                        ksv_order_mrp
                    where
                        order_cd = '${orderCd}'
                        and matl_cd = '${tMatlCd}'
                    group by
                        prod_cd
                `;
                var tRet2 = await prisma.$queryRaw(Prisma.raw(sql2));

                var tIdx2 = 0;
                for (tIdx2 = 0; tIdx2 < tRet2.length; tIdx2++) {
                    var tOrderMrpSeq = tRet2[tIdx2].order_mrp_seq;
                    var tProdCd = tRet2[tIdx2].prod_cd;

                    console.log(
                        `===> AdjustLossSubMatlRemain :${orderCd}, ${tProdCd}, ${tOrderMrpSeq} , ${tMatlCd}, ${userId}: OrderCnt:${tTotCnt} , Loss: ${strLoss}, sizeloss: ${sizeLoss}, addLoss:${addLoss}  `,
                    );
                    let sql4 = `
                        update ksv_order_mrp
                        set
                            -- is_autoloss = '1',
                            std_loss = ${strLoss} + ${addLoss} + ${sizeLoss},
                            std_gross = std_net + std_net * (${strLoss} + ${addLoss}) / 100.0 + std_net * ${sizeLoss} / 100.0,
                            loss = ${strLoss} + ${addLoss} + ${sizeLoss},
                            gross = net + net * (${strLoss} + ${addLoss}) / 100.0 + net * ${sizeLoss} / 100.0
                        where
                            order_cd = '${orderCd}'
                            and prod_cd = '${tProdCd}'
                            and order_mrp_seq = '${tOrderMrpSeq}'
                            and matl_cd = '${tMatlCd}'
                    `;
                    var tRet4 = await prisma.$queryRaw(Prisma.raw(sql4));
                }
            }
        },
        AdjustSizeLossSubMatl: async (
            orderCd: string,
            orderMrpSeq: string,
            userId: string,
        ) => {
            let sql0 = `
                select distinct
                    a.matl_cd,
                    isnull(b.add_loss, 0) as add_loss
                from
                    ksv_order_mrp a,
                    kcd_matl_mst b,
                    ksv_order_mrp_seqmax c
                where
                    a.order_cd = '${orderCd}'
                    and b.matl_cd = a.matl_cd
                    and b.matl_type2 in (
                        '25',
                        '45',
                        '54',
                        '46',
                        '28',
                        '24',
                        '26',
                        '27',
                        '53'
                    )
                    and b.matl_type not in ('M', 'Q')
                    and c.user_id = '${userId}'
                    and c.order_cd = a.order_cd
                    and c.prod_cd = a.prod_cd
                    and c.order_mrp_seq = a.order_mrp_seq
                    and b.unit <> 'PC'
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sql0));
            console.log(`ADJUST_LOSS(SizeLossSubMatl-Step1)=> ${tRet.length} `);

            var tTotCnt = 0;
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tMatlCd = tRet[tIdx].matl_cd;
                var addLoss = tRet[tIdx].add_loss;

                var tTotCnt = 0;

                let sql1 = `
                    select
                        max(a.order_mrp_seq) as order_mrp_seq,
                        a.prod_cd,
                        isnull(c.size_loss, 0) as size_loss
                    from
                        ksv_order_mrp a,
                        ksv_prod_mst b,
                        ksv_order_mem c
                    where
                        a.order_cd = '${orderCd}'
                        and a.matl_cd = '${tMatlCd}'
                        and a.prod_cd = b.prod_cd
                        and c.prod_cd = a.prod_cd
                        and c.order_cd = a.order_cd
                        and cast(c.size_loss as float) > 0
                    group by
                        a.prod_cd,
                        c.size_loss
                `;
                var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));

                var sizeLoss = 0;
                var strLoss = 0;

                var tIdx2 = 0;
                for (tIdx2 = 0; tIdx2 < tRet1.length; tIdx2++) {
                    var tOrderMrpSeq = tRet1[tIdx2].order_mrp_seq;
                    var tProdCd = tRet1[tIdx2].prod_cd;
                    sizeLoss = tRet1[tIdx2].size_loss;

                    console.log(
                        `===> AdjustLossSizeLossSubMatl :${orderCd}, ${tProdCd}, ${tOrderMrpSeq} , ${tMatlCd}, ${userId}: OrderCnt:${tTotCnt} , Loss: ${strLoss}, sizeloss: ${sizeLoss}, addLoss:${addLoss}  `,
                    );

                    let sql4 = `
                        update ksv_order_mrp
                        set
                            -- is_autoloss = '1',
                            std_loss = std_loss + ${sizeLoss},
                            std_gross = std_net + std_net * (std_loss + ${sizeLoss}) / 100.0,
                            loss = loss + ${sizeLoss},
                            gross = net + net * (loss + ${sizeLoss}) / 100.0
                        where
                            order_cd = '${orderCd}'
                            and prod_cd = '${tProdCd}'
                            and order_mrp_seq = '${tOrderMrpSeq}'
                            and matl_cd = '${tMatlCd}'
                    `;
                    var tRet4 = await prisma.$queryRaw(Prisma.raw(sql4));
                }
            }
        },
        AdjustLossETPMainMatl: async (
            orderCd: string,
            orderMrpSeq: string,
            userId: string,
        ) => {
            let sql0 = `
                select distinct
                    a.matl_cd,
                    isnull(b.add_loss, 0) as add_loss,
                    a.remark
                from
                    ksv_order_mrp a,
                    kcd_matl_mst b,
                    ksv_order_mrp_seqmax c
                where
                    a.order_cd = '${orderCd}'
                    and b.matl_cd = a.matl_cd
                    and b.matl_type in ('M', 'Q')
                    and c.user_id = '${userId}'
                    and c.order_cd = a.order_cd
                    and c.prod_cd = a.prod_cd
                    and c.order_mrp_seq = a.order_mrp_seq
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sql0));
            console.log(`ADJUST_LOSS(ETPMainMatl-Step1)=> ${tRet.length} `);

            var tTotCnt = 0;
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tMatlCd = tRet[tIdx].matl_cd;
                var addLoss = tRet[tIdx].add_loss;
                var tRemark = (tRet[tIdx].remark || '').replace(/'/g, "''");

                var tTotCnt = 0;

                let sql1 = `
                    select
                        sum(tot_cnt) as t_cnt
                    from
                        ksv_order_mem
                    where
                        order_cd = '${orderCd}'
                        and prod_cd in (
                            select
                                a.prod_cd
                            from
                                ksv_order_mrp a,
                                ksv_order_mrp_seqmax c
                            where
                                a.order_cd = '${orderCd}'
                                and matl_cd = '${tMatlCd}'
                                and c.user_id = '${userId}'
                                and a.remark = '${tRemark}'
                                and c.prod_cd = a.prod_cd
                                and c.order_cd = a.order_cd
                                and c.order_mrp_seq = a.order_mrp_seq
                        )
                `;
                var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                tRet1.forEach((col, i) => {
                    tTotCnt += col.t_cnt;
                });

                var strLoss = 0.0;
                if (tTotCnt >= 10000) strLoss = 0.3;
                else if (tTotCnt >= 9000) strLoss = 0.4;
                else if (tTotCnt >= 8000) strLoss = 0.5;
                else if (tTotCnt >= 7000) strLoss = 0.55;
                else if (tTotCnt >= 6000) strLoss = 0.60;
                else if (tTotCnt >= 5000) strLoss = 0.7;
                else if (tTotCnt >= 4000) strLoss = 0.75;
                else if (tTotCnt >= 3000) strLoss = 0.80;
                else if (tTotCnt >= 2000) strLoss = 0.85;
                else if (tTotCnt >= 1000) strLoss = 0.90;
                else if (tTotCnt >= 900) strLoss = 0.90;
                else if (tTotCnt >= 800) strLoss = 1.0;
                else if (tTotCnt >= 700) strLoss = 1.1;
                else if (tTotCnt >= 600) strLoss = 1.12;
                else if (tTotCnt >= 500) strLoss = 1.25;
                else if (tTotCnt >= 400) strLoss = 1.30;
                else if (tTotCnt >= 300) strLoss = 1.50;
                else if (tTotCnt >= 200) strLoss = 1.70;
                else if (tTotCnt >= 100) strLoss = 2.00;
                else strLoss = 2.00;

                let sql2 = `
                    select
                        max(order_mrp_seq) as order_mrp_seq,
                        prod_cd
                    from
                        ksv_order_mrp
                    where
                        order_cd = '${orderCd}'
                        and matl_cd = '${tMatlCd}'
                    group by
                        prod_cd
                `;
                var tRet2 = await prisma.$queryRaw(Prisma.raw(sql2));
                var tIdx1 = 0;
                for (tIdx1 = 0; tIdx1 < tRet2.length; tIdx1++) {
                    var tOrderMrpSeq = tRet2[tIdx1].order_mrp_seq;
                    var tProdCd = tRet2[tIdx1].prod_cd;

                    var sizeLoss = 0.0;
                    let sql3 = `
                        select
                            size_loss
                        from
                            ksv_order_mem
                        where
                            order_cd = '${orderCd}'
                            and prod_cd = '${tProdCd}'
                    `;
                    var tRet3 = await prisma.$queryRaw(Prisma.raw(sql3));
                    if (tRet3.length > 0) sizeLoss = tRet3[0].size_loss;

                    console.log(
                        `===> AdjustLossETPMainMatl:${orderCd}, ${tProdCd}, ${tOrderMrpSeq} , ${tMatlCd}, ${userId}: OrderCnt:${tTotCnt} , Loss: ${strLoss}, sizeloss: ${sizeLoss}, addLoss:${addLoss}  `,
                    );
                    let sql4 = `
                        update ksv_order_mrp
                        set
                            -- is_autoloss = '1',
                            std_loss = ${strLoss} + ${addLoss} + ${sizeLoss},
                            std_gross = std_net + std_net * (${strLoss} + ${addLoss}) / 100.0 + std_net * ${sizeLoss} / 100.0,
                            loss = ${strLoss} + ${addLoss} + ${sizeLoss},
                            gross = net + net * (${strLoss} + ${addLoss}) / 100.0 + net * ${sizeLoss} / 100.0
                        where
                            order_cd = '${orderCd}'
                            and prod_cd = '${tProdCd}'
                            and order_mrp_seq = '${tOrderMrpSeq}'
                            and matl_cd = '${tMatlCd}'
                    `;
                    var tRet4 = await prisma.$queryRaw(Prisma.raw(sql4));
                }
            }
        },
        AdjustLossETPMainMatlSample: async (
            orderCd: string,
            orderMrpSeq: string,
            userId: string,
        ) => {
            let sql0 = `
                select distinct
                    a.matl_cd,
                    isnull(b.add_loss, 0) as add_loss
                    ,a.remark
                from
                    ksv_order_mrp a,
                    kcd_matl_mst b,
                    ksv_order_mrp_seqmax c
                where
                    a.order_cd = '${orderCd}'
                    and b.matl_cd = a.matl_cd
                    and b.matl_type in ('M', 'Q')
                    and c.user_id = '${userId}'
                    and c.order_cd = a.order_cd
                    and c.prod_cd = a.prod_cd
                    and c.order_mrp_seq = a.order_mrp_seq
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sql0));
            console.log(
                `ADJUST_LOSS(ETPMainMatlSample-Step1)=> ${tRet.length} `,
            );

            var tTotCnt = 0;
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tMatlCd = tRet[tIdx].matl_cd;
                var addLoss = tRet[tIdx].add_loss;
                var tRemark = (tRet[tIdx].remark || '').replace(/'/g, "''");

                var tTotCnt = 0;

                let sql1 = `
                    select
                        sum(tot_cnt) as t_cnt
                    from
                        ksv_order_mem
                    where
                        order_cd = '${orderCd}'
                        and prod_cd in (
                            select
                                a.prod_cd
                            from
                                ksv_order_mrp a,
                                ksv_order_mrp_seqmax c
                            where
                                a.order_cd = '${orderCd}'
                                and matl_cd = '${tMatlCd}'
                                and c.user_id = '${userId}'
                                and a.remark = '${tRemark}'
                                and c.prod_cd = a.prod_cd
                                and c.order_cd = a.order_cd
                                and c.order_mrp_seq = a.order_mrp_seq
                        )
                `;
                var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                tRet1.forEach((col, i) => {
                    tTotCnt += col.t_cnt;
                });

                var strLoss = 0.0;
                if (tTotCnt >= 51) strLoss = 15.0;
                else if (tTotCnt >= 21) strLoss = 20.0;
                else strLoss = 30.0;

                let sql2 = `
                    select
                        max(order_mrp_seq) as order_mrp_seq,
                        prod_cd
                    from
                        ksv_order_mrp
                    where
                        order_cd = '${orderCd}'
                        and matl_cd = '${tMatlCd}'
                    group by
                        prod_cd
                `;
                var tRet2 = await prisma.$queryRaw(Prisma.raw(sql2));
                var tIdx1 = 0;
                for (tIdx1 = 0; tIdx1 < tRet2.length; tIdx1++) {
                    var tOrderMrpSeq = tRet2[tIdx1].order_mrp_seq;
                    var tProdCd = tRet2[tIdx1].prod_cd;

                    var sizeLoss = 0.0;
                    addLoss = 0;

                    console.log(
                        `===> AdjustLossETPMainMatlSample :${orderCd}, ${tProdCd}, ${tOrderMrpSeq} , ${tMatlCd}, ${userId}: OrderCnt:${tTotCnt} , Loss: ${strLoss}, sizeloss: ${sizeLoss}, addLoss:${addLoss}  `,
                    );
                    let sql4 = `
                        update ksv_order_mrp
                        set
                            -- is_autoloss = '1',
                            std_loss = ${strLoss} + ${addLoss} + ${sizeLoss},
                            std_gross = std_net + std_net * (${strLoss} + ${addLoss}) / 100.0 + std_net * ${sizeLoss} / 100.0,
                            loss = ${strLoss} + ${addLoss} + ${sizeLoss},
                            gross = net + net * (${strLoss} + ${addLoss}) / 100.0 + net * ${sizeLoss} / 100.0
                        where
                            order_cd = '${orderCd}'
                            and prod_cd = '${tProdCd}'
                            and order_mrp_seq = '${tOrderMrpSeq}'
                            and matl_cd = '${tMatlCd}'
                    `;
                    var tRet4 = await prisma.$queryRaw(Prisma.raw(sql4));
                }
            }
        },
        AdjustLossETPSubMatl: async (
            orderCd: string,
            orderMrpSeq: string,
            userId: string,
        ) => {
            let sql0 = `
                select distinct
                    a.matl_cd,
                    b.matl_type2
                from
                    ksv_order_mrp a,
                    kcd_matl_mst b
                where
                    a.order_cd = '${orderCd}'
                    and b.matl_cd = a.matl_cd
                    and b.matl_type not in ('M', 'Q')
                    and b.matl_type2 not in (
                        '55',
                        '33',
                        '29',
                        '32',
                        '47',
                        '48',
                        '56',
                        '60',
                        '30',
                        '49',
                        '66',
                        '87',
                        '96'
                    )
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sql0));
            console.log(`ADJUST_LOSS(ETPSubMatl-Step1)=> ${tRet.length} `);

            var tTotCnt = 0;
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tMatlCd = tRet[tIdx].matl_cd;
                var tMatlType2 = tRet[tIdx].matl_type2;

                var strLoss = 0;
                if (parseInt(tMatlType2) === 59) strLoss = 0;
                else if (parseInt(tMatlType2) === 51) strLoss = 0.5;
                else if (parseInt(tMatlType2) === 70) strLoss = 1;
                else if (parseInt(tMatlType2) === 55) strLoss = 2;
                else if (parseInt(tMatlType2) === 81) strLoss = 3;
                else if (parseInt(tMatlType2) === 22) strLoss = 5;
                else if (parseInt(tMatlType2) === 31) strLoss = 5;
                else if (parseInt(tMatlType2) === 54) strLoss = 7;
                else if (parseInt(tMatlType2) === 57) strLoss = 10;
                else if (parseInt(tMatlType2) === 64) strLoss = 5;
                else if (parseInt(tMatlType2) === 68) strLoss = 5;
                else if (parseInt(tMatlType2) === 24) strLoss = 2;
                else if (parseInt(tMatlType2) === 61) strLoss = 10;
                else continue;

                var tBuyerCd = orderCd.substring(0,2);
                if (tBuyerCd === 'PN' || tBuyerCd === 'DE') {
                    if (parseFloat(tMatlType2) === 57) strLoss = 0;
                }
                if (tBuyerCd === 'SM') {
                    if (parseFloat(tMatlType2)  === 57) strLoss = 3.0;
                }

                let sql1 = `
                    select
                        max(order_mrp_seq) as order_mrp_seq,
                        prod_cd
                    from
                        ksv_order_mrp
                    where
                        order_cd = '${orderCd}'
                        and matl_cd = '${tMatlCd}'
                    group by
                        prod_cd
                `;
                var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                var sizeLoss = 0;
                var addLoss = 0;

                var tIdx1 = 0;
                for (tIdx1 = 0; tIdx1 < tRet1.length; tIdx1++) {
                    var tOrderMrpSeq = tRet1[tIdx1].order_mrp_seq;
                    var tProdCd = tRet1[tIdx1].prod_cd;

                    console.log(
                        `===> AdjustLossETPSubMatl :${orderCd}, ${tProdCd}, ${tOrderMrpSeq} , ${tMatlCd}, ${userId}: OrderCnt:${tTotCnt} , Loss: ${strLoss}, sizeloss: ${sizeLoss}, addLoss:${addLoss}  `,
                    );

                    let sql4 = `
                        update ksv_order_mrp
                        set
                            -- is_autoloss = '1',
                            std_loss = ${strLoss},
                            std_gross = std_net + std_net * ${strLoss} / 100.0,
                            loss = ${strLoss},
                            gross = net + net * ${strLoss} / 100.0
                        where
                            order_cd = '${orderCd}'
                            and prod_cd = '${tProdCd}'
                            and order_mrp_seq = '${tOrderMrpSeq}'
                            and matl_cd = '${tMatlCd}'
                    `;
                    var tRet4 = await prisma.$queryRaw(Prisma.raw(sql4));
                }
            }
        },
        AdjustLossETPSubMatl2: async (
            orderCd: string,
            orderMrpSeq: string,
            userId: string,
        ) => {
            //
            let sql0 = `
                select distinct
                    a.matl_cd,
                    isnull(b.add_loss, 0) as add_loss
                from
                    ksv_order_mrp a,
                    kcd_matl_mst b,
                    ksv_order_mrp_seqmax c
                where
                    a.order_cd = '${orderCd}'
                    and b.matl_cd = a.matl_cd
                    and b.matl_type2 in (
                        '25',
                        '26',
                        '27',
                        '31',
                        '45',
                        '54'
                    )
                    and b.matl_type not in ('M', 'Q')
                    and c.user_id = '${userId}'
                    and c.order_cd = a.order_cd
                    and c.prod_cd = a.prod_cd
                    and c.order_mrp_seq = a.order_mrp_seq
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sql0));
            console.log(`AdjustLossETPSubMatl2(SizeLossSubMatl-Step1)=> ${tRet.length} `);

            var tTotCnt = 0;
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tMatlCd = tRet[tIdx].matl_cd;
                var addLoss = tRet[tIdx].add_loss;

                let sql1 = `
                    select
                        a.matl_cd,
                        sum(a.net * c.tot_cnt) as net_tot
                    from
                        ksv_order_mrp a,
                        ksv_order_mem c,
                        kcd_matl_mst b,
                        ksv_order_mrp_seqmax d
                    where
                        a.order_cd = '${orderCd}'
                        and a.order_mrp_seq = d.order_mrp_seq
                        and d.user_id = '${userId}'
                        and d.order_cd = a.order_cd
                        and d.prod_cd = a.prod_cd
                        and a.matl_cd = '${tMatlCd}'
                        and c.order_cd = a.order_cd
                        and c.prod_cd = a.prod_cd
                        and b.matl_cd = a.matl_cd
                        and b.matl_type2 in ('25','26','27','31','45','54')
                    group by
                        a.matl_cd
                `;
                var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                tTotCnt = 0;
                tRet1.forEach((col, i) => {
                    tTotCnt += parseFloat(String(col.net_tot)) || 0;
                });

                var strLoss = 0.0;
                if (tTotCnt > 20000) strLoss = 0.5;
                else if (tTotCnt > 10000) strLoss = 1.0;
                else if (tTotCnt > 5000) strLoss = 2.0;
                else if (tTotCnt > 2000) strLoss = 3.0;
                else strLoss = 5.0;


                let sql1 = `
                    select
                        max(a.order_mrp_seq) as order_mrp_seq,
                        a.prod_cd
                    from
                        ksv_order_mrp a
                    where
                        a.order_cd = '${orderCd}'
                        and a.matl_cd = '${tMatlCd}'
                    group by
                        a.prod_cd
                `;
                var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));

                var sizeLoss = 0;

                var tIdx2 = 0;
                for (tIdx2 = 0; tIdx2 < tRet1.length; tIdx2++) {
                    var tOrderMrpSeq = tRet1[tIdx2].order_mrp_seq;
                    var tProdCd = tRet1[tIdx2].prod_cd;

                    console.log(
                        `===> AdjustLossETPSubMatl2 :${orderCd}, ${tProdCd}, ${tOrderMrpSeq} , ${tMatlCd}, ${userId}: OrderCnt:${tTotCnt} , Loss: ${strLoss}, sizeloss: ${sizeLoss}, addLoss:${addLoss}  `,
                    );

                    let sql4 = `
                        update ksv_order_mrp
                        set
                            std_loss = ${strLoss},
                            std_gross = std_net + std_net * ${strLoss} / 100.0,
                            loss = ${strLoss},
                            gross = net + net * ${strLoss} / 100.0
                        where
                            order_cd = '${orderCd}'
                            and prod_cd = '${tProdCd}'
                            and order_mrp_seq = '${tOrderMrpSeq}'
                            and matl_cd = '${tMatlCd}'
                    `;
                    var tRet4 = await prisma.$queryRaw(Prisma.raw(sql4));
                }
            }
        },
        AdjustLossETPSubMatl3: async (
            orderCd: string,
            orderMrpSeq: string,
            userId: string,
        ) => {
            //
            let sql0 = `
                select distinct
                    a.matl_cd,
                    isnull(b.add_loss, 0) as add_loss
                from
                    ksv_order_mrp a,
                    kcd_matl_mst b,
                    ksv_order_mrp_seqmax c
                where
                    a.order_cd = '${orderCd}'
                    and b.matl_cd = a.matl_cd
                    and b.matl_type2 in (
                        '28',
                        '46'
                    )
                    and b.matl_type not in ('M', 'Q')
                    and c.user_id = '${userId}'
                    and c.order_cd = a.order_cd
                    and c.prod_cd = a.prod_cd
                    and c.order_mrp_seq = a.order_mrp_seq
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sql0));
            console.log(`AdjustLossETPSubMatl3(SizeLossSubMatl-Step1)=> ${tRet.length} `);

            var tTotCnt = 0;
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tMatlCd = tRet[tIdx].matl_cd;
                var addLoss = tRet[tIdx].add_loss;

                let sql1 = `
                    select
                        a.matl_cd,
                        sum(a.net * c.tot_cnt) as net_tot
                    from
                        ksv_order_mrp a,
                        ksv_order_mem c,
                        kcd_matl_mst b,
                        ksv_order_mrp_seqmax d
                    where
                        a.order_cd = '${orderCd}'
                        and a.order_mrp_seq = d.order_mrp_seq
                        and d.user_id = '${userId}'
                        and d.order_cd = a.order_cd
                        and d.prod_cd = a.prod_cd
                        and a.matl_cd = '${tMatlCd}'
                        and c.order_cd = a.order_cd
                        and c.prod_cd = a.prod_cd
                        and b.matl_cd = a.matl_cd
                        and b.matl_type2 in ('28','46')
                    group by
                        a.matl_cd
                `;
                var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                tTotCnt = 0;
                tRet1.forEach((col, i) => {
                    tTotCnt += parseFloat(String(col.net_tot)) || 0;
                });

                var strLoss = 0.0;
                if (tTotCnt > 100000) strLoss = 0.5;
                else if (tTotCnt > 50000) strLoss = 1.0;
                else if (tTotCnt > 30000) strLoss = 2.0;
                else if (tTotCnt > 10000) strLoss = 3.0;
                else strLoss = 5.0;


                let sql1 = `
                    select
                        max(a.order_mrp_seq) as order_mrp_seq,
                        a.prod_cd
                    from
                        ksv_order_mrp a
                    where
                        a.order_cd = '${orderCd}'
                        and a.matl_cd = '${tMatlCd}'
                    group by
                        a.prod_cd
                `;
                var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));

                var sizeLoss = 0;

                var tIdx2 = 0;
                for (tIdx2 = 0; tIdx2 < tRet1.length; tIdx2++) {
                    var tOrderMrpSeq = tRet1[tIdx2].order_mrp_seq;
                    var tProdCd = tRet1[tIdx2].prod_cd;

                    console.log(
                        `===> AdjustLossETPSubMatl3 :${orderCd}, ${tProdCd}, ${tOrderMrpSeq} , ${tMatlCd}, ${userId}: OrderCnt:${tTotCnt} , Loss: ${strLoss}, sizeloss: ${sizeLoss}, addLoss:${addLoss}  `,
                    );

                    let sql4 = `
                        update ksv_order_mrp
                        set
                            std_loss = ${strLoss},
                            std_gross = std_net + std_net * ${strLoss} / 100.0,
                            loss = ${strLoss},
                            gross = net + net * ${strLoss} / 100.0
                        where
                            order_cd = '${orderCd}'
                            and prod_cd = '${tProdCd}'
                            and order_mrp_seq = '${tOrderMrpSeq}'
                            and matl_cd = '${tMatlCd}'
                    `;
                    var tRet4 = await prisma.$queryRaw(Prisma.raw(sql4));
                }
            }
        },
        AdjustLossETPSubMatlTransfer: async (
            orderCd: string,
            orderMrpSeq: string,
            userId: string,
        ) => {
            let sql0 = `
                select distinct
                    a.matl_cd,
                    isnull(b.add_loss, 0) as add_loss,
                    isnull(use_size, 0) as use_size
                from
                    ksv_order_mrp a,
                    kcd_matl_mst b
                where
                    a.order_cd = '${orderCd}'
                    and b.matl_cd = a.matl_cd
                    and b.matl_type2 in ('69')
                    and b.matl_type not in ('M', 'Q')
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sql0));
            console.log(
                `ADJUST_LOSS(ETPSubMatlTansfer-Step1)=> ${tRet.length} `,
            );

            var tTotCnt = 0;
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tMatlCd = tRet[tIdx].matl_cd;
                var addLoss = tRet[tIdx].add_loss;
                var useSize = tRet[tIdx].use_size;

                var tSizeSeq = 0;
                var tSizeTot = 0;

                let sql1 = `
                    select
                        c.size_seq,
                        a.size_cnt
                    from
                        ksv_order_mem a,
                        ksv_order_mst b,
                        kcd_size_mem c
                    where
                        a.order_cd = '${orderCd}'
                        and a.order_cd = b.order_cd
                        and c.size_group = b.size_group
                        and c.size_val = '${useSize}'
                `;
                var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                tRet1.forEach((col, i) => {
                    var seq = col.size_seq - 1;
                    var tSize = col.size_cnt;
                    tSizeSeq = seq;
                    tSizeTot += tSize;
                });

                let sql2 = `
                    select
                        max(order_mrp_seq) as order_mrp_seq,
                        prod_cd
                    from
                        ksv_order_mrp
                    where
                        order_cd = '${orderCd}'
                        and matl_cd = '${tMatlCd}'
                    group by
                        prod_cd
                `;
                var tRet2 = await prisma.$queryRaw(Prisma.raw(sql2));

                var tIdx2 = 0;
                let tTotCnt = 0;
                for (tIdx2 = 0; tIdx2 < tRet2.length; tIdx2++) {
                    var tOrderMrpSeq = tRet2[tIdx2].order_mrp_seq;
                    var tProdCd = tRet2[tIdx2].prod_cd;

                    let sql11 = '';
                    if (tSizeTot <= 0) {
                        sql11 = `
                            select
                                a.matl_cd,
                                sum(a.net * c.tot_cnt) as t_cnt
                            from
                                ksv_order_mrp a,
                                ksv_order_mem c,
                                kcd_matl_mst b
                            where
                                a.order_cd = '${orderCd}'
                                and a.order_mrp_seq = '${tOrderMrpSeq}'
                                and a.prod_cd = '${tProdCd}'
                                and a.matl_cd = '${tMatlCd}'
                                and c.order_cd = a.order_cd
                                and c.prod_cd = a.prod_cd
                                and b.matl_cd = a.matl_cd
                                and b.matl_type2 in ('69')
                            group by
                                a.matl_cd
                        `;
                    } else {
                        sql11 = `
                            select
                                a.matl_cd,
                                sum(a.net * c.tot_cnt) as t_cnt
                            from
                                ksv_order_mrp a,
                                ksv_order_mem c,
                                kcd_matl_mst b
                            where
                                a.order_cd = '${orderCd}'
                                and a.order_mrp_seq = '${tOrderMrpSeq}'
                                and a.prod_cd = '${tProdCd}'
                                and a.matl_cd = '${tMatlCd}'
                                and c.order_cd = a.order_cd
                                and c.prod_cd = a.prod_cd
                                and b.matl_cd = a.matl_cd
                                and b.matl_type2 in ('69')
                            group by
                                a.matl_cd
                        `;
                    }
                    var tRet11 = await prisma.$queryRaw(Prisma.raw(sql11));
                    tRet11.forEach((col, i) => {
                        tTotCnt += col.t_cnt;
                    });
                }

                var strLoss = 0.0;
                if (tTotCnt > 800) strLoss = 4;
                else if (tTotCnt > 400) strLoss = 6;
                else if (tTotCnt > 200) strLoss = 8;
                else if (tTotCnt > 100) strLoss = 10;
                else strLoss = 12;

                var sizeLoss = 0;

                var tIdx2 = 0;
                for (tIdx2 = 0; tIdx2 < tRet2.length; tIdx2++) {
                    var tOrderMrpSeq = tRet2[tIdx2].order_mrp_seq;
                    var tProdCd = tRet2[tIdx2].prod_cd;

                    console.log(
                        `===> AdjustLossETPSubMatlTransfer :${orderCd}, ${tProdCd}, ${tOrderMrpSeq} , ${tMatlCd}, ${userId}: OrderCnt:${tTotCnt} , Loss: ${strLoss}, sizeloss: ${sizeLoss}, addLoss:${addLoss}  `,
                    );
                    let sql4 = `
                        update ksv_order_mrp
                        set
                            -- is_autoloss = '1',
                            std_loss = ${strLoss} + ${addLoss} + ${sizeLoss},
                            std_gross = std_net + std_net * (${strLoss} + ${addLoss}) / 100.0 + std_net * ${sizeLoss} / 100.0,
                            loss = ${strLoss} + ${addLoss} + ${sizeLoss},
                            gross = net + net * (${strLoss} + ${addLoss}) / 100.0 + net * ${sizeLoss} / 100.0
                        where
                            order_cd = '${orderCd}'
                            and prod_cd = '${tProdCd}'
                            and order_mrp_seq = '${tOrderMrpSeq}'
                            and matl_cd = '${tMatlCd}'
                    `;
                    var tRet4 = await prisma.$queryRaw(Prisma.raw(sql4));
                }
            }
        },
        AdjustLossETPSubMatlNylon: async (
            orderCd: string,
            orderMrpSeq: string,
            userId: string,
        ) => {
            let sql0 = `
                select distinct
                    a.matl_cd,
                    isnull(b.add_loss, 0) as add_loss,
                    isnull(a.use_size, '') as use_size
                from
                    ksv_order_mrp a,
                    kcd_matl_mst b
                where
                    a.order_cd = '${orderCd}'
                    and b.matl_cd = a.matl_cd
                    and b.matl_type2 in ('83')
                    and b.matl_type not in ('M', 'Q')
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sql0));
            console.log(`ADJUST_LOSS(ETPSubMatlNylon-Step1)=> ${tRet.length} `);

            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tMatlCd = tRet[tIdx].matl_cd;
                var addLoss = tRet[tIdx].add_loss;
                var useSize = tRet[tIdx].use_size || '';
                var safeUseSize = useSize.replace(/'/g, "''");

                let sqlSize = `
                    select
                        c.size_seq,
                        a.size_cnt
                    from
                        ksv_order_mem a,
                        ksv_order_mst b,
                        kcd_size_mem c
                    where
                        a.order_cd = '${orderCd}'
                        and a.order_cd = b.order_cd
                        and c.size_group = b.size_group
                        and c.size_val = '${safeUseSize}'
                `;
                var tRetSize = await prisma.$queryRaw(Prisma.raw(sqlSize));
                var sizeTot = 0;
                tRetSize.forEach((col, i) => {
                    var sizeSeq = parseInt(String(col.size_seq || '0')) - 1;
                    var sizeCnt = String(col.size_cnt || '');
                    var startIdx = sizeSeq * 6;
                    var piece = sizeCnt.substring(startIdx, startIdx + 6);
                    sizeTot += parseFloat(piece || '0') || 0;
                });

                let sql2 = `
                    select
                        max(order_mrp_seq) as order_mrp_seq,
                        prod_cd
                    from
                        ksv_order_mrp
                    where
                        order_cd = '${orderCd}'
                        and matl_cd = '${tMatlCd}'
                    group by
                        prod_cd
                `;
                var tRet2 = await prisma.$queryRaw(Prisma.raw(sql2));

                var tIdx2 = 0;
                var tNetSum = 0;
                for (tIdx2 = 0; tIdx2 < tRet2.length; tIdx2++) {
                    var tOrderMrpSeq = tRet2[tIdx2].order_mrp_seq;
                    var tProdCd = tRet2[tIdx2].prod_cd;

                    var sqlNet = '';
                    if (sizeTot === 0) {
                        sqlNet = `
                            select
                                a.matl_cd,
                                sum(a.net * c.tot_cnt) as net_sum
                            from
                                ksv_order_mrp a,
                                ksv_order_mem c,
                                kcd_matl_mst b
                            where
                                a.order_cd = '${orderCd}'
                                and a.order_mrp_seq = '${tOrderMrpSeq}'
                                and a.prod_cd = '${tProdCd}'
                                and a.matl_cd = '${tMatlCd}'
                                and c.order_cd = a.order_cd
                                and c.prod_cd = a.prod_cd
                                and b.matl_cd = a.matl_cd
                                and b.matl_type2 in ('83')
                                and b.matl_type not in ('M', 'Q')
                            group by
                                a.matl_cd
                        `;
                    } else {
                        sqlNet = `
                            select
                                a.matl_cd,
                                sum(a.net * ${sizeTot}) as net_sum
                            from
                                ksv_order_mrp a,
                                ksv_order_mem c,
                                kcd_matl_mst b
                            where
                                a.order_cd = '${orderCd}'
                                and a.order_mrp_seq = '${tOrderMrpSeq}'
                                and a.prod_cd = '${tProdCd}'
                                and a.matl_cd = '${tMatlCd}'
                                and c.order_cd = a.order_cd
                                and c.prod_cd = a.prod_cd
                                and b.matl_cd = a.matl_cd
                                and b.matl_type2 in ('83')
                                and b.matl_type not in ('M', 'Q')
                            group by
                                a.matl_cd
                        `;
                    }

                    var tRetNet = await prisma.$queryRaw(Prisma.raw(sqlNet));
                    tNetSum = 0;
                    tRetNet.forEach((col, i) => {
                        tNetSum += parseFloat(String(col.net_sum || 0)) || 0;
                    });
                }

                var strLoss = 0.0;
                if (tNetSum > 100) strLoss = 5.0;
                else if (tNetSum > 50) strLoss = 7.0;
                else if (tNetSum > 30) strLoss = 10.0;
                else if (tNetSum > 20) strLoss = 20.0;
                else if (tNetSum > 10) strLoss = 30.0;
                else if (tNetSum > 5) strLoss = 50.0;
                else strLoss = 100.0;

                var tBuyerCd = orderCd.substring(0, 2);
                if (tBuyerCd === 'PN' || tBuyerCd === 'DE') strLoss = 0.0;
                if (tBuyerCd === 'SM') strLoss = 3.0;

                var sizeLoss = 0;

                let sql3 = `
                    select
                        max(order_mrp_seq) as order_mrp_seq,
                        prod_cd
                    from
                        ksv_order_mrp
                    where
                        order_cd = '${orderCd}'
                        and matl_cd = '${tMatlCd}'
                    group by
                        prod_cd
                `;
                var tRet3 = await prisma.$queryRaw(Prisma.raw(sql3));

                tIdx2 = 0;
                for (tIdx2 = 0; tIdx2 < tRet3.length; tIdx2++) {
                    var tOrderMrpSeq = tRet3[tIdx2].order_mrp_seq;
                    var tProdCd = tRet3[tIdx2].prod_cd;

                    console.log(
                        `===> AdjustLossETPSubMatlNylon :${orderCd}, ${tProdCd}, ${tOrderMrpSeq} , ${tMatlCd}, ${userId}: NetSum:${tNetSum} , Loss: ${strLoss}, sizeloss: ${sizeLoss}, addLoss:${addLoss}  `,
                    );
                    let sql4 = `
                        update ksv_order_mrp
                        set
                            -- is_autoloss = '1',
                            std_loss = ${strLoss} + ${addLoss} + ${sizeLoss},
                            std_gross = std_net + std_net * (${strLoss} + ${addLoss}) / 100.0 + std_net * ${sizeLoss} / 100.0,
                            loss = ${strLoss} + ${addLoss} + ${sizeLoss},
                            gross = net + net * (${strLoss} + ${addLoss}) / 100.0 + net * ${sizeLoss} / 100.0
                        where
                            order_cd = '${orderCd}'
                            and prod_cd = '${tProdCd}'
                            and order_mrp_seq = '${tOrderMrpSeq}'
                            and matl_cd = '${tMatlCd}'
                    `;
                    var tRet4 = await prisma.$queryRaw(Prisma.raw(sql4));
                }
            }
        },
        AdjustLossETPSubMatlOrderQty: async (
            orderCd: string,
            orderMrpSeq: string,
            userId: string,
        ) => {
            let sql0 = `
                select distinct
                    a.matl_cd,
                    b.matl_type2
                from
                    ksv_order_mrp a,
                    kcd_matl_mst b,
                    ksv_order_mrp_seqmax c
                where
                    a.order_cd = '${orderCd}'
                    and b.matl_cd = a.matl_cd
                    and b.matl_type2 in (
                        '55',
                        '33',
                        '29',
                        '32',
                        '47',
                        '48',
                        '56',
                        '60',
                        '30',
                        '49',
                        '87',
                        '96',
                        '66'
                    )
                    and b.matl_type not in ('M', 'Q')
                    and c.user_id = '${userId}'
                    and c.order_cd = a.order_cd
                    and c.prod_cd = a.prod_cd
                    and c.order_mrp_seq = a.order_mrp_seq
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sql0));
            console.log(
                `ADJUST_LOSS(ETPSubMatlOrderQty-Step1)=> ${tRet.length} `,
            );

            var tTotCnt = 0;
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tMatlCd = tRet[tIdx].matl_cd;

                var tTotCnt = 0;

                let sql1 = `
                    select
                        sum(tot_cnt) as t_cnt
                    from
                        ksv_order_mem
                    where
                        order_cd = '${orderCd}'
                        and prod_cd in (
                            select
                                a.prod_cd
                            from
                                ksv_order_mrp a,
                                ksv_order_mrp_seqmax c
                            where
                                a.order_cd = '${orderCd}'
                                and matl_cd = '${tMatlCd}'
                                and c.user_id = '${userId}'
                                and c.prod_cd = a.prod_cd
                                and c.order_cd = a.order_cd
                                and c.order_mrp_seq = a.order_mrp_seq
                        )
                `;
                var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                tRet1.forEach((col, i) => {
                    tTotCnt += col.t_cnt;
                });

                var strLoss = 0.0;
                if (tTotCnt >= 10000) strLoss = 0.3;
                else if (tTotCnt >= 9000) strLoss = 0.4;
                else if (tTotCnt >= 8000) strLoss = 0.5;
                else if (tTotCnt >= 7000) strLoss = 0.55;
                else if (tTotCnt >= 6000) strLoss = 0.60;
                else if (tTotCnt >= 5000) strLoss = 0.7;
                else if (tTotCnt >= 4000) strLoss = 0.75;
                else if (tTotCnt >= 3000) strLoss = 0.8;
                else if (tTotCnt >= 2000) strLoss = 0.85;
                else if (tTotCnt >= 1000) strLoss = 0.9;
                else if (tTotCnt >= 900) strLoss = 0.9;
                else if (tTotCnt >= 800) strLoss = 1.0;
                else if (tTotCnt >= 700) strLoss = 1.1;
                else if (tTotCnt >= 600) strLoss = 1.12;
                else if (tTotCnt >= 500) strLoss = 1.25;
                else if (tTotCnt >= 400) strLoss = 1.3;
                else if (tTotCnt >= 300) strLoss = 1.5;
                else if (tTotCnt >= 200) strLoss = 1.7;
                else if (tTotCnt >= 100) strLoss = 2.0;
                else strLoss = 2.0;

                var sizeLoss = 0;
                var addLoss = 0;

                let sql2 = `
                    select
                        max(order_mrp_seq) as order_mrp_seq,
                        prod_cd
                    from
                        ksv_order_mrp
                    where
                        order_cd = '${orderCd}'
                        and matl_cd = '${tMatlCd}'
                    group by
                        prod_cd
                `;
                var tRet2 = await prisma.$queryRaw(Prisma.raw(sql2));

                var tIdx2 = 0;
                for (tIdx2 = 0; tIdx2 < tRet2.length; tIdx2++) {
                    var tOrderMrpSeq = tRet2[tIdx2].order_mrp_seq;
                    var tProdCd = tRet2[tIdx2].prod_cd;

                    console.log(
                        `===> AdjustLossETPSubMatlOrderQty :${orderCd}, ${tProdCd}, ${tOrderMrpSeq} , ${tMatlCd}, ${userId}: OrderCnt:${tTotCnt} , Loss: ${strLoss}, sizeloss: ${sizeLoss}, addLoss:${addLoss}  `,
                    );
                    let sql4 = `
                        update ksv_order_mrp
                        set
                            -- is_autoloss = '1',
                            std_loss = ${strLoss} + ${addLoss} + ${sizeLoss},
                            std_gross = std_net + std_net * (${strLoss} + ${addLoss}) / 100.0 + std_net * ${sizeLoss} / 100.0,
                            loss = ${strLoss} + ${addLoss} + ${sizeLoss},
                            gross = net + net * (${strLoss} + ${addLoss}) / 100.0 + net * ${sizeLoss} / 100.0
                        where
                            order_cd = '${orderCd}'
                            and prod_cd = '${tProdCd}'
                            and order_mrp_seq = '${tOrderMrpSeq}'
                            and matl_cd = '${tMatlCd}'
                    `;
                    var tRet4 = await prisma.$queryRaw(Prisma.raw(sql4));
                }
            }
        },
        AdjustLossETPSubMatlSample: async (
            orderCd: string,
            orderMrpSeq: string,
            userId: string,
        ) => {
            let sql0 = `
                select distinct
                    a.matl_cd,
                    b.matl_type2
                from
                    ksv_order_mrp a,
                    kcd_matl_mst b
                where
                    a.order_cd = '${orderCd}'
                    and b.matl_cd = a.matl_cd
                    and b.matl_type not in ('M', 'Q')
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sql0));

            console.log(
                `ADJUST_LOSS(ETPSubMatlSample-Step1)=> ${tRet.length} `,
            );

            var tTotCnt = 0;
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tMatlCd = tRet[tIdx].matl_cd;
                var tMatlType2 = tRet[tIdx].matl_type2;

                var strLoss = 0;
                if (parseInt(tMatlType2) === 51) strLoss = 0;
                else if (parseInt(tMatlType2) === 59) strLoss = 0;
                else if (parseInt(tMatlType2) === 60) strLoss = 0;
                else if (parseInt(tMatlType2) === 56) strLoss = 2;
                else if (parseInt(tMatlType2) === 70) strLoss = 1;
                else if (parseInt(tMatlType2) === 32) strLoss = 2;
                else if (parseInt(tMatlType2) === 33) strLoss = 2;
                else if (parseInt(tMatlType2) === 47) strLoss = 2;
                else if (parseInt(tMatlType2) === 48) strLoss = 2;
                else if (parseInt(tMatlType2) === 55) strLoss = 2;
                else if (parseInt(tMatlType2) === 81) strLoss = 3;
                else if (parseInt(tMatlType2) === 69) strLoss = 15;
                else if (parseInt(tMatlType2) === 29) strLoss = 5;
                else if (parseInt(tMatlType2) === 57) strLoss = 15;
                else if (parseInt(tMatlType2) === 22) strLoss = 10;
                else if (parseInt(tMatlType2) === 24) strLoss = 10;
                else if (parseInt(tMatlType2) === 25) strLoss = 10;
                else if (parseInt(tMatlType2) === 26) strLoss = 10;
                else if (parseInt(tMatlType2) === 27) strLoss = 10;
                else if (parseInt(tMatlType2) === 28) strLoss = 10;
                else if (parseInt(tMatlType2) === 30) strLoss = 10;
                else if (parseInt(tMatlType2) === 31) strLoss = 10;
                else if (parseInt(tMatlType2) === 46) strLoss = 10;
                else if (parseInt(tMatlType2) === 49) strLoss = 10;
                else if (parseInt(tMatlType2) === 53) strLoss = 10;
                else if (parseInt(tMatlType2) === 54) strLoss = 10;
                else if (parseInt(tMatlType2) === 61) strLoss = 10;
                else if (parseInt(tMatlType2) === 64) strLoss = 10;
                else if (parseInt(tMatlType2) === 66) strLoss = 10;
                else if (parseInt(tMatlType2) === 68) strLoss = 10;
                else if (parseInt(tMatlType2) === 45) strLoss = 20;
                else if (parseInt(tMatlType2) === 83) strLoss = 20;
                else if (parseInt(tMatlType2) === 36) strLoss = 2;
                else continue;

                let sql1 = `
                    select
                        max(order_mrp_seq) as order_mrp_seq,
                        prod_cd
                    from
                        ksv_order_mrp
                    where
                        order_cd = '${orderCd}'
                        and matl_cd = '${tMatlCd}'
                    group by
                        prod_cd
                `;
                var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));

                var sizeLoss = 0;
                var addLoss = 0;

                var tIdx1 = 0;
                for (tIdx1 = 0; tIdx1 < tRet1.length; tIdx1++) {
                    var tOrderMrpSeq = tRet1[tIdx1].order_mrp_seq;
                    var tProdCd = tRet1[tIdx1].prod_cd;

                    console.log(
                        `===> AdjustLossETPSubMatlSample :${orderCd}, ${tProdCd}, ${tOrderMrpSeq} , ${tMatlCd}, ${userId}: OrderCnt:${tTotCnt} , Loss: ${strLoss}, sizeloss: ${sizeLoss}, addLoss:${addLoss}  `,
                    );
                    let sql4 = `
                        update ksv_order_mrp
                        set
                            -- is_autoloss = '1',
                            std_loss = ${strLoss},
                            std_gross = std_net + std_net * ${strLoss} / 100.0,
                            loss = ${strLoss},
                            gross = net + net * ${strLoss} / 100.0
                        where
                            order_cd = '${orderCd}'
                            and prod_cd = '${tProdCd}'
                            and order_mrp_seq = '${tOrderMrpSeq}'
                            and matl_cd = '${tMatlCd}'
                    `;
                    var tRet4 = await prisma.$queryRaw(Prisma.raw(sql4));
                }
            }
        },
        AdjustLossSubMatlThread: async (
            orderCd: string,
            orderMrpSeq: string,
            userId: string,
        ) => {
            let sql0 = `
                select distinct
                    a.matl_cd,
                    isnull(b.add_loss, 0) as add_loss
                from
                    ksv_order_mrp a,
                    kcd_matl_mst b
                where
                    a.order_cd = '${orderCd}'
                    and b.matl_cd = a.matl_cd
                    and b.vendor_cd in ('v0313', 'v1874', 'v3357')
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sql0));

            console.log(`ADJUST_LOSS(SubMatlThread-Step1)=> ${tRet.length} `);

            let sqlProdAll = `
                select
                    a.matl_cd,
                    max(a.order_mrp_seq) as order_mrp_seq,
                    a.prod_cd,
                    sum(a.net * c.tot_cnt) as net_tot
                from
                    ksv_order_mrp a,
                    ksv_order_mem c,
                    kcd_matl_mst b,
                    ksv_order_mrp_seqmax d
                where
                    a.order_cd = '${orderCd}'
                    and a.order_mrp_seq = d.order_mrp_seq
                    and d.user_id = '${userId}'
                    and d.order_cd = a.order_cd
                    and d.prod_cd = a.prod_cd
                    and c.order_cd = a.order_cd
                    and c.prod_cd = a.prod_cd
                    and b.matl_cd = a.matl_cd
                    and b.vendor_cd in ('v0313', 'v1874', 'v3357')
                group by
                    a.matl_cd,
                    a.prod_cd
            `;
            var tRetProdAll = await prisma.$queryRaw(Prisma.raw(sqlProdAll));
            var prodRowsByMatlCd = {};
            var netTotByMatlCd = {};
            var tIdxProdAll = 0;
            for (
                tIdxProdAll = 0;
                tIdxProdAll < tRetProdAll.length;
                tIdxProdAll++
            ) {
                var tProdRow = tRetProdAll[tIdxProdAll];
                if (!prodRowsByMatlCd[tProdRow.matl_cd])
                    prodRowsByMatlCd[tProdRow.matl_cd] = [];
                prodRowsByMatlCd[tProdRow.matl_cd].push(tProdRow);
                if (!netTotByMatlCd[tProdRow.matl_cd])
                    netTotByMatlCd[tProdRow.matl_cd] = 0;
                netTotByMatlCd[tProdRow.matl_cd] +=
                    parseFloat(String(tProdRow.net_tot)) || 0;
            }

            var tTotCnt = 0;
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tMatlCd = tRet[tIdx].matl_cd;
                var addLoss = tRet[tIdx].add_loss;

                var tTotCnt = 0;
                var tRet2 = prodRowsByMatlCd[tMatlCd] || [];
                tTotCnt = parseFloat(String(netTotByMatlCd[tMatlCd] || 0));

                var strLoss = 0.0;
                if (tTotCnt > 100) strLoss = -6.0;
                else if (tTotCnt > 50) strLoss = -5.0;
                else strLoss = 0.0;

                var sizeLoss = 0;

                if (tRet2.length <= 0) continue;

                var tValueRows = [];
                var tIdx2 = 0;
                for (tIdx2 = 0; tIdx2 < tRet2.length; tIdx2++) {
                    var tOrderMrpSeq = tRet2[tIdx2].order_mrp_seq;
                    var tProdCd = tRet2[tIdx2].prod_cd;

                    console.log(
                        `===> AdjustLossSubMatlThread :${orderCd}, ${tProdCd}, ${tOrderMrpSeq} , ${tMatlCd}, ${userId}: OrderCnt:${tTotCnt} , Loss: ${strLoss}, sizeloss: ${sizeLoss}, addLoss:${addLoss}  `,
                    );
                    tValueRows.push(`'${tProdCd}', '${tOrderMrpSeq}'`);
                }

                var tDerivedRowsSql = `select ${tValueRows.join(
                    ' union all select ',
                )}`;

                let sql4 = `
                    update a
                    set
                        std_loss = ${strLoss} + ${addLoss} + ${sizeLoss},
                        std_gross = a.std_net + a.std_net * (${strLoss} + ${addLoss}) / 100.0 + a.std_net * ${sizeLoss} / 100.0,
                        loss = ${strLoss} + ${addLoss} + ${sizeLoss},
                        gross = a.net + a.net * (${strLoss} + ${addLoss}) / 100.0 + a.net * ${sizeLoss} / 100.0
                    from
                        ksv_order_mrp a,
                        (${tDerivedRowsSql}) b(prod_cd, order_mrp_seq)
                    where
                        a.order_cd = '${orderCd}'
                        and a.matl_cd = '${tMatlCd}'
                        and a.prod_cd = b.prod_cd
                        and a.order_mrp_seq = b.order_mrp_seq
                `;
                var tRet4 = await prisma.$queryRaw(Prisma.raw(sql4));
            }
        },
    },
};

export default module_ADJUST_LOSS;
