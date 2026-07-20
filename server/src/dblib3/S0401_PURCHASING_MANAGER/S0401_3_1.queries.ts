import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0401_3_1 = {
    Query: {
        mgrQueryS0401_3_1: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tUserInfo = AFLib.getUserInfo(contextValue);

            const norm = (v) =>
                String(v ?? '')
                    .trim()
                    .toUpperCase();
            const esc = (v) => String(v ?? '').replace(/'/g, "''");
            const toNum = (v) => parseFloat(v || 0);
            const toFloat4 = (v) =>
                String(AFLib.getFloat(parseFloat(v || 0), 4));

            const splitComma = (str) =>
                String(str ?? '')
                    .split(',')
                    .map((v) => v.trim())
                    .filter((v) => v !== '');

            const splitSlash = (str) =>
                String(str ?? '')
                    .split('/')
                    .map((v) => v.trim())
                    .filter((v) => v !== '');

            const makeInSql = (arr) =>
                arr
                    .filter((v) => String(v ?? '').trim() !== '')
                    .map((v) => `'${esc(v)}'`)
                    .join(', ');

            var sqlMrpDate = '';
            var s_MRP_DATE = args.data.S_MRP_DATE;
            var e_MRP_DATE = args.data.E_MRP_DATE;
            if (args.data.S_MRP_DATE === '')
                s_MRP_DATE = `${tRetDate.substring(0, 4)}0101`;
            if (args.data.E_MRP_DATE === '') e_MRP_DATE = '99999999';
            if (!(args.data.S_MRP_DATE === '' && args.data.E_MRP_DATE === '')) {
                sqlMrpDate = `AND A.MRP_DATE between '${esc(s_MRP_DATE)}' and '${esc(e_MRP_DATE)}' `;
            }

            var sqlOrderDate = '';
            var s_ORDER_DATE = args.data.S_ORDER_DATE;
            var e_ORDER_DATE = args.data.E_ORDER_DATE;
            if (args.data.S_ORDER_DATE === '')
                s_ORDER_DATE = `${tRetDate.substring(0, 4)}0101`;
            if (args.data.E_ORDER_DATE === '') e_ORDER_DATE = '99999999';
            if (
                !(
                    args.data.S_ORDER_DATE === '' &&
                    args.data.E_ORDER_DATE === ''
                )
            ) {
                sqlOrderDate = `AND (A.ORDER_DATE between '${esc(s_ORDER_DATE)}' and '${esc(e_ORDER_DATE)}') `;
            }

            var sqlPayDate = '';
            var s_PAY_DATE = args.data.S_PAY_DATE;
            var e_PAY_DATE = args.data.E_PAY_DATE;
            if (args.data.S_PAY_DATE === '')
                s_PAY_DATE = `${tRetDate.substring(0, 4)}0101`;
            if (args.data.E_PAY_DATE === '') e_PAY_DATE = '99999999';
            if (!(args.data.S_PAY_DATE === '' && args.data.E_PAY_DATE === '')) {
                sqlPayDate = `AND (A.PAY_DATE between '${esc(s_PAY_DATE)}' and '${esc(e_PAY_DATE)}') `;
            } else if (String(args.data.PAY_DATE ?? '').trim() !== '') {
                // Backward compatibility for callers still sending a single PAY_DATE.
                sqlPayDate = `AND A.PAY_DATE = '${esc(args.data.PAY_DATE)}' `;
            }

            var sqlPo = '';
            if (args.data.PO_CD !== '') {
                var tCols = splitComma(args.data.PO_CD);
                if (tCols.length > 0) {
                    sqlPo =
                        'AND (' +
                        tCols
                            .map((col) => `A.PO_CD2 like '%${esc(col)}%'`)
                            .join(' OR ') +
                        ')';
                }
                sqlMrpDate = '';
                sqlOrderDate = '';
            }

            var sqlPu = '';
            if (args.data.PU_CD !== '') {
                var puList = splitComma(args.data.PU_CD);
                if (puList.length > 1) {
                    sqlPu = `AND A.PU_CD in (${makeInSql(puList)}) `;
                } else {
                    sqlPu = `AND A.PU_CD like '%${esc(args.data.PU_CD)}%' `;
                }
                sqlMrpDate = '';
                sqlOrderDate = '';
            }

            var tPuStatus = '';
            if (args.data.PU_STATUS === '0') tPuStatus = 'Not END';
            if (args.data.PU_STATUS === '1') tPuStatus = 'Registed';
            if (args.data.PU_STATUS === '2') tPuStatus = 'Ordered';
            if (args.data.PU_STATUS === '3') tPuStatus = 'Fixed';
            if (args.data.PU_STATUS === '4') tPuStatus = 'Bill Reg';
            if (args.data.PU_STATUS === '5') tPuStatus = 'Bill Finish';
            if (args.data.PU_STATUS === '6') tPuStatus = 'End';
            if (args.data.PU_STATUS === '7') tPuStatus = 'MRP Update';

            var statusSql = '';
            if (tPuStatus === 'Registed')
                statusSql = ` and (A.ORDER_DATE is null or A.ORDER_DATE = '') `;
            if (tPuStatus === 'Ordered')
                statusSql = ` and (A.ORDER_DATE is not null and A.ORDER_DATE <> '') `;

            var tUserId = args.data.USER_ID;

            // 조건부 where절 변수 생성 - 빈 값일 때 like절 제외
            var sqlVendorType = '';
            if (String(args.data.VENDOR_TYPE ?? '').trim() !== '') {
                sqlVendorType = `AND A1.VENDOR_TYPE like '%${esc(args.data.VENDOR_TYPE)}%' `;
            }

            var sqlBuyerCd = '';
            if (String(args.data.BUYER_CD ?? '').trim() !== '') {
                sqlBuyerCd = `AND A4.BUYER_CD like '%${esc(args.data.BUYER_CD)}%' `;
            }

            var sqlVendorSearch = '';
            if (String(args.data.VENDOR_CD ?? '').trim() !== '') {
                sqlVendorSearch = `AND (
                        A1.VENDOR_CD like '%${esc(args.data.VENDOR_CD)}%'
                        OR A1.VENDOR_NAME like '%${esc(args.data.VENDOR_CD)}%'
                    ) `;
            }

            var sqlUser = '';
            if (String(tUserId ?? '').trim() !== '') {
                sqlUser = `AND A.REG_USER like '%${esc(tUserId)}%' `;
            }

            let sqlStr = `
                SELECT
                    A.PU_STATUS,
                    A.REG_USER,
                    A.BUYER_CD,
                    A4.BUYER_NAME,
                    A.PU_CD,
                    A.PO_CD2 AS PO_CD,
                    A1.VENDOR_NAME,
                    A1.VENDOR_TYPE,
                    A3.CD_NAME as VENDOR_TYPE_N,
                    A.MATL_TYPE,
                    A.NORMI,
                    A.MRP_DATE,
                    isnull(A.ORDER_DATE, '') as ORDER_DATE,
                    A.DUE_DATE,
                    A.EX_FACTORY AS EXPECT_DATE,
                    A.TRADE_TERM AS PAY_TERM,
                    A.CURR_CD,
                    A.VENDOR_CD,
                    A.FACTORY_CD,
                    A.TARGET_ETA,
                    isnull(A.M_ETA, '') as M_ETA,
                    A.ETA,
                    A.DEPOSIT_AMT,
                    A.LC_AMT,
                    A.PAY_TYPE AS PAY_TYPE,
                    A.PAY_DATE AS PAY_DATE,
                    isnull(A.NOT_ORDER_FLAG, '') as NOT_ORDER_FLAG,
                    isnull(A.PO_AMT, 0) as PU_AMT,
                    isnull(A.STSIN_AMT, 0) as SUM_STS_IN,
                    isnull(A.STSOUT_AMT, 0) as SUM_STS_OUT,
                    isnull(A.FACIN_AMT, 0) as SUM_FACIN,
                    isnull(A.BILL_AMT, 0) as SUM_PAY,
                    isnull(B.TITLE, '') as FILE_TITLE
                FROM
                    KSV_PU_MST2 A
                    INNER JOIN KCD_VENDOR A1 ON A.VENDOR_CD = A1.VENDOR_CD
                    INNER JOIN KCD_BUYER A4 ON A.BUYER_CD = A4.BUYER_CD
                    INNER JOIN KCD_CODE A3 ON A1.VENDOR_TYPE = A3.CD_CODE
                    AND A3.CD_GROUP = 'VENDOR_TYPE'
                    LEFT JOIN KCD_FILEINFO B ON B.FILE_KEY = A.PU_CD
                    AND B.KIND = 'PURCHASE'
                WHERE
                    A.PU_TYPE = '1'
                    ${sqlVendorType}
                    AND A.PO_CD2 <> '' ${sqlPo} ${statusSql}
                    ${sqlBuyerCd}
                    ${sqlVendorSearch}
                    ${sqlUser} ${sqlPu} ${sqlMrpDate} ${sqlOrderDate} ${sqlPayDate}
                ORDER BY
                    A.PO_CD2,
                    A1.VENDOR_NAME
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            if (tRet.length <= 0) return [];

            // CTE 구조로 재작성:
            // - filtered_pu: KSV_PU_MST2 필터 블록을 1번만 계산 (기존 3번 반복)
            // - latest_matl: kcd_matl_mem max(matl_seq) 상관 서브쿼리를 1번만 계산 (기존 row마다 3번)
            // - latest_capabook/capasample: max(book_date) 상관 서브쿼리 4개를 각 1번만 계산
            var sqlAllMerged = `
                WITH filtered_pu AS (
                    SELECT A.PU_CD, A.VENDOR_CD
                    FROM KSV_PU_MST2 A
                        INNER JOIN KCD_VENDOR A1 ON A.VENDOR_CD = A1.VENDOR_CD
                        INNER JOIN KCD_BUYER A4 ON A.BUYER_CD = A4.BUYER_CD
                        INNER JOIN KCD_CODE A3 ON A1.VENDOR_TYPE = A3.CD_CODE
                            AND A3.CD_GROUP = 'VENDOR_TYPE'
                        LEFT JOIN KCD_FILEINFO B ON B.FILE_KEY = A.PU_CD
                            AND B.KIND = 'PURCHASE'
                    WHERE A.PU_TYPE = '1'
                        ${sqlVendorType}
                        AND A.PO_CD2 <> '' ${sqlPo} ${statusSql}
                        ${sqlBuyerCd}
                        ${sqlVendorSearch}
                        ${sqlUser} ${sqlPu} ${sqlMrpDate} ${sqlOrderDate} ${sqlPayDate}
                ),
                latest_matl AS (
                    SELECT matl_cd, MAX(matl_seq) AS max_seq
                    FROM kcd_matl_mem
                    GROUP BY matl_cd
                )
                SELECT
                    m.PU_CD,
                    (m.PO_QTY + m0.PO_QTY) as SM_PO_QTY,
                    m.IN_QTY AS SM_IN_QTY,
                    m.OUT_QTY AS SM_OUT_QTY,
                    m.PO_AMT AS SM_PO_AMT,
                    m.STOCK_AMT,
                    m.IN_AMT,
                    m.OUT_AMT,
                    m.INFAC_AMT,
                    isnull(p.PAY_AMT, 0) AS PAY_AMT,
                    m2.PO_QTY AS SM2_PO_QTY,
                    m2.PO_AMT AS SM2_PO_AMT
                FROM (
                    SELECT
                        fp.PU_CD,
                        SUM(C0.PO_QTY) AS PO_QTY,
                        SUM(C0.IN_QTY) AS IN_QTY,
                        SUM(C0.OUT_QTY) AS OUT_QTY,
                        SUM(C0.PO_QTY * C2.matl_price) AS PO_AMT,
                        SUM((C0.USE_QTY - C0.PO_QTY) * C2.matl_price) AS STOCK_AMT,
                        SUM(C0.IN_QTY * C2.matl_price) AS IN_AMT,
                        SUM(C0.OUT_QTY * C2.matl_price) AS OUT_AMT,
                        SUM(C0.INFAC_QTY * C2.matl_price) AS INFAC_AMT
                    FROM filtered_pu fp
                        JOIN KSV_STOCK_MEM C0 ON C0.PU_CD = fp.PU_CD AND C0.PO_SEQ <> 97
                        JOIN kcd_matl_mst C1 ON C0.MATL_CD = C1.MATL_CD AND C1.vendor_cd = fp.VENDOR_CD
                        LEFT JOIN latest_matl lm ON lm.matl_cd = C1.MATL_CD
                        LEFT JOIN kcd_matl_mem C2 ON C2.MATL_CD = C1.MATL_CD AND C2.matl_seq = lm.max_seq
                    GROUP BY fp.PU_CD
                ) m
                LEFT JOIN (
                    SELECT
                        fp.PU_CD,
                        SUM(C0.PO_QTY) AS PO_QTY
                    FROM filtered_pu fp
                        JOIN KSV_PO_MRP C0 ON C0.PU_CD = fp.PU_CD AND C0.use_po_type = '1' AND c0.diff_po_type = '1' 
                    GROUP BY fp.PU_CD
                ) m0 on m.PU_CD = m0.PU_CD
                LEFT JOIN (
                    SELECT
                        fp.PU_CD,
                        SUM(C0.IN_QTY * C2.matl_price) AS PAY_AMT
                    FROM filtered_pu fp
                        JOIN KSV_STOCK_IN C0 ON C0.PU_CD = fp.PU_CD
                            AND (C0.END_FLAG = '1' OR C0.END_DATE <> '')
                        JOIN ksv_bill_mst f ON f.bill_cd = C0.bill_no
                        JOIN kcd_matl_mst C1 ON C0.MATL_CD = C1.MATL_CD AND C1.vendor_cd = fp.VENDOR_CD
                        LEFT JOIN latest_matl lm ON lm.matl_cd = C1.MATL_CD
                        LEFT JOIN kcd_matl_mem C2 ON C2.MATL_CD = C1.MATL_CD AND C2.matl_seq = lm.max_seq
                    GROUP BY fp.PU_CD
                ) p ON m.PU_CD = p.PU_CD
                LEFT JOIN (
                    SELECT
                        fp.PU_CD,
                        SUM(C0.PO_QTY2) AS PO_QTY,
                        SUM(C0.PO_QTY2 * C2.matl_price) AS PO_AMT
                    FROM filtered_pu fp
                        JOIN KSV_STOCK_MEM2 C0 ON C0.PU_CD = fp.PU_CD
                        JOIN kcd_matl_mst C1 ON C0.MATL_CD = C1.MATL_CD AND C1.vendor_cd = fp.VENDOR_CD
                        LEFT JOIN latest_matl lm ON lm.matl_cd = C1.MATL_CD
                        LEFT JOIN kcd_matl_mem C2 ON C2.MATL_CD = C1.MATL_CD AND C2.matl_seq = lm.max_seq
                    GROUP BY fp.PU_CD
                ) m2 ON m.PU_CD = m2.PU_CD
            `;
            var tRetAllMerged = await prisma.$queryRaw(Prisma.raw(sqlAllMerged));
            
            var tStockDataMap = new Map();
            tRetAllMerged.forEach((row) => {
                var tObj = { ...row };
                tStockDataMap.set(tObj.PU_CD, tObj);
            });

            var tMessage = '';
            /*
            if (tRet.length > 100) {
                tMessage = `${tRet.length}개가 검색되었습니다.`;
            }
            */

            var tRetArray = [];
            for (let tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tObj = { ...tRet[tIdx] };

                var tSavePuStatus = tObj.PU_STATUS;

                var poList = splitSlash(tObj.PO_CD);
                var vendorKey = norm(tObj.VENDOR_CD);

                tObj.MOQ_NOT_CONFIRM = '';
                tObj.SURCHARGE_NOT_CONFIRM = '';

                tObj.DEPOSIT_AMT = toFloat4(tObj.DEPOSIT_AMT);
                tObj.LC_AMT = toFloat4(tObj.LC_AMT);


                tObj.PU_AMT = '0';
                tObj.SUM_PO_QTY = '0';
                tObj.SUM_IN_QTY = '0';
                tObj.SUM_OUT_QTY = '0';
                tObj.SUM_STS_OUT = '0';
                tObj.SUM_FACIN = '0';
                tObj.SUM_STS_IN_QTY = '0';
                tObj.SUM_STS_OUT_QTY = '0';
                tObj.SUM_FACIN = '0';
                var tmpPoQty = 0;
                var tmpPoQty = 0;
                
                tObj.CURR_PU_AMT = '0';
                var tmpPoQtyCurr = 0;
                tObj.SUM_PAY = '0';
                
                var tStockData = tStockDataMap.get(tObj.PU_CD);

                if (tStockData) {

                    console.log(`==== (Step-1) ${tStockData.PU_CD}/ ${tStockData.SM_PO_QTY}/ ${tStockData.SM2_PO_QTY}`);

                    tObj.PU_AMT = parseFloat(tStockData.SM_PO_AMT).toFixed(4);
                    tmpPoQty = parseFloat(tStockData.SM_PO_QTY).toFixed(2);
                    tObj.SUM_STS_IN = parseFloat(tStockData.IN_AMT).toFixed(4);
                    tObj.SUM_STS_OUT = parseFloat(tStockData.OUT_AMT).toFixed(4);
                    tObj.SUM_FACIN = parseFloat(tStockData.INFAC_AMT).toFixed(4);
                    tObj.SUM_PO_QTY = parseFloat(tStockData.SM_PO_QTY).toFixed(2);
                    tObj.SUM_IN_QTY = parseFloat(tStockData.SM_IN_QTY).toFixed(2);
                    tObj.SUM_OUT_QTY = parseFloat(tStockData.SM_OUT_QTY).toFixed(2);
                    
                    tObj.CURR_PU_AMT = parseFloat(tStockData.SM2_PO_AMT).toFixed(4);
                    tmpPoQtyCurr = parseFloat(tStockData.SM2_PO_QTY).toFixed(2);
                    
                    tObj.SUM_PAY = parseFloat(tStockData.PAY_AMT).toFixed(4);
                }

                if (tObj.M_ETA) tObj.TARGET_ETA = tObj.M_ETA;
                tObj.BAL_STS_IN = parseFloat(tObj.PU_AMT) - parseFloat(tObj.SUM_STS_IN);
                tObj.BAL_STS_IN = parseFloat(tObj.BAL_STS_IN).toFixed(4);

                tObj.BAL_STS_OUT = parseFloat(tObj.PU_AMT) - parseFloat(tObj.SUM_STS_OUT);
                tObj.BAL_STS_OUT = parseFloat(tObj.BAL_STS_OUT).toFixed(4);

                tObj.BAL_IN_QTY = parseFloat(tObj.SUM_PO_QTY) - parseFloat(tObj.SUM_IN_QTY);
                tObj.BAL_IN_QTY = parseFloat(tObj.BAL_IN_QTY).toFixed(2);

                tObj.BAL_OUT_QTY = parseFloat(tObj.SUM_PO_QTY) - parseFloat(tObj.SUM_OUT_QTY);
                tObj.BAL_OUT_QTY = parseFloat(tObj.BAL_OUT_QTY).toFixed(2);

                tObj.BAL_FACIN = parseFloat(tObj.PU_AMT) - parseFloat(tObj.SUM_FACIN);
                tObj.BAL_FACIN = parseFloat(tObj.BAL_FACIN).toFixed(4);

                tObj.BAL_PAY = parseFloat(tObj.PU_AMT) - parseFloat(tObj.SUM_PAY);
                tObj.BAL_PAY = parseFloat(tObj.BAL_PAY).toFixed(4);
                              
                tObj.PU_STATUS = 'Registed';
                // tObj.PI_FILE = hasPiFile ? 'O' : '-';
                tObj.PI_FILE =  '-';
                tObj.DEBIT_AMT = '0';

                if (parseFloat(tObj.PU_AMT) > 0) {
                    tObj.BAL_PAY = String(
                        parseFloat(tObj.PU_AMT) - parseFloat(tObj.SUM_PAY),
                    );

                    if (parseFloat(tObj.BAL_STS_IN) <= 0) tObj.BAL_STS_IN = '0';
                    if (parseFloat(tObj.BAL_PAY) <= 0) tObj.BAL_PAY = '0';
                    if (parseFloat(tObj.BAL_STS_OUT) <= 0)
                        tObj.BAL_STS_OUT = '0';
                    if (parseFloat(tObj.BAL_FACIN) <= 0) tObj.BAL_FACIN = '0';

                    if (tObj.ORDER_DATE !== '') tObj.PU_STATUS = 'Ordered';

                    if (tObj.BAL_STS_IN === '0') tObj.BAL_STS_IN = '-';
                    else tObj.BAL_STS_IN = toFloat4(tObj.BAL_STS_IN);

                    if (tObj.BAL_STS_OUT === '0') tObj.BAL_STS_OUT = '-';
                    else tObj.BAL_STS_OUT = toFloat4(tObj.BAL_STS_OUT);

                    if (tObj.BAL_FACIN === '0') tObj.BAL_FACIN = '-';
                    else tObj.BAL_FACIN = toFloat4(tObj.BAL_FACIN);

                    if (tObj.BAL_PAY === '0') {
                        tObj.BAL_PAY = '-';
                        tObj.PU_STATUS = 'Bill Finish';
                    } else {
                        tObj.BAL_PAY = toFloat4(tObj.BAL_PAY);
                    }

                    if (
                        tObj.VENDOR_TYPE === '4' &&
                        tObj.BAL_STS_IN === '-' &&
                        tObj.BAL_STS_OUT === '-' &&
                        tObj.BAL_FACIN === '-'
                    ) {
                        tObj.BAL_PAY = '-';
                        tObj.PU_STATUS = 'Bill Finish';
                    }

                    if (tObj.VENDOR_CD === 'V2584' && tObj.BAL_STS_IN === '-') {
                        tObj.BAL_PAY = '-';
                        tObj.BAL_STS_OUT = '-';
                        tObj.BAL_FACIN = '-';
                    }
                } else {
                    if (tObj.VENDOR_TYPE === '4') {
                        if (parseFloat(tObj.BAL_IN_QTY) > 0) tObj.BAL_STS_IN = '0';
                        else  tObj.BAL_STS_IN = '-';

                        if (parseFloat(tObj.BAL_OUT_QTY) > 0) tObj.BAL_STS_OUT = '0';
                        else  tObj.BAL_STS_OUT = '-';

                        tObj.BAL_PAY = '-';
                        tObj.BAL_FACIN = '-';

                        if (tObj.BAL_STS_IN === '-' && tObj.BAL_STS_OUT === '-')  tObj.PU_STATUS = 'Bill Finish';
                        else   tObj.PU_STATUS = 'Ordered';
                    } else {
                        tObj.BAL_STS_IN = '0';
                        tObj.BAL_PAY = '0';
                        tObj.BAL_STS_OUT = '0';
                        tObj.BAL_FACIN = '0';
                        if (tObj.ORDER_DATE !== '') tObj.PU_STATUS = 'Ordered';
                    }
                }

                if (tSavePuStatus === 'END') tObj.PU_STATUS = 'End';

                var checkAmt = parseFloat(tObj.PU_AMT) - parseFloat(tObj.CURR_PU_AMT);
                var checkQty = parseFloat(tmpPoQty) - parseFloat(tmpPoQtyCurr);

                var rateAmt = 0;
                var rateQty = 0;
                if (parseFloat(tObj.PU_AMT) > 0 && parseFloat(tmpPoQty) > 0) {
                    rateAmt = checkAmt/parseFloat(tObj.PU_AMT) * 100.0;
                    rateQty = checkQty/parseFloat(tmpPoQty) * 100.0;

                    console.log(`=============== Update: ${tObj.CURR_PU_AMT} / ${tmpPoQtyCurr} :  ${tObj.PU_AMT} / ${tmpPoQty}`);

                    if (rateAmt >= -1 && rateAmt <= 1) ;
                    else {
                        if (rateQty >= -1 && rateQty <= 1) ;
                        else { 
                           if (
                              tObj.PU_STATUS !== 'End' &&
                              tObj.PU_STATUS != 'Bill Finish'
                           )
                           tObj.PU_STATUS = 'Update';
                        }
                    }
                }

                tObj.MESSAGE = tMessage;

                if (args.data.PU_STATUS === '' || tPuStatus === 'Not END') {
                    if (tObj.PU_STATUS !== 'End') tRetArray.push(tObj);
                    else continue;
                } else if (tPuStatus === tObj.PU_STATUS) {
                    tRetArray.push(tObj);
                }

            }

            return tRetArray;
        },
    }
};

export default moduleQuery_S0401_3_1;
