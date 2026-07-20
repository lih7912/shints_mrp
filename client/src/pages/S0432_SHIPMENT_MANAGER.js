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
import { ServiceS0432_SHIPMENT_MANAGER } from "../service/service_biz/ServiceS0432_SHIPMENT_MANAGER";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_PO_MRP = {
    S_READY_DATE: "",
    E_READY_DATE: "",
    ORIGIN_PORT: "",
};

const emptyQRY_KSV_PO_MRP2 = {
    IN_QTY: "",
};

const emptyQRY_KSV_PO_MRP1 = {
    BUYER_CD: "",
    PO_CD: "",
    VENDOR_CD: "",
    MRP_DATE: "",
};

const emptyTBL_KSV_PO_MRP = {
    id: 0,
    OP_KIND: "",
    BUYER_NAME: "",
    BUYER_CD: "",
    PO_CD: "",
    VENDOR_NAME: "",
    VENDOR_CD: "",
    KIND1: "",
    MRP_DATE: "",
    ORDER_DATE: "",
    TARGET_ETA: "",
    READY_DATE: "",
    PI_ISSUE: "",
    PI_FIX: "",
    PI_FILE: "",
    PI_CD: "",
    AMOUNT: "",
    PAY_TYPE: "",
    TERM: "",
    REQUEST_DATE: "",
    BANKCOPY_DATE: "",
    CONFIRM_NO: "",
};

const emptyTBL_KSV_PO_MRP1 = {
    id: 0,
    OP_KIND: "",
    BUYER_NAME: "",
    BUYER_CD: "",
    PO_CD: "",
    VENDOR_NAME: "",
    VENDOR_CD: "",
    KIND1: "",
    MRP_DATE: "",
    ORDER_DATE: "",
    TARGET_ETA: "",
    READY_DATE: "",
    PI_ISSUE: "",
    PI_FIX: "",
    PI_FILE: "",
    PI_CD: "",
    AMOUNT: "",
    PAY_TYPE: "",
    TERM: "",
    REQUEST_DATE: "",
    BANKCOPY_DATE: "",
    CONFIRM_NO: "",
};

const emptyTBL_KSV_PO_MRP2 = {
    id: 0,
    OP_KIND: "",
    BUYER_NAME: "",
    BUYER_CD: "",
    PO_CD: "",
    VENDOR_NAME: "",
    VENDOR_CD: "",
    KIND1: "",
    MRP_DATE: "",
    ORDER_DATE: "",
    TARGET_ETA: "",
    READY_DATE: "",
    PI_ISSUE: "",
    PI_FIX: "",
    PI_FILE: "",
    PI_CD: "",
    AMOUNT: "",
    PAY_TYPE: "",
    TERM: "",
    REQUEST_DATE: "",
    BANKCOPY_DATE: "",
    CONFIRM_NO: "",
};

const emptyEDT_KSV_PO_MRP = {
    SHIP_MODE: "",
    PLACE_CD: "",
    BL_FILE: "",

    ORIGIN_PORT: "",
    SHIP_LINE: "",
    BL_NO: "",

    ETA: "",
    CONTAINER_NO: "",
    CI_FILE: "",

    DESTINATION: "",
    SINGAPORE_COMBINE: "",
    COST: 0,

    PL_FILE: "",
};

