import { Prisma } from '@prisma/client';
import prisma from '../../db';

const escapeSqlLiteral = (value: any) =>
    String(value ?? '').replace(/'/g, "''");

const moduleMutation_S0914_FAC_IN_OUT_MANAGER = {
    Mutation: {
        mgrUpdate_S0914_RemarkBvt: async (
            _: any,
            args: any,
            contextValue: any,
        ) => {
            const data = args.data || {};
            const poCd = String(data.PO_CD || '').trim();
            const matlCd = String(data.MATL_CD || '').trim();
            const remarkBvt = String(data.REMARK_BVT ?? '');

            if (!poCd || !matlCd) {
                return [
                    {
                        id: 0,
                        CODE: 'ERROR:PO_CD and MATL_CD are required.',
                    },
                ];
            }

            const poCdEsc = escapeSqlLiteral(poCd);
            const matlCdEsc = escapeSqlLiteral(matlCd);
            const remarkBvtEsc = escapeSqlLiteral(remarkBvt);

            const sqlUpdate = `
                UPDATE KSV_PO_MATLLIST
                SET
                    REMARK_BVT = '${remarkBvtEsc}'
                WHERE
                    PO_CD = '${poCdEsc}'
                    AND MATL_CD = '${matlCdEsc}'
            `;

            try {
                await prisma.$executeRaw(Prisma.raw(sqlUpdate));

                return [
                    {
                        id: 1,
                        CODE: 'SUCCEED:REMARK_BVT updated.',
                    },
                ];
            } catch (err) {
                console.log('mgrUpdate_S0914_RemarkBvt error =>', err);
                return [
                    {
                        id: 0,
                        CODE: 'ERROR:Failed to update REMARK_BVT.',
                    },
                ];
            }
        },
    },
};

export default moduleMutation_S0914_FAC_IN_OUT_MANAGER;
