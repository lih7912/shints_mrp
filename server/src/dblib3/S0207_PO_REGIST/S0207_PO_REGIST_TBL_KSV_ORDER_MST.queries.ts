// MGR_@@TNAME@@.queries.js

import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0207_PO_REGIST_TBL_KSV_ORDER_MST = {
    Query: {
        mgrQuery_S0207_PO_REGIST_CODE: async (_, args) => {
            var tWRet = {};

            var tSQL = '';
            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_STYLE
                order by
                    id desc
                    -- OFFSET 0 rows fetch next 1000 rows only
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.STYLE_CD = '';
            tObj.STYLE_NAME = ' ';
            tRet.unshift(tObj);
            tWRet.STYLE = tRet;

            let sqlStr = `
                SELECT
                    *
                FROM
                    KCD_BUYER
                order by
                    id desc
                    -- OFFSET 0 rows fetch next 1000 rows only
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tObj = {};
            tObj.BUYER_CD = '';
            tObj.BUYER_NAME = ' ';
            tRet.unshift(tObj);
            tWRet.BUYER = tRet;

            return tWRet;
        },

        mgrQuery_S0207_PO_REGIST_TBL_KSV_ORDER_MST: async (_, args) => {
            var tSQL = '';

            if (args.data.ORDER_CD !== '') {
                tSQL += `AND ORDER_CD like '${args.data.ORDER_CD}%' `;
            }

            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_CD like '%${args.data.STYLE_CD}%' `;
            }

            if (args.data.BUYER_CD !== '') {
                tSQL += `AND LEFT(ORDER_CD, 2) like '%${args.data.BUYER_CD}%' `;
            }

            if (args.data.GOODS_FLAG !== '') {
                tSQL += `AND ORDER_FLAG = '%${args.data.GOODS_FLAG}%' `;
            }

            if (args.data.SAMPLE_FLAG !== '') {
                tSQL += `AND SAMPLE_FLAG = '1' `;
            }

            if (args.data.FACTORY_LC_FLAG !== '') {
                tSQL += `AND FAC_LC_FLAG = '1' `;
            }

            let sqlStr = `
                select
                    a.ORDER_CD,
                    b.STYLE_NAME,
                    a.DUE_DATE,
                    a.TOT_CNT,
                    c.cd_name as ORDER_STATUS_NAME,
                    d.FACTORY_NAME,
                    a.STYLE_CD,
                    a.ORDER_STATUS,
                    a.FACTORY_CD,
                    a.SAMPLE_FLAG
                from
                    (
                        select
                            *
                        from
                            ksv_order_mst
                        where
                            order_status = '0'
                            and order_type in ('0', '1') ${tSQL}
                        order by
                            due_date desc
                            -- offset 0 rows fetch next 1000 rows only
                    ) a
                    left join kcd_style b on a.style_cd = b.style_cd
                    left join kcd_code c on a.order_status = c.cd_code
                    and c.cd_group = 'ORDER_STATUS_E'
                    left join kcd_factory d on a.factory_cd = d.factory_cd
                order by
                    a.due_date desc
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                PO_CD: '',
                ORDER_CD: '',
                DUE_DATE: '',
                TOT_CNT: '',
                STATUS_NAME: '',
                FACTORY_NAME: '',
                FACTORY_CD: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S0207_PO_REGIST_TBL_KSV_ORDER_MST;
