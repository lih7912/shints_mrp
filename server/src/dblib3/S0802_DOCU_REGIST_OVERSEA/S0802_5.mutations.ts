// MGR_@@TNAME@@.mutations.js

import * as fs from 'fs';
import { Prisma } from '@prisma/client';
import prisma from '../../db'; //PrismaClient 사용하기 위해 불러오기
import AFLib from '../../commlib'; //PrismaClient 사용하기 위해 불러오기
const request_sync = require('sync-request');

// export default로 Mutation 내용 내보내기
const moduleMutation_S0802_5 = {
    Mutation: {
        mgrInsert_S0802_5: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);
            var tInput1 = [...args.datas];
            var tSQLArray = [];

            var tIdx = 0;
            for (tIdx = 0; tIdx < tInput1.length; tIdx++) {
                var tRetDate0 = AFLib.getCurrTime();
                var tInput2 = { ...tInput1[tIdx] };

                var tDocuNo = 'DOCU_' + tRetDate0;
                if (tInput2.STATUS_NAME === '제품매출') {
                    let tSQL99 = `
                        update ksv_invoice_mst
                        set
                            docu_no = '${tDocuNo}',
                            income_date = '${args.datas1.INCOME_DATE}'
                            -- curr_cd = '${tInput2.CURR_CD}',
                            -- tot_amt = '${tInput2.AMOUNT}'
                            -- vat_amt = '${tInput2.VAT}'
                        where
                            invoice_no = '${tInput2.INVOICE_NO}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                    tSQLArray.push(tSQL99_1);
                }

                if (tInput2.STATUS_NAME === '자재매출') {
                    let tSQL99 = `
                        update ksv_invoice_matl
                        set
                            income_date = '${args.datas1.INCOME_DATE}',
                            docu_no = '${tDocuNo}'
                            -- curr_cd = '${tInput2.CURR_CD}',
                            -- delivery_amt = '${tInput2.AMOUNT}'
                            -- vat_amt = '${tInput2.VAT}'
                        where
                            invoice_no = '${tInput2.INVOICE_NO}'
                    `;
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
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
                tObj.CODE = 'ERROR:Insert SHIP Record';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED:';
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },

        mgrInsert_S0802_5_DELETE_DOCU: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput1 = [...args.datas];

            var tSQLArray = [];

            let sql0_1 = `           
                select db_name() as db_name
              `;
            var tRet0_1 = await prisma.$queryRaw(Prisma.raw(sql0_1));
            var tDbName = '';
            if (tRet0_1.length > 0) tDbName = tRet0_1[0].db_name;
            console.log(`Database Name:${tDbName}`);

            var tIdx = 0;
            for (tIdx = 0; tIdx < tInput1.length; tIdx++) {
                var tRetDate0 = AFLib.getCurrTime();
                var tInput2 = { ...tInput1[tIdx] };

                let sql_check = `
                    select
                        *
                    from
                        neoe_fi_adocu
                    where
                        nm_note like '%${tInput2.INVOICE_NO}%'
                `;
                var tRet_check = await prisma.$queryRaw(Prisma.raw(sql_check));
                var tSendFlag = 0;
                if (tRet_check.length > 0) {
                    var tCheckObj = { ...tRet_check[0] };
                    if (tCheckObj.ROW_ID.substring(0, 6) === 'AFDOCU') {
                        tSendFlag = 0; // 서버 미처리 전표는 Delete 전송안함
                    } else {
                        if (tDbName !== 'shints') {
                            if (tCheckObj.NM_NOTE.includes('AF 테스트')) {
                                tSendFlag = 1;
                            } else {
                                var tRetArray = [];
                                var tObj = {};
                                tObj.CODE =
                                    'ERROR:테스트서버에서 Real 전표를 취소할수 없습니다';
                                tObj.id = 0;
                                tRetArray.push(tObj);
                                return tRetArray;
                            }
                        } else {
                            tSendFlag = 1;
                        }
                    }
                }

                let sql0 = `
                    select
                        isnull(count(*), 0) as c_cnt
                    from
                        ksv_invoice_bill
                    where
                        invoice_no = '${tInput2.INVOICE_NO}'
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

                //
                var requestArray = {};
                var res_sync = request_sync(
                    'POST',
                    `https://erp.shints.com:3311/restapi/del_docuseq/${tInput2.DOCU_NO}/${tDbName}`,
                    {
                        json: requestArray,
                    },
                );

                var tResData = JSON.parse(res_sync.getBody('utf8'));
                console.log('docu request:', tResData);

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
                } else {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = tResObj.MESSAGE;
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }

                let tSQL99 = `
                    update ksv_invoice_mst
                    set
                        docu_no = '',
                        income_date = ''
                    where
                        invoice_no = '${tInput2.INVOICE_NO}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    delete from neoe_fi_adocu
                    where
                        no_docu = '${tInput2.DOCU_NO}'
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

        mgrInsert_S0802_5_PROC_FOC: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput1 = [...args.datas];

            var tSQLArray = [];

            var tIdx = 0;
            for (tIdx = 0; tIdx < tInput1.length; tIdx++) {
                var tRetDate0 = AFLib.getCurrTime();
                var tInput2 = { ...tInput1[tIdx] };

                // FOC가 아니면 처리불가
                if (tInput2.PAYMENT_TYPE !== '2') continue;

                let sql0= `
                    select
                        *
                    from
                        ksv_invoice_mst 
                    where
                        invoice_no = '${tInput2.INVOICE_NO}'
                `;
                var ret0  = await prisma.$queryRaw(Prisma.raw(sql0));
                if (ret0.length <= 0) continue;
                var tInvoiceObj = { ...ret0[0] };

                // 전표가 처리되었으면  처리불가
                if (tInvoiceObj.DOCU_NO) continue;

                var tDocuNo = `FOC_${tInput2.INVOICE_NO}`;
                let tSQL99 = `
                    update ksv_invoice_mst
                    set
                        docu_no = '${tDocuNo}',
                        income_date = '${tUserInfo.USER_ID}'
                    where
                        invoice_no = '${tInput2.INVOICE_NO}'
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
                tObj.CODE = 'ERROR:무상전표 생략 처리';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = 'SUCCEED:무상전표 생략 처리';
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },

        mgrInsert_S0802_5_INSERT_DOCU: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput1 = [...args.datas];
            var tInput2 = { ...args.datas1 };

            let sql0_1 = `           
                select db_name() as db_name
              `;
            var tRet0_1 = await prisma.$queryRaw(Prisma.raw(sql0_1));
            var tDbName = '';
            if (tRet0_1.length > 0) tDbName = tRet0_1[0].db_name;
            console.log(`Database Name:${tDbName}`);

            var requestArray = [];
            var strDocuNo = '';

            var tIdx = 0;
            for (tIdx = 0; tIdx < tInput1.length; tIdx++) {
                var tRetDate2 = AFLib.getCurrTime();

                var tSQLArray = [];

                var tOne = { ...tInput1[tIdx] };

                let sqlBuyer = `
                    select 
                      isnull(NEOE_BUYER_CD, '') as NEOE_BUYER_CD,
                      isnull(NEOE_BUYER_CD_MOM, '') as NEOE_BUYER_CD_MON
                    from  kcd_buyer
                    where buyer_cd = '${tOne.BUYER_CD}'
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

                var strNeoeAgentCd = tOne.NEOE_BUYER_CD;
                var strNeoeAgentName = '';
                var strNeoeA23 = tOne.NEOE_A23;
                var strNeoeA23Name = '';
                var strRegdatetime = tRetDate;
                // var strDocuDate = tRetDate1;
                if (!tOne.ATD) {
                    var tRetArray = [];
                    var tObj = {};
                    tObj.CODE = 'ERROR:Not Exist ATD';
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }

                var strDocuDate = tOne.ATD;

                // var strUsdAmt = tOne.TOT_AMT;

                // Deposit Amt는 별도로 생각. invoice amt에서 빼지 않음.  Won 20260527
                // var strUsdAmt = parseFloat(tOne.TOTAL_AMT) - parseFloat(tOne.DEPOSIT_AMT);
                var strUsdAmt = parseFloat(tOne.TOTAL_AMT);

                var strInvoiceNo = tOne.INVOICE_NO;
                var strCurrCd = tOne.CURR_CD;
                var strBuyerCd = tOne.BUYER_CD;

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
                var strNeoeCurrCd = '';
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
                var strRateBase = '1';
                if (tRet1.length > 0) strRateBase = tRet1[0].rate_base;

                let sql1_1 = `
                    select
                        won_amt
                    from
                        kcd_currency
                    where
                        curr_cd = '${strCurrCd}'
                        and start_date = '${strDocuDate}'
                `;
                var tRet1_1 = await prisma.$queryRaw(Prisma.raw(sql1_1));
                if (tRet1_1.length > 0)
                    strRateBase = parseFloat(tRet1_1[0].won_amt);
                else {
                    sql1_1 = `
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
                    tRet1_1 = await prisma.$queryRaw(Prisma.raw(sql1_1));
                    if (tRet1_1.length > 0)
                        strRateBase = parseFloat(tRet1_1[0].won_amt);
                }

                let sql2 = `
                    select
                        buyer_team,
                        neoe_a23,
                        isnull(neoe_buyer_cd_mom, '') as neoe_buyer_cd_mom,
                        isnull(neoe_buyer_cd, '') as neoe_buyer_cd,
                        mom_cd
                    from
                        kcd_buyer
                    where
                        buyer_cd = '${strBuyerCd}'
                `;
                var tRet2 = await prisma.$queryRaw(Prisma.raw(sql2));
                var strBuyerTeam = '';
                var strA23Code = '';
                var strNeoeBuyerMom = '';
                var strMomBuyer = '';
                var strNeoeBuyerName = '';
                if (tRet2.length > 0) {
                    strBuyerTeam = tRet2[0].buyer_team;
                    strA23Code = tRet2[0].neoe_a23;
                    strNeoeBuyerMom = tRet2[0].neoe_buyer_cd_mom;
                    if (strNeoeBuyerMom === '') strNeoeBuyerMom = tRet2[0].neoe_buyer_cd;

                    strMomBuyer = tRet2[0].mom_cd;
                    if (strMomBuyer.trim() === '') {
                        strMomBuyer = strBuyerCd;
                    }
                }

                console.log(`======> Neoe No: ${strNeoeBuyerMom}`);


                let sql3 = `
                    select
                        buyer_name
                    from
                        kcd_buyer
                    where
                        buyer_cd = '${strMomBuyer}'
                `;
                var tRet3 = await prisma.$queryRaw(Prisma.raw(sql3));
                var strMomBuyerName = '';
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
                var strCC = '';
                var strCCName = '';
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
                var strMngPart = '';
                var strMngId = '';
                var strMngName = '';
                var strMngEmail = '';
                var strMngTel = '';
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
                var strA23Name = '';
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
                var strMaxDocuNo = AFLib.printF(tMaxDocuNo, 5);
                var strDocuNo = `IS${strDocuDate}${strMaxDocuNo}`;
                var strTaxNo = `${strDocuNo}001`;

                if (!tInput2.REMARK) tInput2.REMARK = '';

                let tSQL99 = `
                    update ksv_invoice_mst
                    set
                        remark = '${tInput2.REMARK}'
                        -- docu_no = '${strDocuNo}',
                        -- income_date = '${args.datas1.INCOME_DATE}'
                    where
                        invoice_no = '${strInvoiceNo}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                var tNmNote = ``;
                if (tDbName === 'shints') tNmNote = `제품매출 ${strInvoiceNo}`;
                else tNmNote = `제품매출 ${strInvoiceNo} (AF 테스트)`;

                var tTotAmt = 0; // 원화
                var tOrgAmt = 0; // 원화폐 금액

                if (strCurrCd === 'KRW') {
                    tTotAmt = AFLib.getFloat(strUsdAmt, 0);
                    tOrgAmt = AFLib.getFloat(strUsdAmt, 0);
                } else {
                    tTotAmt = parseFloat(strUsdAmt) * parseFloat(strRateBase);
                    tTotAmt = AFLib.getFloat(tTotAmt, 0);
                    tOrgAmt = AFLib.getFloat(strUsdAmt, 4);
                }

                var strTotAmt = String(tTotAmt);
                var strOrgAmt = String(tOrgAmt);
                var strVat = '0';

                var tWObj = {};
                tWObj.DATA1 = {};
                tWObj.DATA2 = {};
                tWObj.DATA3 = {};

                var tInObj = {};
                tInObj.row_id = 'AFDOCU_' + tRetDate2;
                tInObj.row_no = '1';
                tInObj.no_tax = '*';
                tInObj.cd_pc = '1000';
                tInObj.cd_wdept = strMngPart; // 8400
                tInObj.no_docu = tInObj.row_id;
                tInObj.no_doline = '1';
                tInObj.cd_company = '1000';
                tInObj.id_write = strMngId; // 2217
                tInObj.cd_docu = '11';
                tInObj.dt_acct = strDocuDate;
                tInObj.st_docu = '1';
                tInObj.tp_drcr = '1';
                tInObj.amt = strTotAmt; // 한화금액
                tInObj.cd_partner = strNeoeBuyerMom;

                // "거래처코드 200534 SHINTS ETP GARMENT"  "거래처코드 200083 BVT" 일 경우에만 아래와 같이 계정명 변경 요청.
                if (tInObj.cd_partner.trim() === '200534' || tInObj.cd_partner.trim() === '200083') {
                    tInObj.cd_acct = '10803'; // 관계사외상매출금
                } else {
                    tInObj.cd_acct = '10802';
                }

                tInObj.dt_start = strDocuDate;
                tInObj.dt_end = '';
                tInObj.am_taxstd = '0';
                tInObj.am_addtax = '0';
                tInObj.tp_tax = '';
                tInObj.no_company = '';
                tInObj.nm_note = tNmNote;
                tInObj.cd_bizarea = '';
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
                tInObj.am_ex = strUsdAmt; // 외화금액
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
                tInObj.nm_mngd6 = strTotAmt; // 원화금액
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
                tWObj.DATA1 = { ...tInObj };

                // 세금Part
                tInObj = {};
                tInObj.row_id = 'AFDOCU_' + tRetDate2;
                tInObj.row_no = '2';
                tInObj.no_tax = `${strDocuNo}001`;
                tInObj.cd_pc = '1000';
                tInObj.cd_wdept = strMngPart; // 8400
                tInObj.no_docu = tInObj.row_id;
                tInObj.no_doline = '2';
                tInObj.cd_company = '1000';
                tInObj.id_write = strMngId; // 2217
                tInObj.cd_docu = '11';
                tInObj.dt_acct = strDocuDate;
                tInObj.st_docu = '1';
                tInObj.tp_drcr = '2';
                tInObj.amt = 0; // 세금금액
                tInObj.cd_partner = strNeoeBuyerMom;
                console.log(`======> Neoe No(Step-2): ${strNeoeBuyerMom}/ ${tInObj.cd_partner}`);
                // "거래처코드 200534 SHINTS ETP GARMENT"  "거래처코드 200083 BVT" 일 경우에만 아래와 같이 계정명 변경 요청.
                if (tInObj.cd_partner.trim() === '200534' || tInObj.cd_partner.trim() === '200083') {
                    tInObj.cd_acct = '25500'; // 부가세예수금
                } else {
                    tInObj.cd_acct = '25500'; // 부가세예수금
                }
                console.log(`======> Neoe No(Step-3): ${strNeoeBuyerMom}/ ${tInObj.cd_partner}`);
                tInObj.dt_start = strDocuDate;
                tInObj.dt_end = '';
                tInObj.am_taxstd = strTotAmt;
                tInObj.am_addtax = '0';
                tInObj.tp_tax = '15';
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
                tInObj.am_ex = strUsdAmt; // 외화금액
                tInObj.no_to = '';
                tInObj.dt_shipping = strDocuDate; // strShipDate
                tInObj.tp_gubun = '3';
                tInObj.md_tax1 = strDocuDate.substring(4, 8);
                tInObj.nm_item1 = '제품';
                tInObj.nm_size1 = '';
                tInObj.qt_tax1 = '0';
                tInObj.am_prc1 = '0';
                tInObj.am_supply1 = strTotAmt;
                tInObj.am_tax1 = '0';
                tInObj.nm_note1 = '';
                tInObj.cd_mngd1 = strNeoeBuyerMom;
                tInObj.nm_mngd1 = strNeoeBuyerName;
                tInObj.cd_mngd2 = '15';
                tInObj.nm_mngd2 = '영세(수출)';
                tInObj.cd_mngd3 = '';
                tInObj.nm_mngd3 = tRetDate1; // Due Date
                tInObj.cd_mngd4 = strDocuDate; // strShipDate
                tInObj.nm_mngd4 = strDocuDate; // strShipDate
                tInObj.cd_mngd5 = '';
                tInObj.nm_mngd5 = '';
                tInObj.cd_mngd6 = '9999999999';
                tInObj.nm_mngd6 = '9999999999';
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
                tWObj.DATA2 = { ...tInObj };

                tInObj = {};
                tInObj.row_id = 'AFDOCU_' + tRetDate2;
                tInObj.row_no = '3';
                tInObj.no_tax = '*';
                tInObj.cd_pc = '1000';
                tInObj.cd_wdept = strMngPart; // 84000
                tInObj.no_docu = tInObj.row_id;
                tInObj.no_doline = '3';
                tInObj.cd_company = '1000';
                tInObj.id_write = strMngId; // 2217
                tInObj.cd_docu = '11';
                tInObj.dt_acct = strDocuDate;
                tInObj.st_docu = '1';
                tInObj.tp_drcr = '2';

                // "거래처코드 200534 SHINTS ETP GARMENT"  "거래처코드 200083 BVT" 일 경우에만 아래와 같이 계정명 변경 요청.
                if (strNeoeBuyerMom.trim() === '200534' || strNeoeBuyerMom.trim() === '200083') {
                    tInObj.cd_acct = '40103'; // 관계사상품매출
                } else {
                    tInObj.cd_acct = '40202'; // 해외제품
                }
                tInObj.amt = strTotAmt;
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
                tInObj.am_ex = strUsdAmt;
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
                tWObj.DATA3 = { ...tInObj };
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
            }

            tDbName = 'shints';
            var tInvoiceArray = [];
            if (tDbName === 'shints') {
                var res_sync = request_sync(
                    'POST',
                    `https://erp.shints.com:3311/restapi/insert_docu_oversea_product/${tUserInfo.USER_ID}`,
                    {
                        json: requestArray,
                    },
                );

                var tResData = JSON.parse(res_sync.getBody('utf8'));
                console.log('docu request:', tResData);

                var tIdx9 = 0;
                var tSQLArray = [];
                for (tIdx9 = 0; tIdx9 < tResData.length; tIdx9++) {
                    var tOne = { ...tResData[tIdx9] };
                    var tCols = tOne.INVOICE_NO.split(' ');
                    var tInvoiceNo = tCols[1];
                    strDocuNo = tOne.DOCU_NO;

                    tInvoiceArray.push(tInvoiceNo);

                    if (
                        tInvoiceNo.substring(0, 2) === 'DA' ||
                        tInvoiceNo.substring(0, 2) === 'DN'
                    ) {
                        let sql99 = `
                            select
                                *
                            from
                                ksv_crdb_mst
                            where
                                docu_no = '${tOne.DOCU_NO}'
                        `;
                        var tRet99 = await prisma.$queryRaw(Prisma.raw(sql99));
                        if (tRet99.length > 0) {
                            var tRetArray = [];
                            var tObj = {};
                            tObj.CODE = `ERROR:이미 등록된 전표번호입니다. 전산부에 문의하세요${tOne.DOCU_NO}`;
                            tObj.id = 0;
                            tRetArray.push(tObj);
                            return tRetArray;
                        }

                        let tSQL99 = `
                            update ksv_crdb_mst
                            set
                                docu_no = '${tOne.DOCU_NO}'
                            where
                                crdb_cd = '${tInvoiceNo}'
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);
                    } else {
                        let sql99 = `
                            select
                                *
                            from
                                ksv_invoice_mst
                            where
                                docu_no = '${tOne.DOCU_NO}'
                        `;
                        var tRet99 = await prisma.$queryRaw(Prisma.raw(sql99));
                        if (tRet99.length > 0) {
                            var tRetArray = [];
                            var tObj = {};
                            tObj.CODE = `ERROR:이미 등록된 전표번호입니다. 전산부에 문의하세요${tOne.DOCU_NO}`;
                            tObj.id = 0;
                            tRetArray.push(tObj);
                            return tRetArray;
                        }

                        let tSQL99 = `
                            update ksv_invoice_mst
                            set
                                docu_no = '${tOne.DOCU_NO}',
                                income_date = '${args.datas1.INCOME_DATE}'
                            where
                                invoice_no = '${tInvoiceNo}'
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);
                    }

                    let sql99 = `
                        select
                            *
                        from
                            neoe_fi_adocu
                        where
                            nm_note like '%${tInvoiceNo}%'
                    `;
                    var tRet99 = await prisma.$queryRaw(Prisma.raw(sql99));
                    var tIdx99 = 0;
                    for (tIdx99 = 0; tIdx99 > tRet99.length; tIdx99++) {
                        var tObj1 = { ...tRet99[tIdx99] };

                        let tSQL99 = `
                            update neoe_fi_adocu
                            set
                                row_id = '${tOne.DOCU_NO}',
                                no_docu = '${tOne.DOCU_NO}'
                            where
                                row_id = '${tObj1.ROW_ID}' row_no = '1'
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);

                        let tSQL99 = `
                            update neoe_fi_adocu
                            set
                                row_id = '${tOne.DOCU_NO}',
                                no_docu = '${tOne.DOCU_NO}'
                            where
                                row_id = '${tObj1.ROW_ID}' row_no = '2'
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                        tSQLArray.push(tSQL99_1);

                        let tSQL99 = `
                            update neoe_fi_adocu
                            set
                                row_id = '${tOne.DOCU_NO}',
                                no_docu = '${tOne.DOCU_NO}'
                            where
                                row_id = '${tObj1.ROW_ID}' row_no = '3'
                        `;
                        const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
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
                    tObj.CODE = `ERROR:Insert SHIP Record:${e.message}`;
                    tObj.id = 0;
                    tRetArray.push(tObj);
                    return tRetArray;
                }
            }

            // Price Update
            var tIdx0 = 0;
            var tOrderArray = [];
            for (tIdx0 = 0; tIdx0 < tInvoiceArray.length; tIdx0++) {
                let sql0 = `
                    select
                        *
                    from
                        ksv_invoice_mem
                    where
                        invoice_no = '${tInvoiceArray[tIdx0]}'
                `;
                var ret0 = await prisma.$queryRaw(Prisma.raw(sql0));
                ret0.forEach((col2, i2) => {
                    var tChk1 = 0;
                    tOrderArray.forEach((col3, i3) => {
                        if (col2.ORDER_CD === col3) tChk1 = 1;
                    });
                    if (tChk1 === 0) tOrderArray.push(col2.ORDER_CD);
                });
            }

            tSQLArray = [];

            // Price Update
            tIdx0 = 0;
            for (tIdx0 = 0; tIdx0 < tOrderArray.length; tIdx0++) {
                var tSQL = '';
                var tStrOrderCd = tOrderArray[tIdx0];

                let sql0 = `
                    select
                        *
                    from
                        ksv_order_mst
                    where
                        order_cd = '${tStrOrderCd}'
                `;
                var ret0 = await prisma.$queryRaw(Prisma.raw(sql0));
                var tOrderObj = { ...ret0[0] };

                let sql1 = `
                    select
                        *
                    from
                        kcd_currency
                    where
                        curr_cd = '${tOrderObj.CURR_CD}'
                        and start_date = '${tRetDate1}'
                `;
                var ret1 = await prisma.$queryRaw(Prisma.raw(sql1));
                if (ret1.length <= 0) {
                    sql1 = `
                        select
                            *
                        from
                            kcd_currency
                        where
                            curr_cd = '${tOrderObj.CURR_CD}'
                            and start_date = (
                                select
                                    max(start_date)
                                from
                                    kcd_currency
                                where
                                    curr_cd = '${tOrderObj.CURR_CD}'
                            )
                    `;
                    ret1 = await prisma.$queryRaw(Prisma.raw(sql1));
                }
                var tCurrencyObj = { ...ret1[0] };

                let sqlStr_Import = `
                    select distinct
                        f.SHIP_DATE,
                        c.cd_name as SHIP_TYPE_NAME,
                        b.SHIP_QTY,
                        isnull(b.SALES_PRICE, 0) as SALES_PRICE,
                        b.INVOICE_NO,
                        e.cd_name as DELIVERY_TYPE_NAME,
                        isnull(b.SHIP_PRICE, 0) as SHIP_PRICE,
                        g.SHIP_DATE as SHIP_DATE0,
                        f.ATD as SHIP_DATE1,
                        h.NAT_NAME as COUNTRY,
                        f.income_date as SALES_DATE,
                        f.docu_no as DOCU_NO,
                        f.curr_cd as CURR_CD,
                        i.usd_rate as USD_RATE
                    from
                        kcd_code c,
                        ksv_invoice_mem b,
                        kcd_code e,
                        ksv_invoice_mst f,
                        ksv_order_ship g,
                        kcd_nation h,
                        kcd_currency i
                    where
                        b.order_cd = '${tStrOrderCd}'
                        and c.cd_group = 'SHIP_PTYPE'
                        and c.cd_code = b.ship_ptype
                        and e.cd_group = 'DELIVERY_TYPE'
                        and e.cd_code = b.delivery_type
                        and b.invoice_no = f.invoice_no
                        and g.order_cd = b.order_cd
                        and g.invoice_no = f.invoice_no
                        and g.nat_cd = h.nat_cd
                        and i.curr_cd = f.curr_cd
                        and i.start_date = f.ship_date
                        -- and f.docu_no is not null and f.docu_no <> ''
                `;
                var tRet_Import = await prisma.$queryRaw(
                    Prisma.raw(sqlStr_Import),
                );

                let sqlStr_Domestic = `
                    select
                        k2.invoice_no,
                        k2.order_cd,
                        k2.tot_qty,
                        k2.pay_qty,
                        k2.pay_price,
                        k2.pay_amt,
                        k2.usd_amt,
                        k2.krw_amt,
                        k2.tot_amt,
                        k2.bill_date,
                        k1.docu_no
                    from
                        ksv_tax_mst k1,
                        ksv_tax_mem k2
                    where
                        k2.order_cd = '${tStrOrderCd}'
                        and k1.tax_cd = k2.tax_cd
                `;
                var tRet_Domestic = await prisma.$queryRaw(
                    Prisma.raw(sqlStr_Domestic),
                );
                var tRet = [];
                tRet_Import.forEach((col, i) => {
                    var tObj = { ...col };
                    if (!tObj.SALES_DATE) tObj.SALES_DATE = tObj.SHIP_DATE;
                    if (!tObj.SHIP_DATE1) tObj.SHIP_DATE1 = tObj.SHIP_DATE0;
                    var tCheck0 = 0;
                    tRet_Domestic.forEach((col1, i1) => {
                        if (
                            col1.order_cd === tStrOrderCd &&
                            col1.invoice_no === col.INVOICE_NO
                        ) {
                            var tObj2 = { ...tObj };
                            tObj2.SALES_PRICE = col1.pay_price;
                            tObj2.SHIP_QTY = col1.pay_qty;
                            tObj2.SALES_DATE = col1.bill_date;
                            tObj2.DOCU_NO = col1.docu_no;
                            tRet.push(tObj2);
                            tCheck0 = 1;
                        }
                    });
                    if (tCheck0 <= 0) tRet.push(tObj);
                });

                var sumAmt = 0;
                var sumQty = 0;
                tRet.forEach((col2, i2) => {
                    sumQty += parseFloat(col2.SHIP_QTY);
                    if (col2.CURR_CD === tOrderObj.CURR_CD) {
                        sumAmt +=
                            parseFloat(col2.SHIP_QTY) *
                            parseFloat(col2.SALES_PRICE);
                    } else {
                        var tmpAmt =
                            parseFloat(col2.SHIP_QTY) *
                            parseFloat(col2.SALES_PRICE);
                        var tSrcAmt = tmpAmt * parseFloat(col2.USD_RATE); // SRC Curr-> USD 금액으로
                        var tDestAmt =
                            tSrcAmt / parseFloat(tCurrencyObj.USD_RATE); // Src USD -> Dest Curr 금액으로
                        sumAmt += parseFloat(tDestAmt);
                    }
                });

                sumAmt = parseFloat(sumAmt.toFixed(2));
                sumQty = parseFloat(sumQty.toFixed(2));
                var tAvrPrice = 0;
                var tUsdPrice = 0;
                if (sumQty <= 0);
                else {
                    tAvrPrice = sumAmt / sumQty;
                    if (tOrderObj.CURR_CD === 'KRW')
                        tAvrPrice = parseFloat(tAvrPrice.toFixed(0));
                    else tAvrPrice = parseFloat(tAvrPrice.toFixed(4));
                }

                if (tOrderObj.CURR_CD === 'USD') tUsdPrice = tAvrPrice;
                else {
                    tUsdPrice =
                        parseFloat(tAvrPrice) *
                        parseFloat(tCurrencyObj.USD_RATE);
                    tUsdPrice = parseFloat(tUsdPrice.toFixed(4));
                }

                let tSQL99 = `
                    update ksv_order_mst
                    set
                        avr_price = ${tAvrPrice},
                        usd_price = ${tUsdPrice}
                    where
                        order_cd = '${tStrOrderCd}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                let tSQL99 = `
                    delete from ksv_order_fob
                    where
                        order_cd = '${tStrOrderCd}'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);

                var tIdx1 = 0;
                for (tIdx1 = 0; tIdx1 < tRet.length; tIdx1++) {
                    var tObj1 = { ...tRet[tIdx1] };

                    var tInObj = {};
                    tInObj.ORDER_CD = tStrOrderCd;
                    tInObj.FOB_SEQ = tIdx1 + 1;
                    tInObj.SHIP_QTY = tObj1.SHIP_QTY;
                    tInObj.FOB = tObj1.SALES_PRICE;
                    tInObj.FOB100 = tObj1.SALES_PRICE;
                    let tSQL99 = AFLib.createTableSql('KSV_ORDER_FOB', tInObj);
                    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
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
                tObj.CODE = 'ERROR:Insert Tax Cd';
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = `SUCCEED:${strDocuNo}`;
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },

        mgrInsert_S0802_5_UPDATE_INCOME_DATE: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput1 = [...args.datas];
            var tInput2 = { ...args.datas1 };

            let sql0_1 = `           
          select db_name() as db_name
              `;
            var tRet0_1 = await prisma.$queryRaw(Prisma.raw(sql0_1));
            var tDbName = '';
            if (tRet0_1.length > 0) tDbName = tRet0_1[0].db_name;
            console.log(`Database Name:${tDbName}`);

            var requestArray = [];
            var strDocuNo = '';
            var tSQLArray = [];

            let tSQL99 = `
                delete from ksv_invoice_info
                where
                    invoice_no = '${tInput2.INVOICE_NO}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            var tInObj = {};
            tInObj.invoice_no = tInput2.INVOICE_NO;
            tInObj.tot_amt1 = tInput2.AMOUNT1;
            tInObj.tot_amt2 = tInput2.AMOUNT2;
            tInObj.tot_amt3 = tInput2.AMOUNT3;
            tInObj.income_date1 = tInput2.INCOME_DATE1;
            tInObj.income_date2 = tInput2.INCOME_DATE2;
            tInObj.income_date3 = tInput2.INCOME_DATE3;
            let tSQL99 = AFLib.createTableSql('ksv_invoice_info', tInObj);
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            let tSQL99 = `
                update ksv_invoice_mst
                set
                    income_date = '${tInObj.income_date1}'
                where
                    invoice_no = '${tInput2.INVOICE_NO}'
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
                tObj.CODE = `ERROR:Update Income Date:${e.message}`;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = `SUCCEED:Update Income Date`;
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },

        mgrInsert_S0802_5_UPDATE_DEPOSIT: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput = { ...args.datas };
            var tSQLArray = [];

            let sql0_1 = `           
          select db_name() as db_name
              `;
            var tRet0_1 = await prisma.$queryRaw(Prisma.raw(sql0_1));
            var tDbName = '';
            if (tRet0_1.length > 0) tDbName = tRet0_1[0].db_name;
            console.log(`Database Name:${tDbName}`);

            let tSQL99 = `
                update ksv_invoice_mst
                set
                    crdb_cd = '${tInput.CRDB_CD}',
                    deposit_amt = '${tInput.DEPOSIT_AMT}'
                where
                    invoice_no = '${tInput.INVOICE_NO}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            let sql0_2 = `
                select
                    *
                from
                    ksv_crdb_mem
                where
                    crdb_cd = '${tInput.CRDB_CD}'
                    and end_date = '${tRetDate1}'
                    and ref_no = ''
                    and pre_flag = '3'
                    and end_type = '0'
            `;
            var tRet0_2 = await prisma.$queryRaw(Prisma.raw(sql0_2));
            if (tRet0_2.length > 0) {
                let tSQL99 = `
                    update ksv_crdb_mem
                    set
                        crdb_amt = crdb_amt + ${tInput.DEPOSIT_AMT}
                    where
                        crdb_cd = '${tInput.CRDB_CD}'
                        and end_date = '${tRetDate1}'
                        and ref_no = ''
                        and pre_flag = '3'
                        and end_type = '0'
                `;
                const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            } else {
                let tSQL99 = `
                    insert into
                        ksv_crdb_mem (
                            crdb_cd,
                            end_date,
                            crdb_amt,
                            ref_no,
                            status_cd,
                            reg_user,
                            reg_datetime,
                            manage_date,
                            pre_flag,
                            end_type,
                            vat
                        )
                    values
                        (
                            '${tInput.CRDB_CD}',
                            '${tRetDate1}',
                            '${tInput.DEPOSIT_AMT}',
                            '',
                            '0',
                            '${tUserInfo.USER_ID}',
                            '${tRetDate}',
                            '',
                            '3',
                            '0',
                            0.0
                        )
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
                tObj.CODE = `ERROR:Update Income Date:${e.message}`;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = `SUCCEED:Update Deposit`;
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },

        mgrInsert_S0802_5_DELETE_DEPOSIT: async (_, args, contextValue) => {
            var tRetDate = AFLib.getCurrTime();
            var tRetDate1 = tRetDate.substring(0, 8);
            var tUserInfo = AFLib.getUserInfo(contextValue);

            var tInput = { ...args.datas };
            var tSQLArray = [];

            let sql0_1 = `           
          select db_name() as db_name
              `;
            var tRet0_1 = await prisma.$queryRaw(Prisma.raw(sql0_1));
            var tDbName = '';
            if (tRet0_1.length > 0) tDbName = tRet0_1[0].db_name;
            console.log(`Database Name:${tDbName}`);

            let sqlInvoice = `
                select
                    isnull(docu_no, '') as docu_no
                from
                    ksv_invoice_mst
                where
                    invoice_no = '${tInput.INVOICE_NO}'
            `;
            var retInvoice = await prisma.$queryRaw(Prisma.raw(sqlInvoice));
            var invoiceObj = { ...retInvoice[0] };
            if (invoiceObj.docu_no) {
                var tRetArray = [];
                var tObj = {};
                tObj.CODE = `ERROR:Deposit with docu_no applied cannot be deleted `;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            let tSQL99 = `
                update ksv_invoice_mst
                set
                    crdb_cd = '',
                    deposit_amt = 0
                where
                    invoice_no = '${tInput.INVOICE_NO}'
            `;
            const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            let sql0_2 = `
                select
                    crdb_cd,
                    end_date,
                    crdb_amt
                from
                    ksv_crdb_mem
                where
                    crdb_cd = '${tInput.CRDB_CD}'
                    and ref_no = ''
                    and pre_flag = '3'
                    and end_type = '0'
                    and crdb_amt >= ${tInput.DEPOSIT_AMT}
            `;
            var tRet0_2 = await prisma.$queryRaw(Prisma.raw(sql0_2));
            if (tRet0_2.length > 0) {
                let tSQL99 = `
                    update ksv_crdb_mem
                    set
                        crdb_amt = crdb_amt - ${tInput.DEPOSIT_AMT}
                    where
                        crdb_cd = '${tRet0_2[0].crdb_cd}'
                        and end_date = '${tRet0_2[0].end_date}'
                        and ref_no = ''
                        and pre_flag = '3'
                        and end_type = '0'
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
                tObj.CODE = `ERROR:Delete Deposit:${e.message}`;
                tObj.id = 0;
                tRetArray.push(tObj);
                return tRetArray;
            }

            var tRetArray = [];
            var tObj = {};
            tObj.CODE = `SUCCEED:Delete Deposit`;
            tObj.id = 0;
            tRetArray.push(tObj);

            return tRetArray;
        },
    },
};

export default moduleMutation_S0802_5;
