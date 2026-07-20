/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import { AFDataTable } from "../components/AFDataTable";
import { AFColumn } from "../components/AFColumn";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";

import { ServiceLib } from "../service/service_lib/ServiceLib";
import { ServiceS0450_DELAY_REPORT } from "../service/service_biz/ServiceS0450_DELAY_REPORT";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY1_KSV_ORDER_MST = {
    ORDER_CD: "",
    STYLE_CD: "",
    AVR_PRICE: "",
    ORDER_QTY: "",
    CURR_CD: "",
    USD_PRICE: "",
};

const emptyQRY_DELAY_REPORT = {
    FACTORY_CD: "",
    BUYER_CD: "",
    VENDOR_TYPE: "",
    VENDOR_CD: "",
    PO_CD: "",
    MATL_TYPE: "",
    IS_NO_INPUT: "1",
    IS_NO_OUTPUT: "0",
    IS_PRICE_0: "0",
    S_TARGET_ETD: "",
    E_TARGET_ETD: "",
    UPLOAD: "",
    PU_CD: "",
};

const emptyTBL_DELAY_REPORT = {
    id: 0,
    REG_DATE: "",
};

const emptyTBL1_KSV_ORDER_MST = {
    SEQ: "",
    SHIP_QTY: "",
    AVR_PRICE: "",
    AVR_PRICE2: "",
};

