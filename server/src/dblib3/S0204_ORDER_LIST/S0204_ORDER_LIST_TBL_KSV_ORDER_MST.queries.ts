// MGR_@@TNAME@@.queries.js

import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
import axios from 'axios';

const moment = require('moment');
const fs = require('fs');
const Excel = require('exceljs');
const { upload } = require('../../../routes/s3');

//
class S0204_COMM {
    async queryS0204_ORDER_LIST(argData, contextValue) {
        var tRetDate = AFLib.getCurrTime();
        var tRetDate1 = tRetDate.substring(0, 8);
        var tUserInfo = AFLib.getUserInfo(contextValue);

        var tShipCnt = 0;
        var sShipDate = '';
        var eShipDate = '';
        if (argData.IS_SHIP_DATE === '1') {
            var tDate99_1 = argData.S_SHIP_DATE;
            var tDate99_2 = argData.E_SHIP_DATE;
            if (argData.S_SHIP_DATE === '')
                tDate99_1 = `${tRetDate.substring(0, 6)}01`;
            if (argData.E_SHIP_DATE === '') tDate99_2 = '99999999';
            sShipDate = tDate99_1;
            eShipDate = tDate99_2;
        } else {
            sShipDate = `${tRetDate.substring(0, 6)}01}`;
            eShipDate = '99999999';
        }

        if (argData.IS_SHIP === '1' || argData.IS_SHIP_DATE === '1') {
            var tmpSql = '';
            if (argData.IS_SHIP === '1') {
                tmpSql = `having sum(ship_cnt) > 0 `;
            }

            var tShipCheckSql = `
                select
                    order_cd,
                    isnull(sum(ship_cnt), 0) as s_ship_cnt
                from
                    ksv_order_ship
                where
                    ship_date between '${sShipDate}' and '${eShipDate}'
                    and ship_ptype in ('0', '5')
                group by
                    order_cd ${tmpSql}
            `;
            var retShipCheckSql = await prisma.$queryRaw(
                Prisma.raw(tShipCheckSql),
            );
            tShipCnt = retShipCheckSql.length;
            if (retShipCheckSql.length <= 0) {
                var tWObj = {};
                tWObj.message = '';
                tWObj.datas = [];
                var tIdx = 0;
                return tWObj;
            }
            console.log('Ship Data:' + retShipCheckSql.length);
        }

        var tFlag = 0;
        var tKeys = Object.keys(argData);
        tKeys.forEach((col, i) => {
            if (
                argData[`${col}`] === '' ||
                argData[`${col}`] === ' ' ||
                argData[`${col}`] === '-'
            ) {
            } else {
                tFlag = 1;
            }
        });

        // if (tFlag === 0 || (argData.IS_DUEDATE !== '1' && argData.IS_SHIP_DATE !== '1')) {
        var sqlORDER_DATE = '';
        if (tFlag === 0) {
            var tSDate = `${tRetDate.substring(0, 6)}01`;
            var tEDate = '99999999';
            sqlORDER_DATE = `AND a1.ORDER_DATE between '${tSDate}' and '${tEDate}' `;
        }

        var sqlDUE_DATE = '';
        if (argData.IS_DUEDATE === '1') {
            var tDate1 = argData.S_DUE_DATE;
            var tDate2 = argData.E_DUE_DATE;
            if (argData.S_DUE_DATE === '')
                tDate1 = `${tRetDate.substring(0, 6)}01`;
            if (argData.E_DUE_DATE === '') tDate2 = '99999999';
            sqlDUE_DATE = `AND a1.DUE_DATE between '${tDate1}' and '${tDate2}' `;
        }

        var sqlPO = '';
        if (argData.PO_CD !== '') {
            sqlPO = `inner join ksv_po_mem b9 on a1.order_cd = b9.order_cd and b9.po_seq = 1 AND b9.PO_CD like '%${argData.PO_CD.split(' ').join('%')}%' `;
        } else {
            sqlPO = `left join ksv_po_mem b9 on a1.order_cd = b9.order_cd and b9.po_seq = 1  `;
        }
        /* 
        if (argData.PO_CD !== '') {
            sqlPO = `
                and a1.ORDER_CD in (
                    select distinct
                        order_cd
                    from
                        ksv_po_mem
                    where
                        po_cd like '%${argData.PO_CD}%'
                )
            `;
        }
        */

        var sqlPO1 = '';
        if (argData.PO_CD !== '') {
            sqlPO1 = `inner join ksv_po_mem b on a.order_cd = b.order_cd and b.po_seq = 1 AND b.PO_CD like '%${argData.PO_CD.split(' ').join('%')}%' `;
        } else {
            sqlPO1 += `left join ksv_po_mem b on a.order_cd = b.order_cd and b.po_seq = 1  `;
        }

        // Dynamic LIKE conditions
        var sqlORDER_CD = '';
        if (argData.ORDER_CD !== '' && argData.ORDER_CD !== undefined && argData.ORDER_CD !== null) {
            sqlORDER_CD = `AND a1.ORDER_CD like '%${argData.ORDER_CD.split(' ').join('%')}%' `;
        }

        var sqlFACTORY_CD = '';
        if (argData.FACTORY_CD !== '' && argData.FACTORY_CD !== undefined && argData.FACTORY_CD !== null) {
            sqlFACTORY_CD = `AND a1.FACTORY_CD like '%${argData.FACTORY_CD}%' `;
        }

        var sqlBUYER_CD = '';
        if (argData.BUYER_CD !== '' && argData.BUYER_CD !== undefined && argData.BUYER_CD !== null) {
            sqlBUYER_CD = `AND LEFT(a1.ORDER_CD, 2) like '%${argData.BUYER_CD}%' `;
        }

        var sqlREG_USER = '';
        if (argData.REG_USER !== '' && argData.REG_USER !== undefined && argData.REG_USER !== null) {
            sqlREG_USER = `AND a1.REG_USER like '%${argData.REG_USER}%' `;
        }

        var sqlSTYLE_CD = '';
        if (argData.STYLE_CD !== '' && argData.STYLE_CD !== undefined && argData.STYLE_CD !== null) {
            sqlSTYLE_CD = `AND (d.style_cd like '%${argData.STYLE_CD.split(' ').join('%')}%' or d.style_name like '%${argData.STYLE_CD.split(' ').join('%')}%') `;
        }

        var sqlBUYER_TEAM = '';
        if (argData.BUYER_TEAM !== '' && argData.BUYER_TEAM !== undefined && argData.BUYER_TEAM !== null) {
            sqlBUYER_TEAM = `AND LEFT(a1.ORDER_CD, 2) in (select buyer_cd from kcd_buyer where buyer_team like '%${argData.BUYER_TEAM}%') `;
        }

        var sqlREF_ORDER_NO = '';
        if (argData.REF_ORDER_NO !== '') {
            sqlREF_ORDER_NO = `and  a1.order_type in ('0','1') `;
            sqlREF_ORDER_NO += `
                AND a1.order_cd in (
                    select distinct
                        left(order_cd, 10)
                    from
                        ksv_order_mst
                    where
                        ref_order_no like '%${argData.REF_ORDER_NO}%'
                        and order_type in ('0', '1', '2')
                )
            `;
        } else {
            sqlREF_ORDER_NO = `and  a1.order_type in ('0','1') `;
        }

        var sqlSTATUS_CD = '';
        if (argData.STATUS_CD === 'E1') {
            // Not End List
            sqlSTATUS_CD = `AND a1.ORDER_STATUS  not in ('4','9') `;
        } else if (argData.STATUS_CD === 'E2') {
            // Need End Report
            sqlSTATUS_CD = `AND a1.ORDER_STATUS  in ('1','2', '3', '5', '7') `;
        } else if (argData.STATUS_CD === '777') {
            sqlSTATUS_CD = `AND a1.ORDER_STATUS  in ('1','2', '3', '5') `;
        } else if (argData.STATUS_CD !== '') {
            sqlSTATUS_CD = `AND a1.ORDER_STATUS = '${argData.STATUS_CD}' `;
        }

        var sqlSAMPLE_FLAG = '';
        if (argData.IS_SAMPLE === '1' && argData.IS_MAIN !== '1') {
            sqlSAMPLE_FLAG = `AND a1.SAMPLE_FLAG = '1' `;
        }
        if (argData.IS_SAMPLE !== '1' && argData.IS_MAIN === '1') {
            sqlSAMPLE_FLAG = `AND a1.SAMPLE_FLAG <> '1' `;
        }

        var tShipSQL1 = '';
        if (argData.IS_SHIP_DATE === '1' || argData.IS_SHIP === '1') {
            var tmpShipDateSql = '';
            var tmpShipHavingSql = 'having isnull(sum(f2.ship_cnt), 0) > 0';

            if (argData.IS_SHIP_DATE === '1') {
                tmpShipDateSql = `
                                and a1.order_cd in (
                                    select distinct
                                        order_cd
                                    from
                                        ksv_order_ship
                                    where
                                        ship_date between '${sShipDate}' and '${eShipDate}'
                                        and ship_ptype in ('0', '5')
                                )
                `;
            }
            if (argData.IS_SHIP !== '1') tmpShipHavingSql = '';

            tShipSQL1 = `
                inner join (
                    select
                        top 1000 f1.order_cd,
                        isnull(sum(f2.ship_cnt), 0) as sum_ship_cnt
                    from
                        (
                            select
                                a1.order_cd
                            from
                                ksv_order_mst a1 ${sqlPO}
                                left join kcd_code a2 on a2.cd_code = a1.buyer_team
                                and a2.cd_group = 'buyer_team',
                                kcd_style d
                            where
                                a1.style_cd = d.style_cd
                                ${sqlORDER_CD}
                                ${sqlFACTORY_CD}
                                ${sqlBUYER_CD}
                                ${sqlBUYER_TEAM}
                                ${sqlREG_USER}
                                ${sqlSTYLE_CD}
                                -- and a1.REG_USER in (select distinct user_id from kcd_user where company_code = '${tUserInfo.COMPANY_CODE}')
                                ${sqlSAMPLE_FLAG} ${sqlREF_ORDER_NO} ${sqlDUE_DATE} ${sqlSTATUS_CD} ${sqlORDER_DATE}
                                ${tmpShipDateSql}
                        ) f1,
                        ksv_order_ship f2
                    where
                        f1.order_cd = f2.order_cd
                        and f2.ship_ptype in ('0', '5')
                    group by
                        f1.order_cd ${tmpShipHavingSql}
                ) f on a.order_cd = f.order_cd
            `;
        } else {
            var tmpSql = '';
            var tmpSql1 = '';

            tShipSQL1 = `
                left join (
                    select
                        f1.order_cd,
                        isnull(sum(f2.ship_cnt), 0) as sum_ship_cnt
                    from
                        (
                            select
                                top 1000 a1.order_cd
                            from
                                ksv_order_mst a1 ${sqlPO}
                                left join kcd_code a2 on a2.cd_code = a1.buyer_team
                                and a2.cd_group = 'buyer_team',
                                kcd_style d
                            where
                                a1.style_cd = d.style_cd
                                ${sqlORDER_CD}
                                ${sqlFACTORY_CD}
                                ${sqlBUYER_CD}
                                ${sqlBUYER_TEAM}
                                ${sqlREG_USER}
                                ${sqlSTYLE_CD}
                                -- and a1.REG_USER in (select distinct user_id from kcd_user where company_code = '${tUserInfo.COMPANY_CODE}')
                                ${sqlSAMPLE_FLAG} ${sqlREF_ORDER_NO} ${sqlDUE_DATE} ${sqlSTATUS_CD} ${sqlORDER_DATE}
                        ) f1,
                        ksv_order_ship f2
                    where
                        f1.order_cd = f2.order_cd ${tmpSql}
                        and f2.ship_ptype in ('0', '5')
                    group by
                        f1.order_cd ${tmpSql1}
                ) f on a.order_cd = f.order_cd
            `;
        }

        let sqlStr = `
            select
                top 1000 isnull(b.PO_CD, '') as PO_CD,
                a.ORDER_CD,
                LEFT(a.ORDER_CD, 2) as BUYER_CD,
                h1.BUYER_NAME,
                a.REF_ORDER_NO,
                a.STYLE_NAME,
                a.STYLE_CD,
                a.ORDER_DATE,
                a.DUE_DATE,
                a.MATL_DUE_DATE,
                isnull(a.ETD, '') as ETD,
                a.TOT_CNT as ORDER_QTY,
                a.TOT_CNT,
                a.ADD_CNT,
                isnull(f.sum_ship_cnt, 0) as SHIP_CNT,
                a.AVR_PRICE,
                a.CURR_CD,
                a.USD_PRICE,
                isnull(a.FC_PRICE, 0) as FC_PRICE,
                (
                    case
                        when isnull(f.sum_ship_cnt, 0) = 0 then 0
                        else a.matl_amt / isnull(f.sum_ship_cnt, 0)
                    end
                ) as C_MATL_AMT,
                (
                    case
                        when isnull(f.sum_ship_cnt, 0) = 0 then 0
                        else isnull(a.etc_amt, 0) / isnull(f.sum_ship_cnt, 0)
                    end
                ) as C_ETC_AMT,
                (
                    isnull(a.usd_price, 0) - isnull(a.fc_price, 0) - case
                        when isnull(f.sum_ship_cnt, 0) = 0 then 0
                        else isnull(a.matl_amt, 0) / isnull(f.sum_ship_cnt, 0)
                    end - case
                        when isnull(f.sum_ship_cnt, 0) = 0 then 0
                        else isnull(a.etc_amt, 0) / isnull(f.sum_ship_cnt, 0)
                    end
                ) as MARGIN,
                (
                    case
                        when isnull(a.usd_price, 0) = 0 then 0
                        else (
                            isnull(a.usd_price, 0) - isnull(a.fc_price, 0) - case
                                when isnull(f.sum_ship_cnt, 0) = 0 then 0
                                else isnull(a.matl_amt, 0) / isnull(f.sum_ship_cnt, 0)
                            end - case
                                when isnull(f.sum_ship_cnt, 0) = 0 then 0
                                else isnull(a.etc_amt, 0) / isnull(f.sum_ship_cnt, 0)
                            end
                        ) / isnull(a.usd_price, 0)
                    end
                ) * 100 as MARGIN2,
                e.cd_name as STATUS_NAME,
                a.END_STATUS,
                isnull(a.REMARK, '') as REMARK,
                a.REG_USER,
                h.FACTORY_NAME,
                a.FACTORY_CD,
                isnull(a.REF_Q_OUTER, '') as REF_Q_OUTER,
                isnull(a.REF_Q_LINER, '') as REF_Q_LINER,
                isnull(a.ETC_AMT, 0) as ETC_AMT,
                isnull(a.MATL_AMT, 0) as MATL_AMT,
                a.ORDER_TYPE,
                a.ORDER_STATUS,
                isnull(a.ORG_DUE_DATE, '') as ORG_DUE_DATE,
                a.ORDER_FLAG,
                a.SAMPLE_FLAG,
                a.MATL_SALE_FLAG,
                a.FAC_LC_FLAG,
                a.FAC_TT_FLAG,
                isnull(a.PI_CD2, '') as PI_CD,
                isnull(a.PRICE_TERM, '') as PRICE_TERM,
                a.BUYER_TEAM_N
            from
                (
                    select
                        a1.*,
                        isnull(a3.PI_CD, '') as PI_CD2,
                        d.STYLE_NAME,
                        isnull(a2.cd_name, '') as BUYER_TEAM_N
                    from
                        ksv_order_mst a1 ${sqlPO}
                        left join kcd_code a2 on a2.cd_code = a1.buyer_team
                        and a2.cd_group = 'buyer_team'
                        left join ksv_order_pimem a3 on a3.order_cd = a1.order_cd,
                        kcd_style d
                    where
                        a1.style_cd = d.style_cd
                        ${sqlORDER_CD}
                        ${sqlFACTORY_CD}
                        ${sqlBUYER_CD}
                        ${sqlBUYER_TEAM}
                        ${sqlREG_USER}
                        ${sqlSTYLE_CD}
                        ${sqlSAMPLE_FLAG} ${sqlREF_ORDER_NO} ${sqlDUE_DATE} ${sqlSTATUS_CD} ${sqlORDER_DATE}
                ) a ${sqlPO1} ${tShipSQL1}
                left join kcd_code e on a.order_status = e.cd_code
                and e.cd_group = 'ORDER_STATUS'
                left join kzz_outsourcing_cost g on a.order_cd = g.order_cd
                left join kcd_factory h on a.factory_cd = h.factory_cd
                left join kcd_buyer h1 on left(a.order_cd, 2) = h1.buyer_cd
            order by
                b.po_cd desc,
                a.order_cd
        `;

        var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

        let tRetArray: any[] = [];
        tRet.forEach((col) => {
            if (col.REMARK === '') {
                col.REMARK = ' ';
            }
            tRetArray.push(col);
        });

        let tWObj: any = {};
        tWObj.message =
            tRet.length >= 1000 ? `1000건 이상의 데이터가 있습니다. 검색 조건을 추가해주세요.` : '';
        tWObj.datas = [...tRetArray];

        return tWObj;
    }
}

