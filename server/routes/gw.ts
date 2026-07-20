const router = require('express').Router;
const gw = router();
var request_sync = require('sync-request');
import axios from 'axios';
import AFLib from '../src/commlib'; //PrismaClient 사용하기 위해 불러오기
import { Prisma } from '@prisma/client';
import prisma from '../src/db';
const moment = require('moment');
const config = require('./config');

/**
 * 숫자 문자열을 소수점 두 자리까지 포맷(반올림)하고
 * 세 자리마다 쉼표를 붙여 문자열로 반환합니다.
 *
 * @param {string} numberString - 포맷할 숫자 문자열.
 * @returns {string} 포맷된 숫자 문자열.
 */
function formatNumber(numberString, digit) {
    if (!digit) digit = 0;

    if (numberString === '') return '';
    if (numberString === '0') return '0';

    // 공백 제거 및 콤마 제거 후 숫자로 변환
    const cleaned = String(numberString).trim().replace(/,/g, '');
    const n = Number(cleaned);

    if (Number.isNaN(n)) {
        return '0';
    }
    // Intl.NumberFormat으로 2자리까지 포맷(반올림)
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: digit,
        maximumFractionDigits: digit,
    }).format(n);
}

// 국내 대금 지급
const make_docu_domestic = async (argData, argIdx, tCompanyCode) => {
    var tDateNew = new Date();
    tDateNew.setMonth(tDateNew.getMonth() + 1);
    var tZeroDate = '00';
    var tDateNew_M =
        tZeroDate.substring(0, 2 - String(tDateNew.getMonth() + 1).length) +
        String(tDateNew.getMonth() + 1);
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

    var tYY2 = tRetDate.substring(2, 4);
    var tSEQ = tRetDate.substring(4, 14);

    var tInput = {
        ...argData,
    };
    var tSQLArray = [];
    var strBillDate = argData.TAXBILL_DATE;

    let sql9_1 = `
              select db_name() as db_name
              `;
    var tRet9_1 = await prisma.$queryRaw(Prisma.raw(sql9_1));
    var tDbName = '';
    var tRemark2 = '';
    if (tRet9_1.length > 0) tDbName = tRet9_1[0].db_name;
    console.log(`DataBase Name:${tDbName}`);
    if (tDbName === 'shints');
    else tRemark2 = '(Afroba 테스트.삭제요)';

    let sql = `
        select
            a.*,
            isnull(b.TAX_KIND, '') as TAX_KIND
        from
            kcd_gw_taxbill_kr a
            left join ksv_bill_mst b on a.bill_cd = b.bill_cd
        where
            a.taxbill_cd = '${tInput.TAXBILL_CD}'
    `;
    var nRet = await prisma.$queryRaw(Prisma.raw(sql));

    var requestArray = [];
    var strDocuNo = '';
    var objTaxBill = {
        ...nRet[0],
    };
    console.log(`TAXKIND: ${objTaxBill.TAX_KIND}`);
    if (!objTaxBill.TAX_KIND) {
        if (parseFloat(argData.TAX) > 0) objTaxBill.TAX_KIND = '과세';
        else objTaxBill.TAX_KIND = '면세';
    }

    var strOutDate = tRetDate1;

    // 접속아이
    var strMngPart = '8400';
    var strMngId = '';
    var strMngName = '';
    var strMngEmail = '';
    var strMngTel = '';
    var strDocuDate = tRetDate1;

    let sql5 = `
        select
            cd_code,
            cd_name
        from
            kcd_code
        where
            cd_group = 'DOCU_MNG1'
    `;
    var tRet5 = await prisma.$queryRaw(Prisma.raw(sql5));
    tRet5.forEach((col, i) => {
        if (col.cd_code === 'PART') strMngPart = col.cd_name;
        if (col.cd_code === 'ID') strMngId = col.cd_name;
        if (col.cd_code === 'NAME') strMngName = col.cd_name;
        if (col.cd_code === 'EMAIL') strMngEmail = col.cd_name;
        if (col.cd_code === 'TEL') strMngTel = col.cd_name;
    });

    // Docu No
    let sql7 = `
        select
            isnull(max(no_docu), '00000') as max_seq
            -- from neoe.neoe.fi_adocu
        from
            neoe_fi_adocu
        where
            no_docu like 'DM${strDocuDate}%'
    `;
    var tRet7 = await prisma.$queryRaw(Prisma.raw(sql7));
    var tMaxDocuNo = 1;
    if (tRet7[0].max_seq === '00000') {
        tMaxDocuNo = parseFloat(tRet7[0].max_seq) + 1;
    } else {
        tMaxDocuNo = parseFloat(tRet7[0].max_seq.substring(10, 15)) + 1;
    }
    var strMaxDocuNo = AFLib.printF(tMaxDocuNo, 5);
    var strDocuNo = `DM${strDocuDate}${strMaxDocuNo}`;
    var strTaxNo = `${strDocuNo}001`;
    var strDocuDate = tRetDate1;

    var sql0_0 = `
        select
            isnull(a.NEOE_NO, '') as NEOE_NO,
            isnull(b.CD_FLAG, '100') as VENDOR_MATL_TYPE_CD,
            isnull(a.REG_NO, '') as REG_NO,
            isnull(a.VENDOR_NAME, '') as VENDOR_NAME,
            isnull(a.VENDOR_MATL_TYPE, '') as VENDOR_MATL_TYPE,
            isnull(a.NSR_TR_CD, '') as NSR_TR_CD
        from
            kcd_vendor a
            left join kcd_code b on b.cd_group = 'VENDOR_MATL_TYPE'
            and a.vendor_matl_type = b.cd_code
        where
            vendor_cd = '${argData.VENDOR_CD}'
    `;
    var tRet0_0 = await prisma.$queryRaw(Prisma.raw(sql0_0));
    var tVendorObj = {};
    var strNeoeNo = '';
    var strVendorMatlType = '';
    var strNeoeAgentCd = '';
    var strNeoeAgentName = '';
    var vendorMatlType = '';
    var nsrTrCd = '';
    var strRegNo = '';
    if (tRet0_0.length > 0) {
        strNeoeNo = tRet0_0[0].NEOE_NO;
        strVendorMatlType = tRet0_0[0].VENDOR_MATL_TYPE_CD;
        vendorMatlType = tRet0_0[0].VENDOR_MATL_TYPE;
        strNeoeAgentCd = strNeoeNo;
        strNeoeAgentName = tRet0_0[0].VENDOR_NAME;
        nsrTrCd = tRet0_0[0].NSR_TR_CD;
        strRegNo = tRet0_0[0].REG_NO.replace(/-/gi, '');
    }

    var strAppKey = ''; // DM-,   ND-
    var strMatlType = '';
    var strRemark = '';
    var strDocType = strAppKey;

    var strLcReport = '';
    var strPO = '';
    var strPAY_DATE = '';
    var strReceive = '';
    var strReceiveCd = '';

    sql0_0 = `
        select
            a.pay_report,
            isnull(c.pay_report, '') as lc_pay_report,
            a.po_cd,
            max(a.pay_date) as s_pay_date
        from
            ksv_stock_in a
            left join ksv_stock_in c on a.pu_cd = c.pu_cd
            and a.order_cd = c.order_CD
            and a.po_cd = c.PO_CD
            and a.po_seq = c.po_seq
            and a.matl_cd = c.matl_cd
            and a.lc_bill_no = c.pay_report
            and c.lc_qty > 0
            and c.in_qty <= 0
            -- where a.pay_report = '${argData.DOC_NO}'
        where
            a.bill_no = '${objTaxBill.BILL_CD}'
        group by
            a.pay_report,
            isnull(c.pay_report, ''),
            a.po_cd
    `;
    tRet0_0 = [];
    tRet0_0 = await prisma.$queryRaw(Prisma.raw(sql0_0));
    var strPayReport = argData.DOC_NO;
    if (tRet0_0.length > 0) {
        strLcReport = tRet0_0[0].lc_pay_report;
        strPO = tRet0_0[0].po_cd;
        strPAY_DATE = tRet0_0[0].s_pay_date;
        if (strPO.substring(0, 1) === 'E') {
            strReceive = '에티오피아';
            strReceiveCd = '200';
        } else {
            strReceive = '베트남';
            strReceiveCd = '100';
        }
    }

    var inCurrCd = argData.CURR_CD;
    var strCurrNeoe = '';
    var strCurrCd = '';
    if (inCurrCd === 'KRW') {
        strCurrNeoe = '000';
    } else if (inCurrCd === 'USD') {
        strCurrNeoe = '001';
        if (parseFloat(argData.VAT_AMT) <= 0) {
            if (argData.PUR_APP === 'O') strCurrCd = '25102';
            else strCurrCd = '25101';
        } else {
            strCurrCd = '25101';
        }
    } else if (inCurrCd === 'JPY') {
        strCurrNeoe = '002';
        strCurrCd = '25101';
    } else if (inCurrCd === 'EUR') {
        strCurrNeoe = '003';
        if (parseFloat(argData.VAT_AMT) <= 0) {
            if (argData.PUR_APP === 'O') strCurrCd = '25102';
            else strCurrCd = '25101';
        } else {
            strCurrCd = '25101';
        }
    } else {
        return `지원하지않는 Curr`;
    }

    /*
    let sql1 = `
        select
            rate_base
        from
            neoe_ma_exchange
        where
            curr_sour = '${strCurrNeoe}'
            and yymmdd = '${tRetDate1}'
    `;
    var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
    var strRateBase = '1';
    if (tRet1.length > 0) strRateBase = tRet1[0].rate_base;
    */

    let sql1 = `
        select
            *
        from
            kcd_currency
        where
            curr_cd = '${argData.CURR_CD}'
            and start_date = '${tRetDate1}'
    `;
    var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
    var strRateBase = '1';
    if (tRet1.length > 0) strRateBase = tRet1[0].WON_AMT2;
    else {
        let sql1 = `
            select
                *
            from
                kcd_currency
            where
                curr_cd = '${argData.CURR_CD}'
                and start_date = (
                    select
                        max(start_date)
                    from
                        kcd_currency
                    where
                        curr_cd = '${argData.CURR_CD}'
                )
        `;
        var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
        if (tRet1.length > 0) strRateBase = tRet1[0].WON_AMT2;
    }

    var strTaxCd = '';
    var strTaxNm = '';
    var strCdAcct = '';
    var strCdAcct2 = '';
    var strLocCd = '';
    var strLocNm = '';
    var strNeoeType = '';
    var strLcflag = '';
    var strRemark = '';
    var strMNGD2 = '';
    var strMNGD7 = '';
    var strCdacct2 = '';
    var taxAdd = true;

    if (objTaxBill.TAX_KIND === '3') {
        strTaxCd = '26';
        strTaxNm = '면세(세금계산서)';
        strCdAcct = '15400';
        strLocCd = '100';
        strLocNm = '국내';
    } else if (objTaxBill.TAX_KIND === '2') {
        strTaxCd = '23';
        strTaxNm = '영세(세금계산서)';
        strCdAcct = '15400';
        strLocCd = '100';
        strLocNm = '국내';
    } else if (objTaxBill.TAX_KIND === '1') {
        strTaxCd = '21';
        strTaxNm = '과세(세금계산서)';
        strCdAcct = '15400';
        strLocCd = '100';
        strLocNm = '국내';
    } else if (objTaxBill.TAX_KIND === '4') {
        strTaxCd = '26';
        strTaxNm = '면세(세금계산서)';
        strCdAcct = '15400';
        strCurrCd = '25102';
        strLocCd = '200';
        strLocNm = '수입';
        taxAdd = false;
    }

    if (inCurrCd === 'KRW') {
        strCdAcct = '13101'; // 원화선급금
        strCdAcct2 = '10301'; // 원화보통예금
    } else {
        strCdAcct = '13102'; // 외화선급금
        strCdAcct2 = '10302'; // 외화보통예금
    }

    var strMatlType = '';
    var strRemark = '';
    if (taxAdd) {
        if (vendorMatlType === 'M') {
            strMatlType = '100';
            strRemark = '국내자재_원자재';
        } else if (vendorMatlType === 'S') {
            strMatlType = '300';
            strRemark = '국내자재_부자재';
        }

        if (strDocType.substring(0, 2) === 'DM') {
            strRemark = `${strRemark}/즉시결제`;
        }
        if (strDocType.substring(0, 2) === 'ND') {
            strRemark = `${strRemark}/월마감`;
        }
    } else {
        if (vendorMatlType === 'M') {
            strMatlType = '100';
        } else if (vendorMatlType === 'S') {
            strMatlType = '300';
        }
        strRemark = '수입원재료';
    }

    /*
    var  strNeoeType = '원재료';
    if(strNeoeType === '원재료'){
       strCdacct = '15400'; //원재료
       strLcflag = '0';
       strRemark = '수입원재료';
       strMNGD2 = strVendorMatlType;
       strMNGD7 = strReceivecd;
       strCdacct2 = '25102';
    }
    else if(strNeoeType === '외화선급금'){
       strCdacct = '13102'; //원재료
       strLcflag = '3';
       strRemark = '수입원재료';
       strMNGD2 = '';
       strMNGD7 = strVendorMatlType;
       strCdacct2 = '25102';
    }
    else if(strNeoeType === '미착품'){
       strCdacct = '16500'; //미착품
       strLcflag = '1';
       strRemark = strLcReport;
       strMNGD2 = strVendorMatlType;
       strMNGD7 = strReceivecd;
       strCdacct2 = '25102';
    }
    else if(strNeoeType === '상품'){
       strCdacct = '15100'; //상품
       strLcflag = '2';
       strRemark = '상품';
       strMNGD2 =  strVendorMatlType;
       strMNGD7 =  strReceivecd;
       strCdacct2 = '25102';
    }
    */
    var strRemark2 = '';
    if (tDbName === 'shints');
    else strRemark2 = 'Afroba Test(삭제요)';
    strRemark = `${strRemark} ${strRemark2} ${argData.TAXBILL_CD}`;

    //

    var strTotAmt = parseFloat(argData.TOT_AMOUNT); // 부가세 포함금액
    var strVatAmt = parseFloat(argData.TAX);
    var strMinusAmt = parseFloat(argData.MINUS_AMOUNT);

    if (strCurrCd !== 'KRW') {
        strTotAmt = parseFloat(strTotAmt) * parseFloat(strRateBase);
        strTotAmt = parseFloat(strTotAmt).toFixed(0);

        var valTot = parseFloat(strTotAmt);

        strVatAmt = parseFloat(strVatAmt) * parseFloat(strRateBase);
        strVatAmt = parseFloat(strVatAmt).toFixed(0);

        var valVat = parseFloat(strVatAmt);
        var valMinus = valTot - valVat;
        strMinusAmt = parseFloat(valMinus).toFixed(0);
    }

    // TT인경우 : 원재료, L/C인경우 : 미착품
    // 차변/부가세/대변

    var tWObj = {};
    tWObj.DATA1 = {};
    tWObj.DATA2 = {};
    tWObj.DATA3 = {};

    // 차변 - 바이어별(cd_cd에 neoe_buyer_cd) , 부가세- 바이어별, 대변 - 1개(업체별)

    var tRowNo = 1;
    var tRowNo1 = 1;

    // 차변
    var tInObj = {};
    tInObj.row_id = strDocuNo;
    tInObj.row_no = `${tRowNo}`;
    tInObj.no_tax = '*';
    tInObj.cd_pc = '1000';
    tInObj.cd_wdept = strMngPart; // 8400
    tInObj.no_docu = strDocuNo;
    tInObj.no_doline = `${tRowNo}`;
    tInObj.cd_company = '1000';
    tInObj.id_write = strMngId; // 2217
    tInObj.cd_docu = '11';
    tInObj.dt_acct = strDocuDate;
    tInObj.st_docu = '1';
    tInObj.tp_drcr = '1';
    tInObj.cd_acct = strCdAcct; // 원화선급금
    //tInObj.cd_acct = strCdAcct2
    //tInObj.amt = strMinusAmt;   // 한화금액
    tInObj.amt = strTotAmt;
    tInObj.cd_partner = strNeoeAgentCd;
    tInObj.dt_start = '';
    tInObj.dt_end = '';
    tInObj.am_taxstd = '0';
    tInObj.am_addtax = '0';

    if (parseFloat(strVatAmt) > 0) tInObj.tp_tax = strTaxCd;
    else tInObj.tp_tax = '';

    tInObj.no_company = '';
    tInObj.nm_note = strRemark;
    tInObj.cd_bizarea = '1000';
    tInObj.cd_cc = '';
    tInObj.ucd_mng1 = '';
    tInObj.ucd_mng2 = '';
    tInObj.ucd_mng3 = '';
    tInObj.ucd_mng4 = '';
    tInObj.ucd_mng5 = '';
    tInObj.tp_docu = 'N';
    tInObj.no_acct = '0';
    tInObj.cd_exch = strCurrNeoe;
    tInObj.rt_exch = strRateBase;
    if (strCurrNeoe === '000') tInObj.am_ex = '0';  // 원화 결제인 경우 외화금액 = 0
    else tInObj.am_ex = argData.TOT_AMOUNT; // 외화금액
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
    /*
    tInObj.cd_mngd2 = strMatlType;
    tInObj.nm_mngd2 = '';
    tInObj.cd_mngd3 = strLocCd;
    tInObj.nm_mngd3 = strLocNm;
    */
    tInObj.cd_mngd2 = ''; // 선급금 입력일자
    tInObj.nm_mngd2 = '';
    tInObj.cd_mngd3 = ''; // 선급금 처리일자
    tInObj.nm_mngd3 = '';
    tInObj.cd_mngd4 = '';
    tInObj.nm_mngd4 = '';
    tInObj.cd_mngd5 = '';
    tInObj.nm_mngd5 = '';
    tInObj.cd_mngd6 = '';
    tInObj.nm_mngd6 = ''; // 처리일자
    tInObj.cd_mngd7 = '';
    tInObj.nm_mngd7 = '';
    tInObj.cd_mngd8 = '';
    tInObj.nm_mngd8 = '';
    tInObj.yn_iss = '0';
    tInObj.final_status = '00';
    tInObj.no_bill = '';
    tInObj.nsrTrCd = nsrTrCd;
    tWObj.DATA1 = {
        ...tInObj,
    };

    // 부가세; 13500
    /*
    tRowNo += 1;
    tInObj = {};
    tInObj.row_id = strDocuNo;
    tInObj.row_no = `${tRowNo}`;
    tInObj.no_tax = strTaxNo;
    tInObj.cd_pc = '1000';
    tInObj.cd_wdept = strMngPart; // 8400  
    tInObj.no_docu = strDocuNo;
    tInObj.no_doline = `${tRowNo}`;
    tInObj.cd_company = '1000';
    tInObj.id_write = strMngId; // 2217
    tInObj.cd_docu = '11';
    tInObj.dt_acct = strDocuDate;
    tInObj.st_docu = '1';
    tInObj.tp_drcr = '1';
    tInObj.cd_acct = '13500';  // 부가세 
    tInObj.amt = strVatAmt;   // 한화금액
    tInObj.cd_partner = strNeoeAgentCd;
    tInObj.dt_start = strBillDate;
    tInObj.dt_end = '';
    tInObj.am_taxstd = strMinusAmt;
    tInObj.am_addtax = strVatAmt;
    tInObj.tp_tax = strTaxCd;
    tInObj.no_company = strRegNo;
    tInObj.nm_note = strRemark;
    tInObj.cd_bizarea = '1000';
    tInObj.cd_cc = '';
    tInObj.ucd_mng1 = '';
    tInObj.ucd_mng2 = '';
    tInObj.ucd_mng3 = '';
    tInObj.ucd_mng4 = '';
    tInObj.ucd_mng5 = '';
    tInObj.tp_docu = 'N';
    tInObj.no_acct = '0';
    tInObj.cd_exch = strCurrNeoe; 
    tInObj.rt_exch = strRateBase;
    tInObj.am_ex = argData.TAX; // 외화금액
    tInObj.no_to = '';
    tInObj.dt_shipping = '';
    tInObj.tp_gubun = '3';
    tInObj.md_tax1 = '';
    tInObj.nm_item1 = '';
    tInObj.nm_size1 = '';
    tInObj.qt_tax1 = '1';
    tInObj.am_prc1 = '0';
    tInObj.am_supply1 = '0';
    tInObj.am_tax1 = '0';
    tInObj.nm_note1 = '';
    tInObj.cd_mngd1 = strNeoeAgentCd;
    tInObj.nm_mngd1 = strNeoeAgentName;
    tInObj.cd_mngd2 = strTaxCd;
    tInObj.nm_mngd2 = strTaxNm;
    tInObj.cd_mngd3 = '';
    tInObj.nm_mngd3 = tRetDate1;
    tInObj.cd_mngd4 = '';
    tInObj.nm_mngd4 = strDocuDate;
    tInObj.cd_mngd5 = '';
    tInObj.nm_mngd5 = '';
    tInObj.cd_mngd6 = '';
    tInObj.nm_mngd6 = ''; // 원화금액
    tInObj.cd_mngd7 = '';
    tInObj.nm_mngd7 = '';
    tInObj.cd_mngd8 = '';
    tInObj.nm_mngd8 = '';
    tInObj.yn_iss = '0';
    tInObj.final_status = '00';
    tInObj.no_bill = ''
    tInObj.sell_dam_nm = strMngName;
    tInObj.sell_dam_email = strMngEmail;
    tInObj.sell_dam_mobil = strMngTel;
    if (taxAdd) tWObj.DATA2 = { ...tInObj };
    else  tWObj.DATA2 = {};
    */
    tWObj.DATA2 = {};

    // 원화미지급금
    tRowNo += 1;
    tInObj = {};
    tInObj.row_id = strDocuNo;
    tInObj.row_no = `${tRowNo}`;
    tInObj.no_tax = '*';
    tInObj.cd_pc = '1000';
    tInObj.cd_wdept = strMngPart; // 8400
    tInObj.no_docu = strDocuNo;
    tInObj.no_doline = `${tRowNo}`;
    tInObj.cd_company = '1000';
    tInObj.id_write = strMngId; // 2217
    tInObj.cd_docu = '11';
    tInObj.dt_acct = strDocuDate;
    tInObj.st_docu = '1';
    tInObj.tp_drcr = '2'; // 차변,대변 구분
    tInObj.cd_acct = strCdAcct2; // 외화,원화 보통예금
    tInObj.amt = strTotAmt; // 한화금액
    tInObj.cd_partner = strNeoeAgentCd;
    tInObj.dt_start = '';
    tInObj.dt_end = strPAY_DATE;
    tInObj.am_taxstd = '0';
    tInObj.am_addtax = '0';

    if (parseFloat(strVatAmt) > 0) tInObj.tp_tax = strTaxCd;
    else tInObj.tp_tax = '';

    tInObj.no_company = '';
    tInObj.nm_note = strRemark;
    tInObj.cd_bizarea = '1000';
    tInObj.cd_cc = '';
    tInObj.ucd_mng1 = '';
    tInObj.ucd_mng2 = '';
    tInObj.ucd_mng3 = '';
    tInObj.ucd_mng4 = '';
    tInObj.ucd_mng5 = '';
    tInObj.tp_docu = 'N';
    tInObj.no_acct = '0';
    tInObj.cd_exch = strCurrNeoe;
    tInObj.rt_exch = strRateBase;
    if (strCurrNeoe === '000') tInObj.am_ex = '0';  // 원화 결제인 경우 외화금액 = 0
    else tInObj.am_ex = argData.TOT_AMOUNT; // 외화금액
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
    //tInObj.cd_mngd1 = strNeoeAgentCd;
    //tInObj.nm_mngd1 = strNeoeAgentName;
    tInObj.cd_mngd1 = '';
    tInObj.nm_mngd1 = '';
    //tInObj.cd_mngd2 = strMatlType;
    tInObj.cd_mngd2 = '';
    tInObj.nm_mngd2 = '';
    /*
    tInObj.cd_mngd3 = strLocCd;
    tInObj.nm_mngd3 = strLocNm;
    */
    tInObj.cd_mngd3 = '';
    tInObj.nm_mngd3 = '';
    tInObj.cd_mngd4 = '';
    tInObj.nm_mngd4 = '';
    tInObj.cd_mngd5 = '';
    tInObj.nm_mngd5 = '';
    tInObj.cd_mngd6 = '';
    tInObj.nm_mngd6 = ''; // 처리일자
    tInObj.cd_mngd7 = '';
    tInObj.nm_mngd7 = '';
    tInObj.cd_mngd8 = '';
    tInObj.nm_mngd8 = '';
    tInObj.yn_iss = '0';
    tInObj.final_status = '00';
    tInObj.no_bill = '';
    tWObj.DATA3 = { ...tInObj };
    /*
    tWObj.DATA2 = {
        ...tInObj
    };
    */

    requestArray.push(tWObj);

    /*
    try {
       await prisma.$transaction(tSQLArray);
    } catch (e) {
        var tMessage  = 'ERROR:Insert SHIP Record';
        return (tMessage);
    }
    */

    tDbName = 'shints';
    var isProcess = 0;
    console.log(
        'in make_docu_domestic--------------------------tCompanyCode',
        tCompanyCode,
    );

    if (tDbName === 'shints') {
        let neoeOrIcubeApiDirector = 'restapi';
        if (tCompanyCode !== 'shints') neoeOrIcubeApiDirector = 'nsrapi';

        let neoeOrIcubeApiPath = 'insert_docu_domestic_material';
        if (tCompanyCode !== 'shints') neoeOrIcubeApiPath = 'insert_docu';

        try {
            var res_sync = request_sync(
                'POST',
                `https://erp.shints.com:3311/${neoeOrIcubeApiDirector}/${neoeOrIcubeApiPath}/${argData.REG_USER}/MATERIAL`,
                {
                    json: requestArray,
                },
            );
            var tResData = JSON.parse(res_sync.getBody('utf8'));
            console.log(tResData);
        } catch (e) {
            console.log(`request_sync:; neoe : error: ${e.message}`);
            isProcess = 1;
        }

        if (isProcess === 0 && tCompanyCode === 'shints') {
            var tIdx9 = 0;
            tSQLArray = [];
            for (tIdx9 = 0; tIdx9 < tResData.length; tIdx9++) {
                var tOne = {
                    ...tResData[tIdx9],
                };
                var tCols = tOne.INVOICE_NO.split(' ');
                var tInvoiceNo = tCols[1];
                strDocuNo = tOne.DOCU_NO;

                /*
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
                */
            }

            let sql1_2 = `
                select
                    *
                from
                    neoe_fi_adocu
                where
                    row_id = '${strDocuNo}'
            `;
            var tRet1_2 = await prisma.$queryRaw(Prisma.raw(sql1_2));
            if (tRet1_2.length > 0) {
                let sql1_3 = `
                    delete from neoe_fi_adocu
                    where
                        row_id = '${strDocuNo}'
                `;
                var tRet1_3 = await prisma.$queryRaw(Prisma.raw(sql1_3));

                let sql1_4 = `
                    delete from kcd_app_data
                    where
                        neoe_no = '${strDocuNo}'
                `;
                var tRet1_4 = await prisma.$queryRaw(Prisma.raw(sql1_4));
            }

            var tInObj = {
                ...tWObj.DATA1,
            };
            tInObj.row_id = strDocuNo;
            tInObj.no_docu = strDocuNo;
            var tSQL99 = AFLib.createTableSql('neoe_fi_adocu', tInObj);
            var tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            tInObj = {
                ...tWObj.DATA2,
            };
            if (typeof tInObj.row_id !== 'undefined') {
                tInObj.row_id = strDocuNo;
                tInObj.no_docu = strDocuNo;
                tSQL99 = AFLib.createTableSql('neoe_fi_adocu', tInObj);
                tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            }

            tInObj = {
                ...tWObj.DATA3,
            };
            tInObj.row_id = strDocuNo;
            tInObj.no_docu = strDocuNo;
            tSQL99 = AFLib.createTableSql('neoe_fi_adocu', tInObj);
            tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);
        }
    } else {
        if (tCompanyCode === 'shints') {
            let sql1_2 = `
                select
                    *
                from
                    neoe_fi_adocu
                where
                    row_id = '${strDocuNo}'
            `;

            var tRet1_2 = await prisma.$queryRaw(Prisma.raw(sql1_2));
            if (tRet1_2.length > 0) {
                let sql1_3 = `
                    delete from neoe_fi_adocu
                    where
                        row_id = '${strDocuNo}'
                `;
                var tRet1_3 = await prisma.$queryRaw(Prisma.raw(sql1_3));

                let sql1_4 = `
                    delete from kcd_app_data
                    where
                        neoe_no = '${strDocuNo}'
                `;
                var tRet1_4 = await prisma.$queryRaw(Prisma.raw(sql1_4));
            }

            var tInObj = {
                ...tWObj.DATA1,
            };
            tInObj.row_id = strDocuNo;
            tInObj.no_docu = strDocuNo;
            tSQL99 = AFLib.createTableSql('neoe_fi_adocu', tInObj);
            tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            tInObj = {
                ...tWObj.DATA2,
            };
            if (typeof tInObj.row_id !== 'undefined') {
                tInObj.row_id = strDocuNo;
                tInObj.no_docu = strDocuNo;
                tSQL99 = AFLib.createTableSql('neoe_fi_adocu', tInObj);
                tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            }

            tInObj = {
                ...tWObj.DATA3,
            };
            tInObj.row_id = strDocuNo;
            tInObj.no_docu = strDocuNo;
            tSQL99 = AFLib.createTableSql('neoe_fi_adocu', tInObj);
            tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);
        }
    }
    var tReturn = `SUCCEED:Insert Docu:${strDocuNo}`;

    // STSIN, DC_AMOUNT : buy_date Setting

    tInObj = {};
    tInObj.po_cd = '';
    tInObj.pay_date = argData.PAY_DATE;
    tInObj.taxbill_date = argData.TAXBILL_DATE;
    tInObj.buy_date = strDocuDate;
    tInObj.in_date = argData.CLOSING_DATE;
    tInObj.pay_curr_cd = argData.CURR_CD;
    tInObj.vendor_cd = argData.VENDOR_CD;
    tInObj.neoe_no = strDocuNo;
    tInObj.reg_user = argData.REG_USER;
    tInObj.amount = strTotAmt;
    tInObj.neoe_line = tRowNo;
    tInObj.taxbill_cd = argData.TAXBILL_CD;
    tInObj.bill_cd = argData.BILL_CD;
    tInObj.stsout_cd = '';
    tInObj.stsin_cd = '';
    tInObj.cd_acct = strCdAcct;
    tSQL99 = AFLib.createTableSql('kcd_app_data', tInObj);
    tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
    if (isProcess === 0) tSQLArray.push(tSQL99_1);

    try {
        await prisma.$transaction(tSQLArray);
    } catch (e) {
        var tMessage = 'ERROR:Insert SHIP Record';
        return tMessage;
    }

    return tReturn;
};

