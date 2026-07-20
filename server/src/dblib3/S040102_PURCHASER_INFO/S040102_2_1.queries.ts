import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

//
class S040102_COMM {
    async queryS040102_PU_MEM_one(argData, contextValue) {
        var tRetDate = AFLib.getCurrTime();
        var tRetDate1 = tRetDate.substring(0, 8);
        var tUserInfo = AFLib.getUserInfo(contextValue);

        var tSQLArray = [];

        var tSQL = '';
        if (argData.STYLE_CD !== '') {
            tSQL += `AND STYLE_NAME like '%${argData.STYLE_CD}%' `;
        }

        var tRetArray = [];

        var sqlPuMst = `
            select
                *
            from
                ksv_pu_mst2
            where
                pu_cd = '${argData.PU_CD}'
        `;
        var tRetPuMst = await prisma.$queryRaw(Prisma.raw(sqlPuMst));
        if (tRetPuMst.length <= 0) return tRetArray;

        var sql0 = `
            select
                isnull(PU_CD, '') as PU_CD,
                isnull(PU_SEQ, '1') as PU_SEQ,
                isnull(PO_CD, '') as PO_CD,
                isnull(PO_SEQ, '') as PO_SEQ,
                isnull(SEND_DATETIME, '') as SEND_DATETIME
            from
                ksv_pu_mem2
            where
                pu_cd = '${argData.PU_CD}'
            order by
                pu_seq
        `;
        var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
        // if (tRet0.length <= 0)  return (tRetArray);

        var tMax100Under = 0;
        var tMax100Over = 0;

        var tIdx = 0;
        for (tIdx = 0; tIdx < tRet0.length; tIdx++) {
            var tOne = { ...tRet0[tIdx] };
            var sql1 = `
                select
                    *
                from
                    ksv_mail_log
                where
                    po_cd = '${tOne.PO_CD}'
                    and po_seq = '${tOne.PO_SEQ}'
                    and pu_cd = '${tOne.PU_CD}'
                    and pu_seq = '${tOne.PU_SEQ}'
                    and vendor_cd = '${tRetPuMst[0].VENDOR_CD}'
            `;
            var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));

