import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기

// export default로 Query 내용 내보내기
const moduleQuery_S030504 = {
    Query: {
        mgrQueryS030504: async (_, args) => {
            var tSQL = '';
            if (args.data.PO_SEQ !== '') {
                tSQL += `AND a.po_seq = '${args.data.PO_SEQ}' `;
            }
            let sqlStr = `
                select distinct
                    g.ORDER_CD,
                    c.STYLE_NAME,
                    d.BUYER_NAME,
                    b.TOT_CNT,
                    b.DUE_DATE,
                    e.FACTORY_NAME,
                    g.CONS_F,
                    g.CONS_A,
                    b.FACTORY_CD,
                    f.cd_name as ORDER_STATUS_N,
                    b.ORDER_STATUS
                from
                    -- ksv_po_mrp a,
                    ksv_po_mst a,
                    ksv_order_mst b,
                    kcd_style c,
                    kcd_buyer d,
                    kcd_factory e,
                    kcd_code f,
                    ksv_po_mem g
                where
                    a.po_cd = '${args.data.PO_CD}' ${tSQL}
                    and a.po_seq = g.po_seq
                    and a.po_cd = g.po_cd
                    and g.order_cd = b.order_cd
                    and c.style_cd = b.style_cd
                    and d.buyer_cd = left(g.order_cd, 2)
                    and e.factory_cd = b.factory_cd
                    and b.order_status = f.cd_code
                    and f.cd_group = 'ORDER_STATUS'
                order by
                    g.order_cd
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                ORDER_CD: '',
                STYLE_NAME: '',
                BUYER_NAME: '',
                TOT_CNT: 0,
                DUE_DATE: '',
                FACTORY_NAME: '',
                CONS_F: '',
                CONS_A: '',
                FACTORY_CD: '',
                ORDER_STATUS_N: '',
                ETC99: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
        mgrQueryS030504_CODE: async (_, args) => {
            var tWObj = {};

            let sqlStr = `
                select
                    *
                from
                    KSV_PO_MST
                where
                    po_cd = '${args.data.PO_CD}'
                    -- and po_seq < 100
            `;
            let tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tArray = [];
            var tObj = {};
            tObj.CD_CODE = '';
            tObj.CD_NAME = ' ';
            tArray.push(tObj);
            tRet0.forEach((col, i) => {
                var tObj = {};
                tObj.CD_CODE = col.PO_SEQ;
                tObj.CD_NAME = col.PO_SEQ;
                tArray.push(tObj);
            });
            tWObj.PO_SEQ = tArray;

            let sqlStr = `
                select
                    *
                from
                    kcd_code
                where
                    cd_group = 'SEQ_REASON'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tObj = {};
            tObj.CD_CODE = '';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.SEQ_REASON = tRet;

            return tWObj;
        },
    },
};

export default moduleQuery_S030504;
