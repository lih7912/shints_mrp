import { Prisma, PrismaClient } from '@prisma/client';

export type MrpMigrationInput = {
    poCd: string;
    userId: string;
    orderCd?: string;
    orderMrpSeq?: string;
};

export type MrpMigrationResult = {
    ok: boolean;
    step: string;
    message?: string;
};

export type PrintMrpMigrationInput = {
    poCd: string;
    orderCd: string;
    userId: string;
    currDate: string;
};

export type PrintMrpPMigrationInput = {
    poCd: string;
    orderCd: string;
    prodCd: string;
    addFlag: string;
    userId: string;
    currDate: string;
};

export type PoMatlListInput = {
    poCd: string;
    userId: string;
};

export type PoMrpAdjCancelInput = {
    poCd: string;
    poSeq: string;
};

/**
 * DB 저장 프로시저를 코드로 옮긴 기본 구조입니다.
 *
 * 원본 SQL 덤프:
 * - server/work/ksp_mrp_chain.sql
 *
 * 프로시저 실행 순서:
 * 1) kspPoMrpNetProduct
 * 2) kspPoMrpNetTempCountry
 * 3) kspPoMrpNetTemp
 * 4) kspPoMrpNetTempZip
 * 5) kspPoMrpNetTempZipComb
 * 6) kspPoMrpNetTempSeq
 * 7) kspPoMrpTemp
 */
export class MrpProcedureMigration {
    private prisma: PrismaClient;
    private sizeSeqCache: Record<string, number> = {};
    private sizeRateCache: Record<
        string,
        Array<{ size_seq: number; unit_rate: number }>
    > = {};

    constructor(prismaClient: PrismaClient) {
        this.prisma = prismaClient;
    }

    async runNetProduct(input: MrpMigrationInput): Promise<MrpMigrationResult> {
        try {
            await this.validateInput(input);
            await this.deleteMrpNetTempByUser(input.userId);

            const regDatetime = this.getRegDatetime();
            const poCdEsc = this.escapeSqlLiteral(input.poCd);

            const sql = `
                select
                    a.po_cd as po_cd,
                    a.order_cd as order_cd,
                    b.prod_cd as prod_cd,
                    b.add_flag as add_flag,
                    c.matl_cd as matl_cd,
                    e.matl_seq as matl_seq,
                    c.seq as prod_seq,
                    c.use_size as use_size,
                    c.remark as remark,
                    c.net as net,
                    c.loss as loss,
                    c.gross as gross,
                    d.vendor_cd as vendor_cd,
                    b2.size_group as size_group,
                    b.size_cnt as size_cnt,
                    d.count_flag as count_flag,
                    f.size_cnt as size_max,
                    b2.nat_cd as nat_cd,
                    c.country as country,
                    c.bvt_remark as bvt_remark
                from
                    ksv_po_mem a,
                    ksv_order_mem b,
                    ksv_prod_mem c,
                    kcd_matl_mst d,
                    kcd_matl_mem e,
                    ksv_order_mst b2,
                    kcd_size_mst f
                where
                    a.po_cd = '${poCdEsc}'
                    and a.po_seq = 1
                    and b.order_cd = a.order_cd
                    and c.prod_cd = b.prod_cd
                    and d.matl_cd = c.matl_cd
                    and e.matl_cd = c.matl_cd
                    and e.matl_seq = (
                        select
                            max(matl_seq)
                        from
                            kcd_matl_mem
                        where
                            matl_cd = c.matl_cd
                    )
                    and b2.order_cd = a.order_cd
                    and b2.order_status <> '4'
                    and f.size_group = b2.size_group
            `;

            const rows = (await this.prisma.$queryRaw(
                Prisma.raw(sql),
            )) as any[];
            const insertSqls: string[] = [];

            for (const row of rows) {
                let useSize = this.normalizeUseSize(row.use_size);
                const sizeGroup = String(row.size_group || '');
                const sizeMax = parseInt(String(row.size_max || '0'), 10) || 0;
                const sizeCounts = this.splitSizeCounts(
                    String(row.size_cnt || ''),
                    sizeMax,
                );
                const sizeRates = new Array(sizeMax).fill(1);

                let ordCnt = sizeCounts.reduce((sum, v) => sum + v, 0);
                let useSizeIdx = -1;

                if (useSize !== '') {
                    const sizeSeq = await this.getSizeSeq(sizeGroup, useSize);
                    if (sizeSeq > 0) {
                        useSizeIdx = sizeSeq - 1;
                        ordCnt = sizeCounts[useSizeIdx] || 0;
                    } else {
                        // 기존 프로시저와 맞추기 위해 use_size를 찾지 못하면 insert를 건너뜁니다.
                        ordCnt = 0;
                    }
                }

                if (ordCnt === 0) {
                    for (let i = 0; i < sizeCounts.length; i++)
                        sizeCounts[i] = 0;
                } else if (useSizeIdx >= 0) {
                    for (let i = 0; i < sizeCounts.length; i++) {
                        if (i !== useSizeIdx) sizeCounts[i] = 0;
                    }
                }

                if (String(row.count_flag || '') === '0') {
                    const rateRows = await this.getSizeRates(sizeGroup);
                    for (const rr of rateRows) {
                        const idx = rr.size_seq - 1;
                        if (
                            idx >= 0 &&
                            idx < sizeRates.length &&
                            idx !== useSizeIdx
                        ) {
                            sizeRates[idx] = rr.unit_rate;
                        }
                    }
                }

                const gross = parseFloat(String(row.gross || '0')) || 0;
                let useQtyRaw = 0;
                for (let i = 0; i < sizeCounts.length; i++) {
                    useQtyRaw += gross * sizeCounts[i] * sizeRates[i];
                }

                const netQty = useQtyRaw;
                const useQty = Math.round(useQtyRaw + 0.4999);

                const country = String(row.country || '');
                const natCd = String(row.nat_cd || '');
                if (
                    country !== '' &&
                    natCd !== '' &&
                    !this.containsNatCode(country, natCd)
                ) {
                    ordCnt = 0;
                }

                if (ordCnt > 0) {
                    const insertSql = `
                        insert into ksv_po_mrpnettemp
                        (
                            user_id,
                            po_cd,
                            order_cd,
                            prod_cd,
                            add_flag,
                            matl_cd,
                            matl_seq,
                            prod_seq,
                            use_size,
                            remark,
                            net,
                            loss,
                            gross,
                            vendor_cd,
                            ord_cnt,
                            net_qty,
                            use_qty,
                            status_cd,
                            reg_user,
                            reg_datetime,
                            country,
                            bvt_remark
                        )
                        values
                        (
                            '${this.escapeSqlLiteral(input.userId)}',
                            '${this.escapeSqlLiteral(String(row.po_cd || ''))}',
                            '${this.escapeSqlLiteral(String(row.order_cd || ''))}',
                            '${this.escapeSqlLiteral(String(row.prod_cd || ''))}',
                            '${this.escapeSqlLiteral(String(row.add_flag || ''))}',
                            '${this.escapeSqlLiteral(String(row.matl_cd || ''))}',
                            '${this.escapeSqlLiteral(String(row.matl_seq || ''))}',
                            '${this.escapeSqlLiteral(String(row.prod_seq || ''))}',
                            '${this.escapeSqlLiteral(useSize)}',
                            '${this.escapeSqlLiteral(String(row.remark || ''))}',
                            '${this.escapeSqlLiteral(String(row.net || '0'))}',
                            '${this.escapeSqlLiteral(String(row.loss || '0'))}',
                            '${this.escapeSqlLiteral(String(row.gross || '0'))}',
                            '${this.escapeSqlLiteral(String(row.vendor_cd || ''))}',
                            '${this.escapeSqlLiteral(String(ordCnt))}',
                            '${this.escapeSqlLiteral(String(netQty))}',
                            '${this.escapeSqlLiteral(String(useQty))}',
                            '0',
                            '${this.escapeSqlLiteral(input.userId)}',
                            '${this.escapeSqlLiteral(regDatetime)}',
                            '${this.escapeSqlLiteral(country)}',
                            '${this.escapeSqlLiteral(String(row.bvt_remark || ''))}'
                        )
                    `;

                    insertSqls.push(insertSql);
                }
            }

            await this.executeSqlsWithConcurrency(insertSqls, 10);

            await this.runNetTempCountry(input);

            return { ok: true, step: 'kspPoMrpNetProduct' };
        } catch (error: any) {
            return {
                ok: false,
                step: 'kspPoMrpNetProduct',
                message: error?.message || 'unknown error',
            };
        }
    }

    async runNetTemp(input: MrpMigrationInput): Promise<MrpMigrationResult> {
        try {
            await this.validateInput(input);

            await this.resetOrderMrpSeqMax(input);
            await this.deleteMrpNetTempByUser(input.userId);

            const poCdEsc = this.escapeSqlLiteral(input.poCd);
            const userEsc = this.escapeSqlLiteral(input.userId);
            const orderCdEsc = input.orderCd
                ? this.escapeSqlLiteral(input.orderCd)
                : null;
            const sql = `
                select
                    a.po_cd as po_cd,
                    a.order_cd as order_cd,
                    b.prod_cd as prod_cd,
                    b.add_flag as add_flag,
                    c.matl_cd as matl_cd,
                    e.matl_seq as matl_seq,
                    c.seq as prod_seq,
                    c.use_size as use_size,
                    c.remark as remark,
                    c.net as net,
                    c.loss as loss,
                    c.gross as gross,
                    d.vendor_cd as vendor_cd,
                    b2.size_group as size_group,
                    b.size_cnt as size_cnt,
                    d.count_flag as count_flag,
                    (len(b.size_cnt) / 6) as size_max,
                    b2.nat_cd as nat_cd,
                    c.country as country
                from
                    ksv_po_mem a,
                    ksv_order_mem b,
                    ksv_order_mrp_seqmax c2,
                    ksv_order_mrp c,
                    kcd_matl_mst d,
                    kcd_matl_mem e,
                    ksv_order_mst b2
                where
                    a.po_cd = '${poCdEsc}'
                    and a.po_seq = 1
                    and b.order_cd = a.order_cd
                    and c.order_cd = a.order_cd
                    and c.prod_cd = b.prod_cd
                    and c2.user_id = '${userEsc}'
                    and c2.order_cd = a.order_cd
                    and c2.prod_cd = b.prod_cd
                    and c.order_mrp_seq = c2.order_mrp_seq
                    and d.matl_cd = c.matl_cd
                    and e.matl_cd = c.matl_cd
                    and e.matl_seq = (
                        select
                            max(matl_seq)
                        from
                            kcd_matl_mem
                        where
                            matl_cd = c.matl_cd
                    )
                    and b2.order_cd = a.order_cd
                    and b2.order_status <> '4'
                    and d.matl_type2 not in ('33', '55', '60', '56')
                    ${orderCdEsc ? `and a.order_cd = '${orderCdEsc}'` : ''}
            `;

            const rows = (await this.prisma.$queryRaw(
                Prisma.raw(sql),
            )) as any[];
            await this.insertNetTempRows(rows, input, {
                normalizeUseSize: true,
                applyCountryFilter: true,
                includeBvtRemark: false,
            });

            await this.runNetTempCountry(input);
            await this.runOrderSizeTot(input);

            return { ok: true, step: 'kspPoMrpNetTemp' };
        } catch (error: any) {
            return {
                ok: false,
                step: 'kspPoMrpNetTemp',
                message: error?.message || 'unknown error',
            };
        }
    }

    async runNetTempZip(input: MrpMigrationInput): Promise<MrpMigrationResult> {
        try {
            await this.validateInput(input);
            if (!input.orderCd) {
                throw new Error('orderCd is required for runNetTempZip');
            }

            const poCdEsc = this.escapeSqlLiteral(input.poCd);
            const orderCheckEsc = this.escapeSqlLiteral(input.orderCd);
            const sqlComb = `
                select
                    a.order_cd,
                    a.nat_cd
                from
                    ksv_order_mst a,
                    ksv_po_mem b
                where
                    b.po_cd = '${poCdEsc}'
                    and left(a.order_cd, 10) = b.order_cd
                    and a.order_cd like '${orderCheckEsc}-%'
                    and b.po_seq = '1'
                order by
                    1
            `;

            const combRows = (await this.prisma.$queryRaw(
                Prisma.raw(sqlComb),
            )) as any[];
            if (combRows.length > 0) {
                // C++/legacy flow does not expand combined children inside
                // kspPoMrpNetTempZip. Callers detect combined children and run
                // kspPoMrpNetTempZipComb per child order separately.
                //
                // Keep the previous TS-internal expansion here for quick rollback
                // if we need to restore the current behavior later.
                // for (const comb of combRows) {
                //     await this.runNetTempZipByOrder(
                //         input,
                //         String(comb.order_cd || ''),
                //         false,
                //     );
                // }

                await this.runNetTempZipByOrder(input, input.orderCd, true);
            } else {
                await this.runNetTempZipByOrder(input, input.orderCd, true);
            }

            return { ok: true, step: 'kspPoMrpNetTempZip' };
        } catch (error: any) {
            return {
                ok: false,
                step: 'kspPoMrpNetTempZip',
                message: error?.message || 'unknown error',
            };
        }
    }

    async runNetTempZipComb(
        input: MrpMigrationInput,
    ): Promise<MrpMigrationResult> {
        try {
            await this.validateInput(input);
            if (!input.orderCd) {
                throw new Error('orderCd is required for runNetTempZipComb');
            }

            await this.runNetTempZipCombByOrder(input);
            return { ok: true, step: 'kspPoMrpNetTempZipComb' };
        } catch (error: any) {
            return {
                ok: false,
                step: 'kspPoMrpNetTempZipComb',
                message: error?.message || 'unknown error',
            };
        }
    }

    async runNetTempSeq(input: MrpMigrationInput): Promise<MrpMigrationResult> {
        try {
            await this.validateInput(input);
            if (!input.orderMrpSeq) {
                throw new Error('orderMrpSeq is required for runNetTempSeq');
            }

            await this.deleteMrpNetTempByUser(input.userId);

            const poCdEsc = this.escapeSqlLiteral(input.poCd);
            const seqEsc = this.escapeSqlLiteral(input.orderMrpSeq);
            const sql = `
                select
                    a.po_cd as po_cd,
                    a.order_cd as order_cd,
                    b.prod_cd as prod_cd,
                    b.add_flag as add_flag,
                    c.matl_cd as matl_cd,
                    e.matl_seq as matl_seq,
                    c.seq as prod_seq,
                    c.use_size as use_size,
                    c.remark as remark,
                    c.net as net,
                    c.loss as loss,
                    c.gross as gross,
                    d.vendor_cd as vendor_cd,
                    b2.size_group as size_group,
                    b.size_cnt as size_cnt,
                    d.count_flag as count_flag,
                    f.size_cnt as size_max,
                    b2.nat_cd as nat_cd,
                    c.country as country
                from
                    ksv_po_mem a,
                    ksv_order_mem b,
                    ksv_order_mrp c,
                    kcd_matl_mst d,
                    kcd_matl_mem e,
                    ksv_order_mst b2,
                    kcd_size_mst f
                where
                    a.po_cd = '${poCdEsc}'
                    and a.po_seq = 1
                    and b.order_cd = a.order_cd
                    and c.order_cd = a.order_cd
                    and c.prod_cd = b.prod_cd
                    and c.order_mrp_seq = '${seqEsc}'
                    and d.matl_cd = c.matl_cd
                    and e.matl_cd = c.matl_cd
                    and e.matl_seq = (
                        select
                            max(matl_seq)
                        from
                            kcd_matl_mem
                        where
                            matl_cd = c.matl_cd
                    )
                    and b2.order_cd = a.order_cd
                    and b2.order_status <> '4'
                    and f.size_group = b2.size_group
            `;

            const rows = (await this.prisma.$queryRaw(
                Prisma.raw(sql),
            )) as any[];
            await this.insertNetTempRows(rows, input, {
                normalizeUseSize: true,
                applyCountryFilter: true,
                includeBvtRemark: false,
            });

            await this.runNetTempCountry(input);
            return { ok: true, step: 'kspPoMrpNetTempSeq' };
        } catch (error: any) {
            return {
                ok: false,
                step: 'kspPoMrpNetTempSeq',
                message: error?.message || 'unknown error',
            };
        }
    }

    async runMrpTemp(input: MrpMigrationInput): Promise<MrpMigrationResult> {
        try {
            await this.validateInput(input);

            const poCdEsc = this.escapeSqlLiteral(input.poCd);
            const userEsc = this.escapeSqlLiteral(input.userId);
            const regDatetime = this.getRegDatetime();
            const currDate = regDatetime.substring(0, 8);

            const sqlSeq = `
                select
                    isnull(max(mrp_seq), '0') as mrp_seq
                from
                    ksv_po_mrp
                where
                    po_cd = '${poCdEsc}'
            `;
            const retSeq = (await this.prisma.$queryRaw(
                Prisma.raw(sqlSeq),
            )) as any[];
            let seq =
                retSeq.length > 0
                    ? parseInt(String(retSeq[0].mrp_seq || '0'), 10) || 0
                    : 0;

            const sqlDel = `
                delete ksv_po_mrptemp
                where
                    user_id = '${userEsc}'
            `;
            await this.prisma.$queryRaw(Prisma.raw(sqlDel));

            const sqlRows = `
                select
                    a.po_cd,
                    a.order_cd,
                    a.matl_cd,
                    a.matl_seq,
                    e.matl_price,
                    e.curr_cd,
                    sum(net_qty) as sum_qty
                from
                    ksv_po_mrpnettemp a,
                    kcd_matl_mem e
                where
                    a.user_id = '${userEsc}'
                    and a.po_cd = '${poCdEsc}'
                    and e.matl_cd = a.matl_cd
                    and e.matl_seq = a.matl_seq
                group by
                    a.po_cd,
                    a.order_cd,
                    a.matl_cd,
                    a.matl_seq,
                    e.matl_price,
                    e.curr_cd
                order by
                    a.po_cd,
                    a.order_cd,
                    a.matl_cd
            `;

            const rows = (await this.prisma.$queryRaw(
                Prisma.raw(sqlRows),
            )) as any[];

            // N+1 조회를 피하려고 이 poCd의 기존 mrp_seq를 한 번에 미리 가져옵니다.
            const existingMrpRows = (await this.prisma.$queryRaw(
                Prisma.raw(
                    `select order_cd, matl_cd, matl_seq, mrp_seq from ksv_po_mrp where po_cd = '${poCdEsc}'`,
                ),
            )) as any[];
            const existingMrpSeqMap = new Map<string, number>();
            for (const r of existingMrpRows) {
                const orderKey = String(r.order_cd || '').substring(0, 10);
                const k = `${orderKey}|${String(r.matl_cd || '')}|${String(r.matl_seq || '')}`;
                if (!existingMrpSeqMap.has(k)) {
                    existingMrpSeqMap.set(
                        k,
                        parseInt(String(r.mrp_seq || '0'), 10) || 0,
                    );
                }
            }

            for (const row of rows) {
                seq += 1;
                const orderPrefix = String(row.order_cd || '').substring(0, 10);
                const mrpSeqKey = `${orderPrefix}|${String(row.matl_cd || '')}|${String(row.matl_seq || '')}`;
                const mrpSeq = existingMrpSeqMap.has(mrpSeqKey)
                    ? existingMrpSeqMap.get(mrpSeqKey)!
                    : seq;

                const useRealQty = parseFloat(String(row.sum_qty || '0')) || 0;
                const useQty = this.roundProc(useRealQty);
                const matlPrice =
                    parseFloat(String(row.matl_price || '0')) || 0;
                const totAmt = useRealQty * matlPrice;

                const sqlIns = `
                    insert into ksv_po_mrptemp
                    (
                        user_id,
                        po_cd,
                        po_seq,
                        order_cd,
                        matl_cd,
                        mrp_seq,
                        matl_seq,
                        matl_price,
                        use_size,
                        use_qty,
                        po_qty,
                        bef_po_qty,
                        diff_qty,
                        diff_po_type,
                        change_reason,
                        use_po_type,
                        curr_cd,
                        tot_amt,
                        curr_date,
                        usd_amt,
                        status_cd,
                        reg_user,
                        reg_datetime,
                        use_real_qty,
                        use_int_qty
                    )
                    values
                    (
                        '${userEsc}',
                        '${poCdEsc}',
                        1,
                        '${this.escapeSqlLiteral(String(row.order_cd || ''))}',
                        '${this.escapeSqlLiteral(String(row.matl_cd || ''))}',
                        '${this.escapeSqlLiteral(String(mrpSeq))}',
                        '${this.escapeSqlLiteral(String(row.matl_seq || ''))}',
                        '${this.escapeSqlLiteral(String(matlPrice))}',
                        '',
                        '${this.escapeSqlLiteral(String(useQty))}',
                        '${this.escapeSqlLiteral(String(useQty))}',
                        0,
                        0,
                        0,
                        '',
                        1,
                        '${this.escapeSqlLiteral(String(row.curr_cd || ''))}',
                        '${this.escapeSqlLiteral(String(totAmt))}',
                        '${this.escapeSqlLiteral(currDate)}',
                        0,
                        0,
                        '${userEsc}',
                        '${this.escapeSqlLiteral(regDatetime)}',
                        '${this.escapeSqlLiteral(String(useRealQty))}',
                        '${this.escapeSqlLiteral(String(useQty))}'
                    )
                `;
                await this.prisma.$queryRaw(Prisma.raw(sqlIns));
            }

            const sqlGrp = `
                select
                    a.matl_cd,
                    sum(use_real_qty) as sum_qty
                from
                    ksv_po_mrptemp a
                where
                    a.user_id = '${userEsc}'
                    and a.po_cd = '${poCdEsc}'
                group by
                    a.matl_cd
                order by
                    a.matl_cd
            `;
            const grpRows = (await this.prisma.$queryRaw(
                Prisma.raw(sqlGrp),
            )) as any[];
            if (grpRows.length > 0) {
                const caseExpr = grpRows
                    .map((g) => {
                        const useSumQty = this.roundProc(
                            parseFloat(String(g.sum_qty || '0')) || 0,
                        );
                        return `when '${this.escapeSqlLiteral(String(g.matl_cd || ''))}' then '${this.escapeSqlLiteral(String(useSumQty))}'`;
                    })
                    .join(' ');
                const matlList = grpRows
                    .map(
                        (g) =>
                            `'${this.escapeSqlLiteral(String(g.matl_cd || ''))}'`,
                    )
                    .join(',');
                const sqlBatchUpd = `
                    update ksv_po_mrptemp
                    set use_sum_qty = case matl_cd ${caseExpr} end
                    where user_id = '${userEsc}'
                    and po_cd = '${poCdEsc}'
                    and matl_cd in (${matlList})
                `;
                await this.prisma.$queryRaw(Prisma.raw(sqlBatchUpd));
            }

            const sqlDist = `
                select
                    a.matl_cd,
                    count(*) as cnt,
                    a.use_sum_qty
                from
                    ksv_po_mrptemp a
                where
                    a.user_id = '${userEsc}'
                    and a.po_cd = '${poCdEsc}'
                group by
                    a.matl_cd,
                    use_sum_qty
                order by
                    a.matl_cd
            `;
            const distRows = (await this.prisma.$queryRaw(
                Prisma.raw(sqlDist),
            )) as any[];

            for (const d of distRows) {
                let cnt = parseInt(String(d.cnt || '0'), 10) || 0;
                let remain = parseFloat(String(d.use_sum_qty || '0')) || 0;
                const matlCd = String(d.matl_cd || '');

                const sqlM = `
                    select
                        a.mrp_seq,
                        a.use_real_qty
                    from
                        ksv_po_mrptemp a
                    where
                        a.user_id = '${userEsc}'
                        and a.po_cd = '${poCdEsc}'
                        and a.matl_cd = '${this.escapeSqlLiteral(matlCd)}'
                    order by
                        a.order_cd
                `;
                const mrpRows = (await this.prisma.$queryRaw(
                    Prisma.raw(sqlM),
                )) as any[];

                for (const m of mrpRows) {
                    let useQty = 0;
                    if (cnt === 1) {
                        useQty = remain;
                    } else {
                        useQty = Math.round(
                            parseFloat(String(m.use_real_qty || '0')) || 0,
                        );
                        remain -= useQty;
                        cnt -= 1;
                    }

                    const sqlU = `
                        update ksv_po_mrptemp
                        set
                            use_qty = '${this.escapeSqlLiteral(String(useQty))}',
                            po_qty = '${this.escapeSqlLiteral(String(useQty))}'
                        where
                            user_id = '${userEsc}'
                            and po_cd = '${poCdEsc}'
                            and matl_cd = '${this.escapeSqlLiteral(matlCd)}'
                            and mrp_seq = '${this.escapeSqlLiteral(String(m.mrp_seq || ''))}'
                    `;
                    await this.prisma.$queryRaw(Prisma.raw(sqlU));
                }
            }

            return { ok: true, step: 'kspPoMrpTemp' };
        } catch (error: any) {
            return {
                ok: false,
                step: 'kspPoMrpTemp',
                message: error?.message || 'unknown error',
            };
        }
    }

