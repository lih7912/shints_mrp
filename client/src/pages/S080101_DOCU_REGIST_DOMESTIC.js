/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import classNames from "classnames";
import { AFDataTable } from "../components/AFDataTable";
import { AFColumn } from "../components/AFColumn";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import { FileUpload } from "primereact/fileupload";
import { Rating } from "primereact/rating";
import { Toolbar } from "primereact/toolbar";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { InputNumber } from "primereact/inputnumber";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";
import { Divider } from "primereact/divider";
import { Splitter, SplitterPanel } from "primereact/splitter";
import { ScrollPanel } from "primereact/scrollpanel";
import { TabView, TabPanel } from "primereact/tabview";

import { ServiceLib } from "../service/service_lib/ServiceLib";
import { ServiceS080101_DOCU_REGIST_DOMESTIC } from "../service/service_biz/ServiceS080101_DOCU_REGIST_DOMESTIC";
import { ServiceS0801_DOCU_REGIST_DOMESTIC } from "../service/service_biz/ServiceS0801_DOCU_REGIST_DOMESTIC";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyEDT_KSV_CRDB_MST = {
    CRDB_CD: "",
    PART_AMT: "",
    REST_AMT: "",
    PART_DATE: "",
};

const emptyQRY_KSV_CRDB_MST = {
    CRDB_CD: "",
    VENDOR_CD: "",
    CURR_CD: "",
    BUYER_CD: "",
};

const emptyTBL_KSV_CRDB_MST = {
    id: 0,
    END_DATE: "",
    VENDOR_NAME: "",
    END_AMT: "",
    DC: "",
    DN: "",
    CURR_RATE: "",
    SUPPLIED_VALUE: "",
    VAL: "",
    PAY_AMT: "",
    CURR_CD: "",
    KRW_AMT: "",
    GW: "",
    TAX_BILL: "",
    TT_FLAG: "",
    PAY_DATE: "",
    TAXBILL_DATE: "",
    CALC_FLAG: "",
    PUR_APP: "",
    WARE_NAME: "",
    REMARK: "",
    PAY_REPORT: "",
    PAY_PRICE: "",
    VENDOR_CD: "",
    PAY_TERM: "",
    CALC_FLAG: "",
    CRCB_CD: "",
    WARE_CD: "",
};

const emptyTBL_KSV_CRDB_MST2 = {
    id: 0,
    END_DATE: "",
    VENDOR_NAME: "",
    END_AMT: "",
    DC: "",
    DN: "",
    CURR_RATE: "",
    SUPPLIED_VALUE: "",
    VAL: "",
    PAY_AMT: "",
    CURR_CD: "",
    KRW_AMT: "",
    GW: "",
    TAX_BILL: "",
    TT_FLAG: "",
    PAY_DATE: "",
    TAXBILL_DATE: "",
    CALC_FLAG: "",
    PUR_APP: "",
    WARE_NAME: "",
    REMARK: "",
    PAY_REPORT: "",
    PAY_PRICE: "",
    VENDOR_CD: "",
    PAY_TERM: "",
    CALC_FLAG: "",
    CRCB_CD: "",
    WARE_CD: "",
};

const emptyQRY_KSV_ORDER_SHIP = {
    S_SHIP_DATE: "",
    E_SHIP_DATE: "",
    BUYER_CD: "",
    INVOICE_NO: "",
    PO_CD: "",
    ORDER_CD: "",
};

const emptyQRY_KSV_ORDER_SHIP1 = {
    ORDER_CD: "",
};

const emptyEDT_KSV_ORDER_SHIP = {
    REG_DATE: "",
    ORDER_USER_ID: "",
    BILL_DATE: "",
    BUYER_EMAIL: "",
};

const blankFn = () => {
};

