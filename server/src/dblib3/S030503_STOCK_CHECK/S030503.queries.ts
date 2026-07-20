import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S030503 = {
    Query: {
        mgrQueryS030503: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }
            let sqlStr = `
                select
                    kk.*,
                    isnull(kk1.CD_NAME, '') as PO_LOG_TYPE_N
                from
                    (
                        select
                            a.ORDER_CD,
                            c.STYLE_NAME,
                            d.BUYER_NAME,
                            b.TOT_CNT,
                            b.DUE_DATE,
                            e.FACTORY_NAME,
                            b.FACTORY_CD,
                            isnull(f.PO_LOG_TYPE, '') as PO_LOG_TYPE
                        from
                            ksv_po_mem a
                            left join ksv_po_log f on f.po_cd = '${args.data.PO_CD}'
                            and f.po_seq = '${args.data.PO_SEQ}'
                            and f.fix_flag = '1'
                            and f.po_cd = a.po_cd
                            and f.po_seq = a.po_seq,
                            ksv_order_mst b,
                            kcd_style c,
                            kcd_buyer d,
                            kcd_factory e
                        where
                            a.po_cd = '${args.data.PO_CD}'
                            and a.po_seq = '${args.data.PO_SEQ}'
                            and b.order_cd = a.order_cd
                            and c.style_cd = b.style_cd
                            and d.buyer_cd = left(a.order_cd, 2)
                            and e.factory_cd = b.factory_cd
                    ) kk
                    left join kcd_code kk1 on kk1.cd_code = kk.PO_LOG_TYPE
                    and kk1.cd_group = 'PO_LOG_TYPE'
                order by
                    kk.order_cd
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                ORDER_CD: '',
                STYLE_NAME: '',
                BUYER_NAME: '',
                TOT_CNT: 0,
                DUE_DATE: '',
                FACTORY_NAME: '',
                FACTORY_CD: '',
                ETC99: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
        mgrQueryS030503_CODE: async (_, args) => {
            var tSQL = '';

            var tWObj = {};

            /*
       let tSQL = `
           select
               *
           from
               KCD_VENDOR
       `;	
       let tRet  =  await prisma.$queryRaw(Prisma.raw(tSQL));
       let tObj = {};
       tObj.VENDOR_CD = ' ';
       tObj.VENDOR_NAME = ' ';
       tRet.unshift(tObj);
*/
            tWObj.VENDOR_CD = [];

            let tSQL = `
                select
                    *
                from
                    KCD_FACTORY
                where
                    factory_cd in ('FC034', 'FC044', 'FC010')
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(tSQL));
            let tObj = {};
            tObj.FACTORY_CD = '';
            tObj.FACTORY_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.FACTORY_CD = tRet;

            let tSQL = `
                select
                    *
                from
                    KCD_MATL_TYPE2
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(tSQL));
            let tObj = {};
            tObj.SEQ = '';
            tObj.MATL_TYPE2 = ' ';
            tObj.BVT_MATL_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.TYPE2 = tRet;

            let tSQL = `
                select
                    *
                from
                    KCD_CODE
                where
                    cd_group = 'ORDER_STATUS'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(tSQL));
            let tObj = {};
            tObj.CD_CODE = '';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.PO_STATUS = tRet;

            let tSQL = `
                select
                    *
                from
                    KCD_CODE
                where
                    cd_group = 'STATUS_CD'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(tSQL));
            let tObj = {};
            tObj.CD_CODE = '';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.STATUS_CD = tRet;

            let tSQL = `
                select
                    *
                from
                    ksv_po_mst
                where
                    po_cd = '${args.data.PO_CD}'
                    and po_seq = 1
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(tSQL));
            tWObj.PO_MST = tRet;

            let tSQL = `
                select
                    *
                from
                    ksv_po_mst
                where
                    po_cd = '${args.data.PO_CD}'
            `;
            let tRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
            let tRet = [];
            tRet0.forEach((col, i) => {
                var tObj = {};
                tObj.PO_SEQ = col.PO_SEQ;
                tObj.PO_SEQ_N = col.PO_SEQ;
                tRet.push(tObj);
            });
            tWObj.PO_SEQ = tRet;

            let tSQL = `
                select
                    *
                from
                    KCD_CODE
                where
                    cd_group = 'PO_LOG_TYPE'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(tSQL));
            let tObj = {};
            tObj.CD_CODE = '';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.PO_LOG_TYPE = tRet;

            return tWObj;
        },
    },
};

export default moduleQuery_S030503;
