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
import { ProgressSpinner } from "primereact/progressspinner";

import axios from "axios";
import apiOption from "../assets/env_graphql";

import { ServiceLib } from "../service/service_lib/ServiceLib";
import { ServiceS0519_INSPECT_REPORT } from "../service/service_biz/ServiceS0519_INSPECT_REPORT";
import { ServiceS051901_FACIN_LIST } from "../service/service_biz/ServiceS051901_FACIN_LIST";

const moment = require("moment");

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_PO_MRP = {
    IS_BVT: "",
    IS_ETP: "",
    STATUS_CD: "",
    BUYER_CD: "",
    BL_NO: "",
    REMARK: "",
    PU_NO: "",

    S_ATA: "",
    E_ATA: "",
    USER_ID: "",
    MC_ID: "",
    PO_CD: "",
    SHIPMENT_CD: "",
    CUSTOMS_NO: "",

    SUPPLIER: "",
    DESCRIPTION: "",
    MATL_CD: "",
    SPEC: "",
    COLOR: "",
    UNIT: "",
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
    FILE_NAME: "",
    LOCATION: "",
    FACIN_DATE: "",
};

const S0519_INSPECT_REPORT = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0519_INSPECT_REPORTRef = useRef(null);
    if (!serviceS0519_INSPECT_REPORTRef.current) serviceS0519_INSPECT_REPORTRef.current = new ServiceS0519_INSPECT_REPORT();
    const serviceS0519_INSPECT_REPORT = serviceS0519_INSPECT_REPORTRef.current;
    const serviceS051901_FACIN_LISTRef = useRef(null);
    if (!serviceS051901_FACIN_LISTRef.current) serviceS051901_FACIN_LISTRef.current = new ServiceS051901_FACIN_LIST();
    const serviceS051901_FACIN_LIST = serviceS051901_FACIN_LISTRef.current;

    const toast = useRef(null);

    // File
    const [fileObj, setFileObj] = useState({});
    const [dataUrlFile1, setDataUrlFile1] = useState("");

    /* progress */
    const [isProgress, setIsProgress] = useState(false);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    // dialog
    const [urlIframe, setUrlIframe] = useState("");
    const [createDialog, setCreateDialog] = useState(false);
    const hideDialog = () => {
        setCreateDialog(false);
    };

    // Search

    // Search KSV_STOCK_MEM
    const search_LIST_1 = (argData) => {
        var tObj = {};
        if (typeof argData.STSOUT_CD !== "undefined") tObj = { ...argData };
        else tObj = { ...dataQRY_KSV_PO_MRP };

        setLoadingTBL_KSV_PO_MRP2(true);
        setDatasTBL_KSV_PO_MRP2([]);

        // 2
        serviceS0519_INSPECT_REPORT.mgrQuery_LIST_1(tObj).then((data) => {
            setLoadingTBL_KSV_PO_MRP2(false);
            if (typeof data.graphQLErrors === "undefined" && data.length > 0) {
                var tArray = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    tObj.BAL_QTY =
                        parseFloat(tObj.S_OUT_QTY) -
                        parseFloat(tObj.SHORTAGE_QTY) -
                        parseFloat(tObj.DEFECT_QTY);
                    return tObj;
                });
                setDatasTBL_KSV_PO_MRP2(tArray);

                if (tArray.length > 0) {
                    var tEdit = { ...dataEDT_KSV_PO_MRP };
                    tEdit.FACIN_DATE = tArray[0].FACIN_DATE;
                    tEdit.LOCATION = tArray[0].LOCATION || "";
                    tEdit.FILE_NAME = tArray[0].FILE_NAME;
                    setDataEDT_KSV_PO_MRP(tEdit);
                }
            } else {
                console.log(
                    "mgrQuery_PO_CD error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const process_RESET = () => {
        //setDataQRY_KSV_PO_MRP_STATUS_CD(datasQRY_KSV_PO_MRP_STATUS_CD[0]);

        var tRetDate = serviceLib.getCurrDate().substring(0, 8);
        var tQry = { ...emptyQRY_KSV_PO_MRP };
        tQry.S_ATA = tRetDate;
        tQry.E_ATA = tRetDate;
        tQry.S_UPLOAD_DATE = tRetDate;
        tQry.E_UPLOAD_DATE = tRetDate;
        setDataQRY_KSV_PO_MRP(tQry);

        setDatasTBL_KSV_PO_MRP2([]);
        setSelectedTBL_KSV_PO_MRP2([]);
    };

    const process_FACIN = () => {
        var tFileObj = {};
        if (typeof fileObj.TITLE === "undefined") {
            tFileObj.TITLE = "";
        } else {
            tFileObj = { ...fileObj };
        }

        if (dataEDT_KSV_PO_MRP.FACIN_DATE === "") {
            alert("Please enter Inspection Date.");
            return;
        }

        var tStsOutStr = "";
        selectedTBL_KSV_PO_MRP2.forEach((col, i) => {
            if (tStsOutStr.includes(col.STSOUT_CD));
            else {
                if (tStsOutStr === "") tStsOutStr = col.STSOUT_CD;
                else tStsOutStr += `|${col.STSOUT_CD}`;
            }
        });

        tFileObj.FILE_KEY = tStsOutStr;
        tFileObj.STSOUT_CD = tStsOutStr;

        var tObjs = [];
        selectedTBL_KSV_PO_MRP2.forEach((col, i) => {
            var tObj0 = { ...col };

            var tObj = {};
            tObj.PO_CD = col.PO_CD;
            tObj.MATL_CD = col.MATL_CD;
            tObj.MATL_NAME = col.MATL_NAME;
            tObj.COLOR = col.COLOR;
            tObj.SPEC = col.SPEC;
            tObj.UNIT = col.UNIT;
            tObj.S_OUT_QTY = col.S_OUT_QTY;
            tObj.SHORTAGE_QTY = col.SHORTAGE_QTY;
            tObj.DEFECT_QTY = col.DEFECT_QTY;
            tObj.FACIN_QTY = "";
            tObj.LOCATION = col.LOCATION;
            tObj.STSOUT_CD = col.STSOUT_CD;
            tObj.FILE_NAME = "";
            tObj.FILE_URL = "";
            tObj.FILE_OBJECT = "";
            tObj.IN_DATE = col.FACIN_DATE;
            tObj.FACIN_DATE = col.FACIN_DATE;
            tObj.PACK_CD = col.PACK_CD;
            tObj.CUSTOMS_NO = col.CLEARANCE_NO;
            tObj.CBM = col.CBM;
            tObj.CT_QTY = col.CT_NO;
            tObj.WEIGHT = col.WEIGHT;
            tObj.PU_CD = col.PU_CD;
            tObj.FACIN_CD = col.FACIN_CD;
            tObj.DELIVERY = col.DELIVERY;

            var tBalQty = parseFloat(col.BAL_QTY);
            // var tVal = parseFloat(tObj.FACIN_QTY) + parseFloat(tObj.BAL_QTY);
            // var tVal = parseFloat(tObj.FACIN_QTY);
            var tVal = parseFloat(tBalQty);
            tObj.FACIN_QTY = String(tVal);
            tObj.FILE_NAME = fileObj.NAME;
            tObj.FILE_URL = fileObj.URL;
            tObj.FILE_OBJECT = fileObj.OBJECT_NAME;
            tObj.IN_DATE = dataEDT_KSV_PO_MRP.FACIN_DATE;
            tObj.LOCATION = dataEDT_KSV_PO_MRP.LOCATION;
            // tObj.STSOUT_CD = '';
            tObjs.push(tObj);
            // tObj.STSOUT_CD = dataQRY_KSV_PO_MRP.STSOUT_CD;
            // if (tBalQty > 0) tObjs.push(tObj);
        });

        //setIsProgress(true);
        setLoadingTBL_KSV_PO_MRP2(true);
        serviceS0519_INSPECT_REPORT
            .mgrInsert_FACIN(tObjs, tFileObj)
            .then((data) => {
                setIsProgress(false);
                setLoadingTBL_KSV_PO_MRP2(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        setSelectedTBL_KSV_PO_MRP2([]);
                        search_LIST_1({});
                        setFileObj({});
                        var tEdtObj = { ...dataEDT_KSV_PO_MRP };
                        tEdtObj.FILE_NAME = "";
                        setDataEDT_KSV_PO_MRP(tEdtObj);
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

    const onCalChangeQRY_KSV_PO_MRP_S_ATA = (e, name) => {
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

    const onCalChangeQRY_KSV_PO_MRP_E_ATA = (e, name) => {
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

    const [datasQRY_KSV_PO_MRP_STATUS_CD, setDatasQRY_KSV_PO_MRP_STATUS_CD] =
        useState([]);
    const [dataQRY_KSV_PO_MRP_STATUS_CD, setDataQRY_KSV_PO_MRP_STATUS_CD] =
        useState({});

    const onInputChangeQRY_KSV_PO_MRP_BUYER_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const onInputChangeQRY_KSV_PO_MRP = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const onInputChangeQRY_KSV_PO_MRP_USER_ID = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const onInputChangeQRY_KSV_PO_MRP_BL_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const onInputChangeQRY_KSV_PO_MRP_REMARK = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const onInputChangeQRY_KSV_PO_MRP_PU_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const onInputChangeQRY_KSV_PO_MRP_PO_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
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

        if (typeof argData === "undefined") return;

        var tFileCd = `${argData.STSOUT_CD}-${argData.PO_CD}-${argData.MATL_CD}`;

        let _url1 = `${window.location.protocol}//${window.location.hostname}:3202/restapi/`;
        var tUrl = `${_url1}fileupload2/facin/${tFileCd}/1`;
        setDataUrlFile1(tUrl);
    };

    const exportExcelTBL_KSV_PO_MRP2 = async () => {
        serviceLib.exportExcel(
            "Inspect report",
            "Inspect report",
            datasTBL_KSV_PO_MRP2,
        );
    };

    const onCellEditCompleteKSV_PO_MRP2 = (e) => {
        let { rowData, newValue, field, originalEvent: event } = e;
        // rowData[field] = String(serviceLib.getFloat(parseFloat(newValue), 2));

        var tUPDATE_QTY = parseFloat(rowData["UPDATE_QTY"]);
        if (tUPDATE_QTY <= 0) return;

        rowData[field] = newValue;

        var tFACIN_QTY = 0;
        var tS_OUT_QTY = parseFloat(rowData["S_OUT_QTY"]);
        var tBAL_QTY = parseFloat(rowData["BAL_QTY"]);
        if (field === "SHORTAGE_QTY") {
            var tDEFECT_QTY = parseFloat(rowData["DEFECT_QTY"]);
            var tSHORTAGE_QTY = parseFloat(newValue);
            tBAL_QTY = tS_OUT_QTY - (tDEFECT_QTY + tSHORTAGE_QTY + tFACIN_QTY);
            rowData["BAL_QTY"] = String(tBAL_QTY);
            // rowData['UPDATE_QTY'] = String(tBAL_QTY);
        }
        if (field === "DEFECT_QTY") {
            var tSHORTAGE_QTY = parseFloat(rowData["SHORTAGE_QTY"]);
            var tDEFECT_QTY = parseFloat(newValue);
            tBAL_QTY = tS_OUT_QTY - (tDEFECT_QTY + tSHORTAGE_QTY + tFACIN_QTY);
            rowData["BAL_QTY"] = String(tBAL_QTY);
            // rowData['UPDATE_QTY'] = String(tBAL_QTY);
        }

        // rowData['FACIN_QTY'] = String(tFACIN_QTY);
    };

    const cellEditorKSV_PO_MRP2 = (options) => {
        if (options.field === "SURCHARGE_REMARK")
            return textEditorText(options);
        else return textEditorNum(options);
    };

    const onChangeTextEdit = (e, options) => {
        options.editorCallback(e.target.value);
    };

    const changeInputValue = (argData) => {
        var tRet = "";
        if (argData === "") tRet = "";
        else {
            if (String(argData) === "0") tRet = "";
            else tRet = String(argData);
        }
        return tRet;
    };

    const handleFocus = (event) => event.target.select();

    const textEditorNum = (options) => {
        return (
            <InputText
                type="text"
                value={changeInputValue(options.value)}
                onChange={(e) => onChangeTextEdit(e, options)}
                onFocus={handleFocus}
            />
        );
    };

    const textEditorText = (options) => {
        return (
            <InputText
                type="text"
                value={changeInputValue(options.value)}
                onChange={(e) => onChangeTextEdit(e, options)}
                onFocus={handleFocus}
            />
        );
    };

    /* QRY KSV_PO_MRP*/
    const [dataEDT_KSV_PO_MRP, setDataEDT_KSV_PO_MRP] =
        useState(emptyEDT_KSV_PO_MRP);

    const onCalChangeEDT_KSV_PO_MRP_FACIN_DATE = (e, name) => {
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

    const onInputChangeEDT_KSV_PO_MRP_FILE_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const s3FileUpload = async (e) => {
        var tSelArray = [...selectedTBL_KSV_PO_MRP2];

        const fileName = e.target.files[0].name;
        const img = e.target.files[0];
        const formData = new FormData();
        formData.append("file", img);

        try {
            var tUrl = `${apiOption.apiuri}/restapi/imgUpload`;
            const s3UrlResponse = await axios.get(tUrl);
            console.log(s3UrlResponse.data.uploadURL);

            const presignedUrl = s3UrlResponse.data.uploadURL;
            const objectName = s3UrlResponse.data.imageName;
            await fetch(presignedUrl, {
                method: "PUT",
                headers: {
                    "Content-Type": img.type,
                },
                body: img,
            });

            const imgURL = s3UrlResponse.data.uploadURL.split("?")[0];
            var tArray = [...selectedTBL_KSV_PO_MRP];
            var tInObj2 = [];
            tArray.forEach((col, i) => {
                var tObj = { ...col };
                if (typeof tObj.__typename !== "undefined")
                    delete tObj.__typename;
                if (typeof tObj.id !== "undefined") delete tObj.id;
                tInObj2.push(tObj);
            });

            var tInObj = {};
            tInObj.FILE_KEY = "";
            tInObj.TITLE = `inspect doc`;
            tInObj.NAME = fileName;
            tInObj.URL = imgURL;
            tInObj.OBJECT_NAME = objectName;
            setFileObj(tInObj);

            var tEdtObj = { ...dataEDT_KSV_PO_MRP };
            tEdtObj.FILE_NAME = tInObj.NAME;
            setDataEDT_KSV_PO_MRP(tEdtObj);
        } catch (err) {
            console.log(err);
        }
    };

    ///
    useEffect(() => {
        var tStsoutCds = "";
        var tPoCd = "";
        var tMatlCd = "";

        var tUrls = window.location.href.split("?");
        if (tUrls.length <= 1) {
        } else {
            var tParams1 = tUrls[1].split("&");
            var tParams2 = tParams1.map((col, i) => {
                var tObj = {};
                var tCols = col.split("=");

                if (tCols[0].includes("STSOUT_CD")) {
                    tObj.key = tCols[0];
                    tObj.value = tCols[1];
                    tStsoutCds = tObj.value;
                }
                if (tCols[0].includes("PO_CD")) {
                    tObj.key = tCols[0];
                    tObj.value = tCols[1];
                    tPoCd = tObj.value;
                }
                if (tCols[0].includes("MATL_CD")) {
                    tObj.key = tCols[0];
                    tObj.value = tCols[1];
                    tMatlCd = tObj.value;
                }
            });
        }

        var tStsoutCdArray = tStsoutCds.split("|");

        var tObj = {};
        serviceS051901_FACIN_LIST.mgrQuery_CODE(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(data);
                setDatasQRY_KSV_PO_MRP_STATUS_CD(data.STATUS_CD);
                setDataQRY_KSV_PO_MRP_STATUS_CD(data.STATUS_CD[1]);

                var tRetDate = serviceLib.getCurrDate().substring(0, 8);
                var tQry = { ...dataQRY_KSV_PO_MRP };
                //tQry.S_ATA = `${tRetDate.substring(0, 4)}0101`;
                //tQry.E_ATA = `${tRetDate.substring(0, 4)}1231`;

                tQry.S_ATA = moment().startOf("month").format("YYYYMMDD");
                tQry.E_ATA = moment().format("YYYYMMDD");
                tQry.PO_CD = tPoCd;
                tQry.MATL_CD = tMatlCd;
                if (tPoCd) {
                    if (tPoCd.substring(0, 1) === "P") tQry.IS_BVT = "1";
                    else if (tPoCd.substring(0, 1) === "E") tQry.IS_ETP = "1";
                }
                setDataEDT_KSV_PO_MRP({
                    ...dataEDT_KSV_PO_MRP,
                    FACIN_DATE: tRetDate,
                });
                setDataQRY_KSV_PO_MRP(tQry);

                setDataQRY_KSV_PO_MRP((prev) => {
                    const tRetDate = serviceLib.getCurrDate().substring(0, 8);
                    const next = {
                        ...prev,
                        S_ATA: `${tRetDate.substring(0, 6)}01`,
                        E_ATA: tRetDate,
                    };
                    const bvt = isTrue(next.IS_BVT);
                    const etp = isTrue(next.IS_ETP);
                    if (bvt === etp) {
                        next.IS_BVT = "1";
                        next.IS_ETP = "0";
                    } else {
                        next.IS_BVT = bvt ? "1" : "0";
                        next.IS_ETP = etp ? "1" : "0";
                    }
                    return next;
                });
            } else {
                console.log(
                    "mgrQuery_PO_CD error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    }, []);

    const isTrue = (v) => v === true || v === "1" || v === 1;

    const blankFn = () => {};

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

    const onRadioChangeFactoryType = (e) => {
        // e.value: 'IS_BVT' 또는 'IS_ETP' (RadioButton value)
        const isBVT = e.value === "IS_BVT";
        setDataQRY_KSV_PO_MRP((prev) => ({
            ...prev,
            IS_BVT: isBVT ? "1" : "0",
            IS_ETP: isBVT ? "0" : "1",
        }));
    };

    return (
        <div className="af-div-main">
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "10rem" }}
            >
                <div>
                    <span className="af-span-3-0" style={{ width: "7rem" }}>
                        <p className="af-span-p" style={{ width: "4rem" }}>BVT</p>
                        <div className="af-span-checkbox">
                            <RadioButton
                                inputId="BVT"
                                name="factoryType"
                                value="IS_BVT"
                                checked={isTrue(dataQRY_KSV_PO_MRP.IS_BVT)}
                                onChange={onRadioChangeFactoryType}
                            />
                        </div>
                    </span>

                    <span className="af-span-3-0" style={{ width: "7rem" }}>
                        <p className="af-span-p" style={{ width: "4rem" }}>ETP</p>
                        <div className="af-span-checkbox">
                            <RadioButton
                                inputId="ETP"
                                name="factoryType"
                                value="IS_ETP"
                                checked={isTrue(dataQRY_KSV_PO_MRP.IS_ETP)}
                                onChange={onRadioChangeFactoryType}
                            />
                        </div>
                    </span>

                    <span className="af-span-3-0" style={{ width: "17rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Buyer#</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <InputText
                                style={{ width: "9rem" }}
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
                    <span className="af-span-3-0" style={{ width: "17rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>BL#</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <InputText
                                style={{ width: "9rem" }}
                                id="id_TARGET_ETA"
                                value={dataQRY_KSV_PO_MRP.BL_NO}
                                onChange={(e) =>
                                    onInputChangeQRY_KSV_PO_MRP_BL_NO(
                                        e,
                                        "BL_NO",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "17rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>PU#</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <InputText
                                style={{ width: "9rem" }}
                                id="id_TARGET_ETA"
                                value={dataQRY_KSV_PO_MRP.PU_NO}
                                onChange={(e) =>
                                    onInputChangeQRY_KSV_PO_MRP_PU_NO(
                                        e,
                                        "PU_NO",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "17rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>PO</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
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
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "10rem" }}>
                        <div className="af-span-div" style={{ width: "9rem" }}>
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
                                style={{ width: "9rem" }}
                                className="p-button-text"
                                onClick={search_LIST_1}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "10rem" }}>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <Button
                                label="Reset"
                                style={{ width: "9rem" }}
                                className="p-button-text"
                                onClick={process_RESET}
                            />
                        </div>
                    </span>
                </div>
                <span className="af-span-3" style={{ width: "32rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>ATA</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "9rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_ETA"
                            value={changeDateVal(dataQRY_KSV_PO_MRP.S_ATA)}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_PO_MRP_S_ATA(e, "S_ATA")
                            }
                        />
                    </div>
                    <p className="af-span-p" style={{ width: "1rem" }}>~</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "9rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_ETA"
                            value={changeDateVal(dataQRY_KSV_PO_MRP.E_ATA)}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_PO_MRP_E_ATA(e, "E_ATA")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Purchaser</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            style={{ width: "9rem" }}
                            id="id_TARGET_ETA"
                            value={dataQRY_KSV_PO_MRP.USER_ID}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP_USER_ID(
                                    e,
                                    "USER_ID",
                                )
                            }
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "34.5rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Remark</p>
                    <div className="af-span-div" style={{ width: "20rem" }}>
                        <InputText
                            style={{ width: "20rem" }}
                            id="id_TARGET_ETA"
                            value={dataQRY_KSV_PO_MRP.REMARK}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP_REMARK(e, "REMARK")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "20rem" }}>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Button
                            label="Excel"
                            style={{ width: "9rem" }}
                            className="p-button-text green"
                            onClick={exportExcelTBL_KSV_PO_MRP2}
                        />
                    </div>
                </span>

                <span
                    className="af-span-3"
                    style={{ width: "100%", marginTop: "4px" }}
                >
                    <p className="af-span-p" style={{ width: "6rem" }}>Shipment#</p>
                    <InputText
                        style={{ width: "10rem", marginLeft: "5px" }}
                        value={dataQRY_KSV_PO_MRP.SHIPMENT_CD}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_PO_MRP(e, "SHIPMENT_CD")
                        }
                    />

                    <p className="af-span-p" style={{ width: "6rem" }}>Customs#</p>
                    <InputText
                        style={{ width: "10rem", marginLeft: "5px" }}
                        value={dataQRY_KSV_PO_MRP.CUSTOMS_NO}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_PO_MRP(e, "CUSTOMS_NO")
                        }
                    />

                    <p className="af-span-p" style={{ width: "6rem" }}>Supplier</p>
                    <InputText
                        style={{ width: "10rem", marginLeft: "5px" }}
                        value={dataQRY_KSV_PO_MRP.SUPPLIER}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_PO_MRP(e, "SUPPLIER")
                        }
                    />

                    <p className="af-span-p" style={{ width: "6rem" }}>Description</p>
                    <InputText
                        style={{ width: "28rem", marginLeft: "5px" }}
                        value={dataQRY_KSV_PO_MRP.DESCRIPTION}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_PO_MRP(e, "DESCRIPTION")
                        }
                    />
                </span>
                <span
                    className="af-span-3"
                    style={{ width: "100%", marginTop: "4px" }}
                >
                    <p className="af-span-p" style={{ width: "6rem" }}>Matl#</p>
                    <InputText
                        style={{ width: "10rem", marginLeft: "5px" }}
                        value={dataQRY_KSV_PO_MRP.MATL_CD}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_PO_MRP(e, "MATL_CD")
                        }
                    />

                    <p className="af-span-p" style={{ width: "6rem" }}>Spec</p>
                    <InputText
                        style={{ width: "10rem", marginLeft: "5px" }}
                        value={dataQRY_KSV_PO_MRP.SPEC}
                        onChange={(e) => onInputChangeQRY_KSV_PO_MRP(e, "SPEC")}
                    />

                    <p className="af-span-p" style={{ width: "6rem" }}>Color</p>
                    <InputText
                        style={{ width: "10rem", marginLeft: "5px" }}
                        value={dataQRY_KSV_PO_MRP.COLOR}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_PO_MRP(e, "COLOR")
                        }
                    />

                    <p className="af-span-p" style={{ width: "6rem" }}>UNIT</p>
                    <InputText
                        style={{ width: "10rem", marginLeft: "5px" }}
                        value={dataQRY_KSV_PO_MRP.UNIT}
                        onChange={(e) => onInputChangeQRY_KSV_PO_MRP(e, "UNIT")}
                    />
                </span>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "49rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_PO_MRP2}
                    editMode="cell"
                    size="small"
                    value={datasTBL_KSV_PO_MRP2}
                    tableStyle={{ tableLayout: "fixed" }}
                    resizableColumns
                    columnResizeMode="expand"
                    loading={loadingTBL_KSV_PO_MRP2}
                    // metaKeySelection={false}
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_PO_MRP2}
                    onSelectionChange={(e) => {
                        setSelectedTBL_KSV_PO_MRP2(e.value);
                        onRowClick1TBL_KSV_PO_MRP2(e.value);
                    }}
                    // onRowClick={onRowClickTBL_KSV_PO_MRP2}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" " //header={headerTBL_KSV_PO_MRP2}
                    responsiveLayout="scroll"
                    // scrollable scrollHeight="555px"
                    scrollable
                    scrollHeight="49rem"
                >
                    <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "3rem" }} ></AFColumn>
                    <AFColumn field="INSPECT_DATE" headerClassName="t-header" header="Inspect Date" style={{ width: "6rem", flexBasis: "auto" }} body={(rowData) => serviceLib.dateFormat(rowData.INSPECT_DATE)} ></AFColumn>
                    <AFColumn field="FACIN_DATE" headerClassName="t-header" header="Facin Date" style={{ width: "6rem", flexBasis: "auto" }} body={(rowData) => serviceLib.dateFormat(rowData.FACIN_DATE)} ></AFColumn>
                    <AFColumn field="ATA" headerClassName="t-header" header="ATA" style={{ width: "6rem", flexBasis: "auto" }} body={(rowData) => serviceLib.dateFormat(rowData.ATA)} ></AFColumn>
                    <AFColumn field="BUYER_CD" headerClassName="t-header" header="Buyer#" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="USER_ID" headerClassName="t-header" header="Purchaser" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>

                    <AFColumn field="PACK_CD" headerClassName="t-header" header="Delivery" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="BL_NO" headerClassName="t-header" header="BL#" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="ORIGIN_PORT" headerClassName="t-header" header="Origin" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PO_CD" headerClassName="t-header" header="PO" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_CD" headerClassName="t-header" header="Matl#" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Supplier" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_NAME" headerClassName="t-header" header="Description" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="COLOR" headerClassName="t-header" header="Color" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="SPEC" headerClassName="t-header" header="Spec" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="UNIT" headerClassName="t-header" header="Unit" style={{ width: "5rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="S_OUT_QTY" headerClassName="t-header" header="Ship Qty" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.S_OUT_QTY, 2) } ></AFColumn>
                    <AFColumn field="SHORTAGE_QTY" headerClassName="t-header" header="Short/Over" style={{ color: "green", width: "6rem", flexBasis: "auto", }} editor={(options) => cellEditorKSV_PO_MRP2(options)} onCellEditComplete={onCellEditCompleteKSV_PO_MRP2} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.SHORTAGE_QTY, 2) } ></AFColumn>
                    <AFColumn field="DEFECT_QTY" headerClassName="t-header" header="Defect" style={{ color: "green", width: "6rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.DEFECT_QTY, 2) } editor={(options) => cellEditorKSV_PO_MRP2(options)} onCellEditComplete={onCellEditCompleteKSV_PO_MRP2} ></AFColumn>
                    <AFColumn field="FACIN_QTY" headerClassName="t-header" header="Facin Qty" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.BAL_QTY, 2) } ></AFColumn>
                    <AFColumn field="LOCATION" headerClassName="t-header" header="Location" style={{ width: "7rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="WEIGHT" headerClassName="t-header" header="Weight" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="CBM" headerClassName="t-header" header="CBM" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="CT_QTY" headerClassName="t-header" header="C/T#" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="FILE_NAME" headerClassName="t-header" header="Report" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    {/*<AFColumn field="MC_ID" headerClassName='t-header' header="M/C" style={{ width: '10rem',flexBasis:'auto' }}></AFColumn>*/}
                    <AFColumn field="CLEARANCE_NO" headerClassName="t-header" header="Customs#" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="DELIVERY" headerClassName="t-header" header="Delivery#" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PU_CD" headerClassName="t-header" header="PU#" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="SHIPMENT_CD" headerClassName="t-header" header="Shipment#" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="FACTORY_CD" headerClassName="t-header" header="Factory" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                </AFDataTable>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "4rem" }}
            >
                <span className="af-span-3-0" style={{ width: "22rem" }}>
                    <p className="af-span-p" style={{ width: "12rem" }}>Inspection Report</p>
                    <div className="af-span-div-btn" style={{ width: "9rem" }}>
                        <button style={{ width: "7rem", height: "1.5rem" }}>
                            <label
                                className="inputFileCustom"
                                htmlFor="inputFileAdd"
                            >
                                Upload
                            </label>
                        </button>
                        <input
                            type="file"
                            id="inputFileAdd"
                            onChange={s3FileUpload}
                            style={{ display: "none" }}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "11rem" }}>
                    <p className="af-span-p" style={{ width: "1rem" }}> </p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            style={{ width: "9rem" }}
                            id="id_TARGET_ETA"
                            value={dataEDT_KSV_PO_MRP.FILE_NAME}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_FILE_NAME(
                                    e,
                                    "FILE_NAME",
                                )
                            }
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "20rem" }}>
                    <span className="af-span-p red" style={{ width: "8rem" }}>*Inspection Date</span>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "9rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_ETA"
                            value={changeDateVal(dataEDT_KSV_PO_MRP.FACIN_DATE)}
                            onChange={(e) =>
                                onCalChangeEDT_KSV_PO_MRP_FACIN_DATE(
                                    e,
                                    "FACIN_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "10rem" }}>
                    <div className="af-span-di-btnv" style={{ width: "9rem" }}>
                        <Button
                            style={{ width: "9rem" }}
                            label="Save"
                            className="p-button-text"
                            onClick={process_FACIN}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "10rem" }}>
                    <div className="af-span-div-btn" style={{ width: "9rem" }}>
                        <Button
                            style={{ width: "9rem" }}
                            label="Reset"
                            className="p-button-text"
                            onClick={blankFn}
                        />
                    </div>
                </span>
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

            <Dialog class="loadingModal" visible={isProgress} modal>
                <ProgressSpinner />
            </Dialog>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0519_INSPECT_REPORT, comparisonFn);
