import { Prisma, PrismaClient } from '@prisma/client';
import { MrpProcedurePrismaRepository } from '../src/mrp/repositories/mrpProcedure.repository';
import { MrpProcedureService } from '../src/mrp/services/mrpProcedure.service';
import { MrpProcedureMigration } from '../src/mrpProcedureMigration';

type VerifyTarget =
    | 'recalc'
    | 'redetail'
    | 'adjust-noseq'
    | 'adjust'
    | 'matllist-sample'
    | 'matllist-stock'
    | 'mrplist-adjust'
    | 'pomrp'
    | 'pomrpnet'
    | 'matllist-main'
    | 'mrplist'
    | 'all';

type Snapshot = {
    rows: any[];
    hash: string;
    count: number;
};

type MethodResult = {
    method: Exclude<VerifyTarget, 'all'>;
    same: boolean;
    legacy: Snapshot;
    migrated: Snapshot;
};

type BackupItem = {
    table: string;
    whereSql: string;
    rows: any[];
};

type IdentityInfo = {
    table: string;
    column: string;
};

function parseArgs(argv: string[]): {
    poCd: string;
    userId: string;
    target: VerifyTarget;
} {
    const argMap: Record<string, string> = {};
    for (let i = 2; i < argv.length; i += 1) {
        const k = argv[i];
        if (!k.startsWith('--')) continue;
        const v = argv[i + 1];
        if (!v || v.startsWith('--')) continue;
        argMap[k.slice(2)] = v;
    }

    const poCd = argMap.poCd || argMap.po || '';
    const userId = argMap.userId || argMap.user || '';
    const target = (argMap.target || 'all') as VerifyTarget;

    if (!poCd) throw new Error('Missing --poCd');
    if (!userId) throw new Error('Missing --userId');
    if (
        ![
            'recalc',
            'redetail',
            'adjust-noseq',
            'adjust',
            'matllist-sample',
            'matllist-stock',
            'mrplist-adjust',
            'pomrp',
            'pomrpnet',
            'matllist-main',
            'mrplist',
            'all',
        ].includes(target)
    ) {
        throw new Error(
            'Invalid --target. Use recalc|redetail|adjust-noseq|adjust|matllist-sample|matllist-stock|mrplist-adjust|pomrp|pomrpnet|matllist-main|mrplist|all',
        );
    }

    return { poCd, userId, target };
}