    async runPrintMrp0(
        input: PrintMrpMigrationInput,
    ): Promise<MrpMigrationResult> {
        try {
            await this.validatePrintInput(input);

            const userEsc = this.escapeSqlLiteral(input.userId);
            const poCdEsc = this.escapeSqlLiteral(input.poCd);
            const orderEsc = this.escapeSqlLiteral(input.orderCd);
            const currDateEsc = this.escapeSqlLiteral(
                await this.resolveCurrencyStartDate(input.currDate),
            );

            await this.prisma.$queryRaw(
                Prisma.raw(`
                    delete kzz_excel
                    where user_id = '${userEsc}'
                `),
            );

            const prodRows = (await this.prisma.$queryRaw(
                Prisma.raw(`
                    select
                        b.prod_cd
                    from
                        ksv_order_mem a,
                        ksv_prod_mst b
                    where
                        left(a.order_cd, 10) = '${orderEsc}'
                        and b.prod_cd = a.prod_cd
                        and a.add_flag = '0'
                    order by
                        b.color,
                        a.add_flag
                `),
            )) as any[];
            const prodCds = Array.from(
                new Set(prodRows.map((r) => String(r.prod_cd || ''))),
            );

            const kzzRows: Record<string, any>[] = [];
            let seq = 0;
            let rowNo = 0;

            // 모든 matl_cd의 useCheck 건수를 한 번에 미리 가져옵니다.
            const useCheckAllRows0 = (await this.prisma.$queryRaw(
                Prisma.raw(`
                    select matl_cd, count(*) as cnt
                    from ksv_po_mrp
                    where po_cd = '${poCdEsc}' and order_cd = '${orderEsc}' and po_matl_cd = '재고발주'
                    group by matl_cd
                `),
            )) as any[];
            const useCheckMap0 = new Map<string, number>(
                useCheckAllRows0.map((r) => [
                    String(r.matl_cd || ''),
                    parseInt(String(r.cnt || '0'), 10) || 0,
                ]),
            );

            const mRows = (await this.prisma.$queryRaw(
                Prisma.raw(`
                    select
                        a.matl_cd,
                        c.matl_name,
                        c.color,
                        c.spec,
                        c.unit,
                        d.matl_price,
                        d.curr_cd,
                        f.usd_rate,
                        a.use_size,
                        a.remark,
                        a.net,
                        a.loss,
                        a.gross,
                        b.vendor_name,
                        sum(a.ord_cnt) as ord_cnt,
                        sum(a.net_qty) as sum_qty,
                        d.conf_flag,
                        min(a.prod_seq) as prod_seq,
                        d.matl_price * f.usd_rate as usd_price,
                        case
                            when c.matl_type = 'M' then 'Main Matl'
                            else g.matl_type2
                        end as matl_type2,
                        g.bvt_matl_name
                    from
                        ksv_po_mrplist a,
                        kcd_vendor b,
                        kcd_matl_mst c,
                        kcd_matl_mem d,
                        kcd_currency f,
                        kcd_matl_type2 g
                    where
                        a.po_cd = '${poCdEsc}'
                        and a.order_cd = '${orderEsc}'
                        and b.vendor_cd = a.vendor_cd
                        and c.matl_cd = a.matl_cd
                        and d.matl_cd = a.matl_cd
                        and d.matl_seq = a.matl_seq
                        and f.curr_cd = d.curr_cd
                        and f.start_date = '${currDateEsc}'
                        and c.matl_type2 = g.seq
                    group by
                        a.matl_cd,
                        c.matl_name,
                        c.color,
                        c.spec,
                        c.unit,
                        d.matl_price,
                        d.curr_cd,
                        f.usd_rate,
                        a.use_size,
                        a.remark,
                        a.net,
                        a.loss,
                        a.gross,
                        b.vendor_name,
                        d.conf_flag,
                        c.matl_type,
                        g.matl_type2,
                        g.bvt_matl_name
                    order by
                        min(a.prod_seq),
                        c.matl_name,
                        c.color,
                        c.spec
                `),
            )) as any[];

            for (const one of mRows) {
                seq += 1;
                rowNo += 1;

                const matlCd = String(one.matl_cd || '');
                const useSize = String(one.use_size || '');
                const remark = String(one.remark || '');
                const net = parseFloat(String(one.net || '0')) || 0;
                const loss = parseFloat(String(one.loss || '0')) || 0;
                const gross = parseFloat(String(one.gross || '0')) || 0;
                const ordCnt = parseInt(String(one.ord_cnt || '0'), 10) || 0;
                const sumQty = Math.round(
                    (parseFloat(String(one.sum_qty || '0')) || 0) + 0.4999,
                );
                const matlPrice =
                    parseFloat(String(one.matl_price || '0')) || 0;
                const usdRate = parseFloat(String(one.usd_rate || '0')) || 0;
                const amount = sumQty * matlPrice;
                const usdAmt = amount * usdRate;
                const usdUnit = ordCnt > 0 ? usdAmt / ordCnt : 0;
                const confFlag =
                    String(one.conf_flag || '') === '0'
                        ? `* ${String(one.curr_cd || '')}`
                        : `  ${String(one.curr_cd || '')}`;

                const stars = await this.buildStarsForMrpList(
                    input,
                    prodCds,
                    matlCd,
                    useSize,
                    net,
                    loss,
                    gross,
                    remark,
                );

                const useCheck = useCheckMap0.get(matlCd) || 0;

                kzzRows.push({
                    userId: input.userId,
                    seq,
                    exType: 'M',
                    ex00: rowNo,
                    ex01: matlCd,
                    ex02: stars[0],
                    ex03: stars[1],
                    ex04: stars[2],
                    ex05: stars[3],
                    ex06: stars[4],
                    ex07: stars[5],
                    ex08: stars[6],
                    ex09: stars[7],
                    ex10: stars[8],
                    ex11: stars[9],
                    ex12: String(one.matl_name || ''),
                    ex13: String(one.color || ''),
                    ex14: String(one.spec || ''),
                    ex15: String(one.unit || ''),
                    ex16: net,
                    ex17: loss,
                    ex18: gross,
                    ex19: ordCnt,
                    ex20: sumQty,
                    ex21: matlPrice,
                    ex22: confFlag,
                    ex23: useSize,
                    ex24: amount,
                    ex25: usdAmt,
                    ex26: usdUnit,
                    ex27: remark,
                    ex28: String(one.vendor_name || ''),
                    ex29: useCheck,
                    ex36: parseFloat(String(one.usd_price || '0')) || 0,
                    ex37: String(one.matl_type2 || ''),
                    ex33: String(one.bvt_matl_name || ''),
                });
            }

            const sRows = (await this.prisma.$queryRaw(
                Prisma.raw(`
                    select
                        a.matl_cd,
                        c.matl_name,
                        c.color,
                        c.spec,
                        c.unit,
                        d.matl_price,
                        d.curr_cd,
                        f.usd_rate,
                        b.vendor_name,
                        sum(a.use_qty) as sum_qty,
                        d.conf_flag,
                        a.po_seq,
                        a.po_matl_cd,
                        d.matl_price * f.usd_rate as usd_price,
                        case
                            when c.matl_type = 'M' then 'Main Matl'
                            else g.matl_type2
                        end as matl_type2,
                        g.bvt_matl_name
                    from
                        ksv_po_mrp a,
                        kcd_vendor b,
                        kcd_matl_mst c,
                        kcd_matl_mem d,
                        kcd_currency f,
                        kcd_matl_type2 g
                    where
                        a.po_cd = '${poCdEsc}'
                        and a.po_seq < 100
                        and a.order_cd = '${orderEsc}'
                        and a.use_po_type = '2'
                        and b.vendor_cd = c.vendor_cd
                        and c.matl_cd = a.matl_cd
                        and d.matl_cd = a.matl_cd
                        and d.matl_seq = a.matl_seq
                        and f.curr_cd = d.curr_cd
                        and f.start_date = '${currDateEsc}'
                        and c.matl_type2 = g.seq
                    group by
                        a.matl_cd,
                        c.matl_name,
                        c.color,
                        c.spec,
                        c.unit,
                        d.matl_price,
                        d.curr_cd,
                        f.usd_rate,
                        b.vendor_name,
                        d.conf_flag,
                        a.po_seq,
                        a.po_matl_cd,
                        c.matl_type,
                        g.matl_type2,
                        g.bvt_matl_name
                    order by
                        a.po_seq,
                        c.matl_name,
                        a.po_matl_cd
                `),
            )) as any[];

            for (const one of sRows) {
                seq += 1;
                rowNo += 1;

                const matlCd = String(one.matl_cd || '');
                const sumQty = Math.round(
                    (parseFloat(String(one.sum_qty || '0')) || 0) + 0.4999,
                );
                const matlPrice =
                    parseFloat(String(one.matl_price || '0')) || 0;
                const usdRate = parseFloat(String(one.usd_rate || '0')) || 0;
                const amount = sumQty * matlPrice;
                const usdAmt = amount * usdRate;
                const confFlag =
                    String(one.conf_flag || '') === '0'
                        ? `* ${String(one.curr_cd || '')}`
                        : `  ${String(one.curr_cd || '')}`;

                const stars = await this.buildStarsForStock(
                    input,
                    prodCds,
                    matlCd,
                );

                kzzRows.push({
                    userId: input.userId,
                    seq,
                    exType: 'S',
                    ex00: rowNo,
                    ex01: matlCd,
                    ex02: stars[0],
                    ex03: stars[1],
                    ex04: stars[2],
                    ex05: stars[3],
                    ex06: stars[4],
                    ex07: stars[5],
                    ex08: stars[6],
                    ex09: stars[7],
                    ex10: stars[8],
                    ex11: stars[9],
                    ex12: String(one.matl_name || ''),
                    ex13: String(one.color || ''),
                    ex14: String(one.spec || ''),
                    ex15: String(one.unit || ''),
                    ex16: 0,
                    ex17: 0,
                    ex18: 0,
                    ex19: 0,
                    ex20: sumQty,
                    ex21: matlPrice,
                    ex22: confFlag,
                    ex23: '',
                    ex24: amount,
                    ex25: usdAmt,
                    ex26: 0,
                    ex27: `Stock(${String(one.po_matl_cd || '')})`,
                    ex28: String(one.vendor_name || ''),
                    ex36: parseFloat(String(one.usd_price || '0')) || 0,
                    ex37: String(one.matl_type2 || ''),
                    ex33: String(one.bvt_matl_name || ''),
                });
            }

            const aRows = (await this.prisma.$queryRaw(
                Prisma.raw(`
                    select
                        a.matl_cd,
                        c.matl_name,
                        c.color,
                        c.spec,
                        c.unit,
                        d.matl_price,
                        d.curr_cd,
                        f.usd_rate,
                        b.vendor_name,
                        a.use_qty,
                        d.conf_flag,
                        a.po_seq,
                        a.use_po_type,
                        d.matl_price * f.usd_rate as usd_price,
                        case
                            when c.matl_type = 'M' then 'Main Matl'
                            else g.matl_type2
                        end as matl_type2,
                        g.bvt_matl_name
                    from
                        ksv_po_mrp a,
                        kcd_vendor b,
                        kcd_matl_mst c,
                        kcd_matl_mem d,
                        kcd_currency f,
                        kcd_matl_type2 g
                    where
                        a.po_cd = '${poCdEsc}'
                        and a.po_seq > 100
                        and a.po_seq < 200
                        and a.order_cd = '${orderEsc}'
                        and b.vendor_cd = c.vendor_cd
                        and c.matl_cd = a.matl_cd
                        and d.matl_cd = a.matl_cd
                        and d.matl_seq = a.matl_seq
                        and f.curr_cd = d.curr_cd
                        and f.start_date = '${currDateEsc}'
                        and c.matl_type2 = g.seq
                    order by
                        a.po_seq,
                        c.matl_name,
                        c.color,
                        c.spec
                `),
            )) as any[];

            for (const one of aRows) {
                seq += 1;
                rowNo += 1;

                const sumQty = Math.round(
                    (parseFloat(String(one.use_qty || '0')) || 0) + 0.4999,
                );
                const matlPrice =
                    parseFloat(String(one.matl_price || '0')) || 0;
                const usdRate = parseFloat(String(one.usd_rate || '0')) || 0;
                const amount = sumQty * matlPrice;
                const usdAmt = amount * usdRate;
                const confFlag =
                    String(one.conf_flag || '') === '0'
                        ? `* ${String(one.curr_cd || '')}`
                        : `  ${String(one.curr_cd || '')}`;

                kzzRows.push({
                    userId: input.userId,
                    seq,
                    exType: 'A',
                    ex00: rowNo,
                    ex01: String(one.matl_cd || ''),
                    ex02: String(one.po_seq || ''),
                    ex03: '',
                    ex04: '',
                    ex05: '',
                    ex06: '',
                    ex07: '',
                    ex08: '',
                    ex09: '',
                    ex10: '',
                    ex11: '',
                    ex12: String(one.matl_name || ''),
                    ex13: String(one.color || ''),
                    ex14: String(one.spec || ''),
                    ex15: String(one.unit || ''),
                    ex16: 0,
                    ex17: 0,
                    ex18: 0,
                    ex19: 0,
                    ex20: sumQty,
                    ex21: matlPrice,
                    ex22: confFlag,
                    ex23: '',
                    ex24: amount,
                    ex25: usdAmt,
                    ex26: 0,
                    ex27: String(one.use_po_type || '') === '2' ? 'Stock' : '',
                    ex28: String(one.vendor_name || ''),
                    ex36: parseFloat(String(one.usd_price || '0')) || 0,
                    ex37: String(one.matl_type2 || ''),
                    ex33: String(one.bvt_matl_name || ''),
                });
            }

            await this.insertKzzExcelRowsBulk(kzzRows);
            return { ok: true, step: 'kspPrintMrp0' };
        } catch (error: any) {
            return {
                ok: false,
                step: 'kspPrintMrp0',
                message: error?.message || 'unknown error',
            };
        }
    }

    async runPrintMrp1(
        input: PrintMrpMigrationInput,
    ): Promise<MrpMigrationResult> {
        try {
            await this.validatePrintInput(input);

            const userEsc = this.escapeSqlLiteral(input.userId);
            const poCdEsc = this.escapeSqlLiteral(input.poCd);
            const orderEsc = this.escapeSqlLiteral(input.orderCd);
            const currDateEsc = this.escapeSqlLiteral(
                await this.resolveCurrencyStartDate(input.currDate),
            );

            await this.prisma.$queryRaw(
                Prisma.raw(`
                    delete kzz_excel
                    where user_id = '${userEsc}'
                `),
            );

            const prodRows = (await this.prisma.$queryRaw(
                Prisma.raw(`
                    select
                        b.prod_cd
                    from
                        ksv_order_mem a,
                        ksv_prod_mst b
                    where
                        a.order_cd = '${orderEsc}'
                        and b.prod_cd = a.prod_cd
                        and a.add_flag = '0'
                    order by
                        b.color,
                        a.add_flag
                `),
            )) as any[];
            const prodCds = Array.from(
                new Set(prodRows.map((r) => String(r.prod_cd || ''))),
            );

            const rows = (await this.prisma.$queryRaw(
                Prisma.raw(`
                    select
                        a.matl_cd,
                        c.matl_name,
                        c.color,
                        c.spec,
                        c.unit,
                        d.matl_price,
                        d.curr_cd,
                        f.usd_rate,
                        a.use_size,
                        a.remark,
                        a.net,
                        a.loss,
                        a.gross,
                        b.vendor_name,
                        sum(a.ord_cnt) as ord_cnt,
                        sum(a.net_qty) as sum_qty,
                        d.conf_flag,
                        min(a.prod_seq) as prod_seq,
                        h.nat_name,
                        g.bvt_matl_name,
                        a.bvt_remark,
                        d.matl_price * f.usd_rate as usd_price,
                        case
                            when c.matl_type = 'M' then 'Main Matl'
                            else g.matl_type2
                        end as matl_type2
                    from
                        ksv_po_mrpnettemp a
                        join kcd_vendor b on b.vendor_cd = a.vendor_cd
                        join kcd_matl_mst c on c.matl_cd = a.matl_cd
                        join kcd_matl_mem d on d.matl_cd = a.matl_cd and d.matl_seq = a.matl_seq
                        join kcd_currency f on f.curr_cd = d.curr_cd and f.start_date = '${currDateEsc}'
                        left join kcd_nation h on a.country = h.nat_cd
                        join kcd_matl_type2 g on c.matl_type2 = g.seq
                    where
                        a.user_id = '${userEsc}'
                        and a.po_cd = '${poCdEsc}'
                        and a.order_cd = '${orderEsc}'
                        -- TS fallback kept for later replacement if needed:
                        -- and left(a.order_cd, 10) = '${orderEsc}'
                    group by
                        a.matl_cd,
                        c.matl_name,
                        c.color,
                        c.spec,
                        c.unit,
                        d.matl_price,
                        d.curr_cd,
                        f.usd_rate,
                        a.use_size,
                        a.remark,
                        a.net,
                        a.loss,
                        a.gross,
                        b.vendor_name,
                        d.conf_flag,
                        h.nat_name,
                        g.bvt_matl_name,
                        a.bvt_remark,
                        c.matl_type,
                        g.matl_type2
                    order by
                        min(a.prod_seq),
                        c.matl_name,
                        c.color,
                        c.spec
                `),
            )) as any[];

            let seq = 0;
            let rowNo = 0;
            const kzzRows1: Record<string, any>[] = [];
            for (const one of rows) {
                seq += 1;
                rowNo += 1;

                const matlCd = String(one.matl_cd || '');
                const useSize = String(one.use_size || '');
                const remark = String(one.remark || '');
                const net = parseFloat(String(one.net || '0')) || 0;
                const loss = parseFloat(String(one.loss || '0')) || 0;
                const gross = parseFloat(String(one.gross || '0')) || 0;
                const ordCnt = parseInt(String(one.ord_cnt || '0'), 10) || 0;
                const sumQty = Math.round(
                    (parseFloat(String(one.sum_qty || '0')) || 0) + 0.4999,
                );
                const matlPrice =
                    parseFloat(String(one.matl_price || '0')) || 0;
                const usdRate = parseFloat(String(one.usd_rate || '0')) || 0;
                const amount = sumQty * matlPrice;
                const usdAmt = amount * usdRate;
                const usdUnit = ordCnt > 0 ? usdAmt / ordCnt : 0;
                const confFlag =
                    String(one.conf_flag || '') === '0'
                        ? `* ${String(one.curr_cd || '')}`
                        : `  ${String(one.curr_cd || '')}`;

                const stars = await this.buildStarsForMrpNetTemp(
                    input,
                    prodCds,
                    matlCd,
                    useSize,
                    net,
                    loss,
                    gross,
                    remark,
                );

                kzzRows1.push({
                    userId: input.userId,
                    seq,
                    exType: 'M',
                    ex00: rowNo,
                    ex01: matlCd,
                    ex02: stars[0],
                    ex03: stars[1],
                    ex04: stars[2],
                    ex05: stars[3],
                    ex06: stars[4],
                    ex07: stars[5],
                    ex08: stars[6],
                    ex09: stars[7],
                    ex10: stars[8],
                    ex11: stars[9],
                    ex12: String(one.matl_name || ''),
                    ex13: String(one.color || ''),
                    ex14: String(one.spec || ''),
                    ex15: String(one.unit || ''),
                    ex16: net,
                    ex17: loss,
                    ex18: gross,
                    ex19: ordCnt,
                    ex20: sumQty,
                    ex21: matlPrice,
                    ex22: confFlag,
                    ex23: useSize,
                    ex24: amount,
                    ex25: usdAmt,
                    ex26: usdUnit,
                    ex27: remark,
                    ex28: String(one.vendor_name || ''),
                    ex35: String(one.nat_name || ''),
                    ex33: String(one.bvt_matl_name || ''),
                    ex34: String(one.bvt_remark || ''),
                    ex36: parseFloat(String(one.usd_price || '0')) || 0,
                    ex37: String(one.matl_type2 || ''),
                });
            }

            await this.insertKzzExcelRowsBulk(kzzRows1);
            return { ok: true, step: 'kspPrintMrp1' };
        } catch (error: any) {
            return {
                ok: false,
                step: 'kspPrintMrp1',
                message: error?.message || 'unknown error',
            };
        }
    }

