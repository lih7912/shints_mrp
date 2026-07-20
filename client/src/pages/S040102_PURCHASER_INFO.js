/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { AFDataTable } from "../components/AFDataTable";
import { AFColumn } from "../components/AFColumn";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
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
import { ContextMenu } from "primereact/contextmenu";
import { OverlayPanel } from "primereact/overlaypanel";
import { TabView, TabPanel } from "primereact/tabview";

import axios from "axios";
import apiOption from "../assets/env_graphql";
const moment = require("moment");

import { ServiceS040102_PURCHASER_INFO } from "../service/service_biz/ServiceS040102_PURCHASER_INFO";
import { ServiceS040101_PURCHASER_REG } from "../service/service_biz/ServiceS040101_PURCHASER_REG";
import { ServiceS030503_STOCK_CHECK } from "../service/service_biz/ServiceS030503_STOCK_CHECK";
import { ServiceLib } from "../service/service_lib/ServiceLib";

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
    PU_CD: "",
};

const emptyQRY_KSV_PO_MRP1 = {
    BUYER_CD: "",
    PO_CD: "",
    VENDOR_CD: "",
    MRP_DATE: "",
};

const emptyTBL_KSV_ORDER_MEM = {
    id: 0,
    ORDER_CD: "",
    MATL_CD: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    UNIT: "",
    STOCK: "",
    RACK: "",
    IO_STATUS: "",
    MRP_QTY: "",
    PO_QTY: "",
    SUM_QTY: "",
    VENDOR_NAME: "",
    VENDOR_CD: "",
    STOCK_FLAG: "",
};

