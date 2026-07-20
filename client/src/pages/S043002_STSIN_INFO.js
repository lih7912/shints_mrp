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
import { ServiceS043002_STSIN_INFO } from "../service/service_biz/ServiceS043002_STSIN_INFO";

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
    PU_CD: "",
    VENDOR_NAME: "",
    EX_FACTORY: "",
    STS_IN_AMT: "",
    MOQ_AMT: "",
    MOQ_AMT_CURR: "",

    REG_USER: "",
    PAY_CONDITION: "",
    PAY_TYPE: "",
    PAY_DATE: "",
    BAL_AMT: "",
    SURCHARGE_AMT: "",
    SURCHARGE_AMT_CURR: "",

    BUYER_NAME: "",
    OVER_SHORT: "",
    PAY_TERM: "",

    BILL_TO: "",
    LEADER_CONFIRM: "",
    MOQ_CONFIRM: "",
    SURCHARGE_CONFIRM: "",
};

const S043002_STSIN_INFO = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS043002_STSIN_INFORef = useRef(null);
    if (!serviceS043002_STSIN_INFORef.current) serviceS043002_STSIN_INFORef.current = new ServiceS043002_STSIN_INFO();
    const serviceS043002_STSIN_INFO = serviceS043002_STSIN_INFORef.current;

    const toast = useRef(null);

    /* progress */
    const [isProgress, setIsProgress] = useState(false);
    const [msgPopup, setMsgPopup] = useState(false);

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
    const search_CODE = (argData) => {
        serviceS043002_STSIN_INFO.mgrQuery_CODE().then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasEDT_KSV_PO_MRP_PAY_TYPE(data.PAY_TYPE);
                setDataEDT_KSV_PO_MRP_PAY_TYPE(data.PAY_TYPE[0]);
            } else {
                console.log(
                    "mgrQuery_PO_CD error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_LIST_1 = (
        argSTS_IN_CD,
        argLeaderConfirm,
        argMoqConfirm,
        argSurchargeConfirm,
    ) => {
        var tObj0 = { ...dataQRY_KSV_PO_MRP1 };

        var tObj = {};
        tObj.STSIN_CD = argSTS_IN_CD;

        setLoadingTBL_KSV_PO_MRP(true);

        // 3_1
        serviceS043002_STSIN_INFO.mgrQuery_LIST_1(tObj).then((data) => {
            setLoadingTBL_KSV_PO_MRP(false);
            if (typeof data.graphQLErrors === "undefined") {
                var tSaveObj = { ...data[0] };
                tSaveObj.STSIN_CD = argSTS_IN_CD;
                var tSaveArray = [];
                tSaveArray.push(tSaveObj);
                setSaveData1(tSaveArray);

                var tArray = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    return tObj;
                });
                if (tArray.length > 0) {
                    setDataTBL_KSV_PO_MRP(tArray[0]);

                    var tEdtObj = { ...tArray[0] };
                    tEdtObj.LEADER_CONFIRM = argLeaderConfirm;
                    tEdtObj.MOQ_CONFIRM = argMoqConfirm;
                    tEdtObj.SURCHARGE_CONFIRM = argSurchargeConfirm;
                    datasetEDT_KSV_PO_MRP(tEdtObj);
                    search_CODE(tArray[0]);
                }
            } else {
                console.log(
                    "mgrQuery_PO_CD error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_LIST_2 = (argSTSIN_CD) => {
        var tObj = {};
        tObj.STSIN_CD = argSTSIN_CD;

        setLoadingTBL_KSV_PO_MRP2(true);

        // 4_2
        serviceS043002_STSIN_INFO.mgrQuery_LIST_2(tObj).then((data) => {
            setLoadingTBL_KSV_PO_MRP2(false);
            if (typeof data.graphQLErrors === "undefined") {
                setSaveData2(data);
                var tArray = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;

                    var tMrpQty = parseFloat(tObj.MRP_QTY);
                    var tStockQty = parseFloat(tObj.STOCK_QTY);
                    var tMrpQty1 = tMrpQty - tStockQty;

                    var tOverShortQty = parseFloat(tObj.LEFTOVER_QTY);
                    var tRate = serviceLib.getFloat(
                        (tOverShortQty / tMrpQty1) * 100.0,
                        2,
                    );

                    tObj.OVERSHORT_RATE = String(tRate);

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

    //

    const [saveData1, setSaveData1] = useState([]);
    const [saveData2, setSaveData2] = useState([]);

    //

    const onFooterYes = () => {
        setMsgPopup(false);
        process_INSERT_STS_FULLIN_SUB();
    };

    const process_INSERT_STS_FULLIN_SUB = () => {
        var tInEdit = { ...dataEDT_KSV_PO_MRP };
        var tInPuMst0 = { ...dataTBL_KSV_PO_MRP };
        var tInStockMem = [];

        if (tInEdit.PAY_TYPE === "") {
            toast.current.show({
                severity: "success",
                summary: "Input Error",
                detail: "PAY_TYPE require!!",
                life: 3000,
            });
            return;
        }

        var tInPuMst = [];
        if (typeof tInPuMst0.__typename !== "undefined")
            delete tInPuMst0.__typename;
        if (typeof tInPuMst0.id !== "undefined") delete tInPuMst0.id;
        tInPuMst.push(tInPuMst0);

        var tCheckFlag = 0;
        selectedTBL_KSV_PO_MRP2.forEach((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (typeof tObj.id !== "undefined") delete tObj.id;
            if (parseFloat(tObj.OVERSHOT_RATE) > parseFloat(tInEdit))
                tCheckFlag = 1;
            tInStockMem.push(tObj);
        });

        //setIsProgress(true);
        serviceS043002_STSIN_INFO
            .mgrInsert_STS_FULLIN(tInEdit, tInPuMst, tInStockMem)
            .then((data) => {
                setIsProgress(false);
                if (typeof data.graphQLErrors === "undefined") {
                    // console.log("mgrInsert_STOCK_IN call => " + data.length);
                    setSelectedTBL_KSV_PO_MRP2([]);
                    setDatasTBL_KSV_PO_MRP2([]);
                    toast.current.show({
                        severity: "success",
                        summary: "Stock In",
                        detail: data[0].CODE,
                        life: 3000,
                    });

                    if (data[0].CODE.includes("SUCC")) {
                        var tObj0 = { ...dataTBL_KSV_PO_MRP };
                        var tInput0 = {};
                        tInput0.PU_CD = tObj0.PU_CD;
                        search_LIST_2(tInput0);
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

    const onCellEditCompleteKSV_PO_MRP2 = (e) => {
        let { rowData, newValue, field, originalEvent: event } = e;

        if (rowData.PO_QTY <= 0) return;

        if (field !== "SURCHARGE_REMARK")
            rowData[field] = String(
                serviceLib.getFloat(parseFloat(newValue), 2),
            );
        else rowData[field] = newValue;

        var tMrpQty = parseFloat(rowData.MRP_QTY);
        var tStockQty = parseFloat(rowData.STOCK_QTY);
        var tMrpQty1 = tMrpQty - tStockQty;
        var tMoqQty = parseFloat(rowData.MOQ_QTY);
        var tLeftOverQty = parseFloat(rowData.LEFTOVER_QTY);
        var tStsInQty = parseFloat(rowData.STSIN_QTY);
        var tFocQty = parseFloat(rowData.FOC_QTY);
        var tPoQty = 0;
        var tPoQty0 = 0;
        var tShipQty = 0;

        if (field === "PO_QTY") {
            tShipQty = parseFloat(rowData.SHIP_QTY);
            tPoQty = parseFloat(newValue);
            tPoQty0 = parseFloat(newValue) + tStsInQty;

            if (tPoQty0 === tMrpQty1) {
                tMoqQty = 0;
                tLeftOverQty = 0;
            } else if (tPoQty0 > tMrpQty1) {
                var tDiffQty = tPoQty0 - tMrpQty1;
                if (tDiffQty <= tMoqQty) {
                    tMoqQty = tDiffQty;
                    tLeftOverQty = 0;
                }
                if (tDiffQty > tMoqQty) {
                    tLeftOverQty = tDiffQty - tMoqQty;
                }
            } else if (tPoQty0 < tMrpQty1) {
                var tDiffQty = tMrpQty1 - tPoQty0;
                if (tDiffQty > tMoqQty) {
                    tLeftOverQty = tMoqQty - tDiffQty;
                    tMoqQty = 0;
                } else if (tDiffQty <= tMoqQty) {
                    tMoqQty = tMoqQty - tDiffQty;
                    tLeftOverQty = 0;
                }
            }
            tShipQty = tPoQty + tFocQty;

            // console.log(`PO_QTY update: ${tPoQty}, ${tMoqQty}, ${tCalMrpQty} `);

            if (tPoQty0 > tMrpQty) {
                var tOverRate = serviceLib.getFloat(
                    ((tPoQty0 - tMrpQty) / tMrpQty) * 100.0,
                    2,
                );
                rowData.OVERSHORT_RATE = String(tOverRate);
            } else {
                var tOverRate = serviceLib.getFloat(
                    ((tMrpQty - tPoQty0) / tMrpQty) * 100.0,
                    2,
                );
                rowData.OVERSHORT_RATE = String(tOverRate);
            }

            rowData.MOQ_QTY = String(tMoqQty);
            rowData.LEFTOVER_QTY = String(tLeftOverQty);
            rowData.FOC_QTY = String(tFocQty);
            rowData.SHIP_QTY = String(tShipQty);
            rowData.PO_QTY = String(tPoQty);
            setDataTBL_KSV_PO_MRP2(rowData);
        }
        if (field === "SHIP_QTY") {
            tPoQty = parseFloat(rowData.PO_QTY);
            tShipQty = parseFloat(newValue);
            if (tShipQty > tPoQty) {
                tFocQty = tShipQty - tPoQty;
            } else {
                tFocQty = 0;
            }

            rowData.MOQ_QTY = String(tMoqQty);
            rowData.LEFTOVER_QTY = String(tLeftOverQty);
            rowData.FOC_QTY = String(tFocQty);
            rowData.PO_QTY = String(tPoQty);
            setDataTBL_KSV_PO_MRP2(rowData);
        }

        var tMasterPrice = parseFloat(rowData.MASTER_PRICE);
        var tSurPrice = parseFloat(rowData.SURCHARGE_PRICE);
        var tPoPrice = parseFloat(rowData.PO_PRICE);
        var tDiffPrice = parseFloat(rowData.DIFF_PRICE);
        var tSurAmt = parseFloat(rowData.SURCHARGE_AMT);

        if (field === "SURCHARGE_AMT") {
            tSurPrice = tSurAmt / rowData.PO_QTY;
            tSurPrice = serviceLib.getFloat(tSurPrice, 4);
            tDiffPrice = tSurPrice;
            tPoPrice = tMasterPrice + tDiffPrice;

            rowData.SURCHARGE_PRICE = String(tSurPrice);
            rowData.DIFF_PRICE = String(tDiffPrice);
            rowData.PO_PRICE = String(tPoPrice);
            setDataTBL_KSV_PO_MRP2(rowData);
        }
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

    const datasetEDT_KSV_PO_MRP = (argData) => {
        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };
        _dataEDT_KSV_PO_MRP.PU_CD = argData.PU_CD;
        _dataEDT_KSV_PO_MRP.VENDOR_NAME = argData.VENDOR_NAME;
        _dataEDT_KSV_PO_MRP.EX_FACTORY = argData.EX_FACTORY;
        _dataEDT_KSV_PO_MRP.STS_IN_AMT = argData.STS_IN_AMT;
        _dataEDT_KSV_PO_MRP.MOQ_AMT = argData.MOQ_AMT;
        _dataEDT_KSV_PO_MRP.MOQ_AMT_CURR = "USD";
        _dataEDT_KSV_PO_MRP.REG_USER = argData.REG_USER;
        _dataEDT_KSV_PO_MRP.PAY_CONDITION = argData.PAY_CONDITION;
        // _dataEDT_KSV_PO_MRP.PAY_TYPE=argData.PAY_CONDITION;
        _dataEDT_KSV_PO_MRP.PAY_DATE = argData.PAY_DATE;
        _dataEDT_KSV_PO_MRP.BAL_AMT = argData.BAL_AMT;
        _dataEDT_KSV_PO_MRP.SURCHARGE_AMT = argData.SURCHARGE_AMT;
        _dataEDT_KSV_PO_MRP.SURCHARGE_AMT_CURR = "USD";
        _dataEDT_KSV_PO_MRP.BUYER_NAME = argData.BUYER_NAME;
        _dataEDT_KSV_PO_MRP.OVER_SHORT = argData.OVERSHORT_RATE;
        _dataEDT_KSV_PO_MRP.PAY_TERM = argData.PAY_TERM;
        _dataEDT_KSV_PO_MRP.BILL_TO = argData.BILL_TO;
        _dataEDT_KSV_PO_MRP.LEADER_CONFIRM = argData.LEADER_CONFIRM;
        _dataEDT_KSV_PO_MRP.MOQ_CONFIRM = argData.MOQ_CONFIRM;
        _dataEDT_KSV_PO_MRP.SURCHARGE_CONFIRM = argData.SURCHARGE_CONFIRM;
        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);

        editEDT_KSV_PO_MRP_PAY_TYPE(argData.PAY_CONDITION);
    };

    const [datasEDT_KSV_PO_MRP_PAY_TYPE, setDatasEDT_KSV_PO_MRP_PAY_TYPE] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_PAY_TYPE, setDataEDT_KSV_PO_MRP_PAY_TYPE] =
        useState({});

    const editEDT_KSV_PO_MRP_PAY_TYPE = (argValue) => {
        let _dataEDT_KSV_PO_MRP_PAY_TYPE = datasEDT_KSV_PO_MRP_PAY_TYPE.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataEDT_KSV_PO_MRP_PAY_TYPE(_dataEDT_KSV_PO_MRP_PAY_TYPE[0]);
    };

    const onDropdownChangeEDT_KSV_PO_MRP_PAY_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
        setDataEDT_KSV_PO_MRP_PAY_TYPE(e.value);
    };

    const onInputChangeEDT_KSV_PO_MRP_LEADER_CONFIRM = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onInputChangeEDT_KSV_PO_MRP_MOQ_CONFIRM = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onInputChangeEDT_KSV_PO_MRP_SURCHARGE_CONFIRM = (e, name) => {
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

    const onInputChangeEDT_KSV_PO_MRP_VENDOR_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onCalChangeEDT_KSV_PO_MRP_EX_FACTORY = (e, name) => {
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

    const onInputChangeEDT_KSV_PO_MRP_STS_IN_AMT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onInputChangeEDT_KSV_PO_MRP_MOQ_AMT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onInputChangeEDT_KSV_PO_MRP_MOQ_AMT_CURR = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onInputChangeEDT_KSV_PO_MRP_REG_USER = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onCalChangeEDT_KSV_PO_MRP_PAY_DATE = (e, name) => {
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

    const onInputChangeEDT_KSV_PO_MRP_BAL_AMT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onInputChangeEDT_KSV_PO_MRP_SURCHARGE_AMT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onInputChangeEDT_KSV_PO_MRP_SURCHARGE_AMT_CURR = (e, name) => {
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

    const onInputChangeEDT_KSV_PO_MRP_OVER_SHORT = (e, name) => {
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

    const onInputChangeEDT_KSV_PO_MRP_BILL_TO = (e, name) => {
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
        let tStsinCd = "";
        let tLeaderConfirm = "";
        let tMoqConfirm = "";
        let tSurchargeConfirm = "";

        var tUrls = window.location.href.split("?");
        if (tUrls.length <= 1) {
        } else {
            var tParams1 = tUrls[1].split("&");
            var tParams2 = tParams1.map((col, i) => {
                var tObj = {};
                var tCols = col.split("=");
                if (tCols[0].includes("STSIN_CD")) {
                    tObj.key = tCols[0];
                    tObj.value = tCols[1];
                    tStsinCd = tObj.value;
                }
                if (tCols[0].includes("LEADER_CONFIRM")) {
                    tObj.key = tCols[0];
                    tObj.value = tCols[1];
                    tLeaderConfirm = tObj.value;
                }
                if (tCols[0].includes("MOQ_CONFIRM")) {
                    tObj.key = tCols[0];
                    tObj.value = tCols[1];
                    tMoqConfirm = tObj.value;
                }
                if (tCols[0].includes("SURCHARGE_CONFIRM")) {
                    tObj.key = tCols[0];
                    tObj.value = tCols[1];
                    tSurchargeConfirm = tObj.value;
                }
            });
        }

        search_LIST_1(tStsinCd, tLeaderConfirm, tMoqConfirm, tSurchargeConfirm);
        search_LIST_2(tStsinCd);
    }, []);

    const blankFn = () => {};

    const footerContent = (
        <div>
            <Button
                label="Yes"
                icon="pi pi-check"
                onClick={onFooterYes}
                autoFocus
            />
            <Button
                label="Cancel"
                icon="pi pi-check"
                onClick={() => setMsgPopup(false)}
                autoFocus
            />
        </div>
    );

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
                style={{ width: "123rem", height: "9rem" }}
            >
                <span className="af-span-3-0" style={{ width: "13rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>PU#</p>
                    <div className="af-span-div" style={{ width: "6rem" }}>
                        <InputText
                            disabled
                            style={{ width: "6rem" }}
                            id="id_TARGET_ETA"
                            value={dataEDT_KSV_PO_MRP.PU_CD}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_PU_CD(e, "PU_CD")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "22rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Supplier</p>
                    <div className="af-span-div" style={{ width: "15rem" }}>
                        <InputText
                            disabled
                            style={{ width: "15rem" }}
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
                <span className="af-span-3-0" style={{ width: "13rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Ex-Factory</p>
                    <div className="af-span-div" style={{ width: "6rem" }}>
                        <Calendar
                            showButtonBar
                            disabled
                            style={{ width: "6rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_S_PO_DATE"
                            value={changeDateVal(dataEDT_KSV_PO_MRP.EX_FACTORY)}
                            onChange={(e) =>
                                onCalChangeEDT_KSV_PO_MRP_EX_FACTORY(
                                    e,
                                    "EX_FACTORY",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "15rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>STS IN Amt</p>
                    <div className="af-span-div" style={{ width: "7rem" }}>
                        <InputText
                            disabled
                            style={{ width: "7rem" }}
                            id="id_TARGET_ETA"
                            value={dataEDT_KSV_PO_MRP.STS_IN_AMT}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_STS_IN_AMT(
                                    e,
                                    "STS_IN_AMT",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>MOQ Amt</p>
                    <div className="af-span-div" style={{ width: "6rem" }}>
                        <InputText
                            disabled
                            style={{ width: "6rem" }}
                            id="id_TARGET_ETA"
                            value={dataEDT_KSV_PO_MRP.MOQ_AMT}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_MOQ_AMT(
                                    e,
                                    "MOQ_AMT",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "4rem" }}>
                    <div className="af-span-div" style={{ width: "3rem" }}>
                        <InputText
                            disabled
                            style={{ width: "3rem" }}
                            id="id_TARGET_ETA"
                            value={dataEDT_KSV_PO_MRP.MOQ_AMT_CURR}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_MOQ_AMT_CURR(
                                    e,
                                    "MOQ_AMT_CURR",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "34rem" }}>
                    <p className="af-span-p" style={{ width: "8rem" }}>Leader Confirm</p>
                    <div className="af-span-div" style={{ width: "8rem" }}>
                        <InputText
                            disabled
                            style={{ width: "8rem" }}
                            id="id_TARGET_ETA"
                            value={dataEDT_KSV_PO_MRP.LEADER_CONFIRM}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_LEADER_CONFIRM(
                                    e,
                                    "LEADER_CONFIRM",
                                )
                            }
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "13rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Purchaser</p>
                    <div className="af-span-div" style={{ width: "6rem" }}>
                        <InputText
                            disabled
                            style={{ width: "6rem" }}
                            id="id_TARGET_ETA"
                            value={dataEDT_KSV_PO_MRP.REG_USER}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_REG_USER(
                                    e,
                                    "REG_USER",
                                )
                            }
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "22rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Pay Term</p>
                    <div className="af-span-div" style={{ width: "15rem" }}>
                        <Dropdown
                            style={{ width: "15rem" }}
                            id="id_PO_CD"
                            filter
                            value={dataEDT_KSV_PO_MRP_PAY_TYPE}
                            onChange={(e) =>
                                onDropdownChangeEDT_KSV_PO_MRP_PAY_TYPE(
                                    e,
                                    "PAY_TYPE",
                                )
                            }
                            options={datasEDT_KSV_PO_MRP_PAY_TYPE}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "13rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Pay Date</p>
                    <div className="af-span-div" style={{ width: "6rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "6rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_S_PO_DATE"
                            value={changeDateVal(dataEDT_KSV_PO_MRP.PAY_DATE)}
                            onChange={(e) =>
                                onCalChangeEDT_KSV_PO_MRP_PAY_DATE(
                                    e,
                                    "PAY_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "15rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Bal Amt</p>
                    <div className="af-span-div" style={{ width: "7rem" }}>
                        <InputText
                            disabled
                            style={{ width: "7rem" }}
                            id="id_TARGET_ETA"
                            value={dataEDT_KSV_PO_MRP.BAL_AMT}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_BAL_AMT(
                                    e,
                                    "BAL_AMT",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>Surcharge Amt</p>
                    <div className="af-span-div" style={{ width: "6rem" }}>
                        <InputText
                            disabled
                            style={{ width: "6rem" }}
                            id="id_TARGET_ETA"
                            value={dataEDT_KSV_PO_MRP.SURCHARGE_AMT}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_SURCHARGE_AMT(
                                    e,
                                    "SURCHARGE_AMT",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "4rem" }}>
                    <div className="af-span-div" style={{ width: "3rem" }}>
                        <InputText
                            disabled
                            style={{ width: "3rem" }}
                            id="id_TARGET_ETA"
                            value={dataEDT_KSV_PO_MRP.SURCHARGE_AMT_CURR}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_SURCHARGE_AMT_CURR(
                                    e,
                                    "SURCHARGE_AMT_CURR",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "8rem" }}>Moq Confirm</p>
                    <div className="af-span-div" style={{ width: "8rem" }}>
                        <InputText
                            disabled
                            style={{ width: "8rem" }}
                            id="id_TARGET_ETA"
                            value={dataEDT_KSV_PO_MRP.MOQ_CONFIRM}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_MOQ_CONFIRM(
                                    e,
                                    "MOQ_CONFIRM",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "11rem" }}>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <Button
                            label="Reset"
                            style={{ width: "10rem" }}
                            className="p-button-text"
                            onClick={search_LIST_1}
                        />
                    </div>
                </span>

                <span className="af-span-3-0" style={{ width: "13rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Buyer</p>
                    <div className="af-span-div" style={{ width: "6rem" }}>
                        <InputText
                            disabled
                            style={{ width: "6rem" }}
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
                <span className="af-span-3-0" style={{ width: "22rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Over/Short</p>
                    <div className="af-span-div" style={{ width: "15rem" }}>
                        <InputText
                            disabled
                            style={{ width: "15rem" }}
                            id="id_TARGET_ETA"
                            value={dataEDT_KSV_PO_MRP.OVER_SHORT}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_OVER_SHORT(
                                    e,
                                    "OVER_SHORT",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "13rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Period</p>
                    <div className="af-span-div" style={{ width: "6rem" }}>
                        <InputText
                            disabled
                            style={{ width: "6rem" }}
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
                <span className="af-span-3-0" style={{ width: "15rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Bill To</p>
                    <div className="af-span-div" style={{ width: "7rem" }}>
                        <InputText
                            disabled
                            style={{ width: "7rem" }}
                            id="id_TARGET_ETA"
                            value={dataEDT_KSV_PO_MRP.BILL_TO}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_BILL_TO(
                                    e,
                                    "BILL_TO",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "22rem" }}>
                    <div className="af-span-div" style={{ width: "21rem" }}>
                        <Button
                            label="Material Record"
                            style={{ width: "21rem" }}
                            className="p-button-text orange"
                            onClick={blankFn}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "8rem" }}>Sur Confirm</p>
                    <div className="af-span-div" style={{ width: "8rem" }}>
                        <InputText
                            disabled
                            style={{ width: "8rem" }}
                            id="id_TARGET_ETA"
                            value={dataEDT_KSV_PO_MRP.SURCHARGE_CONFIRM}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_SURCHARGE_CONFIRM(
                                    e,
                                    "SURCHARGE_CONFIRM",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "10rem" }}>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Button
                            label="#Save"
                            style={{ width: "9rem" }}
                            className="p-button-text"
                            onClick={blankFn}
                        />
                    </div>
                </span>
            </div>
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "48rem" }}
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
                    scrollHeight="48rem"
                >
                    <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "3rem" }} ></AFColumn>

                    <AFColumn field="PO_CD" headerClassName="t-header" header="PO#" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PO_SEQ" headerClassName="t-header" header="Po Seq" style={{ width: "2rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_CD" headerClassName="t-header" header="Matl#" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_NAME" headerClassName="t-header" header="Desc" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="COLOR" headerClassName="t-header" header="Color" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="SPEC" headerClassName="t-header" header="Spec" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="UNIT" headerClassName="t-header" header="Unit" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MRP_QTY" headerClassName="t-header" header="Mrp Qty" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.MRP_QTY, 2) } ></AFColumn>
                    <AFColumn field="STOCK_QTY" headerClassName="t-header" header="Stock Qty" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.STOCK_QTY, 2) } ></AFColumn>
                    <AFColumn field="MOQ_QTY" headerClassName="t-header" header="MOQ Qty" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.MOQ_QTY, 2) } ></AFColumn>
                    <AFColumn field="LEFTOVER_QTY" headerClassName="t-header" header="Over/Short" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.LEFTOVER_QTY, 2) } ></AFColumn>
                    <AFColumn field="OVERSHORT_RATE" headerClassName="t-header" header="%" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="STSIN_QTY" headerClassName="t-header" header="In Qty" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.STSIN_QTY, 2) } ></AFColumn>
                    <AFColumn field="PO_QTY" headerClassName="t-header" header="Po Qty" style={{ width: "6rem", flexBasis: "auto", color: "green", }} editor={(options) => cellEditorKSV_PO_MRP2(options)} onCellEditComplete={onCellEditCompleteKSV_PO_MRP2} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.PO_QTY, 2) } ></AFColumn>
                    <AFColumn field="FOC_QTY" headerClassName="t-header" header="FOC" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.FOC_QTY, 2) } ></AFColumn>
                    <AFColumn field="SHIP_QTY" headerClassName="t-header" header="Ship Qty" style={{ width: "6rem", flexBasis: "auto", color: "green", }} editor={(options) => cellEditorKSV_PO_MRP2(options)} onCellEditComplete={onCellEditCompleteKSV_PO_MRP2} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.SHIP_QTY, 2) } ></AFColumn>
                    <AFColumn field="CURR_CD" headerClassName="t-header" header="Curr" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MASTER_PRICE" headerClassName="t-header" header="M.Price" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.MASTER_PRICE, 4) } ></AFColumn>
                    <AFColumn field="DIFF_PRICE" headerClassName="t-header" header="+/-" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.DIFF_PRICE, 4) } ></AFColumn>
                    <AFColumn field="PO_PRICE" headerClassName="t-header" header="Po price" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.PO_PRICE, 4) } ></AFColumn>
                    <AFColumn field="SURCHARGE_AMT" headerClassName="t-header" header="Surcharge" style={{ width: "6rem", flexBasis: "auto", color: "green", }} editor={(options) => cellEditorKSV_PO_MRP2(options)} onCellEditComplete={onCellEditCompleteKSV_PO_MRP2} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.SURCHARGE_AMT, 2) } ></AFColumn>
                    <AFColumn field="SURCHARGE_REMARK" headerClassName="t-header" header="Reason" style={{ width: "6rem", flexBasis: "auto", color: "green", }} editor={(options) => cellEditorKSV_PO_MRP2(options)} onCellEditComplete={onCellEditCompleteKSV_PO_MRP2} ></AFColumn>
                    <AFColumn field="BILL_CD" headerClassName="t-header" header="Bill#" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
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

            <Dialog
                header="Header"
                visible={msgPopup}
                style={{ width: "50vw" }}
                onHide={() => setMsgPopup(false)}
                footer={footerContent}
            >
                <p className="m-0">
                    Over Short Rate가 4% 이상인 데이타가 있습니다.
                    계속진행하시겠습까?
                </p>
            </Dialog>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S043002_STSIN_INFO, comparisonFn);
