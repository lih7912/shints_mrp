import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_AF_S001_2_1 = {
    Query: {
        mgrQueryAF_S001_2_1: async (_, args, contextValue) => {
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tRetArray = [];
            let sqlStr0 = `
                select
                    *
                from
                    AF_WORKOUT_MST
                where
                    user_id = '${tUserInfo.USER_ID}'
                    and kind = '${args.data.KIND}'
                    -- and kind2 = '${args.data.KIND2}'
                order by
                    REG_DATETIME DESC
            `;
            var tRet0 = await prisma.$queryRaw(Prisma.raw(sqlStr0));
            var tIdx0 = 0;
            for (tIdx0 = 0; tIdx0 < tRet0.length; tIdx0++) {
                var tOnePo = { ...tRet0[tIdx0] };

                if (typeof tOnePo.id !== 'undefined') delete tOnePo.id;
                if (typeof tOnePo.__typename !== 'undefined')
                    delete tOnePo.__typename;

                tOnePo.MEMS = [];

                let sqlStr1 = `
                    select
                        *
                    from
                        AF_WORKOUT_MEM
                    where
                        user_id = '${tUserInfo.USER_ID}'
                        and kind = '${args.data.KIND}'
                        and kind2 = '${tOnePo.KIND2}'
                        and reg_datetime = '${tOnePo.REG_DATETIME}'
                    order by
                        WORK_SEQ
                `;
                var tRet1 = await prisma.$queryRaw(Prisma.raw(sqlStr1));

                var tIdx1 = 0;
                var tArray2 = [];
                for (tIdx1 = 0; tIdx1 < tRet1.length; tIdx1++) {
                    var tOnePo1 = { ...tRet1[tIdx1] };

                    if (typeof tOnePo1.id !== 'undefined') delete tOnePo1.id;
                    if (typeof tOnePo1.__typename !== 'undefined')
                        delete tOnePo1.__typename;
                    tArray2.push(tOnePo1);
                }
                tOnePo.MEMS = [...tArray2];

                tRetArray.push(tOnePo);
            }
            return tRetArray;
        },
    },
};

export default moduleQuery_AF_S001_2_1;
