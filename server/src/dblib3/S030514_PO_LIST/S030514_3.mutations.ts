import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
import { MrpProcedureMigration } from '../../mrpProcedureMigration';
import { MrpProcedurePrismaRepository } from '../../mrp/repositories/mrpProcedure.repository';
import { MrpProcedureService } from '../../mrp/services/mrpProcedure.service';
const mrpMigration = new MrpProcedureMigration(prisma as any);
const mrpProcedureService = new MrpProcedureService(
    new MrpProcedurePrismaRepository(prisma as any),
);
import S030514_QRY_COMM from '../../reportlib_polist'; //PrismaClient 사용하기 위해 불러오기
import axios from 'axios';
const Excel = require('exceljs');
const { upload } = require('../../../routes/s3');
const { MongoClient } = require('mongodb');

// export default로 Query 내용 내보내기
const moduleMutation_S030514_3 = {
    Mutation: {
        mgrUpdate_S030514_3_MATL_LIST_INSERT: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tSQLArray = [];

            var tSQL0_1 = `
                select
                    po_type,
                    reg_user,
                    po_status
                from
                    ksv_po_mst
                where
                    po_cd = '${args.data.PO_CD}'
                order by
                    po_seq
            `;
            var nRet0_1 = await prisma.$queryRaw(Prisma.raw(tSQL0_1));
            var tPoObj = { ...nRet0_1[0] };


            /*
            if (tPoObj.po_type === 'S') {
                const retPoMatlSample = await mrpMigration.runPoMatlListSample({
                    poCd: args.data.PO_CD,
                    userId: tPoObj.reg_user,
                });
                if (!retPoMatlSample.ok)
                    throw new Error(
                        retPoMatlSample.message || retPoMatlSample.step,
                    );
            } else {
                const retPoMatlAdjustNoSeq = await mrpProcedureService.run(
                    'adjust-noseq',
                    {
                        poCd: args.data.PO_CD,
                        userId: tPoObj.reg_user,
                    },
                );
                if (!retPoMatlAdjustNoSeq.ok)
                    throw new Error(
                        retPoMatlAdjustNoSeq.message ||
                            retPoMatlAdjustNoSeq.step,
                    );
            }
            */

            // 확인시까지 코드 유지.  260513. Won
            var tDelSql5 = `
                 delete from ksv_po_matllist
                 where  po_cd = '${args.data.PO_CD}${tPoObj.reg_user}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tDelSql5));
            tSQLArray.push(tSQL99_1);

            if (tPoObj.po_type === 'S') {
                var tExecSql = `exec kspPoMatlListSample '${args.data.PO_CD}','${tUserInfo.USER_ID}' `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tExecSql));
                tSQLArray.push(tSQL99_1);
            } else {
                var tExecSql = `exec kspPoMatlListAdjustNoSeq '${args.data.PO_CD}','${tUserInfo.USER_ID}' `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tExecSql));
                tSQLArray.push(tSQL99_1);
            }


            if (tPoObj.po_status === '4') {
                let tSQL99 = `
                    insert into
                        ksv_stock_mem (
                            po_cd,
                            po_seq,
                            order_cd,
                            matl_cd,
                            mrp_seq,
                            matl_seq,
                            po_qty,
                            in_qty,
                            out_qty,
                            infac_qty,
                            outfac_qty,
                            remain_qty,
                            factory_cd,
                            diff_po_type,
                            diff_qty,
                            stock_status,
                            status_cd,
                            reg_user,
                            reg_datetime
                        )
                    select
                        po_cd,
                        po_seq,
                        order_cd,
                        matl_cd,
                        mrp_seq,
                        matl_seq,
                        po_qty,
                        0,
                        0,
                        0,
                        0,
                        0,
                        'FC034',
                        diff_po_type,
                        '0',
                        '0',
                        '0',
                        '${tPoObj.reg_user}',
                        '${tRetDate}'
                    from
                        ksv_po_mrp
                    where
                        po_cd = '${args.data.PO_CD}'
                        and use_po_type = '1'
                        and diff_po_type <> '2'
                        and matl_cd not in (
                            select
                                matl_cd
                            from
                                ksv_stock_mem
                            where
                                po_cd = '${args.data.PO_CD}'
                        )
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            }

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'SUCCESS:Matl List Insert';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Matl List Insert';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },
    },
};

export default moduleMutation_S030514_3;
