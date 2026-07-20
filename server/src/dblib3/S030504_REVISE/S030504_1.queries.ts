import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기

// export default로 Query 내용 내보내기
const moduleQuery_S030504_1 = {
    Query: {
        mgrQueryS030504_1: async (_, args) => {
            var tSQL = '';
            if (args.data.PO_SEQ !== '') {
                tSQL += `AND a.po_seq = ${args.data.PO_SEQ} `;
            }

            let sqlStr = `
                select
                    a.PO_SEQ,
                    a.ORDER_CD,
                    a.MATL_CD,
                    c.MATL_NAME,
                    c.COLOR,
                    c.SPEC,
                    isnull(b.cd_name, '') as USE_PO_TYPE_N,
                    a.USE_QTY,
                    a.PO_QTY,
                    0 as OLD_QTY,
                    0 as NEW_QTY,
                    0 as DIFF_QTY,
                    isnull(e.cd_name, '') as DIFF_PO_TYPE_N,
                    d.VENDOR_NAME,
                    a.MRP_SEQ,
                    a.MATL_SEQ,
                    a.MATL_PRICE,
                    a.CURR_CD,
                    a.TOT_AMT,
                    a.USE_SIZE,
                    '' as ORDER_STATUS,
                    0 as SEQ,
                    a.USE_PO_TYPE,
                    a.DIFF_PO_TYPE,
                    c.VENDOR_CD,
                    isnull(f.ORDER_STATUS, '') as ORDER_STATUS
                from
                    ksv_po_mrp a
                    left join kcd_code b on b.cd_group = 'USE_PO_TYPE'
                    and b.cd_code = a.use_po_type
                    left join kcd_code e on e.cd_group = 'DIFF_PO_TYPE'
                    and e.cd_code = a.diff_po_type
                    left join ksv_order_mst f on a.order_cd = f.order_cd,
                    kcd_matl_mst c,
                    kcd_vendor d
                where
                    a.po_cd = '${args.data.PO_CD}' ${tSQL}
                    and a.order_cd like '%${args.data.ORDER_CD}%'
                    and c.matl_cd = a.matl_cd
                    and d.vendor_cd = c.vendor_cd
                order by
                    a.order_cd,
                    a.po_seq,
                    a.matl_cd
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {};

            var tRetArray = [];
            var tIdx = 0;
            /*
       for (tIdx =0; tIdx < tRet.length; tIdx++) {
          var tObj = { ...tRet[tIdx] };
          var tLastPoSeq = parseInt(tObj.PO_SEQ);
          var sql1 = `
              select
                  isnull(max(a.send_datetime), '') as send_datetime,
                  isnull(max(a.po_seq), 0) as po_seq
              from
                  ksv_mail_log a
              where
                  a.po_cd = '${args.data.PO_CD}'
                  -- and a.po_seq = '${tLastPoSeq}' 
                  and a.vendor_cd = '${tObj.VENDOR_CD}'
          `;
          var nRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
          tObj.SEND_DATETIME = '';
          if (nRet1.length > 0) tObj.SEND_DATETIME = nRet1[0].send_datetime;
          tRetArray.push(tObj);
       }
*/

            var tWObj = {};
            tWObj.DATA1 = [...tRet];

            let sql1 = `
                select
                    isnull(BUYER, '0') as BUYER_CHK,
                    isnull(SALES, '0') as SALES_CHK,
                    isnull(MATL, '0') as MATL_CHK,
                    isnull(CAD, '0') as CAD_CHK,
                    isnull(MRP, '0') as MRP_CHK,
                    isnull(MRP2, '0') as MRP2_CHK,
                    isnull(ETC, '0') as ETC_CHK,
                    isnull(SEQ_REASON, '') as SEQ_REASON,
                    isnull(SEQ_COMMENT, '') as SEQ_COMMENT,
                    isnull(APPROVAL, '') as APPROVAL
                from
                    ksv_po_reason
                where
                    po_cd = '${args.data.PO_CD}'
                    and po_seq = '${args.data.PO_SEQ}'
            `;
            var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));

            var tObj = { ...tRet1[0] };
            let sql2 = `
                select
                    top 1 seq_comment
                from
                    ksv_po_mrp
                where
                    po_cd = '${args.data.PO_CD}'
                    and po_seq = '${args.data.PO_SEQ}'
            `;
            var tRet2 = await prisma.$queryRaw(Prisma.raw(sql2));
            if (tRet2.length > 0) tObj.SEQ_COMMENT = tRet2[0].seq_comment;

            tWObj.DATA2 = [];
            tWObj.DATA2.push(tObj);

            return tWObj;
        },
    },
};

export default moduleQuery_S030504_1;