function escapeSqlLiteral(v: string): string {
    return String(v || '').replace(/'/g, "''");
}

function stableObject(value: any): any {
    if (value === null || typeof value === 'undefined') return value;

    if (value instanceof Date) return value.toISOString();
    if (Array.isArray(value)) return value.map((x) => stableObject(x));
    if (typeof value === 'bigint') return value.toString();

    if (typeof value === 'object') {
        const keys = Object.keys(value).sort();
        const out: Record<string, any> = {};
        for (const k of keys) out[k] = stableObject(value[k]);
        return out;
    }

    return value;
}

function hashString(s: string): string {
    let h = 2166136261;
    for (let i = 0; i < s.length; i += 1) {
        h ^= s.charCodeAt(i);
        h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
    }
    return (h >>> 0).toString(16).padStart(8, '0');
}

function snapshotRows(rows: any[]): Snapshot {
    const normalized = stableObject(rows);
    const json = JSON.stringify(normalized);
    return {
        rows,
        hash: hashString(json),
        count: rows.length,
    };
}

function firstDiff(legacyRows: any[], migratedRows: any[]): string {
    const a = stableObject(legacyRows) as any[];
    const b = stableObject(migratedRows) as any[];

    const len = Math.min(a.length, b.length);
    for (let i = 0; i < len; i += 1) {
        const sa = JSON.stringify(a[i]);
        const sb = JSON.stringify(b[i]);
        if (sa !== sb) {
            const keys = Array.from(
                new Set([
                    ...Object.keys(a[i] || {}),
                    ...Object.keys(b[i] || {}),
                ]),
            ).sort();
            const diffCols: string[] = [];
            for (const k of keys) {
                if (
                    JSON.stringify((a[i] || {})[k]) !==
                    JSON.stringify((b[i] || {})[k])
                ) {
                    diffCols.push(k);
                }
            }
            return `row=${i + 1} diffCols=${diffCols.slice(0, 12).join(',')}`;
        }
    }

    if (a.length !== b.length) {
        return `rowCountMismatch legacy=${a.length} migrated=${b.length}`;
    }

    return 'no-diff';
}

function toSqlLiteral(v: any): string {
    if (v === null || typeof v === 'undefined') return 'null';
    if (typeof v === 'number') return Number.isFinite(v) ? String(v) : 'null';
    if (typeof v === 'bigint') return String(v);
    if (typeof v === 'boolean') return v ? '1' : '0';
    if (v instanceof Date)
        return `'${v.toISOString().replace('T', ' ').replace('Z', '')}'`;
    return `'${escapeSqlLiteral(String(v))}'`;
}

async function readRowsByWhere(
    prisma: PrismaClient,
    table: string,
    whereSql: string,
): Promise<any[]> {
    return (await prisma.$queryRaw(
        Prisma.raw(`
            select *
            from ${table}
            where ${whereSql}
        `),
    )) as any[];
}

async function restoreTableRows(
    prisma: PrismaClient,
    table: string,
    whereSql: string,
    rows: any[],
): Promise<void> {
    await prisma.$queryRaw(
        Prisma.raw(`
            delete from ${table}
            where ${whereSql}
        `),
    );

    if (rows.length === 0) return;

    const columns = Object.keys(rows[0]);
    const colSql = columns.map((c) => `[${c}]`).join(', ');

    const chunkSize = 100;
    for (let i = 0; i < rows.length; i += chunkSize) {
        const chunk = rows.slice(i, i + chunkSize);
        const valuesSql = chunk
            .map(
                (r) => `(${columns.map((c) => toSqlLiteral(r[c])).join(', ')})`,
            )
            .join(',\n');

        try {
            await prisma.$queryRaw(
                Prisma.raw(`
                    insert into ${table} (${colSql})
                    values
                    ${valuesSql}
                `),
            );
        } catch (error: any) {
            throw new Error(
                `restoreTableRows failed table=${table} chunkStart=${i} chunkSize=${chunk.length} columns=${columns.length} message=${error?.message || 'unknown error'}`,
            );
        }
    }
}

function backupSpec(
    method: Exclude<VerifyTarget, 'all'>,
    poCd: string,
    userId: string,
): Array<{ table: string; whereSql: string }> {
    const poCdEsc = escapeSqlLiteral(poCd);
    const userEsc = escapeSqlLiteral(userId);

    if (method === 'recalc') {
        return [
            {
                table: 'ksv_po_mrptempre',
                whereSql: `user_id = '${userEsc}' and po_cd = '${poCdEsc}'`,
            },
        ];
    }

    if (method === 'redetail') {
        return [
            {
                table: 'ksv_po_mrptempre_detail',
                whereSql: `user_id = '${userEsc}' and po_cd = '${poCdEsc}'`,
            },
        ];
    }

    if (method === 'mrplist-adjust') {
        return [
            {
                table: 'ksv_po_mrplist',
                whereSql: `po_cd = '${poCdEsc}'`,
            },
        ];
    }

    if (method === 'pomrp') {
        return [
            {
                table: 'ksv_po_mrp',
                whereSql: `po_cd = '${poCdEsc}' and po_seq = 1`,
            },
        ];
    }

    if (method === 'pomrpnet') {
        return [
            {
                table: 'ksv_po_mrpnet',
                whereSql: `po_cd = '${poCdEsc}'`,
            },
        ];
    }

    if (method === 'matllist-main') {
        return [
            {
                table: 'ksv_po_matllist',
                whereSql: `po_cd = '${poCdEsc}'`,
            },
        ];
    }

    if (method === 'mrplist') {
        return [
            {
                table: 'ksv_po_mrplist',
                whereSql: `po_cd = '${poCdEsc}'`,
            },
        ];
    }

    if (method === 'matllist-stock') {
        return [
            {
                table: 'ksv_po_matllist',
                whereSql: `po_cd = '${poCdEsc}'`,
            },
        ];
    }

    const shadowPoCdEsc = escapeSqlLiteral(`${poCd}${userId}`);
    return [
        {
            table: 'ksv_po_matllist',
            whereSql: `po_cd in ('${poCdEsc}', '${shadowPoCdEsc}')`,
        },
    ];
}

async function backupRows(
    prisma: PrismaClient,
    method: Exclude<VerifyTarget, 'all'>,
    poCd: string,
    userId: string,
): Promise<BackupItem[]> {
    const spec = backupSpec(method, poCd, userId);
    const out: BackupItem[] = [];

    for (const s of spec) {
        const rows = await readRowsByWhere(prisma, s.table, s.whereSql);
        out.push({ table: s.table, whereSql: s.whereSql, rows });
    }

    return out;
}

async function restoreRows(
    prisma: PrismaClient,
    backups: BackupItem[],
): Promise<void> {
    for (const b of backups) {
        await restoreTableRows(prisma, b.table, b.whereSql, b.rows);
    }
}

async function getIdentityColumn(
    prisma: PrismaClient,
    table: string,
): Promise<string | null> {
    const rows = (await prisma.$queryRaw(
        Prisma.raw(`
            select top 1 c.name as column_name
            from sys.identity_columns ic
            inner join sys.columns c
                on c.object_id = ic.object_id
                and c.column_id = ic.column_id
            where ic.object_id = object_id('${table}')
        `),
    )) as Array<{ column_name: string }>;

    if (!rows.length) return null;
    return rows[0].column_name;
}

async function getIdentityInfos(
    prisma: PrismaClient,
    tables: string[],
): Promise<IdentityInfo[]> {
    const uniq = Array.from(new Set(tables));
    const out: IdentityInfo[] = [];

    for (const table of uniq) {
        const column = await getIdentityColumn(prisma, table);
        if (column) out.push({ table, column });
    }

    return out;
}

async function reseedIdentityTable(
    prisma: PrismaClient,
    info: IdentityInfo,
): Promise<void> {
    const maxRows = (await prisma.$queryRaw(
        Prisma.raw(`
            select isnull(max([${info.column}]), 0) as max_id
            from ${info.table}
        `),
    )) as Array<{ max_id: any }>;

    const maxId = Number(maxRows[0]?.max_id ?? 0);
    await prisma.$queryRaw(
        Prisma.raw(
            `dbcc checkident ('${info.table}', reseed, ${Number.isFinite(maxId) ? maxId : 0})`,
        ),
    );
}

async function reseedIdentityTables(
    prisma: PrismaClient,
    infos: IdentityInfo[],
): Promise<void> {
    for (const info of infos) {
        await reseedIdentityTable(prisma, info);
    }
}

async function readTargetRows(
    prisma: PrismaClient,
    method: Exclude<VerifyTarget, 'all'>,
    poCd: string,
    userId: string,
): Promise<any[]> {
    const poCdEsc = escapeSqlLiteral(poCd);
    const userEsc = escapeSqlLiteral(userId);

    if (method === 'recalc') {
        return (await prisma.$queryRaw(
            Prisma.raw(`
                select *
                from ksv_po_mrptempre
                where user_id = '${userEsc}'
                and po_cd = '${poCdEsc}'
                order by seq, order_cd, matl_cd, mrp_seq
            `),
        )) as any[];
    }

    if (method === 'redetail') {
        return (await prisma.$queryRaw(
            Prisma.raw(`
                select *
                from ksv_po_mrptempre_detail
                where user_id = '${userEsc}'
                and po_cd = '${poCdEsc}'
                order by seq, order_cd, matl_cd, mrp_seq, diff_re_type, org_po_seq
            `),
        )) as any[];
    }

    if (method === 'mrplist-adjust') {
        return (await prisma.$queryRaw(
            Prisma.raw(`
                select *
                from ksv_po_mrplist
                where po_cd = '${poCdEsc}'
                order by order_cd, prod_cd, add_flag, matl_cd, matl_seq, prod_seq, use_size, ord_cnt, net_qty, use_qty
            `),
        )) as any[];
    }

    if (method === 'pomrp') {
        return (await prisma.$queryRaw(
            Prisma.raw(`
                select *
                from ksv_po_mrp
                where po_cd = '${poCdEsc}'
                and po_seq = 1
                order by order_cd, matl_cd, mrp_seq
            `),
        )) as any[];
    }

    if (method === 'pomrpnet') {
        return (await prisma.$queryRaw(
            Prisma.raw(`
                select *
                from ksv_po_mrpnet
                where po_cd = '${poCdEsc}'
                order by order_cd, prod_cd, add_flag, matl_cd, matl_seq, prod_seq, use_size
            `),
        )) as any[];
    }

    if (method === 'matllist-main' || method === 'matllist-stock') {
        return (await prisma.$queryRaw(
            Prisma.raw(`
                select *
                from ksv_po_matllist
                where po_cd = '${poCdEsc}'
                order by pr_num, vendor_cd, matl_cd, matl_seq
            `),
        )) as any[];
    }

    if (method === 'mrplist') {
        return (await prisma.$queryRaw(
            Prisma.raw(`
                select *
                from ksv_po_mrplist
                where po_cd = '${poCdEsc}'
                order by order_cd, prod_cd, add_flag, matl_cd, matl_seq, prod_seq, use_size, ord_cnt, net_qty, use_qty
            `),
        )) as any[];
    }

    return (await prisma.$queryRaw(
        Prisma.raw(`
            select *
            from ksv_po_matllist
            where po_cd = '${poCdEsc}'
            order by pr_num, vendor_cd, matl_cd, matl_seq
        `),
    )) as any[];
}

function normalizeRowsForMethod(
    method: Exclude<VerifyTarget, 'all'>,
    rows: any[],
): any[] {
    if (
        method !== 'adjust' &&
        method !== 'adjust-noseq' &&
        method !== 'matllist-sample' &&
        method !== 'mrplist-adjust' &&
        method !== 'pomrp' &&
        method !== 'pomrpnet' &&
        method !== 'matllist-main' &&
        method !== 'mrplist'
    ) {
        return rows;
    }

    return rows.map((r) => {
        if (!r || typeof r !== 'object') return r;
        const { REG_DATETIME, id, ...rest } = r;
        if (method === 'pomrpnet') return rest;
        void id;
        return rest;
    });
}

async function runWithBackup(
    prisma: PrismaClient,
    method: Exclude<VerifyTarget, 'all'>,
    poCd: string,
    userId: string,
    runner: () => Promise<void>,
): Promise<Snapshot> {
    const backups = await backupRows(prisma, method, poCd, userId);
    const identityInfos = await getIdentityInfos(
        prisma,
        backups.map((b) => b.table),
    );

    let phase = 'setup';
    try {
        phase = 'reseed-before-run';
        await reseedIdentityTables(prisma, identityInfos);
        phase = 'runner';
        await runner();
        phase = 'read-target-rows';
        const rows = await readTargetRows(prisma, method, poCd, userId);
        return snapshotRows(normalizeRowsForMethod(method, rows));
    } catch (error: any) {
        throw new Error(
            `method=${method} phase=${phase} message=${error?.message || 'unknown error'}`,
        );
    } finally {
        try {
            phase = 'restore-rows';
            await restoreRows(prisma, backups);
            phase = 'reseed-after-restore';
            await reseedIdentityTables(prisma, identityInfos);
        } catch (error: any) {
            throw new Error(
                `method=${method} phase=${phase} message=${error?.message || 'unknown error'}`,
            );
        }
    }
}

async function runLegacy(
    prisma: PrismaClient,
    method: Exclude<VerifyTarget, 'all'>,
    poCd: string,
    userId: string,
): Promise<Snapshot> {
    const procMap: Record<Exclude<VerifyTarget, 'all'>, string> = {
        recalc: 'kspPoMrpReCalc',
        redetail: 'kspPoMrpReDetail',
        'adjust-noseq': 'kspPoMatlListAdjustNoSeq',
        adjust: 'kspPoMatlListAdjust',
        'matllist-sample': 'kspPoMatlListSample',
        'matllist-stock': 'kspPoMatlListStock',
        'mrplist-adjust': 'kspPoMrpListAdjust',
        pomrp: 'kspPoMrp',
        pomrpnet: 'kspPoMrpNet',
        'matllist-main': 'kspPoMatlListMain',
        mrplist: 'kspPoMrpList',
    };

    return runWithBackup(prisma, method, poCd, userId, async () => {
        await prisma.$queryRawUnsafe(
            `exec ${procMap[method]} @P1, @P2`,
            poCd,
            userId,
        );
    });
}

async function runMigrated(
    prisma: PrismaClient,
    method: Exclude<VerifyTarget, 'all'>,
    poCd: string,
    userId: string,
): Promise<Snapshot> {
    return runWithBackup(prisma, method, poCd, userId, async () => {
        const repo = new MrpProcedurePrismaRepository(prisma as any);
        const svc = new MrpProcedureService(repo);
        const migration = new MrpProcedureMigration(prisma as any);

        if (method === 'recalc') {
            const r = await svc.run('recalc', { poCd, userId });
            if (!r.ok) throw new Error(r.message || r.step);
        } else if (method === 'redetail') {
            const r = await svc.run('redetail', { poCd, userId });
            if (!r.ok) throw new Error(r.message || r.step);
        } else if (method === 'adjust-noseq') {
            const r = await svc.run('adjust-noseq', { poCd, userId });
            if (!r.ok) throw new Error(r.message || r.step);
        } else if (method === 'adjust') {
            const r = await svc.run('adjust', { poCd, userId });
            if (!r.ok) throw new Error(r.message || r.step);
        } else if (method === 'matllist-sample') {
            const r = await migration.runPoMatlListSample({ poCd, userId });
            if (!r.ok) throw new Error(r.message || r.step);
        } else if (method === 'matllist-stock') {
            const r = await migration.runPoMatlListStock({ poCd, userId });
            if (!r.ok) throw new Error(r.message || r.step);
        } else if (method === 'mrplist-adjust') {
            const r = await migration.runPoMrpListAdjust({ poCd, userId });
            if (!r.ok) throw new Error(r.message || r.step);
        } else if (method === 'pomrp') {
            const r = await migration.runPoMrp({ poCd, userId });
            if (!r.ok) throw new Error(r.message || r.step);
        } else if (method === 'pomrpnet') {
            const r = await migration.runPoMrpNet({ poCd, userId });
            if (!r.ok) throw new Error(r.message || r.step);
        } else if (method === 'matllist-main') {
            const r = await migration.runPoMatlListMain({ poCd, userId });
            if (!r.ok) throw new Error(r.message || r.step);
        } else if (method === 'mrplist') {
            const r = await migration.runPoMrpList({ poCd, userId });
            if (!r.ok) throw new Error(r.message || r.step);
        }
    });
}

async function verifyOne(
    prisma: PrismaClient,
    method: Exclude<VerifyTarget, 'all'>,
    poCd: string,
    userId: string,
): Promise<MethodResult> {
    const legacy = await runLegacy(prisma, method, poCd, userId);
    const migrated = await runMigrated(prisma, method, poCd, userId);

    return {
        method,
        same: legacy.hash === migrated.hash && legacy.count === migrated.count,
        legacy,
        migrated,
    };
}

async function main(): Promise<void> {
    const { poCd, userId, target } = parseArgs(process.argv);
    const prisma = new PrismaClient();

    const methods: Array<Exclude<VerifyTarget, 'all'>> =
        target === 'all'
            ? [
                  'recalc',
                  'redetail',
                  'adjust-noseq',
                  'adjust',
                  'matllist-sample',
                  'matllist-stock',
                  'mrplist-adjust',
                                    'pomrp',
                                    'pomrpnet',
                                    'matllist-main',
                                    'mrplist',
              ]
            : [target];

    const results: MethodResult[] = [];

    try {
        for (const method of methods) {
            const one = await verifyOne(prisma, method, poCd, userId);
            results.push(one);
        }
    } finally {
        await prisma.$disconnect();
    }

    let allSame = true;
    for (const r of results) {
        if (!r.same) allSame = false;
        console.log(
            [
                `method=${r.method}`,
                `same=${r.same}`,
                `legacyCount=${r.legacy.count}`,
                `migratedCount=${r.migrated.count}`,
                `legacyHash=${r.legacy.hash}`,
                `migratedHash=${r.migrated.hash}`,
                `detail=${r.same ? 'matched' : firstDiff(r.legacy.rows, r.migrated.rows)}`,
            ].join(' '),
        );
    }

    if (!allSame) {
        process.exitCode = 1;
    }
}

main().catch((err) => {
    console.error('verifyMrpExecParity failed:', err?.message || err);
    process.exit(2);
});
