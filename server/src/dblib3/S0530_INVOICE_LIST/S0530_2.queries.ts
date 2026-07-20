import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0530_2 = {
    Query: {
        mgrQueryS0530_2: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }
            let sqlStr = `
                SELECT
                    A1.*,
                    A2.BUYER_NAME,
                    isnull(A3.CD_NAME, '') as SHIP_MODE_N,
                    isnull(A4.CD_NAME, '') as DELIVERY_TYPE_N,
                    0.0 AS SHIP_PRICE,
                    '' AS BL_FILE,
                    '' AS PL_FILE,
                    '' AS DEBIT_FILE
                FROM
                    (
                        SELECT
                            isnull(A.INVOICE_NO, '') as INVOICE_NO,
                            C.ORDER_CD,
                            LEFT(C.ORDER_CD, 2) as BUYER_CD,
                            C.TOT_CNT as ORDER_QTY,
                            isnull(A.SHIP_DATE, '') as SHIP_DATE,
                            isnull(A.NAT_CD, '') as NAT_CD,
                            isnull(A.SHIP_PTYPE, '') as SHIP_PTYPE,
                            isnull(A.DELIVERY_TYPE, '') as DELIVERY_TYPE,
                            isnull(sum(A.SHIP_CNT), 0) AS SHIP_QTY,
                            isnull(sum(A.SHIP_AMOUNT), 0) as SHIP_AMOUNT
                        FROM
                            KSV_ORDER_MST C,
                            KSV_ORDER_SHIP A,
                            KCD_BUYER B,
                            KCD_STYLE D
                        WHERE
                            A.INVOICE_NO LIKE '%${args.data.INVOICE_NO}%'
                            AND A.ORDER_CD = C.ORDER_CD
                            AND C.ORDER_STATUS in ('2', '3', '5', '6')
                            -- AND LEFT(C.ORDER_CD , 2) like '%${args.data.BUYER_CD}%'
                            AND LEFT(C.ORDER_CD, 2) = B.BUYER_CD
                            AND C.STYLE_CD = D.STYLE_CD
                        GROUP BY
                            A.INVOICE_NO,
                            C.ORDER_CD,
                            LEFT(C.ORDER_CD, 2),
                            C.TOT_CNT,
                            A.SHIP_DATE,
                            A.NAT_CD,
                            A.SHIP_PTYPE,
                            A.DELIVERY_TYPE
                            -- ORDER BY A.SHIP_DATE DESC
                            -- OFFSET 0 ROWS FETCH NEXT 1000 ROWS ONLY
                    ) A1
                    left join KCD_CODE A3 ON A1.SHIP_PTYPE = A3.CD_CODE
                    and A3.CD_GROUP = 'SHIP_PTYPE'
                    left join KCD_CODE A4 ON A1.DELIVERY_TYPE = A4.CD_CODE
                    and A4.CD_GROUP = 'SHIPMENT_SHIP_MODE',
                    KCD_BUYER A2
                where
                    A1.BUYER_CD = A2.BUYER_CD
                order by
                    A1.ORDER_CD,
                    A1.SHIP_DATE
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
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tObj = { ...tRet[tIdx] };
                let sql0 = `
                    select
                        *
                    from
                        kcd_fileinfo
                    where
                        file_key = '${tObj.INVOICE_NO}'
                        and kind = 'ORDER_SHIP_BL_FILE'
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                if (tRet0.length > 0) {
                    tObj.BL_FILE = tRet0[0].NAME;
                    tObj.BL_FILE_URL = tRet0[0].URL;
                }

                let sql1 = `
                    select
                        *
                    from
                        kcd_fileinfo
                    where
                        file_key = '${tObj.INVOICE_NO}'
                        and kind = 'ORDER_SHIP_PL_FILE'
                `;
                var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                if (tRet1.length > 0) {
                    tObj.PL_FILE = tRet1[0].NAME;
                    tObj.PL_FILE_URL = tRet1[0].URL;
                }
                tRetArray.push(tObj);
            }
            return tRetArray;
        },
        mgrQueryS0530_2_LIST0: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tUserInfo = AFLib.getUserInfo(contextValue);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tSQL = '';
            var sDate = args.data.S_DATE;
            var eDate = args.data.E_DATE;
            if (sDate === '') {
                sDate = `${tRetDate1.substring(0, 4)}0101`;
            }
            if (eDate === '') {
                eDate = `${tRetDate1.substring(0, 6)}31`;
            }
            tSQL = `and a.ship_date between '${sDate}' and '${eDate}' `;

            let sqlStr = `
                select
                    a.INVOICE_NO,
                    a.BUYER_CD,
                    a.BL_NO,
                    a.SHIP_DATE,
                    a.DELIVERY_TYPE,
                    b.BUYER_NAME,
                    d.NAME as BL_FILE,
                    d.URL as BL_FILE_URL,
                    e.NAME as PL_FILE,
                    e.URL as PL_FILE_URL,
                    '' as DEBIT_FILE,
                    c.cd_name as DELIVERY_TYPE_N,
                    a.TOT_AMT as SHIP_AMOUNT
                from
                    ksv_invoice_mst a
                    left join kcd_code c on c.cd_code = a.DELIVERY_TYPE
                    and c.cd_group = 'SHIPMENT_SHIP_MODE'
                    left join kcd_fileinfo d on d.file_key = a.invoice_no
                    and d.kind = 'ORDER_SHIP_BL_FILE'
                    left join kcd_fileinfo e on e.file_key = a.invoice_no
                    and e.kind = 'ORDER_SHIP_PL_FILE',
                    kcd_buyer b
                where
                    a.invoice_no like '%${args.data.INVOICE_NO}%'
                    and a.buyer_cd like '%${args.data.BUYER_CD}%'
                    and a.buyer_cd = b.buyer_cd ${tSQL}
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tObj = { ...tRet[tIdx] };
                let sql0 = `
                    select
                        a.invoice_no,
                        a.ship_ptype,
                        b.cd_name as ship_ptype_n,
                        a.nat_cd,
                        a.exfactory,
                        sum(a.ship_cnt) as ship_cnt
                    from
                        ksv_order_ship a
                        left join kcd_code b on b.cd_code = a.ship_ptype
                        and b.cd_group = 'SHIP_PTYPE'
                    where
                        a.invoice_no = '${tObj.INVOICE_NO}'
                    group by
                        a.invoice_no,
                        a.ship_ptype,
                        b.cd_name,
                        a.nat_cd,
                        a.exfactory
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));

                if (tRet0.length > 0) {
                    tObj.SHIP_PTYPE = tRet0[0].ship_ptype;
                    tObj.SHIP_MODE_N = tRet0[0].ship_ptype_n;
                    tObj.SHIP_QTY = tRet0[0].ship_cnt;
                    tObj.NAT_CD = tRet0[0].nat_cd;
                    tObj.EXFACTORY = tRet0[0].exfactory;
                }

                tObj.ORDER_CD = '';
                tRetArray.push(tObj);
            }
            return tRetArray;
        },
    },
};

export default moduleQuery_S0530_2;
