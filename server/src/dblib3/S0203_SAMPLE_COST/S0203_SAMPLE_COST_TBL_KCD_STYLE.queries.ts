// MGR_@@TNAME@@.queries.js

import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
import axios from 'axios';

const moment = require('moment');
const fs = require('fs');
const Excel = require('exceljs');
const { upload } = require('../../../routes/s3');

// export default로 Query 내용 내보내기
const moduleQuery_S0203_SAMPLE_COST_TBL_KCD_STYLE = {
    Query: {
        mgrQuery_S0203_SAMPLE_COST_CODE: async (_, args) => {
            var tWRet = {};

            let tSQL = '';

            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'WORK_TYPE'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_CODE = '';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWRet.WORK_TYPE = tRet;

            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'WORK_KIND'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_CODE = '';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWRet.WORK_KIND = tRet;

            /*
       let sqlStr = `
           SELECT
               *
           FROM
               KSV_ORDER_MST
           WHERE
               FACTORY_CD = 'FC010'
           ORDER BY
               ORDER_CD
               -- offset 0 rows fetch next 500 rows only
       `;
       let tRet  =  await prisma.$queryRaw(Prisma.raw(sqlStr));
       var tObj = {};
       tObj.ORDER_CD = ' ';
       tRet.unshift(tObj);
       tWRet.ORDER_CD = tRet;
*/
            tWRet.ORDER_CD = [];

            var sample_date_s = '20230101';
            var sample_date_e = '20230401';

            // where a.sample_end_date between '${sample_date_s}' and  '${sample_date_e}'

            /*
       var tSQL2 = '';
       let sqlStr = `
           select distinct
               b.BUYER_CD,
               b.BUYER_NAME
           from
               kzz_sample_cost a,
               kcd_buyer b
           where
               a.buyer_cd = b.buyer_cd
               and a.YY in (2022, 2023)
           order by
               b.BUYER_CD
               -- offset 0 rows fetch next 500 rows only
       `;
       let tRet  =  await prisma.$queryRaw(Prisma.raw(sqlStr));
       var tObj = {};
       tObj.BUYER_CD = '';
       tObj.BUYER_NAME = ' ';
       tRet.unshift(tObj);
       tWRet.BUYER_CD = tRet;
*/
            var tSQL2 = '';
            /*
       let sqlStr = `
           select
               b.BUYER_CD,
               b.BUYER_NAME
           from
               (
                   select
                       BUYER_CD,
                       count(*) as t_cnt
                   from
                       kzz_sample_cost
                   where
                       YY in (2022, 2023)
                   group by
                       BUYER_CD
               ) a,
               kcd_buyer b
           where
               a.BUYER_CD = b.BUYER_CD
               -- offset 0 rows fetch next 500 rows only
       `;
*/
            let sqlStr = `
                select
                    BUYER_CD,
                    BUYER_NAME
                from
                    kcd_buyer
                where
                    status_cd = '0'
            `;
            let tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr));
            let tRet = [];
            tRet0.forEach((col, i) => {
                var tObj = { ...col };
                tObj.BUYER_NAME = `(${col.BUYER_CD})${col.BUYER_NAME}`;
                tRet.push(tObj);
            });
            var tObj = {};
            tObj.BUYER_CD = '';
            tObj.BUYER_NAME = ' ';
            tRet.unshift(tObj);
            tWRet.BUYER_CD = tRet;

            var tSQL3 = '';
            let sqlStr = `
                SELECT
                    top 1000 a.STYLE_NAME,
                    a.STYLE_CD
                FROM
                    KCD_STYLE a,
                    kzz_sample_cost b
                WHERE
                    a.STATUS_CD = '0'
                    and a.style_cd = b.style_cd
                    and b.work_type <> '9'
                    and left(b.yy, 4) >= '2022'
                    and b.sample_end_flag in ('2', '0')
                ORDER BY
                    a.STYLE_NAME
                    -- offset 0 rows fetch next 1000 rows only
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.STYLE_CD = '';
            tObj.STYLE_NAME = ' ';
            tRet.unshift(tObj);
            tWRet.STYLE_CD = tRet;

            tSQL = '';
            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'PATT_LOSS'
            `;
            tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_CODE = '';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWRet.PATT_LOSS = tRet;

            tSQL = '';
            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'SEW_LOSS'
            `;
            tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_CODE = '';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWRet.SEW_LOSS = tRet;

            tSQL = '';
            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_USER
                where
                    1 = 1
                    and (
                        user_name like '김혜정%'
                        or user_name like '%박혜영%'
                        or user_name like '%송재영%'
                        or user_name like '%이효순%'
                        or user_name like '%김경선%'
                    )
                    and status_cd = '0'
            `;
            tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.USER_ID = '';
            tObj.USER_NAME = ' ';
            tRet.unshift(tObj);
            tWRet.SEW_USER = tRet;
            tWRet.WORK3D_USER = tRet;

            tSQL = '';
            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_USER
                where
                    user_name like '%정갑진%'
                    or user_name like '%김용환%'
                    or user_name like '%강정석%'
                    or user_name like '%송예은%'
                    or user_name like '%김진주%'
                    or user_name like '%이나현%'
                    -- and status_cd = '0'
            `;
            tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.USER_ID = '';
            tObj.USER_NAME = ' ';
            tRet.unshift(tObj);
            tWRet.PATT_USER = tRet;
            tWRet.PATT3D_USER = tRet;

            tSQL = '';
            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_USER
                where
                    user_name like '%정갑진%'
                    or user_name like '%김용환%'
                    or user_name like '%강정석%'
                    or user_name like '%송예은%'
                    or user_name like '%정상옥%'
                    or user_name like '%정양옥%'
                    -- and status_cd = '0'
            `;
            tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.USER_ID = '';
            tObj.USER_NAME = ' ';
            tRet.unshift(tObj);
            tWRet.CUTTING_USER = tRet;
            tWRet.COMPLETE_USER = tRet;

            tSQL = '';
            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'PATT_COST'
            `;
            tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_CODE = '';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWRet.PATT_COST = tRet;

            tSQL = '';
            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = 'SEW_COST'
            `;
            tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_CODE = '';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWRet.SEW_COST = tRet;

            tSQL = '';
            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = '3DPATT_COST'
            `;
            tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_CODE = '';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWRet.PATT3D_COST = tRet;

            tSQL = '';
            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_CODE
                WHERE
                    CD_GROUP = '3DWORK_COST'
            `;
            tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_CODE = '';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWRet.WORK3D_COST = tRet;

            return tWRet;
        },

        mgrQuery_S0203_SAMPLE_COST_TBL_KCD_STYLE: async (_, args) => {
            var tSQL = '';
            var tCheckSampleEnd = '0';
            var tCheck2 = '0';
            var tStrUser = '';
            var tStrStyle = '';

            var DUE_DATE_SQL = '';
            var SAMPLE_DATE_SQL = '';
            var SAMPLE_END_SQL = '';
            if (args.data.IS_DATE === '1') {
                var tSDate = '20220101';
                var tEDate = '99999999';
                if (args.data.S_DATE !== '') {
                    tSDate = args.data.S_DATE;
                }
                if (args.data.E_DATE !== '') {
                    tEDate = args.data.E_DATE;
                }
                SAMPLE_DATE_SQL = `and a100.sample_end_date between '${tSDate}' and '${tEDate}' `;
                SAMPLE_END_SQL = `and a100.sample_end_flag = '1' `;
            } else {
                SAMPLE_END_SQL = `and a100.sample_end_flag in('2','0') `;
                // DUE_DATE_SQL = `and d.due_date between '${tSDate}' and '${tEDate}' `;
            }

            if (args.data.STYLE_CD !== '') {
                /*
			   tSQL += `
			       and style_cd in (
			           select
			               style_cd
			           from
			               kcd_style
			           where
			               style_name like '%${args.data.STYLE_CD}%'
			       )
			   `;
         */
                /*
			   tSQL += `and (style_cd like '%${args.data.STYLE_CD}%' or style_cd like '%${args.data.STYLE_CD}%') `;
         */
            }
            if (args.data.BUYER_CD !== '') {
                tSQL += `and a100.buyer_cd like '%${args.data.BUYER_CD}%' `;
            }
            if (args.data.ORDER_CD !== '') {
                tSQL += `and a100.order_cd like '%${args.data.ORDER_CD}%' `;
            }
            if (args.data.WORK_TYPE !== '') {
                tSQL += `and a100.work_type = '${args.data.WORK_TYPE}' `;
            }
            if (args.data.PATT_USER !== '') {
                tSQL += `and a100.patt_user = '${args.data.PATT_USER}' `;
            }
            if (args.data.SEW_USER !== '') {
                tSQL += `and a100.sew_user = '${args.data.SEW_USER}' `;
            }

            let sqlStr = `
                select
                    '1' as id,
                    isnull(a.sample_seq, '') as SAMPLE_SEQ,
                    b.BUYER_NAME,
                    isnull(e.STYLE_NAME, '') as STYLE_NAME,
                    isnull(a.ORDER_CD, '') as ORDER_CD,
                    isnull(d.ORG_DUE_DATE, '') as ORG_DUE_DATE,
                    d.DUE_DATE,
                    (
                        case c.cd_name
                            when '외주' then isnull((right(f.cd_name, 2) * 10000 ), 0) + isnull((right(g.cd_name, 2) * a.order_qty * 10000), 0) + a.welding_cost * a.order_qty + a.sub_patt_cost + a.sub_sew_cost + a.sub_welding_cost + isnull((0 * a.repair_qty * 10000), 0) + a.etc_amount
                            when '시간수선(봉제)' then (a.repair_qty * 541)
                            when '수선' then (a.repair_qty * 541)
                            when '외주봉제' then isnull((right(f.cd_name, 2) * 10000), 0) + isnull((right(g.cd_name, 2) * a.order_qty * 10000), 0) + isnull(a.welding_cost * a.order_qty, 0) + isnull(a.sub_patt_cost, 0) + isnull(a.sub_sew_cost, 0) + isnull(a.sub_welding_cost, 0) + a.etc_amount + isnull(cast(l.cd_flag as float) * 10000, 0) + isnull(cast(m.cd_flag as float) * 10000, 0) + isnull(cast(a.color3d_qty as float) * 10000, 0)
                            when '공장봉제' then isnull((right(f.cd_name, 2) * 10000) , 0) + isnull((right(g.cd_name, 2) * a.order_qty * 10000), 0) + isnull(a.welding_cost * a.order_qty, 0) + isnull(a.sub_patt_cost, 0) + isnull(a.sub_sew_cost, 0) + isnull(a.sub_welding_cost, 0) + a.etc_amount + isnull(cast(l.cd_flag as float) * 10000, 0) + isnull(cast(m.cd_flag as float) * 10000, 0) + isnull(cast(a.color3d_qty as float) * 10000, 0)
                            when '개발실봉제' then isnull((right(f.cd_name, 2) * 10000 ), 0) + isnull((right(g.cd_name, 2) * a.order_qty * 10000), 0) + isnull(a.welding_cost * a.order_qty, 0) + isnull(a.sub_patt_cost, 0) + isnull(a.sub_sew_cost, 0) + isnull(a.sub_welding_cost, 0) + a.etc_amount + isnull(cast(l.cd_flag as float) * 10000, 0) + isnull(cast(m.cd_flag as float) * 10000, 0) + isnull(cast(a.color3d_qty as float) * 10000, 0)
                            when '패턴만' then isnull((right(f.cd_name, 2) * 10000 ), 0) + isnull((right(g.cd_name, 2) * a.order_qty * 10000), 0) + isnull(a.welding_cost * a.order_qty, 0) + isnull(a.sub_patt_cost, 0) + isnull(a.sub_sew_cost, 0) + isnull(a.sub_welding_cost, 0) + a.etc_amount + isnull(cast(l.cd_flag as float) * 10000, 0) + isnull(cast(m.cd_flag as float) * 10000, 0) + isnull(cast(a.color3d_qty as float) * 10000, 0)
                            when '소요량계산' then isnull((right(f.cd_name, 2) * 10000 ), 0) + isnull((right(g.cd_name, 2) * a.order_qty * 10000), 0) + isnull(a.welding_cost * a.order_qty, 0) + isnull(a.sub_patt_cost, 0) + isnull(a.sub_sew_cost, 0) + isnull(a.sub_welding_cost, 0) + a.etc_amount + isnull(cast(l.cd_flag as float) * 10000, 0) + isnull(cast(m.cd_flag as float) * 10000, 0) + isnull(cast(a.color3d_qty as float) * 10000, 0)
                            else isnull((right(f.cd_name, 2) * 10000 ), 0) + isnull((right(g.cd_name, 2) * a.order_qty * 10000), 0) + isnull(a.welding_cost * a.order_qty, 0) + isnull(a.sub_patt_cost, 0) + isnull(a.sub_sew_cost, 0) + isnull(a.sub_welding_cost, 0) + isnull((right(c.cd_name, 3) * a.repair_qty * 10000), 0) + a.etc_amount + isnull(cast(l.cd_flag as float) * 10000, 0) + isnull(cast(m.cd_flag as float) * 10000, 0) + isnull(cast(a.color3d_qty as float) * 10000, 0)
                        end
                    ) as TOTAL_COST,
                    isnull(a.PATT_USER, '') as PATT_USER,
                    isnull(right(f.cd_name, 2) * 10000 , 0) as PATT_COST,
                    f.cd_name as PATT_COST_NAME,
                    isnull(right(f.cd_name, 2) * 10000 , 0) as PATT_AMT,
                    isnull(a.ORDER_QTY, '0') as ORDER_QTY,
                    isnull(a.SEW_USER, '') as SEW_USER,
                    isnull(right(g.cd_name, 2) * a.order_qty * 10000, 0) as SEW_COST,
                    g.cd_name as SEW_COST_NAME,
                    isnull(right(g.cd_name, 2) * a.order_qty * 10000, 0) as SEW_AMT,
                    isnull((a.welding_cost * a.order_qty), 0) as WELDING_COST,
                    a.welding_cost * a.order_qty as WELDING_AMT,
                    a.SUB_PATT_COST,
                    a.SUB_SEW_COST,
                    a.SUB_WELDING_COST,
                    a.BUYER_CD,
                    a.STYLE_CD,
                    isnull(c.cd_name, '') AS WORK_TYPE_NAME,
                    isnull(c1.cd_name, '') AS WORK_KIND_NAME,
                    a.REPAIR_QTY,
                    (
                        case c.cd_name
                            when '외주' then '0'
                            when '시간수선(봉제)' then (a.repair_qty * 541)
                            when '수선' then (a.repair_qty * 541)
                            when '외주봉제' then '0'
                            when '공장봉제' then '0'
                            when '개발실봉제' then '0'
                            when '패턴만' then '0'
                            when '소요량계산' then '0'
                            when '' then '0'
                            else (right(c.cd_name, 3) * a.repair_qty * 10000)
                        end
                    ) as REPAIR_COST,
                    isnull(a.REMARK, '') as REMARK,
                    a.ETC_AMOUNT,
                    a.WORK_TYPE as SAMPLE_TYPE,
                    isnull(a.SAMPLE_END_FLAG, '') as SAMPLE_END_FLAG,
                    isnull(a.SAMPLE_END_DATE, '') as SAMPLE_END_DATE,
                    d.ORDER_STATUS as END_FLAG,
                    d.END_DATETIME as END_DATE,
                    a.REG_USER,
                    a.REG_DATETIME,
                    a.CONFIRM_FLAG,
                    a.SAMPLE_CD,
                    a.CUTTING_USER as PATT_GRADE,
                    a.COMPLETE_USER as SEW_GRADE,
                    (
                        case a.order_qty
                            when 0 then 0
                            else (
                                isnull((right(f.cd_name, 2) * 10000), 0) + isnull((right(g.cd_flag, 2) * 10000), 0) + a.welding_cost * a.order_qty + a.sub_patt_cost / a.order_qty + a.sub_sew_cost / a.order_qty + a.sub_welding_cost / a.order_qty
                            )
                        end
                    ) as FC_PRICE,
                    i.cd_name as PATT_LOSS_NAME,
                    isnull(a.PATT_LOSS, '') as PATT_LOSS,
                    isnull(a.PATT_LOSS_TIME, '') as PATT_LOSS_TIME,
                    j.cd_name as SEW_LOSS_NAME,
                    isnull(a.SEW_LOSS, '') as SEW_LOSS,
                    isnull(a.SEW_LOSS_TIME, '') as SEW_LOSS_TIME,
                    isnull(a.PATT_REMARK, '') as PATT_REMARK,
                    isnull(a.SEW_REMARK, '') as SEW_REMARK,
                    f.cd_name as PATT,
                    g.cd_name as SEW,
                    isnull(a.WELDING_COST, '0') as WELDING,
                    isnull(a.PATT_FLAG, '') as PATT_FLAG,
                    isnull(a.SEW_FLAG, '') as SEW_FLAG,
                    isnull(a.WELDING_FLAG, '') as WELDING_FLAG,
                    isnull(a.PATT3D_USER, '') as PATT3D_USER,
                    isnull(cast(l.cd_flag as float) * 10000, 0) as PATT3D_COST,
                    isnull(cast(l.cd_flag as float) * 10000, 0) as PATT3D_AMT,
                    isnull(a.WORK3D_USER, '') as WORK3D_USER,
                    isnull(cast(m.cd_flag as float) * 10000, 0) as WORK3D_COST,
                    m.cd_name as WORK3D_COST_NAME,
                    isnull(cast(m.cd_flag as float) * 10000, 0) as WORK3D_AMT,
                    isnull(cast(m.cd_flag as float) * 10000, 0),
                    isnull(cast(a.color3d_qty as float) * 10000, 0) as COLOR3D_COST,
                    l.cd_name as PATT3D,
                    m.cd_name as WORK3D,
                    isnull(a.COLOR3D_QTY, '0') as COLOR3D_QTY,
                    isnull(cast(a.color3d_qty as float) * 10000, 0) as COLOR3D_AMT,
                    isnull(a.PATT_COST, '') as PATT_COST_CODE,
                    isnull(a.SEW_COST, '') as SEW_COST_CODE,
                    isnull(a.PATT_LOSS, '') as PATT_LOSS_CODE,
                    isnull(a.SEW_LOSS, '') as SEW_LOSS_CODE,
                    isnull(a.PATT3D_COST, '') as PATT3D_COST_CODE,
                    isnull(a.WORK3D_COST, '') as WORK3D_COST_CODE,
                    isnull(a.CUTTING_USER, '') as CUTTING_USER,
                    isnull(a.COMPLETE_USER, '') as COMPLETE_USER,
                    isnull(a.WORK_TYPE, '') as WORK_TYPE,
                    isnull(a.WORK_KIND, '') as WORK_KIND
                    -- a.STYLE_CD, 
                    -- '0' as TMP_WORK_TYPE,
                    -- isnull(a.CUTTING_USER, '') as CUTTING_USER,
                    -- isnull(a.COMPLETE_USER, '') as COMPLETE_USER,
                    -- (isnull((right(f.cd_name,2)*10000),0)+isnull((right(g.cd_name,2)*10000),0)+ a.welding_cost*a.order_qty+a.sub_patt_cost/a.order_qty+a.sub_sew_cost/a.order_qty+ a.sub_welding_cost/a.order_qty) AS PATT3D_AMT2, 
                    -- a.SAMPLE_CD, 
                    -- d.MATL_DUE_DATE
                from
                    (
                        select
                            a100.*
                        from
                            kzz_sample_cost a100,
                            kcd_style a101
                        where
                            a100.work_type <> '9'
                            -- and  order_qty > 0
                            -- and yy in ('2022', '2023', '2024', '2025')
                            and (
                                a101.style_cd like '%${args.data.STYLE_CD}%'
                                or a101.style_name like '%${args.data.STYLE_CD}%'
                            )
                            and left(a100.yy, 4) >= '2022'
                            and a100.style_cd = a101.style_cd ${SAMPLE_DATE_SQL} ${SAMPLE_END_SQL} ${tSQL}
                    ) a
                    LEFT JOIN kcd_buyer b on a.buyer_cd = b.buyer_cd
                    LEFT JOIN kcd_code c on a.work_type = c.cd_code
                    and c.cd_group = 'WORK_TYPE'
                    LEFT JOIN kcd_code c1 on a.work_kind = c1.cd_code
                    and c1.cd_group = 'WORK_KIND'
                    LEFT JOIN kcd_style e on a.style_cd = e.style_cd
                    LEFT JOIN kcd_code f on a.patt_cost = f.cd_code
                    and f.cd_group = 'PATT_COST'
                    LEFT JOIN kcd_code g on a.sew_cost = g.cd_code
                    and g.cd_group = 'SEW_COST'
                    LEFT JOIN kcd_code i on a.patt_loss = i.cd_code
                    and i.cd_group = 'PATT_LOSS'
                    LEFT JOIN kcd_code j on a.sew_loss = j.cd_code
                    and j.cd_group = 'SEW_LOSS'
                    LEFT JOIN kcd_code l on a.patt3d_cost = l.cd_code
                    and l.cd_group = '3DPATT_COST'
                    LEFT JOIN kcd_code m on a.work3d_cost = m.cd_code
                    and m.cd_group = '3DWORK_COST'
                    left join ksv_order_mst d on a.order_cd = d.order_cd ${DUE_DATE_SQL}
                    -- and  d.factory_cd = 'FC010'
                    -- order by a.reg_datetime desc
                order by
                    b.buyer_name,
                    a.order_cd
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetArray = [];
            tRet.forEach((col, i) => {
                var tObj = { ...col };
                tObj.id = i + 1;
                if (tObj.SAMPLE_END_FLAG !== '1') tObj.SAMPLE_END_FLAG_N = '';
                else tObj.SAMPLE_END_FLAG_N = 'END';

                if (tObj.WORK_KIND === '') {
                    if (tObj.WORK_TYPE === '9') tObj.WORK_KIND = '1';
                    if (tObj.WORK_TYPE === '0') tObj.WORK_KIND = '3';
                    if (
                        tObj.WORK_TYPE === '1' ||
                        tObj.WORK_TYPE === '2' ||
                        tObj.WORK_TYPE === '3' ||
                        tObj.WORK_TYPE === '4'
                    )
                        tObj.WORK_KIND = '6';
                }

                tRetArray.push(tObj);
            });
            return tRetArray;
        },

        mgrQuery_S0203_KCD_STYLE_BUYER_CD: async (_, args) => {
            var tSQL = '';
            var tCheckSampleEnd = '0';
            var tCheck2 = '0';
            var tStrUser = '';
            var tStrStyle = '';

            let sqlStr = `
                select
                    STYLE_CD,
                    STYLE_NAME
                from
                    kcd_style
                where
                    buyer_cd = '${args.data.BUYER_CD}'
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetArray = [];
            tRet.forEach((col, i) => {
                var tObj = { ...col };
                tRetArray.push(tObj);
            });
            var tObj = {};
            tObj.STYLE_NAME = ' ';
            tObj.STYLE_CD = '';
            tRetArray.unshift(tObj);
            return tRetArray;
        },

        mgrQuery_S0203_REPORT_1: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);
            var tYY = `${tRetDate.substring(2, 4)}`;

            var tSQL = '';
            var tCheckSampleEnd = '0';
            var tCheck2 = '0';
            var tStrUser = '';
            var tStrStyle = '';

            var DUE_DATE_SQL = '';
            var SAMPLE_DATE_SQL = '';
            var SAMPLE_END_SQL = '';
            var tSDate = '';
            var tEDate = '';
            if (args.data.S_DATE === '')
                tSDate = `${tRetDate1.substring(0, 6)}01`;
            if (args.data.E_DATE === '')
                tEDate = `${tRetDate1.substring(0, 6)}31`;
            if (args.data.IS_DATE === '1') {
                if (args.data.S_DATE !== '') {
                    tSDate = args.data.S_DATE;
                }
                if (args.data.E_DATE !== '') {
                    tEDate = args.data.E_DATE;
                }
                SAMPLE_DATE_SQL = `and sample_end_date between '${tSDate}' and '${tEDate}' `;
                SAMPLE_END_SQL = `and sample_end_flag = '1' `;
            } else {
                SAMPLE_END_SQL = `and sample_end_flag in('2','0') `;
                // DUE_DATE_SQL = `and d.due_date between '${tSDate}' and '${tEDate}' `;
            }

            if (args.data.STYLE_CD !== '') {
                /*
			   tSQL += `
			       and style_cd in (
			           select
			               style_cd
			           from
			               kcd_style
			           where
			               style_name like '%${args.data.STYLE_CD}%'
			       )
			   `;
         */
                tSQL += `and style_cd like '%${args.data.STYLE_CD}%' `;
            }
            if (args.data.BUYER_CD !== '') {
                tSQL += `and buyer_cd like '%${args.data.BUYER_CD}%' `;
            }
            if (args.data.ORDER_CD !== '') {
                tSQL += `and order_cd like '%${args.data.ORDER_CD}%' `;
            }
            if (args.data.WORK_TYPE !== '') {
                tSQL += `and work_type = '${args.data.WORK_TYPE}' `;
            }
            if (args.data.PATT_USER !== '') {
                tSQL += `and patt_user = '${args.data.PATT_USER}' `;
            }
            if (args.data.SEW_USER !== '') {
                tSQL += `and sew_user = '${args.data.SEW_USER}' `;
            }

            let sqlStr = `
                select
                    '1' as id,
                    isnull(a.sample_seq, '') as SAMPLE_SEQ,
                    b.BUYER_NAME,
                    isnull(e.STYLE_NAME, '') as STYLE_NAME,
                    isnull(a.ORDER_CD, '') as ORDER_CD,
                    isnull(d.ORG_DUE_DATE, '') as ORG_DUE_DATE,
                    d.DUE_DATE,
                    (
                        case c.cd_name
                            when '외주' then isnull((right(f.cd_name, 2) * 10000), 0) + isnull((right(g.cd_name, 2) * a.order_qty * 10000), 0) + a.welding_cost * a.order_qty + a.sub_patt_cost + a.sub_sew_cost + a.sub_welding_cost + isnull((0 * a.repair_qty * 10000), 0) + a.etc_amount
                            when '시간수선(봉제)' then (a.repair_qty * 541)
                            when '수선' then (a.repair_qty * 541)
                            when '외주봉제' then isnull((right(f.cd_name, 2) * 10000), 0) + isnull((right(g.cd_name, 2) * a.order_qty * 10000), 0) + isnull(a.welding_cost * a.order_qty, 0) + isnull(a.sub_patt_cost, 0) + isnull(a.sub_sew_cost, 0) + isnull(a.sub_welding_cost, 0) + a.etc_amount + isnull(cast(l.cd_flag as float) * 10000, 0) + isnull(cast(m.cd_flag as float) * 10000, 0) + isnull(cast(a.color3d_qty as float) * 10000, 0)
                            when '공장봉제' then isnull((right(f.cd_name, 2) * 10000), 0) + isnull((right(g.cd_name, 2) * a.order_qty * 10000), 0) + isnull(a.welding_cost * a.order_qty, 0) + isnull(a.sub_patt_cost, 0) + isnull(a.sub_sew_cost, 0) + isnull(a.sub_welding_cost, 0) + a.etc_amount + isnull(cast(l.cd_flag as float) * 10000, 0) + isnull(cast(m.cd_flag as float) * 10000, 0) + isnull(cast(a.color3d_qty as float) * 10000, 0)
                            when '개발실봉제' then isnull((right(f.cd_name, 2) * 10000), 0) + isnull((right(g.cd_name, 2) * a.order_qty * 10000), 0) + isnull(a.welding_cost * a.order_qty, 0) + isnull(a.sub_patt_cost, 0) + isnull(a.sub_sew_cost, 0) + isnull(a.sub_welding_cost, 0) + a.etc_amount + isnull(cast(l.cd_flag as float) * 10000, 0) + isnull(cast(m.cd_flag as float) * 10000, 0) + isnull(cast(a.color3d_qty as float) * 10000, 0)
                            when '패턴만' then isnull((right(f.cd_name, 2) * 10000), 0) + isnull((right(g.cd_name, 2) * a.order_qty * 10000), 0) + isnull(a.welding_cost * a.order_qty, 0) + isnull(a.sub_patt_cost, 0) + isnull(a.sub_sew_cost, 0) + isnull(a.sub_welding_cost, 0) + a.etc_amount + isnull(cast(l.cd_flag as float) * 10000, 0) + isnull(cast(m.cd_flag as float) * 10000, 0) + isnull(cast(a.color3d_qty as float) * 10000, 0)
                            when '소요량계산' then isnull((right(f.cd_name, 2) * 10000), 0) + isnull((right(g.cd_name, 2) * a.order_qty * 10000), 0) + isnull(a.welding_cost * a.order_qty, 0) + isnull(a.sub_patt_cost, 0) + isnull(a.sub_sew_cost, 0) + isnull(a.sub_welding_cost, 0) + a.etc_amount + isnull(cast(l.cd_flag as float) * 10000, 0) + isnull(cast(m.cd_flag as float) * 10000, 0) + isnull(cast(a.color3d_qty as float) * 10000, 0)
                            else isnull((right(f.cd_name, 2) * 10000), 0) + isnull((right(g.cd_name, 2) * a.order_qty * 10000), 0) + isnull(a.welding_cost * a.order_qty, 0) + isnull(a.sub_patt_cost, 0) + isnull(a.sub_sew_cost, 0) + isnull(a.sub_welding_cost, 0) + isnull((right(c.cd_name, 3) * a.repair_qty * 10000), 0) + a.etc_amount + isnull(cast(l.cd_flag as float) * 10000, 0) + isnull(cast(m.cd_flag as float) * 10000, 0) + isnull(cast(a.color3d_qty as float) * 10000, 0)
                        end
                    ) as TOTAL_COST,
                    isnull(a.PATT_USER, '') as PATT_USER,
                    isnull((right(f.cd_name, 2) * 10000), 0) as PATT_COST,
                    f.cd_name as PATT_COST_NAME,
                    isnull(right(f.cd_name, 2) * 10000, 0) as PATT_AMT,
                    isnull(d.TOT_CNT, a.ORDER_QTY) as ORDER_QTY,
                    isnull(a.SEW_USER, '') as SEW_USER,
                    isnull((right(g.cd_name, 2) * a.order_qty * 10000), 0) as SEW_COST,
                    g.cd_name as SEW_COST_NAME,
                    isnull(right(g.cd_name, 2) * a.order_qty * 10000, 0) as SEW_AMT,
                    isnull((a.welding_cost * a.order_qty), 0) as WELDING_COST,
                    a.welding_cost * a.order_qty as WELDING_AMT,
                    a.SUB_PATT_COST,
                    a.SUB_SEW_COST,
                    a.SUB_WELDING_COST,
                    a.BUYER_CD,
                    a.STYLE_CD,
                    isnull(c.cd_name, '') AS WORK_TYPE_NAME,
                    a.REPAIR_QTY,
                    (
                        case c.cd_name
                            when '외주' then '0'
                            when '시간수선(봉제)' then (a.repair_qty * 541)
                            when '수선' then (a.repair_qty * 541)
                            when '외주봉제' then '0'
                            when '공장봉제' then '0'
                            when '개발실봉제' then '0'
                            when '패턴만' then '0'
                            when '소요량계산' then '0'
                            when '' then '0'
                            else (right(c.cd_name, 3) * a.repair_qty * 10000)
                        end
                    ) as REPAIR_COST,
                    isnull(a.REMARK, '') as REMARK,
                    a.ETC_AMOUNT,
                    a.WORK_TYPE as SAMPLE_TYPE,
                    isnull(a.SAMPLE_END_FLAG, '') as SAMPLE_END_FLAG,
                    isnull(a.SAMPLE_END_DATE, '') as SAMPLE_END_DATE,
                    d.ORDER_STATUS as END_FLAG,
                    d.END_DATETIME as END_DATE,
                    a.REG_USER,
                    a.REG_DATETIME,
                    a.CONFIRM_FLAG,
                    a.SAMPLE_CD,
                    a.CUTTING_USER as PATT_GRADE,
                    a.COMPLETE_USER as SEW_GRADE,
                    (
                        case a.order_qty
                            when 0 then 0
                            else (
                                isnull((right(f.cd_name, 2) * 10000), 0) + isnull((right(g.cd_flag, 2) * 10000), 0) + a.welding_cost * a.order_qty + a.sub_patt_cost / a.order_qty + a.sub_sew_cost / a.order_qty + a.sub_welding_cost / a.order_qty
                            )
                        end
                    ) as FC_PRICE,
                    i.cd_name as PATT_LOSS_NAME,
                    isnull(a.PATT_LOSS, '') as PATT_LOSS,
                    isnull(a.PATT_LOSS_TIME, '') as PATT_LOSS_TIME,
                    j.cd_name as SEW_LOSS_NAME,
                    isnull(a.SEW_LOSS, '') as SEW_LOSS,
                    isnull(a.SEW_LOSS_TIME, '') as SEW_LOSS_TIME,
                    isnull(a.PATT_REMARK, '') as PATT_REMARK,
                    isnull(a.SEW_REMARK, '') as SEW_REMARK,
                    f.cd_name as PATT,
                    g.cd_name as SEW,
                    isnull(a.WELDING_COST, '0') as WELDING,
                    isnull(a.PATT_FLAG, '') as PATT_FLAG,
                    isnull(a.SEW_FLAG, '') as SEW_FLAG,
                    isnull(a.WELDING_FLAG, '') as WELDING_FLAG,
                    isnull(a.PATT3D_USER, '') as PATT3D_USER,
                    isnull(cast(l.cd_flag as float) * 10000, 0) as PATT3D_COST,
                    isnull(cast(l.cd_flag as float) * 10000, 0) as PATT3D_AMT,
                    isnull(a.WORK3D_USER, '') as WORK3D_USER,
                    isnull(cast(m.cd_flag as float) * 10000, 0) as WORK3D_COST,
                    m.cd_name as WORK3D_COST_NAME,
                    isnull(cast(m.cd_flag as float) * 10000, 0) as WORK3D_AMT,
                    isnull(cast(m.cd_flag as float) * 10000, 0),
                    isnull(cast(a.color3d_qty as float) * 10000, 0) as COLOR3D_COST,
                    l.cd_name as PATT3D,
                    m.cd_name as WORK3D,
                    isnull(a.COLOR3D_QTY, '0') as COLOR3D_QTY,
                    isnull(cast(a.color3d_qty as float) * 10000, 0) as COLOR3D_AMT,
                    isnull(a.PATT_COST, '') as PATT_COST_CODE,
                    isnull(a.SEW_COST, '') as SEW_COST_CODE,
                    isnull(a.PATT_LOSS, '') as PATT_LOSS_CODE,
                    isnull(a.SEW_LOSS, '') as SEW_LOSS_CODE,
                    isnull(a.PATT3D_COST, '') as PATT3D_COST_CODE,
                    isnull(a.WORK3D_COST, '') as WORK3D_COST_CODE,
                    isnull(a.CUTTING_USER, '') as CUTTING_USER,
                    isnull(a.COMPLETE_USER, '') as COMPLETE_USER,
                    isnull(a.WORK_TYPE, '') as WORK_TYPE
                    -- a.STYLE_CD, 
                    -- '0' as TMP_WORK_TYPE,
                    -- isnull(a.CUTTING_USER, '') as CUTTING_USER,
                    -- isnull(a.COMPLETE_USER, '') as COMPLETE_USER,
                    -- (isnull((right(f.cd_name,2)*10000),0)+isnull((right(g.cd_name,2)*10000),0)+ a.welding_cost*a.order_qty+a.sub_patt_cost/a.order_qty+a.sub_sew_cost/a.order_qty+ a.sub_welding_cost/a.order_qty) AS PATT3D_AMT2, 
                    -- a.SAMPLE_CD, 
                    -- d.MATL_DUE_DATE
                from
                    (
                        select
                            *
                        from
                            kzz_sample_cost
                        where
                            work_type <> '9'
                            -- and yy in ('2022', '2023', '2024', '2025')
                            and left(yy, 4) >= '2022' ${SAMPLE_DATE_SQL} ${SAMPLE_END_SQL} ${tSQL}
                    ) a
                    LEFT JOIN kcd_buyer b on a.buyer_cd = b.buyer_cd
                    LEFT JOIN kcd_code c on a.work_type = c.cd_code
                    and c.cd_group = 'WORK_TYPE'
                    LEFT JOIN kcd_style e on a.style_cd = e.style_cd
                    LEFT JOIN kcd_code f on a.patt_cost = f.cd_code
                    and f.cd_group = 'PATT_COST'
                    LEFT JOIN kcd_code g on a.sew_cost = g.cd_code
                    and g.cd_group = 'SEW_COST'
                    LEFT JOIN kcd_code i on a.patt_loss = i.cd_code
                    and i.cd_group = 'PATT_LOSS'
                    LEFT JOIN kcd_code j on a.sew_loss = j.cd_code
                    and j.cd_group = 'SEW_LOSS'
                    LEFT JOIN kcd_code l on a.patt3d_cost = l.cd_code
                    and l.cd_group = '3DPATT_COST'
                    LEFT JOIN kcd_code m on a.work3d_cost = m.cd_code
                    and m.cd_group = '3DWORK_COST'
                    left join ksv_order_mst d on a.order_cd = d.order_cd ${DUE_DATE_SQL}
                    -- and  d.factory_cd = 'FC010'
                    -- order by a.reg_datetime desc
                order by
                    b.buyer_name,
                    a.order_cd
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            /* 팀, Buyer, 매출수량, 매출금액(A), 임가공비(B), 자재비(C), 정상손익(D=A-B-C), 정상손익률 (D/A), 
         자재비(E), 실제손익(F=A-B-E), 실제손익률 (F/A), 기타비용(G), 
         최종손익(H=F-G), 최종손이귤 (H/A), E-C 
*/

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

                var tTemplateExcel = `${tPath0}/SampleCost.xlsx`;

                const wb = new Excel.Workbook();
                await wb.xlsx.readFile(tTemplateExcel);

                var tSheetName = `Sheet1`;
                const sheet = wb.getWorksheet(tSheetName);

                var tRowIdx = 3;

                sheet.getCell(2, 1).value = '외주구분';
                sheet.getCell(2, 2).value = 'Buyer';
                sheet.getCell(2, 3).value = 'Style';
                sheet.getCell(2, 4).value = 'Order#';
                sheet.getCell(2, 5).value = 'Org Due Date';
                sheet.getCell(2, 6).value = 'Due Date';
                sheet.getCell(2, 7).value = '';
                sheet.getCell(2, 8).value = 'Total Cost';
                sheet.getCell(2, 9).value = 'Patt User';
                sheet.getCell(2, 10).value = 'Patt Cost';
                sheet.getCell(2, 11).value = 'Order Qty';
                sheet.getCell(2, 12).value = 'Sew User';
                sheet.getCell(2, 13).value = 'Sew Cost';
                sheet.getCell(2, 14).value = 'Welding Cost';
                sheet.getCell(2, 15).value = 'Sub Patt Cost';
                sheet.getCell(2, 16).value = 'Sub Sew Cost';
                sheet.getCell(2, 17).value = 'Sub Welding Cost';
                sheet.getCell(2, 18).value = 'Buyer#';
                sheet.getCell(2, 19).value = 'Work Type';
                sheet.getCell(2, 20).value = 'Repair Qty';
                sheet.getCell(2, 21).value = 'Repair Cost';
                sheet.getCell(2, 22).value = 'Remark';
                sheet.getCell(2, 23).value = 'Etc Amount';
                sheet.getCell(2, 24).value = 'Sample Type';
                sheet.getCell(2, 25).value = 'Sample End Flag';
                sheet.getCell(2, 26).value = 'Patt Grade';
                sheet.getCell(2, 27).value = 'Sew Grade';
                sheet.getCell(2, 28).value = 'Patt Loss';
                sheet.getCell(2, 29).value = 'Patt Loss Time';
                sheet.getCell(2, 30).value = 'Sew Loss';
                sheet.getCell(2, 31).value = 'Sew Loss Time';
                sheet.getCell(2, 32).value = 'Patt Remark';
                sheet.getCell(2, 33).value = 'Sew Remark';
                sheet.getCell(2, 34).value = 'Sample End Date';
                sheet.getCell(2, 35).value = 'Patt3D User';
                sheet.getCell(2, 36).value = 'Patt3D Cost';
                sheet.getCell(2, 37).value = 'Work3D User';
                sheet.getCell(2, 38).value = 'Work3D Cost';
                sheet.getCell(2, 39).value = 'Color3D Qty';
                sheet.getCell(2, 40).value = 'Patt';
                sheet.getCell(2, 41).value = 'Sew';
                sheet.getCell(2, 42).value = 'Welding';

                tRet.forEach((col, i) => {
                    sheet.getCell(i + 3, 1).value = col.SAMPLE_SEQ;
                    sheet.getCell(i + 3, 2).value = col.BUYER_NAME;
                    sheet.getCell(i + 3, 3).value = col.STYLE_NAME;
                    sheet.getCell(i + 3, 4).value = col.ORDER_CD;
                    sheet.getCell(i + 3, 5).value = col.ORG_DUE_DATE;
                    sheet.getCell(i + 3, 6).value = col.DUE_DATE;
                    sheet.getCell(i + 3, 7).value = '';
                    sheet.getCell(i + 3, 8).value = col.TOTAL_COST;
                    sheet.getCell(i + 3, 9).value = col.PATT_USER;
                    sheet.getCell(i + 3, 10).value = col.PATT_COST;
                    sheet.getCell(i + 3, 11).value = col.ORDER_QTY;
                    sheet.getCell(i + 3, 12).value = col.SEW_USER;
                    sheet.getCell(i + 3, 13).value = col.SEW_COST;
                    sheet.getCell(i + 3, 14).value = col.WELDING_COST;
                    sheet.getCell(i + 3, 15).value = col.SUB_PATT_COST;
                    sheet.getCell(i + 3, 16).value = col.SUB_SEW_COST;
                    sheet.getCell(i + 3, 17).value = col.SUB_WELDING_COST;
                    sheet.getCell(i + 3, 18).value = col.BUYER_CD;
                    sheet.getCell(i + 3, 19).value = col.WORK_TYPE_NAME;
                    sheet.getCell(i + 3, 20).value = col.REPAIR_QTY;
                    sheet.getCell(i + 3, 21).value = col.REPAIR_COST;
                    sheet.getCell(i + 3, 22).value = col.REMARK;
                    sheet.getCell(i + 3, 23).value = col.ETC_AMOUNT;
                    sheet.getCell(i + 3, 24).value = col.SAMPLE_TYPE;
                    sheet.getCell(i + 3, 25).value = col.SAMPLE_END_FLAG;
                    sheet.getCell(i + 3, 26).value = col.SAMPLE_END_DATE;
                    sheet.getCell(i + 3, 27).value = col.END_FLAG;
                    sheet.getCell(i + 3, 28).value = col.END_DATE;
                    sheet.getCell(i + 3, 29).value = col.REG_USER;
                    sheet.getCell(i + 3, 30).value = col.REG_DATETIME;
                    sheet.getCell(i + 3, 31).value = col.CONFIRM_FLAG;
                    sheet.getCell(i + 3, 32).value = col.SAMPLE_CD;
                    sheet.getCell(i + 3, 33).value = col.PATT_GRADE;
                    sheet.getCell(i + 3, 34).value = col.SEW_GRADE;
                    sheet.getCell(i + 3, 35).value = col.FC_PRICE;
                    sheet.getCell(i + 3, 36).value = col.PATT_LOSS;
                    sheet.getCell(i + 3, 37).value = col.PATT_LOSS_TIME;
                    sheet.getCell(i + 3, 38).value = col.SEW_LOSS;
                    sheet.getCell(i + 3, 39).value = col.SEW_LOSS_TIME;

                    sheet.getCell(i + 3, 26).value = col.PATT_GRADE;
                    sheet.getCell(i + 3, 27).value = col.SEW_GRADE;
                    sheet.getCell(i + 3, 28).value = col.PATT_LOSS;
                    sheet.getCell(i + 3, 29).value = col.PATT_LOSS_TIME;
                    sheet.getCell(i + 3, 30).value = col.SEW_LOSS;
                    sheet.getCell(i + 3, 31).value = col.SEW_LOSS_TIME;
                    sheet.getCell(i + 3, 32).value = col.PATT_REMARK;
                    sheet.getCell(i + 3, 33).value = col.SEW_REMARK;
                    sheet.getCell(i + 3, 34).value = col.SAMPLE_END_DATE;
                    sheet.getCell(i + 3, 35).value = col.PATT3D_USER;
                    sheet.getCell(i + 3, 36).value = col.PATT3D_COST;
                    sheet.getCell(i + 3, 37).value = col.WORK3D_USER;
                    sheet.getCell(i + 3, 38).value = col.WORK3D_COST;
                    sheet.getCell(i + 3, 39).value = col.COLOR3D_QTY;
                    sheet.getCell(i + 3, 40).value = col.PATT;
                    sheet.getCell(i + 3, 41).value = col.SEW;
                    sheet.getCell(i + 3, 42).value = col.WELDING;
                    tRowIdx += 1;

                    /*
             sheet.getCell(i+3,26).value = col.PATT_GRADE;
             sheet.getCell(i+3,27).value = col.SEW_GRADE;
             sheet.getCell(i+3,28).value = col.PATT_LOSS_NAME;
             sheet.getCell(i+3,29).value = col.PATT_LOSS_TIME;
             sheet.getCell(i+3,30).value = col.SEW_LOSS_NAME;
             sheet.getCell(i+3,31).value = col.SEW_LOSS_TIME;
             sheet.getCell(i+3,32).value = col.PATT_REMARK;
             sheet.getCell(i+3,33).value = col.SEW_REMARK;
             sheet.getCell(i+3,34).value = col.SAMPLE_END_DATE;
             sheet.getCell(i+3,35).value = col.PATT3D_USER;
             sheet.getCell(i+3,36).value = col.PATT3D_COST;
             sheet.getCell(i+3,37).value = col.WORK3D_USER;
             sheet.getCell(i+3,38).value = col.WORK3D_COST;
             sheet.getCell(i+3,39).value = col.COLOR3D_QTY;
             sheet.getCell(i+3,40).value = col.PATT;
             sheet.getCell(i+3,41).value = col.SEW;
             sheet.getCell(i+3,42).value = col.WELDING;
*/
                });

                sheet.getCell(1, 1).value = 'SampleCost';
                sheet.getCell(2, 9).value = tRetDate1;

                // Sheet 변경
                tSheetName = `Sheet2`;
                sheet = wb.getWorksheet(tSheetName);

                tRowIdx = 2;

                var tUser1 = [
                    'yhkim',
                    'kjjeong',
                    'kang',
                    'yeeun',
                    'kyshim',
                    'hjkim',
                    'hypark',
                    'yjjang',
                    'ghpark',
                    'bsoh',
                ];
                var tUser2 = [
                    'yhkim',
                    'kjjeong',
                    'kang',
                    'yeeun',
                    'kyshim',
                    'hjkim',
                    'hypark',
                    'yjjang',
                    'ghpark',
                    'yojeong',
                    'bsoh',
                ];
                var tUser3 = ['hjkim', 'hypark', 'ghpark', 'bsoh'];

                sheet.getCell(1, 1).value = 'SampleCost Total';
                sheet.getCell(1, 10).value = tSDate;

                sheet.getCell(2, 2).value = '패턴';
                sheet.getCell(2, 6).value = '봉제';
                sheet.getCell(2, 12).value = '월딩';
                sheet.getCell(2, 16).value = '수선';
                sheet.getCell(2, 26).value = '인터럽션 타입';
                tRowIdx += 1;

                var tUserArray = [];
                var tObj = {};

                sheet.getCell(tRowIdx, 1).value = 'BUYER';
                sheet.getCell(tRowIdx, 2).value = '김용환'; // Pattern
                tObj = {};
                tObj.seq = 2;
                tObj.kind = 'PATT';
                tObj.user = '김용환';
                tUserArray.push(tObj);
                sheet.getCell(tRowIdx, 3).value = '정갑진';
                tObj = {};
                tObj.seq = 3;
                tObj.kind = 'PATT';
                tObj.user = '정갑진';
                tUserArray.push(tObj);
                sheet.getCell(tRowIdx, 4).value = '강정석';
                tObj = {};
                tObj.seq = 4;
                tObj.kind = 'PATT';
                tObj.user = '강정석';
                tUserArray.push(tObj);
                sheet.getCell(tRowIdx, 5).value = '송예은';
                tObj = {};
                tObj.seq = 5;
                tObj.kind = 'PATT';
                tObj.user = '송예은';
                tUserArray.push(tObj);

                sheet.getCell(tRowIdx, 6).value = '심기용'; // Sew
                tObj = {};
                tObj.seq = 6;
                tObj.kind = 'SEW';
                tObj.user = '심기용';
                tUserArray.push(tObj);
                sheet.getCell(tRowIdx, 7).value = '김혜정';
                tObj = {};
                tObj.seq = 7;
                tObj.kind = 'SEW';
                tObj.user = '김혜정';
                tUserArray.push(tObj);
                sheet.getCell(tRowIdx, 8).value = '박혜영';
                tObj = {};
                tObj.seq = 8;
                tObj.kind = 'SEW';
                tObj.user = '박혜영';
                tUserArray.push(tObj);
                sheet.getCell(tRowIdx, 9).value = '장영자';
                tObj = {};
                tObj.seq = 9;
                tObj.kind = 'SEW';
                tObj.user = '장영자';
                tUserArray.push(tObj);
                sheet.getCell(tRowIdx, 10).value = '박금희';
                tObj = {};
                tObj.seq = 10;
                tObj.kind = 'SEW';
                tObj.user = '박금희';
                tUserArray.push(tObj);
                sheet.getCell(tRowIdx, 11).value = '오복순';
                tObj = {};
                tObj.seq = 11;
                tObj.kind = 'SEW';
                tObj.user = '오복순';
                tUserArray.push(tObj);

                sheet.getCell(tRowIdx, 12).value = '김용환'; // Welding
                tObj = {};
                tObj.seq = 12;
                tObj.kind = 'WELDING';
                tObj.user = '김용환';
                tUserArray.push(tObj);
                sheet.getCell(tRowIdx, 13).value = '정갑진';
                tObj = {};
                tObj.seq = 13;
                tObj.kind = 'WELDING';
                tObj.user = '정갑진';
                tUserArray.push(tObj);
                sheet.getCell(tRowIdx, 14).value = '강정석';
                tObj = {};
                tObj.seq = 14;
                tObj.kind = 'WELDING';
                tObj.user = '강정석';
                tUserArray.push(tObj);
                sheet.getCell(tRowIdx, 15).value = '송예은';
                tObj = {};
                tObj.seq = 15;
                tObj.kind = 'WELDING';
                tObj.user = '송예은';
                tUserArray.push(tObj);

                sheet.getCell(tRowIdx, 16).value = '김용환'; // 수선
                tObj = {};
                tObj.seq = 16;
                tObj.kind = '수선';
                tObj.user = '김용환';
                tUserArray.push(tObj);
                sheet.getCell(tRowIdx, 17).value = '정갑진';
                tObj = {};
                tObj.seq = 17;
                tObj.kind = '수선';
                tObj.user = '정갑진';
                tUserArray.push(tObj);
                sheet.getCell(tRowIdx, 18).value = '강정석';
                tObj = {};
                tObj.seq = 18;
                tObj.kind = '수선';
                tObj.user = '강정석';
                tUserArray.push(tObj);
                sheet.getCell(tRowIdx, 19).value = '송예은';
                tObj = {};
                tObj.seq = 19;
                tObj.kind = '수선';
                tObj.user = '송예은';
                tUserArray.push(tObj);
                sheet.getCell(tRowIdx, 20).value = '심기용';
                tObj = {};
                tObj.seq = 20;
                tObj.kind = '수선';
                tObj.user = '심기용';
                tUserArray.push(tObj);
                sheet.getCell(tRowIdx, 21).value = '김혜정';
                tObj = {};
                tObj.seq = 21;
                tObj.kind = '수선';
                tObj.user = '김혜경';
                tUserArray.push(tObj);
                sheet.getCell(tRowIdx, 22).value = '박혜영';
                tObj = {};
                tObj.seq = 22;
                tObj.kind = '수선';
                tObj.user = '박혜영';
                tUserArray.push(tObj);
                sheet.getCell(tRowIdx, 23).value = '장영자';
                tObj = {};
                tObj.seq = 23;
                tObj.kind = '수선';
                tObj.user = '장영자';
                tUserArray.push(tObj);
                sheet.getCell(tRowIdx, 24).value = '박금희';
                tObj = {};
                tObj.seq = 24;
                tObj.kind = '수선';
                tObj.user = '박금희';
                tUserArray.push(tObj);
                sheet.getCell(tRowIdx, 25).value = '오복순';
                tObj = {};
                tObj.seq = 25;
                tObj.kind = '수선';
                tObj.user = '오복순';
                tUserArray.push(tObj);

                sheet.getCell(tRowIdx, 26).value = '김용환'; // interrup
                tObj = {};
                tObj.seq = 26;
                tObj.kind = 'INTERRUP';
                tObj.user = '김용환';
                tUserArray.push(tObj);
                sheet.getCell(tRowIdx, 27).value = '정갑진';
                tObj = {};
                tObj.seq = 27;
                tObj.kind = 'INTERRUP';
                tObj.user = '정갑진';
                tUserArray.push(tObj);
                sheet.getCell(tRowIdx, 28).value = '강정석';
                tObj = {};
                tObj.seq = 28;
                tObj.kind = 'INTERRUP';
                tObj.user = '강정석';
                tUserArray.push(tObj);
                sheet.getCell(tRowIdx, 29).value = '송예은';
                tObj = {};
                tObj.seq = 29;
                tObj.kind = 'INTERRUP';
                tObj.user = '송예은';
                tUserArray.push(tObj);
                sheet.getCell(tRowIdx, 30).value = '심기용';
                tObj = {};
                tObj.seq = 30;
                tObj.kind = 'INTERRUP';
                tObj.user = '심기용';
                tUserArray.push(tObj);
                sheet.getCell(tRowIdx, 31).value = '김혜정';
                tObj = {};
                tObj.seq = 31;
                tObj.kind = 'INTERRUP';
                tObj.user = '김혜정';
                tUserArray.push(tObj);
                sheet.getCell(tRowIdx, 32).value = '박혜영';
                tObj = {};
                tObj.seq = 32;
                tObj.kind = 'INTERRUP';
                tObj.user = '박혜영';
                tUserArray.push(tObj);
                sheet.getCell(tRowIdx, 33).value = '장영자';
                tObj = {};
                tObj.seq = 33;
                tObj.kind = 'INTERRUP';
                tObj.user = '장영자';
                tUserArray.push(tObj);
                sheet.getCell(tRowIdx, 34).value = '박금희';
                tObj = {};
                tObj.seq = 34;
                tObj.kind = 'INTERRUP';
                tObj.user = '박금희';
                tUserArray.push(tObj);
                sheet.getCell(tRowIdx, 35).value = '오복순';
                tObj = {};
                tObj.seq = 35;
                tObj.kind = 'INTERRUP';
                tObj.user = '오복순';
                tUserArray.push(tObj);
                sheet.getCell(tRowIdx, 36).value = 'Total';
                tRowIdx += 1;

                var tUserArray1 = [];
                var tIdx1 = 0;
                var tRowIdx1 = tRowIdx;
                for (tIdx1 = 0; tIdx1 < tUserArray.length; tIdx1++) {
                    var tOne = { ...tUserArray[tIdx1] };

                    let sqlStr100 = `
                        select
                            *
                        from
                            kcd_user
                        where
                            user_name like '%${tOne.user}%'
                    `;
                    var tRet100 = await prisma.$queryRaw(Prisma.raw(sqlStr100));
                    if (tRet100.length > 0) {
                        tOne.user_id = tRet100[0].USER_ID;
                    } else {
                        tOne.user_id = '';
                    }
                    tUserArray1.push(tOne);
                }

                let sqlStr1 = `
                    select distinct
                        b.buyer_cd,
                        b.buyer_name
                    from
                        kzz_sample_cost a,
                        kcd_buyer b
                    where
                        a.sample_end_date between '${tSDate}' and '${tEDate}'
                        -- and a.sample_end_flag = '1'
                        and a.buyer_cd = b.buyer_cd
                    order by
                        1
                `;
                console.log(sqlStr1);
                var tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));

                tIdx1 = 0;
                for (tIdx1 = 0; tIdx1 < tRet1.length; tIdx1++) {
                    var tIdx2 = 0;
                    var tBuyer = { ...tRet1[tIdx1] };
                    sheet.getCell(tRowIdx + tIdx1, 1).value = tBuyer.buyer_name;

                    var tTotal = 0;

                    var tArray = [];
                    tUserArray1.forEach((col, i) => {
                        if (col.kind === 'PATT') tArray.push(col);
                    });
                    for (tIdx2 = 0; tIdx2 < tArray.length; tIdx2++) {
                        var tOne = tArray[tIdx2];

                        let sqlStr2 = `
                            select
                                isnull((sum(convert(int, b.cd_flag)) * 10000), 0) as patt_amt
                            from
                                kzz_sample_cost a,
                                kcd_code b
                            where
                                a.sample_end_date between '${tSDate}' and '${tEDate}'
                                and b.cd_group = 'PATT_COST'
                                and b.cd_code = a.patt_cost
                                and a.patt_user = '${tOne.user_id}'
                                and a.buyer_cd = '${tBuyer.buyer_cd}'
                        `;
                        var tRet2 = await prisma.$queryRaw(Prisma.raw(sqlStr2));
                        sheet.getCell(tRowIdx + tIdx1, tOne.seq).value =
                            tRet2[0].patt_amt;
                        tTotal += tRet2[0].patt_amt;
                    }

                    tArray = [];
                    tUserArray1.forEach((col, i) => {
                        if (col.kind === 'WELDING') tArray.push(col);
                    });
                    for (tIdx2 = 0; tIdx2 < tArray.length; tIdx2++) {
                        var tOne = tArray[tIdx2];
                        let sqlStr3 = `
                            select
                                isnull(
                                    sum(convert(int, a.welding_cost) * a.order_qty),
                                    0
                                ) as welding_amt
                            from
                                kzz_sample_cost a
                            where
                                a.sample_end_date between '${tSDate}' and '${tEDate}'
                                and a.patt_user = '${tOne.user_id}'
                                and a.buyer_cd = '${tBuyer.buyer_cd}'
                        `;
                        var tRet3 = await prisma.$queryRaw(Prisma.raw(sqlStr3));
                        sheet.getCell(tRowIdx + tIdx1, tOne.seq).value =
                            tRet3[0].welding_amt;
                        tTotal += tRet2[0].welding_amt;
                    }

                    tArray = [];
                    tUserArray1.forEach((col, i) => {
                        if (col.kind === 'SEW') tArray.push(col);
                    });
                    for (tIdx2 = 0; tIdx2 < tArray.length; tIdx2++) {
                        var tOne = tArray[tIdx2];
                        let sqlStr2 = `
                            select
                                isnull(
                                    (
                                        sum(convert(int, b.cd_flag) * a.order_qty) * 10000
                                    ),
                                    0
                                ) as sew_amt
                            from
                                kzz_sample_cost a,
                                kcd_code b
                            where
                                a.sample_end_date between '${tSDate}' and '${tEDate}'
                                and b.cd_group = 'SEW_COST'
                                and b.cd_code = a.sew_cost
                                and a.sew_user = '${tOne.user_id}'
                                and a.buyer_cd = '${tBuyer.buyer_cd}'
                        `;
                        var tRet2 = await prisma.$queryRaw(Prisma.raw(sqlStr2));
                        sheet.getCell(tRowIdx + tIdx1, tOne.seq).value =
                            tRet2[0].sew_amt;
                        tTotal += tRet2[0].sew_amt;
                    }

                    tArray = [];
                    tUserArray1.forEach((col, i) => {
                        if (col.kind === '수선') tArray.push(col);
                    });
                    for (tIdx2 = 0; tIdx2 < tArray.length; tIdx2++) {
                        var tOne = tArray[tIdx2];
                        var tRepair_Amt = 0;
                        let sqlStr2 = `
                            select
                                isnull(
                                    sum(
                                        convert(float, right(b.cd_name, 3)) * a.repair_qty
                                    ) * 10000,
                                    '0'
                                ) as repair_amt
                            from
                                kzz_sample_cost a,
                                kcd_code b
                            where
                                a.sample_end_date between '${tSDate}' and '${tEDate}'
                                and b.cd_group = 'WORK_TYPE'
                                and b.cd_code = a.work_type
                                -- and a.work_type not in('0','9','4','3') 
                                and a.work_type in ('1', '2', '3', 'F')
                                and a.sew_user = '${tOne.user_id}'
                                and a.buyer_cd = '${tBuyer.buyer_cd}'
                            union
                            select
                                isnull(sum(convert(float, a.repair_qty) * 541), '0')
                            from
                                kzz_sample_cost a,
                                kcd_code b
                            where
                                a.sample_end_date between '${tSDate}' and '${tEDate}'
                                and b.cd_group = 'WORK_TYPE'
                                and b.cd_code = a.work_type
                                and a.work_type in ('4')
                                and a.sew_user = '${tOne.user_id}'
                                and a.buyer_cd = '${tBuyer.buyer_cd}'
                        `;
                        var tRet2 = await prisma.$queryRaw(Prisma.raw(sqlStr2));
                        tRepair_Amt += tRet2[0].repair_amt;

                        let sqlStr3 = `
                            select
                                isnull(sum(convert(int, sew_loss_time)) * 541, 0) as repair_amt
                            from
                                kzz_sample_cost
                            where
                                sample_end_date between '${tSDate}' and '${tEDate}'
                                and sew_loss = '99'
                                and sew_user = '${tOne.user_id}'
                                and buyer_cd = '${tBuyer.buyer_cd}'
                        `;
                        var tRet3 = await prisma.$queryRaw(Prisma.raw(sqlStr3));
                        tRepair_Amt += tRet3[0].repair_amt;

                        let sqlStr4 = `
                            select
                                isnull(
                                    sum(convert(int, repair_qty) * 5000 + etc_amount),
                                    0
                                ) as repair_amt
                            from
                                kzz_sample_cost
                            where
                                sample_end_date between '${tSDate}' and '${tEDate}'
                                and work_type = '1'
                                and patt_user = '${tOne.user_id}'
                                and buyer_cd = '${tBuyer.buyer_cd}'
                        `;
                        var tRet4 = await prisma.$queryRaw(Prisma.raw(sqlStr4));
                        tRepair_Amt += tRet4[0].repair_amt;

                        let sqlStr5 = `
                            select
                                isnull(
                                    sum(convert(int, repair_qty) * 15000 + etc_amount),
                                    0
                                ) as repair_amt
                            from
                                kzz_sample_cost
                            where
                                sample_end_date between '${tSDate}' and '${tEDate}'
                                and work_type = '3'
                                and patt_user = '${tOne.user_id}'
                                and buyer_cd = '${tBuyer.buyer_cd}'
                        `;
                        var tRet5 = await prisma.$queryRaw(Prisma.raw(sqlStr5));
                        tRepair_Amt += tRet5[0].repair_amt;
                        sheet.getCell(tRowIdx + tIdx1, tOne.seq).value =
                            tRepair_Amt;
                        tTotal += tRepair_Amt;
                    }

                    tArray = [];
                    tUserArray1.forEach((col, i) => {
                        if (col.kind === 'INTERRUP') tArray.push(col);
                    });
                    for (tIdx2 = 0; tIdx2 < tArray.length; tIdx2++) {
                        var tOne = tArray[tIdx2];
                        var tInterrupt_Amt = 0;

                        if (tIdx2 < 4) {
                            let sqlStr6 = `
                                select
                                    sum(convert(int, a.patt_loss_time) * b.cd_flag) as sum_amt
                                from
                                    kzz_sample_cost a,
                                    kcd_code b
                                where
                                    a.sample_end_date between '${tSDate}' and '${tEDate}'
                                    and a.patt_loss_time > 0
                                    and b.cd_group = 'patt_loss'
                                    and b.cd_code = a.patt_loss
                                    and a.patt_user = '${tOne.user_id}'
                                    and a.buyer_cd = '${tBuyer.buyer_cd}'
                            `;
                            var tRet6 = await prisma.$queryRaw(
                                Prisma.raw(sqlStr6),
                            );
                            sheet.getCell(tRowIdx + tIdx1, tOne.seq).value =
                                tRet6[0].sum_amt;
                            tTotal += tRet6[0].sum_amt;
                        } else {
                            let sqlStr6 = `
                                select
                                    sum(convert(int, a.patt_loss_time) * b.cd_flag) as sum_amt
                                from
                                    kzz_sample_cost a,
                                    kcd_code b
                                where
                                    a.sample_end_date between '${tSDate}' and '${tEDate}'
                                    and a.sew_loss <> '99'
                                    and a.sew_loss_time > 0
                                    and b.cd_group = 'sew_loss'
                                    and b.cd_code = a.sew_loss
                                    and a.sew_user = '${tOne.user_id}'
                                    and a.buyer_cd = '${tBuyer.buyer_cd}'
                            `;
                            var tRet6 = await prisma.$queryRaw(
                                Prisma.raw(sqlStr6),
                            );
                            sheet.getCell(tRowIdx + tIdx1, tOne.seq).value =
                                tRet6[0].sum_amt;
                            tTotal += tRet6[0].sum_amt;
                        }
                    }
                    sheet.getCell(tRowIdx + tIdx1, 36).value = tTotal;
                    tRowIdx1 += 1;
                }

                sheet.getCell(tRowIdx1, 2).value = {
                    formula: `=SUM(B4:B${tRowIdx1 - 1})`,
                };
                sheet.getCell(tRowIdx1, 3).value = {
                    formula: `=SUM(C4:C${tRowIdx1 - 1})`,
                };
                sheet.getCell(tRowIdx1, 4).value = {
                    formula: `=SUM(D4:D${tRowIdx1 - 1})`,
                };
                sheet.getCell(tRowIdx1, 5).value = {
                    formula: `=SUM(E4:E${tRowIdx1 - 1})`,
                };
                sheet.getCell(tRowIdx1, 6).value = {
                    formula: `=SUM(F4:F${tRowIdx1 - 1})`,
                };
                sheet.getCell(tRowIdx1, 7).value = {
                    formula: `=SUM(G4:G${tRowIdx1 - 1})`,
                };
                sheet.getCell(tRowIdx1, 8).value = {
                    formula: `=SUM(H4:H${tRowIdx1 - 1})`,
                };
                sheet.getCell(tRowIdx1, 9).value = {
                    formula: `=SUM(I4:I${tRowIdx1 - 1})`,
                };
                sheet.getCell(tRowIdx1, 10).value = {
                    formula: `=SUM(J4:J${tRowIdx1 - 1})`,
                };
                sheet.getCell(tRowIdx1, 11).value = {
                    formula: `=SUM(K4:K${tRowIdx1 - 1})`,
                };
                sheet.getCell(tRowIdx1, 12).value = {
                    formula: `=SUM(L4:L${tRowIdx1 - 1})`,
                };
                sheet.getCell(tRowIdx1, 13).value = {
                    formula: `=SUM(M4:M${tRowIdx1 - 1})`,
                };
                sheet.getCell(tRowIdx1, 14).value = {
                    formula: `=SUM(N4:N${tRowIdx1 - 1})`,
                };
                sheet.getCell(tRowIdx1, 15).value = {
                    formula: `=SUM(O4:O${tRowIdx1 - 1})`,
                };
                sheet.getCell(tRowIdx1, 16).value = {
                    formula: `=SUM(P4:P${tRowIdx1 - 1})`,
                };
                sheet.getCell(tRowIdx1, 17).value = {
                    formula: `=SUM(Q4:Q${tRowIdx1 - 1})`,
                };
                sheet.getCell(tRowIdx1, 18).value = {
                    formula: `=SUM(R4:R${tRowIdx1 - 1})`,
                };
                sheet.getCell(tRowIdx1, 19).value = {
                    formula: `=SUM(S4:S${tRowIdx1 - 1})`,
                };
                sheet.getCell(tRowIdx1, 20).value = {
                    formula: `=SUM(T4:T${tRowIdx1 - 1})`,
                };
                sheet.getCell(tRowIdx1, 21).value = {
                    formula: `=SUM(U4:U${tRowIdx1 - 1})`,
                };
                sheet.getCell(tRowIdx1, 22).value = {
                    formula: `=SUM(V4:V${tRowIdx1 - 1})`,
                };
                sheet.getCell(tRowIdx1, 23).value = {
                    formula: `=SUM(W4:W${tRowIdx1 - 1})`,
                };
                sheet.getCell(tRowIdx1, 24).value = {
                    formula: `=SUM(X4:X${tRowIdx1 - 1})`,
                };
                sheet.getCell(tRowIdx1, 25).value = {
                    formula: `=SUM(Y4:Y${tRowIdx1 - 1})`,
                };
                sheet.getCell(tRowIdx1, 26).value = {
                    formula: `=SUM(Z4:Z${tRowIdx1 - 1})`,
                };
                sheet.getCell(tRowIdx1, 27).value = {
                    formula: `=SUM(AA4:AA${tRowIdx1 - 1})`,
                };
                sheet.getCell(tRowIdx1, 28).value = {
                    formula: `=SUM(AB4:AB${tRowIdx1 - 1})`,
                };
                sheet.getCell(tRowIdx1, 29).value = {
                    formula: `=SUM(AC4:AC${tRowIdx1 - 1})`,
                };
                sheet.getCell(tRowIdx1, 30).value = {
                    formula: `=SUM(AD4:AD${tRowIdx1 - 1})`,
                };
                sheet.getCell(tRowIdx1, 31).value = {
                    formula: `=SUM(AE4:AE${tRowIdx1 - 1})`,
                };
                sheet.getCell(tRowIdx1, 32).value = {
                    formula: `=SUM(AF4:AF${tRowIdx1 - 1})`,
                };
                sheet.getCell(tRowIdx1, 33).value = {
                    formula: `=SUM(AG4:AG${tRowIdx1 - 1})`,
                };
                sheet.getCell(tRowIdx1, 34).value = {
                    formula: `=SUM(AH4:AH${tRowIdx1 - 1})`,
                };
                sheet.getCell(tRowIdx1, 35).value = {
                    formula: `=SUM(AI4:AI${tRowIdx1 - 1})`,
                };
                sheet.getCell(tRowIdx1, 36).value = {
                    formula: `=SUM(AJ4:AJ${tRowIdx1 - 1})`,
                };

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

                var tExcelFileName0 = `개발실비용-${tUserInfo.USER_ID}-${tRetDate}.xlsx`;
                var tExcelFileName = `${tPath}/${tExcelFileName0}`;
                return await upload(`${tExcelFileName0}`, wb);
            } catch (error) {
                var tRetArray: any[] = [];
                let tObj = {
                    id: 0,
                    CODE: 'ERROR: ' + error.message,
                };

                tRetArray.push(tObj);
                return tRetArray;
            }
        },
    },
};

export default moduleQuery_S0203_SAMPLE_COST_TBL_KCD_STYLE;
