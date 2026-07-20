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
import { ServiceS043101_STSOUT_LIST } from "../service/service_biz/ServiceS043101_STSOUT_LIST";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_PO_MRP = {
    USER_ID: "",
    BUYER_CD: "",
    PO_CD: "",
    VENDOR_CD: "",
    MRP_DATE: "",
    PU_STATUS: "",
    PU_CD: "",
    ORIGIN_PORT: "",
    DESTINATION: "",
    PACK_CD: "",
    S_IN_DATE: "",
    E_IN_DATE: "",
};

const emptyQRY_KSV_PO_MRP2 = {
    IN_QTY: "",
};

const emptyQRY_KSV_PO_MRP1 = {
    BUYER_CD: "",
    PO_CD: "",
    VENDOR_CD: "",
    MRP_DATE: "",
    PU_CD: "",
    ORIGIN_PORT: "",
    DESTINATION: "",
    PACK_CD: "",
    S_IN_DATE: "",
    E_IN_DATE: "",
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
    INVOICE_NO: "",
    PAY_TERM: "",
    CT_QTY: "",
    CT_NO: "",
    REMARK: "",

    READY_DATE: "",
    ORIGIN_PORT: "",
    WEIGHT: "",
    GROSS_WEIGHT: "",

    TARGET_ETA: "",
    DESTINATION: "",
    CBM: "",

    PU_CD: "",
    BUYER_NAME: "",
    VENDOR_NAME: "",
};

