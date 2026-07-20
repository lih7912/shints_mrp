/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
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
import { ServiceS0512_STOCK_LIST } from "../service/service_biz/ServiceS0512_STOCK_LIST";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_STOCK_MATL = {
    FACTORY_CD: "",
    IS_STOCK_DATE: "",
    S_STOCK_DATE: "",
    E_STOCK_DATE: "",
    IS_REG_DATE: "",
    S_REG_DATE: "",
    E_REG_DATE: "",
    MATL_NAME: "",
    SPEC: "",
    KIND2: "",
    RACK: "",
    MATL_CD: "",
    COLOR: "",
    VENDOR_NAME: "",
    IS_USE_STOCK: "",
    IS_ZERO: "",
    STATUS: "",
    BUYER_CD: "",
    PO_CD: "",
};

const emptyTBL_KSV_STOCK_MATL = {
    id: 0,
    MATL_TYPE2: "",
    FACTORY_NAME: "",
    STOCK_DATE: "",
    REG_DATE: "",
    PO_CD: "",
    ORDER_CD: "",
    BUYER_NAME: "",
    VENDOR_NAME: "",
    MATL_CD: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    UNIT: "",
    STATUS: "",
    ORG_QTY: "",
    STOCK_QTY: "",
    REMAIN_QTY: "",
    USE_QTY: "",
    OUT_QTY: "",
    STOCK_IDX: "",
    ORG_STOCK_IDX: "",
    ROOT_IDX: "",
    REMARK: "",
    EXP_DATE: "",
    FACTORY_CD: "",
    MATL_SEQ: "",
    REASON: "",
    PLAN: "",
    PRICE: "",
    CURR_CD: "",
    DEBIT: "",
    REMARK0: "",
    ORG_REASON: "",
    SL: "",
};

const emptyEDT_KSV_STOCK_MATL1 = {
    RACK: "",
    LOCATION: "",
    WARE_HOUSE: "",
};

const emptyEDT_KSV_STOCK_MATL2 = {
    REASON: "",
    PLAN: "",
};

const emptyEDT_KSV_STOCK_MATL3 = {
    IN_DATE: "",
    WARE_HOUSE: "",
    RACK: "",
};

const emptyEDT_KSV_STOCK_MATL4 = {
    IN_DATE_MONTH: "",
};

const emptyEDT_KSV_STOCK_MATL5 = {
    DEBIT: "",
};

