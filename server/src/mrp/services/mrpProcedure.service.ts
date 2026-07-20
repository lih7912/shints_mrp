import {
    MrpProcExecutionContext,
    MrpProcRepository,
    MrpProcStepResult,
    MrpProcTarget,
} from '../types';
import { AdjustSeparatedService } from './adjust.separated';
import { AdjustNoSeqSeparatedService } from './adjustNoseq.separated';

export class MrpProcedureService {
    private readonly adjustNoSeqSeparated: AdjustNoSeqSeparatedService;
    private readonly adjustSeparated: AdjustSeparatedService;

    constructor(private readonly repository: MrpProcRepository) {
        this.adjustNoSeqSeparated = new AdjustNoSeqSeparatedService(repository);
        this.adjustSeparated = new AdjustSeparatedService(repository);
    }

    async run(
        target: MrpProcTarget,
        input: MrpProcExecutionContext['input'],
    ): Promise<MrpProcStepResult> {
        if (target === 'adjust-noseq') {
            await this.repository.clearPoMatlListByPoCdAndUserId(input);

            // Default path is separated logic; legacy fallback is explicit.
            if (process.env.MRP_USE_LEGACY_ADJUST_NOSEQ === '1') {
                return this.repository.runAdjustNoSeq(input);
            }
            return this.adjustNoSeqSeparated.runLegacyWithPreparedSteps(input);
        }

        if (target === 'adjust') {
            await this.repository.clearPoMatlListByPoCdAndUserId(input);

            // Default path is separated logic; legacy fallback is explicit.
            if (process.env.MRP_USE_LEGACY_ADJUST === '1') {
                return this.repository.runAdjust(input);
            }
            return this.adjustSeparated.runLegacyWithPreparedSteps(input);
        }

        if (target === 'recalc') {
            return this.repository.runReCalc(input);
        }

        return this.repository.runReDetail(input);
    }
}