    async runPrintMrpP0(
        input: PrintMrpPMigrationInput,
    ): Promise<MrpMigrationResult> {
        try {
            await this.validatePrintPInput(input);

            const userEsc = this.escapeSqlLiteral(input.userId);
            const poCdEsc = this.escapeSqlLiteral(input.poCd);
            const orderEsc = this.escapeSqlLiteral(input.orderCd);
            const prodCdEsc = this.escapeSqlLiteral(input.prodCd);
            const addFlagEsc = this.escapeSqlLiteral(input.addFlag);
            const currDateEsc = this.escapeSqlLiteral(
                await this.resolveCurrencyStartDate(input.currDate),
            );

            await this.prisma.$queryRaw(
                Prisma.raw(`
                    delete kzz_excel
                    where user_id = '${userEsc}'
                `),
            );

            let seq = 0;
            let rowNo = 0;

            const kzzRowsP0: Record<string, any>[] = [];

            // 모든 matl_cd의 useCheck 건수를 한 번에 미리 가져옵니다.
            const useCheckAllRowsP0 = (await this.prisma.$queryRaw(
                Prisma.raw(`
                    select matl_cd, count(*) as cnt
                    from ksv_po_mrp
                    where po_cd = '${poCdEsc}' and order_cd = '${orderEsc}' and po_matl_cd = '재고발주'
                    group by matl_cd
                `),
            )) as any[];
            const useCheckMapP0 = new Map<string, number>(
                useCheckAllRowsP0.map((r) => [
                    String(r.matl_cd || ''),
                    parseInt(String(r.cnt || '0'), 10) || 0,
                ]),
            );

            // ksv_po_mrplist에서 prodCd/addFlag로 거른 M 타입 행입니다.
            const mRows = (await this.prisma.$queryRaw(
                Prisma.raw(`
                    select
                        a.matl_cd,
                        c.matl_name,
                        c.color,
                        c.spec,
                        c.unit,
                        d.matl_price,
                        d.curr_cd,
                        f.usd_rate,
                        a.use_size,
                        a.remark,
                        a.net,
                        a.loss,
                        a.gross,
                        b.vendor_name,
                        sum(a.ord_cnt) as ord_cnt,
                        sum(a.net_qty) as sum_qty,
                        d.conf_flag,
                        min(a.prod_seq) as prod_seq,
                        d.matl_price * f.usd_rate as usd_price
                    from
                        ksv_po_mrplist a,
                        kcd_vendor b,
                        kcd_matl_mst c,
                        kcd_matl_mem d,
                        kcd_currency f
                    where
                        a.po_cd = '${poCdEsc}'
                        and a.order_cd = '${orderEsc}'
                        and a.prod_cd = '${prodCdEsc}'
                        and a.add_flag = '${addFlagEsc}'
                        and b.vendor_cd = a.vendor_cd
                        and c.matl_cd = a.matl_cd
                        and d.matl_cd = a.matl_cd
                        and d.matl_seq = a.matl_seq
                        and f.curr_cd = d.curr_cd
                        and f.start_date = '${currDateEsc}'
                    group by
                        a.matl_cd,
                        c.matl_name,
                        c.color,
                        c.spec,
                        c.unit,
                        d.matl_price,
                        d.curr_cd,
                        f.usd_rate,
                        a.use_size,
                        a.remark,
                        a.net,
                        a.loss,
                        a.gross,
                        b.vendor_name,
                        d.conf_flag
                    order by
                        min(a.prod_seq),
                        c.matl_name,
                        c.color,
                        c.spec
                `),
            )) as any[];

            for (const one of mRows) {
                seq += 1;
                rowNo += 1;

                const matlCd = String(one.matl_cd || '');
                const net = parseFloat(String(one.net || '0')) || 0;
                const loss = parseFloat(String(one.loss || '0')) || 0;
                const gross = parseFloat(String(one.gross || '0')) || 0;
                const ordCnt = parseInt(String(one.ord_cnt || '0'), 10) || 0;
                const sumQty = Math.round(
                    (parseFloat(String(one.sum_qty || '0')) || 0) + 0.4999,
                );
                const matlPrice =
                    parseFloat(String(one.matl_price || '0')) || 0;
                const usdRate = parseFloat(String(one.usd_rate || '0')) || 0;
                const amount = sumQty * matlPrice;
                const usdAmt = amount * usdRate;
                const usdUnit = ordCnt > 0 ? usdAmt / ordCnt : 0;
                const confFlag =
                    String(one.conf_flag || '') === '0'
                        ? `* ${String(one.curr_cd || '')}`
                        : `  ${String(one.curr_cd || '')}`;

                const useCheck = useCheckMapP0.get(matlCd) || 0;

                kzzRowsP0.push({
                    userId: input.userId,
                    seq,
                    exType: 'M',
                    ex00: rowNo,
                    ex01: matlCd,
                    ex02: '*',
                    ex03: String(one.matl_name || ''),
                    ex04: String(one.color || ''),
                    ex05: String(one.spec || ''),
                    ex06: String(one.unit || ''),
                    ex07: net,
                    ex08: loss,
                    ex09: gross,
                    ex10: ordCnt,
                    ex11: sumQty,
                    ex12: matlPrice,
                    ex13: confFlag,
                    ex14: String(one.use_size || ''),
                    ex15: amount,
                    ex16: usdAmt,
                    ex17: usdUnit,
                    ex18: String(one.remark || ''),
                    ex19: String(one.vendor_name || ''),
                    ex20: useCheck,
                    ex36: parseFloat(String(one.usd_price || '0')) || 0,
                });
            }

            // ksv_po_mrp에서 가져온 S 타입 행입니다. (po_seq < 100, use_po_type='2')
            const sRows = (await this.prisma.$queryRaw(
                Prisma.raw(`
                    select
                        a.matl_cd,
                        c.matl_name,
                        c.color,
                        c.spec,
                        c.unit,
                        d.matl_price,
                        d.curr_cd,
                        f.usd_rate,
                        b.vendor_name,
                        sum(a.use_qty) as sum_qty,
                        d.conf_flag,
                        a.po_seq,
                        a.po_matl_cd,
                        d.matl_price * f.usd_rate as usd_price
                    from
                        ksv_po_mrp a,
                        kcd_vendor b,
                        kcd_matl_mst c,
                        kcd_matl_mem d,
                        kcd_currency f
                    where
                        a.po_cd = '${poCdEsc}'
                        and a.po_seq < 100
                        and a.order_cd = '${orderEsc}'
                        and a.use_po_type = '2'
                        and b.vendor_cd = c.vendor_cd
                        and c.matl_cd = a.matl_cd
                        and d.matl_cd = a.matl_cd
                        and d.matl_seq = a.matl_seq
                        and f.curr_cd = d.curr_cd
                        and f.start_date = '${currDateEsc}'
                    group by
                        a.matl_cd,
                        c.matl_name,
                        c.color,
                        c.spec,
                        c.unit,
                        d.matl_price,
                        d.curr_cd,
                        f.usd_rate,
                        b.vendor_name,
                        d.conf_flag,
                        a.po_seq,
                        a.po_matl_cd
                    order by
                        a.po_seq,
                        c.matl_name,
                        a.po_matl_cd
                `),
            )) as any[];

            for (const one of sRows) {
                seq += 1;
                rowNo += 1;

                const sumQty = Math.round(
                    (parseFloat(String(one.sum_qty || '0')) || 0) + 0.4999,
                );
                const matlPrice =
                    parseFloat(String(one.matl_price || '0')) || 0;
                const usdRate = parseFloat(String(one.usd_rate || '0')) || 0;
                const amount = sumQty * matlPrice;
                const usdAmt = amount * usdRate;
                const usdUnit = 0;
                const confFlag =
                    String(one.conf_flag || '') === '0'
                        ? `* ${String(one.curr_cd || '')}`
                        : `  ${String(one.curr_cd || '')}`;

                kzzRowsP0.push({
                    userId: input.userId,
                    seq,
                    exType: 'S',
                    ex00: rowNo,
                    ex01: String(one.matl_cd || ''),
                    ex02: '*',
                    ex03: String(one.matl_name || ''),
                    ex04: String(one.color || ''),
                    ex05: String(one.spec || ''),
                    ex06: String(one.unit || ''),
                    ex07: 0,
                    ex08: 0,
                    ex09: 0,
                    ex10: 0,
                    ex11: sumQty,
                    ex12: matlPrice,
                    ex13: confFlag,
                    ex14: '',
                    ex15: amount,
                    ex16: usdAmt,
                    ex17: usdUnit,
                    ex18: `Stock(${String(one.po_matl_cd || '')})`,
                    ex19: String(one.vendor_name || ''),
                    ex36: parseFloat(String(one.usd_price || '0')) || 0,
                });
            }

            // ksv_po_mrp에서 가져온 A 타입 행입니다. (po_seq 100~200)
            const aRows = (await this.prisma.$queryRaw(
                Prisma.raw(`
                    select
                        a.matl_cd,
                        c.matl_name,
                        c.color,
                        c.spec,
                        c.unit,
                        d.matl_price,
                        d.curr_cd,
                        f.usd_rate,
                        b.vendor_name,
                        a.use_qty,
                        d.conf_flag,
                        a.po_seq,
                        a.use_po_type,
                        d.matl_price * f.usd_rate as usd_price
                    from
                        ksv_po_mrp a,
                        kcd_vendor b,
                        kcd_matl_mst c,
                        kcd_matl_mem d,
                        kcd_currency f
                    where
                        a.po_cd = '${poCdEsc}'
                        and a.po_seq > 100
                        and a.po_seq < 200
                        and a.order_cd = '${orderEsc}'
                        and b.vendor_cd = c.vendor_cd
                        and c.matl_cd = a.matl_cd
                        and d.matl_cd = a.matl_cd
                        and d.matl_seq = a.matl_seq
                        and f.curr_cd = d.curr_cd
                        and f.start_date = '${currDateEsc}'
                    order by
                        a.po_seq,
                        c.matl_name,
                        c.color,
                        c.spec
                `),
            )) as any[];

            for (const one of aRows) {
                seq += 1;
                rowNo += 1;

                const sumQty = Math.round(
                    (parseFloat(String(one.use_qty || '0')) || 0) + 0.4999,
                );
                const matlPrice =
                    parseFloat(String(one.matl_price || '0')) || 0;
                const usdRate = parseFloat(String(one.usd_rate || '0')) || 0;
                const amount = sumQty * matlPrice;
                const usdAmt = amount * usdRate;
                const confFlag =
                    String(one.conf_flag || '') === '0'
                        ? `* ${String(one.curr_cd || '')}`
                        : `  ${String(one.curr_cd || '')}`;

                kzzRowsP0.push({
                    userId: input.userId,
                    seq,
                    exType: 'A',
                    ex00: rowNo,
                    ex01: String(one.matl_cd || ''),
                    ex02: String(one.po_seq || ''),
                    ex03: String(one.matl_name || ''),
                    ex04: String(one.color || ''),
                    ex05: String(one.spec || ''),
                    ex06: String(one.unit || ''),
                    ex07: 0,
                    ex08: 0,
                    ex09: 0,
                    ex10: 0,
                    ex11: sumQty,
                    ex12: matlPrice,
                    ex13: confFlag,
                    ex14: '',
                    ex15: amount,
                    ex16: usdAmt,
                    ex17: 0,
                    ex18: String(one.use_po_type || '') === '2' ? 'Stock' : '',
                    ex19: String(one.vendor_name || ''),
                    ex36: parseFloat(String(one.usd_price || '0')) || 0,
                });
            }

            await this.insertKzzExcelRowsBulk(kzzRowsP0);
            return { ok: true, step: 'kspPrintMrpP0' };
        } catch (error: any) {
            return {
                ok: false,
                step: 'kspPrintMrpP0',
                message: error?.message || 'unknown error',
            };
        }
    }

    async runPrintMrpP1(
        input: PrintMrpPMigrationInput,
    ): Promise<MrpMigrationResult> {
        try {
            await this.validatePrintPInput(input);

            const userEsc = this.escapeSqlLiteral(input.userId);
            const poCdEsc = this.escapeSqlLiteral(input.poCd);
            const orderEsc = this.escapeSqlLiteral(input.orderCd);
            const prodCdEsc = this.escapeSqlLiteral(input.prodCd);
            const addFlagEsc = this.escapeSqlLiteral(input.addFlag);
            const currDateEsc = this.escapeSqlLiteral(
                await this.resolveCurrencyStartDate(input.currDate),
            );

            await this.prisma.$queryRaw(
                Prisma.raw(`
                    delete kzz_excel
                    where user_id = '${userEsc}'
                `),
            );

            // ksv_po_mrpnettemp에서 prodCd/addFlag로 거른 M 타입 행입니다.
            const rows = (await this.prisma.$queryRaw(
                Prisma.raw(`
                    select
                        a.matl_cd,
                        c.matl_name,
                        c.color,
                        c.spec,
                        c.unit,
                        d.matl_price,
                        d.curr_cd,
                        f.usd_rate,
                        a.use_size,
                        a.remark,
                        a.net,
                        a.loss,
                        a.gross,
                        b.vendor_name,
                        sum(a.ord_cnt) as ord_cnt,
                        sum(a.net_qty) as sum_qty,
                        d.conf_flag,
                        min(a.prod_seq) as prod_seq,
                        d.matl_price * f.usd_rate as usd_price
                    from
                        ksv_po_mrpnettemp a,
                        kcd_vendor b,
                        kcd_matl_mst c,
                        kcd_matl_mem d,
                        kcd_currency f
                    where
                        a.user_id = '${userEsc}'
                        and a.po_cd = '${poCdEsc}'
                        and a.order_cd = '${orderEsc}'
                        and a.prod_cd = '${prodCdEsc}'
                        and a.add_flag = '${addFlagEsc}'
                        and b.vendor_cd = a.vendor_cd
                        and c.matl_cd = a.matl_cd
                        and d.matl_cd = a.matl_cd
                        and d.matl_seq = a.matl_seq
                        and f.curr_cd = d.curr_cd
                        and f.start_date = '${currDateEsc}'
                    group by
                        a.matl_cd,
                        c.matl_name,
                        c.color,
                        c.spec,
                        c.unit,
                        d.matl_price,
                        d.curr_cd,
                        f.usd_rate,
                        a.use_size,
                        a.remark,
                        a.net,
                        a.loss,
                        a.gross,
                        b.vendor_name,
                        d.conf_flag
                    order by
                        min(a.prod_seq),
                        c.matl_name,
                        c.color,
                        c.spec
                `),
            )) as any[];

            let seq = 0;
            let rowNo = 0;
            const kzzRowsP1: Record<string, any>[] = [];
            for (const one of rows) {
                seq += 1;
                rowNo += 1;

                const net = parseFloat(String(one.net || '0')) || 0;
                const loss = parseFloat(String(one.loss || '0')) || 0;
                const gross = parseFloat(String(one.gross || '0')) || 0;
                const ordCnt = parseInt(String(one.ord_cnt || '0'), 10) || 0;
                const sumQty = Math.round(
                    (parseFloat(String(one.sum_qty || '0')) || 0) + 0.4999,
                );
                const matlPrice =
                    parseFloat(String(one.matl_price || '0')) || 0;
                const usdRate = parseFloat(String(one.usd_rate || '0')) || 0;
                const amount = sumQty * matlPrice;
                const usdAmt = amount * usdRate;
                const usdUnit = ordCnt > 0 ? usdAmt / ordCnt : 0;
                const confFlag =
                    String(one.conf_flag || '') === '0'
                        ? `* ${String(one.curr_cd || '')}`
                        : `  ${String(one.curr_cd || '')}`;

                kzzRowsP1.push({
                    userId: input.userId,
                    seq,
                    exType: 'M',
                    ex00: rowNo,
                    ex01: String(one.matl_cd || ''),
                    ex02: '*',
                    ex03: String(one.matl_name || ''),
                    ex04: String(one.color || ''),
                    ex05: String(one.spec || ''),
                    ex06: String(one.unit || ''),
                    ex07: net,
                    ex08: loss,
                    ex09: gross,
                    ex10: ordCnt,
                    ex11: sumQty,
                    ex12: matlPrice,
                    ex13: confFlag,
                    ex14: String(one.use_size || ''),
                    ex15: amount,
                    ex16: usdAmt,
                    ex17: usdUnit,
                    ex18: String(one.remark || ''),
                    ex19: String(one.vendor_name || ''),
                    ex36: parseFloat(String(one.usd_price || '0')) || 0,
                });
            }

            await this.insertKzzExcelRowsBulk(kzzRowsP1);
            return { ok: true, step: 'kspPrintMrpP1' };
        } catch (error: any) {
            return {
                ok: false,
                step: 'kspPrintMrpP1',
                message: error?.message || 'unknown error',
            };
        }
    }

    // 마이그레이션 완료: kspPoMrpNetProductCost (임시 테이블 ksv_order_mem_temp / ksv_order_mst_temp 사용)
    async runNetProductCost(userId: string): Promise<MrpMigrationResult> {
        try {
            if (!userId) throw new Error('userId is required');
            const userEsc = this.escapeSqlLiteral(userId);

            await this.deleteMrpNetTempByUser(userId);

            const rows = (await this.prisma.$queryRaw(
                Prisma.raw(`
                    select
                        '${userEsc}' as po_cd,
                        b.order_cd,
                        b.prod_cd,
                        '0' as add_flag,
                        c.matl_cd,
                        e.matl_seq,
                        c.seq as prod_seq,
                        c.use_size,
                        c.remark,
                        c.net,
                        c.loss,
                        c.gross,
                        d.vendor_cd,
                        b2.size_group,
                        b.size_cnt,
                        d.count_flag,
                        f.size_cnt as size_max,
                        '' as nat_cd,
                        c.country,
                        c.bvt_remark
                    from
                        ksv_order_mem_temp b,
                        ksv_prod_mem c,
                        kcd_matl_mst d,
                        kcd_matl_mem e,
                        ksv_order_mst_temp b2,
                        kcd_size_mst f
                    where
                        b.order_cd = '${userEsc}'
                        and b.order_cd = b2.order_cd
                        and c.prod_cd = b.prod_cd
                        and d.matl_cd = c.matl_cd
                        and e.matl_cd = c.matl_cd
                        and e.matl_seq = (
                            select max(matl_seq)
                            from kcd_matl_mem
                            where matl_cd = c.matl_cd
                        )
                        and f.size_group = b2.size_group
                `),
            )) as any[];

            await this.insertNetTempRows(
                rows,
                { poCd: userId, userId },
                {
                    normalizeUseSize: true,
                    applyCountryFilter: false,
                    includeBvtRemark: true,
                },
            );

            // poCd=userId로 kspPoMrpNetTempCountry를 호출하면 ksv_po_mem에 합본 오더가 없어 실제로는 동작이 없습니다.
            await this.runNetTempCountry({ poCd: userId, userId });

            return { ok: true, step: 'kspPoMrpNetProductCost' };
        } catch (error: any) {
            return {
                ok: false,
                step: 'kspPoMrpNetProductCost',
                message: error?.message || 'unknown error',
            };
        }
    }

    // 마이그레이션 완료: kspPrintMrp1Temp (runPrintMrp1과 같지만 prod 목록은 ksv_order_mem_temp에서 읽음)
    async runPrintMrp1Temp(
        userId: string,
        currDate: string,
    ): Promise<MrpMigrationResult> {
        try {
            if (!userId) throw new Error('userId is required');
            if (!currDate) throw new Error('currDate is required');

            const userEsc = this.escapeSqlLiteral(userId);
            const currDateEsc = this.escapeSqlLiteral(currDate);

            await this.prisma.$queryRaw(
                Prisma.raw(`delete kzz_excel where user_id = '${userEsc}'`),
            );

            // prod 목록은 임시 테이블에서 가져옵니다. (별표 계산 기준)
            const prodRows = (await this.prisma.$queryRaw(
                Prisma.raw(`
                    select b.prod_cd
                    from ksv_order_mem_temp a, ksv_prod_mst b
                    where a.order_cd = '${userEsc}'
                    and b.prod_cd = a.prod_cd
                    order by b.color
                `),
            )) as any[];
            const prodCds = prodRows.map((r) => String(r.prod_cd || ''));

            // mgrQuery_S0202_REPORT_3에서 호출되면 poCd = orderCd = userNo = userId 입니다.
            const fakeInput: PrintMrpMigrationInput = {
                poCd: userId,
                orderCd: userId,
                userId,
                currDate,
            };

            const rows = (await this.prisma.$queryRaw(
                Prisma.raw(`
                    select
                        a.matl_cd,
                        c.matl_name,
                        c.color,
                        c.spec,
                        c.unit,
                        d.matl_price,
                        d.curr_cd,
                        f.usd_rate,
                        a.use_size,
                        a.remark,
                        a.net,
                        a.loss,
                        a.gross,
                        b.vendor_name,
                        sum(a.ord_cnt) as ord_cnt,
                        sum(a.net_qty) as sum_qty,
                        d.conf_flag,
                        min(a.prod_seq) as prod_seq,
                        h.nat_name,
                        g.bvt_matl_name,
                        a.bvt_remark,
                        d.matl_price * f.usd_rate as usd_price,
                        case
                            when c.matl_type = 'M' then 'Main Matl'
                            else g.matl_type2
                        end as matl_type2
                    from
                        ksv_po_mrpnettemp a
                        join kcd_vendor b on b.vendor_cd = a.vendor_cd
                        join kcd_matl_mst c on c.matl_cd = a.matl_cd
                        join kcd_matl_mem d on d.matl_cd = a.matl_cd and d.matl_seq = a.matl_seq
                        join kcd_currency f on f.curr_cd = d.curr_cd and f.start_date = '${currDateEsc}'
                        left join kcd_nation h on a.country = h.nat_cd
                        join kcd_matl_type2 g on c.matl_type2 = g.seq
                    where
                        a.user_id = '${userEsc}'
                        and a.po_cd = '${userEsc}'
                        and a.order_cd = '${userEsc}'
                    group by
                        a.matl_cd,
                        c.matl_name,
                        c.color,
                        c.spec,
                        c.unit,
                        d.matl_price,
                        d.curr_cd,
                        f.usd_rate,
                        a.use_size,
                        a.remark,
                        a.net,
                        a.loss,
                        a.gross,
                        b.vendor_name,
                        d.conf_flag,
                        h.nat_name,
                        g.bvt_matl_name,
                        a.bvt_remark,
                        c.matl_type,
                        g.matl_type2
                    order by
                        min(a.prod_seq),
                        c.matl_name,
                        c.color,
                        c.spec
                `),
            )) as any[];

            let seq = 0;
            let rowNo = 0;
            const kzzRows1Temp: Record<string, any>[] = [];
            for (const one of rows) {
                seq += 1;
                rowNo += 1;

                const matlCd = String(one.matl_cd || '');
                const useSize = String(one.use_size || '');
                const remark = String(one.remark || '');
                const net = parseFloat(String(one.net || '0')) || 0;
                const loss = parseFloat(String(one.loss || '0')) || 0;
                const gross = parseFloat(String(one.gross || '0')) || 0;
                const ordCnt = parseInt(String(one.ord_cnt || '0'), 10) || 0;
                const sumQty = Math.round(
                    (parseFloat(String(one.sum_qty || '0')) || 0) + 0.4999,
                );
                const matlPrice =
                    parseFloat(String(one.matl_price || '0')) || 0;
                const usdRate = parseFloat(String(one.usd_rate || '0')) || 0;
                const amount = sumQty * matlPrice;
                const usdAmt = amount * usdRate;
                const usdUnit = ordCnt > 0 ? usdAmt / ordCnt : 0;
                const confFlag =
                    String(one.conf_flag || '') === '0'
                        ? `* ${String(one.curr_cd || '')}`
                        : `  ${String(one.curr_cd || '')}`;

                const stars = await this.buildStarsForMrpNetTemp(
                    fakeInput,
                    prodCds,
                    matlCd,
                    useSize,
                    net,
                    loss,
                    gross,
                    remark,
                );

                kzzRows1Temp.push({
                    userId,
                    seq,
                    exType: 'M',
                    ex00: rowNo,
                    ex01: matlCd,
                    ex02: stars[0],
                    ex03: stars[1],
                    ex04: stars[2],
                    ex05: stars[3],
                    ex06: stars[4],
                    ex07: stars[5],
                    ex08: stars[6],
                    ex09: stars[7],
                    ex10: stars[8],
                    ex11: stars[9],
                    ex12: String(one.matl_name || ''),
                    ex13: String(one.color || ''),
                    ex14: String(one.spec || ''),
                    ex15: String(one.unit || ''),
                    ex16: net,
                    ex17: loss,
                    ex18: gross,
                    ex19: ordCnt,
                    ex20: sumQty,
                    ex21: matlPrice,
                    ex22: confFlag,
                    ex23: useSize,
                    ex24: amount,
                    ex25: usdAmt,
                    ex26: usdUnit,
                    ex27: remark,
                    ex28: String(one.vendor_name || ''),
                    ex35: String(one.nat_name || ''),
                    ex33: String(one.bvt_matl_name || ''),
                    ex34: String(one.bvt_remark || ''),
                    ex36: parseFloat(String(one.usd_price || '0')) || 0,
                    ex37: String(one.matl_type2 || ''),
                });
            }

            await this.insertKzzExcelRowsBulk(kzzRows1Temp);
            return { ok: true, step: 'kspPrintMrp1Temp' };
        } catch (error: any) {
            return {
                ok: false,
                step: 'kspPrintMrp1Temp',
                message: error?.message || 'unknown error',
            };
        }
    }

