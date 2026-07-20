// MGR_@@TNAME@@.mutations.js

import * as fs from 'fs';
import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import { ServiceLib1 } from '../service_lib/ServiceLib1';
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기

/*
                STD_FLAG: String 
                NET: String 
                LOSS: String 
                USE_SIZE: String 
                REMARK: String 

*/

// export default로 Mutation 내용 내보내기
const moduleMutation_S030304_ADD_SEQ_MRP_BY_ORDER = {
    Mutation: {
        mgrInsert_S030304_ADD_SEQ_MRP_BY_ORDER: async (
            _,
            args,
            contextValue,
        ) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tRetArray = [];
            var tSQLArray = [];

            var tIdx9 = 0;
            for (tIdx9 = 0; tIdx9 < args.datas.length; tIdx9++) {
                var tOne = args.datas[tIdx9];
                console.log(tOne);

                var tSQL0 = `
                    select
                        isnull(max(order_mrp_seq), 0) as max_seq
                    from
                        ksv_order_mrp
                    where
                        order_cd = '${tOne.ORDER_CD}'
                        and prod_cd = '${tOne.PROD_CD}'
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(tSQL0));
                var tMaxSeq = 0;
                var tLastSeq = 0;
                if (tRet0.length > 0) {
                    tMaxSeq = tRet0[0].max_seq + 1;
                    tLastSeq = tRet0[0].max_seq;
                }

                var sql1 = `
                    select
                        *
                    from
                        ksv_order_mrp_seqmax
                    where
                        user_id = '${tUserInfo.USER_ID}'
                        and order_cd = '${tOne.ORDER_CD}'
                        and prod_cd = '${tOne.PROD_CD}'
                `;
                var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                var tMrpSeq = 0;
                if (tRet1.length > 0) {
                    let tSQL99 = `
                        update ksv_order_mrp_seqmax
                        set
                            order_mrp_seq = ${tMaxSeq}
                        where
                            user_id = '${tUserInfo.USER_ID}'
                            and order_cd = '${tOne.ORDER_CD}'
                            and prod_cd = '${tOne.PROD_CD}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                } else {
                    let tSQL99 = `
                        insert into
                            ksv_order_mrp_seqmax (user_id, order_cd, prod_cd, order_mrp_seq)
                        values
                            (
                                '${tUserInfo.USER_ID}',
                                '${tOne.ORDER_CD}',
                                '${tOne.PROD_CD}',
                                '${tMaxSeq}'
                            )
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }

                let sql1 = `
                    SELECT
                        '${tOne.ORDER_CD}' as ORDER_CD,
                        '${tOne.PROD_CD}' as PROD_CD,
                        '${tMaxSeq}' as ORDER_MRP_SEQ,
                        MATL_CD,
                        STD_NET,
                        STD_LOSS,
                        STD_GROSS,
                        NET,
                        LOSS,
                        GROSS,
                        VERSION,
                        REMARK,
                        USE_SIZE,
                        SEQ,
                        COUNTRY,
                        '${tUserInfo.USER_ID}' as REG_USER,
                        '${tRetDate}' as REG_DATETIME
                    FROM
                        KSV_PROD_MEM
                    WHERE
                        PROD_CD = '${tOne.PROD_CD}'
                `;
                const tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));

                let sql2 = `
                    SELECT
                        ORDER_CD,
                        PROD_CD,
                        '${tMaxSeq}' as ORDER_MRP_SEQ,
                        MATL_CD,
                        STD_NET,
                        STD_LOSS,
                        STD_GROSS,
                        NET,
                        LOSS,
                        GROSS,
                        VERSION,
                        REMARK,
                        USE_SIZE,
                        SEQ,
                        COUNTRY,
                        '${tUserInfo.USER_ID}' as REG_USER,
                        '${tRetDate}' as REG_DATETIME
                    FROM
                        KSV_ORDER_MRP
                    WHERE
                        PROD_CD = '${tOne.PROD_CD}'
                        AND ORDER_CD = '${tOne.PROD_CD}'
                        AND order_mrp_seq = (
                            select
                                max(order_mrp_seq)
                            from
                                ksv_order_mrp
                            WHERE
                                PROD_CD = '${tOne.PROD_CD}'
                                AND ORDER_CD = '${tOne.PROD_CD}'
                        )
                `;
                const tRet2 = await prisma.$queryRaw(Prisma.raw(sql2));

                var tArray = [];
                tRet1.forEach((col, i) => {
                    var tCheck = 0;
                    var tObj = {};
                    tRet2.forEach((col1, i1) => {
                        if (
                            col.MATL_CD === col1.MATL_CD &&
                            col.REMARK === col1.REMARK &&
                            col.USE_SIZE === col1.USE_SIZE &&
                            col.COUNTRY === col1.COUNTRY
                        ) {
                            tCheck = 1;
                            tObj = { ...col1 };
                        }
                    });

                    if (tCheck === 0) tObj = { ...col };
                    tArray.push(tObj);
                });

                var tIdx2 = 0;
                for (tIdx2 = 0; tIdx2 < tArray.length; tIdx2++) {
                    var tOne2 = { ...tArray[tIdx2] };
                    var tEscRemark = String(tOne2.REMARK || '').replace(
                        /'/gi,
                        "''",
                    );

                    let tSQL99 = `
                        INSERT INTO
                            KSV_ORDER_MRP (
                                ORDER_CD,
                                PROD_CD,
                                ORDER_MRP_SEQ,
                                MATL_CD,
                                STD_NET,
                                STD_LOSS,
                                STD_GROSS,
                                NET,
                                LOSS,
                                GROSS,
                                VERSION,
                                REMARK,
                                USE_SIZE,
                                SEQ,
                                COUNTRY,
                                REG_USER,
                                REG_DATETIME
                            )
                        VALUES
                            (
                                '${tOne2.ORDER_CD}',
                                '${tOne2.PROD_CD}',
                                '${tOne2.ORDER_MRP_SEQ}',
                                '${tOne2.MATL_CD}',
                                '${tOne2.STD_NET}',
                                '${tOne2.STD_LOSS}',
                                '${tOne2.STD_GROSS}',
                                '${tOne2.NET}',
                                '${tOne2.LOSS}',
                                '${tOne2.GROSS}',
                                '${tOne2.VERSION}',
                                '${tEscRemark}',
                                '${tOne2.USE_SIZE}',
                                '${tOne2.SEQ}',
                                '${tOne2.COUNTRY}',
                                '${tOne2.REG_USER}',
                                '${tOne2.REG_DATETIME}'
                            )
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }

                let tSQL99 = `
                    UPDATE KSV_ORDER_MEM
                    SET
                        SIZE_LOSS = b.SIZE_LOSS
                    FROM
                        KSV_PROD_MST b,
                        KSV_ORDER_MEM c
                    WHERE
                        b.PROD_CD = c.PROD_CD
                        AND c.ORDER_CD = '${tOne.ORDER_CD}'
                        AND c.PROD_CD = '${tOne.PROD_CD}'
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
            } catch (e) {
                var tObj = {};
                tObj.CODE = 'ERROR:Add Seq Mrp' + e.message;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tObj = {};
            tObj.CODE = 'SUCCEED:Add Seq Mrp:';
            tObj.id = 0;
            tRetArray.push(tObj);
            return tRetArray;
        },

        mgrInsert_S030304_ADD_SEQ_MRP_BY_ORDER_bak: async (
            _,
            args,
            contextValue,
        ) => {
            //
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
            var tYY = 'B' + yyyy.toString().substring(2) + '-';

            // let tPO = "POA2022S672";
            var tUserInfo = AFLib.getUserInfo(contextValue);

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

            /*
INSERT INTO KSV_ORDER_MRP (ORDER_CD, PROD_CD, ORDER_MRP_SEQ, MATL_CD, STD_NET, STD_LOSS, STD_GROSS, NET, LOSS, GROSS, VERSION, REMARK, USE_SIZE, SEQ, COUNTRY, REG_USER, REG_DATETIME)
SELECT ＇선택OrderCd＇, ＇ksv_order_mem에 있는 Prod_Cd별로 입력＇, ＇마지막order_mrp_seq+1', MATL_CD, STD_NET, STD_LOSS, STD_GROSS, NET,LOSS, GROSS, VERSION, REMARK, USE_SIZE, SEQ, COUNTRY, '실행ID', '실행날짜시간'
FROM KSV_PROD_MEM
WHERE PROD_CD = '선택prodCd'

UPDATE KSV_ORDER_MEM SET SIZE_LOSS = b.SIZE_LOSS
FROM KSV_PROD_MST b, KSV_ORDER_MEM c
WHERE b.PROD_CD = c.PROD_CD
AND c.ORDER_CD = '선택OrderCd'
AND c.PROD_CD = '선택ProdCd‘
*/

            var tSQLArray = [];
            var tIdx9 = 0;
            for (tIdx9 = 0; tIdx9 < args.datas.length; tIdx9++) {
                tSQLArray = [];
                var tInputObj = args.datas[tIdx9];

                var tSQL0 = `
                    select
                        isnull(max(order_mrp_seq), 0) as max_seq
                    from
                        ksv_order_mrp
                    where
                        order_cd = '${tInputObj.ORDER_CD}'
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(tSQL0));
                var tMaxSeq = 0;
                var tLastSeq = 0;
                if (tRet0.length > 0) {
                    tMaxSeq = tRet0[0].max_seq + 1;
                    tLastSeq = tRet0[0].max_seq;
                }

                var tSQL = `
                    select
                        *
                    from
                        ksv_order_mem
                    where
                        order_cd = '${tInputObj.ORDER_CD}'
                        and add_flag = '0'
                `;
                var tRet = await prisma.$queryRaw(Prisma.raw(tSQL));

                var tInsObj = [];
                var tUpdateSQL = '';
                var tInsertSQL = '';

                var tIdx = 0;
                for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                    var tOne = tRet[tIdx];
                    /*
               var tSQL1 = `
                   select
                       *
                   from
                       ksv_order_mrp
                   where
                       prod_cd = '${tOne.PROD_CD}'
                       and order_cd = '${tOne.ORDER_CD}'
                       and order_mrp_seq = ${tLastSeq}
               `;
               */

                    var tSQL1 = `
                        select
                            *
                        from
                            ksv_prod_mem
                        where
                            prod_cd = '${tOne.PROD_CD}'
                    `;
                    var tRet1 = await prisma.$queryRaw(Prisma.raw(tSQL1));

                    var tIdx2 = 0;
                    for (tIdx2 = 0; tIdx2 < tRet1.length; tIdx2++) {
                        var tOne2 = { ...tRet1[tIdx2] };

                        var tWObj = {};
                        tWObj.ORDER_CD = tOne.ORDER_CD;
                        tWObj.PROD_CD = tOne.PROD_CD;
                        tWObj.ORDER_MRP_SEQ = tMaxSeq;
                        tWObj.MATL_CD = tOne2.MATL_CD;
                        tWObj.REG_USER = tUserInfo.USER_ID;
                        tWObj.REG_DATETIME = tRetDate;
                        tWObj.SEQ = parseInt(tOne2.SEQ);
                        tWObj.STD_NET = parseFloat(tOne2.STD_NET);
                        tWObj.STD_LOSS = parseFloat(tOne2.STD_LOSS);
                        tWObj.STD_GROSS = parseFloat(tOne2.STD_GROSS);
                        tWObj.NET = parseFloat(tOne2.NET);
                        tWObj.LOSS = parseFloat(tOne2.LOSS);
                        tWObj.GROSS = parseFloat(tOne2.GROSS);
                        tWObj.REMARK = tOne2.REMARK;
                        var tEscRemark = String(tWObj.REMARK || '').replace(
                            /'/gi,
                            "''",
                        );
                        tWObj.USE_SIZE = tOne2.USE_SIZE;
                        tWObj.COUNTRY = tOne2.COUNTRY;

                        let tSQL99 = `
                            insert into
                                KSV_ORDER_MRP (
                                    ORDER_CD,
                                    PROD_CD,
                                    ORDER_MRP_SEQ,
                                    MATL_CD,
                                    STD_NET,
                                    STD_LOSS,
                                    STD_GROSS,
                                    NET,
                                    LOSS,
                                    GROSS,
                                    REMARK,
                                    USE_SIZE,
                                    SEQ,
                                    COUNTRY,
                                    REG_USER,
                                    REG_DATETIME,
                                    VERSION
                                )
                            values
                                (
                                    '${tWObj.ORDER_CD}',
                                    '${tWObj.PROD_CD}',
                                    '${tWObj.ORDER_MRP_SEQ}',
                                    '${tWObj.MATL_CD}',
                                    ${tWObj.STD_NET},
                                    ${tWObj.STD_LOSS},
                                    ${tWObj.STD_GROSS},
                                    ${tWObj.NET},
                                    ${tWObj.LOSS},
                                    ${tWObj.GROSS},
                                    '${tEscRemark}',
                                    '${tWObj.USE_SIZE}',
                                    ${tWObj.SEQ},
                                    '${tWObj.COUNTRY}',
                                    '${tWObj.REG_USER}',
                                    '${tWObj.REG_DATETIME}',
                                    ''
                                );
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);

                        let tSQL99 = `
                            UPDATE KSV_ORDER_MEM
                            SET
                                SIZE_LOSS = b.SIZE_LOSS
                            FROM
                                KSV_PROD_MST b,
                                KSV_ORDER_MEM c
                            WHERE
                                b.PROD_CD = c.PROD_CD
                                AND c.ORDER_CD = '${tInputObj.ORDER_CD}'
                                AND c.PROD_CD = '${tWObj.PROD_CD}';
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);

                        let tSQL99 = `
                            update ksv_po_mst
                            set
                                req_status = 'Change ORDER_MRP'
                            where
                                po_cd = '${tInputObj.PO_CD}'
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);
                    }
                }
            }

            var tRetArray = [];
            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
                var tObj = {};
                tObj.CODE = 'SUCCEED:Add Seq Mrp:';
                tObj.id = 0;
                tRetArray.push(tObj);
            } catch (e) {
                var tObj = {};
                tObj.CODE = 'ERROR:Add Seq Mrp' + e.message;
                tObj.id = 0;
                tRetArray.push(tObj);
            }
            return tRetArray;
        },
    },
};

export default moduleMutation_S030304_ADD_SEQ_MRP_BY_ORDER;
