import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0114_1 = {
    Query: {
        mgrQueryS0114_1: async (_, args) => {
            var tSQL = '';
            if (args.data.VENDOR_CD !== '') {
                tSQL += `AND A.VENDOR_CD like '%${args.data.VENDOR_CD}%' `;
            }
            if (args.data.VENDOR_NAME !== '') {
                tSQL += `AND A.VENDOR_NAME like '%${args.data.VENDOR_NAME?.split(' ').join('%')}%' `;
            }
            if (args.data.VENDOR_TYPE !== '') {
                tSQL += `AND A.VENDOR_TYPE like '%${args.data.VENDOR_TYPE}%' `;
            }
            if (args.data.VENDOR_MATL_TYPE !== '') {
                tSQL += `AND A.VENDOR_MATL_TYPE like '%${args.data.VENDOR_MATL_TYPE}%' `;
            }
            if (args.data.STATUS_CD !== '') {
                tSQL += `AND A.STATUS_CD like '%${args.data.STATUS_CD}%' `;
            }
            if (args.data.REG_NO !== '') {
                tSQL += `AND A.REG_NO like '%${args.data.REG_NO}%' `;
            }
            if (args.data.COMPANY_NAME !== '') {
                tSQL += `AND A.INVOICE_NAME like '%${args.data.COMPANY_NAME?.split(' ').join('%')}%' `;
            }
            let sql = `
                select
                    *
                from
                    KCD_VENDOR
                order by
                    id desc
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sql));
            console.log(tRet[0]);

            let sqlStr = `
                SELECT
                    A.id,
                    A.VENDOR_CD,
                    A.VENDOR_NAME,
                    A.INVOICE_NAME,
                    C.CD_NAME AS VENDOR_TYPE_NAME,
                    A.VENDOR_TYPE,
                    F.CD_NAME AS VENDOR_MATL_TYPE_NAME,
                    A.VENDOR_MATL_TYPE,
                    --H.CD_NAME AS GW_STATUS_NAME,
                    A.GW,
                    A.REG_NO,
                    A.PRESIDENT,
                    A.USER_NAME,
                    A.PART,
                    A.RANK,
                    A.EMAIL,
                    A.TEL_NO,
                    A.FAX_NO,
                    A.PAY_TYPE,
                    A.PAY_TERM,
                    D.NAT_NAME,
                    A.NAT_CD,
                    A.ZIP_NO,
                    A.ADDR1,
                    A.ADDR2,
                    B.CD_NAME AS STATUS_NAME,
                    A.STATUS_CD,
                    A.REG_USER,
                    A.UPD_USER,
                    A.PERMIT,
                    --G.USER_NAME,
                    A.APPROKEY,
                    A.NEOE_NO,
                    A.LEAD_TIME,
                    A.REMARK,
                    A.OVERSHORT_RATE,
                    I.URL as imgURL,
                    I.NAME as fileName,
                    I.OBJECT_NAME as objectName,
                    J.CD_NAME as payCondition,
                    A.NSR_TR_CD
                FROM
                    KCD_VENDOR A
                    LEFT JOIN KCD_CODE B ON B.CD_GROUP = 'STATUS_CD'
                    AND B.CD_CODE = A.STATUS_CD
                    LEFT JOIN KCD_CODE C ON C.CD_GROUP = 'VENDOR_TYPE'
                    AND C.CD_CODE = A.VENDOR_TYPE
                    LEFT JOIN KCD_NATION D ON D.NAT_CD = A.NAT_CD
                    LEFT JOIN KCD_CODE F ON F.CD_GROUP = 'VENDOR_MATL_TYPE'
                    AND ISNULL(A.VENDOR_MATL_TYPE, '') = F.CD_CODE
                    LEFT JOIN KCD_USER G ON G.USER_ID = A.SHINTS_USER
                    LEFT JOIN KCD_CODE H ON H.CD_GROUP = 'GW_STATUS'
                    AND H.CD_CODE = A.GW
                    LEFT JOIN KCD_CODE J ON J.CD_GROUP = 'PAY_TYPE'
                    AND J.CD_CODE = A.PAY_TYPE
                    LEFT JOIN KCD_FILEINFO I ON A.VENDOR_CD = I.FILE_KEY
                WHERE
                    A.ID > 0 ${tSQL}
                ORDER BY
                    A.id desc
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

            console.log(tRet[1]);
            var tRetData = {
                VENDOR_CD: '',
                VENDOR_NAME: '',
                INVOICE_NAME: '',
                VENDOR_TYPE_NAME: '',
                VENDOR_MATL_TYPE_NAME: '',
                GW_STATUS_NAME: '',
                REG_NO: '',
                PRESIDENT: '',
                USER_NAME: '',
                PART: '',
                RANK: '',
                EMAIL: '',
                TEL_NO: '',
                FAX_NO: '',
                PAY_TYPE: '',
                NAT_NAME: '',
                ZIP_NO: '',
                ADDR1: '',
                ADDR2: '',
                STATUS_NAME: '',
                REG_USER: '',
                PERMIT: '',
                APPROKEY: '',
                NEOE_NO: '',
                LEAD_TIME: '',
                REMARK: '',
                ETC99: '',
            };
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S0114_1;