    // 래퍼 마이그레이션 단계: S030501 삭제 흐름에서 쓰는 기존 프로시저 호출을 한곳으로 모읍니다.
    async runPoMrpAdjCancel(
        input: PoMrpAdjCancelInput,
    ): Promise<MrpMigrationResult> {
        try {
            if (!input.poCd) throw new Error('poCd is required');
            if (!input.poSeq) throw new Error('poSeq is required');

            const poCdEsc = this.escapeSqlLiteral(input.poCd);
            const poSeq = parseInt(String(input.poSeq), 10);
            if (Number.isNaN(poSeq)) throw new Error('poSeq must be numeric');

            const stockUseRows = (await this.prisma.$queryRaw(
                Prisma.raw(`
                    select
                        stock_idx,
                        use_qty
                    from
                        ksv_stock_use
                    where
                        use_po_cd = '${poCdEsc}'
                        and use_po_seq = ${poSeq}
                `),
            )) as any[];

            for (const row of stockUseRows) {
                const stockIdx = this.escapeSqlLiteral(
                    String(row.stock_idx || ''),
                );
                const useQty = parseFloat(String(row.use_qty || '0')) || 0;
                await this.prisma.$queryRaw(
                    Prisma.raw(`
                        update ksv_stock_matl
                        set
                            remain_qty = remain_qty + ${useQty},
                            use_qty = use_qty - ${useQty}
                        where
                            stock_idx = '${stockIdx}'
                    `),
                );
            }

            await this.prisma.$queryRaw(
                Prisma.raw(`
                    delete ksv_stock_use
                    where
                        use_po_cd = '${poCdEsc}'
                        and use_po_seq = ${poSeq}
                `),
            );

            const mrpRows = (await this.prisma.$queryRaw(
                Prisma.raw(`
                    select
                        a.order_cd,
                        a.matl_cd,
                        a.mrp_seq,
                        a.org_po_seq,
                        a.diff_po_type,
                        a.diff_qty,
                        a.stock_idx
                    from
                        ksv_po_mrp a
                    where
                        a.po_cd = '${poCdEsc}'
                        and a.po_seq = ${poSeq}
                    order by
                        a.diff_po_type
                `),
            )) as any[];

            for (const row of mrpRows) {
                const orderCdEsc = this.escapeSqlLiteral(
                    String(row.order_cd || ''),
                );
                const matlCdEsc = this.escapeSqlLiteral(
                    String(row.matl_cd || ''),
                );
                const mrpSeq = parseInt(String(row.mrp_seq || '0'), 10) || 0;
                const orgPoSeq =
                    parseInt(String(row.org_po_seq || '0'), 10) || 0;
                const diffPoType = String(row.diff_po_type || '');
                const diffQty = parseFloat(String(row.diff_qty || '0')) || 0;
                const stockIdxEsc = this.escapeSqlLiteral(
                    String(row.stock_idx || ''),
                );

                if (diffPoType === '1') {
                    await this.prisma.$queryRaw(
                        Prisma.raw(`
                            delete ksv_stock_matl
                            where stock_idx = '${stockIdxEsc}'
                        `),
                    );
                }

                if (diffPoType === '5') {
                    await this.prisma.$queryRaw(
                        Prisma.raw(`
                            delete ksv_stock_use
                            where
                                stock_idx = '${stockIdxEsc}'
                                and use_po_cd = '${poCdEsc}'
                                and use_po_seq = ${poSeq}
                                and use_order_cd = '${orderCdEsc}'
                                and use_mrp_seq = ${mrpSeq}
                                and use_qty = ${diffQty}
                        `),
                    );
                }

                if (diffPoType === '2') {
                    await this.prisma.$queryRaw(
                        Prisma.raw(`
                            update ksv_stock_mem
                            set po_qty = po_qty + ${diffQty}
                            where
                                po_cd = '${poCdEsc}'
                                and po_seq = ${orgPoSeq}
                                and order_cd = '${orderCdEsc}'
                                and matl_cd = '${matlCdEsc}'
                                and mrp_seq = ${mrpSeq}
                        `),
                    );
                }
            }

            await this.prisma.$queryRaw(
                Prisma.raw(
                    `delete from ksv_po_mst where po_cd = '${poCdEsc}' and po_seq = ${poSeq}`,
                ),
            );
            await this.prisma.$queryRaw(
                Prisma.raw(
                    `delete from ksv_po_mem where po_cd = '${poCdEsc}' and po_seq = ${poSeq}`,
                ),
            );
            await this.prisma.$queryRaw(
                Prisma.raw(
                    `delete from ksv_po_mrp where po_cd = '${poCdEsc}' and po_seq = ${poSeq}`,
                ),
            );
            await this.prisma.$queryRaw(
                Prisma.raw(
                    `delete from ksv_stock_mst where po_cd = '${poCdEsc}' and po_seq = ${poSeq}`,
                ),
            );
            await this.prisma.$queryRaw(
                Prisma.raw(
                    `delete from ksv_stock_mem where po_cd = '${poCdEsc}' and po_seq = ${poSeq}`,
                ),
            );
            await this.prisma.$queryRaw(
                Prisma.raw(
                    `delete from ksv_stock_matl where po_cd = '${poCdEsc}' and po_seq = ${poSeq}`,
                ),
            );
            return { ok: true, step: 'kspPoMrpAdjCancel' };
        } catch (error: any) {
            return {
                ok: false,
                step: 'kspPoMrpAdjCancel',
                message: error?.message || 'unknown error',
            };
        }
    }

    async runPoMatlListSample(
        input: PoMatlListInput,
    ): Promise<MrpMigrationResult> {
        try {
            if (!input.poCd) throw new Error('poCd is required');
            if (!input.userId) throw new Error('userId is required');

            const poCdEsc = this.escapeSqlLiteral(input.poCd);
            const userEsc = this.escapeSqlLiteral(input.userId);
            const regDatetime = this.getRegDatetime();
            const shadowPoCdEsc = this.escapeSqlLiteral(
                `${input.poCd}${input.userId}`,
            );

            await this.prisma.$queryRaw(
                Prisma.raw(`
                    update ksv_po_matllist
                    set po_cd = '${shadowPoCdEsc}'
                    where
                        po_cd = '${poCdEsc}'
                        and pr_num not like '0%'
                `),
            );

            const orderRows = (await this.prisma.$queryRaw(
                Prisma.raw(`
                    select order_cd
                    from ksv_po_mem
                    where
                        po_cd = '${poCdEsc}'
                        and po_seq = 1
                `),
            )) as any[];
            const orderCount = orderRows.length;

            const runInsertByType = async (
                usePoType: string,
                stockPrefix: string,
                writeStockQty: boolean,
                startCnt: number,
            ): Promise<number> => {
                const rows = (await this.prisma.$queryRaw(
                    Prisma.raw(`
                        select
                            d.vendor_cd,
                            a.matl_cd,
                            c.matl_seq,
                            sum(use_qty) as use_qty,
                            d.vendor_name,
                            b.matl_name,
                            b.color,
                            b.spec
                        from
                            ksv_po_mrp a
                            inner join kcd_matl_mst b on a.matl_cd = b.matl_cd
                            inner join kcd_matl_mem c on b.matl_cd = c.matl_cd and a.matl_seq = c.matl_seq
                            inner join kcd_vendor d on b.vendor_cd = d.vendor_cd
                        where
                            a.po_cd = '${poCdEsc}'
                            and a.po_seq < 97
                            and a.use_po_type = '${usePoType}'
                        group by
                            d.vendor_cd,
                            a.matl_cd,
                            c.matl_seq,
                            d.vendor_name,
                            b.matl_name,
                            b.color,
                            b.spec
                        order by
                            d.vendor_name,
                            b.matl_name,
                            b.color,
                            b.spec
                    `),
                )) as any[];

                let cnt = startCnt;
                let cnt2 = 0;
                let oldVendorCd = '';

                for (const row of rows) {
                    const vendorCd = String(row.vendor_cd || '');
                    const matlCd = String(row.matl_cd || '');
                    const matlSeq =
                        parseInt(String(row.matl_seq || '0'), 10) || 0;
                    const useQty =
                        parseInt(String(row.use_qty || '0'), 10) || 0;

                    if (vendorCd !== oldVendorCd) {
                        oldVendorCd = vendorCd;
                        cnt += 1;
                        cnt2 = 1;
                    }

                    const prNum =
                        stockPrefix === ''
                            ? `${cnt}-${cnt2}`
                            : `${stockPrefix}${cnt}-${cnt2}`;
                    const totQty = useQty * orderCount;
                    const ordSeg = this.formatPoMatlListOrdCntSegment(useQty);
                    const ordCnt = ordSeg.repeat(orderCount);

                    await this.prisma.$queryRaw(
                        Prisma.raw(`
                            insert into ksv_po_matllist
                            (
                                po_cd,
                                vendor_cd,
                                pr_num,
                                matl_cd,
                                matl_seq,
                                tot_cnt,
                                ord_cnt,
                                stock_qty,
                                reg_user,
                                reg_datetime
                            )
                            values
                            (
                                '${poCdEsc}',
                                '${this.escapeSqlLiteral(vendorCd)}',
                                '${this.escapeSqlLiteral(prNum)}',
                                '${this.escapeSqlLiteral(matlCd)}',
                                ${matlSeq},
                                ${totQty},
                                '${this.escapeSqlLiteral(ordCnt)}',
                                ${writeStockQty ? totQty : 0},
                                '${userEsc}',
                                '${regDatetime}'
                            )
                        `),
                    );

                    cnt2 += 1;
                }

                return cnt;
            };

            let runningVendorCnt = 0;
            runningVendorCnt = await runInsertByType(
                '1',
                '',
                false,
                runningVendorCnt,
            );
            await runInsertByType('2', 'SS', true, runningVendorCnt);

            const shadowRows = (await this.prisma.$queryRaw(
                Prisma.raw(`
                    select
                        pr_num,
                        remark,
                        other_qty,
                        err_qty,
                        act_con,
                        shortage,
                        need_cnt,
                        remark_bvt,
                        stock_move
                    from
                        ksv_po_matllist
                    where
                        po_cd = '${shadowPoCdEsc}'
                `),
            )) as any[];

            const shadowUpdateSqls: string[] = [];
            for (const one of shadowRows) {
                shadowUpdateSqls.push(`
                    update ksv_po_matllist
                    set
                        remark = '${this.escapeSqlLiteral(String(one.remark || ''))}',
                        other_qty = ${parseInt(String(one.other_qty || '0'), 10) || 0},
                        err_qty = ${parseInt(String(one.err_qty || '0'), 10) || 0},
                        act_con = ${parseInt(String(one.act_con || '0'), 10) || 0},
                        shortage = ${parseInt(String(one.shortage || '0'), 10) || 0},
                        need_cnt = '${this.escapeSqlLiteral(String(one.need_cnt || ''))}',
                        stock_move = ${parseInt(String(one.stock_move || '0'), 10) || 0},
                        remark_bvt = '${this.escapeSqlLiteral(String(one.remark_bvt || ''))}'
                    where
                        po_cd = '${poCdEsc}'
                        and pr_num = '${this.escapeSqlLiteral(String(one.pr_num || ''))}'
                `);
            }
            await this.executeSqlsWithConcurrency(shadowUpdateSqls, 10);

            await this.prisma.$queryRaw(
                Prisma.raw(`
                    delete from ksv_po_matllist
                    where po_cd = '${shadowPoCdEsc}'
                `),
            );
            return { ok: true, step: 'kspPoMatlListSample' };
        } catch (error: any) {
            return {
                ok: false,
                step: 'kspPoMatlListSample',
                message: error?.message || 'unknown error',
            };
        }
    }

    async runPoMatlListAdjustNoSeq(
        input: PoMatlListInput,
    ): Promise<MrpMigrationResult> {
        try {
            return this.runPoMatlListAdjustSeparated(
                input,
                false,
                'kspPoMatlListAdjustNoSeq',
            );
        } catch (error: any) {
            return {
                ok: false,
                step: 'kspPoMatlListAdjustNoSeq',
                message: error?.message || 'unknown error',
            };
        }
    }

    async runPoMatlListAdjust(
        input: PoMatlListInput,
    ): Promise<MrpMigrationResult> {
        try {
            return this.runPoMatlListAdjustSeparated(
                input,
                true,
                'kspPoMatlListAdjust',
            );
        } catch (error: any) {
            return {
                ok: false,
                step: 'kspPoMatlListAdjust',
                message: error?.message || 'unknown error',
            };
        }
    }

    async runPoMatlListStock(
        input: PoMatlListInput,
    ): Promise<MrpMigrationResult> {
        try {
            if (!input.poCd) throw new Error('poCd is required');
            if (!input.userId) throw new Error('userId is required');

            const poCdEsc = this.escapeSqlLiteral(input.poCd);

            const sql = `
                update a
                set
                    a.stock_qty = b.potoqty
                from
                    ksv_po_matllist a
                    inner join (
                        select
                            po_matl_cd,
                            sum(po_qty) as potoqty
                        from
                            ksv_po_mrp
                        where
                            po_cd = '${poCdEsc}'
                            and use_po_type = '2'
                            and diff_po_type <> '2'
                        group by
                            po_matl_cd
                    ) b on b.po_matl_cd = a.matl_cd
                where
                    a.po_cd = '${poCdEsc}'
                    and left(a.pr_num, 1) between '1' and '9'
            `;
            await this.prisma.$queryRaw(Prisma.raw(sql));
            return { ok: true, step: 'kspPoMatlListStock' };
        } catch (error: any) {
            return {
                ok: false,
                step: 'kspPoMatlListStock',
                message: error?.message || 'unknown error',
            };
        }
    }

    async runPoMrpReCalc(
        input: MrpMigrationInput,
    ): Promise<MrpMigrationResult> {
        try {
            const { poCdEsc, userEsc } = await this.prepareMrpExecInput(input);
            await this.runPoMrpReCalcLogic(poCdEsc, userEsc);
            return { ok: true, step: 'kspPoMrpReCalc' };
        } catch (error: any) {
            return {
                ok: false,
                step: 'kspPoMrpReCalc',
                message: error?.message || 'unknown error',
            };
        }
    }

    private async runPoMrpReCalcLogic(
        poCdEsc: string,
        userEsc: string,
    ): Promise<void> {
        const q = async (sql: string) =>
            ((await this.prisma.$queryRaw(Prisma.raw(sql))) as any[]) || [];
        const esc = (v: any) => this.escapeSqlLiteral(String(v ?? ''));
        const toNum = (v: any, def = 0) => {
            const n = parseFloat(String(v ?? ''));
            return Number.isFinite(n) ? n : def;
        };
        const toInt = (v: any, def = 0) => {
            const n = parseInt(String(v ?? ''), 10);
            return Number.isFinite(n) ? n : def;
        };
        const sqlVal = (v: any): string => {
            if (v === null || v === undefined) return 'null';
            if (typeof v === 'number') return Number.isFinite(v) ? `${v}` : 'null';
            return `'${esc(v)}'`;
        };

        const insertMrpTemp = async (row: {
            seq: number;
            poSeq: number | null;
            orderCd: string;
            matlCd: string;
            mrpSeq: number | null;
            newQty: number;
            befQty: number;
            diffQty: number;
            stockQty: number;
            diffPoType: string;
            matlSeq: number | null;
            matlPrice: number | null;
            currCd: string | null;
            totAmt: number | null;
            useSize: string | null;
        }) => {
            await q(`
                insert into ksv_po_mrptempre
                (
                    user_id, seq, po_cd, po_seq, order_cd, matl_cd, mrp_seq,
                    new_qty, bef_qty, diff_qty, stock_qty, diff_po_type,
                    matl_seq, matl_price, curr_cd, tot_amt, use_size
                )
                values
                (
                    '${userEsc}',
                    ${row.seq},
                    '${poCdEsc}',
                    ${sqlVal(row.poSeq)},
                    '${esc(row.orderCd)}',
                    '${esc(row.matlCd)}',
                    ${sqlVal(row.mrpSeq)},
                    ${sqlVal(row.newQty)},
                    ${sqlVal(row.befQty)},
                    ${sqlVal(row.diffQty)},
                    ${sqlVal(row.stockQty)},
                    '${esc(row.diffPoType)}',
                    ${sqlVal(row.matlSeq)},
                    ${sqlVal(row.matlPrice)},
                    ${sqlVal(row.currCd)},
                    ${sqlVal(row.totAmt)},
                    ${sqlVal(row.useSize)}
                )
            `);
        };

        await q(`
            delete ksv_po_mrptempre
            where user_id = '${userEsc}'
        `);

        let seq = 0;
        const newPoSeqRow = await q(`
            select max(po_seq) + 1 as new_po_seq
            from ksv_po_mst
            where po_cd = '${poCdEsc}'
            and po_seq < 97
        `);
        const nNewPoSeq =
            newPoSeqRow[0]?.new_po_seq === null ||
            newPoSeqRow[0]?.new_po_seq === undefined
                ? null
                : toInt(newPoSeqRow[0].new_po_seq, 0);

        const newMrpSeqRow = await q(`
            select isnull(max(mrp_seq), 0) as new_mrp_seq
            from ksv_po_mrp
            where po_cd = '${poCdEsc}'
            and po_seq < 97
            and mrp_seq < 9998
        `);
        let nNewMrpSeq = toInt(newMrpSeqRow[0]?.new_mrp_seq, 0);
        let lastMrpSeq = nNewMrpSeq;

        const c1Rows = await q(`
            select
                a.order_cd as order_cd,
                a.matl_cd as matl_cd,
                a.po_qty as new_po_qty,
                sum(b.po_qty) as bef_po_qty,
                a.mrp_seq as mrp_seq
            from ksv_po_mrptemp a, ksv_po_mrptempbef b
            where a.user_id = '${userEsc}'
            and a.po_cd = '${poCdEsc}'
            and b.user_id = '${userEsc}'
            and b.po_cd = a.po_cd
            and b.order_cd = a.order_cd
            and b.matl_cd = a.matl_cd
            group by a.order_cd, a.matl_cd, a.mrp_seq, a.po_qty
            having sum(a.po_qty) <> sum(b.po_qty)
            order by a.order_cd, a.matl_cd
        `);

        for (const r of c1Rows) {
            const orderCd = String(r.order_cd || '');
            const matlCd = String(r.matl_cd || '');
            const newQty = toNum(r.new_po_qty, 0);
            const befQty = toNum(r.bef_po_qty, 0);
            const mrpSeq = toInt(r.mrp_seq, 0);
            lastMrpSeq = mrpSeq;
            const diffQty = newQty - befQty;

            if (diffQty > 0) {
                nNewMrpSeq += 1;
                seq += 1;
                await insertMrpTemp({
                    seq,
                    poSeq: nNewPoSeq,
                    orderCd,
                    matlCd,
                    mrpSeq: nNewMrpSeq,
                    newQty,
                    befQty,
                    diffQty,
                    stockQty: 0,
                    diffPoType: '3',
                    matlSeq: null,
                    matlPrice: null,
                    currCd: null,
                    totAmt: null,
                    useSize: null,
                });
            } else if (diffQty < 0) {
                seq += 1;
                await insertMrpTemp({
                    seq,
                    poSeq: nNewPoSeq,
                    orderCd,
                    matlCd,
                    mrpSeq,
                    newQty,
                    befQty,
                    diffQty,
                    stockQty: 0,
                    diffPoType: '2',
                    matlSeq: 0,
                    matlPrice: 0,
                    currCd: '',
                    totAmt: 0,
                    useSize: '',
                });
            }
        }

        const c2Rows = await q(`
            select a.order_cd as order_cd, a.matl_cd as matl_cd, a.po_qty as new_po_qty
            from ksv_po_mrptemp a, kcd_matl_mem b
            where a.user_id = '${userEsc}'
            and a.po_cd = '${poCdEsc}'
            and a.matl_cd not in (
                select matl_cd
                from ksv_po_mrptempbef
                where user_id = '${userEsc}'
                and po_cd = '${poCdEsc}'
                and order_cd = a.order_cd
            )
            and b.matl_cd = a.matl_cd
            and b.matl_seq = (
                select max(matl_seq)
                from kcd_matl_mem
                where matl_cd = a.matl_cd
            )
        `);

        for (const r of c2Rows) {
            const orderCd = String(r.order_cd || '');
            const matlCd = String(r.matl_cd || '');
            const newQty = toNum(r.new_po_qty, 0);
            const befQty = 0;
            const diffQty = newQty - befQty;
            nNewMrpSeq += 1;
            seq += 1;

            await insertMrpTemp({
                seq,
                poSeq: nNewPoSeq,
                orderCd,
                matlCd,
                mrpSeq: nNewMrpSeq,
                newQty,
                befQty,
                diffQty,
                stockQty: 0,
                diffPoType: '3',
                matlSeq: null,
                matlPrice: null,
                currCd: null,
                totAmt: null,
                useSize: null,
            });
        }

        const c3Rows = await q(`
            select a.order_cd as order_cd, a.matl_cd as matl_cd, sum(a.po_qty) as bef_po_qty, a.mrp_seq as mrp_seq
            from ksv_po_mrptempbef a
            where a.user_id = '${userEsc}'
            and a.po_cd = '${poCdEsc}'
            and right(a.order_cd, 2) not in ('um', 'in')
            and a.matl_cd not in (
                select matl_cd
                from ksv_po_mrptemp
                where user_id = '${userEsc}'
                and po_cd = a.po_cd
                and order_cd = a.order_cd
            )
            group by a.order_cd, a.matl_cd, a.mrp_seq
            having sum(a.po_qty) > 0
        `);

        for (const r of c3Rows) {
            const orderCd = String(r.order_cd || '');
            const matlCd = String(r.matl_cd || '');
            const befQty = toNum(r.bef_po_qty, 0);
            const mrpSeq = toInt(r.mrp_seq, 0);
            lastMrpSeq = mrpSeq;
            const newQty = 0;
            const diffQty = newQty - befQty;
            seq += 1;

            await insertMrpTemp({
                seq,
                poSeq: nNewPoSeq,
                orderCd,
                matlCd,
                mrpSeq,
                newQty,
                befQty,
                diffQty,
                stockQty: 0,
                diffPoType: '2',
                matlSeq: 0,
                matlPrice: 0,
                currCd: '',
                totAmt: 0,
                useSize: '',
            });
        }

        const c31Rows = await q(`
            select a.order_cd as order_cd, a.matl_cd as matl_cd, sum(a.po_qty) as bef_po_qty, b.po_mrp_seq as mrp_seq
            from ksv_po_mrptempbef a, ksv_po_mrp b
            where a.user_id = '${userEsc}'
            and a.po_cd = '${poCdEsc}'
            and right(a.order_cd, 2) not in ('um', 'in')
            and a.matl_cd not in (
                select matl_cd
                from ksv_po_mrptemp
                where user_id = '${userEsc}'
                and po_cd = a.po_cd
                and order_cd = a.order_cd
            )
            and a.po_matl_cd = '재고발주'
            and b.po_matl_cd = a.matl_cd
            and a.po_cd = b.po_cd
            and a.order_cd = b.order_cd
            and a.po_qty = 0
            group by a.order_cd, a.matl_cd, b.po_mrp_seq
        `);

        for (const r of c31Rows) {
            const orderCd = String(r.order_cd || '');
            const matlCd = String(r.matl_cd || '');
            const befQty = toNum(r.bef_po_qty, 0);
            const mrpSeq = toInt(r.mrp_seq, 0);
            lastMrpSeq = mrpSeq;

            const chk = await q(`
                select count(*) as cnt
                from ksv_po_mrptempre
                where user_id = '${userEsc}'
                and po_cd = '${poCdEsc}'
                and order_cd = '${esc(orderCd)}'
                and matl_cd = '${esc(matlCd)}'
            `);
            const chkCount = toInt(chk[0]?.cnt, 0);
            if (chkCount === 0) {
                const newQty = 0;
                const diffQty = newQty - befQty;
                seq += 1;
                await insertMrpTemp({
                    seq,
                    poSeq: nNewPoSeq,
                    orderCd,
                    matlCd,
                    mrpSeq,
                    newQty,
                    befQty,
                    diffQty,
                    stockQty: 0,
                    diffPoType: '2',
                    matlSeq: 0,
                    matlPrice: 0,
                    currCd: '',
                    totAmt: 0,
                    useSize: '',
                });
            }
        }

        const c4Rows = await q(`
            select order_cd as order_cd, po_matl_cd as matl_cd, sum(po_qty) as stock_qty
            from ksv_po_mrp
            where po_cd = '${poCdEsc}'
            and po_matl_cd in (
                select matl_cd
                from ksv_po_mrptempre
                where user_id = '${userEsc}'
                and po_cd = '${poCdEsc}'
            )
            group by order_cd, po_matl_cd
        `);

        for (const r of c4Rows) {
            const orderCd = String(r.order_cd || '');
            const matlCd = String(r.matl_cd || '');
            const stockQty = toNum(r.stock_qty, 0);

            const chk = await q(`
                select count(*) as cnt
                from ksv_po_mrptempre
                where user_id = '${userEsc}'
                and po_cd = '${poCdEsc}'
                and order_cd = '${esc(orderCd)}'
                and matl_cd = '${esc(matlCd)}'
            `);
            const chkCount = toInt(chk[0]?.cnt, 0);

            if (chkCount === 0) {
                seq += 1;
                await insertMrpTemp({
                    seq,
                    poSeq: nNewPoSeq,
                    orderCd,
                    matlCd,
                    mrpSeq: lastMrpSeq,
                    newQty: stockQty,
                    befQty: stockQty,
                    diffQty: 0,
                    stockQty: 0,
                    diffPoType: '2',
                    matlSeq: 0,
                    matlPrice: 0,
                    currCd: '',
                    totAmt: 0,
                    useSize: '',
                });
            }

            await q(`
                update ksv_po_mrptempre
                set stock_qty = ${stockQty}
                where user_id = '${userEsc}'
                and po_cd = '${poCdEsc}'
                and order_cd = '${esc(orderCd)}'
                and matl_cd = '${esc(matlCd)}'
            `);

            await q(`
                update ksv_po_mrptempre
                set diff_po_type = '2',
                    diff_qty = new_qty - bef_qty - stock_qty
                where user_id = '${userEsc}'
                and po_cd = '${poCdEsc}'
                and order_cd = '${esc(orderCd)}'
                and matl_cd = '${esc(matlCd)}'
                and new_qty < bef_qty + stock_qty
            `);
        }

        const c5Rows = await q(`
            select matl_cd as matl_cd, diff_qty as diff_qty
            from ksv_po_mrptempre
            where user_id = '${userEsc}'
            and po_cd = '${poCdEsc}'
        `);

        for (const r of c5Rows) {
            const matlCd = String(r.matl_cd || '');
            const diffQty = toNum(r.diff_qty, 0);
            const mRow = await q(`
                select top 1
                    matl_seq,
                    matl_price,
                    curr_cd
                from kcd_matl_mem
                where matl_cd = '${esc(matlCd)}'
                order by matl_seq desc
            `);

            const matlSeq =
                mRow.length > 0 && mRow[0].matl_seq !== null
                    ? toInt(mRow[0].matl_seq, 0)
                    : null;
            const matlPrice =
                mRow.length > 0 && mRow[0].matl_price !== null
                    ? toNum(mRow[0].matl_price, 0)
                    : null;
            const currCd =
                mRow.length > 0 && mRow[0].curr_cd !== null
                    ? String(mRow[0].curr_cd)
                    : null;
            const totAmt =
                matlPrice === null ? null : matlPrice * (Number(diffQty) || 0);

            await q(`
                update ksv_po_mrptempre
                set matl_seq = ${sqlVal(matlSeq)},
                    matl_price = ${sqlVal(matlPrice)},
                    curr_cd = ${sqlVal(currCd)},
                    tot_amt = ${sqlVal(totAmt)}
                where user_id = '${userEsc}'
                and po_cd = '${poCdEsc}'
                and matl_cd = '${esc(matlCd)}'
            `);
        }

        const c3MrpSeqRows = await q(`
            select a.mrp_seq as mrp_seq, b.seq as seq, b.order_cd as order_cd, b.matl_cd as matl_cd
            from ksv_po_mrp a, ksv_po_mrptempre b
            where a.po_cd = b.po_cd
            and a.po_cd = '${poCdEsc}'
            and b.user_id = '${userEsc}'
            and a.order_cd = b.order_cd
            and a.matl_cd = b.matl_cd
            and a.diff_po_type in ('0', '3')
            and a.use_po_type = '1'
            and a.po_qty > 0
            and b.mrp_seq is null
        `);

        for (const r of c3MrpSeqRows) {
            const mrpSeq = toInt(r.mrp_seq, 0);
            const seq2 = toInt(r.seq, 0);
            const orderCd = String(r.order_cd || '');
            const matlCd = String(r.matl_cd || '');

            await q(`
                update ksv_po_mrptempre
                set mrp_seq = ${mrpSeq}
                where user_id = '${userEsc}'
                and po_cd = '${poCdEsc}'
                and seq = ${seq2}
                and order_cd = '${esc(orderCd)}'
                and matl_cd = '${esc(matlCd)}'
                and mrp_seq is null
            `);
        }
    }


