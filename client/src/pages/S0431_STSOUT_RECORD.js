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

import { ServiceLib } from "../service/service_lib/ServiceLib";
import { ServiceS0431_STSOUT_RECORD } from "../service/service_biz/ServiceS0431_STSOUT_RECORD";

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
    INVOICE_NO: "",
    PAY_TERM: "",
    CT_QTY: "",
    CT_NO: "",
    REMARK: "",
    PU_CD: "",

    READY_DATE: "",
    ORIGIN_PORT: "",
    WEIGHT: "",
    BUYER_NAME: "",

    TARGET_ETA: "",
    DESTINATION: "",
    CBM: "",
    VENDOR_NAME: "",
    GROSS_WEIGHT: "",

    PACK_CD: "",
    SENDER: "",
    RECEIVER: "",
    SHIP_MODE: "",
};

const S0431_STSOUT_RECORD = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0431_STSOUT_RECORDRef = useRef(null);
    if (!serviceS0431_STSOUT_RECORDRef.current) serviceS0431_STSOUT_RECORDRef.current = new ServiceS0431_STSOUT_RECORD();
    const serviceS0431_STSOUT_RECORD = serviceS0431_STSOUT_RECORDRef.current;

    const toast = useRef(null);

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

    const popup_MATL_MST = (e) => {
        if (selectedTBL_KSV_PO_MRP2.length <= 0) return;
        var tObj = { ...selectedTBL_KSV_PO_MRP2[0] };

        var tUrl = `${window.location.origin}/#/`;
        tUrl += "S0301_MATL_RECORD?MATL_CD=" + tObj.MATL_CD;

        var tUrl2 = "S0301_MATL_RECORD?MATL_CD=" + tObj.MATL_CD;

        var tValObj = {
            key: "2-1",
            label: "Matl Record",
            icon: "pi pi-fw pi-user-edit",
            url1: "S0301_MATL_RECORD",
        };
        var tArgObj = { ...tValObj };
        tArgObj.url1 = tUrl2;
        var tFuncObj = {};
        tFuncObj.func = "call_url";
        tFuncObj.message = { ...tArgObj };
        window.parent.postMessage(tFuncObj, "*");
    };

    // Search

    // Search KSV_STOCK_MEM
    const search_LIST_1 = (argPuCd) => {
        var tObj0 = window.sessionStorage.getItem("S0401_STSOUT_INFO");
        var tObjs = JSON.parse(tObj0);

        var tInObjs = [];
        var tPuCds = "";
        tObjs.forEach((col, i) => {
            var tObj = {};
            tObj.PU_CD = col.PU_CD;
            if (tPuCds === "") tPuCds = `${col.PU_CD}`;
            else tPuCds += `/${col.PU_CD}`;
            tInObjs.push(tObj);
        });

        setLoadingTBL_KSV_PO_MRP(true);

        // 3_1
        serviceS0431_STSOUT_RECORD.mgrQuery_LIST_1(tInObjs).then((data) => {
            setLoadingTBL_KSV_PO_MRP(false);
            if (typeof data.graphQLErrors === "undefined") {
                var tArray = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    return tObj;
                });
                if (tArray.length > 0) {
                    setDataTBL_KSV_PO_MRP(tArray[0]);
                    search_CODE(tArray[0], tPuCds);
                }
            } else {
                console.log(
                    "mgrQuery_PO_CD error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_CODE = (argData, tPuCds) => {
        var tObj = {};
        serviceS0431_STSOUT_RECORD.mgrQuery_CODE(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                originPortList = data.ORIGIN_PORT;
                setDatasQRY_KSV_PO_MRP1_BUYER_CD(data.BUYER_CD);
                setDataQRY_KSV_PO_MRP1_BUYER_CD(data.BUYER_CD[0]);

                setDatasEDT_KSV_PO_MRP_ORIGIN_PORT(data.ORIGIN_PORT);
                var tObj = {};
                data.ORIGIN_PORT.forEach((col, i) => {
                    if (col.CD_CODE === argData.ORIGIN_PORT) tObj = { ...col };
                });

                if (typeof tObj.CD_CODE !== "undefined") {
                    setDataEDT_KSV_PO_MRP_ORIGIN_PORT(tObj);
                } else {
                    setDataEDT_KSV_PO_MRP_ORIGIN_PORT(data.ORIGIN_PORT[0]);
                }

                setDatasEDT_KSV_PO_MRP_SENDER(data.SENDER);
                var tObj = {};
                data.SENDER.forEach((col, i) => {
                    if (col.USER_ID === argData.SENDER) tObj = { ...col };
                });
                if (typeof tObj.USER_ID !== "undefined")
                    setDataEDT_KSV_PO_MRP_SENDER(tObj);
                else setDataEDT_KSV_PO_MRP_SENDER(data.SENDER[0]);

                setDatasEDT_KSV_PO_MRP_RECEIVER(data.RECEIVER);
                var tObj = {};
                data.RECEIVER.forEach((col, i) => {
                    if (col.USER_ID === argData.RECEIVER) tObj = { ...col };
                });
                if (typeof tObj.USER_ID !== "undefined")
                    setDataEDT_KSV_PO_MRP_RECEIVER(tObj);
                else setDataEDT_KSV_PO_MRP_RECEIVER(data.RECEIVER[0]);

                const exclude = ["FCL", "LCL"];

                data.SHIP_MODE = data.SHIP_MODE.filter((val) => {
                    return !exclude.includes(val.CD_NAME);
                });

                setDatasEDT_KSV_PO_MRP_SHIP_MODE(data.SHIP_MODE);
                setDataEDT_KSV_PO_MRP_SHIP_MODE(data.SHIP_MODE[0]);

                resetEDT_KSV_PO_MRP(argData, tPuCds);
            } else {
                console.log(
                    "mgrQuery_PO_CD error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_LIST_2 = (argPuCd) => {
        var tObj0 = window.sessionStorage.getItem("S0401_STSOUT_INFO");
        var tObjs = JSON.parse(tObj0);

        var tInObjs = [];
        var tPuCds = "";
        tObjs.forEach((col, i) => {
            var tObj = {};
            tObj.PU_CD = col.PU_CD;
            if (tPuCds === "") tPuCds = `${col.PU_CD}`;
            else tPuCds += `/${col.PU_CD}`;
            tInObjs.push(tObj);
        });

        setLoadingTBL_KSV_PO_MRP2(true);

        // 4_2
        serviceS0431_STSOUT_RECORD.mgrQuery_LIST_2(tInObjs).then((data) => {
            setLoadingTBL_KSV_PO_MRP2(false);
            if (typeof data.graphQLErrors === "undefined") {
                var tArray = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    tObj.OUT_QTY = tObj.BAL_QTY;
                    tObj.WEIGHT = tObj.WEIGHT / 1000;
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

    const process_INSERT_STSOUT_1 = () => {
        var tWeight = 0;
        var tSTSIN_CD = "";
        var tCheck = 0;
        var tCheck1_1 = 0;
        var tCheck1_2 = 0;
        var tCheck1_3 = 0;
        var tCheck2 = 0;

        var tSavePoCd = "";

        var tCheckFlag = 0;
        var inOutArray = [];

        if (isSea && !dataEDT_KSV_PO_MRP.CBM) {
            alert("CBM이 입력되어야 합니다.<BR><BR>CBM is required");
            return;
        }

        if (isAir && !dataEDT_KSV_PO_MRP.GROSS_WEIGHT) {
            alert("Weight가 입력되어야 합니다.<BR><BR>Weight is required.");
            return;
        }

        selectedTBL_KSV_PO_MRP2.forEach((col, i) => {
            var totalQty = 0;
            col.DATAS.forEach((col1, i1) => {
                totalQty += parseFloat(col1.SHIP_QTY);
            });
            totalQty = parseFloat(col.OUT_QTY);

            var tRemainQty = totalQty;
            col.DATAS.forEach((col1, i1) => {
                var tObj = { ...col1 };
                if (typeof tObj.__typename !== "undefined")
                    delete tObj.__typename;
                if (typeof tObj.id !== "undefined") delete tObj.id;

                if (!tObj.PU_CD) tObj.PU_CD = col.PU_CD;
                if (!tObj.VENDOR_CD) tObj.VENDOR_CD = col.VENDOR_CD;

                var wOutQty = 0;
                if (totalQty > parseFloat(tObj.BAL_QTY)) {
                    if (i1 === col.DATAS.length - 1) {
                        wOutQty = parseFloat(totalQty);
                        totalQty = 0;
                    } else {
                        wOutQty = parseFloat(tObj.BAL_QTY);
                        totalQty -= wOutQty;
                    }
                } else {
                    wOutQty = totalQty;
                    totalQty = 0;
                }

                if (!tObj.SURCHARGE_AMT) tObj.SURCHARGE_AMT = 0;
                if (!tObj.MOQ_QTY) tObj.MOQ_QTY = 0;

                var tRate = parseFloat(wOutQty) / parseFloat(tObj.BAL_QTY);
                tObj.SHIP_QTY = serviceLib.numToFixed(parseFloat(wOutQty), 2);
                tObj.OUT_QTY = serviceLib.numToFixed(parseFloat(wOutQty), 2);
                tObj.MOQ_QTY = serviceLib.numToFixed(
                    tRate * parseFloat(col.MOQ_QTY),
                    2,
                );
                tObj.SURCHARGE_AMT = serviceLib.numToFixed(
                    tRate * parseFloat(col.SURCHARGE_AMT),
                    2,
                );
                tObj.BAL_QTY = serviceLib.numToFixed(
                    tRate * parseFloat(col.BAL_QTY),
                    2,
                );
                tObj.WEIGHT = serviceLib.numToFixed(col.WEIGHT, 4);

                inOutArray.push(tObj);
            });
        });

        var tObjs = inOutArray.map((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (typeof tObj.id !== "undefined") delete tObj.id;
            // tWeight += parseFloat(tObj.WEIGHT*1000);
            tWeight += parseFloat(tObj.WEIGHT);
            if (tSTSIN_CD !== "" && tSTSIN_CD !== tObj.STSIN_CD) tCheck2 = 1;
            tSTSIN_CD = tObj.STSIN_CD;
            if (parseFloat(tObj.WEIGHT) <= 0) tCheck = 1;

            tSavePoCd = tObj.PO_CD;

            if (tObj.BILL_TO === "SHINTS") {
                if (tObj.LEADER_CONFIRM === "") tCheck1_1 = 1;
                else if (
                    parseFloat(tObj.MOQ_QTY) > 0 &&
                    tObj.MOQ_CONFIRM === ""
                )
                    tCheck1_2 = 1;
                else if (
                    parseFloat(tObj.SURCHARGE_AMT) > 0 &&
                    tObj.SURCHARGE_CONFIRM === ""
                )
                    tCheck1_3 = 1;
            }

            tObj.WEIGHT = String(tObj.WEIGHT);
            return tObj;
        });

        var tInputArray = [];
        var tInput = { ...dataEDT_KSV_PO_MRP };
        if (!tInput.GROSS_WEIGHT) tInput.GROSS_WEIGHT = "0";
        tInput.PU_CD = dataTBL_KSV_PO_MRP.PU_CD;
        tInput.STSIN_CD = tSTSIN_CD;
        tInput.CT_QTY = String(tInput.CT_QTY);
        tInput.WEIGHT = String(tWeight);
        tInput.CBM = String(tInput.CBM);
        tInputArray.push(tInput);

        // FCL 또는 LCL
        if (tInput.SHIP_MODE === "1" || tInput.SHIP_MODE === "1") {
            if (!tInput.CBM) {
                alert(
                    "FCL또는 LCL의 경우 CBM이 입력되어야 합니다.<BR><BR>If FCL or LCL, CBM is required.",
                );
                return;
            }
        }

        // FEDEX, DHL
        if (tInput.SHIP_MODE === "4" || tInput.SHIP_MODE === "5") {
            if (!tInput.REMARK) {
                alert(
                    "DHL, FEDEX 는 Remark가 입력되어야 합니다.<BR><BR>If DHL or FEDEX, Remark is required.",
                );
                return;
            }
        }

        if (isFactory && !tInput.REMARK) {
            alert(
                "Factory Supplier는 Remark가 입력되어야 합니다.<BR><BR>If Factory Supplier, Remark is required.",
            );
            return;
        }

        if (!tInput.ORIGIN_PORT || !tInput.CT_QTY) {
            alert(
                "C/T Qty, Origin Port은 필수 입력값입니다.<br><br>C/T Qty, Origin Port are required inputs.",
            );
            return;
        }
        if (!tInput.SHIP_MODE) {
            if (isFactory) {
                if (!tInput.SHIP_MODE) tInput.SHIP_MODE = "1";
            } else {
                alert(
                    "C/T Qty, Origin Port, Ship Mode은 필수 입력값입니다.<br><br>C/T Qty, Origin Port, and Ship Mode are required inputs.",
                );
                return;
            }
        }

        var tInput0 = { ...dataEDT_KSV_PO_MRP };
        tInput0.WEIGHT = String(tWeight);
        setDataEDT_KSV_PO_MRP(tInput0);

        //setIsProgress(true);

        serviceS0431_STSOUT_RECORD
            .mgrInsert_STSOUT_1(tInputArray, inOutArray)
            .then((data) => {
                setIsProgress(false);
                if (typeof data.graphQLErrors === "undefined") {
                    // console.log("mgrInsert_STOCK_IN call => " + data.length);

                    if (data.length > 0) alert(data[0].CODE);

                    if (data[0].CODE.includes("SUCC")) {
                        setSelectedTBL_KSV_PO_MRP2([]);
                        setSelectedTBL_KSV_PO_MRP([]);

                        setDatasTBL_KSV_PO_MRP2([]);
                        setDatasTBL_KSV_PO_MRP([]);

                        var _tCol = data[0].CODE.split(":");
                        // var tInvoiceNo = _tCol[1];

                        // var _tObj = { ...dataEDT_KSV_PO_MRP };
                        // _tObj.INVOICE_NO = tInvocieNo;
                        // setDataEDT_KSV_PO_MRP(_tObj);

                        var tObj0 = { ...dataTBL_KSV_PO_MRP };
                        var tInput0 = {};
                        tInput0.PU_CD = tObj0.PU_CD;
                        // search_LIST_2(tInput0);
                        search_LIST_1();

                        /*
                        var tTmpPoCd = tSavePoCd;
                        var tUrl = `${window.location.origin}/#/`;
                        tUrl += `S0401_PURCHASING_MANAGER?OP_CODE=SEARCH&OP_CODE1=STSOUT&PU_CD=${tObj0.PU_CD}`;

                        var tUrl2 = `S0401_PURCHASING_MANAGER?OP_CODE=SEARCH&OP_CODE1=STSOUT&PU_CD=${tObj0.PU_CD}`;
                        var tValObj = {
                            key: "3-1",
                            label: "Purchase Manager",
                            icon: "pi pi-fw pi-user-edit",
                            width: "1365px",
                            height: "675px",
                            url1: "S0401_PURCHASING_MANAGER",
                        };
                        var tArgObj = { ...tValObj };
                        tArgObj.url1 = tUrl2;
                        var tFuncObj = {};
                        tFuncObj.func = "call_url";
                        tFuncObj.message = { ...tArgObj };
                        window.parent.postMessage(tFuncObj, "*");
                        */
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

    const [sumOutQty, setSumOutQty] = useState(0);
    const onRowClick1TBL_KSV_PO_MRP2 = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_PO_MRP2 = argData;

        setDataTBL_KSV_PO_MRP2(argTBL_KSV_PO_MRP2);

        var tWeight = 0;
        let sumOutQty = 0;
        argData0.forEach((col, i) => {
            var tObj = { ...col };
            tWeight += parseFloat(col.WEIGHT) * parseFloat(col.OUT_QTY);
            sumOutQty += parseFloat(col.OUT_QTY);
        });

        setDataEDT_KSV_PO_MRP((prev) => ({
            ...prev,
            WEIGHT: String(tWeight),
        }));
        setSumOutQty(sumOutQty);
    };

    const onCellEditCompleteKSV_PO_MRP2 = (e) => {
        let { rowData, newValue, field, originalEvent: event } = e;

        // if (rowData.BAL_QTY <= 0) return;

        // rowData[field] = serviceLib.getFloat(parseFloat(newValue), 2);
        rowData[field] = newValue;

        let sumOutQty = 0;
        selectedTBL_KSV_PO_MRP2.forEach((col, i) => {
            sumOutQty += parseFloat(col.OUT_QTY);
        });
        setSumOutQty(sumOutQty);
    };

    const cellEditorKSV_PO_MRP2 = (options) => {
        if (options.field === "SURCHARGE_REMARK")
            return textEditorText(options);
        else return textEditorNum(options);
    };

    const onChangeTextEdit = (e, options) => {
        console.log("onChangeTextEdit=>", e.target.value);
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
                keyfilter="pnum"
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

    let originPortList = [];
    const resetEDT_KSV_PO_MRP = (argData, argPuCds) => {
        let tRetDate = serviceLib.getCurrDate();

        var tObj = { ...dataEDT_KSV_PO_MRP };
        tObj.TARGET_ETA = argData.TARGET_ETA;
        if (argData.FACTORY_CD === "FC034") tObj.DESTINATION = "BVT";
        else if (argData.FACTORY_CD === "FC044") tObj.DESTINATION = "ETP";
        else if (argData.FACTORY_CD === "FC010") tObj.DESTINATION = "SHINTS";
        else if (argData.FACTORY_CD === "FC045") tObj.DESTINATION = "SHINTS";
        else tObj.DESTINATION = "BVT";
        tObj.PAY_TERM = argData.TRADE_TERM;

        // tObj.ORIGIN_PORT = argData.NAT_NAME;
        tObj.ORIGIN_PORT = argData.ORIGIN_PORT;

        var tOrigin = "";
        var tDest = "";
        var tInvoiceNo = "";

        if (
            tObj.ORIGIN_PORT.toUpperCase() === "KOREA" ||
            tObj.ORIGIN_PORT.toUpperCase() === "SEOUL" ||
            tObj.ORIGIN_PORT.toUpperCase() === "INCHEON" ||
            tObj.ORIGIN_PORT.toUpperCase() === "BUSAN"
        )
            tOrigin = "S";
        else tOrigin = "O";

        if (tObj.DESTINATION === "BVT") tDest = "B";
        else if (tObj.DESTINATION === "ETP") tDest = "E";
        else if (tObj.DESTINATION === "SHINTS") tDest = "S";
        else tDest = "O";
        tInvoiceNo = `${tOrigin}T${tDest}-M${tRetDate.substring(2, 4)}-${tRetDate}`;

        tObj.INVOICE_NO = tInvoiceNo;
        // tObj.PU_CD = argData.PU_CD;
        tObj.PU_CD = "";
        if (!argPuCds);
        else tObj.PU_CD = argPuCds;
        tObj.BUYER_NAME = argData.BUYER_NAME;
        tObj.VENDOR_NAME = argData.VENDOR_NAME;
        tObj.READY_DATE = tRetDate.substring(0, 8);

        if (
            tObj.VENDOR_NAME.includes("FACTORY") &&
            tObj.DESTINATION === "BVT"
        ) {
            setIsFactory(true);
        } else {
            setIsFactory(false);
        }

        setDataEDT_KSV_PO_MRP(tObj);

        if (tObj.VENDOR_NAME.includes("BUYER")) {
            console.log(originPortList[4]);
            setDataEDT_KSV_PO_MRP_ORIGIN_PORT(originPortList[4]);
            setDataEDT_KSV_PO_MRP({
                ...tObj,
                ORIGIN_PORT: originPortList[4].CD_CODE,
            });
        }
    };

    const [
        datasEDT_KSV_PO_MRP_ORIGIN_PORT,
        setDatasEDT_KSV_PO_MRP_ORIGIN_PORT,
    ] = useState([]);
    const [dataEDT_KSV_PO_MRP_ORIGIN_PORT, setDataEDT_KSV_PO_MRP_ORIGIN_PORT] =
        useState({});

    const onDropdownChangeEDT_KSV_PO_MRP_ORIGIN_PORT = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        var tRetDate = serviceLib.getCurrDate();

        var tOrigin = "";
        if (
            val.toUpperCase() === "KOREA" ||
            val.toUpperCase() === "SEOUL" ||
            val.toUpperCase() === "INCHEON" ||
            val.toUpperCase() === "BUSAN"
        )
            tOrigin = "S";
        else tOrigin = "O";

        var tDest = "";
        if (_dataEDT_KSV_PO_MRP.DESTINATION === "BVT") tDest = "B";
        else if (_dataEDT_KSV_PO_MRP.DESTINATION === "ETP") tDest = "E";
        else if (_dataEDT_KSV_PO_MRP.DESTINATION === "SHINTS") tDest = "S";
        else tDest = "O";

        var tInvoiceNo = `${tOrigin}T${tDest}-M${tRetDate.substring(2, 4)}-${tRetDate}`;
        _dataEDT_KSV_PO_MRP.INVOICE_NO = tInvoiceNo;

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);

        setDataEDT_KSV_PO_MRP_ORIGIN_PORT(e.value);
    };

    const [datasEDT_KSV_PO_MRP_SHIP_MODE, setDatasEDT_KSV_PO_MRP_SHIP_MODE] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_SHIP_MODE, setDataEDT_KSV_PO_MRP_SHIP_MODE] =
        useState({});

    const [isSea, setIsSea] = useState(false);
    const [isAir, setIsAir] = useState(false);
    const [CBMLabel, setCBMLabel] = useState("CBM");
    const [weightLabel, setWeightLabel] = useState("Weight(kg)");
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

        if (e.value.CD_NAME === "SEA") {
            setIsSea(true);
            setIsAir(false);
            setCBMLabel("*CBM");
            setWeightLabel("Weight(kg)");
        } else if (e.value.CD_NAME === "AIR") {
            setIsAir(true);
            setIsSea(false);
            setCBMLabel("CBM");
            setWeightLabel("*Weight(kg)");
        } else {
            setIsSea(false);
            setIsAir(false);
            setCBMLabel("CBM");
            setWeightLabel("Weight(kg)");
        }
    };

    const [datasEDT_KSV_PO_MRP_SENDER, setDatasEDT_KSV_PO_MRP_SENDER] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_SENDER, setDataEDT_KSV_PO_MRP_SENDER] = useState(
        {},
    );

    const [datasEDT_KSV_PO_MRP_RECEIVER, setDatasEDT_KSV_PO_MRP_RECEIVER] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_RECEIVER, setDataEDT_KSV_PO_MRP_RECEIVER] =
        useState({});

    const onInputChangeEDT_KSV_PO_MRP_PU_CD = (e, name) => {
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

    const onInputChangeEDT_KSV_PO_MRP_VENDOR_NAME = (e, name) => {
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

    const onInputChangeEDT_KSV_PO_MRP_REMARK = (e, name) => {
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

    const [isFactory, setIsFactory] = useState(false);

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

        if (tPuCd) {
            var tObj0 = { ...dataQRY_KSV_PO_MRP1 };
            tObj0.PU_CD = tPuCd;
            setDataQRY_KSV_PO_MRP1(tObj0);
        }

        search_LIST_1(tPuCd);
        search_LIST_2(tPuCd);
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
                style={{ width: "123rem", height: "11rem" }}
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
                    <p className="af-span-p" style={{ width: "6rem" }}>Term</p>
                    <div className="af-span-div" style={{ width: "17rem" }}>
                        <InputText
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

                <span
                    className="af-span-3-0"
                    style={{ width: "40.5rem" }}
                ></span>
                <span className="af-span-3" style={{ width: "13rem" }}>
                    <div className="af-span-div" style={{ width: "12rem" }}>
                        <Button
                            style={{ width: "12rem" }}
                            label="STS OUT Regist"
                            className="p-button-text"
                            onClick={process_INSERT_STSOUT_1}
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
                <span className="af-span-3" style={{ width: "32.5rem" }}>
                    <p
                        className={`af-span-p ${isSea ? "red" : ""}`}
                        style={{ width: "6rem" }}
                    > {CBMLabel}</p>
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
                <span className="af-span-3" style={{ width: "6rem" }}>
                    <div className="af-span-div" style={{ width: "12rem" }}>
                        <Button
                            style={{ width: "12rem" }}
                            label="Reset"
                            className="p-button-text"
                            onClick={blankFn}
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "24rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Supplier</p>
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
                    <p
                        className={`af-span-p ${isAir ? "red" : ""}`}
                        style={{ width: "6rem" }}
                    > {weightLabel}</p>
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
                            disabled
                            style={{ width: "9rem" }}
                            className="text-right"
                            id="id_TARGET_ETA"
                            value={serviceLib.formatNumber(
                                dataEDT_KSV_PO_MRP.WEIGHT,
                                2,
                            )}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_WEIGHT(e, "WEIGHT")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "13rem" }}>
                    <div className="af-span-div" style={{ width: "12rem" }}>
                        <Button
                            style={{ width: "12rem" }}
                            label="MATL Record"
                            className="p-button-text orange"
                            onClick={popup_MATL_MST}
                        />
                    </div>
                </span>

                <span className="af-span-3-0" style={{ width: "48rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Remark</p>
                    <div className="af-span-div" style={{ width: "41.5rem" }}>
                        <InputText
                            style={{ width: "41.5rem" }}
                            id="id_TARGET_ETA"
                            value={dataEDT_KSV_PO_MRP.REMARK}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_REMARK(e, "REMARK")
                            }
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "45rem" }}>
                    <p className="af-span-p" style={{ width: "6.5rem" }}>Ship Mode</p>
                    <div className="af-span-div" style={{ width: "17rem" }}>
                        <Dropdown
                            disabled={isFactory}
                            style={{ width: "17rem" }}
                            id="id_PO_CD"
                            filter
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
                            editable
                        ></Dropdown>
                    </div>
                    <p className="af-span-p" style={{ width: "7rem" }}>SUM(Out Qty)</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            disabled
                            style={{ width: "9rem" }}
                            className="text-right"
                            value={serviceLib.formatNumber(sumOutQty)}
                        />
                    </div>
                </span>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "45rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_PO_MRP2}
                    editMode="cell"
                    size="small"
                    value={datasTBL_KSV_PO_MRP2}
                    tableStyle={{ tableLayout: "fixed" }}
                    // rowGroupMode="subheader"
                    // groupRowsBy="STSIN_CD"
                    // sortMode="single"
                    // sortField="STSIN_CD"
                    // sortOrder={1}
                    // rowGroupHeaderTemplate={headerTemplate}
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
                    emptyMessage=" "
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="48rem"
                >
                    <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "3rem" }} ></AFColumn>
                    <AFColumn field="PU_CD" headerClassName="t-header" header="Pu#" style={{ width: "12rem", flexBasis: "auto" }} ></AFColumn>

                    <AFColumn field="IN_DATE" headerClassName="t-header" header="In Date" style={{ width: "12rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="BUYER_CD" headerClassName="t-header" header="Buyer#" style={{ width: "3rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PO_CD" headerClassName="t-header" header="PO" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Supplier" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_CD" headerClassName="t-header" header="Material" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_NAME" headerClassName="t-header" header="Description" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="COLOR" headerClassName="t-header" header="Color" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="SPEC" headerClassName="t-header" header="Spec" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="UNIT" headerClassName="t-header" header="Unit" style={{ width: "5rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="SHIP_QTY" headerClassName="t-header" className="text-right" header="STSIN Qty" style={{ width: "6rem", flexBasis: "auto" }} body={(row) => serviceLib.formatNumber(row.SHIP_QTY, 2)} ></AFColumn>
                    <AFColumn field="BAL_QTY" headerClassName="t-header" className="text-right" header="Bal Qty" style={{ width: "6rem", flexBasis: "auto" }} body={(row) => serviceLib.formatNumber(row.BAL_QTY, 2)} ></AFColumn>
                    <AFColumn field="OUT_QTY" headerClassName="t-header" className="text-right" header="Out Qty" style={{ color: "green", width: "6rem", flexBasis: "auto", }} editor={(options) => cellEditorKSV_PO_MRP2(options)} onCellEditComplete={onCellEditCompleteKSV_PO_MRP2} body={(row) => serviceLib.formatNumber(row.OUT_QTY, 2)} ></AFColumn>
                    <AFColumn field="WEIGHT" headerClassName="t-header" className="text-right" header="Weight(Kg)" style={{ color: "green", width: "6rem", flexBasis: "auto", }} editor={(options) => cellEditorKSV_PO_MRP2(options)} onCellEditComplete={onCellEditCompleteKSV_PO_MRP2} body={(row) => serviceLib.formatNumber(row.WEIGHT, 4)} ></AFColumn>
                    <AFColumn field="HS_CD" headerClassName="t-header" header="HS Code" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="COMP" headerClassName="t-header" header="Composition" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="V_COMP" headerClassName="t-header" header="V Composition" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="OFFER_SPEC" headerClassName="t-header" header="Offer Spec" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
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

            <Dialog class="loadingModal" visible={isProgress} modal>
                <ProgressSpinner />
            </Dialog>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0431_STSOUT_RECORD, comparisonFn);
