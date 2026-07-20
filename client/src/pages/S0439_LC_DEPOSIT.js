/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import axios from "axios";
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
import { ServiceS0439_LC_DEPOSIT } from "../service/service_biz/ServiceS0439_LC_DEPOSIT";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_PO_MRP = {
    S_PAY_DATE: "",
    E_PAY_DATE: "",
    S_IN_DATE: "",
    E_IN_DATE: "",
    TYPE: "",
    PURCHASER: "",
    PU_CD: "",
    VENDOR_CD: "",
    GW_STATUS: "",
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
};

const S0439_LC_DEPOSIT = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0439_LC_DEPOSITRef = useRef(null);
    if (!serviceS0439_LC_DEPOSITRef.current) serviceS0439_LC_DEPOSITRef.current = new ServiceS0439_LC_DEPOSIT();
    const serviceS0439_LC_DEPOSIT = serviceS0439_LC_DEPOSITRef.current;

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
    const popup_INFO = (e) => {
        var tObj = { ...e.data };

        var tUrl = `${window.location.origin}/#/`;
        tUrl += `S040102_PURCHASER_INFO?PU_CD=${tObj.PU_CD}&PU_STATUS=`;

        var tUrl2 = `S040102_PURCHASER_INFO?PU_CD=${tObj.PU_CD}&PU_STATUS=`;
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
    };

    // Search KSV_STOCK_MEM

    const search_LIST_2 = () => {
        var tObj0 = { ...dataQRY_KSV_PO_MRP };

        setLoadingTBL_KSV_PO_MRP(true);

        // 3_1
        serviceS0439_LC_DEPOSIT.mgrQuery_LIST_2(tObj0).then((data) => {
            setLoadingTBL_KSV_PO_MRP(false);
            if (typeof data.graphQLErrors === "undefined") {
                var tArray = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    if (tObj.TYPE === "LC") {
                        tObj.DEPOSIT_AMT = tObj.LC_AMT;
                        var tRate =
                            (parseFloat(tObj.DEPOSIT_AMT) /
                                parseFloat(tObj.PAY_AMOUNT)) *
                            100.0;
                        tRate = tRate.toFixed(2);
                        tObj.LC_RATE = String(tRate);
                    } else if (tObj.TYPE === "DEPOSIT") {
                        tObj.TYPE = "DEPOSIT";
                        tObj.LC_RATE = String(parseFloat(tObj.DEPOSIT_RATE));
                    }

                    if (tObj.DEPOSIT_GW_STATUS === "0")
                        tObj.DEPOSIT_GW_STATUS_N = "New";
                    else if (tObj.DEPOSIT_GW_STATUS === "1")
                        tObj.DEPOSIT_GW_STATUS_N = "REQUEST";
                    else if (tObj.DEPOSIT_GW_STATUS === "2")
                        tObj.DEPOSIT_GW_STATUS_N = "CONFIRM";
                    else if (tObj.DEPOSIT_GW_STATUS === "3")
                        tObj.DEPOSIT_GW_STATUS_N = "REJECT";
                    else if (tObj.DEPOSIT_GW_STATUS === "4")
                        tObj.DEPOSIT_GW_STATUS_N = "CANCEL";
                    else if (tObj.DEPOSIT_GW_STATUS === "5")
                        tObj.DEPOSIT_GW_STATUS_N = "DELETE";
                    else if (tObj.DEPOSIT_GW_STATUS === "6")
                        tObj.DEPOSIT_GW_STATUS_N = "WAIT";
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

    const search_LIST_1 = () => {
        var tObj0 = { ...dataQRY_KSV_PO_MRP1 };

        var tObj = {};
        tObj.BUYER_CD = tObj0.BUYER_CD;
        tObj.PO_CD = tObj0.PO_CD;
        tObj.VENDOR_CD = tObj0.VENDOR_CD;

        setSelectedTBL_KSV_PO_MRP1([]);
        setLoadingTBL_KSV_PO_MRP1(true);

        serviceS0439_LC_DEPOSIT.mgrQuery_LIST_1(tObj).then((data) => {
            setLoadingTBL_KSV_PO_MRP1(false);
            if (typeof data.graphQLErrors === "undefined") {
                var tArray = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    if (tObj.PU_CD2 !== "") tObj.PU_STATUS = "Update";
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

    const process_INSERT_PU_MST_1 = () => {
        var tInputArray = [];
        var tInput = { ...dataEDT_KSV_PO_MRP };
        console.log("Curr Cd => " + tInput.CURR_CD);
        if (tInput.CURR_CD === null) tInput.CURR_CD = "USD";
        if (typeof tInput.CURR_CD === "undefined") tInput.CURR_CD = "USD";

        tInputArray.push(tInput);

        var tObjs = datasTBL_KSV_PO_MRP2.map((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (typeof tObj.id !== "undefined") delete tObj.id;
            return tObj;
        });

        serviceS0439_LC_DEPOSIT
            .mgrInsert_PU_MST_1(tInputArray, tObjs)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log("mgrInsert_STOCK_IN call => " + data.length);
                    if (data[0].CODE.includes("SUCC")) {
                        toast.current.show({
                            severity: "success",
                            summary: "Success:Stock_in",
                            detail: data[0].CODE,
                            life: 3000,
                        });

                        setSelectedTBL_KSV_PO_MRP1([]);
                        search_LIST_2();
                        search_LIST_1();

                        setCreateDialog(false);
                    } else {
                        toast.current.show({
                            severity: "success",
                            summary: "Error:Stock_in",
                            detail: data[0].CODE,
                            life: 3000,
                        });
                    }

                    // queryNew(tVendorCd);
                } else {
                    console.log(
                        "mgrQuery_PO_CD error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                    toast.current.show({
                        severity: "success",
                        summary: "Fail:Stock_in",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };

    const GW_WINDOW_NAME = "GW_LC_POPUP";
    const gwWinRef = useRef(null);
    const process_GW_LC = (argPuCd) => {
        // 이미 열려 있으면 새로 안 띄움
        if (gwWinRef.current?.closed === false) {
            alert("이미 열려 있는 창이 있습니다.<br><br>There is already a window open.");
            gwWinRef.current.focus();
            return;
        }

        if (selectedTBL_KSV_PO_MRP.length <= 0) {
            alert("상신할 데이터를 선택하세요");
            return;
        }

        var chk = 0;
        var saveObj = {};
        selectedTBL_KSV_PO_MRP.forEach((col, i) => {
            if (i === 0) saveObj = { ...col };
            else {
                if (col.TYPE !== saveObj.TYPE ||
                    col.CURR_CD !== saveObj.CURR_CD ||
                    col.SHIP_MODE !== saveObj.SHIP_MODE ||
                    // col.SHIP_DATE !== saveObj.SHIP_DATE ||
                    col.EXPIRY_DATE  !== saveObj.EXPIRY_DATE ||
                    col.LATEST_SHIP_DATE  !== saveObj.LATEST_SHIP_DATE ||
                    col.REQUEST_PAY_DATE  !== saveObj.REQUEST_PAY_DATE ||
                    col.PAY_DATE  !== saveObj.PAY_DATE) {
                    chk = 1;
                 }
            }

        });
        if (chk > 0) {
            alert("상신할 데이터의 Type, Curr, Ship Mode, Ship Date, Expiry Date, latest Ship Date, request pay date, pay date는 같아야 합니다");
            return;
        }

        var tRetDate = serviceLib.getCurrDate().substring(0, 8);
        var tPostObj = {};
        tPostObj.pu_cd = '';
        var tSelObj = {};
        selectedTBL_KSV_PO_MRP.forEach((col, i) => {
            if (col.PU_CD) {
                if (i === 0) tPostObj.pu_cd = `${col.PU_CD},${col.PAY_REPORT},${col.PAY_AMOUNT},${col.SHIP_DATE}`;
                else  tPostObj.pu_cd += `|${col.PU_CD},${col.PAY_REPORT},${col.PAY_AMOUNT},${col.SHIP_DATE}`;
                tSelObj = { ...col };
            }
        });

        var tUserInfo = serviceLib.getUserInfo();

        let _url1 = `${window.location.protocol}//${window.location.hostname}:3202/restapi/`;
        axios
            .post(
                `${_url1}request_gw_lc/${tSelObj.PU_CD}/${tRetDate}/${tUserInfo.USER_ID}/${tSelObj.REG_USER}/${tSelObj.PAY_REPORT}`,
                tPostObj,
            )
            .then((response) => {
                console.log(response.data);
                console.log(
                    "GW RES DATA: " +
                        response.data.data.ADDRESS +
                        "=>" +
                        response.data.data.APPROKEY,
                );

                gwWinRef.current = window.open(
                    response.data.data.ADDRESS,
                    GW_WINDOW_NAME,
                );

                // 닫힘 감시 — 닫히면 ref 초기화
                const timer = setInterval(() => {
                    if (gwWinRef.current?.closed) {
                        gwWinRef.current = null;
                        clearInterval(timer);
                    }
                }, 500);
            });
    };

    const process_GW_DEPOSIT = (argPuCd) => {
        // 이미 열려 있으면 새로 안 띄움
        if (gwWinRef.current?.closed === false) {
            alert("이미 열려 있는 창이 있습니다.<br><br>There is already a window open.");
            gwWinRef.current.focus();
            return;
        }

        if (selectedTBL_KSV_PO_MRP.length <= 0) {
            alert("상신할 데이터를 선택하세요");
            return;
        }

        var chk = 0;
        var saveObj = {};
        selectedTBL_KSV_PO_MRP.forEach((col, i) => {
            if (i === 0) saveObj = { ...col };
            else {
                if (col.TYPE !== saveObj.TYPE ||
                    col.CURR_CD !== saveObj.CURR_CD ||
                    col.PAY_DATE  !== saveObj.PAY_DATE) {
                    chk = 1;
                 }
            }

        });
        if (chk > 0) {
            alert("상신할 데이터의 Type, Curr, pay date는 같아야 합니다");
            return;
        }


        var tRetDate = serviceLib.getCurrDate().substring(0, 8);
        var tUserInfo = serviceLib.getUserInfo();

        var tPostObj = {};
        tPostObj.pu_cd = '';
        var tSelObj = {};
        selectedTBL_KSV_PO_MRP.forEach((col, i) => {
            if (col.PU_CD) {
                if (i === 0) tPostObj.pu_cd = `${col.PU_CD},${col.PAY_REPORT},${col.PAY_AMOUNT}`;
                else  tPostObj.pu_cd += `|${col.PU_CD},${col.PAY_REPORT},${col.PAY_AMOUNT}`;
                tSelObj = { ...col };
            }
        });

        let _url1 = `${window.location.protocol}//${window.location.hostname}:3202/restapi/`;
        axios
            .post(
                `${_url1}request_gw_deposit/${argPuCd}/${tRetDate}/${tUserInfo.USER_ID}/${tSelObj.PAY_REPORT}`,
                tPostObj,
            )
            .then((response) => {
                console.log(response.data);
                console.log(
                    "GW RES DATA: " +
                        response.data.data.ADDRESS +
                        "=>" +
                        response.data.data.APPROKEY,
                );

                gwWinRef.current = window.open(
                    response.data.data.ADDRESS,
                    GW_WINDOW_NAME,
                );

                // 닫힘 감시 — 닫히면 ref 초기화
                const timer = setInterval(() => {
                    if (gwWinRef.current?.closed) {
                        gwWinRef.current = null;
                        clearInterval(timer);
                    }
                }, 500);
            });
    };

    const process_GW = () => {
        if (selectedTBL_KSV_PO_MRP?.length <= 0 || !selectedTBL_KSV_PO_MRP) {
            alert("상신할 데이타를 선택하세요<br><br>Select the data you wish to upload");
            return;
        }

        /*
        if (selectedTBL_KSV_PO_MRP?.length > 1) {
            alert("상신할 데이타는 하나만 선택하세요<br><br>Please select only one data to upload");
            return;
        }
        */

        console.log(selectedTBL_KSV_PO_MRP);

        var tChk = 0;
        var tSelObj = {};
        selectedTBL_KSV_PO_MRP.forEach((col, i) => {
            tSelObj = { ...col };
            if (tSelObj.GW_STATUS === "1" || tSelObj.GW_STATUS === "2") {
                tChk = 1;
            }
        });
        if (tChk > 0) {
            alert("상신/종결 데이타는 처리할수 없습니다<br><br>Submission/closing data cannot be processed.");
            return;
        }

        var tInput = {};
        tInput.PU_CD = tSelObj.PU_CD;

        console.log(tInput);

        if (tSelObj.TYPE === "LC") process_GW_LC(tInput.PU_CD);
        if (tSelObj.TYPE === "DEPOSIT") process_GW_DEPOSIT(tInput.PU_CD);
    };

    /* QRY KSV_PO_MRP*/
    const [dataQRY_KSV_PO_MRP, setDataQRY_KSV_PO_MRP] =
        useState(emptyQRY_KSV_PO_MRP);

    const onInputChangeQRY_KSV_PO_MRP_PURCHASER = (e, name) => {
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

    const onCalChangeQRY_KSV_PO_MRP_MRP_S_PAY_DATE = (e, name) => {
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

    const onCalChangeQRY_KSV_PO_MRP_MRP_E_PAY_DATE = (e, name) => {
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

    const onCalChangeQRY_KSV_PO_MRP_MRP_S_IN_DATE = (e, name) => {
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

    const onCalChangeQRY_KSV_PO_MRP_MRP_E_IN_DATE = (e, name) => {
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

    const [datasQRY_KSV_PO_MRP_GW_STATUS, setDatasQRY_KSV_PO_MRP_GW_STATUS] =
        useState([]);
    const [dataQRY_KSV_PO_MRP_GW_STATUS, setDataQRY_KSV_PO_MRP_GW_STATUS] =
        useState({});

    const onDropdownChangeQRY_KSV_PO_MRP_GW_STATUS = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
        setDataQRY_KSV_PO_MRP_GW_STATUS(e.value);
    };

    const [datasQRY_KSV_PO_MRP_TYPE, setDatasQRY_KSV_PO_MRP_TYPE] = useState(
        [],
    );
    const [dataQRY_KSV_PO_MRP_TYPE, setDataQRY_KSV_PO_MRP_TYPE] = useState({});

    const onDropdownChangeQRY_KSV_PO_MRP_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
        setDataQRY_KSV_PO_MRP_TYPE(e.value);
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

    const onRowClick1TBL_KSV_PO_MRP = (argData0) => {
        var argData = {};

        if (typeof argData0?.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_PO_MRP = argData;
        setDataTBL_KSV_PO_MRP(argTBL_KSV_PO_MRP);
    };

    const onRowClickTBL_KSV_PO_MRP = (event) => {
        let argTBL_KSV_PO_MRP = event.data;
        if (flagSelectModeTBL_KSV_PO_MRP) return;

        // Service : NawooAll:mgrQueryTBL_KSV_PO_MRP
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
        rowData[field] = String(serviceLib.getFloat(parseFloat(newValue), 2));

        if (field === "MOQ_QTY") {
            var tMrpQty = parseFloat(rowData.MRP_QTY);
            var tStockQty = parseFloat(rowData.STOCK_QTY);
            var tMoqQty = parseFloat(newValue);
            var tPoQty = tMrpQty - tStockQty + tMoqQty;
            tPoQty = serviceLib.getFloat(tPoQty, 4);
            rowData.PO_QTY = String(tPoQty);
        }
        if (field === "MOQ_AMT") {
            rowData.MOQ_PRICE = serviceLib.getFloat(
                parseFloat(rowData.MOQ_AMT / rowData.PO_QTY),
                4,
            );
            rowData.PO_PRICE =
                rowData.MASTER_PRICE +
                rowData.MOQ_PRICE +
                rowData.FREIGHT_PRICE +
                rowData.OTHER_PRICE;
            rowData.PO_PRICE = serviceLib.getFloat(rowData.PO_PRICE, 4);

            rowData.MOQ_PRICE = String(rowData.MOQ_PRICE);
            rowData.PO_PRICE = String(rowData.PO_PRICE);
        }
        if (field === "FREIGHT_AMT") {
            rowData.FREIGHT_PRICE = serviceLib.getFloat(
                parseFloat(rowData.FREIGHT_AMT / rowData.PO_QTY),
                4,
            );
            rowData.PO_PRICE =
                rowData.MASTER_PRICE +
                rowData.MOQ_PRICE +
                rowData.FREIGHT_PRICE +
                rowData.OTHER_PRICE;
            rowData.PO_PRICE = serviceLib.getFloat(rowData.PO_PRICE, 4);

            rowData.FREIGHT_PRICE = String(rowData.FREIGHT_PRICE);
            rowData.PO_PRICE = String(rowData.PO_PRICE);
        }
        if (field === "OTHER_AMT") {
            rowData.OTHER_PRICE = serviceLib.getFloat(
                parseFloat(rowData.OTHER_AMT / rowData.PO_QTY),
                4,
            );
            rowData.PO_PRICE =
                rowData.MASTER_PRICE +
                rowData.MOQ_PRICE +
                rowData.FREIGHT_PRICE +
                rowData.OTHER_PRICE;
            rowData.PO_PRICE = serviceLib.getFloat(rowData.PO_PRICE, 4);

            rowData.OTHER_PRICE = String(rowData.OTHER_PRICE);
            rowData.PO_PRICE = String(rowData.PO_PRICE);
        }

        var _dataTBL_KSV_PO_MRP2 = { ...dataTBL_KSV_PO_MRP2 };
        setDataTBL_KSV_PO_MRP2(rowData);
    };

    const cellEditorKSV_PO_MRP2 = (options) => {
        return textEditor(options);
    };

    const textEditor = (options) => {
        return (
            <InputText
                type="text"
                value={options.value}
                onChange={(e) => options.editorCallback(e.target.value)}
            />
        );
    };

    /* QRY KSV_PO_MRP*/
    const [dataEDT_KSV_PO_MRP, setDataEDT_KSV_PO_MRP] =
        useState(emptyEDT_KSV_PO_MRP);

    const onInputChangeEDT_KSV_PO_MRP_PU_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onInputChangeEDT_KSV_PO_MRP_BUYER_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onInputChangeEDT_KSV_PO_MRP_PO_CD2 = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onInputChangeEDT_KSV_PO_MRP_VENDOR_CD = (e, name) => {
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

    const onInputChangeEDT_KSV_PO_MRP_MATL_TYPE = (e, name) => {
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

    const onInputChangeEDT_KSV_PO_MRP_SHIP_TO = (e, name) => {
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

    const onInputChangeEDT_KSV_PO_MRP_DEPOSIT_AMT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onInputChangeEDT_KSV_PO_MRP_DEPOSIT_FIX = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onInputChangeEDT_KSV_PO_MRP_PI_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onCalChangeEDT_KSV_PO_MRP_ORDER_DATE = (e, name) => {
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

    const onCalChangeEDT_KSV_PO_MRP_DELIVERY_DATE = (e, name) => {
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

    const onCalChangeEDT_KSV_PO_MRP_EXP_DELIVERY_DATE = (e, name) => {
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

    const [datasEDT_KSV_PO_MRP_PLACE_CD, setDatasEDT_KSV_PO_MRP_PLACE_CD] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_PLACE_CD, setDataEDT_KSV_PO_MRP_PLACE_CD] =
        useState({});

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

    const [datasEDT_KSV_PO_MRP_NORMI, setDatasEDT_KSV_PO_MRP_NORMI] = useState(
        [],
    );
    const [dataEDT_KSV_PO_MRP_NORMI, setDataEDT_KSV_PO_MRP_NORMI] = useState(
        {},
    );

    const onDropdownChangeEDT_KSV_PO_MRP_NORMI = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
        setDataEDT_KSV_PO_MRP_NORMI(e.value);
    };

    const [datasEDT_KSV_PO_MRP_TRADE_TERM, setDatasEDT_KSV_PO_MRP_TRADE_TERM] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_TRADE_TERM, setDataEDT_KSV_PO_MRP_TRADE_TERM] =
        useState({});

    const onDropdownChangeEDT_KSV_PO_MRP_TRADE_TERM = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        if (e.value.CD_CODE === "FOB") {
            _dataEDT_KSV_PO_MRP["BILL_TO"] = "SHINTS BVT Co., Ltd.";
        } else {
            _dataEDT_KSV_PO_MRP["BILL_TO"] = "Shin Textile Solutions Co., Ltd.";
        }

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);

        setDataEDT_KSV_PO_MRP_TRADE_TERM(e.value);
    };

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

    const onDropdownChangeEDT_KSV_PO_MRP_CURR_CD = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
        setDataEDT_KSV_PO_MRP_CURR_CD(e.value);
    };

    const onInputChangeEDT_KSV_PO_MRP_PAY_AMT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onCheckboxChangeEDT_KSV_PO_MRP_LC_FLAG = (e, name) => {
        let val = "";
        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataEDT_KSV_PO_MRP[`${name}`] = val;
        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    ///

    useEffect(() => {
        var tRetDate0 = `${serviceLib.getCurrDate().substring(0, 6)}01`;
        var tRetDate1 = serviceLib.getCurrDate().substring(0, 8);

        var tQry = { ...dataQRY_KSV_PO_MRP };
        tQry.S_PAY_DATE = tRetDate0;
        tQry.E_PAY_DATE = tRetDate1;
        setDataQRY_KSV_PO_MRP(tQry);

        var tObj = {};
        serviceS0439_LC_DEPOSIT.mgrQuery_CODE(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasQRY_KSV_PO_MRP1_BUYER_CD(data.BUYER_CD);
                setDataQRY_KSV_PO_MRP1_BUYER_CD(data.BUYER_CD[0]);
            } else {
                console.log(
                    "mgrQuery_PO_CD error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        // search_LIST_2();

        var tObj1 = {};
        tObj1.BUYER_CD = "";
        serviceS0439_LC_DEPOSIT.mgrQuery_CODE2(tObj1).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasQRY_KSV_PO_MRP_GW_STATUS(data.GW_STATUS);
                setDataQRY_KSV_PO_MRP_GW_STATUS(data.GW_STATUS[0]);

                setDatasQRY_KSV_PO_MRP_TYPE(data.TYPE);
                setDataQRY_KSV_PO_MRP_TYPE(data.TYPE[0]);
            } else {
                console.log(
                    "mgrQuery_PO_CD error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
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
        <div className="af-div-main">
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "8.5rem" }}
            >
                <span className="af-span-3-0" style={{ width: "16rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Pay Date</p>
                    <div className="af-span-div" style={{ width: "8rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "8rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_S_PO_DATE"
                            value={changeDateVal(dataQRY_KSV_PO_MRP.S_PAY_DATE)}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_PO_MRP_MRP_S_PAY_DATE(
                                    e,
                                    "S_PAY_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "10rem" }}>
                    <p className="af-span-p" style={{ width: "1rem" }}>~</p>
                    <div className="af-span-div" style={{ width: "8rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "8rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_S_PO_DATE"
                            value={changeDateVal(dataQRY_KSV_PO_MRP.E_PAY_DATE)}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_PO_MRP_MRP_E_PAY_DATE(
                                    e,
                                    "E_PAY_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "18rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Type</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <Dropdown
                            style={{ width: "10rem" }}
                            id="id_PO_CD"
                            value={dataQRY_KSV_PO_MRP_TYPE}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MRP_TYPE(e, "TYPE")
                            }
                            options={datasQRY_KSV_PO_MRP_TYPE}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "18rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Purchaser</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <InputText
                            style={{ width: "10rem" }}
                            id="id_TARGET_ETA"
                            value={dataQRY_KSV_PO_MRP.PURCHASER}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP_PURCHASER(
                                    e,
                                    "PURCHASER",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "50rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
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
                            style={{ width: "10rem" }}
                            className="p-button-text"
                            onClick={search_LIST_2}
                        />
                    </div>
                    <p className="af-span-p" style={{ width: "1rem" }}></p>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            label="Excel"
                            style={{ width: "10rem" }}
                            className="p-button-text green"
                            onClick={exportExcelTBL_KSV_PO_MRP}
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "16rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>In Date</p>
                    <div className="af-span-div" style={{ width: "8rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "8rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_S_PO_DATE"
                            value={changeDateVal(dataQRY_KSV_PO_MRP.S_IN_DATE)}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_PO_MRP_MRP_S_IN_DATE(
                                    e,
                                    "S_IN_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "10rem" }}>
                    <p className="af-span-p" style={{ width: "1rem" }}>~</p>
                    <div className="af-span-div" style={{ width: "8rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "8rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_S_PO_DATE"
                            value={changeDateVal(dataQRY_KSV_PO_MRP.E_IN_DATE)}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_PO_MRP_MRP_E_IN_DATE(
                                    e,
                                    "E_IN_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "18rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>PU#</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <InputText
                            style={{ width: "10rem" }}
                            id="id_TARGET_ETA"
                            value={dataQRY_KSV_PO_MRP.PU_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP_PU_CD(e, "PU_CD")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "18rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>GW Status</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <Dropdown
                            style={{ width: "10rem" }}
                            id="id_PO_CD"
                            value={dataQRY_KSV_PO_MRP_GW_STATUS}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MRP_GW_STATUS(
                                    e,
                                    "GW_STATUS",
                                )
                            }
                            options={datasQRY_KSV_PO_MRP_GW_STATUS}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "50rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            style={{ width: "10rem" }}
                            label="GW"
                            className="p-button-text orange"
                            onClick={process_GW}
                        />
                    </div>
                </span>

                <span className="af-span-3-0" style={{ width: "26.5rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Supplier</p>
                    <div className="af-span-div" style={{ width: "18.5rem" }}>
                        <InputText
                            style={{ width: "18.5rem" }}
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
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "52rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_PO_MRP}
                    size="small"
                    value={datasTBL_KSV_PO_MRP}
                    tableStyle={{ tableLayout: "fixed" }}
                    loading={loadingTBL_KSV_PO_MRP}
                    resizableColumns
                    columnResizeMode="fit"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_PO_MRP}
                    // onRowDoubleClick={search_LIST_4}
                    onRowDoubleClick={popup_INFO}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_PO_MRP(true);
                        setSelectedTBL_KSV_PO_MRP(e.value);
                        console.log(
                            "selected length:" + selectedTBL_KSV_PO_MRP?.length,
                        );
                        onRowClick1TBL_KSV_PO_MRP(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_PO_MRP}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" " //header={headerTBL_KSV_PO_MRP}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="560px"
                >
                    <AFColumn
                        selectionMode="multiple" 
                        field="__checkbox__"
                        reorderable={false}
                        headerClassName="t-header"
                        headerStyle={{ width: "24px", minWidth: "24px", maxWidth: "24px" }}
                        style={{ width: "px", minWidth: "24px", maxWidth: "24px" }}
                        forceWidth={true}
                    />
                    <AFColumn field="PAY_DATE" headerClassName="t-header" header="Pay Date" style={{ width: "6rem", flexBasis: "auto" }} body={(rowData) => serviceLib.dateFormat(rowData.PAY_DATE) } ></AFColumn>
                    <AFColumn field="TYPE" headerClassName="t-header" header="Type" style={{ width: "12rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="REG_USER" headerClassName="t-header" header="Purchaser" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PU_CD" headerClassName="t-header" header="PU#" style={{ width: "6rem", flexBasis: "auto" }} className="orange" ></AFColumn>
                    <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Supplier" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="CURR_CD" headerClassName="t-header" header="Curr" style={{ width: "3rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PAY_AMOUNT" headerClassName="t-header" className="text-right" header="Pur Amount" style={{ width: "6rem", flexBasis: "auto" }} body={(rowData) => serviceLib.formatNumber(rowData.PAY_AMOUNT, 2) } ></AFColumn>
                    <AFColumn field="DEPOSIT_AMT" headerClassName="t-header" className="text-right" header="Pay Amount" style={{ width: "6rem", flexBasis: "auto" }} body={(rowData) => serviceLib.formatNumber(rowData.DEPOSIT_AMT, 2) } ></AFColumn>
                    <AFColumn field="LC_RATE" headerClassName="t-header" className="text-right" header="%" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="DEPOSIT_GW_STATUS_N" headerClassName="t-header" header="Status" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="DEPOSIT_GW_KEY" headerClassName="t-header" header="Gw Key" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="IN_DATETIME" headerClassName="t-header" header="In Date" style={{ width: "10rem", flexBasis: "auto" }} body={(rowData) => serviceLib.dateFormat(rowData.IN_DATETIME) } ></AFColumn>
                    <AFColumn field="SHIP_MODE" headerClassName="t-header" header="Ship Mode" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="SHIP_DATE" headerClassName="t-header" header="Ship Date" style={{ width: "10rem", flexBasis: "auto" }} body={(rowData) => serviceLib.dateFormat(rowData.SHIP_DATE) } ></AFColumn>
                    <AFColumn field="EXPIRY_DATE" headerClassName="t-header" header="Expiry Date" style={{ width: "10rem", flexBasis: "auto" }} body={(rowData) => serviceLib.dateFormat(rowData.EXPIRY_DATE) } ></AFColumn>
                    <AFColumn field="LATEST_SHIP_DATE" headerClassName="t-header" header="Lastest Ship Date" style={{ width: "10rem", flexBasis: "auto" }} body={(rowData) => serviceLib.dateFormat(rowData.LATEST_SHIP_DATE) } ></AFColumn>
                    <AFColumn field="REQUEST_PAY_DATE" headerClassName="t-header" header="Request Pay Date" style={{ width: "10rem", flexBasis: "auto" }} body={(rowData) => serviceLib.dateFormat(rowData.REQUEST_PAY_DATE) } ></AFColumn>
                    <AFColumn field="NEOE_NO" headerClassName="t-header" header="Neoe#" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                </AFDataTable>
            </div>

            <Toast ref={toast} />

            <Dialog
                visible={createDialog}
                position="mid-center"
                style={{ width: "98vw" }}
                header=""
                modal={true}
                className="p-fluid"
                onHide={hideDialog}
            >
                <div
                    style={{
                        marginLeft: "1rem",
                        marginTop: "1.5rem",
                        width: "95rem",
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
                        <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerStyle={{ width: "5px" }} style={{ width: "5px" }} ></AFColumn>
                        <AFColumn field="STATUS" headerClassName="t-header" header="Status" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="PO_CD" headerClassName="t-header" header="Po" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="PO_SEQ" headerClassName="t-header" header="Po Seq" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="MATL_CD" headerClassName="t-header" header="Matl" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="MATL_NAME" headerClassName="t-header" header="Desc" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="COLOR" headerClassName="t-header" header="Color" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="SPEC" headerClassName="t-header" header="Spec" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="UNIT" headerClassName="t-header" header="Unit" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="MRP_QTY" headerClassName="t-header" header="Mrp Qty" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="STOCK_QTY" headerClassName="t-header" header="Stock Qty" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="MOQ_QTY" headerClassName="t-header" header="MOQ" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} editor={(options) => cellEditorKSV_PO_MRP2(options)} onCellEditComplete={onCellEditCompleteKSV_PO_MRP2} ></AFColumn>
                        <AFColumn field="PO_QTY" headerClassName="t-header" header="Po Qty" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="CURR_CD" headerClassName="t-header" header="Curr" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="MASTER_PRICE" headerClassName="t-header" header="Master Price" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="MOQ_AMT" headerClassName="t-header" header="MOQ Amt" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} editor={(options) => cellEditorKSV_PO_MRP2(options)} onCellEditComplete={onCellEditCompleteKSV_PO_MRP2} ></AFColumn>
                        <AFColumn field="MOQ_PRICE" headerClassName="t-header" header="MOQ Price" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="FREIGHT_AMT" headerClassName="t-header" header="Freight Amt" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} editor={(options) => cellEditorKSV_PO_MRP2(options)} onCellEditComplete={onCellEditCompleteKSV_PO_MRP2} ></AFColumn>
                        <AFColumn field="FREIGHT_PRICE" headerClassName="t-header" header="Freight Price" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="OTHER_AMT" headerClassName="t-header" header="Other Amt" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} editor={(options) => cellEditorKSV_PO_MRP2(options)} onCellEditComplete={onCellEditCompleteKSV_PO_MRP2} ></AFColumn>
                        <AFColumn field="OTHER_PRICE" headerClassName="t-header" header="Other Price" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="SURCHARGE_PRICE" headerClassName="t-header" header="Sur Charge" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} editor={(options) => cellEditorKSV_PO_MRP2(options)} onCellEditComplete={onCellEditCompleteKSV_PO_MRP2} ></AFColumn>
                        <AFColumn field="PO_PRICE" headerClassName="t-header" header="Po price" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="DIFF_QTY" headerClassName="t-header" header="Diff Qty" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    </AFDataTable>
                </div>

                <Divider />
                <div
                    style={{
                        marginLeft: "1rem",
                        marginTop: "1rem",
                        width: "95rem",
                        height: "30rem",
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
                        <p style={{ width: "8rem", display: "inline-block" }}>Pu Cd</p>
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "17rem",
                            }}
                            id="id_TARGET_ETA"
                            value={dataEDT_KSV_PO_MRP.PU_CD}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_PU_CD(e, "PU_CD")
                            }
                        />
                    </span>
                    <span
                        style={{
                            marginLeft: "0.5rem",
                            height: "2rem",
                            display: "inline-block",
                            width: "30rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block" }}>Buyer</p>
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "17rem",
                            }}
                            id="id_TARGET_ETA"
                            value={dataEDT_KSV_PO_MRP.BUYER_CD}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_BUYER_CD(
                                    e,
                                    "BUYER_CD",
                                )
                            }
                        />
                    </span>
                    <span
                        style={{
                            marginLeft: "0.5rem",
                            height: "2rem",
                            display: "inline-block",
                            width: "30rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block" }}>Normination</p>
                        <div
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "18rem",
                            }}
                        >
                            <Dropdown
                                id="id_NORMI"
                                value={dataEDT_KSV_PO_MRP_NORMI}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_PO_MRP_NORMI(
                                        e,
                                        "NORMI",
                                    )
                                }
                                options={datasEDT_KSV_PO_MRP_NORMI}
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
                            width: "30rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block" }}>Po</p>
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "20rem",
                            }}
                            id="id_TARGET_ETA"
                            value={dataEDT_KSV_PO_MRP.PO_CD2}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_PO_CD2(e, "PO_CD2")
                            }
                        />
                    </span>
                    <span
                        style={{
                            marginLeft: "0.5rem",
                            height: "2rem",
                            display: "inline-block",
                            width: "30rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block" }}>Trade Term</p>
                        <div
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "18rem",
                            }}
                        >
                            <Dropdown
                                id="id_TRADE_TERM"
                                value={dataEDT_KSV_PO_MRP_TRADE_TERM}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_PO_MRP_TRADE_TERM(
                                        e,
                                        "TRADE_TERM",
                                    )
                                }
                                options={datasEDT_KSV_PO_MRP_TRADE_TERM}
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
                            width: "13rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block" }}>Vendor</p>
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "4rem",
                            }}
                            id="id_TARGET_ETA"
                            value={dataEDT_KSV_PO_MRP.VENDOR_CD}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_VENDOR_CD(
                                    e,
                                    "VENDOR_CD",
                                )
                            }
                        />
                    </span>
                    <span
                        style={{
                            marginLeft: "0.5rem",
                            height: "2rem",
                            display: "inline-block",
                            width: "16rem",
                        }}
                    >
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "17rem",
                            }}
                            id="id_TARGET_ETA"
                            value={dataEDT_KSV_PO_MRP.VENDOR_NAME}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_VENDOR_NAME(
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
                            width: "30rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block" }}>Order Date</p>
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
                                id="id_S_PO_DATE"
                                value={changeDateVal(
                                    dataEDT_KSV_PO_MRP.ORDER_DATE,
                                )}
                                onChange={(e) =>
                                    onCalChangeEDT_KSV_PO_MRP_ORDER_DATE(
                                        e,
                                        "ORDER_DATE",
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
                            width: "30rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block" }}>Matl Type</p>
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "17rem",
                            }}
                            id="id_TARGET_ETA"
                            value={dataEDT_KSV_PO_MRP.MATL_TYPE}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_MATL_TYPE(
                                    e,
                                    "MATL_TYPE",
                                )
                            }
                        />
                    </span>
                    <span
                        style={{
                            marginLeft: "0.5rem",
                            height: "2rem",
                            display: "inline-block",
                            width: "30rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block" }}>Delivery Date</p>
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
                                id="id_S_PO_DATE"
                                value={changeDateVal(
                                    dataEDT_KSV_PO_MRP.DELIVERY_DATE,
                                )}
                                onChange={(e) =>
                                    onCalChangeEDT_KSV_PO_MRP_DELIVERY_DATE(
                                        e,
                                        "DELIVERY_DATE",
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
                            width: "30rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block" }}>Purchaser</p>
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "17rem",
                            }}
                            id="id_TARGET_ETA"
                            value={dataEDT_KSV_PO_MRP.REG_USER}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_REG_USER(
                                    e,
                                    "REG_USER",
                                )
                            }
                        />
                    </span>
                    <span
                        style={{
                            marginLeft: "0.5rem",
                            height: "2rem",
                            display: "inline-block",
                            width: "30rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block" }}>(E)Delivery Date</p>
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
                                id="id_S_PO_DATE"
                                value={changeDateVal(
                                    dataEDT_KSV_PO_MRP.EXP_DELIVERY_DATE,
                                )}
                                onChange={(e) =>
                                    onCalChangeEDT_KSV_PO_MRP_EXP_DELIVERY_DATE(
                                        e,
                                        "EXP_DELIVERY_DATE",
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
                            width: "30rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block" }}>BILL TO</p>
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "17rem",
                            }}
                            id="id_TARGET_ETA"
                            value={dataEDT_KSV_PO_MRP.BILL_TO}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_BILL_TO(
                                    e,
                                    "BILL_TO",
                                )
                            }
                        />
                    </span>
                    <span
                        style={{
                            marginLeft: "0.5rem",
                            height: "2rem",
                            display: "inline-block",
                            width: "30rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block" }}>(E)Pay Date</p>
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
                                id="id_S_PO_DATE"
                                value={changeDateVal(
                                    dataEDT_KSV_PO_MRP.PAY_DATE,
                                )}
                                onChange={(e) =>
                                    onCalChangeEDT_KSV_PO_MRP_PAY_DATE(
                                        e,
                                        "PAY_DATE",
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
                            width: "30rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block" }}>SHIP TO</p>
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "17rem",
                            }}
                            id="id_TARGET_ETA"
                            value={dataEDT_KSV_PO_MRP.SHIP_TO}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_SHIP_TO(
                                    e,
                                    "SHIP_TO",
                                )
                            }
                        />
                    </span>
                    <span
                        style={{
                            marginLeft: "0.5rem",
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
                                width: "18rem",
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
                                editable
                            ></Dropdown>
                        </div>
                    </span>

                    <span
                        style={{
                            marginLeft: "0.5rem",
                            height: "2rem",
                            display: "inline-block",
                            width: "30rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block" }}>Curr</p>
                        <div
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "18rem",
                            }}
                        >
                            <Dropdown
                                id="id_CURR_CD"
                                value={dataEDT_KSV_PO_MRP_CURR_CD}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_PO_MRP_CURR_CD(
                                        e,
                                        "CURR_CD",
                                    )
                                }
                                options={datasEDT_KSV_PO_MRP_CURR_CD}
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
                            width: "30rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block" }}>PI#</p>
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "17rem",
                            }}
                            id="id_TARGET_ETA"
                            value={dataEDT_KSV_PO_MRP.PI_NO}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_PI_NO(e, "PI_NO")
                            }
                        />
                    </span>

                    <span
                        style={{
                            marginLeft: "0.5rem",
                            height: "2rem",
                            display: "inline-block",
                            width: "30rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block" }}>Deposit Amt</p>
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "17rem",
                            }}
                            id="id_TARGET_ETA"
                            value={dataEDT_KSV_PO_MRP.DEPOSIT_AMT}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_DEPOSIT_AMT(
                                    e,
                                    "DEPOSIT_AMT",
                                )
                            }
                        />
                    </span>
                    <span
                        style={{
                            marginLeft: "0.5rem",
                            height: "2rem",
                            display: "inline-block",
                            width: "30rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block" }}>Deposit Fix</p>
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "17rem",
                            }}
                            id="id_TARGET_ETA"
                            value={dataEDT_KSV_PO_MRP.DEPOSIT_FIX}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_DEPOSIT_FIX(
                                    e,
                                    "DEPOSIT_FIX",
                                )
                            }
                        />
                    </span>

                    <span
                        style={{
                            marginLeft: "0.5rem",
                            height: "2rem",
                            display: "inline-block",
                            width: "30rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block" }}>Tot Amt</p>
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "17rem",
                            }}
                            id="id_TARGET_ETA"
                            value={dataEDT_KSV_PO_MRP.PAY_AMT}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_PAY_AMT(
                                    e,
                                    "PAY_AMT",
                                )
                            }
                        />
                    </span>
                    <span
                        style={{
                            marginLeft: "0.5rem",
                            height: "2rem",
                            display: "inline-block",
                            width: "8rem",
                        }}
                    >
                        <p style={{ width: "5rem", display: "inline-block" }}>LC</p>
                        <div
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "2rem",
                            }}
                        >
                            <Checkbox
                                style={{
                                    display: "inline-block",
                                    width: "2rem",
                                }}
                                id="id_LC_FLAG"
                                checked={changeCheckBoxVal(
                                    dataEDT_KSV_PO_MRP.LC_FLAG,
                                )}
                                onChange={(e) =>
                                    onCheckboxChangeEDT_KSV_PO_MRP_LC_FLAG(
                                        e,
                                        "LC_FLAG",
                                    )
                                }
                            />
                        </div>
                    </span>
                </div>

                <div
                    style={{
                        width: "100rem",
                        height: "2rem",
                        marginLeft: "71rem",
                    }}
                >
                    <div className="formgrid grid">
                        <div className="field col-6 md:col-6">
                            <Button
                                style={{
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                                label="PU Save"
                                icon="pi pi-check"
                                className="p-button-text"
                                onClick={process_INSERT_PU_MST_1}
                            />

                            <Button
                                style={{
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                                label="Exit"
                                icon="pi pi-check"
                                className="p-button-text"
                                onClick={blankFn}
                            />
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0439_LC_DEPOSIT, comparisonFn);