    async runPoMrpReDetail(
        input: MrpMigrationInput,
    ): Promise<MrpMigrationResult> {
        try {
            const { poCdEsc, userEsc } = await this.prepareMrpExecInput(input);
            await this.runPoMrpReDetailLogic(poCdEsc, userEsc);
            return { ok: true, step: 'kspPoMrpReDetail' };
        } catch (error: any) {
            return {
                ok: false,
                step: 'kspPoMrpReDetail',
                message: error?.message || 'unknown error',
            };
        }
    }

    private async runPoMrpReDetailLogic(
        poCdEsc: string,
        userEsc: string,
    ): Promise<void> {
        const q = async (sql: string) =>
            ((await this.prisma.$queryRaw(Prisma.raw(sql))) as any[]) || [];
        const esc = (v: any) => this.escapeSqlLiteral(String(v ?? ''));
        const toNum = (v: any, def = 0) => {
            const n = parseFloat(String(v ?? ''));
            return Number.isFinite(n) ? n : def;
        };
        const toInt = (v: any, def = 0) => {
            const n = parseInt(String(v ?? ''), 10);
            return Number.isFinite(n) ? n : def;
        };
        const sqlVal = (v: any): string => {
            if (v === null || v === undefined) return 'null';
            if (typeof v === 'number') return Number.isFinite(v) ? `${v}` : 'null';
            return `'${esc(v)}'`;
        };

        const insertDetail = async (row: {
            seq: number;
            poSeq: number | null;
            orderCd: string;
            matlCd: string;
            mrpSeq: number | null;
            diffReType: string;
            diffReQty: number;
            matlSeq: number | null;
            matlPrice: number | null;
            currCd: string | null;
            totAmt: number | null;
            useSize: string | null;
            stockIdx?: string | null;
            rootIdx?: string | null;
            factoryCd?: string | null;
            befPoQty?: number | null;
            useStockQty?: number | null;
            orgPoSeq?: number | null;
            poMatlCd?: string | null;
        }) => {
            await q(`
                insert into ksv_po_mrptempre_detail
                (
                    user_id, seq, po_cd, po_seq, order_cd, matl_cd, mrp_seq,
                    diff_re_type, diff_re_qty, matl_seq, matl_price, curr_cd,
                    tot_amt, use_size, stock_idx, root_idx, factory_cd,
                    bef_po_qty, use_stock_qty, org_po_seq, po_matl_cd
                )
                values
                (
                    '${userEsc}',
                    ${row.seq},
                    '${poCdEsc}',
                    ${sqlVal(row.poSeq)},
                    '${esc(row.orderCd)}',
                    '${esc(row.matlCd)}',
                    ${sqlVal(row.mrpSeq)},
                    '${esc(row.diffReType)}',
                    ${sqlVal(row.diffReQty)},
                    ${sqlVal(row.matlSeq)},
                    ${sqlVal(row.matlPrice)},
                    ${sqlVal(row.currCd)},
                    ${sqlVal(row.totAmt)},
                    ${sqlVal(row.useSize)},
                    ${sqlVal(row.stockIdx ?? null)},
                    ${sqlVal(row.rootIdx ?? null)},
                    ${sqlVal(row.factoryCd ?? null)},
                    ${sqlVal(row.befPoQty ?? 0)},
                    ${sqlVal(row.useStockQty ?? 0)},
                    ${sqlVal(row.orgPoSeq ?? null)},
                    ${sqlVal(row.poMatlCd ?? null)}
                )
            `);
        };

        await q(`
            delete ksv_po_mrptempre_detail
            where user_id = '${userEsc}'
        `);

        const c3Cache = new Map<string, any[]>();
        const getC3Rows = async (orderCd: string, matlCd: string) => {
            const key = `${orderCd}::${matlCd}`;
            if (!c3Cache.has(key)) {
                const rows = await q(`
                    select a.po_seq, a.po_qty, a.mrp_seq
                    from ksv_po_mrp a
                    where a.po_cd = '${poCdEsc}'
                    and a.po_seq < 97
                    and a.order_cd = '${esc(orderCd)}'
                    and a.matl_cd = '${esc(matlCd)}'
                    and a.use_po_type = '1'
                    and a.po_qty > 0
                    order by a.po_seq desc
                `);
                c3Cache.set(key, rows);
            }
            return c3Cache.get(key) || [];
        };

        const c21Cache = new Map<string, any[]>();
        const getC21Rows = async (orderCd: string, matlCd: string) => {
            const key = `${orderCd}::${matlCd}`;
            if (!c21Cache.has(key)) {
                const rows = await q(`
                    select a.matl_cd, a.mrp_seq, sum(a.po_qty) as po_qty, a.stock_idx, b.root_idx, b.factory_cd, a.po_matl_cd
                    from ksv_po_mrp a, ksv_stock_matl b
                    where a.po_cd = '${poCdEsc}'
                    and a.po_seq < 97
                    and a.order_cd = '${esc(orderCd)}'
                    and a.po_matl_cd = '${esc(matlCd)}'
                    and a.use_po_type = '2'
                    and b.stock_idx = a.stock_idx
                    group by a.matl_cd, a.mrp_seq, a.stock_idx, b.root_idx, b.factory_cd, a.po_matl_cd
                    having sum(a.po_qty) > 0
                    order by 3
                `);
                c21Cache.set(key, rows);
            }
            return c21Cache.get(key) || [];
        };

        const c1Rows = await q(`
            select
                seq, po_cd, po_seq, order_cd, matl_cd, mrp_seq,
                new_qty, bef_qty, diff_qty, stock_qty, diff_po_type,
                matl_seq, matl_price, curr_cd, tot_amt, use_size
            from ksv_po_mrptempre
            where user_id = '${userEsc}'
            and po_cd = '${poCdEsc}'
            and new_qty <> bef_qty + stock_qty
            order by seq
        `);

        let lastPoSeq: number | null = null;

        for (const r of c1Rows) {
            const seq = toInt(r.seq, 0);
            const poSeq = r.po_seq === null || r.po_seq === undefined ? null : toInt(r.po_seq, 0);
            const orderCd = String(r.order_cd || '');
            const matlCd = String(r.matl_cd || '');
            const mrpSeq = r.mrp_seq === null || r.mrp_seq === undefined ? null : toInt(r.mrp_seq, 0);
            const newQty = toNum(r.new_qty, 0);
            const befQty = toNum(r.bef_qty, 0);
            const diffQty = toNum(r.diff_qty, 0);
            const stockQty = toNum(r.stock_qty, 0);
            const diffPoType = String(r.diff_po_type || '');
            const matlSeq = r.matl_seq === null || r.matl_seq === undefined ? null : toInt(r.matl_seq, 0);
            const matlPrice = r.matl_price === null || r.matl_price === undefined ? null : toNum(r.matl_price, 0);
            const currCd = r.curr_cd === null || r.curr_cd === undefined ? null : String(r.curr_cd);
            const totAmt = r.tot_amt === null || r.tot_amt === undefined ? null : toNum(r.tot_amt, 0);
            const useSize = r.use_size === null || r.use_size === undefined ? null : String(r.use_size);
            lastPoSeq = poSeq;

            if (diffPoType === '3') {
                await insertDetail({
                    seq,
                    poSeq,
                    orderCd,
                    matlCd,
                    mrpSeq,
                    diffReType: '3',
                    diffReQty: diffQty,
                    matlSeq,
                    matlPrice,
                    currCd,
                    totAmt,
                    useSize,
                    befPoQty: 0,
                    useStockQty: 0,
                });
                continue;
            }

            const inputQtyRows = await q(`
                select isnull(sum(in_qty), 0) as input_qty
                from ksv_stock_in
                where po_cd = '${poCdEsc}'
                and matl_cd = '${esc(matlCd)}'
                and order_cd = '${esc(orderCd)}'
            `);
            const inputQty = toNum(inputQtyRows[0]?.input_qty, 0);

            let cancelQty = diffQty * -1;
            const poRemain = befQty - inputQty;

            if (poRemain > 0) {
                let tempQty = cancelQty >= poRemain ? poRemain : cancelQty;
                const c3Rows = await getC3Rows(orderCd, matlCd);

                for (const c3 of c3Rows) {
                    const poSeq2 = toInt(c3.po_seq, 0);
                    const poQty2 = toNum(c3.po_qty, 0);
                    const mrpSeq2 = toInt(c3.mrp_seq, 0);

                    const diffReQty = (tempQty > poQty2 ? poQty2 : tempQty) * -1;
                    await insertDetail({
                        seq,
                        poSeq,
                        orderCd,
                        matlCd,
                        mrpSeq: mrpSeq2,
                        diffReType: '2',
                        diffReQty,
                        matlSeq,
                        matlPrice,
                        currCd,
                        totAmt,
                        useSize,
                        befPoQty: poQty2,
                        useStockQty: 0,
                        orgPoSeq: poSeq2,
                    });

                    cancelQty -= poQty2;
                    tempQty -= poQty2;
                    if (tempQty <= 0) {
                        cancelQty = (diffQty * -1) - (befQty - inputQty);
                        break;
                    }
                }
            }

            if (inputQty > 0 && cancelQty > 0) {
                let remainQty = befQty > cancelQty ? cancelQty : befQty;
                const c3Rows = await getC3Rows(orderCd, matlCd);

                for (const c3 of c3Rows) {
                    if (remainQty <= 0) break;

                    const poSeq2 = toInt(c3.po_seq, 0);
                    const poQty2 = toNum(c3.po_qty, 0);
                    const mrpSeq2 = toInt(c3.mrp_seq, 0);

                    let diffReQty = (remainQty > poQty2 ? poQty2 : remainQty) * -1;
                    await insertDetail({
                        seq,
                        poSeq,
                        orderCd,
                        matlCd,
                        mrpSeq: mrpSeq2,
                        diffReType: '9',
                        diffReQty,
                        matlSeq,
                        matlPrice,
                        currCd,
                        totAmt,
                        useSize,
                        befPoQty: poQty2,
                        useStockQty: 0,
                        orgPoSeq: poSeq2,
                    });

                    remainQty -= poQty2;
                    cancelQty -= poQty2;
                    const cancelQty2 = diffQty * -1;
                    const leftoverQty = befQty >= cancelQty2 ? cancelQty2 : inputQty;

                    if (leftoverQty > 0) {
                        diffReQty *= -1;
                        await insertDetail({
                            seq,
                            poSeq,
                            orderCd,
                            matlCd,
                            mrpSeq: mrpSeq2,
                            diffReType: '4',
                            diffReQty,
                            matlSeq,
                            matlPrice,
                            currCd,
                            totAmt,
                            useSize,
                            befPoQty: 0,
                            useStockQty: 0,
                        });

                        await q(`
                            update ksv_po_mrptempre_detail
                            set diff_re_type = '1'
                            where user_id = '${userEsc}'
                            and po_cd = '${poCdEsc}'
                            and po_seq = ${sqlVal(poSeq)}
                            and order_cd = '${esc(orderCd)}'
                            and matl_cd = '${esc(matlCd)}'
                            and mrp_seq = ${mrpSeq2}
                            and diff_re_type = '9'
                        `);
                    }
                }
            }

            if (stockQty > 0 && cancelQty > 0) {
                let remainQty = cancelQty;
                const c21Rows = await getC21Rows(orderCd, matlCd);

                for (const c21 of c21Rows) {
                    const matlCd2 = String(c21.matl_cd || '');
                    const mrpSeq2 = toInt(c21.mrp_seq, 0);
                    const poQty2 = toNum(c21.po_qty, 0);
                    const stockIdx = String(c21.stock_idx || '');
                    const rootIdx = String(c21.root_idx || '');
                    const factoryCd = String(c21.factory_cd || '');
                    const poMatlCd = String(c21.po_matl_cd || '');

                    const stockCancelQty = remainQty > poQty2 ? poQty2 : remainQty;
                    const diffReQty = stockCancelQty * -1;

                    const c2Rows = await q(`
                        select a.po_seq
                        from ksv_po_mrp a, ksv_stock_matl b
                        where a.po_cd = '${poCdEsc}'
                        and a.po_seq < 97
                        and a.order_cd = '${esc(orderCd)}'
                        and a.po_matl_cd = '${esc(matlCd)}'
                        and a.use_po_type = '2'
                        and a.mrp_seq = ${mrpSeq2}
                        and a.po_qty > 0
                        and b.stock_idx = a.stock_idx
                    `);
                    const poSeq2 =
                        c2Rows.length > 0
                            ? toInt(c2Rows[c2Rows.length - 1]?.po_seq, 0)
                            : null;

                    await insertDetail({
                        seq,
                        poSeq,
                        orderCd,
                        matlCd: matlCd2,
                        mrpSeq: mrpSeq2,
                        diffReType: '5',
                        diffReQty,
                        matlSeq,
                        matlPrice,
                        currCd,
                        totAmt,
                        useSize,
                        stockIdx,
                        rootIdx,
                        factoryCd,
                        befPoQty: 0,
                        useStockQty: poQty2,
                        orgPoSeq: poSeq2,
                        poMatlCd,
                    });

                    remainQty -= poQty2;
                    cancelQty = remainQty;
                    if (remainQty <= 0) {
                        cancelQty = (diffQty * -1) - (befQty - inputQty) - stockQty;
                        break;
                    }
                }
            }
        }

        if (lastPoSeq !== null) {
            await q(`
                update ksv_po_mrptempre_detail
                set diff_re_type = '2'
                where user_id = '${userEsc}'
                and po_cd = '${poCdEsc}'
                and po_seq = ${lastPoSeq}
                and diff_re_type = '9'
            `);
        }
    }