const make_docu_domestic_taxbill = async (argData, argIdx, tCompanyCode) => {
    var tDateNew = new Date();
    tDateNew.setMonth(tDateNew.getMonth() + 1);
    var tZeroDate = '00';
    var tDateNew_M =
        tZeroDate.substring(0, 2 - String(tDateNew.getMonth() + 1).length) +
        String(tDateNew.getMonth() + 1);
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

    var tYY2 = tRetDate.substring(2, 4);
    var tSEQ = tRetDate.substring(4, 14);

    var tInput = {
        ...argData,
    };
    var tSQLArray = [];
    var strBillDate = argData.TAXBILL_DATE;

    let sql9_1 = `
              select db_name() as db_name
              `;
    var tRet9_1 = await prisma.$queryRaw(Prisma.raw(sql9_1));
    var tDbName = '';
    var tRemark2 = '';
    if (tRet9_1.length > 0) tDbName = tRet9_1[0].db_name;
    console.log(`DataBase Name:${tDbName}`);
    if (tDbName === 'shints');
    else tRemark2 = '(Afroba 테스트.삭제요)';

    let sql = `
        select
            a.*,
            isnull(b.TAX_KIND, '') as TAX_KIND
        from
            kcd_gw_taxbill_kr a
            left join ksv_bill_mst b on a.bill_cd = b.bill_cd
        where
            a.taxbill_cd = '${tInput.TAXBILL_CD}'
    `;
    var nRet = await prisma.$queryRaw(Prisma.raw(sql));

    var requestArray = [];
    var strDocuNo = '';
    var objTaxBill = {
        ...nRet[0],
    };
    console.log(`TAXKIND: ${objTaxBill.TAX_KIND}`);
    if (!objTaxBill.TAX_KIND) {
        if (parseFloat(argData.TAX) > 0) objTaxBill.TAX_KIND = '과세';
        else objTaxBill.TAX_KIND = '면세';
    }

    var strOutDate = tRetDate1;

    // 접속아이
    var strMngPart = '8400';
    var strMngId = '';
    var strMngName = '';
    var strMngEmail = '';
    var strMngTel = '';

    // var strDocuDate = tRetDate1;
    var strDocuDate = argData.CLOSING_DATE;

    let sql5 = `
        select
            cd_code,
            cd_name
        from
            kcd_code
        where
            cd_group = 'DOCU_MNG2'
    `;
    var tRet5 = await prisma.$queryRaw(Prisma.raw(sql5));
    tRet5.forEach((col, i) => {
        if (col.cd_code === 'PART') strMngPart = col.cd_name;
        if (col.cd_code === 'ID') strMngId = col.cd_name;
        if (col.cd_code === 'NAME') strMngName = col.cd_name;
        if (col.cd_code === 'EMAIL') strMngEmail = col.cd_name;
        if (col.cd_code === 'TEL') strMngTel = col.cd_name;
    });

    // Docu No
    let sql7 = `
        select
            isnull(max(no_docu), '00000') as max_seq
            -- from neoe.neoe.fi_adocu
        from
            neoe_fi_adocu
        where
            no_docu like 'DM${strDocuDate}%'
    `;
    var tRet7 = await prisma.$queryRaw(Prisma.raw(sql7));
    var tMaxDocuNo = 1;
    if (tRet7[0].max_seq === '00000') {
        tMaxDocuNo = parseFloat(tRet7[0].max_seq) + 1;
    } else {
        tMaxDocuNo = parseFloat(tRet7[0].max_seq.substring(10, 15)) + 1;
    }
    var strMaxDocuNo = AFLib.printF(tMaxDocuNo, 5);
    var strDocuNo = `DM${strDocuDate}${strMaxDocuNo}`;
    // var strTaxNo = `${strDocuNo}001`;
    var strTaxNo = `${strDocuNo}`;

    var sql0_0 = `
        select
            isnull(a.NEOE_NO, '') as NEOE_NO,
            isnull(b.CD_FLAG, '100') as VENDOR_MATL_TYPE_CD,
            isnull(a.REG_NO, '') as REG_NO,
            isnull(a.VENDOR_NAME, '') as VENDOR_NAME,
            isnull(a.VENDOR_MATL_TYPE, '') as VENDOR_MATL_TYPE,
            isnull(a.NSR_TR_CD, '') as NSR_TR_CD
        from
            kcd_vendor a
            left join kcd_code b on b.cd_group = 'VENDOR_MATL_TYPE'
            and a.vendor_matl_type = b.cd_code
        where
            vendor_cd = '${argData.VENDOR_CD}'
    `;
    console.log(`sql0_0: ${sql0_0}`);
    var tRet0_0 = await prisma.$queryRaw(Prisma.raw(sql0_0));
    console.log(tRet0_0);
    var tVendorObj = {};
    var strNeoeNo = '';
    var strVendorMatlType = '';
    var strNeoeAgentCd = '';
    var strNeoeAgentName = '';
    var vendorMatlType = '';
    var strRegNo = '';
    var nsrTrCd = '';

    if (tRet0_0.length > 0) {
        strNeoeNo = tRet0_0[0].NEOE_NO;
        strVendorMatlType = tRet0_0[0].VENDOR_MATL_TYPE_CD;
        vendorMatlType = tRet0_0[0].VENDOR_MATL_TYPE;
        strNeoeAgentCd = strNeoeNo;
        strNeoeAgentName = tRet0_0[0].VENDOR_NAME;
        nsrTrCd = tRet0_0[0].NSR_TR_CD;
        strRegNo = tRet0_0[0].REG_NO.replace(/-/gi, '');
    }

    var strAppKey = ''; // DM-,   ND-
    var strMatlType = '';
    var strRemark = '';
    var strDocType = strAppKey;

    var strLcReport = '';
    var strPO = '';
    var strPAY_DATE = '';
    var strReceive = '';
    var strReceiveCd = '';

    sql0_0 = `
        select
            a.pay_report,
            isnull(c.pay_report, '') as lc_pay_report,
            a.po_cd,
            max(a.pay_date) as s_pay_date
        from
            ksv_stock_in a
            left join ksv_stock_in c on a.pu_cd = c.pu_cd
            and a.order_cd = c.order_CD
            and a.po_cd = c.PO_CD
            and a.po_seq = c.po_seq
            and a.matl_cd = c.matl_cd
            and a.lc_bill_no = c.pay_report
            and c.lc_qty > 0
            and c.in_qty <= 0
            -- where a.pay_report = '${argData.DOC_NO}'
        where
            a.bill_no = '${objTaxBill.BILL_CD}'
        group by
            a.pay_report,
            isnull(c.pay_report, ''),
            a.po_cd
    `;
    tRet0_0 = [];
    tRet0_0 = await prisma.$queryRaw(Prisma.raw(sql0_0));
    var strPayReport = argData.DOC_NO;
    if (tRet0_0.length > 0) {
        strLcReport = tRet0_0[0].lc_pay_report;
        strPO = tRet0_0[0].po_cd;
        strPAY_DATE = tRet0_0[0].s_pay_date;
        if (strPO.substring(0, 1) === 'E') {
            strReceive = '에티오피아';
            strReceiveCd = '200';
        } else {
            strReceive = '베트남';
            strReceiveCd = '100';
        }
    }

    var inCurrCd = argData.CURR_CD;
    var strCurrNeoe = '';
    var strCurrCd = '';
    if (inCurrCd === 'KRW') {
        strCurrNeoe = '000';
    } else if (inCurrCd === 'USD') {
        strCurrNeoe = '001';
        if (parseFloat(argData.VAT_AMT) <= 0) {
            if (argData.PUR_APP === 'O') strCurrCd = '25102';
            else strCurrCd = '25101';
        } else {
            strCurrCd = '25101';
        }
    } else if (inCurrCd === 'JPY') {
        strCurrNeoe = '002';
        strCurrCd = '25101';
    } else if (inCurrCd === 'EUR') {
        strCurrNeoe = '003';
        if (parseFloat(argData.VAT_AMT) <= 0) {
            if (argData.PUR_APP === 'O') strCurrCd = '25102';
            else strCurrCd = '25101';
        } else {
            strCurrCd = '25101';
        }
    } else {
        return `지원하지않는 Curr`;
    }

    /*
    let sql1 = `
        select
            rate_base
        from
            neoe_ma_exchange
        where
            curr_sour = '${strCurrNeoe}'
            and yymmdd = '${tRetDate1}'
    `;
    var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
    var strRateBase = '1';
    if (tRet1.length > 0) strRateBase = tRet1[0].rate_base;
    */

    let sql1 = `
        select
            *
        from
            kcd_currency
        where
            curr_cd = '${argData.CURR_CD}'
            and start_date = '${strDocuDate}'
    `;
    var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
    var strRateBase = '1';
    if (tRet1.length > 0) strRateBase = tRet1[0].WON_AMT2;
    else {
        let sql1 = `
            select
                *
            from
                kcd_currency
            where
                curr_cd = '${argData.CURR_CD}'
                and start_date = (
                    select
                        max(start_date)
                    from
                        kcd_currency
                    where
                        curr_cd = '${argData.CURR_CD}'
                )
        `;
        var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
        if (tRet1.length > 0) strRateBase = tRet1[0].WON_AMT2;
    }

    var strTaxCd = '';
    var strTaxNm = '';
    var strCdAcct = '';
    var strCdAcct2 = '';
    var strLocCd = '';
    var strLocNm = '';
    var strNeoeType = '';
    var strLcflag = '';
    var strRemark = '';
    var strMNGD2 = '';
    var strMNGD7 = '';
    var strCdacct2 = '';
    var taxAdd = true;

    if (objTaxBill.TAX_KIND === '3') {
        strTaxCd = '26';
        strTaxNm = '면세(세금계산서)';
        strCdAcct = '15400';
        strLocCd = '100';
        strLocNm = '국내';
    } else if (objTaxBill.TAX_KIND === '2') {
        strTaxCd = '23';
        strTaxNm = '영세(세금계산서)';
        strCdAcct = '15400';
        strLocCd = '100';
        strLocNm = '국내';
    } else if (objTaxBill.TAX_KIND === '1') {
        strTaxCd = '21';
        strTaxNm = '과세(세금계산서)';
        strCdAcct = '15400';
        strLocCd = '100';
        strLocNm = '국내';
    } else if (objTaxBill.TAX_KIND === '4') {
        strTaxCd = '26';
        strTaxNm = '면세(세금계산서)';
        strCdAcct = '15400';
        strCurrCd = '25102';
        strLocCd = '200';
        strLocNm = '수입';
        taxAdd = false;
    }

    if (inCurrCd === 'KRW') {
        strCdAcct = '15400'; // 원재료
        strCdAcct2 = '25101'; // 원화외상매입금
    } else {
        strCdAcct = '15400'; // 원재료
        strCdAcct2 = '25102'; // 외화외상매입금
    }

    var strMatlType = '';
    var strRemark = '';
    if (taxAdd) {
        if (vendorMatlType === 'M') {
            strMatlType = '100';
            strRemark = '국내자재_원자재';
        } else if (vendorMatlType === 'S') {
            strMatlType = '300';
            strRemark = '국내자재_부자재';
        }

        if (strDocType.substring(0, 2) === 'DM') {
            strRemark = `${strRemark}/즉시결제`;
        }
        if (strDocType.substring(0, 2) === 'ND') {
            strRemark = `${strRemark}/월마감`;
        }
    } else {
        if (vendorMatlType === 'M') {
            strMatlType = '100';
        } else if (vendorMatlType === 'S') {
            strMatlType = '300';
        }
        strRemark = '수입원재료';
    }

    /*
    var  strNeoeType = '원재료';
    if(strNeoeType === '원재료'){
       strCdacct = '15400'; //원재료
       strLcflag = '0';
       strRemark = '수입원재료';
       strMNGD2 = strVendorMatlType;
       strMNGD7 = strReceivecd;
       strCdacct2 = '25102';
    }
    else if(strNeoeType === '외화선급금'){
       strCdacct = '13102'; //원재료
       strLcflag = '3';
       strRemark = '수입원재료';
       strMNGD2 = '';
       strMNGD7 = strVendorMatlType;
       strCdacct2 = '25102';
    }
    else if(strNeoeType === '미착품'){
       strCdacct = '16500'; //미착품
       strLcflag = '1';
       strRemark = strLcReport;
       strMNGD2 = strVendorMatlType;
       strMNGD7 = strReceivecd;
       strCdacct2 = '25102';
    }
    else if(strNeoeType === '상품'){
       strCdacct = '15100'; //상품
       strLcflag = '2';
       strRemark = '상품';
       strMNGD2 =  strVendorMatlType;
       strMNGD7 =  strReceivecd;
       strCdacct2 = '25102';
    }
    */
    var strRemark2 = '';
    if (tDbName === 'shints');
    else strRemark2 = 'Afroba Test(삭제요)';
    strRemark = `${strRemark} ${strRemark2} ${argData.TAXBILL_CD}`;

    //

    var strTotAmt = parseFloat(argData.TOT_AMOUNT); // 부가세 포함금액
    var strVatAmt = parseFloat(argData.TAX);
    var strMinusAmt = parseFloat(argData.MINUS_AMOUNT);

    if (strCurrCd !== 'KRW') {
        strTotAmt = parseFloat(strTotAmt) * parseFloat(strRateBase);
        strTotAmt = parseFloat(strTotAmt).toFixed(0);

        var valTot = parseFloat(strTotAmt);

        strVatAmt = parseFloat(strVatAmt) * parseFloat(strRateBase);
        strVatAmt = parseFloat(strVatAmt).toFixed(0);

        var valVat = parseFloat(strVatAmt);
        var valMinus = valTot - valVat;

        /*
        strMinusAmt = parseFloat(strMinusAmt) * parseFloat(strRateBase);
        strMinusAmt = parseFloat(strMinusAmt).toFixed(0);
        */

        strMinusAmt = parseFloat(valMinus).toFixed(0);
    }

    // TT인경우 : 원재료, L/C인경우 : 미착품
    // 차변/부가세/대변

    var tWObj = {};
    tWObj.DATA1 = {};
    tWObj.DATA2 = {};
    tWObj.DATA3 = {};

    // 차변 - 바이어별(cd_cd에 neoe_buyer_cd) , 부가세- 바이어별, 대변 - 1개(업체별)

    var tRowNo = 1;
    var tRowNo1 = 1;

    // 차변
    var tInObj = {};
    tInObj.row_id = strDocuNo;
    tInObj.row_no = `${tRowNo}`;
    tInObj.no_tax = '*';
    tInObj.cd_pc = '1000';
    tInObj.cd_wdept = strMngPart; // 8400
    tInObj.no_docu = strDocuNo;
    tInObj.no_doline = `${tRowNo}`;
    tInObj.cd_company = '1000';
    tInObj.id_write = strMngId; // 2217
    tInObj.cd_docu = '11';
    tInObj.dt_acct = strDocuDate;
    tInObj.st_docu = '1';
    tInObj.tp_drcr = '1';
    tInObj.cd_acct = strCdAcct; // 원화선급금
    tInObj.amt = strMinusAmt; // 한화금액
    tInObj.cd_partner = strNeoeAgentCd;
    tInObj.dt_start = '';
    tInObj.dt_end = '';
    tInObj.am_taxstd = '0';
    tInObj.am_addtax = '0';
    tInObj.tp_tax = strTaxCd;
    tInObj.no_company = '';
    tInObj.nm_note = strRemark;
    tInObj.cd_bizarea = '1000';
    tInObj.cd_cc = '';
    tInObj.ucd_mng1 = '';
    tInObj.ucd_mng2 = '';
    tInObj.ucd_mng3 = '';
    tInObj.ucd_mng4 = '';
    tInObj.ucd_mng5 = '';
    tInObj.tp_docu = 'N';
    tInObj.no_acct = '0';
    tInObj.cd_exch = strCurrNeoe;
    tInObj.rt_exch = strRateBase;
    if (strCurrNeoe === '000')  tInObj.am_ex = '0'; // 외화금액 - 원화결제인경우 외화금액 안넣음
    else   tInObj.am_ex = argData.TOT_AMOUNT; // 외화금액
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
    tInObj.cd_mngd2 = strMatlType;
    tInObj.nm_mngd2 = '';
    tInObj.cd_mngd3 = strLocCd;
    tInObj.nm_mngd3 = strLocNm;
    tInObj.cd_mngd4 = '';
    tInObj.nm_mngd4 = '';
    tInObj.cd_mngd5 = '';
    tInObj.nm_mngd5 = '';          
    tInObj.cd_mngd6 = '';
    if (strCurrNeoe === '000') tInObj.nm_mngd6 = '0'; // 외화금액
    else tInObj.nm_mngd6 = argData.TOT_AMOUNT; // 
    tInObj.cd_mngd7 = '';
    tInObj.nm_mngd7 = '';
    tInObj.cd_mngd8 = '';
    tInObj.nm_mngd8 = '';
    tInObj.yn_iss = '0';
    tInObj.final_status = '00';
    tInObj.no_bill = '';
    tInObj.nsrTrCd = nsrTrCd;
    tWObj.DATA1 = {
        ...tInObj,
    };

    // 부가세; 13500
    tRowNo += 1;
    tInObj = {};
    tInObj.row_id = strDocuNo;
    tInObj.row_no = `${tRowNo}`;
    tInObj.no_tax = strTaxNo;
    tInObj.cd_pc = '1000';
    tInObj.cd_wdept = strMngPart; // 8400
    tInObj.no_docu = strDocuNo;
    tInObj.no_doline = `${tRowNo}`;
    tInObj.cd_company = '1000';
    tInObj.id_write = strMngId; // 2217
    tInObj.cd_docu = '11';
    tInObj.dt_acct = strDocuDate;
    tInObj.st_docu = '1';
    tInObj.tp_drcr = '1';
    tInObj.cd_acct = '13500'; // 부가세
    tInObj.amt = strVatAmt; // 한화금액
    tInObj.cd_partner = strNeoeAgentCd;
    tInObj.dt_start = strDocuDate;
    tInObj.dt_end = '';
    tInObj.am_taxstd = strMinusAmt;
    tInObj.am_addtax = strVatAmt;
    tInObj.tp_tax = strTaxCd;
    tInObj.no_company = strRegNo;
    tInObj.nm_note = strRemark;
    tInObj.cd_bizarea = '1000';
    tInObj.cd_cc = '';
    tInObj.ucd_mng1 = '';
    tInObj.ucd_mng2 = '';
    tInObj.ucd_mng3 = '';
    tInObj.ucd_mng4 = '';
    tInObj.ucd_mng5 = '';
    tInObj.tp_docu = 'N';
    tInObj.no_acct = '0';
    tInObj.cd_exch = strCurrNeoe;
    tInObj.rt_exch = strRateBase;
    if (strCurrNeoe === '000')  tInObj.am_ex = '0'; // 외화금액 - 원화결제인경우 외화금액 안넣음
    else   tInObj.am_ex = argData.TAX; // 외화금액
    tInObj.no_to = '';
    tInObj.dt_shipping = '';
    tInObj.tp_gubun = '3';
    tInObj.md_tax1 = '';
    tInObj.nm_item1 = '';
    tInObj.nm_size1 = '';
    tInObj.qt_tax1 = '1';
    tInObj.am_prc1 = '0';
    tInObj.am_supply1 = '0';
    tInObj.am_tax1 = '0';
    tInObj.nm_note1 = '';
    tInObj.cd_mngd1 = strNeoeAgentCd;
    tInObj.nm_mngd1 = strNeoeAgentName;
    tInObj.cd_mngd2 = strTaxCd;
    tInObj.nm_mngd2 = strTaxNm;
    tInObj.cd_mngd3 = '';
    tInObj.nm_mngd3 = tRetDate1;
    tInObj.cd_mngd4 = '';
    tInObj.nm_mngd4 = strDocuDate;
    tInObj.cd_mngd5 = '';
    tInObj.nm_mngd5 = '';
    tInObj.cd_mngd6 = '';
    tInObj.nm_mngd6 = ''; // 원화금액
    tInObj.cd_mngd7 = '';
    tInObj.nm_mngd7 = '';
    tInObj.cd_mngd8 = '';
    tInObj.nm_mngd8 = '';
    tInObj.yn_iss = '0';
    tInObj.final_status = '00';
    tInObj.no_bill = '';
    tInObj.sell_dam_nm = strMngName;
    tInObj.sell_dam_email = strMngEmail;
    tInObj.sell_dam_mobil = strMngTel;
    if (taxAdd)
        tWObj.DATA2 = {
            ...tInObj,
        };
    else tWObj.DATA2 = {};

    // 원화미지급금
    tRowNo += 1;
    tInObj = {};
    tInObj.row_id = strDocuNo;
    tInObj.row_no = `${tRowNo}`;
    tInObj.no_tax = '*';
    tInObj.cd_pc = '1000';
    tInObj.cd_wdept = strMngPart; // 8400
    tInObj.no_docu = strDocuNo;
    tInObj.no_doline = `${tRowNo}`;
    tInObj.cd_company = '1000';
    tInObj.id_write = strMngId; // 2217
    tInObj.cd_docu = '11';
    tInObj.dt_acct = strDocuDate;
    tInObj.st_docu = '1';
    tInObj.tp_drcr = '2'; // 차변,대변 구분
    tInObj.cd_acct = strCdAcct2; // 외화,원화 보통예금
    tInObj.amt = strTotAmt; // 한화금액
    tInObj.cd_partner = strNeoeAgentCd;
    tInObj.dt_start = '';
    tInObj.dt_end = strPAY_DATE;
    tInObj.am_taxstd = '0';
    tInObj.am_addtax = '0';
    tInObj.tp_tax = strTaxCd;
    tInObj.no_company = '';
    tInObj.nm_note = strRemark;
    tInObj.cd_bizarea = '1000';
    tInObj.cd_cc = '';
    tInObj.ucd_mng1 = '';
    tInObj.ucd_mng2 = '';
    tInObj.ucd_mng3 = '';
    tInObj.ucd_mng4 = '';
    tInObj.ucd_mng5 = '';
    tInObj.tp_docu = 'N';
    tInObj.no_acct = '0';
    tInObj.cd_exch = strCurrNeoe;
    tInObj.rt_exch = strRateBase;
    if (strCurrNeoe === '000')  tInObj.am_ex = '0'; // 외화금액 - 원화결제인경우 외화금액 안넣음
    else   tInObj.am_ex = argData.TOT_AMOUNT; // 외화금액
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
    tInObj.cd_mngd2 = strMatlType;
    tInObj.nm_mngd2 = '';
    tInObj.cd_mngd3 = strLocCd;
    tInObj.nm_mngd3 = strLocNm;
    tInObj.cd_mngd4 = '';
    tInObj.nm_mngd4 = '';
    tInObj.cd_mngd5 = '';
    if (strCurrNeoe === '000') tInObj.nm_mngd5 = '0'; // 외화금액
    else tInObj.nm_mngd5 = argData.TOT_AMOUNT; // 외화금액  
    tInObj.cd_mngd6 = '';
    tInObj.nm_mngd6 = ''; 
    tInObj.cd_mngd7 = '';
    tInObj.nm_mngd7 = '';
    tInObj.cd_mngd8 = '';
    tInObj.nm_mngd8 = '';
    tInObj.yn_iss = '0';
    tInObj.final_status = '00';
    tInObj.no_bill = '';
    tWObj.DATA3 = {
        ...tInObj,
    };

    requestArray.push(tWObj);

    /*
    try {
       await prisma.$transaction(tSQLArray);
    } catch (e) {
        var tMessage  = 'ERROR:Insert SHIP Record';
        return (tMessage);
    }
    */

    tDbName = 'shints';
    var isProcess = 0;

    console.log(
        'in make_docu_domestic_taxbill------------------tCompanyCode',
        tCompanyCode,
    );

    if (tDbName === 'shints') {
        let neoeOrIcubeApiDirector = 'restapi';
        if (tCompanyCode !== 'shints') neoeOrIcubeApiDirector = 'nsrapi';

        let neoeOrIcubeApiPath = 'insert_docu_domestic_material';
        if (tCompanyCode !== 'shints') neoeOrIcubeApiPath = 'insert_docu';

        try {
            var res_sync = request_sync(
                'POST',
                `https://erp.shints.com:3311/${neoeOrIcubeApiDirector}/${neoeOrIcubeApiPath}/${argData.REG_USER}/TAXBILL`,
                {
                    json: requestArray,
                },
            );
            var tResData = JSON.parse(res_sync.getBody('utf8'));
            console.log(tResData);
        } catch (e) {
            console.log(`request_sync:; noeo : error: ${e.message}`);
            isProcess = 1;
        }

        if (isProcess === 0 && tCompanyCode === 'shints') {
            var tIdx9 = 0;
            tSQLArray = [];
            for (tIdx9 = 0; tIdx9 < tResData.length; tIdx9++) {
                var tOne = {
                    ...tResData[tIdx9],
                };
                var tCols = tOne.INVOICE_NO.split(' ');
                var tInvoiceNo = tCols[1];
                strDocuNo = tOne.DOCU_NO;

                /*
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
                */
            }

            let sql1_2 = `
                select
                    *
                from
                    neoe_fi_adocu
                where
                    row_id = '${strDocuNo}'
            `;
            var tRet1_2 = await prisma.$queryRaw(Prisma.raw(sql1_2));
            if (tRet1_2.length > 0) {
                let sql1_3 = `
                    delete from neoe_fi_adocu
                    where
                        row_id = '${strDocuNo}'
                `;
                var tRet1_3 = await prisma.$queryRaw(Prisma.raw(sql1_3));

                let sql1_4 = `
                    delete from kcd_app_data
                    where
                        neoe_no = '${strDocuNo}'
                `;
                var tRet1_4 = await prisma.$queryRaw(Prisma.raw(sql1_4));
            }

            var tInObj = {
                ...tWObj.DATA1,
            };
            tInObj.row_id = strDocuNo;
            tInObj.no_docu = strDocuNo;
            var tSQL99 = AFLib.createTableSql('neoe_fi_adocu', tInObj);
            var tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            tInObj = {
                ...tWObj.DATA2,
            };
            if (typeof tInObj.row_id !== 'undefined') {
                tInObj.row_id = strDocuNo;
                tInObj.no_docu = strDocuNo;
                tSQL99 = AFLib.createTableSql('neoe_fi_adocu', tInObj);
                tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            }

            tInObj = {
                ...tWObj.DATA3,
            };
            tInObj.row_id = strDocuNo;
            tInObj.no_docu = strDocuNo;
            tSQL99 = AFLib.createTableSql('neoe_fi_adocu', tInObj);
            tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);
        }
    } else {
        if (tCompanyCode === 'shints') {
            let sql1_2 = `
                select
                    *
                from
                    neoe_fi_adocu
                where
                    row_id = '${strDocuNo}'
            `;
            var tRet1_2 = await prisma.$queryRaw(Prisma.raw(sql1_2));
            if (tRet1_2.length > 0) {
                let sql1_3 = `
                    delete from neoe_fi_adocu
                    where
                        row_id = '${strDocuNo}'
                `;
                var tRet1_3 = await prisma.$queryRaw(Prisma.raw(sql1_3));

                let sql1_4 = `
                    delete from kcd_app_data
                    where
                        neoe_no = '${strDocuNo}'
                `;
                var tRet1_4 = await prisma.$queryRaw(Prisma.raw(sql1_4));
            }

            var tInObj = {
                ...tWObj.DATA1,
            };
            tInObj.row_id = strDocuNo;
            tInObj.no_docu = strDocuNo;
            tSQL99 = AFLib.createTableSql('neoe_fi_adocu', tInObj);
            tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            tInObj = {
                ...tWObj.DATA2,
            };
            if (typeof tInObj.row_id !== 'undefined') {
                tInObj.row_id = strDocuNo;
                tInObj.no_docu = strDocuNo;
                tSQL99 = AFLib.createTableSql('neoe_fi_adocu', tInObj);
                tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            }

            tInObj = {
                ...tWObj.DATA3,
            };
            tInObj.row_id = strDocuNo;
            tInObj.no_docu = strDocuNo;
            tSQL99 = AFLib.createTableSql('neoe_fi_adocu', tInObj);
            tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);
        }
    }
    var tReturn = `SUCCEED:Insert Docu:${strDocuNo}`;

    // STSIN, DC_AMOUNT : buy_date Setting

    tInObj = {};
    tInObj.po_cd = '';
    tInObj.pay_date = argData.PAY_DATE;
    tInObj.taxbill_date = argData.TAXBILL_DATE;
    tInObj.buy_date = strDocuDate;
    tInObj.in_date = argData.CLOSING_DATE;
    tInObj.pay_curr_cd = argData.CURR_CD;
    tInObj.vendor_cd = argData.VENDOR_CD;
    tInObj.neoe_no = strDocuNo;
    tInObj.reg_user = argData.REG_USER;
    tInObj.amount = strTotAmt;
    tInObj.neoe_line = tRowNo;
    tInObj.taxbill_cd = argData.TAXBILL_CD;
    tInObj.bill_cd = argData.BILL_CD;
    tInObj.stsout_cd = '';
    tInObj.stsin_cd = '';
    tInObj.cd_acct = strCdAcct;
    tSQL99 = AFLib.createTableSql('kcd_app_data', tInObj);
    tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
    if (isProcess === 0) tSQLArray.push(tSQL99_1);

    try {
        await prisma.$transaction(tSQLArray);
    } catch (e) {
        var tMessage = 'ERROR:Insert SHIP Record';
        return tMessage;
    }

    return tReturn;
};

