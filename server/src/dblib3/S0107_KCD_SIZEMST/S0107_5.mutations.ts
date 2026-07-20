// MGR_@@TNAME@@.mutations.js

import * as fs from 'fs';
import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기

/*
                STD_FLAG: String 
                NET: String 
                LOSS: String 
                USE_SIZE: String 
                REMARK: String 

*/

// export default로 Mutation 내용 내보내기
const moduleMutation_S0107_5 = {
    Mutation: {
        mgrInsert_S0107_5: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput1 = { ...args.datas1 };

            if (!tInput1.BUYER_CD || tInput1.BUYER_CD === ' ') {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = `ERROR: Buyer가 입력되지 않았습니다`;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tSQLArray = [];
            // console.log(args.datas);

            let nMemberArray = tInput1.SIZE_MEMBER.split(',');
            let nCnt = nMemberArray.length;
            // let sizeGroup = `${tInput1.BUYER_CD}_${tInput1.SIZE_GROUP}`;
            let sizeGroup = `SIZE-${tRetDate}`;

            var tSizeMember = tInput1.SIZE_MEMBER.replace(/ /gi, '');

            let tSQL99 = `
                INSERT INTO
                    KCD_SIZE_MST (
                        size_group,
                        size_group_name,
                        size_member,
                        size_cnt,
                        status_cd,
                        reg_user,
                        reg_datetime,
                        buyer_cd
                    )
                VALUES
                    (
                        '${sizeGroup}',
                        '${tInput1.SIZE_GROUP_NAME}',
                        '${tSizeMember}',
                        '${nCnt}',
                        '0',
                        '${tUserInfo.USER_ID}',
                        '${tRetDate}',
                        '${tInput1.BUYER_CD}'
                    )
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            nMemberArray.forEach((col, i) => {
                var tVal = col.trim();
                let tSQL99 = `
                    INSERT INTO
                        KCD_SIZE_MEM (SIZE_GROUP, SIZE_SEQ, SIZE_VAL, UNIT_RATE)
                    VALUES
                        ('${sizeGroup}', '${i + 1}', '${tVal}', 1.0)
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            });

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = `ERROR`;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED';
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },

        mgrUpdate_S0107_5: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);
            var tInput1 = { ...args.datas1 };

            if (!tInput1.BUYER_CD || tInput1.BUYER_CD === ' ') {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = `ERROR: Buyer가 입력되지 않았습니다`;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tSQL = `
                select
                    count(*) as cnt
                from
                    ksv_order_mst
                where
                    size_group = '${tInput1.SIZE_GROUP}'
            `;
            var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
            var tRet = nRet0[0];
            var tMaxSeq = tRet.cnt;
            if (tMaxSeq > 0) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = `ERROR:오더에 사용중인 size는 변경 불가함`;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tSQLArray = [];
            // console.log(args.datas);

            let nMemberArray = tInput1.SIZE_MEMBER.split(',');
            let nCnt = nMemberArray.length;
            // INSERT INTO KCD_SIZE_MEM
            // (SIZE_GROUP, SIZE_SEQ, SIZE_VAL, UNIT_RATE)
            // VALUES   (
            //    '${tInput1.SIZE_GROUP}'
            //    ,'${i+1}'
            //    ,'${col}'
            //    ,0.0
            // )

            var tSizeMember = tInput1.SIZE_MEMBER.replace(/ /gi, '');

            let tSQL99 = `
                update kcd_size_mst
                set
                    SIZE_GROUP_NAME = '${tInput1.SIZE_GROUP_NAME}',
                    SIZE_CNT = '${tInput1.SIZE_CNT}',
                    size_member = '${tSizeMember}',
                    status_cd = '${tInput1.STATUS_CD}',
                    -- buyer_cd = '${tInput1.BUYER_CD}',
                    -- REG_DATETIME = '${tInput1.REG_DATETIME}',
                    -- REG_USER = '${tUserInfo.USER_ID}',
                    UPD_DATETIME = '${tRetDate}',
                    UPD_USER = '${tUserInfo.USER_ID}'
                where
                    size_group = '${tInput1.SIZE_GROUP}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            let tSQL99 = `
                delete from kcd_size_mem
                where
                    size_group = '${tInput1.SIZE_GROUP}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            nMemberArray.forEach((col, i) => {
                var tVal = col.trim();

                let tSQL99 = `
                    INSERT INTO
                        KCD_SIZE_MEM (SIZE_GROUP, SIZE_SEQ, SIZE_VAL, UNIT_RATE)
                    VALUES
                        ('${tInput1.SIZE_GROUP}', '${i + 1}', '${col}', 1.0)
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            });

            try {
                global.currentTransactionInfo = {
                    contextValue: contextValue,
                    functionName: AFLib.getFunctionName(),
                };
                await prisma.$transaction(tSQLArray);
                delete global.currentTransactionInfo;
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = `ERROR`;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED';
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },

        mgrDelete_S0107_5: async (_, args, contextValue) => {
            // Update Location
            var tDateNew = new Date();
            tDateNew.setMonth(tDateNew.getMonth() + 1);
            var tZeroDate = '00';
            var tDateNew_M =
                tZeroDate.substring(
                    0,
                    2 - String(tDateNew.getMonth() + 1).length,
                ) + String(tDateNew.getMonth() + 1);
            var tDateNew_D =
                tZeroDate.substring(0, 2 - String(tDateNew.getDate()).length) +
                String(tDateNew.getMonth());
            var tNewDateStr = tDateNew.getFullYear() + tDateNew_M + tDateNew_D;

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
            var tRetDate1 = tRetDate.substring(0, 8);
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

            var tInput = { ...args.datas1 };

            var tSQL = `
                select
                    count(*) as cnt
                from
                    ksv_order_mst
                where
                    size_group = '${tInput.SIZE_GROUP}'
            `;
            var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));
            var tRet = nRet0[0];
            var tMaxSeq = tRet.cnt;
            if (tMaxSeq > 0) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = `ERROR`;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tSQLArray = [];
            // console.log(args.datas);

            let nMemberArray = tInput.SIZE_MEMBER.split(',');
            let nCnt = nMemberArray.length;

            let tSQL99 = `
                delete from kcd_size_mst
                where
                    id = '${tInput.id}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            let tSQL99 = `
                delete from kcd_size_mem
                where
                    size_group = '${tInput.SIZE_GROUP}'
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
            } catch (e) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = `ERROR`;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED';
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },
    },
};

export default moduleMutation_S0107_5;
