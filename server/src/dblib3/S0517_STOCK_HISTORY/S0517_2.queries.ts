import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
const Excel = require('exceljs');
const fs = require('fs');
const { upload } = require('../../../routes/s3');

// export default로 Query 내용 내보내기
const moduleQuery_S0517_2 = {
    Query: {
        mgrQueryS0517_2_EXCEL_PRINT: async (_, args, contextValue) => {
            const tRetObj = { id: 0, CODE: '' };
            try {
                var tRetDate = AFLib.getCurrTime();
                var tUserInfo = AFLib.getUserInfo(contextValue);
                var tStockIdx = String(args.data.STOCK_IDX || '').trim();

                if (tStockIdx === '') {
                    tRetObj.CODE = 'ERROR:STOCK_IDX is required';
                    return [tRetObj];
                }

                let sql0 = `
                    select
                        root_idx
                    from
                        ksv_stock_matl
                    where
                        stock_idx = '${tStockIdx}'
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                if (tRet0.length <= 0) {
                    tRetObj.CODE = 'ERROR:STOCK_IDX not found';
                    return [tRetObj];
                }

                var tRootIdx = String(tRet0[0].root_idx || '').trim();
                if (tRootIdx === '') {
                    tRootIdx = tStockIdx;
                }

                let sql100 = `
                    select top 1
                        a.MATL_CD,
                        c.VENDOR_NAME,
                        b.MATL_NAME,
                        b.COLOR,
                        b.SPEC,
                        b.UNIT
                    from
                        ksv_stock_matl a,
                        kcd_matl_mst b,
                        kcd_vendor c
                    where
                        a.root_idx = '${tRootIdx}'
                        and a.matl_cd = b.matl_cd
                        and b.vendor_cd = c.vendor_cd
                    order by
                        a.stock_idx
                `;
                var tRet100 = await prisma.$queryRaw(Prisma.raw(sql100));
                var tInfoObj = {
                    MATL_CD: '',
                    VENDOR_NAME: '',
                    MATL_NAME: '',
                    COLOR: '',
                    SPEC: '',
                    UNIT: '',
                };
                if (tRet100.length > 0) {
                    tInfoObj = { ...tInfoObj, ...tRet100[0] };
                }

                var sql1 = `
                    select
                        a.STOCK_IDX,
                        a.ORG_STOCK_IDX,
                        a.PO_CD,
                        a.ORDER_CD,
                        a.MATL_CD,
                        a.STOCK_DATE,
                        left(a.reg_datetime, 8) as REG_DATETIME,
                        b.cd_name as STOCK_STATUS_S_N,
                        a.STOCK_STATUS_2,
                        a.STOCK_QTY,
                        a.REMAIN_QTY,
                        a.USE_QTY,
                        a.OUT_QTY,
                        a.REG_USER,
                        a.REMARK,
                        '' as USE_PO_CD,
                        '' as USE_PO_SEQ,
                        '' as USE_ORDER_CD,
                        '' as USE_QTY2,
                        '' as USE_DATETIME
                    from
                        ksv_stock_matl a,
                        kcd_code b
                    where
                        a.root_idx = '${tRootIdx}'
                        and b.cd_group = 'STOCK_STATUS_S'
                        and b.cd_code = a.stock_status
                    order by
                        a.stock_idx
                `;
                var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));

                var tRetArray = [];
                for (var tIdx = 0; tIdx < tRet1.length; tIdx++) {
                    var tOne = { ...tRet1[tIdx] };

                    let sql2 = `
                        select
                            use_po_cd,
                            use_po_seq,
                            use_order_cd,
                            use_qty,
                            use_datetime
                        from
                            ksv_stock_use
                        where
                            stock_idx = '${tOne.STOCK_IDX}'
                        order by
                            use_datetime
                    `;
                    var tRet2 = await prisma.$queryRaw(Prisma.raw(sql2));
                    tRet2.forEach((col, i) => {
                        var tOne1 = { ...tOne };
                        if (i > 0) {
                            var tCols = Object.keys(tOne1);
                            tCols.forEach((col1) => {
                                tOne1[`${col1}`] = '';
                            });
                        }
                        tOne1.USE_PO_CD = col.use_po_cd;
                        tOne1.USE_PO_SEQ = col.use_po_seq;
                        tOne1.USE_ORDER_CD = col.use_order_cd;
                        tOne1.USE_QTY2 = col.use_qty;
                        tOne1.USE_DATETIME = col.use_datetime;
                        tRetArray.push(tOne1);
                    });

                    if (tRet2.length <= 0) tRetArray.push(tOne);
                }

                const wb = new Excel.Workbook();
                const ws = wb.addWorksheet('Stock History');

                const tHeaders = [
                    'Idx',
                    'OrgIdx',
                    'Po',
                    'Order',
                    'Matl',
                    'Stock Date',
                    'Reg Date',
                    'Stock Status',
                    'Stock Status2',
                    'Stock Qty',
                    'Remain',
                    'Use Qty',
                    'Out Qty',
                    'User',
                    'Remark',
                    'Use Po',
                    'use po seq',
                    'Use Order',
                    'Use Qty',
                    'Use Date',
                ];

                const tStartCol = 1;
                const tEndCol = tHeaders.length;
                const tTitleRow = 1;
                const tInfoStartRow = 3;
                const tHeaderRow = 10;
                const tDataStartRow = tHeaderRow + 1;

                ws.mergeCells(tTitleRow, tStartCol, tTitleRow, tEndCol);
                ws.getCell(tTitleRow, tStartCol).value = 'STOCK HISTORY LIST';
                ws.getCell(tTitleRow, tStartCol).alignment = {
                    vertical: 'middle',
                    horizontal: 'center',
                };
                ws.getCell(tTitleRow, tStartCol).font = {
                    name: '돋움체',
                    size: 16,
                    bold: true,
                };

                const tInfoRows = [
                    { label: 'MATL CD', value: String(tInfoObj.MATL_CD || '') },
                    { label: 'SUPPLIER', value: String(tInfoObj.VENDOR_NAME || '') },
                    { label: 'DESCRIPTION', value: String(tInfoObj.MATL_NAME || '') },
                    { label: 'COLOR', value: String(tInfoObj.COLOR || '') },
                    { label: 'SPEC', value: String(tInfoObj.SPEC || '') },
                    { label: 'UNIT', value: String(tInfoObj.UNIT || '') },
                ];

                tInfoRows.forEach((r, i) => {
                    const tRow = tInfoStartRow + i;
                    ws.getCell(tRow, 1).value = `${r.label} :`;
                    ws.getCell(tRow, 1).font = { name: '돋움체', size: 10, bold: true };
                    ws.mergeCells(tRow, 2, tRow, 6);
                    ws.getCell(tRow, 2).value = r.value;
                    ws.getCell(tRow, 2).font = { name: '돋움체', size: 10 };
                    ws.getCell(tRow, 2).alignment = {
                        vertical: 'middle',
                        horizontal: 'left',
                    };
                });

                ws.getRow(tHeaderRow).values = tHeaders;
                ws.getRow(tHeaderRow).font = {
                    name: '돋움체',
                    size: 10,
                    bold: true,
                };
                ws.getRow(tHeaderRow).alignment = {
                    vertical: 'middle',
                    horizontal: 'center',
                    wrapText: true,
                };

                for (let c = tStartCol; c <= tEndCol; c++) {
                    const tCell = ws.getCell(tHeaderRow, c);
                    tCell.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: 'FFD9E1F2' },
                    };
                    tCell.border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' },
                    };
                }

                tRetArray.forEach((row) => {
                    ws.addRow([
                        row.STOCK_IDX,
                        row.ORG_STOCK_IDX,
                        row.PO_CD,
                        row.ORDER_CD,
                        row.MATL_CD,
                        row.STOCK_DATE,
                        row.REG_DATETIME,
                        row.STOCK_STATUS_S_N,
                        row.STOCK_STATUS_2,
                        row.STOCK_QTY,
                        row.REMAIN_QTY,
                        row.USE_QTY,
                        row.OUT_QTY,
                        row.REG_USER,
                        row.REMARK,
                        row.USE_PO_CD,
                        row.USE_PO_SEQ,
                        row.USE_ORDER_CD,
                        row.USE_QTY2,
                        row.USE_DATETIME,
                    ]);
                });

                for (let r = tDataStartRow; r < tDataStartRow + tRetArray.length; r++) {
                    for (let c = tStartCol; c <= tEndCol; c++) {
                        const tCell = ws.getCell(r, c);
                        tCell.font = { name: '돋움체', size: 10 };
                        tCell.alignment = {
                            vertical: 'middle',
                            horizontal: c >= 10 && c <= 13 ? 'right' : 'left',
                        };
                        tCell.border = {
                            top: { style: 'thin' },
                            left: { style: 'thin' },
                            bottom: { style: 'thin' },
                            right: { style: 'thin' },
                        };
                    }
                }

                ws.views = [{ state: 'frozen', ySplit: tHeaderRow }];

                const tWidths = [16, 16, 12, 14, 14, 12, 12, 14, 12, 12, 12, 12, 12, 12, 20, 12, 12, 14, 12, 16];
                tWidths.forEach((w, i) => {
                    ws.getColumn(i + 1).width = w;
                });

                var tWExcelFile = `StockHistory-${tStockIdx}-${tUserInfo.USER_ID}-${tRetDate}`;
                tWExcelFile = tWExcelFile.replace(/[\\/:*?"<>|]/g, ' ');

                return await upload(`${tWExcelFile}.xlsx`, wb);
            } catch (error) {
                tRetObj.CODE = `ERROR:${error.message}`;
                return [tRetObj];
            }
        },

        mgrQueryS0517_2: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tStockIdx = args.data.STOCK_IDX;
            var tRootIdx = '';
            var tOrgStockIdx = '';
            let sql0 = `
                select
                    root_idx,
                    org_stock_idx
                from
                    ksv_stock_matl
                where
                    stock_idx = '${tStockIdx}'
            `;
            var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            if (tRet0.length > 0) {
                tRootIdx = tRet0[0].root_idx;
                tOrgStockIdx = tRet0[0].org_stock_idx;
                /*
             if (tRootIdx === args.data.STOCK_IDX)  tRootIdx = '';
             if (tOrgStockIdx === args.data.STOCK_IDX)  tOrgStockIdx = '';
             */
            }

            let sql100 = `
                select
                    a.MATL_CD,
                    a.STOCK_IDX,
                    c.VENDOR_NAME,
                    a.PO_CD,
                    a.ORDER_CD,
                    b.MATL_NAME,
                    b.COLOR,
                    b.SPEC,
                    b.UNIT,
                    left(a.ORDER_CD, 2) as BUYER_CD
                from
                    ksv_stock_matl a,
                    kcd_matl_mst b,
                    kcd_vendor c
                where
                    a.root_idx = '${tRootIdx}'
                    and a.matl_cd = b.matl_cd
                    and b.vendor_cd = c.vendor_cd
            `;
            var tRet100 = await prisma.$queryRaw(Prisma.raw(sql100));
            var tRootObj = { ...tRet100[0] };

            sql0 = `
                select
                    sum(a.stock_qty) as s_stock_qty,
                    sum(a.remain_qty) as s_remain_qty,
                    sum(a.use_qty) as s_use_qty,
                    sum(a.out_qty) as s_out_qty
                from
                    ksv_stock_matl a
                where
                    a.root_idx = '${tRootIdx}'
            `;
            tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            var tSumStockQty = 0;
            var tSumRemainQty = 0;
            var tSumUseQty = 0;
            var tSumOutQty = 0;
            if (tRet0.length > 0) {
                tSumStockQty = tRet0[0].s_stock_qty;
                tSumRemainQty = tRet0[0].s_remain_qty;
                tSumUseQty = tRet0[0].s_use_qty;
                tSumOutQty = tRet0[0].s_out_qty;
            }
            tRootObj.STOCK_QTY = String(tSumStockQty);
            tRootObj.REMAIN_QTY = String(tSumRemainQty);
            tRootObj.USE_QTY = String(tSumUseQty);
            tRootObj.OUT_QTY = String(tSumOutQty);

            var sql1 = `
                select
                    a.STOCK_IDX,
                    a.ORG_STOCK_IDX,
                    a.PO_CD,
                    a.ORDER_CD,
                    a.MATL_CD,
                    a.STOCK_DATE,
                    left(a.reg_datetime, 8) as REG_DATETIME,
                    b.cd_name as STOCK_STATUS_S_N,
                    a.STOCK_STATUS_2,
                    a.STOCK_QTY,
                    a.REMAIN_QTY,
                    a.USE_QTY,
                    a.OUT_QTY,
                    a.REG_USER,
                    a.REMARK,
                    '' as USE_PO_CD,
                    '' as USE_PO_SEQ,
                    '' as USE_ORDER_CD,
                    '' as USE_QTY2,
                    '' as USE_DATETIME
                from
                    ksv_stock_matl a,
                    kcd_code b
                where
                    a.root_idx = '${tRootIdx}'
                    and b.cd_group = 'STOCK_STATUS_S'
                    and b.cd_code = a.stock_status
                order by
                    a.stock_idx
            `;
            var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));

            var tRetArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet1.length; tIdx++) {
                var tOne = { ...tRet1[tIdx] };

                let sql2 = `
                    select
                        use_po_cd,
                        use_po_seq,
                        use_order_cd,
                        use_qty,
                        use_datetime
                    from
                        ksv_stock_use
                    where
                        stock_idx = '${tOne.STOCK_IDX}'
                    order by
                        use_datetime
                `;
                var tRet2 = await prisma.$queryRaw(Prisma.raw(sql2));
                tRet2.forEach((col, i) => {
                    var tOne1 = { ...tOne };
                    if (i > 0) {
                        var tCols = Object.keys(tOne1);
                        tCols.forEach((col1, i1) => {
                            tOne1[`${col1}`] = '';
                        });
                    }
                    tOne1.USE_PO_CD = col.use_po_cd;
                    tOne1.USE_PO_SEQ = col.use_po_seq;
                    tOne1.USE_ORDER_CD = col.use_order_cd;
                    tOne1.USE_QTY2 = col.use_qty;
                    tOne1.USE_DATETIME = col.use_datetime;
                    tRetArray.push(tOne1);
                });

                if (tRet2.length <= 0) tRetArray.push(tOne);
            }

            var tWObj = {};
            tWObj.DATAS = [...tRetArray];
            tWObj.INFO = { ...tRootObj };

            return tWObj;
        },
        mgrQueryS0517_2_bak: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tRootIdx = '';
            var tOrgStockIdx = '';
            if (args.data.STOCK_IDX !== '') {
                let sql0 = `
                    select
                        root_idx,
                        org_stock_idx
                    from
                        ksv_stock_matl
                    where
                        stock_idx = '${args.data.STOCK_IDX}'
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                if (tRet0.length > 0) {
                    tRootIdx = tRet0[0].root_idx;
                    tOrgStockIdx = tRet0[0].org_stock_idx;
                    if (tRootIdx === args.data.STOCK_IDX) tRootIdx = '';
                    if (tOrgStockIdx === args.data.STOCK_IDX) tOrgStockIdx = '';
                }
            }
            var tSQL = '';
            if (tRootIdx !== '') {
                tSQL = `or  E.STOCK_IDX like '%${tRootIdx}%' `;
            }
            if (tOrgStockIdx !== '') {
                tSQL = `or  E.STOCK_IDX like '%${tOrgStockIdx}%' `;
            }

            var tSQL1 = '';
            var sStockDate = args.data.S_DATE;
            var eStockDate = tRetDate1;
            if (args.data.S_DATE !== '') {
                tSQL1 += `AND left(E.STOCK_DATE, 8) between '${sStockDate}' and '${eStockDate}'  `;
            }

            let sqlStr = `
                SELECT
                    top 1000 E.PO_CD,
                    E.PO_SEQ,
                    A.MATL_CD,
                    E.ORDER_CD,
                    A.MATL_NAME,
                    A.COLOR,
                    A.SPEC,
                    A.UNIT,
                    E.STOCK_QTY,
                    E.REMAIN_QTY,
                    E.STOCK_STATUS,
                    E.RACK,
                    E.LOCATION,
                    E.REASON_REMARK,
                    isnull(e3.cd_name, '') as REASON_REMARK_N,
                    E.REMARK,
                    E.REMARK0,
                    C.VENDOR_NAME,
                    B.MATL_SEQ,
                    E.USE_QTY,
                    E.OUT_QTY,
                    isnull(E.DEFECT_QTY, 0) as DEFECT_QTY,
                    E.STOCK_IDX,
                    E.ROOT_IDX,
                    isnull(E.ORG_STOCK_IDX, '') as ORG_STOCK_IDX,
                    isnull(E.WAITING_QTY, 0) as WAITING_QTY,
                    isnull(E.STOCK_STATUS_2, '') as STOCK_STATUS_2,
                    isnull(E.OWNER_SHIP, '') as OWNER_SHIP,
                    isnull(E.REASON_MAKE, '') as REASON_MAKE,
                    isnull(E.AUTHORITY, '') as AUTHORITY,
                    isnull(E.CONDITION, '') as CONDITION,
                    isnull(E.MANAGER, '') as MANAGER,
                    isnull(E.PURPOSE, '') as PURPOSE,
                    left(E.REG_DATETIME, 8) as STOCK_DATE,
                    E.REG_USER as CHARGER,
                    E.REG_DATETIME,
                    isnull(E.WARE_CD, '') as WARE_CD,
                    isnull(E.FACTORY_CD, '') as FACTORY_CD,
                    isnull(E.DEBIT_CD, '') as DEBIT_CD,
                    isnull(e2.CRDB_DATE, '') as CRDB_DATE,
                    isnull(e2.CRDB_AMT, '0') as CRDB_AMT
                FROM
                    KCD_MATL_MST A,
                    KCD_MATL_MEM B,
                    KCD_VENDOR C,
                    KSV_STOCK_MATL E
                    left join kcd_factory_ware e1 on e1.ware_cd = E.WARE_CD
                    left join ksv_crdb_mst e2 on e2.crdb_cd = E.DEBIT_CD
                    left join kcd_code e3 on e3.cd_code = E.REASON_REMARK
                    and e3.cd_group = 'STOCK_REMARK'
                WHERE
                    A.MATL_NAME LIKE '%${args.data.MATL_NAME}%' ESCAPE '['
                    AND (
                        E.STOCK_IDX like '%${args.data.STOCK_IDX}%'
                        or E.ROOT_IDX like '%${args.data.STOCK_IDX}%' ${tSQL}
                    )
                    AND E.PO_CD like '%${args.data.PO_CD}%'
                    AND E.FACTORY_CD like '%${args.data.FACTORY_CD}%'
                    -- AND E.STOCK_STATUS = '5' 
                    AND E.STOCK_STATUS_2 in ('S1', 'S2', 'E')
                    AND E.MATL_CD = A.MATL_CD
                    AND B.MATL_CD = A.MATL_CD
                    AND B.MATL_SEQ = (
                        SELECT
                            MAX(MATL_SEQ)
                        FROM
                            KCD_MATL_MEM
                        WHERE
                            MATL_CD = A.MATL_CD
                    )
                    AND C.VENDOR_CD = A.VENDOR_CD
                    AND C.VENDOR_CD LIKE '%${args.data.VENDOR_CD}%' ${tSQL1}
                ORDER BY
                    E.ORG_STOCK_IDX,
                    E.ROOT_IDX,
                    E.REG_DATETIME
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tOne = { ...tRet[tIdx] };
                let sql0 = `
                    select
                        po_price,
                        curr_cd,
                        vendor_cd
                    from
                        ksv_stock_mem2_stsin
                    where
                        po_cd = '${tOne.PO_CD}'
                        and matl_cd = '${tOne.MATL_CD}'
                        and po_price > 0
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                if (tRet0.length > 0) {
                    tOne.PO_PRICE = tRet0[0].po_price;
                    tOne.CURR_CD = tRet0[0].curr_cd;
                    tOne.VENDOR_CD = tRet0[0].vendor_cd;
                } else {
                    tOne.PO_PRICE = 0;
                    tOne.CURR_CD = '';
                    tOne.VENDOR_CD = '';
                }
                if (tOne.ORG_STOCK_IDX === '')
                    tOne.ORG_STOCK_IDX = tOne.ROOT_IDX;
                tRetArray.push(tOne);
            }
            return tRetArray;
        },
    },
};

export default moduleQuery_S0517_2;
