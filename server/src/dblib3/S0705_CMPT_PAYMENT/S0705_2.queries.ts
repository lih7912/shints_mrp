import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0705_2 = {
    Query: {
        mgrQueryS0705_2: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }
            let sqlStr = `
                select distinct
                    '제품매출' as STATUS_NAME,
                    a.INVOICE_NO,
                    a.SHIP_DATE,
                    a.DELIVERY_TYPE,
                    '' as CI_NO,
                    FACTORY_CD as FROM_PORT,
                    '' as FROM_PORT_N,
                    'SHINTS' as TO_PORT,
                    a.ORD_AMT,
                    a.TOT_AMT,
                    '' as TOT_AMT_WON,
                    a.DOCU_NO,
                    a.CURR_CD,
                    isnull(a.VAT_AMT, 0) as VAT_AMT
                from
                    ksv_invoice_mst a,
                    ksv_order_ship b
                where
                    a.invoice_no = b.invoice_no
                    and a.buyer_cd like '%${args.data.BUYER_CD}%'
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                INVOICE_NO: '',
                BUYER_CD: '',
                SHIP_DATE: '',
                NAT_CD: '',
                SHIP_PTYPE: '',
                SHIP_QTY: 0,
                BUYER_NAME: '',
                BL_FILE: '',
                PL_FILE: '',
                DEBIT_FILE: '',
                ETC99: '',
            };
            var tRetArray = [];
            tRet.forEach((col, i) => {
                var tObj = { ...col };
                if (tObj.FROM_PORT === 'FC034') {
                    tObj.FROM_PORT_N = 'BVT';
                } else if (tObj.FROM_PORT === 'FC044') {
                    tObj.FROM_PORT_N = 'ETP';
                } else {
                    tObj.FROM_PORT_N = 'ETC';
                }
                tRetArray.push(tObj);
            });
            var tIdx = 0;
            return tRetArray;
        },
    },
};

export default moduleQuery_S0705_2;