// export default로 Query 내용 내보내기
const moduleQuery_S0204_ORDER_LIST_TBL_KSV_ORDER_MST = {
    Query: {
        mgrQuery_S0204_ORDER_LIST_CODE: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = await AFLib.getUserInfoSync(contextValue);

            var tWRet: any = {};

            if (args.data.BUYER_CD !== '') {
                tSQL = '';
                let sqlStr = `
                    SELECT
                        *
                    FROM
                        KCD_STYLE
                    where
                        buyer_cd like '%${args.data.BUYER_CD}%'
                        -- and   REG_USER in (select distinct user_id from kcd_user where company_code = '${tUserInfo.COMPANY_CODE}')
                    order by
                        style_name
                        -- offset 0 rows fetch next 1000 rows only
                `;
                tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
                tWRet.STYLE = tRet;
                var tStyleCd: any = {};
                tStyleCd.STYLE_CD = '';
                tStyleCd.STYLE_NAME = ' ';
                tWRet.STYLE.unshift(tStyleCd);

                tWRet.STATUS_CD = [];
                tWRet.BUYER_TEAM = [];
                tWRet.REG_USER = [];
                tWRet.BUYER = [];
                tWRet.FACTORY = [];
                tWRet.CURR_CD = [];

                return tWRet;
            }

            if (args.data.STYLE_CD !== '') {
                tSQL = '';
                let sqlStr = `
                    SELECT
                        *
                    FROM
                        KCD_STYLE
                    where
                        (
                            style_cd like '%${args.data.STYLE_CD}%'
                            or style_name like '%${args.data.STYLE_CD}%'
                        )
                        -- and   REG_USER in (select distinct user_id from kcd_user where company_code = '${tUserInfo.COMPANY_CODE}')
                    order by
                        style_name
                        -- offset 0 rows fetch next 1000 rows only
                `;
                tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
                tWRet.STYLE = tRet;
                var tStyleCd: any = {};
                tStyleCd.STYLE_CD = '';
                tStyleCd.STYLE_NAME = ' ';
                tWRet.STYLE.unshift(tStyleCd);

                tWRet.STATUS_CD = [];
                tWRet.BUYER_TEAM = [];
                tWRet.REG_USER = [];
                tWRet.BUYER = [];
                tWRet.FACTORY = [];
                tWRet.CURR_CD = [];

                return tWRet;
            }

            tRet = [];
            tWRet.STYLE = tRet;
            var tStyleCd: any = {};
            tStyleCd.STYLE_CD = '';
            tStyleCd.STYLE_NAME = ' ';
            tWRet.STYLE.unshift(tStyleCd);

            var tSQL = '';
            let sqlStr_STATUS_CD = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'ORDER_STATUS'
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr_STATUS_CD));
            tWRet.STATUS_CD = tRet;
            var tStatusCd0 = {
                CD_CODE: 'E1',
                CD_NAME: 'Not End List',
            };
            tWRet.STATUS_CD.unshift(tStatusCd0);
            var tStatusCd1 = {
                CD_CODE: 'E2',
                CD_NAME: 'Need End Report',
            };
            tWRet.STATUS_CD.unshift(tStatusCd1);
            var tStatusCd = {
                CD_CODE: '',
                CD_NAME: ' ',
            };
            tWRet.STATUS_CD.unshift(tStatusCd);

            let sqlStr_BUYER_TEAM = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'BUYER_TEAM'
                    and cd_name in (
                        '내수영업팀',
                        '경영지원본부',
                        'NSR',
                        'Sales1',
                        'Sales2',
                        'Sales3',
                        'Sales4',
                        'Sales5',
                        '브랜드개발팀'
                    )
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr_BUYER_TEAM));
            tWRet.BUYER_TEAM = tRet;
            var tObj = {
                CD_CODE: '',
                CD_NAME: ' ',
            };

            tWRet.BUYER_TEAM.unshift(tObj);

            tSQL = '';

            let sqlStr_REG_USER = `
                SELECT
                    *
                FROM
                    KCD_USER
                    -- where company_code = '${tUserInfo.COMPANY_CODE}'
            `;
            let tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr_REG_USER));
            tRet = [];
            tRet0.forEach((col, i) => {
                var tObj = {
                    ...col,
                };
                tObj.USER_NAME = `(${col.USER_ID})${col.USER_NAME}`;
                tRet.push(tObj);
            });
            tWRet.REG_USER = tRet;
            var tRegUser = {
                USER_ID: '',
                USER_NAME: ' ',
            };
            tRegUser.USER_ID = '';
            tRegUser.USER_NAME = ' ';
            tWRet.REG_USER.unshift(tRegUser);

            tSQL = '';
            let sqlStr_BUYER = `
                SELECT
                    *
                FROM
                    KCD_BUYER
                where
                    status_cd = '0'
                    -- and buyer_cd like '%${args.data.BUYER_CD}%'
                    -- and REG_USER in (select distinct user_id from kcd_user where company_code = '${tUserInfo.COMPANY_CODE}')
                order by
                    buyer_name
                    -- offset 0 rows fetch next 1000 rows only
            `;
            tRet = await prisma.$queryRaw(Prisma.raw(sqlStr_BUYER));

            var tArray = [];
            tRet.forEach((col, i) => {
                var tObj = {
                    ...col,
                };
                tObj.BUYER_NAME = `(${col.BUYER_CD})${col.BUYER_NAME}`;
                tArray.push(tObj);
            });
            tWRet.BUYER = [...tArray];
            var tBuyerCd = {
                BUYER_CD: '',
                BUYER_NAME: ' ',
            };
            tBuyerCd.BUYER_CD = '';
            tBuyerCd.BUYER_NAME = ' ';
            tWRet.BUYER.unshift(tBuyerCd);

            tSQL = '';
            let sqlStr_FACTORY = `
                SELECT
                    *
                FROM
                    KCD_FACTORY
                where
                    status_cd = '0'
                    and factory_cd in ('FC010', 'FC034', 'FC044')
            `;
            tRet = await prisma.$queryRaw(Prisma.raw(sqlStr_FACTORY));
            tWRet.FACTORY = tRet;
            var tFactoryCd = {
                FACTORY_CD: '',
                FACTORY_NAME: ' ',
            };

            tWRet.FACTORY.unshift(tFactoryCd);

            tSQL = '';
            let sqlStr_CURR_CD = `
                SELECT
                    *
                FROM
                    KCD_CODE
                where
                    cd_group = 'CURR_CD'
            `;
            tRet = await prisma.$queryRaw(Prisma.raw(sqlStr_CURR_CD));
            tWRet.CURR_CD = tRet;
            var tCurrCd = {
                CD_CODE: '',
                CD_NAME: ' ',
            };

            tWRet.CURR_CD.unshift(tCurrCd);

            return tWRet;
        },

        mgrQuery_S0204_ORDER_LIST_TBL_KSV_ORDER_MST: async (
            _,
            args,
            contextValue,
        ) => {
            var tInObj = {
                ...args.data,
            };
            var tFunc = new S0204_COMM();
            var tRetObj = await tFunc.queryS0204_ORDER_LIST(
                tInObj,
                contextValue,
            );

            return tRetObj;
        },

        mgrQuery_S0204_ORDER_SHEET_NORMAL: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tSQL = '';

            let sqlStr = `
                SELECT
                    a.ORDER_CD -- 0
                ,
                    a.ORDER_FLAG -- 1
                ,
                    a.SAMPLE_FLAG -- 2
                ,
                    d.STYLE_NAME -- 3
                ,
                    ISNULL(e.BUYER_NAME, '') AS BYR --4 
                ,
                    c.CD_NAME as ORDER_STATUS_N --5
                ,
                    '' as tempv --6
                ,
                    b.FACTORY_NAME --7
                ,
                    a.ORDER_DATE -- 8
                ,
                    SUBSTRING(a.DUE_DATE, 1, 4) + '-' + SUBSTRING(a.DUE_DATE, 5, 2) + '-' + SUBSTRING(a.DUE_DATE, 7, 2) AS duedate --9
                ,
                    '',
                    a.TOT_CNT --11
                ,
                    0 --12
                ,
                    a.COMMISSION --13
                ,
                    a.AVR_PRICE --14
                ,
                    a.FC_PRICE --15
                ,
                    a.MATL_AMT --16
                ,
                    0 --17
                ,
                    0 --18
                ,
                    a.ETC_AMT --19
                ,
                    a.REG_USER --20
                ,
                    SUBSTRING(a.REG_DATETIME, 1, 4) + '-' + SUBSTRING(a.REG_DATETIME, 5, 2) + '-' + SUBSTRING(a.REG_DATETIME, 7, 2) AS regdate --21
                ,
                    a.REF_ORDER_NO --22
                ,
                    a.REF_Q_OUTER --23
                ,
                    a.REF_Q_LINER --24
                ,
                    a.REF_ORDER_REQ --25
                ,
                    a.REF_COLOR1 --26
                ,
                    a.REF_COLOR2 --27
                ,
                    a.REF_SIZE1 --28
                ,
                    a.REF_SIZE2 --29
                ,
                    isnull(a.REF_QTY1, 0) as REF_QTY1 --30
                ,
                    isnull(a.REF_QTY2, 0) as REF_QTY2 --31
                ,
                    a.STATUS_CD --32
                ,
                    a.SIZE_GROUP --33
                ,
                    isnull(f.SIZE_MEMBER, '') as smb --34
                ,
                    f.size_cnt,
                    a.remark
                FROM
                    KSV_ORDER_MST a
                    INNER JOIN KCD_FACTORY b ON a.FACTORY_CD = b.FACTORY_CD
                    LEFT OUTER JOIN KCD_SIZE_MST f ON a.SIZE_GROUP = f.SIZE_GROUP
                    LEFT OUTER JOIN KCD_CODE c ON a.ORDER_STATUS = c.CD_CODE
                    LEFT OUTER JOIN KCD_BUYER e ON LEFT(a.ORDER_CD, 2) = e.BUYER_CD
                    LEFT OUTER JOIN KCD_STYLE d ON a.STYLE_CD = d.STYLE_CD
                WHERE
                    (c.CD_GROUP = 'ORDER_STATUS')
                    AND ORDER_CD = '${args.data.ORDER_CD}'
                    -- and a.REG_USER in (select distinct user_id from kcd_user where company_code = '${tUserInfo.COMPANY_CODE}')
                ORDER BY
                    a.YY DESC,
                    a.SEQ DESC
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            let sqlStr1 = `
                SELECT
                    a.ORDER_CD,
                    b.COLOR,
                    c.CD_NAME,
                    isnull(b.COLOR, '') as COLOR,
                    a.PRICE,
                    isnull(a.SIZE_CNT, 0) as SIZE_CNT,
                    isnull(b.COLLECTION, '') as COLLECTION
                FROM
                    KSV_ORDER_MEM a
                    INNER JOIN KSV_PROD_MST b ON a.PROD_CD = b.PROD_CD
                    INNER JOIN KCD_CODE c ON b.PROD_TYPE = c.CD_CODE
                WHERE
                    (c.CD_GROUP = 'PROD_TYPE')
                    and (A.ORDER_CD = '${args.data.ORDER_CD}')
            `;
            var tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));

            try {
                var tSQL = '';
                var tRetDate = AFLib.getCurrTime();
                var tRetDate1 = tRetDate.substring(0, 8);
                var tUserInfo = AFLib.getUserInfo(contextValue);

                var tIdx = 0;
                var tArray = [];

                var tSumAmtArray = [];

                var tPath0 = '';
                var tCols0 = __dirname.split('/');
                var tFlag0 = 0;
                tCols0.forEach((col, i) => {
                    if (col !== '') {
                        if (col === 'src') {
                            tPath0 += '/upload/excel_template';
                            tFlag0 = 1;
                        }
                        if (tFlag0 === 0) {
                            tPath0 += '/' + col;
                        }
                    }
                });

                var tTemplateExcel = `${tPath0}/오더_OrderSheet.xlsx`;

                const wb = new Excel.Workbook();
                await wb.xlsx.readFile(tTemplateExcel);

                var tSheetName = `Sheet1`;
                const sheet = wb.getWorksheet(tSheetName);

                const tOne = {
                    ...tRet[0],
                };

                sheet.getCell(9, 6).value = args.data.ORDER_CD;
                sheet.getCell(11, 6).value = tOne.STYLE_NAME;
                sheet.getCell(10, 6).value = tOne.BYR;
                sheet.getCell(8, 6).value = tOne.FACTORY_NAME;
                sheet.getCell(8, 25).value = tOne.duedate;
                sheet.getCell(12, 6).value = tOne.TOT_CNT;

                var nSCnt = parseInt(tOne.size_cnt);
                var nMSCnt = 0;
                if (nSCnt > 23) nMSCnt = nSCnt - 23;

                sheet.getCell(5, 31).value = tRetDate1;

                var tSizes = tOne.smb.split(',');
                if (tSizes.length > 0) {
                    tSizes.forEach((col, i) => {
                        sheet.getCell(15, 7 + i).value = col;
                    });
                }

                if (tRet1.length > 0) {
                    sheet.getCell(10, 25).value = tRet1[0].COLLECTION;
                    tRet1.forEach((col, i) => {
                        sheet.getCell(16 + i, 2).value = col.COLOR;
                        var tSizeLeng = col.SIZE_CNT.length / 6;
                        var tIdx9 = 0;
                        for (tIdx9 = 0; tIdx9 < tSizeLeng; tIdx9++) {
                            var tVal = col.SIZE_CNT.substring(
                                tIdx9 * 6,
                                (tIdx9 + 1) * 6,
                            );
                            sheet.getCell(16 + i, 7 + tIdx9).value =
                                parseFloat(tVal);
                        }
                    });
                }

                var tSizeLeng = tRet1.length;

                sheet.getCell(9, 25).value = tOne.REF_ORDER_NO;
                sheet.getCell(21 + tSizeLeng, 3).value = tOne.REF_ORDER_REQ;
                sheet.getCell(31 + tSizeLeng, 2).value = tOne.REF_Q_OUTER;
                sheet.getCell(31 + tSizeLeng, 8).value = tOne.REF_Q_LINER;
                sheet.getCell(31 + tSizeLeng, 20).value = tOne.REF_COLOR1;
                sheet.getCell(32 + tSizeLeng, 20).value = tOne.REF_COLOR2;
                sheet.getCell(31 + tSizeLeng, 26).value = tOne.REF_SIZE1;
                sheet.getCell(32 + tSizeLeng, 26).value = tOne.REF_SIZE2;
                sheet.getCell(31 + tSizeLeng, 31).value = parseFloat(
                    tOne.REF_QTY1,
                );
                sheet.getCell(32 + tSizeLeng, 31).value = parseFloat(
                    tOne.REF_QTY2,
                );
                sheet.getCell(18 + tSizeLeng, 2).value = 'REMARK:';
                sheet.getCell(18 + tSizeLeng, 7).value = tOne.REMARK;

                // SPECIAL REQUIREMENTS 찾기 및 삭제 처리
                let startRow = 18 + tSizeLeng + 1;
                let specialReqRow = -1;

                for (let i = startRow; i < sheet.rowCount; i++) {
                    const cellVal = sheet.getCell(i, 2).value;
                    if (
                        typeof cellVal === 'string' &&
                        cellVal.trim().toUpperCase() === 'SPECIAL REQUIREMENTS'
                    ) {
                        specialReqRow = i;
                        break;
                    }
                }

                if (specialReqRow !== -1) {
                    const hideCount = specialReqRow - startRow;
                    if (hideCount > 0) {
                        for (let i = startRow; i < specialReqRow; i++) {
                            const row = sheet.getRow(i);
                            row.eachCell(
                                {
                                    includeEmpty: true,
                                },
                                (cell) => {
                                    cell.value = null; // 셀 내용 비움
                                },
                            );
                            row.hidden = true; // 행 숨기기 -> 삭제하는 경우 이하의 병합된 셀들이 깨어지고 이를 복원할 수 있는 방법이 excel.js에는 없음
                        }
                    }
                }

                var tPath = '';
                var tCols = __dirname.split('/');
                var tFlag = 0;
                tCols.forEach((col, i) => {
                    if (col === 'src') {
                        tPath += '/upload/excel';
                        tFlag = 1;
                    }
                    if (tFlag === 0) {
                        tPath += '/' + col;
                    }
                });

                return await upload(
                    `OrderSheet-${args.data.ORDER_CD}-${tUserInfo.USER_ID}-${tRetDate}.xlsx`,
                    wb,
                );
            } catch (error) {
                var tRetArray: any[] = [];
                var tObj = {
                    id: 0,
                    CODE: 'ERROR: ' + error.message,
                };

                console.log(error.message);

                tRetArray.push(tObj);
                return tRetArray;
            }
        },

        mgrQuery_S0204_ORDER_SHEET_COMBINE: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            let combineOrderCd = args.data.ORDERS.filter((item) => {
                const parsed = JSON.parse(item.ORDER_CD);
                return parsed.buyerPo === 'Combined Order';
            });

            combineOrderCd = JSON.parse(combineOrderCd[0].ORDER_CD).order;

            let childOrderCdList = args.data.ORDERS.filter((item) => {
                const parsed = JSON.parse(item.ORDER_CD);
                return parsed.buyerPo !== 'Combined Order';
            });

            const childOrders = childOrderCdList.map((item) => {
                const parsed = JSON.parse(item.ORDER_CD);
                return parsed.order;
            });

            console.log(combineOrderCd);
            console.log(childOrders);

            let sqlStr = `
                SELECT
                    a.ORDER_CD -- 0
                ,
                    a.ORDER_FLAG -- 1
                ,
                    a.SAMPLE_FLAG -- 2
                ,
                    d.STYLE_NAME -- 3
                ,
                    ISNULL(e.BUYER_NAME, '') AS BYR --4 
                ,
                    c.CD_NAME as ORDER_STATUS_N --5
                ,
                    '' as tempv --6
                ,
                    b.FACTORY_NAME --7
                ,
                    a.ORDER_DATE -- 8
                ,
                    SUBSTRING(a.DUE_DATE, 1, 4) + '-' + SUBSTRING(a.DUE_DATE, 5, 2) + '-' + SUBSTRING(a.DUE_DATE, 7, 2) AS duedate --9
                ,
                    '',
                    a.TOT_CNT --11
                ,
                    0 --12
                ,
                    a.COMMISSION --13
                ,
                    a.AVR_PRICE --14
                ,
                    a.FC_PRICE --15
                ,
                    a.MATL_AMT --16
                ,
                    0 --17
                ,
                    0 --18
                ,
                    a.ETC_AMT --19
                ,
                    a.REG_USER --20
                ,
                    SUBSTRING(a.REG_DATETIME, 1, 4) + '-' + SUBSTRING(a.REG_DATETIME, 5, 2) + '-' + SUBSTRING(a.REG_DATETIME, 7, 2) AS regdate --21
                ,
                    a.REF_ORDER_NO --22
                ,
                    a.REF_Q_OUTER --23
                ,
                    a.REF_Q_LINER --24
                ,
                    a.REF_ORDER_REQ --25
                ,
                    a.REF_COLOR1 --26
                ,
                    a.REF_COLOR2 --27
                ,
                    a.REF_SIZE1 --28
                ,
                    a.REF_SIZE2 --29
                ,
                    isnull(a.REF_QTY1, 0) as REF_QTY1 --30
                ,
                    isnull(a.REF_QTY2, 0) as REF_QTY2 --31
                ,
                    a.STATUS_CD --32
                ,
                    a.SIZE_GROUP --33
                ,
                    isnull(f.SIZE_MEMBER, '') as smb --34
                ,
                    f.size_cnt,
                    a.remark
                FROM
                    KSV_ORDER_MST a
                    INNER JOIN KCD_FACTORY b ON a.FACTORY_CD = b.FACTORY_CD
                    LEFT OUTER JOIN KCD_SIZE_MST f ON a.SIZE_GROUP = f.SIZE_GROUP
                    LEFT OUTER JOIN KCD_CODE c ON a.ORDER_STATUS = c.CD_CODE
                    LEFT OUTER JOIN KCD_BUYER e ON LEFT(a.ORDER_CD, 2) = e.BUYER_CD
                    LEFT OUTER JOIN KCD_STYLE d ON a.STYLE_CD = d.STYLE_CD
                WHERE
                    (c.CD_GROUP = 'ORDER_STATUS')
                    AND ORDER_CD = '${combineOrderCd}'
                    -- and a.REG_USER in (select distinct user_id from kcd_user where company_code = '${tUserInfo.COMPANY_CODE}')
                ORDER BY
                    a.YY DESC,
                    a.SEQ DESC
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            let sqlStr1 = `
                SELECT
                    a.prod_cd,
                    b.COLOR,
                    c.CD_NAME as PROD_TYPE_N,
                    isnull(b.COLOR, '') as COLOR,
                    a.PRICE,
                    isnull(a.SIZE_CNT, 0) as SIZE_CNT,
                    isnull(b.COLLECTION, '') as COLLECTION,
                    d.ref_order_req
                FROM
                    KSV_ORDER_MEM a,
                    KSV_PROD_MST b,
                    KCD_CODE c,
                    ksv_order_mst d
                WHERE
                    d.order_cd = a.order_cd
                    and b.PROD_TYPE = c.CD_CODE
                    and a.PROD_CD = b.PROD_CD
                    and (c.CD_GROUP = 'PROD_TYPE')
                    and (A.ORDER_CD = '${combineOrderCd}')
                    and a.add_flag = 0
            `;
            var tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));

            let sqlStr2 = `
                SELECT
                    a.prod_cd,
                    b.COLOR,
                    c.CD_NAME as PROD_TYPE_N,
                    isnull(b.COLOR, '') as COLOR,
                    a.PRICE,
                    isnull(a.SIZE_CNT, 0) as SIZE_CNT,
                    isnull(b.COLLECTION, '') as COLLECTION,
                    d.ref_order_req
                FROM
                    KSV_ORDER_MEM a,
                    KSV_PROD_MST b,
                    KCD_CODE c,
                    ksv_order_mst d
                WHERE
                    d.order_cd = a.order_cd
                    and b.PROD_TYPE = c.CD_CODE
                    and a.PROD_CD = b.PROD_CD
                    and (c.CD_GROUP = 'PROD_TYPE')
                    and (A.ORDER_CD = '${combineOrderCd}')
                    and a.add_flag = 1
                    and a.prod_cd = '${tRet1[0].prod_cd}'
            `;
            var tRet2 = await prisma.$queryRaw(Prisma.raw(sqlStr2));

            try {
                var tSQL = '';
                var tRetDate = AFLib.getCurrTime();
                var tRetDate1 = moment(
                    tRetDate.substring(0, 8),
                    'YYYYMMDD',
                ).format('YYYY-MM-DD');
                var tUserInfo = AFLib.getUserInfo(contextValue);

                var tIdx = 0;
                var tArray = [];

                var tSumAmtArray = [];

                var tPath0 = '';
                var tCols0 = __dirname.split('/');
                var tFlag0 = 0;
                tCols0.forEach((col, i) => {
                    if (col !== '') {
                        if (col === 'src') {
                            tPath0 += '/upload/excel_template';
                            tFlag0 = 1;
                        }
                        if (tFlag0 === 0) {
                            tPath0 += '/' + col;
                        }
                    }
                });

                var tTemplateExcel = `${tPath0}/오더_OrderSheet_Baby.xlsx`;

                const wb = new Excel.Workbook();
                await wb.xlsx.readFile(tTemplateExcel);

                var tSheetName = `오더 리스트`;
                const sheet = wb.getWorksheet(tSheetName);

                const tOne = {
                    ...tRet[0],
                };

                sheet.getCell(9, 6).value = combineOrderCd;
                sheet.getCell(11, 6).value = tOne.STYLE_NAME;
                sheet.getCell(10, 6).value = tOne.BYR;
                sheet.getCell(8, 6).value = tOne.FACTORY_NAME;
                sheet.getCell(8, 27).value = tOne.duedate;
                sheet.getCell(12, 6).value = tOne.TOT_CNT;

                var nSCnt = parseInt(tOne.size_cnt);
                var nMSCnt = 0;
                if (nSCnt > 23) nMSCnt = nSCnt - 23;

                sheet.getCell(5, 33).value = tRetDate1;

                var tSizes = tOne.smb.split(',');
                if (tSizes.length > 0) {
                    tSizes.forEach((col, i) => {
                        sheet.getCell(15, 9 + i).value = col;
                    });
                }

                let deleteStartRow = -1;
                if (tRet1.length > 0) {
                    sheet.getCell(10, 27).value = tRet1[0].COLLECTION;
                    tRet1.forEach((col, i) => {
                        sheet.getCell(16 + i * 2, 2).value = col.COLOR;
                        var tSizeLeng = col.SIZE_CNT.length / 6;
                        var tIdx9 = 0;
                        for (tIdx9 = 0; tIdx9 < tSizeLeng; tIdx9++) {
                            var tVal = col.SIZE_CNT.substring(
                                tIdx9 * 6,
                                (tIdx9 + 1) * 6,
                            );
                            sheet.getCell(16 + i * 2, 9 + tIdx9).value =
                                parseFloat(tVal);
                        }

                        deleteStartRow = 16 + i * 2 + 1;
                    });
                }

                if (tRet2.length > 0) {
                    tRet2.forEach((col, i) => {
                        sheet.getCell(16 + i, 2).value = col.COLOR;
                        var tSizeLeng = col.SIZE_CNT.length / 6;
                        var tIdx9 = 0;
                        for (tIdx9 = 0; tIdx9 < tSizeLeng; tIdx9++) {
                            var tVal = col.SIZE_CNT.substring(
                                tIdx9 * 6,
                                (tIdx9 + 1) * 6,
                            );
                            sheet.getCell(17 + i * 2, 9 + tIdx9).value =
                                parseFloat(tVal);
                        }
                    });
                }

                while (deleteStartRow <= sheet.rowCount) {
                    const cellValue = sheet
                        .getRow(deleteStartRow)
                        .getCell('A').value;

                    if (cellValue === 'Original Total') {
                        break; // 'Original Total'을 만나면 중단
                    }

                    sheet.spliceRows(deleteStartRow, 1); // 행 삭제 (자동으로 한 칸씩 당겨짐)
                }

                sheet.spliceRows(deleteStartRow, 0, ['Add']);

                var tSizeLeng = tRet1.length;
                sheet.getCell(9, 27).value = tOne.REF_ORDER_NO;

                let tRet1_1 = [];

                if (childOrders.length) {
                    let sqlStr1_1 = `
                        SELECT   
                a.order_cd,
                a.prod_cd, 
                b.COLOR, 
                c.CD_NAME as PROD_TYPE_N, 
                isnull(b.COLOR,'') as COLOR, 
                a.PRICE,
                isnull(a.SIZE_CNT,0) as SIZE_CNT,
                isnull(b.COLLECTION,'') as COLLECTION,
                d.ref_order_req,  
                d.ref_order_no,
                isnull(d.nat_cd, '') as country_cd,
                isnull(e.nat_name, '') as country
                        FROM      KSV_ORDER_MEM a, KSV_PROD_MST b, KCD_CODE c, ksv_order_mst d, kcd_nation e
                        WHERE d.order_cd = a.order_cd  
                        and b.PROD_TYPE = c.CD_CODE  
                        and a.PROD_CD = b.PROD_CD
                        and d.nat_cd = e.nat_cd 
                        and (c.CD_GROUP = 'PROD_TYPE')
                        --and (A.ORDER_CD like '%${args.data.ORDER_CD}-%') 
                        AND A.ORDER_CD IN (${childOrders.map((order) => `'${order}'`).join(', ')})
                        and a.add_flag =0 
            order by a.order_cd, a.prod_cd
            `;

                    tRet1_1 = await prisma.$queryRaw(Prisma.raw(sqlStr1_1));
                }

                // var tStartRow = tRet1.length * 2 + 21;
                var tStartRow = deleteStartRow + 6;
                var tIdx1 = 0;
                for (tIdx1 = 0; tIdx1 < tRet1_1.length; tIdx1++) {
                    var tOne = {
                        ...tRet1_1[tIdx1],
                    };
                    sheet.getCell(tStartRow + tIdx1 * 2, 1).value =
                        tOne.country;
                    sheet.getCell(tStartRow + tIdx1 * 2, 2).value =
                        tOne.ref_order_no;
                    sheet.getCell(tStartRow + tIdx1 * 2, 3).value =
                        tOne.order_cd.split('-')[2];
                    sheet.getCell(tStartRow + tIdx1 * 2, 4).value = tOne.COLOR;
                    var tSizeLeng = tOne.SIZE_CNT.length / 6;
                    var tIdx9 = 0;
                    for (tIdx9 = 0; tIdx9 < tSizeLeng; tIdx9++) {
                        var tVal = tOne.SIZE_CNT.substring(
                            tIdx9 * 6,
                            (tIdx9 + 1) * 6,
                        );
                        sheet.getCell(tStartRow + tIdx1 * 2, 9 + tIdx9).value =
                            parseFloat(tVal);
                    }
                    sheet.getCell(tStartRow + tIdx1 * 2 + 1, 1).value = 'Add';

                    let sqlStr1_2 = `
                        SELECT
                            a.prod_cd,
                            b.COLOR,
                            c.CD_NAME as PROD_TYPE_N,
                            isnull(b.COLOR, '') as COLOR,
                            a.PRICE,
                            isnull(a.SIZE_CNT, 0) as SIZE_CNT,
                            isnull(b.COLLECTION, '') as COLLECTION,
                            d.ref_order_req
                        FROM
                            KSV_ORDER_MEM a,
                            KSV_PROD_MST b,
                            KCD_CODE c,
                            ksv_order_mst d
                        WHERE
                            d.order_cd = a.order_cd
                            and b.PROD_TYPE = c.CD_CODE
                            and a.PROD_CD = b.PROD_CD
                            and (c.CD_GROUP = 'PROD_TYPE')
                            and (A.ORDER_CD = '${tOne.order_cd}')
                            and a.add_flag = 1
                            and a.prod_cd = '${tOne.prod_cd}'
                    `;
                    var tRet1_2 = await prisma.$queryRaw(Prisma.raw(sqlStr1_2));

                    if (tRet1_2.length > 0) {
                        var tIdx10 = 0;
                        var tSizeLeng = tRet1_2[0].SIZE_CNT.length / 6;
                        for (tIdx10 = 0; tIdx10 < tSizeLeng; tIdx10++) {
                            var tVal = tRet1_2[0].SIZE_CNT.substring(
                                tIdx10 * 6,
                                (tIdx10 + 1) * 6,
                            );
                            sheet.getCell(
                                tStartRow + tIdx1 * 2 + 1,
                                9 + tIdx10,
                            ).value = parseFloat(tVal);

                        }
                    }
                }

                // 16번째 행부터 200번째 행까지 AH 컬럼에 SUM 수식 적용
                for (let row = 16; row <= 200; row++) {
                    const cellAValue = sheet.getCell(`A${row}`).value; // A 컬럼 값 확인
                    const cellBValue = sheet.getCell(`B${row}`).value; // B 컬럼 값 확인

                    if (cellAValue === 'Country') {
                        // A 컬럼 값이 "Country"이면 AH 컬럼을 "TOTAL"로 설정
                        sheet.getCell(`AH${row}`).value = 'TOTAL';
                    } else if (
                        (cellAValue !== null &&
                            cellAValue !== undefined &&
                            cellAValue !== '') ||
                        (cellBValue !== null &&
                            cellBValue !== undefined &&
                            cellBValue !== '')
                    ) {
                        // A 또는 B 컬럼에 값이 있는 경우 AH 컬럼에 수식 입력
                        sheet.getCell(`AH${row}`).value = {
                            formula: `SUM(I${row}:AE${row})`,
                        };
                    }
                }

                // 1. "Original Total"이 있는 행 찾기
                let totalRowIndex = null;
                sheet.eachRow((row, rowNumber) => {
                    if (row.getCell('A').value === 'Original Total') {
                        totalRowIndex = rowNumber;
                    }
                });

                // 2. 16번째 행부터 B컬럼에 값이 있는 행 찾기
                const startRow = 16;
                const lastRow = totalRowIndex - 1;

                // 3. "Original Total" 행의 I~AG 컬럼에 합계 수식 적용
                for (let col = 9; col <= 33; col++) {
                    // I~AG (9~33번째 컬럼)
                    const columnLetter = sheet.getColumn(col).letter; // 컬럼명을 가져옴 (I, J, ..., AG)
                    const formula = `SUM(${columnLetter}${startRow}:${columnLetter}${lastRow})`;
                    sheet.getCell(totalRowIndex, col).value = {
                        formula,
                    };
                }

                // 1. "G.Total"이 있는 행 찾기
                let gTotalRowIndex = null;
                sheet.eachRow((row, rowNumber) => {
                    if (row.getCell('A').value === 'G.Total') {
                        gTotalRowIndex = rowNumber;
                    }
                });

                if (!gTotalRowIndex) {
                    console.error('G.Total row not found!');
                    return;
                }


                // 2. 두 칸 위의 행과 한 칸 위의 행 인덱스 계산
                const rowAbove1 = gTotalRowIndex - 1; // 한 칸 위
                const rowAbove2 = gTotalRowIndex - 2; // 두 칸 위

                // 3. I~AG 컬럼에 SUM 수식 적용
                for (let col = 9; col <= 33; col++) {
                    // I~AG (9~33번째 컬럼)
                    const columnLetter = sheet.getColumn(col).letter; // 컬럼명 가져오기 (I, J, ..., AG)
                    const formula = `SUM(${columnLetter}${rowAbove2}, ${columnLetter}${rowAbove1})`; // 두 개의 행을 SUM
                    sheet.getCell(gTotalRowIndex, col).value = {
                        formula,
                    };
                }

                for (let col = 9; col <= 25; col++) {
                    let maxWidth = 4;

                    sheet.getColumn(col).eachCell(
                        {
                            includeEmpty: true,
                        },
                        (cell) => {
                            const rawValue = cell.value;
                            let text = cell.text || '';

                            if (text === '' && rawValue != null) {
                                if (typeof rawValue === 'object') {
                                    if ('formula' in rawValue) {
                                        text = '';
                                    } else if ('richText' in rawValue) {
                                        text = rawValue.richText
                                            .map((item) => item.text)
                                            .join('');
                                    } else {
                                        text = String(rawValue);
                                    }
                                } else {
                                    text = String(rawValue);
                                }
                            }

                            const cellWidth = Math.max(text.trim().length + 1, 4);
                            if (cellWidth > maxWidth) {
                                maxWidth = cellWidth;
                            }
                        },
                    );

                    sheet.getColumn(col).width = Math.min(maxWidth, 8);
                }

                let ahWidth = 8;
                sheet.getColumn(34).eachCell(
                    {
                        includeEmpty: true,
                    },
                    (cell) => {
                        const text = String(cell.text || '').trim();
                        const cellWidth = Math.max(text.length + 2, 8);

                        if (cellWidth > ahWidth) {
                            ahWidth = cellWidth;
                        }
                    },
                );
                sheet.getColumn(34).width = Math.min(ahWidth, 12);

                var tPath = '';
                var tCols = __dirname.split('/');
                var tFlag = 0;

                tCols.forEach((col, i) => {
                    if (col === 'src') {
                        tPath += '/upload/excel';
                        tFlag = 1;
                    }
                    if (tFlag === 0) {
                        tPath += '/' + col;
                    }
                });

                return await upload(
                    `OrderSheet-${combineOrderCd}-${tUserInfo.USER_ID}-${tRetDate}.xlsx`,
                    wb,
                );
            } catch (error) {
                console.log(error);
                var tRetArray: any[] = [];
                var tObj = {
                    id: 0,
                    CODE: 'ERROR: ' + error.message,
                };

                tRetArray.push(tObj);
                return tRetArray;
            }
        },

        mgrQuery_S0204_ORDER_LIST: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            // Order Query
            var tInObj = {
                ...args.data,
            };
            var tFunc = new S0204_COMM();
            var tRetObj = await tFunc.queryS0204_ORDER_LIST(
                tInObj,
                contextValue,
            );

            var tRet = [...tRetObj.datas];

            console.log(`Order List Count:${tRet.length}`);

            try {
                var tSQL = '';
                var tRetDate = AFLib.getCurrTime();
                var tRetDate1 = tRetDate.substring(0, 8);
                var tUserInfo = AFLib.getUserInfo(contextValue);

                var tIdx = 0;
                var tArray = [];

                var tSumAmtArray = [];

                var tPath0 = '';
                var tCols0 = __dirname.split('/');
                var tFlag0 = 0;
                tCols0.forEach((col, i) => {
                    if (col !== '') {
                        if (col === 'src') {
                            tPath0 += '/upload/excel_template';
                            tFlag0 = 1;
                        }
                        if (tFlag0 === 0) {
                            tPath0 += '/' + col;
                        }
                    }
                });

                var tTemplateExcel = `${tPath0}/ORDER_LIST.xlsx`;

                const wb = new Excel.Workbook();
                await wb.xlsx.readFile(tTemplateExcel);

                var tSheetName = `list`;
                const sheet = wb.getWorksheet(tSheetName);

                var rowIdx = 4;

                sheet.getCell(2, 1).value = tRetDate1;

                tRet.forEach((col, i) => {
                    sheet.getCell(rowIdx + i, 1).value = col.PO_CD;
                    sheet.getCell(rowIdx + i, 2).value = col.ORDER_CD;
                    sheet.getCell(rowIdx + i, 3).value = col.REF_ORDER_NO;
                    sheet.getCell(rowIdx + i, 4).value = col.STYLE_NAME;
                    sheet.getCell(rowIdx + i, 5).value = col.ORDER_DATE;
                    sheet.getCell(rowIdx + i, 5).alignment = {
                        horizontal: 'center',
                        vertical: 'middle',
                    };
                    sheet.getCell(rowIdx + i, 6).value = col.DUE_DATE;
                    sheet.getCell(rowIdx + i, 6).alignment = {
                        horizontal: 'center',
                        vertical: 'middle',
                    };
                    sheet.getCell(rowIdx + i, 7).value = col.TOT_CNT;
                    sheet.getCell(rowIdx + i, 8).value = Number(col.TOT_CNT - col.ADD_CNT);
                    sheet.getCell(rowIdx + i, 9).value = col.ADD_CNT;
                    sheet.getCell(rowIdx + i, 10).value = col.SHIP_CNT;
                    sheet.getCell(rowIdx + i, 11).value = AFLib.numToFixed(
                        parseFloat(col.AVR_PRICE),
                        4,
                    );
                    sheet.getCell(rowIdx + i, 12).value = col.CURR_CD;
                    sheet.getCell(rowIdx + i, 13).value = AFLib.numToFixed(
                        parseFloat(col.USD_PRICE),
                        4,
                    );
                    sheet.getCell(rowIdx + i, 14).value = AFLib.numToFixed(
                        parseFloat(col.FC_PRICE),
                        4,
                    );
                    sheet.getCell(rowIdx + i, 15).value = AFLib.numToFixed(
                        parseFloat(col.C_MATL_AMT),
                        2,
                    );
                    sheet.getCell(rowIdx + i, 16).value = AFLib.numToFixed(
                        parseFloat(col.C_ETC_AMT),
                        2,
                    );
                    sheet.getCell(rowIdx + i, 17).value = AFLib.numToFixed(
                        parseFloat(col.MARGIN),
                        2,
                    );
                    sheet.getCell(rowIdx + i, 18).value = AFLib.numToFixed(
                        parseFloat(col.MARGIN2),
                        2,
                    );
                    sheet.getCell(rowIdx + i, 19).value = col.STATUS_NAME;
                    sheet.getCell(rowIdx + i, 20).value = col.END_STATUS;
                    sheet.getCell(rowIdx + i, 21).value = col.REMARK;
                    sheet.getCell(rowIdx + i, 22).value = col.REG_USER;
                    sheet.getCell(rowIdx + i, 23).value = col.FACTORY_NAME;
                    sheet.getCell(rowIdx + i, 24).value = col.REF_Q_OUTER;
                    sheet.getCell(rowIdx + i, 25).value = col.REF_Q_LINER;

                    for (let colIdx = 1; colIdx <= 25; colIdx++) {
                        const cell = sheet.getCell(rowIdx + i, colIdx);
                        cell.border = {
                            top: {
                                style: 'thin',
                            },
                            left: {
                                style: 'thin',
                            },
                            bottom: {
                                style: 'thin',
                            },
                            right: {
                                style: 'thin',
                            },
                        };
                    }
                });

                var tPath = '';
                var tCols = __dirname.split('/');
                var tFlag = 0;
                tCols.forEach((col, i) => {
                    if (col === 'src') {
                        tPath += '/upload/excel';
                        tFlag = 1;
                    }
                    if (tFlag === 0) {
                        tPath += '/' + col;
                    }
                });

                return await upload(
                    `OrderList-${tUserInfo.USER_ID}-${tRetDate}.xlsx`,
                    wb,
                );
            } catch (error) {
                var tRetArray: any[] = [];
                var tObj = {
                    id: 0,
                    CODE: 'ERROR: ' + error.message,
                };
                tObj.id = 0;
                tObj.CODE = 'ERROR: ' + error.message;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },

        mgrQuery_S0204_ORDER_QTY: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tSQL = '';

            try {
                var tSQL = '';
                var tRetDate = AFLib.getCurrTime();
                var tRetDate1 = tRetDate.substring(0, 8);
                var tUserInfo = AFLib.getUserInfo(contextValue);

                var tIdx = 0;
                var tArray = [];

                var tSumAmtArray = [];

                var tPath0 = '';
                var tCols0 = __dirname.split('/');
                var tFlag0 = 0;
                tCols0.forEach((col, i) => {
                    if (col !== '') {
                        if (col === 'src') {
                            tPath0 += '/upload/excel_template';
                            tFlag0 = 1;
                        }
                        if (tFlag0 === 0) {
                            tPath0 += '/' + col;
                        }
                    }
                });

                var tTemplateExcel = `${tPath0}/list.xlsx`;

                const wb = new Excel.Workbook();
                await wb.xlsx.readFile(tTemplateExcel);

                var tSheetName = `Sheet1`;
                const sheet = wb.getWorksheet(tSheetName);

                const sumSizeCntRows = (rows: any[]) => {
                    if (!rows || rows.length === 0) return [];

                    const chunkSize = 6;
                    const firstSizeCnt = String(rows[0].size_cnt || '');
                    const numChunks = Math.floor(firstSizeCnt.length / chunkSize);
                    const totals = new Array(numChunks).fill(0);

                    rows.forEach((row) => {
                        const sizeCnt = String(row.size_cnt || '');
                        for (let i = 0; i < numChunks; i++) {
                            const n = parseInt(
                                sizeCnt.slice(i * chunkSize, (i + 1) * chunkSize),
                                10,
                            );
                            totals[i] += Number.isNaN(n) ? 0 : n;
                        }
                    });

                    return totals;
                };

                var tIdx = 0;
                var tPrintRow = 3;
                var tSaveOrderCd = '';
                const nonCombinedCountCache = {};

                for (tIdx = 0; tIdx < args.data.length; tIdx++) {
                    var tOne = args.data[tIdx];

                    let sqlStr = `
                        SELECT
                            '' as col1,
                            B.ORDER_CD,
                            E.STYLE_NAME,
                            F.COLOR,
                            D.SIZE_MEMBER,
                            C.SIZE_CNT,
                            B.TOT_CNT,
                            c.prod_cd,
                            g.nat_name,
                            b.ref_order_no
                        FROM
                            KSV_ORDER_MST B,
                            KSV_ORDER_MEM C,
                            KCD_SIZE_MST D,
                            KCD_STYLE E,
                            KSV_PROD_MST F,
                            kcd_nation g
                        WHERE
                            B.ORDER_CD = C.ORDER_CD
                            and B.SIZE_GROUP = D.SIZE_GROUP
                            and B.STYLE_CD = E.STYLE_CD
                            and C.PROD_CD = F.PROD_CD
                            and g.nat_cd = b.nat_cd
                            and c.add_flag = '0'
                            and (b.order_CD like '${tOne.ORDER_CD}%')
                        ORDER BY
                            B.ORDER_CD,
                            F.COLOR
                    `;
                    var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

                    const pairMap = {};
                    tRet.forEach((row) => {
                        const pairKey = `${row.ORDER_CD}|||${row.prod_cd}`;
                        if (!pairMap[pairKey]) {
                            pairMap[pairKey] = {
                                orderCd: row.ORDER_CD,
                                prodCd: row.prod_cd,
                            };
                        }
                    });

                    const pairList = Object.values(pairMap);
                    let shipRows = [];
                    let memRows = [];

                    if (pairList.length > 0) {
                        const pairCondition = pairList
                            .map(
                                (pair: any) =>
                                    `(order_cd = '${pair.orderCd}' and prod_cd = '${pair.prodCd}')`,
                            )
                            .join(' OR ');

                        const shipSql = `
                            SELECT
                                order_cd,
                                prod_cd,
                                size_cnt,
                                ship_cnt
                            FROM
                                KSV_ORDER_SHIP
                            WHERE
                                ${pairCondition}
                        `;
                        shipRows = await prisma.$queryRaw(Prisma.raw(shipSql));

                        const memSql = `
                            SELECT
                                order_cd,
                                prod_cd,
                                size_cnt
                            FROM
                                KSV_ORDER_MEM
                            WHERE
                                ${pairCondition}
                        `;
                        memRows = await prisma.$queryRaw(Prisma.raw(memSql));
                    }

                    const shipRowMap = {};
                    shipRows.forEach((row) => {
                        const key = `${row.order_cd}|||${row.prod_cd}`;
                        if (!shipRowMap[key]) {
                            shipRowMap[key] = [];
                        }
                        shipRowMap[key].push(row);
                    });

                    const memRowMap = {};
                    memRows.forEach((row) => {
                        const key = `${row.order_cd}|||${row.prod_cd}`;
                        if (!memRowMap[key]) {
                            memRowMap[key] = [];
                        }
                        memRowMap[key].push(row);
                    });

                    let tSizeArray = [];
                    let blockNumSizes = 0;
                    for (let i = 0; i < tRet.length; i++) {
                        var tOne1 = {
                            ...tRet[i],
                        };

                        if (
                            !Object.prototype.hasOwnProperty.call(
                                nonCombinedCountCache,
                                tOne1.ORDER_CD,
                            )
                        ) {
                            let sqlStr1 = `
                                SELECT
                                    isnull(count(*), 0) as cnt
                                FROM
                                    KSV_ORDER_MST B,
                                    KSV_ORDER_MEM C,
                                    KCD_SIZE_MST D,
                                    KCD_STYLE E,
                                    KSV_PROD_MST F,
                                    kcd_nation g
                                WHERE
                                    B.ORDER_CD = C.ORDER_CD
                                    and B.SIZE_GROUP = D.SIZE_GROUP
                                    and B.STYLE_CD = E.STYLE_CD
                                    and C.PROD_CD = F.PROD_CD
                                    and g.nat_cd = b.nat_cd
                                    and (b.order_cd like '${tOne1.ORDER_CD}%')
                                    and b.ref_order_no <> 'Combined Order'
                            `;
                            var tRet1 = await prisma.$queryRaw(
                                Prisma.raw(sqlStr1),
                            );
                            nonCombinedCountCache[tOne1.ORDER_CD] = Number(
                                tRet1[0].cnt || 0,
                            );
                        }

                        if (nonCombinedCountCache[tOne1.ORDER_CD] <= 0)
                            tOne1.ref_order_no = '';

                        if (tSaveOrderCd !== tOne1.ORDER_CD.substring(0, 10)) {
                            tSaveOrderCd = tOne1.ORDER_CD.substring(0, 10);
                            tSizeArray = tOne1.SIZE_MEMBER.split(',');
                            blockNumSizes = tSizeArray.length;

                            const startRow = 3; // 3번째 행
                            const titleSections = [
                                {
                                    label: 'Total',
                                    color: 'FFFF00',
                                }, // 노란색
                                {
                                    label: 'S.Total',
                                    color: 'CCECFF',
                                }, // 옅은 파란색
                                {
                                    label: 'B.Total',
                                    color: 'FFE5CC',
                                }, // 옅은 주황색
                            ];

                            const borderStyle = {
                                top: {
                                    style: 'thin',
                                },
                                left: {
                                    style: 'thin',
                                },
                                bottom: {
                                    style: 'thin',
                                },
                                right: {
                                    style: 'thin',
                                },
                            };

                            let currentCol = 7;

                            titleSections.forEach((section) => {
                                const values = [section.label, ...tSizeArray];
                                values.forEach((value, index) => {
                                    const cell = sheet.getCell(
                                        startRow,
                                        currentCol + index,
                                    );
                                    cell.value = value;
                                    cell.fill = {
                                        type: 'pattern',
                                        pattern: 'solid',
                                        fgColor: {
                                            argb: section.color,
                                        },
                                    };
                                    cell.border = borderStyle;
                                });
                                currentCol += values.length;
                            });

                            tPrintRow += 1;
                            sheet.getCell(tPrintRow, 1).value = tOne1.ORDER_CD;
                            sheet.getCell(tPrintRow, 2).value =
                                tOne1.STYLE_NAME;
                            //sheet.getCell(tPrintRow, 7).value =  tOne1.TOT_CNT;
                        }

                        // if (tOne1.ref_order_no !== 'Combined Order') {
                        tPrintRow += 1;

                        sheet.getCell(tPrintRow, 1).value = tOne1.ORDER_CD;
                        sheet.getCell(tPrintRow, 2).value = tOne1.STYLE_NAME;
                        sheet.getCell(tPrintRow, 3).value = tOne1.nat_name;
                        sheet.getCell(tPrintRow, 4).value = tOne1.ref_order_no;
                        sheet.getCell(tPrintRow, 5).value = tOne1.prod_cd;
                        sheet.getCell(tPrintRow, 6).value = tOne1.COLOR;

                        const pairKey = `${tOne1.ORDER_CD}|||${tOne1.prod_cd}`;
                        let dbRows = memRowMap[pairKey] || [];

                        // TOTAL
                        let total = sumSizeCntRows(dbRows);

                        total.forEach((val, i) => {
                            sheet.getCell(tPrintRow, 8 + i).value = val;
                        });

                        dbRows = shipRowMap[pairKey] || [];

                        // S.TOTAL
                        if (dbRows.length) {
                            total = sumSizeCntRows(dbRows);

                            total.forEach((val, i) => {
                                sheet.getCell(
                                    tPrintRow,
                                    8 + tSizeArray.length + 1 + i,
                                ).value = val;
                            });
                        }

                        if (i === tRet.length - 1 && blockNumSizes > 0) {
                            // B.TOTAL
                            let startRow = 5; // 데이터가 시작되는 행 번호
                            let totalStartCol = 8; // H열 (Total의 XS 시작 위치)
                            let sTotalStartCol = 8 + blockNumSizes + 1; // O열 (S.Total의 XS 시작 위치)
                            let bTotalStartCol =
                                sTotalStartCol + blockNumSizes + 1; // V열 (B.Total의 XS 시작 위치)
                            let numSizes = blockNumSizes; // XS ~ 3XL

                            for (let row = 0; row < tRet.length; row++) {
                                for (let col = 0; col < numSizes; col++) {
                                    const formula = `=${getExcelCol(totalStartCol + col)}${startRow + row} - ${getExcelCol(sTotalStartCol + col)}${startRow + row}`;
                                    const cell = sheet.getCell(
                                        startRow + row,
                                        bTotalStartCol + col,
                                    );
                                    cell.value = {
                                        formula,
                                    };
                                }
                            }

                            let totalRows = tRet.length; // 총 데이터 행 수
                            let finalSumRow = startRow - 1; // 4번째 데이터 행

                            for (let col = 0; col < numSizes; col++) {
                                // Total 세로합
                                let colLetter = getExcelCol(totalStartCol + col);
                                let sumFormula = `=SUM(${colLetter}${startRow}:${colLetter}${startRow + totalRows - 1})`;
                                sheet.getCell(
                                    finalSumRow,
                                    totalStartCol + col,
                                ).value = {
                                    formula: sumFormula,
                                };

                            // S.Total 세로합
                                colLetter = getExcelCol(sTotalStartCol + col);
                                sumFormula = `=SUM(${colLetter}${startRow}:${colLetter}${startRow + totalRows - 1})`;
                                sheet.getCell(
                                    finalSumRow,
                                    sTotalStartCol + col,
                                ).value = {
                                    formula: sumFormula,
                                };

                            // B.Total 세로합
                                colLetter = getExcelCol(bTotalStartCol + col);
                                sumFormula = `=SUM(${colLetter}${startRow}:${colLetter}${startRow + totalRows - 1})`;
                                sheet.getCell(
                                    finalSumRow,
                                    bTotalStartCol + col,
                                ).value = {
                                    formula: sumFormula,
                                };
                            }

                        // 가로합 (각 행의 Total, S.Total, B.Total 블록 왼쪽에 넣기)
                            for (let row = 0; row < totalRows; row++) {
                                let currentRow = startRow + row;

                            // Total 가로합 (왼쪽 셀에)
                                let formula = `=SUM(${getExcelCol(totalStartCol)}${currentRow}:${getExcelCol(totalStartCol + numSizes - 1)}${currentRow})`;
                                sheet.getCell(currentRow, totalStartCol - 1).value =
                                    {
                                        formula,
                                    };

                                // S.Total 가로합 (왼쪽 셀에)
                                formula = `=SUM(${getExcelCol(sTotalStartCol)}${currentRow}:${getExcelCol(sTotalStartCol + numSizes - 1)}${currentRow})`;
                                sheet.getCell(
                                    currentRow,
                                    sTotalStartCol - 1,
                                ).value = {
                                    formula,
                                };

                                // B.Total 가로합 (왼쪽 셀에)
                                formula = `=SUM(${getExcelCol(bTotalStartCol)}${currentRow}:${getExcelCol(bTotalStartCol + numSizes - 1)}${currentRow})`;
                                sheet.getCell(
                                    currentRow,
                                    bTotalStartCol - 1,
                                ).value = {
                                    formula,
                                };
                            }

                            const summaryRow = startRow - 1; // 4번째 줄 (데이터 위 줄)

                            const blockInfo = [
                                {
                                    name: 'Total',
                                    col: totalStartCol - 1,
                                },
                                {
                                    name: 'S.Total',
                                    col: sTotalStartCol - 1,
                                },
                                {
                                    name: 'B.Total',
                                    col: bTotalStartCol - 1,
                                },
                            ];

                            blockInfo.forEach((block) => {
                                const colLetter = getExcelCol(block.col);
                                const formula = `=SUM(${colLetter}${startRow}:${colLetter}${startRow + totalRows - 1})`;
                                sheet.getCell(summaryRow, block.col).value = {
                                    formula,
                                };
                            });

                            const tealFill = {
                                type: 'pattern',
                                pattern: 'solid',
                                fgColor: {
                                    argb: 'ADD8E6',
                                }, // Light Sky Blue
                            };

                            const highlightRow = startRow - 1; // 4번째 행

                            const row = sheet.getRow(highlightRow);
                            const startCol = totalStartCol - 1; // G열
                            let lastCol = row.cellCount;

                            while (
                                !row.getCell(lastCol).value &&
                                lastCol > startCol
                            ) {
                                lastCol--;
                            }

                            for (let col = startCol; col <= lastCol; col++) {
                                const cell = row.getCell(col);
                                cell.fill = tealFill;
                            }
                        }
                    }
                    tPrintRow += 1;
                }

                const row3 = sheet.getRow(3);
                let lastColumn = 1;
                row3.eachCell(
                    {
                        includeEmpty: false,
                    },
                    (cell, colNumber) => {
                        if (colNumber > lastColumn) {
                            lastColumn = colNumber;
                        }
                    },
                );

                const lastRow = Math.max(4, tPrintRow);

                for (let row = 4; row <= lastRow; row++) {
                    for (let col = 1; col <= lastColumn; col++) {
                        const cell = sheet.getRow(row).getCell(col);
                        cell.border = {
                            top: {
                                style: 'thin',
                            },
                            left: {
                                style: 'thin',
                            },
                            bottom: {
                                style: 'thin',
                            },
                            right: {
                                style: 'thin',
                            },
                        };
                    }
                }

                var tPath = '';
                var tCols = __dirname.split('/');
                var tFlag = 0;
                tCols.forEach((col, i) => {
                    if (col === 'src') {
                        tPath += '/upload/excel';
                        tFlag = 1;
                    }
                    if (tFlag === 0) {
                        tPath += '/' + col;
                    }
                });

                return await upload(
                    `Order_Ship_Qty-${tUserInfo.USER_ID}-${tRetDate}.xlsx`,
                    wb,
                );
            } catch (error) {
                var tRetArray: any[] = [];
                var tObj = {
                    id: 0,
                    CODE: 'ERROR: ' + error.message,
                };

                console.log(error);
                tRetArray.push(tObj);
                return tRetArray;
            }
        },

        mgrQuery_S0204_KSV_ORDER_FOB: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tSQL = '';
            var tSQL1 = '';
            var tSQL2 = '';
            var tSQL3 = '';
            var tSQL4 = '';

            let sqlStr = `
                select
                    FOB_SEQ,
                    SHIP_QTY,
                    FOB,
                    FOB100
                from
                    ksv_order_fob
                where
                    order_cd = '${args.data.ORDER_CD}'
                order by
                    fob_seq
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            return tRet;
        },

        mgrQuery_S0204_ORDER_LIST_TBL_KSV_ORDER_MST_bak: async (
            _,
            args,
            contextValue,
        ) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tShipCnt = 0;
            var sShipDate = '';
            var eShipDate = '';
            if (args.data.IS_SHIP_DATE === '1') {
                var tDate99_1 = args.data.S_SHIP_DATE;
                var tDate99_2 = args.data.E_SHIP_DATE;
                if (args.data.S_SHIP_DATE === '')
                    tDate99_1 = `${tRetDate.substring(0, 6)}01`;
                if (args.data.E_SHIP_DATE === '') tDate99_2 = '99999999';
                sShipDate = tDate99_1;
                eShipDate = tDate99_2;
            } else {
                sShipDate = `${tRetDate.substring(0, 6)}01}`;
                eShipDate = '99999999';
            }

            if (args.data.IS_SHIP === '1' || args.data.IS_SHIP_DATE === '1') {
                var tmpSql = '';
                if (args.data.IS_SHIP === '1') {
                    tmpSql = `having sum(ship_cnt) > 0 `;
                }

                var tShipCheckSql = `
                    select
                        order_cd,
                        isnull(sum(ship_cnt), 0) as s_ship_cnt
                    from
                        ksv_order_ship
                    where
                        ship_date between '${sShipDate}' and '${eShipDate}'
                    group by
                        order_cd ${tmpSql}
                `;
                var retShipCheckSql = await prisma.$queryRaw(
                    Prisma.raw(tShipCheckSql),
                );
                tShipCnt = retShipCheckSql.length;
                if (retShipCheckSql.length <= 0) {
                    var tWObj = {};
                    tWObj.message = '';
                    tWObj.datas = [];
                    var tIdx = 0;
                    return tWObj;
                }
                console.log('Ship Data:' + retShipCheckSql.length);
            }

            var tFlag = 0;
            var tKeys = Object.keys(args.data);
            tKeys.forEach((col, i) => {
                if (
                    args.data[`${col}`] === '' ||
                    args.data[`${col}`] === ' ' ||
                    args.data[`${col}`] === '-'
                ) {
                } else {
                    tFlag = 1;
                }
            });

            // if (tFlag === 0 || (args.data.IS_DUEDATE !== '1' && args.data.IS_SHIP_DATE !== '1')) {
            var sqlORDER_DATE = '';
            if (tFlag === 0) {
                var tSDate = `${tRetDate.substring(0, 6)}01`;
                var tEDate = '99999999';
                sqlORDER_DATE = `AND a1.ORDER_DATE between '${tSDate}' and '${tEDate}' `;
            }

            var sqlDUE_DATE = '';
            if (args.data.IS_DUEDATE === '1') {
                var tDate1 = args.data.S_DUE_DATE;
                var tDate2 = args.data.E_DUE_DATE;
                if (args.data.S_DUE_DATE === '')
                    tDate1 = `${tRetDate.substring(0, 6)}01`;
                if (args.data.E_DUE_DATE === '') tDate2 = '99999999';
                sqlDUE_DATE = `AND a1.DUE_DATE between '${tDate1}' and '${tDate2}' `;
            }

            var sqlPO = '';
            if (args.data.PO_CD !== '') {
                sqlPO = `inner join ksv_po_mem b on a.order_cd = b.order_cd and b.po_seq = 1 AND b.PO_CD like '%${args.data.PO_CD}%' `;
            } else {
                sqlPO += `left join ksv_po_mem b on a.order_cd = b.order_cd and b.po_seq = 1  `;
            }

            var sqlREF_ORDER_NO = '';
            if (args.data.REF_ORDER_NO !== '') {
                sqlREF_ORDER_NO = `and  a1.order_type in ('0','1') `;
                sqlREF_ORDER_NO += `
                    AND a1.order_cd in (
                        select distinct
                            left(order_cd, 10)
                        from
                            ksv_order_mst
                        where
                            ref_order_no like '%${args.data.REF_ORDER_NO}%'
                            and order_type in ('0', '1', '2')
                    )
                `;
            } else {
                sqlREF_ORDER_NO = `and  a1.order_type in ('0','1') `;
            }

            var sqlSTATUS_CD = '';
            if (args.data.STATUS_CD === 'E1') {
                // Not End List
                sqlSTATUS_CD = `AND a1.ORDER_STATUS  not in ('4','9') `;
            } else if (args.data.STATUS_CD === 'E2') {
                // Need End Report
                sqlSTATUS_CD = `AND a1.ORDER_STATUS  in ('1','2', '3', '5', '7') `;
            } else if (args.data.STATUS_CD === '777') {
                sqlSTATUS_CD = `AND a1.ORDER_STATUS  in ('1','2', '3', '5') `;
            } else if (args.data.STATUS_CD !== '') {
                sqlSTATUS_CD = `AND a1.ORDER_STATUS = '${args.data.STATUS_CD}' `;
            }

            var sqlSAMPLE_FLAG = '';
            if (args.data.IS_SAMPLE === '1' && args.data.IS_MAIN !== '1') {
                sqlSAMPLE_FLAG = `AND a1.SAMPLE_FLAG = '1' `;
            }
            if (args.data.IS_SAMPLE !== '1' && args.data.IS_MAIN === '1') {
                sqlSAMPLE_FLAG = `AND a1.SAMPLE_FLAG <> '1' `;
            }

            var tShipSQL1 = '';
            if (args.data.IS_SHIP_DATE === '1' || args.data.IS_SHIP === '1') {
                var tmpSql = `and f2.ship_date between '${sShipDate}' and '${eShipDate}' `;
                var tmpSql1 = 'having sum(f2.ship_cnt) > 0';

                if (args.data.IS_SHIP_DATE !== '1') tmpSql = '';
                if (args.data.IS_SHIP !== '1') tmpSql1 = '';

                tShipSQL1 = `
                    inner join (
                        select
                            top 1000 f1.order_cd,
                            isnull(sum(f2.ship_cnt), 0) as sum_ship_cnt
                        from
                            (
                                select
                                    a1.order_cd
                                from
                                    ksv_order_mst a1
                                    left join kcd_code a2 on a2.cd_code = a1.buyer_team
                                    and a2.cd_group = 'buyer_team',
                                    kcd_style d
                                where
                                    a1.style_cd = d.style_cd
                                    AND a1.ORDER_CD like '%${args.data.ORDER_CD}%'
                                    AND a1.FACTORY_CD like '%${args.data.FACTORY_CD}%'
                                    AND LEFT(a1.ORDER_CD, 2) like '%${args.data.BUYER_CD}%'
                                    AND LEFT(a1.ORDER_CD, 2) in (
                                        select
                                            buyer_cd
                                        from
                                            kcd_buyer
                                        where
                                            buyer_team like '%${args.data.BUYER_TEAM}%'
                                    )
                                    AND a1.REG_USER like '%${args.data.REG_USER}%'
                                    AND (
                                        d.style_cd like '%${args.data.STYLE_CD}%'
                                        or d.style_name like '%${args.data.STYLE_CD}%'
                                    ) ${sqlSAMPLE_FLAG} ${sqlREF_ORDER_NO} ${sqlDUE_DATE} ${sqlSTATUS_CD} ${sqlORDER_DATE}
                            ) f1,
                            ksv_order_ship f2
                        where
                            f1.order_cd = f2.order_cd ${tmpSql}
                            and f2.ship_ptype in ('0', '5')
                        group by
                            f1.order_cd ${tmpSql1}
                    ) f on a.order_cd = f.order_cd
                `;
            } else {
                var tmpSql = '';
                var tmpSql1 = '';

                tShipSQL1 = `
                    left join (
                        select
                            f1.order_cd,
                            isnull(sum(f2.ship_cnt), 0) as sum_ship_cnt
                        from
                            (
                                select
                                    top 1000 a1.order_cd
                                from
                                    ksv_order_mst a1
                                    left join kcd_code a2 on a2.cd_code = a1.buyer_team
                                    and a2.cd_group = 'buyer_team',
                                    kcd_style d
                                where
                                    a1.style_cd = d.style_cd
                                    AND a1.ORDER_CD like '%${args.data.ORDER_CD}%'
                                    AND a1.FACTORY_CD like '%${args.data.FACTORY_CD}%'
                                    AND LEFT(a1.ORDER_CD, 2) like '%${args.data.BUYER_CD}%'
                                    AND LEFT(a1.ORDER_CD, 2) in (
                                        select
                                            buyer_cd
                                        from
                                            kcd_buyer
                                        where
                                            buyer_team like '%${args.data.BUYER_TEAM}%'
                                    )
                                    AND a1.REG_USER like '%${args.data.REG_USER}%'
                                    AND (
                                        d.style_cd like '%${args.data.STYLE_CD}%'
                                        or d.style_name like '%${args.data.STYLE_CD}%'
                                    ) ${sqlSAMPLE_FLAG} ${sqlREF_ORDER_NO} ${sqlDUE_DATE} ${sqlSTATUS_CD} ${sqlORDER_DATE}
                            ) f1,
                            ksv_order_ship f2
                        where
                            f1.order_cd = f2.order_cd ${tmpSql}
                            and f2.ship_ptype in ('0', '5')
                        group by
                            f1.order_cd ${tmpSql1}
                    ) f on a.order_cd = f.order_cd
                `;
            }

            let sqlStr0 = `
                select
                    isnull(count(*), 0) as row_cnt
                from
                    (
                        select
                            isnull(b.PO_CD, '') as PO_CD,
                            a.ORDER_CD,
                            LEFT(a.ORDER_CD, 2) as BUYER_CD,
                            h1.BUYER_NAME,
                            a.REF_ORDER_NO,
                            a.STYLE_NAME,
                            a.STYLE_CD,
                            a.ORDER_DATE,
                            a.DUE_DATE,
                            a.MATL_DUE_DATE,
                            isnull(a.ETD, '') as ETD,
                            a.TOT_CNT,
                            a.ADD_CNT,
                            0 as SHIP_CNT,
                            a.AVR_PRICE,
                            a.CURR_CD,
                            a.USD_PRICE,
                            isnull(a.FC_PRICE, 0) as FC_PRICE,
                            0 as C_MATL_AMT,
                            0 as C_ETC_AMT,
                            0 as MARGIN,
                            0 as MARGIN2,
                            e.cd_name as STATUS_NAME,
                            a.END_STATUS,
                            case
                                when a.REMARK = '' then ' '
                                else ' '
                            END as REMARK,
                            a.REG_USER,
                            h.FACTORY_NAME,
                            a.FACTORY_CD,
                            isnull(a.REF_Q_OUTER, '') as REF_Q_OUTER,
                            isnull(a.REF_Q_LINER, '') as REF_Q_LINER,
                            isnull(a.ETC_AMT, 0) as ETC_AMT,
                            isnull(a.MATL_AMT, 0) as MATL_AMT,
                            a.ORDER_TYPE,
                            a.ORDER_STATUS,
                            isnull(a.ORG_DUE_DATE, '') as ORG_DUE_DATE,
                            a.ORDER_FLAG,
                            a.SAMPLE_FLAG,
                            a.MATL_SALE_FLAG,
                            a.FAC_LC_FLAG,
                            a.FAC_TT_FLAG,
                            isnull(a.PI_CD, '') as PI_CD,
                            isnull(a.PRICE_TERM, '') as PRICE_TERM,
                            a.BUYER_TEAM_N
                        from
                            (
                                select
                                    a1.*,
                                    d.STYLE_NAME,
                                    isnull(a2.cd_name, '') as BUYER_TEAM_N
                                from
                                    ksv_order_mst a1
                                    left join kcd_code a2 on a2.cd_code = a1.buyer_team
                                    and a2.cd_group = 'buyer_team',
                                    kcd_style d
                                where
                                    a1.style_cd = d.style_cd
                                    AND a1.ORDER_CD like '%${args.data.ORDER_CD}%'
                                    AND a1.FACTORY_CD like '%${args.data.FACTORY_CD}%'
                                    AND LEFT(a1.ORDER_CD, 2) like '%${args.data.BUYER_CD}%'
                                    AND LEFT(a1.ORDER_CD, 2) in (
                                        select
                                            buyer_cd
                                        from
                                            kcd_buyer
                                        where
                                            buyer_team like '%${args.data.BUYER_TEAM}%'
                                    )
                                    AND a1.REG_USER like '%${args.data.REG_USER}%'
                                    AND (
                                        d.style_cd like '%${args.data.STYLE_CD}%'
                                        or d.style_name like '%${args.data.STYLE_CD}%'
                                    ) ${sqlSAMPLE_FLAG} ${sqlREF_ORDER_NO} ${sqlDUE_DATE} ${sqlSTATUS_CD} ${sqlORDER_DATE}
                            ) a ${sqlPO} ${tShipSQL1}
                            left join kcd_code e on a.order_status = e.cd_code
                            and e.cd_group = 'ORDER_STATUS'
                            left join kzz_outsourcing_cost g on a.order_cd = g.order_cd
                            left join kcd_factory h on a.factory_cd = h.factory_cd
                            left join kcd_buyer h1 on left(a.order_cd, 2) = h1.buyer_cd
                            -- order by b.po_cd, a.order_cd
                    ) kkkk
            `;
            var tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr0));
            var tRowCnt = 0;
            if (tRet0.length > 0) tRowCnt = tRet0[0].row_cnt;

            console.log('record count:' + tRowCnt);

            let sqlStr = `
                select
                    top 1000 isnull(b.PO_CD, '') as PO_CD,
                    a.ORDER_CD,
                    LEFT(a.ORDER_CD, 2) as BUYER_CD,
                    h1.BUYER_NAME,
                    a.REF_ORDER_NO,
                    a.STYLE_NAME,
                    a.STYLE_CD,
                    a.ORDER_DATE,
                    a.DUE_DATE,
                    a.MATL_DUE_DATE,
                    isnull(a.ETD, '') as ETD,
                    a.TOT_CNT,
                    a.ADD_CNT,
                    isnull(f.sum_ship_cnt, 0) as SHIP_CNT,
                    a.AVR_PRICE,
                    a.CURR_CD,
                    a.USD_PRICE,
                    isnull(a.FC_PRICE, 0) as FC_PRICE,
                    (
                        case
                            when isnull(f.sum_ship_cnt, 0) = 0 then 0
                            else a.matl_amt / isnull(f.sum_ship_cnt, 0)
                        end
                    ) as C_MATL_AMT,
                    (
                        case
                            when isnull(f.sum_ship_cnt, 0) = 0 then 0
                            else isnull(a.etc_amt, 0) / isnull(f.sum_ship_cnt, 0)
                        end
                    ) as C_ETC_AMT,
                    (
                        isnull(a.usd_price, 0) - isnull(a.fc_price, 0) - case
                            when isnull(f.sum_ship_cnt, 0) = 0 then 0
                            else isnull(a.matl_amt, 0) / isnull(f.sum_ship_cnt, 0)
                        end - case
                            when isnull(f.sum_ship_cnt, 0) = 0 then 0
                            else isnull(a.etc_amt, 0) / isnull(f.sum_ship_cnt, 0)
                        end
                    ) as MARGIN,
                    0 as MARGIN2,
                    (
                        case
                            when isnull(a.usd_price, 0) = 0 then 0
                            else (
                                isnull(a.usd_price, 0) - isnull(a.fc_price, 0) - case
                                    when isnull(f.sum_ship_cnt, 0) = 0 then 0
                                    else isnull(a.matl_amt, 0) / isnull(f.sum_ship_cnt, 0)
                                end - case
                                    when isnull(f.sum_ship_cnt, 0) = 0 then 0
                                    else isnull(a.etc_amt, 0) / isnull(f.sum_ship_cnt, 0)
                                end
                            ) / isnull(a.usd_price, 0)
                        end
                    ) * 100 as MARGIN2,
                    e.cd_name as STATUS_NAME,
                    a.END_STATUS,
                    isnull(a.REMARK, '') as REMARK,
                    a.REG_USER,
                    h.FACTORY_NAME,
                    a.FACTORY_CD,
                    isnull(a.REF_Q_OUTER, '') as REF_Q_OUTER,
                    isnull(a.REF_Q_LINER, '') as REF_Q_LINER,
                    isnull(a.ETC_AMT, 0) as ETC_AMT,
                    isnull(a.MATL_AMT, 0) as MATL_AMT,
                    a.ORDER_TYPE,
                    a.ORDER_STATUS,
                    isnull(a.ORG_DUE_DATE, '') as ORG_DUE_DATE,
                    a.ORDER_FLAG,
                    a.SAMPLE_FLAG,
                    a.MATL_SALE_FLAG,
                    a.FAC_LC_FLAG,
                    a.FAC_TT_FLAG,
                    isnull(a.PI_CD, '') as PI_CD,
                    isnull(a.PRICE_TERM, '') as PRICE_TERM,
                    a.BUYER_TEAM_N
                from
                    (
                        select
                            a1.*,
                            d.STYLE_NAME,
                            isnull(a2.cd_name, '') as BUYER_TEAM_N
                        from
                            ksv_order_mst a1
                            left join kcd_code a2 on a2.cd_code = a1.buyer_team
                            and a2.cd_group = 'buyer_team',
                            kcd_style d
                        where
                            a1.style_cd = d.style_cd
                            AND a1.ORDER_CD like '%${args.data.ORDER_CD}%'
                            AND a1.FACTORY_CD like '%${args.data.FACTORY_CD}%'
                            AND LEFT(a1.ORDER_CD, 2) like '%${args.data.BUYER_CD}%'
                            AND LEFT(a1.ORDER_CD, 2) in (
                                select
                                    buyer_cd
                                from
                                    kcd_buyer
                                where
                                    buyer_team like '%${args.data.BUYER_TEAM}%'
                            )
                            AND a1.REG_USER like '%${args.data.REG_USER}%'
                            AND (
                                d.style_cd like '%${args.data.STYLE_CD}%'
                                or d.style_name like '%${args.data.STYLE_CD}%'
                            ) ${sqlSAMPLE_FLAG} ${sqlREF_ORDER_NO} ${sqlDUE_DATE} ${sqlSTATUS_CD} ${sqlORDER_DATE}
                    ) a ${sqlPO} ${tShipSQL1}
                    left join kcd_code e on a.order_status = e.cd_code
                    and e.cd_group = 'ORDER_STATUS'
                    left join kzz_outsourcing_cost g on a.order_cd = g.order_cd
                    left join kcd_factory h on a.factory_cd = h.factory_cd
                    left join kcd_buyer h1 on left(a.order_cd, 2) = h1.buyer_cd
                order by
                    b.po_cd desc,
                    a.order_cd
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                PO_CD: '',
                ORDER_CD: '',
                REF_ORDER_NO: '',
                STYLE_NAME: '',
                STYLE_CD: '',
                ORDER_DATE: '',
                DUE_DATE: '',
                TOT_CNT: '',
                ADD_CNT: '',
                SHIP_CNT: '',
                AVR_PRICE: '',
                CURR_CD: '',
                USD_PRICE: '',
                FC_PRICE: '',
                MATL_AMT: '',
                ETC_AMT: '',
                MARGIN: '',
                MARGIN2: '',
                STATUS_NAME: '',
                STATUS_CD: '',
                END_STATUS: '',
                REMARK: '',
                REG_USER: '',
                FACTORY_NAME: '',
                FACTORY_CD: '',
            };
            var tRetArray: any[] = [];
            tRet.forEach((col, i) => {
                if (col.REMARK == '') {
                    col.REMARK = ' ';
                    tRetArray.push(col);
                } else {
                    tRetArray.push(col);
                }
            });
            var tWObj = {};
            if (tRowCnt < 1000) tWObj.message = ``;
            else tWObj.message = `전체 ${tRowCnt}건 중 1000건만 표시됨`;
            tWObj.datas = [...tRetArray];
            var tIdx = 0;
            return tWObj;
        },

        mgrQuery_S0204_ORDER_LIST_bak: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tSQL = '';
            var tSQL1 = '';
            var tSQL2 = '';
            var tSQL3 = '';
            var tSQL4 = '';
            /*
                   if (args.KEY1 !== '') {
                       tSQL += `AND KEY1 = '${args.KEY1}' `;
                   }
            */

            var tFlag = 0;
            var tKeys = Object.keys(args.data);
            tKeys.forEach((col, i) => {
                if (
                    args.data[`${col}`] === '' ||
                    args.data[`${col}`] === ' ' ||
                    args.data[`${col}`] === '-'
                ) {
                } else {
                    tFlag = 1;
                }
            });

            if (tFlag === 0) {
                var tRetDate = AFLib.getCurrTime();
                var tYY = parseInt(tRetDate.substring(0, 4));
                var tMon = parseInt(tRetDate.substring(4, 6));

                var tSYY = '';
                var tSMON = '';

                if (tMon > 6) {
                    tSYY = String(tYY);
                    tSMON = String(tMon - 6);
                    if (parseInt(tSMON) < 10) tSMON = `0${tSMON}`;
                    if (parseInt(tMon) < 10) tMon = `0${tMon}`;
                } else {
                    tSYY = String(tYY - 1);
                    tSMON = String(6 + tMon);
                    if (parseInt(tSMON) < 10) tSMON = `0${tSMON}`;
                    if (parseInt(tMon) < 10) tMon = `0${tMon}`;
                }

                var tSDate = `${tSYY}${tSMON}01`;
                var tEDate = `${tYY}${tMon}31`;

                tSQL += `AND a1.ORDER_DATE between '${tSDate}' and '${tEDate}' `;
            }

            if (args.data.ORDER_CD !== '') {
                tSQL += `AND a1.ORDER_CD like '%${args.data.ORDER_CD}%' `;
            }
            if (args.data.FACTORY_CD !== '') {
                tSQL += `AND a1.FACTORY_CD like '%${args.data.FACTORY_CD}%' `;
            }
            if (args.data.IS_DUEDATE === '1') {
                if (
                    args.data.S_DUE_DATE !== '' &&
                    args.data.E_DUE_DATE !== ''
                ) {
                    tSQL += `AND a1.DUE_DATE between '${args.data.S_DUE_DATE}' and '${args.data.E_DUE_DATE}' `;
                } else if (args.data.S_DUE_DATE !== '') {
                    tSQL += `AND a1.DUE_DATE between '${args.data.S_DUE_DATE}' and '99999999' `;
                }
            }
            if (args.data.IS_SHIP_DATE === '1') {
                if (
                    args.data.S_SHIP_DATE !== '' &&
                    args.data.E_SHIP_DATE !== ''
                ) {
                    tSQL1 += `AND f2.SHIP_DATE between '${args.data.S_SHIP_DATE}' and '${args.data.E_SHIP_DATE}' `;
                } else if (args.data.S_SHIP_DATE !== '') {
                    tSQL1 += `AND f2.SHIP_DATE between '${args.data.S_SHIP_DATE}' and '99999999' `;
                }
                tSQL2 += `WHERE f.sum_ship_cnt > 0 `;
            }
            if (args.data.IS_SHIP === '1') {
                tSQL2 += `WHERE f.sum_ship_cnt <= 0 `;
            }
            if (args.data.BUYER_CD !== '') {
                tSQL += `AND LEFT(a1.ORDER_CD, 2)  like '%${args.data.BUYER_CD}%' `;
            }

            if (args.data.PO_CD !== '') {
                tSQL3 += `inner join ksv_po_mem b on a.order_cd = b.order_cd and b.po_seq = 1 AND b.PO_CD like '%${args.data.PO_CD}%' `;
            } else {
                tSQL3 += `left join ksv_po_mem b on a.order_cd = b.order_cd and b.po_seq = 1  `;
            }

            if (args.data.BUYER_TEAM !== '') {
                tSQL += `
                    AND LEFT(a1.ORDER_CD, 2) in (
                        select
                            buyer_cd
                        from
                            kcd_buyer
                        where
                            buyer_team = '${args.data.BUYER_TEAM}'
                    )
                `;
            }
            if (args.data.REG_USER !== '') {
                tSQL += `AND a1.REG_USER  like '%${args.data.REG_USER}%' `;
            }
            if (args.data.REF_ORDER_NO !== '') {
                tSQL += `AND a1.REF_ORDER_NO  like '%${args.data.REF_ORDER_NO}%' `;
            }

            if (args.data.STATUS_CD === 'E1') {
                tSQL += `AND a1.ORDER_STATUS  not in ('4','9') `;
            } else if (args.data.STATUS_CD === 'E2') {
                tSQL += `AND a1.ORDER_STATUS  in ('1','2', '3', '7') `;
            } else if (args.data.STATUS_CD === '777') {
                tSQL += `AND a1.ORDER_STATUS  in ('1','2', '3', '5') `;
            } else if (args.data.STATUS_CD !== '') {
                tSQL += `AND a1.ORDER_STATUS = '${args.data.STATUS_CD}' `;
            }

            if (args.data.STYLE_CD !== '') {
                tSQL += `AND (d.style_cd like '%${args.data.STYLE_CD.split(' ').join('%')}%' or d.style_name like '%${args.data.STYLE_CD.split(' ').join('%')}%') `;
            }

            if (args.data.IS_SAMPLE === '1' && args.data.IS_MAIN !== '1') {
                tSQL += `AND a1.SAMPLE_FLAG = '1' `;
            }
            if (args.data.IS_SAMPLE !== '1' && args.data.IS_MAIN === '1') {
                tSQL += `AND a1.SAMPLE_FLAG <> '1' `;
            }

            let sqlStr = `
                select
                    isnull(b.PO_CD, '') as PO_CD, --1
                    a.ORDER_CD, --2
                    a.REF_ORDER_NO, --3
                    a.STYLE_NAME, --4
                    a.ORDER_DATE, --5
                    a.DUE_DATE, --6
                    a.TOT_CNT, --7
                    a.ADD_CNT, --8
                    isnull(f.sum_ship_cnt, 0) as SHIP_CNT, --9
                    a.AVR_PRICE, --10
                    a.CURR_CD, --11
                    a.USD_PRICE, --12
                    a.FC_PRICE, --13
                    (
                        case
                            when isnull(f.sum_ship_cnt, 0) = 0 then 0
                            else a.matl_amt / isnull(f.sum_ship_cnt, 0)
                        end
                    ) as C_MATL_AMT, --14
                    (
                        case
                            when isnull(f.sum_ship_cnt, 0) = 0 then 0
                            else a.etc_amt / isnull(f.sum_ship_cnt, 0)
                        end
                    ) as C_ETC_AMT, --15
                    (
                        isnull(a.usd_price, 0) - isnull(a.fc_price, 0) - case
                            when isnull(f.sum_ship_cnt, 0) = 0 then 0
                            else isnull(a.matl_amt, 0) / isnull(f.sum_ship_cnt, 0)
                        end - case
                            when isnull(f.sum_ship_cnt, 0) = 0 then 0
                            else isnull(a.etc_amt, 0) / isnull(f.sum_ship_cnt, 0)
                        end
                    ) as MARGIN, --16
                    (
                        case
                            when isnull(a.usd_price, 0) = 0 then 0
                            else (
                                isnull(a.usd_price, 0) - isnull(a.fc_price, 0) - case
                                    when isnull(f.sum_ship_cnt, 0) = 0 then 0
                                    else a.matl_amt / isnull(f.sum_ship_cnt, 0)
                                end - case
                                    when isnull(f.sum_ship_cnt, 0) = 0 then 0
                                    else isnull(a.etc_amt, 0) / isnull(f.sum_ship_cnt, 0)
                                end
                            ) / isnull(a.usd_price, 0)
                        end
                    ) * 100 as MARGIN2, --17
                    e.cd_name as STATUS_NAME, --18
                    a.END_STATUS, --19
                    a.REMARK, --21
                    a.REG_USER, --22
                    h.FACTORY_NAME, --23
                    a.REF_Q_OUTER, --24
                    a.REF_Q_LINER, --25
                    a.ETC_AMT, --26
                    a.MATL_AMT, --27
                    a.ORDER_TYPE, --28
                    a.ORDER_STATUS, --29
                    a.ORG_DUE_DATE, --30
                    a.ORDER_FLAG, --31
                    a.SAMPLE_FLAG, --32
                    a.MATL_SALE_FLAG, --33
                    a.FAC_LC_FLAG, --34
                    a.FAC_TT_FLAG, --35
                    a.FACTORY_CD, --
                    LEFT(a.ORDER_CD, 2) as BUYER_CD, --
                    h1.BUYER_NAME, --
                    a.STYLE_CD, --
                    a.MATL_DUE_DATE --
                from
                    (
                        select
                            a1.*,
                            d.STYLE_NAME
                        from
                            ksv_order_mst a1,
                            kcd_style d
                        where
                            a1.order_type in ('0', '1')
                            and a1.style_cd = d.style_cd
                            -- and a1.REG_USER in (select distinct user_id from kcd_user where company_code = '${tUserInfo.COMPANY_CODE}')
                            ${tSQL}
                            -- order by reg_datetime desc 
                            -- offset 0 rows fetch next 1000 rows only
                    ) a ${tSQL3}
                    left join kcd_code e on a.order_status = e.cd_code
                    and e.cd_group = 'ORDER_STATUS'
                    left join (
                        select
                            f1.order_cd,
                            isnull(sum(f2.ship_cnt), 0) as sum_ship_cnt
                        from
                            (
                                select
                                    a1.*,
                                    d.STYLE_NAME
                                from
                                    ksv_order_mst a1,
                                    kcd_style d
                                where
                                    a1.order_type in ('0', '1')
                                    and a1.style_cd = d.style_cd ${tSQL}
                                    -- order by reg_datetime desc
                                    -- offset 0 rows fetch next 1000 rows only
                            ) f1,
                            ksv_order_ship f2
                        where
                            f1.order_cd = f2.order_cd ${tSQL1}
                            and f2.ship_ptype in ('0', '5')
                        group by
                            f1.order_cd
                    ) f on a.order_cd = f.order_cd
                    left join kzz_outsourcing_cost g on a.order_cd = g.order_cd
                    left join kcd_factory h on a.factory_cd = h.factory_cd
                    left join kcd_buyer h1 on left(a.order_cd, 2) = h1.buyer_cd
                order by
                    a.order_cd
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            console.log(`Order List Count:${tRet.length}`);

            try {
                var tSQL = '';
                var tRetDate = AFLib.getCurrTime();
                var tRetDate1 = tRetDate.substring(0, 8);
                var tUserInfo = AFLib.getUserInfo(contextValue);

                var tIdx = 0;
                var tArray = [];

                var tSumAmtArray = [];

                var tPath0 = '';
                var tCols0 = __dirname.split('/');
                var tFlag0 = 0;
                tCols0.forEach((col, i) => {
                    if (col !== '') {
                        if (col === 'src') {
                            tPath0 += '/upload/excel_template';
                            tFlag0 = 1;
                        }
                        if (tFlag0 === 0) {
                            tPath0 += '/' + col;
                        }
                    }
                });

                var tTemplateExcel = `${tPath0}/ORDER_LIST.xlsx`;

                const wb = new Excel.Workbook();
                await wb.xlsx.readFile(tTemplateExcel);

                var tSheetName = `list`;
                const sheet = wb.getWorksheet(tSheetName);

                var rowIdx = 4;

                sheet.getCell(2, 1).value = tRetDate1;

                tRet.forEach((col, i) => {
                    sheet.getCell(rowIdx + i, 1).value = col.PO_CD;
                    sheet.getCell(rowIdx + i, 2).value = col.ORDER_CD;
                    sheet.getCell(rowIdx + i, 3).value = col.REF_ORDER_NO;
                    sheet.getCell(rowIdx + i, 4).value = col.STYLE_NAME;
                    sheet.getCell(rowIdx + i, 5).value = col.ORDER_DATE;
                    sheet.getCell(rowIdx + i, 6).value = col.DUE_DATE;
                    sheet.getCell(rowIdx + i, 7).value = col.TOT_CNT;
                    sheet.getCell(rowIdx + i, 8).value = col.ADD_CNT;
                    sheet.getCell(rowIdx + i, 9).value = col.SHIP_CNT;
                    sheet.getCell(rowIdx + i, 10).value = col.AVR_PRICE;
                    sheet.getCell(rowIdx + i, 11).value = col.CURR_CD;
                    sheet.getCell(rowIdx + i, 12).value = col.USD_PRICE;
                    sheet.getCell(rowIdx + i, 13).value = col.FC_PRICE;
                    sheet.getCell(rowIdx + i, 14).value = col.C_MATL_AMT;
                    sheet.getCell(rowIdx + i, 15).value = col.C_ETC_AMT;
                    sheet.getCell(rowIdx + i, 16).value = col.MARGIN;
                    sheet.getCell(rowIdx + i, 17).value = col.MARGIN2;
                    sheet.getCell(rowIdx + i, 18).value = col.STATUS_NAME;
                    sheet.getCell(rowIdx + i, 19).value = col.END_STATUS;
                    sheet.getCell(rowIdx + i, 20).value = col.REMARK;
                    sheet.getCell(rowIdx + i, 21).value = col.REG_USER;
                    sheet.getCell(rowIdx + i, 22).value = col.FACTORY_NAME;
                    sheet.getCell(rowIdx + i, 23).value = col.REF_Q_OUTER;
                    sheet.getCell(rowIdx + i, 24).value = col.REF_Q_LINER;

                    for (let colIdx = 1; colIdx <= 24; colIdx++) {
                        const cell = sheet.getCell(rowIdx + i, colIdx);
                        cell.border = {
                            top: {
                                style: 'thin',
                            },
                            left: {
                                style: 'thin',
                            },
                            bottom: {
                                style: 'thin',
                            },
                            right: {
                                style: 'thin',
                            },
                        };
                    }
                });

                var tPath = '';
                var tCols = __dirname.split('/');
                var tFlag = 0;
                tCols.forEach((col, i) => {
                    if (col === 'src') {
                        tPath += '/upload/excel';
                        tFlag = 1;
                    }
                    if (tFlag === 0) {
                        tPath += '/' + col;
                    }
                });

                return await upload(
                    `OrderList-${tUserInfo.USER_ID}-${tRetDate}.xlsx`,
                    wb,
                );
            } catch (error) {
                var tRetArray: any[] = [];
                var tObj = {
                    id: 0,
                    CODE: 'ERROR: ' + error.message,
                };
                tObj.id = 0;
                tObj.CODE = 'ERROR: ' + error.message;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },
    },
};

// 열 번호를 엑셀 열 문자로 변환하는 함수
function getExcelCol(colNum) {
    let col = '';
    while (colNum > 0) {
        let rem = (colNum - 1) % 26;
        col = String.fromCharCode(65 + rem) + col;
        colNum = Math.floor((colNum - 1) / 26);
    }
    return col;
}

export default moduleQuery_S0204_ORDER_LIST_TBL_KSV_ORDER_MST;
