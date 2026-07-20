import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
import AFLib2 from '../../po_adjust'; //PrismaClient 사용하기 위해 불러오기

// export default로 Query 내용 내보내기
const moduleQuery_S030504_1_1 = {
    Query: {
        mgrQueryS030504_1_1: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }
            let sqlStr = `
                select distinct
                    a.PO_SEQ,
                    a.ORDER_CD,
                    a.MATL_CD,
                    c.MATL_NAME,
                    c.COLOR,
                    c.SPEC,
                    'Order' AS USE_PO_TYPE_N,
                    a.BEF_QTY as PO_QTY,
                    a.STOCK_QTY as USE_QTY,
                    (a.stock_qty + a.bef_qty) AS OLD_QTY,
                    a.NEW_QTY,
                    (
                        case
                            when e.cd_name = 'Cancel' then a.diff_qty
                            when e.cd_name = 'Cancel StockUse' then a.diff_qty
                            else a.diff_qty - a.stock_qty
                        end
                    ) AS DIFF_QTY,
                    e.cd_name AS DIFF_PO_TYPE_N,
                    d.VENDOR_NAME,
                    a.MRP_SEQ,
                    a.MATL_SEQ,
                    a.MATL_PRICE,
                    a.CURR_CD,
                    a.TOT_AMT,
                    '' as USE_SIZE,
                    f.ORDER_STATUS,
                    a.SEQ,
                    '' as USE_PO_TYPE,
                    k1.FACTORY_CD as PO_FACTORY_CD,
                    k1.FACTORY_NAME as PO_FACTORY_CD_N,
                    isnull(p1.FACTORY_CD, '') as STOCK_FACTORY_CD,
                    isnull(p1.FACTORY_NAME, '') as STOCK_FACTORY_CD_N
                from
                    ksv_po_mrptempre a
                    left join ksv_order_mst k on k.order_cd = a.order_cd
                    left join kcd_factory k1 on k1.factory_cd = k.factory_cd,
                    kcd_matl_mst c,
                    kcd_vendor d,
                    kcd_code e,
                    ksv_order_mst f,
                    ksv_po_mrptempre_detail g
                    left join ksv_stock_matl p on p.stock_idx = g.stock_idx
                    left join kcd_factory p1 on p1.factory_cd = p.factory_cd
                where
                    a.po_cd = '${args.data.PO_CD}'
                    and a.user_id = '${tUserInfo.USER_ID}'
                    and c.matl_cd = a.matl_cd
                    and d.vendor_cd = c.vendor_cd
                    and e.cd_group = 'DIFF_PO_TYPE'
                    and e.cd_code = a.diff_po_type
                    and a.order_cd = f.order_cd
                    and g.user_id = a.user_id
                    and g.po_cd = a.po_cd
                    and (g.matl_cd = a.matl_cd or g.po_matl_cd = a.matl_cd)
                    and g.order_cd = a.order_cd
                    and g.seq = a.seq
                    and ((a.diff_po_type <> '3') or (a.diff_po_type = '3' and (a.diff_qty-a.stock_qty) <> 0))
                order by
                    d.VENDOR_NAME,
                    a.order_cd,
                    a.matl_cd
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {};
            var tRetArray = [];
            const dedupMap = new Map();
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tObj = { ...tRet[tIdx] };
                /*
          var tLastPoSeq = parseInt(tObj.PO_SEQ) -1;
          var sql1 = `
              select
                  isnull(max(a.send_datetime), '') as send_datetime
              from
                  ksv_mail_log a,
                  kcd_matl_mst b,
                  kcd_vendor c,
                  ksv_po_mrp d
              where
                  a.po_cd = d.po_cd
                  and d.matl_cd = b.matl_cd
                  and b.vendor_cd = c.vendor_cd
                  and a.vendor_cd = c.vendor_cd
                  and d.po_cd = '${args.data.PO_CD}'
                  and d.matl_cd = '${tObj.MATL_CD}'
                  -- and a.po_seq = '${tLastPoSeq}' 
                  and a.po_seq = '${tObj.PO_SEQ}'
          `;
          var nRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
          tObj.SEND_DATETIME = '';
          if (nRet1.length > 0) tObj.SEND_DATETIME = nRet1[0].send_datetime;
*/
                tObj.SEND_DATETIME = '';

                // STOCK_FACTORY_CD, STOCK_FACTORY_CD_N만 다른 중복 건은 1건만 전달
                const { STOCK_FACTORY_CD, STOCK_FACTORY_CD_N, ...keyObj } = tObj;
                const dedupKey = JSON.stringify(keyObj);
                if (!dedupMap.has(dedupKey)) {
                    tObj.STOCK_FACTORY_CD = '';
                    tObj.STOCK_FACTORY_CD_N = '';
                    dedupMap.set(dedupKey, true);
                    tRetArray.push(tObj);
                }
            }

            // Revise 상태는 저정하지 않음. 
            var tRet2 = AFLib2.CommonFunc.UpdateMrpWork(
                tUserInfo.USER_ID,
                args.data.PO_CD,
                '',
            );

            /*
            if (tRetArray.length <= 0) {
                var tRet2 = AFLib2.CommonFunc.UpdateMrpWork(
                    tUserInfo.USER_ID,
                    args.data.PO_CD,
                    '',
                );
            }
            */

            return tRetArray;
        },
    },
};

export default moduleQuery_S030504_1_1;
