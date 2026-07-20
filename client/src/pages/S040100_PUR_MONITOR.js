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
import { ServiceS040100_PUR_MONITOR } from "../service/service_biz/ServiceS040100_PUR_MONITOR";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_PO_MRP = {
    PU_STATUS: "",
    PU_CD: "",
    BUYER_CD: "",
    VENDOR_TYPE: "",
    S_MRP_DATE: "",
    E_MRP_DATE: "",
    USER_ID: "",
    PO_CD: "",
    VENDOR_CD: "",
    S_MATL_ETA: "",
    E_MATL_ETA: "",
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
    PU_CD: "",
    VENDOR_CD: "",
    VENDOR_TYPE: "",

    REG_USER: "",
    BUYER_CD: "",
    PAY_TERM: "",

    PO_CD1: "",
    MRP_DATE: "",
    NORMI: "",
    OVER_SHORT: "",

    PO_CD2: "",
    TARGET_ETA: "",
    CURR_CD: "",
    PI_NO: "",

    PO_CD3: "",
    ORDER_DATE: "",
    PAY_AMT: "",
    PI_FILE: "",

    PO_CD4: "",
    DUE_DATE: "",
    BILL_TO: "",

    PO_CD5: "",
    EX_FACTORY: "",
    PAY_DATE: "",

    PO_CD6: "",
    FORWARDER: "",

    SHIP_TO: "",
    ORIGIN_PORT: "",
    TRADE_TERM: "",
};

const emptyEDT_KSV_PO_MRP2 = {
    REG_USER: "",
    VENDOR_NAME: "",
    PAY_CONDITION: "",
    CURRENCY: "",
    AMOUNT: "",
    DEPOSIT_AMOUNT: "",
    DEPOSIT_RATE: "",
    PAY_BANK: "",
    PAY_DATE: "",
};

const emptyEDT_KSV_PO_MRP3 = {
    REG_USER: "",
    BUYER_NAME: "",
    VENDOR_NAME: "",
    TRADE_TERM: "",
    AMOUNT: "",
    PAY_BANK: "",
    PAY_DATE: "",
};

