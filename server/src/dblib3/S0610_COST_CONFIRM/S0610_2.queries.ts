import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0610_2 = {
    Query: {
        mgrQueryS0610_2: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = await AFLib.getUserInfoSync(contextValue);

            // Buyer List
            var userSql = `
                select
                    *
                from
                    kcd_user
                where
                    user_id = '${tUserInfo.USER_ID}'
            `;
            var tRetUserSql = await prisma.$queryRaw(Prisma.raw(userSql));

            var tFactory = '';
            var tTeam = '';
            var tTeam1 = '';
            if (tRetUserSql.length > 0) {
                if (tRetUserSql[0].FACTORY_CD === 'FC010') {
                    tFactory = '서울';
                    tTeam = 'SMC';
                    tTeam1 = 'SMC1';
                } else if (tRetUserSql[0].FACTORY_CD === 'FC034') {
                    tFactory = 'BVT';
                    tTeam = 'PUR';
                    tTeam1 = 'PUR1';
                } else if (tRetUserSql[0].FACTORY_CD === 'FC044') {
                    tFactory = 'ETP';
                    tTeam = 'PUR';
                    tTeam1 = 'PUR1';
                }
            }

            var tRet10 = [];
            var tSQL100 = '';
            var buyerSql = `
                select
                    *
                from
                    kcd_buyer_team_info
                where
                    factory = '${tFactory}'
                    and (
                        team = '${tTeam}'
                        or team = '${tTeam1}'
                    )
                    and user_id = '${tUserInfo.USER_ID}'
            `;
            var tRetBuyerSql = await prisma.$queryRaw(Prisma.raw(buyerSql));
            var tBuyerSql = '';
            /*
       if (tRetBuyerSql.length > 0) {
            tRetBuyerSql.forEach((col, i) => {
                if (i === 0) tBuyerSql  += ` ('${col.BUYER_CD}' `;
                else  tBuyerSql  += `, '${col.BUYER_CD}'`;
            });
            tBuyerSql += ')';
            tSQL100 = `                and   a.buyer_cd in ${tBuyerSql} `;
       } else {
            if (tUserInfo.USER_ID === 'won21kr') ; 
            else return ([]);
       }
       */

            var tSQL = '';

            var tSDate = args.data.S_DATE;
            var tEDate = args.data.E_DATE;
            if (args.data.S_DATE === '')
                tSDate = `${tRetDate.substring(0, 6)}01`;
            if (args.data.E_DATE === '')
                tEDate = `${tRetDate.substring(0, 6)}31`;

            tSQL = `and   a.cost_date between '${args.data.S_DATE}' and '${args.data.E_DATE}'  `;
            if (args.data.S_DATE === '' && args.data.E_DATE === '') tSQL = '';

            var sqlBuyerTeam = '';
            if (args.data.BUYER_TEAM) {
                sqlBuyerTeam = `
                    and a.buyer_cd in (
                        select
                            buyer_cd
                        from
                            kcd_buyer
                        where
                            buyer_team like '%${args.data.BUYER_TEAM}%'
                    )
                `;
            }

            var sqlType = '';
            var sqlOrder = '';
            if (args.data.TYPE) {
                if (args.data.TYPE === 'Local Import Cost') {
                    sqlType = `and a.type = 'LOCAL_COST' `;
                } else {
                    sqlType = `and a.type2 like '%${args.data.TYPE}%' `;
                }
                if (
                    args.data.TYPE === 'AIR' ||
                    args.data.TYPE === 'DHL' ||
                    args.data.TYPE === 'UPS' ||
                    args.data.TYPE === 'EXPRESS' ||
                    args.data.TYPE === 'EXPRESS(3rd)' ||
                    args.data.TYPE === 'EXPRESS(Pick-up)' ||
                    args.data.TYPE === 'FCL' ||
                    args.data.TYPE === 'FEDEX' ||
                    args.data.TYPE === 'LCL' ||
                    args.data.TYPE === 'SEQ' ||
                    args.data.TYPE === 'TRUCK' 
                   ) {
                    sqlOrder = ` a.BL_NO`;
                } else {
                    sqlOrder = ` a.BUYER_CD`;
                } 
            } else { 
                sqlOrder = ` a.BUYER_CD`;
            }
            

            let sqlStr = `
                select
                    a.id,
                    isnull(a.BUYER_CD, '') as BUYER_CD,
                    isnull(a.PO_CD, '') as PO_CD,
                    isnull(a.SHIP_DATE, '') as SHIP_DATE,
                    isnull(a.BL_NO, '') as BL_NO,
                    isnull(a.VENDOR_CD, '') as VENDOR_CD,
                    isnull(a.COST_DATE, '') as COST_DATE,
                    isnull(a.PU_CD, '') as PU_CD,
                    isnull(a.MATL_CD, '') as MATL_CD,
                    isnull(a.COST_VALUE, '0') as COST_VALUE,
                    isnull(a.SHIPMENT_CD, '') as SHIPMENT_CD,
                    isnull(a.INVOICE_NO, '') as INVOICE_NO,
                    isnull(a.TYPE, '') as
                TYPE,
                isnull(a.TYPE2, '') as TYPE2,
                isnull(a.COST_CURR, '') as COST_CURR,
                isnull(a.COST_AMT, '0') as COST_AMT,
                a.REG_USER,
                isnull(a.CONFIRM_USER, '') as CONFIRM_USER,
                isnull(a.CONFIRM_DATE, '') as CONFIRM_DATE,
                a.STSIN_CD,
                isnull(b.matl_name, '') as MATL_NAME,
                isnull(c.vendor_name, '') as VENDOR_NAME,
                isnull(c1.SHIP_DATE, '') as SHIP_DATE1,
                isnull(c1.BL_NO, '') as BL_NO1,
                    isnull(c3.ETD, '') as ETD,
                isnull(c2.PO_PRICE, '0') as PO_PRICE,
                isnull(c3.SHIPMENT_CD, '') as SHIPMENT_CD2 
                from
                    ksv_cost_mst a
                    left join kcd_matl_mst b on b.matl_cd = a.matl_cd
                    left join kcd_vendor c on c.vendor_cd = a.vendor_cd
                    left join ksv_invoice_mst c1 on c1.invoice_no = a.invoice_no
                    left join ksv_stock_mem2 c2 on c2.pu_cd = a.pu_cd
                                               and c2.matl_cd = a.matl_cd
                                               and c2.po_cd = a.po_cd
                    left join ksv_shipment_mst c3 on c3.shipment_cd = a.shipment_cd
                where
                    a.buyer_cd like '%${args.data.BUYER_CD}%' ${tSQL} ${tSQL100}
                    and a.po_cd like '%${args.data.PO_CD}%' ${sqlType}
                    -- and a.detail like '%${args.data.DETAIL}%'
                    and a.reg_user like '%${args.data.REG_USER}%' ${sqlBuyerTeam}
                order by ${sqlOrder}
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                id: 0,
                BUYER_CD: '',
                COST_DATE: '',
                PU_CD: '',
                SHIPMENT_CD: '',
                INVOICE_NO: '',
                TYPE: '',
                TYPE2: '',
                COST_CURR: '',
                COST_AMT: 0,
                REG_USER: '',
                CONFIRM_USER: '',
                CONFIRM_DATE: '',
                ETD: '',
                ETC99: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            console.log(`Cost Mst Lenght: ${tRet.length}`);

            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tObj = { ...tRet[tIdx] };

                if (tObj.TYPE === 'SHIPPING_COST' || 
                    tObj.TYPE === 'LOCAL_COST'  ||
                    tObj.TYPE === 'HQ_COST' 
                   ) {
                    if (!tObj.SHIPMENT_CD2) continue;
                }

                if (tObj.TYPE === 'SHIPPING_COST') {
                    tObj.DETAIL = `${tObj.BUYER_CD}-${tObj.PU_CD}-${tObj.SHIP_DATE}-${tObj.BL_NO}`;
                }
                if (tObj.TYPE === 'LOCAL_COST') {
                    tObj.DETAIL = `${tObj.BUYER_CD}-${tObj.PU_CD}-${tObj.SHIP_DATE}-${tObj.BL_NO}`;
                }
                if (tObj.TYPE === 'HQ_COST') {
                    tObj.DETAIL = `${tObj.BUYER_CD}-${tObj.PU_CD}-${tObj.SHIP_DATE}-${tObj.BL_NO}`;
                }
                if (tObj.TYPE === '수입등록') {
                    tObj.DETAIL = `${tObj.BUYER_CD}-${tObj.PU_CD}-${tObj.SHIP_DATE1}-${tObj.BL_NO1}`;
                }
                if (tObj.TYPE === 'STS_IN') {
                    tObj.DETAIL = `${tObj.BUYER_CD}-${tObj.PO_CD}-${tObj.VENDOR_NAME}-${tObj.MATL_NAME}`;
                }
                if (tObj.SHIP_DATE === '' && tObj.SHIP_DATE1 !== '') {
                    tObj.SHIP_DATE = tObj.SHIP_DATE1;
                }
                if (tObj.BL_NO === '' && tObj.BL_NO1 !== '') {
                    tObj.BL_NO = tObj.BL_NO1;
                }

                if (tObj.TYPE2 === 'MOQ') {
                    var tVal =
                        parseFloat(tObj.COST_AMT) * parseFloat(tObj.PO_PRICE);
                    tObj.COST_AMT = String(tVal.toFixed(2));
                } else {
                    var tVal = parseFloat(tObj.COST_AMT);
                    tObj.COST_AMT = tVal.toFixed(2);
                }

                if (args.data.COST_CURR) {
                    if (!tObj.COST_CURR) continue;
                    if (!tObj.COST_CURR.includes(args.data.COST_CURR)) continue;
                }

                if (args.data.S_ETD || args.data.E_ETD) {
                    const sEtd = args.data.S_ETD && args.data.S_ETD !== '' ? args.data.S_ETD : '00000000';
                    const eEtd = args.data.E_ETD && args.data.E_ETD !== '' ? args.data.E_ETD : '99999999';
                    const etd = tObj.ETD || '';
                    if (etd === '') continue;
                    if (etd < sEtd || etd > eEtd) continue;
                }

                if (args.data.DETAIL) {
                    if (tObj.DETAIL && tObj.DETAIL.includes(args.data.DETAIL))
                        tRetArray.push(tObj);
                    else;
                } else {
                    tRetArray.push(tObj);
                }
            }

            tSDate = args.data.S_DATE;
            tEDate = args.data.E_DATE;
            if (args.data.S_DATE === '')
                tSDate = `${tRetDate.substring(0, 4)}0101`;
            if (args.data.E_DATE === '') tEDate = `99999999`;

            let sqlStr1 = `
                select
                    a.id,
                    left(a.ORDER_CD, 2) as BUYER_CD,
                    a.PO_CD,
                    '' as SHIP_DATE,
                    '' as BL_NO,
                    b.VENDOR_CD,
                    left(a.REG_DATETIME, 8) as COST_DATE,
                    isnull(a.PU_CD, '') as PU_CD,
                    isnull(a.MATL_CD, '') as MATL_CD,
                    '' as ETD,
                    a.po_qty as COST_VALUE,
                    '' as SHIPMENT_CD,
                    '' as INVOICE_NO,
                    'STS-IN' as
                TYPE,
                a.PO_SEQ as TYPE2,
                '' as COST_CURR,
                a.po_qty as COST_AMT,
                a.REG_USER,
                isnull(a.MIN_CONF_USER, '') as CONFIRM_USER,
                isnull(a.MIN_CONF_DATETIME, '') as CONFIRM_DATE,
                '' as STSIN_CD,
                b.matl_name as MATL_NAME,
                c.vendor_name as VENDOR_NAME,
                '' as SHIP_DATE1,
                '' as BL_NO1,
                '' as PO_PRICE
                from
                    ksv_stock_mem a,
                    kcd_matl_mst b,
                    kcd_vendor c
                where
                    a.matl_cd = b.matl_cd
                    and b.vendor_cd = c.vendor_cd
                    and a.po_seq in (99, 98, 97)
                    and a.po_cd like '%${args.data.PO_CD}%'
                    and left(a.order_cd, 2) like '%${args.data.BUYER_CD}%'
                    and left(a.reg_datetime, 8) between '${tSDate}' and '${tEDate}'
            `;
            var tRet1 = [];

            if (args.data.TYPE === 'MOQ' && args.data.PO_CD) {
                tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));
            }

            tRet1.forEach((col, i) => {
                var tObj = { ...col };
                var tTYPE2 = '';
                if (col.TYPE2 === 99) tTYPE2 = 'MOQ';
                if (col.TYPE2 === 98) tTYPE2 = 'OVER-IN';
                if (col.TYPE2 === 97) tTYPE2 = 'FOC';
                tObj.TYPE2 = tTYPE2;
                tRetArray.push(tObj);
            });

            return tRetArray;
        },
    },
};

export default moduleQuery_S0610_2;
