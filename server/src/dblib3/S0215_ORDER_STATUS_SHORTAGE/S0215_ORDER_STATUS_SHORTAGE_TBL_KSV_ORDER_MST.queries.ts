// MGR_@@TNAME@@.queries.js

import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');
const moment = require('moment');

// export default로 Query 내용 내보내기
const moduleQuery_S0215_ORDER_STATUS_SHORTAGE_TBL_KSV_ORDER_MST = {
    Query: {
        mgrQuery_S0215_ORDER_STATUS_SHORTAGE_CODE: async (_, args) => {
            var tWRet = {};

            var tmpArray = [];
            var endDate = moment().subtract(1, 'months'); // 전달
            var startDate = moment('201901', 'YYYYMM'); // 시작일

            while (endDate.isSameOrAfter(startDate)) {
                var formatted = endDate.format('YYYYMM');
                tmpArray.push({
                    CD_CODE: formatted,
                    CD_NAME: formatted,
                });
                endDate.subtract(1, 'months'); // 이전 달로 이동
            }

            var tWRet = {};
            tWRet.SHIP_DATE = tmpArray;

            var tWRet = {};
            tWRet.SHIP_DATE = tmpArray;

            var tValArray = ['', 'Ongoing', 'End'];
            var tVal1Array = [' ', 'Ongoing', 'End'];
            var tmpArray1 = [];
            tValArray.forEach((col, i) => {
                var tObj = {};
                tObj.CD_CODE = col;
                tObj.CD_NAME = tVal1Array[i];
                tmpArray1.push(tObj);
            });
            tWRet.END_TYPE = tmpArray1;

            var tValArray_1 = ['', 'Shortage', 'Overage'];
            var tVal1Array_1 = [' ', 'Shortage', 'Overage'];
            var tmpArray1_1 = [];
            tValArray_1.forEach((col, i) => {
                var tObj = {};
                tObj.CD_CODE = col;
                tObj.CD_NAME = tVal1Array_1[i];
                tmpArray1_1.push(tObj);
            });
            tWRet.TYPE = tmpArray1_1;

            let sqlStr = `
                SELECT
                    BUYER_CD,
                    (BUYER_CD + ')' + BUYER_NAME) as BUYER_NAME
                FROM
                    KCD_BUYER
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.BUYER_CD = '';
            tObj.BUYER_NAME = ' ';
            tRet.unshift(tObj);
            tWRet.BUYER_CD = tRet;

            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_CODE
                where
                    cd_group = 'BUYER_TEAM'
            `;
            let tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.CD_CODE = '';
            tObj.CD_NAME = ' ';
            tRet.unshift(tObj);
            tWRet.BUYER_TEAM = tRet;

            return tWRet;
        },
        mgrQuery_S0215_ORDER_STATUS_SHORTAGE_TBL_KSV_ORDER_MST: async (
            _,
            args,
        ) => {
            var tSQL = '';
            if (args.KEY1 !== '') {
                tSQL += `AND KEY1 = '${args.KEY1}' `;
            }
            let sqlStr = `
                select
                    f.PO_CD,
                    a.ORDER_CD,
                    b.STYLE_NAME,
                    a.TOT_CNT,
                    a.c_ship_cnt as SHIP_CNT,
                    (a.c_ship_cnt - a.tot_cnt) as BAL,
                    d.vmd_qty as AGREED_QTY1,
                    d.vmd_sub_qty as AGREED_QTY2,
                    d.smd_qty as AGREED_QTY3,
                    a.c_ship_date as SHIP_DATE,
                    d.CONFIRM_USER,
                    '0' as CONF,
                    d.CONFIRM_AMT,
                    a.usd_price as U_PRICE,
                    a.FC_PRICE,
                    e.cd_name as ORDER_STATUS_N,
                    d.sts_comment as STS_REMARK,
                    d.bvt_comment as FACTORY_REMARK,
                    d.sup_qty as CHARGED_SUP,
                    d.buyer_qty as CHARGED_BUYER,
                    d.sts_qty as CHARGED_STS,
                    a.REMARK,
                    d.END_FLAG,
                    d.END_DATE
                from
                    (
                        select
                            a1.*,
                            a2.c_ship_cnt,
                            a2.c_ship_date
                        from
                            (
                                select
                                    *
                                from
                                    ksv_order_mst
                                where
                                    order_status in ('8', '9')
                                    and left(order_cd, 2) not in ('SN')
                                    and sample_flag = '0'
                            ) a1,
                            (
                                select
                                    a21.order_cd,
                                    sum(a22.ship_cnt) as c_ship_cnt,
                                    max(a22.ship_date) as c_ship_date
                                from
                                    ksv_order_ship a22,
                                    ksv_order_mst a21
                                where
                                    a21.order_status in ('8', '9')
                                    and left(a21.order_cd, 2) not in ('SN')
                                    and a21.sample_flag = '0'
                                    and a22.order_cd = a21.order_cd
                                group by
                                    a21.order_cd
                            ) a2
                        where
                            a1.order_cd = a2.order_cd
                    ) a
                    left join kcd_style b on a.style_cd = b.style_cd
                    left join ksv_order_over_short d on a.order_cd = d.order_cd
                    left join kcd_code e on a.order_status = e.cd_code
                    and e.cd_group = 'ORDER_STATUS'
                    left join ksv_po_mem f on a.order_cd = f.order_cd
                    and f.po_seq = '1'
                order by
                    f.po_cd desc
                    -- offset 0 rows fetch next 1000 rows only
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                PO_CD: '',
                ORDER_CD: '',
                STYLE_NAME: '',
                STYLE_CD: '',
                TOT_CNT: '',
                SHIP_CNT: '',
                BAL: '',
                AGREED_QTY1: '',
                AGREED_QTY2: '',
                AGREED_QTY3: '',
                SHIP_DATE: '',
                CONF: '',
                CONFIRM_AMT: '',
                U_PRICE: '',
                FC_PRICE: '',
                ORDER_STATUS: '',
                STS_REMARK: '',
                FACTORY_REMARK: '',
                CHARGED_SUP: '',
                CHARGED_BUYER: '',
                CHARGED_STS: '',
                REMARK: '',
                END_FLAG: '',
                END_DATE: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S0215_ORDER_STATUS_SHORTAGE_TBL_KSV_ORDER_MST;