const S040100_PUR_MONITOR = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS040100_PUR_MONITORRef = useRef(null);
    if (!serviceS040100_PUR_MONITORRef.current) serviceS040100_PUR_MONITORRef.current = new ServiceS040100_PUR_MONITOR();
    const serviceS040100_PUR_MONITOR = serviceS040100_PUR_MONITORRef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const [styleVal1, setStyleVal1] = useState({
        width: "123rem",
        height: "2rem",
        marginLeft: "2rem",
        display: "none",
    });

    // dialog
    const [urlIframe, setUrlIframe] = useState("");
    const [createDialog, setCreateDialog] = useState(false);

    const [urlIframe2, setUrlIframe2] = useState("");
    const [createDialog2, setCreateDialog2] = useState(false);

    const [urlIframe3, setUrlIframe3] = useState("");
    const [createDialog3, setCreateDialog3] = useState(false);

    //

    //
    const process_APPLY = () => {
        var tObjs = [...selectedTBL_KSV_PO_MRP1];

        var tCheckFlag = 0;
        var tBefObj = {};
        tObjs.forEach((col, i) => {
            if (i === 0) {
                tBefObj = { ...col };
            } else {
                if (tBefObj.VENDOR_NAME !== col.VENDOR_NAME) tCheckFlag = 1;
                if (tBefObj.PU_STATUS !== col.PU_STATUS) tCheckFlag = 2;
                if (tBefObj.FACTORY_NAME !== col.FACTORY_NAME) tCheckFlag = 3;
            }
        });
        if (tCheckFlag > 0) {
            var tDetailStr = "";
            if (tCheckFlag === 1) tDetailStr = "You can Same Buyer!!";
            if (tCheckFlag === 2) tDetailStr = "You can Same Status!!";
            if (tCheckFlag === 3) tDetailStr = "You can Same Factory!!";
            alert(tDetailStr);

            return;
        }

        if (selectedTBL_KSV_PO_MRP1[0].PU_STATUS === "Update") {
            if (selectedTBL_KSV_PO_MRP1.length > 1) {
                var tDetailStr = "Can Update Only 1 ";
                toast.current.show({
                    severity: "success",
                    summary: "Check Info",
                    detail: tDetailStr,
                    life: 3000,
                });
                return;
            }
        }

        sessionStorage.setItem("S040100_PUR_MONITOR", JSON.stringify(tObjs));

        var tUrl = `${window.location.origin}/#/`;
        tUrl += `S040101_PURCHASER_REG?PU_CD=`;

        var tUrl2 = `S040101_PURCHASER_REG?PU_CD=`;
        var tValObj = {
            key: "3-10",
            label: "Purchase Reg",
            icon: "pi pi-fw pi-user-edit",
            url1: "S040101_PURCHASER_REG",
        };
        var tArgObj = { ...tValObj };
        tArgObj.url1 = tUrl2;
        var tFuncObj = {};
        tFuncObj.func = "call_url";
        tFuncObj.message = { ...tArgObj };
        window.parent.postMessage(tFuncObj, "*");
    };

    // popup

    // Search

    // Search KSV_STOCK_MEM

    const search_LIST_1 = (argPuCd) => {
        var tObj0 = { ...dataQRY_KSV_PO_MRP };
        if (typeof argPuCd !== "undefined") {
            if (typeof argPuCd.PU_CD !== "undefined") {
                tObj0.PU_CD = argPuCd.PU_CD;
                tObj0.BUYER_CD = argPuCd.BUYER_CD;
                tObj0.PO_CD = argPuCd.PO_CD;
                tObj0.PU_STATUS = argPuCd.PU_STATUS;
                setDataQRY_KSV_PO_MRP(tObj0);
            }
        }

        if (tObj0.BUYER_CD === "") {
            alert("buyer cd는 필수입력값 입니다.<br><br>Buyer CD is a required input value.");
            return;
        }

        setSelectedTBL_KSV_PO_MRP1([]);
        setLoadingTBL_KSV_PO_MRP1(true);

        // 2_1
        serviceS040100_PUR_MONITOR.mgrQuery_LIST_1(tObj0).then((data) => {
            setLoadingTBL_KSV_PO_MRP1(false);
            if (typeof data.graphQLErrors === "undefined") {
                var tArray = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    if (tObj.PU_CD !== "") tObj.PU_STATUS = "Update";
                    else tObj.PU_STATUS = "New";
                    return tObj;
                });
                setDatasTBL_KSV_PO_MRP1(tArray);
            } else {
                console.log(
                    "mgrQuery_PO_CD error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    /* QRY KSV_PO_MRP*/
    const [dataQRY_KSV_PO_MRP, setDataQRY_KSV_PO_MRP] =
        useState(emptyQRY_KSV_PO_MRP);

    const onInputChangeQRY_KSV_PO_MRP_PO_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const onInputChangeQRY_KSV_PO_MRP_VENDOR_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const onCalChangeQRY_KSV_PO_MRP_S_MATL_ETA = (e, name) => {
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
    const onCalChangeQRY_KSV_PO_MRP_E_MATL_ETA = (e, name) => {
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

    const onCalChangeQRY_KSV_PO_MRP_S_MRP_DATE = (e, name) => {
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

    const onCalChangeQRY_KSV_PO_MRP_E_MRP_DATE = (e, name) => {
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

    const [datasQRY_KSV_PO_MRP_PU_STATUS, setDatasQRY_KSV_PO_MRP_PU_STATUS] =
        useState([]);
    const [dataQRY_KSV_PO_MRP_PU_STATUS, setDataQRY_KSV_PO_MRP_PU_STATUS] =
        useState({});

    const onDropdownChangeQRY_KSV_PO_MRP_PU_STATUS = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
        setDataQRY_KSV_PO_MRP_PU_STATUS(e.value);
    };

    const [datasQRY_KSV_PO_MRP_BUYER_CD, setDatasQRY_KSV_PO_MRP_BUYER_CD] =
        useState([]);
    const [dataQRY_KSV_PO_MRP_BUYER_CD, setDataQRY_KSV_PO_MRP_BUYER_CD] =
        useState({});

    const onDropdownChangeQRY_KSV_PO_MRP_BUYER_CD = (e, name) => {
        let val = (e.value && e.value.BUYER_CD) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
        setDataQRY_KSV_PO_MRP_BUYER_CD(e.value);
    };

    const [
        datasQRY_KSV_PO_MRP_VENDOR_TYPE,
        setDatasQRY_KSV_PO_MRP_VENDOR_TYPE,
    ] = useState([]);
    const [dataQRY_KSV_PO_MRP_VENDOR_TYPE, setDataQRY_KSV_PO_MRP_VENDOR_TYPE] =
        useState({});

    const onDropdownChangeQRY_KSV_PO_MRP_VENDOR_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
        setDataQRY_KSV_PO_MRP_VENDOR_TYPE(e.value);
    };

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

    const onRowClick1TBL_KSV_PO_MRP1 = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_PO_MRP1 = argData;

        setDataTBL_KSV_PO_MRP1(argTBL_KSV_PO_MRP1);
    };

    const onRowClickTBL_KSV_PO_MRP1 = (event) => {
        let argTBL_KSV_PO_MRP1 = event.data;
        if (flagSelectModeTBL_KSV_PO_MRP1) return;

        // Service : NawooAll:mgrQueryTBL_KSV_PO_MRP1
    };

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

    /* QRY KSV_PO_MRP*/
    const [dataEDT_KSV_PO_MRP, setDataEDT_KSV_PO_MRP] =
        useState(emptyEDT_KSV_PO_MRP);

    const [datasEDT_KSV_PO_MRP_NORMI, setDatasEDT_KSV_PO_MRP_NORMI] = useState(
        [],
    );
    const [dataEDT_KSV_PO_MRP_NORMI, setDataEDT_KSV_PO_MRP_NORMI] = useState(
        {},
    );

    const [datasEDT_KSV_PO_MRP_BILL_TO, setDatasEDT_KSV_PO_MRP_BILL_TO] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_BILL_TO, setDataEDT_KSV_PO_MRP_BILL_TO] =
        useState({});

    const [datasEDT_KSV_PO_MRP_CURR_CD, setDatasEDT_KSV_PO_MRP_CURR_CD] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_CURR_CD, setDataEDT_KSV_PO_MRP_CURR_CD] =
        useState({});

    const [datasEDT_KSV_PO_MRP_FORWARDER, setDatasEDT_KSV_PO_MRP_FORWARDER] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_FORWARDER, setDataEDT_KSV_PO_MRP_FORWARDER] =
        useState({});

    const [
        datasEDT_KSV_PO_MRP_ORIGIN_PORT,
        setDatasEDT_KSV_PO_MRP_ORIGIN_PORT,
    ] = useState([]);
    const [dataEDT_KSV_PO_MRP_ORIGIN_PORT, setDataEDT_KSV_PO_MRP_ORIGIN_PORT] =
        useState({});

    const [datasEDT_KSV_PO_MRP_TRADE_TERM, setDatasEDT_KSV_PO_MRP_TRADE_TERM] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_TRADE_TERM, setDataEDT_KSV_PO_MRP_TRADE_TERM] =
        useState({});

    /* QRY KSV_PO_MRP*/
    const [dataEDT_KSV_PO_MRP2, setDataEDT_KSV_PO_MRP2] =
        useState(emptyEDT_KSV_PO_MRP2);

    const [datasEDT_KSV_PO_MRP2_PAY_BANK, setDatasEDT_KSV_PO_MRP2_PAY_BANK] =
        useState([]);
    const [dataEDT_KSV_PO_MRP2_PAY_BANK, setDataEDT_KSV_PO_MRP2_PAY_BANK] =
        useState({});

    /* QRY KSV_PO_MRP*/
    const [dataEDT_KSV_PO_MRP3, setDataEDT_KSV_PO_MRP3] =
        useState(emptyEDT_KSV_PO_MRP3);

    const [datasEDT_KSV_PO_MRP3_PAY_BANK, setDatasEDT_KSV_PO_MRP3_PAY_BANK] =
        useState([]);
    const [dataEDT_KSV_PO_MRP3_PAY_BANK, setDataEDT_KSV_PO_MRP3_PAY_BANK] =
        useState({});

    /* TABLE KSV_PO_MRP*/
    // DEFINE DATAGRID : TBL_KSV_PO_MRP3
    let emptyTBL_KSV_PO_MRP3 = {};

    const [loadingTBL_KSV_PO_MRP3, setLoadingTBL_KSV_PO_MRP3] = useState(false);

    const [datasTBL_KSV_PO_MRP3, setDatasTBL_KSV_PO_MRP3] = useState([]);
    const dt_TBL_KSV_PO_MRP3 = useRef(null);
    const [dataTBL_KSV_PO_MRP3, setDataTBL_KSV_PO_MRP3] =
        useState(emptyTBL_KSV_PO_MRP3);
    const [selectedTBL_KSV_PO_MRP3, setSelectedTBL_KSV_PO_MRP3] = useState([]);
    const [flagSelectModeTBL_KSV_PO_MRP3, setFlagSelectModeTBL_KSV_PO_MRP3] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_PO_MRP3

    ///

    useEffect(() => {
        let tPuCd = "";

        var tUrls = window.location.href.split("?");
        if (tUrls.length <= 1) {
        } else {
            var tParams1 = tUrls[1].split("&");
            var tParams2 = tParams1.map((col, i) => {
                var tObj = {};
                var tCols = col.split("=");
                if (tCols[0].includes("PU_CD")) {
                    tObj.key = tCols[0];
                    tObj.value = tCols[1];
                    tPuCd = tObj.value;
                }
            });
        }

        var tObj1 = {};
        tObj1.BUYER_CD = "";
        serviceS040100_PUR_MONITOR.mgrQuery_CODE2(tObj1).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasEDT_KSV_PO_MRP_FORWARDER(data.PLACE_CD);
                setDataEDT_KSV_PO_MRP_FORWARDER(data.PLACE_CD[0]);

                setDatasEDT_KSV_PO_MRP_NORMI(data.NORMI);
                setDataEDT_KSV_PO_MRP_NORMI(data.NORMI[0]);

                setDatasEDT_KSV_PO_MRP_TRADE_TERM(data.TRADE_TERM);
                setDataEDT_KSV_PO_MRP_TRADE_TERM(data.TRADE_TERM[0]);

                setDatasEDT_KSV_PO_MRP_CURR_CD(data.CURR_CD);
                setDataEDT_KSV_PO_MRP_CURR_CD(data.CURR_CD[0]);

                setDatasEDT_KSV_PO_MRP_BILL_TO(data.BILL_TYPE);
                setDataEDT_KSV_PO_MRP_BILL_TO(data.BILL_TYPE[0]);

                setDatasEDT_KSV_PO_MRP_ORIGIN_PORT(data.ORIGIN_PORT);
                setDataEDT_KSV_PO_MRP_ORIGIN_PORT(data.ORIGIN_PORT[0]);

                setDatasQRY_KSV_PO_MRP_PU_STATUS(data.PU_STATUS);
                setDataQRY_KSV_PO_MRP_PU_STATUS(data.PU_STATUS[0]);

                setDatasQRY_KSV_PO_MRP_VENDOR_TYPE(data.VENDOR_TYPE);
                setDataQRY_KSV_PO_MRP_VENDOR_TYPE(data.VENDOR_TYPE[0]);

                setDatasQRY_KSV_PO_MRP_BUYER_CD(data.BUYER_CD);
                setDataQRY_KSV_PO_MRP_BUYER_CD(data.BUYER_CD[0]);
            } else {
                console.log(
                    "mgrQuery_PO_CD error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        if (tPuCd !== "") {
            var tObjStr = window.localStorage.getItem("S040100_PUR_MONITOR");
            var tObj = JSON.parse(tObjStr);
            search_LIST_1(tObj);
        }
    }, []);

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

    return (
        <div className="af-div-main">
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "6rem" }}
            >
                <span className="af-span-3-0" style={{ width: "15rem" }}>
                    <p className="af-span-p" style={{ width: "5rem" }}>Status</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Dropdown
                            style={{ width: "9rem" }}
                            id="id_PO_CD"
                            filter
                            value={dataQRY_KSV_PO_MRP_PU_STATUS}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MRP_PU_STATUS(
                                    e,
                                    "PU_STATUS",
                                )
                            }
                            options={datasQRY_KSV_PO_MRP_PU_STATUS}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "15rem" }}>
                    <p className="af-span-p" style={{ width: "5rem" }}>Buyer</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Dropdown
                            style={{ width: "9rem" }}
                            id="id_PO_CD"
                            filter
                            value={dataQRY_KSV_PO_MRP_BUYER_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MRP_BUYER_CD(
                                    e,
                                    "BUYER_CD",
                                )
                            }
                            options={datasQRY_KSV_PO_MRP_BUYER_CD}
                            optionLabel="BUYER_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "15rem" }}>
                    <p className="af-span-p" style={{ width: "5rem" }}>Type</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Dropdown
                            style={{ width: "9rem" }}
                            id="id_PO_CD"
                            filter
                            value={dataQRY_KSV_PO_MRP_VENDOR_TYPE}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MRP_VENDOR_TYPE(
                                    e,
                                    "VENDOR_TYPE",
                                )
                            }
                            options={datasQRY_KSV_PO_MRP_VENDOR_TYPE}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "15rem" }}>
                    <p className="af-span-p" style={{ width: "5rem" }}>Mrp Date</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "9rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_S_PO_DATE"
                            value={changeDateVal(dataQRY_KSV_PO_MRP.S_MRP_DATE)}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_PO_MRP_S_MRP_DATE(
                                    e,
                                    "S_MRP_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "11rem" }}>
                    <p className="af-span-p" style={{ width: "1rem" }}>~</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "9rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_S_PO_DATE"
                            value={changeDateVal(dataQRY_KSV_PO_MRP.E_MRP_DATE)}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_PO_MRP_E_MRP_DATE(
                                    e,
                                    "E_MRP_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-1" style={{ width: "40rem" }}>
                    <div
                        className="af-span-div-btn"
                        style={{ width: "8.5rem" }}
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
                            style={{ width: "8.5rem" }}
                            className="p-button-text"
                            onClick={search_LIST_1}
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "15rem" }}>
                    <p className="af-span-p" style={{ width: "5rem" }}>PO#</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            style={{ width: "9rem" }}
                            id="id_TARGET_ETA"
                            value={dataQRY_KSV_PO_MRP.PO_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP_PO_CD(e, "PO_CD")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "30.5rem" }}>
                    <p className="af-span-p" style={{ width: "5rem" }}>Supplier</p>
                    <div className="af-span-div" style={{ width: "24.5rem" }}>
                        <InputText
                            style={{ width: "24.5rem" }}
                            id="id_TARGET_ETA"
                            value={dataQRY_KSV_PO_MRP.VENDOR_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP_VENDOR_CD(
                                    e,
                                    "VENDOR_CD",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "15rem" }}>
                    <p className="af-span-p" style={{ width: "5rem" }}>Matl ETA</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "9rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_S_PO_DATE"
                            value={changeDateVal(dataQRY_KSV_PO_MRP.S_MATL_ETA)}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_PO_MRP_S_MATL_ETA(
                                    e,
                                    "S_MATL_ETA",
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
                            id="id_S_PO_DATE"
                            value={changeDateVal(dataQRY_KSV_PO_MRP.E_MATL_ETA)}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_PO_MRP_E_MATL_ETA(
                                    e,
                                    "E_MATL_ETA",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-2" style={{ width: "40rem" }}>
                    <div
                        className="af-span-div-btn"
                        style={{ width: "8.5rem" }}
                    >
                        <Button
                            label="Register"
                            style={{ width: "8.5rem" }}
                            className="p-button-text"
                            onClick={process_APPLY}
                        />
                    </div>
                </span>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "50rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_PO_MRP1}
                    size="small"
                    value={datasTBL_KSV_PO_MRP1}
                    tableStyle={{ tableLayout: "fixed" }}
                    resizableColumns
                    columnResizeMode="expand"
                    loading={loadingTBL_KSV_PO_MRP1}
                    metaKeySelection={false}
                    showGridlines
                    selectionMode="multiple"
                    selection={selectedTBL_KSV_PO_MRP1}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_PO_MRP1(true);
                        setSelectedTBL_KSV_PO_MRP1(e.value);
                        console.log(
                            "selected length:" + selectedTBL_KSV_PO_MRP1.length,
                        );
                        onRowClick1TBL_KSV_PO_MRP1(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_PO_MRP1}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" " //header={headerTBL_KSV_PO_MRP1}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="50rem"
                >
                    <AFColumn field="PU_STATUS" headerClassName="t-header" header="Status" style={{ width: "5rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="BUYER_NAME" headerClassName="t-header" header="Buyer" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PO_CD" headerClassName="t-header" header="Po Cd" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PO_SEQ" headerClassName="t-header" header="Seq" style={{ width: "2rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Supplier" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="VENDOR_CD" headerClassName="t-header" header="Supplier" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="VENDOR_MATL_TYPE" headerClassName="t-header" header="Matl Type" style={{ width: "4rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MRP_DATE" headerClassName="t-header" header="Mrp Date" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_DUE_DATE" headerClassName="t-header" header="Matl Due Date" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PROD_DUE_DATE" headerClassName="t-header" header="Prod Due Date" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MRP_QTY" headerClassName="t-header" header="Mrp Qty" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PO_QTY" headerClassName="t-header" header="Po Qty" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="OLD_PO_QTY" headerClassName="t-header" header="Old Po Qty" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="STOCK_QTY" headerClassName="t-header" header="Stock Qty" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="FACTORY_NAME" headerClassName="t-header" header="Factory" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="BUYER_CD" headerClassName="t-header" header="Buyer#" style={{ width: "3rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PLAN_FLAG" headerClassName="t-header" header="Plan Flag" style={{ width: "5rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PLAN_ETD" headerClassName="t-header" header="Plan Etd" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PLAN_ETA" headerClassName="t-header" header="Plan Eta" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PU_CD" headerClassName="t-header" header="Pu Cd" style={{ width: "15rem", flexBasis: "auto" }} ></AFColumn>
                </AFDataTable>
            </div>

            <Toast ref={toast} />
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S040100_PUR_MONITOR, comparisonFn);
