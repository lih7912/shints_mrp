import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0517_1 = {
    Query: {
        mgrQueryS0517_CODE: async (_, args) => {
            var tWObj = {};
            const tPoCd = String(args?.data?.PO_CD || '').trim();
            const tSafePoCd = tPoCd.replace(/'/g, "''");

            let sqlStr = `
                select
                    *
                from
                    kcd_buyer
                where
                    status_cd = '0'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.BUYER_CD = '';
            tObj.BUYER_NAME = ' ';
            tRet.unshift(tObj);
            tWObj.BUYER_CD = tRet;

            let sqlPo = `
                select distinct
                    po_cd as PO_CD
                from
                    ksv_stock_matl
                where
                    isnull(po_cd, '') <> ''
                    and left(reg_datetime, 4) >= '2024'
                order by
                    po_cd desc
            `;
            let tRetPo = await prisma.$queryRaw(Prisma.raw(sqlPo));
            tRetPo.unshift({ PO_CD: '' });
            tWObj.PO_CD = tRetPo;

            let tRetOrder = [{ ORDER_CD: '' }];
            if (tSafePoCd !== '') {
                let sqlOrder = `
                    select distinct
                        order_cd as ORDER_CD
                    from
                        ksv_po_mem
                    where
                        po_cd = '${tSafePoCd}'
                        and isnull(order_cd, '') <> ''
                    order by
                        order_cd desc
                `;
                let tRowsOrder = await prisma.$queryRaw(Prisma.raw(sqlOrder));
                tRetOrder = [{ ORDER_CD: '' }, ...tRowsOrder];
            }
            tWObj.ORDER_CD = tRetOrder;

            return tWObj;
        },
    },
};

export default moduleQuery_S0517_1;