const S0450_DELAY_REPORT = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0450_DELAY_REPORTRef = useRef(null);
    if (!serviceS0450_DELAY_REPORTRef.current) serviceS0450_DELAY_REPORTRef.current = new ServiceS0450_DELAY_REPORT();
    const serviceS0450_DELAY_REPORT = serviceS0450_DELAY_REPORTRef.current;

    const toast = useRef(null);
    const op = useRef(null);
    const dt_iframe = useRef(null);
    const [urlIframe, setUrlIframe] = useState("");

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const [popupDialog, setPopupDialog] = useState(false);
    const [popupMsg, setPopupMsg] = useState("");
    const [iframeKey, setIframeKey] = useState(0);
    const [fileUrl, setFileUrl] = useState("");
    const [fileName, setFileName] = useState("");
    const [styleVal1, setStyleVal1] = useState({
        zIndex: 100,
        display: "none",
        position: "absolute",
        top: "2px",
        left: "2px",
        width: "110rem",
        height: "100rem",
    });

    // Dialog
    const [dlgHeader_CHG_FOB, setDlgHeader_CHG_FOB] = useState("");
    const [createDialog_CHG_FOB, setCreateDialog_CHG_FOB] = useState(false);

    //
    const search_CODE = (argData) => {
        var tInObj = { ...argData };

        serviceS0450_DELAY_REPORT
            .mgrQuery_DELAY_REPORT_CODE(tInObj)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    setDatasQRY_DELAY_REPORT_FACTORY_CD(data.FACTORY_CD);
                    setDataQRY_DELAY_REPORT_FACTORY_CD(data.FACTORY_CD[0]);

                    setDatasQRY_DELAY_REPORT_BUYER_CD(data.BUYER_CD);
                    setDataQRY_DELAY_REPORT_BUYER_CD(data.BUYER_CD[0]);

                    setDatasQRY_DELAY_REPORT_VENDOR_CD(data.VENDOR_CD);
                    setDataQRY_DELAY_REPORT_VENDOR_CD(data.VENDOR_CD[0]);

                    setDatasQRY_DELAY_REPORT_PO_CD(data.PO_CD);
                    setDataQRY_DELAY_REPORT_PO_CD(data.PO_CD[0]);

                    setDatasQRY_DELAY_REPORT_MATL_TYPE(data.MATL_TYPE);
                    setDataQRY_DELAY_REPORT_MATL_TYPE(data.MATL_TYPE[0]);

                    setDatasQRY_DELAY_REPORT_VENDOR_TYPE(data.VENDOR_TYPE);
                    setDataQRY_DELAY_REPORT_VENDOR_TYPE(data.VENDOR_TYPE[0]);
                } else {
                    console.log(
                        "ServiceS0450_ORDER_LIS.mgrQueryTBL_KCD_FACTORY error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };
    const search_DELAY_REPORT = () => {
        console.log(dataQRY_DELAY_REPORT);

        if (
            dataQRY_DELAY_REPORT.BUYER_CD === "" &&
            dataQRY_DELAY_REPORT.PO_CD === "" &&
            !dataQRY_DELAY_REPORT.PU_CD
        ) {
            if (dataQRY_DELAY_REPORT.VENDOR_CD);
            else {
                alert(
                    "BUYER 또는 PO#은 필수 입력입니다.<br><br>Buyer or PO# is required.",
                );
                return;
            }
        }

        setSelectedTBL_DELAY_REPORT([]);
        setDatasTBL_DELAY_REPORT([]);
        setLoadingTBL_DELAY_REPORT(true);
        serviceS0450_DELAY_REPORT
            .mgrQuery_DELAY_REPORT(dataQRY_DELAY_REPORT)
            .then((data) => {
                setLoadingTBL_DELAY_REPORT(false);
                console.log(data);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        var tArray = [];
                        data.forEach((col, i) => {
                            var tObj = { ...col };
                            tObj.id = i + 1;
                            tArray.push(tObj);
                        });
                        setDatasTBL_DELAY_REPORT(tArray);
                    }
                } else {
                }
            });
    };

    const process_RESET = () => {
        setDataQRY_DELAY_REPORT(emptyQRY_DELAY_REPORT);

        setDataQRY_DELAY_REPORT_FACTORY_CD(datasQRY_DELAY_REPORT_FACTORY_CD[0]);
        setDataQRY_DELAY_REPORT_BUYER_CD(datasQRY_DELAY_REPORT_BUYER_CD[0]);
        setDataQRY_DELAY_REPORT_VENDOR_CD(datasQRY_DELAY_REPORT_VENDOR_CD[0]);
        setDataQRY_DELAY_REPORT_PO_CD(datasQRY_DELAY_REPORT_PO_CD[0]);
        setDataQRY_DELAY_REPORT_MATL_TYPE(datasQRY_DELAY_REPORT_MATL_TYPE[0]);
        setDataQRY_DELAY_REPORT_VENDOR_TYPE(
            datasQRY_DELAY_REPORT_VENDOR_TYPE[0],
        );

        setDatasTBL_DELAY_REPORT([]);
    };

    const process_UPDATE_REMARK = () => {
        if (selectedTBL_DELAY_REPORT.length <= 0) {
            alert(
                "처리할 데이타를 선택하십시요.<br><br>Please select data to process.",
            );
            return;
        }

        const { __typename, ...tInObj1 } = dataQRY_DELAY_REPORT;
        tInObj1.REMARK = remark;

        var tInObj2_0 = [...selectedTBL_DELAY_REPORT];
        var tInObj2 = [];
        tInObj2_0.forEach((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (typeof tObj.id !== "undefined") delete tObj.id;
            tInObj2.push(tObj);
        });

        console.log(tInObj1);

        setLoadingTBL_DELAY_REPORT(true);
        serviceS0450_DELAY_REPORT
            .mgrUpdate_UPDATE_REMARK(tInObj1, tInObj2)
            .then((data) => {
                setLoadingTBL_DELAY_REPORT(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        search_DELAY_REPORT();
                    }
                } else {
                    toast.current.show({
                        severity: "success",
                        summary: "FAILED: Change Fob",
                        detail: "fatal error",
                        life: 3000,
                    });
                }
            });
    };

    const search_CODE_BUYER_CD = (argBuyerCd) => {
        var tInObj = {};
        tInObj.BUYER_CD = argBuyerCd;

        serviceS0450_DELAY_REPORT
            .mgrQuery_DELAY_REPORT_CODE(tInObj)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    // setDatasQRY_DELAY_REPORT_STYLE_CD(data.STYLE);
                    // setDataQRY_DELAY_REPORT_STYLE_CD(data.STYLE[0]);
                } else {
                    console.log(
                        "ServiceS0450_ORDER_LIS.mgrQueryTBL_KCD_FACTORY error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    /*QRY1 KSV_ORDER_MST */
    const [dataQRY1_KSV_ORDER_MST, setDataQRY1_KSV_ORDER_MST] = useState(
        emptyQRY1_KSV_ORDER_MST,
    );

    const [
        datasQRY1_KSV_ORDER_MST_CURR_CD,
        setDatasQRY1_KSV_ORDER_MST_CURR_CD,
    ] = useState([]);
    const [dataQRY1_KSV_ORDER_MST_CURR_CD, setDataQRY1_KSV_ORDER_MST_CURR_CD] =
        useState({});

    /*QRY KSV_ORDER_MST */
    const [dataQRY_DELAY_REPORT, setDataQRY_DELAY_REPORT] = useState(
        emptyQRY_DELAY_REPORT,
    );
    const [datasQRY_DELAY_REPORT_BUYER_CD, setDatasQRY_DELAY_REPORT_BUYER_CD] =
        useState([]);
    const [dataQRY_DELAY_REPORT_BUYER_CD, setDataQRY_DELAY_REPORT_BUYER_CD] =
        useState({});

    const onDropdownChangeQRY_DELAY_REPORT_BUYER_CD = (e, name) => {
        let val = (e.value && e.value.BUYER_CD) || "";

        let _dataQRY_DELAY_REPORT = { ...dataQRY_DELAY_REPORT };

        let tTypeVal = _dataQRY_DELAY_REPORT[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_DELAY_REPORT[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_DELAY_REPORT[`${name}`] = parseInt(val);
        }

        setDataQRY_DELAY_REPORT(_dataQRY_DELAY_REPORT);
        setDataQRY_DELAY_REPORT_BUYER_CD(e.value);

        search_CODE_BUYER_CD(val);
    };

    const [
        datasQRY_DELAY_REPORT_FACTORY_CD,
        setDatasQRY_DELAY_REPORT_FACTORY_CD,
    ] = useState([]);
    const [
        dataQRY_DELAY_REPORT_FACTORY_CD,
        setDataQRY_DELAY_REPORT_FACTORY_CD,
    ] = useState({});

    const onDropdownChangeQRY_DELAY_REPORT_FACTORY_CD = (e, name) => {
        let val = (e.value && e.value.FACTORY_CD) || "";

        let _dataQRY_DELAY_REPORT = { ...dataQRY_DELAY_REPORT };

        let tTypeVal = _dataQRY_DELAY_REPORT[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_DELAY_REPORT[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_DELAY_REPORT[`${name}`] = parseInt(val);
        }

        setDataQRY_DELAY_REPORT(_dataQRY_DELAY_REPORT);
        setDataQRY_DELAY_REPORT_FACTORY_CD(e.value);

        // search_CODE_FACTORY_CD (val);
    };

    const [
        datasQRY_DELAY_REPORT_VENDOR_CD,
        setDatasQRY_DELAY_REPORT_VENDOR_CD,
    ] = useState([]);
    const [dataQRY_DELAY_REPORT_VENDOR_CD, setDataQRY_DELAY_REPORT_VENDOR_CD] =
        useState({});

    const [
        datasQRY_DELAY_REPORT_VENDOR_TYPE,
        setDatasQRY_DELAY_REPORT_VENDOR_TYPE,
    ] = useState([]);
    const [
        dataQRY_DELAY_REPORT_VENDOR_TYPE,
        setDataQRY_DELAY_REPORT_VENDOR_TYPE,
    ] = useState({});

    const onDropdownChangeQRY_DELAY_REPORT_VENDOR_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_DELAY_REPORT = { ...dataQRY_DELAY_REPORT };

        let tTypeVal = _dataQRY_DELAY_REPORT[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_DELAY_REPORT[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_DELAY_REPORT[`${name}`] = parseInt(val);
        }

        setDataQRY_DELAY_REPORT(_dataQRY_DELAY_REPORT);
        setDataQRY_DELAY_REPORT_VENDOR_TYPE(e.value);

        // search_CODE_VENDOR_TYPE (val);
    };

    const [datasQRY_DELAY_REPORT_PO_CD, setDatasQRY_DELAY_REPORT_PO_CD] =
        useState([]);
    const [dataQRY_DELAY_REPORT_PO_CD, setDataQRY_DELAY_REPORT_PO_CD] =
        useState({});

    const onKeyPressQRY_DELAY_REPORT_BUYER_CD = (e, name) => {
        if (e.key === "Enter") {
            let _dataQRY_DELAY_REPORT = { ...dataQRY_DELAY_REPORT };
            _dataQRY_DELAY_REPORT.BUYER_CD = e.target.value;
            setDataQRY_DELAY_REPORT(_dataQRY_DELAY_REPORT);
            var tObj = {};
            tObj.PO_CD = _dataQRY_DELAY_REPORT.PO_CD;
            tObj.BUYER_CD = _dataQRY_DELAY_REPORT.BUYER_CD;
            tObj.VENDOR_CD = _dataQRY_DELAY_REPORT.VENDOR_CD;
            search_CODE(tObj);
        }
    };

    const [
        datasQRY_DELAY_REPORT_MATL_TYPE,
        setDatasQRY_DELAY_REPORT_MATL_TYPE,
    ] = useState([]);
    const [dataQRY_DELAY_REPORT_MATL_TYPE, setDataQRY_DELAY_REPORT_MATL_TYPE] =
        useState({});

    const onDropdownChangeQRY_DELAY_REPORT_MATL_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_DELAY_REPORT = { ...dataQRY_DELAY_REPORT };

        let tTypeVal = _dataQRY_DELAY_REPORT[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_DELAY_REPORT[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_DELAY_REPORT[`${name}`] = parseInt(val);
        }

        setDataQRY_DELAY_REPORT(_dataQRY_DELAY_REPORT);
        setDataQRY_DELAY_REPORT_MATL_TYPE(e.value);

        // search_CODE_MATL_TYPE (val);
    };

    const setDelayFilterMode = (mode) => {
        let _dataQRY_DELAY_REPORT = { ...dataQRY_DELAY_REPORT };
        _dataQRY_DELAY_REPORT.IS_NO_INPUT = mode === "NO_INPUT" ? "1" : "0";
        _dataQRY_DELAY_REPORT.IS_NO_OUTPUT =
            mode === "NO_OUTPUT" ? "1" : "0";
        _dataQRY_DELAY_REPORT.IS_PRICE_0 = mode === "PRICE_0" ? "1" : "0";
        setDataQRY_DELAY_REPORT(_dataQRY_DELAY_REPORT);
    };

    const onCheckboxChangeQRY_DELAY_REPORT_IS_NO_INPUT = () => {
        setDelayFilterMode("NO_INPUT");
    };

    const onCheckboxChangeQRY_DELAY_REPORT_IS_NO_OUTPUT = (e) => {
        if (e.checked) setDelayFilterMode("NO_OUTPUT");
        else setDelayFilterMode("NO_INPUT");
    };

    const onCheckboxChangeQRY_DELAY_REPORT_IS_PRICE_0 = (e) => {
        if (e.checked) setDelayFilterMode("PRICE_0");
        else setDelayFilterMode("NO_INPUT");
    };

    const onCalChangeQRY_DELAY_REPORT_S_TARGET_ETD = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_DELAY_REPORT = { ...dataQRY_DELAY_REPORT };
        _dataQRY_DELAY_REPORT[`${name}`] = val;
        setDataQRY_DELAY_REPORT(_dataQRY_DELAY_REPORT);
    };

    const onCalChangeQRY_DELAY_REPORT_E_TARGET_ETD = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_DELAY_REPORT = { ...dataQRY_DELAY_REPORT };
        _dataQRY_DELAY_REPORT[`${name}`] = val;
        setDataQRY_DELAY_REPORT(_dataQRY_DELAY_REPORT);
    };

    const onInputChangeQRY_DELAY_REPORT_UPLOAD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_DELAY_REPORT = { ...dataQRY_DELAY_REPORT };

        let tTypeVal = _dataQRY_DELAY_REPORT[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_DELAY_REPORT[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_DELAY_REPORT[`${name}`] = parseInt(val);

        setDataQRY_DELAY_REPORT(_dataQRY_DELAY_REPORT);
    };

    const onInputChangeQRY_DELAY_REPORT_PU_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_DELAY_REPORT = { ...dataQRY_DELAY_REPORT };

        let tTypeVal = _dataQRY_DELAY_REPORT[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_DELAY_REPORT[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_DELAY_REPORT[`${name}`] = parseInt(val);

        setDataQRY_DELAY_REPORT(_dataQRY_DELAY_REPORT);
    };

    const onInputChangeQRY_DELAY_REPORT_VENDOR_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_DELAY_REPORT = { ...dataQRY_DELAY_REPORT };

        let tTypeVal = _dataQRY_DELAY_REPORT[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_DELAY_REPORT[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_DELAY_REPORT[`${name}`] = parseInt(val);

        setDataQRY_DELAY_REPORT(_dataQRY_DELAY_REPORT);
    };

    /* TABLE KSV_ORDER_MST*/
    // DEFINE DATAGRID : TBL_DELAY_REPORT
    const [loadingTBL_DELAY_REPORT, setLoadingTBL_DELAY_REPORT] =
        useState(false);
    const [datasTBL_DELAY_REPORT, setDatasTBL_DELAY_REPORT] = useState([]);
    const dt_TBL_DELAY_REPORT = useRef(null);
    const [dataTBL_DELAY_REPORT, setDataTBL_DELAY_REPORT] = useState(
        emptyTBL_DELAY_REPORT,
    );
    const [selectedTBL_DELAY_REPORT, setSelectedTBL_DELAY_REPORT] = useState(
        [],
    );
    const [flagSelectModeTBL_DELAY_REPORT, setFlagSelectModeTBL_DELAY_REPORT] =
        useState(false);

    // DATAGRID CODE : TBL_DELAY_REPORT

    const onRowClick1TBL_DELAY_REPORT = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_DELAY_REPORT = argData;

        setDataTBL_DELAY_REPORT(argTBL_DELAY_REPORT);

        // localStorage.setItem('AF_S0450_ORDER_CD', argData.ORDER_CD);
    };

    const onRowDoubleClickTBL_DELAY_REPORT = (event) => {
        return;
    };

    const onRowDoubleClickTBL_DELAY_REPORT_bak = (event) => {
        var tUrls = window.location.href.split("/");
        console.log("URL=>" + tUrls[2]);
        var tUrl1 = "";
        if (window.location.href.includes("3288")) {
            tUrl1 = "http://afroba.iptime.org:3288/webapp/mrpapp/index.html#/";
        } else if (window.location.href.includes("3201")) {
            if (window.location.href.includes("afroba")) {
                tUrl1 = "http://afroba.iptime.org:3201/#/";
            }
            if (window.location.href.includes("localhost")) {
                tUrl1 = "http://localhost:3201/#/";
            }
        } else if (window.location.href.includes("3203")) {
            tUrl1 = "http://192.168.0.105:3203/#/";
        } else {
            tUrl1 = "http://localhost:3201/#/";
        }
        // tUrl1 += "S045001_ORDER_INFO?ORDER_CD=" + event.data.ORDER_CD;
        tUrl1 = `${window.location.origin}/#/`;
        tUrl1 += `S020602_ORDER_REG?ORDER_CD=${event.data.ORDER_CD}&STYLE_CD=${event.data.STYLE_CD}`;

        var tUrl2 = `S020602_ORDER_REG?ORDER_CD=${event.data.ORDER_CD}&STYLE_CD=${event.data.STYLE_CD}`;

        var tValObj = {
            key: "1-19",
            label: "Order Regist",
            icon: "pi pi-fw pi-user-edit",
            url1: "S020602_ORDER_REG",
        };
        var tArgObj = { ...tValObj };
        tArgObj.url1 = tUrl2;
        var tFuncObj = {};
        tFuncObj.func = "call_url";
        tFuncObj.message = { ...tArgObj };
        window.parent.postMessage(tFuncObj, "*");

        var tObjs = [...selectedTBL_DELAY_REPORT];
        tObjs.push(event.data);
        setSelectedTBL_DELAY_REPORT(tObjs);
    };

    const onRowClickTBL_DELAY_REPORT = (event) => {
        let argTBL_DELAY_REPORT = event.data;
        if (flagSelectModeTBL_DELAY_REPORT) return;

        // Service : NawooAll:mgrQueryTBL_DELAY_REPORT
    };

    /* TABLE KSV_ORDER_MST*/
    // DEFINE DATAGRID : TBL1_KSV_ORDER_MST
    const [loadingTBL1_KSV_ORDER_MST, setLoadingTBL1_KSV_ORDER_MST] =
        useState(false);
    const [datasTBL1_KSV_ORDER_MST, setDatasTBL1_KSV_ORDER_MST] = useState([]);
    const dt_TBL1_KSV_ORDER_MST = useRef(null);
    const [dataTBL1_KSV_ORDER_MST, setDataTBL1_KSV_ORDER_MST] = useState(
        emptyTBL1_KSV_ORDER_MST,
    );
    const [selectedTBL1_KSV_ORDER_MST, setSelectedTBL1_KSV_ORDER_MST] =
        useState([]);
    const [
        flagSelectModeTBL1_KSV_ORDER_MST,
        setFlagSelectModeTBL1_KSV_ORDER_MST,
    ] = useState(false);

    useEffect(() => {
        window.addEventListener(
            "message",
            (e) => {
                if (e.data.message) {
                    if (e.data.message === "hideChildWindow") {
                        console.log("window message=>" + e.data.message);
                        hideORDER_INFO();
                    }
                }

                // hideORDER_INFO();
            },
            false,
        );

        var tInObj = {};
        tInObj.BUYER_CD = "";

        serviceS0450_DELAY_REPORT
            .mgrQuery_DELAY_REPORT_CODE(tInObj)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    setDatasQRY_DELAY_REPORT_FACTORY_CD(data.FACTORY_CD);
                    setDataQRY_DELAY_REPORT_FACTORY_CD(data.FACTORY_CD[0]);

                    setDatasQRY_DELAY_REPORT_BUYER_CD(data.BUYER_CD);
                    setDataQRY_DELAY_REPORT_BUYER_CD(data.BUYER_CD[0]);

                    setDatasQRY_DELAY_REPORT_VENDOR_CD(data.VENDOR_CD);
                    setDataQRY_DELAY_REPORT_VENDOR_CD(data.VENDOR_CD[0]);

                    setDatasQRY_DELAY_REPORT_PO_CD(data.PO_CD);
                    setDataQRY_DELAY_REPORT_PO_CD(data.PO_CD[0]);

                    setDatasQRY_DELAY_REPORT_MATL_TYPE(data.MATL_TYPE);
                    setDataQRY_DELAY_REPORT_MATL_TYPE(data.MATL_TYPE[0]);

                    setDatasQRY_DELAY_REPORT_VENDOR_TYPE(data.VENDOR_TYPE);
                    setDataQRY_DELAY_REPORT_VENDOR_TYPE(data.VENDOR_TYPE[0]);
                } else {
                    console.log(
                        "ServiceS0450_ORDER_LIS.mgrQueryTBL_KCD_FACTORY error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    }, []);

    // IFRAME_CODE : MgrKcdBankReg
    const [createDialogS045001_ORDER_INFO, setCreateDialogS045001_ORDER_INFO] =
        useState(false);
    const [urlS045001_ORDER_INFO, setUrlS045001_ORDER_INFO] = useState("");

    const hideORDER_INFO = () => {
        setCreateDialogS045001_ORDER_INFO(false);

        //        set_STYLEVAL1_N();
    };

    const hideDialogS045001_ORDER_INFO = () => {
        setCreateDialogS045001_ORDER_INFO(false);
        // console.log("hideDialogMgrKcdBankReg=>" + dataKCD_VENDOR.VENDOR_CD);
    };

    const createDialogFooterS045001_ORDER_INFO = (
        <>
            <Button
                label="Cancel"
                icon="pi pi-times"
                className="p-button-text"
                onClick={hideDialogS045001_ORDER_INFO}
            />
        </>
    );

    // Support Area

    const changeCheckBoxVal = (argVal) => {
        if (argVal === "1") return true;
        else return false;
    };

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

    const exportExcelTBL_DELAY_REPORT = async () => {
        serviceLib.exportExcel(
            "Delay report",
            "Delay report",
            datasTBL_DELAY_REPORT,
        );
    };

    const [remark, setRemark] = useState("");

    const afBodyBUYER_CD = (rowData) => {
        const isPrice0Mode = dataQRY_DELAY_REPORT.IS_PRICE_0 === "1";
        const isVendorType4 = String(rowData.VENDOR_TYPE || "") === "4";

        if (isPrice0Mode && isVendorType4) {
            return (
                <div style={{ backgroundColor: "#2bff78", width: "100%", height: "100%", display: "flex", alignItems: "center", padding: "0 0.25rem", boxSizing: "border-box" }}>
                    <span>{rowData.BUYER_CD}</span>
                </div>
            );
        }

        return <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", padding: "0 0.25rem", boxSizing: "border-box" }}><span>{rowData.BUYER_CD}</span></div>;
    };

    return (
        <div className="af-div-main">
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "7rem" }}
            >
                <span className="af-span-3-0" style={{ width: "18rem" }}>
                    <p className="af-span-p" style={{ width: "5rem" }}>Factory</p>
                    <div className="af-span-div" style={{ width: "12rem" }}>
                        <Dropdown
                            style={{ width: "12rem" }}
                            id="id_STATUS_CD"
                            value={dataQRY_DELAY_REPORT_FACTORY_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_DELAY_REPORT_FACTORY_CD(
                                    e,
                                    "FACTORY_CD",
                                )
                            }
                            options={datasQRY_DELAY_REPORT_FACTORY_CD}
                            optionLabel="FACTORY_NAME"
                            placeholder=""
                            filter
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "13rem" }}>
                    <p className="af-span-p" style={{ width: "3rem" }}>PU#</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            style={{ width: "9rem" }}
                            id="id_PO_CD"
                            value={dataQRY_DELAY_REPORT.PU_CD}
                            onChange={(e) =>
                                onInputChangeQRY_DELAY_REPORT_PU_CD(e, "PU_CD")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "13rem" }}>
                    <p className="af-span-p" style={{ width: "3rem" }}>PO#</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            style={{ width: "9rem" }}
                            id="id_PO_CD"
                            value={dataQRY_DELAY_REPORT.PO_CD}
                            onChange={(e) =>
                                onInputChangeQRY_DELAY_REPORT_UPLOAD(e, "PO_CD")
                            }
                            placeholder="PO26-0100,0101"
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "16rem" }}>
                    <p className="af-span-p" style={{ width: "5rem" }}>Matl Type</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <Dropdown
                            style={{ width: "10rem" }}
                            id="id_STATUS_CD"
                            value={dataQRY_DELAY_REPORT_MATL_TYPE}
                            onChange={(e) =>
                                onDropdownChangeQRY_DELAY_REPORT_MATL_TYPE(
                                    e,
                                    "MATL_TYPE",
                                )
                            }
                            options={datasQRY_DELAY_REPORT_MATL_TYPE}
                            optionLabel="CD_NAME"
                            placeholder=""
                            filter
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "14rem" }}>
                    <p className="af-span-p" style={{ width: "3rem" }}>S.Type</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <Dropdown
                            style={{ width: "10rem" }}
                            id="id_STATUS_CD"
                            value={dataQRY_DELAY_REPORT_VENDOR_TYPE}
                            onChange={(e) =>
                                onDropdownChangeQRY_DELAY_REPORT_VENDOR_TYPE(
                                    e,
                                    "VENDOR_TYPE",
                                )
                            }
                            options={datasQRY_DELAY_REPORT_VENDOR_TYPE}
                            optionLabel="CD_NAME"
                            placeholder=""
                            filter
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "14rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>Supplier</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        {/*<Dropdown style={{ width :'20rem' }} id="id_STATUS_CD" value={dataQRY_DELAY_REPORT_VENDOR_CD} onChange={(e) => onDropdownChangeQRY_DELAY_REPORT_VENDOR_CD(e, 'VENDOR_CD')} options={datasQRY_DELAY_REPORT_VENDOR_CD} optionLabel="VENDOR_NAME" placeholder="" filter editable onKeyPress={(e) => onKeyPressQRY_DELAY_REPORT_VENDOR_CD(e)}></Dropdown>*/}
                        <InputText
                            style={{ width: "9rem" }}
                            id="id_PO_CD"
                            value={dataQRY_DELAY_REPORT.VENDOR_CD}
                            onChange={(e) =>
                                onInputChangeQRY_DELAY_REPORT_VENDOR_CD(
                                    e,
                                    "VENDOR_CD",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "7rem" }}>
                    <div className="af-span-div-btn" style={{ width: "6rem" }}>
                        <Tooltip
                            className="menuCodeTooltip"
                            target={`#btnSearch`}
                            content={`Alt+S`}
                            position="bottom"
                        />

                        <Button
                            style={{ width: "6rem" }}
                            label={
                                <span>
                                    Search(<u>S</u>)
                                </span>
                            }
                            accessKey="S"
                            id="btnSearch"
                            className="p-button-text"
                            onClick={search_DELAY_REPORT}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "7rem" }}>
                    <div className="af-span-div-btn" style={{ width: "6rem" }}>
                        <Button
                            style={{ width: "6rem" }}
                            label="Excel"
                            className="p-button-text green"
                            onClick={exportExcelTBL_DELAY_REPORT}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "7rem" }}>
                    <div className="af-span-div-btn" style={{ width: "6rem" }}>
                        <Button
                            style={{ width: "6rem" }}
                            label="Reset"
                            className="p-button-text"
                            onClick={process_RESET}
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "34.5rem" }}>
                    <p className="af-span-p" style={{ width: "5rem" }}>Buyer</p>
                    <div className="af-span-div" style={{ width: "28.5rem" }}>
                        <Dropdown
                            style={{ width: "28.5rem" }}
                            id="id_STATUS_CD"
                            value={dataQRY_DELAY_REPORT_BUYER_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_DELAY_REPORT_BUYER_CD(
                                    e,
                                    "BUYER_CD",
                                )
                            }
                            options={datasQRY_DELAY_REPORT_BUYER_CD}
                            optionLabel="BUYER_NAME"
                            placeholder=""
                            filter
                            editable
                            onKeyPress={(e) =>
                                onKeyPressQRY_DELAY_REPORT_BUYER_CD(e)
                            }
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "7rem" }}>
                    <p className="af-span-p" style={{ width: "5rem" }}>No Input</p>
                    <div className="af-span-checkbox">
                        <Checkbox
                            id="id_IS_SAMPLE"
                            checked={changeCheckBoxVal(
                                dataQRY_DELAY_REPORT.IS_NO_INPUT,
                            )}
                            onChange={(e) => onCheckboxChangeQRY_DELAY_REPORT_IS_NO_INPUT(e)}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "7rem" }}>
                    <p className="af-span-p" style={{ width: "5rem" }}>No Output</p>
                    <div className="af-span-checkbox">
                        <Checkbox
                            id="id_IS_SAMPLE"
                            checked={changeCheckBoxVal(
                                dataQRY_DELAY_REPORT.IS_NO_OUTPUT,
                            )}
                            onChange={(e) => onCheckboxChangeQRY_DELAY_REPORT_IS_NO_OUTPUT(e)}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "7rem" }}>
                    <p className="af-span-p" style={{ width: "5rem" }}>Price 0</p>
                    <div className="af-span-checkbox">
                        <Checkbox
                            id="id_IS_SAMPLE"
                            checked={changeCheckBoxVal(
                                dataQRY_DELAY_REPORT.IS_PRICE_0,
                            )}
                            onChange={(e) => onCheckboxChangeQRY_DELAY_REPORT_IS_PRICE_0(e)}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Target ETD</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "9rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_S_SHIP_DATE"
                            value={changeDateVal(
                                dataQRY_DELAY_REPORT.S_TARGET_ETD,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_DELAY_REPORT_S_TARGET_ETD(
                                    e,
                                    "S_TARGET_ETD",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "11rem" }}>
                    <p className="af-span-p" style={{ width: "1rem" }}>~</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "9rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_S_SHIP_DATE"
                            value={changeDateVal(
                                dataQRY_DELAY_REPORT.E_TARGET_ETD,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_DELAY_REPORT_E_TARGET_ETD(
                                    e,
                                    "E_TARGET_ETD",
                                )
                            }
                        />
                    </div>
                </span>

                <span className="af-span-3-0" style={{ width: "19rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>Remark</p>
                    <div className="af-span-div" style={{ width: "14rem" }}>
                        <InputText
                            style={{ width: "14rem" }}
                            value={remark}
                            onChange={(e) => setRemark(e.target.value)}
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "7rem" }}>
                    <div className="af-span-div-btn" style={{ width: "6rem" }}>
                        <Button
                            style={{ width: "6rem" }}
                            label="Update"
                            className="p-button-text"
                            onClick={process_UPDATE_REMARK}
                        />
                    </div>
                </span>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "54rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_DELAY_REPORT}
                    size="small"
                    value={datasTBL_DELAY_REPORT}
                    tableStyle={{ tableLayout: "fixed" }}
                    loading={loadingTBL_DELAY_REPORT}
                    resizableColumns
                    columnResizeMode="expand"
                    metaKeySelection={false}
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_DELAY_REPORT}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_DELAY_REPORT(true);
                        setSelectedTBL_DELAY_REPORT(e.value);
                        console.log(
                            "selected length:" +
                                selectedTBL_DELAY_REPORT.length,
                        );
                        onRowClick1TBL_DELAY_REPORT(e.value);
                    }}
                    onRowSelect={onRowClickTBL_DELAY_REPORT}
                    dataKey="id"
                    className="datatable-responsive"
                    onRowDoubleClick={onRowDoubleClickTBL_DELAY_REPORT}
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" "
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="590px"
                >
                    <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "3rem" }} ></AFColumn>
                    <AFColumn field="REG_DATETIME" header="Order Date" body={(rowData) => serviceLib.dateFormat(rowData.REG_DATETIME) } style={{ width: "7rem" }} className="af-col" ></AFColumn>
                    <AFColumn field="PO_CD" header="PO#" style={{ width: "7rem" }} className="af-col" ></AFColumn>
                    <AFColumn field="BUYER_CD" header="Buyer#" body={afBodyBUYER_CD} bodyStyle={{ padding: 0 }} style={{ width: "3rem" }} className="af-col" ></AFColumn>
                    <AFColumn field="TARGET_ETD" header="Contract Delivery Date" body={(rowData) => serviceLib.dateFormat(rowData.TARGET_ETD) } style={{ width: "7rem" }} className="af-col" ></AFColumn>
                    <AFColumn field="TARGET_ETA" header="Target ETA" body={(rowData) => serviceLib.dateFormat(rowData.TARGET_ETA) } style={{ width: "7rem" }} className="af-col" ></AFColumn>
                    <AFColumn field="VENDOR_NAME" header="Supplier" style={{ width: "12rem" }} className="af-col" ></AFColumn>
                    <AFColumn field="MATL_CD" header="Matl#" style={{ width: "7rem" }} className="af-col" ></AFColumn>
                    <AFColumn field="MATL_NAME" header="Description" style={{ width: "12rem" }} className="af-col" ></AFColumn>
                    <AFColumn field="COLOR" header="Color" style={{ width: "10rem" }} className="af-col" ></AFColumn>
                    <AFColumn field="SPEC" header="Spec" style={{ width: "10rem" }} className="af-col" ></AFColumn>
                    <AFColumn field="UNIT" header="Unit" style={{ width: "3rem" }} className="af-col" ></AFColumn>
                    <AFColumn field="NEED_QTY" header="Mrp Qty" className="af-col" body={(r) => serviceLib.formatNumber(r.NEED_QTY)} style={{ textAlign: "right" }} ></AFColumn>

                    <AFColumn field="S_IN_QTY" header="STS In" className="af-col" body={(r) => serviceLib.formatNumber(r.S_IN_QTY)} style={{ textAlign: "right" }} ></AFColumn>
                    <AFColumn field="S_OUT_QTY" header="STS Out" className="af-col" body={(r) => serviceLib.formatNumber(r.S_OUT_QTY)} style={{ textAlign: "right" }} ></AFColumn>
                    <AFColumn field="S_FAC_IN_QTY" header="FAC In" className="af-col" body={(r) => serviceLib.formatNumber(r.S_FAC_IN_QTY)} style={{ textAlign: "right" }} ></AFColumn>

                    <AFColumn field="REMAIN_QTY_IN" header="Bal.STS In" className="af-col" body={(r) => serviceLib.formatNumber(r.REMAIN_QTY_IN)} style={{ textAlign: "right" }} ></AFColumn>
                    <AFColumn field="REMAIN_QTY_OUT" header="Bal.STS Out" className="af-col" body={(r) => serviceLib.formatNumber(r.REMAIN_QTY_OUT)} style={{ textAlign: "right" }} ></AFColumn>

                    <AFColumn field="REMAIN_QTY_FAC_IN" header="Bal.FAC In" className="af-col" body={(r) => serviceLib.formatNumber(r.REMAIN_QTY_FAC_IN) } style={{ textAlign: "right" }} ></AFColumn>

                    <AFColumn field="DELAY_REASON" header="Remark" style={{ width: "12rem" }} className="af-col" ></AFColumn>

                    <AFColumn field="MATL_CD1" header="Matl# 1" style={{ width: "12rem" }} className="af-col" ></AFColumn>
                    <AFColumn field="SEQ" header="Seq 1" style={{ width: "12rem" }} className="af-col" ></AFColumn>

                    <AFColumn field="PU_CD" header="PU#" style={{ width: "7rem" }} className="af-col" ></AFColumn>
                    <AFColumn field="UPD_USER" header="Upd User" style={{ width: "12rem" }} className="af-col" ></AFColumn>
                </AFDataTable>
            </div>

            <Toast ref={toast} />
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0450_DELAY_REPORT, comparisonFn);