const S080101_DOCU_REGIST_DOMESTIC = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS080101_DOCU_REGIST_DOMESTIC =
        new ServiceS080101_DOCU_REGIST_DOMESTIC();
    const serviceS0801_DOCU_REGIST_DOMESTIC =
        new ServiceS0801_DOCU_REGIST_DOMESTIC();

    const toast = useRef(null);
    const [widthVal, setWidthVal] = useState({ width: "90rem" });

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const [urlIframe, setUrlIframe] = useState("");

    // Debit Apply
    // Apply Debit 화면 관련
    const [dataEDT_KSV_CRDB_MST, setDataEDT_KSV_CRDB_MST] = useState(
        emptyEDT_KSV_CRDB_MST,
    );

    const onInputChangeEDT_KSV_CRDB_MST_CRDB_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_CRDB_MST = { ...dataEDT_KSV_CRDB_MST };

        let tTypeVal = _dataEDT_KSV_CRDB_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_CRDB_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_CRDB_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_CRDB_MST(_dataEDT_KSV_CRDB_MST);
    };

    const onInputChangeEDT_KSV_CRDB_MST_PART_AMT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_CRDB_MST = { ...dataEDT_KSV_CRDB_MST };

        let tTypeVal = _dataEDT_KSV_CRDB_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_CRDB_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_CRDB_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_CRDB_MST(_dataEDT_KSV_CRDB_MST);
    };

    const onInputChangeEDT_KSV_CRDB_MST_REST_AMT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_CRDB_MST = { ...dataEDT_KSV_CRDB_MST };

        let tTypeVal = _dataEDT_KSV_CRDB_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_CRDB_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_CRDB_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_CRDB_MST(_dataEDT_KSV_CRDB_MST);
    };

    const onCalChangeEDT_KSV_CRDB_MST_PART_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_CRDB_MST = { ...dataEDT_KSV_CRDB_MST };
        _dataEDT_KSV_CRDB_MST[`${name}`] = val;
        setDataEDT_KSV_CRDB_MST(_dataEDT_KSV_CRDB_MST);
    };

    /* QRY KSV_CRDB_MST */
    const [dataQRY_KSV_CRDB_MST, setDataQRY_KSV_CRDB_MST] = useState(
        emptyQRY_KSV_CRDB_MST,
    );

    const onInputChangeQRY_KSV_CRDB_MST_CRDB_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_CRDB_MST = { ...dataQRY_KSV_CRDB_MST };

        let tTypeVal = _dataQRY_KSV_CRDB_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_CRDB_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_CRDB_MST[`${name}`] = parseInt(val);

        setDataQRY_KSV_CRDB_MST(_dataQRY_KSV_CRDB_MST);
    };

    const onInputChangeQRY_KSV_CRDB_MST_BUYER_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_CRDB_MST = { ...dataQRY_KSV_CRDB_MST };

        let tTypeVal = _dataQRY_KSV_CRDB_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_CRDB_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_CRDB_MST[`${name}`] = parseInt(val);

        setDataQRY_KSV_CRDB_MST(_dataQRY_KSV_CRDB_MST);
    };


    const onInputChangeQRY_KSV_CRDB_MST_VENDOR_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_CRDB_MST = { ...dataQRY_KSV_CRDB_MST };

        let tTypeVal = _dataQRY_KSV_CRDB_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_CRDB_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_CRDB_MST[`${name}`] = parseInt(val);

        setDataQRY_KSV_CRDB_MST(_dataQRY_KSV_CRDB_MST);
    };

    const onInputChangeQRY_KSV_CRDB_MST_CURR_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_CRDB_MST = { ...dataQRY_KSV_CRDB_MST };

        let tTypeVal = _dataQRY_KSV_CRDB_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_CRDB_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_CRDB_MST[`${name}`] = parseInt(val);

        setDataQRY_KSV_CRDB_MST(_dataQRY_KSV_CRDB_MST);
    };

    // TBL_KSV_CRDB_MST
    const [datasTBL_KSV_CRDB_MST, setDatasTBL_KSV_CRDB_MST] = useState([]);
    const dt_TBL_KSV_CRDB_MST = useRef(null);
    const [dataTBL_KSV_CRDB_MST, setDataTBL_KSV_CRDB_MST] = useState(
        emptyTBL_KSV_CRDB_MST,
    );
    const [selectedTBL_KSV_CRDB_MST, setSelectedTBL_KSV_CRDB_MST] = useState(
        [],
    );
    const [flagSelectModeTBL_KSV_CRDB_MST, setFlagSelectModeTBL_KSV_CRDB_MST] =
        useState(false);

    const [loadingTBL_KSV_CRDB_MST, setLoadingTBL_KSV_CRDB_MST] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_CRDB_MST

    const onRowClick1TBL_KSV_CRDB_MST = (argData0) => {
        var argData = {};
        if (typeof argData0.length !== "undefined") {
            if (argData0.length <= 0) return;
            argData = argData0[0];
        } else {
            argData = argData0;
        }
        let argTBL_KSV_CRDB_MST = argData;

        setDataTBL_KSV_CRDB_MST(argTBL_KSV_CRDB_MST);

        setDatasTBL_KSV_CRDB_MST2([]);
        search_LIST_4_1(argData);
    };

    const onRowClickTBL_KSV_CRDB_MST = (event) => {
        let argTBL_KSV_CRDB_MST = event.data;
        if (flagSelectModeTBL_KSV_CRDB_MST) return;
    };

    // KSV_CRDB_MST2
    const [datasTBL_KSV_CRDB_MST2, setDatasTBL_KSV_CRDB_MST2] = useState([]);
    const dt_TBL_KSV_CRDB_MST2 = useRef(null);
    const [dataTBL_KSV_CRDB_MST2, setDataTBL_KSV_CRDB_MST2] = useState(
        emptyTBL_KSV_CRDB_MST2,
    );
    const [selectedTBL_KSV_CRDB_MST2, setSelectedTBL_KSV_CRDB_MST2] = useState(
        [],
    );
    const [
        flagSelectModeTBL_KSV_CRDB_MST2,
        setFlagSelectModeTBL_KSV_CRDB_MST2,
    ] = useState(false);
    const [loadingTBL_KSV_CRDB_MST2, setLoadingTBL_KSV_CRDB_MST2] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_CRDB_MST2

    const onRowClick1TBL_KSV_CRDB_MST2 = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            if (argData0.length < 0) return;
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_CRDB_MST2 = argData;

        setDataTBL_KSV_CRDB_MST2(argTBL_KSV_CRDB_MST2);
    };

    const onRowClickTBL_KSV_CRDB_MST2 = (event) => {
        let argTBL_KSV_CRDB_MST2 = event.data;
        if (flagSelectModeTBL_KSV_CRDB_MST2) return;
    };

    // Dialog
    const [createDialog, setCreateDialog] = useState(false);
    const hideDialog = () => {
        setCreateDialog(false);
    };

    const popup_UPDATE_DN = () => {
        search_LIST_4();
        setCreateDialog(true);
    };

    const search_UPDATE_DN = () => {
        var tQryObj = { ...dataQRY_KSV_CRDB_MST };
        search_LIST_4(tQryObj);
    };

    const process_UPDATE_DN = () => {
        var tInObj1 = { ...dataEDT_KSV_CRDB_MST };
        var tInObj2 = { ...selectedTBL_KSV_CRDB_MST[0] };

        var tArray0 = [...selectedTBL_KSV_ORDER_SHIP];
        var tArray1 = [...datasTBL_KSV_ORDER_SHIP1];
        var tInput1 = { ...datasTBL_KSV_ORDER_SHIP1[0] };
        var tArray = [];

        var tInObj = {};
        tInObj.INVOICE_NO = tInObj2.CRDB_CD;
        tInObj.BUYER_CD = tInput1.BUYER_CD;
        tInObj.INVOICE_DATE = tInObj2.CRDB_DATE;
        tInObj.ORDER_CD = "DEBIT";
        tInObj.NAT_CD = "kr";
        tInObj.CURR_CD = tInObj2.CURR_CD;
        tInObj.SHIP_QTY = "1";
        tInObj.SELL_QTY = "1";
        tInObj.SALES_PRICE = tInObj1.PART_AMT;
        tInObj.RATEBASE = "1";
        tInObj.DUE_DATE = tInObj2.CRDB_DATE;
        tInObj.PRODUCT_TYPE = "";
        tInObj.DEBIT = tInObj1.PART_AMT;
        tInObj.DEBIT_INFO = `${tInObj2.CRDB_CD}`;
        tInObj.CREDIT = "0";

        var tChk = 0;
        datasTBL_KSV_ORDER_SHIP1.forEach((col, i) => {
            if (col.INVOICE_NO === tInObj2.CRDB_CD) tChk = 1;
        });
        if (tChk === 1) {
            alert (`이미 등록된 Debit/Credit 입니다 `);
            return;
        }

        tInObj.KRW_SHIP_AMOUNT = tInObj1.PART_AMT;
        var tTaxAmt = parseFloat(tInObj1.PART_AMT) * 0.1;
        tTaxAmt = tTaxAmt.toFixed(0);
        var tTotAmt = parseFloat(tInObj1.PART_AMT) + parseFloat(tTaxAmt);
        tTotAmt = tTotAmt.toFixed(0);

        tInObj.KRW_TAX_AMOUNT = tTaxAmt;
        tInObj.KRW_TOT_AMOUNT = tTotAmt;

        var retArray = [...datasTBL_KSV_ORDER_SHIP1];
        tInObj.id = retArray.length + 1;
        retArray.push(tInObj);

        setDatasTBL_KSV_ORDER_SHIP1(retArray);
        setCreateDialog(false);
    };

    const process_DELETE_DN = () => {
        var tArray0 = [...selectedTBL_KSV_STOCK_IN];
        var tArray = [];

        // tArray: BILL_CD, PAY_DATE, VENDOR_CD, CURR_CD
        var tEdtObj = { ...dataEDT_KSV_STOCK_MEM };
        var tObj0 = {};
        tObj0.BILL_CD = tEdtObj.BILL_CD;
        tObj0.PAY_DATE = tEdtObj.PAY_DATE;
        tObj0.VENDOR_CD = tEdtObj.VENDOR_CD;
        tObj0.CURR_CD = tEdtObj.CURR_CD;
        tArray.push(tObj0);

        var tInObj1 = { ...dataEDT_KSV_CRDB_MST };

        var tInObj2 = { ...selectedTBL_KSV_CRDB_MST[0] };
        delete tInObj2.id;
        delete tInObj2.__typename;

        serviceS0423_TAXBILL
            .mgrInsert_DELETE_DN(tArray, tInObj1, tInObj2)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                            data.length,
                    );
                    if (data.length > 0)
                        toast.current.show({
                            severity: "success",
                            summary: "SUCCEED: Taxbill",
                            detail: data[0].CODE,
                            life: 3000,
                        });
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                    toast.current.show({
                        severity: "success",
                        summary: "FAILED: Taxbill",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };

    const search_LIST_4 = (argData) => {
        // if (selectedTBL_KSV_ORDER_SHIP1.length <= 0) return;
        // tArray: BILL_CD, PAY_DATE, VENDOR_CD, CURR_CD

        var tObj0 = {};
        if (argData && argData.BUYER_CD) {
            ;
        } else {
            if (displayDatasTBL_KSV_ORDER_SHIP1.length <= 0) return;
            displayDatasTBL_KSV_ORDER_SHIP1.forEach((col, i) => {
                if (col.ORDER_CD) tObj0 = { ...col };
            });
            if (!tObj0.ORDER_CD) return;
        }

        var tObj = {};
        if (argData && argData.BUYER_CD) {
            tObj0 = { ...argData };
            tObj.CRDB_CD = "";
            tObj.VENDOR_CD = tObj0.BUYER_CD;
            tObj.CURR_CD = tObj0.CURR_CD;
        } else {
            tObj.CRDB_CD = "";
            tObj.VENDOR_CD = tObj0.ORDER_CD.substring(0,2);
            tObj.CURR_CD = tObj0.CURR_CD;
        }


        setDatasTBL_KSV_CRDB_MST([]);
        setSelectedTBL_KSV_CRDB_MST([]);
        setDatasTBL_KSV_CRDB_MST2([]);

        // 4
        serviceS080101_DOCU_REGIST_DOMESTIC
            .mgrQuery_LIST_4(tObj)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                            data.length,
                    );
                    var tArray = data.map((col, i) => {
                        var tObj = { ...col };
                        tObj.id = i + 1;
                        return tObj;
                    });
                    setDatasTBL_KSV_CRDB_MST(tArray);
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const search_LIST_4_1 = (argData) => {
        var tObj = {};
        tObj.CRDB_CD = argData.CRDB_CD;
        tObj.VENDOR_CD = argData.MEESER_CD;
        tObj.CURR_CD = argData.CURR_CD;

        setDatasTBL_KSV_CRDB_MST2([]);
        setSelectedTBL_KSV_CRDB_MST2([]);

        // 4_1
        serviceS080101_DOCU_REGIST_DOMESTIC
            .mgrQuery_LIST_4_1(tObj)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                            data.length,
                    );
                    var tMemAmt = 0;
                    var tArray = data.map((col, i) => {
                        var tObj = { ...col };
                        tObj.id = i + 1;
                        tMemAmt += parseFloat(tObj.CRDB_AMT);
                        return tObj;
                    });
                    setDatasTBL_KSV_CRDB_MST2(tArray);
                    var tRestAmt = parseFloat(argData.CRDB_AMT) - tMemAmt;

                    var tObj2 = { ...dataEDT_KSV_CRDB_MST };
                    tObj2.CRDB_CD = argData.CRDB_CD;
                    tObj2.PART_AMT = String(tRestAmt);
                    tObj2.REST_AMT = tObj2.PART_AMT;
                    setDataEDT_KSV_CRDB_MST(tObj2);
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };
    // Apply Debit 화면 관련  -End

    //
    const [dataETC_TAX_CD, setDataETC_TAX_CD] = useState("");
    const search_LIST_TAX_CD = (argData) => {
        setDatasTBL_KSV_ORDER_SHIP1([]);
        setSelectedTBL_KSV_ORDER_SHIP1([]);

        var tObj = {};
        tObj.TAX_CD = argData.TAX_CD;

        // 3
        setLoadingTBL_KSV_ORDER_SHIP1(true);
        serviceS080101_DOCU_REGIST_DOMESTIC
            .mgrQuery_LIST_2(tObj)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_SHIP1(false);
                if (typeof data.graphQLErrors === "undefined") {
                    var tArray = [];
                    var tIdx = 0;
                    var tSeq = 0;
                    var tTaxOption = "FREE";
                    data.TAX_MEM.forEach((col, i) => {
                        var tOne = {};
                        tOne.id = i + 1;
                        tOne.DUE_DATE = col.DUE_DATE;
                        tOne.INVOICE_NO = col.INVOICE_NO;
                        tOne.PO_CD = col.PO_CD;
                        tOne.NAT_CD = col.NAT_CD;
                        tOne.SHIP_QTY = col.TOT_QTY;
                        tOne.ORDER_CD = col.ORDER_CD;
                        tOne.BUYER_CD = col.ORDER_CD.substring(0, 2);
                        tOne.STYLE_NAME = col.STYLE_NAME;
                        tOne.BAL_QTY = col.BAL_QTY;
                        tOne.SELL_QTY = col.PAY_QTY;
                        tOne.CURR_CD = col.CURR_CD;
                        tOne.SHIP_PRICE = col.PAY_PRICE;
                        tOne.SALES_PRICE = col.PAY_PRICE;
                        tOne.KRW_SHIP_AMOUNT = col.KRW_AMT;
                        tOne.KRW_TAX_AMOUNT = col.VAT_AMT;
                        tOne.KRW_TOT_AMOUNT = col.TOT_AMT;
                        tOne.RATEBASE = col.RATEBASE;
                        if (parseFloat(col.VAT_AMT) > 0) tTaxOption = "TAX";
                        tArray.push(tOne);
                    });
                    setDatasTBL_KSV_ORDER_SHIP1(tArray);

                    setTaxOption(tTaxOption);

                    var tEdt = { ...dataEDT_KSV_ORDER_SHIP };
                    tEdt.REG_DATE = data.TAX_MST[0].REG_DATETIME.substring(
                        0,
                        8,
                    );
                    tEdt.ORDER_USER_ID = data.TAX_MST[0].BILL_USER;
                    tEdt.BILL_DATE = data.TAX_MST[0].BILL_DATE;
                    tEdt.BUYER_EMAIL = data.TAX_MST[0].BUYER_EMAIL;
                    setDataEDT_KSV_ORDER_SHIP(tEdt);
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    //
    const process_RESET = () => {
        setDatasTBL_KSV_ORDER_SHIP([]);
        setSelectedTBL_KSV_ORDER_SHIP([]);

        var tObj1 = { ...emptyQRY_KSV_ORDER_SHIP };
        tObj1.S_SHIP_DATE = moment().subtract(2, "months").format("YYYYMMDD");
        tObj1.E_SHIP_DATE = moment().format("YYYYMMDD");
        setDataQRY_KSV_ORDER_SHIP(tObj1);
    };

    const process_RESET_EDT = () => {
        setDatasTBL_KSV_ORDER_SHIP1([]);
        setSelectedTBL_KSV_ORDER_SHIP1([]);
        setDataETC_TAX_CD("");

        var tRetDate = serviceLib.getCurrDate().substring(0, 8);
        var tUserInfo = serviceLib.getUserInfo();
        var tObj0 = { ...emptyEDT_KSV_ORDER_SHIP };
        tObj0.ORDER_USER_ID = tUserInfo.USER_ID;
        tObj0.REG_DATE = tRetDate;
        setDataEDT_KSV_ORDER_SHIP(tObj0);
    };

    const process_ADD = () => {
        var tArray0 = [...selectedTBL_KSV_ORDER_SHIP];
        var tArray1 = [...datasTBL_KSV_ORDER_SHIP1];
        var tArray = [];

        var retArray = [];
        datasTBL_KSV_ORDER_SHIP.forEach((col, i) => {
            var tIdx = 0;
            var tFlag = 0;
            for (tIdx = 0; tIdx < tArray0.length; tIdx++) {
                var tOne = tArray0[tIdx];
                if (tOne.id === col.id) {
                    tFlag = 1;
                    break;
                }
            }
            if (tFlag === 0) retArray.push(col);
        });

        var retArray1 = [...datasTBL_KSV_ORDER_SHIP1];
        selectedTBL_KSV_ORDER_SHIP.forEach((col0, i) => {
            var col = { ...col0 };
            var tRetDate = serviceLib.getCurrDate().substring(0, 8);
            // col.DUE_DATE = tRetDate;
            col.DUE_DATE = col.DUE_DATE;

            var tSellQty = parseFloat(col.SELL_QTY);
            if (isNaN(tSellQty)) tSellQty = parseFloat(col.SHIP_QTY);
            if (isNaN(tSellQty)) tSellQty = 0;

            var tShipAmt = parseFloat(col.KRW_SHIP_AMOUNT);
            if (isNaN(tShipAmt)) tShipAmt = parseFloat(col.INVOICE_SHIP_AMOUNT);
            if (isNaN(tShipAmt)) tShipAmt = 0;

            var tTaxAmt = parseFloat(col.KRW_TAX_AMOUNT);
            if (isNaN(tTaxAmt)) {
                tTaxAmt =
                    taxOption === "TAX"
                        ? serviceLib.getFloat(tShipAmt * 0.1, 0)
                        : 0;
            }

            var tTotAmt = parseFloat(col.KRW_TOT_AMOUNT);
            if (isNaN(tTotAmt)) tTotAmt = tShipAmt + tTaxAmt;

            col.SELL_QTY = String(tSellQty);
            col.KRW_SHIP_AMOUNT = String(tShipAmt);
            col.KRW_TAX_AMOUNT = String(tTaxAmt);
            col.KRW_TOT_AMOUNT = String(tTotAmt);
            col.DEBIT = String(0);
            col.CREDIT = String(0);
            col.DEBIT_INFO = "";
            retArray1.push(col);
        });

        var tCheckCurr = 0;
        var tSaveCurr = "";
        retArray1.forEach((col, i) => {
            var tObj = { ...col };
            if (i !== 0 && tSaveCurr !== col.CURR_CD) {
                tCheckCurr = 1;
            }
            tSaveCurr = col.CURR_CD;
        });

        if (tCheckCurr === 1) {
            alert("동일한 Curr Cd만 작업가능합니다<br><br>Only the same Curr Cd can be worked on.");
            return;
        }

        setDataEDT_KSV_ORDER_SHIP({
            ...dataEDT_KSV_ORDER_SHIP,
            BUYER_EMAIL: dataEDT_KSV_ORDER_SHIP.BUYER_EMAIL,
        });
        setSelectedTBL_KSV_ORDER_SHIP([]);
        setDatasTBL_KSV_ORDER_SHIP(retArray);
        setDatasTBL_KSV_ORDER_SHIP1(retArray1);
    };

    const process_REMOVE = () => {
        if (selectedTBL_KSV_ORDER_SHIP1.length <= 0) return;

        var tSelObj = { ...selectedTBL_KSV_ORDER_SHIP1[0] };
        var tArray1 = [...datasTBL_KSV_ORDER_SHIP];

        var retArray1 = [];
        datasTBL_KSV_ORDER_SHIP1.forEach((col, i) => {
            var tObj = { ...col };
            var tIdx = 0;
            var tFlag = 0;
            if (
                tSelObj.INVOICE_NO === col.INVOICE_NO &&
                tSelObj.PO_CD === col.PO_CD &&
                tSelObj.ORDER_CD === col.ORDER_CD
            ) {
                tFlag = 1;
            } else {
                retArray1.push(tObj);
            }
        });

        var retArray = [];
        var tCheck = 0;
        datasTBL_KSV_ORDER_SHIP.forEach((col, i) => {
            var tObj = { ...col };
            var tIdx = 0;
            var tFlag = 0;
            if (
                tCheck === 0 &&
                parseInt(tSelObj.SHIP_DATE) < parseInt(col.SHIP_DATE)
            ) {
                tSelObj.DUE_DATE = "";
                tSelObj.id = i + 1;
                retArray.push(tSelObj);
                tCheck = 1;
            } else {
                tObj.id = i + 1;
                retArray.push(tObj);
            }
        });

        setSelectedTBL_KSV_ORDER_SHIP1([]);
        setDatasTBL_KSV_ORDER_SHIP(retArray);
        setDatasTBL_KSV_ORDER_SHIP1(retArray1);
    };

    //
    const [data_HEADER_STR, setData_HEADER_STR] = useState([]);

    const dynamicColumns_1 = data_HEADER_STR.map((col, i) => {
        var tHeader = `id_msg_${col}_KSV_ORDER_MST_dt`;
        var tHeaderStr = serviceLib.getLocaleMessage(tHeader);
        var tCol = `COL_${i}`;
        return (
            <AFColumn field={tCol} header={tHeaderStr} headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
        );

        // return  <AFColumn field={tCol} header={tHeaderStr} headerStyle={{ width: '10rem',height:'1.8rem' }} bodyStyle={{ width: '10rem',height:'1.8rem' }} editor={(options) => cellEditorKSV_ORDER_MEM(options)} onCellEditComplete={onCellEditCompleteKSV_ORDER_MEM}></AFColumn>
        //       return  <AFColumn field={col.field} header={tHeaderStr} headerStyle={{ width: '10rem',height:'1.8rem' }} bodyStyle={{ width: '10rem',height:'1.8rem' }} ></AFColumn>
    });

    const search_LIST_1 = () => {
        var _tData = { ...dataQRY_KSV_ORDER_SHIP };

        if (dataETC_TAX_CD && dataETC_TAX_CD !== '') ;
        else process_RESET_EDT();
        setDatasTBL_KSV_ORDER_SHIP([]);
        setSelectedTBL_KSV_ORDER_SHIP([]);

        setLoadingTBL_KSV_ORDER_SHIP(true);

        // 2
        serviceS080101_DOCU_REGIST_DOMESTIC
            .mgrQuery_LIST_1(_tData)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_SHIP(false);
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                            data.length,
                    );
                    var tArray2 = data.map((col, i) => {
                        var tObj = { ...col };
                        tObj.id = i + 1;
                        return tObj;
                    });
                    setDatasTBL_KSV_ORDER_SHIP(tArray2);
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });

        // search_CODE();
    };

    const process_SAVE = () => {
        const saveRows = datasTBL_KSV_ORDER_SHIP1.filter(
            (row) => !row.IS_SUMMARY_ROW,
        );

        if (saveRows.length <= 0) {
            alert("작업할 데이터가 없습니다.<br><br>There is no data to work with.");
            return;
        }

        var _tInput0 = [...saveRows];
        var _tInput1 = [];
        var tFlag = 0;
        _tInput0.forEach((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (typeof tObj.id !== "undefined") delete tObj.id;
            if (parseFloat(tObj.SELL_QTY) <= 0) tFlag = 1;
            if (parseFloat(tObj.SELL_QTY) > parseFloat(tObj.BAL_QTY)) {
                tFlag = 2;
            }

            _tInput1.push(tObj);
        });

        if (tFlag === 1) {
            alert("Sell Qty을 입력하세요.<br><br>Enter Sell Qty.");
            return;
        }

        var tObj = { ...dataEDT_KSV_ORDER_SHIP };
        tObj.TAX_CD = dataETC_TAX_CD;
        if (dataEDT_KSV_ORDER_SHIP.BILL_DATE === "") {
            alert("세금계산서 발행일이 입력되어야 합니다.<br><br>The tax invoice issuance date must be entered.");
            return;
        }

        if (tFlag === 2 && !tObj.TAX_CD) {
            alert("Sell Qty가 Bal Qty보다 클 수 없습니다.<br><br>Sell ​​Qty cannot be greater than Bal Qty.");
            return;
        }

        setLoadingTBL_KSV_ORDER_SHIP1(true);
        serviceS080101_DOCU_REGIST_DOMESTIC
            .mgrInsert_SAVE(_tInput1, tObj)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_SHIP1(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (typeof data.length === "undefined") {
                    } else {
                        alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            setDatasTBL_KSV_ORDER_SHIP1([]);
                            setSelectedTBL_KSV_ORDER_SHIP1([]);

                            search_LIST_1();
                        }
                        // console.log("ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length);
                    }
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                    toast.current.show({
                        severity: "success",
                        summary: "ERROR:Insert Order Ship",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };

    /*QRY KSV_STOCK_FACOUT */
    const [dataQRY_KSV_ORDER_SHIP, setDataQRY_KSV_ORDER_SHIP] = useState(
        emptyQRY_KSV_ORDER_SHIP,
    );

    const [
        datasQRY_KSV_ORDER_SHIP_BUYER_CD,
        setDatasQRY_KSV_ORDER_SHIP_BUYER_CD,
    ] = useState([]);
    const [
        dataQRY_KSV_ORDER_SHIP_BUYER_CD,
        setDataQRY_KSV_ORDER_SHIP_BUYER_CD,
    ] = useState({});

    const onDropdownChangeQRY_KSV_ORDER_SHIP_BUYER_CD = (e, name) => {
        let val = (e.value && e.value.BUYER_CD) || "";

        let _dataQRY_KSV_ORDER_SHIP = { ...dataQRY_KSV_ORDER_SHIP };

        let tTypeVal = _dataQRY_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_ORDER_SHIP(_dataQRY_KSV_ORDER_SHIP);
        setDataQRY_KSV_ORDER_SHIP_BUYER_CD(e.value);
    };

    const onInputChangeQRY_KSV_ORDER_SHIP_INVOICE_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_ORDER_SHIP = { ...dataQRY_KSV_ORDER_SHIP };

        let tTypeVal = _dataQRY_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = parseInt(val);

        setDataQRY_KSV_ORDER_SHIP(_dataQRY_KSV_ORDER_SHIP);
    };

    const onInputChangeQRY_KSV_ORDER_SHIP_PO_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_ORDER_SHIP = { ...dataQRY_KSV_ORDER_SHIP };

        let tTypeVal = _dataQRY_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = parseInt(val);

        setDataQRY_KSV_ORDER_SHIP(_dataQRY_KSV_ORDER_SHIP);
    };

    const onInputChangeQRY_KSV_ORDER_SHIP_ORDER_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_ORDER_SHIP = { ...dataQRY_KSV_ORDER_SHIP };

        let tTypeVal = _dataQRY_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = parseInt(val);

        setDataQRY_KSV_ORDER_SHIP(_dataQRY_KSV_ORDER_SHIP);
    };

    const onCalChangeQRY_KSV_ORDER_SHIP_S_SHIP_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_ORDER_SHIP = { ...dataQRY_KSV_ORDER_SHIP };
        _dataQRY_KSV_ORDER_SHIP[`${name}`] = val;
        setDataQRY_KSV_ORDER_SHIP(_dataQRY_KSV_ORDER_SHIP);
    };

    const onCalChangeQRY_KSV_ORDER_SHIP_E_SHIP_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_ORDER_SHIP = { ...dataQRY_KSV_ORDER_SHIP };
        _dataQRY_KSV_ORDER_SHIP[`${name}`] = val;
        setDataQRY_KSV_ORDER_SHIP(_dataQRY_KSV_ORDER_SHIP);
    };

    /*QRY KSV_STOCK_FACOUT */
    const [dataQRY_KSV_ORDER_SHIP1, setDataQRY_KSV_ORDER_SHIP1] = useState(
        emptyQRY_KSV_ORDER_SHIP1,
    );

    /*QRY KSV_STOCK_FACOUT */
    const [dataEDT_KSV_ORDER_SHIP, setDataEDT_KSV_ORDER_SHIP] = useState(
        emptyEDT_KSV_ORDER_SHIP,
    );

    const onInputChangeEDT_KSV_ORDER_SHIP_ORDER_USER_ID = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_SHIP = { ...dataEDT_KSV_ORDER_SHIP };

        let tTypeVal = _dataEDT_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_SHIP(_dataEDT_KSV_ORDER_SHIP);
    };

    const onCalChangeEDT_KSV_ORDER_SHIP_REG_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_ORDER_SHIP = { ...dataEDT_KSV_ORDER_SHIP };
        _dataEDT_KSV_ORDER_SHIP[`${name}`] = val;
        setDataEDT_KSV_ORDER_SHIP(_dataEDT_KSV_ORDER_SHIP);
    };

    const onCalChangeEDT_KSV_ORDER_SHIP_BILL_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_ORDER_SHIP = { ...dataEDT_KSV_ORDER_SHIP };
        _dataEDT_KSV_ORDER_SHIP[`${name}`] = val;
        setDataEDT_KSV_ORDER_SHIP(_dataEDT_KSV_ORDER_SHIP);
    };

    /* TABLE KSV_STOCK_FACOUT*/
    // DEFINE DATAGRID : TBL_KSV_ORDER_SHIP
    let emptyTBL_KSV_ORDER_SHIP = {};

    const [datasTBL_KSV_ORDER_SHIP, setDatasTBL_KSV_ORDER_SHIP] = useState([]);
    const dt_TBL_KSV_ORDER_SHIP = useRef(null);
    const [dataTBL_KSV_ORDER_SHIP, setDataTBL_KSV_ORDER_SHIP] = useState(
        emptyTBL_KSV_ORDER_SHIP,
    );
    const [selectedTBL_KSV_ORDER_SHIP, setSelectedTBL_KSV_ORDER_SHIP] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_ORDER_SHIP,
        setFlagSelectModeTBL_KSV_ORDER_SHIP,
    ] = useState(false);

    const [loadingTBL_KSV_ORDER_SHIP, setLoadingTBL_KSV_ORDER_SHIP] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_ORDER_SHIP

    const onRowClick1TBL_KSV_ORDER_SHIP = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_ORDER_SHIP = argData;

        setDataTBL_KSV_ORDER_SHIP(argTBL_KSV_ORDER_SHIP);
    };

    const onRowClickTBL_KSV_ORDER_SHIP = (event) => {
        let argTBL_KSV_ORDER_SHIP = event.data;
        if (flagSelectModeTBL_KSV_ORDER_SHIP) return;

        // Service : NawooAll:mgrQueryTBL_KSV_ORDER_SHIP
    };

    /* TABLE KSV_STOCK_FACOUT*/
    // DEFINE DATAGRID : TBL_KSV_ORDER_SHIP1
    let emptyTBL_KSV_ORDER_SHIP1 = {};

    const [loadingTBL_KSV_ORDER_SHIP1, setLoadingTBL_KSV_ORDER_SHIP1] =
        useState(false);
    const [datasTBL_KSV_ORDER_SHIP1, setDatasTBL_KSV_ORDER_SHIP1] = useState(
        [],
    );
    const dt_TBL_KSV_ORDER_SHIP1 = useRef(null);
    const [dataTBL_KSV_ORDER_SHIP1, setDataTBL_KSV_ORDER_SHIP1] = useState(
        emptyTBL_KSV_ORDER_SHIP1,
    );
    const [selectedTBL_KSV_ORDER_SHIP1, setSelectedTBL_KSV_ORDER_SHIP1] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_ORDER_SHIP1,
        setFlagSelectModeTBL_KSV_ORDER_SHIP1,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_ORDER_SHIP1

    const onRowClick1TBL_KSV_ORDER_SHIP1 = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_ORDER_SHIP1 = argData;

        setDataTBL_KSV_ORDER_SHIP1(argTBL_KSV_ORDER_SHIP1);
    };

    const onRowClickTBL_KSV_ORDER_SHIP1 = (event) => {
        let argTBL_KSV_ORDER_SHIP1 = event.data;
        if (flagSelectModeTBL_KSV_ORDER_SHIP1) return;

        // Service : NawooAll:mgrQueryTBL_KSV_ORDER_SHIP1
    };

    /* TABLE KSV_STOCK_FACOUT*/
    // DEFINE DATAGRID : TBL_KSV_ORDER_SHIP2
    let emptyTBL_KSV_ORDER_SHIP2 = {};

    const [datasTBL_KSV_ORDER_SHIP2, setDatasTBL_KSV_ORDER_SHIP2] = useState(
        [],
    );
    const dt_TBL_KSV_ORDER_SHIP2 = useRef(null);
    const [dataTBL_KSV_ORDER_SHIP2, setDataTBL_KSV_ORDER_SHIP2] = useState(
        emptyTBL_KSV_ORDER_SHIP2,
    );
    const [selectedTBL_KSV_ORDER_SHIP2, setSelectedTBL_KSV_ORDER_SHIP2] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_ORDER_SHIP2,
        setFlagSelectModeTBL_KSV_ORDER_SHIP2,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_ORDER_SHIP2

    const onCellEditCompleteKSV_ORDER_SHIP1 = (e) => {
        let { rowData, newValue, field, originalEvent: event } = e;

        if (rowData.IS_SUMMARY_ROW) return;

        if (dataETC_TAX_CD && field === "SELL_QTY") return;

        if (field === "SELL_QTY") {
            var tOldSellQty = parseFloat(rowData.SELL_QTY);
            var tDiffQty = parseFloat(newValue) - tOldSellQty;
            var tBalQty = parseFloat(rowData.BAL_QTY);

            tBalQty -= tDiffQty;
            rowData[field] = String(
                serviceLib.getFloat(parseFloat(newValue), 2),
            );

            var tPrice = parseFloat(rowData.KRW_SHIP_PRICE);
            var tRateBase = parseFloat(rowData.RATEBASE);
            // var tBalQty = parseFloat(rowData.BAL_QTY);
            var tSellQty = parseFloat(newValue);
            console.log(`Sell Qty In: ${tPrice}/ ${tRateBase} / ${tSellQty}`);
            //  var tKrwShipAmount = serviceLib.getFloat(tPrice * tSellQty / tRateBase, 0);
            var tKrwShipAmount = serviceLib.getFloat(tPrice * tSellQty, 0);
            var tKrwTaxAmount =
                taxOption === "TAX"
                    ? serviceLib.getFloat(tKrwShipAmount * 0.1, 0)
                    : 0;
            var tKrwTotAmount = tKrwShipAmount + tKrwTaxAmount;

            rowData.KRW_SHIP_AMOUNT = String(tKrwShipAmount);
            rowData.KRW_TAX_AMOUNT = String(tKrwTaxAmount);
            rowData.KRW_TOT_AMOUNT = String(tKrwTotAmount);
            // rowData.BAL_QTY = String(tBalQty);

            var _dataTBL_KSV_ORDER_SHIP1 = { ...dataTBL_KSV_ORDER_SHIP1 };
            setDataTBL_KSV_ORDER_SHIP1(rowData);
            // } else if (field === 'KRW_SHIP_PRICE') {
        } else if (field === "SALES_PRICE") {
            rowData[field] = String(
                serviceLib.getFloat(parseFloat(newValue), 2),
            );

            var tRateBase = parseFloat(rowData.RATEBASE);


            // 입력된 값을 사용.
            // var tPrice = parseFloat(newValue) * tRateBase;
            var tPrice = parseFloat(newValue);
            rowData.KRW_SHIP_PRICE = parseFloat(tPrice).toFixed(0);
            // var tBalQty = parseFloat(rowData.BAL_QTY);
            var tSellQty = parseFloat(rowData.SELL_QTY);
            var tBalQty = parseFloat(rowData.BAL_QTY);
            console.log(
                `Sell Qty In: ${tPrice}/ ${tRateBase} / ${tSellQty ? tSellQty : 1}`,
            );
            // var tKrwShipAmount = serviceLib.getFloat(tPrice * tSellQty / tRateBase, 0);
            var tKrwShipAmount = serviceLib.getFloat(tPrice * tSellQty, 0);
            var tKrwTaxAmount =
                taxOption === "TAX"
                    ? serviceLib.getFloat(tKrwShipAmount * 0.1, 0)
                    : 0;
            var tKrwTotAmount = tKrwShipAmount + tKrwTaxAmount;

            rowData.KRW_SHIP_AMOUNT = String(tKrwShipAmount);
            rowData.KRW_TAX_AMOUNT = String(tKrwTaxAmount);
            rowData.KRW_TOT_AMOUNT = String(tKrwTotAmount);
            rowData.BAL_QTY = String(tBalQty);

            var _dataTBL_KSV_ORDER_SHIP1 = { ...dataTBL_KSV_ORDER_SHIP1 };
            setDataTBL_KSV_ORDER_SHIP1(rowData);
        } else {
            rowData[field] = newValue;
        }
    };

    // GUIDE: 에디터 컴포넌트에 onKeyDown 이벤트를 연결한다.
    const onChangeTextEdit = (e, options) => {
        options.editorCallback(e.target.value);
    };

    const handleFocus = (event) => event.target.select();

    const cellEditorKSV_ORDER_SHIP1 = (options) => {
        return textEditor(options);
    };

    const textEditor = (options) => {
        return (
            <InputText
                style={{ width: "8rem" }}
                type="text"
                value={options.value}
                onChange={(e) => onChangeTextEdit(e, options)}
                onFocus={handleFocus}
            />
        );
    };

    useEffect(() => {
        var tTaxCd = "";

        var tUrls = window.location.href.split("?");
        if (tUrls.length <= 1) {
        } else {
            var tParams1 = tUrls[1].split("&");
            var tParams2 = tParams1.map((col, i) => {
                var tObj = {};
                var tCols = col.split("=");
                if (tCols[0].includes("TAX_CD")) {
                    tObj.key = tCols[0];
                    tObj.value = tCols[1];
                    tTaxCd = tObj.value;
                }
            });
        }

        var tRetDate = serviceLib.getCurrDate().substring(0, 8);
        var tUserInfo = serviceLib.getUserInfo();
        var tObj0 = { ...dataEDT_KSV_ORDER_SHIP };
        tObj0.ORDER_USER_ID = tUserInfo.USER_ID;
        tObj0.REG_DATE = tRetDate;
        setDataEDT_KSV_ORDER_SHIP(tObj0);

        var _tObj = {};
        _tObj.BUYER_CD = "";

        serviceS080101_DOCU_REGIST_DOMESTIC
            .mgrQuery_CODE(_tObj)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    setDatasQRY_KSV_ORDER_SHIP_BUYER_CD(data.BUYER_CD);
                    setDataQRY_KSV_ORDER_SHIP_BUYER_CD(data.BUYER_CD[0]);

                    var tObj1 = { ...dataQRY_KSV_ORDER_SHIP };
                    tObj1.S_SHIP_DATE = moment()
                        .subtract(2, "months")
                        .format("YYYYMMDD");
                    tObj1.E_SHIP_DATE = moment().format("YYYYMMDD");
                    setDataQRY_KSV_ORDER_SHIP(tObj1);

                    if (tTaxCd) {
                        var tQryObj = {};
                        tQryObj.TAX_CD = tTaxCd;

                        search_LIST_TAX_CD(tQryObj);
                        setDataETC_TAX_CD(tTaxCd);
                    } else {
                        setDataETC_TAX_CD(tTaxCd);
                    }
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });

        // search_LIST_1();
    }, []);

    // Change TaxKind

    // Support Area

    const changeDateVal = (argVal) => {
        if (argVal === "") return argVal;
        var tType = typeof argVal;
        if (tType !== "string") {
            console.log(tType);
            return null;
        }

        var tYear = parseInt(argVal.substring(0, 4));
        var tMon = parseInt(argVal.substring(4, 6));
        var tDay = parseInt(argVal.substring(6, 8));

        return new Date(tYear, tMon - 1, tDay);
    };

    const getDateVal = (argVal) => {
        var tDate = argVal;
        var mm = tDate.getMonth() + 1;
        var mm_str = "";
        if (mm > 9) mm_str = mm;
        else mm_str = "0" + mm;

        var dd = tDate.getDate();
        var dd_str = "";
        if (dd > 9) dd_str = dd;
        else dd_str = "0" + dd;

        var hours = tDate.getHours();
        var hours_str = "";
        if (hours > 9) hours_str = hours;
        else hours_str = "0" + hours;

        var minutes = tDate.getMinutes();
        var minutes_str = "";
        if (minutes > 9) minutes_str = minutes;
        else minutes_str = "0" + minutes;

        var seconds = tDate.getSeconds();
        var seconds_str = "";
        if (seconds > 9) seconds_str = seconds;
        else seconds_str = "0" + seconds;

        var yyyy = tDate.getFullYear().toString();

        var tRet = yyyy + mm_str + dd_str;
        return tRet;
    };

    const [taxOption, setTaxOption] = useState("TAX");

    useEffect(() => {
        let _datasTBL_KSV_ORDER_SHIP1 = [...datasTBL_KSV_ORDER_SHIP1];
        _datasTBL_KSV_ORDER_SHIP1.forEach((item) => {
            if (taxOption === "TAX") {
                item.KRW_TAX_AMOUNT = String(
                    serviceLib.getFloat(
                        parseFloat(item.KRW_SHIP_AMOUNT) * 0.1,
                        0,
                    ),
                );
                item.KRW_TOT_AMOUNT = String(
                    serviceLib.getFloat(
                        parseFloat(item.KRW_SHIP_AMOUNT) +
                            parseFloat(item.KRW_TAX_AMOUNT),
                        0,
                    ),
                );
            } else {
                item.KRW_TAX_AMOUNT = String(
                    serviceLib.getFloat(
                        parseFloat(item.KRW_SHIP_AMOUNT) * 0,
                        0,
                    ),
                );
                item.KRW_TOT_AMOUNT = String(
                    serviceLib.getFloat(parseFloat(item.KRW_SHIP_AMOUNT), 0),
                );
            }
        });
        setDatasTBL_KSV_ORDER_SHIP1(_datasTBL_KSV_ORDER_SHIP1);
    }, [taxOption]);

    const getSummaryTBL_KSV_ORDER_SHIP1 = (rows) => {
        const summary = rows.reduce(
            (acc, row) => {
                if (row.IS_SUMMARY_ROW) return acc;

                const sellQty = parseFloat(row.SELL_QTY || 0);
                const shipAmt = parseFloat(row.KRW_SHIP_AMOUNT || 0);
                const taxAmt = parseFloat(row.KRW_TAX_AMOUNT || 0);
                const totAmt = parseFloat(row.KRW_TOT_AMOUNT || 0);

                acc.SELL_QTY += isNaN(sellQty) ? 0 : sellQty;
                acc.KRW_SHIP_AMOUNT += isNaN(shipAmt) ? 0 : shipAmt;
                acc.KRW_TAX_AMOUNT += isNaN(taxAmt) ? 0 : taxAmt;
                acc.KRW_TOT_AMOUNT += isNaN(totAmt) ? 0 : totAmt;
                return acc;
            },
            {
                SELL_QTY: 0,
                KRW_SHIP_AMOUNT: 0,
                KRW_TAX_AMOUNT: 0,
                KRW_TOT_AMOUNT: 0,
            },
        );

        return {
            id: "__summary__",
            IS_SUMMARY_ROW: true,
            DUE_DATE: "",
            INVOICE_NO: "",
            PO_CD: "",
            ORDER_CD: "",
            STYLE_NAME: "합계",
            PRODUCT_TYPE: "",
            BAL_QTY: "",
            SELL_QTY: String(summary.SELL_QTY),
            CURR_CD: "",
            SALES_PRICE: "",
            DEBIT: "",
            CREDIT: "",
            KRW_SHIP_AMOUNT: String(summary.KRW_SHIP_AMOUNT),
            KRW_TAX_AMOUNT: String(summary.KRW_TAX_AMOUNT),
            KRW_TOT_AMOUNT: String(summary.KRW_TOT_AMOUNT),
        };
    };

    const summaryTBL_KSV_ORDER_SHIP1 = getSummaryTBL_KSV_ORDER_SHIP1(
        datasTBL_KSV_ORDER_SHIP1,
    );
    const displayDatasTBL_KSV_ORDER_SHIP1 = [
        ...datasTBL_KSV_ORDER_SHIP1,
        summaryTBL_KSV_ORDER_SHIP1,
    ];

    return (
        <div className="af-div-main">
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "3rem" }}
            >
                <span className="af-span-3-0" style={{ width: "27rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Ship Date</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "9rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_E_DUE_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_ORDER_SHIP.S_SHIP_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_ORDER_SHIP_S_SHIP_DATE(
                                    e,
                                    "S_SHIP_DATE",
                                )
                            }
                        />
                    </div>
                    <p className="af-span-p" style={{ width: "1rem" }}>~</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "9rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_E_DUE_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_ORDER_SHIP.E_SHIP_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_ORDER_SHIP_E_SHIP_DATE(
                                    e,
                                    "E_SHIP_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "16em" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Buyer#</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Dropdown
                            filter
                            style={{ width: "9rem" }}
                            id="id_ORDER_CD"
                            editable
                            value={dataQRY_KSV_ORDER_SHIP_BUYER_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_ORDER_SHIP_BUYER_CD(
                                    e,
                                    "BUYER_CD",
                                )
                            }
                            options={datasQRY_KSV_ORDER_SHIP_BUYER_CD}
                            optionLabel="BUYER_NAME"
                            placeholder=""
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "16rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>CI#</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            style={{ width: "9rem" }}
                            id="id_TARGET_ETA"
                            value={dataQRY_KSV_ORDER_SHIP.INVOICE_NO}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_ORDER_SHIP_INVOICE_NO(
                                    e,
                                    "INVOICE_NO",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "16rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>PO#</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            style={{ width: "9rem" }}
                            id="id_TARGET_ETA"
                            value={dataQRY_KSV_ORDER_SHIP.PO_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_ORDER_SHIP_PO_CD(
                                    e,
                                    "PO_CD",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "16rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Order#</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            style={{ width: "9rem" }}
                            id="id_TARGET_ETA"
                            value={dataQRY_KSV_ORDER_SHIP.ORDER_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_ORDER_SHIP_ORDER_CD(
                                    e,
                                    "ORDER_CD",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "8rem" }}>
                    <div className="af-span-div-btn" style={{ width: "7rem" }}>
                        <Tooltip
                            className="menuCodeTooltip"
                            target={`#btnSearch`}
                            content={`Alt+S`}
                            position="bottom"
                        />

                        <Button
                            style={{ width: "7rem" }}
                            label={
                                <span>
                                    Search(<u>S</u>)
                                </span>
                            }
                            accessKey="S"
                            id="btnSearch"
                            className="p-button-text"
                            onClick={search_LIST_1}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "8rem" }}>
                    <div className="af-span-div-btn" style={{ width: "7rem" }}>
                        <Button
                            style={{ width: "7rem" }}
                            label="Reset"
                            className="p-button-text"
                            onClick={process_RESET}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "8rem" }}>
                    <div className="af-span-div-btn" style={{ width: "7rem" }}>
                        <Button
                            style={{ width: "7rem" }}
                            label="Add"
                            className="p-button-text"
                            onClick={process_ADD}
                        />
                    </div>
                </span>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "24rem"}}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_ORDER_SHIP}
                    size="small"
                    value={datasTBL_KSV_ORDER_SHIP}
                    tableStyle={{ tableLayout: "fixed"}}
                    loading={loadingTBL_KSV_ORDER_SHIP}
                    resizableColumns
                    columnResizeMode="expand"
                    metaKeySelection={false}
                    showGridlines
                    selectionMode="multiple"
                    selection={selectedTBL_KSV_ORDER_SHIP}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_ORDER_SHIP(true);
                        setSelectedTBL_KSV_ORDER_SHIP(e.value);
                        console.log(
                            "selected length:" +
                                selectedTBL_KSV_ORDER_SHIP.length,
                        );
                        onRowClick1TBL_KSV_ORDER_SHIP(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_ORDER_SHIP}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage="No results found." //header={headerTBL_KSV_ORDER_SHIP}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="24rem"
                >
                    <AFColumn field="SHIP_DATE" header="Ship Date" headerStyle={{ width: "8rem" }} body={(rowData) => serviceLib.dateFormat(rowData.SHIP_DATE) } ></AFColumn>
                    <AFColumn field="DUE_DATE" header="납품일자" headerStyle={{ width: "8rem" }} body={(rowData) => serviceLib.dateFormat(rowData.DUE_DATE) } ></AFColumn>
                    <AFColumn field="INVOICE_NO" header="CI#" headerStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="BUYER_CD" header="Buyer#" headerStyle={{ width: "5rem" }} ></AFColumn>

                    <AFColumn field="PO_CD" header="PO" headerStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="ORDER_CD" header="Order" headerStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="STYLE_NAME" header="Style" headerStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="SHIP_QTY" header="Ship Qty" headerStyle={{ width: "7rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.SHIP_QTY, 2) } ></AFColumn>
                    <AFColumn field="BAL_QTY" header="Bal Qty" headerStyle={{ width: "7rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.BAL_QTY, 2) } ></AFColumn>
                    <AFColumn field="INVOICE_CURR_CD" header="Curr" headerStyle={{ width: "3rem" }} ></AFColumn>
                    <AFColumn field="SHIP_PRICE" header="Ship Price" headerStyle={{ width: "7rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.SHIP_PRICE, 2) } ></AFColumn>
                    <AFColumn field="INVOICE_SHIP_AMOUNT" header="Ship Amount" headerStyle={{ width: "7rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas( rowData.INVOICE_SHIP_AMOUNT, 2, ) } ></AFColumn>

                    <AFColumn field="CURR_CD" header="Curr" headerStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="SALES_PRICE" header="Sales Price" headerStyle={{ width: "7rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.SALES_PRICE, 2) } ></AFColumn>
                    <AFColumn field="KRW_SHIP_AMOUNT" header="공급가액(원)" headerStyle={{ width: "7rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.KRW_SHIP_AMOUNT, 2) } ></AFColumn>
                    <AFColumn field="KRW_TAX_AMOUNT" header="부가세(원)" headerStyle={{ width: "7rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.KRW_TAX_AMOUNT, 2) } ></AFColumn>
                    <AFColumn field="KRW_TOT_AMOUNT" header="총액(원)" headerStyle={{ width: "7rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.KRW_TOT_AMOUNT, 2) } ></AFColumn>
                    <AFColumn field="RATEBASE" header="Ext Rate" headerStyle={{ width: "10rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.RATEBASE, 4) } ></AFColumn>
                    <AFColumn field="LICENSE_NO" header="License#" headerStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="LICENSE_DATE" header="License D" headerStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="NAT_CD" header="Nat#" headerStyle={{ width: "3rem" }} ></AFColumn>
                    <AFColumn field="BUYER_NAT_CD" header="Buyer Nat#" headerStyle={{ width: "3rem" }} ></AFColumn>
                </AFDataTable>
            </div>

            <div
                className="af-div-first"
                style={{ width: "102rem", height: "33rem" }}
            >
                <div style={{ marginTop: "0.5rem", height: "33rem", overflow: "hidden", paddingTop: "0.5rem" }}>
                    <AFDataTable preventUnrelatedRerender
                        ref={dt_TBL_KSV_ORDER_SHIP1}
                        editMode="cell"
                        size="small"
                        value={displayDatasTBL_KSV_ORDER_SHIP1}
                        loading={loadingTBL_KSV_ORDER_SHIP1}
                        tableStyle={{ tableLayout: "fixed" }}
                        resizableColumns
                        columnResizeMode="expand"
                        showGridlines
                        selectionMode="checkbox"
                        selection={selectedTBL_KSV_ORDER_SHIP1}
                        onSelectionChange={(e) => {
                            const filteredValue = (e.value || []).filter(
                                (row) => !row.IS_SUMMARY_ROW,
                            );
                            setSelectedTBL_KSV_ORDER_SHIP1(filteredValue);
                            onRowClick1TBL_KSV_ORDER_SHIP1(filteredValue);
                        }}
                        onRowClick={onRowClickTBL_KSV_ORDER_SHIP1}
                        dataKey="id"
                        className="datatable-responsive"
                        virtualScrollerOptions={{ itemSize: 20 }}
                        emptyMessage="" //header={headerTBL_KSV_ORDER_SHIP}
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="33rem"
                    >
                        <AFColumn field="DUE_DATE" header="납품일자" headerStyle={{ width: "7rem", color: "green" }} body={(rowData) => rowData.IS_SUMMARY_ROW ? "" : serviceLib.dateFormat(rowData.DUE_DATE) } editor={(options) => options.rowData.IS_SUMMARY_ROW ? null : cellEditorKSV_ORDER_SHIP1(options)} onCellEditComplete={onCellEditCompleteKSV_ORDER_SHIP1} ></AFColumn>
                        <AFColumn field="INVOICE_NO" header="CI#" headerStyle={{ width: "7rem" }} body={(rowData) => rowData.IS_SUMMARY_ROW ? "" : rowData.INVOICE_NO } ></AFColumn>
                        <AFColumn field="PO_CD" header="PO" headerStyle={{ width: "7rem" }} body={(rowData) => rowData.IS_SUMMARY_ROW ? "" : rowData.PO_CD } ></AFColumn>
                        <AFColumn field="ORDER_CD" header="Order" headerStyle={{ width: "7rem" }} body={(rowData) => rowData.IS_SUMMARY_ROW ? "" : rowData.ORDER_CD } ></AFColumn>
                        <AFColumn field="STYLE_NAME" header="Style" headerStyle={{ width: "20rem" }} body={(rowData) => rowData.IS_SUMMARY_ROW ? <b>{rowData.STYLE_NAME}</b> : rowData.STYLE_NAME } ></AFColumn>
                        <AFColumn field="PRODUCT_TYPE" header="품목" headerStyle={{ width: "6rem" }} body={(rowData) => rowData.IS_SUMMARY_ROW ? "" : rowData.PRODUCT_TYPE } editor={(options) => options.rowData.IS_SUMMARY_ROW ? null : cellEditorKSV_ORDER_SHIP1(options)} onCellEditComplete={onCellEditCompleteKSV_ORDER_SHIP1} ></AFColumn>
                        <AFColumn field="BAL_QTY" header="Bal Qty" headerStyle={{ width: "6rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => rowData.IS_SUMMARY_ROW ? "" : serviceLib.numWithCommas(rowData.BAL_QTY, 2) } ></AFColumn>
                        <AFColumn field="SELL_QTY" header="Sell Qty" headerStyle={{ width: "6rem", color: "green" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.SELL_QTY, 2) } editor={(options) => options.rowData.IS_SUMMARY_ROW ? null : cellEditorKSV_ORDER_SHIP1(options)} onCellEditComplete={onCellEditCompleteKSV_ORDER_SHIP1} ></AFColumn>
                        <AFColumn field="CURR_CD" header="Curr" headerStyle={{ width: "6rem" }} body={(rowData) => rowData.IS_SUMMARY_ROW ? "" : rowData.CURR_CD } ></AFColumn>
                        <AFColumn field="SALES_PRICE" header="Sales Price" headerStyle={{ width: "7rem", color: "green" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => rowData.IS_SUMMARY_ROW ? "" : serviceLib.numWithCommas(rowData.SALES_PRICE, 2) } editor={(options) => options.rowData.IS_SUMMARY_ROW ? null : cellEditorKSV_ORDER_SHIP1(options)} onCellEditComplete={onCellEditCompleteKSV_ORDER_SHIP1} ></AFColumn>
                        <AFColumn field="DEBIT" header="Debit" headerStyle={{ width: "7rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => rowData.IS_SUMMARY_ROW ? "" : serviceLib.numWithCommas(rowData.DEBIT, 2) } ></AFColumn>
                        <AFColumn field="CREDIT" header="Credit" headerStyle={{ width: "7rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => rowData.IS_SUMMARY_ROW ? "" : serviceLib.numWithCommas(rowData.CREDIT, 2) } ></AFColumn>
                        <AFColumn field="KRW_SHIP_AMOUNT" header="공급가액(원)" headerStyle={{ width: "7rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.KRW_SHIP_AMOUNT, 2) } ></AFColumn>
                        <AFColumn field="KRW_TAX_AMOUNT" header="부가세(원)" headerStyle={{ width: "7rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.KRW_TAX_AMOUNT, 2) } ></AFColumn>
                        <AFColumn field="KRW_TOT_AMOUNT" header="총액(원)" headerStyle={{ width: "7rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.KRW_TOT_AMOUNT, 2) } ></AFColumn>
                    </AFDataTable>
                </div>
            </div>
            <div
                className="af-div-second"
                style={{ width: "20rem", height: "33rem", marginLeft: "1rem" }}
            >
                <span className="af-span-3-0" style={{ width: "19rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>등록일</p>
                    <div className="af-span-div" style={{ width: "8rem" }}>
                        <Calendar
                            disabled
                            showButtonBar
                            style={{ width: "8rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_E_DUE_DATE"
                            value={changeDateVal(
                                dataEDT_KSV_ORDER_SHIP.REG_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeEDT_KSV_ORDER_SHIP_REG_DATE(
                                    e,
                                    "REG_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "19rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>영업담당자</p>
                    <div className="af-span-div" style={{ width: "8rem" }}>
                        <InputText
                            disabled
                            style={{ width: "8rem" }}
                            id="id_PO_CD"
                            value={dataEDT_KSV_ORDER_SHIP.ORDER_USER_ID}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_ORDER_SHIP_ORDER_USER_ID(
                                    e,
                                    "ORDER_USER_ID",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "19rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>세금계산서발행일</p>
                    <div className="af-span-div" style={{ width: "8rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "8rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_E_DUE_DATE"
                            value={changeDateVal(
                                dataEDT_KSV_ORDER_SHIP.BILL_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeEDT_KSV_ORDER_SHIP_BILL_DATE(
                                    e,
                                    "BILL_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "19rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>Buyer Email</p>
                    <div className="af-span-div" style={{ width: "8rem" }}>
                        <InputText
                            style={{ width: "8rem" }}
                            value={dataEDT_KSV_ORDER_SHIP.BUYER_EMAIL}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_ORDER_SHIP_ORDER_USER_ID(
                                    e,
                                    "BUYER_EMAIL",
                                )
                            }
                        />
                    </div>
                </span>

                <span className="af-span-3-0" style={{ width: "19rem" }}>
                    <div
                        style={{
                            display: "flex",
                            gap: "1rem",
                            justifyContent: "right",
                        }}
                    >
                        <div
                            className="p-field-radiobutton"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                            }}
                        >
                            <RadioButton
                                inputId="taxGroupTax"
                                name="taxGroup"
                                value="TAX"
                                onChange={(e) => setTaxOption(e.value)}
                                checked={taxOption === "TAX"}
                            />

                            <label htmlFor="taxGroupTax">과세</label>
                        </div>

                        <div
                            className="p-field-radiobutton"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                            }}
                        >
                            <RadioButton
                                inputId="taxGroupFree"
                                name="taxGroup"
                                value="FREE"
                                onChange={(e) => setTaxOption(e.value)}
                                checked={taxOption === "FREE"}
                            />

                            <label htmlFor="taxGroupFree">면세</label>
                        </div>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "19rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}> </p>
                    <div className="af-span-div-btn" style={{ width: "8rem" }}>
                        <Button
                            style={{ width: "8rem" }}
                            label="Debit/Credit"
                            className="p-button-text"
                            onClick={popup_UPDATE_DN}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "19rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}> </p>
                    <div className="af-span-div-btn" style={{ width: "8rem" }}>
                        <Button
                            style={{ width: "8rem" }}
                            label="Save"
                            className="p-button-text"
                            onClick={process_SAVE}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "19rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}> </p>
                    <div className="af-span-div-btn" style={{ width: "8rem" }}>
                        <Button
                            style={{ width: "8rem" }}
                            label="Remove"
                            className="p-button-text"
                            onClick={process_REMOVE}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "19rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}> </p>
                    <div className="af-span-div-btn" style={{ width: "8rem" }}>
                        <Button
                            style={{ width: "8rem" }}
                            label="Reset"
                            className="p-button-text"
                            onClick={process_RESET_EDT}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "19rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>TAX#</p>
                    <div className="af-span-div" style={{ width: "8rem" }}>
                        <InputText
                            style={{ width: "8rem" }}
                            id="id_PO_CD"
                            disabled
                            value={dataETC_TAX_CD}
                            onChange={(e) => setDataETC_TAX_CD(e.target.value)}
                        />
                    </div>
                </span>
            </div>

            <Toast ref={toast} />

            {/* DN Update SUB 화면 */}
            <Dialog
                visible={createDialog}
                position="mid-center"
                style={{ width: "122rem", height: "62rem" }}
                header=""
                modal={true}
                className="p-fluid"
                onHide={hideDialog}
            >
                <div
                    className="af-div-first"
                    style={{ width: "120rem", height: "3rem" }}
                >
                    <span className="af-span-3-0" style={{ width: "16rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>CRDB#</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <InputText
                                style={{ width: "9rem" }}
                                id="id_TARGET_ETA"
                                value={dataQRY_KSV_CRDB_MST.CRDB_CD}
                                onChange={(e) =>
                                    onInputChangeQRY_KSV_CRDB_MST_CRDB_CD(
                                        e,
                                        "CDRB_CD",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "16rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>Supplier#</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <InputText
                                style={{ width: "9rem" }}
                                id="id_TARGET_ETA"
                                value={dataQRY_KSV_CRDB_MST.VENDOR_CD}
                                onChange={(e) =>
                                    onInputChangeQRY_KSV_CRDB_MST_VENDOR_CD(
                                        e,
                                        "VENDOR_CD",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "16rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>Curr</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <InputText
                                style={{ width: "9rem" }}
                                id="id_TARGET_ETA"
                                value={dataQRY_KSV_CRDB_MST.CURR_CD}
                                onChange={(e) =>
                                    onInputChangeQRY_KSV_CRDB_MST_CURR_CD(
                                        e,
                                        "CURR_CD",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "16rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>Buyer</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <InputText
                                style={{ width: "9rem" }}
                                id="id_TARGET_ETA"
                                value={dataQRY_KSV_CRDB_MST.BUYER_CD}
                                onChange={(e) =>
                                    onInputChangeQRY_KSV_CRDB_MST_BUYER_CD(
                                        e,
                                        "BUYER_CD",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "11rem" }}>
                        <div className="af-span-div" style={{ width: "10rem" }}>
                            <Button
                                style={{ width: "10rem" }}
                                label="Search"
                                className="p-button-text"
                                onClick={search_UPDATE_DN}
                            />
                        </div>
                    </span>
                </div>
                <div
                    className="af-div-first"
                    style={{ width: "120rem", height: "26rem" }}
                >
                    <AFDataTable preventUnrelatedRerender
                        ref={dt_TBL_KSV_CRDB_MST}
                        size="small"
                        value={datasTBL_KSV_CRDB_MST}
                        tableStyle={{ tableLayout: "fixed" }}
                        loading={loadingTBL_KSV_CRDB_MST}
                        resizableColumns
                        columnResizeMode="expand"
                        showGridlines
                        selectionMode="checkbox"
                        selection={selectedTBL_KSV_CRDB_MST}
                        onSelectionChange={(e) => {
                            setFlagSelectModeTBL_KSV_CRDB_MST(true);
                            setSelectedTBL_KSV_CRDB_MST(e.value);
                            console.log(
                                "selected length:" +
                                    selectedTBL_KSV_CRDB_MST.length,
                            );
                            onRowClick1TBL_KSV_CRDB_MST(e.value);
                        }}
                        onRowClick={onRowClickTBL_KSV_CRDB_MST}
                        dataKey="id"
                        className="datatable-responsive"
                        virtualScrollerOptions={{ itemSize: 20 }}
                        emptyMessage=" " //header={headerTBL_KSV_CRDB_MST}
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="26rem"
                    >
                        <AFColumn className="af-col" style={{ width: "6rem" }} field="CRDB_CD" headerClassName="t-header" header="Crdb#" ></AFColumn>
                        <AFColumn className="af-col" style={{ width: "2rem" }} field="CRDB_SEQ" headerClassName="t-header" header="Crdb Seq" ></AFColumn>
                        <AFColumn className="af-col" style={{ width: "6rem" }} field="CRDB_DATE" headerClassName="t-header" header="Issue Date" ></AFColumn>
                        <AFColumn className="af-col" style={{ width: "10rem" }} field="COM_NAME" headerClassName="t-header" header="Messer" ></AFColumn>
                        <AFColumn className="af-col" style={{ width: "6rem" }} field="CRDB_AMT" headerClassName="t-header" header="Amt" ></AFColumn>
                        <AFColumn className="af-col" style={{ width: "6rem" }} field="BALANCE" headerClassName="t-header" header="Bal" ></AFColumn>
                        <AFColumn className="af-col" style={{ width: "3rem" }} field="CURR_CD" headerClassName="t-header" header="Curr" ></AFColumn>
                        <AFColumn className="af-col" style={{ width: "6rem" }} field="USD_BAL" headerClassName="t-header" header="Usd Bal" ></AFColumn>
                        <AFColumn className="af-col" style={{ width: "10rem" }} field="TITLE" headerClassName="t-header" header="Title" ></AFColumn>
                        <AFColumn className="af-col" style={{ width: "6rem" }} field="REG_USER" headerClassName="t-header" header="Reg User" ></AFColumn>
                        <AFColumn className="af-col" style={{ width: "6rem" }} field="STOCK_QTY" headerClassName="t-header" header="Stock Qty" ></AFColumn>
                        <AFColumn className="af-col" style={{ width: "6rem" }} field="END_DATE" headerClassName="t-header" header="End date" ></AFColumn>
                        <AFColumn className="af-col" style={{ width: "10rem" }} field="REMARK" headerClassName="t-header" header="Remark" ></AFColumn>
                        <AFColumn className="af-col" style={{ width: "4rem" }} field="STATUS" headerClassName="t-header" header="Status" ></AFColumn>
                        <AFColumn className="af-col" style={{ width: "6rem" }} field="PO_CD" headerClassName="t-header" header="PO#" ></AFColumn>
                        <AFColumn className="af-col" style={{ width: "7rem" }} field="ORDER_CD" headerClassName="t-header" header="Order#" ></AFColumn>
                        <AFColumn className="af-col" style={{ width: "6rem" }} field="BANK" headerClassName="t-header" header="Bank" ></AFColumn>
                        <AFColumn className="af-col" style={{ width: "6rem" }} field="COM_CD" headerClassName="t-header" header="Messer#" ></AFColumn>
                        <AFColumn className="af-col" style={{ width: "6rem" }} field="STATUS_CD" headerClassName="t-header" header="Status#" ></AFColumn>
                        <AFColumn className="af-col" style={{ width: "3rem" }} field="BUYER_CD" headerClassName="t-header" header="Buyer#" ></AFColumn>
                        <AFColumn className="af-col" style={{ width: "10rem" }} field="BUYER_NAME" headerClassName="t-header" header="Buyer" ></AFColumn>
                        <AFColumn className="af-col" style={{ width: "10rem" }} field="PAYMENT_PLAN" headerClassName="t-header" header="Payment.P" ></AFColumn>
                    </AFDataTable>
                </div>

                <div
                    className="af-div-first"
                    style={{ width: "120rem", height: "3rem" }}
                >
                    <span className="af-span-3-0" style={{ width: "16rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>CRDB#</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <InputText
                                style={{ width: "9rem" }}
                                id="id_TARGET_ETA"
                                value={dataEDT_KSV_CRDB_MST.CRDB_CD}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_CRDB_MST_CRDB_CD(
                                        e,
                                        "CDRB_CD",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "16rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>Part Amt</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <InputText
                                style={{ width: "9rem" }}
                                id="id_TARGET_ETA"
                                value={dataEDT_KSV_CRDB_MST.PART_AMT}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_CRDB_MST_PART_AMT(
                                        e,
                                        "PART_AMT",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "16rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>Rest Amt</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <InputText
                                style={{ width: "9rem" }}
                                id="id_TARGET_ETA"
                                value={dataEDT_KSV_CRDB_MST.REST_AMT}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_CRDB_MST_REST_AMT(
                                        e,
                                        "REST_AMT",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "16rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>Part Date</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <Calendar
                                showButtonBar
                                style={{ width: "9rem" }}
                                dateFormat="yy-mm-dd"
                                id="id_S_PO_DATE"
                                value={changeDateVal(
                                    dataEDT_KSV_CRDB_MST.PART_DATE,
                                )}
                                onChange={(e) =>
                                    onCalChangeEDT_KSV_CRDB_MST_PART_DATE(
                                        e,
                                        "PART_DATE",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "11rem" }}>
                        <div className="af-span-div" style={{ width: "10rem" }}>
                            <Button
                                style={{ width: "10rem" }}
                                label="Update Dn"
                                className="p-button-text"
                                onClick={process_UPDATE_DN}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "11rem" }}>
                        <div className="af-span-div" style={{ width: "10rem" }}>
                            <Button
                                style={{ width: "10rem" }}
                                label="Cancel Dn"
                                className="p-button-text"
                                onClick={process_DELETE_DN}
                            />
                        </div>
                    </span>
                </div>

                <div
                    className="af-div-first"
                    style={{ width: "120rem", height: "9rem" }}
                >
                    <AFDataTable preventUnrelatedRerender
                        ref={dt_TBL_KSV_CRDB_MST2}
                        size="small"
                        value={datasTBL_KSV_CRDB_MST2}
                        tableStyle={{ tableLayout: "fixed" }}
                        resizableColumns
                        columnResizeMode="fit"
                        loading={loadingTBL_KSV_CRDB_MST2}
                        showGridlines
                        selectionMode="checkbox"
                        selection={selectedTBL_KSV_CRDB_MST2}
                        onSelectionChange={(e) => {
                            setFlagSelectModeTBL_KSV_CRDB_MST2(true);
                            setSelectedTBL_KSV_CRDB_MST2(e.value);
                            console.log(
                                "selected length:" +
                                    selectedTBL_KSV_CRDB_MST2.length,
                            );
                            onRowClick1TBL_KSV_CRDB_MST2(e.value);
                        }}
                        onRowClick={onRowClickTBL_KSV_CRDB_MST2}
                        dataKey="id"
                        className="datatable-responsive"
                        virtualScrollerOptions={{ itemSize: 20 }}
                        emptyMessage=" " //header={headerTBL_KSV_CRDB_MST2}
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="9rem"
                    >
                        <AFColumn className="af-col" style={{ width: "6rem" }} field="END_DATE" headerClassName="t-header" header="End Date" ></AFColumn>
                        <AFColumn className="af-col" style={{ width: "6rem" }} field="CRDB_AMT" headerClassName="t-header" header="Amt" ></AFColumn>
                    </AFDataTable>
                </div>
            </Dialog>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S080101_DOCU_REGIST_DOMESTIC, comparisonFn);