    async runPoMrpListAdjust(
        input: MrpMigrationInput,
    ): Promise<MrpMigrationResult> {
        try {
            if (!input.poCd) throw new Error('poCd is required');
            if (!input.userId) throw new Error('userId is required');

            const poCdEsc = this.escapeSqlLiteral(input.poCd);
            const userEsc = this.escapeSqlLiteral(input.userId);
            const regDatetime = this.getRegDatetime();

            await this.prisma.$queryRaw(
                Prisma.raw(`
                    delete ksv_po_mrplist
                    where po_cd = '${poCdEsc}'
                `),
            );

            await this.prisma.$queryRaw(
                Prisma.raw(`
                    insert into ksv_po_mrplist
                    (
                        po_cd,
                        order_cd,
                        prod_cd,
                        add_flag,
                        matl_cd,
                        matl_seq,
                        prod_seq,
                        use_size,
                        remark,
                        net,
                        loss,
                        gross,
                        vendor_cd,
                        ord_cnt,
                        net_qty,
                        use_qty,
                        status_cd,
                        reg_user,
                        reg_datetime
                    )
                    select
                        po_cd,
                        order_cd,
                        prod_cd,
                        add_flag,
                        matl_cd,
                        matl_seq,
                        prod_seq,
                        use_size,
                        remark,
                        net,
                        loss,
                        gross,
                        vendor_cd,
                        ord_cnt,
                        net_qty,
                        use_qty,
                        status_cd,
                        reg_user,
                        reg_datetime
                    from
                        ksv_po_mrpnettemp
                    where
                        user_id = '${userEsc}'
                        and po_cd = '${poCdEsc}'
                `),
            );

            const sumRows = (await this.prisma.$queryRaw(
                Prisma.raw(`
                    select
                        a.po_cd,
                        a.order_cd,
                        a.matl_cd,
                        sum(a.net_qty) as net_qty
                    from
                        ksv_po_mrplist a
                    where
                        a.po_cd = '${poCdEsc}'
                    group by
                        a.po_cd,
                        a.order_cd,
                        a.matl_cd
                `),
            )) as any[];

            for (const row of sumRows) {
                const orderCdEsc = this.escapeSqlLiteral(
                    String(row.order_cd || ''),
                );
                const matlCdEsc = this.escapeSqlLiteral(
                    String(row.matl_cd || ''),
                );
                const netQty = parseFloat(String(row.net_qty || '0')) || 0;

                const poQtyRows = (await this.prisma.$queryRaw(
                    Prisma.raw(`
                        select
                            sum(po_qty) as po_qty
                        from
                            ksv_po_mrp
                        where
                            po_cd = '${poCdEsc}'
                            and order_cd = '${orderCdEsc}'
                            and matl_cd = '${matlCdEsc}'
                            and po_seq < 100
                            and diff_po_type in ('0', '1', '3', '4')
                    `),
                )) as any[];

                const poQtyRaw = poQtyRows?.[0]?.po_qty;
                if (poQtyRaw === null || typeof poQtyRaw === 'undefined') {
                    // SQL 프로시저 동작과 맞추기 위해 NULL 연산 결과는 nDiff를 NULL로 두고 insert를 건너뜁니다.
                    continue;
                }
                const poQty = parseFloat(String(poQtyRaw || '0')) || 0;
                const nDiff = this.roundProc(poQty) - this.roundProc(netQty);
                if (nDiff === 0) continue;

                const prodRows = (await this.prisma.$queryRaw(
                    Prisma.raw(`
                        select top 1
                            prod_cd
                        from
                            ksv_po_mrplist
                        where
                            po_cd = '${poCdEsc}'
                            and order_cd = '${orderCdEsc}'
                            and add_flag = '0'
                            and matl_cd = '${matlCdEsc}'
                    `),
                )) as any[];
                const prodCdEsc = this.escapeSqlLiteral(
                    String(prodRows?.[0]?.prod_cd || ''),
                );

                await this.prisma.$queryRaw(
                    Prisma.raw(`
                        insert into ksv_po_mrplist
                        (
                            po_cd,
                            order_cd,
                            prod_cd,
                            add_flag,
                            matl_cd,
                            matl_seq,
                            prod_seq,
                            use_size,
                            remark,
                            net,
                            loss,
                            gross,
                            vendor_cd,
                            ord_cnt,
                            net_qty,
                            use_qty,
                            status_cd,
                            reg_user,
                            reg_datetime
                        )
                        select top 1
                            po_cd,
                            order_cd,
                            prod_cd,
                            add_flag,
                            matl_cd,
                            matl_seq,
                            prod_seq,
                            '',
                            remark,
                            net,
                            loss,
                            gross,
                            vendor_cd,
                            0,
                            ${nDiff},
                            round(${nDiff} + 0.4999, 0, 0),
                            status_cd,
                            reg_user,
                            reg_datetime
                        from
                            ksv_po_mrplist
                        where
                            po_cd = '${poCdEsc}'
                            and order_cd = '${orderCdEsc}'
                            and prod_cd = '${prodCdEsc}'
                            and add_flag = '0'
                            and matl_cd = '${matlCdEsc}'
                    `),
                );
            }

            const missRows = (await this.prisma.$queryRaw(
                Prisma.raw(`
                    select
                        a.po_cd,
                        a.order_cd,
                        a.matl_cd,
                        a.po_qty
                    from
                        ksv_po_mrp a
                    where
                        a.po_cd = '${poCdEsc}'
                        and a.diff_po_type = '1'
                        and a.matl_cd not in (
                            select matl_cd
                            from ksv_po_mrplist
                            where
                                po_cd = a.po_cd
                                and order_cd = a.order_cd
                        )
                `),
            )) as any[];

            for (const row of missRows) {
                const orderCdEsc = this.escapeSqlLiteral(
                    String(row.order_cd || ''),
                );
                const matlCdEsc = this.escapeSqlLiteral(
                    String(row.matl_cd || ''),
                );

                const prodRows = (await this.prisma.$queryRaw(
                    Prisma.raw(`
                        select top 1
                            prod_cd
                        from
                            ksv_po_mrplist
                        where
                            po_cd = '${poCdEsc}'
                            and order_cd = '${orderCdEsc}'
                            and add_flag = '0'
                            and matl_cd = '${matlCdEsc}'
                    `),
                )) as any[];
                const prodCdEsc = this.escapeSqlLiteral(
                    String(prodRows?.[0]?.prod_cd || ''),
                );

                await this.prisma.$queryRaw(
                    Prisma.raw(`
                        insert into ksv_po_mrplist
                        (
                            po_cd,
                            order_cd,
                            prod_cd,
                            add_flag,
                            matl_cd,
                            matl_seq,
                            prod_seq,
                            use_size,
                            remark,
                            net,
                            loss,
                            gross,
                            vendor_cd,
                            ord_cnt,
                            net_qty,
                            use_qty,
                            status_cd,
                            reg_user,
                            reg_datetime
                        )
                        select
                            a.po_cd,
                            a.order_cd,
                            '${prodCdEsc}',
                            '0',
                            a.matl_cd,
                            a.matl_seq,
                            0,
                            '',
                            '',
                            0,
                            0,
                            0,
                            b.vendor_cd,
                            0,
                            a.po_qty,
                            a.use_qty,
                            '0',
                            '${userEsc}',
                            '${regDatetime}'
                        from
                            ksv_po_mrp a,
                            kcd_matl_mst b
                        where
                            a.po_cd = '${poCdEsc}'
                            and a.order_cd = '${orderCdEsc}'
                            and a.matl_cd = '${matlCdEsc}'
                            and b.matl_cd = a.matl_cd
                    `),
                );
            }

            return { ok: true, step: 'kspPoMrpListAdjust' };
        } catch (error: any) {
            return {
                ok: false,
                step: 'kspPoMrpListAdjust',
                message: error?.message || 'unknown error',
            };
        }
    }

    async runPoMrp(input: MrpMigrationInput): Promise<MrpMigrationResult> {
        try {
            if (!input.poCd) throw new Error('poCd is required');
            if (!input.userId) throw new Error('userId is required');

            const poCdEsc = this.escapeSqlLiteral(input.poCd);
            const userEsc = this.escapeSqlLiteral(input.userId);
            const regDatetime = this.getRegDatetime();
            const currDate = regDatetime.substring(0, 8);

            await this.prisma.$queryRaw(
                Prisma.raw(`
                    delete ksv_po_mrp
                    where
                        po_cd = '${poCdEsc}'
                        and po_seq = 1
                `),
            );

            const rows = (await this.prisma.$queryRaw(
                Prisma.raw(`
                    select
                        a.po_cd,
                        a.order_cd,
                        a.matl_cd,
                        a.matl_seq,
                        e.matl_price,
                        e.curr_cd,
                        sum(a.net_qty) as sum_qty
                    from
                        ksv_po_mrpnet a,
                        kcd_matl_mem e
                    where
                        a.po_cd = '${poCdEsc}'
                        and e.matl_cd = a.matl_cd
                        and e.matl_seq = a.matl_seq
                    group by
                        a.po_cd,
                        a.order_cd,
                        a.matl_cd,
                        a.matl_seq,
                        e.matl_price,
                        e.curr_cd
                    order by
                        a.po_cd,
                        a.order_cd,
                        a.matl_cd
                `),
            )) as any[];

            let mrpSeq = 0;
            for (const row of rows) {
                mrpSeq += 1;

                const orderCdEsc = this.escapeSqlLiteral(
                    String(row.order_cd || ''),
                );
                const matlCdEsc = this.escapeSqlLiteral(
                    String(row.matl_cd || ''),
                );
                const matlSeq = parseInt(String(row.matl_seq || '0'), 10) || 0;
                const matlPrice =
                    parseFloat(String(row.matl_price || '0')) || 0;
                const currCdEsc = this.escapeSqlLiteral(
                    String(row.curr_cd || ''),
                );
                const sumQty = parseFloat(String(row.sum_qty || '0')) || 0;
                const useQty = this.roundProc(sumQty);
                const totAmt = sumQty * matlPrice;

                await this.prisma.$queryRaw(
                    Prisma.raw(`
                        insert into ksv_po_mrp
                        (
                            po_cd,
                            po_seq,
                            order_cd,
                            matl_cd,
                            mrp_seq,
                            matl_seq,
                            matl_price,
                            use_size,
                            use_qty,
                            po_qty,
                            bef_po_qty,
                            diff_qty,
                            diff_po_type,
                            change_reason,
                            use_po_type,
                            curr_cd,
                            tot_amt,
                            curr_date,
                            usd_amt,
                            status_cd,
                            reg_user,
                            reg_datetime,
                            use_real_qty,
                            use_int_qty
                        )
                        values
                        (
                            '${poCdEsc}',
                            1,
                            '${orderCdEsc}',
                            '${matlCdEsc}',
                            ${mrpSeq},
                            ${matlSeq},
                            ${matlPrice},
                            '',
                            ${useQty},
                            ${useQty},
                            0,
                            0,
                            0,
                            '',
                            1,
                            '${currCdEsc}',
                            ${totAmt},
                            '${currDate}',
                            0,
                            0,
                            '${userEsc}',
                            '${regDatetime}',
                            ${sumQty},
                            ${useQty}
                        )
                    `),
                );
            }

            await this.prisma.$queryRaw(
                Prisma.raw(`
                    update ksv_po_mrp
                    set
                        usd_amt = tot_amt * (
                            select usd_rate
                            from kcd_currency
                            where
                                curr_cd = ksv_po_mrp.curr_cd
                                and start_date = ksv_po_mrp.curr_date
                        )
                    where
                        po_cd = '${poCdEsc}'
                        and po_seq = 1
                `),
            );

            await this.prisma.$queryRaw(
                Prisma.raw(`
                    update ksv_po_mst
                    set
                        po_status = '2',
                        curr_date = '${currDate}'
                    where
                        po_cd = '${poCdEsc}'
                        and po_seq = 1
                `),
            );

            const sumByMatl = (await this.prisma.$queryRaw(
                Prisma.raw(`
                    select
                        a.matl_cd,
                        sum(use_real_qty) as sum_qty
                    from
                        ksv_po_mrp a
                    where
                        a.po_cd = '${poCdEsc}'
                    group by
                        a.matl_cd
                    order by
                        a.matl_cd
                `),
            )) as any[];

            for (const row of sumByMatl) {
                const matlCdEsc = this.escapeSqlLiteral(
                    String(row.matl_cd || ''),
                );
                const useSumQty = this.roundProc(
                    parseFloat(String(row.sum_qty || '0')) || 0,
                );
                await this.prisma.$queryRaw(
                    Prisma.raw(`
                        update ksv_po_mrp
                        set use_sum_qty = ${useSumQty}
                        where
                            po_cd = '${poCdEsc}'
                            and matl_cd = '${matlCdEsc}'
                    `),
                );

                const cntRows = (await this.prisma.$queryRaw(
                    Prisma.raw(`
                        select
                            count(*) as cnt,
                            isnull(max(use_sum_qty), 0) as use_sum_qty
                        from
                            ksv_po_mrp
                        where
                            po_cd = '${poCdEsc}'
                            and matl_cd = '${matlCdEsc}'
                    `),
                )) as any[];

                let remainCnt =
                    parseInt(String(cntRows?.[0]?.cnt || '0'), 10) || 0;
                let remainQty =
                    parseInt(String(cntRows?.[0]?.use_sum_qty || '0'), 10) || 0;

                const lineRows = (await this.prisma.$queryRaw(
                    Prisma.raw(`
                        select
                            a.mrp_seq,
                            a.use_real_qty
                        from
                            ksv_po_mrp a
                        where
                            a.po_cd = '${poCdEsc}'
                            and a.matl_cd = '${matlCdEsc}'
                            and right(a.order_cd, 7) <> 'Minimum'
                        order by
                            a.use_real_qty
                    `),
                )) as any[];

                for (const line of lineRows) {
                    const lineMrpSeq =
                        parseInt(String(line.mrp_seq || '0'), 10) || 0;
                    const useRealQty =
                        parseFloat(String(line.use_real_qty || '0')) || 0;

                    let useQty = 0;
                    if (remainCnt <= 1) {
                        useQty = remainQty;
                    } else {
                        useQty = Math.round(useRealQty);
                        remainQty -= useQty;
                        remainCnt -= 1;
                    }

                    await this.prisma.$queryRaw(
                        Prisma.raw(`
                            update ksv_po_mrp
                            set
                                use_qty = ${useQty},
                                po_qty = ${useQty}
                            where
                                po_cd = '${poCdEsc}'
                                and matl_cd = '${matlCdEsc}'
                                and mrp_seq = ${lineMrpSeq}
                        `),
                    );
                }
            }

            return { ok: true, step: 'kspPoMrp' };
        } catch (error: any) {
            return {
                ok: false,
                step: 'kspPoMrp',
                message: error?.message || 'unknown error',
            };
        }
    }

    async runPoMrpNet(input: MrpMigrationInput): Promise<MrpMigrationResult> {
        try {
            if (!input.poCd) throw new Error('poCd is required');
            if (!input.userId) throw new Error('userId is required');

            const pre = await this.runNetProduct(input);
            if (!pre.ok) {
                throw new Error(pre.message || pre.step);
            }

            const poCdEsc = this.escapeSqlLiteral(input.poCd);
            const userEsc = this.escapeSqlLiteral(input.userId);

            await this.prisma.$queryRaw(
                Prisma.raw(`
                    delete ksv_po_mrpnet
                    where po_cd = '${poCdEsc}'
                `),
            );

            await this.prisma.$queryRaw(
                Prisma.raw(`
                    insert into ksv_po_mrpnet
                    (
                        po_cd,
                        order_cd,
                        prod_cd,
                        add_flag,
                        matl_cd,
                        matl_seq,
                        prod_seq,
                        use_size,
                        remark,
                        net,
                        loss,
                        gross,
                        vendor_cd,
                        ord_cnt,
                        net_qty,
                        use_qty,
                        status_cd,
                        reg_user,
                        reg_datetime,
                        country
                    )
                    select
                        po_cd,
                        order_cd,
                        prod_cd,
                        add_flag,
                        matl_cd,
                        matl_seq,
                        prod_seq,
                        use_size,
                        remark,
                        net,
                        loss,
                        gross,
                        vendor_cd,
                        ord_cnt,
                        net_qty,
                        use_qty,
                        status_cd,
                        reg_user,
                        reg_datetime,
                        country
                    from
                        ksv_po_mrpnettemp
                    where
                        user_id = '${userEsc}'
                        and po_cd = '${poCdEsc}'
                `),
            );
            return { ok: true, step: 'kspPoMrpNet' };
        } catch (error: any) {
            return {
                ok: false,
                step: 'kspPoMrpNet',
                message: error?.message || 'unknown error',
            };
        }
    }

    async runPoMatlListMain(
        input: PoMatlListInput,
    ): Promise<MrpMigrationResult> {
        try {
            if (!input.poCd) throw new Error('poCd is required');
            if (!input.userId) throw new Error('userId is required');

            const poCdEsc = this.escapeSqlLiteral(input.poCd);
            const userEsc = this.escapeSqlLiteral(input.userId);
            const regDatetime = this.getRegDatetime();

            await this.prisma.$queryRaw(
                Prisma.raw(`
                    delete from ksv_po_matllist
                    where po_cd = '${poCdEsc}'
                `),
            );

            const orderRows = (await this.prisma.$queryRaw(
                Prisma.raw(`
                    select
                        a.order_cd as order_cd
                    from
                        ksv_order_mst a
                        inner join ksv_order_mem b on a.order_cd = b.order_cd
                        inner join kcd_buyer c on left(a.order_cd, 2) = c.buyer_cd
                        inner join kcd_style d on a.style_cd = d.style_cd
                        inner join kcd_factory e on a.factory_cd = e.factory_cd
                        inner join ksv_po_mem f on a.order_cd = f.order_cd
                        inner join ksv_po_mst g on f.po_cd = g.po_cd
                    where
                        f.po_cd = '${poCdEsc}'
                        and f.po_seq = '1'
                        and g.po_seq = '1'
                    group by
                        a.order_cd
                `),
            )) as any[];
            const orderCds = orderRows.map((r) => String(r.order_cd || ''));

            const matlRows = (await this.prisma.$queryRaw(
                Prisma.raw(`
                    select
                        b.vendor_cd as vendor_cd,
                        a.matl_cd as matl_cd,
                        c.matl_seq as matl_seq
                    from
                        ksv_po_mrp a
                        inner join kcd_matl_mst b on a.matl_cd = b.matl_cd
                        inner join kcd_matl_mem c on b.matl_cd = c.matl_cd and a.matl_seq = c.matl_seq
                        inner join kcd_vendor d on b.vendor_cd = d.vendor_cd
                    where
                        a.po_cd = '${poCdEsc}'
                        and a.diff_po_type <> '2'
                    group by
                        b.vendor_cd,
                        a.matl_cd,
                        c.matl_price,
                        c.matl_seq,
                        d.vendor_name,
                        b.matl_name,
                        b.color,
                        b.spec
                    order by
                        d.vendor_name,
                        b.matl_name,
                        b.color,
                        b.spec
                `),
            )) as any[];

            let cnt = 0;
            let cnt2 = 0;
            let oldVendorCd = '';

            for (const row of matlRows) {
                const vendorCd = String(row.vendor_cd || '');
                const matlCd = String(row.matl_cd || '');
                const matlSeq = parseInt(String(row.matl_seq || '0'), 10) || 0;

                if (vendorCd !== oldVendorCd) {
                    oldVendorCd = vendorCd;
                    cnt += 1;
                    cnt2 = 1;
                }
                const prNum = `${cnt}-${cnt2}`;

                let totQty = 0;
                let ordCnt = '';

                for (const orderCd of orderCds) {
                    const qtyRows = (await this.prisma.$queryRaw(
                        Prisma.raw(`
                            select
                                sum(a.po_qty) as po_qty
                            from
                                ksv_po_mrp a
                                inner join kcd_matl_mem b on a.matl_seq = b.matl_seq and a.matl_cd = b.matl_cd
                            where
                                a.po_cd = '${poCdEsc}'
                                and a.matl_cd = '${this.escapeSqlLiteral(matlCd)}'
                                and a.order_cd = '${this.escapeSqlLiteral(orderCd)}'
                                and a.diff_po_type <> '2'
                                and left(a.matl_cd, 1) <> 'Z'
                            group by
                                a.matl_cd,
                                a.po_cd
                        `),
                    )) as any[];

                    const useQty =
                        parseInt(String(qtyRows?.[0]?.po_qty || '0'), 10) || 0;
                    totQty += useQty;
                    ordCnt += this.formatPoMatlListOrdCntSegment(useQty);
                }

                await this.prisma.$queryRaw(
                    Prisma.raw(`
                        insert into ksv_po_matllist
                        (
                            po_cd,
                            vendor_cd,
                            pr_num,
                            matl_cd,
                            matl_seq,
                            tot_cnt,
                            ord_cnt,
                            reg_user,
                            reg_datetime
                        )
                        values
                        (
                            '${poCdEsc}',
                            '${this.escapeSqlLiteral(vendorCd)}',
                            '${this.escapeSqlLiteral(prNum)}',
                            '${this.escapeSqlLiteral(matlCd)}',
                            ${matlSeq},
                            ${totQty},
                            '${this.escapeSqlLiteral(ordCnt)}',
                            '${userEsc}',
                            '${regDatetime}'
                        )
                    `),
                );

                cnt2 += 1;
            }

            return { ok: true, step: 'kspPoMatlListMain' };
        } catch (error: any) {
            return {
                ok: false,
                step: 'kspPoMatlListMain',
                message: error?.message || 'unknown error',
            };
        }
    }

    async runPoMrpList(input: PoMatlListInput): Promise<MrpMigrationResult> {
        try {
            if (!input.poCd) throw new Error('poCd is required');
            if (!input.userId) throw new Error('userId is required');

            const poCdEsc = this.escapeSqlLiteral(input.poCd);

            await this.prisma.$queryRaw(
                Prisma.raw(`
                    delete ksv_po_mrplist
                    where po_cd = '${poCdEsc}'
                `),
            );

            await this.prisma.$queryRaw(
                Prisma.raw(`
                    insert into ksv_po_mrplist
                    (
                        po_cd,
                        order_cd,
                        prod_cd,
                        add_flag,
                        matl_cd,
                        matl_seq,
                        prod_seq,
                        use_size,
                        remark,
                        net,
                        loss,
                        gross,
                        vendor_cd,
                        ord_cnt,
                        net_qty,
                        use_qty,
                        status_cd,
                        reg_user,
                        reg_datetime
                    )
                    select
                        po_cd,
                        order_cd,
                        prod_cd,
                        add_flag,
                        matl_cd,
                        matl_seq,
                        prod_seq,
                        use_size,
                        remark,
                        net,
                        loss,
                        gross,
                        vendor_cd,
                        ord_cnt,
                        net_qty,
                        use_qty,
                        status_cd,
                        reg_user,
                        reg_datetime
                    from
                        ksv_po_mrpnet
                    where
                        po_cd = '${poCdEsc}'
                `),
            );
            return { ok: true, step: 'kspPoMrpList' };
        } catch (error: any) {
            return {
                ok: false,
                step: 'kspPoMrpList',
                message: error?.message || 'unknown error',
            };
        }
    }

    async runFullChainForStyle(
        input: MrpMigrationInput,
    ): Promise<MrpMigrationResult[]> {
        const results: MrpMigrationResult[] = [];

        results.push(await this.runNetProduct(input));
        if (!results[results.length - 1].ok) return results;

        results.push(await this.runMrpTemp(input));
        return results;
    }

    private async executeRawSqlStep(
        step: string,
        sql: string,
    ): Promise<MrpMigrationResult> {
        await this.prisma.$queryRaw(Prisma.raw(sql));
        return { ok: true, step };
    }

    private async prepareMrpExecInput(
        input: MrpMigrationInput,
    ): Promise<{ poCdEsc: string; userEsc: string }> {
        await this.validateInput(input);
        return {
            poCdEsc: this.escapeSqlLiteral(input.poCd),
            userEsc: this.escapeSqlLiteral(input.userId),
        };
    }

    private async validateInput(input: MrpMigrationInput): Promise<void> {
        if (!input.poCd) throw new Error('poCd is required');
        if (!input.userId) throw new Error('userId is required');
    }

    private async validatePrintInput(
        input: PrintMrpMigrationInput,
    ): Promise<void> {
        if (!input.poCd) throw new Error('poCd is required');
        if (!input.orderCd) throw new Error('orderCd is required');
        if (!input.userId) throw new Error('userId is required');
        if (!input.currDate) throw new Error('currDate is required');
    }

    private async resolveCurrencyStartDate(currDate: string): Promise<string> {
        const currDateEsc = this.escapeSqlLiteral(currDate);
        const rows = (await this.prisma.$queryRaw(
            Prisma.raw(`
                select
                    isnull(max(start_date), '') as start_date
                from
                    kcd_currency
                where
                    start_date <= '${currDateEsc}'
            `),
        )) as any[];

        const matched = String(rows?.[0]?.start_date || '').trim();
        if (matched !== '') return matched;

        const fallbackRows = (await this.prisma.$queryRaw(
            Prisma.raw(`
                select
                    isnull(max(start_date), '') as start_date
                from
                    kcd_currency
            `),
        )) as any[];

        const fallback = String(fallbackRows?.[0]?.start_date || '').trim();
        return fallback || currDate;
    }

    private async validatePrintPInput(
        input: PrintMrpPMigrationInput,
    ): Promise<void> {
        if (!input.poCd) throw new Error('poCd is required');
        if (!input.orderCd) throw new Error('orderCd is required');
        if (!input.userId) throw new Error('userId is required');
        if (!input.currDate) throw new Error('currDate is required');
    }

    private buildStarStringByMatchFlags(matchFlags: boolean[]): string[] {
        const stars = ['', '', '', '', '', '', '', '', '', ' '];
        for (let i = 0; i < matchFlags.length; i++) {
            if (i < 9) {
                stars[i] = matchFlags[i] ? '*' : '';
                continue;
            }

            if (i === 9) {
                stars[9] = matchFlags[i] ? '*' : ' ';
                continue;
            }

            stars[9] += matchFlags[i] ? ' *' : '  ';
        }
        return stars;
    }

