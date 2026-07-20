import {
    AdjustNoSeqPhase1OrdCntRow,
    AdjustNoSeqPhase1PlanRow,
    AdjustNoSeqMatlGroupRow,
    AdjustNoSeqQtyMatrixRow,
    MrpProcInput,
    MrpProcRepository,
    MrpProcStepResult,
} from '../types';

export type AdjustNoSeqPreparedContext = {
    orderCodes: string[];
    matlGroups: AdjustNoSeqMatlGroupRow[];
    vendorGroupCount: number;
};

export type AdjustNoSeqStep2Context = AdjustNoSeqPreparedContext & {
    phase1Plan: AdjustNoSeqPhase1PlanRow[];
};

export type AdjustNoSeqStep4Context = AdjustNoSeqStep2Context & {
    phase1OrdCntRows: AdjustNoSeqPhase1OrdCntRow[];
};

export type AdjustNoSeqStep6InsertRow = {
    poCd: string;
    vendorCd: string;
    prNum: string;
    matlCd: string;
    matlSeq: number;
    totCnt: number;
    ordCnt: string;
    regUser: string;
};

export type AdjustNoSeqStep6Context = AdjustNoSeqStep4Context & {
    phase1InsertRows: AdjustNoSeqStep6InsertRow[];
};

export class AdjustNoSeqSeparatedService {
    constructor(private readonly repository: MrpProcRepository) {}

    private buildPhase1InsertRows(
        input: MrpProcInput,
        step4: AdjustNoSeqStep4Context,
    ): AdjustNoSeqStep6InsertRow[] {
        const matlGroupByMatlCd = new Map(
            step4.matlGroups.map((g) => [g.matlCd, g] as const),
        );

        return step4.phase1OrdCntRows.map((row) => {
            const matlGroup = matlGroupByMatlCd.get(row.matlCd);
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
        step2: AdjustNoSeqStep2Context,
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

    async prepareWriteStep1(
        input: MrpProcInput,
    ): Promise<AdjustNoSeqPreparedContext> {
        await this.repository.moveAdjustNoSeqWorkingRows(input);
        return this.prepare(input);
    }

    async prepare(input: MrpProcInput): Promise<AdjustNoSeqPreparedContext> {
        const orderRows = await this.repository.listAdjustNoSeqOrderCodes(
            input.poCd,
        );
        const matlGroups = await this.repository.listAdjustNoSeqMatlGroups(
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

    async prepareWriteStep2(
        input: MrpProcInput,
    ): Promise<AdjustNoSeqStep2Context> {
        const prepared =
            process.env.MRP_USE_SEPARATED_ADJUST_NOSEQ_WRITE_STEP1 === '1'
                ? await this.prepareWriteStep1(input)
                : await this.prepare(input);

        return {
            ...prepared,
            phase1Plan: this.buildPhase1Plan(prepared.matlGroups),
        };
    }

    async executeWriteStep3(
        input: MrpProcInput,
    ): Promise<AdjustNoSeqStep2Context> {
        const step2 = await this.prepareWriteStep2(input);
        await this.repository.applyAdjustNoSeqPhase1ShadowPrNum(
            input,
            step2.phase1Plan,
        );
        return step2;
    }

    async prepareWriteStep4(
        input: MrpProcInput,
    ): Promise<AdjustNoSeqStep4Context> {
        const step2 = await this.executeWriteStep3(input);
        const qtyMatrixRows =
            await this.repository.listAdjustNoSeqPhase1QtyMatrix(input.poCd);

        return {
            ...step2,
            phase1OrdCntRows: this.buildPhase1OrdCntRows(step2, qtyMatrixRows),
        };
    }

    async executeWriteStep5(
        input: MrpProcInput,
    ): Promise<AdjustNoSeqStep4Context> {
        const step4 = await this.prepareWriteStep4(input);
        await this.repository.applyAdjustNoSeqPhase1ShadowOrdCnt(
            input,
            step4.phase1OrdCntRows,
        );
        return step4;
    }

    async prepareWriteStep6(
        input: MrpProcInput,
    ): Promise<AdjustNoSeqStep6Context> {
        const step4 = await this.executeWriteStep5(input);
        return {
            ...step4,
            phase1InsertRows: this.buildPhase1InsertRows(input, step4),
        };
    }

    async executeWriteStep7(
        input: MrpProcInput,
    ): Promise<AdjustNoSeqStep6Context> {
        const step6 = await this.prepareWriteStep6(input);
        await this.repository.applyAdjustNoSeqPhase1PayloadToShadow(input);
        return step6;
    }

    async executeWriteStep8(
        input: MrpProcInput,
    ): Promise<AdjustNoSeqStep6Context> {
        const step6 = await this.prepareWriteStep6(input);
        await this.repository.applyAdjustNoSeqPhase1PayloadRowsToShadow(
            input,
            step6.phase1InsertRows,
        );
        return step6;
    }

    async prepareReadOnlyStep6(
        input: MrpProcInput,
    ): Promise<AdjustNoSeqStep6Context> {
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
        const result = await this.repository.runAdjustNoSeq(input);
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

        return { ok: true, step: 'kspPoMatlListAdjustNoSeq' };
    }

    async runLegacyWithPreparedSteps(
        input: MrpProcInput,
    ): Promise<MrpProcStepResult> {
        if (process.env.MRP_USE_SEPARATED_ADJUST_NOSEQ_WRITE_STEP10 === '1') {
            return this.runLogicOnlyStep10(input);
        }

        if (process.env.MRP_USE_SEPARATED_ADJUST_NOSEQ_WRITE_STEP9 === '1') {
            return this.runLegacyThenApplyStep9(input);
        }

        if (process.env.MRP_USE_SEPARATED_ADJUST_NOSEQ_WRITE_STEP8 === '1') {
            await this.executeWriteStep8(input);
        } else if (
            process.env.MRP_USE_SEPARATED_ADJUST_NOSEQ_WRITE_STEP7 === '1'
        ) {
            await this.executeWriteStep7(input);
        } else if (
            process.env.MRP_USE_SEPARATED_ADJUST_NOSEQ_WRITE_STEP6 === '1'
        ) {
            await this.prepareWriteStep6(input);
        } else if (
            process.env.MRP_USE_SEPARATED_ADJUST_NOSEQ_WRITE_STEP5 === '1'
        ) {
            await this.executeWriteStep5(input);
        } else if (
            process.env.MRP_USE_SEPARATED_ADJUST_NOSEQ_WRITE_STEP4 === '1'
        ) {
            await this.prepareWriteStep4(input);
        } else if (
            process.env.MRP_USE_SEPARATED_ADJUST_NOSEQ_WRITE_STEP3 === '1'
        ) {
            await this.executeWriteStep3(input);
        } else if (
            process.env.MRP_USE_SEPARATED_ADJUST_NOSEQ_WRITE_STEP2 === '1'
        ) {
            await this.prepareWriteStep2(input);
        } else if (
            process.env.MRP_USE_SEPARATED_ADJUST_NOSEQ_WRITE_STEP1 === '1'
        ) {
            await this.prepareWriteStep1(input);
            return this.repository.runAdjustNoSeq(input);
        }

        // Default separated runtime path now uses logic-only execution.
        return this.runLogicOnlyStep10(input);
    }
}
