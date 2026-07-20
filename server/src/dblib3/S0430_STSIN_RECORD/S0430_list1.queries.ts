import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0430_LIST_1 = {
    Query: {
        mgrQueryS0430_LIST_1: async (_, args) => {
            var inSql = '';
            args.data.forEach((col, i) => {
                if (i === 0) inSql = `'${col.PU_CD}'`;
                else inSql += `,'${col.PU_CD}'`;
            });

            /*
       let sqlStr0 = `
           select
               *
           from
               ksv_cost_mst
           where
               pu_cd in (${inSql})
               and
           type = 'PURCHASE'
           and type2 = 'MOQ'
           and (
               confirm_user is null
               or confirm_user = ''
           )
       `;
       var tRet0  =  await prisma.$queryRaw(Prisma.raw(sqlStr0));
       if (tRet0.length > 0) {
           var tWObj = {};
       	   tWObj.DATAS = [];
           tWObj.MESSAGE = 'Sales needs to confirm the MOQ in <Cost Confirmation>.';
           return (tWObj);
       }
       */

            /*
      sqlStr0 = `
          select
              *
          from
              ksv_cost_mst
          where
              pu_cd in (${inSql})
              and
          type = 'PURCHASE'
          and type2 = 'Surcharge'
          and (
              confirm_user is null
              or confirm_user = ''
          )
      `;
       tRet0  =  await prisma.$queryRaw(Prisma.raw(sqlStr0));
       if (tRet0.length > 0) {
           var tWObj = {};
       	   tWObj.DATAS = [];
           tWObj.MESSAGE = 'Sales needs to confirm the Surcharge in <Cost Confirmation>.';
           return (tWObj);
       }
       */

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
                    isnull(A1.OVERSHORT_RATE, '4') as OVERSHORT_RATE,
                    A3.CD_NAME as VENDOR_TYPE_N,
                    A.MATL_TYPE,
                    A.NORMI,
                    A.MRP_DATE,
                    A.ORDER_DATE,
                    A.DELIVERY_DATE AS DUE_DATE,
                    A.EXP_DELIVERY_DATE AS EX_FACTORY,
                    A1.PAY_TERM AS PAY_TERM,
                    A.CURR_CD,
                    A.VENDOR_CD,
                    A.TARGET_ETA,
                    A.ETA,
                    A.DEPOSIT_AMT,
                    A.LC_AMT,
                    -- isnull(A.PAY_CONDITION, '') AS PAY_CONDITION,
                    isnull(A.PAY_TYPE, '') AS PAY_CONDITION,
                    isnull(A1.PAY_TYPE, '') AS PAY_CONDITION_VENDOR,
                    A.PAY_DATE AS PAY_DATE,
                    A.BILL_TO,
                    isnull(A1.OVER_SHORT, '4') as OVER_SHORT,
                    isnull(sum(A2.PO_PRICE * A2.PO_QTY2), 0) as PU_AMT,
                    isnull(sum(A2.PO_PRICE * A2.IN_QTY), 0) as STS_IN_AMT,
                    isnull(sum(A2.PO_PRICE * A2.OUT_QTY), 0) as STS_OUT_AMT,
                    isnull(sum(A2.PO_PRICE * A2.INFAC_QTY), 0) as FACIN_AMT,
                    isnull(sum(A2.PO_PRICE * A2.MOQ), 0) as MOQ_AMT,
                    isnull(sum(A2.SURCHARGE_AMT), 0) as SURCHARGE_AMT
                FROM
                    KSV_PU_MST2 A,
                    KSV_STOCK_MEM2 A2,
                    KCD_CODE A3,
                    KCD_BUYER A4,
                    KCD_VENDOR A1
                WHERE
                    A.VENDOR_CD = A1.VENDOR_CD
                    AND A.BUYER_CD = A4.BUYER_CD
                    AND A.PU_CD = A2.PU_CD
                    AND A.PU_TYPE = '1'
                    AND A1.VENDOR_TYPE = A3.CD_CODE
                    and A3.CD_GROUP = 'VENDOR_TYPE'
                    AND A.PU_CD in (${inSql})
                    -- AND     (A2.STSIN_CD = '' or A2.STSIN_CD is null)
                GROUP BY
                    A.PU_STATUS,
                    A.REG_USER,
                    A.BUYER_CD,
                    A4.BUYER_NAME,
                    A.PU_CD,
                    A.PO_CD2,
                    A1.VENDOR_NAME,
                    A1.VENDOR_TYPE,
                    A1.OVERSHORT_RATE,
                    A3.CD_NAME,
                    A.MATL_TYPE,
                    A.NORMI,
                    A.MRP_DATE,
                    A.ORDER_DATE,
                    A.DELIVERY_DATE,
                    A.EXP_DELIVERY_DATE,
                    -- A.PAY_CONDITION,
                    A.PAY_TYPE,
                    A1.PAY_TERM,
                    A.CURR_CD,
                    A.VENDOR_CD,
                    A.TARGET_ETA,
                    A.ETA,
                    A.DEPOSIT_AMT,
                    A.LC_AMT,
                    A1.PAY_TYPE,
                    A.PAY_DATE,
                    A.BILL_TO,
                    A1.OVER_SHORT
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetArray = [];

            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tObj = { ...tRet[tIdx] };
                var tBalAmt =
                    parseFloat(tObj.PU_AMT) - parseFloat(tObj.STS_IN_AMT);
                tObj.BAL_AMT = String(tBalAmt);

                /*
           var tRet0 = [];
           var sql0 = `
               select
                   isnull(pay_type, '') as pay_type
               from
                   kcd_vendor
               where
                   vendor_cd = '${tObj.VENDOR_CD}'
           `;
           tRet0  =  await prisma.$queryRaw(Prisma.raw(sql0));
           if (tRet0.length > 0)  tObj.PAY_CONDITION = tRet0[0].pay_type;
           else tObj.PAY_CONDITION = '';
           */

                /*
           if (tObj.PAY_CONDITION === '') {
               if (tObj.PAY_CONDITION_VENDOR !== '') {
                  var sql0 = `
                      select
                          *
                      from
                          kcd_code
                      where
                          cd_name like '%${tObj.PAY_CONDITION}%'
                          and cd_group = 'PAY_TYPE'
                  `;
                  tRet0  =  await prisma.$queryRaw(Prisma.raw(sql0));
                  if (tRet0.length > 0)  tObj.PAY_CONDITION = tRet0[0].CD_CODE;
                  else tObj.PAY_CONDITION = '';
               } else {
                  tObj.PAY_CONDITION = '';
               }
           } else {
              ;
           }
           */
                tRetArray.push(tObj);
            }

            var tWObj = {};
            tWObj.DATAS = [...tRetArray];
            tWObj.MESSAGE = '';
            return tWObj;
        },
    },
};

export default moduleQuery_S0430_LIST_1;