    private async buildStarsForMrpList(
        input: PrintMrpMigrationInput,
        prodCds: string[],
        matlCd: string,
        useSize: string,
        net: number,
        loss: number,
        gross: number,
        remark: string,
    ): Promise<string[]> {
        if (prodCds.length === 0) return this.buildStarStringByMatchFlags([]);

        const poCdEsc = this.escapeSqlLiteral(input.poCd);
        const orderEsc = this.escapeSqlLiteral(input.orderCd);
        const prodList = prodCds
            .map((p) => `'${this.escapeSqlLiteral(p)}'`)
            .join(',');

        const matchRows = (await this.prisma.$queryRaw(
            Prisma.raw(`
                select prod_cd
                from ksv_po_mrplist a
                where
                    a.po_cd = '${poCdEsc}'
                    and a.order_cd = '${orderEsc}'
                    and a.prod_cd in (${prodList})
                    and a.matl_cd = '${this.escapeSqlLiteral(matlCd)}'
                    and a.use_size = '${this.escapeSqlLiteral(useSize)}'
                    and a.net = '${this.escapeSqlLiteral(String(net))}'
                    and a.loss = '${this.escapeSqlLiteral(String(loss))}'
                    and a.gross = '${this.escapeSqlLiteral(String(gross))}'
                    and a.remark = '${this.escapeSqlLiteral(remark)}'
                    and a.add_flag = '0'
                group by prod_cd
            `),
        )) as any[];
        const foundSet = new Set(matchRows.map((r) => String(r.prod_cd || '')));
        const flags = prodCds.map((p) => foundSet.has(p));
        return this.buildStarStringByMatchFlags(flags);
    }

    private async buildStarsForMrpNetTemp(
        input: PrintMrpMigrationInput,
        prodCds: string[],
        matlCd: string,
        useSize: string,
        net: number,
        loss: number,
        gross: number,
        remark: string,
    ): Promise<string[]> {
        if (prodCds.length === 0) return this.buildStarStringByMatchFlags([]);

        const poCdEsc = this.escapeSqlLiteral(input.poCd);
        const orderEsc = this.escapeSqlLiteral(input.orderCd);
        const userEsc = this.escapeSqlLiteral(input.userId);
        const prodList = prodCds
            .map((p) => `'${this.escapeSqlLiteral(p)}'`)
            .join(',');

        const matchRows = (await this.prisma.$queryRaw(
            Prisma.raw(`
                select prod_cd
                from ksv_po_mrpnettemp a
                where
                    a.user_id = '${userEsc}'
                    and a.po_cd = '${poCdEsc}'
                    and a.order_cd = '${orderEsc}'
                    -- TS fallback kept for later replacement if needed:
                    -- and left(a.order_cd, 10) = '${orderEsc}'
                    and a.prod_cd in (${prodList})
                    and a.matl_cd = '${this.escapeSqlLiteral(matlCd)}'
                    and a.use_size = '${this.escapeSqlLiteral(useSize)}'
                    and a.net = '${this.escapeSqlLiteral(String(net))}'
                    and a.loss = '${this.escapeSqlLiteral(String(loss))}'
                    and a.gross = '${this.escapeSqlLiteral(String(gross))}'
                    and a.remark = '${this.escapeSqlLiteral(remark)}'
                    and a.add_flag = '0'
                group by prod_cd
            `),
        )) as any[];
        const foundSet = new Set(matchRows.map((r) => String(r.prod_cd || '')));
        const flags = prodCds.map((p) => foundSet.has(p));
        return this.buildStarStringByMatchFlags(flags);
    }

    private async buildStarsForStock(
        input: PrintMrpMigrationInput,
        prodCds: string[],
        matlCd: string,
    ): Promise<string[]> {
        const poCdEsc = this.escapeSqlLiteral(input.poCd);
        const orderEsc = this.escapeSqlLiteral(input.orderCd);
        const cntRows = (await this.prisma.$queryRaw(
            Prisma.raw(`
                select
                    count(*) as cnt
                from
                    ksv_po_mrp a
                where
                    a.po_cd = '${poCdEsc}'
                    and left(a.order_cd, 10) = '${orderEsc}'
                    and a.matl_cd = '${this.escapeSqlLiteral(matlCd)}'
                    and a.use_po_type = '2'
            `),
        )) as any[];
        const hasStock =
            (parseInt(String(cntRows?.[0]?.cnt || '0'), 10) || 0) > 0;
        return this.buildStarStringByMatchFlags(prodCds.map(() => hasStock));
    }

    private buildKzzExcelInsertSql(row: Record<string, any>): string {
        const normalized: Record<string, any> = {
            ...row,
            user_id: row.userId,
            ex_seq: row.seq,
            ex_type: row.exType,
        };
        delete normalized.userId;
        delete normalized.seq;
        delete normalized.exType;

        const columns = Object.keys(normalized);
        const values = columns.map((key) => {
            const val = normalized[key];
            if (val === null || typeof val === 'undefined') return 'null';
            return `'${this.escapeSqlLiteral(String(val))}'`;
        });

        const sql = `
            insert into kzz_excel
            (
                ${columns.join(',')}
            )
            values
            (
                ${values.join(',')}
            )
        `;
        return sql;
    }

    private async insertKzzExcelRowsBulk(
        rows: Record<string, any>[],
    ): Promise<void> {
        if (rows.length === 0) return;

        const sqls = rows.map((row) => this.buildKzzExcelInsertSql(row));
        await this.executeSqlsWithConcurrency(sqls, 10);
    }

    private async deleteMrpNetTempByUser(userId: string): Promise<void> {
        const sql = `
            delete from ksv_po_mrpnettemp
            where user_id = '${userId}'
        `;

        await this.prisma.$queryRaw(Prisma.raw(sql));
    }

    private async runNetTempCountry(input: MrpMigrationInput): Promise<void> {
        const poCdEsc = this.escapeSqlLiteral(input.poCd);
        const userEsc = this.escapeSqlLiteral(input.userId);

        const sqlC1 = `
            select
                a.order_cd
            from
                ksv_po_mem a
            where
                a.po_cd = '${poCdEsc}'
                and a.po_seq = 1
                and substring(a.order_cd, 6, 1) = 'C'
        `;

        const combinedOrders = (await this.prisma.$queryRaw(
            Prisma.raw(sqlC1),
        )) as any[];

        for (const one of combinedOrders) {
            const orderCd = String(one.order_cd || '');
            const orderEsc = this.escapeSqlLiteral(orderCd);

            const sqlRows = `
                select
                    prod_cd,
                    add_flag,
                    matl_cd,
                    country,
                    use_size,
                    remark,
                    gross
                from
                    ksv_po_mrpnettemp
                where
                    user_id = '${userEsc}'
                    and po_cd = '${poCdEsc}'
                    and order_cd = '${orderEsc}'
                    and len(country) > 0
            `;
            const rows = (await this.prisma.$queryRaw(
                Prisma.raw(sqlRows),
            )) as any[];

            for (const r of rows) {
                const useSize = String(r.use_size || '').replace(/ /g, '');
                const gross = parseFloat(String(r.gross || '0')) || 0;
                const country = String(r.country || '');

                const resetSql = `
                    update ksv_po_mrpnettemp
                    set
                        ord_cnt = 0,
                        net_qty = 0,
                        use_qty = 0
                    where
                        user_id = '${userEsc}'
                        and po_cd = '${poCdEsc}'
                        and order_cd = '${orderEsc}'
                        and prod_cd = '${this.escapeSqlLiteral(String(r.prod_cd || ''))}'
                        and add_flag = '${this.escapeSqlLiteral(String(r.add_flag || ''))}'
                        and matl_cd = '${this.escapeSqlLiteral(String(r.matl_cd || ''))}'
                        and use_size = '${this.escapeSqlLiteral(useSize)}'
                        and remark = '${this.escapeSqlLiteral(String(r.remark || ''))}'
                `;
                await this.prisma.$queryRaw(Prisma.raw(resetSql));

                const sqlTot = `
                    select
                        sum(b.tot_cnt) as tot_cnt
                    from
                        ksv_order_mst a,
                        ksv_order_mem b
                    where
                        left(a.order_cd, 10) = '${orderEsc}'
                        and a.order_type = '2'
                        and a.nat_cd = '${this.escapeSqlLiteral(country)}'
                        and b.order_cd = a.order_cd
                        and b.prod_cd = '${this.escapeSqlLiteral(String(r.prod_cd || ''))}'
                        and b.add_flag = '${this.escapeSqlLiteral(String(r.add_flag || ''))}'
                `;
                const retTot = (await this.prisma.$queryRaw(
                    Prisma.raw(sqlTot),
                )) as any[];
                const ordCnt =
                    parseFloat(String(retTot?.[0]?.tot_cnt || '0')) || 0;

                const updSql = `
                    update ksv_po_mrpnettemp
                    set
                        ord_cnt = '${this.escapeSqlLiteral(String(ordCnt))}',
                        net_qty = gross * '${this.escapeSqlLiteral(String(ordCnt))}',
                        use_qty = round(gross * '${this.escapeSqlLiteral(String(ordCnt))}' + 0.4999, 0, 0)
                    where
                        user_id = '${userEsc}'
                        and po_cd = '${poCdEsc}'
                        and order_cd = '${orderEsc}'
                        and prod_cd = '${this.escapeSqlLiteral(String(r.prod_cd || ''))}'
                        and add_flag = '${this.escapeSqlLiteral(String(r.add_flag || ''))}'
                        and matl_cd = '${this.escapeSqlLiteral(String(r.matl_cd || ''))}'
                        and use_size = '${this.escapeSqlLiteral(useSize)}'
                        and remark = '${this.escapeSqlLiteral(String(r.remark || ''))}'
                `;
                await this.prisma.$queryRaw(Prisma.raw(updSql));
            }
        }
    }

    private async resetOrderMrpSeqMax(input: MrpMigrationInput): Promise<void> {
        const poCdEsc = this.escapeSqlLiteral(input.poCd);
        const userEsc = this.escapeSqlLiteral(input.userId);

        const sqlDel = `
            delete ksv_order_mrp_seqmax
            where
                user_id = '${userEsc}'
        `;
        await this.prisma.$queryRaw(Prisma.raw(sqlDel));

        const sqlIns = `
            insert into ksv_order_mrp_seqmax
            select
                '${userEsc}',
                order_cd,
                prod_cd,
                max(order_mrp_seq)
            from
                ksv_order_mrp
            where
                order_cd in (
                    select
                        order_cd
                    from
                        ksv_po_mem
                    where
                        po_cd = '${poCdEsc}'
                )
            group by
                order_cd,
                prod_cd
        `;
        await this.prisma.$queryRaw(Prisma.raw(sqlIns));
    }

    private async runOrderSizeTot(input: MrpMigrationInput): Promise<void> {
        const poCdEsc = this.escapeSqlLiteral(input.poCd);
        const userEsc = this.escapeSqlLiteral(input.userId);

        await this.prisma.$queryRaw(
            Prisma.raw(`
                delete from ksv_order_mem_sizetot
                where user_id = '${userEsc}'
            `),
        );

        const rows = (await this.prisma.$queryRaw(
            Prisma.raw(`
                select distinct
                    a.order_cd as order_cd,
                    b.prod_cd as prod_cd,
                    d.size_cnt as size_cnt
                from
                    ksv_po_mem a,
                    ksv_order_mem b,
                    ksv_order_mst c,
                    kcd_size_mst d
                where
                    a.po_cd = '${poCdEsc}'
                    and a.po_seq = 1
                    and a.order_cd = b.order_cd
                    and c.order_cd = b.order_cd
                    and c.size_group = d.size_group
                order by
                    1,
                    2
            `),
        )) as any[];

        for (const row of rows) {
            const orderCd = String(row.order_cd || '');
            const prodCd = String(row.prod_cd || '');
            const sizeMax = parseInt(String(row.size_cnt || '0'), 10) || 0;

            let ordCnt = '';
            for (let i = 0; i < sizeMax; i++) {
                const qtyRows = (await this.prisma.$queryRaw(
                    Prisma.raw(`
                        select
                            sum(cast(substring(b.size_cnt, ${i} * 6 + 1, 6) as int)) as use_qty
                        from
                            ksv_po_mem a,
                            ksv_order_mem b,
                            ksv_order_mst c
                        where
                            a.po_cd = '${poCdEsc}'
                            and b.order_cd = '${this.escapeSqlLiteral(orderCd)}'
                            and b.prod_cd = '${this.escapeSqlLiteral(prodCd)}'
                            and a.po_seq = 1
                            and a.order_cd = b.order_cd
                            and c.order_cd = b.order_cd
                    `),
                )) as any[];

                ordCnt += this.formatOrderSizeTotSegment(qtyRows?.[0]?.use_qty);
            }

            await this.prisma.$queryRaw(
                Prisma.raw(`
                    insert into ksv_order_mem_sizetot
                    (
                        user_id,
                        order_cd,
                        prod_cd,
                        size_cnt
                    )
                    values
                    (
                        '${userEsc}',
                        '${this.escapeSqlLiteral(orderCd)}',
                        '${this.escapeSqlLiteral(prodCd)}',
                        '${this.escapeSqlLiteral(ordCnt)}'
                    )
                `),
            );
        }
    }

    private async runNetTempZipByOrder(
        input: MrpMigrationInput,
        orderCd: string,
        useSizeTotTable: boolean,
    ): Promise<void> {
        const rows1 = await this.queryNetTempZipRows(
            input,
            orderCd,
            useSizeTotTable,
            true,
        );
        await this.insertNetTempRows(rows1, input, {
            normalizeUseSize: false,
            applyCountryFilter: false,
            includeBvtRemark: false,
        });

        const rows2 = await this.queryNetTempZipRows(
            input,
            orderCd,
            useSizeTotTable,
            false,
        );
        await this.insertNetTempRows(rows2, input, {
            normalizeUseSize: false,
            applyCountryFilter: false,
            includeBvtRemark: false,
        });
    }

    private async runNetTempZipCombByOrder(
        input: MrpMigrationInput,
    ): Promise<void> {
        const rows1 = await this.queryNetTempZipCombRows(input, true);
        await this.insertNetTempRows(rows1, input, {
            normalizeUseSize: false,
            applyCountryFilter: false,
            includeBvtRemark: false,
        });

        const rows2 = await this.queryNetTempZipCombRows(input, false);
        await this.insertNetTempRows(rows2, input, {
            normalizeUseSize: false,
            applyCountryFilter: false,
            includeBvtRemark: false,
        });
    }

    private async queryNetTempZipRows(
        input: MrpMigrationInput,
        orderCd: string,
        useSizeTotTable: boolean,
        withCountry: boolean,
    ): Promise<any[]> {
        const poCdEsc = this.escapeSqlLiteral(input.poCd);
        const userEsc = this.escapeSqlLiteral(input.userId);
        const orderEsc = this.escapeSqlLiteral(orderCd);
        const countryCond = withCountry ? "c.country <> ''" : "c.country = ''";
        const natJoin = withCountry ? 'and b2.nat_cd = c.country' : '';

        const memTable = useSizeTotTable
            ? 'ksv_order_mem_sizetot'
            : 'ksv_order_mem';
        const addFlagSelect = useSizeTotTable ? "'0'" : 'b.add_flag';
        const orderJoin = useSizeTotTable
            ? 'b.order_cd = a.order_cd and b.user_id = @USER_ID'
            : 'left(b.order_cd,10) = a.order_cd';

        let sql = `
            select
                a.po_cd as po_cd,
                a.order_cd as order_cd,
                b.prod_cd as prod_cd,
                ${addFlagSelect} as add_flag,
                c.matl_cd as matl_cd,
                e.matl_seq as matl_seq,
                c.seq as prod_seq,
                c.use_size as use_size,
                c.remark as remark,
                c.net as net,
                c.loss as loss,
                c.gross as gross,
                d.vendor_cd as vendor_cd,
                b2.size_group as size_group,
                b.size_cnt as size_cnt,
                d.count_flag as count_flag,
                f.size_cnt as size_max,
                b2.nat_cd as nat_cd,
                c.country as country
            from
                ksv_po_mem a,
                ${memTable} b,
                ksv_order_mrp_seqmax c2,
                ksv_order_mrp c,
                kcd_matl_mst d,
                kcd_matl_mem e,
                ksv_order_mst b2,
                kcd_size_mst f
            where
                a.po_cd = '${poCdEsc}'
                and a.po_seq = 1
                and d.matl_type2 in ('33', '55', '60', '56')
                and ${countryCond}
                and b2.order_cd = '${orderEsc}'
                and ${orderJoin}
                ${natJoin}
                and c2.user_id = '${userEsc}'
                and c2.order_cd = a.order_cd
                and c.order_cd = a.order_cd
                and c.prod_cd = b.prod_cd
                and c.order_mrp_seq = c2.order_mrp_seq
                and c.prod_cd = c2.prod_cd
                and d.matl_cd = c.matl_cd
                and e.matl_cd = c.matl_cd
                and e.matl_seq = (
                    select
                        max(matl_seq)
                    from
                        kcd_matl_mem
                    where
                        matl_cd = c.matl_cd
                )
                and b2.order_cd = b.order_cd
                and b2.order_status <> '4'
                and f.size_group = b2.size_group
        `;

        sql = sql.replace('@USER_ID', `'${userEsc}'`);
        return (await this.prisma.$queryRaw(Prisma.raw(sql))) as any[];
    }

    private async queryNetTempZipCombRows(
        input: MrpMigrationInput,
        withCountry: boolean,
    ): Promise<any[]> {
        const poCdEsc = this.escapeSqlLiteral(input.poCd);
        const userEsc = this.escapeSqlLiteral(input.userId);
        const orderEsc = this.escapeSqlLiteral(input.orderCd || '');
        const countryCond = withCountry ? "c.country <> ''" : "c.country = ''";
        const natJoin = withCountry ? 'and b2.nat_cd = c.country' : '';

        const sql = `
            select
                a.po_cd as po_cd,
                a.order_cd as order_cd,
                b.prod_cd as prod_cd,
                b.add_flag as add_flag,
                c.matl_cd as matl_cd,
                e.matl_seq as matl_seq,
                c.seq as prod_seq,
                c.use_size as use_size,
                c.remark as remark,
                c.net as net,
                c.loss as loss,
                c.gross as gross,
                d.vendor_cd as vendor_cd,
                b2.size_group as size_group,
                b.size_cnt as size_cnt,
                d.count_flag as count_flag,
                f.size_cnt as size_max,
                b2.nat_cd as nat_cd,
                c.country as country
            from
                ksv_po_mem a,
                ksv_order_mem b,
                ksv_order_mrp_seqmax c2,
                ksv_order_mrp c,
                kcd_matl_mst d,
                kcd_matl_mem e,
                ksv_order_mst b2,
                kcd_size_mst f
            where
                a.po_cd = '${poCdEsc}'
                and a.po_seq = 1
                and d.matl_type2 in ('33', '55', '60', '56')
                and ${countryCond}
                and b2.order_cd = '${orderEsc}'
                and left(b.order_cd, 10) = a.order_cd
                ${natJoin}
                and c2.user_id = '${userEsc}'
                and c2.order_cd = a.order_cd
                and c.order_cd = a.order_cd
                and c.prod_cd = b.prod_cd
                and c.order_mrp_seq = c2.order_mrp_seq
                and c.prod_cd = c2.prod_cd
                and d.matl_cd = c.matl_cd
                and e.matl_cd = c.matl_cd
                and e.matl_seq = (
                    select
                        max(matl_seq)
                    from
                        kcd_matl_mem
                    where
                        matl_cd = c.matl_cd
                )
                and b2.order_cd = b.order_cd
                and b2.order_status <> '4'
                and f.size_group = b2.size_group
        `;

        return (await this.prisma.$queryRaw(Prisma.raw(sql))) as any[];
    }

    private async insertNetTempRows(
        rows: any[],
        input: MrpMigrationInput,
        options: {
            normalizeUseSize: boolean;
            applyCountryFilter: boolean;
            includeBvtRemark: boolean;
        },
    ): Promise<void> {
        const regDatetime = this.getRegDatetime();
        const userEsc = this.escapeSqlLiteral(input.userId);

        type InsertRow = {
            useSize: string;
            row: any;
            ordCnt: number;
            netQty: number;
            useQty: number;
        };
        const insertRows: InsertRow[] = [];
        const dedupKeys = new Set<string>();

        for (const row of rows) {
            const useSize = options.normalizeUseSize
                ? this.normalizeUseSize(row.use_size)
                : String(row.use_size || '');
            const sizeGroup = String(row.size_group || '');
            const sizeMax = parseInt(String(row.size_max || '0'), 10) || 0;
            const sizeCounts = this.splitSizeCounts(
                String(row.size_cnt || ''),
                sizeMax,
            );
            const sizeRates = new Array(sizeMax).fill(1);

            let ordCnt = sizeCounts.reduce((sum, v) => sum + v, 0);
            let useSizeIdx = -1;

            if (useSize !== '') {
                const sizeSeq = await this.getSizeSeq(sizeGroup, useSize);
                if (sizeSeq > 0) {
                    useSizeIdx = sizeSeq - 1;
                    ordCnt = sizeCounts[useSizeIdx] || 0;
                } else {
                    // 기존 프로시저와 맞추기 위해 use_size는 있는데 size_seq를 못 찾으면 해당 행을 버립니다.
                    ordCnt = 0;
                }
            }

            if (ordCnt === 0) {
                for (let i = 0; i < sizeCounts.length; i++) sizeCounts[i] = 0;
            } else if (useSizeIdx >= 0) {
                for (let i = 0; i < sizeCounts.length; i++) {
                    if (i !== useSizeIdx) sizeCounts[i] = 0;
                }
            }

            if (String(row.count_flag || '') === '0') {
                const rateRows = await this.getSizeRates(sizeGroup);
                for (const rr of rateRows) {
                    const idx = rr.size_seq - 1;
                    if (
                        idx >= 0 &&
                        idx < sizeRates.length &&
                        idx !== useSizeIdx
                    ) {
                        sizeRates[idx] = rr.unit_rate;
                    }
                }
            }

            const gross = parseFloat(String(row.gross || '0')) || 0;
            let useQtyRaw = 0;
            for (let i = 0; i < sizeCounts.length; i++) {
                useQtyRaw += gross * sizeCounts[i] * sizeRates[i];
            }
            const netQty = useQtyRaw;
            const useQty = this.roundProc(useQtyRaw);

            if (options.applyCountryFilter) {
                const country = String(row.country || '');
                const natCd = String(row.nat_cd || '');
                if (
                    country !== '' &&
                    natCd !== '' &&
                    !this.containsNatCode(country, natCd)
                ) {
                    ordCnt = 0;
                }
            }

            if (ordCnt <= 0) continue;
            const dedupKey = [
                String(row.po_cd || ''),
                String(row.order_cd || ''),
                String(row.prod_cd || ''),
                String(row.add_flag || ''),
                String(row.matl_cd || ''),
                String(row.matl_seq || ''),
                String(row.prod_seq || ''),
                useSize,
                String(row.remark || ''),
                String(row.vendor_cd || ''),
                String(row.country || ''),
            ].join('|');

            if (dedupKeys.has(dedupKey)) {
                continue;
            }
            dedupKeys.add(dedupKey);

            insertRows.push({ useSize, row, ordCnt, netQty, useQty });
        }

        if (insertRows.length === 0) return;

        const insertSqls: string[] = [];

        if (options.includeBvtRemark) {
            for (const { useSize, row, ordCnt, netQty, useQty } of insertRows) {
                const countryVal =
                    String(row.country || '').length === 0
                        ? 'NULL'
                        : `'${this.escapeSqlLiteral(String(row.country))}'`;
                const sql = `insert into ksv_po_mrpnettemp (user_id,po_cd,order_cd,prod_cd,add_flag,matl_cd,matl_seq,prod_seq,use_size,remark,net,loss,gross,vendor_cd,ord_cnt,net_qty,use_qty,status_cd,reg_user,reg_datetime,country,bvt_remark) values ('${userEsc}','${this.escapeSqlLiteral(String(row.po_cd || ''))}','${this.escapeSqlLiteral(String(row.order_cd || ''))}','${this.escapeSqlLiteral(String(row.prod_cd || ''))}','${this.escapeSqlLiteral(String(row.add_flag || ''))}','${this.escapeSqlLiteral(String(row.matl_cd || ''))}','${this.escapeSqlLiteral(String(row.matl_seq || ''))}','${this.escapeSqlLiteral(String(row.prod_seq || ''))}','${this.escapeSqlLiteral(useSize)}','${this.escapeSqlLiteral(String(row.remark || ''))}','${this.escapeSqlLiteral(String(row.net || '0'))}','${this.escapeSqlLiteral(String(row.loss || '0'))}','${this.escapeSqlLiteral(String(row.gross || '0'))}','${this.escapeSqlLiteral(String(row.vendor_cd || ''))}','${this.escapeSqlLiteral(String(ordCnt))}','${this.escapeSqlLiteral(String(netQty))}','${this.escapeSqlLiteral(String(useQty))}','0','${userEsc}','${this.escapeSqlLiteral(regDatetime)}',${countryVal},'${this.escapeSqlLiteral(String(row.bvt_remark || ''))}')`;
                insertSqls.push(sql);
            }
        } else {
            for (const { useSize, row, ordCnt, netQty, useQty } of insertRows) {
                const countryVal =
                    String(row.country || '').length === 0
                        ? 'NULL'
                        : `'${this.escapeSqlLiteral(String(row.country))}'`;
                const sql = `insert into ksv_po_mrpnettemp (user_id,po_cd,order_cd,prod_cd,add_flag,matl_cd,matl_seq,prod_seq,use_size,remark,net,loss,gross,vendor_cd,ord_cnt,net_qty,use_qty,status_cd,reg_user,reg_datetime,country) values ('${userEsc}','${this.escapeSqlLiteral(String(row.po_cd || ''))}','${this.escapeSqlLiteral(String(row.order_cd || ''))}','${this.escapeSqlLiteral(String(row.prod_cd || ''))}','${this.escapeSqlLiteral(String(row.add_flag || ''))}','${this.escapeSqlLiteral(String(row.matl_cd || ''))}','${this.escapeSqlLiteral(String(row.matl_seq || ''))}','${this.escapeSqlLiteral(String(row.prod_seq || ''))}','${this.escapeSqlLiteral(useSize)}','${this.escapeSqlLiteral(String(row.remark || ''))}','${this.escapeSqlLiteral(String(row.net || '0'))}','${this.escapeSqlLiteral(String(row.loss || '0'))}','${this.escapeSqlLiteral(String(row.gross || '0'))}','${this.escapeSqlLiteral(String(row.vendor_cd || ''))}','${this.escapeSqlLiteral(String(ordCnt))}','${this.escapeSqlLiteral(String(netQty))}','${this.escapeSqlLiteral(String(useQty))}','0','${userEsc}','${this.escapeSqlLiteral(regDatetime)}',${countryVal})`;
                insertSqls.push(sql);
            }
        }

        await this.executeSqlsWithConcurrency(insertSqls, 10);
    }