const make_docu_domestic_deposit = async (argData, argIdx) => {
    var tDateNew = new Date();
    tDateNew.setMonth(tDateNew.getMonth() + 1);
    var tZeroDate = '00';
    var tDateNew_M =
        tZeroDate.substring(0, 2 - String(tDateNew.getMonth() + 1).length) +
        String(tDateNew.getMonth() + 1);
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

    var tYY2 = tRetDate.substring(2, 4);
    var tSEQ = tRetDate.substring(4, 14);

    var tInput = {
        ...argData,
    };
    var tSQLArray = [];
    var strBillDate = argData.TAXBILL_DATE;

    let sql9_1 = `
              select db_name() as db_name
              `;
    var tRet9_1 = await prisma.$queryRaw(Prisma.raw(sql9_1));
    var tDbName = '';
    var tRemark2 = '';
    if (tRet9_1.length > 0) tDbName = tRet9_1[0].db_name;
    console.log(`DataBase Name:${tDbName}`);
    if (tDbName === 'shints');
    else tRemark2 = '(Afroba 테스트.삭제요)';

    var objTaxBill = {
        ...argData,
    };

    var strOutDate = tRetDate1;

    // 접속아이
    var strMngPart = '8400';
    var strMngId = '';
    var strMngName = '';
    var strMngEmail = '';
    var strMngTel = '';
    var strDocuDate = tRetDate1;

    let sql5 = `
        select
            cd_code,
            cd_name
        from
            kcd_code
        where
            cd_group = 'DOCU_MNG1'
    `;
    var tRet5 = await prisma.$queryRaw(Prisma.raw(sql5));
    tRet5.forEach((col, i) => {
        if (col.cd_code === 'PART') strMngPart = col.cd_name;
        if (col.cd_code === 'ID') strMngId = col.cd_name;
        if (col.cd_code === 'NAME') strMngName = col.cd_name;
        if (col.cd_code === 'EMAIL') strMngEmail = col.cd_name;
        if (col.cd_code === 'TEL') strMngTel = col.cd_name;
    });

    // Docu No
    let sql7 = `
        select
            isnull(max(no_docu), '00000') as max_seq
            -- from neoe.neoe.fi_adocu
        from
            neoe_fi_adocu
        where
            no_docu like 'DM${strDocuDate}%'
    `;
    var tRet7 = await prisma.$queryRaw(Prisma.raw(sql7));
    var tMaxDocuNo = 1;
    if (tRet7[0].max_seq === '00000') {
        tMaxDocuNo = parseFloat(tRet7[0].max_seq) + 1;
    } else {
        tMaxDocuNo = parseFloat(tRet7[0].max_seq.substring(10, 15)) + 1;
    }
    var strMaxDocuNo = AFLib.printF(tMaxDocuNo, 5);
    var strDocuNo = `DM${strDocuDate}${strMaxDocuNo}`;
    var strTaxNo = `${strDocuNo}001`;
    var strDocuDate = tRetDate1;

    var sql0_0 = `
        select
            isnull(a.NEOE_NO, '') as NEOE_NO,
            isnull(b.CD_FLAG, '100') as VENDOR_MATL_TYPE_CD,
            isnull(a.REG_NO, '') as REG_NO,
            isnull(a.VENDOR_NAME, '') as VENDOR_NAME,
            isnull(a.VENDOR_MATL_TYPE, '') as VENDOR_MATL_TYPE
        from
            kcd_vendor a
            left join kcd_code b on b.cd_group = 'VENDOR_MATL_TYPE'
            and a.vendor_matl_type = b.cd_code
        where
            vendor_cd = '${argData.VENDOR_CD}'
    `;
    var tRet0_0 = await prisma.$queryRaw(Prisma.raw(sql0_0));
    var tVendorObj = {};
    var strNeoeNo = '';
    var strVendorMatlType = '';
    var strNeoeAgentCd = '';
    var strNeoeAgentName = '';
    var vendorMatlType = '';
    var strRegNo = '';
    if (tRet0_0.length > 0) {
        strNeoeNo = tRet0_0[0].NEOE_NO;
        strVendorMatlType = tRet0_0[0].VENDOR_MATL_TYPE_CD;
        vendorMatlType = tRet0_0[0].VENDOR_MATL_TYPE;
        strNeoeAgentCd = strNeoeNo;
        strNeoeAgentName = tRet0_0[0].VENDOR_NAME;
        strRegNo = tRet0_0[0].REG_NO.replace(/-/gi, '');
    }

    var strAppKey = ''; // DM-,   ND-
    var strMatlType = '';
    var strRemark = '';
    var strDocType = strAppKey;

    var strLcReport = '';
    var strPO = '';
    var strPAY_DATE = '';
    var strReceive = '';
    var strReceiveCd = '';

    sql0_0 = `
        select
            a.pay_report,
            a.po_cd,
            max(a.pay_date) as s_pay_date
        from
            ksv_stock_in a
        where
            a.pay_report = '${argData.DOC_NO}'
        group by
            a.pay_report,
            isnull(a.pay_report, ''),
            a.po_cd
    `;
    tRet0_0 = [];
    tRet0_0 = await prisma.$queryRaw(Prisma.raw(sql0_0));
    var strPayReport = argData.DOC_NO;
    if (tRet0_0.length > 0) {
        strLcReport = '';
        strPO = tRet0_0[0].po_cd;
        strPAY_DATE = tRet0_0[0].s_pay_date;
        if (strPO.substring(0, 1) === 'E') {
            strReceive = '에티오피아';
            strReceiveCd = '200';
        } else {
            strReceive = '베트남';
            strReceiveCd = '100';
        }
    }

    var inCurrCd = argData.CURR_CD;
    var strCurrNeoe = '';
    var strCurrCd = '';
    if (inCurrCd === 'KRW') {
        strCurrNeoe = '000';
    } else if (inCurrCd === 'USD') {
        strCurrNeoe = '001';
        if (parseFloat(argData.VAT_AMT) <= 0) {
            if (argData.PUR_APP === 'O') strCurrCd = '25102';
            else strCurrCd = '25101';
        } else {
            strCurrCd = '25101';
        }
    } else if (inCurrCd === 'JPY') {
        strCurrNeoe = '002';
        strCurrCd = '25101';
    } else if (inCurrCd === 'EUR') {
        strCurrNeoe = '003';
        if (parseFloat(argData.VAT_AMT) <= 0) {
            if (argData.PUR_APP === 'O') strCurrCd = '25102';
            else strCurrCd = '25101';
        } else {
            strCurrCd = '25101';
        }
    } else {
        return `지원하지않는 Curr`;
    }

    /*
    let sql1 = `
        select
            rate_base
        from
            neoe_ma_exchange
        where
            curr_sour = '${strCurrNeoe}'
            and yymmdd = '${tRetDate1}'
    `;
    var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
    var strRateBase = '1';
    if (tRet1.length > 0) strRateBase = tRet1[0].rate_base;
    */

    let sql1 = `
        select
            *
        from
            kcd_currency
        where
            curr_cd = '${argData.CURR_CD}'
            and start_date = '${tRetDate1}'
    `;
    var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
    var strRateBase = '1';
    if (tRet1.length > 0) strRateBase = tRet1[0].WON_AMT2;
    else {
        let sql1 = `
            select
                *
            from
                kcd_currency
            where
                curr_cd = '${argData.CURR_CD}'
                and start_date = (
                    select
                        max(start_date)
                    from
                        kcd_currency
                    where
                        curr_cd = '${argData.CURR_CD}'
                )
        `;
        var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
        if (tRet1.length > 0) strRateBase = tRet1[0].WON_AMT2;
    }

    var strTaxCd = '';
    var strTaxNm = '';
    var strCdAcct = '';
    var strCdAcct2 = '';
    var strLocCd = '';
    var strLocNm = '';
    var strNeoeType = '';
    var strLcflag = '';
    var strRemark = '';
    var strMNGD2 = '';
    var strMNGD7 = '';
    var strCdacct2 = '';
    var taxAdd = true;

    if (objTaxBill.TAX_KIND === '3') {
        strTaxCd = '26';
        strTaxNm = '면세(세금계산서)';
        strCdAcct = '15400';
        strLocCd = '100';
        strLocNm = '국내';
    } else if (objTaxBill.TAX_KIND === '2') {
        strTaxCd = '23';
        strTaxNm = '영세(세금계산서)';
        strCdAcct = '15400';
        strLocCd = '100';
        strLocNm = '국내';
    } else if (objTaxBill.TAX_KIND === '1') {
        strTaxCd = '21';
        strTaxNm = '과세(세금계산서)';
        strCdAcct = '15400';
        strLocCd = '100';
        strLocNm = '국내';
    } else if (objTaxBill.TAX_KIND === '4') {
        strTaxCd = '26';
        strTaxNm = '면세(세금계산서)';
        strCdAcct = '15400';
        strCurrCd = '25102';
        strLocCd = '200';
        strLocNm = '수입';
        taxAdd = false;
    }

    if (inCurrCd === 'KRW') {
        strCdAcct = '13101'; // 원화선급금
        strCdAcct2 = '10301'; // 원화보통예금
    } else {
        strCdAcct = '13102'; // 외화선급금
        strCdAcct2 = '10302'; // 외화보통예금
    }

    var strMatlType = '';
    var strRemark = '';
    if (taxAdd) {
        if (vendorMatlType === 'M') {
            strMatlType = '100';
            strRemark = '국내자재_원자재';
        } else if (vendorMatlType === 'S') {
            strMatlType = '300';
            strRemark = '국내자재_부자재';
        }

        if (strDocType.substring(0, 2) === 'DM') {
            strRemark = `${strRemark}/즉시결제`;
        }
        if (strDocType.substring(0, 2) === 'ND') {
            strRemark = `${strRemark}/월마감`;
        }
    } else {
        if (vendorMatlType === 'M') {
            strMatlType = '100';
        } else if (vendorMatlType === 'S') {
            strMatlType = '300';
        }
        strRemark = '수입원재료';
    }

    /*
    var  strNeoeType = '원재료';
    if(strNeoeType === '원재료'){
       strCdacct = '15400'; //원재료
       strLcflag = '0';
       strRemark = '수입원재료';
       strMNGD2 = strVendorMatlType;
       strMNGD7 = strReceivecd;
       strCdacct2 = '25102';
    }
    else if(strNeoeType === '외화선급금'){
       strCdacct = '13102'; //원재료
       strLcflag = '3';
       strRemark = '수입원재료';
       strMNGD2 = '';
       strMNGD7 = strVendorMatlType;
       strCdacct2 = '25102';
    }
    else if(strNeoeType === '미착품'){
       strCdacct = '16500'; //미착품
       strLcflag = '1';
       strRemark = strLcReport;
       strMNGD2 = strVendorMatlType;
       strMNGD7 = strReceivecd;
       strCdacct2 = '25102';
    }
    else if(strNeoeType === '상품'){
       strCdacct = '15100'; //상품
       strLcflag = '2';
       strRemark = '상품';
       strMNGD2 =  strVendorMatlType;
       strMNGD7 =  strReceivecd;
       strCdacct2 = '25102';
    }
    */
    var strRemark2 = '';
    if (tDbName === 'shints');
    else strRemark2 = 'Afroba Test(삭제요)';
    strRemark = `${strRemark} ${strRemark2} Deposit `;

    //

    var strTotAmt = parseFloat(argData.TOT_AMOUNT); // 부가세 포함금액
    var strVatAmt = parseFloat(argData.TAX);
    var strMinusAmt = parseFloat(argData.MINUS_AMOUNT);

    if (strCurrCd !== 'KRW') {
        strTotAmt = parseFloat(strTotAmt) * parseFloat(strRateBase);
        strTotAmt = parseFloat(strTotAmt).toFixed(0);

        strVatAmt = parseFloat(strVatAmt) * parseFloat(strRateBase);
        strVatAmt = parseFloat(strVatAmt).toFixed(0);

        strMinusAmt = parseFloat(strMinusAmt) * parseFloat(strRateBase);
        strMinusAmt = parseFloat(strMinusAmt).toFixed(0);
    }

    // TT인경우 : 원재료, L/C인경우 : 미착품
    // 차변/부가세/대변
    var requestArray = [];

    var tWObj = {};
    tWObj.DATA1 = {};
    tWObj.DATA2 = {};
    tWObj.DATA3 = {};

    // 차변 - 바이어별(cd_cd에 neoe_buyer_cd) , 부가세- 바이어별, 대변 - 1개(업체별)

    var tRowNo = 1;
    var tRowNo1 = 1;

    // 차변
    var tInObj = {};
    tInObj.row_id = strDocuNo;
    tInObj.row_no = `${tRowNo}`;
    tInObj.no_tax = '*';
    tInObj.cd_pc = '1000';
    tInObj.cd_wdept = strMngPart; // 8400
    tInObj.no_docu = strDocuNo;
    tInObj.no_doline = `${tRowNo}`;
    tInObj.cd_company = '1000';
    tInObj.id_write = strMngId; // 2217
    tInObj.cd_docu = '11';
    tInObj.dt_acct = strDocuDate;
    tInObj.st_docu = '1';
    tInObj.tp_drcr = '1';
    tInObj.cd_acct = strCdAcct; // 원화선급금
    //tInObj.cd_acct = strCdAcct2
    //tInObj.amt = strMinusAmt;   // 한화금액
    tInObj.amt = strTotAmt;
    tInObj.cd_partner = strNeoeAgentCd;
    tInObj.dt_start = '';
    tInObj.dt_end = '';
    tInObj.am_taxstd = '0';
    tInObj.am_addtax = '0';
    tInObj.tp_tax = ''; // 세금구분
    tInObj.no_company = '';
    tInObj.nm_note = strRemark;
    tInObj.cd_bizarea = '1000';
    tInObj.cd_cc = '';
    tInObj.ucd_mng1 = '';
    tInObj.ucd_mng2 = '';
    tInObj.ucd_mng3 = '';
    tInObj.ucd_mng4 = '';
    tInObj.ucd_mng5 = '';
    tInObj.tp_docu = 'N';
    tInObj.no_acct = '0';
    tInObj.cd_exch = strCurrNeoe;
    tInObj.rt_exch = strRateBase;
    tInObj.am_ex = argData.TOT_AMOUNT; // 외화금액
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
    tInObj.cd_mngd2 = strMatlType;
    tInObj.nm_mngd2 = '';
    tInObj.cd_mngd3 = strLocCd;
    tInObj.nm_mngd3 = strLocNm;
    tInObj.cd_mngd4 = '';
    tInObj.nm_mngd4 = '';
    tInObj.cd_mngd5 = '';
    tInObj.nm_mngd5 = '';
    tInObj.cd_mngd6 = '';
    tInObj.nm_mngd6 = ''; // 처리일자
    tInObj.cd_mngd7 = '';
    tInObj.nm_mngd7 = '';
    tInObj.cd_mngd8 = '';
    tInObj.nm_mngd8 = '';
    tInObj.yn_iss = '0';
    tInObj.final_status = '00';
    tInObj.no_bill = '';
    tInObj.nsrTrCd = '';
    tWObj.DATA1 = {
        ...tInObj,
    };
    /*
    var tInObj = {};
    tInObj.row_id = strDocuNo;
    tInObj.row_no = `${tRowNo}`;
    tInObj.no_tax = '*';
    tInObj.cd_pc = '1000';
    tInObj.cd_wdept = strMngPart; // 8400  
    tInObj.no_docu = strDocuNo;
    tInObj.no_doline = `${tRowNo}`;
    tInObj.cd_company = '1000';
    tInObj.id_write = strMngId; // 2217
    tInObj.cd_docu = '11';
    tInObj.dt_acct = strDocuDate;
    tInObj.st_docu = '1';
    tInObj.tp_drcr = '1';
    tInObj.cd_acct = strCdAcct; // 원화선급금 
    tInObj.amt = strMinusAmt; // 한화금액
    tInObj.cd_partner = strNeoeAgentCd;
    tInObj.dt_start = '';
    tInObj.dt_end = '';
    tInObj.am_taxstd = '0';
    tInObj.am_addtax = '0';
    tInObj.tp_tax = strTaxCd;
    tInObj.no_company = '';
    tInObj.nm_note = strRemark;
    tInObj.cd_bizarea = '1000';
    tInObj.cd_cc = '';
    tInObj.ucd_mng1 = '';
    tInObj.ucd_mng2 = '';
    tInObj.ucd_mng3 = '';
    tInObj.ucd_mng4 = '';
    tInObj.ucd_mng5 = '';
    tInObj.tp_docu = 'N';
    tInObj.no_acct = '0';
    tInObj.cd_exch = strCurrNeoe;
    tInObj.rt_exch = strRateBase;
    tInObj.am_ex = argData.TOT_AMOUNT; // 외화금액
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
    tInObj.cd_mngd2 = strMatlType;
    tInObj.nm_mngd2 = '';
    tInObj.cd_mngd3 = strLocCd;
    tInObj.nm_mngd3 = strLocNm;
    tInObj.cd_mngd4 = '';
    tInObj.nm_mngd4 = '';
    tInObj.cd_mngd5 = '';
    tInObj.nm_mngd5 = '';
    tInObj.cd_mngd6 = '';
    tInObj.nm_mngd6 = strTotAmt; // 원화금액
    tInObj.cd_mngd7 = '';
    tInObj.nm_mngd7 = '';
    tInObj.cd_mngd8 = '';
    tInObj.nm_mngd8 = '';
    tInObj.yn_iss = '0';
    tInObj.final_status = '00';
    tInObj.no_bill = ''
    tWObj.DATA1 = {
        ...tInObj
    };
    */

    // 부가세; 13500
    /*
    tRowNo += 1;
    tInObj = {};
    tInObj.row_id = strDocuNo;
    tInObj.row_no = `${tRowNo}`;
    tInObj.no_tax = strTaxNo;
    tInObj.cd_pc = '1000';
    tInObj.cd_wdept = strMngPart; // 8400  
    tInObj.no_docu = strDocuNo;
    tInObj.no_doline = `${tRowNo}`;
    tInObj.cd_company = '1000';
    tInObj.id_write = strMngId; // 2217
    tInObj.cd_docu = '11';
    tInObj.dt_acct = strDocuDate;
    tInObj.st_docu = '1';
    tInObj.tp_drcr = '1';
    tInObj.cd_acct = '13500'; // 부가세 
    tInObj.amt = strVatAmt; // 한화금액
    tInObj.cd_partner = strNeoeAgentCd;
    tInObj.dt_start = strBillDate;
    tInObj.dt_end = '';
    tInObj.am_taxstd = strMinusAmt;
    tInObj.am_addtax = strVatAmt;
    tInObj.tp_tax = strTaxCd;
    tInObj.no_company = strRegNo;
    tInObj.nm_note = strRemark;
    tInObj.cd_bizarea = '1000';
    tInObj.cd_cc = '';
    tInObj.ucd_mng1 = '';
    tInObj.ucd_mng2 = '';
    tInObj.ucd_mng3 = '';
    tInObj.ucd_mng4 = '';
    tInObj.ucd_mng5 = '';
    tInObj.tp_docu = 'N';
    tInObj.no_acct = '0';
    tInObj.cd_exch = strCurrNeoe;
    tInObj.rt_exch = strRateBase;
    tInObj.am_ex = argData.TAX; // 외화금액
    tInObj.no_to = '';
    tInObj.dt_shipping = '';
    tInObj.tp_gubun = '3';
    tInObj.md_tax1 = '';
    tInObj.nm_item1 = '';
    tInObj.nm_size1 = '';
    tInObj.qt_tax1 = '1';
    tInObj.am_prc1 = '0';
    tInObj.am_supply1 = '0';
    tInObj.am_tax1 = '0';
    tInObj.nm_note1 = '';
    tInObj.cd_mngd1 = strNeoeAgentCd;
    tInObj.nm_mngd1 = strNeoeAgentName;
    tInObj.cd_mngd2 = strTaxCd;
    tInObj.nm_mngd2 = strTaxNm;
    tInObj.cd_mngd3 = '';
    tInObj.nm_mngd3 = tRetDate1;
    tInObj.cd_mngd4 = '';
    tInObj.nm_mngd4 = strDocuDate;
    tInObj.cd_mngd5 = '';
    tInObj.nm_mngd5 = '';
    tInObj.cd_mngd6 = '';
    tInObj.nm_mngd6 = ''; // 원화금액
    tInObj.cd_mngd7 = '';
    tInObj.nm_mngd7 = '';
    tInObj.cd_mngd8 = '';
    tInObj.nm_mngd8 = '';
    tInObj.yn_iss = '0';
    tInObj.final_status = '00';
    tInObj.no_bill = ''
    tInObj.sell_dam_nm = strMngName;
    tInObj.sell_dam_email = strMngEmail;
    tInObj.sell_dam_mobil = strMngTel;
    if (taxAdd) tWObj.DATA2 = {
        ...tInObj
    };
    else tWObj.DATA2 = {};
    */
    tWObj.DATA2 = {};

    // 원화미지급금
    tRowNo += 1;
    tInObj = {};
    tInObj.row_id = strDocuNo;
    tInObj.row_no = `${tRowNo}`;
    tInObj.no_tax = '*';
    tInObj.cd_pc = '1000';
    tInObj.cd_wdept = strMngPart; // 8400
    tInObj.no_docu = strDocuNo;
    tInObj.no_doline = `${tRowNo}`;
    tInObj.cd_company = '1000';
    tInObj.id_write = strMngId; // 2217
    tInObj.cd_docu = '11';
    tInObj.dt_acct = strDocuDate;
    tInObj.st_docu = '1';
    tInObj.tp_drcr = '2'; // 차변,대변 구분
    tInObj.cd_acct = strCdAcct2; // 외화,원화 보통예금
    tInObj.amt = strTotAmt; // 한화금액
    tInObj.cd_partner = strNeoeAgentCd;
    tInObj.dt_start = '';
    tInObj.dt_end = strPAY_DATE;
    tInObj.am_taxstd = '0';
    tInObj.am_addtax = '0';
    tInObj.tp_tax = '';
    tInObj.no_company = '';
    tInObj.nm_note = strRemark;
    tInObj.cd_bizarea = '1000';
    tInObj.cd_cc = '';
    tInObj.ucd_mng1 = '';
    tInObj.ucd_mng2 = '';
    tInObj.ucd_mng3 = '';
    tInObj.ucd_mng4 = '';
    tInObj.ucd_mng5 = '';
    tInObj.tp_docu = 'N';
    tInObj.no_acct = '0';
    tInObj.cd_exch = strCurrNeoe;
    tInObj.rt_exch = strRateBase;
    tInObj.am_ex = argData.TOT_AMOUNT; // 외화금액
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
    //tInObj.cd_mngd1 = strNeoeAgentCd;
    //tInObj.nm_mngd1 = strNeoeAgentName;
    tInObj.cd_mngd1 = '';
    tInObj.nm_mngd1 = '';
    //tInObj.cd_mngd2 = strMatlType;
    tInObj.cd_mngd2 = '';
    tInObj.nm_mngd2 = '';
    tInObj.cd_mngd3 = strLocCd;
    tInObj.nm_mngd3 = strLocNm;
    tInObj.cd_mngd4 = '';
    tInObj.nm_mngd4 = '';
    tInObj.cd_mngd5 = '';
    tInObj.nm_mngd5 = '';
    tInObj.cd_mngd6 = '';
    tInObj.nm_mngd6 = ''; // 원화금액
    tInObj.cd_mngd7 = '';
    tInObj.nm_mngd7 = '';
    tInObj.cd_mngd8 = '';
    tInObj.nm_mngd8 = '';
    tInObj.yn_iss = '0';
    tInObj.final_status = '00';
    tInObj.no_bill = '';
    //tWObj.DATA3 = { ...tInObj };
    tWObj.DATA3 = {
        ...tInObj,
    };
    /*
    tRowNo += 1;
    tInObj = {};
    tInObj.row_id = strDocuNo;
    tInObj.row_no = `${tRowNo}`;
    tInObj.no_tax = '*';
    tInObj.cd_pc = '1000';
    tInObj.cd_wdept = strMngPart; // 8400  
    tInObj.no_docu = strDocuNo;
    tInObj.no_doline = `${tRowNo}`;
    tInObj.cd_company = '1000';
    tInObj.id_write = strMngId; // 2217
    tInObj.cd_docu = '11';
    tInObj.dt_acct = strDocuDate;
    tInObj.st_docu = '1';
    tInObj.tp_drcr = '2'; // 차변,대변 구분 
    tInObj.cd_acct = strCdAcct2; // 외화,원화 보통예금 
    tInObj.amt = strTotAmt; // 한화금액
    tInObj.cd_partner = strNeoeAgentCd;
    tInObj.dt_start = '';
    tInObj.dt_end = strPAY_DATE;
    tInObj.am_taxstd = '0';
    tInObj.am_addtax = '0';
    tInObj.tp_tax = strTaxCd;
    tInObj.no_company = '';
    tInObj.nm_note = strRemark;
    tInObj.cd_bizarea = '1000';
    tInObj.cd_cc = '';
    tInObj.ucd_mng1 = '';
    tInObj.ucd_mng2 = '';
    tInObj.ucd_mng3 = '';
    tInObj.ucd_mng4 = '';
    tInObj.ucd_mng5 = '';
    tInObj.tp_docu = 'N';
    tInObj.no_acct = '0';
    tInObj.cd_exch = strCurrNeoe;
    tInObj.rt_exch = strRateBase;
    tInObj.am_ex = argData.TOT_AMOUNT; // 외화금액
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
    tInObj.cd_mngd2 = strMatlType;
    tInObj.nm_mngd2 = '';
    tInObj.cd_mngd3 = strLocCd;
    tInObj.nm_mngd3 = strLocNm;
    tInObj.cd_mngd4 = '';
    tInObj.nm_mngd4 = '';
    tInObj.cd_mngd5 = '';
    tInObj.nm_mngd5 = '';
    tInObj.cd_mngd6 = '';
    tInObj.nm_mngd6 = ''; // 원화금액
    tInObj.cd_mngd7 = '';
    tInObj.nm_mngd7 = '';
    tInObj.cd_mngd8 = '';
    tInObj.nm_mngd8 = '';
    tInObj.yn_iss = '0';
    tInObj.final_status = '00';
    tInObj.no_bill = ''
    tWObj.DATA3 = {
        ...tInObj
    };
    */

    requestArray.push(tWObj);

    /*
    try {
       await prisma.$transaction(tSQLArray);
    } catch (e) {
        var tMessage  = 'ERROR:Insert SHIP Record';
        return (tMessage);
    }
    */

    tDbName = 'shints';
    var isProcess = 0;
    if (tDbName === 'shints') {
        try {
            var res_sync = request_sync(
                'POST',
                `https://erp.shints.com:3311/restapi/insert_docu_domestic_material/${argData.REG_USER}/Deposit`,
                {
                    json: requestArray,
                },
            );
            var tResData = JSON.parse(res_sync.getBody('utf8'));
            console.log(tResData);
        } catch (e) {
            console.log(`request_sync:; noeo : error: ${e.message}`);
            isProcess = 1;
        }

        if (isProcess === 0) {
            var tIdx9 = 0;
            tSQLArray = [];
            for (tIdx9 = 0; tIdx9 < tResData.length; tIdx9++) {
                var tOne = {
                    ...tResData[tIdx9],
                };
                var tCols = tOne.INVOICE_NO.split(' ');
                var tInvoiceNo = tCols[1];
                strDocuNo = tOne.DOCU_NO;

                /*
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
                */
            }

            let sql1_2 = `
                select
                    *
                from
                    neoe_fi_adocu
                where
                    row_id = '${strDocuNo}'
            `;
            var tRet1_2 = await prisma.$queryRaw(Prisma.raw(sql1_2));
            if (tRet1_2.length > 0) {
                let sql1_3 = `
                    delete from neoe_fi_adocu
                    where
                        row_id = '${strDocuNo}'
                `;
                var tRet1_3 = await prisma.$queryRaw(Prisma.raw(sql1_3));

                let sql1_4 = `
                    delete from kcd_app_data
                    where
                        neoe_no = '${strDocuNo}'
                `;
                var tRet1_4 = await prisma.$queryRaw(Prisma.raw(sql1_4));
            }

            var tInObj = {
                ...tWObj.DATA1,
            };
            tInObj.row_id = strDocuNo;
            tInObj.no_docu = strDocuNo;
            var tSQL99 = AFLib.createTableSql('neoe_fi_adocu', tInObj);
            var tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            tInObj = {
                ...tWObj.DATA2,
            };
            if (typeof tInObj.row_id !== 'undefined') {
                tInObj.row_id = strDocuNo;
                tInObj.no_docu = strDocuNo;
                tSQL99 = AFLib.createTableSql('neoe_fi_adocu', tInObj);
                tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
                tSQLArray.push(tSQL99_1);
            }

            tInObj = {
                ...tWObj.DATA3,
            };
            tInObj.row_id = strDocuNo;
            tInObj.no_docu = strDocuNo;
            tSQL99 = AFLib.createTableSql('neoe_fi_adocu', tInObj);
            tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);
        }
    } else {
        let sql1_2 = `
            select
                *
            from
                neoe_fi_adocu
            where
                row_id = '${strDocuNo}'
        `;
        var tRet1_2 = await prisma.$queryRaw(Prisma.raw(sql1_2));
        if (tRet1_2.length > 0) {
            let sql1_3 = `
                delete from neoe_fi_adocu
                where
                    row_id = '${strDocuNo}'
            `;
            var tRet1_3 = await prisma.$queryRaw(Prisma.raw(sql1_3));

            let sql1_4 = `
                delete from kcd_app_data
                where
                    neoe_no = '${strDocuNo}'
            `;
            var tRet1_4 = await prisma.$queryRaw(Prisma.raw(sql1_4));
        }

        var tInObj = {
            ...tWObj.DATA1,
        };
        tInObj.row_id = strDocuNo;
        tInObj.no_docu = strDocuNo;
        tSQL99 = AFLib.createTableSql('neoe_fi_adocu', tInObj);
        tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
        tSQLArray.push(tSQL99_1);

        tInObj = {
            ...tWObj.DATA2,
        };
        if (typeof tInObj.row_id !== 'undefined') {
            tInObj.row_id = strDocuNo;
            tInObj.no_docu = strDocuNo;
            tSQL99 = AFLib.createTableSql('neoe_fi_adocu', tInObj);
            tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);
        }

        tInObj = {
            ...tWObj.DATA3,
        };
        tInObj.row_id = strDocuNo;
        tInObj.no_docu = strDocuNo;
        tSQL99 = AFLib.createTableSql('neoe_fi_adocu', tInObj);
        tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
        tSQLArray.push(tSQL99_1);
    }
    var tReturn = `SUCCEED:Insert Docu:${strDocuNo}`;

    // STSIN, DC_AMOUNT : buy_date Setting
    tInObj = {};
    tInObj.pay_report = argData.DOC_NO;
    tInObj.lc_report = '';
    tInObj.seq = strMaxDocuNo;
    tInObj.curr_cd = argData.CURR_CD;
    tInObj.amt = strTotAmt;
    tInObj.pay_date = argData.PAY_DATE;
    tInObj.vendor_cd = argData.VENDOR_CD;
    tInObj.neoe_no = strDocuNo;
    tInObj.neoe_cd = strNeoeAgentCd;
    tInObj.lc_flag = '';
    tInObj.sinyong = '';
    tInObj.neoe_line = tRowNo1;
    tInObj.reg_user = argData.REG_USER;
    tInObj.cd_acct = strCdAcct;
    let tSQL99 = AFLib.createTableSql('kcd_app_import', tInObj);
    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
    if (isProcess === 0) tSQLArray.push(tSQL99_1);

    try {
        await prisma.$transaction(tSQLArray);
    } catch (e) {
        var tMessage = 'ERROR:Insert SHIP Record';
        return tMessage;
    }

    return tReturn;
};

