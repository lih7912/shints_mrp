import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
import AFLib2 from '../../po_adjust'; //PrismaClient 사용하기 위해 불러오기

// export default로 Query 내용 내보내기
const moduleQuery_S030510_1 = {
    Query: {
        mgrQueryS030510_1: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput = { ...args.data };

            let sqlStr0 = `
                select
                    isnull(max(po_seq), 0) as max_seq
                from
                    ksv_po_mrp
                where
                    po_cd = '${args.data.PO_CD}'
                    and po_seq < '98'
            `;
            var tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr0));
            /*
       var tNewSeq = 1;
       if (tRet0.length > 0) tNewSeq = tRet0[0].max_seq+1;
*/
            /*
       let sqlStr0 = `
           select
               isnull(max(po_seq), 0) as max_seq
           from
               ksv_po_mst
           where
               po_cd = '${args.data.PO_CD}'
               and po_seq < '98'
       `;
       var tRet0  =  await prisma.$queryRaw(Prisma.raw(sqlStr0));
*/
            var tMaxSeq = 0;
            if (tRet0.length > 0) tMaxSeq = tRet0[0].max_seq;

            var tNewSeq = parseInt(tMaxSeq) + 1;

            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }
            let sqlStr = `
                SELECT
                    A.PO_SEQ,
                    A.ORDER_CD,
                    A.MATL_CD,
                    C.MATL_NAME,
                    C.COLOR,
                    C.SPEC,
                    C.UNIT,
                    A.USE_PO_TYPE,
                    B.CD_NAME AS USE_PO_TYPE_NAME,
                    A.PO_QTY,
                    A.MATL_PRICE,
                    A.CURR_CD,
                    D.VENDOR_NAME,
                    A.MRP_SEQ,
                    A.MATL_SEQ,
                    A.REG_DATETIME
                FROM
                    KSV_PO_MRPTEMP A,
                    KCD_MATL_MST C,
                    KCD_CODE B,
                    KCD_VENDOR D
                WHERE
                    A.USER_ID = '${tUserInfo.USER_ID}'
                    AND A.PO_CD = '${args.data.PO_CD}'
                    -- AND A.PO_SEQ = '${args.data.PO_SEQ}' 
                    AND A.MATL_CD = C.MATL_CD
                    -- and c.matl_name like '%${args.data.MATL_NANE}%'
                    AND C.VENDOR_CD = D.VENDOR_CD
                    -- and d.vendor_cd like '%${args.data.VENDOR_CD}%' 
                    AND B.CD_GROUP = 'USE_PO_TYPE'
                    AND B.CD_CODE = A.USE_PO_TYPE
                ORDER BY
                    A.MATL_CD
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            // prefetch all ksv_po_mrp rows for this PO to avoid N+1 queries
            const sqlMrpAll = `
                select order_cd, matl_cd, po_seq, po_qty
                from ksv_po_mrp
                where po_cd = '${args.data.PO_CD}'
            `;
            const tRetMrpAll = await prisma.$queryRaw(Prisma.raw(sqlMrpAll)) as any[];
            const mrpMap = new Map<string, { po_seq: any; po_qty: any }>();
            for (const r of tRetMrpAll) {
                const k = `${String(r.order_cd || '')}|${String(r.matl_cd || '')}`;
                if (!mrpMap.has(k)) mrpMap.set(k, { po_seq: r.po_seq, po_qty: r.po_qty });
            }

            var tWObj = {};
            var tRetArray = [];
            var tIdx = 0;
            var tChkCnt = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tOne = { ...tRet[tIdx] };
                const mrpKey = `${String(tOne.ORDER_CD || '')}|${String(tOne.MATL_CD || '')}`;
                const mrpRow = mrpMap.get(mrpKey);

                if (mrpRow) {
                    if (parseFloat(tOne.PO_QTY) === parseFloat(mrpRow.po_qty)) {
                        tOne.CHECK = '';
                        tOne.PO_SEQ = mrpRow.po_seq;
                    } else {
                        tOne.CHECK = '*';
                        tOne.PO_SEQ = tNewSeq;
                        tChkCnt += 1;
                    }
                } else {
                    tOne.CHECK = '*';
                    tOne.PO_SEQ = tNewSeq;
                    tChkCnt += 1;
                }

                // if (tMaxSeq > parseInt(tOne.PO_SEQ)) tMaxSeq = parseInt(tOne.PO_SEQ);

                tRetArray.push(tOne);
            }
            tWObj.MAX_SEQ = String(tMaxSeq);
            tWObj.NEW_SEQ = String(tNewSeq);
            tWObj.PO_MRP = tRetArray;

            // 무조건 한번 읽으면 결과 지움. 260331. Won
            var tRet4 = AFLib2.CommonFunc.DeleteMrpWork(
                    tUserInfo.USER_ID,
                    args.data.PO_CD,
            );

            /*
            if (tChkCnt <= 0) {
                var tRet4 = AFLib2.CommonFunc.DeleteMrpWork(
                    tUserInfo.USER_ID,
                    args.data.PO_CD,
                );
            }
            */

            return tWObj;
        },
        mgrQuery_MRP_WORK_STATUS: async (_, args, contextValue) => {
            try {
                let sql = `
                    select
                        isnull(work_status, 'IDLE') as work_status,
                        po_cd
                    from
                        ksv_po_mst
                    where
                        po_cd = '${args.PO_CD}'
                `;
                var tRet = await prisma.$queryRaw(Prisma.raw(sql));
                if (tRet.length > 0) {
                    return tRet;
                } else {
                    return [{
                        work_status: 'IDLE',
                        po_cd: args.PO_CD
                    }];
                }
            } catch (e) {
                console.error('mgrQuery_MRP_WORK_STATUS error:', e.message);
                return [{
                    work_status: `ERROR:${e.message}`,
                    po_cd: args.PO_CD
                }];
            }
        },
    },
};

export default moduleQuery_S030510_1;
