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
import { ServiceS0401_PURCHASING_MANAGER } from "../service/service_biz/ServiceS0401_PURCHASING_MANAGER";
import { OverlayPanel } from "primereact/overlaypanel";

import "./page_common.scss";

const moment = require("moment");

const S0401_PURCHASING_MANAGER = () => {
    let emptyKCD_CODE = {
        id: 0,
        CD_GROUP: "",
        CD_CODE: "",
        CD_NAME: "",
        CD_FLAG: "",
    };

    const serviceLib = new ServiceLib();
    serviceLib.loginConfirm();
    const serviceS0401_PURCHASING_MANAGER =
        new ServiceS0401_PURCHASING_MANAGER();

    const toast = useRef(null);
    const op = useRef(null);
    const dt_iframe = useRef(null);

    const [dlgInfo, setDlgInfo] = useState(false);
    const hideDlgInfo = () => {
        setDlgInfo(false);
    };

    const [resizeVal, setResizeVal] = useState(true);
    const [resizeModeVal, setResizeModeVal] = useState("expand");

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const [styleVal1, setStyleVal1] = useState({
        width: "123rem",
        height: "2rem",
        marginLeft: "2rem",
        display: "none",
    });

    // Process

    const process_RESET = () => {
        setDataQRY_KSV_PO_MRP(emptyQRY_KSV_PO_MRP);
        setDataQRY_KSV_PO_MRP_PU_STATUS(datasQRY_KSV_PO_MRP_PU_STATUS[0]);
        setDataQRY_KSV_PO_MRP_VENDOR_TYPE(datasQRY_KSV_PO_MRP_VENDOR_TYPE[0]);
        setDatasTBL_KSV_PO_MRP([]);
    };

    const process_UPDATE_END = () => {
        if (selectedTBL_KSV_PO_MRP.length <= 0) {
            alert("Please select the data.");
            return;
        }

        var tInArray = [];
        var tFlag = 0;

        selectedTBL_KSV_PO_MRP.forEach((col, i) => {
            if (
                col.PU_STATUS !== "END" &&
                col.BAL_STS_IN === "-" &&
                col.BAL_STS_OUT === "-" &&
                col.BAL_PAY === "-" &&
                col.BAL_FACIN === "-"
            ) {
                var tObj = {};
                tObj.PU_CD = col.PU_CD;
                tInArray.push(tObj);
            }
        });

        if (tInArray.length <= 0) {
            alert(
                "작업할 데이타가 없습니다. 데이타 상태를 확인해 주세요. End 처리는 입고,출고,결제,공장입고가 완료된 건에 한해서 처리 가능합니다.",
            );
            return;
        }

        serviceS0401_PURCHASING_MANAGER
            .mgrInsert_UPDATE_END(tInArray)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log("mgrInsert_STOCK_IN call => " + data.length);
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            search_LIST_2({});
                        }
                    }
                } else {
                    toast.current.show({
                        severity: "success",
                        summary: "Fail:Stock_in",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };

    // popup
    const [urlIframe, setUrlIframe] = useState("");

    const popup_INSERT_DEBIT = () => {
        if (selectedTBL_KSV_PO_MRP.length <= 0) {
            alert("Please select the data.");
            return;
        }
        if (selectedTBL_KSV_PO_MRP.length > 1) {
            alert("Please select 1 data only.");
            return;
        }
        var tObj = { ...selectedTBL_KSV_PO_MRP[0] };

        if (parseFloat(tObj.LC_AMT) > 0) {
            alert("Debit cannot be generated for LC payment.");
            return;
        }

        var tPoCdArray = tObj.PO_CD.split("/");
        if (tPoCdArray.length > 1) {
            alert("PUs with multiple POs can register Debit on info.");
            return;
        }

        var tSaveObj = {};
        tSaveObj.PO_CD = tObj.PO_CD;
        tSaveObj.ORDER_CD = "";
        tSaveObj.BUYER_CD = tObj.BUYER_CD;
        tSaveObj.BUYER_NAME = tObj.BUYER_NAME;
        tSaveObj.CURR_CD = tObj.CURR_CD;
        tSaveObj.TOT_AMT = String(tObj.PU_AMT);
        tSaveObj.VENDOR_CD = tObj.VENDOR_CD;
        tSaveObj.VENDOR_NAME = tObj.VENDOR_NAME;
        tSaveObj.FACTORY_CD = tObj.FACTORY_CD;
        tSaveObj.PU_CD = tObj.PU_CD;
        window.localStorage.setItem(
            "S0702_DEBIT_NOTE",
            JSON.stringify(tSaveObj),
        );

        var tUrl2 = `S0702_DEBIT_NOTE?PO_CD=${tSaveObj.PO_CD}&ORDER_CD=${tSaveObj.ORDER_CD}`;
        var tValObj = {
            key: "6-4",
            label: "Debit Note",
            icon: "pi pi-fw pi-user-edit",
            width: "1365px",
            height: "675px",
            url1: "S0702_DEBIT_NOTE",
        };
        var tArgObj = { ...tValObj };
        tArgObj.url1 = tUrl2;
        var tFuncObj = {};
        tFuncObj.func = "call_url";
        tFuncObj.message = { ...tArgObj };
        window.parent.postMessage(tFuncObj, "*");
    };

    const popup_REGIST = (e) => {
        var tQry = { ...dataQRY_KSV_PO_MRP };
        window.sessionStorage.setItem(
            "S0401_QRY_INFO",
            JSON.stringify(tQry, null, 4),
        );

        var tPuCd = "";
        if (
            selectedTBL_KSV_PO_MRP !== null &&
            selectedTBL_KSV_PO_MRP.length > 0
        ) {
            var tOne = { ...selectedTBL_KSV_PO_MRP[0] };
            if (tOne.PU_STATUS === "Update") {
                tPuCd = tOne.PU_CD;
                window.localStorage.setItem(
                    "S040101_PURCHASER_REG",
                    JSON.stringify(tOne),
                );
            }
        }

        var tUrl = `${window.location.origin}/#/`;
        tUrl += `S040101_PURCHASER_REG?PU_CD=${tPuCd}`;

        var tUrl2 = `S040101_PURCHASER_REG?PU_CD=${tPuCd}`;
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

    const popup_STS_IN = (e) => {
        if (selectedTBL_KSV_PO_MRP.length <= 0) {
            alert("Please select the data.");
            return;
        }

        var tQry = { ...dataQRY_KSV_PO_MRP };
        window.sessionStorage.setItem(
            "S0401_QRY_INFO",
            JSON.stringify(tQry, null, 4),
        );

        function validateSTSIN(rows) {
            const firstVendor = rows[0]?.VENDOR_NAME;

            if (rows.some((r) => r.PU_STATUS === "Registered")) {
                return "Only ordered data (Order Date input) can be STSIN.";
            }

            if (rows.some((r) => r.VENDOR_NAME !== firstVendor)) {
                return "Only the same SUPPLIER can be STS IN.";
            }

            if (rows.some((r) => !r.ORDER_DATE)) {
                return "Only those with Order Date entered can be STS-IN.";
            }

            if (rows.some((r) => r.PU_STATUS === "Update")) {
                return "When PU_STATUS is Update, You can not STS-IN .";
            }

            return null;
        }

        const error = validateSTSIN(selectedTBL_KSV_PO_MRP);

        if (error) {
            alert(error);
            return;
        }

        window.sessionStorage.setItem(
            "S0401_STSIN_INFO",
            JSON.stringify(selectedTBL_KSV_PO_MRP, null, 4),
        );

        var tPuCd = selectedTBL_KSV_PO_MRP[0].PU_CD;

        var tUrl = `${window.location.origin}/#/`;
        tUrl += "S0430_STSIN_RECORD?PU_CD=" + tPuCd;

        var tUrl2 = "S0430_STSIN_RECORD?PU_CD=" + tPuCd;
        var tValObj = {
            key: "3-2",
            label: "STSIN Record",
            icon: "pi pi-fw pi-user-edit",
            url1: "S0430_STSIN_RECORD",
        };
        var tArgObj = { ...tValObj };
        tArgObj.url1 = tUrl2;
        var tFuncObj = {};
        tFuncObj.func = "call_url";
        tFuncObj.message = { ...tArgObj };
        window.parent.postMessage(tFuncObj, "*");
    };

    const popup_STS_OUT = (e) => {
        var tQry = { ...dataQRY_KSV_PO_MRP };
        window.sessionStorage.setItem(
            "S0401_QRY_INFO",
            JSON.stringify(tQry, null, 4),
        );

        if (selectedTBL_KSV_PO_MRP.length <= 0) {
            alert("Please select the data.");
            return;
        }

        var tObj = { ...selectedTBL_KSV_PO_MRP[0] };

        if (tObj.BAL_STS_OUT === "-") {
            var tCheck = 0;
            selectedTBL_KSV_PO_MRP.forEach((col, i) => {
                if (col.VENDOR_TYPE !== "4") tCheck = 1;
            });
            if (tCheck === 1) {
                alert("STS OUT has already been completed.");
                return;
            }
        }

        var tPuCds = "";
        var tCheck = 0;
        var saveSupplier = "";
        var tCheckStatus = 0;
        selectedTBL_KSV_PO_MRP.forEach((col, i) => {
            if (i === 0) {
                tPuCds = `${col.PU_CD}`;
                saveSupplier = col.VENDOR_NAME;
            } else {
                tPuCds += `,${col.PU_CD}`;
                if (saveSupplier !== col.VENDOR_NAME) tCheck = 1;
                saveSupplier = col.VENDOR_NAME;
            }

            if (col.PU_STATUS === "Update") tCheckStatus = 1;
        });

        if (tCheck === 1) {
            alert("Only the same supplier can do STS OUT.");
            return;
        }
        if (tCheckStatus === 1) {
            alert("When PU_STATUS is Update, You can not STS-OUT .");
            return;
        }

        window.sessionStorage.setItem(
            "S0401_STSOUT_INFO",
            JSON.stringify(selectedTBL_KSV_PO_MRP, null, 4),
        );

        var tUrl = `${window.location.origin}/#/`;
        tUrl += "S0431_STSOUT_RECORD?PU_CD=" + tPuCds;

        var tUrl2 = "S0431_STSOUT_RECORD?PU_CD=" + tPuCds;

        var tValObj = {
            key: "3-5",
            label: "STSOUT Record",
            icon: "pi pi-fw pi-user-edit",
            url1: "S0431_STSOUT_RECORD",
        };
        var tArgObj = { ...tValObj };
        tArgObj.url1 = tUrl2;
        var tFuncObj = {};
        tFuncObj.func = "call_url";
        tFuncObj.message = { ...tArgObj };
        window.parent.postMessage(tFuncObj, "*");
    };

    const popup_INFO = (e) => {
        var tObj = { ...e.data };

        var tUrl = `${window.location.origin}/#/`;
        tUrl += `S040102_PURCHASER_INFO?PU_CD=${tObj.PU_CD}&PU_STATUS=${tObj.PU_STATUS}`;

        var tUrl2 = `S040102_PURCHASER_INFO?PU_CD=${tObj.PU_CD}&PU_STATUS=${tObj.PU_STATUS}`;
        var tValObj = {
            key: "3-11",
            label: "Purchase Info",
            icon: "pi pi-fw pi-user-edit",
            url1: "S040102_PURCHASER_INFO",
        };
        var tArgObj = { ...tValObj };
        tArgObj.url1 = tUrl2;
        var tFuncObj = {};
        tFuncObj.func = "call_url";
        tFuncObj.message = { ...tArgObj };
        window.parent.postMessage(tFuncObj, "*");

        // op.current.toggle(e);
        // op.current.show(e);
    };

    // dialog
    const [createDialog, setCreateDialog] = useState(false);

    const [urlIframe2, setUrlIframe2] = useState("");
    const [createDialog2, setCreateDialog2] = useState(false);

    const [urlIframe3, setUrlIframe3] = useState("");
    const [createDialog3, setCreateDialog3] = useState(false);

    // popup

    // Search

    // Search KSV_STOCK_MEM

    const search_LIST_2 = (argData) => {
        var tObj0 = {};
        if (typeof argData.PO_CD !== "undefined") tObj0 = { ...argData };
        else tObj0 = { ...dataQRY_KSV_PO_MRP };

        var tRetDate = serviceLib.getCurrDate().substring(0, 8);
        var tSDate = `${tRetDate.substring(0, 6)}01`;
        var tEDate = tRetDate;

        if (tObj0.S_MRP_DATE === "")
            tObj0.S_MRP_DATE = moment(tEDate, "YYYYMMDD")
                .subtract(12, "months")
                .format("YYYYMMDD");
        if (tObj0.E_MRP_DATE === "") tObj0.E_MRP_DATE = tEDate;

        if (
            tObj0.PU_STATUS === "" &&
            tObj0.PU_CD === "" &&
            tObj0.BUYER_CD === "" &&
            tObj0.VENDOR_TYPE === "" &&
            tObj0.S_MRP_DATE === "" &&
            tObj0.E_MRP_DATE === "" &&
            tObj0.USER_ID === "" &&
            tObj0.PO_CD === "" &&
            tObj0.VENDOR_CD === "" &&
            tObj0.S_ORDER_DATE === "" &&
            tObj0.E_ORDER_DATE === ""
        ) {
            alert("Buyer는 필수입력값 입니다.<br><br>Buyer is a required input value.");
            return;
        }

        setSelectedTBL_KSV_PO_MRP([]);
        setDatasTBL_KSV_PO_MRP([]);
        setLoadingTBL_KSV_PO_MRP(true);

        sessionStorage.setItem(
            "S0401_QRY_INFO",
            JSON.stringify(dataQRY_KSV_PO_MRP, null, 4),
        );

        // 3_1
        serviceS0401_PURCHASING_MANAGER.mgrQuery_LIST_2(tObj0).then((data) => {
            console.log(data);
            setLoadingTBL_KSV_PO_MRP(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0 && data[0].MESSAGE !== "")
                    alert(data[0].MESSAGE);
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

    /* QRY KSV_PO_MRP*/
    let emptyQRY_KSV_PO_MRP = {
        PU_STATUS: "",
        PU_CD: "",
        BUYER_CD: "",
        VENDOR_TYPE: "",
        S_MRP_DATE: "",
        E_MRP_DATE: "",
        USER_ID: "",
        PO_CD: "",
        VENDOR_CD: "",
        S_ORDER_DATE: "",
        E_ORDER_DATE: "",
    };

    const [dataQRY_KSV_PO_MRP, setDataQRY_KSV_PO_MRP] =
        useState(emptyQRY_KSV_PO_MRP);

    const [datasQRY_KSV_PO_MRP_USER_ID, setDatasQRY_KSV_PO_MRP_USER_ID] =
        useState([]);
    const [dataQRY_KSV_PO_MRP_USER_ID, setDataQRY_KSV_PO_MRP_USER_ID] =
        useState({});

    const onDropdownChangeQRY_KSV_PO_MRP_USER_ID = (e, name) => {
        let val = (e.value && e.value.USER_ID) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
        setDataQRY_KSV_PO_MRP_USER_ID(e.value);
    };

    const onInputChangeQRY_KSV_PO_MRP_BUYER_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const [datasQRY_KSV_PO_MRP_BUYER_CD, setDatasQRY_KSV_PO_MRP_BUYER_CD] =
        useState([]);
    const [dataQRY_KSV_PO_MRP_BUYER_CD, setDataQRY_KSV_PO_MRP_BUYER_CD] =
        useState({});

    const onInputChangeQRY_KSV_PO_MRP_PO_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const onInputChangeQRY_KSV_PO_MRP_PU_CD = (e, name) => {
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

    const onCalChangeQRY_KSV_PO_MRP_S_ORDER_DATE = (e, name) => {
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
    const onCalChangeQRY_KSV_PO_MRP_E_ORDER_DATE = (e, name) => {
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
    let emptyQRY_KSV_PO_MRP1 = {
        BUYER_CD: "",
        PO_CD: "",
        VENDOR_CD: "",
        MRP_DATE: "",
    };

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
    let emptyTBL_KSV_PO_MRP = {
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
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_PO_MRP = argData;

        setDataTBL_KSV_PO_MRP(argTBL_KSV_PO_MRP);
    };

    const onRowClickTBL_KSV_PO_MRP = (event) => {
        let argTBL_KSV_PO_MRP = event.data;
        onRowClick1TBL_KSV_PO_MRP(event.data);
    };

    const exportExcelTBL_KSV_PO_MRP = () => {
        import("xlsx").then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(datasTBL_KSV_PO_MRP);
            const workbook = {
                Sheets: { data: worksheet },
                SheetNames: ["data"],
            };
            const excelBuffer = xlsx.write(workbook, {
                bookType: "xlsx",
                type: "array",
            });
            saveAsExcelFileTBL_KSV_PO_MRP(excelBuffer, "스타일목록");
        });
    };

    const saveAsExcelFileTBL_KSV_PO_MRP = (buffer, fileName) => {
        import("file-saver").then((module) => {
            if (module && module.default) {
                let EXCEL_TYPE =
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
                let EXCEL_EXTENSION = ".xlsx";
                const data = new Blob([buffer], {
                    type: EXCEL_TYPE,
                });
                module.default.saveAs(
                    data,
                    fileName +
                        "_export_" +
                        new Date().getTime() +
                        EXCEL_EXTENSION,
                );
            }
        });
    };

    /* TABLE KSV_PO_MRP*/
    // DEFINE DATAGRID : TBL_KSV_PO_MRP1
    let emptyTBL_KSV_PO_MRP1 = {
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
    let emptyTBL_KSV_PO_MRP2 = {
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
    let emptyEDT_KSV_PO_MRP = {
        PU_CD: "",

        BUYER_CD: "",
        PO_CD2: "",
        VENDOR_CD: "",
        MATL_TYPE: "",
        REG_USER: "",
        FACTORY_CD: "",
        SHIP_TO: "SHINTS BVT Co., Ltd.",
        BILL_TO: "Shin Textile Solutions Co., Ltd.",
        DEPOSIT_AMT: "0",
        DEPOSIT_FIX: "0",
        PI_NO: "",

        ORDER_DATE: "",
        DELIVERY_DATE: "",
        EXP_DELIVERY_DATE: "",
        PAY_DATE: "",

        PLACE_CD: "",
        NORMI: "",
        TRADE_TERM: "",
        SHIP_MODE: "",
        BILL_TYPE: "",
        CURR_CD: "",

        LC_FLAG: "",
        PAY_AMT: "",
        DEPOSIT_REQUEST: "",
        LC_REQUEST: "",

        ORIGIN_PORT: "",
    };

    const [dataEDT_KSV_PO_MRP, setDataEDT_KSV_PO_MRP] =
        useState(emptyEDT_KSV_PO_MRP);

    const [datasEDT_KSV_PO_MRP_PLACE_CD, setDatasEDT_KSV_PO_MRP_PLACE_CD] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_PLACE_CD, setDataEDT_KSV_PO_MRP_PLACE_CD] =
        useState({});

    const [datasEDT_KSV_PO_MRP_NORMI, setDatasEDT_KSV_PO_MRP_NORMI] = useState(
        [],
    );
    const [dataEDT_KSV_PO_MRP_NORMI, setDataEDT_KSV_PO_MRP_NORMI] = useState(
        {},
    );

    const [datasEDT_KSV_PO_MRP_TRADE_TERM, setDatasEDT_KSV_PO_MRP_TRADE_TERM] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_TRADE_TERM, setDataEDT_KSV_PO_MRP_TRADE_TERM] =
        useState({});

    const [datasEDT_KSV_PO_MRP_SHIP_MODE, setDatasEDT_KSV_PO_MRP_SHIP_MODE] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_SHIP_MODE, setDataEDT_KSV_PO_MRP_SHIP_MODE] =
        useState({});

    const [datasEDT_KSV_PO_MRP_BILL_TYPE, setDatasEDT_KSV_PO_MRP_BILL_TYPE] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_BILL_TYPE, setDataEDT_KSV_PO_MRP_BILL_TYPE] =
        useState({});

    const [datasEDT_KSV_PO_MRP_CURR_CD, setDatasEDT_KSV_PO_MRP_CURR_CD] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_CURR_CD, setDataEDT_KSV_PO_MRP_CURR_CD] =
        useState({});

    /* QRY KSV_PO_MRP*/
    let emptyEDT_KSV_PO_MRP2 = {
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

    const [dataEDT_KSV_PO_MRP2, setDataEDT_KSV_PO_MRP2] =
        useState(emptyEDT_KSV_PO_MRP2);

    const [datasEDT_KSV_PO_MRP2_PAY_BANK, setDatasEDT_KSV_PO_MRP2_PAY_BANK] =
        useState([]);
    const [dataEDT_KSV_PO_MRP2_PAY_BANK, setDataEDT_KSV_PO_MRP2_PAY_BANK] =
        useState({});

    /* QRY KSV_PO_MRP*/
    let emptyEDT_KSV_PO_MRP3 = {
        REG_USER: "",
        BUYER_NAME: "",
        VENDOR_NAME: "",
        TRADE_TERM: "",
        AMOUNT: "",
        PAY_BANK: "",
        PAY_DATE: "",
    };

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
        window.addEventListener(
            "message",
            (e) => {
                if (e.data.message) {
                    if (e.data.message === "hideChildWindow") {
                        console.log("window message=>" + e.data.message);
                        hideDlgInfo();
                    }
                }
            },
            false,
        );

        let tOpCode = "";
        let tOpCode1 = "";
        let tPuCd = "";

        var tUrls = window.location.href.split("?");
        if (tUrls.length <= 1) {
        } else {
            var tParams1 = tUrls[1].split("&");
            var tParams2 = tParams1.map((col, i) => {
                var tObj = {};
                var tCols = col.split("=");
                if (tCols[0] === "OP_CODE") {
                    tObj.key = tCols[0];
                    tObj.value = tCols[1];
                    tOpCode = tObj.value;
                }
                if (tCols[0] === "OP_CODE1") {
                    tObj.key = tCols[0];
                    tObj.value = tCols[1];
                    tOpCode1 = tObj.value;
                }
                if (tCols[0] === "PU_CD") {
                    tObj.key = tCols[0];
                    tObj.value = tCols[1];
                    tPuCd = tObj.value;
                }
            });
        }

        var tSaveObjArray = [];
        if (tOpCode1 === "STSIN")
            tSaveObjArray = JSON.parse(
                sessionStorage.getItem("S0401_STSIN_INFO"),
            );
        else if (tOpCode1 === "STSOUT")
            tSaveObjArray = JSON.parse(
                sessionStorage.getItem("S0401_STSOUT_INFO"),
            );

        var tSaveObj = {};
        if (sessionStorage.getItem("S0401_QRY_INFO") !== "") {
            tSaveObj = JSON.parse(sessionStorage.getItem("S0401_QRY_INFO"));
        }

        //alert(`Reg Result:${tOpCode}/${tPuCd}`);

        if (
            tOpCode === "SEARCH" &&
            (tOpCode1 === "STSIN" || tOpCode1 === "STSOUT")
        ) {
            var tPuCd0 = "";
            tSaveObjArray.forEach((col, i) => {
                if (i === 0) tPuCd0 = `${col.PU_CD}`;
                else tPuCd0 += `,${col.PU_CD}`;
            });
            if (tSaveObj && typeof tSaveObj.PU_CD !== "undefined")
                setDataQRY_KSV_PO_MRP(tSaveObj);
            var tQryObj = { ...emptyQRY_KSV_PO_MRP };

            tQryObj.PU_CD = tPuCd0;
            // alert(`${tPuCd},${tOpCode},${tOpCode1},${tSaveObjArray.length},${tQryObj.PU_CD}`);
            // alert(tSaveObjArray);
            search_LIST_2(tQryObj);
        } else if (tOpCode === "SEARCH" && tPuCd !== "") {
            var tUserInfo = serviceLib.getUserInfo();
            // var tInObj = { ...emptyQRY_KSV_PO_MRP };
            // var tInObj = { ...dataQRY_KSV_PO_MRP };
            var tInObj = { ...tSaveObj };
            if (tSaveObj && typeof tSaveObj.BUYER_CD !== "undefined") {
                tInObj = { ...emptyQRY_KSV_PO_MRP };
            }
            // tInObj.PU_CD = tPuCd;
            if (tSaveObj && typeof tSaveObj.PU_CD !== "undefined")
                setDataQRY_KSV_PO_MRP(tInObj);
            var tQryObj = { ...emptyQRY_KSV_PO_MRP };
            tQryObj.PU_CD = tPuCd;
            // alert(`Reg Result:${tQryObj.PU_CD}`);
            search_LIST_2(tQryObj);
        } else {
            sessionStorage.setItem(
                "S0401_QRY_INFO",
                JSON.stringify(emptyQRY_KSV_PO_MRP, null, 4),
            );

            // alert(`${tPuCd},${tOpCode},${tOpCode1},${tSaveObjArray.length},${tInObj.PU_CD}`);
            //search_LIST_2(tInObj);
        }

        var tObj = {};
        serviceS0401_PURCHASING_MANAGER.mgrQuery_CODE(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasQRY_KSV_PO_MRP_VENDOR_TYPE(data.VENDOR_TYPE);
                setDataQRY_KSV_PO_MRP_VENDOR_TYPE(data.VENDOR_TYPE[0]);

                setDatasQRY_KSV_PO_MRP_PU_STATUS(data.PU_STATUS);
                setDataQRY_KSV_PO_MRP_PU_STATUS(data.PU_STATUS[0]);

                setDatasQRY_KSV_PO_MRP_BUYER_CD(data.BUYER_CD);
                setDataQRY_KSV_PO_MRP_BUYER_CD(data.BUYER_CD[0]);

                setDatasQRY_KSV_PO_MRP_USER_ID(data.USER);
                setDataQRY_KSV_PO_MRP_USER_ID(data.USER[0]);

                // setResizeVal(true);

                var tRetDate = serviceLib.getCurrDate().substring(0, 8);
                var tSDate = `${tRetDate.substring(0, 6)}01`;
                var tEDate = tRetDate;

                var tObj99 = { ...dataQRY_KSV_PO_MRP };

                console.log(tEDate);

                tObj99.S_MRP_DATE = moment(tEDate, "YYYYMMDD")
                    .subtract(12, "months")
                    .format("YYYYMMDD");
                tObj99.E_MRP_DATE = tEDate;
                tObj99.S_ORDER_DATE = "";
                tObj99.E_ORDER_DATE = "";

                if (tOpCode === "SEARCH") {
                } else {
                    setDataQRY_KSV_PO_MRP(tObj99);
                }
            } else {
                console.log(
                    "mgrQuery_PO_CD error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        // search_LIST_2();
    }, []);

    const afBodyPU_CD = (rowData) => {
        return <span>{rowData.PU_CD}</span>;
    };
    const afBodyPO_CD = (rowData) => {
        return <span>{rowData.PO_CD}</span>;
    };
    const afBodyVENDOR_NAME = (rowData) => {
        return <span>{rowData.VENDOR_NAME}</span>;
    };

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
            <div style={{ height: "6rem" }}>
                <div className="af-div-first" style={{ width: "81rem" }}>
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
                    <span className="af-span-3-0" style={{ width: "12rem" }}>
                        <p className="af-span-p" style={{ width: "3rem" }}>PU#</p>
                        <div className="af-span-div" style={{ width: "6rem" }}>
                            <InputText
                                style={{ width: "9rem" }}
                                value={dataQRY_KSV_PO_MRP.PU_CD}
                                onChange={(e) =>
                                    onInputChangeQRY_KSV_PO_MRP_PU_CD(
                                        e,
                                        "PU_CD",
                                    )
                                }
                                placeholder="PU26-0100,0101"
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "12rem" }}>
                        <p className="af-span-p" style={{ width: "4.5rem" }}>Buyer</p>
                        <div className="af-span-div" style={{ width: "6rem" }}>
                            <InputText
                                style={{ width: "6rem" }}
                                id="id_TARGET_ETA"
                                value={dataQRY_KSV_PO_MRP.BUYER_CD}
                                onChange={(e) =>
                                    onInputChangeQRY_KSV_PO_MRP_BUYER_CD(
                                        e,
                                        "BUYER_CD",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "12rem" }}>
                        <p className="af-span-p" style={{ width: "3rem" }}>Type</p>
                        <div className="af-span-div" style={{ width: "8rem" }}>
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
                                value={changeDateVal(
                                    dataQRY_KSV_PO_MRP.S_MRP_DATE,
                                )}
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
                                value={changeDateVal(
                                    dataQRY_KSV_PO_MRP.E_MRP_DATE,
                                )}
                                onChange={(e) =>
                                    onCalChangeQRY_KSV_PO_MRP_E_MRP_DATE(
                                        e,
                                        "E_MRP_DATE",
                                    )
                                }
                            />
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "15rem" }}>
                        <p className="af-span-p" style={{ width: "5rem" }}>Purchaser</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <Dropdown
                                style={{ width: "9rem" }}
                                id="id_PO_CD"
                                filter
                                value={dataQRY_KSV_PO_MRP_USER_ID}
                                onChange={(e) =>
                                    onDropdownChangeQRY_KSV_PO_MRP_USER_ID(
                                        e,
                                        "USER_ID",
                                    )
                                }
                                options={datasQRY_KSV_PO_MRP_USER_ID}
                                optionLabel="USER_NAME"
                                placeholder=""
                                editable
                            ></Dropdown>
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "11.5rem" }}>
                        <p className="af-span-p" style={{ width: "3rem" }}>PO#</p>
                        <div className="af-span-div" style={{ width: "6rem" }}>
                            <InputText
                                style={{ width: "9rem" }}
                                id="id_TARGET_ETA"
                                value={dataQRY_KSV_PO_MRP.PO_CD}
                                onChange={(e) =>
                                    onInputChangeQRY_KSV_PO_MRP_PO_CD(
                                        e,
                                        "PO_CD",
                                    )
                                }
                                placeholder="PO26-0100,0101"
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "26rem" }}>
                        <p className="af-span-p" style={{ width: "5rem" }}>Supplier</p>
                        <div className="af-span-div" style={{ width: "20rem" }}>
                            <InputText
                                style={{ width: "20rem" }}
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

                    <span className="af-span-3-0" style={{ width: "14rem" }}>
                        <p className="af-span-p" style={{ width: "4rem" }}>Ord Date</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <Calendar
                                showButtonBar
                                style={{ width: "9rem" }}
                                dateFormat="yy-mm-dd"
                                id="id_S_PO_DATE"
                                value={changeDateVal(
                                    dataQRY_KSV_PO_MRP.S_ORDER_DATE,
                                )}
                                onChange={(e) =>
                                    onCalChangeQRY_KSV_PO_MRP_S_ORDER_DATE(
                                        e,
                                        "S_ORDER_DATE",
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
                                value={changeDateVal(
                                    dataQRY_KSV_PO_MRP.E_ORDER_DATE,
                                )}
                                onChange={(e) =>
                                    onCalChangeQRY_KSV_PO_MRP_E_ORDER_DATE(
                                        e,
                                        "E_ORDER_DATE",
                                    )
                                }
                            />
                        </div>
                    </span>
                </div>
                <div className="af-div-second" style={{ width: "35rem" }}>
                    <span className="af-span-3-1" style={{ width: "8rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "7rem" }}
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
                                style={{ width: "7rem" }}
                                className="p-button-text"
                                onClick={search_LIST_2}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-1" style={{ width: "8rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "7.5rem" }}
                        >
                            <Button
                                label="Reset"
                                style={{ width: "7.5rem" }}
                                className="p-button-text"
                                onClick={process_RESET}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-1" style={{ width: "9rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "8.5rem" }}
                        >
                            <Button
                                label="End"
                                style={{ width: "8.5rem" }}
                                className="p-button-text"
                                onClick={process_UPDATE_END}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-1" style={{ width: "8rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "7rem" }}
                        >
                            <Button
                                label="List"
                                style={{ width: "7rem" }}
                                className="p-button-text green"
                                onClick={exportExcelTBL_KSV_PO_MRP}
                            />
                        </div>
                    </span>

                    <span className="af-span-3-2" style={{ width: "8rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "7rem" }}
                        >
                            <Button
                                label="Regist"
                                style={{ width: "7rem" }}
                                className="p-button-text orange"
                                onClick={popup_REGIST}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-2" style={{ width: "8rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "7.5rem" }}
                        >
                            <Button
                                label="STS IN"
                                style={{ width: "7.5rem" }}
                                className="p-button-text orange"
                                onClick={popup_STS_IN}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-2" style={{ width: "9rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "8.5rem" }}
                        >
                            <Button
                                label="STS OUT"
                                style={{ width: "8.5rem" }}
                                className="p-button-text orange"
                                onClick={popup_STS_OUT}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-2" style={{ width: "8rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "7rem" }}
                        >
                            <Button
                                label="Debit"
                                style={{ width: "7rem" }}
                                className="p-button-text orange"
                                onClick={popup_INSERT_DEBIT}
                            />
                        </div>
                    </span>
                </div>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "52rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_PO_MRP}
                    size="small"
                    value={datasTBL_KSV_PO_MRP}
                    tableStyle={{ tableLayout: "Fixed" }}
                    resizableColumns={resizeVal}
                    columnResizeMode={resizeModeVal}
                    loading={loadingTBL_KSV_PO_MRP}
                    metaKeySelection={false}
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_PO_MRP}
                    onRowDoubleClick={popup_INFO}
                    onSelectionChange={(e) => {
                        setSelectedTBL_KSV_PO_MRP(e.value);
                    }}
                    // onSelectionChange={(e) => {
                    //        if (e.value === null) { setSelectedTBL_KSV_PO_MRP([]); }
                    //        else { var tArray = []; tArray.push(e.value);  setSelectedTBL_KSV_PO_MRP(tArray);} }}
                    // onRowClick={onRowClickTBL_KSV_PO_MRP} dataKey="id" className="datatable-responsive"
                    onRowSelect={onRowClickTBL_KSV_PO_MRP}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" " //header={headerTBL_KSV_PO_MRP}
                    responsiveLayout="scroll"
                    //scrollable scrollHeight="52rem"
                    scrollable
                    scrollHeight="550px"
                >
                    <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "3rem" }} ></AFColumn>

                    <AFColumn field="PU_STATUS" headerClassName="t-header" header="Status" className="af-col" style={{ width: "5rem" }} ></AFColumn>
                    <AFColumn field="REG_USER" headerClassName="t-header" header="Purchaser" className="af-col" style={{ width: "6rem" }} ></AFColumn>
                    <AFColumn field="BUYER_CD" headerClassName="t-header" header="Buyer Cd" className="af-col" style={{ width: "3rem" }} ></AFColumn>
                    <AFColumn field="PU_CD" headerClassName="t-header" header="PU#" className="af-col orange" style={{ width: "9rem" }} body={afBodyPU_CD} ></AFColumn>
                    <AFColumn field="PO_CD" headerClassName="t-header" header="PO#" className="af-col" style={{ width: "6.5rem" }} body={afBodyPO_CD} ></AFColumn>
                    <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Supplier" className="af-col" style={{ width: "10rem" }} body={afBodyVENDOR_NAME} ></AFColumn>
                    <AFColumn field="MATL_TYPE" headerClassName="t-header" header="Matl" className="af-col" style={{ width: "3rem" }} ></AFColumn>
                    <AFColumn field="NORMI" headerClassName="t-header" header="Normi" className="af-col" style={{ width: "3rem" }} ></AFColumn>
                    <AFColumn field="MRP_DATE" headerClassName="t-header" header="MRP Date" className="af-col" style={{ width: "6rem" }} body={(rowData) => serviceLib.dateFormat(rowData.MRP_DATE) } ></AFColumn>
                    <AFColumn field="TARGET_ETA" body={(rowData) => serviceLib.dateFormat(rowData.TARGET_ETA) } headerClassName="t-header" header="Target ETA" className="af-col" style={{ width: "6rem" }} ></AFColumn>
                    <AFColumn field="ORDER_DATE" body={(rowData) => serviceLib.dateFormat(rowData.ORDER_DATE) } headerClassName="t-header" header="Order Date" className="af-col" style={{ width: "6rem" }} ></AFColumn>
                    <AFColumn field="PI_FILE" headerClassName="t-header" header="PI File" className="af-col" style={{ width: "4rem" }} ></AFColumn>
                    <AFColumn field="DUE_DATE" body={(rowData) => serviceLib.dateFormat(rowData.DUE_DATE) } headerClassName="t-header" header="Due Date" className="af-col" style={{ width: "6rem" }} ></AFColumn>
                    <AFColumn field="EXPECT_DATE" body={(rowData) => serviceLib.dateFormat(rowData.EXPECT_DATE) } headerClassName="t-header" header="Ready Date" className="af-col" style={{ width: "6rem" }} ></AFColumn>
                    <AFColumn field="PAY_TERM" headerClassName="t-header" header="Term" className="af-col" style={{ width: "3rem" }} ></AFColumn>
                    <AFColumn field="CURR_CD" headerClassName="t-header" header="Curr" className="af-col" style={{ width: "3rem" }} ></AFColumn>
                    <AFColumn field="PU_AMT" headerClassName="t-header" header="Amount" className="af-col" style={{ width: "6rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.PU_AMT, 4) } ></AFColumn>
                    <AFColumn field="BAL_STS_IN" headerClassName="t-header" header="Bal(STS IN)" className="af-col" style={{ width: "6rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.BAL_STS_IN, 4) } ></AFColumn>
                    <AFColumn field="BAL_STS_OUT" headerClassName="t-header" header="Bal(STS OUT)" className="af-col" style={{ width: "6rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.BAL_STS_OUT, 4) } ></AFColumn>
                    <AFColumn field="BAL_FACIN" headerClassName="t-header" header="Bal(FAC IN)" className="af-col" style={{ width: "6rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.BAL_FACIN, 4) } ></AFColumn>
                    <AFColumn field="BAL_PAY" headerClassName="t-header" header="Bal(Bill)" className="af-col" style={{ width: "6rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.BAL_PAY, 4) } ></AFColumn>
                    <AFColumn field="DEBIT_AMT" headerClassName="t-header" header="Debit" className="af-col" style={{ width: "6rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.DEBIT_AMT, 4) } ></AFColumn>
                    <AFColumn field="DEPOSIT_AMT" headerClassName="t-header" header="Deposit Amt" className="af-col" style={{ width: "6rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.DEPOSIT_AMT, 4) } ></AFColumn>
                    <AFColumn field="LC_AMT" headerClassName="t-header" header="Lc Amt" className="af-col" style={{ width: "6rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.LC_AMT, 4) } ></AFColumn>
                </AFDataTable>
            </div>

            <Toast ref={toast} />
            <OverlayPanel
                style={{
                    width: "123rem",
                    height: "60rem",
                    marginLeft: "0rem",
                    marginTop: "0rem",
                }}
                ref={op}
                showCloseIcon
            >
                <iframe
                    src={urlIframe}
                    frameBorder="0"
                    ref={dt_iframe}
                    width="1360px"
                    height="670px"
                    id="id1"
                    className="myClassname"
                    scrolling="no"
                />
            </OverlayPanel>

            <Dialog
                visible={dlgInfo}
                position="top-right"
                style={{
                    width: "123rem",
                    height: "60rem",
                    marginLeft: "0rem",
                    marginTop: "0rem",
                    paddingLeft: "0rem",
                    paddingTop: "0rem",
                }}
                header="PU Info "
                modal={true}
                className="p-fluid"
                onHide={hideDlgInfo}
            >
                <iframe
                    src={urlIframe}
                    frameBorder="0"
                    ref={dt_iframe}
                    width="1360px"
                    height="670px"
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

export default React.memo(S0401_PURCHASING_MANAGER, comparisonFn);