const make_docu_import = async (argData, argIdx, tCompanyCode) => {
    var tDateNew = new Date();
    tDateNew.setMonth(tDateNew.getMonth() + 1);
    var tZeroDate = '00';
    var tDateNew_M =
        tZeroDate.substring(0, 2 - String(tDateNew.getMonth() + 1).length) +
        String(tDateNew.getMonth() + 1);
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

    var tYY2 = tRetDate.substring(2, 4);
    var tSEQ = tRetDate.substring(4, 14);

    var tInput = {
        ...argData,
    };
    var tSQLArray = [];

    let sql9_1 = `
              select db_name() as db_name
              `;
    var tRet9_1 = await prisma.$queryRaw(Prisma.raw(sql9_1));
    var tDbName = '';
    var tOrgDbName = '';
    var strRemark2 = '';
    if (tRet9_1.length > 0) {
        tDbName = tRet9_1[0].db_name;
        tOrgDbName = tRet9_1[0].db_name;
    }
    console.log(`DataBase Name:${tDbName}`);
    if (tDbName === 'shints');
    else strRemark2 = '(Afroba 테스트.삭제요)';

    let sql = `
        select
            *
        from
            kcd_gw_taxbill_kr
        where
            taxbill_cd = '${tInput.TAXBILL_CD}'
    `;
    var nRet = await prisma.$queryRaw(Prisma.raw(sql));

    var requestArray = [];
    var strDocuNo = '';
    var objTaxBill = {
        ...nRet[0],
    };

    var strOutDate = tRetDate1;

    // 접속아이
    var strMngPart = '8400';
    var strMngId = '';
    var strMngName = '';
    var strMngEmail = '';
    var strMngTel = '';

    let sql5 = `
        select
            cd_code,
            cd_name
        from
            kcd_code
        where
            cd_group = 'DOCU_MNG1'
    `;
    var tRet5 = await prisma.$queryRaw(Prisma.raw(sql5));
    tRet5.forEach((col, i) => {
        if (col.cd_code === 'PART') strMngPart = col.cd_name;
        if (col.cd_code === 'ID') strMngId = col.cd_name;
        if (col.cd_code === 'NAME') strMngName = col.cd_name;
        if (col.cd_code === 'EMAIL') strMngEmail = col.cd_name;
        if (col.cd_code === 'TEL') strMngTel = col.cd_name;
    });

    var strDocuDate = tRetDate1;
    // Docu No
    let sql7 = `
        select
            isnull(max(no_docu), '00000') as max_seq
            -- from neoe.neoe.fi_adocu
        from
            neoe_fi_adocu
        where
            no_docu like 'IM${strDocuDate}%'
    `;
    var tRet7 = await prisma.$queryRaw(Prisma.raw(sql7));
    var tMaxDocuNo = 1;
    if (tRet7[0].max_seq === '00000') {
        tMaxDocuNo = parseFloat(tRet7[0].max_seq) + 1;
    } else {
        tMaxDocuNo = parseFloat(tRet7[0].max_seq.substring(10, 15)) + 1;
    }
    var strMaxDocuNo = AFLib.printF(tMaxDocuNo, 5);
    var strDocuNo = `IM${strDocuDate}${strMaxDocuNo}`;
    var strTaxNo = `${strDocuNo}001`;
    var strDocuDate = tRetDate1;

    let sql0_0 = `
        select
            isnull(a.NEOE_NO, '') as NEOE_NO,
            isnull(b.CD_FLAG, '100') as VENDOR_MATL_TYPE,
            isnull(a.NSR_TR_CD, '') as NSR_TR_CD
        from
            kcd_vendor a
            left join kcd_code b on b.cd_group = 'VENDOR_MATL_TYPE'
            and a.vendor_matl_type = b.cd_code
        where
            vendor_cd = '${argData.VENDOR_CD}'
    `;
    var tRet0_0 = await prisma.$queryRaw(Prisma.raw(sql0_0));
    var tVendorObj = {};
    var strNeoeNo = '';
    var strVendorMatlType = '';
    var strNeoeAgentCd = '';
    var nsrTrCd = '';
    if (tRet0_0.length > 0) {
        strNeoeNo = tRet0_0[0].NEOE_NO;
        strVendorMatlType = tRet0_0[0].VENDOR_MATL_TYPE;
        strNeoeAgentCd = strNeoeNo;
        nsrTrCd = tRet0_0[0].NSR_TR_CD;
    }

    var strLcReport = '';
    var strPO = '';
    var strPAY_DATE = '';
    var strReceive = '';
    var strReceiveCd = '';
    sql0_0 = `
        select
            a.pay_report,
            isnull(c.pay_report, '') as lc_pay_report,
            a.po_cd,
            max(a.pay_date) as s_pay_date
        from
            ksv_stock_in a
            left join ksv_stock_in c on a.pu_cd = c.pu_cd
            and a.order_cd = c.order_CD
            and a.po_cd = c.PO_CD
            and a.po_seq = c.po_seq
            and a.matl_cd = c.matl_cd
            and a.lc_bill_no = c.pay_report
            and c.lc_qty > 0
            and c.in_qty <= 0
        where
            a.pay_report = '${argData.PAY_REPORT}'
        group by
            a.pay_report,
            isnull(c.pay_report, ''),
            a.po_cd
    `;
    tRet0_0 = await prisma.$queryRaw(Prisma.raw(sql0_0));
    if (tRet0_0.length > 0) {
        strLcReport = tRet0_0[0].lc_pay_report;
        strPO = tRet0_0[0].po_cd;
        strPAY_DATE = tRet0_0[0].pay_date;
        if (strPO.substring(0, 1) === 'E') {
            strReceive = '에티오피아';
            strReceiveCd = '200';
        } else {
            strReceive = '베트남';
            strReceiveCd = '100';
        }
    }

    var strCurrCd = argData.CURR_CD;
    var strCurrNeoe = '';
    if (strCurrCd === 'KRW') {
        strCurrNeoe = '000';
    } else if (strCurrCd === 'USD') {
        strCurrNeoe = '001';
    } else if (strCurrCd === 'JPY') {
        strCurrNeoe = '002';
    } else if (strCurrCd === 'EUR') {
        strCurrNeoe = '003';
    } else if (strCurrCd === 'CNY') {
        strCurrNeoe = '004';
    } else if (strCurrCd === 'CHF') {
        strCurrNeoe = 'CHF';
    } else if (strCurrCd === 'GBP') {
        strCurrNeoe = 'GBP';
    }

    /*
    let sql1 = `
        select
            rate_base
        from
            neoe_ma_exchange
        where
            curr_sour = '${strCurrNeoe}'
            and yymmdd = '${tRetDate1}'
    `;
    var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
    var strRateBase = '1';
    if (tRet1.length > 0) strRateBase = tRet1[0].rate_base;
    */

    let sql1 = `
        select
            *
        from
            kcd_currency
        where
            curr_cd = '${argData.CURR_CD}'
            and start_date = '${tRetDate1}'
    `;
    var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
    var strRateBase = '1';
    if (tRet1.length > 0) strRateBase = tRet1[0].WON_AMT2;
    else {
        let sql1 = `
            select
                *
            from
                kcd_currency
            where
                curr_cd = '${argData.CURR_CD}'
                and start_date = (
                    select
                        max(start_date)
                    from
                        kcd_currency
                    where
                        curr_cd = '${argData.CURR_CD}'
                )
        `;
        var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
        if (tRet1.length > 0) strRateBase = tRet1[0].WON_AMT2;
    }

    var strNeoeType = '';
    var strCdacct = '';
    var strLcflag = '';
    var strRemark = '';
    var strMNGD2 = '';
    var strMNGD7 = '';
    var strCdacct2 = '';

    var strNeoeType = '외화선급금';

    if (strNeoeType === '원재료') {
        strCdacct = '15400'; //원재료
        strLcflag = '0';
        strRemark = '수입원재료';
        strMNGD2 = strVendorMatlType;
        strMNGD7 = strReceiveCd;
        strCdacct2 = '25102'; // 외화외상매입금
    } else if (strNeoeType === '외화선급금') {
        strCdacct = '13102'; // 외화선급금
        strLcflag = '3';
        strRemark = '수입원재료';
        strMNGD2 = '';
        strMNGD7 = strVendorMatlType;
        strCdacct2 = '10302'; //   외화보통예금
    } else if (strNeoeType === '미착품') {
        strCdacct = '16500'; //미착품
        strLcflag = '1';
        strRemark = strLcReport;
        strMNGD2 = strVendorMatlType;
        strMNGD7 = strReceiveCd;
        strCdacct2 = '25102';
    } else if (strNeoeType === '상품') {
        strCdacct = '15100'; //상품
        strLcflag = '2';
        strRemark = '상품';
        strMNGD2 = strVendorMatlType;
        strMNGD7 = strReceiveCd;
        strCdacct2 = '25102';
    }

    strRemark = `${strRemark} ${strRemark2} ${tInput.TAXBILL_CD}`;

    //
    var strTotAmt = parseFloat(argData.TOT_AMOUNT) * parseFloat(strRateBase);
    strTotAmt = parseFloat(strTotAmt).toFixed(0);

    // TT인경우 : 원재료, L/C인경우 : 미착품

    var tWObj = {};
    tWObj.DATA1 = {};
    tWObj.DATA2 = {};
    tWObj.DATA3 = {};

    // 차변 - 바이어별(cd_cd에 neoe_buyer_cd) , 부가세- 바이어별, 대변 - 1개(업체별)

    var tRowNo = 1;
    var tRowNo1 = 1;

    // 차변
    var tInObj = {};
    tInObj.row_id = strDocuNo;
    tInObj.row_no = '1';
    tInObj.no_tax = '*';
    tInObj.cd_pc = '1000';
    tInObj.cd_wdept = strMngPart; // 8400
    tInObj.no_docu = strDocuNo;
    tInObj.no_doline = '1';
    tInObj.cd_company = '1000';
    tInObj.id_write = strMngId; // 2217
    tInObj.cd_docu = '11';
    tInObj.dt_acct = strDocuDate;
    tInObj.st_docu = '1';
    tInObj.tp_drcr = '1';
    tInObj.cd_acct = strCdacct; // 원재료
    tInObj.amt = strTotAmt; // 한화금액
    tInObj.cd_partner = strNeoeAgentCd;
    tInObj.dt_start = '';
    tInObj.dt_end = '';
    tInObj.am_taxstd = '0';
    tInObj.am_addtax = '0';
    tInObj.tp_tax = '';
    tInObj.no_company = '';
    tInObj.nm_note = strRemark;
    tInObj.cd_bizarea = '1000';
    tInObj.cd_cc = '';
    tInObj.ucd_mng1 = '';
    tInObj.ucd_mng2 = '';
    tInObj.ucd_mng3 = '';
    tInObj.ucd_mng4 = '';
    tInObj.ucd_mng5 = '';
    tInObj.tp_docu = 'N';
    tInObj.no_acct = '0';
    tInObj.cd_exch = strCurrNeoe;
    tInObj.rt_exch = strRateBase;
    tInObj.am_ex = argData.TOT_AMOUNT; // 외화금액
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
    tInObj.nm_mngd1 = '';
    tInObj.cd_mngd2 = strMNGD2;
    tInObj.nm_mngd2 = '';
    tInObj.cd_mngd3 = '200';
    tInObj.nm_mngd3 = '수입';
    tInObj.cd_mngd4 = strCurrNeoe;
    tInObj.nm_mngd4 = strCurrCd;
    tInObj.cd_mngd5 = '';
    tInObj.nm_mngd5 = '';
    tInObj.cd_mngd6 = '';
    tInObj.nm_mngd6 = ''; // 원화금액
    tInObj.cd_mngd7 = strMNGD7;
    tInObj.nm_mngd7 = strReceive;
    tInObj.cd_mngd8 = '';
    tInObj.nm_mngd8 = '';
    tInObj.yn_iss = '0';
    tInObj.final_status = '00';
    tInObj.no_bill = '';
    tInObj.nsrTrCd = nsrTrCd;
    tWObj.DATA1 = {
        ...tInObj,
    };

    tWObj.DATA2 = {};

    /*
    // 외화외상매입금 전표 계정코드 = 25102  
    // 외화과수금 전표 = 25702 
    */
    // 외화보통예금  = 10302
    tRowNo += 1;
    tInObj = {};
    tInObj.row_id = strDocuNo;
    tInObj.row_no = `${tRowNo}`;
    tInObj.no_tax = '*';
    tInObj.cd_pc = '1000';
    tInObj.cd_wdept = strMngPart; // 8400
    tInObj.no_docu = strDocuNo;
    tInObj.no_doline = `${tRowNo}`;
    tInObj.cd_company = '1000';
    tInObj.id_write = strMngId; // 2217
    tInObj.cd_docu = '11';
    tInObj.dt_acct = strDocuDate;
    tInObj.st_docu = '1';
    tInObj.tp_drcr = '2'; // 차변,대변 구분
    tInObj.cd_acct = strCdacct2; // 원재료
    tInObj.amt = strTotAmt; // 한화금액
    tInObj.cd_partner = strNeoeAgentCd;
    tInObj.dt_start = '';
    tInObj.dt_end = '';
    tInObj.am_taxstd = '0';
    tInObj.am_addtax = '0';
    tInObj.tp_tax = '';
    tInObj.no_company = '';
    tInObj.nm_note = strRemark;
    tInObj.cd_bizarea = '1000';
    tInObj.cd_cc = '';
    tInObj.ucd_mng1 = '';
    tInObj.ucd_mng2 = '';
    tInObj.ucd_mng3 = '';
    tInObj.ucd_mng4 = '';
    tInObj.ucd_mng5 = '';
    tInObj.tp_docu = 'N';
    tInObj.no_acct = '0';
    tInObj.cd_exch = strCurrNeoe;
    tInObj.rt_exch = strRateBase;
    tInObj.am_ex = argData.TOT_AMOUNT; // 외화금액
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
    tInObj.cd_mngd1 = '';
    tInObj.nm_mngd1 = '';
    tInObj.cd_mngd2 = '';
    tInObj.nm_mngd2 = '';
    tInObj.cd_mngd3 = '';
    tInObj.nm_mngd3 = '';
    tInObj.cd_mngd4 = '';
    tInObj.nm_mngd4 = '';
    tInObj.cd_mngd5 = '';
    tInObj.nm_mngd5 = '';
    tInObj.cd_mngd6 = '';
    tInObj.nm_mngd6 = ''; // 원화금액
    tInObj.cd_mngd7 = '';
    tInObj.nm_mngd7 = '';
    tInObj.cd_mngd8 = '';
    tInObj.nm_mngd8 = '';
    tInObj.yn_iss = '0';
    tInObj.final_status = '00';
    tInObj.no_bill = '';
    tWObj.DATA3 = {
        ...tInObj,
    };

    requestArray.push(tWObj);

    /*
    try {
       await prisma.$transaction(tSQLArray);
    } catch (e) {
        var tMessage  = 'ERROR:Insert SHIP Record';
        return (tMessage);
    }
    */

    tDbName = 'shints';
    var isProcess = 0;
    if (tDbName === 'shints') {
        let neoeOrIcubeApiDirector = 'restapi';
        if (tCompanyCode !== 'shints') neoeOrIcubeApiDirector = 'nsrapi';

        let neoeOrIcubeApiPath = 'insert_docu_import_material';
        if (tCompanyCode !== 'shints') neoeOrIcubeApiPath = 'insert_docu';

        try {
            var res_sync = request_sync(
                'POST',
                `https://erp.shints.com:3311/${neoeOrIcubeApiDirector}/${neoeOrIcubeApiPath}/${argData.REG_USER}/MATERIAL`,
                {
                    json: requestArray,
                },
            );
            var tResData = JSON.parse(res_sync.getBody('utf8'));
            console.log(tResData);
        } catch (e) {
            console.log(`request_sync:; noeo : error: ${e.message}`);
            isProcess = 1;
        }

        if (isProcess === 0 && tCompanyCode === 'shints') {
            var tIdx9 = 0;
            tSQLArray = [];
            for (tIdx9 = 0; tIdx9 < tResData.length; tIdx9++) {
                var tOne = {
                    ...tResData[tIdx9],
                };
                var tCols = tOne.INVOICE_NO.split(' ');
                var tInvoiceNo = tCols[1];
                strDocuNo = tOne.DOCU_NO;

                /*
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
                */
            }

            let sql1_2 = `
                select
                    *
                from
                    neoe_fi_adocu
                where
                    row_id = '${strDocuNo}'
            `;
            var tRet1_2 = await prisma.$queryRaw(Prisma.raw(sql1_2));
            if (tRet1_2.length > 0) {
                let sql1_3 = `
                    delete from neoe_fi_adocu
                    where
                        row_id = '${strDocuNo}'
                `;
                var tRet1_3 = await prisma.$queryRaw(Prisma.raw(sql1_3));

                let sql1_4 = `
                    delete from kcd_app_data
                    where
                        neoe_no = '${strDocuNo}'
                `;
                var tRet1_4 = await prisma.$queryRaw(Prisma.raw(sql1_4));
            }

            var tInObj = {
                ...tWObj.DATA1,
            };
            tInObj.row_id = strDocuNo;
            tInObj.no_docu = strDocuNo;
            let tSQL99 = AFLib.createTableSql('neoe_fi_adocu', tInObj);
            let tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            tInObj = {
                ...tWObj.DATA3,
            };
            tInObj.row_id = strDocuNo;
            tInObj.no_docu = strDocuNo;
            tSQL99 = AFLib.createTableSql('neoe_fi_adocu', tInObj);
            tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);
        }
    } else {
        if (tCompanyCode === 'shints') {
            let sql1_2 = `
                select
                    *
                from
                    neoe_fi_adocu
                where
                    row_id = '${strDocuNo}'
            `;
            var tRet1_2 = await prisma.$queryRaw(Prisma.raw(sql1_2));
            if (tRet1_2.length > 0) {
                let sql1_3 = `
                    delete from neoe_fi_adocu
                    where
                        row_id = '${strDocuNo}'
                `;
                var tRet1_3 = await prisma.$queryRaw(Prisma.raw(sql1_3));

                let sql1_4 = `
                    delete from kcd_app_data
                    where
                        neoe_no = '${strDocuNo}'
                `;
                var tRet1_4 = await prisma.$queryRaw(Prisma.raw(sql1_4));
            }

            var tInObj = {
                ...tWObj.DATA1,
            };
            tInObj.row_id = strDocuNo;
            tInObj.no_docu = strDocuNo;
            let tSQL99 = AFLib.createTableSql('neoe_fi_adocu', tInObj);
            let tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            tInObj = {
                ...tWObj.DATA3,
            };
            tInObj.row_id = strDocuNo;
            tInObj.no_docu = strDocuNo;
            tSQL99 = AFLib.createTableSql('neoe_fi_adocu', tInObj);
            tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);
        }
    }

    var tReturn = `SUCCEED:Insert Docu:${strDocuNo}`;

    tInObj = {};
    tInObj.pay_report = argData.DOC_NO;
    tInObj.lc_report = strLcReport;
    tInObj.seq = strMaxDocuNo;
    tInObj.curr_cd = strCurrCd;
    tInObj.amt = argData.TOT_AMOUNT;
    tInObj.pay_date = strOutDate;
    tInObj.vendor_cd = tInput.VENDOR_CD;
    tInObj.neoe_no = strDocuNo;
    tInObj.neoe_cd = strNeoeAgentCd;
    tInObj.lc_flag = strLcflag;
    tInObj.sinyong = '';
    tInObj.neoe_line = tRowNo1;
    tInObj.reg_user = argData.REG_USER;
    tInObj.cd_acct = strCdacct;
    let tSQL99 = AFLib.createTableSql('kcd_app_import', tInObj);
    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
    if (isProcess === 0) tSQLArray.push(tSQL99_1);

    try {
        await prisma.$transaction(tSQLArray);
    } catch (e) {
        var tMessage = 'ERROR:Insert SHIP Record';
        return tMessage;
    }

    return tReturn;
};

