// MGR_@@TNAME@@.mutations.js

import * as fs from 'fs';
import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기

/*
                END_DATE: String 
                WORK_TYPE: String 
                REPAIR_QTY: String 
                ORDER_CD: String 
                BUYER_CD: String 
                STYLE_CD: String 
                REMARK: String 
                PATT_LOSS: String 
                PATT_LOSS_TIME: String 
                SEW_LOSS: String 
                SEW_LOSS_TIME: String 
                ETC_COST: String 
                SAMPLE_CODE: String 
                PATT_USER: String 
                PATT_COST: String 
                PATT_COST_R: String 
                SEW_USER: String 
                SEW_COST: String 
                SEW_COST_R: String 
                WELDING_COST: String 
                WELDING_COST1: String 
                CUTTING_USER: String 
                COMPLETE_USER: String 
                PATT3D_USER: String 
                PATT3D_COST: String 
                PATT3D_COST_R: String 
                WORK3D_USER: String 
                WORK3D_COST: String 
                WORK3D_COST_R: String 
                COLOR3D_QTY: String 
                COLOR3D_QTY_COST: String 

*/

// export default로 Mutation 내용 내보내기
const moduleMutation_S0203_SAMPLE_COST_EDT_KZZ_SAMPLE_COST = {
    Mutation: {
        mgrInsert_S0203_SAMPLE_COST_EDT_KZZ_SAMPLE_COST: async (_, args) => {
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

            var retArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var tData = args.datas[tIdx];
                var tObjEDT_KZZ_SAMPLE_COST = { ...tData };
                delete tObjEDT_KZZ_SAMPLE_COST.id;

                /*
        let retInsert = await prisma.EDT_KZZ_SAMPLE_COST.create({data:tObj@@TNAME@@});
        if (typeof retInsert.id === 'undefined') {
          var tObj = {};
          tObj.CODE = 'ERROR';
          tObj.id = 0;
          retArray.push(tObj);
        } else {
          var tObj = {};
          tObj.CODE = retInsert.FACTORY_CD;
          tObj.id = retInsert.id;
          retArray.push(tObj);
        } 
*/
            }
            return retArray;
        },

        mgrUpdate_S0203_SAMPLE_COST: async (_, args, contextValue) => {
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
            var tSQLArray = [];
            var retArray = [];

            var tInput = { ...args.datas };
            var tSQL = '';
            if (tInput.WORK_TYPE === 'F') {
                // 수선
                tSQL += `buyer_cd = '${tInput.BUYER_CD}', `;
                tSQL += `style_cd = '${tInput.STYLE_CD}', `;
            }

            let tSQL99 = `
                update kzz_sample_cost
                set
                    -- SAMPLE_END_DATE = '${tInput.SAMPLE_END_DATE}',   
                    REPAIR_QTY = '${tInput.REPAIR_QTY}',
                    REMARK = '${tInput.REMARK}',
                    PATT_LOSS = '${tInput.PATT_LOSS}',
                    PATT_LOSS_TIME = '${tInput.PATT_LOSS_TIME}',
                    SEW_LOSS = '${tInput.SEW_LOSS}',
                    SEW_LOSS_TIME = '${tInput.SEW_LOSS_TIME}',
                    ETC_AMOUNT = '${tInput.ETC_AMOUNT}',
                    PATT_USER = '${tInput.PATT_USER}',
                    PATT_COST = '${tInput.PATT_COST}',
                    SEW_USER = '${tInput.SEW_USER}',
                    SEW_COST = '${tInput.SEW_COST}',
                    WELDING_COST = '${tInput.WELDING_COST}',
                    CUTTING_USER = '${tInput.CUTTING_USER}',
                    COMPLETE_USER = '${tInput.COMPLETE_USER}',
                    PATT3D_USER = '${tInput.PATT3D_USER}',
                    PATT3D_COST = '${tInput.PATT3D_COST}',
                    WORK3D_USER = '${tInput.WORK3D_USER}',
                    WORK3D_COST = '${tInput.WORK3D_COST}',
                    COLOR3D_QTY = '${tInput.COLOR3D_QTY}',
                    ${tSQL} WORK_TYPE = '${tInput.WORK_TYPE}',
                    WORK_KIND = '${tInput.WORK_KIND}'
                    -- COLOR3D_AMT = '${tInput.COLOR3D_AMT}'   
                where
                    sample_cd = '${tInput.SAMPLE_CD}'
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
                tObj.CODE = 'SUCCEED:Update Sample Cost:';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:' + e.message;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },

        mgrUpdate_S0203_SAMPLE_COST_END: async (_, args, contextValue) => {
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
            var tSQLArray = [];
            var retArray = [];

            var tInput = { ...args.datas };

            var sql0_bak2 = `
                select
                    *
                from
                    kzz_sample_cost
                where
                    sample_cd = '${tInput.SAMPLE_CD}'
            `;

            var sql0 = `
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
                    a.ORDER_QTY,
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
                from
                    (
                        select
                            a100.*
                        from
                            kzz_sample_cost a100,
                            kcd_style a101
                        where
                            a100.work_type <> '9'
                            and (
                                a101.style_cd like '%%'
                                or a101.style_name like '%%'
                            )
                            and left(a100.yy, 4) >= '2022'
                            and a100.style_cd = a101.style_cd
                            and a100.sample_cd = '${tInput.SAMPLE_CD}'
                            -- and a100.sample_end_date between '20220101' and '99999999' 
                            -- and a100.sample_end_flag = '1' 
                            and a100.order_cd = '${tInput.ORDER_CD}'
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
                    left join ksv_order_mst d on a.order_cd = d.order_cd
            `;
            var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            var tSampleCostObj = {};
            if (tRet0.length > 0) tSampleCostObj = { ...tRet0[0] };
            console.log(
                `===> sample cost Obj(${tRet0.length}): ${tSampleCostObj.TOTAL_COST}, ${tSampleCostObj.ORDER_QTY}`,
            );

            var tSampleEndFlag = '1';
            var tSampleEndDate = tInput.SAMPLE_END_DATE;
            if (tSampleCostObj.SAMPLE_END_FLAG === '1') {
                tSampleEndFlag = '0';
                tSampleEndDate = '';
            }

            let tSQL99 = `
                update kzz_sample_cost
                set
                    SAMPLE_END_DATE = '${tSampleEndDate}',
                    SAMPLE_END_FLAG = '${tSampleEndFlag}'
                where
                    sample_cd = '${tInput.SAMPLE_CD}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            // var tFcPrice = parseFloat(tInput.SEW_COST) / parseFloat(tSampleCostObj.ORDER_QTY) + parseFloat(tInput.PATT_COST);
            // var tFcPrice = parseFloat(tInput.SEW_AMT) / parseFloat(tSampleCostObj.ORDER_QTY) + parseFloat(tInput.PATT_AMT);
            var tFcPrice =
                parseFloat(tSampleCostObj.TOTAL_COST) /
                parseFloat(tSampleCostObj.ORDER_QTY);
            var tNegoType = '1';

            var sql0 = `
                select
                    *
                from
                    ksv_order_mst
                where
                    order_cd = '${tInput.ORDER_CD}'
            `;
            var nRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            var tOrderMst = {};
            if (nRet0.length > 0) tOrderMst = { ...nRet0[0] };

            var sql1 = `
                select
                    *
                from
                    kcd_currency
                where
                    curr_cd = '${tOrderMst.CURR_CD}'
                    and start_date = '${tSampleEndDate}'
            `;
            var nRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
            var tKcdCurrency = {};
            if (nRet1.length > 0) tKcdCurrency = { ...nRet1[0] };
            else {
                sql1 = `
                    select
                        *
                    from
                        kcd_currency
                    where
                        curr_cd = '${tOrderMst.CURR_CD}'
                        and start_date = (
                            select
                                max(start_date)
                            from
                                kcd_currency
                            where
                                curr_cd = '${tOrderMst.CURR_CD}'
                        )
                `;
                nRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                if (nRet1.length > 0) tKcdCurrency = { ...nRet1[0] };
            }

            if (tOrderMst.CURR_CD !== 'KRW') {
                sql1 = `
                    select
                        *
                    from
                        kcd_currency
                    where
                        curr_cd = 'KRW'
                        and start_date = '${tSampleEndDate}'
                `;
                nRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                if (nRet1.length > 0) tKcdCurrency = { ...nRet1[0] };
                else {
                    sql1 = `
                        select
                            *
                        from
                            kcd_currency
                        where
                            curr_cd = 'KRW'
                            and start_date = (
                                select
                                    max(start_date)
                                from
                                    kcd_currency
                                where
                                    curr_cd = 'KRW'
                            )
                    `;
                    nRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                    if (nRet1.length > 0) tKcdCurrency = { ...nRet1[0] };
                }

                // tFcPrice = tFcPrice / parseFloat(tKcdCurrency.WON_AMT2);
                tFcPrice = tFcPrice * parseFloat(tKcdCurrency.USD_RATE);
                tFcPrice = AFLib.numToFixed(tFcPrice, 4);
            } else {
                tFcPrice = tFcPrice * parseFloat(tKcdCurrency.USD_RATE);
                tFcPrice = AFLib.numToFixed(tFcPrice, 4);
            }

            var tSampleCostFlag = '1';
            if (tSampleEndFlag === '0') {
                tNegoType = '';
                tFcPrice = '0';
                tSampleCostFlag = '';
            }

            let tSQL99 = `
                update ksv_order_mst
                set
                    fc_nego_type = '${tNegoType}',
                    fc_price = '${tFcPrice}',
                    sample_cost_flag = '${tSampleCostFlag}'
                where
                    order_cd = '${tInput.ORDER_CD}'
                 and order_status =  '9'
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
                tObj.CODE = 'SUCCEED:Update Sample Cost:';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:' + e.message;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },

        mgrUpdate_S0203_SAMPLE_COST_SPW_3D: async (_, args, contextValue) => {
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
            var tSQLArray = [];
            var retArray = [];

            var tInput = { ...args.datas };

            var sql0 = `
                select
                    *
                from
                    kzz_sample_cost
                where
                    sample_cd = '${tInput.SAMPLE_CD}'
            `;
            var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            var tSampleCostObj = {};
            if (tRet0.length > 0) tSampleCostObj = { ...tRet0[0] };

            var sql0 = `
                select
                    *
                from
                    ksv_order_mst
                where
                    order_cd = '${tInput.ORDER_CD}'
            `;
            var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
            var tOrderObj = {};
            if (tRet0.length > 0) tOrderObj = { ...tRet0[0] };

            if (parseInt(tOrderObj.ORDER_STATUS) > 7) {
                let tSQL99 = `
                    update kzz_sample_cost
                    set
                        cutting_user = '${tInput.CUTTING_USER}',
                        complete_user = '${tInput.COMPLETE_USER}'
                    where
                        sample_cd = '${tInput.SAMPLE_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            } else {
                var tPattFlag = '1';
                var tSewFlag = '1';
                var tWeldingFlag = '1';

                var tPattCost = parseFloat(tInput.PATT_COST);
                var tSewCost = parseFloat(tInput.SEW_COST);
                var tWeldingCost = parseFloat(tInput.WELDING_COST);

                if (tPattCost <= 0 && tSampleCostObj.PATT_FLAG !== '1')
                    tPattFlag = '0';
                if (tSewCost <= 0 && tSampleCostObj.SEW_FLAG !== '1')
                    tSewFlag = '0';
                if (tWeldingCost <= 0 && tSampleCostObj.WELDING_FLAG !== '1')
                    tWeldingFlag = '0';

                let tSQL99 = `
                    update kzz_sample_cost
                    set
                        patt_cost = '${tInput.PATT_COST}',
                        sew_cost = '${tInput.SEW_COST}',
                        welding_cost = '${tInput.WELDING_COST}',
                        patt_flag = '${tPattFlag}',
                        sew_flag = '${tSewFlag}',
                        welding_flag = '${tWeldingFlag}',
                        patt3d_cost = '${tInput.PATT3D_COST}',
                        patt3d_user = '${tInput.PATT3D_USER}',
                        work3d_cost = '${tInput.WORK3D_COST}',
                        work3d_user = '${tInput.WORK3D_USER}',
                        color3d_qty = '${tInput.COLOR3D_QTY}',
                        cutting_user = '${tInput.CUTTING_USER}',
                        complete_user = '${tInput.COMPLETE_USER}'
                    where
                        sample_cd = '${tInput.SAMPLE_CD}'
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
                tObj.CODE = 'SUCCEED:Update SPW-3D:';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:' + e.message;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
        },

        mgrDelete_S0203_SAMPLE_COST_EDT_KZZ_SAMPLE_COST: async (_, args) => {
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

            var retArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var tData = args.datas[tIdx];
                var tObjEDT_KZZ_SAMPLE_COST = { ...tData };

                /*
        const retDelete = await prisma.@@TNAME@@.delete({
           where: { id: tObj@@TNAME@@.id, },
        });

        var tObj = {};
        tObj.CODE = tObj@@TNAME@@.id;
        retArray.push(tObj);
*/
            }
            return retArray;
        },
    },
};

export default moduleMutation_S0203_SAMPLE_COST_EDT_KZZ_SAMPLE_COST;
