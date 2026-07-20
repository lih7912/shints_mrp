/**
 * Diagnose adjust parity mismatch: show actual legacy vs migrated values at differing rows.
 * Usage: npx ts-node work/diagAdjustDiff.ts --poCd EO26-0014 --userId lih7912
 */

import { PrismaClient, Prisma } from '@prisma/client';
import { MrpProcedurePrismaRepository } from '../src/mrp/repositories/mrpProcedure.repository';
import { MrpProcedureService } from '../src/mrp/services/mrpProcedure.service';

function escapeSqlLiteral(s: string): string {
    return s.replace(/'/g, "''");
}

function parseArgs(argv: string[]): { poCd: string; userId: string } {
    const args = argv.slice(2);
    let poCd = '';
    let userId = '';
    for (let i = 0; i < args.length; i++) {
        if (args[i] === '--poCd') poCd = args[i + 1] ?? '';
        if (args[i] === '--userId') userId = args[i + 1] ?? '';
    }
    if (!poCd || !userId) {
        console.error('Usage: npx ts-node work/diagAdjustDiff.ts --poCd <poCd> --userId <userId>');
        process.exit(1);
    }
    return { poCd, userId };
}

async function readAdjustRows(prisma: PrismaClient, poCd: string): Promise<any[]> {
    const poCdEsc = escapeSqlLiteral(poCd);
    const rows = (await prisma.$queryRaw(
        Prisma.raw(`
            select *
            from ksv_po_matllist
            where po_cd = '${poCdEsc}'
            order by pr_num, vendor_cd, matl_cd, matl_seq
        `),
    )) as any[];
    // normalize: remove REG_DATETIME
    return rows.map((r) => {
        const { REG_DATETIME, ...rest } = r;
        void REG_DATETIME;
        return rest;
    });
}

async function backupTable(prisma: PrismaClient, poCd: string): Promise<any[]> {
    const poCdEsc = escapeSqlLiteral(poCd);
    return (await prisma.$queryRaw(
        Prisma.raw(`select * from ksv_po_matllist where po_cd = '${poCdEsc}'`),
    )) as any[];
}

async function restoreTable(prisma: PrismaClient, poCd: string, rows: any[]): Promise<void> {
    const poCdEsc = escapeSqlLiteral(poCd);
    await prisma.$queryRaw(Prisma.raw(`delete from ksv_po_matllist where po_cd = '${poCdEsc}'`));
    if (rows.length === 0) return;

    function toVal(v: any): string {
        if (v === null || v === undefined) return 'null';
        if (typeof v === 'number') return Number.isFinite(v) ? String(v) : 'null';
        if (typeof v === 'bigint') return String(v);
        if (typeof v === 'boolean') return v ? '1' : '0';
        if (v instanceof Date) return `'${v.toISOString().replace('T', ' ').replace('Z', '')}'`;
        return `'${String(v).replace(/'/g, "''")}'`;
    }

    const cols = Object.keys(rows[0]);
    const colList = cols.join(',');
    for (const row of rows) {
        const vals = cols.map((c) => toVal(row[c])).join(',');
        await prisma.$queryRaw(
            Prisma.raw(`insert into ksv_po_matllist (${colList}) values (${vals})`),
        );
    }
}

async function main(): Promise<void> {
    const { poCd, userId } = parseArgs(process.argv);
    const prisma = new PrismaClient();

    try {
        // 1) Run legacy stored proc and capture rows
        const backup = await backupTable(prisma, poCd);
        console.log(`backup rows: ${backup.length}`);

        await prisma.$queryRawUnsafe(`exec kspPoMatlListAdjust @P1, @P2`, poCd, userId);
        const legacyRows = await readAdjustRows(prisma, poCd);
        console.log(`legacy rows: ${legacyRows.length}`);

        // Restore
        await restoreTable(prisma, poCd, backup);
        console.log('restored');

        // 2) Run migrated service and capture rows
        const repo = new MrpProcedurePrismaRepository(prisma as any);
        const svc = new MrpProcedureService(repo);
        const r = await svc.run('adjust', { poCd, userId });
        if (!r.ok) throw new Error(r.message || r.step);
        const migratedRows = await readAdjustRows(prisma, poCd);
        console.log(`migrated rows: ${migratedRows.length}`);

        // Restore again
        await restoreTable(prisma, poCd, backup);
        console.log('restored (2)');

        // 3) Compare all rows, show diffs
        const len = Math.max(legacyRows.length, migratedRows.length);
        let diffCount = 0;
        for (let i = 0; i < len; i++) {
            const la = legacyRows[i];
            const mi = migratedRows[i];
            if (!la) { console.log(`row ${i+1}: MISSING in legacy`); diffCount++; continue; }
            if (!mi) { console.log(`row ${i+1}: MISSING in migrated`); diffCount++; continue; }

            const keys = Array.from(new Set([...Object.keys(la), ...Object.keys(mi)])).sort();
            const diffCols: string[] = [];
            for (const k of keys) {
                if (JSON.stringify(la[k]) !== JSON.stringify(mi[k])) {
                    diffCols.push(k);
                }
            }
            if (diffCols.length > 0) {
                diffCount++;
                console.log(`\n--- row ${i+1} diff (MATL_CD=${la.MATL_CD ?? la.matl_cd}, MATL_SEQ=${la.MATL_SEQ ?? la.matl_seq}) ---`);
                for (const k of diffCols) {
                    console.log(`  ${k}: legacy=${JSON.stringify(la[k])}  migrated=${JSON.stringify(mi[k])}`);
                }
            }
        }

        if (diffCount === 0) {
            console.log('All rows match!');
        } else {
            console.log(`\nTotal differing rows: ${diffCount}`);
        }
    } finally {
        await prisma.$disconnect();
    }
}

main().catch((err) => {
    console.error('diagAdjustDiff failed:', err?.message || err);
    process.exit(2);
});