const make_docu_import_deposit = async (argData, argIdx) => {
    var tDateNew = new Date();
    tDateNew.setMonth(tDateNew.getMonth() + 1);
    var tZeroDate = '00';
    var tDateNew_M =
        tZeroDate.substring(0, 2 - String(tDateNew.getMonth() + 1).length) +
        String(tDateNew.getMonth() + 1);
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

    var tYY2 = tRetDate.substring(2, 4);
    var tSEQ = tRetDate.substring(4, 14);

    var tInput = {
        ...argData,
    };
    var tSQLArray = [];

    let sql9_1 = `
              select db_name() as db_name
              `;
    var tRet9_1 = await prisma.$queryRaw(Prisma.raw(sql9_1));
    var tDbName = '';
    var tOrgDbName = '';
    var strRemark2 = '';
    if (tRet9_1.length > 0) {
        tDbName = tRet9_1[0].db_name;
        tOrgDbName = tRet9_1[0].db_name;
    }
    console.log(`DataBase Name:${tDbName}`);
    if (tDbName === 'shints');
    else strRemark2 = '(Afroba 테스트.삭제요)';

    /*
    let sql = `
        select
            *
        from
            kcd_gw_taxbill_kr
        where
            taxbill_cd = '${tInput.TAXBILL_CD}'
    `;
    var nRet = await prisma.$queryRaw(Prisma.raw(sql));
    var objTaxBill = { ...nRet[0] };
    */

    var requestArray = [];
    var strDocuNo = '';
    var objTaxBill = {
        ...argData,
    };

    var strOutDate = tRetDate1;

    // 접속아이
    var strMngPart = '8400';
    var strMngId = '';
    var strMngName = '';
    var strMngEmail = '';
    var strMngTel = '';

    let sql5 = `
        select
            cd_code,
            cd_name
        from
            kcd_code
        where
            cd_group = 'DOCU_MNG1'
    `;
    var tRet5 = await prisma.$queryRaw(Prisma.raw(sql5));
    tRet5.forEach((col, i) => {
        if (col.cd_code === 'PART') strMngPart = col.cd_name;
        if (col.cd_code === 'ID') strMngId = col.cd_name;
        if (col.cd_code === 'NAME') strMngName = col.cd_name;
        if (col.cd_code === 'EMAIL') strMngEmail = col.cd_name;
        if (col.cd_code === 'TEL') strMngTel = col.cd_name;
    });

    var strDocuDate = tRetDate1;
    // Docu No
    let sql7 = `
        select
            isnull(max(no_docu), '00000') as max_seq
            -- from neoe.neoe.fi_adocu
        from
            neoe_fi_adocu
        where
            no_docu like 'IM${strDocuDate}%'
    `;
    var tRet7 = await prisma.$queryRaw(Prisma.raw(sql7));
    var tMaxDocuNo = 1;
    if (tRet7[0].max_seq === '00000') {
        tMaxDocuNo = parseFloat(tRet7[0].max_seq) + 1;
    } else {
        tMaxDocuNo = parseFloat(tRet7[0].max_seq.substring(10, 15)) + 1;
    }
    var strMaxDocuNo = AFLib.printF(tMaxDocuNo, 5);
    var strDocuNo = `IM${strDocuDate}${strMaxDocuNo}`;
    var strTaxNo = `${strDocuNo}001`;
    var strDocuDate = tRetDate1;

    let sql0_0 = `
        select
            isnull(a.NEOE_NO, '') as NEOE_NO,
            isnull(b.CD_FLAG, '100') as VENDOR_MATL_TYPE
        from
            kcd_vendor a
            left join kcd_code b on b.cd_group = 'VENDOR_MATL_TYPE'
            and a.vendor_matl_type = b.cd_code
        where
            vendor_cd = '${argData.VENDOR_CD}'
    `;
    var tRet0_0 = await prisma.$queryRaw(Prisma.raw(sql0_0));
    var tVendorObj = {};
    var strNeoeNo = '';
    var strVendorMatlType = '';
    var strNeoeAgentCd = '';
    if (tRet0_0.length > 0) {
        strNeoeNo = tRet0_0[0].NEOE_NO;
        strVendorMatlType = tRet0_0[0].VENDOR_MATL_TYPE;
        strNeoeAgentCd = strNeoeNo;
    }

    var strLcReport = '';
    var strPO = '';
    var strPAY_DATE = '';
    var strReceive = '';
    var strReceiveCd = '';
    sql0_0 = `
        select
            a.pay_report,
            a.po_cd,
            max(a.pay_date) as s_pay_date
        from
            ksv_stock_in a
        where
            a.pay_report = '${argData.PAY_REPORT}'
        group by
            a.pay_report,
            isnull(a.pay_report, ''),
            a.po_cd
    `;
    tRet0_0 = await prisma.$queryRaw(Prisma.raw(sql0_0));
    if (tRet0_0.length > 0) {
        strLcReport = '';
        strPO = tRet0_0[0].po_cd;
        strPAY_DATE = tRet0_0[0].pay_date;
        if (strPO.substring(0, 1) === 'E') {
            strReceive = '에티오피아';
            strReceiveCd = '200';
        } else {
            strReceive = '베트남';
            strReceiveCd = '100';
        }
    }

    var strCurrCd = argData.CURR_CD;
    var strCurrNeoe = '';
    if (strCurrCd === 'KRW') {
        strCurrNeoe = '000';
    } else if (strCurrCd === 'USD') {
        strCurrNeoe = '001';
    } else if (strCurrCd === 'JPY') {
        strCurrNeoe = '002';
    } else if (strCurrCd === 'EUR') {
        strCurrNeoe = '003';
    } else if (strCurrCd === 'CNY') {
        strCurrNeoe = '004';
    } else if (strCurrCd === 'CHF') {
        strCurrNeoe = 'CHF';
    } else if (strCurrCd === 'GBP') {
        strCurrNeoe = 'GBP';
    }

    /*
    let sql1 = `
        select
            rate_base
        from
            neoe_ma_exchange
        where
            curr_sour = '${strCurrNeoe}'
            and yymmdd = '${tRetDate1}'
    `;
    var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
    var strRateBase = '1';
    if (tRet1.length > 0) strRateBase = tRet1[0].rate_base;
    */

    let sql1 = `
        select
            *
        from
            kcd_currency
        where
            curr_cd = '${argData.CURR_CD}'
            and start_date = '${tRetDate1}'
    `;
    var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
    var strRateBase = '1';
    if (tRet1.length > 0) strRateBase = tRet1[0].WON_AMT2;
    else {
        let sql1 = `
            select
                *
            from
                kcd_currency
            where
                curr_cd = '${argData.CURR_CD}'
                and start_date = (
                    select
                        max(start_date)
                    from
                        kcd_currency
                    where
                        curr_cd = '${argData.CURR_CD}'
                )
        `;
        var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
        if (tRet1.length > 0) strRateBase = tRet1[0].WON_AMT2;
    }

    var strNeoeType = '';
    var strCdacct = '';
    var strLcflag = '';
    var strRemark = '';
    var strMNGD2 = '';
    var strMNGD7 = '';
    var strCdacct2 = '';

    var strNeoeType = '외화선급금';

    if (strNeoeType === '원재료') {
        strCdacct = '15400'; //원재료
        strLcflag = '0';
        strRemark = '수입원재료';
        strMNGD2 = strVendorMatlType;
        strMNGD7 = strReceiveCd;
        strCdacct2 = '25102'; // 외화외상매입금
    } else if (strNeoeType === '외화선급금') {
        strCdacct = '13102'; // 외화선급금
        strLcflag = '3';
        strRemark = '수입원재료';
        strMNGD2 = '';
        strMNGD7 = strVendorMatlType;
        strCdacct2 = '10302'; //  회화보통예금
    } else if (strNeoeType === '미착품') {
        strCdacct = '16500'; //미착품
        strLcflag = '1';
        strRemark = strLcReport;
        strMNGD2 = strVendorMatlType;
        strMNGD7 = strReceiveCd;
        strCdacct2 = '25102';
    } else if (strNeoeType === '상품') {
        strCdacct = '15100'; //상품
        strLcflag = '2';
        strRemark = '상품';
        strMNGD2 = strVendorMatlType;
        strMNGD7 = strReceiveCd;
        strCdacct2 = '25102';
    }

    strRemark = `${strRemark} ${strRemark2} Deposit`;

    //
    var strTotAmt = parseFloat(argData.TOT_AMOUNT) * parseFloat(strRateBase);
    strTotAmt = parseFloat(strTotAmt).toFixed(0);

    // TT인경우 : 원재료, L/C인경우 : 미착품

    var requestArray = [];

    var tWObj = {};
    tWObj.DATA1 = {};
    tWObj.DATA2 = {};
    tWObj.DATA3 = {};

    // 차변 - 바이어별(cd_cd에 neoe_buyer_cd) , 부가세- 바이어별, 대변 - 1개(업체별)

    var tRowNo = 1;
    var tRowNo1 = 1;

    // 차변
    var tInObj = {};
    tInObj.row_id = strDocuNo;
    tInObj.row_no = '1';
    tInObj.no_tax = '*';
    tInObj.cd_pc = '1000';
    tInObj.cd_wdept = strMngPart; // 8400
    tInObj.no_docu = strDocuNo;
    tInObj.no_doline = '1';
    tInObj.cd_company = '1000';
    tInObj.id_write = strMngId; // 2217
    tInObj.cd_docu = '11';
    tInObj.dt_acct = strDocuDate;
    tInObj.st_docu = '1';
    tInObj.tp_drcr = '1';
    tInObj.cd_acct = strCdacct; // 원재료
    tInObj.amt = strTotAmt; // 한화금액
    tInObj.cd_partner = strNeoeAgentCd;
    tInObj.dt_start = '';
    tInObj.dt_end = '';
    tInObj.am_taxstd = '0';
    tInObj.am_addtax = '0';
    tInObj.tp_tax = '';
    tInObj.no_company = '';
    tInObj.nm_note = strRemark;
    tInObj.cd_bizarea = '1000';
    tInObj.cd_cc = '';
    tInObj.ucd_mng1 = '';
    tInObj.ucd_mng2 = '';
    tInObj.ucd_mng3 = '';
    tInObj.ucd_mng4 = '';
    tInObj.ucd_mng5 = '';
    tInObj.tp_docu = 'N';
    tInObj.no_acct = '0';
    tInObj.cd_exch = strCurrNeoe;
    tInObj.rt_exch = strRateBase;
    tInObj.am_ex = argData.TOT_AMOUNT; // 외화금액
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
    tInObj.nm_mngd1 = '';
    tInObj.cd_mngd2 = strMNGD2;
    tInObj.nm_mngd2 = '';
    tInObj.cd_mngd3 = '200';
    tInObj.nm_mngd3 = '수입';
    tInObj.cd_mngd4 = strCurrNeoe;
    tInObj.nm_mngd4 = strCurrCd;
    tInObj.cd_mngd5 = '';
    tInObj.nm_mngd5 = '';
    tInObj.cd_mngd6 = '';
    tInObj.nm_mngd6 = ''; // 원화금액
    tInObj.cd_mngd7 = strMNGD7;
    tInObj.nm_mngd7 = strReceive;
    tInObj.cd_mngd8 = '';
    tInObj.nm_mngd8 = '';
    tInObj.yn_iss = '0';
    tInObj.final_status = '00';
    tInObj.no_bill = '';
    tWObj.DATA1 = {
        ...tInObj,
    };

    tWObj.DATA2 = {};

    /*
    // 외화외상매입금 전표 계정코드 = 25102  
    // 외화과수금 전표 = 25702 
    */
    // 외화보통예금  = 10302
    tRowNo += 1;
    tInObj = {};
    tInObj.row_id = strDocuNo;
    tInObj.row_no = `${tRowNo}`;
    tInObj.no_tax = '*';
    tInObj.cd_pc = '1000';
    tInObj.cd_wdept = strMngPart; // 8400
    tInObj.no_docu = strDocuNo;
    tInObj.no_doline = `${tRowNo}`;
    tInObj.cd_company = '1000';
    tInObj.id_write = strMngId; // 2217
    tInObj.cd_docu = '11';
    tInObj.dt_acct = strDocuDate;
    tInObj.st_docu = '1';
    tInObj.tp_drcr = '2'; // 차변,대변 구분
    tInObj.cd_acct = strCdacct2; // 원재료
    tInObj.amt = strTotAmt; // 한화금액
    tInObj.cd_partner = strNeoeAgentCd;
    tInObj.dt_start = '';
    tInObj.dt_end = '';
    tInObj.am_taxstd = '0';
    tInObj.am_addtax = '0';
    tInObj.tp_tax = '';
    tInObj.no_company = '';
    tInObj.nm_note = strRemark;
    tInObj.cd_bizarea = '1000';
    tInObj.cd_cc = '';
    tInObj.ucd_mng1 = '';
    tInObj.ucd_mng2 = '';
    tInObj.ucd_mng3 = '';
    tInObj.ucd_mng4 = '';
    tInObj.ucd_mng5 = '';
    tInObj.tp_docu = 'N';
    tInObj.no_acct = '0';
    tInObj.cd_exch = strCurrNeoe;
    tInObj.rt_exch = strRateBase;
    tInObj.am_ex = argData.TOT_AMOUNT; // 외화금액
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
    tInObj.cd_mngd1 = '';
    tInObj.nm_mngd1 = '';
    tInObj.cd_mngd2 = '';
    tInObj.nm_mngd2 = '';
    tInObj.cd_mngd3 = '';
    tInObj.nm_mngd3 = '';
    tInObj.cd_mngd4 = '';
    tInObj.nm_mngd4 = '';
    tInObj.cd_mngd5 = '';
    tInObj.nm_mngd5 = '';
    tInObj.cd_mngd6 = '';
    tInObj.nm_mngd6 = ''; // 원화금액
    tInObj.cd_mngd7 = '';
    tInObj.nm_mngd7 = '';
    tInObj.cd_mngd8 = '';
    tInObj.nm_mngd8 = '';
    tInObj.yn_iss = '0';
    tInObj.final_status = '00';
    tInObj.no_bill = '';
    tWObj.DATA3 = {
        ...tInObj,
    };

    requestArray.push(tWObj);

    /*
    try {
       await prisma.$transaction(tSQLArray);
    } catch (e) {
        var tMessage  = 'ERROR:Insert SHIP Record';
        return (tMessage);
    }
    */

    tDbName = 'shints';
    var isProcess = 0;
    if (tDbName === 'shints') {
        var tUrl = '';
        if (tOrgDbName === 'shints') {
            tUrl = `https://erp.shints.com:3311/restapi/insert_docu_import_material/${argData.REG_USER}/Deposit`;
        } else {
            tUrl = `https://erp.shints.com:3311/restapi/insert_docu_import_material/${argData.REG_USER}/Deposit`;
        }

        try {
            var res_sync = request_sync('POST', tUrl, {
                json: requestArray,
            });
            var tResData = JSON.parse(res_sync.getBody('utf8'));
            console.log(tResData);
        } catch (e) {
            console.log(`request_sync:; neoe : error: ${e.message}`);
            isProcess = 1;
        }

        console.log(
            `========================================> epr.insert.douc: ${isProcess}`,
        );

        if (isProcess === 0) {
            var tIdx9 = 0;
            tSQLArray = [];
            for (tIdx9 = 0; tIdx9 < tResData.length; tIdx9++) {
                var tOne = {
                    ...tResData[tIdx9],
                };
                var tCols = tOne.INVOICE_NO.split(' ');
                var tInvoiceNo = tCols[1];
                strDocuNo = tOne.DOCU_NO;

                /*
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
                */
            }

            let sql1_2 = `
                select
                    *
                from
                    neoe_fi_adocu
                where
                    row_id = '${strDocuNo}'
            `;
            var tRet1_2 = await prisma.$queryRaw(Prisma.raw(sql1_2));
            if (tRet1_2.length > 0) {
                let sql1_3 = `
                    delete from neoe_fi_adocu
                    where
                        row_id = '${strDocuNo}'
                `;
                var tRet1_3 = await prisma.$queryRaw(Prisma.raw(sql1_3));

                let sql1_4 = `
                    delete from kcd_app_data
                    where
                        neoe_no = '${strDocuNo}'
                `;
                var tRet1_4 = await prisma.$queryRaw(Prisma.raw(sql1_4));
            }

            var tInObj = {
                ...tWObj.DATA1,
            };
            tInObj.row_id = strDocuNo;
            tInObj.no_docu = strDocuNo;
            let tSQL99 = AFLib.createTableSql('neoe_fi_adocu', tInObj);
            let tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);

            tInObj = {
                ...tWObj.DATA3,
            };
            tInObj.row_id = strDocuNo;
            tInObj.no_docu = strDocuNo;
            tSQL99 = AFLib.createTableSql('neoe_fi_adocu', tInObj);
            tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);
        }
    } else {
        let sql1_2 = `
            select
                *
            from
                neoe_fi_adocu
            where
                row_id = '${strDocuNo}'
        `;
        var tRet1_2 = await prisma.$queryRaw(Prisma.raw(sql1_2));
        if (tRet1_2.length > 0) {
            let sql1_3 = `
                delete from neoe_fi_adocu
                where
                    row_id = '${strDocuNo}'
            `;
            var tRet1_3 = await prisma.$queryRaw(Prisma.raw(sql1_3));

            let sql1_4 = `
                delete from kcd_app_data
                where
                    neoe_no = '${strDocuNo}'
            `;
            var tRet1_4 = await prisma.$queryRaw(Prisma.raw(sql1_4));
        }

        var tInObj = {
            ...tWObj.DATA1,
        };
        tInObj.row_id = strDocuNo;
        tInObj.no_docu = strDocuNo;
        let tSQL99 = AFLib.createTableSql('neoe_fi_adocu', tInObj);
        let tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
        tSQLArray.push(tSQL99_1);

        tInObj = {
            ...tWObj.DATA3,
        };
        tInObj.row_id = strDocuNo;
        tInObj.no_docu = strDocuNo;
        tSQL99 = AFLib.createTableSql('neoe_fi_adocu', tInObj);
        tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
        tSQLArray.push(tSQL99_1);
    }

    var tReturn = `SUCCEED:Insert Docu:${strDocuNo}`;

    tInObj = {};
    tInObj.pay_report = argData.DOC_NO;
    tInObj.lc_report = strLcReport;
    tInObj.seq = strMaxDocuNo;
    tInObj.curr_cd = strCurrCd;
    tInObj.amt = argData.TOT_AMOUNT;
    tInObj.pay_date = strOutDate;
    tInObj.vendor_cd = tInput.VENDOR_CD;
    tInObj.neoe_no = strDocuNo;
    tInObj.neoe_cd = strNeoeAgentCd;
    tInObj.lc_flag = strLcflag;
    tInObj.sinyong = '';
    tInObj.neoe_line = tRowNo1;
    tInObj.reg_user = argData.REG_USER;
    tInObj.cd_acct = strCdacct;
    let tSQL99 = AFLib.createTableSql('kcd_app_import', tInObj);
    const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
    if (isProcess === 0) tSQLArray.push(tSQL99_1);

    try {
        await prisma.$transaction(tSQLArray);
    } catch (e) {
        var tMessage = 'ERROR:Insert SHIP Record';
        return tMessage;
    }

    return tReturn;
};

