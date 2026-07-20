import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0437_3_3 = {
    Query: {
        mgrQueryS0437_3_3: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tSQL = '';
            var tSQL1 = '';
            var tRetDate = AFLib.getCurrTime();

            var sETD = args.data.S_ETD;
            var eETD = args.data.E_ETD;

            if (args.data.S_ETD === '') sETD = '20190101';
            if (args.data.E_ETD === '') eETD = tRetDate1;
            tSQL = ` and  c.etd between '${sETD}' and '${eETD}'  `;

            if (args.data.SHIP_DATE !== '') {
                tSQL = ` and  a.ship_date = '${args.data.SHIP_DATE}' `;
            }
            if (args.data.STATUS_CD !== '') {
                tSQL = ` and  c.status_cd like '%${args.data.SHIP_DATE}%' `;
            }
            if (args.data.PAYMENT_TYPE !== '') {
                tSQL = ` and  c.payment_type like '%${args.data.PAYMENT_TYPE}%' `;
            }
            if (args.data.LICENSE_DATE !== '') {
                tSQL1 = ` and  k1.license_date = '${args.data.LICENSE_DATE}' `;
            }

            let sqlStr = `
                select
                    k.*,
                    isnull(k1.PAYMENT_TYPE, '') as PAYMENT_TYPE,
                    -- isnull(k2.CD_NAME, '') as PAYMENT_TYPE_N, 
                    '' as PAYMENT_TYPE_N,
                    isnull(k1.LICENSE_NO, '') as LICENSE_NO,
                    isnull(k1.LICENSE_DATE, '') as LICENSE_DATE,
                    isnull(k1.DOCU_NO, '') as DOCU_NO,
                    isnull(k1.DELIVERY_AMT, 0) as S_AMT
                from
                    (
                        select
                            left(c.REG_DATETIME, 8) as SHIP_DATE,
                            c.ETD,
                            c.BL_NO,
                            c.SHIP_MODE,
                            e.CD_NAME as SHIP_MODE_N,
                            c.CI_FILE,
                            c.BL_FILE,
                            a.STSOUT_CD,
                            c.SHIPMENT_CD,
                            a.INVOICE_NO,
                            c.ORG_ORIGIN_PORT as ORIGIN_PORT,
                            c.ORG_DESTINATION as DESTINATION,
                            left(a.OUT_DATETIME, 8) as OUT_DATE,
                            b.IN_CURR_CD
                        from
                            ksv_stock_out_mst a,
                            ksv_stock_in_mst b,
                            ksv_shipment_mst c,
                            ksv_shipment_mem d,
                            kcd_code e,
                            kcd_code f
                        where
                            a.stsin_cd = b.stsin_cd
                            and c.ORG_ORIGIN_PORT = f.CD_CODE
                            and f.CD_GROUP = 'ORIGIN_PORT'
                            and f.ETC2 = 'KOREA'
                            -- and  ( c.ORG_ORIGIN_PORT in ('korea', 'Korea', 'korea1', 'incheon', 'busan')
                            -- or     c.ORIGIN_PORT in ('korea', 'Korea', 'korea1', 'incheon', 'busan'))
                            and d.shipment_cd = c.shipment_cd
                            and d.stsout_cd = a.stsout_cd
                            and e.cd_code = c.SHIP_MODE
                            and e.cd_group = 'SHIPMENT_SHIP_MODE' ${tSQL}
                        group by
                            left(c.REG_DATETIME, 8),
                            c.ETD,
                            c.BL_NO,
                            c.SHIP_MODE,
                            e.CD_NAME,
                            c.CI_FILE,
                            c.BL_FILE,
                            a.STSOUT_CD,
                            c.SHIPMENT_CD,
                            a.INVOICE_NO,
                            c.ORG_ORIGIN_PORT,
                            c.ORG_DESTINATION,
                            left(a.OUT_DATETIME, 8),
                            b.IN_CURR_CD
                    ) k
                    left join ksv_invoice_matl k1 on k1.INVOICE_NO = k.INVOICE_NO ${tSQL1}
                    -- where k2.cd_code = k1.payment_type and k2.cd_group = 'PAYMENT_TYPE'
                order by
                    k.shipment_cd
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            var tRetArray = [];
            var tIdx = 0;
            for (tIdx = 0; tIdx < tRet.length; tIdx++) {
                var tObj = { ...tRet[tIdx] };
                if (tObj.LICENSE_NO !== '') {
                    if (tObj.DOCU_NO !== '') tObj.STATUS = 'end';
                    else tObj.STATUS = 'export';
                } else {
                    tObj.STATUS = 'ship';
                }

                let sqlStr0 = `
                    select
                        *
                    from
                        kcd_fileinfo
                    where
                        kind = 'SHIPMENT'
                        and file_key = '${tObj.SHIPMENT_CD}'
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr0));
                tObj.BL_FILE = '';
                // tOne1.BL_FILE_URL = '';

                if (tRet0.length > 0) {
                    tObj.BL_FILE = tRet0[0].NAME;
                    // tOne1.BL_FILE_URL = tRet0[0].URL;
                }

                tRetArray.push(tObj);
            }

            var tRetData = {};
            var tIdx = 0;
            return tRetArray;
        },
    },
};

export default moduleQuery_S0437_3_3;
