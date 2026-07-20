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
const moduleMutation_S0411_6 = {
    Mutation: {
        mgrInsert_S0411_6: async (_, args, contextValue) => {
            //
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
            var tInput = { ...args.datas[0] };
            var tInput1 = { ...args.datas1 };

            if (
                tInput1.DELIVERY_TYPE === '7' ||
                tInput1.DELIVERY_TYPE === '6' ||
                tInput1.DELIVERY_TYPE === 'D' ||
                tInput1.DELIVERY_TYPE === 'A' ||
                tInput1.DELIVERY_TYPE === '42' ||
                tInput1.DELIVERY_TYPE === '31'
            ) {
                tRetDate1 += 'OUT';
            }

            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var tSQLArray = [];
                var tInputOne = { ...args.datas[tIdx] };

                if (tInputOne.OUTPUT_FLAG === 'Y') {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = 'ERROR:already output data';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }

                var m_FromStock = '';
                if (tInputOne.FACTORY_CD === 'FC034') m_FromStock = 'STOCK BVT';
                else if (tInputOne.FACTORY_CD === 'FC044')
                    m_FromStock = 'STOCK ETP';
                else m_FromStock = 'STOCK';

                var m_PoSeq = 0;
                var m_MrpSeq = 0;
                var m_MatlSeq = 1;

                let tSQL99 = `
                    insert into
                        ksv_stock_out (
                            po_cd,
                            po_seq,
                            order_cd,
                            matl_cd,
                            mrp_seq,
                            matl_seq,
                            in_datetime,
                            out_datetime,
                            out_qty,
                            out_type,
                            out_status,
                            pack_cd,
                            delivery_type,
                            ship_date,
                            ct_qty,
                            ct_no,
                            remark,
                            out_factory_cd,
                            status_cd,
                            reg_user,
                            reg_datetime,
                            stock_idx,
                            out_from
                        )
                    values
                        (
                            '${tInputOne.USE_PO_CD}',
                            ${m_PoSeq},
                            '${tInputOne.USE_ORDER_CD}',
                            '${tInputOne.USE_MATL_CD}',
                            ${m_MrpSeq},
                            ${m_MatlSeq},
                            '${tInputOne.USE_DATETIME.substring(0, 8)}',
                            '${tInputOne.USE_DATETIME.substring(0, 8)}',
                            ${tInputOne.OUT_QTY},
                            '${tInput1.TO_TYPE}',
                            '0',
                            '${tInput1.PL_NO}',
                            '${tInput1.DELIVERY_TYPE}',
                            '${tInput1.OUT_DATE}',
                            ${tInput1.CD_QTY},
                            '${tInput1.CT_NO}',
                            '${tInput1.REMARK}',
                            '${tInputOne.FACTORY_CD}',
                            '0',
                            '${tInput1.USER_ID}',
                            '${tRetDate}',
                            '${tInputOne.STOCK_IDX}',
                            '${m_FromStock}'
                        )
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    update ksv_stock_use
                    set
                        pack_cd = '${tInput1.PL_NO}',
                        output_flag = 'Y'
                    where
                        stock_idx = '${tInputOne.STOCK_IDX}'
                        and use_datetime = '${tInputOne.USE_DATETIME}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                var m_AirCharge = '';
                var m_ExpressCharge = '';

                if (
                    tInput1.DELIVERY_TYPE === '7' ||
                    tInput1.DELIVERY_TYPE === '1'
                ) {
                    let tSql0 = `
                        SELECT
                            charge
                        FROM
                            kzz_freight_charge
                        WHERE
                            frt_type = '4'
                            and reg_datetime = (
                                select
                                    max(reg_datetime)
                                from
                                    kzz_freight_charge
                                where
                                    frt_type = '4'
                            )
                    `;
                    var nRet0 = await prisma.$queryRaw(Prisma.raw(tSql0));
                    if (nRet0.length > 0) m_ExpressCharge = nRet0[0].charge;

                    let tSql0 = `
                        SELECT
                            charge
                        FROM
                            kzz_freight_charge
                        WHERE
                            frt_type = '3'
                            and reg_datetime = (
                                select
                                    max(reg_datetime)
                                from
                                    kzz_freight_charge
                                where
                                    frt_type = '3'
                            )
                    `;
                    var nRet0 = await prisma.$queryRaw(Prisma.raw(tSql0));
                    if (nRet0.length > 0) m_AirCharge = nRet0[0].charge;
                }

                var m_FrtType = '';
                var m_AreaType = '';
                var m_Weight = 0;
                var m_Amount = 0;
                var m_BLNo = 0;
                var m_BuyerCd = tInputOne.USE_ORDER_CD.substring(0, 2);
                if (
                    tInput1.DELIVERY_TYPE === '7' ||
                    tInput1.DELIVERY_TYPE === '6' ||
                    tInput1.DELIVERY_TYPE === 'D' ||
                    tInput1.DELIVERY_TYPE === 'A' ||
                    tInput1.DELIVERY_TYPE === '42' ||
                    tInput1.DELIVERY_TYPE === '31'
                ) {
                    if (tInput1.DELIVERY_TYPE === '7') {
                        m_FrtType = '4';
                        m_AreaType = '2';
                    } else if (tInput1.DELIVERY_TYPE === '6') {
                        m_FrtType = '41';
                        m_AreaType = '2';
                    } else if (tInput1.DELIVERY_TYPE === 'D') {
                        m_FrtType = '5';
                        m_AreaType = '2';
                    } else if (tInput1.DELIVERY_TYPE === 'A') {
                        m_FrtType = 'A';
                        m_AreaType = '2';
                    } else if (tInput1.DELIVERY_TYPE === '31') {
                        m_FrtType = '31';
                        m_AreaType = '3';
                    } else if (tInput1.DELIVERY_TYPE === '42') {
                        m_FrtType = '42';
                        m_AreaType = '3';
                    } else {
                        m_FrtType = '3';
                        m_AreaType = '2';
                    }
                    if (tIdx === 0) m_Weight = parseFloat(tInput1.Weight);
                    else m_Weight = 0;

                    if (tInput1.DELIVERY_TYPE === '7') {
                        m_Amount = m_Weight * m_ExpressCharge;
                        m_BLNo = tInputOne.PL_NO;
                    } else if (tInput1.DELIVERY_TYPe === '1') {
                        m_Amount = m_Weight * m_AirCharge;
                        m_BLNo = tInputOne.PL_NO;
                    }

                    let tSQL99 = `
				 INSERT INTO KZZ_FREIGHT (
				 FRT_DATE,TRADE_TYPE,departure,destination,FRT_TYPE,AREA_TYPE,MATL_TYPE,PO_CD,ORDER_CD,STYLE_CD,MATL_CD,unit,price,mw,garment_compo,qty 
				 ,SENDER,RECEIVER,SPEC,REMARK,po_seq,mrp_seq,in_datetime,REG_USER,REG_DATETIME,DELAY_REASON,
				 weight,weight_net,amount,net,vat,adp_check,bl_no,invoice_no,charge_kind,charge_code,buyer_cd) 
				 VALUES (
				 '${tInput1.OUT_DATE}','1','00',
				 '${tInputOne.FACTORY_CD}',
				 '${m_FrtType}',
				 '${m_AreaType}','M',
				 '${tInputOne.USE_PO_CD}',
				 '${tInputOne.USE_ORDER_CD}','',
				 '${tInputOne.USE_MATL_CD}','','','','',
				 ${tInputOne.OUT_QTY},
				 '${tInput1.SENDOR}',
				 '${tInput1.RECEIVER}',
				 '${tInputOne.MATL_NAME}',
				 '${tInput1.REMARK}',
				 ${m_PoSeq},
				 ${m_MrpSeq},
				 '${tInputOne.USE_DATETIME}',
				 '${tInput1.USER_ID}',
				 '${tRetDate1}',
				 '${tInput1.REASON_TYPE}',
				 ${tInput1.WEIGHT_CBM},'0',
				 ${m_Amount},'0','0','0',
				 '${m_BLNo}',
				 '${m_BLNo}',
				 '${tInput1.CHARGE1},
				 '${tInput1.CHARGE2}',
				 '${m_BuyerCd}') 
           `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }

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
                    tObj.CODE = 'ERROR:Output SQL Error';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED:Output Stock Out:' + args.datas.length;
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },
    },
};

export default moduleMutation_S0411_6;