const S0512_STOCK_LIST = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0512_STOCK_LISTRef = useRef(null);
    if (!serviceS0512_STOCK_LISTRef.current) serviceS0512_STOCK_LISTRef.current = new ServiceS0512_STOCK_LIST();
    const serviceS0512_STOCK_LIST = serviceS0512_STOCK_LISTRef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const [popupDialog, setPopupDialog] = useState(false);
    const [iframeKey, setIframeKey] = useState(0);
    const [urlOrderInfo, setUrlOrderInfo] = useState("");
    const [dlgHeader, setDlgHeader] = useState("");
    const dt_iframe = useRef(null);
    const popup_STOCK_LOG = () => {
        setCreateDialogS020401_ORDER_INFO(true);
    };

    const search_LIST_1 = (argStockIdx) => {
        var _tData = { ...dataQRY_KSV_STOCK_MATL };

        if (_tData.IS_STOCK_DATE !== "1" && _tData.IS_REG_DATE !== "1") {
            toast.current.show({
                severity: "success",
                summary: "Input Error",
                detail: "Input Date -1 !!",
                life: 3000,
            });
            return;
        }
        if (_tData.S_STOCK_DATE === "" && _tData.S_REG_DATE === "") {
            toast.current.show({
                severity: "success",
                summary: "Input Error",
                detail: "Input Date -2 !!",
                life: 3000,
            });
            return;
        }
        _tData.PO_CD = _tData.PO_CD.trim();
        _tData.BUYER_CD = _tData.BUYER_CD.trim();

        // 2
        serviceS0512_STOCK_LIST.mgrQuery_LIST_1(_tData).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length,
                );
                var tArray2 = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    return tObj;
                });
                setDatasTBL_KSV_STOCK_MATL(tArray2);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    /*QRY KSV_STOCK_MATL */
    const [dataQRY_KSV_STOCK_MATL, setDataQRY_KSV_STOCK_MATL] = useState(
        emptyQRY_KSV_STOCK_MATL,
    );

    const [
        datasQRY_KSV_STOCK_MATL_FACTORY_CD,
        setDatasQRY_KSV_STOCK_MATL_FACTORY_CD,
    ] = useState([]);
    const [
        dataQRY_KSV_STOCK_MATL_FACTORY_CD,
        setDataQRY_KSV_STOCK_MATL_FACTORY_CD,
    ] = useState({});

    const onDropdownChangeQRY_KSV_STOCK_MATL_FACTORY_CD = (e, name) => {
        let val = (e.value && e.value.FACTORY_CD) || "";

        let _dataQRY_KSV_STOCK_MATL = { ...dataQRY_KSV_STOCK_MATL };

        let tTypeVal = _dataQRY_KSV_STOCK_MATL[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_STOCK_MATL[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_STOCK_MATL[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_STOCK_MATL(_dataQRY_KSV_STOCK_MATL);
        setDataQRY_KSV_STOCK_MATL_FACTORY_CD(e.value);
    };

    const onCheckboxChangeQRY_KSV_STOCK_MATL_IS_STOCK_DATE = (e, name) => {
        let val = "";
        let _dataQRY_KSV_STOCK_MATL = { ...dataQRY_KSV_STOCK_MATL };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataQRY_KSV_STOCK_MATL[`${name}`] = val;
        setDataQRY_KSV_STOCK_MATL(_dataQRY_KSV_STOCK_MATL);
    };

    const onCalChangeQRY_KSV_STOCK_MATL_S_STOCK_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_STOCK_MATL = { ...dataQRY_KSV_STOCK_MATL };
        _dataQRY_KSV_STOCK_MATL[`${name}`] = val;
        setDataQRY_KSV_STOCK_MATL(_dataQRY_KSV_STOCK_MATL);
    };

    const onCalChangeQRY_KSV_STOCK_MATL_E_STOCK_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_STOCK_MATL = { ...dataQRY_KSV_STOCK_MATL };
        _dataQRY_KSV_STOCK_MATL[`${name}`] = val;
        setDataQRY_KSV_STOCK_MATL(_dataQRY_KSV_STOCK_MATL);
    };

    const onCheckboxChangeQRY_KSV_STOCK_MATL_IS_REG_DATE = (e, name) => {
        let val = "";
        let _dataQRY_KSV_STOCK_MATL = { ...dataQRY_KSV_STOCK_MATL };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataQRY_KSV_STOCK_MATL[`${name}`] = val;
        setDataQRY_KSV_STOCK_MATL(_dataQRY_KSV_STOCK_MATL);
    };

    const onCalChangeQRY_KSV_STOCK_MATL_S_REG_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_STOCK_MATL = { ...dataQRY_KSV_STOCK_MATL };
        _dataQRY_KSV_STOCK_MATL[`${name}`] = val;
        setDataQRY_KSV_STOCK_MATL(_dataQRY_KSV_STOCK_MATL);
    };

    const onCalChangeQRY_KSV_STOCK_MATL_E_REG_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_STOCK_MATL = { ...dataQRY_KSV_STOCK_MATL };
        _dataQRY_KSV_STOCK_MATL[`${name}`] = val;
        setDataQRY_KSV_STOCK_MATL(_dataQRY_KSV_STOCK_MATL);
    };

    const onInputChangeQRY_KSV_STOCK_MATL_MATL_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_MATL = { ...dataQRY_KSV_STOCK_MATL };

        let tTypeVal = _dataQRY_KSV_STOCK_MATL[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_MATL[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_MATL[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_MATL(_dataQRY_KSV_STOCK_MATL);
    };

    const onInputChangeQRY_KSV_STOCK_MATL_SPEC = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_MATL = { ...dataQRY_KSV_STOCK_MATL };

        let tTypeVal = _dataQRY_KSV_STOCK_MATL[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_MATL[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_MATL[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_MATL(_dataQRY_KSV_STOCK_MATL);
    };

    const [datasQRY_KSV_STOCK_MATL_KIND2, setDatasQRY_KSV_STOCK_MATL_KIND2] =
        useState([]);
    const [dataQRY_KSV_STOCK_MATL_KIND2, setDataQRY_KSV_STOCK_MATL_KIND2] =
        useState({});

    const onDropdownChangeQRY_KSV_STOCK_MATL_KIND2 = (e, name) => {
        let val = (e.value && e.value.SEQ) || "";

        let _dataQRY_KSV_STOCK_MATL = { ...dataQRY_KSV_STOCK_MATL };

        let tTypeVal = _dataQRY_KSV_STOCK_MATL[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_STOCK_MATL[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_STOCK_MATL[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_STOCK_MATL(_dataQRY_KSV_STOCK_MATL);
        setDataQRY_KSV_STOCK_MATL_KIND2(e.value);
    };

    const onInputChangeQRY_KSV_STOCK_MATL_RACK = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_MATL = { ...dataQRY_KSV_STOCK_MATL };

        let tTypeVal = _dataQRY_KSV_STOCK_MATL[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_MATL[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_MATL[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_MATL(_dataQRY_KSV_STOCK_MATL);
    };

    const onInputChangeQRY_KSV_STOCK_MATL_MATL_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_MATL = { ...dataQRY_KSV_STOCK_MATL };

        let tTypeVal = _dataQRY_KSV_STOCK_MATL[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_MATL[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_MATL[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_MATL(_dataQRY_KSV_STOCK_MATL);
    };

    const onInputChangeQRY_KSV_STOCK_MATL_COLOR = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_MATL = { ...dataQRY_KSV_STOCK_MATL };

        let tTypeVal = _dataQRY_KSV_STOCK_MATL[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_MATL[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_MATL[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_MATL(_dataQRY_KSV_STOCK_MATL);
    };

    const onInputChangeQRY_KSV_STOCK_MATL_VENDOR_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_MATL = { ...dataQRY_KSV_STOCK_MATL };

        let tTypeVal = _dataQRY_KSV_STOCK_MATL[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_MATL[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_MATL[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_MATL(_dataQRY_KSV_STOCK_MATL);
    };

    const onCheckboxChangeQRY_KSV_STOCK_MATL_IS_USE_STOCK = (e, name) => {
        let val = "";
        let _dataQRY_KSV_STOCK_MATL = { ...dataQRY_KSV_STOCK_MATL };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataQRY_KSV_STOCK_MATL[`${name}`] = val;
        setDataQRY_KSV_STOCK_MATL(_dataQRY_KSV_STOCK_MATL);
    };

    const onCheckboxChangeQRY_KSV_STOCK_MATL_IS_ZERO = (e, name) => {
        let val = "";
        let _dataQRY_KSV_STOCK_MATL = { ...dataQRY_KSV_STOCK_MATL };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataQRY_KSV_STOCK_MATL[`${name}`] = val;
        setDataQRY_KSV_STOCK_MATL(_dataQRY_KSV_STOCK_MATL);
    };

    const [datasQRY_KSV_STOCK_MATL_STATUS, setDatasQRY_KSV_STOCK_MATL_STATUS] =
        useState([]);
    const [dataQRY_KSV_STOCK_MATL_STATUS, setDataQRY_KSV_STOCK_MATL_STATUS] =
        useState({});

    const onDropdownChangeQRY_KSV_STOCK_MATL_STATUS = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_STOCK_MATL = { ...dataQRY_KSV_STOCK_MATL };

        let tTypeVal = _dataQRY_KSV_STOCK_MATL[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_STOCK_MATL[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_STOCK_MATL[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_STOCK_MATL(_dataQRY_KSV_STOCK_MATL);
        setDataQRY_KSV_STOCK_MATL_STATUS(e.value);
    };

    const [
        datasQRY_KSV_STOCK_MATL_BUYER_CD,
        setDatasQRY_KSV_STOCK_MATL_BUYER_CD,
    ] = useState([]);
    const [
        dataQRY_KSV_STOCK_MATL_BUYER_CD,
        setDataQRY_KSV_STOCK_MATL_BUYER_CD,
    ] = useState({});

    const onDropdownChangeQRY_KSV_STOCK_MATL_BUYER_CD = (e, name) => {
        let val = (e.value && e.value.BUYER_CD) || "";

        let _dataQRY_KSV_STOCK_MATL = { ...dataQRY_KSV_STOCK_MATL };

        let tTypeVal = _dataQRY_KSV_STOCK_MATL[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_STOCK_MATL[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_STOCK_MATL[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_STOCK_MATL(_dataQRY_KSV_STOCK_MATL);
        setDataQRY_KSV_STOCK_MATL_BUYER_CD(e.value);
    };

    const [datasQRY_KSV_STOCK_MATL_PO_CD, setDatasQRY_KSV_STOCK_MATL_PO_CD] =
        useState([]);
    const [dataQRY_KSV_STOCK_MATL_PO_CD, setDataQRY_KSV_STOCK_MATL_PO_CD] =
        useState({});

    const onDropdownChangeQRY_KSV_STOCK_MATL_PO_CD = (e, name) => {
        let val = (e.value && e.value.PO_CD) || "";

        let _dataQRY_KSV_STOCK_MATL = { ...dataQRY_KSV_STOCK_MATL };

        let tTypeVal = _dataQRY_KSV_STOCK_MATL[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_STOCK_MATL[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_STOCK_MATL[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_STOCK_MATL(_dataQRY_KSV_STOCK_MATL);
        setDataQRY_KSV_STOCK_MATL_PO_CD(e.value);
    };

    /*TABLE KSV_STOCK_MATL */
    // DEFINE DATAGRID : TBL_KSV_STOCK_MATL
    const [datasTBL_KSV_STOCK_MATL, setDatasTBL_KSV_STOCK_MATL] = useState([]);
    const dt_TBL_KSV_STOCK_MATL = useRef(null);
    const [dataTBL_KSV_STOCK_MATL, setDataTBL_KSV_STOCK_MATL] = useState(
        emptyTBL_KSV_STOCK_MATL,
    );
    const [selectedTBL_KSV_STOCK_MATL, setSelectedTBL_KSV_STOCK_MATL] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_STOCK_MATL,
        setFlagSelectModeTBL_KSV_STOCK_MATL,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_STOCK_MATL

    const onRowClick1TBL_KSV_STOCK_MATL = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        localStorage.setItem("S0512_DATA", JSON.stringify(argData));

        let argTBL_KSV_STOCK_MATL = argData;

        setDataTBL_KSV_STOCK_MATL(argTBL_KSV_STOCK_MATL);

        var tObj1 = { ...dataEDT_KSV_STOCK_MATL1 };
        tObj1.RACK = argData.RACK;
        tObj1.LOCATION = argData.LOCATION;
        tObj1.WARE_HOUSE = argData.WARE_NAME;
        setDataEDT_KSV_STOCK_MATL1(tObj1);

        editEDT_KSV_STOCK_MATL1_WARE_HOUSE(argData.WARE_NAME);

        var tObj2 = { ...dataEDT_KSV_STOCK_MATL2 };
        tObj2.REASON = argData.REASON_REMARK;
        tObj2.PLAN = argData.PLAN_REMARK;
        setDataEDT_KSV_STOCK_MATL2(tObj2);

        editEDT_KSV_STOCK_MATL2_REASON(argData.REASON);

        var tObj3 = { ...dataEDT_KSV_STOCK_MATL3 };
        tObj3.IN_DATE = argData.STOCK_DATE;
        tObj3.WARE_HOUSE = argData.WARE_NAME;
        tObj3.RACK = argData.RACK;
        setDataEDT_KSV_STOCK_MATL3(tObj3);

        editEDT_KSV_STOCK_MATL3_WARE_HOUSE(argData.WARE_NAME);
    };

    const onRowDoubleClickTBL_KSV_STOCK_MATL = (event) => {
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
        // tUrl1 += "S020401_ORDER_INFO?ORDER_CD=" + event.data.ORDER_CD;
        tUrl1 += "S051201_STOCK_QTY_UPDATE_LOG?ROOT_IDX=" + event.data.ROOT_IDX;
        setUrlOrderInfo(tUrl1);
        setDlgHeader("재고조회");

        // localStorage.setItem('AF_S0204_ORDER_CD', event.data.ORDER_CD);
        console.log("set order info: " + event.data.ORDER_CD);
        popup_STOCK_LOG();
    };

    const onRowClickTBL_KSV_STOCK_MATL = (event) => {
        let argTBL_KSV_STOCK_MATL = event.data;
        if (flagSelectModeTBL_KSV_STOCK_MATL) return;

        // Service : NawooAll:mgrQueryTBL_KSV_STOCK_MATL
    };

    const exportExcelTBL_KSV_STOCK_MATL = () => {};

    /**EDIT KSV_STOCK_MATL1 */
    const [datasEDT_KSV_STOCK_MATL1, setDatasEDT_KSV_STOCK_MATL1] = useState(
        [],
    );
    const [dataEDT_KSV_STOCK_MATL1, setDataEDT_KSV_STOCK_MATL1] = useState(
        emptyEDT_KSV_STOCK_MATL1,
    );

    const onInputChangeEDT_KSV_STOCK_MATL1_RACK = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_STOCK_MATL1 = { ...dataEDT_KSV_STOCK_MATL1 };

        let tTypeVal = _dataEDT_KSV_STOCK_MATL1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_STOCK_MATL1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_STOCK_MATL1[`${name}`] = parseInt(val);

        setDataEDT_KSV_STOCK_MATL1(_dataEDT_KSV_STOCK_MATL1);
    };

    const onInputChangeEDT_KSV_STOCK_MATL1_LOCATION = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_STOCK_MATL1 = { ...dataEDT_KSV_STOCK_MATL1 };

        let tTypeVal = _dataEDT_KSV_STOCK_MATL1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_STOCK_MATL1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_STOCK_MATL1[`${name}`] = parseInt(val);

        setDataEDT_KSV_STOCK_MATL1(_dataEDT_KSV_STOCK_MATL1);
    };

    const [
        datasEDT_KSV_STOCK_MATL1_WARE_HOUSE,
        setDatasEDT_KSV_STOCK_MATL1_WARE_HOUSE,
    ] = useState([]);
    const [
        dataEDT_KSV_STOCK_MATL1_WARE_HOUSE,
        setDataEDT_KSV_STOCK_MATL1_WARE_HOUSE,
    ] = useState({});

    const editEDT_KSV_STOCK_MATL1_WARE_HOUSE = (argValue) => {
        let _dataEDT_KSV_STOCK_MATL1_WARE_HOUSE =
            datasEDT_KSV_STOCK_MATL1_WARE_HOUSE.filter(
                (val) => val.FACTORY_CD === argValue,
            );
        setDataEDT_KSV_STOCK_MATL1_WARE_HOUSE(
            _dataEDT_KSV_STOCK_MATL1_WARE_HOUSE[0],
        );
    };

    const onDropdownChangeEDT_KSV_STOCK_MATL1_WARE_HOUSE = (e, name) => {
        let val = (e.value && e.value.FACTORY_CD) || "";

        let _dataEDT_KSV_STOCK_MATL1 = { ...dataEDT_KSV_STOCK_MATL1 };

        let tTypeVal = _dataEDT_KSV_STOCK_MATL1[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_STOCK_MATL1[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_STOCK_MATL1[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_STOCK_MATL1(_dataEDT_KSV_STOCK_MATL1);
        setDataEDT_KSV_STOCK_MATL1_WARE_HOUSE(e.value);
    };

    /**EDIT KSV_STOCK_MATL2 */
    const [datasEDT_KSV_STOCK_MATL2, setDatasEDT_KSV_STOCK_MATL2] = useState(
        [],
    );
    const [dataEDT_KSV_STOCK_MATL2, setDataEDT_KSV_STOCK_MATL2] = useState(
        emptyEDT_KSV_STOCK_MATL2,
    );

    const [
        datasEDT_KSV_STOCK_MATL2_REASON,
        setDatasEDT_KSV_STOCK_MATL2_REASON,
    ] = useState([]);
    const [dataEDT_KSV_STOCK_MATL2_REASON, setDataEDT_KSV_STOCK_MATL2_REASON] =
        useState({});

    const editEDT_KSV_STOCK_MATL2_REASON = (argValue) => {
        let _dataEDT_KSV_STOCK_MATL2_REASON =
            datasEDT_KSV_STOCK_MATL2_REASON.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_STOCK_MATL2_REASON(_dataEDT_KSV_STOCK_MATL2_REASON[0]);
    };

    const onDropdownChangeEDT_KSV_STOCK_MATL2_REASON = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_STOCK_MATL2 = { ...dataEDT_KSV_STOCK_MATL2 };

        let tTypeVal = _dataEDT_KSV_STOCK_MATL2[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_STOCK_MATL2[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_STOCK_MATL2[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_STOCK_MATL2(_dataEDT_KSV_STOCK_MATL2);
        setDataEDT_KSV_STOCK_MATL2_REASON(e.value);
    };

    const onInputChangeEDT_KSV_STOCK_MATL2_PLAN = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_STOCK_MATL2 = { ...dataEDT_KSV_STOCK_MATL2 };

        let tTypeVal = _dataEDT_KSV_STOCK_MATL2[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_STOCK_MATL2[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_STOCK_MATL2[`${name}`] = parseInt(val);

        setDataEDT_KSV_STOCK_MATL2(_dataEDT_KSV_STOCK_MATL2);
    };

    /**EDIT KSV_STOCK_MATL3 */
    const [datasEDT_KSV_STOCK_MATL3, setDatasEDT_KSV_STOCK_MATL3] = useState(
        [],
    );
    const [dataEDT_KSV_STOCK_MATL3, setDataEDT_KSV_STOCK_MATL3] = useState(
        emptyEDT_KSV_STOCK_MATL3,
    );

    const onCalChangeEDT_KSV_STOCK_MATL3_IN_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_STOCK_MATL3 = { ...dataEDT_KSV_STOCK_MATL3 };
        _dataEDT_KSV_STOCK_MATL3[`${name}`] = val;
        setDataEDT_KSV_STOCK_MATL3(_dataEDT_KSV_STOCK_MATL3);
    };

    const [
        datasEDT_KSV_STOCK_MATL3_WARE_HOUSE,
        setDatasEDT_KSV_STOCK_MATL3_WARE_HOUSE,
    ] = useState([]);
    const [
        dataEDT_KSV_STOCK_MATL3_WARE_HOUSE,
        setDataEDT_KSV_STOCK_MATL3_WARE_HOUSE,
    ] = useState({});

    const editEDT_KSV_STOCK_MATL3_WARE_HOUSE = (argValue) => {
        let _dataEDT_KSV_STOCK_MATL3_WARE_HOUSE =
            datasEDT_KSV_STOCK_MATL3_WARE_HOUSE.filter(
                (val) => val.FACTORY_CD === argValue,
            );
        setDataEDT_KSV_STOCK_MATL3_WARE_HOUSE(
            _dataEDT_KSV_STOCK_MATL3_WARE_HOUSE[0],
        );
    };

    const onDropdownChangeEDT_KSV_STOCK_MATL3_WARE_HOUSE = (e, name) => {
        let val = (e.value && e.value.FACTORY_CD) || "";

        let _dataEDT_KSV_STOCK_MATL3 = { ...dataEDT_KSV_STOCK_MATL3 };

        let tTypeVal = _dataEDT_KSV_STOCK_MATL3[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_STOCK_MATL3[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_STOCK_MATL3[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_STOCK_MATL3(_dataEDT_KSV_STOCK_MATL3);
        setDataEDT_KSV_STOCK_MATL3_WARE_HOUSE(e.value);
    };

    const onInputChangeEDT_KSV_STOCK_MATL3_RACK = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_STOCK_MATL3 = { ...dataEDT_KSV_STOCK_MATL3 };

        let tTypeVal = _dataEDT_KSV_STOCK_MATL3[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_STOCK_MATL3[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_STOCK_MATL3[`${name}`] = parseInt(val);

        setDataEDT_KSV_STOCK_MATL3(_dataEDT_KSV_STOCK_MATL3);
    };

    /**EDIT KSV_STOCK_MATL4 */
    const [datasEDT_KSV_STOCK_MATL4, setDatasEDT_KSV_STOCK_MATL4] = useState(
        [],
    );
    const [dataEDT_KSV_STOCK_MATL4, setDataEDT_KSV_STOCK_MATL4] = useState(
        emptyEDT_KSV_STOCK_MATL4,
    );

    const onCalChangeEDT_KSV_STOCK_MATL4_IN_DATE_MONTH = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_STOCK_MATL4 = { ...dataEDT_KSV_STOCK_MATL4 };
        _dataEDT_KSV_STOCK_MATL4[`${name}`] = val;
        setDataEDT_KSV_STOCK_MATL4(_dataEDT_KSV_STOCK_MATL4);
    };

    /**EDIT KSV_STOCK_MATL5 */
    const [datasEDT_KSV_STOCK_MATL5, setDatasEDT_KSV_STOCK_MATL5] = useState(
        [],
    );
    const [dataEDT_KSV_STOCK_MATL5, setDataEDT_KSV_STOCK_MATL5] = useState(
        emptyEDT_KSV_STOCK_MATL5,
    );

    const onInputChangeEDT_KSV_STOCK_MATL5_DEBIT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_STOCK_MATL5 = { ...dataEDT_KSV_STOCK_MATL5 };

        let tTypeVal = _dataEDT_KSV_STOCK_MATL5[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_STOCK_MATL5[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_STOCK_MATL5[`${name}`] = parseInt(val);

        setDataEDT_KSV_STOCK_MATL5(_dataEDT_KSV_STOCK_MATL5);
    };

    useEffect(() => {
        var _tObj = {};
        _tObj.PO_CD = "";
        _tObj.FACTORY_CD = "";

        serviceS0512_STOCK_LIST.mgrQuery_CODE(_tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasQRY_KSV_STOCK_MATL_FACTORY_CD(data.FACTORY_CD);
                setDataQRY_KSV_STOCK_MATL_FACTORY_CD(data.FACTORY_CD[0]);

                setDatasQRY_KSV_STOCK_MATL_KIND2(data.MATL_TYPE2);
                setDataQRY_KSV_STOCK_MATL_KIND2(data.MATL_TYPE2[0]);

                setDatasQRY_KSV_STOCK_MATL_STATUS(data.STOCK_STATUS_S);
                setDataQRY_KSV_STOCK_MATL_STATUS(data.STOCK_STATUS_S[0]);

                setDatasQRY_KSV_STOCK_MATL_BUYER_CD(data.BUYER_CD);
                setDataQRY_KSV_STOCK_MATL_BUYER_CD(data.BUYER_CD[0]);

                setDatasQRY_KSV_STOCK_MATL_PO_CD(data.PO_CD);
                setDataQRY_KSV_STOCK_MATL_PO_CD(data.PO_CD[0]);

                setDatasEDT_KSV_STOCK_MATL1_WARE_HOUSE(data.FACTORY_WARE);
                setDataEDT_KSV_STOCK_MATL1_WARE_HOUSE(data.FACTORY_WARE[0]);

                setDatasEDT_KSV_STOCK_MATL2_REASON(data.REASON_REMARK);
                setDataEDT_KSV_STOCK_MATL2_REASON(data.REASON_REMARK[0]);

                setDatasEDT_KSV_STOCK_MATL3_WARE_HOUSE(data.FACTORY_WARE);
                setDataEDT_KSV_STOCK_MATL3_WARE_HOUSE(data.FACTORY_WARE[0]);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    }, []);

    const blankFn = () => {};

    // IFRAME_CODE : MgrKcdBankReg
    const [createDialogS020401_ORDER_INFO, setCreateDialogS020401_ORDER_INFO] =
        useState(false);
    const [urlS020401_ORDER_INFO, setUrlS020401_ORDER_INFO] = useState("");

    const createDialogFooterS020401_ORDER_INFO = (
        <>
            <Button
                label="Cancel"
                icon="pi pi-times"
                className="p-button-text"
                onClick={hideDialogS020401_ORDER_INFO}
            />
        </>
    );

    const hideDialogS020401_ORDER_INFO = () => {
        setCreateDialogS020401_ORDER_INFO(false);
        // console.log("hideDialogMgrKcdBankReg=>" + dataKCD_VENDOR.VENDOR_CD);
    };

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

    return (
        <div>
            <div
                style={{
                    marginLeft: "1rem",
                    marginTop: "1rem",
                    width: "100rem",
                    height: "10rem",
                }}
            >
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "90rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Factory</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                    >
                        <Dropdown
                            id="id_FACTORY_CD"
                            value={dataQRY_KSV_STOCK_MATL_FACTORY_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_STOCK_MATL_FACTORY_CD(
                                    e,
                                    "FACTORY_CD",
                                )
                            }
                            options={datasQRY_KSV_STOCK_MATL_FACTORY_CD}
                            optionLabel="FACTORY_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "10rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Stock Date</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "1rem",
                        }}
                    >
                        <Checkbox
                            style={{
                                display: "inline-block",
                                width: "1rem",
                                marginLeft: "0.5rem",
                            }}
                            id="id_IS_STOCK_DATE"
                            checked={changeCheckBoxVal(
                                dataQRY_KSV_STOCK_MATL.IS_STOCK_DATE,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeQRY_KSV_STOCK_MATL_IS_STOCK_DATE(
                                    e,
                                    "IS_STOCK_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "11rem",
                    }}
                >
                    {/* <p style={{ width: '8rem', display: 'inline-block' }}> . </p> */}
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "10rem",
                        }}
                    >
                        <Calendar
                            showButtonBar
                            dateFormat="yy-mm-dd"
                            id="id_S_STOCK_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_STOCK_MATL.S_STOCK_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_STOCK_MATL_S_STOCK_DATE(
                                    e,
                                    "S_STOCK_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "12rem",
                    }}
                >
                    <p style={{ width: "1rem", display: "inline-block" }}>~</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "10rem",
                        }}
                    >
                        <Calendar
                            showButtonBar
                            dateFormat="yy-mm-dd"
                            id="id_E_STOCK_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_STOCK_MATL.E_STOCK_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_STOCK_MATL_E_STOCK_DATE(
                                    e,
                                    "E_STOCK_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "17rem",
                    }}
                >
                    <p style={{ width: "6rem", display: "inline-block" }}>Rack</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "10rem",
                        }}
                        id="id_RACK"
                        value={dataQRY_KSV_STOCK_MATL.RACK}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_STOCK_MATL_RACK(e, "RACK")
                        }
                    />
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "10rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Use Stock</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "1rem",
                        }}
                    >
                        <Checkbox
                            style={{
                                display: "inline-block",
                                width: "1rem",
                                marginLeft: "0.5rem",
                            }}
                            id="id_IS_USE_STOCK"
                            checked={changeCheckBoxVal(
                                dataQRY_KSV_STOCK_MATL.IS_USE_STOCK,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeQRY_KSV_STOCK_MATL_IS_USE_STOCK(
                                    e,
                                    "IS_USE_STOCK",
                                )
                            }
                        />
                    </div>
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "28rem",
                    }}
                >
                    <p style={{ width: "5rem", display: "inline-block" }}>Zero</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "1rem",
                        }}
                    >
                        <Checkbox
                            style={{
                                display: "inline-block",
                                width: "1rem",
                                marginLeft: "0.5rem",
                            }}
                            id="id_IS_ZERO"
                            checked={changeCheckBoxVal(
                                dataQRY_KSV_STOCK_MATL.IS_ZERO,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeQRY_KSV_STOCK_MATL_IS_ZERO(
                                    e,
                                    "IS_ZERO",
                                )
                            }
                        />
                    </div>
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "10rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Reg Date</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "1rem",
                        }}
                    >
                        <Checkbox
                            style={{
                                display: "inline-block",
                                width: "1rem",
                                marginLeft: "0.5rem",
                            }}
                            id="id_IS_REG_DATE"
                            checked={changeCheckBoxVal(
                                dataQRY_KSV_STOCK_MATL.IS_REG_DATE,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeQRY_KSV_STOCK_MATL_IS_REG_DATE(
                                    e,
                                    "IS_REG_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "11rem",
                    }}
                >
                    {/* <p style={{ width: '8rem', display: 'inline-block' }}> . </p> */}
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "10rem",
                        }}
                    >
                        <Calendar
                            showButtonBar
                            dateFormat="yy-mm-dd"
                            id="id_S_REG_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_STOCK_MATL.S_REG_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_STOCK_MATL_S_REG_DATE(
                                    e,
                                    "S_REG_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "12rem",
                    }}
                >
                    <p style={{ width: "1rem", display: "inline-block" }}>~</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "10rem",
                        }}
                    >
                        <Calendar
                            showButtonBar
                            dateFormat="yy-mm-dd"
                            id="id_E_REG_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_STOCK_MATL.E_REG_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_STOCK_MATL_E_REG_DATE(
                                    e,
                                    "E_REG_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "15rem",
                    }}
                >
                    <p style={{ width: "6rem", display: "inline-block" }}>Matl Cd</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "8rem",
                        }}
                        id="id_MATL_CD"
                        value={dataQRY_KSV_STOCK_MATL.MATL_CD}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_STOCK_MATL_MATL_CD(
                                e,
                                "MATL_CD",
                            )
                        }
                    />
                </span>
                <span style={{ display: "inline-block" }}>
                    <Button
                        label="MON Inq"
                        style={{ height: "1.1rem" }}
                        className="p-button-text"
                        onClick={blankFn}
                    />
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "33rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Status</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                    >
                        <Dropdown
                            id="id_STATUS"
                            value={dataQRY_KSV_STOCK_MATL_STATUS}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_STOCK_MATL_STATUS(
                                    e,
                                    "STATUS",
                                )
                            }
                            options={datasQRY_KSV_STOCK_MATL_STATUS}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "32rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Description</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "18rem",
                        }}
                        id="id_MATL_NAME"
                        value={dataQRY_KSV_STOCK_MATL.MATL_NAME}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_STOCK_MATL_MATL_NAME(
                                e,
                                "MATL_NAME",
                            )
                        }
                    />
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "24rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Color</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "8rem",
                        }}
                        id="id_COLOR"
                        value={dataQRY_KSV_STOCK_MATL.COLOR}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_STOCK_MATL_COLOR(e, "COLOR")
                        }
                    />
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "27rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Buyer</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "18rem",
                        }}
                    >
                        <Dropdown
                            id="id_BUYER_CD"
                            value={dataQRY_KSV_STOCK_MATL_BUYER_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_STOCK_MATL_BUYER_CD(
                                    e,
                                    "BUYER_CD",
                                )
                            }
                            options={datasQRY_KSV_STOCK_MATL_BUYER_CD}
                            optionLabel="BUYER_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span style={{ display: "inline-block" }}>
                    <Button
                        label="Buyer Upd"
                        style={{ height: "1.1rem" }}
                        className="p-button-text"
                        onClick={blankFn}
                    />
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "32rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Spec</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "18rem",
                        }}
                        id="id_SPEC"
                        value={dataQRY_KSV_STOCK_MATL.SPEC}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_STOCK_MATL_SPEC(e, "SPEC")
                        }
                    />
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "25rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Supplier</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "15rem",
                        }}
                        id="id_VENDOR_NAME"
                        value={dataQRY_KSV_STOCK_MATL.VENDOR_NAME}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_STOCK_MATL_VENDOR_NAME(
                                e,
                                "VENDOR_NAME",
                            )
                        }
                    />
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "18rem",
                    }}
                >
                    <p style={{ width: "7rem", display: "inline-block" }}>Po</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "10rem",
                        }}
                    >
                        <Dropdown
                            id="id_PO_CD"
                            value={dataQRY_KSV_STOCK_MATL_PO_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_STOCK_MATL_PO_CD(
                                    e,
                                    "PO_CD",
                                )
                            }
                            options={datasQRY_KSV_STOCK_MATL_PO_CD}
                            optionLabel="PO_CD"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span style={{ display: "inline-block" }}>
                    <Button
                        label="PO Upd"
                        style={{ height: "1.1rem" }}
                        className="p-button-text"
                        onClick={blankFn}
                    />
                </span>

                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "27rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Kind2</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "18rem",
                        }}
                    >
                        <Dropdown
                            id="id_KIND2"
                            value={dataQRY_KSV_STOCK_MATL_KIND2}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_STOCK_MATL_KIND2(
                                    e,
                                    "KIND2",
                                )
                            }
                            options={datasQRY_KSV_STOCK_MATL_KIND2}
                            optionLabel="MATL_TYPE2"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span style={{ display: "inline-block" }}>
                    <Button
                        label="Kind Upd"
                        style={{ height: "1.1rem" }}
                        className="p-button-text"
                        onClick={blankFn}
                    />
                </span>
                <span style={{ display: "inline-block", marginLeft: "4rem" }}>
                    <Button
                        label="기간,바이어별 재고현황"
                        style={{ height: "1.1rem" }}
                        className="p-button-text"
                        onClick={blankFn}
                    />

                    <Button
                        label="R"
                        style={{ height: "1.1rem" }}
                        className="p-button-text"
                        onClick={blankFn}
                    />
                    <Button
                        label="기타"
                        style={{ height: "1.1rem" }}
                        className="p-button-text"
                        onClick={blankFn}
                    />
                    <Button
                        label="비용X"
                        style={{ height: "1.1rem" }}
                        className="p-button-text"
                        onClick={blankFn}
                    />
                    <Button
                        label="GUIHA"
                        style={{ height: "1.1rem" }}
                        className="p-button-text"
                        onClick={blankFn}
                    />
                    <Button
                        label="Gore Sealing"
                        style={{ height: "1.1rem" }}
                        className="p-button-text"
                        onClick={blankFn}
                    />
                </span>
                <span style={{ display: "inline-block", marginLeft: "3rem" }}>
                    <Tooltip
                        className="menuCodeTooltip"
                        target={`#btnSearch`}
                        content={`Alt+S`}
                        position="bottom"
                    />
                    <Button
                        label={
                            <span>
                                Search(<u>S</u>)
                            </span>
                        }
                        accessKey="S"
                        id="btnSearch"
                        style={{ height: "1.1rem" }}
                        icon="pi pi-search"
                        className="p-button-text"
                        onClick={search_LIST_1}
                    />

                    <Button
                        label="Excel"
                        style={{ height: "1.1rem", color: "green" }}
                        icon="pi pi-upload"
                        className="p-button-text"
                        onClick={exportExcelTBL_KSV_STOCK_MATL}
                    />
                </span>
            </div>
            <div style={{ width: "100rem", height: "2rem" }}></div>

            <div
                style={{
                    marginLeft: "1rem",
                    marginTop: "1rem",
                    width: "99rem",
                    height: "22rem",
                }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_STOCK_MATL}
                    size="small"
                    value={datasTBL_KSV_STOCK_MATL}
                    resizableColumns
                    columnResizeMode="fit"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_STOCK_MATL}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_STOCK_MATL(true);
                        setSelectedTBL_KSV_STOCK_MATL(e.value);
                        console.log(
                            "selected length:" +
                                selectedTBL_KSV_STOCK_MATL.length,
                        );
                        onRowClick1TBL_KSV_STOCK_MATL(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_STOCK_MATL}
                    dataKey="id"
                    className="datatable-responsive"
                    onRowDoubleClick={onRowDoubleClickTBL_KSV_STOCK_MATL}
                    virtualScrollerOptions={{ itemSize: 9 }}
                    emptyMessage=" " //header={headerTBL_KSV_STOCK_MATL}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="18rem"
                >
                    <AFColumn field="MATL_TYPE2" headerClassName="t-header" header="Matl Type2" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="FACTORY_NAME" headerClassName="t-header" header="Factory" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="STOCK_DATE" headerClassName="t-header" header="Stock Date" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="REG_DATE" headerClassName="t-header" header="Reg Date" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="PO_CD" headerClassName="t-header" header="PO" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="ORDER_CD" headerClassName="t-header" header="Order" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="BUYER_NAME" headerClassName="t-header" header="Buyer" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Supplier" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="MATL_CD" headerClassName="t-header" header="Matl Cd" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="MATL_NAME" headerClassName="t-header" header="Description" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="COLOR" headerClassName="t-header" header="Color" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="SPEC" headerClassName="t-header" header="Spec" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="UNIT" headerClassName="t-header" header="Unit" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="STOCK_STATUS" headerClassName="t-header" header="Status" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="TOTAL_QTY" headerClassName="t-header" header="Org Qty" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="STOCK_QTY" headerClassName="t-header" header="Stock Qty" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="REMAIN_QTY" headerClassName="t-header" header="Remain Qty" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="USE_QTY" headerClassName="t-header" header="Use Qty" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="OUT_QTY" headerClassName="t-header" header="Out Qty" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="RACK" headerClassName="t-header" header="Rack" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="LOCATION" headerClassName="t-header" header="Location" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="WARE_NAME" headerClassName="t-header" header="Ware Name" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="WARE_DATE" headerClassName="t-header" header="Ware Date" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="WARE_QTY" headerClassName="t-header" header="Ware Qty" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="PO_SEQ" headerClassName="t-header" header="Po Seq" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="MRP_SEQ" headerClassName="t-header" header="Mrp Seq" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="STOCK_IDX" headerClassName="t-header" header="Stock Idx" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="ORG_STOCK_IDX" headerClassName="t-header" header="Org Stock Idx" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="ROOT_IDX" headerClassName="t-header" header="root Idx" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="REMARK" headerClassName="t-header" header="Remark" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="EXP_DATE" headerClassName="t-header" header="exp" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="FACTORY_CD" headerClassName="t-header" header="Factory Cd" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="MATL_SEQ" headerClassName="t-header" header="Matl Seq" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="REASON_REMARK_N" headerClassName="t-header" header="Reason" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="PLAN_REASON" headerClassName="t-header" header="Plan" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="MATL_PRICE" headerClassName="t-header" header="Price" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="CURR_CD" headerClassName="t-header" header="Curr" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="DEBIT_CD" headerClassName="t-header" header="Debit" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="REMARK0" headerClassName="t-header" header="Remark0" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="REASON_REMARK" headerClassName="t-header" header="Reason Remark" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="ORG_REASON" headerClassName="t-header" header="Org" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="SL_N" headerClassName="t-header" header="S/L" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                </AFDataTable>
            </div>

            <Divider />

            <div style={{ width: "100rem", height: "20rem" }}>
                <div className="flex flex-row justify-content-start align-items-top">
                    <div style={{ width: "60rem", height: "20rem" }}>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "25rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Date</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "15rem",
                                }}
                            >
                                <Calendar
                                    showButtonBar
                                    dateFormat="yy-mm-dd"
                                    id="id_IN_DATE"
                                    value={changeDateVal(
                                        dataEDT_KSV_STOCK_MATL3.IN_DATE,
                                    )}
                                    onChange={(e) =>
                                        onCalChangeEDT_KSV_STOCK_MATL3_IN_DATE(
                                            e,
                                            "IN_DATE",
                                        )
                                    }
                                />
                            </div>
                        </span>
                        <span style={{ display: "inline-block" }}>
                            <Button
                                label="exp"
                                style={{ height: "1.1rem" }}
                                className="p-button-text"
                                onClick={blankFn}
                            />
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "33rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Month</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                            >
                                <Calendar
                                    showButtonBar
                                    dateFormat="yy-mm-dd"
                                    id="id_IN_DATE_MONTH"
                                    value={changeDateVal(
                                        dataEDT_KSV_STOCK_MATL4.IN_DATE_MONTH,
                                    )}
                                    onChange={(e) =>
                                        onCalChangeEDT_KSV_STOCK_MATL4_IN_DATE_MONTH(
                                            e,
                                            "IN_DATE_MONTH",
                                        )
                                    }
                                />
                            </div>
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "26rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>WareHouse</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "16rem",
                                }}
                            >
                                <Dropdown
                                    id="id_WARE_HOUSE"
                                    value={dataEDT_KSV_STOCK_MATL3_WARE_HOUSE}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KSV_STOCK_MATL3_WARE_HOUSE(
                                            e,
                                            "WARE_HOUSE",
                                        )
                                    }
                                    options={
                                        datasEDT_KSV_STOCK_MATL3_WARE_HOUSE
                                    }
                                    optionLabel="WARE_NAME"
                                    placeholder=""
                                    editable
                                ></Dropdown>
                            </div>
                        </span>
                        <span style={{ display: "inline-block" }}>
                            <Button
                                label="Fac I/O Use.ETC.Move"
                                style={{ height: "1.1rem" }}
                                className="p-button-text"
                                onClick={blankFn}
                            />
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "33rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Rack</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_RACK"
                                value={dataEDT_KSV_STOCK_MATL3.RACK}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_STOCK_MATL3_RACK(
                                        e,
                                        "RACK",
                                    )
                                }
                            />
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "33rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Debit</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_DEBIT"
                                value={dataEDT_KSV_STOCK_MATL5.DEBIT}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_STOCK_MATL5_DEBIT(
                                        e,
                                        "DEBIT",
                                    )
                                }
                            />
                        </span>
                        <span style={{ display: "inline-block" }}>
                            <Button
                                label="Warehouse in"
                                style={{ height: "1.1rem" }}
                                className="p-button-text"
                                onClick={blankFn}
                            />

                            <Button
                                label="Debit Update"
                                style={{ height: "1.1rem" }}
                                className="p-button-text"
                                onClick={blankFn}
                            />
                        </span>
                    </div>
                    <Divider
                        layout="vertical"
                        style={{ float: "left", height: "20.5rem" }}
                    />

                    <div style={{ width: "40rem", height: "20rem" }}>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "33rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Rack</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_RACK"
                                value={dataEDT_KSV_STOCK_MATL1.RACK}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_STOCK_MATL1_RACK(
                                        e,
                                        "RACK",
                                    )
                                }
                            />
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "33rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Location</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_LOCATION"
                                value={dataEDT_KSV_STOCK_MATL1.LOCATION}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_STOCK_MATL1_LOCATION(
                                        e,
                                        "LOCATION",
                                    )
                                }
                            />
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "28rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>W/H</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "18rem",
                                }}
                            >
                                <Dropdown
                                    id="id_WARE_HOUSE"
                                    value={dataEDT_KSV_STOCK_MATL1_WARE_HOUSE}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KSV_STOCK_MATL1_WARE_HOUSE(
                                            e,
                                            "WARE_HOUSE",
                                        )
                                    }
                                    options={
                                        datasEDT_KSV_STOCK_MATL1_WARE_HOUSE
                                    }
                                    optionLabel="WARE_NAME"
                                    placeholder=""
                                    editable
                                ></Dropdown>
                            </div>
                        </span>
                        <span style={{ display: "inline-block" }}>
                            <Button
                                label="Upd"
                                style={{ height: "1.1rem" }}
                                className="p-button-text"
                                onClick={blankFn}
                            />
                        </span>

                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "33rem",
                                marginTop: "2.5rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Reason</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                            >
                                <Dropdown
                                    id="id_REASON"
                                    value={dataEDT_KSV_STOCK_MATL2_REASON}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KSV_STOCK_MATL2_REASON(
                                            e,
                                            "REASON",
                                        )
                                    }
                                    options={datasEDT_KSV_STOCK_MATL2_REASON}
                                    optionLabel="CD_NAME"
                                    placeholder=""
                                    editable
                                ></Dropdown>
                            </div>
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "28rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Plan</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "18rem",
                                }}
                                id="id_PLAN"
                                value={dataEDT_KSV_STOCK_MATL2.PLAN}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_STOCK_MATL2_PLAN(
                                        e,
                                        "PLAN",
                                    )
                                }
                            />
                        </span>
                        <span style={{ display: "inline-block" }}>
                            <Button
                                label="Upd"
                                style={{ height: "1.1rem" }}
                                className="p-button-text"
                                onClick={blankFn}
                            />

                            <Button
                                label="W/N"
                                style={{ height: "1.1rem" }}
                                className="p-button-text"
                                onClick={blankFn}
                            />
                        </span>
                        <span
                            style={{
                                display: "inline-block",
                                marginTop: "1rem",
                                marginLeft: "8rem",
                            }}
                        >
                            <div>
                                <Button
                                    label="MOQ"
                                    style={{ height: "1.1rem" }}
                                    className="p-button-text"
                                    onClick={blankFn}
                                />

                                <Button
                                    label="Inquiry"
                                    style={{ height: "1.1rem" }}
                                    className="p-button-text"
                                    onClick={search_LIST_1}
                                />

                                <Button
                                    label="Reset"
                                    style={{ height: "1.1rem" }}
                                    className="p-button-text"
                                    onClick={blankFn}
                                />
                            </div>
                            <div>
                                <Button
                                    label="Stock List"
                                    style={{ height: "1.1rem" }}
                                    className="p-button-text"
                                    onClick={blankFn}
                                />

                                <Button
                                    label="Used Stock"
                                    style={{ height: "1.1rem" }}
                                    className="p-button-text"
                                    onClick={blankFn}
                                />

                                <Button
                                    label="Stock List2"
                                    style={{ height: "1.1rem" }}
                                    className="p-button-text"
                                    onClick={blankFn}
                                />
                            </div>
                        </span>
                    </div>
                </div>
            </div>

            <Divider />

            <div
                style={{ width: "100rem", height: "2rem", marginLeft: "30rem" }}
            >
                <div className="formgrid grid">
                    <div>
                        <Button
                            style={{ display: "inline-block", width: "15rem" }}
                            label="Stock Defect Update"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "15rem" }}
                            label="Stock Qty Update"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "15rem" }}
                            label="Qty Update Cancel"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "15rem" }}
                            label="Stock Factory Update"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Batch Update"
                            className="p-button-text"
                            onClick={blankFn}
                        />
                    </div>
                </div>
            </div>

            <Divider />

            <Toast ref={toast} />

            <Dialog
                visible={createDialogS020401_ORDER_INFO}
                position="mid-center"
                header={dlgHeader}
                modal={true}
                className="p-fluid"
                onHide={hideDialogS020401_ORDER_INFO}
            >
                <iframe
                    src={urlOrderInfo}
                    frameBorder="0"
                    ref={dt_iframe}
                    width="1100px"
                    height="820px"
                    id="id1"
                    className="myClassname"
                    scrolling="no"
                />
            </Dialog>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0512_STOCK_LIST, comparisonFn);
