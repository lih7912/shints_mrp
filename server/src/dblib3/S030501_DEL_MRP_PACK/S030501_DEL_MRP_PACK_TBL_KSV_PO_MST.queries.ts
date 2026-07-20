// MGR_@@TNAME@@.queries.js

import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S030501_DEL_MRP_PACK_TBL_KSV_PO_MST = {
    Query: {
        mgrQuery_S030501_DEL_MRP_PACK_TBL_KSV_PO_MST: async (_, args) => {
            var tSQL = '';
            if (args.KEY1 !== '') {
                tSQL += `AND KEY1 = '${args.KEY1}' `;
            }
            let sqlStr = `
                select
                    a.id,
                    a.PO_CD,
                    a.PO_SEQ,
                    b.cd_name as PO_TYPE_NAME,
                    c.cd_name as PO_STATUS_NAME,
                    a.PO_TYPE,
                    a.PO_STATUS,
                    '' as REMARK
                from
                    (
                        select
                            *
                        from
                            ksv_po_mst
                        where
                            po_cd = '${args.data.PO_CD}'
                    ) a
                    left join kcd_code b on b.cd_group = 'PO_TYPE'
                    and b.cd_code = a.po_type
                    left join kcd_code c on c.cd_group = 'PO_STATUS'
                    and c.cd_code = a.po_status
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tIdx = 0;
            var tRetArray = [];
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tObj = { ...tRet[tIdx] };

                var chkStockIn = '0';
                let sql0 = `
                    select
                        count(*) as cnt1
                    from
                        ksv_stock_in
                    where
                        po_cd = '${tObj.PO_CD}'
                        and po_seq = '${tObj.PO_SEQ}'
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                if (tRet0.length > 0 && tRet0[0].cnt1 > 0) chkStockIn = '1';

                if (tObj.PO_TYPE === 'M') {
                    /*
               if (parseInt(tObj.PO_SEQ) > 1 && parseInt(tObj.PO_SEQ) < 97) {
                  tObj.REMARK = '발주조정됨';
               }
*/
                    if (parseInt(tObj.PO_SEQ) === 99) {
                        tObj.REMARK = '미니엄';
                    } else if (parseInt(tObj.PO_SEQ) === 98) {
                        tObj.REMARK = '오버';
                    } else if (parseInt(tObj.PO_SEQ) === 97) {
                        tObj.REMARK = 'FOC';
                    } else {
                        if (chkStockIn === '1') tObj.REMARK = '입고됨';
                        else tObj.REMARK = '삭제가능';
                    }
                } else {
                    if (chkStockIn === '1') tObj.REMARK = '입고됨';
                    else tObj.REMARK = '삭제가능';
                }

                if (tIdx < tRet.length - 1) {
                    tObj.REMARK = '삭제불가';
                }

                tRetArray.push(tObj);
            }
            return tRetArray;
        },
    },
};

export default moduleQuery_S030501_DEL_MRP_PACK_TBL_KSV_PO_MST;