const S0432_SHIPMENT_MANAGER = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0432_SHIPMENT_MANAGERRef = useRef(null);
    if (!serviceS0432_SHIPMENT_MANAGERRef.current) serviceS0432_SHIPMENT_MANAGERRef.current = new ServiceS0432_SHIPMENT_MANAGER();
    const serviceS0432_SHIPMENT_MANAGER = serviceS0432_SHIPMENT_MANAGERRef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    // dialog
    const [urlIframe, setUrlIframe] = useState("");
    const [createDialog, setCreateDialog] = useState(false);
    const hideDialog = () => {
        setCreateDialog(false);
    };

    // Search KSV_STOCK_MEM
    const search_LIST_1 = () => {
        var tObj = { ...emptyQRY_KSV_PO_MRP };

        setLoadingTBL_KSV_PO_MRP(true);

        serviceS0432_SHIPMENT_MANAGER.mgrQuery_LIST_1(tObj).then((data) => {
            setLoadingTBL_KSV_PO_MRP(false);
            if (typeof data.graphQLErrors === "undefined") {
                var tArray = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    return tObj;
                });
                setDatasTBL_KSV_PO_MRP(tArray);
            } else {
                console.log(
                    "mgrQuery_PO_CD error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_LIST_2 = () => {
        var tObj = {};
        tObj.BUYER_CD = "";

        setLoadingTBL_KSV_PO_MRP2(true);

        serviceS0432_SHIPMENT_MANAGER.mgrQuery_LIST_2(tObj).then((data) => {
            setLoadingTBL_KSV_PO_MRP2(false);
            if (typeof data.graphQLErrors === "undefined") {
                var tArray = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    return tObj;
                });
                setDatasTBL_KSV_PO_MRP2(tArray);
            } else {
                console.log(
                    "mgrQuery_PO_CD error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const process_GET_SHIPSGO = (argData) => {
        let _url1 = `${window.location.protocol}//${window.location.hostname}:3202/restapi/`;
        var tUrl =
            `${_url1}get_shipsgo/` +
            argData.requestId +
            "/" +
            argData.shipmentCd;

        const xhr = new XMLHttpRequest();
        xhr.open("GET", tUrl);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function () {
            if (xhr.status === 200) {
                var tDataObj = JSON.parse(xhr.responseText);
                console.log(tDataObj);
            }
        };
        xhr.send();
    };

    const process_INSERT_SHIPSGO = (argData) => {
        let _url1 = `${window.location.protocol}//${window.location.hostname}:3202/restapi/`;
        var tUrl = `${_url1}insert_shipsgo`;
        var tData = JSON.stringify(argData);

        const xhr = new XMLHttpRequest();
        xhr.open("POST", tUrl);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function () {
            if (xhr.status === 200) {
                var tDataObj = JSON.parse(xhr.responseText);
                console.log(tDataObj);

                var tRequestId = tDataObj.data.requestId;
                console.log("request id=>" + tRequestId);

                var tObj0 = {};
                tObj0.requestId = tRequestId;
                tObj0.shipmentCd = argData.SHIPMENT_CD;
                process_GET_SHIPSGO(tObj0);
            }
        };
        xhr.send(tData);
    };

    const process_INSERT_SHIPMENT = () => {
        var tInput = { ...dataEDT_KSV_PO_MRP };
        tInput.COST = parseFloat(tInput.COST);
        tInput.SHIPMENT_CD = "";
        tInput.REG_USER = serviceLib.getUserInfo().USER_ID;

        var tObjs = selectedTBL_KSV_PO_MRP.map((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (typeof tObj.id !== "undefined") delete tObj.id;
            return tObj;
        });

        serviceS0432_SHIPMENT_MANAGER
            .mgrInsert_SHIPMENT(tInput, tObjs)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log("mgrInsert_STOCK_IN call => " + data[0].CODE);
                    toast.current.show({
                        severity: "success",
                        summary: "Success:Stock_in",
                        detail: data[0].CODE,
                        life: 3000,
                    });
                    resetEDT_KSV_PO_MRP();
                    if (data[0].CODE.includes("SUCC")) {
                        search_LIST_1();
                        search_LIST_2();

                        var tCols = data[0].CODE.split(":");
                        var tShipmentCd = tCols[1];

                        var tObj1 = {};
                        tObj1.SHIP_LINE = tInput.SHIP_LINE;
                        tObj1.BL_NO = tInput.BL_NO;
                        tObj1.SHIPMENT_CD = tShipmentCd;

                        process_INSERT_SHIPSGO(tObj1);
                    }
                } else {
                    // console.log("mgrQuery_PO_CD error => " + JSON.stringify(data.graphQLErrors));
                    toast.current.show({
                        severity: "success",
                        summary: "Fail:Stock_in",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };

    /* QRY KSV_PO_MRP*/
    const [dataQRY_KSV_PO_MRP, setDataQRY_KSV_PO_MRP] =
        useState(emptyQRY_KSV_PO_MRP);

    const onCalChangeQRY_KSV_PO_MRP_S_READY_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };
        _dataQRY_KSV_PO_MRP[`${name}`] = val;
        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const onCalChangeQRY_KSV_PO_MRP_E_READY_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };
        _dataQRY_KSV_PO_MRP[`${name}`] = val;
        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const [
        datasQRY_KSV_PO_MRP_ORIGIN_PORT,
        setDatasQRY_KSV_PO_MRP_ORIGIN_PORT,
    ] = useState([]);
    const [dataQRY_KSV_PO_MRP_ORIGIN_PORT, setDataQRY_KSV_PO_MRP_ORIGIN_PORT] =
        useState({});

    const onDropdownChangeQRY_KSV_PO_MRP_ORIGIN_PORT = (e, name) => {
        let val = (e.value && e.value.ORIGIN_PORT) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
        setDataQRY_KSV_PO_MRP_ORIGIN_PORT(e.value);
    };

    /* QRY KSV_PO_MRP*/
    const [dataQRY_KSV_PO_MRP2, setDataQRY_KSV_PO_MRP2] =
        useState(emptyQRY_KSV_PO_MRP2);

    /* QRY KSV_PO_MRP*/
    const [dataQRY_KSV_PO_MRP1, setDataQRY_KSV_PO_MRP1] =
        useState(emptyQRY_KSV_PO_MRP1);

    const [datasQRY_KSV_PO_MRP1_BUYER_CD, setDatasQRY_KSV_PO_MRP1_BUYER_CD] =
        useState([]);
    const [dataQRY_KSV_PO_MRP1_BUYER_CD, setDataQRY_KSV_PO_MRP1_BUYER_CD] =
        useState({});

    const [datasQRY_KSV_PO_MRP1_PO_CD, setDatasQRY_KSV_PO_MRP1_PO_CD] =
        useState([]);
    const [dataQRY_KSV_PO_MRP1_PO_CD, setDataQRY_KSV_PO_MRP1_PO_CD] = useState(
        {},
    );

    const [datasQRY_KSV_PO_MRP1_PU_STATUS, setDatasQRY_KSV_PO_MRP1_PU_STATUS] =
        useState([]);
    const [dataQRY_KSV_PO_MRP1_PU_STATUS, setDataQRY_KSV_PO_MRP1_PU_STATUS] =
        useState({});

    /* TABLE KSV_PO_MRP*/
    // DEFINE DATAGRID : TBL_KSV_PO_MRP
    const [loadingTBL_KSV_PO_MRP, setLoadingTBL_KSV_PO_MRP] = useState(false);

    const [datasTBL_KSV_PO_MRP, setDatasTBL_KSV_PO_MRP] = useState([]);
    const dt_TBL_KSV_PO_MRP = useRef(null);
    const [dataTBL_KSV_PO_MRP, setDataTBL_KSV_PO_MRP] =
        useState(emptyTBL_KSV_PO_MRP);
    const [selectedTBL_KSV_PO_MRP, setSelectedTBL_KSV_PO_MRP] = useState([]);
    const [flagSelectModeTBL_KSV_PO_MRP, setFlagSelectModeTBL_KSV_PO_MRP] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_PO_MRP

    const onRowClick1TBL_KSV_PO_MRP = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            if (argData0.length <= 0) return;
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_PO_MRP = argData;

        setDataTBL_KSV_PO_MRP(argTBL_KSV_PO_MRP);

        var tObj = { ...dataEDT_KSV_PO_MRP };
        tObj.ORIGIN_PORT = argData.ORIGIN_PORT;
        tObj.ETA = argData.TARGET_ETA;
        tObj.DESTINATION = argData.DESTINATION;
        setDataEDT_KSV_PO_MRP(tObj);

        editEDT_KSV_PO_MRP_DESTINATION(argData.DESTINATION);

        // search_LIST_2(argData);
        // resetEDT_KSV_PO_MRP(argData);
    };

    const onRowClickTBL_KSV_PO_MRP = (event) => {
        let argTBL_KSV_PO_MRP = event.data;
        if (flagSelectModeTBL_KSV_PO_MRP) return;

        // Service : NawooAll:mgrQueryTBL_KSV_PO_MRP
    };

    /* TABLE KSV_PO_MRP*/
    // DEFINE DATAGRID : TBL_KSV_PO_MRP1
    const [loadingTBL_KSV_PO_MRP1, setLoadingTBL_KSV_PO_MRP1] = useState(false);

    const [datasTBL_KSV_PO_MRP1, setDatasTBL_KSV_PO_MRP1] = useState([]);
    const dt_TBL_KSV_PO_MRP1 = useRef(null);
    const [dataTBL_KSV_PO_MRP1, setDataTBL_KSV_PO_MRP1] =
        useState(emptyTBL_KSV_PO_MRP1);
    const [selectedTBL_KSV_PO_MRP1, setSelectedTBL_KSV_PO_MRP1] = useState([]);
    const [flagSelectModeTBL_KSV_PO_MRP1, setFlagSelectModeTBL_KSV_PO_MRP1] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_PO_MRP1

    /* TABLE KSV_PO_MRP*/
    // DEFINE DATAGRID : TBL_KSV_PO_MRP2
    const [loadingTBL_KSV_PO_MRP2, setLoadingTBL_KSV_PO_MRP2] = useState(false);

    const [datasTBL_KSV_PO_MRP2, setDatasTBL_KSV_PO_MRP2] = useState([]);
    const dt_TBL_KSV_PO_MRP2 = useRef(null);
    const [dataTBL_KSV_PO_MRP2, setDataTBL_KSV_PO_MRP2] =
        useState(emptyTBL_KSV_PO_MRP2);
    const [selectedTBL_KSV_PO_MRP2, setSelectedTBL_KSV_PO_MRP2] = useState([]);
    const [flagSelectModeTBL_KSV_PO_MRP2, setFlagSelectModeTBL_KSV_PO_MRP2] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_PO_MRP2

    const onRowClick1TBL_KSV_PO_MRP2 = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_PO_MRP2 = argData;

        setDataTBL_KSV_PO_MRP2(argTBL_KSV_PO_MRP2);
    };

    const onRowClickTBL_KSV_PO_MRP2 = (event) => {
        let argTBL_KSV_PO_MRP2 = event.data;
        if (flagSelectModeTBL_KSV_PO_MRP2) return;

        // Service : NawooAll:mgrQueryTBL_KSV_PO_MRP2
    };

    /* QRY KSV_PO_MRP*/
    const [dataEDT_KSV_PO_MRP, setDataEDT_KSV_PO_MRP] =
        useState(emptyEDT_KSV_PO_MRP);

    const resetEDT_KSV_PO_MRP = (argData) => {
        var tObj = { ...emptyEDT_KSV_PO_MRP };
        setDataEDT_KSV_PO_MRP(tObj);
        editEDT_KSV_PO_MRP_SHIP_LINE("");
        editEDT_KSV_PO_MRP_SHIP_MODE("");
        editEDT_KSV_PO_MRP_PLACE_CD("");
        editEDT_KSV_PO_MRP_DESTINATION("");
    };

    const [datasEDT_KSV_PO_MRP_SHIP_MODE, setDatasEDT_KSV_PO_MRP_SHIP_MODE] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_SHIP_MODE, setDataEDT_KSV_PO_MRP_SHIP_MODE] =
        useState({});

    const editEDT_KSV_PO_MRP_SHIP_MODE = (argValue) => {
        let _dataEDT_KSV_PO_MRP_SHIP_MODE =
            datasEDT_KSV_PO_MRP_SHIP_MODE.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_PO_MRP_SHIP_MODE(_dataEDT_KSV_PO_MRP_SHIP_MODE[0]);
    };

    const onDropdownChangeEDT_KSV_PO_MRP_SHIP_MODE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
        setDataEDT_KSV_PO_MRP_SHIP_MODE(e.value);
    };

    const [datasEDT_KSV_PO_MRP_SHIP_LINE, setDatasEDT_KSV_PO_MRP_SHIP_LINE] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_SHIP_LINE, setDataEDT_KSV_PO_MRP_SHIP_LINE] =
        useState({});

    const editEDT_KSV_PO_MRP_SHIP_LINE = (argValue) => {
        let _dataEDT_KSV_PO_MRP_SHIP_LINE =
            datasEDT_KSV_PO_MRP_SHIP_LINE.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_PO_MRP_SHIP_LINE(_dataEDT_KSV_PO_MRP_SHIP_LINE[0]);
    };

    const onDropdownChangeEDT_KSV_PO_MRP_SHIP_LINE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
        setDataEDT_KSV_PO_MRP_SHIP_LINE(e.value);
    };

    const [datasEDT_KSV_PO_MRP_PLACE_CD, setDatasEDT_KSV_PO_MRP_PLACE_CD] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_PLACE_CD, setDataEDT_KSV_PO_MRP_PLACE_CD] =
        useState({});

    const editEDT_KSV_PO_MRP_PLACE_CD = (argValue) => {
        let _dataEDT_KSV_PO_MRP_PLACE_CD = datasEDT_KSV_PO_MRP_PLACE_CD.filter(
            (val) => val.PLACE_CD === argValue,
        );
        setDataEDT_KSV_PO_MRP_PLACE_CD(_dataEDT_KSV_PO_MRP_PLACE_CD[0]);
    };

    const onDropdownChangeEDT_KSV_PO_MRP_PLACE_CD = (e, name) => {
        let val = (e.value && e.value.PLACE_CD) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
        setDataEDT_KSV_PO_MRP_PLACE_CD(e.value);
    };

    const onInputChangeEDT_KSV_PO_MRP_BL_FILE = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onInputChangeEDT_KSV_PO_MRP_ORIGIN_PORT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onInputChangeEDT_KSV_PO_MRP_BL_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onInputChangeEDT_KSV_PO_MRP_PL_FILE = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onCalChangeEDT_KSV_PO_MRP_ETA = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };
        _dataEDT_KSV_PO_MRP[`${name}`] = val;
        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onInputChangeEDT_KSV_PO_MRP_CONTAINER_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onInputChangeEDT_KSV_PO_MRP_CI_FILE = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const [
        datasEDT_KSV_PO_MRP_DESTINATION,
        setDatasEDT_KSV_PO_MRP_DESTINATION,
    ] = useState([]);
    const [dataEDT_KSV_PO_MRP_DESTINATION, setDataEDT_KSV_PO_MRP_DESTINATION] =
        useState({});

    const editEDT_KSV_PO_MRP_DESTINATION = (argValue) => {
        let _dataEDT_KSV_PO_MRP_DESTINATION =
            datasEDT_KSV_PO_MRP_DESTINATION.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_PO_MRP_DESTINATION(_dataEDT_KSV_PO_MRP_DESTINATION[0]);
    };

    const onDropdownChangeEDT_KSV_PO_MRP_DESTINATION = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
        setDataEDT_KSV_PO_MRP_DESTINATION(e.value);
    };

    const onCheckboxChangeEDT_KSV_PO_MRP_SINGAPORE_COMBINE = (e, name) => {
        let val = "";
        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataQRY_KSV_PO_MRP[`${name}`] = val;
        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const onInputChangeEDT_KSV_PO_MRP_COST = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    ///

    useEffect(() => {
        var tObj = {};
        serviceS0432_SHIPMENT_MANAGER.mgrQuery_CODE(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasEDT_KSV_PO_MRP_SHIP_LINE(data.SHIP_LINE);
                setDataEDT_KSV_PO_MRP_SHIP_LINE(data.SHIP_LINE[0]);

                setDatasEDT_KSV_PO_MRP_SHIP_MODE(data.SHIP_MODE);
                setDataEDT_KSV_PO_MRP_SHIP_MODE(data.SHIP_MODE[0]);

                setDatasEDT_KSV_PO_MRP_PLACE_CD(data.PLACE_CD);
                setDataEDT_KSV_PO_MRP_PLACE_CD(data.PLACE_CD[0]);

                setDatasEDT_KSV_PO_MRP_DESTINATION(data.DESTINATION);
                setDataEDT_KSV_PO_MRP_DESTINATION(data.DESTINATION[0]);
            } else {
                console.log(
                    "mgrQuery_PO_CD error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        search_LIST_1();
        search_LIST_2();
    }, []);

    const blankFn = () => {};

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
                    float: "left",
                    marginLeft: "1rem",
                    marginTop: "1rem",
                    width: "71rem",
                    height: "30rem",
                }}
            >
                <div
                    style={{
                        marginLeft: "1rem",
                        marginTop: "1rem",
                        width: "69rem",
                        height: "4rem",
                    }}
                >
                    <span
                        style={{
                            height: "0.5rem",
                            display: "inline-block",
                            width: "20rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block" }}>Ready Date</p>
                        <div
                            style={{
                                height: "2rem",
                                display: "inline-block",
                                width: "11rem",
                            }}
                        >
                            <Calendar
                                showButtonBar
                                dateFormat="yy-mm-dd"
                                id="id_S_READY_DATE"
                                value={changeDateVal(
                                    dataQRY_KSV_PO_MRP.S_READY_DATE,
                                )}
                                onChange={(e) =>
                                    onCalChangeQRY_KSV_PO_MRP_S_READY_DATE(
                                        e,
                                        "S_READY_DATE",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span
                        style={{
                            height: "2rem",
                            display: "inline-block",
                            width: "15rem",
                        }}
                    >
                        <p style={{ width: "1rem", display: "inline-block" }}>~</p>
                        <div
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "13rem",
                            }}
                        >
                            <Calendar
                                showButtonBar
                                dateFormat="yy-mm-dd"
                                id="id_E_READY_DATE"
                                value={changeDateVal(
                                    dataQRY_KSV_PO_MRP.E_READY_DATE,
                                )}
                                onChange={(e) =>
                                    onCalChangeQRY_KSV_PO_MRP_E_READY_DATE(
                                        e,
                                        "E_READY_DATE",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span
                        style={{
                            height: "2rem",
                            display: "inline-block",
                            width: "20rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block" }}>Origin Port</p>
                        <div
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "11rem",
                            }}
                        >
                            <Dropdown
                                id="id_ORIGIN_PORT"
                                value={dataQRY_KSV_PO_MRP_ORIGIN_PORT}
                                onChange={(e) =>
                                    onDropdownChangeQRY_KSV_PO_MRP_ORIGIN_PORT(
                                        e,
                                        "ORIGIN_PORT",
                                    )
                                }
                                options={datasQRY_KSV_PO_MRP_ORIGIN_PORT}
                                optionLabel="USER_NAME"
                                placeholder=""
                                editable
                                filter
                            ></Dropdown>
                        </div>
                    </span>
                    <span
                        style={{
                            height: "2rem",
                            display: "inline-block",
                            width: "10rem",
                        }}
                    >
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
                    </span>
                </div>
                <div
                    style={{
                        marginLeft: "0.5rem",
                        marginTop: "1rem",
                        width: "69rem",
                        height: "26rem",
                    }}
                >
                    <AFDataTable preventUnrelatedRerender
                        ref={dt_TBL_KSV_PO_MRP}
                        size="small"
                        value={datasTBL_KSV_PO_MRP}
                        loading={loadingTBL_KSV_PO_MRP}
                        metaKeySelection={false}
                        showGridlines
                        selectionMode="multiple"
                        resizableColumns
                        columnResizeMode="fit"
                        selection={selectedTBL_KSV_PO_MRP}
                        onSelectionChange={(e) => {
                            setFlagSelectModeTBL_KSV_PO_MRP(true);
                            setSelectedTBL_KSV_PO_MRP(e.value);
                            console.log(
                                "selected length:" +
                                    selectedTBL_KSV_PO_MRP.length,
                            );
                            onRowClick1TBL_KSV_PO_MRP(e.value);
                        }}
                        onRowClick={onRowClickTBL_KSV_PO_MRP}
                        dataKey="id"
                        className="datatable-responsive"
                        virtualScrollerOptions={{ itemSize: 12 }}
                        emptyMessage=" " //header={headerTBL_KSV_PO_MRP}
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="24rem"
                    >
                        <AFColumn field="REG_USER" header="Purchaser" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="BUYER_NAME" header="Buyer" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="PO_CD2" header="PO#" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="VENDOR_CD" header="Supplier Cd" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="VENDOR_NAME" header="Supplier" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="TRADE_TERM" header="Pay Term" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="ORIGIN_PORT" header="Origin Port" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="EXP_DELIVERY_DATE" header="Exp Delivery Date" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="TARGET_ETA" header="Target ETA" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="CT_QTY" header="CT Qty" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="WEIGHT" header="Weight" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="CBM" header="CBM" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    </AFDataTable>
                </div>
            </div>

            <div
                style={{
                    float: "left",
                    marginLeft: "0.5rem",
                    marginTop: "1rem",
                    width: "27rem",
                    height: "30rem",
                }}
            >
                <div
                    style={{
                        marginTop: "1rem",
                        width: "27rem",
                        height: "4rem",
                    }}
                >
                    <span
                        style={{
                            height: "2rem",
                            display: "inline-block",
                            width: "10rem",
                        }}
                    >
                        <Button
                            label="Add Ship"
                            style={{ height: "1.1rem" }}
                            icon="pi pi-search"
                            className="p-button-text"
                            onClick={search_LIST_1}
                        />
                    </span>
                </div>

                <div
                    style={{
                        marginLeft: "0.5rem",
                        marginTop: "1rem",
                        width: "27rem",
                        height: "26rem",
                    }}
                >
                    <AFDataTable preventUnrelatedRerender
                        ref={dt_TBL_KSV_PO_MRP2}
                        size="small"
                        value={datasTBL_KSV_PO_MRP2}
                        resizableColumns
                        columnResizeMode="fit"
                        loading={loadingTBL_KSV_PO_MRP2}
                        metaKeySelection={false}
                        showGridlines
                        selectionMode="multiple"
                        selection={selectedTBL_KSV_PO_MRP2}
                        onSelectionChange={(e) => {
                            setFlagSelectModeTBL_KSV_PO_MRP2(true);
                            setSelectedTBL_KSV_PO_MRP2(e.value);
                            console.log(
                                "selected length:" +
                                    selectedTBL_KSV_PO_MRP2.length,
                            );
                            onRowClick1TBL_KSV_PO_MRP2(e.value);
                        }}
                        onRowClick={onRowClickTBL_KSV_PO_MRP2}
                        dataKey="id"
                        className="datatable-responsive"
                        virtualScrollerOptions={{ itemSize: 12 }}
                        emptyMessage=" " //header={headerTBL_KSV_PO_MRP2}
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="24rem"
                    >
                        <AFColumn field="SHIP_MODE" headerClassName="t-header" header="Ship Mode" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="ORIGIN_PORT" headerClassName="t-header" header="Origin Port" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="ETD" headerClassName="t-header" header="ETD" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="WEIGHT" headerClassName="t-header" header="Weight" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="CBM" headerClassName="t-header" header="Weight" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="SHIPMENT_CD" headerClassName="t-header" header="Ship#" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="STSOUT_CD" headerClassName="t-header" header="Stsout#" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="PU_CD" headerClassName="t-header" header="PU#" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    </AFDataTable>
                </div>
            </div>

            <Divider />

            <div
                style={{
                    marginLeft: "0.5rem",
                    marginTop: "1rem",
                    width: "99rem",
                    height: "10rem",
                }}
            >
                <span
                    style={{
                        height: "2rem",
                        display: "inline-block",
                        width: "30rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Ship Mode</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "17rem",
                        }}
                    >
                        <Dropdown
                            id="id_SHIP_MODE"
                            value={dataEDT_KSV_PO_MRP_SHIP_MODE}
                            onChange={(e) =>
                                onDropdownChangeEDT_KSV_PO_MRP_SHIP_MODE(
                                    e,
                                    "SHIP_MODE",
                                )
                            }
                            options={datasEDT_KSV_PO_MRP_SHIP_MODE}
                            optionLabel="CD_NAME"
                            placeholder=""
                        ></Dropdown>
                    </div>
                </span>
                <span
                    style={{
                        height: "2rem",
                        display: "inline-block",
                        width: "30rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Forward</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "17rem",
                        }}
                    >
                        <Dropdown
                            id="id_PLACE_CD"
                            value={dataEDT_KSV_PO_MRP_PLACE_CD}
                            onChange={(e) =>
                                onDropdownChangeEDT_KSV_PO_MRP_PLACE_CD(
                                    e,
                                    "PLACE_CD",
                                )
                            }
                            options={datasEDT_KSV_PO_MRP_PLACE_CD}
                            optionLabel="PLACE_NAME"
                            placeholder=""
                        ></Dropdown>
                    </div>
                </span>
                <span
                    style={{
                        height: "2rem",
                        display: "inline-block",
                        width: "30rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>BL File</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "17rem",
                        }}
                        id="id_BL_FILE"
                        value={dataEDT_KSV_PO_MRP.BL_FILE}
                        onChange={(e) =>
                            onInputChangeEDT_KSV_PO_MRP_BL_FILE(e, "BL_FILE")
                        }
                    />
                </span>

                <span
                    style={{
                        height: "2rem",
                        display: "inline-block",
                        width: "30rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Origin Port</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "17rem",
                        }}
                        id="id_ORIGIN_PORT"
                        value={dataEDT_KSV_PO_MRP.ORIGIN_PORT}
                        onChange={(e) =>
                            onInputChangeEDT_KSV_PO_MRP_ORIGIN_PORT(
                                e,
                                "ORIGIN_PORT",
                            )
                        }
                    />
                </span>
                <span
                    style={{
                        height: "2rem",
                        display: "inline-block",
                        width: "30rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>B/L#</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "17rem",
                        }}
                        id="id_BL_NO"
                        value={dataEDT_KSV_PO_MRP.BL_NO}
                        onChange={(e) =>
                            onInputChangeEDT_KSV_PO_MRP_BL_NO(e, "BL_NO")
                        }
                    />
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "26rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Ship Line</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "17rem",
                        }}
                    >
                        <Dropdown
                            id="id_SHIP_LINE"
                            value={dataEDT_KSV_PO_MRP_SHIP_LINE}
                            onChange={(e) =>
                                onDropdownChangeEDT_KSV_PO_MRP_SHIP_LINE(
                                    e,
                                    "SHIP_LINE",
                                )
                            }
                            options={datasEDT_KSV_PO_MRP_SHIP_LINE}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                            filter
                        ></Dropdown>
                    </div>
                </span>

                <span
                    style={{
                        height: "2rem",
                        display: "inline-block",
                        width: "30rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>ETA</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "17rem",
                        }}
                    >
                        <Calendar
                            showButtonBar
                            dateFormat="yy-mm-dd"
                            id="id_ETA"
                            value={changeDateVal(dataEDT_KSV_PO_MRP.ETA)}
                            onChange={(e) =>
                                onCalChangeEDT_KSV_PO_MRP_ETA(e, "ETA")
                            }
                        />
                    </div>
                </span>
                <span
                    style={{
                        height: "2rem",
                        display: "inline-block",
                        width: "30rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Container#</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "17rem",
                        }}
                        id="id_CONTAINER_NO"
                        value={dataEDT_KSV_PO_MRP.CONTAINER_NO}
                        onChange={(e) =>
                            onInputChangeEDT_KSV_PO_MRP_CONTAINER_NO(
                                e,
                                "CONTAINER_NO",
                            )
                        }
                    />
                </span>
                <span
                    style={{
                        height: "2rem",
                        display: "inline-block",
                        width: "30rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>CI File</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "17rem",
                        }}
                        id="id_CI_FILE"
                        value={dataEDT_KSV_PO_MRP.CI_FILE}
                        onChange={(e) =>
                            onInputChangeEDT_KSV_PO_MRP_CI_FILE(e, "CI_FILE")
                        }
                    />
                </span>

                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "26rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Destination</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "17rem",
                        }}
                    >
                        <Dropdown
                            id="id_DESTINATION"
                            value={dataEDT_KSV_PO_MRP_DESTINATION}
                            onChange={(e) =>
                                onDropdownChangeEDT_KSV_PO_MRP_DESTINATION(
                                    e,
                                    "DESTINATION",
                                )
                            }
                            options={datasEDT_KSV_PO_MRP_DESTINATION}
                            optionLabel="CD_NAME"
                            placeholder=""
                        ></Dropdown>
                    </div>
                </span>
                <span
                    style={{
                        height: "2rem",
                        display: "inline-block",
                        width: "30rem",
                    }}
                >
                    <p style={{ width: "20rem", display: "inline-block" }}>Singapore Combine</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "3rem",
                        }}
                    >
                        <Checkbox
                            style={{ display: "inline-block", width: "2rem" }}
                            id="id_SINGAPORE_COMBINE"
                            checked={changeCheckBoxVal(
                                dataEDT_KSV_PO_MRP.SINGAPORE_COMBINE,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeEDT_KSV_PO_MRP_SINGAPORE_COMBINE(
                                    e,
                                    "SINGAPORE_COMBINE",
                                )
                            }
                        />
                    </div>
                </span>
                <span
                    style={{
                        height: "2rem",
                        display: "inline-block",
                        width: "30rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Cost</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "17rem",
                        }}
                        id="id_COST"
                        value={dataEDT_KSV_PO_MRP.COST}
                        onChange={(e) =>
                            onInputChangeEDT_KSV_PO_MRP_COST(e, "COST")
                        }
                    />
                </span>

                <span
                    style={{
                        height: "2rem",
                        display: "inline-block",
                        width: "30rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>PL file</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "17rem",
                        }}
                        id="id_PL_FILE"
                        value={dataEDT_KSV_PO_MRP.PL_FILE}
                        onChange={(e) =>
                            onInputChangeEDT_KSV_PO_MRP_PL_FILE(e, "PL_FILE")
                        }
                    />
                </span>
            </div>

            <Divider />

            <div
                style={{ width: "100rem", height: "2rem", marginLeft: "1rem" }}
            >
                <div className="formgrid grid">
                    <div className="field col-6 md:col-6">
                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Reset"
                            icon="pi pi-times"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "20rem" }}
                            label="Ship Regist"
                            icon="pi pi-check"
                            className="p-button-text"
                            onClick={process_INSERT_SHIPMENT}
                        />
                    </div>
                </div>
            </div>

            <Toast ref={toast} />

            <Dialog
                visible={createDialog}
                position="top-right"
                style={{ width: "98vw" }}
                header=""
                modal={true}
                className="p-fluid"
                onHide={hideDialog}
            ></Dialog>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0432_SHIPMENT_MANAGER, comparisonFn);