            var tObj = {};
            tObj.PU_CD = tOne.PU_CD;
            tObj.PU_SEQ = tOne.PU_SEQ;
            tObj.PO_CD = tOne.PO_CD;
            tObj.PO_SEQ = tOne.PO_SEQ;
            // tObj.SEND_DATETIME = tOne.SEND_DATETIME;
            tObj.SEND_DATETIME = '';
            tObj.SEND_FILENAME = '';
            tObj.SEND_FILEURL = '';
            tObj.SEND_USER = '';
            tObj.SEND_KIND = '';
            if (tRet1.length > 0 && parseFloat(tOne.PU_SEQ) < 900) {
                tObj.SEND_DATETIME = tRet1[0].SEND_DATETIME;
                tObj.SEND_FILENAME = tRet1[0].SEND_FILENAME;
                tObj.SEND_FILEURL = tRet1[0].SEND_FILEURL;
                tObj.SEND_USER = tRet1[0].USER_ID;
                tObj.SEND_KIND = tRet1[0].SEND_KIND;
            }
            console.log(
                `+++++++++++++++:${tObj.PU_SEQ}/${tObj.PO_SEQ}/${tObj.SEND_DATETIME}`,
            );
            tRetArray.push(tObj);
        }

        var tLastObj = {};
        var tMaxPoSeq = 0;
        if (tRetArray.length > 0) {
            tLastObj = { ...tRetArray[tRetArray.length - 1] };

            var sql10 = `
                select
                    max(a.po_seq) as max_po_seq
                from
                    ksv_po_mrp a,
                    kcd_matl_mst b,
                    kcd_vendor c
                where
                    a.po_cd = '${tLastObj.PO_CD}'
                    and a.matl_cd = b.matl_cd
                    and b.vendor_cd = c.vendor_cd
                    and b.vendor_cd = '${tRetPuMst[0].VENDOR_CD}'
                    and (
                        a.po_seq < 97
                        or a.po_seq > 100
                    )
            `;
            var tRet10 = await prisma.$queryRaw(Prisma.raw(sql10));
            if (tRet10.length > 0) tMaxPoSeq = tRet10[0].max_po_seq;
        }

        var tRetArray1 = [];

        if (tRetArray.length > 0 && parseFloat(tLastObj.PU_SEQ) === 999) {
            tRetArray.forEach((col, i) => {
                var tObj = { ...col };
                if (parseFloat(tObj.PU_SEQ) === 999) {
                    tObj.PU_SEQ = 'W';
                    tObj.PO_SEQ = tMaxPoSeq;
                }
                tRetArray1.push(tObj);
            });
        } else if (
            tRetArray.length > 0 &&
            parseFloat(tLastObj.PU_SEQ) !== 999
        ) {
            tRetArray.forEach((col, i) => {
                var tObj = { ...col };
                if (parseFloat(tObj.PU_SEQ) === 999) tObj.PU_SEQ = 'W';
                tRetArray1.push(tObj);
            });

            var sql1 = `
                select
                    max(a.po_seq) as max_po_seq
                from
                    ksv_po_mrp a,
                    kcd_matl_mst b,
                    kcd_vendor c
                where
                    a.po_cd = '${tLastObj.PO_CD}'
                    and a.matl_cd = b.matl_cd
                    and b.vendor_cd = c.vendor_cd
                    and b.vendor_cd = '${tRetPuMst[0].VENDOR_CD}'
                    and (
                        a.po_seq < 97
                        or a.po_seq > 100
                    )
            `;
            var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));

            var tOne3 = { ...tLastObj };
            delete tOne3.id;
            delete tOne3.SEND_FILENAME;
            delete tOne3.SEND_FILEURL;
            delete tOne3.SEND_KIND;
            tOne3.SEND_USER = '';
            tOne3.PU_SEQ = 999;
            tOne3.PO_SEQ = tRet1[0].max_po_seq;
            tOne3.SEND_DATETIME = '';
            let tSQL99 = AFLib.createTableSql('ksv_pu_mem2', tOne3);
            var tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            let tSQL99 = `
                delete from ksv_stock_mem2_log
                where
                    pu_cd = '${tLastObj.PU_CD}'
                    and pu_seq = '999'
                    and po_cd = '${tLastObj.PO_CD}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            let tSQL99 = `
                insert into
                    ksv_stock_mem2_log (
                        pu_cd,
                        pu_seq,
                        po_cd,
                        po_seq,
                        matl_cd,
                        po_qty,
                        stock_qty,
                        po_qty2,
                        moq,
                        curr_cd,
                        master_price,
                        freight_price,
                        other_price,
                        po_price,
                        surcharge_remark,
                        moq_price,
                        leftover_qty,
                        foc_qty,
                        moq_stock_idx,
                        foc_stock_idx,
                        leftover_stock_idx,
                        moq_amt,
                        other_amt,
                        freight_amt,
                        shortage_qty,
                        defect_qty,
                        moq_confirm,
                        moq_amt_confirm,
                        freight_amt_confirm,
                        other_amt_confirm,
                        surcharge_price,
                        surcharge_amt,
                        reason,
                        stsin_cd,
                        bef_po_qty,
                        new_po_qty,
                        diff_qty,
                        save_data
                    )
                select
                    pu_cd,
                    '999',
                    po_cd,
                    po_seq,
                    matl_cd,
                    po_qty,
                    stock_qty,
                    po_qty2,
                    moq,
                    curr_cd,
                    master_price,
                    freight_price,
                    other_price,
                    po_price,
                    surcharge_remark,
                    moq_price,
                    leftover_qty,
                    foc_qty,
                    moq_stock_idx,
                    foc_stock_idx,
                    leftover_stock_idx,
                    moq_amt,
                    other_amt,
                    freight_amt,
                    shortage_qty,
                    defect_qty,
                    moq_confirm,
                    moq_amt_confirm,
                    freight_amt_confirm,
                    other_amt_confirm,
                    surcharge_price,
                    surcharge_amt,
                    reason,
                    stsin_cd,
                    '0',
                    '0',
                    '0',
                    ''
                from
                    ksv_stock_mem2
                where
                    pu_cd = '${tLastObj.PU_CD}'
                    and po_cd = '${tLastObj.PO_CD}'
                    and (
                        (
                            stsin_cd is null
                            or stsin_cd = ''
                        )
                        or (
                            stsin_cd is not null
                            and stsin_cd <> ''
                            and po_price > 0
                        )
                    )
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            global.currentTransactionInfo = {
                contextValue: contextValue,
                functionName: AFLib.getFunctionName(),
            };
            await prisma.$transaction(tSQLArray);
            delete global.currentTransactionInfo;

            var tLastObj2 = { ...tLastObj };
            tLastObj2.PU_SEQ = 'W';
            tLastObj2.PO_SEQ = tRet1[0].max_po_seq;
            tLastObj2.SEND_DATETIME = '';
            tLastObj2.SEND_USER = '';
            tRetArray1.push(tLastObj2);
        } else {
            var tPuMst0 = { ...tRetPuMst[0] };
            var tCols = tPuMst0.PO_CD2.split('/');
            var sqlPo = '';
            tCols.forEach((col, i) => {
                if (col) {
                    if (sqlPo === '') sqlPo = `'${col}'`;
                    else sqlPo += `'${col}'`;
                }
            });

            var sql1 = `
                select
                    a.po_cd,
                    max(a.po_seq) as max_po_seq
                from
                    ksv_po_mrp a,
                    kcd_matl_mst b,
                    kcd_vendor c
                where
                    a.po_cd in (${sqlPo})
                    and a.matl_cd = b.matl_cd
                    and b.vendor_cd = c.vendor_cd
                    and b.vendor_cd = '${tPuMst0.VENDOR_CD}'
                    and (
                        a.po_seq < 97
                        or a.po_seq > 100
                    )
                group by
                    a.po_cd
            `;
            var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));

            tRet1.forEach((tOne, i) => {
                if (i === 0) {
                    tLastObj.PU_CD = tPuMst0.PU_CD;
                    tLastObj.PU_SEQ = 'W';
                    tLastObj.PO_CD = tOne.po_cd;
                    tLastObj.PO_SEQ = tOne.max_po_seq;
                    tLastObj.SEND_DATETIME = '';
                    tLastObj.SEND_FILENAME = '';
                    tLastObj.SEND_FILEURL = '';
                    tLastObj.SEND_USER = '';
                    tLastObj.SEND_KIND = '';
                } else {
                    tLastObj.PO_CD += `/${tOne.po_cd}`;
                    tLastObj.PO_SEQ += `/${tOne.max_po_seq}`;
                }
            });
            tRetArray.push(tLastObj);
        }

        return tRetArray1;
    }

    async queryS040102_PU_MEM_many(argData, contextValue) {
        var tSQL = '';
        if (argData.STYLE_CD !== '') {
            tSQL += `AND STYLE_NAME like '%${argData.STYLE_CD}%' `;
        }

        var tRetArray = [];

        var sql0 = `
            select
                *
            from
                ksv_pu_mst2
            where
                pu_cd = '${argData.PU_CD}'
        `;
        var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
        if (tRet0.length <= 0) return tRetArray;
        var tPuMst = { ...tRet0[0] };

        var sql0 = `
            select
                *
            from
                ksv_pu_mem2
            where
                pu_cd = '${argData.PU_CD}'
            order by
                pu_seq,
                po_cd
        `;
        var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
        if (tRet0.length <= 0) return tRetArray;

        var sqlMail = `
            select
                *
            from
                ksv_mail_log
            where
                pu_cd = '${argData.PU_CD}'
        `;
        var retMail = await prisma.$queryRaw(Prisma.raw(sqlMail));

        var tArray = [];
        var wObj = {};
        var saveObj = {};
        var poArray = [];
        tRet0.forEach((col, i) => {
            var chk1 = 0;
            poArray.forEach((col1, i1) => {
                if (col.PO_CD === col1.PO_CD) chk1 = 1;
            });
            if (chk1 === 0) {
                var poObj = {};
                poObj.PO_CD = col.PO_CD;
                poObj.PO_SEQ = 0;
                poArray.push(poObj);
            }

            retMail.forEach((col3, i3) => {
                if (col3.PU_CD === col.PU_CD && col3.PU_SEQ === col.PU_SEQ) {
                    col.SEND_FILENAME = col3.SEND_FILENAME;
                    col.SEND_FILEURL = col3.SEND_FILEURL;
                }
            });

            if (i === 0) {
                wObj = {};
                wObj.PU_CD = col.PU_CD;
                wObj.PU_SEQ = col.PU_SEQ;
                wObj.PO_CD = col.PO_CD;
                wObj.PO_SEQ = col.PO_SEQ;
                wObj.VENDOR_CD = tPuMst.VENDOR_CD;
                wObj.SEND_KIND = col.SEND_KIND;
                wObj.SEND_DATETIME = col.SEND_DATETIME;
                wObj.SEND_FILENAME = col.SEND_FILENAME;
                wObj.SEND_FILEURL = col.SEND_FILEURL;
                wObj.USER_ID = col.SEND_USER;
            } else {
                console.log(`PU_MEM2_many: ${col.PU_SEQ} / ${saveObj.PU_SEQ}`);
                if (parseFloat(col.PU_SEQ) !== parseFloat(saveObj.PU_SEQ)) {
                    tArray.push(wObj);
                    wObj = {};
                    wObj.PU_CD = col.PU_CD;
                    wObj.PU_SEQ = col.PU_SEQ;
                    wObj.PO_CD = col.PO_CD;
                    wObj.PO_SEQ = col.PO_SEQ;
                    wObj.VENDOR_CD = tPuMst.VENDOR_CD;
                    wObj.SEND_KIND = col.SEND_KIND;
                    wObj.SEND_DATETIME = col.SEND_DATETIME;
                    wObj.SEND_FILENAME = col.SEND_FILENAME;
                    wObj.SEND_FILEURL = col.SEND_FILEURL;
                    wObj.USER_ID = col.SEND_USER;
                } else {
                    wObj.PO_CD += `/${col.PO_CD}`;
                    wObj.PO_SEQ += `/${col.PO_SEQ}`;
                }
            }
            saveObj = { ...wObj };
        });
        tArray.push(wObj);

        var tArray1 = [];
        var tLastObj = {};
        tArray.forEach((col, i) => {
            var tObj1 = { ...col };
            if (parseFloat(tObj1.PU_SEQ) === 999) {
                tObj1.PU_SEQ = 'W';
            } else {
                tArray1.push(tObj1);
            }
            tLastObj = { ...tObj1 };
        });

        var sqlPo = '';
        poArray.forEach((col2, i2) => {
            if (sqlPo === '') sqlPo = `'${col2.PO_CD}'`;
            else sqlPo += `,'${col2.PO_CD}'`;
        });

        var sql1 = `
            select
                a.po_cd,
                max(a.po_seq) as max_po_seq
            from
                ksv_po_mrp a,
                kcd_matl_mst b,
                kcd_vendor c
            where
                a.po_cd in (${sqlPo})
                and a.matl_cd = b.matl_cd
                and b.vendor_cd = c.vendor_cd
                and b.vendor_cd = '${tPuMst.VENDOR_CD}'
                and (
                    a.po_seq < 97
                    or a.po_seq > 100
                )
                -- and   (a.po_seq < 97)
            group by
                a.po_cd
        `;
        var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
        if (tLastObj.PU_SEQ === 'W') {
            tRet1.forEach((col, i) => {
                if (i === 0) {
                    tLastObj.PO_CD = `${col.po_cd}`;
                    tLastObj.PO_SEQ = `${col.max_po_seq}`;
                } else {
                    tLastObj.PO_CD += `/${col.po_cd}`;
                    tLastObj.PO_SEQ += `/${col.max_po_seq}`;
                }
            });
            tLastObj.PU_SEQ = 'W';
            tLastObj.SEND_DATETIME = '';
            tLastObj.SEND_USER = '';
            tArray1.push(tLastObj);
        }
        return tArray1;
    }

    async queryS040102_PU_MEM_one_bak0721(argData, contextValue) {
        var tSQL = '';
        if (argData.STYLE_CD !== '') {
            tSQL += `AND STYLE_NAME like '%${argData.STYLE_CD}%' `;
        }

        var tRetArray = [];

        var sql0 = `
            select
                *
            from
                ksv_pu_mst2
            where
                pu_cd = '${argData.PU_CD}'
        `;
        var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
        if (tRet0.length <= 0) return tRetArray;
        var tPuMst = { ...tRet0[0] };

        var tPoCds = tPuMst.PO_CD2.split('/');
        var sqlPoCds = '';
        tPoCds.forEach((col, i) => {
            if (col !== '' && sqlPoCds === '') sqlPoCds = `'${col}'`;
            if (col !== '' && sqlPoCds !== '') sqlPoCds += `,'${col}'`;
        });
        console.log(`=====> sqlPoCds:${sqlPoCds}`);

        var sql1 = `
            select
                a.PO_CD,
                a.PO_SEQ,
                max(left(a.reg_datetime, 8)) as REG_DATETIME
            from
                ksv_po_mrp a,
                kcd_matl_mst b
            where
                a.po_cd in (${sqlPoCds})
                and a.matl_cd = b.matl_cd
                and b.vendor_cd = '${tPuMst.VENDOR_CD}'
                and a.po_seq < 97
            group by
                a.po_cd,
                a.po_seq
            order by
                reg_datetime
        `;
        var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));

        var sql2 = `
            SELECT
                PO_SEQ,
                SEND_KIND,
                left(send_datetime, 8) as SEND_DATETIME,
                SEND_FILENAME,
                SEND_FILEURL,
                USER_ID
            FROM
                ksv_mail_log
            WHERE
                vendor_cd IN ('${tPuMst.VENDOR_CD}')
                AND po_cd IN (${sqlPoCds})
                and send_datetime <> ''
            order by
                send_datetime
        `;
        var tRet2 = await prisma.$queryRaw(Prisma.raw(sql2));

        var dataArray = [];
        tRet2.forEach((col, i) => {
            if (parseInt(col.PO_SEQ) !== 0) {
                var tSaveObj = {};
                tRet1.forEach((col1, i1) => {
                    if (parseFloat(col1.PO_SEQ) === parseFloat(col.PO_SEQ)) {
                        tSaveObj = { ...col1 };
                    }
                });
                if (typeof tSaveObj.PO_CD !== 'undefined') {
                    tSaveObj.SEND_KIND = col.SEND_KIND;
                    tSaveObj.SEND_DATETIME = col.SEND_DATETIME;
                    tSaveObj.SEND_FILENAME = col.SEND_FILENAME;
                    tSaveObj.SEND_FILEURL = col.SEND_FILEURL;
                    tSaveObj.USER_ID = col.USER_ID;
                    tSaveObj.PU_CD = tPuMst.PU_CD;
                    tSaveObj.PU_SEQ = dataArray.length + 1;
                    dataArray.push(tSaveObj);
                }
            } else if (i === 0) {
                var tSaveObj = { ...tRet1[0] };
                tSaveObj.SEND_KIND = col.SEND_KIND;
                tSaveObj.SEND_DATETIME = col.SEND_DATETIME;
                tSaveObj.SEND_FILENAME = col.SEND_FILENAME;
                tSaveObj.SEND_FILEURL = col.SEND_FILEURL;
                tSaveObj.USER_ID = col.USER_ID;
                tSaveObj.PU_CD = tPuMst.PU_CD;
                tSaveObj.PU_SEQ = dataArray.length + 1;
                dataArray.push(tSaveObj);
            } else {
                var tSaveObj = {};
                tRet1.forEach((col1, i1) => {
                    if (
                        parseFloat(col.SEND_DATETIME) ===
                        parseFloat(col1.REG_DATETIME)
                    ) {
                        tSaveObj = { ...col1 };
                    } else if (
                        parseFloat(col.SEND_DATETIME) >
                        parseFloat(col1.REG_DATETIME)
                    ) {
                        tSaveObj = { ...col1 };
                    } else {
                    }
                });
                tSaveObj.SEND_KIND = col.SEND_KIND;
                tSaveObj.SEND_DATETIME = col.SEND_DATETIME;
                tSaveObj.SEND_FILENAME = col.SEND_FILENAME;
                tSaveObj.SEND_FILEURL = col.SEND_FILEURL;
                tSaveObj.USER_ID = col.USER_ID;
                tSaveObj.PU_CD = tPuMst.PU_CD;
                tSaveObj.PU_SEQ = dataArray.length + 1;
                dataArray.push(tSaveObj);
            }
        });

        //
        var sql3 = `
            SELECT
                PO_CD,
                VENDOR_CD,
                PO_SEQ,
                SEND_KIND,
                left(send_datetime, 8) as SEND_DATETIME,
                SEND_FILENAME,
                SEND_FILEURL,
                USER_ID
            FROM
                ksv_mail_log
            WHERE
                vendor_cd IN ('${tPuMst.VENDOR_CD}')
                AND po_cd IN (${sqlPoCds})
                and send_datetime = ''
            order by
                send_datetime
        `;
        var tRet3 = await prisma.$queryRaw(Prisma.raw(sql3));
        if (tRet3.length > 0) {
            var tObj = { ...tRet3[0] };
            tObj.PU_CD = tPuMst.PU_CD;
            tObj.PU_SEQ = dataArray.length + 1;
            dataArray.push(tObj);
        }

        return dataArray;
    }

    async queryS040102_PU_MEM_many_bak0721(argData, contextValue) {
        var tSQL = '';
        if (argData.STYLE_CD !== '') {
            tSQL += `AND STYLE_NAME like '%${argData.STYLE_CD}%' `;
        }

        var tRetArray = [];

        var sql0 = `
            select
                *
            from
                ksv_pu_mst2
            where
                pu_cd = '${argData.PU_CD}'
        `;
        var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
        if (tRet0.length <= 0) return tRetArray;
        var tPuMst = { ...tRet0[0] };

        sql0 = `
            select
                vendor_cd,
                pu_cd,
                pu_seq,
                po_cd,
                po_seq,
                send_kind,
                send_datetime,
                send_filename,
                send_fileurl,
                user_id
            from
                ksv_mail_log
            where
                pu_cd = '${argData.PU_CD}'
        `;
        tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
        if (tRet0.length <= 0) return tRetArray;

        var tArray = [];
        var wObj = {};
        var saveObj = {};
        tRet0.forEach((col, i) => {
            if (i === 0) {
                wObj = {};
                wObj.PU_CD = col.pu_cd;
                wObj.PU_SEQ = col.pu_seq;
                wObj.PO_CD = col.po_cd;
                wObj.PO_SEQ = col.po_seq;
                wObj.VENDOR_CD = col.vendor_cd;
                wObj.SEND_KIND = col.send_kind;
                wObj.SEND_DATETIME = col.send_datetime;
                wObj.SEND_FILENAME = col.send_filename;
                wObj.SEND_FILEURL = col.send_fileurl;
                wObj.USER_ID = col.user_id;
            } else {
                if (col.pu_seq !== saveObj.PU_SEQ) {
                    tArray.push(wObj);
                    wObj = {};
                    wObj.PU_CD = col.pu_cd;
                    wObj.PU_SEQ = col.pu_seq;
                    wObj.PO_CD = col.po_cd;
                    wObj.PO_SEQ = col.po_seq;
                    wObj.VENDOR_CD = col.vendor_cd;
                    wObj.SEND_KIND = col.send_kind;
                    wObj.SEND_DATETIME = col.send_datetime;
                    wObj.SEND_FILENAME = col.send_filename;
                    wObj.SEND_FILEURL = col.send_fileurl;
                    wObj.USER_ID = col.user_id;
                } else {
                    wObj.PO_CD += `/${col.po_cd}`;
                    wObj.PO_SEQ += `/${col.po_seq}`;
                }
            }
            saveObj = { ...wObj };
        });
        tArray.push(wObj);
        return tArray;
    }

    async queryS040102_PU_MEM_one_bak(argData, contextValue) {
        var tSQL = '';
        if (argData.STYLE_CD !== '') {
            tSQL += `AND STYLE_NAME like '%${argData.STYLE_CD}%' `;
        }

        var tRetArray = [];

        var sql0 = `
            select
                *
            from
                ksv_pu_mst2
            where
                pu_cd = '${argData.PU_CD}'
        `;
        var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
        if (tRet0.length <= 0) return tRetArray;
        var tPuMst = { ...tRet0[0] };

        var tPoCds = tPuMst.PO_CD2.split('/');
        var sqlPoCds = '';
        tPoCds.forEach((col, i) => {
            if (col !== '' && sqlPoCds === '') sqlPoCds = `'${col}'`;
            if (col !== '' && sqlPoCds !== '') sqlPoCds += `,'${col}'`;
        });
        console.log(`=====> sqlPoCds:${sqlPoCds}`);

        /*
       var sql1 = `
           select
               a.po_seq,
               a.po_cd,
               sum(a.po_qty) as po_qty,
               sum(a.in_qty) as in_qty
           from
               ksv_stock_mem a,
               kcd_matl_mst b
           where
               a.po_cd in (${sqlPoCds})
               and a.matl_cd = b.matl_cd
               and b.vendor_cd = '${tPuMst.VENDOR_CD}'
               and (
                   a.po_seq < 97
                   or a.po_seq > 99
               )
           group by
               a.po_seq,
               a.po_cd
           order by
               a.po_seq
       `;
       var tRet1  =  await prisma.$queryRaw(Prisma.raw(sql1));
       */

        var sql1 = `
            select distinct
                a.po_seq,
                a.po_cd
            from
                ksv_po_mrp a,
                kcd_matl_mst b
            where
                a.po_cd in (${sqlPoCds})
                and a.matl_cd = b.matl_cd
                and b.vendor_cd = '${tPuMst.VENDOR_CD}'
                and (
                    a.po_seq < 97
                    or a.po_seq > 99
                )
            group by
                a.po_seq,
                a.po_cd
            order by
                a.po_seq
        `;
        var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
        var tLastPoSeq = {};
        if (tRet1.length > 0) tLastPoSeq = { ...tRet1[tRet1.length - 1] };

        var tArray = [];
        var tSavePoSeq = 0;
        var tWorkObj = {};
        var tSeq = 1;
        tRet1.forEach((col, i) => {
            if (i === 0) {
                tWorkObj = {};
                tWorkObj.PU_CD = tPuMst.PU_CD;
                tWorkObj.PU_SEQ = tSeq;
                tSeq += 1;
                tWorkObj.PO_CD = col.po_cd;
                tWorkObj.PO_SEQ = col.po_seq;
                tWorkObj.VENDOR_CD = tPuMst.VENDOR_CD;
                tSavePoSeq = col.po_seq;
            } else if (i !== 0 && tSavePoSeq !== parseFloat(col.po_seq)) {
                tArray.push(tWorkObj);
                tWorkObj = {};
                tWorkObj.PU_CD = tPuMst.PU_CD;
                tWorkObj.PU_SEQ = tSeq;
                tSeq += 1;
                tWorkObj.PO_CD = col.po_cd;
                tWorkObj.PO_SEQ = col.po_seq;
                tWorkObj.VENDOR_CD = tPuMst.VENDOR_CD;
                tSavePoSeq = col.po_seq;
            } else {
                tWorkObj.PO_CD += `/${col.po_cd}`;
                tSavePoSeq = col.po_seq;
            }
        });
        tArray.push(tWorkObj);

        var tIdx = 0;
        var tArray2 = [];
        var tArray2_0 = [];
        var tCheckIdx = -1;
        for (tIdx = 0; tIdx < tArray.length; tIdx++) {
            var tOne = { ...tArray[tIdx] };

            var tPoCds = tOne.PO_CD.split('/');
            var sqlPoCds = '';
            tPoCds.forEach((col, i) => {
                if (col !== '' && sqlPoCds === '') sqlPoCds = `'${col}'`;
                if (col !== '' && sqlPoCds !== '') sqlPoCds += `,'${col}'`;
            });
            var sql2 = `
                select
                    isnull(SEND_KIND, '') as SEND_KIND,
                    isnull(SEND_DATETIME, '') as SEND_DATETIME,
                    isnull(SEND_FILENAME, '') as SEND_FILENAME,
                    isnull(SEND_FILEURL, '') as SEND_FILEURL,
                    isnull(USER_ID, '') as SEND_USER
                from
                    ksv_mail_log
                where
                    po_cd in (${sqlPoCds})
                    and po_seq = '${tOne.PO_SEQ}'
                    and vendor_cd = '${tOne.VENDOR_CD}'
            `;
            var tRet2 = await prisma.$queryRaw(Prisma.raw(sql2));
            if (tRet2.length > 0) {
                if (tCheckIdx < 0) tCheckIdx = tIdx;
                tOne.SEND_KIND = tRet2[0].SEND_KIND;
                tOne.SEND_DATETIME = tRet2[0].SEND_DATETIME;
                tOne.SEND_FILENAME = tRet2[0].SEND_FILENAME;
                tOne.SEND_FILEURL = tRet2[0].SEND_FILEURL;
                tOne.USER_ID = tRet2[0].USER_ID;
                tArray2.push(tOne);
            }
            tArray2_0.push(tOne);
        }

        var sql2 = `
            select
                isnull(SEND_KIND, '') as SEND_KIND,
                isnull(SEND_DATETIME, '') as SEND_DATETIME,
                isnull(SEND_FILENAME, '') as SEND_FILENAME,
                isnull(SEND_FILEURL, '') as SEND_FILEURL,
                isnull(USER_ID, '') as SEND_USER
            from
                ksv_mail_log
            where
                po_cd in (${sqlPoCds})
                and po_seq = 0
                and vendor_cd = '${tOne.VENDOR_CD}'
        `;
        var tRet2 = await prisma.$queryRaw(Prisma.raw(sql2));
        if (tRet2.length > 0 && tArray2.length <= 0) {
            var tArray3 = [];
            var tOne = { ...tArray2_0[tArray2_0.length - 1] };
            tOne.SEND_KIND = tRet2[0].SEND_KIND;
            tOne.SEND_DATETIME = tRet2[0].SEND_DATETIME;
            tOne.SEND_FILENAME = tRet2[0].SEND_FILENAME;
            tOne.SEND_FILEURL = tRet2[0].SEND_FILEURL;
            tOne.USER_ID = tRet2[0].USER_ID;
            tArray3.push(tOne);

            return tArray3;
        } else if (tRet2.length > 0 && tArray2.length > 0) {
            if (tCheckIdx > 0) {
                var tOne = { ...tArray2_0[tCheckIdx - 1] };
                tOne.SEND_KIND = tRet2[0].SEND_KIND;
                tOne.SEND_DATETIME = tRet2[0].SEND_DATETIME;
                tOne.SEND_FILENAME = tRet2[0].SEND_FILENAME;
                tOne.SEND_FILEURL = tRet2[0].SEND_FILEURL;
                tOne.USER_ID = tRet2[0].USER_ID;
                tArray2.unshift(tOne);
            }
            return tArray2;
        } else {
            return tArray2;
        }
    }
}