    private async findExistingMrpSeq(
        poCd: string,
        orderCd: string,
        matlCd: string,
        matlSeq: string,
        fallback: number,
    ): Promise<number> {
        const sql = `
            select top 1
                isnull(mrp_seq, ${fallback}) as mrp_seq
            from
                ksv_po_mrp
            where
                po_cd = '${this.escapeSqlLiteral(poCd)}'
                and order_cd = '${this.escapeSqlLiteral(orderCd)}'
                and matl_cd = '${this.escapeSqlLiteral(matlCd)}'
                and matl_seq = '${this.escapeSqlLiteral(matlSeq)}'
        `;
        const ret = (await this.prisma.$queryRaw(Prisma.raw(sql))) as any[];
        if (ret.length <= 0) return fallback;
        return parseInt(String(ret[0].mrp_seq || fallback), 10) || fallback;
    }

    private roundProc(v: number): number {
        return Math.round(v + 0.4999);
    }

    private async executeSqlsWithConcurrency(
        sqls: string[],
        concurrency: number,
    ): Promise<void> {
        if (sqls.length === 0) return;

        for (let i = 0; i < sqls.length; i += concurrency) {
            const chunk = sqls.slice(i, i + concurrency);
            await Promise.all(
                chunk.map((sql) => this.prisma.$queryRaw(Prisma.raw(sql))),
            );
        }
    }

    private normalizeUseSize(useSizeRaw: any): string {
        const map: Record<string, string> = {
            XXL: '2XL',
            XXXL: '3XL',
            XXXXL: '4XL',
            XXXXXL: '5XL',
            XXS: '2XS',
            XXXS: '3XS',
        };

        const t = String(useSizeRaw || '').trim();
        return map[t] || t;
    }

    private splitSizeCounts(sizeCntRaw: string, sizeMax: number): number[] {
        const arr: number[] = [];
        for (let i = 0; i < sizeMax; i++) {
            const seg = sizeCntRaw.substring(i * 6, (i + 1) * 6);
            const n = parseInt(seg, 10);
            arr.push(Number.isNaN(n) ? 0 : n);
        }
        return arr;
    }

    private formatOrderSizeTotSegment(useQtyRaw: any): string {
        const s = String(useQtyRaw ?? '');
        if (s.length === 0) return '000000';
        if (s.length <= 5) return s.padStart(6, '0');
        return s;
    }

    private formatPoMatlListOrdCntSegment(useQty: number): string {
        if (useQty === 0) return '________';
        const s = String(useQty);
        if (s.length <= 7) return s.padStart(8, '0');
        return s;
    }

    private async runPoMatlListAdjustSeparated(
        input: PoMatlListInput,
        useMatlSeqFromMrp: boolean,
        stepName: string,
    ): Promise<MrpMigrationResult> {
        if (!input.poCd) throw new Error('poCd is required');
        if (!input.userId) throw new Error('userId is required');

        const poCdEsc = this.escapeSqlLiteral(input.poCd);
        const userEsc = this.escapeSqlLiteral(input.userId);
        const shadowPoCdEsc = this.escapeSqlLiteral(
            `${input.poCd}${input.userId}`,
        );

        await this.prisma.$queryRaw(
            Prisma.raw(`
                update ksv_po_matllist
                set po_cd = '${shadowPoCdEsc}'
                where po_cd = '${poCdEsc}'
                and pr_num not like '0%'
            `),
        );

        const orderRows = (await this.prisma.$queryRaw(
            Prisma.raw(`
                SELECT A.ORDER_CD AS order_cd
                FROM KSV_ORDER_MST AS A
                INNER JOIN KSV_ORDER_MEM AS B ON A.ORDER_CD = B.ORDER_CD
                INNER JOIN KCD_BUYER AS C ON LEFT(A.ORDER_CD, 2) = C.BUYER_CD
                INNER JOIN KCD_STYLE AS D ON A.STYLE_CD = D.STYLE_CD
                INNER JOIN KCD_FACTORY AS E ON A.FACTORY_CD = E.FACTORY_CD
                INNER JOIN KSV_PO_MEM AS F ON A.ORDER_CD = F.ORDER_CD
                INNER JOIN KSV_PO_MST AS G ON F.PO_CD = G.PO_CD
                WHERE (F.PO_CD = '${poCdEsc}')
                    AND (F.PO_SEQ = '1')
                    AND (G.PO_SEQ = '1')
                GROUP BY A.ORDER_CD
            `),
        )) as Array<{ order_cd: string }>;

        const matlGroupSql = useMatlSeqFromMrp
            ? `
                SELECT
                    B.VENDOR_CD AS vendor_cd,
                    A.MATL_CD AS matl_cd,
                    C.MATL_SEQ AS matl_seq,
                    D.VENDOR_NAME AS vendor_name,
                    B.MATL_NAME AS matl_name,
                    B.COLOR AS color,
                    B.SPEC AS spec
                FROM KSV_PO_MRP AS A
                INNER JOIN KCD_MATL_MST AS B ON A.MATL_CD = B.MATL_CD
                INNER JOIN KCD_MATL_MEM AS C ON B.MATL_CD = C.MATL_CD AND A.MATL_SEQ = C.MATL_SEQ
                INNER JOIN KCD_VENDOR AS D ON B.VENDOR_CD = D.VENDOR_CD
                WHERE (A.PO_CD = '${poCdEsc}')
                    AND B.MATL_TYPE <> 'Z'
                    AND A.PO_SEQ < 100
                    AND A.USE_PO_TYPE = 1
                GROUP BY B.VENDOR_CD, A.MATL_CD, C.MATL_SEQ, D.VENDOR_NAME, B.MATL_NAME, B.COLOR, B.SPEC
                ORDER BY D.VENDOR_NAME, B.MATL_NAME, B.COLOR, B.SPEC
            `
            : `
                SELECT
                    B.VENDOR_CD AS vendor_cd,
                    A.MATL_CD AS matl_cd,
                    1 AS matl_seq,
                    D.VENDOR_NAME AS vendor_name,
                    B.MATL_NAME AS matl_name,
                    B.COLOR AS color,
                    B.SPEC AS spec
                FROM KSV_PO_MRP AS A
                INNER JOIN KCD_MATL_MST AS B ON A.MATL_CD = B.MATL_CD
                INNER JOIN KCD_MATL_MEM AS C ON B.MATL_CD = C.MATL_CD
                INNER JOIN KCD_VENDOR AS D ON B.VENDOR_CD = D.VENDOR_CD
                WHERE (A.PO_CD = '${poCdEsc}')
                    AND B.MATL_TYPE <> 'Z'
                    AND A.PO_SEQ < 100
                    AND A.USE_PO_TYPE = 1
                GROUP BY B.VENDOR_CD, A.MATL_CD, D.VENDOR_NAME, B.MATL_NAME, B.COLOR, B.SPEC
                ORDER BY D.VENDOR_NAME, B.MATL_NAME, B.COLOR, B.SPEC
            `;

        const matlGroups = (await this.prisma.$queryRaw(
            Prisma.raw(matlGroupSql),
        )) as Array<{
            vendor_cd: string;
            matl_cd: string;
            matl_seq: number;
        }>;

        const qtyMatrixRows = (await this.prisma.$queryRaw(
            Prisma.raw(`
                SELECT
                    A.MATL_CD AS matl_cd,
                    A.ORDER_CD AS order_cd,
                    SUM(A.PO_QTY) AS qty_sum,
                    COUNT(A.PO_QTY) AS qty_count
                FROM KSV_PO_MRP AS A
                WHERE A.PO_CD = '${poCdEsc}'
                    AND A.PO_SEQ < 100
                    AND A.USE_PO_TYPE = 1
                GROUP BY A.MATL_CD, A.ORDER_CD
            `),
        )) as Array<{
            matl_cd: string;
            order_cd: string;
            qty_sum: number;
            qty_count: number;
        }>;

        const orderCodes = orderRows.map((r) => String(r.order_cd || ''));

        const phase1Plan: Array<{
            vendorCd: string;
            matlCd: string;
            matlSeq: number;
            prNum: string;
        }> = [];

        let currentVendorCd = '';
        let vendorRank = 0;
        let matlRankWithinVendor = 0;
        for (const row of matlGroups) {
            const vendorCd = String(row.vendor_cd || '');
            if (vendorCd !== currentVendorCd) {
                currentVendorCd = vendorCd;
                vendorRank += 1;
                matlRankWithinVendor = 1;
            } else {
                matlRankWithinVendor += 1;
            }
            phase1Plan.push({
                vendorCd,
                matlCd: String(row.matl_cd || ''),
                matlSeq: Number(row.matl_seq || 0),
                prNum: `${vendorRank}-${matlRankWithinVendor}`,
            });
        }

        const qtyMap = new Map<string, { qtySum: number; qtyCount: number }>();
        for (const r of qtyMatrixRows) {
            qtyMap.set(
                `${String(r.matl_cd || '')}|${String(r.order_cd || '')}`,
                {
                    qtySum: Number(r.qty_sum || 0),
                    qtyCount: Number(r.qty_count || 0),
                },
            );
        }

        for (const planRow of phase1Plan) {
            let totQty = 0;
            let ordCnt = '';

            for (const orderCd of orderCodes) {
                const key = `${planRow.matlCd}|${orderCd}`;
                const item = qtyMap.get(key) || { qtySum: 0, qtyCount: 0 };
                const useQty = Math.round(item.qtySum + 0.4999);
                totQty += useQty;

                if (useQty === 0 && item.qtyCount === 0) {
                    ordCnt += '________';
                } else {
                    ordCnt += String(useQty).padStart(8, '0');
                }
            }

            await this.prisma.$queryRaw(
                Prisma.raw(`
                    INSERT INTO KSV_PO_MATLLIST
                    (
                        PO_CD,
                        VENDOR_CD,
                        PR_NUM,
                        MATL_CD,
                        MATL_SEQ,
                        TOT_CNT,
                        ORD_CNT,
                        REG_USER,
                        REG_DATETIME
                    )
                    VALUES
                    (
                        '${poCdEsc}',
                        '${this.escapeSqlLiteral(planRow.vendorCd)}',
                        '${this.escapeSqlLiteral(planRow.prNum)}',
                        '${this.escapeSqlLiteral(planRow.matlCd)}',
                        ${planRow.matlSeq},
                        ${totQty},
                        '${this.escapeSqlLiteral(ordCnt)}',
                        '${userEsc}',
                        CONVERT(VARCHAR(8), GETDATE(), 112)
                            + SUBSTRING(CONVERT(VARCHAR(8), GETDATE(), 108), 1, 2)
                            + SUBSTRING(CONVERT(VARCHAR(8), GETDATE(), 108), 4, 2)
                            + SUBSTRING(CONVERT(VARCHAR(8), GETDATE(), 108), 7, 2)
                    )
                `),
            );
        }

        await this.prisma.$queryRaw(
            Prisma.raw(`
                UPDATE A
                SET A.STOCK_QTY = B.PO_TO_QTY
                FROM KSV_PO_MATLLIST AS A
                INNER JOIN (
                    SELECT
                        PO_MATL_CD,
                        SUM(PO_QTY) AS PO_TO_QTY
                    FROM KSV_PO_MRP
                    WHERE PO_CD = '${poCdEsc}'
                        AND USE_PO_TYPE = '2'
                        AND DIFF_PO_TYPE <> '2'
                    GROUP BY PO_MATL_CD
                ) AS B ON A.MATL_CD = B.PO_MATL_CD
                WHERE A.PO_CD = '${poCdEsc}'
                    AND LEFT(A.PR_NUM, 1) BETWEEN '1' AND '9'
            `),
        );

        const amRows = (await this.prisma.$queryRaw(
            Prisma.raw(`
                select
                    b.vendor_cd as vendor_cd,
                    a.matl_cd as matl_cd,
                    ${useMatlSeqFromMrp ? 'max(a.matl_seq)' : '1'} as matl_seq,
                    d.vendor_name as vendor_name,
                    b.matl_name as matl_name,
                    b.color as color,
                    b.spec as spec
                from ksv_po_mrp a
                inner join kcd_matl_mst b on a.matl_cd = b.matl_cd
                inner join kcd_vendor d on b.vendor_cd = d.vendor_cd
                where a.po_cd = '${poCdEsc}'
                    and a.po_seq < 100
                    and a.diff_po_type in ('2', '5')
                    and not exists (
                        select 1
                        from ksv_po_matllist z
                        where z.po_cd = '${poCdEsc}'
                            and z.matl_cd = a.matl_cd
                    )
                group by
                    b.vendor_cd,
                    a.matl_cd,
                    d.vendor_name,
                    b.matl_name,
                    b.color,
                    b.spec
                order by
                    d.vendor_name,
                    b.matl_name,
                    b.color,
                    b.spec
            `),
        )) as Array<{
            vendor_cd: string;
            matl_cd: string;
            matl_seq: number;
        }>;

        let amVendorCd = '';
        let amVendorRank = 0;
        let amMatlRank = 0;
        const zeroOrdCnt = ''.padStart(orderCodes.length * 8, '0');
        const amRegDatetime = this.getRegDatetime();

        for (const row of amRows) {
            const vendorCd = String(row.vendor_cd || '');
            if (vendorCd !== amVendorCd) {
                amVendorCd = vendorCd;
                amVendorRank += 1;
                amMatlRank = 1;
            } else {
                amMatlRank += 1;
            }

            await this.prisma.$queryRaw(
                Prisma.raw(`
                    insert into ksv_po_matllist
                    (
                        po_cd,
                        vendor_cd,
                        pr_num,
                        matl_cd,
                        matl_seq,
                        tot_cnt,
                        ord_cnt,
                        stock_qty,
                        reg_user,
                        reg_datetime
                    )
                    values
                    (
                        '${poCdEsc}',
                        '${this.escapeSqlLiteral(vendorCd)}',
                        'AM${amVendorRank}-${amMatlRank}',
                        '${this.escapeSqlLiteral(String(row.matl_cd || ''))}',
                        ${parseInt(String(row.matl_seq || '0'), 10) || 0},
                        '0',
                        '${zeroOrdCnt}',
                        0,
                        '${userEsc}',
                        '${amRegDatetime}'
                    )
                `),
            );
        }

        const shadowRows = (await this.prisma.$queryRaw(
            Prisma.raw(`
                SELECT
                    PR_NUM AS pr_num,
                    MATL_CD AS matl_cd,
                    REMARK AS remark,
                    OTHER_QTY AS other_qty,
                    ERR_QTY AS err_qty,
                    ACT_CON AS act_con,
                    SHORTAGE AS shortage,
                    NEED_CNT AS need_cnt,
                    STOCK_MOVE AS stock_move,
                    REMARK_BVT AS remark_bvt,
                    EXP_DATE AS exp_date,
                    ETD AS etd,
                    ETA AS eta,
                    DELIVERY AS delivery,
                    UPD_USER AS upd_user,
                    UPD_DATETIME AS upd_datetime
                FROM KSV_PO_MATLLIST
                WHERE PO_CD = '${shadowPoCdEsc}'
            `),
        )) as any[];

        const shadowUpdateSqls: string[] = [];
        for (const row of shadowRows) {
            shadowUpdateSqls.push(`
                UPDATE KSV_PO_MATLLIST
                SET REMARK = '${this.escapeSqlLiteral(String(row.remark || ''))}',
                    OTHER_QTY = ${parseInt(String(row.other_qty || '0'), 10) || 0},
                    ERR_QTY = ${parseInt(String(row.err_qty || '0'), 10) || 0},
                    ACT_CON = ${parseInt(String(row.act_con || '0'), 10) || 0},
                    SHORTAGE = ${parseInt(String(row.shortage || '0'), 10) || 0},
                    NEED_CNT = '${this.escapeSqlLiteral(String(row.need_cnt || ''))}',
                    STOCK_MOVE = ${parseInt(String(row.stock_move || '0'), 10) || 0},
                    REMARK_BVT = '${this.escapeSqlLiteral(String(row.remark_bvt || ''))}',
                    EXP_DATE = '${this.escapeSqlLiteral(String(row.exp_date || ''))}',
                    ETD = '${this.escapeSqlLiteral(String(row.etd || ''))}',
                    ETA = '${this.escapeSqlLiteral(String(row.eta || ''))}',
                    DELIVERY = '${this.escapeSqlLiteral(String(row.delivery || ''))}',
                    UPD_USER = '${this.escapeSqlLiteral(String(row.upd_user || ''))}',
                    UPD_DATETIME = '${this.escapeSqlLiteral(String(row.upd_datetime || ''))}'
                WHERE PO_CD = '${poCdEsc}'
                    AND MATL_CD = '${this.escapeSqlLiteral(String(row.matl_cd || ''))}'
                    AND PR_NUM = '${this.escapeSqlLiteral(String(row.pr_num || ''))}'
            `);
        }
        await this.executeSqlsWithConcurrency(shadowUpdateSqls, 10);

        // 기존 행(PR_NUM 기준) 중 재생성되지 않은 항목은 shadow에서 원복합니다.
        await this.prisma.$queryRaw(
            Prisma.raw(`
                update a
                set a.po_cd = '${poCdEsc}'
                from ksv_po_matllist a
                where a.po_cd = '${shadowPoCdEsc}'
                and not exists (
                    select 1
                    from ksv_po_matllist b
                    where b.po_cd = '${poCdEsc}'
                    and b.matl_cd = a.matl_cd
                    and b.pr_num = a.pr_num
                )
            `),
        );

        await this.prisma.$queryRaw(
            Prisma.raw(`
                DELETE FROM KSV_PO_MATLLIST
                WHERE PO_CD = '${shadowPoCdEsc}'
            `),
        );

        return { ok: true, step: stepName };
    }

    private getRegDatetime(): string {
        const d = new Date();
        const yyyy = String(d.getFullYear());
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        const hh = String(d.getHours()).padStart(2, '0');
        const mi = String(d.getMinutes()).padStart(2, '0');
        const ss = String(d.getSeconds()).padStart(2, '0');
        return `${yyyy}${mm}${dd}${hh}${mi}${ss}`;
    }

    private escapeSqlLiteral(v: string): string {
        return String(v || '').replace(/'/g, "''");
    }

    private escapeLikeBracket(v: string): string {
        return String(v || '')
            .replace(/\[/g, '[[')
            .replace(/'/g, "''");
    }

    private async getSizeSeq(
        sizeGroup: string,
        sizeVal: string,
    ): Promise<number> {
        const key = `${sizeGroup}||${sizeVal}`;
        if (typeof this.sizeSeqCache[key] !== 'undefined') {
            return this.sizeSeqCache[key];
        }

        const sizeGroupEsc = this.escapeSqlLiteral(sizeGroup);
        const sizeValEsc = this.escapeSqlLiteral(sizeVal);

        const sql = `
            select
                size_seq
            from
                kcd_size_mem
            where
                size_group = '${sizeGroupEsc}'
                and size_val = '${sizeValEsc}'
        `;

        const ret = (await this.prisma.$queryRaw(Prisma.raw(sql))) as any[];
        const seq =
            ret.length > 0
                ? parseInt(String(ret[0].size_seq || '0'), 10) || 0
                : 0;
        this.sizeSeqCache[key] = seq;
        return seq;
    }

    private async getSizeRates(
        sizeGroup: string,
    ): Promise<Array<{ size_seq: number; unit_rate: number }>> {
        if (this.sizeRateCache[sizeGroup]) {
            return this.sizeRateCache[sizeGroup];
        }

        const sgLikeEsc = this.escapeLikeBracket(sizeGroup);
        const sql = `
            select
                size_seq,
                unit_rate
            from
                kcd_size_mem
            where
                size_group like '${sgLikeEsc}' escape '['
            order by
                size_seq
        `;

        const ret = (await this.prisma.$queryRaw(Prisma.raw(sql))) as any[];
        const rows = ret.map((r) => ({
            size_seq: parseInt(String(r.size_seq || '0'), 10) || 0,
            unit_rate: parseFloat(String(r.unit_rate || '1')) || 1,
        }));
        this.sizeRateCache[sizeGroup] = rows;
        return rows;
    }

    private containsNatCode(country: string, natCd: string): boolean {
        return country.toLowerCase().indexOf(natCd.toLowerCase()) >= 0;
    }
}
