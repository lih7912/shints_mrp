import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

const escapeSqlLiteral = (value = '') => String(value).trim().replace(/'/g, "''");

const escapeSqlLikeLiteral = (value = '') =>
    escapeSqlLiteral(value).replace(/\[/g, '[[');

const buildStockStatusSql = (statusCd = '') => {
    const escapedStatusCd = escapeSqlLiteral(statusCd);
    if (escapedStatusCd === '') {
        return "and a.stock_status in ('3','5','M','Y','F','R','P','C','G','U','I','H','A','N','W','J','K','Q','V','FA','FG','FH','FI','FU','O') ";
    }

    return `and a.stock_status like '${escapedStatusCd}%' `;
};

const buildMatlQuerySql = ({
    matlCdCondition,
    remainQtyCondition,
    factoryCd,
    stockStatusSql,
    rack,
    matlName,
    color,
    spec,
    vendorName,
    matlKind2,
}) => `
    select
        a.po_cd as PO_CD,
        a.order_cd as ORDER_CD,
        a.matl_cd as MATL_CD,
        c.matl_name as MATL_NAME,
        c.color as COLOR,
        c.spec as SPEC,
        c.unit as UNIT,
        a.rack as RACK,
        a.location as LOCATION,
        a.remain_qty as REMAIN_QTY,
        e.vendor_name as VENDOR_NAME,
        a.stock_status as STOCK_STATUS,
        f.factory_name as FACTORY_NAME,
        f.factory_name2 as FACTORY_NAME2,
        a.factory_cd as FACTORY_CD,
        a.remark as REMARK,
        a.plan_remark as PLAN_REMARK,
        a.reason_remark as REASON_REMARK,
        a.po_seq as PO_SEQ,
        a.mrp_seq as MRP_SEQ,
        a.matl_seq as MATL_SEQ,
        d.matl_price as MATL_PRICE,
        d.curr_cd as CURR_CD,
        a.stock_idx as STOCK_IDX,
        a.org_stock_idx as ORG_STOCK_IDX,
        a.root_idx as ROOT_IDX,
        c.matl_type as MATL_TYPE,
        c.matl_type2 as MATL_TYPE2,
        isnull(c1.matl_type2, '') as MATL_TYPE2_N,
        isnull(c2.cd_name, '') as MATL_TYPE_N,
        isnull(a.authority, '') as AUTHORITY,
        isnull(e6.cd_name, '') as STOCK_STATUS_N,
        '0' as USE_QTY
    from
        ksv_stock_matl a
        left join kcd_code e6 on e6.cd_code = a.stock_status and e6.cd_group = 'STOCK_STATUS_S'
        join kcd_matl_mst c on c.matl_cd = a.matl_cd
        join kcd_matl_mem d on d.matl_cd = a.matl_cd and d.matl_seq = a.matl_seq
        join kcd_vendor e on e.vendor_cd = c.vendor_cd
        join kcd_factory f on f.factory_cd = a.factory_cd
        left join kcd_matl_type2 c1 on c1.seq = c.matl_type2
        left join kcd_code c2 on c2.cd_code = c.matl_type and c2.cd_group = 'MATL_TYPE'
    where
        a.factory_cd like '${factoryCd}%'
        ${stockStatusSql}
        and ${matlCdCondition}
        and a.remain_qty ${remainQtyCondition}
        and a.rack like '%${rack}%'
        and c.matl_name like '%${matlName}%' escape '['
        and c.color like '%${color}%'
        and c.spec like '%${spec}%'
        and c.matl_type2 like '%${matlKind2}%'
        and e.vendor_name like '%${vendorName}%'
    order by
        c.matl_name,
        a.matl_cd
`;

const decorateRows = (rows = []) =>
    rows.map((row) => ({
        ...row,
        STOCK_STATUS_N: `${row.STOCK_STATUS || ''} ${row.STOCK_STATUS_N || ''}`.trim(),
    }));

// export default로 Query 내용 내보내기
const moduleQuery_S030503_2 = {
    Query: {
        mgrQueryS030503_2: async (_, args) => {
            const data = args.data || {};
            const matlCd = escapeSqlLiteral(data.MATL_CD || '');
            const matlName = escapeSqlLikeLiteral(data.MATL_NAME || '').replace(/\s+/g, '%');
            const color = escapeSqlLiteral(data.COLOR || '');
            const rack = escapeSqlLiteral(data.RACK || '');
            const factoryCd = escapeSqlLiteral(data.FACTORY_CD || '');
            const spec = escapeSqlLiteral(data.SPEC || '');
            const vendorName = escapeSqlLiteral(data.VENDOR_CD || '');
            const matlKind2 = escapeSqlLiteral(data.MATL_KIND2 || '');
            const stockStatusSql = buildStockStatusSql(data.STATUS_CD || '');

            const firstQuerySql = buildMatlQuerySql({
                matlCdCondition: `a.matl_cd like '%${matlCd}%'`,
                remainQtyCondition: '>= 1',
                factoryCd,
                stockStatusSql,
                rack,
                matlName,
                color,
                spec,
                vendorName,
                matlKind2,
            });

            const secondQuerySql = buildMatlQuerySql({
                matlCdCondition: `c.rep_matl_cd like '%${matlCd}%' and c.rep_matl_cd <> a.matl_cd`,
                remainQtyCondition: '> 0',
                factoryCd,
                stockStatusSql,
                rack,
                matlName,
                color,
                spec,
                vendorName,
                matlKind2,
            });

            const firstRows = await prisma.$queryRaw(Prisma.raw(firstQuerySql));
            const firstStockIdxSet = new Set(
                firstRows.map((row) => String(row.STOCK_IDX || '')),
            );

            const secondRows = await prisma.$queryRaw(Prisma.raw(secondQuerySql));
            const dedupedSecondRows = secondRows.filter(
                (row) => !firstStockIdxSet.has(String(row.STOCK_IDX || '')),
            );

            const mergedRows = decorateRows([...firstRows, ...dedupedSecondRows]);
            console.log(`Recount: ${mergedRows.length}`);

            return mergedRows;
        },

        mgrQueryS030503_2_FACTORY_BY_STOCK_IDX: async (_, args) => {
            const stockIdx = String(args.data.STOCK_IDX || '').trim().replace(/'/g, "''");
            if (!stockIdx) {
                return [];
            }

            const sqlStr = `
                select
                    a.factory_cd as FACTORY_CD,
                    b.factory_name2 as FACTORY_NAME2,
                    a.stock_idx as STOCK_IDX
                from
                    ksv_stock_matl a,
                    kcd_factory b
                where
                    a.stock_idx = '${stockIdx}'
                    and b.factory_cd = a.factory_cd
            `;

            const tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            return tRet;
        },
    },
};

export default moduleQuery_S030503_2;