// export default로 Query 내용 내보내기
const moduleQuery_S040102_2_1 = {
    Query: {
        mgrQueryS040102_2_1: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }

            var tRetArray = [];

            let sqlStr = `
                SELECT
                    '' as PU_STATUS,
                    A.PU_CD,
                    A.VENDOR_CD,
                    C.VENDOR_NAME,
                    C.VENDOR_TYPE,
                    D.CD_NAME as VENDOR_TYPE_N,
                    A.REG_USER,
                    A.BUYER_CD,
                    E.BUYER_NAME,
                    C.PAY_TERM,
                    A.PO_CD2,
                    A.MRP_DATE,
                    A.NORMI,
                    C.OVERSHORT_RATE as OVER_SHORT,
                    A.TARGET_ETA,
                    A.CURR_CD,
                    A.PI_NO,
                    A.ORDER_DATE,
                    A.PU_AMT as PAY_AMT,
                    A.PI_FILE,
                    -- A.DELIVERY_DATE as DUE_DATE,
                    A.DUE_DATE as DUE_DATE,
                    A.BILL_TO,
                    A.EXP_DELIVERY_DATE as EX_FACTORY,
                    A.PAY_DATE,
                    isnull(A.FORWARD, '') as PLACE_CD,
                    A.SHIP_TO,
                    isnull(A.ORIGIN_PORT, '') as ORIGIN_PORT,
                    A.TRADE_TERM,
                    isnull(A.DEPOSIT_AMT, 0) as DEPOSIT_AMT,
                    isnull(A.LC_AMT, 0) as LC_AMT,
                    A.DEPOSIT_GW_STATUS as GW
                FROM
                    KSV_PU_MST2 A,
                    KCD_VENDOR C,
                    KCD_CODE D,
                    KCD_BUYER E
                WHERE
                    A.VENDOR_CD = C.VENDOR_CD
                    AND C.VENDOR_TYPE = D.CD_CODE
                    and D.CD_GROUP = 'VENDOR_TYPE'
                    AND A.BUYER_CD = E.BUYER_CD
                    AND A.PU_CD = '${args.data.PU_CD}'
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            let sqlStr1 = `
                select
                    sum(po_price * po_qty) as pay_amt
                from
                    ksv_stock_mem2
                where
                    pu_cd = '${args.data.PU_CD}'
            `;
            var tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));

            let sqlStr2 = `
                select
                    *
                from
                    kcd_fileinfo
                where
                    file_key = '${args.data.PU_CD}'
                    and kind = 'PURCHASE'
            `;
            var tRet2 = await prisma.$queryRaw(Prisma.raw(sqlStr2));

            let sqlStr3 = `
                select
                    isnull(sum(po_qty), 0) as s_po_qty_old
                from
                    ksv_pu_mem2
                where
                    pu_cd = '${args.data.PU_CD}'
                    and pu_seq = (
                        select
                            max(pu_seq)
                        from
                            ksv_pu_mem2
                        where
                            pu_cd = '${args.data.PU_CD}'
                    )
            `;
            var tRet3 = await prisma.$queryRaw(Prisma.raw(sqlStr3));
            var tOldPoQty = 0;
            if (tRet3.length > 0) tOldPoQty = parseFloat(tRet3[0].s_po_qty_old);

            var tPoCds = tRet[0].PO_CD2.split('/');
            var tInSQL = '';
            tPoCds.forEach((col, i) => {
                if (i === 0) tInSQL = `'${col}' `;
                else tInSQL += `, '${col}' `;
            });
            let sqlStr4 = `
                select
                    isnull(sum(a.po_qty), 0) as s_po_qty_curr
                from
                    ksv_po_mrp a,
                    kcd_matl_mst b
                    -- where pu_cd = '${args.data.PU_CD}'
                where
                    a.po_cd in (${tInSQL})
                    and (
                        a.po_seq < 97
                        or a.po_seq > 100
                    )
                    and a.matl_cd = b.matl_cd
                    and b.vendor_cd = '${tRet[0].VENDOR_CD}'
                    and a.use_po_type = '1'
                    and a.diff_po_type in ('0', '2', '3', '4')
            `;
            var tRet4 = await prisma.$queryRaw(Prisma.raw(sqlStr4));
            var tCurrPoQty = 0;
            if (tRet4.length > 0)
                tCurrPoQty = parseFloat(tRet4[0].s_po_qty_curr);

            let sqlStr5 = `
                select
                    isnull(sum(crdb_amt), 0) as debit_amt
                from
                    ksv_crdb_mst
                where
                    messer_cd = '${tRet[0].VENDOR_CD}'
                    and po_cd in (${tInSQL})
            `;
            var tRet5 = await prisma.$queryRaw(Prisma.raw(sqlStr5));
            var tDebitObj = {};
            if (tRet5.length > 0) {
                tDebitObj.CRDB_CD = '';
                tDebitObj.DEBIT_AMT = String(tRet5[0].debit_amt);
            } else {
                tDebitObj.CRDB_CD = '';
                tDebitObj.DEBIT_AMT = '0';
            }

            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tOne1 = { ...tRet[tIdx] };
                if (tRet2.length > 0) {
                    tOne1.PI_FILE = tRet2[0].NAME;
                    tOne1.PI_FILE_URL = tRet2[0].URL;
                } else {
                    tOne1.PI_FILE = '';
                    tOne1.PI_FILE_URL = '';
                }
                if (tCurrPoQty !== tOldPoQty) tOne1.PU_STATUS = 'Update';
                else tOne1.PU_STATUS = '-';
                tOne1.DEBIT_AMT = tDebitObj.DEBIT_AMT;
                tRetArray.push(tOne1);
            }

            return tRetArray;
        },

        mgrQueryS040102_2_PU_MEM: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var sql0 = `
                select
                    *
                from
                    ksv_pu_mst2
                where
                    pu_cd = '${args.data.PU_CD}'
            `;
            var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            if (tRet0.length <= 0) return tRetArray;
            var tPuMst = { ...tRet0[0] };

            var tPoCds = tPuMst.PO_CD2.split('/');
            var tPoCdArray = [];
            var tSavePoCd = '';
            tPoCds.forEach((col, i) => {
                if (col !== '' && i === 0) {
                    tPoCdArray.push(col);
                } else {
                    if (col !== tSavePoCd) tPoCdArray.push(col);
                }
                tSavePoCd = col;
            });

            if (tPoCdArray.length < 2) {
                var tInObj = { ...args.data };
                var tFunc = new S040102_COMM();
                var tRetObj = await tFunc.queryS040102_PU_MEM_one(
                    tInObj,
                    contextValue,
                );
                return tRetObj;
            } else {
                console.log(`==============> PU_MEM2(many): ${tPuMst.PO_CD2} `);
                var tInObj = { ...args.data };
                var tFunc = new S040102_COMM();
                var tRetObj = await tFunc.queryS040102_PU_MEM_many(
                    tInObj,
                    contextValue,
                );
                return tRetObj;
            }
        },
        mgrQueryS040102_2_PU_MEM_bak: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }

            var tRetArray = [];

            /*
       var sql0 = `
           select
               pu_cd,
               pu_seq,
               count(*) as cnt
           from
               ksv_pu_mem2
           where
               pu_cd = '${args.data.PU_CD}'
           group by
               pu_cd,
               pu_seq
       `;
       */
            /*
       var sql0 = `
           select
               pu_cd,
               pu_seq,
               count(*) as cnt
           from
               ksv_stock_mem2_log
           where
               pu_cd = '${args.data.PU_CD}'
           group by
               pu_cd,
               pu_seq
       `;
       */
            /*
       var sql0 = `
           select
               po_cd,
               po_seq,
               pu_cd,
               pu_seq,
               count(*) as cnt
           from
               ksv_stock_mem2_log
           where
               pu_cd = '${args.data.PU_CD}'
           group by
               po_cd,
               po_seq,
               pu_cd,
               pu_seq
       `;
       */
            var sql0 = `
                select
                    pu_cd,
                    pu_seq,
                    count(*) as cnt
                from
                    ksv_stock_mem2_log
                where
                    pu_cd = '${args.data.PU_CD}'
                group by
                    pu_cd,
                    pu_seq
            `;
            var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            var tIdx0 = 0;
            for (tIdx0 = 0; tIdx0 < tRet0.length; tIdx0++) {
                var tOne = { ...tRet0[tIdx0] };

                var sql1 = `
                    select
                        po_cd,
                        max(po_seq) as max_po_seq
                    from
                        ksv_stock_mem2_log
                    where
                        pu_cd = '${tOne.pu_cd}'
                        and pu_seq = '${tOne.pu_seq}'
                    group by
                        po_cd
                `;
                var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));

                var tPoStr = '';
                tRet1.forEach((col, i) => {
                    if (i === 0) tPoStr += `${col.po_cd}(${col.max_po_seq})`;
                    else tPoStr += `/${col.po_cd}(${col.max_po_seq})`;
                });

                /*
           let sql2 = `
               select
                   top 1 a.PU_CD,
                   a.PU_SEQ,
                   isnull(b.SEND_KIND, '') as SEND_KIND,
                   isnull(b.SEND_DATETIME, '') as SEND_DATETIME,
                   isnull(b.SEND_FILENAME, '') as SEND_FILENAME,
                   isnull(b.SEND_FILEURL, '') as SEND_FILEURL,
                   isnull(b.USER_ID, '') as SEND_USER
                   -- from  ksv_pu_mem2 a
               from
                   ksv_stock_mem2_log a
                   left join ksv_mail_log b on a.pu_cd = b.pu_cd
                   and a.pu_seq = b.pu_seq
               where
                   a.pu_cd = '${tOne.pu_cd}'
                   and a.pu_seq = '${tOne.pu_seq}'
           `;
           var tRet2  =  await prisma.$queryRaw(Prisma.raw(sql2));
           */

                let sql2_1 = `
                    select
                        top 1 kk.*,
                        isnull(b.SEND_KIND, '') as SEND_KIND,
                        isnull(b.SEND_DATETIME, '') as SEND_DATETIME,
                        isnull(b.SEND_FILENAME, '') as SEND_FILENAME,
                        isnull(b.SEND_FILEURL, '') as SEND_FILEURL,
                        isnull(b.USER_ID, '') as SEND_USER
                    from
                        (
                            select
                                a.PU_CD,
                                a.PU_SEQ,
                                a.PO_CD,
                                a.PO_SEQ,
                                c.VENDOR_CD
                            from
                                ksv_stock_mem2_log a,
                                ksv_pu_mst2 c
                            where
                                a.pu_cd = '${tOne.pu_cd}'
                                and a.pu_seq = '${tOne.pu_seq}'
                                and a.pu_cd = c.pu_cd
                        ) kk
                        left join ksv_mail_log b on kk.po_cd = b.po_cd
                        -- and (kk.po_seq = b.po_seq
                        -- or  (kk.po_seq =1 and b.po_seq = '0'))
                        and kk.vendor_cd = b.vendor_cd
                        and b.pu_seq = '${tOne.pu_seq}'
                `;
                var tRet2 = await prisma.$queryRaw(Prisma.raw(sql2_1));

                if (tRet2.length > 0 && tRet2[0].SEND_DATETIME !== '');
                else {
                    /*
               let sql2 = `
                   select
                       kk.*,
                       isnull(b.SEND_KIND, '') as SEND_KIND,
                       isnull(b.SEND_DATETIME, '') as SEND_DATETIME,
                       isnull(b.SEND_FILENAME, '') as SEND_FILENAME,
                       isnull(b.SEND_FILEURL, '') as SEND_FILEURL,
                       isnull(b.USER_ID, '') as SEND_USER
                   from
                       (
                           select
                               a.PU_CD,
                               a.PU_SEQ,
                               a.PO_CD,
                               a.PO_SEQ,
                               c.VENDOR_CD
                           from
                               ksv_stock_mem2_log a,
                               ksv_pu_mst2 c
                           where
                               a.pu_cd = '${tOne.pu_cd}'
                               and a.pu_seq = '${tOne.pu_seq}'
                               and a.pu_cd = c.pu_cd
                       ) kk
                       left join ksv_mail_log b on kk.po_cd = b.po_cd
                       and (b.po_seq = 0)
                       and kk.vendor_cd = b.vendor_cd
                   order by
                       b.SEND_DATETIME desc
               `;
               tRet2  =  await prisma.$queryRaw(Prisma.raw(sql2));
               */
                }

                var tWObj = { ...tRet2[0] };
                tWObj.PO_CD = tPoStr;
                tWObj.PO_SEQ = '1';

                tRetArray.push(tWObj);
            }

            return tRetArray;
        },
    },
};

export default moduleQuery_S040102_2_1;
