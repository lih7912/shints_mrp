import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기

// export default로 Query 내용 내보내기
const moduleQuery_S0439_3_1 = {
    Query: {
        mgrQueryS0439_3_1: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tSQL = '';
            if (args.data.TYPE === 'LC') {
                tSQL += `AND A.KIND = 'LC'  `;
            } else if (args.data.TYPE === 'Deposit') {
                tSQL += `AND A.KIND = 'DEPOSIT' `;
            }

            var sDate = args.data.S_PAY_DATE;
            if (sDate === '') sDate = `${tRetDate1.substring(0, 4)}0101`;
            var eDate = args.data.E_PAY_DATE;
            if (eDate === '') eDate = `99999999`;

            var sqlInDate = '';
            if (args.data.S_IN_DATE || args.data.E_IN_DATE) {
                var sInDate = args.data.S_IN_DATE;
                var eInDate = args.data.E_IN_DATE;
                if (!sInDate) sInDate = `${tRetDate1.substring(0, 4)}0101`;
                if (!eInDate) eInDate = `99999999`;
                sqlInDate = `AND     left(A.SHIP_DATE, 8) between '${sInDate}' and '${eInDate}'`;
            }

            let sqlStr = `
                SELECT
                    B.PAY_DATE AS PAY_DATE,
                    A.KIND AS
                TYPE,
                A.REG_USER,
                A.PU_CD,
                A1.VENDOR_NAME,
                A.CURR_CD,
                A.AMT as PAY_AMOUNT,
                A.AMT as DEPOSIT_AMT,
                A.AMT as LC_AMT,
                '' AS LC_FLAG,
                A.RATE AS LC_RATE,
                A.GW_STATUS AS DEPOSIT_GW_STATUS,
                A.APPRO_KEY AS DEPOSIT_GW_KEY,
                A.RATE as DEPOSIT_RATE,
                A.SHIP_DATE as IN_DATETIME,
                A.SHIP_MODE,
                A.SHIP_DATE,
                A.EXPIRY_DATE,
                A.LATEST_SHIP_DATE,
                B.LATEST_SHIP_DATE as LATEST_SHIP_DATE2,
                isnull(a3.NEOE_NO, '') as NEOE_NO,
                A.PAY_DATE as REQUEST_PAY_DATE,
                A.PAY_REPORT
                FROM
                    KSV_PU_LCDEPOSIT A
                    left join kcd_app_import a3 on a3.pay_report = a.pay_report,
                    KSV_PU_MST2 B,
                    KCD_VENDOR A1,
                    KCD_BUYER A2
                WHERE
                    A.PU_CD = B.PU_CD
                    AND B.VENDOR_CD = A1.VENDOR_CD
                    AND B.BUYER_CD = A2.BUYER_CD ${tSQL}
                    AND A.REG_USER like '%${args.data.PURCHASER}%'
                    AND A.PU_CD like '%${args.data.PU_CD}%'
                    AND (
                        A1.VENDOR_CD like '%${args.data.VENDOR_CD}%'
                        or A1.VENDOR_NAME like '%${args.data.VENDOR_CD}%'
                    )
                    AND A.PAY_DATE between '${sDate}' and '${eDate}'
                    AND (
                        A.GW_STATUS is null
                        or A.GW_STATUS like '%${args.data.GW_STATUS}%'
                    ) ${sqlInDate}
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetArray = [];
            var tIdx = 0;
            tRet.forEach((col, i) => {
                var tObj = { ...col };
                if (tObj.TYPE === 'LC') {
                    tObj.DEPOSIT_AMT = '0';
                }
                if (tObj.TYPE === 'DEPOSIT') {
                    tObj.LC_AMT = '0';
                }

                if (!tObj.LATEST_SHIP_DATE) {
                    if (tObj.LATEST_SHIP_DATE2)
                        tObj.LATEST_SHIP_DATE = tObj.LATEST_SHIP_DATE2;
                }

                tRetArray.push(tObj);
            });
            return tRetArray;
        },

        mgrQueryS0439_3_1_1223: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tSQL = '';
            if (args.data.TYPE === 'LC') {
                tSQL += `AND A.LC_FLAG = '1'  `;
            } else if (args.data.TYPE === 'Deposit') {
                tSQL += `AND A.DEPOSIT_AMT > 0 `;
            } else {
                tSQL += `AND (A.LC_FLAG = '1'  OR A.DEPOSIT_AMT > 0) `;
            }

            var sDate = args.data.S_PAY_DATE;
            if (sDate === '') sDate = `${tRetDate1.substring(0, 4)}0101`;
            var eDate = args.data.E_PAY_DATE;
            if (eDate === '') eDate = `99999999`;

            var sqlInDate = '';
            if (args.data.S_IN_DATE || args.data.E_IN_DATE) {
                var sInDate = args.data.S_IN_DATE;
                var eInDate = args.data.E_IN_DATE;
                if (!sInDate) sInDate = `${tRetDate1.substring(0, 4)}0101`;
                if (!eInDate) eInDate = `99999999`;
                sqlInDate = `AND     left(A.SHIP_DATE, 8) between '${sInDate}' and '${eInDate}'`;
            }

            let sqlStr = `
                SELECT distinct
                    A.PAY_DATE AS PAY_DATE,
                    '' AS
                TYPE,
                A.REG_USER,
                A.PU_CD,
                A1.VENDOR_NAME,
                A.CURR_CD,
                C.PAY_AMOUNT,
                A.DEPOSIT_AMT,
                A.LC_AMT,
                A.LC_FLAG,
                '' AS LC_RATE,
                A.DEPOSIT_GW_STATUS,
                A.DEPOSIT_GW_KEY,
                A.DEPOSIT_RATE,
                left(A.SHIP_DATE, 8) as IN_DATETIME,
                isnull(A.SHIP_MODE, '') as SHIP_MODE,
                isnull(A.SHIP_DATE, '') as SHIP_DATE,
                isnull(A.EXPIRY_DATE, '') as EXPIRY_DATE,
                isnull(A.LATEST_SHIP_DATE, '') as LATEST_SHIP_DATE,
                isnull(A.NEOE_NO, '') as NEOE_NO,
                '' as REQUEST_PAY_DATE
                FROM
                    KSV_PU_MST2 A,
                    KCD_VENDOR A1,
                    KCD_BUYER A2,
                    (
                        select
                            pu_cd,
                            sum(po_qty2 * po_price) as PAY_AMOUNT
                        from
                            ksv_stock_mem2
                        group by
                            pu_cd
                    ) C
                WHERE
                    A.VENDOR_CD = A1.VENDOR_CD
                    AND A.BUYER_CD = A2.BUYER_CD
                    AND A.PU_CD = C.PU_CD ${tSQL}
                    AND A.PU_TYPE = '1'
                    -- AND     A.PO_CD2 like '%${args.data.PO_CD}%'
                    -- AND     (A2.BUYER_CD like '%${args.data.BUYER_CD}%' or A2.BUYER_NAME like '%${args.data.BUYER_CD}%')
                    AND A.REG_USER like '%${args.data.PURCHASER}%'
                    AND A.PU_CD like '%${args.data.PU_CD}%'
                    AND (
                        A1.VENDOR_CD like '%${args.data.VENDOR_CD}%'
                        or A1.VENDOR_NAME like '%${args.data.VENDOR_CD}%'
                    )
                    AND A.PAY_DATE between '${sDate}' and '${eDate}'
                    AND (
                        A.DEPOSIT_GW_STATUS is null
                        or A.DEPOSIT_GW_STATUS like '%${args.data.GW_STATUS}%'
                    )
                    -- AND     A3.LC_QTY > 0 and A3.IN_QTY <= 0
                    ${sqlInDate}
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetArray = [];
            var tIdx = 0;
            tRet.forEach((col, i) => {
                var tObj = { ...col };
                tRetArray.push(tObj);
            });
            return tRetArray;
        },
    },
};

export default moduleQuery_S0439_3_1;