const emptyTBL_KSV_PO_MST = {
    id: 0,
    PO_SEQ: "",
    ORDER_CD: "",
    MATL_CD: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    STATUS_NAME: "",
    BEF_QTY: "",
    STOCK_QTY: "",
    MRP_QTY: "",
    NEW_QTY: "",
    BAL_QTY: "",
    DIFF_PO_TYPE_NAME: "",
    DIFF_PO_TYPE: "",
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

const emptyTBL_KSV_PO_MRP4 = {
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

const emptyEDT_KSV_PO_MRP0 = {
    IS_ALL: "",
    IS_BAL: "",
    MEMO: "",
    TT_AMT: "",
    LC_AMT: "",
    LC_CURR: "",
    DEPOSIT_AMT: "",
    DEPOSIT_CURR: "",
    DEBIT_AMT: "",
    DEBIT_CURR: "",
};

const emptyEDT_KSV_PO_MRP = {
    PU_CD: "",
    PU_STATUS: "",
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
    PAY_TYPE: "",

    CURR_CD2: "",
};

const emptyQRY_KCD_MATL_MST = {
    MATL_NAME: "",
    COLOR: "",
    MATL_CD: "",
    RACK: "",
    FACTORY_CD: "",
    SPEC: "",
    VENDOR_CD: "",
    MATL_KIND2: "",
    STATUS_CD: "",
};

const emptyTBL_KCD_MATL_MST = {
    id: 0,
    PO_SEQ: "",
    ORDER_CD: "",
    MATL_CD: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    UNIT: "",
    RACK: "",
    LOCATION: "",
    REMATION_QTY: "",
    USED_QTY: "",
    VENDOR_NAME: "",
    VENDOR_CD: "",
};

const emptyTBL_KSV_PO_MRP5 = {
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
    OVERSHORT_RATE: "",
    EXPIRY_DATE: "",
    LATEST_SHIP_DATE: "",
    SHIP_MODE: "",
};

const S040102_PURCHASER_INFO = () => {
    const isMountedRef = useRef(true);

    // 컴포넌트 언마운트 시 cleanup
    useEffect(() => {
        return () => {
            isMountedRef.current = false;
        };
    }, []);

    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS040102_PURCHASER_INFORef = useRef(null);
    if (!serviceS040102_PURCHASER_INFORef.current) serviceS040102_PURCHASER_INFORef.current = new ServiceS040102_PURCHASER_INFO();
    const serviceS040102_PURCHASER_INFO = serviceS040102_PURCHASER_INFORef.current;
    const serviceS040101_PURCHASER_REGRef = useRef(null);
    if (!serviceS040101_PURCHASER_REGRef.current) serviceS040101_PURCHASER_REGRef.current = new ServiceS040101_PURCHASER_REG();
    const serviceS040101_PURCHASER_REG = serviceS040101_PURCHASER_REGRef.current;
    const serviceS030503_STOCK_CHECKRef = useRef(null);
    if (!serviceS030503_STOCK_CHECKRef.current) serviceS030503_STOCK_CHECKRef.current = new ServiceS030503_STOCK_CHECK();
    const serviceS030503_STOCK_CHECK = serviceS030503_STOCK_CHECKRef.current;

    const toast = useRef(null);
    const op = useRef(null);
    const cm = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const [styleVal1, setStyleVal1] = useState({
        width: "123rem",
        height: "2rem",
        marginLeft: "2rem",
        display: "none",
    });
    const [isEdit, setIsEdit] = useState(false);

    const [mailHeader, setMailHeader] = useState("");
    const [mailTitle, setMailTitle] = useState("");
    const [mailBody, setMailBody] = useState("");

    const [saveStatus, setSaveStatus] = useState("");
    const [saveBatchReason, setSaveBatchReason] = useState("");

    // File
    const [dataUrlFile1, setDataUrlFile1] = useState("");

    const dt_iframe = useRef(null);
    const [dlgInfo, setDlgInfo] = useState(false);

    const popup_MATL_MST = (e) => {
        var tObj = {};
        if (typeof e.MATL_CD !== "undefined") {
            tObj = { ...e };
        } else {
            if (selectedTBL_KSV_PO_MRP2.length <= 0) return;
            tObj = { ...selectedTBL_KSV_PO_MRP2[0] };
        }

        const tMatlCd = String(tObj.MATL_CD || "").trim();
        if (!tMatlCd) return;

        const tMatlRecordPayload = {
            MATL_CD: tMatlCd,
            SOURCE: "S040102",
            TS: Date.now(),
        };

        // Fallback payload for the case where S0301 tab mounts after this postMessage.
        window.localStorage.setItem(
            "S0301_MATL_RECORD_OPEN_REQUEST",
            JSON.stringify(tMatlRecordPayload),
        );

        var tUrl2 = "S0301_MATL_RECORD";

        var tValObj = {
            key: "2-1",
            label: "Material Record",
            icon: "pi pi-fw pi-user-edit",
            url1: "S0301_MATL_RECORD",
        };
        var tArgObj = { ...tValObj };
        tArgObj.url1 = tUrl2;
        tArgObj.keepStateIfOpen = true;
        var tFuncObj = {};
        tFuncObj.func = "call_url";
        tFuncObj.message = { ...tArgObj };
        window.parent.postMessage(tFuncObj, "*");

        window.parent.postMessage(
            {
                func: "s0301_set_matl_cd",
                message: tMatlRecordPayload,
            },
            "*",
        );
    };

    // dialog
    const [urlIframe, setUrlIframe] = useState("");
    const [createDialog, setCreateDialog] = useState(false);

    const [createDialogStockCheck, setCreateDialogStockCheck] = useState(false);
    const hideDialogStockCheck = () => {
        setCreateDialogStockCheck(false);
    };

    const [createDialogRevise, setCreateDialogRevise] = useState(false);
    const hideDialogRevise = () => {
        setCreateDialogRevise(false);
    };

    const [urlIframe2, setUrlIframe2] = useState("");
    const [createDialog2, setCreateDialog2] = useState(false);
    const hideDialog2 = () => {
        setCreateDialog2(false);
    };

    const [urlIframe3, setUrlIframe3] = useState("");
    const [createDialog3, setCreateDialog3] = useState(false);
    const hideDialog3 = () => {
        setCreateDialog3(false);
    };

    const [urlIframe4, setUrlIframe4] = useState("");
    const [createDialog4, setCreateDialog4] = useState(false);
    const hideDialog4 = () => {
        setCreateDialog4(false);
    };

    const [urlIframe5, setUrlIframe5] = useState("");
    const [createDialog5, setCreateDialog5] = useState(false);
    const hideDialog5 = () => {
        setCreateDialog5(false);
    };

    //

    const process_EXIT_LC = () => {
        setCreateDialog3(false);
    };

    // Stock Apply Function
    const popup_STOCK_APPLY = () => {
        if (selectedTBL_KSV_PO_MRP2.length !== 1) {
            alert(
                `Stock 적용할 데이타를 하나 선택하세요. 한개만 선택가능합니다 `,
            );
            return;
        }

        setDatasTBL_KSV_PO_MRP5(selectedTBL_KSV_PO_MRP2);

        var tObj = {};
        tObj.PO_CD = "";
        tObj.PO_SEQ = "";
        tObj.MATL_CD = "";

        setSelectedTBL_KCD_MATL_MST([]);
        setDatasTBL_KCD_MATL_MST([]);

        serviceS030503_STOCK_CHECK.mgrQuery_CODE(tObj).then((data) => {
            if (!isMountedRef.current) return;
            if (typeof data.graphQLErrors === "undefined") {
                setDatasQRY_KCD_MATL_MST_FACTORY_CD(data.FACTORY_CD);
                setDataQRY_KCD_MATL_MST_FACTORY_CD(data.FACTORY_CD[0]);

                setDatasQRY_KCD_MATL_MST_MATL_KIND2(data.TYPE2);
                setDataQRY_KCD_MATL_MST_MATL_KIND2(data.TYPE2[0]);

                setDatasQRY_KCD_MATL_MST_STATUS_CD(data.STATUS_CD);
                setDataQRY_KCD_MATL_MST_STATUS_CD(data.STATUS_CD[0]);
            } else {
                console.log(
                    "mgrQueryTBL_KSV_PO_MST error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        var tArray = [];

        setCreateDialog5(true);
    };

    const searchSTOCK_MATL = (argData0) => {
        console.log(argData0);
        var argData = {};
        if (typeof argData0.PO_CD === "undefined") {
            argData = { ...dataQRY_KCD_MATL_MST };
        } else {
            argData = { ...argData0 };
        }

        setSelectedTBL_KCD_MATL_MST([]);
        setDatasTBL_KCD_MATL_MST([]);

        // if (argData.STOCK_CHK !== '*') return;

        var tObj2 = {};
        tObj2.PO_CD = "";
        tObj2.MATL_CD = argData.MATL_CD;
        tObj2.MATL_NAME = argData.MATL_NAME;
        tObj2.COLOR = argData.COLOR;
        tObj2.RACK = argData.RACK;
        tObj2.FACTORY_CD = argData.FACTORY_CD;
        tObj2.SPEC = argData.SPEC;
        tObj2.VENDOR_CD = argData.VENDOR_CD;
        tObj2.MATL_KIND2 = argData.MATL_KIND2;
        tObj2.STATUS_CD = argData.STATUS_CD;

        // 2
        setLoadingTBL_KCD_MATL_MST(true);
        serviceS030503_STOCK_CHECK
            .mgrQueryTBL_KCD_MATL_MST(tObj2)
            .then((data) => {
            if (!isMountedRef.current) return;
                setLoadingTBL_KCD_MATL_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "mgrQueryTBL_KCD_MATL_MST call => " + data.length,
                    );
                    var tArray = data.map((col, i) => {
                        var tObj = { ...col };
                        tObj.id = i + 1;
                        return tObj;
                    });
                    setDatasTBL_KCD_MATL_MST(tArray);
                } else {
                    console.log(
                        "mgrQueryTBL_KSV_PO_MRP error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const useStock = () => {
        if (selectedTBL_KCD_MATL_MST.length <= 0) {
            alert("Select one or more materials to apply to stock. ");
            return;
        }

        var tObj = {};
        tObj.PO_CD = datasTBL_KSV_PO_MRP5[0].PO_CD;
        tObj.PO_SEQ = datasTBL_KSV_PO_MRP5[0].PO_SEQ;
        tObj.USER_ID = "";
        tObj.DEST_DATA = [];
        datasTBL_KSV_PO_MRP5.forEach((col, i) => {
            var tObj1 = {};
            tObj1.MATL_CD = col.MATL_CD;
            tObj.DEST_DATA.push(tObj1);
        });

        tObj.SRC_DATA = [];
        selectedTBL_KCD_MATL_MST.forEach((col, i) => {
            var tObj1 = { ...col };
            delete tObj1.id;
            delete tObj1.__typename;
            if (parseFloat(tObj1.USE_QTY) > 0) tObj.SRC_DATA.push(tObj1);
        });

        if (tObj.SRC_DATA.length <= 0) {
            alert('Please enter "Use Qty" and proceed.');
            return;
        }

        setLoadingTBL_KCD_MATL_MST(true);
        serviceS030503_STOCK_CHECK.mgrUseStock_N_N(tObj).then((data) => {
            if (!isMountedRef.current) return;
            setLoadingTBL_KCD_MATL_MST(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    alert(data[0].CODE);
                    setCreateDialog5(false);

                    var argQryObj = { ...datasTBL_KSV_PO_MRP1[0] };
                    var tLastObj = {
                        ...datasTBL_KSV_PO_MRP0[
                            datasTBL_KSV_PO_MRP0.length - 1
                        ],
                    };
                    if (tLastObj.PU_SEQ === "W")
                        tLastObj = {
                            ...datasTBL_KSV_PO_MRP0[
                                datasTBL_KSV_PO_MRP0.length - 2
                            ],
                        };
                    var tQryObj3 = { ...argQryObj };
                    tQryObj3.LAST = "1";
                    tQryObj3.IN_PO_CD = "";
                    tQryObj3.IN_PO_SEQ = "";
                    tQryObj3.IN_PO_CD2 = tLastObj.PO_CD;
                    if (tLastObj.SEND_DATETIME === "") tQryObj3.IN_PO_SEQ2 = "";
                    else tQryObj3.IN_PO_SEQ2 = tLastObj.PO_SEQ;
                    search_LIST_3(tQryObj3, []);
                }
            } else {
                console.log(
                    "mgrUseStock error => " +
                        JSON.stringify(data.graphQLErrors),
                );
                toast.current.show({
                    severity: "success",
                    summary: "use Stock Error",
                    detail: "",
                    life: 3000,
                });
            }
        });
    };

    // popup

    const popup_INSERT_DEBIT = () => {
        var tEdit_1 = { ...dataEDT_KSV_PO_MRP };
        var tEdit_2 = { ...dataTBL_KSV_PO_MRP1 };

        var tEdit0 = { ...dataEDT_KSV_PO_MRP0 };

        var tTotAmt = 0;
        var tCurrCd = "";
        var tVendorCd = "";
        var tPoCd = "";
        var tVendorName = "";
        var tFlag = 0;
        datasTBL_KSV_PO_MRP2.forEach((col, i) => {
            tTotAmt += parseInt(col.PO_QTY) * parseFloat(col.PO_PRICE);

            tCurrCd = col.CURR_CD;
            tVendorCd = col.VENDOR_CD;
            if (tPoCd === "") tPoCd = col.PO_CD;
            else {
                if (tPoCd.includes(col.PO_CD));
                else tPoCd += `/${col.PO_CD}`;
            }
            tVendorName = col.VENDOR_NAME;
        });

        if (tFlag === 1) {
            alert("같은 Po , Vendor, Curr Cd만 선택가능합니다<br><br>Only the same Po, Vendor, and Curr Cd can be selected.");
            return;
        }

        var tSaveObj = {};
        tSaveObj.PO_CD = tPoCd;
        tSaveObj.ORDER_CD = "";
        tSaveObj.BUYER_CD = tEdit_2.BUYER_CD;
        tSaveObj.BUYER_NAME = tEdit_2.BUYER_NAME;
        tSaveObj.CURR_CD = tCurrCd;
        // tSaveObj.TOT_AMT = String(tTotAmt);
        tSaveObj.TOT_AMT = String(0);
        tSaveObj.VENDOR_CD = tEdit_2.VENDOR_CD;
        tSaveObj.VENDOR_NAME = tEdit_2.VENDOR_NAME;
        tSaveObj.FACTORY_CD = dataKSV_PU_MST.FACTORY_CD;
        tSaveObj.PU_CD = tEdit_1.PU_CD;
        tSaveObj.TITLE = tEdit_1.PU_CD;
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

    const popup_REQUEST_DEPOSIT = async (event) => {
        var tEdit_1 = { ...dataEDT_KSV_PO_MRP };
        var tEdit_2 = { ...dataTBL_KSV_PO_MRP1 };

        if (tEdit_1.PU_STATUS === "Update") {
            alert(
                'If the status is "Update", you cannot set a deposit. Please save and try again..',
            );
            return;
        }

        var tEdit0 = { ...dataEDT_KSV_PO_MRP0 };
        if (tEdit0.DEPOSIT_CURR === "Req") {
            var tRet = await confirm(
                " Do you want to cancel the requested [Deposit]?",
            );
            if (tRet) {
                process_CANCEL_DEPOSIT();
                return;
            }
        } else if (tEdit0.DEPOSIT_CURR === "Send") {
            alert("The submitted [Deposit] cannot be cancelled.");
            return;
        }

        var tInObj0 = { ...dataEDT_KSV_PO_MRP };

        var tArray0 = [];
        var tCheckPoPrice = 0;
        datasTBL_KSV_PO_MRP2.forEach((col, i) => {
            var tInObj = {};
            tInObj.PU_CD = tInObj0.PU_CD;
            tInObj.PO_CD = col.PO_CD;
            tInObj.MATL_CD = col.MATL_CD;
            tArray0.push(tInObj);
        });

        setLoadingTBL_KSV_PO_MRP2(true);
        serviceS040102_PURCHASER_INFO
            .mgrQuery_LIST_DEPOSIT(tArray0)
            .then((data) => {
            setLoadingTBL_KSV_PO_MRP2(false);
            if (!isMountedRef.current) return;
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        popup_REQUEST_DEPOSIT_SUB(data);
                    }
                } else {
                    console.log(
                        "mgrQuery_PO_CD error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });

        var tEdit1 = { ...dataEDT_KSV_PO_MRP2 };

        var tObj = {};
        tObj.VENDOR_CD = tEdit_2.VENDOR_CD;
        serviceS040102_PURCHASER_INFO.mgrQuery_CODE3(tObj).then((data) => {
            if (!isMountedRef.current) return;
            if (typeof data.graphQLErrors === "undefined") {
                if (data.BANK_CD.length > 0) {
                    setDatasEDT_KSV_PO_MRP2_PAY_BANK(data.BANK_CD);
                    setDataEDT_KSV_PO_MRP2_PAY_BANK(data.BANK_CD[0]);

                    tEdit1.PAY_CONDITION = data.PAY_TYPE.CD_NAME;
                    setDataEDT_KSV_PO_MRP2(tEdit1);
                }
            } else {
                console.log(
                    "mgrQuery_PO_CD error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        setCreateDialog2(true);
    };

    const popup_REQUEST_DEPOSIT_SUB = (argDatas) => {
        var tEdit_1 = { ...dataEDT_KSV_PO_MRP };
        var tEdit_2 = { ...dataTBL_KSV_PO_MRP1 };

        var tEdit0 = { ...dataEDT_KSV_PO_MRP0 };

        var tArray0 = [];
        var tCheckPoPrice = 0;
        var sumLcAmt = 0;
        datasTBL_KSV_PO_MRP2.forEach((col, i) => {
            var tObj = { ...col };
            tObj.id = i + 1;
            tObj.LC_QTY = "0";
            argDatas.forEach((col2, i2) => {
                if (col2.PO_CD === col.PO_CD && col2.MATL_CD === col.MATL_CD) {
                    tObj.PO_QTY = col2.LC_QTY;
                    tObj.LC_QTY = col2.LC_QTY;
                    tObj.AMOUNT =
                        parseFloat(tObj.LC_QTY) * parseFloat(tObj.PO_PRICE) ||
                        "0";
                    tObj.AMOUNT =
                        String(serviceLib.getFloat(tObj.AMOUNT, 2)) || "0";
                    sumLcAmt += parseFloat(tObj.AMOUNT);
                }
            });
            if (parseFloat(tObj.LC_QTY) > 0) tArray0.push(tObj);
        });

        if (tArray0.length <= 0) {
            alert("There is no data to set Deposit..");
            return;
        }
        tEdit_1.PAY_AMT = parseFloat(sumLcAmt).toFixed(2);

        var tVal = 0;
        // tVal = parseFloat(tEdit_1.PAY_AMT) - parseFloat(tEdit0.DEPOSIT_AMT);
        tVal = parseFloat(tEdit_1.PAY_AMT);
        if (tVal <= 0) {
            alert("There is no data to set Deposit..");
            return;
        }

        var tEdit1 = { ...dataEDT_KSV_PO_MRP2 };
        tEdit1.REG_USER = tEdit_2.REG_USER;
        tEdit1.VENDOR_NAME = tEdit_2.VENDOR_NAME;
        tEdit1.CURRENCY = tEdit_2.CURR_CD;
        // tEdit1.AMOUNT = tEdit_1.PAY_AMT;
        tEdit1.AMOUNT = parseFloat(tVal).toFixed(2);
        tEdit1.DEPOSIT_AMOUNT = "0";
        tEdit1.DEPOSIT_RATE = "0";
        tEdit1.PAY_DATE = tEdit_1.PAY_DATE;

        var tObj = {};
        tObj.VENDOR_CD = tEdit_2.VENDOR_CD;
        serviceS040102_PURCHASER_INFO.mgrQuery_CODE3(tObj).then((data) => {
            if (!isMountedRef.current) return;
            if (typeof data.graphQLErrors === "undefined") {
                if (data.BANK_CD.length > 0) {
                    setDatasEDT_KSV_PO_MRP2_PAY_BANK(data.BANK_CD);
                    setDataEDT_KSV_PO_MRP2_PAY_BANK(data.BANK_CD[0]);

                    tEdit1.PAY_CONDITION = data.PAY_TYPE.CD_NAME;
                    setDataEDT_KSV_PO_MRP2(tEdit1);
                }
            } else {
                console.log(
                    "mgrQuery_PO_CD error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        setCreateDialog2(true);
    };

    const popup_REQUEST_LC = async (event) => {
        var tEdit_1 = { ...dataEDT_KSV_PO_MRP };
        var tEdit_2 = { ...dataTBL_KSV_PO_MRP1 };

        if (tEdit_1.PU_STATUS === "Update") {
            alert(
                'If the status is "Update", you cannot set a LC. Please save and try again..',
            );
            return;
        }

        var tEdit0 = { ...dataEDT_KSV_PO_MRP0 };
        if (tEdit0.LC_CURR) {
            if (tEdit0.LC_CURR === "Req") {
                var tRet = await confirm(
                    "Do you want to cancel the requested LC?",
                );
                if (tRet) {
                    process_CANCEL_LC();
                    return;
                }
            } else {
                // alert(`The submitted [LC] cannot be cancelled(1).`);
                // return;
            }
        }
        var tInObj0 = { ...dataEDT_KSV_PO_MRP };
        var tArray0 = [];
        var tCheckPoPrice = 0;
        datasTBL_KSV_PO_MRP2.forEach((col, i) => {
            var tInObj = {};
            tInObj.PU_CD = tInObj0.PU_CD;
            tInObj.PO_CD = col.PO_CD;
            tInObj.MATL_CD = col.MATL_CD;
            tArray0.push(tInObj);
        });

        serviceS040102_PURCHASER_INFO.mgrQuery_LIST_LC(tArray0).then((data) => {
            if (!isMountedRef.current) return;
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    popup_REQUEST_LC_SUB(data);
                }
            } else {
                console.log(
                    "mgrQuery_PO_CD error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        var tObj = {};
        tObj.VENDOR_CD = tEdit_2.VENDOR_CD;
        serviceS040102_PURCHASER_INFO.mgrQuery_CODE3(tObj).then((data) => {
            if (!isMountedRef.current) return;
            if (typeof data.graphQLErrors === "undefined") {
                if (data.BANK_CD.length > 0) {
                    setDatasEDT_KSV_PO_MRP3_PAY_BANK(data.BANK_CD);
                    setDataEDT_KSV_PO_MRP3_PAY_BANK(data.BANK_CD[0]);
                }
            } else {
                console.log(
                    "mgrQuery_PO_CD error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        setCreateDialog3(true);
    };

    const popup_REQUEST_LC_SUB = (argDatas) => {
        var tEdit_1 = { ...dataEDT_KSV_PO_MRP };
        var tEdit_2 = { ...dataTBL_KSV_PO_MRP1 };

        var tEdit0 = { ...dataEDT_KSV_PO_MRP0 };

        var tArray0 = [];
        var tCheckPoPrice = 0;
        var sumLcAmt = 0;
        datasTBL_KSV_PO_MRP2.forEach((col, i) => {
            var tObj = { ...col };
            tObj.id = i + 1;
            tObj.LC_QTY = "0";

            argDatas.forEach((col2, i2) => {
                if (col2.PO_CD === col.PO_CD && col2.MATL_CD === col.MATL_CD) {
                    tObj.PO_QTY = col2.LC_QTY;
                    tObj.LC_QTY = col2.LC_QTY;
                    tObj.AMOUNT =
                        parseFloat(tObj.LC_QTY) * parseFloat(tObj.PO_PRICE) ||
                        "0";
                    tObj.AMOUNT =
                        String(serviceLib.getFloat(tObj.AMOUNT, 2)) || "0";
                    sumLcAmt += parseFloat(tObj.AMOUNT);
                }
            });
            if (parseFloat(tObj.LC_QTY) > 0) tArray0.push(tObj);
        });

        if (tArray0.length <= 0) {
            alert("There is no data to set LC..");
            return;
        }
        setDatasTBL_KSV_PO_MRP3(tArray0);

        setDataEDT_KSV_PO_MRP3({});
        setSelectedTBL_KSV_PO_MRP3([]);

        var tEdit1 = { ...dataEDT_KSV_PO_MRP3 };
        tEdit1.REG_USER = tEdit_2.REG_USER;
        tEdit1.VENDOR_NAME = tEdit_2.VENDOR_NAME;
        tEdit1.BUYER_NAME = tEdit_2.BUYER_NAME;
        tEdit1.TRADE_TERM = tEdit_2.TRADE_TERM;
        tEdit1.PAY_DATE = tEdit_2.PAY_DATE;
        tEdit1.OVERSHORT_RATE = tEdit_2.OVER_SHORT;
        tEdit1.EXPIRY_DATE = "";
        tEdit1.SHIP_DATE = "";
        tEdit1.LATEST_SHIP_DATE = "";
        tEdit1.SHIP_MODE = "";

        var tRate = 0;
        var tAmt = parseFloat(sumLcAmt);
        var tRate = 1.0;

        // tEdit1.AMOUNT = String(serviceLib.numToFixed(tEdit_1.PAY_AMT, 2)) || '';

        tAmt = parseFloat(sumLcAmt);
        tEdit1.AMOUNT = String(serviceLib.numToFixed(tAmt, 2)) || "";
        setDataEDT_KSV_PO_MRP3(tEdit1);
    };

    const cancelStock = (argData) => {
        var tQryObj = { ...argData };

        if (selectedTBL_KSV_ORDER_MEM.length <= 0) {
            alert("데이터를 지정해야 합니다<br><br>You must specify data");
            return;
        }

        var tInObj = { ...selectedTBL_KSV_ORDER_MEM[0] };

        var tFlag = 0;
        var tFlag1 = 0;
        var tObj = {};
        tObj.PO_CD = tInObj.PO_CD;
        tObj.PO_SEQ = tInObj.PO_SEQ;
        tObj.USER_ID = serviceLib.getUserInfo().USER_ID;
        tObj.DEST_DATA = [];
        selectedTBL_KSV_ORDER_MEM.forEach((col, i) => {
            var tObj1 = { ...col };
            delete tObj1.id;
            delete tObj1.__typename;

            if (!tObj1.CANCEL_REASON) {
                tFlag1 = 1;
            }

            if (tObj1.USE_PO_TYPE_N !== "재고발주") tFlag = 1;

            datasCANCEL_REASON.forEach((col1, i1) => {
                if (col.CANCEL_REASON === col1.CD_NAME)
                    tObj1.CANCEL_REASON = col1.CD_CODE;
            });

            tObj.DEST_DATA.push(tObj1);
        });
        tObj.SRC_DATA = [];

        if (tFlag1 > 0) {
            alert (`Cancel Reason를 입력해야 합니다<br><br>You must input cancel reason`);
            return;
        }

        setLoadingTBL_KSV_ORDER_MEM(true);
        serviceS030503_STOCK_CHECK.mgrStockCancel(tObj).then((data) => {
            if (!isMountedRef.current) return;
            setLoadingTBL_KSV_ORDER_MEM(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    alert(data[0].CODE);
                    if (data[0].CODE.includes("SUCC")) {
                        setCreateDialogStockCheck(false);

                        var argQryObj = { ...datasTBL_KSV_PO_MRP1[0] };
                        var tLastObj = {
                            ...datasTBL_KSV_PO_MRP0[
                                datasTBL_KSV_PO_MRP0.length - 1
                            ],
                        };
                        if (tLastObj.PU_SEQ === "W")
                            tLastObj = {
                                ...datasTBL_KSV_PO_MRP0[
                                    datasTBL_KSV_PO_MRP0.length - 2
                                ],
                            };
                        var tQryObj3 = { ...argQryObj };
                        tQryObj3.LAST = "1";
                        tQryObj3.IN_PO_CD = "";
                        tQryObj3.IN_PO_SEQ = "";
                        tQryObj3.IN_PO_CD2 = tLastObj.PO_CD;
                        if (tLastObj.SEND_DATETIME === "")
                            tQryObj3.IN_PO_SEQ2 = "";
                        else tQryObj3.IN_PO_SEQ2 = tLastObj.PO_SEQ;
                        search_LIST_3(tQryObj3, []);
                    }
                }
            } else {
                console.log(
                    "mgrStockCancel error => " +
                        JSON.stringify(data.graphQLErrors),
                );
                toast.current.show({
                    severity: "success",
                    summary: "use Stock Error",
                    detail: "",
                    life: 3000,
                });
            }
        });
    };

    const search_STOCK = (argData) => {
        var inObj = {};
        inObj.PO_CD = argData.PO_CD;
        inObj.MATL_CD = argData.MATL_CD;

        setLoadingTBL_KSV_PO_MRP2(true);
        serviceS040102_PURCHASER_INFO
            .mgrQuery_LIST_STOCK(inObj)
            .then((data) => {
            if (!isMountedRef.current) return;
                setLoadingTBL_KSV_PO_MRP2(false);

                if (typeof data.graphQLErrors === "undefined") {
                    var tArray = [];
                    data.forEach((col, i) => {
                        var tObj = { ...col };
                        tObj.id = i + 1;
                        tObj.CANCEL_QTY = tObj.PO_QTY;
                        // tObj.CANCEL_REASON = col.CANCEL_REASON || "NOT USE";
                        tObj.CANCEL_REASON = "";
                        tArray.push(tObj);
                    });

                    setDatasTBL_KSV_ORDER_MEM(tArray);
                    setCreateDialogStockCheck(true);
                } else {
                    setDatasTBL_KSV_ORDER_MEM([]);
                }
            });
    };

    const search_REVISE = (argData) => {
        var inObj = {};
        inObj.PO_CD = argData.PO_CD;
        inObj.PO_SEQ = "";
        inObj.VENDOR_CD = argData.VENDOR_CD;

        setLoadingTBL_KSV_PO_MST(true);
        serviceS040102_PURCHASER_INFO
            .mgrQuery_LIST_REVISE(inObj)
            .then((data) => {
            if (!isMountedRef.current) return;
                setLoadingTBL_KSV_PO_MST(false);

                if (typeof data.graphQLErrors === "undefined") {
                    const rows = Array.isArray(data?.DATA1)
                        ? data.DATA1
                        : Array.isArray(data)
                          ? data
                          : [];
                    var tArray = [];
                    rows.forEach((col, i) => {
                        var tObj = { ...col };
                        tObj.id = i + 1;
                        tArray.push(tObj);
                    });
                    setDatasTBL_KSV_PO_MST(tArray);
                    setCreateDialogRevise(true);
                } else {
                    setDatasTBL_KSV_PO_MST([]);
                }
            });
    };

    const [mailInfo, setMailInfo] = useState({});

    const search_LIST_3 = (argObj0, argPuMems) => {
        var argObj = { ...argObj0 };

        var tPuSeq = "";
        if (argObj0.PU_SEQ) tPuSeq = String(argObj0.PU_SEQ);

        var tObj = {};
        tObj.PO_CD = argObj0.PO_CD2;
        tObj.BUYER_CD = argObj0.BUYER_CD;
        tObj.VENDOR_CD = argObj0.VENDOR_CD;
        tObj.MATL_TYPE = "";
        tObj.PU_CD2 = argObj0.PU_CD;
        tObj.PU_CD = argObj0.PU_CD;
        tObj.PU_SEQ = tPuSeq;
        tObj.PO_SEQ = "";
        tObj.LAST = argObj0.LAST;
        tObj.IN_PO_SEQ = argObj0.IN_PO_SEQ;
        tObj.IN_PO_CD = argObj0.IN_PO_CD;
        tObj.IN_PO_SEQ2 = argObj0.IN_PO_SEQ2;
        tObj.IN_PO_CD2 = argObj0.IN_PO_CD2;

        setDatasTBL_KSV_PO_MRP2([]);
        setLoadingTBL_KSV_PO_MRP2(true);

        serviceS040102_PURCHASER_INFO.mgrQuery_LIST_3(tObj).then((data) => {
            if (!isMountedRef.current) return;
            setLoadingTBL_KSV_PO_MRP2(false);

            console.log(`LIST 3 Result:${data.STOCK_MEM.length}`);
            console.log(data);

            var tPayAmt = 0;
            var tTTAmt = 0;
            if (typeof data.graphQLErrors === "undefined") {
                if (data.STOCK_MEM.length <= 0) {
                    // alert (`이 발주서에는 더이상 처리가능한 자재가 없습니다.  해당 PO의 Order가 삭제되었을수 있습니다.전산팀에 문의하세요`);
                    alert(
                        `There are no more materials available for this purchase order. The order for this PO may have been deleted. Please contact the IT team. `,
                    );
                    return;
                }

                var tCurrCd = "";
                var tFactoryCd = "";
                var tCheckCurr = "";
                var tSaveCurr = "";
                var tDiffCurr = "";
                var tArray = data.STOCK_MEM.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;

                    // var tUpdateQty = parseFloat(tObj.PO_QTY) + parseFloat(tObj.DIFF_QTY);
                    var tUpdateQty = parseFloat(tObj.PO_QTY);
                    tObj.PO_UPDATE_QTY = String(tUpdateQty);
                    // if (tPuSeq === '' || tPuSeq === 'W') tObj.DIFF_QTY  = String(parseFloat(tObj.PO_UPDATE_QTY) - parseFloat(tObj.BEF_PO_QTY)-parseFloat(tObj.OVER_QTY));
                    // if (tPuSeq === '' || tPuSeq === 'W') tObj.DIFF_QTY  = String(parseFloat(tObj.PO_UPDATE_QTY) - parseFloat(tObj.BEF_PO_QTY));
                    tPayAmt +=
                        parseFloat(tObj.PO_UPDATE_QTY) *
                        parseFloat(tObj.PO_PRICE);
                    tCurrCd = tObj.CURR_CD;
                    tFactoryCd = tObj.FACTORY_CD;

                    return tObj;
                });

                tArray.sort((a, b) => {
                    // MATL_NAME 기준 (자연 정렬)
                    const nameCompare = a.MATL_NAME.localeCompare(
                        b.MATL_NAME,
                        undefined,
                        { numeric: true },
                    );
                    if (nameCompare !== 0) return nameCompare;

                    // SPEC 기준 (자연 정렬)
                    const specCompare = a.SPEC.localeCompare(
                        b.SPEC,
                        undefined,
                        { numeric: true },
                    );
                    if (specCompare !== 0) return specCompare;

                    // COLOR 기준 (자연 정렬)
                    return a.COLOR.localeCompare(b.COLOR, undefined, {
                        numeric: true,
                    });
                });
                // id 다시 매기기
                var tArray9 = [];
                tArray.forEach((col9, i9) => {
                    var tObj = { ...col9 };
                    tObj.id = i9 + 1;

                    var tArray10 = [];
                    tObj.DATAS.forEach((col8, i8) => {
                        var tObj2 = { ...col8 };

                        var tSaveObj = {};
                        tSaveObj.MRP_QTY = tObj2.MRP_QTY;
                        tSaveObj.STOCK_QTY = tObj2.STOCK_QTY;
                        tSaveObj.MOQ_QTY = tObj2.MOQ_QTY;
                        tSaveObj.OVER_QTY = tObj2.OVER_QTY;
                        tSaveObj.LEFTOVER_QTY = tObj2.LEFTOVER_QTY;
                        tSaveObj.BEF_PO_QTY = tObj2.BEF_PO_QTY;
                        tSaveObj.PO_QTY = tObj2.PO_QTY;
                        tSaveObj.DIFF_QTY = tObj2.DIFF_QTY;
                        tSaveObj.PO_UPDATE_QTY = tObj2.PO_UPDATE_QTY;
                        tSaveObj.MASTER_PRICE = tObj2.MASTER_PRICE;
                        tSaveObj.PO_PRICE = tObj2.PO_PRICE;
                        tSaveObj.SURCHARGE_AMT = tObj2.SURCHARGE_AMT;

                        tObj2.SAVE_DATA = { ...tSaveObj };
                        tArray10.push(tObj2);
                    });
                    tObj.DATAS = [...tArray10];
                    tArray9.push(tObj);
                });

                var tStockMems = [];
                tArray9.forEach((col, i) => {
                    var tObj3 = { ...col };
                    // if (col.PU_STATUS === 'FullIn') tObj3.DIFF_QTY = '0';
                    tStockMems.push(tObj3);
                });

                setDatasTBL_KSV_PO_MRP2(tStockMems);
                sessionStorage.setItem(
                    "S040102_LIST_3",
                    JSON.stringify(tStockMems),
                );

                // setSelectedTBL_KSV_PO_MRP2(tStockMems);

                // PU MEM display
                var tCheckFullIn = 1;
                tArray.forEach((col, i) => {
                    if (
                        col.PU_STATUS === "FullIn" ||
                        parseFloat(col.PO_UPDATE_QTY) <= 0
                    );
                    else tCheckFullIn = 0;
                });
                tCheckFullIn = 0;
                if (
                    typeof argPuMems !== "undefined" &&
                    typeof argPuMems.length !== "undefined"
                ) {
                    var argPuMems1 = [];
                    var saveObj = {};
                    argPuMems.forEach((col, i) => {
                        if (col.PU_SEQ === "W" && tCheckFullIn === 1) {
                            if (
                                parseFloat(col.PO_SEQ) !==
                                parseFloat(saveObj.PO_SEQ)
                            ) {
                                var tObj3 = { ...col };
                                tObj3.PU_SEQ = i + 1;
                                if (!col.SEND_DATETIME) {
                                    tObj3.SEND_DATETIME =
                                        serviceLib.getCurrDate();
                                    tObj3.SEND_FILENAME = "Check OK";
                                }
                                argPuMems1.push(tObj3);
                            }
                        } else {
                            saveObj = { ...col };
                            argPuMems1.push(col);
                        }
                    });
                    setDatasTBL_KSV_PO_MRP0(argPuMems1);
                    setDataTBL_KSV_PO_MRP0(argPuMems1[0]);
                }

                tTTAmt = tPayAmt;
                var tPU_MST0 = { ...data.PU_MST[0] };
                var tPU_MST = { ...data.PU_MST_NEW[0] };
                setDataKSV_PU_MST(tPU_MST);

                var tEdit = { ...dataEDT_KSV_PO_MRP0 };
                tEdit.DEBIT_CURR = tPU_MST.CURR_CD;
                if (parseFloat(argObj.DEBIT_AMT) <= 0) tEdit.DEBIT_CURR = "";
                tEdit.DEBIT_AMT = String(
                    parseFloat(argObj.DEBIT_AMT).toFixed(2),
                );

                if (parseFloat(tPU_MST0.DEPOSIT_AMT) > 0) {
                    tEdit.DEPOSIT_AMT = tPU_MST0.DEPOSIT_AMT;
                    if (tPU_MST0.DEPOSIT_GW_STATUS === "2") {
                        tEdit.DEPOSIT_CURR = argObj.CURR_CD;
                        tEdit.DEPOSIT_AMT = String(tPU_MST0.DEPOSIT_AMT);
                    } else if (tPU_MST0.DEPOSIT_GW_STATUS === "1") {
                        tEdit.DEPOSIT_CURR = "Send";
                        tTTAmt -= parseFloat(argObj.DEPOSIT_AMT);
                    } else {
                        // if (tPU_MST0.DEPOSIT_GW_STATUS) tEdit.DEPOSIT_CURR = 'Req';
                        tEdit.DEPOSIT_CURR = "Req";
                    }
                } else {
                    tEdit.DEPOSIT_CURR = "";
                    tEdit.DEPOSIT_AMT = "0";
                }

                // if (tPU_MST.LC_FLAG === '1') {
                if (parseFloat(tPU_MST0.LC_AMT) > 0) {
                    tEdit.LC_AMT = argObj.LC_AMT;
                    if (tPU_MST0.DEPOSIT_GW_STATUS === "2") {
                        tEdit.LC_CURR = argObj.CURR_CD;
                        tEdit.LC_AMT = String(
                            parseFloat(argObj.LC_AMT).toFixed(2),
                        );
                    } else if (tPU_MST0.DEPOSIT_GW_STATUS === "1") {
                        tEdit.LC_CURR = "Send";
                        tEdit.LC_AMT = String(argObj.LC_AMT);
                        tTTAmt = 0;
                        // tTTAmt -= parseFloat(argObj.LC_AMT);
                    } else {
                        // if (tPU_MST0.DEPOSIT_GW_STATUS) tEdit.DEPOSIT_CURR = 'Req';
                        tEdit.LC_CURR = "Req";
                        tEdit.LC_AMT = String(
                            parseFloat(argObj.LC_AMT).toFixed(2),
                        );
                    }
                } else {
                    tEdit.LC_CURR = "";
                    tEdit.LC_AMT = "0";
                }

                var tTotalPuAmt =
                    parseFloat(tTTAmt) +
                    parseFloat(tEdit.LC_AMT) +
                    parseFloat(tEdit.DEPOSIT_AMT);

                tEdit.TT_AMT = String(serviceLib.numToFixed(tTTAmt, 2));
                tEdit.MEMO = tPU_MST0.MEMO;
                tEdit.PAY_TYPE = tPU_MST0.PAY_TYPE;
                setDataEDT_KSV_PO_MRP0(tEdit);

                argObj.NORMI = tPU_MST0.NORMI;
                argObj.CURR_CD = tPU_MST0.CURR_CD;
                argObj.PI_NO = tPU_MST0.PI_NO;
                argObj.PI_FILE = argObj.PI_FILE;

                // argObj.TARGET_ETA = tPU_MST0.TARGET_ETA;
                argObj.TARGET_ETA = tPU_MST.MATL_DUE_DATE;
                argObj.EX_FACTORY = tPU_MST.P_EX_FACTORY;
                // argObj.PAY_AMT = String(serviceLib.numToFixed(tTTAmt, 2));
                argObj.PAY_AMT = String(serviceLib.numToFixed(tTotalPuAmt, 2));
                argObj.BILL_TO = tPU_MST0.BILL_TO;
                argObj.PLACE_CD = argObj.PLACE_CD;
                argObj.FORWARDER = tPU_MST.FORWARDER;
                argObj.ORIGIN_PORT = tPU_MST.ORIGIN_PORT;
                argObj.TRADE_TERM = tPU_MST.TRADE_TERM;
                argObj.PU_STATUS = argObj0.PU_STATUS;
                // argObj.PAY_TYPE = tPU_MST.PAY_TYPE;
                argObj.PAY_TYPE = tPU_MST0.PAY_TYPE;
                setMailInfo(argObj);
            } else {
                setDatasTBL_KSV_PO_MRP2([]);
                console.log(
                    "mgrQuery_PO_CD error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_LIST_3_LOG = (argObj0) => {
        var argObj = { ...dataTBL_KSV_PO_MRP1 };
        argObj.IN_PO_CD = argObj0.IN_PO_CD;
        argObj.IN_PO_SEQ = argObj0.IN_PO_SEQ;
        argObj.IN_PO_CD2 = argObj0.IN_PO_CD2;
        argObj.IN_PO_SEQ2 = argObj0.IN_PO_SEQ2;
        argObj.PU_CD = argObj0.PU_CD;
        argObj.PU_SEQ = argObj0.PU_SEQ;
        argObj.LAST = argObj0.LAST;

        search_LIST_3(argObj);
    };

    const search_LIST_CODE = (argData) => {
        var tObj1 = {};
        tObj1.BUYER_CD = "";
        serviceS040102_PURCHASER_INFO.mgrQuery_CODE2(tObj1).then((data) => {
            if (!isMountedRef.current) return;
            if (typeof data.graphQLErrors === "undefined") {
                setDatasEDT_KSV_PO_MRP_FORWARDER(data.PLACE_CD);
                let tObj = data.PLACE_CD.filter(
                    (val) => val.PLACE_CD === argData.PLACE_CD,
                );
                if (tObj.length > 0) {
                    setDataEDT_KSV_PO_MRP_FORWARDER(tObj[0]);
                } else {
                    setDataEDT_KSV_PO_MRP_FORWARDER(data.PLACE_CD[0]);
                }

                setDatasEDT_KSV_PO_MRP_NORMI(data.NORMI);
                tObj = data.NORMI.filter(
                    (val) => val.CD_CODE === argData.NORMI,
                );
                if (tObj.length > 0) {
                    setDataEDT_KSV_PO_MRP_NORMI(tObj[0]);
                } else {
                    setDataEDT_KSV_PO_MRP_NORMI(data.NORMI[0]);
                }

                setDatasEDT_KSV_PO_MRP_TRADE_TERM(data.TRADE_TERM);
                tObj = data.TRADE_TERM.filter(
                    (val) => val.CD_CODE === argData.TRADE_TERM,
                );
                if (tObj.length > 0) {
                    setDataEDT_KSV_PO_MRP_TRADE_TERM(tObj[0]);
                } else {
                    setDataEDT_KSV_PO_MRP_TRADE_TERM(data.TRADE_TERM[0]);
                }

                setDatasEDT_KSV_PO_MRP_CURR_CD(data.CURR_CD);
                tObj = data.CURR_CD.filter(
                    (val) => val.CD_CODE === argData.CURR_CD,
                );
                if (tObj.length > 0) {
                    setDataEDT_KSV_PO_MRP_CURR_CD(tObj[0]);
                } else {
                    setDataEDT_KSV_PO_MRP_CURR_CD(data.CURR_CD[0]);
                }

                setDatasEDT_KSV_PO_MRP_CURR_CD2(data.CURR_CD);
                setDataEDT_KSV_PO_MRP_CURR_CD2(data.CURR_CD[0]);

                setDatasEDT_KSV_PO_MRP_BILL_TO(data.BILL_TYPE);
                tObj = data.BILL_TYPE.filter(
                    (val) => val.CD_CODE === argData.BILL_TO,
                );
                if (tObj.length > 0) {
                    setDataEDT_KSV_PO_MRP_BILL_TO(tObj[0]);
                } else {
                    setDataEDT_KSV_PO_MRP_BILL_TO(data.BILL_TYPE[0]);
                }

                setDatasEDT_KSV_PO_MRP_ORIGIN_PORT(data.ORIGIN_PORT);
                tObj = data.ORIGIN_PORT.filter(
                    (val) => val.CD_CODE === argData.ORIGIN_PORT,
                );
                if (tObj.length > 0) {
                    setDataEDT_KSV_PO_MRP_ORIGIN_PORT(tObj[0]);
                } else {
                    setDataEDT_KSV_PO_MRP_ORIGIN_PORT(data.ORIGIN_PORT[0]);
                }
            } else {
                console.log(
                    "mgrQuery_PO_CD error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_LIST_1 = (argPuCd, argPuStatus) => {
        var tObj0 = { ...dataQRY_KSV_PO_MRP };

        var tObj = {};
        tObj.PU_CD = argPuCd;

        setSelectedTBL_KSV_PO_MRP1([]);
        setLoadingTBL_KSV_PO_MRP1(true);

        // 2_1
        serviceS040102_PURCHASER_INFO.mgrQuery_LIST_1(tObj).then((data) => {
            if (!isMountedRef.current) return;
            setLoadingTBL_KSV_PO_MRP1(false);
            if (typeof data.graphQLErrors === "undefined") {
                var tArray = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    // if (tObj.PU_CD2 !== '') tObj.PU_STATUS = 'Update';
                    // else tObj.PU_STATUS = 'New';
                    return tObj;
                });
                setDatasTBL_KSV_PO_MRP1(tArray);
                setDataTBL_KSV_PO_MRP1(tArray[0]);

                // datasetEDT_KSV_PO_MRP(tArray[0]);
                search_LIST_CODE(tArray[0]);

                var tQryObj3 = { ...tArray[0] };
                tQryObj3.PU_STATUS = argPuStatus;
                /*
            search_LIST_3(tQryObj3);
            */
                search_LIST_PU_MEM(argPuCd, tQryObj3);
            } else {
                console.log(
                    "mgrQuery_PO_CD error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_LIST_PU_MEM = (argPuCd, argQryObj) => {
        var tObj0 = { ...dataQRY_KSV_PO_MRP };

        var tObj = {};
        tObj.PU_CD = argPuCd;

        setSelectedTBL_KSV_PO_MRP0([]);
        setLoadingTBL_KSV_PO_MRP0(true);

        // 2_1
        serviceS040102_PURCHASER_INFO
            .mgrQuery_LIST_PU_MEM(tObj)
            .then((data) => {
            if (!isMountedRef.current) return;
                setLoadingTBL_KSV_PO_MRP0(false);
                if (typeof data.graphQLErrors === "undefined") {
                    var tArray = data.map((col, i) => {
                        var tObj = { ...col };
                        tObj.id = i + 1;
                        return tObj;
                    });
                    var tLastObj = {};
                    if (tArray.length > 0) {
                        // setSelectedTBL_KSV_PO_MRP0(tArray[tArray.length-1]);
                        tLastObj = { ...tArray[tArray.length - 1] };
                        if (tLastObj.PU_SEQ === "W")
                            tLastObj = { ...tArray[tArray.length - 2] };
                    }

                    var tEndObj = {};
                    var tStartObj = {};
                    if (tArray.length > 0) {
                        if (tArray.length === 1) {
                            tEndObj = {};
                            tEndObj.PO_CD = tArray[0].PO_CD;
                            tEndObj.PO_SEQ = tArray[0].PO_SEQ;
                            tStartObj = {};
                            tStartObj.PO_CD = "";
                            tStartObj.PO_SEQ = "";
                        } else {
                            tEndObj = {};
                            tEndObj.PO_CD = tArray[tArray.length - 1].PO_CD;
                            tEndObj.PO_SEQ = tArray[tArray.length - 1].PO_SEQ;
                            tStartObj = {};
                            tStartObj.PO_CD = tArray[tArray.length - 2].PO_CD;
                            tStartObj.PO_SEQ = tArray[tArray.length - 2].PO_SEQ;
                        }
                    }

                    if (typeof argQryObj !== "undefined") {
                        var tQryObj3 = { ...argQryObj };
                        tQryObj3.LAST = "1";
                        tQryObj3.IN_PO_CD = tEndObj.PO_CD;
                        tQryObj3.IN_PO_SEQ = tEndObj.PO_SEQ;
                        tQryObj3.IN_PO_CD2 = tStartObj.PO_CD;
                        tQryObj3.IN_PO_SEQ2 = tStartObj.PO_SEQ;

                        search_LIST_3(tQryObj3, tArray);
                    }
                } else {
                    console.log(
                        "mgrQuery_PO_CD error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const [mailDialogVisible, setMailDialogVisible] = useState(false);
    const [mailDialogTitle, setMailDialogTitle] = useState("");
    const [mailDialogContent, setMailDialogContent] = useState("");

    const search_PURCHASE_REPORT = (kindOfReport) => {
        //alert('메일 전송기능 수정중, 구버전 화면을 이용해주세요.');
        //return;

        // setMailDialogTitle(''); // 제목 초기화
        // setMailDialogContent(''); // 내용 초기화

        setMailInfo({
            ...mailInfo,
            FORWARDER: dataEDT_KSV_PO_MRP_FORWARDER.PLACE_NAME,
            KIND_OF_REPORT: kindOfReport,
        });
        var tInObj = { ...dataTBL_KSV_PO_MRP1 };
        setMailDialogVisible(true);
        //search_PURCHASE_REPORT_IMPORT_NEW();
    };

    const search_PURCHASE_REPORT_IMPORT_NEW = () => {
        var tEditObj = { ...dataEDT_KSV_PO_MRP };

        var tInObj = { ...dataTBL_KSV_PO_MRP1 };
        delete tInObj.id;
        delete tInObj.__typename;
        delete tInObj.PU_STATUS;
        tInObj.ORIGIN_PORT = tEditObj.ORIGIN_PORT;
        tInObj.PLACE_CD = dataEDT_KSV_PO_MRP_FORWARDER.PLACE_CD;
        tInObj.EX_FACTORY = tEditObj.EX_FACTORY;

        var tPuSeq = "1";
        var tInObj1_1 = {};
        if (selectedTBL_KSV_PO_MRP0.length <= 0) {
            if (datasTBL_KSV_PO_MRP0.length > 0) {
                tInObj1_1 = {
                    ...datasTBL_KSV_PO_MRP0[datasTBL_KSV_PO_MRP0.length - 1],
                };
                tPuSeq = tInObj1_1.PU_SEQ;
            }
        } else {
            tInObj1_1 = { ...selectedTBL_KSV_PO_MRP0[0] };
            tPuSeq = tInObj1_1.PU_SEQ;
        }

        var tInObj1_0 = { ...dataEDT_KSV_PO_MRP0 };
        var tInObj1 = {};
        tInObj1.PU_SEQ = String(tPuSeq);
        tInObj1.KIND = "";

        tInObj1.KIND = "ALL";
        if (tInObj1_0.IS_BAL === "1") tInObj1.KIND = "BAL";

        tInObj1.MAIL_TITLE = mailDialogTitle;
        tInObj1.MAIL_BODY = mailDialogContent;
        tInObj1.KIND_OF_REPORT = mailInfo.KIND_OF_REPORT;

        var tInObj2 = [];
        var tInput2 = [];

        var tSaveObj = {};
        var tCheck1 = 0;
        var tCheck2 = 0;
        datasTBL_KSV_PO_MRP2.forEach((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (typeof tObj.id !== "undefined") delete tObj.id;
            tSaveObj = { ...tObj };
            if (typeof tObj.SURCHARGE_AMT === "undefined")
                tObj.SURCHARGE_AMT = "0";
            tObj.PU_CD = tEditObj.PU_CD;

            var tDatas = [...tObj.DATAS];
            var tDatas1 = [];
            var remainPoUpdateQty = parseFloat(tObj.PO_UPDATE_QTY);
            var remainDiffQty = parseFloat(tObj.DIFF_QTY);
            var remainMoqQty = parseFloat(tObj.MOQ_QTY);
            var remainBefPoQty = parseFloat(tObj.BEF_PO_QTY);
            tDatas.forEach((col1, i1) => {
                var tObj2 = { ...col1 };
                if (typeof tObj2.__typename !== "undefined")
                    delete tObj2.__typename;
                if (typeof tObj2.id !== "undefined") delete tObj2.id;

                var tRate = 0;
                if (parseFloat(tObj.PO_QTY) > 0) {
                    tRate = parseFloat(tObj2.PO_QTY) / parseFloat(tObj.PO_QTY);
                }
                var tPoUpdateQty = parseInt(
                    parseFloat(tObj.PO_UPDATE_QTY) * tRate,
                );
                var tDiffQty = parseInt(parseFloat(tObj.DIFF_QTY) * tRate);
                var tMoqQty = parseInt(parseFloat(tObj.MOQ_QTY) * tRate);
                var tBefPoQty = parseInt(parseFloat(tObj.BEF_PO_QTY) * tRate);

                tObj2.PO_UPDATE_QTY = String(tPoUpdateQty);
                tObj2.DIFF_QTY = String(tDiffQty);
                tObj2.MOQ_QTY = String(tMoqQty);
                tObj2.BEF_PO_QTY = String(tBefPoQty);

                remainPoUpdateQty -= tPoUpdateQty;
                remainDiffQty -= tDiffQty;
                remainMoqQty -= tMoqQty;
                remainBefPoQty -= tBefPoQty;

                var tSaveObj = {};
                tSaveObj.MRP_QTY = tObj2.MRP_QTY;
                tSaveObj.STOCK_QTY = tObj2.STOCK_QTY;
                tSaveObj.MOQ_QTY = tObj2.MOQ_QTY;
                tSaveObj.OVER_QTY = tObj2.OVER_QTY;
                tSaveObj.LEFTOVER_QTY = tObj2.LEFTOVER_QTY;
                tSaveObj.BEF_PO_QTY = tObj2.BEF_PO_QTY;
                tSaveObj.PO_QTY = tObj2.PO_QTY;
                tSaveObj.DIFF_QTY = tObj2.DIFF_QTY;
                tSaveObj.PO_UPDATE_QTY = tObj2.PO_UPDATE_QTY;
                tSaveObj.MASTER_PRICE = tObj2.MASTER_PRICE;
                tSaveObj.PO_PRICE = tObj2.PO_PRICE;
                tSaveObj.SURCHARGE_AMT = tObj2.SURCHARGE_AMT;

                // tObj2.SAVE_DATA = { ...tSaveObj };
                tDatas1.push(tObj2);
            });
            tObj.DATAS = [...tDatas1];

            tInput2.push(tObj);
        });

        tInput2.forEach((col1, i1) => {
            var tObj = {};
            // tObj.PO_CD = col1.PO_CD;
            // tObj.PO_SEQ = col1.PO_SEQ;
            tObj.PO_CD = "";
            tObj.PO_SEQ = "";
            tObj.MATL_CD = col1.MATL_CD;
            tObj.MATL_NAME = col1.MATL_NAME;
            tObj.SPEC = col1.SPEC;
            tObj.COLOR = col1.COLOR;
            tObj.UNIT = col1.UNIT;

            tObj.BEF_PO_QTY = col1.BEF_PO_QTY;
            tObj.DIFF_QTY = col1.DIFF_QTY;

            tObj.NEW_PO_QTY = col1.PO_UPDATE_QTY;
            tObj.BAL = col1.DIFF_QTY;
            tObj.CURR_CD = col1.CURR_CD;
            tObj.PO_PRICE = col1.PO_PRICE;
            tObj.SURCHARGE_REMARK = col1.SURCHARGE_REMARK;
            var tArray9 = [];
            col1.DATAS.forEach((col2, i2) => {
                var tObj2 = { ...col2 };
                if (i2 === 0) {
                    tObj.PO_CD = `${col2.PO_CD}`;
                    tObj.PO_SEQ = `${col2.PO_CD},${col2.PO_SEQ}`;
                } else {
                    tObj.PO_CD += `/${col2.PO_CD}`;
                    tObj.PO_SEQ += `/${col2.PO_CD},${col2.PO_SEQ}`;
                }
                tObj.SEQ = col2.PO_SEQ;

                var tSaveObj = {};
                tSaveObj.MRP_QTY = col2.MRP_QTY;
                tSaveObj.STOCK_QTY = col2.STOCK_QTY;
                tSaveObj.MOQ_QTY = col2.MOQ_QTY;
                tSaveObj.OVER_QTY = col2.OVER_QTY;
                tSaveObj.LEFTOVER_QTY = col2.LEFTOVER_QTY;
                tSaveObj.BEF_PO_QTY = col2.BEF_PO_QTY;
                tSaveObj.PO_QTY = col2.PO_QTY;
                tSaveObj.DIFF_QTY = col2.DIFF_QTY;
                tSaveObj.PO_UPDATE_QTY = col2.PO_UPDATE_QTY;
                tSaveObj.MASTER_PRICE = col2.MASTER_PRICE;
                tSaveObj.PO_PRICE = col2.PO_PRICE;
                tSaveObj.SURCHARGE_AMT = col2.SURCHARGE_AMT;

                // tObj2.SAVE_DATA = { ...tSaveObj };
                tArray9.push(tObj2);
            });
            tObj.DATAS = [...tArray9];
            tInObj2.push(tObj);
        });

        setLoadingTBL_KSV_PO_MRP2(true);

        serviceS040102_PURCHASER_INFO
            .mgrQuery_PURCHASE_REPORT_IMPORT_NEW(tInObj, tInObj1, tInObj2)
            .then((data) => {
            if (!isMountedRef.current) return;
                setLoadingTBL_KSV_PO_MRP2(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        if (data[0].CODE.includes("SUCC")) {
                            // alert(data[0].CODE);
                            downloadFile(
                                data[0].CODE.split("?")[2].toString(),
                                data[0].CODE.split("?")[1].toString(),
                            );

                            var tQryObj3 = { ...dataTBL_KSV_PO_MRP1 };
                            tQryObj3.PU_STATUS = "";
                            search_LIST_PU_MEM(tInObj.PU_CD, tQryObj3);
                            // search_LIST_PU_MEM(tInObj.PU_CD);
                        } else {
                            alert(data[0].CODE);
                        }
                    }
                } else {
                    console.log(
                        "mgrQuery_PO_CD error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const downloadFile = async (argFileUrl, argFileName) => {
        serviceLib.downloadFile(argFileUrl, argFileName);
    };

    /////////////
    const process_UPDATE_MEMO = () => {
        var tInObj1 = { ...dataEDT_KSV_PO_MRP };
        var tInObj0 = { ...dataEDT_KSV_PO_MRP0 };

        var tInObj = {};
        tInObj.PU_CD = tInObj1.PU_CD;
        tInObj.MEMO = tInObj0.MEMO;
        if (!tInObj0.MEMO) {
            alert(`메모는 필수입력값 입니다.<br><br>Memo is a required input value.`);
            return;
        }

        serviceS040102_PURCHASER_INFO
            .mgrUpdate_UPDATE_MEMO(tInObj)
            .then((data) => {
            if (!isMountedRef.current) return;
                if (typeof data.graphQLErrors === "undefined") {
                    console.log("mgrInsert_STOCK_IN call => " + data.length);
                    if (data.length > 0) {
                        alert(data[0].CODE);
                    }
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

    const process_UPDATE_DEPOSIT = () => {
        var tInObj0 = { ...dataEDT_KSV_PO_MRP };

        var tInObj = { ...dataEDT_KSV_PO_MRP2 };
        tInObj.PU_CD = tInObj0.PU_CD;

        if (tInObj.AMOUNT === "" || tInObj.AMOUNT === "0") {
            alert("Deposit 금액을 입력해야 합니다<br><br>You must enter the deposit amount");
            return;
        }
        if (tInObj.PAY_BANK === "") {
            alert("은행을 입력해야 합니다<br><br>You must enter your bank");
            return;
        }
        if (tInObj.PAY_DATE === "") {
            alert("지불일을 입력해야 합니다<br><br>Payment date must be entered");
            return;
        }

        setLoadingTBL_KSV_PO_MRP2(true);
        serviceS040102_PURCHASER_INFO.mgrInsert_DEPOSIT(tInObj).then((data) => {
            if (!isMountedRef.current) return;
            setLoadingTBL_KSV_PO_MRP2(false);
            if (typeof data.graphQLErrors === "undefined") {
                console.log("mgrInsert_STOCK_IN call => " + data.length);
                if (data.length > 0) {
                    alert(data[0].CODE);
                    if (data[0].CODE.includes("SUCC")) {
                        var tObj = { ...dataEDT_KSV_PO_MRP0 };
                        tObj.DEPOSIT_CURR = "Req";
                        tObj.DEPOSIT_AMT = tInObj.DEPOSIT_AMOUNT;
                        setDataEDT_KSV_PO_MRP0(tObj);
                        setCreateDialog2(false);
                    }
                }
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

    const process_CANCEL_DEPOSIT = () => {
        var tInObj0 = { ...dataEDT_KSV_PO_MRP };

        var tInObj = { ...dataEDT_KSV_PO_MRP2 };
        tInObj.PU_CD = tInObj0.PU_CD;

        setLoadingTBL_KSV_PO_MRP2(true);
        serviceS040102_PURCHASER_INFO.mgrCancel_DEPOSIT(tInObj).then((data) => {
            if (!isMountedRef.current) return;
            setLoadingTBL_KSV_PO_MRP2(false);
            if (typeof data.graphQLErrors === "undefined") {
                console.log("mgrInsert_STOCK_IN call => " + data.length);
                if (data.length > 0) {
                    alert(data[0].CODE);
                    if (data[0].CODE.includes("SUCC")) {
                        var tObj = { ...dataEDT_KSV_PO_MRP0 };
                        tObj.DEPOSIT_CURR = "";
                        tObj.DEPOSIT_AMT = "";
                        setDataEDT_KSV_PO_MRP0(tObj);
                    }
                }
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

    const process_UPDATE_LC = () => {
        var tInObj0 = { ...dataEDT_KSV_PO_MRP };
        var tInObj = { ...dataEDT_KSV_PO_MRP3 };
        tInObj.PU_CD = tInObj0.PU_CD;

        if (tInObj.PAY_BANK === "") {
            alert("You must enter your bank");
            return;
        }
        if (tInObj.PAY_DATE === "") {
            alert("You must enter a payment date[PAY DATE]");
            return;
        }

        if (selectedTBL_KSV_PO_MRP3.length <= 0) {
            alert("Select the data you want to [LC SET].");
            return;
        }

        var tInObjs = [];
        var tChk = 0;
        var tChk1 = 0;
        selectedTBL_KSV_PO_MRP3.forEach((col, i) => {
            var tObj = {};
            tObj.PO_CD = col.PO_CD;
            tObj.MATL_CD = col.MATL_CD;
            tObj.MATL_NAME = col.MATL_NAME;
            tObj.COLOR = col.COLOR;
            tObj.SPEC = col.SPEC;
            tObj.UNIT = col.UNIT;
            if (parseFloat(col.LC_QTY) > parseFloat(col.PO_QTY)) tChk1 = 1;
            tObj.PO_QTY = col.LC_QTY;
            if (parseFloat(col.LC_QTY) <= 0) tChk = 1;
            tObj.PO_PRICE = col.PO_PRICE;
            tObj.AMOUNT = col.AMOUNT;
            tInObjs.push(tObj);
        });
        if (tChk === 1) {
            alert("LC quantity must be entered greater than 0");
            return;
        }

        setLoadingTBL_KSV_PO_MRP3(true);
        serviceS040102_PURCHASER_INFO
            .mgrInsert_LC(tInObj, tInObjs)
            .then((data) => {
            if (!isMountedRef.current) return;
                if (typeof data.graphQLErrors === "undefined") {
                    console.log("mgrInsert_STOCK_IN call => " + data.length);
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        setLoadingTBL_KSV_PO_MRP3(false);
                        if (data[0].CODE.includes("SUCC")) {
                            var tObj = { ...dataEDT_KSV_PO_MRP0 };
                            tObj.LC_CURR = "Req";
                            tObj.LC_AMT = tInObj.AMOUNT;
                            setDataEDT_KSV_PO_MRP0(tObj);
                            setCreateDialog3(false);
                        }
                    }
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

    const process_CANCEL_LC = () => {
        var tInObj0 = { ...dataEDT_KSV_PO_MRP };
        var tInObj = { ...dataEDT_KSV_PO_MRP3 };
        tInObj.PU_CD = tInObj0.PU_CD;

        setLoadingTBL_KSV_PO_MRP2(true);
        serviceS040102_PURCHASER_INFO.mgrCancel_LC(tInObj).then((data) => {
            if (!isMountedRef.current) return;
            setLoadingTBL_KSV_PO_MRP2(false);
            if (typeof data.graphQLErrors === "undefined") {
                console.log("mgrInsert_STOCK_IN call => " + data.length);
                if (data.length > 0) {
                    alert(data[0].CODE);
                    if (data[0].CODE.includes("SUCC")) {
                        var tObj = { ...dataEDT_KSV_PO_MRP0 };
                        tObj.LC_CURR = "";
                        tObj.LC_AMT = "";
                        setDataEDT_KSV_PO_MRP0(tObj);
                    }
                }
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

    const process_MOQ_CONFIRM = () => {
        var tInput2 = [];
        var tObjs = datasTBL_KSV_PO_MRP4.forEach((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (typeof tObj.id !== "undefined") delete tObj.id;
            tInput2.push(tObj);
        });

        setLoadingTBL_KSV_PO_MRP4(true);
        serviceS040102_PURCHASER_INFO
            .mgrUpdate_MOQ_CONFIRM(tInput2)
            .then((data) => {
            if (!isMountedRef.current) return;
                setLoadingTBL_KSV_PO_MRP4(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            search_LIST_3({});
                        }
                    }
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

    const process_MOQ_CANCEL = () => {
        var tInput2 = [];
        var tObjs = datasTBL_KSV_PO_MRP4.forEach((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (typeof tObj.id !== "undefined") delete tObj.id;
            tInput2.push(tObj);
        });

        setLoadingTBL_KSV_PO_MRP4(true);
        serviceS040102_PURCHASER_INFO
            .mgrUpdate_MOQ_CANCEL(tInput2)
            .then((data) => {
            if (!isMountedRef.current) return;
                setLoadingTBL_KSV_PO_MRP4(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            search_LIST_3({});
                        }
                    }
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

    const process_INSERT_PU_MST_1 = async () => {
        var tInput = { ...dataEDT_KSV_PO_MRP };

        if (!tInput.NORMI || !tInput.BILL_TO) {
            alert(
                `Normi, Bill to가 입력되지 않았습니다(${tInput.NORMI}/${tInput.BILL_TO})`,
            );
            return;
        }

        if (tInput.CURR_CD === null) tInput.CURR_CD = "USD";
        if (typeof tInput.CURR_CD === "undefined") tInput.CURR_CD = "USD";

        if (dataEDT_KSV_PO_MRP.VENDOR_TYPE === "FACTORY") {
        } else {
            if (
                typeof tInput.FORWARDER !== "undefined" &&
                tInput.FORWARDER !== ""
            ) {
            } else {
            }
        }

        var tInput1 = [];
        var tIdx9 = 0;
        for (tIdx9 = 1; tIdx9 < 7; tIdx9++) {
            if (tInput[`PO_CD${tIdx9}`] !== "") {
                var tObj99 = {};
                tObj99.PO_CD = tInput[`PO_CD${tIdx9}`];
                tInput1.push(tObj99);
            }
        }

        var tInput2 = [];
        // var tObjs = selectedTBL_KSV_PO_MRP2.forEach((col, i) => {
        var tCheck1 = 0;
        var tCheck2 = 0;
        var tCheck3 = 0;

        var tSaveObj = {};
        var tObjs = datasTBL_KSV_PO_MRP2.forEach((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (typeof tObj.id !== "undefined") delete tObj.id;

            if (
                typeof tSaveObj.CURR_CD !== "undefined" &&
                tSaveObj.CURR_CD !== tObj.CURR_CD
            ) {
                tCheck1 = 1;
            }

            if (tInput.CURR_CD !== tObj.CURR_CD) tCheck3 = 1;

            tSaveObj = { ...tObj };

            if (
                parseFloat(tObj.MASTER_PRICE) <= 0 &&
                tInput.ORDER_DATE !== "" &&
                col.PU_STATUS !== "FullIn"
            ) {
                if (parseFloat(tObj.PO_QTY) > 0) tCheck2 = 1;
            }

            if (typeof tObj.SURCHARGE_AMT === "undefined")
                tObj.SURCHARGE_AMT = "0";
            tObj.PU_CD = tInput.PU_CD;

            var tDatas = [...tObj.DATAS];
            var tDatas1 = [];
            var remainPoUpdateQty = parseFloat(tObj.PO_UPDATE_QTY);
            var remainDiffQty = parseFloat(tObj.DIFF_QTY);
            var remainMoqQty = parseFloat(tObj.MOQ_QTY);

            var oldMoqQty = 0;
            tDatas.forEach((col1, i1) => {
                var tObj2 = { ...col1 };
                oldMoqQty += parseFloat(parseFloat(tObj2.MOQ_QTY).toFixed(2));
            });
            var chkMoqCalc = 0;
            if (oldMoqQty > remainMoqQty) chkMoqCalc = 1;

            tDatas.forEach((col1, i1) => {
                var tObj2 = { ...col1 };
                if (typeof tObj2.__typename !== "undefined")
                    delete tObj2.__typename;
                if (typeof tObj2.id !== "undefined") delete tObj2.id;

                var tRate = 0;
                if (parseFloat(tObj.PO_QTY) > 0) {
                    tRate = parseFloat(tObj2.PO_QTY) / parseFloat(tObj.PO_QTY);
                }

                var tPoUpdateQty = 0;
                var tDiffQty = 0;
                var tMoqQty = 0;

                if (chkMoqCalc > 0) {
                    // moq 수량 감소:  비율대로 minus
                    if (i1 !== tDatas.length - 1) {
                        if (tObj2.PU_STATUS === "FullIn") {
                            tPoUpdateQty = parseInt(tObj2.PO_QTY);
                            tDiffQty = parseInt(0);
                            tMoqQty = parseInt(Obj2.MOQ_QTY);
                        } else {
                            tPoUpdateQty = parseInt(
                                parseFloat(tObj.PO_UPDATE_QTY) * tRate,
                            );
                            tDiffQty = parseInt(
                                parseFloat(tObj.DIFF_QTY) * tRate,
                            );
                            tMoqQty = parseInt(
                                parseFloat(tObj.MOQ_QTY) * tRate,
                            );
                        }
                    } else {
                        tPoUpdateQty = parseInt(remainPoUpdateQty);
                        tDiffQty = parseInt(remainDiffQty);
                        tMoqQty = parseInt(remainMoqQty);
                    }
                } else {
                    if (i1 !== tDatas.length - 1) {
                        if (tObj2.PU_STATUS === "FullIn") {
                            tPoUpdateQty = parseInt(tObj2.PO_QTY);
                            tDiffQty = parseFloat(0);
                            tMoqQty = parseInt(tObj2.MOQ_QTY);
                        } else {
                            tPoUpdateQty = parseInt(
                                parseFloat(tObj.PO_UPDATE_QTY) * tRate,
                            );
                            tDiffQty = parseInt(
                                parseFloat(tObj.DIFF_QTY) * tRate,
                            );
                            tMoqQty = parseInt(tObj2.MOQ_QTY);
                        }
                    } else {
                        tPoUpdateQty = parseInt(remainPoUpdateQty);
                        tDiffQty = parseInt(remainDiffQty);
                        tMoqQty = parseInt(remainMoqQty);
                    }
                }

                tObj2.PO_UPDATE_QTY = String(tPoUpdateQty);
                tObj2.DIFF_QTY = String(tDiffQty);
                tObj2.MOQ_QTY = String(tMoqQty);

                remainPoUpdateQty -= tPoUpdateQty;
                remainDiffQty -= tDiffQty;
                remainMoqQty -= tMoqQty;

                var tSaveObj = {};
                tSaveObj.MRP_QTY = tObj2.MRP_QTY;
                tSaveObj.STOCK_QTY = tObj2.STOCK_QTY;
                tSaveObj.MOQ_QTY = tObj2.MOQ_QTY;
                tSaveObj.OVER_QTY = tObj2.OVER_QTY;
                tSaveObj.LEFTOVER_QTY = tObj2.LEFTOVER_QTY;
                tSaveObj.BEF_PO_QTY = tObj2.BEF_PO_QTY;
                tSaveObj.PO_QTY = tObj2.PO_QTY;
                tSaveObj.DIFF_QTY = tObj2.DIFF_QTY;
                tSaveObj.PO_UPDATE_QTY = tObj2.PO_UPDATE_QTY;
                tSaveObj.MASTER_PRICE = tObj2.MASTER_PRICE;
                tSaveObj.PO_PRICE = tObj2.PO_PRICE;
                tSaveObj.SURCHARGE_AMT = tObj2.SURCHARGE_AMT;

                // tObj2.SAVE_DATA = { ...tSaveObj };
                tDatas1.push(tObj2);
            });
            tObj.DATAS = [...tDatas1];

            tInput2.push(tObj);
        });

        if (tCheck1 === 1) {
            alert("Only identical Curr can be saved.");
            return;
        }

        if (tCheck2 === 1 && tInput.VENDOR_TYPE !== "BUYER") {
            alert(
                "Order Date가 입력되는 경우 Master Price는 0보다 커야 합니다",
            );
            return;
        }

        // Price Update Check
        var tResultArray = [];
        var tSaveArray = JSON.parse(sessionStorage.getItem("S040102_LIST_3"));
        selectedTBL_KSV_PO_MRP2.forEach((col2, i2) => {
            tSaveArray.forEach((col3, i3) => {
                if (col2.MATL_CD === col3.MATL_CD) {
                    console.log(
                        `Price Compare: ${col2.MASTER_PRICE}/${col3.MASTER_PRICE} `,
                    );
                    if (
                        parseFloat(col2.MASTER_PRICE) !==
                        parseFloat(col3.MASTER_PRICE)
                    ) {
                        var tObj3 = { ...col2 };
                        tResultArray.push(tObj3);
                    }
                }
            });
        });
        if (tResultArray.length > 0) {
            var updateReason = await prompt(
                "Please enter a reason for Price Update",
            );
            setSaveBatchReason(updateReason);
        }

        setLoadingTBL_KSV_PO_MRP2(true);
        serviceS040102_PURCHASER_INFO
            .mgrInsert_PU_MST_1(tInput, tInput1, tInput2)
            .then((data) => {
            if (!isMountedRef.current) return;
                setLoadingTBL_KSV_PO_MRP2(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) alert(data[0].CODE);
                    if (data[0].CODE.includes("SUCC")) {
                        if (selectedTBL_KSV_PO_MRP2.length > 0) {
                            priceUpdate_inline();
                        } else {
                            setSelectedTBL_KSV_PO_MRP2([]);

                            var tPuCd = dataEDT_KSV_PO_MRP.PU_CD;
                            var tPuStatus = dataEDT_KSV_PO_MRP.PU_STATUS;
                            if (!dataEDT_KSV_PO_MRP.ORDER_DATE);
                            else {
                                if (tPuStatus === "Registed")
                                    tPuStatus = "Ordered";
                            }
                            search_LIST_1(tPuCd, tPuStatus);
                        }
                    } else {
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

    const process_DELETE_PU_MST = () => {
        var tEdit = { ...dataEDT_KSV_PO_MRP };

        var tInput = {};
        tInput.PU_CD = tEdit.PU_CD;

        setLoadingTBL_KSV_PO_MRP2(true);
        serviceS040102_PURCHASER_INFO.mgrDelete_PU_MST(tInput).then((data) => {
            if (!isMountedRef.current) return;
            setLoadingTBL_KSV_PO_MRP2(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) alert(data[0].CODE);
                if (data[0].CODE.includes("SUCC")) {
                    setDataEDT_KSV_PO_MRP(emptyEDT_KSV_PO_MRP);
                    setDatasTBL_KSV_PO_MRP2([]);
                    setDatasTBL_KSV_PO_MRP0([]);
                }
            } else {
                alert(JSON.stringify(data.graphQLErrors));
                // console.log("mgrQuery_PO_CD error => " + JSON.stringify(data.graphQLErrors));
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

    const [datasQRY_KSV_PO_MRP_BUYER_CD, setDatasQRY_KSV_PO_MRP_BUYER_CD] =
        useState([]);
    const [dataQRY_KSV_PO_MRP_BUYER_CD, setDataQRY_KSV_PO_MRP_BUYER_CD] =
        useState({});

    const [
        datasQRY_KSV_PO_MRP_VENDOR_TYPE,
        setDatasQRY_KSV_PO_MRP_VENDOR_TYPE,
    ] = useState([]);
    const [dataQRY_KSV_PO_MRP_VENDOR_TYPE, setDataQRY_KSV_PO_MRP_VENDOR_TYPE] =
        useState({});

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

    /**TABLE KSV_ORDER_MEM */
    // DEFINE DATAGRID : TBL_KSV_ORDER_MEM
    const [datasTBL_KSV_ORDER_MEM, setDatasTBL_KSV_ORDER_MEM] = useState([]);
    const dt_TBL_KSV_ORDER_MEM = useRef(null);
    const [dataTBL_KSV_ORDER_MEM, setDataTBL_KSV_ORDER_MEM] = useState(
        emptyTBL_KSV_ORDER_MEM,
    );
    const [selectedTBL_KSV_ORDER_MEM, setSelectedTBL_KSV_ORDER_MEM] = useState(
        [],
    );
    const [
        flagSelectModeTBL_KSV_ORDER_MEM,
        setFlagSelectModeTBL_KSV_ORDER_MEM,
    ] = useState(false);
    const [loadingTBL_KSV_ORDER_MEM, setLoadingTBL_KSV_ORDER_MEM] =
        useState(false);
    const [datasCANCEL_REASON, setDatasCANCEL_REASON] = useState([]);

    const onRowClick1TBL_KSV_ORDER_MEM = (argData0) => {
        var argData = {};
        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }
    };

    const onRowClickTBL_KSV_ORDER_MEM = (event) => {
        var argData = { ...event.data };
    };

    /* TBL_KSV_PO_MST */
    // DEFINE DATAGRID : TBL_KSV_PO_MST
    const [loadingTBL_KSV_PO_MST, setLoadingTBL_KSV_PO_MST] = useState(false);
    const [datasTBL_KSV_PO_MST, setDatasTBL_KSV_PO_MST] = useState([]);
    const dt_TBL_KSV_PO_MST = useRef(null);
    const [dataTBL_KSV_PO_MST, setDataTBL_KSV_PO_MST] =
        useState(emptyTBL_KSV_PO_MST);
    const [selectedTBL_KSV_PO_MST, setSelectedTBL_KSV_PO_MST] = useState([]);
    const [flagSelectModeTBL_KSV_PO_MST, setFlagSelectModeTBL_KSV_PO_MST] =
        useState(false);

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

    const [dataKSV_PU_MST, setDataKSV_PU_MST] = useState({});
    const [dataKCD_FILEINFO, setDataKCD_FILEINFO] = useState({});

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

    /* TABLE KSV_PO_MRP*/
    // DEFINE DATAGRID : TBL_KSV_PO_MRP2
    const [loadingTBL_KSV_PO_MRP2, setLoadingTBL_KSV_PO_MRP2] = useState(false);

    const [saveTBL_KSV_PO_MRP2, setSaveTBL_KSV_PO_MRP2] = useState([]);
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
            if (argData0.length <= 0) return;
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_PO_MRP2 = argData;

        setDataTBL_KSV_PO_MRP2(argTBL_KSV_PO_MRP2);

        const nextCurrCd2 = argData.CURR_CD;
        setDataEDT_KSV_PO_MRP((prev) => ({
            ...prev,
            CURR_CD2: nextCurrCd2,
        }));

        editEDT_KSV_PO_MRP_CURR_CD2(nextCurrCd2);
    };

    const onRowDoubleClickTBL_KSV_PO_MRP2 = (argData0) => {
        var tRemark = "";
        var tColName = "";
        var tKeys = Object.keys(argData0.data);
        var tEventValue = argData0.originalEvent.target.innerText;
        var tIdx = 0;
        for (tIdx = 0; tIdx < tKeys.length; tIdx++) {
            var col = tKeys[tIdx];
            var tValue = argData0.data[`${col}`];
            if (!tValue);
            else {
                if (!tEventValue);
                else {
                    if (typeof tValue === "string") {
                        if (tValue.trim() === tEventValue.trim()) {
                            tColName = col;
                            break;
                        }
                    }
                }
            }
        }
        if (tColName === "MATL_CD") {
            var tObj = {};
            if (!tEventValue);
            else {
                tObj.MATL_CD = tEventValue;
                popup_MATL_MST(tObj);
            }
        } else if (tColName === "MATL_NAME") {
            var tInObj = { ...argData0 };

            var tPoCd = dataEDT_KSV_PO_MRP.PO_CD1;
            tInObj.PO_CD = tPoCd;
            tInObj.VENDOR_CD = dataEDT_KSV_PO_MRP.VENDOR_CD;
            search_REVISE(tInObj);
        } else {
            var tStockQty = parseFloat(argData0.data.STOCK_QTY);
            if (tStockQty > 0) {
                search_STOCK(argData0.data);
            }
            if (tStockQty > 0 && argData0.data.PU_STATUS !== "FullIn") {
                search_STOCK(argData0.data);
            }
        }
    };

    const exportExcelTBL_KSV_PO_MRP2 = () => {
        var tArray = [];
        datasTBL_KSV_PO_MRP2.forEach((col, i) => {
            var tObj = {};
            tObj.id = col.id;
            tObj.Status = col.PU_STATUS;
            tObj.PO = col.PO_CD;
            tObj.PO_Seq = col.PO_SEQ;
            tObj.Matl = col.MATL_CD;
            tObj.Desc = col.MATL_NAME;
            tObj.Color = col.COLOR;
            tObj.Spec = col.SPEC;
            tObj.Unit = col.UNIT;
            tObj.MRP_QTY = parseFloat(col.MRP_QTY);
            tObj.STOCK_QTY = parseFloat(col.STOCK_QTY);
            tObj.MOQ_QTY = parseFloat(col.MOQ_QTY);
            tObj.PO_QTY = parseFloat(col.PO_QTY);
            tObj.DIFF_QTY = parseFloat(col.DIFF_QTY);
            tObj.PO_UPDATE_QTY = parseFloat(col.PO_UPDATE_QTY);
            tObj.CURR_CD = col.CURR_CD;
            tObj.MASTER_PRICE = parseFloat(col.MASTER_PRICE);
            tObj.SURCHARGE_PRICE = parseFloat(col.SURCHARGE_PRICE);
            tObj.PO_PRICE = parseFloat(col.PO_PRICE);
            tObj.SURCHARGE_AMT = parseFloat(col.SURCHARGE_AMT);
            tObj.SURCHARGE_REMARK = col.SURCHARGE_REMARK;
            tObj.MIN_CONF_USER = col.MIN_CONF_USER;
            tArray.push(tObj);
        });

        import("xlsx").then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(tArray);
            const workbook = {
                Sheets: { data: worksheet },
                SheetNames: ["data"],
            };
            const excelBuffer = xlsx.write(workbook, {
                bookType: "xlsx",
                type: "array",
            });
            saveAsExcelFileTBL_KSV_PO_MRP2(excelBuffer, "Purchase List");
        });
    };

    const saveAsExcelFileTBL_KSV_PO_MRP2 = (buffer, fileName) => {
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

    const onCellEditCompleteKSV_PO_MRP2 = (e) => {
        let { rowData, newValue, field, originalEvent: event } = e;

        if (rowData.PU_STATUS === "FullIn") return;

        var tOldAmt =
            parseFloat(rowData["PO_QTY"]) * parseFloat(rowData["PO_PRICE"]);

        if (field === "PO_UPDATE_QTY") {
            rowData[field] = String(
                serviceLib.getFloat(parseFloat(newValue), 2),
            );

            var tMrpQty = parseFloat(rowData.MRP_QTY);
            var tPoQty = parseFloat(rowData.PO_QTY);
            var tBefPoQty = parseFloat(rowData.BEF_PO_QTY);
            var tStockQty = parseFloat(rowData.STOCK_QTY);
            var tOverQty = parseFloat(rowData.OVER_QTY);
            var tOldDiffQty = parseFloat(rowData.DIFF_QTY);
            var tNewQty = parseFloat(newValue);
            var tMoqQty = 0;

            var tOrgPoQty = tMrpQty - tStockQty + tOverQty;
            if (tNewQty > tOrgPoQty) tMoqQty = tNewQty - tOrgPoQty;
            else tMoqQty = 0;
            rowData.MOQ_QTY = String(serviceLib.getFloat(tMoqQty, 2));

            var tDiffQty = tNewQty - tBefPoQty;
            rowData.DIFF_QTY = String(serviceLib.getFloat(tDiffQty, 2));

            var tSurAmt = parseFloat(rowData.SURCHARGE_AMT);
            if (tSurAmt > 0) {
                var tSurPrice = serviceLib.getFloat(tSurAmt / tNewQty, 4);
                var tMasterPrice = parseFloat(rowData.MASTER_PRICE);
                var tPoPrice = tMasterPrice + tSurPrice;

                rowData.SURCHARGE_AMT = String(tSurAmt);
                rowData.SURCHARGE_PRICE = String(tSurPrice);
                rowData.PO_PRICE = String(tPoPrice);
            }
        }
        if (field === "SURCHARGE_AMT") {
            var tPoUpdateQty = parseFloat(rowData.PO_UPDATE_QTY);
            if (tPoUpdateQty === 0) return;

            rowData[field] = String(
                serviceLib.getFloat(parseFloat(newValue), 2),
            );
            var tMasterPrice = parseFloat(rowData.MASTER_PRICE);
            var tSurAmt = parseFloat(rowData.SURCHARGE_AMT);
            var tSurPrice = 0;
            if (tPoUpdateQty > 0)
                tSurPrice = serviceLib.getFloat(tSurAmt / tPoUpdateQty, 4);
            var tPoPrice = tMasterPrice + tSurPrice;

            rowData.SURCHARGE_AMT = String(tSurAmt);
            rowData.SURCHARGE_PRICE = String(tSurPrice);
            rowData.PO_PRICE = String(tPoPrice);
        }

        console.log(newValue);
        if (field === "SURCHARGE_REMARK" || field === "MASTER_PRICE") {
            rowData[field] = newValue;
        }

        var tNewAmt =
            parseFloat(rowData["PO_UPDATE_QTY"]) *
            parseFloat(rowData["PO_PRICE"]);
        var tDiffAmt = tNewAmt - tOldAmt;

        var tEditObj = { ...dataEDT_KSV_PO_MRP };
        var tPayAmt = parseFloat(tEditObj.PAY_AMT) + tDiffAmt;
        tEditObj.PAY_AMT = String(serviceLib.numToFixed(tPayAmt));
        setDataEDT_KSV_PO_MRP(tEditObj);

        var tEditObj0 = { ...dataEDT_KSV_PO_MRP0 };
        tEditObj0.TT_AMT = String(serviceLib.numToFixed(tPayAmt, 2));
        setDataEDT_KSV_PO_MRP0(tEditObj0);

        // var _dataTBL_KSV_PO_MRP2 = { ...dataTBL_KSV_PO_MRP2 };
        // setDataTBL_KSV_PO_MRP2(rowData);
    };

    const cellEditorKSV_PO_MRP2 = (options) => {
        if (options.field === "SURCHARGE_REMARK")
            return textEditorText(options);
        else if (options.field === "SURCHARGE_AMT")
            return textEditorNum(options);
        else return textEditorPNum(options);
    };

    const dropboxEditor1 = (options) => {
        return (
            <Dropdown
                appendTo={"self"}
                style={{ width: "9rem" }}
                value={options.value}
                onChange={(e) => {
                    console.log(e);
                    console.log("-------OnChange Dropdown", e.value);
                    options.editorCallback(e.value);
                }}
                options={datasCANCEL_REASON}
                optionLabel="CD_NAME"
                optionValue="CD_NAME"
                placeholder="Select"
            />
        );
    };

    const onCellEditCompleteKSV_ORDER_MEM = (e) => {
        let { rowData, newValue, field, originalEvent: event } = e;
        // let { rowData, newValue, field } = e;

        const updatedRow = { ...rowData };
        updatedRow[field] = newValue;
        console.log(
            "Field:",
            field,
            "Old Value:",
            rowData[field],
            "New Value:",
            newValue,
        );

        if (rowData[field] === newValue) {
            // e.preventDefault();
            return;
        }

        if (field === "CANCEL_QTY") {
            updatedRow.CANCEL_QTY = newValue;
            const updatedData = datasTBL_KSV_ORDER_MEM.map((row) =>
                row.id === updatedRow.id ? updatedRow : row,
            );
            const updatedDataSel = selectedTBL_KSV_ORDER_MEM.map((row) =>
                row.id === updatedRow.id ? updatedRow : row,
            );
            setDatasTBL_KSV_ORDER_MEM(updatedData);
            setSelectedTBL_KSV_ORDER_MEM(updatedDataSel);
            // rowData[field] = String(serviceLib.getFloat(parseFloat(newValue), 2));
        } else if (field === "CANCEL_REASON") {
            updatedRow.CANCEL_REASON = newValue;

            const updatedData = datasTBL_KSV_ORDER_MEM.map((row) =>
                row.id === updatedRow.id ? updatedRow : row,
            );
            const updatedDataSel = selectedTBL_KSV_ORDER_MEM.map((row) =>
                row.id === updatedRow.id ? updatedRow : row,
            );
            console.log("Stock List(Sel)", updatedDataSel);
            setDatasTBL_KSV_ORDER_MEM(updatedData);
            setSelectedTBL_KSV_ORDER_MEM(updatedDataSel);
        } else {
            e.preventDefault();
        }
    };

    const onCellEditCompleteKSV_PO_MRP3 = (e) => {
        let { rowData, newValue, field, originalEvent: event } = e;

        const updatedRow = { ...rowData };

        updatedRow[field] = newValue;
        console.log(
            "Field:",
            field,
            "Old Value:",
            rowData[field],
            "New Value:",
            newValue,
        );

        if (field === "LC_QTY") {
            updatedRow.LC_QTY = newValue;

            var tAmount =
                parseFloat(updatedRow.PO_PRICE) * parseFloat(updatedRow.LC_QTY);
            tAmount = tAmount.toFixed(2);

            updatedRow.AMOUNT = tAmount;

            console.log(`==> ${updatedRow.LC_QTY}/${updatedRow.AMOUNT}`);

            const updatedData = datasTBL_KSV_PO_MRP3.map((row) =>
                row.id === updatedRow.id ? updatedRow : row,
            );
            const updatedDataSel = selectedTBL_KSV_PO_MRP3.map((row) =>
                row.id === updatedRow.id ? updatedRow : row,
            );

            console.log(`==> ${updatedData.LC_QTY}/${updatedData.AMOUNT}`);
            setDatasTBL_KSV_PO_MRP3(updatedData);
            setSelectedTBL_KSV_PO_MRP3(updatedDataSel);

            var sumAmount = 0;
            selectedTBL_KSV_PO_MRP3.forEach((col2, i2) => {
                if (col2.MATL_CD === updatedRow.MATL_CD)
                    sumAmount += parseFloat(tAmount);
                else sumAmount += parseFloat(col2.AMOUNT);
            });

            var tmpEdit = { ...dataEDT_KSV_PO_MRP3 };
            tmpEdit.AMOUNT = parseFloat(sumAmount).toFixed(2);
            setDataEDT_KSV_PO_MRP3(tmpEdit);
        } else {
            e.preventDefault();
        }
    };

    const cellEditorKSV_ORDER_MEM = (options) => {
        if (options.field === "CANCEL_REASON") return dropboxEditor1(options);
        else return textEditorPNum(options);
    };

    const cellEditorKSV_PO_MRP3 = (options) => {
        if (options.field === "CANCEL_REASON") return dropboxEditor1(options);
        else return textEditorPNum(options);
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

    const textEditorPNum = (options) => {
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
    const textEditorNum = (options) => {
        return (
            <InputText
                type="text"
                keyfilter="num"
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

    // DEFINE DATAGRID : TBL_KSV_PO_MRP4
    const [loadingTBL_KSV_PO_MRP4, setLoadingTBL_KSV_PO_MRP4] = useState(false);

    const [datasTBL_KSV_PO_MRP4, setDatasTBL_KSV_PO_MRP4] = useState([]);
    const dt_TBL_KSV_PO_MRP4 = useRef(null);
    const [dataTBL_KSV_PO_MRP4, setDataTBL_KSV_PO_MRP4] =
        useState(emptyTBL_KSV_PO_MRP4);
    const [selectedTBL_KSV_PO_MRP4, setSelectedTBL_KSV_PO_MRP4] = useState([]);
    const [flagSelectModeTBL_KSV_PO_MRP4, setFlagSelectModeTBL_KSV_PO_MRP4] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_PO_MRP4

    const onRowClick1TBL_KSV_PO_MRP4 = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_PO_MRP4 = argData;

        setDataTBL_KSV_PO_MRP4(argTBL_KSV_PO_MRP4);
    };

    const onRowClickTBL_KSV_PO_MRP4 = (event) => {
        let argTBL_KSV_PO_MRP4 = event.data;
        if (flagSelectModeTBL_KSV_PO_MRP4) return;

        // Service : NawooAll:mgrQueryTBL_KSV_PO_MRP4
    };

    /* QRY KSV_PO_MRP*/
    const [dataEDT_KSV_PO_MRP0, setDataEDT_KSV_PO_MRP0] =
        useState(emptyEDT_KSV_PO_MRP0);

    const onInputChangeEDT_KSV_PO_MRP0 = (e, name) => {
        serviceLib.handleInputChange(
            e,
            name,
            dataEDT_KSV_PO_MRP0,
            setDataEDT_KSV_PO_MRP0,
        );
    };

    /* QRY KSV_PO_MRP*/
    const [dataEDT_KSV_PO_MRP, setDataEDT_KSV_PO_MRP] =
        useState(emptyEDT_KSV_PO_MRP);

    // Stock Apply 추가
    /* QRY KCD_MATL_MST*/
    const [dataQRY_KCD_MATL_MST, setDataQRY_KCD_MATL_MST] = useState(
        emptyQRY_KCD_MATL_MST,
    );

    const resetQRY_KCD_MATL_MST = () => {
        setDataQRY_KCD_MATL_MST(emptyQRY_KCD_MATL_MST);
        setDataQRY_KCD_MATL_MST_FACTORY_CD(datasQRY_KCD_MATL_MST_FACTORY_CD[0]);
        setDataQRY_KCD_MATL_MST_MATL_KIND2(datasQRY_KCD_MATL_MST_MATL_KIND2[0]);
        setDataQRY_KCD_MATL_MST_STATUS_CD(datasQRY_KCD_MATL_MST_STATUS_CD[0]);
    };

    const onInputChangeQRY_KCD_MATL_MST = (e, name) => {
        serviceLib.handleInputChange(
            e,
            name,
            dataQRY_KCD_MATL_MST,
            setDataQRY_KCD_MATL_MST,
        );
    };

    const onDropdownChangeQRY_KCD_MATL_MST = (e, name) => {
        const dropdownMeta = {
            FACTORY_CD: {
                key: "FACTORY_CD",
                setter: setDataQRY_KCD_MATL_MST_FACTORY_CD,
            },
            MATL_KIND2: {
                key: "SEQ",
                setter: setDataQRY_KCD_MATL_MST_MATL_KIND2,
            },
            STATUS_CD: {
                key: "CD_CODE",
                setter: setDataQRY_KCD_MATL_MST_STATUS_CD,
            },
        };

        const meta = dropdownMeta[name] || {
            key: "CD_CODE",
            setter: undefined,
        };

        serviceLib.handleDropdownChangeByKey(
            e,
            name,
            dataQRY_KCD_MATL_MST,
            setDataQRY_KCD_MATL_MST,
            meta.setter,
            meta.key,
        );
    };

    const [
        datasQRY_KCD_MATL_MST_FACTORY_CD,
        setDatasQRY_KCD_MATL_MST_FACTORY_CD,
    ] = useState([]);
    const [
        dataQRY_KCD_MATL_MST_FACTORY_CD,
        setDataQRY_KCD_MATL_MST_FACTORY_CD,
    ] = useState({});

    const [
        datasQRY_KCD_MATL_MST_VENDOR_CD,
        setDatasQRY_KCD_MATL_MST_VENDOR_CD,
    ] = useState([]);
    const [dataQRY_KCD_MATL_MST_VENDOR_CD, setDataQRY_KCD_MATL_MST_VENDOR_CD] =
        useState({});

    const [
        datasQRY_KCD_MATL_MST_MATL_KIND2,
        setDatasQRY_KCD_MATL_MST_MATL_KIND2,
    ] = useState([]);
    const [
        dataQRY_KCD_MATL_MST_MATL_KIND2,
        setDataQRY_KCD_MATL_MST_MATL_KIND2,
    ] = useState({});

    const [
        datasQRY_KCD_MATL_MST_STATUS_CD,
        setDatasQRY_KCD_MATL_MST_STATUS_CD,
    ] = useState([]);
    const [dataQRY_KCD_MATL_MST_STATUS_CD, setDataQRY_KCD_MATL_MST_STATUS_CD] =
        useState({});

    /**TABLE KCD_MATL_MST */
    // DEFINE DATAGRID : TBL_KCD_MATL_MST
    const [datasTBL_KCD_MATL_MST, setDatasTBL_KCD_MATL_MST] = useState([]);
    const dt_TBL_KCD_MATL_MST = useRef(null);
    const [dataTBL_KCD_MATL_MST, setDataTBL_KCD_MATL_MST] = useState(
        emptyTBL_KCD_MATL_MST,
    );
    const [selectedTBL_KCD_MATL_MST, setSelectedTBL_KCD_MATL_MST] = useState(
        [],
    );
    const [flagSelectModeTBL_KCD_MATL_MST, setFlagSelectModeTBL_KCD_MATL_MST] =
        useState(false);
    const [loadingTBL_KCD_MATL_MST, setLoadingTBL_KCD_MATL_MST] =
        useState(false);

    // DATAGRID CODE : TBL_KCD_MATL_MST

    const onSelectionChangeTBL_KCD_MATL_MST = (event) => {
        var tTotal = 0;
        datasTBL_KSV_PO_MRP5.forEach((col, i) => {
            tTotal += parseFloat(col.PO_UPDATE_QTY);
        });

        var tArray = [];
        var tSelArray = [];
        var tSumCnt = tTotal;
        datasTBL_KCD_MATL_MST.forEach((col, i) => {
            var tObj1 = { ...col };
            var tFlag = 0;
            event.value.forEach((col1, i1) => {
                var tObj = { ...col1 };
                if (
                    tFlag === 0 &&
                    tObj.MATL_CD === col.MATL_CD &&
                    tObj.REMAIN_QTY === col.REMAIN_QTY
                ) {
                    if (parseFloat(tObj.REMAIN_QTY) < tSumCnt) {
                        tObj.USE_QTY = tObj.REMAIN_QTY;
                        tSumCnt -= parseFloat(tObj.USE_QTY);
                    } else {
                        var tQty = parseFloat(tObj.REMAIN_QTY) - tSumCnt;
                        tObj.USE_QTY = String(tSumCnt);
                        tSumCnt = 0;
                    }
                    tArray.push(tObj);
                    tSelArray.push(tObj);
                    tFlag = 1;
                }
            });
            if (tFlag === 0) tArray.push(tObj1);
        });
        setDatasTBL_KCD_MATL_MST(tArray);
        setSelectedTBL_KCD_MATL_MST(tSelArray);
    };

    const onRowClickTBL_KCD_MATL_MST = (event) => {
        let argTBL_KCD_MATL_MST = event.data;
        if (flagSelectModeTBL_KCD_MATL_MST) return;

        // Service : NawooAll:mgrQueryTBL_KCD_MATL_MST
    };

    const onCellEditCompleteTBL_KCD_MATL_MST = (e) => {
        let { rowData, newValue, field, originalEvent: event } = e;
        rowData[field] = newValue;
    };

    const cellEditorTBL_KCD_MATL_MST = (options) => {
        return textEditorMATL(options);
    };

    const textEditorMATL = (options) => {
        return (
            <InputText
                type="text"
                value={changeInputValue(options.value)}
                onChange={(e) => options.editorCallback(e.target.value)}
            />
        );
    };

    // DEFINE DATAGRID : TBL_KSV_PO_MRP5
    const [datasTBL_KSV_PO_MRP5, setDatasTBL_KSV_PO_MRP5] = useState([]);
    const dt_TBL_KSV_PO_MRP5 = useRef(null);
    const [dataTBL_KSV_PO_MRP5, setDataTBL_KSV_PO_MRP5] =
        useState(emptyTBL_KSV_PO_MRP5);

    //

    useEffect(() => {
        datasetEDT_KSV_PO_MRP();

        var tArray = [];

        var tObj = {};

        tObj = {};
        tObj.CD_CODE = "";
        tObj.CD_NAME = " ";
        tArray.push(tObj);

        tObj = {};
        tObj.CD_CODE = "N";
        tObj.CD_NAME = "NOT USE";
        tArray.push(tObj);

        tObj = {};
        tObj.CD_CODE = "E";
        tObj.CD_NAME = "LOST E";
        tArray.push(tObj);

        tObj = {};
        tObj.CD_CODE = "L";
        tObj.CD_NAME = "LOSS L";
        tArray.push(tObj);

        tObj = {};
        tObj.CD_CODE = "B";
        tObj.CD_NAME = "DEFECT(No use) B";
        tArray.push(tObj);

        tObj = {};
        tObj.CD_CODE = "F";
        tObj.CD_NAME = "FACTORY(In-house use) F";
        tArray.push(tObj);

        tObj = {};
        tObj.CD_CODE = "S";
        tObj.CD_NAME = "SAMPLE S";
        tArray.push(tObj);

        tObj = {};
        tObj.CD_CODE = "G";
        tObj.CD_NAME = "SMS G";
        tArray.push(tObj);
        setDatasCANCEL_REASON(tArray);

    }, [mailInfo]);

    const datasetEDT_KSV_PO_MRP = () => {
        var tObj = { ...dataEDT_KSV_PO_MRP };
        var argPoCds = [];
        let argData = { ...mailInfo };

        var tCols = argData.PO_CD2?.split("/");
        if (tCols) {
            tCols.forEach((col, i) => {
                argPoCds.push(col);
            });
        }

        let poCdListStr = argPoCds.join("/");
        var tUserInfo = serviceLib.getUserInfo();
        let puSeq = -1;

        if (
            selectedTBL_KSV_PO_MRP0.length &&
            selectedTBL_KSV_PO_MRP0[selectedTBL_KSV_PO_MRP0.length - 1]
                .PU_SEQ !== "W"
        ) {
            puSeq =
                selectedTBL_KSV_PO_MRP0[selectedTBL_KSV_PO_MRP0.length - 1]
                    .PU_SEQ;
        } else {
            puSeq = datasTBL_KSV_PO_MRP0
                .map((item) => item.PU_SEQ) // PU_SEQ만 추출
                .filter((seq) => !String(seq).startsWith("W")) // "W"로 시작하는 것 제외
                .map((seq) => Number(seq)) // 숫자로 변환
                .filter((num) => !isNaN(num)) // 숫자만 남김
                .reduce((max, num) => Math.max(max, num), 0); // 최대값 찾기
            puSeq++;
        }

        var tMailHeader = `제목 (${tUserInfo.EMAIL})`;
        let poCdListStrForFactory = poCdListStr;
        switch (argData.VENDOR_TYPE_N) {
            case "DOMESTIC":
            case "IMPORT":
            case "FACTORY":
                poCdListStr = argData.PU_CD;
                break;
        }

        var tTitle = `${poCdListStr}_${tObj.BUYER_CD}_${tObj.VENDOR_CD} 발주서 (PU Ver ${puSeq})`;
        var tBody = "";
        tBody += `발주서` + "\r\n";
        tBody += ` ` + "\r\n";
        tBody += `안녕하세요?` + "\r\n";
        tBody +=
            `${poCdListStr}_${tObj.BUYER_CD} 건으로 발주서 보내드립니다.` +
            "\r\n";
        tBody += `PO# : ${poCdListStrForFactory}` + "\r\n";
        tBody += ` ` + "\r\n";
        tBody += `바이어명 : ${tObj.BUYER_CD}` + "\r\n";
        tBody +=
            `납품요구일자 : ${moment(argData.EX_FACTORY, "YYYYMMDD").format("YYYY.MM.DD")}` +
            "\r\n";
        tBody += `납품장소 : ${argData.FORWARDER || ""}` + "\r\n";
        tBody += `쉬핑마크 : SHINTS ${argData.SHIP_TO} Co,.LTD` + "\r\n";
        tBody += ` ` + "\r\n";
        tBody += `*필독 사항*` + "\r\n";
        tBody +=
            `1. 발주서를 받으신후, 2일 이내에 납기 및 단가를 확인하시고 회신하여 주십시오.` +
            "\r\n";
        tBody +=
            `2. 규격란에 기재된 폭(특히 원단류 가용/전폭) 품명, 코드 등에 오류가 있거나 불일치 할 경우 반드시 이메일로 사전 인폼 주시기 바랍니다.` +
            "\r\n";
        tBody +=
            `3. 쉬핑마크에 발주번호, 오더번호, 품명, 색상, 혼용율, 폭(원단만 기재), 수량, C/T NO, 원산지 까지 기재하여 주십시오.` +
            "\r\n";
        tBody +=
            `4. 납품요구일자를 지키지 못할 시 공장까지의 운임은 업체 부담입니다. 납품요구일자 내 출고가 어려운 경우 사전에 꼭 연락 주시기 바랍니다.` +
            "\r\n";
        tBody += ` ` + "\r\n";
        tBody += `${tUserInfo.USER_ID} ${tUserInfo.USER_NAME}` + "\r\n";
        tBody += `Shin Textile Solutions.` + "\r\n";
        tBody += `TEL:${tUserInfo.TEL_NO}` + "\r\n";

        if (argData.VENDOR_TYPE_N === "IMPORT") {
            tMailHeader = `Subject (${tUserInfo.EMAIL})`;
            tTitle = `${poCdListStr}_${tObj.BUYER_CD}_${tObj.VENDOR_CD} Purchase Order (PU Ver ${puSeq})`;
            tBody = "";
            tBody +=
                `We are pleased to send you the purchase order for ${argData.PU_CD} ${tObj.BUYER_CD}.` +
                "\r\n";
            tBody += ` ` + "\r\n";
            tBody += `- Buyer: ${tObj.BUYER_CD}` + "\r\n";
            tBody += `- PU#: ${argData.PU_CD}` + "\r\n";
            tBody += `  ${poCdListStrForFactory}` + "\r\n";
            tBody +=
                `- Required Delivery Date: ${moment(argData.EX_FACTORY, "YYYYMMDD").format("MMMM D, YYYY")}` +
                "\r\n";
            tBody += `- Delivery Place: ${argData.FORWARDER || ""}` + "\r\n";
            tBody +=
                `- Shipping Mark: SHINTS ${argData.SHIP_TO} Co., Ltd.` + "\r\n";
            tBody += ` ` + "\r\n";
            tBody += `*Important Notes*` + "\r\n";
            tBody +=
                `1. Please confirm the delivery date and unit price within 2 days after receiving this purchase order.` +
                "\r\n";
            tBody +=
                `2. If there are any errors or discrepancies in specifications, such as width (especially usable/full width for fabrics), item name, or code, kindly inform us in advance by email.` +
                "\r\n";
            tBody +=
                `3. The shipping mark must include: purchase order number, order number, item name, color, composition, width (for fabric only), quantity, carton number, and country of origin.` +
                "\r\n";
            tBody +=
                `4. In case the required delivery date cannot be met, the supplier will bear the transportation cost to the factory. If you anticipate any delay in shipment, please contact us in advance.` +
                "\r\n";
            tBody += ` ` + "\r\n";
            tBody += `Thanks & Best regards,` + "\r\n";
            tBody += `${tUserInfo.USER_ID} ${tUserInfo.USER_NAME}` + "\r\n";
            tBody += `SHINTS BVT Co., Ltd.` + "\r\n";
            tBody += `Phu Tao Residential Area, Thach Khoi Ward,` + "\r\n";
            tBody += `Hai Phong City, Vietnam` + "\r\n";
            tBody += `TEL: ${tUserInfo.TEL_NO}` + "\r\n";
            tBody += `FAX: 84 -(0220) 3861730`;
        }

        if (argData.VENDOR_TYPE_N === "FACTORY") {
            tMailHeader = `Subject (${tUserInfo.EMAIL})`;
            tTitle = `${poCdListStr}_${tObj.BUYER_CD}_${tObj.VENDOR_CD} Purchase Order (PU Ver ${puSeq})`;
            tBody = "";
            tBody += `Kính gửi Quý công ty,`;
            tBody +=
                `Chúng tôi trân trọng gửi đến Quý công ty đơn đặt hàng ${argData.PU_CD} ${tObj.BUYER_CD}.` +
                "\r\n";
            tBody += ` ` + "\r\n";
            tBody += `- PU#: ${argData.PU_CD}` + "\r\n";
            tBody += `  ${poCdListStrForFactory}` + "\r\n";
            tBody += `- Người mua: ${tObj.BUYER_CD}` + "\r\n";
            tBody +=
                `- Ngày giao hàng yêu cầu: ${moment(argData.EX_FACTORY, "YYYYMMDD").format("DD/MM/YYYY")}` +
                "\r\n";
            tBody += `- Địa điểm giao hàng: SHINTS BVT Co., LTD` + "\r\n";
            tBody += `- Shipping Mark: SHINTS BVT Co., LTD` + "\r\n";
            tBody += ` ` + "\r\n";
            tBody += `*Lưu ý quan trọng:*` + "\r\n";
            tBody +=
                `1. Vui lòng xác nhận ngày giao hàng và đơn giá trong vòng 2 ngày kể từ khi nhận được đơn đặt hàng này.` +
                "\r\n";
            tBody +=
                `2. Nếu có bất kỳ thay đổi hoặc thông tin nào khác so với thông tin sản phẩm đã được Shints BVT hoặc khách hàng của chúng tôi phê duyệt trước đó, vui lòng thông báo cho chúng tôi qua email.` +
                "\r\n";
            tBody +=
                `3. Shipping mark phải bao gồm: số đơn đặt hàng, tên mặt hàng, màu sắc, thành phần, khổ (chỉ áp dụng cho vải), số lượng, số thùng carton, cân nặng và xuất xứ.` +
                "\r\n";
            tBody +=
                `4. Trong trường hợp không thể đáp ứng ngày giao hàng yêu cầu, nhà cung cấp sẽ chịu chi phí vận chuyển đến nhà máy thuộc hệ thống của Shints BVT (bao gồm cả Shints ETP)- theo chỉ định của chúng tôi . Nếu dự kiến không thể xuất hàng đúng hạn, vui lòng liên hệ trước với chúng tôi.` +
                "\r\n\r\n";
            tBody += `Trân trọng,` + "\r\n";
            tBody += ` ` + "\r\n";
            tBody += `${tUserInfo.USER_ID} ${tUserInfo.USER_NAME}` + "\r\n";
            tBody += `Shints BVT Co., Ltd`;
        }

        setMailHeader(tMailHeader);
        setMailDialogTitle(tTitle);
        setMailDialogContent(tBody);

        tObj.PU_STATUS = argData.PU_STATUS;
        if (!argData.PU_STATUS) tObj.PU_STATUS = saveStatus;

        tObj.PU_CD = argData.PU_CD;
        tObj.VENDOR_CD = argData.VENDOR_NAME;
        tObj.VENDOR_CD_0 = argData.VENDOR_CD;
        tObj.VENDOR_TYPE = argData.VENDOR_TYPE_N;
        tObj.REG_USER = argData.REG_USER;
        tObj.BUYER_CD = argData.BUYER_NAME;
        tObj.PAY_TERM = argData.PAY_TERM;
        tObj.PAY_TYPE = argData.PAY_TYPE;

        var tPoCds = "";
        argPoCds.forEach((col9, i9) => {
            if (col9) {
                if (tPoCds === "") tPoCds = `'${col9}'`;
                else tPoCds += `/'${col9}'`;
            }
        });

        tObj.PO_CD1 = tPoCds;
        tObj.MRP_DATE = argData.MRP_DATE;

        tObj.NORMI = argData.NORMI;
        // editEDT_KSV_PO_MRP_NORMI(argData.NORMI);

        tObj.OVER_SHORT = argData.OVER_SHORT;
        tObj.PO_CD2 = "";
        tObj.TARGET_ETA = argData.TARGET_ETA;

        tObj.CURR_CD = argData.CURR_CD;
        // editEDT_KSV_PO_MRP_CURR_CD(argData.CURR_CD);

        tObj.PI_NO = argData.PI_NO;

        tObj.PO_CD3 = "";
        tObj.ORDER_DATE = argData.ORDER_DATE;
        tObj.PAY_AMT = argData.PAY_AMT;
        tObj.PI_FILE = argData.PI_FILE;

        tObj.PO_CD4 = "";
        tObj.DUE_DATE = argData.DUE_DATE;

        tObj.BILL_TO = argData.BILL_TO;
        // editEDT_KSV_PO_MRP_BILL_TO(argData.BILL_TO);

        tObj.PO_CD5 = "";
        tObj.EX_FACTORY = argData.EX_FACTORY;
        tObj.PAY_DATE = argData.PAY_DATE;

        tObj.PO_CD6 = "";
        console.log("Input . Forwarder=>", argData);
        tObj.FORWARDER = argData.PLACE_CD;
        // editEDT_KSV_PO_MRP_FORWARDER(argData.PLACE_CD);

        tObj.SHIP_TO = argData.SHIP_TO;

        tObj.ORIGIN_PORT = argData.ORIGIN_PORT;
        // editEDT_KSV_PO_MRP_ORIGIN_PORT(argData.ORIGIN_PORT);

        tObj.TRADE_TERM = argData.TRADE_TERM;
        // editEDT_KSV_PO_MRP_TRADE_TERM(argData.TRADE_TERM);

        setDataEDT_KSV_PO_MRP(tObj);
    };

    const onInputChangeEDT_KSV_PO_MRP = (e, name) => {
        serviceLib.handleInputChange(
            e,
            name,
            dataEDT_KSV_PO_MRP,
            setDataEDT_KSV_PO_MRP,
        );
    };

    const onCalChangeEDT_KSV_PO_MRP = (e, name) => {
        serviceLib.handleCalendarChange(
            e,
            name,
            dataEDT_KSV_PO_MRP,
            setDataEDT_KSV_PO_MRP,
        );
    };

    const onDropdownChangeEDT_KSV_PO_MRP = (e, name) => {
        const dropdownMeta = {
            NORMI: { key: "CD_CODE", setter: setDataEDT_KSV_PO_MRP_NORMI },
            BILL_TO: {
                key: "CD_CODE",
                setter: setDataEDT_KSV_PO_MRP_BILL_TO,
            },
            CURR_CD: {
                key: "CD_CODE",
                setter: setDataEDT_KSV_PO_MRP_CURR_CD,
            },
            CURR_CD2: {
                key: "CD_CODE",
                setter: setDataEDT_KSV_PO_MRP_CURR_CD2,
            },
            ORIGIN_PORT: {
                key: "CD_CODE",
                setter: setDataEDT_KSV_PO_MRP_ORIGIN_PORT,
            },
            TRADE_TERM: {
                key: "CD_CODE",
                setter: setDataEDT_KSV_PO_MRP_TRADE_TERM,
            },
        };

        const meta = dropdownMeta[name] || {
            key: "CD_CODE",
            setter: undefined,
        };

        serviceLib.handleDropdownChangeByKey(
            e,
            name,
            dataEDT_KSV_PO_MRP,
            setDataEDT_KSV_PO_MRP,
            meta.setter,
            meta.key,
        );
    };

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

    const [datasEDT_KSV_PO_MRP_CURR_CD2, setDatasEDT_KSV_PO_MRP_CURR_CD2] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_CURR_CD2, setDataEDT_KSV_PO_MRP_CURR_CD2] =
        useState({});

    const editEDT_KSV_PO_MRP_CURR_CD2 = (argValue) => {
        let _dataEDT_KSV_PO_MRP_CURR_CD2 = datasEDT_KSV_PO_MRP_CURR_CD2.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataEDT_KSV_PO_MRP_CURR_CD2(_dataEDT_KSV_PO_MRP_CURR_CD2[0]);
    };

    const [datasEDT_KSV_PO_MRP_FORWARDER, setDatasEDT_KSV_PO_MRP_FORWARDER] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_FORWARDER, setDataEDT_KSV_PO_MRP_FORWARDER] =
        useState({});

    const onDropdownChangeEDT_KSV_PO_MRP_FORWARDER = (e, name) => {
        let val = e.target.value || "";

        console.log("change forward:", val);

        setDataEDT_KSV_PO_MRP({
            ...dataEDT_KSV_PO_MRP,
            FORWARDER: val.PLACE_NAME,
        });
        console.log(val);
        setMailInfo({ ...mailInfo, FORWARDER: val.PLACE_NAME });
        setDataEDT_KSV_PO_MRP_FORWARDER(e.value);
    };
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

    const onInputChangeEDT_KSV_PO_MRP2 = (e, name) => {
        serviceLib.handleInputChange(
            e,
            name,
            dataEDT_KSV_PO_MRP2,
            setDataEDT_KSV_PO_MRP2,
        );
    };

    const onCalChangeEDT_KSV_PO_MRP2 = (e, name) => {
        serviceLib.handleCalendarChange(
            e,
            name,
            dataEDT_KSV_PO_MRP2,
            setDataEDT_KSV_PO_MRP2,
        );
    };

    const onDropdownChangeEDT_KSV_PO_MRP2 = (e, name) => {
        const dropdownMeta = {
            PAY_BANK: {
                key: "BANK_CD",
                setter: setDataEDT_KSV_PO_MRP2_PAY_BANK,
            },
        };

        const meta = dropdownMeta[name] || {
            key: "CD_CODE",
            setter: undefined,
        };

        serviceLib.handleDropdownChangeByKey(
            e,
            name,
            dataEDT_KSV_PO_MRP2,
            setDataEDT_KSV_PO_MRP2,
            meta.setter,
            meta.key,
        );
    };

    const onInputNumberChangeEDT_KSV_PO_MRP2_AMOUNT = (e, name) => {
        let val = e.value || "";
        if (val === "") return;

        let _dataEDT_KSV_PO_MRP2 = { ...dataEDT_KSV_PO_MRP2 };
        _dataEDT_KSV_PO_MRP2[`${name}`] = String(val);

        setDataEDT_KSV_PO_MRP2(_dataEDT_KSV_PO_MRP2);
    };

    const onInputNumberChangeEDT_KSV_PO_MRP2_DEPOSIT_AMOUNT = (e, name) => {
        let val = e.value || "";
        if (val === "") return;

        let _dataEDT_KSV_PO_MRP2 = { ...dataEDT_KSV_PO_MRP2 };
        _dataEDT_KSV_PO_MRP2[`${name}`] = String(val);

        var tAmount = parseFloat(_dataEDT_KSV_PO_MRP2["AMOUNT"]);
        var tDeposit = parseFloat(val);
        var tRate = String(
            serviceLib.getFloat((tDeposit / tAmount) * 100.0, 2),
        );

        _dataEDT_KSV_PO_MRP2["DEPOSIT_RATE"] = tRate;
        setDataEDT_KSV_PO_MRP2(_dataEDT_KSV_PO_MRP2);
    };

    const onInputChangeEDT_KSV_PO_MRP2_DEPOSIT_RATE = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP2 = { ...dataEDT_KSV_PO_MRP2 };

        let tTypeVal = _dataEDT_KSV_PO_MRP2[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP2[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP2[`${name}`] = parseInt(val);

        var amount = parseFloat(_dataEDT_KSV_PO_MRP2["AMOUNT"]);
        var depositRate = parseFloat(val);
        var depositAmt = String(
            serviceLib.getFloat(amount * depositRate * 0.01, 2),
        );

        _dataEDT_KSV_PO_MRP2["DEPOSIT_AMOUNT"] = depositAmt;

        setDataEDT_KSV_PO_MRP2(_dataEDT_KSV_PO_MRP2);
    };

    const [datasEDT_KSV_PO_MRP2_PAY_BANK, setDatasEDT_KSV_PO_MRP2_PAY_BANK] =
        useState([]);
    const [dataEDT_KSV_PO_MRP2_PAY_BANK, setDataEDT_KSV_PO_MRP2_PAY_BANK] =
        useState({});

    /* QRY KSV_PO_MRP*/
    const [dataEDT_KSV_PO_MRP3, setDataEDT_KSV_PO_MRP3] =
        useState(emptyEDT_KSV_PO_MRP3);

    const onInputChangeEDT_KSV_PO_MRP3 = (e, name) => {
        serviceLib.handleInputChange(
            e,
            name,
            dataEDT_KSV_PO_MRP3,
            setDataEDT_KSV_PO_MRP3,
        );
    };

    const onCalChangeEDT_KSV_PO_MRP3 = (e, name) => {
        serviceLib.handleCalendarChange(
            e,
            name,
            dataEDT_KSV_PO_MRP3,
            setDataEDT_KSV_PO_MRP3,
        );
    };

    const onDropdownChangeEDT_KSV_PO_MRP3 = (e, name) => {
        const dropdownMeta = {
            PAY_BANK: {
                key: "BANK_CD",
                setter: setDataEDT_KSV_PO_MRP3_PAY_BANK,
            },
        };

        const meta = dropdownMeta[name] || {
            key: "CD_CODE",
            setter: undefined,
        };

        serviceLib.handleDropdownChangeByKey(
            e,
            name,
            dataEDT_KSV_PO_MRP3,
            setDataEDT_KSV_PO_MRP3,
            meta.setter,
            meta.key,
        );
    };

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

    // LC Dialog
    const onRowClick1TBL_KSV_PO_MRP3 = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_PO_MRP3 = argData;

        setDataTBL_KSV_PO_MRP3(argTBL_KSV_PO_MRP3);

        if (typeof argData0.length !== "undefined") {
            var tAmt = 0;
            argData0.forEach((col, i) => {
                tAmt += parseFloat(col.AMOUNT);
            });
            setDataEDT_KSV_PO_MRP3((prev) => ({
                ...prev,
                AMOUNT: tAmt.toFixed(2),
            }));
        }
    };

    const onRowClickTBL_KSV_PO_MRP3 = (event) => {
        let argTBL_KSV_PO_MRP3 = event.data;
        if (flagSelectModeTBL_KSV_PO_MRP3) return;

        // Service : NawooAll:mgrQueryTBL_KSV_PO_MRP3
    };

    // DEFINE DATAGRID : TBL_KSV_PO_MRP0
    let emptyTBL_KSV_PO_MRP0 = {};

    const [loadingTBL_KSV_PO_MRP0, setLoadingTBL_KSV_PO_MRP0] = useState(false);

    const [datasTBL_KSV_PO_MRP0, setDatasTBL_KSV_PO_MRP0] = useState([]);
    const dt_TBL_KSV_PO_MRP0 = useRef(null);
    const [dataTBL_KSV_PO_MRP0, setDataTBL_KSV_PO_MRP0] =
        useState(emptyTBL_KSV_PO_MRP0);
    const [selectedTBL_KSV_PO_MRP0, setSelectedTBL_KSV_PO_MRP0] = useState([]);
    const [flagSelectModeTBL_KSV_PO_MRP0, setFlagSelectModeTBL_KSV_PO_MRP0] =
        useState(false);

    const onRowClickTBL_KSV_PO_MRP0 = (event) => {
        // let argTBL_KSV_PO_MRP0 = event.data;
        // if (flagSelectModeTBL_KSV_PO_MRP0) return;
        // Service : NawooAll:mgrQueryTBL_KSV_PO_MRP3

        if (typeof event.data.PO_CD === "undefined") return;

        var argData = { ...event.data };

        var tObj0 = { ...dataEDT_KSV_PO_MRP };

        if (argData.id === 1) {
            var tObj = {};
            tObj.PU_CD = tObj0.PU_CD;
            tObj.PU_SEQ = argData.PU_SEQ;
            tObj.PO_CD = argData.PO_CD;
            tObj.PO_SEQ = argData.PO_SEQ;
            tObj.IN_PO_CD = argData.PO_CD;
            tObj.IN_PO_SEQ = argData.PO_SEQ;
            tObj.IN_PO_CD2 = "";
            tObj.IN_PO_SEQ2 = "";
            // setIsEdit(true);
            if (argData.id === datasTBL_KSV_PO_MRP0.length) {
                tObj.LAST = "1";
                setIsEdit(false);
            } else {
                tObj.LAST = "";
                setIsEdit(true);
            }
            search_LIST_3_LOG(tObj);
        } else {
            var tLastObj = { ...datasTBL_KSV_PO_MRP0[argData.id - 2] };
            var tObj = {};
            tObj.PU_CD = tObj0.PU_CD;
            tObj.PU_SEQ = argData.PU_SEQ;
            tObj.PO_CD = argData.PO_CD;
            tObj.PO_SEQ = argData.PO_SEQ;
            tObj.IN_PO_CD = argData.PO_CD;
            tObj.IN_PO_SEQ = argData.PO_SEQ;
            tObj.IN_PO_CD2 = tLastObj.PO_CD;
            if (tLastObj.SEND_DATETIME === "") tObj.IN_PO_SEQ2 = "";
            else tObj.IN_PO_SEQ2 = tLastObj.PO_SEQ;
            // setIsEdit(true);
            if (argData.id === datasTBL_KSV_PO_MRP0.length) {
                tObj.LAST = "1";
                setIsEdit(false);
            } else {
                tObj.LAST = "";
                setIsEdit(true);
            }
            search_LIST_3_LOG(tObj);
        }
    };

    const onRowDoubleClickTBL_KSV_PO_MRP0 = (argData0) => {
        var tFileName = argData0.data["SEND_FILENAME"];
        var tFileUrl = argData0.data["SEND_FILEURL"];
        alert(tFileName + ":" + tFileUrl);

        downloadFile(tFileUrl, tFileName);
    };

    const s3FileUpload = async (e) => {
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
            var tEdtObj = { ...dataEDT_KSV_PO_MRP };

            var tInObj = {};
            tInObj.FILE_KEY = tEdtObj.PU_CD;
            if (tEdtObj.PI_NO === "") tInObj.TITLE = tEdtObj.PU_CD;
            else tInObj.TITLE = tEdtObj.PI_NO;
            // tInObj.NAME = `pi_file_${tInObj.FILE_KEY}`;
            tInObj.NAME = fileName;
            tInObj.URL = imgURL;
            tInObj.OBJECT_NAME = objectName;
            serviceS040102_PURCHASER_INFO
                .mgrInsert_FILE_ADD(tInObj)
                .then((data) => {
            if (!isMountedRef.current) return;
                    if (typeof data.graphQLErrors === "undefined") {
                        if (data.length > 0) {
                            alert(data[0].CODE);
                            if (data[0].CODE.includes("SUCC")) {
                                tEdtObj.PI_FILE = tInObj.NAME;
                                setDataEDT_KSV_PO_MRP(tEdtObj);
                                setDataKCD_FILEINFO(tInObj);

                                var tTmp1 = { ...dataTBL_KSV_PO_MRP1 };
                                tTmp1.PI_FILE_URL = imgURL;
                                setDataTBL_KSV_PO_MRP1(tTmp1);
                            }
                        }
                    } else {
                        toast.current.show({
                            severity: "success",
                            summary: "Info",
                            detail: "",
                            life: 3000,
                        });
                        // console.log("ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " + JSON.stringify(data.graphQLErrors));
                    }
                });
        } catch (err) {
            console.log(err);
        }
    };

    const onDownloadFile = () => {
        var tEdtObj = { ...dataEDT_KSV_PO_MRP };
        if (tEdtObj.PI_FILE !== "") {
            // downloadFile(dataTBL_KSV_PO_MRP1.PI_FILE_URL, tEdtObj.PI_FILE);
            serviceLib.downloadFile(
                dataTBL_KSV_PO_MRP1.PI_FILE_URL,
                tEdtObj.PI_FILE,
            );
        }
    };

    const menuModel = [
        {
            label: "Inquery",
            icon: "pi pi-fw pi-search",
            command: () => search_LIST_3({}),
        },
    ];

    ///

    const [isBillFinish, setIsBillFinish] = useState(false);

    const pageLoad = () => {
        let tPuCd = "";
        let tPuStatus = "";

        setSelectedTBL_KSV_PO_MRP2([]);

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
                if (tCols[0].includes("PU_STATUS")) {
                    tObj.key = tCols[0];
                    tObj.value = tCols[1];
                    tPuStatus = decodeURIComponent(tObj.value);
                    if (tPuStatus === "Bill Finish") setIsBillFinish(true);
                }
            });
        }

        setSaveStatus(tPuStatus);

        search_LIST_1(tPuCd, tPuStatus);

        let _url1 = `${window.location.protocol}//${window.location.hostname}:3202/restapi/`;
        var tUrl = `${_url1}fileupload2/purchase/${tPuCd}/1`;
        setDataUrlFile1(tUrl);
    };

    useEffect(() => {
        pageLoad();
    }, []);

    // Support Area

    const changeDateVal = (argVal) => {
        if (argVal === "") return argVal;
        var tType = typeof argVal;
        if (tType !== "string") {
            return null;
        }

        var tYear = parseInt(argVal.substring(0, 4));
        var tMon = parseInt(argVal.substring(4, 6));
        var tDay = parseInt(argVal.substring(6, 8));

        return new Date(tYear, tMon - 1, tDay);
    };

    const [dataEDT_PRICE_UPDATE, setDataEDT_PRICE_UPDATE] = useState("");
    const [visibleDialogReason, setVisibleDialogReason] = useState(false);
    const [reasonMap, setReasonMap] = useState({}); // MATL_CD => REASON

    const onReasonChange = (matlCd, value) => {
        setReasonMap((prev) => ({ ...prev, [matlCd]: value }));
    };

    const transferPriceUpdateData = async (argOption) => {
        let tEdtObj = { ...dataEDT_KSV_PO_MRP };

        let updateCurrCd = tEdtObj.CURR_CD2;
        let updatePrice = dataEDT_PRICE_UPDATE;
        let selectedRowpriceUpdate = selectedTBL_KSV_PO_MRP2;

        console.log('['+updateCurrCd+']', '['+tEdtObj.CURR_CD+']');
        
        // Check Price Status
        if (selectedTBL_KSV_PO_MRP2.length !== datasTBL_KSV_PO_MRP2.length) {
            if (updateCurrCd !== tEdtObj.CURR_CD) {
                alert(
                    "You cannot change the Price to a currency other than the currency unit of the Purchase.",
                );
                return false;
            }
        }

        const missingReasons = selectedRowpriceUpdate.filter(
            (item) =>
                !reasonMap[item.MATL_CD] ||
                reasonMap[item.MATL_CD].trim() === "",
        );

        if (
            missingReasons.length > 0 &&
            selectedRowpriceUpdate[0].MASTER_PRICE != 0
        ) {
            if (argOption) {
            } else {
                alert("Please enter the reason.");
                return false;
            }
        }

        try {
            var tInputArray = [];
            for (const item of selectedRowpriceUpdate) {
                let poCdList = item.PO_CD.split("/");

                for (const poCd of poCdList) {
                    var wUpdateReason = "";
                    if (argOption) {
                        updatePrice = item.MASTER_PRICE;
                        wUpdateReason = saveBatchReason;
                    } else {
                        wUpdateReason = reasonMap[item.MATL_CD];
                    }

                    console.log({
                        MATL_CD: item.MATL_CD,
                        CURR_CD: updateCurrCd,
                        MATL_PRICE: updatePrice,
                        UPDATE_REASON: wUpdateReason,
                        PU_CD: dataEDT_KSV_PO_MRP.PU_CD,
                        PO_CD: poCd,
                        PO_PRICE: String(
                            parseFloat(updatePrice) +
                                parseFloat(
                                    selectedRowpriceUpdate.SURCHARGE_PRICE || 0,
                                ),
                        ),
                    });

                    tInputArray.push({
                        MATL_CD: item.MATL_CD,
                        CURR_CD: updateCurrCd,
                        MATL_PRICE: updatePrice,
                        UPDATE_REASON: wUpdateReason,
                        PU_CD: dataEDT_KSV_PO_MRP.PU_CD,
                        PO_CD: poCd,
                        PO_PRICE: String(
                            parseFloat(updatePrice) +
                                parseFloat(
                                    selectedRowpriceUpdate.SURCHARGE_PRICE || 0,
                                ),
                        ),
                    });
                }
            }

            setLoadingTBL_KSV_PO_MRP2(true);
            serviceS040101_PURCHASER_REG.mgrUpdate_UPDATE_MATL_PRICE(tInputArray).then((data) => {
                setLoadingTBL_KSV_PO_MRP2(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        if (data[0].CODE.includes('SUCC')) {
                            // window.alert(data[0].CODE);
                            alert("The price has been successfully updated.");
                            pageLoad();
                        } else {
                            window.alert(data[0].CODE);
                        }
                    }
                } else {
                    console.log(`mgrUpdate_UPDATE_MATL_PRICE Error:`);
                }
            }); 
            /*
            var tResult = await serviceS040101_PURCHASER_REG.mgrUpdate_UPDATE_MATL_PRICE(
                tInputArray,
            );
            // console.log(tResult);
            if (tResult[0].CODE.includes('SUCC')) {
                alert("The price has been successfully updated.");
                pageLoad();
            } else  {
                alert(`${tResult[0].CODE}`);
            }
            */
            return true;
        } catch (e) {
            console.error("가격 업데이트 실패:", e);
            alert(`An error occurred while updating the price.(${e.message})`);
            return false;
        }
    };

    const onConfirmDialog = async () => {
        const result = await transferPriceUpdateData();

        // transfer 함수에서 true를 리턴하면 성공으로 간주하고 Dialog 닫기
        if (result === true) {
            setVisibleDialogReason(false);
        }
    };

    const onCancelDialog = () => {
        setVisibleDialogReason(false);
    };

    const priceUpdate = () => {
        let tEdtObj0 = { ...dataEDT_KSV_PO_MRP0 };
        let tEdtObj = { ...dataEDT_KSV_PO_MRP };

        /*  Won Yong Bon:1121. 임시로 막음 */

        if (tEdtObj0.LC_AMT && parseFloat(tEdtObj0.LC_AMT) > 0) {
            var tChk9 = 0;
            selectedTBL_KSV_PO_MRP2.forEach((col, i) => {
                if (parseFloat(col.MATL_PRICE) > 0) tChk9 = 1;
            });

            if (tChk9 === 1) {
                alert(
                    `LC가 등록된 건이 가격 수정을 할수 없습니다(Lc Amt:${tEdtObj0.LC_AMT}) .`,
                );
                return;
            }
        }

        let updateCurrCd = tEdtObj.CURR_CD2;
        let updatePrice = dataEDT_PRICE_UPDATE || "";
        let selectedRowpriceUpdate = selectedTBL_KSV_PO_MRP2;

        var tCheckCurr = 0;
        var saveCurr = "";
        selectedTBL_KSV_PO_MRP2.forEach((col, i) => {
            if (i !== 0 && col.CURR_CD !== saveCurr) tCheckCurr = 1;
            saveCurr = col.CURR_CD;
        });
        if (tCheckCurr === 1) {
            alert("Please enter Same Curr Cd.");
            return;
        }

        var tCheck1 = 0;
        selectedTBL_KSV_PO_MRP2.forEach((col, i) => {
            if (col.PU_STATUS === "FullIn") tCheck1 = 1;
        });
        if (tCheck1 === 1) {
            alert(
                "Please Unselect End Status Record. Sts In Record not price Update.",
            );
            return;
        }

        if (updatePrice === "") {
            alert("Please enter the price to update in the field on the left.");
            return;
        }

        const hasZero = selectedRowpriceUpdate.some(
            (item) => parseFloat(item.MASTER_PRICE) === 0,
        );
        const hasNonZero = selectedRowpriceUpdate.some(
            (item) => parseFloat(item.MASTER_PRICE) !== 0,
        );

        if (hasZero && hasNonZero) {
            alert(
                "Master Price cannot have both 0 and non-zero values selected at the same time.",
            );
            return;
        }

        const allNonZero = selectedRowpriceUpdate.every(
            (item) => parseFloat(item.MASTER_PRICE) !== 0,
        );

        if (allNonZero) {
            const initialReasons = {};
            selectedRowpriceUpdate.forEach((row) => {
                initialReasons[row.MATL_CD] = "";
            });
            setReasonMap(initialReasons);
            setVisibleDialogReason(true);
        } else {
            transferPriceUpdateData();
        }
    };

    const priceUpdate_inline = () => {
        let tEdtObj0 = { ...dataEDT_KSV_PO_MRP0 };
        let tEdtObj = { ...dataEDT_KSV_PO_MRP };

        if (tEdtObj0.LC_AMT && parseFloat(tEdtObj0.LC_AMT) > 0) {
            var tChk9 = 0;
            selectedTBL_KSV_PO_MRP2.forEach((col, i) => {
                if (parseFloat(col.MATL_PRICE) > 0) tChk9 = 1;
            });

            if (tChk9 === 1) {
                alert(
                    `LC가 등록된 건이 가격 수정을 할수 없습니다(Lc Amt:${tEdtObj0.LC_AMT}) .`,
                );
                return;
            }
        }

        let updateCurrCd = tEdtObj.CURR_CD2;
        let updatePrice = dataEDT_PRICE_UPDATE || "";

        var tResultArray = [];
        var tSaveArray = JSON.parse(sessionStorage.getItem("S040102_LIST_3"));
        selectedTBL_KSV_PO_MRP2.forEach((col2, i2) => {
            tSaveArray.forEach((col3, i3) => {
                if (col2.MATL_CD === col3.MATL_CD) {
                    console.log(
                        `Price Compare: ${col2.MASTER_PRICE}/${col3.MASTER_PRICE} `,
                    );
                    if (
                        parseFloat(col2.MASTER_PRICE) !==
                        parseFloat(col3.MASTER_PRICE)
                    ) {
                        var tObj3 = { ...col2 };
                        tResultArray.push(tObj3);
                    }
                }
            });
        });
        if (tResultArray.length <= 0) return;

        // let selectedRowpriceUpdate = selectedTBL_KSV_PO_MRP2;
        let selectedRowpriceUpdate = [...tResultArray];

        var tCheckCurr = 0;
        var saveCurr = "";
        selectedTBL_KSV_PO_MRP2.forEach((col, i) => {
            if (i !== 0 && col.CURR_CD !== saveCurr) tCheckCurr = 1;
            saveCurr = col.CURR_CD;
        });
        if (tCheckCurr === 1) {
            alert("Please enter Same Curr Cd.");
            return;
        }

        var tCheck1 = 0;
        selectedTBL_KSV_PO_MRP2.forEach((col, i) => {
            if (col.PU_STATUS === "FullIn") tCheck1 = 1;
        });
        if (tCheck1 === 1) {
            alert(
                "Please Unselect End Status Record. Sts In Record not price Update.",
            );
            return;
        }

        const hasZero = selectedRowpriceUpdate.some(
            (item) => parseFloat(item.MASTER_PRICE) === 0,
        );
        const hasNonZero = selectedRowpriceUpdate.some(
            (item) => parseFloat(item.MASTER_PRICE) !== 0,
        );

        if (hasZero && hasNonZero) {
            alert(
                "Master Price cannot have both 0 and non-zero values selected at the same time.",
            );
            return;
        }

        const allNonZero = selectedRowpriceUpdate.every(
            (item) => parseFloat(item.MASTER_PRICE) !== 0,
        );

        if (allNonZero) {
            transferPriceUpdateData("inline-update");
        } else {
            transferPriceUpdateData("inline-update");
        }
    };

    return (
        <div className="af-div-main">
            <div className="" style={{ width: "123rem", height: "26rem" }}>
                <div
                    className="af-div-first"
                    style={{ width: "63rem", height: "26rem" }}
                >
                    <span className="af-span-3-0" style={{ width: "15rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>Status</p>
                        <div className="af-span-div" style={{ width: "8rem" }}>
                            <InputText
                                disabled
                                style={{
                                    width: "9rem",
                                    color: "black",
                                    backgroudColor: "#d8d8d8",
                                }}
                                id="id_TARGET_ETA"
                                value={dataEDT_KSV_PO_MRP.PU_STATUS}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MRP(
                                        e,
                                        "PU_STATUS",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "30rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>Supplier</p>
                        <div
                            className="af-span-div"
                            style={{ width: "23.5rem" }}
                        >
                            <InputText
                                disabled
                                style={{ width: "23.5rem" }}
                                id="id_TARGET_ETA"
                                value={dataEDT_KSV_PO_MRP.VENDOR_CD}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MRP(
                                        e,
                                        "VENDOR_CD",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "16.5rem" }}>
                        <p className="af-span-p" style={{ width: "6.5rem" }}>Type</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <InputText
                                disabled
                                style={{ width: "9rem" }}
                                id="id_TARGET_ETA"
                                value={dataEDT_KSV_PO_MRP.VENDOR_TYPE}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MRP(
                                        e,
                                        "VENDOR_TYPE",
                                    )
                                }
                            />
                        </div>
                    </span>

                    <span className="af-span-3-0" style={{ width: "15rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>PU#</p>
                        <div className="af-span-div" style={{ width: "8rem" }}>
                            <InputText
                                disabled
                                style={{
                                    width: "9rem",
                                    color: "black",
                                    backgroudColor: "#d8d8d8",
                                }}
                                id="id_TARGET_ETA"
                                value={dataEDT_KSV_PO_MRP.PU_CD}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MRP(
                                        e,
                                        "PU_CD",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "30rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>Buyer</p>
                        <div
                            className="af-span-div"
                            style={{ width: "23.5rem" }}
                        >
                            <InputText
                                disabled
                                style={{ width: "23.5rem" }}
                                id="id_TARGET_ETA"
                                value={dataEDT_KSV_PO_MRP.BUYER_CD}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MRP(
                                        e,
                                        "BUYER_CD",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "16.5rem" }}>
                        <p className="af-span-p" style={{ width: "6.5rem" }}>Pay Term</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <InputText
                                disabled
                                style={{ width: "9rem" }}
                                id="id_TARGET_ETA"
                                value={dataEDT_KSV_PO_MRP.PAY_TERM}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MRP(
                                        e,
                                        "PAY_TERM",
                                    )
                                }
                            />
                        </div>
                    </span>

                    <span className="af-span-3-0" style={{ width: "15rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>Due Date</p>
                        <div className="af-span-div" style={{ width: "8rem" }}>
                            <Calendar
                                showButtonBar
                                style={{ width: "9rem" }}
                                dateFormat="yy-mm-dd"
                                id="id_S_PO_DATE"
                                value={changeDateVal(
                                    dataEDT_KSV_PO_MRP.DUE_DATE,
                                )}
                                onChange={(e) =>
                                    onCalChangeEDT_KSV_PO_MRP(
                                        e,
                                        "DUE_DATE",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "15rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>MRP Date</p>
                        <div className="af-span-div" style={{ width: "8rem" }}>
                            <Calendar
                                showButtonBar
                                disabled
                                style={{ width: "9rem" }}
                                dateFormat="yy-mm-dd"
                                id="id_S_PO_DATE"
                                value={changeDateVal(
                                    dataEDT_KSV_PO_MRP.MRP_DATE,
                                )}
                                onChange={(e) =>
                                    onCalChangeEDT_KSV_PO_MRP(
                                        e,
                                        "MRP_DATE",
                                    )
                                }
                            />
                        </div>
                    </span>

                    <span className="af-span-3-0" style={{ width: "15rem" }}>
                        <p className="af-span-p" style={{ width: "5rem" }}>Normi</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <Dropdown
                                style={{ width: "9rem" }}
                                id="id_PO_CD"
                                filter
                                value={dataEDT_KSV_PO_MRP_NORMI}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_PO_MRP(
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

                    <span className="af-span-3-0" style={{ width: "16rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>Over/Short</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <InputText
                                disabled
                                style={{ width: "9rem" }}
                                id="id_TARGET_ETA"
                                value={dataEDT_KSV_PO_MRP.OVER_SHORT}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MRP(
                                        e,
                                        "OVER_SHORT",
                                    )
                                }
                            />
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "15rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>Bill to</p>
                        <div className="af-span-div" style={{ width: "8rem" }}>
                            <Dropdown
                                style={{ width: "8rem" }}
                                id="id_PO_CD"
                                filter
                                value={dataEDT_KSV_PO_MRP_BILL_TO}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_PO_MRP(
                                        e,
                                        "BILL_TO",
                                    )
                                }
                                options={datasEDT_KSV_PO_MRP_BILL_TO}
                                optionLabel="CD_NAME"
                                placeholder=""
                                editable
                            ></Dropdown>
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "15rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>Order Date</p>
                        <div className="af-span-div" style={{ width: "8rem" }}>
                            <Calendar
                                showButtonBar
                                style={{ width: "9rem" }}
                                dateFormat="yy-mm-dd"
                                id="id_S_PO_DATE"
                                value={changeDateVal(
                                    dataEDT_KSV_PO_MRP.ORDER_DATE,
                                )}
                                onChange={(e) =>
                                    onCalChangeEDT_KSV_PO_MRP(
                                        e,
                                        "ORDER_DATE",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "15rem" }}>
                        <p className="af-span-p" style={{ width: "5rem" }}>Curr</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <Dropdown
                                style={{ width: "9rem" }}
                                id="id_PO_CD"
                                filter
                                value={dataEDT_KSV_PO_MRP_CURR_CD}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_PO_MRP(
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
                    <span className="af-span-3" style={{ width: "16rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>PI#</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <InputText
                                style={{ width: "9rem" }}
                                id="id_TARGET_ETA"
                                value={dataEDT_KSV_PO_MRP.PI_NO}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MRP(
                                        e,
                                        "PI_NO",
                                    )
                                }
                            />
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "15rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>Ready Date</p>
                        <div className="af-span-div" style={{ width: "8rem" }}>
                            <Calendar
                                showButtonBar
                                style={{ width: "9rem" }}
                                dateFormat="yy-mm-dd"
                                id="id_S_PO_DATE"
                                value={changeDateVal(
                                    dataEDT_KSV_PO_MRP.EX_FACTORY,
                                )}
                                onChange={(e) =>
                                    onCalChangeEDT_KSV_PO_MRP(
                                        e,
                                        "EX_FACTORY",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "15rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>Target ETA</p>
                        <div className="af-span-div" style={{ width: "8rem" }}>
                            <Calendar
                                disabled
                                showButtonBar
                                style={{ width: "9rem" }}
                                dateFormat="yy-mm-dd"
                                id="id_S_PO_DATE"
                                value={changeDateVal(
                                    dataEDT_KSV_PO_MRP.TARGET_ETA,
                                )}
                                onChange={(e) =>
                                    onCalChangeEDT_KSV_PO_MRP(
                                        e,
                                        "TARGET_ETA",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "15rem" }}>
                        <p className="af-span-p" style={{ width: "5rem" }}>Amount</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <InputText
                                disabled
                                style={{ width: "9rem" }}
                                id="id_TARGET_ETA"
                                value={dataEDT_KSV_PO_MRP.PAY_AMT}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MRP(
                                        e,
                                        "PAY_AMT",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "16rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>PI</p>
                        <div className="af-span-div" style={{ width: "7rem" }}>
                            <InputText
                                disabled
                                style={{ width: "7rem" }}
                                id="id_TARGET_ETA"
                                value={dataEDT_KSV_PO_MRP.PI_FILE}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MRP(
                                        e,
                                        "PI_FILE",
                                    )
                                }
                            />
                        </div>
                        <div className="af-span-div" style={{ width: "1rem" }}>
                            <Button
                                label=""
                                icon="pi pi-arrow-down"
                                style={{ width: "1rem" }}
                                className="p-button-text"
                                onClick={onDownloadFile}
                            />
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "15rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>Pay Date</p>
                        <div className="af-span-div" style={{ width: "8rem" }}>
                            <Calendar
                                showButtonBar
                                style={{ width: "8rem" }}
                                dateFormat="yy-mm-dd"
                                id="id_S_PO_DATE"
                                value={changeDateVal(
                                    dataEDT_KSV_PO_MRP.PAY_DATE,
                                )}
                                onChange={(e) =>
                                    onCalChangeEDT_KSV_PO_MRP(
                                        e,
                                        "PAY_DATE",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "30rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>Forwarder</p>
                        <div
                            className="af-span-div"
                            style={{ width: "23.5rem" }}
                        >
                            <Dropdown
                                style={{ width: "23.5rem" }}
                                id="id_PO_CD"
                                filter
                                value={dataEDT_KSV_PO_MRP_FORWARDER}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_PO_MRP_FORWARDER(
                                        e,
                                        "FORWARDER",
                                    )
                                }
                                options={datasEDT_KSV_PO_MRP_FORWARDER}
                                optionLabel="PLACE_NAME"
                                placeholder=""
                                editable
                            ></Dropdown>
                        </div>
                    </span>

                    <span className="af-span-3-2" style={{ width: "16rem" }}>
                        <p className="af-span-p" style={{ width: "7.5rem" }}> </p>

                        <div
                            className="af-span-div-btn"
                            style={{ width: "7rem" }}
                        >
                            <button style={{ width: "7rem", height: "1.5rem" }}>
                                <label
                                    className="inputFileCustom"
                                    for="inputFileAdd"
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

                    <span className="af-span-3" style={{ width: "61rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>PO#</p>
                        <div className="af-span-div" style={{ width: "54rem" }}>
                            <InputText
                                disabled
                                style={{ width: "54rem" }}
                                id="id_TARGET_ETA"
                                value={dataEDT_KSV_PO_MRP.PO_CD1}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MRP(
                                        e,
                                        "PO_CD1",
                                    )
                                }
                            />
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "45rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>PO#</p>
                        <div className="af-span-div" style={{ width: "38rem" }}>
                            <InputText
                                disabled
                                style={{ width: "38rem" }}
                                id="id_TARGET_ETA"
                                value={dataEDT_KSV_PO_MRP.PO_CD2}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MRP(
                                        e,
                                        "PO_CD2",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-2" style={{ width: "16rem" }}>
                        <p className="af-span-p" style={{ width: "10rem" }}> {dataTBL_KSV_PO_MRP1.PU_STATUS}</p>
                    </span>

                    <span className="af-span-3" style={{ width: "15rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>Purchaser</p>
                        <div className="af-span-div" style={{ width: "8rem" }}>
                            <InputText
                                disabled
                                style={{ width: "9rem" }}
                                id="id_TARGET_ETA"
                                value={dataEDT_KSV_PO_MRP.REG_USER}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MRP(
                                        e,
                                        "REG_USER",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "15rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>Ship To</p>
                        <div className="af-span-div" style={{ width: "8rem" }}>
                            <InputText
                                disabled
                                style={{ width: "9rem" }}
                                id="id_TARGET_ETA"
                                value={dataEDT_KSV_PO_MRP.SHIP_TO}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MRP(
                                        e,
                                        "SHIP_TO",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "15rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>Origin Port</p>
                        <div className="af-span-div" style={{ width: "8rem" }}>
                            <Dropdown
                                style={{ width: "8rem" }}
                                id="id_PO_CD"
                                filter
                                value={dataEDT_KSV_PO_MRP_ORIGIN_PORT}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_PO_MRP(
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
                    <span className="af-span-3" style={{ width: "15rem" }}>
                        <p className="af-span-p" style={{ width: "5rem" }}>Term</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <Dropdown
                                style={{ width: "9rem" }}
                                id="id_PO_CD"
                                filter
                                value={dataEDT_KSV_PO_MRP_TRADE_TERM}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_PO_MRP(
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

                    <span className="af-span-3" style={{ width: "27rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>Pay Type</p>
                        <div className="af-span-div" style={{ width: "20rem" }}>
                            <InputText
                                disabled
                                style={{ width: "20rem" }}
                                id="id_TARGET_ETA"
                                value={dataEDT_KSV_PO_MRP.PAY_TYPE}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MRP(
                                        e,
                                        "PAY_TYPE",
                                    )
                                }
                            />
                        </div>
                    </span>
                </div>

                <div
                    className="af-div-first"
                    style={{ width: "29rem", height: "26rem" }}
                >
                    <span className="af-span-3-2" style={{ width: "15rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "14rem" }}
                        >
                            <Button
                                label="Memo Update"
                                style={{ width: "14rem" }}
                                className="p-button-text"
                                onClick={process_UPDATE_MEMO}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-2" style={{ width: "10rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "9rem" }}
                        >
                            <Button
                                label="Excel"
                                style={{ width: "9rem" }}
                                className="p-button-text green"
                                onClick={exportExcelTBL_KSV_PO_MRP2}
                            />
                        </div>
                    </span>
                    <span
                        className="af-span-3-0"
                        style={{ width: "29rem", height: "20.5rem" }}
                    >
                        <div
                            className="af-span-div"
                            style={{ width: "27rem", height: "20.5rem" }}
                        >
                            <InputTextarea
                                rows={18}
                                cols={1}
                                style={{ height: "20.5rem", width: "27rem" }}
                                id="id_TARGET_ETA"
                                value={dataEDT_KSV_PO_MRP0.MEMO}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MRP0(e, "MEMO")
                                }
                            />
                        </div>
                    </span>

                    <span className="af-span-3-2" style={{ width: "29rem" }}>
                        <div
                            className="af-span-div"
                            style={{
                                width: "25rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                            }}
                        >
                            <p
                                className="af-span-p"
                                style={{ width: "3rem", alignItems: "center" }}
                            >Curr</p>
                            <Dropdown
                                style={{ width: "8rem" }}
                                id="id_PO_CD"
                                filter
                                value={dataEDT_KSV_PO_MRP_CURR_CD2}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_PO_MRP(
                                        e,
                                        "CURR_CD2",
                                    )
                                }
                                options={datasEDT_KSV_PO_MRP_CURR_CD2}
                                optionLabel="CD_NAME"
                                placeholder=""
                                editable
                            ></Dropdown>
                            <InputText
                                style={{ width: "9rem" }}
                                value={dataEDT_PRICE_UPDATE}
                                onChange={(e) =>
                                    setDataEDT_PRICE_UPDATE(e.target.value)
                                }
                            />

                            <Button
                                label="Price Update"
                                style={{ width: "8rem" }}
                                className="p-button-text"
                                onClick={priceUpdate}
                            />
                        </div>
                    </span>
                </div>
                <div
                    className="af-div-second"
                    style={{ width: "31rem", height: "26rem" }}
                >
                    <span
                        className="af-span-3-2"
                        style={{ width: "30rem", paddingTop: "3px" }}
                    >
                        <Button
                            label="PO SHEET Basic"
                            style={{ width: "9rem" }}
                            className="p-button-text green"
                            onClick={() => search_PURCHASE_REPORT("BASIC")}
                        />

                        <Button
                            label="PO SHEET Detail"
                            style={{ width: "9rem" }}
                            className="p-button-text green"
                            onClick={() => search_PURCHASE_REPORT("DETAIL")}
                        />

                        <Button
                            label="PO SHEET BVT"
                            style={{ width: "9rem" }}
                            className="p-button-text green"
                            onClick={() => search_PURCHASE_REPORT("BVT")}
                        />
                    </span>
                    <span
                        className="af-span-3-0"
                        style={{
                            width: "27rem",
                            height: "11rem",
                            marginLeft: "1rem",
                        }}
                    >
                        <AFDataTable 
                            ref={dt_TBL_KSV_PO_MRP0}
                            editMode="cell"
                            size="small"
                            value={datasTBL_KSV_PO_MRP0}
                            tableStyle={{ tableLayout: "fixed" }}
                            resizableColumns
                            columnResizeMode="expand"
                            loading={loadingTBL_KSV_PO_MRP0}
                            showGridlines
                            selectionMode="checkbox"
                            selection={selectedTBL_KSV_PO_MRP0}
                            onSelectionChange={(e) => {
                                setSelectedTBL_KSV_PO_MRP0(e.value);
                            }}
                            onRowClick={onRowClickTBL_KSV_PO_MRP0}
                            dataKey="id"
                            className="datatable-responsive"
                            onRowDoubleClick={onRowDoubleClickTBL_KSV_PO_MRP0}
                            virtualScrollerOptions={{ itemSize: 20 }}
                            emptyMessage=" " //header={headerTBL_KSV_PO_MRP0}
                            responsiveLayout="scroll"
                            scrollable
                            scrollHeight="11rem"
                        >
                            {/*
                             */}
                            <AFColumn className="af-col" style={{ width: "3rem" }} field="PU_SEQ" headerClassName="t-header" header="PU Ver" ></AFColumn>
                            <AFColumn className="af-col" style={{ width: "3rem" }} field="PO_SEQ" headerClassName="t-header" header="Po Seq" ></AFColumn>
                            <AFColumn className="af-col" style={{ width: "10rem" }} field="PO_CD" headerClassName="t-header" header="PO#" ></AFColumn>
                            <AFColumn className="af-col" style={{ width: "6rem" }} field="SEND_DATETIME" headerClassName="t-header" header="Send Date" body={(row) => serviceLib.dateFormat(row.SEND_DATETIME) }></AFColumn>
                            <AFColumn className="af-col" style={{ width: "8rem" }} field="SEND_USER" headerClassName="t-header" header="User" ></AFColumn>
                            <AFColumn className="af-col" style={{ width: "20rem" }} field="SEND_FILENAME" headerClassName="t-header" header="File" ></AFColumn>
                        </AFDataTable>
                    </span>
                    <span className="af-span-3-0" style={{ width: "28rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>T/T Amt</p>
                        <div className="af-span-div" style={{ width: "8rem" }}>
                            <InputText
                                disabled
                                className="text-right"
                                style={{ width: "8rem" }}
                                id="id_TARGET_ETA"
                                value={serviceLib.formatNumber(
                                    dataEDT_KSV_PO_MRP0.TT_AMT,
                                    4,
                                )}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MRP0(
                                        e,
                                        "TT_AMT",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "28rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>L/C Amt</p>
                        <div className="af-span-div" style={{ width: "8rem" }}>
                            <InputText
                                disabled
                                className="text-right"
                                style={{ width: "8rem" }}
                                id="id_TARGET_ETA"
                                value={serviceLib.formatNumber(
                                    dataEDT_KSV_PO_MRP0.LC_AMT,
                                    4,
                                )}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MRP0(
                                        e,
                                        "LC_AMT",
                                    )
                                }
                            />
                        </div>
                        <div className="af-span-div" style={{ width: "4rem" }}>
                            <InputText
                                disabled
                                style={{ width: "4rem" }}
                                id="id_TARGET_ETA"
                                value={dataEDT_KSV_PO_MRP0.LC_CURR}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MRP0(
                                        e,
                                        "LC_CURR",
                                    )
                                }
                            />
                        </div>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "8rem" }}
                        >
                            <Button
                                label="L/C"
                                style={{ width: "8rem" }}
                                className="p-button-text orange"
                                onClick={popup_REQUEST_LC}
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "28rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>Deposit Amt</p>
                        <div className="af-span-div" style={{ width: "8rem" }}>
                            <InputText
                                disabled
                                className="text-right"
                                style={{ width: "8rem" }}
                                id="id_TARGET_ETA"
                                value={serviceLib.formatNumber(
                                    dataEDT_KSV_PO_MRP0.DEPOSIT_AMT,
                                    4,
                                )}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MRP0(
                                        e,
                                        "DEPOSIT_AMT",
                                    )
                                }
                            />
                        </div>
                        <div className="af-span-div" style={{ width: "4rem" }}>
                            <InputText
                                disabled
                                style={{ width: "4rem" }}
                                id="id_TARGET_ETA"
                                value={dataEDT_KSV_PO_MRP0.DEPOSIT_CURR}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MRP0(
                                        e,
                                        "DEPOSIT_CURR",
                                    )
                                }
                            />
                        </div>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "8rem" }}
                        >
                            <Button
                                label="Deposit"
                                style={{ width: "8rem" }}
                                className="p-button-text orange"
                                onClick={popup_REQUEST_DEPOSIT}
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "28rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>Debit Amt</p>
                        <div className="af-span-div" style={{ width: "8rem" }}>
                            <InputText
                                disabled
                                className="text-right"
                                style={{ width: "8rem" }}
                                id="id_TARGET_ETA"
                                value={serviceLib.formatNumber(
                                    dataEDT_KSV_PO_MRP0.DEBIT_AMT,
                                    4,
                                )}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MRP0(
                                        e,
                                        "DEBIT_AMT",
                                    )
                                }
                            />
                        </div>
                        <div className="af-span-div" style={{ width: "4rem" }}>
                            <InputText
                                disabled
                                style={{ width: "4rem" }}
                                id="id_TARGET_ETA"
                                value={dataEDT_KSV_PO_MRP0.DEBIT_CURR}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MRP0(
                                        e,
                                        "DEBIT_CURR",
                                    )
                                }
                            />
                        </div>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "8rem" }}
                        >
                            <Button
                                label="Debit"
                                style={{ width: "8rem" }}
                                className="p-button-text orange"
                                onClick={popup_INSERT_DEBIT}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "28rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "6rem" }}
                        >
                            <Button
                                label="Save"
                                disabled={isEdit}
                                style={{ width: "6rem" }}
                                className="p-button-text"
                                onClick={process_INSERT_PU_MST_1}
                            />
                        </div>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "6rem" }}
                        >
                            <Button
                                label="Cancel"
                                disabled={isEdit}
                                style={{ width: "6rem" }}
                                className="p-button-text"
                                onClick={process_DELETE_PU_MST}
                            />
                        </div>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "6rem" }}
                        >
                            <Button
                                label="Stock Apply"
                                style={{ width: "6rem" }}
                                className="p-button-text orange"
                                onClick={popup_STOCK_APPLY}
                            />
                        </div>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "6rem" }}
                        >
                            <Button
                                label="Material"
                                style={{ width: "6rem" }}
                                className="p-button-text orange"
                                onClick={popup_MATL_MST}
                            />
                        </div>
                    </span>
                </div>
            </div>

            <div
                className="af-div-first"
                style={{ width: "100%", height: "35rem" }}
            >
                <ContextMenu
                    model={menuModel}
                    ref={cm}
                    onHide={() => search_LIST_3({})}
                />
                <AFDataTable 
                    ref={dt_TBL_KSV_PO_MRP2}
                    editMode="cell"
                    size="small"
                    value={datasTBL_KSV_PO_MRP2}
                    onContextMenu={(e) => cm.current.show(e.originalEvent)}
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
                    onRowDoubleClick={onRowDoubleClickTBL_KSV_PO_MRP2}
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" " //header={headerTBL_KSV_PO_MRP2}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="flex"
                >
                    <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "3rem" }} ></AFColumn>

                    <AFColumn className="af-col" style={{ width: "4rem" }} field="PU_STATUS" headerClassName="t-header" header="Status" ></AFColumn>
                    <AFColumn className="af-col orange" style={{ width: "6rem" }} field="PO_CD" headerClassName="t-header" header="PO#" ></AFColumn>
                    <AFColumn className="af-col" style={{ width: "2rem" }} field="PO_SEQ" headerClassName="t-header" header="Seq" ></AFColumn>
                    <AFColumn className="af-col orange" style={{ width: "6rem" }} field="MATL_CD" headerClassName="t-header" header="Matl#" ></AFColumn>
                    <AFColumn className="af-col orange" style={{ width: "10rem" }} field="MATL_NAME" headerClassName="t-header" header="Description" ></AFColumn>
                    <AFColumn className="af-col" style={{ width: "10rem" }} field="COLOR" headerClassName="t-header" header="Color" ></AFColumn>
                    <AFColumn className="af-col" style={{ width: "10rem" }} field="SPEC" headerClassName="t-header" header="Spec" ></AFColumn>
                    <AFColumn className="af-col" style={{ width: "4rem" }} field="UNIT" headerClassName="t-header" header="Unit" ></AFColumn>
                    <AFColumn className="af-col" style={{ width: "6rem" }} field="MRP_QTY" headerClassName="t-header" header="MRP Qty" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.MRP_QTY, 2) } ></AFColumn>
                    <AFColumn className="af-col" style={{ width: "6rem" }} field="STOCK_QTY" headerClassName="t-header" header="Stock" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.STOCK_QTY, 2) } bodyClassName={(rowData) => rowData.STOCK_QTY > 0 ? "tableRed" : "" } ></AFColumn>
                    <AFColumn className="af-col" style={{ width: "6rem" }} field="MOQ_QTY" headerClassName="t-header" header="MOQ" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.MOQ_QTY, 2) } ></AFColumn>
                    <AFColumn className="af-col" style={{ width: "6rem" }} field="OVER_QTY" headerClassName="t-header" header="Over In" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.OVER_QTY, 2) } ></AFColumn>

                    <AFColumn className="af-col" style={{ width: "6rem" }} field="FOC_QTY" headerClassName="t-header" header="Foc" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.FOC_QTY, 2) } ></AFColumn>
                    <AFColumn className="af-col" style={{ width: "6rem" }} field="BEF_PO_QTY" headerClassName="t-header" header="Old Qty" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.BEF_PO_QTY, 2) } ></AFColumn>

                    <AFColumn className="af-col" style={{ width: "6rem" }} headerStyle={{ color: "green" }} field="PO_UPDATE_QTY" headerClassName="t-header" header="New Po Qty" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.PO_UPDATE_QTY, 2) } editor={(options) => cellEditorKSV_PO_MRP2(options)} onCellEditComplete={onCellEditCompleteKSV_PO_MRP2} ></AFColumn>
                    <AFColumn className="af-col" style={{ width: "6rem" }} field="DIFF_QTY" headerClassName="t-header" header="Changed Qty" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.DIFF_QTY, 2) } ></AFColumn>
                    <AFColumn className="af-col" style={{ width: "3rem" }} field="CURR_CD" headerClassName="t-header" header="Curr" ></AFColumn>
                    <AFColumn className="af-col" style={{ width: "6rem" }} field="MASTER_PRICE" headerStyle={{ color: "green" }} headerClassName="t-header" header="Master P" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.MASTER_PRICE, 4) } editor={(options) => cellEditorKSV_PO_MRP2(options)} onCellEditComplete={onCellEditCompleteKSV_PO_MRP2} ></AFColumn>
                    <AFColumn className="af-col" style={{ width: "6rem" }} field="SURCHARGE_PRICE" headerClassName="t-header" header="Sur P" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.SURCHARGE_PRICE, 4) } ></AFColumn>
                    <AFColumn className="af-col" style={{ width: "6rem" }} field="PO_PRICE" headerClassName="t-header" header="PO P" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.PO_PRICE, 4) } ></AFColumn>
                    <AFColumn className="af-col" style={{ width: "6rem" }} headerStyle={{ color: "green" }} field="SURCHARGE_AMT" headerClassName="t-header" header="Surcharge" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.SURCHARGE_AMT, 4) } editor={(options) => cellEditorKSV_PO_MRP2(options)} onCellEditComplete={onCellEditCompleteKSV_PO_MRP2} ></AFColumn>
                    <AFColumn className="af-col" style={{ width: "10rem" }} headerStyle={{ color: "green" }} field="SURCHARGE_REMARK" headerClassName="t-header" header="Remark" editor={(options) => cellEditorKSV_PO_MRP2(options)} onCellEditComplete={onCellEditCompleteKSV_PO_MRP2} ></AFColumn>
                    <AFColumn className="af-col" style={{ width: "10rem" }} field="MIN_CONF_USER" headerClassName="t-header" header="Moq Confirm" ></AFColumn>
                </AFDataTable>
            </div>

            {/* REVISE Dialog */}
            <Dialog
                visible={createDialogRevise}
                position="mid-center"
                style={{
                    overflow: "hidden",
                    width: "110rem",
                    height: "50rem",
                    marginLeft: "0rem",
                    marginTop: "0rem",
                    paddingLeft: "0rem",
                    paddingTop: "0rem",
                }}
                header="Revise"
                modal={true}
                className="p-fluid"
                onHide={hideDialogRevise}
            >
                <div
                    className="af-div-first"
                    style={{ width: "100%", height: "45rem" }}
                >
                    <AFDataTable 
                        ref={dt_TBL_KSV_PO_MST}
                        size="small"
                        value={datasTBL_KSV_PO_MST}
                        loading={loadingTBL_KSV_PO_MST}
                        tableStyle={{ tableLayout: "fixed" }}
                        resizableColumns
                        columnResizeMode="expand"
                        showGridlines
                        selectionMode="checkbox"
                        selection={selectedTBL_KSV_PO_MST}
                        // onSelectionChange={(e) => { setFlagSelectModeTBL_KSV_PO_MST(true); setSelectedTBL_KSV_PO_MST(e.value); console.log('selected length:' + selectedTBL_KSV_PO_MST.length); onRowClick1TBL_KSV_PO_MST(e.value); }}
                        // onRowClick={onRowClickTBL_KSV_PO_MST} dataKey="id" className="datatable-responsive"
                        // onRowDoubleClick={onRowDoubleClickTBL_KSV_PO_MST}
                        virtualScrollerOptions={{ itemSize: 20 }}
                        emptyMessage=" "
                        //header={headerTBL_KSV_PO_MST}
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="22rem"
                    >
                        <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "3rem" }} ></AFColumn>

                        <AFColumn field="PO_CD" headerClassName="t-header" header="Po#" style={{ width: "5rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="PO_SEQ" headerClassName="t-header" header="Po Seq" style={{ width: "5rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="ORDER_CD" headerClassName="t-header" header="Order" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="MATL_CD" headerClassName="t-header" header="Matl Cd" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="MATL_NAME" headerClassName="t-header" header="Description" style={{ width: "15rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="COLOR" headerClassName="t-header" header="Color" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="SPEC" headerClassName="t-header" header="Spec" style={{ width: "15rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="USE_PO_TYPE_N" headerClassName="t-header" header="Po Type" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="USE_QTY" headerClassName="t-header" header="Use Qty" style={{ width: "7rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.USE_QTY, 2) } ></AFColumn>
                        <AFColumn field="PO_QTY" headerClassName="t-header" header="Po Qty" style={{ width: "7rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.PO_QTY, 2) } ></AFColumn>
                        <AFColumn field="OLD_QTY" headerClassName="t-header" header="Old Qty" style={{ width: "7rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.OLD_QTY, 2) } ></AFColumn>
                        <AFColumn field="NEW_QTY" headerClassName="t-header" header="New Qty" style={{ width: "7rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.NEW_QTY, 2) } ></AFColumn>
                        <AFColumn field="DIFF_QTY" headerClassName="t-header" header="Diff Qty" headerStyle={{ color: "green" }} style={{ width: "7rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.DIFF_QTY, 2) } ></AFColumn>
                        <AFColumn field="DIFF_PO_TYPE_N" headerClassName="t-header" header="Diff.Po.T" style={{ width: "7rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} ></AFColumn>
                        <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Supplier" style={{ width: "15rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="MRP_SEQ" headerClassName="t-header" header="Mrp Seq" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="MATL_PRICE" headerClassName="t-header" header="Matl Price" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="CURR_CD" headerClassName="t-header" header="Curr" style={{ width: "5rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="TOT_AMT" headerClassName="t-header" header="Tot Amt" style={{ width: "7rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="USE_SIZE" headerClassName="t-header" header="Use Size" style={{ width: "7rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="ORDER_STATUS" headerClassName="t-header" header="Order.S" style={{ width: "7rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="SEQ" headerClassName="t-header" header="Seq" style={{ width: "5rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="SEND_DATETIME" headerClassName="t-header" header="Send" style={{ width: "5rem", flexBasis: "auto" }} ></AFColumn>
                    </AFDataTable>
                </div>
            </Dialog>

            {/* Stock Check Dialog */}
            <Dialog
                visible={createDialogStockCheck}
                position="mid-center"
                style={{
                    overflow: "hidden",
                    width: "110rem",
                    height: "50rem",
                    marginLeft: "0rem",
                    marginTop: "0rem",
                    paddingLeft: "0rem",
                    paddingTop: "0rem",
                }}
                header="Stock Check"
                modal={true}
                className="p-fluid"
                onHide={hideDialogStockCheck}
            >
                <div
                    className="af-div-first"
                    style={{ width: "100%", height: "40rem" }}
                >
                    <AFDataTable 
                        ref={dt_TBL_KSV_ORDER_MEM}
                        editMode="cell"
                        size="small"
                        value={datasTBL_KSV_ORDER_MEM}
                        tableStyle={{ tableLayout: "fixed" }}
                        resizableColumns
                        columnResizeMode="expand"
                        showGridlines
                        selectionMode="checkbox"
                        selection={selectedTBL_KSV_ORDER_MEM}
                        loading={loadingTBL_KSV_ORDER_MEM}
                        onSelectionChange={(e) => {
                            setSelectedTBL_KSV_ORDER_MEM(e.value);
                            onRowClick1TBL_KSV_ORDER_MEM(e.value);
                        }}
                        onRowClick={onRowClickTBL_KSV_ORDER_MEM}
                        dataKey="id"
                        className="datatable-responsive"
                        virtualScrollerOptions={{ itemSize: 20 }}
                        emptyMessage=" " //header={headerTBL_KSV_ORDER_MEM}
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="40rem"
                    >
                        <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "3rem" }} ></AFColumn>

                        <AFColumn field="STOCK_CHK" headerClassName="t-header" header="Stock.Chk" style={{ width: "3rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="PO_CD" headerClassName="t-header" header="PO#" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="ORDER_CD" headerClassName="t-header" header="Order#" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="PO_MATL_CD" headerClassName="t-header" header="Matl#" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="USE_QTY" headerClassName="t-header" header="MRP Qty" style={{ width: "8rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.USE_QTY, 2) } ></AFColumn>
                        <AFColumn field="PO_QTY" headerClassName="t-header" header="Po Qty" style={{ width: "5rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.PO_QTY, 2) } ></AFColumn>
                        <AFColumn field="SUM_QTY" headerClassName="t-header" header="Bal Qty" style={{ width: "5rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.SUM_QTY, 2) } ></AFColumn>
                        <AFColumn field="CANCEL_QTY" headerClassName="t-header" header="Cancel Qty" style={{ width: "5rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.CANCEL_QTY, 2) } editor={(options) => cellEditorKSV_ORDER_MEM(options) } onCellEditComplete={onCellEditCompleteKSV_ORDER_MEM} ></AFColumn>
                        <AFColumn field="CANCEL_REASON" headerClassName="t-header" header="Cancel Reason" style={{ width: "10rem", color: "green" }} editor={(options) => cellEditorKSV_ORDER_MEM(options) } onCellEditComplete={onCellEditCompleteKSV_ORDER_MEM} ></AFColumn>
                        <AFColumn field="STOCK_PO_CD" headerClassName="t-header" header="Stock PO#" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="STOCK_PO_SEQ" headerClassName="t-header" header="Stock PO Seq#" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="MATL_CD" headerClassName="t-header" header="Stock Matl#" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="MATL_NAME" headerClassName="t-header" header="Description" style={{ width: "15rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="COLOR" headerClassName="t-header" header="Color" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="SPEC" headerClassName="t-header" header="Spec" style={{ width: "15rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="UNIT" headerClassName="t-header" header="Unit" style={{ width: "5rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="RACK" headerClassName="t-header" header="Rack" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="USE_PO_TYPE_N" headerClassName="t-header" header="I/O Stat" style={{ width: "9rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Supplier" style={{ width: "14rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="MRP_SEQ" headerClassName="t-header" header="Mrp Seq" style={{ width: "7rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="MATL_SEQ" headerClassName="t-header" header="Matl Seq" style={{ width: "7rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="MATL_PRICE" headerClassName="t-header" header="M Price" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.MATL_PRICE, 4) } ></AFColumn>
                        <AFColumn field="CURR_CD" headerClassName="t-header" header="Curr" style={{ width: "5rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="PO_MRP_SEQ" headerClassName="t-header" header="Po Mrp Seq" style={{ width: "8rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.PO_MRP_SEQ, 0) } ></AFColumn>
                        <AFColumn field="REG_DATETIME" headerClassName="t-header" header="Reg Date" style={{ width: "10rem", flexBasis: "auto" }} body={(rowData) => serviceLib.dateFormatHMS(rowData.REG_DATETIME) } ></AFColumn>
                        <AFColumn field="STOCK_IDX" headerClassName="t-header" header="Stock Idx" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="ROOT_IDX" headerClassName="t-header" header="Root Idx" style={{ width: "9rem", flexBasis: "auto" }} ></AFColumn>
                    </AFDataTable>
                </div>

                <div
                    className="af-div-first"
                    style={{ width: "99rem", height: "3rem" }}
                >
                    <span className="af-span-3-2" style={{ width: "11rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "10rem" }}
                        >
                            <Button
                                label="Stock Cancel"
                                style={{ width: "10rem" }}
                                className="p-button-text"
                                onClick={cancelStock}
                            />
                        </div>
                    </span>
                </div>
            </Dialog>

            {/* Deposit Dialog */}
            <Dialog
                visible={createDialog2}
                position="mid-center"
                style={{
                    overflow: "hidden",
                    width: "43rem",
                    height: "23rem",
                    marginLeft: "0rem",
                    marginTop: "0rem",
                    paddingLeft: "0rem",
                    paddingTop: "0rem",
                }}
                header="Deposit Req"
                modal={true}
                className="p-fluid"
                onHide={hideDialog2}
            >
                <div
                    className="af-div-first"
                    style={{ width: "100%", height: "15rem" }}
                >
                    <span className="af-span-3-0" style={{ width: "19rem" }}>
                        <p className="af-span-p" style={{ width: "8rem" }}>Purchaser</p>
                        <div className="af-span-div" style={{ width: "10rem" }}>
                            <InputText
                                disabled
                                style={{ width: "10rem" }}
                                id="id_TARGET_ETA"
                                value={dataEDT_KSV_PO_MRP2.REG_USER}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MRP2(
                                        e,
                                        "REG_USER",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "19rem" }}>
                        <p className="af-span-p" style={{ width: "8rem" }}>Supplier</p>
                        <div className="af-span-div" style={{ width: "10rem" }}>
                            <InputText
                                disabled
                                style={{ width: "10rem" }}
                                id="id_TARGET_ETA"
                                value={dataEDT_KSV_PO_MRP2.VENDOR_NAME}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MRP2(
                                        e,
                                        "VENDOR_NAME",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "19rem" }}>
                        <p className="af-span-p" style={{ width: "8rem" }}>Pay Cond</p>
                        <div className="af-span-div" style={{ width: "10rem" }}>
                            <InputText
                                disabled
                                style={{ width: "10rem" }}
                                id="id_TARGET_ETA"
                                value={dataEDT_KSV_PO_MRP2.PAY_CONDITION}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MRP2(
                                        e,
                                        "PAY_CONDITION",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "19rem" }}>
                        <p className="af-span-p" style={{ width: "8rem" }}>Currency</p>
                        <div className="af-span-div" style={{ width: "10rem" }}>
                            <InputText
                                disabled
                                style={{ width: "10rem" }}
                                id="id_TARGET_ETA"
                                value={dataEDT_KSV_PO_MRP2.CURRENCY}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MRP2(
                                        e,
                                        "CURRENCY",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "19rem" }}>
                        <p className="af-span-p" style={{ width: "8rem" }}>Amount</p>
                        <div className="af-span-div" style={{ width: "10rem" }}>
                            <InputNumber
                                disabled
                                minFractionDigits={2}
                                maxFractionDigits={2}
                                style={{ width: "10rem" }}
                                id="id_TARGET_ETA"
                                value={dataEDT_KSV_PO_MRP2.AMOUNT}
                                onValueChange={(e) =>
                                    onInputNumberChangeEDT_KSV_PO_MRP2_AMOUNT(
                                        e,
                                        "AMOUNT",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "19rem" }}>
                        <p className="af-span-p" style={{ width: "8rem" }}>Deposit Amt</p>
                        <div className="af-span-div" style={{ width: "10rem" }}>
                            <InputNumber
                                disabled
                                minFractionDigits={2}
                                maxFractionDigits={2}
                                style={{ width: "10rem" }}
                                id="id_TARGET_ETA"
                                value={dataEDT_KSV_PO_MRP2.DEPOSIT_AMOUNT}
                                onValueChange={(e) =>
                                    onInputNumberChangeEDT_KSV_PO_MRP2_DEPOSIT_AMOUNT(
                                        e,
                                        "DEPOSIT_AMOUNT",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "40rem" }}>
                        <p className="af-span-p" style={{ width: "8rem" }}>Deposit Rate</p>
                        <div className="af-span-div" style={{ width: "11rem" }}>
                            <span>
                                <InputText
                                    style={{ width: "10rem" }}
                                    id="id_TARGET_ETA"
                                    value={dataEDT_KSV_PO_MRP2.DEPOSIT_RATE}
                                    onChange={(e) =>
                                        onInputChangeEDT_KSV_PO_MRP2_DEPOSIT_RATE(
                                            e,
                                            "DEPOSIT_RATE",
                                        )
                                    }
                                />
                                %
                            </span>
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "40rem" }}>
                        <p className="af-span-p" style={{ width: "8rem" }}>Pay Bank</p>
                        <div className="af-span-div" style={{ width: "31rem" }}>
                            <Dropdown
                                style={{ width: "31rem" }}
                                id="id_NORMI"
                                value={dataEDT_KSV_PO_MRP2_PAY_BANK}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_PO_MRP2(
                                        e,
                                        "PAY_BANK",
                                    )
                                }
                                options={datasEDT_KSV_PO_MRP2_PAY_BANK}
                                optionLabel="BANK_NAME"
                                placeholder=""
                                editable
                            ></Dropdown>
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "39rem" }}>
                        <p className="af-span-p" style={{ width: "8rem" }}>Pay Date</p>
                        <div className="af-span-div" style={{ width: "10rem" }}>
                            <Calendar
                                showButtonBar
                                style={{ width: "10rem" }}
                                dateFormat="yy-mm-dd"
                                id="id_S_PO_DATE"
                                value={changeDateVal(
                                    dataEDT_KSV_PO_MRP2.PAY_DATE,
                                )}
                                onChange={(e) =>
                                    onCalChangeEDT_KSV_PO_MRP2(
                                        e,
                                        "PAY_DATE",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "19rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "18rem" }}
                        >
                            <Button
                                style={{ width: "18rem" }}
                                label="Save"
                                className="p-button-text"
                                onClick={process_UPDATE_DEPOSIT}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "19rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "18rem" }}
                        >
                            <Button
                                style={{ width: "18rem" }}
                                label="Exit"
                                className="p-button-text"
                                onClick={hideDialog2}
                            />
                        </div>
                    </span>
                </div>
            </Dialog>

            {/* Lc Dialog */}
            <Dialog
                visible={createDialog3}
                position="mid-center"
                style={{
                    width: "85rem",
                    height: "50rem",
                    marginLeft: "0rem",
                    marginTop: "0rem",
                    paddingLeft: "0rem",
                    paddingTop: "0rem",
                }}
                header="LC Req"
                modal={true}
                className="p-fluid"
                onHide={hideDialog3}
            >
                <div className="af-div-main">
                    <div
                        className="af-div-first"
                        style={{ width: "80rem", height: "18rem" }}
                    >
                        <span
                            className="af-span-3-0"
                            style={{ width: "19rem" }}
                        >
                            <p className="af-span-p" style={{ width: "8rem" }}>Purchaser</p>
                            <div
                                className="af-span-div"
                                style={{ width: "10rem" }}
                            >
                                <InputText
                                    disabled
                                    style={{ width: "10rem" }}
                                    id="id_TARGET_ETA"
                                    value={dataEDT_KSV_PO_MRP3.REG_USER}
                                    onChange={(e) =>
                                        onInputChangeEDT_KSV_PO_MRP3(
                                            e,
                                            "REG_USER",
                                        )
                                    }
                                />
                            </div>
                        </span>
                        <span
                            className="af-span-3-0"
                            style={{ width: "59rem" }}
                        >
                            <p className="af-span-p" style={{ width: "8rem" }}>Buyer</p>
                            <div
                                className="af-span-div"
                                style={{ width: "10rem" }}
                            >
                                <InputText
                                    disabled
                                    style={{ width: "10rem" }}
                                    id="id_TARGET_ETA"
                                    value={dataEDT_KSV_PO_MRP3.BUYER_NAME}
                                    onChange={(e) =>
                                        onInputChangeEDT_KSV_PO_MRP3(
                                            e,
                                            "BUYER_NAME",
                                        )
                                    }
                                />
                            </div>
                        </span>

                        <span
                            className="af-span-3-0"
                            style={{ width: "59rem" }}
                        >
                            <p className="af-span-p" style={{ width: "8rem" }}>Supplier</p>
                            <div
                                className="af-span-div"
                                style={{ width: "10rem" }}
                            >
                                <InputText
                                    disabled
                                    style={{ width: "50rem" }}
                                    id="id_TARGET_ETA"
                                    value={dataEDT_KSV_PO_MRP3.VENDOR_NAME}
                                    onChange={(e) =>
                                        onInputChangeEDT_KSV_PO_MRP3(
                                            e,
                                            "VENDOR_NAME",
                                        )
                                    }
                                />
                            </div>
                        </span>

                        <div>
                            <span
                                className="af-span-3-0"
                                style={{ width: "19rem" }}
                            >
                                <p
                                    className="af-span-p"
                                    style={{ width: "8rem" }}
                                >Tot Amt</p>
                                <div
                                    className="af-span-div"
                                    style={{ width: "10rem" }}
                                >
                                    <InputText
                                        disabled
                                        style={{ width: "10rem" }}
                                        id="id_TARGET_ETA"
                                        value={dataEDT_KSV_PO_MRP3.AMOUNT}
                                        onChange={(e) =>
                                            onInputChangeEDT_KSV_PO_MRP3(
                                                e,
                                                "AMOUNT",
                                            )
                                        }
                                    />
                                </div>
                            </span>
                        </div>

                        <span
                            className="af-span-3-0"
                            style={{ width: "59rem" }}
                        >
                            <p className="af-span-p" style={{ width: "8rem" }}>Pay Bank</p>
                            <div
                                className="af-span-div"
                                style={{ width: "50rem" }}
                            >
                                <Dropdown
                                    style={{ width: "50rem" }}
                                    id="id_NORMI"
                                    value={dataEDT_KSV_PO_MRP3_PAY_BANK}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KSV_PO_MRP3(
                                            e,
                                            "PAY_BANK",
                                        )
                                    }
                                    options={datasEDT_KSV_PO_MRP3_PAY_BANK}
                                    optionLabel="BANK_NAME"
                                    placeholder=""
                                    editable
                                ></Dropdown>
                            </div>
                        </span>
                        <div style={{ width: "100%" }}>
                            <span
                                className="af-span-3-0"
                                style={{ width: "19rem" }}
                            >
                                <p
                                    className="af-span-p"
                                    style={{ width: "8rem" }}
                                >Pay Date</p>
                                <div
                                    className="af-span-div"
                                    style={{ width: "10rem" }}
                                >
                                    <Calendar
                                        showButtonBar
                                        style={{ width: "10rem" }}
                                        dateFormat="yy-mm-dd"
                                        id="id_S_PO_DATE"
                                        value={changeDateVal(
                                            dataEDT_KSV_PO_MRP3.PAY_DATE,
                                        )}
                                        onChange={(e) =>
                                            onCalChangeEDT_KSV_PO_MRP3(
                                                e,
                                                "PAY_DATE",
                                            )
                                        }
                                        tooltip="국내송금:수요일, 국외송금:화,목요일"
                                    />
                                </div>
                            </span>
                            <span
                                className="af-span-3-0"
                                style={{ width: "19rem" }}
                            >
                                <p
                                    className="af-span-p"
                                    style={{ width: "8rem" }}
                                >OverShort</p>
                                <div
                                    className="af-span-div"
                                    style={{ width: "10rem" }}
                                >
                                    <InputText
                                        disabled
                                        style={{ width: "10rem" }}
                                        id="id_TARGET_ETA"
                                        value={
                                            dataEDT_KSV_PO_MRP3.OVERSHORT_RATE
                                        }
                                        onChange={(e) =>
                                            onInputChangeEDT_KSV_PO_MRP3(
                                                e,
                                                "OVERSHORT_RATE",
                                            )
                                        }
                                    />
                                </div>
                            </span>
                            <span
                                className="af-span-3-0"
                                style={{ width: "19rem" }}
                            >
                                <p
                                    className="af-span-p"
                                    style={{ width: "8rem" }}
                                >Ship Mode</p>
                                <div
                                    className="af-span-div"
                                    style={{ width: "10rem" }}
                                >
                                    <InputText
                                        style={{ width: "10rem" }}
                                        value={dataEDT_KSV_PO_MRP3.SHIP_MODE}
                                        onChange={(e) =>
                                            onInputChangeEDT_KSV_PO_MRP3(
                                                e,
                                                "SHIP_MODE",
                                            )
                                        }
                                    />
                                </div>
                            </span>
                            <span
                                className="af-span-3-0"
                                style={{ width: "19rem" }}
                            >
                                <p
                                    className="af-span-p"
                                    style={{ width: "8rem" }}
                                >Trade Term</p>
                                <div
                                    className="af-span-div"
                                    style={{ width: "10rem" }}
                                >
                                    <InputText
                                        disabled
                                        style={{ width: "10rem" }}
                                        id="id_TARGET_ETA"
                                        value={dataEDT_KSV_PO_MRP3.TRADE_TERM}
                                        onChange={(e) =>
                                            onInputChangeEDT_KSV_PO_MRP3(
                                                e,
                                                "TRADE_TERM",
                                            )
                                        }
                                    />
                                </div>
                            </span>
                        </div>

                        <div>
                            <span
                                className="af-span-3-0"
                                style={{ width: "19rem" }}
                            >
                                <p
                                    className="af-span-p"
                                    style={{ width: "8rem" }}
                                >Expiry Date</p>
                                <div
                                    className="af-span-div"
                                    style={{ width: "10rem" }}
                                >
                                    <Calendar
                                        showButtonBar
                                        style={{ width: "10rem" }}
                                        dateFormat="yy-mm-dd"
                                        id="id_S_PO_DATE"
                                        value={changeDateVal(
                                            dataEDT_KSV_PO_MRP3.EXPIRY_DATE,
                                        )}
                                        onChange={(e) =>
                                            onCalChangeEDT_KSV_PO_MRP3(
                                                e,
                                                "EXPIRY_DATE",
                                            )
                                        }
                                    />
                                </div>
                            </span>
                            <span
                                className="af-span-3-0"
                                style={{ width: "19rem" }}
                            >
                                <p
                                    className="af-span-p"
                                    style={{ width: "8rem" }}
                                >Ship Date</p>
                                <div
                                    className="af-span-div"
                                    style={{ width: "10rem" }}
                                >
                                    <Calendar
                                        showButtonBar
                                        style={{ width: "10rem" }}
                                        dateFormat="yy-mm-dd"
                                        id="id_S_PO_DATE"
                                        value={changeDateVal(
                                            dataEDT_KSV_PO_MRP3.SHIP_DATE,
                                        )}
                                        onChange={(e) =>
                                            onCalChangeEDT_KSV_PO_MRP3(
                                                e,
                                                "SHIP_DATE",
                                            )
                                        }
                                    />
                                </div>
                            </span>
                            <span
                                className="af-span-3-0"
                                style={{ width: "19rem" }}
                            >
                                <p
                                    className="af-span-p"
                                    style={{ width: "8rem" }}
                                >Latest Ship Date</p>
                                <div
                                    className="af-span-div"
                                    style={{ width: "10rem" }}
                                >
                                    <Calendar
                                        showButtonBar
                                        style={{ width: "10rem" }}
                                        dateFormat="yy-mm-dd"
                                        id="id_S_PO_DATE"
                                        value={changeDateVal(
                                            dataEDT_KSV_PO_MRP3.LATEST_PAY_DATE,
                                        )}
                                        onChange={(e) =>
                                            onCalChangeEDT_KSV_PO_MRP3(
                                                e,
                                                "LATEST_SHIP_DATE",
                                            )
                                        }
                                    />
                                </div>
                            </span>
                        </div>

                        <span
                            className="af-span-3-0"
                            style={{ width: "19rem" }}
                        >
                            <div
                                className="af-span-div-btn"
                                style={{ width: "18rem" }}
                            >
                                <Button
                                    style={{ width: "18rem" }}
                                    label="Save"
                                    className="p-button-text"
                                    onClick={process_UPDATE_LC}
                                />
                            </div>
                        </span>
                        <span
                            className="af-span-3-0"
                            style={{ width: "59rem" }}
                        >
                            <div
                                className="af-span-div-btn"
                                style={{ width: "18rem" }}
                            >
                                <Button
                                    style={{ width: "18rem" }}
                                    label="Exit"
                                    className="p-button-text"
                                    onClick={process_EXIT_LC}
                                />
                            </div>
                        </span>
                    </div>

                    <div
                        className="af-div-first"
                        style={{ width: "84rem", height: "25rem" }}
                    >
                        <AFDataTable 
                            ref={dt_TBL_KSV_PO_MRP3}
                            size="small"
                            value={datasTBL_KSV_PO_MRP3}
                            tableStyle={{ tableLayout: "fixed" }}
                            resizableColumns
                            columnResizeMode="expand"
                            loading={loadingTBL_KSV_PO_MRP3}
                            metaKeySelection={false}
                            showGridlines
                            selectionMode="multiple"
                            selection={selectedTBL_KSV_PO_MRP3}
                            onSelectionChange={(e) => {
                                setSelectedTBL_KSV_PO_MRP3(e.value);
                                onRowClick1TBL_KSV_PO_MRP3(e.value);
                            }}
                            onRowClick={onRowClickTBL_KSV_PO_MRP3}
                            dataKey="id"
                            className="datatable-responsive"
                            virtualScrollerOptions={{ itemSize: 20 }}
                            emptyMessage=" " //header={headerTBL_KSV_PO_MRP3}
                            responsiveLayout="scroll"
                            scrollable
                            scrollHeight="173px"
                        >
                            <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "3rem" }} ></AFColumn>
                            <AFColumn className="af-col" style={{ width: "6rem" }} field="PO_CD" headerClassName="t-header" header="Po" ></AFColumn>
                            <AFColumn className="af-col" style={{ width: "6rem" }} field="MATL_CD" headerClassName="t-header" header="Matl" ></AFColumn>
                            <AFColumn className="af-col" style={{ width: "10rem" }} field="MATL_NAME" headerClassName="t-header" header="Desc" ></AFColumn>
                            <AFColumn className="af-col" style={{ width: "10rem" }} field="COLOR" headerClassName="t-header" header="Color" ></AFColumn>
                            <AFColumn className="af-col" style={{ width: "10rem" }} field="SPEC" headerClassName="t-header" header="Spec" ></AFColumn>
                            <AFColumn className="af-col" style={{ width: "6rem" }} field="UNIT" headerClassName="t-header" header="Unit" ></AFColumn>
                            <AFColumn className="af-col text-right" style={{ width: "6rem" }} field="PO_QTY" headerClassName="t-header" header="Qty" body={(row) => serviceLib.numWithCommas(row.PO_QTY, 2) } ></AFColumn>
                            <AFColumn className="af-col text-right green" style={{ width: "6rem" }} field="LC_QTY" headerClassName="t-header" header="LC Qty" editor={(options) => cellEditorKSV_PO_MRP3(options) } onCellEditComplete={ onCellEditCompleteKSV_PO_MRP3 } body={(row) => serviceLib.numWithCommas(row.LC_QTY, 2) } ></AFColumn>
                            <AFColumn className="af-col text-right" style={{ width: "6rem" }} field="PO_PRICE" headerClassName="t-header" header="Po price" body={(row) => serviceLib.numWithCommas(row.PO_PRICE, 4) } ></AFColumn>
                            <AFColumn className="af-col text-right" style={{ width: "6rem" }} field="AMOUNT" headerClassName="t-header" header="Amount" body={(row) => serviceLib.numWithCommas(row.AMOUNT, 2) } ></AFColumn>
                        </AFDataTable>
                    </div>
                </div>
            </Dialog>

            {/* Moq Confirm Dialog */}
            <Dialog
                visible={createDialog4}
                position="mid-center"
                style={{
                    width: "100rem",
                    height: "40rem",
                    marginLeft: "0rem",
                    marginTop: "0rem",
                    paddingLeft: "0rem",
                    paddingTop: "0rem",
                }}
                header="Stock Reason Check"
                modal={true}
                className="p-fluid"
                onHide={hideDialog4}
            >
                <div className="af-div-main">
                    <div
                        className="af-div-first"
                        style={{ width: "100rem", height: "3rem" }}
                    >
                        <span
                            className="af-span-3-0"
                            style={{ width: "16rem" }}
                        >
                            <div
                                className="af-span-div-btn"
                                style={{ width: "14rem" }}
                            >
                                <Button
                                    label="OK"
                                    style={{ width: "14rem" }}
                                    className="p-button-text"
                                    onClick={process_MOQ_CONFIRM}
                                />
                            </div>
                        </span>
                        <span
                            className="af-span-3-0"
                            style={{ width: "16rem" }}
                        >
                            <div
                                className="af-span-div-btn"
                                style={{ width: "14rem" }}
                            >
                                <Button
                                    label="Cancel"
                                    style={{ width: "14rem" }}
                                    className="p-button-text"
                                    onClick={process_MOQ_CANCEL}
                                />
                            </div>
                        </span>
                    </div>
                    <div
                        className="af-div-first"
                        style={{ width: "100%", height: "33rem" }}
                    >
                        <AFDataTable 
                            ref={dt_TBL_KSV_PO_MRP4}
                            editMode="cell"
                            size="small"
                            value={datasTBL_KSV_PO_MRP4}
                            tableStyle={{ tableLayout: "fixed" }}
                            resizableColumns
                            columnResizeMode="expand"
                            loading={loadingTBL_KSV_PO_MRP4}
                            metaKeySelection={false}
                            showGridlines
                            selectionMode="multiple"
                            selection={selectedTBL_KSV_PO_MRP4}
                            onSelectionChange={(e) => {
                                setSelectedTBL_KSV_PO_MRP4(e.value);
                                onRowClick1TBL_KSV_PO_MRP4(e.value);
                            }}
                            onRowClick={onRowClickTBL_KSV_PO_MRP4}
                            dataKey="id"
                            className="datatable-responsive"
                            virtualScrollerOptions={{ itemSize: 20 }}
                            emptyMessage=" "
                            responsiveLayout="scroll"
                            scrollable
                            scrollHeight="33rem"
                        >
                            <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "3rem" }} ></AFColumn>
                            <AFColumn className="af-col" style={{ width: "4rem" }} field="STATUS" headerClassName="t-header" header="Status" ></AFColumn>
                            <AFColumn className="af-col" style={{ width: "6rem" }} field="PO_CD" headerClassName="t-header" header="Po" ></AFColumn>
                            <AFColumn className="af-col" style={{ width: "2rem" }} field="PO_SEQ" headerClassName="t-header" header="Po Seq" ></AFColumn>
                            <AFColumn className="af-col" style={{ width: "6rem" }} field="MATL_CD" headerClassName="t-header" header="Matl" ></AFColumn>
                            <AFColumn className="af-col" style={{ width: "10rem" }} field="MATL_NAME" headerClassName="t-header" header="Desc" ></AFColumn>
                            <AFColumn className="af-col" style={{ width: "10rem" }} field="COLOR" headerClassName="t-header" header="Color" ></AFColumn>
                            <AFColumn className="af-col" style={{ width: "10rem" }} field="SPEC" headerClassName="t-header" header="Spec" ></AFColumn>
                            <AFColumn className="af-col" style={{ width: "4rem" }} field="UNIT" headerClassName="t-header" header="Unit" ></AFColumn>
                            <AFColumn className="af-col" style={{ width: "6rem" }} field="MRP_QTY" headerClassName="t-header" header="Mrp Qty" ></AFColumn>
                            <AFColumn className="af-col" style={{ width: "6rem" }} field="STOCK_QTY" headerClassName="t-header" header="Stock" ></AFColumn>
                            <AFColumn className="af-col" style={{ width: "6rem" }} field="MOQ_QTY" headerClassName="t-header" header="MOQ" ></AFColumn>
                            <AFColumn className="af-col" style={{ width: "6rem" }} field="PO_QTY" headerClassName="t-header" header="Po Qty" ></AFColumn>
                            <AFColumn className="af-col" style={{ width: "6rem" }} field="MIN_CONF_USER" headerClassName="t-header" header="Confirm User" ></AFColumn>
                        </AFDataTable>
                    </div>
                </div>
            </Dialog>

            {/* Stock Apply - Start */}
            <Dialog
                visible={createDialog5}
                position="mid-center"
                style={{
                    width: "123rem",
                    height: "62rem",
                    marginLeft: "0rem",
                    marginTop: "0rem",
                    paddingLeft: "0rem",
                    paddingTop: "0rem",
                }}
                header="Stock Apply"
                modal={true}
                className="p-fluid"
                onHide={hideDialog5}
            >
                <div className="af-div-main">
                    <div
                        className="af-div-first"
                        style={{ width: "100%", height: "10rem" }}
                    >
                        <AFDataTable 
                            ref={dt_TBL_KSV_PO_MRP5}
                            editMode="cell"
                            size="small"
                            value={datasTBL_KSV_PO_MRP5}
                            tableStyle={{ tableLayout: "fixed" }}
                            resizableColumns
                            columnResizeMode="expand"
                            showGridlines
                            dataKey="id"
                            className="datatable-responsive"
                            virtualScrollerOptions={{ itemSize: 20 }}
                            emptyMessage=" "
                            responsiveLayout="scroll"
                            scrollable
                            scrollHeight="flex"
                        >
                            <AFColumn className="af-col" style={{ width: "4rem" }} field="PU_STATUS" headerClassName="t-header" header="Status" ></AFColumn>
                            <AFColumn className="af-col orange" style={{ width: "6rem" }} field="PO_CD" headerClassName="t-header" header="PO#" ></AFColumn>
                            <AFColumn className="af-col" style={{ width: "2rem" }} field="PO_SEQ" headerClassName="t-header" header="Seq" ></AFColumn>
                            <AFColumn className="af-col orange" style={{ width: "6rem" }} field="MATL_CD" headerClassName="t-header" header="Matl#" ></AFColumn>
                            <AFColumn className="af-col orange" style={{ width: "10rem" }} field="MATL_NAME" headerClassName="t-header" header="Description" ></AFColumn>
                            <AFColumn className="af-col" style={{ width: "10rem" }} field="COLOR" headerClassName="t-header" header="Color" ></AFColumn>
                            <AFColumn className="af-col" style={{ width: "10rem" }} field="SPEC" headerClassName="t-header" header="Spec" ></AFColumn>
                            <AFColumn className="af-col" style={{ width: "4rem" }} field="UNIT" headerClassName="t-header" header="Unit" ></AFColumn>
                            <AFColumn className="af-col" style={{ width: "6rem" }} field="MRP_QTY" headerClassName="t-header" header="MRP Qty" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.MRP_QTY, 2) } ></AFColumn>
                            <AFColumn className="af-col" style={{ width: "6rem" }} field="STOCK_QTY" headerClassName="t-header" header="Stock" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas( rowData.STOCK_QTY, 2, ) } bodyClassName={(rowData) => rowData.STOCK_QTY > 0 ? "tableRed" : "" } ></AFColumn>
                            <AFColumn className="af-col" style={{ width: "6rem" }} field="MOQ_QTY" headerClassName="t-header" header="MOQ" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.MOQ_QTY, 2) } ></AFColumn>
                            <AFColumn className="af-col" style={{ width: "6rem" }} field="OVER_QTY" headerClassName="t-header" header="Over In" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas( rowData.OVER_QTY, 2, ) } ></AFColumn>
                            <AFColumn className="af-col" style={{ width: "6rem" }} field="LEFTOVER_QTY" headerClassName="t-header" header="LeftOver" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas( rowData.LEFTOVER_QTY, 2, ) } ></AFColumn>
                            <AFColumn className="af-col" style={{ width: "6rem" }} field="BEF_PO_QTY" headerClassName="t-header" header="Old Qty" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas( rowData.BEF_PO_QTY, 2, ) } ></AFColumn>
                            <AFColumn className="af-col" style={{ width: "6rem" }} headerStyle={{ color: "green" }} field="PO_UPDATE_QTY" headerClassName="t-header" header="New Po Qty" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas( rowData.PO_UPDATE_QTY, 2, ) } ></AFColumn>
                            <AFColumn className="af-col" style={{ width: "6rem" }} field="DIFF_QTY" headerClassName="t-header" header="Changed Qty" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas( rowData.DIFF_QTY, 2, ) } ></AFColumn>
                            <AFColumn className="af-col" style={{ width: "3rem" }} field="CURR_CD" headerClassName="t-header" header="Curr" ></AFColumn>
                            <AFColumn className="af-col" style={{ width: "6rem" }} field="MASTER_PRICE" headerClassName="t-header" header="Master P" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas( rowData.MASTER_PRICE, 4, ) } ></AFColumn>
                            <AFColumn className="af-col" style={{ width: "6rem" }} field="SURCHARGE_PRICE" headerClassName="t-header" header="Sur P" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas( rowData.SURCHARGE_PRICE, 4, ) } ></AFColumn>
                            <AFColumn className="af-col" style={{ width: "6rem" }} field="PO_PRICE" headerClassName="t-header" header="PO P" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas( rowData.PO_PRICE, 4, ) } ></AFColumn>
                            <AFColumn className="af-col" style={{ width: "6rem" }} headerStyle={{ color: "green" }} field="SURCHARGE_AMT" headerClassName="t-header" header="Surcharge" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas( rowData.SURCHARGE_AMT, 2, ) } ></AFColumn>
                            <AFColumn className="af-col" style={{ width: "10rem" }} headerStyle={{ color: "green" }} field="SURCHARGE_REMARK" headerClassName="t-header" header="Remark" editor={(options) => cellEditorKSV_PO_MRP2(options) } onCellEditComplete={ onCellEditCompleteKSV_PO_MRP2 } ></AFColumn>
                            <AFColumn className="af-col" style={{ width: "10rem" }} field="MIN_CONF_USER" headerClassName="t-header" header="Moq Confirm" ></AFColumn>
                        </AFDataTable>
                    </div>

                    <div className="af-div-first" style={{ width: "100%" }}>
                        <span
                            className="af-span-3-0"
                            style={{ width: "23rem" }}
                        >
                            <p className="af-span-p" style={{ width: "7rem" }}>Matl Name</p>
                            <div
                                className="af-span-div"
                                style={{ width: "15rem" }}
                            >
                                <InputText
                                    style={{ width: "15rem" }}
                                    id="id_MATL_NAME"
                                    value={dataQRY_KCD_MATL_MST.MATL_NAME}
                                    onChange={(e) =>
                                        onInputChangeQRY_KCD_MATL_MST(
                                            e,
                                            "MATL_NAME",
                                        )
                                    }
                                />
                            </div>
                        </span>
                        <span
                            className="af-span-3-0"
                            style={{ width: "20rem" }}
                        >
                            <p className="af-span-p" style={{ width: "4rem" }}>Color</p>
                            <div
                                className="af-span-div"
                                style={{ width: "15rem" }}
                            >
                                <InputText
                                    style={{ width: "15rem" }}
                                    id="id_COLOR"
                                    value={dataQRY_KCD_MATL_MST.COLOR}
                                    onChange={(e) =>
                                        onInputChangeQRY_KCD_MATL_MST(
                                            e,
                                            "COLOR",
                                        )
                                    }
                                />
                            </div>
                        </span>
                        <span
                            className="af-span-3-0"
                            style={{ width: "14rem" }}
                        >
                            <p className="af-span-p" style={{ width: "4rem" }}>Matl#</p>
                            <div
                                className="af-span-div"
                                style={{ width: "9rem" }}
                            >
                                <InputText
                                    style={{ width: "9rem" }}
                                    id="id_MATL_CD"
                                    value={dataQRY_KCD_MATL_MST.MATL_CD}
                                    onChange={(e) =>
                                        onInputChangeQRY_KCD_MATL_MST(
                                            e,
                                            "MATL_CD",
                                        )
                                    }
                                />
                            </div>
                        </span>
                        <span
                            className="af-span-3-0"
                            style={{ width: "14rem" }}
                        >
                            <p className="af-span-p" style={{ width: "4rem" }}>Rack</p>
                            <div
                                className="af-span-div"
                                style={{ width: "9rem" }}
                            >
                                <InputText
                                    style={{ width: "9rem" }}
                                    id="id_RACK"
                                    value={dataQRY_KCD_MATL_MST.RACK}
                                    onChange={(e) =>
                                        onInputChangeQRY_KCD_MATL_MST(
                                            e,
                                            "RACK",
                                        )
                                    }
                                />
                            </div>
                        </span>
                        <span
                            className="af-span-3-0"
                            style={{ width: "23rem" }}
                        >
                            <p className="af-span-p" style={{ width: "4rem" }}>Factory</p>
                            <div
                                className="af-span-div"
                                style={{ width: "18rem" }}
                            >
                                <Dropdown
                                    style={{ width: "18rem" }}
                                    id="id_FACTORY_CD"
                                    value={dataQRY_KCD_MATL_MST_FACTORY_CD}
                                    onChange={(e) =>
                                        onDropdownChangeQRY_KCD_MATL_MST(
                                            e,
                                            "FACTORY_CD",
                                        )
                                    }
                                    options={datasQRY_KCD_MATL_MST_FACTORY_CD}
                                    optionLabel="FACTORY_NAME"
                                    placeholder=""
                                    editable
                                ></Dropdown>
                            </div>
                        </span>
                        <span className="af-span-3-0" style={{ width: "9rem" }}>
                            <div
                                className="af-span-div-btn"
                                style={{ width: "8rem" }}
                            >
                                <Button
                                    style={{ width: "8rem" }}
                                    label={<span>Search</span>}
                                    id="btnSearch"
                                    className="p-button-text"
                                    onClick={searchSTOCK_MATL}
                                />
                            </div>
                        </span>
                        <span className="af-span-3-0" style={{ width: "9rem" }}>
                            <div
                                className="af-span-div-btn"
                                style={{ width: "8rem" }}
                            >
                                <Button
                                    style={{ width: "8rem" }}
                                    label="Reset"
                                    className="p-button-text"
                                    onClick={resetQRY_KCD_MATL_MST}
                                />
                            </div>
                        </span>

                        <div>
                            <span
                                className="af-span-3"
                                style={{ width: "23rem" }}
                            >
                                <p
                                    className="af-span-p"
                                    style={{ width: "7rem" }}
                                >Spec</p>
                                <div
                                    className="af-span-div"
                                    style={{ width: "15rem" }}
                                >
                                    <InputText
                                        style={{
                                            marginLeft: "0.5rem",
                                            display: "inline-block",
                                            width: "15rem",
                                        }}
                                        id="id_SPEC"
                                        value={dataQRY_KCD_MATL_MST.SPEC}
                                        onChange={(e) =>
                                            onInputChangeQRY_KCD_MATL_MST(
                                                e,
                                                "SPEC",
                                            )
                                        }
                                    />
                                </div>
                            </span>
                            <span
                                className="af-span-3"
                                style={{ width: "20rem" }}
                            >
                                <p
                                    className="af-span-p"
                                    style={{ width: "4rem" }}
                                >Supplier</p>
                                <div
                                    className="af-span-div"
                                    style={{ width: "15rem" }}
                                >
                                    <InputText
                                        style={{ width: "15rem" }}
                                        id="id_SPEC"
                                        value={dataQRY_KCD_MATL_MST.VENDOR_CD}
                                        onChange={(e) =>
                                            onInputChangeQRY_KCD_MATL_MST(
                                                e,
                                                "VENDOR_CD",
                                            )
                                        }
                                    />
                                </div>
                            </span>
                            <span
                                className="af-span-3"
                                style={{ width: "14rem" }}
                            >
                                <p
                                    className="af-span-p"
                                    style={{ width: "4rem" }}
                                >Kind2</p>
                                <div
                                    className="af-span-div"
                                    style={{ width: "9rem" }}
                                >
                                    <Dropdown
                                        style={{ width: "9rem" }}
                                        id="id_MATL_KIND2"
                                        value={dataQRY_KCD_MATL_MST_MATL_KIND2}
                                        onChange={(e) =>
                                            onDropdownChangeQRY_KCD_MATL_MST(
                                                e,
                                                "MATL_KIND2",
                                            )
                                        }
                                        options={
                                            datasQRY_KCD_MATL_MST_MATL_KIND2
                                        }
                                        optionLabel="MATL_TYPE2"
                                        placeholder=""
                                        filter
                                        editable
                                    ></Dropdown>
                                </div>
                            </span>
                            <span
                                className="af-span-3"
                                style={{ width: "14rem" }}
                            >
                                <p
                                    className="af-span-p"
                                    style={{ width: "4rem" }}
                                >Status</p>
                                <div
                                    className="af-span-div"
                                    style={{ width: "9rem" }}
                                >
                                    <Dropdown
                                        style={{ width: "9rem" }}
                                        id="id_STATUS_CD"
                                        value={dataQRY_KCD_MATL_MST_STATUS_CD}
                                        onChange={(e) =>
                                            onDropdownChangeQRY_KCD_MATL_MST(
                                                e,
                                                "STATUS_CD",
                                            )
                                        }
                                        options={
                                            datasQRY_KCD_MATL_MST_STATUS_CD
                                        }
                                        optionLabel="CD_NAME"
                                        placeholder=""
                                        editable
                                    ></Dropdown>
                                </div>
                            </span>
                            <span
                                className="af-span-3"
                                style={{ width: "23rem" }}
                            ></span>
                            <span
                                className="af-span-3"
                                style={{ width: "9rem" }}
                            >
                                <div
                                    className="af-span-div-btn"
                                    style={{ width: "8rem" }}
                                >
                                    <Button
                                        style={{ width: "8rem" }}
                                        label="Use Stock"
                                        className="p-button-text"
                                        onClick={useStock}
                                    />
                                </div>
                            </span>
                        </div>
                    </div>
                    <div
                        className="af-div-first"
                        style={{ width: "100%", height: "40rem" }}
                    >
                        <AFDataTable 
                            ref={dt_TBL_KCD_MATL_MST}
                            editMode="cell"
                            size="small"
                            value={datasTBL_KCD_MATL_MST}
                            tableStyle={{ tableLayout: "fixed" }}
                            resizableColumns
                            columnResizeMode="expand"
                            showGridlines
                            selectionMode="checkbox"
                            loading={loadingTBL_KCD_MATL_MST}
                            selection={selectedTBL_KCD_MATL_MST}
                            // onSelectionChange={(e) => { setSelectedTBL_KCD_MATL_MST(e.value); onRowClick1TBL_KCD_MATL_MST(e.value); }}
                            onSelectionChange={
                                onSelectionChangeTBL_KCD_MATL_MST
                            }
                            onRowClick={onRowClickTBL_KCD_MATL_MST}
                            dataKey="STOCK_IDX"
                            className="datatable-responsive"
                            virtualScrollerOptions={{ itemSize: 20 }}
                            emptyMessage=" " //header={headerTBL_KCD_MATL_MST}
                            responsiveLayout="scroll"
                            scrollable
                            scrollHeight="19rem"
                        >
                            <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "3rem" }} ></AFColumn>

                            <AFColumn field="PO_CD" headerClassName="t-header" header="PO#" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                            <AFColumn field="PO_SEQ" headerClassName="t-header" header="Seq" style={{ width: "5rem", flexBasis: "auto" }} ></AFColumn>
                            <AFColumn field="ORDER_CD" headerClassName="t-header" header="Order" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                            <AFColumn field="MATL_CD" headerClassName="t-header" header="Matl#" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                            <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Supplier" style={{ width: "14rem", flexBasis: "auto" }} ></AFColumn>
                            <AFColumn field="MATL_NAME" headerClassName="t-header" header="Description" style={{ width: "15rem", flexBasis: "auto" }} ></AFColumn>
                            <AFColumn field="COLOR" headerClassName="t-header" header="Color" style={{ width: "12rem", flexBasis: "auto" }} ></AFColumn>
                            <AFColumn field="SPEC" headerClassName="t-header" header="Spec" style={{ width: "15rem", flexBasis: "auto" }} ></AFColumn>
                            <AFColumn field="REMAIN_QTY" headerClassName="t-header" header="Stock Qty" style={{ width: "7rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.REMAIN_QTY) } ></AFColumn>
                            <AFColumn field="USE_QTY" headerClassName="t-header" header="Use Qty" style={{ color: "green", width: "7rem", flexBasis: "auto", }} editor={(options) => cellEditorTBL_KCD_MATL_MST(options) } onCellEditComplete={ onCellEditCompleteTBL_KCD_MATL_MST } bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.USE_QTY) } ></AFColumn>
                            <AFColumn field="FACTORY_NAME" headerClassName="t-header" header="Factory" style={{ width: "15rem", flexBasis: "auto" }} ></AFColumn>
                            <AFColumn field="AUTHORITY" headerClassName="t-header" header="Authority" style={{ width: "15rem", flexBasis: "auto" }} ></AFColumn>
                            <AFColumn field="UNIT" headerClassName="t-header" header="Unit" style={{ width: "5rem", flexBasis: "auto" }} ></AFColumn>
                            <AFColumn field="RACK" headerClassName="t-header" header="Rack" style={{ width: "7rem", flexBasis: "auto" }} ></AFColumn>
                            <AFColumn field="LOCATION" headerClassName="t-header" header="Location" style={{ width: "7rem", flexBasis: "auto" }} ></AFColumn>
                            <AFColumn field="USED_QTY" headerClassName="t-header" header="Used Qty" style={{ width: "7rem", flexBasis: "auto" }} ></AFColumn>
                            <AFColumn field="VENDOR_CD" headerClassName="t-header" header="Supplier CD" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                            <AFColumn field="STOCK_IDX" headerClassName="t-header" header="Stock Idx" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                        </AFDataTable>
                    </div>
                </div>
            </Dialog>
            {/* Stock Apply - End */}

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
                header="메일 작성"
                visible={mailDialogVisible}
                style={{
                    width: "70rem",
                    height: "50rem",
                    padding: "10px",
                    backgroundColor: "white",
                }}
                className="mailDialog" // CSS 클래스 적용
                onHide={() => setMailDialogVisible(false)}
                footer={
                    <div>
                        <Button
                            label="Send"
                            style={{ width: "80px" }}
                            onClick={() => {
                                setMailDialogVisible(false);
                                search_PURCHASE_REPORT_IMPORT_NEW();
                            }}
                            autoFocus
                        />

                        <Button
                            label="Cancel"
                            style={{ width: "80px" }}
                            className="p-button-secondary"
                            onClick={() => setMailDialogVisible(false)}
                        />
                    </div>
                }
            >
                <div className="p-fluid">
                    {/* 제목 입력 필드 */}
                    <div className="p-field">
                        <label htmlFor="mailDialogTitle" className="ml-1">
                            {mailHeader}
                        </label>
                        <InputText
                            id="mailDialogTitle"
                            value={mailDialogTitle}
                            onChange={(e) => setMailDialogTitle(e.target.value)}
                        />
                    </div>

                    {/* 내용 입력 필드 */}
                    <div className="p-field mt-3">
                        <label htmlFor="mailDialogContent" className="ml-1">
                            내용
                        </label>
                        <InputTextarea
                            id="mailDialogContent"
                            style={{ height: "32rem" }}
                            value={mailDialogContent}
                            onChange={(e) =>
                                setMailDialogContent(e.target.value)
                            }
                            rows={5}
                        />
                    </div>
                </div>
            </Dialog>

            <Dialog
                header="Price Update Reason"
                visible={visibleDialogReason}
                modal
                onHide={() => setVisibleDialogReason(false)}
                footer={
                    <div style={{ textAlign: "right" }}>
                        <Button
                            style={{ width: "8rem" }}
                            label="OK"
                            onClick={onConfirmDialog}
                            autoFocus
                        />
                        <Button
                            style={{ width: "8rem" }}
                            label="Cancel"
                            onClick={onCancelDialog}
                        />
                    </div>
                }
                style={{ width: "100rem", height: "85rem" }}
            >
                <div className="af-div-first" style={{ width: "100%", height: "75rem" }}>
                    <AFDataTable
                        value={selectedTBL_KSV_PO_MRP2}
                        dataKey="id"
                        tableStyle={{ tableLayout: "fixed" }}
                        resizableColumns
                        columnResizeMode="expand"
                        scrollable
                        editMode="cell"
                        size="small"
                        scrollHeight="500px"
                        style={{ width: "99%"}}
                    >
                        <AFColumn className="af-col" field="MATL_CD" header="Material Code" style={{ width: "8rem" }} />
                        <AFColumn className="af-col" field="MATL_NAME" header="Description" style={{ width: "8rem" }} />
                        <AFColumn className="af-col" field="COLOR" header="Color" style={{ width: "8rem" }} />
                        <AFColumn field="MASTER_PRICE" header="Master P." body={(rowData) => Number.isFinite(Number(rowData?.MASTER_PRICE)) ? Number(rowData.MASTER_PRICE).toFixed(4) : "0.0000" } style={{ width: "8rem" }} />
                        <AFColumn header="New P." body={() => dataEDT_PRICE_UPDATE ? parseFloat(dataEDT_PRICE_UPDATE).toFixed(4) : "" } style={{ width: "8rem" }} />
                        <AFColumn header="Reason" body={(rowData) => ( <InputText style={{ width: "100%" }} value={reasonMap[rowData?.MATL_CD] || ""} onChange={(e) => onReasonChange( rowData?.MATL_CD, e.target.value, ) } /> )} />
                    </AFDataTable>

                </div>
                
            </Dialog>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S040102_PURCHASER_INFO, comparisonFn);