/* -----------------------------*/

gw.all(
    '/return_gw_result/:cd_type/:appro_key/:result_code',
    async (req, res) => {
        const { cd_type, appro_key, result_code } = req.params;
        const targetUrl = `https://erp-test.shints.com:3202/restapi/return_gw_result/${cd_type}/${appro_key}/${result_code}`;
        var tCD_TYPE = req.params.cd_type;
        var tAPPRO_KEY = req.params.appro_key;
        var tRESULT_CODE = req.params.result_code;

        console.log(
            `==============================================> return gw(0):${tCD_TYPE}, ${argCode}`,
        );

        if (!config.thisIsTestServer) {
            console.log(
                'This is not a test server. Forwarding the request to the ERP test server.',
            );
            try {
                const axiosOptions = {
                    method: req.method,
                    url: targetUrl,
                    headers: {
                        ...req.headers,
                        host: undefined,
                    },
                    params: req.query,
                    data: req.body,
                    timeout: 8000,
                };

                console.log(axiosOptions);

                await axios(axiosOptions);
            } catch (err) {
                console.error('[ERP-TEST ERROR]', err.code || err.message);
            }
        }

        console.log(
            `==============================================> return gw(1):${tCD_TYPE}, ${argCode}`,
        );

        var sql0 = '';

        let sqlArray = [];
        var tRetDate = AFLib.getCurrTime();

        if (tCD_TYPE === 'VB') {
            var sql2 = `
                select
                    *
                from
                    kcd_vendor_bank
                where
                    appro_key = '${tAPPRO_KEY}'
            `;
            var tRet2 = await prisma.$queryRaw(Prisma.raw(sql2));

            if (tRet2.length > 0) {
                var sql0 = `
                    update kcd_vendor
                    set
                        gw = '${tRESULT_CODE}'
                    where
                        vendor_cd = '${tRet2[0].VENDOR_CD}'
                `;

                var sql1 = `
                    update kcd_vendor_bank
                    set
                        gw = '${tRESULT_CODE}'
                    where
                        appro_key = '${tAPPRO_KEY}'
                `;

                sqlArray.push(prisma.$queryRaw(Prisma.raw(sql0)));
                sqlArray.push(prisma.$queryRaw(Prisma.raw(sql1)));
            }
        }
        if (tCD_TYPE === 'MI') {
            // 수입자재 상신
            //

            var argCode = tRESULT_CODE;
            var argKey = tAPPRO_KEY;

            var tSqlPuMst = `
                update kcd_gw_taxbill_kr
                set
                    status_cd = '${argCode}'
                where
                    approkey = '${argKey}'
            `;
            var tRetPuMst = await prisma.$queryRaw(Prisma.raw(tSqlPuMst));

            var tSqlPuMst = `
                update ksv_bill_mst
                set
                    gw_status = '${argCode}'
                where
                    appro_key = '${argKey}'
            `;
            var tRetPuMst = await prisma.$queryRaw(Prisma.raw(tSqlPuMst));

            console.log(
                `========================================================> return gw:${argCode}`,
            );
            var sqlBillMst = `
                select
                    a.taxbill_cd,
                    a.bill_cd,
                    isnull(b.company_code, '') as company_code,
                    isnull(b.invoice_date, '') as invoice_date,
                    isnull(b.pay_date, '') as pay_date,
                    isnull(b.vendor_cd, '') as vendor_cd,
                    isnull(b.curr_cd, '') as curr_cd
                from
                    kcd_gw_taxbill_kr a
                    left join ksv_bill_mst b on b.bill_cd = a.bill_cd
                where
                    a.approkey = '${argKey}'
                    or a.approkey_tax = '${argKey}'
            `;
            var retBillMst = await prisma.$queryRaw(Prisma.raw(sqlBillMst));
            var tCompanyCode = '';
            if (retBillMst.length > 0)
                tCompanyCode = retBillMst[0].company_code;

            console.log(
                '-------------------------------------------------------> return gw company_code:' +
                    tCompanyCode,
            );

            if (argCode === '2') {

                if (retBillMst.length > 0) {
                    var sqlDnAmount = `
                        select * from ksv_dc_amount
                        where end_date  = '${retBillMst[0].invoice_date}'
                        and   pay_date  = '${retBillMst[0].pay_date}'
                        and   vendor_cd  = '${retBillMst[0].vendor_cd}'
                        and   curr_cd  = '${retBillMst[0].curr_cd}'
                    `;
                    var retDnAmount = await prisma.$queryRaw(Prisma.raw(sqlDnAmount));
                    var t_crdb_cd = '';
                    if (retDnAmount.length > 0) {
                        var tCols = retDnAmount[0].CRDB_CD.split('/');
                        var sql100 = '';
                        tCols.forEach((col, i) => {
                            if (col) {
                                if (sql100 === '') sql100 = `'${col}'`;
                                else  sql100 += `,'${col}'`;
                            }
                        });
                        if (sql100) {
                            var sqlSel1 = `
                                select  a.crdb_cd, a.crdb_amt, isnull(sum(b.crdb_amt), 0) as e_crdb_amt
                                from ksv_crdb_mst a
                                     left join ksv_crdb_mem b on a.crdb_cd = b.crdb_cd
                                where a.crdb_cd in (${sql100}) 
                                group by a.crdb_cd, a.crdb_amt
                            `;
                            var retSel1 = await prisma.$queryRaw(Prisma.raw(sqlSel1));

                            var tIdx100 = 0;
                            for (tIdx100 = 0; tIdx100 < retSel1.length; tIdx100++) {
                                var t_crdb_cd = retSel1[tIdx100].crdb_cd;
                                var t_crdb_amt = parseFloat(retSel1[tIdx100].crdb_amt);
                                var e_crdb_amt = parseFloat(retSel1[tIdx100].e_crdb_amt);
                                if (t_crdb_amt <= e_crdb_amt) {
                                    var sqlUp1 = `
                                        update ksv_crdb_mst 
                                        set
                                             status_cd = '2', end_date = '${tRetDate.substring(0,8)}', end_user = ''
                                        where
                                             crdb_cd = '${t_crdb_cd}'
                                    `;
                                    var retUp1 = await prisma.$queryRaw(Prisma.raw(sqlUp1));
                                } else {
                                    var sqlUp1 = `
                                        update ksv_crdb_mst 
                                        set
                                             status_cd = '0', end_date = '', end_user = ''
                                        where
                                             crdb_cd = '${t_crdb_cd}'
                                    `;
                                    var retUp1 = await prisma.$queryRaw(Prisma.raw(sqlUp1));
                                }
                            } 
                        }
                    }
                }

                var sqlTaxBill = `
                    select
                        *
                    from
                        kcd_gw_taxbill_kr
                    where
                        approkey = '${argKey}'
                `;
                var retTaxBill = await prisma.$queryRaw(Prisma.raw(sqlTaxBill));

                var tIdx = 0;
                for (tIdx = 0; tIdx < retTaxBill.length; tIdx++) {
                    var tResult = await make_docu_import(
                        retTaxBill[tIdx],
                        1,
                        tCompanyCode,
                    );
                }
            }

            /*
                var sql0 = `
                    update kcd_gw_taxbill_kr
                    set
                        status_cd = '${tRESULT_CODE}'
                    where
                        approkey = '${tAPPRO_KEY}'
                `;

                var sql1 = `
                    update ksv_bill_mst
                    set
                        gw_status = '${tRESULT_CODE}'
                    where
                        appro_key = '${tAPPRO_KEY}'
                `;

                sqlArray.push(prisma.$queryRaw(Prisma.raw(sql0)));
                sqlArray.push(prisma.$queryRaw(Prisma.raw(sql1)));
        */
        }

        if (tCD_TYPE === 'ML') {
            // 국내자재 상신

            var argCode = tRESULT_CODE;
            var argKey = tAPPRO_KEY;

            var tSqlPuMst = `
                update kcd_gw_taxbill_kr
                set
                    status_cd = '${argCode}'
                where
                    approkey = '${argKey}'
            `;
            var tRetPuMst = await prisma.$queryRaw(Prisma.raw(tSqlPuMst));

            var tSqlPuMst = `
                update ksv_bill_mst
                set
                    gw_status = '${argCode}'
                where
                    appro_key = '${argKey}'
            `;
            var tRetPuMst = await prisma.$queryRaw(Prisma.raw(tSqlPuMst));

            console.log(
                `========================================================> return gw:${argCode}`,
            );
            var sqlBillMst = `
                select
                    a.taxbill_cd,
                    a.bill_cd,
                    isnull(b.company_code, '') as company_code,
                    isnull(b.invoice_date, '') as invoice_date,
                    isnull(b.pay_date, '') as pay_date,
                    isnull(b.vendor_cd, '') as vendor_cd,
                    isnull(b.curr_cd, '') as curr_cd
                from
                    kcd_gw_taxbill_kr a
                    left join ksv_bill_mst b on b.bill_cd = a.bill_cd
                where
                    a.approkey = '${argKey}'
                    or a.approkey_tax = '${argKey}'
            `;
            var retBillMst = await prisma.$queryRaw(Prisma.raw(sqlBillMst));
            var tCompanyCode = '';
            if (retBillMst.length > 0)
                tCompanyCode = retBillMst[0].company_code;

            console.log(
                '-------------------------------------------------------> return gw company_code:' +
                    tCompanyCode,
            );

            if (argCode === '2') {

                if (retBillMst.length > 0) {
                    var sqlDnAmount = `
                        select * from ksv_dc_amount
                        where end_date  = '${retBillMst[0].invoice_date}'
                        and   pay_date  = '${retBillMst[0].pay_date}'
                        and   vendor_cd  = '${retBillMst[0].vendor_cd}'
                        and   curr_cd  = '${retBillMst[0].curr_cd}'
                    `;
                    var retDnAmount = await prisma.$queryRaw(Prisma.raw(sqlDnAmount));
                    var t_crdb_cd = '';
                    if (retDnAmount.length > 0) {
                        var tCols = retDnAmount[0].CRDB_CD.split('/');
                        var sql100 = '';
                        tCols.forEach((col, i) => {
                            if (col) {
                                if (sql100 === '') sql100 = `'${col}'`;
                                else  sql100 += `,'${col}'`;
                            }
                        });
                        if (sql100) {
                            var sqlSel1 = `
                                select  a.crdb_cd, a.crdb_amt, isnull(sum(b.crdb_amt), 0) as e_crdb_amt
                                from ksv_crdb_mst a
                                     left join ksv_crdb_mem b on a.crdb_cd = b.crdb_cd
                                where a.crdb_cd in (${sql100}) 
                                group by a.crdb_cd, a.crdb_amt
                            `;
                            var retSel1 = await prisma.$queryRaw(Prisma.raw(sqlSel1));

                            var tIdx100 = 0;
                            for (tIdx100 = 0; tIdx100 < retSel1.length; tIdx100++) {
                                var t_crdb_cd = retSel1[tIdx100].crdb_cd;
                                var t_crdb_amt = parseFloat(retSel1[tIdx100].crdb_amt);
                                var e_crdb_amt = parseFloat(retSel1[tIdx100].e_crdb_amt);
                                if (t_crdb_amt <= e_crdb_amt) {
                                    var sqlUp1 = `
                                        update ksv_crdb_mst 
                                        set
                                             status_cd = '2', end_date = '${tRetDate.substring(0,8)}', end_user = ''
                                        where
                                             crdb_cd = '${t_crdb_cd}'
                                    `;
                                    var retUp1 = await prisma.$queryRaw(Prisma.raw(sqlUp1));
                                } else {
                                    var sqlUp1 = `
                                        update ksv_crdb_mst 
                                        set
                                             status_cd = '0', end_date = '', end_user = ''
                                        where
                                             crdb_cd = '${t_crdb_cd}'
                                    `;
                                    var retUp1 = await prisma.$queryRaw(Prisma.raw(sqlUp1));
                                }
                            } 
                        }
                    }
                }


                var sqlTaxBill = `
                   select  a.*, 
                           isnull(b.pay_report, '-1') as pay_report,
                           isnull(c.neoe_no , '-1') as neoe_no
                   from kcd_gw_taxbill_kr a
                        left join ksv_bill_mst b on a.bill_cd = b.bill_cd
                        left join kcd_app_data c on a.taxbill_cd = c.taxbill_cd
                                                and (c.cd_acct = '13101' or c.cd_acct = '13102')
                   where a.approkey in ('${argKey}')
                    and  isnull(c.neoe_no , '-1') = '-1' 
                `;
                var retTaxBill = await prisma.$queryRaw(Prisma.raw(sqlTaxBill));
                var tIdx = 0;
                for (tIdx = 0; tIdx < retTaxBill.length; tIdx++) {
                    var tResult = await make_docu_domestic(
                        retTaxBill[tIdx],
                        1,
                        tCompanyCode,
                    );
                }
            }

            /*
          var sql0 = `
              update kcd_gw_taxbill_kr
              set
                  status_cd = '${tRESULT_CODE}'
              where
                  approkey = '${tAPPRO_KEY}'
          `;

          var sql1 = `
              update ksv_bill_mst
              set
                  gw_status = '${tRESULT_CODE}'
              where
                  appro_key = '${tAPPRO_KEY}'
          `;

          sqlArray.push(prisma.$queryRaw(Prisma.raw(sql0)));
          sqlArray.push(prisma.$queryRaw(Prisma.raw(sql1)));
          */
        }

        if (tCD_TYPE === 'DT' || tCD_TYPE === 'IT') {
            // 국내자재 세금계산서 상신, 해외자재 세금계산서 상신(NSR)

            var argCode = tRESULT_CODE;
            var argKey = tAPPRO_KEY;

            var tSqlPuMst = `
                update kcd_gw_taxbill_kr
                set
                    status_cd_tax = '${argCode}'
                where
                    approkey_tax = '${argKey}'
            `;
            var tRetPuMst = await prisma.$queryRaw(Prisma.raw(tSqlPuMst));

            var tSqlPuMst = `
                update ksv_bill_mst
                set
                    gw_status_tax = '${argCode}'
                where
                    appro_key_tax = '${argKey}'
            `;
            var tRetPuMst = await prisma.$queryRaw(Prisma.raw(tSqlPuMst));

            console.log(
                `========================================================> return gw:${argCode}`,
            );

            var sqlBillMst = `
                select
                    a.taxbill_cd,
                    a.bill_cd,
                    isnull(b.company_code, '') as company_code
                from
                    kcd_gw_taxbill_kr a
                    left join ksv_bill_mst b on b.bill_cd = a.bill_cd
                where
                    a.approkey = '${argKey}'
                    or a.approkey_tax = '${argKey}'
            `;
            var retBillMst = await prisma.$queryRaw(Prisma.raw(sqlBillMst));
            var tCompanyCode = '';
            if (retBillMst.length > 0)
                tCompanyCode = retBillMst[0].company_code;

            console.log(
                '-------------------------------------------------------> return gw company_code:' +
                    tCompanyCode,
            );

            if (argCode === '2') {
                var sqlTaxBill = `
                    select
                        *
                    from
                        kcd_gw_taxbill_kr
                    where
                        approkey_tax = '${argKey}'
                `;
                var retTaxBill = await prisma.$queryRaw(Prisma.raw(sqlTaxBill));

                var tIdx = 0;
                for (tIdx = 0; tIdx < retTaxBill.length; tIdx++) {
                    retTaxBill[tIdx].REG_USER = 'AFROBA';
                    var tResult = await make_docu_domestic_taxbill(
                        retTaxBill[tIdx],
                        1,
                        tCompanyCode,
                    );
                }
            }
        }

        if (tCD_TYPE === 'CD') {
            // Debit-Credit
            var sql0 = `
                update kcd_gwcode
                set
                    status_cd = '${tRESULT_CODE}'
                where
                    approkey = '${tAPPRO_KEY}'
            `;
            sqlArray.push(prisma.$queryRaw(Prisma.raw(sql0)));
        }

        if (tCD_TYPE === 'LC') {
            // Debit-Credit

            var sql0 = `
                update ksv_pu_lcdeposit
                set
                    gw_status = '${tRESULT_CODE}'
                where
                    appro_key = '${tAPPRO_KEY}'
            `;
            sqlArray.push(prisma.$queryRaw(Prisma.raw(sql0)));

            var sql1 = `
                update ksv_pu_mst2
                set
                    gw_status = '${tRESULT_CODE}',
                    deposit_gw_status = '${tRESULT_CODE}'
                where
                    gw_key = '${tAPPRO_KEY}'
            `;
            sqlArray.push(prisma.$queryRaw(Prisma.raw(sql1)));

            if (tRESULT_CODE === '3' ||
                tRESULT_CODE === '4' ||
                tRESULT_CODE === '5' ) {
                var sql2 = `
                    select
                        *
                    from
                        ksv_pu_lcdeposit
                    where
                        appro_key = '${tAPPRO_KEY}'
                `;
                var tRet2 = await prisma.$queryRaw(Prisma.raw(sql2));

                if (tRet2.length > 0) {
                    var tPuCd = tRet2[0].PU_CD;
                    var tPuAmt = tRet2[0].AMT;
                    var tPayReport = tRet2[0].PAY_REPORT;
                    var sql0 = `
                        delete from ksv_stock_in
                        where pu_cd = '${tPuCd}'
                        and pay_report = '${tPayReport}'
                    `;
                    sqlArray.push(prisma.$queryRaw(Prisma.raw(sql0)));

                    var sql1 = `
                        update ksv_pu_mst2 set
                               lc_amt = lc_amt - ${tPuAmt},
                               gw_status = '' ,
                               deposit_gw_status = ''
                        where pu_cd = '${tPuCd}'
                    `;
                    sqlArray.push(prisma.$queryRaw(Prisma.raw(sql1)));
                }
            }

            if (tRESULT_CODE === '2') {
                // 종결
                var sql2 = `
                    select
                        *
                    from
                        ksv_pu_lcdeposit
                    where
                        appro_key = '${tAPPRO_KEY}'
                `;
                var tRet2 = await prisma.$queryRaw(Prisma.raw(sql2));
                if (tRet2.length > 0) {
                    var tPuCd = tRet2[0].PU_CD;
                    var tPayReport = tRet2[0].PAY_REPORT;
                    var tResultAmt = tRet2[0].AMT;
                    var sql0 = `
                        update ksv_stock_in
                        set
                            lc_conf_flag = '1'
                        where
                            pu_cd = '${tPuCd}'
                            and pay_report = '${tPayReport}'
                    `;
                    sqlArray.push(prisma.$queryRaw(Prisma.raw(sql0)));

                    // PU Update
                    var sql3 = `
                        select kind, sum(amt) as amt 
                         from ksv_pu_lcdeposit
                        where pu_cd = '${tPuCd}'
                         and  gw_status = '2'
                         and  appro_key is not null and appro_key <> '' 
                        group by kind
                    `;
                    var tRet3 = await prisma.$queryRaw(Prisma.raw(sql3));
                     
                    var tUpLcAmt = 0;
                    var tUpDepositAmt = 0;
                    if (tRet3.length > 0) {
                        var tIdx3 = 0;
                        for (tIdx3 = 0; tIdx3 < tRet3.length; tIdx3++) {
                             var tKind = tRet3[tIdx3].kind;
                             var tAmt = parseFloat(parseFloat(tRet3[tIdx3].amt).toFixed(2));
                             if (tKind === 'LC') {
                                 tUpLcAmt = tAmt;
                             } 
                             if (tKind === 'DEPOSIT') {
                                 tUpDepositAmt = tAmt;
                             } 
                        }
                    }
                    tUpLcAmt += parseFloat(tResultAmt);
                    var sql_up = `
                        update ksv_pu_mst2
                           set
                               DEPOSIT_AMT  = ${tUpDepositAmt},
                               LC_AMT  = ${tUpLcAmt}
                        where
                               pu_cd = '${tPuCd}'
                    `;
                    sqlArray.push(prisma.$queryRaw(Prisma.raw(sql_up)));

                }
            }
        }

        if (tCD_TYPE === 'LD') {
            // Debit-Credit
            var sql0 = `
                update ksv_pu_lcdeposit
                set
                    gw_status = '${tRESULT_CODE}'
                where
                    appro_key = '${tAPPRO_KEY}'
            `;
            sqlArray.push(prisma.$queryRaw(Prisma.raw(sql0)));

            var sql1 = `
                update ksv_pu_mst2
                set
                    gw_status = '${tRESULT_CODE}',
                    deposit_gw_status = '${tRESULT_CODE}'
                where
                    gw_key = '${tAPPRO_KEY}'
            `;
            sqlArray.push(prisma.$queryRaw(Prisma.raw(sql1)));

            if (tRESULT_CODE === '3' || 
                tRESULT_CODE === '4' ||
                tRESULT_CODE === '5' ) {
                var sql2 = `
                    select
                        *
                    from
                        ksv_pu_lcdeposit
                    where
                        appro_key = '${tAPPRO_KEY}'
                `;
                var tRet2 = await prisma.$queryRaw(Prisma.raw(sql2));

                if (tRet2.length > 0) {
                    var tPuCd = tRet2[0].PU_CD;
                    var tPayReport = tRet2[0].PAY_REPORT;
                    var sql0 = `
                        delete from ksv_stock_in
                        where pu_cd = '${tPuCd}'
                        and pay_report = '${tPayReport}'
                    `;
                    sqlArray.push(prisma.$queryRaw(Prisma.raw(sql0)));

                    var sql1 = `
                        update ksv_pu_mst2 set
                               deposit_amt = deposit_amt - ${tPuAmt},
                               gw_status = '',
                               deposit_gw_status = ''
                        where pu_cd = '${tPuCd}'
                    `;
                    sqlArray.push(prisma.$queryRaw(Prisma.raw(sql1)));
                }
            }


            if (tRESULT_CODE === '2') {
                // 종결

                var sql2 = `
                    select
                        *
                    from
                        ksv_pu_lcdeposit
                    where
                        appro_key = '${tAPPRO_KEY}'
                `;
                var tRet2 = await prisma.$queryRaw(Prisma.raw(sql2));

                if (tRet2.length > 0) {
                    var tPuCd = tRet2[0].PU_CD;
                    var tPayReport = tRet2[0].PAY_REPORT;
                    var tResultAmt = tRet2[0].AMT;

                    var sql3 = `
                        select
                            *
                        from
                            ksv_pu_mst2
                        where
                            pu_cd = '${tPuCd}'
                    `;
                    var tRet3 = await prisma.$queryRaw(Prisma.raw(sql3));

                    var objPu = {
                        ...tRet3[0],
                    };

                    var sql0 = `
                        update ksv_stock_in
                        set
                            lc_conf_flag = '1'
                        where
                            pu_cd = '${tPuCd}'
                            and pay_report = '${tPayReport}'
                    `;
                    sqlArray.push(prisma.$queryRaw(Prisma.raw(sql0)));

                    // PU Update ----
                    var sql3 = `
                        select kind, sum(amt) as amt 
                         from ksv_pu_lcdeposit
                        where pu_cd = '${tPuCd}'
                         and  gw_status = '2'
                         and  appro_key is not null and appro_key <> '' 
                        group by kind
                    `;
                    var tRet3 = await prisma.$queryRaw(Prisma.raw(sql3));
                     
                    var tUpLcAmt = 0;
                    var tUpDepositAmt = 0;
                    if (tRet3.length > 0) {
                        var tIdx3 = 0;
                        for (tIdx3 = 0; tIdx3 < tRet3.length; tIdx3++) {
                             var tKind = tRet3[tIdx3].kind;
                             var tAmt = parseFloat(parseFloat(tRet3[tIdx3].amt).toFixed(2));
                             if (tKind === 'LC') {
                                 tUpLcAmt = tAmt;
                             } 
                             if (tKind === 'DEPOSIT') {
                                 tUpDepositAmt = tAmt;
                             } 
                        }
                    }
                    tUpDepositAmt += parseFloat(tResultAmt);
                    var sql_up = `
                        update ksv_pu_mst2
                           set
                               DEPOSIT_AMT  = ${tUpDepositAmt},
                               LC_AMT  = ${tUpLcAmt}
                        where
                               pu_cd = '${tPuCd}'
                    `;
                    sqlArray.push(prisma.$queryRaw(Prisma.raw(sql_up)));


                    // 전표처리

                    var tInObj = {};
                    tInObj.DOC_NO = tPayReport;
                    tInObj.PAY_REPORT = tPayReport;
                    tInObj.TAXBILL_DATE = tRetDate.substring(0, 8);
                    tInObj.TAXBILL_CD = '';
                    tInObj.TAX_KIND = '과세';

                    var tTmp = parseFloat(objPu.DEPOSIT_AMT) * 0.1;
                    tTmp = tTmp.toFixed(2);
                    tInObj.TAX = tTmp;
                    tInObj.VENDOR_CD = objPu.VENDOR_CD;
                    tInObj.CURR_CD = objPu.CURR_CD;

                    var sql3 = `
                        select
                            *
                        from
                            kcd_vendor
                        where
                            vendor_cd = '${tInObj.VENDOR_CD}'
                    `;
                    var tRet3 = await prisma.$queryRaw(Prisma.raw(sql3));
                    var tVendorType = '';
                    if (tRet3.length > 0) tVendorType = tRet3[0].VENDOR_TYPE;

                    tInObj.BILL_CD = '';
                    tInObj.VAT_AMT = tInObj.TAX;
                    tInObj.PUR_APP = 'SHINTS';
                    tInObj.TOT_AMOUNT = objPu.DEPOSIT_AMT;

                    tTmp =
                        parseFloat(tInObj.TOT_AMOUNT) -
                        parseFloat(tInObj.VAT_AMT);
                    tInObj.MINUS_AMOUNT = tTmp.toFixed(2);

                    tInObj.REG_USER = objPu.REG_USER;
                    tInObj.PAY_DATE = objPu.PAY_DATE;
                    tInObj.CLOSING_DATE = objPu.PAY_DATE;

                    let sql9_1 = `
                    select db_name() as db_name
                `;
                    var tRet9_1 = await prisma.$queryRaw(Prisma.raw(sql9_1));
                    var tDbName = '';
                    if (tRet9_1.length > 0) tDbName = tRet9_1[0].db_name;

                    var tResult = '';
                    if (tVendorType === '1')
                        tResult = await make_docu_domestic_deposit(tInObj, 1);
                    if (tVendorType === '3')
                        tResult = await make_docu_import_deposit(tInObj, 1);
                    /*
                if (tDbName.includes('test20')) {
                    console.log(`Deposit 전표: ${tDbName}`);
                    var tResult = '';
                    if (tVendorType === '1') tResult = await make_docu_domestic_deposit(tInObj, 1);
                    if (tVendorType === '3') tResult = await make_docu_import_deposit(tInObj, 1);
                }
                */
                }
            }
        }

        global.currentTransactionInfo = {
            contextValue: {
                token: 'GW:SYSTEM:AFROBA:NONE',
            },
            functionName: 'dblib3/gw/gw.ts',
        };
        await prisma.$transaction(sqlArray);
        delete global.currentTransactionInfo;

        var tRetObj = {};
        tRetObj.CD_TYPE = tCD_TYPE;
        tRetObj.APPRO_KEY = tAPPRO_KEY;
        tRetObj.RESULT_CODE = tRESULT_CODE;

        res.send({
            status: true,
            message: 'OK',
            data: tRetObj,
        });
    },
);

