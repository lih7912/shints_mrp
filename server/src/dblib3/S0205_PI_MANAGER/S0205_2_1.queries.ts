import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0205_2_1 = {
    Query: {
        mgrQueryS0205_2_1: async (_, args) => {
            var tSQL = '';
            if (args.data.BUYER_CD !== '') {
                tSQL += `and left(a.pi_cd, 2) = '${args.data.BUYER_CD}' `;
            }
            if (args.data.PI_CD !== '') {
                tSQL += `and a.pi_cd like  '%${args.data.PI_CD}%' `;
            }

            var tCurrDate = AFLib.getCurrTime().substring(0, 4);
            // var s_date = tCurrDate + '0101';
            var s_date = '20200101';
            var e_date = '99999999';
            if (args.data.S_REG_DATE !== '') s_date = args.data.S_REG_DATE;
            if (args.data.E_REG_DATE !== '') e_date = args.data.E_REG_DATE;

            let sqlStr = `
                select
                    a2.*,
                    a1.BUYER_CD,
                    a1.QTY,
                    a1.AMT,
                    a3.BUYER_NAME,
                    a4.CD_NAME as STATUS_NAME,
                    isnull(a5.NAME, '') as FILE_NAME,
                    isnull(a5.URL, '') as FILE_URL,
                    isnull(a5.OBJECT_NAME, '') as FILE_OBJECT,
                    a3.SHIP_ADDR1 as SHIP_ADDR1,
                    a3.SHIP_ADDR2 as SHIP_ADDR2,
                    a3.SHIP_ADDR2 as SHIP_ADDR3
                from
                    (
                        select
                            a.PI_CD,
                            a.STATUS_CD,
                            left(b.order_cd, 2) as BUYER_CD,
                            sum(b.qty) as QTY,
                            sum(b.qty * b.fob) as AMT
                        from
                            ksv_order_pimst a,
                            ksv_order_pimem b
                        where
                            a.pi_cd = b.pi_cd
                            and left(a.reg_datetime, 8) between '${s_date}' and '${e_date}'  ${tSQL}
                            -- and a.pi_cd in (select distinct pi_cd from ksv_order_pimem where order_cd = '')
                        group by
                            a.pi_cd,
                            a.STATUS_CD,
                            left(b.order_cd, 2)
                    ) a1
                    inner join ksv_order_pimst a2 on a2.pi_cd = a1.PI_CD
                    inner join kcd_buyer a3 on a3.buyer_cd = a1.BUYER_CD
                    inner join kcd_code a4 on a4.cd_code = a1.STATUS_CD
                    and a4.cd_group = 'STATUS_CD'
                    left join kcd_fileinfo a5 on a5.file_key = a1.PI_CD
                    and a5.kind = 'PI'
                order by
                    a2.REG_DATETIME desc
                    -- offset 0 rows fetch next 1000 rows only
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                PI_CD: '',
                MESSERS: '',
                ADDR1: '',
                ADDR2: '',
                CONSIGNEE: '',
                CADDR1: '',
                CADDR2: '',
                PRICE_TERM: '',
                DESTINATION: '',
                PORT: '',
                BANK_CD: '',
                PAY_TYPE_CD: '',
                BVT_FLAG: '',
                PI_REMARK1: '',
                PI_REMARK2: '',
                PI_REMARK3: '',
                PI_REMARK4: '',
                PI_REMARK5: '',
                PI_REMARK6: '',
                PI_REMARK7: '',
                PI_REMARK8: '',
                YY: 0,
                SEQ: 0,
                STATUS_CD: '',
                REG_USER: '',
                REG_DATETIME: '',
                UPD_USER: '',
                UPD_DATETIME: '',
                PAY_RULE: 0,
                id: 0,
                ETC99: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S0205_2_1;
