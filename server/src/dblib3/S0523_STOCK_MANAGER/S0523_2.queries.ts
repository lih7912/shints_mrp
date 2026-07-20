import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

const escapeSqlValue = (value) => String(value ?? '').replace(/'/g, "''");

function generateLikeQuery(ownerShip) {
    if (!ownerShip) return "E.OWNER_SHIP like '%%'"; // 빈 값 처리

    // 쉼표(,)를 기준으로 문자열을 분리하여 배열로 변환
    const values = ownerShip
        .split(',')
        .map((value) => escapeSqlValue(value).trim());

    // LIKE 조건을 동적으로 생성하여 OR로 연결
    return values.map((value) => `E.OWNER_SHIP LIKE '%${value}%'`).join(' OR ');
}

// export default로 Query 내용 내보내기
const moduleQuery_S0523_2 = {
    Query: {
        mgrQueryS0523_2: async (_, args) => {
            let tSQL = '';
            const safeColor = escapeSqlValue(args.data.COLOR);
            const safeBuyerTeam = escapeSqlValue(args.data.BUYER_TEAM);
            const safeSpec = escapeSqlValue(args.data.SPEC);
            const safeKind2 = escapeSqlValue(args.data.KIND2);
            const safeMatlCd = escapeSqlValue(args.data.MATL_CD);
            const safeAuthority = escapeSqlValue(args.data.AUTHORITY);
            const safePurpose = escapeSqlValue(args.data.PURPOSE);
            const safeStockIdx = escapeSqlValue(args.data.STOCK_IDX);
            const safeRootIdx = escapeSqlValue(args.data.ROOT_IDX);
            const safeCondition = escapeSqlValue(args.data.CONDITION);
            const safeLocation = escapeSqlValue(args.data.LOCATION);
            const safePoCd = escapeSqlValue(args.data.PO_CD);
            const safeRack = escapeSqlValue(args.data.RACK);
            const safeFactoryCd = escapeSqlValue(args.data.FACTORY_CD);
            const safeBuyerCd = escapeSqlValue(args.data.BUYER_CD);
            const safeStockStatusS = escapeSqlValue(args.data.STOCK_STATUS_S);
            const safeStatusCd2 = escapeSqlValue(args.data.STATUS_CD2);
            const safeVendorCd = escapeSqlValue(args.data.VENDOR_CD);
            const hasBuyerTeam = !!args.data.BUYER_TEAM;
            const sRegDate = args.data.S_REG_DATE;
            let eRegDate = args.data.E_REG_DATE;

            var sqlStatusS0 = '';
            if (!args.data.STOCK_STATUS_S) {
                // sqlStatusS0 = `    AND e.stock_status IN ('3','5','M','Y','F','R','P','C','G','U','I','H','A','N','W','J','K','Q','V','T','O')  `;
                sqlStatusS0 = `    AND e.stock_status IN ('*', '3','5','A','B','C','D','E','F','FA','FG','FH','FI','FU','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z') `;
            } else {
                ;
            }

            var sqlStatusS = '';
            if (args.data.CONDITION && !args.data.STOCK_STATUS_S) {
                if (args.data.CONDITION === '35MYFRPCGUIHANWJKQVTO')
                    sqlStatusS = ` and e.stock_status in ('3','5','M','Y','F','R','P','C','G','U','I','H','A','N','W','J','K','Q','V','T','O')  `;
                else if (args.data.CONDITION === '3FPGUIHAJKQV')
                    sqlStatusS = ` and e.stock_status in ('3','F','P','G','U','I','H','A','J','K','Q','V')  `;
                else if (args.data.CONDITION === 'GUIHA')
                    sqlStatusS = ` and e.stock_status in ('G','U','I','H','A')  `;
                else if (args.data.CONDITION === '35MNYWRPC')
                    sqlStatusS = ` and e.stock_status in ('3','5','M','N','Y','W','R','P','C')  `;
                else if (args.data.CONDITION === '35MRY')
                    sqlStatusS = ` and e.stock_status in ('3','5','M','R','Y')  `;
                else if (args.data.CONDITION === '35MRYC')
                    sqlStatusS = ` and e.stock_status in ('3','5','M','R','Y','C')  `;
                else if (args.data.CONDITION === '35MRYWN')
                    sqlStatusS = ` and e.stock_status in ('3','5','M','R','Y','W','N')  `;
                else if (args.data.CONDITION === 'MR')
                    sqlStatusS = ` and e.stock_status in ('M','R')  `;
                else if (args.data.CONDITION === 'JKQV')
                    sqlStatusS = ` and e.stock_status in ('J','K','Q','V')  `;
                else if (args.data.CONDITION === 'DEFECT')   
                    sqlStatusS = ` and e.stock_status in ('B','D', 'E', 'L')  `;
                else if (args.data.CONDITION === 'JUST_ORDERED')   
                    sqlStatusS = ` and e.stock_status in ('O')  `;
                else if (args.data.CONDITION === 'NORMAL')   
                    sqlStatusS = ` and e.stock_status in ('3','5', 'F', 'Y', 'F', 'R', 'M') `;
                else if (args.data.CONDITION === 'NOT_FIXED')   
                    sqlStatusS = ` and e.stock_status in ('N','W', 'Z') `;
                else if (args.data.CONDITION === 'SAMPLE_ONLY')   
                    sqlStatusS = ` and e.stock_status in ('S','X') `;
            } else  {
                if (args.data.STOCK_STATUS_S) {
                    if (args.data.STOCK_STATUS_S === 'ALL') 
                        sqlStatusS = '';
                    else 
                        sqlStatusS = ` and e.stock_status = '${args.data.STOCK_STATUS_S}' `;
                }
            }

            var sqlRegDate = '';
            if (args.data.IS_REG_DATE === '1' && sRegDate !== '') {
                if (!sRegDate) sRegDate = '20100100';
                if (!eRegDate) eRegDate = '99999999';
                sqlRegDate = `AND E.REG_DATETIME BETWEEN '${sRegDate}000000' AND '${eRegDate}235959' `;
            }
            // if (!args.data.S_REG_DATE && !args.data.E_REG_DATE)  sqlRegDate = '';

            let tSQL1 = '';
            const sStockDate = args.data.S_STOCK_DATE;
            let eStockDate = args.data.E_STOCK_DATE;

            var sqlStockDate = '';
            if (args.data.IS_STOCK_DATE === '1' && sStockDate !== '') {
                if (!sStockDate) sStockDate = '20100100';
                if (!eStockDate) eStockDate = '99999999';
                sqlStockDate += `AND E.STOCK_DATE BETWEEN '${sStockDate}' AND '${eStockDate}' `;
            }
            // if (!args.data.S_STOCK_DATE && !args.data.E_STOCK_DATE)  sqlStockDate = '';

            // code: 'stock_stock_s'의 cd_flag = 'O'인것은 error 표시  D, E, X등
            var tSQL2 = '';
            var sqlErrorGubun = ``;
            if (args.data.REMAIN_QTY === 'error') {
                sqlErrorGubun = ` AND E6.CD_FLAG = 'O'  `;
                sqlStatusS0 = `   AND e.stock_status IN ('D','E','X')  `;
            } else if (args.data.REMAIN_QTY === 'not 0') {
                tSQL2 = `AND E.REMAIN_QTY >= 1`;
            } else if (args.data.REMAIN_QTY === '0') {
                tSQL2 = `AND E.REMAIN_QTY = 0`;
            }
            
            /*
            var sqlErrorGubun = ` AND E6.CD_FLAG <> 'O' `;
            if (args.data.REMAIN_QTY === '0') tSQL2 = `AND E.REMAIN_QTY = 0`;
            else if (args.data.REMAIN_QTY === 'not 0')
                tSQL2 = `AND E.REMAIN_QTY >= 1`;
            else if (args.data.REMAIN_QTY === 'error') {
                sqlErrorGubun = ` AND E6.CD_FLAG = 'O'  `;
            }
            */

            var tSQL3 = '';
            if (args.data.DESC !== '') {
                var tSQL3 = 'AND (';
                var tCols = args.data.DESC.split(' ');
                tCols.forEach((col, i) => {
                    const safeCol = escapeSqlValue(col);
                    if (i === 0) {
                        tSQL3 += ` A.MATL_NAME LIKE '%${safeCol}%' ESCAPE '['  `;
                    } else {
                        tSQL3 += ` AND  A.MATL_NAME LIKE '%${safeCol}%' ESCAPE '['  `;
                    }
                });
                tSQL3 += ' )';
            }

            // stock_status : W, N 제외.  Waiting중인 Stock . Stock Record에서 조회

            let sqlStr = `
			 SELECT
                isnull(a1.CD_NAME, '') as MATL_TYPE_N,
                isnull(a2.MATL_TYPE2, '') as MATL_TYPE2_N,
                isnull(e4.FACTORY_NAME, '') as FACTORY_NAME,
                isnull(E.STOCK_DATE, '') as STOCK_DATE,
                E.REG_DATETIME,
                isnull(E.UPD_DATETIME, '') as UPD_DATETIME,
                E.PO_CD, 
                E.ORDER_CD,
                isnull(e5.BUYER_NAME, '') as BUYER_NAME,
                C.VENDOR_NAME,
                A.MATL_CD,
                A.MATL_NAME,
                A.COLOR,
                A.SPEC,
                A.UNIT,
                E.STOCK_STATUS,
                isnull(e6.CD_NAME , '') as STOCK_STATUS_N,
                isnull(E.STOCK_STATUS_2 , '') as STOCK_STATUS_2,
                isnull(e7.CD_NAME , '') as STOCK_STATUS_2_N,
                f.OUT_QTY as ORG_QTY,
                E.STOCK_QTY,
                E.REMAIN_QTY,
                E.USE_QTY,
                E.OUT_QTY, 
                E.RACK,
                E.LOCATION,
                E.ORG_STOCK_IDX,
                E.STOCK_IDX,
                E.ROOT_IDX,
                E.REMARK,
                isnull(E.EXP_DATE, '') as EXP_DATE, 
                isnull(e3.cd_name, '') as REASON_REMARK_N,
                E.PLAN_REMARK,
                isnull(E.DEBIT_CD, '') as DEBIT_CD,
                E.REMARK0,
                '' as ORG_REASON,
                isnull(E.DEFECT_QTY, 0) as DEFECT_QTY, 
                isnull(E.WAITING_QTY , 0) as WAITING_QTY,
                isnull(E.OWNER_SHIP , '') as OWNER_SHIP,
                isnull(E.REASON_MAKE , '') as REASON_MAKE,
                isnull(E.AUTHORITY , '') as AUTHORITY,
                isnull(E.CONDITION , '') as CONDITION,
                isnull(E.MANAGER , '') as MANAGER,
                isnull(E.PURPOSE , '') as PURPOSE, 
                E.REG_USER as CHARGER,
                isnull(B.MATL_PRICE, '') as PO_PRICE, 
                B.CURR_CD,
                A.MATL_TYPE,
                E.FACTORY_CD,
                isnull(left(E.ORDER_CD, 2) , '') as BUYER_CD,
                A.VENDOR_CD,
                E.PO_SEQ, 
                E.REASON_REMARK,
                B.MATL_SEQ,
                isnull(E.WARE_CD, '') as WARE_CD,
                isnull(E.FACTORY_CD, '') as FACTORY_CD
                --isnull(e2.CRDB_DATE, '') as CRDB_DATE,
                --isnull(e2.CRDB_AMT, '0') as CRDB_AMT
			 FROM KCD_MATL_MST A
                left join kcd_code a1 on a1.cd_code = A.MATL_TYPE and a1.cd_group = 'MATL_TYPE'
                left join kcd_matl_type2 a2 on a2.seq = A.MATL_TYPE2 ,
                KCD_MATL_MEM B,KCD_VENDOR C,
                KSV_STOCK_MATL E 
                inner join ksv_stock_matl f on e.root_idx = f.stock_idx
                --left join ksv_crdb_mst e2 on  e2.crdb_cd = E.DEBIT_CD 
                left join kcd_code e3 on  e3.cd_code = E.REASON_REMARK and e3.cd_group = 'STOCK_REMARK' 
                left join kcd_factory e4 on  e4.factory_cd = E.FACTORY_CD 
                left join kcd_buyer e5 on  e5.buyer_cd = left(E.ORDER_CD, 2)
                left join kcd_code e6 on  e6.cd_code = E.STOCK_STATUS and e6.cd_group = 'STOCK_STATUS_S' 
                left join kcd_code e7 on  e7.cd_code = E.STOCK_STATUS_2 and e7.cd_group = 'STOCK_STATUS_2' 
                ${hasBuyerTeam ? `left join kcd_code e8 on e5.buyer_team = e8.cd_code and e8.cd_group='buyer_team'` : ''}
            WHERE A.COLOR LIKE '%${safeColor}%'
                ${tSQL3}
                ${hasBuyerTeam ? ` AND e8.cd_name = '${safeBuyerTeam}'` : ''}
                AND A.SPEC LIKE '%${safeSpec}%'
                AND A2.SEQ like '%${safeKind2}%'
                ${sqlErrorGubun}
                AND A.MATL_CD LIKE '%${safeMatlCd}%'
                AND E.AUTHORITY like '%${safeAuthority}%'
                AND E.PURPOSE like '%${safePurpose}%'
                AND E.STOCK_IDX like '%${safeStockIdx}%'
                AND E.ROOT_IDX like '%${safeRootIdx}%'
                AND (${generateLikeQuery(args.data.OWNER_SHIP)})
                -- AND E.CONDITION like '%${safeCondition}%' 
                ${sqlStatusS}
                AND E.LOCATION like '%${safeLocation}%'
                AND E.PO_CD like '%${safePoCd}%'
                AND E.RACK like '%${safeRack}%'
                AND E.FACTORY_CD like '%${safeFactoryCd}%'
                ${hasBuyerTeam ? '' : `AND left(E.ORDER_CD, 2) like '${safeBuyerCd}%'`}
                AND E.STOCK_STATUS like '%${safeStockStatusS}%'
                ${sqlStatusS0}
                AND E.STOCK_STATUS_2 like '%${safeStatusCd2}%'
                AND (E.STOCK_STATUS_2 is null or E.STOCK_STATUS_2 = '' or E.STOCK_STATUS_2 IN ('Y', 'S1', 'S2'))
                AND E.MATL_CD=A.MATL_CD 
                AND B.MATL_CD = A.MATL_CD 
                AND B.MATL_SEQ = E.MATL_SEQ  
                AND C.VENDOR_CD = A.VENDOR_CD 
                AND C.VENDOR_NAME LIKE '%${safeVendorCd}%'
                -- AND E.PO_CD <> '0000-0000'
                ${tSQL}
                ${tSQL1}
                ${tSQL2}
                ${sqlStockDate}
                ${sqlRegDate}
                ORDER BY E.REG_DATETIME desc 
         `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            var tWObj = {};

            var tRetArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tOne = { ...tRet[tIdx] };
                tOne.STOCK_STATUS_N = `${tOne.STOCK_STATUS} ${tOne.STOCK_STATUS_N}`;
                if (tOne.UPD_DATETIME) tOne.REG_DATETIME = tOne.UPD_DATETIME;
               
                tRetArray.push(tOne);
            }
            tWObj.DATAS = [...tRetArray];

            return tWObj;
        },
        mgrQueryS0523_2_COUNT: async (_, args) => {
            let tSQL = '';
            const safeColor = escapeSqlValue(args.data.COLOR);
            const safeBuyerTeam = escapeSqlValue(args.data.BUYER_TEAM);
            const safeSpec = escapeSqlValue(args.data.SPEC);
            const safeKind2 = escapeSqlValue(args.data.KIND2);
            const safeMatlCd = escapeSqlValue(args.data.MATL_CD);
            const safeAuthority = escapeSqlValue(args.data.AUTHORITY);
            const safePurpose = escapeSqlValue(args.data.PURPOSE);
            const safeStockIdx = escapeSqlValue(args.data.STOCK_IDX);
            const safeRootIdx = escapeSqlValue(args.data.ROOT_IDX);
            const safeLocation = escapeSqlValue(args.data.LOCATION);
            const safePoCd = escapeSqlValue(args.data.PO_CD);
            const safeRack = escapeSqlValue(args.data.RACK);
            const safeFactoryCd = escapeSqlValue(args.data.FACTORY_CD);
            const safeBuyerCd = escapeSqlValue(args.data.BUYER_CD);
            const safeStockStatusS = escapeSqlValue(args.data.STOCK_STATUS_S);
            const safeStatusCd2 = escapeSqlValue(args.data.STATUS_CD2);
            const safeVendorCd = escapeSqlValue(args.data.VENDOR_CD);
            const hasBuyerTeam = !!args.data.BUYER_TEAM;
            const sRegDate = args.data.S_REG_DATE;
            let eRegDate = args.data.E_REG_DATE;

            var sqlStatusS0 = `    AND e.stock_status IN ('3','5','M','Y','F','R','P','C','G','U','I','H','A','N','W','J','K','Q','V','T','O')  `;

            var sqlStatusS = '';
            if (args.data.CONDITION) {
                sqlStatusS0 = '';
                if (args.data.CONDITION === '35MYFRPCGUIHANWJKQVTO')
                    sqlStatusS = ` and e.stock_status in ('3','5','M','Y','F','R','P','C','G','U','I','H','A','N','W','J','K','Q','V','T','O')  `;
                else if (args.data.CONDITION === '3FPGUIHAJKQV')
                    sqlStatusS = ` and e.stock_status in ('3','F','P','G','U','I','H','A','J','K','Q','V')  `;
                else if (args.data.CONDITION === 'GUIHA')
                    sqlStatusS = ` and e.stock_status in ('G','U','I','H','A')  `;
                else if (args.data.CONDITION === '35MNYWRPC')
                    sqlStatusS = ` and e.stock_status in ('3','5','M','N','Y','W','R','P','C')  `;
                else if (args.data.CONDITION === '35MRY')
                    sqlStatusS = ` and e.stock_status in ('3','5','M','R','Y')  `;
                else if (args.data.CONDITION === '35MRYC')
                    sqlStatusS = ` and e.stock_status in ('3','5','M','R','Y','C')  `;
                else if (args.data.CONDITION === '35MRYWN')
                    sqlStatusS = ` and e.stock_status in ('3','5','M','R','Y','W','N')  `;
                else if (args.data.CONDITION === 'MR')
                    sqlStatusS = ` and e.stock_status in ('M','R')  `;
                else if (args.data.CONDITION === 'JKQV')
                    sqlStatusS = ` and e.stock_status in ('J','K','Q','V')  `;
                else if (args.data.CONDITION === 'DEFECT')
                    sqlStatusS = ` and e.stock_status in ('B','D', 'E', 'L')  `;
                else if (args.data.CONDITION === 'JUST_ORDERED')
                    sqlStatusS = ` and e.stock_status in ('O')  `;
                else if (args.data.CONDITION === 'NORMAL')
                    sqlStatusS = ` and e.stock_status in ('3','5', 'F', 'Y', 'F', 'R', 'M') `;
                else if (args.data.CONDITION === 'NOT_FIXED')
                    sqlStatusS = ` and e.stock_status in ('N','W', 'Z') `;
                else if (args.data.CONDITION === 'SAMPLE_ONLY')
                    sqlStatusS = ` and e.stock_status in ('S','X') `;
                else {
                    sqlStatusS = ` and e.stock_status in (${args.data.CONDITION.split(',').map((status) => `'${escapeSqlValue(status.trim())}'`).join(', ')})  `;
                }
            }

            var sqlRegDate = '';
            if (args.data.IS_REG_DATE === '1' && sRegDate !== '') {
                if (!sRegDate) sRegDate = '20100100';
                if (!eRegDate) eRegDate = '99999999';
                sqlRegDate = `AND E.REG_DATETIME BETWEEN '${sRegDate}000000' AND '${eRegDate}235959' `;
            }

            let tSQL1 = '';
            const sStockDate = args.data.S_STOCK_DATE;
            let eStockDate = args.data.E_STOCK_DATE;

            var sqlStockDate = '';
            if (args.data.IS_STOCK_DATE === '1' && sStockDate !== '') {
                if (!sStockDate) sStockDate = '20100100';
                if (!eStockDate) eStockDate = '99999999';
                sqlStockDate += `AND E.STOCK_DATE BETWEEN '${sStockDate}' AND '${eStockDate}' `;
            }

            var tSQL2 = '';
            var sqlErrorGubun = ``;
            if (args.data.REMAIN_QTY === 'error') {
                sqlErrorGubun = ` AND E6.CD_FLAG = 'O'  `;
                sqlStatusS0 = `   AND e.stock_status IN ('D','E','X')  `;
            } else if (args.data.REMAIN_QTY === 'not 0') {
                tSQL2 = `AND E.REMAIN_QTY >= 1`;
            } else if (args.data.REMAIN_QTY === '0') {
                tSQL2 = `AND E.REMAIN_QTY = 0`;
            }

            var tSQL3 = '';
            if (args.data.DESC !== '') {
                var tCols = args.data.DESC.split(' ');
                tSQL3 = 'AND (';
                tCols.forEach((col, i) => {
                    const safeCol = escapeSqlValue(col);
                    if (i === 0) {
                        tSQL3 += ` A.MATL_NAME LIKE '%${safeCol}%' ESCAPE '['  `;
                    } else {
                        tSQL3 += ` AND  A.MATL_NAME LIKE '%${safeCol}%' ESCAPE '['  `;
                    }
                });
                tSQL3 += ' )';
            }

            let sqlCountStr = `
             SELECT
                COUNT(1) as TOT_CNT
             FROM KCD_MATL_MST A
                left join kcd_code a1 on a1.cd_code = A.MATL_TYPE and a1.cd_group = 'MATL_TYPE'
                left join kcd_matl_type2 a2 on a2.seq = A.MATL_TYPE2,
                KCD_MATL_MEM B, KCD_VENDOR C,
                KSV_STOCK_MATL E
                left join ksv_stock_matl f on e.root_idx = f.stock_idx
                left join kcd_code e3 on e3.cd_code = E.REASON_REMARK and e3.cd_group = 'STOCK_REMARK'
                left join kcd_factory e4 on e4.factory_cd = E.FACTORY_CD
                left join kcd_buyer e5 on e5.buyer_cd = left(E.ORDER_CD, 2)
                left join kcd_code e6 on e6.cd_code = E.STOCK_STATUS and e6.cd_group = 'STOCK_STATUS_S'
                left join kcd_code e7 on e7.cd_code = E.STOCK_STATUS_2 and e7.cd_group = 'STOCK_STATUS_2'
                ${hasBuyerTeam ? `left join kcd_code e8 on e5.buyer_team = e8.cd_code and e8.cd_group='buyer_team'` : ''}
            WHERE A.COLOR LIKE '%${safeColor}%'
                ${tSQL3}
                ${hasBuyerTeam ? ` AND e8.cd_name = '${safeBuyerTeam}'` : ''}
                AND A.SPEC LIKE '%${safeSpec}%'
                AND A2.SEQ like '%${safeKind2}%'
                ${sqlErrorGubun}
                AND A.MATL_CD LIKE '%${safeMatlCd}%'
                AND E.AUTHORITY like '%${safeAuthority}%'
                AND E.PURPOSE like '%${safePurpose}%'
                AND E.STOCK_IDX like '%${safeStockIdx}%'
                AND E.ROOT_IDX like '%${safeRootIdx}%'
                AND (${generateLikeQuery(args.data.OWNER_SHIP)})
                ${sqlStatusS}
                AND E.LOCATION like '%${safeLocation}%'
                AND E.PO_CD like '%${safePoCd}%'
                AND E.RACK like '%${safeRack}%'
                AND E.FACTORY_CD like '%${safeFactoryCd}%'
                ${hasBuyerTeam ? '' : `AND left(E.ORDER_CD, 2) like '${safeBuyerCd}%'`}
                AND E.STOCK_STATUS like '%${safeStockStatusS}%'
                ${sqlStatusS0}
                AND E.STOCK_STATUS_2 like '%${safeStatusCd2}%'
                AND (E.STOCK_STATUS_2 is null or E.STOCK_STATUS_2 = '' or E.STOCK_STATUS_2 IN ('Y', 'S1', 'S2'))
                AND E.MATL_CD=A.MATL_CD
                AND B.MATL_CD = A.MATL_CD
                AND B.MATL_SEQ = E.MATL_SEQ
                AND C.VENDOR_CD = A.VENDOR_CD
                AND C.VENDOR_NAME LIKE '%${safeVendorCd}%'
                ${tSQL}
                ${tSQL1}
                ${tSQL2}
                ${sqlStockDate}
                ${sqlRegDate}
            `;

            var tRetCnt = await prisma.$queryRaw(Prisma.raw(sqlCountStr));
            const totalCount = parseInt(tRetCnt?.[0]?.TOT_CNT || 0, 10);

            return { TOT_CNT: Number.isNaN(totalCount) ? 0 : totalCount };
        },
    },
};

export default moduleQuery_S0523_2;