gw.all(
    '/request_gw_vendor/:bank_cd/:dt_reg/:id_reg',
    async (
        req: {
            params: {
                bank_cd: any;
                dt_reg: any;
                id_reg: any;
            };
            body: {
                vendor_cd: string;
            };
        },
        res: {
            send: (arg0: {
                status: boolean;
                message: string;
                data: any;
            }) => void;
        },
    ) => {
        // var tInput = JSON.parse(req.body);
        var tBankCd = req.params.bank_cd;
        var tDtReg = req.params.dt_reg;
        var tIdReg = req.params.id_reg;
        var tVendorCds = req.body.vendor_cd.split(':');

        var tPostObj = {};

        var sql100 = `
            select
                isnull(emp_no, '') as emp_no
            from
                kcd_user
            where
                user_id = '${tIdReg}'
        `;
        var tRet100 = await prisma.$queryRaw(Prisma.raw(sql100));
        if (tRet100.length <= 0) {
            res.send({
                status: true,
                message: 'GW Error(Check EMP NO)',
                data: {},
            });
            return;
        }
        var tEmpNo = tRet100[0].emp_no;
        if (tEmpNo === '') {
            res.send({
                status: true,
                message: 'GW Error(Check EMP NO)',
                data: {},
            });
            return;
        }

        tPostObj.NM_SUPPLIER = 'SHINTS';
        tPostObj.KEY_CERT = '1111';
        tPostObj.CD_TYPE = 'VB';
        tPostObj.CD_COMPANY = '1000';
        tPostObj.EMP_NO = tEmpNo;
        tPostObj.ID_REG = tIdReg;
        tPostObj.DT_REG = tDtReg;

        var sql0 = `
            select
                a.*,
                isnull(b.cd_name, '') as BANK_TYPE1_N
            from
                kcd_bank a
                left join kcd_code b on a.bank_type1 = b.cd_code
                and b.cd_group = 'BANK_TYPE1'
            where
                a.bank_cd = '${tBankCd}'
        `;
        var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
        var tInData2 = {
            ...tRet0[0],
        };

        var tSql = '(';
        tVendorCds.forEach((col: any, i: number) => {
            if (i === 0) tSql += `'${col}'`;
            else tSql += `,'${col}'`;
        });
        tSql += ')';
        var sql1 = `
            select
                a.*,
                b.cd_name as VENDOR_TYPE_N,
                c.NAT_NAME
            from
                kcd_vendor a,
                kcd_code b,
                kcd_nation c
            where
                a.vendor_cd in ${tSql}
                and a.vendor_type = b.cd_code
                and b.cd_group = 'VENDOR_TYPE'
                and a.nat_cd = c.nat_cd
        `;
        var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));

        var tCoArray = ['', '', '', '', '', '', '', '', '', '', '', '', ''];
        tCoArray[1] = `[거래처 계좌 등록 신청서]-${tRet1[0].VENDOR_NAME}`;
        tCoArray[2] = `${tInData2.BANK_NAME}/?/${tInData2.ACCOUNT_NO}/?/${tInData2.ACCOUNT_NAME}/?/${tInData2.SFTCODE}/?/${tInData2.BANK_TYPE1_N}/?/`;

        tRet1.forEach(
            (
                col: {
                    VENDOR_CD: any;
                    VENDOR_NAME: any;
                    VENDOR_TYPE_N: any;
                    REG_NO: any;
                    PRESIDENT: any;
                    USER_NAME: any;
                    EMAIL: any;
                    TEL_NO: any;
                    FAX_NO: any;
                    NAT_NAME: any;
                    ADDR1: any;
                    PAY_TYPE: any;
                    PERMIT: any;
                },
                i: number,
            ) => {
                tCoArray[3 + i] = `${col.VENDOR_CD}/?/`;
                tCoArray[3 + i] += `${col.VENDOR_NAME}/?/`;
                tCoArray[3 + i] += `${col.VENDOR_TYPE_N}/?/`;
                tCoArray[3 + i] += `${col.REG_NO}/?/`;
                tCoArray[3 + i] += `${col.PRESIDENT}/?/`;
                tCoArray[3 + i] += `${col.USER_NAME}/?/`;
                tCoArray[3 + i] += `${col.EMAIL}/?/`;
                tCoArray[3 + i] += `${col.TEL_NO}/?/`;
                tCoArray[3 + i] += `${col.FAX_NO}/?/`;
                tCoArray[3 + i] += `${col.NAT_NAME}/?/`;
                tCoArray[3 + i] += `${col.ADDR1}/?/`;
                tCoArray[3 + i] += `${col.PAY_TYPE}/?/`;
                tCoArray[3 + i] += `${col.PERMIT}/?/`;
            },
        );

        tPostObj.C01 = tCoArray[1];
        tPostObj.C02 = tCoArray[2];
        tPostObj.C03 = tCoArray[3];
        tPostObj.C04 = tCoArray[4];
        tPostObj.C05 = tCoArray[5];
        tPostObj.C06 = tCoArray[6];
        tPostObj.C07 = tCoArray[7];
        tPostObj.C08 = tCoArray[8];
        tPostObj.C09 = tCoArray[9];
        tPostObj.C010 = tCoArray[10];
        tPostObj.C011 = tCoArray[11];
        tPostObj.C012 = tCoArray[12];

        var tUrl = `http://gw.shints.com/KOR_WEBROOT/SRC/CM/TIMS/INDEX.ASPX?erp_div=OTHER_SIN&cd_company=${tPostObj.CD_COMPANY}&emp_no=${tPostObj.EMP_NO}&appro_key=${tPostObj.APPROKEY}&form_id=92`;

        console.log(JSON.stringify(tPostObj));
        var res_sync = request_sync(
            'POST',
            'http://sts.shints.com:8585/EA/EABizRequest',
            {
                json: tPostObj,
            },
        );
        console.log(res_sync.getBody('utf8'));
        var tResData = JSON.parse(res_sync.getBody('utf8'));
        console.log('ResData =>' + tResData.APPROKEY + ',' + tBankCd);

        let sqlArray = [];

        var sql0 = `
            update kcd_vendor
            set
                approkey = '${tResData.APPROKEY}',
                gw = '6'
            where
                vendor_cd in ${tSql}
        `;

        var sql1 = `
            update kcd_vendor_bank
            set
                appro_key = '${tResData.APPROKEY}',
                gw = '6'
            where
                vendor_cd in ${tSql}
                and bank_cd = '${tBankCd}'
        `;

        sqlArray.push(prisma.$queryRaw(Prisma.raw(sql0)));
        sqlArray.push(prisma.$queryRaw(Prisma.raw(sql1)));

        global.currentTransactionInfo = {
            contextValue: {
                token: 'GW:SYSTEM:AFROBA:NONE',
            },
            functionName: 'dblib3/gw/gw.ts',
        };
        await prisma.$transaction(sqlArray);
        delete global.currentTransactionInfo;

        res.send({
            status: true,
            message: 'Insert Shipment',
            data: tResData,
        });
    },
);

gw.all(
    '/request_gw_lc/:pu_cd/:dt_reg/:id_reg/:id_purchaser/:pay_report',
    async (
        req: {
            params: {
                pu_cd: any;
                dt_reg: any;
                id_reg: any;
                id_purchaser: any;
            };
            body: {
                pu_cd: string;
            };
        },
        res: {
            send: (arg0: {
                status: boolean;
                message: string;
                data: any;
            }) => void;
        },
    ) => {
        // var tInput = JSON.parse(req.body);
        var tPuCd = req.params.pu_cd;
        var tDtReg = req.params.dt_reg;
        var tIdReg = req.params.id_reg;
        let purchaseUserId = req.params.id_purchaser;
        let tPayReport = req.params.pay_report;

        var puCdArray = [];
        var puCds = req.body.pu_cd.split('|');
        if (puCds.length <= 0) {
            res.send({
                status: true,
                message: 'GW Error(Check Selected Data)',
                data: {},
            });
            return;
        }
        puCds.forEach((col, i) => {
            var tCols1 = col.split(',');
            if (tCols1.length >= 3) {
                var tObj = {};
                tObj.pu_cd = tCols1[0];
                tObj.pay_report = tCols1[1];
                tObj.pay_amount = tCols1[2];
                tObj.ship_date = moment(tCols1[3], 'YYYYMMDD').format('YYYY-MM-DD');
                puCdArray.push(tObj);
            }
        });
        var sqlPuCd = '';
        var strPuCds = '';
        var strShipDates = '';
        var sqlPayReport = '';
        var totalPayAmount = 0;
        puCdArray.forEach((col, i) => {
            if (col.pu_cd) {
                if (sqlPuCd === '') {
                    sqlPuCd = `'${col.pu_cd}'`;
                    strPuCds = `${col.pu_cd}`;
                    strShipDates = `${col.ship_date}`;
                } else  {
                    sqlPuCd += `,'${col.pu_cd}'`;
                    strPuCds += `/${col.pu_cd}`;
                    strShipDates += `/${col.ship_date}`;
                }
            }
            if (col.pay_report) {
                if (sqlPayReport === '') sqlPayReport = `'${col.pay_report}'`;
                else  sqlPayReport += `,'${col.pay_report}'`;
            }
            if (col.pay_amount) totalPayAmount += parseFloat(col.pay_amount);
        });


        var tPostObj = {};

        var sql100 = `
            select
                isnull(emp_no, '') as emp_no,
                user_name
            from
                kcd_user
            where
                user_id = '${tIdReg}'
        `;
        var tRet100 = await prisma.$queryRaw(Prisma.raw(sql100));
        if (tRet100.length <= 0) {
            res.send({
                status: true,
                message: 'GW Error(Check EMP NO)',
                data: {},
            });
            return;
        }
        var tEmpNo = tRet100[0].emp_no;
        if (tEmpNo === '') {
            res.send({
                status: true,
                message: 'GW Error(Check EMP NO)',
                data: {},
            });
            return;
        }

        tPostObj.NM_SUPPLIER = 'SHINTS';
        tPostObj.KEY_CERT = '1111';
        tPostObj.CD_TYPE = 'LC';
        tPostObj.CD_COMPANY = '1000';
        tPostObj.EMP_NO = tEmpNo;
        tPostObj.ID_REG = tIdReg;
        tPostObj.DT_REG = tDtReg;

        let purchaseUserInfo = await prisma.$queryRaw(
            Prisma.raw(
                `
                    select
                        *
                    from
                        kcd_user
                    where
                        user_id = '${purchaseUserId}'
                `,
            ),
        );

        var sql0 = `
            select
                a.*,
                b.BUYER_NAME,
                c.VENDOR_NAME,
                c.OVERSHORT_RATE,
                isnull(c.pay_type, '0') as PAY_TYPE,
                isnull(d.CD_NAME, '') as PAY_TYPE_N,
                a1.LATEST_SHIP_DATE as LATEST_SHIP_DATE2,
                a1.SHIP_MODE as SHIP_MODE2,
                a1.EXPIRY_DATE as EXPIRY_DATE2,
                a1.PAY_DATE as PAY_DATE2,
                a1.AMT as AMT2,
                a1.CURR_CD as CURR_CD2,
                a1.PAY_BANK as PAY_BANK2
            from
                ksv_pu_mst2 a,
                ksv_pu_lcdeposit a1,
                kcd_buyer b,
                kcd_vendor c
                left join kcd_code d on c.pay_type = d.cd_code
                and d.cd_group = 'PAY_TYPE'
            where
                a.pu_cd in (${sqlPuCd})
                and a.pu_cd = a1.pu_cd
                and a1.pay_report in (${sqlPayReport})
                and a.buyer_cd = b.buyer_cd
                and a.vendor_cd = c.vendor_cd
        `;
        var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
        var tLcAmt = 0;
        tRet0.forEach((col, i) => {
            tLcAmt += parseFloat(col.AMT2);
        });
        var tPuObj = {
            ...tRet0[0],
        };
        var tType = 'L/C';

        var sql1 = `
            select
                a.*,
                isnull(b.cd_name, '') as BANK_TYPE1_N
            from
                kcd_bank a
                left join kcd_code b on a.bank_type1 = b.cd_code
                and b.cd_group = 'BANK_TYPE1'
            where
                a.bank_cd = '${tPuObj.PAY_BANK2}'
        `;
        var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
        var tBankObj = {
            ...tRet1[0],
        };
        if (tBankObj.BANK_TYPE1_N === '') {
            if (tPuObj.CURR_CD !== 'KRW') tBankObj.BANK_TYPE1_N = '외화';
            else tBankObj.BANK_TYPE1_N = '원화';
        }

        /*
    var sql2 = `
        select
            a.PO_CD,
            a.MATL_CD,
            b.MATL_NAME,
            b.COLOR,
            b.SPEC,
            a.PO_QTY2,
            b.UNIT,
            a.CURR_CD,
            a.PO_PRICE,
            (a.PO_QTY2 * a.PO_PRICE) as PO_AMT
        from
            ksv_stock_mem2 a,
            kcd_matl_mst b
        where
            a.matl_cd = b.matl_cd
            and a.pu_cd = '${tPuCd}'
    `;
    var tStockMem2 = await prisma.$queryRaw(Prisma.raw(sql2));
    var tLcAmt = 0;
    tStockMem2.forEach((col, i) => {
        tLcAmt += col.PO_AMT;
    });
    */
        var sql2 = `
            select
                a.PO_CD,
                a.MATL_CD,
                b.MATL_NAME,
                b.COLOR,
                b.SPEC,
                b.UNIT,
                a.CURR_CD,
                a.PO_PRICE,
                a.PO_QTY2,
                sum(c.LC_QTY) as LC_QTY
            from
                ksv_stock_mem2 a,
                kcd_matl_mst b,
                ksv_stock_in c
            where
                a.matl_cd = b.matl_cd
                and a.pu_cd in (${sqlPuCd})
                and c.pay_report in (${sqlPayReport})
                and a.po_cd = c.po_cd
                and a.matl_cd = c.matl_cd
                and c.lc_qty > 0
                and c.in_qty <= 0
                and c.pay_report <> ''
            group by
                a.PO_CD,
                a.MATL_CD,
                b.MATL_NAME,
                b.COLOR,
                b.SPEC,
                b.UNIT,
                a.CURR_CD,
                a.PO_PRICE,
                a.PO_QTY2
        `;
        var tStockMem2 = await prisma.$queryRaw(Prisma.raw(sql2));
        var tPuAmt = 0;
        var tLcAmt = 0;
        tStockMem2.forEach((col, i) => {
            tPuAmt += parseFloat(col.PO_QTY2) * parseFloat(col.PO_PRICE);
            tLcAmt += parseFloat(col.LC_QTY) * parseFloat(col.PO_PRICE);
            console.log(
                `${col.MATL_CD}/${col.PO_QTY2}/${col.PO_PRICE}/${tPuAmt}`,
            );
        });
        tPuAmt = tPuAmt.toFixed(2);
        tLcAmt = parseFloat(tLcAmt).toFixed(2);

        var sql3 = `
            select
                *
            from
                kcd_user
            where
                user_id = '${tIdReg}'
        `;
        var tRet3 = await prisma.$queryRaw(Prisma.raw(sql3));
        var tUserObj = {
            ...tRet3[0],
        };

        var tCoArray = ['', '', '', '', '', '', '', '', '', '', '', '', ''];

        tCoArray[1] = `[L/C 오픈요청서] ${tDtReg} ${tPuObj.VENDOR_NAME} `;

        var tPayTypeN = 'L/C';
        if (tPuObj.PAY_TYPE_N !== '') tPayTypeN = tPuObj.PAY_TYPE_N;

        console.log(purchaseUserInfo);
        tCoArray[2] = '';
        tCoArray[2] = `${purchaseUserInfo[0].USER_NAME}/?/`;
        tCoArray[2] += `${tPuObj.TRADE_TERM}/?/`;
        tCoArray[2] += `${tPuObj.SHIP_MODE2}/?/`;
        // tCoArray[2] += `${tPuObj.PU_CD}/?/`;
        tCoArray[2] += `${strPuCds}/?/`;
        tCoArray[2] += `+/-${tPuObj.OVERSHORT_RATE}%/?/`;
        tCoArray[2] += `${moment(tPuObj.PAY_DATE2, 'YYYYMMDD').format('YYYY-MM-DD')}/?/`;
        tCoArray[2] += `${tPuObj.BUYER_NAME}/?/`;
        tCoArray[2] += `${tPuObj.CURR_CD2}/?/`;
        // tCoArray[2] += `${tPuObj.SHIP_DATE2 ? moment(tPuObj.SHIP_DATE2, 'YYYYMMDD').format('YYYY-MM-DD') : ''}/?/`;
        tCoArray[2] += `${strShipDates}/?/`;
        tCoArray[2] += `${tPuObj.VENDOR_NAME}/?/`;
        tCoArray[2] += `0/?/`;
        tCoArray[2] += `${tPuObj.LATEST_SHIP_DATE2 ? moment(tPuObj.LATEST_SHIP_DATE2, 'YYYYMMDD').format('YYYY-MM-DD') : ''}/?/`;
        // tCoArray[2] += `${tLcAmt}/?/`;
        tCoArray[2] += `${totalPayAmount}/?/`;
        tCoArray[2] += `${tPuObj.EXPIRY_DATE2 ? moment(tPuObj.EXPIRY_DATE2, 'YYYYMMDD').format('YYYY-MM-DD') : ''}/?/`;
        /*
    tCoArray[2] = `${tPuObj.BUYER_NAME}/?/`;
    tCoArray[2] += `${tType}/?/`;
    tCoArray[2] += `${tPuObj.PAY_DATE}/?/`;
    tCoArray[2] += `${tPuObj.VENDOR_NAME}/?/`;
    tCoArray[2] += `+/-${tPuObj.OVERSHORT_RATE}%/?/`;
    tCoArray[2] += `${tPuObj.DUE_DATE}/?/`;
    tCoArray[2] += `${tPuObj.PU_CD}/?/`;
    tCoArray[2] += `${tPuObj.CURR_CD}/?/`;
    tCoArray[2] += `${tLcAmt}/?/`;
    tCoArray[2] += `${tUserObj.USER_NAME}/?/`;
    tCoArray[2] += `${tPuObj.TRADE_TERM}/?/`;
    tCoArray[2] += `${tLcAmt}/?/`;
    tCoArray[2] += `${tPayTypeN}/?/`;
    tCoArray[2] += `${tPuObj.PAY_DATE}/?/`;
    */

        tCoArray[3] = '';
        tCoArray[3] = `${tBankObj.BANK_NAME}/?/`;
        tCoArray[3] += `${tBankObj.ACCOUNT_NO}/?/`;
        tCoArray[3] += `${tBankObj.ACCOUNT_NAME}/?/`;
        tCoArray[3] += `${tBankObj.SFTCODE}/?/`;
        tCoArray[3] += `${tBankObj.BANK_TYPE1_N}/?/`;

        tCoArray[4] = '';
        tStockMem2.forEach(
            (
                col: {
                    PO_CD: any;
                    MATL_CD: any;
                    MATL_NAME: any;
                    COLOR: any;
                    SPEC: any;
                    LC_QTY: any;
                    UNIT: any;
                    CURR_CD: any;
                    PO_PRICE: any;
                    LC_AMT: any;
                },
                i: number,
            ) => {
                tCoArray[4] += `${col.PO_CD}/?/`;
                tCoArray[4] += `${col.MATL_CD}/?/`;
                tCoArray[4] += `${col.MATL_NAME}/?/`;
                tCoArray[4] += `${col.COLOR}/?/`;
                tCoArray[4] += `${col.SPEC}/?/`;
                tCoArray[4] += `${formatNumber(col.LC_QTY)}/?/`;
                tCoArray[4] += `${col.UNIT}/?/`;
                tCoArray[4] += `${col.CURR_CD}/?/`;
                tCoArray[4] += `${formatNumber(col.PO_PRICE, 2)}/?/`;

                var tLcAmt = parseFloat(col.PO_PRICE) * parseFloat(col.LC_QTY);
                tCoArray[4] += `${formatNumber(tLcAmt, 2)}/?/`;
            },
        );

        tPostObj.C01 = tCoArray[1];
        tPostObj.C02 = tCoArray[2];
        tPostObj.C03 = tCoArray[3];
        tPostObj.C04 = tCoArray[4];

        var tUrl = `http://gw.shints.com/KOR_WEBROOT/SRC/CM/TIMS/INDEX.ASPX?erp_div=OTHER_SIN&cd_company=${tPostObj.CD_COMPANY}&emp_no=${tPostObj.EMP_NO}&appro_key=${tPostObj.APPROKEY}&form_id=92`;

        console.log(JSON.stringify(tPostObj));
        var res_sync = request_sync(
            'POST',
            'http://sts.shints.com:8585/EA/EABizRequest',
            {
                json: tPostObj,
            },
        );
        console.log(res_sync.getBody('utf8'));
        var tResData = JSON.parse(res_sync.getBody('utf8'));
        console.log('ResData =>' + tResData.APPROKEY + ',' + tPuCd);

        let sqlArray = [];

        var sql0 = `
            update ksv_pu_mst2
            set
                gw_key = '${tResData.APPROKEY}',
                deposit_gw_key = '${tResData.APPROKEY}',
                gw_status = '6',
                deposit_gw_status = '6'
            where
                pu_cd in  (${sqlPuCd})
        `;
        sqlArray.push(prisma.$queryRaw(Prisma.raw(sql0)));

        var sql1 = `
            update ksv_pu_lcdeposit
            set
                appro_key = '${tResData.APPROKEY}',
                gw_status = '6'
            where
                pu_cd in (${sqlPuCd})
                and pay_report in  (${sqlPayReport})
        `;
        sqlArray.push(prisma.$queryRaw(Prisma.raw(sql1)));

        global.currentTransactionInfo = {
            contextValue: {
                token: 'GW:SYSTEM:AFROBA:NONE',
            },
            functionName: 'dblib3/gw/gw.ts',
        };
        await prisma.$transaction(sqlArray);
        delete global.currentTransactionInfo;

        res.send({
            status: true,
            message: 'Insert Shipment',
            data: tResData,
        });
    },
);

