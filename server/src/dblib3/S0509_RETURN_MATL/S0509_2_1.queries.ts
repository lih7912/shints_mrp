import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0509_2_1 = {
    Query: {
        mgrQueryS0509_2_1: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }
            let sqlStr = `
                select
                    *
                from
                    ksv_stock_mem
                where
                    po_cd = '${args.data.PO_CD}'
                    and vendor_cd = '${args.data.VENDOR_CD}'
                    and matl_cd = '${args.data.MATL_CD}'
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                PO_CD: '',
                PO_SEQ: 0,
                ORDER_CD: '',
                MATL_CD: '',
                MRP_SEQ: 0,
                MATL_SEQ: 0,
                PO_QTY: 0,
                IN_QTY: 0,
                OUT_QTY: 0,
                INFAC_QTY: 0,
                OUTFAC_QTY: 0,
                STOCK_QTY: 0,
                REMAIN_QTY: 0,
                USE_QTY: 0,
                FACTORY_CD: '',
                DIFF_PO_TYPE: '',
                DIFF_QTY: 0,
                STOCK_STATUS: '',
                STOCK_DATE: '',
                WARE_CD: '',
                WARE_DATE: '',
                WARE_QTY: 0,
                RACK: '',
                STATUS_CD: '',
                REG_USER: '',
                REG_DATETIME: '',
                TEMP_PRICE: '',
                PAY_EXP_DATE: '',
                MIN_ORDER: '',
                vendor_cd: '',
                lc_qty: 0,
                min_conf_user: '',
                min_conf_datetime: '',
                min_stock_idx: '',
                id: 0,
                PU_CD: '',
                MOQ: 0,
                PO_QTY2: 0,
                CURR_CD: '',
                MASTER_PRICE: 0,
                FREIGHT_PRICE: 0,
                OTHER_PRICE: 0,
                SURCHARGE_REMARK: '',
                PO_PRICE: 0,
                MOQ_PRICE: 0,
                LEFTOVER_QTY: 0,
                FOC_QTY: 0,
                MOQ_STOCK_IDX: '',
                FOC_STOCK_IDX: '',
                LEFTOVER_STOCK_IDX: '',
                ETC99: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S0509_2_1;
