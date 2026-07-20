import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0440_3_1 = {
    Query: {
        mgrQueryS0440_3_1: async (_, args) => {
            var tSQL = '';
            if (args.data.STYLE_CD !== '') {
                tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
            }
            let sqlStr = `
                select
                    A.*,
                    B.CD_NAME as SHIP_MODE_N
                from
                    ksv_shipment_mst A,
                    kcd_code B
                where
                    A.status_cd = '0'
                    and (
                        A.fix_flag is null
                        or a.fix_flag = ''
                    )
                    and A.SHIP_MODE = B.CD_CODE
                    and B.CD_GROUP = 'SHIPMENT_SHIP_MODE'
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetArray = [];
            var tIdx = 0;
            return tRet;
        },
    },
};

export default moduleQuery_S0440_3_1;
