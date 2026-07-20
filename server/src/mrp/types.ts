export type MrpProcTarget = 'adjust-noseq' | 'adjust' | 'recalc' | 'redetail';

export type MrpProcInput = {
    poCd: string;
    userId: string;
};

export type MrpProcStepResult = {
    ok: boolean;
    step: string;
    message?: string;
};

export type AdjustNoSeqOrderCodeRow = {
    orderCd: string;
};

export type AdjustNoSeqMatlGroupRow = {
    vendorCd: string;
    matlCd: string;
    matlSeq: number;
    vendorName: string;
    matlName: string;
    color: string;
    spec: string;
};

export type AdjustNoSeqPhase1PlanRow = {
    vendorCd: string;
    matlCd: string;
    matlSeq: number;
    prNum: string;
    vendorRank: number;
    matlRankWithinVendor: number;
};

export type AdjustNoSeqQtyMatrixRow = {
    matlCd: string;
    orderCd: string;
    qtySum: number;
    qtyCount: number;
};

export type AdjustNoSeqPhase1OrdCntRow = {
    matlCd: string;
    prNum: string;
    ordCnt: string;
    totQty: number;
};

export type MrpProcExecutionContext = {
    target: MrpProcTarget;
    input: MrpProcInput;
};

export type MrpProcRepository = {
    clearPoMatlListByPoCdAndUserId(input: MrpProcInput): Promise<void>;
    runAdjustNoSeq(input: MrpProcInput): Promise<MrpProcStepResult>;
    runAdjust(input: MrpProcInput): Promise<MrpProcStepResult>;
    runReCalc(input: MrpProcInput): Promise<MrpProcStepResult>;
    runReDetail(input: MrpProcInput): Promise<MrpProcStepResult>;
    listAdjustNoSeqOrderCodes(poCd: string): Promise<AdjustNoSeqOrderCodeRow[]>;
    listAdjustNoSeqMatlGroups(poCd: string): Promise<AdjustNoSeqMatlGroupRow[]>;
    listAdjustMatlGroups(poCd: string): Promise<AdjustNoSeqMatlGroupRow[]>;
    moveAdjustNoSeqWorkingRows(input: MrpProcInput): Promise<void>;
    applyAdjustNoSeqPhase1ShadowPrNum(
        input: MrpProcInput,
        phase1Plan: AdjustNoSeqPhase1PlanRow[],
    ): Promise<void>;
    applyAdjustNoSeqPhase1ShadowOrdCnt(
        input: MrpProcInput,
        ordCntRows: AdjustNoSeqPhase1OrdCntRow[],
    ): Promise<void>;
    applyAdjustNoSeqPhase1PayloadToShadow(input: MrpProcInput): Promise<void>;
    applyAdjustNoSeqPhase1PayloadRowsToShadow(
        input: MrpProcInput,
        payloadRows: {
            vendorCd: string;
            prNum: string;
            matlCd: string;
            matlSeq: number;
            totCnt: number;
            ordCnt: string;
            regUser: string;
        }[],
    ): Promise<void>;
    applyAdjustNoSeqPhase1PayloadRowsToResult(
        input: MrpProcInput,
        payloadRows: {
            vendorCd: string;
            prNum: string;
            matlCd: string;
            matlSeq: number;
            totCnt: number;
            ordCnt: string;
            regUser: string;
        }[],
    ): Promise<void>;
    insertAdjustNoSeqPhase1ResultRows(
        input: MrpProcInput,
        payloadRows: {
            vendorCd: string;
            prNum: string;
            matlCd: string;
            matlSeq: number;
            totCnt: number;
            ordCnt: string;
            regUser: string;
        }[],
    ): Promise<void>;
    syncAdjustNoSeqStockQtyFromMrp(input: MrpProcInput): Promise<void>;
    mergeAdjustNoSeqShadowFields(input: MrpProcInput): Promise<void>;
    deleteAdjustNoSeqShadowRows(input: MrpProcInput): Promise<void>;
    listAdjustNoSeqPhase1QtyMatrix(
        poCd: string,
    ): Promise<AdjustNoSeqQtyMatrixRow[]>;
};
