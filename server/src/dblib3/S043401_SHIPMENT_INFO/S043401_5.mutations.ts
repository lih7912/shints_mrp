// MGR_@@TNAME@@.mutations.js

import * as fs from 'fs';
import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
const moment = require('moment'); // 날짜 처리 라이브러리

/*
                STD_FLAG: String 
                NET: String 
                LOSS: String 
                USE_SIZE: String 
                REMARK: String 

*/

// export default로 Mutation 내용 내보내기
const moduleMutation_S043401_5 = {
    Mutation: {
        mgrDelete_S043401_5: async (_, args, contextValue) => {
            // Shipment Delete
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput = { ...args.datas };

            var tSQLArray = [];

            var sql0 = `
                select
                    isnull(STATUS_CD, '') as STATUS_CD,
                    isnull(FIX_FLAG, '') as FIX_FLAG,
                    isnull(IS_SINGAPORE, '') as IS_SINGAPORE
                from
                    ksv_shipment_mst
                where
                    shipment_cd = '${args.datas.SHIPMENT_CD}'
            `;
            var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            var tShipmentMst = {
                ...nRet0[0],
            };
            if (tShipmentMst.FIX_FLAG === '1') {
                if (tInput.SHIP_MODE === '4' || tInput.SHIP_MODE === '5');
                else {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE =
                        'ERROR:Shipment Delete는 Not Fixed상태에서만 가능합니다<br>Shipment Delete is only possible in the Not Fixed state.';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }
            }

            var sql1 = `
                select
                    *
                from
                    ksv_shipment_mem
                where
                    shipment_cd = '${args.datas.SHIPMENT_CD}'
            `;
            var nRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
            var tIdx1 = 0;
            for (tIdx1 = 0; tIdx1 < nRet1.length; tIdx1++) {
                var tOne = {
                    ...nRet1[tIdx1],
                };
                if (tShipmentMst.IS_SINGAPORE === '1') {
                    let tSQL99 = `
                        delete from ksv_shipment_mem
                        where
                            stsout_cd = '${tOne.STSOUT_CD}'
                            -- and   shipment_cd  = '${args.datas.SHIPMENT_CD}' 
                            and origin_port = 'SINGAPORE'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
                        update ksv_shipment_mem
                        set
                            shipment_cd = '',
                            origin_port = org_origin_port,
                            destination = org_destination
                        where
                            stsout_cd = '${tOne.STSOUT_CD}'
                            and shipment_cd = '${args.datas.SHIPMENT_CD}'
                            and destination = 'SINGAPORE'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
                        update kzz_freight
                        set
                            invoice_no = '',
                            bl_no = ''
                        where
                            stsout_cd = '${tOne.STSOUT_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
                        update ksv_stock_out_mst
                        set
                            pack_cd = ''
                        where
                            stsout_cd = '${tOne.STSOUT_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                } else {
                    let tSQL99 = `
                        update ksv_shipment_mem
                        set
                            shipment_cd = ''
                            -- origin_port = org_origin_port,
                            -- destination = org_destination
                        where
                            stsout_cd = '${tOne.STSOUT_CD}'
                            and shipment_cd = '${args.datas.SHIPMENT_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
                        update ksv_stock_out_mst
                        set
                            pack_cd = ''
                        where
                            stsout_cd = '${tOne.STSOUT_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }
            }

            let tSQL99 = `
                delete from ksv_shipment_mst
                where
                    shipment_cd = '${args.datas.SHIPMENT_CD}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'SUCCEED:Delete Shipment';
                tObj.id = 0;
                tRetArray.push(tObj);
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Delete Shipment';
                tObj.id = 0;
                tRetArray.push(tObj);
            }

            return tRetArray;
        },

        mgrUpdate_S043401_5_REMOVE_ITEM: async (_, args, contextValue) => {
            //
            var tDateNew = new Date();
            tDateNew.setMonth(tDateNew.getMonth() + 1);
            var tZeroDate = '00';
            var tDateNew_M =
                tZeroDate.substring(
                    0,
                    2 - String(tDateNew.getMonth() + 1).length,
                ) + String(tDateNew.getMonth() + 1);
            var tDateNew_D =
                tZeroDate.substring(0, 2 - String(tDateNew.getDate()).length) +
                String(tDateNew.getMonth());
            var tNewDateStr = tDateNew.getFullYear() + tDateNew_M + tDateNew_D;

            var tDate = new Date();
            var mm = tDate.getMonth() + 1;
            var mm_str = '';
            if (mm > 9) mm_str = mm.toString();
            else mm_str = '0' + mm;

            var dd = tDate.getDate();
            var dd_str = '';
            if (dd > 9) dd_str = dd;
            else dd_str = '0' + dd;

            var hours = tDate.getHours();
            var hours_str = '';
            if (hours > 9) hours_str = hours.toString();
            else hours_str = '0' + hours;

            var minutes = tDate.getMinutes();
            var minutes_str = '';
            if (minutes > 9) minutes_str = minutes.toString();
            else minutes_str = '0' + minutes;

            var seconds = tDate.getSeconds();
            var seconds_str = '';
            if (seconds > 9) seconds_str = seconds.toString();
            else seconds_str = '0' + seconds;

            var yyyy = tDate.getFullYear();

            var tRetDate =
                yyyy.toString() +
                mm_str +
                dd_str +
                hours_str +
                minutes_str +
                seconds_str;
            var tRetDate1 = tRetDate.substring(0, 8);
            var tYY = 'B' + yyyy.toString().substring(2) + '-';

            // let tPO = "POA2022S672";

            /*
                  var tSQL = `
                      SELECT
                          max(A.SEQ) + 1 as max_seq
                      FROM
                          KSV_ORDER_MST A,
                          KCD_STYLE B
                      WHERE
                          A.STYLE_CD = B.STYLE_CD
                          and A.YY = ${tOneMst.YY}
                          and B.BUYER_CD = '${tOneMst.BUYER_CD}'
                  `;
                  var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
                  var tRet = nRet0[0];
                  var tMaxSeq = tRet.max_seq;
            */
            var tInput = {
                ...args.datas,
            };
            var col = {
                ...tInput,
            };

            var tSQLArray = [];

            let sql0 = `
                select
                    *
                from
                    ksv_shipment_mst
                where
                    shipment_cd = '${col.SHIPMENT_CD}'
            `;
            var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            var tShipmentMst = { ...nRet0[0] };

            if (parseFloat(tShipmentMst.STATUS_CD) >= 1) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE =
                    'ERROR:You can Item delete in status wait(추가가능)';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas1.length; tIdx++) {
                var tOne = {
                    ...args.datas1[tIdx],
                };

                let sql1 = `
                    select
                        *
                    from
                        ksv_shipment_mem
                    where
                        shipment_cd = '${col.SHIPMENT_CD}'
                        and stsout_cd = '${tOne.STSOUT_CD}'
                `;
                var nRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                if (nRet1.length <= 0) continue;
                var tShipmentMem = { ...nRet1[0] };

                if (tShipmentMst.ORIGIN_PORT === 'SINGAPORE') {
                    let tSQL99 = `
                        update ksv_shipment_mem
                        set
                            shipment_cd = ''
                        where
                            shipment_cd = '${col.SHIPMENT_CD}'
                            and stsout_cd = '${tOne.STSOUT_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                } else if (tShipmentMst.DESTINATION === 'SINGAPORE') {
                    let tSQL99 = `
                        update ksv_shipment_mem
                        set
                            shipment_cd = '',
                            origin_port = org_origin_port,
                            destination = org_destination
                        where
                            stsout_cd = '${tOne.STSOUT_CD}'
                            and shipment_cd = '${col.SHIPMENT_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
                        delete from ksv_shipment_mem
                        where
                            stsout_cd = '${tOne.STSOUT_CD}'
                            and shipment_cd <> '${col.SHIPMENT_CD}'
                            and origin_port = 'SINGAPORE'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                } else {
                    let tSQL99 = `
                        update ksv_shipment_mem
                        set
                            shipment_cd = ''
                        where
                            shipment_cd = '${col.SHIPMENT_CD}'
                            and stsout_cd = '${tOne.STSOUT_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
                        update kzz_freight
                        set
                            invoice_no = '',
                            bl_no = ''
                        where
                            stsout_cd = '${tOne.STSOUT_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    // tSQLArray.push(tSQL99_1);
                }
            }

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'SUCCEED:Shipment Remove Item';
                tObj.id = 0;
                tRetArray.push(tObj);
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Shipment Remove Item';
                tObj.id = 0;
                tRetArray.push(tObj);
            }
            return tRetArray;
        },
        mgrUpdate_S043401_5: async (_, args, contextValue) => {
            const tRetDate: string = AFLib.getCurrTime();
            const tRetDate1: string = tRetDate.substring(0, 8); // 'YYYYMMDD'
            const tUserInfo = AFLib.getUserInfo(contextValue);
            const tYY: string = tRetDate.substring(2, 4);

            const tInputItem: any = [...args.datas1];
            const tInput: any = { ...args.datas };
            if (!tInput.COST) tInput.COST = '0';

            if (
                tInput.IS_SINGAPORE === '1' &&
                tInput.ORIGIN_PORT === 'SINGAPORE'
            ) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = `ERROR:You can not set Singapore combine about origin port SINGAPORE.`;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var saveShipmentMst = {};

            var tShipMode = '';

            const tSQLArray: Prisma.PrismaPromise<any>[] = [];

            try {
                if (tInput.SHIPMENT_CD) {
                    let sqlShipmentMst = `
                        select
                            a.*,
                            isnull(b.cd_name, '') as SHIP_MODE_N
                        from
                            ksv_shipment_mst a
                            left join kcd_code b on b.cd_code = a.ship_mode
                            and b.cd_group = 'SHIPMENT_SHIP_MODE'
                        where
                            shipment_cd = '${tInput.SHIPMENT_CD}'
                    `;
                    var retShipmentMst = await prisma.$queryRaw(
                        Prisma.raw(sqlShipmentMst),
                    );
                    if (retShipmentMst.length > 0) {
                        saveShipmentMst = { ...retShipmentMst[0] };
                        tShipMode = saveShipmentMst.SHIP_MODE_N;
                    }
                }

                if (tInput.REMARK && tInput.SHIPMENT_CD) {
                    var sql0_1 = `
                        select
                            *
                        from
                            ksv_shipment_mst
                        where
                            ltrim(rtrim(remark)) = '${tInput.REMARK.trim()}'
                            and shipment_cd <> '${tInput.SHIPMENT_CD}'
                    `;
                    var nRet0_1 = await prisma.$queryRaw(Prisma.raw(sql0_1));
                    if (nRet0_1.length > 0) {
                        var tRetArray = [];
                        var tObj = {};
                        tObj.CODE = `ERROR:Remark already in use. Please use another remark.`;
                        tObj.id = 0;
                        tRetArray.push(tObj);
                        return tRetArray;
                    }
                }

                const seqRows: Array<{ stsout_seq: string }> =
                    await prisma.$queryRaw`
                    SELECT ISNULL(MAX(RIGHT(shipment_cd, 6)), '000000') AS stsout_seq
                    FROM ksv_shipment_mst
                    WHERE shipment_cd LIKE ${`SHIP${tYY}-%`}
                `;
                const nMaxSeq =
                    parseInt(seqRows?.[0]?.stsout_seq ?? '0', 10) + 1;
                const tNewCd =
                    `SHIP${tYY}-` +
                    '000000'.substring(0, 6 - String(nMaxSeq).length) +
                    String(nMaxSeq);

                if (tInput.BL_NO) {
                    const blnoExists: any[] = await prisma.$queryRaw`
                        SELECT
                            1
                        FROM
                            ksv_blno_mst
                        WHERE
                            bl_no = ${tInput.BL_NO}
                    `;
                    if (blnoExists.length === 0) {
                        tSQLArray.push(prisma.$executeRaw`
                            INSERT INTO
                                ksv_blno_mst (bl_no, ship_line, container_no)
                            VALUES
                                (${tInput.BL_NO}, ${tInput.SHIP_LINE}, ${''})
                        `);
                    }

                    tSQLArray.push(prisma.$executeRaw`
                        delete from ksv_tradlinx
                        where
                            bl_no = ${tInput.BL_NO}
                    `);

                    if (
                        tInput.SHIP_LINE &&
                        ![
                            'TRUCK',
                            'FEDEX',
                            'DHL',
                            'UPS',
                            'AIR',
                            'EXPRESS',
                            'Handcarry',
                            'EXPRESS(3rd)',
                            'EXPRESS(Pick-up)',
                        ].includes(tInput.SHIP_LINE)
                    ) {
                        tSQLArray.push(prisma.$executeRaw`
                            INSERT INTO
                                ksv_tradlinx (bl_no, line_cd, update_datetime)
                            VALUES
                                (${tInput.BL_NO}, ${tInput.SHIP_LINE}, ${moment().format('YYYYMMDDHHmmss')})
                        `);
                    }
                }

                let wSHIPMENT_CD = '';

                if (!tInput.SHIPMENT_CD) {
                    wSHIPMENT_CD = tNewCd;

                    tSQLArray.push(prisma.$executeRaw`
                        INSERT INTO
                            ksv_shipment_mst (
                                shipment_cd,
                                ship_mode,
                                place_cd,
                                origin_port,
                                bl_no,
                                etd,
                                eta,
                                container_no,
                                reg_user,
                                reg_datetime,
                                status_cd,
                                destination,
                                is_singapore,
                                cost,
                                ship_line,
                                org_origin_port,
                                org_destination,
                                remark,
                                remark2,
                                shipping_cost,
                                shipping_cost_curr,
                                shipping_cost_paid,
                                eta,
                                invoice_no,
                                destination_port
                            )
                        VALUES
                            (
                                ${tNewCd},
                                ${tInput.SHIP_MODE},
                                ${tInput.PLACE_CD},
                                ${tInput.ORIGIN_PORT},
                                ${tInput.BL_NO},
                                ${tInput.ETD},
                                ${''},
                                ${tInput.CONTAINER_NO},
                                ${tUserInfo.USER_ID},
                                ${tRetDate},
                                ${'0'},
                                ${tInput.DESTINATION},
                                ${tInput.IS_SINGAPORE},
                                ${tInput.COST},
                                ${tInput.SHIP_LINE},
                                ${tInput.ORIGIN_PORT},
                                ${tInput.DESTINATION},
                                ${tInput.REMARK},
                                ${''},
                                ${tInput.COST},
                                ${tInput.SHIPPING_COST_CURR},
                                ${'SHINTS'},
                                ${tInput.ETA},
                                ${tInput.INVOICE_NO},
                                ${tInput.DESTINATION_PORT}
                            )
                    `);
                } else {
                    wSHIPMENT_CD = tInput.SHIPMENT_CD;

                    const tRemark2 =
                        tInput.REMARK && String(tInput.REMARK).trim() !== ''
                            ? tInput.REMARK
                            : `AFSHIP-${tRetDate}`;

                    tSQLArray.push(prisma.$executeRaw`
                        UPDATE ksv_shipment_mst
                        SET
                            origin_port = ${tInput.ORIGIN_PORT},
                            org_origin_port = ${tInput.ORIGIN_PORT},
                            bl_no = ${tInput.BL_NO},
                            upd_datetime = ${tRetDate},
                            destination = ${tInput.DESTINATION},
                            ship_line = ${tInput.SHIP_LINE},
                            ship_mode = ${tInput.SHIP_MODE},
                            etd = ${tInput.ETD},
                            eta = ${tInput.ETA},
                            cbm = ${tInput.CBM},
                            remark = ${tInput.REMARK},
                            remark2 = ${tRemark2},
                            shipping_cost = ${tInput.COST},
                            shipping_cost_curr = ${tInput.SHIPPING_COST_CURR},
                            shipping_cost_paid = ${'SHINTS'},
                            place_cd = ${tInput.PLACE_CD},
                            container_no = ${tInput.CONTAINER_NO},
                            is_singapore = ${tInput.IS_SINGAPORE},
                            invoice_no = ${tInput.INVOICE_NO},
                            destination_port = ${tInput.DESTINATION_PORT}
                        WHERE
                            shipment_cd = ${tInput.SHIPMENT_CD}
                    `);

                    // Sigapore combine의 경우 연계화물의 ready_date 수정
                    let tSQL99 = `
                        update ksv_shipment_mem
                        set
                            READY_DATE = '${tInput.ETA}'
                        where
                            stsout_cd in (
                                select distinct
                                    stsout_cd
                                from
                                    ksv_shipment_mem
                                where
                                    shipment_cd = '${tInput.SHIPMENT_CD}'
                            )
                            and origin_port = 'SINGAPORE'
                            and (
                                shipment_cd is null
                                or shipment_cd = ''
                            )
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    tSQLArray.push(prisma.$executeRaw`
                        DELETE FROM ksv_cost_mst
                        WHERE
                            shipment_cd = ${tInput.SHIPMENT_CD}
                            AND
                        type = 'SHIPPING_COST'
                    `);

                    const sumWeightRows: Array<{ s_weight: number | null }> =
                        await prisma.$queryRaw`
                            SELECT
                                SUM(weight) AS s_weight
                            FROM
                                ksv_shipment_mem
                            WHERE
                                shipment_cd = ${tInput.SHIPMENT_CD}
                        `;
                    const totalWeight = Number(
                        sumWeightRows?.[0]?.s_weight ?? 0,
                    );

                    const distRows: Array<{
                        buyer_cd: string;
                        bl_no: string;
                        reg_datetime: string;
                        type2: string;
                        s_weight: number;
                    }> = await prisma.$queryRaw`
                        SELECT
                            isnull(d.buyer_cd, '') as buyer_cd,
                            a.bl_no,
                            a.reg_datetime,
                            b.cd_name AS type2,
                            isnull(SUM(c.weight), 0) AS s_weight
                        FROM
                            ksv_shipment_mst a
                            JOIN ksv_shipment_mem a1 ON a.shipment_cd = a1.shipment_cd
                            JOIN kcd_code b ON a.ship_mode = b.cd_code
                            AND b.cd_group = 'SHIPMENT_SHIP_MODE'
                            LEFT JOIN ksv_stock_out_mst c ON a1.stsout_cd = c.stsout_cd
                            LEFT JOIN ksv_pu_mst2 d ON c.pu_cd = d.pu_cd
                        WHERE
                            a.shipment_cd = ${tInput.SHIPMENT_CD}
                        GROUP BY
                            d.buyer_cd,
                            a.bl_no,
                            a.reg_datetime,
                            b.cd_name
                    `;

                    // pack_cd 을 pack_cd2에 백업 . 한번 백업하면 변경하지 않음 (구버전호환을 위해)
                    // if (tInput.IS_SINGAPORE === '1') {
                    if (tInput.ORIGIN_PORT === 'SINGAPORE') {
                        tSQLArray.push(prisma.$executeRaw`
                            UPDATE ksv_stock_out
                            SET
                                pack_cd_singapore = ${tInput.REMARK}
                            WHERE
                                stsout_cd IN (
                                    SELECT
                                        stsout_cd
                                    FROM
                                        ksv_shipment_mem
                                    WHERE
                                        shipment_cd = ${tInput.SHIPMENT_CD}
                                )
                        `);

                        tSQLArray.push(prisma.$executeRaw`
                            UPDATE kzz_freight
                            SET
                                invoice_no_singapore = ${tInput.REMARK},
                                bl_no_singapore = ${tInput.BL_NO}
                            WHERE
                                stsout_cd IN (
                                    SELECT
                                        stsout_cd
                                    FROM
                                        ksv_shipment_mem
                                    WHERE
                                        shipment_cd = ${tInput.SHIPMENT_CD}
                                )
                        `);
                    } else {
                        tSQLArray.push(prisma.$executeRaw`
                            UPDATE ksv_stock_out
                            SET
                                pack_cd2 = pack_cd
                            WHERE
                                stsout_cd IN (
                                    SELECT
                                        stsout_cd
                                    FROM
                                        ksv_shipment_mem
                                    WHERE
                                        shipment_cd = ${tInput.SHIPMENT_CD}
                                )
                                -- AND  (pack_cd2 is null or pack_cd2 = '')
                                -- AND  (pack_cd is not null and pack_cd <> '')
                        `);

                        tSQLArray.push(prisma.$executeRaw`
                            UPDATE ksv_stock_out
                            SET
                                pack_cd = ${tInput.REMARK}
                            WHERE
                                stsout_cd IN (
                                    SELECT
                                        stsout_cd
                                    FROM
                                        ksv_shipment_mem
                                    WHERE
                                        shipment_cd = ${tInput.SHIPMENT_CD}
                                )
                        `);

                        tSQLArray.push(prisma.$executeRaw`
                            UPDATE kzz_freight
                            SET
                                invoice_no = ${tInput.REMARK},
                                bl_no = ${tInput.BL_NO}
                            WHERE
                                stsout_cd IN (
                                    SELECT
                                        stsout_cd
                                    FROM
                                        ksv_shipment_mem
                                    WHERE
                                        shipment_cd = ${tInput.SHIPMENT_CD}
                                )
                        `);
                    }
                }

                // IS_SINGAPORE 처리
                if (
                    saveShipmentMst.IS_SINGAPORE === '1' &&
                    tInput.IS_SINGAPORE !== '1'
                ) {
                    // Singapore Combine 헤제
                    let sql101 = `
                        select
                            isnull(count(*), 0) as cnt
                        from
                            ksv_shipment_mem
                        where
                            stsout_cd in (
                                select distinct
                                    stsout_cd
                                from
                                    ksv_shipment_mem
                                where
                                    shipment_cd = '${tInput.SHIPMENT_CD}'
                            )
                            and origin_port = 'SINGAPORE'
                            and shipment_cd is not null
                            and shipment_cd <> ''
                    `;
                    var ret101 = await prisma.$queryRaw(Prisma.raw(sql101));
                    if (ret101.length > 0 && ret101[0].cnt > 0) {
                        var tRetArray = [];
                        var tObj = {};
                        tObj.CODE = `ERROR:You can not cancel Singapore combine in processing.`;
                        tObj.id = 0;
                        tRetArray.push(tObj);
                        return tRetArray;
                    }

                    let sqlDel = `
                        delete from ksv_shipment_mem
                        where
                            stsout_cd in (
                                select distinct
                                    stsout_cd
                                from
                                    ksv_shipment_mem
                                where
                                    shipment_cd = '${tInput.SHIPMENT_CD}'
                            )
                            and origin_port = 'SINGAPORE'
                    `;
                    var retDel = prisma.$queryRaw(Prisma.raw(sqlDel));
                    tSQLArray.push(retDel);

                    let sqlUp = `
                        update ksv_shipment_mem
                        set
                            destination = 'ETP'
                        where
                            stsout_cd in (
                                select distinct
                                    stsout_cd
                                from
                                    ksv_shipment_mem
                                where
                                    shipment_cd = '${tInput.SHIPMENT_CD}'
                            )
                            and destination = 'SINGAPORE'
                    `;
                    var retUp = prisma.$queryRaw(Prisma.raw(sqlUp));
                    tSQLArray.push(retUp);

                    let sqlUp1 = `
                        update ksv_shipment_mst
                        set
                            destination = 'ETP'
                        where
                            shipment_cd = '${tInput.SHIPMENT_CD}'
                    `;
                    var retUp1 = prisma.$queryRaw(Prisma.raw(sqlUp1));
                    tSQLArray.push(retUp1);
                } else if (
                    saveShipmentMst.IS_SINGAPORE !== '1' &&
                    tInput.IS_SINGAPORE === '1'
                ) {
                    // Singapore Combine 설정
                    let sql101 = `
                        select
                            *
                        from
                            ksv_shipment_mem
                        where
                            shipment_cd = '${tInput.SHIPMENT_CD}'
                    `;
                    var ret101 = await prisma.$queryRaw(Prisma.raw(sql101));
                    var tIdx101 = 0;
                    for (tIdx101 = 0; tIdx101 < ret101.length; tIdx101++) {
                        var tInObj = { ...ret101[tIdx101] };

                        let sqlUp = `
                            update ksv_shipment_mem
                            set
                                destination = 'SINGAPORE'
                            where
                                id = '${tInObj.id}'
                        `;
                        var retUp = prisma.$queryRaw(Prisma.raw(sqlUp));
                        tSQLArray.push(retUp);

                        delete tInObj.id;
                        tInObj.SHIPMENT_CD = '';
                        tInObj.ORIGIN_PORT = 'SINGAPORE';
                        tInObj.DESTINATION = 'ETP';

                        var sqlIn = AFLib.createTableSql(
                            'ksv_shipment_mem',
                            tInObj,
                        );
                        var retIn = prisma.$queryRaw(Prisma.raw(sqlIn));
                        tSQLArray.push(retIn);
                    }

                    let sqlUp = `
                        update ksv_shipment_mst
                        set
                            destination = 'SINGAPORE'
                        where
                            shipment_cd = '${tInput.SHIPMENT_CD}'
                    `;
                    var retUp = prisma.$queryRaw(Prisma.raw(sqlUp));
                    tSQLArray.push(retUp);
                }

                if (tSQLArray.length > 0) {
                    await prisma.$transaction(tSQLArray);
                }

                return [
                    { CODE: `SUCCEED:Update Shipment:${wSHIPMENT_CD}`, id: 0 },
                ];
            } catch (e: any) {
                console.log(e?.message ?? e);
                return [{ CODE: 'ERROR:Update Shipment', id: 0 }];
            }
        },

        mgrUpdate_S043401_5_FIX: async (_, args, contextValue) => {
            // FIX_FLAG
            var tDateNew = new Date();
            tDateNew.setMonth(tDateNew.getMonth() + 1);
            var tZeroDate = '00';
            var tDateNew_M =
                tZeroDate.substring(
                    0,
                    2 - String(tDateNew.getMonth() + 1).length,
                ) + String(tDateNew.getMonth() + 1);
            var tDateNew_D =
                tZeroDate.substring(0, 2 - String(tDateNew.getDate()).length) +
                String(tDateNew.getMonth());
            var tNewDateStr = tDateNew.getFullYear() + tDateNew_M + tDateNew_D;

            var tDate = new Date();
            var mm = tDate.getMonth() + 1;
            var mm_str = '';
            if (mm > 9) mm_str = mm.toString();
            else mm_str = '0' + mm;

            var dd = tDate.getDate();
            var dd_str = '';
            if (dd > 9) dd_str = dd;
            else dd_str = '0' + dd;

            var hours = tDate.getHours();
            var hours_str = '';
            if (hours > 9) hours_str = hours.toString();
            else hours_str = '0' + hours;

            var minutes = tDate.getMinutes();
            var minutes_str = '';
            if (minutes > 9) minutes_str = minutes.toString();
            else minutes_str = '0' + minutes;

            var seconds = tDate.getSeconds();
            var seconds_str = '';
            if (seconds > 9) seconds_str = seconds.toString();
            else seconds_str = '0' + seconds;

            var yyyy = tDate.getFullYear();

            var tRetDate =
                yyyy.toString() +
                mm_str +
                dd_str +
                hours_str +
                minutes_str +
                seconds_str;
            var tRetDate1 = tRetDate.substring(0, 8);
            var tYY = yyyy.toString().substring(2);

            // let tPO = "POA2022S672";

            /*
                  var tSQL = `
                      SELECT
                          max(A.SEQ) + 1 as max_seq
                      FROM
                          KSV_ORDER_MST A,
                          KCD_STYLE B
                      WHERE
                          A.STYLE_CD = B.STYLE_CD
                          and A.YY = ${tOneMst.YY}
                          and B.BUYER_CD = '${tOneMst.BUYER_CD}'
                  `;
                  var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
                  var tRet = nRet0[0];
                  var tMaxSeq = tRet.max_seq;
            */
            var tInput = {
                ...args.datas,
            };

            var isNSR = 0;

            let sql0 = `
                select
                    isnull(STATUS_CD, '0') as STATUS_CD,
                    isnull(FIX_FLAG, '0') as FIX_FLAG,
                    isnull(REMARK, '') as REMARK
                from
                    ksv_shipment_mst
                where
                    shipment_cd = '${tInput.SHIPMENT_CD}'
            `;
            var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            if (nRet0.length <= 0) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:해당 Shipment가 없습니다';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
            var tShipmentMst = {
                ...nRet0[0],
            };
            if (tShipmentMst.FIX_FLAG === '') tShipmentMst.FIX_FLAG = '0';
            if (tShipmentMst.STATUS_CD === '') tShipmentMst.STATUS_CD = '0';
            if (tShipmentMst.FIX_FLAG === '0') tShipmentMst.STATUS_CD = '0';

            if (tShipmentMst.REMARK.length > 0) {
                if (
                    tShipmentMst.REMARK.substring(
                        tShipmentMst.REMARK.length - 1,
                        tShipmentMst.REMARK.length,
                    ) === 'D'
                )
                    isNSR = 1;
            }

            console.log(`${tShipmentMst.FIX_FLAG}/${tShipmentMst.STATUS_CD}`);

            var tSQLArray = [];

            if (
                tShipmentMst.FIX_FLAG === '0' &&
                tShipmentMst.STATUS_CD === '0'
            ) {
                let tSQL99 = `
                    update ksv_shipment_mst
                    set
                        fix_flag = '1',
                        status_cd = '1'
                    where
                        shipment_cd = '${tInput.SHIPMENT_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            } else if (
                tShipmentMst.FIX_FLAG === '1' &&
                tShipmentMst.STATUS_CD === '1'
            ) {
                let tSQL99 = `
                    update ksv_shipment_mst
                    set
                        fix_flag = '0',
                        status_cd = '0'
                    where
                        shipment_cd = '${tInput.SHIPMENT_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            } else {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:진행중인 화물의 Fix 상태을 바꿀수 없습니다';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            let tSQL99 = `
                update ksv_stock_out
                set
                    pack_cd2 = pack_cd
                where
                    stsout_cd in (
                        select
                            stsout_cd
                        from
                            ksv_shipment_mem
                        where
                            shipment_cd = '${tInput.SHIPMENT_CD}'
                    )
                    and (
                        pack_cd2 is null
                        or pack_cd2 = ''
                    )
                    and (
                        pack_cd is not null
                        and pack_cd <> ''
                    )
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            let tSQL99 = `
                update ksv_stock_out
                set
                    pack_cd = '${tInput.REMARK}'
                where
                    stsout_cd in (
                        select
                            stsout_cd
                        from
                            ksv_shipment_mem
                        where
                            shipment_cd = '${tInput.SHIPMENT_CD}'
                    )
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            let tSQL99 = `
                update ksv_stock_out_mst
                set
                    pack_cd = '${tInput.REMARK}'
                where
                    stsout_cd in (
                        select
                            stsout_cd
                        from
                            ksv_shipment_mem
                        where
                            shipment_cd = '${tInput.SHIPMENT_CD}'
                    )
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            if (
                tShipmentMst.FIX_FLAG === '0' &&
                tShipmentMst.STATUS_CD === '0'
            ) {
                // Fix처리시 NSR Check 해서 Shipment을 분리함
                // NSR Shipment 분리. Won. 
                var sqlCheckNsr = `
                    select distinct
                        a.STSOUT_CD
                    from
                        ksv_stock_out a,
                        kcd_buyer b,
                        kcd_user c
                    where
                        a.stsout_cd in (
                            select distinct
                                stsout_cd
                            from
                                ksv_shipment_mem
                            where
                                shipment_cd = '${tInput.SHIPMENT_CD}'
                        )
                        and left(a.order_cd, 2) = b.buyer_cd
                        and b.reg_user = c.user_id
                        and c.company_code = 'nsr'
                `;
                var retCheckNsr = await prisma.$queryRaw(
                    Prisma.raw(sqlCheckNsr),
                );
                if (retCheckNsr.length > 0 && isNSR === 0) {
                    var nsrShipmentCd = '';

                    var sqlShintsMst = `
                        select
                            *
                        from
                            ksv_shipment_mst
                        where
                            shipment_cd = '${tInput.SHIPMENT_CD}'
                    `;
                    var retShintsMst = await prisma.$queryRaw(
                        Prisma.raw(sqlShintsMst),
                    );

                    var sqlNsrMst = `
                        select
                            *
                        from
                            ksv_shipment_mst
                        where
                            remark = '${retShintsMst[0].REMARK}D'
                    `;
                    var retNsrMst = await prisma.$queryRaw(
                        Prisma.raw(sqlNsrMst),
                    );

                    if (retNsrMst.length <= 0) {
                        var sqlNextSeq = `
                            select
                                isnull(max(right(shipment_cd, 6)), '000000') as max_seq_str
                            from
                                ksv_shipment_mst
                            where
                                shipment_cd like 'SHIP${tYY}-%';
                        `;
                        var retNextSeq = await prisma.$queryRaw(
                            Prisma.raw(sqlNextSeq),
                        );
                        var tMaxSeq = 1;
                        if (retNextSeq.length > 0) {
                            tMaxSeq = parseInt(retNextSeq[0].max_seq_str) + 1;
                        }
                        const tNewCd =
                            `SHIP${tYY}-` +
                            '000000'.substring(0, 6 - String(tMaxSeq).length) +
                            String(tMaxSeq);

                        /*
                        const seqRows: Array<{ stsout_seq: string }> = await prisma.$queryRaw`
                              SELECT ISNULL(MAX(RIGHT(shipment_cd, 6)), '000000') AS stsout_seq
                              FROM ksv_shipment_mst
                              WHERE shipment_cd LIKE ${`SHIP${tYY}-%`}
                        `;
                        const nMaxSeq = parseInt(seqRows?.[0]?.stsout_seq ?? '0', 10) + 1;
                        const tNewCd = `SHIP${tYY}-` + '000000'.substring(0, 6 - String(nMaxSeq).length) + String(nMaxSeq);
                        */

                        var tInObj = { ...retShintsMst[0] };
                        delete tInObj.id;
                        tInObj.SHIPMENT_CD = tNewCd;
                        tInObj.FIX_FLAG = '1';
                        tInObj.STATUS_CD = '1';
                        tInObj.REMARK = `${tInObj.REMARK}D`;
                        tInObj.INVOICE_NO = `${tInObj.INVOICE_NO}D`;
                        var tSQL99 = AFLib.createTableSql(
                            'ksv_shipment_mst',
                            tInObj,
                        );
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);

                        nsrShipmentCd = tNewCd;
                    } else {
                        nsrShipmentCd = retNsrMst[0].SHIPMENT_CD;
                    }

                    var tIdx9 = 0;
                    for (tIdx9 = 0; tIdx9 < retCheckNsr.length; tIdx9++) {
                        var tObj9 = { ...retCheckNsr[tIdx9] };

                        let tSQL99 = `
                            update ksv_shipment_mem
                            set
                                shipment_cd = '${nsrShipmentCd}'
                            where
                                stsout_cd = '${tObj9.STSOUT_CD}'
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);

                        let tSQL99 = `
                            update ksv_stock_out
                            set
                                pack_cd = '${retShintsMst[0].REMARK}D'
                            where
                                stsout_cd = '${tObj9.STSOUT_CD}'
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);
                    }
                }
            }

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
                var tRetArray = [];
                var tObj = {};
                if (tShipmentMst.FIX_FLAG === '0') {
                    tObj.CODE = 'SUCCEED:Update Fix';
                } else {
                    tObj.CODE = 'SUCCEED:Update Fix Cancel';
                }

                tObj.id = 0;
                tRetArray.push(tObj);
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Update Fix';
                tObj.id = 0;
                tRetArray.push(tObj);
            }
            return tRetArray;
        },

        mgrUpdate_S043401_5_TRACKING_ID: async (_, args, contextValue) => {
            // FIX_FLAG
            var tDateNew = new Date();
            tDateNew.setMonth(tDateNew.getMonth() + 1);
            var tZeroDate = '00';
            var tDateNew_M =
                tZeroDate.substring(
                    0,
                    2 - String(tDateNew.getMonth() + 1).length,
                ) + String(tDateNew.getMonth() + 1);
            var tDateNew_D =
                tZeroDate.substring(0, 2 - String(tDateNew.getDate()).length) +
                String(tDateNew.getMonth());
            var tNewDateStr = tDateNew.getFullYear() + tDateNew_M + tDateNew_D;

            var tDate = new Date();
            var mm = tDate.getMonth() + 1;
            var mm_str = '';
            if (mm > 9) mm_str = mm.toString();
            else mm_str = '0' + mm;

            var dd = tDate.getDate();
            var dd_str = '';
            if (dd > 9) dd_str = dd;
            else dd_str = '0' + dd;

            var hours = tDate.getHours();
            var hours_str = '';
            if (hours > 9) hours_str = hours.toString();
            else hours_str = '0' + hours;

            var minutes = tDate.getMinutes();
            var minutes_str = '';
            if (minutes > 9) minutes_str = minutes.toString();
            else minutes_str = '0' + minutes;

            var seconds = tDate.getSeconds();
            var seconds_str = '';
            if (seconds > 9) seconds_str = seconds.toString();
            else seconds_str = '0' + seconds;

            var yyyy = tDate.getFullYear();

            var tRetDate =
                yyyy.toString() +
                mm_str +
                dd_str +
                hours_str +
                minutes_str +
                seconds_str;
            var tRetDate1 = tRetDate.substring(0, 8);
            var tYY = 'B' + yyyy.toString().substring(2) + '-';

            // let tPO = "POA2022S672";

            /*
                  var tSQL = `
                      SELECT
                          max(A.SEQ) + 1 as max_seq
                      FROM
                          KSV_ORDER_MST A,
                          KCD_STYLE B
                      WHERE
                          A.STYLE_CD = B.STYLE_CD
                          and A.YY = ${tOneMst.YY}
                          and B.BUYER_CD = '${tOneMst.BUYER_CD}'
                  `;
                  var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
                  var tRet = nRet0[0];
                  var tMaxSeq = tRet.max_seq;
            */
            var tInput = {
                ...args.datas,
            };

            var tSQLArray = [];

            let tSQL99 = `
                update ksv_shipment_mst
                set
                    tracking_id = '${tInput.TRACKING_ID}'
                where
                    shipment_cd = '${tInput.SHIPMENT_CD}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'SUCCEED:Update Tracking Id';
                tObj.id = 0;
                tRetArray.push(tObj);
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Update Tracking Id';
                tObj.id = 0;
                tRetArray.push(tObj);
            }
            return tRetArray;
        },

        mgrInsert_S043401_FILE_ADD: async (_, args, contextValue) => {
            const { FILE_KEY, TITLE, NAME, URL, OBJECT_NAME } = args.datas;

            const tObj = {
                KIND: 'SHIPMENT',
                FILE_KEY,
                TITLE,
                NAME,
                URL,
                UPD_DATETIME: AFLib.getCurrTime(),
                OBJECT_NAME,
            };

            const tSQLArray = [
                prisma.$queryRaw(
                    Prisma.raw(AFLib.createTableSql('KCD_FILEINFO', tObj)),
                ),
            ];

            try {
                global.currentTransactionInfo = {
                    contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
                return [
                    {
                        CODE: `SUCCEED:${NAME}`,
                        id: 0,
                    },
                ];
            } catch (e) {
                return [
                    {
                        CODE: `ERROR:Update PI_MST:${e.message}`,
                        id: 0,
                    },
                ];
            }
        },

        mgrDelete_S043401_FILE_DELETE: async (_, args, contextValue) => {
            const { FILE_KEY, TITLE, NAME, URL, OBJECT_NAME } = args.datas;

            const tSQLArray = [
                prisma.$queryRaw(
                    Prisma.raw(
                        `
                            DELETE FROM KCD_FILEINFO
                            WHERE
                                KIND = 'SHIPMENT'
                                AND FILE_KEY = '${FILE_KEY}'
                        `,
                    ),
                ),
            ];

            try {
                global.currentTransactionInfo = {
                    contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
                return [
                    {
                        CODE: `SUCCEED:${NAME}`,
                        id: 0,
                    },
                ];
            } catch (e) {
                return [
                    {
                        CODE: `ERROR:Update PI_MST:${e.message}`,
                        id: 0,
                    },
                ];
            }
        },

        mgrUpdate_S043401_5_HSCODE: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);
            var tYY = `${tRetDate.substring(2, 4)}`;

            var tInput = {
                ...args.datas,
            };

            var tSQLArray = [];

            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas1.length; tIdx++) {
                var tOne = {
                    ...args.datas1[tIdx],
                };

                let tSQL99 = `
                    update kcd_matl_mst
                    set
                        hs_cd = '${tInput.HS_NO}'
                    where
                        matl_cd = '${tOne.MATL_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            }

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'SUCCEED:Update Hs Code';
                tObj.id = 0;
                tRetArray.push(tObj);
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Update Hs Code';
                tObj.id = 0;
                tRetArray.push(tObj);
            }
            return tRetArray;
        },

        mgrUpdate_S043401_5_COMP: async (_, args, contextValue) => {
            var tInput = {
                ...args.datas,
            };
            let tSQLArray = [];

            for (let tIdx = 0; tIdx < args.datas1.length; tIdx++) {
                const tOne = {
                    ...args.datas1[tIdx],
                };

                const tMatlName = String(tOne.MATL_NAME || '').replace(
                    /'/g,
                    "''",
                );
                const tComp1 = String(tInput.COMP1 || '').replace(/'/g, "''");
                const tComp1Percent = String(tInput.COMP1_PERCENT || '').replace(
                    /'/g,
                    "''",
                );
                const tComp2 = String(tInput.COMP2 || '').replace(/'/g, "''");
                const tComp2Percent = String(tInput.COMP2_PERCENT || '').replace(
                    /'/g,
                    "''",
                );
                const tComp3 = String(tInput.COMP3 || '').replace(/'/g, "''");
                const tComp3Percent = String(tInput.COMP3_PERCENT || '').replace(
                    /'/g,
                    "''",
                );
                const tComp4 = String(tInput.COMP4 || '').replace(/'/g, "''");
                const tComp4Percent = String(tInput.COMP4_PERCENT || '').replace(
                    /'/g,
                    "''",
                );

                const tSQL = `
                    IF EXISTS (
                        SELECT
                            1
                        FROM
                            kcd_composition
                        WHERE
                            matl_name = '${tMatlName}'
                    ) BEGIN
                    UPDATE kcd_composition
                    SET
                        comp1 = '${tComp1}',
                        comp1_percent = '${tComp1Percent}',
                        comp2 = '${tComp2}',
                        comp2_percent = '${tComp2Percent}',
                        comp3 = '${tComp3}',
                        comp3_percent = '${tComp3Percent}',
                        comp4 = '${tComp4}',
                        comp4_percent = '${tComp4Percent}'
                    WHERE
                        matl_name = '${tMatlName}' END ELSE BEGIN
                    INSERT INTO
                        kcd_composition (
                            matl_name,
                            comp1,
                            comp1_percent,
                            comp2,
                            comp2_percent,
                            comp3,
                            comp3_percent,
                            comp4,
                            comp4_percent
                        )
                    VALUES
                        (
                            '${tMatlName}',
                            '${tComp1}',
                            '${tComp1Percent}',
                            '${tComp2}',
                            '${tComp2Percent}',
                            '${tComp3}',
                            '${tComp3Percent}',
                            '${tComp4}',
                            '${tComp4Percent}'
                        ) END
                `;

                tSQLArray.push(prisma.$executeRaw(Prisma.raw(tSQL)));
            }
            try {
                global.currentTransactionInfo = {
                    contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
                return [
                    {
                        CODE: 'SUCCEED:Update Comp',
                        id: 0,
                    },
                ];
            } catch (e) {
                return [
                    {
                        CODE: 'ERROR:Update Comp',
                        id: 0,
                    },
                ];
            }
        },

        mgrUpdate_S043401_5_OFFER_SPEC: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);
            var tYY = `${tRetDate.substring(2, 4)}`;

            var tInput = {
                ...args.datas,
            };

            var tSQLArray = [];

            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas1.length; tIdx++) {
                var tOne = {
                    ...args.datas1[tIdx],
                };

                var tMatlName = tOne.MATL_NAME.replace(/'/gi, "''");

                let tSQL99 = `
                    delete from kcd_offer_spec
                    where
                        vendor_cd = '${tOne.VENDOR_CD}'
                        and matl_name = '${tMatlName}'
                        and spec = '${tOne.SPEC}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    insert into
                        kcd_offer_spec (vendor_cd, matl_name, spec, offer_spec)
                    values
                        (
                            '${tOne.VENDOR_CD}',
                            '${tMatlName}',
                            '${tOne.SPEC}',
                            '${tInput.OFFER_SPEC}'
                        )
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            }

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'SUCCEED:Update Offer Spec';
                tObj.id = 0;
                tRetArray.push(tObj);
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Update Offer Spec';
                tObj.id = 0;
                tRetArray.push(tObj);
            }
            return tRetArray;
        },
    },
};

export default moduleMutation_S043401_5;
