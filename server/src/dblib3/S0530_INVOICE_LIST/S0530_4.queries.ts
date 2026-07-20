import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_S0530_4 = {
    Query: {
        mgrQueryS0530_4: async (_, args) => {
            var tSQL = '';
            if (args.data.BUYER_CD !== '') {
                tSQL += `AND left(B.ORDER_CD, 2) = '${args.data.BUYER_CD}' `;
            }
            let sqlStr = `
                SELECT
                    B.ORDER_CD,
                    B.PROD_CD,
                    C.COLOR,
                    B.PRICE,
                    B.TOT_CNT,
                    ISNULL(D.SHIP_CNT, 0) AS SHIP_CNT,
                    B.SIZE_CNT as ORDER_SIZE_CNT,
                    isnull(D.SIZE_CNT, '') as SHIP_SIZE_CNT,
                    A.SIZE_GROUP,
                    E.SIZE_MEMBER
                FROM
                    KSV_ORDER_MEM B
                    LEFT JOIN (
                        SELECT
                            ORDER_CD,
                            PROD_CD,
                            SIZE_CNT,
                            SHIP_CNT AS SHIP_CNT
                        FROM
                            KSV_ORDER_SHIP
                        WHERE
                            ORDER_CD like '${args.data.ORDER_CD}%'
                    ) D ON B.ORDER_CD = D.ORDER_CD
                    AND B.PROD_CD = D.PROD_CD,
                    KSV_PROD_MST C,
                    KSV_ORDER_MST A,
                    KCD_SIZE_MST E,
                    KCD_STYLE F
                WHERE
                    B.ORDER_CD like '${args.data.ORDER_CD}%'
                    AND left(B.ORDER_CD, 2) like '%${args.data.BUYER_CD}%'
                    AND B.ADD_FLAG = '0'
                    AND B.PROD_CD = C.PROD_CD
                    AND B.ORDER_CD = A.ORDER_CD
                    AND A.SIZE_GROUP = E.SIZE_GROUP
                    AND A.ORDER_TYPE in ('0', '1')
                    AND A.ORDER_STATUS in ('3', '5', '6')
                    AND A.STYLE_CD = F.STYLE_CD
                order by
                    b.order_cd,
                    b.prod_cd
            `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
            var tRetData = {
                ORDER_CD: '',
                PROD_CD: '',
                COLOR: '',
                PRICE: 0,
                TOT_CNT: 0,
                SIZE_CNT: '',
                SHIP_CNT: 0,
                SIZE_GROUP: '',
                SIZE_MEMBER: '',
                ETC99: '',
            };
            var tRetArray = [];

            var tSaveOrderCd = '';
            var tSaveProdCd = '';
            var tSaveObj = { ...tRet[0] };
            var tSizeArray = [];
            var tSizeCols = tSaveObj.SIZE_MEMBER.split(',');
            var tIdx = 0;
            for (tIdx = 0; tIdx < tSizeCols.length; tIdx++) {
                var tObj = {};
                tObj.size = tSizeCols[tIdx];
                tObj.size_val = 0;
                tSizeArray.push(tObj);
            }
            var tTotShipCnt = 0;
            tRet.forEach((col, i) => {
                if (i > 0) {
                    if (
                        tSaveOrderCd !== col.ORDER_CD ||
                        (tSaveOrderCd === col.ORDER_CD &&
                            tSaveProdCd !== col.PROD_CD)
                    ) {
                        var tShipSizeCnt = '';
                        tSizeArray.forEach((col1, i1) => {
                            var tVal = AFLib.printF(col1.size_val, 6);
                            tShipSizeCnt = tShipSizeCnt + tVal;
                        });
                        tSaveObj.SHIP_SIZE_CNT = tShipSizeCnt;
                        tSaveObj.SHIP_CNT = String(tTotShipCnt);
                        tRetArray.push(tSaveObj);
                        tSaveObj = { ...col };

                        tSizeArray = [];
                        tSizeCols = tSaveObj.SIZE_MEMBER.split(',');
                        tIdx = 0;
                        for (tIdx = 0; tIdx < tSizeCols.length; tIdx++) {
                            var tObj = {};
                            tObj.size = tSizeCols[tIdx];
                            tObj.size_val = 0;
                            tSizeArray.push(tObj);
                        }
                        tTotShipCnt = 0;
                    }
                }
                tIdx = 0;
                for (tIdx = 0; tIdx < tSizeCols.length; tIdx++) {
                    var tObj = { ...tSizeArray[tIdx] };
                    tObj.size_val += parseInt(
                        tSaveObj.SHIP_SIZE_CNT.substring(
                            tIdx * 6,
                            (tIdx + 1) * 6,
                        ),
                    );
                    tSizeArray[tIdx] = { ...tObj };
                }
                tTotShipCnt += parseInt(col.SHIP_CNT);
                tSaveOrderCd = col.ORDER_CD;
                tSaveProdCd = col.PROD_CD;
            });

            var tShipSizeCnt = '';
            tSizeArray.forEach((col1, i1) => {
                var tVal = AFLib.printF(col1.size_val, 6);
                tShipSizeCnt = tShipSizeCnt + tVal;
            });
            tSaveObj.SHIP_SIZE_CNT = tShipSizeCnt;
            tSaveObj.SHIP_CNT = String(tTotShipCnt);
            tRetArray.push(tSaveObj);

            return tRetArray;
        },
    },
};

export default moduleQuery_S0530_4;