gw.all(
    '/request_gw_deposit/:pu_cd/:dt_reg/:id_reg/:pay_report',
    async (
        req: {
            params: {
                pu_cd: any;
                dt_reg: any;
                id_reg: any;
            };
            body: {
                pu_cd: string;
            };
        },
        res: {
            send: (arg0: {
                status: boolean;
                message: string;
                data: any;
            }) => void;
        },
    ) => {
        // var tInput = JSON.parse(req.body);
        var tPuCd = req.params.pu_cd;
        var tDtReg = req.params.dt_reg;
        var tIdReg = req.params.id_reg;
        var tPayReport = req.params.pay_report;
        // var tPuCd = req.body.pu_cd;

        var puCdArray = [];
        var puCds = req.body.pu_cd.split('|');
        if (puCds.length <= 0) {
            res.send({
                status: true,
                message: 'GW Error(Check Selected Data)',
                data: {},
            });
            return;
        }
        puCds.forEach((col, i) => {
            var tCols1 = col.split(',');
            if (tCols1.length >= 3) {
                var tObj = {};
                tObj.pu_cd = tCols1[0];
                tObj.pay_report = tCols1[1];
                tObj.pay_amount = tCols1[2];
                puCdArray.push(tObj);
            }
        });
        var sqlPuCd = '';
        var strPuCds = '';
        var sqlPayReport = '';
        var totalPayAmount = 0;
        puCdArray.forEach((col, i) => {
            if (col.pu_cd) {
                if (sqlPuCd === '') {
                    sqlPuCd = `'${col.pu_cd}'`;
                    strPuCds = `${col.pu_cd}`;
                } else  {
                    sqlPuCd += `,'${col.pu_cd}'`;
                    strPuCds += `/${col.pu_cd}`;
                }
            }
            if (col.pay_report) {
                if (sqlPayReport === '') sqlPayReport = `'${col.pay_report}'`;
                else  sqlPayReport += `,'${col.pay_report}'`;
            }
            if (col.pay_amount) totalPayAmount += parseFloat(col.pay_amount);
        });

        var tPostObj = {};

        var sql100 = `
            select
                isnull(emp_no, '') as emp_no
            from
                kcd_user
            where
                user_id = '${tIdReg}'
        `;
        var tRet100 = await prisma.$queryRaw(Prisma.raw(sql100));
        if (tRet100.length <= 0) {
            res.send({
                status: true,
                message: 'GW Error(Check EMP NO)',
                data: {},
            });
            return;
        }
        var tEmpNo = tRet100[0].emp_no;
        if (tEmpNo === '') {
            res.send({
                status: true,
                message: 'GW Error(Check EMP NO)',
                data: {},
            });
            return;
        }

        tPostObj.NM_SUPPLIER = 'SHINTS';
        tPostObj.KEY_CERT = '1111';
        tPostObj.CD_TYPE = 'LD';
        tPostObj.CD_COMPANY = '1000';
        tPostObj.EMP_NO = tEmpNo;
        tPostObj.ID_REG = tIdReg;
        tPostObj.DT_REG = tDtReg;

        var sql0 = `
            select
                a.*,
                b.BUYER_NAME,
                c.VENDOR_NAME,
                c.OVERSHORT_RATE,
                isnull(c.pay_type, '0') as PAY_TYPE,
                isnull(d.CD_NAME, '') as PAY_TYPE_N,
                a1.LATEST_SHIP_DATE as LATEST_SHIP_DATE2,
                a1.SHIP_MODE as SHIP_MODE2,
                a1.EXPIRY_DATE as EXPIRY_DATE2,
                a1.PAY_DATE as PAY_DATE2,
                a1.RATE as DEPOSIT_RATE2,
                a1.AMT as AMT2,
                a1.CURR_CD as CURR_CD2,
                a1.PAY_BANK as PAY_BANK2
            from
                ksv_pu_mst2 a,
                ksv_pu_lcdeposit a1,
                kcd_buyer b,
                kcd_vendor c
                left join kcd_code d on c.pay_type = d.cd_code
                and d.cd_group = 'PAY_TYPE'
            where
                a.pu_cd in (${sqlPuCd})
                and a1.pay_report in (${sqlPayReport})
                and a.pu_cd = a1.pu_cd
                and a.buyer_cd = b.buyer_cd
                and a.vendor_cd = c.vendor_cd
        `;
        var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
        var tPuObj = {
            ...tRet0[0],
        };
        var tType = 'Deposit';

        var sql1 = `
            select
                a.*,
                isnull(b.cd_name, '') as BANK_TYPE1_N
            from
                kcd_bank a
                left join kcd_code b on a.bank_type1 = b.cd_code
                and b.cd_group = 'BANK_TYPE1'
            where
                a.bank_cd = '${tPuObj.PAY_BANK2}'
        `;
        var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
        var tBankObj = {
            ...tRet1[0],
        };
        if (tBankObj.BANK_TYPE1_N === '') {
            if (tPuObj.CURR_CD !== 'KRW') tBankObj.BANK_TYPE1_N = '외화';
            else tBankObj.BANK_TYPE1_N = '원화';
        }

        var sql2 = `
            select
                a.PO_CD,
                a.MATL_CD,
                b.MATL_NAME,
                b.COLOR,
                b.SPEC,
                b.UNIT,
                a.CURR_CD,
                a.PO_PRICE,
                a.PO_QTY2,
                sum(c.LC_QTY) as LC_QTY
            from
                ksv_stock_mem2 a,
                kcd_matl_mst b,
                ksv_stock_in c
            where
                a.matl_cd = b.matl_cd
                and a.pu_cd in (${sqlPuCd})
                and c.pay_report in (${sqlPayReport})
                and a.po_cd = c.po_cd
                and a.matl_cd = c.matl_cd
                and c.lc_qty > 0
                and c.in_qty <= 0
                and c.pay_report <> ''
            group by
                a.PO_CD,
                a.MATL_CD,
                b.MATL_NAME,
                b.COLOR,
                b.SPEC,
                b.UNIT,
                a.CURR_CD,
                a.PO_PRICE,
                a.PO_QTY2
        `;
        var tStockMem2 = await prisma.$queryRaw(Prisma.raw(sql2));
        var tPuAmt = 0;
        var tLcAmt = 0;
        tStockMem2.forEach((col, i) => {
            var tVal = parseFloat(col.PO_QTY2) * parseFloat(col.PO_PRICE);
            tVal = parseFloat(tVal).toFixed(2);
            tPuAmt += parseFloat(tVal);

            tVal = parseFloat(col.LC_QTY) * parseFloat(col.PO_PRICE);
            tVal = parseFloat(tVal).toFixed(2);
            tLcAmt += parseFloat(tVal);
            console.log(
                `${col.MATL_CD}/${col.PO_QTY2}/${col.PO_PRICE}/${tPuAmt}`,
            );
        });
        tPuAmt = tPuAmt.toFixed(2);

        var sql3 = `
            select
                *
            from
                kcd_user
            where
                user_id = '${tIdReg}'
        `;
        var tRet3 = await prisma.$queryRaw(Prisma.raw(sql3));
        var tUserObj = {
            ...tRet3[0],
        };

        var tCoArray = ['', '', '', '', '', '', '', '', '', '', '', '', ''];

        tCoArray[1] = `[Deposit 송금요청서] ${tDtReg} ${tPuObj.VENDOR_NAME}-${tPuCd} `;

        var tPayTypeN = '*';
        if (tPuObj.PAY_TYPE_N !== '') tPayTypeN = tPuObj.PAY_TYPE_N;

        var tDepositAmt = parseFloat(tPuObj.AMT2);
        var tPurchaseAmt = parseFloat(tPuAmt);
        // var tDepositRate = parseInt((tDepositAmt / tPurchaseAmt) * 100.0);
        var tDepositRate = tPuObj.DEPOSIT_RATE2;
        var tBalAmt = tPuAmt;

        tCoArray[2] = `${tPuObj.BUYER_NAME}/?/`;
        tCoArray[2] += `${tType}/?/`;
        tCoArray[2] += `${tPuObj.VENDOR_NAME}/?/`;
        tCoArray[2] += `${tPuObj.CURR_CD2}/?/`;
        // tCoArray[2] += `${tPuObj.PU_CD}/?/`;
        tCoArray[2] += `${strPuCds}/?/`;
        tCoArray[2] += `${formatNumber(tDepositAmt, 2)}/?/`;
        tCoArray[2] += `${formatNumber(tBalAmt, 2)}/?/`;
        tCoArray[2] += `${tUserObj.USER_NAME}/?/`;
        tCoArray[2] += `${tDepositRate}%/?/`;
        tCoArray[2] += `${formatNumber(tPurchaseAmt, 2)}/?/`;
        tCoArray[2] += `${tPayTypeN}/?/`;
        tCoArray[2] += `${moment(tPuObj.PAY_DATE2, 'YYYYMMDD').format('YYYY-MM-DD')}/?/`;

        tCoArray[3] = `${tBankObj.BANK_NAME}/?/`;
        tCoArray[3] += `${tBankObj.ACCOUNT_NO}/?/`;
        tCoArray[3] += `${tBankObj.ACCOUNT_NAME}/?/`;
        tCoArray[3] += `${tBankObj.SFTCODE}/?/`;
        tCoArray[3] += `${tBankObj.BANK_TYPE1_N}/?/`;

        tPostObj.C01 = tCoArray[1];
        tPostObj.C02 = tCoArray[2];
        tPostObj.C03 = tCoArray[3];

        var tUrl = `http://gw.shints.com/KOR_WEBROOT/SRC/CM/TIMS/INDEX.ASPX?erp_div=OTHER_SIN&cd_company=${tPostObj.CD_COMPANY}&emp_no=${tPostObj.EMP_NO}&appro_key=${tPostObj.APPROKEY}&form_id=92`;

        console.log(JSON.stringify(tPostObj));
        var res_sync = request_sync(
            'POST',
            'http://sts.shints.com:8585/EA/EABizRequest',
            {
                json: tPostObj,
            },
        );
        console.log(res_sync.getBody('utf8'));
        var tResData = JSON.parse(res_sync.getBody('utf8'));
        console.log('ResData =>' + tResData.APPROKEY + ',' + tPuCd);

        let sqlArray = [];
        var sql0 = `
            update ksv_pu_mst2
            set
                gw_key = '${tResData.APPROKEY}',
                deposit_gw_key = '${tResData.APPROKEY}',
                gw_status = '6',
                deposit_gw_status = '6'
            where
                pu_cd in (${sqlPuCd})
        `;
        sqlArray.push(prisma.$queryRaw(Prisma.raw(sql0)));

        var sql1 = `
            update ksv_pu_lcdeposit
            set
                appro_key = '${tResData.APPROKEY}',
                gw_status = '6'
            where
                pu_cd in (${sqlPuCd})
                and pay_report in (${sqlPayReport})
        `;
        sqlArray.push(prisma.$queryRaw(Prisma.raw(sql1)));

        global.currentTransactionInfo = {
            contextValue: {
                token: 'GW:SYSTEM:AFROBA:NONE',
            },
            functionName: 'dblib3/gw/gw.ts',
        };
        await prisma.$transaction(sqlArray);
        delete global.currentTransactionInfo;

        res.send({
            status: true,
            message: 'Insert Shipment',
            data: tResData,
        });
    },
);

gw.all(
    '/request_gw_taxbill/:op_kind/:dt_reg/:id_reg',
    async (req: any, res: any) => {
        // var tInput = JSON.parse(req.body);
        var tOpKind: string = req['params']['op_kind'];
        var tDtReg: string = req['params']['dt_reg'];
        var tIdReg: string = req['params']['id_reg'];

        var tData0: string = req['body']['data0'];
        var tData1: string = req['body']['data1'];
        var tData2: string = req['body']['data2'];
        var tData3: string = req['body']['data3'];

        var tBillCds: string[] = tData3.split(':');
        console.log(tData3);
        console.log(tBillCds);

        var sql100 = `
            select
                isnull(emp_no, '') as emp_no,
                isnull(company_code, '') as company_code
            from
                kcd_user
            where
                user_id = '${tIdReg}'
        `;
        var tRet100 = await prisma.$queryRaw(Prisma.raw(sql100));
        if (tRet100.length <= 0) {
            res.send({
                status: true,
                message: 'GW Error(Check EMP NO)',
                data: {},
            });
            return;
        }
        var tEmpNo = tRet100[0].emp_no;
        var tCompanyCode = tRet100[0].company_code;
        if (tEmpNo === '') {
            res.send({
                status: true,
                message: 'GW Error(Check EMP NO)',
                data: {},
            });
            return;
        }

        var tPostObj = {};
        tPostObj.NM_SUPPLIER = 'SHINTS';
        tPostObj.KEY_CERT = '1111';
        tPostObj.CD_TYPE = tOpKind;

        if (tCompanyCode === 'nsr') tPostObj.CD_COMPANY = '1000';
        else tPostObj.CD_COMPANY = '1000';

        tPostObj.EMP_NO = tEmpNo;
        tPostObj.ID_REG = tIdReg;
        tPostObj.DT_REG = tDtReg;

        /*
      var sql0 = `
          select
              a.*,
              b.cd_name as BANK_TYPE1_N
          from
              kcd_bank a,
              kcd_code b
          where
              a.bank_cd = '${tBankCd}'
              and a.bank_type1 = b.cd_code
              and b.cd_group = 'BANK_TYPE1'
      `;
      var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
      var tInData2 = { ...tRet0[0] };
    */

        var tCoArray = ['', '', '', '', '', '', '', '', '', '', '', '', ''];

        tCoArray[1] = tData0;
        tCoArray[2] = tData1;
        tCoArray[3] = tData2;

        tPostObj.C01 = tCoArray[1];
        tPostObj.C02 = tCoArray[2];
        tPostObj.C03 = tCoArray[3];
        tPostObj.C04 = tCoArray[4];
        tPostObj.C05 = tCoArray[5];
        tPostObj.C06 = tCoArray[6];
        tPostObj.C07 = tCoArray[7];
        tPostObj.C08 = tCoArray[8];
        tPostObj.C09 = tCoArray[9];
        tPostObj.C010 = tCoArray[10];
        tPostObj.C011 = tCoArray[11];
        tPostObj.C012 = tCoArray[12];

        var tUrl = `http://gw.shints.com/KOR_WEBROOT/SRC/CM/TIMS/INDEX.ASPX?erp_div=OTHER_SIN&cd_company=${tPostObj.CD_COMPANY}&emp_no=${tPostObj.EMP_NO}&appro_key=${tPostObj.APPROKEY}&form_id=92`;

        console.log(JSON.stringify(tPostObj));
        var res_sync = request_sync(
            'POST',
            'http://sts.shints.com:8585/EA/EABizRequest',
            {
                json: tPostObj,
            },
        );
        console.log(res_sync.getBody('utf8'));
        var tResData = JSON.parse(res_sync.getBody('utf8'));
        console.log('ResData =>' + tResData.APPROKEY);

        var tSQL = '';
        tBillCds.forEach((col, i) => {
            if (col !== '') {
                if (i === 0) tSQL += `'${col}'`;
                else tSQL += `,'${col}'`;
            }
        });

        /*
    var sql0 = `
        update kcd_gw_taxbill_kr
        set
            approkey = '${tResData.APPROKEY}',
            status_cd = '6'
        where
            bill_cd in (${tSQL})
    `;
    var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));

    var sql1 = `
        update ksv_bill_mst
        set
            appro_key = '${tResData.APPROKEY}',
            gw_status = '6'
        where
            bill_cd in (${tSQL})
    `;
    var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
    */

        res.send({
            status: true,
            message: 'GW Taxbill',
            data: tResData,
        });
    },
);

gw.all(
    '/request_gw_credit/:op_kind/:dt_reg/:crdb_cd/:user_id',
    async (req: any, res: any) => {
        // var tInput = JSON.parse(req.body);
        var tOpKind: string = req['params']['op_kind'];
        var tDtReg: string = req['params']['dt_reg'];
        var tCRDB_CD: string = req['params']['crdb_cd'];
        var tUSER_ID: string = req['params']['user_id'];

        var tTitle: string = req['body']['title'];
        var tInfos: string[] = req['body']['info'];

        var sql100 = `
            select
                isnull(emp_no, '') as emp_no
            from
                kcd_user
            where
                user_id = '${tUSER_ID}'
        `;
        var tRet100 = await prisma.$queryRaw(Prisma.raw(sql100));
        if (tRet100.length <= 0) {
            res.send({
                status: true,
                message: 'GW Error(Check EMP NO)',
                data: {},
            });
            return;
        }
        var tEmpNo = tRet100[0].emp_no;
        if (tEmpNo === '') {
            res.send({
                status: true,
                message: 'GW Error(Check EMP NO)',
                data: {},
            });
            return;
        }

        var tPostObj = {};
        tPostObj.NM_SUPPLIER = 'SHINTS';
        tPostObj.KEY_CERT = '1111';
        tPostObj.CD_TYPE = tOpKind;
        tPostObj.CD_COMPANY = '1000';
        tPostObj.EMP_NO = tEmpNo;
        tPostObj.ID_REG = tUSER_ID;
        tPostObj.DT_REG = tDtReg.substring(0, 8);

        var tCoArray = ['', '', '', '', '', '', '', '', '', '', '', '', ''];

        var sqlCrDb = '';
        var crdbArray  = [];
        var tIdx = 0;
        console.log(tInfos); 
        for (tIdx = 0; tIdx < tInfos.length; tIdx++) {
            if (tIdx === 10) break;
            var tInfo = tInfos[tIdx];
            if (tInfo) {
                tCoArray[tIdx+2] = tInfo; 
                var tCols = tInfo.split('/');
                if (tCols[0]) {
                    if (sqlCrDb === '') sqlCrDb = `'${tCols[0]}'`;
                    else  sqlCrDb += `,'${tCols[0]}'`;
                    crdbArray.push(tCols[0]);
                }
            }
        }

        tPostObj.C01 = tTitle;
        tPostObj.C02 = tCoArray[2];
        tPostObj.C03 = tCoArray[3];
        tPostObj.C04 = tCoArray[4];
        tPostObj.C05 = tCoArray[5];
        tPostObj.C06 = tCoArray[6];
        tPostObj.C07 = tCoArray[7];
        tPostObj.C08 = tCoArray[8];
        tPostObj.C09 = tCoArray[9];
        tPostObj.C010 = tCoArray[10];
        tPostObj.C011 = tCoArray[11];
        tPostObj.C012 = tCoArray[12];

        var tUrl = `http://gw.shints.com/KOR_WEBROOT/SRC/CM/TIMS/INDEX.ASPX?erp_div=OTHER_SIN&cd_company=${tPostObj.CD_COMPANY}&emp_no=${tPostObj.EMP_NO}&appro_key=${tPostObj.APPROKEY}&form_id=92`;

        console.log(JSON.stringify(tPostObj));
        var res_sync = request_sync(
            'POST',
            'http://sts.shints.com:8585/EA/EABizRequest',
            {
                json: tPostObj,
            },
        );
        console.log(res_sync.getBody('utf8'));
        var tResData = JSON.parse(res_sync.getBody('utf8'));
        console.log('ResData =>' + tResData.APPROKEY);

        var tIdx2 = 0;
        let sqlArray = [];
        for (tIdx2 = 0 ; tIdx2 < crdbArray.length; tIdx2++) {

            var tCRDB_CD = crdbArray[tIdx2];

            var sql0 = `
                select
                    *
                from
                    kcd_gwcode
                where
                    doc_no =  '${tCRDB_CD}'
            `;
            var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));


            if (tRet0.length > 0) {
                var sql1 = `
                    update kcd_gwcode
                    set
                        approkey = '${tResData.APPROKEY}'
                    where
                        doc_no = '${tCRDB_CD}'
                `;
                sqlArray.push(prisma.$queryRaw(Prisma.raw(sql1)));
            } else {
                var sql1 = `
                    insert into
                        kcd_gwcode (
                            approkey,
                            doc_no,
                            status_cd,
                            reg_user,
                            reg_datetime,
                            year
                        )
                    values
                        (
                            '${tResData.APPROKEY}',
                            '${tCRDB_CD}',
                            '6',
                            '${tUSER_ID}',
                            '${tDtReg}',
                            '${tDtReg.substring(0, 4)}'
                        )
                `;
                sqlArray.push(prisma.$queryRaw(Prisma.raw(sql1)));
            }
        }

        global.currentTransactionInfo = {
            contextValue: {
                token: 'GW:SYSTEM:AFROBA:NONE',
            },
            functionName: 'dblib3/gw/gw.ts',
        };
        await prisma.$transaction(sqlArray);
        delete global.currentTransactionInfo;

        res.send({
            status: true,
            message: 'GW Credit Note',
            data: tResData,
        });
    },
);

module.exports = gw;
