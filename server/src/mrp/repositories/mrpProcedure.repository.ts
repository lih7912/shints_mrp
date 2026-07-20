import { PrismaClient } from '@prisma/client';
import { MrpProcedureMigration } from '../../mrpProcedureMigration';
import {
    AdjustNoSeqPhase1OrdCntRow,
    AdjustNoSeqPhase1PlanRow,
    AdjustNoSeqMatlGroupRow,
    AdjustNoSeqOrderCodeRow,
    AdjustNoSeqQtyMatrixRow,
    MrpProcInput,
    MrpProcRepository,
    MrpProcStepResult,
} from '../types';

export class MrpProcedurePrismaRepository implements MrpProcRepository {
    private readonly migration: MrpProcedureMigration;
    private readonly prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
        this.migration = new MrpProcedureMigration(prisma);
    }

    async clearPoMatlListByPoCdAndUserId(input: MrpProcInput): Promise<void> {
        await this.prisma.$queryRawUnsafe(
            `
            DELETE FROM KSV_PO_MATLLIST
            WHERE PO_CD = @P1
            `,
            `${input.poCd}${input.userId}`,
        );
    }

    async runAdjustNoSeq(input: MrpProcInput): Promise<MrpProcStepResult> {
        return this.migration.runPoMatlListAdjustNoSeq(input);
    }

    async runAdjust(input: MrpProcInput): Promise<MrpProcStepResult> {
        return this.migration.runPoMatlListAdjust(input);
    }

    async runReCalc(input: MrpProcInput): Promise<MrpProcStepResult> {
        return this.migration.runPoMrpReCalc(input);
    }

    async runReDetail(input: MrpProcInput): Promise<MrpProcStepResult> {
        return this.migration.runPoMrpReDetail(input);
    }

    async listAdjustNoSeqOrderCodes(
        poCd: string,
    ): Promise<AdjustNoSeqOrderCodeRow[]> {
        const rows = (await this.prisma.$queryRawUnsafe(
            `
            SELECT A.ORDER_CD AS order_cd
            FROM KSV_ORDER_MST AS A
            INNER JOIN KSV_ORDER_MEM AS B ON A.ORDER_CD = B.ORDER_CD
            INNER JOIN KCD_BUYER AS C ON LEFT(A.ORDER_CD, 2) = C.BUYER_CD
            INNER JOIN KCD_STYLE AS D ON A.STYLE_CD = D.STYLE_CD
            INNER JOIN KCD_FACTORY AS E ON A.FACTORY_CD = E.FACTORY_CD
            INNER JOIN KSV_PO_MEM AS F ON A.ORDER_CD = F.ORDER_CD
            INNER JOIN KSV_PO_MST AS G ON F.PO_CD = G.PO_CD
            WHERE (F.PO_CD = @P1) AND (F.PO_SEQ = '1') AND (G.PO_SEQ = '1')
            GROUP BY A.ORDER_CD
            `,
            poCd,
        )) as Array<{ order_cd: string }>;

        return rows.map((r) => ({ orderCd: r.order_cd }));
    }

    async listAdjustNoSeqMatlGroups(
        poCd: string,
    ): Promise<AdjustNoSeqMatlGroupRow[]> {
        const rows = (await this.prisma.$queryRawUnsafe(
            `
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
            WHERE (A.PO_CD = @P1)
                AND B.MATL_TYPE <> 'Z'
                AND A.PO_SEQ < 100
                AND A.USE_PO_TYPE = 1
            GROUP BY B.VENDOR_CD, A.MATL_CD, D.VENDOR_NAME, B.MATL_NAME, B.COLOR, B.SPEC
            ORDER BY D.VENDOR_NAME, B.MATL_NAME, B.COLOR, B.SPEC
            `,
            poCd,
        )) as Array<{
            vendor_cd: string;
            matl_cd: string;
            matl_seq: number;
            vendor_name: string;
            matl_name: string;
            color: string;
            spec: string;
        }>;

        return rows.map((r) => ({
            vendorCd: r.vendor_cd,
            matlCd: r.matl_cd,
            matlSeq: Number(r.matl_seq || 0),
            vendorName: r.vendor_name,
            matlName: r.matl_name,
            color: r.color,
            spec: r.spec,
        }));
    }

    async listAdjustMatlGroups(
        poCd: string,
    ): Promise<AdjustNoSeqMatlGroupRow[]> {
        const rows = (await this.prisma.$queryRawUnsafe(
            `
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
            WHERE (A.PO_CD = @P1)
                AND B.MATL_TYPE <> 'Z'
                AND A.PO_SEQ < 100
                AND A.USE_PO_TYPE = 1
            GROUP BY B.VENDOR_CD, A.MATL_CD, C.MATL_SEQ, D.VENDOR_NAME, B.MATL_NAME, B.COLOR, B.SPEC
            ORDER BY D.VENDOR_NAME, B.MATL_NAME, B.COLOR, B.SPEC
            `,
            poCd,
        )) as Array<{
            vendor_cd: string;
            matl_cd: string;
            matl_seq: number;
            vendor_name: string;
            matl_name: string;
            color: string;
            spec: string;
        }>;

        return rows.map((r) => ({
            vendorCd: r.vendor_cd,
            matlCd: r.matl_cd,
            matlSeq: Number(r.matl_seq || 0),
            vendorName: r.vendor_name,
            matlName: r.matl_name,
            color: r.color,
            spec: r.spec,
        }));
    }

    async moveAdjustNoSeqWorkingRows(input: MrpProcInput): Promise<void> {
        const shadowPoCd = `${input.poCd}${input.userId}`;

        await this.prisma.$queryRawUnsafe(
            `
            DELETE B
            FROM KSV_PO_MATLLIST AS B
            WHERE B.PO_CD = @P1
                AND B.PR_NUM NOT LIKE '0%'
                AND EXISTS (
                    SELECT 1
                    FROM KSV_PO_MATLLIST AS A
                    WHERE A.PO_CD = @P2
                        AND A.PR_NUM = B.PR_NUM
                        AND A.PR_NUM NOT LIKE '0%'
                )
            `,
            shadowPoCd,
            input.poCd,
        );

        await this.prisma.$queryRawUnsafe(
            `
            UPDATE KSV_PO_MATLLIST
            SET PO_CD = @P1
            WHERE PO_CD = @P2
                AND PR_NUM NOT LIKE '0%'
            `,
            shadowPoCd,
            input.poCd,
        );
    }

    async applyAdjustNoSeqPhase1ShadowPrNum(
        input: MrpProcInput,
        phase1Plan: AdjustNoSeqPhase1PlanRow[],
    ): Promise<void> {
        const shadowPoCd = `${input.poCd}${input.userId}`;

        for (const row of phase1Plan) {
            await this.prisma.$queryRawUnsafe(
                `
                UPDATE KSV_PO_MATLLIST
                SET PR_NUM = @P1
                WHERE PO_CD = @P2
                    AND MATL_CD = @P3
                    AND PR_NUM NOT LIKE '0%'
                `,
                row.prNum,
                shadowPoCd,
                row.matlCd,
            );
        }
    }

    async applyAdjustNoSeqPhase1ShadowOrdCnt(
        input: MrpProcInput,
        ordCntRows: AdjustNoSeqPhase1OrdCntRow[],
    ): Promise<void> {
        const shadowPoCd = `${input.poCd}${input.userId}`;

        for (const row of ordCntRows) {
            await this.prisma.$queryRawUnsafe(
                `
                UPDATE KSV_PO_MATLLIST
                SET ORD_CNT = @P1,
                    TOT_CNT = @P2
                WHERE PO_CD = @P3
                    AND MATL_CD = @P4
                    AND PR_NUM = @P5
                    AND PR_NUM NOT LIKE '0%'
                `,
                row.ordCnt,
                row.totQty,
                shadowPoCd,
                row.matlCd,
                row.prNum,
            );
        }
    }

    async applyAdjustNoSeqPhase1PayloadToShadow(
        input: MrpProcInput,
    ): Promise<void> {
        const shadowPoCd = `${input.poCd}${input.userId}`;

        await this.prisma.$queryRawUnsafe(
            `
            UPDATE KSV_PO_MATLLIST
            SET REG_USER = @P1
            WHERE PO_CD = @P2
                AND PR_NUM NOT LIKE '0%'
            `,
            input.userId,
            shadowPoCd,
        );
    }

    async applyAdjustNoSeqPhase1PayloadRowsToShadow(
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
    ): Promise<void> {
        const shadowPoCd = `${input.poCd}${input.userId}`;

        for (const row of payloadRows) {
            await this.prisma.$queryRawUnsafe(
                `
                UPDATE KSV_PO_MATLLIST
                SET VENDOR_CD = @P1,
                    MATL_SEQ = @P2,
                    TOT_CNT = @P3,
                    ORD_CNT = @P4,
                    REG_USER = @P5
                WHERE PO_CD = @P6
                    AND MATL_CD = @P7
                    AND PR_NUM = @P8
                    AND PR_NUM NOT LIKE '0%'
                `,
                row.vendorCd,
                row.matlSeq,
                row.totCnt,
                row.ordCnt,
                row.regUser,
                shadowPoCd,
                row.matlCd,
                row.prNum,
            );
        }
    }

    async applyAdjustNoSeqPhase1PayloadRowsToResult(
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
    ): Promise<void> {
        for (const row of payloadRows) {
            await this.prisma.$queryRawUnsafe(
                `
                UPDATE KSV_PO_MATLLIST
                SET VENDOR_CD = @P1,
                    MATL_SEQ = @P2,
                    TOT_CNT = @P3,
                    ORD_CNT = @P4,
                    REG_USER = @P5
                WHERE PO_CD = @P6
                    AND MATL_CD = @P7
                    AND PR_NUM = @P8
                    AND PR_NUM NOT LIKE '0%'
                `,
                row.vendorCd,
                row.matlSeq,
                row.totCnt,
                row.ordCnt,
                row.regUser,
                input.poCd,
                row.matlCd,
                row.prNum,
            );
        }
    }

    async insertAdjustNoSeqPhase1ResultRows(
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
    ): Promise<void> {
        for (const row of payloadRows) {
            await this.prisma.$queryRawUnsafe(
                `
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
                    @P1,
                    @P2,
                    @P3,
                    @P4,
                    @P5,
                    @P6,
                    @P7,
                    @P8,
                    CONVERT(VARCHAR(8), GETDATE(), 112)
                        + SUBSTRING(CONVERT(VARCHAR(8), GETDATE(), 108), 1, 2)
                        + SUBSTRING(CONVERT(VARCHAR(8), GETDATE(), 108), 4, 2)
                        + SUBSTRING(CONVERT(VARCHAR(8), GETDATE(), 108), 7, 2)
                )
                `,
                input.poCd,
                row.vendorCd,
                row.prNum,
                row.matlCd,
                row.matlSeq,
                row.totCnt,
                row.ordCnt,
                row.regUser,
            );
        }
    }

    async syncAdjustNoSeqStockQtyFromMrp(input: MrpProcInput): Promise<void> {
        await this.prisma.$queryRawUnsafe(
            `
            UPDATE A
            SET A.STOCK_QTY = B.PO_TO_QTY
            FROM KSV_PO_MATLLIST AS A
            INNER JOIN (
                SELECT
                    PO_MATL_CD,
                    SUM(PO_QTY) AS PO_TO_QTY
                FROM KSV_PO_MRP
                WHERE PO_CD = @P1
                    AND USE_PO_TYPE = '2'
                    AND DIFF_PO_TYPE <> '2'
                GROUP BY PO_MATL_CD
            ) AS B ON A.MATL_CD = B.PO_MATL_CD
            WHERE A.PO_CD = @P1
                AND LEFT(A.PR_NUM, 1) BETWEEN '1' AND '9'
            `,
            input.poCd,
        );

        const orderRows = await this.listAdjustNoSeqOrderCodes(input.poCd);
        const zeroOrdCnt = ''.padStart(orderRows.length * 8, '0');

        const amRows = (await this.prisma.$queryRawUnsafe(
            `
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
            INNER JOIN KCD_VENDOR AS D ON B.VENDOR_CD = D.VENDOR_CD
            WHERE A.PO_CD = @P1
                AND A.PO_SEQ < 100
                AND A.DIFF_PO_TYPE IN ('2', '5')
                AND EXISTS (
                    SELECT 1
                    FROM KSV_PO_MRP AS P
                    WHERE P.PO_CD = A.PO_CD
                        AND P.MATL_CD = A.MATL_CD
                        AND P.PO_SEQ < 100
                        AND P.USE_PO_TYPE = '1'
                )
                AND EXISTS (
                    SELECT 1
                    FROM KSV_PO_MRP AS Q
                    WHERE Q.PO_CD = A.PO_CD
                        AND Q.MATL_CD = A.MATL_CD
                        AND Q.PO_SEQ >= 100
                        AND Q.PO_QTY = 0
                )
            GROUP BY
                B.VENDOR_CD,
                A.MATL_CD,
                D.VENDOR_NAME,
                B.MATL_NAME,
                B.COLOR,
                B.SPEC
            ORDER BY
                D.VENDOR_NAME,
                B.MATL_NAME,
                B.COLOR,
                B.SPEC
            `,
            input.poCd,
        )) as Array<{
            vendor_cd: string;
            matl_cd: string;
            matl_seq: number;
        }>;

        let currentVendorCd = '';
        let vendorRank = 0;
        let matlRankWithinVendor = 0;

        for (const row of amRows) {
            if (row.vendor_cd !== currentVendorCd) {
                currentVendorCd = row.vendor_cd;
                vendorRank += 1;
                matlRankWithinVendor = 1;
            } else {
                matlRankWithinVendor += 1;
            }

            await this.prisma.$queryRawUnsafe(
                `
                INSERT INTO KSV_PO_MATLLIST
                (
                    PO_CD,
                    VENDOR_CD,
                    PR_NUM,
                    MATL_CD,
                    MATL_SEQ,
                    TOT_CNT,
                    ORD_CNT,
                    STOCK_QTY,
                    REG_USER,
                    REG_DATETIME
                )
                VALUES
                (
                    @P1,
                    @P2,
                    @P3,
                    @P4,
                    @P5,
                    '0',
                    @P6,
                    0,
                    @P7,
                    CONVERT(VARCHAR(8), GETDATE(), 112)
                        + SUBSTRING(CONVERT(VARCHAR(8), GETDATE(), 108), 1, 2)
                        + SUBSTRING(CONVERT(VARCHAR(8), GETDATE(), 108), 4, 2)
                        + SUBSTRING(CONVERT(VARCHAR(8), GETDATE(), 108), 7, 2)
                )
                `,
                input.poCd,
                row.vendor_cd,
                `AM${vendorRank}-${matlRankWithinVendor}`,
                row.matl_cd,
                Number(row.matl_seq || 0),
                zeroOrdCnt,
                input.userId,
            );
        }
    }

    async mergeAdjustNoSeqShadowFields(input: MrpProcInput): Promise<void> {
        const shadowPoCd = `${input.poCd}${input.userId}`;
        const toInt = (value: unknown): number => {
            const n = Number(value);
            return Number.isFinite(n) ? n : 0;
        };

        const rows = (await this.prisma.$queryRawUnsafe(
            `
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
            WHERE PO_CD = @P1
            `,
            shadowPoCd,
        )) as Array<{
            pr_num: string;
            matl_cd: string;
            remark: string;
            other_qty: number;
            err_qty: number;
            act_con: number;
            shortage: number;
            need_cnt: string;
            stock_move: number;
            remark_bvt: string;
            exp_date: string;
            etd: string;
            eta: string;
            delivery: string;
            upd_user: string;
            upd_datetime: string;
        }>;

        for (const row of rows) {
            await this.prisma.$queryRawUnsafe(
                `
                UPDATE KSV_PO_MATLLIST
                SET REMARK = @P1,
                    OTHER_QTY = @P2,
                    ERR_QTY = @P3,
                    ACT_CON = @P4,
                    SHORTAGE = @P5,
                    NEED_CNT = @P6,
                    STOCK_MOVE = @P7,
                    REMARK_BVT = @P8,
                    EXP_DATE = @P9,
                    ETD = @P10,
                    ETA = @P11,
                    DELIVERY = @P12,
                    UPD_USER = @P13,
                    UPD_DATETIME = @P14
                WHERE PO_CD = @P15
                    AND MATL_CD = @P16
                    AND PR_NUM = @P17
                `,
                row.remark,
                toInt(row.other_qty),
                toInt(row.err_qty),
                toInt(row.act_con),
                toInt(row.shortage),
                row.need_cnt,
                toInt(row.stock_move),
                row.remark_bvt,
                row.exp_date,
                row.etd,
                row.eta,
                row.delivery,
                row.upd_user,
                row.upd_datetime,
                input.poCd,
                row.matl_cd,
                row.pr_num,
            );
        }
    }

    async deleteAdjustNoSeqShadowRows(input: MrpProcInput): Promise<void> {
        const shadowPoCd = `${input.poCd}${input.userId}`;

        await this.prisma.$queryRawUnsafe(
            `
            UPDATE A
            SET A.PO_CD = @P1
            FROM KSV_PO_MATLLIST AS A
            WHERE A.PO_CD = @P2
                AND A.PR_NUM NOT LIKE 'AM%'
                AND A.ID = (
                    SELECT MIN(S.ID)
                    FROM KSV_PO_MATLLIST AS S
                    WHERE S.PO_CD = @P2
                        AND S.PR_NUM = A.PR_NUM
                )
                AND NOT EXISTS (
                    SELECT 1
                    FROM KSV_PO_MATLLIST AS B
                    WHERE B.PO_CD = @P1
                        AND B.PR_NUM = A.PR_NUM
                )
            `,
            input.poCd,
            shadowPoCd,
        );

        await this.prisma.$queryRawUnsafe(
            `
            DELETE FROM KSV_PO_MATLLIST
            WHERE PO_CD = @P1
            `,
            shadowPoCd,
        );
    }

    async listAdjustNoSeqPhase1QtyMatrix(
        poCd: string,
    ): Promise<AdjustNoSeqQtyMatrixRow[]> {
        const rows = (await this.prisma.$queryRawUnsafe(
            `
            SELECT
                A.MATL_CD AS matl_cd,
                A.ORDER_CD AS order_cd,
                SUM(A.PO_QTY) AS qty_sum,
                COUNT(A.PO_QTY) AS qty_count
            FROM KSV_PO_MRP AS A
            WHERE A.PO_CD = @P1
                AND A.PO_SEQ < 100
                AND A.USE_PO_TYPE = 1
            GROUP BY A.MATL_CD, A.ORDER_CD
            `,
            poCd,
        )) as Array<{
            matl_cd: string;
            order_cd: string;
            qty_sum: number;
            qty_count: number;
        }>;

        return rows.map((r) => ({
            matlCd: r.matl_cd,
            orderCd: r.order_cd,
            qtySum: Number(r.qty_sum || 0),
            qtyCount: Number(r.qty_count || 0),
        }));
    }
}
