import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
import AFLib2 from '../../po_adjust'; //PrismaClient 사용하기 위해 불러오기

// export default로 Query 내용 내보내기
const moduleQuery_S030504_2 = {
    Query: {
        mgrQueryS030504_2: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }

            var tSQL1 = '';
            if (
                typeof args.data.PO_SEQ !== 'undefined' &&
                typeof args.data.PO_SEQ === 'null'
            ) {
                tSQL1 += `and e.seq = '%${args.data.PO_SEQ}%' `;
            }

            let sqlStr = `
                select
                    e.*,
                    f.cd_name as DIFF_RE_TYPE_N,
                    c.MATL_NAME,
                    c.COLOR,
                    c.SPEC
                from
                    ksv_po_mrptempre_detail e,
                    kcd_matl_mst c,
                    kcd_code f
                where
                    e.po_cd = '${args.data.PO_CD}'
                    and e.po_seq = '${args.data.PO_SEQ}'
                    and e.order_cd = '${args.data.ORDER_CD}'
                    and( e.matl_cd = '${args.data.MATL_CD}' or e.po_matl_cd = '${args.data.MATL_CD}')
                    -- and   e.mrp_seq = '${args.data.MRP_SEQ}'
                    and e.seq = '${args.data.SEQ}'
                    and e.user_id = '${tUserInfo.USER_ID}'
                    and c.matl_cd = e.matl_cd
                    and f.cd_group = 'DIFF_RE_TYPE'
                    and f.cd_code = e.diff_re_type
                order by
                    e.po_seq desc,
                    e.diff_re_type
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                USER_ID: '',
                SEQ: 0,
                PO_CD: '',
                PO_SEQ: 0,
                ORDER_CD: '',
                MATL_CD: '',
                MRP_SEQ: 0,
                DIFF_RE_TYPE: '',
                DIFF_RE_QTY: 0,
                MATL_SEQ: 0,
                MATL_PRICE: 0,
                CURR_CD: '',
                TOT_AMT: 0,
                USE_SIZE: '',
                bef_po_qty: 0,
                use_stock_qty: 0,
                stock_idx: '',
                root_idx: '',
                factory_cd: '',
                org_po_seq: 0,
                po_matl_cd: '',
                id: 0,
                DIFF_RE_TYPE_N: '',
                MATL_NAME: '',
                COLOR: '',
                SPEC: '',
                ETC99: '',
            };
            var tRetArray = [];
            /*
       var tIdx = 0; 
       if (tRet.length <= 0) {
           var tRet4  = AFLib2.CommonFunc.DeleteMrpWork(tUserInfo.USER_ID, args.data.PO_CD);
       }
       */
            return tRet;
        },
    },
};

export default moduleQuery_S030504_2;