const S043101_STSOUT_LIST = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS043101_STSOUT_LISTRef = useRef(null);
    if (!serviceS043101_STSOUT_LISTRef.current) serviceS043101_STSOUT_LISTRef.current = new ServiceS043101_STSOUT_LIST();
    const serviceS043101_STSOUT_LIST = serviceS043101_STSOUT_LISTRef.current;

    const toast = useRef(null);

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
    const search_LIST_1 = () => {
        var tObj0 = { ...dataQRY_KSV_PO_MRP1 };

        if (
            !tObj0.PO_CD &&
            !tObj0.PU_CD &&
            !tObj0.VENDOR_CD &&
            !tObj0.PACK_CD
        ) {
            alert(
                "Po , Pu, Supplier, Invoice#중 하나는 필수 입력값 입니다.<BR><BR> Please enter at least one of the following: Po, Pu, Supplier, Invoice#",
            );
            return;
        }

        var tObj = {};
        tObj.BUYER_CD = tObj0.BUYER_CD;
        tObj.PO_CD = tObj0.PO_CD;
        tObj.VENDOR_CD = tObj0.VENDOR_CD;
        tObj.PU_CD = tObj0.PU_CD;
        tObj.ORIGIN_PORT = tObj0.ORIGIN_PORT;
        tObj.DESTINATION = tObj0.DESTINATION;
        tObj.PACK_CD = tObj0.PACK_CD;
        tObj.S_IN_DATE = tObj0.S_IN_DATE;
        tObj.E_IN_DATE = tObj0.E_IN_DATE;

        setDatasTBL_KSV_PO_MRP([]);
        setLoadingTBL_KSV_PO_MRP(true);
        // 3-1
        serviceS043101_STSOUT_LIST.mgrQuery_LIST_1(tObj).then((data) => {
            setLoadingTBL_KSV_PO_MRP(false);
            if (typeof data.graphQLErrors === "undefined" && data.length > 0) {
                var tArray = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;

                    if (tObj.INVOICE_NO === "undefined") tObj.INVOICE_NO = "";

                    if (tObj.TRADE_TERM === "undefined") tObj.TRADE_TERM = "";

                    if (tObj.ORIGIN_PORT === "undefined") tObj.ORIGIN_PORT = "";

                    if (tObj.DESTINATION === "undefined") tObj.DESTINATION = "";

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

    const search_LIST_EXCEL = () => {
        if (selectedTBL_KSV_PO_MRP.length <= 0) {
            alert(
                "출력할 PU를 선택하세요.<BR><BR> Please select PU to output.",
            );
            return;
        }

        var tObj = {
            PU_CD: selectedTBL_KSV_PO_MRP.PU_CD,
        };

        setLoadingTBL_KSV_PO_MRP(true);

        serviceS043101_STSOUT_LIST.mgrQuery_EXCEL(tObj).then((data) => {
            setLoadingTBL_KSV_PO_MRP(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    if (data[0].CODE.includes("SUCC"))
                        serviceLib.downloadFile(
                            data[0].CODE.split("?")[2].toString(),
                            data[0].CODE.split("?")[1].toString(),
                        );
                }
            } else {
                console.log(
                    "mgrQuery_PO_CD error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_LIST_EXCEL2 = () => {
        var tObj0 = { ...dataQRY_KSV_PO_MRP1 };

        if (
            (tObj0.S_IN_DATE && tObj0.E_IN_DATE && tObj0.VENDOR_CD) ||
            tObj0.PACK_CD
        ) {
        } else {
            alert(
                "Supplier, in_date는 필수입력 입니다. 또는 Invoice#이 입력되어야 합니다. <br><br> Supplier and in_date are required. Or Invoice# must be entered.",
            );
            return;
        }

        var tObj = {};
        tObj.BUYER_CD = tObj0.BUYER_CD;
        tObj.PO_CD = tObj0.PO_CD;
        tObj.VENDOR_CD = tObj0.VENDOR_CD;
        tObj.PU_CD = tObj0.PU_CD;
        tObj.ORIGIN_PORT = tObj0.ORIGIN_PORT;
        tObj.DESTINATION = tObj0.DESTINATION;
        tObj.PACK_CD = tObj0.PACK_CD;
        tObj.S_IN_DATE = tObj0.S_IN_DATE;
        tObj.E_IN_DATE = tObj0.E_IN_DATE;

        setLoadingTBL_KSV_PO_MRP(true);
        serviceS043101_STSOUT_LIST.mgrQuery_EXCEL2(tObj).then((data) => {
            setLoadingTBL_KSV_PO_MRP(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    if (data[0].CODE.includes("SUCC"))
                        serviceLib.downloadFile(
                            data[0].CODE.split("?")[2].toString(),
                            data[0].CODE.split("?")[1].toString(),
                        );
                }
            } else {
                console.log(
                    "mgrQuery_PO_CD error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_LIST_2 = (argData) => {
        if (!argData) return;

        if (!argData.PO_CD) return;

        console.log(argData);

        var tObj = {};
        tObj.PU_CD = argData.PU_CD;
        tObj.PO_CD = argData.PO_CD;
        tObj.VENDOR_CD = argData.VENDOR_CD;
        tObj.PACK_CD = argData.PACK_CD;
        tObj.STSOUT_CD = argData.STSOUT_CD;

        setLoadingTBL_KSV_PO_MRP2(true);
        setDatasTBL_KSV_PO_MRP2([]);

        // 4_1
        serviceS043101_STSOUT_LIST.mgrQuery_LIST_2(tObj).then((data) => {
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

    const process_UPDATE_STSOUT = () => {
        if (!selectedTBL_KSV_PO_MRP) {
            alert(
                "업데이트할 데이타를 선택하십시요. <br><br> Please select data to update.",
            );
            return;
        }

        var tInObj = { ...selectedTBL_KSV_PO_MRP };
        if (typeof tInObj.__typename !== "undefined") delete tInObj.__typename;
        if (typeof tInObj.id !== "undefined") delete tInObj.id;

        tInObj.TRADE_TERM = dataEDT_KSV_PO_MRP.PAY_TERM;
        tInObj.CT_QTY = dataEDT_KSV_PO_MRP.CT_QTY;
        tInObj.READY_DATE = dataEDT_KSV_PO_MRP.READY_DATE;
        tInObj.ORIGIN_PORT = dataEDT_KSV_PO_MRP.ORIGIN_PORT;
        tInObj.ETA = dataEDT_KSV_PO_MRP.TARGET_ETA;
        tInObj.CBM = dataEDT_KSV_PO_MRP.CBM;
        tInObj.GROSS_WEIGHT = dataEDT_KSV_PO_MRP.GROSS_WEIGHT;

        setLoadingTBL_KSV_PO_MRP2(true);
        serviceS043101_STSOUT_LIST
            .mgrUpdate_UPDATE_STSOUT(tInObj)
            .then((data) => {
                setLoadingTBL_KSV_PO_MRP2(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) alert(data[0].CODE);
                    if (data[0].CODE.includes("SUCC")) {
                        search_LIST_1();
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

    const process_RESET = () => {
        setDatasTBL_KSV_PO_MRP2([]);
        setSelectedTBL_KSV_PO_MRP2([]);
        setDataEDT_KSV_PO_MRP(emptyEDT_KSV_PO_MRP);
    };

    const process_ALL_SELECT = () => {
        if (selectedTBL_KSV_PO_MRP2.length === datasTBL_KSV_PO_MRP2.length) {
            setSelectedTBL_KSV_PO_MRP2([]);
        } else {
            setSelectedTBL_KSV_PO_MRP2(datasTBL_KSV_PO_MRP2);
        }
    };

    const process_CANCEL_STSOUT = () => {
        if (!selectedTBL_KSV_PO_MRP) {
            alert("select data to cancel stsout");
            return;
        }

        if (selectedTBL_KSV_PO_MRP2.length <= 0) {
            alert("select data to cancel stsout");
            return;
        }

        var tObj = { ...selectedTBL_KSV_PO_MRP };
        if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
        if (typeof tObj.id !== "undefined") delete tObj.id;
        var tObjs = [];
        tObjs.push(tObj);

        var tObjs2 = selectedTBL_KSV_PO_MRP2.map((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (typeof tObj.id !== "undefined") delete tObj.id;
            return tObj;
        });

        var tCntStr = String(datasTBL_KSV_PO_MRP2.length);

        setLoadingTBL_KSV_PO_MRP2(true);
        serviceS043101_STSOUT_LIST
            .mgrDelete_CANCEL_STSOUT(tObjs, tObjs2, tCntStr)
            .then((data) => {
                setLoadingTBL_KSV_PO_MRP2(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) alert(data[0].CODE);
                    // console.log("mgrInsert_STOCK_IN call => " + data.length);

                    var tSelObj = { ...selectedTBL_KSV_PO_MRP };

                    setSelectedTBL_KSV_PO_MRP2([]);
                    setDatasTBL_KSV_PO_MRP2([]);
                    setSelectedTBL_KSV_PO_MRP([]);

                    if (data[0].CODE.includes("SUCC")) {
                        var tObj0 = { ...dataTBL_KSV_PO_MRP };
                        var tInput0 = {};
                        tInput0.BUYER_CD = "";
                        search_LIST_1(tInput0);
                        search_LIST_2(tSelObj);
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

    const [datasQRY_KSV_PO_MRP_PU_STATUS, setDatasQRY_KSV_PO_MRP_PU_STATUS] =
        useState([]);
    const [dataQRY_KSV_PO_MRP_PU_STATUS, setDataQRY_KSV_PO_MRP_PU_STATUS] =
        useState({});

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

    const onInputChangeQRY_KSV_PO_MRP1_DESTINATION = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP1 = { ...dataQRY_KSV_PO_MRP1 };

        let tTypeVal = _dataQRY_KSV_PO_MRP1[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP1[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP1(_dataQRY_KSV_PO_MRP1);
    };

    const onInputChangeQRY_KSV_PO_MRP1_PACK_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP1 = { ...dataQRY_KSV_PO_MRP1 };

        let tTypeVal = _dataQRY_KSV_PO_MRP1[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP1[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP1(_dataQRY_KSV_PO_MRP1);
    };
    const onCalChangeQRY_KSV_PO_MRP1_S_IN_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP1 };
        _dataQRY_KSV_PO_MRP[`${name}`] = val;
        setDataQRY_KSV_PO_MRP1(_dataQRY_KSV_PO_MRP);
    };

    const onCalChangeQRY_KSV_PO_MRP1_E_IN_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP1 };
        _dataQRY_KSV_PO_MRP[`${name}`] = val;
        setDataQRY_KSV_PO_MRP1(_dataQRY_KSV_PO_MRP);
    };

    const onInputChangeQRY_KSV_PO_MRP1_ORIGIN_PORT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP1 = { ...dataQRY_KSV_PO_MRP1 };

        let tTypeVal = _dataQRY_KSV_PO_MRP1[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP1[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP1(_dataQRY_KSV_PO_MRP1);
    };

    const onInputChangeQRY_KSV_PO_MRP1_PU_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP1 = { ...dataQRY_KSV_PO_MRP1 };

        let tTypeVal = _dataQRY_KSV_PO_MRP1[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP1[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP1(_dataQRY_KSV_PO_MRP1);
    };

    const onInputChangeQRY_KSV_PO_MRP1_PO_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP1 = { ...dataQRY_KSV_PO_MRP1 };

        let tTypeVal = _dataQRY_KSV_PO_MRP1[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP1[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP1(_dataQRY_KSV_PO_MRP1);
    };

    const onInputChangeQRY_KSV_PO_MRP1_VENDOR_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP1 = { ...dataQRY_KSV_PO_MRP1 };

        let tTypeVal = _dataQRY_KSV_PO_MRP1[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP1[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP1(_dataQRY_KSV_PO_MRP1);
    };

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
        let argData = argData0;

        let argTBL_KSV_PO_MRP = argData;

        setDataTBL_KSV_PO_MRP(argTBL_KSV_PO_MRP);

        search_LIST_2(argData);
        resetEDT_KSV_PO_MRP(argData);
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
        if (!argData) return;
        var tObj = { ...emptyEDT_KSV_PO_MRP };
        tObj.INVOICE_NO = argData.INVOICE_NO;
        tObj.PAY_TERM = argData.TRADE_TERM;
        tObj.CT_QTY = argData.CT_QTY;
        tObj.READY_DATE = argData.READY_DATE;
        tObj.ORIGIN_PORT = argData.ORIGIN_PORT;
        tObj.WEIGHT = argData.WEIGHT;
        tObj.GROSS_WEIGHT = argData.GROSS_WEIGHT;
        tObj.TARGET_ETA = argData.ETA;
        tObj.DESTINATION = argData.DESTINATION;
        tObj.CBM = argData.CBM;
        tObj.PU_CD = argData.PU_CD;
        tObj.BUYER_NAME = argData.BUYER_NAME;
        tObj.VENDOR_NAME = argData.VENDOR_NAME;
        setDataEDT_KSV_PO_MRP(tObj);

        editEDT_KSV_PO_MRP_ORIGIN_PORT(argData.ORIGIN_PORT);
    };

    const onInputChangeEDT_KSV_PO_MRP_VENDOR_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onInputChangeEDT_KSV_PO_MRP_BUYER_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onInputChangeEDT_KSV_PO_MRP_PU_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onInputChangeEDT_KSV_PO_MRP_INVOICE_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onInputChangeEDT_KSV_PO_MRP_PAY_TERM = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onInputChangeEDT_KSV_PO_MRP_CT_QTY = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onCalChangeEDT_KSV_PO_MRP_READY_DATE = (e, name) => {
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

    const [
        datasEDT_KSV_PO_MRP_ORIGIN_PORT,
        setDatasEDT_KSV_PO_MRP_ORIGIN_PORT,
    ] = useState([]);
    const [dataEDT_KSV_PO_MRP_ORIGIN_PORT, setDataEDT_KSV_PO_MRP_ORIGIN_PORT] =
        useState({});

    const editEDT_KSV_PO_MRP_ORIGIN_PORT = (argValue) => {
        let _dataEDT_KSV_PO_MRP_ORIGIN_PORT =
            datasEDT_KSV_PO_MRP_ORIGIN_PORT.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_PO_MRP_ORIGIN_PORT(_dataEDT_KSV_PO_MRP_ORIGIN_PORT[0]);
    };

    const onDropdownChangeEDT_KSV_PO_MRP_ORIGIN_PORT = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
        setDataEDT_KSV_PO_MRP_ORIGIN_PORT(e.value);
    };

    const onInputChangeEDT_KSV_PO_MRP_WEIGHT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onInputChangeEDT_KSV_PO_MRP_GROSS_WEIGHT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onCalChangeEDT_KSV_PO_MRP_TARGET_ETA = (e, name) => {
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

    const onInputChangeEDT_KSV_PO_MRP_DESTINATION = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onInputChangeEDT_KSV_PO_MRP_CBM = (e, name) => {
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
        serviceS043101_STSOUT_LIST.mgrQuery_CODE(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasQRY_KSV_PO_MRP1_BUYER_CD(data.BUYER_CD);
                setDataQRY_KSV_PO_MRP1_BUYER_CD(data.BUYER_CD[0]);

                setDatasEDT_KSV_PO_MRP_ORIGIN_PORT(data.ORIGIN_PORT);
                setDataEDT_KSV_PO_MRP_ORIGIN_PORT(data.ORIGIN_PORT[0]);
            } else {
                console.log(
                    "mgrQuery_PO_CD error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        // search_LIST_1();
    }, []);

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

    return (
        <div className="af-div-main">
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "6rem" }}
            >
                <span className="af-span-3-0" style={{ width: "9rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>Buyer</p>
                    <div className="af-span-div" style={{ width: "4rem" }}>
                        <InputText
                            style={{ width: "4rem" }}
                            id="id_TARGET_ETA"
                            value={dataQRY_KSV_PO_MRP1.BUYER_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP1_PO_CD(
                                    e,
                                    "BUYER_CD",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "15rem" }}>
                    <p className="af-span-p" style={{ width: "3rem" }}>PO#</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <InputText
                            style={{ width: "10rem" }}
                            id="id_TARGET_ETA"
                            value={dataQRY_KSV_PO_MRP1.PO_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP1_PO_CD(e, "PO_CD")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "24rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>Supplier</p>
                    <div className="af-span-div" style={{ width: "17rem" }}>
                        <InputText
                            style={{ width: "17rem" }}
                            id="id_TARGET_ETA"
                            value={dataQRY_KSV_PO_MRP1.VENDOR_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP1_VENDOR_CD(
                                    e,
                                    "VENDOR_CD",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "13rem" }}>
                    <p className="af-span-p" style={{ width: "2rem" }}>PU#</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <InputText
                            style={{ width: "10rem" }}
                            id="id_TARGET_ETA"
                            value={dataQRY_KSV_PO_MRP1.PU_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP1_PU_CD(e, "PU_CD")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "14rem" }}>
                    <p className="af-span-p" style={{ width: "3rem" }}>Origin</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <InputText
                            style={{ width: "10rem" }}
                            id="id_TARGET_ETA"
                            value={dataQRY_KSV_PO_MRP1.ORIGIN_PORT}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP1_ORIGIN_PORT(
                                    e,
                                    "ORIGIN_PORT",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Destination</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <InputText
                            style={{ width: "10rem" }}
                            id="id_TARGET_ETA"
                            value={dataQRY_KSV_PO_MRP1.DESTINATION}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP1_DESTINATION(
                                    e,
                                    "DESTINATION",
                                )
                            }
                        />
                    </div>
                </span>

                <span className="af-span-3-0" style={{ width: "7rem" }}>
                    <div className="af-span-div" style={{ width: "6rem" }}>
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
                            style={{ width: "6rem" }}
                            className="p-button-text"
                            onClick={search_LIST_1}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "7rem" }}>
                    <div className="af-span-div" style={{ width: "6rem" }}>
                        <Button
                            style={{ width: "6rem" }}
                            label="Reset"
                            className="p-button-text"
                            onClick={blankFn}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "7rem" }}>
                    <div className="af-span-div" style={{ width: "6rem" }}>
                        <Button
                            label="Excel"
                            style={{ width: "6rem" }}
                            className="p-button-text green"
                            onClick={search_LIST_EXCEL}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "26rem" }}>
                    <p className="af-span-p" style={{ width: "5rem" }}>INVOICE#</p>
                    <div className="af-span-div" style={{ width: "20rem" }}>
                        <InputText
                            style={{ width: "20rem" }}
                            id="id_TARGET_ETA"
                            value={dataQRY_KSV_PO_MRP1.PACK_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP1_PACK_CD(
                                    e,
                                    "PACK_CD",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "24rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Out Date</p>
                    <div className="af-span-div" style={{ width: "17rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "17rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_S_PO_DATE"
                            value={changeDateVal(dataQRY_KSV_PO_MRP1.S_IN_DATE)}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_PO_MRP1_S_IN_DATE(
                                    e,
                                    "S_IN_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "19rem" }}>
                    <p className="af-span-p" style={{ width: "1rem" }}>~</p>
                    <div className="af-span-div" style={{ width: "17rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "17rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_S_PO_DATE"
                            value={changeDateVal(dataQRY_KSV_PO_MRP1.E_IN_DATE)}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_PO_MRP1_E_IN_DATE(
                                    e,
                                    "E_IN_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "7rem" }}>
                    <div className="af-span-div" style={{ width: "6rem" }}>
                        <Button
                            label="Excel2"
                            style={{ width: "6rem" }}
                            className="p-button-text green"
                            onClick={search_LIST_EXCEL2}
                        />
                    </div>
                </span>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "15rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_PO_MRP}
                    size="small"
                    value={datasTBL_KSV_PO_MRP}
                    tableStyle={{ tableLayout: "fixed" }}
                    loading={loadingTBL_KSV_PO_MRP}
                    showGridlines
                    selectionMode="checkbox"
                    resizableColumns
                    columnResizeMode="expand"
                    selection={selectedTBL_KSV_PO_MRP}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_PO_MRP(true);
                        setSelectedTBL_KSV_PO_MRP(e.value);
                        onRowClick1TBL_KSV_PO_MRP(e.value);
                    }}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" " //header={headerTBL_KSV_PO_MRP}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="15rem"
                >
                    <AFColumn selectionMode="single" field="__checkbox__" reorderable={false} headerStyle={{ width: "5px" }} bodyStyle={{ width: "5px" }} style={{ width: "5px" }} ></AFColumn>
                    <AFColumn field="PU_CD" headerClassName="t-header" header="Pu#" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PO_CD" headerClassName="t-header" header="Po#" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Supplier" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="STSOUT_CD" headerClassName="t-header" header="Stsout#" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PACK_CD" headerClassName="t-header" header="Pack.Cd" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>

                    <AFColumn field="INVOICE_NO" headerClassName="t-header" header="Invoice.No" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="TRADE_TERM" headerClassName="t-header" header="Trade.Term" style={{ width: "4rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="READY_DATE" headerClassName="t-header" header="Ready.Date" style={{ width: "6rem", flexBasis: "auto" }} body={(rowData) => serviceLib.dateFormatHMS(rowData.READY_DATE) } ></AFColumn>
                    <AFColumn field="ETA" headerClassName="t-header" header="Target.ETA" style={{ width: "6rem", flexBasis: "auto" }} body={(rowData) => serviceLib.dateFormatHMS(rowData.ETA) } ></AFColumn>
                    <AFColumn field="ORIGIN_PORT" headerClassName="t-header" header="Origin" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="DESTINATION" headerClassName="t-header" header="Destination" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="CT_QTY" headerClassName="t-header" header="Ct.Qty" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.CT_QTY, 2) } ></AFColumn>
                    <AFColumn field="CT_NO" headerClassName="t-header" header="CT" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="CBM" headerClassName="t-header" header="CBM" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="GROSS_WEIGHT" headerClassName="t-header" header="Weight" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.GROSS_WEIGHT, 2) } ></AFColumn>
                    <AFColumn field="WEIGHT" headerClassName="t-header" header="Net Weight" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.WEIGHT / 1000, 2) } ></AFColumn>
                    <AFColumn field="VENDOR_CD" headerClassName="t-header" header="Supplier#" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="BUYER_CD" headerClassName="t-header" header="Buyer" style={{ width: "3rem", flexBasis: "auto" }} ></AFColumn>
                </AFDataTable>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "10.5rem" }}
            >
                <span className="af-span-3-0" style={{ width: "24rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>PU#</p>
                    <div className="af-span-div" style={{ width: "17rem" }}>
                        <InputText
                            disabled
                            style={{ width: "17rem" }}
                            id="id_TARGET_ETA"
                            value={dataEDT_KSV_PO_MRP.PU_CD}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_PU_CD(e, "PU_CD")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "24rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Invoice#</p>
                    <div className="af-span-div" style={{ width: "17rem" }}>
                        <InputText
                            disabled
                            style={{ width: "17rem" }}
                            id="id_TARGET_ETA"
                            value={dataEDT_KSV_PO_MRP.INVOICE_NO}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_INVOICE_NO(
                                    e,
                                    "INVOICE_NO",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "24rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Term</p>
                    <div className="af-span-div" style={{ width: "17rem" }}>
                        <InputText
                            disabled
                            style={{ width: "17rem" }}
                            id="id_TARGET_ETA"
                            value={dataEDT_KSV_PO_MRP.PAY_TERM}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_PAY_TERM(
                                    e,
                                    "PAY_TERM",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "16rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>C/T Qty</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            style={{ width: "9rem" }}
                            id="id_TARGET_ETA"
                            value={dataEDT_KSV_PO_MRP.CT_QTY}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_CT_QTY(e, "CT_QTY")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "22rem" }}>
                    <div className="af-span-div" style={{ width: "13rem" }}>
                        <Button
                            label="Update"
                            style={{ width: "13rem" }}
                            className="p-button-text"
                            onClick={process_UPDATE_STSOUT}
                        />
                    </div>
                    <p className="af-span-p" style={{ width: "1rem" }}></p>
                    <div className="af-span-div" style={{ width: "7rem" }}>
                        <Button
                            label="All Sel"
                            style={{ width: "7rem" }}
                            className="p-button-text"
                            onClick={process_ALL_SELECT}
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "24rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Buyer</p>
                    <div className="af-span-div" style={{ width: "17rem" }}>
                        <InputText
                            disabled
                            style={{ width: "17rem" }}
                            id="id_TARGET_ETA"
                            value={dataEDT_KSV_PO_MRP.BUYER_NAME}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_BUYER_NAME(
                                    e,
                                    "BUYER_NAME",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "24rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Ready Date</p>
                    <div className="af-span-div" style={{ width: "17rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "17rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_S_PO_DATE"
                            value={changeDateVal(dataEDT_KSV_PO_MRP.READY_DATE)}
                            onChange={(e) =>
                                onCalChangeEDT_KSV_PO_MRP_READY_DATE(
                                    e,
                                    "READY_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "24rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Origin Port</p>
                    <div className="af-span-div" style={{ width: "17rem" }}>
                        <Dropdown
                            style={{ width: "17rem" }}
                            id="id_PO_CD"
                            filter
                            value={dataEDT_KSV_PO_MRP_ORIGIN_PORT}
                            onChange={(e) =>
                                onDropdownChangeEDT_KSV_PO_MRP_ORIGIN_PORT(
                                    e,
                                    "ORIGIN_PORT",
                                )
                            }
                            options={datasEDT_KSV_PO_MRP_ORIGIN_PORT}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "16rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>CBM</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            style={{ width: "9rem" }}
                            id="id_TARGET_ETA"
                            value={dataEDT_KSV_PO_MRP.CBM}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_CBM(e, "CBM")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "14rem" }}>
                    <div className="af-span-div" style={{ width: "13rem" }}>
                        <Button
                            style={{ width: "13rem" }}
                            label="STSOUT Cancel"
                            className="p-button-text"
                            onClick={process_CANCEL_STSOUT}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "8rem" }}>
                    <div className="af-span-div" style={{ width: "7rem" }}>
                        <Button
                            style={{ width: "7rem" }}
                            label="Reset"
                            className="p-button-text"
                            onClick={process_RESET}
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "24rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Vendor</p>
                    <div className="af-span-div" style={{ width: "17rem" }}>
                        <InputText
                            disabled
                            style={{ width: "17rem" }}
                            id="id_TARGET_ETA"
                            value={dataEDT_KSV_PO_MRP.VENDOR_NAME}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_VENDOR_NAME(
                                    e,
                                    "VENDOR_NAME",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "24rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Target ETA</p>
                    <div className="af-span-div" style={{ width: "17rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "17rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_S_PO_DATE"
                            value={changeDateVal(dataEDT_KSV_PO_MRP.TARGET_ETA)}
                            onChange={(e) =>
                                onCalChangeEDT_KSV_PO_MRP_TARGET_ETA(
                                    e,
                                    "TARGET_ETA",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "24rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Destination</p>
                    <div className="af-span-div" style={{ width: "17rem" }}>
                        <InputText
                            disabled
                            style={{ width: "17rem" }}
                            id="id_TARGET_ETA"
                            value={dataEDT_KSV_PO_MRP.DESTINATION}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_DESTINATION(
                                    e,
                                    "DESTINATION",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "16rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Weight</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            style={{ width: "9rem" }}
                            id="id_TARGET_ETA"
                            value={dataEDT_KSV_PO_MRP.GROSS_WEIGHT}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_GROSS_WEIGHT(
                                    e,
                                    "GROSS_WEIGHT",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "16rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Net Weight</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            className="text-right"
                            disabled
                            style={{ width: "9rem" }}
                            id="id_TARGET_ETA"
                            value={serviceLib.formatNumber(
                                dataEDT_KSV_PO_MRP.WEIGHT / 1000,
                                2,
                            )}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_WEIGHT(e, "WEIGHT")
                            }
                        />
                    </div>
                </span>
            </div>

            <div
                className="af-div-first"
                style={{ width: "100%", height: "35rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_PO_MRP2}
                    size="small"
                    value={datasTBL_KSV_PO_MRP2}
                    tableStyle={{ tableLayout: "fixed" }}
                    resizableColumns
                    columnResizeMode="expand"
                    loading={loadingTBL_KSV_PO_MRP2}
                    metaKeySelection={false}
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_PO_MRP2}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_PO_MRP2(true);
                        setSelectedTBL_KSV_PO_MRP2(e.value);
                        console.log(
                            "selected length:" + selectedTBL_KSV_PO_MRP2.length,
                        );
                        onRowClick1TBL_KSV_PO_MRP2(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_PO_MRP2}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" " //header={headerTBL_KSV_PO_MRP2}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="34rem"
                >
                    <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "3rem" }} ></AFColumn>
                    <AFColumn field="BUYER_CD" headerClassName="t-header" header="Buyer#" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PO_CD" headerClassName="t-header" header="Po" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_CD" headerClassName="t-header" header="Material" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_NAME" headerClassName="t-header" header="Description" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="COLOR" headerClassName="t-header" header="Color" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="SPEC" headerClassName="t-header" header="Spec" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="UNIT" headerClassName="t-header" header="Unit" style={{ width: "5rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="SHIP_QTY" headerClassName="t-header" header="STSIN Qty" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.formatNumber(rowData.SHIP_QTY, 2) } ></AFColumn>
                    <AFColumn field="OUT_QTY" headerClassName="t-header" header="StsOut Qty" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.formatNumber(rowData.OUT_QTY, 2) } ></AFColumn>
                    <AFColumn field="WEIGHT" headerClassName="t-header" header="Weight" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.formatNumber(rowData.WEIGHT / 1000, 2) } ></AFColumn>
                    <AFColumn field="HS_CD" headerClassName="t-header" header="HS Code" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="COMP" headerClassName="t-header" header="Composition" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="V_COMP" headerClassName="t-header" header="V Composition" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="OFFER_SPEC" headerClassName="t-header" header="Offer Spec" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="OUT_QTY2" headerClassName="t-header" header="StsOut Qty2" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.formatNumber(rowData.OUT_QTY2, 2) } ></AFColumn>
                    <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Supplier" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="CT_QTY" headerClassName="t-header" header="CT Qty" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="CT_NO" headerClassName="t-header" header="CT No" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PU_CD" headerClassName="t-header" header="PU#" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="REMARK" headerClassName="t-header" header="Remark" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="SHIPMENT_CD" headerClassName="t-header" header="Shipment#" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                </AFDataTable>
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

export default React.memo(S043101_STSOUT_LIST, comparisonFn);
