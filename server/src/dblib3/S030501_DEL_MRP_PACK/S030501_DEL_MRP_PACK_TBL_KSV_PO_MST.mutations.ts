// MGR_@@TNAME@@.mutations.js

import * as fs from 'fs';
import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기

/*
                STD_FLAG: String 
                NET: String 
                LOSS: String 
                USE_SIZE: String 
                REMARK: String 

*/

// export default로 Mutation 내용 내보내기
const moduleMutation_S030501_DEL_MRP_PACK = {
    Mutation: {
        mgrDelete_S030501_DEL_MRP_PACK_TBL_KSV_PO_MST: async (
            _,
            args,
            contextValue,
        ) => {
            //
            var tDate = new Date();
            var mm = tDate.getMonth() + 1;
            var mm_str = '';
            if (mm > 9) mm_str = mm.toString();
            else mm_str = '0' + mm;

            var dd = tDate.getDate();
            var dd_str = '';
            if (dd > 9) dd_str = dd;
            else dd_str = '0' + dd;

            var hours = tDate.getHours();
            var hours_str = '';
            if (hours > 9) hours_str = hours.toString();
            else hours_str = '0' + hours;

            var minutes = tDate.getMinutes();
            var minutes_str = '';
            if (minutes > 9) minutes_str = minutes.toString();
            else minutes_str = '0' + minutes;

            var seconds = tDate.getSeconds();
            var seconds_str = '';
            if (seconds > 9) seconds_str = seconds.toString();
            else seconds_str = '0' + seconds;

            var yyyy = tDate.getFullYear();

            var tRetDate =
                yyyy.toString() +
                mm_str +
                dd_str +
                hours_str +
                minutes_str +
                seconds_str;
            var tYY = 'B' + yyyy.toString().substring(2) + '-';

            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInputObj = args.datas;

            if (tInputObj.PO_STATUS === '5') {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:PO_DELETE:End Po.';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tCheckSQL = `
                select
                    max(po_seq) as max_seq
                from
                    ksv_po_mst
                where
                    po_cd = '${tInputObj.PO_CD}'
                    and po_seq < 97
            `;
            var tCheck = await prisma.$queryRaw(Prisma.raw(tCheckSQL));
            if (
                tCheck.length > 0 &&
                tCheck[0].max_seq > parseInt(tInputObj.PO_SEQ) &&
                parseInt(tInputObj.PO_SEQ) > 1
            ) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:PO_DELETE:마지막 차수가 아닙니다';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
            var tLastPoSeq = tCheck[0].max_seq;

            if (parseInt(tInputObj.PO_SEQ) === 1 && tLastPoSeq > 1) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:PO_DELETE:PO_SEQ > 1';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            if (
                parseInt(tInputObj.PO_SEQ) > 1 &&
                parseInt(tInputObj.PO_SEQ) < 97
            ) {
                let sql0 = `
                    select
                        count(po_seq) as cnt1
                    from
                        ksv_stock_in
                    where
                        po_cd = '${tInputObj.PO_CD}'
                        and po_seq = '${tInputObj.PO_SEQ}'
                `;
                let nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                if (nRet0.length > 0 && nRet0[0].cnt1 > 0) {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = 'ERROR:PO_DELETE:입고가 이미 진행되었습니다.';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }

                let sql0 = `
                    select
                        count(*) as cnt1
                    from
                        ksv_po_mrp b,
                        ksv_stock_matl a
                    where
                        b.po_cd = '${tInputObj.PO_CD}'
                        and b.po_seq = '${tInputObj.PO_SEQ}'
                        and a.stock_idx = b.stock_idx
                        and b.use_po_type = '1'
                        and a.out_qty > 0
                `;
                let nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                if (nRet0.length > 0 && nRet0[0].cnt1 > 0) {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE =
                        'ERROR:PO_DELETE:Left over된 자재 중에 사용된 자재가 있어 삭제 못합니다.(out).';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }

                let sql0 = `
                    select
                        count(*) as cnt1
                    from
                        ksv_po_mrp b,
                        ksv_stock_matl a
                    where
                        b.po_cd = '${tInputObj.PO_CD}'
                        and b.po_seq = '${tInputObj.PO_SEQ}'
                        and a.stock_idx = b.stock_idx
                        and b.use_po_type = '1'
                        and a.use_qty > 0
                `;
                let nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                if (nRet0.length > 0 && nRet0[0].cnt1 > 0) {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE =
                        'ERROR:PO_DELETE:Left over된 자재 중에 사용된 자재가 있어 삭제 못합니다.(use).';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }

                var tCheckSQL1 = `
                    select
                        count(po_seq) as cnt
                    from
                        ksv_stock_in
                    where
                        po_cd = '${tInputObj.PO_CD}'
                        and po_seq = ${tInputObj.PO_SEQ}
                `;
                var tCheck1 = await prisma.$queryRaw(Prisma.raw(tCheckSQL1));
                if (tCheck1[0].cnt > 0) {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = 'ERROR: 입고가 이미 진행되었습니다 ';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }

                var tCheckSQL2 = `
                    select
                        count(*)
                    from
                        ksv_po_mrp b,
                        ksv_stock_matl a
                    where
                        b.po_cd = '${tInputObj.PO_CD}'
                        and b.po_seq = ${tInputObj.PO_SEQ}
                        and a.stock_idx = b.stock_idx
                        and b.use_po_type = '1'
                        and a.out_qty > 0
                `;
                var tCheck2 = await prisma.$queryRaw(Prisma.raw(tCheckSQL2));
                if (tCheck2[0].cnt > 0) {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE =
                        'ERROR: Left over재고가 사용되어 삭제가 안됩니다  (out) ';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }

                var tCheckSQL3 = `
                    select
                        count(*)
                    from
                        ksv_po_mrp b,
                        ksv_stock_matl a
                    where
                        b.po_cd = '${tInputObj.PO_CD}'
                        and b.po_seq = ${tInputObj.PO_SEQ}
                        and a.stock_idx = b.stock_idx
                        and b.use_po_type = '1'
                        and a.use_qty > 0
                `;
                var tCheck3 = await prisma.$queryRaw(Prisma.raw(tCheckSQL3));
                if (tCheck3[0].cnt > 0) {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE =
                        'ERROR: Left over재고가 사용되어 삭제가 안됩니다  (use) ';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }

                // 삭제진행
                var tSQL = '';
                tSQL = ` 
                     exec kspPoMrpAdjCancel '${tInputObj.PO_CD}', '${tInputObj.PO_SEQ}' 
                `;
                try {
                    global.currentTransactionInfo = {
                        contextValue: contextValue,
                        functionName: AFLib.getFunctionName(),
                    };

                    var [nRet1] = await prisma.$transaction([
                        prisma.$queryRaw(Prisma.raw(tSQL)),
                    ]);

                    delete global.currentTransactionInfo;
                } catch (e) {
                    console.log(e);
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = 'ERROR:PO_DELETE';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }

                if (parseInt(tInputObj.PO_SEQ) !== 1) {
                    if (tInputObj.PO_TYPE === 'S') {
                        tSQL = ` 
                            exec kspPoMatlListSample '${tInputObj.PO_CD}', '${tInputObj.USER_ID}' 
                        `;
                        try {
                            global.currentTransactionInfo = {
                                contextValue: contextValue,
                                functionName: AFLib.getFunctionName(),
                            };

                            var [nRet1] = await prisma.$transaction([
                                prisma.$queryRaw(Prisma.raw(tSQL)),
                            ]);

                            delete global.currentTransactionInfo;
                        } catch (e) {
                            console.log(e);
                            var tRetArray = [];
                            var tObj = {};
                            tObj.CODE = 'ERROR:PO_DELETE';
                            tObj.id = 0;
                            tRetArray.push(tObj);
                            return tRetArray;
                        }
                    } else {
                        tSQL = ` 
                             exec kspPoMatlListAdjustNoSeq  '${tInputObj.PO_CD}', '${tInputObj.USER_ID}' 
                        `;
                        try {
                            global.currentTransactionInfo = {
                                contextValue: contextValue,
                                functionName: AFLib.getFunctionName(),
                            };

                            var [nRet1] = await prisma.$transaction([
                                prisma.$queryRaw(Prisma.raw(tSQL)),
                            ]);

                            delete global.currentTransactionInfo;
                        } catch (e) {
                            console.log(e);
                            var tRetArray = [];
                            var tObj = {};
                            tObj.CODE = 'ERROR:PO_DELETE';
                            tObj.id = 0;
                            tRetArray.push(tObj);
                            return tRetArray;
                        }
                    }
                }

                var tRetArray = [];
                var tObj = {};
                tObj.CODE = `SUCCESS:PO_DELETE:PO_SEQ ${tInputObj.PO_SEQ}`;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            if (tInputObj.REMARK !== '삭제가능') {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:PO_DELETE:삭제 가능 상태가 아닙니다.';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tSQLArray = [];

            let sql0 = '';

            if (parseInt(tInputObj.PO_SEQ) === 1) {
                sql0 = `
                    select
                        stock_idx,
                        use_qty
                    from
                        ksv_stock_use
                    where
                        use_po_cd = '${tInputObj.PO_CD}'
                `;
            } else {
                sql0 = `
                    select
                        stock_idx,
                        use_qty
                    from
                        ksv_stock_use
                    where
                        use_po_cd = '${tInputObj.PO_CD}'
                        and use_po_seq = '${tInputObj.PO_SEQ}'
                `;
            }
            let nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            let tIdx0 = 0;
            for (tIdx0 = 0; tIdx0 < nRet0.length; tIdx0++) {
                var tIn = nRet0[tIdx0];

                let tSQL99 = `
                    update ksv_stock_matl
                    set
                        remain_qty = remain_qty + ${tIn.use_qty},
                        use_qty = use_qty - ${tIn.use_qty}
                    where
                        stock_idx = '${tIn.stock_idx}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            }

            var sql10 = `
                select
                    pu_cd
                from
                    ksv_po_mst
                where
                    po_cd = '${tInputObj.PO_CD}'
                    and po_seq = 1
            `;
            // let nRet10 = await prisma.$queryRaw(Prisma.raw(sql10));
            let nRet10 = [];
              
            var tPuCd = '';
            if (nRet10.length > 0) tPuCd = nRet10[0].pu_cd;

            if (parseInt(tInputObj.PO_SEQ) === 1) {
                let tSQL99 = `
                    update ksv_order_mst
                    set
                        order_status = '0'
                    where
                        order_cd in (
                            select
                                order_cd
                            from
                                ksv_po_mem
                            where
                                po_cd = '${tInputObj.PO_CD}'
                                and po_seq = '${tInputObj.PO_SEQ}'
                        )
                        and order_status <> '4';
                    
                    delete ksv_po_mst
                    where
                        po_cd = '${tInputObj.PO_CD}';
                    
                    delete ksv_po_worklist
                    where
                        po_cd = '${tInputObj.PO_CD}';
                    
                    delete ksv_po_mem
                    where
                        po_cd = '${tInputObj.PO_CD}';
                    
                    delete ksv_po_mrp
                    where
                        po_cd = '${tInputObj.PO_CD}';
                    
                    delete ksv_po_matllist
                    where
                        po_cd = '${tInputObj.PO_CD}';
                    
                    delete ksv_stock_mst
                    where
                        po_cd = '${tInputObj.PO_CD}';
                    
                    delete ksv_stock_mem
                    where
                        po_cd = '${tInputObj.PO_CD}';
                    
                    delete ksv_stock_matl
                    where
                        po_cd = '${tInputObj.PO_CD}';
                    
                    delete ksv_stock_use
                    where
                        use_po_cd = '${tInputObj.PO_CD}';
                    
                    update ksv_order_mst
                    set
                        order_status = '0'
                    where
                        order_cd in (
                            select
                                order_cd
                            from
                                ksv_po_mem
                            where
                                po_cd = '${tInputObj.PO_CD}'
                        );
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    update ksv_capabook_mem
                    set
                        po_cd = ''
                    where
                        po_cd = '${tInputObj.PO_CD}';
                    
                    update ksv_capabook_mem_ethiopia
                    set
                        po_cd = ''
                    where
                        po_cd = '${tInputObj.PO_CD}';
                    
                    update ksv_capasample_mem
                    set
                        po_cd = ''
                    where
                        po_cd = '${tInputObj.PO_CD}';
                    
                    update ksv_capasample_mem_ethiopia
                    set
                        po_cd = ''
                    where
                        po_cd = '${tInputObj.PO_CD}';
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            } else {
                let tSQL99 = `
                    delete ksv_stock_matl
                    where
                        po_cd = '${tInputObj.PO_CD}'
                        and stock_idx in (
                            select
                                stock_idx
                            from
                                ksv_po_mrp
                            where
                                po_cd = '${tInputObj.PO_CD}'
                                and po_seq = '${tInputObj.PO_SEQ}'
                                and diff_po_type = '1'
                        );
                    
                    delete ksv_po_mst
                    where
                        po_cd = '${tInputObj.PO_CD}'
                        and po_seq = '${tInputObj.PO_SEQ}';
                    
                    delete ksv_po_mem
                    where
                        po_cd = '${tInputObj.PO_CD}'
                        and po_seq = '${tInputObj.PO_SEQ}';
                    
                    delete ksv_po_mrp
                    where
                        po_cd = '${tInputObj.PO_CD}'
                        and po_seq = '${tInputObj.PO_SEQ}';
                    
                    delete ksv_stock_mst
                    where
                        po_cd = '${tInputObj.PO_CD}'
                        and po_seq = '${tInputObj.PO_SEQ}';
                    
                    delete ksv_stock_mem
                    where
                        po_cd = '${tInputObj.PO_CD}'
                        and po_seq = '${tInputObj.PO_SEQ}';
                    
                    delete ksv_stock_use
                    where
                        use_po_cd = '${tInputObj.PO_CD}'
                        and use_po_seq = '${tInputObj.PO_SEQ}';
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            }

            if (tPuCd !== '') {
                let tSQL99 = `
                    delete from ksv_pu_mst2
                    where
                        pu_cd = '${tPuCd}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    delete from ksv_pu_mem2
                    where
                        pu_cd = '${tPuCd}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    delete from ksv_stock_mem2
                    where
                        pu_cd = '${tPuCd}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    delete from ksv_cost_mst
                    where
                        pu_cd = '${tPuCd}'
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
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:PO_DELETE';
                tObj.id = 0;
                tRetArray.push(tObj);
            }

            if (parseInt(tInputObj.PO_SEQ) !== 1) {
                if (tInputObj.PO_TYPE === 'S') {
                    tSQL = ` 
                     exec kspPoMatlListSample '${tInputObj.PO_CD}', '${tUserInfo.USER_ID}' 
                  `;
                    try {
                        global.currentTransactionInfo = {
                            contextValue: contextValue,
                            functionName: AFLib.getFunctionName(),
                        };

                        var [nRet1] = await prisma.$transaction([
                            prisma.$queryRaw(Prisma.raw(tSQL)),
                        ]);

                        delete global.currentTransactionInfo;
                    } catch (e) {
                        console.log(e);
                        var tRetArray = [];
                        var tObj = {};
                        tObj.CODE = 'ERROR:PO_DELETE';
                        tObj.id = 0;
                        tRetArray.push(tObj);
                        return tRetArray;
                    }
                } else {
                    tSQL = ` 
                     exec kspPoMatlListAdjustNoSeq  '${tInputObj.PO_CD}', '${tUserInfo.USER_ID}' 
                  `;
                    try {
                        global.currentTransactionInfo = {
                            contextValue: contextValue,
                            functionName: AFLib.getFunctionName(),
                        };

                        var [nRet1] = await prisma.$transaction([
                            prisma.$queryRaw(Prisma.raw(tSQL)),
                        ]);

                        delete global.currentTransactionInfo;
                    } catch (e) {
                        console.log(e);
                        var tRetArray = [];
                        var tObj = {};
                        tObj.CODE = 'ERROR:PO_DELETE';
                        tObj.id = 0;
                        tRetArray.push(tObj);
                        return tRetArray;
                    }
                }
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = `SUCCESS:PO_DELETE:PO_SEQ ${tInputObj.PO_SEQ}`;
            tObj.id = 0;
            tRetArray.push(tObj);
            return tRetArray;
        },
    },
};

export default moduleMutation_S030501_DEL_MRP_PACK;
