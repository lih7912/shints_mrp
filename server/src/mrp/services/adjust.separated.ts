import {
    AdjustNoSeqPhase1OrdCntRow,
    AdjustNoSeqPhase1PlanRow,
    AdjustNoSeqMatlGroupRow,
    AdjustNoSeqQtyMatrixRow,
    MrpProcInput,
    MrpProcRepository,
    MrpProcStepResult,
} from '../types';

export type AdjustPreparedContext = {
    orderCodes: string[];
    matlGroups: AdjustNoSeqMatlGroupRow[];
    vendorGroupCount: number;
};

export type AdjustStep2Context = AdjustPreparedContext & {
    phase1Plan: AdjustNoSeqPhase1PlanRow[];
};

export type AdjustStep4Context = AdjustStep2Context & {
    phase1OrdCntRows: AdjustNoSeqPhase1OrdCntRow[];
};

export type AdjustStep6InsertRow = {
    poCd: string;
    vendorCd: string;
    prNum: string;
    matlCd: string;
    matlSeq: number;
    totCnt: number;
    ordCnt: string;
    regUser: string;
};

export type AdjustStep6Context = AdjustStep4Context & {
    phase1InsertRows: AdjustStep6InsertRow[];
};

export class AdjustSeparatedService {
    constructor(private readonly repository: MrpProcRepository) {}

    private buildPhase1InsertRows(
        input: MrpProcInput,
        step4: AdjustStep4Context,
    ): AdjustStep6InsertRow[] {
        const matlGroupByPrNum = new Map(
            step4.phase1Plan.map((g) => [g.prNum, g] as const),
        );

        return step4.phase1OrdCntRows.map((row) => {
            const matlGroup = matlGroupByPrNum.get(row.prNum);
            return {
                poCd: input.poCd,
                vendorCd: matlGroup?.vendorCd || '',
                prNum: row.prNum,
                matlCd: row.matlCd,
                matlSeq: Number(matlGroup?.matlSeq || 0),
                totCnt: Number(row.totQty || 0),
                ordCnt: row.ordCnt,
                regUser: input.userId,
            };
        });
    }

    private buildPhase1Plan(
        matlGroups: AdjustNoSeqMatlGroupRow[],
    ): AdjustNoSeqPhase1PlanRow[] {
        const out: AdjustNoSeqPhase1PlanRow[] = [];

        let currentVendorCd = '';
        let vendorRank = 0;
        let matlRankWithinVendor = 0;

        for (const row of matlGroups) {
            if (row.vendorCd !== currentVendorCd) {
                currentVendorCd = row.vendorCd;
                vendorRank += 1;
                matlRankWithinVendor = 1;
            } else {
                matlRankWithinVendor += 1;
            }

            out.push({
                vendorCd: row.vendorCd,
                matlCd: row.matlCd,
                matlSeq: row.matlSeq,
                prNum: `${vendorRank}-${matlRankWithinVendor}`,
                vendorRank,
                matlRankWithinVendor,
            });
        }

        return out;
    }

    private formatUseQty(qty: number, qtyCount: number): string {
        const n = Math.round(qty + 0.4999);
        if (n === 0 && qtyCount === 0) return '________';
        return String(n).padStart(8, '0');
    }

    private buildPhase1OrdCntRows(
        step2: AdjustStep2Context,
        qtyMatrixRows: AdjustNoSeqQtyMatrixRow[],
    ): AdjustNoSeqPhase1OrdCntRow[] {
        const qtyMap = new Map<string, { qtySum: number; qtyCount: number }>();
        for (const r of qtyMatrixRows) {
            qtyMap.set(`${r.matlCd}|${r.orderCd}`, {
                qtySum: Number(r.qtySum || 0),
                qtyCount: Number(r.qtyCount || 0),
            });
        }

        return step2.phase1Plan.map((planRow) => {
            let totQty = 0;
            let ordCnt = '';

            for (const orderCd of step2.orderCodes) {
                const key = `${planRow.matlCd}|${orderCd}`;
                const item = qtyMap.get(key) || { qtySum: 0, qtyCount: 0 };
                const useQty = Math.round(item.qtySum + 0.4999);
                totQty += useQty;
                ordCnt += this.formatUseQty(item.qtySum, item.qtyCount);
            }

            return {
                matlCd: planRow.matlCd,
                prNum: planRow.prNum,
                ordCnt,
                totQty,
            };
        });
    }

    async prepare(input: MrpProcInput): Promise<AdjustPreparedContext> {
        const orderRows = await this.repository.listAdjustNoSeqOrderCodes(
            input.poCd,
        );
        const matlGroups = await this.repository.listAdjustMatlGroups(
            input.poCd,
        );

        const orderCodes = orderRows.map((r) => r.orderCd);
        const vendorSet = new Set(matlGroups.map((g) => g.vendorCd));

        return {
            orderCodes,
            matlGroups,
            vendorGroupCount: vendorSet.size,
        };
    }

    async prepareReadOnlyStep6(
        input: MrpProcInput,
    ): Promise<AdjustStep6Context> {
        const prepared = await this.prepare(input);
        const phase1Plan = this.buildPhase1Plan(prepared.matlGroups);
        const qtyMatrixRows =
            await this.repository.listAdjustNoSeqPhase1QtyMatrix(input.poCd);
        const phase1OrdCntRows = this.buildPhase1OrdCntRows(
            {
                ...prepared,
                phase1Plan,
            },
            qtyMatrixRows,
        );

        return {
            ...prepared,
            phase1Plan,
            phase1OrdCntRows,
            phase1InsertRows: this.buildPhase1InsertRows(input, {
                ...prepared,
                phase1Plan,
                phase1OrdCntRows,
            }),
        };
    }

    async runLegacyThenApplyStep9(
        input: MrpProcInput,
    ): Promise<MrpProcStepResult> {
        const step6 = await this.prepareReadOnlyStep6(input);
        const result = await this.repository.runAdjust(input);
        await this.repository.applyAdjustNoSeqPhase1PayloadRowsToResult(
            input,
            step6.phase1InsertRows,
        );
        return result;
    }

    async runLogicOnlyStep10(input: MrpProcInput): Promise<MrpProcStepResult> {
        await this.repository.moveAdjustNoSeqWorkingRows(input);
        const step6 = await this.prepareReadOnlyStep6(input);

        await this.repository.insertAdjustNoSeqPhase1ResultRows(
            input,
            step6.phase1InsertRows,
        );
        await this.repository.syncAdjustNoSeqStockQtyFromMrp(input);
        await this.repository.mergeAdjustNoSeqShadowFields(input);
        await this.repository.deleteAdjustNoSeqShadowRows(input);

        return { ok: true, step: 'kspPoMatlListAdjust' };
    }

    async runLegacyWithPreparedSteps(
        input: MrpProcInput,
    ): Promise<MrpProcStepResult> {
        if (process.env.MRP_USE_SEPARATED_ADJUST_WRITE_STEP10 === '1') {
            return this.runLogicOnlyStep10(input);
        }

        if (process.env.MRP_USE_SEPARATED_ADJUST_WRITE_STEP9 === '1') {
            return this.runLegacyThenApplyStep9(input);
        }

        return this.runLogicOnlyStep10(input);
    }
}
