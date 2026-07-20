import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기

// export default로 Query 내용 내보내기
const moduleQuery_S0513_3 = {
    Query: {
        mgrQueryS0513_3: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }

            let sqlStr0 = `
                select
                    isnull(count(*), 00) as t_cnt
                from
                    ksv_order_ship
                where
                    invoice_no = '${args.data.INVOICE_NO}'
            `;
            var tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr0));

            var sqlStr = '';

            var tCheckCnt = tRet0[0].t_cnt;

            if (tRet0[0].t_cnt > 0) {
                sqlStr = `
                    SELECT distinct
                        isnull(A.INVOICE_NO, '') as INVOICE_NO,
                        D.ORDER_CD,
                        A.PROD_CD,
                        C.COLOR,
                        -- B.PRICE,  
                        D.AVR_PRICE as AVR_PRICE,
                        D.USD_PRICE as PRICE,
                        B.TOT_CNT,
                        isnull(A.SHIP_CNT, '') as SHIP_CNT,
                        B.SIZE_CNT as ORDER_SIZE_CNT,
                        isnull(A.SIZE_CNT, '') as SHIP_SIZE_CNT,
                        isnull(A.PRICE_CNT, '') as PRICE_CNT,
                        E.SIZE_GROUP,
                        E.SIZE_MEMBER,
                        D.CURR_CD as ORDER_CURR_CD,
                        'USD' as CURR_CD,
                        A.SHIP_PRICE as SHIP_PRICE,
                        D.USD_PRICE as SALES_PRICE,
                        D.USD_PRICE as ORD_PRICE,
                        isnull(A.SHIP_AMOUNT, '0') as SHIP_AMOUNT,
                        E1.STYLE_NAME,
                        A.SHIP_PRICE as SHIP_PRICE2,
                        D.ORDER_STATUS
                    FROM
                        KSV_ORDER_MST D,
                        KSV_ORDER_MEM B,
                        KSV_PROD_MST C,
                        KCD_SIZE_MST E,
                        KCD_STYLE E1,
                        KSV_ORDER_SHIP A
                    where
                        A.INVOICE_NO = '${args.data.INVOICE_NO}'
                        and A.SHIP_DATE = '${args.data.SHIP_DATE}'
                        and A.ORDER_CD = D.ORDER_CD
                        AND D.ORDER_CD = B.ORDER_CD
                        AND B.ORDER_CD = A.ORDER_CD
                        AND B.PROD_CD = A.PROD_CD
                        AND A.PROD_CD = C.PROD_CD
                        AND D.STYLE_CD = E1.STYLE_CD
                        AND B.ADD_FLAG = '0'
                        AND B.PROD_CD = C.PROD_CD
                        AND D.ORDER_TYPE in ('0', '1')
                        AND D.SIZE_GROUP = E.SIZE_GROUP
                `;
            } else {
                sqlStr = `
                    SELECT
                        '' as INVOICE_NO,
                        D.ORDER_CD,
                        B.PROD_CD,
                        C.COLOR,
                        D.AVR_PRICE as AVR_PRICE,
                        D.USD_PRICE as PRICE,
                        B.TOT_CNT,
                        0 as SHIP_CNT,
                        B.SIZE_CNT as ORDER_SIZE_CNT,
                        '' as SHIP_SIZE_CNT,
                        '' as PRICE_CNT,
                        E.SIZE_GROUP,
                        E.SIZE_MEMBER,
                        D.CURR_CD as ORDER_CURR_CD,
                        'USD' as CURR_CD,
                        D.USD_PRICE as SHIP_PRICE,
                        D.USD_PRICE as SALES_PRICE,
                        D.USD_PRICE as ORD_PRICE,
                        0 as SHIP_AMOUNT,
                        E1.STYLE_NAME,
                        D.USD_PRICE as SHIP_PRICE2,
                        D.ORDER_STATUS
                    FROM
                        KSV_ORDER_MEM B,
                        KSV_ORDER_MST D,
                        KSV_PROD_MST C,
                        KCD_SIZE_MST E,
                        KCD_STYLE E1
                    WHERE
                        D.ORDER_CD = B.ORDER_CD
                        AND B.PROD_CD = C.PROD_CD
                        AND D.STYLE_CD = C.STYLE_CD
                        AND D.SIZE_GROUP = E.SIZE_GROUP
                        AND B.ADD_FLAG = '0'
                        AND B.ORDER_CD = '${args.data.ORDER_CD}'
                        AND D.STYLE_CD = E1.STYLE_CD
                        AND D.ORDER_TYPE in ('0', '1')
                `;
            }

            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                INVOICE_NO: '',
                ORDER_CD: '',
                PROD_CD: '',
                COLOR: '',
                PRICE: 0,
                TOT_CNT: 0,
                SHIP_CNT: 0,
                ORDER_SIZE_CNT: '',
                SHIP_SIZE_CNT: '',
                ETC99: '',
            };
            var tRetArray = [];
            var tSum1 = 0;
            var tSum2 = 0;
            var tSum3 = 0;
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tObj = { ...tRet[tIdx] };
                tSum1 += parseFloat(tObj.TOT_CNT);
                tSum2 += parseFloat(tObj.SHIP_CNT);

                var tSizeArray0 = tObj.SIZE_MEMBER.split(',');
                var tSizeArray = [];
                tSizeArray0.forEach((col, i) => {
                    var tObj0 = {};
                    tObj0.size = col;
                    tObj0.idx = i;
                    tObj0.value = 0;
                    tSizeArray.push(tObj0);
                });

                var sql100 = `
                    select
                        *
                    from
                        ksv_order_mem
                    where
                        order_cd = '${tObj.ORDER_CD}'
                        and prod_cd = '${tObj.PROD_CD}'
                `;
                var tRet100 = await prisma.$queryRaw(Prisma.raw(sql100));
                var tIdx0 = 0;
                var tOrderSizeCnt = '';
                var tOrderCnt = 0;
                var tOrderArray = [...tSizeArray];
                for (tIdx0 = 0; tIdx0 < tRet100.length; tIdx0++) {
                    var tObj1 = { ...tRet100[tIdx0] };

                    tOrderCnt += parseFloat(tObj1.TOT_CNT);

                    var tIdx1 = 0;
                    var tArray0 = [];
                    for (tIdx1 = 0; tIdx1 < tOrderArray.length; tIdx1++) {
                        var tObj2 = { ...tOrderArray[tIdx1] };
                        tObj2.value += parseInt(
                            tObj1.SIZE_CNT.substring(tIdx1 * 6, tIdx1 * 6 + 6),
                        );
                        tArray0.push(tObj2);
                    }
                    tOrderArray = [...tArray0];
                }
                tOrderArray.forEach((col3, i3) => {
                    let tZero = '000000';
                    let tStr =
                        tZero.substring(0, 6 - String(col3.value).length) +
                        String(col3.value);
                    tOrderSizeCnt += tStr;
                });
                tObj.TOT_CNT = tOrderCnt;
                tObj.ORDER_SIZE_CNT = tOrderSizeCnt;

                var sql0 = `
                    select
                        *
                    from
                        ksv_order_ship
                        -- where  invoice_no = '${tObj.INVOICE_NO}'
                    where
                        order_cd = '${tObj.ORDER_CD}'
                        and prod_cd = '${tObj.PROD_CD}'
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                tIdx0 = 0;
                var tTotShipSizeCnt = '';
                var tTotShipCnt = 0;
                for (tIdx0 = 0; tIdx0 < tRet0.length; tIdx0++) {
                    var tObj1 = { ...tRet0[tIdx0] };

                    tTotShipCnt += parseFloat(tObj1.SHIP_CNT);

                    var tIdx1 = 0;
                    var tArray0 = [];
                    for (tIdx1 = 0; tIdx1 < tSizeArray.length; tIdx1++) {
                        var tObj2 = { ...tSizeArray[tIdx1] };
                        tObj2.value += parseInt(
                            tObj1.SIZE_CNT.substring(tIdx1 * 6, tIdx1 * 6 + 6),
                        );
                        tArray0.push(tObj2);
                    }
                    tSizeArray = [...tArray0];
                }

                var tTOT_SHIP_SIZE_CNT = '';
                tSizeArray.forEach((col3, i3) => {
                    let tZero = '000000';
                    let tStr =
                        tZero.substring(0, 6 - String(col3.value).length) +
                        String(col3.value);
                    tTOT_SHIP_SIZE_CNT += tStr;
                });
                tObj.TOT_SHIP_SIZE_CNT = tTOT_SHIP_SIZE_CNT;

                tSum3 += parseFloat(tTotShipCnt);
                console.log(
                    `${tObj.ORDER_CD}/ ${tObj.COLOR}/${tObj.TOT_CNT}/${tTotShipCnt}/${tObj.SHIP_CNT}`,
                );

                if (tCheckCnt > 0) {
                    tObj.PRICE = tObj.SHIP_PRICE2;
                } else {
                    if (parseFloat(tObj.SHIP_PRICE) > 0)
                        tObj.PRICE = tObj.SHIP_PRICE;
                }
                tObj.PRICE = AFLib.numToFixed(parseFloat(tObj.PRICE), 4);

                var tPRICE_CNT = '';
                if (tObj.PRICE_CNT === '') {
                    tSizeArray.forEach((col3, i3) => {
                        let tZero = '0000000000';
                        let tStr =
                            tZero.substring(0, 10 - String(tObj.PRICE).length) +
                            String(tObj.PRICE);
                        tPRICE_CNT += tStr;
                    });
                    tObj.PRICE_CNT = tPRICE_CNT;
                }

                var sql0 = `
                    select
                        *
                    from
                        ksv_invoice_mem
                    where
                        order_cd = '${tObj.ORDER_CD}'
                        and invoice_no = '${args.data.INVOICE_NO}'
                        and ship_date = '${args.data.SHIP_DATE}'
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                if (tRet0.length > 0) {
                    if (parseFloat(tRet0[0].SHIP_PRICE) > 0) {
                        tObj.SHIP_PRICE = tRet0[0].SHIP_PRICE;
                        tObj.PRICE = tObj.SHIP_PRICE;
                    }
                    if (parseFloat(tRet0[0].SALES_PRICE) > 0) {
                        tObj.SALES_PRICE = tRet0[0].SALES_PRICE;
                    }
                    if (parseFloat(tRet0[0].ORD_PRICE) > 0) {
                        tObj.ORD_PRICE = tRet0[0].ORD_PRICE;
                    }
                }
                tRetArray.push(tObj);
            }
            console.log(`Total/ ${tSum1}/${tSum3}/${tSum2}`);
            console.log(sqlStr);
            return tRetArray;
        },

        mgrQueryS0513_3_1: async (_, args) => {
            var tSQL = '';

            args.data.forEach((col, i) => {
                if (i === 0) tSQL = `'${col.ORDER_CD}' `;
                else tSQL = `, '${col.ORDER_CD}' `;
            });

            var tRetArray = [];
            var tIdx888 = 0;
            for (tIdx888 = 0; tIdx888 < args.data.length; tIdx888++) {
                var tOne = { ...args.data[tIdx888] };

                var sqlStr = `
                    SELECT
                        '' as INVOICE_NO,
                        D.ORDER_CD,
                        B.PROD_CD,
                        C.COLOR,
                        -- D.AVR_PRICE as PRICE,  
                        D.USD_PRICE as PRICE,
                        B.TOT_CNT,
                        0 as SHIP_CNT,
                        B.SIZE_CNT as ORDER_SIZE_CNT,
                        '' as SHIP_SIZE_CNT,
                        E.SIZE_GROUP,
                        E.SIZE_MEMBER,
                        -- D.CURR_CD,
                        'USD' as CURR_CD,
                        0 as SHIP_PRICE,
                        0 as SHIP_AMOUNT,
                        E1.STYLE_NAME
                    FROM
                        KSV_ORDER_MEM B,
                        KSV_ORDER_MST D,
                        KSV_PROD_MST C,
                        KCD_SIZE_MST E,
                        KCD_STYLE E1
                    WHERE
                        D.ORDER_CD = B.ORDER_CD
                        AND B.PROD_CD = C.PROD_CD
                        AND D.STYLE_CD = C.STYLE_CD
                        AND D.SIZE_GROUP = E.SIZE_GROUP
                        AND B.ADD_FLAG = '0'
                        AND B.ORDER_CD = '${tOne.ORDER_CD}'
                        AND B.PROD_CD = '${tOne.PROD_CD}'
                        AND D.STYLE_CD = E1.STYLE_CD
                        AND D.ORDER_TYPE in ('0', '1')
                `;
                var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

                var tSum1 = 0;
                var tSum2 = 0;
                var tSum3 = 0;
                var tIdx = 0;
                var tSaveObj = {};
                var tShipSizeCnt = '';
                var tSizeArray = [];
                var tSizeArraySave = [];
                for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                    var tObj = { ...tRet[tIdx] };

                    var tSizeArray0 = tObj.SIZE_MEMBER.split(',');
                    tSizeArray0.forEach((col, i) => {
                        var tObj0 = {};
                        tObj0.size = col;
                        tObj0.idx = i;
                        tObj0.value = 0;
                        tSizeArray.push(tObj0);
                    });
                    tSizeArraySave = [...tSizeArray];
                    tSum1 += parseFloat(tObj.TOT_CNT);

                    var tSHIP_SIZE_CNT = '';
                    tSizeArray.forEach((col3, i3) => {
                        let tZero = '000000';
                        let tStr =
                            tZero.substring(0, 6 - String(col3.value).length) +
                            String(col3.value);
                        tSHIP_SIZE_CNT += tStr;
                    });
                    tObj.SHIP_SIZE_CNT = tSHIP_SIZE_CNT;

                    var sql0 = `
                        select
                            *
                        from
                            ksv_order_ship
                        where
                            order_cd = '${tObj.ORDER_CD}'
                            and prod_cd = '${tObj.PROD_CD}'
                    `;
                    var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                    var tIdx0 = 0;
                    var tTotShipSizeCnt = '';
                    var tTotShipCnt = 0;
                    for (tIdx0 = 0; tIdx0 < tRet0.length; tIdx0++) {
                        var tObj1 = { ...tRet0[tIdx0] };

                        tSum2 += parseFloat(tObj1.SHIP_CNT);
                        tTotShipCnt += parseFloat(tObj1.SHIP_CNT);

                        var tIdx1 = 0;
                        var tArray0 = [];
                        for (tIdx1 = 0; tIdx1 < tSizeArray.length; tIdx1++) {
                            var tObj2 = { ...tSizeArray[tIdx1] };
                            tObj2.value += parseInt(
                                tObj1.SIZE_CNT.substring(
                                    tIdx1 * 6,
                                    tIdx1 * 6 + 6,
                                ),
                            );
                            tArray0.push(tObj2);
                        }
                        tSizeArray = [...tArray0];
                    }

                    var tTOT_SHIP_SIZE_CNT = '';
                    tSizeArray.forEach((col3, i3) => {
                        let tZero = '000000';
                        let tStr =
                            tZero.substring(0, 6 - String(col3.value).length) +
                            String(col3.value);
                        tTOT_SHIP_SIZE_CNT += tStr;
                    });
                    tObj.TOT_SHIP_SIZE_CNT = tTOT_SHIP_SIZE_CNT;
                    tSum3 += parseFloat(tTotShipCnt);

                    var sql100 = `
                        select
                            *
                        from
                            ksv_order_mem
                        where
                            order_cd = '${tObj.ORDER_CD}'
                            and prod_cd = '${tObj.PROD_CD}'
                    `;
                    var tRet100 = await prisma.$queryRaw(Prisma.raw(sql100));
                    var tIdx0 = 0;
                    var tOrderSizeCnt = '';
                    var tOrderCnt = 0;
                    var tOrderArray = [...tSizeArraySave];
                    for (tIdx0 = 0; tIdx0 < tRet100.length; tIdx0++) {
                        var tObj1 = { ...tRet100[tIdx0] };

                        tOrderCnt += parseFloat(tObj1.TOT_CNT);

                        var tIdx1 = 0;
                        var tArray0 = [];
                        for (tIdx1 = 0; tIdx1 < tOrderArray.length; tIdx1++) {
                            var tObj2 = { ...tOrderArray[tIdx1] };
                            tObj2.value += parseInt(
                                tObj1.SIZE_CNT.substring(
                                    tIdx1 * 6,
                                    tIdx1 * 6 + 6,
                                ),
                            );
                            tArray0.push(tObj2);
                        }
                        tOrderArray = [...tArray0];
                    }
                    tOrderArray.forEach((col3, i3) => {
                        let tZero = '000000';
                        let tStr =
                            tZero.substring(0, 6 - String(col3.value).length) +
                            String(col3.value);
                        tOrderSizeCnt += tStr;
                    });
                    tObj.TOT_CNT = tOrderCnt;
                    tObj.ORDER_SIZE_CNT = tOrderSizeCnt;

                    tRetArray.push(tObj);
                }
            }

            return tRetArray;
        },

        mgrQueryS0513_3_bak: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }

            let sqlStr0 = `
                select
                    isnull(count(*), 00) as t_cnt
                from
                    ksv_order_ship
                where
                    invoice_no = '${args.data.INVOICE_NO}'
            `;
            var tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr0));

            var sqlStr = '';

            if (tRet0[0].t_cnt > 0) {
                sqlStr = `
                    SELECT distinct
                        isnull(A.INVOICE_NO, '') as INVOICE_NO,
                        D.ORDER_CD,
                        A.PROD_CD,
                        C.COLOR,
                        -- B.PRICE,  
                        D.AVR_PRICE as AVR_PRICE,
                        D.USD_PRICE as PRICE,
                        B.TOT_CNT,
                        isnull(A.SHIP_CNT, '') as SHIP_CNT,
                        B.SIZE_CNT as ORDER_SIZE_CNT,
                        isnull(A.SIZE_CNT, '') as SHIP_SIZE_CNT,
                        E.SIZE_GROUP,
                        E.SIZE_MEMBER,
                        D.CURR_CD as ORDER_CURR_CD,
                        'USD' as CURR_CD,
                        isnull(G.SHIP_PRICE, '0') as SHIP_PRICE,
                        isnull(G.SALES_PRICE, '0') as SALES_PRICE,
                        isnull(G.ORD_PRICE, '0') as ORD_PRICE,
                        isnull(A.SHIP_AMOUNT, '0') as SHIP_AMOUNT,
                        E1.STYLE_NAME
                    FROM
                        KSV_ORDER_MST D,
                        KSV_ORDER_SHIP A,
                        KSV_ORDER_MEM B,
                        KSV_PROD_MST C,
                        KCD_SIZE_MST E,
                        KCD_STYLE E1,
                        KSV_INVOICE_MST F,
                        KSV_INVOICE_MEM G
                    where
                        F.INVOICE_NO = '${args.data.INVOICE_NO}'
                        and F.SHIP_DATE = '${args.data.SHIP_DATE}'
                        and F.INVOICE_NO = G.INVOICE_NO
                        and G.INVOICE_NO = '${args.data.INVOICE_NO}'
                        and F.INVOICE_NO = A.INVOICE_NO
                        and A.INVOICE_NO = '${args.data.INVOICE_NO}'
                        and G.SHIP_DATE = '${args.data.SHIP_DATE}'
                        and A.SHIP_DATE = '${args.data.SHIP_DATE}'
                        and A.SHIP_DATE = G.SHIP_DATE
                        and G.ORDER_CD = A.ORDER_CD
                        and G.ORDER_CD = D.ORDER_CD
                        and D.ORDER_CD = A.ORDER_CD
                        AND D.ORDER_CD = B.ORDER_CD
                        AND B.ORDER_CD = A.ORDER_CD
                        AND B.PROD_CD = A.PROD_CD
                        AND A.PROD_CD = C.PROD_CD
                        AND D.STYLE_CD = E1.STYLE_CD
                        -- AND    LEFT(D.ORDER_CD, 2) = '${args.data.BUYER_CD}'
                        -- AND    A.NAT_CD = '${args.data.NAT_CD}'
                        -- AND    A.SHIP_PTYPE = '${args.data.SHIP_MODE}'
                        AND B.ADD_FLAG = '0'
                        AND B.PROD_CD = C.PROD_CD
                        AND D.ORDER_TYPE in ('0', '1')
                        AND D.SIZE_GROUP = E.SIZE_GROUP
                `;
            } else {
                sqlStr = `
                    SELECT
                        '' as INVOICE_NO,
                        D.ORDER_CD,
                        B.PROD_CD,
                        C.COLOR,
                        D.AVR_PRICE as AVR_PRICE,
                        D.USD_PRICE as PRICE,
                        B.TOT_CNT,
                        0 as SHIP_CNT,
                        B.SIZE_CNT as ORDER_SIZE_CNT,
                        '' as SHIP_SIZE_CNT,
                        E.SIZE_GROUP,
                        E.SIZE_MEMBER,
                        D.CURR_CD as ORDER_CURR_CD,
                        'USD' as CURR_CD,
                        0 as SHIP_PRICE,
                        0 as SALES_PRICE,
                        0 as ORD_PRICE,
                        0 as SHIP_AMOUNT,
                        E1.STYLE_NAME
                    FROM
                        KSV_ORDER_MEM B,
                        KSV_ORDER_MST D,
                        KSV_PROD_MST C,
                        KCD_SIZE_MST E,
                        KCD_STYLE E1
                    WHERE
                        D.ORDER_CD = B.ORDER_CD
                        AND B.PROD_CD = C.PROD_CD
                        AND D.STYLE_CD = C.STYLE_CD
                        AND D.SIZE_GROUP = E.SIZE_GROUP
                        AND B.ADD_FLAG = '0'
                        AND B.ORDER_CD = '${args.data.ORDER_CD}'
                        AND D.STYLE_CD = E1.STYLE_CD
                        AND D.ORDER_TYPE in ('0', '1')
                `;
            }

            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                INVOICE_NO: '',
                ORDER_CD: '',
                PROD_CD: '',
                COLOR: '',
                PRICE: 0,
                TOT_CNT: 0,
                SHIP_CNT: 0,
                ORDER_SIZE_CNT: '',
                SHIP_SIZE_CNT: '',
                ETC99: '',
            };
            var tRetArray = [];
            var tSum1 = 0;
            var tSum2 = 0;
            var tSum3 = 0;
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tObj = { ...tRet[tIdx] };
                tSum1 += parseFloat(tObj.TOT_CNT);
                tSum2 += parseFloat(tObj.SHIP_CNT);

                var tSizeArray0 = tObj.SIZE_MEMBER.split(',');
                var tSizeArray = [];
                tSizeArray0.forEach((col, i) => {
                    var tObj0 = {};
                    tObj0.size = col;
                    tObj0.idx = i;
                    tObj0.value = 0;
                    tSizeArray.push(tObj0);
                });

                var sql100 = `
                    select
                        *
                    from
                        ksv_order_mem
                    where
                        order_cd = '${tObj.ORDER_CD}'
                        and prod_cd = '${tObj.PROD_CD}'
                `;
                var tRet100 = await prisma.$queryRaw(Prisma.raw(sql100));
                var tIdx0 = 0;
                var tOrderSizeCnt = '';
                var tOrderCnt = 0;
                var tOrderArray = [...tSizeArray];
                for (tIdx0 = 0; tIdx0 < tRet100.length; tIdx0++) {
                    var tObj1 = { ...tRet100[tIdx0] };

                    tOrderCnt += parseFloat(tObj1.TOT_CNT);

                    var tIdx1 = 0;
                    var tArray0 = [];
                    for (tIdx1 = 0; tIdx1 < tOrderArray.length; tIdx1++) {
                        var tObj2 = { ...tOrderArray[tIdx1] };
                        tObj2.value += parseInt(
                            tObj1.SIZE_CNT.substring(tIdx1 * 6, tIdx1 * 6 + 6),
                        );
                        tArray0.push(tObj2);
                    }
                    tOrderArray = [...tArray0];
                }
                tOrderArray.forEach((col3, i3) => {
                    let tZero = '000000';
                    let tStr =
                        tZero.substring(0, 6 - String(col3.value).length) +
                        String(col3.value);
                    tOrderSizeCnt += tStr;
                });
                tObj.TOT_CNT = tOrderCnt;
                tObj.ORDER_SIZE_CNT = tOrderSizeCnt;

                var sql0 = `
                    select
                        *
                    from
                        ksv_order_ship
                        -- where  invoice_no = '${tObj.INVOICE_NO}'
                    where
                        order_cd = '${tObj.ORDER_CD}'
                        and prod_cd = '${tObj.PROD_CD}'
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                tIdx0 = 0;
                var tTotShipSizeCnt = '';
                var tTotShipCnt = 0;
                for (tIdx0 = 0; tIdx0 < tRet0.length; tIdx0++) {
                    var tObj1 = { ...tRet0[tIdx0] };

                    tTotShipCnt += parseFloat(tObj1.SHIP_CNT);

                    var tIdx1 = 0;
                    var tArray0 = [];
                    for (tIdx1 = 0; tIdx1 < tSizeArray.length; tIdx1++) {
                        var tObj2 = { ...tSizeArray[tIdx1] };
                        tObj2.value += parseInt(
                            tObj1.SIZE_CNT.substring(tIdx1 * 6, tIdx1 * 6 + 6),
                        );
                        tArray0.push(tObj2);
                    }
                    tSizeArray = [...tArray0];
                }

                var tTOT_SHIP_SIZE_CNT = '';
                tSizeArray.forEach((col3, i3) => {
                    let tZero = '000000';
                    let tStr =
                        tZero.substring(0, 6 - String(col3.value).length) +
                        String(col3.value);
                    tTOT_SHIP_SIZE_CNT += tStr;
                });
                tObj.TOT_SHIP_SIZE_CNT = tTOT_SHIP_SIZE_CNT;

                tSum3 += parseFloat(tTotShipCnt);
                console.log(
                    `${tObj.ORDER_CD}/ ${tObj.COLOR}/${tObj.TOT_CNT}/${tTotShipCnt}/${tObj.SHIP_CNT}`,
                );

                if (parseFloat(tObj.SHIP_PRICE) > 0)
                    tObj.PRICE = tObj.SHIP_PRICE;

                tRetArray.push(tObj);
            }
            console.log(`Total/ ${tSum1}/${tSum3}/${tSum2}`);
            return tRetArray;
        },
        mgrQueryS0513_3_bak: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }

            let sqlStr0 = `
                select
                    isnull(count(*), 00) as t_cnt
                from
                    ksv_order_ship
                where
                    invoice_no = '${args.data.INVOICE_NO}'
            `;
            var tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr0));

            var sqlStr = '';

            if (tRet0[0].t_cnt > 0) {
                sqlStr = `
                    SELECT distinct
                        isnull(A.INVOICE_NO, '') as INVOICE_NO,
                        D.ORDER_CD,
                        A.PROD_CD,
                        C.COLOR,
                        -- B.PRICE,  
                        D.AVR_PRICE as AVR_PRICE,
                        D.USD_PRICE as PRICE,
                        B.TOT_CNT,
                        isnull(A.SHIP_CNT, '') as SHIP_CNT,
                        B.SIZE_CNT as ORDER_SIZE_CNT,
                        isnull(A.SIZE_CNT, '') as SHIP_SIZE_CNT,
                        E.SIZE_GROUP,
                        E.SIZE_MEMBER,
                        D.CURR_CD as ORDER_CURR_CD,
                        'USD' as CURR_CD,
                        isnull(G.SHIP_PRICE, '0') as SHIP_PRICE,
                        isnull(G.SALES_PRICE, '0') as SALES_PRICE,
                        isnull(G.ORD_PRICE, '0') as ORD_PRICE,
                        isnull(A.SHIP_AMOUNT, '0') as SHIP_AMOUNT,
                        E1.STYLE_NAME,
                        A.SHIP_PRICE as SHIP_PRICE2
                    FROM
                        KSV_ORDER_MST D,
                        KSV_ORDER_MEM B,
                        KSV_PROD_MST C,
                        KCD_SIZE_MST E,
                        KCD_STYLE E1,
                        KSV_ORDER_SHIP A
                        left join KSV_INVOICE_MEM G on A.INVOICE_NO = G.INVOICE_NO
                        and A.SHIP_DATE = G.SHIP_DATE
                        and A.ORDER_CD = G.ORDER_CD
                        and G.INVOICE_NO = '${args.data.INVOICE_NO}'
                        and G.SHIP_DATE = '${args.data.SHIP_DATE}'
                    where
                        A.INVOICE_NO = '${args.data.INVOICE_NO}'
                        and A.SHIP_DATE = '${args.data.SHIP_DATE}'
                        and A.ORDER_CD = D.ORDER_CD
                        AND D.ORDER_CD = B.ORDER_CD
                        AND B.ORDER_CD = A.ORDER_CD
                        AND B.PROD_CD = A.PROD_CD
                        AND A.PROD_CD = C.PROD_CD
                        AND D.STYLE_CD = E1.STYLE_CD
                        AND B.ADD_FLAG = '0'
                        AND B.PROD_CD = C.PROD_CD
                        AND D.ORDER_TYPE in ('0', '1')
                        AND D.SIZE_GROUP = E.SIZE_GROUP
                `;
            } else {
                sqlStr = `
                    SELECT
                        '' as INVOICE_NO,
                        D.ORDER_CD,
                        B.PROD_CD,
                        C.COLOR,
                        D.AVR_PRICE as AVR_PRICE,
                        D.USD_PRICE as PRICE,
                        B.TOT_CNT,
                        0 as SHIP_CNT,
                        B.SIZE_CNT as ORDER_SIZE_CNT,
                        '' as SHIP_SIZE_CNT,
                        E.SIZE_GROUP,
                        E.SIZE_MEMBER,
                        D.CURR_CD as ORDER_CURR_CD,
                        'USD' as CURR_CD,
                        0 as SHIP_PRICE,
                        0 as SALES_PRICE,
                        0 as ORD_PRICE,
                        0 as SHIP_AMOUNT,
                        E1.STYLE_NAME,
                        0 as SHIP_PRICE2
                    FROM
                        KSV_ORDER_MEM B,
                        KSV_ORDER_MST D,
                        KSV_PROD_MST C,
                        KCD_SIZE_MST E,
                        KCD_STYLE E1
                    WHERE
                        D.ORDER_CD = B.ORDER_CD
                        AND B.PROD_CD = C.PROD_CD
                        AND D.STYLE_CD = C.STYLE_CD
                        AND D.SIZE_GROUP = E.SIZE_GROUP
                        AND B.ADD_FLAG = '0'
                        AND B.ORDER_CD = '${args.data.ORDER_CD}'
                        AND D.STYLE_CD = E1.STYLE_CD
                        AND D.ORDER_TYPE in ('0', '1')
                `;
            }

            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                INVOICE_NO: '',
                ORDER_CD: '',
                PROD_CD: '',
                COLOR: '',
                PRICE: 0,
                TOT_CNT: 0,
                SHIP_CNT: 0,
                ORDER_SIZE_CNT: '',
                SHIP_SIZE_CNT: '',
                ETC99: '',
            };
            var tRetArray = [];
            var tSum1 = 0;
            var tSum2 = 0;
            var tSum3 = 0;
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tObj = { ...tRet[tIdx] };
                tSum1 += parseFloat(tObj.TOT_CNT);
                tSum2 += parseFloat(tObj.SHIP_CNT);

                var tSizeArray0 = tObj.SIZE_MEMBER.split(',');
                var tSizeArray = [];
                tSizeArray0.forEach((col, i) => {
                    var tObj0 = {};
                    tObj0.size = col;
                    tObj0.idx = i;
                    tObj0.value = 0;
                    tSizeArray.push(tObj0);
                });

                var sql100 = `
                    select
                        *
                    from
                        ksv_order_mem
                    where
                        order_cd = '${tObj.ORDER_CD}'
                        and prod_cd = '${tObj.PROD_CD}'
                `;
                var tRet100 = await prisma.$queryRaw(Prisma.raw(sql100));
                var tIdx0 = 0;
                var tOrderSizeCnt = '';
                var tOrderCnt = 0;
                var tOrderArray = [...tSizeArray];
                for (tIdx0 = 0; tIdx0 < tRet100.length; tIdx0++) {
                    var tObj1 = { ...tRet100[tIdx0] };

                    tOrderCnt += parseFloat(tObj1.TOT_CNT);

                    var tIdx1 = 0;
                    var tArray0 = [];
                    for (tIdx1 = 0; tIdx1 < tOrderArray.length; tIdx1++) {
                        var tObj2 = { ...tOrderArray[tIdx1] };
                        tObj2.value += parseInt(
                            tObj1.SIZE_CNT.substring(tIdx1 * 6, tIdx1 * 6 + 6),
                        );
                        tArray0.push(tObj2);
                    }
                    tOrderArray = [...tArray0];
                }
                tOrderArray.forEach((col3, i3) => {
                    let tZero = '000000';
                    let tStr =
                        tZero.substring(0, 6 - String(col3.value).length) +
                        String(col3.value);
                    tOrderSizeCnt += tStr;
                });
                tObj.TOT_CNT = tOrderCnt;
                tObj.ORDER_SIZE_CNT = tOrderSizeCnt;

                var sql0 = `
                    select
                        *
                    from
                        ksv_order_ship
                        -- where  invoice_no = '${tObj.INVOICE_NO}'
                    where
                        order_cd = '${tObj.ORDER_CD}'
                        and prod_cd = '${tObj.PROD_CD}'
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                tIdx0 = 0;
                var tTotShipSizeCnt = '';
                var tTotShipCnt = 0;
                for (tIdx0 = 0; tIdx0 < tRet0.length; tIdx0++) {
                    var tObj1 = { ...tRet0[tIdx0] };

                    tTotShipCnt += parseFloat(tObj1.SHIP_CNT);

                    var tIdx1 = 0;
                    var tArray0 = [];
                    for (tIdx1 = 0; tIdx1 < tSizeArray.length; tIdx1++) {
                        var tObj2 = { ...tSizeArray[tIdx1] };
                        tObj2.value += parseInt(
                            tObj1.SIZE_CNT.substring(tIdx1 * 6, tIdx1 * 6 + 6),
                        );
                        tArray0.push(tObj2);
                    }
                    tSizeArray = [...tArray0];
                }

                var tTOT_SHIP_SIZE_CNT = '';
                tSizeArray.forEach((col3, i3) => {
                    let tZero = '000000';
                    let tStr =
                        tZero.substring(0, 6 - String(col3.value).length) +
                        String(col3.value);
                    tTOT_SHIP_SIZE_CNT += tStr;
                });
                tObj.TOT_SHIP_SIZE_CNT = tTOT_SHIP_SIZE_CNT;

                tSum3 += parseFloat(tTotShipCnt);
                console.log(
                    `${tObj.ORDER_CD}/ ${tObj.COLOR}/${tObj.TOT_CNT}/${tTotShipCnt}/${tObj.SHIP_CNT}`,
                );

                if (parseFloat(tObj.SHIP_PRICE) > 0)
                    tObj.PRICE = tObj.SHIP_PRICE;

                tRetArray.push(tObj);
            }
            console.log(`Total/ ${tSum1}/${tSum3}/${tSum2}`);
            return tRetArray;
        },
    },
};

export default moduleQuery_S0513_3;
