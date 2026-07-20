// MGR_@@TNAME@@.mutations.js

import * as fs from 'fs';
import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
const request_sync = require('sync-request');

/*
                STD_FLAG: String 
                NET: String 
                LOSS: String 
                USE_SIZE: String 
                REMARK: String 

*/

// export default로 Mutation 내용 내보내기
const moduleMutation_S0801_5 = {
    Mutation: {
        mgrInsert_S0801_5: async (_, args, contextValue) => {
            // 전표발행
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
            var tUserInfo = AFLib.getUserInfo(contextValue);

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
            var tInput1 = { ...args.datas[0] };
            var tInput2 = [...args.datas1];

            var tSQLArray = [];
            /*
      var tSQL = `
          select
              *
          from
              ksv_invoice_mst
          where
              invoice_no = '${tInput1.INVOICE_NO}'
      `;
      var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));

      if (nRet0.length <= 0) {
          var tRetArray = [];
          var tObj = {};
          tObj.CODE = 'ERROR:Not Exist Invoice';
          tObj.id = 0; 
          tRetArray.push(tObj);
          return (tRetArray);
      }
      var tInvoiceObj = { ...nRet0[0] };
*/
            var tDocuNo = 'DOCU_' + tRetDate;

            let tSQL99 = `
                update ksv_tax_mst
                set
                    docu_no = '${tDocuNo}',
                    acc_user = '${tUserInfo.USER_ID}'
                where
                    tax_cd = '${tInput1.TAX_CD}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            var tSQL = `
                select
                    *
                from
                    ksv_tax_mem
                where
                    tax_cd = '${tInput1.TAX_CD}'
            `;
            var nRet0 = await prisma.$queryRaw(Prisma.raw(tSQL));

            // nRet0.forEach((col, i) => {
            tInput2.forEach((col, i) => {
                let tSQL99 = `
                    update ksv_invoice_mst
                    set
                        docu_no = '${tDocuNo}'
                    where
                        invoice_no = '${col.INVOICE_NO}'
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
                tObj.CODE = 'ERROR:Regist Docu';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED:Regist Docu';
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },
        mgrInsert_S0801_5_DELETE_DOCU: async (_, args, contextValue) => {
/*
            let tSQL99 = `
                update ksv_tax_mst
                set
                    docu_no = '',
                    acc_user = ''
                where
                    tax_cd = '${tInput1.TAX_CD}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);
*/

            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            let sqlUser = `           
                select * from kcd_user where user_id = '${tUserInfo.USER_ID}'
              `;
            var retUser = await prisma.$queryRaw(Prisma.raw(sqlUser));
            if (retUser.length > 0 && retUser[0].PART === 'AC') {
                ;
            }  else {
                if (tUserInfo.USER_ID === 'won21kr' || tUserInfo.USER_ID === 'lih7912' || tUserInfo.USER_ID === 'chibumy') ;
                else {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = 'ERROR:재경팀만 처리가 가능합니다  ';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return (tRetArray);
                }
            }


            var tInput1 = { ...args.datas[0] };
            var tInput2 = [ ...args.datas1  ];

            var tSQLArray = [];

            let sql0_1 = `           
                select db_name() as db_name
              `;
            var tRet0_1 = await prisma.$queryRaw(Prisma.raw(sql0_1));
            var tDbName = '';
            if (tRet0_1.length > 0) tDbName = tRet0_1[0].db_name;
            console.log(`Database Name:${tDbName}`);

            let sqlTax = `           
                select * from ksv_tax_mst
                where tax_cd = '${tInput1.TAX_CD}'
              `;
            var retTax = await prisma.$queryRaw(Prisma.raw(sqlTax));
            if (retTax.length <= 0) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:처리할 데이터가 없습니다';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
            var objTax = { ...retTax[0] };
            if (!objTax.DOCU_NO)  {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:등록된 전표가 없습니다';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tIdx = 0;
            for (tIdx = 0; tIdx < tInput2.length; tIdx++) {
                var tOne = { ...tInput2[tIdx] };

                let sql0 = `
                    select
                        isnull(count(*), 0) as c_cnt
                    from
                        ksv_invoice_bill
                    where
                        invoice_no = '${tOne.INVOICE_NO}'
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                if (tRet0.length > 0) {
                    if (tRet0[0].c_cnt > 0) {
                        var tRetArray = [];
                        var tObj = {};
                        tObj.CODE =
                            'ERROR:이미 지급처리된 Invoice는 취소처리할수 없습니다';
                        tObj.id = 0;
                        tRetArray.push(tObj);
                        return tRetArray;
                    }
                }
            }

            console.log(`Step-2`);

            //
            var requestArray = {};
            var res_sync = request_sync(
                'POST',
                `https://erp.shints.com:3311/restapi/del_docuseq/${objTax.DOCU_NO}/${tDbName}`,
                {
                   json: requestArray,
                },
            );

            var tResData = JSON.parse(res_sync.getBody('utf8'));
            console.log(`del_docuseq response: ${tResData}`);

            if (tResData.length <= 0) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:더존 연결 에러입니다.(전산부 문의)';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tResObj = { ...tResData[0] };
            if (tResObj.MESSAGE.includes('SUCC')) {
                ;
            } else {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = tResObj.MESSAGE;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            let tSQL99 = `
                update ksv_tax_mst
                set
                    docu_no = '',
                    acc_user = ''
                where
                    tax_cd= '${objTax.TAX_CD}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            /*
            let tSQL99 = `
                delete from neoe_fi_adocu
                where
                    no_docu = '${tInput2.DOCU_NO}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);
            */

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
                tObj.CODE = 'ERROR:Delete Docu';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED:Delete Docu';
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },

        mgrInsert_S0801_5_INSERT_DOCU: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput1 = { ...args.datas[0] };
            var tInput2 = [...args.datas1];

            var tIdx0 = 0;
            var tInvoiceArray = '';
            var m_strDocuNo = '';
            for (tIdx0 = 0; tIdx0 < args.datas1.length; tIdx0++) {
                var tOne = { ...args.datas1[tIdx0] };
                if (tIdx0 === 0) tInvoiceArray += `${tOne.INVOICE_NO}`;
                else tInvoiceArray += `/${tOne.INVOICE_NO}`;
            }
            // 나중에 수정. 260304.
            tInvoiceArray = args.datas1[0].INVOICE_NO;

            let sqlUser = `           
                select * from kcd_user where user_id = '${tUserInfo.USER_ID}'
              `;
            var retUser = await prisma.$queryRaw(Prisma.raw(sqlUser));
            if (retUser.length > 0 && retUser[0].PART === 'AC') {
                ;
            }  else {
                if (tUserInfo.USER_ID === 'won21kr' || tUserInfo.USER_ID === 'lih7912' || tUserInfo.USER_ID === 'chibumy') ;
                else {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = 'ERROR:재경팀만 처리가 가능합니다  ';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return (tRetArray);
                }
            }

            let sql0_1 = `           
                select db_name() as db_name
              `;
            var tRet0_1 = await prisma.$queryRaw(Prisma.raw(sql0_1));
            var tDbName = '';
            if (tRet0_1.length > 0) tDbName = tRet0_1[0].db_name;
            console.log(`Database Name:${tDbName}`);

            /*
            if (tDbName.includes('shints')) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:기능 테스트 중입니다. 테스트 환경에서만 실행됩니다 ';
                tObj.id = 0;
                tRetArray.push(tObj);
                return (tRetArray);
           }
           */

            let sqlBuyer = `
                select 
                      isnull(NEOE_BUYER_CD, '') as NEOE_BUYER_CD,
                      isnull(NEOE_BUYER_CD_MOM, '') as NEOE_BUYER_CD_MON
                from  kcd_buyer
                where buyer_cd = '${tInput1.BUYER_CD}'
            `;
            var retBuyer = await prisma.$queryRaw(Prisma.raw(sqlBuyer));
            if (retBuyer.length <= 0) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:없는 바이어입니다. 바이어를 확인하세요 ';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
            if (!retBuyer[0].NEOE_BUYER_CD) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Buyer에 NEOE code을 입력되지 않았습니다 ';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            } 

            let sqlTaxMst = `
                select
                    *
                from
                    ksv_tax_mst
                where
                    tax_cd = '${tInput1.TAX_CD}'
            `;
            var retTaxMst = await prisma.$queryRaw(Prisma.raw(sqlTaxMst));
            var objTaxMst = {};
            if (retTaxMst.length <= 0) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = 'ERROR:Tax#을 확인해 주세요. 없는 데이터입니다 ';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
            objTaxMst = { ...retTaxMst[0] };
            objTaxMst.BILL_DATE = tInput1.BILL_DATE;

            var requestArray = [];
            var strDocuNo = '';

            var tNoDocuLine = 1;
            var tSQLArray = [];

            var tWObj = {};
            tWObj.DATA1 = [];
            tWObj.DATA2 = [];
            tWObj.DATA3 = [];

            var strMaxDocuNo = '';
            var strDocuNo = '';
            var strTaxNo = '';
            var strNeoeAgentCd = tInput1.NEOE_BUYER_CD;
            var strNeoeAgentName = '';
            var strNeoeA23 = tInput1.NEOE_CD;
            var strNeoeA23Name = '';
            var strRegdatetime = tRetDate;
            var strDocuDate = objTaxMst.BILL_DATE;
            var strUsdAmt = '0';
            var strInvoiceNo = '';
            var strCurrCd = 'KRW';
            var strBuyerCd = tInput1.BUYER_CD;
            var strBuyerTeam = '';
            var strA23Code = '';
            var strNeoeBuyerMom = '';
            var strMomBuyer = '';
            var strNeoeBuyerName = '';
            var strNeoeCurrCd = '';
            var strRateBase = '';
            var strMomBuyerName = '';
            var strCC = '';
            var strCCName = '';
            var strMngPart = '';
            var strMngId = '';
            var strMngName = '';
            var strMngEmail = '';
            var strMngTel = '';
            var strA23Name = '';
            var strMaxDocuNo = 0;
            var strDocuNo = '';
            var strTaxNo = '';
            var strBuyerAbbr = '';

            // 넘어온 데이터를 Invoice 별로 합산함 : won. 260403
            var tIdx = 0;
            var tResultArray = [];
            var tSaveObj = { ...args.datas1[0] };
            for (tIdx = 1; tIdx < args.datas1.length; tIdx++) {
                var tOne = { ...args.datas1[tIdx] };
                if (tOne.INVOICE_NO !== tSaveObj.INVOICE_NO) {
                    tResultArray.push(tSaveObj);
                    tSaveObj = { ...tOne };
                } else {
                    var tShipQty = parseFloat(tSaveObj.SHIP_QTY);
                        tShipQty += parseFloat(tOne.SHIP_QTY);
                        tSaveObj.SHIP_QTY = tShipQty.toFixed(2);

                    var tPayQty = parseFloat(tSaveObj.PAY_QTY);
                        tPayQty += parseFloat(tOne.PAY_QTY);
                        tSaveObj.PAY_QTY = tPayQty.toFixed(2);

                    var tPayAmt = parseFloat(tSaveObj.PAY_AMT);
                        tPayAmt += parseFloat(tOne.PAY_AMT);
                        tSaveObj.PAY_AMT = tPayAmt.toFixed(2);

                    var tKrwShipAmount = parseFloat(tSaveObj.KRW_SHIP_AMOUNT);
                        tKrwShipAmount += parseFloat(tOne.KRW_SHIP_AMOUNT);
                        tSaveObj.KRW_SHIP_AMOUNT = tKrwShipAmount.toFixed(2);

                    var tKrwTaxAmount = parseFloat(tSaveObj.KRW_TAX_AMOUNT);
                        tKrwTaxAmount += parseFloat(tOne.KRW_TAX_AMOUNT);
                        tSaveObj.KRW_TAX_AMOUNT = tKrwTaxAmount.toFixed(2);

                    var tKrwTotAmount = parseFloat(tSaveObj.KRW_TOT_AMOUNT);
                        tKrwTotAmount += parseFloat(tOne.KRW_TOT_AMOUNT);
                        tSaveObj.KRW_TOT_AMOUNT = tKrwTotAmount.toFixed(2);
                }
            }
            tResultArray.push(tSaveObj);

            // 차변
            var tIdx = 0;
            var tTotal1 = 0;
            for (tIdx = 0; tIdx < tResultArray.length; tIdx++) {
                var tOne = { ...tResultArray[tIdx] };

                strUsdAmt = tOne.KRW_SHIP_AMOUNT;
                strInvoiceNo = tOne.INVOICE_NO;

                let sql0 = `
                    select
                        cd_sysdef
                        -- from neoe.neoe.ma_codedtl
                    from
                        NEOE_MA_CODEDTL
                    where
                        cd_field = 'MA_B000005'
                        -- and cd_company = '1000'
                        and nm_sysdef = '${strCurrCd}'
                `;
                var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
                strNeoeCurrCd = '';
                if (tRet0.length > 0) strNeoeCurrCd = tRet0[0].cd_sysdef;

                let sql1 = `
                    select
                        rate_base
                        -- from neoe.neoe.ma_exchange
                    from
                        neoe_ma_exchange
                    where
                        curr_sour = '${strNeoeCurrCd}'
                        -- and   yymmdd = '${strDocuDate}'
                `;
                var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
                strRateBase = '1';
                if (tRet1.length > 0) strRateBase = tRet1[0].rate_base;

                let sql1_1 = `
                    select
                        won_amt
                    from
                        kcd_currency
                    where
                        curr_cd = '${strCurrCd}'
                        and start_date = (
                            select
                                max(start_date)
                            from
                                kcd_currency
                            where
                                curr_cd = '${strCurrCd}'
                        )
                `;
                var tRet1_1 = await prisma.$queryRaw(Prisma.raw(sql1_1));
                if (tRet1_1.length > 0)
                    strRateBase = parseFloat(tRet1_1[0].won_amt);

                let sql2 = `
                    select
                        buyer_team,
                        neoe_a23,
                        neoe_buyer_cd_mom,
                        mom_cd,
                        buyer_abbr
                    from
                        kcd_buyer
                    where
                        buyer_cd = '${strBuyerCd}'
                `;
                var tRet2 = await prisma.$queryRaw(Prisma.raw(sql2));
                strBuyerTeam = '';
                strA23Code = '';
                strNeoeBuyerMom = '';
                strMomBuyer = '';
                strNeoeBuyerName = '';
                if (tRet2.length > 0) {
                    strBuyerTeam = tRet2[0].buyer_team;
                    strA23Code = tRet2[0].neoe_a23;
                    strNeoeBuyerMom = tRet2[0].neoe_buyer_cd_mom;
                    strMomBuyer = tRet2[0].mom_cd;
                    strBuyerAbbr = tRet2[0].buyer_abbr;
                    if (strMomBuyer.trim() === '') {
                        strMomBuyer = strBuyerCd;
                    }
                }

                let sql3 = `
                    select
                        buyer_name
                    from
                        kcd_buyer
                    where
                        buyer_cd = '${strMomBuyer}'
                `;
                var tRet3 = await prisma.$queryRaw(Prisma.raw(sql3));
                strMomBuyerName = '';
                if (tRet3.length > 0) {
                    strMomBuyerName = tRet3[0].buyer_name;
                    strNeoeBuyerName = strMomBuyerName;
                    strNeoeAgentName = strMomBuyerName;
                } else {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = 'ERROR:Buyer Team 등록이 필요합니다';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }

                let sql4 = `
                    select
                        cd_code,
                        cd_name
                    from
                        kcd_code
                    where
                        cd_group = 'BUYER_TEAM_NEOE'
                        and cd_flag = '${strBuyerTeam}'
                `;
                var tRet4 = await prisma.$queryRaw(Prisma.raw(sql4));
                strCC = '';
                strCCName = '';
                if (tRet4.length > 0) {
                    strCC = tRet4[0].cd_code;
                    strCCName = tRet4[0].cd_name;
                }

                let sql5 = `
                    select
                        cd_code,
                        cd_name
                    from
                        kcd_code
                    where
                        cd_group = 'DOCU_MNG'
                `;
                var tRet5 = await prisma.$queryRaw(Prisma.raw(sql5));
                strMngPart = '';
                strMngId = '';
                strMngName = '';
                strMngEmail = '';
                strMngTel = '';
                tRet5.forEach((col, i) => {
                    if (col.cd_code === 'PART') strMngPart = col.cd_name;
                    if (col.cd_code === 'ID') strMngId = col.cd_name;
                    if (col.cd_code === 'NAME') strMngName = col.cd_name;
                    if (col.cd_code === 'EMAIL') strMngEmail = col.cd_name;
                    if (col.cd_code === 'TEL') strMngTel = col.cd_name;
                });

                let sql6 = `
                    select
                        nm_mngd
                        -- from neoe.neoe.fi_mngd
                    from
                        neoe_fi_mngd
                    where
                        cd_mngd = '${strA23Code}'
                        -- and cd_mng='a23' 
                        -- and cd_company='1000'
                `;
                var tRet6 = await prisma.$queryRaw(Prisma.raw(sql6));
                strA23Name = '';
                if (tRet6.length > 0) strA23Name = tRet6[0].nm_mngd;

                let sql7 = `
                    select
                        isnull(max(no_docu), '00000') as max_seq
                        -- from neoe.neoe.fi_adocu
                    from
                        neoe_fi_adocu
                    where
                        no_docu like 'IS${strDocuDate}%'
                `;
                var tRet7 = await prisma.$queryRaw(Prisma.raw(sql7));
                var tMaxDocuNo = 1;
                if (tRet7[0].max_seq === '00000') {
                    tMaxDocuNo = parseFloat(tRet7[0].max_seq) + 1;
                } else {
                    tMaxDocuNo =
                        parseFloat(tRet7[0].max_seq.substring(10, 15)) + 1;
                }
                strMaxDocuNo = AFLib.printF(tMaxDocuNo, 5);
                strDocuNo = `IS${strDocuDate}${strMaxDocuNo}`;
                strTaxNo = `${strDocuNo}001`;
                strTaxNo = ``;

                m_strDocuNo = strDocuNo;
                /*
                 */

                var tNmNote = ``;
                if (tOne.INVOICE_NO.substring(0, 2) === 'DN') {
                    let sql7_1 = `
                        select
                            *
                        from
                            ksv_crdb_mst
                        where
                            crdb_cd = '${tOne.INVOICE_NO}'
                    `;
                    var tRet7_1 = await prisma.$queryRaw(Prisma.raw(sql7_1));
                    if (tRet7_1.length > 0) {
                        tNmNote = ``;
                        if (tDbName === 'shints')
                            tNmNote = `${tOne.INVOICE_NO} ${tRet7_1[0].TITLE} DEBIT  ${tInput1.TAX_CD} `;
                        else
                            tNmNote = `${tOne.INVOICE_NO} ${tRet7_1[0].TITLE} DEBIT  ${tInput1.TAX_CD}(AF Test삭제요`;
                    }
                } else {
                    if (tDbName === 'shints')
                        tNmNote = `제품매출 ${tInput1.BUYER_CD} ${tOne.INVOICE_NO} ${tInput1.TAX_CD} `;
                    else
                        tNmNote = `제품매출 ${tInput1.BUYER_CD} ${tOne.INVOICE_NO} ${tInput1.TAX_CD} (AF Test삭제요)`;
                }

                // var tTotAmt = parseFloat(strUsdAmt) * parseFloat(strRateBase);
                /*
          var tTotAmt = parseFloat(strUsdAmt);
          var strTotAmt = String(tTotAmt);
          var strOrgAmt = String(tTotAmt);
          var tVat = parseFloat(tOne.KRW_TAX_AMOUNT);
          var strVat =String(tVat); // tOne.KRW_TAX_AMOUNT
          var tTotTot = tTotAmt + tVat; 
          var strTotTot = String(tTotTot);
          */

                var tTotAmt = parseFloat(tOne.KRW_TOT_AMOUNT); // 총금액: 지불금액 + 세금
                var tPayAmt = parseFloat(tOne.KRW_SHIP_AMOUNT); // 원화
                var tOrgAmt = tPayAmt; // 원화폐 금액
                var tVatAmt = parseFloat(tOne.KRW_TAX_AMOUNT); // 원화폐 금액

                /*
          if (strCurrCd === 'KRW') {
              tTotAmt = AFLib.getFloat(strUsdAmt, 0);
              tOrgAmt = AFLib.getFloat(strUsdAmt, 0);
          } else {
              tTotAmt = parseFloat(strUsdAmt) * parseFloat(strRateBase);
              tTotAmt = AFLib.getFloat(tTotAmt, 0);
              tOrgAmt = AFLib.getFloat(strUsdAmt, 4);
          }
          */

                var strTotAmt = String(tTotAmt);
                var strPayAmt = String(tPayAmt);
                var strOrgAmt = String(tOrgAmt);
                var strVatAmt = String(tVatAmt);

                var tInObj = {};

                tInObj.row_id = strDocuNo;
                tInObj.row_no = tNoDocuLine;
                tInObj.no_tax = '*';

                tInObj.no_docu = strDocuNo;
                tInObj.no_doline = tNoDocuLine;
                tNoDocuLine += 1;
                tInObj.cd_pc = '1000';
                tInObj.cd_company = '1000';
                tInObj.cd_wdept = strMngPart; // 84000
                tInObj.id_write = strMngId; // 2217
                tInObj.dt_acct = strDocuDate;
                tInObj.no_acct = '0';
                tInObj.tp_docu = 'N';
                tInObj.cd_docu = '11';
                tInObj.st_docu = '1';
                tInObj.tp_drcr = '1';
                tInObj.cd_acct = '10801'; // 원화외상매출금
                tInObj.nm_note = tNmNote;
                tInObj.amt = strTotAmt;
                tTotal1 += parseFloat(strTotAmt);

                tInObj.cd_partner = strNeoeBuyerMom;
                tInObj.dt_start = strDocuDate;
                tInObj.dt_end = '';
                tInObj.am_taxstd = '0';
                tInObj.am_addtax = '0';
                tInObj.tp_tax = '';
                tInObj.no_company = '';
                tInObj.cd_bizarea = '';
                tInObj.cd_cc = '';
                tInObj.ucd_mng1 = '';
                tInObj.ucd_mng2 = '';
                tInObj.ucd_mng3 = '';
                tInObj.ucd_mng4 = '';
                tInObj.ucd_mng5 = '';
                tInObj.cd_exch = strNeoeCurrCd;
                tInObj.rt_exch = strRateBase;
                if (strCurrCd === 'KRW') tInObj.am_ex = '0';
                else tInObj.am_ex = strUsdAmt;
                tInObj.no_to = '';
                tInObj.dt_shipping = '';
                tInObj.tp_gubun = '3';
                tInObj.md_tax1 = '';
                tInObj.nm_item1 = '';
                tInObj.nm_size1 = '';
                tInObj.qt_tax1 = '0';
                tInObj.am_prc1 = '0';
                tInObj.am_supply1 = '0';
                tInObj.am_tax1 = '0';
                tInObj.nm_note1 = '';
                tInObj.cd_mngd1 = strNeoeBuyerMom;
                tInObj.nm_mngd1 = strNeoeBuyerName;
                tInObj.cd_mngd2 = '';
                tInObj.nm_mngd2 = '';
                tInObj.cd_mngd3 = '';
                tInObj.nm_mngd3 = '';
                tInObj.cd_mngd4 = strNeoeCurrCd;
                tInObj.nm_mngd4 = strCurrCd;
                tInObj.cd_mngd5 = '';
                tInObj.nm_mngd5 = strRateBase;
                tInObj.cd_mngd6 = '';
                tInObj.nm_mngd6 = strTotAmt;
                tInObj.cd_mngd7 = '';
                tInObj.nm_mngd7 = '';
                tInObj.cd_mngd8 = '';
                tInObj.nm_mngd8 = '';
                tInObj.yn_iss = '0';
                tInObj.final_status = '00';
                tInObj.no_bill = '';
                let tSQL99 = AFLib.createTableSql('neoe_fi_adocu', tInObj);
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                tInObj.AF_A23_CODE = strA23Code;
                tWObj.DATA1.push(tInObj);
            }

            var tTotal2 = 0;
            // 부가세
            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var tOne = { ...args.datas[tIdx] };

                var strTaxNo = `${strDocuNo}001`;
                m_strDocuNo = strDocuNo;
                /*
                 */

                let tSQL99 = `
                    update ksv_tax_mst
                    set
                        docu_no = '${strDocuNo}',
                        acc_user = '${tUserInfo.USER_ID}'
                    where
                        tax_cd = '${tOne.TAX_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                // tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    update ksv_invoice_mst
                    set
                        docu_no = '${tOne.DOCU_NO}'
                    where
                        invoice_no in (
                            select distinct
                                invoice_no
                            from
                                ksv_tax_mem
                            where
                                tax_cd = '${tOne.TAX_CD}'
                        )
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                // tSQLArray.push(tSQL99_1);

                var tNmNote = ``;
                if (tDbName === 'shints')
                    tNmNote = `제품매출 ${tInput1.BUYER_CD} ${tInvoiceArray} ${tOne.TAX_CD} `;
                else
                    tNmNote = `제품매출 ${tInput1.BUYER_CD} ${tInvoiceArray} ${tOne.TAX_CD} (AF Test 삭제요)`;
                var tNmNote = ``;
                if (tDbName === 'shints')
                    tNmNote = `제품매출 ${tInput1.BUYER_CD} ${tInvoiceArray} ${tOne.TAX_CD} `;
                else
                    tNmNote = `제품매출 ${tInput1.BUYER_CD} ${tInvoiceArray} ${tOne.TAX_CD} (AF Test 삭제요)`;

                // var tTotAmt = parseFloat(strUsdAmt) * parseFloat(strRateBase);
                /*
          var tTotAmt = parseFloat(strUsdAmt);
          var strTotAmt = String(tTotAmt);
          var strOrgAmt = String(tTotAmt);
          var tVat = parseFloat(tOne.KRW_TAX_AMOUNT);
          var strVat =String(tVat); // tOne.KRW_TAX_AMOUNT
          var tTotTot = tTotAmt + tVat; 
          var strTotTot = String(tTotTot);
          */
                var tTotAmt = parseFloat(tOne.KRW_TOT_AMOUNT); // 총금액: 지불금액 + 세금

                var tPayAmt = parseFloat(tOne.KRW_PAY_AMOUNT); // 원화
                var tOrgAmt = tPayAmt; // 원화폐 금액
                var tVatAmt = parseFloat(tOne.KRW_TAX_AMOUNT); // 원화폐 금액

                /*
          if (strCurrCd === 'KRW') {
              tTotAmt = AFLib.getFloat(strUsdAmt, 0);
              tOrgAmt = AFLib.getFloat(strUsdAmt, 0);
          } else {
              tTotAmt = parseFloat(strUsdAmt) * parseFloat(strRateBase);
              tTotAmt = AFLib.getFloat(tTotAmt, 0);
              tOrgAmt = AFLib.getFloat(strUsdAmt, 4);
          }
          */

                var strTotAmt = String(tTotAmt);
                var strPayAmt = String(tPayAmt);
                var strOrgAmt = String(tOrgAmt);
                var strVatAmt = String(tVatAmt);

                var strTaxCd = '';
                var strTaxNm = '';
                var strAcct = '';

                if (parseFloat(strVatAmt) > 0) {
                    strTaxCd = '11'; // 과세
                    strTaxNm = '과세(계산서)'; // 과세
                    strAcct = '25500';
                } else {
                    strTaxCd = '26'; // 면세
                    strTaxNm = '면세(계산서)'; // 과세
                    strAcct = '25500';
                }
                /*
          if (parseFloat(strVatAmt) > 0) {
              strTaxCd = '21';  // 과세
              strTaxNm = '과세(계산서)';  // 과세
              strAcct = '13500';
          } else {
              strTaxCd = '15';  // 영세
              strTaxNm = '영세(수출)';  // 과세
              strAcct = '25500';
          } 
          */

                // 부가세
                tInObj = {};
                tInObj.row_id = strDocuNo;
                tInObj.row_no = tNoDocuLine;
                tInObj.no_tax = `${strDocuNo}001`;
                tInObj.cd_pc = '1000';
                tInObj.cd_wdept = strMngPart; // 84000
                tInObj.no_docu = strDocuNo;
                tInObj.no_doline = tNoDocuLine;
                tNoDocuLine += 1;
                tInObj.cd_company = '1000';
                tInObj.id_write = strMngId; // 2217
                tInObj.cd_docu = '11';
                tInObj.dt_acct = strDocuDate;
                tInObj.st_docu = '1';
                tInObj.tp_drcr = '2';
                tInObj.cd_acct = strAcct;
                tInObj.amt = strVatAmt;
                tTotal2 += parseFloat(strVatAmt);

                tInObj.cd_partner = strNeoeBuyerMom;
                tInObj.dt_start = strDocuDate;
                tInObj.dt_end = '';
                tInObj.am_taxstd = strPayAmt; // 공급가액
                tInObj.am_addtax = strVatAmt;
                tInObj.tp_tax = strTaxCd;
                tInObj.no_company = '';
                tInObj.nm_note = tNmNote;
                tInObj.cd_bizarea = '1000';
                tInObj.cd_cc = '';
                tInObj.ucd_mng1 = '';
                tInObj.ucd_mng2 = '';
                tInObj.ucd_mng3 = '';
                tInObj.ucd_mng4 = '';
                tInObj.ucd_mng5 = '';
                tInObj.tp_docu = 'N';
                tInObj.no_acct = '0';
                tInObj.cd_exch = strNeoeCurrCd;
                tInObj.rt_exch = strRateBase;
                if (strCurrCd === 'KRW') tInObj.am_ex = '0';
                else tInObj.am_ex = strUsdAmt;
                tInObj.no_to = '';
                tInObj.dt_shipping = ''; // Shipp date
                tInObj.tp_gubun = '3';
                tInObj.md_tax1 = '1201';
                tInObj.nm_item1 = '제품';
                tInObj.nm_size1 = '';
                tInObj.qt_tax1 = '0';
                tInObj.am_prc1 = '0';
                tInObj.am_supply1 = strPayAmt; // 공급가액
                tInObj.am_tax1 = '0';
                tInObj.nm_note1 = '';
                tInObj.cd_mngd1 = strNeoeBuyerMom;
                tInObj.nm_mngd1 = strNeoeBuyerName;
                tInObj.cd_mngd2 = strTaxCd;
                tInObj.nm_mngd2 = strTaxNm;
                tInObj.cd_mngd3 = '';
                tInObj.nm_mngd3 = strDocuDate;
                tInObj.cd_mngd4 = '';
                tInObj.nm_mngd4 = strPayAmt; // 공급가액
                tInObj.cd_mngd5 = '';
                tInObj.nm_mngd5 = strVatAmt;
                // tInObj.cd_mngd6 = strBuyerAbbr;
                // tInObj.nm_mngd6 = strBuyerAbbr;
                // tInObj.cd_mngd6 = '';
                // tInObj.nm_mngd6 = objTaxMst.BUYER_EMAIL;
                tInObj.cd_mngd6 = '';
                tInObj.nm_mngd6 = strNeoeBuyerName;
                tInObj.cd_mngd7 = '';
                tInObj.nm_mngd7 = '';
                tInObj.cd_mngd8 = '';
                tInObj.nm_mngd8 = '';
                tInObj.yn_iss = '0';
                tInObj.final_status = '00';
                tInObj.no_bill = '';
                tInObj.sell_dam_nm = '심미진';
                tInObj.sell_dam_email = 'mjshim@shints.com';
                tInObj.sell_dam_mobil = '070-7549-2794';
                let tSQL99 = AFLib.createTableSql('neoe_fi_adocu', tInObj);
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));

                // 부가세 없은 항목도 전표 항목을 생성함.  260327. Won
                console.log(`부가세: ${strVatAmt}`);
                tSQLArray.push(tSQL99_1);
                tInObj.AF_A23_CODE = strA23Code;
                tWObj.DATA2.push(tInObj);
            }

            // 대변
            tIdx = 0;
            for (tIdx = 0; tIdx < tResultArray.length; tIdx++) {
                var tOne = { ...tResultArray[tIdx] };

                strUsdAmt = tOne.KRW_SHIP_AMOUNT;
                strInvoiceNo = tOne.INVOICE_NO;

                let tSQL99 = `
                    update ksv_tax_mst
                    set
                        docu_no = '${strDocuNo}',
                        acc_user = '${tUserInfo.USER_ID}'
                    where
                        tax_cd = '${tOne.TAX_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                // tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    update ksv_invoice_mst
                    set
                        docu_no = '${tOne.DOCU_NO}'
                    where
                        invoice_no in (
                            select distinct
                                invoice_no
                            from
                                ksv_tax_mem
                            where
                                tax_cd = '${tOne.TAX_CD}'
                        )
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                // tSQLArray.push(tSQL99_1);

                var tNmNote = ``;
                if (tOne.INVOICE_NO.substring(0, 2) === 'DN') {
                    let sql7_1 = `
                        select
                            *
                        from
                            ksv_crdb_mst
                        where
                            crdb_cd = '${tOne.INVOICE_NO}'
                    `;
                    var tRet7_1 = await prisma.$queryRaw(Prisma.raw(sql7_1));
                    if (tRet7_1.length > 0) {
                        tNmNote = ``;
                        if (tDbName === 'shints')
                            tNmNote = `${tOne.INVOICE_NO} ${tRet7_1[0].TITLE} DEBIT  ${tInput1.TAX_CD} `;
                        else
                            tNmNote = `${tOne.INVOICE_NO} ${tRet7_1[0].TITLE} DEBIT  ${tInput1.TAX_CD}(AF Test삭제요 `;
                    }
                } else {
                    if (tDbName === 'shints')
                        tNmNote = `제품매출 ${tInput1.BUYER_CD} ${tOne.INVOICE_NO} ${tInput1.TAX_CD} `;
                    else
                        tNmNote = `제품매출 ${tInput1.BUYER_CD} ${tOne.INVOICE_NO} ${tInput1.TAX_CD} (AF Test삭제요)`;
                }

                // var tTotAmt = parseFloat(strUsdAmt) * parseFloat(strRateBase);
                /*
          var tTotAmt = parseFloat(strUsdAmt);
          var strTotAmt = String(tTotAmt);
          var strOrgAmt = String(tTotAmt);
          var tVat = parseFloat(tOne.KRW_TAX_AMOUNT);
          var strVat =String(tVat); // tOne.KRW_TAX_AMOUNT
          var tTotTot = tTotAmt + tVat; 
          var strTotTot = String(tTotTot);
          */

                var tTotAmt = parseFloat(tOne.KRW_TOT_AMOUNT); // 총금액: 지불금액 + 세금
                var tPayAmt = parseFloat(tOne.KRW_SHIP_AMOUNT); // 원화
                var tOrgAmt = tPayAmt; // 원화폐 금액
                var tVatAmt = parseFloat(tOne.KRW_TAX_AMOUNT); // 원화폐 금액

                /*
          if (strCurrCd === 'KRW') {
              tTotAmt = AFLib.getFloat(strUsdAmt, 0);
              tOrgAmt = AFLib.getFloat(strUsdAmt, 0);
          } else {
              tTotAmt = parseFloat(strUsdAmt) * parseFloat(strRateBase);
              tTotAmt = AFLib.getFloat(tTotAmt, 0);
              tOrgAmt = AFLib.getFloat(strUsdAmt, 4);
          }
          */

                var strTotAmt = String(tTotAmt);
                var strPayAmt = String(tPayAmt);
                var strOrgAmt = String(tOrgAmt);
                var strVatAmt = String(tVatAmt);

                var strAccCode = '40201'; // 원화제품매출

                tInObj = {};
                tInObj.row_id = strDocuNo;
                tInObj.row_no = tNoDocuLine;
                tInObj.no_tax = '*';
                tInObj.cd_pc = '1000';
                tInObj.cd_wdept = strMngPart;
                tInObj.no_docu = strDocuNo;
                tInObj.no_doline = tNoDocuLine;
                tNoDocuLine += 1;
                tInObj.cd_company = '1000';
                tInObj.id_write = strMngId;
                tInObj.cd_docu = '11';
                tInObj.dt_acct = strDocuDate;
                tInObj.st_docu = '1';
                tInObj.tp_drcr = '2';
                tInObj.cd_acct = strAccCode;
                tInObj.amt = strPayAmt;
                tTotal2 += parseFloat(strPayAmt);
                if (tIdx === tResultArray.length - 1) {
                    var tDiff = tTotal1 - tTotal2;
                    var tAdjAmt = parseFloat(strPayAmt) + parseFloat(tDiff);
                    tAdjAmt = parseFloat(tAdjAmt).toFixed(0);
                    tInObj.amt = tAdjAmt;
                    tTotal2 = tTotal2 + tDiff;
                }

                tInObj.cd_partner = strNeoeAgentCd;
                tInObj.dt_start = strDocuDate;
                tInObj.dt_end = '';
                tInObj.am_taxstd = '0';
                tInObj.am_addtax = '0';
                tInObj.tp_tax = '';
                tInObj.no_company = '';
                tInObj.nm_note = tNmNote;
                tInObj.cd_bizarea = '';
                tInObj.cd_cc = strNeoeAgentCd;
                tInObj.cd_pjt = strNeoeAgentCd;
                tInObj.ucd_mng1 = '';
                tInObj.ucd_mng2 = '';
                tInObj.ucd_mng3 = strNeoeA23;
                tInObj.ucd_mng4 = '';
                tInObj.ucd_mng5 = '';
                tInObj.tp_docu = 'N';
                tInObj.no_acct = '0';
                tInObj.cd_exch = strNeoeCurrCd;
                tInObj.rt_exch = strRateBase;
                if (strCurrCd === 'KRW') tInObj.am_ex = '0';
                else tInObj.am_ex = strUsdAmt;
                tInObj.no_to = '';
                tInObj.dt_shipping = '';
                tInObj.tp_gubun = '3';
                tInObj.md_tax1 = '';
                tInObj.nm_item1 = '';
                tInObj.nm_size1 = '';
                tInObj.qt_tax1 = '0';
                tInObj.am_prc1 = '0';
                tInObj.am_supply1 = '0';
                tInObj.am_tax1 = '0';
                tInObj.nm_note1 = '';
                tInObj.cd_mngd1 = strNeoeAgentCd;
                tInObj.nm_mngd1 = strNeoeAgentName;
                tInObj.cd_mngd2 = strNeoeAgentCd;
                tInObj.nm_mngd2 = strNeoeAgentName;
                tInObj.cd_mngd3 = strNeoeA23;
                tInObj.nm_mngd3 = strNeoeA23Name;
                tInObj.cd_mngd4 = strNeoeCurrCd;
                tInObj.nm_mngd4 = strCurrCd;
                tInObj.cd_mngd5 = '';
                tInObj.nm_mngd5 = strRateBase;
                tInObj.cd_mngd6 = '';
                tInObj.nm_mngd6 = strTotAmt;
                tInObj.cd_mngd7 = '';
                tInObj.nm_mngd7 = '';
                tInObj.cd_mngd8 = '';
                tInObj.nm_mngd8 = '';
                tInObj.yn_iss = '0';
                tInObj.final_status = '00';
                tInObj.no_bill = '';
                let tSQL99 = AFLib.createTableSql('neoe_fi_adocu', tInObj);
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                tInObj.AF_A23_CODE = strA23Code;
                tWObj.DATA3.push(tInObj);
            }

            if (tTotal1 !== tTotal2) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = `ERROR:차대 금액 오류(${tTotal1}/${tTotal2})`;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }
            requestArray.push(tWObj);

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
                tObj.CODE = 'ERROR:Insert SHIP Record';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            tDbName = 'shints';
            console.log(
                `Docu Count: (${requestArray.length})/(${tDbName}) =>   ${tWObj.DATA1.length}/${tWObj.DATA2.length}/${tWObj.DATA3.length}`,
            );
            if (tDbName === 'shints') {
                var res_sync = request_sync(
                    'POST',
                    `https://erp.shints.com:3311/restapi/insert_docu_domestic_product/${tUserInfo.USER_ID}`,
                    {
                        json: requestArray,
                    },
                );

                var tResData = JSON.parse(res_sync.getBody('utf8'));
                console.log(tResData);

                var tIdx9 = 0;
                for (tIdx9 = 0; tIdx9 < tResData.length; tIdx9++) {
                    tSQLArray = [];

                    var tOne = { ...tResData[tIdx9] };
                    var tCols = tOne.INVOICE_NO.split(' ');

                    var tTaxCd = '';
                    tCols.forEach((col1, i1) =>  {
                        if (col1.includes('TAX_')) {
                            var tCols1 = col1.split('(');
                            tTaxCd = tCols1[0];
                        }
                    });
                    if (tTaxCd === '') continue;

                    // if (tCols.length < 3) continue;
                    // var tTaxCd = tCols[3];

                    let tSQL99 = `
                        update ksv_tax_mst
                        set
                            docu_no = '${tOne.DOCU_NO}',
                            acc_user = '${tUserInfo.USER_ID}',
                            pay_due_date = '${tInput1.PAY_DUE_DATE || ''}'
                        where
                            tax_cd = '${tTaxCd}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);

                    let tSQL99 = `
                        update ksv_invoice_mst
                        set
                            docu_no = '${tOne.DOCU_NO}',
                            income_date = '${strDocuDate}'
                        where
                            invoice_no in (
                                select distinct
                                    invoice_no
                                from
                                    ksv_tax_mem
                                where
                                    tax_cd = '${tTaxCd}'
                            )
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    // tSQLArray.push(tSQL99_1);


                    // Debit 의 End 처리
                    let sql_debit = `
                        select 
                             b.crdb_cd, b.crdb_amt, isnull(sum(c.crdb_amt), 0) as e_crdb_amt
                        from
                             ksv_tax_mem a, ksv_crdb_mst b, ksv_crdb_mem c
                        where
                             a.tax_cd = '${tTaxCd}'
                        and a.invoice_no = b.crdb_cd
                        and left(a.invoice_no, 2) = 'DN'
                        and  b.crdb_cd = c.crdb_cd
                        group by b.crdb_cd, b.crdb_amt
                    `;
                    var ret_debit = await prisma.$queryRaw(Prisma.raw(sql_debit));
                    var tIdx10 = 0;
                    for (tIdx10 = 0; tIdx10 < ret_debit.length; tIdx10 ++) {
                        var t_crdb_cd = ret_debit[tIdx10].crdb_cd;
                        var t_crdb_amt = ret_debit[tIdx10].crdb_amt;
                        var e_crdb_amt = ret_debit[tIdx10].e_crdb_amt;
                        if (parseFloat(t_crdb_amt) <= parseFloat(e_crdb_amt)) {
                            let sqlUp2 = `
                                update ksv_crdb_mst 
                                set
                                    status_cd = '4',
                                    end_date = '${tRetDate1}',
                                    end_user = '${tUserInfo.USER_ID}'
                                where
                                    crdb_cd = '${t_crdb_cd}'
                            `;
                            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(sqlUp2));
                            tSQLArray.push(tSQL99_1);
                        } else {
                            let sqlUp2 = `
                                update ksv_crdb_mst 
                                set
                                    status_cd = '0',
                                    end_date = '${tRetDate1}',
                                    end_user = '${tUserInfo.USER_ID}'
                                where
                                    crdb_cd = '${t_crdb_cd}'
                            `;
                            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(sqlUp2));
                            tSQLArray.push(tSQL99_1);
                        }
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
                        tObj.CODE = `ERROR:Make Docu:${e.message}`;
                        tObj.id = 0;
                        tRetArray.push(tObj);
                        return tRetArray;
                    }

                    tSQLArray = [];

                    // Order별 Price Update
                    let sqlTaxMem = `
                        select distinct
                            order_cd
                        from
                            ksv_tax_mem
                        where
                            tax_cd = '${tTaxCd}'
                    `;
                    var retTaxMem = await prisma.$queryRaw(
                        Prisma.raw(sqlTaxMem),
                    );
                    var tIdx10 = 0;
                    for (tIdx10 = 0; tIdx10 < retTaxMem.length; tIdx10++) {
                        var objTaxMem = { ...retTaxMem[tIdx10] };

                        let sqlInvoice = `
                            select
                                sum(a.ship_qty) as s_ship_qty,
                                max(b.curr_cd) as curr_cd
                            from
                                ksv_invoice_mem a,
                                ksv_order_mst b
                            where
                                a.order_cd = '${objTaxMem.order_cd}'
                                and b.order_cd = a.order_cd
                        `;
                        var retInvoice = await prisma.$queryRaw(
                            Prisma.raw(sqlInvoice),
                        );
                        var retInvoiceObj = { ...retInvoice[0] };
                        var tShipQty = parseFloat(retInvoiceObj.s_ship_qty);
                        var tCurrCd = retInvoiceObj.curr_cd;

                        var tSalesAmt = 0;

                        let sqlInvoice_Import = `
                            select
                                count(*) as s_cnt,
                                isnull(sum(a.ship_qty), 0) as pay_qty,
                                isnull(sum(a.ship_qty * a.sales_price), 0) as pay_amt
                            from
                                ksv_invoice_mem a,
                                ksv_invoice_mst b
                            where
                                a.order_cd = '${objTaxMem.order_cd}'
                                and a.invoice_no = b.invoice_no
                                and b.docu_no is not null
                                and b.docu_no <> ''
                        `;
                        var retInvoice_Import = await prisma.$queryRaw(
                            Prisma.raw(sqlInvoice_Import),
                        );
                        if (
                            retInvoice_Import.length > 0 &&
                            retInvoice_Import[0].s_cnt > 0
                        ) {
                            tSalesAmt = parseFloat(
                                retInvoice_Import[0].pay_amt,
                            );
                        }

                        let sqlInvoice_Domestic = `
                            select
                                count(*) as s_cnt,
                                isnull(sum(a.pay_qty), 0) as pay_qty,
                                isnull(sum(a.pay_qty * a.pay_price), 0) as pay_amt
                            from
                                ksv_tax_mem a,
                                ksv_tax_mst b
                            where
                                a.order_cd = '${objTaxMem.order_cd}'
                                and a.tax_cd = b.tax_cd
                                and b.docu_no is not null
                                and b.docu_no <> ''
                        `;
                        var retInvoice_Domestic = await prisma.$queryRaw(
                            Prisma.raw(sqlInvoice_Domestic),
                        );
                        if (
                            retInvoice_Domestic.length > 0 &&
                            retInvoice_Domestic[0].s_cnt > 0
                        ) {
                            tSalesAmt = parseFloat(
                                retInvoice_Domestic[0].pay_amt,
                            );
                        }

                        var tAvrPrice =
                            parseFloat(tSalesAmt) / parseFloat(tShipQty);
                        if (tCurrCd === 'KRW')
                            tAvrPrice = parseFloat(tAvrPrice).toFixed(0);
                        else tAvrPrice = parseFloat(tAvrPrice).toFixed(4);

                        console.log(
                            ` Sales Price :  ${tSalesAmt} / ${tShipQty} = ${tAvrPrice}`,
                        );

                        let tSQL99 = `
                            update ksv_order_mst
                            set
                                avr_price = '${tAvrPrice}'
                            where
                                order_cd = '${objTaxMem.order_cd}'
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
                        tObj.CODE = `ERROR:Make Docu:${e.message}`;
                        tObj.id = 0;
                        tRetArray.push(tObj);
                        return tRetArray;
                    }
                }
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = `SUCCEED:${strDocuNo}`;
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },

        mgrInsert_S0801_5_DELETE_TAXBILL: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tIdx = 0;
            for (tIdx = 0; tIdx < args.datas.length; tIdx++) {
                var tInput1 = { ...args.datas[tIdx] };
                var tSQLArray = [];

                let tSQL99 = `
                    delete from ksv_tax_mst
                    where
                        tax_cd = '${tInput1.TAX_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    delete from ksv_tax_mem
                    where
                        tax_cd = '${tInput1.TAX_CD}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    update ksv_invoice_mst
                    set
                        tax_cd = '',
                        bill_date = '',
                        bill_user = ''
                    where
                        tax_cd = '${tInput1.TAX_CD}'
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
                tObj.CODE = 'ERROR:Delete TaxBill';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED:Delete TaxBill';
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },
    },
};

export default moduleMutation_S0801_5;
